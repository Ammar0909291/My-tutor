# Teaching Blueprint: Area (`math.geom.area`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.area` |
| name | Area |
| domain | Geometry |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.geom.area-polygon` |
| unlocks | `math.geom.surface-area`, `math.calc.integral-area` |
| cross_links | `math.calc.integral-area` |
| CPA_entry_stage | C (Concrete) — decomposition and scaling are demonstrated with countable unit squares before the general definition is stated abstractly |
| description (KG) | The measure of the two-dimensional extent of a figure; for curved regions computed via integration. |

## Component 1 — Learning Objectives

- LO1: State the general definition of area as a measure of two-dimensional extent — invariant under rigid motion (translation/rotation), additive under decomposition into non-overlapping pieces (the total area of a figure equals the sum of the areas of any partition of it, regardless of HOW it is partitioned) — and distinguish this MEASURE concept from perimeter, a fundamentally different attribute of the same figure.
- LO2: Derive how area scales under uniform linear scaling — scaling every linear dimension of a figure by factor $k$ scales its area by $k^2$, NOT by $k$ — using a concrete decomposition argument, not just formula-memorization.
- LO3: Justify the circle area formula $A=\pi r^2$ as a LIMIT of the already-mastered regular-polygon area technique (`math.geom.area-polygon`) — inscribing regular $n$-gons of increasing $n$ inside a fixed circle and observing their areas converge toward the circle's area — recognizing this limiting process as exactly what `math.calc.integral-area` will make fully rigorous.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.area-polygon` (decomposing a polygon into triangles to compute its area; the regular-polygon shortcut $A=\tfrac12 a p$ where $a$ is the apothem and $p$ the perimeter, verified against direct triangle decomposition for a regular hexagon).

## Component 3 — Core Explanation

**Area is a measure, not a shape-specific formula**: area assigns a single non-negative number (in square units) to a two-dimensional region, satisfying two defining properties: (1) INVARIANCE — congruent figures (same shape and size, regardless of position or orientation) have equal area; (2) ADDITIVITY — if a figure is partitioned into non-overlapping pieces, the total area equals the sum of the pieces' areas, and this sum is the SAME no matter how the figure is cut. Every area formula (rectangle $bh$, triangle $\tfrac12bh$, regular polygon $\tfrac12ap$) is a specific consequence of these two properties applied to a specific shape — not an unrelated fact to memorize per shape.

**Scaling: linear factor $k$ scales area by $k^2$, not $k$**: this is a direct consequence of additivity. A $k\times k$ enlargement of a unit square decomposes into exactly $k^2$ unit squares (for integer $k$), not $k$ of them — doubling every side length of ANY figure (not just squares) always quadruples its area, because the figure can always be decomposed into small pieces each individually scaled by $k$ in both dimensions.

**The circle as a limit of regular polygons**: `math.geom.area-polygon` already established that a regular $n$-gon's area can be computed exactly via decomposition or the $\tfrac12ap$ shortcut. Inscribing regular $n$-gons of increasing $n$ inside a FIXED circle of radius $R$, the polygon's apothem approaches $R$, its perimeter approaches the circle's circumference $2\pi R$, and its area approaches $\pi R^2$ — the circle's own area is not an isolated new formula, but the LIMIT this same polygon-decomposition technique converges to. Making this limit fully rigorous (rather than just numerically convincing) is exactly the job of `math.calc.integral-area`.

## Component 4 — Worked Examples

**Example 1 (LO1 — additivity under two different decompositions, breaking MC-1)**: An L-shaped figure (a $6\times5$ rectangle with a $2\times3$ rectangular notch removed from one corner) is decomposed TWO different ways. Decomposition A: whole $6\times5=30$ minus notch $2\times3=6$, giving $30-6=24$. Decomposition B: split the L directly into two rectangles — a $6\times2$ strip ($=12$) plus a $4\times3$ strip ($=12$) — giving $12+12=24$. Both decompositions give the SAME total, $24$, confirming area is a well-defined measure independent of how the figure is cut, not a property of the particular decomposition chosen.

