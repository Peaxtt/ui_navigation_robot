# B2 Web RViz — Browser HMI for Unitree B2 + ROS 2 Nav2

Browser-based RViz replacement for the Unitree B2 quadruped.
**PC only needs a browser** — no ROS, no Node, no Docker on the operator side.

```
┌──────────────────────────────────────────────────────────────────────┐
│  Browser (PC / tablet)                                               │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐ │
│  │  3-D Canvas  (R3F / WebGL)   │  │  Control Panel (HMI)         │ │
│  │  • Live + map point cloud    │  │  • View / mode toggle        │ │
│  │  • Animated URDF robot       │  │  • Robot status & pose       │ │
│  │  • Nav plan polyline         │  │  • Front camera (MJPEG)      │ │
│  │  • Waypoint arrow markers    │  │  • Navigation controls       │ │
│  │  • RViz-style crosshair aim  │  │  • Stream settings           │ │
│  └──────────────────────────────┘  └──────────────────────────────┘ │
│              WebSocket /ws/status & /ws/pointcloud                   │
│              REST /api/*      MJPEG /api/video_feed                  │
└──────────────────────────┬───────────────────────────────────────────┘
                           │ LAN / WiFi  (port 8080)
┌──────────────────────────▼───────────────────────────────────────────┐
│  b2_web_gateway_node.py  (FastAPI + uvicorn on robot, port 8080)     │
│  PointCloud sub  │  TF/Pose  │  Nav2 action client  │  RTSP→MJPEG   │
└──────────────────────────┬───────────────────────────────────────────┘
                           │ ROS 2 topics / actions / TF
┌──────────────────────────▼───────────────────────────────────────────┐
│  ROS 2 Humble  •  Nav2  •  FAST-LIO2  •  Unitree B2 SDK             │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Deployment (Real Robot)](#deployment-real-robot)
3. [Development Workflow](#development-workflow)
4. [Browser Setup](#browser-setup)
5. [Using the Interface](#using-the-interface)
6. [Launch Arguments](#launch-arguments)
7. [ROS 2 Topic Reference](#ros-2-topic-reference)
8. [REST & WebSocket API](#rest--websocket-api)
9. [Frontend Architecture](#frontend-architecture)
10. [Backend Optimizations](#backend-optimizations)
11. [Troubleshooting](#troubleshooting)

---

## Project Structure

```
ui_navigation_robot/
├── README.md
├── dev.sh                          ← Development launcher (tmux)
├── docker-compose.yml              ← Optional: nginx frontend on :3000
│
├── scripts/                        ← Deployment helpers
│   ├── 1_build_frontend.sh         ← PC: npm build + scp to robot
│   ├── 2_setup_robot.sh            ← Robot: colcon build (first time)
│   ├── 3_start.sh                  ← Robot: ros2 launch (every run)
│   ├── dummy_cam.py                ← Dev: MJPEG test camera on :8082
│   └── launch-browser.sh           ← Dev/VM: Chrome with SwiftShader flags
│
├── backend/
│   └── b2_web_rviz/                ← ROS 2 ament_python colcon package
│       ├── package.xml
│       ├── setup.py
│       ├── b2_web_rviz/
│       │   └── b2_web_gateway_node.py   ← FastAPI + ROS 2 gateway
│       ├── bundled_ros2_b2_unitree_description/
│       │   ├── urdf/b2.urdf             ← Bundled URDF (no external dep)
│       │   └── meshes/meshes_b2/        ← 22 .dae mesh files
│       ├── launch/b2_web_gateway.launch.py
│       └── www/                         ← Drop npm build output here
│
├── frontend/                       ← Vite + React Three Fiber SPA
│   ├── package.json
│   ├── vite.config.js              ← base: '/app/', dev proxy → :8080
│   └── src/
│       ├── canvas/                 ← R3F 3D scene components
│       │   ├── SceneCanvas.jsx     ← Main canvas, camera, crosshair, grid
│       │   ├── PointCloud.jsx      ← Dual-layer live + map accumulation
│       │   ├── RobotModel.jsx      ← URDFLoader + joint animation
│       │   ├── WaypointMarkers.jsx ← Flat arrow markers with number labels
│       │   └── NavPlanLine.jsx     ← Nav2 planner path polyline
│       ├── components/             ← React UI panels
│       │   ├── Toolbar.jsx
│       │   ├── ControlPanel.jsx
│       │   ├── WaypointList.jsx
│       │   ├── CameraFeed.jsx
│       │   └── StreamSettings.jsx
│       └── store/
│           └── useRobotStore.js    ← Zustand store + WebSocket lifecycle
│
└── info/                           ← Dev/sim assets (NOT used in production)
    └── rosbag2_*/                  ← Rosbag for local simulation only
