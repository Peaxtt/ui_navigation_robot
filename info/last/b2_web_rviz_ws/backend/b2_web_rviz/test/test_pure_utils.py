"""Unit tests for the pure helper functions inside b2_web_gateway_node.

These functions don't touch ROS — they can run under plain `pytest` without
spinning up an executor. We import the module directly so coverage is honest.
"""

from __future__ import annotations

import importlib.util
import math
import os
import sys
import types
from pathlib import Path

import pytest


def _install_stub_modules() -> None:
    """Provide minimal ROS / FastAPI stand-ins so the gateway module imports without ROS installed.

    Tests in this file only exercise pure helpers; the heavy ROS / web layers are stubbed
    just enough to satisfy ``import b2_web_gateway_node``.
    """

    def _ensure(name: str, **attrs):
        if name in sys.modules:
            return sys.modules[name]
        mod = types.ModuleType(name)
        for k, v in attrs.items():
            setattr(mod, k, v)
        sys.modules[name] = mod
        return mod

    class _Stub:
        def __init__(self, *args, **kwargs):
            pass

        def __call__(self, *args, **kwargs):
            return self

        def __getattr__(self, _):
            return _Stub()

    # rclpy
    rclpy_mod = _ensure("rclpy")
    rclpy_mod.ok = lambda: True
    rclpy_mod.init = lambda *a, **kw: None
    rclpy_mod.shutdown = lambda *a, **kw: None
    rclpy_mod.time = types.SimpleNamespace(Time=_Stub)
    _ensure("rclpy.action", ActionClient=_Stub)
    _ensure("rclpy.duration", Duration=_Stub)
    _ensure("rclpy.executors", MultiThreadedExecutor=_Stub)
    _ensure("rclpy.node", Node=type("Node", (), {"__init__": lambda self, *a, **kw: None}))

    # rclpy.parameter — Parameter.Type enum is read at import time by _LIVE_PARAM_SPEC
    class _ParamType:
        DOUBLE = "DOUBLE"
        INTEGER = "INTEGER"
        BOOL = "BOOL"
        STRING = "STRING"

    class _Parameter:
        Type = _ParamType

        def __init__(self, name, ptype, value):
            self.name = name
            self.type_ = ptype
            self.value = value

    _ensure("rclpy.parameter", Parameter=_Parameter)

    _ensure(
        "rclpy.qos",
        DurabilityPolicy=_Stub(),
        HistoryPolicy=_Stub(),
        QoSProfile=_Stub,
        ReliabilityPolicy=_Stub(),
    )
    _ensure("rclpy.time", Time=_Stub)

    # ament_index_python
    aip = _ensure("ament_index_python")
    aip_packages = _ensure(
        "ament_index_python.packages",
        PackageNotFoundError=type("PackageNotFoundError", (Exception,), {}),
        get_package_share_directory=lambda name: "/tmp/nonexistent_share/" + name,
    )
    aip.packages = aip_packages

    # FastAPI / Starlette
    class _App:
        def __init__(self, *a, **kw):
            self.middlewares = []
            self.routes = []

        def add_middleware(self, *a, **kw):
            pass

        def get(self, *a, **kw):
            return lambda fn: fn

        def post(self, *a, **kw):
            return lambda fn: fn

        def websocket(self, *a, **kw):
            return lambda fn: fn

        def mount(self, *a, **kw):
            pass

    _ensure(
        "fastapi",
        FastAPI=_App,
        HTTPException=type("HTTPException", (Exception,), {"__init__": lambda self, *a, **kw: None}),
        Request=_Stub,
        WebSocket=_Stub,
        WebSocketDisconnect=type("WebSocketDisconnect", (Exception,), {}),
    )
    _ensure("fastapi.middleware.cors", CORSMiddleware=_Stub)
    _ensure(
        "fastapi.responses",
        FileResponse=_Stub,
        HTMLResponse=_Stub,
        PlainTextResponse=_Stub,
        Response=_Stub,
    )
    _ensure("fastapi.staticfiles", StaticFiles=_Stub)

    # ROS messages
    _ensure("geometry_msgs", msg=types.SimpleNamespace())
    _ensure("geometry_msgs.msg", PoseStamped=_Stub)
    _ensure("nav2_msgs", action=types.SimpleNamespace(FollowWaypoints=_Stub))
    _ensure("nav2_msgs.action", FollowWaypoints=_Stub)
    _ensure("rcl_interfaces", msg=types.SimpleNamespace(), srv=types.SimpleNamespace())
    _ensure("rcl_interfaces.msg", SetParametersResult=_Stub)
    _ensure("rcl_interfaces.srv", GetParameters=_Stub)
    _ensure(
        "sensor_msgs.msg",
        JointState=_Stub,
        PointCloud2=_Stub,
        PointField=type("PointField", (), {"FLOAT32": 7, "FLOAT64": 8}),
    )
    _ensure("std_msgs", msg=types.SimpleNamespace(String=_Stub))
    _ensure("std_msgs.msg", String=_Stub)
    _ensure(
        "tf2_ros",
        Buffer=_Stub,
        TransformException=type("TransformException", (Exception,), {}),
        TransformListener=_Stub,
    )
    _ensure(
        "uvicorn",
        Config=_Stub,
        Server=type("Server", (), {"__init__": lambda self, *a, **kw: None, "should_exit": False, "run": lambda self: None}),
    )


