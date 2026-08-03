# Teaching Blueprint: Long Multiplication (`math.arith.long-multiplication`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.long-multiplication` |
| name | Long Multiplication |
| domain | Arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.arith.multiplication-table`, `math.arith.carrying` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — area-model/partial-product grids before the fully symbolic algorithm |
| description (KG) | The standard written algorithm for multiplying multi-digit numbers by partial products aligned by place value.

 |

## Component 1 — Learning Objectives

- LO1: Multiply a multi-digit number by a single-digit number using the standard column algorithm, applying carrying as needed.
- LO2: Multiply two multi-digit numbers by computing PARTIAL PRODUCTS (one per digit of the second factor) and adding them together, correctly shifting each partial product by its place value.
- LO3: Correctly align (shift) each partial product according to the place value of the digit that produced it — a common structural step distinct from the multiplication itself.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.multiplication-table` (instant single-digit product recall, used throughout) and `math.arith.carrying` (needed within each partial-product computation).

## Component 3 — Core Explanation

**Long multiplication** multiplies multi-digit numbers by breaking the second factor into its place-value digits and computing one **partial product** per digit — each partial product is the first factor multiplied by just that one digit's VALUE (including its place value), then all partial products are added together. Concretely, for a two-digit second factor $\overline{tu}$ (tens digit $t$, ones digit $u$): compute (first factor)$\times u$ (the ones-digit partial product, no shift), then (first factor)$\times t$ (the tens-digit partial product, SHIFTED one place left, i.e. effectively multiplied by an extra 10, since $t$ represents $t$ TENS not just $t$), then add the two partial products.

The shift is essential: skipping it treats the tens digit as if it were a ones digit, understating the true product by a factor of 10 for that partial product.

## Component 4 — Worked Examples

**Example 1 (LO1 — single-digit multiplier)**: Multiply $346\times7$. $6\times7=42$, write $2$, carry $4$. $4\times7=28$, $+4$ carried $=32$, write $2$, carry $3$. $3\times7=21$, $+3$ carried $=24$, write $24$. Result: $2{,}422$. Check: $346\times7=2{,}422$. ✓

**Example 2 (LO2, LO3 — two-digit multiplier with the shift, breaking MC-1)**: Multiply $23\times47$. Partial product 1 (ones digit of 47, which is 7): $23\times7=161$. Partial product 2 (tens digit of 47, which is 4, representing 40): $23\times4=92$, SHIFTED one place left (written as $920$, or equivalently placed one column further left before adding). Add: $161+920=1{,}081$. Check: $23\times47=1{,}081$. ✓ A common error omits the shift, adding $161+92=253$ directly — treating the tens-digit partial product as if the digit 4 meant "4 ones" rather than "4 tens," understating the true product by roughly a factor of 10 for that term.

**Example 3 (LO2 — a three-digit multiplier, extending the pattern)**: Multiply $52\times123$. Partial products: ones digit (3): $52\times3=156$ (no shift); tens digit (2): $52\times2=104$, shifted one place ($1{,}040$); hundreds digit (1): $52\times1=52$, shifted two places ($5{,}200$). Add: $156+1{,}040+5{,}200=6{,}396$. Check: $52\times123=6{,}396$. ✓

## Component 5 — Teaching Actions

### Teaching Action A01 — Single-Digit Multiplication with Carrying (Primitive P64: Conceptual Shift)

Work Example 1 column by column, connecting each carry step directly back to `math.arith.carrying`'s already-mastered procedure, establishing the base skill before adding the multi-digit multiplier's extra complexity.

### Teaching Action A02 — Partial Products Must Be Shifted by Their Digit's Place Value (Primitive P06: Contrast Pair)

Work Example 2 twice: first the FLAWED unshifted version (adding $161+92=253$, verifiably wrong against the true product $1{,}081$), then the CORRECT shifted version. State the rule explicitly: "each partial product must be shifted left by exactly as many places as its digit's position — the tens digit of the multiplier contributes TEN times its face-value product, not just its face value."

- **MC-1 hook**: this direct flawed-vs-correct contrast targets MC-1 (omitted shift) by making the resulting numeric discrepancy (253 vs. 1,081) unmistakably visible against the verified correct answer.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Multiply $489\times6$ using the single-digit column algorithm.
  2. Multiply $34\times56$, computing both partial products and shifting the second correctly before adding.
  3. Multiply $17\times203$ (a three-digit second factor), computing all three partial products with correct shifts.
  4. Explain, in one sentence, why the tens-digit partial product in a two-digit multiplication must be shifted one place left before adding.
- **P76 (Transfer Probe, mode = independence)**: "A rectangular garden plot measures 34 meters by 27 meters. (a) Compute its area using long multiplication, showing both partial products and their shifts explicitly. (b) A student computes the partial products as 34×7=238 and 34×2=68, then adds them directly as 238+68=306 — verify whether this matches the true area, and if not, explain precisely which step was skipped and how it should be corrected."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PARTIAL-PRODUCT-SHIFT-OMITTED | Adding partial products without shifting the ones corresponding to tens (or higher) digits of the multiplier, understating the true product | Foundational |
| MC-2 | CARRY-DROPPED-WITHIN-A-PARTIAL-PRODUCT | Forgetting to carry (or cascading carries) while computing an individual partial product, corrupting that specific partial product's value | Foundational |
| MC-3 | WRONG-FACTOR-USED-AS-THE-DIGIT-SOURCE | Decomposing the wrong factor into digits (e.g. breaking apart the first factor instead of the second), producing a structurally different — though sometimes numerically similar-looking — computation | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Partial Product Shift Omitted") → P41 (detect: present Example 2 and check whether the shift is applied before adding) → P64 (conceptual shift: re-derive both the flawed (253) and correct (1,081) totals side by side, verifying against the true product to make the shift's necessity concrete).
- **B02 (targets MC-2)**: P27 ("Carry Dropped Within a Partial Product") → P41 (detect: review a submitted partial-product computation for a missing or incorrect carry) → P64 (conceptual shift: re-walk that specific partial product using `math.arith.carrying`'s column-by-column method explicitly).
- **B03 (targets MC-3)**: P27 ("Wrong Factor Used as Digit Source") → P41 (detect: review a submitted setup and check which factor was decomposed into digits) → P64 (conceptual shift: re-state the convention — "decompose the SECOND factor's digits, multiplying the first factor by each" — and re-derive with the correct factor as the digit source).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.multiplication-table`, `math.arith.carrying`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.long-division` (the inverse standard algorithm, which itself requires this concept per the KG).

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept layers a new structural step (partial products + shifting) on top of two already-substantial prerequisites (instant product recall, carrying), making it one of the more demanding foundational-tier concepts.
- MC-1 was ranked most severe because it is by far the most common error in this procedure and produces an answer that is plausible-looking but off by nearly a full order of magnitude for the affected partial product — a large, systematic error rather than a small slip.
- The garden-area transfer probe was deliberately designed with a pre-worked flawed attempt embedded in part (b), requiring the student to diagnose MC-1 in someone else's work rather than only avoid it in their own — a stronger test of genuine understanding than self-directed computation alone.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.multiplication-table`, `math.arith.carrying`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: area-model/partial-product grids before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
