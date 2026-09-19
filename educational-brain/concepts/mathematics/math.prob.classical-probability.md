# math.prob.classical-probability

## Identity
- **KG id**: `math.prob.classical-probability`
- **Domain**: math.prob
- **Requires**: `math.prob.probability-axioms`, `math.disc.counting-principles`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
State the classical probability formula $P(A)=|A|/|\Omega|$ and its PRECONDITION — every outcome
in $\Omega$ must be EQUALLY LIKELY, never merely listed; apply the formula to standard
experiments (coins, dice, cards); verify the classical measure satisfies the Kolmogorov axioms;
and identify when the equally-likely assumption fails, so the classical formula does NOT apply.

## Core Understanding
EQUALLY LIKELY IS A PRECONDITION TO CHECK, NEVER A CONSEQUENCE OF LISTING OUTCOMES: for a biased
coin landing heads 70% of the time, $\Omega=\{H,T\}$ — two outcomes, but NOT equally likely.
Applying $P(H)=|A|/|\Omega|=1/2$ gives a result that directly CONTRADICTS the known 70% bias. The
classical formula requires physical symmetry (a fair die, a well-shuffled deck, a symmetric
spinner) to be verified FIRST — merely having a short, clean list of outcomes proves nothing about
their being equally likely.

"FAVORABLE" MEANS MEMBERSHIP IN $A$, NEVER "OUTCOMES I PREFER": for a fair die roll wanting "at
least 3": $A=\{3,4,5,6\}$ — ALL FOUR of these outcomes make the event occur, so $|A|=4$, giving
$P(A)=4/6=2/3$. "Favorable" is a technical term meaning $\omega\in A$, completely unrelated to
which specific outcome a problem-solver might personally want (e.g. wanting to roll a 6
specifically does NOT mean only 6 counts as favorable for the event "at least 3").

THE SAMPLE SPACE MUST BE A PROPER PARTITION — MUTUALLY EXCLUSIVE AND EXHAUSTIVE, NEVER PADDED
WITH OVERLAPPING ENTRIES: for two dice summing to 7, using $\Omega=\{2,3,\ldots,12\}$ (11
outcomes, NOT equally likely) and naively computing $P=1/11$ is WRONG. The correct $\Omega$ is the
36 ORDERED pairs $(1,1),(1,2),\ldots,(6,6)$ — each genuinely equally likely — with exactly 6 pairs
summing to 7, giving the correct $P=6/36=1/6$. Adding an overlapping "any even number" entry to a
die's $\Omega=\{1,\ldots,6\}$ double-counts outcomes already present (2, 4, 6), producing
nonsensical fractions — outcomes must be minimal, non-overlapping building blocks.

## Mental Models
- **"Classical probability is exactly lottery-ticket reasoning: your chance equals the tickets you
  hold divided by the total tickets sold — but only if every ticket was drawn from the same
  symmetric pool."**
- **"'Favorable' is a technical membership test, not a personal preference — count every outcome
  that satisfies the event, whether or not it's the one you were hoping for."**

## Why Students Fail

### MC-1: CLASSICAL-PROBABILITY-WORKS-FOR-ANY-EXPERIMENT
- **Surface form**: applies $P(A)=|A|/|\Omega|$ to a biased coin, treating "two listed outcomes"
  as sufficient for the formula to apply.
- **Birth type**: the equally-likely condition is easy to treat as automatic once outcomes are
  simply enumerable, rather than as a separate physical claim requiring verification.
- **Repair**: re-check the biased coin's stated 70% bias directly against the formula's wrong
  50/50 output.

### MC-2: FAVORABLE-MEANS-OUTCOMES-I-WANT
- **Surface form**: treats "favorable outcomes" as only the outcome the problem-solver personally
  prefers, rather than every outcome satisfying the event.
- **Birth type**: everyday usage of "favorable" (meaning "good" or "desired") contaminates the
  technical set-membership meaning.
- **Repair**: re-write the event as an explicit set and count its elements directly.

### MC-3: MORE-OUTCOMES-LISTED-MEANS-MORE-ACCURATE
- **Surface form**: believes adding more entries to $\Omega$ (even overlapping ones) improves
  precision.
- **Birth type**: a natural but incorrect intuition that "more detail" always helps, missing the
  mutual-exclusivity requirement.
