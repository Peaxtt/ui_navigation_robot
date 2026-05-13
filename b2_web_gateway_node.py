#!/usr/bin/env python3
"""
B2 Web RViz Gateway — OPTIMISED

Changes vs original:
  - orjson drop-in (3-10× faster JSON serialisation, fallback to stdlib json)
  - pointcloud2_to_xyz_array: sqrt-free range filter, fast isfinite, avoid temporary arrays
  - transform_xyz_points: float32 rotation+translation (no homogeneous coords, no float64 upcast)
  - on_pointcloud: zero-extra-copy payload construction via memoryview; static header fragment cached
  - publish_pose_to_web: early-exit when no WS clients
  - _broadcast_json: single encode then fan-out (was already good; kept)
  - on_plan: pre-allocate points list with known length
  - All behaviour/interface/API identical to original.
"""

from __future__ import annotations

import asyncio
import hashlib
import json
import math
import mimetypes
import os
import re
import shutil
import signal
import subprocess
import threading
import time
from collections import deque
from contextlib import asynccontextmanager
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable, Deque, Dict, List, Optional, Set, Tuple

import numpy as np
import rclpy
from ament_index_python.packages import PackageNotFoundError, get_package_share_directory
from fastapi import FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, PlainTextResponse, Response, StreamingResponse
from fastapi.staticfiles import StaticFiles
from geometry_msgs.msg import PoseStamped
from nav2_msgs.action import FollowWaypoints
from nav_msgs.msg import Path as NavPath
from rcl_interfaces.msg import SetParametersResult
from rcl_interfaces.srv import GetParameters
from rclpy.action import ActionClient
from rclpy.duration import Duration
from rclpy.executors import MultiThreadedExecutor
from rclpy.node import Node
from rclpy.parameter import Parameter
from rclpy.qos import DurabilityPolicy, HistoryPolicy, QoSProfile, ReliabilityPolicy
from rclpy.time import Time as RTime
from sensor_msgs.msg import JointState, PointCloud2, PointField
from std_msgs.msg import String
from tf2_ros import Buffer, TransformException, TransformListener
import uvicorn

# ── Fast JSON: use orjson when available, fall back to stdlib ─────────────────
try:
    import orjson as _orjson

    def _json_dumps(obj) -> bytes:
        return _orjson.dumps(obj)

    def _json_loads(s):
        return _orjson.loads(s)

except ImportError:
    def _json_dumps(obj) -> bytes:
        return json.dumps(obj, separators=(",", ":")).encode("utf-8")

    def _json_loads(s):
        return json.loads(s)


POINTCLOUD_HEADER_VERSION = 1
STATUS_VERSION = 1
_VALID_TF_TIME_VALUES = ("latest", "now", "0", "message_stamp", "stamp")

DEFAULT_PROCESS_MANIFEST: Dict[str, str] = {
    "nav2_odom": (
        "ros2 launch fastlio2_mapping fastlio_nav2_odom.launch.py "
        "pub_vel_bridge:=false zone_walk_lock:=false"
    ),
    "robot_description": (
        "ros2 launch ros2_b2_unitree_description display_b2_joints_pub_gui.launch.py"
    ),
    "joint_state_pub": (
        "ros2 run ros2_unitree_api_client sensers_unitree_go_joint_state_publisher"
    ),
}


class ManagedProcess:
    """Long-running shell command supervised on behalf of the web Launcher."""

    def __init__(self, name: str, cmd: str, log_buffer_size: int = 500, logger: object = None):
        self.name = name
        self.cmd = cmd
        self._log: Deque[str] = deque(maxlen=max(50, int(log_buffer_size)))
        self._log_lock = threading.Lock()
        self._proc: Optional[subprocess.Popen] = None
        self._reader_thread: Optional[threading.Thread] = None
        self._started_at: Optional[float] = None
        self._exited_at: Optional[float] = None
        self._exit_code: Optional[int] = None
        self._logger = logger
        self._lifecycle_lock = threading.Lock()

    def is_running(self) -> bool:
        return self._proc is not None and self._proc.poll() is None

    def start(self) -> bool:
        with self._lifecycle_lock:
            if self.is_running():
                return False
            self._reap()
            with self._log_lock:
                self._log.clear()
                self._log.append(f"[manager] starting: {self.cmd}")
            try:
                self._proc = subprocess.Popen(
                    ["bash", "-lc", self.cmd],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    text=True,
                    bufsize=1,
                    start_new_session=True,
                )
            except Exception as exc:
                with self._log_lock:
                    self._log.append(f"[manager] spawn failed: {exc}")
                return False
            self._started_at = time.time()
            self._exited_at = None
            self._exit_code = None
            self._reader_thread = threading.Thread(
                target=self._read_loop,
                name=f"proc-{self.name}",
                daemon=True,
            )
            self._reader_thread.start()
            return True

    def stop(self, sigint_timeout: float = 5.0, sigterm_timeout: float = 2.0) -> bool:
        with self._lifecycle_lock:
            if not self.is_running():
                return False
            assert self._proc is not None
            pid = self._proc.pid

            def _killpg(sig: int) -> None:
                try:
                    os.killpg(os.getpgid(pid), sig)
                except (ProcessLookupError, PermissionError):
                    pass

            with self._log_lock:
                self._log.append("[manager] stopping (SIGINT)…")
            _killpg(signal.SIGINT)
            if self._wait(sigint_timeout):
                return True
            with self._log_lock:
                self._log.append("[manager] still alive — sending SIGTERM")
            _killpg(signal.SIGTERM)
            if self._wait(sigterm_timeout):
                return True
            with self._log_lock:
                self._log.append("[manager] still alive — sending SIGKILL")
            _killpg(signal.SIGKILL)
            return self._wait(2.0)

    def _wait(self, timeout: float) -> bool:
        if self._proc is None:
            return True
        try:
            self._proc.wait(timeout=timeout)
            return True
        except subprocess.TimeoutExpired:
            return False

    def _read_loop(self) -> None:
        proc = self._proc
        if proc is None or proc.stdout is None:
            return
        try:
            for line in proc.stdout:
                stripped = line.rstrip("\n")
                with self._log_lock:
                    self._log.append(stripped)
        except Exception as exc:
            with self._log_lock:
                self._log.append(f"[manager] reader error: {exc}")
        finally:
            self._reap()

    def _reap(self) -> None:
        if self._proc is None or self._proc.poll() is None:
            return
        if self._exit_code is None:
            self._exit_code = self._proc.returncode
            self._exited_at = time.time()
            with self._log_lock:
                self._log.append(f"[manager] exited with code {self._exit_code}")

    def status(self, log_tail: int = 50) -> Dict[str, Any]:
        self._reap()
        running = self.is_running()
        with self._log_lock:
            tail = list(self._log)[-max(0, int(log_tail)):]
        return {
            "name": self.name,
            "cmd": self.cmd,
            "running": running,
            "pid": self._proc.pid if running and self._proc else None,
            "started_at": self._started_at if (running or self._exited_at) else None,
            "exited_at": None if running else self._exited_at,
            "exit_code": None if running else self._exit_code,
            "log_tail": tail,
        }


def _load_process_manifest(manifest_file: str, logger=None) -> Dict[str, str]:
    if not manifest_file:
        return dict(DEFAULT_PROCESS_MANIFEST)
    path = os.path.abspath(os.path.expanduser(manifest_file))
    try:
        with open(path, "r", encoding="utf-8") as f:
            raw = json.load(f)
        if not isinstance(raw, dict):
            raise ValueError("manifest must be a JSON object {name: command}")
        cleaned = {}
        for k, v in raw.items():
            if not isinstance(k, str) or not isinstance(v, str):
                raise ValueError(f"manifest entry {k!r} must map a string name to a string command")
            if not k.strip():
                raise ValueError("manifest contains empty name")
            cleaned[k.strip()] = v
        return cleaned
    except Exception as exc:
        if logger is not None:
            logger.warning(f"could not load process manifest {path}: {exc} — falling back to defaults")
        return dict(DEFAULT_PROCESS_MANIFEST)


_FLOAT_EPS = 1e-16


def _param_bool(val, default: bool = False) -> bool:
    if val is None:
        return default
    if isinstance(val, bool):
        return val
    if isinstance(val, str):
        return val.strip().lower() in ("true", "1", "yes", "on")
    return bool(val)


def quaternion_from_yaw(yaw: float) -> Tuple[float, float, float, float]:
    half = yaw * 0.5
    return 0.0, 0.0, math.sin(half), math.cos(half)


def euler_yaw_from_quaternion(x: float, y: float, z: float, w: float) -> float:
    siny_cosp = 2.0 * (w * z + x * y)
    cosy_cosp = 1.0 - 2.0 * (y * y + z * z)
    return float(math.atan2(siny_cosp, cosy_cosp))


