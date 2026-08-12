# Teaching Blueprint: Test Statistic (`math.stats.test-statistic`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.test-statistic` |
| name | Test Statistic |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.stats.hypothesis-testing` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A function of the data measuring evidence against H₀. Under H₀, the test statistic has a known distribution (z, t, χ², F). The observed value is compared to the null distribution to compute a p-value.

 |

## Component 1 — Learning Objectives

- LO1: Define a TEST STATISTIC as a function of the SAMPLE DATA, computed to measure the EVIDENCE against the null hypothesis $H_0$ — a single number SUMMARIZING how far the observed data departs from what $H_0$ predicts.
- LO2: Recognize that UNDER $H_0$ (assuming it's TRUE), the test statistic has a KNOWN, SPECIFIC distribution ($z$, $t$, $\chi^2$, or $F$, depending on the test) — this KNOWN reference distribution is what makes computing a $p$-value possible.
- LO3: Understand the LOGIC of comparing the OBSERVED test statistic value to this NULL distribution to compute a $p$-value — a LARGE test statistic magnitude (far into the tail of the null distribution) corresponds to a SMALL $p$-value, indicating STRONG evidence against $H_0$; recognizing this INVERSE relationship (extreme statistic $\leftrightarrow$ small $p$-value) is essential, not an arbitrary convention.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.hypothesis-testing` — the test statistic is the central computational tool within that broader framework.

## Component 3 — Core Explanation

A **test statistic** is a function of the sample DATA, computed specifically to measure the EVIDENCE against the null hypothesis $H_0$ — it summarizes, in a single number, how far the observed data's behavior departs from what $H_0$ would predict.

The key property making test statistics useful: UNDER the assumption that $H_0$ is TRUE, the test statistic follows a KNOWN, well-characterized probability distribution — commonly the $z$ (standard normal), $t$, $\chi^2$ (chi-squared), or $F$ distribution, depending on the specific test being conducted. This KNOWN reference distribution (the "null distribution") is precisely what makes computing a $p$-value possible: without knowing what the test statistic SHOULD look like under $H_0$, there'd be no basis for judging whether the OBSERVED value is surprising.

The logic connecting the test statistic to the $p$-value: a test statistic value FAR into the TAIL of the null distribution (an extreme, unlikely-under-$H_0$ value) corresponds to a SMALL $p$-value — indicating the observed data would be quite SURPRISING if $H_0$ were really true, hence STRONG evidence AGAINST $H_0$. This INVERSE relationship (more extreme statistic $\Rightarrow$ smaller $p$-value $\Rightarrow$ stronger evidence against $H_0$) is a direct mathematical consequence of how $p$-values are defined (as tail probabilities), not an arbitrary interpretive convention.

## Component 4 — Worked Examples

**Example 1 (LO1 — the test statistic as evidence-measuring function, breaking MC-1)**: Explain why a $z$-test statistic of $z=2.5$ constitutes stronger evidence against $H_0$ than $z=0.3$. The value $z=2.5$ is FAR into the tail of the standard normal distribution (an unusual, unlikely value if $H_0$ were true), while $z=0.3$ is close to the CENTER (a very typical, unremarkable value under $H_0$) — the LARGER magnitude test statistic indicates the observed data is more surprising under the assumption that $H_0$ is true, hence stronger evidence against it. A common error treats the test statistic's numeric value as simply "a computed number" without connecting its MAGNITUDE to how UNUSUAL that value would be under the null distribution — the test statistic's value only carries evidential meaning THROUGH its position relative to the known null distribution.

