# math.arith.divisor-dividend

## Identity
- **KG ID**: `math.arith.divisor-dividend`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.division`
- **Unlocks**: (none in current KG)
- **Cross-links**: none (KG lists none).
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5)
- **Estimated hours**: 1
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.divisor-dividend.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will correctly identify and name the dividend, divisor, and quotient in a division expression a ÷ b = q, regardless of the notation (÷ symbol, fraction bar, or long-division bracket) the expression is written in.

## Core Understanding
This concept is pure standard vocabulary layered on top of the already-mastered operation of division (`math.arith.division`): in a ÷ b = q, a is the dividend (the quantity being divided up), b is the divisor (the quantity dividing it), and q is the quotient (the result). The vocabulary itself carries no new computational content, but consistent, correct naming matters because later concepts (`math.arith.remainder`, ratios, algebraic division) rely on students being able to identify these roles instantly and unambiguously, across every notation the division operation is written in — the fraction bar (a/b), the long-division bracket (b enclosing a), and the ÷ symbol (a ÷ b) all encode the SAME role assignment, even though the visual layout differs sharply between them.

## Mental Models
1. **The "who is dividing whom" model**: the dividend is the amount being split up (the larger conceptual whole being distributed); the divisor is the number of groups (or group size) doing the dividing.
2. **The layout-independence model**: dividend and divisor roles are fixed by MEANING, not by which notation is used to write the division — the "top" of a fraction, the "inside" of a long-division bracket, and the "first number" in a ÷ b are all the SAME role (dividend), just positioned differently by each notation's own convention.

## Why Students Fail
The dominant failure is a straightforward vocabulary swap — calling the divisor the dividend or vice versa — often because the word "divisor" phonetically resembles words associated with a result or an answer rather than an input, and because there is no obvious reason from the words alone which one comes "first" in meaning versus in the written symbol order. A second, related failure is confusing "quotient" (the answer) with "divisor" (an input), especially once fraction and remainder vocabulary starts overlapping. A third failure is notation-specific: correctly naming dividend/divisor when division is written with the ÷ symbol, but failing to correctly map the same roles onto a long-division bracket or a fraction bar, since the visual position of each role changes across notations even though the underlying meaning does not.

## Misconceptions
- **MC-1 — DIVIDEND-DIVISOR-SWAPPED** (FOUNDATIONAL)
  - **Statement**: The student confuses which number is the dividend and which is the divisor in a ÷ b = q, for example calling b (the divisor) the dividend or vice versa.
  - **Birth type**: Type 3, language contamination — the words "dividend" and "divisor" are unfamiliar mathematical vocabulary with no strong everyday-language cue pointing to which role each word names, so the mapping between word and role is arbitrary from the student's perspective until explicitly memorized and practiced.
  - **Diagnostic probe**: Present "In 20 ÷ 4 = 5, which number is the divisor?" and ask the student to answer and justify; MC-1 shows as naming 20 (the dividend) instead of 4.
  - **Repair approach**: Anchor the vocabulary to the "who is dividing whom" model (Mental Model 1) with a memorable phrase connecting "divisor" to "the one doing the dividing" (the group size or number of groups), practiced repeatedly with immediate correction until the word-role mapping is automatic.

- **MC-2 — QUOTIENT-CONFUSED-WITH-DIVISOR**
  - **Statement**: The student uses "divisor" to refer to the result of the division (the quotient) rather than the number doing the dividing.
  - **Birth type**: Type 3, language contamination — without a strong cue distinguishing "divisor" (an input) from "quotient" (the output), the two unfamiliar terms can be conflated, especially since a student's most common day-to-day association with "the number after ÷" is the ANSWER, not one of the two inputs.
  - **Diagnostic probe**: Present "In 20 ÷ 4 = 5, which number is the quotient, and which is the divisor?" and ask for both; MC-2 shows as naming 5 for both roles, or swapping which input/output pairing each term refers to.
  - **Repair approach**: Explicitly contrast all three terms (dividend, divisor, quotient) together in every practice item rather than drilling them separately, so the three-way relationship (two inputs producing one output) stays visible as a single structure rather than three isolated vocabulary facts.

- **MC-3 — VOCABULARY-INCONSISTENT-ACROSS-NOTATIONS**
  - **Statement**: The student correctly names dividend/divisor when division is written with the ÷ symbol, but fails to correctly identify the same roles when the SAME division is written as a fraction (a/b) or in a long-division bracket, because the visual position of each role differs across notations.
  - **Birth type**: Type 4, notation-induced — each notation places the dividend and divisor in a different visual position (÷ symbol: dividend first, divisor second; fraction bar: dividend on top, divisor on bottom; long-division bracket: dividend inside, divisor outside), and without an explicit cross-notation mapping exercise, the vocabulary learned in one notation doesn't automatically transfer to another.
  - **Diagnostic probe**: Present the same division (e.g., 20 ÷ 4) written in all three notations (20 ÷ 4, 20/4, and the long-division bracket form) and ask the student to identify the dividend in each; MC-3 shows as correct identification in one notation but incorrect in another.
  - **Repair approach**: Explicitly practice identifying dividend/divisor across all three notations side by side for the SAME numerical example, reinforcing the layout-independence model (Mental Model 2) — the roles are fixed by meaning, and each notation is just a different "costume" for the same underlying structure.

## Analogies
- **Recipe-portions analogy**: the dividend is like the total amount of ingredients you have (the whole to be split), and the divisor is like the number of people you're splitting it among — "the whole" and "the splitter" are different roles regardless of which order a recipe card happens to list them in.

## Demonstrations
- Side-by-side display of the same division (20 ÷ 4 = 5) written in all three notations (÷ symbol, fraction bar, long-division bracket), with dividend/divisor/quotient labeled directly on each (targeting MC-3).
- A three-way contrast drill naming all three terms together for several examples, rather than one term at a time (targeting MC-2).

## Discovery Questions
1. "In 20 ÷ 4 = 5, which number is being split up, and which number is doing the splitting?"
2. "Is the divisor the answer, or one of the two starting numbers?"
3. "If 20 ÷ 4 is instead written as a fraction, 20/4, which part is still the dividend?"

## Teaching Sequence
1. Confirm `math.arith.division`'s operational meaning is solid.
2. Introduce the "who is dividing whom" model (Mental Model 1), naming dividend and divisor together as a pair from the start.
3. Add quotient into the same practice items immediately, contrasting all three terms together (targeting MC-2), never drilling them in isolation.
4. Introduce all three notations side by side for the same numerical example, explicitly mapping each role's visual position across notations (targeting MC-3).
5. Practice mixed notation-identification items, interleaving the ÷ symbol, fraction bar, and long-division bracket forms.

## Tutor Actions
- **TELL: Explanation** — the dividend/divisor/quotient roles, introduced together as a triple.
- **SHOW: Demonstration** — the same division shown across all three notations with roles labeled.
- **ORGANIZE: Matching** — match dividend/divisor/quotient labels to their correct position across different notations.
- **TEST-THINKING: Error Analysis** — present a mislabeled example (e.g., divisor and dividend swapped) and ask the student to find the error.

## Voice Teaching Notes
Always name all three terms together in the same breath ("the dividend, twenty, divided by the divisor, four, gives the quotient, five") rather than asking about one term in isolation — this three-in-one framing directly targets both MC-1 and MC-2 by keeping the full structure visible every time the vocabulary is used.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present the same division problem in all three notations and require correct dividend/divisor/quotient identification in each, assessing notation-independence of the vocabulary directly.
- **P77 (mastery gate)**: 5/5 correct across a mixed set requiring identification of all three terms across at least two different notations.

## Tutor Recovery Strategy
If MC-1 persists, regress to a single, consistently-used memory phrase (e.g., "divisor divides") repeated with immediate correction on every practice item until the word-role association is solid, before introducing the fraction-bar and long-division-bracket notations.

## Memory Hooks
- "The divisor DIVIDES — it's doing the splitting, not the answer."
- "Same roles, different costumes — dividend, divisor, and quotient don't change meaning just because the notation changes."

## Transfer Connections
- `math.arith.remainder` (sibling concept) directly reuses dividend/divisor vocabulary in its own a = bq + r formalization.
- Fraction vocabulary (numerator/denominator) parallels this concept's dividend/divisor structure, since a fraction is itself a division.

## Cross-Subject Connections
No direct cross-subject connections identified for this concept; it is pure arithmetic vocabulary with its primary transfer value inside mathematics (remainder, fractions, ratios).

## Blueprint References
None — no Blueprint exists for `math.arith.divisor-dividend` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 2.
