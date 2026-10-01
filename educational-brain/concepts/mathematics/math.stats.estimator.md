# math.stats.estimator

## Identity
- **KG id**: `math.stats.estimator`
- **Domain**: math.stats
- **Requires**: `math.stats.sampling-distribution`, `math.prob.expected-value`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Distinguish an ESTIMATOR $\hat\theta$ (a fixed rule/function of the sample) from an ESTIMATE (the
specific number that rule produces for one particular sample — NEVER interchangeable terms);
define and verify unbiasedness $E[\hat\theta]=\theta$ using linearity of expectation; and define
consistency, recognizing it is INDEPENDENT of unbiasedness — an estimator can be unbiased but NOT
consistent, and unbiasedness is NEVER assumed automatically for any "reasonable-looking"
statistic.

## Core Understanding
AN ESTIMATOR IS A FIXED RULE — AN ESTIMATE IS ITS SAMPLE-SPECIFIC OUTPUT, NEVER THE SAME THING:
the estimator "$\hat\mu=\bar X$" is a RULE: "average whatever sample you collect." Applied to
Sample A (10 scores averaging 78), the ESTIMATE is $\hat\mu=78$. Applied to a DIFFERENT Sample B,
the SAME ESTIMATOR produces the ESTIMATE $\hat\mu=82$. The estimator (the averaging rule) NEVER
changed — only the resulting estimate changed, because the SAMPLE changed. Confusing "the
estimator" with "the number 78" mistakes the rule for one of its many possible outputs.

UNBIASEDNESS IS VERIFIED VIA LINEARITY OF EXPECTATION — NEVER ASSUMED AUTOMATICALLY: for
$\hat\mu=\bar X=\frac1n\sum_{i=1}^nX_i$: $E[\bar X]=\frac1n\sum_{i=1}^nE[X_i]=\frac1n\cdot
n\mu=\mu$ — so $\bar X$ IS unbiased, for ANY sample size $n$, even $n=1$. But unbiasedness is
NEVER automatic for any reasonable-LOOKING statistic — the naive sample variance
$\frac1n\sum(X_i-\bar X)^2$ is actually BIASED (requiring the $n-1$ correction), proving that
$E[\hat\theta]=\theta$ must ALWAYS be explicitly verified, never assumed just because a formula
"looks like it should work."

UNBIASEDNESS AND CONSISTENCY ARE INDEPENDENT PROPERTIES — NEVER ONE IMPLYING THE OTHER: consider
$\hat\mu'=X_1$ (using ONLY the first observation): $E[\hat\mu']=E[X_1]=\mu$ — ALSO unbiased,
exactly like $\bar X$. But its standard error NEVER shrinks as $n$ grows (it only ever looks at
$X_1$), so $\hat\mu'$ is NOT consistent — more data doesn't make it any more reliable. Contrast
with $\bar X$: ALSO unbiased, AND consistent ($\sigma/\sqrt n\to0$ as $n\to\infty$). Both
estimators share unbiasedness, yet ONE improves with more data and one DOES NOT — proving
unbiasedness ALONE says NOTHING about whether more data helps; the two properties must be
verified SEPARATELY, never assumed to travel together.

## Mental Models
- **"An estimator is a recipe you could apply to ANY sample before you've even collected one; an
  estimate is what that recipe outputs from the ONE sample you actually got."**
- **"Unbiasedness must be proven, not assumed — a formula that looks reasonable can still be
  biased, like the naive sample variance."**
- **"Unbiasedness is about the average being exactly right; consistency is about more data
  genuinely helping — two separate promises, never one guaranteeing the other."**

## Why Students Fail

### MC-1: ESTIMATOR-AND-ESTIMATE-CONFLATED
- **Surface form**: treats "estimator" and "estimate" as interchangeable terms, rather than
  distinguishing the fixed rule (estimator) from its sample-specific numeric output (estimate).
- **Birth type**: Foundational severity (Blueprint's own declared severity — the two terms sound
  similar and are easy to use loosely).
- **Repair**: re-walk the averaging rule applied to two different samples, producing two
  different estimates from one unchanged estimator.

### MC-2: UNBIASEDNESS-ASSUMED-TO-IMPLY-CONSISTENCY
- **Surface form**: assumes an unbiased estimator must also be consistent (improve with more
  data), rather than recognizing these as independent properties.
- **Birth type**: Foundational severity (Blueprint's own declared severity — both sound like
  "good estimator" properties, inviting conflation).
- **Repair**: re-present the $X_1$-only estimator, unbiased yet not consistent, as direct proof
  of independence.

### MC-3: SAMPLE-STATISTIC-ASSUMED-ALWAYS-UNBIASED
- **Surface form**: assumes any reasonable-looking sample statistic is automatically an unbiased
  estimator of the corresponding population parameter, without verifying $E[\hat\theta]=\theta$
  directly.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the single most common
  "gotcha" in introductory statistics, via the naive sample variance's bias).
