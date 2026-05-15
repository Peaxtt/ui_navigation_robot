# Occupancy Map — สถาปัตยกรรมและการเปรียบเทียบ

## 1. ภาพรวม Pipeline

```
Robot (FAST-LIO2)
  └─ publish /cloud_registered  (PointCloud2, world-frame, SLAM-registered)
        │
        ▼
  Backend  (b2_web_gateway ROS2 node)
  ├─ subscribe /cloud_registered  ← default topic, ไม่ต้องตั้งค่าอะไร
  ├─ filter: max_points, z_min/z_max, range_limit
  ├─ rate-limit: pointcloud_rate_hz (default 5 Hz)
  └─ stream Float32 XYZ → /ws/pointcloud (WebSocket binary)
        │
        ▼
  Browser (PointCloud.jsx + voxel map)
  ├─ รับ frame ทีละ scan
  ├─ แปลง XYZ → voxel index (12 cm cell)
  ├─ สะสมใน JS Map<voxelKey, bufferIndex>
  └─ render บน GPU (WebGL via Three.js)
```

---

## 2. Topic ที่ใช้

### `/cloud_registered` คืออะไร
FAST-LIO2 publish scan แต่ละ frame หลังจาก **register เข้า world frame แล้ว** (SLAM-corrected)
- Frame: `odom_sync` (world-fixed)
- ไม่ใช่ accumulated map ทั้งหมด — เป็น **current scan frame** ที่ transform แล้ว
- backend ของเราเปิด topic นี้เป็น **default** ตั้งแต่แรก

### เปิดอยู่แล้วหรือยัง?
**เปิดอยู่แล้ว** ไม่ต้องทำอะไรใน UI

```python
# backend/b2_web_rviz/launch/b2_web_gateway.launch.py  line 24
DeclareLaunchArgument('pointcloud_topic', default_value='/cloud_registered')
```

ถ้า FAST-LIO2 รันอยู่บน robot → ข้อมูลไหลเข้า browser อัตโนมัติ

### เปลี่ยน topic ได้มั้ย?
เปลี่ยนได้ **ตอน launch เท่านั้น** — UI ไม่รองรับ (ถูก blacklist จาก `/api/config`)

```bash
# ตัวอย่าง: ใช้ body-frame cloud แทน
ros2 launch b2_web_rviz b2_web_gateway.launch.py \
  pointcloud_topic:=/cloud_registered_body \
  pointcloud_in_robot_frame:=true
```

---

## 3. ของเรา vs ของพี่เค้า

| | **ของพี่เค้า** | **ของเรา** |
|---|---|---|
| **Map สร้างที่ไหน** | บน Robot (ROS2 node เช่น octomap_server) | ใน Browser (JS + WebGL) |
| **RAM ที่กิน** | Robot RAM — หลัก 100s MB → ปิดไว้ | Browser RAM — ~45–65 MB max |
| **CPU ที่กิน** | Robot CPU ตลอดเวลา | Browser CPU (ไม่กระทบ robot) |
| **Topic ต้นทาง** | `/cloud_registered` เหมือนกัน | `/cloud_registered` เหมือนกัน |
| **Map type** | Occupancy grid 2D หรือ OctoMap 3D | Voxel hashmap 3D (12 cm) |
| **Persistence** | บันทึก disk ได้, reload ได้ | หายทุกครั้ง refresh หน้า |
| **Loop closure** | Map อัพเดทตาม SLAM correction | Voxel เก่าไม่ขยับ → อาจเบี้ยว |
| **Free space** | มี raycasting (รู้ว่าตรงไหน "ว่าง") | ไม่มี — รู้แค่ "เคยเจอ" |
| **สวยงาม** | Flat gray grid หรือ colored OctoMap | Height colormap 8 สี full 3D |
| **ต้องการ node เพิ่ม** | ใช่ — octomap_server หรือ slam_toolbox | ไม่ใช่ — ทำเองทั้งหมด |

---

## 4. ข้อดีของเรา

1. **Zero load บน Robot** — backend แค่ relay scan frame, robot ไม่รู้สึกอะไร
2. **สวยกว่า** — height colormap เห็น floor/wall/ceiling แยกกันชัด
3. **3D เต็มรูปแบบ** — ไม่ใช่ flat 2D grid
4. **ไม่ต้อง install node เพิ่ม** — ไม่มี dependency ใหม่บน robot
5. **Toggle ได้จาก UI** — Stream Settings → "Show occupancy map"
6. **Clear อัตโนมัติ** — เมื่อ coordinate frame เปลี่ยน (robot↔world)

---

