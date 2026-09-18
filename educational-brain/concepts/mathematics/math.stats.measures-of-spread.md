# math.stats.measures-of-spread

## Identity
- **KG id**: `math.stats.measures-of-spread`
- **Domain**: math.stats
- **Requires**: `math.stats.descriptive-statistics`
- **Unlocks**: none
- **Cross-links**: `math.prob.variance` (KG-declared and Blueprint-claimed as "authored earlier,"
  but NOT actually authored — verified via `ls`; independence mode used instead, see Curriculum
  Feedback)
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Compute the range ($\max-\min$), IQR ($Q_3-Q_1$), and five-number summary (min, $Q_1$, median,
$Q_3$, max); compute sample variance $s^2=\sum(x_i-\bar x)^2/(n-1)$ and sample SD $s=\sqrt{s^2}$,
explaining WHY the divisor is $n-1$ rather than $n$ (Bessel's correction for unbiasedness); and
select the appropriate spread measure (range, IQR, or SD) based on outlier sensitivity, mirroring
`math.stats.measures-of-center`'s own mean-versus-median choice.

## Core Understanding
RANGE COLLAPSES UNDER A SINGLE OUTLIER; IQR DOES NOT: for $\{2,3,4,5,6,7,100\}$, the range
$100-2=98$ is DOMINATED by the single outlier. The five-number summary instead gives median $5$,
$Q_1$ (median of $\{2,3,4\}$) $=3$, $Q_3$ (median of $\{6,7,100\}$) $=7$, so IQR $=7-3=4$ —
completely UNAFFECTED by the outlier, since $Q_3=7$ is determined by RANK position, not by 100's
actual magnitude — exactly the same robustness principle
`math.stats.measures-of-center`/`descriptive-statistics` already established for the median over
the mean.

SAMPLE VARIANCE'S $n-1$ DIVISOR CORRECTS A GENUINE ESTIMATION BIAS: for $\{4,6,8\}$ (sample mean
$\bar x=6$): $\sum(x_i-\bar x)^2=4+0+4=8$. Dividing by $n-1=2$ gives $s^2=4$ (sample SD $s=2$);
dividing by $n=3$ INSTEAD would give $\approx2.67$ — systematically SMALLER, because $\bar x$ is
computed FROM the same data (minimizing $\sum(x_i-c)^2$ over all $c$), which makes the raw sum
systematically smaller than it would be using the true (unknown) population mean $\mu$. Dividing
by $n-1$ (Bessel's correction) exactly compensates for this downward bias, making $s^2$ an
UNBIASED estimator — this is a genuinely different computational role from a theoretical,
distribution-exact variance quantity, which (given a known distribution) needs no such
correction at all since it isn't estimating anything from finite data.

CHOOSING THE RIGHT SPREAD MEASURE MIRRORS THE CENTER-MEASURE CHOICE: standard deviation (built
from squared deviations from the mean) is sensitive to outliers, exactly as the mean is; IQR
(built from quartile ranks) is robust, exactly as the median is. For salary data mostly clustered
$\$40$k$-\$60$k with one CEO earning $\$5$M: standard deviation would be massively inflated by the
CEO's salary, making it a poor summary of "typical" spread; IQR, excluding that extreme value via
rank position, gives a far more representative picture.

## Mental Models
- **"Range only looks at the two most extreme points — one unusual value dominates it entirely;
  IQR looks at rank positions in the middle 50%, immune to how extreme the tails happen to be."**
- **"Dividing by n-1 instead of n corrects for the fact that the sample mean was itself computed
  from the same data being measured — a genuine, checkable bias, not an arbitrary convention."**

## Why Students Fail

### MC-1: IQR-ASSUMED-EQUALLY-OUTLIER-SENSITIVE-AS-RANGE
- **Surface form**: believes a single extreme outlier affects IQR the same way it affects range.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  both are described as "spread" measures, obscuring their genuinely different outlier
  sensitivity).
- **Repair**: re-walk the direct range-versus-IQR computation on the same outlier-containing
  dataset.

### MC-2: SAMPLE-VARIANCE-CONFLATED-WITH-POPULATION-VARIANCE
- **Surface form**: believes sample variance $s^2$ is the same computational object as a
  theoretical population variance, missing the estimation-versus-theoretical distinction that
  necessitates Bessel's correction.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared High severity — both are
  called "variance" and share a similar formula, obscuring the genuinely different roles).
- **Repair**: re-walk the $n$-versus-$n-1$ divisor contrast directly, showing the systematic
  downward bias the correction fixes.

### MC-3: STANDARD-DEVIATION-ASSUMED-ALWAYS-PREFERRED
- **Surface form**: believes standard deviation is generally the more trustworthy spread measure
  regardless of outliers.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Moderate severity —
  standard deviation is the more commonly taught spread measure and defaults to mind first).
- **Repair**: re-walk the salary-data scenario, showing IQR's robustness against SD's outlier
  inflation.

## Misconceptions

### MC-1: IQR-ASSUMED-EQUALLY-OUTLIER-SENSITIVE-AS-RANGE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SAMPLE-VARIANCE-CONFLATED-WITH-POPULATION-VARIANCE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: STANDARD-DEVIATION-ASSUMED-ALWAYS-PREFERRED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Range is a photo of only the two extreme points in a crowd; IQR is a photo of just the
  middle half, cropping out both tails entirely."**
