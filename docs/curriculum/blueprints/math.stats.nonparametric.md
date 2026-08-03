# Teaching Blueprint: Nonparametric Tests (`math.stats.nonparametric`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.nonparametric` |
| name | Nonparametric Tests |
| domain | Statistics |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.stats.hypothesis-testing` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Tests that make no parametric distributional assumptions. Sign test, Wilcoxon signed-rank test (paired data), Mann-Whitney U test (two samples), Kruskal-Wallis (k samples). Based on ranks rather than exact values.

 |

## Component 1 — Learning Objectives

- LO1: Recognize NONPARAMETRIC tests as making NO assumption about the underlying data's DISTRIBUTIONAL shape (unlike `math.stats.t-test`, which assumes approximate normality) — making them the appropriate choice when normality is genuinely violated, especially for SMALL samples where the Central Limit Theorem's rescue doesn't yet apply.
- LO2: Match the correct nonparametric test to its SCENARIO — the Wilcoxon SIGNED-RANK test for PAIRED data (the nonparametric analogue of the paired $t$-test), the Mann-Whitney U test for TWO INDEPENDENT samples (the analogue of the two-sample $t$-test), and Kruskal-Wallis for $k$ (more than two) INDEPENDENT samples (the analogue of one-way ANOVA) — using the WRONG test for the data's actual structure (paired vs. independent, two vs. more groups) is a common mismatch.
- LO3: Recognize these tests are based on RANKS of the data rather than the EXACT numeric values — this is precisely WHY they don't require distributional assumptions (ranks discard some information about exact magnitudes, but gain ROBUSTNESS to non-normality and outliers in exchange).

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.hypothesis-testing` — nonparametric tests are alternative test procedures within the same general framework.

## Component 3 — Core Explanation

**Nonparametric tests** make NO assumption about the underlying population's DISTRIBUTIONAL SHAPE — unlike `math.stats.t-test` (which assumes approximate normality, at least for small samples), nonparametric methods work validly regardless of the data's true distribution. This makes them the appropriate choice when normality is genuinely questionable, especially for SMALL samples (where the Central Limit Theorem hasn't yet "rescued" the sample mean's own distribution toward normality).

Several key nonparametric tests match specific data STRUCTURES: the **Wilcoxon signed-rank test** handles PAIRED data (the nonparametric analogue of the paired $t$-test); the **Mann-Whitney U test** handles TWO INDEPENDENT samples (the analogue of the two-sample $t$-test); **Kruskal-Wallis** handles $k$ (more than two) INDEPENDENT samples (the analogue of one-way ANOVA). Choosing the wrong test for the data's actual structure — e.g. using Mann-Whitney for genuinely PAIRED data — mismatches the analysis to the data, just as with the parametric analogues.

The mechanism underlying these tests' distribution-free validity: they operate on the RANKS of the data (1st smallest, 2nd smallest, etc.) rather than the EXACT numeric values themselves. Converting to ranks DISCARDS some information about precise magnitudes, but in exchange GAINS robustness — ranks are far less sensitive to outliers and don't depend on the raw data following any particular distributional shape.

## Component 4 — Worked Examples

**Example 1 (LO1 — when to prefer nonparametric over parametric, breaking MC-1)**: A researcher has a SMALL sample ($n=8$) with clearly non-normal, heavily skewed data. Explain why a nonparametric test would be preferred here over a $t$-test. With such a small sample, the Central Limit Theorem's normalizing effect on the sample mean hasn't kicked in strongly enough to reliably compensate for the population's genuine non-normality — a nonparametric test (which makes NO distributional assumption) avoids this risk entirely. A common error defaults to the $t$-test REGARDLESS of sample size or apparent distribution shape, without considering whether a nonparametric alternative would be more appropriate for this specific small, skewed dataset.

**Example 2 (LO2 — matching test to data structure, breaking MC-2)**: A study measures the SAME 12 patients' pain levels BEFORE and AFTER a treatment (matched pairs), with non-normal pain-score data. Determine the appropriate nonparametric test. Since the data is PAIRED (same patients, two measurements each), the Wilcoxon SIGNED-RANK test is appropriate — NOT the Mann-Whitney U test, which is designed for two INDEPENDENT samples. A common error applies the Mann-Whitney U test to genuinely PAIRED data (treating before/after as independent groups), mirroring the exact same paired-vs-independent structural mismatch error seen with the parametric $t$-test variants — the data's actual pairing structure must be matched to the correct nonparametric test, not defaulted to the "two-sample" version regardless.

