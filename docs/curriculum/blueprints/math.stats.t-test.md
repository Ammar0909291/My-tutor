# Teaching Blueprint: t-Test (`math.stats.t-test`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.t-test` |
| name | t-Test |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.stats.hypothesis-testing`, `math.prob.continuous-distributions` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Tests H₀: μ=μ₀ with unknown σ. Test statistic T=(X̄−μ₀)/(S/√n)~t(n−1). Two-sample t for comparing two means (pooled or Welch). Paired t-test for matched pairs. Robust to normality violation for large n.

 |

## Component 1 — Learning Objectives

- LO1: Apply the ONE-SAMPLE $t$-test for $H_0:\mu=\mu_0$ WHEN $\sigma$ is UNKNOWN (the common practical case), computing $T=\frac{\bar{X}-\mu_0}{S/\sqrt{n}}\sim t(n-1)$.
- LO2: Distinguish the THREE $t$-test variants — ONE-SAMPLE (comparing one group's mean to a fixed value), TWO-SAMPLE (comparing two INDEPENDENT groups' means), and PAIRED (comparing MATCHED pairs, e.g. before/after measurements on the SAME subjects) — recognizing the PAIRED test is fundamentally different: it first computes DIFFERENCES within each pair, then runs a ONE-SAMPLE test on those differences, rather than treating the two groups as independent.
- LO3: Recognize the $t$-test is generally ROBUST to violations of the normality assumption for LARGE sample sizes (by the Central Limit Theorem's influence on $\bar{X}$'s own distribution) — but this robustness should NOT be assumed automatically for SMALL samples, where normality violations can genuinely compromise the test's validity.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.hypothesis-testing` (the general framework) and `math.prob.continuous-distributions` (needed for the $t$-distribution).

## Component 3 — Core Explanation

The **$t$-test** tests $H_0:\mu=\mu_0$ when $\sigma$ is UNKNOWN (estimated by the sample standard deviation $S$) — the common practical case. The ONE-SAMPLE test statistic is $T=\frac{\bar{X}-\mu_0}{S/\sqrt{n}}$, following a $t$-distribution with $n-1$ degrees of freedom under $H_0$.

There are THREE major $t$-test variants: the ONE-SAMPLE test (comparing a single group's mean to a fixed reference value); the TWO-SAMPLE test (comparing the means of two INDEPENDENT groups, via a pooled or Welch's version); and the PAIRED $t$-test (for MATCHED pairs — e.g. the SAME subjects measured before and after a treatment). The paired test is structurally DIFFERENT from the two-sample test: rather than treating the two sets of measurements as independent groups, it FIRST computes the DIFFERENCE within each matched pair, then runs an ordinary ONE-SAMPLE test on those difference scores (testing whether the mean difference is zero) — using the two-sample formula on paired data (ignoring the pairing structure) discards valuable information and can produce a misleading result.

The $t$-test is generally ROBUST to VIOLATIONS of the underlying normality assumption for LARGE sample sizes — the Central Limit Theorem's influence on $\bar{X}$'s own sampling distribution helps compensate for non-normal raw data. However, this robustness should NOT be assumed automatically for SMALL samples, where a genuinely non-normal population can meaningfully compromise the test's validity.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic one-sample computation, breaking MC-1)**: Test $H_0:\mu=20$ against $H_a:\mu\ne20$, given $\bar{x}=22$, $s=4$ (ESTIMATED, $\sigma$ unknown), $n=25$. $T=\frac{22-20}{4/\sqrt{25}}=\frac{2}{0.8}=2.5$, compared against $t_{0.025,24}\approx2.064$ — since $2.5>2.064$, REJECT $H_0$. A common error uses the NORMAL distribution's critical value (1.96) instead of the correct $t$-distribution value with $24$ degrees of freedom — since $\sigma$ is estimated (not known), the $t$-distribution (with its fatter tails, accounting for the extra estimation uncertainty) is the correct reference, not the normal distribution.

**Example 2 (LO2 — paired vs. two-sample structure, breaking MC-2)**: A study measures each of 15 patients' blood pressure BEFORE and AFTER a treatment (the SAME patients, matched pairs). Explain why a PAIRED $t$-test (not a two-sample $t$-test treating before/after as independent groups) is the correct choice. Since the SAME patients are measured twice, the before/after values are NATURALLY CORRELATED (each patient serves as their own baseline) — the paired test correctly exploits this by analyzing the WITHIN-PATIENT differences directly, removing patient-to-patient variability from the comparison. A common error treats the "before" and "after" measurements as two INDEPENDENT groups (running a two-sample test), ignoring the fact that each pair comes from the SAME subject — this discards the valuable pairing information and typically produces a LESS POWERFUL (or misleading) test compared to correctly using the paired structure.

