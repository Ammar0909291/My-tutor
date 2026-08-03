# Teaching Blueprint: p-value (`math.stats.p-value`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.p-value` |
| name | p-value |
| domain | Statistics |
| difficulty | proficient |
| bloom | evaluate |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.stats.test-statistic` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | P(test statistic ≥ observed | H₀). Small p-value is evidence against H₀; reject when p<α (significance level). The p-value is NOT P(H₀ is true) — that is a Bayesian quantity.

 |

## Component 1 — Learning Objectives

- LO1: Define the $p$-value as $P(\text{test statistic}\ge\text{observed}\mid H_0)$ — the PROBABILITY, ASSUMING $H_0$ IS TRUE, of observing a test statistic AT LEAST AS EXTREME as the one actually observed.
- LO2: Apply the DECISION rule: reject $H_0$ when $p<\alpha$ (the pre-chosen significance level) — and recognize a SMALL $p$-value is evidence AGAINST $H_0$ (the observed data would be surprising if $H_0$ were true), while a LARGE $p$-value means the data is NOT surprising under $H_0$ (but does NOT prove $H_0$ true).
- LO3: Recognize the single most important MISINTERPRETATION to avoid: the $p$-value is NOT $P(H_0\text{ is true})$ — these are FUNDAMENTALLY different quantities (the $p$-value is a probability about the DATA, computed ASSUMING $H_0$; $P(H_0\text{ true})$ would require a BAYESIAN framework with a prior probability on $H_0$, which frequentist hypothesis testing doesn't provide).

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.test-statistic` — the $p$-value is computed directly from the test statistic's position in its null distribution.

## Component 3 — Core Explanation

The **$p$-value** is $P(\text{test statistic}\ge\text{observed value}\mid H_0)$ — the probability, ASSUMING the null hypothesis $H_0$ is TRUE, of observing a test statistic AS EXTREME OR MORE EXTREME than the one actually computed from the data.

The standard DECISION rule: reject $H_0$ when $p<\alpha$ (the pre-specified significance level, commonly 0.05). A SMALL $p$-value means the observed data would be quite SURPRISING if $H_0$ were really true — constituting evidence AGAINST $H_0$. A LARGE $p$-value means the observed data is entirely CONSISTENT with (not surprising under) $H_0$ — but this does NOT PROVE $H_0$ is true, only that there's insufficient evidence against it (echoing the general logic of hypothesis testing).

The single most CRITICAL misinterpretation to avoid: the $p$-value is NOT the probability that $H_0$ is TRUE, i.e. $p\ne P(H_0\text{ true})$. These are fundamentally DIFFERENT quantities: the $p$-value is computed ASSUMING $H_0$ is true (a probability statement about the DATA, conditional on $H_0$); $P(H_0\text{ true})$ would require assigning a PRIOR probability to $H_0$ itself and updating it via Bayes' theorem — a genuinely BAYESIAN concept (`math.stats.bayesian-inference`), which the frequentist $p$-value framework simply does not compute or provide.

## Component 4 — Worked Examples

**Example 1 (LO1 — the correct definition, breaking MC-1)**: A test yields $p=0.03$. State precisely what this value represents. It represents: "ASSUMING $H_0$ is true, the probability of observing a test statistic at least as extreme as the one actually observed is 0.03" — a conditional probability about the DATA, given $H_0$. A common error states the $p$-value as "the probability that $H_0$ is true is 0.03" — this REVERSES the conditioning entirely; the $p$-value conditions ON $H_0$ being true (computing something about the data), while this incorrect interpretation would require conditioning on the DATA to compute something about $H_0$ — an entirely different (Bayesian) calculation the $p$-value simply doesn't perform.

**Example 2 (LO2 — the decision rule, breaking MC-2)**: For $p=0.08$ and $\alpha=0.05$, state the decision. Since $0.08>0.05$ (i.e., $p\ge\alpha$), FAIL TO REJECT $H_0$ — this does NOT mean $H_0$ is proven true, only that this data doesn't provide sufficiently strong evidence against it at the chosen significance level. A common error interprets "fail to reject $H_0$" as "$H_0$ is confirmed true" or "there is no effect" — the correct, more cautious interpretation is simply that the evidence against $H_0$ wasn't strong enough to cross the pre-chosen threshold, leaving genuine uncertainty rather than confirmed truth.

