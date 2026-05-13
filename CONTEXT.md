# B2 Web RViz — System Context Document

## ภาพรวม

Web-based RViz replacement สำหรับ Unitree B2 quadruped robot  
ทำงานบน ROS 2 Humble / Nav2 / FAST-LIO2  
Stack: React + React Three Fiber + Zustand (frontend) | Python FastAPI + rclpy (backend)

> **หมายเหตุ**: ไฟล์ frontend **ไม่ได้อยู่ใน git tracking**  
> git root อยู่ที่ `/home/peaxtt/PaYae/Fibo-work` แต่ `ui_navigation_robot/frontend/` ไม่ถูก track  
> → ไม่มี git history ของ frontend ใช้ไม่ได้

---

## Directory Structure

```
/home/peaxtt/PaYae/Fibo-work/ui_navigation_robot/
├── frontend/
│   ├── src/
│   │   ├── App.jsx                   Root layout: Toolbar + Layout(panel+canvas)
│   │   ├── main.jsx                  ReactDOM entry, connectWS() on mount
│   │   ├── style.css                 ทุก style รวมอยู่ที่นี่ที่เดียว
│   │   ├── store/
│   │   │   └── useRobotStore.js      Zustand store: global state + WS lifecycle
│   │   ├── components/
│   │   │   ├── Toolbar.jsx           Top bar: logo, backend URL input, conn status
│   │   │   ├── ControlPanel.jsx      Left panel: nav controls, camera, status
│   │   │   ├── WaypointList.jsx      Waypoint list with delete buttons
│   │   │   ├── CameraFeed.jsx        MJPEG stream viewer + snapshot download
│   │   │   └── StreamSettings.jsx    Config UI for camera/stream settings
│   │   └── canvas/
│   │       ├── SceneCanvas.jsx       R3F Canvas, camera rig, hit plane, crosshair
│   │       ├── RobotModel.jsx        URDF loader + joint animation
│   │       ├── PointCloud.jsx        GPU-buffered point cloud renderer
│   │       ├── WaypointMarkers.jsx   Numbered arrow markers
│   │       └── NavPlanLine.jsx       Nav2 plan path line
│   ├── index.html                    Inter + JetBrains Mono fonts (Google Fonts)
│   ├── package.json
│   └── vite.config.js
├── backend/
│   └── b2_web_rviz/
│       ├── b2_web_rviz/
│       │   └── b2_web_gateway_node.py    FastAPI + ROS2 node (main backend)
│       ├── launch/
│       │   └── b2_web_gateway.launch.py
│       └── bundled_ros2_b2_unitree_description/
│           ├── urdf/b2.urdf
│           └── meshes/meshes_b2/          .dae mesh files
├── scripts/
│   ├── 1_build_frontend.sh
│   ├── 2_setup_robot.sh              colcon build (run once on robot)
│   ├── 3_start.sh                    production start on robot
│   └── dummy_cam.py                  MJPEG test camera server (:8082/video)
├── info/
│   └── rosbag2_2026_05_09-20_55_21/  real rosbag for testing
│       ├── metadata.yaml
│       └── rosbag2_..._0.db3
└── dev.sh                            tmux 4-pane dev launcher
```

---

## Technology Stack

| Layer | Tech | Version |
|-------|------|---------|
| Frontend framework | React | 18.3.1 |
| 3D renderer | @react-three/fiber | 8.17.10 |
| 3D helpers | @react-three/drei | 9.115.0 |
| State management | Zustand | 4.5.4 |
| Icons | lucide-react | 0.468.0 |
| URDF loader | urdf-loader | (npm) |
| Build tool | Vite | latest |
| Backend | Python FastAPI + uvicorn | — |
| ROS | rclpy Humble | — |
| Fast JSON | orjson (fallback: stdlib json) | — |
| Point cloud | numpy + struct | — |

---

## Architecture: 3 Layers

