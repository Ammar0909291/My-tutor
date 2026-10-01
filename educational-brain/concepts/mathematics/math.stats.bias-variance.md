# math.stats.bias-variance

## Identity
- **KG id**: `math.stats.bias-variance`
- **Domain**: math.stats
- **Requires**: `math.stats.estimator`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Define bias $=E[\hat\theta]-\theta$ and variance $=E[(\hat\theta-E[\hat\theta])^2]$ as two
DIFFERENT kinds of estimator error, NEVER conflated; apply $\text{MSE}=\text{Bias}^2+\text{
Variance}$, NEVER adding bias and variance directly without squaring the bias first; and recognize
the trade-off — an unbiased estimator can have HIGH variance while a slightly biased one can have
LOWER overall MSE — NEVER assuming "unbiased" automatically means "best."

## Core Understanding
BIAS AND VARIANCE ANSWER GENUINELY DIFFERENT QUESTIONS — NEVER THE SAME QUANTITY: for an estimator
with $E[\hat\theta]=5.2$ when the true parameter is $\theta=5$, and $\text{Var}(\hat\theta)=0.09$:
$\text{Bias}=5.2-5=0.2$ (how far the estimator's AVERAGE is from the truth), while the variance
$0.09$ separately measures how SPREAD OUT individual estimates are AROUND that average. Computing
"bias" as simply the variance or some other spread measure conflates two entirely different
concepts — one asks "is the average off?", the other asks "how much does it wobble around its own
average?" — and each requires its own separate formula.

MSE REQUIRES SQUARING THE BIAS BEFORE ADDING VARIANCE — NEVER ADDING THEM DIRECTLY: for bias
$=0.2$ and variance $=0.09$: $\text{MSE}=(0.2)^2+0.09=0.04+0.09=0.13$. Computing MSE as simply
BIAS plus VARIANCE without squaring first gives the WRONG value $0.2+0.09=0.29$ — the
decomposition specifically requires SQUARING the bias term before adding it to the variance, never
a bare linear sum.

AN UNBIASED ESTIMATOR CAN HAVE WORSE MSE THAN A BIASED ONE — NEVER ASSUME UNBIASED MEANS BEST:
Estimator A (unbiased, bias$=0$, variance$=1.0$) has $\text{MSE}=0+1.0=1.0$. Estimator B (slightly
biased, bias$=0.3$, variance$=0.2$) has $\text{MSE}=(0.3)^2+0.2=0.09+0.2=0.29$ — genuinely LOWER
than Estimator A's, despite B being biased and A being perfectly unbiased. Assuming an UNBIASED
estimator must always be preferable (equating "unbiased" with "best" or "most accurate" in an
unqualified sense) ignores that variance matters equally — the FULL MSE, accounting for both terms,
is the complete measure of estimator quality, never bias alone.

## Mental Models
- **"Bias asks 'is the average off-target?' Variance asks 'how much does it scatter around its
  own average?' — two separate questions, never one."**
- **"MSE squares the bias before adding — never a plain bias-plus-variance sum."**
- **"Unbiased isn't a trophy — a little bias can buy a lot less variance, and MSE is the judge,
  never bias alone."**

## Why Students Fail

### MC-1: BIAS-AND-VARIANCE-CONFLATED-AS-THE-SAME-QUANTITY
- **Surface form**: confuses bias (average distance from the true parameter) with variance
  (spread around the estimator's own average), treating them as the same or interchangeable.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-derive each quantity separately from its own defining formula.

### MC-2: MSE-COMPUTED-BY-ADDING-BIAS-AND-VARIANCE-WITHOUT-SQUARING-THE-BIAS
- **Surface form**: computes MSE as bias plus variance directly, without squaring the bias term
  first as the decomposition requires.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-apply the decomposition formula explicitly, squaring the bias term first.

## Misconceptions

### MC-1: BIAS-AND-VARIANCE-CONFLATED-AS-THE-SAME-QUANTITY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: MSE-COMPUTED-BY-ADDING-BIAS-AND-VARIANCE-WITHOUT-SQUARING-THE-BIAS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Bias is your average dart landing off-center from the bullseye; variance is how scattered
  your darts are around wherever they happen to average out — two independent problems with your
  aim."**
- **Anti-analogy**: preferring an unbiased estimator by default, without ever checking its
  variance, is like choosing a rifle solely because it's perfectly zeroed, ignoring that it
  scatters shots wildly — accuracy on average means nothing if each individual shot is far off.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the separate bias and variance computation from
  $E[\hat\theta]=5.2$, $\theta=5$, $\text{Var}=0.09$.
- **Demonstration 2 (targets MC-2)**: the correct squared-bias MSE decomposition versus the
  incorrect unsquared sum.
- **Demonstration 3**: the Estimator-A-versus-Estimator-B MSE comparison showing the biased
  estimator wins.

## Discovery Questions
1. "Are bias and variance the same quantity, or do they measure two different things about an
   estimator?"
2. "When computing MSE, do you add bias and variance directly, or square the bias first?"
3. "Can a biased estimator ever have lower overall error (MSE) than an unbiased one?"

## Teaching Sequence
1. **Conceptual shift**: the separate bias-and-variance computation, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the correct-versus-incorrect MSE decomposition, working Demonstration 2,
   isolating MC-2.
3. **Representation shift**: the biased-estimator-wins comparison, working Demonstration 3.
4. **Mastery gate**: require correct separate bias and variance computations, a correct squared-
   bias MSE decomposition, and a correct explanation of why unbiasedness doesn't guarantee the
   lowest MSE, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept bias and variance computed as the same or an interchangeable quantity.
- Never accept MSE computed by adding bias and variance without squaring the bias first.
- Never accept "unbiased" treated as automatically meaning "best" or "lowest error."

## Voice Teaching Notes
- Say "is that measuring how far off the average is, or how spread out the individual estimates
  are?" whenever bias or variance is computed.
- Ask "did you square the bias before adding it to the variance?" whenever an MSE is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes bias and variance separately from a given
  scenario.
- **Rung 2 (application)**: learner correctly applies the squared-bias MSE decomposition.
- **Rung 3 (transfer)**: learner correctly justifies choosing a biased, lower-variance model over
  an unbiased, higher-variance one using the MSE decomposition.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive bias and variance separately from their own defining formulas.
- If MC-2 recurs, re-apply the decomposition formula explicitly, squaring the bias term first.

## Memory Hooks
- "Bias: how far off the average. Variance: how spread out around that average — never the same
  question."
- "Square the bias before adding — never a plain sum."
- "A little bias can buy a lot less variance — unbiased is never automatically best."

## Transfer Connections
- `math.stats.estimator` (already authored, this campaign, Batch 200): supplies the general
  estimator framework bias and variance are the two key quality properties of.

## Cross-Subject Connections
- Machine learning model selection: choosing between a high-variance unbiased model and a
  lower-variance slightly-biased model is one of the most consequential, widely-cited decisions
  in statistical learning practice.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.bias-variance.md`, reused by
  reference for its separate bias/variance computation example, its squared-bias MSE
  decomposition contrast, its biased-estimator-wins comparison, and its two-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a machine learning engineer
  choosing between an unbiased high-variance model and a biased low-variance model for housing
  price prediction.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.estimator`, unlocks none, cross_links none, proficient/analyze,
  mastery_threshold 0.85, estimated_hours 4) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 207): authored. Second entry this batch. Companion batch concept:
  `math.stats.consistency`.
