/**
 * Layer 3 – 3D Canvas
 *
 * Coordinate system: Z-up (ROS REP 103). Camera looks down -Z.
 *   Camera top-view: pos=[-0.01, 0, 22], up=[0,0,1]  → +X up on screen, +Y left (RViz convention)
 *   Grid rotation=[-PI/2,0,0] puts drei Grid in XY plane (z=0) = ground floor.
 *
 * Waypoint placement (addMode) — exact RViz 2D Nav Goal UX:
 *   Left down   → record origin, disable OrbitControls, show yaw preview arrow
 *   Mouse move  → update yaw arrow (crosshair ring stays at origin)
 *   Left up     → commit waypoint (x,y from origin; yaw from drag direction), re-enable controls
 *   Right click → cancel drag, re-enable controls
 *   Escape key  → cancel drag, re-enable controls
 *
 * Navigation mode (addMode=false):
 *   Top view: left=pan, right=rotate, scroll=zoom
 *   3D view:  left=orbit, right=pan, scroll=zoom
 */
import React, {
  useRef, useEffect, useMemo, useState, useCallback, Component,
} from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { useRobotStore } from '../store/useRobotStore';
import PointCloud      from './PointCloud';
import RobotModel      from './RobotModel';
import WaypointMarkers from './WaypointMarkers';
import NavPlanLine     from './NavPlanLine';

// ── Module-level shared refs (zero React overhead) ────────────────────────────
// crosshairPos: world-space XY position of the placement ring.
//   • Idle:     follows mouse cursor.
//   • Dragging: locked to mousedown origin (where waypoint will be placed).
const crosshairPos    = { current: new THREE.Vector3(0, 0, -9999) };

// crosshairActive: true only while pointer is over the ground plane.
const crosshairActive = { current: false };

// yawDragState: drives the preview arrow from origin to current mouse.
const yawDragState = {
  current: { active: false, ox: 0, oy: 0, tx: 0, ty: 0 },
};

// ── Camera presets ────────────────────────────────────────────────────────────
// -0.01 offset avoids gimbal lock and puts +X toward screen-top (ROS forward = up on screen).
const CAM_PRESETS = {
  top: { pos: [-0.01, 0, 22], up: [0, 0, 1] },
  '3d': { pos: [10, -14, 9],  up: [0, 0, 1] },
};

// Module-level arrow shape for crosshair yaw indicator (created once, shared).
const CROSSHAIR_ARROW = (() => {
  const s = new THREE.Shape();
  s.moveTo(0,    0.11);
  s.lineTo(0.22, 0);
  s.lineTo(0,   -0.11);
  s.closePath();
  return s;
})();

// Module-level arrowhead for the yaw preview line tip.
const PREVIEW_HEAD = (() => {
  const s = new THREE.Shape();
  s.moveTo(0,    0.14);
  s.lineTo(0.28, 0);
  s.lineTo(0,   -0.14);
  s.closePath();
  return s;
})();

// ── CameraRig ─────────────────────────────────────────────────────────────────
// Lerps camera to the preset when viewMode changes.
// Stops lerping once arrived so user zoom/pan is never spring-back'd.
function CameraRig() {
  const viewMode = useRobotStore((s) => s.viewMode);
  const { camera, controls } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 22));
  const moving = useRef(false);

  useEffect(() => {
    const p = CAM_PRESETS[viewMode] ?? CAM_PRESETS.top;
    target.current.set(...p.pos);
    camera.up.set(...p.up);
    moving.current = true;
    if (controls) { controls.target.set(0, 0, 0); controls.update(); }
  }, [viewMode, camera, controls]);

  useFrame((_, dt) => {
    if (!moving.current) return;
    if (camera.position.distanceTo(target.current) < 0.1) {
      camera.position.copy(target.current);
      moving.current = false;
    } else {
      camera.position.lerp(target.current, Math.min(dt * 6, 0.2));
    }
    if (controls) controls.update();
  });

  return null;
}

