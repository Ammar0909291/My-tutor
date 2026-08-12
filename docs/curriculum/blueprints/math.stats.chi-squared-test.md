# Teaching Blueprint: Chi-Squared Test (`math.stats.chi-squared-test`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.chi-squared-test` |
| name | Chi-Squared Test |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.stats.hypothesis-testing`, `math.prob.continuous-distributions` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Goodness-of-fit: tests if observed frequencies match expected. Independence: tests if two categorical variables are independent in a contingency table. Statistic: χ²=∑(O−E)²/E~χ²(df) under H₀.

 |

## Component 1 — Learning Objectives

- LO1: Compute the chi-squared statistic $\chi^2=\sum\frac{(O-E)^2}{E}$, where $O$ is the OBSERVED frequency and $E$ is the EXPECTED frequency (under $H_0$) for each category/cell — summed across ALL categories/cells.
- LO2: Distinguish the TWO major uses: GOODNESS-OF-FIT (testing whether observed frequencies across categories of ONE variable match a specified/theoretical distribution) versus INDEPENDENCE (testing whether TWO categorical variables are independent, using a CONTINGENCY TABLE of joint frequencies) — these test DIFFERENT hypotheses and use DIFFERENTLY-computed expected frequencies.
- LO3: Compute the correct DEGREES OF FREEDOM for each test type — for goodness-of-fit with $k$ categories, $df=k-1$; for independence with an $r\times c$ contingency table, $df=(r-1)(c-1)$ — using the WRONG df formula changes which critical value is used, potentially flipping the decision.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.hypothesis-testing` (the general framework) and `math.prob.continuous-distributions` (needed for the $\chi^2$ reference distribution).

## Component 3 — Core Explanation

The **chi-squared test** statistic is $\chi^2=\sum\frac{(O-E)^2}{E}$, computed by summing, across ALL categories or table cells, the SQUARED difference between OBSERVED ($O$) and EXPECTED ($E$) frequencies, divided by the expected frequency — under $H_0$, this statistic follows a $\chi^2$ distribution with the appropriate degrees of freedom.

Two major USES exist. The **goodness-of-fit** test checks whether observed frequencies across the categories of ONE categorical variable match a SPECIFIED (theoretical) distribution — e.g. "does this die roll uniformly across its six faces?" The **independence** test checks whether TWO categorical variables are INDEPENDENT of each other, using a CONTINGENCY TABLE of joint observed frequencies — e.g. "is smoking status independent of disease incidence?" These are GENUINELY DIFFERENT hypotheses, and the EXPECTED frequencies are computed DIFFERENTLY for each: goodness-of-fit uses the theoretical/specified proportions directly, while independence computes expected cell frequencies from the table's row and column TOTALS (assuming independence).

The DEGREES OF FREEDOM differ by test type: for goodness-of-fit with $k$ categories, $df=k-1$ (one fewer than the number of categories, since the frequencies must sum to the total, removing one degree of freedom); for independence with an $r$-row-by-$c$-column contingency table, $df=(r-1)(c-1)$ — a DIFFERENT formula entirely, reflecting the table's two-dimensional structure. Using the wrong formula changes which critical $\chi^2$ value is compared against, potentially FLIPPING the test's conclusion.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing the chi-squared statistic, breaking MC-1)**: For observed frequencies $O=\{18,22,25,15\}$ across 4 categories, with expected frequencies (under $H_0$, uniform) $E=\{20,20,20,20\}$, compute $\chi^2$. $\chi^2=\frac{(18-20)^2}{20}+\frac{(22-20)^2}{20}+\frac{(25-20)^2}{20}+\frac{(15-20)^2}{20}=\frac{4}{20}+\frac{4}{20}+\frac{25}{20}+\frac{25}{20}=0.2+0.2+1.25+1.25=2.9$. A common error omits SQUARING the differences (or forgets to divide by $E$ for EACH term separately), computing something like $\sum(O-E)$ directly (which would sum to zero by construction, an obviously wrong "statistic") — each term must be squared and divided by its OWN category's expected frequency, then summed.

