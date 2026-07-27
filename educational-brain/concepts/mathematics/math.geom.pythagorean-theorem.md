# math.geom.pythagorean-theorem

## Identity
- **KG ID**: `math.geom.pythagorean-theorem`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.right-triangle`, `math.arith.square-numbers`
- **Unlocks**: `math.geom.distance-formula`, `math.trig.right-triangle-trig`, `math.geom.pythagorean-converse`
- **Cross-links**: `math.nt.pythagorean-triples`, `math.geom.distance-formula` (both not yet authored — verified via directory listing; P76_mode = independence per the Blueprint's own determination).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5)
- **Estimated hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.geom.pythagorean-theorem.md` (reused by reference throughout this entry).

## Learning Objective
The student will state a²+b²=c² correctly identifying the hypotenuse versus the legs, solve for either the hypotenuse (adding squares) or a leg (subtracting squares, never adding by default), and use the theorem as a right-triangle test to verify whether three given side lengths could form a right triangle.

## Core Understanding
Per the Blueprint's Component 3: in any right triangle with legs a, b (the two sides forming the right angle) and hypotenuse c (the side opposite the right angle, always the longest side), a²+b²=c². Solving for the hypotenuse given both legs uses addition: c=√(a²+b²). Solving for a leg given the hypotenuse and the other leg uses subtraction, not addition: a=√(c²−b²) — because the hypotenuse's square already contains both legs' squares combined, isolating one leg means removing the other leg's contribution from the hypotenuse's square. The theorem also serves as a right-triangle test: given three lengths, compute whether the square of the longest matches the sum of the squares of the other two; if it does, the three lengths could form a right triangle (formally completed by the converse, `math.geom.pythagorean-converse`), and integer triples satisfying this exactly (like 3-4-5 or 5-12-13) are called Pythagorean triples.

## Mental Models
1. **The area-dissection model** (Blueprint TA-A01, P11): the areas of the two squares built on the legs combine exactly to fill the square built on the hypotenuse — a²+b²=c² is literally a statement about combined areas, not just an abstract equation.
2. **The subtract-to-isolate-a-leg model** (Blueprint TA-A02, P06): whichever side is unknown, ask first — is it the hypotenuse or a leg? If the hypotenuse, add the two known squares; if a leg, subtract the known leg's square from the hypotenuse's square.
3. **The check-against-the-longest-side model** (Blueprint TA-A02, P06): using the theorem as a right-triangle test requires squaring and comparing against specifically the longest of the three given lengths — treating any other side as if it were the hypotenuse produces a false result.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is defaulting to adding the two known squares regardless of whether the unknown side is the hypotenuse or a leg, instead of subtracting when solving for a leg. A second failure is believing any three positive side lengths automatically satisfy the Pythagorean relation, without actually checking the equation holds against the correctly identified longest side. A third failure is checking the relation using a leg (not the longest side) as if it were the hypotenuse, producing a false negative for a genuinely valid right triangle.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — ALWAYS-ADD-SQUARES** (Foundational)
  - **Blueprint description**: defaulting to adding the two known squares regardless of whether the unknown side is the hypotenuse or a leg, instead of subtracting when solving for a leg.
  - **Birth type**: Type 5, instruction-induced — the theorem is almost always first introduced and drilled in its additive, solve-for-the-hypotenuse form, so the addition operation becomes the default action regardless of which variable is actually unknown.
  - **Repair approach**: Blueprint Repair Action B01 — re-anchoring on the dissection model, where recovering a missing leg means removing the other leg's area contribution from the total, i.e. subtracting.

- **MC-2 — ANY-TRIPLE-IS-RIGHT-TRIANGLE** (Moderate)
  - **Blueprint description**: believing any three positive side lengths automatically satisfy the Pythagorean relation, without checking the equation actually holds against the correctly identified longest side.
  - **Birth type**: Type 1, overgeneralization — since many textbook triples (3-4-5, 5-12-13) genuinely do satisfy the relation, learners over-generalize that any three plausible-looking numbers will work, without performing the actual arithmetic check.
  - **Repair approach**: Blueprint Repair Action B02 — the direct contrast between 6-8-10 (works) and 6-8-11 (fails), forcing an actual computation rather than an assumption.

