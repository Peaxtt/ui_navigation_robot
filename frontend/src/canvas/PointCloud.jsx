/**
 * Dual-layer point cloud — persistent voxel map + live scan.
 *
 * LIVE layer — current scan frame, full-brightness height colormap.
 *
 * MAP  layer — sparse voxel map (12 cm cells, up to 600 k unique voxels).
 *   • Each voxel stored once; rescanned voxels UPDATE colour in-place.
 *   • Points never deleted — persists across the whole session.
 *   • Cleared only when coordinate frame changes (robot↔world).
 *   • Toggled from Stream Settings.
 *
 * Height colormap (both layers): navy → electric blue → cyan → lime →
 *   yellow-green → yellow → orange-red → red.
 */
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRobotStore, pointsRef } from '../store/useRobotStore';

// ── Sizes ─────────────────────────────────────────────────────────────────────
const LIVE_MAX = 150_000;
const MAP_CAP  = 600_000;   // max unique voxels (~14 MB buffers)

// ── Voxel map parameters ──────────────────────────────────────────────────────
const VOXEL     = 0.12;       // 12 cm cell side
const VXY_LIM   = 400;        // ±48 m in X/Y
const VZ_LO     = -10;        // −1.2 m (below floor)
const VZ_HI     =  50;        // +6.0 m (ceiling)
const _VZ_RANGE = VZ_HI - VZ_LO + 1;                      // 61
const _VX_STRIDE = (2 * VXY_LIM + 1) * _VZ_RANGE;         // 801 × 61

// Pack three voxel indices into a single safe integer for use as Map key
function _vk(xi, yi, zi) {
  return (xi + VXY_LIM) * _VX_STRIDE + (yi + VXY_LIM) * _VZ_RANGE + (zi - VZ_LO);
}

// ── Height colormap (256-entry LUT, built once) ───────────────────────────────
const HEIGHT_MIN  = -0.5;
const HEIGHT_MAX  =  3.5;
const Z_2D_CEIL   =  1.5;   // clip points above 1.5 m in top-down view
const _STOPS = [
  [0.00, 0.00, 0.18],
  [0.00, 0.20, 0.95],
  [0.00, 0.75, 1.00],
  [0.00, 1.00, 0.40],
  [0.55, 1.00, 0.00],
  [1.00, 0.85, 0.00],
  [1.00, 0.25, 0.00],
  [1.00, 0.00, 0.00],
];
function _buildLUT() {
  const N = 256, ns = _STOPS.length - 1, lut = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const si = Math.min(Math.floor(t * ns), ns - 1);
    const f = t * ns - si, a = _STOPS[si], b = _STOPS[si + 1];
    lut[i*3] = a[0]+(b[0]-a[0])*f; lut[i*3+1] = a[1]+(b[1]-a[1])*f; lut[i*3+2] = a[2]+(b[2]-a[2])*f;
  }
  return lut;
}
const HEIGHT_LUT = _buildLUT();
const _HRANGE    = HEIGHT_MAX - HEIGHT_MIN;

// ── GPU upload ────────────────────────────────────────────────────────────────
function _upload(attr, off, cnt) {
  if (typeof attr.clearUpdateRanges === 'function') {
    attr.clearUpdateRanges(); attr.addUpdateRange(off, cnt);
  } else { attr.updateRange.offset = off; attr.updateRange.count = cnt; }
  attr.needsUpdate = true;
}

// ── Robot-frame → world-frame (zero allocs) ───────────────────────────────────
function applyPose(src, count, pose, dst) {
  const { qx=0,qy=0,qz=0,qw=1, x:tx=0,y:ty=0,z:tz=0 } = pose;
  const x2=qx+qx,y2=qy+qy,z2=qz+qz,xx=qx*x2,xy=qx*y2,xz=qx*z2;
  const yy=qy*y2,yz=qy*z2,zz=qz*z2,wx=qw*x2,wy=qw*y2,wz=qw*z2;
  const r00=1-(yy+zz),r01=xy-wz,r02=xz+wy,r10=xy+wz,r11=1-(xx+zz),r12=yz-wx;
  const r20=xz-wy,r21=yz+wx,r22=1-(xx+yy);
  for (let i=0;i<count;i++) {
    const ix=src[i*3],iy=src[i*3+1],iz=src[i*3+2];
    dst[i*3]=r00*ix+r01*iy+r02*iz+tx; dst[i*3+1]=r10*ix+r11*iy+r12*iz+ty; dst[i*3+2]=r20*ix+r21*iy+r22*iz+tz;
  }
}

