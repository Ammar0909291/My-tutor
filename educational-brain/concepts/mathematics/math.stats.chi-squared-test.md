# math.stats.chi-squared-test

## Identity
- **KG id**: `math.stats.chi-squared-test`
- **Domain**: math.stats
- **Requires**: `math.stats.hypothesis-testing`, `math.prob.continuous-distributions`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Compute $\chi^2=\sum(O-E)^2/E$, squaring each difference and dividing by its OWN expected
frequency, NEVER summing $(O-E)$ directly or skipping a term's own $E$; distinguish
GOODNESS-OF-FIT (one variable versus a theoretical distribution) from INDEPENDENCE (two
categorical variables via a contingency table) — NEVER applying one test's method to the other's
scenario; and use the correct degrees-of-freedom formula for each — $k-1$ for goodness-of-fit,
$(r-1)(c-1)$ for independence — NEVER the same formula for both.

## Core Understanding
EACH TERM MUST BE SQUARED AND DIVIDED BY ITS OWN EXPECTED VALUE — NEVER SUMMED DIRECTLY: for
observed $O=\{18,22,25,15\}$, expected $E=\{20,20,20,20\}$: $\chi^2=(18-20)^2/20+(22-20)^2/20+
(25-20)^2/20+(15-20)^2/20=4/20+4/20+25/20+25/20=0.2+0.2+1.25+1.25=2.9$. Omitting the SQUARING (or
forgetting to divide by $E$ for EACH term separately) and computing $\sum(O-E)$ directly is WRONG
— that sum is zero by construction, an obviously invalid "statistic." Each term must be squared
and divided by its OWN category's expected frequency, then summed — never a shortcut.

GOODNESS-OF-FIT AND INDEPENDENCE ARE GENUINELY DIFFERENT TESTS — NEVER INTERCHANGEABLE METHODS:
testing whether a company's complaints are evenly distributed across 5 product categories is
GOODNESS-OF-FIT (one variable compared to a theoretical distribution); testing whether customer
satisfaction relates to which of 3 branches a customer visited is INDEPENDENCE (two variables,
checked via a contingency table). Applying the goodness-of-fit computation method (single-variable
counts versus a theoretical distribution) to a genuinely TWO-VARIABLE independence scenario is
WRONG — the two scenarios require genuinely different data structures and expected-frequency
computations, the latter derived from row/column totals, never the former's specified proportions.

DEGREES OF FREEDOM USE DIFFERENT FORMULAS BY TEST TYPE — NEVER THE SAME FORMULA FOR BOTH: for a
goodness-of-fit test with 6 categories: $df=6-1=5$. For an independence test with a $3\times4$
contingency table: $df=(3-1)(4-1)=2\times3=6$ — genuinely DIFFERENT from applying $k-1$ to the
total cell count (which would wrongly give $df=3\times4-1=11$). The independence test's
degrees-of-freedom formula reflects the table's ROW-AND-COLUMN structure, never simply "total
cells minus one" — using the wrong formula changes the critical value compared against,
potentially FLIPPING the decision.

## Mental Models
- **"Square each difference and divide by ITS OWN expected value before summing — never a
  shortcut sum of raw differences."**
- **"One variable against a theory is goodness-of-fit; two variables against each other is
  independence — never the same computation."**
- **"k−1 for goodness-of-fit; (r−1)(c−1) for independence — never one formula borrowed for the
  other."**

## Why Students Fail

### MC-1: CHI-SQUARED-STATISTIC-COMPUTED-WITHOUT-SQUARING-OR-DIVIDING-EACH-TERM-CORRECTLY
- **Surface form**: computes the chi-squared statistic without squaring each $(O-E)$ difference
  or without dividing each term by its own expected frequency.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-compute each term of the sum explicitly, one category at a time.

### MC-2: GOODNESS-OF-FIT-METHOD-APPLIED-TO-A-GENUINELY-TWO-VARIABLE-INDEPENDENCE-SCENARIO
- **Surface form**: applies the single-variable goodness-of-fit computation method to a scenario
  that genuinely involves two categorical variables requiring an independence test.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-count the number of variables involved, constructing a contingency table if
  genuinely two variables are present.