```

> **Note on rosbag:** Files in `info/` are for local development simulation only
> (`dev.sh` full mode replays them). The real robot does not need them.

---

## Deployment (Real Robot)

Three scripts. Run them in order.

### Step 1 — Build frontend and copy to robot (run on PC)

```bash
./scripts/1_build_frontend.sh 192.168.123.1
```

What it does: `npm install` → `npm run build` → `scp dist/` to `~/b2_web_rviz_ws/src/b2_web_rviz/www/` on the robot.

```bash
# Custom SSH user
ROBOT_USER=unitree ./scripts/1_build_frontend.sh 192.168.123.1

# Custom target workspace
ROBOT_WS=~/my_ws ./scripts/1_build_frontend.sh 192.168.123.1
```

---

### Step 2 — Build ROS 2 package (run on robot, first time only)

```bash
./scripts/2_setup_robot.sh
```

What it does: `colcon build --packages-select b2_web_rviz` in `~/b2_web_rviz_ws`.

```bash
# Custom workspace
ROS2_WS=~/my_ws ./scripts/2_setup_robot.sh
```

Re-run only when `package.xml`, `setup.py`, or launch files change.
UI changes (frontend only) do **not** require a re-build — just re-run Step 1 then Step 3.

---

### Step 3 — Start the system (run on robot every time)

```bash
./scripts/3_start.sh
```

Terminal output when ready:

```
============================================
  B2 Web RViz Gateway
  Open in browser: http://192.168.123.1:8080/app/
============================================
```

Open that URL in the PC browser. Nothing needs to run on the PC side.

#### Passing launch arguments

```bash
# Different RTSP camera URL
./scripts/3_start.sh rtsp_url:=rtsp://192.168.123.161:8551/front_video

# Disable camera
./scripts/3_start.sh video_enabled:=false

# Body-frame point cloud
./scripts/3_start.sh \
  pointcloud_topic:=/cloud_registered_body \
  pointcloud_in_robot_frame:=true

# Custom port
./scripts/3_start.sh web_port:=9090
```

---

## Development Workflow

`dev.sh` runs a tmux session on your PC with Vite hot-reload and a rosbag for simulated sensor data. ROS 2 Humble must be installed.

### Modes

```bash
./dev.sh           # Full 4-pane: frontend + backend + rosbag + dummy cam
./dev.sh front     # Frontend + dummy cam only (no ROS 2 needed)
./dev.sh stop      # Kill the tmux session
```

### Full mode pane layout

```
┌─────────────────────┬─────────────────────┐
│  0  frontend        │  1  backend (ROS2)  │
│     Vite :5173      │     gateway :8080   │
├─────────────────────┼─────────────────────┤
│  2  rosbag          │  3  dummy cam       │
│     ros2 bag play   │     MJPEG :8082     │
└─────────────────────┴─────────────────────┘
```

- **Pane 0** — Vite dev server at `http://localhost:5173` (hot-reload on every save)
- **Pane 1** — ROS 2 gateway at `http://localhost:8080/app/`
- **Pane 2** — Rosbag replay (`--loop`) providing simulated sensor data
- **Pane 3** — Dummy MJPEG camera at `http://localhost:8082/video`