**Example 3 (LO3 — ranks vs. exact values)**: Explain why converting data $\{3,7,50,9\}$ to ranks $\{1,3,4,2\}$ (respectively) helps make a test robust to an extreme outlier like 50. Once converted to ranks, the value 50's EXTREME magnitude no longer matters — it simply becomes "the largest," rank 4, exactly as it would if it had been, say, 10 instead of 50; the outlier's disproportionate influence on the RAW numeric analysis is eliminated by working with ranks instead of exact values.

## Component 5 — Teaching Actions

### Teaching Action A01 — Choosing Nonparametric Tests When Normality Is Questionable, Especially for Small n (Primitive P64: Conceptual Shift)

Work Example 1, explicitly connecting sample size and apparent distribution shape to the choice of test family.

- **MC-1 hook**: check whether the choice between parametric and nonparametric tests is genuinely informed by sample size and distributional considerations, not defaulted automatically.

### Teaching Action A02 — Matching Paired vs. Independent Data to the Correct Nonparametric Test (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the correct paired-data test (Wilcoxon signed-rank) against the incorrect independent-samples test (Mann-Whitney).

- **MC-2 hook**: this directly targets MC-2 (using the wrong nonparametric test for the data's actual paired/independent structure).

### Teaching Action A03 — Ranks Provide Robustness to Outliers (reused procedure)

Present Example 3, explicitly demonstrating how rank conversion neutralizes an extreme value's influence.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Explain why a nonparametric test might be preferred for a small sample with visibly skewed data.
  2. Determine which nonparametric test is appropriate for comparing THREE independent groups' non-normal data.
  3. Determine which nonparametric test is appropriate for comparing TWO independent groups' non-normal data.
  4. Explain why nonparametric tests based on ranks are more robust to outliers than tests based on exact values.
- **P76 (Transfer Probe, mode = independence)**: "A researcher studying customer satisfaction scores (on a 1-10 scale, with a notably skewed distribution due to many customers giving extreme scores of either 1 or 10) wants to compare satisfaction between two INDEPENDENT groups of customers who received different service approaches. (a) Explain why a nonparametric test would be a reasonable choice here, given the skewed distribution. (b) Identify the specific nonparametric test appropriate for comparing these two independent groups."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | T-TEST-DEFAULTED-TO-REGARDLESS-OF-SAMPLE-SIZE-OR-DISTRIBUTION-SHAPE | Defaulting to a t-test regardless of sample size or apparent distribution shape, without considering a nonparametric alternative when appropriate | Moderate |
| MC-2 | WRONG-NONPARAMETRIC-TEST-USED-FOR-PAIRED-VS-INDEPENDENT-DATA-STRUCTURE | Using the wrong nonparametric test (e.g. Mann-Whitney for genuinely paired data) that doesn't match the data's actual paired or independent structure | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("T-Test Defaulted to Regardless of Sample Size or Distribution Shape") → P41 (detect: check whether sample size and distributional shape are considered before choosing a test family) → P64 (conceptual shift: re-examine the sample size and apparent distribution, weighing whether a nonparametric alternative is warranted).
- **B02 (targets MC-2)**: P27 ("Wrong Nonparametric Test Used for Paired vs. Independent Data Structure") → P41 (detect: present Example 2 and check whether the data's pairing structure is correctly matched to the test) → P64 (conceptual shift: re-identify whether the data is paired or independent, selecting the matching nonparametric test).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.hypothesis-testing`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.stats.t-test` (the parametric counterpart these tests serve as alternatives to).

## Component 8 — Teaching Notes

- difficulty = expert reflects the genuine breadth of learning multiple distinct tests and their appropriate matching to data structures, mirroring but extending the parametric test family.
- MC-2 was ranked Foundational because a structural mismatch produces a genuinely invalid analysis, while MC-1 was ranked Moderate since defaulting to the t-test, while suboptimal, often still produces a usable (if less ideal) result for moderately-sized samples.
- The skewed-satisfaction-score transfer probe was deliberately chosen because bimodal/skewed rating-scale data (common in real customer satisfaction surveys) is a genuinely realistic scenario motivating nonparametric methods over a default t-test approach.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.hypothesis-testing`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
