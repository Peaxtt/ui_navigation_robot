#!/usr/bin/env python3
"""
B2 Web RViz Gateway

- Stream PointCloud2 (optional TF transform into fixed_frame)
- TF pose fixed_frame -> base_frame to browsers; JointState -> URDF joint angles in browser
- robot_description: **default** load bundled B2 URDF + meshes shipped inside `b2_web_rviz` (`bundled_ros2_b2_unitree_description/`); optional `/robot_description` + robot_state_publisher when `use_bundled_b2_urdf:=false`
- Mirror package:// assets into optional local cache; GET /api/pkg/<pkg>/<path> prefers cache
- Nav2 FollowWaypoints + repeat rounds

Recommended:
  sudo apt install ros-humble-nav2-msgs \\
                   python3-fastapi python3-uvicorn python3-numpy

Run:
  ros2 launch b2_web_rviz b2_web_gateway.launch.py
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
from typing import Any, Callable, Deque, Dict, List, Optional, Tuple

import numpy as np
import rclpy
from ament_index_python.packages import PackageNotFoundError, get_package_share_directory
from fastapi import FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, PlainTextResponse, Response, StreamingResponse
from fastapi.staticfiles import StaticFiles
from geometry_msgs.msg import PoseStamped
from nav2_msgs.action import FollowWaypoints
# Aliased so we don't shadow `pathlib.Path` further up.
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

# ── Optional camera support (opencv-python-headless) ─────────────────────────
try:
    import cv2 as _cv2
    _HAS_CV2 = True
except ImportError:
    _cv2 = None  # type: ignore
    _HAS_CV2 = False

_PLACEHOLDER_JPEG: Optional[bytes] = None


def _make_placeholder_jpeg() -> bytes:
    """Color-bar JPEG placeholder — served when RTSP stream is unavailable."""
    global _PLACEHOLDER_JPEG
    if _PLACEHOLDER_JPEG is not None:
        return _PLACEHOLDER_JPEG
    if _HAS_CV2:
        import numpy as np
        h, w = 240, 320
        img = np.zeros((h, w, 3), dtype=np.uint8)
        colors = [
            (0, 0, 192), (0, 192, 192), (0, 192, 0),
            (192, 192, 0), (192, 0, 0), (192, 0, 192), (64, 64, 64),
        ]
        sw = w // len(colors)
        for i, c in enumerate(colors):
            img[:, i * sw:(i + 1) * sw] = c
        _cv2.putText(img, "NO SIGNAL", (70, 130), _cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2)
        _, buf = _cv2.imencode(".jpg", img, [_cv2.IMWRITE_JPEG_QUALITY, 60])
        _PLACEHOLDER_JPEG = buf.tobytes()
    else:
        # Minimal 1×1 gray JPEG (no cv2 dependency)
        _PLACEHOLDER_JPEG = (
            b"\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00"
            b"\xff\xdb\x00C\x00\x10\x0b\x0c\x0e\x0c\n\x10\x0e\r\x0e\x12\x11\x10"
            b"\x13\x18(\x1a\x18\x16\x16\x18\x310#&\')*3/1,3(((0<;@>3@(((4D6EKL"
            b"GJMGIJ\xff\xc0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xff\xc4"
            b"\x00\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00"
            b"\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\xff\xc4\x00"
            b"\xb5\x10\x00\x02\x01\x03\x03\x02\x04\x03\x05\x05\x04\x04\x00\x00\x01"
            b"}\x01\x02\x03\x00\x04\x11\x05\x12!1A\x06\x13Qa\x07\"q\x142\x81\x91"
            b"\xa1\x08#B\xb1\xc1\x15R\xd1\xf0\xff\xda\x00\x08\x01\x01\x00\x00?\x00"
            b"\xf5\x00\x00\x00\x00\x00\x00\x00\x00\xff\xd9"
        )
    return _PLACEHOLDER_JPEG


class VideoStreamer:
    """RTSP → MJPEG bridge with GStreamer-backed capture and auto-reconnect.

    Uses a background thread so frame acquisition never blocks the asyncio loop.
    Callers call latest_jpeg() from any thread; the lock is kept for <1 µs.
    """

    def __init__(self, url: str, quality: int = 75, fps_limit: float = 15.0):
        self.url = url
        self.quality = min(100, max(1, int(quality)))
        self._min_dt = 1.0 / max(0.5, float(fps_limit))
        self._frame: bytes = b""
        self._lock = threading.Lock()
        self._running = False
        self._thread: Optional[threading.Thread] = None
        self._connected = False

    @property
    def connected(self) -> bool:
        return self._connected

    def start(self) -> None:
        if not _HAS_CV2:
            return
        self._running = True
        self._thread = threading.Thread(
            target=self._capture_loop, daemon=True, name="video-capture"
        )
        self._thread.start()

    def stop(self) -> None:
        self._running = False

    def latest_jpeg(self) -> bytes:
        with self._lock:
            if self._frame:
                return self._frame
        return _make_placeholder_jpeg()

    def _open_capture(self):
        """Try GStreamer uridecodebin pipeline first (low latency); fall back to default."""
        if self.url.startswith("rtsp://"):
            pipeline = (
                f"uridecodebin uri={self.url} latency=0 ! "
                "videoconvert ! video/x-raw,format=BGR ! "
                "appsink max-buffers=1 drop=true sync=false"
            )
            cap = _cv2.VideoCapture(pipeline, _cv2.CAP_GSTREAMER)
            if cap.isOpened():
                return cap
            cap.release()
        # Fallback: let OpenCV/FFmpeg handle it
        cap = _cv2.VideoCapture(self.url)
        cap.set(_cv2.CAP_PROP_BUFFERSIZE, 1)
        cap.set(_cv2.CAP_PROP_OPEN_TIMEOUT_MSEC, 5000)
        cap.set(_cv2.CAP_PROP_READ_TIMEOUT_MSEC, 5000)
        return cap

    def _capture_loop(self) -> None:
        backoff = 1.0
        encode_params = [_cv2.IMWRITE_JPEG_QUALITY, self.quality]
        while self._running:
            cap = None
            try:
                cap = self._open_capture()
                if not cap.isOpened():
                    raise OSError("stream not opened")
                self._connected = True
                backoff = 1.0
                last_t = 0.0
                while self._running:
                    dt = self._min_dt - (time.monotonic() - last_t)
                    if dt > 0:
                        time.sleep(dt)
                    ok, frame = cap.read()
                    if not ok:
                        break
                    last_t = time.monotonic()
                    _, buf = _cv2.imencode(".jpg", frame, encode_params)
                    with self._lock:
                        self._frame = buf.tobytes()
            except Exception:
                pass
            finally:
                self._connected = False
                if cap is not None:
                    try:
                        cap.release()
                    except Exception:
                        pass
            if self._running:
                time.sleep(backoff)
                backoff = min(backoff * 2, 30.0)


VIDEO_STREAMER: Optional[VideoStreamer] = None
_MJPEG_PART_HEADER = b"--mjpeg\r\nContent-Type: image/jpeg\r\n\r\n"

POINTCLOUD_HEADER_VERSION = 1
STATUS_VERSION = 1
_VALID_TF_TIME_VALUES = ("latest", "now", "0", "message_stamp", "stamp")


# Whitelisted shell commands that the web Launcher page can start/stop.
# The UI cannot post arbitrary commands — only the *names* below — so the attack surface
# is "an attacker on the same LAN can start/stop these specific ROS launches".
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
    """Long-running shell command supervised on behalf of the web Launcher.

    - Stdout/stderr is captured in a fixed-size deque (so the gateway never grows unbounded
      even if the supervised launch is verbose).
    - Each child runs in its own session/process group so we can `killpg` the whole tree
      with the standard SIGINT → SIGTERM → SIGKILL escalation.
    - Lifecycle methods are thread-safe enough for the FastAPI request thread + the stdout
      reader thread to share the object.
    """

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
    """Resolve the launcher manifest: optional JSON file overrides the built-in default."""
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
    """Pose on XY plane: rotation about Z only → geometry_msgs xyzw."""
    half = yaw * 0.5
    return 0.0, 0.0, math.sin(half), math.cos(half)


def euler_yaw_from_quaternion(x: float, y: float, z: float, w: float) -> float:
    """Yaw from quaternion (xyzw), robust when roll/pitch are small (mobile base)."""
    sinr_cosp = 2.0 * (w * x + y * z)
    cosr_cosp = 1.0 - 2.0 * (x * x + y * y)
    _roll = math.atan2(sinr_cosp, cosr_cosp)
    sinp = 2.0 * (w * y - z * x)
    _pitch = math.asin(max(-1.0, min(1.0, sinp)))
    siny_cosp = 2.0 * (w * z + x * y)
    cosy_cosp = 1.0 - 2.0 * (y * y + z * z)
    yaw = math.atan2(siny_cosp, cosy_cosp)
    return float(yaw)


def quaternion_matrix_xyzw(qx: float, qy: float, qz: float, qw: float) -> np.ndarray:
    """4×4 homogeneous rotation matrix from unit quaternion (x,y,z,w).

    Ported from `tf_transformations.quaternion_matrix` (which uses (x,y,z,w) order):
    indices into the outer-product matrix are 0=x, 1=y, 2=z, 3=w.
    """
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
        self.kind = kind  # "json" or "binary"
        self.queue: asyncio.Queue = asyncio.Queue(maxsize=max(1, queue_size))
        self.writer_task: Optional[asyncio.Task] = None
        self.dropped: int = 0

    def offer(self, item) -> None:
        """Called from event loop thread (via call_soon_threadsafe). Drops oldest on overflow."""
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
    # Mutated only inside event loop thread (under STATE.lock for cross-thread reads)
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


@asynccontextmanager
async def _lifespan(app: FastAPI):
    global VIDEO_STREAMER
    STATE.loop = asyncio.get_running_loop()
    _try_mount_ui()

    # Start video streamer if enabled (reads params from ROS node)
    if ROS_NODE is not None:
        try:
            vid_enabled = _param_bool(ROS_NODE.get_parameter("video_enabled").value, True)
            if vid_enabled:
                rtsp_url = str(ROS_NODE.get_parameter("rtsp_url").value or "")
                quality   = int(ROS_NODE.get_parameter("video_quality").value)
                fps_limit = float(ROS_NODE.get_parameter("video_fps_limit").value)
                if rtsp_url:
                    VIDEO_STREAMER = VideoStreamer(rtsp_url, quality=quality, fps_limit=fps_limit)
                    VIDEO_STREAMER.start()
                    if _HAS_CV2:
                        ROS_NODE.get_logger().info(f"Video streamer: {rtsp_url} @ {fps_limit} fps Q{quality}")
                    else:
                        ROS_NODE.get_logger().warning(
                            "video_enabled=true but opencv-python-headless not installed — "
                            "install with: pip install opencv-python-headless"
                        )
        except Exception as exc:
            if ROS_NODE is not None:
                ROS_NODE.get_logger().warning(f"Video streamer init failed: {exc}")

    try:
        yield
    finally:
        if VIDEO_STREAMER is not None:
            VIDEO_STREAMER.stop()
        # Drain & close all WS writer tasks so uvicorn shuts down quickly
        await _close_all_ws_clients()
        # Stop any launched processes so we don't leave Nav2 / launches orphaned
        if ROS_NODE is not None:
            for proc in list(getattr(ROS_NODE, "processes", {}).values()):
                if proc.is_running():
                    try:
                        await asyncio.get_running_loop().run_in_executor(None, proc.stop)
                    except Exception:
                        pass


app = FastAPI(title="B2 Web RViz Gateway", version="0.3.0", lifespan=_lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,  # cannot combine wildcard origins with credentials per CORS spec
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
    """Raised by pointcloud2_to_xyz_array when x/y/z is not FLOAT32 or FLOAT64."""

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
    """Decode `sensor_msgs/PointCloud2` into Nx3 float32 xyz with optional range/z mask + stride subsample."""
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
    fmts = []
    offsets = []
    for name in ("x", "y", "z"):
        f = field_map[name]
        fmts.append(endian + _POINTFIELD_FORMAT[f.datatype])
        offsets.append(f.offset)
    dtype = np.dtype(
        {
            "names": ["x", "y", "z"],
            "formats": fmts,
            "offsets": offsets,
            "itemsize": step,
        }
    )
    structured = np.frombuffer(msg.data, dtype=dtype, count=total)

    # Coarse stride before mask to keep peak memory bounded
    if max_points > 0 and total > max_points * 4:
        stride = max(1, total // (max_points * 4))
        structured = structured[::stride]

    arr = np.empty((structured.shape[0], 3), dtype=np.float32)
    arr[:, 0] = structured["x"]
    arr[:, 1] = structured["y"]
    arr[:, 2] = structured["z"]

    mask = np.isfinite(arr).all(axis=1)
    if range_limit > 0:
        # sqrt-free: compare squared distance to avoid sqrt() on every point
        mask &= (arr[:, 0] ** 2 + arr[:, 1] ** 2) <= (range_limit * range_limit)
    mask &= (arr[:, 2] >= z_min) & (arr[:, 2] <= z_max)
    arr = arr[mask]

    if max_points > 0 and arr.shape[0] > max_points:
        stride = arr.shape[0] // max_points
        if stride > 1:
            arr = arr[::stride][:max_points]
        else:
            arr = arr[:max_points]
    return arr.astype(np.float32, copy=False)


def transform_xyz_points(points: np.ndarray, tf_msg) -> np.ndarray:
    """Apply geometry_msgs/Transform from cloud frame into target frame (TF semantics)."""
    q = tf_msg.transform.rotation
    t = tf_msg.transform.translation
    mat = quaternion_matrix_xyzw(q.x, q.y, q.z, q.w)
    mat[0, 3] = t.x
    mat[1, 3] = t.y
    mat[2, 3] = t.z
    n = points.shape[0]
    if n == 0:
        return points
    # Float32 rotation+translation — avoids (N,4) concatenation and float64 upcast.
    # Point cloud accuracy at float32 is ~1 mm at 100 m; sufficient for a quadruped.
    rot32   = mat[:3, :3].astype(np.float32)
    trans32 = mat[:3, 3].astype(np.float32)
    return (points @ rot32.T) + trans32


def _normalize_pkg_relative_path(filepath: str) -> str:
    """Normalize relative path inside a ROS package share tree (URDF package:// or URL path)."""
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
    """Unique (package_name, relative_path) from package:// URIs in URDF/XML text."""
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
    """Copy files referenced as package:// into cache_root/<pkg>/... Returns (copied_ok, skipped)."""
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
    """Load `b2.urdf` installed under share/b2_web_rviz/bundled_ros2_b2_unitree_description/."""
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

        # Nav2 publishes /plan with default reliable+volatile depth=1; subscriber matches that.
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
        self.get_logger().info(f"Nav2 plan topic: {self.plan_topic}")
        if self.use_bundled_b2_urdf:
            self.get_logger().info(
                "Robot description: bundled B2 under b2_web_rviz share (no /robot_description subscription)"
            )
        else:
            self.get_logger().info(
                f"robot_description: topic /robot_description + service {self._robot_desc_param_service}"
            )
        if self.cache_urdf_assets:
            self.get_logger().info(f"URDF mesh cache: {self.asset_cache_dir}")

    def sync_robot_description_assets(self, xml: str):
        if not self.cache_urdf_assets or not xml or len(xml) < 50:
            return
        sync_urdf_package_assets_to_cache(
            self.asset_cache_dir,
            xml,
            self.get_logger().warning,
            self.get_logger().info,
        )

    def _on_set_parameters(self, params) -> SetParametersResult:
        """Allow live tweaks to streaming/filter knobs without restarting the node."""
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
                elif p.name == "pointcloud_in_robot_frame":
                    self.pointcloud_in_robot_frame = _param_bool(p.value, False)
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
        return SetParametersResult(successful=True)

    def on_joint_states(self, msg: JointState):
        """Merge positions into shared state for browsers (names must match URDF joints)."""
        if not msg.name or not msg.position:
            return
        with STATE.lock:
            for i, name in enumerate(msg.name):
                if i >= len(msg.position):
                    break
                STATE.joint_positions[name] = float(msg.position[i])

    def on_plan(self, msg: NavPath):
        """Cache Nav2 global plan for the web UI. Throttled + downsampled.

        We keep yaw too so the UI can draw heading arrows along the path if it ever wants.
        Empty paths clear the cached plan immediately so the UI hides the line.
        """
        now = time.time()
        # Always honor empty plan (planner cleared it) without throttling
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
            # Always keep the last pose so the path actually reaches the goal visually
            if poses[-1] is not msg.poses[-1]:
                poses.append(msg.poses[-1])

        points = []
        for ps in poses:
            p = ps.pose.position
            q = ps.pose.orientation
            points.append(
                {
                    "x": float(p.x),
                    "y": float(p.y),
                    "z": float(p.z),
                    "yaw": yaw_from_quaternion(q.x, q.y, q.z, q.w),
                }
            )

        plan = {
            "frame_id": msg.header.frame_id or self.fixed_frame,
            "stamp": float(msg.header.stamp.sec) + float(msg.header.stamp.nanosec) * 1e-9,
            "count": len(points),
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
        """Atomically update URDF text + ETag + bump urdf_version. No-op if unchanged."""
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
                        "streaming raw points (try pointcloud_tf_time:=latest or pointcloud_in_robot_frame:=true)"
                    )

        stamp = float(msg.header.stamp.sec) + float(msg.header.stamp.nanosec) * 1e-9
        header = {
            "type": "pointcloud",
            "version": POINTCLOUD_HEADER_VERSION,
            "frame_id": frame_for_header,
            "stamp": stamp,
            "count": int(arr.shape[0]),
            "encoding": "float32_xyz_le",
            "fixed_frame": self.fixed_frame,
            "base_frame": self.base_frame,
            "in_robot_frame": in_robot_frame,
        }
        hdr_bytes = _json_dumps(header) + b"\n"
        # Use bytearray + memoryview to avoid a second copy of the point data
        payload = bytearray(len(hdr_bytes) + arr.nbytes)
        payload[: len(hdr_bytes)] = hdr_bytes
        payload[len(hdr_bytes) :] = arr.data  # memoryview — zero copy from numpy buffer
        self._broadcast_binary(bytes(payload))

    def publish_pose_to_web(self):
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
    """Bridge an rclpy Future to asyncio without blocking. Polls because rclpy futures don't expose an asyncio binding."""
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


_DASHBOARD_HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>B2 — Local HMI</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#121418;--surface:#1a1d24;--surface-2:#22262e;
  --border:#2f3540;--border-strong:#3d4450;
  --text:#e6e8ec;--text-dim:#8b919c;--text-muted:#6b7280;
  --accent:#2d8f9e;--accent-dim:#246b76;
  --ok:#2d9f5a;--ok-bg:rgba(45,159,90,.12);
  --alarm:#c94a4a;--alarm-bg:rgba(201,74,74,.1);
  --warn:#c9a227;
  --font-ui:'IBM Plex Sans',system-ui,sans-serif;
  --font-mono:'IBM Plex Mono','Consolas',monospace;
}
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
.dot-yellow{background:var(--warn)}
.ip-text{color:var(--text)}
.content{max-width:920px;margin:0 auto;padding:28px 24px 48px}
.section-title{font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.14em;font-weight:600;margin-bottom:10px;font-family:var(--font-mono)}
.proc-card{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--accent);padding:16px 18px;margin-bottom:10px}
.proc-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
.proc-info{display:flex;align-items:flex-start;gap:14px}
.proc-channel{font-family:var(--font-mono);font-size:10px;font-weight:600;color:var(--text-muted);letter-spacing:.08em;min-width:2.2em;padding-top:3px}
.proc-name{font-size:14px;font-weight:600}
.proc-desc{font-size:11px;color:var(--text-dim);margin-top:4px;font-family:var(--font-mono);line-height:1.45;word-break:break-all}
.proc-status{font-family:var(--font-mono);font-size:10px;font-weight:600;letter-spacing:.06em;padding:4px 10px;border:1px solid var(--border);text-transform:uppercase;flex-shrink:0;white-space:nowrap}
.status-running{border-color:var(--ok);color:var(--ok);background:var(--ok-bg)}
.status-stopped{border-color:var(--border-strong);color:var(--text-muted);background:var(--surface-2)}
.status-exited{border-color:var(--alarm);color:var(--alarm);background:var(--alarm-bg)}
.proc-actions{display:flex;gap:6px;margin-top:14px;flex-wrap:wrap}
.btn{padding:7px 16px;border:1px solid var(--border-strong);background:var(--surface-2);color:var(--text);font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font-mono);letter-spacing:.06em;text-transform:uppercase;transition:border-color .12s,background .12s}
.btn:hover:not(:disabled){border-color:var(--text-dim);background:#2a3038}
.btn:disabled{opacity:.35;cursor:not-allowed}
.btn-green{border-color:var(--ok);color:var(--ok)}
.btn-green:hover:not(:disabled){background:var(--ok-bg)}
.btn-red{border-color:var(--alarm);color:var(--alarm)}
.btn-red:hover:not(:disabled){background:var(--alarm-bg)}
.btn-accent{border-color:var(--accent);color:var(--accent)}
.btn-accent:hover:not(:disabled){background:rgba(45,143,158,.12)}
.log-toggle{margin-top:12px;font-size:10px;color:var(--text-muted);cursor:pointer;user-select:none;font-family:var(--font-mono);letter-spacing:.04em;text-transform:uppercase}
.log-toggle:hover{color:var(--text-dim)}
.log-box{margin-top:8px;background:#0d0f12;border:1px solid var(--border);padding:10px 12px;max-height:220px;overflow-y:auto;font-size:11px;color:#a8b0bc;line-height:1.55;display:none;font-family:var(--font-mono);white-space:pre-wrap;word-break:break-word}
.log-box.show{display:block}
.fox-card{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--accent);padding:18px 20px;margin-bottom:14px}
.fox-card-inner{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px}
.fox-card a{display:inline-flex;align-items:center;justify-content:center;padding:10px 22px;border:1px solid var(--accent);background:var(--surface-2);color:var(--accent);text-decoration:none;font-size:11px;font-weight:600;font-family:var(--font-mono);letter-spacing:.08em;text-transform:uppercase;transition:border-color .12s,background .12s,color .12s}
.fox-card a:hover{background:rgba(45,143,158,.15);border-color:var(--accent-dim);color:#7ec8d4}
.fox-desc{font-size:11px;color:var(--text-dim);max-width:420px;line-height:1.5;font-family:var(--font-mono)}
.quick-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.error-banner{background:var(--alarm-bg);border:1px solid var(--alarm);color:#fca5a5;padding:10px 14px;font-family:var(--font-mono);font-size:11px;margin-bottom:14px;display:none}
.error-banner.show{display:block}
.footer{text-align:center;padding:16px;font-size:10px;color:var(--text-muted);border-top:1px solid var(--border);margin-top:32px;font-family:var(--font-mono);letter-spacing:.04em}
@media(max-width:640px){
  .content{padding:20px 14px 40px}
  .proc-header{flex-wrap:wrap}
  .fox-card-inner{flex-direction:column;align-items:stretch}
}
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
    <div class="ip-box" title="Gateway endpoint">
      <div class="dot dot-green" id="gwDot"></div>
      <span class="ip-text" id="gwHost">…</span>
    </div>
  </div>
</header>

<div class="content">

  <div class="section-title">Visualization</div>
  <div class="fox-card">
    <div class="fox-card-inner">
      <a href="/app/" target="_blank" rel="noopener">Open 3D RViz UI →</a>
      <div class="fox-desc">Browser RViz: pose · point cloud · joint-animated URDF · Nav2 plan + waypoints. ใช้พอร์ตเดียวกัน</div>
    </div>
  </div>

  <div class="section-title">Process supervision</div>

  <div class="error-banner" id="errBanner"></div>

  <div id="procList"></div>

  <div class="section-title" style="margin-top:18px">Batch control</div>
  <div class="quick-row">
    <button class="btn btn-green" type="button" onclick="startAll()">Start all</button>
    <button class="btn btn-red"   type="button" onclick="stopAll()">Stop all</button>
    <button class="btn btn-accent" type="button" onclick="refresh()">Refresh</button>
  </div>

</div>

<footer class="footer">
  Gateway · <span id="footerHost"></span> · API <a style="color:#7ec8d4" href="/docs">/docs</a>
</footer>

<script>
const procListEl = document.getElementById('procList');
const errEl      = document.getElementById('errBanner');
const dotEl      = document.getElementById('gwDot');
const gwHostEl   = document.getElementById('gwHost');
const footerHostEl = document.getElementById('footerHost');
gwHostEl.textContent = window.location.host;
footerHostEl.textContent = window.location.host;

const openLogs = new Set();
const logTimers = {};

function fmtAge(ts) {
  if (!ts) return '';
  const sec = Math.max(0, Math.floor(Date.now()/1000 - ts));
  if (sec < 60) return sec + 's';
  if (sec < 3600) return Math.floor(sec/60) + 'm ' + (sec%60) + 's';
  return Math.floor(sec/3600) + 'h ' + Math.floor((sec%3600)/60) + 'm';
}

function setError(msg) {
  if (msg) { errEl.textContent = msg; errEl.classList.add('show'); }
  else { errEl.classList.remove('show'); }
}

function renderProcs(processes) {
  procListEl.innerHTML = '';
  processes.forEach((p, idx) => {
    const channel = 'P' + String(idx + 1).padStart(2, '0');
    const statusCls = p.running ? 'status-running'
                    : (p.exit_code != null && p.exit_code !== 0 ? 'status-exited' : 'status-stopped');
    const statusText = p.running
      ? 'RUNNING · pid ' + p.pid + ' · ' + fmtAge(p.started_at)
      : (p.exit_code != null ? 'EXITED ' + p.exit_code : 'STOPPED');

    const card = document.createElement('div');
    card.className = 'proc-card';
    card.innerHTML = `
      <div class="proc-header">
        <div class="proc-info">
          <span class="proc-channel">${channel}</span>
          <div>
            <div class="proc-name">${p.name}</div>
            <div class="proc-desc">${escapeHtml(p.cmd)}</div>
          </div>
        </div>
        <span class="proc-status ${statusCls}">${statusText}</span>
      </div>
      <div class="proc-actions">
        <button class="btn btn-green" data-action="start" data-name="${p.name}" ${p.running ? 'disabled' : ''}>Start</button>
        <button class="btn btn-red"   data-action="stop"  data-name="${p.name}" ${!p.running ? 'disabled' : ''}>Stop</button>
        <button class="btn"           data-action="toggleLog" data-name="${p.name}">${openLogs.has(p.name) ? 'Hide log' : 'Show log'}</button>
      </div>
      <pre class="log-box ${openLogs.has(p.name) ? 'show' : ''}" id="log_${cssId(p.name)}">${(p.log_tail || []).map(escapeHtml).join('\n') || '— no output —'}</pre>
    `;
    procListEl.appendChild(card);
  });

  procListEl.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const action = btn.dataset.action;
      if (action === 'start' || action === 'stop') call(name, action);
      else if (action === 'toggleLog') toggleLog(name);
    });
  });
}

