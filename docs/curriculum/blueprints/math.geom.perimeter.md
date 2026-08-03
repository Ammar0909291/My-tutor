# Teaching Blueprint: Perimeter (`math.geom.perimeter`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.perimeter` |
| name | Perimeter |
| domain | Geometry |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.geom.line-segment` |
| unlocks | `math.geom.circle-circumference` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — physically trace the boundary before formalizing |
| description (KG) | The total length of the boundary of a two-dimensional figure; for circles it is called the circumference.

 |

## Component 1 — Learning Objectives

- LO1: Compute the PERIMETER of a polygon as the SUM of all its side lengths — every side counted exactly ONCE, going all the way around the boundary.
- LO2: Recognize that for a CIRCLE specifically, the perimeter is called the CIRCUMFERENCE (a special name for the same underlying "total boundary length" concept) — not a different kind of measurement.
- LO3: Distinguish PERIMETER (a boundary LENGTH, measured in linear units like cm or m) from AREA (a measurement of the ENCLOSED region, measured in SQUARED units like cm² or m²) — these are fundamentally different quantities that should never be confused or added together.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.line-segment` (the basic length concept being summed).

## Component 3 — Core Explanation

The **perimeter** of a two-dimensional figure is the TOTAL LENGTH of its boundary — for a polygon, this means SUMMING every side's length exactly once, tracing all the way around back to the starting point.

For a CIRCLE specifically, this same "total boundary length" concept is given a special name: **circumference** — it's not a fundamentally different type of measurement, just the standard terminology used for circles rather than the general term "perimeter."

Perimeter must be carefully distinguished from AREA: perimeter measures the boundary's LENGTH (in linear units like cm, m, or ft), while area measures the ENCLOSED region's SIZE (in SQUARED units like cm², m², or ft²) — these represent fundamentally different geometric quantities, and it is never meaningful to add a perimeter value directly to an area value, or to confuse which one a given problem is asking for.

## Component 4 — Worked Examples

**Example 1 (LO1 — summing all sides, breaking MC-1)**: Find the perimeter of a rectangle with length 8 and width 5. Perimeter $=8+5+8+5=26$ (all FOUR sides, going all the way around). A common error only sums TWO sides (e.g. computing $8+5=13$, forgetting that a rectangle has TWO pairs of equal sides, not just one of each) — the perimeter requires summing EVERY side of the boundary, going all the way around, not just one representative length from each unique side-length.

**Example 2 (LO2 — circumference as circle's perimeter)**: State that a circle's "circumference" is simply its perimeter, using the circle-specific name. Explain that this is the same "total boundary length" concept as a polygon's perimeter, just with a different traditional name for this particular shape.

**Example 3 (LO3 — distinguishing perimeter from area, breaking MC-2)**: For a square with side length 4, find BOTH the perimeter and the area, and explain why these are different kinds of quantities. Perimeter $=4\times4=16$ (units: length, e.g. cm). Area $=4^2=16$ (units: SQUARED length, e.g. cm²) — NUMERICALLY equal here (a coincidence specific to this particular square's side length), but representing entirely DIFFERENT physical quantities (boundary length vs. enclosed region size). A common error, noticing these two numbers happen to match for this specific square, concludes "perimeter and area are the same thing" or tries to ADD them together in a later problem — the numerical coincidence for THIS square does not mean perimeter and area are interchangeable or additive; they measure fundamentally different aspects of the shape.

## Component 5 — Teaching Actions

### Teaching Action A01 — Sum Every Side of the Boundary, Not Just One of Each Unique Length (Primitive P64: Conceptual Shift)

Work Example 1, explicitly tracing around the full boundary and summing each individual side.

- **MC-1 hook**: check whether every side (not just a representative subset) is included in the sum.

### Teaching Action A02 — Circumference Is Just a Circle's Perimeter (reused procedure)

Present Example 2, connecting the specialized vocabulary term to the general perimeter concept.

### Teaching Action A03 — Perimeter (Length) and Area (Squared-Length) Are Never Interchangeable (Primitive P06: Contrast Pair)

Work Example 3, explicitly contrasting the two different units and physical meanings, even when the numbers happen to coincide.

- **MC-2 hook**: this directly targets MC-2 (confusing or conflating perimeter and area because their numeric values happened to match in a specific example).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the perimeter of a rectangle with length 12 and width 7.
  2. Find the perimeter of a triangle with sides 5, 7, and 9.
  3. Explain, in one sentence, why a circle's perimeter is called its circumference.
  4. For a rectangle with length 6 and width 3, find both the perimeter and the area, and explain why these two values (though both numbers) represent different kinds of quantities.
- **P76 (Transfer Probe, mode = independence)**: "A homeowner needs to buy fencing (sold by the linear foot) to enclose a rectangular backyard measuring 30 ft by 20 ft, and SEPARATELY needs to buy sod (sold by the square foot) to cover the entire yard. (a) Calculate how many linear feet of fencing are needed. (b) Calculate how many square feet of sod are needed. (c) Explain why these two calculations use fundamentally different formulas and units, even though both describe the same backyard."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NOT-ALL-SIDES-SUMMED-WHEN-COMPUTING-PERIMETER | Summing only some sides (e.g. one of each unique length) rather than every individual side of the boundary | Foundational |
| MC-2 | PERIMETER-AND-AREA-CONFLATED-OR-ADDED-TOGETHER | Confusing perimeter (a length) with area (a squared-length quantity), especially when their numeric values happen to coincide in a specific example | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Not All Sides Summed When Computing Perimeter") → P41 (detect: present Example 1 and check whether only some sides are summed) → P64 (conceptual shift: re-trace the full boundary explicitly, marking off each side as it's added).
- **B02 (targets MC-2)**: P27 ("Perimeter and Area Conflated or Added Together") → P41 (detect: present Example 3 and check whether the two quantities are (incorrectly) treated as interchangeable) → P64 (conceptual shift: re-examine the units explicitly (linear vs. squared), confirming they measure fundamentally different things regardless of numeric coincidence).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.line-segment`.
- **Unlocks**: `math.geom.circle-circumference`.
- **Related**: `math.geom.area` (the fundamentally different but often-confused companion measurement).

## Component 8 — Teaching Notes

- mastery_threshold = 0.90 reflects that this is basic, foundational vocabulary and computation expected to become near-automatic.
- MC-1 was ranked Foundational because it produces a genuinely wrong numeric answer, while MC-2 was ranked equally Foundational since perimeter/area confusion is one of the most persistent and consequential misconceptions in introductory geometry.
- The fencing-vs-sod transfer probe was deliberately chosen because these are genuinely distinct real-world purchases with different units (linear feet vs. square feet), giving the perimeter/area distinction immediate practical stakes.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.line-segment`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.geom.circle-circumference`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physically trace the boundary) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
