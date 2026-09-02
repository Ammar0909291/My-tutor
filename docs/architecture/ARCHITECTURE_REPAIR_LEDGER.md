# Architecture Repair Ledger

Durable record of the ownership-consolidation program. One authoritative owner
per teaching decision; enforcement, not detection. Survives context/account
changes — read this and `OWNERSHIP_CENSUS_2026-09-01.md` before continuing.

**Method**: for each recurring-defect class, (1) map every component that can
answer the decision, (2) find where they diverge *on reachable states, driven
through the real fold* (not raw grids), (3) route them all through one owner so
they cannot disagree for ANY state, (4) pin with a falsifiable test that asserts
the equality by construction.

The template is `turnArbitration.ts`: one enumerated owner, losing authorities
**absent** rather than out-argued.

---

## Slice 1 — mastery verdict (census target #1) — DONE 2026-09-01

**Decision**: "has this learner mastered this concept?"

**Competing authorities eliminated** (three → one):

| consumer | was | now |
|---|---|---|
| completion gate `gateLessonCompletion` | `masteryVerifiedStrict` | `conceptMasteryVerdict` |
| client payload `buildMasterySummary.verified` | `masteryVerified && !laundered` | `conceptMasteryVerdict` |
| permanent record `conceptOutcome.status` | `hasDemonstratedMastery && !markForReview && !laundered` | `conceptMasteryVerdict` |

**Single owner**: `conceptMasteryVerdict(state)` (`masteryGate.ts`) = `masteryVerifiedStrict`
— the tightest, already the completion authority.

**Reachable divergence this closed** (measured through the real fold, not a raw
grid — `scratchpad/probe_divergence.ts` reproduces it):

```
TRANSFER, check=1, practice=2, verifiedCheck=0, contradictions=1, keys=0
  payload.verified = TRUE      record = MASTERED      completion gate = REFUSE
```

A learner reaching TRANSFER whose CHECK grade was CONTRADICTED was told
"verified/mastered" for a lesson the gate would not complete. Cause: the record
and payload read looser predicates than the gate.

**Why the migration is safe (monotone-tighter, not a semantics change)**:
`strict ⟹ (masteryVerified && !laundered)` and `strict ⟹ (hasDemonstratedMastery
&& !laundered)`, so a lesson these two used to certify still certifies UNLESS the
completion gate would have refused it — in which case the old "mastered" was
false. No cleanly-graded reachable lesson changes.

