# math.stats.normal-approximation

## Identity
- **KG id**: `math.stats.normal-approximation`
- **Domain**: math.stats
- **Requires**: `math.prob.clt`, `math.stats.normal-distribution`
- **Unlocks**: none
- **Cross-links**: `math.prob.clt`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Apply $\mathrm{Bin}(n,p)\approx N(np,np(1-p))$ using the FULL $np$/$np(1-p)$ formulas (never
simplified or partial substitutes); apply $\mathrm{Poisson}(\lambda)\approx N(\lambda,\lambda)$
using the SAME value $\lambda$ for both mean and variance; and apply the continuity correction
$P(X\le k)\approx P(Y\le k+0.5)$, recognizing it genuinely IMPROVES accuracy (never safely
omitted or applied in the wrong direction).

## Core Understanding
THE APPROXIMATING NORMAL'S PARAMETERS ARE THE FULL $np$ AND $np(1-p)$ — NEVER SIMPLIFIED
VERSIONS: for $\mathrm{Bin}(100,0.5)$: mean $=np=100(0.5)=50$, variance $=np(1-p)=100(0.5)(0.5)
=25$ (SD 5). A common error uses $p$ or $n$ ALONE as the mean or variance (e.g. mistakenly using
just $p=0.5$ as the mean) — the approximating normal's parameters are SPECIFICALLY $np$ and
$np(1-p)$, EXACTLY reproducing the binomial's own mean and variance, never a simplified or
partial substitute.

THE POISSON APPROXIMATION USES THE SAME VALUE $\lambda$ FOR BOTH PARAMETERS — A GENUINE, NOT
COINCIDENTAL, PROPERTY: for $\mathrm{Poisson}(50)$: mean $=50$, variance $=50$ (SD
$\approx7.07$) — using the SAME value for BOTH parameters, because the Poisson distribution has
the CHARACTERISTIC property that its mean ALWAYS equals its variance. This is never an accident
of the approximation; it directly reflects the Poisson's own defining structure.

THE CONTINUITY CORRECTION GENUINELY IMPROVES ACCURACY — NEVER SAFELY OMITTED: for $P(X\le30)$
with $X\sim\mathrm{Bin}(100,0.3)$ (mean 30, variance 21, SD $\approx4.58$): WITH the continuity
correction, $P(X\le30)\approx P(Y\le30.5)$ gives $z=\frac{30.5-30}{4.58}\approx0.109$, so
$P(Z\le0.109)\approx0.543$. OMITTING the correction (computing $P(Y\le30)$ directly, $z=0$) gives
$P(Z\le0)=0.5$ — a NOTICEABLY DIFFERENT, LESS ACCURATE result. The $+0.5$ adjustment "covers" the
discrete probability mass at exactly $k$ using the continuous distribution — genuinely improving
the approximation, never a dispensable technicality.

## Mental Models
- **"The approximating normal borrows the binomial's OWN mean and variance exactly — never a
  shortcut using just n or just p."**
- **"Poisson's mean-equals-variance quirk carries straight into its normal approximation — same
  number, twice."**
- **"The continuity correction extends the boundary by half a unit to let a continuous curve
  properly cover a discrete point — skip it and you lose real accuracy."**

## Why Students Fail

### MC-1: APPROXIMATING-NORMAL-PARAMETERS-SIMPLIFIED-OR-PARTIALLY-COMPUTED
- **Surface form**: uses a simplified or partial version of the $np$/$np(1-p)$ formulas for the
  approximating normal's mean and variance, rather than the full correct computation.
- **Birth type**: Foundational severity (Blueprint's own declared severity — produces a
  genuinely wrong approximating distribution).
- **Repair**: re-derive both parameters explicitly from the binomial's own mean and variance
  formulas.

### MC-2: CONTINUITY-CORRECTION-OMITTED-OR-APPLIED-IN-THE-WRONG-DIRECTION
- **Surface form**: omits the continuity correction entirely, or applies its $\pm0.5$ adjustment
  in the wrong direction for the given inequality type.
- **Birth type**: Moderate severity (Blueprint's own declared severity — omitting the correction
  still produces a reasonable, if slightly less accurate, approximation, rather than a wildly
  wrong one).
