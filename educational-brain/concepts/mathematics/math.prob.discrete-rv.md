# math.prob.discrete-rv

## Identity
- **KG id**: `math.prob.discrete-rv`
- **Domain**: math.prob
- **Requires**: `math.prob.random-variable`
- **Unlocks**: `math.prob.pmf`, `math.prob.discrete-distributions`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Define the PROBABILITY MASS FUNCTION (PMF) $p(x)=P(X=x)$ as the complete numerical
characterization of a discrete random variable's distribution; verify PMF validity via TWO
required conditions — $p(x)\ge0$ for all $x$, AND $\sum p(x_i)=1$ EXACTLY; identify the SUPPORT
$\{x:p(x)>0\}$ without conflating it with the PMF's full domain $\mathbb R$; and distinguish the
PMF $p(x)=P(X=x)$ from the CDF $F(x)=P(X\le x)$.

## Core Understanding
NORMALIZATION MUST HOLD EXACTLY — $\sum p(x_i)=1$ IS FORCED BY THE PROBABILITY AXIOMS, NEVER
OPTIONAL: for $X\in\{1,2,3\}$ with $p(1)=0.4,p(2)=0.4,p(3)=0.3$, the sum is $1.1\ne1$ — INVALID,
since the events $\{X=1\},\{X=2\},\{X=3\}$ are mutually exclusive and exhaustive, so by
`math.prob.probability-axioms`'s own axioms, $\sum P(X=x_i)=P(\Omega)=1$ is not a convention but a
direct consequence. A valid fix: $p(3)=0.2$, giving sum exactly 1.0.

THE SUPPORT IS WHERE $p(x)>0$ — THE PMF IS STILL DEFINED (AND EQUALS ZERO) EVERYWHERE ELSE: for a
six-sided die, support $=\{1,\ldots,6\}$; $p(7)=P(X=7)=0$ — not because 7 is "outside the PMF's
domain," but because the PMF IS defined on all of $\mathbb R$ and simply equals 0 there. The
support is never "all the values the PMF is defined for" — it is specifically where the PMF is
POSITIVE.

THE PMF AND CDF ARE DIFFERENT OBJECTS COMPUTING DIFFERENT THINGS: for $p(0)=0.1,p(1)=0.3,p(2)=0.4,
p(3)=0.2$: the PMF $p(2)=0.4$ gives $P(X=2)$ — the probability of EXACTLY 2; the CDF
$F(2)=P(X\le2)=p(0)+p(1)+p(2)=0.8$ gives the probability of AT MOST 2 — a SUM of PMF values, never
identical to any single $p(x)$ value except by coincidence.

## Mental Models
- **"Every PMF assignment is a single system — check the total sums to exactly 1 before trusting
  any individual value, never treat entries as independent guesses."**
- **"The support is where the bars in the probability histogram actually have height — the PMF
  itself is defined everywhere, just invisible (zero) outside the support."**

## Why Students Fail

### MC-1: PMF-SUMS-NOT-ONE
- **Surface form**: writes a PMF where $\sum p(x)\ne1$ without flagging the error, assigning
  probabilities by intuition without checking normalization.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  assigning each $p(x)$ value feels like an independent choice, obscuring the global constraint
  linking them all).
- **Repair**: re-derive normalization directly from the probability axioms (mutually exclusive,
  exhaustive events summing to $P(\Omega)=1$).

### MC-2: SUPPORT-IS-ALL-REALS
- **Surface form**: believes $p(x)$ must be defined (and nonzero) for all $x\in\mathbb R$,
  confused when $p(x)=0$ for most values.
- **Birth type**: Type 3, language contamination (Blueprint's own declared Secondary severity —
  "the PMF's domain" and "the PMF's support" are easy to conflate).
- **Repair**: re-anchor on the die example — $p(7)=0$ because $7$ is simply impossible, not
  because it's outside the PMF's domain.

### MC-3: PMF-IS-CDF
- **Surface form**: writes $P(X\le x)$ when asked for the PMF $p(x)$, or uses cumulative values as
  if they were individual probabilities.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared Secondary severity — both
  $p(x)$ and $F(x)$ are single real-valued functions of $x$, inviting notation-level confusion).
- **Repair**: re-anchor on the numeric contrast — $p(2)=0.4$ (exactly 2) versus
  $F(2)=0.1+0.3+0.4=0.8$ (at most 2).

## Misconceptions

