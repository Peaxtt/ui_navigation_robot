# B2 Web RViz — System Context Document

## ภาพรวม

Web-based RViz replacement สำหรับ Unitree B2 quadruped robot  
ทำงานบน ROS 2 Humble / Nav2 / FAST-LIO2  
Stack: React + React Three Fiber + Zustand (frontend) | Python FastAPI + rclpy (backend)

---

## Directory Structure

```
/home/peaxtt/PaYae/Fibo-work/ui_navigation_robot/   ← git root
├── dev.sh                            tmux dev launcher
├── docker-compose.yml
├── .env.example
├── README.md
├── CONTEXT.md
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf                    GATEWAY_URL substituted at container start
│   ├── vite.config.js
│   ├── index.html                    PWA meta tags + Inter/JetBrains Mono fonts
│   ├── public/
│   │   ├── manifest.json             PWA manifest (standalone, iPad installable)
│   │   ├── icon-192.png              Android home screen icon
│   │   ├── icon-512.png              Android splash / maskable
│   │   ├── apple-touch-icon.png      iOS/iPad home screen (180×180)
│   │   ├── apple-touch-icon-167.png  iPad (167×167)
│   │   └── apple-touch-icon-152.png  iPad/iPhone (152×152)
│   └── src/
│       ├── App.jsx                   Root layout: Toolbar + Layout(panel+canvas)
│       ├── main.jsx                  ReactDOM entry, connectWS() on mount
│       ├── style.css                 ทุก style รวมที่นี่ที่เดียว
│       ├── store/
│       │   └── useRobotStore.js      Zustand store + WS lifecycle + pointsRef
│       ├── components/
│       │   ├── Toolbar.jsx           Top bar: logo, backend URL, conn status
│       │   ├── ControlPanel.jsx      Left panel: nav controls, camera, status
│       │   ├── WaypointList.jsx      Waypoint list with delete
│       │   ├── CameraFeed.jsx        MJPEG stream viewer + snapshot download
│       │   └── StreamSettings.jsx    Config UI (camera/stream settings)
│       └── canvas/
│           ├── SceneCanvas.jsx       R3F Canvas, camera rig, waypoint crosshair
│           ├── PointCloud.jsx        Live scan + 2D occupancy map texture
│           ├── RobotModel.jsx        URDF loader + joint animation
│           ├── WaypointMarkers.jsx   Numbered arrow markers
│           └── NavPlanLine.jsx       Nav2 plan path line
├── backend/
│   └── b2_web_rviz/
│       ├── b2_web_rviz/
│       │   └── b2_web_gateway_node.py    FastAPI + ROS2 node
│       ├── launch/
│       │   └── b2_web_gateway.launch.py
│       └── bundled_ros2_b2_unitree_description/
│           ├── urdf/b2.urdf
│           └── meshes/meshes_b2/
├── scripts/
│   ├── 1_build_frontend.sh
│   ├── 2_setup_robot.sh              colcon build (run once on robot)
│   ├── 3_start.sh                    production start on robot
│   ├── dummy_cam.py                  MJPEG test camera :8082/video
│   ├── dummy_rtsp.py                 GStreamer RTSP test server rtsp://localhost:8554/front_video
│   └── launch-browser.sh             Chrome with SwiftShader (VM/no-GPU)
└── info/
    └── rosbag2_2026_05_09-20_55_21/  real rosbag for testing
```

---

## Technology Stack

| Layer | Tech | Version |
|-------|------|---------|
| Frontend framework | React | 18.3.1 |
| 3D renderer | @react-three/fiber | 8.x |
| 3D helpers | @react-three/drei | 9.x |
| State management | Zustand | 4.5.x |
| Icons | lucide-react | 0.475.x |
| URDF loader | urdf-loader | npm |
| Build tool | Vite | 5.4.x |
| Backend | Python FastAPI + uvicorn | — |
| ROS | rclpy Humble | — |
| Fast JSON | orjson (fallback: stdlib json) | — |

---

## Architecture: 3 Layers

```
Layer 1 — UI Components (React, ไม่แตะ Three.js)
  Toolbar, ControlPanel, WaypointList, CameraFeed, StreamSettings
  อ่าน/เขียน Zustand store เท่านั้น

Layer 2 — Global State (Zustand / useRobotStore.js)
  pose, waypoints, navFeedback, pointCloudHeader, viewMode, addMode, connected, liveCfg
  เป็นเจ้าของ WebSocket connections ทั้งสอง (_statusWs, _pcWs)
  pointsRef (module-level ref, ไม่อยู่ใน Zustand) = raw Float32Array point cloud
  → bypass re-render ทุก frame

Layer 3 — R3F Canvas (SceneCanvas.jsx + sub-components)
  อ่าน store แบบ imperative ผ่าน useRobotStore.getState() ใน useFrame()
  เพื่อหลีกเลี่ยง re-render ทุก frame จาก pose/pointcloud updates
```

