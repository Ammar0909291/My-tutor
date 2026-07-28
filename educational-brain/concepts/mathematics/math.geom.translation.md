## Identity

- **KG ID**: `math.geom.translation`
- **Name**: Translation
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 2
- **Requires**: `math.geom.transformations`
- **Unlocks**: (none)
- **Cross-links**: (none)
- **Blueprint**: none — not yet produced by the Curriculum Production Pipeline as of 2026-07-28

## Learning Objective

Apply a translation by vector (h, k) to a figure by mapping each point (x, y) → (x+h, y+k); describe a translation given a pre-image and its image; and identify translations from among the four rigid motions (translation, rotation, reflection, glide-reflection) by the absence of fixed points and preservation of orientation.

## Core Understanding

A translation is a rigid motion (isometry) that slides every point of a figure the same distance in the same direction. The translation vector (h, k) specifies: h units horizontally (positive = right, negative = left) and k units vertically (positive = up, negative = down).

**Coordinate rule**: (x, y) → (x + h, y + k). Every point moves by exactly the same vector — the shape does not rotate, reflect, or stretch.

**Properties**:
- Isometry: distances and angles are preserved (shape and size unchanged)
- Orientation preserved: the figure is not flipped (same handedness as the original)
- No fixed points: no point maps to itself (unless h = k = 0, the identity)
- Composition: two translations (h₁,k₁) followed by (h₂,k₂) = one translation (h₁+h₂, k₁+k₂). Translations compose commutatively.

**Identifying a translation**: given pre-image point A and image A′, the translation vector is (x_{A′} − x_A, y_{A′} − y_A). This vector is the same for every point in the figure.

## Mental Models

- **The sliding rule**: every point in the figure moves along the same arrow — same direction, same length. No point stays behind; no part of the figure stretches or turns.
- **Parallel ghost**: after a translation, the image and pre-image are identical in shape and orientation — they look like parallel copies, as if you placed a tracing of the original on a new spot without turning it.
- **The translation vector as an address change**: the vector (h,k) is a single instruction that every point in the figure receives and follows. Like a postal redirect — every piece of mail to the old address now goes to the new address, shifted by the same offset.

## Why Students Fail

Students commonly apply different shift amounts to different parts of a figure — moving some vertices by (h, k) correctly but sliding others by a different amount, effectively distorting the shape. This usually occurs when students compute the shift by hand for each vertex separately and make arithmetic errors, rather than using the single rule (x+h, y+k) consistently. A second common error is confusing the direction of the translation vector: "move 3 to the left" should produce h = −3, but students often write h = +3, treating the magnitude of the shift as always positive.

## Misconceptions

### MC-1 — INCONSISTENT-SHIFT-PER-VERTEX
**Birth type**: Type 2 (perceptual intuition — when applying a translation by computing each new vertex separately, arithmetic errors introduce varying shifts; visually the distorted figure still "looks close" to the intended translation, masking the error)
**Mechanism**: The student applies the coordinate rule to each vertex of a polygon separately. One or more arithmetic errors produce vertices shifted by a different amount, distorting the image. The error is hidden because the resulting shape may still look roughly like the original.
**Diagnostic probe**: "Translate triangle (1,2), (3,4), (5,1) by (−2, 3)." Check all three image points: (−1,5), (1,7), (3,4). A student with MC-1 may get one vertex wrong while the others are correct.
**Characteristic phrases**: "I moved that vertex differently because it seemed too far" / computational errors producing (−1,5), (1,7), (4,4) rather than (3,4) for the third vertex.

