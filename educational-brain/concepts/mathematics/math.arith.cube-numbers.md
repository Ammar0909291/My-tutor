# math.arith.cube-numbers

## Identity
- **KG ID**: `math.arith.cube-numbers`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.exponentiation`
- **Unlocks**: (none in current KG)
- **Cross-links**: `math.geom.volume` — confirmed a Blueprint EXISTS (`docs/curriculum/blueprints/math.geom.volume.md`) — Tier 1 cross-link probe engaging `math.geom.volume`.
- **Difficulty**: developing
- **Bloom level**: remember
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 2
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.cube-numbers.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will list and recognize perfect cubes, correctly compute n³ as n×n×n (never as 3n), recognize that cubing a negative integer produces a NEGATIVE result (unlike squaring), and connect perfect cubes to the volume of a cube with integer side length.

## Core Understanding
A cube number n³ is the integer produced by multiplying n by itself three times — n×n×n — and, geometrically, is exactly the volume of a cube with side length n (a direct special case of `math.geom.volume`'s rectangular-prism formula l×w×h, where l=w=h=n). The single most important sign fact distinguishing cubing from squaring is that cubing PRESERVES sign: a negative number cubed stays negative, (−n)³ = −n³, because an ODD number of negative factors (three, here) multiplies out to a negative result — this is the opposite of squaring, where an even number of negative factors (two) always gives a positive result, and a student who just internalized "squaring a negative gives a positive" is at direct risk of overextending that rule to cubing, where it is false.

## Mental Models
1. **The cube-volume model**: n³ is literally the volume of an n×n×n cube — three factors of n, one for each dimension (length, width, height) — directly grounding cubing as a three-dimensional, not one-dimensional, operation.
2. **The odd-power-preserves-sign model**: cubing multiplies together three copies of the same signed number — since three is ODD, the sign of the original number survives into the result (positive stays positive, negative stays negative), in direct contrast to squaring's even-power sign-erasure.
3. **The tripling-coincidence-trap model**: just as squaring and doubling only coincide at n=2 in `math.arith.square-numbers`, cubing and tripling (3n) are entirely different operations with no small-integer coincidence to exploit — n³ and 3n diverge immediately and dramatically (2³=8 vs. 3×2=6; 3³=27 vs. 3×3=9), making this a comparatively easier misconception to break with almost any example.

## Why Students Fail
The dominant failure, carried forward from `math.arith.exponentiation`'s general pattern, is conflating the exponent operation (n³, multiply n by itself three times) with a simpler linear operation (3n, multiply n by three) — the same structural confusion `math.arith.square-numbers` addresses for squaring, reapplied here for cubing. A second, more concept-specific failure is overextending the just-learned "squaring a negative gives a positive" rule directly onto cubing, producing the false belief that (−n)³ is positive, when in fact the ODD power of three preserves the original negative sign. A third failure is conflating "cube number" with "multiple of three," likely due to a surface-level phonetic association between "cube" and "three."

## Misconceptions
- **MC-1 — CUBING-MEANS-TRIPLING** (FOUNDATIONAL)
  - **Statement**: The student computes n³ as 3n (tripling) rather than n×n×n (multiplying by itself three times).
  - **Birth type**: Type 1, overgeneralization — the identical structural confusion as `math.arith.square-numbers`'s MC-1 (squaring-means-doubling), reapplied to a new exponent; the general pattern "exponent n confused with multiply-by-n" recurs across every new power a student encounters until each is individually broken.
  - **Diagnostic probe**: Ask the student to compute 4³; MC-1 shows as an answer of 12 (3×4, tripling) instead of the correct 64 (4×4×4).
  - **Repair approach**: Ground the computation in the cube-volume model (Mental Model 1) — physically or pictorially building a 4×4×4 cube and counting unit cubes, making the three-factor structure undeniable, exactly as `math.arith.square-numbers`'s repair used an area grid for squaring.

- **MC-2 — NEGATIVE-CUBED-ASSUMED-POSITIVE**
  - **Statement**: The student computes (−n)³ as a positive number, incorrectly overextending the "squaring a negative gives a positive" rule from `math.arith.square-numbers` onto cubing.
  - **Birth type**: Type 6, analogy overextension — this is a direct, named overextension of the sibling concept's own correctly-learned sign rule (even powers of a negative are positive) onto a structurally different case (an odd power), making it a textbook example of over-transferring a recently-learned rule to a superficially similar but structurally different situation.
  - **Diagnostic probe**: Ask the student to compute (−3)³ immediately after reviewing (−3)² = 9; MC-2 shows as an answer of 27 (positive) instead of the correct −27.
  - **Repair approach**: Directly contrast (−3)² = 9 (even power, sign erased) against (−3)³ = −27 (odd power, sign preserved) side by side, explicitly naming the odd/even distinction (Mental Model 2) as the reason the two cases differ, rather than treating "negative number, exponent" as a single undifferentiated rule.

- **MC-3 — CUBE-NUMBER-CONFUSED-WITH-MULTIPLE-OF-THREE**
  - **Statement**: The student believes "cube number" means "a multiple of three" (e.g., treating 9, 12, or 15 as cube numbers because they are divisible by three), rather than a number of the form n³.
  - **Birth type**: Type 3, language contamination — the word "cube" phonetically and thematically suggests "three" (a cube has a three-in-the-exponent structure, and "three" is salient in casual association with the term), but this surface association has nothing to do with divisibility.
  - **Diagnostic probe**: Ask the student whether 9 is a cube number; MC-3 shows as "yes, because it's a multiple of 3" rather than correctly checking whether 9 equals some integer raised to the third power (it does not: 2³=8, 3³=27, and 9 falls between them).
  - **Repair approach**: Explicitly state and practice the correct definition (a cube number is n³ for some integer n) against the list of actual cube numbers (1, 8, 27, 64, 125, …), contrasting it directly against a list of multiples of three (3, 6, 9, 12, 15, …) to make the two categories visibly, concretely different.

## Analogies
- **Building-blocks-cube analogy**: a cube number is the total count of unit blocks needed to build a solid cube n blocks long, n blocks wide, and n blocks tall — directly grounding n³ in three-dimensional structure rather than a one-dimensional multiplication trick.

## Demonstrations
- Physically or pictorially building small cubes (2×2×2, 3×3×3) from unit blocks and counting the total, connecting directly to n³ (targeting MC-1).
- The direct side-by-side contrast of (−3)² = 9 versus (−3)³ = −27, explicitly naming the even/odd exponent distinction (targeting MC-2).

## Discovery Questions
1. "Does n³ mean 'n times three,' or something else — how would building an actual n×n×n block of cubes settle it?"
2. "You just learned that squaring a negative number gives a positive result — does the same rule apply to cubing a negative number?"
3. "Is every cube number also a multiple of three? Check a few cube numbers to find out."

## Teaching Sequence
1. Confirm `math.arith.exponentiation`'s general n-th-power operation is solid.
2. Introduce the cube-volume model (Mental Model 1) with physical or pictorial unit-cube building, breaking MC-1 with a concrete example (e.g., n=4, where 3n and n³ diverge sharply).
3. Introduce cubing negative integers, deliberately placed immediately AFTER reviewing squaring negative integers, to directly surface and contrast MC-2 (targeting the overextension while it's freshest).
4. Explicitly contrast the correct cube-number definition against the "multiple of three" surface association (targeting MC-3).
5. Practice a mixed set including tripling-vs-cubing distractors, sign-of-negative-cubed items, and cube-number-vs-multiple-of-three identification items.

## Tutor Actions
- **SHOW: Demonstration** — physical/pictorial unit-cube building for small values of n.
- **TEST-THINKING: Error Analysis** — the tripling-vs-cubing contrast at a value like n=4.
- **TEST-THINKING: Prediction** — predict the sign of (−n)³ immediately after reviewing (−n)², testing for MC-2 overextension.
- **ORGANIZE: Matching** — sort a mixed list of numbers into "cube number," "multiple of three," "both," or "neither" categories, targeting MC-3.

## Voice Teaching Notes
When introducing cubing a negative number, explicitly say "remember, THIS time the exponent is odd, not even" before asking for the sign — naming the odd/even distinction out loud, immediately adjacent to the freshly-learned squaring rule, is the single highest-leverage move against MC-2's overextension.

## Assessment Signals
- **P76 (transfer probe, Tier 1 cross-link mode, engaging `math.geom.volume`)**: present a cube-shaped storage box with integer side length (e.g., 5 units) and ask the student to compute its volume using the perfect-cube list, then connect this directly to `math.geom.volume`'s general rectangular-prism formula l×w×h, explaining why a cube's volume formula is a special case where all three dimensions are equal.
- **P77 (mastery gate)**: 5/5 correct across a mixed set including at least one tripling-vs-cubing distractor (targeting MC-1), one negative-integer cubing item presented immediately after a squaring item (targeting MC-2), and one cube-number-vs-multiple-of-three sorting item (targeting MC-3).

## Tutor Recovery Strategy
If MC-2 persists after the direct even/odd contrast, regress to physically building both a squared array (a flat n×n grid) and a cubed block (an n×n×n block) side by side for a negative-sourced example, reinforcing that the THIRD dimension is what changes the sign outcome, before returning to purely symbolic computation.

## Memory Hooks
- "Cubing means three factors of the same number, not three times the number."
- "Squaring erases the sign — cubing keeps it, because three negatives multiply to a negative."
- "A cube number isn't just 'divisible by three' — check if it's really n×n×n."

## Transfer Connections
- `math.geom.volume` (Tier 1 cross-link) grounds every perfect cube as the literal volume of a cube.
- Polynomial factoring (algebra, later domain) uses cube numbers directly in sum-of-cubes and difference-of-cubes factoring patterns.

## Cross-Subject Connections
- Physics and chemistry: volume-based quantities (density, molar volume) rely on the same n³ computation this concept establishes, particularly for cubic-shaped containers or unit cells.

## Blueprint References
None — no Blueprint exists for `math.arith.cube-numbers` (verified via directory listing). The cross-link target's own Blueprint, `docs/curriculum/blueprints/math.geom.volume.md`, was read directly to ground this entry's P76 transfer probe (its rectangular-prism formula l×w×h, Component 3).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG's cross-link (`math.geom.volume`) was independently re-verified via directory listing at authoring time: a Blueprint exists, confirming Tier 1 cross-link probe mode per this program's established convention (Blueprint existence, not EB-entry existence, determines the mode).

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 2.