---

## Backend (b2_web_gateway_node.py)

FastAPI server + ROS2 node ทำงานใน process เดียวกัน

### HTTP Endpoints

```
GET  /app/                     serve frontend static files
GET  /api/robot_description    URDF XML
GET  /api/pkg/<pkg>/...        mesh file proxy (resolver package://)
GET  /api/video_feed           MJPEG stream จาก RTSP camera
GET  /api/video_snapshot       ดึงภาพ 1 เฟรม (JPEG)
GET  /api/config               ROS parameters ปัจจุบัน (JSON)
POST /api/config               อัปเดต ROS parameters สดๆ
POST /api/waypoints            sync waypoint list ไปยัง backend state
POST /api/navigation/start     ส่ง waypoints ไป Nav2 FollowWaypoints action
POST /api/navigation/cancel    cancel active navigation
POST /api/navigation/clear     clear waypoints
```

### WebSocket Endpoints

```
WS /ws/status (~10 Hz)
  → { pose, joint_positions, nav_feedback, navigation_running, nav_plan, urdf_version }

WS /ws/pointcloud (~5 Hz)
  → binary: JSON_header_line\nfloat32_xyz_data
    header: { count, in_robot_frame, frame_id }
```

### Key ROS Parameters

```
pointcloud_topic        /cloud_registered
fixed_frame             odom_sync
base_frame              base_footprint_sync
video_enabled           true
rtsp_url                rtsp://192.168.123.161:8551/front_video
web_port                8080
use_bundled_b2_urdf     true
```

### Robot Pose Source

ใช้ TF2 lookup (ไม่ subscribe /Odometry ตรงๆ):
```python
tf_buffer.lookup_transform("odom_sync", "base_footprint_sync", rclpy.time.Time())
```

### Point Cloud Pipeline

1. Subscribe `PointCloud2` ที่ `/cloud_registered`
2. Parse binary → Nx3 float32 (x, y, z)
3. Filter by range + z bounds
4. Transform: cloud frame → `odom_sync` (ถ้า `transform_pointcloud=true`)
5. ส่งทาง WS เป็น binary: `header_json\nfloat32_bytes`

---

## Frontend State (useRobotStore.js)

```js
// Connection
backendUrl: 'http://localhost:8080'   // dev=8080, prod=origin
wsUrl:      'ws://localhost:8080'
connected:  false

// Robot
pose:           { x, y, z, qx, qy, qz, qw, yaw } | null
jointPositions: { joint_name: radians }
urdfVersion:    0
urdfStatus:     'loading…' | 'OK (N meshes)' | 'error: ...'

// Navigation
waypoints:         [{ x, y, z, yaw }]
navFeedback:       { state, current_waypoint, round, repeat_count, message } | null
navigationRunning: false
repeatCount:       1
navPlan:           { frame_id, count, points: [{x,y,z,yaw}] } | null

// Point cloud (raw data อยู่นอก Zustand — bypass re-render)
pointCloudHeader: { count, in_robot_frame } | null
export const pointsRef = { current: null }  // Float32Array อัปเดตทุก WS frame

// UI
viewMode: 'top' | '3d'
addMode:  true
message:  ''
error:    ''
liveCfg:  null
```

---

## Coordinate System (สำคัญมาก)

**Z-up ROS convention — map ตรงกับ Three.js ไม่แปลง**

```
ROS REP 103:  X = forward,  Y = left,   Z = up
Three.js map: (x, y, z) → (x, y, z) ตรงๆ
```

### Camera Setup (top view)

```
position: [-0.01, 0, 22]   offset -0.01 ใน X เพื่อหลีกเลี่ยง gimbal lock
up:       [0, 0, 1]        Z-up
target:   [0, 0, 0]
```

ผลบนหน้าจอ top-down:
| World axis | Screen |
|-----------|--------|
| +X | UP (ROS forward = screen up) ✓ |
| +Y | LEFT (ROS left = screen left) ✓ |
| +Z | out of screen ✓ |

### Ground Plane Rules

| Object | Plane | Rotation |
|--------|-------|----------|
| `PlaneGeometry` hit target / occupancy map | XY (z=0) | **ไม่มี** (default) |
| drei `Grid` | XY (z=0) | `rotation={[-Math.PI/2, 0, 0]}` |

