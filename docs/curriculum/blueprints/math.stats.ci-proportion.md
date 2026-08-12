# Teaching Blueprint: Confidence Interval for a Proportion (`math.stats.ci-proportion`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.ci-proportion` |
| name | Confidence Interval for a Proportion |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.stats.confidence-interval` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | p̂ ± z_{α/2}√(p̂(1−p̂)/n). Valid when np̂≥10 and n(1−p̂)≥10 (large sample condition). Uses normal approximation to binomial distribution.

 |

## Component 1 — Learning Objectives

- LO1: Construct the confidence interval for a proportion $\hat{p}\pm z_{\alpha/2}\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$, using the SAMPLE proportion $\hat{p}$ and its associated standard error formula.
- LO2: Verify the LARGE-SAMPLE CONDITION — $n\hat{p}\ge10$ AND $n(1-\hat{p})\ge10$ — BEFORE constructing the interval, recognizing this checks whether the NORMAL APPROXIMATION to the underlying binomial distribution is trustworthy; skipping this check risks an invalid interval when the sample is too small or the proportion too extreme.
- LO3: Recognize that BOTH conditions ($n\hat{p}\ge10$ AND $n(1-\hat{p})\ge10$) must hold TOGETHER — checking only one and assuming the other automatically follows is insufficient, since a very SKEWED $\hat{p}$ (close to 0 or 1) can satisfy one condition easily while badly failing the other.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.confidence-interval` — this is a specific application to proportions.

## Component 3 — Core Explanation

A **confidence interval for a proportion** estimates a population proportion $p$ using $\hat{p}\pm z_{\alpha/2}\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$, where $\hat{p}$ is the observed SAMPLE proportion. This formula relies on approximating the underlying BINOMIAL distribution with a NORMAL distribution — a genuinely valid approximation only under certain conditions.

The **large-sample condition** requires BOTH $n\hat{p}\ge10$ AND $n(1-\hat{p})\ge10$ — these check that there are ENOUGH expected "successes" ($n\hat{p}$) AND enough expected "failures" ($n(1-\hat{p})$) for the normal approximation to reasonably hold. Constructing the interval WITHOUT first verifying this condition risks an invalid (unreliable) interval, especially when $n$ is small or $\hat{p}$ is close to 0 or 1.

Crucially, BOTH conditions must hold SIMULTANEOUSLY — a very SKEWED sample proportion (e.g. $\hat{p}=0.02$, close to 0) can easily satisfy $n\hat{p}\ge10$ with a large enough $n$, while STILL leaving plenty of margin for $n(1-\hat{p})\ge10$ too (since $1-\hat{p}$ is close to 1) — but the REVERSE situation ($\hat{p}$ close to 1) or a genuinely small $n$ can cause ONE condition to pass while the OTHER fails, so checking only one is not sufficient; both must be verified independently.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic construction, breaking MC-1)**: Construct a 95% confidence interval for $p$, given $\hat{p}=0.6$, $n=100$. Using $z_{0.025}\approx1.96$: $0.6\pm1.96\sqrt{\frac{0.6(0.4)}{100}}=0.6\pm1.96\sqrt{0.0024}=0.6\pm1.96(0.049)=0.6\pm0.096$, giving $(0.504,0.696)$. A common error uses the WRONG variance formula inside the square root (e.g. using $\hat{p}^2$ instead of $\hat{p}(1-\hat{p})$, or forgetting to divide by $n$) — the formula's specific structure ($\hat{p}(1-\hat{p})/n$ under the square root) must be reproduced exactly.

**Example 2 (LO2, LO3 — checking BOTH large-sample conditions, breaking MC-2)**: Verify whether the large-sample condition holds for $\hat{p}=0.98$, $n=40$. Check $n\hat{p}=40(0.98)=39.2\ge10$ ✓. Check $n(1-\hat{p})=40(0.02)=0.8$ — this is NOT $\ge10$ ✗. Since ONE of the two conditions FAILS, the large-sample condition is NOT satisfied overall, and the normal-approximation-based interval would be UNRELIABLE here (a different method, like an exact binomial interval, would be needed instead). A common error checks ONLY the first condition ($n\hat{p}\ge10$, which passes easily here), concludes the large-sample condition is satisfied, and proceeds to construct the (invalid) interval anyway — BOTH conditions must be checked, and this example shows precisely how a highly skewed $\hat{p}$ can pass one condition while badly failing the other.

