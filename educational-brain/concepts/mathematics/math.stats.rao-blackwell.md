# math.stats.rao-blackwell

## Identity
- **KG id**: `math.stats.rao-blackwell`
- **Domain**: math.stats
- **Requires**: `math.stats.sufficient-statistic`, `math.stats.bias-variance`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 4

## Learning Objective
State the Rao-Blackwell theorem: if $\hat\theta$ is UNBIASED and $T$ is sufficient for $\theta$,
then $\tilde\theta=E[\hat\theta\mid T]$ is also unbiased and has MSE no greater than $\hat\theta$'s
— NEVER concluding unbiasedness starting from a biased $\hat\theta$; recognize the guarantee is
"no greater than" ($\le$), NEVER "strictly less" — conditioning can leave the estimator unchanged
but never worse; and recognize Rao-Blackwellization as a systematic improvement RECIPE, starting
from ANY unbiased estimator and a known sufficient statistic.

## Core Understanding
THE THEOREM'S UNBIASEDNESS CONCLUSION REQUIRES AN ALREADY-UNBIASED $\hat\theta$ — NEVER APPLIED
TO RESCUE A BIASED ONE: given $\hat\theta$ unbiased and $T$ sufficient for $\theta$: $\tilde\theta
=E[\hat\theta\mid T]$ is GUARANTEED unbiased (same as $\hat\theta$) AND has MSE $\le\hat\theta$'s
MSE. Assuming the theorem ALSO guarantees $\tilde\theta$ unbiased EVEN IF $\hat\theta$ ISN'T
(attempting to apply the theorem starting from a BIASED estimator) is WRONG — the unbiasedness
conclusion specifically REQUIRES starting from an ALREADY unbiased $\hat\theta$; the theorem never
magically removes bias from a biased starting estimator.

"NO GREATER THAN" INCLUDES EXACT EQUALITY — NEVER A GUARANTEE OF STRICT IMPROVEMENT: if $\hat
\theta$ is ALREADY a function of the sufficient statistic $T$ alone (i.e. $\hat\theta=g(T)$):
since $\hat\theta$ is already a function of $T$, conditioning on $T$ changes NOTHING: $E[g(T)\mid
T]=g(T)=\hat\theta$ EXACTLY — so $\tilde\theta=\hat\theta$, with NO improvement (but also no
worsening). Assuming Rao-Blackwellization must ALWAYS produce a STRICTLY better (lower MSE)
estimator is WRONG — the guarantee is "no worse," which INCLUDES the possibility of "exactly the
same," never an unconditional promise of strict improvement.

RAO-BLACKWELLIZATION IS A SYSTEMATIC IMPROVEMENT RECIPE — NEVER REQUIRING AD HOC CLEVERNESS: given
a crude, inefficient unbiased estimator (using just the FIRST observation $X_1$ to estimate a
population mean, ignoring the rest of the sample) and knowing the sample MEAN $\bar X$ is
sufficient: computing $E[X_1\mid\bar X]$ produces a NEW estimator GUARANTEED at least as good as
$X_1$ alone — and in this classic case works out to EXACTLY $\bar X$ itself, a dramatic
improvement. This demonstrates the theorem's practical value as a mechanical, systematic
improvement procedure, never merely an abstract inequality requiring fresh insight each time.

## Mental Models
- **"The theorem starts from unbiased and stays unbiased — it never manufactures unbiasedness
  out of a biased starting point."**
- **"No greater than means at worst unchanged, never a promise of strict improvement every
  time."**
- **"Rao-Blackwellization is a mechanical recipe — feed in any unbiased estimator and a sufficient
  statistic, get out one that's at least as good."**

## Why Students Fail

### MC-1: THEOREM-APPLIED-STARTING-FROM-A-BIASED-ESTIMATOR-EXPECTING-UNBIASEDNESS
- **Surface form**: attempts to apply the Rao-Blackwell theorem starting from a biased estimator,
  expecting the conclusion of unbiasedness despite the theorem's precondition not being met.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-confirm the starting estimator $\hat\theta$ is genuinely unbiased before invoking
  the theorem's conclusion.

### MC-2: RAO-BLACKWELLIZATION-EXPECTED-TO-ALWAYS-PRODUCE-STRICT-IMPROVEMENT
- **Surface form**: expects Rao-Blackwellization to always strictly improve an estimator's MSE,
  rather than recognizing the theorem's "no greater than" guarantee allows for exact equality.
