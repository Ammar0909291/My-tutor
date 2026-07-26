# math.nt.divisibility-rules

## Identity
- **KG ID**: `math.nt.divisibility-rules`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.divisibility`
- **Unlocks**: (none in current KG)
- **Cross-links**: none (KG lists none).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: none found (`docs/curriculum/blueprints/math.nt.divisibility-rules.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will apply shortcut divisibility rules to determine whether a number is divisible by 2, 3, 4, 5, 6, 8, 9, 10, or 11 directly from its decimal digits, without performing the actual division, correctly distinguishing rules that superficially resemble each other (3 vs. 9) and correctly applying multi-digit rules (4, 8) rather than over-applying single-digit shortcuts.

## Core Understanding
Each divisibility rule is a shortcut derived from how place value interacts with the divisor: rules for 2, 5, and 10 depend only on the LAST digit, because every power of 10 beyond the ones place is itself divisible by 2, 5, and 10; the rule for 4 depends on the last TWO digits (since 100 is divisible by 4, every digit beyond the tens place contributes a multiple of 4 automatically), and similarly 8 depends on the last THREE digits (since 1000 is divisible by 8); the rules for 3 and 9 both use the digit sum, differing only in what that sum must be divisible by (3 or 9 respectively) — a genuinely deep fact rooted in 10 ≡ 1 (mod 3) and 10 ≡ 1 (mod 9); and the rule for 11 uses an ALTERNATING digit sum, rooted in 10 ≡ −1 (mod 11). Because several of these rules share a similar "look" (checking digit sums, checking trailing digits), the single highest-leverage discipline is matching each rule to its correct scope — how many trailing digits to check, or what threshold a digit sum must clear — rather than applying a memorized-but-generic "check the digits" habit indiscriminately.

## Mental Models
1. **The place-value-power model**: each rule's scope (how many trailing digits matter) is determined by the smallest power of 10 that the divisor evenly divides — 2, 5, 10 need only 1 digit (10¹); 4 needs 2 digits (10² is the first power of 10 divisible by 4); 8 needs 3 digits (10³).
2. **The digit-sum-threshold model**: the rules for 3 and 9 use the IDENTICAL digit-sum procedure, differing only in the divisor the sum must satisfy — always double-check which threshold (3 or 9) the specific rule being applied requires.
3. **The alternating-sign model**: the rule for 11 requires assigning alternating + and − signs to digits (starting from a fixed end, typically the ones digit) before summing — a genuinely different procedure from the plain digit-sum rules for 3 and 9, not a variant of them.

## Why Students Fail
The dominant failure is conflating the digit-sum rule for 3 with the digit-sum rule for 9 (or vice versa), using the wrong threshold since both rules look procedurally identical apart from that threshold. A second failure is overgeneralizing the "check only the last digit" pattern (correct for 2, 5, 10) onto 4, which actually requires checking the last TWO digits as a two-digit number. A third failure is misapplying the alternating-sum rule for 11, losing track of which digits receive positive versus negative signs, since this is the most procedurally distinct and error-prone rule in the standard set.

