# Physics re-measurement — the prediction held

**60 concepts, seed 2026, the same sample as the 2026-08-30 certification
sweep, so every comparison below is per-concept rather than between samples.
60/60 completed, 0 lesson drift, 0 discarded. 56 concepts shared with the
baseline.**

## The headline

| | baseline | now |
|---|---|---|
| verified mastery | 44/56 — **79%** | 53/56 — **95%** |

**Prediction recorded before the run: ~91%. Actual: 95%.** Ten concepts
fixed, one regressed.

Every one of the eight zero-slack near-misses converted, and so did all three
gate-starvation sessions:

```
+ phys.em.electric-field            + phys.qm.quantum-tunneling
+ phys.em.magnetic-dipole           + phys.therm.refrigerators
+ phys.mech.pressure-fluids         + phys.therm.thermodynamic-processes
+ phys.mech.stress-strain           + phys.opt.optical-instruments
+ phys.mod.binding-energy           + phys.particle.higgs-mechanism
- phys.em.self-inductance
```

This tested six changes at once — Session B's probe depth (3→5), and five
engine fixes: G-2b (the GUIDE treadmill), `answerConfirmation`,
`historyCompaction`, `dontKnowCeiling`, and the embedded figure locator. The
mastery number cannot attribute between them; the criteria below can, partly.

## The enforced criteria, 56 shared concepts

| criterion | base | now |
|---|---|---|
| C2 different approach | 94% | 95% |
| C3 diagram honest | 66% | 70% |
| C4 questions gradeable | 4% | 0% |
| C5 correct confirmed | 2% | 2% |
| C7 no verbatim reuse | 45% | 50% |
| C8 no content-free turns | 91% | 95% |
| C9 reaches and credits | 91% | **96%** |

Corpus rates, which is the form the gates are written in:

| | base | now | gate |
|---|---|---|---|
| C5 correct answers confirmed | 39% | **65%** | >= 90% |
| C4 questions carrying a key | 28% | 25% | >= 70% |

**C5 is the one criterion whose movement is cleanly attributable**: 39% → 65%
is `answerConfirmation` and nothing else. It has not reached its gate. The
per-lesson column reads 2% because that verdict needs 90% within a single
lesson, which most lessons still miss.

**C4 did not move, as expected** — E1 has not shipped. It is now the largest
remaining enforced gap in both subjects.

## C7 — my interim hope was wrong, and my original verdict was right

At 43/60 the run had split itself across a redeploy, and the two halves
disagreed sharply: 50% of at-risk sessions repeating before, 14% after
(p=0.11). I wrote that this might mean `historyCompaction` worked and my
"the fix failed" report had measured a stale build.

**At full sample that signal is gone.**

| at-risk sessions | repeated | clean | rate |
|---|---|---|---|
| pre-redeploy | 18 | 18 | 50% |
| post-redeploy | 11 | 13 | 46% |

**Fisher exact two-tailed p = 0.80.** No difference. The interim was noise at
n=7, which is exactly why it was reported as a direction and not a finding.
**`historyCompaction` did not work. My original verdict stands.**

### What the instrumentation did establish

Of 364 instrumented turns, 91 (25%) handed the authored explanation to the
model as retrieved context. Among the 19 verbatim-repeat turns:

- 8 had the explanation in the prompt
- 11 did **not**

So the retrieval cache is genuinely **enriched** among repeats (42% against a
25% base rate) and is a real contributor — but it cannot be the mechanism,
because **58% of repeats happen with the explanation absent from the prompt
and history compaction active.** There is a third path, and this run does not
identify it. C7 stays open with a narrowed suspect list rather than a fix.

## The one regression, not glossed

`phys.em.self-inductance` went from mastered to not: baseline served 3 keyed
probes and closed at chk 1 / prc 2; the new run served **zero** keyed probes
and closed at 0/0.

Its trace shows the failure shape plainly — the learner answers `½ L I²`
(correct) at T7 in GUIDE, the phase drops to DEMONSTRATE, and then T8–T12 sit
at DEMONSTRATE while the learner repeats the same answer five times against
model-invented MCQs. No keyed probe ever attaches, so nothing can be
credited. That is the "ungraded flood" class, which E1 targets.

**Honest framing:** this programme has already measured 2–3 per-concept flips
between runs with *no code change at all* (qa3/qa4/qa5). One regression
against ten fixes is within that historical churn, so it is not evidence of
harm from any specific change — but the mechanism is real and named rather
than waved away.

## What this leaves

- **C9 96%, mastery 95%** — the ceiling this programme was built to break is
  broken for physics.
- **C4 at 25%** is now the biggest enforced gap. E1 is unblocked.
- **C7 open**, with two channels closed or ruled out and a third unidentified.
- **C3 at 70%** — visual coverage, needing the warm pass and authored visuals
  for the concepts the critic declines.
