# math.prob.quantile

## Identity
- **KG id**: `math.prob.quantile`
- **Domain**: math.prob
- **Requires**: `math.prob.cdf`
- **Unlocks**: none
- **Cross-links**: `math.stats.percentile` (Blueprint claimed cross-link mode without an `ls`-
  based verification — this Blueprint predates the corpus's established cross-link-check
  discipline; confirmed NOT authored via `ls`; corrected to independence mode, see Curriculum
  Feedback)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 2

## Learning Objective
Define the $p$-th quantile ($0<p<1$) as $Q(p)=\inf\{x:F(x)\ge p\}$, computing quantiles from given
CDFs; identify the median as $Q(0.5)$, quartiles as $Q(0.25)$/$Q(0.75)$, and percentiles; apply
the INVERSE-CDF (quantile) METHOD to transform $\text{Uniform}(0,1)$ into any target distribution;
and distinguish quantiles from moments (mean, variance) as measures of distribution shape.

## Core Understanding
$Q$ MAPS PROBABILITIES TO VALUES; $F$ MAPS VALUES TO PROBABILITIES — INVERSE DIRECTIONS, NEVER THE
SAME FUNCTION: for $X\sim\text{Exponential}(\lambda)$: $F(x)=1-e^{-\lambda x}$. Setting
$F(x)=p$: $x=-\ln(1-p)/\lambda=Q(p)$. Median $=Q(0.5)=\ln2/\lambda\approx0.693/\lambda$, while
mean $=1/\lambda>\ln2/\lambda$ — mean exceeds median, confirming right-skew. If $F(5)=0.7$, then
$Q(0.7)=5$: $F$ answers "what's the probability of being $\le5$?"; $Q$ answers "what value has
70% of the distribution below it?" — genuinely inverse questions.

THE MEDIAN EQUALS THE MEAN ONLY FOR SYMMETRIC DISTRIBUTIONS, NEVER UNIVERSALLY: for
$X\sim\text{Uniform}(0,1)$: $F(x)=x$, so $Q(p)=p$, median $=0.5=$ mean — they coincide because
Uniform is symmetric. But for the Exponential above, mean $\ne$ median — skewed distributions
routinely have mean $\ne$ median, and the Normal distribution's mean-equals-median property (often
the first example encountered) is a special case of symmetry, never a universal fact about all
distributions.

THE INFIMUM DEFINITION HANDLES DISCRETE DISTRIBUTIONS DIRECTLY, NEVER REQUIRING A SMOOTH CDF: for
$X\sim\text{Bernoulli}(0.3)$: $F(0)=0.7$, $F(1)=1$. $Q(0.5)=\inf\{x:F(x)\ge0.5\}=0$ (since
$F(0)=0.7\ge0.5$ already) — the median is 0, the distribution's mode, computed directly from the
infimum definition without any need for $F$ to be continuous or strictly increasing.

## Mental Models
- **"F and Q are mirror-image questions about the same CDF graph — F reads up from an x-value to
  find a probability; Q reads across from a probability to find an x-value."**
- **"Median equals mean only when the distribution is perfectly balanced — skew is exactly what
  pulls them apart."**

## Why Students Fail

### MC-1: QUANTILE-IS-THE-CDF
- **Surface form**: confuses $Q(p)$ (probability to value) with $F(x)$ (value to probability),
  writing $Q(0.5)=F(0.5)$ or similar.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — both
  functions involve probability and x-values, and the direction of the mapping is the only
  difference for a learner who hasn't explicitly worked with inverse functions).
- **Repair**: re-anchor on the arrow directions — $F$ goes value-to-probability, $Q$ goes
  probability-to-value, verified via a specific example like $F(5)=0.7\Rightarrow Q(0.7)=5$.

### MC-2: MEDIAN-ALWAYS-EQUALS-MEAN
- **Surface form**: assumes $Q(0.5)=E[X]$ for all distributions.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the Normal
  distribution, the canonical first example, has mean=median, inviting overgeneralization).
- **Repair**: re-compute both for a skewed distribution like Exponential, showing mean $\ne$
  median directly.

### MC-3: QUANTILE-IS-ONLY-DEFINED-FOR-CONTINUOUS-DISTRIBUTIONS
- **Surface form**: doesn't know how to define or compute quantiles for discrete distributions.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — quantile
  formulas are typically derived for continuous distributions first, and the infimum definition's
  generality isn't always shown).
- **Repair**: re-derive the Bernoulli(0.3) median directly from the infimum definition.

## Misconceptions

### MC-1: QUANTILE-IS-THE-CDF
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: MEDIAN-ALWAYS-EQUALS-MEAN
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: QUANTILE-IS-ONLY-DEFINED-FOR-CONTINUOUS-DISTRIBUTIONS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"F and Q are like reading a graph in two directions — one from the x-axis up to find a
  height, the other from the y-axis across to find a position."**
