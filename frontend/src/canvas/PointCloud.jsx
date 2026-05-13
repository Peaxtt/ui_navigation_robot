/**
 * Layer 3 – 3D Canvas: Dual-layer point cloud.
 *
 * LIVE layer  — current scan only.  Teal, larger dots, follows robot in robot-frame mode.
 * MAP layer   — ring buffer accumulation (1.5M points). Slate-blue, smaller dots, world-frame.
 *
 * Performance guarantees:
 *   - GPU buffers pre-allocated once, never reallocated.
 *   - Partial GPU uploads via addUpdateRange (Two-region upload on ring wrap, no full re-upload).
 *   - Robot-frame → world-frame transform done in a tight float32 loop (no allocations per frame).
 *   - Static bounding spheres on both geometries (avoids O(n) recompute per frame on 1.5M points).
 */
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRobotStore, pointsRef } from '../store/useRobotStore';

const LIVE_MAX = 150_000;
const MAP_MAX  = 1_500_000;

// Upload one or two contiguous GPU regions.
// Uses addUpdateRange (Three.js ≥r152) to avoid re-uploading the entire 18 MB map buffer.
function gpuUpload(attr, off1, cnt1, off2 = -1, cnt2 = 0) {
  if (typeof attr.clearUpdateRanges === 'function') {
    attr.clearUpdateRanges();
    attr.addUpdateRange(off1, cnt1);
    if (off2 >= 0) attr.addUpdateRange(off2, cnt2);
  } else {
    // Legacy fallback (<r152): single range only; full upload on wrap.
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

// Rotate + translate N points from robot frame to world frame (tight float32 loop, zero allocs).
function applyPose(src, count, pose, dst) {
  const { qx = 0, qy = 0, qz = 0, qw = 1, x: tx = 0, y: ty = 0, z: tz = 0 } = pose;
  const x2 = qx + qx, y2 = qy + qy, z2 = qz + qz;
  const xx = qx * x2, xy = qx * y2, xz = qx * z2;
  const yy = qy * y2, yz = qy * z2, zz = qz * z2;
  const wx = qw * x2, wy = qw * y2, wz = qw * z2;
  const r00 = 1-(yy+zz), r01 = xy-wz,     r02 = xz+wy;
  const r10 = xy+wz,     r11 = 1-(xx+zz), r12 = yz-wx;
  const r20 = xz-wy,     r21 = yz+wx,     r22 = 1-(xx+yy);
  for (let i = 0; i < count; i++) {
    const ix = src[i*3], iy = src[i*3+1], iz = src[i*3+2];
    dst[i*3]   = r00*ix + r01*iy + r02*iz + tx;
    dst[i*3+1] = r10*ix + r11*iy + r12*iz + ty;
    dst[i*3+2] = r20*ix + r21*iy + r22*iz + tz;
  }
}

export default function PointCloud() {
  const pointCloudHeader = useRobotStore((s) => s.pointCloudHeader);
  const inRobotFrame     = pointCloudHeader?.in_robot_frame === true;

  // ── Live scan ───────────────────────────────────────────────────────────
  const liveGeomRef  = useRef(null);
  const liveGroupRef = useRef(null);
  const liveBuf      = useRef(new Float32Array(LIVE_MAX * 3));

  // ── Persistent map ring buffer ──────────────────────────────────────────
  const mapGeomRef  = useRef(null);
  const mapBuf      = useRef(new Float32Array(MAP_MAX * 3));
  const mapCursor   = useRef(0);
  const mapFilled   = useRef(0);

  // Reuse buffer for robot-frame→world-frame transform (avoids GC pressure).
  const tmpBuf = useRef(new Float32Array(LIVE_MAX * 3));

  useEffect(() => {
    // Pre-initialise draw range to 0 (nothing drawn before first WS frame).
    // Large static bounding sphere: skip expensive O(n) recompute on 1.5M points every frame.
    const large = new THREE.Sphere(new THREE.Vector3(), 10_000);
    if (liveGeomRef.current) {
      liveGeomRef.current.setDrawRange(0, 0);
      liveGeomRef.current.boundingSphere = large.clone();
    }
    if (mapGeomRef.current) {
      mapGeomRef.current.setDrawRange(0, 0);
      mapGeomRef.current.boundingSphere  = large.clone();
    }
  }, []);

  useFrame(() => {
    const pts = pointsRef.current;
    if (!pts) return;

    const count = Math.min(pointCloudHeader?.count ?? 0, LIVE_MAX);
    if (count === 0) return;
    const floats  = count * 3;
    const rawPts  = pts.subarray(0, floats);

    // ── Resolve world-space points for the map ────────────────────────────
    // Live scan uses the group transform; map needs explicit per-point transform.
    let worldPts = rawPts;
    if (inRobotFrame) {
      const p = useRobotStore.getState().pose;
      if (p) {
        applyPose(rawPts, count, p, tmpBuf.current);
        worldPts = tmpBuf.current.subarray(0, floats);
      }
    }

    // ── 1. Live scan ──────────────────────────────────────────────────────
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
        liveGroupRef.current.quaternion.set(p.qx ?? 0, p.qy ?? 0, p.qz ?? 0, p.qw ?? 1);
      }
    }

    // ── 2. Map ring buffer (world-space) ──────────────────────────────────
    const mapGeom = mapGeomRef.current;
    if (!mapGeom) return;

    const cursor = mapCursor.current;
    const ma     = mapGeom.attributes.position;

    if (cursor + count <= MAP_MAX) {
      // Common case: no wrap — single contiguous write.
      mapBuf.current.set(worldPts, cursor * 3);
      gpuUpload(ma, cursor * 3, floats);
      mapCursor.current = (cursor + count) % MAP_MAX;
    } else {
      // Ring wrap — two-region write, two-region GPU upload (no full re-upload).
      const first  = MAP_MAX - cursor;
      const second = count - first;
      mapBuf.current.set(worldPts.subarray(0, first * 3), cursor * 3);
      mapBuf.current.set(worldPts.subarray(first * 3),    0);
      gpuUpload(ma, cursor * 3, first * 3, 0, second * 3);
      mapCursor.current = second;
    }
    mapFilled.current = Math.min(mapFilled.current + count, MAP_MAX);
    mapGeom.setDrawRange(0, mapFilled.current);
  });

  return (
    <>
      {/* Persistent accumulated map — slate-blue background layer */}
      <points frustumCulled={false} renderOrder={1}>
        <bufferGeometry ref={mapGeomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[mapBuf.current, 3]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#4a5a72" sizeAttenuation transparent opacity={0.85} />
      </points>

      {/* Live scan — teal foreground layer */}
      <group ref={liveGroupRef} renderOrder={2}>
        <points frustumCulled={false}>
          <bufferGeometry ref={liveGeomRef}>
            <bufferAttribute
              attach="attributes-position"
              args={[liveBuf.current, 3]}
              usage={THREE.DynamicDrawUsage}
            />
          </bufferGeometry>
          <pointsMaterial size={0.045} color="#00d0b6" sizeAttenuation />
        </points>
      </group>
    </>
  );
}
