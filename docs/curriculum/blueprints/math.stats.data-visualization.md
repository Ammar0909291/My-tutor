# Teaching Blueprint: Data Visualization (`math.stats.data-visualization`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.data-visualization` |
| name | Data Visualization |
| domain | Statistics |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.stats.descriptive-statistics` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — build each chart type from raw data |
| description (KG) | Graphical data summaries: histogram (frequency distribution), boxplot (five-number summary with outlier detection), scatterplot (bivariate relationship), bar chart (categorical data), stemplot, Q-Q plot (normality check).

 |

## Component 1 — Learning Objectives

- LO1: Select the appropriate graphical summary based on DATA TYPE and QUESTION — HISTOGRAM for a single numeric variable's frequency distribution, BAR CHART specifically for CATEGORICAL data (not numeric bins), and SCATTERPLOT for the relationship between TWO numeric variables.
- LO2: Read a BOXPLOT (five-number summary: minimum, $Q_1$, median, $Q_3$, maximum, plus outlier points) — correctly identifying which whisker/box segment corresponds to which quartile range, and recognizing points plotted BEYOND the whiskers as flagged OUTLIERS, not errors in the plot.
- LO3: Recognize a HISTOGRAM and a BAR CHART, despite looking visually similar, serve DIFFERENT purposes — a histogram's bars represent NUMERIC RANGES (bins) with NO meaningful gaps between adjacent bars (since the underlying variable is continuous/ordered), while a bar chart's bars represent DISTINCT CATEGORIES, where gaps between bars are conventional and the bar ORDER is often arbitrary.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.descriptive-statistics` — these are the graphical counterparts to numeric summary statistics.

## Component 3 — Core Explanation

Different **data visualization** tools suit different data types and questions. A **histogram** shows the FREQUENCY DISTRIBUTION of a single NUMERIC variable, dividing its range into bins and showing how many data points fall in each. A **bar chart** displays CATEGORICAL data — each bar represents a distinct CATEGORY (not a numeric range), with gaps between bars being conventional (not meaningful) and often an ARBITRARY bar order (unless categories have a natural order). A **scatterplot** shows the relationship between TWO numeric variables, each data point plotted as $(x,y)$.

A **boxplot** (box-and-whisker plot) displays the FIVE-NUMBER SUMMARY: minimum, $Q_1$ (left edge of the box), median (line inside the box), $Q_3$ (right edge of the box), and maximum — with the "whiskers" extending to the most extreme NON-outlier values, and any points BEYOND the whiskers plotted individually as flagged OUTLIERS (a genuine feature of the data, not a plotting error).

Despite superficial visual similarity, HISTOGRAMS and BAR CHARTS serve fundamentally DIFFERENT purposes: a histogram's bars represent CONTIGUOUS numeric bins (no meaningful gaps, since the underlying scale is continuous/ordered — adjacent bins are "next to" each other numerically), while a bar chart's bars represent DISTINCT categories (conventional gaps, and often no inherent left-to-right ordering).

## Component 4 — Worked Examples

**Example 1 (LO1 — matching chart type to data type, breaking MC-1)**: Choose the appropriate chart for (a) the distribution of exam scores (0-100) across a class, and (b) the number of students preferring each of four elective subjects. For (a): a HISTOGRAM (numeric variable, showing frequency across score ranges). For (b): a BAR CHART (categorical variable — four distinct subjects, not a continuous numeric range). A common error uses a HISTOGRAM for genuinely CATEGORICAL data (e.g. treating "subject preference" as if it had a meaningful numeric order, plotting it with contiguous bars) — categorical data with no inherent numeric ordering should use a bar chart, with conventional gaps between bars, not a histogram's contiguous-bin convention.

**Example 2 (LO2 — reading a boxplot, breaking MC-2)**: For a boxplot showing minimum 2, $Q_1=10$, median 15, $Q_3=22$, maximum 30, with one point plotted separately at 45, interpret the plot. The box spans from 10 to 22 (the middle 50% of data), with the median line at 15. The whiskers extend to 2 (minimum) and 30 (maximum, among NON-outlier points). The point at 45 is a flagged OUTLIER, plotted separately since it falls beyond the typical whisker range. A common error assumes the point at 45 must be a DATA ENTRY ERROR or a mistake in the plot, rather than recognizing it as a genuine, deliberately-flagged outlier value in the actual dataset — a boxplot's outlier markers are a FEATURE (highlighting unusual values), not evidence of a plotting malfunction.

