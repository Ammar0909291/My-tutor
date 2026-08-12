# Teaching Blueprint: Reflection (`math.geom.reflection`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.reflection` |
| name | Reflection |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.geom.transformations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — mirror-fold demonstration before the rule |
| description (KG) | A transformation that flips every point over a line of reflection, reversing orientation.

 |

## Component 1 — Learning Objectives

- LO1: Apply a reflection over a specific LINE — e.g. over the $x$-axis: $(x,y)\to(x,-y)$; over the $y$-axis: $(x,y)\to(-x,y)$; over the line $y=x$: $(x,y)\to(y,x)$ — each rule specific to its particular line of reflection.
- LO2: Recognize that reflection REVERSES orientation — unlike translation and rotation (which preserve orientation), a reflected figure is a MIRROR IMAGE, and if you traverse its vertices in the same labeled order as the original, the direction (clockwise vs. counterclockwise) FLIPS.
- LO3: Recognize that a point ON the line of reflection itself maps to ITSELF (is UNCHANGED by the reflection) — since it has zero distance to "flip" across the line.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.transformations` — reflection is one specific type, distinguished by its orientation-reversing property.

## Component 3 — Core Explanation

A **reflection** flips every point of a figure over a LINE of reflection, as if creating a mirror image. Specific rules for common reflection lines: over the $x$-axis, $(x,y)\to(x,-y)$ (the $y$-coordinate negates); over the $y$-axis, $(x,y)\to(-x,y)$ (the $x$-coordinate negates); over the line $y=x$, $(x,y)\to(y,x)$ (the coordinates SWAP) — each specific line has its own transformation rule.

Unlike translation and rotation, reflection REVERSES orientation — this is the key distinguishing property. If you trace a figure's vertices in a specific order (say, counterclockwise) in the original, tracing the SAME labeled vertices in the SAME order in the reflected image goes the OPPOSITE way (clockwise) — the figure has genuinely become its mirror image, not merely moved or turned.

A point lying EXACTLY ON the line of reflection maps to ITSELF — unchanged by the reflection, since it has no perpendicular distance to "flip" across the line.

## Component 4 — Worked Examples

**Example 1 (LO1 — applying specific reflection rules, breaking MC-1)**: Reflect the point $(4,7)$ over the $x$-axis, then SEPARATELY over the $y$-axis. Over the $x$-axis: $(4,7)\to(4,-7)$ ($y$ negates). Over the $y$-axis: $(4,7)\to(-4,7)$ ($x$ negates). A common error confuses which coordinate negates for which axis (e.g. negating $x$ when reflecting over the $x$-axis, instead of $y$) — reflecting OVER the $x$-axis flips the value that measures distance FROM the x-axis, which is $y$; similarly reflecting over the $y$-axis flips $x$, not $y$.

**Example 2 (LO2 — orientation reversal, breaking MC-2)**: For a triangle with vertices labeled $A,B,C$ in COUNTERCLOCKWISE order in the original figure, describe the order after reflecting over the $x$-axis. The reflected triangle's vertices $A',B',C'$ (same labels, corresponding positions) are now traversed in CLOCKWISE order — the orientation has REVERSED. A common error assumes reflection, like translation and rotation, preserves the traversal direction (orientation) — reflection is fundamentally DIFFERENT from those two transformations specifically because it reverses orientation (a "flip," creating a genuine mirror image, not just a repositioned copy).

**Example 3 (LO3 — points on the line of reflection, breaking MC-3-adjacent shortened)**: Reflect the point $(0,5)$ over the $y$-axis. Since $(0,5)$ lies ON the $y$-axis (its $x$-coordinate is 0), it maps to ITSELF: $(0,5)\to(-0,5)=(0,5)$ — unchanged.

## Component 5 — Teaching Actions

### Teaching Action A01 — Matching the Correct Coordinate to Negate for Each Reflection Line (Primitive P64: Conceptual Shift)

Work Example 1, explicitly connecting which coordinate measures distance from which axis, and confirming that's the one that flips.

- **MC-1 hook**: check whether the correct coordinate is negated for the given reflection line.

### Teaching Action A02 — Reflection Reverses Orientation, Unlike Translation and Rotation (Primitive P06: Contrast Pair)

Work Example 2, explicitly tracing vertex order before and after to show the direction reversal, contrasting with translation/rotation's orientation-preserving property.

- **MC-2 hook**: this directly targets MC-2 (assuming reflection preserves orientation like the other transformations).

### Teaching Action A03 — Points on the Line of Reflection Are Unchanged (reused procedure)

Work Example 3, explicitly verifying a point exactly on the reflection line maps to itself.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Reflect the point $(-2,6)$ over the $x$-axis.
  2. Reflect the point $(3,-5)$ over the $y$-axis.
  3. Reflect the point $(7,2)$ over the line $y=x$.
  4. Explain, in one sentence, why reflecting a labeled triangle's vertices reverses the traversal direction, unlike translation or rotation.
- **P76 (Transfer Probe, mode = independence)**: "A graphic designer creates a logo and wants to produce a mirror-image version for use on the reverse side of a product package, by reflecting the logo's coordinate points over a vertical line. (a) Explain why this mirrored version will have REVERSED orientation compared to the original — connecting to why this could be a problem if the logo contains readable text (which would appear backwards). (b) Explain what would happen, specifically, to a design element that happens to sit exactly ON the vertical line of reflection."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | WRONG-COORDINATE-NEGATED-FOR-THE-GIVEN-REFLECTION-LINE | Negating the wrong coordinate for a given reflection line (e.g. negating x when reflecting over the x-axis instead of y) | Foundational |
| MC-2 | REFLECTION-ASSUMED-TO-PRESERVE-ORIENTATION-LIKE-TRANSLATION-AND-ROTATION | Assuming reflection preserves orientation like translation and rotation do, rather than recognizing it uniquely reverses orientation | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Wrong Coordinate Negated for the Given Reflection Line") → P41 (detect: present Example 1 and check whether the correct coordinate is negated for each axis) → P64 (conceptual shift: re-derive by identifying which coordinate measures perpendicular distance from the given reflection line).
- **B02 (targets MC-2)**: P27 ("Reflection Assumed to Preserve Orientation Like Translation and Rotation") → P41 (detect: present Example 2 and check whether orientation reversal is (incorrectly) missed) → P64 (conceptual shift: re-trace the labeled vertices explicitly before and after, confirming the direction genuinely flips).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.transformations`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.rotation` (the other major transformation type, contrasted by orientation preservation).
- **Parent**: `math.geom.transformations`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.85 reflects that this is a fairly direct rule-based transformation once the specific reflection-line rules are memorized correctly.
- Both misconceptions were ranked Foundational because each produces a genuinely wrong result — either an incorrect coordinate transformation, or a fundamentally mischaracterized orientation property.
- The mirror-logo transfer probe was deliberately chosen because reversed text/orientation from reflection is an immediately visible, intuitive real-world consequence, making the orientation-reversal property concrete rather than abstract.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.transformations`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: mirror-fold demonstration before the rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