- **Repair**: re-apply the correction explicitly, confirming the $+0.5$ direction matches the
  specific inequality type.

## Misconceptions

### MC-1: APPROXIMATING-NORMAL-PARAMETERS-SIMPLIFIED-OR-PARTIALLY-COMPUTED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: CONTINUITY-CORRECTION-OMITTED-OR-APPLIED-IN-THE-WRONG-DIRECTION
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The approximating normal is a faithful stand-in wearing the binomial's exact mean and
  variance — never a rough sketch using only part of the formula."**
- **Anti-analogy**: the continuity correction is not decorative — skipping it is like measuring a
  building's footprint without accounting for its walls' thickness, a small but real systematic
  error.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\mathrm{Bin}(100,0.5)$ mean/variance computation via
  the full $np$/$np(1-p)$ formulas.
- **Demonstration 2**: the $\mathrm{Poisson}(50)$ approximation, same value for mean and
  variance.
- **Demonstration 3 (targets MC-2)**: the corrected-versus-uncorrected $P(X\le30)$ computation
  for $\mathrm{Bin}(100,0.3)$.

## Discovery Questions
1. "Are the approximating normal's mean and variance the full $np$ and $np(1-p)$, or a
   simplified version?"
2. "Why does the Poisson normal approximation use the same value for both mean and variance?"
3. "Does omitting the continuity correction still give an accurate approximation?"

## Teaching Sequence
1. **Conceptual shift**: the full $np$/$np(1-p)$ parameter computation, working
   Demonstration 1, isolating MC-1.
2. **Procedure reuse**: the Poisson mean-equals-variance approximation, working Demonstration 2.
3. **Contrast pair**: the corrected-versus-uncorrected continuity-correction comparison, working
   Demonstration 3, isolating MC-2.
4. **Mastery gate**: require a correct binomial normal-approximation parameter computation, a
   correct Poisson normal-approximation parameter computation, and a correct continuity-corrected
   probability computation, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a simplified or partial version of the $np$/$np(1-p)$ formulas for the
  approximating normal's parameters.
- Never accept the Poisson approximation's mean and variance treated as independently chosen
  rather than both equal to $\lambda$.
- Never accept the continuity correction omitted or applied in the wrong direction.

## Voice Teaching Notes
- Say "is that the FULL np and np(1-p), or a shortcut?" whenever a binomial normal approximation
  is set up.
- Ask "which direction does the 0.5 adjustment go for this specific inequality?" whenever the
  continuity correction is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the mean and variance of a binomial's
  normal approximation using the full formulas.
- **Rung 2 (application)**: learner correctly sets up a Poisson normal approximation using the
  same $\lambda$ for both parameters.
- **Rung 3 (transfer)**: learner correctly applies the continuity correction in the right
  direction for a specific inequality type.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive both parameters explicitly from the binomial's own formulas.
- If MC-2 recurs, re-apply the continuity correction explicitly, confirming the correct
  direction.

## Memory Hooks
- "np and np(1-p), the full formulas — never a shortcut."
- "Poisson: same λ for mean and variance, always."
- "Continuity correction: +0.5 to genuinely improve accuracy, never skip it."

## Transfer Connections
- `math.prob.clt` (already authored, certified domain, genuine cross-link): supplies the deep
  justification (a binomial as a sum of many Bernoulli trials) for why these approximations work
  at all.
- `math.stats.normal-distribution` (already authored, this campaign, Batch 195): supplies the
  approximating distribution itself.

## Cross-Subject Connections
- Operations research: approximating a large-$\lambda$ Poisson process (e.g. call-center call
  volume) with a normal distribution for tractable probability estimation.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.normal-approximation.md`, reused by
  reference for its binomial and Poisson approximation examples, its continuity-correction
  contrast, and its two-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a call center's large-$\lambda$
  Poisson call volume, setting up a continuity-corrected normal approximation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.clt`/`math.stats.normal-distribution`, unlocks none, cross_links `math.prob.clt`,
  proficient/apply, mastery_threshold 0.85, estimated_hours 3) was directly verified against the
  live KG and matches exactly. `math.prob.clt` independently re-confirmed authored.

## Version History
- 2026-09-19 (Batch 199): authored. Second entry this batch. Companion batch concept:
  `math.stats.sampling-distribution`.
