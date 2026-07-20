# Teaching Blueprint: Measures of Spread (`math.stats.measures-of-spread`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.measures-of-spread` |
| name | Measures of Spread |
| domain | Statistics |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.stats.descriptive-statistics` |
| unlocks | none |
| cross_links | `math.prob.variance` (authored earlier — see Component 7) |
| CPA_entry_stage | C (Concrete) — developing learner computes range/IQR/sample variance directly on small datasets before connecting to the theoretical Var(X) concept |
| description (KG) | Range = max − min. IQR = Q3 − Q1 (robust). Sample variance $s^2=\sum(x_i-\bar x)^2/(n-1)$ (Bessel's correction for unbiasedness). Sample SD $s=\sqrt{s^2}$. Five-number summary: min, Q1, median, Q3, max. |

## Component 1 — Learning Objectives

- LO1: Compute range, IQR ($Q_3-Q_1$), and the five-number summary (min, $Q_1$, median, $Q_3$, max) for a small dataset — and correctly explain why IQR is ROBUST to outliers (unaffected by extreme values, since it depends only on the middle 50% of ranked data) while range is NOT (determined entirely by the two most extreme values).
- LO2 (cross-link objective): Compute the SAMPLE variance $s^2=\frac{\sum(x_i-\bar x)^2}{n-1}$ (note the DIVISOR $n-1$, not $n$) and sample standard deviation $s=\sqrt{s^2}$ for a dataset — and explain precisely WHY the divisor is $n-1$ rather than $n$ (Bessel's correction, for unbiasedness), contrasting this with `math.prob.variance`'s own POPULATION quantity $\operatorname{Var}(X)=E[(X-\mu)^2]$, which needs NO such correction since it is a theoretical property of a random variable, not an ESTIMATE computed from sampled data.
- LO3: Correctly select the appropriate spread measure (range, IQR, or standard deviation) for a given dataset and purpose — particularly recognizing when a dataset's outliers make IQR the more trustworthy choice over standard deviation, which (like the mean) is sensitive to extreme values.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.descriptive-statistics` (mean, median, and standard deviation computed informally; histograms, boxplots, scatterplots as graphical displays; the mean's sensitivity to outliers versus the median's robustness).

## Component 3 — Core Explanation

**Range and IQR: two spread measures with very different robustness**: RANGE ($\max-\min$) uses only the two most extreme data points — a single unusual outlier can inflate it dramatically, making it as outlier-sensitive as the mean itself. IQR ($Q_3-Q_1$, the interquartile range) uses only the MIDDLE 50% of the ranked data — the bottom and top quarters (where outliers typically live) are excluded entirely, making IQR ROBUST in exactly the same sense `math.stats.descriptive-statistics` already establishes for the median (both depend on rank position, not raw magnitude). The FIVE-NUMBER SUMMARY (min, $Q_1$, median, $Q_3$, max) packages both extremes and the robust middle-spread information together in one compact description, directly feeding a boxplot's construction.