**Example 2 (LO2 — scaling by $k^2$, breaking MC-2)**: A $3\times4$ rectangle has area $12$. Scaling every side by $k=2$ gives a $6\times8$ rectangle. Direct count: area $=6\times8=48$. Compare to the misconception's prediction (doubling sides doubles area): $2\times12=24\ne48$. The correct relationship is $k^2\times12=4\times12=48$ ✓ — confirmed by decomposing the $6\times8$ rectangle into four $3\times4$ copies of the original (a $2\times2$ grid of copies), directly showing WHY the scale factor is squared: scaling affects BOTH dimensions simultaneously.

**Example 3 (LO3 — regular polygons converging to the circle, breaking MC-3)**: For a unit circle ($R=1$, true area $=\pi\approx3.14159$), the area of a regular $n$-gon inscribed in it is $\tfrac{n}{2}\sin\!\left(\tfrac{2\pi}{n}\right)$. At $n=6$: $3\sin(60^\circ)=3\cdot\tfrac{\sqrt3}2\approx2.598$. At $n=12$: $6\sin(30^\circ)=6(0.5)=3.000$. At $n=24$: $12\sin(15^\circ)\approx12(0.2588)\approx3.106$. At $n=100$: $50\sin(3.6^\circ)\approx50(0.06279)\approx3.140$. The sequence $2.598,\ 3.000,\ 3.106,\ 3.140,\dots$ climbs steadily toward $\pi\approx3.14159$ as $n$ grows — the SAME regular-polygon area technique from `math.geom.area-polygon`, applied with more and more sides, converges to the circle's area; no new formula was invented, only a limit was taken.

## Component 5 — Teaching Actions

### Teaching Action A01 — Area vs. Perimeter, and Decomposition-Independence (Primitive P06: Contrast Pair)

Contrast Example 1's two decompositions (both giving $24$) against a DIFFERENT figure with the same perimeter as the L-shape but a different area (e.g., a $1\times11$ strip has perimeter $24$, same as many rectangles, but area only $11$, far less than $24$). State: "area and perimeter are two independent measurements of the same figure — knowing one tells you nothing certain about the other, and area itself never depends on which valid decomposition you choose to compute it."

- **MC-1 hook**: ask "if a figure has a large perimeter, must it also have a large area?" — a "yes" answer reveals MC-1 (conflating area and perimeter as if one determines the other).

### Teaching Action A02 — Scaling Squares, Not Doubles (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: doubling every side of the $3\times4$ rectangle gives area $48$, not $24$. State: "linear scaling by $k$ always scales area by $k^2$ — this is why a photograph enlarged to twice its width and height needs four times the paper, not twice."

- **MC-2 hook**: ask "if I double the side lengths of a shape, does its area also just double?" — a "yes" answer reveals MC-2 (assuming area scales linearly with linear dimensions).

### Teaching Action A03 — The Circle Area Formula Is Not an Isolated Fact (Primitive P11: Representation Shift)

State: "$A=\pi r^2$ looks like a completely separate formula to memorize — but it's actually the LIMIT of the exact polygon technique you already know, applied with more and more sides." Work Example 3's four-term numerical sequence ($2.598\to3.000\to3.106\to3.140$), explicitly connecting each polygon computation to the earlier `math.geom.area-polygon` regular-polygon shortcut.

- **MC-3 hook**: ask "is the circle's area formula, $A=\pi r^2$, a completely unrelated fact from everything you learned about polygon areas?" — a "yes" answer reveals MC-3 (treating the circle formula as an isolated fact rather than a limiting case of polygon decomposition).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A figure is decomposed two different ways by two different students, giving totals of $40$ and $37$. Explain what this discrepancy means (and what it does NOT mean about area itself).
  2. A square of side $5$ is scaled by $k=3$. Give the new side length and the new area, and verify the area ratio is $k^2$, not $k$.
  3. Compute the area of a regular $20$-gon inscribed in a unit circle using $\tfrac{n}{2}\sin(2\pi/n)$, and state how close it is to $\pi$.
  4. A rectangle and a triangle have equal perimeters. Explain why this alone does not tell you which (if either) has the greater area.