### MC-1: PMF-SUMS-NOT-ONE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: SUPPORT-IS-ALL-REALS
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: PMF-IS-CDF
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A PMF is a fixed-size pie — every slice (probability) must be assigned so the whole pie
  (total probability) comes out to exactly one, no more, no less."**
- **Anti-analogy**: the support is NOT "everywhere the PMF is defined" — the PMF is defined on the
  whole real line; the support is only where it's positive.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $p(1)=0.4,p(2)=0.4,p(3)=0.3$ sums to $1.1$ — invalid;
  fixing to $p(3)=0.2$ gives sum exactly 1.0.
- **Demonstration 2 (targets MC-2)**: a die's support $\{1,\ldots,6\}$; $p(7)=0$, $p(-5)=0$ — the
  PMF is defined everywhere, zero outside the support.
- **Demonstration 3 (targets MC-3)**: $p(2)=0.4$ (exactly 2) versus $F(2)=p(0)+p(1)+p(2)=0.8$ (at
  most 2) — different numbers, different meanings.

## Discovery Questions
1. "Does a PMF need to be checked for anything beyond assigning a probability to each value?"
2. "Must $p(x)$ be defined (or nonzero) for every real number $x$?"
3. "Is $p(x)$ the same as $P(X\le x)$?"

## Teaching Sequence
1. **Analogy bridge + representation shift**: the die's PMF table, verifying normalization,
   isolating MC-1 by requiring the sum checked explicitly.
2. **Misconception gate**: Demonstration 1's invalid-PMF diagnosis and fix, re-deriving
   normalization from the probability axioms.
3. **Contrast pair**: Demonstration 2's support-versus-domain distinction and Demonstration 3's
   PMF-versus-CDF numeric contrast, isolating MC-2 and MC-3 respectively.
4. **Mastery gate**: require a correct PMF validity check for a new proposed table, a correct
   support identification, and a correct PMF-versus-CDF distinction with computation, at the
   Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a PMF table without verifying $\sum p(x)=1$ exactly.
- Never accept "support" used to mean "everywhere the PMF is defined."
- Never accept $p(x)$ and $F(x)$ used interchangeably.

## Voice Teaching Notes
- Say "does that PMF sum to exactly 1?" whenever a new PMF table is proposed.
- When support is discussed, ask "is that where p(x) is positive, or everywhere it's defined?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies whether a proposed PMF table is valid.
- **Rung 2 (application)**: learner correctly identifies the support and computes event
  probabilities by summing PMF values.
- **Rung 3 (transfer)**: learner correctly constructs a full PMF table for a new two-stage random
  experiment (e.g. two coin flips), verifies normalization, and computes a cumulative probability
  correctly distinguishing it from the PMF.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive normalization from the probability axioms.
- If MC-2 recurs, re-anchor on the die example's $p(7)=0$.
- If MC-3 recurs, re-anchor on the numeric $p(2)$-versus-$F(2)$ contrast.

## Memory Hooks
- "Every PMF must sum to exactly 1 — forced by the axioms, never optional."
- "Support is where p(x) is positive — the PMF is defined everywhere, zero elsewhere."
- "p(x) is exactly x; F(x) is at most x — different questions, different numbers."

## Transfer Connections
- `math.prob.random-variable` (already authored, this campaign, Batch 113): supplies the
  $X:\Omega\to\mathbb R$ function and $P(X=x)$ notation this concept's PMF directly builds on.
- `math.prob.probability-axioms` (already authored, certified domain): supplies the axioms
  ($P(\Omega)=1$, additivity over mutually exclusive events) that force the normalization
  condition.
- `math.prob.pmf` (not yet authored): the KG's declared unlock, studying PMF properties and named
  families (Bernoulli, Binomial) in depth.
- `math.prob.discrete-distributions` (not yet authored): the KG's declared unlock, studying
  specific named PMF families (Poisson, Geometric) built on this concept's validity conditions.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.discrete-rv.md`, reused by reference
  for its PMF-as-probability-table framing, its normalization-derived-from-axioms argument, its
  support-versus-domain contrast, its PMF-versus-CDF numeric contrast, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, constructing the complete PMF for
  the number of heads in two flips of a biased coin ($P(H)=2/3$), verifying normalization, and
  computing $P(X\ge1)$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.random-
  variable`, unlocks `math.prob.pmf`/`math.prob.discrete-distributions`, cross_links none,
  proficient/understand, mastery_threshold 0.9, estimated_hours 3) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 115): authored. Second entry this batch. Companion batch concept:
  `math.meas.lebesgue-integral`.