**Sample variance needs Bessel's correction — a genuinely different quantity from `math.prob.variance`'s $\operatorname{Var}(X)$**: `math.prob.variance` defines $\operatorname{Var}(X)=E[(X-\mu)^2]$ as a THEORETICAL property of a random variable — an exact quantity, given the true distribution, needing no correction. Sample variance $s^2$, by contrast, is an ESTIMATE of this unknown population quantity, computed from a finite SAMPLE of data where the true population mean $\mu$ is unknown and must be replaced by the sample mean $\bar x$. Using $\bar x$ (itself estimated FROM the same data) systematically makes $\sum(x_i-\bar x)^2$ slightly SMALLER, on average, than the true $\sum(x_i-\mu)^2$ would be (since $\bar x$ is, by construction, the value minimizing $\sum(x_i-c)^2$ over all choices of $c$) — dividing by the smaller $n$ would UNDER-estimate the true variance systematically. Dividing by $n-1$ instead (Bessel's correction) exactly compensates for this systematic downward bias, making $s^2$ an UNBIASED estimator of $\operatorname{Var}(X)$ — a genuinely different computational role from `math.prob.variance`'s exact, correction-free theoretical quantity.

**Choosing the right spread measure depends on outlier sensitivity, mirroring the mean-vs-median choice**: exactly as `math.stats.descriptive-statistics` already teaches for CENTER (mean sensitive to outliers, median robust), the SAME distinction applies to SPREAD: standard deviation (built from squared deviations from the mean) is sensitive to outliers, while IQR (built from quartile RANKS) is robust. For a dataset with genuine, meaningful outliers, IQR is the more trustworthy spread summary; for a well-behaved, roughly symmetric dataset without extreme values, standard deviation is typically preferred (and is required for many further statistical procedures).

## Component 4 — Worked Examples

**Example 1 (LO1 — range vs. IQR's differing outlier sensitivity, breaking MC-1)**: for the dataset $\{2,3,4,5,6,7,100\}$ (one clear outlier, 100): range $=100-2=98$ — DOMINATED by the single outlier. Computing the five-number summary: sorted data is already given; median $=5$; $Q_1$ (median of lower half $\{2,3,4\}$) $=3$; $Q_3$ (median of upper half $\{6,7,100\}$) $=7$; IQR $=7-3=4$ — completely UNAFFECTED by the outlier 100, since $Q_3=7$ is determined by rank position, not by 100's actual extreme value. This concretely confirms LO1's claimed contrast: range collapses under one outlier, IQR does not.

**Example 2 (LO2 — computing sample variance with Bessel's correction, and why it's needed, breaking MC-2)**: for the dataset $\{4,6,8\}$ (sample mean $\bar x=6$): $\sum(x_i-\bar x)^2=(4-6)^2+(6-6)^2+(8-6)^2=4+0+4=8$. Sample variance $s^2=\frac{8}{n-1}=\frac{8}{2}=4$, giving sample SD $s=2$. Contrasting directly: dividing by $n=3$ INSTEAD would give $\frac{8}{3}\approx2.67$ — a SMALLER value, illustrating the systematic downward bias Bessel's correction exists to fix. This is a fundamentally different computational task from `math.prob.variance`'s $\operatorname{Var}(X)=E[(X-\mu)^2]$, which — GIVEN a known true distribution and its exact $\mu$ — requires no such correction at all, since it isn't estimating anything from finite sampled data.

**Example 3 (LO3 — selecting the right spread measure for a specific dataset, breaking MC-3)**: for a company's employee salaries, mostly clustered between \$40,000–\$60,000 but with one CEO earning \$5,000,000: standard deviation would be MASSIVELY inflated by the CEO's salary (exactly as the mean would be, per `math.stats.descriptive-statistics`'s own outlier-sensitivity lesson for center) — making it a poor, misleading summary of "typical" salary spread. IQR, computed from the middle 50% of salaries (entirely excluding the CEO's extreme value), gives a far more representative picture of how spread out the TYPICAL employee salaries actually are — confirming LO3's selection principle concretely on a realistic scenario.

## Component 5 — Teaching Actions

### Teaching Action A01 — Range Collapses Under One Outlier, IQR Does Not (Primitive P11: Representation Shift)

State: "range only looks at the two most extreme values — one unusual point can dominate it completely. IQR looks at RANK positions in the middle 50%, the same robustness principle `math.stats.descriptive-statistics` already established for the median over the mean." Walk Example 1's direct range-vs-IQR contrast.

- **MC-1 hook**: ask "does a single extreme outlier affect the IQR the same way it affects the range?" — a "yes, equally" answer reveals MC-1 (missing IQR's rank-based robustness, mirroring range's extreme-value sensitivity).

### Teaching Action A02 — Sample Variance's $n-1$ Divisor Corrects a Genuine Bias — This Is Not `math.prob.variance`'s Quantity (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: dividing by $n=3$ gives $2.67$, systematically SMALLER than dividing by $n-1=2$ (giving $4$) — a concrete illustration of the downward bias Bessel's correction fixes. State: "sample variance isn't the same computational object as `math.prob.variance`'s $\operatorname{Var}(X)$ — that's an exact theoretical quantity needing no correction; sample variance is an ESTIMATE from data, and using $\bar x$ instead of the true (unknown) $\mu$ requires the $n-1$ correction to stay unbiased."

- **MC-2 hook**: ask "is sample variance's formula $s^2=\sum(x_i-\bar x)^2/(n-1)$ the exact same computational object as `math.prob.variance`'s $\operatorname{Var}(X)=E[(X-\mu)^2]$, just with a different symbol, or a genuinely different (estimating) quantity requiring its own correction?" — a "same object" answer reveals MC-2 (missing the estimation-vs-theoretical distinction and the reason for Bessel's correction).

### Teaching Action A03 — Choose the Spread Measure Based on Outlier Sensitivity, Mirroring the Center-Measure Choice (Primitive P06: Contrast Pair)

Contrast standard deviation's outlier-inflated result on Example 3's salary data against IQR's robust, representative result on the SAME data. State: "this is the SAME choice `math.stats.descriptive-statistics` already taught for mean vs. median — standard deviation, like the mean, gets pulled around by outliers; IQR, like the median, resists them; pick based on whether your data has genuine outliers worth resisting."

- **MC-3 hook**: ask "for a dataset with a genuine, extreme outlier, is standard deviation or IQR generally the more trustworthy spread summary?" — a "standard deviation" answer reveals MC-3 (missing the outlier-robustness principle that favors IQR in such cases).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For the dataset $\{1,2,3,4,5,50\}$, compute the range and IQR, and explain the difference in what each reveals.
  2. Compute the sample variance and standard deviation for the dataset $\{10,12,14\}$, showing the $n-1$ divisor explicitly.
  3. Explain, citing `math.prob.variance`'s own theoretical $\operatorname{Var}(X)$ definition, why THAT formula needs no Bessel's correction while sample variance does.
  4. For a dataset of test scores with no unusual outliers, explain which spread measure (IQR or standard deviation) is generally preferred, and why.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.prob.variance`)**: "A data analyst has a TRUE, known probability distribution for a manufacturing process's output measurement (so `math.prob.variance`'s $\operatorname{Var}(X)$ can be computed EXACTLY from the distribution's formula) and SEPARATELY has a sample of 50 actual measured outputs from the real process, from which they compute sample variance $s^2$. (a) Explain why the analyst computes $\operatorname{Var}(X)$ using the distribution's own formula with NO Bessel's correction, while $s^2$ from the 50 real measurements DOES require the $n-1$ divisor. (b) If the analyst's 50 measurements happen to include one wildly anomalous faulty-sensor reading, explain why $s$ (sample standard deviation) might give a misleading picture of the process's typical spread, and what more robust measure could be computed instead. (c) Explain conceptually why, as the sample size $n$ grows very large, the difference between dividing by $n$ and dividing by $n-1$ becomes increasingly negligible."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | IQR-ASSUMED-EQUALLY-OUTLIER-SENSITIVE-AS-RANGE | Believing a single extreme outlier affects IQR the same way it affects range, missing IQR's rank-based robustness | Foundational |
| MC-2 | SAMPLE-VARIANCE-CONFLATED-WITH-POPULATION-VARIANCE | Believing sample variance $s^2$ is the same computational object as `math.prob.variance`'s theoretical $\operatorname{Var}(X)$, missing the estimation-vs-theoretical distinction that necessitates Bessel's correction | High |
| MC-3 | STANDARD-DEVIATION-ASSUMED-ALWAYS-PREFERRED | Believing standard deviation is generally the more trustworthy spread measure regardless of outliers, missing that IQR is the more robust choice when genuine outliers are present | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "IQR Assumed Equally Outlier-Sensitive as Range") → P41 (detect: ask whether an outlier affects IQR the same way it affects range) → P64 (conceptual shift: re-walk Example 1's direct range-vs-IQR computation on the same dataset).
- **B02 (targets MC-2)**: P27 (name it: "Sample Variance Conflated with Population Variance") → P41 (detect: ask whether $s^2$ and $\operatorname{Var}(X)$ are the same computational object) → P64 (conceptual shift: re-walk Example 2's $n$ vs. $n-1$ divisor contrast and the estimation-vs-theoretical distinction).
- **B03 (targets MC-3)**: P27 (name it: "Standard Deviation Assumed Always Preferred") → P41 (detect: ask which measure is more trustworthy for outlier-heavy data) → P64 (conceptual shift: re-walk Example 3's salary-data scenario).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.descriptive-statistics` (mean, median, informal standard deviation, and the outlier-sensitivity distinction between mean and median this concept directly extends to spread).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.prob.variance`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.prob.variance`'s own theoretical $\operatorname{Var}(X)$ definition directly in Component 3's estimation-vs-theoretical contrast and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a developing/apply tag supports the "3 TAs + gate" tier, with LO1 establishing range/IQR/five-number-summary computation, LO2 given full depth distinguishing sample variance from `math.prob.variance`'s theoretical quantity, and LO3 directly mirroring `math.stats.descriptive-statistics`'s own mean-vs-median outlier-sensitivity lesson for the spread case.
- **Division of labor**: `math.stats.descriptive-statistics` already owns informal computation of standard deviation and the mean-vs-median outlier-sensitivity lesson (verified by grep — no Bessel's correction, IQR formula, or five-number-summary formalized there); `math.prob.variance` already owns the theoretical $\operatorname{Var}(X)=E[(X-\mu)^2]$ definition with no sample-estimation content (verified by grep — no "Bessel," "sample variance," or "$n-1$" language found there). This concept owns the SAMPLE-based formulas (range, IQR, five-number summary, sample variance/SD with Bessel's correction) and the genuinely new estimation-vs-theoretical distinction connecting to `math.prob.variance`.
- Example 3's deliberate choice of a realistic, relatable scenario (typical salaries plus one extreme CEO salary) rather than an abstract numeric dataset was made to make LO3's measure-selection principle concrete and memorable, directly paralleling `math.stats.descriptive-statistics`'s own approach to teaching the mean-vs-median choice via realistic scenarios.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.prob.variance` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: developing learner computes directly on small datasets before connecting to the theoretical Var(X)) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