## 5. ข้อเสียของเรา (ตรงๆ)

### 5.1 Refresh หาย
Map reset ทุกครั้งที่ reload หน้าเว็บ ไม่มี persistence ใดๆ

### 5.2 Loop Closure ไม่ compatible
เมื่อ FAST-LIO2 ทำ loop closure แล้วแก้ pose เก่าๆ
- Voxel ที่วาดไว้ใน buffer ไม่ขยับตาม
- ถ้า SLAM drift มากแล้ว relocalize → map จะเห็น ghost ของเก่า
- **แก้ชั่วคราว**: กด refresh หน้า หรือ toggle "Cloud in robot frame" เพื่อ clear

### 5.3 Max 600k Voxels
```javascript
const MAP_CAP = 600_000   // PointCloud.jsx
```
พอครบ 600k voxel พื้นที่ใหม่จะถูก ignore เงียบๆ
- ที่ 12 cm cell: ครอบคลุมพื้นที่ประมาณ 96 × 96 m² (เพียงพอสำหรับ indoor)
- ถ้าต้องการพื้นที่ใหญ่กว่า: เพิ่ม `MAP_CAP` หรือลด resolution

### 5.4 Browser RAM
| Component | ขนาด |
|---|---|
| Position buffer (600k × 3 float32) | 7.2 MB GPU |
| Color buffer (600k × 3 float32) | 7.2 MB GPU |
| JS Map overhead (~50 B/entry) | ~30 MB heap |
| Live scan buffers | ~2 MB |
| **รวมสูงสุด** | **~47 MB** |

iPad เก่าหรือ low-end device อาจรู้สึกได้ถ้า map เต็ม

### 5.5 ไม่มี Free Space
ของเราเป็น **additive-only** — เพิ่ม voxel ไม่เอาออก
- ไม่รู้ว่าพื้นที่ไหน "ว่าง" (ไม่มี raycasting)
- ไม่เหมาะสำหรับ Nav2 path planning (Nav2 ใช้ costmap ของตัวเอง ไม่เกี่ยวกัน)
- ไม่เหมาะสำหรับ collision checking

---

## 6. เมื่อไหรควรเพิ่ม Proper Map Node

| Use Case | คำแนะนำ |
|---|---|
| **แค่ดูว่าหุ่นไปไหนมาบ้าง** | ของเรา — เพียงพอ |
| **Navigation + obstacle avoidance** | Nav2 costmap (ไม่เกี่ยวกับ visualization) |
| **ต้องการ map ถาวร บันทึก/โหลดได้** | เพิ่ม `slam_toolbox` map server |
| **ต้องการ free space / exploration** | เพิ่ม `octomap_server` หรือ `rtabmap` |
| **พื้นที่ใหญ่มาก (>100m)** | เพิ่ม MAP_CAP หรือใช้ server-side map |

---

## 7. Parameters ที่ปรับได้จาก UI (Stream Settings)

| Parameter | ค่า default | ปรับได้ live? |
|---|---|---|
| `pointcloud_rate_hz` | 5.0 Hz | ✅ |
| `max_points` | 80,000 | ✅ |
| `pointcloud_range_limit` | 40 m | ✅ |
| `pointcloud_z_min` | -3.0 m | ✅ |
| `pointcloud_z_max` | 3.0 m | ✅ |
| `pointcloud_in_robot_frame` | false | ✅ |
| `transform_pointcloud` | true | ✅ |
| `pointcloud_tf_time` | latest | ✅ |
| `pointcloud_topic` | /cloud_registered | ❌ launch only |
| `fixed_frame` | odom_sync | ❌ launch only |

---

## 8. Voxel Map — รายละเอียด Implementation

```javascript
// PointCloud.jsx
const VOXEL   = 0.12        // 12 cm cell size
const MAP_CAP = 600_000     // max unique voxels
const VXY_LIM = 400         // ±48 m in X/Y
const VZ_LO   = -10         // −1.2 m
const VZ_HI   = 50          // +6.0 m

// Key packing: xi, yi, zi → single integer (no hash collision)
function _vk(xi, yi, zi) {
  return (xi + VXY_LIM) * _VX_STRIDE + (yi + VXY_LIM) * _VZ_RANGE + (zi - VZ_LO)
}

// Per frame:
// 1. รับ scan points จาก WebSocket
// 2. แปลง XYZ → voxel index
// 3. ถ้า voxel ใหม่ → เพิ่มใน buffer + map
// 4. ถ้า voxel เก่า → update สีตาม height ใหม่ (position ไม่เปลี่ยน)
// 5. upload เฉพาะ dirty range ไป GPU (partial update)
```