// ── GroundPlaneHitTarget ──────────────────────────────────────────────────────
// RViz-style "2D Nav Goal" placement:
//   • Mouse down  → lock origin, disable OrbitControls (prevents pan/orbit interfering)
//   • Mouse move  → update yaw preview arrow; crosshair ring stays at origin
//   • Mouse up    → commit waypoint with yaw = atan2(release − origin)
//   • Right click → cancel; right-click with no drag also suppresses context menu
//   • Escape key  → cancel
function GroundPlaneHitTarget() {
  const addMode     = useRobotStore((s) => s.addMode);
  const addWaypoint = useRobotStore((s) => s.addWaypoint);
  const { controls } = useThree();

  const isDragging = useRef(false);
  const origin     = useRef(null); // { wx, wy } world-space mousedown

  function commitWaypoint(wx, wy, tx, ty) {
    isDragging.current = false;
    origin.current     = null;
    yawDragState.current = { active: false, ox: 0, oy: 0, tx: 0, ty: 0 };
    if (controls) controls.enabled = true;
    const dx = tx - wx, dy = ty - wy;
    const yaw = Math.hypot(dx, dy) > 0.05 ? Math.atan2(dy, dx) : 0;
    addWaypoint({ x: wx, y: wy, z: 0, yaw });
  }

  function cancelDrag() {
    isDragging.current = false;
    origin.current     = null;
    yawDragState.current = { active: false, ox: 0, oy: 0, tx: 0, ty: 0 };
    if (controls) controls.enabled = true;
  }

  // Escape key cancel
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && isDragging.current) cancelDrag();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [controls]);

  // Safety: re-enable controls if pointer released outside canvas
  useEffect(() => {
    function onWindowUp() { if (isDragging.current) cancelDrag(); }
    window.addEventListener('pointerup', onWindowUp);
    return () => window.removeEventListener('pointerup', onWindowUp);
  }, [controls]);

  // Re-enable controls on unmount (addMode toggled off mid-drag)
  useEffect(() => {
    return () => {
      if (isDragging.current) cancelDrag();
    };
  }, [controls]);

  function onDown(e) {
    if (e.button !== 0) return; // left button only
    isDragging.current = true;
    origin.current = { wx: e.point.x, wy: e.point.y };
    // Lock crosshair ring to origin — stays there for the entire drag
    crosshairPos.current.set(e.point.x, e.point.y, 0);
    yawDragState.current = {
      active: true,
      ox: e.point.x, oy: e.point.y,
      tx: e.point.x, ty: e.point.y,
    };
    // Disable controls so right drag can't pan while we're setting yaw
    if (controls) controls.enabled = false;
  }

  function onMove(e) {
    crosshairActive.current = true;
    if (!isDragging.current) {
      // Hover — crosshair follows mouse
      crosshairPos.current.set(e.point.x, e.point.y, 0);
    } else {
      // Dragging — crosshair stays at origin; only update arrow endpoint
      yawDragState.current = {
        active: true,
        ox: origin.current.wx, oy: origin.current.wy,
        tx: e.point.x,         ty: e.point.y,
      };
    }
  }

  function onUp(e) {
    if (!isDragging.current || !origin.current) return;
    const { wx, wy } = origin.current;
    commitWaypoint(wx, wy, e.point.x, e.point.y);
    // Return crosshair to release position after commit
    crosshairPos.current.set(e.point.x, e.point.y, 0);
  }

  function onContextMenu(e) {
    e.nativeEvent?.preventDefault();
    if (isDragging.current) cancelDrag();
  }

  function onLeave() {
    crosshairActive.current = false;
    if (!isDragging.current) {
      crosshairPos.current.set(0, 0, -9999); // off-screen when not hovering
    }
  }

  if (!addMode) return null;

  return (
    <mesh
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onContextMenu={onContextMenu}
      onPointerLeave={onLeave}
      renderOrder={-1}
    >
      {/* XY plane at z=0 (no rotation), invisible but fully raycastable */}
      <planeGeometry args={[500, 500]} />
      <meshBasicMaterial side={THREE.DoubleSide} transparent opacity={0} />
    </mesh>
  );
}

