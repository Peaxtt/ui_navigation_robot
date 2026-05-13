# B2 Web RViz

Browser-based RViz for the Unitree B2 robot — 3D point cloud, URDF model, Nav2 waypoint control, and live camera feed from a single browser tab. Installable as a PWA on iPad via Safari.

```
Browser  ──/app/──→  nginx  ──/api/*──→  ROS 2 gateway :8080
                            ──/ws/* ──→  ROS 2 gateway :8080
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

## Quick Start (Development)

```bash
cd frontend
npm install
npm run dev        # → http://localhost:5173
```

Vite proxies `/api/*` and `/ws/*` to `http://localhost:8080` automatically.

### dev.sh — full local stack in tmux

```bash
./dev.sh           # Vite + ROS 2 gateway + rosbag + dummy MJPEG camera
./dev.sh rtsp      # same, but dummy camera uses GStreamer RTSP instead of MJPEG
./dev.sh front     # frontend + dummy camera only (no ROS 2 needed)
./dev.sh stop      # kill tmux session
```

| URL | Service |
|-----|---------|
| `http://localhost:5173` | Vite dev server (hot-reload) |
| `http://localhost:8080/app/` | Production build served by gateway |
| `http://localhost:8082/video` | Dummy MJPEG camera (default mode) |
| `rtsp://localhost:8554/front_video` | Dummy RTSP camera (`rtsp` mode) |

---

## Docker (Production)

### 1. Configure

```bash
cp .env.example .env
```

`.env` defaults:

```env
GATEWAY_URL=http://192.168.123.1:8080   # ROS 2 gateway on the robot
FRONTEND_PORT=3000                       # host port
```

### 2. Build and start

```bash
docker compose up -d --build
```

nginx reads `GATEWAY_URL` at container start and proxies `/api/*` and `/ws/*` — no rebuild needed when changing the robot IP.

### 3. Access

Open `http://<your-pc-ip>:3000/app/` in the browser.

### Other Docker commands

```bash
docker compose build --no-cache   # rebuild after code changes
docker compose logs -f frontend   # view logs
docker compose down               # stop
```

---

## Manual Build (without Docker)

```bash
cd frontend && npm install && npm run build
# dist/ → production bundle (base path /app/)

# Copy to robot
scp -r dist/* unitree@192.168.123.1:~/b2_web_rviz_ws/src/b2_web_rviz/www/
```

---

## Project Structure

```
.
├── dev.sh                       ← tmux dev launcher (full / rtsp / front / stop)
├── docker-compose.yml
├── .env.example
├── frontend/                    ← React + R3F app
│   ├── Dockerfile
│   ├── nginx.conf               ← GATEWAY_URL substituted at container start
│   ├── vite.config.js
│   ├── index.html               ← PWA meta tags + fonts
│   ├── public/
│   │   ├── manifest.json        ← PWA manifest (standalone, iPad installable)
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── apple-touch-icon*.png
│   └── src/
│       ├── App.jsx
│       ├── canvas/
│       │   ├── SceneCanvas.jsx  ← WebGL canvas, camera, waypoint crosshair, grid
│       │   ├── PointCloud.jsx   ← live scan + 2D occupancy map (SLAM-style)
│       │   ├── RobotModel.jsx   ← URDF + joint animation
│       │   ├── WaypointMarkers.jsx
│       │   └── NavPlanLine.jsx
│       ├── components/
│       │   ├── Toolbar.jsx
│       │   ├── ControlPanel.jsx
│       │   ├── WaypointList.jsx
│       │   ├── CameraFeed.jsx   ← MJPEG stream from /api/video_feed
│       │   └── StreamSettings.jsx
│       └── store/
│           └── useRobotStore.js ← Zustand + WebSocket lifecycle
├── backend/b2_web_rviz/         ← ROS 2 FastAPI gateway
└── scripts/
    ├── dummy_cam.py             ← MJPEG test camera  :8082/video
    ├── dummy_rtsp.py            ← RTSP test camera   rtsp://localhost:8554/front_video
    └── launch-browser.sh        ← Chrome with SwiftShader (VM / no-GPU)
```

---

## Browser Support

Works on any modern browser with WebGL enabled. Uses `failIfMajorPerformanceCaveat: false` so software rendering (SwiftShader, Mesa) works too.

| Browser | Support |
|---------|---------|
| Chrome 110+ | ✅ PC + Android |
| Safari 15+ | ✅ iPad / iPhone / Mac |
| Firefox 115+ | ✅ |
| Edge 110+ | ✅ |

**VM / no GPU / remote desktop** — Chrome may need SwiftShader:

```bash
./scripts/launch-browser.sh        # dev  → :5173
./scripts/launch-browser.sh prod   # prod → :3000/app/
```

---

## iPad — Install as App

Open in Safari → tap **Share** → **Add to Home Screen**

The app opens full-screen (no browser chrome) thanks to the PWA manifest and `apple-mobile-web-app-capable` meta tag.

---

## 3D Map Visualization

`PointCloud.jsx` renders two layers simultaneously:

- **Live scan** — current LiDAR sweep as soft white-cyan dots at real Z height
- **Occupancy map** — 2D canvas texture that accumulates all scanned wall-height points (0.08–3.0 m) projected onto the ground plane, growing over time like the SLAM `/map` topic in RViz. Transparent in unseen areas (grid shows through), teal where obstacles have been detected.

---

## API Contract

### WebSocket `/ws/status` (~10 Hz)

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

### REST

| Method | Path | Description |
|--------|------|-------------|
| `GET/POST` | `/api/config` | Stream settings (live) |
| `GET` | `/api/robot_description` | URDF XML |
| `GET` | `/api/video_feed` | MJPEG stream from RTSP camera |
| `GET` | `/api/video_snapshot` | Single JPEG frame |
| `POST` | `/api/waypoints` | `{ waypoints: [{x,y,z,yaw}] }` |
| `POST` | `/api/navigation/start` | `{ repeat_count: N }` |
| `POST` | `/api/navigation/cancel` | Cancel Nav2 |
| `POST` | `/api/navigation/clear` | Clear waypoints |

---

## Using the Interface

### Toolbar

| Button | Action |
|--------|--------|
| `Top` / `3D` | Switch camera view |
| `Placing Waypoints` | Click-drag to place waypoint + heading |
| `Navigate` | Orbit/pan only |

### Waypoint placement

1. Switch to **Placing Waypoints** mode
2. **Click and hold** on the map
3. **Drag** to set heading (arrow preview appears)
4. **Release** to confirm — press **Esc** or right-click to cancel

### Camera feed

Live MJPEG from the robot's front camera via `/api/video_feed`.  
Requires `video_enabled:=true` and a valid `rtsp_url` on the ROS 2 gateway.  
For development use `./dev.sh` (or `./dev.sh rtsp` for GStreamer testing).

### Control Panel

- **Status** — pose (x, y, yaw), connection
- **Navigation** — waypoint list, start / cancel / clear, repeat count
- **Camera** — live feed + snapshot
- **Stream** — Gateway URL override, point cloud settings

---

## Backend — Camera Setup

The ROS 2 gateway streams RTSP to the browser as MJPEG. Requires `opencv-python-headless`:

```bash
pip install opencv-python-headless
```

Launch parameters:

```bash
ros2 launch b2_web_rviz b2_web_gateway.launch.py \
  rtsp_url:=rtsp://192.168.123.161:8551/front_video \
  video_enabled:=true \
  video_quality:=75 \
  video_fps_limit:=15.0
```

For GStreamer RTSP support (low latency):

```bash
sudo apt install python3-opencv gstreamer1.0-plugins-good \
                 gstreamer1.0-plugins-bad gstreamer1.0-libav
```
