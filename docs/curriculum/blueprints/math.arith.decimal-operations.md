# Teaching Blueprint: Decimal Operations (`math.arith.decimal-operations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.decimal-operations` |
| name | Decimal Operations |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.arith.decimals` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — base-10 grid models before symbolic decimal-point alignment |
| description (KG) | The four arithmetic operations applied to decimal numbers, requiring careful alignment of decimal points for addition/subtraction and place-value tracking for multiplication. |

## Component 1 — Learning Objectives

- LO1: Add and subtract decimals by aligning decimal points (padding with trailing zeros as needed) before combining digit columns.
- LO2: Multiply decimals by multiplying as whole numbers, then placing the decimal point in the result based on the TOTAL number of decimal places in both factors combined.
- LO3: Divide decimals by shifting the decimal point in both divisor and dividend to make the divisor a whole number, then dividing normally.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.decimals` (what a decimal represents and its place-value structure) — this concept applies the four operations to that representation.

## Component 3 — Core Explanation

**Decimal addition/subtraction** requires aligning decimal POINTS (not just right-justifying digits as with whole numbers), padding shorter decimals with trailing zeros so every column represents the same place value, then adding/subtracting column by column exactly as with whole numbers. **Decimal multiplication** proceeds by multiplying the digits as if both numbers were whole numbers, then placing the decimal point in the result so the number of decimal places in the answer equals the SUM of decimal places in the two factors. **Decimal division** shifts the decimal point the same number of places in both divisor and dividend until the divisor becomes a whole number, then divides normally.

## Component 4 — Worked Examples

**Example 1 (LO1 — alignment, breaking MC-1)**: Add $3.4+0.256$. Align by DECIMAL POINT (not by rightmost digit): $\begin{matrix}3.400\\+0.256\end{matrix}$ (padding $3.4$ to $3.400$ to match three decimal places), giving $3.656$. A common error right-aligns the digits as if they were whole numbers ("$3.4+0.256$" naively lined up as $34+256$-style), producing a wrong result like $3.660$ or worse.

**Example 2 (LO2 — multiplication place counting, breaking MC-2)**: Multiply $2.3\times0.14$. Multiply as whole numbers: $23\times14=322$. Count total decimal places in the factors: $2.3$ has 1, $0.14$ has 2, total $=3$. Place the decimal point 3 places from the right in $322$: $0.322$. A common error places the decimal point based on either factor's OWN place count alone (e.g. using just 2, from $0.14$), rather than the SUM of both factors' place counts.

**Example 3 (LO3 — division by shifting the decimal point)**: Divide $4.8\div0.06$. Shift the decimal point 2 places right in both (to make the divisor a whole number): $480\div6=80$. Check: $0.06\times80=4.8$. ✓

## Component 5 — Teaching Actions

### Teaching Action A01 — Align Decimal Points, Pad with Zeros (Primitive P64: Conceptual Shift)

Work Example 1 using a base-10 grid model (representing tenths, hundredths, thousandths as grid squares), showing that padding $3.4$ to $3.400$ doesn't change its value, then perform the column addition with points genuinely aligned.

- **MC-1 hook**: present $3.4+0.256$ without guidance and observe whether the student right-aligns the digit strings rather than the decimal points (revealing MC-1: treating decimal addition like whole-number addition, ignoring the need to align by place value/decimal point specifically).

### Teaching Action A02 — Multiplication: Count Total Decimal Places from BOTH Factors (Primitive P06: Contrast Pair)

Contrast the correct total-place-count method (Example 2: $1+2=3$ places) against the flawed single-factor count (using only 2, from $0.14$ alone), showing the flawed version misplaces the decimal point in the final answer. State the rule: "count decimal places in EACH factor, then ADD those counts — that total, not either one alone, tells you where the point goes in the product."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Add $5.07+2.3$, aligning decimal points correctly.
  2. Subtract $6-2.45$, padding $6$ appropriately as $6.00$ before subtracting.
  3. Multiply $1.2\times0.05$, counting total decimal places across both factors.
  4. Divide $7.5\div0.25$, shifting the decimal point in both divisor and dividend appropriately.
- **P76 (Transfer Probe, mode = independence)**: "A pharmacist needs to compute the total weight of 0.15 g and 2.3 g of two medications combined, and separately needs to divide a 4.8 g supply into doses of 0.4 g each. (a) Compute both results, showing the decimal-point handling explicitly for the addition and the division. (b) Explain, using this lesson's alignment rule, what would go wrong if the addition were done by right-aligning the digit strings ('015' and '23') instead of aligning decimal points."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DECIMALS-ADDED-BY-DIGIT-ALIGNMENT-NOT-POINT-ALIGNMENT | Right-aligning decimal digit strings as if adding whole numbers, instead of aligning by decimal point (and place value) | Foundational |
| MC-2 | MULTIPLICATION-DECIMAL-PLACE-COUNTED-FROM-ONE-FACTOR-ONLY | Placing the product's decimal point based on only one factor's decimal-place count, rather than the sum of both factors' counts | Foundational |
| MC-3 | DIVISION-DECIMAL-SHIFT-APPLIED-TO-ONLY-ONE-NUMBER | Shifting the decimal point in the divisor to make it a whole number but forgetting to shift the dividend's decimal point by the same amount | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Decimals Added by Digit Alignment") → P41 (detect: present Example 1 and check whether digits are right-aligned rather than decimal points) → P64 (conceptual shift: re-pad both numbers to equal decimal-place length using base-10 grid models, then re-align by the decimal point explicitly before adding).
- **B02 (targets MC-2)**: P27 ("Multiplication Decimal Place Miscounted") → P41 (detect: present Example 2 and check whether the decimal point is placed using only one factor's place count) → P64 (conceptual shift: re-count decimal places in EACH factor separately, then explicitly sum them before placing the point).
- **B03 (targets MC-3)**: P27 ("Division Decimal Shift Applied to One Number Only") → P41 (detect: present Example 3 and check whether only the divisor's decimal point is shifted, leaving the dividend unshifted) → P64 (conceptual shift: re-derive the shift as multiplying BOTH divisor and dividend by the same power of 10, preserving the quotient's value, per the equivalent-ratio principle).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.decimals`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects that this concept bundles four distinct procedures (add, subtract, multiply, divide) each with its own decimal-point-handling rule, rather than a single unified technique.
- All three misconceptions are ranked foundational because each stems from applying a WHOLE-NUMBER habit (right-alignment, single-factor counting, one-sided shifting) directly to decimals without the additional decimal-point bookkeeping step each operation actually requires — a consistent pattern of incomplete adaptation from whole-number procedures.
- The pharmacist transfer probe was deliberately chosen for its genuine real-world stakes (medication dosing) to reinforce that decimal-point errors are not merely academic — a misplaced decimal point in this context would represent a serious real dosing error, motivating the precision this concept demands.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.decimals`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: base-10 grids before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
