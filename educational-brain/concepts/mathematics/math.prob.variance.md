# math.prob.variance

## Identity
- **KG id**: `math.prob.variance`
- **Domain**: math.prob
- **Requires**: `math.prob.expected-value`
- **Unlocks**: `math.prob.covariance`, `math.prob.chebyshev`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Compute $\text{Var}(X)=E[(X-\mu)^2]=E[X^2]-(E[X])^2$ (the shortcut formula, ALWAYS requiring the
subtraction), never reporting $E[X^2]$ alone as the variance; distinguish variance $\sigma^2$
from standard deviation $\sigma=\sqrt{\text{Var}(X)}$; and apply the linear-transform rules
$\text{Var}(X+c)=\text{Var}(X)$ (shifts never change spread) and $\text{Var}(aX+b)=a^2
\text{Var}(X)$ (only the scaling factor matters, squared).

## Core Understanding
VARIANCE IS $E[X^2]-(E[X])^2$, NEVER $E[X^2]$ ALONE: for $E[X]=3,E[X^2]=13$: $\text{Var}(X)=
13-3^2=13-9=4$ — NOT 13. $E[X^2]$ measures the average squared MAGNITUDE (always positive, even
for a constant far from zero); $\text{Var}(X)$ measures the average squared DISTANCE FROM THE
MEAN. For a constant random variable $X\equiv5$: $E[X]=5,E[X^2]=25$, so $\text{Var}(X)=25-25=0$ —
correctly zero spread — while $E[X^2]=25\ne0$, showing the two quantities genuinely differ
whenever $E[X]\ne0$.

VARIANCE AND STANDARD DEVIATION ARE DIFFERENT QUANTITIES — $\sigma^2$ VERSUS $\sigma$, NEVER
INTERCHANGEABLE: for the PMF $P(X=0)=1/4,P(X=2)=1/2,P(X=4)=1/4$: $E[X]=2,E[X^2]=6$, so
$\text{Var}(X)=6-4=2$; the standard deviation is $\sigma=\sqrt2\approx1.41$ — a DIFFERENT number
from the variance itself. Reporting $\sqrt{\text{Var}(X)}$ when asked for $\text{Var}(X)$
conflates the two.

SHIFTS NEVER CHANGE VARIANCE; ONLY SCALING FACTORS DO, SQUARED: adding a constant $c$ moves EVERY
value by the same amount, so all deviations from the (shifted) mean stay IDENTICAL —
$\text{Var}(X+c)=\text{Var}(X)$ exactly. But scaling by $a$ stretches distances by a factor of
$a$, and since variance SQUARES distances, $\text{Var}(aX+b)=a^2\text{Var}(X)$ — for
$\text{Var}(X)=16$: $\text{Var}(2X-5)=2^2\cdot16=64$, the constant $-5$ contributing NOTHING,
while the coefficient 2 contributes as $2^2=4$.

## Mental Models
- **"Variance is always E[X²] minus the mean squared — never E[X²] alone; the subtraction is what
  centers the measurement on spread rather than raw magnitude."**
- **"Shifts don't spread, scales do — squared. Adding a constant never changes variance;
  multiplying by a does, by a factor of a²."**

## Why Students Fail

### MC-1: VARIANCE-IS-E[X²]
- **Surface form**: computes $E[X^2]$ and reports it as $\text{Var}(X)$, omitting the subtraction
  of $(E[X])^2$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  the shortcut formula's two-term structure invites stopping after computing only the first,
  more visually prominent term).
- **Repair**: re-derive the constant-random-variable example, showing $E[X^2]\ne0$ while
  $\text{Var}(X)=0$ correctly.

### MC-2: VARIANCE-IS-STANDARD-DEVIATION
- **Surface form**: computes $\sqrt{E[X^2]-(E[X])^2}$ and calls the result the variance, confusing
  $\sigma$ with $\sigma^2$.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared severity — $\sigma$ and
  $\sigma^2$ are visually similar notations for related but genuinely different quantities).
- **Repair**: re-anchor on labeling both quantities explicitly in every computation — $\sigma^2$
  as variance, $\sigma$ as standard deviation.

### MC-3: SHIFT-CHANGES-VARIANCE
- **Surface form**: writes $\text{Var}(X+c)=\text{Var}(X)+c$, believing a constant shift changes
  spread.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — the mean's own
  linearity rule $E[X+c]=E[X]+c$ is easy to over-apply to variance, which behaves differently).
