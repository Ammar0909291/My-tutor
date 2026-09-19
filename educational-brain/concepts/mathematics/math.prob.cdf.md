# math.prob.cdf

## Identity
- **KG id**: `math.prob.cdf`
- **Domain**: math.prob
- **Requires**: `math.prob.random-variable`
- **Unlocks**: `math.prob.quantile`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Define the CDF $F(x)=P(X\le x)$ and its three defining properties — NON-DECREASING,
RIGHT-CONTINUOUS, and $F(-\infty)=0,F(\infty)=1$; compute $F(x)$ for discrete RVs via SUMMATION of
the PMF and for continuous RVs via INTEGRATION of the PDF, as one unified object; and use
$P(a<X\le b)=F(b)-F(a)$, correctly handling the STRICT-versus-NON-STRICT endpoint distinction
($P(X<b)\ne P(X\le b)$ in general).

## Core Understanding
THE CDF ACCUMULATES PROBABILITY UP TO $x$, FORCING NON-DECREASE AND RIGHT-CONTINUITY: $F(x)=
P(X\le x)$ means, as $x$ grows, the event $\{X\le x\}$ only GROWS (never shrinks), so its
probability cannot decrease — a decreasing "CDF" is definitionally impossible. For a fair coin
encoded $X=0,1$: $F(x)=0$ for $x<0$, $F(x)=1/2$ for $0\le x<1$, $F(x)=1$ for $x\ge1$ — non-
decreasing throughout, and right-continuous at $x=0$ (the value $F(0)=1/2$ matches the limit from
the right, not the left, which is 0).

DISCRETE USES SUMMATION, CONTINUOUS USES INTEGRATION — THE SAME DEFINITION, DIFFERENT MACHINERY:
for discrete $X$ with PMF $p(k)$: $F(x)=\sum_{k\le x}p(k)$, a step function. For continuous $X$
with PDF $f(t)$: $F(x)=\int_{-\infty}^xf(t)\,dt$, a smooth curve — e.g. uniform on $[0,2]$ gives
$F(x)=x/2$ for $0\le x\le2$. Both compute the identical quantity $P(X\le x)$; only the aggregation
method (sum versus integral) differs, reusing `math.prob.random-variable`'s own discrete/
continuous distinction directly.

THE STRICT-VERSUS-NON-STRICT DISTINCTION MATTERS PRECISELY WHEN $X$ HAS AN ATOM AT THE BOUNDARY:
for the coin-flip $X$, $F(1)=P(X\le1)=1$ (both outcomes included), but $P(X<1)$ EXCLUDES $X=1$,
leaving only $X=0$, so $P(X<1)=1/2\ne F(1)=1$ — genuinely different. For a CONTINUOUS $X$ (uniform
on $[0,2]$): $P(X<1.5)$ and $P(X\le1.5)=F(1.5)=0.75$ ARE equal, since $P(X=1.5)=0$ for continuous
random variables. The gap between strict and non-strict appears ONLY when $X$ carries positive
probability at the exact boundary — the discrete/atom case, never in general.

## Mental Models
- **"F(x) answers 'what's the chance X came out at most x?' — as x sweeps left to right, this
  accumulated probability can only climb, never fall."**
- **"Strict versus non-strict only matters where the random variable can land EXACTLY on the
  boundary with positive probability — for continuous distributions, that gap always vanishes."**

## Why Students Fail

### MC-1: STRICT-AND-NONSTRICT-INEQUALITY-CONFLATED
- **Surface form**: assumes $P(X<b)$ always equals $P(X\le b)=F(b)$.
- **Birth type**: Type 3, language contamination (Blueprint's own declared Foundational severity —
  "less than" and "at most" feel interchangeable in casual usage, obscuring the atom-dependent
  gap).
- **Repair**: re-walk the coin-flip's direct computation showing $1/2\ne1$, then check whether $X$
  can land exactly on the boundary with positive probability.

### MC-2: CDF-COMPUTATION-METHOD-MISMATCHED-TO-RV-TYPE
- **Surface form**: attempts to integrate a PMF or sum a PDF, instead of matching summation to
  discrete and integration to continuous.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  the unified $F(x)=P(X\le x)$ definition can obscure that the COMPUTATION method still depends on
  the underlying RV type).
- **Repair**: re-anchor on the discrete-versus-continuous distinction, re-deriving the sum and
  integral procedures side by side.

### MC-3: CDF-ASSUMED-NON-DECREASING-VIOLATION-POSSIBLE
- **Surface form**: believes a computed "CDF" that decreases somewhere could still be valid.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared Moderate severity — a
  computational error producing a local decrease might be mistaken for a valid, unusual
  distribution rather than recognized as definitionally impossible).