Navigate panes: `Ctrl+B` then arrow keys. Detach: `Ctrl+B d`. Re-attach: `tmux attach -t b2-dev`.

### Front-only mode

No ROS 2 required. Use when working on pure UI changes:

```bash
./dev.sh front
# → http://localhost:5173  (Vite with hot-reload)
# → http://localhost:8082/video  (dummy MJPEG)
```

Point the Gateway URL field in the UI to a running robot backend when you need live data.

### First-run auto-build

`dev.sh` auto-detects if `~/b2_web_rviz_ws/install/setup.bash` is missing and builds the workspace:

```bash
mkdir -p ~/b2_web_rviz_ws/src
ln -s $(pwd)/backend/b2_web_rviz ~/b2_web_rviz_ws/src/b2_web_rviz
colcon build --symlink-install --packages-select b2_web_rviz
```

Override workspace location:

```bash
ROS2_WS=~/my_ws ./dev.sh
```

---

## Browser Setup

### Normal (hardware GPU)

Any modern Chromium-based browser works: Chrome 110+, Edge 110+, Firefox 115+.

Open `http://<robot-ip>:8080/app/` directly.

### Remote desktop / VM / no GPU

If WebGL is unavailable (message: *"Hardware acceleration is disabled"*), use Chrome's built-in SwiftShader software renderer:

```bash
# Use the included launcher script
./scripts/launch-browser.sh          # dev  → http://localhost:5173
./scripts/launch-browser.sh prod     # prod → http://localhost:8080/app/
```

Manual flags:

```bash
google-chrome \
  --use-gl=swiftshader \
  --ignore-gpu-blocklist \
  --disable-gpu-process-crash-limit \
  --disable-background-timer-throttling \
  http://ROBOT_IP:8080/app/
```

SwiftShader is Chrome's CPU-based WebGL renderer — no GPU required, works on any machine.

### WebGL context lost (GPU crash after idle)

If the 3D canvas shows a spinning indicator, it will auto-restore in 2–3 seconds. The browser sends a `webglcontextrestored` event and the canvas resumes. To prevent crashes:

- Use `launch-browser.sh` (includes `--disable-gpu-process-crash-limit`)
- Or enable Chrome hardware acceleration: `chrome://settings/system`

---

## Using the Interface

### Toolbar (top bar)

| Button | Action |
|--------|--------|
| `⊞ Top` | Switch to top-down orthographic-style view |
| `◈ 3D` | Switch to perspective 3D view |
| `Placing Waypoints` (teal) | Click-drag on map to add waypoints |
| `Navigate` (grey) | Camera-only mode — clicks do not place waypoints |

### Adding waypoints (RViz drag-to-yaw)

1. Make sure **Placing Waypoints** mode is active (teal button).
2. **Click and hold** anywhere on the 3D ground plane:
   - A teal crosshair appears at the click position
   - **Drag** to aim — a preview arrow shows the heading direction
   - **Release** to confirm the waypoint at that position and heading
3. An orange arrow marker appears with its index number.
4. Right-click or press **Escape** to cancel an in-progress drag.

### Starting navigation

1. Add one or more waypoints on the map.
2. In the **Control Panel → Navigation** section, set the repeat count (`-1` = loop forever).
3. Click **Start Navigation** — waypoints are sent to Nav2 FollowWaypoints.
4. The Nav2 planner path appears as a blue polyline.
5. Click **Cancel** to stop.

### Control Panel sections

| Section | Contents |
|---------|----------|
| **Status** | Connection indicator, robot XYZ position and yaw |
| **Navigation** | Waypoint list, start/cancel/clear, repeat count |
| **Camera** | Live MJPEG feed from front camera |
| **Stream** | Camera URL, quality, FPS limit, gateway URL override |

---

## Launch Arguments

All arguments are passed as `key:=value` to `ros2 launch b2_web_rviz b2_web_gateway.launch.py`.

### Point Cloud