**Example 3 (LO3 — robustness and its limits)**: A researcher has a sample of $n=200$ (large) from a somewhat SKEWED (non-normal) population, and separately a sample of $n=8$ (small) from an equally skewed population. Explain why the $t$-test is more trustworthy for the FIRST case than the second. For the large sample ($n=200$), the Central Limit Theorem ensures $\bar{X}$'s sampling distribution is approximately normal REGARDLESS of the underlying population's shape, making the $t$-test reasonably robust here. For the SMALL sample ($n=8$), there isn't enough data for the CLT's approximation to kick in reliably, so the population's genuine non-normality can meaningfully distort the test's validity — robustness to non-normality is a LARGE-SAMPLE property, not a universal guarantee.

## Component 5 — Teaching Actions

### Teaching Action A01 — Using the t-Distribution's Critical Value with n-1 Degrees of Freedom (Primitive P64: Conceptual Shift)

Work Example 1, explicitly using the correct $t$-distribution critical value rather than the normal distribution's.

- **MC-1 hook**: check whether the $t$-distribution (not the normal distribution) critical value is used.

### Teaching Action A02 — Paired Data Requires the Paired t-Test, Not the Two-Sample Test (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the correct paired approach against the incorrect independent-groups treatment.

- **MC-2 hook**: this directly targets MC-2 (treating matched-pair data as independent groups, ignoring the pairing structure).

### Teaching Action A03 — Robustness to Non-Normality Is a Large-Sample Property (reused procedure)

Present Example 3, explicitly contrasting the large-sample and small-sample cases' reliability.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Test $H_0:\mu=15$ against $H_a:\mu\ne15$, given $\bar{x}=16.5$, $s=3$, $n=16$, at $\alpha=0.05$ (using $t_{0.025,15}\approx2.131$).
  2. A study measures the same 20 students' test scores before and after a tutoring program. Determine which $t$-test variant is appropriate and explain why.
  3. Explain, in one sentence, why the paired t-test analyzes within-pair differences rather than treating the two measurement sets as independent groups.
  4. Explain why the t-test's robustness to non-normality is stronger for large samples than for small samples.
- **P76 (Transfer Probe, mode = independence)**: "A nutrition researcher measures each of 30 participants' cholesterol levels before starting a new diet, and again after 8 weeks on the diet, wanting to test whether the diet significantly changed cholesterol levels. (a) Identify which t-test variant is appropriate for this study design, and explain why treating the before/after measurements as two independent groups would be a mistake. (b) Explain why, given the sample size of 30, the researcher can be reasonably (though not unconditionally) confident in the test's validity even if cholesterol levels aren't perfectly normally distributed in the population."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NORMAL-DISTRIBUTION-CRITICAL-VALUE-USED-INSTEAD-OF-T-DISTRIBUTION | Using the normal distribution's critical value instead of the t-distribution's (with n-1 degrees of freedom), when σ is estimated rather than known | Foundational |
| MC-2 | MATCHED-PAIR-DATA-TREATED-AS-TWO-INDEPENDENT-GROUPS-IGNORING-THE-PAIRING-STRUCTURE | Analyzing matched-pair (paired) data as if it were two independent groups, discarding the valuable pairing information a paired t-test would exploit | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Normal Distribution Critical Value Used Instead of T-Distribution") → P41 (detect: present Example 1 and check whether the $t$-distribution's critical value is correctly used) → P64 (conceptual shift: re-confirm $\sigma$ is unknown/estimated, then re-select the $t$-distribution with $n-1$ degrees of freedom).
- **B02 (targets MC-2)**: P27 ("Matched Pair Data Treated as Two Independent Groups Ignoring the Pairing Structure") → P41 (detect: present Example 2 and check whether the paired structure is (incorrectly) ignored) → P64 (conceptual shift: re-identify the matched-pair structure explicitly, computing within-pair differences before running a one-sample test).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.hypothesis-testing`, `math.prob.continuous-distributions`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.stats.z-test`.

## Component 8 — Teaching Notes

- estimated_hours = 5 (the highest in this batch) reflects the genuine breadth of three distinct $t$-test variants plus the robustness/sample-size nuance.
- Both misconceptions were ranked Foundational because each can produce a genuinely wrong hypothesis-testing decision or discard important structural information in the data.
- The before/after-diet transfer probe was deliberately chosen because repeated-measures designs (same subjects, before/after) are extremely common in real research, making the paired-vs-independent distinction concretely important rather than an abstract classification exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.hypothesis-testing`, `math.prob.continuous-distributions`) |
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
