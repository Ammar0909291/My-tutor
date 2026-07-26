# math.arith.integer-arithmetic

## Identity
- **KG ID**: `math.arith.integer-arithmetic`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.negative-numbers`, `math.arith.multiplication`
- **Unlocks**: `math.nt.divisibility`, `math.arith.fractions`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.arith.integer-arithmetic.md` (reused by reference throughout this entry).

## Learning Objective
The student will fluently compute all four operations on signed integers, correctly apply order of operations together with sign rules (distinguishing −3² from (−3)²), and determine the sign of a multi-factor product or quotient by counting negative factors without full computation.

## Core Understanding
Per the Blueprint's Component 3: this concept is a *consolidation and fluency* layer, not a new-concept layer — it does not introduce new sign-rule reasoning so much as demand fast, integrated four-operation computation building on already-taught pieces (`math.arith.negative-numbers`'s sign rules, `math.arith.multiplication`'s repeated-addition grounding). The multiplication/division sign rule (same signs → positive, different signs → negative) combines with a negative-factor-counting shortcut (odd count of negative factors → negative product; even count → positive) and with careful attention to how a leading unary minus interacts with exponentiation (−3² = −(3²) = −9, since the exponent binds before the unary minus, whereas (−3)² = 9 because the parentheses make the minus part of the base).

## Mental Models
1. **The sign-rule table model**: a compact 2×2 table (same signs → +, different signs → −) governs both multiplication and division uniformly.
2. **The negative-factor tally model**: for a product of several signed numbers, count how many factors are negative — odd count flips the sign of the whole product, even count leaves it positive — without needing to track signs step by step.
3. **The base-vs-result model**: whether a minus sign is "inside" the base being exponentiated (parentheses present, e.g. (−3)²) or "outside," applied after exponentiation (no parentheses, e.g. −3²) changes the answer entirely.

## Why Students Fail
The dominant failure is over-applying newly-drilled sign-rule fluency into territory it doesn't govern — specifically treating −3² as if the minus were part of the base being squared, an order-of-operations error disguised as a sign-rule error. A second failure is misapplying "negatives cancel in pairs" reasoning to negative-factor counting, assuming any count beyond two automatically resolves to positive rather than correctly tracking odd/even parity.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — NEGATIVE-BASE-EXPONENT-ORDER-ERROR** (FOUNDATIONAL)
  - **Blueprint description**: evaluating −a² as (−a)² (applying the minus to the base before exponentiation, instead of after).
  - **Birth type**: Type 4, notation-induced — the absence of parentheses around a negative base is easy to overlook visually, and the heavy sign-rule drilling this fluency concept requires (Blueprint TA-A01) can itself prime students to apply "same-sign-positive" reasoning where an order-of-operations rule, not a sign rule, actually governs.
  - **Repair approach**: Blueprint Teaching Action A02 Contrast 1 — side-by-side computation of −3² and (−3)², with the explicit rule "no parentheses around a negative base means the exponent applies first, and the minus sign is applied last."

- **MC-2 — SIGN-COUNTING-OVERGENERALIZED-CANCELLATION** (Moderate)
  - **Blueprint description**: misapplying "negatives cancel in pairs" reasoning instead of correctly counting odd/even.
  - **Birth type**: Type 1, overgeneralization — a correct heuristic for exactly two negative factors ("two negatives make a positive") gets overgeneralized to any count of negative factors beyond two, without re-deriving the actual odd/even parity rule.
  - **Repair approach**: Blueprint Teaching Action A02 Contrast 2 — comparing a 3-negative-factor product against a 4-negative-factor product, correcting to explicit tallying.

- **MC-3 — ZERO-DIVISION-SIGN-CONFUSION** (Minor)
  - **Blueprint description**: believing division by 0 has some determinable sign, instead of recognizing it as undefined.
  - **Birth type**: Type 6, analogy overextension — sign rules are overextended by analogy into a case (division by zero) where no quotient exists at all, so no sign question is even meaningful.
  - **Repair approach**: Blueprint Repair Action B03 — direct correction that division by 0 is undefined categorically, not a sign-rule case.

## Analogies
- **Light-switch tally analogy**: each negative factor is like flipping a light switch once — starting from "on" (positive), an odd number of flips ends "off" (negative), an even number ends back "on" (positive), directly modeling the negative-factor-counting shortcut.

## Demonstrations
- Compact sign-rule table (Blueprint TA-A01) drilled with rapid-fire signed products/quotients, stating sign first, then magnitude.
- Side-by-side −3² vs. (−3)² computed explicitly (Blueprint TA-A02 Contrast 1), directly targeting MC-1.

## Discovery Questions
1. "Does −3² mean 'negate 3, then square the result' or 'square 3, then negate the result' — and does the answer change depending on which?"
2. "If a product has five negative factors, is the whole product positive or negative — and how do you know without multiplying everything out?"
3. "What sign does −7 ÷ 0 have?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (multiplication/division sign-rule fluency drill) → TA-A02 (order-of-operations-with-signs contrast + negative-factor-counting shortcut) → TA-A03 (composite multi-step expression forcing all rules together) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **DO: Drill/Practice** — rapid-fire signed product/quotient fluency drill (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the −3² vs. (−3)² contrast (Blueprint TA-A02).
- **DO: Worked Example** — the composite multi-step expression (Blueprint TA-A03).
- **TEST-THINKING: Prediction** — predict the sign of a multi-factor product before computing magnitude.

## Voice Teaching Notes
When a student states an answer to a signed computation, ask for the SIGN first, separately from the magnitude — this separation (established in Blueprint TA-A01) builds the speed this fluency-heavy concept targets and surfaces MC-1/MC-2 immediately if the sign alone is wrong.

## Assessment Signals
- **P76 (transfer probe, independence mode — KG lists no cross-links)**: reused verbatim from the Blueprint's Component 5 A04 — the chemistry temperature-log and error-correction-factor scenario.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, regress to explicitly writing out the exponentiation step BEFORE any sign is applied for every problem (e.g., "3² = 9, THEN negate: −9") until the two-step sequencing becomes automatic, before returning to compressed notation.

## Memory Hooks
- "No parentheses, no protection — the exponent goes first, the minus goes last."
- "Count the negatives: odd flips it, even keeps it."

## Transfer Connections
- `math.nt.divisibility` (unlocks) builds directly on integer division/multiplication fluency established here.
- `math.arith.fractions` (unlocks) requires fluent signed-integer numerator/denominator operations.

## Cross-Subject Connections
No direct cross-subject connections identified for this concept beyond the P76 transfer probe's chemistry-log framing; its primary transfer value is within mathematics (number theory, fractions).

## Blueprint References
`docs/curriculum/blueprints/math.arith.integer-arithmetic.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link check (V-5) confirms none listed; independently re-verified against the live KG at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 1.
