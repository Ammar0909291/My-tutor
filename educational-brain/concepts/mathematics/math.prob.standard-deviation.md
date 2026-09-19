# math.prob.standard-deviation

## Identity
- **KG id**: `math.prob.standard-deviation`
- **Domain**: math.prob
- **Requires**: `math.prob.variance`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.95
- **Estimated hours**: 1

## Learning Objective
Define $SD(X)=\sqrt{\text{Var}(X)}$; interpret SD as spread measured in the SAME UNITS as $X$
(never squared units); distinguish SD from variance (SD is interpretable, variance is
mathematically tractable); apply $SD(aX+b)=|a|\cdot SD(X)$, recognizing a SHIFT never changes
spread while a SCALE multiplies it; and never conflate SD with the mean absolute deviation.

## Core Understanding
SD RETURNS UNITS TO THE ORIGINAL SCALE — VARIANCE DOES NOT: for exam scores with
$\text{Var}(X)=100$ (units: points$^2$), $SD(X)=\sqrt{100}=10$ (units: points) — a score of 80 is
exactly 1 SD above a mean of 70, a directly interpretable statement. "Variance is 100 points
squared above the mean" is not a meaningful sentence; SD exists precisely to restore an
interpretable unit.

A SHIFT NEVER CHANGES SD; ONLY A SCALE DOES, BY THE ABSOLUTE VALUE OF THE FACTOR: for
$X\sim\text{Uniform}\{1,2,3,4,5\}$, $E[X]=3$, $\text{Var}(X)=2$, $SD(X)=\sqrt2\approx1.41$. Let
$Y=2X-3$: $SD(Y)=|2|\cdot SD(X)=2\sqrt2\approx2.83$, while $E[Y]=2(3)-3=3$. Checking directly,
$Y\in\{-1,1,3,5,7\}$ — visibly twice as spread out as $X$'s values, confirming the scaling factor
multiplies spread while the $-3$ shift (which did move the mean) left the spread itself untouched.

SD IS $\sqrt{E[(X-\mu)^2]}$, NEVER $E[|X-\mu|]$ — THE TWO ARE DIFFERENT STATISTICS: mean absolute
deviation (MAD) averages the absolute deviations directly; SD squares first, averages, then
square-roots. These are genuinely different numbers for the same distribution — SD is not simply
"a more precise name for" MAD, and the formulas are not interchangeable.

## Mental Models
- **"SD undoes the squaring that variance did — it's the step that brings spread back into
  measurable, real-world units."**
- **"Shifting a distribution moves its center but never widens or narrows it; only scaling changes
  how spread out it is."**

## Why Students Fail

### MC-1: SD-AND-VARIANCE-ARE-INTERCHANGEABLE
- **Surface form**: treats SD and variance as synonyms, plugging variance where SD is expected or
  reporting SD as "the average squared deviation."
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — both
  measure "spread," and informal instruction sometimes uses one term when meaning the other).
- **Repair**: re-anchor on the units test — variance is in squared units, SD is in the original
  units; ask which unit the question calls for.

### MC-2: ADDING-CONSTANT-CHANGES-SD
- **Surface form**: believes $SD(X+5)\ne SD(X)$, reasoning that since $E[X+5]=E[X]+5$, SD must
  shift too.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — the additive
  rule for expectation is incorrectly carried over to SD).
- **Repair**: re-derive $\text{Var}(X+b)=E[(X+b-(\mu+b))^2]=E[(X-\mu)^2]=\text{Var}(X)$ explicitly,
  showing the $b$ cancels.

### MC-3: SD-IS-THE-AVERAGE-DEVIATION
- **Surface form**: believes $SD(X)=E[|X-\mu|]$ (mean absolute deviation) rather than
  $\sqrt{E[(X-\mu)^2]}$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — MAD is
  sometimes taught as an easier-to-understand alternative, and the two get mixed up).
- **Repair**: re-compute both statistics on the same small dataset side by side, showing they
  produce different numbers.