- **Anti-analogy**: the median is NOT a universal stand-in for the mean — they agree only when the
  distribution's shape is symmetric, and skew is exactly the mechanism that pulls them apart.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $F(5)=0.7\Rightarrow Q(0.7)=5$ inverse-direction check.
- **Demonstration 2 (targets MC-2)**: Exponential's median $\ln2/\lambda$ versus mean $1/\lambda$,
  a genuine mean-median gap.
- **Demonstration 3 (targets MC-3)**: Bernoulli(0.3)'s median computed directly via the infimum
  definition, with no continuity required.

## Discovery Questions
1. "If F(5)=0.7, what is Q(0.7)? Are Q and F the same function, or inverses of each other?"
2. "Does the median always equal the mean, for every distribution?"
3. "Can a quantile be defined for a discrete distribution, or does it require a smooth CDF?"

## Teaching Sequence
1. **Representation shift**: the $F$-versus-$Q$ direction contrast, working the $F(5)=0.7
   \Rightarrow Q(0.7)=5$ example, isolating MC-1.
2. **Conflict evidence**: the Exponential distribution's genuine mean-median gap, isolating MC-2.
3. **Conceptual anchor**: the Bernoulli(0.3) median computed via the infimum definition, isolating
   MC-3.
4. **Mastery gate**: require a correct quantile computation from a given CDF, a correct median-
   versus-mean comparison for a skewed distribution, and a correct quantile computation for a
   discrete distribution, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $Q(p)$ and $F(x)$ used interchangeably or in the wrong direction.
- Never accept a claim that the median always equals the mean.
- Never accept a claim that quantiles require a continuous or smooth CDF.

## Voice Teaching Notes
- Say "is that mapping a value to a probability, or a probability to a value?" whenever $F$ and
  $Q$ are discussed together.
- When a median is computed, ask "does this distribution's shape justify assuming it equals the
  mean, or do you need to check?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $Q(p)$ from a given CDF for a continuous
  distribution.
- **Rung 2 (application)**: learner correctly identifies a distribution's mean-versus-median
  relationship from its skew.
- **Rung 3 (transfer)**: learner correctly applies the inverse-CDF method to simulate a target
  distribution from Uniform(0,1), and correctly computes a quantile for a discrete distribution.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the $F(5)=0.7\Rightarrow Q(0.7)=5$ direction check.
- If MC-2 recurs, re-compute mean and median for a skewed distribution directly.
- If MC-3 recurs, re-derive a discrete distribution's median via the infimum definition.

## Memory Hooks
- "F goes value to probability; Q goes probability to value — inverse directions, never the same
  function."
- "Median equals mean only for symmetric distributions — skew pulls them apart."
- "The infimum definition works for discrete distributions too — no smooth CDF required."

## Transfer Connections
- `math.prob.cdf` (already authored, certified domain): supplies $F(x)$ directly, the function
  this concept's quantile inverts.
- `math.stats.percentile` (not yet authored, corrected from the Blueprint's unverified cross-link
  claim): the KG's declared cross-link, connecting population quantiles to sample quantiles,
  Q-Q plots, and Value at Risk.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.quantile.md`, reused by reference for
  its Exponential/Uniform/Bernoulli quantile computations, its inverse-CDF simulation method, and
  its three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own content (originally cross-link mode against
  `math.stats.percentile`, corrected here to independence mode), restated as a self-contained
  reasoning task about sample quantiles as population-quantile estimators, Q-Q plot
  interpretation, and Value-at-Risk's use of quantiles for tail-risk measurement.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Cross-link discrepancy found and corrected (unverified claim, pre-dating the corpus's
  established `ls`-verification discipline)**: the Blueprint's Component 8 states "P76 Transfer
  Probe Detail: Mode: Cross-link (cross_links = [math.stats.percentile])" without documenting an
  `ls`-based check of whether that target is actually authored — this Blueprint uses an older
  format that predates the verification discipline established in later-authored Blueprints this
  campaign has relied on. Verified via `ls educational-brain/concepts/mathematics/` that
  `math.stats.percentile` has NO authored Educational Brain entry. Corrected to INDEPENDENCE mode,
  restating the Blueprint's own transfer-probe content (sample quantiles, Q-Q plots, Value at
  Risk) as self-contained. All other fields (requires `math.prob.cdf`, unlocks none, cross_links
  `math.stats.percentile`, proficient/apply, mastery_threshold 0.85, estimated_hours 2) matched
  exactly.

## Version History
- 2026-09-19 (Batch 137): authored. Second entry this batch. Companion batch concept:
  `math.real.weierstrass-approximation`.