| Argument | Default | Description |
|---|---|---|
| `pointcloud_topic` | `/cloud_registered` | PointCloud2 source topic |
| `fixed_frame` | `odom_sync` | TF fixed/global frame (match Nav2 `global_frame`) |
| `base_frame` | `base_footprint_sync` | TF robot base frame |
| `pointcloud_in_robot_frame` | `false` | Skip TF transform — cloud already in body frame |

### Server

| Argument | Default | Description |
|---|---|---|
| `web_port` | `8080` | HTTP + WebSocket server port |

### Navigation

| Argument | Default | Description |
|---|---|---|
| `follow_waypoints_action` | `/follow_waypoints` | Nav2 FollowWaypoints action server name |
| `plan_topic` | `/plan` | nav_msgs/Path topic from Nav2 planner (drawn as blue line) |

### URDF & Joints

| Argument | Default | Description |
|---|---|---|
| `use_bundled_b2_urdf` | `true` | Load B2 URDF+meshes from this package (no external `robot_description`) |
| `robot_description_node` | `robot_state_publisher` | Node to pull `robot_description` param from (only when `use_bundled_b2_urdf:=false`) |
| `subscribe_joint_states` | `true` | Enable live joint animation |
| `joint_states_topic` | `/joint_states` | JointState topic for leg animation |
| `cache_urdf_assets` | `true` | Mirror `package://` mesh URIs into local cache |
| `asset_cache_dir` | _(auto)_ | Cache dir (default: `~/.cache/b2_web_rviz/package_assets`) |

### Camera (RTSP → MJPEG)

| Argument | Default | Description |
|---|---|---|
| `video_enabled` | `true` | Enable RTSP→MJPEG forwarding on `/api/video_feed` |
| `rtsp_url` | `rtsp://192.168.123.161:8551/front_video` | RTSP source URL |
| `video_quality` | `75` | MJPEG encode quality 1–100 |
| `video_fps_limit` | `15.0` | Max MJPEG frames per second |

---

## ROS 2 Topic Reference

Topics the gateway **subscribes** to:

| Topic | Type | Purpose |
|---|---|---|
| `/cloud_registered` | `sensor_msgs/PointCloud2` | FAST-LIO2 world-frame map cloud (default) |
| `/cloud_registered_body` | `sensor_msgs/PointCloud2` | FAST-LIO2 body-frame scan (use with `pointcloud_in_robot_frame:=true`) |
| `/joint_states` | `sensor_msgs/JointState` | B2 leg joint angles for 3D animation |
| `/plan` | `nav_msgs/Path` | Nav2 global planner path |

**TF frames** used:

| Frame pair | Purpose |
|---|---|
| `odom_sync` → `base_footprint_sync` | Robot pose (3D model position and point cloud transform) |

**Nav2 Action** (called by gateway):

| Action | Type |
|---|---|
| `/follow_waypoints` | `nav2_msgs/action/FollowWaypoints` |

### FAST-LIO2 typical setup

Default launch args match FAST-LIO2 in odom mode — no changes needed:

```bash
# World-frame cloud /cloud_registered → default
./scripts/3_start.sh
```

If using body-frame cloud:

```bash
./scripts/3_start.sh \
  pointcloud_topic:=/cloud_registered_body \
  pointcloud_in_robot_frame:=true
```

### Nav2 frame matching

The `fixed_frame` launch arg must match Nav2's `global_frame`. Default is `odom_sync`.

```bash
# If running map-frame localization
./scripts/3_start.sh fixed_frame:=map
```

---

## REST & WebSocket API

### WebSocket `/ws/status` (~10 Hz)

JSON object, fields are present only when updated:

```jsonc
{
  "pose": { "x": 1.2, "y": 0.3, "z": 0.0,
            "qx": 0, "qy": 0, "qz": 0.1, "qw": 0.99, "yaw": 0.2 },
  "joint_positions": { "FR_hip_joint": 0.1, "FL_hip_joint": -0.1 },
  "nav_feedback": { "current_waypoint": 2 },
  "navigation_running": true,
  "nav_plan": {
    "frame_id": "odom_sync",
    "count": 3,
    "points": [{ "x": 1.0, "y": 2.0, "z": 0.0, "yaw": 1.57 }]
  },
  "urdf_version": 1
}
```

