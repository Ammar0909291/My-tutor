# math.prob.chebyshev

## Identity
- **KG id**: `math.prob.chebyshev`
- **Domain**: math.prob
- **Requires**: `math.prob.variance`
- **Unlocks**: `math.prob.lln`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
State Chebyshev's inequality $P(|X-\mu|\ge k\sigma)\le1/k^2$ as an UPPER BOUND, never the exact
probability; recognize the inequality holds for ANY distribution with finite mean and variance —
distribution-freeness is the entire point, never a limitation requiring the shape to be "worked
around"; and correctly STANDARDIZE $k$=(raw deviation)/$\sigma$ before applying the formula, never
substituting a raw deviation directly.

## Core Understanding
CHEBYSHEV IS A CEILING, NEVER THE EXACT PROBABILITY: for $\mu=50,\sigma=5,k=2$:
$P(|X-50|\ge10)\le\frac1{2^2}=0.25$ — but for a NORMAL random variable specifically, the ACTUAL
probability at $k=2$ is $\approx0.0455$, more than FIVE TIMES smaller than the bound. The bound
must remain valid for the WORST-CASE distribution consistent with that $\mu,\sigma$ — for
well-behaved distributions like Normal, the true probability is typically far below the ceiling.

DISTRIBUTION-FREENESS IS THE ENTIRE POINT — NEVER A REASON TO DEMAND THE SHAPE FIRST: given only
$\mu=1000,\sigma=50$ hours (lifetime distribution unmodeled, possibly skewed), bounding
$P(|X-1000|\ge100)$: since $100=2\sigma$, Chebyshev gives $\le1/4$ IMMEDIATELY — no distributional
assumption is needed, available, or would help beyond what $\mu,\sigma$ already provide. Insisting
"we can't answer without knowing the distribution" misses that Chebyshev exists EXACTLY for this
situation — its derivation never uses the shape of $X$ at any step.

$k$ MUST BE STANDARDIZED — A RAW DEVIATION IS NEVER SUBSTITUTED DIRECTLY: for $\mu=200,\sigma=10$,
bounding $P(|X-200|\ge40)$: the raw deviation is 40 (original units), so $k=40/10=4$, giving
bound $1/16=0.0625$. Plugging $k=40$ directly gives the nonsensical $1/1600$ — SIXTEEN TIMES
smaller, conflating "40 units away" (a modest, 4-standard-deviation event) with "40 STANDARD
DEVIATIONS away" (an astronomically more extreme claim).

## Mental Models
- **"Chebyshev's number is a guaranteed ceiling — a specific distribution's true probability sits
  somewhere below it, often far below, but never above."**
- **"k always means 'how many standard deviations' — a raw deviation must be divided by σ first,
  every single time, before the formula applies."**

## Why Students Fail

### MC-1: BOUND-IS-EXACT
- **Surface form**: treats $P(|X-\mu|\ge k\sigma)\le1/k^2$ as an equality, reporting $1/k^2$ as
  THE probability.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  the formula's clean, single-number output invites treating it as a precise answer rather than a
  hedge).
- **Repair**: re-compare the bound against a Normal distribution's actual (much smaller) tail
  probability at the same $k$.

### MC-2: DISTRIBUTION-SPECIFIC-ASSUMPTION
- **Surface form**: believes Chebyshev can only be applied when the distribution is known.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — most other
  probability tools (Normal tables, specific PMF formulas) DO require knowing the distribution,
  making this assumption feel natural here too).
- **Repair**: re-anchor on the derivation using only the definition of variance, never the shape
  of $X$, at any step.

### MC-3: RAW-DEVIATION-NOT-STANDARDIZED
- **Surface form**: substitutes a raw deviation directly for $k$, without dividing by $\sigma$
  first.
- **Birth type**: Type 3, language contamination (Blueprint's own declared severity — "deviation"
  in the problem statement and "$k$" in the formula both look like the same quantity, obscuring
  the required division).
- **Repair**: re-derive $k$ from the raw deviation divided by $\sigma$ explicitly, contrasting
  with the incorrect direct substitution.

## Misconceptions

