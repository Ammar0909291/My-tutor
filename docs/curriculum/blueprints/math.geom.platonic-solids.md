# Teaching Blueprint: Platonic Solids (`math.geom.platonic-solids`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.platonic-solids` |
| name | Platonic Solids |
| domain | Geometry |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.geom.solid-3d`, `math.geom.regular-polygon` |
| unlocks | (none in KG) |
| cross_links | `math.top.euler-characteristic` |
| CPA_entry_stage | C (Concrete) — physical/visual models of all five solids |
| description (KG) | The five convex regular polyhedra (tetrahedron, cube, octahedron, dodecahedron, icosahedron); the only regular polyhedra in 3D, classified by Euclid.

 |

## Component 1 — Learning Objectives

- LO1: Identify the FIVE Platonic solids — TETRAHEDRON (4 triangular faces), CUBE (6 square faces), OCTAHEDRON (8 triangular faces), DODECAHEDRON (12 pentagonal faces), ICOSAHEDRON (20 triangular faces) — each built from a SINGLE type of `math.geom.regular-polygon` face, with the SAME number of faces meeting at every vertex.
- LO2: Recognize that these are the ONLY FIVE convex regular polyhedra that exist in 3D — this is NOT an incomplete list awaiting more discoveries, but a mathematically COMPLETE and PROVEN classification (first rigorously established by Euclid).
- LO3: Connect to `math.top.euler-characteristic`: verify EULER'S FORMULA $V-E+F=2$ (vertices minus edges plus faces equals 2) holds for each Platonic solid — a genuine topological invariant, not a coincidence specific to these five shapes.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.solid-3d` (3D solids generally) and `math.geom.regular-polygon` (each Platonic solid's faces are regular polygons).

## Component 3 — Core Explanation

The **Platonic solids** are the five convex regular polyhedra: **tetrahedron** (4 triangular faces, 4 vertices, 6 edges), **cube** (6 square faces, 8 vertices, 12 edges), **octahedron** (8 triangular faces, 6 vertices, 12 edges), **dodecahedron** (12 pentagonal faces, 20 vertices, 30 edges), and **icosahedron** (20 triangular faces, 12 vertices, 30 edges). Each is built from a SINGLE type of regular polygon face, with the SAME number of faces meeting at EVERY vertex — this uniform regularity is what defines "Platonic."

A profound mathematical fact: these FIVE are the ONLY convex regular polyhedra that can exist in 3D space — this was rigorously PROVEN by Euclid (not merely observed as "the ones discovered so far"). No sixth Platonic solid exists, and this is a settled, complete mathematical classification, not an open question.

Each Platonic solid satisfies **Euler's Formula** $V-E+F=2$ (Vertices $-$ Edges $+$ Faces $=2$) — e.g. for the cube: $8-12+6=2$ ✓. This isn't a coincidence unique to these five shapes; it's a genuine TOPOLOGICAL INVARIANT (from `math.top.euler-characteristic`) holding for any convex polyhedron.

## Component 4 — Worked Examples

**Example 1 (LO1 — identifying faces and matching to solids, breaking MC-1)**: Match each Platonic solid to its face shape and count: tetrahedron (4 TRIANGLES), cube (6 SQUARES), octahedron (8 TRIANGLES), dodecahedron (12 PENTAGONS), icosahedron (20 TRIANGLES). A common error confuses the octahedron and icosahedron (both triangular-faced) by their FACE COUNT (8 vs. 20) — since three of the five solids (tetrahedron, octahedron, icosahedron) all use TRIANGULAR faces, distinguishing them requires tracking the SPECIFIC face count and vertex arrangement, not just "it has triangles."

**Example 2 (LO2 — completeness of the classification)**: Explain why there is no "sixth" Platonic solid, e.g. one made of regular hexagonal faces. At each vertex of a convex polyhedron, the angles of the meeting faces must sum to LESS than $360°$ (otherwise the surface would be flat or fold the wrong way, not close up into a solid) — for regular hexagons (each interior angle $120°$), even just THREE meeting at a vertex would sum to exactly $360°$, which is too much to allow a convex corner to form; this angle-sum constraint is exactly why only certain (face-shape, faces-per-vertex) combinations work, and Euclid's classification proves precisely five such combinations exist.

**Example 3 (LO3 — verifying Euler's formula, breaking MC-2)**: Verify $V-E+F=2$ for the icosahedron ($V=12$, $E=30$, $F=20$). $12-30+20=2$ ✓. A common error assumes Euler's formula is a special property unique to a FEW of the Platonic solids (perhaps verified for the cube and assumed not to generalize), rather than recognizing it as a GENUINE TOPOLOGICAL INVARIANT holding for ALL FIVE Platonic solids (and indeed, for any convex polyhedron whatsoever, not just these five).

## Component 5 — Teaching Actions

### Teaching Action A01 — Distinguishing the Three Triangular-Faced Solids by Face Count (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting tetrahedron/octahedron/icosahedron's face counts side by side.

- **MC-1 hook**: this directly targets MC-1 (confusing the three triangular-faced solids with each other).

### Teaching Action A02 — Why Exactly Five: The Vertex-Angle-Sum Constraint (Primitive P64: Conceptual Shift)

Work Example 2, explicitly deriving why hexagonal (and larger) regular polygons cannot form a sixth Platonic solid.

### Teaching Action A03 — Euler's Formula Holds for All Five, as a Genuine Invariant (reused procedure)

Work Example 3, explicitly verifying the formula for a specific solid and generalizing to all five.

- **MC-2 hook**: this directly targets MC-2 (assuming Euler's formula only holds for some, not all, Platonic solids).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Name all five Platonic solids and their face shapes.
  2. Explain why the octahedron and icosahedron, despite both having triangular faces, are different solids.
  3. Verify Euler's formula for the tetrahedron ($V=4$, $E=6$, $F=4$).
  4. Explain, at a high level, why regular hexagons cannot form a sixth Platonic solid.
- **P76 (Transfer Probe, mode = independence)**: "A game designer creating a set of 'fair' dice (where every face has an equal chance of landing up, due to full geometric symmetry) wants to use Platonic solids as the dice shapes, since their perfect regularity guarantees fairness. (a) Explain why a Platonic solid's uniform face-and-vertex structure makes it a naturally 'fair' die shape. (b) Explain why the designer cannot simply invent a NEW sixth Platonic-solid-based die shape with, say, hexagonal faces, connecting to the completeness of Euclid's classification."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TRIANGULAR-FACED-PLATONIC-SOLIDS-CONFUSED-WITH-EACH-OTHER | Confusing the tetrahedron, octahedron, and icosahedron (all triangular-faced) with each other, without tracking their distinct face/vertex counts | Moderate |
| MC-2 | EULERS-FORMULA-ASSUMED-TO-HOLD-FOR-ONLY-SOME-PLATONIC-SOLIDS-NOT-ALL | Assuming Euler's formula (V-E+F=2) holds for only some Platonic solids rather than recognizing it as a genuine invariant for all convex polyhedra | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Triangular-Faced Platonic Solids Confused with Each Other") → P41 (detect: present Example 1 and check whether the three triangular-faced solids are correctly distinguished) → P64 (conceptual shift: re-review each solid's specific face/vertex/edge counts side by side).
- **B02 (targets MC-2)**: P27 ("Euler's Formula Assumed to Hold for Only Some Platonic Solids Not All") → P41 (detect: ask whether Euler's formula holds for a specific solid not yet verified) → P64 (conceptual shift: re-verify the formula explicitly for that solid, confirming the pattern holds universally).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.solid-3d`, `math.geom.regular-polygon`.
- **Unlocks**: none recorded in the KG.
- **Cross-links**: `math.top.euler-characteristic` (the general topological invariant this concept exemplifies).

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects the genuine breadth of learning five distinct solids' properties plus the completeness proof's underlying logic.
- Both misconceptions were ranked Moderate because each reflects an incomplete grasp of the classification's structure rather than a computational error with a wrong numeric answer.
- The fair-dice transfer probe was deliberately chosen because Platonic-solid-shaped dice are a genuinely recognizable real-world application (e.g. D4, D6, D8, D12, D20 tabletop gaming dice), making the "why exactly five" completeness question concretely motivated.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.solid-3d`, `math.geom.regular-polygon`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (`math.top.euler-characteristic`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physical/visual models of all five solids) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
