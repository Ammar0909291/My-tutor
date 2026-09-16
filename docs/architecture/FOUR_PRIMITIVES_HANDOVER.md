# Four Primitives — handover file

**Purpose, distinct from `FOUR_PRIMITIVES_STATUS.md`:** that file is the dashboard/history —
what each primitive is, what's shipped, why. This file is a queue — exactly what to hand to the
next Claude account or session to keep the programme moving, kept current by a standing `/loop`.
Read `FOUR_PRIMITIVES_STATUS.md` for context; read THIS file for what to actually run next.
Do not let this become a second status history — if it starts duplicating that file's content,
delete the duplication and point back at it instead (the exact "two writers, one corpus" defect
class this repo's own remediation plan names is what this split is designed to avoid).

**Owner-confirmed priority (2026-09-16, live instruction, supersedes the note below):** the four
primitives ARE the active work to fix the app. `CLAUDE.md`'s "READ THIS FIRST" block and
`docs/architecture/TUTOR_REMEDIATION_PLAN.md` §2.0 currently say this work is deferred — that is
now stale relative to this instruction. Whoever picks this up: disregard the deferral note, do
not re-defer on your own reading of that doc, and do not silently "fix" the contradiction between
the two documents — flag it, don't resolve it unilaterally, per the standing lesson from the
2026-09-16 incident where multiple sessions drifted on exactly this kind of doc/reality mismatch.

**Last refreshed:** 2026-09-16, by the `/loop` handover-maintenance job — this refresh is a
deliberate handoff: the prior session was near its weekly usage limit, so this file is written
to be picked up cold by a genuinely different account, not just a fresh session on the same one.

**Git branch discipline — read before your first commit.** Standing repo policy (CLAUDE.md
"Working branch"): work happens ONLY on `main`. Do not create a feature branch at all, even
temporarily "to merge later" — a prior batch in this same programme did that, then had to
hard-reset and cherry-pick to reconcile once told to stop. Start on `main`
(`git fetch origin main && git checkout main && git merge --ff-only origin/main`), commit on
`main`, push to `main`, every batch, no exceptions.

**"How many batches are left?" — there is no fixed count, and don't invent one.** The Physics
Verifier programme (Primitive 2) is an evidence-gated loop, not a pre-planned pipeline: each
batch tries one narrow, whitelist-only gate widening and measures the real live fire rate. It
stops only when either (a) a live run shows a genuine violation with zero false positives — the
stated precondition for Batch 5 (enforcement) — or (b) the owner decides to retire the shadow
instead of widening further. Report the batch you did; do not promise or plan a batch count.

---

## Current git state (re-verify with `git fetch origin main` before trusting this)

- `origin/main` HEAD: `b7f753d` — "fix(physics-verifier): Batch 7 — trim trailing parenthetical
  annotation from Gate A's RHS capture" (this file's own queued Batch 7 prompt below, DONE — see
  `DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6.5 and `FOUR_PRIMITIVES_STATUS.md` §2 for the real
  result: fix proven by unit test, zero corpus regressions, but the live re-observation run against
  the deployed fix reached 0/50 core, with three further adjacent Gate A/C gaps found and reported,
  none fixed).
- Working tree at last check: clean, 0 ahead / 0 behind, on `main` (no feature branch used).
- The separate mobile-session edit mentioned in a prior refresh of this file landed as `a11bb4e` +
  `a6a1730` (this very handover file's own creation/strengthening commits) — already reconciled,
  nothing further to check there.

## Per-primitive status (summary only — full detail in `FOUR_PRIMITIVES_STATUS.md`)

| # | Primitive | Status |
|---|---|---|
| 1 | Turn Contract | DONE — verify-only if touched |
| 2 | Deterministic Physics Verifier | Batch 7 shipped + live-reobserved. Trailing-parenthetical Gate A defect fixed (unit-proven); live run reached 0/50 core, 0 violations across 136 lines total. **Owner decision pending — see "NOT queued" below; nothing to queue.** |
| 3 | Learner-Move Interpreter | DONE — verify-only if touched |
| 4 | Durable Learner State | Audited, NOT built. Fork undecided — see below, do not pick a side. |

## QUEUED — hand this to the next Claude account verbatim

**Nothing queued for Primitive 2 right now.** Batch 7 (the prompt this section used to hold) is
DONE — see `DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6.5. Its own live re-observation run found
three further, adjacent Gate A/C gaps (listed under "NOT queued" below, as evidenced CANDIDATES,
not authorized work) — per this program's own standing discipline, whether to spend a Batch 8 on
one of them, or to stop widening entirely, is an owner-level call, not something to default into.
Do not write a Batch 8 prompt here without that instruction.

## Verify-only prompts (queued but low priority — only if you have spare turns)

```
Verify Turn Contract (Primitive 1) and Learner-Move Interpreter
(Primitive 3) are still intact per their design docs
(TYPED_TURN_CONTRACT_DESIGN.md, LEARNER_MOVE_INTERPRETER_DESIGN.md) —
a lot of concurrent work has landed since they were marked DONE. Run
the full suite. If drift is found, report it; do not silently repair
it without owner sign-off.

Model: Sonnet 5.
```

## NOT queued — owner decisions, do not turn into a prompt without new instruction

- **Physics Verifier**: after Batch 7, the same open fork as before —
  keep opportunistically widening gates vs. retire the shadow as a
  permanently-dormant instrument. Batch 5 (enforcement) stays
  unauthorized regardless of Batch 7's result unless the owner says
  otherwise. Three named, evidenced CANDIDATES for a further widening
  batch, found by Batch 7's own live re-observation run and reported
  in `DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6.5 — none authorized,
  none attempted: (a) a trailing parenthetical followed by MORE prose
  in the same sentence (no sentence boundary between them, so the
  RHS's 60-char cap swallows past the paren before Batch 7's trim can
  fire); (b) real colon-marker phrasings the model actually used
  ("right after:", "acting on the body:", "…velocity:") that are
  outside Batch 6's six-phrase whitelist; (c) a parenthetical whose
  own interior contains an excluded character (e.g. a period before
  the closing paren), which truncates the RHS to an unbalanced
  fragment Batch 7's trim correctly declines to touch by design.
- **Durable Learner State**: the Design C (stored ConceptMasteryRecord,
  ADR 10) vs. Design D (derived, `studentIntelligence.ts`, already
  working) fork. The owner was asked directly (2026-09-16) and
  dismissed the question without picking — it remains open. Do not
  build either design. The one thing that IS fair game without
  deciding the fork: designing (not building) a genuine experiment
  that could discriminate between them, per `DURABLE_LEARNER_STATE_
  AUDIT.md` §13.3's finding that the originally-proposed experiment
  can't.

## How to keep this file honest

Before editing: `git fetch origin main`, re-check HEAD, re-check whether
the queued prompt above has already been executed (look for a Batch 7
commit touching `DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6.5). If
it's done: replace the queued block with whatever the NEXT open item is
(computed fresh, not assumed), and move the completed batch's real
result into `FOUR_PRIMITIVES_STATUS.md`, not into this file.
