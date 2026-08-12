# Teaching Blueprint: Percentage Calculations (`math.arith.percentage-calculations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.percentage-calculations` |
| name | Percentage Calculations |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.arith.percentages` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Computing percentages, finding what percent one number is of another, and finding the whole given a part and a percent. |

## Component 1 — Learning Objectives

- LO1: Compute a percentage OF a given quantity (e.g. "what is 20% of 150?").
- LO2: Determine WHAT PERCENT one number is of another (e.g. "30 is what percent of 120?").
- LO3: Find the WHOLE, given a part and the percent it represents (e.g. "40 is 25% of what number?").

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.percentages` (percent as "per hundred," and its equivalence to a fraction over 100 or a decimal) — this concept applies that representation to three distinct calculation types.

## Component 3 — Core Explanation

All three percentage calculation types rest on the same relationship: $\text{part} = \text{percent}\times\text{whole}$ (with percent expressed as a decimal, e.g. 20% $=0.20$). Each calculation type solves for a DIFFERENT one of the three quantities (part, percent, whole) given the other two:

- **Find the part** (LO1): $\text{part}=\text{percent}\times\text{whole}$ directly.
- **Find the percent** (LO2): $\text{percent}=\text{part}\div\text{whole}$, then convert the decimal result to a percentage.
- **Find the whole** (LO3): $\text{whole}=\text{part}\div\text{percent}$.

Recognizing WHICH quantity is missing in a given problem — and therefore which rearrangement of the relationship to use — is the central skill.

## Component 4 — Worked Examples

**Example 1 (LO1 — find the part)**: What is 20% of 150? $0.20\times150=30$.

**Example 2 (LO2 — find the percent, breaking MC-1)**: 30 is what percent of 120? $\text{percent}=30\div120=0.25=25\%$. A common error instead computes $120\div30=4$ (dividing in the wrong direction, or mistaking which number is the "whole" being compared against) — the WHOLE (the number being compared TO) must be the divisor, and the PART (the number being expressed as a percentage of the whole) must be the dividend.

**Example 3 (LO3 — find the whole, breaking MC-2)**: 40 is 25% of what number? $\text{whole}=40\div0.25=160$. A common error instead MULTIPLIES ($40\times0.25=10$), treating "find the whole" the same way as "find the part" (LO1's operation), rather than recognizing this problem asks for the INVERSE operation — division, not multiplication.

## Component 5 — Teaching Actions

### Teaching Action A01 — Identify Which Quantity Is Missing (Primitive P11: Representation Shift)

Present all three calculation types as instances of a single triangle/relationship diagram (part = percent × whole), with the MISSING quantity in each worked example circled explicitly, then work Examples 1-3 in sequence, each time naming aloud which quantity is unknown before choosing the operation.

- **MC-1 hook**: present Example 2's "30 is what percent of 120?" and check whether the division is set up as $30\div120$ or the reversed $120\div30$ (revealing MC-1: confusing which number is the whole/divisor when finding a percent).

### Teaching Action A02 — Finding the Whole Requires Division, Not Multiplication (Primitive P06: Contrast Pair)

Contrast Example 1 (find the part: MULTIPLY percent × whole) against Example 3 (find the whole: DIVIDE part by percent) side by side, showing they are inverse operations for inverse questions. State the rule: "if the WHOLE is what's missing, you must divide the part by the percent — multiplying instead answers a different question (finding a part of that same number), not this one."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find 35% of 80.
  2. 18 is what percent of 45?
  3. 63 is 70% of what number?
  4. Given a problem statement, identify which of the three quantities (part, percent, whole) is unknown, without yet solving.
- **P76 (Transfer Probe, mode = independence)**: "A store advertises that a jacket's sale price of \$56 represents a 30% discount off the original price. (a) Identify which quantity (part, percent, whole) is unknown here — noting carefully that \$56 is NOT 30% of the original price, but rather 70% of it (100% − 30% discount) — and compute the original price. (b) Explain, using this lesson's find-the-whole rule, why simply computing $56\div0.30$ would give a WRONG answer to this particular problem, and what the correct setup should be instead."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PERCENT-CALCULATION-DIVISION-DIRECTION-REVERSED | When finding what percent one number is of another, dividing the whole by the part instead of the part by the whole | Foundational |
| MC-2 | FIND-THE-WHOLE-COMPUTED-BY-MULTIPLYING-INSTEAD-OF-DIVIDING | Using the "find the part" operation (multiply) when the problem actually asks to find the whole (requiring division) | Foundational |
| MC-3 | DISCOUNT-OR-INCREASE-PERCENT-APPLIED-TO-WRONG-BASE | In a discount/markup scenario, applying the percent to the final amount instead of the recognizing the final amount already represents (100% − discount%) or (100% + markup%) of the original | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Percent Calculation Division Direction Reversed") → P41 (detect: present Example 2 and check the division order) → P64 (conceptual shift: re-state the relationship — "the WHOLE is always what you're comparing TO, and it's always the divisor" — then re-derive $30\div120=0.25$).
- **B02 (targets MC-2)**: P27 ("Find the Whole Computed by Multiplying") → P41 (detect: present Example 3 and check whether $40\times0.25$ or $40\div0.25$ is used) → P64 (conceptual shift: re-derive using the inverse relationship explicitly — "if part = percent × whole, then whole = part ÷ percent" — verifying by checking $160\times0.25=40$ against the original problem).
- **B03 (targets MC-3)**: P27 ("Discount/Increase Applied to Wrong Base") → P41 (detect: present the transfer probe's discount scenario and check whether $56\div0.30$ is (incorrectly) attempted) → P64 (conceptual shift: re-frame the sale price as 70% of the ORIGINAL, not 30% of anything, then correctly compute $56\div0.70$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.percentages`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept trains THREE distinct calculation setups sharing one underlying relationship — the challenge is correct problem-type IDENTIFICATION as much as computation itself.
- MC-1 and MC-2 are both ranked foundational because each stems from the same root cause — failing to correctly identify which quantity (part, percent, or whole) is missing — manifesting as a division-direction error in one case and an operation-choice error in the other.
- The discount transfer probe (MC-3) was deliberately designed as the hardest item, requiring students to recognize an INDIRECT percentage relationship (the given amount is 70% of the whole, not literally "part = 30%") — a genuinely common real-world trap that pure textbook drilling of the three basic types often fails to prepare students for.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.percentages`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
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