**Reachability correction** (per the mission's REACHABILITY rule): the census's
"396/864 divergent states" and several test fixtures
(`unauthoredAnswerKey`, `completionMasteryAuthorityContract`, `conceptBudget`,
`lessonAttempt`, `lessonCompletion`) asserted mastery from `correctAtPractice:2`
with `correctAtCheck:0`, or `phase:'TRANSFER'` with zero evidence. Through the
real fold (`conversationState.ts` CHECK requires `correctAtCheck>=1` to reach
PRACTICE; PRACTICE requires `correctAtPractice>=2` to reach TRANSFER) those are
**unreachable**. Fixtures were rewritten to reachable states; the intent (an
ordinary mastered lesson records mastered) is preserved.

**Deliberately NOT merged**: `hasDemonstratedMastery` (conceptBudget.ts) answers
a DIFFERENT question — "should this concept stop being actively taught" —
legitimately satisfied by mastery OR budget exhaustion. It still owns closure
(`isConceptClosed`) and the budget short-circuit, unchanged, so a budget-spent
concept still closes without being recorded mastered. `completionMasteryAuthorityContract.test.ts`
locks that "closed ≠ mastered" contract and still passes.

**Enforcement test**: `masteryVerdictSingleOwner.test.ts`
- A: reachable fold-driven end states (clean / contradicted-check /
  contradicted-practice / invented-key) — payload, record, gate all identical.
- B: structural — the three consult `conceptMasteryVerdict`; the record does not
  import `hasDemonstratedMastery` back as a second owner.
- C: **by construction** — 512-state raw grid asserts `payload === record ===
  gate === owner` for EVERY state, reachable or not. A future re-fork of any one
  authority fails here.
`masteryAuthorityAgrees.test.ts` invariant B strengthened from one-directional
(payload-vs-record) to three-way bidirectional including the completion gate.

**Validation**: full suite 532 files / 11,550 passed / 9 skipped; tsc clean;
`npm run build` clean.

**NOT done**: no production/live-account run of this slice (behavior change is
strictly tighter and fully covered by fold-driven tests; a live run would only
re-confirm). The DB writer `markConceptMastered` and the learner-facing
"You mastered X" now cannot fire for a gate-refused concept — verified through
the record path (`recordConceptOutcome` routes on `conceptOutcome.status`), not
yet observed live.

---

## Slice 2 — acknowledgement predicates (census target #2) — DONE 2026-09-01

**Decision investigated**: "is this a substantive learner contribution?"

**Determination: a merge is NOT justified — the semantics are genuinely
different, and the disagreement is already masked at every high-stakes site.**
Full investigation: `docs/architecture/ACKNOWLEDGEMENT_PREDICATE_OWNERSHIP.md`.

- `isBareAcknowledgement` (strict, whole-message exact) and
  `isLowSignalAcknowledgement` (looser, strip-then-match) answer DIFFERENT
  questions. Measured disagreement over the census corpus: bare-ONLY=2
  ("thanks", "done"), low-ONLY=11 ("yeah that makes sense", "i follow", "right", …).
- The high-stakes decisions already have ONE owner — the ladder predicate:
  grading-null reads `isLowSignalAcknowledgement` (a prior session switched it
  here to end a demotion bug); ladder advancement reads it; `serveFromMemory`
  ANDs both `answersProseQuestion` and `ackToQuestion`, and the ladder predicate
  catches every low-ONLY receipt, so it **masks** the strict predicate's miss —
  the outcome is identical whichever fires. Verified (`scratchpad/ack_mask.ts`).
- A merge would REGRESS genuinely ambiguous tokens ("right" = receipt OR
  affirmative; "done" likewise) — trading a masked, harmless raw-predicate
  difference for a real misclassification. The mission's own anti-patch-loop rule.

**Enforcement** (`acknowledgementOwnership.test.ts`, no runtime change):
- pins that the grading-null gate reads the ladder predicate, not the strict one
  (cannot re-fork back — the exact regression the demotion fix closed);
- pins the masking invariant — every `serveFromMemory` expression ANDs
  `ackToQuestion` alongside `answersProse`, so dropping it (believing the prose
  detector covers receipts) is caught;
- characterizes the two predicates as DISTINCT so no reader assumes
  interchangeability.

**Contrast with slice 1**: mastery HAD a reachable, live-reproduced contradiction
(record said mastered, gate refused) → one-owner merge was the fix. Acknowledgement
does NOT (the ladder predicate already masks the disagreement) → pin, don't merge.
Same methodology (measure reachable harm through the real consumers), opposite
conclusion — which is the point of measuring rather than assuming.

## Slice 3 — post-hoc repair census (Census A, DoD #10) — DONE 2026-09-01

All 27 `cleanText =` rewrite sites in route.ts classified (A safety / B compat /
C duplicate-authority / D missing-enforcement-compensation / E content / F
obsolete). Full table + findings: `docs/architecture/POSTHOC_REPAIR_CENSUS.md`.

**Result**: no repair is obsolete; the ~14 A-sites are honest text-safety strips
and correct as-is. The duplicate-authority risk concentrates on THREE decisions:
1. **"does a question ship this turn"** — 5 sites (withholds 5816/6733/6766, adds
   5737/6897), no single arbiter, while `gateEligible` owns authored-probe
   eligibility upstream. Success-condition #5. THE consolidation target.
2. completion presentation — 6866/6897/8282 (8282 = `buildLessonCloseText` is the
   legitimate owner; 6866/6897 are compensations layered on top).
3. one graded verdict stated three ways — 5788/7324/~6715.

**Finding 2 (detection-not-enforcement, 6766 else)** is a DELIBERATE, documented
choice: shipping a question-only closing turn unchanged rather than fabricating a
closing sentence. Recorded, not "fixed" — the honest enforcement is upstream, not
a rewrite here.

## Slice 4 — question-ship arbiter (Census A Finding 1, DoD #5) — DONE 2026-09-01

Measured (slice-1 discipline, not assumed): the classification's "5 sites, no
arbiter" was an artifact of reading only the `cleanText =` lines. Reading the
GUARDS shows the three withholds are pure strips (safe by construction) and the
TWO add sites — the only post-generation question-ADDs — are BOTH already gated
by the one arbiter, `turnArbitration` (Series B Phase 3): filler-repair on
`allows('FILLER_REPAIR')` (route 5713), completion-nudge on `allows('NEW_QUESTION')`
(route 6895). The MCQ withhold (5210) and probe gate (4100) read it too. So the
"does a question ship" decision already has one owner; 6897 cannot fire on a turn
the arbiter denies NEW_QUESTION (RECOVERY/CLOSE/LEARNER_REQUEST).

**Enforcement** (`questionAddArbitration.test.ts`, no runtime change): pins that
both add sites stay inside an arbitration-gated block and that the arbiter is
arbitrated once per turn — so a future third add site (the "fourth boolean" the
filler comment warns of) cannot ship an unguarded question. Success-condition #5,
structural.

**Pattern across slices 2/3/4**: three census targets investigated with the same
reachability discipline; only slice 1 (mastery) had a live reachable defect that
needed a runtime change. The other three were already correct — the value was
MEASURING that (so no risky merge is attempted) and PINNING it against regression.

## Slice 5 — teaching-action ownership (census target #4) — MEASURED CLEAN 2026-09-01

Census called it "3 partial owners, not yet measured." Measured: they are
LAYERED, not competing owners of one decision.
- CUE `decideTeaching` → `TeachingDecision` → the Runtime Dispatcher (Milestone
  3, dispatcher.ts) owns the EXECUTOR fork (serve-from-memory / LESSON_COMPLETE /
  LLM). Its own comment: "the ONE place a TeachingDecision is mapped onto an
  existing execution path."
- `decide()` (teaching engine) → the "TEACHING ENGINE DECISION" prompt block owns
  the LLM-turn STRATEGY (goal/mode/action/difficulty), with the LLM as renderer.
- No reachable contradiction: when the dispatcher routes to a non-LLM executor
  (route 4493/4497 set `serveFromMemory`/`serveLessonComplete`), the LLM path —
  and thus `decide()`'s block — is bypassed, so it never reaches the learner.
Already covered by `dispatcher.test.ts`, `stageProgressionOwnership.test.ts`,
`completionConversationRouting.test.ts`, `brainRuntimeIntegration.test.ts`. No new
pin added (would duplicate). Fallback law documented: an inconsistent plan
degrades to legacy, never strands a turn.

**Census scorecard**: #1 mastery (real fix, slice 1), #2 acknowledgement (clean,
pinned, slice 2), #4 teaching action (clean, covered, slice 5), Census A (slices
3/4). Only #3 (visual/learner-request) remains — the layer the mission explicitly
cautions against reopening.

