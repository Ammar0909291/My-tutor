# math.stats.sampling-distribution

## Identity
- **KG id**: `math.stats.sampling-distribution`
- **Domain**: math.stats
- **Requires**: `math.stats.sampling`, `math.prob.random-variable`, `math.prob.clt`
- **Unlocks**: `math.stats.standard-error`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Define a sampling distribution as the probability distribution of a STATISTIC (e.g. $\bar X$)
across ALL possible samples — a genuinely distinct object from the population AND from any single
sample's raw data (never conflated with either); state $E[\bar X]=\mu$ and
$SD(\bar X)=\sigma/\sqrt n$, applying the SQUARE-ROOT scaling correctly (never a linear
$\sigma/n$); and correctly reason that HALVING the standard error requires QUADRUPLING the sample
size (never merely doubling it).

## Core Understanding
THREE GENUINELY DIFFERENT OBJECTS SHARE THE SAME MEAN — NEVER CONFLATED: for population
$\{2,4,6,8\}$ ($\mu=5$, $\sigma=\sqrt5\approx2.236$) and all $\binom42=6$ samples of size 2: the
sample means are $\{3,4,5,5,6,7\}$ — this LIST of 6 means IS the sampling distribution of $\bar
X$, a genuinely DIFFERENT object from the 4-element population AND from any single 2-element
sample's own raw data (e.g. $\{2,8\}$). ALL THREE happen to share mean 5 (which is exactly why
they're easy to conflate) — but they have DIFFERENT spreads: the population ranges 2 to 8, the
sampling distribution's means range only 3 to 7 (NARROWER, since averaging smooths out extremes),
and a single sample's raw data is just its own two numbers, not a distribution at all in this
sense.

STANDARD ERROR SCALES AS $\sigma/\sqrt n$ — NEVER $\sigma/n$: for $\sigma=12$, $n=9$: the CORRECT
$SD(\bar X)=12/\sqrt9=12/3=4$. The INCORRECT $\sigma/n=12/9\approx1.33$ is considerably SMALLER
and WRONG — dividing by raw $n$ instead of $\sqrt n$ drastically OVERSTATES how tightly the
sampling distribution concentrates, understating its true variability. The square root is NEVER
optional or a rounding nuance — it fundamentally changes the scaling relationship between sample
size and precision.

HALVING THE STANDARD ERROR REQUIRES QUADRUPLING $n$ — NEVER MERELY DOUBLING IT: starting at
$n=25$ with $SE=4$ ($\sigma=20$): DOUBLING to $n=50$ gives $SE=20/\sqrt{50}\approx2.83$ — a
reduction, but NOT to half (which would be 2); $2.83$ is only about 71% of the original.
QUADRUPLING to $n=100$ gives $SE=20/\sqrt{100}=2$ — EXACTLY half. To halve SE, the DENOMINATOR
$\sqrt n$ must DOUBLE, which requires $n$ itself to become 4 TIMES as large (since
$\sqrt{4n}=2\sqrt n$) — doubling $n$ only shrinks SE by a factor of $1/\sqrt2\approx0.707$, NEVER
by half.

## Mental Models
- **"Population, one sample's data, and the sampling distribution can all share the same center —
  but they're three genuinely different objects with different spreads."**
- **"Standard error divides by the SQUARE ROOT of n — skip the root and you'll drastically
  overstate how tight the sampling distribution really is."**
- **"To cut standard error in half, quadruple your sample size — doubling only gets you about
  71% of the way there."**

## Why Students Fail

### MC-1: SAMPLING-DISTRIBUTION-IS-THE-DATA
- **Surface form**: conflates the sampling distribution (of a statistic across many samples) with
  the distribution of individual data points within one sample, or with the population
  distribution.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the very NAME
  "sampling distribution" invites confusion with "the distribution of the sample's own data").
- **Repair**: re-walk the three-object comparison on the enumerated tiny population, confirming
  different spreads despite the shared mean.

### MC-2: STANDARD-ERROR-IS-SIGMA-OVER-N
- **Surface form**: computes the standard error as $\sigma/n$ instead of $\sigma/\sqrt n$,
  applying a linear rather than square-root scaling.
- **Birth type**: (Blueprint's own declared trigger — any numeric standard-error computation
  without the explicit square-root step).
- **Repair**: re-derive the correct value with the $\sqrt n$ step made explicit.

### MC-3: DOUBLE-N-HALVES-SE
- **Surface form**: assumes doubling the sample size halves the standard error, missing that SE
  scales as $1/\sqrt n$, so quadrupling n is required.
- **Birth type**: (Blueprint's own declared trigger — any question asking how much n must change
  to achieve a target SE reduction).