```
Layer 1 — UI Components (React, no Three.js)
  Toolbar, ControlPanel, WaypointList, CameraFeed, StreamSettings
  อ่าน/เขียน Zustand store เท่านั้น ไม่แตะ Three.js เลย

Layer 2 — Global State (Zustand / useRobotStore.js)
  Single source of truth: pose, waypoints, navFeedback, pointCount,
  viewMode, addMode, connected, liveCfg, ...
  เป็นเจ้าของ WebSocket connections ทั้งสอง (_statusWs, _pcWs)
  pointsRef (module-level ref, ไม่อยู่ใน Zustand) = raw Float32Array point cloud

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
GET  /api/robot_description    URDF XML (bundled B2 หรือจาก robot_state_publisher)
GET  /api/pkg/<pkg>/...        mesh file proxy (resolver package://)
GET  /api/video_feed           MJPEG stream จาก RTSP camera
GET  /api/video_snapshot       ดึงภาพ 1 เฟรม (JPEG)
GET  /api/config               ROS parameters ปัจจุบัน เป็น JSON
POST /api/config               อัปเดต ROS parameters สดๆ
POST /api/waypoints            sync waypoint list ไปยัง backend state
POST /api/navigation/start     ส่ง waypoints ไป Nav2 FollowWaypoints action
POST /api/navigation/cancel    cancel active navigation
POST /api/navigation/clear     clear waypoints
GET  /api/processes            ดูสถานะ Process (ROS launch) ทั้งหมด
POST /api/processes/<name>/start เริ่ม Process
POST /api/processes/<name>/stop  หยุด Process
GET  /api/processes/<name>/log   ดึง Log ของ Process
```

### WebSocket Endpoints

```
WS /ws/status
  → JSON frames:
    { pose, joint_positions, nav_feedback,
      navigation_running, nav_plan, urdf_version }

WS /ws/pointcloud
  → binary frames: JSON_header_line\nfloat32_xyz_data
    header: { count, in_robot_frame, frame_id, ... }
```

### Key ROS Parameters (launch args)

```
pointcloud_topic        /cloud_registered       (default)
fixed_frame             odom_sync
base_frame              base_footprint_sync
joint_states_topic      /joint_states
plan_topic              /plan
follow_waypoints_action /follow_waypoints
video_enabled           true
rtsp_url                rtsp://192.168.123.161:8551/front_video
web_port                8080
use_bundled_b2_urdf     true
```

### Robot Pose Source

**ไม่ subscribe /Odometry** — ใช้ TF2 lookup:

```python
tf_buffer.lookup_transform("odom_sync", "base_footprint_sync", rclpy.time.Time())
```

เรียกทุก `1 / status_rate_hz` วินาที (default 10 Hz)

### Point Cloud Pipeline

1. Subscribe `PointCloud2` ที่ `/cloud_registered`
2. Parse binary → Nx3 float32 (x, y, z)
3. Filter by range + z bounds
4. Apply TF transform: cloud frame → `odom_sync` (ถ้า `transform_pointcloud=true`)
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
urdfVersion:    0        // bump → RobotModel reloads URDF
urdfStatus:     'loading…' | 'OK (N meshes)' | 'error: ...'

// Navigation
waypoints:        [{ x, y, z, yaw }]
navFeedback:      { state, current_waypoint, round, repeat_count, message } | null
navigationRunning: false
repeatCount:      1
navPlan:          { frame_id, count, points: [{x,y,z,yaw}] } | null

// Point cloud
pointCount:       0
pointCloudHeader: { count, in_robot_frame, ... } | null
// raw data ไม่อยู่ใน Zustand — bypass re-render:
export const pointsRef = { current: null }  // Float32Array, อัปเดตทุก WS frame

// UI
viewMode: 'top' | '3d'
addMode:  true      // waypoint placement mode (default ON)
message:  ''
error:    ''
liveCfg:  null      // fetched from /api/config on mount
```

---

## Coordinate System (สำคัญมาก)

**ระบบที่ใช้: ROS Z-up แมปตรงกับ Three.js coordinates ไม่แปลง**

```
ROS REP 103:  X = forward,  Y = left,   Z = up
Three.js:     X = right,    Y = up,     Z = toward viewer

