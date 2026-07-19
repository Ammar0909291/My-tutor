# Teaching Blueprint: Descriptive Statistics (`math.stats.descriptive-statistics`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.descriptive-statistics` |
| name | Descriptive Statistics |
| domain | Statistics |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.stats.population-sample` |
| unlocks | `math.stats.sampling` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a small dataset physically sorted and plotted before formal summary statistics |
| description (KG) | Methods for summarizing and displaying data without inference. Includes numerical summaries (mean, median, standard deviation) and graphical displays (histograms, boxplots, scatterplots). |

## Component 1 — Learning Objectives

- LO1: Compute the **mean**, **median**, and **standard deviation** of a small dataset, and correctly choose WHICH measure of center (mean vs. median) is more appropriate for a given dataset, particularly one with **outliers** or **skew**.
- LO2: Construct and interpret a **histogram**, **boxplot**, and **scatterplot**, correctly matching each display type to the kind of data/relationship it's designed to show (distribution shape, five-number-summary spread, or two-variable relationship, respectively).
- LO3: Correctly distinguish **descriptive** statistics (summarizing/displaying the DATA AT HAND) from **inferential** statistics (drawing conclusions about a broader POPULATION) — recognizing that descriptive statistics make NO claims beyond the specific dataset being summarized.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.population-sample` (the population/sample distinction, and the general framing that sample data is used to learn about a population — descriptive statistics operate on whichever data is directly at hand, without yet making the inferential leap).

## Component 3 — Core Explanation

**Numerical summaries**: the **mean** (arithmetic average, $\bar x=\frac{\sum x_i}{n}$) and **median** (the middle value when sorted) both measure "center," but respond DIFFERENTLY to outliers/skew — the mean is PULLED toward extreme values (sensitive to outliers), while the median is RESISTANT to them (depends only on rank order, not magnitude). The **standard deviation** measures spread/variability around the mean.

**Choosing mean vs. median**: for roughly symmetric data without extreme outliers, the mean is typically preferred (uses all the numerical information). For skewed data or data with significant outliers (e.g. income data, house prices), the median is typically preferred, since a few extreme values would otherwise distort the mean far from where "most" of the data actually sits.

**Graphical displays**: a **histogram** shows the DISTRIBUTION SHAPE of a single variable (bars representing frequency counts in each range/bin) — good for seeing overall shape, skew, modality. A **boxplot** displays the **five-number summary** (minimum, Q1, median, Q3, maximum) — good for quickly comparing spread and center across groups, and flagging outliers visually. A **scatterplot** shows the RELATIONSHIP between TWO variables (one point per observation, plotted by its two coordinate values) — good for spotting correlation/trend patterns that summary numbers alone cannot reveal.

**Descriptive vs. inferential**: descriptive statistics summarize ONLY the data actually collected — no claims are made about any larger population beyond what's directly observed. Inferential statistics (a later concept) uses sample data to draw conclusions ABOUT a broader population, which requires additional assumptions and machinery (sampling distributions, confidence intervals, hypothesis tests) that descriptive statistics alone never invoke.

## Component 4 — Worked Examples

**Example 1 (LO1 — mean vs. median with an outlier, breaking MC-1)**: Salaries (in thousands) for 5 employees: 40, 42, 45, 48, 200 (one CEO earning far more). Mean: $\frac{40+42+45+48+200}{5}=\frac{375}{5}=75$. Median: sorted, the middle value is 45. The mean (75) is dramatically PULLED UP by the single outlier (200), giving a misleading impression that a "typical" employee earns 75k — the median (45) more accurately reflects where most employees' salaries actually sit.

**Example 2 (LO2 — matching display to purpose)**: A teacher wants to see the overall SHAPE of a class's test scores (is it symmetric, skewed, bimodal?) — a **histogram** is the right tool. The same teacher wants to quickly compare test-score spread across FOUR different class sections — a **boxplot** (one box per section, side by side) is the right tool, since it directly shows median and spread for easy multi-group comparison. A researcher wants to see whether hours studied relates to test score — a **scatterplot** (hours on one axis, score on the other, one point per student) is the right tool, since it's specifically designed to reveal a two-variable relationship neither a histogram nor boxplot could show.

**Example 3 (LO3 — descriptive vs. inferential, breaking MC-2)**: A survey of 50 randomly selected voters in a city finds that 30 (60%) support a proposal. The DESCRIPTIVE statistic is simply: "in THIS sample of 50 voters, 60% supported the proposal" — a factual summary of the data collected, making no claim beyond it. A student who says "so 60% of ALL city voters support the proposal" has made an INFERENTIAL leap (generalizing from the sample to the full population) — this is a genuinely different, additional claim requiring inferential statistical machinery (margin of error, confidence intervals) to justify properly, and is NOT something the descriptive summary alone establishes.

## Component 5 — Teaching Actions

### Teaching Action A01 — Computing Mean/Median/SD, and Constructing Displays (Primitive P11: Representation Shift)

Start concrete: physically sort a small set of index cards with numbers on them, finding the middle card (median) and computing the average by hand (mean). Work Example 1's salary dataset explicitly, computing both and noting the discrepancy.

Shift representation to graphical displays: sketch a histogram, boxplot, and scatterplot side by side for different described scenarios (Example 2), explicitly connecting each display's STRUCTURE to what specific question it answers.