## Slice 6 — learner-request / visual (census target #3) — MEASURED, PRESERVED 2026-09-01

The mission cautions against reopening the visual layer / Visual Resolver V2
unless a genuine violation is proven; the instruction is "verify current
ownership ... if it is genuinely the single authority, preserve it." Verified
(read-only): the 5 predicates the census named answer DIFFERENT, complementary
sub-questions, each with a deliberately-drawn documented boundary —
- `detectLearnerRequest` → the teaching-action KIND (diagram/explain-differently/
  example), consumed via `turnIntent.learnerRequest` (route 3002), the
  established single authoritative Phase-1 read of the message;
- `requestedVisualForm` → the visual FORM (plot/motion) only, and its own comment
  states it must NOT change whether a visual was requested at all;
- `isExplicitTopicRequest` / `isTopicQuestion` → topic-request / topic-question
  (excursion layer);
- `decideVisualNeed` → whether a visual shows this turn.
They are coordinated at ONE point: `buildVisualContractBlock(decision, {
learnerAskedForAVisual: learnerRequestHoisted === 'diagram', ... })` (route
3171/3212), which DECLARES a request-vs-availability mismatch rather than letting
two authorities disagree (the L3 fix: "I don't have a graph of this, but here is
the circuit"). No competing-owner contradiction found; preserved, not touched.

## Slice 7 — DoD #13 adversarial proving (first piece) — DONE 2026-09-01

`foldReachabilityInvariant.test.ts` — adversarial proof that the fold PREVENTS
(not merely fails to produce) the unreachable mastery shapes slice 1's soundness
rests on: through the real fold, `correctAtPractice>=1 ⟹ correctAtCheck>=1`,
TRANSFER needs practice>=2, the first practice credit only appears AFTER a check
credit, and no trajectory yields `{check:0,practice:2}` or `TRANSFER` with zero
evidence. Complements masteryLadderReachable (positive path) with the negative
ordering invariant nothing else pinned. If a future edit lets PRACTICE accrue
before CHECK, slice 1's premise breaks and this test fails first. Also re-pins
acks/wrong-answers never climbing the assessed rungs.

## Slice 8 — DoD #13 consolidated invariant matrix — DONE 2026-09-02

`docs/architecture/DOD13_INVARIANT_MATRIX.md` — the "adversarial proving matrix"
the mission named as a deliverable. It unifies slices 1/2/4/7 and the rest of the
existing suite into ONE map: for each of 14 recurring ("Tutor Max") failure
classes, the single OWNER of the decision, the INVARIANT that owner enforces, and
the falsifiable TEST that pins it — all 28 cited tests verified to exist and to
drive the real modules (not source-string matches, except where a wiring
assertion is the point).

**Why a document, not another test**: every historical failure class already has
an adversarial or characterization pin (the census-driven slices plus
`acknowledgementNeverDemotes`, `foldReachabilityInvariant`, the excursion/
knowledge-gap/misconception suites). Adding a 15th test would duplicate the large
existing suite, which the mission forbids. The additive value is legibility: a
future session can answer "is this class of bug still architecturally possible?"
by citation, and see at a glance if any row has slipped to detection-only or lost
its pin.

**What it makes explicit (the honest part)**: 14 classes are PREVENTED by
construction; TWO are DETECTION-only by deliberate, documented choice
(question-only closing turn; free-response factual error below probe coverage) and
are named as such rather than counted as safe. The matrix's maintenance rule
enforces the mission's core discipline structurally — if a PREVENTED row's test is
deleted or hollowed to a string-match, the row drops to DETECTED until re-pinned,
so "a green suite with a hollowed-out test" cannot masquerade as prevention.

Docs-only slice — no runtime/test change, so no suite run required; the 28 cited
tests were green as of `f4bded73` (532 files / 11,550 passed / 9 skipped).

## Slice 9 — one graded verdict, one source (Census A Finding 3) — DONE 2026-09-02

**Decision**: "what did the server grade this answer?" — rendered by three
post-model staters (`confirmCorrectAnswer` 5788, `applyDontKnowCeiling` reveal
~6715, `repairMirrorWithVerdict` 7324).

**Measured (slice-2/4/5 discipline)**: the VALUE already has one owner —
`mcqGradeHoisted`, assigned EXACTLY ONCE (route 2171, from `gradeMcqAnswer`),
and all three staters read that one derivation. The "disagree on screen" risk the
census named is NOT reachable today: the option text in the mirror repair comes
from the same `pendingMcqHoisted` graded against, and the three are sequential
`cleanText` transforms (later replaces the mirror, does not append a second
verdict), so two divergent verdicts cannot co-render. **Not consolidated** — the
semantics don't require one stater; the reachable regression is a FUTURE second
grade source.

**Enforcement** (`gradeVerdictSingleSource.test.ts`, 5 tests, no runtime change):
pins single assignment; every stater reads `mcqGradeHoisted`; the mirror's option
text reads the graded item; none reads `signalCorrect` (the model self-report is
one hoist away and must not be confused for the grade at a rendering site).
POSTHOC_REPAIR_CENSUS Finding 3 updated from open to MEASURED+PINNED.

## Slice 10 — free-response answer cannot certify mastery (Thread 1, owner-approved) — DONE 2026-09-02

**The one class the DoD #13 matrix listed as NOT prevented.** Owner explicitly
authorized thread 1 ("go ahead with thread 1"). Phase 5 had framed the fix as
"content (full probe coverage) OR a new answer-verification subsystem (out of
scope)". **Both framings were wrong** — the mapping found the machinery already
exists and the defect is a definition, not a missing subsystem.

