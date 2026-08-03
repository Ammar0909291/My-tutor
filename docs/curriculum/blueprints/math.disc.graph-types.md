# Teaching Blueprint: Graph Types (`math.disc.graph-types`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.graph-types` |
| name | Graph Types |
| domain | Discrete Mathematics |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.disc.graph` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — drawn examples of each type before symbolic definitions |
| description (KG) | Simple graph (no loops/multi-edges), multigraph (multiple edges allowed). Complete graph Kₙ: every pair connected. Bipartite: vertices split into two sets with edges only between sets. Regular: all vertices same degree.

 |

## Component 1 — Learning Objectives

- LO1: Distinguish a SIMPLE graph (no loops, no multiple edges between the same pair) from a MULTIGRAPH (multiple edges allowed, possibly loops).
- LO2: Identify a COMPLETE graph $K_n$ (every pair of vertices connected) and compute its edge count $\binom{n}{2}$.
- LO3: Identify a BIPARTITE graph (vertices splittable into two sets with edges only BETWEEN the sets, never within one) and a REGULAR graph (every vertex has the same degree).

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph` (the basic definition of a graph — vertices and edges) — this concept classifies graphs into named structural families.

## Component 3 — Core Explanation

Graphs come in several standard classified families: **Simple graphs** disallow loops (an edge from a vertex to itself) and multiple edges between the same pair; **multigraphs** allow both. A **complete graph** $K_n$ has EVERY pair of its $n$ vertices connected by an edge, giving $\binom{n}{2}=\frac{n(n-1)}{2}$ total edges. A **bipartite** graph's vertices split into two disjoint sets $U,V$ such that every edge connects a vertex in $U$ to one in $V$ — never two vertices within the same set. A **regular** graph has every vertex with the SAME degree (number of incident edges); a $k$-regular graph has all degrees equal to $k$.

These classifications are not mutually exclusive — a graph can be simple AND bipartite AND regular simultaneously, or belong to none of these special families at all.

## Component 4 — Worked Examples

**Example 1 (LO1 — simple vs. multigraph)**: A social network graph where each pair of friends has AT MOST one "friendship" edge is SIMPLE. A graph modeling flights between cities, where MULTIPLE distinct flight routes can connect the same two cities, is a MULTIGRAPH — the multiple parallel edges represent genuinely different routes, not an error to be simplified away.

**Example 2 (LO2 — complete graph edge count, breaking MC-1)**: $K_5$ (complete graph on 5 vertices) has $\binom{5}{2}=10$ edges — NOT $5\times5=25$ (which would double-count each edge and incorrectly include self-loops) and NOT simply $5$ (confusing vertex count with edge count). Each of the 10 edges corresponds to one UNORDERED pair of the 5 vertices.

**Example 3 (LO3 — bipartite vs. regular, breaking MC-2)**: A graph representing job applicants (set $U$) and job openings (set $V$), with an edge whenever an applicant is qualified for an opening, is BIPARTITE — all edges go between $U$ and $V$, never applicant-to-applicant or opening-to-opening. This graph need NOT be regular — different applicants may be qualified for different numbers of openings (different degrees). Conversely, a graph where every vertex has exactly degree 3 (a "3-regular" graph) need not be bipartite at all — e.g. a triangle-based structure can be 2-regular without any bipartite splitting being possible (a triangle itself, $K_3$, is NOT bipartite, since it contains an odd cycle). These two classifications (bipartite, regular) are INDEPENDENT properties — satisfying one says nothing about the other.

## Component 5 — Teaching Actions

### Teaching Action A01 — Simple vs. Multigraph, and Complete Graphs (Primitive P11: Representation Shift)

Draw Example 1's two contrasting graphs side by side (simple friendship graph vs. multigraph flight-route graph), then draw $K_4$ and $K_5$ explicitly, counting edges by hand to connect the visual count to the $\binom{n}{2}$ formula.

