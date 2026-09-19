# math.prob.expected-value

## Identity
- **KG id**: `math.prob.expected-value`
- **Domain**: math.prob
- **Requires**: `math.prob.random-variable`, `math.prob.pmf`, `math.prob.pdf`
- **Unlocks**: `math.prob.variance`, `math.prob.moments`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Compute $E[X]=\sum_ix_iP(X=x_i)$ (discrete) or $E[X]=\int_{-\infty}^\infty xf(x)\,dx$
(continuous) as a PROBABILITY-WEIGHTED average, never the unweighted arithmetic mean; recognize
the discrete-sum and continuous-integral formulas as genuinely DIFFERENT computations, matched to
random-variable type; and recognize $E[X]$ as the distribution's BALANCE POINT, which NEED NOT be
a value $X$ can actually take.

## Core Understanding
$E[X]$ IS A PROBABILITY-WEIGHTED AVERAGE, NEVER THE UNWEIGHTED ARITHMETIC MEAN: for $P(X=2)=0.6,
P(X=8)=0.4$: $E[X]=2(0.6)+8(0.4)=4.4$ — NOT the midpoint $(2+8)/2=5$. The balance point sits BELOW
the midpoint precisely because $X=2$ is more likely; high-probability outcomes pull $E[X]$ toward
them, exactly as a weighted GPA (40% midterm, 60% final) differs from the simple average of the
two scores.

DISCRETE USES A SUM, CONTINUOUS USES AN INTEGRAL — GENUINELY DIFFERENT COMPUTATIONS, NEVER
INTERCHANGEABLE: for $X\sim U(1,5)$ with $f(x)=1/4$: $E[X]=\int_1^5x\cdot\frac14\,dx=
\frac14\left[\frac{x^2}2\right]_1^5=\frac14(12)=3$ — matching the symmetry formula $(1+5)/2=3$.
Attempting $\sum x\cdot P(X=x)$ here is meaningless: a continuous RV has $P(X=x)=0$ for EVERY
individual point, so no discrete sum applies — the integral is the exact continuous analogue,
replacing $\sum$ with $\int$ and $P(X=x)$ with $f(x)\,dx$.

$E[X]$ NEED NOT BE A VALUE $X$ CAN ACTUALLY TAKE: for a \$1 lottery ticket (win \$49 with
probability 0.01, lose \$1 with probability 0.99): $E[X]=49(0.01)+(-1)(0.99)=-\$0.50$ — a value
NO single play ever produces (you either net +\$49 or -\$1, never exactly -\$0.50). $E[X]$ is the
LONG-RUN average across many plays, never a claim about any individual outcome — rejecting a
fractional or "impossible" $E[X]$ as invalid misunderstands what the quantity represents.

## Mental Models
- **"E[X] is a weighted GPA, not a simple average — the higher-probability outcomes carry more
  weight, pulling the balance point toward them."**
- **"E[X] is the long-run average across many repetitions — it need not be, and often isn't, any
  single outcome X can actually produce."**

## Why Students Fail

### MC-1: ARITHMETIC-AVERAGE-CONFUSION
- **Surface form**: computes $(x_1+\cdots+x_n)/n$, treating each outcome as equally likely
  regardless of the given probabilities.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  "average" most commonly means the unweighted arithmetic mean in everyday usage, and this habit
  carries over incorrectly).
- **Repair**: re-derive the probability-weighted sum directly, re-anchoring on the weighted-GPA
  analogy.

### MC-2: DISCRETE-FORMULA-FOR-CONTINUOUS
- **Surface form**: writes $E[X]=\sum xP(X=x)$ for a continuous RV, plugging in individual point
  values.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared severity — the discrete
  formula is often learned first and generalized by surface analogy rather than by matching RV
  type).
- **Repair**: re-anchor on $P(X=x)=0$ for continuous RVs, re-deriving the integral as the exact
  analogue.

### MC-3: EXPECTED-MUST-BE-ACHIEVABLE
- **Surface form**: rejects a fractional or non-integer $E[X]$ as "impossible" because no single
  trial yields exactly that value.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared severity — "expected"
  in everyday language suggests "the anticipated outcome of a single trial," rather than a
  long-run average).
- **Repair**: re-anchor on the lottery example's long-run interpretation, explicitly distinguishing
  $E[X]$ from any single outcome.

## Misconceptions

### MC-1: ARITHMETIC-AVERAGE-CONFUSION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: DISCRETE-FORMULA-FOR-CONTINUOUS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: EXPECTED-MUST-BE-ACHIEVABLE
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"E[X] is a see-saw balance point — heavier (more probable) values pull it toward themselves,
  exactly like a weighted average."**