- **MC-1 hook**: present Example 1's salary data and ask "which is the better measure of a 'typical' employee's salary here, the mean or the median?" — an answer of "mean, since it uses all the data" (without considering the outlier's distorting effect) reveals MC-1 (defaulting to the mean as always superior, without checking for outliers/skew that make the median more representative).

### Teaching Action A02 — Descriptive vs. Inferential, and Outlier Sensitivity (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Revisit Example 1's mean (75, distorted) versus median (45, representative) explicitly, stating the general rule: "check for outliers or skew FIRST — if present, the median usually gives a more representative sense of 'typical,' since it isn't dragged around by extreme values the way the mean is."

**Contrast 2 (targets MC-2)**: Work Example 3's voter-survey scenario explicitly — the DESCRIPTIVE claim ("60% of THIS sample") versus the (unjustified, without further work) INFERENTIAL claim ("60% of the whole population"). State the rule precisely: "descriptive statistics describe ONLY the data you actually have in hand — the moment you generalize beyond it to a broader population, you've crossed into inferential territory, which requires additional justification this concept alone doesn't provide."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the mean and median for the dataset: 12, 15, 14, 13, 60. Explain which is more representative of "typical," and why.
  2. A city planner wants to see whether commute time relates to distance from downtown, using data from 100 residents. Identify which graphical display (histogram, boxplot, or scatterplot) is the appropriate tool, and explain why.
  3. A dataset of 200 exam scores is summarized as "mean = 78, standard deviation = 6." State what this pair of numbers tells you, and explain why a histogram would give ADDITIONAL information (like shape/skew) that these two numbers alone don't capture.
  4. A poll of 40 shoppers at one store finds 25 prefer brand A. A student concludes "most shoppers everywhere prefer brand A." Explain the specific overreach in this conclusion, distinguishing the descriptive fact from the inferential claim.
- **P76 (Transfer Probe, mode = independence)**: "A hospital records the wait times (in minutes) of 30 patients on a particular day: mostly clustered between 10-20 minutes, but three patients waited over 90 minutes due to emergencies bumping their appointments. (a) Explain, using this lesson's outlier-sensitivity distinction, why the MEDIAN wait time would give patients a more representative sense of 'typical' wait than the MEAN. (b) The hospital wants to visually compare this day's wait-time distribution against a previous month's data — identify which graphical display would best support this comparison, and explain why. (c) A hospital administrator states 'so all patients at this hospital typically wait around [the median] minutes' — using this lesson's descriptive-vs-inferential distinction, explain what additional claim this statement makes beyond what the single day's data alone supports."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MEAN-DEFAULTED-TO-WITHOUT-CHECKING-OUTLIERS | Defaulting to the mean as the preferred measure of center without checking whether outliers or skew make the median more representative | Foundational |
| MC-2 | DESCRIPTIVE-SAMPLE-STATISTIC-GENERALIZED-TO-POPULATION | Treating a descriptive statistic computed from sample/observed data as if it directly applies to the entire population, without recognizing this as an unjustified inferential leap | Foundational |
| MC-3 | GRAPHICAL-DISPLAY-TYPE-MISMATCHED-TO-QUESTION | Choosing an inappropriate graphical display for the question at hand (e.g. a histogram to show a two-variable relationship, or a scatterplot to show single-variable distribution shape) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Mean-Default Without Outlier Check") → P41 (detect: present Example 1's salary data and ask which measure is more representative, checking for an unexamined "mean" answer) → P64 (conceptual shift: compute both explicitly, showing the mean's distortion and the median's resistance to the single extreme value).
- **B02 (targets MC-2)**: P27 (name it: "Descriptive-to-Population Overgeneralization") → P41 (detect: present a sample statistic and a student's population-level conclusion, checking whether the leap is recognized as unjustified) → P64 (conceptual shift: re-anchor on "descriptive statistics describe ONLY the data collected — any claim about a larger population requires inferential machinery this concept doesn't provide").
- **B03 (targets MC-3)**: P27 (name it: "Display-Type Mismatch") → P41 (detect: present a two-variable relationship question and check whether a student proposes a histogram or boxplot instead of a scatterplot) → P64 (conceptual shift: re-anchor on each display's specific purpose — histogram (single-variable shape), boxplot (spread/center comparison across groups), scatterplot (two-variable relationship) — matching the question's actual structure to the right tool).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.population-sample` (the population/sample framing this concept's data-summarization methods operate within, without yet making inferential claims).
- **Unlocks**: `math.stats.sampling` (formal sampling methodology, building toward the inferential machinery this concept explicitly does NOT yet provide).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a developing/apply tag places this at the "2 main TAs + gate" tier — A01 (computing summaries and constructing displays) and A02 (outlier-sensitivity contrast plus the descriptive/inferential boundary) jointly cover all three LOs.
- MC-2 (descriptive statistic generalized to population) was made a co-equal focus alongside MC-1 because it represents perhaps the single most consequential everyday statistical reasoning error — casually generalizing "our sample showed X" into "therefore X is true of everyone" — and this concept is precisely the right place to draw this boundary clearly and early, BEFORE any inferential machinery is introduced, so the distinction is available as a permanent checkpoint for every future statistics concept in this corpus.
- The hospital wait-time transfer probe was deliberately designed to require all three learning objectives in sequence within one scenario (outlier-aware center choice, appropriate display selection, and catching an inferential overreach), mirroring how real data-summarization tasks typically demand these skills together rather than in isolation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.population-sample`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physically sorted dataset before formal statistics) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
