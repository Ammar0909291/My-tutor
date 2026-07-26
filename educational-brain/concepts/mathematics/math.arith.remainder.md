# math.arith.remainder

## Identity
- **KG ID**: `math.arith.remainder`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.division`
- **Unlocks**: `math.nt.modular-arithmetic`
- **Cross-links**: `math.nt.modular-arithmetic` — confirmed NOT yet authored (no Blueprint) — P76_mode = independence per the Blueprint's own GR-9 finding.
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.arith.remainder.md` (reused by reference throughout this entry).

## Learning Objective
The student will compute the remainder of a÷b and correctly state it as satisfying a = bq + r with 0 ≤ r < b, correctly recover the true integer remainder from a decimal quotient, and correctly handle remainders with negative dividends under the standard non-negative-remainder convention.

## Core Understanding
Per the Blueprint's Component 1: this concept names and formalizes the "leftover" that division alone leaves informally described. The formal relationship a = bq + r, 0 ≤ r < b, has two critical, non-obvious consequences: (1) a decimal quotient's fractional part is r/b, NOT r itself — recovering r requires multiplying the decimal part by the divisor (17÷5 = 3.4 means r = 0.4×5 = 2, not "0.4" or "4"); (2) the remainder must always be strictly less than the divisor and never negative, even for negative dividends, which can require choosing a quotient one integer lower than the naive "round toward zero" choice (−17÷5 gives q = −4, r = 3, not q = −3, r = −2).

## Mental Models
1. **The sharing-with-leftovers model**: dividing a objects into groups of b, the remainder is the physically countable leftover that doesn't form a complete group.
2. **The decimal-part-times-divisor model**: to recover the true integer remainder from a decimal quotient, multiply the fractional part by the divisor — the decimal digits themselves are never the remainder.
3. **The range-check model**: every remainder answer must be verified against 0 ≤ r < b; a leftover ≥ b means the division isn't finished, and a negative "remainder" from a negative dividend means the quotient needs adjusting down by one.

## Why Students Fail
Per the Blueprint's Component 8: MC-1 is the highest-leverage misconception because decimal division (via calculator or standard algorithm) is the most common way students first encounter a division result, and reading the decimal digits directly as "the remainder" is an immediate, persistent temptation unless explicitly broken with side-by-side conversions. MC-2 and MC-3 are secondary refinements of the same underlying discipline — always verify 0 ≤ r < b explicitly — applied to two failure directions: stopping the subtraction too early (leftover too big) and negative dividends (naive remainder negative).

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — DECIMAL-DIGITS-ARE-THE-REMAINDER** (FOUNDATIONAL)
  - **Blueprint description**: student reads the decimal part of a division result as directly giving the remainder (e.g., treating 3.4 as "remainder 4" or "remainder 0.4"), rather than computing the true integer remainder via a − bq.
  - **Birth type**: Type 4, notation-induced — the decimal quotient's digits visually resemble a plausible "remainder," and nothing in the decimal notation itself signals that a further conversion step (multiplying the fractional part by the divisor) is required.
  - **Repair approach**: Blueprint Repair Action B01 — the decimal-vs-integer-remainder side-by-side conversion table (Component 4 A02 Contrast 1).

- **MC-2 — REMAINDER-CAN-EQUAL-OR-EXCEED-DIVISOR** (see Blueprint Component 2)
  - **Blueprint description**: student computes a "leftover" value ≥ the divisor, without recognizing the quotient was chosen too small.
  - **Birth type**: Type 5, instruction-induced — a long-division procedure stopped one subtraction step too early produces a technically-computed-but-invalid leftover, and without an explicit range check habit, the error is invisible to the student who performed the subtraction correctly up to that point.
  - **Repair approach**: Blueprint Repair Action B02 — the too-early-stopped-subtraction contrast (Component 4 A02 Contrast 2), correcting via explicit range verification.