### MC-2 — DIRECTION-SIGN-ERROR
**Birth type**: Type 5 (instruction-induced — "move the figure 3 units to the left" is a natural-language instruction where "3" is a positive magnitude; students who have not yet fully internalized signed coordinates associate "left" with a positive shift rather than a negative one)
**Mechanism**: When a translation is described as "move h units left" or "k units down," the student translates this as x + |h| or y + |k| rather than x − |h| or y − |k|, moving the figure in the wrong direction.
**Diagnostic probe**: "Translate (4, 5) three units to the left and two units down." Watch for (7, 7) (adding magnitudes) rather than (1, 3) (subtracting).
**Characteristic phrases**: "Moving left so I add 3" / "3 to the left means +3" / producing a right-shifted image when a left shift was requested.

### MC-3 — TRANSLATION-AS-ROTATION
**Birth type**: Type 1 (overgeneralization — "transformation" as a category is broad, and students who have not yet clearly delineated the four rigid motions may confuse any diagonal shift with a rotation, especially when the translation vector is diagonal)
**Mechanism**: When the translation vector (h, k) has both components nonzero, the figure appears to have moved diagonally. A student without a firm grasp of the distinction may describe this as "the figure rotated," confusing a diagonal slide with a diagonal turn.
**Diagnostic probe**: "A square is translated by (3, 4). Which property does this NOT preserve?" — misidentifying orientation change (which only reflection does) or incorrectly saying the motion is a rotation.
**Characteristic phrases**: "It looks like it rotated" / "moving diagonally is a rotation" / confusing translation with rotation for non-axis-aligned movement.

## Analogies

- **Chess piece sliding**: moving a rook on a chessboard — the piece slides from one square to another along a straight path; it doesn't rotate or flip. The board's grid corresponds to the coordinate plane; the move instruction corresponds to the translation vector.
- **Stamping**: pressing a rubber stamp on paper once, lifting it, and pressing again in a new location — the impression is identical in shape and orientation, just repositioned. The distance and direction from the first impression to the second is the translation vector.

## Demonstrations

1. **Graph-paper translation**: plot a triangle with vertices at (1,1), (3,1), (2,3). Translate by (4,−2): add 4 to every x-coordinate and −2 to every y-coordinate. New vertices: (5,−1), (7,−1), (6,1). Draw both triangles; connect each original vertex to its image with a parallel arrow. All three arrows are identical — same length, same direction. This is the translation vector.
2. **Physical slide**: cut out a shape from paper. Place it on a coordinate grid. Slide it 5 squares right and 2 squares up without rotating or flipping it. Mark the start and end positions. The shape is identical — no rotation, no mirror flip.
3. **Vector consistency check**: give the triangle vertices after a translation and ask the student to find the translation vector by computing (x_{A′}−x_A) for each vertex. All three must give the same vector — if they don't, the motion was not a pure translation.

## Discovery Questions

- "If you translate a figure by (3,4) and then by (−3,−4), where does the figure end up?"
- "Can two different translation vectors produce the same image? Why or why not?"
- "How is a translation different from a rotation when the figure moves diagonally?"

## Teaching Sequence

1. Review `math.geom.transformations` — the four rigid motions and what "isometry" means.
2. Introduce translation as the "sliding" motion — no rotation, no flip, no size change.
3. Define the translation vector (h, k) and the coordinate rule (x,y) → (x+h, y+k).
4. Apply to a specific triangle on graph paper; verify all arrows from pre-image to image are parallel and equal.
5. Direction sign: "move left" → negative h; "move down" → negative k — with explicit signed-number practice.
6. Finding the translation vector from pre-image and image: compute (x′−x, y′−y) for any vertex.
7. Properties: no fixed points (except identity), orientation preserved.
8. Compose two translations: (h₁,k₁) then (h₂,k₂) = (h₁+h₂, k₁+k₂).
9. Assessment gate.

## Tutor Actions

- MC-1 prevention: before computing individual vertices, write the rule (x+h, y+k) prominently and have the student apply it mechanically to each vertex in turn — checking h and k are the same each time.
- MC-2 intervention: use a number line. "Left means decreasing x — which direction is that on the number line?" Confirm that left = negative before touching a coordinate problem.
- MC-3 intervention: draw a translated triangle and a rotated triangle side by side with the same pre-image and ask "which one is a translation?" The translated figure's orientation is identical to the original; the rotated figure's orientation has changed relative to the coordinate axes. Use an asymmetric figure (like the letter R) to make orientation change visible.