drei `Grid` default อยู่ใน XZ plane → ต้อง rotate -PI/2 รอบ X ไป XY

---

## SceneCanvas.jsx

### WebGL Error Handling

- ไม่มี `probeWebGL()` (ถูกลบออก — เป็น false-negative root cause)
- Canvas props: `gl={{ antialias: true, failIfMajorPerformanceCaveat: false }}`
- `dpr={[1, 2]}` + `performance={{ min: 0.5 }}` → adaptive DPR สำหรับ iPad
- `WebGLErrorBoundary` render dark `div` เงียบๆ แทน error message ถ้า WebGL ล้มเหลว

### CameraRig

```js
const CAM_PRESETS = {
  top: { pos: [-0.01, 0, 22], up: [0, 0, 1] },
  '3d': { pos: [10, -14, 9],  up: [0, 0, 1] },
};
```

Lerp เฉพาะตอน transition (`moving.current` flag) → user zoom/pan ไม่ spring-back

### Grid

```jsx
<Grid
  args={[300, 300]}          // 300×300 m coverage
  cellSize={1}
  cellColor="#28283a"        // 1m lines — subtle blue-gray
  cellThickness={0.6}
  sectionSize={5}
  sectionColor="#005c55"     // 5m lines — dark teal (matches UI accent)
  sectionThickness={1.5}
  fadeDistance={130}
  fadeStrength={1.0}
  rotation={[-Math.PI / 2, 0, 0]}
/>
```

### OrbitControls

```jsx
maxPolarAngle={Math.PI / 2}   // กันกลับหัว
// top mode: LEFT=PAN, RIGHT=ROTATE
// 3d mode:  LEFT=ROTATE, RIGHT=PAN
// addMode:  LEFT=undefined (mesh handles it), RIGHT=PAN
```

---

## PointCloud.jsx — Dual Layer

### Layer 1: Live Scan

```
LIVE_MAX = 150,000 points
color: #c8f0e8 (soft white-cyan)
size:  0.05 m, sizeAttenuation
GPU:   pre-allocated Float32Array, partial upload via addUpdateRange
frame: in_robot_frame=true → transform raw points ด้วย applyPose()
       in_robot_frame=false → group ไม่ขยับ, ใช้ world coords ตรงๆ
```

### Layer 2: Occupancy Map (แทน ring buffer เดิม)

แสดงผลเหมือน SLAM `/map` topic ใน RViz — สะสมจุดที่เคยสแกนเจอแล้วไม่หาย

```
GRID_CELLS      = 1024          (1024×1024 px canvas)
METERS_PER_CELL = 0.1           (10 cm/cell)
WORLD_EXTENT    = 102.4 m       (±51.2 m จาก origin)
MAP_Z_MIN       = 0.08 m        (กัน floor reflections)
MAP_Z_MAX       = 3.0 m         (กัน ceiling noise)
```

**Algorithm:**
```
สำหรับแต่ละ point ที่ MAP_Z_MIN < pz < MAP_Z_MAX:
  gx = floor(px / 0.1 + 512)
  gy = floor(-py / 0.1 + 512)   ← Y กลับทิศ (canvas convention, CanvasTexture flipY=true)

  hitCount[gx,gy]++
  t = min(hitCount / 5, 1.0)    ← confidence ramp
  color: SEED (#004038 dim) → TEAL (#00d0b6) lerp ตาม t
  alpha: 80 → 255 ตาม t
```

**Render:**
- `<mesh>` ที่ `z=0.004` (เหนือ Grid นิดหน่อย)
- `<planeGeometry args={[102.4, 102.4]}>`
- `<meshBasicMaterial transparent depthWrite={false}>` + `CanvasTexture`
- throttled `putImageData` + `texture.needsUpdate` ที่ ≤5 Hz (200ms interval)

---

## RobotModel.jsx

```jsx
// โหลด URDF จาก /api/robot_description
// mesh: side=DoubleSide, emissive=#2a2a2a, frustumCulled=false
// pose อัปเดตทุก frame
g.position.set(p.x, p.y, p.z)
g.quaternion.set(p.qx, p.qy, p.qz, p.qw)

// PlaceholderRobot (กล่องฟ้า cyan) แสดงตอน URDF ยังไม่โหลด
```

---

## PWA (Progressive Web App)

ติดตั้งเป็น app บน iPad ได้ผ่าน Safari → Share → Add to Home Screen