- **Repair**: re-derive the exact quadrupling requirement, testing the doubled value directly to
  show it falls short.

## Misconceptions

### MC-1: SAMPLING-DISTRIBUTION-IS-THE-DATA
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: STANDARD-ERROR-IS-SIGMA-OVER-N
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: DOUBLE-N-HALVES-SE
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Averaging is a smoothing machine — an extreme individual value gets diluted by whatever else
  lands in the same sample, which is exactly why the sampling distribution's spread shrinks below
  the population's own."**
- **Anti-analogy**: doubling your sample size is not "twice the precision" — the square-root
  relationship means you need four times the data to actually double your precision.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the enumerated population/sample-data/sampling-distribution
  three-object table.
- **Demonstration 2 (targets MC-2)**: the $\sigma/\sqrt n$-versus-$\sigma/n$ numeric contrast.
- **Demonstration 3 (targets MC-3)**: the doubling-versus-quadrupling SE computation at
  $n=25,50,100$.

## Discovery Questions
1. "Is the 'sampling distribution' the same thing as the distribution of data within one sample?"
2. "Is the standard error computed as $\sigma/n$ or $\sigma/\sqrt n$?"
3. "Does doubling the sample size cut the standard error in half?"

## Teaching Sequence
1. **Representation shift**: the enumerated tiny population built by hand into its own sampling
   distribution, working Demonstration 1, isolating MC-1.
2. **Contrast pair**: the three-object distinction, the $\sigma/\sqrt n$-versus-$\sigma/n$
   computation, and the doubling-versus-quadrupling comparison, working Demonstrations 2 and 3,
   isolating MC-2 and MC-3.
3. **Conflict evidence**: a composite problem requiring all three distinctions together.
4. **Mastery gate**: require a correct three-object identification, a correct standard-error
   computation, and a correct sample-size-multiplier determination for a target SE reduction, at
   the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the sampling distribution conflated with a single sample's raw data or the
  population distribution.
- Never accept the standard error computed as $\sigma/n$ rather than $\sigma/\sqrt n$.
- Never accept a claim that doubling the sample size halves the standard error.

## Voice Teaching Notes
- Say "is this about the population, one sample's data, or the statistic across many samples?"
  whenever "distribution" is used in a sampling context.
- Ask "did you take the square root of n before dividing?" whenever a standard error is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes population, one sample's data, and
  the sampling distribution using an enumerated example.
- **Rung 2 (application)**: learner correctly computes the standard error using $\sigma/\sqrt n$.
- **Rung 3 (transfer)**: learner correctly determines the sample-size multiplier needed to achieve
  an arbitrary target reduction in standard error (not just halving).

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the three-object comparison on a fresh enumerated population.
- If MC-2 recurs, re-derive the standard error with the $\sqrt n$ step explicit.
- If MC-3 recurs, re-derive the exact quadrupling requirement, testing the doubled value directly.

## Memory Hooks
- "Population, one sample's data, sampling distribution — three objects, same mean, different
  spreads."
- "Standard error divides by √n — never n itself."
- "Halve SE: quadruple n. Double n: SE shrinks by only about 71%, not 50%."

## Transfer Connections
- `math.stats.sampling` (already authored, certified domain): supplies the repeated-sampling
  mechanism (SRS) whose statistic's distribution this concept studies.
- `math.prob.random-variable` (already authored, certified domain): supplies the framework
  under which a sample statistic like $\bar X$ is itself treated as a random variable.
- `math.prob.clt` (already authored, certified domain): supplies the approximately-normal SHAPE
  claim for the sampling distribution of $\bar X$ at large $n$, which this concept's mean/SE
  formulas complement.
- `math.stats.standard-error` (not yet authored, KG's declared unlock): develops the
  $\sigma/\sqrt n$ formula established here into deeper treatment.

## Cross-Subject Connections
- Political polling: margin-of-error claims in survey reporting directly rely on the
  $\sigma/\sqrt n$ scaling, with "surveyed more people" precision claims a common source of the
  doubling-versus-quadrupling confusion.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.sampling-distribution.md`, reused by
  reference for its enumerated tiny-population sampling distribution, its three-object contrast
  table, its σ/√n-versus-σ/n numeric contrast, its doubling-versus-quadrupling SE computation,
  and its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a polling organization's margin
  of error, evaluating a journalist's incorrect "4x sample size = 4x precision" claim.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.sampling`/`math.prob.random-variable`/`math.prob.clt`, unlocks
  `math.stats.standard-error`, cross_links none, proficient/understand, mastery_threshold 0.85,
  estimated_hours 5) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 199): authored. First entry this batch. Companion batch concept:
  `math.stats.normal-approximation`.