_install_stub_modules()

_HERE = Path(__file__).resolve().parent
_MODULE_PATH = _HERE.parent / "b2_web_rviz" / "b2_web_gateway_node.py"
_MODULE_NAME = "b2_web_gateway_node_under_test"
_spec = importlib.util.spec_from_file_location(_MODULE_NAME, _MODULE_PATH)
assert _spec and _spec.loader
gw = importlib.util.module_from_spec(_spec)
# Register before exec so @dataclass can resolve cls.__module__ via sys.modules during decoration.
sys.modules[_MODULE_NAME] = gw
_spec.loader.exec_module(gw)


# -------------------------------- _param_bool --------------------------------


@pytest.mark.parametrize(
    "value,default,expected",
    [
        (None, True, True),
        (None, False, False),
        (True, False, True),
        (False, True, False),
        ("true", False, True),
        ("True", False, True),
        ("YES", False, True),
        ("on", False, True),
        ("1", False, True),
        ("false", True, False),
        ("0", True, False),
        ("no", True, False),
        ("off", True, False),
        ("", True, False),  # empty string -> bool("") is False; not in TRUTHY → False
        (1, False, True),
        (0, True, False),
    ],
)
def test_param_bool(value, default, expected):
    assert gw._param_bool(value, default) is expected


# ---------------------- _normalize_pkg_relative_path -------------------------


@pytest.mark.parametrize(
    "raw,expected",
    [
        ("meshes/foo.dae", "meshes/foo.dae"),
        ("/meshes/foo.dae", "meshes/foo.dae"),  # leading slash stripped
        ("//meshes//foo.dae", "meshes/foo.dae"),  # double slashes collapsed
        ("./meshes/./foo.dae", "meshes/foo.dae"),  # dot segments removed
        ("meshes\\foo.dae", "meshes/foo.dae"),  # backslashes normalized
        ("../etc/passwd", ""),  # parent traversal rejected
        ("meshes/../etc/passwd", ""),  # parent traversal in the middle
        ("", ""),
        ("   ", "   "),  # whitespace-only is stripped of slashes only, not whitespace
    ],
)
def test_normalize_pkg_relative_path(raw, expected):
    assert gw._normalize_pkg_relative_path(raw) == expected


# ---------------------- _extract_package_uri_refs ----------------------------


def test_extract_package_uri_refs_unique_and_normalized():
    xml = """
    <robot>
      <mesh filename="package://desc/meshes/a.dae" />
      <mesh filename="package://desc/meshes/a.dae" />
      <mesh filename="package://desc//meshes/b.dae" />
      <mesh filename="package://other/x.stl" />
      <mesh filename="package://desc/../escaped.dae" />
    </robot>
    """
    refs = gw._extract_package_uri_refs(xml)
    assert ("desc", "meshes/a.dae") in refs
    assert ("desc", "meshes/b.dae") in refs
    assert ("other", "x.stl") in refs
    # Parent-traversal entries are filtered out by normalization
    assert all(rel and ".." not in rel for _, rel in refs)
    # Duplicates removed
    assert refs.count(("desc", "meshes/a.dae")) == 1


def test_extract_package_uri_refs_empty_input():
    assert gw._extract_package_uri_refs("") == []
    assert gw._extract_package_uri_refs("<robot/>") == []


# ----------------------- quaternion <-> yaw round-trip -----------------------


@pytest.mark.parametrize("yaw", [-math.pi + 1e-3, -1.2, -0.4, 0.0, 0.7, 1.2, math.pi - 1e-3])
def test_quaternion_yaw_roundtrip(yaw):
    qx, qy, qz, qw = gw.quaternion_from_yaw(yaw)
    recovered = gw.euler_yaw_from_quaternion(qx, qy, qz, qw)
    assert recovered == pytest.approx(yaw, abs=1e-9)


def test_quaternion_from_yaw_unit_norm():
    for yaw in (-1.0, 0.0, 1.0, 2.5):
        qx, qy, qz, qw = gw.quaternion_from_yaw(yaw)
        assert (qx * qx + qy * qy + qz * qz + qw * qw) == pytest.approx(1.0, abs=1e-12)


# -------------------- quaternion_matrix_xyzw sanity --------------------------


