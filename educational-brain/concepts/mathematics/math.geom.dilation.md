## Identity

- **KG ID**: `math.geom.dilation`
- **Name**: Dilation
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 3
- **Requires**: `math.geom.transformations`, `math.arith.ratios`
- **Unlocks**: (none)
- **Cross-links**: (none)
- **Blueprint**: none — not yet produced by the Curriculum Production Pipeline as of 2026-07-28

## Learning Objective

Apply a dilation centered at the origin or at a given point C by scale factor k to a figure; compute image coordinates using the dilation rule; identify the scale factor and center of dilation from a pre-image and image; state which properties are preserved under dilation (angles, shape, orientation) and which are not (lengths, perimeter, area); and compute the effect on area (scales by k²) and perimeter (scales by |k|).

## Core Understanding

A dilation scales a figure from a **center of dilation** C by a **scale factor** k. Every point P maps to P′ such that CP′ = k × CP and P′ lies on ray CP (same side as P for k > 0; opposite side for k < 0).

**Coordinate rule (center at origin)**: (x, y) → (kx, ky). For k > 0 the image is on the same side of the origin; for k < 0 it is on the opposite side (equivalent to a dilation then a 180° rotation).

**Coordinate rule (center at (cx, cy))**: (x, y) → (cx + k(x − cx), cy + k(y − cy)).

**What dilation preserves**:
- Angle measures (all angles unchanged)
- Shape (the image is similar to the pre-image)
- Orientation (for k > 0; reversed for k < 0)

**What dilation does NOT preserve**:
- Distances: each length is multiplied by |k|
- Perimeter: scales by |k|
- Area: scales by **k²** (quadratic — this is the key non-linear result)

**Special cases**:
- k = 1: identity (no change)
- k = −1: point reflection (180° rotation about the center)
- |k| > 1: enlargement (image larger than pre-image)
- 0 < |k| < 1: reduction (image smaller than pre-image)
- The center of dilation is the only fixed point (unless k = 1, where all points are fixed)

## Mental Models

- **Zoom in/zoom out**: a camera zoom changes every distance from the lens by the same factor. The zoom center (the lens) is the only point that doesn't move. The scene is exactly similar — same angles, same shape — just at a different size.
- **Shadow scaling**: a lamp at a fixed point projects a shadow of an object onto a wall. Moving the object closer to or farther from the lamp changes the shadow's size but not its shape — the lamp is the center of dilation, and the scale factor is determined by the distances to lamp and wall.
- **Rubber sheet stretching**: imagine the coordinate plane as a rubber sheet fixed at the center of dilation. Stretching it uniformly by factor k moves every point k times as far from the fixed center. Every shape on the sheet is scaled but not distorted.

## Why Students Fail

The most persistent error is linear thinking about area: students who correctly identify that lengths scale by k assume area scales by k as well, ignoring that area is a two-dimensional measurement. A square with side length s has area s²; scaling the side by k gives area (ks)² = k²s². The quadratic scaling of area is non-intuitive. A second common error is assuming the origin is always the center of dilation — in many textbook examples the center is the origin, and students do not generalize to arbitrary centers.

## Misconceptions

### MC-1 — AREA-SCALES-BY-K-NOT-K²
**Birth type**: Type 1 (overgeneralization — length scales linearly by k; students extend this linearity to area without accounting for the two-dimensional nature of area)
**Mechanism**: After learning that lengths scale by k under dilation, the student applies the same factor to area: "if scale factor is 3, the area is 3 times as large." The correct factor is 3² = 9. This error is especially common when students have only worked with perimeter (which does scale by k) and have not yet encountered area problems under dilation.
**Diagnostic probe**: "A square has area 16 cm². It is dilated by scale factor 3. What is the area of the image?" Watch for 48 cm² (k × area) rather than 144 cm² (k² × area).
**Characteristic phrases**: "I multiply by 3" / "scale factor 3 means 3 times the area" / 48 cm² for the answer.

### MC-2 — CENTER-ALWAYS-AT-ORIGIN
**Birth type**: Type 5 (instruction-induced — most introductory dilation problems use the origin as the center; students internalize the origin-centered rule and do not generalize to arbitrary center points)
**Mechanism**: The student knows the origin-centered rule (x,y) → (kx,ky) and applies it regardless of where the center of dilation is stated. When the center is at (2,3) rather than (0,0), they still multiply the original coordinates by k rather than computing the displacement from the center.
**Diagnostic probe**: "Dilate (5, 7) by scale factor 2, centered at (2, 3)." Watch for (10, 14) (origin-centered) rather than (2 + 2(5−2), 3 + 2(7−3)) = (8, 11).
**Characteristic phrases**: "I just multiply by k" / not adjusting for a non-origin center / answer = (10, 14) for the probe above.