export default function PointCloud() {
  const pointCloudHeader = useRobotStore((s) => s.pointCloudHeader);
  const inRobotFrame     = pointCloudHeader?.in_robot_frame === true;
  const showOccupancyMap = useRobotStore((s) => s.showOccupancyMap);
  const viewMode         = useRobotStore((s) => s.viewMode);

  // ── Live scan refs ────────────────────────────────────────────────────────
  const liveGeomRef  = useRef(null);
  const liveGroupRef = useRef(null);
  const liveBuf      = useRef(new Float32Array(LIVE_MAX * 3));
  const liveColBuf   = useRef(new Float32Array(LIVE_MAX * 3));
  const tmpBuf       = useRef(new Float32Array(LIVE_MAX * 3));

  // ── Voxel map refs ────────────────────────────────────────────────────────
  const mapGeomRef  = useRef(null);
  const mapPosBuf   = useRef(new Float32Array(MAP_CAP * 3));
  const mapColBuf   = useRef(new Float32Array(MAP_CAP * 3));
  const voxelMap    = useRef(new Map());   // voxelKey → buffer index
  const mapFreePtr  = useRef(0);           // next empty slot

  // Helper: wipe the voxel map completely
  const clearMap = () => {
    voxelMap.current.clear();
    mapFreePtr.current = 0;
    if (mapGeomRef.current) mapGeomRef.current.setDrawRange(0, 0);
  };

  // ── Init ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const large = new THREE.Sphere(new THREE.Vector3(), 10_000);
    [liveGeomRef, mapGeomRef].forEach(r => {
      if (r.current) { r.current.setDrawRange(0, 0); r.current.boundingSphere = large.clone(); }
    });
  }, []);

  // ── Clear map when coordinate frame toggles (frames are incompatible) ──────
  useEffect(() => { clearMap(); }, [inRobotFrame]);

  // ── Main update loop ───────────────────────────────────────────────────────
  useFrame(() => {
    const pts = pointsRef.current;
    if (!pts) return;
    const count = Math.min(pointCloudHeader?.count ?? 0, LIVE_MAX);
    if (count === 0) return;
    const floats = count * 3;
    const rawPts = pts.subarray(0, floats);

    let worldPts = rawPts;
    if (inRobotFrame) {
      const p = useRobotStore.getState().pose;
      if (p) { applyPose(rawPts, count, p, tmpBuf.current); worldPts = tmpBuf.current.subarray(0, floats); }
    }

    // ── Live scan ─────────────────────────────────────────────────────────
    const liveGeom = liveGeomRef.current;
    if (liveGeom) {
      const pos  = liveBuf.current;
      const cols = liveColBuf.current;

      if (viewMode === 'top') {
        // Z-ceiling clip: only draw points ≤ 1.5 m world-height
        let liveCount = 0;
        for (let i = 0; i < count; i++) {
          const wz = inRobotFrame ? worldPts[i*3+2] : rawPts[i*3+2];
          if (wz > Z_2D_CEIL) continue;
          pos[liveCount*3]   = rawPts[i*3];
          pos[liveCount*3+1] = rawPts[i*3+1];
          pos[liveCount*3+2] = rawPts[i*3+2];
          const t  = Math.max(0, Math.min(1, (wz - HEIGHT_MIN) / _HRANGE));
          const li = Math.floor(t * 255) * 3;
          cols[liveCount*3] = HEIGHT_LUT[li]; cols[liveCount*3+1] = HEIGHT_LUT[li+1]; cols[liveCount*3+2] = HEIGHT_LUT[li+2];
          liveCount++;
        }
        const liveFl = liveCount * 3;
        _upload(liveGeom.attributes.position, 0, liveFl);
        _upload(liveGeom.attributes.color,    0, liveFl);
        liveGeom.setDrawRange(0, liveCount);
      } else {
        pos.set(rawPts);
        const zSrc = inRobotFrame ? worldPts : rawPts;
        for (let i = 0; i < count; i++) {
          const t  = Math.max(0, Math.min(1, (zSrc[i*3+2] - HEIGHT_MIN) / _HRANGE));
          const li = Math.floor(t * 255) * 3;
          cols[i*3] = HEIGHT_LUT[li]; cols[i*3+1] = HEIGHT_LUT[li+1]; cols[i*3+2] = HEIGHT_LUT[li+2];
        }
        _upload(liveGeom.attributes.position, 0, floats);
        _upload(liveGeom.attributes.color,    0, floats);
        liveGeom.setDrawRange(0, count);
      }
    }

    // Reset group transform when not in robot-frame mode (prevents ghost)
    if (liveGroupRef.current) {
      if (inRobotFrame) {
        const p = useRobotStore.getState().pose;
        if (p) {
          liveGroupRef.current.position.set(p.x, p.y, p.z ?? 0);
          liveGroupRef.current.quaternion.set(p.qx??0, p.qy??0, p.qz??0, p.qw??1);
        }
      } else {
        liveGroupRef.current.position.set(0, 0, 0);
        liveGroupRef.current.quaternion.set(0, 0, 0, 1);
      }
    }

    // ── Voxel map ─────────────────────────────────────────────────────────
    const mapGeom = mapGeomRef.current;
    if (!mapGeom || !showOccupancyMap) return;

    const vm  = voxelMap.current;
    const pos = mapPosBuf.current;
    const col = mapColBuf.current;
    let   ptr = mapFreePtr.current;
    let   dirtyMin = Infinity, dirtyMax = -1;

    for (let i = 0; i < count; i++) {
      const wx = worldPts[i*3], wy = worldPts[i*3+1], wz = worldPts[i*3+2];
      const xi = Math.round(wx / VOXEL);
      const yi = Math.round(wy / VOXEL);
      const zi = Math.round(wz / VOXEL);
      if (xi < -VXY_LIM || xi > VXY_LIM || yi < -VXY_LIM || yi > VXY_LIM ||
          zi < VZ_LO     || zi > VZ_HI) continue;

      const key  = _vk(xi, yi, zi);
      const t    = Math.max(0, Math.min(1, (wz - HEIGHT_MIN) / _HRANGE));
      const li   = Math.floor(t * 255) * 3;
      const cr   = HEIGHT_LUT[li] * 0.65;
      const cg   = HEIGHT_LUT[li+1] * 0.65;
      const cb   = HEIGHT_LUT[li+2] * 0.65;

      const existing = vm.get(key);
      if (existing !== undefined) {
        // Voxel already recorded — update colour with latest reading
        col[existing*3] = cr; col[existing*3+1] = cg; col[existing*3+2] = cb;
        if (existing < dirtyMin) dirtyMin = existing;
        if (existing > dirtyMax) dirtyMax = existing;
      } else if (ptr < MAP_CAP) {
        // New voxel
        pos[ptr*3] = wx; pos[ptr*3+1] = wy; pos[ptr*3+2] = wz;
        col[ptr*3] = cr; col[ptr*3+1] = cg; col[ptr*3+2] = cb;
        vm.set(key, ptr);
        if (ptr < dirtyMin) dirtyMin = ptr;
        if (ptr > dirtyMax) dirtyMax = ptr;
        ptr++;
      }
    }
    mapFreePtr.current = ptr;

    // Partial GPU upload — only the dirty range this frame
    if (dirtyMax >= 0 && dirtyMin !== Infinity) {
      const off = dirtyMin * 3, cnt = (dirtyMax - dirtyMin + 1) * 3;
      _upload(mapGeom.attributes.position, off, cnt);
      _upload(mapGeom.attributes.color,    off, cnt);
      mapGeom.setDrawRange(0, ptr);
    }
  });

  return (
    <>
      {/* Voxel map — persistent, dimmer, smaller dots */}
      {showOccupancyMap && (
        <points frustumCulled={false} renderOrder={2}>
          <bufferGeometry ref={mapGeomRef}>
            <bufferAttribute attach="attributes-position" args={[mapPosBuf.current, 3]} usage={THREE.DynamicDrawUsage} />
            <bufferAttribute attach="attributes-color"    args={[mapColBuf.current,  3]} usage={THREE.DynamicDrawUsage} />
          </bufferGeometry>
          <pointsMaterial vertexColors size={0.05} sizeAttenuation transparent opacity={0.80} depthWrite={false} />
        </points>
      )}

      {/* Live scan — full brightness, on top */}
      <group ref={liveGroupRef} renderOrder={3}>
        <points frustumCulled={false}>
          <bufferGeometry ref={liveGeomRef}>
            <bufferAttribute attach="attributes-position" args={[liveBuf.current,    3]} usage={THREE.DynamicDrawUsage} />
            <bufferAttribute attach="attributes-color"    args={[liveColBuf.current, 3]} usage={THREE.DynamicDrawUsage} />
          </bufferGeometry>
          <pointsMaterial vertexColors size={0.09} sizeAttenuation transparent opacity={1.0} depthWrite={false} />
        </points>
      </group>
    </>
  );
}
