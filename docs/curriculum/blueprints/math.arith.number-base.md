# Teaching Blueprint: Number Base (`math.arith.number-base`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.number-base` |
| name | Number Base |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.arith.place-value` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — grouped-object representations before symbolic base conversion |
| description (KG) | A positional numeral system using b distinct digit symbols; base 2 (binary), base 8 (octal), and base 16 (hexadecimal) are common in computing. |

## Component 1 — Learning Objectives

- LO1: Convert a base-10 number to another base (e.g. binary, octal, hexadecimal) using repeated division.
- LO2: Convert a number in another base back to base-10 using the digit-times-place-value (power of the base) sum.
- LO3: Recognize that place value is a GENERAL principle (any base $b$ uses powers of $b$), of which base-10's familiar powers of 10 is only one instance.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.place-value` (digit value depends on position times a power of the base — this concept generalizes that idea beyond base 10).

## Component 3 — Core Explanation

A **number base** $b$ system uses $b$ distinct digit symbols ($0$ through $b-1$) and represents a number as a sum of digits times powers of $b$: $d_n d_{n-1}\cdots d_1 d_0$ in base $b$ means $d_n b^n + d_{n-1}b^{n-1}+\cdots+d_1 b + d_0$. Base 10 (decimal, digits 0-9) is the everyday convention; **base 2** (binary, digits 0-1), **base 8** (octal, digits 0-7), and **base 16** (hexadecimal, digits 0-9 then A-F for 10-15) are standard in computing.

**Converting base-10 to base $b$**: repeatedly divide by $b$, recording remainders, then read remainders in REVERSE order (last remainder first). **Converting base $b$ to base-10**: expand as a sum of digit-times-power-of-$b$ terms and evaluate.

## Component 4 — Worked Examples

**Example 1 (LO1 — base-10 to binary via repeated division)**: Convert $13_{10}$ to binary. $13\div2=6$ remainder $1$; $6\div2=3$ remainder $0$; $3\div2=1$ remainder $1$; $1\div2=0$ remainder $1$. Reading remainders bottom-to-top (reverse order): $1101_2$. Check: $1\times8+1\times4+0\times2+1\times1=13$. ✓

**Example 2 (LO2 — base $b$ to base-10)**: Convert $1101_2$ back to base-10: $1\times2^3+1\times2^2+0\times2^1+1\times2^0 = 8+4+0+1=13$. Matches Example 1, confirming the conversions are inverse operations.

**Example 3 (LO3 — hexadecimal digit values, breaking MC-1)**: In hexadecimal, the digit "A" represents the value 10 (not the letter itself, and NOT "1 followed by 0"), "B"=11, up through "F"=15. Convert $2A_{16}$ to base-10: $2\times16+10\times1 = 32+10=42$ — the digit "A" contributes its VALUE (10) times its place value ($16^0=1$ here), exactly like any numeral digit would, just using a letter symbol because base 16 needs 16 distinct digit symbols (0-9 alone only provides 10).

## Component 5 — Teaching Actions

### Teaching Action A01 — Repeated Division to Convert Base-10 to Another Base (Primitive P64: Conceptual Shift)

Work Example 1 step by step, physically grouping 13 objects into groups of 2 repeatedly (2 groups of 2 make a group of 4, etc.) alongside the symbolic repeated-division algorithm, to ground WHY reading remainders in reverse order produces the correct digit sequence.

- **MC-1 hook**: ask the student what the hexadecimal digit "A" means (revealing MC-1: treating "A" as a placeholder letter with no numeric value, or confusing it with "10" written as two digits, rather than a single digit worth exactly ten).

### Teaching Action A02 — Any Base Uses Powers of That Base (Primitive P06: Contrast Pair)

Contrast base-10's familiar place values ($\ldots,100,10,1$ = powers of 10) directly against binary's place values ($\ldots,8,4,2,1$ = powers of 2) side by side for the SAME number (13 vs. $1101_2$), showing both represent identical quantities via the same general digit-times-power-of-base principle, just with a different base. State the rule: "the placeholder power of position always matches the SYSTEM's base — base 10 uses powers of 10, base 2 uses powers of 2, and so on for any base."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Convert $25_{10}$ to binary using repeated division.
  2. Convert $11010_2$ back to base-10.
  3. Convert $1F_{16}$ to base-10, correctly interpreting the digit "F" as value 15.
  4. Convert $50_{10}$ to octal (base 8) using repeated division by 8.
- **P76 (Transfer Probe, mode = independence)**: "A computer stores a small file size as $101100_2$ bytes. (a) Convert this binary value to base-10 to find the file size in ordinary bytes. (b) The same value is sometimes displayed in hexadecimal for compactness; group the binary digits into sets of 4 from the right ($10\,1100$, padding the leftmost group as needed) and convert each group to its single hex digit, explaining why grouping by 4 binary digits corresponds exactly to one hex digit (since $2^4=16$, the base of hexadecimal)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LETTER-DIGITS-MISUNDERSTOOD-IN-HEXADECIMAL | Treating hexadecimal's letter digits (A-F) as non-numeric placeholders rather than single digits with values 10-15 | Foundational |
| MC-2 | REMAINDER-ORDER-NOT-REVERSED | Reading repeated-division remainders in the order they were generated (first to last) rather than reversing them to get the correct digit sequence | Foundational |
| MC-3 | BASE-10-PLACE-VALUES-ASSUMED-UNIVERSAL | Applying powers of 10 when converting or evaluating a number in a different base, rather than using that base's own powers | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Hex Letter Digits Misunderstood") → P41 (detect: ask the student what "A" is worth in hex; check for "it's just a letter, no value" or "ten written as one-zero") → P64 (conceptual shift: re-walk Example 3's conversion, showing "A" contributes exactly the value 10 at its place, structurally identical to any numeral digit).
- **B02 (targets MC-2)**: P27 ("Remainder Order Not Reversed") → P41 (detect: present Example 1's remainders 1,0,1,1 in generation order and check if the student reads them as $1011_2$ instead of $1101_2$) → P64 (re-walk the repeated-division steps, physically stacking remainders bottom-up to show why the LAST remainder generated is the MOST significant digit).
- **B03 (targets MC-3)**: P27 ("Base-10 Place Values Assumed Universal") → P41 (detect: ask the student to evaluate a binary number using powers of 10 by mistake) → P64 (conceptual shift: re-walk Example 2's evaluation, explicitly using powers of 2 for each place, contrasting against the same digit string evaluated (incorrectly) with powers of 10).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.place-value`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 4 and difficulty = developing (above expanded-form's foundational 2 hours) reflect the added cognitive step of GENERALIZING place value to an arbitrary base, plus the repeated-division algorithm's multi-step procedure.
- MC-2 (remainder order) was ranked foundational severity because it is a purely procedural but completely conversion-breaking error — every digit of the final answer is correct in VALUE but wrong in POSITION if the reversal step is skipped, producing a number close to but not equal to the correct one, which can mask the error from casual inspection.
- Example 3's hexadecimal case was deliberately included (rather than stopping at binary/octal) because computing and networking contexts make hex the base where students most often encounter and misinterpret letter-digits, directly targeting MC-1's real-world relevance.

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
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: grouped objects before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
