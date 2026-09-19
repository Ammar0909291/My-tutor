# math.stats.ci-proportion

## Identity
- **KG id**: `math.stats.ci-proportion`
- **Domain**: math.stats
- **Requires**: `math.stats.confidence-interval`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Construct $\hat p\pm z_{\alpha/2}\sqrt{\hat p(1-\hat p)/n}$, reproducing the standard error
formula's exact structure — NEVER substituting $\hat p^2$ or omitting division by $n$; verify the
large-sample condition $n\hat p\ge10$ AND $n(1-\hat p)\ge10$ BEFORE constructing the interval; and
recognize BOTH conditions must hold TOGETHER — NEVER checking only one and assuming the other
follows, since a skewed $\hat p$ can satisfy one while badly failing the other.

## Core Understanding
THE STANDARD ERROR FORMULA'S STRUCTURE MUST BE REPRODUCED EXACTLY — NEVER $\hat p^2$ OR A MISSING
DIVISION BY $n$: for $\hat p=0.6$, $n=100$: using $z_{0.025}\approx1.96$: $0.6\pm1.96\sqrt{0.6(0.4)
/100}=0.6\pm1.96\sqrt{0.0024}=0.6\pm1.96(0.049)=0.6\pm0.096$, giving $(0.504,0.696)$. Using the
WRONG variance formula inside the square root (e.g. $\hat p^2$ instead of $\hat p(1-\hat p)$, or
forgetting to divide by $n$) produces a genuinely wrong interval — the formula's specific
structure ($\hat p(1-\hat p)/n$ under the square root) must be reproduced EXACTLY, never
approximated.

BOTH LARGE-SAMPLE CONDITIONS MUST BE CHECKED — NEVER JUST ONE: for $\hat p=0.98$, $n=40$: check
$n\hat p=40(0.98)=39.2\ge10$ ✓. Check $n(1-\hat p)=40(0.02)=0.8$ — this is NOT $\ge10$ ✗. Since
ONE of the two conditions FAILS, the large-sample condition is NOT satisfied overall, and the
normal-approximation-based interval would be UNRELIABLE. Checking ONLY the first condition
(passing easily here) and concluding the large-sample condition holds, proceeding to construct
the interval anyway, is WRONG — a highly skewed $\hat p$ can pass one condition while badly
failing the other, so BOTH must be verified INDEPENDENTLY, never assumed to travel together.

BOTH CONDITIONS MUST HOLD SIMULTANEOUSLY FOR THE NORMAL APPROXIMATION TO BE TRUSTWORTHY — NEVER
ONE SUBSTITUTING FOR THE OTHER: for a well-behaved case, $\hat p=0.45$, $n=200$: check $n\hat
p=90\ge10$ ✓, $n(1-\hat p)=110\ge10$ ✓ — both hold, so the standard interval is valid: using
$z_{0.05}\approx1.645$, $0.45\pm1.645\sqrt{0.45(0.55)/200}\approx0.45\pm0.058$, giving
$(0.392,0.508)$. This well-behaved case contrasts directly with the $\hat p=0.98$ failure —
demonstrating that skew (not just sample size alone) drives whether both conditions hold.

## Mental Models
- **"The formula under the square root is p̂(1−p̂)/n exactly — never p̂² or a missing n."**
- **"Enough expected successes AND enough expected failures — both counts must clear 10, never
  just one."**
- **"A skewed p̂ can ace one large-sample check while failing the other — checking only one is
  never enough."**

## Why Students Fail

### MC-1: STANDARD-ERROR-FORMULA-FOR-PROPORTION-MISCONSTRUCTED
- **Surface form**: uses an incorrect variance/standard error formula (e.g. $\hat p^2$ instead of
  $\hat p(1-\hat p)$, or omitting division by $n$) when constructing the confidence interval.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-build the formula piece by piece, confirming $\hat p(1-\hat p)$ divided by $n$,
  under a square root.

