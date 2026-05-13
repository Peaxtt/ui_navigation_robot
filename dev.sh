#!/bin/bash
# ══════════════════════════════════════════════════════════════════
#  B2 Web RViz — Dev / Test launcher
#
#  ./dev.sh              →  4-pane: frontend + backend + rosbag + dummy MJPEG cam
#  ./dev.sh rtsp         →  same, but dummy cam uses GStreamer RTSP instead of MJPEG
#  ./dev.sh front        →  frontend + dummy cam only (no ROS2 required)
#  ./dev.sh stop         →  ปิด session ทั้งหมด
#
#  Browser (dev):    http://localhost:5173
#  Browser (prod):   http://localhost:8080/app/
# ══════════════════════════════════════════════════════════════════

SESSION="b2-dev"
ROOT="$(cd "$(dirname "$0")" && pwd)"
WS_DIR="${ROS2_WS:-$HOME/b2_web_rviz_ws}"
ROSBAG="$ROOT/info/rosbag2_2026_05_09-20_55_21"
MODE="${1:-full}"

# Camera URL used by the backend pane
# MJPEG mode  → http://localhost:8082/video   (default, plain OpenCV)
# RTSP mode   → rtsp://localhost:8554/front_video  (GStreamer)
if [ "$MODE" = "rtsp" ]; then
  CAM_URL="rtsp://localhost:8554/front_video"
  CAM_CMD="python3 '$ROOT/scripts/dummy_rtsp.py'"
else
  CAM_URL="http://localhost:8082/video"
  CAM_CMD="python3 '$ROOT/scripts/dummy_cam.py'"
fi

# ── stop ──────────────────────────────────────────────────────────
if [ "$MODE" = "stop" ]; then
  tmux kill-session -t "$SESSION" 2>/dev/null && echo "✓ Stopped $SESSION" || echo "Not running"
  exit 0
fi

# kill existing
tmux kill-session -t "$SESSION" 2>/dev/null

# ── front only (ไม่ต้องการ ROS2) ─────────────────────────────────
if [ "$MODE" = "front" ]; then
  tmux new-session -d -s "$SESSION" -x 210 -y 50
  tmux rename-window -t "$SESSION:0" "b2-front"
  tmux split-window -h -t "$SESSION:0.0" -p 35

  tmux send-keys -t "$SESSION:0.0" "cd '$ROOT/frontend' && npm run dev" Enter
  tmux send-keys -t "$SESSION:0.1" "$CAM_CMD" Enter

  tmux select-pane -t "$SESSION:0.0"
  echo ""
  echo "  Frontend : http://localhost:5173"
  echo "  Dummy cam: http://localhost:8082/video"
  echo "  ไม่มี backend/ROS2 — ตั้ง Gateway URL เป็น http://localhost:8080 ไว้ก่อน"
  echo ""
  tmux attach-session -t "$SESSION"
  exit 0
fi

# ══════════════════════════════════════════════════════════════════
#  Auto-build ROS2 workspace ถ้ายังไม่ได้ build
# ══════════════════════════════════════════════════════════════════
if [ ! -f "$WS_DIR/install/setup.bash" ]; then
  echo "══════════════════════════════════════════════"
  echo "  ROS2 workspace ยังไม่มี → กำลัง build..."
  echo "  Workspace: $WS_DIR"
  echo "══════════════════════════════════════════════"

  set -e
  source /opt/ros/humble/setup.bash

  mkdir -p "$WS_DIR/src"

  # Symlink package เข้า workspace
  if [ ! -e "$WS_DIR/src/b2_web_rviz" ]; then
    ln -s "$ROOT/backend/b2_web_rviz" "$WS_DIR/src/b2_web_rviz"
    echo "  ✓ Linked $ROOT/backend/b2_web_rviz → $WS_DIR/src/b2_web_rviz"
  fi

  cd "$WS_DIR"
  colcon build --symlink-install --packages-select b2_web_rviz
  echo ""
  echo "  ✓ Build สำเร็จ"
  echo "══════════════════════════════════════════════"
  set +e
  cd "$ROOT"
fi

# ══════════════════════════════════════════════════════════════════
#  FULL 4-pane layout:
#
#   ┌─────────────────────┬─────────────────────┐
#   │  0  frontend        │  1  backend (ROS2)  │
#   │     Vite :5173      │     gateway :8080   │
#   ├─────────────────────┼─────────────────────┤
#   │  2  rosbag          │  3  dummy cam       │
#   │     ros2 bag play   │     MJPEG :8082     │
#   └─────────────────────┴─────────────────────┘
# ══════════════════════════════════════════════════════════════════

tmux new-session -d -s "$SESSION" -x 220 -y 55
tmux rename-window -t "$SESSION:0" "b2"

# สร้าง 4 pane: แบ่งแนวนอน (บน/ล่าง) แล้วแต่ละแถวแบ่งแนวตั้ง
tmux split-window -v -t "$SESSION:0.0" -p 40          # บน 60%, ล่าง 40%
tmux split-window -h -t "$SESSION:0.0" -p 50          # บนซ้าย / บนขวา
tmux split-window -h -t "$SESSION:0.2" -p 50          # ล่างซ้าย / ล่างขวา

# ── Pane 0 (บนซ้าย): frontend ─────────────────────────────────────
tmux send-keys -t "$SESSION:0.0" \
  "cd '$ROOT/frontend' && npm run dev" Enter

# ── Pane 1 (บนขวา): backend ROS2 gateway ──────────────────────────
tmux send-keys -t "$SESSION:0.1" "
source /opt/ros/humble/setup.bash && \
source '$WS_DIR/install/setup.bash' && \
ros2 launch b2_web_rviz b2_web_gateway.launch.py \
  web_port:=8080 \
  rtsp_url:=$CAM_URL \
  video_enabled:=true \
  use_bundled_b2_urdf:=true
" Enter

# ── Pane 2 (ล่างซ้าย): rosbag playback ────────────────────────────
tmux send-keys -t "$SESSION:0.2" "
source /opt/ros/humble/setup.bash && \
source '$WS_DIR/install/setup.bash' && \
echo '▶  Playing rosbag (loop)...' && \
ros2 bag play '$ROSBAG' --loop --clock
" Enter

# ── Pane 3 (ล่างขวา): dummy camera (MJPEG หรือ RTSP) ──────────────
tmux send-keys -t "$SESSION:0.3" "$CAM_CMD" Enter

# โฟกัสที่ frontend
tmux select-pane -t "$SESSION:0.0"

echo ""
echo "  Session : $SESSION"
echo "  Frontend: http://localhost:5173"
echo "  Backend : http://localhost:8080/app/"
echo "  Cam URL : $CAM_URL"
echo ""
echo "  สลับ pane : Ctrl+B แล้วกดลูกศร"
echo "  ปิดทั้งหมด: ./dev.sh stop"
echo ""

tmux attach-session -t "$SESSION"