function cssId(s) { return s.replace(/[^a-zA-Z0-9_-]/g, '_'); }
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

async function refresh() {
  try {
    const res = await fetch('/api/processes?tail=20');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    renderProcs(data.processes || []);
    setError('');
    dotEl.className = 'dot dot-green';
  } catch (e) {
    setError('Cannot reach gateway: ' + e.message);
    dotEl.className = 'dot dot-red';
  }
}

async function call(name, action) {
  try {
    const res = await fetch('/api/processes/' + encodeURIComponent(name) + '/' + action, { method: 'POST' });
    if (!res.ok) {
      let detail = 'HTTP ' + res.status;
      try { const j = await res.json(); if (j?.detail) detail = j.detail; } catch {}
      throw new Error(detail);
    }
    refresh();
  } catch (e) {
    setError(action + ' ' + name + ': ' + e.message);
  }
}

async function startAll() {
  try {
    const data = await (await fetch('/api/processes?tail=0')).json();
    for (const p of (data.processes || [])) {
      if (!p.running) await fetch('/api/processes/' + encodeURIComponent(p.name) + '/start', {method:'POST'});
    }
  } catch (e) { setError('Start all: ' + e.message); }
  refresh();
}
async function stopAll() {
  try {
    const data = await (await fetch('/api/processes?tail=0')).json();
    for (const p of (data.processes || [])) {
      if (p.running) await fetch('/api/processes/' + encodeURIComponent(p.name) + '/stop', {method:'POST'});
    }
  } catch (e) { setError('Stop all: ' + e.message); }
  refresh();
}

