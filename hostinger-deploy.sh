#!/usr/bin/env bash
# Hostinger post-pull deploy script.
# Run this from the project root after `git pull` on the VPS (or wire it into
# Hostinger hPanel's "auto-deploy command" field).
set -euo pipefail

echo "==> Installing dependencies"
if command -v bun >/dev/null 2>&1; then
  bun install --frozen-lockfile || bun install
else
  npm ci || npm install
fi

echo "==> Building static public_html/"
if command -v bun >/dev/null 2>&1; then
  bun run build:hostinger
else
  npm run build:hostinger
fi

echo "==> Done. public_html/ is ready for Apache."
ls -la public_html
