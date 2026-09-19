# Repository Branch Policy — superseded history

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Repository branch policy (2026-07-15, binding, supersedes the prior
## KDSUO-as-canonical policy below — kept for history only)
- **Always work directly on `main` (standing instruction, reaffirmed
  2026-07-16).** Do not check out, create, or commit to any other branch
  (including archived ones like `claude/my-tutor-foundation-kdsuo-blpnts`)
  even temporarily/as a working branch to be merged later — start every
  session with `git checkout main && git fetch origin main && git reset
  --hard origin/main` (only if the tree is clean), do all work on `main`,
  commit on `main`, push to `main`. No feature-branch-then-merge step.
`main` is now the ONLY active development branch — the single source of
truth for this repo. On 2026-07-15, `claude/my-tutor-foundation-KDSUO`
(itself already the union of `main`, `claude/my-tutor-foundation-kdsuo-blpnts`,
and KDSUO's own line — see the superseded policy note below) was merged
into `main` (merge commit — see `git log --oneline -1 main` for the current
tip), so `main` now contains everything: Dashboard, Curriculum, Mathematics/
Physics/English KGs, Educational Brain (Deliveries 3/5-8 + validation +
Wave 0 + CTO iterations), EOS (M1 Evidence Spine, K3 Kernel, K4 Policy
Engine, C4 Brain Compiler, K5 Output Verifier, K6 Live Integration), OAuth
fixes, WhatsApp-style chat history, the premium AI badge with its
DB-persisted `provider` field (plus its migration and fail-open guards),
and the full 65-file test suite.
- Every new feature branch starts from the latest tip of `main`.
- Every feature branch merges back into `main` when done — don't let it or
  any other branch drift more than a few commits unmerged before merging.
- `claude/my-tutor-foundation-KDSUO`, `claude/my-tutor-foundation-kdsuo-blpnts`,
  `merge/main-kdsuo-unification`, and every other pre-2026-07-15 branch are
  **ARCHIVED** — read-only historical snapshots. Do NOT commit to them, do
  NOT merge them forward, do NOT branch new work from them. They are kept
  only for history, never deleted, never developed on again.
- Never develop from a stale branch — `git fetch origin` and confirm you're
  branching off the current `main` tip before starting new work.
- Never force-push any shared branch. Merge forward, don't rewrite history,
  don't rebase public history, don't squash.
- Production deploys from `main`. Vercel Production Branch should point at
  `main` (a human with dashboard access must set/confirm this — no session
  in this environment has Vercel API/CLI credentials to verify or change it).

### Superseded (2026-07-15): prior KDSUO-as-canonical policy
`claude/my-tutor-foundation-KDSUO` was briefly the designated canonical
trunk (merge commit d0a6945, consolidating `main` + `kdsuo-blpnts`'s
verified-equivalent content + KDSUO's own EOS/teaching-quality work). This
was superseded the same day by the policy above, which moves all active
development onto `main` instead and archives KDSUO alongside the other
historical branches. Nothing from that consolidation was lost — it's fully
contained in `main`'s current tip.


