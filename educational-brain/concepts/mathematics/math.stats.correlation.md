# math.stats.correlation

## Identity
- **KG id**: `math.stats.correlation`
- **Domain**: math.stats
- **Requires**: `math.stats.measures-of-spread`, `math.prob.correlation`
- **Unlocks**: `math.stats.linear-regression`
- **Cross-links**: `math.prob.correlation`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Compute $r=\sum(x_i-\bar x)(y_i-\bar y)/\sqrt{\sum(x_i-\bar x)^2\sum(y_i-\bar y)^2}$, recognizing
$r\in[-1,1]$ ALWAYS — a value outside this range signals an arithmetic ERROR, NEVER a valid
result; interpret $r$'s sign and magnitude, recognizing a strong NON-linear relationship can
produce $r$ near zero — NEVER interpreted as "no relationship" without checking a scatterplot;
and distinguish $r^2$ from $r$, recognizing correlation NEVER implies causation.

## Core Understanding
A COMPUTED $r$ OUTSIDE $[-1,1]$ IS AN ARITHMETIC ERROR — NEVER A VALID "STRONGER THAN PERFECT"
RESULT: if a student computes $r=1.4$: since $r$ is MATHEMATICALLY GUARANTEED to lie in $[-1,1]$
(a direct consequence of the formula's Cauchy-Schwarz-like structure), ANY value outside this
range is IMPOSSIBLE for a correct calculation — it signals an ARITHMETIC MISTAKE somewhere (in
the deviations, sums, or square root), and the calculation must be RE-CHECKED. Accepting $r=1.4$
at face value (interpreting it as "even stronger than perfect correlation") is WRONG — an
out-of-range value is a diagnostic signal, never an extreme-but-valid outcome.

$r$ MEASURES LINEAR ASSOCIATION ONLY — A STRONG NON-LINEAR RELATIONSHIP CAN STILL PRODUCE $r\approx0$:
for data following a PERFECT parabolic relationship $y=x^2$ over a SYMMETRIC range like
$x\in\{-3,\dots,3\}$: since $y=x^2$ is symmetric around $x=0$ (increasing for $x>0$, decreasing
for $x<0$), there's NO overall linear trend across the full range — the positive and negative
linear contributions CANCEL OUT, producing $r\approx0$ even though $x$ and $y$ are PERFECTLY
(non-linearly) related. Interpreting $r\approx0$ as conclusive evidence of "no relationship
whatsoever," without first checking a SCATTERPLOT for a strong non-linear pattern $r$ simply
isn't designed to detect, is WRONG.

CORRELATION NEVER IMPLIES CAUSATION — $r^2$ IS A DIFFERENT, RELATED QUANTITY: a study finds a
strong positive correlation ($r=0.85$) between ice cream sales and drowning incidents. This does
NOT mean ice cream sales CAUSE drowning — both are likely driven by a THIRD, confounding factor
(HOT WEATHER: more ice cream sold and more swimming, hence more drowning risk, in summer). A
strong $r$ demonstrates genuine STATISTICAL association, NEVER by itself evidence of a direct
causal link — interpreting ANY strong correlation as automatic causal evidence, without
considering confounding variables, is WRONG. $r^2$ (the coefficient of determination) is a
SEPARATE quantity from $r$ itself, representing the proportion of variance "explained" — never
interchangeable with $r$.

## Mental Models
- **"r outside [−1,1] is a red flag for an arithmetic mistake — never a legitimately extreme
  result."**
- **"r only sees straight lines — a perfect curve can hide entirely inside r≈0; always check the
  scatterplot before concluding 'no relationship.'"**
- **"A strong r is evidence of association, never proof of causation — always ask what third
  factor could be driving both."**

## Why Students Fail

### MC-1: OUT-OF-RANGE-COMPUTED-R-ACCEPTED-RATHER-THAN-RECOGNIZED-AS-AN-ERROR
- **Surface form**: accepts a computed correlation value outside $[-1,1]$ at face value, rather
  than recognizing it as a clear signal of a computational error.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-state the $[-1,1]$ guarantee explicitly and re-check the calculation for
  arithmetic errors.

### MC-2: NEAR-ZERO-R-INTERPRETED-AS-NO-RELATIONSHIP-WITHOUT-CHECKING-FOR-NON-LINEAR-PATTERNS
- **Surface form**: interprets a correlation coefficient close to zero as evidence of no
  relationship at all, without checking a scatterplot for a strong non-linear pattern that $r$
  cannot detect.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-examine a scatterplot of the data, checking for a strong non-linear pattern
  before concluding "no relationship."

## Misconceptions

### MC-1: OUT-OF-RANGE-COMPUTED-R-ACCEPTED-RATHER-THAN-RECOGNIZED-AS-AN-ERROR
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: NEAR-ZERO-R-INTERPRETED-AS-NO-RELATIONSHIP-WITHOUT-CHECKING-FOR-NON-LINEAR-PATTERNS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"r is a compass needle that only points along straight lines — a perfectly curved path can
  leave it spinning near zero, even though the path is completely determined."**
- **Anti-analogy**: an out-of-range r isn't a "super-strong" correlation — it's like a
  thermometer reading 200°C for a cup of tea: not a real extreme, a broken measurement.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $r=1.4$ impossible-value error-detection example.
- **Demonstration 2 (targets MC-2)**: the $y=x^2$ symmetric-range near-zero-$r$-despite-perfect-
  dependence example.
- **Demonstration 3**: the ice-cream-and-drowning confounding-variable example.

## Discovery Questions
1. "If you compute r=1.4, what does that tell you about your calculation?"
2. "Could two variables be perfectly related and still have r close to zero?"
3. "Does a strong correlation between two variables prove one causes the other?"

## Teaching Sequence
1. **Conceptual shift**: the out-of-range-value error-detection framing, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the perfect-parabola near-zero-$r$ example, working Demonstration 2,
   isolating MC-2.
3. **Reused procedure**: the correlation-versus-causation confounding-variable explanation,
   working Demonstration 3.
4. **Mastery gate**: require correct recognition of an impossible $r$ value, a correct
   interpretation of $r$'s sign/magnitude with the linear-association caveat, and a correct
   correlation-versus-causation explanation, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept an out-of-range computed $r$ value as a valid result.
- Never accept "no relationship" concluded from $r\approx0$ without checking for a non-linear
  pattern.
- Never accept a strong correlation interpreted as proof of causation.

## Voice Teaching Notes
- Say "is that value inside [−1,1] — if not, where's the arithmetic error?" whenever an $r$ value
  is computed.
- Ask "have you looked at a scatterplot, or could there be a curved pattern hiding in that
  near-zero r?" whenever a near-zero correlation is interpreted.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies an out-of-range $r$ as a computational
  error.
- **Rung 2 (application)**: learner correctly explains why a strong non-linear relationship can
  produce $r\approx0$.
- **Rung 3 (transfer)**: learner correctly identifies a likely confounding variable rejecting a
  causal claim based solely on correlation, in a novel scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the $[-1,1]$ guarantee and re-check for arithmetic errors.
- If MC-2 recurs, re-examine a scatterplot for a non-linear pattern.

## Memory Hooks
- "r outside [−1,1] means check your arithmetic, never accept it as a stronger result."
- "r only sees lines — always check the scatterplot before ruling out a relationship."
- "Correlation is never causation — always ask what third factor could explain both."

## Transfer Connections
- `math.stats.measures-of-spread` (already authored, certified domain): supplies the deviation
  terms $(x_i-\bar x)$ and $(y_i-\bar y)$ used directly in the formula.
- `math.prob.correlation` (already authored, this campaign, Batch 211; cross-link): supplies the
  theoretical population correlation $\rho$ this sample statistic $r$ estimates.
- `math.stats.linear-regression` (unlocked by this concept, not yet authored): will build directly
  on $r$ and $r^2$ to develop the full regression framework.

## Cross-Subject Connections
- Public health and epidemiology: the ice-cream/drowning and firefighters/fire-damage examples
  are classic, memorable illustrations of confounding used across many quantitative disciplines.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.correlation.md`, reused by reference
  for its impossible-$r$-value example, its perfect-parabola near-zero-$r$ example, its
  ice-cream-and-drowning confounding example, and its two-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on firefighters dispatched versus
  fire damage, identifying the confounding variable (fire severity) behind a misleading causal
  headline.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.measures-of-spread`/`math.prob.correlation`, unlocks
  `math.stats.linear-regression`, cross_links `math.prob.correlation`, proficient/apply,
  mastery_threshold 0.85, estimated_hours 4) was directly verified against the live KG and
  matches exactly. The Blueprint itself declares P76_mode as independence despite the authored
  cross-link target — this is the Blueprint's own authoring choice, not a discrepancy.

## Version History
- 2026-09-19 (Batch 212): authored. First entry this batch. Companion batch concept:
  `math.stats.two-way-anova`.