- **Repair**: note that verifying unbiasedness always requires the explicit $E[\hat\theta]=\theta$
  computation; some natural-looking statistics genuinely fail this check.

## Misconceptions

### MC-1: ESTIMATOR-AND-ESTIMATE-CONFLATED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: UNBIASEDNESS-ASSUMED-TO-IMPLY-CONSISTENCY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: SAMPLE-STATISTIC-ASSUMED-ALWAYS-UNBIASED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An estimator is a cooking recipe; an estimate is tonight's actual dish — the same recipe
  produces a different-tasting dish depending on which ingredients (sample) you used."**
- **Anti-analogy**: unbiasedness is not a general-purpose seal of approval — an unbiased
  estimator that never improves with more data (like using only the first observation) is still
  a poor practical choice, precisely because consistency is a separate, unguaranteed property.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the same averaging rule applied to Sample A and Sample B,
  producing two different estimates.
- **Demonstration 2**: the linearity-of-expectation verification that $\bar X$ is unbiased for
  $\mu$.
- **Demonstration 3 (targets MC-2)**: the $X_1$-only estimator, unbiased but not consistent,
  contrasted with $\bar X$.

## Discovery Questions
1. "If two people calculate '$\bar X$' on two different samples and get different numbers, does
   that mean they used different estimators?"
2. "If an estimator is unbiased, does that guarantee it also gets more reliable with a bigger
   sample?"
3. "Is any reasonable-looking sample statistic automatically an unbiased estimator of the
   corresponding population parameter?"

## Teaching Sequence
1. **Contrast pair**: the estimator-versus-estimate distinction, working Demonstration 1,
   isolating MC-1.
2. **Representation shift**: the linearity-of-expectation unbiasedness verification, working
   Demonstration 2.
3. **Conflict evidence**: the unbiased-but-not-consistent $X_1$-only estimator, working
   Demonstration 3, isolating MC-2 (and MC-3 via the naive-variance forward pointer).
4. **Mastery gate**: require a correct estimator-versus-estimate identification, a correct
   unbiasedness verification via linearity of expectation, and a correct explanation of why
   unbiasedness does not imply consistency, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept "estimator" and "estimate" used interchangeably.
- Never accept unbiasedness assumed for a statistic without an explicit $E[\hat\theta]=\theta$
  verification.
- Never accept a claim that an unbiased estimator is automatically consistent.

## Voice Teaching Notes
- Say "is that the rule, or the number it produced for this particular sample?" whenever
  "estimator" or "estimate" is used.
- Ask "have you actually verified $E[\hat\theta]=\theta$, or are you assuming it looks right?"
  whenever unbiasedness is claimed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes an estimator from an estimate using a
  concrete example.
- **Rung 2 (application)**: learner correctly verifies unbiasedness for a given estimator using
  linearity of expectation.
- **Rung 3 (transfer)**: learner correctly explains why an unbiased estimator need not be
  consistent, and identifies when consistency does or does not hold for a fixed-sample-size
  procedure.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the averaging rule applied to two different samples.
- If MC-2 recurs, re-present the $X_1$-only unbiased-but-not-consistent estimator.
- If MC-3 recurs, re-anchor on the naive sample variance's actual bias as a counterexample to
  automatic unbiasedness.

## Memory Hooks
- "Estimator is the recipe; estimate is tonight's dish."
- "Unbiasedness must be proven — never assumed from a formula 'looking right.'"
- "Unbiased and consistent are separate promises — one never guarantees the other."

## Transfer Connections
- `math.stats.sampling-distribution` (already authored, this campaign, Batch 199): supplies the
  sampling-distribution machinery ($E[\bar X]=\mu$, standard error $\sigma/\sqrt n$) that
  unbiasedness and consistency are defined against.
- `math.prob.expected-value` (already authored, certified domain): supplies linearity of
  expectation, used directly to verify unbiasedness.

## Cross-Subject Connections
- Quality control: choosing between a large-sample and small-sample defect-rate estimator
  directly illustrates why consistency, not just unbiasedness, matters in practice.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.estimator.md`, reused by reference
  for its estimator-versus-estimate example, its linearity-of-expectation unbiasedness
  verification, its $X_1$-only unbiased-but-inconsistent contrast, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a quality-control engineer
  comparing two defect-rate estimators of different sample sizes, evaluating consistency for a
  fixed-sample-size procedure.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.sampling-distribution`/`math.prob.expected-value`, unlocks none, cross_links none,
  proficient/understand, mastery_threshold 0.85, estimated_hours 4) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 200): authored. Second entry this batch. Companion batch concept:
  `math.stats.standard-error`.
