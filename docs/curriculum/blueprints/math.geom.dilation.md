# Teaching Blueprint: Dilation (`math.geom.dilation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.dilation` |
| name | Dilation |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.geom.transformations`, `math.arith.ratios` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — enlarge/shrink a shape about a center point |
| description (KG) | A transformation scaling distances from a center by a constant factor k; produces a similar figure of different size.

 |

## Component 1 — Learning Objectives

- LO1: Apply a dilation with SCALE FACTOR $k$ about a center $C$ — every point's DISTANCE from $C$ gets multiplied by $k$, producing a figure SIMILAR to (same shape, generally different size from) the original.
- LO2: Recognize the meaning of different scale factor RANGES: $k>1$ ENLARGES the figure, $0<k<1$ SHRINKS it, and $k=1$ leaves it UNCHANGED — and (less commonly at this level) negative $k$ additionally flips the figure through the center.
- LO3: Apply the coordinate rule for dilation CENTERED AT THE ORIGIN: $(x,y)\to(kx,ky)$ — and recognize that dilation about a DIFFERENT center requires an analogous translate-scale-translate-back process (paralleling `math.geom.rotation`'s non-origin-center handling).

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.transformations` (the general concept) and `math.arith.ratios` (the scale factor itself is a ratio).

## Component 3 — Core Explanation

A **dilation** scales every point's DISTANCE from a fixed CENTER $C$ by a constant SCALE FACTOR $k$, producing a figure SIMILAR to the original (same shape, generally a different overall size).

The scale factor's VALUE determines the effect: $k>1$ ENLARGES the figure (points move FARTHER from the center); $0<k<1$ SHRINKS it (points move CLOSER to the center); $k=1$ leaves the figure completely UNCHANGED (an identity transformation). (A negative $k$, less commonly emphasized at this level, additionally reflects the figure through the center while also scaling.)

For a dilation CENTERED AT THE ORIGIN specifically, the coordinate rule is simple: $(x,y)\to(kx,ky)$ — multiply BOTH coordinates by the same scale factor $k$. Dilating about a center OTHER than the origin requires an analogous multi-step process (translate the center to the origin, scale, translate back) — directly paralleling the non-origin rotation procedure from `math.geom.rotation`.

## Component 4 — Worked Examples

**Example 1 (LO1, LO3 — basic origin-centered dilation, breaking MC-1)**: Dilate the point $(4,6)$ by scale factor $k=3$, centered at the origin. New point $=(3\times4,3\times6)=(12,18)$. A common error multiplies only ONE coordinate by $k$ (e.g. computing $(12,6)$, leaving $y$ unchanged) — BOTH coordinates must be scaled by the SAME factor $k$ for a dilation.

**Example 2 (LO2 — interpreting scale factor ranges, breaking MC-2)**: For scale factors $k=2$, $k=0.5$, and $k=1$, describe the effect on a figure in each case. $k=2$: the figure DOUBLES in size (enlarges). $k=0.5$: the figure HALVES in size (shrinks). $k=1$: the figure is completely UNCHANGED. A common error assumes any scale factor GREATER than zero (as long as it's positive) enlarges the figure, without distinguishing values above 1 (enlarging) from values between 0 and 1 (shrinking) — the KEY threshold is $k=1$, not merely $k>0$; a positive fractional scale factor genuinely SHRINKS the figure, not enlarges it.

**Example 3 (LO3 — similarity is preserved, ratios of corresponding sides)**: For a triangle dilated by scale factor $k=4$, verify that corresponding side lengths in the new triangle are exactly 4 times the original's, while all angle measures remain UNCHANGED — confirming the dilated figure is SIMILAR (same shape, proportionally scaled size) to the original, directly connecting to `math.geom.similar-triangles`.

## Component 5 — Teaching Actions

### Teaching Action A01 — Scale Both Coordinates by the Same Factor k (Primitive P64: Conceptual Shift)

Work Example 1, explicitly multiplying both $x$ and $y$ by the same $k$.

- **MC-1 hook**: check whether both coordinates are scaled by the same factor, not just one.

### Teaching Action A02 — The k=1 Threshold Distinguishes Enlarging from Shrinking (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting $k>1$ (enlarge), $0<k<1$ (shrink), and $k=1$ (unchanged) side by side.

- **MC-2 hook**: this directly targets MC-2 (assuming any positive scale factor enlarges the figure, rather than distinguishing above/below 1).

### Teaching Action A03 — Dilation Produces a Similar Figure with Proportional Sides (reused procedure)

Present Example 3, connecting the scale factor to proportional side-length scaling and preserved angles.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Dilate the point $(5,-2)$ by scale factor $k=3$, centered at the origin.
  2. Dilate the point $(8,4)$ by scale factor $k=0.25$, centered at the origin, and describe whether the figure enlarges or shrinks.
  3. Explain, in one sentence, why a scale factor between 0 and 1 shrinks a figure rather than enlarging it.
  4. For a triangle dilated by scale factor $k=5$, explain what happens to its side lengths and its angle measures.
- **P76 (Transfer Probe, mode = independence)**: "An architect is scaling down a building's floor plan to fit on a smaller printed page, using a dilation with scale factor $k=0.1$ (reducing all dimensions to 10% of actual size), centered at one corner of the original plan. (a) Explain why this dilation preserves the floor plan's overall SHAPE (all angles and proportions) even though the SIZE changes dramatically. (b) If a wall in the original plan measures 40 feet, find its length on the scaled-down printed version."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ONLY-ONE-COORDINATE-SCALED-BY-K-INSTEAD-OF-BOTH | Multiplying only one coordinate (x or y) by the scale factor k, rather than both coordinates equally | Foundational |
| MC-2 | ANY-POSITIVE-SCALE-FACTOR-ASSUMED-TO-ENLARGE-RATHER-THAN-DISTINGUISHING-ABOVE-BELOW-ONE | Assuming any positive scale factor enlarges the figure, rather than recognizing values between 0 and 1 shrink it | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Only One Coordinate Scaled by k Instead of Both") → P41 (detect: present Example 1 and check whether both coordinates are scaled) → P64 (conceptual shift: re-apply the rule explicitly to both $x$ and $y$ separately, confirming the same factor is used for each).
- **B02 (targets MC-2)**: P27 ("Any Positive Scale Factor Assumed to Enlarge Rather Than Distinguishing Above/Below One") → P41 (detect: present Example 2's $k=0.5$ case and check whether it's (incorrectly) assumed to enlarge) → P64 (conceptual shift: re-examine the $k=1$ threshold explicitly, testing a fractional scale factor concretely).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.transformations`, `math.arith.ratios`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.similar-triangles` (the resulting proportional-similarity relationship).
- **Parent**: `math.geom.transformations`.

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that this concept is a fairly direct rule application, sharing structural similarities with `math.geom.rotation`'s non-origin-center handling.
- Both misconceptions were ranked Foundational because each produces a numerically wrong result or a fundamentally mischaracterized size effect.
- The architectural-scaling transfer probe was deliberately chosen because scale-down blueprints are a genuinely common, concrete real-world dilation application, directly connecting the abstract scale factor to a practical ratio.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.transformations`, `math.arith.ratios`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: enlarge/shrink a shape about a center) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
