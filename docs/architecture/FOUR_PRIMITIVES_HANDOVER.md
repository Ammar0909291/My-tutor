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

**Last refreshed:** 2026-09-16, by the `/loop` handover-maintenance job.

---

## Current git state (re-verify with `git fetch origin main` before trusting this)

- `origin/main` HEAD: `ea74929` — "docs: point CLAUDE.md at the owner-adopted remediation
  plan, stop the Item-4 drift"
- Working tree at last check: clean, 0 ahead / 0 behind.
- A separate, unrelated live session (mobile app, title "Tutor app architecture approach") was
  observed mid-edit on `FOUR_PRIMITIVES_STATUS.md` (+213 lines) and `CLAUDE.md` (+15 lines),
  **not yet pushed** as of last check. If it has pushed by the time you read this: read that
  diff BEFORE running anything below — it may already cover part or all of Batch 7, or it may
  be repeating the deferred-Item-4 mistake again. Do not assume either way.

## Per-primitive status (summary only — full detail in `FOUR_PRIMITIVES_STATUS.md`)

| # | Primitive | Status |
|---|---|---|
| 1 | Turn Contract | DONE — verify-only if touched |
| 2 | Deterministic Physics Verifier | Batch 6 shipped + live-reobserved (1/50 reached core, 0 violations). **Batch 7 queued below.** |
| 3 | Learner-Move Interpreter | DONE — verify-only if touched |
| 4 | Durable Learner State | Audited, NOT built. Fork undecided — see below, do not pick a side. |

## QUEUED — hand this to the next Claude account verbatim

```
PHYSICS VERIFIER — BATCH 7

Read docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md §6.3
and §6.4 in full first. Batch 6 (shipped) widened Gate A/C to admit
LaTeX-wrapped and colon-marker-prefixed equations, and found — but
explicitly did NOT fix, as out of that batch's scope — a second,
unrelated Gate A limitation: an equation followed by a trailing
balanced parenthetical clause fails to extract (the exact real
production example: the Gemini captured sentence from the
Groq-vs-Gemini experiment, "In equation form, this is written as:
\( F = m a \) (force equals mass times acceleration)" — extraction
succeeds only when the trailing parenthetical is trimmed).

TASK:
1. Reproduce the defect first, against the real corpus and the real
   captured production sentence above — don't fix from a guess.
2. Fix it narrowly in extractEquationCandidates / the RHS-capture
   logic — a whitelist addition (e.g. don't let a trailing
   parenthetical clause get pulled into the RHS token match), never a
   blacklist. Keep the fix additive; Gate A's existing conservatism is
   deliberate (§5.3) and should not be loosened anywhere else.
3. Re-validate against the FULL existing corpus with zero regressions:
   912 CORRECT_CONTROLS / 25 REJECTION_CASES / 240
   MUST_NOT_FIRE_CONTROLS (in src/tests/support/physicsVerifierCorpus.ts).
4. Run ONE live observation window to measure the real fire rate with
   both Batch 6 and Batch 7's fixes active — reuse
   scripts/qa/physicsDimBatch4Drive.ts, same 4 phys.mech.* lessons,
   same disposable-QA-account convention (create, drive, delete,
   confirm re-login blocked). Report the gate distribution in the same
   table format §6.4 used.
5. Do NOT build Batch 5 (enforcement) — still not authorized on any
   evidence this batch produces. Shadow-only, zero route/behavior
   change, as every batch before it.

Update DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md (new §6.5) and
FOUR_PRIMITIVES_STATUS.md in the same commit. Commit and push to main.
Report per CLAUDE.md's standing reporting rule.

Before starting, read CLAUDE.md's "READ THIS FIRST" block at the top —
it references a since-superseded deferral note about the four
primitives; disregard that note, the owner has confirmed four
primitives is the active priority.

Model: Sonnet 5 (follows an already-proven method from Batches 4 and
6 — reproduce, whitelist-only fix, full-corpus revalidation, live
measurement; not a fresh architectural call).
```

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
  otherwise.
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