### WebSocket `/ws/pointcloud` (~5 Hz)

Binary frame:

```
[UTF-8 JSON header] \n [Float32Array XYZ data]
```

Header: `{"count": 12000, "in_robot_frame": false}`

Data: `count × 3` float32 values — `[x0, y0, z0, x1, y1, z1, ...]`

### REST Endpoints

| Method | Path | Body | Description |
|---|---|---|---|
| `GET` | `/api/config` | — | Current stream/config settings |
| `POST` | `/api/config` | `{ key: value }` | Partial config patch |
| `POST` | `/api/waypoints` | `{ waypoints: [{x,y,z,yaw}] }` | Sync waypoint list to gateway |
| `POST` | `/api/navigation/start` | `{ repeat_count: N }` | Start Nav2 (`-1` = loop forever) |
| `POST` | `/api/navigation/cancel` | — | Cancel active navigation |
| `POST` | `/api/navigation/clear` | — | Clear waypoints on gateway |
| `GET` | `/api/video_feed` | — | MJPEG stream (`multipart/x-mixed-replace`) |
| `GET` | `/api/video_snapshot` | — | Single JPEG frame |
| `GET` | `/api/robot_description` | — | URDF XML string |
| `GET` | `/app/{path}` | — | Serves built frontend SPA |

---

## Frontend Architecture

```
Layer 1 — UI (React)
  Toolbar, ControlPanel, WaypointList, CameraFeed, StreamSettings
  Only reads/writes Zustand state — never touches Three.js or WS directly

Layer 2 — Store (Zustand · useRobotStore.js)
  WebSocket lifecycle (connect/disconnect)
  All shared state: pose, waypoints, navFeedback, pointCloudHeader …
  pointsRef — plain JS ref outside Zustand — raw Float32Array, zero React overhead

Layer 3 — Canvas (React Three Fiber · SceneCanvas.jsx + sub-components)
  CameraRig        smooth lerp between Top/3D camera presets via useFrame
  GroundPlaneHit   RViz drag-to-yaw waypoint placement on invisible ground mesh
  CrosshairMarker  teal aim ring that follows the pointer via module-level ref
  RobotModel       URDFLoader + getState().pose in useFrame (no subscription)
  PointCloud       dual live+map layers, pre-alloc GPU buffers, ring buffer
  WaypointMarkers  flat orange arrow markers with index sprites
  NavPlanLine      Nav2 plan path polyline with buffer reuse
```

**Zero-re-render rules (high-frequency paths):**

| Path | Mechanism | React re-renders per frame |
|---|---|---|
| Point cloud ~5 Hz | `pointsRef` plain ref → `useFrame()` → GPU | 0 |
| Robot pose ~10 Hz | `useRobotStore.getState().pose` in `useFrame()` | 0 |
| Mouse crosshair | Module-level `crosshairPos` ref → `useFrame()` | 0 |

**Point cloud dual-layer detail:**

| Layer | Color | Point size | Max points | Mode |
|---|---|---|---|---|
| Live scan | `#00d0b6` teal | 0.045 m | 150,000 | Current frame only |
| Map accumulation | `#4a5a72` slate-blue | 0.035 m | 1,500,000 | Ring buffer, world-space |

Ring wrap uses two-region GPU upload (`addUpdateRange`) to avoid re-uploading the full 18 MB buffer on every wrap.

---

## Backend Optimizations

