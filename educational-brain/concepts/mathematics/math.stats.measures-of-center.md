# math.stats.measures-of-center

## Identity
- **KG id**: `math.stats.measures-of-center`
- **Domain**: math.stats
- **Requires**: `math.stats.descriptive-statistics`, `math.arith.fractions`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.95
- **Estimated hours**: 3

## Learning Objective
Compute the MEAN $\bar x=\sum x_i/n$, the MEDIAN (the middle value after SORTING — averaging the
two middle values when $n$ is EVEN), and the MODE (the most frequent value); recognize the mean is
SENSITIVE to outliers while the median is ROBUST (depending only on rank position, not
magnitude); and recognize a dataset may have ZERO, ONE, or MULTIPLE modes, unlike mean and
median which always exist as single well-defined values.

## Core Understanding
THE MEAN IS SENSITIVE TO OUTLIERS; THE MEDIAN IS ROBUST BY DESIGN: reusing
`math.stats.descriptive-statistics`'s own outlier-sensitivity distinction directly, for
$\{2,3,4,5,100\}$: the mean is $114/5=22.8$ — heavily pulled by the single 100 — while the
sorted median is $4$, essentially UNCHANGED by the outlier's presence, since it depends only on
which value occupies the MIDDLE position, never on how extreme the other values happen to be.

THE MEDIAN REQUIRES SORTING FIRST, AND AVERAGING THE TWO MIDDLE VALUES WHEN $n$ IS EVEN: for
$\{7,2,9,4\}$, sort FIRST: $\{2,4,7,9\}$; since $n=4$ is even, the median is the average of the
two middle values, $(4+7)/2=5.5$ — never just picking one of the two middle values, and never
computed on the unsorted order.

MODE MAY NOT EXIST, OR MAY HAVE SEVERAL VALUES — UNLIKE MEAN AND MEDIAN: for $\{3,5,5,7,9\}$, the
mode is $5$ (appears twice, more than any other value); for $\{2,4,6,8\}$, NO mode exists at all
— every value appears exactly once, so no value is "most frequent" in any meaningful sense.
Mean and median are always single, well-defined numbers for a numeric dataset; mode's existence
and uniqueness are never guaranteed the same way.

## Mental Models
- **"The mean is dragged by every value in the sum, including the extreme ones; the median only
  cares who's standing in the middle after everyone lines up in order."**
- **"Mode is the only measure of center that can legitimately be missing, or come in multiples —
  mean and median never have that option."**

## Why Students Fail

### MC-1: MEAN-USED-UNCRITICALLY-AS-THE-MEASURE-OF-CENTER-DESPITE-OUTLIERS
- **Surface form**: uses the mean as the default measure of center even when the dataset contains
  extreme outliers that badly distort it.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  the mean is the most commonly taught "average" and defaults to mind first, regardless of
  outliers).
- **Repair**: re-compute both mean and median explicitly, comparing which better represents
  "most" of the data.

### MC-2: MEDIAN-COMPUTED-WITHOUT-SORTING-OR-WITHOUT-AVERAGING-THE-TWO-MIDDLE-VALUES-FOR-EVEN-N
- **Surface form**: finds the median without first sorting the data, or fails to average the two
  middle values when $n$ is even.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared FOUNDATIONAL severity —
  the sorting step is easy to skip when the "middle" feels intuitively obvious from the original
  order).
- **Repair**: re-sort the data explicitly, then re-identify (and average, if even) the middle
  value(s).

## Misconceptions

### MC-1: MEAN-USED-UNCRITICALLY-AS-THE-MEASURE-OF-CENTER-DESPITE-OUTLIERS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: MEDIAN-COMPUTED-WITHOUT-SORTING-OR-WITHOUT-AVERAGING-THE-TWO-MIDDLE-VALUES-FOR-EVEN-N
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The mean is a group photo where one giant standing on a chair shifts the average height;
  the median just asks who's standing in the exact middle of a lineup, ignoring how tall the
  giant actually is."**
