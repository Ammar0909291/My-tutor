# Teaching Blueprint: Multiplying Rational Expressions (`math.alg.rational-expressions-multiplication`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.rational-expressions-multiplication` |
| name | Multiplying Rational Expressions |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.alg.rational-expressions` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Multiplying rational expressions: multiply numerators together and denominators together, then simplify by canceling common factors; dividing means multiplying by the reciprocal. |

## Component 1 — Learning Objectives

- LO1: Multiply two rational expressions by multiplying numerators together and denominators together, THEN simplifying by canceling common factors.
- LO2: Divide two rational expressions by multiplying by the RECIPROCAL of the second (flip and multiply), correctly identifying which expression's numerator/denominator swap.
- LO3: FACTOR BEFORE multiplying (rather than after) whenever possible, to cancel common factors early and avoid needlessly expanding large polynomial products.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.rational-expressions` (what a rational expression is) — this concept extends numeric fraction multiplication/division to algebraic expressions.

## Component 3 — Core Explanation

**Multiplying rational expressions**: $\frac{A}{B}\times\frac{C}{D}=\frac{AC}{BD}$ — multiply numerators together, denominators together, then simplify by canceling any common factors between the resulting numerator and denominator.

**Dividing rational expressions**: $\frac{A}{B}\div\frac{C}{D}=\frac{A}{B}\times\frac{D}{C}=\frac{AD}{BC}$ — multiply by the RECIPROCAL of the divisor (flip the SECOND fraction, then multiply as usual).

The most EFFICIENT approach FACTORS each numerator and denominator FIRST, before multiplying — this lets common factors cancel immediately (across the diagonal, between any numerator and any denominator), avoiding the need to expand large products and then re-factor them afterward.

## Component 4 — Worked Examples

**Example 1 (LO1, LO3 — factor first, then cancel, breaking MC-1)**: Multiply $\frac{x^2-4}{x+3}\times\frac{x+3}{x-2}$. Factor first: $\frac{(x+2)(x-2)}{x+3}\times\frac{x+3}{x-2}$. Cancel the common factor $(x+3)$ (appears in one numerator and the other denominator) and $(x-2)$ (appears in one numerator and the other denominator): result $=x+2$. A common error multiplies out FIRST (getting a large expanded product in both numerator and denominator) and only THEN attempts to factor and cancel — this works but is far less efficient and more error-prone than canceling common factors immediately upon recognizing them.

**Example 2 (LO2 — division via reciprocal, breaking MC-2)**: Divide $\frac{x+1}{x-5}\div\frac{x+1}{x+2}$. Flip the SECOND fraction and multiply: $\frac{x+1}{x-5}\times\frac{x+2}{x+1}$. Cancel the common factor $(x+1)$: result $=\frac{x+2}{x-5}$. A common error flips the WRONG fraction (the first one, or both), producing an incorrect setup — only the DIVISOR (the second fraction, the one being divided BY) gets flipped; the first fraction (the dividend) stays exactly as it is.

**Example 3 (LO3 — canceling factors diagonally across two different fractions)**: Multiply $\frac{2x}{x^2-9}\times\frac{x-3}{4}$. Factor: $\frac{2x}{(x+3)(x-3)}\times\frac{x-3}{4}$. The factor $(x-3)$ appears in the FIRST fraction's denominator and the SECOND fraction's numerator — these can cancel EVEN THOUGH they're not in the same fraction, since after multiplying, all numerators combine and all denominators combine into one shared numerator/denominator. Result: $\frac{2x}{(x+3)\times4}=\frac{2x}{4(x+3)}=\frac{x}{2(x+3)}$ (further simplifying the numeric factor of 2).

## Component 5 — Teaching Actions

### Teaching Action A01 — Factor Before Multiplying, Cancel Immediately (Primitive P06: Contrast Pair)

Work Example 1's efficient factor-first approach against the flawed multiply-then-factor approach, showing both reach the same answer but the factor-first method avoids unnecessary large-polynomial expansion. State the rule: "always factor every numerator and denominator FIRST — cancellation opportunities are much easier to spot before multiplying everything out."

