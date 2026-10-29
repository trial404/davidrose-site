#!/bin/sh
# Preview the site over HTTP instead of opening the files directly.
#
#   ./serve.sh          -> http://localhost:8000  (only this Mac)
#   ./serve.sh lan      -> also reachable from your phone on the same wifi
#
# Ctrl-C to stop.

PORT=8000
MODE="${1:-local}"

cd "$(dirname "$0")" || exit 1

echo "Serving $(pwd)"
echo

if [ "$MODE" = "lan" ]; then
  BIND=0.0.0.0
  IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)
  echo "  This machine:  http://localhost:$PORT"
  if [ -n "$IP" ]; then
    echo "  On your phone: http://$IP:$PORT"
    echo "  (same wifi, and allow it if macOS asks about incoming connections)"
  else
    echo "  Could not detect a wifi IP address."
  fi
else
  BIND=127.0.0.1
  echo "  http://localhost:$PORT"
fi

echo
echo "Press Ctrl-C to stop."
echo

exec python3 -m http.server "$PORT" --bind "$BIND"
