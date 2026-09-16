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

**Batch 1 (Turn Contract, I2 — render receipt) is COMMITTED AND PUSHED — commit `a401a12d` on
`main`.** Full suite 697 files / 14,439 passed / 9 skipped; `tsc --noEmit` clean; `npm run build`
clean (middleware 79.7 kB, unchanged). What shipped, so a new session does not redo it:

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
- **Live/production verification of the shadow log has NOT been done** — this is new code on a
  fresh commit; a future session should check Vercel runtime logs for `RENDER_RECEIPT_EVENT` after
  it's deployed and real traffic has flowed, to see whether the mismatch case the design predicts
  ("the seventh defect") still occurs at all under the fixes already shipped for it
  (`mcqToServe`'s unification, documented in CLAUDE.md's Physics Teachability Program entry).

### Batch 2 (Turn Contract, I3) — a genuine finding, not a safe code change

**Investigated before writing anything, per this campaign's own discipline.** I3 as V2 states it
("prose may never introduce an option list or question") would forbid the model's own
`<!--MCQ-->` fallback entirely (`mcqHoisted = gateMcqHoisted ?? mcqParse.mcq`, route.ts ~L6206) —
but that fallback is a DELIBERATE, already-shipped decision (`masteryReachability.ts`: "teaching
without certification is a degraded outcome; teaching not at all is a failure"), and I3's
mastery-SAFETY half is ALREADY closed independently: `unauthoredKeyGrades`
(`conversationState.ts`) counts a model-invented-key grade without ever crediting it toward
mastery, proved over 49,152 states (`masteryCounterInvariant.test.ts`). Enforcing I3 literally
would remove assessment outright for every concept below asset-contract coverage (biology/CS at
0%, parts of english/math) — a real behaviour change conflicting with an existing product
decision, NOT a safe shadow batch.

**Batch 2 is COMMITTED AND PUSHED — commit `56dae8b5` on `main`.** Full suite 697/14,439/9 skipped;
tsc clean; build clean.

**Shipped: observation only.** `[learn/chat] MODEL_INVENTED_PROBE_EVENT` logs (route.ts,
right after `resolvedQuestionServed` is computed) whenever a served question has no `assetId` —
i.e. came from the model's own tag, not the corpus. Nothing changes what is served or graded.
**Next session: check production logs for this event's prevalence before deciding anything about
I3** — if it fires rarely, restricting it may cost little; if it fires on most below-contract
concepts, restricting it removes assessment for a large share of biology/CS/math/english traffic,
which needs an explicit owner call, not an engineering default.

### Batch 3 (Turn Contract, I8) — observation-only, same reasoning as I3

No deterministic "was this request satisfied" check exists today; `helpRequestKind` only reaches
the CUE/prompt layer (advisory). `learnerRequestHonoured` (route.ts ~L10682) is a DIFFERENT,
already-closed concern — it feeds `turnProgress.ts`'s I9 liveness evidence and means "a request
occurred this turn," never "was satisfied." Do not confuse the two.

**One kind (`diagram`) has a real deterministic signal, already computed: `visualFired`** (whether
a figure was actually delivered this turn — `reattachOnExplicitRequest` already re-delivers a HELD
figure on an explicit ask). The other two kinds (`explain_differently`, `real_life_example`) have
no equivalent without content analysis. **Shipped**: `[learn/chat] LEARNER_REQUEST_EVENT`
(route.ts, right after `visualFired` is computed) logs `kind`, and for `diagram` only,
`figureDelivered: visualFired`. Denominator-only for the other two kinds — never claims
verification it doesn't have.

**Batch 3 is COMMITTED AND PUSHED — commit `20b0578a` on `main`.** Full suite 697/14,439/9 skipped;
tsc clean; build clean. Do not redo this investigation.

**Possible future direction, not attempted**: if production logs show `diagram` requests are
reliably satisfied but `explain_differently`/`real_life_example` are not measurable at all, the
next step for those two is probably a narrow POST-hoc verifier in the same family as
`vChallenge`/`vAffirm` (`kernel/verifier/rules.ts`), checking the one decidable signal each kind
plausibly has (`explain_differently`: the reply must not repeat the previous turn — reusing
`wouldRepeatPreviousTurn`, already imported nearby for `distinctTeachingDelivered`). That is a
real enforcement change, not shadow-only, and needs the same reproduce-first discipline the
`vChallenge` work used — do not guess a regex, measure a real miss first.

### Batch 4 (Turn Contract, I10) — observation-only; the real fix needs a schema migration

`Message.create` for the learner's turn has NO idempotency key at all (route.ts's own
pre-existing comment already says so — "a timeout that actually committed would produce the
learner's message twice"). This is the confirmed mechanism behind LessonScreen.tsx's own
documented "duplicate-explanation bug": a client retry of a request whose SERVER side actually
completed (response dropped, not the connection) currently produces a second, independent full
turn — a second Message row and, if a probe was pending, a second grade.

**A real fix needs the key PERSISTED with a unique constraint — a schema migration, genuinely
out of scope for a shadow batch.** Shipped instead: the CLIENT now generates a stable
`crypto.randomUUID()` once per logical send (`LessonScreen.tsx`, reused across all retry attempts
of the SAME call) and sends it as `idempotencyKey`; the SERVER logs
`[learn/chat] POSSIBLE_DUPLICATE_TURN_EVENT` using a HEURISTIC — does `learnSession.messages`
(data already loaded, no new query) already contain the identical content from this learner
within the last 30s. Content-match is imperfect (a learner genuinely re-typing "yes" twice would
false-positive) — that imprecision is exactly why the real fix needs a key, not content matching.
Nothing here blocks a write or changes any behaviour; the key is not yet used for anything but
appearing in the log line.

**Next step for I10 specifically**: read production `POSSIBLE_DUPLICATE_TURN_EVENT` prevalence,
then decide whether a `Message.idempotencyKey` column (unique per session) is worth a migration —
this is the one item of the four where the "next step" genuinely is a schema change, gated on
real evidence it's worth the migration cost, not on more shadow batches.

### Next steps, in order
1. ~~Turn Contract I3~~ — see above; blocked on an owner decision + production prevalence data,
   not on more engineering. Do not attempt to "fix" this by restricting the model MCQ fallback
   without that decision.
2. ~~Turn Contract I8~~ — see below; observation shipped, enforcement (if any) needs production
   data + a reproduced miss first, same posture as I3.
3. ~~Turn Contract I10~~ — see below; observation shipped (client key + heuristic server log), a
   REAL fix needs a schema migration and is deliberately not attempted here.
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