**Example 3 (LO3 — histogram vs. bar chart distinction)**: Explain why a histogram of ages (0-10, 10-20, 20-30, etc.) has NO gaps between its bars, while a bar chart of favorite ice cream flavors (chocolate, vanilla, strawberry, mint) conventionally DOES have gaps. The age bins are CONTIGUOUS numeric ranges (30 immediately follows 20-30, with no gap in the underlying scale) — so the histogram bars touch. The ice cream flavors are DISTINCT, unordered categories with no inherent "adjacency" — so the bar chart's gaps signal there's no meaningful numeric continuity between categories.

## Component 5 — Teaching Actions

### Teaching Action A01 — Match Chart Type to Data Type: Numeric vs. Categorical (Primitive P64: Conceptual Shift)

Work Example 1, explicitly checking whether the variable is numeric (histogram/scatterplot) or categorical (bar chart) before selecting a chart.

- **MC-1 hook**: this directly targets MC-1 (using a histogram-style plot for categorical data).

### Teaching Action A02 — Boxplot Outliers Are Genuine Flagged Data, Not Errors (Primitive P06: Contrast Pair)

Work Example 2, explicitly interpreting the separately-plotted point as a genuine outlier feature, not a mistake.

- **MC-2 hook**: this directly targets MC-2 (assuming a boxplot's flagged outlier point indicates a plotting or data error).

### Teaching Action A03 — Histogram Bars Touch (Contiguous Bins); Bar Chart Bars Don't (Distinct Categories) (reused procedure)

Work Example 3, explicitly connecting the gap convention to the underlying data type.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Choose the appropriate chart type for the distribution of household incomes in a city, and justify.
  2. Choose the appropriate chart type for the number of votes each of five candidates received, and justify.
  3. For a boxplot with $Q_1=20$, median 28, $Q_3=35$, and a point plotted separately at 5, explain what this separate point represents.
  4. Explain why histogram bars touch each other while bar chart bars conventionally have gaps.
- **P76 (Transfer Probe, mode = independence)**: "A data analyst is preparing a report on employee salaries at a company, and needs to visualize (a) the overall salary distribution across all employees, and (b) how many employees work in each of six departments. (a) Recommend the appropriate chart type for each of these two visualizations, justifying your choice based on the data type. (b) If the salary distribution's boxplot shows several points plotted well above the upper whisker, explain what this indicates about the company's salary structure, rather than assuming these are data errors."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HISTOGRAM-CONVENTION-USED-FOR-GENUINELY-CATEGORICAL-DATA | Using a histogram's contiguous-bin convention for categorical data that should be displayed with a bar chart instead | Moderate |
| MC-2 | BOXPLOT-OUTLIER-POINTS-ASSUMED-TO-BE-DATA-ERRORS-RATHER-THAN-GENUINE-FLAGGED-VALUES | Assuming points plotted beyond a boxplot's whiskers indicate a data entry error or plotting mistake, rather than recognizing them as genuine flagged outlier values | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Histogram Convention Used for Genuinely Categorical Data") → P41 (detect: present Example 1's categorical case and check whether a histogram-style plot is (incorrectly) used) → P64 (conceptual shift: re-check whether the variable is numeric or categorical, selecting the appropriate chart type).
- **B02 (targets MC-2)**: P27 ("Boxplot Outlier Points Assumed to Be Data Errors Rather Than Genuine Flagged Values") → P41 (detect: present Example 2 and check whether the flagged point is (incorrectly) assumed to be an error) → P64 (conceptual shift: re-interpret the boxplot's structure explicitly, confirming outlier flagging is an intentional, informative feature).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.descriptive-statistics`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.stats.descriptive-statistics`.

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects the genuine breadth of learning multiple distinct chart types and their appropriate use cases.
- MC-2 was ranked Foundational because dismissing genuine outliers as "errors" could lead to inappropriately discarding real, important data, while MC-1 was ranked Moderate as primarily a visual-convention mismatch that doesn't corrupt the underlying data itself.
- The employee-salary transfer probe was deliberately chosen because both chart-type selection and outlier interpretation have genuine business-analytics stakes, making correct visualization choices concretely consequential.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.descriptive-statistics`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: build each chart type from raw data) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
