## Identity

- **KG ID**: `math.geom.polygon-angle-sum`
- **Name**: Polygon Angle Sum
- **Domain**: Geometry
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4
- **Requires**: `math.geom.triangle-angle-sum`, `math.geom.polygon`
- **Unlocks**: (none)
- **Cross-links**: (none)
- **Blueprint**: none — not yet produced by the Curriculum Production Pipeline as of 2026-07-28

## Learning Objective

Compute the interior angle sum of any convex polygon using (n−2)×180°; find individual interior angles of a regular n-gon using (n−2)×180° / n; explain why the exterior angle sum of any convex polygon is always 360°; and apply these formulas to find missing angles in composite polygon problems.

## Core Understanding

The key idea: any convex polygon can be divided into triangles by drawing diagonals from a single vertex. A polygon with n sides divides into (n−2) non-overlapping triangles. Each triangle contributes 180° to the angle total. Therefore:

**Interior angle sum** = (n−2) × 180°

For a **regular n-gon** (all sides and angles equal), each interior angle = (n−2) × 180° / n.

**Exterior angle sum**: at each vertex of a convex polygon, the exterior angle is 180° minus the interior angle. Walking around the polygon, you make a complete 360° turn — so all exterior angles sum to exactly 360°, regardless of the number of sides or whether the polygon is regular.

Triangulation table for common polygons:
- Triangle (n=3): (3−2)×180° = 180° ✓
- Quadrilateral (n=4): (4−2)×180° = 360°
- Pentagon (n=5): (5−2)×180° = 540°
- Hexagon (n=6): (6−2)×180° = 720°

## Mental Models

- **Triangulation**: fold the polygon into triangles — every interior angle of the polygon belongs to exactly one of those triangles. Adding up all triangle angles gives the polygon's total.
- **The walker's complete turn**: imagine walking the boundary of a polygon. At each corner you turn by the exterior angle. After walking all the way around (returning to your starting direction), you've turned 360° total — always, for any convex polygon.
- **The (n−2) correction**: why n−2 triangles and not n? Starting from one vertex, you draw diagonals to all non-adjacent vertices. A vertex cannot draw a diagonal to itself or to its two immediate neighbors (those are already sides). So for n vertices, you draw to n−3 others, creating n−2 triangles.

## Why Students Fail

The formula (n−2)×180° requires knowing n, but students often confuse n (number of sides) with the number of triangles created (n−2), producing the error n×180°. The "subtract 2" step feels arbitrary without the triangulation proof — a student who has memorized the formula without the proof cannot reconstruct it when they forget whether to subtract 1 or 2. Exterior angles are frequently confused with interior angles (a symmetric error: interior + exterior = 180° at any vertex, so they are paired, not synonymous). Finally, the formula applies to convex polygons; applying it unchanged to concave (non-convex) polygons is a common overgeneralization.

## Misconceptions

### MC-1 — N-TIMES-180-ERROR
**Birth type**: Type 5 (instruction-induced — "triangulate the polygon" is a common instruction, but without grounding in WHY the triangle count is n−2, students count n triangles instead of n−2, perhaps thinking each vertex creates a triangle)
**Mechanism**: The student applies n×180° instead of (n−2)×180°, typically because they've been told "break into triangles" without fully understanding that a single vertex cannot form triangles with its two adjacent vertices (those sides are already polygon edges, not diagonals).
**Diagnostic probe**: "What is the interior angle sum of a pentagon?" Watch for 5×180° = 900° rather than (5−2)×180° = 540°.
**Characteristic phrases**: "I count 5 triangles in the pentagon" / "It's n times 180" / 900° for a pentagon.

### MC-2 — FORMULA-FOR-EACH-ANGLE-APPLIED-TO-IRREGULAR-POLYGON
**Birth type**: Type 1 (overgeneralization — (n−2)×180°/n is the interior angle of a REGULAR polygon, but this is overgeneralized to all polygons)
**Mechanism**: The student correctly computes (n−2)×180° for the total, then divides by n to get "each interior angle," forgetting that this division only gives equal angles if the polygon is regular. In an irregular polygon, individual angles can be any values that sum to (n−2)×180°.
**Diagnostic probe**: "A quadrilateral has angles 70°, 80°, 90°. Find the fourth angle." Watch for the student computing 360°/4 = 90° rather than 360° − 70° − 80° − 90° = 120°.
**Characteristic phrases**: "Divide by n to get each angle" / computing 90° for the fourth angle of a non-rectangular quadrilateral.