**Root cause (mapped through the real modules):** the fold's `verified` flag —
the gate on the strict-mastery counters (`verifiedCorrectAtCheck/Practice`,
read by `masteryVerifiedStrict` → `conceptMasteryVerdict`) — was defined by
ABSENCE: `signalVerificationStatus CLEAN|undefined && unauthoredKey !== true`.
A genuinely free-response prose answer has NO answer key, so `!unauthoredKey`
holds vacuously; the model self-reports correctness; `signalVerification`
returns CLEAN for any plausible non-bare, non-hedged, non-instant wrong answer
(it checks self-consistency, NOT a server grade). So a WRONG prose answer the
model marked correct banked a VERIFIED credit and could certify strict mastery
on nothing but the self-report. The POSITIVE fact — correctness came from
`gradeMcqAnswer` against an AUTHORED key — already existed at the route as
`gradedAgainstServerKey` but was never threaded into the fold.

**Second escape closed:** even after requiring positive provenance, a lesson
answered ENTIRELY through prose (verified=0, no contradictions, no unauthored
keys) is state-shape-identical to a pre-feature snapshot and would slip through
`masteryVerifiedStrict`'s legacy plain-counter fallback. Added an additive
`sawModernGrading` marker (set the first time the modern grading path — which
always supplies `serverGraded` — touches the session); the fallback now applies
only to sessions never touched by it, so a genuine pre-feature snapshot is
unaffected (behavior-preserving) but a modern prose-only lesson cannot certify.

