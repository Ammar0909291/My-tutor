# Four Primitives — handover file

**Purpose, distinct from `FOUR_PRIMITIVES_STATUS.md`:** that file is the dashboard/history —
what each primitive is, what's shipped, why. This file was a queue — exactly what to hand to the
next Claude account or session to keep the programme moving. **The programme is now closed; there
is nothing left to queue.**

---

## CORRECTED, 2026-09-16 — "PROGRAMME CLOSED" below OVERCLAIMED

The table below was written against narrower sub-project design docs, not against
`PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` (V2) — the actual source of these four primitives.
Full correction, with evidence, is in `CLAUDE.md` under "CORRECTION — the 'PROGRAMME CLOSED' entry
above OVERCLAIMED, 2026-09-16, same day". Short version: only Learner-Move Interpreter is
genuinely done relative to V2's real scope. Turn Contract has 4 of 10 invariants unbuilt (I2, I3,
I8, I10). Physics Verifier attempted 1 of 6 required checks (dimensional; shadow only, not
enforced). Durable Learner State's audit may never have evaluated V2's actual §4.4 proposal
(evidence-spine + projection reusing `capabilityModel.ts`, a third design distinct from both
forks the audit weighed). The table immediately below is KEPT for history, not trusted.

## IN PROGRESS — Turn Contract invariants I2/I3/I8/I10 (V2 §9 Step 4/7 territory)

**Started 2026-09-17.** Full detail and evidence: `FOUR_PRIMITIVES_STATUS.md` §1's "I2/I3/I8/I10"
table — read that, not this file, for the current per-invariant state. Short version:

- **I3 — DONE (shadow).** `A11` in `assertDeliverySatisfiesContract` (`turnDelivery.ts`), zero new
  runtime state, built from data the compiled `TurnDelivery` already carried. Landed, tested,
  `tsc`/full-suite/build clean.
- **I8 — genuinely blocked, not just unstarted.** Re-verifying the "fully migrated" claim before
  building on it found `TurnDelivery.figure.*` is a **permanent placeholder** — `compileTurnDelivery`
  runs once (route.ts L6791), before the real figure resolution executes (`figureIntroducedThisTurn`
  at L9415 — 2,661 lines later). A
  diagram-satisfaction check built on those fields would false-positive on every diagram request.
  Separately, satisfaction for the other two request kinds is a prose-content question the
  assertion module's own rules forbid checking. Neither is fixed. See the STATUS table for the
  smallest safe next step (fix the figure timing gap first, or get an owner decision on a
  structural "request handled" tag).
- **I2, I10 — still fully unstarted**, both need new protocol-level state. I10 has an identified
  zero-client-touching shadow-proxy design (duplicate-message detection from persisted session
  history) that has not been built. I2 has no safe proxy and needs an explicit owner decision on a
  client-side receipt field before any code.

**Do not re-attempt I8 on the `delivery.figure` fields without first reading why they are
permanently `false` today** (see STATUS §1) — that is not a bug introduced this session, it is a
consequence of where `compileTurnDelivery` is called, documented in the code itself since Batch
1/5/8, whose downstream implication (A8 can never fire; I8/diagram cannot be built on it) simply
had not been stated plainly until this session checked before building on it.

---

## PROGRAMME CLOSED, 2026-09-16 — direct owner instruction (SUPERSEDED same day, see above)

All four primitives are DONE. Read `FOUR_PRIMITIVES_STATUS.md` in full for the live-status
summary; this file no longer carries independent content beyond this closure notice, to avoid the
exact "two writers, one corpus" drift this file's own prior versions warned against.

| # | Primitive | Status |
|---|---|---|
| 1 | Turn Contract | ✅ DONE — fully migrated, closed since before this session |
| 2 | Deterministic Physics Verifier | ✅ DONE — shadow retired as terminal state. Batch 5 (enforcement) declined, not deferred: 4 live observation windows (169 lines) found 0 violations, matching the design doc's own §7 steel-man-predicted stop condition exactly. Shadow code stays live (harmless); no further batch is planned. |
| 3 | Learner-Move Interpreter | ✅ DONE — fully migrated, closed since before this session |
| 4 | Durable Learner State | ✅ DONE — closed as scoped. Fork decided: `studentIntelligence.ts` (Design D) is canonical; `ConceptMasteryRecord`/`ActiveMisconception` stay unwritten. ADR 10 marked partially superseded. |

**What would reopen either closed item:** a genuinely NEW trigger, not a continuation of the prior
campaign — a real dimensional error found in production traffic for Item 2 (not another
manufactured gate-widening batch); a genuinely different Design C or an explicit cross-learner
queryability requirement for Item 4 (not a rerun of the same-formula Batches 0-2 experiment the
audit's own §13.2 already showed can't discriminate the fork). Neither should be defaulted into
by an agent picking this up cold — both need a fresh, explicit reason.
