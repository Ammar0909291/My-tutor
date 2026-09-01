# Ownership Census — how many components can answer one question?

**Date**: 2026-09-01
**Method**: mechanical measurement against the real modules and the real KG. No
transcripts, no QA campaign, no runtime change. Every number below is
reproducible from the commands recorded with it.
**Scope**: `src/app/api/learn/chat/route.ts` and `src/lib/teaching/**`.

---

## Why this document exists

For the last day the repair strategy has been: run a physics session, find a
defect, fix the leaf module, pin a test. Forty-six commits of that shape. It
works — every one of those defects is really gone — but the defect *rate* has
not fallen, and two of the last three findings came from a log line that had
already been read once.

This census asks a different question, and answers it from the code rather
than from transcripts:

> **For a given decision, how many components in the runtime can produce it,
> and do they agree?**

A decision with two owners is not a style problem. It is a defect generator:
it produces a new bug every time either owner is changed, and the bug appears
in whichever component was not being edited at the time.

---

## Census A — post-hoc rewriting of the model's own text

```
grep -c "cleanText = " src/app/api/learn/chat/route.ts
```

**27 sites** rewrite the model's response after it was generated (28 matches,
minus the initial `let cleanText = text`).

They include: strip IPA notation, strip raw image URLs, normalise math
delimiters, the affirmation ceiling, the verifier gate, the ungraded-question
withhold, the closing-prose withhold, the stance verdict, the
`[LESSON_COMPLETE]` strip (twice), the unbacked-figure-reference strip, the
scaffold-heading strip, the attribution guard, the mirror repair, the
deduplicator, the remediation output contract, and the residual machine-tag
strip.

**What this measures:** the architecture's centre of gravity. Correctness is
not produced; it is *repaired afterwards*. Each of those 27 exists because a
rule stated in the prompt was not followed.

## Census B — competing definitions of one question

### B1. "Is this message a substantive learner contribution?" — two answers

Two exported predicates:

| predicate | file |
|---|---|
| `isBareAcknowledgement` | `masteryGate.ts:114` |
| `isLowSignalAcknowledgement` | `conversationState.ts:1814` |

Run against a 35-utterance corpus, every entry taken verbatim from a
transcript captured this session or from a test pinned on one:

> **They disagree on 11 of 35 (31%) — and in both directions.**

```
  bare=true  lowSignal=false  "thanks"
  bare=false lowSignal=true   "i see"
  bare=false lowSignal=true   "ok, i think i follow so far"
  bare=false lowSignal=true   "yeah that makes sense"
  bare=false lowSignal=true   "right, i understand that"
  bare=false lowSignal=true   "ok what next"
  bare=false lowSignal=true   "i follow"
  bare=false lowSignal=true   "i'm with you"
  bare=false lowSignal=true   "that makes sense"
  bare=false lowSignal=true   "ok got it thanks"
  bare=false lowSignal=true   "mhm"
```

They are not nested subsets. `"thanks"` inverts them.

**What each one gates** (call sites, tests excluded):

`isLowSignalAcknowledgement`
- `route.ts:5346` — **`teachingSignal = null`**. Whether the turn is graded at all.
- `route.ts:4478` — `ackToQuestion`
- `route.ts:3259` — `lowSignalAckHoisted`, the turn directive
- `recoveryGuard.ts:401` — whether the message can register as distress

`isBareAcknowledgement`
- `masteryGate.ts:281` — strips `[LESSON_COMPLETE]`
- `masteryGate.ts:221` — a mastery refusal
- `conversationReader.ts:127` — the CUE `studentIntent`
- `route.ts:2169` — a lesson-progression branch

So for `"thanks"`: the signal is **not** nulled, so the model's self-reported
correctness is applied to the ladder — while the other predicate simultaneously
classifies the same message as a bare acknowledgement and strips a completion
tag. One message, two readings, two subsystems.

**This is the defect class I have been fixing one utterance at a time.** Three
commits in the last day (`3ee4ec1` "ok, what next" demoted the learner,
`1ad473c` "I understand" moved them backwards, `393073b` interleaved glue) all
widened `isLowSignalAcknowledgement` and left the other definition alone. The
census is the reason that approach does not converge.

### B2. "Has this learner mastered the concept?" — three answers

| predicate | file | rule |
|---|---|---|
| `masteryVerified` | `masteryGate.ts:43` | `check>=1 && practice>=2` |
| `masteryVerifiedStrict` | `masteryGate.ts:61` | verified counters, contradictions, invented keys |
| `hasDemonstratedMastery` | `conceptBudget.ts:140` | `practice>=2 \|\| phase==='TRANSFER'` |

