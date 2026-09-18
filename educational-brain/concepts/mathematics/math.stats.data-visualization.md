# math.stats.data-visualization

## Identity
- **KG id**: `math.stats.data-visualization`
- **Domain**: math.stats
- **Requires**: `math.stats.descriptive-statistics`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Select the appropriate graphical summary based on data type and question — HISTOGRAM for a
single numeric variable's frequency distribution, BAR CHART specifically for CATEGORICAL data,
SCATTERPLOT for the relationship between two numeric variables; read a BOXPLOT (five-number
summary plus outlier points), correctly recognizing points beyond the whiskers as flagged
OUTLIERS, never plotting errors; and recognize why histograms and bar charts, despite visual
similarity, serve genuinely different purposes.

## Core Understanding
CHART TYPE FOLLOWS DATA TYPE, NEVER VISUAL PREFERENCE: reusing `math.stats.descriptive-
statistics`'s own display-to-purpose framing directly, a HISTOGRAM shows the frequency
distribution of a single NUMERIC variable, binning its range; a BAR CHART displays CATEGORICAL
data, each bar a distinct category with conventional (non-meaningful) gaps and often no inherent
order; a SCATTERPLOT shows the relationship between TWO numeric variables as $(x,y)$ points. For
exam scores (0-100), a histogram is correct; for votes across five candidates, a bar chart is
correct — treating the candidates as if they had a meaningful numeric order and plotting
contiguous bars would misrepresent genuinely categorical data.

BOXPLOT OUTLIERS ARE A DELIBERATE FEATURE, NEVER A PLOTTING ERROR: a boxplot displays the
five-number summary (min, $Q_1$, median, $Q_3$, max), with whiskers extending to the most extreme
NON-outlier values; points plotted BEYOND the whiskers (e.g. a single point at 45 when the upper
whisker reaches 30) are flagged OUTLIERS — genuine, deliberately-highlighted values in the actual
dataset, never a mistake in the plot or a data-entry error to be dismissed.

HISTOGRAM BARS TOUCH BECAUSE BINS ARE CONTIGUOUS; BAR CHART BARS DON'T BECAUSE CATEGORIES AREN'T:
age bins (0-10, 10-20, 20-30, ...) are CONTIGUOUS numeric ranges — 20-30 immediately follows
10-20 with no gap in the underlying scale, so histogram bars touch. Ice cream flavors (chocolate,
vanilla, strawberry, mint) are DISTINCT, unordered categories with no inherent adjacency — so bar
chart gaps signal there's no meaningful numeric continuity between them, despite the superficial
visual similarity to a histogram.

## Mental Models
- **"Ask 'is this variable numeric or categorical?' before picking a chart — that single
  question decides histogram/scatterplot versus bar chart."**
- **"A boxplot's flagged outlier point is the plot telling you something true and important about
  the data — never a glitch to explain away."**

## Why Students Fail

### MC-1: HISTOGRAM-CONVENTION-USED-FOR-GENUINELY-CATEGORICAL-DATA
- **Surface form**: uses a histogram's contiguous-bin convention for categorical data that should
  be displayed with a bar chart instead.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared Moderate severity — a
  histogram and bar chart look superficially similar, obscuring the underlying data-type
  distinction).
- **Repair**: re-check whether the variable is numeric or categorical before selecting a chart
  type.

### MC-2: BOXPLOT-OUTLIER-POINTS-ASSUMED-TO-BE-DATA-ERRORS-RATHER-THAN-GENUINE-FLAGGED-VALUES
- **Surface form**: assumes points plotted beyond a boxplot's whiskers indicate a data entry
  error or plotting mistake.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  values that look "unusual" are intuitively assumed to be mistakes rather than genuine
  observations).
- **Repair**: re-interpret the boxplot's structure explicitly, confirming outlier flagging is an
  intentional, informative feature.

## Misconceptions

### MC-1: HISTOGRAM-CONVENTION-USED-FOR-GENUINELY-CATEGORICAL-DATA
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

### MC-2: BOXPLOT-OUTLIER-POINTS-ASSUMED-TO-BE-DATA-ERRORS-RATHER-THAN-GENUINE-FLAGGED-VALUES
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A histogram's bars are neighboring plots of land on a continuous street — a bar chart's
  bars are separate buildings on unrelated streets, deliberately spaced apart."**
