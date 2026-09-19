# math.prob.moments

## Identity
- **KG id**: `math.prob.moments`
- **Domain**: math.prob
- **Requires**: `math.prob.expected-value`
- **Unlocks**: `math.prob.mgf`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Define the $k$th MOMENT $E[X^k]$ and the $k$th CENTRAL MOMENT $E[(X-\mu)^k]$, distinguishing them
— the first moment ($E[X]=\mu$) versus the first CENTRAL moment ($E[X-\mu]$, ALWAYS exactly zero
for every random variable, by linearity of expectation); compute SKEWNESS
$=E[(X-\mu)^3]/\sigma^3$ and interpret its sign, recognizing it is especially sensitive to TAILS,
never just the "bulk" appearance; and recognize the moment generating function and kurtosis's
"$-3$" convention at orientation level.

## Core Understanding
THE FIRST CENTRAL MOMENT IS ALWAYS EXACTLY ZERO, FOR EVERY RANDOM VARIABLE, BY CONSTRUCTION: for
a fair die roll $X$, $E[X]=3.5$ (the first moment, $\mu$). The first CENTRAL moment
$E[X-\mu]=E[X]-\mu=3.5-3.5=0$ — this holds generally, $E[X-\mu]=E[X]-\mu=\mu-\mu=0$, for ANY
random variable, by linearity of expectation. This is a structural fact forced by the definition
of $\mu$ itself, never a coincidence to verify per distribution.

SKEWNESS IS DRIVEN BY TAILS, NEVER JUST THE DISTRIBUTION'S "BULK" APPEARANCE: a household-income
distribution clustered near a moderate level, with a small number of extremely high values
creating a long right tail, produces POSITIVE skewness — the cubed deviations from the rare large
values dominate the sum, even though the bulk might look roughly symmetric to casual inspection.
Contrast the fair die roll: skewness is EXACTLY zero, since every deviation above $\mu=3.5$ is
matched by an equal deviation below it, and cubing preserves this cancellation. Cubing amplifies
large deviations far more than small ones, making skewness especially tail-sensitive.

THE MGF ENCODES ALL MOMENTS AT ONCE; KURTOSIS'S "$-3$" RECALIBRATES AGAINST THE NORMAL BASELINE:
$M(t)=E[e^{tX}]$ has $M^{(k)}(0)=E[X^k]$ — a single object from which any moment can be extracted
by differentiation (fully developed in `math.prob.mgf`). Separately, the normal distribution's
own fourth standardized central moment $E[(X-\mu)^4]/\sigma^4$ equals EXACTLY 3 — so kurtosis's
"$-3$" is not an arbitrary adjustment, it recalibrates the scale so 0 means normal-like tails,
positive means heavier tails, negative means lighter tails.

## Mental Models
- **"The first central moment is zero by definition, not by luck — μ is exactly the value that
  makes the positive and negative deviations balance to zero."**
- **"Skewness listens to the tails, not the crowd — a few extreme values can dominate it even when
  most of the distribution looks perfectly balanced."**

## Why Students Fail

### MC-1: FIRST-CENTRAL-MOMENT-ASSUMED-VARIABLE
- **Surface form**: believes a random variable could have a nonzero first central moment under
  unusual circumstances.
- **Birth type**: Foundational severity (Blueprint's own declared severity — without seeing the
  general algebraic argument, it's easy to treat this as an empirical fact to check per
  distribution rather than a structural guarantee).
- **Repair**: re-walk the general algebraic argument $E[X-\mu]=E[X]-\mu=\mu-\mu=0$.

### MC-2: SKEWNESS-JUDGED-BY-BULK-APPEARANCE
- **Surface form**: believes a distribution whose main body looks roughly symmetric must have
  near-zero skewness.
- **Birth type**: High severity (Blueprint's own declared severity — visual/bulk intuition is a
  natural but misleading proxy for a statistic that is specifically tail-sensitive).
- **Repair**: re-walk the income-distribution case, showing substantial positive skewness driven
  entirely by a small extreme-value tail.

### MC-3: KURTOSIS-MINUS-3-ASSUMED-ARBITRARY
- **Surface form**: believes the "$-3$" in the kurtosis formula is an arbitrary adjustment.
- **Birth type**: Moderate severity (Blueprint's own declared severity — an unexplained constant
  in a formula naturally reads as arbitrary until its origin is shown).
