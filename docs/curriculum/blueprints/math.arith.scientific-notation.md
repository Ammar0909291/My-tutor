# Teaching Blueprint: Scientific Notation (`math.arith.scientific-notation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.scientific-notation` |
| name | Scientific Notation |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.arith.exponentiation`, `math.arith.decimals` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Writing a number as a × 10ⁿ where 1 ≤ |a| < 10 and n is an integer, enabling compact representation of very large or very small quantities.

 |

## Component 1 — Learning Objectives

- LO1: Convert a standard-form number (large or small) into scientific notation $a\times10^n$ with $1\le|a|<10$.
- LO2: Convert a number from scientific notation back into standard form.
- LO3: Correctly determine the SIGN of the exponent $n$ — positive for numbers $\ge10$, negative for numbers strictly between 0 and 1.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.exponentiation` (what $10^n$ means) and `math.arith.decimals` (the decimal representation being restructured into this compact form).

## Component 3 — Core Explanation

**Scientific notation** writes a number as $a\times10^n$, where $1\le|a|<10$ (a single nonzero digit before the decimal point) and $n$ is an integer. This compactly represents very large or very small numbers: moving the decimal point LEFT (to shrink $a$ into the $1\le|a|<10$ range) corresponds to a POSITIVE exponent; moving the decimal point RIGHT (to grow $a$ up into that range from a small number) corresponds to a NEGATIVE exponent.

The number of decimal-point positions moved directly determines $|n|$; the DIRECTION moved (to make $a$'s magnitude land in $[1,10)$) determines whether $n$ is positive or negative.

## Component 4 — Worked Examples

**Example 1 (LO1 — large number, positive exponent)**: Convert $45{,}000$ to scientific notation. Move the decimal point left until one digit remains before it: $4.5$, moved 4 places left. Result: $4.5\times10^4$. Check: $4.5\times10^4=4.5\times10{,}000=45{,}000$. ✓

**Example 2 (LO1, LO3 — small number, negative exponent, breaking MC-1)**: Convert $0.00032$ to scientific notation. Move the decimal point RIGHT until one nonzero digit remains before it: $3.2$, moved 4 places right. Since the number is SMALLER than 1, the exponent must be NEGATIVE: $3.2\times10^{-4}$. A common error uses a positive exponent here (writing $3.2\times10^{4}$) by counting the number of places moved correctly but forgetting that moving right (for small numbers) requires a negative sign, not a positive one.

**Example 3 (LO2 — converting back to standard form)**: Convert $6.02\times10^{23}$ to standard form: move the decimal point 23 places RIGHT (since the exponent is positive), giving $602{,}000{,}000{,}000{,}000{,}000{,}000{,}000$. Convert $1.5\times10^{-3}$ to standard form: move the decimal point 3 places LEFT (since the exponent is negative), giving $0.0015$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Move the Decimal Point Until One Digit Remains Before It (Primitive P64: Conceptual Shift)

Work Example 1 step by step, physically marking each decimal-point shift and counting the moves, connecting the count directly to the exponent's magnitude.

- **MC-1 hook**: present Example 2's small-number conversion and check whether the exponent sign is correctly assigned as negative (revealing MC-1: correctly counting the number of decimal-point moves but assigning the wrong sign to the exponent, especially for numbers less than 1).

### Teaching Action A02 — Direction of the Shift Determines the Exponent's Sign (Primitive P06: Contrast Pair)

Contrast Example 1's large-number case (decimal point moves LEFT, exponent POSITIVE) against Example 2's small-number case (decimal point moves RIGHT, exponent NEGATIVE) side by side. State the rule: "large numbers (≥10) get positive exponents; small numbers (between 0 and 1) get negative exponents — check the number's actual SIZE, not just how far the point moved."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Convert $780{,}000$ to scientific notation.
  2. Convert $0.0000091$ to scientific notation, being careful with the exponent's sign.
  3. Convert $2.3\times10^6$ to standard form.
  4. Convert $7.1\times10^{-5}$ to standard form.
- **P76 (Transfer Probe, mode = independence)**: "A biology textbook states the diameter of a typical bacterium as approximately $0.000002$ meters, and the population of a large city as approximately $8{,}400{,}000$ people. (a) Convert both quantities to scientific notation. (b) Explain, using this lesson's sign rule, why the bacterium's exponent is negative while the city's population exponent is positive, even though both required moving the decimal point roughly the same number of places (6 places for the bacterium's diameter, versus about 6-7 for the population)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EXPONENT-SIGN-REVERSED-FOR-SMALL-NUMBERS | Assigning a positive exponent to a small number's scientific notation (or vice versa), regardless of the direction the decimal point actually moved | Foundational |
| MC-2 | COEFFICIENT-RANGE-VIOLATED | Writing the coefficient $a$ outside the required range $1\le|a|<10$ (e.g. leaving it as $45\times10^3$ instead of $4.5\times10^4$) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Exponent Sign Reversed for Small Numbers") → P41 (detect: present Example 2 and check whether a positive or negative exponent is assigned) → P64 (conceptual shift: re-derive by checking the original number's actual size against 1 first — "is it bigger or smaller than 1?" — before assigning the sign).
- **B02 (targets MC-2)**: P27 ("Coefficient Range Violated") → P41 (detect: review a submitted scientific-notation answer for a coefficient outside $[1,10)$) → P64 (conceptual shift: re-walk the decimal-point-shifting process, continuing to move the point until EXACTLY one nonzero digit remains before it, adjusting the exponent to match).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.exponentiation`, `math.arith.decimals`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that scientific notation combines decimal manipulation with careful exponent-sign bookkeeping, a genuinely error-prone combination even once each individual skill is separately understood.
- MC-1 was ranked most severe because it produces an answer that is off by a factor of $10^{2n}$ (a MASSIVE magnitude error) despite every digit being correct — the coefficient and the count of decimal places moved can both be exactly right while the sign error alone renders the result catastrophically wrong.
- The bacterium/city transfer probe was deliberately paired (a very small quantity and a very large one, converted side by side) specifically to force explicit application of the sign rule in both directions within the same task, rather than practicing large-number and small-number conversions in separate, potentially un-connected drills.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.exponentiation`, `math.arith.decimals`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO1/LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
