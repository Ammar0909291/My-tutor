# math.geom.polygon

## Identity
- **KG ID**: `math.geom.polygon`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.line-segment`, `math.geom.triangle`
- **Unlocks**: `math.geom.area`
- **Cross-links**: none (KG lists no cross-links for this concept; P76_mode = independence).
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.geom.polygon.md` (reused by reference throughout this entry).

## Learning Objective
The student will define a polygon as a closed plane figure bounded entirely by straight line segments and name it by side count, distinguish a regular polygon (equal sides AND equal angles) from an irregular one, and derive and apply the interior angle sum formula (n−2)×180° via triangulation.

## Core Understanding
Per the Blueprint's Component 3: a polygon is a closed plane figure bounded entirely by straight line segments (sides), meeting only at their endpoints (vertices), named by side count (3=triangle, 4=quadrilateral, 5=pentagon, 6=hexagon, and so on). A polygon is regular only if ALL its sides are equal in length AND ALL its angles are equal in measure — both conditions simultaneously; failing either condition (unequal sides, unequal angles, or both) makes it irregular, and notably equal sides alone do not guarantee equal angles (a rhombus has 4 equal sides but generally unequal angles). For a polygon with n sides, the interior angle sum is (n−2)×180°, derived by picking one vertex and drawing diagonals to every other non-adjacent vertex, decomposing the polygon into exactly (n−2) non-overlapping triangles, each contributing 180° from `math.geom.triangle`'s own angle-sum property; for a regular polygon specifically, each individual interior angle equals (n−2)×180°/n.

## Mental Models
1. **The closed-straight-sides model** (Blueprint TA-A01, P11): a figure qualifies as a polygon only if it is bounded entirely by straight segments AND fully closed — a single curved edge or a single gap disqualifies the entire figure.
2. **The two-separate-checks model** (Blueprint TA-A02, P06): regularity requires checking sides and angles as two independent conditions — passing only one check (equal sides without equal angles, as in a rhombus) is not enough.
3. **The count-the-triangles model** (Blueprint TA-A02, P06): the (n−2)×180° formula is not an arbitrary memorized fact — it comes directly from triangulating the polygon into exactly (n−2) triangles from one vertex, each contributing 180°.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing equal side lengths alone are sufficient to classify a polygon as regular, without also checking that all angles are equal. A second failure is using (n−2)×180° as a memorized formula without understanding the triangulation argument behind it, causing errors when the formula must be applied in reverse (solving for n given the angle sum). A third failure is classifying a figure with one or more curved sides as a polygon, overlooking the definition's explicit "straight line segments only" requirement.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — EQUAL-SIDES-ASSUMED-SUFFICIENT-FOR-REGULARITY** (Foundational)
  - **Blueprint description**: believing equal side lengths alone (without also checking equal angles) is sufficient to classify a polygon as regular.
  - **Birth type**: Type 3, language contamination — "regular" carries an everyday-language connotation of "uniform," which learners map onto "equal sides" alone without independently verifying the separate angle condition.
  - **Repair approach**: Blueprint Repair Action B01 — the direct rhombus-vs-square contrast, re-anchoring on "regular requires both conditions, checked separately."

- **MC-2 — INTERIOR-ANGLE-SUM-FORMULA-CITED-WITHOUT-DERIVATION** (Moderate)
  - **Blueprint description**: using (n−2)×180° as a memorized formula without understanding the triangulation argument, causing errors when solving for n in reverse.
  - **Birth type**: Type 5, instruction-induced — the formula is frequently presented and drilled as a forward-only computational recipe, without the triangulation derivation that would make reverse-direction solving transparent.
  - **Repair approach**: Blueprint Repair Action B02 — re-deriving the formula via triangulation, showing explicitly why (n−2) triangles arise, before attempting the reverse (solve-for-n) direction.

- **MC-3 — POLYGON-DEFINITION-CURVED-SIDE-OVERLOOKED** (Moderate)
  - **Blueprint description**: classifying a figure with one or more curved sides as a polygon, overlooking the "straight line segments only" requirement.
  - **Birth type**: Type 1, overgeneralization — a mostly-straight-sided figure is treated as "close enough" to a polygon, over-generalizing from valid polygons that happen to look similar at a glance.
  - **Repair approach**: Blueprint Repair Action B03 — re-anchoring on the definition's explicit "straight line segments" requirement, showing even one curved edge disqualifies the entire figure.

## Analogies
- **The gazebo-floor-plan analogy** (Blueprint Component 5, P76): an architect designing a regular-polygon gazebo floor plan with a specific interior angle at each corner must use the interior angle formula to determine the required number of sides, and cannot substitute an equal-sides-only design and expect the same guaranteed angle.

## Demonstrations
- Sorting physical shapes into "polygon" and "not a polygon" piles based on the closed/straight-sides rule (Blueprint TA-A01), targeting MC-3.
- The rhombus (equal sides, unequal angles, irregular) versus square (equal sides AND equal angles, regular) contrast (Blueprint TA-A02, Example 2), targeting MC-1.
- Triangulating a pentagon from one vertex into 3 triangles (3×180°=540°), then generalizing to the (n−2)×180° formula and applying it in both directions (Blueprint TA-A02, Example 3), targeting MC-2.

## Discovery Questions
1. "Is this rhombus, with all four sides equal, a regular polygon?"
2. "Where does the formula (n−2)×180° actually come from?"
3. "Is a shape with five straight sides and one curved side still a polygon?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (naming polygons and the closed/straight-sides definition) → A02 (regular vs. irregular, and the interior angle sum via triangulation) → A03 (Mastery Gate, P91).

## Tutor Actions
- **DO: Matching** — sorting physical or drawn shapes into "polygon" and "not a polygon" piles (Blueprint TA-A01), targeting MC-3.
- **ORGANIZE: Concept Map** — the rhombus-vs-square regular/irregular contrast (Blueprint TA-A02), targeting MC-1.
- **SHOW: Demonstration** — triangulating a pentagon from one vertex to derive the interior angle sum formula (Blueprint TA-A02), targeting MC-2.
- **DO: Worked Example** — applying the formula in both directions (given n, find the sum; given the sum, find n) (Blueprint TA-A02, Example 3).

## Voice Teaching Notes
When a student calls a shape "regular" because its sides look equal, ask "have you also checked whether all the angles are equal?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links = none)**: reused verbatim from the Blueprint's Component 5 A03 — the gazebo floor-plan scenario finding the required number of sides for a 135° interior angle, and evaluating whether an equal-sides-only design could achieve the same guaranteed angle.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A03), MAMR 5/5.

## Tutor Recovery Strategy
If MC-2 persists, require the student to physically (or verbally) trace the triangulation diagonals from one vertex and count the resulting triangles before ever citing the formula numerically, re-deriving (n−2)×180° from scratch each time until reverse-direction solving becomes reliable.

## Memory Hooks
- "Regular needs equal sides AND equal angles — check both separately."
- "The (n−2)×180° formula comes from counting the triangles you can draw from one vertex."
- "A polygon's sides must be straight and the figure must be fully closed — no exceptions."

## Transfer Connections
- `math.geom.area` (unlocks) computes polygon area, especially for regular polygons, building directly on this concept's side/angle classification.
- `math.geom.line-segment` and `math.geom.triangle` (require) supply the segment definition and the 180°-angle-sum fact this concept's triangulation argument directly builds on.

## Cross-Subject Connections
- Chemistry: molecular geometry (e.g. hexagonal ring structures) routinely relies on regular-polygon angle properties established here.

## Blueprint References
`docs/curriculum/blueprints/math.geom.polygon.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 6.
