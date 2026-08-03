# Teaching Blueprint: Percentage Change (`math.arith.percentage-change`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.percentage-change` |
| name | Percentage Change |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.arith.percentage-calculations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Expressing the change in a quantity as a percentage of its original value: (new − old) / old × 100%.

 |

## Component 1 — Learning Objectives

- LO1: Compute percentage change using $\frac{\text{new}-\text{old}}{\text{old}}\times100\%$, correctly identifying which value is "old" (the ORIGINAL, always the denominator) and which is "new."
- LO2: Correctly interpret the SIGN of the result — positive means percentage increase, negative means percentage decrease.
- LO3: Given an original value and a stated percentage change, compute the resulting new value (the inverse of LO1).

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.percentage-calculations` (the three basic percentage calculation types) — percentage change is a specific applied formula built on that foundation.

## Component 3 — Core Explanation

**Percentage change** measures how much a quantity has changed, expressed as a percentage of its ORIGINAL value: $\text{percentage change}=\frac{\text{new}-\text{old}}{\text{old}}\times100\%$. The denominator is ALWAYS the original (old) value — never the new value, and never an average of the two — because percentage change measures the change relative to where the quantity STARTED.

The sign of the result carries meaning: a POSITIVE result means the quantity increased; a NEGATIVE result means it decreased. Given a percentage change and an original value, the new value can be found by applying the change: $\text{new}=\text{old}\times\left(1+\frac{\text{percentage change}}{100}\right)$.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — basic increase)**: A price rises from \$40 to \$50. Percentage change: $\frac{50-40}{40}\times100\%=\frac{10}{40}\times100\%=25\%$ — a 25% INCREASE (positive result).

**Example 2 (LO1 — the denominator must be the original, breaking MC-1)**: A population drops from 200 to 150. Percentage change: $\frac{150-200}{200}\times100\%=\frac{-50}{200}\times100\%=-25\%$ — a 25% DECREASE. A common error divides by the NEW value instead ($\frac{-50}{150}\times100\%\approx-33.3\%$), giving a genuinely different (and incorrect) answer — the original value must ALWAYS be the denominator, regardless of whether the quantity increased or decreased.

**Example 3 (LO3 — finding the new value from a stated change, breaking MC-2)**: A \$60 item's price increases by 15%. New price: $60\times(1+0.15)=60\times1.15=\$69$. A common error instead computes $60\times0.15=\$9$ and reports THIS as the new price, mistaking the CHANGE amount (\$9) for the final new value (which is the original PLUS the change, \$69, not the change alone).

## Component 5 — Teaching Actions

### Teaching Action A01 — Original Value Is Always the Denominator (Primitive P64: Conceptual Shift)

Work Example 1, explicitly labeling "old" and "new" before substituting into the formula, emphasizing: "the denominator is always what you STARTED with — the original value — never the ending value."

- **MC-1 hook**: present Example 2's population-decrease case and check whether the denominator used is the original (200) or the new (150) value (revealing MC-1: dividing by the new/final value instead of the original value when computing percentage change).

### Teaching Action A02 — The Change Amount Is Not the New Value (Primitive P06: Contrast Pair)

Work Example 3's correct computation ($60\times1.15=69$) against the flawed version (mistaking $60\times0.15=9$, the change ITSELF, for the final new value). State the rule: "a percentage increase gives you the AMOUNT of change — you must still ADD it to the original to get the actual new value; the change amount alone is not the answer to 'what is the new price?'"

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. A stock price rises from \$80 to \$92. Compute the percentage change.
  2. A quantity drops from 500 to 425. Compute the percentage change, being careful to use the correct denominator.
  3. A \$200 item's price decreases by 30%. Find the new price.
  4. Explain, in one sentence, why dividing by the new value instead of the old value would give a different, incorrect percentage change.
- **P76 (Transfer Probe, mode = independence)**: "A company's revenue was \$1.2 million last year and \$1.5 million this year. (a) Compute the percentage change in revenue, being explicit about which value is the denominator. (b) A junior analyst reports the percentage change as $\frac{1.5-1.2}{1.5}\times100\%=20\%$ instead — identify the specific error in this computation and explain, using this lesson's rule, why it produces a different (and incorrect) result from the true percentage change."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PERCENTAGE-CHANGE-DENOMINATOR-USES-NEW-VALUE | Dividing by the new/final value instead of the original value when computing percentage change | Foundational |
| MC-2 | CHANGE-AMOUNT-MISTAKEN-FOR-NEW-VALUE | Reporting the computed change amount itself (e.g. 15% of the original) as the final new value, forgetting to add it to (or subtract it from) the original | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Percentage Change Denominator Uses New Value") → P41 (detect: present Example 2 and check which value is used as the denominator) → P64 (conceptual shift: re-derive the formula explicitly labeling "old" as the fixed reference point, computing both the correct and incorrect denominators side by side to show the differing results).
- **B02 (targets MC-2)**: P27 ("Change Amount Mistaken for New Value") → P41 (detect: present Example 3 and check whether the final reported answer is \$9 or \$69) → P64 (conceptual shift: re-derive using the full formula $\text{new}=\text{old}\times(1+\text{rate})$, explicitly showing the addition of the change to the original).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.percentage-calculations`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.percentages`.

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept is a specific, high-stakes application of the general percentage-calculation skill, with two distinct and common failure points (denominator choice, change-vs-new-value confusion) each warranting dedicated attention.
- Both misconceptions are ranked foundational because each produces a plausible-looking but numerically wrong answer using the correct GENERAL approach (percentage reasoning) with one specific structural step reversed or omitted.
- The revenue transfer probe's part (b) was deliberately designed around a specific, plausible-looking flawed computation (dividing by the new value) rather than an obviously wrong one, testing whether the denominator rule is applied as a genuine check rather than assumed correct by default.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.percentage-calculations`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO1, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
