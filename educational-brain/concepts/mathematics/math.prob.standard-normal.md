# math.prob.standard-normal

## Identity
- **KG id**: `math.prob.standard-normal`
- **Domain**: math.prob
- **Requires**: `math.prob.normal-distribution`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Define the standard normal $Z\sim N(0,1)$ with PDF $\varphi(z)=(2\pi)^{-1/2}e^{-z^2/2}$ and CDF
$\Phi(z)$; convert any $X\sim N(\mu,\sigma^2)$ to $Z=(X-\mu)/\sigma$; use $\Phi$ and its symmetry
$\Phi(-z)=1-\Phi(z)$ (never $\Phi(-z)=\Phi(z)$) to compute normal probabilities; apply the
68-95-99.7 rule; and compute probabilities for sums of independent normals, where VARIANCES add
(never standard deviations).

## Core Understanding
STANDARDIZE FIRST — NEVER LOOK UP $\Phi(x)$ DIRECTLY FOR A NON-STANDARD NORMAL: for $X\sim
N(70,100)$ ($\sigma=10$): $P(X\le85)=\Phi((85-70)/10)=\Phi(1.5)\approx0.933$ — the raw value $85$
is NEVER plugged directly into $\Phi$; it must first be converted to a $z$-score via
$z=(x-\mu)/\sigma$. Skipping standardization and computing $\Phi(85)$ directly is meaningless,
since $\Phi$ is defined for the STANDARD normal specifically.

$\Phi(-z)=1-\Phi(z)$ — NEVER $\Phi(-z)=\Phi(z)$: the DENSITY $\varphi$ IS symmetric
($\varphi(-z)=\varphi(z)$), but the CDF is NOT symmetric in that same sense. $P(Z<-1)=\Phi(-1)=
1-\Phi(1)\approx1-0.841=0.159$ — the LEFT tail probability, genuinely different from $\Phi(1)
\approx0.841$ (the probability of being below $+1$). Confusing PDF symmetry with CDF symmetry
gives a probability that's the complement of the correct one.

INDEPENDENT NORMALS SUM WITH VARIANCES ADDING, NEVER STANDARD DEVIATIONS: if $X\sim
N(\mu_1,\sigma_1^2)\perp Y\sim N(\mu_2,\sigma_2^2)$, then $X+Y\sim N(\mu_1+\mu_2,
\sigma_1^2+\sigma_2^2)$ — the VARIANCES add directly; the standard deviations do NOT simply add
(e.g. $\sigma_{X+Y}=\sqrt{\sigma_1^2+\sigma_2^2}\ne\sigma_1+\sigma_2$ in general). This closure
under linear combination is a distinguishing property of the normal family, verified by
$E[Z]=(\mu-\mu)/\sigma=0$ and $\text{Var}(Z)=\sigma^2/\sigma^2=1$ for the standardization itself.

## Mental Models
- **"Standardizing is the mandatory bridge from any Normal to the universal Z-table — skip it, and
  the table simply doesn't apply."**
- **"The density mirrors perfectly around 0, but the CDF's symmetry rule flips the value:
  Φ(−z) = 1 − Φ(z), never Φ(−z) = Φ(z)."**

## Why Students Fail

### MC-1: ALL-NORMAL-DISTRIBUTIONS-ARE-STANDARD
- **Surface form**: computes $P(X\le10)$ for $X\sim N(5,4)$ as $\Phi(10)$ instead of
  $\Phi((10-5)/2)$, forgetting to standardize.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — problems
  about $N(0,1)$ appear first and feel canonical, inviting direct table lookup without
  conversion).
- **Repair**: re-anchor on standardizing FIRST, always, before any $\Phi$ lookup.

### MC-2: SYMMETRY-MEANS-Φ(−z)=Φ(z)
- **Surface form**: states $\Phi(-z)=\Phi(z)$; computes $P(Z<-1)=\Phi(1)\approx0.84$ instead of
  $1-\Phi(1)\approx0.16$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type —
  $\varphi(-z)=\varphi(z)$ IS true for the density, and students incorrectly apply this same
  symmetry to the CDF).
- **Repair**: re-derive $\Phi(-z)=1-\Phi(z)$ directly from $P(Z\le-z)=P(-Z\ge z)=P(Z\ge z)=
  1-\Phi(z)$.

