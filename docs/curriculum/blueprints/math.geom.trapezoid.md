# Teaching Blueprint: Trapezoid (`math.geom.trapezoid`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.trapezoid` |
| name | Trapezoid |
| domain | Geometry |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.geom.quadrilateral` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — labeled trapezoid diagram before the formula |
| description (KG) | A quadrilateral with exactly one pair of parallel sides (the bases); area = ½(b₁ + b₂)h.

 |

## Component 1 — Learning Objectives

- LO1: Identify a TRAPEZOID as a quadrilateral with EXACTLY ONE pair of parallel sides (called the BASES, $b_1$ and $b_2$) — and distinguish this from `math.geom.parallelogram`, which has BOTH pairs of opposite sides parallel.
- LO2: Apply the trapezoid area formula $A=\frac{1}{2}(b_1+b_2)h$, where $h$ is the PERPENDICULAR height (distance) between the two parallel bases, NOT the length of a slanted side.
- LO3: Recognize the formula as AVERAGING the two base lengths, then multiplying by height — connecting to why this makes geometric sense (a trapezoid's area is "between" a rectangle using the shorter base and one using the longer base).

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.quadrilateral` — the trapezoid is a specific, defined subtype.

## Component 3 — Core Explanation

A **trapezoid** is a quadrilateral with EXACTLY ONE pair of parallel sides, called the **bases** ($b_1$ and $b_2$, generally different lengths) — this is the key distinction from `math.geom.parallelogram`, which requires BOTH pairs of opposite sides to be parallel.

The trapezoid's area is $A=\frac{1}{2}(b_1+b_2)h$, where $h$ is the PERPENDICULAR (shortest) distance between the two parallel bases — NOT the length of either of the other two (non-parallel) sides, which are generally slanted and longer than the true perpendicular height.

This formula makes intuitive sense as AVERAGING the two base lengths ($\frac{b_1+b_2}{2}$) and multiplying by the height — as if the trapezoid's area sits "between" a rectangle using the shorter base and one using the longer base, at their shared height.

## Component 4 — Worked Examples

**Example 1 (LO1 — distinguishing from parallelogram, breaking MC-1)**: Determine whether a quadrilateral with sides of length 5, 8, 5, 8 (opposite sides equal, both pairs parallel) is a trapezoid. This is a PARALLELOGRAM (both pairs of opposite sides parallel), NOT specifically classified as a "trapezoid" under the strict "EXACTLY one pair parallel" definition used here. A common error labels ANY quadrilateral with at least one pair of parallel sides as a "trapezoid," including parallelograms (which have TWO pairs) — under this strict definition, a trapezoid has EXACTLY one parallel pair, making trapezoids and parallelograms mutually EXCLUSIVE categories (not one containing the other).

**Example 2 (LO2 — using perpendicular height, not a slanted side, breaking MC-2)**: Find the area of a trapezoid with bases 6 and 10, and a slanted side of length 5, where the PERPENDICULAR height is actually 4 (given separately, since the slanted side's length of 5 is NOT the height). $A=\frac{1}{2}(6+10)(4)=\frac{1}{2}(16)(4)=32$. A common error uses the SLANTED side's length (5) as $h$ directly in the formula (since it's a given numerical side length), rather than correctly identifying and using the PERPENDICULAR distance between the bases — the slanted side is generally LONGER than the true perpendicular height (since it's the hypotenuse of a right triangle formed by the height and the horizontal offset), so substituting it directly overestimates the area.

**Example 3 (LO3 — the averaging interpretation)**: For a trapezoid with bases 4 and 12 and height 5, verify the area using the "averaging" interpretation: average base $=\frac{4+12}{2}=8$, so area $=8\times5=40$ — matching the direct formula $\frac{1}{2}(4+12)(5)=\frac{1}{2}(16)(5)=40$, confirming the "average width times height" intuition.

## Component 5 — Teaching Actions

### Teaching Action A01 — Trapezoids and Parallelograms Are Mutually Exclusive Categories (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting a one-pair-parallel case (trapezoid) against a two-pairs-parallel case (parallelogram).

- **MC-1 hook**: this directly targets MC-1 (labeling any one-parallel-pair-or-more quadrilateral as a trapezoid, including parallelograms).

### Teaching Action A02 — Height Must Be the Perpendicular Distance, Not a Slanted Side (Primitive P64: Conceptual Shift)

Work Example 2, explicitly distinguishing the slanted side's length from the true perpendicular height.

- **MC-2 hook**: this directly targets MC-2 (using a slanted side's length as $h$ in the formula).

### Teaching Action A03 — The Formula as Averaging the Bases (Primitive P11: Representation Shift)

Work Example 3, explicitly connecting the formula to the "average width times height" intuition.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Determine whether a quadrilateral with only one pair of parallel sides (of different lengths) is a trapezoid or a parallelogram.
  2. Find the area of a trapezoid with bases 5 and 9, and perpendicular height 6.
  3. Given a trapezoid with bases 7 and 13 and a slanted side of length 10, but a true perpendicular height of 8, find the area (being careful about which value to use for $h$).
  4. Explain, in one sentence, why the trapezoid area formula averages the two base lengths before multiplying by height.
- **P76 (Transfer Probe, mode = independence)**: "A landscaper needs to calculate the area of a trapezoidal garden plot with parallel edges of 12 m and 20 m, and has measured one of the SLANTED side edges as 9 m (not perpendicular to either base) — but has separately confirmed the true perpendicular width (height) between the two parallel edges is 7 m. (a) Calculate the plot's area using the correct trapezoid formula. (b) Explain why using the 9 m slanted-edge measurement directly as the height would give an incorrect (overestimated) area."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TRAPEZOID-DEFINITION-CONFLATED-WITH-PARALLELOGRAM-INCLUDING-TWO-PARALLEL-PAIRS | Classifying any quadrilateral with at least one pair of parallel sides (including parallelograms with two pairs) as a trapezoid, rather than requiring exactly one pair | Moderate |
| MC-2 | SLANTED-SIDE-LENGTH-USED-AS-HEIGHT-INSTEAD-OF-TRUE-PERPENDICULAR-DISTANCE | Using a trapezoid's slanted (non-parallel) side length as h in the area formula, instead of the true perpendicular distance between the bases | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Trapezoid Definition Conflated with Parallelogram Including Two Parallel Pairs") → P41 (detect: present Example 1 and check whether a two-parallel-pair shape is (incorrectly) classified as a trapezoid) → P64 (conceptual shift: re-count the parallel side pairs explicitly, confirming the "exactly one" requirement).
- **B02 (targets MC-2)**: P27 ("Slanted Side Length Used as Height Instead of True Perpendicular Distance") → P41 (detect: present Example 2 and check whether the slanted side's length is (incorrectly) substituted for $h$) → P64 (conceptual shift: re-identify the perpendicular height explicitly, distinguishing it visually from the slanted side).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.quadrilateral`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.parallelogram` (the mutually exclusive two-parallel-pair category).
- **Parent**: `math.geom.quadrilateral`.

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that this is a fairly direct formula-application concept once the definitional distinction from parallelograms is clear.
- MC-2 was ranked Foundational because using the wrong height value produces a numerically wrong area, while MC-1 was ranked Moderate as primarily a classification/vocabulary issue that doesn't corrupt the area formula's application once the shape is correctly identified as a trapezoid.
- The landscaping transfer probe was deliberately chosen because distinguishing a slanted measured edge from the true perpendicular height is a genuinely common real-world surveying pitfall.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.quadrilateral`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: labeled trapezoid diagram before formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