**Change (one owner, monotone-tighter):**
- `TurnEvidence.serverGraded?: boolean` + `ConversationState.sawModernGrading`
  (additive, defaults false, no migration).
- fold: `const verified = evidence.serverGraded === true` (positive provenance;
  `serverGraded ⟹ old verified`, so no turn that used to verify stops).
- fold: `next.sawModernGrading = prev || evidence.serverGraded !== undefined`.
- `masteryVerifiedStrict`: legacy fallback also requires `!sawModernGrading`.
- route: hoisted `gradedAgainstServerKeyHoisted`, threaded `serverGraded` into
  BOTH advanceConversationState evidence objects (primary + fallback fold).

**Reachability / scope:** closes the MIXED lesson (a prose credit can no longer
stand in for a server grade — mastery is judged on server-graded evidence
alone) AND the PURE-PROSE lesson (no server grade anywhere ⟹ never certifies).
The plain ladder still advances on prose (lessons don't stall) — only the
completion authority tightened.

**Enforcement:** `freeResponseCannotVerifyMastery.test.ts` (drives the real
fold + gate: prose banks plain-not-verified; pure-prose lesson refused with
`sawModernGrading` denying the fallback; mixed lesson judged on server grades;
pre-feature session still certifies). Contract updates: `strictMastery` (the two
cases that pinned CLEAN-self-report→verified now assert the server-grade
requirement), `inventedKeyCannotVerify` + `unauthoredAnswerKey` (authored
control gets `serverGraded:true`; invented path closed by a 2nd independent
guard), `serverKeyBeatsVerification` (rename + new serverGraded-threading
assertion).

**Validation:** `npx tsc --noEmit` clean; full suite 537 files / 11,580 passed /
9 skipped; behavior-preserving for pre-feature snapshots by construction. Five
test files updated for the new contract; two structural guards
(`replayDrift` excuse list, `excursionLessonPause` negative control) updated with
the reason, not worked around.

**NOT done / honest residual:** no live-account run (behavior change is strictly
tighter — a self-report can only ever LOSE a mastery credit it should not have
had — and is fully fold-driven; a live run would only re-confirm). The DoD #13
matrix row for this class moves from DETECTION-only to PREVENTED once the suite
is green.

## CENSUS FULLY TRIAGED (2026-09-01)

All four OWNERSHIP_CENSUS targets + Census A are measured and resolved:
- #1 mastery — real reachable defect, FIXED (slice 1, one owner + 512-state grid).
- #2 acknowledgement — no reachable defect (masked), PINNED (slice 2).
- #3 learner-request/visual — complementary/coordinated via turnIntent +
  visualContract, PRESERVED (slice 6).
- #4 teaching action — layered (executor/strategy/renderer), CLEAN (slice 5).
- Census A — 27 repairs classified (slice 3, DoD #10); question-ship arbiter
  PINNED (slice 4, DoD #5).

One real correctness fix; four measured-and-pinned/preserved invariants; every
one with a falsifiable test or existing coverage. The recurring-defect ROOT — one
decision with multiple owners — was found live only at the mastery verdict; the
other decisions already had a single owner that prior sessions had built but not
documented or pinned. The value delivered: the fix, plus turning those
undocumented reconciliations into enforced, regression-proof invariants.

## Ranked remaining targets (beyond the census — future passes)

The census's named targets are exhausted. Genuine remaining architecture work,
for future passes (none is a known live defect — each needs Step-0 measurement
first, and the visual layer stays under the mission's preserve-don't-reopen rule):

- DoD #13 — a consolidated OFFLINE adversarial invariant matrix driving the real
  fold/gates/predicates through the historical failure classes (explanation/
  picture/question request, correct/incorrect answer, ack, "I understand",
  "what next", misconception, repeated explanation, visual mismatch,
  question-gating, mastery progression, excursion/recovery), asserting each
  invariant HOLDS. Slices 1/2/4 already pin several classes; this would unify
  them and cover the rest. Do NOT re-run 60 live concepts (mission rule).
- Census A Finding 3 (minor): one graded verdict rendered by 5788/7324 — measured
  disjoint/agree; pin only if a future edit makes them co-render.
- The prompt→enforcement ratio (Census C): ~231 imperative rule strings vs 27
  output checks. Each prompt-only rule that has been measured ignored is a
  candidate for structural enforcement — but only where a rule is BOTH
  load-bearing AND measured non-complied; do not convert cosmetic prose.

## Census A (post-hoc rewriting) — standing context

27 `cleanText = ` rewrite sites in route.ts repair the model's output after
generation. Each is a candidate for the classification the mission asks for
(safety / compat / duplicate-authority / missing-enforcement / content /
obsolete). NOT yet classified. Do not delete before establishing the
authoritative boundary each compensates for.

## Exact next action

The census's named targets are fully triaged (see "CENSUS FULLY TRIAGED" above)
AND DoD #13's consolidated invariant matrix is now written (slice 8,
`DOD13_INVARIANT_MATRIX.md`). Every recurring failure class the census and mission
named is now either PREVENTED-and-pinned or an explicitly-recorded detection-only
choice. **The mission's named scope is complete.**

Thread 1 (free-response mastery certification) is now CLOSED (slice 10, owner-
approved) — and the design showed it needed no new subsystem, just positive
provenance. Every DoD #13 matrix row now reads PREVENTED except the one deliberate
detection-only choice (question-only closing turn, which the never-fabricate rule
forbids rewriting). Remaining threads, none a known live defect:

1. **Census A Finding 3** (minor, pinned): one graded verdict rendered by
   5788/7324 — already MEASURED+PINNED (slice 9); only revisit if a future edit
   makes them co-render.
2. **Prompt→enforcement ratio** (Census C): MEASURED EMPTY — every documented
   measured-non-complied rule already has a structural enforcer. Convert another
   prompt rule ONLY with fresh evidence it is load-bearing AND measured ignored
   (needs a live run; do NOT re-run 60 live concepts on a loop's initiative).
3. **Question-only closing turn**: an owner decision (upstream generation change
   or authored close copy), deliberately not a post-hoc fabrication.

The mission's named scope — including its one previously-unprevented class — is
complete. Further work needs new measured evidence or an owner decision; wind down
rather than manufacture low-value work.