**Example 3 (LO1 — a well-behaved case)**: Construct a 90% confidence interval for $p$, given $\hat{p}=0.45$, $n=200$ (verify large-sample condition first: $n\hat{p}=90\ge10$ ✓, $n(1-\hat{p})=110\ge10$ ✓ — both hold). Using $z_{0.05}\approx1.645$: $0.45\pm1.645\sqrt{\frac{0.45(0.55)}{200}}\approx0.45\pm1.645(0.0352)\approx0.45\pm0.058$, giving $(0.392,0.508)$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Reproducing the p̂(1-p̂)/n Formula Exactly (Primitive P64: Conceptual Shift)

Work Example 1, explicitly building the standard error formula piece by piece.

- **MC-1 hook**: check whether the formula's specific structure is reproduced correctly, not approximated or mis-substituted.

### Teaching Action A02 — Checking Both Large-Sample Conditions Independently (Primitive P06: Contrast Pair)

Work Example 2, explicitly verifying BOTH conditions and showing how one can pass while the other fails.

- **MC-2 hook**: this directly targets MC-2 (checking only one of the two required large-sample conditions).

### Teaching Action A03 — A Well-Behaved Case Satisfying Both Conditions (reused procedure)

Work Example 3, demonstrating the standard, unproblematic application when both conditions hold.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Construct a 95% confidence interval for $p$, given $\hat{p}=0.3$, $n=150$.
  2. Verify whether the large-sample condition holds for $\hat{p}=0.05$, $n=100$, checking both parts.
  3. Verify whether the large-sample condition holds for $\hat{p}=0.5$, $n=15$, checking both parts.
  4. Explain, in one sentence, why both n×p̂≥10 and n×(1-p̂)≥10 must be checked, rather than just one.
- **P76 (Transfer Probe, mode = independence)**: "A marketing analyst surveys 50 customers and finds that only 2 of them (4%) reported being aware of a new product. The analyst wants to construct a 95% confidence interval for the true awareness proportion. (a) Check whether the large-sample condition holds for this data, verifying both parts explicitly. (b) Explain what the analyst should do if the condition fails, rather than constructing the standard normal-approximation interval anyway."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | STANDARD-ERROR-FORMULA-FOR-PROPORTION-MISCONSTRUCTED | Using an incorrect variance/standard error formula (e.g. p̂² instead of p̂(1-p̂), or omitting division by n) when constructing the confidence interval | Foundational |
| MC-2 | ONLY-ONE-LARGE-SAMPLE-CONDITION-CHECKED-INSTEAD-OF-BOTH | Verifying only one of the two required large-sample conditions (n×p̂≥10 or n×(1-p̂)≥10), rather than checking both independently | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Standard Error Formula for Proportion Misconstructed") → P41 (detect: present Example 1 and check whether the formula's structure is reproduced correctly) → P64 (conceptual shift: re-build the formula piece by piece, confirming $\hat{p}(1-\hat{p})$ divided by $n$, under a square root).
- **B02 (targets MC-2)**: P27 ("Only One Large-Sample Condition Checked Instead of Both") → P41 (detect: present Example 2 and check whether both conditions are verified) → P64 (conceptual shift: re-check both conditions explicitly and independently before proceeding).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.confidence-interval`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.stats.confidence-interval`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.85 reflects that while the formula itself is routine, the large-sample condition check is a genuinely important, easily-skipped validity requirement.
- Both misconceptions were ranked Foundational because each can produce an invalid or unreliable interval without the practitioner realizing it.
- The low-awareness-proportion transfer probe was deliberately chosen because a small, skewed observed proportion is exactly the realistic scenario where the large-sample condition genuinely fails, making the verification step concretely consequential rather than a pro forma check.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.confidence-interval`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