- **Repair**: re-derive the two-dice sum-of-7 example with the correct 36-outcome sample space,
  contrasted against the wrong 11-outcome attempt.

## Misconceptions

### MC-1: CLASSICAL-PROBABILITY-WORKS-FOR-ANY-EXPERIMENT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: FAVORABLE-MEANS-OUTCOMES-I-WANT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: MORE-OUTCOMES-LISTED-MEANS-MORE-ACCURATE
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Classical probability is lottery-ticket math: your odds are tickets-you-hold over
  tickets-sold, but only because every ticket was equally likely to be drawn in the first
  place."**
- **Anti-analogy**: listing more outcomes is NOT the same as gaining precision — overlapping or
  unequally-likely entries make the formula's output meaningless, not more accurate.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the biased coin's $P(H)=1/2$ formula output directly
  contradicting its stated 70% bias.
- **Demonstration 2 (targets MC-2)**: the "at least 3" die-roll event, with all four qualifying
  outcomes correctly counted as favorable.
- **Demonstration 3 (targets MC-3)**: the two-dice sum-of-7 problem, wrong 11-outcome $\Omega$
  versus the correct 36-outcome $\Omega$.

## Discovery Questions
1. "A biased coin lands heads 70% of the time. With Ω={H,T}, is P(H)=1/2?"
2. "For 'roll at least 3' on a fair die, which outcomes count as favorable?"
3. "Does listing Ω={1,2,3,4,5,6,'any even number'} give a more precise probability for a die
   roll?"

## Teaching Sequence
1. **Representation shift**: the classical formula and its axiom verification, working the
   standard coin/dice/card examples.
2. **Conflict evidence**: the biased-coin counterexample, isolating MC-1.
3. **Conceptual anchor**: the "favorable" membership test on the "at least 3" event, isolating
   MC-2; the two-dice correct-vs-wrong sample space, isolating MC-3.
4. **Mastery gate**: require a correct classical probability computation for a new symmetric
   experiment, a correct identification of when the formula fails, and a correct favorable-set
   construction for a compound event.

## Tutor Actions
- Never accept the classical formula applied without first verifying the equally-likely
  precondition.
- Never accept "favorable" restricted to only the problem-solver's preferred outcome.
- Never accept a sample space padded with overlapping or non-equally-likely entries.

## Voice Teaching Notes
- Say "is this experiment actually symmetric, or just listed with few outcomes?" whenever the
  classical formula is invoked.
- When an event's favorable outcomes are counted, ask "does that outcome make the event true,
  regardless of preference?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies $P(A)=|A|/|\Omega|$ to a standard symmetric
  experiment.
- **Rung 2 (application)**: learner correctly identifies a biased or asymmetric scenario where the
  classical formula does not apply.
- **Rung 3 (transfer)**: learner correctly constructs the proper equally-likely sample space for a
  compound experiment (e.g. two dice) rather than a naive, non-uniform one.

## Tutor Recovery Strategy
- If MC-1 recurs, re-check the biased-coin counterexample directly.
- If MC-2 recurs, re-write the event as an explicit set and re-count.
- If MC-3 recurs, re-derive the correct 36-outcome two-dice sample space.

## Memory Hooks
- "Equally likely is a precondition to verify — never a guarantee from simply listing outcomes."
- "Favorable means 'satisfies the event' — not 'the outcome you personally want.'"
- "The sample space must be mutually exclusive and exhaustive — padding it with overlaps breaks
  the formula."

## Transfer Connections
- `math.prob.probability-axioms` (already authored, certified domain): supplies the Kolmogorov
  axioms this concept's classical measure is verified to satisfy.
- `math.disc.counting-principles` (already authored, certified domain): supplies the systematic
  counting techniques needed to compute $|A|$ and $|\Omega|$.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.classical-probability.md`, reused by
  reference for its biased-coin counterexample, its favorable-outcomes clarification, its
  two-dice sample-space correction, and its three-misconception library (adopted directly as
  declared).
- Transfer probe: the Blueprint's own assessment items, applying the formula to marbles-in-a-bag
  and biased-die scenarios requiring correct precondition checking.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.probability-axioms`/`math.disc.counting-principles`, unlocks none, cross_links none,
  developing/apply, mastery_threshold 0.9, estimated_hours 3) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 141): authored. First entry this batch. Companion batch concept:
  `math.prob.markov-chain`.
