#!/bin/bash
# ─────────────────────────────────────────────────────────────
# รันบน PC ครั้งเดียว (หรือทุกครั้งที่แก้ frontend)
#
#   ./scripts/1_build_frontend.sh
#   ./scripts/1_build_frontend.sh 192.168.123.1   ← กำหนด robot IP
#
# สิ่งที่ทำ:
#   1. npm install + npm run build
#   2. scp dist/ ไปไว้บนหุ่นที่ ~/b2_web_rviz_ws/src/b2_web_rviz/www/
# ─────────────────────────────────────────────────────────────
set -e

ROBOT_IP="${1:-192.168.123.1}"
ROBOT_USER="${ROBOT_USER:-unitree}"
ROBOT_WWW="${ROBOT_WWW:-~/b2_web_rviz_ws/src/b2_web_rviz/www}"

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

echo "==> Building frontend..."
cd "$FRONTEND_DIR"
npm install --silent
npm run build

echo "==> Copying dist/ to $ROBOT_USER@$ROBOT_IP:$ROBOT_WWW ..."
ssh "$ROBOT_USER@$ROBOT_IP" "mkdir -p $ROBOT_WWW"
scp -r dist/* "$ROBOT_USER@$ROBOT_IP:$ROBOT_WWW/"

echo ""
echo "Done! Now run on robot:"
echo "  ./scripts/2_setup_robot.sh   (first time only)"
echo "  ./scripts/3_start.sh         (every run)"