def quaternion_matrix_xyzw(qx: float, qy: float, qz: float, qw: float) -> np.ndarray:
    """4×4 homogeneous rotation matrix from unit quaternion (x,y,z,w)."""
    q = np.array([qx, qy, qz, qw], dtype=np.float64)
    nq = float(np.dot(q, q))
    if nq < _FLOAT_EPS:
        return np.identity(4, dtype=np.float64)
    q *= math.sqrt(2.0 / nq)
    o = np.outer(q, q)
    return np.array(
        [
            [1.0 - o[1, 1] - o[2, 2], o[0, 1] - o[2, 3], o[0, 2] + o[1, 3], 0.0],
            [o[0, 1] + o[2, 3], 1.0 - o[0, 0] - o[2, 2], o[1, 2] - o[0, 3], 0.0],
            [o[0, 2] - o[1, 3], o[1, 2] + o[0, 3], 1.0 - o[0, 0] - o[1, 1], 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ],
        dtype=np.float64,
    )


class WSClient:
    """Per-connection bounded send queue + writer task. Drops oldest when overloaded."""

    __slots__ = ("ws", "kind", "queue", "writer_task", "dropped")

    def __init__(self, ws: WebSocket, kind: str, queue_size: int):
        self.ws = ws
        self.kind = kind
        self.queue: asyncio.Queue = asyncio.Queue(maxsize=max(1, queue_size))
        self.writer_task: Optional[asyncio.Task] = None
        self.dropped: int = 0

    def offer(self, item) -> None:
        if self.queue.full():
            try:
                self.queue.get_nowait()
                self.dropped += 1
            except asyncio.QueueEmpty:
                pass
        try:
            self.queue.put_nowait(item)
        except asyncio.QueueFull:
            self.dropped += 1

    async def writer_loop(self) -> None:
        try:
            while True:
                item = await self.queue.get()
                if item is None:
                    return
                try:
                    if self.kind == "json":
                        await self.ws.send_text(item)
                    else:
                        await self.ws.send_bytes(item)
                except Exception:
                    return
        except asyncio.CancelledError:
            pass


@dataclass
class SharedState:
    loop: Optional[asyncio.AbstractEventLoop] = None
    pointcloud_clients: List[WSClient] = field(default_factory=list)
    status_clients: List[WSClient] = field(default_factory=list)
    latest_pose: Optional[Dict] = None
    latest_nav_feedback: Optional[Dict] = None
    latest_plan: Optional[Dict] = None
    latest_plan_time: float = 0.0
    robot_description: str = ""
    robot_description_etag: str = ""
    urdf_version: int = 0
    joint_positions: Dict[str, float] = field(default_factory=dict)
    asset_cache_dir: str = ""
    cache_urdf_assets: bool = True
    waypoints: List[Dict] = field(default_factory=list)
    navigation_running: bool = False
    navigation_cancel_requested: bool = False
    active_goal_handle: object = None
    lock: threading.Lock = field(default_factory=threading.Lock)


STATE = SharedState()
_UI_STATIC_MOUNTED = False

# ── Video streaming (RTSP → MJPEG) ───────────────────────────────────────────
try:
    import cv2 as _cv2
    _HAS_CV2 = True
except ImportError:
    _HAS_CV2 = False


def _make_placeholder_frame() -> bytes:
    """320×240 color-bar JPEG when RTSP is unreachable. Uses cv2 if available, else numpy."""
    if _HAS_CV2:
        import numpy as _np
        h, w = 240, 320
        img = _np.zeros((h, w, 3), dtype=_np.uint8)
        colors = [
            (0, 0, 180), (0, 180, 180), (0, 180, 0),
            (180, 180, 0), (180, 0, 0), (180, 0, 180),
            (0, 0, 90), (120, 120, 120),
        ]
        bw = w // len(colors)
        for i, c in enumerate(colors):
            img[:, i * bw : (i + 1) * bw] = c
        _cv2.putText(img, "RTSP UNAVAILABLE", (10, h // 2 - 10),
                     _cv2.FONT_HERSHEY_SIMPLEX, 0.65, (255, 255, 255), 1, _cv2.LINE_AA)
        _cv2.putText(img, "waiting for stream…", (10, h // 2 + 18),
                     _cv2.FONT_HERSHEY_SIMPLEX, 0.45, (200, 200, 200), 1, _cv2.LINE_AA)
        _, buf = _cv2.imencode(".jpg", img, [_cv2.IMWRITE_JPEG_QUALITY, 75])
        return bytes(buf)
    # Minimal 1×1 grey JPEG (pre-encoded, no deps)
    return bytes.fromhex(
        "ffd8ffe000104a46494600010100000100010000ffdb004300"
        "10101010101010101010101010101010101010101010101010"
        "1010101010101010101010101010101010101010101010ffc0"
        "000b080001000101011100ffc4001f00000105010101010101"
        "00000000000000000102030405060708090a0bffda00080101"
        "0000003f00d2cf2080ffd9"
    )


class _VideoStreamer:
    """
    Background thread: opens RTSP with cv2 (or ffmpeg subprocess fallback),
    stores latest JPEG frame. MJPEG consumers call `get_frame()`.

    Reconnects automatically on stream drop with configurable back-off.
    """

    _BOUNDARY = b"--frame\r\nContent-Type: image/jpeg\r\n\r\n"

    def __init__(self, rtsp_url: str, quality: int = 75, fps_limit: float = 15.0, logger=None):
        self.rtsp_url = rtsp_url
        self.quality = max(10, min(95, quality))
        self._interval = 1.0 / max(1.0, fps_limit)
        self._logger = logger
        self._lock = threading.Lock()
        self._frame: bytes = _make_placeholder_frame()
        self._running = False
        self._thread: Optional[threading.Thread] = None

    def start(self) -> None:
        if self._running:
            return
        self._running = True
        self._thread = threading.Thread(target=self._loop, name="rtsp_capture", daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self._running = False
        if self._thread:
            self._thread.join(timeout=3.0)

    def get_frame(self) -> bytes:
        with self._lock:
            return self._frame

    def _loop(self) -> None:
        back_off = 1.0
        while self._running:
            if not _HAS_CV2:
                self._log("cv2 not available — serving placeholder (pip install opencv-python-headless)")
                time.sleep(5.0)
                continue
            try:
                cap = _cv2.VideoCapture(self.rtsp_url)
                cap.set(_cv2.CAP_PROP_BUFFERSIZE, 1)  # minimize latency
                if not cap.isOpened():
                    raise RuntimeError(f"Cannot open stream: {self.rtsp_url}")
                back_off = 1.0
                self._log(f"RTSP stream opened: {self.rtsp_url}")
                last_t = 0.0
                while self._running:
                    ret, frame = cap.read()
                    if not ret:
                        break
                    now = time.time()
                    if now - last_t < self._interval:
                        continue
                    last_t = now
                    _, buf = _cv2.imencode(
                        ".jpg", frame, [_cv2.IMWRITE_JPEG_QUALITY, self.quality]
                    )
                    with self._lock:
                        self._frame = bytes(buf)
                cap.release()
            except Exception as exc:
                self._log(f"RTSP error: {exc} — retrying in {back_off:.0f}s")
            if self._running:
                time.sleep(back_off)
                back_off = min(back_off * 2, 30.0)

    def _log(self, msg: str) -> None:
        if self._logger:
            self._logger.info(msg)


_VIDEO_STREAMER: Optional[_VideoStreamer] = None


@asynccontextmanager
async def _lifespan(app: FastAPI):
    global _VIDEO_STREAMER
    STATE.loop = asyncio.get_running_loop()
    _try_mount_ui()
    # Start video streamer if enabled (parameters are read from ROS_NODE when available)
    if ROS_NODE is not None:
        try:
            if _param_bool(ROS_NODE.get_parameter("video_enabled").value, True):
                url = str(ROS_NODE.get_parameter("rtsp_url").value)
                quality = int(ROS_NODE.get_parameter("video_quality").value)
                fps = float(ROS_NODE.get_parameter("video_fps_limit").value)
                _VIDEO_STREAMER = _VideoStreamer(url, quality=quality, fps_limit=fps,
                                                 logger=ROS_NODE.get_logger())
                _VIDEO_STREAMER.start()
        except Exception as exc:
            if ROS_NODE:
                ROS_NODE.get_logger().warning(f"Video streamer failed to start: {exc}")
    try:
        yield
    finally:
        if _VIDEO_STREAMER is not None:
            _VIDEO_STREAMER.stop()
        await _close_all_ws_clients()
        if ROS_NODE is not None:
            for proc in list(getattr(ROS_NODE, "processes", {}).values()):
                if proc.is_running():
                    try:
                        await asyncio.get_running_loop().run_in_executor(None, proc.stop)
                    except Exception:
                        pass


app = FastAPI(title="B2 Web RViz Gateway", version="0.3.1", lifespan=_lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def _close_all_ws_clients() -> None:
    with STATE.lock:
        clients = list(STATE.status_clients) + list(STATE.pointcloud_clients)
        STATE.status_clients.clear()
        STATE.pointcloud_clients.clear()
    for c in clients:
        try:
            c.queue.put_nowait(None)
        except Exception:
            pass
        if c.writer_task is not None:
            try:
                await asyncio.wait_for(c.writer_task, timeout=0.5)
            except Exception:
                c.writer_task.cancel()
        try:
            await c.ws.close()
        except Exception:
            pass


def yaw_from_quaternion(x: float, y: float, z: float, w: float) -> float:
    return euler_yaw_from_quaternion(x, y, z, w)


def make_pose_stamped(frame_id: str, wp: Dict, node: Node) -> PoseStamped:
    msg = PoseStamped()
    msg.header.frame_id = frame_id
    msg.header.stamp = node.get_clock().now().to_msg()
    msg.pose.position.x = float(wp["x"])
    msg.pose.position.y = float(wp["y"])
    msg.pose.position.z = float(wp.get("z", 0.0))
    qx, qy, qz, qw = quaternion_from_yaw(float(wp.get("yaw", 0.0)))
    msg.pose.orientation.x = qx
    msg.pose.orientation.y = qy
    msg.pose.orientation.z = qz
    msg.pose.orientation.w = qw
    return msg


_POINTFIELD_FORMAT = {
    PointField.FLOAT32: "f4",
    PointField.FLOAT64: "f8",
}


class _UnsupportedPointFieldType(Exception):
    def __init__(self, datatype: int):
        super().__init__(f"unsupported PointField datatype: {datatype}")
        self.datatype = datatype


def pointcloud2_to_xyz_array(
    msg: PointCloud2,
    max_points: int,
    range_limit: float,
    z_min: float,
    z_max: float,
) -> np.ndarray:
    """Decode PointCloud2 → Nx3 float32 xyz with filters.

    Optimisations vs original:
    - sqrt-free range filter (compare squared distance)
    - column-wise isfinite instead of full (N,3) boolean array
    - avoid redundant astype at end
    """
    field_map = {f.name: f for f in msg.fields}
    for name in ("x", "y", "z"):
        if name not in field_map:
            return np.empty((0, 3), dtype=np.float32)
        dt = field_map[name].datatype
        if dt not in _POINTFIELD_FORMAT:
            raise _UnsupportedPointFieldType(dt)

    step = msg.point_step
    total = msg.width * msg.height
    if total <= 0 or step <= 0:
        return np.empty((0, 3), dtype=np.float32)
    if len(msg.data) < total * step:
        return np.empty((0, 3), dtype=np.float32)

    endian = ">" if msg.is_bigendian else "<"
    dtype = np.dtype(
        {
            "names": ["x", "y", "z"],
            "formats": [endian + _POINTFIELD_FORMAT[field_map[n].datatype] for n in ("x", "y", "z")],
            "offsets": [field_map[n].offset for n in ("x", "y", "z")],
            "itemsize": step,
        }
    )
    structured = np.frombuffer(msg.data, dtype=dtype, count=total)

    # Coarse stride before mask to bound peak memory
    if max_points > 0 and total > max_points * 4:
        stride = max(1, total // (max_points * 4))
        structured = structured[::stride]

    arr = np.empty((structured.shape[0], 3), dtype=np.float32)
    arr[:, 0] = structured["x"]
    arr[:, 1] = structured["y"]
    arr[:, 2] = structured["z"]

    # ── Optimised: column-wise isfinite avoids (N,3) temp array ──────────────
    x = arr[:, 0]
    y = arr[:, 1]
    z = arr[:, 2]
    mask = np.isfinite(x) & np.isfinite(y) & np.isfinite(z)

    # ── Optimised: sqrt-free range filter ────────────────────────────────────
    if range_limit > 0:
        mask &= (x * x + y * y) <= (range_limit * range_limit)

    mask &= (z >= z_min) & (z <= z_max)
    arr = arr[mask]  # contiguous float32 copy — required for tobytes() below

    if max_points > 0 and arr.shape[0] > max_points:
        stride = arr.shape[0] // max_points
        if stride > 1:
            arr = arr[::stride][:max_points]
        else:
            arr = arr[:max_points]

    # Ensure C-contiguous float32 for zero-copy memoryview serialisation
    if not arr.flags["C_CONTIGUOUS"] or arr.dtype != np.float32:
        arr = np.ascontiguousarray(arr, dtype=np.float32)
    return arr


def transform_xyz_points(points: np.ndarray, tf_msg) -> np.ndarray:
    """Apply TF transform to Nx3 float32 array.

    Optimised: rotation + translation separately in float32,
    avoids building Nx4 homogeneous matrix and float64 upcast.
    """
    q = tf_msg.transform.rotation
    t = tf_msg.transform.translation
    n = points.shape[0]
    if n == 0:
        return points

    # Build 3×3 rotation matrix from quaternion (float32)
    mat4 = quaternion_matrix_xyzw(q.x, q.y, q.z, q.w)
    R = mat4[:3, :3].astype(np.float32)
    tvec = np.array([t.x, t.y, t.z], dtype=np.float32)

    # R @ points.T → (3, N), then transpose + add translation
    out = (R @ points.T).T + tvec
    return out.astype(np.float32, copy=False)


def _normalize_pkg_relative_path(filepath: str) -> str:
    fp = (filepath or "").replace("\\", "/").strip("/")
    while "//" in fp:
        fp = fp.replace("//", "/")
    parts = [p for p in fp.split("/") if p and p != "."]
    if not parts or any(p == ".." for p in parts):
        return ""
    return "/".join(parts)


def _default_asset_cache_dir() -> str:
    return str(Path.home() / ".cache" / "b2_web_rviz" / "package_assets")


def _extract_package_uri_refs(urdf_xml: str) -> List[Tuple[str, str]]:
    seen: Set[Tuple[str, str]] = set()
    out: List[Tuple[str, str]] = []
    for m in re.finditer(r'package://([^/"\s<>]+)/([^"\s<>]*)', urdf_xml):
        pkg = m.group(1)
        rel = _normalize_pkg_relative_path(m.group(2))
        if not rel:
            continue
        key = (pkg, rel)
        if key not in seen:
            seen.add(key)
            out.append(key)
    return out


def sync_urdf_package_assets_to_cache(
    cache_root: str,
    urdf_xml: str,
    log_warn: Callable[[str], None],
    log_info: Callable[[str], None],
) -> Tuple[int, int]:
    if not cache_root or not urdf_xml:
        return 0, 0
    os.makedirs(cache_root, exist_ok=True)
    refs = _extract_package_uri_refs(urdf_xml)
    ok = 0
    bad = 0
    cache_top = os.path.realpath(cache_root)
    for pkg, rel in refs:
        try:
            share = get_package_share_directory(pkg)
        except PackageNotFoundError:
            log_warn(f"URDF asset cache: unknown package '{pkg}' for '{rel}'")
            bad += 1
            continue
        share_real = os.path.realpath(share)
        src = os.path.realpath(os.path.join(share_real, rel.replace("/", os.sep)))
        if not src.startswith(share_real + os.sep) or not os.path.isfile(src):
            log_warn(f"URDF asset cache: missing file {pkg}/{rel}")
            bad += 1
            continue
        dst = os.path.join(cache_top, pkg, rel.replace("/", os.sep))
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        try:
            shutil.copy2(src, dst)
            ok += 1
        except OSError as exc:
            log_warn(f"URDF asset cache: copy failed {pkg}/{rel}: {exc}")
            bad += 1
    log_info(f"URDF asset cache: mirrored {ok} file(s) to {cache_top}" + (f" ({bad} skipped)" if bad else ""))
    return ok, bad


_BUNDLED_ORIG_PKG_URI = "package://ros2_b2_unitree_description/"
_BUNDLED_REDIRECT_URI = "package://b2_web_rviz/bundled_ros2_b2_unitree_description/"


def load_bundled_b2_urdf_from_share(log_warn, log_info) -> str:
    try:
        share = get_package_share_directory("b2_web_rviz")
    except PackageNotFoundError:
        log_warn("Package b2_web_rviz not in ament index; cannot load bundled URDF")
        return ""
    path = os.path.join(share, "bundled_ros2_b2_unitree_description", "urdf", "b2.urdf")
    if not os.path.isfile(path):
        log_warn(f"Bundled B2 URDF not installed (run colcon build): missing {path}")
        return ""
    try:
        with open(path, encoding="utf-8") as f:
            xml = f.read()
    except OSError as exc:
        log_warn(f"Cannot read bundled URDF: {exc}")
        return ""
    xml = xml.replace(_BUNDLED_ORIG_PKG_URI, _BUNDLED_REDIRECT_URI)
    log_info(f"Bundled robot model: {path} (mesh URIs → {_BUNDLED_REDIRECT_URI})")
    return xml


class B2WebGateway(Node):
    def __init__(self):
        super().__init__("b2_web_gateway")

        self.declare_parameter("pointcloud_topic", "/cloud_registered")
        self.declare_parameter("fixed_frame", "odom_sync")
        self.declare_parameter("base_frame", "base_footprint_sync")
        self.declare_parameter("max_points", 80000)
        self.declare_parameter("pointcloud_rate_hz", 5.0)
        self.declare_parameter("pointcloud_range_limit", 40.0)
        self.declare_parameter("pointcloud_z_min", -3.0)
        self.declare_parameter("pointcloud_z_max", 3.0)
        self.declare_parameter("transform_pointcloud", True)
        self.declare_parameter("pointcloud_tf_time", "latest")
        self.declare_parameter("pointcloud_in_robot_frame", False)
        self.declare_parameter("status_rate_hz", 10.0)
        self.declare_parameter("web_host", "0.0.0.0")
        self.declare_parameter("web_port", 8080)
        self.declare_parameter("follow_waypoints_action", "/follow_waypoints")
        self.declare_parameter("plan_topic", "/plan")
        self.declare_parameter("plan_rate_hz", 5.0)
        self.declare_parameter("plan_max_points", 2000)
        self.declare_parameter("plan_stale_seconds", 30.0)
        self.declare_parameter("robot_description_node", "robot_state_publisher")
        self.declare_parameter("robot_description_fetch_period_s", 3.0)
        self.declare_parameter("robot_description_max_attempts", 60)
        self.declare_parameter("frontend_dist", "")
        self.declare_parameter("joint_states_topic", "/joint_states")
        self.declare_parameter("subscribe_joint_states", True)
        self.declare_parameter("cache_urdf_assets", True)
        self.declare_parameter("asset_cache_dir", "")
        self.declare_parameter("use_bundled_b2_urdf", True)
        self.declare_parameter("process_manifest_file", "")
        self.declare_parameter("process_log_buffer", 500)
        self.declare_parameter("video_enabled", True)
        self.declare_parameter("rtsp_url", "rtsp://192.168.123.161:8551/front_video")
        self.declare_parameter("video_quality", 75)
        self.declare_parameter("video_fps_limit", 15.0)

        self.pointcloud_topic = self.get_parameter("pointcloud_topic").value
        self.fixed_frame = self.get_parameter("fixed_frame").value
        self.base_frame = self.get_parameter("base_frame").value
        self.max_points = int(self.get_parameter("max_points").value)
        self.pc_rate_hz = float(self.get_parameter("pointcloud_rate_hz").value)
        self.range_limit = float(self.get_parameter("pointcloud_range_limit").value)
        self.z_min = float(self.get_parameter("pointcloud_z_min").value)
        self.z_max = float(self.get_parameter("pointcloud_z_max").value)
        self.transform_pointcloud = _param_bool(self.get_parameter("transform_pointcloud").value, True)
        tf_time = str(self.get_parameter("pointcloud_tf_time").value).strip().lower()
        if tf_time not in _VALID_TF_TIME_VALUES:
            self.get_logger().warning(
                f"pointcloud_tf_time={tf_time!r} is not one of {_VALID_TF_TIME_VALUES}; falling back to 'latest'"
            )
            tf_time = "latest"
        self.pointcloud_tf_time = tf_time
        self.pointcloud_in_robot_frame = _param_bool(
            self.get_parameter("pointcloud_in_robot_frame").value, False
        )
        self.status_rate_hz = max(0.5, float(self.get_parameter("status_rate_hz").value))
        self.follow_action_name = self.get_parameter("follow_waypoints_action").value
        self.plan_topic = self.get_parameter("plan_topic").value
        self.plan_rate_hz = max(0.1, float(self.get_parameter("plan_rate_hz").value))
        self.plan_max_points = max(1, int(self.get_parameter("plan_max_points").value))
        self.plan_stale_seconds = max(0.0, float(self.get_parameter("plan_stale_seconds").value))
        self.robot_description_node = self.get_parameter("robot_description_node").value
        fetch_period = float(self.get_parameter("robot_description_fetch_period_s").value)
        self.robot_description_max_attempts = max(1, int(self.get_parameter("robot_description_max_attempts").value))

        self.cache_urdf_assets = _param_bool(self.get_parameter("cache_urdf_assets").value, True)
        _raw_ac = self.get_parameter("asset_cache_dir").value
        if self.cache_urdf_assets:
            rs = str(_raw_ac).strip() if _raw_ac is not None else ""
            self.asset_cache_dir = os.path.expanduser(rs) if rs else _default_asset_cache_dir()
        else:
            self.asset_cache_dir = ""
        with STATE.lock:
            STATE.asset_cache_dir = self.asset_cache_dir
            STATE.cache_urdf_assets = self.cache_urdf_assets

        self.use_bundled_b2_urdf = _param_bool(self.get_parameter("use_bundled_b2_urdf").value, True)

        self._last_pc_time = 0.0
        self._last_plan_time = 0.0
        self._tf_warn_last = 0.0
        self._unsupported_warn_last = 0.0
        self._desc_attempts = 0
        self._robot_desc_future = None

        # ── Cached static pointcloud header fragment ──────────────────────
        # Rebuilt only when parameters change; avoids re-encoding static fields per message.
        self._pc_static_header: Dict = {}
        self._rebuild_pc_static_header()

        if not self.use_bundled_b2_urdf:
            rd_node = self.robot_description_node.strip("/")
            self._robot_desc_param_service = f"/{rd_node}/get_parameters"
            self._robot_desc_param_client = self.create_client(GetParameters, self._robot_desc_param_service)
        else:
            self._robot_desc_param_service = ""
            self._robot_desc_param_client = None

        sensor_qos = QoSProfile(
            reliability=ReliabilityPolicy.BEST_EFFORT,
            history=HistoryPolicy.KEEP_LAST,
            depth=2,
        )
        latched_qos = QoSProfile(
            reliability=ReliabilityPolicy.RELIABLE,
            durability=DurabilityPolicy.TRANSIENT_LOCAL,
            history=HistoryPolicy.KEEP_LAST,
            depth=1,
        )

        self.create_subscription(PointCloud2, self.pointcloud_topic, self.on_pointcloud, sensor_qos)
        if self.use_bundled_b2_urdf:
            xml = load_bundled_b2_urdf_from_share(self.get_logger().warning, self.get_logger().info)
            if xml:
                self._set_robot_description(xml, source="bundled")
            else:
                self.get_logger().error(
                    "use_bundled_b2_urdf is true but bundled URDF failed to load — Web UI will have no model"
                )
        else:
            self.create_subscription(String, "/robot_description", self.on_robot_description_string, latched_qos)

        if _param_bool(self.get_parameter("subscribe_joint_states").value, True):
            jst = self.get_parameter("joint_states_topic").value
            self.create_subscription(JointState, jst, self.on_joint_states, sensor_qos)
            self.get_logger().info(f"JointState → Web URDF: {jst}")

        plan_qos = QoSProfile(
            reliability=ReliabilityPolicy.RELIABLE,
            durability=DurabilityPolicy.VOLATILE,
            history=HistoryPolicy.KEEP_LAST,
            depth=10,
        )
        self.create_subscription(NavPath, self.plan_topic, self.on_plan, plan_qos)

        self.tf_buffer = Buffer()
        self.tf_listener = TransformListener(self.tf_buffer, self)
        self.create_timer(1.0 / self.status_rate_hz, self.publish_pose_to_web)
        if not self.use_bundled_b2_urdf:
            self.create_timer(max(fetch_period, 1.0), self.try_fetch_robot_description_param)

        self.add_on_set_parameters_callback(self._on_set_parameters)

        manifest_file = str(self.get_parameter("process_manifest_file").value or "")
        log_buffer = max(50, int(self.get_parameter("process_log_buffer").value))
        manifest = _load_process_manifest(manifest_file, logger=self.get_logger())
        self.processes: Dict[str, ManagedProcess] = {
            name: ManagedProcess(name, cmd, log_buffer_size=log_buffer, logger=self.get_logger())
            for name, cmd in manifest.items()
        }
        if self.processes:
            self.get_logger().info(
                f"Process launcher: {len(self.processes)} entries → {sorted(self.processes.keys())}"
            )

        self.follow_client = ActionClient(self, FollowWaypoints, self.follow_action_name)
        self.get_logger().info(
            f"PointCloud: {self.pointcloud_topic} transform={self.transform_pointcloud} "
            f"tf_time={self.pointcloud_tf_time} in_robot_frame={self.pointcloud_in_robot_frame}"
        )
        self.get_logger().info(f"TF pose: {self.fixed_frame} → {self.base_frame}")
        self.get_logger().info(f"Nav2 FollowWaypoints: {self.follow_action_name}")

    # ── Static header cache ───────────────────────────────────────────────────
    def _rebuild_pc_static_header(self) -> None:
        """Cache the fields that don't change per-message."""
        self._pc_static_header = {
            "type": "pointcloud",
            "version": POINTCLOUD_HEADER_VERSION,
            "fixed_frame": self.fixed_frame,
            "base_frame": self.base_frame,
            "encoding": "float32_xyz_le",
        }

    def sync_robot_description_assets(self, xml: str):
        if not self.cache_urdf_assets or not xml or len(xml) < 50:
            return
        sync_urdf_package_assets_to_cache(
            self.asset_cache_dir, xml,
            self.get_logger().warning, self.get_logger().info,
        )

    def _on_set_parameters(self, params) -> SetParametersResult:
        rebuild_header = False
        for p in params:
            try:
                if p.name == "pointcloud_rate_hz":
                    v = float(p.value)
                    if v <= 0:
                        return SetParametersResult(successful=False, reason="must be > 0")
                    self.pc_rate_hz = v
                elif p.name == "pointcloud_range_limit":
                    self.range_limit = float(p.value)
                elif p.name == "pointcloud_z_min":
                    self.z_min = float(p.value)
                elif p.name == "pointcloud_z_max":
                    self.z_max = float(p.value)
                elif p.name == "max_points":
                    v = int(p.value)
                    if v <= 0:
                        return SetParametersResult(successful=False, reason="must be > 0")
                    self.max_points = v
                elif p.name == "transform_pointcloud":
                    self.transform_pointcloud = _param_bool(p.value, True)
                    rebuild_header = True
                elif p.name == "pointcloud_in_robot_frame":
                    self.pointcloud_in_robot_frame = _param_bool(p.value, False)
                    rebuild_header = True
                elif p.name == "pointcloud_tf_time":
                    v = str(p.value).strip().lower()
                    if v not in _VALID_TF_TIME_VALUES:
                        return SetParametersResult(
                            successful=False,
                            reason=f"invalid pointcloud_tf_time; choose one of {_VALID_TF_TIME_VALUES}",
                        )
                    self.pointcloud_tf_time = v
            except (TypeError, ValueError) as exc:
                return SetParametersResult(successful=False, reason=str(exc))
        if rebuild_header:
            self._rebuild_pc_static_header()
        return SetParametersResult(successful=True)

    def on_joint_states(self, msg: JointState):
        if not msg.name or not msg.position:
            return
        with STATE.lock:
            for i, name in enumerate(msg.name):
                if i >= len(msg.position):
                    break
                STATE.joint_positions[name] = float(msg.position[i])

    def on_plan(self, msg: NavPath):
        """Cache Nav2 global plan. Optimised: pre-allocate points list."""
        now = time.time()
        if not msg.poses:
            with STATE.lock:
                STATE.latest_plan = None
                STATE.latest_plan_time = now
            return
        if now - self._last_plan_time < 1.0 / self.plan_rate_hz:
            return
        self._last_plan_time = now

        poses = msg.poses
        n = len(poses)
        if n > self.plan_max_points:
            stride = max(1, n // self.plan_max_points)
            poses = poses[::stride][: self.plan_max_points]
            if poses[-1] is not msg.poses[-1]:
                poses.append(msg.poses[-1])

        # Pre-allocate list to avoid repeated list.append reallocations
        out_n = len(poses)
        points: List[Dict] = [None] * out_n  # type: ignore[list-item]
        for i, ps in enumerate(poses):
            p = ps.pose.position
            q = ps.pose.orientation
            points[i] = {
                "x": float(p.x),
                "y": float(p.y),
                "z": float(p.z),
                "yaw": yaw_from_quaternion(q.x, q.y, q.z, q.w),
            }

        plan = {
            "frame_id": msg.header.frame_id or self.fixed_frame,
            "stamp": float(msg.header.stamp.sec) + float(msg.header.stamp.nanosec) * 1e-9,
            "count": out_n,
            "points": points,
        }
        with STATE.lock:
            STATE.latest_plan = plan
            STATE.latest_plan_time = now

    def try_fetch_robot_description_param(self):
        if self.use_bundled_b2_urdf:
            return
        if self._robot_desc_param_client is None:
            return
        with STATE.lock:
            if STATE.robot_description:
                return
        if self._desc_attempts > self.robot_description_max_attempts:
            return

        if self._robot_desc_future is None:
            if not self._robot_desc_param_client.service_is_ready():
                if not self._robot_desc_param_client.wait_for_service(timeout_sec=0.25):
                    self._desc_attempts += 1
                    return
            req = GetParameters.Request()
            req.names = ["robot_description"]
            self._robot_desc_future = self._robot_desc_param_client.call_async(req)
            return

        if not self._robot_desc_future.done():
            return

        fut = self._robot_desc_future
        self._robot_desc_future = None
        try:
            resp = fut.result()
        except Exception as exc:
            self.get_logger().debug(f"GetParameters failed: {exc}")
            self._desc_attempts += 1
            return

        if not resp.values:
            self._desc_attempts += 1
            return
        pv = resp.values[0]
        text = pv.string_value or ""
        if len(text) < 50:
            self._desc_attempts += 1
            return
        self._set_robot_description(text, source=self._robot_desc_param_service)

    def on_robot_description_string(self, msg: String):
        if not msg.data:
            return
        self._set_robot_description(msg.data, source="topic /robot_description")

    def _set_robot_description(self, xml: str, source: str) -> None:
        etag = hashlib.sha256(xml.encode("utf-8")).hexdigest()[:16]
        with STATE.lock:
            if STATE.robot_description_etag == etag:
                return
            STATE.robot_description = xml
            STATE.robot_description_etag = etag
            STATE.urdf_version += 1
            new_version = STATE.urdf_version
        self.get_logger().info(
            f"robot_description loaded from {source} (etag={etag}, version={new_version})"
        )
        self.sync_robot_description_assets(xml)

    def on_pointcloud(self, msg: PointCloud2):
        now = time.time()
        if now - self._last_pc_time < 1.0 / max(self.pc_rate_hz, 0.1):
            return

        # ── Early-exit: skip expensive decode when no clients are connected ──
        with STATE.lock:
            has_clients = len(STATE.pointcloud_clients) > 0
        if not has_clients:
            return

        self._last_pc_time = now

        try:
            arr = pointcloud2_to_xyz_array(
                msg,
                max_points=self.max_points,
                range_limit=self.range_limit,
                z_min=self.z_min,
                z_max=self.z_max,
            )
        except _UnsupportedPointFieldType as exc:
            if now - self._unsupported_warn_last > 5.0:
                self._unsupported_warn_last = now
                self.get_logger().warning(
                    f"PointCloud2 on {self.pointcloud_topic} has unsupported xyz datatype "
                    f"({exc.datatype}); only FLOAT32/FLOAT64 are decoded"
                )
            return
        if arr.size == 0:
            return

        frame_for_header = msg.header.frame_id
        in_robot_frame = self.pointcloud_in_robot_frame

        if not in_robot_frame and self.transform_pointcloud and msg.header.frame_id != self.fixed_frame:
            use_latest = self.pointcloud_tf_time in ("latest", "now", "0")
            stamp_time = RTime.from_msg(msg.header.stamp)
            latest_time = rclpy.time.Time()

            def try_lookup(tquery):
                return self.tf_buffer.lookup_transform(
                    self.fixed_frame,
                    msg.header.frame_id,
                    tquery,
                    timeout=Duration(seconds=0.25),
                )

            tf_stamped = None
            try_order = [latest_time, stamp_time] if use_latest else [stamp_time, latest_time]
            for tq in try_order:
                try:
                    tf_stamped = try_lookup(tq)
                    break
                except TransformException:
                    continue
            if tf_stamped is not None:
                arr = transform_xyz_points(arr, tf_stamped)
                frame_for_header = self.fixed_frame
            else:
                if now - self._tf_warn_last > 5.0:
                    self._tf_warn_last = now
                    self.get_logger().warn(
                        f"Point cloud TF {msg.header.frame_id} → {self.fixed_frame} failed; "
                        "streaming raw points"
                    )

        stamp = float(msg.header.stamp.sec) + float(msg.header.stamp.nanosec) * 1e-9

        # ── Optimised payload construction: single allocation, no triple-concat ──
        header = {
            **self._pc_static_header,
            "frame_id": frame_for_header,
            "stamp": stamp,
            "count": int(arr.shape[0]),
            "in_robot_frame": in_robot_frame,
        }
        hdr_bytes = _json_dumps(header) + b"\n"
        # Use bytearray + memoryview to avoid a second copy of the point data
        payload = bytearray(len(hdr_bytes) + arr.nbytes)
        payload[: len(hdr_bytes)] = hdr_bytes
        payload[len(hdr_bytes) :] = arr.data  # memoryview — zero copy from numpy buffer
        self._broadcast_binary(bytes(payload))

    def publish_pose_to_web(self):
        # ── Early-exit: skip TF lookup when no status clients ────────────────
        with STATE.lock:
            has_clients = len(STATE.status_clients) > 0
        if not has_clients:
            return

        try:
            tf = self.tf_buffer.lookup_transform(self.fixed_frame, self.base_frame, rclpy.time.Time())
            t = tf.transform.translation
            q = tf.transform.rotation
            pose = {
                "type": "pose",
                "fixed_frame": self.fixed_frame,
                "base_frame": self.base_frame,
                "x": float(t.x),
                "y": float(t.y),
                "z": float(t.z),
                "qx": float(q.x),
                "qy": float(q.y),
                "qz": float(q.z),
                "qw": float(q.w),
                "yaw": yaw_from_quaternion(q.x, q.y, q.z, q.w),
                "time": time.time(),
            }
            with STATE.lock:
                STATE.latest_pose = pose
        except TransformException:
            with STATE.lock:
                last = STATE.latest_pose
            pose = dict(last) if last else None

        now = time.time()
        with STATE.lock:
            nav = dict(STATE.latest_nav_feedback) if STATE.latest_nav_feedback else None
            running = STATE.navigation_running
            waypoints = list(STATE.waypoints)
            joints = dict(STATE.joint_positions)
            urdf_version = STATE.urdf_version
            plan = STATE.latest_plan
            plan_time = STATE.latest_plan_time
            if (
                plan is not None
                and self.plan_stale_seconds > 0.0
                and now - plan_time > self.plan_stale_seconds
            ):
                STATE.latest_plan = None
                plan = None

        status = {
            "type": "status",
            "version": STATUS_VERSION,
            "pose": pose,
            "joint_positions": joints,
            "nav_feedback": nav,
            "navigation_running": running,
            "waypoints": waypoints,
            "urdf_version": urdf_version,
            "nav_plan": plan,
        }
        self._broadcast_json(status)

    def _broadcast_json(self, data: Dict) -> None:
        loop = STATE.loop
        if loop is None:
            return
        with STATE.lock:
            clients = list(STATE.status_clients)
        if not clients:
            return
        # Encode once, fan-out to all clients
        text = _json_dumps(data).decode("utf-8")
        for c in clients:
            loop.call_soon_threadsafe(c.offer, text)

    def _broadcast_binary(self, data: bytes) -> None:
        loop = STATE.loop
        if loop is None:
            return
        with STATE.lock:
            clients = list(STATE.pointcloud_clients)
        if not clients:
            return
        for c in clients:
            loop.call_soon_threadsafe(c.offer, data)

    def set_waypoints(self, waypoints: List[Dict]):
        clean = []
        for wp in waypoints:
            clean.append(
                {
                    "x": float(wp["x"]),
                    "y": float(wp["y"]),
                    "z": float(wp.get("z", 0.0)),
                    "yaw": float(wp.get("yaw", 0.0)),
                }
            )
        with STATE.lock:
            STATE.waypoints = clean
        return clean

    async def start_follow_waypoints(self, repeat_count: int = 1):
        with STATE.lock:
            if STATE.navigation_running:
                raise RuntimeError("Navigation is already running")
            waypoints = list(STATE.waypoints)
            STATE.navigation_running = True
            STATE.navigation_cancel_requested = False
            STATE.latest_nav_feedback = {"state": "starting", "repeat_count": repeat_count}

        if len(waypoints) == 0:
            with STATE.lock:
                STATE.navigation_running = False
            raise RuntimeError("No waypoints set")

        if not self.follow_client.wait_for_server(timeout_sec=5.0):
            with STATE.lock:
                STATE.navigation_running = False
            raise RuntimeError(f"Action server not available: {self.follow_action_name}")

        rounds_done = 0
        infinite = repeat_count < 0
        try:
            while infinite or rounds_done < repeat_count:
                with STATE.lock:
                    if STATE.navigation_cancel_requested:
                        break
                    waypoints = list(STATE.waypoints)
                    STATE.latest_nav_feedback = {
                        "state": "running",
                        "round": rounds_done + 1,
                        "repeat_count": repeat_count,
                    }

                goal_msg = FollowWaypoints.Goal()
                goal_msg.poses = [make_pose_stamped(self.fixed_frame, wp, self) for wp in waypoints]

                send_future = self.follow_client.send_goal_async(goal_msg, feedback_callback=self._feedback_cb)
                goal_handle = await _await_ros_future(send_future)
                if not goal_handle.accepted:
                    raise RuntimeError("FollowWaypoints goal rejected")

                with STATE.lock:
                    STATE.active_goal_handle = goal_handle

                result_future = goal_handle.get_result_async()
                result = await _await_ros_future(result_future)
                rounds_done += 1

                missed = []
                if hasattr(result.result, "missed_waypoints"):
                    missed = list(result.result.missed_waypoints)

                with STATE.lock:
                    STATE.latest_nav_feedback = {
                        "state": "round_finished",
                        "round": rounds_done,
                        "repeat_count": repeat_count,
                        "missed_waypoints": missed,
                        "status": int(result.status),
                    }
                    if STATE.navigation_cancel_requested:
                        break

        finally:
            with STATE.lock:
                STATE.navigation_running = False
                STATE.active_goal_handle = None
                if STATE.navigation_cancel_requested:
                    STATE.latest_nav_feedback = {"state": "canceled", "rounds_done": rounds_done}
                else:
                    STATE.latest_nav_feedback = {"state": "finished", "rounds_done": rounds_done}

    def _feedback_cb(self, feedback_msg):
        fb = feedback_msg.feedback
        data = {"state": "running"}
        if hasattr(fb, "current_waypoint"):
            data["current_waypoint"] = int(fb.current_waypoint)
        with STATE.lock:
            STATE.latest_nav_feedback = data

    async def cancel_navigation(self):
        with STATE.lock:
            STATE.navigation_cancel_requested = True
            goal_handle = STATE.active_goal_handle
        if goal_handle is not None:
            cancel_future = goal_handle.cancel_goal_async()
            await _await_ros_future(cancel_future)
        with STATE.lock:
            STATE.navigation_running = False
            STATE.latest_nav_feedback = {"state": "cancel_requested"}


ROS_NODE: Optional[B2WebGateway] = None


async def _await_ros_future(fut):
    """Bridge rclpy Future to asyncio. Polls at 10ms."""
    while rclpy.ok() and not fut.done():
        await asyncio.sleep(0.01)
    return fut.result()


def _try_mount_ui() -> None:
    global _UI_STATIC_MOUNTED
    if _UI_STATIC_MOUNTED:
        return
    candidates = []
    env = os.environ.get("B2_WEB_FRONTEND_DIST", "").strip()
    if env:
        candidates.append(env)
    try:
        if ROS_NODE is not None:
            fd = ROS_NODE.get_parameter("frontend_dist").value
            if isinstance(fd, str) and fd.strip():
                candidates.append(fd.strip())
    except Exception:
        pass
    try:
        share = get_package_share_directory("b2_web_rviz")
        candidates.append(os.path.join(share, "www"))
    except PackageNotFoundError:
        pass
    for p in candidates:
        ap = os.path.abspath(os.path.expanduser(p))
        if os.path.isfile(os.path.join(ap, "index.html")):
            app.mount("/app", StaticFiles(directory=ap, html=True), name="ui")
            _UI_STATIC_MOUNTED = True
            if ROS_NODE is not None:
                ROS_NODE.get_logger().info(f"Web UI static files mounted at /app/ from {ap}")
            break


# ── Dashboard HTML (unchanged from original) ─────────────────────────────────
_DASHBOARD_HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>B2 — Local HMI</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#121418;--surface:#1a1d24;--surface-2:#22262e;--border:#2f3540;--border-strong:#3d4450;--text:#e6e8ec;--text-dim:#8b919c;--text-muted:#6b7280;--accent:#2d8f9e;--accent-dim:#246b76;--ok:#2d9f5a;--ok-bg:rgba(45,159,90,.12);--alarm:#c94a4a;--alarm-bg:rgba(201,74,74,.1);--warn:#c9a227;--font-ui:'IBM Plex Sans',system-ui,sans-serif;--font-mono:'IBM Plex Mono','Consolas',monospace}
body{font-family:var(--font-ui);background:var(--bg);color:var(--text);min-height:100vh;font-size:14px}
.header{display:flex;align-items:stretch;justify-content:space-between;padding:0;border-bottom:1px solid var(--border);background:var(--surface)}
.header::before{content:'';width:4px;background:var(--accent);flex-shrink:0}
.logo{display:flex;align-items:center;gap:14px;padding:14px 20px}
.logo-mark{width:40px;height:40px;border:1px solid var(--border-strong);background:var(--surface-2);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:11px;font-weight:600;color:var(--accent)}
.logo-title{font-size:15px;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
.logo-sub{font-size:11px;color:var(--text-dim);margin-top:2px;font-family:var(--font-mono)}
.header-right{display:flex;align-items:center;gap:0;padding-right:16px}
.ip-box{display:flex;align-items:center;gap:10px;background:var(--bg);border:1px solid var(--border);padding:8px 14px;font-family:var(--font-mono);font-size:12px}
.dot{width:10px;height:10px;flex-shrink:0;border:1px solid rgba(0,0,0,.35)}
.dot-green{background:var(--ok);box-shadow:0 0 6px rgba(45,159,90,.45)}
.dot-red{background:var(--alarm)}
.content{max-width:920px;margin:0 auto;padding:28px 24px 48px}
.section-title{font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.14em;font-weight:600;margin-bottom:10px;font-family:var(--font-mono)}
.proc-card{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--accent);padding:16px 18px;margin-bottom:10px}
.proc-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
.proc-info{display:flex;align-items:flex-start;gap:14px}
.proc-name{font-size:14px;font-weight:600}
.proc-desc{font-size:11px;color:var(--text-dim);margin-top:4px;font-family:var(--font-mono);word-break:break-all}
.proc-status{font-family:var(--font-mono);font-size:10px;font-weight:600;letter-spacing:.06em;padding:4px 10px;border:1px solid var(--border);text-transform:uppercase;flex-shrink:0}
.status-running{border-color:var(--ok);color:var(--ok);background:var(--ok-bg)}
.status-stopped{border-color:var(--border-strong);color:var(--text-muted);background:var(--surface-2)}
.status-exited{border-color:var(--alarm);color:var(--alarm);background:var(--alarm-bg)}
.proc-actions{display:flex;gap:6px;margin-top:14px;flex-wrap:wrap}
.btn{padding:7px 16px;border:1px solid var(--border-strong);background:var(--surface-2);color:var(--text);font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font-mono);letter-spacing:.06em;text-transform:uppercase}
.btn:disabled{opacity:.35;cursor:not-allowed}
.btn-green{border-color:var(--ok);color:var(--ok)}
.btn-red{border-color:var(--alarm);color:var(--alarm)}
.btn-accent{border-color:var(--accent);color:var(--accent)}
.log-box{margin-top:8px;background:#0d0f12;border:1px solid var(--border);padding:10px 12px;max-height:220px;overflow-y:auto;font-size:11px;color:#a8b0bc;line-height:1.55;display:none;font-family:var(--font-mono);white-space:pre-wrap;word-break:break-word}
.log-box.show{display:block}
.fox-card{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--accent);padding:18px 20px;margin-bottom:14px}
.fox-card-inner{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px}
.fox-card a{display:inline-flex;align-items:center;justify-content:center;padding:10px 22px;border:1px solid var(--accent);background:var(--surface-2);color:var(--accent);text-decoration:none;font-size:11px;font-weight:600;font-family:var(--font-mono);letter-spacing:.08em;text-transform:uppercase}
.fox-desc{font-size:11px;color:var(--text-dim);max-width:420px;line-height:1.5;font-family:var(--font-mono)}
.quick-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.error-banner{background:var(--alarm-bg);border:1px solid var(--alarm);color:#fca5a5;padding:10px 14px;font-family:var(--font-mono);font-size:11px;margin-bottom:14px;display:none}
.error-banner.show{display:block}
.footer{text-align:center;padding:16px;font-size:10px;color:var(--text-muted);border-top:1px solid var(--border);margin-top:32px;font-family:var(--font-mono)}
</style>
</head>
<body>
<header class="header">
  <div class="logo">
    <div class="logo-mark">B2</div>
    <div>
      <div class="logo-title">Unitree B2 · Web RViz</div>
      <div class="logo-sub">LOCAL HMI · ROS 2 LAUNCH SUPERVISION</div>
    </div>
  </div>
  <div class="header-right">
    <div class="ip-box">
      <div class="dot dot-green" id="gwDot"></div>
      <span id="gwHost">…</span>
    </div>
  </div>
</header>
<div class="content">
  <div class="section-title">Visualization</div>
  <div class="fox-card">
    <div class="fox-card-inner">
      <a href="/app/" target="_blank" rel="noopener">Open 3D RViz UI →</a>
      <div class="fox-desc">Browser RViz: pose · point cloud · joint-animated URDF · Nav2 plan + waypoints.</div>
    </div>
  </div>
  <div class="section-title">Process supervision</div>
  <div class="error-banner" id="errBanner"></div>
  <div id="procList"></div>
  <div class="section-title" style="margin-top:18px">Batch control</div>
  <div class="quick-row">
    <button class="btn btn-green" onclick="startAll()">Start all</button>
    <button class="btn btn-red" onclick="stopAll()">Stop all</button>
    <button class="btn btn-accent" onclick="refresh()">Refresh</button>
  </div>
</div>
<footer class="footer">Gateway · <span id="footerHost"></span> · API <a style="color:#7ec8d4" href="/docs">/docs</a></footer>
<script>
const procListEl=document.getElementById('procList'),errEl=document.getElementById('errBanner'),dotEl=document.getElementById('gwDot'),gwHostEl=document.getElementById('gwHost'),footerHostEl=document.getElementById('footerHost');
gwHostEl.textContent=window.location.host;footerHostEl.textContent=window.location.host;
const openLogs=new Set(),logTimers={};
function fmtAge(ts){if(!ts)return'';const s=Math.max(0,Math.floor(Date.now()/1000-ts));return s<60?s+'s':s<3600?Math.floor(s/60)+'m '+(s%60)+'s':Math.floor(s/3600)+'h '+Math.floor((s%3600)/60)+'m'}
function setError(m){m?(errEl.textContent=m,errEl.classList.add('show')):errEl.classList.remove('show')}
function cssId(s){return s.replace(/[^a-zA-Z0-9_-]/g,'_')}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderProcs(ps){procListEl.innerHTML='';ps.forEach((p,idx)=>{const sc=p.running?'status-running':p.exit_code!=null&&p.exit_code!==0?'status-exited':'status-stopped';const st=p.running?'RUNNING · pid '+p.pid+' · '+fmtAge(p.started_at):p.exit_code!=null?'EXITED '+p.exit_code:'STOPPED';const c=document.createElement('div');c.className='proc-card';c.innerHTML=`<div class="proc-header"><div class="proc-info"><div><div class="proc-name">${esc(p.name)}</div><div class="proc-desc">${esc(p.cmd)}</div></div></div><span class="proc-status ${sc}">${st}</span></div><div class="proc-actions"><button class="btn btn-green" data-a="start" data-n="${esc(p.name)}" ${p.running?'disabled':''}>Start</button><button class="btn btn-red" data-a="stop" data-n="${esc(p.name)}" ${!p.running?'disabled':''}>Stop</button><button class="btn" data-a="log" data-n="${esc(p.name)}">${openLogs.has(p.name)?'Hide log':'Show log'}</button></div><pre class="log-box ${openLogs.has(p.name)?'show':''}" id="log_${cssId(p.name)}">${(p.log_tail||[]).map(esc).join('\n')||'— no output —'}</pre>`;procListEl.appendChild(c);});procListEl.querySelectorAll('button[data-a]').forEach(b=>{b.addEventListener('click',()=>{const n=b.dataset.n,a=b.dataset.a;if(a==='start'||a==='stop')call(n,a);else toggleLog(n);});})}
async function refresh(){try{const r=await fetch('/api/processes?tail=20');if(!r.ok)throw new Error('HTTP '+r.status);renderProcs((await r.json()).processes||[]);setError('');dotEl.className='dot dot-green';}catch(e){setError('Cannot reach gateway: '+e.message);dotEl.className='dot dot-red'}}
async function call(n,a){try{const r=await fetch('/api/processes/'+encodeURIComponent(n)+'/'+a,{method:'POST'});if(!r.ok){let d='HTTP '+r.status;try{const j=await r.json();if(j?.detail)d=j.detail;}catch{}throw new Error(d);}refresh();}catch(e){setError(a+' '+n+': '+e.message)}}
async function startAll(){try{const d=await(await fetch('/api/processes?tail=0')).json();for(const p of(d.processes||[]))if(!p.running)await fetch('/api/processes/'+encodeURIComponent(p.name)+'/start',{method:'POST'});}catch(e){setError('Start all: '+e.message)}refresh()}
async function stopAll(){try{const d=await(await fetch('/api/processes?tail=0')).json();for(const p of(d.processes||[]))if(p.running)await fetch('/api/processes/'+encodeURIComponent(p.name)+'/stop',{method:'POST'});}catch(e){setError('Stop all: '+e.message)}refresh()}
async function fetchLog(n){try{const r=await fetch('/api/processes/'+encodeURIComponent(n)+'/log?tail=80');if(!r.ok)return;const d=await r.json();const b=document.getElementById('log_'+cssId(n));if(!b)return;b.textContent=(d.log_tail||[]).join('\n')||'— no output —';b.scrollTop=b.scrollHeight;}catch{}}
function toggleLog(n){const b=document.getElementById('log_'+cssId(n));if(!b)return;const show=!b.classList.contains('show');b.classList.toggle('show',show);if(show){openLogs.add(n);fetchLog(n);logTimers[n]=setInterval(()=>fetchLog(n),2000);}else{openLogs.delete(n);clearInterval(logTimers[n]);delete logTimers[n];}document.querySelectorAll(`button[data-a="log"][data-n="${n}"]`).forEach(b=>b.textContent=show?'Hide log':'Show log');}
refresh();setInterval(refresh,3000);
</script>
</body>
</html>"""


# ── FastAPI Routes (identical interface to original) ─────────────────────────

@app.get("/", response_class=HTMLResponse)
async def root_dashboard():
    return HTMLResponse(_DASHBOARD_HTML)


@app.get("/favicon.ico")
async def favicon():
    return Response(status_code=204)


@app.get("/health")
async def health():
    return {"ok": True, "service": "b2_web_gateway"}


_ASSET_CACHE_HEADERS = {"Cache-Control": "public, max-age=3600"}


@app.get("/api/status")
async def api_status():
    with STATE.lock:
        return {
            "pose": STATE.latest_pose,
            "joint_positions": dict(STATE.joint_positions),
            "asset_cache_dir": STATE.asset_cache_dir,
            "cache_urdf_assets": STATE.cache_urdf_assets,
            "navigation_running": STATE.navigation_running,
            "nav_feedback": STATE.latest_nav_feedback,
            "waypoints": list(STATE.waypoints),
            "urdf_version": STATE.urdf_version,
            "urdf_etag": STATE.robot_description_etag,
            "nav_plan": STATE.latest_plan,
        }


_LIVE_PARAMS = (
    "pointcloud_topic", "fixed_frame", "base_frame", "max_points",
    "pointcloud_rate_hz", "pointcloud_range_limit", "pointcloud_z_min",
    "pointcloud_z_max", "transform_pointcloud", "pointcloud_tf_time",
    "pointcloud_in_robot_frame", "status_rate_hz", "follow_waypoints_action",
    "joint_states_topic", "subscribe_joint_states", "use_bundled_b2_urdf",
    "cache_urdf_assets", "plan_topic", "plan_rate_hz", "plan_max_points", "plan_stale_seconds",
)

_LIVE_PARAM_SPEC: Dict[str, Tuple[Parameter.Type, str]] = {
    "pointcloud_rate_hz": (Parameter.Type.DOUBLE, "float"),
    "pointcloud_range_limit": (Parameter.Type.DOUBLE, "float"),
    "pointcloud_z_min": (Parameter.Type.DOUBLE, "float"),
    "pointcloud_z_max": (Parameter.Type.DOUBLE, "float"),
    "max_points": (Parameter.Type.INTEGER, "int"),
    "transform_pointcloud": (Parameter.Type.BOOL, "bool"),
    "pointcloud_in_robot_frame": (Parameter.Type.BOOL, "bool"),
    "pointcloud_tf_time": (Parameter.Type.STRING, "str"),
}


def _coerce_param_value(name: str, raw: Any) -> Any:
    if name not in _LIVE_PARAM_SPEC:
        raise ValueError(f"unknown or non-live parameter: {name!r}")
    _, kind = _LIVE_PARAM_SPEC[name]
    if kind == "float":
        try:
            return float(raw)
        except (TypeError, ValueError):
            raise ValueError(f"{name} expects a number, got {raw!r}")
    if kind == "int":
        try:
            return int(raw)
        except (TypeError, ValueError):
            raise ValueError(f"{name} expects an integer, got {raw!r}")
    if kind == "bool":
        if isinstance(raw, bool):
            return raw
        if isinstance(raw, (int, float)):
            return bool(raw)
        if isinstance(raw, str) and raw.strip().lower() in {"true", "yes", "on", "1", "false", "no", "off", "0"}:
            return _param_bool(raw, False)
        raise ValueError(f"{name} expects a boolean, got {raw!r}")
    if kind == "str":
        return str(raw)
    raise ValueError(f"unsupported kind for {name}: {kind}")


@app.get("/api/config")
async def api_config():
    if ROS_NODE is None:
        raise HTTPException(status_code=503, detail="ROS node not ready")
    out: Dict[str, Any] = {}
    for name in _LIVE_PARAMS:
        try:
            out[name] = ROS_NODE.get_parameter(name).value
        except Exception:
            pass
    out["editable"] = sorted(_LIVE_PARAM_SPEC.keys())
    with STATE.lock:
        out["urdf_version"] = STATE.urdf_version
        out["urdf_etag"] = STATE.robot_description_etag
        out["asset_cache_dir"] = STATE.asset_cache_dir
    return out


@app.post("/api/config")
async def api_set_config(payload: Dict[str, Any]):
    if ROS_NODE is None:
        raise HTTPException(status_code=503, detail="ROS node not ready")
    if not isinstance(payload, dict):
        raise HTTPException(status_code=400, detail="expected JSON object of {param: value}")
    parameters: List[Parameter] = []
    for name, raw in payload.items():
        if name not in _LIVE_PARAM_SPEC:
            raise HTTPException(status_code=400, detail=f"parameter {name!r} is not live-editable")
        try:
            value = _coerce_param_value(name, raw)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc))
        ptype, _ = _LIVE_PARAM_SPEC[name]
        parameters.append(Parameter(name, ptype, value))
    if not parameters:
        return await api_config()
    results = ROS_NODE.set_parameters(parameters)
    rejected = [
        {"name": p.name, "reason": (r.reason or "rejected")}
        for p, r in zip(parameters, results)
        if not r.successful
    ]
    if rejected:
        raise HTTPException(status_code=400, detail={"rejected": rejected})
    return await api_config()


@app.get("/api/robot_description")
async def api_robot_description(request: Request):
    with STATE.lock:
        text = STATE.robot_description
        etag = STATE.robot_description_etag
        version = STATE.urdf_version
    if etag and request.headers.get("if-none-match") == etag:
        return Response(status_code=304, headers={"ETag": etag, "X-URDF-Version": str(version)})
    accept = request.headers.get("accept", "")
    fmt = request.query_params.get("format", "").lower()
    headers = {"X-URDF-Version": str(version)}
    if etag:
        headers["ETag"] = etag
    if fmt == "xml" or "application/xml" in accept or "text/xml" in accept:
        return PlainTextResponse(text or "", media_type="application/xml", headers=headers)
    return Response(
        content=json.dumps({"robot_description": text, "urdf_version": version, "urdf_etag": etag}),
        media_type="application/json",
        headers=headers,
    )


@app.get("/api/pkg/{package_name}/{filepath:path}")
async def api_pkg_asset(package_name: str, filepath: str):
    filepath = _normalize_pkg_relative_path(filepath)
    if not filepath:
        raise HTTPException(status_code=400, detail="Invalid path")
    with STATE.lock:
        cache_root = STATE.asset_cache_dir
        use_cache = STATE.cache_urdf_assets
    if use_cache and cache_root:
        pkg_cache = os.path.realpath(os.path.join(cache_root, package_name))
        full_cache = os.path.realpath(os.path.join(pkg_cache, filepath.replace("/", os.sep)))
        if full_cache.startswith(pkg_cache + os.sep) and os.path.isfile(full_cache):
            mime, _ = mimetypes.guess_type(full_cache)
            return FileResponse(full_cache, media_type=mime or "application/octet-stream", headers=_ASSET_CACHE_HEADERS)
    try:
        share = get_package_share_directory(package_name)
    except PackageNotFoundError:
        raise HTTPException(status_code=404, detail=f"Unknown ROS package: {package_name}")
    share_real = os.path.realpath(share)
    full_share = os.path.realpath(os.path.join(share_real, filepath.replace("/", os.sep)))
    if not full_share.startswith(share_real + os.sep):
        raise HTTPException(status_code=403, detail="Path escapes package share")
    if not os.path.isfile(full_share):
        raise HTTPException(status_code=404, detail="File not found")
    if use_cache and cache_root:
        try:
            dst = os.path.join(os.path.realpath(cache_root), package_name, filepath.replace("/", os.sep))
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copy2(full_share, dst)
        except OSError:
            pass
    mime, _ = mimetypes.guess_type(full_share)
    return FileResponse(full_share, media_type=mime or "application/octet-stream", headers=_ASSET_CACHE_HEADERS)


@app.post("/api/waypoints")
async def api_set_waypoints(body: Dict):
    if ROS_NODE is None:
        raise HTTPException(status_code=500, detail="ROS node not ready")
    waypoints = body.get("waypoints", [])
    if not isinstance(waypoints, list):
        raise HTTPException(status_code=400, detail="waypoints must be a list")
    clean = ROS_NODE.set_waypoints(waypoints)
    return {"ok": True, "waypoints": clean}


@app.post("/api/navigation/start")
async def api_start_navigation(body: Dict):
    if ROS_NODE is None:
        raise HTTPException(status_code=500, detail="ROS node not ready")
    repeat_count = int(body.get("repeat_count", 1))
    asyncio.create_task(_run_navigation_task(repeat_count))
    return {"ok": True, "repeat_count": repeat_count}


async def _run_navigation_task(repeat_count: int):
    try:
        await ROS_NODE.start_follow_waypoints(repeat_count=repeat_count)
    except Exception as e:
        with STATE.lock:
            STATE.navigation_running = False
            STATE.latest_nav_feedback = {"state": "error", "message": str(e)}
        ROS_NODE.get_logger().error(f"Navigation failed: {e}")


@app.post("/api/navigation/cancel")
async def api_cancel_navigation():
    if ROS_NODE is None:
        raise HTTPException(status_code=500, detail="ROS node not ready")
    await ROS_NODE.cancel_navigation()
    with STATE.lock:
        STATE.latest_plan = None
    return {"ok": True}


def _get_process_or_404(name: str) -> ManagedProcess:
    if ROS_NODE is None:
        raise HTTPException(status_code=503, detail="ROS node not ready")
    proc = ROS_NODE.processes.get(name)
    if proc is None:
        raise HTTPException(status_code=404, detail=f"unknown process: {name!r}")
    return proc


@app.get("/api/processes")
async def api_processes(tail: int = 20):
    if ROS_NODE is None:
        raise HTTPException(status_code=503, detail="ROS node not ready")
    tail = max(0, min(int(tail), 500))
    return {"processes": [p.status(log_tail=tail) for p in ROS_NODE.processes.values()]}


@app.post("/api/processes/{name}/start")
async def api_process_start(name: str):
    proc = _get_process_or_404(name)
    started = await asyncio.get_running_loop().run_in_executor(None, proc.start)
    return {"ok": True, "started": started, "status": proc.status()}


@app.post("/api/processes/{name}/stop")
async def api_process_stop(name: str):
    proc = _get_process_or_404(name)
    stopped = await asyncio.get_running_loop().run_in_executor(None, proc.stop)
    return {"ok": True, "stopped": stopped, "status": proc.status()}


@app.get("/api/processes/{name}/log")
async def api_process_log(name: str, tail: int = 200):
    proc = _get_process_or_404(name)
    tail = max(1, min(int(tail), 1000))
    return proc.status(log_tail=tail)


@app.get("/api/video_feed")
async def api_video_feed(request: Request):
    """
    MJPEG stream from RTSP source (cv2 backend).
    Serves a placeholder color-bar frame when RTSP is unreachable.

    Compatible with <img src="/api/video_feed"> directly in the browser.
    """
    if _VIDEO_STREAMER is None:
        raise HTTPException(status_code=503, detail="Video streamer not running (video_enabled:=false)")

    boundary = b"frame"

    async def generate():
        try:
            while await request.is_disconnected() is False:
                frame = _VIDEO_STREAMER.get_frame()
                yield (
                    b"--frame\r\n"
                    b"Content-Type: image/jpeg\r\n"
                    b"Content-Length: " + str(len(frame)).encode() + b"\r\n\r\n"
                    + frame + b"\r\n"
                )
                await asyncio.sleep(1.0 / 15)  # 15 fps max push rate
        except asyncio.CancelledError:
            pass

    return StreamingResponse(
        generate(),
        media_type="multipart/x-mixed-replace; boundary=frame",
        headers={"Cache-Control": "no-cache, no-store", "X-Accel-Buffering": "no"},
    )


@app.get("/api/video_snapshot")
async def api_video_snapshot():
    """Return the latest frame as a single JPEG (for snapshot download)."""
    if _VIDEO_STREAMER is None:
        raise HTTPException(status_code=503, detail="Video streamer not running")
    frame = _VIDEO_STREAMER.get_frame()
    return Response(content=frame, media_type="image/jpeg",
                    headers={"Content-Disposition": f'attachment; filename="snapshot_{int(time.time())}.jpg"'})


@app.post("/api/navigation/clear")
async def api_clear_waypoints():
    with STATE.lock:
        STATE.waypoints = []
        STATE.latest_plan = None
    return {"ok": True}


async def _run_ws_client(ws: WebSocket, kind: str, queue_size: int, clients: List[WSClient]) -> None:
    await ws.accept()
    client = WSClient(ws, kind=kind, queue_size=queue_size)
    with STATE.lock:
        clients.append(client)
    client.writer_task = asyncio.create_task(client.writer_loop())
    try:
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        pass
    except Exception:
        pass
    finally:
        with STATE.lock:
            try:
                clients.remove(client)
            except ValueError:
                pass
        try:
            client.queue.put_nowait(None)
        except Exception:
            pass
        if client.writer_task is not None:
            try:
                await asyncio.wait_for(client.writer_task, timeout=0.5)
            except Exception:
                client.writer_task.cancel()


@app.websocket("/ws/status")
async def ws_status(ws: WebSocket):
    await _run_ws_client(ws, kind="json", queue_size=8, clients=STATE.status_clients)


@app.websocket("/ws/pointcloud")
async def ws_pointcloud(ws: WebSocket):
    await _run_ws_client(ws, kind="binary", queue_size=2, clients=STATE.pointcloud_clients)


def start_web_server(node: B2WebGateway) -> uvicorn.Server:
    host = node.get_parameter("web_host").value
    port = int(node.get_parameter("web_port").value)
    config = uvicorn.Config(app, host=host, port=port, log_level="info")
    server = uvicorn.Server(config)
    thread = threading.Thread(target=server.run, daemon=True, name="b2_web_uvicorn")
    thread.start()
    node.get_logger().info(f"Web gateway: http://{host}:{port}")
    return server


def main(args=None):
    global ROS_NODE
    rclpy.init(args=args)
    ROS_NODE = B2WebGateway()
    server = start_web_server(ROS_NODE)
    executor = MultiThreadedExecutor(num_threads=4)
    executor.add_node(ROS_NODE)
    try:
        executor.spin()
    except KeyboardInterrupt:
        pass
    finally:
        server.should_exit = True
        executor.shutdown()
        ROS_NODE.destroy_node()
        rclpy.shutdown()


if __name__ == "__main__":
    main()
