#!/bin/bash
# ปิด b2-dev tmux session + kill port 5173 ถ้าค้างอยู่
SESSION="b2-dev"

tmux kill-session -t "$SESSION" 2>/dev/null && echo "✓ Stopped tmux session: $SESSION" || echo "Session not running"

# kill anything still holding port 5173
PID=$(lsof -ti:5173 2>/dev/null)
if [ -n "$PID" ]; then
  kill "$PID" 2>/dev/null && echo "✓ Freed port 5173 (PID $PID)"
fi

echo "Done."