// ── YawPreviewArrow ───────────────────────────────────────────────────────────
// Line + arrowhead from placement origin to current mouse position during drag.
function YawPreviewArrow() {
  const lineObj = useMemo(() => {
    const buf = new Float32Array(6);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(buf, 3));
    const mat = new THREE.LineBasicMaterial({
      color: '#00d0b6', transparent: true, opacity: 0.85, depthTest: false,
    });
    const l = new THREE.Line(geo, mat);
    l.frustumCulled = false;
    l.renderOrder = 10;
    l.visible = false;
    return l;
  }, []);

  const headRef = useRef(null);

  useFrame(() => {
    const s = yawDragState.current;
    if (!s.active) {
      lineObj.visible = false;
      if (headRef.current) headRef.current.visible = false;
      return;
    }
    lineObj.visible = true;
    const pos = lineObj.geometry.attributes.position;
    pos.setXYZ(0, s.ox, s.oy, 0.03);
    pos.setXYZ(1, s.tx, s.ty, 0.03);
    pos.needsUpdate = true;
    lineObj.geometry.computeBoundingSphere();

    if (headRef.current) {
      headRef.current.visible = true;
      headRef.current.position.set(s.tx, s.ty, 0.025);
      headRef.current.rotation.z = Math.atan2(s.ty - s.oy, s.tx - s.ox);
    }
  });

  return (
    <>
      <primitive object={lineObj} />
      <group ref={headRef} visible={false}>
        <mesh>
          <shapeGeometry args={[PREVIEW_HEAD]} />
          <meshBasicMaterial
            color="#00d0b6" side={THREE.DoubleSide}
            transparent opacity={0.88} depthTest={false}
          />
        </mesh>
      </group>
    </>
  );
}

// ── CrosshairMarker ───────────────────────────────────────────────────────────
// Teal ring + crosshairs at the placement origin.
// During drag: shows a small directional arrow inside the ring indicating yaw.
function CrosshairMarker() {
  const addMode  = useRobotStore((s) => s.addMode);
  const groupRef = useRef(null);
  const yawRef   = useRef(null); // sub-group shown only while dragging

  useFrame(() => {
    if (!groupRef.current) return;
    const on = useRobotStore.getState().addMode && crosshairActive.current;
    groupRef.current.visible = on;
    if (!on) return;

    const p = crosshairPos.current;
    groupRef.current.position.set(p.x, p.y, 0.02);

    if (yawRef.current) {
      const s = yawDragState.current;
      yawRef.current.visible = s.active;
      if (s.active) {
        yawRef.current.rotation.z = Math.atan2(s.ty - s.oy, s.tx - s.ox);
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Soft outer glow */}
      <mesh>
        <circleGeometry args={[0.46, 40]} />
        <meshBasicMaterial
          color="#00d0b6" transparent opacity={0.10}
          side={THREE.DoubleSide} depthTest={false}
        />
      </mesh>

      {/* Crisp ring outline */}
      <mesh>
        <ringGeometry args={[0.30, 0.36, 40]} />
        <meshBasicMaterial color="#00d0b6" side={THREE.DoubleSide} depthTest={false} />
      </mesh>

      {/* Crosshair — horizontal */}
      <mesh>
        <boxGeometry args={[0.52, 0.009, 0.001]} />
        <meshBasicMaterial color="#00d0b6" transparent opacity={0.60} depthTest={false} />
      </mesh>
      {/* Crosshair — vertical */}
      <mesh>
        <boxGeometry args={[0.009, 0.52, 0.001]} />
        <meshBasicMaterial color="#00d0b6" transparent opacity={0.60} depthTest={false} />
      </mesh>

      {/* Center dot */}
      <mesh>
        <circleGeometry args={[0.055, 20]} />
        <meshBasicMaterial color="#ffffff" depthTest={false} />
      </mesh>

      {/* Yaw indicator — small arrow inside ring, rotated to drag direction */}
      <group ref={yawRef} visible={false}>
        <mesh position={[0.22, 0, 0]}>
          <boxGeometry args={[0.18, 0.058, 0.001]} />
          <meshBasicMaterial color="#00d0b6" depthTest={false} />
        </mesh>
        <mesh position={[0.38, 0, 0]}>
          <shapeGeometry args={[CROSSHAIR_ARROW]} />
          <meshBasicMaterial color="#00d0b6" side={THREE.DoubleSide} depthTest={false} />
        </mesh>
      </group>
    </group>
  );
}

// ── WebGL error boundary ──────────────────────────────────────────────────────
// Catches renderer creation failures silently — shows a dark placeholder so the
// rest of the UI (panel, camera feed, navigation) keeps working.
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return <div className="viewer" style={{ background: '#121212' }} />;
    }
    return this.props.children;
  }
}

