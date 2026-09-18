# math.stats.descriptive-statistics

## Identity
- **KG id**: `math.stats.descriptive-statistics`
- **Domain**: math.stats
- **Requires**: `math.stats.population-sample`
- **Unlocks**: `math.stats.sampling`
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Compute the mean, median, and standard deviation of a dataset, choosing WHICH measure of center
is more appropriate given outliers or skew; construct and correctly match a histogram, boxplot,
or scatterplot to the specific question it answers; and distinguish DESCRIPTIVE statistics
(summarizing the data at hand) from INFERENTIAL statistics (generalizing to a broader
population), directly reusing `math.stats.population-sample`'s own population/sample framing.

## Core Understanding
THE MEAN IS PULLED TOWARD OUTLIERS; THE MEDIAN RESISTS THEM: for salaries 40, 42, 45, 48, 200
(thousands), the mean is $375/5=75$ — dramatically pulled up by the single 200 outlier — while the
median (sorted middle value) is 45, unaffected by the outlier's magnitude since it depends only on
rank order. For roughly symmetric data without extreme values, the mean uses all the numerical
information and is typically preferred; for skewed or outlier-laden data, the median more
accurately reflects where "most" of the data actually sits.

EACH GRAPHICAL DISPLAY IS BUILT FOR A SPECIFIC QUESTION, NEVER INTERCHANGEABLE: a HISTOGRAM shows
the distribution SHAPE of a single variable (symmetry, skew, modality); a BOXPLOT displays the
five-number summary (min, Q1, median, Q3, max), ideal for comparing spread and center across
groups and flagging outliers; a SCATTERPLOT shows the RELATIONSHIP between two variables (one
point per observation) — a histogram or boxplot could never reveal a two-variable correlation a
scatterplot is specifically designed to show.

DESCRIPTIVE STATISTICS MAKE NO CLAIM BEYOND THE DATA ACTUALLY COLLECTED: reusing
`math.stats.population-sample`'s own population/sample distinction directly, a survey finding
60% of 50 sampled voters support a proposal is a DESCRIPTIVE fact about THAT sample only.
Concluding "60% of ALL city voters support the proposal" is an INFERENTIAL leap — a genuinely
different, additional claim requiring inferential machinery (margin of error, confidence
intervals) that descriptive statistics alone never establish.

## Mental Models
- **"The mean gets dragged by extreme values; the median stands its ground, caring only about
  rank, not magnitude."**
- **"A descriptive statistic is a photograph of the data in hand — the moment you claim it shows
  something about a bigger crowd, you've stepped into inference."**

## Why Students Fail

### MC-1: MEAN-DEFAULTED-TO-WITHOUT-CHECKING-OUTLIERS
- **Surface form**: defaults to the mean as the preferred measure of center without checking
  whether outliers or skew make the median more representative.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  the mean "uses all the data" and feels like the more thorough choice by default).
- **Repair**: re-compute both explicitly on the salary example, showing the mean's distortion and
  the median's resistance to the single extreme value.

### MC-2: DESCRIPTIVE-SAMPLE-STATISTIC-GENERALIZED-TO-POPULATION
- **Surface form**: treats a descriptive statistic from sample data as if it directly applies to
  the entire population, without recognizing the unjustified inferential leap.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  generalizing "our sample showed X" to "X is true of everyone" is a common, casual reasoning
  error).
- **Repair**: re-anchor on "descriptive statistics describe ONLY the data collected" directly,
  requiring inferential machinery for any broader claim.

### MC-3: GRAPHICAL-DISPLAY-TYPE-MISMATCHED-TO-QUESTION
- **Surface form**: chooses an inappropriate graphical display for the question at hand (e.g. a
  histogram for a two-variable relationship, or a scatterplot for single-variable shape).
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared Moderate severity —
  without explicitly matching structure to purpose, display choice can feel interchangeable).
- **Repair**: re-anchor on each display's specific purpose — histogram (shape), boxplot
  (spread/center comparison), scatterplot (two-variable relationship).

## Misconceptions

### MC-1: MEAN-DEFAULTED-TO-WITHOUT-CHECKING-OUTLIERS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: DESCRIPTIVE-SAMPLE-STATISTIC-GENERALIZED-TO-POPULATION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: GRAPHICAL-DISPLAY-TYPE-MISMATCHED-TO-QUESTION
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The mean is a tug-of-war average — one very strong extreme value can drag it far from
  where most of the data sits; the median just counts who's in the middle of the line."**