### MC-3 — NEGATIVE-SCALE-FACTOR-MEANS-REFLECTION
**Birth type**: Type 1 (overgeneralization — a negative scale factor changes the sign of coordinates, which students associate with reflections; they ignore the scaling component and interpret the result as a pure reflection)
**Mechanism**: Dilation by scale factor −2 should produce an image twice as large on the opposite side of the center. Students who see coordinates negated (when center is origin, k < 0 gives (kx,ky) with k negative) interpret this as a reflection over an axis rather than a scaled reflection through the center.
**Diagnostic probe**: "Dilate (1, 2) by scale factor −3 centered at the origin." Watch for (−1, −2) (unit reflection only, ignoring scaling) rather than (−3, −6) (scaled by |k| = 3 and placed on opposite side).
**Characteristic phrases**: "Negative means it flips" / (−1,−2) instead of (−3,−6) / not applying the magnitude scaling.

### MC-4 — DILATION-CHANGES-ANGLE-MEASURES
**Birth type**: Type 1 (overgeneralization — dilation changes lengths, so students assume it also changes angles, incorrectly concluding that the dilated figure is not similar to but different from the original in shape)
**Mechanism**: Dilation visibly changes the size of a figure. Students who have not yet solidified that "similar" means "same shape, different size" may believe that scaling a figure also stretches its angles — perhaps comparing it to a physical deformation that changes both size and shape.
**Diagnostic probe**: "A triangle is dilated by scale factor 5. What are the angle measures of the image?" Watch for the student recomputing angles rather than stating they are unchanged.
**Characteristic phrases**: "The angles get bigger too" / "the shape changes when you scale it" / recomputing angle measures after dilation.

## Analogies

- **Photographic enlargement**: enlarging a photograph from 4×6 to 8×12 doubles every length. The photo is similar to the original — same proportions, same angles, just bigger. The "center" of the enlargement is the projector lens; the scale factor is 2. Area quadruples (4×4×6 = 96 vs. 8×8×12 = 384... wait — example should be: 4×6=24 in², 8×12=96 in² = 4 × 24 = k² × original area).
- **Shrink ray**: a shrink ray (scale factor 0.5) reduces every length by half. A cube with side 2 m becomes a cube with side 1 m. Volume shrinks by (0.5)³ = 0.125; area by (0.5)² = 0.25. The shape is identical — angles unchanged, proportions unchanged.

## Demonstrations

1. **Origin-centered dilation**: plot triangle (1,0), (0,2), (2,2). Dilate by k = 3 centered at origin: (3,0), (0,6), (6,6). Draw rays from origin through each original vertex — confirm the image vertex lies on the same ray at 3× the distance.
2. **Area comparison**: draw a 2×2 square (area 4). Dilate by k = 3 → 6×6 square (area 36 = 9 × 4 = k² × original area). Compare 4 and 36 visually — the image covers 9 tiles the size of the original, not 3.
3. **Non-origin center**: center at (2, 1), k = 2. Point (4, 3): displacement from center = (4−2, 3−1) = (2, 2). Scaled displacement = (4, 4). Image = center + scaled displacement = (2+4, 1+4) = (6, 5). Verify: distance from center to original = √(4+4) = 2√2; distance from center to image = √(16+16) = 4√2 = 2 × 2√2 ✓.

## Discovery Questions

- "If a dilation scales lengths by k, what does it do to areas? What about volumes in 3D?"
- "Where is the one point that doesn't move under a dilation with scale factor k ≠ 1?"
- "Can a dilation produce an image that is congruent (not just similar) to the pre-image? What would k have to be?"

## Teaching Sequence

1. Review `math.geom.transformations` — which transformations preserve size (isometries) vs. which don't.
2. Review `math.arith.ratios` — scale factor as a ratio of corresponding lengths.
3. Introduce dilation: center, scale factor, and the rule CP′ = k × CP.
4. Origin-centered coordinate rule: (x,y) → (kx,ky). Demonstrate with a triangle.
5. Properties preserved: angles and shape (similarity). Properties not preserved: lengths, perimeter.
6. Area scaling: k² derivation — a 1×1 unit square maps to a k×k square, area k². Generalize.
7. Non-origin center: displacement-from-center rule.
8. Special cases: k = 1 (identity), k = −1 (point reflection), |k| > 1 (enlargement), 0 < |k| < 1 (reduction).
9. Assessment gate.

## Tutor Actions

