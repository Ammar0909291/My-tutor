# Phase E — does the teaching ladder depend on model variance?

**Investigation only. No production code changed.**
Reproduction: `npx tsx scripts/qa/phase-e-progression-bottleneck.ts`

## THE PLAIN ANSWER

**For one specific learner shape, yes.** A learner who neither acknowledges in
wording the detector recognises nor uses a recognised practice phrasing can be
held at GUIDE indefinitely, and whether they are ever assessed is decided by
whether the LLM happens to write a turn containing no question mark.

Same learner utterance, same code, 40 GUIDE turns, only the model's text varies:

```
"ok but why it happen like that"  model ends turns with "?"  -> 0 probes, still GUIDE, tSSQ pinned 0
"ok but why it happen like that"  model sometimes asks nothing -> 1 probe on turn 3, reaches CHECK
"hmm i think i get little bit"    (same pair)                  -> 0 probes / 1 probe
"can you show picture please"     (same pair)                  -> 0 probes / 1 probe
```

**Everywhere else it does not.** At CHECK and PRACTICE `isMasteryGatePhase`
makes attachment unconditional, so once a learner reaches CHECK the model's
style stops mattering entirely. And a learner who acknowledges, or who asks for
practice, passes GUIDE in one turn regardless of model style — measured across
four model styles × two learners, 8/8 reached mastery.

So the dependency is narrow and precise: **it is the GUIDE→CHECK crossing, for a
learner who produces neither of the two recognised signals.**

## 1. The OBSERVE exit graph

Driven through the real fold. **There is no OBSERVE → GUIDE edge**; every exit
lands on DEMONSTRATE.

| input | detector | after | exits | deterministic? |
|---|---|---|---|---|
| graded CORRECT | SIGNAL / `gradeMcqAnswer` | DEMONSTRATE | YES | needs a question to exist |
| acknowledgement | `isLowSignalAcknowledgement` | DEMONSTRATE | YES | needs recognised ack wording |
| graded WRONG × 1 | — | OBSERVE | no | — |
| graded WRONG × 2 | `phaseAfterConcludedDiagnostic` | DEMONSTRATE | YES | needs TWO questions |
| recovery utterance × 2 | `detectFailureState` | DEMONSTRATE | YES | needs the detector to match |
| `explain_differently` × 20 | `detectLearnerRequest` | **OBSERVE** | **no** | — |
| diagram request × 10 | `detectLearnerRequest` | OBSERVE | no | — |
| no signal × 20 | — | OBSERVE | no | — |
| a pure give × 20 | — | OBSERVE | no | — |

### The remediation early return is a fixed point

```
"I don't understand" × 30  -> phase OBSERVE, consecutiveFailures 30,
                              observeFailures 0, consecutiveDontKnows 30
"I am confused"      × 30  -> identical
```

The remediation branch **returns above** the `failed` branch, so it never
increments `observeFailures` and never calls `phaseAfterConcludedDiagnostic`.
`consecutiveFailures` climbs forever and only changes the MOVE. That is exactly
the "a move-layer escape cannot advance a ladder" defect QL-2 already fixed once
— for the other path. A learner in *standard English* saying "I don't
understand" thirty times never leaves OBSERVE.

## 2. The GUIDE gate, and why `move !== 'ask'` blocks assessment

`route.ts`'s `phaseAllowsProbe` is `isMasteryGatePhase(phase) || (GUIDE && move === 'ask')`.
At GUIDE the move comes from:

```
case 'GUIDE': return (teachSegmentsSinceQuestion >= 2 || practiceRequested) ? 'ask' : 'teach'
```

Every way `teachSegmentsSinceQuestion` changes, exhaustively (conversationState:623-625):

```
if (evidence.askedQuestion) next.teachSegmentsSinceQuestion = 0
else                        next.teachSegmentsSinceQuestion = prev + 1
```

and `askedQuestion` comes from the **model's own output**:

```
askedQuestionThisTurn = repliesWithQuestion(cleanText) || mcqHoisted !== null
repliesWithQuestion(t) = t contains "?" outside code fences
```

**So a tutor that ends its turn with a question — ordinary good teaching — holds
the counter at 0 forever, `>= 2` never becomes true, and for a learner who does
not trigger `practiceRequested` the branch returns `'teach'` on every turn.**
This is documented from the other side in the PHASE 7H comment, which narrowed
`questionsAskedSinceTeach` for the same reason and left
`teachSegmentsSinceQuestion` deliberately unchanged.