| # | Optimization | Detail |
|---|---|---|
| 1 | **orjson** | 3–10× faster JSON serialization than stdlib `json` |
| 2 | **sqrt-free radius filter** | `x²+y² ≤ r²` avoids `sqrt()` per point |
| 3 | **column-wise isfinite** | No temporary `(N,3)` allocation |
| 4 | **memoryview zero-copy** | ~960 KB/frame not copied for WS binary send |
| 5 | **Float32 TF transform** | No float64 upcast in transform pipeline |
| 6 | **Early exit on 0 clients** | No point cloud processing when nobody is connected |
| 7 | **MJPEG header cache** | Multipart boundary not rebuilt per frame |
| 8 | **RTSP auto-reconnect** | Exponential backoff 1 s → 30 s |
| 9 | **Placeholder frame** | Color-bar JPEG when RTSP is unavailable |
| 10 | **cv2 open timeout** | `CAP_PROP_OPEN_TIMEOUT_MSEC=5000` — no infinite block |
| 11 | **Pre-alloc GPU buffer** | `Float32Array(150k×3)` allocated once; `updateRange` for partial upload |
| 12 | **getState() in useFrame** | Robot pose read without React subscription overhead |

---

## Troubleshooting

### Robot model or point cloud not showing

- Confirm the gateway is running: `./scripts/3_start.sh` should print `Gateway ready`.
- Check topics are active on the robot: `ros2 topic hz /cloud_registered`
- Verify TF tree matches your `fixed_frame` and `base_frame` values: `ros2 run tf2_tools view_frames`

### Grid not visible / black canvas

- WebGL is not available. See [Browser Setup](#browser-setup) for SwiftShader instructions.

### Point cloud appears static / empty

- Confirm the topic is publishing: `ros2 topic hz /cloud_registered`
- Check gateway logs for `PointCloud subscriber active`.
- If using body-frame: set `pointcloud_in_robot_frame:=true` in launch args.

### "WebGL unavailable — hardware acceleration is disabled"

```bash
./scripts/launch-browser.sh prod
# or manually:
google-chrome --use-gl=swiftshader http://ROBOT_IP:8080/app/
```

### WebGL context lost spinner persists

Usually recovers automatically in 2–3 s. If it keeps happening:

```bash
./scripts/launch-browser.sh   # includes --disable-gpu-process-crash-limit
```

Or enable Chrome GPU: `chrome://settings/system` → Use hardware acceleration.

### Cannot connect to gateway (connection refused / timeout)

- Default robot IP: `192.168.123.1`, port: `8080`
- Change via **Stream Settings → Gateway URL** in the UI
- Check port 8080 is not blocked by the robot's firewall

### colcon build fails on robot (missing ROS packages)

```bash
sudo apt install ros-humble-nav2-msgs ros-humble-tf2-ros
pip install fastapi uvicorn numpy orjson
pip install opencv-python-headless   # optional — for camera
```

### Camera shows color-bar placeholder

- `opencv-python-headless` is not installed — the gateway still runs, camera returns a placeholder JPEG
- Or the RTSP URL is unreachable — check `rtsp_url` launch arg

### 404 on `/app/` after deploy

Step 1 was not run or failed. Re-run: `./scripts/1_build_frontend.sh <robot-ip>`

---

## Dependencies

### Robot (ROS 2 packages)

```
rclpy  sensor_msgs  geometry_msgs  nav2_msgs  nav_msgs  tf2_ros  rcl_interfaces
```

### Robot (Python packages)

```bash
pip install fastapi uvicorn numpy orjson
pip install opencv-python-headless   # optional — camera forwarding
```

### PC (build only — Node.js 18+)

Installed automatically by `1_build_frontend.sh` via `npm install`.

Key npm packages: React 18, React Three Fiber 8, Three.js ^0.167, Zustand 4, @react-three/drei 9, Vite 5, lucide-react.

---

## Notes

- `www/` is empty in the repository — `1_build_frontend.sh` populates it.
- All 22 B2 URDF mesh files are bundled in the package — no external `ros2_b2_unitree_description` needed.
- If `opencv-python-headless` is absent the gateway still starts; `/api/video_feed` returns a placeholder JPEG.
- `docker-compose.yml` serves the frontend on port 3000 via nginx — not needed for normal deployment.
- Rosbag in `info/` is for local development simulation only — the real robot does not use it.
