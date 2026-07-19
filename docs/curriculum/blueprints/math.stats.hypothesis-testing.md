# Teaching Blueprint: Hypothesis Testing (`math.stats.hypothesis-testing`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.hypothesis-testing` |
| name | Hypothesis Testing |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.stats.sampling-distribution`, `math.prob.conditional-probability` |
| unlocks | (none — terminal node in the current KG) |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — the sampling distribution's bell curve with a shaded tail before the formal decision procedure |
| description (KG) | Formal procedure to decide between H₀ (null) and H₁ (alternative). Steps: state hypotheses, collect data, compute test statistic, find p-value or compare to critical region, make decision. Foundation of frequentist inference. |

## Component 1 — Learning Objectives

- LO1: State the five-step hypothesis-testing procedure — (i) state $H_0$ (null hypothesis) and $H_1$ (alternative hypothesis), (ii) collect data, (iii) compute a test statistic, (iv) find the **p-value** (or compare to a critical region), (v) make a decision — and correctly formulate $H_0$/$H_1$ for a given research question.
- LO2: Correctly interpret the **p-value** as "the probability of observing data at least as extreme as what was observed, ASSUMING $H_0$ is true" — and explicitly reject the common misinterpretation that the p-value is "the probability $H_0$ is true" (a fundamentally different, and generally uncomputable-this-way, quantity).
- LO3: Distinguish **Type I error** (rejecting $H_0$ when it's actually true — a "false positive," controlled by the significance level $\alpha$) from **Type II error** (failing to reject $H_0$ when it's actually false — a "false negative"), and explain the inherent trade-off between them.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.sampling-distribution` (the distribution of a sample statistic like $\bar X$ across repeated samples, and the standard error $\sigma/\sqrt n$) and `math.prob.conditional-probability` (the notation $P(A|B)$, needed to correctly parse the p-value's precise conditional meaning).

## Component 3 — Core Explanation

**Hypothesis testing** is a formal decision procedure with five steps:
1. **State hypotheses**: $H_0$ (the **null hypothesis** — typically "no effect" or "no difference," the default assumption) and $H_1$ (the **alternative hypothesis** — what you'd conclude if the evidence is strong enough against $H_0$).
2. **Collect data** (a sample).
3. **Compute a test statistic** (a standardized measure of how far the sample result is from what $H_0$ predicts).
4. **Find the p-value** (or, equivalently, compare the test statistic to a critical region/threshold).
5. **Make a decision**: reject $H_0$ (if the p-value is small enough, below a chosen significance level $\alpha$, typically 0.05) or fail to reject $H_0$ (otherwise).

**The p-value's precise meaning**: the p-value is $P(\text{data at least as extreme as observed} \mid H_0 \text{ is true})$ — a CONDITIONAL probability, computed by ASSUMING $H_0$ is true and asking how likely (or unlikely) the actually-observed data would be under that assumption. A small p-value means the observed data would be surprising if $H_0$ were true — evidence AGAINST $H_0$.

**Two types of error**:
- **Type I error**: rejecting $H_0$ when it's actually TRUE (a false positive) — its probability is controlled directly by the chosen significance level $\alpha$.
- **Type II error**: failing to reject $H_0$ when it's actually FALSE (a false negative) — its probability (denoted $\beta$) depends on the true effect size, sample size, and $\alpha$ itself.
There is an inherent **trade-off**: lowering $\alpha$ (making it harder to reject $H_0$, reducing Type I error risk) generally INCREASES the Type II error risk (making it easier to miss a real effect), all else being equal.

## Component 4 — Worked Examples

**Example 1 (LO1 — formulating hypotheses and the five steps)**: A company claims its new website design increases average time-on-page from the current 45 seconds. $H_0: \mu=45$ (no change), $H_1: \mu>45$ (increase). Collect a sample of 100 visitors, find $\bar x=48$ seconds with sample standard deviation $s=15$. Compute the test statistic (a $z$-score using the sampling distribution's standard error): $z = \frac{48-45}{15/\sqrt{100}} = \frac{3}{1.5}=2$. Find the p-value: $P(Z\geq2)\approx0.023$. Decision: since $0.023<0.05$ (the chosen $\alpha$), reject $H_0$ — evidence supports the new design increasing time-on-page.

**Example 2 (LO2 — the precise p-value interpretation, breaking MC-1)**: For Example 1's p-value of 0.023: the CORRECT interpretation is "if the true average time-on-page really were 45 seconds (i.e., if $H_0$ were true), there would only be a 2.3% chance of observing a sample mean this high (48 or more) purely by random sampling variation." The INCORRECT interpretation: "there's a 2.3% chance that $H_0$ (the null hypothesis) is true" — this reverses the conditional entirely; the p-value assumes $H_0$ throughout its computation, so it cannot simultaneously be a statement about the PROBABILITY of $H_0$ itself.

**Example 3 (LO3 — Type I vs. Type II error trade-off)**: A medical test for a disease uses hypothesis testing: $H_0$="patient does not have the disease," $H_1$="patient has the disease." A Type I error here means concluding a healthy patient has the disease (false positive — unnecessary worry/treatment). A Type II error means concluding a sick patient does NOT have the disease (false negative — a missed diagnosis, potentially far more costly). Lowering the significance threshold $\alpha$ (requiring stronger evidence to declare "has the disease") reduces false positives but INCREASES the risk of missing genuinely sick patients (more Type II errors) — illustrating the trade-off concretely, and why the "acceptable" balance depends on the relative real-world costs of each error type.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Five-Step Procedure and the P-Value's Meaning (Primitive P11: Representation Shift)

Start pictorial: draw the sampling distribution of $\bar X$ under $H_0$ as a bell curve centered at the hypothesized $\mu$, shading the tail region beyond the observed sample statistic. State: "the p-value is exactly the shaded area — how much of this ASSUMING-$H_0$-TRUE distribution lies as far out (or farther) than what you actually observed." Work Example 1's full five-step procedure explicitly.

Shift representation to the precise conditional-probability statement: $p = P(\text{data this extreme}\mid H_0)$, connecting directly back to `math.prob.conditional-probability`'s notation and meaning.

- **MC-1 hook**: after computing Example 1's p-value of 0.023, ask "does this mean there's a 2.3% chance the null hypothesis is true?" — a "yes" answer reveals MC-1 (the single most pervasive statistical misinterpretation: reversing the p-value's conditional direction).

### Teaching Action A02 — Correcting the P-Value Misinterpretation, and the Error Trade-off (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place the CORRECT interpretation ("probability of this data, GIVEN $H_0$ true") directly beside the INCORRECT one ("probability $H_0$ is true, GIVEN this data") — state explicitly: "these are two DIFFERENT conditional probabilities, $P(\text{data}|H_0)$ versus $P(H_0|\text{data})$ — confusing them is exactly the kind of reversed-conditional error your `math.prob.conditional-probability` lesson already warned generalizes to (recall that $P(A|B)\neq P(B|A)$ in general); the p-value computation NEVER tells you $P(H_0|\text{data})$ directly."

**Contrast 2**: Work Example 3's medical-test scenario, explicitly naming which error is Type I (false positive) and which is Type II (false negative), and discussing how tightening $\alpha$ shifts the trade-off in one direction. State: "there is no way to simultaneously minimize BOTH error types by adjusting $\alpha$ alone — reducing one generally increases the other, all else equal; only genuinely MORE DATA (a larger sample) can improve both simultaneously."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A factory claims its light bulbs last 1000 hours on average. State appropriate $H_0$ and $H_1$ for testing whether the TRUE average is actually LESS than claimed.
  2. A hypothesis test yields a p-value of 0.08, with $\alpha=0.05$. State the decision (reject or fail to reject $H_0$), and explain what the p-value of 0.08 actually means in terms of the data and $H_0$.
  3. Explain precisely why "there's an 8% chance $H_0$ is true" is NOT the correct interpretation of a p-value of 0.08.
  4. A quality-control test for airplane parts has $H_0$="part is safe," $H_1$="part is defective." Describe, in context, what a Type I error and a Type II error would each mean here, and explain which error type would typically be considered more costly in this specific setting.
- **P76 (Transfer Probe, mode = independence)**: "A pharmaceutical company runs a clinical trial testing whether a new drug lowers blood pressure more than a placebo, with $H_0$: no difference, $H_1$: drug lowers blood pressure more. The trial yields a p-value of 0.03. (a) Using this lesson's precise definition, state exactly what this p-value of 0.03 represents (in terms of $H_0$ and the observed data), and what decision follows at the standard $\alpha=0.05$ threshold. (b) A news headline reports 'Scientists 97% certain the new drug works!' — using this lesson's p-value/probability-of-$H_0$ distinction, explain precisely what is wrong with this headline's interpretation of the 0.03 result. (c) The company later worries about approving a drug that doesn't actually work (a costly, reputation-damaging Type I error) versus rejecting a drug that actually does work (a Type II error, a missed medical opportunity) — explain how the company might justify choosing a STRICTER significance level (e.g. $\alpha=0.01$ instead of 0.05) for this specific decision, using this lesson's error trade-off."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | P-VALUE-INTERPRETED-AS-PROBABILITY-H0-TRUE | Believing the p-value directly gives the probability that the null hypothesis is true, reversing the conditional direction of what the p-value actually computes | Foundational |
| MC-2 | FAIL-TO-REJECT-INTERPRETED-AS-PROVING-H0 | Believing "fail to reject $H_0$" means $H_0$ has been PROVEN true, rather than recognizing it only means insufficient evidence was found to reject it (absence of evidence is not evidence of absence) | Foundational |
| MC-3 | TYPE-I-AND-TYPE-II-ERROR-CONFLATED | Confusing which error (Type I vs. Type II) corresponds to which mistake (false positive vs. false negative), or believing reducing one automatically reduces the other | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "P-Value as Probability-of-H0 Misinterpretation") → P41 (detect: ask what a p-value of 0.03 "means" directly, checking for a "probability $H_0$ is true" answer) → P64 (conceptual shift: re-anchor on the precise conditional — the p-value is computed BY ASSUMING $H_0$, so it cannot simultaneously report $H_0$'s own probability; connect explicitly to the general $P(A|B)\neq P(B|A)$ lesson from conditional probability).
- **B02 (targets MC-2)**: P27 (name it: "Fail-to-Reject as Proof") → P41 (detect: ask what "fail to reject $H_0$" concludes about $H_0$'s truth) → P64 (conceptual shift: re-anchor on "failing to find enough evidence against $H_0$ is not the same as proving $H_0$ — it just means this particular test, with this sample size, didn't detect a difference strongly enough to reject").
- **B03 (targets MC-3)**: P27 (name it: "Type I/Type II Confusion") → P41 (detect: present the medical-test scenario and ask the student to correctly label which error is which) → P64 (conceptual shift: re-derive using the concrete scenario — Type I = wrongly rejecting a TRUE $H_0$ (false alarm); Type II = wrongly failing to reject a FALSE $H_0$ (missed detection) — anchor each to its real-world consequence).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.sampling-distribution` (the distribution of $\bar X$ under repeated sampling, needed to compute the test statistic and p-value), `math.prob.conditional-probability` (the $P(A|B)$ notation and meaning this concept's entire p-value interpretation depends on getting right).
- **Unlocks**: none — this is a terminal node in the current Mathematics Knowledge Graph (no further concepts build on it as a prerequisite).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/apply tag places this at the "2 main TAs + gate" tier — A01 (the five-step procedure and the p-value's precise conditional meaning) and A02 (correcting the p-value misinterpretation plus the Type I/Type II trade-off) jointly cover all three LOs.
- MC-1 (p-value interpreted as probability H0 is true) was made this blueprint's central focus — appearing in A01's hook, the entirety of A02 Contrast 1, and every part of the transfer probe — because it is widely documented as the single most common and consequential misunderstanding in applied statistics, actively contributing to real-world reproducibility problems in scientific research; this blueprint deliberately connects the correction directly back to `math.prob.conditional-probability`'s own general $P(A|B)\neq P(B|A)$ lesson, treating this as a specific, high-stakes instance of a general reasoning error already flagged in that prerequisite.
- The transfer probe's part (b) (correcting a news headline's misinterpretation) was deliberately chosen because p-value misreporting in science journalism is a genuine, common, real-world occurrence — giving the correction immediate, recognizable stakes rather than an abstract classroom exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (none — terminal node, correctly empty) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: sampling-distribution curve with shaded tail) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