- **Anti-analogy**: the median is never computed on data "as given" — sorting is a mandatory
  first step, never optional.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $\{2,3,4,5,100\}$ — mean $22.8$ (distorted), median $4$
  (representative of the 2-5 cluster).
- **Demonstration 2 (targets MC-2)**: $\{7,2,9,4\}$ sorted to $\{2,4,7,9\}$, median
  $(4+7)/2=5.5$ — sorting first and averaging the two middle values, both mandatory.
- **Demonstration 3 (targets mode existence)**: $\{3,5,5,7,9\}$ has mode $5$; $\{2,4,6,8\}$ has
  NO mode — every value ties at frequency 1.

## Discovery Questions
1. "Does a single unusually large value in a dataset change the mean the same way it changes the
   median?"
2. "Can you find the median of $\{7,2,9,4\}$ without sorting it first?"
3. "Does every dataset have exactly one mode?"

## Teaching Sequence
1. **Contrast pair**: Demonstration 1's mean-versus-median comparison, isolating MC-1 by
   requiring outlier impact checked directly.
2. **Conceptual shift**: Demonstration 2's sort-then-average procedure, isolating MC-2 by
   requiring both steps performed explicitly.
3. **Procedure reuse**: Demonstration 3's mode existence/multiplicity check, establishing mode as
   the one measure that isn't guaranteed unique or existent.
4. **Mastery gate**: require correctly computed mean, median (including an even-$n$ case), and
   mode for new datasets, and a correct outlier-robustness explanation, at the Blueprint's own
   stated MAMR of 5/5 (⌈0.95×5⌉).

## Tutor Actions
- Never accept a median computed without an explicit sorting step shown.
- Never accept the mean chosen as "the" measure of center without checking for outlier
  distortion.

## Voice Teaching Notes
- Say "did you sort the data before finding the middle?" whenever a median is computed.
- When a measure of center is chosen, ask "does an outlier change your answer here — did you
  check?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes mean, median, and mode for a new dataset.
- **Rung 2 (application)**: learner correctly identifies whether a dataset's mode exists,
  is unique, or has multiple values.
- **Rung 3 (transfer)**: learner correctly explains, for a NEW outlier-containing scenario, why
  the median gives a more representative "typical" value than the mean.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute both mean and median explicitly, comparing representativeness.
- If MC-2 recurs, re-sort the data explicitly before re-identifying the middle value(s).

## Memory Hooks
- "Mean is dragged by every value; median only cares who's in the middle after sorting."
- "Sort first, then find the middle — and average the two middles if n is even."
- "Mode can vanish or multiply — mean and median never do."

## Transfer Connections
- `math.stats.descriptive-statistics` (already authored, this campaign, Batch 106): supplies the
  broader summarizing-data context and the mean-vs-median outlier-sensitivity distinction this
  concept computes precisely.
- `math.arith.fractions` (already authored): supplies the division needed for the mean and the
  averaging of the two middle values for an even-$n$ median.
- `math.stats.measures-of-spread` (not yet authored — being authored in this same batch): a
  related concept mirroring this concept's outlier-sensitivity distinction for spread rather than
  center.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.measures-of-center.md`, reused by
  reference for its outlier-distortion example, its sort-then-average median procedure, its
  mode-existence examples, and its two-misconception registry (severity levels adopted directly
  as declared; birth types independently classified since this Blueprint states Description but
  not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  real-estate analyst's home-sale-price summary where one mansion sale distorts the mean but not
  the median.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.descriptive-statistics`+`math.arith.fractions`, unlocks none, cross_links none,
  developing/apply, mastery_threshold 0.95, estimated_hours 3) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 107): authored. First entry this batch. Companion batch concept:
  `math.stats.measures-of-spread`. `math.stats` moves 3/40 → **4/40** this batch.
