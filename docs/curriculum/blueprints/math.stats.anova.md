# Teaching Blueprint: Analysis of Variance (`math.stats.anova`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.anova` |
| name | Analysis of Variance |
| domain | Statistics |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.stats.hypothesis-testing`, `math.prob.continuous-distributions` |
| unlocks | `math.stats.two-way-anova` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — computing the variance decomposition and F statistic for a specific small dataset before the general procedure | 
| description (KG) | Tests equality of means across k≥2 groups. Partitions total variability: SS_Total = SS_Between + SS_Within. Test statistic F = MS_Between/MS_Within ~ F(k−1, N−k) under H₀. Requires equal variances and approximate normality. |

## Component 1 — Learning Objectives

- LO1: State ANOVA's hypothesis setup — $H_0$: all $k$ group means are equal ($\mu_1=\mu_2=\cdots=\mu_k$), $H_1$: at least one differs — directly using `math.stats.hypothesis-testing`'s own five-step procedure, and recognize this ONE combined test answers a genuinely different question than running multiple separate pairwise comparisons.
- LO2: Compute the variance partition $SS_{Total}=SS_{Between}+SS_{Within}$ (an EXACT algebraic decomposition, not merely two independently-computed quantities that happen to relate) and the test statistic $F=MS_{Between}/MS_{Within}$, following the $F(k-1,N-k)$ distribution under $H_0$ (a specific NAMED continuous distribution, per `math.prob.continuous-distributions`'s own framework).
- LO3: Correctly interpret a significant (large) $F$ statistic as evidence that AT LEAST ONE group mean differs, WITHOUT identifying which specific pair(s) — and recognize ANOVA's validity depends on its stated assumptions (equal variances, approximate normality across groups), which must be checked, not assumed automatically.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.hypothesis-testing` (the five-step procedure: state $H_0$/$H_1$, collect data, compute a test statistic, find the p-value, decide; the precise conditional meaning of the p-value; Type I vs. Type II error) and `math.prob.continuous-distributions` (density-based probability, named continuous distributions).

## Component 3 — Core Explanation

**One combined test, not many separate pairwise ones**: ANOVA tests $H_0: \mu_1=\mu_2=\cdots=\mu_k$ (all $k$ group means equal) against $H_1$: at least one differs — using `math.stats.hypothesis-testing`'s own five-step procedure, but applied to $k\ge2$ groups SIMULTANEOUSLY in a single test. This is genuinely different from running $\binom{k}{2}$ separate pairwise t-tests: repeating many individual tests, each at significance level $\alpha$, inflates the OVERALL chance that at least one produces a false positive somewhere — ANOVA's single combined F-test controls this overall error rate directly, exactly what repeated pairwise testing fails to do.