```html
<!-- index.html -->
<link rel="manifest" href="%BASE_URL%manifest.json" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

```json
// manifest.json
{
  "display": "standalone",   // เปิดแบบ full-screen ไม่มี browser chrome
  "start_url": "/app/",
  "theme_color": "#00d0b6"
}
```

Icons: `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180), 167, 152

---

## Dev Scripts

### `./dev.sh` — tmux 4-pane

```
┌──────────────────────┬────────────────────┐
│  0  frontend         │  1  backend        │
│     Vite :5173       │     ROS2 gw :8080  │
├──────────────────────┼────────────────────┤
│  2  rosbag           │  3  dummy cam      │
│     ros2 bag play    │     MJPEG :8082    │
└──────────────────────┴────────────────────┘
```

```bash
./dev.sh          # full 4 panes (MJPEG dummy cam)
./dev.sh rtsp     # full 4 panes (GStreamer RTSP dummy cam :8554)
./dev.sh front    # frontend + dummy cam only
./dev.sh stop     # kill session
```

### `scripts/dummy_cam.py`
Python MJPEG server — animated test pattern ด้วย OpenCV  
`http://localhost:8082/video`

### `scripts/dummy_rtsp.py`
GStreamer RTSP server — bouncing ball test video  
`rtsp://localhost:8554/front_video`  
ต้องการ: `python3-gi`, `gstreamer1.0-plugins-good`, `gstreamer1.0-plugins-bad`, `gstreamer1.0-libav`, `gir1.2-gst-rtsp-server-1.0`

---

## Rosbag (ข้อมูลทดสอบ)

```
Path:     info/rosbag2_2026_05_09-20_55_21/
Duration: ~207 วินาที  |  Messages: 486,327
```

| Topic | Type | หมายเหตุ |
|-------|------|---------|
| `/tf` | tf2_msgs/TFMessage | robot pose |
| `/tf_static` | tf2_msgs/TFMessage | static transforms |
| `/cloud_registered` | sensor_msgs/PointCloud2 | point cloud |
| `/plan` | nav_msgs/Path | Nav2 planner output |

```bash
source /opt/ros/humble/setup.bash
ros2 bag play info/rosbag2_2026_05_09-20_55_21/ --loop --clock
```

---

## UI Design System

```css
--bg-app:    #121212   /* canvas background */
--bg-panel:  #1C1C1E   /* left panel */
--bg-card:   #252528   /* card */
--accent:    #00D0B6   /* teal — primary, crosshair, occupancy map */
--alarm:     #FF453A   /* red — stop, errors */
--ok:        #30D158   /* green — connected, success */
--font-ui:   'Inter', -apple-system, sans-serif
--font-mono: 'JetBrains Mono', monospace
--panel-w:   320px
```

---

## Bug History & Fixes

| ปัญหา | Root Cause | สถานะ |
|-------|-----------|-------|
| Zoom spring-back | CameraRig lerp ทุก frame | ✅ `moving.current` flag |
| Grid เป็น horizon line | Grid ใน XZ, กล้องอยู่บน XZ | ✅ `rotation={[-PI/2,0,0]}` |
| Crosshair เดินแกนเดียว | PlaneGeometry ถูก rotate → ray parallel | ✅ ลบ rotation ออก |
| Pan/orbit ใช้ไม่ได้ | `controls.enabled=false` ใน onDown | ✅ ใช้ screen-distance แทน |
| หมุนกล้องกลับหัว | ไม่มี `maxPolarAngle` | ✅ `maxPolarAngle={Math.PI/2}` |
| WebGL error แสดงบนจอ | `probeWebGL()` false-negative + scary UI | ✅ ลบออก, silent boundary |
| iPad/VM WebGL ล้มเหลว | `powerPreference: 'high-performance'` | ✅ ลบออก + `failIfMajorPerformanceCaveat: false` |
| dev server ชี้ project เก่า | ui_navigation_robot2 รันบน :5173 | ✅ ลบ robot2, รัน robot จริง |
| path ซ้อน 2 ชั้น | git root อยู่ใน inner dir | ✅ ย้าย files ขึ้น outer dir |

---

## สิ่งที่ยังไม่ได้ทำ

1. **ทดสอบกับ robot จริง** — canvas + occupancy map ยังไม่ verified กับ robot data สด
2. **Occupancy map reset** — ไม่มีปุ่ม clear map (hitCount สะสมตลอด session)
3. **Waypoint inline edit** — WaypointList เป็น read-only แก้ x/y/yaw ไม่ได้
4. **Map persistence** — ปิด tab แล้วเปิดใหม่ occupancy map หาย (ไม่มี localStorage save)
