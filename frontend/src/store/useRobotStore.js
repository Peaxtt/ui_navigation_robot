/**
 * Layer 2: Global State (Zustand)
 *
 * Single source of truth for all robot state consumed by both
 * UI components (Layer 1) and the R3F canvas (Layer 3).
 *
 * WS connections are owned here — components are purely reactive.
 */
import { create } from 'zustand';

const IS_DEV = import.meta.env.DEV;

function resolveBackend() {
  return IS_DEV
    ? `${window.location.protocol}//${window.location.hostname}:8080`
    : window.location.origin;
}

function resolveWS(backendUrl) {
  try {
    const u = new URL(backendUrl);
    const proto = u.protocol === 'https:' ? 'wss' : 'ws';
    return `${proto}://${u.hostname}:${u.port || '8080'}`;
  } catch {
    return IS_DEV
      ? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.hostname}:8080`
      : `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}`;
  }
}

export const useRobotStore = create((set, get) => ({
  // ── Connection ──────────────────────────────────────────────
  backendUrl: resolveBackend(),
  wsUrl: resolveWS(resolveBackend()),
  connected: false,

  setBackendUrl: (url) => {
    set({ backendUrl: url, wsUrl: resolveWS(url) });
  },

  // ── Robot State ──────────────────────────────────────────────
  pose: null,           // { x, y, z, qx, qy, qz, qw, yaw }
  jointPositions: {},   // { joint_name: radians }
  urdfVersion: 0,       // bumped when backend reloads URDF
  urdfStatus: 'loading…',

  // ── Navigation ───────────────────────────────────────────────
  waypoints: [],        // [{ x, y, z, yaw }]
  navFeedback: null,
  navigationRunning: false,
  repeatCount: 1,
  navPlan: null,        // { frame_id, count, points: [{x,y,z,yaw}] }

  // ── Point Cloud ──────────────────────────────────────────────
  pointCount: 0,
  // Float32Array of xyz positions — stored outside Zustand to avoid re-render on every frame
  // Access via the ref exported below (pointsRef)
  pointCloudHeader: null,

  // ── Live Config ──────────────────────────────────────────────
  liveCfg: null,

  // ── UI state ─────────────────────────────────────────────────
  viewMode: 'top',      // 'top' | '3d'
  addMode: true,
  message: '',
  error: '',

  setViewMode: (v) => set({ viewMode: v }),
  setAddMode: (v) => set({ addMode: v }),
  setUrdfStatus: (s) => set({ urdfStatus: s }),
  setMessage: (m) => set({ message: m }),
  setError: (e) => set({ error: e }),
  setRepeatCount: (n) => set({ repeatCount: n }),
  setLiveCfg: (cfg) => set({ liveCfg: cfg }),

  // ── Waypoint helpers (local UI only — POST separately) ───────
  addWaypoint: (wp) => set((s) => ({ waypoints: [...s.waypoints, wp] })),
  removeLastWaypoint: () => set((s) => ({ waypoints: s.waypoints.slice(0, -1) })),
  setWaypoints: (wps) => set({ waypoints: wps }),

  // ── WebSocket lifecycle ──────────────────────────────────────
  _statusWs: null,
  _pcWs: null,

  connectWS: () => {
    const { wsUrl, _statusWs, _pcWs } = get();

    // Close stale connections
    if (_statusWs) _statusWs.close();
    if (_pcWs) _pcWs.close();

    // ── Status WS ───────────────────────────────────────────────
    const statusWs = new WebSocket(`${wsUrl}/ws/status`);
    statusWs.onopen = () => {
      set({ connected: true });
      statusWs.send('ping');
    };
    statusWs.onclose = () => set({ connected: false });
    statusWs.onerror = () => set({ connected: false });
    statusWs.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        const patch = {};
        if (data.pose) patch.pose = data.pose;
        if (data.joint_positions) patch.jointPositions = data.joint_positions;
        if (data.nav_feedback) patch.navFeedback = data.nav_feedback;
        if (typeof data.navigation_running === 'boolean') patch.navigationRunning = data.navigation_running;
        if ('nav_plan' in data) patch.navPlan = data.nav_plan ?? null;
        if (typeof data.urdf_version === 'number') {
          const prev = get().urdfVersion;
          if (data.urdf_version !== prev) patch.urdfVersion = data.urdf_version;
        }
        if (Object.keys(patch).length) set(patch);
      } catch { /* ignore */ }
    };

    // ── PointCloud WS ────────────────────────────────────────────
    const pcWs = new WebSocket(`${wsUrl}/ws/pointcloud`);
    pcWs.binaryType = 'arraybuffer';
    pcWs.onopen = () => pcWs.send('ping');
    pcWs.onmessage = (ev) => {
      if (!(ev.data instanceof ArrayBuffer)) return;
      const bytes = new Uint8Array(ev.data);
      let nl = -1;
      for (let i = 0; i < bytes.length; i++) {
        if (bytes[i] === 10) { nl = i; break; }
      }
      if (nl < 0) return;
      const header = JSON.parse(new TextDecoder().decode(bytes.slice(0, nl)));
      // Float32Array requires the byte offset to be divisible by 4.
      // nl+1 may not be aligned (e.g. JSON header length 57 → offset 58 → 58%4=2 → RangeError).
      // Safe path: copy unaligned data into a fresh aligned ArrayBuffer.
      const rawOffset = nl + 1;
      let floatView;
      if (rawOffset % 4 === 0) {
        floatView = new Float32Array(ev.data, rawOffset);
      } else {
        const byteLen = ev.data.byteLength - rawOffset;
        const aligned = new ArrayBuffer(byteLen);
        new Uint8Array(aligned).set(new Uint8Array(ev.data, rawOffset, byteLen));
        floatView = new Float32Array(aligned);
      }
      pointsRef.current = floatView;
      set({ pointCount: header.count, pointCloudHeader: header });
    };

    set({ _statusWs: statusWs, _pcWs: pcWs });
  },

  disconnectWS: () => {
    const { _statusWs, _pcWs } = get();
    if (_statusWs) _statusWs.close();
    if (_pcWs) _pcWs.close();
    set({ _statusWs: null, _pcWs: null, connected: false });
  },
}));

/**
 * Raw point cloud buffer — stored as a plain ref outside Zustand to avoid
 * triggering React re-renders on every point cloud frame (up to 20 Hz).
 * The R3F canvas reads this directly each frame.
 */
export const pointsRef = { current: null };
