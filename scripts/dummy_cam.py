#!/usr/bin/env python3
"""
Dummy MJPEG camera server — ใช้ทดสอบ UI โดยไม่ต้องมีกล้องจริง
  URL:  http://localhost:8082/video
  ใช้กับ backend:  rtsp_url:=http://localhost:8082/video
"""
import http.server
import math
import time

import cv2
import numpy as np

PORT = 8082
FPS  = 15
W, H = 640, 480
TEAL = (182, 208, 0)   # BGR ≈ #00D0B6
DIM  = (80, 80, 80)
BG   = (18, 18, 18)


def make_frame(t: float) -> bytes:
    frame = np.full((H, W, 3), BG, dtype=np.uint8)

    # ── เส้น scanline เคลื่อนที่ ───────────────────────────────
    ly = int((t * 80) % H)
    cv2.line(frame, (0, ly), (W, ly), (30, 60, 30), 1)

    # ── หุ่น B2 แบบง่าย (กล่อง + ขา 4 ข้าง) ───────────────────
    cx, cy = W // 2, H // 2 + 20
    bob = int(8 * math.sin(t * 2.5))

    # ตัวหุ่น
    cv2.rectangle(frame, (cx - 55, cy - 28 + bob), (cx + 55, cy + 28 + bob), TEAL, 2)

    # ขา 4 ข้าง
    leg_sway = int(6 * math.sin(t * 5))
    for lx in (-35, -12, 12, 35):
        top = cy + 28 + bob
        cv2.line(frame, (cx + lx, top), (cx + lx + leg_sway, top + 30), TEAL, 2)
        cv2.circle(frame, (cx + lx + leg_sway, top + 30), 4, TEAL, -1)

    # ── ตัวอักษร ───────────────────────────────────────────────
    ts = time.strftime("%H:%M:%S")
    cv2.putText(frame, f"DUMMY CAM  {ts}", (16, 32),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, TEAL, 2, cv2.LINE_AA)
    cv2.putText(frame, "B2 FRONT CAMERA  [TEST PATTERN]", (16, H - 16),
                cv2.FONT_HERSHEY_SIMPLEX, 0.45, DIM, 1, cv2.LINE_AA)

    # ── encode JPEG ────────────────────────────────────────────
    ok, buf = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
    return bytes(buf) if ok else b''


BOUNDARY = b'---b2frame'

class MJPEGHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path != '/video':
            self.send_response(404)
            self.end_headers()
            return

        self.send_response(200)
        self.send_header('Content-Type', f'multipart/x-mixed-replace; boundary={BOUNDARY.decode()}')
        self.send_header('Cache-Control', 'no-cache')
        self.end_headers()

        start = time.monotonic()
        try:
            while True:
                t    = time.monotonic() - start
                data = make_frame(t)
                self.wfile.write(b'--' + BOUNDARY + b'\r\n')
                self.wfile.write(b'Content-Type: image/jpeg\r\n\r\n')
                self.wfile.write(data)
                self.wfile.write(b'\r\n')
                self.wfile.flush()
                time.sleep(1 / FPS)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def log_message(self, *_):
        pass


if __name__ == '__main__':
    srv = http.server.ThreadingHTTPServer(('0.0.0.0', PORT), MJPEGHandler)
    print(f"  Dummy camera  →  http://localhost:{PORT}/video")
    print(f"  backend arg   →  rtsp_url:=http://localhost:{PORT}/video")
    print()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print('\nStopped.')
