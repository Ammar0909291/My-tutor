# Teaching Blueprint: Polygon (`math.geom.polygon`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.polygon` |
| name | Polygon |
| domain | Geometry |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.geom.line-segment`, `math.geom.triangle` |
| unlocks | `math.geom.area` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — physical shapes sorted by side count before formal classification |
| description (KG) | A closed plane figure bounded by straight line segments; characterized by the number of sides and classified as regular (all sides and angles equal) or irregular. |

## Component 1 — Learning Objectives

- LO1: Define a **polygon** as a closed plane figure bounded entirely by straight line segments, name polygons by their number of sides (triangle=3, quadrilateral=4, pentagon=5, hexagon=6, etc.), and identify non-examples (figures with a curved side, or not fully closed).
- LO2: Distinguish a **regular** polygon (all sides AND all angles equal) from an **irregular** polygon (failing at least one of these two conditions), and correctly classify given polygons, recognizing that equal sides alone (without equal angles, or vice versa) is not sufficient for regularity.
- LO3: State and apply the **interior angle sum formula** for a polygon with $n$ sides, $(n-2)\times180°$, derived by decomposing the polygon into triangles from one vertex, and use it to find a missing angle or to determine the number of sides given the angle sum.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.line-segment` (a segment as the finite, bounded part of a line between two endpoints — the building block of every polygon side) and `math.geom.triangle` (the simplest polygon, its 180° angle sum, and the trigonometric/geometric groundwork this concept generalizes).

## Component 3 — Core Explanation

A **polygon** is a closed plane figure bounded entirely by straight line segments (called **sides**), meeting only at their endpoints (called **vertices**). Polygons are named by their number of sides: 3=triangle, 4=quadrilateral, 5=pentagon, 6=hexagon, 7=heptagon, 8=octagon, and so on.

**Regular vs. irregular**: a polygon is **regular** if **all** its sides are equal in length **AND all** its angles are equal in measure — BOTH conditions simultaneously. A polygon failing either condition (unequal sides, OR unequal angles, OR both) is **irregular**. Notably, equal sides alone do NOT guarantee equal angles (and vice versa) — a rhombus (4 equal sides) generally has two different angle measures, so it is irregular despite having all sides equal.

**Interior angle sum**: for a polygon with $n$ sides, the sum of all interior angles is $(n-2)\times180°$. This follows by picking one vertex and drawing diagonals to every other non-adjacent vertex, decomposing the polygon into exactly $(n-2)$ non-overlapping triangles, each contributing $180°$ (from `math.geom.triangle`) to the total. For a **regular** polygon specifically, each individual interior angle equals $\frac{(n-2)\times180°}{n}$ (dividing the total equally among the $n$ equal angles).

## Component 4 — Worked Examples

**Example 1 (LO1 — naming and identifying)**: A closed figure with 6 straight sides is a **hexagon**. A figure with 5 sides but one side is curved is **not** a polygon (violates "straight line segments"). A figure with 4 straight sides but one gap not connected is **not** a polygon (violates "closed").

**Example 2 (LO2 — regular vs. irregular, breaking MC-1)**: A rhombus has all 4 sides equal in length, but its two pairs of angles are (in general) unequal (e.g. two $70°$ angles and two $110°$ angles). Despite the equal sides, this rhombus is **irregular** — regularity requires equal sides AND equal angles together; equal sides alone is insufficient. A square, by contrast, has all 4 sides equal AND all 4 angles equal ($90°$ each) — genuinely regular.

**Example 3 (LO3 — interior angle sum, applying the formula)**: Find the interior angle sum of a hexagon ($n=6$): $(6-2)\times180° = 4\times180°=720°$. If it's a REGULAR hexagon, each individual angle is $\frac{720°}{6}=120°$. Separately: a polygon has an interior angle sum of $1080°$ — find $n$: solve $(n-2)\times180°=1080° \Rightarrow n-2=6 \Rightarrow n=8$ (an octagon).

## Component 5 — Teaching Actions

### Teaching Action A01 — Naming Polygons and the Closed/Straight-Sides Definition (Primitive P11: Representation Shift)

Start concrete: lay out physical shapes (paper cutouts or drawn figures) — some closed straight-sided figures (triangle, square, pentagon), some with a curved edge, some with a gap. Sort them into "polygon" and "not a polygon" piles, stating the rule each time: "straight sides only, and fully closed — no gaps, no curves." State the naming convention (3=triangle up through octagon), reinforcing that the polygon FAMILY is defined purely by side count, independent of shape variation within that count.

Shift to the formal definition, working Example 1's identify/non-example set explicitly.

- **MC-1 hook**: present a rhombus (4 equal sides, unequal angles) and ask "is this a regular polygon, since all its sides are equal?" — a "yes" answer reveals MC-1 (believing equal sides alone is sufficient for regularity, without also checking equal angles).

