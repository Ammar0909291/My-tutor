# Teaching Blueprint: Polygon Angle Sum (`math.geom.polygon-angle-sum`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.polygon-angle-sum` |
| name | Polygon Angle Sum |
| domain | Geometry |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.geom.triangle-angle-sum`, `math.geom.polygon` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — triangulate a polygon from one vertex |
| description (KG) | The sum of interior angles of a convex n-gon is (n−2)×180°; each interior angle of a regular n-gon is (n−2)×180°/n.

 |

## Component 1 — Learning Objectives

- LO1: State and apply the polygon angle sum formula — the interior angles of a convex $n$-gon sum to $(n-2)\times180°$ — GENERALIZING `math.geom.triangle-angle-sum`'s $180°$ result (the $n=3$ special case: $(3-2)\times180°=180°$).
- LO2: Understand the DERIVATION — drawing diagonals from ONE vertex of an $n$-gon divides it into EXACTLY $(n-2)$ non-overlapping TRIANGLES, and since each triangle's angles sum to $180°$ (from `math.geom.triangle-angle-sum`), the whole polygon's angle sum is $(n-2)$ triangles times $180°$ each.
- LO3: For a REGULAR $n$-gon specifically, find EACH individual interior angle as $\frac{(n-2)\times180°}{n}$ (the TOTAL sum divided EVENLY among the $n$ equal angles) — recognizing this division step is needed ONLY for regular polygons, where all angles are equal; for an IRREGULAR polygon, only the TOTAL sum is determined, not each individual angle.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.triangle-angle-sum` (the $n=3$ base case this generalizes, and the key tool in the triangulation-based proof) and `math.geom.polygon` (the general shape).

## Component 3 — Core Explanation

The **Polygon Angle Sum** theorem states: the interior angles of a convex $n$-gon sum to $(n-2)\times180°$. This directly GENERALIZES `math.geom.triangle-angle-sum`: for $n=3$ (a triangle), $(3-2)\times180°=180°$, recovering the familiar triangle result exactly.

The DERIVATION uses TRIANGULATION: picking ONE vertex of the $n$-gon and drawing diagonals to every OTHER non-adjacent vertex divides the polygon into EXACTLY $(n-2)$ non-overlapping triangles (e.g. a quadrilateral, $n=4$, splits into $4-2=2$ triangles; a pentagon, $n=5$, splits into $5-2=3$ triangles). Since EACH of these triangles independently has angles summing to $180°$ (from `math.geom.triangle-angle-sum`), and their angles COMBINE to form exactly the polygon's original interior angles with nothing left over or double-counted, the polygon's TOTAL angle sum is $(n-2)\times180°$.

For a REGULAR $n$-gon (all angles equal), EACH individual interior angle is $\frac{(n-2)\times180°}{n}$ — the total sum divided EVENLY among the $n$ equal angles. This division step is valid ONLY for regular polygons; for an IRREGULAR polygon, the theorem gives only the TOTAL sum, saying nothing about any individual angle's specific value.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic application, breaking MC-1)**: Find the interior angle sum of a hexagon ($n=6$). $(6-2)\times180°=4\times180°=720°$. A common error uses $n$ directly instead of $(n-2)$ (computing $6\times180°=1080°$, forgetting the crucial "$-2$" adjustment) — the formula specifically requires TWO FEWER than $n$ triangles' worth of angle sum, not $n$ triangles' worth.

**Example 2 (LO2 — the triangulation derivation)**: For a pentagon ($n=5$), verify the derivation by describing the triangulation from one vertex. Drawing diagonals from one vertex to the two non-adjacent vertices creates EXACTLY $5-2=3$ triangles, whose combined angle sum is $3\times180°=540°$ — matching the formula's prediction directly.

**Example 3 (LO3 — regular polygon individual angle, breaking MC-2)**: Find EACH interior angle of a regular octagon ($n=8$). Total sum: $(8-2)\times180°=1080°$. Since REGULAR (all 8 angles equal), each individual angle $=\frac{1080°}{8}=135°$. A common error attempts this SAME division-by-$n$ step for an IRREGULAR polygon (where the angles are NOT all equal) — the division step to find "each angle" is valid ONLY when the polygon is regular; for an irregular polygon, only the TOTAL sum (not any individual angle) is determined by this theorem alone.

## Component 5 — Teaching Actions

### Teaching Action A01 — The (n-2) Adjustment Is Essential, Not n Alone (Primitive P64: Conceptual Shift)

Work Example 1, explicitly emphasizing the "$-2$" step and connecting it to the triangulation count.

- **MC-1 hook**: check whether $(n-2)$, not $n$ alone, is used in the formula.

### Teaching Action A02 — Triangulation from One Vertex Produces Exactly (n-2) Triangles (reused procedure)

Work Example 2, explicitly counting the triangles formed by the diagonal construction.

### Teaching Action A03 — Dividing by n for Each Angle Is Valid Only for Regular Polygons (Primitive P06: Contrast Pair)

Work Example 3, contrasting the valid regular-polygon division against the invalid attempt for an irregular polygon.

- **MC-2 hook**: this directly targets MC-2 (dividing the total sum by $n$ for an irregular polygon, where individual angles aren't all equal).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the interior angle sum of a decagon ($n=10$).
  2. Explain, in one sentence, why the formula uses $(n-2)$ rather than $n$.
  3. Find each interior angle of a regular pentagon ($n=5$).
  4. Explain why you cannot find each individual angle of an IRREGULAR hexagon using only this theorem, even though you CAN find the total sum.
- **P76 (Transfer Probe, mode = independence)**: "An architect is designing a gazebo with a regular heptagonal (7-sided) floor plan, and needs to know the exact interior angle at each corner to cut the wall panels precisely. (a) Find the total interior angle sum for this 7-sided shape. (b) Since the gazebo's floor plan is regular (all sides and angles equal), find the exact angle needed at each corner."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POLYGON-ANGLE-SUM-COMPUTED-USING-N-INSTEAD-OF-N-MINUS-2 | Computing the angle sum as n×180° instead of the correct (n-2)×180°, omitting the essential -2 adjustment | Foundational |
| MC-2 | ANGLE-SUM-DIVIDED-BY-N-FOR-AN-IRREGULAR-POLYGON-TO-FIND-INDIVIDUAL-ANGLES | Attempting to divide the total angle sum by n to find "each angle" for an irregular polygon, where individual angles are not all equal | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Polygon Angle Sum Computed Using N Instead of N Minus 2") → P41 (detect: present Example 1 and check whether $(n-2)$ or plain $n$ is used) → P64 (conceptual shift: re-derive via triangulation, explicitly counting the $(n-2)$ triangles).
- **B02 (targets MC-2)**: P27 ("Angle Sum Divided by N for an Irregular Polygon to Find Individual Angles") → P41 (detect: present Example 3's irregular-polygon extension and check whether division by $n$ is (incorrectly) attempted) → P64 (conceptual shift: re-confirm whether the polygon is regular before attempting the division step).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.triangle-angle-sum`, `math.geom.polygon`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.regular-polygon`.
- **Parent**: `math.geom.polygon`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.85 reflects the genuine importance of this formula as the standard generalization used throughout later polygon work.
- Both misconceptions were ranked Foundational because each produces a numerically wrong result or applies a step (individual-angle division) where it isn't valid.
- The gazebo transfer probe was deliberately chosen because precise interior-angle computation for regular polygon construction is a genuinely practical architectural application.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.triangle-angle-sum`, `math.geom.polygon`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: triangulate a polygon from one vertex) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