- **Repair**: re-derive that every deviation $(X+c)-(\mu+c)=X-\mu$ stays identical after a shift,
  so spread is genuinely unchanged.

## Misconceptions

### MC-1: VARIANCE-IS-E[X²]
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: VARIANCE-IS-STANDARD-DEVIATION
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: SHIFT-CHANGES-VARIANCE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Variance is the average squared distance from home base — E[X²] alone measures average
  squared distance from ZERO, a completely different reference point unless the mean happens to
  be zero."**
- **Anti-analogy**: adding a constant to every value of X is NOT like scaling it — a shift moves
  the whole distribution without stretching it, leaving variance exactly unchanged.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: constant $X\equiv5$: $E[X^2]=25\ne0=\text{Var}(X)$ —
  direct proof the two quantities differ.
- **Demonstration 2 (targets MC-2)**: PMF giving $\text{Var}(X)=2$, $\sigma=\sqrt2\approx1.41$ —
  labeled explicitly as two different numbers.
- **Demonstration 3 (targets MC-3)**: test scores with $\text{Var}(X)=100$; adding 10 points to
  every score gives $\text{Var}(X+10)=100$, unchanged.

## Discovery Questions
1. "Is Var(X) the same as E[X²], or does something need to be subtracted?"
2. "Is √Var(X) the same number as Var(X)?"
3. "If you add a constant to every value of X, does the variance change?"

## Teaching Sequence
1. **Analogy bridge**: the spread-from-center analogy contrasting two same-mean classes, working
   Demonstration 1's constant-RV check, isolating MC-1.
2. **Worked example pair**: a discrete PMF and continuous Uniform variance computation, working
   Demonstration 2's explicit $\sigma^2$-versus-$\sigma$ labeling, isolating MC-2.
3. **Conceptual anchor**: the linear-transform rule table, working Demonstration 3's shift
   invariance, isolating MC-3.
4. **Mastery gate**: require a correct shortcut-formula variance computation for a new
   distribution, a correctly labeled variance-versus-standard-deviation pair, and a correct
   application of $\text{Var}(aX+b)=a^2\text{Var}(X)$, at the Blueprint's own stated MAMR of 5/5
   (⌈0.9×5⌉).

## Tutor Actions
- Never accept $E[X^2]$ reported as $\text{Var}(X)$ without the subtraction shown.
- Never accept the standard deviation reported when variance is requested, or vice versa.
- Never accept $\text{Var}(X+c)$ computed as anything other than $\text{Var}(X)$ unchanged.

## Voice Teaching Notes
- Say "did you subtract the mean squared, or just report E[X²]?" whenever variance is computed.
- When a linear transform is applied, ask "does that constant actually change the spread, or
  only the scaling factor?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $\text{Var}(X)$ via the shortcut formula
  for a new discrete or continuous distribution.
- **Rung 2 (application)**: learner correctly distinguishes variance from standard deviation in a
  computation requiring both.
- **Rung 3 (transfer)**: learner correctly applies $\text{Var}(aX+b)=a^2\text{Var}(X)$ to a new
  linear-transform scenario and explains why the constant term contributes nothing.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the constant-random-variable example.
- If MC-2 recurs, re-anchor on explicit $\sigma^2$-versus-$\sigma$ labeling.
- If MC-3 recurs, re-derive that shifts leave every deviation unchanged.

## Memory Hooks
- "Variance is always E[X²] minus mean-squared — never E[X²] alone."
- "Sigma-squared is variance; sigma is standard deviation — don't blur them."
- "Shifts don't spread, scales do — squared."

## Transfer Connections
- `math.prob.expected-value` (already authored, this campaign, Batch 122): supplies the $E[X]$
  and $E[X^2]$ machinery this concept's shortcut formula is built from directly.
- `math.prob.covariance` (not yet authored): the KG's declared unlock, extending variance to the
  joint spread of two random variables.
- `math.prob.chebyshev` (not yet authored): the KG's declared unlock, using variance to bound tail
  probabilities.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.variance.md`, reused by reference for
  its spread-from-center analogy, its discrete/continuous worked example pair, its linear-
  transform rule table, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe, computing a fair game's variance
  and applying the linear-transform rules to a scaled-and-shifted payoff.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.expected-
  value`, unlocks `math.prob.covariance`/`math.prob.chebyshev`, cross_links none,
  proficient/apply, mastery_threshold 0.9, estimated_hours 4) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 123): authored. First entry this batch. Companion batch concept:
  `math.real.absolute-convergence`.