**Example 3 (LO3 — the critical misinterpretation, contrasted explicitly)**: Explain why "there's a 3% chance the null hypothesis is true" is a WRONG interpretation of $p=0.03$, and state the CORRECT interpretation instead. WRONG: "there's a 3% chance $H_0$ is true" (this treats the $p$-value as a probability ABOUT $H_0$, which frequentist statistics doesn't compute). CORRECT: "IF $H_0$ were true, there would be only a 3% chance of observing data this extreme (or more extreme)" — the $p$-value is a statement about how SURPRISING the DATA would be under $H_0$, never a direct probability statement about $H_0$ itself.

## Component 5 — Teaching Actions

### Teaching Action A01 — Stating the p-value's Precise Conditional Definition (Primitive P64: Conceptual Shift)

Work Example 1, explicitly stating the conditional-probability structure of the definition.

- **MC-1 hook**: check whether the p-value's definition is correctly stated as a probability about the data, conditional on $H_0$.

### Teaching Action A02 — Failing to Reject Never Proves H₀ True (reused procedure)

Work Example 2, explicitly emphasizing the cautious, non-confirmatory interpretation of a large p-value.

### Teaching Action A03 — The p-value Is Never P(H₀ is true): Correct vs. Incorrect Interpretation (Primitive P06: Contrast Pair)

Work Example 3, explicitly contrasting the wrong (Bayesian-flavored) interpretation against the correct frequentist one.

- **MC-2 hook**: this directly targets MC-2 (interpreting the p-value as the probability that H₀ is true).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. State the precise definition of a p-value in your own words.
  2. For $p=0.12$ and $\alpha=0.05$, state the decision and explain what conclusion is (and is not) justified.
  3. Explain why "the p-value is the probability that $H_0$ is true" is an incorrect interpretation.
  4. For $p=0.001$, explain what this indicates about the evidence against $H_0$.
- **P76 (Transfer Probe, mode = independence)**: "A news article reports on a medical study with the headline: 'Study finds only 2% chance the new drug doesn't work (p=0.02).' (a) Explain why this headline misrepresents what a p-value of 0.02 actually means. (b) Write a corrected, statistically accurate one-sentence description of what $p=0.02$ actually indicates about the study's evidence."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | P-VALUE-DEFINITION-CONDITIONING-REVERSED | Stating the p-value's definition with the conditioning reversed (as a probability about H0 given the data, rather than a probability about the data given H0) | Foundational |
| MC-2 | P-VALUE-INTERPRETED-AS-THE-PROBABILITY-THAT-H0-IS-TRUE | Interpreting the p-value as directly equal to the probability that the null hypothesis is true, conflating a frequentist quantity with a Bayesian one | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("P-Value Definition Conditioning Reversed") → P41 (detect: present Example 1 and check whether the conditioning direction is stated correctly) → P64 (conceptual shift: re-state the definition explicitly, emphasizing the probability is computed ASSUMING $H_0$ true, about the data).
- **B02 (targets MC-2)**: P27 ("P-Value Interpreted as the Probability That H0 Is True") → P41 (detect: present Example 3 and check whether the incorrect Bayesian-flavored interpretation is (mistakenly) used) → P64 (conceptual shift: re-contrast the correct and incorrect interpretations explicitly side by side).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.test-statistic`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.stats.type-errors`.
- **Parent**: `math.stats.hypothesis-testing`.

## Component 8 — Teaching Notes

- bloom = evaluate and mastery_threshold = 0.85 reflect that correctly interpreting (not just computing) the p-value is one of the most consequential skills in all of applied statistics.
- Both misconceptions were ranked Foundational because each reflects the single most common and most consequential real-world statistical misinterpretation, found even in published research and journalism.
- The misleading-news-headline transfer probe was deliberately chosen because p-value misinterpretation in science journalism and public communication is a genuinely widespread, real-world problem, giving this correction immediate practical relevance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.test-statistic`) |
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
