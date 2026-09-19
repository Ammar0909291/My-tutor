# math.prob.normal-distribution

## Identity
- **KG id**: `math.prob.normal-distribution`
- **Domain**: math.prob
- **Requires**: `math.prob.continuous-distributions`
- **Unlocks**: `math.prob.clt`
- **Cross-links**: `math.stats.normal-distribution` (NOT Tier-1 per the Blueprint's own metadata,
  and independently confirmed NOT authored via `ls`; independence mode used, doubly justified)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 6

## Learning Objective
Identify $X\sim N(\mu,\sigma^2)$ by its parameters, correctly reading $\sigma^2$ as the VARIANCE
(never the standard deviation directly); standardize to $Z=(X-\mu)/\sigma$ and use the standard
normal table (or symmetry) to compute $P(X<x)$, $P(X>x)$, $P(a<X<b)$; and apply the 68-95-99.7
empirical rule for quick estimation without table lookup.

## Core Understanding
$N(\mu,\sigma^2)$'S SECOND PARAMETER IS THE VARIANCE — THE STANDARD DEVIATION REQUIRES A SQUARE
ROOT FIRST: for $N(10,4)$: $\sigma^2=4$, so $\sigma=\sqrt4=2$ — NEVER $\sigma=4$. The Z-formula
always needs $\sigma$ (standard deviation), never $\sigma^2$ (variance) directly. For $N(5,16)$:
$\sigma=\sqrt{16}=4$, and $Z=(X-5)/4$ — using $\sigma^2=16$ as the denominator instead would give
an entirely wrong Z-score.

STANDARDIZATION IS $Z=(X-\mu)/\sigma$ — NEVER REVERSED: for $X\sim N(10,1)$, finding $P(X<8)$:
$Z=(8-10)/1=-2$ (negative, since 8 is BELOW the mean), giving $P(X<8)=\Phi(-2)=0.0228$. Reversing
to $Z=(\mu-X)/\sigma=(10-8)/1=2$ gives the WRONG sign, reflecting into the wrong tail entirely
($\Phi(2)=0.9772$, the complement of the correct answer). The formula always subtracts the mean
FROM the data value, never the reverse.

SYMMETRY GIVES $P(X>\mu)=0.5$ FOR ANY NORMAL, REGARDLESS OF $\sigma$: for both $N(0,1)$ and
$N(0,4)$: $P(X>0)=0.5$ in BOTH cases — symmetry about the mean holds regardless of spread, never
needing separate computation. THE 68-95-99.7 EMPIRICAL RULE gives fast estimation: for $N(20,9)$
($\sigma=3$), $P(17<X<23)=P(\mu-\sigma<X<\mu+\sigma)\approx68\%$ — read directly from the rule,
no table needed, since 17 and 23 are each exactly $1\sigma$ from the mean.

## Mental Models
- **"N(μ,σ²) always hands you the variance — square-root it first, every single time, before it
  touches the Z formula."**
- **"Z = (X − μ)/σ: data minus mean, always in that order — a value below the mean gives a
  negative Z, never a positive one."**

## Why Students Fail

### MC-1: SIGMA-VS-SIGMA-SQUARED
- **Surface form**: confuses $\sigma$ and $\sigma^2$ when reading $N(\mu,\sigma^2)$, e.g. using
  $\sigma=4$ instead of $\sigma=\sqrt4=2$ for $N(\cdot,4)$.
- **Birth type**: arises immediately from the $N(\mu,\sigma^2)$ notation itself (Blueprint's own
  declared Foundational status — must be explicitly flagged before any computation).
- **Repair**: re-anchor on always computing $\sigma=\sqrt{\sigma^2}$ as the mandatory first step
  before any standardization.

### MC-2: STANDARDIZATION-SIGN-ERROR
- **Surface form**: computes $Z=(\mu-X)/\sigma$ (reversed) or divides by $\sigma^2$ instead of
  $\sigma$.
- **Birth type**: a natural sign-order slip, especially salient when $X<\mu$ (Blueprint's own
  declared trigger).
- **Repair**: re-derive $Z=(X-\mu)/\sigma$ directly on a below-the-mean example, confirming the
  negative sign is expected and correct.

### MC-3: SYMMETRY-FORGOTTEN
- **Surface form**: does not use Normal symmetry, computing $P(X>\mu)$ from scratch or guessing 0.
- **Birth type**: a failure to recognize the built-in structural shortcut symmetry provides
  (Blueprint's own declared trigger — probability questions involving the mean or symmetric
  intervals).
- **Repair**: re-anchor on $P(X>\mu)=0.5$ holding for ANY Normal, regardless of $\sigma$, verified
  across two different-spread examples.

## Misconceptions