## Misconceptions

### MC-1: SD-AND-VARIANCE-ARE-INTERCHANGEABLE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: ADDING-CONSTANT-CHANGES-SD
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: SD-IS-THE-AVERAGE-DEVIATION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"SD is variance translated back into everyday units — like converting square feet back into
  feet after computing an area-based quantity."**
- **Anti-analogy**: SD is NOT "the average distance from the mean" in the plain-language sense
  (that's MAD) — SD squares first, which weights larger deviations more heavily before
  square-rooting back.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: exam scores, $\text{Var}=100$ points$^2$ versus $SD=10$
  points — only SD gives an interpretable "1 SD above the mean" statement.
- **Demonstration 2 (targets MC-2)**: $\text{Var}(X+b)=\text{Var}(X)$ derived directly, showing
  the shift $b$ cancels inside the squared deviation.
- **Demonstration 3 (targets MC-3)**: side-by-side computation of SD and MAD on the same dataset,
  producing two different numbers.

## Discovery Questions
1. "Are standard deviation and variance just two names for the same number?"
2. "If every value in a dataset increases by 5, does the standard deviation change?"
3. "Is standard deviation the same thing as the average distance from the mean?"

## Teaching Sequence
1. **Representation shift**: variance-to-SD via the square root, working Demonstration 1's
   units-interpretation contrast, isolating MC-1.
2. **Contrast pair**: Demonstration 2's shift-invariance derivation against the scaling rule
   $SD(aX+b)=|a|\cdot SD(X)$, isolating MC-2.
3. **Conceptual anchor**: Demonstration 3's SD-versus-MAD side-by-side computation, isolating MC-3.
4. **Mastery gate**: require a correct SD computation from a given variance, a correct
   scaling-rule application, and a correct interpretation of SD in context, at the Blueprint's own
   stated MAMR of 5/5 (⌈0.95×5⌉, capped at 5).

## Tutor Actions
- Never accept SD and variance used interchangeably without checking units.
- Never accept a claim that adding a constant to every value changes the standard deviation.
- Never accept SD computed as a mean absolute deviation instead of via the variance's square root.

## Voice Teaching Notes
- Say "is that number in the original units, or squared units?" whenever SD or variance is
  reported.
- When a shift is applied to a distribution, ask "did the spread actually change, or just the
  center?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes SD from a given variance.
- **Rung 2 (application)**: learner correctly applies $SD(aX+b)=|a|\cdot SD(X)$ to a new linear
  transformation.
- **Rung 3 (transfer)**: learner correctly relates SD to Chebyshev's inequality and the normal
  68-95-99.7 rule, and articulates when reporting SD is preferable to reporting variance.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the units test between SD and variance.
- If MC-2 recurs, re-derive $\text{Var}(X+b)=\text{Var}(X)$ explicitly.
- If MC-3 recurs, re-compute SD and MAD side by side on the same data.

## Memory Hooks
- "SD is the square root of variance — same units as the original data."
- "Shifting never changes spread; only scaling does, by the absolute value of the factor."
- "SD squares first, then averages, then roots — it is not the same as the average absolute
  deviation."

## Transfer Connections
- `math.prob.variance` (already authored, this campaign, Batch 123): supplies
  $\text{Var}(X)=\sigma^2$ directly, the quantity this concept's square root acts on.
- `math.prob.chebyshev` (already authored, this campaign, Batch 125): uses $SD(X)$ directly as the
  unit $k$ is measured in, bounding $P(|X-\mu|\ge k\cdot SD(X))\le1/k^2$.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.standard-deviation.md`, reused by
  reference for its variance-to-SD worked example, its shift-versus-scale contrast, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying Chebyshev's inequality at
  $k=2$ and comparing against the normal 68-95-99.7 rule.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.variance`,
  unlocks none, cross_links none, proficient/apply, mastery_threshold 0.95, estimated_hours 1) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 126): authored. First entry this batch. Companion batch concept:
  `math.real.compactness`.