- **Repair**: re-anchor on the normal distribution's own fourth standardized central moment being
  exactly 3.

## Misconceptions

### MC-1: FIRST-CENTRAL-MOMENT-ASSUMED-VARIABLE
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: SKEWNESS-JUDGED-BY-BULK-APPEARANCE
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: KURTOSIS-MINUS-3-ASSUMED-ARBITRARY
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"The first central moment is like measuring how far a seesaw's fulcrum is from itself — zero
  by definition, since the fulcrum IS the balance point."**
- **Anti-analogy**: skewness is NOT decided by how the "typical" value looks — it's a tail-driven
  statistic, so a distribution can look symmetric in its bulk and still be substantially skewed.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the general algebraic proof $E[X-\mu]=0$, alongside the die
  roll's numeric confirmation.
- **Demonstration 2 (targets MC-2)**: the income distribution's roughly-symmetric bulk versus its
  substantial positive skewness from a thin extreme tail.
- **Demonstration 3 (targets MC-3)**: the normal distribution's fourth standardized central moment
  equaling exactly 3, motivating kurtosis's "$-3$."

## Discovery Questions
1. "Could a random variable have a nonzero first central moment, if its distribution were unusual
   enough?"
2. "If a distribution's main body looks roughly symmetric, must its skewness be close to zero?"
3. "Is the '-3' in the kurtosis formula an arbitrary adjustment with no particular meaning?"

## Teaching Sequence
1. **Representation shift**: the general first-central-moment-is-zero argument, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: Demonstration 2's income-distribution tail-driven skewness, isolating
   MC-2.
3. **Contrast pair**: Demonstration 3's raw-fourth-moment-versus-kurtosis recalibration, isolating
   MC-3.
4. **Mastery gate**: require a correct first-moment/first-central-moment computation, a correct
   general argument for why the first central moment is always zero, and a correct skewness-sign
   prediction from a described distribution shape, at the Blueprint's own stated MAMR of 5/5
   (⌈0.85×5⌉).

## Tutor Actions
- Never accept a claim that some random variable could have a nonzero first central moment.
- Never accept "the bulk looks symmetric" as sufficient evidence for near-zero skewness.
- Never accept the kurtosis "$-3$" dismissed as an arbitrary constant.

## Voice Teaching Notes
- Say "is that structurally guaranteed, or does it just happen to be true for this example?"
  whenever the first central moment comes up.
- When skewness is judged from a description, ask "did you check the tails, or just the main
  body?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a first moment and first central moment
  for a new discrete random variable.
- **Rung 2 (application)**: learner correctly predicts skewness sign from a described
  distribution shape, referencing tail behavior specifically.
- **Rung 3 (transfer)**: learner correctly explains why reporting only the mean can mislead for a
  skewed wealth distribution, and correctly reasons that two distributions with identical mean
  and standard deviation can still have very different skewness values.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the general algebraic argument.
- If MC-2 recurs, re-walk the income-distribution tail-driven case.
- If MC-3 recurs, re-anchor on the normal distribution's own baseline fourth moment.

## Memory Hooks
- "The first central moment is always zero — that's forced by the definition of the mean itself."
- "Skewness listens to the tails, not the crowd."
- "Kurtosis's -3 isn't decoration — it's calibrated against the normal distribution's own value."

## Transfer Connections
- `math.prob.expected-value` (already authored, this campaign, Batch 122): supplies $E[X]$ and
  linearity of expectation, the entire foundation this concept's moment machinery builds on.
- `math.prob.mgf` (not yet authored): the KG's declared unlock, fully developing the moment
  generating function previewed here at orientation level.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.moments.md`, reused by reference for
  its die-roll first-moment/first-central-moment worked example, its income-distribution
  tail-sensitivity demonstration, its MGF/kurtosis orientation-level preview, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, predicting a city wealth
  distribution's skewness sign and reasoning about mean-reporting caveats and cross-distribution
  skewness comparisons.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.expected-value`, unlocks `math.prob.mgf`, cross_links none, proficient/apply,
  mastery_threshold 0.85, estimated_hours 4) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 128): authored. First entry this batch. Companion batch concept:
  `math.real.completeness-metric`.
