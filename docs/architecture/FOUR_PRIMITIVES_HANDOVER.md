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

## QUEUED — Turn Contract invariants I2/I3/I8/I10 (V2 §9 Step 4/7 territory)

**This is the next concrete step**, per the CLAUDE.md correction's own reasoning: earliest in V2
§9's migration sequencing, already fully specified by two existing design docs (V2 §4.1 and
`TYPED_TURN_CONTRACT_DESIGN.md`), and closes real, previously-incident-causing defect classes
rather than opening new research. See the ready-to-execute prompt recorded in the CLAUDE.md
correction entry / delivered to the owner on 2026-09-16 for the concrete task.

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
