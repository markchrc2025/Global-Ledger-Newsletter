# Contributing — The Global Ledger

How changes flow into the live site. Every change goes through a **pull request**;
nothing is pushed straight to `main` (except one-off emergency hotfixes).

## The loop

```
edit  →  PR  →  CI runs (build)  →  review  →  merge to main  →  Vercel auto-deploys
```

1. **Make your edits** on the local working tree. Don't commit to `main`.
2. **Open a PR** in one command:
   ```bash
   npm run pr -- my-branch-name "Short imperative title"
   # e.g.
   npm run pr -- issue-singapore "Add weekly issue: Singapore territorial tax"
   ```
   This branches off `main`, commits your changes, pushes over SSH, and opens
   the PR via the GitHub CLI.
3. **CI runs automatically** (`.github/workflows/ci.yml`): a clean `npm ci` +
   `npm run build` on **Linux + Node 22** — the same shape as Vercel. This
   catches build breaks (including case-sensitive import bugs that pass on macOS)
   *before* they hit a deploy.
4. **Merge** once CI is green. Vercel deploys `main` automatically on merge.

## Preview deploys

Because the repo is connected to Vercel, **every PR gets its own preview URL**
automatically — a full deploy of that branch you can click through before merging.
Production only updates when the PR merges to `main`.

## One-time setup

The GitHub CLI must be authenticated once so PRs can be opened automatically:

```bash
gh auth login
# Choose: GitHub.com → SSH → Login with a web browser
```

Until that's done, `npm run pr` still pushes the branch and prints a one-click
"compare" link to open the PR manually.

## Emergency hotfix (skip the PR)

Only for urgent one-liners:

```bash
git switch main
# ...edit...
git commit -am "Fix: ..."
git push            # auto-deploys
```

## Before opening a PR

- `npm run build` should pass locally.
- For UI changes, eyeball it in the preview (`npm run dev`).