- **Birth type**: Moderate severity (Blueprint's own declared severity).
- **Repair**: re-derive the no-change case explicitly, confirming the "no greater than" guarantee
  includes equality.

## Misconceptions

### MC-1: THEOREM-APPLIED-STARTING-FROM-A-BIASED-ESTIMATOR-EXPECTING-UNBIASEDNESS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: RAO-BLACKWELLIZATION-EXPECTED-TO-ALWAYS-PRODUCE-STRICT-IMPROVEMENT
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Rao-Blackwell is a filter that never lets an estimator get worse — but if it's already clean,
  the filter just passes it through unchanged."**
- **Anti-analogy**: expecting the theorem to fix bias is like expecting a polish to straighten a
  bent frame — polishing (conditioning) improves precision, but it was never designed to correct
  a starting flaw the theorem's precondition already ruled out.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the precise unbiasedness-and-MSE conclusion, contrasted with
  the invalid biased-starting-point misapplication.
- **Demonstration 2 (targets MC-2)**: the $\hat\theta=g(T)$ no-change case, $E[g(T)\mid T]=g(T)$.
- **Demonstration 3**: the $X_1$-conditioned-on-$\bar X$ dramatic-improvement example.

## Discovery Questions
1. "Does the Rao-Blackwell theorem's unbiasedness conclusion apply even if you start from a
   biased estimator?"
2. "If an estimator is already a function of the sufficient statistic, does Rao-Blackwellizing it
   still strictly improve it?"
3. "Does applying Rao-Blackwellization to a crude estimator require new problem-specific
   cleverness, or is it a mechanical procedure?"

## Teaching Sequence
1. **Conceptual shift**: the precondition-and-conclusion pairing, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the no-change case when $\hat\theta$ is already a function of $T$, working
   Demonstration 2, isolating MC-2.
3. **Reused procedure**: the $X_1$-to-$\bar X$ improvement recipe, working Demonstration 3.
4. **Mastery gate**: require a correct statement of the theorem's two conclusions, a correct
   explanation of the "no greater than" guarantee's inclusion of equality, and a correct
   application of Rao-Blackwellization to a crude estimator, at the Blueprint's own stated MAMR of
   4/5.

## Tutor Actions
- Never accept the theorem applied to conclude unbiasedness from a starting estimator that isn't
  already unbiased.
- Never accept Rao-Blackwellization assumed to always strictly improve MSE.
- Never accept Rao-Blackwellization described as requiring problem-specific cleverness rather than
  a mechanical procedure.

## Voice Teaching Notes
- Say "is your starting estimator already unbiased, before you invoke this theorem?" whenever
  Rao-Blackwellization is applied.
- Ask "is this a case where the estimator was already a function of T?" whenever a "no
  improvement" outcome is being evaluated.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the theorem's two conclusions given its
  preconditions.
- **Rung 2 (application)**: learner correctly identifies the no-change case when $\hat\theta$ is
  already a function of $T$.
- **Rung 3 (transfer)**: learner correctly applies Rao-Blackwellization to a crude
  first-observation-only estimator, deriving the improved estimator.

## Tutor Recovery Strategy
- If MC-1 recurs, re-confirm the starting estimator's unbiasedness before invoking the theorem.
- If MC-2 recurs, re-derive the no-change case explicitly.

## Memory Hooks
- "Unbiased in, unbiased out — the theorem never fixes bias."
- "No greater than includes equal — never a guarantee of strict improvement."
- "Rao-Blackwellization is mechanical — no fresh cleverness required."

## Transfer Connections
- `math.stats.sufficient-statistic` (already authored, this campaign, Batch 206): supplies the
  sufficient statistic $T$ this theorem conditions on, and previews the Rao-Blackwell idea this
  concept fully states.
- `math.stats.bias-variance` (already authored, this campaign, Batch 207): supplies the MSE
  framework this theorem's improvement guarantee is measured in.

## Cross-Subject Connections
- Statistical practice generally: Rao-Blackwellization is a standard tool for systematically
  improving quick-and-dirty estimators once a sufficient statistic is known, without requiring
  problem-specific derivation each time.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.rao-blackwell.md`, reused by reference
  for its precise theorem-statement example, its no-change-case demonstration, its
  $X_1$-to-$\bar X$ improvement example, and its two-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on Rao-Blackwellizing a crude
  first-observation-only Poisson-rate estimator using the sample total as the sufficient
  statistic.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.sufficient-statistic`/`math.stats.bias-variance`, unlocks none, cross_links none,
  expert/analyze, mastery_threshold 0.7, estimated_hours 4) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 208): authored. Second entry this batch. Companion batch concept:
  `math.stats.method-of-moments`.
