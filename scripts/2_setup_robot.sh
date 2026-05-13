#!/bin/bash
# ─────────────────────────────────────────────────────────────
# รันบนหุ่น ครั้งแรกครั้งเดียว (หรือหลัง build_frontend ใหม่)
#
#   ./scripts/2_setup_robot.sh
#
# สิ่งที่ทำ:
#   1. colcon build package b2_web_rviz
#   2. source workspace
# ─────────────────────────────────────────────────────────────
set -e

WS_DIR="${ROS2_WS:-$HOME/b2_web_rviz_ws}"

echo "==> Sourcing ROS 2 Humble..."
source /opt/ros/humble/setup.bash

echo "==> Building b2_web_rviz package..."
cd "$WS_DIR"
colcon build --packages-select b2_web_rviz --symlink-install

echo ""
echo "Done! Run the gateway with:"
echo "  ./scripts/3_start.sh"