def test_quaternion_matrix_xyzw_identity():
    mat = gw.quaternion_matrix_xyzw(0.0, 0.0, 0.0, 1.0)
    assert mat.shape == (4, 4)
    # Identity quaternion should give identity rotation
    for i in range(3):
        for j in range(3):
            expected = 1.0 if i == j else 0.0
            assert mat[i, j] == pytest.approx(expected, abs=1e-12)


def test_quaternion_matrix_xyzw_zero_norm_returns_identity():
    """Degenerate quaternion (all zeros) shouldn't blow up — return identity instead."""
    mat = gw.quaternion_matrix_xyzw(0.0, 0.0, 0.0, 0.0)
    for i in range(4):
        for j in range(4):
            expected = 1.0 if i == j else 0.0
            assert mat[i, j] == pytest.approx(expected, abs=1e-12)


def test_quaternion_matrix_xyzw_yaw_only():
    """Pure-Z rotation by 90° should map +X -> +Y, +Y -> -X."""
    yaw = math.pi / 2.0
    qx, qy, qz, qw = gw.quaternion_from_yaw(yaw)
    mat = gw.quaternion_matrix_xyzw(qx, qy, qz, qw)
    # Apply to +X
    assert mat[0, 0] == pytest.approx(0.0, abs=1e-12)
    assert mat[1, 0] == pytest.approx(1.0, abs=1e-12)
    assert mat[2, 0] == pytest.approx(0.0, abs=1e-12)
    # Apply to +Y
    assert mat[0, 1] == pytest.approx(-1.0, abs=1e-12)
    assert mat[1, 1] == pytest.approx(0.0, abs=1e-12)
    assert mat[2, 1] == pytest.approx(0.0, abs=1e-12)
    # +Z should stay +Z under yaw rotation
    assert mat[2, 2] == pytest.approx(1.0, abs=1e-12)


def test_quaternion_matrix_xyzw_roll_only():
    """Pure-X rotation by 90° should map +Y -> +Z, +Z -> -Y."""
    half = math.pi / 4.0  # roll 90°/2
    s, c = math.sin(half), math.cos(half)
    mat = gw.quaternion_matrix_xyzw(s, 0.0, 0.0, c)  # roll quaternion
    # +Y -> +Z
    assert mat[0, 1] == pytest.approx(0.0, abs=1e-12)
    assert mat[1, 1] == pytest.approx(0.0, abs=1e-12)
    assert mat[2, 1] == pytest.approx(1.0, abs=1e-12)
    # +Z -> -Y
    assert mat[0, 2] == pytest.approx(0.0, abs=1e-12)
    assert mat[1, 2] == pytest.approx(-1.0, abs=1e-12)
    assert mat[2, 2] == pytest.approx(0.0, abs=1e-12)


# ----------------------------- bundled URI rewrite ---------------------------


def test_bundled_uri_constants_match():
    """The redirect target must point inside b2_web_rviz so /api/pkg/b2_web_rviz/... works."""
    assert gw._BUNDLED_REDIRECT_URI.startswith("package://b2_web_rviz/")
    assert gw._BUNDLED_ORIG_PKG_URI.startswith("package://ros2_b2_unitree_description/")


# --------------------- _coerce_param_value (POST /api/config) ----------------


@pytest.mark.parametrize(
    "name,raw,expected",
    [
        ("pointcloud_rate_hz", 5, 5.0),
        ("pointcloud_rate_hz", "2.5", 2.5),
        ("pointcloud_range_limit", 40, 40.0),
        ("max_points", "60000", 60000),
        ("max_points", 12345.0, 12345),
        ("transform_pointcloud", True, True),
        ("transform_pointcloud", "false", False),
        ("transform_pointcloud", 1, True),
        ("pointcloud_in_robot_frame", "yes", True),
        ("pointcloud_in_robot_frame", "off", False),
        ("pointcloud_tf_time", "latest", "latest"),
        ("pointcloud_tf_time", 0, "0"),  # forwarded as-is, callback will reject if invalid
    ],
)
def test_coerce_param_value_ok(name, raw, expected):
    out = gw._coerce_param_value(name, raw)
    assert out == expected
    assert type(out) is type(expected)


@pytest.mark.parametrize(
    "name,raw",
    [
        ("not_a_param", 1),                       # non-whitelisted
        ("max_points", "not-a-number"),
        ("pointcloud_rate_hz", "abc"),
        ("transform_pointcloud", "maybe"),        # undefined boolean string
        ("transform_pointcloud", object()),       # non-coercible type
    ],
)
def test_coerce_param_value_rejects(name, raw):
    with pytest.raises(ValueError):
        gw._coerce_param_value(name, raw)


def test_live_param_spec_keys_subset_of_live_params():
    """Every editable knob must also appear in _LIVE_PARAMS so /api/config includes it."""
    assert set(gw._LIVE_PARAM_SPEC.keys()).issubset(set(gw._LIVE_PARAMS))
