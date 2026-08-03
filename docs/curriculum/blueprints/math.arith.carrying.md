# Teaching Blueprint: Carrying (`math.arith.carrying`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.carrying` |
| name | Carrying |
| domain | Arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.arith.addition`, `math.arith.ones-tens-hundreds` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — physical regrouping of ten units into one ten-rod before the written algorithm |
| description (KG) | The algorithm step in multi-digit addition where a digit sum ≥ 10 results in carrying 1 to the next column. |

## Component 1 — Learning Objectives

- LO1: Recognize when a column's digit sum is $\ge10$ during multi-digit addition and correctly carry 1 to the next (higher) place-value column.
- LO2: Correctly write the ONES digit of a column sum in that column while carrying only the TENS digit forward, never confusing which part stays and which moves.
- LO3: Handle a carry that itself pushes the NEXT column's sum to $\ge10$ (a chained/cascading carry across multiple columns).

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.addition` (the operation carrying is a procedural step within) and `math.arith.ones-tens-hundreds` (place-value grouping — carrying is literally regrouping ten of one place into one of the next).

## Component 3 — Core Explanation

**Carrying** is the step in the standard column-addition algorithm where a column's digit sum reaches 10 or more: since only a SINGLE digit (0-9) can be written in any one place-value column, ten units in a column are regrouped into one unit of the NEXT higher place — the ones digit of the sum stays in its column, and the tens digit (always exactly 1, for single-column sums of two digits plus at most one incoming carry) is "carried" and added into the next column's sum.

This is not an arbitrary bookkeeping trick — it directly reflects place value: "12 ones" IS "1 ten and 2 ones," so writing "2" in the ones column and moving the "1" to the tens column preserves the total value exactly.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — a single carry)**: Add $48+37$. Ones column: $8+7=15$ — write $5$, carry $1$ to the tens column. Tens column: $4+3+1(\text{carried})=8$ — write $8$. Result: $85$. Check: $48+37=85$. ✓

**Example 2 (LO3 — a cascading carry, breaking MC-1)**: Add $196+58$. Ones column: $6+8=14$ — write $4$, carry $1$. Tens column: $9+5+1=15$ — this is ALSO $\ge10$, so write $5$, carry $1$ AGAIN to the hundreds column. Hundreds column: $1+0+1=2$ — write $2$. Result: $254$. A common error stops carrying after the first column, writing "$1{,}54$" or similar — the carry must propagate through EVERY column where it pushes the sum to 10 or more, not just the first.

**Example 3 (LO2 — writing the correct digit, breaking MC-2)**: Add $9+9$ in a ones column: sum is $18$ — write $8$ in the ones column and carry $1$, NOT write "$18$" spanning into the next column's space, and NOT carry the "$8$" while writing "$1$" (the roles are fixed: the ONES digit of the column sum stays, the TENS digit — always 1 here — moves).

## Component 5 — Teaching Actions

### Teaching Action A01 — Ten Units Regroup into One Ten (Primitive P64: Conceptual Shift)

Using physical base-10 blocks, add $48+37$: combine ones blocks (8+7=15 ones blocks), physically bundle 10 of them into 1 ten-rod, leaving 5 loose ones — placing the new ten-rod with the tens column's rods. Connect this concrete regrouping directly to the written "write 5, carry 1" step of Example 1.

- **MC-1 hook**: present Example 2's cascading-carry case and ask the student to complete the addition (revealing MC-1: stopping the carry process after the first column, not checking whether the NEXT column's sum, now including the incoming carry, itself reaches 10 or more).

### Teaching Action A02 — Which Digit Stays, Which Digit Moves (Primitive P06: Contrast Pair)

Contrast the correct handling of Example 3's $9+9=18$ (write 8, carry 1) against a flawed alternative that swaps the roles (write 1, carry 8) or writes both digits in the same column. State the rule explicitly: "a column sum of two digits, like 18, splits into TENS digit (carried) and ONES digit (written) — always the ones digit stays, always the tens digit moves, every single time."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Add $67+58$ using the column algorithm, showing the carry step explicitly.
  2. Add $295+167$, correctly handling the cascading carry through two columns.
  3. Add $999+1$, handling a carry that cascades through every column.
  4. Explain, in one sentence, why "18" splits into "carry 1, write 8" rather than "carry 8, write 1."
- **P76 (Transfer Probe, mode = independence)**: "A cashier is totaling three purchases of \$47, \$68, and \$25 by hand, adding the ones-dollar digits first (7+8+5=20), then the tens-dollar digits. (a) Complete the addition using the column algorithm, correctly handling any carries. (b) Explain, using this lesson's regrouping idea, what it means physically for '20 ones dollars' to become '2 tens dollars' when carried, connecting it to the base-10 block regrouping from Teaching Action A01."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CASCADING-CARRY-NOT-PROPAGATED | Stopping the carry process after the first column, failing to check whether a carried 1 pushes the next column's sum to 10 or more as well | Foundational |
| MC-2 | CARRY-DIGIT-ROLES-SWAPPED | Confusing which digit of a two-digit column sum is written (ones) and which is carried (tens), sometimes carrying the wrong digit or writing both in the same column | Foundational |
| MC-3 | CARRY-ADDED-TO-WRONG-COLUMN | Adding the carried 1 into the same column it came from, or into a column two places away, rather than exactly the next higher place-value column | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Cascading Carry Not Propagated") → P41 (detect: present Example 2 and check whether the student re-checks the tens column's sum, including the incoming carry, for a further carry) → P64 (conceptual shift: re-walk Example 2 column by column, explicitly re-testing "is this sum, INCLUDING any carried-in 1, still $\ge10$?" at every single column).
- **B02 (targets MC-2)**: P27 ("Carry Digit Roles Swapped") → P41 (detect: present Example 3's $9+9=18$ and check whether "carry 1, write 8" or a swapped/incorrect version is produced) → P64 (conceptual shift: re-derive with base-10 blocks — 18 ones blocks regroup into exactly 1 ten-rod plus 8 loose ones, fixing which quantity is which).
- **B03 (targets MC-3)**: P27 ("Carry Added to Wrong Column") → P41 (detect: review a submitted addition and check which column receives the carried digit) → P64 (re-walk Example 1, tracing the physical ten-rod's placement directly into the immediately adjacent (next higher) column only).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.addition`, `math.arith.ones-tens-hundreds`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared; informally a prerequisite skill for `math.arith.long-multiplication` (partial-product columns also require carrying).

## Component 8 — Teaching Notes

- estimated_hours = 4 and mastery_threshold = 0.90 reflect that carrying errors compound directly into every later multi-digit arithmetic procedure (long multiplication, long division), justifying strict early mastery.
- MC-1 and MC-2 are both ranked foundational because each produces a numerically WRONG final answer, not just an inefficient process — unlike some later, more forgiving misconceptions, there is no partial credit path once either error occurs mid-computation.
- Example 2's cascading-carry case ($196+58$) was deliberately chosen over a single-carry-only curriculum because cascading carries are common in realistic multi-digit addition and are the single most frequently under-practiced sub-skill in typical carrying instruction.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.addition`, `math.arith.ones-tens-hundreds`) |
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
| V-15 | CPA_entry_stage justified | PASS (Concrete: block regrouping before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
