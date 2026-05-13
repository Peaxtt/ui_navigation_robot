#!/bin/bash
# ══════════════════════════════════════════════════════════════════
#  B2 Web RViz — Chrome launcher (stable WebGL)
#
#  ใช้ SwiftShader (software renderer ในตัว Chrome) แทน GPU process
#  ทำให้ไม่มีปัญหา "WebGL context lost" จาก GPU crash
#
#  Usage:
#    ./scripts/launch-browser.sh          → dev  http://localhost:5173
#    ./scripts/launch-browser.sh prod     → prod http://localhost:8080/app/
# ══════════════════════════════════════════════════════════════════

MODE="${1:-dev}"

if [ "$MODE" = "prod" ]; then
  URL="http://localhost:8080/app/"
else
  URL="http://localhost:5173"
fi

# Chrome flags:
#   --use-gl=swiftshader              → software WebGL, ไม่ขึ้นกับ GPU จริง
#   --ignore-gpu-blocklist            → ไม่สน blocklist
#   --disable-gpu-process-crash-limit → ไม่จำกัดจำนวนครั้งที่ GPU process restart
#   --disable-background-timer-throttling → ไม่ลด framerate ตอน tab background
CHROME_FLAGS=(
  --use-gl=swiftshader
  --ignore-gpu-blocklist
  --disable-gpu-process-crash-limit
  --disable-background-timer-throttling
  --disable-backgrounding-occluded-windows
)

# หา Chrome binary
for BIN in google-chrome google-chrome-stable chromium chromium-browser; do
  if command -v "$BIN" &>/dev/null; then
    CHROME="$BIN"
    break
  fi
done

if [ -z "$CHROME" ]; then
  echo "ERROR: ไม่พบ Chrome/Chromium ในระบบ"
  echo "  ติดตั้งด้วย: sudo apt install chromium-browser"
  exit 1
fi

echo "  Opening $URL"
echo "  Browser: $CHROME"
echo "  Flags: ${CHROME_FLAGS[*]}"
echo ""

exec "$CHROME" "${CHROME_FLAGS[@]}" "$URL" &>/dev/null &