- **MC-3 — WRONG-SIDE-TREATED-AS-HYPOTENUSE** (Moderate)
  - **Blueprint description**: checking the Pythagorean relation using a leg (not the longest side) as if it were c, producing a false negative for a genuinely valid right triangle.
  - **Birth type**: Type 4, notation-induced — without an explicit habit of first identifying the longest side, any of the three given numbers might get slotted into the "c" position in the formula.
  - **Repair approach**: Blueprint Repair Action B03 — re-anchoring on `math.geom.right-triangle`'s own hypotenuse-identification rule, applied before ever substituting into the formula.

## Analogies
- **The area-dissection analogy** (Blueprint TA-A01, P11): physically constructing a 3×3, 4×4, and 5×5 square on each side of a 3-4-5 right triangle and confirming the two smaller squares' unit areas combine exactly to fill the larger square (9+16=25) — making a²+b²=c² a visibly true statement about areas, not just an abstract formula.

## Demonstrations
- Constructing squares on each side of a 3-4-5 right triangle and confirming 9+16=25 by counting unit squares (Blueprint TA-A01).
- Solving for the hypotenuse (add: 6²+8²=100, c=10) directly beside solving for a leg (subtract: 13²−5²=144, a=12) (Blueprint TA-A02, Contrast 1), targeting MC-1.
- The two-stage composite cable problem (floor diagonal, then 3D diagonal using that result as a new leg), forcing correct hypotenuse identification twice independently (Blueprint TA-A03).

## Discovery Questions
1. "If you know the hypotenuse and one leg, do you add or subtract the squares to find the other leg?"
2. "Do any three positive numbers automatically form a right triangle if you square and add two of them?"
3. "When checking three side lengths against the Pythagorean relation, which one goes on the side of the equation by itself?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (the theorem via area dissection) → A02 (solving for a leg vs. hypotenuse, and the right-triangle test) → A03 (composite application) → A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — the area-dissection proof using physical squares on a 3-4-5 triangle (Blueprint TA-A01).
- **DO: Worked Example** — the add-for-hypotenuse versus subtract-for-leg contrast (Blueprint TA-A02), targeting MC-1.
- **TEST-THINKING: Error Analysis** — the 6-8-10 (works) versus 6-8-11 (fails) right-triangle-test contrast (Blueprint TA-A02, Contrast 2), targeting MC-2.
- **DO: Worked Example** — the two-stage composite cable-length problem (Blueprint TA-A03), targeting MC-3.

## Voice Teaching Notes
Before accepting an application of the formula, ask "is the unknown side the hypotenuse, or a leg?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — both cross-link targets confirmed unauthored via directory check)**: reused verbatim from the Blueprint's Component 5 A04 — the baseball-diamond diagonal-throw-distance scenario and the 20-21-29 triangular-brace verification.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to explicitly state "hypotenuse or leg?" out loud and name the correct operation (add or subtract) before performing any arithmetic, using only leg-unknown problems for repeated practice until subtraction becomes the reliable default in that case.

## Memory Hooks
- "Solving for the hypotenuse: add. Solving for a leg: subtract."
- "Any three numbers can be squared and added — but that doesn't make them a right triangle. Check the equation actually holds."
- "Always identify the longest side first — that's the one that goes alone on one side of the equation."

## Transfer Connections
- `math.geom.distance-formula` (unlocks) is a direct restatement of this theorem with Δx, Δy as legs.
- `math.trig.right-triangle-trig` (unlocks) is defined on the same right-triangle side structure this theorem governs.
- `math.geom.pythagorean-converse` (unlocks) is the logical converse of this theorem, using the same equation as a sufficient condition for right-angledness.
- `math.geom.right-triangle` and `math.arith.square-numbers` (require) supply the hypotenuse/leg vocabulary and the squaring fluency this theorem directly depends on.
- `math.nt.pythagorean-triples` (cross-link, unauthored) studies the integer solutions to this theorem's equation directly.

## Cross-Subject Connections
- Physics: computing the magnitude of a 2D vector from its perpendicular components is a direct application of this theorem.

## Blueprint References
`docs/curriculum/blueprints/math.geom.pythagorean-theorem.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 7.