### Teaching Action A02 — Regular vs. Irregular, and the Interior Angle Sum (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place the rhombus (equal sides, unequal angles — irregular) directly beside a square (equal sides AND equal angles — regular). State the rule explicitly: "regular requires BOTH conditions together — check sides, then separately check angles; passing only one check is not enough."

**Contrast 2**: Derive the interior angle sum formula by triangulating a pentagon from one vertex (drawing 2 diagonals, creating 3 triangles, $3\times180°=540°$), then generalize: "an $n$-sided polygon always decomposes into exactly $(n-2)$ triangles from one vertex — that's where the $(n-2)\times180°$ formula comes from, not an arbitrary memorized fact." Work Example 3's both-directions application (given $n$ find the sum; given the sum find $n$).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Name the polygon with 9 sides, and find its interior angle sum.
  2. A polygon has all four sides equal to 5cm but its angles measure $80°,100°,80°,100°$. Is this polygon regular? Justify using both conditions.
  3. A regular polygon has an interior angle sum of $1440°$. Find the number of sides, and find the measure of each individual interior angle.
  4. Explain, using the triangulation argument (not just citing the formula), why a heptagon's (7-sided polygon's) interior angles sum to $900°$.
- **P76 (Transfer Probe, mode = independence)**: "An architect is designing a gazebo with a floor plan shaped like a regular polygon, and wants the interior angle at each corner to measure exactly $135°$ for structural/aesthetic reasons. (a) Using the interior angle formula, determine how many sides this polygon must have. (b) A colleague proposes instead a floor plan where all sides are equal in length (for material-cutting efficiency) but doesn't require all angles to be equal — using this lesson's regular/irregular distinction, explain whether this design could still achieve a consistent $135°$ angle at every corner, or why it might not."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EQUAL-SIDES-ASSUMED-SUFFICIENT-FOR-REGULARITY | Believing equal side lengths alone (without also checking equal angles) is sufficient to classify a polygon as regular | Foundational |
| MC-2 | INTERIOR-ANGLE-SUM-FORMULA-CITED-WITHOUT-DERIVATION | Using $(n-2)\times180°$ as a memorized formula without understanding the triangulation argument it comes from, leading to errors when the formula must be applied in reverse (solving for $n$) | Moderate |
| MC-3 | POLYGON-DEFINITION-CURVED-SIDE-OVERLOOKED | Classifying a figure with one or more curved sides as a polygon, overlooking the "straight line segments only" requirement | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Equal-Sides-Sufficient Assumption") → P41 (detect: present the rhombus and ask if it's regular) → P64 (conceptual shift: re-anchor on "regular = equal sides AND equal angles, checked as two separate conditions — a rhombus passes only one of the two").
- **B02 (targets MC-2)**: P27 (name it: "Formula Cited Without Derivation") → P41 (detect: give an angle-sum value and ask the student to solve for $n$, checking if they can set up the equation correctly rather than just recalling values for common polygons) → P64 (conceptual shift: re-derive via the triangulation argument, showing WHY $(n-2)$ triangles arise, making the algebraic reverse-solving more transparent).
- **B03 (targets MC-3)**: P27 (name it: "Curved-Side Overlooked") → P41 (detect: present a figure with one curved edge among otherwise straight sides and ask if it's a polygon) → P64 (conceptual shift: re-anchor on the definition's explicit "straight line segments" requirement — even one curved edge disqualifies the entire figure).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.line-segment` (the sides of any polygon are line segments by definition), `math.geom.triangle` (the simplest polygon, and the 180°-angle-sum fact the general formula's triangulation argument directly builds on).
- **Unlocks**: `math.geom.area` (computing polygon area, especially for regular polygons, builds directly on this concept's side/angle classification).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a developing/understand tag places this at the "2 main TAs + gate" tier — A01 (naming and the closed/straight-sides definition) and A02 (regular/irregular contrast plus the interior angle sum derivation) jointly cover all three LOs.
- The interior angle sum formula (A02, Contrast 2) was deliberately taught via the triangulation DERIVATION rather than presented as a standalone formula to memorize, specifically to prevent MC-2 — reverse-direction problems (given the sum, find $n$) are a common stumbling point when the formula is memorized as a forward-only computational recipe rather than understood as "count the triangles."
- MC-1 (equal-sides-sufficient) was given Foundational severity and the corpus's now-familiar contrast-pair treatment (rhombus vs. square) because "regular" carries an everyday-language connotation of "uniform," which students often map onto "equal sides" alone without independently verifying the angle condition — this is analogous to the everyday-language interference pattern already identified in `math.real.open-sets`' MC-1 (open/closed dichotomy) earlier in this corpus.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physical shape-sorting before classification) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
