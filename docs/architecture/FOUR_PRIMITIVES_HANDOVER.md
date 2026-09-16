# Four Primitives — handover file

**Purpose, distinct from `FOUR_PRIMITIVES_STATUS.md`:** that file is the dashboard/history —
what each primitive is, what's shipped, why. THIS file is the live queue — read it FIRST if
picking this campaign up cold (including if a session limit was hit mid-batch): it says exactly
what to do next, in what order, without re-deriving anything.

---

## STANDING AUTHORIZATION (2026-09-16, direct owner chat instruction: "you have to complete all
## 4 primitives")

This is explicit, current, owner-given authorization to resume all four primitives at V2's real
scope (`PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4) — it supersedes both the earlier
"PROGRAMME CLOSED" entry below (which OVERCLAIMED — see CLAUDE.md's "CORRECTION" entry) and the
standing deferral note at the top of CLAUDE.md, for these four items only. Do not re-litigate
whether to work on this; the authorization already happened. Work in small, shadow-first,
reversible batches, same discipline as every other batched campaign in this repo (Mathematics EB,
Physics Verifier, etc.): land inert, verify, commit, push, update this file, repeat.

### Real scope per primitive (V2 §4.1–§4.4), do not trust anything narrower
- **Turn Contract** — 10 invariants (I1–I10). I1, I4, I5, I6, I9 already true in behaviour; I7
  covered by an existing separate mechanism (`figureReference.ts`). **I2, I3, I8, I10 are the
  real unbuilt work.**
- **Physics Verifier** — 6 checks (dimensional, numeric, order-of-magnitude, sign/convention,
  limiting-case, symbolic). Only dimensional was ever attempted, and it is shadow-only (never
  enforced). 5 of 6 checks not started.
- **Durable Learner State** — V2 §4.4 proposes a THIRD design (evidence-spine + projection,
  reusing `capabilityModel.ts`'s already-proven pattern) that the closed audit may never have
  evaluated against the two forks it weighed.
- **Learner-Move Interpreter** — genuinely done, by a well-reasoned deviation from V2 §4.3 (see
  `LEARNER_MOVE_INTERPRETER_DESIGN.md` §0). No further work needed here.

---

## CURRENT STATE — read this before picking anything

**Batch 1 (Turn Contract, I2 — render receipt) is IN PROGRESS / awaiting final verification as
of this entry.** What shipped, so a new session does not redo it:

- `src/lib/teaching/mcq.ts`: `TutorMCQ`-consuming `deriveRenderId(mcq)` — a deterministic,
  non-secret SHA-256 content hash (never encodes `correctIndex`) of
  `${assetId}::${question}::${JSON.stringify(options)}`. `mcqForClient` now returns
  `{question, options, renderId}` instead of `{question, options}`.
- `src/lib/teaching/renderReceipt.ts` (new): `checkRenderReceipt(pendingMcq, renderedMcqId)` —
  pure, SHADOW ONLY. Compares what the server believes is pending against what the client claims
  it rendered. `undefined` (unupgraded client) is always consistent; `null` (client explicitly
  says nothing shown) against a real pending probe is a mismatch; content-hash equality is the
  match test, so it is correct across independently-computed server objects AND across a
  page-refresh/re-hydration from `pendingMcq`.
- `src/app/api/learn/chat/route.ts`: `schema` gained an optional `renderedMcqId` field; at the
  grading site (just before `gradeMcqAnswer`), a shadow log line
  `[learn/chat] RENDER_RECEIPT_EVENT=...` fires ONLY on a mismatch. **Nothing reads the result —
  grading, the ladder, mastery, evidence are byte-for-byte unchanged.** Do not wire this into
  `gradeMcqAnswer` or any grading path without first reading production `RENDER_RECEIPT_EVENT`
  logs across real traffic — the same "land inert, observe, then widen" discipline every prior
  deterministic authority in this repo used (`conversationState`, `masteryGate`,
  `gateAssessment`, `turnArbitration`, `turnProgress`, the dimensional Physics Verifier).
- `src/components/learn/LessonScreen.tsx`: `activeMcq` state gained `renderId: string | null`;
  the single `/api/learn/chat` POST body gained `renderedMcqId: activeMcq?.renderId ?? null`.
- Tests: new `src/tests/renderReceipt.test.ts` (12 assertions on `deriveRenderId`/
  `checkRenderReceipt`). Four pre-existing exact-shape (`toEqual`) assertions on
  `mcqForClient`'s return value were updated with dated reasoning (never deleted) to assert the
  answer-key-never-leaks property directly instead of an exact object shape, in
  `mcqAnswerKeyNotLeaked.test.ts`, `certificationAnswerSource.test.ts`, and
  `outstandingProbeStaysOnScreen.test.ts` (two assertions) — each of those was going to break on
  ANY future additive, non-secret field, which is the same defect class this batch is fixing one
  level up; fixed properly rather than left broken.
- `npx tsc --noEmit`: clean. Targeted test run (7 files, 111 tests): all passing.
- **NOT YET DONE**: full suite run (`npx vitest run`) had not finished at the time this entry was
  written — check `git log` for whether a commit landed after this note; if the working tree is
  clean and a commit exists referencing I2/render-receipt, this batch is committed and pushed. If
  the working tree has uncommitted changes matching the file list above, finish verifying (full
  suite green, `npm run build` if touching anything build-sensitive) and commit/push before doing
  anything else — do not start a new batch on top of uncommitted work.
- **Live/production verification of the shadow log has NOT been done** — this is new code on a
  fresh commit; a future session should check Vercel runtime logs for `RENDER_RECEIPT_EVENT` after
  it's deployed and real traffic has flowed, to see whether the mismatch case the design predicts
  ("the seventh defect") still occurs at all under the fixes already shipped for it
  (`mcqToServe`'s unification, documented in CLAUDE.md's Physics Teachability Program entry).

### Next steps, in order, once Batch 1 is confirmed committed/pushed and clean
1. **Turn Contract I3** (every graded artifact comes from the corpus by id with a stored key;
   prose may never introduce an option list or question). This is the residual generate-parse
   fallback `mcqHoisted = gateMcqHoisted ?? mcqParse.mcq` in `route.ts` (~line 6184) —
   `TYPED_TURN_CONTRACT_DESIGN.md`'s own §1.2/§2.1 name it as still open. Trace both branches
   before changing anything; this is hot-path code with many downstream readers of `mcqHoisted`.
2. **Turn Contract I8** (an explicit learner REQUEST is satisfied or explicitly declined with a
   stated reason, never silently ignored). Needs tracing `turnIntent.learnerRequest`/
   `turnArbitration`'s LEARNER_REQUEST rung to find where a request can currently fall through
   with neither outcome.
3. **Turn Contract I10** (idempotency key, closes double-grading on retry/second tab). Smallest
   of the four — likely a request-scoped key plus a dedup check before grading commits.
4. **Physics Verifier, numeric check** (§4.2's second-cheapest: "values recomputed independently;
   tolerance and significant figures... free"). `mathjs` is already a dependency, currently
   unused (per V2's own audit) — this is the natural next check after dimensional.
5. **Durable Learner State's third design** — needs an explicit read of whether
   `DURABLE_LEARNER_STATE_AUDIT.md` evaluated V2's actual evidence-spine-projection proposal
   before building anything; if it didn't, that evaluation is the first step, not code.

**Update this file's "CURRENT STATE" section at the end of every batch** — that is the entire
point of this file existing. Keep the STANDING AUTHORIZATION section as-is (do not re-litigate
it); only CURRENT STATE and the next-steps list should change per batch.

---

## CORRECTED, 2026-09-16 — "PROGRAMME CLOSED" below OVERCLAIMED (superseded by the authorization
## above, kept for history)

The table below was written against narrower sub-project design docs, not against
`PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` (V2) — the actual source of these four primitives.
Full correction, with evidence, is in `CLAUDE.md` under "CORRECTION — the 'PROGRAMME CLOSED' entry
above OVERCLAIMED, 2026-09-16, same day". Short version: only Learner-Move Interpreter is
genuinely done relative to V2's real scope. Turn Contract has 4 of 10 invariants unbuilt (I2, I3,
I8, I10). Physics Verifier attempted 1 of 6 required checks (dimensional; shadow only, not
enforced). Durable Learner State's audit may never have evaluated V2's actual §4.4 proposal
(evidence-spine + projection reusing `capabilityModel.ts`, a third design distinct from both
forks the audit weighed). The table immediately below is KEPT for history, not trusted.

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

(Table superseded — see above. Kept verbatim for history only.)