### MC-1: SIGMA-VS-SIGMA-SQUARED
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: STANDARDIZATION-SIGN-ERROR
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: SYMMETRY-FORGOTTEN
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"N(μ,σ²)'s notation is like a nutrition label that always reports calories-squared for some
  reason — you have to square-root it back before it means what you expect."**
- **Anti-analogy**: standardizing is NOT a symmetric operation you can perform in either order —
  $Z=(X-\mu)/\sigma$ and $Z=(\mu-X)/\sigma$ give exactly opposite signs, landing in opposite
  tails.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $N(10,4)$'s $\sigma=\sqrt4=2$, contrasted against the wrong
  $\sigma=4$.
- **Demonstration 2 (targets MC-2)**: $N(10,1)$'s $P(X<8)$ computed correctly via $Z=-2$ versus
  incorrectly via the reversed formula giving $Z=2$.
- **Demonstration 3 (targets MC-3)**: $P(X>0)=0.5$ verified identically for both $N(0,1)$ and
  $N(0,4)$, regardless of spread.

## Discovery Questions
1. "For X~N(10,4), what is σ (the standard deviation)?"
2. "For X~N(10,1), is Z=(8−10)/1 or Z=(10−8)/1 the correct standardization for finding P(X<8)?"
3. "Does P(X>μ)=0.5 hold for every Normal distribution, regardless of σ?"

## Teaching Sequence
1. **Analogy bridge**: the bell-curve analogy and $N(\mu,\sigma^2)$ notation, working
   Demonstration 1, isolating MC-1.
2. **Worked example pair**: one-sided and two-sided standardization computations, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: same-mean-different-spread comparison and the 68-95-99.7 empirical rule,
   working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct $\sigma$ extraction from $N(\mu,\sigma^2)$ notation, a
   correct standardization and table lookup for a new value, and a correct empirical-rule
   estimation, at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept $\sigma^2$ used directly in the Z formula without first taking a square root.
- Never accept $Z=(\mu-X)/\sigma$ as a valid standardization.
- Never accept $P(X>\mu)$ computed from scratch instead of via symmetry.

## Voice Teaching Notes
- Say "is that the variance or the standard deviation?" whenever $N(\mu,\sigma^2)$ notation is
  read.
- When a Z-score is computed, ask "does the sign make sense given whether X is above or below the
  mean?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly extracts $\sigma$ from $N(\mu,\sigma^2)$ notation.
- **Rung 2 (application)**: learner correctly standardizes and computes a one-sided or two-sided
  probability via the table.
- **Rung 3 (transfer)**: learner correctly applies the full standardization and symmetry toolkit
  to a real-world scenario (e.g. IQ scores), including empirical-rule estimation for
  extreme-tail probabilities.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on computing $\sigma=\sqrt{\sigma^2}$ as the mandatory first step.
- If MC-2 recurs, re-derive $Z=(X-\mu)/\sigma$ on a below-the-mean example.
- If MC-3 recurs, re-verify $P(X>\mu)=0.5$ across two different-spread examples.

## Memory Hooks
- "N of mu comma sigma-squared — take the square root before dividing."
- "Z = data minus mean, always in that order — never mean minus data."
- "P(X>μ) = 0.5 always, for any Normal, regardless of spread."

## Transfer Connections
- `math.prob.continuous-distributions` (already authored, this campaign, Batch 121): supplies the
  general continuous-distribution framework (PDFs, probability as area) this concept specializes
  to the Normal's bell shape.
- `math.prob.clt` (not yet authored): the KG's declared unlock, explaining why the Normal
  distribution arises so universally as a limiting distribution.
- `math.stats.normal-distribution` (not yet authored): the KG's declared cross-link, extending
  this population-level treatment to sample-based statistical inference.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.normal-distribution.md`, reused by
  reference for its bell-curve analogy bridge, its worked-example pair on standardization, its
  same-mean-different-spread contrast, its 68-95-99.7 empirical rule, and its three-misconception
  registry (Foundational status for MC-1 adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying standardization and
  symmetry to IQ score scenarios including extreme-tail empirical-rule estimation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.continuous-distributions`, unlocks `math.prob.clt`, cross_links
  `math.stats.normal-distribution`, proficient/apply, mastery_threshold 0.9, estimated_hours 6)
  was directly verified against the live KG and matches exactly. The Blueprint's own independence-
  mode P76 (declared because the cross-link is "NOT Tier-1") was independently re-verified via
  `ls educational-brain/concepts/mathematics/` — `math.stats.normal-distribution` is also
  genuinely unauthored, doubly justifying independence mode.

## Version History
- 2026-09-19 (Batch 139): authored. Second entry this batch. Companion batch concept:
  `math.real.inverse-function-theorem`.