**Example 2 (LO2 — different tests use different reference distributions)**: State which reference distribution ($z$, $t$, $\chi^2$, or $F$) is typically used for (a) a one-sample mean test with known $\sigma$, (b) a one-sample mean test with unknown $\sigma$ estimated by $s$, and (c) a chi-squared goodness-of-fit test. (a) $z$-distribution. (b) $t$-distribution (with $n-1$ degrees of freedom). (c) $\chi^2$-distribution (naturally, given the test's name).

**Example 3 (LO3 — the inverse relationship, breaking MC-2)**: For two hypothesis tests, one producing a test statistic in the extreme tail (far from the null distribution's center) and another producing a test statistic close to the center, determine which has the SMALLER $p$-value. The test statistic in the EXTREME TAIL has the SMALLER $p$-value (since $p$-value is defined as the tail probability of observing something at least as extreme, and there's LESS tail area beyond a more extreme point). A common error assumes a LARGER test statistic value corresponds to a LARGER $p$-value (perhaps mistakenly generalizing "bigger number = bigger probability" without accounting for the tail-probability definition) — the relationship is genuinely INVERSE: more extreme statistic values correspond to SMALLER tail probabilities (p-values), not larger ones.

## Component 5 — Teaching Actions

### Teaching Action A01 — Test Statistic Magnitude Reflects Surprise Under H₀ (Primitive P64: Conceptual Shift)

Work Example 1, explicitly connecting the test statistic's magnitude to its position in the null distribution.

- **MC-1 hook**: check whether the test statistic's evidential meaning is correctly connected to its position relative to the null distribution, not treated as a bare number.

### Teaching Action A02 — Different Tests Use Different Reference Distributions (reused procedure)

Work Example 2, explicitly matching test types to their appropriate reference distributions.

### Teaching Action A03 — More Extreme Statistic Means Smaller p-value, Not Larger (Primitive P06: Contrast Pair)

Work Example 3, explicitly contrasting the correct inverse relationship against the incorrect direct-proportionality assumption.

- **MC-2 hook**: this directly targets MC-2 (assuming a larger test statistic corresponds to a larger p-value, rather than the correct inverse relationship).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Explain why a test statistic of $z=3.2$ provides stronger evidence against $H_0$ than $z=0.5$.
  2. State which reference distribution is used for a two-sample $t$-test.
  3. Given two test statistics, one at the 99th percentile of the null distribution and one at the 60th percentile, determine which has the smaller p-value.
  4. Explain, in one sentence, why the test statistic's distribution "under $H_0$" being known is essential for computing a p-value.
- **P76 (Transfer Probe, mode = independence)**: "A clinical trial computes a test statistic of $t=4.1$ (with an associated null distribution being the $t$-distribution) to test whether a new treatment has any effect, versus a separate trial for a different drug producing $t=0.8$. (a) Explain which trial provides stronger evidence against its null hypothesis (no treatment effect), connecting to how extreme each test statistic is relative to the null distribution. (b) Explain why simply reporting 't=4.1' or 't=0.8' without reference to the null distribution would be uninterpretable as evidence."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TEST-STATISTIC-VALUE-TREATED-AS-A-BARE-NUMBER-DISCONNECTED-FROM-THE-NULL-DISTRIBUTION | Treating the test statistic's numeric value as meaningful on its own, without connecting its magnitude to its position relative to the known null distribution | Foundational |
| MC-2 | LARGER-TEST-STATISTIC-ASSUMED-TO-CORRESPOND-TO-LARGER-P-VALUE | Assuming a larger test statistic magnitude corresponds to a larger p-value, rather than the correct inverse relationship (more extreme statistic means smaller p-value) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Test Statistic Value Treated as a Bare Number Disconnected from the Null Distribution") → P41 (detect: present Example 1 and check whether the test statistic's evidential meaning is connected to the null distribution) → P64 (conceptual shift: re-visualize the test statistic's position on the null distribution's curve, explicitly).
- **B02 (targets MC-2)**: P27 ("Larger Test Statistic Assumed to Correspond to Larger P-Value") → P41 (detect: present Example 3 and check whether the direction of the relationship is (incorrectly) reversed) → P64 (conceptual shift: re-derive the p-value's tail-probability definition explicitly, confirming more extreme values have less tail area beyond them).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.hypothesis-testing`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.stats.hypothesis-testing`.

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects the genuine conceptual weight of connecting a computed number to its evidential interpretation via the null distribution.
- Both misconceptions were ranked Foundational because each reflects a fundamental misunderstanding of how test statistics function as evidence, not a computational slip.
- The two-trial-comparison transfer probe was deliberately chosen because directly comparing evidence strength across two studies is a genuinely common real-world statistical reasoning task, motivating correct interpretation of test statistic magnitude.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.hypothesis-testing`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