Measured: `questionsAskedSinceTeach` is **not** the blocker here (it read 0 in
every trace). The blocker is `teachSegmentsSinceQuestion`.

## 3. Is "the tutor decided to teach" being treated as "not ready to assess"?

**Yes, and they are conflated by construction.**

`grep -rniE "assessmentDue|questionDue|probeDue|evidenceNeeded|readyForCheck|needsAssessment|dueForQuestion"` over
`src/lib` and `src/app` returns **nothing**. No such field, flag or predicate
exists anywhere in the runtime. Pedagogical readiness has no representation of
its own; the presentation decision (`move`) stands in for it.

## 4. Model-variance experiment

Four model styles × two learners, real `repliesWithQuestion` deciding
`askedQuestion` from real text:

```
F cooperates, never asks for practice   asks-every-turn / teaches / never-asks / alternates  -> 8/8 MASTERED
E cooperates AND asks for practice      (same four)                                          -> 8/8 MASTERED
```

Both of those learners acknowledge, so they clear GUIDE in one turn and the
model cannot matter. The dependency appears only for the third shape — neither
ack nor practice request — shown in §THE PLAIN ANSWER.

**An instrument correction made mid-investigation, recorded rather than
buried:** the first version derived `deliveredTeaching` from "did the model
ask", which produced a spectacular but false result (11 turns stuck at
DEMONSTRATE). `route.ts:5686` derives it from the SERVER's decided move
(`'teach' || 'show'`). Corrected, that finding vanished entirely. It was an
artifact of my simulator, not a property of the product.

## 5. Smallest existing-signal candidates — none implemented

Signals that already exist and could mean "the learner is ready for a question"
at GUIDE, ranked by how little they disturb:

1. **`turnsInCurrentPhase`** — already folded on every transition
   (`foldTurnsInCurrentPhase`), already persisted, and **immune to the model's
   wording** because nothing about it reads the assistant's text. Today it has
   exactly one consumer (`route.ts:3195`, `phaseJustAdvanced`). A GUIDE dwell
   test would give the cadence a floor the model cannot pin. No new state, no
   classifier, no threshold change.
2. `demonstrated` — true by construction at GUIDE, so on its own it is a
   constant there and cannot pace anything.
3. `teachSegmentsSinceQuestion` counted the way its sibling already is —
   `questionsAskedSinceTeach` was narrowed by PHASE 7N-1(ii) so an unsanctioned
   model question holds rather than spends it. The asymmetry is deliberate and
   documented, so changing it is a real semantic decision, not a tidy-up.

**I am not recommending any of these yet.** §6 shows the OBSERVE candidate does
not survive contact with measurement, and the same caution applies here until
it is measured.

## 6. Does the proposed OBSERVE practice-request exit solve anything? — NO

Simulated against the real modules:

```
production (no exit)      O=12 D=0 G= 0 C=0 P=0 | probes 0 | c=0 p=0
WITH the candidate exit   O= 1 D=1 G=10 C=0 P=0 | probes 0 | c=0 p=0
```

**It moves the bottleneck from OBSERVE to GUIDE and produces zero assessment
opportunities.** Eleven turns are relocated; not one question is asked. Saying
so plainly, as instructed: the candidate from the previous investigation does
not solve the problem and should not be implemented.

## 7. Negative controls

Nothing here touches CLOSE, arbitration, `closingTurnWithholdsQuestion`, the
affect budget, confusion classification, grading, mastery thresholds,
`CONCEPT_TURN_BUDGET`, G-1, G-2, or `isProbeAttachablePhase`. The five
invariants pinned in the previous investigation still hold, and the live
explicit-close control remains UNMEASURED.

## 12. Another root cause upstream — yes, two

1. **The remediation early return** (§1) — a standard-English confusion loop
   pins OBSERVE permanently. Upstream of every probe policy.
2. **No representation of assessment readiness** (§3) — the runtime infers it
   from a presentation choice, which is why the model's wording can decide
   whether a learner is ever assessed.

## Separate open issue, still not bundled

`route.ts:6455` synthesizes `{correctness:false}` on every recovery turn.
Untouched.
