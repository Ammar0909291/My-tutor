# Teaching Blueprint: Standard Error (`math.stats.standard-error`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.standard-error` |
| name | Standard Error |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.stats.sampling-distribution` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | SE(X̄) = σ/√n (known σ) or s/√n (estimated from sample). Measures variability of the sample statistic. Decreases as n increases. SE is the standard deviation of the sampling distribution.

 |

## Component 1 — Learning Objectives

- LO1: Compute the standard error of the mean $SE(\bar{X})=\frac{\sigma}{\sqrt{n}}$ (using the known population standard deviation $\sigma$) or $\frac{s}{\sqrt{n}}$ (using the SAMPLE standard deviation $s$, when $\sigma$ is unknown) — and recognize the standard error is fundamentally a SAMPLE SIZE-adjusted version of the standard deviation.
- LO2: Recognize the standard error DECREASES as $n$ increases — specifically, since $n$ appears under a SQUARE ROOT in the denominator, QUADRUPLING $n$ only HALVES the standard error (NOT reducing it to a quarter) — a common miscalculation of the relationship's scaling.
- LO3: Recognize the standard error IS, by definition, the STANDARD DEVIATION of the SAMPLING DISTRIBUTION (from `math.stats.sampling-distribution`) — it measures how much the SAMPLE MEAN itself would vary across repeated samples, a fundamentally DIFFERENT quantity from the standard deviation of the raw DATA within one single sample.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.sampling-distribution` — the standard error IS this distribution's standard deviation.

## Component 3 — Core Explanation

The **standard error** of the sample mean is $SE(\bar{X})=\frac{\sigma}{\sqrt{n}}$ (if the population standard deviation $\sigma$ is known) or $\frac{s}{\sqrt{n}}$ (using the sample standard deviation $s$ as an estimate, when $\sigma$ is unknown, the more common practical case). It measures how much the SAMPLE MEAN would VARY if you repeatedly drew new samples of size $n$ from the same population.

A key scaling relationship: since $n$ appears under a SQUARE ROOT in the denominator, the standard error DECREASES as $n$ increases, but NOT proportionally — QUADRUPLING the sample size only HALVES the standard error (since $\sqrt{4n}=2\sqrt{n}$), it does NOT reduce it to one-quarter; to HALVE the standard error again would require quadrupling $n$ once MORE.

Crucially, the standard error IS, by definition, the STANDARD DEVIATION of the SAMPLING DISTRIBUTION of $\bar{X}$ (from `math.stats.sampling-distribution`) — it describes variability of the SAMPLE MEAN across many hypothetical repeated samples, a fundamentally DIFFERENT quantity from the standard deviation of the raw data WITHIN one single sample (which describes how spread out the individual data points are, not how the sample mean itself would vary).

## Component 4 — Worked Examples

**Example 1 (LO1 — basic computation, breaking MC-1)**: Compute the standard error for a sample of size $n=25$ with sample standard deviation $s=10$. $SE=\frac{10}{\sqrt{25}}=\frac{10}{5}=2$. A common error uses the FORMULA for the ordinary sample standard deviation itself (just reporting $s=10$ directly, or dividing by $n$ instead of $\sqrt{n}$) — the standard error specifically requires dividing by the SQUARE ROOT of $n$, a genuinely different computation from either the raw standard deviation or a simple average.

**Example 2 (LO2 — quadrupling n, breaking MC-2)**: If $SE=4$ for $n=16$, find the new standard error if the sample size is increased to $n=64$ (QUADRUPLED). Since $\sqrt{64}=2\sqrt{16}$ (i.e., $\sqrt{n}$ DOUBLES when $n$ quadruples), the new $SE=\frac{4}{2}=2$ — HALVED, not reduced to a quarter. A common error assumes quadrupling the sample size should QUARTER the standard error (treating the relationship as directly proportional to $n$ rather than to $\sqrt{n}$) — because of the SQUARE ROOT in the formula, the standard error shrinks more SLOWLY than $n$ grows; achieving DIMINISHING returns as sample size increases.

