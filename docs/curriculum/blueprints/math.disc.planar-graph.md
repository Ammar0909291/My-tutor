# Teaching Blueprint: Planar Graphs (`math.disc.planar-graph`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.planar-graph` |
| name | Planar Graphs |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.disc.graph` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — hand-drawn redrawing attempts before formal edge-bound analysis |
| description (KG) | A graph that can be drawn in the plane without edge crossings. Euler's formula: V−E+F=2 (V vertices, E edges, F faces). Kuratowski's theorem: planar iff no K₅ or K₃,₃ subdivision. At most 3V−6 edges.

 |

## Component 1 — Learning Objectives

- LO1: Determine whether a small graph is planar by attempting to redraw it without edge crossings, recognizing that a graph DRAWN with crossings may still BE planar if a crossing-free redrawing exists.
- LO2: Apply Euler's formula $V-E+F=2$ for a connected planar graph, solving for any one of $V$, $E$, $F$ given the other two.
- LO3: Apply the edge bound $E\le3V-6$ (for $V\ge3$) as a NECESSARY (but not sufficient) condition for planarity — a graph violating this bound is definitely non-planar, but satisfying it does not guarantee planarity.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph` (vertices and edges) — planarity is a drawing/embedding property of a graph's abstract structure.

## Component 3 — Core Explanation

A graph is **planar** if it CAN be drawn in the plane with no two edges crossing (except at shared endpoints) — crucially, this is about whether SOME crossing-free drawing exists, not whether a GIVEN drawing happens to have crossings (a graph drawn with crossings may still be planar if it can be redrawn without them).

**Euler's formula**: for any connected planar graph drawn in the plane, $V-E+F=2$, where $F$ counts the FACES of the drawing including the unbounded outer face.

**Edge bound**: for a simple planar graph with $V\ge3$, $E\le3V-6$ — derivable from Euler's formula together with the fact that each face is bordered by at least 3 edges. This gives a NECESSARY condition: if a graph has MORE edges than $3V-6$, it CANNOT be planar. But satisfying $E\le3V-6$ does not by itself guarantee planarity (e.g. $K_{3,3}$ has $V=6,E=9$, and $3V-6=12\ge9$, satisfying the bound, yet $K_{3,3}$ is famously NON-planar — Kuratowski's theorem, characterizing planarity exactly via forbidden $K_5$/$K_{3,3}$ subdivisions, is needed for a full determination).

## Component 4 — Worked Examples

**Example 1 (LO1 — a graph drawn with crossings can still be planar, breaking MC-1)**: $K_4$ (complete graph on 4 vertices) drawn with all vertices on a circle and all edges as straight lines has ONE crossing (the two diagonals cross). But $K_4$ IS planar: redraw with one vertex moved INSIDE the triangle formed by the other three, and all 6 edges can be drawn with no crossings. The original crossing was an artifact of a POOR drawing choice, not evidence of non-planarity.