## Misconceptions
- **MC-1 — DIVISIBILITY-RULE-FOR-3-CONFUSED-WITH-RULE-FOR-9** (FOUNDATIONAL)
  - **Statement**: The student uses the digit-sum procedure correctly but checks the wrong threshold — testing whether the digit sum is divisible by 3 when the actual question is about divisibility by 9, or vice versa (e.g., concluding 108 is divisible by 9 because its digit sum, 9, is divisible by 3, without checking that 9 is also required for divisibility by 9 specifically — which it happens to satisfy here, but the reasoning generalizes incorrectly to cases where it wouldn't, like 12, whose digit sum 3 is divisible by 3 but not by 9).
  - **Birth type**: Type 6, analogy overextension — the two rules use the IDENTICAL digit-sum computation, and the only difference (which threshold the sum must clear) is easy to lose track of when the procedures are otherwise indistinguishable.
  - **Diagnostic probe**: Ask the student whether 42 is divisible by 9; MC-1 shows as checking the digit sum (6) against the wrong threshold (concluding "divisible by 3, so divisible by 9" rather than correctly recognizing 6 is not divisible by 9, so 42 is not divisible by 9).
  - **Repair approach**: Ground the digit-sum-threshold model (Mental Model 2) by explicitly stating, before every application, "which threshold am I checking — 3 or 9?" and practicing pairs of numbers where the digit-sum-divisible-by-3-but-not-9 distinction is deliberately exercised.

- **MC-2 — DIVISIBILITY-BY-4-CHECKED-USING-ONLY-THE-LAST-DIGIT**
  - **Statement**: The student checks only the last digit when testing divisibility by 4, overgeneralizing the single-digit-check pattern that correctly applies to 2, 5, and 10 (e.g., concluding 214 is not divisible by 4 because the last digit, 4, alone doesn't determine it, without checking the correct two-digit test on "14").
  - **Birth type**: Type 1, overgeneralization — the correct, simple last-digit rule for 2, 5, and 10 is overgeneralized to every remaining divisibility rule without re-deriving each rule's actual required scope from place value.
  - **Diagnostic probe**: Ask the student to test 316 for divisibility by 4 and explain their method; MC-2 shows as checking only the digit 6, rather than the last two digits (16, which is divisible by 4, confirming 316 is divisible by 4).
  - **Repair approach**: Ground the place-value-power model (Mental Model 1), explicitly deriving why 4's rule needs two digits (100 = 4×25, an exact multiple) while 2's rule needs only one (10 = 2×5), making the scope difference a consequence of place value, not an arbitrary rule count.

- **MC-3 — DIVISIBILITY-RULE-FOR-11-ALTERNATING-SIGNS-MISASSIGNED**
  - **Statement**: The student applies the alternating-sum rule for 11 but assigns the +/− signs to the wrong digits, or forgets to alternate consistently, producing an incorrect sum and an incorrect divisibility conclusion.
  - **Birth type**: Type 4, notation-induced — the alternating-sign procedure has no single canonical starting point taught consistently (some present it starting from the ones digit, others from the leftmost digit), and without a fixed, explicitly-stated anchor, the sign assignment is easy to apply inconsistently.
  - **Diagnostic probe**: Ask the student to test 2,728 for divisibility by 11 and show their alternating sum; MC-3 shows as an inconsistent or incorrectly-alternated sign pattern (e.g., 2 − 7 + 2 − 8 versus the consistent −2 + 7 − 2 + 8, applied from a fixed starting digit).
  - **Repair approach**: Fix a single, explicit starting convention (e.g., always begin alternating from the RIGHTMOST digit as positive) and practice applying it consistently across several examples before allowing any variation in approach.

## Analogies
- **Building-code-inspector analogy**: each divisibility rule is like a different building inspector checking a different, specific feature of a building (foundation depth for one code, wiring for another) — using the wrong inspector's checklist for the wrong code (like using the "last digit" checklist for the "last two digits" code) misses the actual requirement.

## Demonstrations
- Side-by-side application of the digit-sum rule to test the SAME number for both divisibility by 3 and by 9, explicitly stating which threshold applies each time (targeting MC-1).
- The derivation of why 4's rule requires two digits, connecting 100 = 4×25 directly to place value (targeting MC-2).
- A fully worked alternating-sum computation for divisibility by 11, with the sign-assignment convention stated explicitly before computing (targeting MC-3).

## Discovery Questions
1. "The digit sum of a number is 15 — does that tell you it's divisible by 3, by 9, or both, or neither?"
2. "Why does the divisibility rule for 4 need to check two digits, when the rule for 2 only needs one?"
3. "When alternating + and − signs across a number's digits for the rule for 11, which digit do you start with, and does it matter?"

## Teaching Sequence
1. Confirm `math.nt.divisibility`'s relation-based definition is solid.
2. Introduce the place-value-power model (Mental Model 1) by deriving the last-digit rules for 2, 5, 10 from first principles.
3. Extend to 4 and 8, explicitly deriving the two-digit and three-digit scope from place value, targeting MC-2.
4. Introduce the digit-sum rules for 3 and 9 side by side, explicitly contrasting their thresholds, targeting MC-1.
5. Introduce the alternating-sum rule for 11 with a fixed sign convention, targeting MC-3.
6. Practice mixed problems requiring the student to select and correctly apply the right rule for a given divisor.

## Tutor Actions
- **DO: Worked Example** — deriving the last-digit rules for 2, 5, 10 from place value (Mental Model 1).
- **TEST-THINKING: Error Analysis** — the digit-sum-for-3-vs-9 contrast (targeting MC-1).
- **DO: Worked Example** — the two-digit derivation for divisibility by 4 (targeting MC-2).
- **ORGANIZE: Matching** — match each divisor to the number of trailing digits its rule requires.

## Voice Teaching Notes
Before applying a digit-sum rule, ask "threshold 3, or threshold 9?" as a standing, separate spoken question — this habit directly targets MC-1 by forcing explicit threshold selection rather than an assumed default.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a number and require the student to test it for divisibility by 3, 9, 4, and 11 in sequence, explicitly naming which rule and threshold applies at each step, directly assessing all three misconceptions together.
- **P77 (mastery gate)**: 5/5 correct across a mixed set including at least one item testing both 3 and 9 on the same number with different results (targeting MC-1), one testing 4 with a last digit that would mislead a last-digit-only check (targeting MC-2), and one item for 11 (targeting MC-3).

## Tutor Recovery Strategy
If MC-1 persists, regress to computing the digit sum once and then asking two SEPARATE questions in sequence ("is this divisible by 3? Is this divisible by 9?") rather than a single combined judgment, until the two thresholds are reliably distinguished.

## Memory Hooks
- "Same digit sum, different question — always name which threshold, 3 or 9."
- "Last digit for 2, 5, 10 — but 4 needs the last TWO, and 8 needs the last THREE."
- "Alternate the signs consistently for 11 — pick a starting digit and stick with it."

## Transfer Connections
- `math.nt.sieve-of-eratosthenes` (sibling concept) uses divisibility checks as its core mechanism, benefiting directly from fluent rule application.

## Cross-Subject Connections
No direct cross-subject connections identified for this concept; divisibility rules are a pure arithmetic/number-theory fluency skill with primary transfer value inside mathematics (prime testing, factoring).

## Blueprint References
None — no Blueprint exists for `math.nt.divisibility-rules` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 3 part 2.
