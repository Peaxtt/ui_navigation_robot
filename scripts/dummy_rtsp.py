#!/usr/bin/env python3
"""Dummy RTSP server — test pattern served over rtsp://localhost:8554/front_video

Requires (Ubuntu):
  sudo apt install python3-gi gir1.2-gst-rtsp-server-1.0 \
       gstreamer1.0-plugins-good gstreamer1.0-plugins-bad \
       gstreamer1.0-libav gstreamer1.0-tools

Usage:
  python3 scripts/dummy_rtsp.py
  # then point backend at:  rtsp_url:=rtsp://localhost:8554/front_video

The pipeline uses videotestsrc (ball pattern) → x264enc → RTP H.264.
OpenCV on the backend opens it with the GStreamer uridecodebin pipeline.
"""

import sys

try:
    import gi
    gi.require_version("Gst", "1.0")
    gi.require_version("GstRtspServer", "1.0")
    from gi.repository import Gst, GstRtspServer, GLib
except (ImportError, ValueError) as exc:
    sys.exit(
        f"ERROR: GStreamer Python bindings not found — {exc}\n"
        "Install with:\n"
        "  sudo apt install python3-gi gir1.2-gst-rtsp-server-1.0 \\\n"
        "       gstreamer1.0-plugins-good gstreamer1.0-plugins-bad \\\n"
        "       gstreamer1.0-libav gstreamer1.0-tools\n"
    )

PORT    = "8554"
PATH    = "/front_video"
W, H    = 640, 480
FPS     = 15
BITRATE = 512   # kbps

LAUNCH = (
    f"( videotestsrc pattern=ball is-live=true ! "
    f"video/x-raw,width={W},height={H},framerate={FPS}/1 ! "
    f"videoconvert ! "
    f"x264enc tune=zerolatency bitrate={BITRATE} key-int-max={FPS} ! "
    f"rtph264pay name=pay0 pt=96 config-interval=1 )"
)


def main() -> None:
    Gst.init(None)

    server  = GstRtspServer.RTSPServer()
    server.set_service(PORT)

    factory = GstRtspServer.RTSPMediaFactory()
    factory.set_launch(LAUNCH)
    factory.set_shared(True)

    mounts = server.get_mount_points()
    mounts.add_factory(PATH, factory)

    server.attach(None)

    url = f"rtsp://localhost:{PORT}{PATH}"
    print(f"  Dummy RTSP   →  {url}")
    print(f"  Pattern      :  ball  {W}×{H} @ {FPS} fps  {BITRATE} kbps H.264")
    print()
    print(f"  backend arg  →  rtsp_url:={url}")
    print()
    print("  Press Ctrl+C to stop.")

    try:
        GLib.MainLoop().run()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
