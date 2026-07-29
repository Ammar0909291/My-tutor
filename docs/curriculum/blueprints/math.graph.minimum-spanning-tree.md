# Teaching Blueprint: Minimum Spanning Tree (`math.graph.minimum-spanning-tree`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.minimum-spanning-tree` |
| name | Minimum Spanning Tree |
| domain | Graph Theory |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.disc.spanning-tree` |
| unlocks | none |
| cross_links | `math.disc.spanning-tree` |
| CPA_entry_stage | A (Abstract) — proficient learner already fluent in spanning tree definition; MST algorithms are abstract greedy procedures on weighted graphs, requiring no pictorial support |
| description (KG) | Minimum spanning tree (MST): spanning tree of minimum total edge weight in a connected weighted graph. Kruskal's algorithm (greedy, sort edges, add if no cycle). Prim's algorithm (greedy, grow from a vertex). Cut property and cycle property as correctness proofs. Applications in network design. |

## Component 1 — Learning Objectives

- LO1: Define a **minimum spanning tree** (MST) of a connected weighted graph; state that an MST always exists and need not be unique; explain the **cut property** (the minimum-weight edge crossing any cut belongs to some MST) and the **cycle property** (the maximum-weight edge of any cycle belongs to no MST) that together justify greedy correctness.
- LO2: Execute **Kruskal's algorithm** (sort all edges by weight ascending; add each edge if it does not create a cycle; stop when $n-1$ edges added) and **Prim's algorithm** (start from any vertex; repeatedly add the minimum-weight edge connecting the current tree to a new vertex) on explicit weighted graphs; state the time complexities $O(m\log m)$ and $O(m\log n)$ respectively.
- LO3: Apply MST algorithms to solve network design problems; recognize when an MST is unique (all edge weights distinct ↔ MST is unique); distinguish MST from shortest-path trees and explain why they differ.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.spanning-tree` (spanning tree definition, existence in connected graphs, tree characterization with $n-1$ edges). Requires familiarity with greedy algorithms and asymptotic notation for complexity statements. No further prerequisites.

## Component 3 — Core Explanation

**Setup.** A **weighted graph** $G=(V,E,w)$ assigns a real weight $w(e)$ to each edge $e\in E$. The **weight** of a subgraph $H$ is $w(H)=\sum_{e\in H}w(e)$. An **MST** is a spanning tree $T^*$ minimizing $w(T^*)$ over all spanning trees of $G$.

**Existence.** Every connected graph has at least one spanning tree (by BFS/DFS), and since there are finitely many spanning trees, a minimum-weight one exists. If all edge weights are distinct, the MST is unique.

**Cut and Cycle Properties.** A **cut** is a partition $(S,V\setminus S)$ of the vertex set; the **cut edges** are those with one endpoint in $S$ and one in $V\setminus S$.

- **Cut property**: If $e$ is the unique minimum-weight edge crossing some cut $(S,V\setminus S)$, then $e$ belongs to every MST. (If all weights are distinct, the minimum-weight cut edge belongs to the unique MST.)
- **Cycle property**: If $e$ is the unique maximum-weight edge in some cycle $C$, then $e$ belongs to no MST.

These two properties together characterize MST edges and justify BOTH Kruskal's and Prim's correctness.

**Kruskal's Algorithm**:
1. Sort edges: $e_1,e_2,\ldots,e_m$ with $w(e_1)\le w(e_2)\le\cdots$.
2. Initialize $T=\varnothing$.
3. For each $e_i$: if $T\cup\{e_i\}$ is acyclic, add $e_i$ to $T$.
4. Output $T$ (which has $n-1$ edges and is an MST).

Cycle detection is handled by a Union-Find (Disjoint Set Union) data structure in $O(\alpha(n))$ per operation, giving total $O(m\log m)$ (dominated by sorting). Correctness: each added edge crosses a cut with no lighter edge available (cut property).

**Prim's Algorithm**:
1. Initialize $S=\{s\}$ for any start vertex $s$; $T=\varnothing$.
2. While $S\ne V$: add to $T$ the minimum-weight edge $(u,v)$ with $u\in S$, $v\notin S$; add $v$ to $S$.
3. Output $T$.

With a binary min-heap: $O(m\log n)$; with a Fibonacci heap: $O(m+n\log n)$. Correctness: each added edge is the minimum-weight cut edge across the cut $(S,V\setminus S)$ — cut property applies directly.

