#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

# Ensure port is 3002
export PORT=3002

echo "Starting Wedding NestJS app on port ${PORT}..."
node dist/main.js &
NODE_PID=$!

echo "Starting Cloudflare Tunnel for http://localhost:${PORT}..."
rm -f /tmp/wedding-cloudflared.log
rm -f "$DIR/tunnel-url.txt"

cloudflared tunnel --url "http://localhost:${PORT}" --no-autoupdate > /tmp/wedding-cloudflared.log 2>&1 &
CF_PID=$!

cleanup() {
  echo "Shutting down Wedding NestJS and Cloudflare tunnel..."
  kill -TERM "$NODE_PID" 2>/dev/null || true
  kill -TERM "$CF_PID" 2>/dev/null || true
  wait "$NODE_PID" 2>/dev/null || true
  wait "$CF_PID" 2>/dev/null || true
}
trap cleanup SIGTERM SIGINT EXIT

# Poll for the generated trycloudflare.com URL
FOUND=0
for i in {1..30}; do
  if [ -f /tmp/wedding-cloudflared.log ]; then
    URL=$(grep -o 'https://[a-zA-Z0-9.-]*\.trycloudflare\.com' /tmp/wedding-cloudflared.log 2>/dev/null | head -n 1 || true)
    if [ -n "$URL" ]; then
      echo "$URL" > "$DIR/tunnel-url.txt"
      echo "=================================================="
      echo "  Wedding API Cloudflare Tunnel Live at:"
      echo "  $URL"
      echo "  API Root: $URL/api"
      echo "  (Saved to $DIR/tunnel-url.txt)"
      echo "=================================================="
      FOUND=1
      break
    fi
  fi
  sleep 1
done

if [ "$FOUND" -eq 0 ]; then
  echo "Warning: Tunnel URL not found within 30 seconds. Check /tmp/wedding-cloudflared.log"
fi

# Keep running as long as the node process is alive
wait "$NODE_PID"
