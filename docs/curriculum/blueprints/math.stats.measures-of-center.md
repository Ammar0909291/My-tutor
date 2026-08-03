# Teaching Blueprint: Measures of Center (`math.stats.measures-of-center`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.measures-of-center` |
| name | Measures of Center |
| domain | Statistics |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.stats.descriptive-statistics`, `math.arith.fractions` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — physically sort/count data before formulas |
| description (KG) | Mean (arithmetic average): x̄ = (∑xᵢ)/n. Median: middle value when sorted. Mode: most frequent value. Trimmed mean: removes extreme values. Mean is sensitive to outliers; median is robust.

 |

## Component 1 — Learning Objectives

- LO1: Compute the MEAN $\bar{x}=\frac{\sum x_i}{n}$ (sum of all values divided by count), the MEDIAN (the middle value when SORTED — average of the two middle values if $n$ is EVEN), and the MODE (the most frequently occurring value).
- LO2: Recognize the MEAN is SENSITIVE to outliers (a single extreme value can shift it substantially), while the MEDIAN is ROBUST (largely unaffected by extreme values, since it depends only on POSITION in the sorted order, not magnitude).
- LO3: Recognize a dataset may have ZERO, ONE, or MULTIPLE modes (unlike mean and median, which always exist as single well-defined values for a numeric dataset) — and correctly compute the median by first SORTING the data, a step that's easy to skip.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.descriptive-statistics` (the broader context of summarizing data) and `math.arith.fractions` (needed for the mean's division and the median's averaging of two middle values).

## Component 3 — Core Explanation

Three common **measures of center** summarize "where the data is centered": the **mean** $\bar{x}=\frac{\sum x_i}{n}$ (sum all values, divide by the count); the **median** (SORT the data, then take the MIDDLE value — or the average of the two middle values if $n$ is even); and the **mode** (the value that occurs MOST FREQUENTLY).

A crucial distinction: the mean is SENSITIVE to outliers — a single extremely large or small value can shift the mean substantially, since EVERY value contributes to the sum. The median, by contrast, is ROBUST to outliers — since it depends only on which value occupies the MIDDLE POSITION after sorting, an extreme value at one end barely affects it (it might still just be "the extreme end," not changing which value sits in the middle).

Unlike mean and median (which are always single, well-defined numbers for a numeric dataset), a dataset can have ZERO modes (if no value repeats), ONE mode, or MULTIPLE modes (if several values tie for most frequent) — mode's existence and uniqueness aren't guaranteed the way mean/median's are.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — mean's outlier sensitivity, breaking MC-1)**: For the dataset $\{2,3,4,5,100\}$, compute the mean and median. Mean $=\frac{2+3+4+5+100}{5}=\frac{114}{5}=22.8$ — heavily influenced by the outlier 100. Median (already sorted): the middle value is $4$ — essentially UNCHANGED by the outlier's presence. A common error assumes the mean is always "the best" measure of center regardless of the data's shape, applying it uncritically even when a dataset clearly contains an extreme outlier — in cases like this, the mean (22.8) badly misrepresents where "most" of the data actually sits (clustered around 2-5), while the median (4) is far more representative.

**Example 2 (LO1 — median with an even n, breaking MC-2)**: Find the median of $\{7,2,9,4\}$. First SORT: $\{2,4,7,9\}$. Since $n=4$ is EVEN, the median is the AVERAGE of the two middle values: $\frac{4+7}{2}=5.5$. A common error skips the sorting step (attempting to find "the middle" of the data in its ORIGINAL, unsorted order) or, for an even $n$, incorrectly picks just ONE of the two middle values instead of averaging them — both sorting first AND correctly averaging the two middle values (for even $n$) are essential steps.

**Example 3 (LO3 — mode existence and multiplicity)**: Find the mode of $\{3,5,5,7,9\}$ and separately of $\{2,4,6,8\}$. First dataset: mode is $5$ (appears twice, more than any other value). Second dataset: NO mode exists (every value appears exactly once — no value is "most frequent" in a meaningful sense).

## Component 5 — Teaching Actions

### Teaching Action A01 — Mean Is Outlier-Sensitive, Median Is Robust (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting the mean's dramatic shift against the median's stability in the presence of an outlier.

- **MC-1 hook**: this directly targets MC-1 (using the mean uncritically as "the" measure of center even when an outlier badly distorts it).

### Teaching Action A02 — Sort First, Then Average the Two Middle Values for Even n (Primitive P64: Conceptual Shift)

Work Example 2, explicitly performing the sorting step before identifying the median.

- **MC-2 hook**: this directly targets MC-2 (skipping the sort step, or failing to average the two middle values for even $n$).

### Teaching Action A03 — Mode May Not Exist or May Have Multiple Values (reused procedure)

Work Example 3, explicitly checking for mode existence and uniqueness in two contrasting datasets.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the mean, median, and mode of $\{4,4,6,8,10\}$.
  2. Find the median of $\{15,3,9,21\}$ (unsorted), showing the sorting step.
  3. Explain why the median is more "robust" than the mean when a dataset has an extreme outlier.
  4. Find the mode of $\{1,2,3,4,5\}$, and explain what this tells you about whether every dataset has a mode.
- **P76 (Transfer Probe, mode = independence)**: "A real estate analyst is summarizing home sale prices in a neighborhood, where most homes sold between \$300,000-\$400,000, but one mansion sold for \$5,000,000. (a) Explain why reporting the MEAN sale price to describe 'a typical home' in this neighborhood would be misleading. (b) Explain why the MEDIAN sale price would give a more representative picture of typical home prices in this specific scenario."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MEAN-USED-UNCRITICALLY-AS-THE-MEASURE-OF-CENTER-DESPITE-OUTLIERS | Using the mean as the default measure of center even when the dataset contains extreme outliers that badly distort it | Foundational |
| MC-2 | MEDIAN-COMPUTED-WITHOUT-SORTING-OR-WITHOUT-AVERAGING-THE-TWO-MIDDLE-VALUES-FOR-EVEN-N | Finding the median without first sorting the data, or failing to average the two middle values when n is even | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Mean Used Uncritically as the Measure of Center Despite Outliers") → P41 (detect: present Example 1 and check whether the mean is (uncritically) reported as representative despite the outlier) → P64 (conceptual shift: re-compute both mean and median, explicitly comparing which better represents "most" of the data).
- **B02 (targets MC-2)**: P27 ("Median Computed Without Sorting or Without Averaging the Two Middle Values for Even N") → P41 (detect: present Example 2 and check whether sorting is skipped or the even-n averaging step is missed) → P64 (conceptual shift: re-sort the data explicitly, then re-identify (and average, if even) the middle value(s)).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.descriptive-statistics`, `math.arith.fractions`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.stats.measures-of-spread`.
- **Parent**: `math.stats.descriptive-statistics`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.95 reflects that these are foundational, extremely frequently-used statistical concepts expected to become fully automatic.
- Both misconceptions were ranked Foundational because each produces either a misleading summary statistic (MC-1) or a numerically wrong median value (MC-2).
- The real-estate-outlier transfer probe was deliberately chosen because mean-vs-median distortion from a single extreme value is one of the most common and consequential real-world statistical misinterpretations, directly motivating the robustness distinction.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.descriptive-statistics`, `math.arith.fractions`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physically sort/count data before formulas) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO1, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