## Misconceptions

### MC-1: CHI-SQUARED-STATISTIC-COMPUTED-WITHOUT-SQUARING-OR-DIVIDING-EACH-TERM-CORRECTLY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: GOODNESS-OF-FIT-METHOD-APPLIED-TO-A-GENUINELY-TWO-VARIABLE-INDEPENDENCE-SCENARIO
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Summing (O−E) directly cancels itself out by design — like averaging deviations from a mean
  and expecting a nonzero answer; squaring first is what makes the statistic meaningful."**
- **Anti-analogy**: a two-variable association question isn't a "goodness-of-fit test with extra
  steps" — it's a genuinely different test, built on a contingency table, never the same
  single-variable machinery.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the term-by-term $\chi^2=2.9$ computation.
- **Demonstration 2 (targets MC-2)**: the product-category (goodness-of-fit) versus
  branch-and-satisfaction (independence) scenario contrast.
- **Demonstration 3**: the $k-1$ versus $(r-1)(c-1)$ degrees-of-freedom comparison.

## Discovery Questions
1. "Does summing (O−E) directly, without squaring, give a meaningful statistic?"
2. "Is a question about one variable's distribution the same kind of test as a question about
   whether two variables are related?"
3. "Does a goodness-of-fit test and an independence test use the same degrees-of-freedom
   formula?"

## Teaching Sequence
1. **Conceptual shift**: the term-by-term squared-and-divided computation, working Demonstration
   1, isolating MC-1.
2. **Contrast pair**: the goodness-of-fit-versus-independence scenario distinction, working
   Demonstration 2, isolating MC-2.
3. **Reused procedure**: the differing degrees-of-freedom formulas, working Demonstration 3.
4. **Mastery gate**: require a correct term-by-term $\chi^2$ computation, a correct test-type
   identification for a given scenario, and correct degrees-of-freedom computations for both test
   types, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the chi-squared statistic computed without squaring each term and dividing by its
  own expected value.
- Never accept the goodness-of-fit method applied to a genuinely two-variable independence
  scenario.
- Never accept the wrong degrees-of-freedom formula applied to either test type.

## Voice Teaching Notes
- Say "did you square that difference and divide by its own expected value before summing?"
  whenever a chi-squared statistic is computed.
- Ask "is this about one variable's distribution, or about whether two variables are related?"
  whenever a chi-squared test type is being identified.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a chi-squared statistic term by term.
- **Rung 2 (application)**: learner correctly identifies whether a scenario calls for a
  goodness-of-fit or independence test.
- **Rung 3 (transfer)**: learner correctly determines the degrees of freedom for a novel
  contingency-table independence scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute each term of the sum explicitly.
- If MC-2 recurs, re-count the number of variables involved and construct a contingency table if
  needed.

## Memory Hooks
- "Square and divide each term — never a raw sum of differences."
- "One variable versus a theory: goodness-of-fit. Two variables versus each other:
  independence — never the same test."
- "k−1 for goodness-of-fit, (r−1)(c−1) for independence — never swapped."

## Transfer Connections
- `math.stats.hypothesis-testing` (already authored, this campaign, Batch 201): supplies the
  general five-step framework the chi-squared test applies with its own specific test statistic.
- `math.prob.continuous-distributions` (already authored, certified domain): supplies the
  $\chi^2$ reference distribution the statistic is compared against.

## Cross-Subject Connections
- Market research: testing whether beverage preference is associated with store location is a
  standard, realistic independence-test scenario requiring a contingency table.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.chi-squared-test.md`, reused by
  reference for its term-by-term statistic computation, its goodness-of-fit-versus-independence
  scenario contrast, its degrees-of-freedom comparison, and its two-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a market researcher's
  beverage-preference-by-store-location survey, identifying the test type and computing the
  correct degrees of freedom.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.hypothesis-testing`/`math.prob.continuous-distributions`, unlocks none, cross_links
  none, proficient/apply, mastery_threshold 0.8, estimated_hours 5) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 210): authored. First entry this batch. Companion batch concept:
  `math.stats.covariance-matrix`.
