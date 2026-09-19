# math.prob.markov-inequality

## Identity
- **KG id**: `math.prob.markov-inequality`
- **Domain**: math.prob
- **Requires**: `math.prob.expected-value`
- **Unlocks**: `math.prob.chebyshev` (KG-declared; note: `math.prob.chebyshev`'s own `requires`
  field lists only `math.prob.variance`, not this concept — a live KG unlocks/requires asymmetry,
  not a Blueprint discrepancy; both fields verified to match their respective live KG entries
  exactly)
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 2

## Learning Objective
State Markov's inequality (for $X\ge0$ and $a>0$, $P(X\ge a)\le E[X]/a$); prove it in one line
from the definition of expectation; apply it to bound tail probabilities using ONLY the mean;
recognize when the bound is TIGHT (a two-point distribution concentrated at $\{0,a\}$); and
identify that Markov requires $X\ge0$ with NO distributional assumptions beyond a finite mean —
never restricted to a specific named distribution.

## Core Understanding
THE ONE-LINE PROOF, DIRECTLY FROM THE DEFINITION OF EXPECTATION: $E[X]=E[X\cdot\mathbb 1_{X\ge a}]
+E[X\cdot\mathbb 1_{X<a}]\ge E[X\cdot\mathbb 1_{X\ge a}]\ge a\cdot E[\mathbb 1_{X\ge a}]=a\cdot
P(X\ge a)$. The first inequality drops the non-negative term $E[X\cdot\mathbb 1_{X<a}]\ge0$; the
second replaces $X$ by $a$ on the event $X\ge a$, since $X\ge a$ there by definition. Rearranging:
$P(X\ge a)\le E[X]/a$. The bound uses NOTHING about the distribution's shape — only $E[X]$ and
$a$.

MARKOV IS DISTRIBUTION-FREE — IT APPLIES TO ANY NON-NEGATIVE $X$ WITH FINITE MEAN, NEVER A NAMED
DISTRIBUTION: if $E[X]=5$, then $P(X\ge25)\le5/25=1/5$, regardless of whether $X$ is Binomial,
Poisson, Exponential, or anything else non-negative with that mean. The inputs are ONLY $E[X]$ and
$a$ — nothing else about the distribution matters, which is both the bound's power (universal
applicability) and its limitation (it can be very loose, since it ignores shape entirely).

THE BOUND IS TIGHT ONLY AT A SPECIFIC TWO-POINT DISTRIBUTION, NEVER FOR GENERIC $X$: let $X=0$
with probability $1-p$ and $X=a$ with probability $p$. Then $E[X]=ap$, and $P(X\ge a)=p=E[X]/a$ —
equality holds EXACTLY here. For most distributions (e.g. Poisson), the bound is far from tight:
for $X\sim\text{Poisson}(4)$, Markov bounds $P(X\ge20)\le4/20=0.2$, while the true value is
approximately $0.0000084$ — an enormous gap, since Poisson never concentrates its mass at just two
points $\{0,a\}$.

## Mental Models
- **"Markov's inequality asks only 'how big is the average, and how far away is the threshold?' —
  it never asks 'what shape is the distribution?'"**
- **"The bound is a worst-case ceiling that only touches reality for one very specific, spiky
  two-point distribution — for anything smoother, it's typically far too loose to be tight."**

## Why Students Fail

### MC-1: MARKOV-REQUIRES-SPECIFIC-DISTRIBUTION
- **Surface form**: believes Markov's inequality is a formula tied to a specific distribution
  (like Binomial or Poisson), rather than a universal distribution-free bound.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — probability
  inequalities are usually introduced alongside specific distributions, so students categorize
  Markov the same way).
- **Repair**: re-anchor on the bound depending only on $E[X]$ and $a$, applicable to any
  non-negative random variable with finite mean.

### MC-2: MARKOV-REQUIRES-X-SYMMETRIC
- **Surface form**: tries to apply Markov to $X$ that can be negative, or to deviations from the
  mean before converting to a non-negative quantity.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — "Markov"
  is also associated with unrelated Markov chains, suggesting a shared symmetry/stationarity
  requirement that doesn't actually exist).
- **Repair**: re-anchor on the strict $X\ge0$ requirement, and the need to transform deviations
  (e.g. via squaring) into a non-negative quantity first.

### MC-3: MARKOV-BOUND-IS-TIGHT-FOR-ALL-DISTRIBUTIONS
- **Surface form**: believes $P(X\ge a)=E[X]/a$ (equality) holds for all non-negative $X$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — seeing the
  tight two-point example naturally invites assuming equality generalizes to every distribution).
