#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ADMIN_REPO_DIR="$(cd "$DIR/../../swh-admin" && pwd)"

if [ ! -d "$ADMIN_REPO_DIR" ]; then
  echo "Error: swh-admin repository not found at $ADMIN_REPO_DIR"
  exit 1
fi

echo "Building Admin site..."
npm --prefix "$DIR/sites/admin" run build

echo "Syncing Admin build to $ADMIN_REPO_DIR..."
cp "$DIR/sites/admin/dist/index.html" "$DIR/sites/admin/dist/404.html"
touch "$DIR/sites/admin/dist/.nojekyll"
rsync -av --delete --exclude=".git" "$DIR/sites/admin/dist/" "$ADMIN_REPO_DIR/"

cd "$ADMIN_REPO_DIR"
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "deploy: update admin dashboard build"
  git push origin main
  git push origin main:gh-pages 2>/dev/null || true
  echo "Admin site deployed successfully to swh-admin repository!"
else
  echo "No changes in Admin build to deploy."
fi
