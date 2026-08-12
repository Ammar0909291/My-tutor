# Teaching Blueprint: Expanded Form (`math.arith.expanded-form`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.expanded-form` |
| name | Expanded Form |
| domain | Arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.arith.place-value` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — base-10 block representations before pure symbolic sums |
| description (KG) | Writing a number as the sum of the values of each of its digits multiplied by the corresponding power of 10 (e.g., 345 = 300 + 40 + 5). |

## Component 1 — Learning Objectives

- LO1: Write any given multi-digit whole number in expanded form (sum of each digit times its place value).
- LO2: Reconstruct the standard (compact) form of a number from its expanded form.
- LO3: Correctly handle a zero digit in expanded form — recognizing it contributes nothing to the sum, without introducing a spurious "0" term or skipping the place value entirely.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.place-value` (each digit's value depends on its position — expanded form is the explicit written-out version of exactly this idea).

## Component 3 — Core Explanation

**Expanded form** writes a number as the sum of each digit multiplied by its place value (a power of 10): e.g. $345 = 3\times100 + 4\times10 + 5\times1 = 300+40+5$. This makes explicit what standard (compact) notation leaves implicit — that a digit's contribution to the number's value depends entirely on its POSITION, not just its face value.

Zero digits require care: a zero contributes $0$ to the sum and is typically OMITTED from the written expanded form (not written as "$+0$"), but its POSITION must still be accounted for correctly in the other digits' place values.

## Component 4 — Worked Examples

**Example 1 (LO1 — straightforward expansion)**: Expand $6{,}724$: $6{,}724 = 6{,}000+700+20+4$ (6 in the thousands place, 7 in the hundreds, 2 in the tens, 4 in the ones).

**Example 2 (LO2 — reconstruction)**: Given the expanded form $8{,}000+50+3$, reconstruct the standard form: $8{,}053$ — noting the HUNDREDS place is empty (0), which must be represented as a placeholder zero digit in standard form even though it contributes no term to the expanded sum.

**Example 3 (LO3 — zero handling, breaking MC-1)**: Expand $4{,}009$: the digits are 4 (thousands), 0 (hundreds), 0 (tens), 9 (ones). Correct expanded form: $4{,}000+9$ — the two zero digits contribute nothing and are omitted entirely, NOT written as "$4{,}000+0+0+9$" (which is not wrong, only unconventional and easy to mishandle) and definitely not "$4{,}000+90+9$" (which would incorrectly treat a zero digit as if it shifted the 9 into the tens place).

## Component 5 — Teaching Actions

### Teaching Action A01 — Sum of Digit-Times-Place-Value (Primitive P11: Representation Shift)

Represent Example 1's number with base-10 blocks (thousands cubes, hundreds flats, tens rods, ones units) grouped by place, then write the matching symbolic sum term by term, connecting each block group directly to its corresponding addend.

- **MC-1 hook**: ask the student to expand $4{,}009$ and observe whether a zero-digit's place gets folded incorrectly into the next digit (revealing MC-1: mishandling a zero digit's place value, either dropping the surrounding place-value structure or inflating the next digit's value).

### Teaching Action A02 — Reconstructing from Expanded Form, Zeros as Placeholders (Primitive P06: Contrast Pair)

Contrast Example 2's reconstruction (an EMPTY hundreds place, requiring a "0" placeholder digit in standard form even though expanded form shows no explicit zero term) against Example 3's expansion (zero digits present but simply omitted from the sum). State the rule: "expanding drops zero terms; reconstructing must REINSERT zero placeholder digits for any skipped place value."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Write $52{,}681$ in expanded form.
  2. Reconstruct the standard form from $70{,}000+3{,}000+40+2$.
  3. Write $10{,}206$ in expanded form, handling both zero digits correctly.
  4. Reconstruct the standard form from $9{,}000+7$, correctly inserting placeholder zeros for the missing hundreds and tens places.
- **P76 (Transfer Probe, mode = independence)**: "A student is asked to add $3{,}040$ and $2{,}005$ using expanded form as an intermediate step. (a) Write both numbers in expanded form. (b) Add the corresponding place-value terms (thousands with thousands, hundreds with hundreds, etc.) to find the sum, being careful with the places where one or both numbers have a zero digit. (c) Reconstruct the final standard-form answer, inserting any needed placeholder zeros."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ZERO-DIGIT-PLACE-VALUE-MISHANDLED | Dropping a zero digit's place-value slot entirely (shifting subsequent digits) rather than correctly omitting only its zero-valued TERM while preserving place structure | Foundational |
| MC-2 | RECONSTRUCTION-ZERO-PLACEHOLDER-OMITTED | When reconstructing standard form from expanded form, failing to insert a "0" placeholder digit for a place value with no corresponding term | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Zero Digit Place-Value Mishandled") → P41 (detect: present Example 3's $4{,}009$ and check for an incorrect $4{,}000+90+9$-style answer) → P64 (conceptual shift: rebuild with base-10 blocks, showing the empty hundreds/tens groups explicitly before writing the symbolic sum).
- **B02 (targets MC-2)**: P27 ("Reconstruction Zero Placeholder Omitted") → P41 (detect: present Example 2's reconstruction task and check whether the hundreds-place zero is correctly inserted) → P64 (conceptual shift: re-walk the reconstruction, explicitly marking each place value slot — thousands, hundreds, tens, ones — and filling any slot with no expanded term with a "0").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.place-value`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 2 reflects this concept's nature as a direct notational restatement of place value, requiring little new conceptual machinery beyond correct zero-handling.
- Both misconceptions concern zero-handling specifically (from opposite directions — expanding vs. reconstructing) because this is the single genuine source of error once place value itself is understood; non-zero digit expansion is nearly mechanical by comparison.
- Base-10 block representation (Teaching Action A01) was chosen as the CPA entry point specifically because it makes an empty place value visually obvious (an empty tray/column) in a way pure symbols do not, directly supporting the zero-handling misconception repairs.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.place-value`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: base-10 blocks before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