การ map: ROS (x, y, z) → Three.js (x, y, z) ตรงๆ
```

### Camera Setup (top view)

```
position: [-0.01, 0, 22]   สูงตาม +Z, offset ลบนิดหน่อยใน X
up:       [0, 0, 1]        Z-up (ตรงกับ ROS)
target:   [0, 0, 0]
```

**ทำไมต้อง -0.01 ไม่ใช่ +0.01:**
- `up=[0,0,1]` + camera ตรง [0,0,22]: gimbal lock (up parallel กับ view direction)
- offset `+0.01` → screen-right=+Y, screen-up=-X → X ลงล่าง ❌
- offset `-0.01` → screen-right=-Y, screen-up=+X → X ขึ้นบน ✓

ผลบนหน้าจอ top-down:

| World axis | Screen |
|-----------|--------|
| +X | UP (ROS forward = screen up) ✓ |
| +Y | LEFT (ROS left = screen left) ✓ |
| +Z | out of screen (toward camera) ✓ |

### Ground Plane Rules

| Object | Correct Plane | Rotation |
|--------|--------------|----------|
| `PlaneGeometry` hit target | XY (z=0) | **ไม่มี rotation** |
| drei `Grid` | XY (z=0) | `rotation={[-Math.PI/2, 0, 0]}` |

**สาเหตุที่ต่างกัน:**

- `PlaneGeometry` default อยู่ใน **XY plane** อยู่แล้ว → ไม่ต้อง rotate
- drei `Grid` default อยู่ใน **XZ plane (y=0)** → ต้อง rotate `-PI/2` รอบ X เพื่อย้ายไป XY

**ถ้า Grid ไม่มี rotation**: กล้องที่ y=0 มองไปยัง target y=0 จะอยู่ **บน** XZ plane → Grid ปรากฏเป็นเส้น horizon ไม่เห็น grid pattern เลย

---

## SceneCanvas.jsx — Current State

### CameraRig

```jsx
const CAM_PRESETS = {
  top: { pos: [0, 0, 22],   up: [0, 1, 0] },
  '3d': { pos: [10, -14, 9], up: [0, 0, 1] },
};
```

- Lerp ไปยัง preset เฉพาะตอน transition เท่านั้น
- Flag `moving.current = false` หยุด lerp ทันทีที่ถึง → user pan/zoom ไม่ spring-back
- ก่อนแก้: lerp ทุก frame → zoom spring-back เสมอ

### GroundPlaneHitTarget

```jsx
// render เฉพาะตอน addMode=true
// PlaneGeometry XY (z=0), opacity=0, raycastable
// ไม่มี stopPropagation → OrbitControls ได้รับ DOM events ด้วย
// threshold: screenDist > 24px = camera gesture, ไม่วาง waypoint
```

- `addMode=false` → return null → OrbitControls ได้ event ทั้งหมด

### OrbitControls

```jsx
<OrbitControls
  makeDefault
  enableDamping
  dampingFactor={0.08}
  screenSpacePanning
  maxPolarAngle={Math.PI / 2}   // กันกลับหัว (ไม่เกิน 90° จาก top)
/>
// mouse defaults: LEFT=ROTATE, RIGHT=PAN, SCROLL=DOLLY
```

### Grid

```jsx
<Grid
  args={[80, 80]}
  cellColor="#2A2A2A"
  sectionColor="#3C3C3E"
  sectionSize={5}
  fadeDistance={80}
  infiniteGrid
  rotation={[-Math.PI / 2, 0, 0]}   // ← CRITICAL: XZ→XY plane
/>
```

### YawPreviewArrow

- Pattern: `<primitive object={new THREE.Line(...)}>` — ต้องใช้เพราะ `<line>` ใน JSX ชน HTML element
- อัปเดต geometry ใน `useFrame()` ผ่าน module-level ref `yawDragState`

### CrosshairMarker

- อ่าน `crosshairPos` module-level ref ใน `useFrame()` (ไม่ใช่ state)
- ซ่อนเมื่อ `addMode=false`

---

## RobotModel.jsx

```jsx
// โหลด URDF จาก /api/robot_description
// parse ด้วย urdf-loader
// mesh: side=DoubleSide, emissive=#2a2a2a, frustumCulled=false
// pose อัปเดตทุก frame:
g.position.set(p.x, p.y, p.z)
g.quaternion.set(p.qx, p.qy, p.qz, p.qw)

// PlaceholderRobot (กล่องฟ้า cyan) แสดงตอน URDF ยังไม่โหลด
// position={[0, 0, 0.35]} — ลอยเหนือพื้น z=0
```

---

## PointCloud.jsx

```jsx
const MAX_POINTS = 150_000  // pre-allocate, ไม่ allocate ใหม่ทุก frame