### MC-3: STANDARD-DEVIATION-IS-THE-STANDARDISED-SCORE
- **Surface form**: confuses $\sigma$ (standard deviation of $X$) with $z=(x-\mu)/\sigma$ (the
  standardized score), interpreting all z-scores as standard deviations.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — "standard"
  appears in both "standard deviation" and "standardized score," and z-scores are sometimes
  called "standard deviation units from the mean," reinforcing the confusion).
- **Repair**: re-anchor on $\sigma$ as a fixed property of $X$'s distribution, while $z$ is a
  computed value specific to one data point.

## Misconceptions

### MC-1: ALL-NORMAL-DISTRIBUTIONS-ARE-STANDARD
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: SYMMETRY-MEANS-Φ(−z)=Φ(z)
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: STANDARD-DEVIATION-IS-THE-STANDARDISED-SCORE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Standardizing is like converting every currency to a single reference currency before
  comparing prices — the Z-table only speaks that one reference currency."**
- **Anti-analogy**: the CDF's mirror symmetry is NOT a simple reflection like the density's — it's
  a reflection PLUS a complement, $\Phi(-z)=1-\Phi(z)$, never a direct mirror value.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $N(70,100)$'s $P(X\le85)=\Phi(1.5)$, requiring
  standardization before table lookup.
- **Demonstration 2 (targets MC-2)**: $P(Z<-1)=\Phi(-1)=1-\Phi(1)\approx0.159$, contrasted
  against the wrong $\Phi(1)\approx0.841$.
- **Demonstration 3 (targets MC-3)**: $\sigma$ as a fixed distributional property versus $z$ as a
  per-point computed value, for a specific example.

## Discovery Questions
1. "For X~N(5,4), is P(X≤10) computed as Φ(10) or Φ((10−5)/2)?"
2. "Does Φ(−z)=Φ(z), or does Φ(−z)=1−Φ(z)?"
3. "Is a z-score the same thing as the standard deviation, or a different, computed quantity?"

## Teaching Sequence
1. **Representation shift**: the standardization step and its necessity, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the CDF symmetry derivation, working Demonstration 2, isolating MC-2.
3. **Conceptual anchor**: the $\sigma$-versus-$z$ distinction, working Demonstration 3, isolating
   MC-3.
4. **Mastery gate**: require a correct standardization and table lookup for a new value, a
   correct symmetry-based tail probability computation, and a correct independent-normal-sum
   variance computation, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $\Phi$ applied directly to a raw, non-standardized value.
- Never accept $\Phi(-z)=\Phi(z)$ as a valid symmetry rule.
- Never accept a z-score described as a standard deviation rather than a computed standardized
  value.

## Voice Teaching Notes
- Say "did you standardize before looking that up?" whenever a normal probability is computed.
- When CDF symmetry is invoked, ask "is that the density's symmetry, or the CDF's — do they say
  the same thing?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly standardizes and computes a one-sided probability
  from a Z-table.
- **Rung 2 (application)**: learner correctly applies $\Phi(-z)=1-\Phi(z)$ for a left-tail
  probability.
- **Rung 3 (transfer)**: learner correctly computes the distribution of a sum of independent
  normals, and connects standardization to CLT and the Normal approximation to the Binomial.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on standardizing before any table lookup.
- If MC-2 recurs, re-derive $\Phi(-z)=1-\Phi(z)$ from first principles.
- If MC-3 recurs, re-distinguish $\sigma$ (fixed) from $z$ (computed per point).

## Memory Hooks
- "Standardize first, always — never look up a raw value directly in the Z-table."
- "Φ(−z) = 1 − Φ(z) — the CDF's symmetry includes a complement, not a mirror."
- "A z-score is computed per data point — it is not the same thing as σ."

## Transfer Connections
- `math.prob.normal-distribution` (already authored, this campaign, Batch 139): supplies the
  general $N(\mu,\sigma^2)$ family and its parameters this concept's standardization operates on.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.standard-normal.md`, reused by
  reference for its standardization worked examples, its CDF-symmetry derivation, its
  independent-normal-sum variance-addition fact, and its three-misconception registry (birth
  types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, previewing CLT and the Normal
  approximation to the Binomial with continuity correction.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.normal-distribution`, unlocks none, cross_links none, proficient/apply,
  mastery_threshold 0.9, estimated_hours 3) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 140): authored. Second entry this batch. Companion batch concept:
  `math.prob.clt`.
