# B2 Web RViz — Frontend

Browser-based RViz replacement for the Unitree B2 quadruped robot.
Built with React Three Fiber — serves a full 3D point cloud viewer, URDF robot model, and Nav2 waypoint control from a single browser tab.

```
Browser  ──/app/──→  nginx (Docker :3000)
                         │
                  proxy /api/*  ──→  ROS 2 gateway (robot :8080)
                  proxy /ws/*   ──→  ROS 2 gateway (robot :8080)
```

---

## Tech Stack

| Layer | Package | Version |
|---|---|---|
| 3D engine | Three.js | ^0.176 |
| React Three Fiber | @react-three/fiber | ^8.18 |
| drei helpers | @react-three/drei | ^9.122 |
| UI state | Zustand | ^4.5 |
| Icons | lucide-react | ^0.475 |
| Build | Vite | ^5.4 |
| Serve | nginx | 1.27-alpine |
| Node (build) | Node.js | 22 LTS |

---

## Prerequisites

- **Docker + Docker Compose** (for production)
- **Node.js 22+** (for local development only)
- Robot running the ROS 2 gateway on port `8080`

---

## Quick Start (Development)

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

Vite proxies `/api/*` and `/ws/*` to `http://localhost:8080` in dev mode.
The robot (or `dev.sh` with rosbag) must be running and reachable at that address.

### dev.sh — full local simulation (requires ROS 2 Humble)

```bash
./dev.sh          # 4-pane tmux: Vite + ROS2 gateway + rosbag + dummy cam
./dev.sh front    # frontend + dummy cam only — no ROS 2 needed
./dev.sh stop     # kill session
```

| URL | Service |
|-----|---------|
| `http://localhost:5173` | Vite dev server (hot-reload) |
| `http://localhost:8080/app/` | Production build via ROS 2 gateway |
| `http://localhost:8082/video` | Dummy MJPEG camera |

---

## Docker (Production)

### 1. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
# URL of the ROS 2 gateway on the robot
GATEWAY_URL=http://192.168.123.1:8080

# Host port for the frontend container (default 3000)
FRONTEND_PORT=3000
```

### 2. Build and start

```bash
docker compose up -d --build
```

nginx starts, reads `GATEWAY_URL` from the environment, and proxies all `/api/*` and `/ws/*` requests to the robot automatically.

### 3. Access

Open `http://<your-pc-ip>:3000/app/` in the browser.

### Other Docker commands

```bash
# Rebuild image after code changes
docker compose build --no-cache

# View logs
docker compose logs -f frontend

# Stop
docker compose down

# Run a one-off build without compose
docker build -t b2-web-rviz-frontend ./frontend
docker run -e GATEWAY_URL=http://192.168.123.1:8080 -p 3000:80 b2-web-rviz-frontend
```

---

## Manual Build (without Docker)

```bash
cd frontend
npm install
npm run build
# dist/ is the production bundle (base path /app/)
```

Copy `dist/` to wherever nginx or the ROS 2 gateway serves static files:

```bash
# Serve via the ROS 2 gateway on the robot
scp -r dist/* unitree@192.168.123.1:~/b2_web_rviz_ws/src/b2_web_rviz/www/
```

---

## Project Structure (frontend/)

```
frontend/
├── Dockerfile               ← node:22 build → nginx:1.27 serve
├── nginx.conf               ← nginx template (GATEWAY_URL substituted at start)
├── vite.config.js           ← base: /app/ in prod, dev proxy → :8080
├── package.json
└── src/
    ├── App.jsx
    ├── style.css
    ├── canvas/              ← React Three Fiber 3D scene
    │   ├── SceneCanvas.jsx  ← Canvas, camera, ground plane, crosshair
    │   ├── PointCloud.jsx   ← Dual-layer live scan + map ring buffer
    │   ├── RobotModel.jsx   ← URDF + joint animation
    │   ├── WaypointMarkers.jsx
    │   └── NavPlanLine.jsx
    ├── components/          ← React UI panels
    │   ├── Toolbar.jsx
    │   ├── ControlPanel.jsx
    │   ├── WaypointList.jsx
    │   ├── CameraFeed.jsx
    │   └── StreamSettings.jsx
    └── store/
        └── useRobotStore.js ← Zustand store + WebSocket lifecycle
```

---

## Configuration

### Backend URL resolution

`useRobotStore.js` auto-resolves the backend URL:

| Mode | Resolution |
|------|-----------|
| Dev (`npm run dev`) | `window.location.hostname + :8080` |
| Production | `window.location.origin` (same origin → nginx proxy) |

With Docker, nginx handles the proxy so the frontend always hits the same origin. No URL configuration needed in the UI.

### Runtime override (without rebuild)

The **Stream Settings** panel in the UI has a **Gateway URL** field. Changing it reconnects the WebSocket and REST calls to the new address immediately — no page reload needed.

---

## WebSocket & API Contract

The frontend expects the ROS 2 gateway at `GATEWAY_URL` to expose:

### WebSocket `/ws/status` (~10 Hz)

JSON object pushed from server:

```json
{
  "pose": { "x": 0.0, "y": 0.0, "z": 0.0, "qx": 0, "qy": 0, "qz": 0, "qw": 1, "yaw": 0 },
  "joint_positions": { "FR_hip_joint": 0.1 },
  "nav_feedback": { "current_waypoint": 0 },
  "navigation_running": false,
  "nav_plan": { "frame_id": "odom_sync", "count": 2, "points": [] },
  "urdf_version": 1
}
```

### WebSocket `/ws/pointcloud` (~5 Hz)

Binary frame: `[UTF-8 JSON header]\n[Float32Array XYZ]`

```json
{ "count": 12000, "in_robot_frame": false }
```

followed by `count × 3` float32 values.

### REST

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/waypoints` | `{ waypoints: [{x,y,z,yaw}] }` |
| `POST` | `/api/navigation/start` | `{ repeat_count: N }` |
| `POST` | `/api/navigation/cancel` | Cancel Nav2 |
| `POST` | `/api/navigation/clear` | Clear waypoints |
| `GET` | `/api/video_feed` | MJPEG stream |
| `GET` | `/api/robot_description` | URDF XML |
| `GET/POST` | `/api/config` | Stream config |

---

## Browser Requirements

Any modern browser (Chrome 110+, Firefox 115+, Edge 110+) with WebGL enabled.

**VM / remote desktop / no GPU:** launch Chrome with software rendering:

```bash
./scripts/launch-browser.sh          # dev  → :5173
./scripts/launch-browser.sh prod     # prod → :3000/app/
```

Or manually:

```bash
google-chrome --use-gl=swiftshader --ignore-gpu-blocklist http://localhost:3000/app/
```

---

## Using the Interface

### Toolbar

| Button | Action |
|--------|--------|
| `⊞ Top` / `◈ 3D` | Switch camera view |
| `Placing Waypoints` (teal) | Click-drag on map to add waypoints with yaw |
| `Navigate` (grey) | Camera-only pan/orbit — no waypoints placed |

### Waypoint placement (RViz-style)

1. Switch to **Placing Waypoints** mode.
2. **Click and hold** on the ground plane.
3. **Drag** to set heading direction (preview arrow appears).
4. **Release** to confirm.
5. Press **Escape** or right-click to cancel.

### Control Panel

- **Status** — pose (x, y, yaw), connection status
- **Navigation** — waypoint list, start/cancel/clear, repeat count
- **Camera** — live MJPEG feed
- **Stream** — Gateway URL override, camera settings