### MC-3 — EXTERIOR-INTERIOR-CONFUSION
**Birth type**: Type 5 (instruction-induced — interior and exterior angles appear together in problems; the terms sound like opposites but their summation rules are different, and poor framing often introduces them simultaneously without distinguishing their individual roles)
**Mechanism**: The student confuses which angle is "interior" (inside the polygon at the vertex) and which is "exterior" (the supplement, outside the polygon). Errors include computing exterior angle sum as (n−2)×180° rather than 360°, or using interior angles when exterior angles are needed.
**Diagnostic probe**: "Find the exterior angle sum of a hexagon." Watch for (6−2)×180° = 720° rather than 360°.
**Characteristic phrases**: "The exterior angles also sum to (n−2)×180°" / confusing which angle is at each vertex when drawing the diagram.

### MC-4 — APPLYING-TO-CONCAVE-POLYGONS-UNCHANGED
**Birth type**: Type 1 (overgeneralization — the formula is derived for convex polygons, but is applied without modification to concave polygons whose reflex angles require signed angle treatment)
**Mechanism**: The formula (n−2)×180° holds for convex polygons. For concave polygons, the triangulation from a single vertex may not partition the polygon into n−2 triangles without overlap. Students apply the formula unchanged and obtain incorrect results for concave cases.
**Diagnostic probe**: "This star-shaped polygon has 10 sides. Is its interior angle sum (10−2)×180°?" — designed to surface whether the student knows the convex restriction.
**Characteristic phrases**: applying the formula to any polygon regardless of concavity / no awareness of the convex restriction.

## Analogies

- **Pizza slices**: a hexagonal pizza cut from one corner into 4 triangular slices — each slice is a triangle with a 180° angle sum. Four slices = 4×180° = 720° = (6−2)×180°. The crust edges around the boundary are already there; the cuts only go inward from one corner.
- **Walker's turn**: walk around the outside of a building and turn at each corner. No matter the shape of the building (as long as you don't backtrack), when you return to the door you've turned a total of exactly 360° — one full revolution.

## Demonstrations

1. **Triangulation proof for a pentagon**: draw a convex pentagon. Label vertices A, B, C, D, E. From A, draw diagonals AC and AD. Count the triangles: ABC, ACD, ADE — that's 3 = 5−2 triangles. Each angle sum = 180°; total = 3×180° = 540°. Have the student repeat for a hexagon (4 diagonals, 4 triangles, 720°).
2. **Exterior angle sum physical demo**: trace the boundary of a convex polygon on the floor with tape. Walk it, turning at each corner. Count the total degrees turned. Result: always 360°, regardless of shape.
3. **Regular polygon individual angle**: for a regular octagon: (8−2)×180° = 1080°; each angle = 1080°/8 = 135°. Compare with a square (90°) and a regular hexagon (120°). Pattern: as n grows, each interior angle approaches 180°.

## Discovery Questions

- "How many triangles can you cut a quadrilateral into, from a single vertex? How many degrees total?"
- "If the exterior angle sum is always 360°, what must be true about the interior angle sum as n increases?"
- "Could a polygon have an interior angle sum of 1260°? How many sides would it have?"

## Teaching Sequence

1. Revisit `math.geom.triangle-angle-sum` (180°) — the foundational result.
2. Draw a quadrilateral, cut it into 2 triangles from one vertex — total angle sum = 2×180° = 360°. Confirm with measuring.
3. Repeat for a pentagon (3 triangles = 540°) and hexagon (4 triangles = 720°) — build the table.
4. Generalize: n-gon → (n−2) triangles → (n−2)×180°. Explain why the count is n−2.
5. Regular polygon formula: divide total by n (valid only for regular polygons — flag this explicitly).
6. Exterior angle sum: derive from interior angles (each pair sums to 180°; n pairs; total interior = (n−2)×180°; total exterior = n×180° − (n−2)×180° = 360°).
7. Application problems: find a missing interior angle in an irregular polygon given all others.
8. Assessment gate.

## Tutor Actions

