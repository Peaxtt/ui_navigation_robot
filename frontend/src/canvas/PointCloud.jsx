/**
 * Dual-layer point cloud.
 *
 * LIVE layer  — current LiDAR sweep, white/bright dots at real Z heights.
 * MAP  layer  — 2D occupancy texture on the ground plane.
 *               Points in wall-height range (8 cm – 3 m) are projected to Z=0
 *               and accumulated into a 1024×1024 canvas texture that grows over
 *               time — exactly like the /map topic in RViz when SLAM is running.
 *
 * Performance:
 *   - GPU buffer for live scan pre-allocated, partial upload via addUpdateRange.
 *   - Occupancy texture: O(count) pixel writes per frame, throttled putImageData
 *     at ≤5 Hz to match LiDAR publish rate.
 *   - Robot-frame → world-frame done in a tight float32 loop (zero allocations).
 */
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRobotStore, pointsRef } from '../store/useRobotStore';

// ── Live scan ─────────────────────────────────────────────────────────────────
const LIVE_MAX = 150_000;

// ── Occupancy map ─────────────────────────────────────────────────────────────
const GRID_CELLS      = 1024;          // texture resolution (power-of-two)
const METERS_PER_CELL = 0.1;           // 10 cm/cell → covers ±51.2 m from origin
const HALF_CELLS      = GRID_CELLS / 2;
const WORLD_EXTENT    = GRID_CELLS * METERS_PER_CELL;  // 102.4 m × 102.4 m
const MAP_Z_MIN       = 0.08;          // skip floor reflections
const MAP_Z_MAX       = 3.0;           // skip airborne noise / ceiling

// Teal accent #00d0b6  (matches UI theme)
const TEAL_R = 0, TEAL_G = 208, TEAL_B = 182;
// Dim seed colour for first hit
const SEED_R = 0, SEED_G = 64,  SEED_B = 56;

// ── GPU upload helper ─────────────────────────────────────────────────────────
function gpuUpload(attr, off1, cnt1, off2 = -1, cnt2 = 0) {
  if (typeof attr.clearUpdateRanges === 'function') {
    attr.clearUpdateRanges();
    attr.addUpdateRange(off1, cnt1);
    if (off2 >= 0) attr.addUpdateRange(off2, cnt2);
  } else {
    if (off2 >= 0) {
      attr.updateRange.offset = 0;
      attr.updateRange.count  = attr.array.length;
    } else {
      attr.updateRange.offset = off1;
      attr.updateRange.count  = cnt1;
    }
  }
  attr.needsUpdate = true;
}

// ── Robot-frame → world-frame (tight float32 loop, zero allocs) ──────────────
function applyPose(src, count, pose, dst) {
  const { qx=0,qy=0,qz=0,qw=1, x:tx=0,y:ty=0,z:tz=0 } = pose;
  const x2=qx+qx,y2=qy+qy,z2=qz+qz;
  const xx=qx*x2,xy=qx*y2,xz=qx*z2;
  const yy=qy*y2,yz=qy*z2,zz=qz*z2;
  const wx=qw*x2,wy=qw*y2,wz=qw*z2;
  const r00=1-(yy+zz),r01=xy-wz,    r02=xz+wy;
  const r10=xy+wz,    r11=1-(xx+zz),r12=yz-wx;
  const r20=xz-wy,    r21=yz+wx,    r22=1-(xx+yy);
  for (let i=0;i<count;i++) {
    const ix=src[i*3],iy=src[i*3+1],iz=src[i*3+2];
    dst[i*3]  =r00*ix+r01*iy+r02*iz+tx;
    dst[i*3+1]=r10*ix+r11*iy+r12*iz+ty;
    dst[i*3+2]=r20*ix+r21*iy+r22*iz+tz;
  }
}

