# math.geom.perimeter

## Identity
- **KG ID**: `math.geom.perimeter`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.line-segment`
- **Unlocks**: `math.geom.circle-circumference`
- **Cross-links**: none (KG lists none).
- **Difficulty**: foundational
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 3
- **Blueprint**: none exists yet for this concept as of this entry's authoring date; misconceptions authored directly via the birth-taxonomy diagnostic procedure (`educational-brain/misconceptions/01-birth-types.md`).

## Learning Objective
The student will compute the perimeter of a two-dimensional figure as the total length of its boundary (the sum of its side lengths for a polygon), correctly distinguish perimeter from area as measuring fundamentally different properties, recognize that shapes with equal area can have different perimeters and vice versa, and recognize circumference as simply the name for a circle's perimeter — the same underlying concept applied to a curved boundary.

## Core Understanding
Perimeter is the total length of the boundary of a two-dimensional figure — for a polygon, the sum of all its side lengths; for a circle, this same boundary-length concept is given the special name circumference. Perimeter and area measure genuinely different properties: perimeter measures the one-dimensional boundary length (units like cm), while area measures the two-dimensional enclosed region (units like cm²) — they are not interchangeable, and knowing one does not determine the other. Critically, shapes can share the same area while having different perimeters (a long thin rectangle versus a square of equal area have very different perimeters), and shapes can share the same perimeter while having different areas — there is no fixed relationship between the two for irregular or differently-shaped figures.

## Mental Models
1. **The fence-versus-yard model**: perimeter is like the length of fence needed to enclose a yard; area is how much grass fits inside — a long thin yard and a square yard of the same grass area need very different amounts of fencing.
2. **The same-name-different-shape model**: circumference is not a separate concept from perimeter — it is simply what "perimeter" is called when the boundary being measured is a circle's curved edge rather than a polygon's straight edges.
3. **The independent-quantities model**: perimeter and area are two separate, independently-varying measurements of a shape — fixing one does not fix the other.

## Why Students Fail
The foundational failure is conflating perimeter and area, using an area-style formula (like length×width) when perimeter is actually asked for, or vice versa — since both are commonly introduced together using rectangles as the shared first example. A second failure is believing a fixed relationship exists between area and perimeter — assuming two shapes with the same area must share the same perimeter, or that increasing area always increases perimeter proportionally, missing that shape (not just size) independently affects each quantity. A third failure is believing perimeter only applies to straight-sided polygons and that circles genuinely lack a "perimeter" at all, missing that circumference is exactly the same boundary-length concept under a different, curve-specific name.

## Misconceptions
Authored directly via the birth-taxonomy diagnostic procedure (no Blueprint exists for this concept):

- **PERIMETER-CONFLATED-WITH-AREA** (FOUNDATIONAL)
  - **Description**: using an area-style formula (e.g., length×width) when asked for perimeter, or vice versa, treating the two quantities as interchangeable.
  - **Birth type**: Type 3, language contamination — everyday language ("how big is the yard?") doesn't distinguish boundary length from enclosed region, and both concepts are typically taught together using the same rectangle examples, blurring which formula answers which question.
  - **Repair approach**: contrast a rectangle's perimeter (2(l+w), a boundary-length sum) directly against its area (l×w, an enclosed-region product), computing both explicitly for the same rectangle and confirming their different units (cm versus cm²).

- **PERIMETER-AREA-RELATIONSHIP-ASSUMED-FIXED** (Foundational)
  - **Description**: believing shapes with equal area must have equal perimeter (or that perimeter and area always change together proportionally), missing that shape independently affects each quantity.
  - **Birth type**: Type 1, overgeneralization — for the single, most-practiced case of scaling a shape uniformly (e.g., doubling a square's side), area and perimeter DO move together in a fixed relationship, and this special case is incorrectly generalized to ALL shape comparisons.
  - **Repair approach**: directly compare a 1×16 rectangle (area 16, perimeter 34) against a 4×4 square (area 16, perimeter 16) — same area, dramatically different perimeters — refuting any fixed relationship.

- **PERIMETER-ASSUMED-NOT-APPLICABLE-TO-CIRCLES** (Moderate)
  - **Description**: believing "perimeter" only applies to straight-sided polygons, and that circles don't have a perimeter (only a "circumference," treated as an unrelated quantity).
  - **Birth type**: Type 4, notation-induced — the distinct vocabulary word "circumference" for a circle's boundary length, rather than reusing "perimeter" directly, suggests to students these are fundamentally different concepts rather than the same boundary-length idea under a curve-specific name.
  - **Repair approach**: state explicitly that circumference IS a circle's perimeter — the exact same "total boundary length" concept, simply given a specialized name for the curved case, directly previewing `math.geom.circle-circumference`.

## Analogies
- **The fence-around-a-yard analogy**: perimeter is the length of fence needed to enclose a shape's boundary — independent of how much grass (area) fits inside.

## Demonstrations
- Computing a rectangle's perimeter (sum of sides) versus its area (product of sides) for the same shape, confirming different units and different numeric answers, targeting the perimeter-area conflation.
- Comparing a 1×16 rectangle and a 4×4 square, both area 16 but perimeters 34 and 16 respectively, refuting any fixed area-perimeter relationship.
- Stating explicitly that a circle's circumference is its perimeter, previewing the dedicated circumference formula.

## Discovery Questions
1. "Does perimeter measure the boundary length, or the enclosed area?"
2. "If two shapes have the same area, must they have the same perimeter?"
3. "Does a circle have a perimeter, or only polygons do?"

## Teaching Sequence
1. Define perimeter as total boundary length, contrasted directly against area for the same rectangle.
2. Compare two same-area, different-perimeter shapes to refute the fixed-relationship assumption.
3. State that circumference is simply a circle's perimeter, previewing the dedicated circle-circumference concept.
4. Mastery gate: compute the perimeter of a polygon, explain why perimeter and area are independent quantities, and state what circumference measures.

## Tutor Actions
- **TEST-THINKING: Error Analysis** — computing both perimeter and area for the same rectangle, confirming different units and answers, targeting the perimeter-area conflation.
- **DO: Worked Example** — comparing the 1×16 rectangle and 4×4 square's perimeters despite equal area.
- **TELL: Explanation** — circumference as the circle-specific name for perimeter, previewing circle-circumference.
- **TEST-THINKING: Prediction** — before computing, ask whether a question is asking for boundary length (perimeter) or enclosed region (area).

## Voice Teaching Notes
Before any perimeter computation, ask "are we measuring the boundary, or what's inside it?" as a standing check directly targeting the perimeter-area conflation.

## Assessment Signals
- **Transfer probe (independence mode — no cross-link listed in the KG for this concept)**: "A student claims that since a square and a rectangle both have area 36, they must have the same perimeter. Using specific side lengths, show this claim is false."
- **Mastery gate (4-item problem set)**: (1) compute the perimeter of a rectangle with sides 5cm and 8cm; (2) compute its area, confirming the units differ; (3) find two different rectangles with the same perimeter but different areas; (4) explain why a circle's circumference is an instance of the general perimeter concept. MAMR 5/5.

## Tutor Recovery Strategy
If the perimeter-area conflation persists, require the student to state explicitly, before any computation, "boundary length (perimeter) or enclosed region (area)?" and to name the expected unit type (linear versus squared) before proceeding.

## Memory Hooks
- "Perimeter is the fence length; area is the grass inside — different things, different units."
- "Same area doesn't mean same perimeter — shape matters, not just size."
- "Circumference is just a circle's perimeter, with a special name."

## Transfer Connections
- `math.geom.circle-circumference` (unlocks) applies this concept's boundary-length definition specifically to circles.
- `math.geom.line-segment` (requires) supplies the measurable side lengths this concept sums.

## Cross-Subject Connections
- Physics: total path length traveled (as opposed to net displacement) reuses this same boundary/path-length-versus-enclosed-quantity distinction.

## Blueprint References
None — no Blueprint exists for this concept as of this entry's authoring date.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 4 part 2.