- Before presenting the formula, have the student triangulate a specific polygon (draw the diagonals, count the triangles) — the formula should emerge from the pattern.
- MC-1 intervention: draw the triangulation explicitly, label each triangle, count aloud — "we cut 5 triangles? No, from one corner, you can't reach the adjacent ones — so 3 triangles, not 5."
- MC-2 intervention: present an irregular quadrilateral with three known angles, ask for the fourth — the student cannot divide by n; they must subtract from 360°. Frame this as "dividing by n only works for regular polygons where all angles are equal."
- Exterior angle derivation: do it algebraically once (n×180° − (n−2)×180° = 360°), then physically once (walker's turn) — both reinforce the same fact from different directions.

## Voice Teaching Notes

- "How many triangles did you make?" — let the student count before stating the formula.
- When a student gives 900° for a pentagon, respond: "Let's count the triangles together" — redirect to the triangulation rather than immediately correcting the arithmetic.
- Say "regular polygon" explicitly every time the per-angle formula is used — make the regularity condition a verbal habit, not an implicit assumption.

## Assessment Signals

- **Triangulation probe**: "How many triangles does a heptagon (7-gon) divide into from one vertex?" (answer: 5)
- **Total angle sum probe**: compute (n−2)×180° for n = 8, 10, 12.
- **Regular polygon angle probe**: "What is each interior angle of a regular hexagon?"
- **Irregular polygon probe**: three angles of a quadrilateral are given; find the fourth.
- **Exterior angle probe**: "What is the sum of the exterior angles of a 15-gon?"
- **MC-4 probe**: "Can this formula be applied to any polygon? What's the restriction?"

## Tutor Recovery Strategy

- **MC-1**: re-derive from first principles — draw the polygon, triangulate from vertex A, count the triangles physically. "We made (n−2) triangles, not n — the two sides adjacent to A were already polygon edges."
- **MC-2**: irregular polygon problem — if the student divides by n, ask "what if the angles aren't all equal?" then provide a specific irregular quadrilateral where dividing by 4 gives the wrong answer.
- **MC-3**: draw the interior and exterior angles at one vertex side by side; label them; state "they're a pair that adds to 180°, but they're different angles." Then use the walker demo to confirm the exterior sum is 360°.
- **MC-4**: show a concave polygon (with a reflex angle); ask the student to try triangulating from one vertex. The triangles will overlap, or leave part of the polygon uncovered — making the convex restriction visible.

## Memory Hooks

- **(n−2) triangles**: "n-gon minus 2 triangles — you lose the two sides already touching your starting vertex."
- **Interior sum**: "(n − 2) × 180° — two fewer triangles than corners."
- **Exterior sum**: "always 360° — one full trip around the block."
- **Regular polygon each angle**: "(n−2) × 180° ÷ n — total divided by the number of equal shares."

## Transfer Connections

- `math.geom.triangle-angle-sum`: the 180° result is the base case (n=3) of the polygon angle sum formula.
- `math.geom.regular-polygon`: each interior angle of a regular n-gon is computed directly from this formula.
- `math.geom.geometric-proof`: the triangulation argument is a constructive proof — this concept provides a concrete example of geometric proof by construction.

## Cross-Subject Connections

- Architecture/engineering: tile patterns, regular polygon grids (why hexagons tile the plane: each interior angle is 120°, and 3×120° = 360°, so three hexagons fit perfectly around each vertex).
- Physics: crystalline structures use the constraint that polygon angles around a point must sum to 360°.

## Blueprint References

- No Blueprint file exists for `math.geom.polygon-angle-sum` as of 2026-07-28.
- Misconceptions authored directly via the birth-taxonomy diagnostic procedure (EDUCATIONAL_BRAIN_STANDARD.md §4.2).

## Runtime Asset References

- Explanation assets: `math.geom.polygon-angle-sum:EXPLANATION:en` (DRAFT, live-capture path)
- Probe assets: `math.geom.polygon-angle-sum:PROBE:en` (DRAFT, live-capture)

## Curriculum Feedback

- The KG description is exact and self-contained. No discrepancies with the formula (n−2)×180°.
- The KG's unlocks list is empty — the formula is a terminal result at this level rather than a prerequisite for specific further concepts at the proficient tier in this domain.

## Version History

- v1.0 (2026-07-28): Initial entry. No Blueprint. 4 misconceptions authored via birth-taxonomy diagnostic.
