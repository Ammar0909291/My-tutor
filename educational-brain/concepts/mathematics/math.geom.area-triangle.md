# math.geom.area-triangle

## Identity
- **KG ID**: `math.geom.area-triangle`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.triangle`
- **Unlocks**: `math.geom.area-polygon`
- **Cross-links**: none (KG lists no cross-links for this concept; P76_mode = independence).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.geom.area-triangle.md` (reused by reference throughout this entry).

## Learning Objective
The student will compute a triangle's area as ½×base×height using the perpendicular altitude (never a slant side), compute area via Heron's formula from the three side lengths alone with no height needed, and recognize that both formulas always agree, choosing whichever is more directly computable for a given triangle.

## Core Understanding
Per the Blueprint's Component 3: the formula Area=½×base×height requires "height" to mean specifically the perpendicular distance — the altitude, exactly as already defined in `math.geom.triangle` — from the vertex opposite the chosen base to the line containing that base; using any other segment, such as one of the triangle's other two (generally non-perpendicular) sides, gives a wrong area entirely. Heron's formula, Area=√(s(s−a)(s−b)(s−c)) with semiperimeter s=(a+b+c)/2, computes area using only the three side lengths a, b, c — no height or altitude value is needed anywhere in the computation, making it the natural choice when sides are known but no perpendicular height is directly available. Since both formulas compute the same quantity, they must always agree for the same triangle: ½bh is more direct when a height is already obvious (e.g. a right triangle's two legs), while Heron's formula is necessary when only side lengths are known with no perpendicular pair visible.

## Mental Models
1. **The perpendicular-only model** (Blueprint TA-A01, P11): "height" in the area formula means exactly the altitude — the perpendicular distance to the base's line — never one of the triangle's other slant sides, regardless of which vertex it's drawn from.
2. **The sides-are-enough model** (Blueprint TA-A02, P28): Heron's formula was built exactly for the situation where no height is known or needed at all — three side lengths alone fully determine the area.
3. **The always-agree model** (Blueprint TA-A03, P06): the two formulas can never disagree, since they compute the identical quantity; choose ½bh when a perpendicular height is obvious, Heron's formula when it isn't.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is using one of the triangle's other (non-perpendicular) sides as "height" in the area formula, producing an incorrect area. A second failure is believing Heron's formula also requires knowing the triangle's height in addition to its three sides, missing that it uses side lengths alone. A third failure is believing the base-height formula and Heron's formula could give genuinely different areas for the same triangle, rather than recognizing they must always agree.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — HEIGHT-CONFUSED-WITH-A-SLANT-SIDE** (Foundational)
  - **Blueprint description**: using one of the triangle's other sides (not the perpendicular altitude) as "height" in the area formula, producing an incorrect area.
  - **Birth type**: Type 6, analogy overextension — this concept's MC-1 directly reuses `math.geom.triangle`'s own already-corrected altitude-vs-side confusion, applied specifically to the area-computation context, where the temptation to substitute a nearby drawn side is especially strong.
  - **Repair approach**: Blueprint Repair Action B01 — the direct numeric contrast between the correct altitude computation (giving 30) and the incorrect slant-side substitution (giving 40) for the same triangle.

- **MC-2 — HERONS-FORMULA-ASSUMED-TO-NEED-HEIGHT** (Foundational)
  - **Blueprint description**: believing Heron's formula requires knowing the triangle's height in addition to its three sides, missing that it uses only the side lengths.
  - **Birth type**: Type 1, overgeneralization — since the ½bh formula always needs a height, this requirement is over-generalized to "every area formula needs a height," without recognizing Heron's formula was specifically built to avoid that need.
  - **Repair approach**: Blueprint Repair Action B02 — the complete worked computation using only a, b, c (no height value anywhere), for a 5-6-7 triangle.

- **MC-3 — THE-TWO-AREA-FORMULAS-ASSUMED-COULD-DISAGREE** (Moderate)
  - **Blueprint description**: believing the base-height formula and Heron's formula could give genuinely different areas for the same triangle.
  - **Birth type**: Type 4, notation-induced — the two formulas look structurally unrelated on the page (one uses b and h, the other uses a, b, c and s), so without an explicit side-by-side verification, learners don't assume they must compute the identical quantity.
  - **Repair approach**: Blueprint Repair Action B03 — the 3-4-5 right triangle computed both ways, both yielding exactly 6, proving the formulas' agreement concretely.

## Analogies
- **The surveyor's-tape-measure analogy** (Blueprint Component 5, P76): a land surveyor who can only measure a triangular plot's three boundary side lengths (no perpendicular height across uneven terrain) directly needs Heron's formula, since it requires nothing but those three measurements.

## Demonstrations
- Computing area with the correct perpendicular altitude (giving 30) versus the incorrect slant-side substitution (giving 40) for the same base=10 triangle (Blueprint A01, Example 1), targeting MC-1.
- Computing Heron's formula from sides 5, 6, 7 alone, with no height value used anywhere (Blueprint A02, Example 2), targeting MC-2.
- Computing both formulas for the same 3-4-5 right triangle, both yielding exactly 6 (Blueprint A03, Example 3), targeting MC-3.

## Discovery Questions
1. "Can any side of a triangle be used as the 'height' in the area formula, as long as it's drawn from the opposite vertex?"
2. "Does Heron's formula also require knowing the triangle's height, in addition to its three sides?"
3. "Could the two area formulas ever give genuinely different areas for the same triangle?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (height means perpendicular, never a slant side) → A02 (Heron's formula needs only the sides) → A03 (both formulas always agree; choose the more direct one) → A04 (Mastery Gate, P91).

## Tutor Actions
- **TEST-THINKING: Error Analysis** — the correct-altitude-vs-slant-side numeric contrast (Blueprint A01), targeting MC-1.
- **DO: Worked Example** — the complete Heron's-formula computation using only three side lengths (Blueprint A02), targeting MC-2.
- **DO: Worked Example** — both formulas computed for the same 3-4-5 triangle, confirming agreement (Blueprint A03), targeting MC-3.
- **TELL: Explanation** — when to prefer ½bh versus Heron's formula, based on what information is directly available (Blueprint A03).

## Voice Teaching Notes
Before accepting a height value, ask "is that segment actually perpendicular to the base — or is it one of the other sides?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links = none)**: reused verbatim from the Blueprint's Component 5 A04 — the land-surveyor scenario applying Heron's formula from side lengths alone, contrasting it with the additional fieldwork ½bh would require, and confirming both methods must agree.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to explicitly trace or point to the perpendicular altitude on a diagram before substituting any value into ½bh, contrasting it against each of the triangle's other two sides, until the perpendicular-only rule is applied automatically.

## Memory Hooks
- "Height means perpendicular to the base — never one of the other sides."
- "Heron's formula only needs the three sides — no height required at all."
- "Both area formulas compute the same thing — they can never disagree."

## Transfer Connections
- `math.geom.area-polygon` (unlocks) extends area computation to general polygons, often by decomposing into triangles and applying this concept's own formulas.
- `math.geom.triangle` (requires) supplies the altitude's precise perpendicular definition, and its explicit distinction from an ordinary side, that this concept's LO1 directly reuses.

## Cross-Subject Connections
- Physics: computing torque or force-component work using a triangular geometry routinely relies on correctly identifying the perpendicular distance, exactly as this concept's altitude distinction requires.

## Blueprint References
`docs/curriculum/blueprints/math.geom.area-triangle.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 6.