// อ่าน pointsRef.current ใน useFrame() → partial GPU upload
// attr.updateRange.offset/count → upload เฉพาะส่วนที่มีข้อมูล
// color: '#a7f3d0' (light mint green)
// ถ้า in_robot_frame=true: apply robot pose บน group
```

---

## WaypointMarkers.jsx

```jsx
// ArrowMarker: cone + ring + number sprite
// position: [x, y, 0.05] — เหนือพื้นนิดหน่อย
// rotation: [0, 0, yaw] — หันตาม yaw
// number label: CanvasTexture วาดด้วย 2D canvas API
```

---

## Rosbag (ข้อมูลทดสอบ)

```
Path:     info/rosbag2_2026_05_09-20_55_21/
Duration: ~207 วินาที  |  Messages: 486,327
```

Topics ที่ backend ต้องการ:

| Topic | Type | หมายเหตุ |
|-------|------|---------|
| `/tf` | tf2_msgs/TFMessage | robot pose (odom_sync→base_footprint_sync) |
| `/tf_static` | tf2_msgs/TFMessage | static transforms |
| `/cloud_registered` | sensor_msgs/PointCloud2 | point cloud world frame |
| `/plan` | nav_msgs/Path | Nav2 planner output |
| `/Odometry` | nav_msgs/Odometry | มีในถุง แต่ backend ไม่ subscribe ตรงๆ |

```bash
# play command
source /opt/ros/humble/setup.bash
ros2 bag play info/rosbag2_2026_05_09-20_55_21/ --loop --clock
```

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
./dev.sh          # full 4 panes
./dev.sh front    # frontend only (1 pane)
./dev.sh stop     # kill session
```

สลับ pane: `Ctrl+B` + ลูกศร

### `scripts/dummy_cam.py`

- Python MJPEG server ไม่ต้องมีกล้องจริง
- Generate animated test pattern ด้วย OpenCV (`cv2`)
- Serve ที่ `http://localhost:8082/video`
- รัน backend ด้วย `rtsp_url:=http://localhost:8082/video`
- OpenCV ต้องติดตั้งแล้ว (`cv2 ok` ✓ verified)

### `scripts/3_start.sh` — production

```bash
source /opt/ros/humble/setup.bash
source $HOME/b2_web_rviz_ws/install/setup.bash
ros2 launch b2_web_rviz b2_web_gateway.launch.py web_port:=8080
# เปิด browser: http://<robot-ip>:8080/app/
```

---

## UI Design System

**DJI / Boston Dynamics inspired dark theme:**

```css
--bg-app:    #121212   /* canvas background */
--bg-panel:  #1C1C1E   /* left panel */
--bg-card:   #252528   /* card/section */
--accent:    #00D0B6   /* teal — primary action, crosshair, highlights */
--alarm:     #FF453A   /* red — stop button, errors */
--ok:        #30D158   /* green — connected, success */
--font-ui:   'Inter', -apple-system, sans-serif
--font-mono: 'JetBrains Mono', monospace
--panel-w:   320px
```

- **Start Navigation**: min-height 48px, solid teal, glow shadow
- **Cards**: border-radius 12px, box-shadow
- **Navigation card**: border-top 2px teal accent
- **lucide-react** icons ทุก UI element

---

## Bug History & Fixes

| ปัญหา | Root Cause | สถานะ |
|-------|-----------|-------|
| Zoom spring-back | CameraRig lerp ทุก frame แม้หยุดแล้ว | ✅ แก้: `moving.current` flag |
| Grid เป็นเส้น horizon | Grid ใน XZ (y=0), กล้องอยู่บน XZ plane | ✅ แก้: `rotation={[-PI/2,0,0]}` บน Grid |
| Crosshair เดินแค่แกนเดียว | PlaneGeometry ถูก rotate ไป XZ → ray parallel | ✅ แก้: ลบ rotation ออก = XY plane |
| Pan/orbit ใช้ไม่ได้ | `controls.enabled=false` ใน onPointerDown | ✅ แก้: ลบออก ใช้ screen-distance แทน |
| หมุนกล้องกลับหัว 360° | ไม่มี `maxPolarAngle` | ✅ แก้: `maxPolarAngle={Math.PI/2}` |
| โมเดล/LiDAR ไม่ขึ้น | ปกติ — ต้องมี backend เชื่อมต่อ | ⚠️ ไม่ใช่ bug |

---

## สิ่งที่ยังไม่ได้ทำ / ต้องตรวจสอบ

1. **ทดสอบกับ backend จริง** — canvas controls ยังไม่ได้ verified กับ robot data จริง
2. **Camera up vector** — ปัจจุบัน `up=[0,1,0]` → X=right, Y=up  
   อาจต้องการ `up=[1,0,0]` → X=up (robot faces up on screen) ขึ้นกับ preference
3. **3D view preset** — `pos=[10,-14,9], up=[0,0,1]` ยังไม่ verified กับ robot model
4. **Waypoint inline edit** — WaypointList เป็น read-only แก้ค่า x/y/yaw ไม่ได้
5. **Grid infinite** — `infiniteGrid + rotation` อาจมี visual artifacts บาง drei version