**MST vs. shortest-path tree.** A shortest-path tree from source $s$ (e.g., Dijkstra's tree) minimizes the path LENGTH from $s$ to each vertex. An MST minimizes total edge weight. These are different: a shortest-path tree need not be an MST, and an MST need not contain any shortest path between its vertices (other than tree paths).

## Component 4 — Worked Examples

**Example 1 (LO1 — cut and cycle properties)**: Graph $G$ on 4 vertices $\{a,b,c,d\}$ with edges: $ab=1, ac=3, bc=2, bd=4, cd=5$. Cut $(S,V\setminus S)=(\{a\},\{b,c,d\})$: cut edges are $ab=1$ and $ac=3$; minimum cut edge = $ab=1$ → cut property: $ab$ belongs to every MST. Cycle $a-b-c-a$: edges $ab=1, bc=2, ac=3$; maximum edge = $ac=3$ → cycle property: $ac$ belongs to no MST. MST: edges $ab=1, bc=2, bd=4$ (total weight 7).

**Example 2 (LO2 — Kruskal's algorithm)**: Sorted edges (from Example 1): $ab=1, bc=2, ac=3, bd=4, cd=5$. Add $ab=1$: no cycle ✓. Add $bc=2$: no cycle ✓. Add $ac=3$: would create cycle $a-b-c-a$ ✗ (skip). Add $bd=4$: no cycle ✓. Tree complete ($n-1=3$ edges). MST = $\{ab, bc, bd\}$, weight = 7.

**Example 3 (LO3 — MST vs. shortest path tree)**: Graph $G$ on 4 vertices $\{s,a,b,t\}$: edges $sa=1, ab=1, bt=1, sb=5, st=10$. MST by Kruskal: add $sa=1, ab=1, bt=1$ → MST = path $s-a-b-t$, total weight 3. Dijkstra from $s$: $d(s)=0, d(a)=1, d(b)=2$ (via $s\to a\to b$), $d(t)=3$. Dijkstra tree: same path $s-a-b-t$. Here they coincide. Modify: add edge $at=2$. Now Dijkstra gives $d(t)=3$ (via $s\to a\to t$ with cost $1+2=3$ or $s\to a\to b\to t$ with $1+1+1=3$ — tie). Kruskal: adds $sa=1, ab=1, at=2, bt=1$ — wait, $bt=1$ creates cycle $a-b-t-a$? Yes: $at=2, bt=1, ab=1$ form a cycle → Kruskal skips $at=2$ and adds $bt=1$ instead. MST = $\{sa, ab, bt\}$, weight 3. The Dijkstra tree from $s$ to $t$ uses $s\to a\to t$ (weight 3), but the MST uses $s\to a\to b\to t$ — different tree, same distances in this case. Conclusion: MST and shortest-path tree can differ structurally even when total weights look similar.

## Component 5 — Teaching Actions

### Teaching Action A01 — Greedy by Weight (Primitive P11: Representation Shift)

Draw a network of 5 cities with labeled road costs. Pose: "Build the cheapest road network connecting all cities." Let students guess intuitively. Then formalize: we want a spanning tree (connected, no redundant roads = no cycles) with minimum total cost. Explain that both Kruskal's (global sort) and Prim's (local grow) are greedy strategies — and both are correct because of the cut and cycle properties.

- **MC-1 hook**: ask "Does adding the cheapest available edge at every step always work?" — Yes for MST (Prim's is exactly this, restricted to edges crossing the frontier cut). But for other optimization problems on graphs, greedy fails (shortest paths from a source require Dijkstra's more careful relaxation, not pure greedy).

### Teaching Action A02 — Running Both Algorithms Side by Side (Primitive P25: Deductive)

Use Example 1. Run Kruskal's (sort-then-add) and Prim's (grow-from-vertex) in two parallel columns. Show they produce the same MST. Explain: they always agree on WHICH edges are MST edges (since the MST is unique when weights are distinct), but they discover those edges in different orders (Kruskal: globally cheapest first; Prim: cheapest frontier edge first).

- **MC-2 hook**: ask "If there are tied edge weights, can Kruskal's and Prim's produce different MSTs?" — Yes: when weights are not all distinct, multiple MSTs may exist and the two algorithms may find different ones. Both are still minimum-weight spanning trees, just not the same one.

### Teaching Action A03 — MST Is Not a Shortest-Path Tree (Primitive P16: Counterexample)

Work Example 3. Draw both the MST and the Dijkstra tree on the same graph. Circle the edges that differ. State clearly: an MST minimizes total weight; a shortest-path tree from $s$ minimizes each individual path from $s$. These are different objectives. A student who confuses them will give wrong answers on network design vs. routing problems.

- **MC-3 hook**: ask "If an MST is built for a city road network, does it give the shortest route between any two cities?" — No: the path between two cities in the MST may be longer than the direct road (if the direct road was excluded to avoid a heavier edge elsewhere). The MST is the cheapest CONNECTED structure, not the fastest route.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (5-problem set)**:
  1. Run Kruskal's algorithm on the following weighted graph ($n=5$, $m=7$): edges $ab=4, ac=2, bc=5, bd=1, cd=3, de=6, ce=7$. List the edges added in order and state the total weight of the MST.
  2. Run Prim's algorithm on the same graph starting from vertex $a$. Show the frontier cut at each step.
  3. Prove that if all edge weights are distinct, the MST is unique. (Hint: suppose two distinct MSTs $T_1$ and $T_2$ exist; consider the minimum-weight edge in $T_1\setminus T_2$ and apply the cut property.)
  4. Give an example of a weighted graph on 4 vertices where the MST and the shortest-path tree from vertex $s$ differ (i.e., share a different set of edges). Justify both trees.
  5. State the cycle property precisely and use it to explain why Kruskal's algorithm correctly skips an edge that would form a cycle.
- **P76 (Transfer Probe, mode = independence)**: "The **Borůvka (Sollin) algorithm** (1926, predating both Kruskal and Prim) works in rounds: in each round, every connected component simultaneously adds its minimum-weight outgoing edge (minimum over edges leaving the component). (a) Run Borůvka's algorithm on the graph in Problem 1. How many rounds does it take to complete the MST? (b) Prove that Borůvka's algorithm is correct (hint: use the cut property — what cut does each component's minimum outgoing edge cross?). (c) Borůvka's algorithm terminates in $O(\log n)$ rounds (each round at least halves the number of components). Combined with $O(m)$ work per round, give its overall complexity and compare it to Kruskal's $O(m\log m)$."
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Minimum Spanning Tree — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GREEDY-ALWAYS-GIVES-MST | Believing that greedily adding the globally cheapest available edge at every step always yields the MST — Prim's is a RESTRICTED greedy (cheapest edge crossing the frontier cut, not cheapest overall edge); unrestricted greedy (always cheapest unused edge) is Kruskal's, which uses Union-Find to detect cycles; both are correct for MST but for different structural reasons | Foundational |
| MC-2 | UNIQUE-WEIGHTS-NOT-REQUIRED-FOR-UNIQUENESS | Confusing the sufficient condition (all weights distinct → MST unique) with necessity; some graphs with repeated weights still have a unique MST, while others have multiple; the correct statement is the biconditional: all edge weights distinct ↔ MST is unique | Moderate |
| MC-3 | MST-GIVES-SHORTEST-PATHS | Believing the MST provides shortest paths between all pairs of vertices — the MST minimizes total edge weight across the tree, not path lengths between individual pairs; path lengths in the MST can be longer than direct graph paths between those vertices | Critical |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Prim's Is a Cut-Based Greedy, Not a Global Edge Greedy") → P41 (detect: ask whether Prim's and Kruskal's always add edges in the same order — No: Prim's adds the cheapest edge leaving the current tree (cut-based), while Kruskal's adds the globally cheapest edge that doesn't form a cycle; their execution orders differ even though their final outputs coincide when weights are distinct) → P64 (conceptual shift: Kruskal uses the cut property implicitly — any tree edge is the min-weight edge crossing some cut because if a cheaper edge in the same cut existed, Kruskal would have added it earlier; Prim uses it explicitly — the min-weight edge from $S$ to $V\setminus S$ is always added to $S$'s cut; both are correct for the same logical reason, the cut property).
- **B02 (targets MC-2)**: P27 (name it: "Repeated Weights Can Still Give a Unique MST") → P41 (detect: give a graph $K_3$ with all edges of weight 1 — three MSTs exist; then give a path $P_3$ with all edges of weight 1 — unique MST (it's the only spanning tree); ask which has a unique MST) → P64 (conceptual shift: uniqueness depends on the graph structure AND the weights together; distinct weights GUARANTEE uniqueness by the proof in Problem 3 of the gate; equal weights allow but do not force multiple MSTs — uniqueness still holds in many cases, and must be checked per graph, not assumed from weight-repetition alone).
- **B03 (targets MC-3)**: P27 (name it: "MST Minimizes Total Weight, Not Individual Paths") → P41 (detect: on the graph in Example 3 with edge $at=2$ added, ask for the shortest path from $s$ to $t$ and for the $s$-$t$ path in the MST — they may differ) → P64 (conceptual shift: MST is the answer to "how do I connect all cities with the cheapest total road budget?"; shortest-path trees answer "how do I route quickly from city $s$ to each other city?"; these are different engineering questions, different algorithms, different output trees; confusing them leads to incorrect solutions for network design problems).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.spanning-tree` (spanning tree definition, existence).
- **Unlocks**: none listed in the KG.
- **Cross-link**: `math.disc.spanning-tree` — MISSING on disk (verified) → P76 uses independence mode.

## Component 8 — Teaching Notes

- The cut property and cycle property are the conceptual core; students who understand them can derive both Kruskal's and Prim's correctness from first principles, rather than memorizing two separate algorithm proofs. Teach the properties before the algorithms.
- Borůvka's algorithm in the transfer probe is pedagogically significant: it predates the others by 25 years (designed for electrical networks in Moravia, 1926), it is inherently parallel (all components act simultaneously), and it underlies the fastest known MST algorithms. Presenting it as a transfer challenge at this level is appropriate and tests genuine understanding of the cut property.
- The MST vs. shortest-path tree distinction (MC-3) is the most common error in applications — students who confuse them will consistently give wrong answers on routing vs. infrastructure problems. Return to this distinction when shortest-path algorithms are introduced.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.spanning-tree`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.spanning-tree` MISSING → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01–A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 5 problems | PASS (MAMR = 5/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: proficient, greedy algorithms on abstract weighted graphs) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires running both algorithms on a new graph, proving MST uniqueness, constructing a counterexample to MST=shortest-path, and justifying the cycle property — not reciting algorithm steps | PASS |