// ── Scene root ────────────────────────────────────────────────────────────────
function SceneInner() {
  const addMode  = useRobotStore((s) => s.addMode);
  const viewMode = useRobotStore((s) => s.viewMode);
  const [ctxLost, setCtxLost] = useState(false);

  const handleCreated = useCallback(({ gl }) => {
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      setCtxLost(true);
    });
    canvas.addEventListener('webglcontextrestored', () => setCtxLost(false));
  }, []);

  return (
    <div className={`viewer${addMode ? ' add-mode' : ''}`}>
      <Canvas
        camera={{ position: [-0.01, 0, 22], up: [0, 0, 1], fov: 60, near: 0.05, far: 2000 }}
        gl={{ antialias: true, failIfMajorPerformanceCaveat: false }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        onCreated={handleCreated}
      >
        <color attach="background" args={['#121212']} />
        <hemisphereLight args={[0xffffff, 0x222222, 1.2]} />
        <directionalLight position={[5, 5, 20]} intensity={0.35} />

        {/*
          Grid in world XY plane (z=0) — our Z-up "floor".
          ⚠️  infiniteGrid is NOT used: its shader assumes a hard-coded world Y=0 plane
              and ignores the mesh rotation, making it invisible in a Z-up scene.
          Instead: large finite plane (200×200 m) with explicit rotation to XY.
          rotation=[-PI/2,0,0] swings drei's default XZ mesh → XY (z=0).
        */}
        <Grid
          args={[200, 200]}
          cellSize={1}
          cellColor="#333338"
          cellThickness={0.5}
          sectionSize={5}
          sectionColor="#4a4a54"
          sectionThickness={1}
          fadeDistance={90}
          fadeStrength={1.2}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <axesHelper args={[1.5]} />

        <CameraRig />
        <GroundPlaneHitTarget />
        <CrosshairMarker />
        <YawPreviewArrow />

        <RobotModel />
        <PointCloud />
        <WaypointMarkers />
        <NavPlanLine />

        {/*
          addMode=true:
            LEFT=undefined  → OrbitControls ignores left click entirely (mesh handles it)
            RIGHT=PAN       → still pans when not dragging
            Controls are disabled while drag is active (GroundPlaneHitTarget manages this)
          addMode=false:
            Top:  left=pan,    right=orbit, scroll=zoom
            3D:   left=orbit,  right=pan,   scroll=zoom
        */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          screenSpacePanning
          maxPolarAngle={Math.PI / 2}
          mouseButtons={
            addMode
              ? { LEFT: undefined, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }
              : viewMode === 'top'
                ? { LEFT: THREE.MOUSE.PAN,    MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE }
                : { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }
          }
          touches={
            addMode
              ? { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN }
              : viewMode === 'top'
                ? { ONE: THREE.TOUCH.PAN,    TWO: THREE.TOUCH.DOLLY_ROTATE }
                : { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }
          }
        />
      </Canvas>

      {ctxLost && (
        <div className="webgl-ctx-lost">
          <div className="webgl-ctx-lost-inner">
            <div className="webgl-ctx-lost-spin" />
            <span>WebGL context lost — restoring…</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SceneCanvas() {
  return (
    <WebGLErrorBoundary>
      <SceneInner />
    </WebGLErrorBoundary>
  );
}
