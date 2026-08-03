# Teaching Blueprint: Translation (`math.geom.translation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.translation` |
| name | Translation |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.geom.transformations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — slide a shape on a grid before the formula |
| description (KG) | A transformation that moves every point by the same vector (h, k), preserving shape, size, and orientation.

 |

## Component 1 — Learning Objectives

- LO1: Apply a translation by vector $(h,k)$ — mapping EVERY point $(x,y)\to(x+h,y+k)$ — using the SAME $(h,k)$ shift for EVERY point of the figure, not a different shift per point.
- LO2: Recognize that translation PRESERVES shape, size, AND orientation — the translated figure is CONGRUENT to the original (same size and shape) and faces the SAME direction (no rotation or flipping occurs).
- LO3: Given a figure's image AFTER translation (or a specific point's before/after pair), determine the translation vector $(h,k)$ by SUBTRACTING corresponding coordinates — $h=x_{\text{new}}-x_{\text{old}}$, $k=y_{\text{new}}-y_{\text{old}}$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.transformations` — translation is one specific type of transformation.

## Component 3 — Core Explanation

A **translation** is a transformation that moves EVERY point of a figure by the SAME vector $(h,k)$: each point $(x,y)$ maps to $(x+h,y+k)$ — the identical shift applied uniformly across the whole figure, never varying from point to point.

Translation PRESERVES shape, size, AND orientation — the resulting image is CONGRUENT to the original (identical shape and size) and faces the exact same direction (nothing is rotated or flipped) — only its POSITION changes.

Given a known before/after point pair (or a figure's original and translated image), the translation vector can be found by SUBTRACTING the original coordinates from the new coordinates: $h=x_{\text{new}}-x_{\text{old}}$, $k=y_{\text{new}}-y_{\text{old}}$.

## Component 4 — Worked Examples

**Example 1 (LO1 — applying a translation, breaking MC-1)**: Translate the point $(3,5)$ by vector $(2,-4)$. New point $=(3+2,5+(-4))=(5,1)$. For a whole TRIANGLE with vertices $(1,1)$, $(4,1)$, $(4,3)$, translate ALL THREE by the same $(2,-4)$: new vertices $(3,-3)$, $(6,-3)$, $(6,-1)$. A common error applies a DIFFERENT shift to each vertex (perhaps mistakenly re-deriving a "new" shift per point instead of reusing the same fixed $(h,k)$) — translation requires the IDENTICAL vector for every single point of the figure, with no exceptions.

**Example 2 (LO2 — shape and orientation preservation)**: Confirm that translating a triangle preserves its side lengths and angle measures. Since EVERY point shifts by the SAME amount, the RELATIVE positions of all points to each other are UNCHANGED — distances between any two points of the figure, and hence all side lengths and angles, remain exactly the same after translation, confirming congruence and orientation preservation.

**Example 3 (LO3 — finding the translation vector, breaking MC-2)**: A point $(4,2)$ is translated to $(1,9)$. Find the translation vector. $h=1-4=-3$, $k=9-2=7$ — vector $(-3,7)$. A common error computes the vector using the SUBTRACTION IN THE WRONG ORDER (old minus new, giving $(4-1,2-9)=(3,-7)$, the NEGATIVE of the correct vector) — the vector must be NEW minus OLD (the direction of the actual movement), not the reverse.

## Component 5 — Teaching Actions

### Teaching Action A01 — Apply the Same (h,k) Shift to Every Point (Primitive P64: Conceptual Shift)

Work Example 1, explicitly applying the identical shift to all three triangle vertices.

- **MC-1 hook**: check whether the same $(h,k)$ is applied consistently to every point.

### Teaching Action A02 — Shape, Size, and Orientation All Preserved (reused procedure)

Present Example 2, explicitly connecting the uniform-shift property to congruence and orientation preservation.

### Teaching Action A03 — Vector = New Minus Old, Not Old Minus New (Primitive P06: Contrast Pair)

Work Example 3, contrasting the correct subtraction order against the reversed (sign-flipped) incorrect order.

- **MC-2 hook**: this directly targets MC-2 (computing the translation vector with subtraction in the wrong order).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Translate the point $(6,-2)$ by vector $(-3,5)$.
  2. Translate a square with vertices $(0,0)$, $(2,0)$, $(2,2)$, $(0,2)$ by vector $(4,1)$, finding all four new vertices.
  3. A point $(7,3)$ is translated to $(2,10)$. Find the translation vector.
  4. Explain, in one sentence, why a translation preserves a figure's shape and orientation.
- **P76 (Transfer Probe, mode = independence)**: "A video game designer needs to move an entire spaceship sprite (made of many pixels, each with its own coordinates) 50 pixels to the right and 20 pixels up on the screen, without rotating or resizing the ship. (a) Explain why translation is the correct transformation to use here, connecting to its shape/size/orientation-preserving property. (b) If a specific pixel of the ship was originally at $(100,200)$, find its new coordinates after this translation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIFFERENT-SHIFT-APPLIED-TO-DIFFERENT-POINTS-OF-THE-FIGURE | Applying a different (h,k) shift to different points of the figure, instead of the same fixed vector for every point | Foundational |
| MC-2 | TRANSLATION-VECTOR-COMPUTED-WITH-SUBTRACTION-IN-THE-WRONG-ORDER | Computing the translation vector as old-minus-new instead of new-minus-old, producing the negative of the correct vector | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Different Shift Applied to Different Points of the Figure") → P41 (detect: present Example 1 and check whether the same $(h,k)$ is used for every vertex) → P64 (conceptual shift: re-apply the identical shift explicitly to each point in turn, verifying consistency).
- **B02 (targets MC-2)**: P27 ("Translation Vector Computed with Subtraction in the Wrong Order") → P41 (detect: present Example 3 and check whether the subtraction order is reversed) → P64 (conceptual shift: re-derive the vector explicitly as "where it ends up" minus "where it started").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.transformations`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.rotation`, `math.geom.reflection` (the other rigid transformations).
- **Parent**: `math.geom.transformations`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.85 reflects that this is a relatively direct transformation once the "same shift for every point" idea is clear.
- Both misconceptions were ranked Foundational because each produces a genuinely wrong result — an inconsistent, malformed transformation, or a sign-flipped vector.
- The video-game-sprite transfer probe was deliberately chosen because uniform pixel-shifting is a genuinely common real application of translation, reinforcing why the SAME shift must apply to every point of a complex figure.

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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: slide a shape on a grid before formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
