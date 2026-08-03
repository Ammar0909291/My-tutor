# Teaching Blueprint: Graph Coloring (`math.disc.graph-coloring`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.graph-coloring` |
| name | Graph Coloring |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.disc.graph` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — hand-colored graph diagrams before formal chromatic-number analysis |
| description (KG) | Assign colors to vertices so no adjacent vertices share a color. The chromatic number χ(G) is the minimum number of colors needed. Four Color Theorem: χ ≤ 4 for planar graphs. Greedy algorithms give upper bounds.

 |

## Component 1 — Learning Objectives

- LO1: Produce a VALID coloring of a given graph (no two adjacent vertices share a color) using a specified number of colors.
- LO2: Determine (for small graphs) or bound the CHROMATIC NUMBER $\chi(G)$ — the minimum number of colors needed for a valid coloring.
- LO3: Apply a GREEDY coloring algorithm and recognize it gives only an UPPER BOUND on $\chi(G)$, not necessarily the true minimum — the greedy result can require more colors than actually necessary, depending on vertex order.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph` (vertices and edges) — coloring assigns labels to vertices subject to an adjacency constraint.

## Component 3 — Core Explanation

A **graph coloring** assigns a color to each vertex such that no two ADJACENT vertices (connected by an edge) share the same color. The **chromatic number** $\chi(G)$ is the minimum number of colors needed for SOME valid coloring to exist. Some known bounds: $\chi(G)\ge\omega(G)$ (the size of the largest clique — a complete subgraph — since every pair in a clique needs a distinct color); the **Four Color Theorem** states $\chi(G)\le4$ for any PLANAR graph (a landmark, famously computer-assisted result).

A **greedy coloring** algorithm processes vertices in some order, assigning each the SMALLEST-numbered color not already used by its already-colored neighbors. This always produces a VALID coloring, but the number of colors it uses depends on the vertex ORDER chosen and generally only gives an UPPER BOUND on $\chi(G)$ — a poor vertex order can force the greedy algorithm to use more colors than the true chromatic number requires.

## Component 4 — Worked Examples

**Example 1 (LO1 — a valid coloring)**: A graph forming a 4-cycle ($A-B-C-D-A$) can be validly colored with 2 colors: $A$=red, $B$=blue, $C$=red, $D$=blue — every edge connects differently-colored vertices. This works because the cycle has EVEN length (4).

**Example 2 (LO2 — chromatic number via clique lower bound, breaking MC-1)**: A graph containing a TRIANGLE (a 3-clique, e.g. vertices $A,B,C$ all mutually connected) requires AT LEAST 3 colors, since all 3 vertices are pairwise adjacent and must each get a distinct color — $\chi(G)\ge3$ for any graph containing a triangle, REGARDLESS of how many total vertices or edges the larger graph has. A common error assumes a graph with "not too many edges" must have a small chromatic number, missing that even a single triangle anywhere in the graph forces $\chi(G)\ge3$.