export default function PointCloud() {
  const pointCloudHeader = useRobotStore((s) => s.pointCloudHeader);
  const inRobotFrame     = pointCloudHeader?.in_robot_frame === true;

  // ── Live scan refs ────────────────────────────────────────────────────────
  const liveGeomRef  = useRef(null);
  const liveGroupRef = useRef(null);
  const liveBuf      = useRef(new Float32Array(LIVE_MAX * 3));
  const tmpBuf       = useRef(new Float32Array(LIVE_MAX * 3));

  // ── Occupancy map refs ────────────────────────────────────────────────────
  const hitCountRef  = useRef(null);   // Uint8Array — per-cell hit count
  const imgRef       = useRef(null);   // { ctx, data, pixels }
  const textureRef   = useRef(null);   // THREE.CanvasTexture
  const mapMatRef    = useRef(null);   // meshBasicMaterial (to set .map)
  const mapDirty     = useRef(false);
  const lastTexUp    = useRef(0);

  // ── Initialise ─────────────────────────────────────────────────────────────
  useEffect(() => {
    // Live scan — pre-set draw range to 0; large static bounding sphere
    const large = new THREE.Sphere(new THREE.Vector3(), 10_000);
    if (liveGeomRef.current) {
      liveGeomRef.current.setDrawRange(0, 0);
      liveGeomRef.current.boundingSphere = large.clone();
    }

    // Occupancy map canvas (transparent background — grid shows through)
    const canvas = document.createElement('canvas');
    canvas.width  = GRID_CELLS;
    canvas.height = GRID_CELLS;
    const ctx    = canvas.getContext('2d', { willReadFrequently: true });
    const data   = ctx.createImageData(GRID_CELLS, GRID_CELLS);
    const pixels = data.data;
    // All pixels start fully transparent
    for (let i = 0; i < GRID_CELLS * GRID_CELLS * 4; i += 4) {
      pixels[i] = pixels[i+1] = pixels[i+2] = 0;
      pixels[i+3] = 0;
    }
    ctx.putImageData(data, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter      = THREE.LinearFilter;
    texture.magFilter      = THREE.LinearFilter;
    texture.generateMipmaps = false;

    hitCountRef.current = new Uint8Array(GRID_CELLS * GRID_CELLS);
    imgRef.current      = { ctx, data, pixels };
    textureRef.current  = texture;

    // Imperatively assign texture to material (created before this effect runs)
    if (mapMatRef.current) {
      mapMatRef.current.map = texture;
      mapMatRef.current.needsUpdate = true;
    }

    return () => texture.dispose();
  }, []);

  // ── Main update loop ───────────────────────────────────────────────────────
  useFrame(() => {
    const pts = pointsRef.current;
    if (!pts) return;

    const count  = Math.min(pointCloudHeader?.count ?? 0, LIVE_MAX);
    if (count === 0) return;
    const floats = count * 3;
    const rawPts = pts.subarray(0, floats);

    // World-space positions (needed for occupancy map regardless of frame mode)
    let worldPts = rawPts;
    if (inRobotFrame) {
      const p = useRobotStore.getState().pose;
      if (p) {
        applyPose(rawPts, count, p, tmpBuf.current);
        worldPts = tmpBuf.current.subarray(0, floats);
      }
    }

    // ── 1. Live scan GPU ──────────────────────────────────────────────────
    const liveGeom = liveGeomRef.current;
    if (liveGeom) {
      liveBuf.current.set(rawPts);
      gpuUpload(liveGeom.attributes.position, 0, floats);
      liveGeom.setDrawRange(0, count);
    }
    if (inRobotFrame && liveGroupRef.current) {
      const p = useRobotStore.getState().pose;
      if (p) {
        liveGroupRef.current.position.set(p.x, p.y, p.z ?? 0);
        liveGroupRef.current.quaternion.set(p.qx??0, p.qy??0, p.qz??0, p.qw??1);
      }
    }

    // ── 2. Occupancy map ──────────────────────────────────────────────────
    const hitCount = hitCountRef.current;
    const img      = imgRef.current;
    if (!hitCount || !img) return;

    const { data, pixels } = img;
    let anyNew = false;

    for (let i = 0; i < count; i++) {
      const pz = worldPts[i*3+2];
      if (pz < MAP_Z_MIN || pz > MAP_Z_MAX) continue;

      const px = worldPts[i*3];
      const py = worldPts[i*3+1];

      // World → canvas pixel.
      // PlaneGeometry UV: (0,0)=bottom-left=(-W/2,-H/2), (1,1)=top-right=(+W/2,+H/2)
      // CanvasTexture flipY=true: UV v=1 → canvas row 0 (top) → +Y in world.
      const gx = Math.floor(px / METERS_PER_CELL + HALF_CELLS);
      const gy = Math.floor(-py / METERS_PER_CELL + HALF_CELLS);

      if (gx < 0 || gx >= GRID_CELLS || gy < 0 || gy >= GRID_CELLS) continue;

      const cidx = gy * GRID_CELLS + gx;
      if (hitCount[cidx] < 200) {
        hitCount[cidx]++;
        anyNew = true;

        // Confidence ramp: 1 hit = seed dim colour, 5+ hits = full bright teal
        const t   = Math.min(hitCount[cidx] / 5, 1.0);
        const pid = cidx * 4;
        pixels[pid]   = (SEED_R + (TEAL_R - SEED_R) * t) | 0;
        pixels[pid+1] = (SEED_G + (TEAL_G - SEED_G) * t) | 0;
        pixels[pid+2] = (SEED_B + (TEAL_B - SEED_B) * t) | 0;
        pixels[pid+3] = (80 + 175 * t) | 0;  // alpha 80→255 as confidence grows
      }
    }

    if (anyNew) mapDirty.current = true;

    // Throttled texture upload: putImageData is ~1 ms on 1024² canvas; 5 Hz is plenty.
    const now = performance.now();
    if (mapDirty.current && textureRef.current && (now - lastTexUp.current) > 200) {
      img.ctx.putImageData(data, 0, 0);
      textureRef.current.needsUpdate = true;
      mapDirty.current  = false;
      lastTexUp.current = now;
    }
  });

  return (
    <>
      {/*
        Occupancy map — textured plane at z≈0.
        Transparent where unvisited (grid shows through), teal where obstacles found.
        PlaneGeometry lies in XY plane by default — correct for our Z-up scene.
      */}
      <mesh frustumCulled={false} renderOrder={1} position={[0, 0, 0.004]}>
        <planeGeometry args={[WORLD_EXTENT, WORLD_EXTENT]} />
        <meshBasicMaterial
          ref={mapMatRef}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Live scan — bright white-cyan dots at real Z heights */}
      <group ref={liveGroupRef} renderOrder={3}>
        <points frustumCulled={false}>
          <bufferGeometry ref={liveGeomRef}>
            <bufferAttribute
              attach="attributes-position"
              args={[liveBuf.current, 3]}
              usage={THREE.DynamicDrawUsage}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            color="#c8f0e8"
            sizeAttenuation
            transparent
            opacity={0.9}
          />
        </points>
      </group>
    </>
  );
}
