# Teaching Blueprint: Spanning Trees (`math.disc.spanning-tree`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.spanning-tree` |
| name | Spanning Trees |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.disc.graph-trees` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — drawn graphs with candidate spanning trees highlighted before algorithmic execution |
| description (KG) | A spanning tree of G uses all vertices and n−1 edges with no cycles. For weighted graphs, the minimum spanning tree (MST) minimizes total edge weight. Kruskal's algorithm: greedy by edge weight; Prim's: greedy from a starting vertex.

 |

## Component 1 — Learning Objectives

- LO1: Identify whether a given subgraph is a valid spanning tree of a graph $G$ (uses ALL $n$ vertices, exactly $n-1$ edges, and contains NO cycles).
- LO2: Execute Kruskal's algorithm (greedily add the smallest-weight edge that doesn't create a cycle) to find a minimum spanning tree (MST).
- LO3: Execute Prim's algorithm (greedily grow a tree from a starting vertex, always adding the smallest-weight edge connecting the tree to a new vertex) to find an MST, and recognize both algorithms can produce the SAME or DIFFERENT valid MSTs when weights include ties.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph-trees` (what a tree is — connected, acyclic) — a spanning tree is specifically a tree that uses every vertex of a larger graph.

## Component 3 — Core Explanation

A **spanning tree** of a connected graph $G$ with $n$ vertices is a subgraph that (1) includes ALL $n$ vertices, (2) has exactly $n-1$ edges, and (3) contains NO cycles (hence is itself a tree). For a WEIGHTED graph, a **minimum spanning tree (MST)** is a spanning tree whose total edge weight is as small as possible.

**Kruskal's algorithm**: sort all edges by weight (ascending); greedily add each edge to the growing spanning tree UNLESS it would create a cycle (checked via a union-find/connectivity structure), until $n-1$ edges are chosen.

**Prim's algorithm**: start with a single vertex; repeatedly add the SMALLEST-weight edge connecting the current tree to any vertex NOT yet in the tree, until all vertices are included.

Both algorithms are GREEDY (never reconsider a choice) yet both provably produce a genuine MST — a non-obvious fact resting on the "cut property" of MSTs, though the full proof is beyond this concept's scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying a valid spanning tree, breaking MC-1)**: A graph $G$ has 5 vertices and 7 edges. A proposed spanning tree candidate has 5 vertices and 5 edges — this is INVALID: a spanning tree of a 5-vertex graph must have EXACTLY $5-1=4$ edges, not 5 (5 edges among 5 vertices would necessarily include a cycle, violating the acyclic requirement). A common error checks only "does it include all vertices?" without also verifying the exact edge count and acyclic condition.

