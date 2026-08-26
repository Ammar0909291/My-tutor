# Phase E — can `turnsInCurrentPhase` make GUIDE assessment deterministic?

**Investigation only. No production code changed.**
Reproduction: `npx tsx scripts/qa/phase-e-guide-cadence-candidate.ts`

## THE PLAIN ANSWER: NO — and not for a safety reason

The candidate is **safe** (14/14 pedagogical controls pass, 4/4 mastery
controls pass) and **fits the budget** (worst case exactly 12 turns at N=3).
It is nevertheless **unreachable in exactly the case it was designed for.**

`decideNextMoveHeuristic` checks the anti-interrogation budget **above** the
phase switch and returns there:

```
if (state.questionsAskedSinceTeach >= 2)
    return state.consecutiveFailures >= 1 ? 'show' : 'teach'     <-- RETURNS
...
case 'GUIDE': return (teachSegmentsSinceQuestion >= 2 || practiceRequested) ? 'ask' : 'teach'
```

Traced on the real live harness script with a chatty model:

```
turn | phase       dwell qAST tSSQ | prodMove  earlierGate
   9 | GUIDE           0    2    0 | teach     FIRED
  10 | GUIDE           1    2    0 | teach     FIRED
  11 | GUIDE           2    2    0 | teach     FIRED
  12 | GUIDE           3    2    0 | teach     FIRED   <- dwell reaches the floor, switch never reached
```

`questionsAskedSinceTeach` is pinned at 2 from turn 8 onward — it is zeroed only
on a turn where `askedQuestion` is false, and PHASE 7N-1(ii) made an unsanctioned
model question *hold* it rather than spend it, so it stops growing but never
shrinks. A dwell disjunct placed inside the GUIDE switch is therefore dead code
for the chatty model.

**Placing it ABOVE the anti-interrogation gate would work — and that is
precisely "turn the tutor into a premature quiz machine".** The gate exists to
stop the learner being asked twice with nothing given in between. Overriding it
on a timer is the harm, not the fix.

## Part 1 — threshold sweep

With a fixed floor N, starting *from* GUIDE, behaviour is clean and monotonic:

```
floor N=1 -> first attaches at GUIDE dwell 1 (turn 2 of the stay)
floor N=2 -> dwell 2 (turn 3)
floor N=3 -> dwell 3 (turn 4)
floor N=4 -> dwell 4 (turn 5)
floor N=5 -> dwell 5 (turn 6)
```

An unanswered probe on screen blocks at every dwell, as it must. **N=3 is the
smallest threshold that both leaves room for teaching before the first question
and fits the 12-turn budget** (§8) — but see the verdict: reachability, not
threshold choice, is what fails.

## Part 2/3 — full ladder, six archetypes × four model styles

**Zero rows changed** for the five synthetic archetypes: they either never leave
OBSERVE (A, B, F) or clear GUIDE in one turn on an acknowledgement (C, D, E), so
the dwell floor never accumulates. On the **real live harness cycle**, which is
the only script that actually dwells at GUIDE:

```
always-TEACH         prod  O=7 D=1 G=1 C=1 P=2  probes 4  MASTERED
                     N=3   identical            probes 4  MASTERED
always-ASK           prod  O=7 D=1 G=4          probes 0
                     N=3   O=7 D=1 G=4          probes 0        <- NO CHANGE
alternate            prod                       probes 0
                     N=3                        probes 1, reached CHECK, c=0 p=0  <- changed, insufficient
chatty-teach-with-?  prod                       probes 0
                     N=3                        probes 0        <- NO CHANGE
```

The teaching model already masters under production. The chatty models are
unhelped. One row improves by a single probe and still reaches no mastery.

## Part 4 + 9 — pedagogical and explicit-close safety: 14/14 OK

```
OBSERVE dwell 99            no probe      DEMONSTRATE dwell 99        no probe
GUIDE dwell 99              probe         CHECK / PRACTICE            probe
TRANSFER                    no probe      GUIDE while CLOSING         no probe
GUIDE while recovery        no probe      unanswered probe on screen  no probe
after ONE wrong answer      probe         after TWO wrong (struggle)  no probe
mid-remediation             no probe      after a degraded turn       no probe
after explicit stop         no probe
```

