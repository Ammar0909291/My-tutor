# Blueprint: math.disc.spanning-tree

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.spanning-tree |
| name | Spanning Trees |
| Domain | math.disc |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.disc.graph-trees |
| Cross-links | math.graph.minimum-spanning-tree |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines a spanning tree of a connected graph G as a connected acyclic subgraph containing all vertices; proves that any spanning tree of Kₙ has exactly n−1 edges and that every connected graph has at least one spanning tree; states and applies Cayley's formula (the number of labelled spanning trees of Kₙ is nⁿ⁻²); applies Kruskal's algorithm (add cheapest edge that doesn't form a cycle) and Prim's algorithm (grow a tree greedily from a start vertex, adding cheapest edge to an unvisited vertex) to find minimum spanning trees of weighted graphs; and uses the cut property and cycle property to verify MST correctness.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw K₄ with edge weights: 1-2:3, 1-3:1, 1-4:6, 2-3:2, 2-4:5, 3-4:4; list all spanning trees (there are 4⁴⁻²=16 for K₄); highlight the MST {1-3(1), 2-3(2), 3-4(4)} with total weight 7; show Kruskal's steps: take edge 1-3 (weight 1), take 2-3 (weight 2), skip 1-2 (would form cycle 1-2-3-1), take 3-4 (weight 4); annotate: "n=4 vertices, n−1=3 edges in the spanning tree — always exactly n−1 edges")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | SPANNING-TREE-CAN-HAVE-CYCLES | Student includes a cycle in what they call a spanning tree; draws a subgraph connecting all vertices but with an extra edge forming a loop; forgets that a tree is ACYCLIC by definition — a spanning tree uses exactly n−1 edges in a connected spanning subgraph, and any connected subgraph with n−1 edges on n vertices is automatically acyclic | Type 5 — instruction-induced (the word "spanning" is taught as "covers all vertices"; students focus on the spanning part and relax the tree part; the two conditions — connects all vertices + acyclic — together force exactly n−1 edges, which students may not have internalised as a theorem before attempting spanning-tree problems) |
| MC-2 | KRUSKAL-GREEDY-IS-NOT-GLOBALLY-OPTIMAL | Student believes Kruskal's algorithm finds a locally good but possibly globally suboptimal spanning tree — analogising to cases where greedy algorithms fail; doesn't recognise that the cut property guarantees global optimality for MST; applies Kruskal mechanically without confidence in its correctness | Type 1 — overgeneralisation (many greedy algorithms are suboptimal — greedy coin change, greedy TSP; students generalise "greedy is approximate" to MST; the key insight is that the cut property for MSTs is a special structural property that makes the greedy choice at every step provably safe — not all optimisation problems have this "greedy stays ahead" structure) |
| MC-3 | MST-IS-UNIQUE | Student assumes the MST of a weighted graph is always unique; doesn't recognise that when two edges have equal weight, multiple MSTs may exist with the same total weight; the uniqueness theorem says the MST is unique when ALL edge weights are distinct | Type 5 — instruction-induced (textbook examples use distinct weights, producing a unique MST; students generalise this as a general property; the corrected version: with distinct weights, the MST is unique; with ties, any algorithm that breaks ties consistently produces one valid MST, but multiple MSTs of the same total weight may exist) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Spanning trees — definition, existence, and Cayley's formula:**

**Definition:** A spanning tree of a connected graph G=(V,E) is a subgraph T=(V,F) where F ⊆ E such that T is connected and acyclic. Every spanning tree has exactly |V|−1 edges.

**Existence:** every connected graph has a spanning tree. Proof: remove edges from cycles one by one until no cycle remains; the result is a connected acyclic spanning subgraph = spanning tree.

**Characterisation equivalences:** for a graph T on n vertices with n−1 edges, the following are equivalent:
1. T is a tree (connected and acyclic).
2. T is connected with n−1 edges.
3. T is acyclic with n−1 edges.
4. T is acyclic, and adding any edge creates exactly one cycle.
5. Any two vertices are connected by exactly one path.

**Cayley's formula:** The number of distinct labelled spanning trees of Kₙ (complete graph on vertices {1,2,…,n}) is **nⁿ⁻²**.
- K₁: 1⁻¹=1 (just the single vertex). K₂: 2⁰=1 (one edge). K₃: 3¹=3 (three trees). K₄: 4²=16 (verify by enumeration).

**Prüfer sequence proof sketch:** there is a bijection between labelled spanning trees of Kₙ and sequences of length n−2 from {1,…,n} (Prüfer sequences). There are nⁿ⁻² such sequences → nⁿ⁻² spanning trees.

**P49 checkpoint:**
- CORRECT → "Spanning tree: connected acyclic, uses all V, exactly n−1 edges. Every connected graph has one. Cayley: nⁿ⁻² labelled spanning trees of Kₙ. Equivalences: tree↔connected n−1 edges↔acyclic n−1 edges." → A02
- PARTIAL (MC-1: spanning tree can have cycles) → "A spanning tree has TWO mandatory properties: (1) SPANNING — it includes every vertex. (2) TREE — it is connected and ACYCLIC. A 'connected spanning subgraph' that has a cycle is a connected spanning GRAPH, not a spanning TREE. The tree property forces exactly n−1 edges: fewer → disconnected; more → cycle. Quick check: count edges. If your spanning subgraph has ≥n edges, it has a cycle and is not a tree. If it has n−1 edges and is connected, it is automatically acyclic." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "K₃ spanning trees: vertices {1,2,3}, edges {12,13,23}. Spanning trees are subsets of 2 edges that connect all 3 vertices: {12,13} (tree: 1-2, 1-3, no cycle ✓), {12,23} (tree: 2-1-? wait: 1-2-3, connected ✓), {13,23} (tree: 1-3-2 ✓). Total: 3 = 3¹ = 3^{3−2}. Cayley's formula confirmed for n=3." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Minimum spanning trees — Kruskal's, Prim's, and correctness:**

**Minimum spanning tree (MST):** given a connected weighted graph, a spanning tree of minimum total edge weight.

**Cut property:** Let S ⊂ V be any non-trivial vertex partition (S and V\S both non-empty). The minimum-weight edge crossing the cut (S, V\S) is in SOME MST. If it's unique, it's in EVERY MST.

**Cycle property:** For any cycle C in G, the maximum-weight edge of C is NOT in any MST (assuming distinct weights). It can be removed without disconnecting the graph.

**Kruskal's algorithm:**
1. Sort all edges by weight (ascending).
2. Process edges in order: add edge e to the growing forest iff it doesn't form a cycle (use Union-Find to check in near-O(1)).
3. Stop when n−1 edges have been added (spanning tree complete).

Time complexity: O(E log E) = O(E log V) (dominated by sorting).

**Prim's algorithm:**
1. Start with any vertex s; mark it as in-tree.
2. Repeatedly: add the minimum-weight edge connecting a tree vertex to a non-tree vertex; mark the new vertex as in-tree.
3. Stop when all vertices are in the tree.

Time complexity: O(E log V) with a binary heap; O(E + V log V) with Fibonacci heap.

**Correctness proof sketch (Kruskal):** by the cut property, at each step when Kruskal adds edge e = (u,v), the cut separating the connected components of u and v is a valid cut. e is the minimum-weight edge crossing that cut (since all cheaper edges were already added or form cycles). By cut property, e is in some MST. Inducting on each edge addition proves the final tree is an MST.

**P49 checkpoint:**
- CORRECT → "MST: minimum total weight spanning tree. Cut property: min edge across any cut is in some MST. Cycle property: max edge in any cycle is in no MST. Kruskal: sort edges, add if no cycle (O(E log E)). Prim: grow from start, add cheapest edge to unvisited vertex (O(E log V))." → Gate (P91)
- PARTIAL (MC-2: Kruskal is only locally optimal) → "Kruskal is GLOBALLY optimal. The proof uses the CUT PROPERTY: when Kruskal considers edge e=(u,v), u and v are in different connected components of the current forest. The set of vertices in u's component forms one side S of a cut. All edges cheaper than e that cross this cut were processed earlier — they were either added (and connected components within S or within V\S) or caused a cycle (meaning both endpoints were already connected within the same component). So e is the minimum-weight edge crossing (S, V\S). By the cut property, e belongs to some MST. Applying this argument at every step proves global optimality." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Run Kruskal on 4 vertices {1,2,3,4} with edges: 1-2:1, 2-3:2, 3-4:3, 1-3:4, 1-4:5, 2-4:6. Sorted: 1-2(1), 2-3(2), 3-4(3), 1-3(4), 1-4(5), 2-4(6). Step 1: add 1-2. Step 2: add 2-3 (no cycle). Step 3: add 3-4 (no cycle). Now n−1=3 edges. MST: {1-2, 2-3, 3-4}, weight=1+2+3=6. Check: is 1-3 needed? No — 1-2-3 already connects 1 and 3. ✓" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "Tree = connected + acyclic. These two conditions together force n−1 edges on n vertices. Proof: induction. A single vertex has 0 edges = n−1 = 0. Adding a new vertex v connected by one edge to the existing tree: connected (v can reach every old vertex through its edge), acyclic (v has degree 1, can't be on a cycle), edge count increases by 1 = still n−1. Removing an edge from a tree always disconnects it (since in a tree, every edge is a bridge)."
Step 2 — "MST uniqueness depends on edge weights. With DISTINCT weights: the MST is unique. Proof: suppose T₁ and T₂ are both MSTs but differ. Let e be the minimum-weight edge in T₁ but not T₂. The path from e's endpoints in T₂ must contain an edge e' not in T₁. Then w(e)<w(e') (since e is minimum in the symmetric difference). Replacing e' with e in T₂ gives a spanning tree with smaller weight — contradicting T₂ being an MST. With EQUAL weight edges: ties may produce genuinely different MSTs of the same total weight. All valid."
Step 3 — "Number of MSTs: there is no simple formula for the number of MSTs of a weighted graph in general. However, the Matrix-Tree Theorem gives the total number of spanning trees (not MSTs) of an unweighted graph as any cofactor of the Laplacian matrix L=D−A. For K₄: Laplacian L has entries L_{ii}=3, L_{ij}=−1 for i≠j. Any 3×3 cofactor of L equals 4²=16, confirming Cayley's formula."

**TB-R02 (MC-2 KRUSKAL OPTIMALITY):**
Step 1 — "Why greedy works for MST but not TSP: the Travelling Salesman Problem is about finding a minimum-cost Hamiltonian cycle (visits every vertex exactly once). Greedy TSP (always go to the nearest unvisited city) is not optimal because adding a short local edge can trap you in a subgraph that forces a long edge later. For MST, the cut property guarantees that adding the cheapest cut edge never 'traps' you — you're building a forest and any cheap edge across any cut is safe. The structural difference: MST's subproblems are INDEPENDENT (cuts are independent), TSP's are DEPENDENT (choosing one edge constrains what's available later)."
Step 2 — "Union-Find data structure in Kruskal: to check if adding edge (u,v) creates a cycle, test if u and v are already in the same connected component. Union-Find supports this in near-O(1) amortized (with path compression and union by rank). Kruskal's overall time is dominated by the O(E log E) sort. With E=O(V²), this is O(V² log V)."
Step 3 — "Prim vs. Kruskal: both find an MST. Prim maintains one growing tree and always adds the cheapest edge to an unvisited vertex — suitable for dense graphs (adjacency matrix: O(V²) time). Kruskal processes edges globally — suitable for sparse graphs (E log E often ≪ V²). For very dense graphs (E≈V²), Prim with an adjacency matrix is O(V²), better than Kruskal's O(V² log V)."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Find all spanning trees of the complete graph K₄ by enumeration. Verify Cayley's formula: should be 4²=16.
2. Run Kruskal's algorithm on the graph with vertices {A,B,C,D,E} and weighted edges: AB:4, AC:2, AD:7, BC:3, BD:5, BE:8, CD:1, CE:6, DE:9. Show each step. State the MST edges and total weight.
3. Prove the cut property: given a weighted connected graph G with distinct edge weights, the minimum-weight edge e crossing any cut (S, V\S) belongs to every MST. (Hint: suppose T is an MST without e; adding e to T creates a cycle; that cycle contains another edge e' crossing the cut; since w(e)<w(e'), replacing e' with e gives a cheaper spanning tree — contradiction.)
4. Run Prim's algorithm on the same graph as problem 2, starting from vertex A. Show the order in which vertices and edges are added. Verify that the result is the same MST as Kruskal.
5. Borůvka's algorithm (1926): in each round, for every connected component, add the cheapest edge leaving that component (breaking ties consistently). Repeat until one component remains. Verify this finds an MST on the problem 2 graph by running it and checking each round. How many rounds does it take? What is the time complexity per round (use the cut property to argue correctness)?

**P55 — Reflect & Consolidate:** "Spanning tree: connected acyclic, n vertices → n−1 edges. Cayley: nⁿ⁻² labelled spanning trees of Kₙ. MST: minimum total weight. Cut property: min-weight cut edge is in some MST. Kruskal: sort edges, add if no cycle, O(E log E). Prim: grow tree, add cheapest unvisited vertex, O(E log V). Distinct weights → unique MST. Equal weights → possibly multiple MSTs with same total weight."

**P76 — Transfer Probe (Cross-link mode: math.graph.minimum-spanning-tree):**
(a) Matrix-Tree theorem: the number of spanning trees of any graph G equals any cofactor of the Laplacian matrix L=D−A (where D is the degree matrix). Compute the number of spanning trees of the Petersen graph (V=10, E=15, 3-regular → each diagonal entry of L is 3). The answer is 2,000; derive it from any 9×9 minor of L using the theorem. Contrast with Cayley's formula for complete graphs. (b) Randomised MST: Karger, Klein, and Tarjan (1995) gave a linear-time randomised algorithm for MST, using random sampling to reduce the number of edges that need processing. The key lemma: for any MST T and any random subgraph H (each edge kept independently with probability p), the number of edges in G\H that are NOT heavier than the T-path maximum in H has expected value ≤ n/p. Explain why this sampling lemma enables recursion and why it beats sorting-based approaches. (c) Minimum spanning arborescence (directed MST): for a directed graph (digraph), a spanning arborescence rooted at r is a directed spanning tree where every vertex has exactly one path from r. Edmonds' algorithm (Chu-Liu/Edmonds, 1967) finds the minimum spanning arborescence in O(EV) time. The algorithm contracts cycles in a greedy fashion — explain the structural difference from undirected MST and why the cut property must be generalised.

**P75 — Mastery Assessment:**
"(a) A network of 6 cities has road costs: 1-2:5, 1-3:3, 2-4:2, 2-5:8, 3-4:4, 3-6:6, 4-5:1, 5-6:7. Find the MST using Kruskal's algorithm. Show each edge considered in order and state whether it's added or rejected (and why). (b) Prove that if T is a spanning tree of G and e∉T is any edge, then T+e contains exactly one cycle. Use this to show that if removing some edge f from that cycle and adding e produces a lighter tree, then T was not an MST. (c) How many spanning trees does the cycle graph C₅ have? (Hint: use the Matrix-Tree theorem with the 5×5 Laplacian.) Verify your answer is 5 by enumeration (each spanning tree of C₅ is C₅ minus one edge). (d) In Prim's algorithm, why must you always add the minimum-weight edge from any tree vertex to any non-tree vertex (not just from the most recently added vertex)? Give a specific example graph where restricting to the most recently added vertex gives a suboptimal result."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the cut property proof and the Kruskal/Prim complexity comparison
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.graph-trees; reassign

**P78 — Completion:** Spanning Trees certified. Student defines spanning trees, proves the n−1-edge characterisation, states Cayley's formula, applies Kruskal's and Prim's algorithms with correctness justification via the cut property, uses the cycle property to verify non-MST edges, and handles the distinct-vs-tied-weight MST uniqueness question.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.graph.minimum-spanning-tree])
Target: Matrix-Tree theorem for counting spanning trees; randomised linear-time MST; minimum spanning arborescence in digraphs
Skill tested: Connect spanning tree counting to the Laplacian spectrum, understand probabilistic MST improvements, and generalise MST to directed graphs

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