- **MC-3 — NEGATIVE-DIVIDEND-GIVES-NEGATIVE-REMAINDER** (see Blueprint Component 2)
  - **Blueprint description**: student computes the remainder of a negative dividend using the naive relationship (allowing r < 0), rather than applying the standard convention 0 ≤ r < b.
  - **Birth type**: Type 2, perceptual intuition — the naive "round toward zero" quotient feels like the natural first choice for a negative dividend, and the requirement to adjust the quotient one integer lower to keep r non-negative is not perceptually obvious.
  - **Repair approach**: Blueprint Repair Action B03 — the negative-dividend convention made explicit (Component 4 A02 Contrast 3), with the "decrease q by exactly 1 when the naive r is negative" rule of thumb.

## Analogies
- **Debt-and-full-payments analogy**: a negative dividend is like an unpaid debt measured in units of b; the quotient counts full "payments" of size b, and the remainder is what's still owed after all full payments are counted — the convention that r stays non-negative mirrors "you can't owe a negative amount of leftover debt."

## Demonstrations
- Concrete sharing (17 objects into groups of 5, 2 left over) before the formal a = bq + r relationship (Blueprint Component 4 A01, Stage C).
- The decimal-digit-vs-true-remainder comparison table across several divisions (Blueprint Component 4 A02, Contrast 1), directly targeting MC-1.

## Discovery Questions
1. "If 17÷5 = 3.4, is the remainder '4,' '0.4,' or something else — how would you check?"
2. "If your computed leftover is bigger than the divisor, does that mean the division is finished?"
3. "Can a remainder ever be negative, even when the number you're dividing is negative?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: A01 (leftovers, formalized — concrete sharing → decimal connection) → A02 (decimal ≠ remainder; remainder < divisor always; negative dividends, via three contrasts) → A03 (Mastery Gate, P91). Blueprint Component 6 (P89 Spaced Repetition) schedules 4 follow-up reviews at +1/+3/+7/+14 days.

## Tutor Actions
- **SHOW: Demonstration** — concrete sharing-with-leftovers (Blueprint A01, Stage C).
- **ORGANIZE: Matching** — the decimal-vs-true-remainder comparison table (Blueprint A02, Contrast 1).
- **TEST-THINKING: Error Analysis** — the too-early-stopped-subtraction scenario (Blueprint A02, Contrast 2).
- **DO: Worked Example** — the negative-dividend adjustment procedure (Blueprint A02, Contrast 3).

## Voice Teaching Notes
Whenever a remainder answer is given, prompt the two-part verification habit aloud: "does bq+r reconstruct a? And is r between 0 and b?" — this verbal habit (established in Blueprint's P49 checkpoint) catches MC-1, MC-2, and MC-3 uniformly, since all three are failures of this same range-check discipline.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's GR-9 — `math.nt.modular-arithmetic` confirmed unauthored)**: reused verbatim from the Blueprint's Component 4 A03 — the vending-machine negative-inventory scenario, including part (b)'s argument for why the standard convention picks one specific (q, r) pair out of many equation-satisfying options.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 4 A03), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists after the comparison table, regress to purely whole-number sharing scenarios (no decimal quotient shown at all) until the concrete leftover concept is solid, then reintroduce the decimal connection as a separate, later step.

## Memory Hooks
- "The decimal digits aren't the remainder — multiply the decimal part by the divisor to find it."
- "Check the range: 0 ≤ r < b, every time, no exceptions."

## Transfer Connections
- `math.nt.modular-arithmetic` (unlocks) is defined directly in terms of remainders (a ≡ b mod n iff they share the same remainder upon division by n).

## Cross-Subject Connections
- Computer science: the modulo operation in programming directly implements this concept's a = bq + r relationship, and many languages' modulo behavior on negative operands mirrors the exact convention question this concept addresses (MC-3).

## Blueprint References
`docs/curriculum/blueprints/math.arith.remainder.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (GR-9, `math.nt.modular-arithmetic` unauthored) was independently re-verified via directory listing at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 1.