## Voice Teaching Notes

- "Same arrow for every point" is a reliable verbal anchor — return to it whenever a student produces a distorted image.
- When asking about direction: say "which way on the number line?" before asking the student to write the coordinate — grounding in the number line reduces MC-2.
- Use a physical object (eraser, book) and slide it across a table while saying "translate means slide, no spin, no flip" — the physical motion and the vocabulary land together.

## Assessment Signals

- **Coordinate-rule probe**: apply (x,y)→(x+h,y+k) to all vertices of a given polygon.
- **Reverse probe**: given pre-image and image, find the translation vector.
- **Direction probe**: "translate 4 units to the left and 1 unit up" — watch for sign errors on the horizontal component.
- **Property identification probe**: "does a translation change orientation? Does it have fixed points?"
- **Composition probe**: translate a point by (2,3) then by (−1,5); find the single equivalent translation.

## Tutor Recovery Strategy

- **MC-1**: step through one vertex at a time using the rule written explicitly; confirm the same (h,k) was used each time by checking the arrow from each pre-image to image vertex.
- **MC-2**: use a signed number line to anchor direction before applying the coordinate rule; then do a quick graph to visually confirm "it moved left, as requested."
- **MC-3**: use an asymmetric pre-image (letter F or R); after translating, confirm the image has the same orientation (F still faces the same direction). Then rotate the same pre-image 90° and compare — the orientation clearly changes. This makes the distinction perceptually obvious.

## Memory Hooks

- **Translation = slide**: no spin (that's rotation), no flip (that's reflection), no stretch (that's dilation) — just a slide.
- **Rule**: (x, y) → (x + h, y + k). "Add h to x, add k to y — same h and k for every point."
- **Direction signs**: "left and down = negative; right and up = positive" — the standard coordinate-axis sign convention.
- **Composition**: translate by (h₁,k₁) then (h₂,k₂) = add them: (h₁+h₂, k₁+k₂).

## Transfer Connections

- `math.geom.transformations`: translation is one of the four rigid motions catalogued at the parent entry.
- `math.geom.reflection`, `math.geom.rotation`, `math.geom.dilation`: the other transformation types — translations are distinguished from these by their fixed-point-free and orientation-preserving properties.
- `math.geom.vectors-2d`: the translation vector (h, k) is a 2D vector; translations are equivalent to adding a fixed vector to every position vector in the figure.

## Cross-Subject Connections

- Physics: displacement vectors in kinematics are translations of position; adding displacement vectors corresponds to composing translations.
- Computer graphics: every "move an object" operation in a graphics engine is a translation (often represented as a 3×3 or 4×4 transformation matrix with a translation component).

## Blueprint References

- No Blueprint file exists for `math.geom.translation` as of 2026-07-28.
- Misconceptions authored directly via the birth-taxonomy diagnostic procedure (EDUCATIONAL_BRAIN_STANDARD.md §4.2).

## Runtime Asset References

- Explanation assets: `math.geom.translation:EXPLANATION:en` (DRAFT, live-capture path)
- Probe assets: `math.geom.translation:PROBE:en` (DRAFT, live-capture)

## Curriculum Feedback

- The KG description is accurate: "moves every point by the same vector (h, k), preserving shape, size, and orientation." All three preservation properties (shape, size, orientation) are correctly listed and are taught in this entry.
- KG difficulty = proficient with estimated_hours = 2 is appropriate — the concept is conceptually straightforward but requires careful attention to sign conventions and consistent application of the rule across all vertices.

## Version History

- v1.0 (2026-07-28): Initial entry. No Blueprint. 3 misconceptions authored via birth-taxonomy diagnostic.
