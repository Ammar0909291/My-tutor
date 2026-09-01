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

## Ranked remaining targets (from OWNERSHIP_CENSUS_2026-09-01)

2. **"is this a substantive learner contribution?"** — 2 owners
   (`isBareAcknowledgement` masteryGate.ts, `isLowSignalAcknowledgement`
   conversationState.ts), measured 31% disagreement on 35 real utterances, in
   BOTH directions ("thanks" bare-not-lowsignal; "yeah that makes sense"
   lowsignal-not-bare). 8 consumers across route.ts / recoveryGuard /
   conversationReader / masteryGate. This is "the defect class fixed one
   utterance at a time." NEXT — but each of the 8 consumers must be read before
   merge (they gate different things: whether the turn is graded, completion-tag
   strip, CUE intent, distress registration).

3. learner-request / visual-request — 5 predicates, disagreement not yet
   measured.

4. teaching action — `decide()` vs CUE `decideTeaching` vs prompt blocks,
   disagreement not yet measured.

## Census A (post-hoc rewriting) — standing context

27 `cleanText = ` rewrite sites in route.ts repair the model's output after
generation. Each is a candidate for the classification the mission asks for
(safety / compat / duplicate-authority / missing-enforcement / content /
obsolete). NOT yet classified. Do not delete before establishing the
authoritative boundary each compensates for.

## Exact next action

Target #2: read all 8 consumers of the two acknowledgement predicates, determine
per-consumer whether the union semantics are safe, then consolidate to one owner
with a corpus-driven agreement test. Do not blindly merge.