- **MC-1 hook**: ask for $K_5$'s edge count before revealing the formula, checking whether $25$ (vertex-count-squared) is guessed (revealing MC-1: computing a complete graph's edge count as $n^2$ or $n$ rather than $\binom{n}{2}$).

### Teaching Action A02 — Bipartite and Regular Are Independent Properties (Primitive P06: Contrast Pair)

Work Example 3's two scenarios side by side — a bipartite-but-not-regular graph (applicants/openings) and a regular-but-not-bipartite graph (a 2-regular triangle) — to show neither property implies or excludes the other. State the rule: "always check bipartite-ness and regularity SEPARATELY — a graph can have either, both, or neither, independently."

- **MC-2 hook**: this contrast directly targets MC-2 (assuming bipartite graphs must be regular, or vice versa).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Determine whether a graph modeling co-authorship (an edge whenever two researchers have co-authored MULTIPLE distinct papers together, with a separate edge per paper) is simple or a multigraph.
  2. Compute the number of edges in $K_7$.
  3. Determine whether a graph representing students (set $U$) enrolled in courses (set $V$), with an edge for each enrollment, is bipartite, and explain why.
  4. Given a graph where every vertex has degree 4, state whether this alone determines if the graph is bipartite, and justify your answer.
- **P76 (Transfer Probe, mode = independence)**: "A chess tournament is modeled as a graph where vertices are players and an edge connects two players if they have played each other exactly once (the tournament is a round-robin, so every pair plays exactly once). (a) Determine whether this graph is simple or a multigraph, and whether it is complete — explain both classifications using this lesson's definitions. (b) If every player instead plays each opponent exactly TWICE (once at each other's home venue), determine how this changes the simple/multigraph classification, and explain what the new edge count would be for 6 players."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COMPLETE-GRAPH-EDGE-COUNT-MISCOMPUTED | Computing $K_n$'s edge count as $n^2$ or $n$ rather than the correct $\binom{n}{2}$ | Foundational |
| MC-2 | BIPARTITE-AND-REGULAR-ASSUMED-RELATED | Believing bipartite-ness implies (or is implied by) regularity, rather than recognizing these as independent graph properties | Moderate |
| MC-3 | MULTIGRAPH-EDGES-COLLAPSED-INTO-ONE | Simplifying away genuinely distinct parallel edges in a multigraph scenario, treating multiple real connections as a single edge | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Complete Graph Edge Count Miscomputed") → P41 (detect: present Example 2 and check for a 25 or 5 answer instead of 10) → P64 (conceptual shift: re-derive by explicitly listing all unordered pairs of the 5 vertices, counting them directly, then connecting to the $\binom{n}{2}$ formula).
- **B02 (targets MC-2)**: P27 ("Bipartite and Regular Assumed Related") → P41 (detect: present Example 3's two independent-property scenarios and check whether one property is assumed to imply the other) → P64 (conceptual shift: re-examine both example graphs side by side, confirming each property independently by definition).
- **B03 (targets MC-3)**: P27 ("Multigraph Edges Collapsed into One") → P41 (detect: present Example 1's flight-route scenario and check whether multiple routes between the same cities are treated as one edge) → P64 (conceptual shift: re-state that each genuinely distinct route/connection is its own edge in a multigraph, preserving the count rather than deduplicating).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.disc.graph-coloring` (bipartite graphs are exactly the 2-colorable graphs, a connection this concept sets up), `math.disc.planar-graph`.

## Component 8 — Teaching Notes

- estimated_hours = 2 and bloom = understand reflect that this concept is primarily CLASSIFICATORY — recognizing and naming structural graph families — rather than introducing new computational procedures.
- MC-1 was ranked foundational severity because the complete-graph edge-count formula is used repeatedly throughout later discrete mathematics content (probability on random graphs, Ramsey theory, etc.), so an early miscomputation compounds broadly.
- The chess-tournament transfer probe was deliberately designed with a part (b) extension (doubling the match count) specifically to test whether the simple/multigraph distinction transfers to a modified scenario, rather than only being recognized in the exact form first presented.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.graph`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: drawn examples before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