**Example 2 (LO2 — Euler's formula)**: A planar drawing of a connected graph has $V=6$ vertices and $E=9$ edges. By Euler's formula: $F=2-V+E=2-6+9=5$ faces (including the unbounded outer face).

**Example 3 (LO3 — the edge bound is necessary but not sufficient, breaking MC-2)**: $K_5$ (complete graph on 5 vertices) has $V=5,E=10$. Check the edge bound: $3V-6=3(5)-6=9$; since $E=10>9$, $K_5$ VIOLATES the bound, proving it is non-planar — the bound alone is enough to rule OUT $K_5$. But $K_{3,3}$ has $V=6,E=9$; the bound gives $3(6)-6=12\ge9$, so $K_{3,3}$ SATISFIES the edge bound, yet $K_{3,3}$ is still non-planar (a genuinely different, harder-to-see obstruction — it contains no triangles, so the tighter bound for TRIANGLE-FREE planar graphs, $E\le2V-4$, actually rules it out: $2(6)-4=8<9$). A common error assumes satisfying the basic $E\le3V-6$ bound is sufficient to CONCLUDE planarity, when it only ever proves non-planarity (when violated) — it can never by itself prove a graph IS planar.

## Component 5 — Teaching Actions

### Teaching Action A01 — A Crossing in One Drawing Doesn't Prove Non-Planarity (Primitive P64: Conceptual Shift)

Work Example 1's $K_4$ redrawing explicitly, showing the same abstract graph drawn two different ways — one with a crossing, one without — to establish that planarity is a property of the GRAPH, not of any one particular drawing attempt.

- **MC-1 hook**: present a graph drawn with a crossing and ask whether it is planar (revealing MC-1: concluding non-planarity directly from a single crossing drawing, without attempting a redraw).

### Teaching Action A02 — Euler's Formula Connects V, E, F (Primitive P64: Conceptual Shift, second instance)

Work Example 2, solving for $F$ given $V,E$, and practicing rearranging the formula to solve for each of the three quantities in turn.

### Teaching Action A03 — Edge Bound: Necessary, Not Sufficient (Primitive P06: Contrast Pair)

Work Example 3's two cases side by side — $K_5$ (violates the bound, proven non-planar) and $K_{3,3}$ (satisfies the bound, yet still non-planar) — to show the bound's asymmetric logical power. State the rule: "violating $E\le3V-6$ PROVES non-planarity; satisfying it proves NOTHING either way — you'd need Kuratowski's theorem or an actual successful redrawing to confirm planarity."

- **MC-2 hook**: this contrast directly targets MC-2 (treating the edge bound as a sufficient condition for planarity).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given a graph drawn with 2 edge crossings, explain what would need to be true to determine whether it is genuinely planar.
  2. Given a connected planar graph with $V=8, F=6$, find $E$ using Euler's formula.
  3. Given a graph with $V=7, E=16$, apply the edge bound to determine whether it can be planar.
  4. Explain, in one sentence, why satisfying $E\le3V-6$ does not guarantee a graph is planar.
- **P76 (Transfer Probe, mode = independence)**: "A circuit board designer wants to lay out a set of components and connections on a SINGLE layer (no wires crossing, since crossing wires would short-circuit on one physical layer). (a) Explain, using this lesson's definitions, why determining whether this layout is possible is exactly a planarity question about the connection graph. (b) The designer's graph has $V=10$ components and $E=25$ required connections; apply the edge bound to determine whether a valid single-layer (planar) layout is even POSSIBLE, and explain what the designer would need to do if the bound is violated."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CROSSING-IN-ONE-DRAWING-ASSUMED-TO-PROVE-NON-PLANARITY | Concluding a graph is non-planar directly from one drawing with crossings, without attempting to find a crossing-free redrawing | Foundational |
| MC-2 | EDGE-BOUND-TREATED-AS-SUFFICIENT-FOR-PLANARITY | Believing satisfying $E\le3V-6$ guarantees a graph is planar, rather than recognizing it only rules OUT planarity when violated | Foundational |
| MC-3 | EULERS-FORMULA-APPLIED-TO-A-DISCONNECTED-GRAPH | Applying $V-E+F=2$ directly to a disconnected planar graph, without the required adjustment for multiple components | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Crossing in One Drawing Assumed to Prove Non-Planarity") → P41 (detect: present a crossed drawing and check whether "non-planar" is concluded without attempting a redraw) → P64 (conceptual shift: re-attempt Example 1's $K_4$ redrawing explicitly, demonstrating the crossing was avoidable).
- **B02 (targets MC-2)**: P27 ("Edge Bound Treated as Sufficient for Planarity") → P41 (detect: present $K_{3,3}$'s bound-satisfying-but-non-planar case and check whether planarity is (incorrectly) concluded) → P64 (conceptual shift: re-state the logical direction explicitly — "violating the bound proves NOT planar; satisfying it proves nothing" — using $K_{3,3}$ as the concrete counterexample).
- **B03 (targets MC-3)**: P27 ("Euler's Formula Applied to Disconnected Graph") → P41 (detect: present a disconnected planar graph and check whether $V-E+F=2$ is applied without adjustment) → P64 (conceptual shift: note that for $c$ connected components, the correct formula becomes $V-E+F=1+c$, re-deriving with the component count accounted for).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.disc.graph-coloring` (the Four Color Theorem applies specifically to planar graphs).

## Component 8 — Teaching Notes

- estimated_hours = 4 and bloom = analyze reflect that this concept requires genuine structural reasoning about drawings and bounds, not mechanical formula application alone.
- MC-2 was ranked most severe alongside MC-1 because it represents a classic one-directional-implication error (common throughout mathematics — confusing a necessary condition with a sufficient one), and $K_{3,3}$'s status as the standard counterexample makes this an unusually teachable, memorable case to anchor the correction.
- Kuratowski's theorem (mentioned in the KG description) is deliberately NOT the focus of this concept's learning objectives — its full statement and application (detecting $K_5$/$K_{3,3}$ subdivisions) is a genuinely harder skill appropriately deferred; this concept instead builds the necessary foundation (Euler's formula, the edge bound, and the crucial necessary-vs-sufficient distinction) that a future concept could build on.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.graph`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: hand-drawn redrawing before formal analysis) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
