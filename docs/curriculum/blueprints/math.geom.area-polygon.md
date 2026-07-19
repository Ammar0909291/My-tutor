# Teaching Blueprint: Area of Polygons (`math.geom.area-polygon`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.area-polygon` |
| name | Area of Polygons |
| domain | Geometry |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.geom.area-triangle` |
| unlocks | `math.geom.area` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — decomposing a specific irregular polygon into triangles before the standard shortcut formulas | 
| description (KG) | Computing areas of polygons by decomposition into triangles or by standard formulas (parallelogram: bh; trapezoid: ½(b₁+b₂)h; regular polygon: ½ap). |

## Component 1 — Learning Objectives

- LO1: Compute a polygon's area by **decomposition into triangles** (drawing diagonals from one vertex to split the polygon into non-overlapping triangles, summing their areas via `math.geom.area-triangle`'s own formulas) — a GENERAL method working for ANY simple polygon, regular or irregular.
- LO2: Apply the parallelogram area formula ($bh$) and the trapezoid area formula ($\frac12(b_1+b_2)h$) as shortcuts, recognizing BOTH are DERIVABLE via triangle decomposition — specifically, a parallelogram decomposes into TWO congruent triangles (summing to $bh$, not $\frac12bh$, which is only one triangle's area).
- LO3: Apply the regular polygon formula $\text{Area}=\frac12ap$ (apothem times perimeter, halved), recognizing it comes from decomposing a regular $n$-gon into $n$ congruent isosceles triangles (each with height = apothem, base = one side) — directly the SAME triangle-decomposition principle from LO1, not an unrelated new formula.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.area-triangle` (Area $=\frac12\times\text{base}\times\text{height}$, using the perpendicular altitude; Heron's formula from side lengths alone).

## Component 3 — Core Explanation

**Triangle decomposition — a completely general method**: ANY simple (non-self-intersecting) polygon can be decomposed into triangles by drawing diagonals from a single vertex — the resulting triangles are non-overlapping and their areas sum to exactly the polygon's total area. This works for irregular, asymmetric shapes just as well as regular, symmetric ones — decomposition into triangles is not a special-case trick, but a fully general technique.

**Parallelogram and trapezoid formulas are shortcuts, derivable from decomposition**: a parallelogram, split by one diagonal, becomes exactly TWO congruent triangles, each with the same base $b$ and height $h$ — so the parallelogram's total area is $2\times\frac12bh=bh$ (NOT $\frac12bh$, which would be only ONE of the two triangles). A trapezoid, similarly split by one diagonal, becomes two triangles sharing the same height $h$ but with the two different parallel sides $b_1,b_2$ as their respective bases — summing $\frac12b_1h+\frac12b_2h=\frac12(b_1+b_2)h$ gives the trapezoid formula directly.

**The regular polygon formula comes from the same principle**: a regular $n$-gon, connected from its center to every vertex, decomposes into $n$ CONGRUENT isosceles triangles, each with base equal to one side of the polygon and height equal to the polygon's apothem $a$ (the perpendicular distance from the center to a side). Summing all $n$ triangles' areas: $n\times\frac12\times\text{side}\times a = \frac12\times a\times(n\times\text{side})=\frac12ap$ (since $n\times\text{side}=p$, the perimeter) — the regular polygon formula is nothing more than $n$-triangle decomposition, applied to a symmetric case.

## Component 4 — Worked Examples

**Example 1 (LO1 — general decomposition of an irregular quadrilateral, breaking MC-3)**: For a quadrilateral with vertices $A=(0,0)$, $B=(6,0)$, $C=(8,4)$, $D=(1,5)$ (irregular, no special symmetry), draw diagonal $AC$, splitting it into triangles $ABC$ and $ACD$. Triangle $ABC$: area $=\frac12|0(0-4)+6(4-0)+8(0-0)|=\frac12(24)=12$. Triangle $ACD$: area $=\frac12|0(4-5)+8(5-0)+1(0-4)|=\frac12(36)=18$. Total polygon area $=12+18=30$ — computed for a completely irregular shape, no symmetry required.

**Example 2 (LO2 — parallelogram is bh, from two triangles, breaking MC-2)**: A parallelogram with base $6$ and height $4$, split by one diagonal into TWO congruent triangles, each with base $6$ and height $4$: each triangle's area $=\frac12(6)(4)=12$. Total parallelogram area $=2\times12=24=bh$ — NOT $\frac12bh=12$, which would be only ONE of the two triangles, not the whole parallelogram.

**Example 3 (LO3 — the regular polygon formula from n-triangle decomposition, breaking MC-1)**: A regular hexagon with side $s=4$ and apothem $a=2\sqrt3$ (the standard value for a regular hexagon). Decomposing into $6$ congruent isosceles triangles (center to each side): each triangle has base $=4$, height $=2\sqrt3$, area $=\frac12(4)(2\sqrt3)=4\sqrt3$. Total hexagon area $=6\times4\sqrt3=24\sqrt3$. Checking the regular-polygon formula directly: perimeter $p=6\times4=24$; $\text{Area}=\frac12ap=\frac12(2\sqrt3)(24)=24\sqrt3$ — EXACTLY matching the triangle-decomposition sum, confirming the regular-polygon formula is not a separate fact but a direct consequence of $n$-triangle decomposition.

## Component 5 — Teaching Actions

### Teaching Action A01 — Decomposition Works for Any Simple Polygon (Primitive P11: Representation Shift)

State: "draw diagonals from one vertex, split into triangles, add up their areas — this works for ANY simple polygon, symmetric or not." Work Example 1's full decomposition of the irregular quadrilateral.

- **MC-3 hook**: ask "does triangle decomposition only work for regular or symmetric polygons?" — a "yes" answer reveals MC-3 (missing that it is a completely general method for any simple polygon).

### Teaching Action A02 — Parallelogram Is Two Triangles, Not One (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: a parallelogram splits into TWO congruent triangles, each contributing $\frac12bh$, summing to $bh$ total. State: "the parallelogram formula is $bh$, not $\frac12bh$ — that's because a parallelogram is made of TWO triangles, not one; using the triangle formula directly on a parallelogram would only give half the true area."

- **MC-2 hook**: ask "is the area of a parallelogram $\frac12bh$, the same formula as a triangle?" — a "yes" answer reveals MC-2 (mistakenly applying the single-triangle formula to a shape made of two triangles).

### Teaching Action A03 — The Regular Polygon Formula Is n-Triangle Decomposition (Primitive P06: Contrast Pair)

Contrast Example 3's direct $n$-triangle sum ($24\sqrt3$) against the "shortcut" regular-polygon formula ($\frac12ap=24\sqrt3$), showing they match exactly. State: "$\frac12ap$ isn't a separate formula to memorize in isolation — it's exactly what you get from decomposing a regular polygon into $n$ triangles from its center, generalizing the SAME idea from LO1."

- **MC-1 hook**: ask "are the parallelogram, trapezoid, and regular-polygon area formulas three independent facts to memorize separately?" — a "yes" answer reveals MC-1 (missing that all three are derivable from the same underlying triangle-decomposition principle).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Decompose a pentagon of your choice (with given vertex coordinates) into triangles from one vertex, and compute its total area.
  2. Compute the area of a parallelogram with base $10$ and height $3$, and explain why the answer is not $\frac12(10)(3)$.
  3. Compute the area of a trapezoid with parallel sides $5$ and $9$, and height $4$, using $\frac12(b_1+b_2)h$.
  4. For a regular octagon with side $3$ and apothem $a\approx3.62$, compute the area using $\frac12ap$, and explain what $n$-triangle decomposition this formula represents.
- **P76 (Transfer Probe, mode = independence)**: "A landscape architect needs to compute the area of an irregularly-shaped garden plot with 6 straight sides, none of them parallel or equal in length. (a) Explain why none of the standard shortcut formulas (parallelogram, trapezoid, regular polygon) apply directly to this plot. (b) Describe the general method the architect should use instead, referencing this lesson's triangle-decomposition approach. (c) A colleague suggests that since the plot happens to have exactly 6 sides, the regular-hexagon formula $\frac12ap$ might still apply approximately. Explain why this would be a mistake, given the plot is not a REGULAR hexagon."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POLYGON-AREA-FORMULAS-TREATED-AS-INDEPENDENT-FACTS | Believing the parallelogram, trapezoid, and regular-polygon area formulas are three independent facts to memorize separately, missing they are all derivable from triangle decomposition | Foundational |
| MC-2 | PARALLELOGRAM-AREA-MISTAKENLY-USES-TRIANGLE-FORMULA | Believing a parallelogram's area is 1/2*base*height (the triangle formula), missing that a parallelogram is made of two triangles, summing to base*height | Foundational |
| MC-3 | TRIANGLE-DECOMPOSITION-ASSUMED-ONLY-FOR-REGULAR-POLYGONS | Believing triangle decomposition only works for regular or symmetric polygons, missing that it is a fully general method for any simple polygon | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Polygon Area Formulas Treated as Independent Facts") → P41 (detect: ask a student whether the standard polygon formulas are related to each other, and check for a "no, all separate facts" answer) → P64 (conceptual shift: re-walk Example 3's exact match between the direct triangle-decomposition sum and the regular-polygon formula, re-anchoring on "every one of these shortcuts is triangle decomposition in disguise").
- **B02 (targets MC-2)**: P27 (name it: "Parallelogram Area Mistakenly Uses Triangle Formula") → P41 (detect: ask a student for a parallelogram's area formula, and check for a "1/2*base*height" answer) → P64 (conceptual shift: re-walk Example 2's two-triangle decomposition, re-anchoring on "a parallelogram is TWO triangles — the formula is base times height, not half of that").
- **B03 (targets MC-3)**: P27 (name it: "Triangle Decomposition Assumed Only for Regular Polygons") → P41 (detect: ask a student whether triangle decomposition works for an irregular polygon, and check for a "no") → P64 (conceptual shift: re-walk Example 1's fully irregular quadrilateral decomposition, re-anchoring on "decomposition works for ANY simple polygon — regularity isn't required at all").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.area-triangle` (the $\frac12bh$ and Heron's formula this concept's decomposition method directly sums).
- **Unlocks**: `math.geom.area` (a broader treatment of area across shape families, building on this concept's decomposition and shortcut-formula machinery).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a developing/apply tag places this at a "3 TAs + gate" tier — A01 (general decomposition), A02 (the parallelogram formula's correct derivation), and A03 (the regular-polygon formula as n-triangle decomposition) each target a distinct LO, appropriate for a concept whose core insight (everything reduces to triangle decomposition) unifies several seemingly separate formulas.
- Example 1's irregular quadrilateral was deliberately given no symmetry at all (no equal sides, no parallel sides) specifically to make MC-3's "decomposition only works for regular shapes" refutation as concrete as possible.
- Example 3's regular hexagon was deliberately verified BOTH via direct $n$-triangle summation AND via the shortcut formula, with both methods landing on the identical answer ($24\sqrt3$), giving MC-1's "these are all the same underlying idea" claim a directly checkable numerical confirmation rather than an assertion.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific irregular polygon decomposed before the standard shortcut formulas) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
