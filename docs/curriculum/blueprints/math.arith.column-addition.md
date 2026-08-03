# Teaching Blueprint: Column Addition (`math.arith.column-addition`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.column-addition` |
| name | Column Addition |
| domain | Arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.arith.carrying` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — place-value-aligned grids before the fully symbolic algorithm |
| description (KG) | The standard written algorithm for adding multi-digit numbers by aligning place values and adding column by column from right to left.

 |

## Component 1 — Learning Objectives

- LO1: Set up a multi-digit addition problem by aligning numbers according to place value (ones under ones, tens under tens, etc.), regardless of differing digit counts.
- LO2: Execute the column algorithm correctly, adding right to left (ones column first) and carrying as needed.
- LO3: Recognize WHY the algorithm proceeds right to left (ones first) rather than left to right — a carry generated in a lower place value can affect a higher one, but never the reverse.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.carrying` (the specific regrouping step this full algorithm relies on whenever a column sum reaches 10 or more).

## Component 3 — Core Explanation

**Column addition** (the standard written algorithm) adds multi-digit numbers by: (1) aligning the numbers so matching place values stack in the same column (ones under ones, tens under tens, ...); (2) adding column by column starting from the ONES column (rightmost) and proceeding LEFT, applying carrying (per `math.arith.carrying`) whenever a column's sum reaches 10 or more.

The right-to-left order is not arbitrary: a carry generated while adding the ones column must be incorporated into the tens column's sum, and a carry from tens must reach hundreds, and so on — carries only ever flow from a LOWER place value into a HIGHER one, never the reverse, which is exactly why the algorithm must start at the ones column.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — standard setup and execution)**: Add $347+58$. Align by place value: 
$$\begin{array}{r}347\\+\ \ 58\\\hline\end{array}$$
Add ones: $7+8=15$, write $5$, carry $1$. Add tens: $4+5+1=10$, write $0$, carry $1$. Add hundreds: $3+0+1=4$. Result: $405$.

**Example 2 (LO1 — aligning numbers of different lengths, breaking MC-1)**: Add $6{,}047+382$. Correct alignment: 
$$\begin{array}{r}6047\\+\ \ 382\\\hline\end{array}$$
(the shorter number's digits align to the RIGHT, matching ones-with-ones, tens-with-tens — NOT left-aligned, which would incorrectly pair $6$ with $3$, $0$ with $8$, etc., as if both numbers had the same number of digits.) Left-aligning instead would treat 382 as if it were $3{,}820$, giving a wrong setup entirely.

**Example 3 (LO3 — why right-to-left order matters)**: Attempting to add $58+47$ starting from the LEFT (tens column first): $5+4=9$ — but this ignores that the ones column ($8+7=15$) will generate a carry that changes the tens column's true sum to $9+1=10$, which itself then carries into the hundreds column. Starting left-to-right would require going back and revising an already-written digit once the carry is discovered — right-to-left order avoids this entirely by resolving every carry BEFORE it's needed in a higher column.

## Component 5 — Teaching Actions

### Teaching Action A01 — Align by Place Value, Then Add Right to Left (Primitive P64: Conceptual Shift)

Work Example 1 in full using a place-value grid (columns explicitly labeled ones/tens/hundreds), adding right to left and narrating each carry step, reinforcing the setup-then-execute structure.

- **MC-1 hook**: present Example 2's differing-length addition and check whether digits are aligned by place value (right-aligned) or by position (left-aligned) (revealing MC-1: aligning multi-digit numbers by their leftmost digit rather than by matching place value, especially when the numbers have different digit counts).

### Teaching Action A02 — Why Right-to-Left, Not Left-to-Right (Primitive P06: Contrast Pair)

Work Example 3's left-to-right attempt, showing it requires revising an already-written digit once a carry is discovered, then contrast against the smooth right-to-left version from Example 1. State the rule: "carries only ever flow upward (into higher place values) — starting at the ones column ensures every carry is resolved before the column that needs it is reached."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Add $529+364$ using the column algorithm.
  2. Add $8{,}003+295$, aligning the differing-length numbers correctly.
  3. Add $999+1$, handling the cascading carry through every column.
  4. Explain, in one sentence, why the algorithm adds the ones column first rather than the highest place-value column first.
- **P76 (Transfer Probe, mode = independence)**: "A student is asked to add three numbers stacked in a column: $47$, $8$, and $126$. (a) Set up the addition correctly, aligning all three by place value despite their different digit counts. (b) Compute the sum using the right-to-left column algorithm, explaining at each carry step why that step could not have been safely skipped by working left to right instead."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NUMBERS-ALIGNED-BY-POSITION-NOT-PLACE-VALUE | Aligning multi-digit numbers of different lengths by their leftmost digit rather than matching place value (right-aligning), producing an incorrect setup | Foundational |
| MC-2 | ADDITION-ATTEMPTED-LEFT-TO-RIGHT | Adding columns from left to right (highest place value first), missing carries that should have been resolved before reaching that column | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Numbers Aligned by Position Not Place Value") → P41 (detect: present Example 2's differing-length addition and check the alignment used) → P64 (conceptual shift: re-set up using an explicit place-value grid, labeling each column's place value before placing any digit).
- **B02 (targets MC-2)**: P27 ("Addition Attempted Left to Right") → P41 (detect: present Example 3's scenario and check the column order used) → P64 (conceptual shift: re-walk the left-to-right attempt's revision problem explicitly, then re-derive the correct right-to-left order).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.carrying`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.addition` (the underlying operation this concept formalizes into a written procedure).

## Component 8 — Teaching Notes

- estimated_hours = 3 and mastery_threshold = 0.95 (among the highest in this batch) reflect that this is THE standard written procedure underlying nearly all later multi-digit arithmetic, so fluency here is non-negotiable.
- MC-1 was ranked foundational severity because a misalignment corrupts every subsequent column's sum, not just one isolated step — it is a setup error with maximal downstream impact.
- Example 3 was deliberately structured to make the LEFT-TO-RIGHT attempt's failure mode concrete (requiring a digit revision) rather than merely asserting the right-to-left rule as a convention to be memorized, giving bloom=apply's procedural focus a genuine conceptual anchor (LO3).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.carrying`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: place-value grids before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO1, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
