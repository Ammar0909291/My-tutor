# Teaching Blueprint: Triangle Centers (`math.geom.triangle-centers`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.triangle-centers` |
| name | Triangle Centers |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.geom.triangle`, `math.geom.congruent-triangles` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — construct each center visually before naming |
| description (KG) | Special points associated with a triangle: centroid (intersection of medians), circumcenter (circumscribed circle center), incenter (inscribed circle center), orthocenter (altitude intersection).

 |

## Component 1 — Learning Objectives

- LO1: Identify the FOUR classic triangle centers by their DEFINING construction — CENTROID (intersection of the three MEDIANS, lines from each vertex to the midpoint of the opposite side), CIRCUMCENTER (intersection of the three PERPENDICULAR BISECTORS of the sides), INCENTER (intersection of the three ANGLE BISECTORS), and ORTHOCENTER (intersection of the three ALTITUDES).
- LO2: Recognize that these four centers are GENERALLY DIFFERENT POINTS for a scalene triangle — each is defined by a DIFFERENT construction (medians vs. perpendicular bisectors vs. angle bisectors vs. altitudes), and there's no reason to expect them to coincide, EXCEPT in special cases.
- LO3: Recognize the SPECIAL CASE: for an EQUILATERAL triangle, ALL FOUR centers coincide at the SAME single point — a genuine consequence of the triangle's full symmetry, not something that happens for triangles in general.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.triangle` (the basic object) and `math.geom.congruent-triangles` (used in proving these centers' defining properties, e.g. that the incenter is equidistant from all three sides).

## Component 3 — Core Explanation

Four classic **triangle centers**, each defined by a DIFFERENT construction: the **centroid** is where the three MEDIANS (vertex-to-opposite-midpoint segments) intersect — it's the triangle's "center of mass." The **circumcenter** is where the three PERPENDICULAR BISECTORS of the sides intersect — it's EQUIDISTANT from all three vertices, making it the center of the CIRCUMSCRIBED circle (passing through all three vertices). The **incenter** is where the three ANGLE BISECTORS intersect — it's EQUIDISTANT from all three sides, making it the center of the INSCRIBED circle (tangent to all three sides). The **orthocenter** is where the three ALTITUDES (perpendiculars from each vertex to the opposite side) intersect.

Because each center comes from a GENUINELY DIFFERENT construction, they are, in GENERAL (for a typical scalene triangle), four DISTINCT points — there's no structural reason for a median intersection to coincide with a perpendicular-bisector intersection, for instance.

The one major EXCEPTION: for an **equilateral triangle**, the triangle's full three-fold symmetry forces ALL FOUR centers to coincide at the SAME single point — the medians, perpendicular bisectors, angle bisectors, and altitudes from each vertex are all literally the SAME line, so all four intersection points collapse to one.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — four distinct centers in a scalene triangle, breaking MC-1)**: For a scalene triangle, describe the FOUR different constructions producing the centroid, circumcenter, incenter, and orthocenter, noting they land at four DIFFERENT points. A common error confuses the constructions (e.g. describing the centroid as coming from angle bisectors, or the incenter as coming from medians) — each center's NAME is tied to a SPECIFIC construction, and mixing them up produces an entirely wrong point.

**Example 2 (LO3 — equilateral special case, breaking MC-2)**: For an EQUILATERAL triangle, explain why the centroid, circumcenter, incenter, and orthocenter all coincide at one point. Because of the triangle's full symmetry, EACH median is ALSO a perpendicular bisector of its opposite side, ALSO an angle bisector of its originating vertex, AND ALSO an altitude — all four types of special line from each vertex are literally the SAME line, so all four "centers" are really just one point. A common error assumes this coincidence happens for ANY isosceles triangle (not just equilateral) — for a GENERIC isosceles triangle (only two sides equal, not all three), the special line from the APEX vertex does coincide across all four types, but the special lines from the two BASE vertices generally do NOT, so the four centers remain distinct in that case; full coincidence specifically requires EQUILATERAL (all three sides/angles equal) symmetry.

## Component 5 — Teaching Actions

### Teaching Action A01 — Matching Each Center to Its Specific Defining Construction (Primitive P64: Conceptual Shift)

Work Example 1, explicitly reviewing all four constructions side by side with clear naming.

- **MC-1 hook**: check whether each center is correctly matched to its own specific construction.

### Teaching Action A02 — Equilateral Symmetry Forces All Four Centers to Coincide (Primitive P06: Contrast Pair)

Work Example 2, contrasting the full equilateral coincidence against the partial (not full) coincidence in a merely isosceles triangle.

- **MC-2 hook**: this directly targets MC-2 (assuming any isosceles triangle, not specifically equilateral, produces full coincidence of all four centers).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Match each triangle center (centroid, circumcenter, incenter, orthocenter) to its defining construction.
  2. Explain why the circumcenter is equidistant from all three vertices, connecting to its perpendicular-bisector construction.
  3. Explain why the incenter is equidistant from all three sides, connecting to its angle-bisector construction.
  4. Explain why an equilateral triangle's four centers all coincide, but a general isosceles triangle's do not.
- **P76 (Transfer Probe, mode = independence)**: "A city planner wants to place a single water tower to serve three towns forming a scalene triangle on the map, such that the tower is EQUALLY DISTANT from all three towns (minimizing the maximum pipe length to any town). (a) Identify which of the four triangle centers is the correct location for this water tower, and explain why. (b) Explain why a DIFFERENT triangle center (e.g. the centroid) would NOT satisfy this specific equal-distance requirement."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TRIANGLE-CENTER-MATCHED-TO-THE-WRONG-DEFINING-CONSTRUCTION | Confusing which construction (medians, perpendicular bisectors, angle bisectors, altitudes) defines which named center | Foundational |
| MC-2 | FULL-CENTER-COINCIDENCE-ASSUMED-FOR-ANY-ISOSCELES-TRIANGLE-NOT-JUST-EQUILATERAL | Assuming all four triangle centers coincide for any isosceles triangle, rather than recognizing this specifically requires full equilateral symmetry | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Triangle Center Matched to the Wrong Defining Construction") → P41 (detect: present Example 1 and check whether each center is matched to the correct construction) → P64 (conceptual shift: re-review all four constructions explicitly side by side, using the equidistance properties (circumcenter from vertices, incenter from sides) as memory anchors).
- **B02 (targets MC-2)**: P27 ("Full Center Coincidence Assumed for Any Isosceles Triangle Not Just Equilateral") → P41 (detect: present Example 2 and check whether isosceles-but-not-equilateral is (incorrectly) assumed to produce full coincidence) → P64 (conceptual shift: re-examine which special lines DO coincide (from the apex) versus which don't (from the base vertices) in a genuine isosceles-only case).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.triangle`, `math.geom.congruent-triangles`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.geom.triangle`.

## Component 8 — Teaching Notes

- estimated_hours = 6 (relatively high for this batch) reflects the genuine breadth of tracking four distinct constructions and their properties.
- MC-1 was ranked Foundational because confusing the constructions produces an entirely wrong point, while MC-2 was ranked Moderate as a scope-overgeneralization that doesn't corrupt any specific correct construction once properly understood.
- The water-tower transfer probe was deliberately chosen because the circumcenter's equidistance-from-vertices property has an immediately practical infrastructure-planning interpretation, distinguishing it concretely from the other centers.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.triangle`, `math.geom.congruent-triangles`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: construct each center visually before naming) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