**Example 2 (LO2 — distinguishing goodness-of-fit from independence, breaking MC-2)**: Determine which chi-squared test type applies to (a) testing whether a company's customer complaints are evenly distributed across 5 product categories, and (b) testing whether customer satisfaction (satisfied/unsatisfied) is related to which of 3 store branches a customer visited. (a) is GOODNESS-OF-FIT (one variable — product category — compared to a theoretical uniform distribution). (b) is INDEPENDENCE (two variables — satisfaction and branch — checked for association via a contingency table). A common error applies the goodness-of-fit computation method (comparing single-variable category counts to a theoretical distribution) to the TWO-VARIABLE independence scenario, rather than correctly constructing a contingency table and computing expected cell frequencies from row/column totals — the two scenarios require genuinely different data structures and expected-frequency computations.

**Example 3 (LO3 — degrees of freedom, breaking MC-3-merged)**: Find the degrees of freedom for (a) a goodness-of-fit test with 6 categories, and (b) an independence test using a $3\times4$ contingency table. (a) $df=6-1=5$. (b) $df=(3-1)(4-1)=2\times3=6$. A common error uses the SAME formula ($k-1$, the goodness-of-fit formula) for BOTH test types, applying it incorrectly to the contingency table case (e.g. computing $df=3\times4-1=11$ instead of the correct $(r-1)(c-1)=6$) — the independence test's degrees of freedom formula is genuinely different, reflecting the table's row-and-column structure, not simply "total cells minus one."

## Component 5 — Teaching Actions

### Teaching Action A01 — Squaring Each Difference and Dividing by Its Own Expected Value (Primitive P64: Conceptual Shift)

Work Example 1, explicitly computing each term of the sum separately before adding.

- **MC-1 hook**: check whether each term is correctly squared and divided by its own $E$ value.

### Teaching Action A02 — Goodness-of-Fit vs. Independence: Different Hypotheses, Different Data Structures (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the single-variable goodness-of-fit scenario against the two-variable independence scenario.

- **MC-2 hook**: this directly targets MC-2 (applying the wrong test type's method to a given scenario).

### Teaching Action A03 — Degrees of Freedom Formulas Differ by Test Type (reused procedure)

Work Example 3, explicitly applying the correct df formula for each test type separately.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. For observed $\{10,15,20,5\}$ and expected $\{12,12,12,12\}$, compute $\chi^2$.
  2. Determine which chi-squared test type applies: testing whether voter preference (candidate A/B/C) is related to age group (young/middle/senior).
  3. Find the degrees of freedom for a goodness-of-fit test with 5 categories.
  4. Find the degrees of freedom for an independence test using a $4\times2$ contingency table.
- **P76 (Transfer Probe, mode = independence)**: "A market researcher surveys 500 customers, recording both their preferred beverage type (coffee/tea/soda/water) AND which of 2 store locations they shopped at, wanting to know whether beverage preference is associated with store location. (a) Identify which chi-squared test type (goodness-of-fit or independence) applies, and explain why. (b) Determine the correct degrees of freedom for this $4\times2$ contingency table analysis."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CHI-SQUARED-STATISTIC-COMPUTED-WITHOUT-SQUARING-OR-DIVIDING-EACH-TERM-CORRECTLY | Computing the chi-squared statistic without squaring each (O-E) difference or without dividing each term by its own expected frequency | Foundational |
| MC-2 | GOODNESS-OF-FIT-METHOD-APPLIED-TO-A-GENUINELY-TWO-VARIABLE-INDEPENDENCE-SCENARIO | Applying the single-variable goodness-of-fit computation method to a scenario that genuinely involves two categorical variables requiring an independence test | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Chi-Squared Statistic Computed Without Squaring or Dividing Each Term Correctly") → P41 (detect: present Example 1 and check whether each term is correctly squared and divided) → P64 (conceptual shift: re-compute each term of the sum explicitly, one category at a time).
- **B02 (targets MC-2)**: P27 ("Goodness-of-Fit Method Applied to a Genuinely Two-Variable Independence Scenario") → P41 (detect: present Example 2's independence scenario and check whether the goodness-of-fit method is (incorrectly) applied) → P64 (conceptual shift: re-count the number of variables involved, constructing a contingency table if genuinely two variables are present).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.hypothesis-testing`, `math.prob.continuous-distributions`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.stats.anova`.

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects the genuine breadth of learning two distinct test structures plus their differing degrees-of-freedom formulas.
- Both misconceptions were ranked Foundational because each produces a numerically wrong statistic or fundamentally misapplies the wrong test structure to the data.
- The beverage-preference-by-store-location transfer probe was deliberately chosen because a genuine two-categorical-variable association question is a realistic, common independence-test scenario in market research.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