- **Anti-analogy**: an outlier point beyond a boxplot's whiskers is NOT the plot malfunctioning —
  it is the plot doing exactly its job, flagging a genuinely unusual value.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: exam scores (0-100, numeric) call for a histogram; votes
  across four elective subjects (categorical) call for a bar chart — using a histogram-style
  contiguous plot for the subjects would falsely imply a numeric ordering that doesn't exist.
- **Demonstration 2 (targets MC-2)**: a boxplot with min 2, $Q_1=10$, median 15, $Q_3=22$, max 30,
  and one point at 45 — the point at 45 is a genuine flagged outlier, never a data error, plotted
  separately because it exceeds the typical whisker range.
- **Demonstration 3 (reinforces the histogram/bar-chart distinction)**: age bins (0-10, 10-20,
  20-30) touch because they're contiguous numeric ranges; ice cream flavor bars have gaps because
  the categories have no inherent numeric adjacency.

## Discovery Questions
1. "Is the variable you're plotting numeric with a natural range, or a set of distinct
   categories?"
2. "If a boxplot shows a point plotted far beyond the whiskers, does that mean something went
   wrong with the plot?"
3. "Why do histogram bars touch each other while bar chart bars conventionally don't?"

## Teaching Sequence
1. **Conceptual shift**: Demonstration 1's numeric-versus-categorical check, isolating MC-1 by
   requiring the data type identified before any chart is chosen.
2. **Contrast pair**: Demonstration 2's genuine-outlier interpretation, isolating MC-2 by
   requiring the flagged point recognized as real data, never dismissed as an error.
3. **Procedure reuse**: Demonstration 3's contiguous-versus-gapped bar convention, reinforcing
   the underlying data-type distinction visually.
4. **Mastery gate**: require a correct chart-type selection for two new scenarios, a correct
   boxplot-outlier interpretation, and a correct histogram-versus-bar-chart explanation, at the
   Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept a histogram-style plot proposed for genuinely categorical data.
- Never accept a boxplot's flagged outlier point dismissed as a data error without justification.

## Voice Teaching Notes
- Say "is that variable numeric or categorical — does that change which chart you'd use?"
  whenever a chart type is selected.
- When an outlier point appears, ask "is that a genuine data point, or are you assuming it's a
  mistake?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly selects the appropriate chart type for a new
  numeric or categorical variable.
- **Rung 2 (application)**: learner correctly reads a boxplot's five-number summary and
  identifies flagged outlier points.
- **Rung 3 (transfer)**: learner correctly recommends chart types for TWO different new
  visualizations in a single applied scenario, and correctly interprets outlier points as
  meaningful business/data signals rather than errors.

## Tutor Recovery Strategy
- If MC-1 recurs, re-check whether the variable is numeric or categorical directly.
- If MC-2 recurs, re-interpret the boxplot's structure, confirming outlier flagging is
  intentional.

## Memory Hooks
- "Numeric gets a histogram or scatterplot; categorical gets a bar chart — the question decides
  it, not appearance."
- "A boxplot's outlier point is information, never an error to explain away."

## Transfer Connections
- `math.stats.descriptive-statistics` (already authored, this campaign, Batch 106): supplies the
  display-to-purpose framing (histogram/boxplot/scatterplot) this concept extends with bar
  charts and detailed boxplot reading.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.data-visualization.md`, reused by
  reference for its numeric-versus-categorical chart selection, its boxplot-outlier
  interpretation, its histogram-versus-bar-chart contiguity explanation, and its
  two-misconception registry (severity levels adopted directly as declared; birth types
  independently classified since this Blueprint states Description but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining an
  employee-salary report needing both a salary-distribution visualization and a department-count
  visualization, and interpreting boxplot outliers as a meaningful salary-structure signal.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.descriptive-statistics`, unlocks none, cross_links none, developing/apply,
  mastery_threshold 0.85, estimated_hours 4) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-18 (Batch 108): authored. First entry this batch. Companion batch concept:
  `math.meas.sigma-algebra` (opening a new domain). `math.stats` moves 5/40 → **6/40** this
  batch, closing the entire `descriptive-statistics` sub-branch's frontier.