- **Anti-analogy**: $E[X]$ is NOT a prediction of any single trial's outcome — the -\$0.50
  lottery expectation is never what any individual ticket actually nets.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $P(X=2)=0.6,P(X=8)=0.4$: $E[X]=4.4$, pulled below the
  midpoint 5 by $X=2$'s higher probability.
- **Demonstration 2 (targets MC-2)**: $X\sim U(1,5)$: $E[X]=\int_1^5x\cdot\frac14\,dx=3$, matching
  the symmetry formula; the discrete sum formula is inapplicable here.
- **Demonstration 3 (targets MC-3)**: the \$1 lottery ticket's $E[X]=-\$0.50$, never an actual
  single-play outcome, but the correct long-run average.

## Discovery Questions
1. "Is E[X] the same as the unweighted arithmetic mean of X's possible values?"
2. "Can you use $\sum x\cdot P(X=x)$ to compute E[X] for a continuous random variable?"
3. "If E[X] comes out to a value X can never actually take, does that mean something went
   wrong?"

## Teaching Sequence
1. **Analogy bridge**: the weighted-GPA-to-probability-weighted-average bridge, working
   Demonstration 1's balance-point computation, isolating MC-1.
2. **Worked example pair**: a full discrete (lottery) and continuous (Uniform) computation,
   working Demonstration 2, isolating MC-2 by requiring the correct formula matched to RV type.
3. **Conceptual anchor**: Demonstration 3's long-run interpretation, isolating MC-3 by requiring
   the distinction between $E[X]$ and any single outcome stated explicitly.
4. **Mastery gate**: require a correct probability-weighted computation for a new discrete
   distribution, a correct integral computation for a new continuous distribution (cross-checked
   against symmetry where applicable), and a correct interpretation of a fractional or
   unachievable $E[X]$, at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept the unweighted arithmetic mean substituted for a probability-weighted $E[X]$
  computation.
- Never accept the discrete sum formula applied to a continuous random variable.
- Never accept a fractional or unachievable $E[X]$ rejected as invalid.

## Voice Teaching Notes
- Say "is that weighted by probability, or just an unweighted average?" whenever $E[X]$ is
  computed.
- When a continuous RV's expectation is requested, ask "are you summing, or integrating — which
  matches this random variable's type?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $E[X]$ for a new discrete distribution
  using the probability-weighted sum.
- **Rung 2 (application)**: learner correctly computes $E[X]$ for a new continuous distribution
  via integration.
- **Rung 3 (transfer)**: learner correctly applies linearity of expectation across repeated trials
  (e.g. total expected gain over $n$ plays), and correctly interprets an unachievable $E[X]$
  value.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the probability-weighted sum via the weighted-GPA analogy.
- If MC-2 recurs, re-anchor on $P(X=x)=0$ for continuous RVs and the integral analogue.
- If MC-3 recurs, re-anchor on the long-run-average interpretation.

## Memory Hooks
- "E[X] is weighted by probability, never a plain average."
- "Sum for discrete, integrate for continuous — match the formula to the RV type."
- "E[X] is a long-run average — it need not be any single achievable outcome."

## Transfer Connections
- `math.prob.random-variable` (already authored, this campaign, Batch 113): supplies the
  function-based RV framework this concept computes a weighted average over.
- `math.prob.pmf` (already authored, this campaign, Batch 117): supplies the discrete-sum
  probability weights this concept's discrete formula uses directly.
- `math.prob.pdf` (already authored, this campaign, Batch 119): supplies the continuous-integral
  probability weights this concept's continuous formula uses directly.
- `math.prob.variance` (not yet authored): the KG's declared unlock, building directly on
  $E[X^2]-(E[X])^2$, reusing this concept's expectation machinery.
- `math.prob.moments` (not yet authored): the KG's declared unlock, generalizing this concept's
  $E[X]$ to higher-order moments $E[X^k]$.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.expected-value.md`, reused by reference
  for its weighted-GPA analogy, its discrete/continuous worked example pair, its lottery
  long-run-average interpretation, and its three-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, computing a card-game payoff's PMF,
  expected value, and total expected gain over 200 plays via linearity.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.random-
  variable`/`math.prob.pmf`/`math.prob.pdf`, unlocks `math.prob.variance`/`math.prob.moments`,
  cross_links none, proficient/apply, mastery_threshold 0.9, estimated_hours 4) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 122): authored. First entry this batch. Companion batch concept:
  `math.real.series-rigorous`.
