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

## Ranked remaining targets

- **Finding 1 — the question-ship arbiter (NEXT, success-condition #5).** Build
  one post-model owner of "is a question on screen this turn" that the withholds
  (5816/6733/6766) and the adds (5737/6897) both consult, so an add can never
  follow a withhold on the same turn. FIRST resolve the reachability question:
  can 6897's completion-nudge fire on a turn 6733/6766 withheld? Measure through
  the real fold before consolidating (slice-1 discipline). Multi-step, hot-path —
  establish the boundary, prove equivalence, migrate the 5 sites, then pin.
- census target #3: learner-request / visual-request — 5 predicates
  (`detectLearnerRequest`, `requestedVisualForm`, `isExplicitTopicRequest`,
  `decideVisualNeed`, `isTopicQuestion`), disagreement not yet measured.
- census target #4: teaching action — `decide()` vs CUE `decideTeaching` vs
  prompt blocks, disagreement not yet measured.

4. teaching action — `decide()` vs CUE `decideTeaching` vs prompt blocks,
   disagreement not yet measured.

## Census A (post-hoc rewriting) — standing context

27 `cleanText = ` rewrite sites in route.ts repair the model's output after
generation. Each is a candidate for the classification the mission asks for
(safety / compat / duplicate-authority / missing-enforcement / content /
obsolete). NOT yet classified. Do not delete before establishing the
authoritative boundary each compensates for.

## Exact next action

Finding 1 — the question-ship arbiter. Step 0: measure whether 6897's
completion-nudge can reach the same turn as a 6733/6766 withhold, through the
real fold. If reachable → a single arbiter is required (a genuine defect); if
disjoint → pin the disjointness so a future edit can't make them overlap. Then
(deferred, larger): Census A Finding 3 (one server-verdict stater), then census

Target #3: learner-request / visual-request — 5 predicates named by the census
(`detectLearnerRequest`, `requestedVisualForm`, `isExplicitTopicRequest`,
`decideVisualNeed`, `isTopicQuestion`), disagreement NOT yet measured. Apply the
same methodology: measure disagreement over a real-utterance corpus, trace each
consumer, find any REACHABLE contradiction driven through the real fold, and
consolidate only where a live defect exists (slice 1 pattern) vs pin the existing
reconciliation (slice 2 pattern). Then Census A: classify the 27 post-hoc
`cleanText =` rewrite sites (safety / compat / duplicate-authority /
missing-enforcement / content / obsolete) toward Definition-of-Done #10.