**The variance partition is an exact identity, and F measures between-vs-within variability**: total variability across all observations, $SS_{Total}$, splits EXACTLY into $SS_{Between}$ (variability of the group means around the overall grand mean) plus $SS_{Within}$ (variability of individual observations around their own group's mean) — $SS_{Total}=SS_{Between}+SS_{Within}$ always, a genuine algebraic decomposition, not a coincidental relationship between two separately computed numbers. Dividing each by its own degrees of freedom gives the mean squares $MS_{Between}=SS_{Between}/(k-1)$ and $MS_{Within}=SS_{Within}/(N-k)$, and the test statistic $F=MS_{Between}/MS_{Within}$ follows the $F(k-1,N-k)$ distribution under $H_0$ — a large $F$ means the between-group variability is large relative to the ordinary within-group "noise," evidence against $H_0$.

**A significant F does not pinpoint WHICH groups differ, and assumptions must hold**: rejecting $H_0$ (a significant, large $F$) proves only that AT LEAST ONE group's mean differs from the others somewhere — it does NOT, by itself, identify which specific pair(s) are different; a separate post-hoc test is needed for that. ANOVA's validity also depends on its stated assumptions — approximately equal variances across groups, and approximate normality — genuinely holding; the $F(k-1,N-k)$ comparison is not automatically trustworthy if these assumptions are badly violated.

## Component 4 — Worked Examples

**Example 1 (LO1 — one combined test avoids inflated false-positive risk, breaking MC-1)**: Testing three fertilizer types (A, B, C) for equal mean crop yield: $H_0: \mu_A=\mu_B=\mu_C$. If a researcher instead ran three SEPARATE pairwise t-tests (A vs. B, A vs. C, B vs. C), each at $\alpha=0.05$, the overall chance of AT LEAST ONE false positive across all three (if independent) is roughly $1-(0.95)^3\approx14.3\%$ — noticeably higher than the intended $5\%$. ANOVA's single combined $F$-test avoids this inflation, testing all three means at once while controlling the overall error rate at the stated $\alpha$.

**Example 2 (LO2 — the exact variance decomposition and F computation, breaking MC-2)**: Group A: $2,4$; Group B: $6,8$; Group C: $10,12$ ($k=3$, $n=2$ each, $N=6$). Grand mean $=42/6=7$; group means $\bar A=3,\bar B=7,\bar C=11$. $SS_{Total}=\sum(x_i-7)^2 = 25+9+1+1+9+25=70$. $SS_{Between}=\sum n_j(\bar x_j-7)^2 = 2(16)+2(0)+2(16)=64$. $SS_{Within}=\sum\sum(x_{ij}-\bar x_j)^2 = (1+1)+(1+1)+(1+1)=6$. Check: $SS_{Between}+SS_{Within}=64+6=70=SS_{Total}$ ✓ — EXACT match, confirming the decomposition identity, not a coincidence. $F=\dfrac{64/2}{6/3}=\dfrac{32}{2}=16$ — a large $F$ value.

**Example 3 (LO3 — significant F doesn't identify which pairs differ; assumptions matter, breaking MC-3)**: Example 2's $F=16$ is large, suggesting strong evidence against $H_0$ — at least one group's mean genuinely differs. But this ANOVA result ALONE does not formally establish whether it's $A\ne B$, $A\ne C$, $B\ne C$, or all three pairs — despite the sample means ($3,7,11$) LOOKING like every pair differs, pinpointing which specific pair(s) are statistically different requires a separate post-hoc test (e.g. Tukey's HSD), not part of the ANOVA F-test itself. Separately: if Group C's data had been far MORE variable than A and B's (violating the equal-variances assumption), the $F(k-1,N-k)$ comparison used to judge $F=16$'s significance would no longer be strictly valid, and the resulting conclusion could be misleading.

## Component 5 — Teaching Actions

### Teaching Action A01 — One Test Controls the Overall Error Rate (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: three separate pairwise tests at $\alpha=0.05$ each inflate the overall false-positive risk to roughly $14.3\%$, while ANOVA's single combined test controls the overall rate at the stated $\alpha$. State: "ANOVA isn't a shortcut for running several t-tests — it's a genuinely different test, answering 'does ANY group differ' in one step, specifically to avoid this inflation."

- **MC-1 hook**: ask "is running ANOVA basically the same as running a pairwise t-test for every pair of groups?" — a "yes" answer reveals MC-1 (missing the genuine overall-error-rate control ANOVA provides that repeated pairwise testing does not).

### Teaching Action A02 — The Variance Partition Is an Exact Identity (Primitive P11: Representation Shift)

State: "$SS_{Total}=SS_{Between}+SS_{Within}$ isn't a coincidence you verify after the fact — it's a genuine algebraic decomposition, guaranteed to hold exactly." Work Example 2's full computation, confirming $64+6=70$ exactly.

- **MC-2 hook**: ask "are SS_Between and SS_Within just two separately computed numbers that happen to be related, or are they guaranteed to add up to SS_Total exactly?" — an answer treating them as merely coincidentally related reveals MC-2 (missing the genuine decomposition identity).

### Teaching Action A03 — Significant Doesn't Mean "Every Pair Differs"; Assumptions Must Hold (Primitive P06: Contrast Pair)

Present Example 3's direct evidence: $F=16$ is significant, proving only that SOME group differs, not identifying which pair(s) — despite how suggestive the sample means look. Contrast with the assumption caution: unequal variances across groups would undermine the $F$-distribution comparison's validity. State: "a significant ANOVA result is an existence claim — 'some difference exists' — not a map of exactly where; and the whole comparison depends on the equal-variances and normality assumptions actually holding."

- **MC-3 hook**: ask "if ANOVA's F-test is significant, does that tell you specifically which groups differ from each other?" — a "yes" answer reveals MC-3 (missing that a significant F only proves at least one difference exists, without identifying which pair).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State $H_0$ and $H_1$ for an ANOVA test comparing mean test scores across 4 different teaching methods.
  2. For Group A: $1,3$; Group B: $5,7$ ($k=2$, $n=2$ each), compute $SS_{Total}$, $SS_{Between}$, $SS_{Within}$, and verify the decomposition identity.
  3. Using problem 2's sums of squares, compute the $F$ statistic.
  4. Explain why a significant ANOVA result does not, by itself, tell you which specific groups differ from one another.
- **P76 (Transfer Probe, mode = independence)**: "A pharmaceutical researcher tests whether four different drug dosages produce different mean reductions in blood pressure, running a one-way ANOVA. (a) State the null and alternative hypotheses for this test, and explain why a single ANOVA is preferred here over running six separate pairwise t-tests (one per pair of the four dosages). (b) The researcher obtains a large, significant F statistic — explain precisely what this result does and does not establish about the four dosage groups. (c) Before trusting the F-test's result, the researcher should check that the assumptions of equal variances and approximate normality hold across all four dosage groups — explain what could go wrong with the conclusion if one dosage group's blood pressure measurements were far more variable than the others."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ANOVA-CONFLATED-WITH-REPEATED-PAIRWISE-TESTS | Believing ANOVA is essentially the same as running a separate pairwise t-test for every pair of groups, missing the overall-error-rate control a single combined test provides | Foundational |
| MC-2 | SS-DECOMPOSITION-TREATED-AS-COINCIDENTAL | Treating SS_Between and SS_Within as independently computed quantities that happen to relate, rather than an exact, guaranteed algebraic decomposition of SS_Total | Foundational |
| MC-3 | SIGNIFICANT-F-ASSUMED-TO-IDENTIFY-WHICH-GROUPS-DIFFER | Believing a significant ANOVA F-test identifies specifically which groups differ from each other, missing that it only establishes that at least one difference exists somewhere | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "ANOVA Conflated with Repeated Pairwise Tests") → P41 (detect: ask a student whether ANOVA is equivalent to running a pairwise t-test for every group pair, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's inflated overall-error-rate computation, re-anchoring on "ANOVA is a single test controlling the overall false-positive risk — repeated pairwise testing does not").
- **B02 (targets MC-2)**: P27 (name it: "SS Decomposition Treated as Coincidental") → P41 (detect: ask a student whether SS_Between and SS_Within are guaranteed to sum to SS_Total, and check for uncertainty or a "no") → P64 (conceptual shift: re-walk Example 2's exact numerical verification ($64+6=70$), re-anchoring on "this is an algebraic identity — it holds exactly, every time, by construction").
- **B03 (targets MC-3)**: P27 (name it: "Significant F Assumed to Identify Which Groups Differ") → P41 (detect: ask a student what a significant ANOVA result tells them about which specific groups differ, and check whether they claim it identifies the specific pair(s)) → P64 (conceptual shift: re-walk Example 3's discussion, re-anchoring on "a significant F is an existence claim only — pinpointing which pair(s) differ needs a separate post-hoc test").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.hypothesis-testing` (the five-step procedure and p-value interpretation this concept's F-test directly follows), `math.prob.continuous-distributions` (the named-continuous-distribution framework the $F(k-1,N-k)$ distribution instantiates).
- **Unlocks**: `math.stats.two-way-anova` (extends this concept's single-factor variance partition to two simultaneous grouping factors).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (the overall-error-rate justification for a combined test), A02 (the exact variance-decomposition identity), and A03 (significance vs. pinpointing, plus assumption-checking) each target a distinct LO, appropriate for a concept combining a genuine computational procedure with two important interpretive cautions.
- Example 2's dataset was deliberately constructed with very clean, well-separated group means ($3,7,11$, equally spaced) specifically so the decomposition identity ($64+6=70$) could be verified by hand with small, exact numbers, rather than requiring a calculator-heavy or approximate computation.
- Example 3 deliberately reuses Example 2's own data and F-statistic result to make the "significant doesn't mean every pair differs" point concrete against a SPECIFIC computed F-value, rather than as an abstract caveat detached from any actual number.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific small dataset decomposed and F computed before the general procedure) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