**Example 2 (LO2 — Kruskal's algorithm)**: A graph has edges (with weights) $\{A,B\}$:1, $\{B,C\}$:4, $\{A,C\}$:3, $\{C,D\}$:2, $\{B,D\}$:5. Sort by weight: $\{A,B\}$:1, $\{C,D\}$:2, $\{A,C\}$:3, $\{B,C\}$:4, $\{B,D\}$:5. Add $\{A,B\}$ (no cycle). Add $\{C,D\}$ (no cycle). Add $\{A,C\}$ (connects the two components, no cycle). Now 3 edges, 4 vertices — one more edge needed; try $\{B,C\}$: would this create a cycle? $B$ and $C$ are ALREADY connected (via $A$), so adding $\{B,C\}$ WOULD create a cycle — skip it. Try $\{B,D\}$: $B$ and $D$ are already connected too — also creates a cycle, skip. Wait — with all remaining edges skipped, the algorithm needs re-examination: actually after adding $\{A,B\},\{C,D\},\{A,C\}$, all 4 vertices ARE already connected (3 edges, 4 vertices, connected = spanning tree already complete). MST: $\{A,B\},\{C,D\},\{A,C\}$, total weight $1+2+3=6$.

**Example 3 (LO3 — Prim's algorithm on the same graph, breaking MC-2)**: Starting from vertex $A$: smallest edge from $A$ is $\{A,B\}$:1 — add it (tree: $\{A,B\}$). Smallest edge connecting the tree $\{A,B\}$ to an outside vertex: $\{A,C\}$:3 vs. $\{B,C\}$:4 vs. $\{B,D\}$:5 — smallest is $\{A,C\}$:3 — add it (tree: $A,B,C$). Smallest edge connecting to $D$: $\{C,D\}$:2 vs. $\{B,D\}$:5 — smallest is $\{C,D\}$:2 — add it. Final MST: $\{A,B\},\{A,C\},\{C,D\}$, total weight $1+3+2=6$ — the SAME total weight as Kruskal's result (though the specific edge SET matches here; in general, with tied weights, different valid MSTs with the same total weight can arise from the two algorithms). A common error assumes Prim's and Kruskal's must always select the IDENTICAL specific edges, rather than recognizing both are only guaranteed to find SOME minimum-weight spanning tree, which may differ in edge choice when ties exist while still sharing the same minimum total weight.

## Component 5 — Teaching Actions

### Teaching Action A01 — Spanning Tree Requires Exactly n−1 Edges and No Cycles (Primitive P64: Conceptual Shift)

Draw Example 1's graph and the invalid 5-edge candidate, explicitly identifying the cycle it contains, then show a genuine valid 4-edge spanning tree for comparison.

- **MC-1 hook**: this directly targets MC-1 (checking only vertex coverage, not edge count/acyclicity) by requiring the student to verify ALL THREE conditions explicitly for the candidate.

### Teaching Action A02 — Kruskal's: Sort, Then Greedily Add Without Creating Cycles (Primitive P64: Conceptual Shift, second instance)

Work Example 2 step by step, explicitly checking the cycle condition at each candidate edge (using the growing set of connected components) before accepting or rejecting it.

### Teaching Action A03 — Prim's vs. Kruskal's: Same Guarantee, Possibly Different Process (Primitive P06: Contrast Pair)

Work Example 3's Prim's-algorithm execution on the SAME graph, comparing its edge-by-edge growth process against Kruskal's global sorting approach, while confirming both reach the same minimum total weight. State the rule: "both algorithms guarantee a MINIMUM total weight, but when weights tie, the SPECIFIC edges chosen can differ between the two methods — check total weight for correctness, not edge-set identity."

- **MC-2 hook**: this contrast directly targets MC-2 (assuming both algorithms must produce identical edge sets).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Given a 6-vertex graph, state how many edges any valid spanning tree of it must have.
  2. Given a weighted graph with 5 edges among 4 vertices, apply Kruskal's algorithm to find the MST and its total weight.
  3. Apply Prim's algorithm (starting from a specified vertex) to the same graph from problem 2, and verify the total weight matches Kruskal's result.
  4. Explain, in one sentence, why a spanning tree cannot contain a cycle even if that would let it reuse fewer distinct vertices.
- **P76 (Transfer Probe, mode = independence)**: "A telecom company wants to connect 6 towns with fiber-optic cable at minimum total cost, where the cost of connecting each pair of towns (that CAN be directly connected) is known and varies. (a) Model this as a weighted graph and explain, using this lesson's definitions, why the solution the company wants is precisely a minimum spanning tree. (b) The company's engineer runs Kruskal's algorithm and gets one cable layout; a second engineer runs Prim's algorithm starting from a different town and gets a layout using slightly different specific cable routes but the identical total cost — explain, using this lesson's tie-breaking discussion, why both layouts can be considered equally valid, optimal solutions."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SPANNING-TREE-VALIDITY-CHECKED-ONLY-BY-VERTEX-COVERAGE | Verifying a candidate spanning tree covers all vertices without also checking the exact edge count and acyclic condition | Foundational |
| MC-2 | PRIM-AND-KRUSKAL-ASSUMED-TO-PRODUCE-IDENTICAL-EDGE-SETS | Believing both algorithms must always select the exact same specific edges, rather than recognizing both only guarantee the same minimum TOTAL weight | Moderate |
| MC-3 | CYCLE-CHECK-SKIPPED-DURING-KRUSKALS-ALGORITHM | Adding an edge during Kruskal's algorithm without checking whether its two endpoints are already connected, potentially introducing a cycle | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Spanning Tree Validity Checked Only by Vertex Coverage") → P41 (detect: present Example 1's 5-edge candidate and check whether the edge count/cycle condition is verified beyond vertex coverage) → P64 (conceptual shift: re-derive the cycle explicitly by tracing the candidate's edges, showing a repeated path back to a visited vertex).
- **B02 (targets MC-2)**: P27 ("Prim/Kruskal Assumed Identical Edge Sets") → P41 (detect: present Example 3 and ask whether Prim's result should match Kruskal's edge-for-edge) → P64 (conceptual shift: re-compare both algorithms' TOTAL weights explicitly, confirming equality there even if individual edges could in principle differ under ties).
- **B03 (targets MC-3)**: P27 ("Cycle Check Skipped During Kruskal's Algorithm") → P41 (detect: review a submitted Kruskal's-algorithm execution for an added edge that creates a cycle) → P64 (conceptual shift: re-walk the algorithm, explicitly tracking connected components and checking each candidate edge's endpoints against them before adding).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph-trees`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.disc.graph-representation` (informally, the graph structures this concept's algorithms operate on).

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept introduces two distinct, non-trivial algorithms (Kruskal's, Prim's), each requiring careful step-by-step execution practice beyond the underlying spanning-tree definition itself.
- MC-3 was ranked foundational severity because skipping the cycle check is the single specific procedural failure point in Kruskal's algorithm — every other step (sorting, iterating) is straightforward, making this the concept's genuine point of difficulty.
- The telecom transfer probe was deliberately designed with two DIFFERENT valid solutions (from the two algorithms/starting points) arising from the SAME problem, directly testing MC-2's correction — that spanning-tree optimality is about total weight, not a uniquely-determined edge set, in the presence of ties.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.graph-trees`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: drawn graphs with candidate trees before algorithms) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
