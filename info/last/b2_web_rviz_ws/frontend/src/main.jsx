import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import URDFLoader from 'urdf-loader';
import './style.css';

/** Dev: Vite on :5173 talks to gateway :8080. Prod: UI served from same origin as gateway (/app/). */
const IS_DEV = import.meta.env.DEV;
const DEFAULT_BACKEND = IS_DEV
  ? `${window.location.protocol}//${window.location.hostname}:8080`
  : window.location.origin;
const DEFAULT_WS = IS_DEV
  ? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.hostname}:8080`
  : `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}`;

function yawToQuaternionZ(yaw) {
  return new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, yaw, 'XYZ'));
}

function createArrowMarker(index, x, y, yaw) {
  const group = new THREE.Group();
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.45, 24),
    new THREE.MeshBasicMaterial({ color: 0xffcc00 }),
  );
  cone.rotation.x = Math.PI / 2;
  cone.position.x = 0.22;
  group.add(cone);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.28, 0.025, 8, 32),
    new THREE.MeshBasicMaterial({ color: 0xffcc00 }),
  );
  group.add(ring);

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(20,20,20,0.8)';
  ctx.beginPath();
  ctx.arc(64, 64, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'white';
  ctx.font = 'bold 54px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(index + 1), 64, 68);
  const tex = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false }));
  sprite.scale.set(0.55, 0.55, 0.55);
  sprite.position.set(0, 0, 0.55);
  group.add(sprite);

  group.position.set(x, y, 0.05);
  group.quaternion.copy(yawToQuaternionZ(yaw));
  return group;
}

function packagesFromUrdf(xml, backendUrl) {
  const pkgs = new Set();
  const re = /package:\/\/([^/]+)\//g;
  let m = re.exec(xml);
  while (m) {
    pkgs.add(m[1]);
    m = re.exec(xml);
  }
  const packages = {};
  pkgs.forEach((p) => {
    packages[p] = `${backendUrl.replace(/\/$/, '')}/api/pkg/${p}/`;
  });
  return packages;
}

/** Apply sensor_msgs/JointState positions (rad / m) to urdf-loader robot.joints */
function applyJointPositions(urdfRobot, jointPositions) {
  if (!urdfRobot?.joints || !jointPositions || typeof jointPositions !== 'object') return;
  for (const [name, value] of Object.entries(jointPositions)) {
    const j = urdfRobot.joints[name];
    if (j?.setJointValue) j.setJointValue(Number(value));
  }
}

/** Recursively dispose Three.js geometries/materials inside a tree to release GPU memory. */
function disposeObject3D(obj) {
  if (!obj) return;
  obj.traverse((c) => {
    if (c.geometry) c.geometry.dispose?.();
    const mat = c.material;
    if (mat) {
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose?.());
      else mat.dispose?.();
    }
  });
}

/** Convert raw screen-space delta (pixels) to detect intentional drags vs accidental clicks. */
const WAYPOINT_DRAG_PX = 12;

function App() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const pointCloudRef = useRef(null);
  const robotRootRef = useRef(null);
  const urdfRobotRef = useRef(null);
  const waypointGroupRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2());
  const groundPlaneRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const pendingWaypointRef = useRef(null);
  const pointerDownScreenRef = useRef(null);
  const addModeRef = useRef(true);
  const modeRef = useRef('top');
  const waypointsRef = useRef([]);
  const urdfVersionRef = useRef(0);
  const pathLineRef = useRef(null);

  const [backendUrl, setBackendUrl] = useState(DEFAULT_BACKEND);
  const [wsUrl, setWsUrl] = useState(DEFAULT_WS);
  const [connected, setConnected] = useState(false);
  const [pose, setPose] = useState(null);
  const [navFeedback, setNavFeedback] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [repeatCount, setRepeatCount] = useState(1);
  const [mode, setMode] = useState('top');
  const [addMode, setAddMode] = useState(true);
  const [pointCount, setPointCount] = useState(0);
  const [planInfo, setPlanInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [urdfStatus, setUrdfStatus] = useState('loading…');
  const [urdfReloadTrigger, setUrdfReloadTrigger] = useState(0);
  const [liveCfg, setLiveCfg] = useState(null);
  const liveCfgPendingRef = useRef({});
  const liveCfgTimerRef = useRef(null);

  useEffect(() => {
    addModeRef.current = addMode;
  }, [addMode]);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect(() => {
    waypointsRef.current = waypoints;
  }, [waypoints]);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101418);
    sceneRef.current = scene;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.05, 1000);
    camera.position.set(0, -12, 14);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = true;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    const grid = new THREE.GridHelper(40, 40, 0x445566, 0x223344);
    grid.rotation.x = Math.PI / 2;
    scene.add(grid);

    const axes = new THREE.AxesHelper(1.5);
    scene.add(axes);

    const light = new THREE.HemisphereLight(0xffffff, 0x222222, 1.2);
    scene.add(light);
    const dir = new THREE.DirectionalLight(0xffffff, 0.35);
    dir.position.set(5, 5, 20);
    scene.add(dir);

    const robotRoot = new THREE.Group();
    robotRootRef.current = robotRoot;
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.55, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x4cc9f0, roughness: 0.35 }),
    );
    body.position.z = 0.35;
    body.name = 'placeholder_body';
    robotRoot.add(body);
    const nose = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.35, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff }),
    );
    nose.rotation.z = -Math.PI / 2;
    nose.position.set(0.72, 0, 0.35);
    nose.name = 'placeholder_nose';
    robotRoot.add(nose);
    scene.add(robotRoot);

    const waypointGroup = new THREE.Group();
    scene.add(waypointGroup);
    waypointGroupRef.current = waypointGroup;

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const onPointerDown = (event) => {
      if (!addModeRef.current) return;
      if (event.button !== undefined && event.button !== 0) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointerDownScreenRef.current = { x: event.clientX, y: event.clientY };
      pointerRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(pointerRef.current, camera);
      const hit = new THREE.Vector3();
      if (raycasterRef.current.ray.intersectPlane(groundPlaneRef.current, hit)) {
        pendingWaypointRef.current = { x: hit.x, y: hit.y, z: 0, yaw: 0 };
      }
    };

    const onPointerUp = (event) => {
      if (!addModeRef.current || !pendingWaypointRef.current) return;
      const downAt = pointerDownScreenRef.current;
      pointerDownScreenRef.current = null;
      const wp = pendingWaypointRef.current;
      pendingWaypointRef.current = null;

      const rect = renderer.domElement.getBoundingClientRect();
      const screenDx = downAt ? event.clientX - downAt.x : 0;
      const screenDy = downAt ? event.clientY - downAt.y : 0;
      const screenDist = Math.hypot(screenDx, screenDy);

      // In 3D mode, OrbitControls also rotates with left-drag. Only treat as a tap
      // (waypoint w/ yaw=0) when the pointer barely moved; treat real drags as orbit gestures.
      if (modeRef.current === '3d' && screenDist > WAYPOINT_DRAG_PX) {
        return;
      }

      pointerRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(pointerRef.current, camera);
      const hit = new THREE.Vector3();
      if (raycasterRef.current.ray.intersectPlane(groundPlaneRef.current, hit)) {
        const dx = hit.x - wp.x;
        const dy = hit.y - wp.y;
        if (Math.hypot(dx, dy) > 0.08) wp.yaw = Math.atan2(dy, dx);
      }
      setWaypoints((old) => [...old, wp]);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      const cloud = pointCloudRef.current;
      if (cloud) {
        cloud.parent?.remove(cloud);
        cloud.geometry.dispose();
        cloud.material.dispose();
        pointCloudRef.current = null;
      }
      const path = pathLineRef.current;
      if (path) {
        path.parent?.remove(path);
        path.geometry.dispose();
        path.material.dispose();
        pathLineRef.current = null;
      }
      controls.dispose();
      disposeObject3D(scene);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (mode === 'top') {
      camera.position.set(0, 0, 22);
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0);
      controls.target.set(0, 0, 0);
      controls.enableRotate = false;
    } else {
      camera.position.set(10, -14, 9);
      camera.up.set(0, 0, 1);
      camera.lookAt(0, 0, 0);
      controls.target.set(0, 0, 0);
      controls.enableRotate = true;
    }
    controls.update();
  }, [mode]);

  useEffect(() => {
    const group = waypointGroupRef.current;
    if (!group) return;
    while (group.children.length) group.remove(group.children[0]);
    waypoints.forEach((wp, idx) => group.add(createArrowMarker(idx, wp.x, wp.y, wp.yaw || 0)));
  }, [waypoints]);

  useEffect(() => {
    let cancelled = false;
    async function loadUrdf() {
      setUrdfStatus('fetching…');
      try {
        const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/robot_description`);
        if (!res.ok) {
          setUrdfStatus(`HTTP ${res.status}`);
          setError(`URDF fetch failed: HTTP ${res.status}`);
          return;
        }
        const data = await res.json();
        const xml = data.robot_description || '';
        const reportedVersion = Number(data.urdf_version) || 0;
        if (reportedVersion) urdfVersionRef.current = reportedVersion;
        if (cancelled || !xml || xml.length < 80) {
          setUrdfStatus(xml ? 'empty' : 'no URDF (run robot_state_publisher)');
          return;
        }
        const scene = sceneRef.current;
        const robotRoot = robotRootRef.current;
        if (!scene || !robotRoot) return;

        urdfRobotRef.current = null;

        const manager = new THREE.LoadingManager();
        manager.onError = (url) => console.warn('URDF asset error:', url);
        let robot;
        manager.onLoad = () => {
          let meshCount = 0;
          robot.updateMatrixWorld(true);
          robot.traverse((c) => {
            if (c.isMesh) {
              meshCount += 1;
              c.frustumCulled = false;
              const mats = Array.isArray(c.material) ? c.material : [c.material];
              mats.forEach((mat) => {
                if (!mat) return;
                mat.side = THREE.DoubleSide;
                if ('emissive' in mat && mat.emissive) {
                  mat.emissive.setHex(0x2a2a2a);
                }
                if ('needsUpdate' in mat) mat.needsUpdate = true;
              });
            }
          });
          setUrdfStatus(
            meshCount > 0
              ? `OK (${meshCount} meshes)`
              : 'OK (0 meshes — check browser console /api/pkg/*.dae)',
          );
        };

        const loader = new URDFLoader(manager);
        loader.packages = packagesFromUrdf(xml, backendUrl.replace(/\/$/, ''));

        robot = loader.parse(xml);

        // Scene is already ROS-like: XY ground, Z up (camera.up, grid, TF quaternion).
        // Do not rotate the URDF here — B2 / Unitree meshes are Z-up; +90° on X looked "sideways".

        while (robotRoot.children.length) {
          const ch = robotRoot.children[0];
          robotRoot.remove(ch);
          ch.traverse((obj) => {
            if (obj.geometry) obj.geometry.dispose();
            const mat = obj.material;
            if (mat) {
              if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
              else mat.dispose();
            }
          });
        }
        robotRoot.add(robot);
        urdfRobotRef.current = robot;
      } catch (e) {
        console.warn(e);
        setUrdfStatus(`failed: ${e.message}`);
      }
    }
    loadUrdf();
    return () => {
      cancelled = true;
    };
  }, [backendUrl, urdfReloadTrigger]);

  useEffect(() => {
    const statusWs = new WebSocket(`${wsUrl.replace(/\/$/, '')}/ws/status`);
    statusWs.onopen = () => {
      setConnected(true);
      statusWs.send('ping');
    };
    statusWs.onclose = () => setConnected(false);
    statusWs.onerror = () => setConnected(false);
    statusWs.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.pose) {
          setPose(data.pose);
          const rr = robotRootRef.current;
          if (rr) {
            rr.position.set(data.pose.x, data.pose.y, data.pose.z || 0);
            rr.quaternion.set(data.pose.qx, data.pose.qy, data.pose.qz, data.pose.qw);
          }
        }
        if (data.joint_positions) {
          applyJointPositions(urdfRobotRef.current, data.joint_positions);
        }
        if (data.nav_feedback) setNavFeedback(data.nav_feedback);
        if (typeof data.urdf_version === 'number' && data.urdf_version !== urdfVersionRef.current) {
          urdfVersionRef.current = data.urdf_version;
          setUrdfReloadTrigger((n) => n + 1);
        }
        if ('nav_plan' in data) {
          updatePathLine(data.nav_plan);
          setPlanInfo(
            data.nav_plan
              ? { count: data.nav_plan.count, frame: data.nav_plan.frame_id }
              : null,
          );
        }
      } catch (e) {
        /* ignore */
      }
    };

    const pcWs = new WebSocket(`${wsUrl.replace(/\/$/, '')}/ws/pointcloud`);
    pcWs.binaryType = 'arraybuffer';
    pcWs.onopen = () => pcWs.send('ping');
    pcWs.onmessage = (event) => {
      if (!(event.data instanceof ArrayBuffer)) return;
      const bytes = new Uint8Array(event.data);
      let newline = -1;
      for (let i = 0; i < bytes.length; i++) {
        if (bytes[i] === 10) {
          newline = i;
          break;
        }
      }
      if (newline < 0) return;
      const headerText = new TextDecoder().decode(bytes.slice(0, newline));
      const header = JSON.parse(headerText);
      const pointsBuffer = event.data.slice(newline + 1);
      const positions = new Float32Array(pointsBuffer);
      updatePointCloud(positions, header.count, header);
      setPointCount(header.count);
    };

    return () => {
      statusWs.close();
      pcWs.close();
    };
  }, [wsUrl]);

  function updatePointCloud(positions, count, header) {
    const scene = sceneRef.current;
    const robot = robotRootRef.current;
    if (!scene || !robot) return;

    const attach = header && header.in_robot_frame === true;
    const old = pointCloudRef.current;
    if (old) {
      old.parent?.remove(old);
      old.geometry.dispose();
      old.material.dispose();
      pointCloudRef.current = null;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions.slice(0, count * 3), 3));
    const material = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xa7f3d0,
      sizeAttenuation: true,
    });
    const cloud = new THREE.Points(geometry, material);
    pointCloudRef.current = cloud;

    if (attach) {
      robot.add(cloud);
    } else {
      scene.add(cloud);
    }
  }

  function clearPathLine() {
    const scene = sceneRef.current;
    const line = pathLineRef.current;
    if (line) {
      if (scene) scene.remove(line);
      line.geometry.dispose();
      line.material.dispose();
      pathLineRef.current = null;
    }
  }

  function updatePathLine(plan) {
    const scene = sceneRef.current;
    if (!scene) return;
    const pts = plan?.points;
    if (!pts || pts.length < 2) {
      clearPathLine();
      return;
    }
    const positions = new Float32Array(pts.length * 3);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      // Lift slightly off the ground so it doesn't z-fight with the grid.
      positions[i * 3 + 2] = (p.z ?? 0) + 0.04;
    }
    const existing = pathLineRef.current;
    if (existing && existing.geometry.attributes.position.array.length === positions.length) {
      existing.geometry.attributes.position.array.set(positions);
      existing.geometry.attributes.position.needsUpdate = true;
      existing.geometry.computeBoundingSphere();
      return;
    }
    clearPathLine();
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: 0x22d3ee, // cyan, distinct from yellow waypoints
      transparent: true,
      opacity: 0.95,
    });
    const line = new THREE.Line(geom, mat);
    line.frustumCulled = false;
    line.renderOrder = 2;
    scene.add(line);
    pathLineRef.current = line;
  }

  function syncWsFromBackend(url) {
    try {
      const u = new URL(url);
      const proto = u.protocol === 'https:' ? 'wss' : 'ws';
      setWsUrl(`${proto}://${u.hostname}:${u.port || '8080'}`);
    } catch {
      /* keep */
    }
  }

  async function saveWaypoints(nextWaypoints) {
    const wps = nextWaypoints ?? waypointsRef.current;
    const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/waypoints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ waypoints: wps }),
    });
    if (!res.ok) throw new Error(await res.text());
  }

  async function startNavigation() {
    try {
      await saveWaypoints();
      const rc = Number.parseInt(String(repeatCount), 10);
      const repeat = Number.isFinite(rc) ? rc : 1;
      const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/navigation/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repeat_count: repeat }),
      });
      if (!res.ok) throw new Error(await res.text());
      setMessage('Navigation started');
      setError('');
    } catch (e) {
      setError(`Start failed: ${e.message}`);
    }
  }

  async function cancelNavigation() {
    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/navigation/cancel`, { method: 'POST' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setMessage('Cancel requested');
      setError('');
    } catch (e) {
      setError(`Cancel failed: ${e.message}`);
    }
  }

  async function clearWaypoints() {
    setWaypoints([]);
    await fetch(`${backendUrl.replace(/\/$/, '')}/api/navigation/clear`, { method: 'POST' });
  }

  function removeLastWaypoint() {
    setWaypoints((old) => old.slice(0, -1));
  }

  useEffect(() => {
    let cancelled = false;
    async function fetchCfg() {
      try {
        const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/config`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const cfg = await res.json();
        if (!cancelled) setLiveCfg(cfg);
      } catch (e) {
        if (!cancelled) setError(`Config load failed: ${e.message}`);
      }
    }
    fetchCfg();
    return () => {
      cancelled = true;
    };
  }, [backendUrl]);

  // Debounced commit: merge updates into a pending bag, fire one POST at the trailing edge.
  function pushLiveCfg(partial) {
    setLiveCfg((c) => (c ? { ...c, ...partial } : c));
    Object.assign(liveCfgPendingRef.current, partial);
    if (liveCfgTimerRef.current) clearTimeout(liveCfgTimerRef.current);
    liveCfgTimerRef.current = setTimeout(async () => {
      const body = liveCfgPendingRef.current;
      liveCfgPendingRef.current = {};
      try {
        const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/config`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          let detail = `HTTP ${res.status}`;
          try {
            const j = await res.json();
            if (j?.detail) detail = typeof j.detail === 'string' ? j.detail : JSON.stringify(j.detail);
          } catch {
            /* ignore */
          }
          throw new Error(detail);
        }
        const updated = await res.json();
        setLiveCfg(updated);
        setError('');
      } catch (e) {
        setError(`Config: ${e.message}`);
      }
    }, 250);
  }

  useEffect(() => () => {
    if (liveCfgTimerRef.current) clearTimeout(liveCfgTimerRef.current);
  }, []);

  return (
    <div className="app">
      <div className="toolbar">
        <div className="brand">B2 Web RViz</div>
        <label>
          Backend{' '}
          <input
            value={backendUrl}
            onChange={(e) => {
              setBackendUrl(e.target.value);
              syncWsFromBackend(e.target.value);
            }}
          />
        </label>
        <label>
          WS{' '}
          <input value={wsUrl} onChange={(e) => setWsUrl(e.target.value)} />
        </label>
        <span className={connected ? 'ok' : 'bad'}>{connected ? 'connected' : 'offline'}</span>
        <a className="brand-link" href="/" title="Back to dashboard">
          ≡ Dashboard
        </a>
      </div>

      <div className="layout">
        <div className="viewer" ref={mountRef} />
        <div className="panel">
          <h2>View</h2>
          <div className="row">
            <button type="button" onClick={() => setMode('top')} className={mode === 'top' ? 'active' : ''}>
              Top View
            </button>
            <button type="button" onClick={() => setMode('3d')} className={mode === '3d' ? 'active' : ''}>
              3D View
            </button>
          </div>
          <label className="check">
            <input type="checkbox" checked={addMode} onChange={(e) => setAddMode(e.target.checked)} /> Add waypoint
            (click / touch then drag for yaw)
          </label>
          <p className="hint">ใช้ได้ทั้ง Top และ 3D — ปักบนระนาบพื้น Z=0 เหมือน RViz 2D Pose estimate</p>

          <h2>Robot</h2>
          <div className="kv">
            Pose:{' '}
            {pose
              ? `${pose.x.toFixed(2)}, ${pose.y.toFixed(2)}, yaw ${((pose.yaw * 180) / Math.PI).toFixed(1)}°`
              : '-'}
          </div>
          <div className="kv">URDF: {urdfStatus}</div>
          <div className="kv">PointCloud: {pointCount.toLocaleString()} pts</div>
          <div className="kv">
            Plan:{' '}
            <span style={{ color: planInfo ? '#22d3ee' : '#94a3b8' }}>
              {planInfo ? `${planInfo.count} pts (${planInfo.frame})` : '-'}
            </span>
          </div>
          <div className="kv">Nav: {navFeedback ? JSON.stringify(navFeedback) : '-'}</div>

          <h2>Waypoints</h2>
          <div className="waypointList">
            {waypoints.map((wp, i) => (
              <div key={`wp-${i}-${wp.x}-${wp.y}`} className="wp">
                <b>{i + 1}</b> x={wp.x.toFixed(2)} y={wp.y.toFixed(2)} yaw={((wp.yaw * 180) / Math.PI).toFixed(0)}°
              </div>
            ))}
            {waypoints.length === 0 && (
              <div className="hint">คลิกแล้วลากบนแผนที่เพื่อปัก waypoint + ทิศ</div>
            )}
          </div>

          <label>
            Repeat rounds{' '}
            <input
              type="number"
              value={repeatCount}
              onChange={(e) => setRepeatCount(e.target.value)}
            />
          </label>
          <div className="hint">ใช้ -1 = วนซ้ำไม่จำกัดจนกด Cancel</div>

          <div className="actions">
            <button type="button" className="primary" onClick={startNavigation}>
              Start Navigate Waypoints
            </button>
            <button type="button" onClick={cancelNavigation}>
              Cancel
            </button>
            <button type="button" onClick={removeLastWaypoint}>
              Undo
            </button>
            <button type="button" onClick={clearWaypoints}>
              Clear
            </button>
          </div>
          {message && <div className="message">{message}</div>}
          {error && <div className="message error" role="alert">{error}</div>}

          <h2>Stream settings</h2>
          {!liveCfg ? (
            <div className="hint">loading…</div>
          ) : (
            <>
              <label>
                Pointcloud rate: <b>{Number(liveCfg.pointcloud_rate_hz ?? 0).toFixed(1)} Hz</b>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={liveCfg.pointcloud_rate_hz ?? 5}
                  onChange={(e) => pushLiveCfg({ pointcloud_rate_hz: Number(e.target.value) })}
                />
              </label>
              <label>
                Max points: <b>{(liveCfg.max_points ?? 0).toLocaleString()}</b>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={liveCfg.max_points ?? 80000}
                  onChange={(e) => pushLiveCfg({ max_points: Number(e.target.value) })}
                />
              </label>
              <label>
                Range limit: <b>{Number(liveCfg.pointcloud_range_limit ?? 0).toFixed(1)} m</b>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={liveCfg.pointcloud_range_limit ?? 40}
                  onChange={(e) => pushLiveCfg({ pointcloud_range_limit: Number(e.target.value) })}
                />
              </label>
              <div className="row">
                <label style={{ flex: 1 }}>
                  Z min (m)
                  <input
                    type="number"
                    step="0.1"
                    value={liveCfg.pointcloud_z_min ?? -3}
                    onChange={(e) => pushLiveCfg({ pointcloud_z_min: Number(e.target.value) })}
                  />
                </label>
                <label style={{ flex: 1 }}>
                  Z max (m)
                  <input
                    type="number"
                    step="0.1"
                    value={liveCfg.pointcloud_z_max ?? 3}
                    onChange={(e) => pushLiveCfg({ pointcloud_z_max: Number(e.target.value) })}
                  />
                </label>
              </div>
              <label className="check">
                <input
                  type="checkbox"
                  checked={Boolean(liveCfg.pointcloud_in_robot_frame)}
                  onChange={(e) => pushLiveCfg({ pointcloud_in_robot_frame: e.target.checked })}
                />{' '}
                Cloud in robot frame (FAST-LIO body)
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={Boolean(liveCfg.transform_pointcloud)}
                  onChange={(e) => pushLiveCfg({ transform_pointcloud: e.target.checked })}
                />{' '}
                Apply TF to cloud (when not in robot frame)
              </label>
              <label>
                TF time mode
                <select
                  value={liveCfg.pointcloud_tf_time ?? 'latest'}
                  onChange={(e) => pushLiveCfg({ pointcloud_tf_time: e.target.value })}
                >
                  <option value="latest">latest (recommended)</option>
                  <option value="message_stamp">message_stamp</option>
                  <option value="now">now</option>
                </select>
              </label>
              <p className="hint">
                เปลี่ยนค่าแล้วถูกส่งให้ ROS แบบ live (debounce 0.25s); ปรับ topic / frame ต้องรีสตาร์ท node
              </p>
            </>
          )}

          <h2>Notes</h2>
          <p>
            Gateway แปลงเมฆเข้า <code>fixed_frame</code> ให้อัตโนมัติ (ถ้า TF พร้อม) และส่งแม่แบบหุ่นผ่าน{' '}
            <code>/api/robot_description</code> + <code>/api/pkg/&lt;pkg&gt;/…</code> สำหรับ mesh
          </p>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