- **P76 (Transfer Probe, mode = independence)**: "A city planner is comparing two irregularly-shaped parks. Park A has been surveyed by decomposing it into 5 triangular plots; Park B has been surveyed by decomposing it into a different set of 8 triangular and rectangular plots. (a) Explain why comparing the SUM of each park's plot areas is a valid way to compare their total areas, even though the two parks were decomposed using entirely different methods. (b) A colleague proposes: 'Park A must be smaller than Park B, since Park A has a shorter total boundary (perimeter) around it.' Using this lesson's area/perimeter distinction, explain why this reasoning is invalid. (c) The planner also wants to estimate the area of a large circular pond in Park B. Explain, using this lesson's polygon-to-circle limiting idea, how an increasingly fine polygon approximation could estimate the pond's area without a direct circle-area measurement tool."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | AREA-PERIMETER-CONFLATED | Believing larger perimeter implies larger area (or vice versa), missing that area and perimeter are independent measurements of the same figure | Foundational |
| MC-2 | LINEAR-SCALING-OF-AREA | Believing that scaling a figure's linear dimensions by $k$ scales its area by $k$ as well, missing that area scales by $k^2$ | Foundational |
| MC-3 | CIRCLE-AREA-AS-ISOLATED-FORMULA | Believing $A=\pi r^2$ is an arbitrary, unrelated formula to memorize, missing that it is the limit of the regular-polygon decomposition technique as the number of sides grows | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Area-Perimeter Conflation") → P41 (detect: ask a student whether a figure with a longer boundary must have more area, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's two decompositions alongside the $1\times11$ strip counter-example, re-anchoring on "area and perimeter are independent measurements").
- **B02 (targets MC-2)**: P27 (name it: "Linear Scaling of Area") → P41 (detect: ask a student to predict the new area after doubling every side length, and check whether they answer "doubled" instead of "quadrupled") → P64 (conceptual shift: re-walk Example 2's $2\times2$-grid decomposition of the scaled rectangle, re-anchoring on "scaling affects both dimensions, so area scales by $k^2$").
- **B03 (targets MC-3)**: P27 (name it: "Circle Area as Isolated Formula") → P41 (detect: ask a student whether $A=\pi r^2$ is connected to anything else they've learned about area, and check for "no" or "it's just a formula to memorize") → P64 (conceptual shift: re-walk Example 3's convergent polygon sequence, re-anchoring on "the circle's area is the LIMIT of the exact polygon technique you already know").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.area-polygon` (the triangle-decomposition technique and the regular-polygon $\tfrac12ap$ shortcut this concept's circle-limiting argument directly reuses).
- **Unlocks**: `math.geom.surface-area` (extends the additivity/decomposition idea to the surfaces of 3D solids), `math.calc.integral-area` (makes the polygon-to-circle limiting process from LO3 fully rigorous via integration).
- **Cross-link**: KG lists `math.calc.integral-area` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe once that entry exists, connecting LO3's numerical convergence to the actual limit-of-Riemann-sums definition of area under a curve.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a developing/apply tag places this at a "3 TAs + gate" tier; the concept is a conceptual unification (measure/invariance/additivity/scaling) built directly on the already-mastered polygon-computation machinery, rather than introducing new computational technique, keeping it appropriately compact.
- **Division of labor**: `math.geom.area-polygon` owns concrete polygon-area COMPUTATION (triangle decomposition, the regular-polygon shortcut); `math.geom.circle` owns the circle-specific formula's practical USE (computing exact/decimal circumference and area from a given radius or diameter). This concept, `math.geom.area`, deliberately does not re-derive polygon computation techniques nor re-teach circle-formula arithmetic — it owns the GENERAL unifying concept (measure, invariance, additivity, scaling) and the MOTIVATION for why the circle formula is correct, via the polygon-limit argument in LO3/Example 3, rather than asserting $A=\pi r^2$ as a given fact the way `math.geom.circle` does.
- Example 3's four-term convergence sequence was deliberately computed with the SAME parametrization style ($R=1$, increasing $n$) so a learner can directly see the numbers climbing toward $\pi$, rather than asserting convergence without a concrete numerical trace.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.calc.integral-area unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: decomposition/scaling demonstrated with countable unit squares before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