The explicit-close case is safe **structurally, not incidentally**: the
candidate only changes a `move`, and both CLOSE conjuncts —
`arbitrateTurn(...).allows('AUTHORED_PROBE')` and
`closingTurnWithholdsQuestion` — are evaluated downstream of the move and are
untouched. A degraded turn is safe for free: `advanceConversationState` **pins**
`turnsInCurrentPhase` on a degraded turn rather than incrementing it, so an
outage cannot walk the learner toward a quiz.

## Part 5 — state-variable ownership

| variable | written by | resets when | model text? | learner text? | phase change? | degraded? | remediation? |
|---|---|---|---|---|---|---|---|
| `turnsInCurrentPhase` | `foldTurnsInCurrentPhase`, at **every** return point | on any phase change | **no** | no | resets to 0 | **pinned, not incremented** | folded (remediation branch folds it too) |
| `teachSegmentsSinceQuestion` | fold | on ANY `askedQuestion` | **YES — any "?"** | no | no | no | no |
| `questionsAskedSinceTeach` | fold | only when `askedQuestion` false | **YES** | no | no | no | no |
| `practiceRequested` | `asksForPractice` per turn | per turn | no | **YES** | no | no | no |
| `demonstrated` | `deliveredAGive` | never cleared within a concept | no | no | no | blocked when degraded | no |

**Can the model defeat the floor?** No — `turnsInCurrentPhase` is genuinely
model-independent. Nothing about it reads assistant text. The model can only
*advance the phase*, which resets it, and advancing the phase is progress. So
the candidate's premise holds; it is the placement that fails.

## Part 6 — remediation interaction: none, and for a good reason

```
"I don't understand" × 12 at GUIDE   production: 0 probes, ends DEMONSTRATE
                                     N=3:        0 probes, ends DEMONSTRATE
```
Identical. The remediation branch returns early and demotes, so GUIDE is left
before the floor can accumulate. The candidate does not quiz a learner who is
asking for an explanation.

## Part 7 — mastery safety: 4/4 SAFE

100 acknowledgements, 100 wrong answers, 100 degraded turns, and 100 forced ASK
turns without a correct answer all end at `c=0 p=0 mastered=false`. Degraded
turns also consume no budget (`turnsOnConcept` stayed 0).

## Part 8 — budget arithmetic, budget unchanged

```
 1  OBSERVE exit                1  DEMONSTRATE delivery       3  GUIDE dwell to floor
 1  GUIDE assessment + pass     1  CHECK correct              2  PRACTICE correct ×2
 1  one WRONG answer            1  re-earn the lost rung      1  one remediation turn
——
12  worst case          CONCEPT_TURN_BUDGET = 12 — fits with ZERO slack
    N=2 -> 11 fits      N=3 -> 12 fits      N=4 -> 13 DOES NOT FIT
```

## Part 10 — answers

1. **Is GUIDE model-dependent today?** Yes, narrowly — for a learner producing
   neither a recognised acknowledgement nor a recognised practice request.
2. **Does `turnsInCurrentPhase` remove that dependency?** **No.** The counter is
   genuinely model-independent, but the blocker (`questionsAskedSinceTeach >= 2`)
   sits above the point where a dwell disjunct could be read.
3. **Smallest safe threshold?** N=3 if it were reachable — smallest that leaves
   teaching room and still fits 12 turns.
4–9. **Preserves GUIDE / OBSERVE / DEMONSTRATE / CLOSE / mastery integrity /
   G-1 / G-2 / the spiral fix?** Yes to all, measured — the candidate is safe.
   It is simply ineffective.
10. **Another upstream fixed point remains?** Yes, two, both previously
   reported: the remediation early return pinning OBSERVE, and the absence of
   any assessment-readiness representation.

## VERDICT

**Do not implement the GUIDE-dwell candidate.** It is safe, budget-feasible and
model-independent, and it does not work: the gate that actually blocks the
chatty-model case is checked earlier, and the only way to reach past it is to
override the anti-interrogation protection — the exact harm the question was
asking us to avoid.

The real finding is that `questionsAskedSinceTeach` is a **one-way counter**:
it is spent by sanctioned asks, held by unsanctioned ones, and reset only by a
model turn containing no question mark. Whether that asymmetry should stand is a
product decision, not a tidy-up, and it is where the next investigation should
go — not to the probe policy and not to a dwell floor.

## Separate open issues, still not bundled

`route.ts:6455` synthesizes `{correctness:false}` on every recovery turn.
The remediation early return (`observeFailures` never incremented).