- MC-1 prevention: introduce the area-scaling result before any problems — derive it explicitly (unit square → k×k square). Make the k² result a named property, not a computation to rediscover.
- MC-2 intervention: present a dilation centered at a non-origin point in the very first or second problem, before the origin-only habit forms.
- MC-3 intervention: work a negative-scale-factor example explicitly — k = −2, origin-centered. Compute (kx,ky) with k = −2 for a specific triangle. Note both the flip (opposite side of center) and the scaling (twice as far). Name both components.
- MC-4 intervention: measure angles in the pre-image and image triangle with a protractor (or compute with coordinates). Confirm they're equal. Name the property: "dilation is NOT an isometry — it changes size — but it is a similarity transformation — it preserves angles."

## Voice Teaching Notes

- "Where does the zoom come from?" — ask the student to identify the center of dilation before any computation.
- When area comes up: pause and ask "if lengths scale by k, what scales quadratically?" — lead the student to k² rather than stating it.
- "Similar, not congruent" — dilation produces a figure that is similar (same shape) but not congruent (different size, unless k = ±1).
- For non-origin centers: "find the displacement, scale it, add it back" — state this three-step procedure explicitly.

## Assessment Signals

- **Coordinate rule probe**: dilate a given polygon from the origin by a named scale factor.
- **Area probe**: compute the area of the dilated image given the original area and scale factor.
- **Non-origin center probe**: dilate a point from a non-origin center.
- **Properties probe**: "which of the following does dilation preserve: angles, lengths, perimeter, area, shape?"
- **Scale factor identification probe**: given pre-image and image, find the scale factor and center of dilation.
- **Negative scale factor probe**: dilate a point by k = −2; find the image and describe it geometrically.

## Tutor Recovery Strategy

- **MC-1**: return to the unit-square derivation. "A 1×1 square becomes a k×k square — new area is k², not k×1." Then verify with a specific numeric example (k = 3: 1 unit² → 9 unit²). Confirm the student can predict the area ratio before computing.
- **MC-2**: re-derive the coordinate formula for a general center — "the rule is: find how far you are from the center, scale that distance by k, add back to the center." Work through a non-origin example step by step.
- **MC-3**: compute the dilation with k = −2 for a specific point and confirm both the sign change AND the magnitude scaling. Compare the distance from center to original vs. center to image: image is |k| = 2 times farther.
- **MC-4**: compute the angle sum of the pre-image and image triangles. Both sum to 180°; individual angles match. State explicitly: "dilation never changes angle measures — that's what makes the result similar (same angles) rather than congruent (same angles and same size)."

## Memory Hooks

- **Area scales by k²**: "dilation in TWO dimensions — everything gets doubled, once for each dimension — so the factor squares."
- **Center of dilation is the only fixed point** (for k ≠ 1): "the zoom point stays put."
- **Non-origin center rule**: displacement from center → scale it → add back to center.
- **k > 1**: enlargement; **0 < k < 1**: reduction; **k = 1**: identity; **k < 0**: scaled point reflection.

## Transfer Connections

- `math.geom.transformations`: dilation is categorized here as the non-isometry among the four geometric transformations.
- `math.geom.similar-triangles`: two similar triangles are related by a dilation (possibly combined with a rotation or reflection). Dilation is the transformation underlying the concept of similarity.
- `math.arith.ratios`: the scale factor is the ratio of image length to pre-image length. All ratio reasoning applies directly.
- `math.geom.translation`, `math.geom.reflection`: contrasted with dilation — those are isometries (preserve length); dilation is not.

## Cross-Subject Connections

- Physics: scale models of buildings, maps, and engineering drawings all use dilation. A 1:100 scale model has all lengths 1/100 of the original, area 1/10000, and volume 1/1,000,000.
- Biology: cell division and growth are often modeled as spatial scaling. The relationship between surface area (scales as k²) and volume (scales as k³) under dilation is directly relevant to the "surface-area-to-volume problem" constraining cell size.

## Blueprint References

- No Blueprint file exists for `math.geom.dilation` as of 2026-07-28.
- Misconceptions authored directly via the birth-taxonomy diagnostic procedure (EDUCATIONAL_BRAIN_STANDARD.md §4.2).

## Runtime Asset References

- Explanation assets: `math.geom.dilation:EXPLANATION:en` (DRAFT, live-capture path)
- Probe assets: `math.geom.dilation:PROBE:en` (DRAFT, live-capture)

## Curriculum Feedback

- The KG description "scaling distances from a center by a constant factor k; produces a similar figure of different size" accurately identifies the two key properties: scaling and similarity. The word "similar" is correctly included — dilation is the transformation underlying similarity.
- The KG lists `math.arith.ratios` as a prerequisite — correctly grounding the scale factor concept in ratio arithmetic before formal geometry.

## Version History

- v1.0 (2026-07-28): Initial entry. No Blueprint. 4 misconceptions authored via birth-taxonomy diagnostic.