(and `isConceptClosed`, `lessonAttempt.ts:191`, which is `hasDemonstratedMastery
\|\| budget exhausted`.)

Over an 864-combination grid of phase x correctAtCheck x correctAtPractice x
verified counters x invented-key count:

> **The three disagree on 492 of 864 (57%).**
> **396 (46%) are the specific shape: the permanent record says MASTERED while
> the completion gate refuses to authorise `[LESSON_COMPLETE]`.**

`hasDemonstratedMastery` ignores `correctAtCheck` entirely and accepts
`phase === 'TRANSFER'` on its own, with no graded evidence at all.

**Reachability is measured for at least one of them, not assumed.** The comment
block in `lessonSummary.ts:63-88` records this exact divergence observed live on
2026-09-01, `phys.mech.friction`, real account:

```
correctAtCheck 1   verifiedCorrectAtCheck 0
correctAtPractice 2   verifiedCorrectAtPractice 2
unauthoredKeyGrades 2
```

The gate correctly refused. The record went through a different function, wrote
`COMPLETED`, and told the learner "You mastered: Friction Forces" — on evidence
including a graded item whose key the model invented **and got wrong** (it keyed
7.9 N where mu*mg*cos30 = 10.4 N, a value not among its own four options).

Commit `00fdec0` closed that one shape by making `conceptOutcome` consult
`launderedEvidence`. **It closed one of 396.** Whether the remaining 395 are all
runtime-reachable is **UNKNOWN** — that is the point: nobody can say, because
the question has three owners.

## Census C — rules asked for vs rules enforced

```
grep -c "systemPrompt +=" src/app/api/learn/chat/route.ts          -> 71
grep -roh "do NOT|Do NOT|NEVER|MUST|MUST NOT|mandatory|never ..."  -> 231
```

**71 prompt-append sites. ~231 imperative rule strings** ("do NOT" x115,
"NEVER" x30, "mandatory" x29, "MUST" x16, "MUST NOT" x9, "never repeat" x7 ...)
in prompt-building code.

Against **27 points** where the output is actually inspected (Census A).

The ratio is the finding, not the exact counts — one repair can cover several
rules, and some strings are variants. But the shape is unambiguous: **the
prompt asks for roughly an order of magnitude more than the runtime checks.**

Measured consequences already in the record:
- the authored explanation was reproduced **word-for-word in 37 of 57 physics
  sessions (65%)** — five sibling artefacts carried an explicit "do NOT repeat"
  line and explanations did not (`PHYSICS_TEACHABILITY_STATUS.md`)
- a RECOVERY block saying "Stop ALL questions this turn" was measured being
  ignored; the fix was to withhold the question in code (`054473a`)
- seven prompt blocks each claimed authority over "everything above"
  (`PHASE3_ARBITRATION_AUDIT.md`)

---

## What already works, and is the template

`turnArbitration.ts` is the one place in this repository where a decision was
given a single owner. It replaced seven prose authority claims with one
enumerated ladder —

```
RECOVERY > LEARNER_REQUEST > CLOSE > COMPLETE > TEACH   (floor, always claims)
```

— and, critically, **losing actions are ABSENT from the prompt rather than
out-argued inside it.** That is the difference between a request and a
constraint, and it is the pattern the two censuses above say should be applied
next.

## Ranked consolidation targets, by measured defect surface

| # | decision | owners | disagreement | consequence when they diverge |
|---|---|---|---|---|
| 1 | mastery | 3 (+1 derived) | 57% of 864 states; 46% record-vs-gate | a learner is told they mastered something the gate refused to certify |
| 2 | "is this a substantive contribution" | 2 | 31% of 35 real utterances | an acknowledgement is graded as an answer, or an answer is discarded |
| 3 | learner request / visual request | 5 (`detectLearnerRequest`, `requestedVisualForm`, `isExplicitTopicRequest`, `decideVisualNeed`, `isTopicQuestion`) | not yet measured | UNKNOWN |
| 4 | teaching action | 3 partial (`decide()`, CUE `decideTeaching`, prompt blocks) | not yet measured | UNKNOWN |

## What this census does NOT establish

- It does **not** show that all 396 mastery divergences are reachable at
  runtime. One is measured; the rest are an untested surface.
- It does **not** measure targets 3 and 4. They are named because the predicates
  exist, not because disagreement has been demonstrated.
- It does **not** prove consolidation would have prevented any specific past
  bug. It shows the bugs and the divergences are the same shape.

## Reproducing this

Every number above comes from the commands quoted inline plus two throwaway
scripts driving the real exported predicates — the acknowledgement corpus and
the mastery grid. Neither is committed; both are ten lines over the real
modules, and the point is that they can be rewritten in a minute from the
tables above rather than trusted.
