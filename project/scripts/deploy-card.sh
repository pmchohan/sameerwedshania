#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

echo "Building Card site..."
npm --prefix sites/card run build

echo "Deploying Card site to gh-pages branch..."
WORKTREE_DIR="/tmp/card-gh-pages-deploy"
rm -rf "$WORKTREE_DIR"
git worktree add "$WORKTREE_DIR" gh-pages

rsync -av --delete --exclude=".git" sites/card/dist/ "$WORKTREE_DIR/"

cd "$WORKTREE_DIR"
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "deploy: update invitation card build"
  git push origin gh-pages
  echo "Card site deployed successfully to GitHub Pages!"
else
  echo "No changes in Card build to deploy."
fi

cd "$DIR"
git worktree remove "$WORKTREE_DIR" 2>/dev/null || rm -rf "$WORKTREE_DIR"