**Example 3 (LO3 — standard error vs. sample standard deviation, breaking MC-3-merged)**: For a single sample of 100 exam scores with sample standard deviation $s=12$, distinguish between "the standard deviation of the scores" and "the standard error of the mean." The standard deviation ($s=12$) describes how SPREAD OUT the individual scores are within this one sample. The standard error ($\frac{12}{\sqrt{100}}=1.2$) describes how much the SAMPLE MEAN itself would vary if you repeated this sampling process many times — a much SMALLER number, reflecting that averages are more stable than individual data points. A common error uses these two terms (and their values) INTERCHANGEABLY, reporting the raw standard deviation when asked specifically for the standard error, or vice versa — they answer genuinely different questions (spread of individual data vs. variability of the sample mean across repeated sampling).

## Component 5 — Teaching Actions

### Teaching Action A01 — Dividing by the Square Root of n, Not n Itself (Primitive P64: Conceptual Shift)

Work Example 1, explicitly performing the square-root-of-$n$ division and contrasting with incorrect alternatives.

- **MC-1 hook**: check whether the square root of $n$ (not $n$ itself, and not the raw standard deviation alone) is used in the denominator.

### Teaching Action A02 — Quadrupling n Only Halves SE, Due to the Square Root (Primitive P06: Contrast Pair)

Work Example 2, explicitly deriving the halving relationship from the square-root scaling.

- **MC-2 hook**: this directly targets MC-2 (assuming the standard error scales directly, rather than via square root, with sample size).

### Teaching Action A03 — Standard Error and Sample Standard Deviation Answer Different Questions (Primitive P11: Representation Shift)

Work Example 3, explicitly distinguishing the two quantities' different meanings and typical magnitudes.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Compute the standard error for $n=36$, $s=18$.
  2. If $SE=6$ for $n=9$, find the new $SE$ if $n$ is increased to $36$ (quadrupled).
  3. Explain, in one sentence, why quadrupling the sample size only halves the standard error, rather than quartering it.
  4. Explain the difference between "the standard deviation of a sample's data" and "the standard error of the sample mean."
- **P76 (Transfer Probe, mode = independence)**: "A polling company wants to reduce its survey's margin of error (closely related to the standard error) by increasing the sample size, currently at $n=400$ respondents. (a) Explain why simply DOUBLING the number of respondents to $n=800$ would NOT halve the standard error, and estimate roughly how much larger $n$ would need to be to actually halve it. (b) Explain why the standard error, not the raw response variability itself, is the relevant quantity for describing how precisely the poll estimates the true population opinion."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | STANDARD-ERROR-COMPUTED-WITHOUT-DIVIDING-BY-SQUARE-ROOT-OF-N | Reporting the raw standard deviation, or dividing by n instead of the square root of n, when computing the standard error | Foundational |
| MC-2 | SAMPLE-SIZE-INCREASE-ASSUMED-TO-SCALE-STANDARD-ERROR-PROPORTIONALLY-RATHER-THAN-VIA-SQUARE-ROOT | Assuming the standard error scales directly (proportionally) with sample size changes, rather than via the square root relationship | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Standard Error Computed Without Dividing by Square Root of N") → P41 (detect: present Example 1 and check whether $\sqrt{n}$ is correctly used in the denominator) → P64 (conceptual shift: re-derive the formula explicitly, confirming the square root's role).
- **B02 (targets MC-2)**: P27 ("Sample Size Increase Assumed to Scale Standard Error Proportionally Rather Than via Square Root") → P41 (detect: present Example 2 and check whether the halving (not quartering) relationship is correctly derived) → P64 (conceptual shift: re-derive using $\sqrt{4n}=2\sqrt{n}$ explicitly, confirming the square-root scaling).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.sampling-distribution`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.stats.confidence-interval`.

## Component 8 — Teaching Notes

- estimated_hours = 3 and mastery_threshold = 0.85 reflect that while the formula is simple, its scaling behavior and its distinction from ordinary standard deviation are genuinely easy to misunderstand.
- Both misconceptions were ranked Foundational because each produces a numerically wrong value or a fundamentally incorrect scaling prediction with real practical consequences (e.g. underestimating sample size needs).
- The polling-margin-of-error transfer probe was deliberately chosen because diminishing returns from increasing sample size is a genuinely important, often counter-intuitive practical consideration in survey design and public opinion research.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.sampling-distribution`) |
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