**Example 3 (LO3 — greedy coloring's order-dependence, breaking MC-2)**: Consider a "star-plus-path" graph structure where a poor vertex ordering causes the greedy algorithm to use 3 colors, while a better ordering achieves the true chromatic number of 2. Specifically: for a bipartite graph (which always has $\chi=2$ by definition — two sets, edges only between them), greedily coloring vertices in an order that ALTERNATES between the two sets can force unnecessary color reuse if not carefully managed, sometimes needing 3+ colors under a bad order despite the TRUE chromatic number being 2. This demonstrates that a greedy algorithm's color COUNT is not, by itself, proof of the true chromatic number — it is only an upper bound, and a smarter (or just different) coloring might do better.

## Component 5 — Teaching Actions

### Teaching Action A01 — Coloring Validity: No Adjacent Same-Color Vertices (Primitive P64: Conceptual Shift)

Work Example 1, hand-coloring the 4-cycle and explicitly checking each edge to confirm no adjacent pair shares a color.

### Teaching Action A02 — Cliques Force a Lower Bound on the Chromatic Number (Primitive P06: Contrast Pair)

Work Example 2, contrasting a triangle-free graph (potentially 2-colorable) against a triangle-containing graph (provably needing 3+), showing the clique-size lower bound directly. State the rule: "find the largest clique in the graph — that size is an unavoidable LOWER bound on how many colors are needed, no matter how sparse the rest of the graph is."

- **MC-1 hook**: this contrast directly targets MC-1 (assuming few edges implies a small chromatic number, ignoring localized cliques).

### Teaching Action A03 — Greedy Gives an Upper Bound, Not Necessarily the True Minimum (Primitive P06: Contrast Pair, second pairing)

Work Example 3's order-dependence demonstration, showing a poor vertex order forces extra colors even for a graph with a small true chromatic number. State the rule: "greedy coloring ALWAYS produces a valid coloring, but the number of colors it uses is only an upper bound — a different vertex order (or a smarter algorithm) might achieve fewer colors, matching the true $\chi(G)$."

- **MC-2 hook**: this contrast directly targets MC-2 (treating a greedy result as automatically optimal).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Provide a valid 2-coloring for a given 6-cycle graph, or explain why 2 colors suffice.
  2. Given a graph containing a 4-clique (all 4 vertices mutually connected), state a lower bound on its chromatic number and justify it.
  3. Apply greedy coloring to a given small graph with a specified vertex order, and count the colors used.
  4. Explain, in one sentence, why a greedy coloring's color count is only an upper bound on the true chromatic number.
- **P76 (Transfer Probe, mode = independence)**: "A university's exam-scheduling problem is modeled as a graph where vertices are courses and an edge connects two courses if any student is enrolled in both (so they cannot be scheduled at the same time). (a) Explain, using this lesson's definitions, why the minimum number of exam time-slots needed corresponds exactly to the graph's chromatic number. (b) The scheduling office runs a greedy algorithm and gets a schedule using 6 time-slots; a consultant claims a smarter algorithm could potentially use fewer — explain, using this lesson's upper-bound distinction, why the greedy result of 6 does not by itself prove that 6 is the true minimum number of time-slots needed."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SPARSE-GRAPH-ASSUMED-SMALL-CHROMATIC-NUMBER | Assuming a graph with relatively few edges must have a small chromatic number, ignoring that even a single localized clique forces a lower bound | Foundational |
| MC-2 | GREEDY-COLORING-RESULT-ASSUMED-OPTIMAL | Treating the number of colors a greedy algorithm happens to use as the true chromatic number, rather than recognizing it as only an upper bound | Foundational |
| MC-3 | COLORING-VALIDITY-CHECKED-INCOMPLETELY | Verifying only some edges of a proposed coloring rather than checking every single edge for a same-color adjacent pair | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Sparse Graph Assumed Small Chromatic Number") → P41 (detect: present Example 2's triangle-containing graph and check whether a chromatic number below 3 is guessed) → P64 (conceptual shift: re-identify the triangle explicitly, showing all 3 vertices are pairwise adjacent and must be pairwise differently colored).
- **B02 (targets MC-2)**: P27 ("Greedy Coloring Result Assumed Optimal") → P41 (detect: present Example 3's order-dependence case and check whether the greedy result is accepted as the true chromatic number without further checking) → P64 (conceptual shift: re-run the greedy algorithm with a DIFFERENT vertex order on the same graph, showing a different (possibly smaller) color count results).
- **B03 (targets MC-3)**: P27 ("Coloring Validity Checked Incompletely") → P41 (detect: review a submitted coloring for an unchecked edge that actually violates validity) → P64 (conceptual shift: re-verify systematically, checking every single edge in the graph one by one against the proposed coloring).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.disc.graph-types` (bipartite graphs are exactly the 2-colorable graphs), `math.disc.planar-graph` (the Four Color Theorem's domain of applicability).

## Component 8 — Teaching Notes

- estimated_hours = 4 and bloom = analyze reflect that this concept requires genuine structural reasoning (identifying cliques, evaluating algorithm quality) beyond mechanical coloring execution.
- MC-2 was ranked most severe alongside MC-1 because it represents a fundamental misunderstanding of what a greedy/heuristic algorithm's output actually guarantees — a very common general confusion in algorithmic problem-solving (mistaking "an algorithm's output" for "the true optimum"), not specific to coloring alone, making its correction broadly valuable.
- The exam-scheduling transfer probe was deliberately chosen as the canonical real-world graph-coloring application, since it makes the abstract chromatic-number concept concretely meaningful (minimum time-slots needed) while directly testing whether the greedy-vs-optimal distinction (MC-2) transfers to a practical decision-making context.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: hand-colored diagrams before analysis) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
