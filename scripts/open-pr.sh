#!/usr/bin/env bash
#
# Open a pull request for the changes currently in your working tree.
#
# Usage:
#   scripts/open-pr.sh <branch-name> "<PR title>" ["PR body"]
#   npm run pr -- <branch-name> "<PR title>" ["PR body"]
#
# Flow: branches off the current HEAD (carrying your uncommitted edits),
# commits them, pushes over SSH, then opens a PR with `gh`. If `gh` isn't
# authenticated yet, it prints the GitHub "compare" URL so you can open the
# PR in one click instead.
#
# Recommended: make your edits but DON'T commit them to main — just run this.

set -euo pipefail

REPO="markchrc2025/Global-Ledger-Newsletter"

BRANCH="${1:?Usage: scripts/open-pr.sh <branch-name> \"<title>\" [body]}"
TITLE="${2:?Usage: scripts/open-pr.sh <branch-name> \"<title>\" [body]}"
BODY="${3:-$TITLE}"

# 1. Create the feature branch (uncommitted changes follow you onto it)
git switch -c "$BRANCH"

# 2. Commit any pending changes
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "$TITLE"
else
  echo "Note: no working-tree changes — branching existing commits."
fi

# 3. Push the branch
git push -u origin "$BRANCH"

# 4. Open the PR
if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  gh pr create --repo "$REPO" --base main --head "$BRANCH" \
    --title "$TITLE" --body "$BODY"
else
  echo ""
  echo "→ gh CLI not authenticated yet. Open the PR here:"
  echo "  https://github.com/$REPO/compare/main...$BRANCH?expand=1"
fi