- **Repair**: re-derive directly from $F(x)=P(X\le x)$ that $\{X\le x_1\}\subseteq\{X\le x_2\}$
  whenever $x_1<x_2$, so probability cannot decrease.

## Misconceptions

### MC-1: STRICT-AND-NONSTRICT-INEQUALITY-CONFLATED
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: CDF-COMPUTATION-METHOD-MISMATCHED-TO-RV-TYPE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: CDF-ASSUMED-NON-DECREASING-VIOLATION-POSSIBLE
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The CDF is a running total meter — it only ever ticks up or holds steady as x increases,
  never backward."**
- **Anti-analogy**: $P(X<b)$ and $P(X\le b)$ are NOT interchangeable in general — they coincide
  only when $X$ cannot land exactly on $b$ with positive probability.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: the coin-flip step function $F(x)=0,1/2,1$ — non-decreasing
  and right-continuous throughout.
- **Demonstration 2 (targets MC-2)**: discrete sum $F(x)=\sum_{k\le x}p(k)$ versus continuous
  integral $F(x)=\int_{-\infty}^xf(t)\,dt=x/2$ for uniform$[0,2]$.
- **Demonstration 3 (targets MC-1)**: $P(X<1)=1/2\ne F(1)=1$ for the discrete coin-flip; $P(X<1.5)
  =P(X\le1.5)=0.75$ for the continuous uniform case.

## Discovery Questions
1. "Is $P(X<b)$ always equal to $P(X\le b)=F(b)$?"
2. "Do you sum or integrate to compute a CDF — does it depend on whether X is discrete or
   continuous?"
3. "Could a computed 'CDF' that decreases somewhere still be valid?"

## Teaching Sequence
1. **Representation shift**: state the accumulation definition directly, working Demonstration 1's
   step-function verification, isolating MC-3 by requiring non-decrease derived from the
   definition.
2. **Contrast pair**: Demonstration 2's sum-versus-integral procedures, isolating MC-2 by requiring
   the correct method matched to RV type.
3. **Conflict evidence**: Demonstration 3's strict-versus-non-strict computation, isolating MC-1 by
   requiring the atom-dependence checked explicitly.
4. **Mastery gate**: require a correct CDF computation for a new discrete and continuous RV, a
   correct interval-probability computation via $F(b)-F(a)$, and a correct strict-versus-
   non-strict distinction for a new discrete scenario, at the Blueprint's own stated MAMR of 5/5
   (⌈0.9×5⌉).

## Tutor Actions
- Never accept $P(X<b)$ and $P(X\le b)$ treated as always equal without checking for an atom at
  $b$.
- Never accept a "CDF" accepted as valid if it decreases anywhere.

## Voice Teaching Notes
- Say "can X land exactly on that boundary with positive probability?" whenever strict-versus-
  non-strict is discussed.
- When a CDF is computed, ask "does this match discrete summation or continuous integration for
  this random variable?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $F(x)$ for a new discrete or continuous
  random variable using the matching method.
- **Rung 2 (application)**: learner correctly computes an interval probability via
  $F(b)-F(a)$.
- **Rung 3 (transfer)**: learner correctly explains, for a new continuous scenario, why $P(X<b)$
  and $P(X\le b)$ coincide, contrasting with a discrete case where they differ.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the coin-flip computation and check for an atom at the boundary.
- If MC-2 recurs, re-derive the sum and integral procedures side by side.
- If MC-3 recurs, re-derive non-decrease directly from the set-containment argument.

## Memory Hooks
- "F only climbs or holds — never falls, by definition."
- "Sum for discrete, integrate for continuous — same formula, different machinery."
- "Strict versus non-strict only matters where there's an atom at the boundary."

## Transfer Connections
- `math.prob.random-variable` (already authored, this campaign, Batch 113): supplies the
  discrete/continuous distinction and the measurable-function definition of $X$ this concept
  accumulates probability over.
- `math.prob.discrete-rv` (already authored, this campaign, Batch 115): supplies the PMF this
  concept's discrete CDF computation sums directly.
- `math.prob.quantile` (not yet authored): the KG's declared unlock, defined as the inverse of
  this concept's accumulation function.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.cdf.md`, reused by reference for its
  accumulation-based definition, its discrete-sum-versus-continuous-integral contrast, its
  strict-versus-non-strict endpoint subtlety, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, examining a ride-sharing wait-time
  CDF $F(x)=1-e^{-x/5}$, verifying boundary limits, computing an interval probability, and
  confirming strict/non-strict equality for the continuous case.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.random-
  variable`, unlocks `math.prob.quantile`, cross_links none, proficient/apply, mastery_threshold
  0.9, estimated_hours 3) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 116): authored. Second entry this batch. Companion batch concept:
  `math.meas.convergence-theorems`.
