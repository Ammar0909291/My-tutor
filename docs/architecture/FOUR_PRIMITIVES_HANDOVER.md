# Four Primitives — handover file

**Purpose, distinct from `FOUR_PRIMITIVES_STATUS.md`:** that file is the dashboard/history —
what each primitive is, what's shipped, why. THIS file is the live queue — read it FIRST if
picking this campaign up cold (including if a session limit was hit mid-batch): it says exactly
what to do next, in what order, without re-deriving anything.

---

## STANDING AUTHORIZATION (2026-09-16, direct owner chat instruction: "you have to complete all
## 4 primitives") — READ THE RECONCILIATION BELOW BEFORE ACTING ON THIS SECTION

This section records a real, in-conversation owner instruction that did happen and did produce
real, shipped, shadow-only work (Batches 1-7 below — all committed, pushed, tested, on `main`).
It is kept verbatim for history. **It is NOT, on its own, a standing invitation to keep spawning
more batches** — see the reconciliation immediately below, added the same evening after this
section's own closing line ("Keep the STANDING AUTHORIZATION section as-is... only CURRENT STATE
should change per batch") was used to justify exactly the pattern CLAUDE.md's "READ THIS FIRST"
note exists to stop: a session generating a fresh "resume this cold" handoff prompt from this
file's own momentum, without checking whether the underlying owner-adopted plan still had
anything queued. That handoff prompt was retracted the same day (commit `ad25fcc`, "docs:
retract the Turn Contract handoff prompt — violated the deferral note and was moot") — see
CLAUDE.md's "SECOND CORRECTION" entry for the full self-review.

### RECONCILED 2026-09-17 — what is actually true right now

Verified directly this session (`git fetch --unshallow` was required — this clone had grafted
history and made the cited commits invisible to `git log`/`git cat-file` until unshallowed;
future sessions hitting "commit not found" on a hash cited in this file should unshallow before
concluding the citation is wrong):

- `8bcd8407` (wire 33 stranded seed modules into the bootstrap), `16be9ab8` (coverage ratchet
  test), and `d728b372` (the corpus-wide asset-contract readiness report) are all real, on `main`,
  and already merged — confirmed via `git cat-file -t` and `git merge-base --is-ancestor` against
  `origin/main` after unshallowing. `docs/architecture/TUTOR_REMEDIATION_PLAN.md` §11.10 was read
  directly (not trusted from a summary): its own closing verdict is *"one corpus / one writer
  (measured, bounded) → corpus-wide readiness REPORT, not gate → **stop.** Get a learner. Let
  them choose what comes next."* and *"Do not add a §12."* Both steps are done. **The
  owner-adopted plan has already reached its own stop condition — there is no queued next item
  under it, and the four primitives were never part of it** (§2.0's own table marks Item 4,
  "Four primitives, not a rewrite," as **DEFERRED, not scheduled**).
- So: the "you have to complete all 4 primitives" instruction was real, one-time, in-conversation
  owner authorization — separate from, and not itself part of, the adopted written plan. It
  licensed the work that already happened (Batches 1-7, all inert/shadow, all still correct and
  worth keeping). It does **not** carry forward automatically as permission for a *next* session
  to keep inventing "Batch 8" on its own initiative, because the document that would normally
  supply ongoing scope (`TUTOR_REMEDIATION_PLAN.md`) explicitly does not include this work, and a
  same-day self-review already flagged treating stale override text as a perpetual mandate as the
  actual incident.
- **Nothing here is being walked back or reverted.** Every batch below is real, tested, harmless
  (additive, shadow-only, zero behavior change), and stays on `main`. This reconciliation is about
  whether to *keep going*, not whether what shipped was wrong.
- **What this means for a session picking this file up cold**: do not treat "CURRENT STATE" below
  as an open queue to keep draining on your own initiative. If the owner has, in your own current
  conversation, explicitly asked you to continue this work (the same kind of live, in-chat
  instruction that authorized Batches 1-7), proceed — that is exactly the authorization mechanism
  this repo uses. If you arrived here by reading old files with no fresh instruction in front of
  you, say so and ask, rather than defaulting to "continue the last campaign."

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

**Batch 4 is COMMITTED AND PUSHED — commit `2f3898f3` on `main`.** Full suite 697/14,439/9 skipped;
tsc clean; build clean. **This closes the observation phase for ALL FOUR Turn Contract
invariants** (I2 shipped as a working, correct shadow check; I3/I8/I10 each investigated in full
and either shipped as observation-only telemetry or found to need an explicit owner decision or a
schema migration before any enforcement is attempted). Turn Contract work now WAITS on production
log data + an owner decision for I3/I8/I10's enforcement question — do not start enforcing any of
them without that. Moving to Physics Verifier next.

### Next steps, in order
1. ~~Turn Contract I3~~ — see above; blocked on an owner decision + production prevalence data,
   not on more engineering. Do not attempt to "fix" this by restricting the model MCQ fallback
   without that decision.
2. ~~Turn Contract I8~~ — see below; observation shipped, enforcement (if any) needs production
   data + a reproduced miss first, same posture as I3.
3. ~~Turn Contract I10~~ — see above; observation shipped (client key + heuristic server log), a
   REAL fix needs a schema migration and is deliberately not attempted here.
4. **Physics Verifier, numeric check — INVESTIGATED, NOT SAFELY BUILDABLE AS A BATCH.** See
   dedicated section below. Do not attempt to implement this without first doing what it needs:
   a design pass + authored per-equation tolerances + a validation corpus.
5. **Durable Learner State's third design** — evaluation done, see dedicated section below.

### Batch 5 (Physics Verifier, numeric check) — investigated, deliberately NOT attempted

`dimensions.ts`/`analyzeEquation` is a purely SYMBOLIC dimensional analyzer (symbol -> Dimension
bindings, e.g. "F = m a" checked for unit consistency) — it has no concept of actual numeric
values at all, so it cannot be extended into a numeric check; a numeric check is a genuinely
separate extraction problem (numbers + units, not symbols + dimensions).

**`DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §5.7 already names this explicitly out of scope**,
with only one line of design: "a per-equation tolerance field on the binding... future." No
extraction rule, no tolerance model, no corpus exists — and the design doc's own acceptance bar
for the ALREADY-SHIPPED dimensional check ("zero false rejections across a 200-turn replay of
real transcripts") is recorded as "currently unmeetable — the corpus does not exist" even for
that simpler, already-built check.

Building the numeric check responsibly needs, in order: (1) a design pass (what counts as a
numeric physics assertion; what tolerance; sig-figs handling), (2) AUTHORED per-equation
tolerance values added to `dimensionBindings.ts`-equivalent data (content work, not just code),
(3) a validation corpus in the same style as `physicsVerifierCorpus.ts` (which itself took
several dedicated batches — 0 through 6 — to build safely). Attempting this in one ad-hoc batch
without those would repeat exactly the "guess a fix instead of measuring first" mistake this
whole Turn Contract campaign has been correcting. **Deliberately not attempted here.** A future
session with a full effort budget should start with the design pass, not code.

### Batch 6 (Durable Learner State, third design) — Batches 0-1 of the audit's own plan, executed

`DURABLE_LEARNER_STATE_AUDIT.md` §6 already designed Batches 0-6 for a direct-write "Design C"
table, and Batches 0-1 (risk: NONE, no DB write at all) had never been executed. Confirmed by
direct grep that the audit's own Design C/D comparison never mentions `capabilityModel.ts`, the
evidence spine, or a projection anywhere — V2's actual §4.4 proposal genuinely was not evaluated.
Separately confirmed `capabilityModel.ts` is a real, working spine->projection->hydrate instance
(`@/lib/evidence-spine/fold.ts`, a closed but EXTENSIBLE `SpineEventType` union) — so V2's claim
the pattern is "already proven" is accurate, not aspirational. Key insight: Batches 0-1 serve
EITHER fork (a raw table or a spine event) equally, since neither writes anything yet — so
executing them now does not prejudge the fork.

**Shipped**: `src/lib/teaching/conceptMasteryRecord.ts` (`computeConceptMasteryRecord`) — a pure
function per the audit's own Batch 0 spec ("a pure function of the live authority... do NOT
import ADR 10's Bayesian update rule"). `verified` is never reimplemented — it calls
`masteryVerifiedStrict` directly (the SAME authority every other mastery consumer uses), so it
cannot independently diverge the way the plain-vs-verified counter split already did once
(`masteryCounterDisplayDivergence.test.ts`). `masteryScore` is a continuous 0-1 read of progress
toward the SAME two thresholds, capped below 1 whenever `verified` is false. `decayedScore` and
`ActiveMisconception` are deliberately OUT of scope (decay only matters on READ, Batch 5, HIGH
risk; `ActiveMisconception` needs the Evidence Engine's tables, which have 0 writers — audit's own
final line).

Wired at the EXISTING persist site (route.ts, inside the same try block the "STEP 2 progression
telemetry" comment already documents, reusing its `stateAfterForMetrics` — no second fold, no new
DB read): `[learn/chat] LEARNER_STATE={...}` logs the computed record. **No DB write** (the
2026-08-31 egress incident is the standing reason). Nothing here changes what is persisted,
graded, or served.

**One genuine bug caught by the test suite before shipping, not after**: an early test asserted a
"plain-vs-verified divergence" case using a raw state literal without `sawModernGrading: true` —
`masteryVerifiedStrict`'s own legacy fallback legitimately certifies THAT shape (a genuine
pre-feature row), so the test's own premise was wrong, not the code. Corrected to the actual
divergence shape (`sawModernGrading: true` + zero verified counters) before shipping — the exact
reproduce-first discipline this whole session has followed.

**Batch 6 is COMMITTED AND PUSHED — commit `c62f559a` on `main`.** Full suite 698/14,447/9 skipped;
tsc clean; build clean.

**Checked whether Batch 2 ("Agreement assertion") is ALSO safely reachable right now — it is
NOT.** `buildStudentIntelligence` (the function whose output Batch 2 needs to compare against) has
ZERO call sites in the chat route today — it runs only in dashboard/research contexts. Wiring it
into the per-turn chat path to do the comparison would add a genuinely NEW, non-trivial DB read on
every turn — exactly the class of change the 2026-08-31 egress incident's own standing rule warns
against ("a new per-turn query/table is never the answer to 'measure this' first"). Batch 2 is
therefore blocked on ONE of: (a) production `LEARNER_STATE` log volume accumulating first, then an
OFFLINE comparison script (not wired into the hot path) reading both that log and a periodic
`buildStudentIntelligence` snapshot; or (b) an explicit owner decision to accept the new per-turn
DB read cost. Neither exists yet. **Do not wire `buildStudentIntelligence` into route.ts to chase
this without one of those two.**

### Production-log check (2026-09-16, same session) — confirms the block is real, not theoretical

Queried Vercel runtime logs directly (project `prj_FwjmRdthApGhwdQY7FyDYThD7WJD`, team
`sh-oaib-s-projects`) for the shadow markers this campaign has been shipping — `RENDER_RECEIPT_EVENT`
(I2), and the `/api/learn/chat` route generally — over the last 24h of production. **Zero log lines,
either query.** This is not a query-scoping problem: it matches every other session's own repeated
finding elsewhere in this repo ("this app has essentially no organic learner traffic"). So the block
on I3/I8/I10 enforcement and on Batch 2 is not a "wait a few days" situation — there is no accruing
signal to wait for under current traffic. Enforcement decisions for all three Turn Contract items,
and Batch 2 of Durable Learner State, genuinely need EITHER real learner traffic to start flowing
(outside this campaign's control) OR an explicit owner decision made without waiting for data.

**Campaign status, honestly, as of this check:** every remaining increment across all four
primitives is now blocked on one of those two external things, not on more engineering from this
session. Physics Verifier's numeric check needs a design pass + authored corpus (content work).
Turn Contract's I3/I8/I10 enforcement needs production prevalence data that is not accumulating, or
an owner call. Durable Learner State's Batch 2 needs the same. There is no next batch that is both
genuinely NEW work and safely scoped without one of those unblocks landing first. A future session
(or this one, later) should check `list_projects`/`get_runtime_logs` again before assuming this is
still true — traffic conditions could change — but manufacturing further shadow-only batches against
zero traffic would not produce information, only busywork.

**Update this file's "CURRENT STATE" section at the end of every batch** — that is the entire
point of this file existing. Keep the STANDING AUTHORIZATION section as-is (do not re-litigate
it); only CURRENT STATE and the next-steps list should change per batch.

### Batch 7 (Physics Verifier, numeric/arithmetic-consistency) — measurement pass, 2026-09-17

The "needs a design pass + authored corpus" framing above was half right: the DESIGN needs
content work (order-of-magnitude/sign/limiting-case tolerances), but a narrower slice —
**arithmetic self-consistency** (does a stated identity like "50 km + 20 km = 70 km" actually
compute correctly) — needs ZERO authored physics knowledge, only checking the model's own
arithmetic. This is genuinely NEW, safely-scoped work that does not depend on production traffic
or an owner decision, because it is pure measurement, not enforcement.

Built `scripts/qa/physicsNumericProbe.ts` (disposable QA account, real deployed app) and ran it
twice. First run used a wrong detector (looked for symbolic `letter = number`) and found nothing
— but reading the raw text showed a real identity in prose digit form the regex could not see
("3 m + 2 m = 5 m"), the same false-negative trap the dimensional check's own §6.1 already fell
into once. Corrected regex, re-ran: **1 of 8 replies contained a checkable arithmetic identity**,
only under the most explicit "step by step... check the arithmetic" prompt, and it was CORRECT
(50+20=70, 70+30=100) — so there is a real, rare signal, but zero evidence yet that the model ever
gets this wrong. Full detail and the exact regex history:
`DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6.6.

**Verdict: too little evidence to design a checker from one correct example.** The honest next
step is NOT to build a checker now — it is to re-run this measurement with a larger sample
(more concepts, more aggressive "walk me through the math, check for mistakes" elicitation) to
either find a real error to design against, or confirm the pattern stays too rare to be worth
building. This is recorded as a genuine forward step for a future session, not busywork: it moved
Physics Verifier from "5 of 6 checks never even measured" to "5 of 6 checks: one has a
just-measured, still-thin evidence base; four remain completely unmeasured
(order-of-magnitude/sign/limiting-case/symbolic)."

### 2026-09-17 — governance reconciliation pass, no new engineering batch

Same-day follow-up to Batch 7. Task this turn, from the live owner in chat, was explicitly: keep
this file current for handoff, prepare a continuation prompt, and recommend a model — not to ship
Batch 8. Before doing any of that, re-verified (directly, not by trusting a prior summary) that
`TUTOR_REMEDIATION_PLAN.md` §11.10 really does mark the adopted plan's work as complete and that
the three commits it cites (`8bcd8407`/`16be9ab8`/`d728b372`) are real and merged — see the
RECONCILED section near the top of this file for the full finding. No code touched; this is the
one file update the user asked for. The continuation prompt handed to the owner in that
conversation required the next session to read this file's RECONCILED section and get a fresh,
explicit go-ahead before treating "CURRENT STATE" below as a queue to keep draining.

### Batch 7, follow-up run — 2026-09-17, same day, owner-confirmed via AskUserQuestion

The owner was asked (in chat, not inferred) which item to work on next, given the RECONCILED
finding above; chose **"A — larger physics numeric-probe run"** — Batch 7's own named next step.
Widened `scripts/qa/physicsNumericProbe.ts` (commit `e01932f0`): 3 arithmetic-heavy domains
instead of 1 (`phys.mech.*`/`phys.em.*`/`phys.therm.*`, 2 lessons each) and 5 eliciting turns
instead of 3 (2 new ones explicitly asking the tutor to check/redo its own arithmetic) — 36
replies, ~4.5x the first run's sample. Ran against the deployed app on a disposable QA account,
deleted and deletion-verified afterward (`Deleted: true, re-login blocked: true` — nothing left in
production from this run).

**Result: 4/36 replies (11%) contained a checkable arithmetic identity — `mech 2/12`, `em 0/12`,
`therm 2/12` — and every operation in all 4 was hand-verified correct.** Combined with the first
run: 5/44 checkable replies, 0 incorrect identities, across two runs and two domains that produced
signal at all (mech, therm) plus one (em) that produced none even under the most explicit
elicitation. Full detail and the exact verified arithmetic:
`DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6.6, "Third run" paragraph.

**Verdict unchanged, now better-supported: do not build a numeric-arithmetic checker.** This is
the honest "still too rare to build against" outcome the prior Batch 7 entry named as a legitimate
possible result — it is not a null result, it is the actual finding. The Physics Verifier's
numeric check should stay unbuilt until a real learner-reported arithmetic error gives it
something to design against (the same way `fieldLineSignGuard`/`visionDirectionGuard` were each
built from one measured incident, never a corpus sweep). **Do not re-run this measurement again
without a new reason** — a bigger sample of the same kind will very likely just confirm the same
rate again, which is not new information.

Zero product code touched by the run itself (the script is QA tooling, not shipped code). `tsc
--noEmit` clean on the script change. No enforcement, no behavior change, no schema, no curriculum
content touched.

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
