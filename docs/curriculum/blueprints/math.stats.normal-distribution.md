# Teaching Blueprint: Normal Distribution (Statistics) (`math.stats.normal-distribution`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.normal-distribution` |
| name | Normal Distribution (Statistics) |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.prob.normal-distribution`, `math.stats.descriptive-statistics` |
| unlocks | (none in KG) |
| cross_links | `math.prob.normal-distribution` |
| CPA_entry_stage | P (Pictorial) — bell curve with marked standard deviation bands |
| description (KG) | The N(μ,σ²) distribution underpins most parametric tests. Assessed by Q-Q plots, Shapiro-Wilk test. 68-95-99.7 rule. Sample mean from any distribution is approximately normal for large n (CLT).

 |

## Component 1 — Learning Objectives

- LO1: Apply the 68-95-99.7 RULE — approximately 68% of a normal distribution's data falls within 1 STANDARD DEVIATION of the mean, 95% within 2, and 99.7% within 3 — as a quick, memorized reference for normal-distribution proportions.
- LO2: Recognize methods for ASSESSING normality — Q-Q plots (visually check whether data points follow a straight diagonal line) and the Shapiro-Wilk test (a formal hypothesis test, $H_0$: data IS normally distributed) — and recognize a Shapiro-Wilk test that FAILS TO REJECT $H_0$ does NOT prove normality, only that there's insufficient evidence AGAINST it (a subtle but important distinction, echoing hypothesis-testing's general logic).
- LO3: Recognize the Central Limit Theorem's role: the SAMPLE MEAN from ANY underlying distribution (not just normal populations) becomes APPROXIMATELY normal for LARGE $n$ — this is why normal-distribution-based methods remain broadly useful even when the RAW data itself isn't normal, as long as sample sizes are reasonably large.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.normal-distribution` (the mathematical distribution itself) and `math.stats.descriptive-statistics` (the broader statistical context this distribution underpins).

## Component 3 — Core Explanation

The **Normal (Gaussian) distribution** $N(\mu,\sigma^2)$ underpins most classical PARAMETRIC statistical tests. The **68-95-99.7 rule** gives a quick reference for its proportions: approximately 68% of data falls within 1 STANDARD DEVIATION of the mean, 95% within 2, and 99.7% within 3.

