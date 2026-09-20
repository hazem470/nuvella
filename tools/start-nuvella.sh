#!/usr/bin/env bash
# ============================================================
#  Nuvella — one-command start (Git Bash / WSL / macOS / Linux)
#
#    bash tools/start-nuvella.sh
#
#  Starts the dev server and a public Cloudflare tunnel, prints
#  the public link, and keeps both running until you press Ctrl+C.
# ============================================================
set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$(pwd)"
PORT=5173

echo
echo "============================================"
echo "  NUVELLA — starting the site"
echo "============================================"
echo

command -v node >/dev/null 2>&1 || { echo "[ERROR] Node.js not found. Install from https://nodejs.org"; exit 1; }

if [ ! -d node_modules ]; then
  echo "First run — installing dependencies (about 40 seconds)..."
  npm install --no-audit --no-fund
  echo
fi

CLOUDFLARED="tools/cloudflared.exe"
[ -f "$CLOUDFLARED" ] || CLOUDFLARED="tools/cloudflared"

if [ ! -f "$CLOUDFLARED" ]; then
  echo "Downloading cloudflared (one time)..."
  mkdir -p tools
  case "$(uname -s)" in
    MINGW*|MSYS*|CYGWIN*) curl -sL -o tools/cloudflared.exe \
      https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe
      CLOUDFLARED="tools/cloudflared.exe" ;;
    Darwin) curl -sL -o tools/cloudflared \
      https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz | tar xz -C tools 2>/dev/null || true
      CLOUDFLARED="tools/cloudflared" ;;
    *) curl -sL -o tools/cloudflared \
      https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
      CLOUDFLARED="tools/cloudflared" ;;
  esac
  chmod +x "$CLOUDFLARED" 2>/dev/null || true
fi

# --- dev server in the background -------------------------------------------
npx vite --port "$PORT" --strictPort --host > /tmp/nuvella-server.log 2>&1 &
SERVER_PID=$!
trap 'echo; echo "Shutting down..."; kill $SERVER_PID 2>/dev/null || true; kill $TUNNEL_PID 2>/dev/null || true; exit 0' INT TERM

echo "Waiting for the server..."
for i in $(seq 1 30); do
  if curl -s -o /dev/null "http://localhost:$PORT/"; then break; fi
  sleep 1
done
echo "  Local site:  http://localhost:$PORT"
echo
echo "Starting the public tunnel (about 20 seconds)..."
echo

# --- tunnel in the foreground so its log is visible --------------------------
"$CLOUDFLARED" tunnel --url "http://localhost:$PORT" --no-autoupdate > /tmp/nuvella-tunnel.log 2>&1 &
TUNNEL_PID=$!

for i in $(seq 1 40); do
  URL=$(grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' /tmp/nuvella-tunnel.log 2>/dev/null | head -1 || true)
  if [ -n "$URL" ]; then break; fi
  sleep 1
done

echo "============================================"
if [ -n "${URL:-}" ]; then
  echo "  PUBLIC LINK — send this to anyone:"
  echo
  echo "    $URL"
  echo
  echo "  Verified:  $(curl -s -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0' --max-time 30 "$URL/" || echo '?') (200 = working)"
else
  echo "  Could not read the tunnel URL. Check /tmp/nuvella-tunnel.log"
fi
echo "============================================"
echo
echo "  Keep this window open. Press Ctrl+C to stop everything."
echo

wait $TUNNEL_PID
