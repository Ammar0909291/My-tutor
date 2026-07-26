# math.arith.exponent-rules

## Identity
- **KG ID**: `math.arith.exponent-rules`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.exponentiation`
- **Unlocks**: `math.alg.exponent-rules`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.arith.exponent-rules.md` (reused by reference throughout this entry).

## Learning Objective
The student will apply the product rule (aᵐ·aⁿ = aᵐ⁺ⁿ), power rule ((aᵐ)ⁿ = aᵐⁿ), quotient rule (aᵐ÷aⁿ = aᵐ⁻ⁿ), product-of-bases rule ((ab)ⁿ = aⁿbⁿ), and negative/zero-exponent rules, correctly distinguishing situations that require adding exponents from situations that require multiplying them.

## Core Understanding
Per the Blueprint's Component 1: every exponent rule is a derived consequence of the repeated-multiplication definition of aⁿ, recoverable by literally counting factors. The product rule (two separate exponential expressions with the same base, multiplied together) combines two separate groups of factors, so exponents ADD. The power rule (one exponential expression raised to another power) is repeated grouping of the SAME group, so exponents MULTIPLY. These are structurally different situations that happen to both involve exponents, and the single highest-leverage skill is recognizing which structure is present (two bases combined vs. one base raised again) before choosing whether to add or multiply.

## Mental Models
1. **The factor-counting model** (Blueprint TA-A01, the bookshelf analogy): x³·x⁴ is 3 factors of x followed by 4 more factors of x — 7 factors total, so exponents add; (x³)⁴ is four separate groups of 3 factors each — 12 factors total, so exponents multiply.
2. **The two-bases-vs-one-base-again diagnostic**: before applying any rule, ask "are there TWO exponential expressions being combined (product rule, add), or is ONE expression being raised to ANOTHER power (power rule, multiply)?"
3. **The reciprocal-pattern model**: the exponent pattern for a fixed base (…, 2⁻², 2⁻¹, 2⁰, 2¹, 2², …) shows each step up multiplies by the base and each step down divides by it — the negative-exponent side is simply the reciprocal of the corresponding positive-exponent side, and 2⁰ = 1 falls directly out of this same pattern.

## Why Students Fail
The single most common and foundational failure is confusing the product rule with the power rule — multiplying exponents when they should be added (x³·x⁴ read as x¹² instead of x⁷) — because both rules involve "two numbers and an exponent operation" on the surface, and only the underlying factor-counting structure distinguishes which operation (add or multiply) is correct. A secondary, mirror-image failure is the reverse confusion (adding when multiplication is required), and a third is interpreting a negative exponent as producing a negative NUMBER rather than a reciprocal.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — PRODUCT-RULE-MULTIPLIES-EXPONENTS** (FOUNDATIONAL)
  - **Blueprint description**: presented with x³·x⁴, multiplies exponents (x¹² instead of x⁷); confuses product rule (add) with power rule (multiply).
  - **Birth type**: Type 6, analogy overextension — the power rule's "multiply exponents" pattern, once learned, gets overextended by surface analogy to the product rule's superficially similar "two exponents present" structure.
  - **Repair approach**: Blueprint Repair Action B01, re-derived via the factor-counting expansion (TA-A01's bookshelf analogy: 3 factors followed by 4 factors = 7 factors total, not 3×4).

- **MC-2 — POWER-RULE-ADDS-EXPONENTS** (see Blueprint Component 2)
  - **Blueprint description**: presented with (x³)⁴, adds exponents (x⁷ instead of x¹²); confuses power rule (multiply) with product rule (add).
  - **Birth type**: Type 6, analogy overextension — the mirror-image confusion of MC-1, the product rule's "add exponents" pattern overextended to the power rule's structure.
  - **Repair approach**: Blueprint Repair Action B02, using TA-A03's explicit diagnostic question ("two bases combined, or one base raised again?") and factor-counting re-derivation.

- **MC-3 — NEGATIVE-EXPONENT-NEGATES** (see Blueprint Component 2)
  - **Blueprint description**: presented with 2⁻³, computes −2³ = −8 or −(1/8) instead of 1/2³ = 1/8; interprets negative exponent as a negative sign on the result.
  - **Birth type**: Type 4, notation-induced — the minus sign in the exponent position visually resembles a minus sign that would negate a result, even though it actually signals "take the reciprocal," a semantically unrelated operation.
  - **Repair approach**: Blueprint Repair Action B03, using TA-A04's pattern table (2⁻², 2⁻¹, 2⁰, 2¹, 2², …) to show the negative-exponent side is a reciprocal, never a negative number.

## Analogies
- **Bookshelf analogy** (Blueprint TA-A01): "3 shelves of 4 books plus 2 more shelves of 4 books = 5 shelves of 4 books total" — combining groups by counting shelves (adding), directly modeling why the product rule adds exponents rather than multiplying them.

## Demonstrations
- Explicit factor expansion of both x³·x⁴ (product rule) and (x³)⁴ (power rule) side by side, counting the resulting factors directly (Blueprint TA-A01).
- The pattern table for a fixed base (2⁻², 2⁻¹, 2⁰, 2¹, 2², 2³) showing the reciprocal relationship across zero and negative exponents (Blueprint TA-A04).

## Discovery Questions
1. "Does x³·x⁴ mean 'add the number of factors' or 'multiply the number of factors' — how would counting the actual factors settle it?"
2. "Are there TWO separate exponential expressions being combined here, or is ONE expression being raised to another power?"
3. "Does 2⁻³ produce a negative number, or something else entirely?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (factor-counting foundation via the bookshelf analogy) → TA-A02 (worked example pair: product rule, power rule) → TA-A03 (add-vs-multiply diagnostic contrast, plus the quotient/product-of-bases/negative/zero rules with derivations) → TA-A04 (negative exponents and quotient rule via pattern induction) → TA-A05 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the bookshelf factor-counting analogy (Blueprint TA-A01).
- **DO: Worked Example** — the product-rule/power-rule worked pair (Blueprint TA-A02).
- **TEST-THINKING: Prediction** — before applying a rule, predict whether it's a product-rule or power-rule situation using the two-bases-vs-one-base-again diagnostic (Blueprint TA-A03).
- **ORGANIZE: Pattern Table** — the base-2 exponent pattern table spanning negative to positive exponents (Blueprint TA-A04).

## Voice Teaching Notes
Before a student applies any rule to a mixed expression, ask them to answer the diagnostic question aloud first — "are there two bases being combined, or one base raised again?" — this single verbal habit (from Blueprint TA-A03) directly separates MC-1 from MC-2 before any arithmetic is attempted.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's GR-9 — cross_links=[])**: reused verbatim from the Blueprint's Component 4 TA-A05 — the square-area/cube-volume scenario using side length a³ and edge length a², including part (c)'s quotient-rule simplification to a⁰ = 1.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 4 TA-A05), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1/MC-2 confusion persists, regress to full factor expansion (writing out every individual factor) for every problem, with no shortcut notation permitted, until the add-vs-multiply distinction is solid from first principles, before returning to symbolic rule application.

## Memory Hooks
- "Two groups combined? Add. One group raised again? Multiply."
- "A negative exponent flips it to a fraction — it never makes the number negative."

## Transfer Connections
- `math.alg.exponent-rules` (unlocks) applies these identical rules to algebraic expressions with variable exponents and multi-term bases.

## Cross-Subject Connections
- Physics and chemistry: scientific notation and unit conversions rely directly on the product/quotient exponent rules (e.g., combining powers of 10).

## Blueprint References
`docs/curriculum/blueprints/math.arith.exponent-rules.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified via directory listing at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 1.