- **Anti-analogy**: a descriptive summary of your sample is NOT automatically a fact about
  everyone else — that leap requires tools this concept alone doesn't supply.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: salaries 40, 42, 45, 48, 200 (thousands): mean 75
  (distorted by the outlier), median 45 (representative of most employees).
- **Demonstration 2 (targets MC-3)**: a teacher wanting overall test-score shape uses a
  histogram; wanting to compare spread across four sections uses a boxplot; a researcher wanting
  to relate study hours to scores uses a scatterplot — three genuinely different questions,
  three genuinely different tools.
- **Demonstration 3 (targets MC-2)**: "60% of THIS sample of 50 voters support the proposal" is
  descriptive; "so 60% of ALL city voters support it" is an unjustified inferential leap requiring
  additional machinery this concept doesn't provide.

## Discovery Questions
1. "If a dataset has one extreme outlier, is the mean still the best measure of 'typical'?"
2. "Could a histogram show you whether two variables are related to each other?"
3. "If 60% of your sample supports something, does that automatically mean 60% of the whole
   population does?"

## Teaching Sequence
1. **Representation shift**: physically sort a small dataset (median) and compute an average
   (mean) concretely, then work the salary outlier example directly.
2. **Contrast pair**: Demonstration 1's mean-versus-median comparison, isolating MC-1 by
   requiring outliers/skew checked before choosing a measure of center.
3. **Contrast pair**: Demonstration 2's display-to-purpose matching, isolating MC-3 by requiring
   each display's specific structural purpose stated explicitly.
4. **Contrast pair**: Demonstration 3's descriptive-versus-inferential distinction, isolating MC-2
   by requiring generalization beyond the data flagged as a separate, unjustified claim.
5. **Mastery gate**: require a correct center-measure choice with justification, a correct
   display-type selection, and a correct identification of a descriptive-versus-inferential
   overreach, at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept the mean chosen as the measure of center without checking for outliers or skew.
- Never accept a sample-derived percentage stated as a population fact without the inferential
  caveat.

## Voice Teaching Notes
- Say "did you check for outliers before picking mean over median?" whenever a measure of center
  is chosen.
- When a sample result is generalized, ask "is that a fact about your data, or a claim about
  everyone else too?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes mean, median, and standard deviation for
  a new dataset.
- **Rung 2 (application)**: learner correctly selects the appropriate graphical display for a new
  question, and correctly chooses mean or median based on outlier/skew presence.
- **Rung 3 (transfer)**: learner correctly applies outlier-aware center choice, appropriate
  display selection, and descriptive-versus-inferential boundary-checking together within a
  single NEW applied scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute mean and median explicitly on the salary example.
- If MC-2 recurs, re-anchor on "descriptive statistics describe only the data collected."
- If MC-3 recurs, re-anchor on each display's specific structural purpose.

## Memory Hooks
- "One outlier can drag the mean far from typical — the median holds its ground."
- "Histogram: shape. Boxplot: spread/comparison. Scatterplot: relationship. Never interchange
  them."
- "Your sample's number is a fact about your sample — not automatically about everyone."

## Transfer Connections
- `math.stats.population-sample` (already authored, this campaign, Batch 105): supplies the
  population/sample framing and the "sample data used to learn about a population" context this
  concept's descriptive/inferential boundary is drawn against.
- `math.stats.sampling` (not yet authored — being authored in this same batch): the KG's declared
  unlock, building formal sampling methodology toward the inferential machinery this concept
  explicitly withholds.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.descriptive-statistics.md`, reused by
  reference for its salary-outlier mean/median example, its display-to-purpose matching, its
  voter-survey descriptive/inferential contrast, and its three-misconception registry (severity
  levels adopted directly as declared; birth types independently classified since this Blueprint
  states Description but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  hospital's wait-time data, its outlier-resistant median, an appropriate comparison display, and
  an inferential overreach in an administrator's generalized claim.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.population-sample`, unlocks `math.stats.sampling`, cross_links none,
  developing/apply, mastery_threshold 0.9, estimated_hours 4) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 106): authored. First entry this batch. Companion batch concept:
  `math.stats.sampling`. `math.stats` moves 1/40 → **2/40** this batch.
