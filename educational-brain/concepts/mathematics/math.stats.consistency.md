# math.stats.consistency

## Identity
- **KG id**: `math.stats.consistency`
- **Domain**: math.stats
- **Requires**: `math.stats.estimator`, `math.prob.convergence-types`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 3

## Learning Objective
Define consistency — $\hat\theta_n\to^P\theta$ as $n\to\infty$ — as a statement about LARGE-SAMPLE
behavior, NEVER about any single fixed-size sample; apply the sufficient condition "bias$\to0$
AND variance$\to0$," NEVER checking only one of the two; and recognize the Law of Large Numbers
directly implies the sample mean is consistent for the population mean — NEVER a separate fact
requiring independent proof.

## Core Understanding
CONSISTENCY IS A LARGE-SAMPLE LIMIT PROPERTY — NEVER A FIXED-$n$ ACCURACY GUARANTEE: an estimator
"consistent" for $\theta$ means $\hat\theta_n\to^P\theta$ as $n\to\infty$ — it gets ARBITRARILY
close to $\theta$ eventually, with high probability, as sample size grows without bound. It makes
NO promise about performance at any SPECIFIC, small, fixed sample size like $n=10$. Interpreting
"consistent" as "accurate for any sample size, including small ones" mistakes an ASYMPTOTIC
guarantee for a claim about every individual $n$ — consistency says nothing directly about how
good the estimator is for one specific, fixed sample.

THE SUFFICIENT CONDITION REQUIRES BOTH BIAS AND VARIANCE TO VANISH — NEVER JUST ONE: for an
estimator with bias $=1/n$ (which $\to0$) and variance $=\sigma^2/n$ (which ALSO $\to0$) as
$n\to\infty$: since BOTH conditions are satisfied, the sufficient condition holds and the
estimator is consistent. Checking only ONE of the two (e.g. verifying bias$\to0$ alone) and
concluding consistency WITHOUT also verifying variance$\to0$ is incomplete — both must hold
TOGETHER for this sufficient condition to apply (it is sufficient, not necessary — other routes to
consistency exist, but this is the standard practical check).

THE SAMPLE MEAN'S CONSISTENCY IS A DIRECT RESTATEMENT OF THE LLN — NEVER A SEPARATE FACT NEEDING
ITS OWN PROOF: the Law of Large Numbers states $\bar X_n\to^P\mu$ as $n\to\infty$ — this IS
EXACTLY the definition of consistency, applied to the sample mean estimating the population mean.
The sample mean's consistency is not an independent result requiring its own derivation; it is the
LLN, restated in consistency's vocabulary.

## Mental Models
- **"Consistency is a promise about the far horizon, never about today's specific sample."**
- **"Bias→0 and variance→0 are a package deal — checking just one leaves the sufficient
  condition unverified."**
- **"The sample mean's consistency isn't a new fact — it's the Law of Large Numbers wearing a
  different name."**

## Why Students Fail

### MC-1: CONSISTENCY-INTERPRETED-AS-A-FIXED-SAMPLE-SIZE-ACCURACY-GUARANTEE
- **Surface form**: interprets "consistent" as meaning the estimator is accurate for any sample
  size, rather than correctly understanding it as a purely asymptotic (large-$n$-limit) property.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-state the formal definition explicitly, emphasizing the $n\to\infty$ limit.

### MC-2: ONLY-ONE-OF-BIAS-OR-VARIANCE-CONDITIONS-CHECKED-FOR-THE-SUFFICIENT-CRITERION
- **Surface form**: checks only bias$\to0$ or only variance$\to0$, rather than verifying both
  conditions together as the sufficient criterion requires.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-check both bias and variance limits explicitly and separately before concluding
  consistency.

## Misconceptions

### MC-1: CONSISTENCY-INTERPRETED-AS-A-FIXED-SAMPLE-SIZE-ACCURACY-GUARANTEE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ONLY-ONE-OF-BIAS-OR-VARIANCE-CONDITIONS-CHECKED-FOR-THE-SUFFICIENT-CRITERION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Consistency is like a GPS that's guaranteed to eventually pinpoint your exact location —
  never a promise it's accurate on the very first reading."**
- **Anti-analogy**: checking only that bias vanishes and declaring victory is like checking only
  one ingredient of a two-ingredient recipe — the dish (consistency, via this sufficient route)
  isn't done until both are confirmed.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the explicit large-$n$-limit restatement, contrasting
  asymptotic behavior against $n=10$ performance.
- **Demonstration 2 (targets MC-2)**: the bias$=1/n$, variance$=\sigma^2/n$ joint verification.
- **Demonstration 3**: the LLN-as-consistency restatement for the sample mean.

## Discovery Questions
1. "Does calling an estimator 'consistent' tell you anything about how accurate it is for a
   sample of size 10?"
2. "If bias goes to zero but variance does not, is the sufficient condition for consistency
   satisfied?"
3. "Is the sample mean's consistency a separate fact from the Law of Large Numbers, or the same
   fact restated?"

## Teaching Sequence
1. **Conceptual shift**: the asymptotic-versus-fixed-$n$ distinction, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the joint bias-and-variance verification, working Demonstration 2, isolating
   MC-2.
3. **Reused procedure**: the LLN-as-consistency restatement, working Demonstration 3.
4. **Mastery gate**: require a correct statement of consistency's asymptotic nature, a correct
   joint bias/variance verification, and a correct connection to the LLN, at the Blueprint's own
   stated MAMR of 4/5.

## Tutor Actions
- Never accept "consistent" interpreted as an accuracy guarantee for a specific small sample.
- Never accept consistency concluded from checking only bias or only variance alone.
- Never accept the sample mean's consistency presented as requiring separate proof from the LLN.

## Voice Teaching Notes
- Say "is that a claim about n=10, or about what happens as n grows without bound?" whenever
  consistency is being interpreted.
- Ask "have you checked both bias and variance, or just one?" whenever the sufficient condition
  is being applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states consistency's asymptotic definition.
- **Rung 2 (application)**: learner correctly verifies both bias$\to0$ and variance$\to0$ before
  concluding consistency.
- **Rung 3 (transfer)**: learner correctly distinguishes what consistency does and does not
  guarantee for a specific small daily sample in a quality-control scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the formal definition explicitly, emphasizing the $n\to\infty$ limit.
- If MC-2 recurs, re-check both bias and variance limits explicitly and separately.

## Memory Hooks
- "Consistency is about the limit, never about n=10."
- "Bias and variance both vanish — never just one — for the sufficient condition."
- "The sample mean's consistency IS the Law of Large Numbers."

## Transfer Connections
- `math.stats.estimator` (already authored, this campaign, Batch 200): supplies the general
  estimator framework consistency characterizes.
- `math.prob.convergence-types` (already authored, certified domain): supplies the formal
  "converges in probability" definition underlying consistency.

## Cross-Subject Connections
- Quality control: distinguishing "this estimator works well eventually with more data" from
  "this estimator works well right now with today's small sample" is a genuinely important
  practical distinction in manufacturing statistics.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.consistency.md`, reused by reference
  for its asymptotic-versus-fixed-$n$ example, its joint bias/variance verification example, its
  LLN-restatement example, and its two-misconception registry (severity levels adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a quality-control engineer's
  "consistent" defect-rate estimator, distinguishing asymptotic guarantees from small-sample
  accuracy.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.estimator`/`math.prob.convergence-types`, unlocks none, cross_links none,
  proficient/understand, mastery_threshold 0.8, estimated_hours 3) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 207): authored. First entry this batch. Companion batch concept:
  `math.stats.bias-variance`.
