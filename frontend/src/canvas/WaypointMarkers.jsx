/**
 * Layer 3 – 3D Canvas: Sleek flat RViz-style waypoint markers.
 *
 * Each marker is a flat (Z≈0) orange-red arrow that lies on the ground plane:
 *   - Semi-transparent disc base + crisp ring outline
 *   - Shaft + triangle arrowhead pointing in the yaw direction
 *   - Floating number sprite above
 *
 * All materials use depthTest={false} so markers are always visible even from
 * shallow 3D angles where terrain / point cloud would otherwise occlude them.
 */
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useRobotStore } from '../store/useRobotStore';

// Shared arrowhead shape — flat triangle in local XY plane, tip pointing +X.
// Created once at module level; shared across all marker instances.
const ARROW_HEAD_SHAPE = (() => {
  const s = new THREE.Shape();
  s.moveTo(0,    0.19);   // back-left
  s.lineTo(0.38, 0);      // tip  (pointing in +X = yaw direction)
  s.lineTo(0,   -0.19);   // back-right
  s.closePath();
  return s;
})();

function ArrowMarker({ index, x, y, yaw }) {
  // Number label rendered into a small canvas texture — only re-created when index changes.
  const labelTex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 72; c.height = 72;
    const ctx = c.getContext('2d');

    ctx.fillStyle = 'rgba(15, 15, 15, 0.88)';
    ctx.beginPath();
    ctx.arc(36, 36, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ff6b35';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(36, 36, 28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(index + 1), 36, 38);

    return new THREE.CanvasTexture(c);
  }, [index]);

  // Group rotation is around Z (world up) — sets the yaw direction.
  // All children live in the group's local XY plane = world floor at z=0.02.
  return (
    <group position={[x, y, 0.02]} rotation={[0, 0, yaw]}>

      {/* Soft outer glow */}
      <mesh renderOrder={5}>
        <circleGeometry args={[0.47, 40]} />
        <meshBasicMaterial
          color="#ff6b35" transparent opacity={0.10}
          side={THREE.DoubleSide} depthTest={false}
        />
      </mesh>

      {/* Semi-transparent filled disc base */}
      <mesh renderOrder={5}>
        <circleGeometry args={[0.32, 40]} />
        <meshBasicMaterial
          color="#ff6b35" transparent opacity={0.28}
          side={THREE.DoubleSide} depthTest={false}
        />
      </mesh>

      {/* Crisp ring outline */}
      <mesh renderOrder={6}>
        <ringGeometry args={[0.29, 0.34, 40]} />
        <meshBasicMaterial color="#ff6b35" side={THREE.DoubleSide} depthTest={false} />
      </mesh>

      {/* Arrow shaft — connects disc edge to arrowhead */}
      <mesh position={[0.46, 0, 0]} renderOrder={6}>
        <boxGeometry args={[0.26, 0.072, 0.004]} />
        <meshBasicMaterial color="#ff6b35" depthTest={false} />
      </mesh>

      {/* Arrow head — flat ShapeGeometry triangle, tip at +X */}
      <mesh position={[0.62, 0, 0]} renderOrder={6}>
        <shapeGeometry args={[ARROW_HEAD_SHAPE]} />
        <meshBasicMaterial color="#ff6b35" side={THREE.DoubleSide} depthTest={false} />
      </mesh>

      {/* Number label sprite — floats above the marker */}
      <sprite position={[0, 0, 0.72]} scale={[0.56, 0.56, 0.56]}>
        <spriteMaterial map={labelTex} depthTest={false} transparent />
      </sprite>
    </group>
  );
}

export default function WaypointMarkers() {
  const waypoints = useRobotStore((s) => s.waypoints);
  return (
    <>
      {waypoints.map((wp, i) => (
        <ArrowMarker
          key={`wp-${i}-${wp.x.toFixed(3)}-${wp.y.toFixed(3)}`}
          index={i}
          x={wp.x}
          y={wp.y}
          yaw={wp.yaw ?? 0}
        />
      ))}
    </>
  );
}