### MC-2: ONLY-ONE-LARGE-SAMPLE-CONDITION-CHECKED-INSTEAD-OF-BOTH
- **Surface form**: verifies only one of the two required large-sample conditions ($n\hat p\ge10$
  or $n(1-\hat p)\ge10$), rather than checking both independently.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-check both conditions explicitly and independently before proceeding.

## Misconceptions

### MC-1: STANDARD-ERROR-FORMULA-FOR-PROPORTION-MISCONSTRUCTED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ONLY-ONE-LARGE-SAMPLE-CONDITION-CHECKED-INSTEAD-OF-BOTH
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The standard error formula for a proportion is a specific recipe — swapping p̂² for p̂(1−p̂)
  is a different dish entirely, not a close substitute."**
- **Anti-analogy**: checking only the "successes" count and skipping the "failures" count is like
  checking only one leg of a two-legged table for stability — a skewed proportion can leave one
  leg solid while the other collapses.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the exact $\hat p=0.6$, $n=100$ formula construction.
- **Demonstration 2 (targets MC-2)**: the $\hat p=0.98$, $n=40$ case where one condition passes
  and the other fails.
- **Demonstration 3**: the well-behaved $\hat p=0.45$, $n=200$ case where both conditions hold.

## Discovery Questions
1. "Is the formula under the square root p̂(1−p̂)/n, or something else?"
2. "If n×p̂ is comfortably above 10, does that guarantee n×(1−p̂) is too?"
3. "What should you do if the large-sample condition fails, rather than constructing the
   interval anyway?"

## Teaching Sequence
1. **Conceptual shift**: the exact formula-structure reproduction, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the one-condition-passes-one-fails skewed-proportion case, working
   Demonstration 2, isolating MC-2.
3. **Reused procedure**: the well-behaved both-conditions-hold case, working Demonstration 3.
4. **Mastery gate**: require a correct standard-error-formula construction, a correct independent
   verification of both large-sample conditions, and a correct explanation of why both must be
   checked, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the standard error formula reproduced with $\hat p^2$ or a missing division by
  $n$.
- Never accept the large-sample condition concluded from checking only one of its two parts.
- Never accept an interval constructed when the large-sample condition has not been verified.

## Voice Teaching Notes
- Say "is that p̂ times (1 minus p̂), divided by n, under a square root?" whenever the formula is
  being applied.
- Ask "did you check n times p̂ AND n times (1 minus p̂), or just one of them?" whenever the
  large-sample condition is being verified.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs the confidence interval formula for a
  given $\hat p$ and $n$.
- **Rung 2 (application)**: learner correctly verifies both large-sample conditions
  independently, identifying when one passes while the other fails.
- **Rung 3 (transfer)**: learner correctly evaluates a low-awareness-proportion scenario's
  large-sample condition and explains what to do if it fails.

## Tutor Recovery Strategy
- If MC-1 recurs, re-build the formula piece by piece.
- If MC-2 recurs, re-check both conditions explicitly and independently.

## Memory Hooks
- "p̂(1−p̂)/n under the square root — never p̂² or a missing n."
- "Both counts must clear 10 — never just one."
- "A skewed p̂ can pass one check and fail the other — always verify both."

## Transfer Connections
- `math.stats.confidence-interval` (already authored, this campaign, Batch 201): supplies the
  general CI framework this concept specializes to a proportion via the normal approximation to
  the binomial.

## Cross-Subject Connections
- Market research and survey analysis: a small, skewed observed proportion (e.g. low awareness of
  a product) is exactly the realistic scenario where the large-sample condition genuinely fails,
  making the verification step practically consequential.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.ci-proportion.md`, reused by
  reference for its exact-formula-construction example, its skewed-proportion condition-failure
  example, its well-behaved both-conditions-hold example, and its two-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a marketing analyst's 4%
  product-awareness survey, verifying the large-sample condition and explaining the fallback when
  it fails.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.confidence-interval`, unlocks none, cross_links none, proficient/apply,
  mastery_threshold 0.85, estimated_hours 3) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 209): authored. Second entry this batch. Companion batch concept:
  `math.stats.ci-mean`.
