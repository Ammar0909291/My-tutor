# Teaching Blueprint: Negative Exponent (`math.alg.negative-exponent`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.negative-exponent` |
| name | Negative Exponent |
| domain | Algebra |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.alg.exponent-rules` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | a⁻ⁿ = 1/aⁿ for a ≠ 0; enables writing reciprocals as powers and simplifying expressions with negative exponents.

 |

## Component 1 — Learning Objectives

- LO1: Rewrite $a^{-n}$ as $\frac{1}{a^n}$, and conversely rewrite $\frac{1}{a^n}$ as $a^{-n}$.
- LO2: Simplify expressions containing negative exponents in DENOMINATORS, correctly recognizing $\frac{1}{a^{-n}}=a^n$ (a negative exponent in the denominator flips to a positive exponent in the numerator).
- LO3: Correctly distinguish a NEGATIVE exponent (which produces a reciprocal, NOT a negative number) from a negative BASE or a negative overall VALUE — a negative exponent does not, by itself, make the result negative.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.exponent-rules` (the general laws this concept's negative-exponent rule extends).

## Component 3 — Core Explanation

For any nonzero $a$: $a^{-n}=\frac{1}{a^n}$ — a negative exponent means TAKE THE RECIPROCAL of the base raised to the corresponding POSITIVE exponent. This lets reciprocals be written uniformly as powers, extending the exponent-rule system to negative integers consistently (following the same pattern the quotient rule would predict: $\frac{a^0}{a^n}=a^{0-n}=a^{-n}=\frac{1}{a^n}$).

By extension, a negative exponent appearing in a DENOMINATOR flips to a positive exponent in the numerator: $\frac{1}{a^{-n}}=a^n$ (applying the same rule to the reciprocal of a reciprocal).

## Component 4 — Worked Examples

**Example 1 (LO1 — basic rewriting)**: $3^{-2}=\frac{1}{3^2}=\frac{1}{9}$.

**Example 2 (LO2 — negative exponent in a denominator flips up, breaking MC-1)**: Simplify $\frac{5}{x^{-3}}$. Since $\frac{1}{x^{-3}}=x^3$: $\frac{5}{x^{-3}}=5\times x^3=5x^3$. A common error treats the negative exponent as simply "canceling" to nothing, or moves it incorrectly (e.g. producing $\frac{5}{x^3}$ instead), rather than correctly recognizing that a negative exponent in a denominator FLIPS to become a positive exponent in the numerator.

**Example 3 (LO3 — negative exponent does not mean negative value, breaking MC-2)**: Evaluate $2^{-3}$: this equals $\frac{1}{2^3}=\frac{1}{8}$ — a POSITIVE number (specifically, a fraction less than 1), NOT $-8$ or any negative value. A common error assumes a negative exponent automatically produces a negative RESULT, conflating "negative exponent" with "negative output" — these are entirely different concepts; the exponent's sign determines whether you take a reciprocal, not whether the final value is positive or negative (which instead depends on the BASE's sign and whether the exponent is even/odd, an entirely separate consideration).

## Component 5 — Teaching Actions

### Teaching Action A01 — Negative Exponent Means Take the Reciprocal (Primitive P64: Conceptual Shift)

Work Example 1, explicitly connecting $a^{-n}$ to "the reciprocal of $a^n$," reinforcing this as a RECIPROCAL operation, not a sign-flip on the result.

### Teaching Action A02 — Flipping Between Numerator and Denominator (Primitive P06: Contrast Pair)

Work Example 2, contrasting the correct flip-to-numerator result ($5x^3$) against flawed alternatives (canceling to nothing, or misplacing the exponent), showing the flip is symmetric: "a negative exponent flips its base between numerator and denominator, becoming positive in its new location."

- **MC-1 hook**: this directly targets MC-1 (mishandling a negative exponent located in a denominator).

### Teaching Action A03 — Negative Exponent ≠ Negative Value (Primitive P06: Contrast Pair, second pairing)

Work Example 3, explicitly computing $2^{-3}=\frac18$ (positive) and contrasting against the flawed assumption that it should be $-8$ or otherwise negative. State the rule: "the exponent's SIGN tells you whether to reciprocate — it says nothing directly about whether the final VALUE is positive or negative; that depends separately on the base."

- **MC-2 hook**: this directly targets MC-2 (assuming a negative exponent produces a negative result).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Rewrite $4^{-3}$ as a fraction and evaluate it.
  2. Simplify $\frac{7}{y^{-2}}$.
  3. Determine whether $5^{-2}$ is positive or negative, and state its value.
  4. Simplify $\frac{x^{-4}}{y^{-2}}$, correctly flipping both negative exponents.
- **P76 (Transfer Probe, mode = independence)**: "A physics formula for light intensity includes the term $d^{-2}$ (inverse-square law), where $d$ is distance. (a) Rewrite $d^{-2}$ using positive-exponent notation, and explain what this reveals about how intensity changes as distance increases (does the expression grow or shrink as $d$ grows?). (b) A student argues that since the exponent is negative, the intensity term itself must be negative — explain, using this lesson's negative-exponent-vs-negative-value distinction, why this reasoning is incorrect, and what the exponent's sign actually tells us here."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NEGATIVE-EXPONENT-IN-DENOMINATOR-MISHANDLED | Incorrectly canceling or misplacing a negative exponent found in a denominator, rather than correctly flipping it to a positive exponent in the numerator | Foundational |
| MC-2 | NEGATIVE-EXPONENT-ASSUMED-TO-PRODUCE-NEGATIVE-VALUE | Believing a negative exponent automatically makes the result negative, conflating exponent sign with output sign | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Negative Exponent in Denominator Mishandled") → P41 (detect: present Example 2 and check whether $5x^3$ or an incorrect alternative is produced) → P64 (conceptual shift: re-derive by first rewriting $\frac{1}{x^{-3}}$ as $\frac{1}{\frac{1}{x^3}}$ explicitly, showing this simplifies to $x^3$ via the "dividing by a fraction" rule).
- **B02 (targets MC-2)**: P27 ("Negative Exponent Assumed to Produce Negative Value") → P41 (detect: ask whether $2^{-3}$ is positive or negative and check the reasoning given) → P64 (conceptual shift: re-derive $2^{-3}=\frac{1}{8}$ explicitly, confirming the positive result, and separately discuss that a negative RESULT would instead require a negative BASE with an odd exponent).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.exponent-rules`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.zero-exponent` (a sibling special-case exponent rule).

## Component 8 — Teaching Notes

- estimated_hours = 2 reflects that this concept is a direct, well-scoped extension of the exponent-rule system, with MC-2's conceptual distinction being the genuinely demanding part beyond mechanical rewriting.
- MC-2 was ranked equally foundational to MC-1 despite being purely conceptual (not computational) because it represents a fundamental conflation that, left uncorrected, undermines correct interpretation of negative-exponent results throughout all later algebra and applied science work.
- The inverse-square-law transfer probe was deliberately chosen because negative exponents appear constantly in physics formulas (gravity, light intensity, etc.), giving this abstract rule genuine applied significance while directly testing MC-2's correction in an authentic scientific-reasoning context.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.exponent-rules`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