Assessing whether real data is APPROXIMATELY normal uses tools like the **Q-Q plot** (plotting the data's quantiles against theoretical normal quantiles — a genuinely normal dataset produces points closely following a straight diagonal line) and the **Shapiro-Wilk test** (a formal hypothesis test with $H_0$: "the data IS normally distributed"). Crucially, FAILING TO REJECT $H_0$ in a Shapiro-Wilk test does NOT prove the data is normal — it only means there's insufficient EVIDENCE against normality in this particular sample (the same "absence of evidence isn't evidence of absence" logic that applies to all hypothesis tests).

The **Central Limit Theorem (CLT)** explains why normal-based methods remain useful even for non-normal raw data: the SAMPLE MEAN, drawn from ANY underlying population distribution (not just already-normal ones), becomes APPROXIMATELY normally distributed for sufficiently LARGE sample sizes $n$ — this is precisely why t-tests, confidence intervals for means, and similar tools work reasonably well in practice even when individual data points clearly aren't normally distributed.

## Component 4 — Worked Examples

**Example 1 (LO1 — applying the 68-95-99.7 rule, breaking MC-1)**: For a normal distribution with $\mu=100$, $\sigma=15$, find the range containing approximately 95% of the data. $100\pm2(15)=100\pm30$, i.e. $(70,130)$. A common error uses 1 standard deviation for the "95%" figure (confusing which percentage goes with which number of standard deviations, e.g. computing $100\pm15=(85,115)$ and calling this the 95% range) — the specific PAIRING (68%↔1SD, 95%↔2SD, 99.7%↔3SD) must be applied correctly, not interchanged.

**Example 2 (LO2 — Shapiro-Wilk's logic, breaking MC-2)**: A Shapiro-Wilk test on a dataset produces a $p$-value of $0.3$ (failing to reject $H_0$: "data is normal," at $\alpha=0.05$). Explain what conclusion is and is NOT justified. It is JUSTIFIED to say "there is insufficient evidence to conclude the data is NOT normal." It is NOT justified to say "the data IS PROVEN normal" or "the data is definitely normal" — a failed rejection never proves the null hypothesis true, only that this particular sample didn't provide strong enough evidence against it. A common error interprets a non-significant Shapiro-Wilk result as definitive PROOF of normality, rather than correctly recognizing it as merely a lack of contrary evidence (the same logical caution that applies to failing to reject any null hypothesis).

**Example 3 (LO3 — CLT justifying normal methods for non-normal data)**: A researcher has raw data from a clearly SKEWED (non-normal) population, but a LARGE sample size ($n=500$). Explain why methods relying on the sample mean's normality (like a $t$-test) can still be reasonably trusted here. By the Central Limit Theorem, the SAMPLE MEAN's OWN sampling distribution becomes approximately normal for large $n$, REGARDLESS of the underlying population's shape — so even though the raw individual data points are skewed, the $t$-test (which relies on the sample mean's behavior, not the raw data's individual distribution) remains reasonably valid here, thanks to the large sample size.

## Component 5 — Teaching Actions

### Teaching Action A01 — Correctly Pairing Percentages to Standard Deviation Counts (Primitive P64: Conceptual Shift)

Work Example 1, explicitly reviewing the 68-95-99.7 pairing before applying it.

- **MC-1 hook**: check whether the correct percentage-to-standard-deviation pairing is used.

### Teaching Action A02 — Failing to Reject Normality Doesn't Prove Normality (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the justified ("insufficient evidence against") conclusion with the unjustified ("proven normal") one.

- **MC-2 hook**: this directly targets MC-2 (treating a non-significant Shapiro-Wilk result as proof of normality).

### Teaching Action A03 — CLT Justifies Normal-Based Methods for Large Samples from Non-Normal Populations (reused procedure)

Present Example 3, connecting the CLT's role to practical test validity.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. For a normal distribution with $\mu=50$, $\sigma=8$, find the range containing approximately 68% of the data.
  2. For a normal distribution with $\mu=200$, $\sigma=10$, find the range containing approximately 99.7% of the data.
  3. A Shapiro-Wilk test yields $p=0.6$. State what conclusion is and is not justified.
  4. Explain why the Central Limit Theorem justifies using t-tests even on data from a non-normal population, given a large enough sample size.
- **P76 (Transfer Probe, mode = independence)**: "A factory's product weight measurements are known to be roughly normal with $\mu=500$g and $\sigma=5$g, and quality control flags any product outside the range covering 99.7% of expected weights as needing inspection. (a) Calculate this flagging range. (b) Separately, a quality engineer runs a Shapiro-Wilk test on a new batch's weight data and gets a non-significant result (fails to reject normality). Explain why this does NOT guarantee the batch's weights are truly normal, only that there's no strong evidence against it in this sample."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PERCENTAGE-TO-STANDARD-DEVIATION-PAIRING-CONFUSED-IN-THE-68-95-99-7-RULE | Confusing which percentage (68%, 95%, 99.7%) pairs with which number of standard deviations (1, 2, 3) | Foundational |
| MC-2 | FAILING-TO-REJECT-NORMALITY-TREATED-AS-PROOF-OF-NORMALITY | Treating a non-significant Shapiro-Wilk test result as definitive proof of normality, rather than recognizing it only means insufficient evidence against it | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Percentage to Standard Deviation Pairing Confused in the 68-95-99.7 Rule") → P41 (detect: present Example 1 and check whether the correct pairing is used) → P64 (conceptual shift: re-state the rule explicitly in order — 1SD=68%, 2SD=95%, 3SD=99.7% — before applying).
- **B02 (targets MC-2)**: P27 ("Failing to Reject Normality Treated as Proof of Normality") → P41 (detect: present Example 2 and check whether "proven normal" is (incorrectly) concluded) → P64 (conceptual shift: re-apply the general hypothesis-testing logic explicitly — failing to reject never proves the null hypothesis true).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.normal-distribution`, `math.stats.descriptive-statistics`.
- **Unlocks**: none recorded in the KG.
- **Cross-links**: `math.prob.normal-distribution`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.90 reflects that this is a foundational, heavily-relied-upon distribution underpinning most parametric methods.
- Both misconceptions were ranked Foundational because each produces a genuinely wrong numeric range or a fundamentally incorrect logical conclusion about the data.
- The factory-quality-control transfer probe was deliberately chosen because both the 68-95-99.7 rule and the normality-assessment caution have genuine, concrete quality-assurance applications.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.prob.normal-distribution`, `math.stats.descriptive-statistics`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (`math.prob.normal-distribution`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: bell curve with marked standard deviation bands) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
