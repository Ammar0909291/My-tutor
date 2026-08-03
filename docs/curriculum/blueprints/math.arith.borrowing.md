# Teaching Blueprint: Borrowing (`math.arith.borrowing`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.borrowing` |
| name | Borrowing |
| domain | Arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.arith.subtraction`, `math.arith.ones-tens-hundreds` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — physical un-bundling of a ten-rod into ten units before the written algorithm |
| description (KG) | The algorithm step in multi-digit subtraction where a digit is insufficient for the column subtraction, requiring borrowing from the next higher column. |

## Component 1 — Learning Objectives

- LO1: Recognize when a column's top digit is smaller than the digit being subtracted, and correctly "borrow" 1 from the next higher place-value column (regrouping it as 10 in the current column).
- LO2: Correctly reduce the lending column's digit by exactly 1 after a borrow, without forgetting this reduction or reducing it by the wrong amount.
- LO3: Handle a borrow that must cascade through a zero digit (borrowing from a column whose digit is itself 0, requiring the borrow to reach further back).

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.subtraction` and `math.arith.ones-tens-hundreds` (place-value grouping — borrowing is literally un-bundling one unit of a higher place into ten units of the current place).

## Component 3 — Core Explanation

**Borrowing** is the step in column subtraction where the top digit in a column is smaller than the digit being subtracted from it: one unit is "borrowed" from the NEXT higher place-value column (reducing that column's digit by 1) and added as 10 to the current column (since one unit of a higher place equals ten units of the current place). This directly reflects place value: "1 ten" IS "10 ones," so trading one for the other preserves the total value exactly.

Borrowing across a ZERO digit requires special care: if the next column's digit is already 0, there is nothing to directly reduce by 1 — the borrow must reach past it to the NEXT non-zero column, converting that 0 into a 9 (via an intermediate borrow-through) along the way.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — a single borrow)**: Subtract $52-27$. Ones column: $2-7$ is not possible directly (2 < 7), so borrow 1 ten from the tens column: tens column's digit reduces from $5$ to $4$, and the ones column becomes $12-7=5$. Tens column: $4-2=2$. Result: $25$. Check: $52-27=25$. ✓

**Example 2 (LO3 — borrowing through a zero, breaking MC-1)**: Subtract $402-158$. Ones column: $2-8$ needs a borrow, but the tens column's digit is $0$ — nothing to directly borrow from. Instead, borrow first from the HUNDREDS column: hundreds reduces from $4$ to $3$, and the tens column's $0$ becomes $10$; NOW borrow 1 from this new tens-value of 10 for the ones column: tens becomes $9$, ones becomes $12$. Ones: $12-8=4$. Tens: $9-5=4$. Hundreds: $3-1=2$. Result: $244$. Check: $402-158=244$. ✓ A common error stops at "tens column is 0, so I can't borrow" and gets stuck, or incorrectly borrows directly from the hundreds INTO the ones column, skipping the tens column's needed intermediate value.

**Example 3 (LO2 — the lending column's reduction, breaking MC-2)**: Subtract $83-46$. Ones: $3-6$ needs a borrow; tens reduces from $8$ to $7$ (by exactly 1, NOT by 10 or left unchanged), ones becomes $13-6=7$. Tens: $7-4=3$. Result: $37$. A common error forgets to reduce the tens digit at all, computing tens as $8-4=4$ instead of the correct $7-4=3$ — using the ORIGINAL (un-reduced) tens digit after already having "spent" one of its tens on the ones column.

## Component 5 — Teaching Actions

### Teaching Action A01 — One Ten Un-Bundles into Ten Ones (Primitive P64: Conceptual Shift)

Using physical base-10 blocks, subtract $52-27$: attempt to remove 7 ones blocks from only 2 available, un-bundle one ten-rod from the tens column into 10 loose ones blocks (now 12 ones available), remove 7, leaving 5; the tens column now has one fewer rod. Connect this concrete regrouping directly to the written "borrow 1, tens becomes 4, ones becomes 12" step of Example 1.

- **MC-1 hook**: present Example 2's borrow-through-zero case and observe whether the student gets stuck at the zero tens digit or attempts an incorrect direct hundreds-to-ones borrow (revealing MC-1: not knowing how to handle a borrow when the immediately adjacent column's digit is itself zero).

### Teaching Action A02 — The Lending Column Must Actually Be Reduced (Primitive P06: Contrast Pair)

Contrast Example 3's correct handling (tens reduces from 8 to 7 after lending) against the flawed version (tens stays at 8, used again unreduced in the tens-column subtraction). State the rule explicitly: "once a column lends 1 to its neighbor, that column's OWN digit permanently drops by 1 for the rest of this problem — it's now short one ten, and every later use of that column must reflect this."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Subtract $71-38$ using the column algorithm, showing the borrow step explicitly.
  2. Subtract $500-267$, correctly borrowing through the zero tens and (if needed) further zero digits.
  3. Subtract $93-56$, being careful to correctly reduce the tens column's digit after lending.
  4. Explain, in one sentence, why borrowing 1 from the tens column turns it into 10 in the ones column, rather than some other amount.
- **P76 (Transfer Probe, mode = independence)**: "A shopkeeper has 300 rupees in the till and gives a customer 178 rupees in change. (a) Compute the remaining amount using the column subtraction algorithm, correctly handling the zero digits when borrowing. (b) Explain, in terms of physical currency (e.g. trading a 100-rupee note for ten 10-rupee notes, then a 10-rupee note for ten 1-rupee coins), what each borrowing step in your calculation represents concretely, connecting it to the base-10 block un-bundling from Teaching Action A01."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BORROW-THROUGH-ZERO-MISHANDLED | Getting stuck, or borrowing incorrectly, when the immediately adjacent column's digit is 0 and cannot be directly reduced by 1 | Foundational |
| MC-2 | LENDING-COLUMN-NOT-REDUCED | Forgetting to reduce the lending column's digit by 1 after it has lent a unit to the borrowing column, reusing its original (un-reduced) value later | Foundational |
| MC-3 | BORROWED-AMOUNT-MISCOMPUTED | Adding an amount other than exactly 10 to the borrowing column (e.g. adding 1 instead of 10, or the wrong place-value amount) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Borrow Through Zero Mishandled") → P41 (detect: present Example 2 and check whether the student correctly performs the two-step borrow — hundreds→tens, then tens→ones — or stalls/errs at the zero) → P64 (conceptual shift: re-walk the two-stage un-bundling explicitly with base-10 blocks, showing the intermediate "tens column now holds 10" state before the final borrow into ones).
- **B02 (targets MC-2)**: P27 ("Lending Column Not Reduced") → P41 (detect: present Example 3 and check whether the tens subtraction uses 7 or the un-reduced 8) → P64 (conceptual shift: re-derive with blocks, physically removing one ten-rod from the tens column's pile at the moment of lending, so its new (reduced) count is visibly all that remains).
- **B03 (targets MC-3)**: P27 ("Borrowed Amount Miscomputed") → P41 (detect: ask what value is added to the ones column when 1 is borrowed from the tens column; check for an answer other than 10) → P64 (conceptual shift: re-state the place-value equivalence explicitly — "1 ten IS 10 ones" — grounding the exact borrowed amount).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.subtraction`, `math.arith.ones-tens-hundreds`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.carrying` (the inverse regrouping operation, for addition rather than subtraction).

## Component 8 — Teaching Notes

- estimated_hours = 4 mirrors `math.arith.carrying`'s allocation — both are place-value regrouping procedures with comparable procedural complexity, applied to inverse operations.
- MC-1 and MC-2 are both ranked foundational because each produces a numerically wrong final answer with no partial-credit path, and MC-1 in particular (borrow-through-zero) is the single most common point of complete procedural breakdown in multi-digit subtraction instruction.
- Example 2's borrow-through-zero case ($402-158$) was deliberately retained as the canonical hard case (rather than stopping at single-column borrows) because zero digits are common in realistic multi-digit numbers and represent the single largest jump in difficulty within this concept.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.subtraction`, `math.arith.ones-tens-hundreds`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: block un-bundling before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
