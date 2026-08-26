# Phase E — the first latch: why OBSERVE/DEMONSTRATE carry no authored probe

**Investigation only. No production code changed.**
Reproduction: `npx tsx scripts/qa/phase-e-first-latch-repro.ts` — real modules,
no provider, no DB, deterministic.

## 1. Why OBSERVE blocks authored probes

Not by an explicit decision. `isProbeAttachablePhase` was *widened* to GUIDE by
the A1 fix and simply stopped there; its comment argues only the GUIDE case.

But there is a real semantic reason underneath, and it is not the phase test —
it is what OBSERVE's question *is*. `decideNextMoveHeuristic` returns `'ask'`
for OBSERVE, and that ask is a **prior-knowledge probe** ("have you seen this
before?"), governed by `totalKnowledgeProbes` / `consecutivePriorKnowledgeProbes`
and concluded by `phaseAfterConcludedDiagnostic`. An authored assessment item
is a different speech act: it tests material the lesson has not yet delivered.
Attaching one at OBSERVE quizzes before teaching.

## 2. Why DEMONSTRATE blocks authored probes

**Measured, and this one is unambiguous.** `decideNextMoveHeuristic` returns
`'show'` for DEMONSTRATE at *every* reachable state — including when the learner
has explicitly asked to be questioned:

```
demonstrated=false consecutiveFailures=0  practiceRequested=true  ->  'show'
demonstrated=false consecutiveFailures=1  practiceRequested=true  ->  'show'
demonstrated=false consecutiveFailures=2  practiceRequested=true  ->  'show'
demonstrated=true  consecutiveFailures=0  practiceRequested=true  ->  'show'
demonstrated=true  consecutiveFailures=1  practiceRequested=true  ->  'show'
demonstrated=true  consecutiveFailures=2  practiceRequested=true  ->  'show'
```

`'show'` means "Ask NO questions". So a probe at DEMONSTRATE either (a) is gated
on the move and is therefore **vacuous**, or (b) is not gated and **contradicts
the ladder's own decision** — the defect shape `gateAssessment:475` calls "the
FIFTH root-cause fix of one recurring shape".

## 3. Is DEMONSTRATE safe for authored assessment? — NO, and it is also pointless

Unsafe for the reason above. Pointless because it has no headroom: DEMONSTRATE
dwell measured live across the last eight lessons is **1,1,1,2,1,1,1,2 turns**.
G-1 exits it on the first give. A phase that lasts one turn cannot be the
constraint.

## 4. Should OBSERVE remain probe-free? — YES, on this evidence

Option C (allow probes at OBSERVE) was simulated. It does escape OBSERVE — and
then **the stall simply moves to GUIDE**:

```
archetype A, policy A   O=12 D=0 G= 0   probes could= 0 fired=0   ->GUIDE  —   c=0 p=0
archetype A, policy C   O= 2 D=1 G= 9   probes could=12 fired=1   ->GUIDE  3   c=0 p=0
```

Twelve turns where the phase test allowed a probe, **one** where it actually
fired. Opening OBSERVE buys a phase transition and no assessment, at the cost of
quizzing before teaching. That is not the smallest safe change; it is not a
change worth making at all on this evidence.

## 5. Reachability traces (budget 12, production policy A)

```
A only answers questions          O=12 D=0 G= 0 C=0 P=0  probes 0/0    ->GUIDE —  c=0 p=0
B only asks for simpler words     O=12 D=0 G= 0 C=0 P=0  probes 0/0    ->GUIDE —  c=0 p=0
C only acknowledges               O= 1 D=1 G= 1 C=1 P=2  probes 4/3    ->GUIDE 2  c=1 p=2 MASTERED
D answers correctly when asked    O= 1 D=1 G= 1 C=1 P=2  probes 4/3    ->GUIDE 2  c=1 p=2 MASTERED
E alternates correct + confused   O= 1 D=1 G= 2 C=1 P=2  probes 5/3    ->GUIDE 2  c=1 p=2 MASTERED
```

**One acknowledgement collapses OBSERVE from 12 turns to 1, and mastery follows
in three more.** Archetypes A and B never acknowledge and never leave OBSERVE.

Simulator limit, stated: it grants correctness only from the AUTHORED gate, so
A and B are a lower bound — in production the model volunteers questions and
emits its own SIGNAL, which is why live OBSERVE dwell was 6–8 rather than 12.

## 6. Options compared

| | change | escapes OBSERVE | probes fired | mastery | safety |
|---|---|---|---|---|---|
| **A** | none (production) | only on ack / model question | 0–3 | reachable in 3 turns *if* the learner acknowledges early | baseline |
| **B** | +DEMONSTRATE | no | +0 fired | unchanged | **unsafe or vacuous** — DEMONSTRATE always decides `show` |
| **C** | +OBSERVE +DEMONSTRATE | yes | +1 fired | still 0/0 for A/B | quizzes before teaching; **stall moves to GUIDE** |
| **D** | extra deterministic OBSERVE exit, gate unchanged | yes, when the learner asks | unchanged | unchanged for these scripts | smallest surface; no probe moves |

All five regression invariants HOLD under A, B, C and D:
acknowledgement never increments check/practice; a wrong answer never does; a
degraded turn never advances the ladder; check/practice move only inside
CHECK/PRACTICE; and no policy grants mastery without graded evidence.

## 7. Smallest safe candidate — and why I am not proposing a probe-policy change

The probe policy is **not** where the smallest safe fix lives. On the evidence:

* DEMONSTRATE is a one-turn phase — nothing to buy (§3).
* OBSERVE opened only relocates the stall (§4).
* The real determinant is **how a learner leaves OBSERVE**, and today that is a
  graded-correct answer, an acknowledgement, or two concluded diagnostics.

The smallest candidate that addresses the measured cause is **Option D**: one
additional deterministic OBSERVE exit, reusing `asksForPractice` — the reading
the runtime already has — so that a learner who explicitly asks to be
questioned concludes the diagnostic, exactly as two failed observation probes
already do via `phaseAfterConcludedDiagnostic`. No probe is attached at OBSERVE,
no phase test changes, no new state, no new classifier.

**I am not recommending it be implemented yet**, because §12 below shows the
measured live shortfall is not fully explained by OBSERVE at all.

## 8. Tests required before any implementation

Every Part-5 invariant as a pinned test; plus: two concluded diagnostics still
exit OBSERVE unchanged; an explicit practice request at OBSERVE does not attach
a probe; the OBSERVE exit cannot be reached by an acknowledgement that is not
one; `phaseAfterConcludedDiagnostic`'s existing threshold is untouched; and the
five archetypes above pinned as a reachability regression.

## 9. Explicit-close regression strategy

CLOSE is upstream of every candidate here — none touches arbitration or
`closingTurnWithholdsQuestion`. The live control remains UNMEASURED (the control
lesson never reached CHECK, twice). Any implementation run must carry it, and it
must be run on a concept that has already reached CHECK in the same session.

## 10. Interaction with G-1 / G-2

None of A–D touches either. G-1 (a correct answer at DEMONSTRATE sets
`demonstrated` and moves to GUIDE) is what makes DEMONSTRATE a one-turn phase,
which is *why* Option B is pointless — so G-1 is load-bearing for that
conclusion, not endangered by it. G-2 lives in the remediation branch, which
returns before any of this.

## 11. Is 12 turns sufficient? — YES, amply

Archetypes C/D/E reach verified mastery in **3–4 turns** of a 12-turn budget
once OBSERVE is exited promptly. The budget was never the constraint and must
not be touched.

## 12. Is the remaining failure really assessment-availability?

**No — that is the honest answer, and it is the most important line here.**

Assessment availability is *a* constraint but not the binding one. The binding
one is **OBSERVE-exit determinism**: a learner whose utterances register as
neither acknowledgement nor graded answer sits in OBSERVE indefinitely, and no
probe policy changes that because the gate is not what is holding them.

A second, separate constraint is visible in the Option C trace and is already
documented in `decideNextMoveHeuristic`'s PHASE 7H comment: at GUIDE the gate
needs `move === 'ask'`, `teachSegmentsSinceQuestion` resets on ANY assistant
question including a model-volunteered one, so with a chatty model the counter
is pinned at 0 and only an explicit practice request opens the gate. Measured
here: 12 allowed turns, 1 fired.

Both are upstream of probe attachment. Changing `isProbeAttachablePhase` would
address neither.

## Separate open issue, NOT bundled

`route.ts:6455` synthesizes `{correctness:false}` on every recovery turn, so
standard-English confusion spends the affect budget at the same rate as a wrong
answer. Untouched, and left for its own product decision.
