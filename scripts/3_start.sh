#!/bin/bash
# ─────────────────────────────────────────────────────────────
# รันบนหุ่นทุกครั้งที่ต้องการเปิดระบบ
#
#   ./scripts/3_start.sh
#
# เมื่อรันสำเร็จ เปิดบนคอมได้เลยที่:
#   http://<robot-ip>:8080/app/
#
# Override ตัวแปร:
#   ROS2_WS=/path/to/ws  ROBOT_IP=... ./scripts/3_start.sh
# ─────────────────────────────────────────────────────────────

WS_DIR="${ROS2_WS:-$HOME/b2_web_rviz_ws}"
ROBOT_IP=$(hostname -I | awk '{print $1}')

source /opt/ros/humble/setup.bash
source "$WS_DIR/install/setup.bash"

echo "============================================"
echo "  B2 Web RViz Gateway"
echo "  Open in browser: http://$ROBOT_IP:8080/app/"
echo "============================================"
echo ""

ros2 launch b2_web_rviz b2_web_gateway.launch.py \
  web_port:=8080 \
  "$@"
# ส่ง arg เพิ่มได้เช่น:
# ./scripts/3_start.sh rtsp_url:=rtsp://192.168.123.161:8551/front_video
# ./scripts/3_start.sh video_enabled:=false
