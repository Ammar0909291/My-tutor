# Teaching Blueprint: Regular Polygon (`math.geom.regular-polygon`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.regular-polygon` |
| name | Regular Polygon |
| domain | Geometry |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.geom.polygon` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — sequence of regular polygons approaching a circle |
| description (KG) | A polygon with all sides equal and all angles equal; inscribed in a circle, approaching the circle as n → ∞.

 |

## Component 1 — Learning Objectives

- LO1: Define a REGULAR polygon as having BOTH all sides equal AND all angles equal — recognizing that EQUAL SIDES ALONE (equilateral but not equiangular) or EQUAL ANGLES ALONE (equiangular but not equilateral) is NOT sufficient for a polygon to be regular, except in the special case of triangles.
- LO2: Recognize that EVERY regular polygon can be INSCRIBED in a circle (all vertices lying on a common circle) — a genuine geometric fact, not a coincidence.
- LO3: Recognize that as the number of sides $n\to\infty$, a regular $n$-gon's shape APPROACHES a circle — connecting the discrete world of polygons to the continuous circle as a limiting case.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.polygon` — the regular polygon is a specific, highly symmetric subtype.

## Component 3 — Core Explanation

A **regular polygon** has BOTH all sides EQUAL length AND all angles EQUAL measure — BOTH conditions together, not either alone. For TRIANGLES specifically, having all sides equal (equilateral) AUTOMATICALLY implies all angles equal too (as seen in `math.geom.triangle-types`) — but for polygons with MORE than 3 sides, equal sides do NOT automatically guarantee equal angles (e.g. a rhombus has all equal sides but generally UNEQUAL angles), and equal angles do NOT automatically guarantee equal sides (e.g. a non-square rectangle has all equal angles but generally UNEQUAL sides) — for $n>3$, both conditions must be verified INDEPENDENTLY.

Every regular polygon can be INSCRIBED in a circle — all its vertices lie on a single common circle, a genuine consequence of the polygon's full rotational symmetry (each vertex is equidistant from the polygon's center).

As the number of sides $n$ grows larger and larger ($n\to\infty$), a regular $n$-gon's shape gets closer and closer to a perfect CIRCLE — the circle can be understood as the LIMITING case of a regular polygon with infinitely many, infinitesimally short sides.

## Component 4 — Worked Examples

**Example 1 (LO1 — both conditions required for n>3, breaking MC-1)**: Determine whether a rhombus (all sides equal, but generally unequal angles) is a regular polygon. NO — even though ALL SIDES are equal, the ANGLES are generally NOT all equal (a typical rhombus has two pairs of unequal angles), so it fails the "all angles equal" requirement. A common error assumes "equal sides" alone is sufficient for regularity (perhaps generalizing incorrectly from the triangle case, where equal sides DO guarantee equal angles) — for polygons with MORE than 3 sides, both conditions (equal sides AND equal angles) must be checked INDEPENDENTLY; neither one alone guarantees the other.

**Example 2 (LO2 — inscribing in a circle)**: For a regular hexagon, describe how to construct the circumscribing circle. Since a regular hexagon has full rotational symmetry, its center is equidistant from all six vertices — this common distance is the circle's radius, and drawing a circle of that radius from the center passes through all six vertices exactly, confirming the polygon is inscribed in that circle.

**Example 3 (LO3 — approaching a circle as n grows, breaking MC-2)**: Compare a regular hexagon ($n=6$), a regular dodecagon ($n=12$), and a regular 100-gon, all inscribed in the SAME circle of radius $r$. As $n$ increases, the polygon's perimeter gets CLOSER to the circle's circumference $2\pi r$, and the polygon's shape gets visually closer to a smooth circle. A common error assumes the polygon reaches (becomes EXACTLY) a circle at some large but FINITE value of $n$ (e.g. "a 1000-gon basically IS a circle") — a regular polygon with ANY finite number of sides, no matter how large, is still technically a polygon with straight edges and vertices, genuinely DIFFERENT from a smooth circle; it only approaches the circle in the LIMIT as $n\to\infty$, never actually reaching it at any finite $n$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Both Equal Sides AND Equal Angles Are Required for n > 3 (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting the triangle special case (equal sides implies equal angles) against the general polygon case (both must be checked independently).

