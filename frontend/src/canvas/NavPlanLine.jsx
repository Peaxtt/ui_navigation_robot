/**
 * Layer 3 – 3D Canvas: Nav2 global plan path line.
 *
 * Uses <primitive object={THREE.Line}> instead of <line> / <line_> JSX tags.
 * <line> conflicts with SVG in React's reconciler; <line_> is a dead R3F legacy alias.
 * <primitive> is unambiguous and works across all R3F versions.
 */
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useRobotStore } from '../store/useRobotStore';

export default function NavPlanLine() {
  const navPlan = useRobotStore((s) => s.navPlan);

  // Create THREE.Line once — geometry updated imperatively in useEffect
  const lineObj = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const mat  = new THREE.LineBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.95 });
    const l = new THREE.Line(geom, mat);
    l.frustumCulled = false;
    l.renderOrder   = 2;
    l.visible       = false;
    return l;
  }, []);

  useEffect(() => {
    const pts = navPlan?.points;
    if (!pts || pts.length < 2) {
      lineObj.visible = false;
      return;
    }

    const positions = new Float32Array(pts.length * 3);
    for (let i = 0; i < pts.length; i++) {
      positions[i * 3]     = pts[i].x;
      positions[i * 3 + 1] = pts[i].y;
      positions[i * 3 + 2] = (pts[i].z ?? 0) + 0.04; // lift off ground to avoid z-fighting
    }

    const existing = lineObj.geometry.attributes.position;
    if (existing && existing.array.length === positions.length) {
      existing.array.set(positions);
      existing.needsUpdate = true;
    } else {
      lineObj.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
    lineObj.geometry.computeBoundingSphere();
    lineObj.visible = true;
  }, [navPlan, lineObj]);

  return <primitive object={lineObj} />;
}