async function fetchLog(name) {
  try {
    const res = await fetch('/api/processes/' + encodeURIComponent(name) + '/log?tail=80');
    if (!res.ok) return;
    const data = await res.json();
    const box = document.getElementById('log_' + cssId(name));
    if (!box) return;
    box.textContent = (data.log_tail || []).join('\n') || '— no output —';
    box.scrollTop = box.scrollHeight;
  } catch {}
}

function toggleLog(name) {
  const box = document.getElementById('log_' + cssId(name));
  if (!box) return;
  const show = !box.classList.contains('show');
  box.classList.toggle('show', show);
  if (show) {
    openLogs.add(name);
    fetchLog(name);
    logTimers[name] = setInterval(() => fetchLog(name), 2000);
  } else {
    openLogs.delete(name);
    clearInterval(logTimers[name]);
    delete logTimers[name];
  }
  // Update button label without re-rendering everything
  document.querySelectorAll(`button[data-action="toggleLog"][data-name="${name}"]`).forEach(b => {
    b.textContent = show ? 'Hide log' : 'Show log';
  });
}

refresh();
setInterval(refresh, 3000);
</script>
</body>
</html>"""


@app.get("/", response_class=HTMLResponse)
async def root_dashboard():
    """Server-rendered HMI dashboard. Drives the same /api/processes endpoints
    used by the React SPA at /app/, so users can work entirely from this page
    without any client-side build step.
    """
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
    "pointcloud_topic",
    "fixed_frame",
    "base_frame",
    "max_points",
    "pointcloud_rate_hz",
    "pointcloud_range_limit",
    "pointcloud_z_min",
    "pointcloud_z_max",
    "transform_pointcloud",
    "pointcloud_tf_time",
    "pointcloud_in_robot_frame",
    "status_rate_hz",
    "follow_waypoints_action",
    "joint_states_topic",
    "subscribe_joint_states",
    "use_bundled_b2_urdf",
    "cache_urdf_assets",
    "plan_topic",
    "plan_rate_hz",
    "plan_max_points",
    "plan_stale_seconds",
)


# Parameters we let the UI tweak at runtime. on_set_parameters_callback enforces the actual semantics —
# this map only handles type coercion + the rclpy Parameter.Type tag.
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
    """Coerce a JSON value into the right Python type for a live parameter.

    Raises ValueError with a UI-friendly message; the caller turns this into HTTP 400.
    """
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
            iv = int(raw)
        except (TypeError, ValueError):
            raise ValueError(f"{name} expects an integer, got {raw!r}")
        return iv
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
    """Snapshot of current node parameters that affect the web stream/UI."""
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
    """Tweak live-tunable params from the UI. Whitelisted keys only; values are coerced
    then forwarded through `set_parameters` so the regular on_set_parameters_callback validates them.
    """
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
    """Return URDF text. Use Accept: application/xml or ?format=xml for raw XML; otherwise JSON envelope."""
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
    """Serve meshes etc. for URDFLoader (package:// URLs). Prefer local mirror under asset_cache_dir."""
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
            return FileResponse(
                full_cache,
                media_type=mime or "application/octet-stream",
                headers=_ASSET_CACHE_HEADERS,
            )

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
    return FileResponse(
        full_share,
        media_type=mime or "application/octet-stream",
        headers=_ASSET_CACHE_HEADERS,
    )


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
    """List all launcher-managed processes with a small log preview."""
    if ROS_NODE is None:
        raise HTTPException(status_code=503, detail="ROS node not ready")
    tail = max(0, min(int(tail), 500))
    return {
        "processes": [p.status(log_tail=tail) for p in ROS_NODE.processes.values()],
    }


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


@app.post("/api/navigation/clear")
async def api_clear_waypoints():
    with STATE.lock:
        STATE.waypoints = []
        STATE.latest_plan = None
    return {"ok": True}


@app.get("/api/video_feed")
async def api_video_feed():
    """MJPEG multipart stream from the RTSP camera.

    Clients should set src/img.src to this URL.
    Boundary: mjpeg  (multipart/x-mixed-replace; boundary=mjpeg)
    """
    if VIDEO_STREAMER is None:
        raise HTTPException(status_code=503, detail="Video not enabled (video_enabled:=false or rtsp_url not set)")

    async def _generator():
        fps_limit = VIDEO_STREAMER._min_dt
        while True:
            frame = VIDEO_STREAMER.latest_jpeg()
            yield _MJPEG_PART_HEADER + frame + b"\r\n"
            await asyncio.sleep(fps_limit)

    return StreamingResponse(
        _generator(),
        media_type="multipart/x-mixed-replace; boundary=mjpeg",
    )


@app.get("/api/video_snapshot")
async def api_video_snapshot():
    """Single JPEG frame — for polling or img src fallback."""
    if VIDEO_STREAMER is None:
        raise HTTPException(status_code=503, detail="Video not enabled")
    return Response(content=VIDEO_STREAMER.latest_jpeg(), media_type="image/jpeg")


async def _run_ws_client(ws: WebSocket, kind: str, queue_size: int, clients: List[WSClient]) -> None:
    """Common WS lifecycle: accept, register, run writer task, cleanup on disconnect."""
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
