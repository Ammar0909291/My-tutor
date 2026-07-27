# math.geom.plane

## Identity
- **KG ID**: `math.geom.plane`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.line`
- **Unlocks**: `math.geom.polygon`, `math.geom.coordinate-plane`
- **Cross-links**: `math.geom.coordinate-plane` (Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe per the Blueprint).
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×4⌉ = 4/4)
- **Estimated hours**: 1
- **Blueprint**: `docs/curriculum/blueprints/math.geom.plane.md` (reused by reference throughout this entry).

## Learning Objective
The student will state that a geometric plane is a flat, two-dimensional surface extending infinitely in all directions with no edges, boundary, or thickness, correctly identify that three non-collinear points (not two) determine a unique plane, and recognize that infinitely many distinct planes can contain any single given line.

## Core Understanding
Per the Blueprint's Component 1: a plane is a flat, two-dimensional surface extending infinitely in all directions, with zero thickness and no edges or boundary. Just as two distinct points determine a unique line, three non-collinear points determine a unique plane — two points (or three collinear points) fix only a line, and infinitely many planes can contain that line (imagine rotating a plane around the line as a hinge). A plane contains infinitely many lines: any two distinct points within a plane determine a line lying entirely within it. Two distinct planes are either parallel (no intersection) or intersect in a line. Common physical models — paper, floors, tables — represent only small bounded portions of the true, infinite geometric plane.

## Mental Models
1. **The infinite-extended-floor model** (Blueprint TA-A01, P03): imagine a room's floor extended in every horizontal direction forever — past every wall, city, and ocean — with no edges, no corners, no thickness, just a perfectly flat infinite surface.
2. **The door-hinge model** (Blueprint TA-A03, P06): a line acts as a hinge — a plane can rotate around it to any angle, each angle being a different plane; a third point off the line, like a finger stopping the door, locks in exactly one unique plane.
3. **The dimensional-ladder model** (Blueprint TA-A01, P11): point (0-D, no extent) → line (1-D, infinite in one direction) → plane (2-D, infinite in two directions) → space (3-D, infinite in three directions).

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing a plane has edges or boundaries like a sheet of paper, overgeneralizing from every physical model of a plane (which genuinely has visible edges) to the geometric ideal. A second failure is believing two points determine a unique plane, over-applying the correct two-point-determines-a-line rule by analogy, missing that a third non-collinear point is required. A third failure is believing a given line lies in exactly one plane, conflating the uniqueness of a plane from three points with an assumed exclusivity per line, missing that infinitely many planes contain any single line.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — PLANE-HAS-BOUNDARY** (FOUNDATIONAL)
  - **Blueprint description**: believing a plane has edges or boundaries, like a sheet of paper or a table.
  - **Birth type**: Type 2, perceptual intuition — every physical model of a plane (paper, table, floor, whiteboard) genuinely has visible edges, making the boundary-less abstraction perceptually counterintuitive.
  - **Repair approach**: Blueprint Repair Action TA-B01 — contrasting a sheet of paper (finite area, four edges, physical thickness) against the geometric plane (infinite area, no edges, zero thickness), framing physical models as viewing windows into something that continues forever.

- **MC-2 — PLANE-FROM-TWO-POINTS** (see Blueprint Component 2)
  - **Blueprint description**: believing two points determine a unique plane, over-applying the two-point-determines-a-line rule by analogy.
  - **Birth type**: Type 1, overgeneralization — the correct rule "two points determine a unique line" is extended by direct analogy to "two points determine a unique plane," missing the extra dimensional requirement.
  - **Repair approach**: Blueprint Repair Action TA-B02 — the book-spine image: two points determine the spine (line), but infinitely many pages (planes) all contain that same spine, until a third non-collinear point fixes one page uniquely.

- **MC-3 — ONE-PLANE-PER-LINE** (see Blueprint Component 2)
  - **Blueprint description**: believing a given line lies in exactly one plane, conflating the uniqueness of a plane from three points with exclusivity per line.
  - **Birth type**: Type 1, overgeneralization — the just-learned "three points determine ONE unique plane" fact is over-applied to lines, incorrectly assuming a similarly singular relationship.
  - **Repair approach**: Blueprint Repair Action TA-B03 — the door-hinge rotation image, confirming infinitely many planes contain any given line, using the x-axis as a concrete counting example (contained in the xy-plane, the xz-plane, and infinitely many rotated planes between).

## Analogies
- **The extended-floor analogy** (Blueprint TA-A01, P03): a room's floor, extended infinitely in every horizontal direction with no edges or corners, illustrating the flat, unbounded, zero-thickness nature of a geometric plane.
- **The door-hinge analogy** (Blueprint TA-A03, P06): a line is a hinge a plane can rotate around to any angle; a third off-line point stops the rotation and locks in one unique plane.

## Demonstrations
- The boundary check: confirming a geometric plane has no edges, unlike a table or sheet of paper (Blueprint TA-A02, P49), targeting MC-1.
- The collinear-points test: three points on a single line do NOT determine a unique plane, since infinitely many planes contain that line (Blueprint TA-A03, P49), targeting MC-2/MC-3.
- The x-axis transfer probe: counting the infinitely many planes (xy-plane, xz-plane, and rotated planes) that all contain the x-axis (Blueprint TA-A04, P76), targeting MC-3.

## Discovery Questions
1. "Does a geometric plane have edges, the way a sheet of paper does?"
2. "Do two points determine a unique plane, the same way they determine a unique line?"
3. "How many different planes can contain one single given line?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (plane as an infinite flat surface, using the extended-floor analogy) → TA-A02 (misconception gate for PLANE-HAS-BOUNDARY) → TA-A03 (three non-collinear points determine a plane, using the door-hinge image) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the infinitely extended floor with no edges or corners (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — confirming a plane has no boundary, unlike a table (Blueprint TA-A02), targeting MC-1.
- **SHOW: Demonstration** — the door-hinge rotation image showing infinitely many planes contain one line (Blueprint TA-A03), targeting MC-2/MC-3.
- **DO: Worked Example** — the x-axis transfer probe counting planes containing one line (Blueprint TA-A04, P76), targeting MC-3.

## Voice Teaching Notes
When a student describes a plane, ask "does it stop somewhere, or keep going forever?" as a standing check directly targeting MC-1's boundary assumption.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.geom.coordinate-plane` per the Blueprint's Component 7 — cross_links includes this target)**: reused verbatim from the Blueprint's Component 4 TA-A04 — the xy-plane scenario, confirming no boundary, non-collinearity of three named points, and the infinitude of planes containing one line.
- **P77 (mastery gate)**: the Blueprint's 3-item problem set plus P76 (Component 4 TA-A04), MAMR 4/4.

## Tutor Recovery Strategy
If MC-2/MC-3 persist, require the student to explicitly identify a third non-collinear point before accepting any claim that "these points/this line determine a unique plane."

## Memory Hooks
- "A plane has no edges — physical models like paper only show a tiny piece of it."
- "Two points fix a line, not a plane — you need a third point off that line."
- "Infinitely many planes can share the same line, like pages around a book's spine."

## Transfer Connections
- `math.geom.polygon` (unlocks) requires all vertices and edges to lie within a single plane.
- `math.geom.coordinate-plane` (cross-link, Blueprint exists) supplies the xy-plane as the canonical coordinate-geometry realization of this concept's abstract plane.

## Cross-Subject Connections
- Physics: flat, frictionless surfaces in mechanics problems are idealized using this same infinite, zero-thickness plane abstraction.

## Blueprint References
`docs/curriculum/blueprints/math.geom.plane.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.geom.coordinate-plane` has a Blueprint but no Educational Brain entry) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 3.