- **Anti-analogy**: dividing by $n-1$ is NOT an arbitrary convention — it is a specific,
  computable correction for a specific, demonstrable downward bias.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $\{2,3,4,5,6,7,100\}$: range $98$ (outlier-dominated), IQR
  $4$ (outlier-immune, $Q_1=3,Q_3=7$ from rank position alone).
- **Demonstration 2 (targets MC-2)**: $\{4,6,8\}$: dividing by $n-1=2$ gives $s^2=4$; dividing by
  $n=3$ gives $\approx2.67$ — the smaller, biased value Bessel's correction exists to fix.
- **Demonstration 3 (targets MC-3)**: salary data with one $\$5$M CEO outlier: SD massively
  inflated (like the mean); IQR (middle 50%, excluding the CEO) stays representative of typical
  spread.

## Discovery Questions
1. "Does a single extreme outlier affect IQR the same way it affects range?"
2. "Why divide by $n-1$ instead of $n$ when computing sample variance?"
3. "For a dataset with a genuine extreme outlier, is standard deviation or IQR the more
   trustworthy spread summary?"

## Teaching Sequence
1. **Representation shift**: Demonstration 1's direct range-versus-IQR computation, isolating
   MC-1 by requiring both measures computed on the identical outlier-containing dataset.
2. **Conflict evidence**: Demonstration 2's $n$-versus-$n-1$ divisor comparison, isolating MC-2
   by showing the systematic downward bias directly.
3. **Contrast pair**: Demonstration 3's salary-data scenario, isolating MC-3 by requiring the
   outlier-robustness principle applied to spread, mirroring center.
4. **Mastery gate**: require correctly computed range/IQR/five-number-summary, a correctly
   computed sample variance/SD with the $n-1$ divisor justified, and a correct spread-measure
   selection for a new outlier-containing scenario, at the Blueprint's own stated MAMR of 5/5
   (⌈0.9×5⌉).

## Tutor Actions
- Never accept IQR judged as equally outlier-sensitive as range without a direct side-by-side
  computation.
- Never accept sample variance computed with divisor $n$ instead of $n-1$.

## Voice Teaching Notes
- Say "does that outlier actually change the IQR, or only the range?" whenever spread measures
  are compared on outlier-containing data.
- When sample variance is computed, ask "why n-1 instead of n here?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes range, IQR, and the five-number summary
  for a new dataset.
- **Rung 2 (application)**: learner correctly computes sample variance and SD with the $n-1$
  divisor, explaining the correction's purpose.
- **Rung 3 (transfer)**: learner correctly selects the appropriate spread measure for a NEW
  outlier-containing applied scenario, justifying the choice via robustness.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct range-versus-IQR computation on the same dataset.
- If MC-2 recurs, re-walk the $n$-versus-$n-1$ divisor contrast directly.
- If MC-3 recurs, re-walk the salary-data scenario directly.

## Memory Hooks
- "Range sees only the two extremes; IQR only sees the middle half — immune to the tails."
- "n-1 corrects a real, demonstrable downward bias — never an arbitrary rule."
- "Outliers favor IQR over SD, exactly as they favor median over mean."

## Transfer Connections
- `math.stats.descriptive-statistics` (already authored, this campaign, Batch 106): supplies the
  mean-vs-median outlier-sensitivity distinction this concept directly extends to spread.
- `math.stats.measures-of-center` (already authored, this campaign, this same batch): supplies
  the parallel center-measure outlier-sensitivity choice this concept's spread-measure choice
  directly mirrors.

## Cross-Subject Connections
- None formal (see Curriculum Feedback regarding `math.prob.variance`).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.measures-of-spread.md`, reused by
  reference for its range-versus-IQR outlier contrast, its Bessel's-correction derivation, its
  salary-data spread-measure selection, and its three-misconception registry (severity levels
  adopted directly as declared; birth types independently classified since this Blueprint states
  Description but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own probe, examining a data analyst's exact
  theoretical variance from a known distribution versus sample variance from 50 real
  measurements, the effect of one anomalous reading, and why the $n$-versus-$n-1$ gap shrinks as
  $n$ grows.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (FOURTH occurrence this campaign)**: the
  Blueprint's own Component 7 states "`math.prob.variance`... checked via `ls
  docs/curriculum/blueprints/` and confirmed ALREADY authored," setting P76_mode to "cross-link
  probe." Verified via `ls educational-brain/concepts/mathematics/` that `math.prob.variance` has
  NO authored Educational Brain entry (the Blueprint's own check apparently looked only at the
  Blueprint corpus, not the EB corpus this campaign builds — the two are different layers). This
  entry uses INDEPENDENCE mode instead, treating the Blueprint's exact-distribution-vs-sample
  transfer probe as self-contained. All other fields (requires
  `math.stats.descriptive-statistics`, developing/apply, mastery_threshold 0.9, estimated_hours 3)
  matched exactly.

## Version History
- 2026-09-18 (Batch 107): authored. Second entry this batch. Companion batch concept:
  `math.stats.measures-of-center`. `math.stats` moves 3/40 → **5/40** this batch (both concepts
  authored).