- **MC-1 hook**: this directly targets MC-1 (multiplying out fully before attempting to factor and simplify).

### Teaching Action A02 — Division: Flip Only the Divisor (Primitive P64: Conceptual Shift)

Work Example 2, explicitly identifying which fraction is the DIVISOR (the one after the ÷ symbol) and flipping ONLY that one, connecting back to numeric fraction division's identical rule.

- **MC-2 hook**: this directly targets MC-2 (flipping the wrong fraction, or both, during division).

### Teaching Action A03 — Factors Cancel Diagonally, Across Different Fractions (Primitive P11: Representation Shift)

Work Example 3, explicitly showing the canceling factor $(x-3)$ living in DIFFERENT fractions' numerator and denominator before multiplication, grounding why this cross-fraction cancellation is valid (since multiplication combines everything into one shared fraction anyway).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Multiply $\frac{x^2-9}{x+5}\times\frac{x+5}{x+3}$, factoring first.
  2. Divide $\frac{x-2}{x+4}\div\frac{x-2}{x-1}$, correctly identifying and flipping the divisor.
  3. Multiply $\frac{3x}{x^2-16}\times\frac{x-4}{6}$, canceling factors across the two fractions.
  4. Explain, in one sentence, why factoring before multiplying is generally more efficient than multiplying out fully first.
- **P76 (Transfer Probe, mode = independence)**: "A rate problem involves the expression $\frac{x^2-1}{x+3}\div\frac{x-1}{x^2-9}$ representing a combined speed calculation. (a) Rewrite the division as multiplication by the reciprocal, being careful to flip only the correct (divisor) fraction. (b) Factor every numerator and denominator before multiplying, and simplify fully — explain, using this lesson's efficiency rule, why factoring first made the cancellation in this particular problem noticeably easier to spot than it would have been after multiplying out the unfactored expressions."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MULTIPLIED-BEFORE-FACTORING-INSTEAD-OF-AFTER | Multiplying numerators and denominators out fully before attempting to factor and cancel, rather than factoring first for easier, more direct cancellation | Moderate |
| MC-2 | WRONG-FRACTION-FLIPPED-DURING-DIVISION | Flipping the first (dividend) fraction, or both fractions, instead of only the second (divisor) fraction when converting division to multiplication | Foundational |
| MC-3 | CROSS-FRACTION-CANCELLATION-MISSED | Failing to recognize that a factor in one fraction's numerator can cancel with the same factor in the OTHER fraction's denominator, only canceling within a single fraction | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Multiplied Before Factoring") → P41 (detect: review a submitted solution for a fully-expanded intermediate step before any factoring) → P64 (conceptual shift: re-work the same problem factoring first, comparing the efficiency directly).
- **B02 (targets MC-2)**: P27 ("Wrong Fraction Flipped During Division") → P41 (detect: present Example 2 and check which fraction gets flipped) → P64 (conceptual shift: re-state the rule explicitly — "only the DIVISOR, the fraction after ÷, gets flipped" — connecting to the parallel numeric-fraction division rule).
- **B03 (targets MC-3)**: P27 ("Cross-Fraction Cancellation Missed") → P41 (detect: present Example 3 and check whether the $(x-3)$ cancellation across the two fractions is spotted) → P64 (conceptual shift: re-combine both fractions into one single fraction (numerator×numerator over denominator×denominator) FIRST, making all cancellation opportunities visible in one place).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.rational-expressions`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.rational-expressions-addition`, `math.alg.rational-equations` (sibling concepts in this domain's rational-expression cluster).

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that multiplication/division of rational expressions is procedurally more straightforward than addition/subtraction (no common-denominator step needed), but the factor-first efficiency habit and division's flip-rule each require dedicated practice.
- MC-2 was ranked most severe because it is a genuine structural setup error (unlike MC-1's mere inefficiency) — flipping the wrong fraction produces a completely different, generally wrong final expression, not just a messier path to the right one.
- The rate-problem transfer probe was deliberately designed to combine BOTH major skills (correct reciprocal-flipping for division, AND factor-first efficient cancellation) in a single realistic scenario, testing genuine synthesis rather than either skill in isolation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.rational-expressions`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