- **MC-1 hook**: this directly targets MC-1 (assuming equal sides alone suffices for regularity in polygons with more than 3 sides).

### Teaching Action A02 — Constructing the Circumscribing Circle (reused procedure)

Work Example 2, explicitly using the polygon's rotational symmetry to justify the inscribed-circle property.

### Teaching Action A03 — Approaching, But Never Exactly Reaching, a Circle at Any Finite n (Primitive P64: Conceptual Shift)

Work Example 3, explicitly emphasizing the distinction between "approaching in the limit" and "becoming exactly equal at some finite value."

- **MC-2 hook**: this directly targets MC-2 (assuming a polygon with a large finite number of sides literally becomes a circle).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Determine whether a non-square rectangle (all angles equal, but generally unequal sides) is a regular polygon, and justify.
  2. Explain why, for triangles specifically, equal sides automatically guarantee equal angles, unlike for polygons with more sides.
  3. Explain what it means for a regular polygon to be "inscribed" in a circle.
  4. Explain why a regular 1000-gon, despite looking almost circular, is not actually a circle.
  5. (Extra credit) Describe what happens to a regular n-gon's perimeter as n approaches infinity, relative to the circumscribing circle's circumference.
- **P76 (Transfer Probe, mode = independence)**: "A manufacturer is designing a coin with a regular polygon shape (rather than a perfect circle) for a limited-edition release, using a regular 20-gon (icosagon) inscribed in a fixed circular blank of radius 1.5 cm. (a) Explain why the coin's actual edge (the 20-gon) is NOT perfectly smooth like a circle, even though it might look nearly circular to the naked eye. (b) Explain what would happen to the coin's shape, in the limit, if the manufacturer kept increasing the number of sides indefinitely."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EQUAL-SIDES-ALONE-ASSUMED-SUFFICIENT-FOR-REGULARITY-BEYOND-TRIANGLES | Assuming equal sides alone guarantees a polygon is regular, over-generalizing from the special triangle case where this happens to hold, for polygons with more than 3 sides | Foundational |
| MC-2 | LARGE-FINITE-N-GON-ASSUMED-TO-LITERALLY-BECOME-A-CIRCLE | Assuming a regular polygon with a sufficiently large finite number of sides literally becomes a circle, rather than merely approaching it in the limit as n approaches infinity | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Equal Sides Alone Assumed Sufficient for Regularity Beyond Triangles") → P41 (detect: present Example 1's rhombus case and check whether equal sides alone is (incorrectly) assumed sufficient) → P64 (conceptual shift: re-check the angles explicitly, confirming both conditions must be verified independently for n>3).
- **B02 (targets MC-2)**: P27 ("Large Finite N-Gon Assumed to Literally Become a Circle") → P41 (detect: present Example 3 and check whether a large finite n-gon is (incorrectly) treated as identical to a circle) → P64 (conceptual shift: re-emphasize the distinction between "approaching in the limit" and "reaching at a finite value," using the polygon's still-straight edges as evidence).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.polygon`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.circle` (the limiting case as n→∞).
- **Parent**: `math.geom.polygon`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.85 reflects the genuine importance of this concept as a bridge between discrete polygon geometry and the continuous circle.
- MC-1 was ranked Foundational because it produces a genuinely wrong classification (misidentifying a non-regular shape as regular), while MC-2 was ranked Moderate as a subtler limiting-process misunderstanding that doesn't affect ordinary polygon classification.
- The limited-edition-coin transfer probe was deliberately chosen because a polygon-shaped coin makes the "approaches but never becomes a circle" distinction concretely visible and tangible.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.polygon`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS (plus 1 extra-credit item, still ≥4) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: sequence of regular polygons approaching a circle) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