- **Repair**: re-compare the Markov bound against the true tail probability for a genuinely
  non-tight distribution like Poisson.

## Misconceptions

### MC-1: MARKOV-REQUIRES-SPECIFIC-DISTRIBUTION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: MARKOV-REQUIRES-X-SYMMETRIC
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: MARKOV-BOUND-IS-TIGHT-FOR-ALL-DISTRIBUTIONS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Markov's inequality is like a universal shipping-weight limit that applies to every package
  regardless of shape — it only needs the average weight, never what's actually inside."**
- **Anti-analogy**: Markov's bound is NOT an exact answer — it's a worst-case ceiling that is
  often wildly loose except for one very specific spiky distribution.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the same bound applied identically to any non-negative
  distribution sharing a given mean, regardless of shape.
- **Demonstration 2 (targets MC-2)**: converting $|X-\mu|\ge a$ into a Markov-applicable form via
  $(X-\mu)^2\ge a^2$, since $X-\mu$ itself can be negative.
- **Demonstration 3 (targets MC-3)**: the Poisson(4) comparison, Markov's bound of 0.2 against the
  true value $\approx0.0000084$ — a massive gap disproving general tightness.

## Discovery Questions
1. "Is Markov's inequality a formula specific to one distribution, like Binomial or Poisson?"
2. "Can Markov's inequality be applied directly to a random variable that can take negative
   values?"
3. "Does P(X≥a) = E[X]/a exactly, for every non-negative random variable?"

## Teaching Sequence
1. **Representation shift**: the one-line proof from the definition of expectation, working the
   distribution-free application, isolating MC-1.
2. **Contrast pair**: the non-negativity requirement versus attempting direct application to
   $X-\mu$, isolating MC-2.
3. **Conceptual anchor**: the Poisson tightness comparison, isolating MC-3.
4. **Mastery gate**: require a correct bound computation from a given mean and threshold, a
   correct proof reconstruction, and a correct judgment of whether the bound is tight for a
   described distribution, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept Markov's inequality restricted to a specific named distribution.
- Never accept Markov applied directly to a variable that can be negative, without a
  non-negativity-restoring transformation.
- Never accept a claim that Markov's bound is an exact equality for a generic distribution.

## Voice Teaching Notes
- Say "does this bound depend on the distribution's shape, or only on its mean?" whenever Markov
  is invoked.
- When Markov is applied to a deviation from the mean, ask "is that quantity non-negative, or
  does it need to be transformed first?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a Markov bound from a given mean and
  threshold.
- **Rung 2 (application)**: learner correctly reconstructs the one-line proof from the definition
  of expectation.
- **Rung 3 (transfer)**: learner correctly derives Chebyshev's inequality from Markov by applying
  it to $(X-\mu)^2$, and compares the resulting bound's tightness against direct Markov
  application.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the bound's dependence on only $E[X]$ and $a$.
- If MC-2 recurs, re-derive the non-negativity-restoring transformation for deviations.
- If MC-3 recurs, re-compare against the Poisson tightness gap.

## Memory Hooks
- "Markov needs only the mean and a threshold — no distribution shape required."
- "Markov needs X non-negative — deviations from the mean must be transformed first, e.g. by
  squaring."
- "The bound is tight only for one specific two-point spike — almost always loose otherwise."

## Transfer Connections
- `math.prob.expected-value` (already authored, this campaign, Batch 122): supplies $E[X]$
  directly, the entire input this concept's bound is built from.
- `math.prob.chebyshev` (already authored, this campaign, Batch 125): derived directly from
  Markov applied to $(X-\mu)^2$, the KG's declared unlock target.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.markov-inequality.md`, reused by
  reference for its one-line proof, its distribution-free application examples, its tightness
  two-point-distribution construction, and its three-misconception registry (birth types adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, deriving Chebyshev's inequality
  from Markov via $(X-\mu)^2$ and comparing bound tightness.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.expected-value`, unlocks `math.prob.chebyshev`, cross_links none, proficient/apply,
  mastery_threshold 0.85, estimated_hours 2) was directly verified against the live KG and matches
  exactly. Noted: `math.prob.chebyshev`'s own `requires` field lists only `math.prob.variance`,
  not this concept — a live KG unlocks/requires asymmetry between two already-verified entries,
  not a Blueprint-versus-KG discrepancy requiring correction here.

## Version History
- 2026-09-19 (Batch 130): authored. First entry this batch. Companion batch concept:
  `math.real.continuity-rigorous`.