### MC-1: BOUND-IS-EXACT
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: DISTRIBUTION-SPECIFIC-ASSUMPTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: RAW-DEVIATION-NOT-STANDARDIZED
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Chebyshev's bound is a worst-case insurance ceiling — it must cover every possible
  distribution with that mean and variance, so it's necessarily generous for any well-behaved
  one."**
- **Anti-analogy**: needing to know the distribution shape is NOT a prerequisite for Chebyshev —
  it's the one probability tool designed to work when the shape is genuinely unknown.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $k=2$: Chebyshev bound 0.25 versus Normal's actual
  $\approx0.0455$ — a 5x gap.
- **Demonstration 2 (targets MC-2)**: a factory's lifetime data with unmodeled distribution shape,
  bounded immediately via $\mu,\sigma$ alone.
- **Demonstration 3 (targets MC-3)**: $\mu=200,\sigma=10$, deviation 40: correct $k=4$ giving
  $1/16$; incorrect $k=40$ giving a nonsensical $1/1600$.

## Discovery Questions
1. "If Chebyshev gives P(|X-μ|≥2σ)≤0.25, is the actual probability exactly 0.25?"
2. "Can Chebyshev's inequality be applied when the distribution's shape is completely unknown?"
3. "If a deviation is stated in raw units, can that number be plugged directly in for k?"

## Teaching Sequence
1. **Representation shift**: concrete bound computations for $k=2,3$, working the worst-case
   pictorial argument, introducing standardization and universality.
2. **Contrast pair**: Demonstration 1's Normal-versus-bound gap (MC-1), Demonstration 2's
   distribution-free application (MC-2), and Demonstration 3's standardization contrast (MC-3).
3. **Mastery gate**: require a correct bound computation with standardized $k$ for a new scenario,
   a correct true/false judgment on bound-versus-exact, and a correct minimum-$k$ computation for
   a target bound, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept Chebyshev's bound reported as the exact probability.
- Never accept "we need to know the distribution first" as a valid objection to applying
  Chebyshev.
- Never accept a raw deviation substituted directly for $k$ without dividing by $\sigma$.

## Voice Teaching Notes
- Say "is that the exact probability, or an upper bound?" whenever a Chebyshev result is stated.
- When a deviation is given in raw units, ask "did you divide by sigma to get k?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a Chebyshev bound with standardized $k$
  for a new scenario.
- **Rung 2 (application)**: learner correctly applies Chebyshev to a distribution-free scenario
  without demanding distributional information.
- **Rung 3 (transfer)**: learner correctly reasons about how the bound changes as $\sigma$
  changes for a fixed raw deviation, and evaluates a real-world fat-tails argument for why
  Chebyshev's distribution-freeness is a genuine advantage.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compare the bound against the Normal distribution's actual tail probability.
- If MC-2 recurs, re-anchor on the shape-free derivation.
- If MC-3 recurs, re-derive $k$ from the raw deviation divided by $\sigma$.

## Memory Hooks
- "Chebyshev is a ceiling, never the exact answer."
- "No distribution needed — that's the whole point, not a limitation."
- "Always divide by sigma to get k — never plug in the raw deviation."

## Transfer Connections
- `math.prob.variance` (already authored, this campaign, Batch 123): supplies $\sigma$ (from
  $\text{Var}(X)=\sigma^2$) as the unit $k$ is measured in.
- `math.prob.lln` (not yet authored): the KG's declared unlock, proving the (weak) Law of Large
  Numbers by applying Chebyshev directly to the sample mean's shrinking variance.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.chebyshev.md`, reused by reference for
  its concrete bound computations, its Normal-tail-versus-bound contrast, its distribution-free
  application scenario, its standardization contrast, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, bounding an investment fund's
  return deviation, evaluating a fat-tails argument for Chebyshev's practical advantage, and
  reasoning about the bound's sensitivity to $\sigma$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.variance`,
  unlocks `math.prob.lln`, cross_links none, proficient/apply, mastery_threshold 0.85,
  estimated_hours 3) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 125): authored. First entry this batch. Companion batch concept:
  `math.real.open-sets`.
