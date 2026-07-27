# math.geom.line

## Identity
- **KG ID**: `math.geom.line`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.point`
- **Unlocks**: `math.geom.angle`, `math.geom.parallel-lines`
- **Cross-links**: `math.geom.line-equation` (Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe per the Blueprint).
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5)
- **Estimated hours**: 2
- **Blueprint**: `docs/curriculum/blueprints/math.geom.line.md` (reused by reference throughout this entry).

## Learning Objective
The student will state that a geometric line is a one-dimensional figure extending infinitely in both directions with no endpoints and no thickness, recognize that exactly one line passes through any two distinct points while infinitely many lines pass through a single point, correctly distinguish a line from a ray and a line segment, and recognize a line as a primitive (undefined) term whose properties come from axioms rather than a coordinate equation.

## Core Understanding
Per the Blueprint's Component 1: a geometric line is a one-dimensional figure that extends infinitely in both directions, with no endpoints and no thickness or width. Two distinct points determine exactly one line (Euclid's first postulate), while infinitely many lines pass through a single point (any direction works). Like a point, a line is a primitive term in Euclidean geometry — not defined via simpler objects, only characterized by its axiomatic properties. Three related objects share the "line family" but differ by extent: a line (infinite, both directions, notation ↔PQ), a ray (starts at a point, infinite in one direction, notation →PQ), and a line segment (finite, two endpoints, notation ─PQ or |PQ|). The algebraic equation y=mx+b is a coordinate representation of a line in the plane — a computational tool, not a requirement for the line's existence; vertical lines (x=k) are equally valid geometric lines despite not fitting the y=mx+b form.

## Mental Models
1. **The infinite-laser-path model** (Blueprint TA-A01, P03): a laser beam's idealized mathematical path, extended infinitely in both directions through the source and beyond, with zero width — a real laser beam has finite width, but the mathematical line it traces does not.
2. **The endpoints-versus-infinite-extent model** (Blueprint TA-A02, P64): everyday "draw a line from A to B" means a finite mark — a line SEGMENT; the geometric line through A and B extends infinitely past both points.
3. **The tool-versus-object model** (Blueprint TA-B03, P27): the equation y=mx+b is an algebraic tool for describing a line in a coordinate system — the geometric line itself is defined purely by two distinct points, needing no coordinates or equation at all.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is treating "line" and "line segment" as interchangeable, believing a line has two endpoints — reinforced by everyday speech ("draw a line between A and B" means a segment) and classroom diagrams showing endpoint tick-marks. A second failure is believing a line has measurable thickness, conflating the physical drawn mark (which genuinely has width) with the zero-width abstract object. A third failure is believing a line is only well-defined if it can be written as y=mx+b, missing that the geometric definition requires only two distinct points and that vertical lines are equally valid despite not fitting that algebraic form.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — LINE-HAS-ENDPOINTS** (FOUNDATIONAL)
  - **Blueprint description**: believing a line has two endpoints, or treating "line" and "line segment" as interchangeable.
  - **Birth type**: Type 3, language contamination — everyday speech ("draw a line between A and B") and early classroom diagrams (lines shown with endpoint tick-marks) both use "line" to mean a finite segment, directly contradicting the geometric term's actual meaning.
  - **Repair approach**: Blueprint Repair Action TA-B01 — contrasting the everyday "line from A to B" (a segment, finite, notation ─AB) against the geometric line through A and B (infinite, no endpoints, notation ↔AB).

- **MC-2 — LINE-HAS-THICKNESS** (see Blueprint Component 2)
  - **Blueprint description**: believing a line has measurable width, since every physically drawn or displayed line has visible thickness.
  - **Birth type**: Type 2, perceptual intuition — pencil marks and laser beams genuinely have measurable width, making the zero-width abstraction perceptually counterintuitive.
  - **Repair approach**: Blueprint Repair Action TA-B02 — asking whether two parallel lines 0.001mm apart could ever touch, reinforcing that zero width means parallel lines never intersect regardless of how close they are drawn.

- **MC-3 — LINE-NEEDS-EQUATION** (see Blueprint Component 2)
  - **Blueprint description**: believing a line is only well-defined if it can be written as y=mx+b, missing that the geometric definition needs only two distinct points.
  - **Birth type**: Type 5, instruction-induced — algebraic representations of lines are introduced early and practiced heavily, making the equation feel constitutive of "line-ness" rather than one representational tool among several.
  - **Repair approach**: Blueprint Repair Action TA-B03 — noting vertical lines (x=k) are perfectly valid geometric lines despite not fitting the y=mx+b form, and that the line through two triangle vertices needs no equation to be well-defined.

## Analogies
- **The infinite-laser-beam analogy** (Blueprint TA-A01, P03): a laser beam's idealized path, extended infinitely through the source and out both ends, traces a geometric line — the real beam has width and a finite extent; the mathematical line has neither.

## Demonstrations
- The classification exercise distinguishing a line (arrows both ends), a ray (one arrow), and a segment (no arrows) from a labeled diagram (Blueprint TA-A02, P49), targeting MC-1.
- The two-column contrast table of line versus segment, and line versus ray, using real-world examples (the x-axis; a sunbeam) (Blueprint TA-A03, P06).
- The coordinate-plane transfer probe verifying that y=3x−2 describes a full line (infinitely many points, no endpoint restriction) rather than a ray or segment (Blueprint TA-A04, P76), targeting MC-3.

## Discovery Questions
1. "Does a geometric line have endpoints, or does it go on forever in both directions?"
2. "Could a drawn line ever have truly zero width?"
3. "Does a line need an equation like y=mx+b to be a valid geometric line?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (the infinite-laser analogy and three representations) → TA-A02 (misconception gate for LINE-HAS-ENDPOINTS, contrasting line/ray/segment) → TA-A03 (contrast pairs: line vs. segment, line vs. ray) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the idealized infinite laser-beam path (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — classifying a diagram's line/ray/segment by arrow pattern (Blueprint TA-A02), targeting MC-1.
- **ORGANIZE: Concept Map** — the two-column contrast tables (line vs. segment; line vs. ray) (Blueprint TA-A03).
- **DO: Worked Example** — the y=3x−2 transfer probe confirming the full coordinate set forms a line, not a ray or segment (Blueprint TA-A04, P76), targeting MC-3.

## Voice Teaching Notes
When a student describes "drawing a line" between two points, ask "does that line stop at those two points, or keep going?" as a standing check directly targeting MC-1's endpoints conflation.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.geom.line-equation` per the Blueprint's Component 7 — cross_links includes this target)**: reused verbatim from the Blueprint's Component 4 TA-A04 — the y=3x−2 coordinate-plane scenario, connecting the geometric uniqueness property (two points determine one line) to the algebraic determination of m and b.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 4 TA-A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to redraw any "line" they describe with explicit arrows on both ends (or explain why arrows are absent, confirming it's actually a segment or ray) before accepting any further claim about the object.

## Memory Hooks
- "A line has no endpoints — it goes on forever both ways."
- "A drawn line has width; a geometric line has none."
- "Two points and nothing else define a line — no equation required."

## Transfer Connections
- `math.geom.angle` (unlocks) is formed by two rays sharing an endpoint, rays being sub-objects of lines.
- `math.geom.parallel-lines` (unlocks) requires the line definition to state that two lines in the same plane never intersect.
- `math.geom.line-segment` and `math.geom.ray` (children) are the finite and half-infinite sub-objects this concept's contrast tables directly distinguish.
- `math.geom.line-equation` (cross-link, Blueprint exists) supplies the coordinate representation y=mx+b whose uniqueness property mirrors this concept's own two-points-determine-one-line result.

## Cross-Subject Connections
- Physics: idealized light rays and force-direction vectors reuse this same infinite, zero-width abstraction.

## Blueprint References
`docs/curriculum/blueprints/math.geom.line.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.geom.line-equation` has a Blueprint but no Educational Brain entry) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 2.
