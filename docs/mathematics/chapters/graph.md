# Graph Theory (`math.graph`)

**Domain:** math.graph  
**Subject:** Mathematics  
**Concepts:** 16  
**Status:** draft  
**Build Date:** 2026-07-05  
**KG Version:** 1.0.1 (commit 4ae2048)

---

## Table of Contents

1. [Graphs — Definitions and Basics](#graph)
2. [Graph Invariants](#graph-invariants)
3. [Graph Operations](#graph-operations)
4. [Connectivity](#connectivity)
5. [Trees](#tree)
6. [Minimum Spanning Trees](#minimum-spanning-tree)
7. [Shortest Paths](#shortest-path)
8. [Maximum Flow](#maximum-flow)
9. [Matchings](#matching)
10. [Eulerian Circuits and Paths](#eulerian-circuit)
11. [Hamiltonian Cycles and Paths](#hamiltonian-cycle)
12. [Graph Coloring](#graph-coloring)
13. [Algebraic Graph Theory](#algebraic-graph-theory)
14. [Ramsey Theory](#ramsey-theory)
15. [Extremal Graph Theory](#extremal-graph-theory)
16. [Random Graphs](#random-graph)

---

## 1. Graphs — Definitions and Basics {#graph}

**Concept ID:** `math.graph.graph`  
**Prerequisites:** math.found.set-theory  
**Difficulty:** beginner

A **graph** G = (V, E) consists of a finite vertex set V and an edge set E. For an undirected graph, E ⊆ {V choose 2} (unordered pairs); for a directed graph (digraph), E ⊆ V × V (ordered pairs). The **order** is |V| and the **size** is |E|. The **degree** deg(v) is the number of edges incident to v.

**Key Ideas:**
- Formal definition distinguishes simple graphs (no loops, no multiple edges), multigraphs (multiple edges allowed), and pseudographs (loops allowed).
- Handshaking lemma: Σ_{v∈V} deg(v) = 2|E|; every graph has an even number of odd-degree vertices.
- Special graphs: complete graph Kₙ (every pair adjacent), bipartite graph (V = A ∪ B, all edges between A and B), cycle Cₙ, path Pₙ.

**Common Misconceptions:**
- *"A graph must have edges"* — Edgeless graphs and the single-vertex graph are valid; the empty graph (V=∅, E=∅) is also a graph.
- *"Every degree sequence is realizable"* — The Erdős-Gallai theorem characterizes which integer sequences are the degree sequence of some simple graph.

**Learning Objective:** Define graphs formally; compute degree sequences; verify the handshaking lemma; identify complete, bipartite, and regular graphs.

---

## 2. Graph Invariants {#graph-invariants}

**Concept ID:** `math.graph.graph-invariants`  
**Prerequisites:** math.graph.graph  
**Difficulty:** intermediate

A **graph invariant** is a property preserved by graph isomorphism. Key invariants: **diameter** (maximum shortest-path distance), **girth** (shortest cycle length), **independence number** α(G) (max independent set), **clique number** ω(G) (max clique), **chromatic number** χ(G) (min colors for proper vertex coloring).

**Key Ideas:**
- Degree sequence, diameter, girth, and chromatic number are all necessary but not sufficient to characterize isomorphism.
- Clique-independence duality: α(G) = ω(Ḡ) where Ḡ is the complement.
- Brooks' theorem: χ(G) ≤ Δ(G); clique lower bound: ω(G) ≤ χ(G).

**Common Misconceptions:**
- *"Same degree sequence ⟹ isomorphic"* — False: co-spectral non-isomorphic graphs exist.
- *"χ(G) = ω(G) always"* — False: Mycielski's construction gives triangle-free graphs with arbitrarily large χ.

**Learning Objective:** Define and compute diameter, girth, α(G), ω(G), χ(G); apply clique and degree bounds; distinguish invariants from isomorphism characterization.

---

## 3. Graph Operations {#graph-operations}

**Concept ID:** `math.graph.graph-operations`  
**Prerequisites:** math.graph.graph  
**Difficulty:** intermediate

Standard **graph operations** transform one graph into another. Key operations: **complement** Ḡ (same vertices, complementary edges), **join** G+H (union plus all cross-edges), **Cartesian product** G □ H (vertex set V(G)×V(H), edges between vertices differing in one coordinate), **line graph** L(G) (vertices = edges of G, adjacent iff sharing a vertex), **edge contraction**.

**Key Ideas:**
- Complement: Ḡ has edge uv iff G does not; α(G) = ω(Ḡ); self-complementary graphs (C₅, P₄) satisfy G ≅ Ḡ.
- Cartesian product: hypercube Q_n = K₂ □ K₂ □ ... □ K₂ (n times), 2ⁿ vertices, n·2^{n-1} edges, n-regular.
- Line graph: L(Kₙ) is (2n-4)-regular with n(n-1)/2 vertices and n(n-1)(n-2)/2 edges.

**Common Misconceptions:**
- *"G ∪ H connects G and H"* — The disjoint union keeps components separate; join G+H adds all cross-edges.
- *"Edge contraction always removes exactly 1 edge"* — It also merges parallel edges from common neighbors.

**Learning Objective:** Define complement, join, Cartesian product, and line graph; compute their properties; construct hypercubes using Cartesian product.

---

## 4. Connectivity {#connectivity}

**Concept ID:** `math.graph.connectivity`  
**Prerequisites:** math.disc.graph-connectivity  
**Difficulty:** intermediate

**Vertex connectivity** κ(G) is the minimum number of vertices whose removal disconnects G. **Edge connectivity** λ(G) is the minimum number of edges whose removal disconnects G. **Whitney's inequality:** κ(G) ≤ λ(G) ≤ δ(G). **Menger's theorem:** the maximum number of vertex-disjoint s-t paths equals the minimum s-t vertex cut.

**Key Ideas:**
- Whitney's inequality: κ ≤ λ ≤ δ; equality throughout holds for vertex-transitive graphs (Kₙ, Cₙ, Qₙ).
- Menger's theorem is the graph-theoretic analogue of max-flow min-cut applied to vertex capacities.
- k-connected: G is k-connected iff between any two vertices there are k internally vertex-disjoint paths.

**Common Misconceptions:**
- *"κ(G) = λ(G) always"* — False: κ ≤ λ strictly for some graphs (e.g., graphs with both a bridge and no cut vertex cannot have κ = λ = 1 simultaneously... more precisely: a graph with a bridge and a vertex of degree ≥ 2 can have λ=1 and κ=1, but more complex examples show strict inequality).
- *"2-connected means no cut vertices"* — Correct; 2-connectivity is exactly the condition eliminating cut vertices.

**Learning Objective:** Define κ and λ; verify Whitney's inequality; state and apply Menger's theorem; identify bridges and cut vertices.

---

## 5. Trees {#tree}

**Concept ID:** `math.graph.tree`  
**Prerequisites:** math.disc.graph-trees  
**Difficulty:** intermediate

A **tree** is a connected acyclic graph. Equivalent characterizations for a graph T on n vertices: (1) connected + acyclic; (2) connected + n-1 edges; (3) acyclic + n-1 edges; (4) unique path between any two vertices; (5) connected, removing any edge disconnects it. **Cayley's formula:** the number of labeled trees on n vertices is n^{n-2}.

**Key Ideas:**
- Five equivalent characterizations; any one implies the others.
- Every tree has at least two leaves (degree-1 vertices) when n ≥ 2.
- Cayley's formula: n^{n-2} labeled trees; proved via the Prüfer sequence bijection (sequences of length n-2 over {1,...,n}).

**Common Misconceptions:**
- *"Trees must be rooted"* — A tree is an abstract undirected graph; rooting is an optional choice of a distinguished vertex.
- *"Adding one edge to a tree creates multiple cycles"* — Adding edge {u,v} creates exactly one cycle (the unique u-v path plus the new edge).

**Learning Objective:** State and prove equivalence of tree characterizations; apply Cayley's formula; construct Prüfer sequences; analyze rooted trees.

---

## 6. Minimum Spanning Trees {#minimum-spanning-tree}

**Concept ID:** `math.graph.minimum-spanning-tree`  
**Prerequisites:** math.disc.spanning-tree  
**Difficulty:** intermediate

A **minimum spanning tree (MST)** of a connected weighted graph minimizes total edge weight among all spanning trees. **Kruskal's algorithm:** greedily add minimum-weight edges (skip if they form a cycle), using Union-Find, in O((|E|+|V|) log |V|) time. **Prim's algorithm:** grow a tree from a seed by always adding the minimum-weight edge leaving the current tree, in O(|E| log |V|) time.

**Key Ideas:**
- Cut property: the minimum-weight edge crossing any cut (S, V∖S) belongs to every MST (if unique).
- Kruskal's and Prim's correctness both follow from the cut property.
- MST non-uniqueness: when edge weights are not all distinct, multiple MSTs can exist.

**Common Misconceptions:**
- *"MST is unique"* — Unique only when all edge weights are distinct.
- *"MST gives shortest pairwise distances"* — MST minimizes total weight; individual path lengths in the MST can exceed direct graph distances.

**Learning Objective:** Define spanning trees and MSTs; state and apply Kruskal's and Prim's algorithms; prove correctness via the cut property.

---

## 7. Shortest Paths {#shortest-path}

**Concept ID:** `math.graph.shortest-path`  
**Prerequisites:** math.graph.graph, math.disc.asymptotic-notation  
**Difficulty:** intermediate

The **shortest path** from s to t in a weighted graph minimizes total edge weight. **Dijkstra's algorithm** solves single-source shortest paths in O((V+E) log V) for non-negative weights. **Bellman-Ford** handles negative weights in O(VE) and detects negative cycles. **Floyd-Warshall** solves all-pairs in O(V³).

**Key Ideas:**
- Optimal substructure: any subpath of a shortest path is itself shortest; enables DP and greedy approaches.
- Dijkstra's correctness relies on non-negative weights (greedy finalization is safe); fails with negative edges.
- Bellman-Ford: V-1 relaxation rounds suffice (shortest paths have at most V-1 edges); a negative cycle is detected if a round V still improves some distance.

**Common Misconceptions:**
- *"Dijkstra's works with negative edges"* — False; negative edges can improve already-finalized vertex distances.
- *"Shortest paths are always unique"* — Multiple weight-minimizing paths can exist; algorithms find one.

**Learning Objective:** Define shortest paths; trace Dijkstra's and Bellman-Ford; prove Dijkstra's correctness; analyze complexities and compare algorithms.

---

## 8. Maximum Flow {#maximum-flow}

**Concept ID:** `math.graph.maximum-flow`  
**Prerequisites:** math.graph.connectivity  
**Difficulty:** advanced

A **flow network** has source s, sink t, and edge capacities. A **maximum flow** maximizes net flow from s to t subject to capacity and conservation constraints. **Max-flow min-cut theorem:** max flow = min cut capacity. **Ford-Fulkerson method:** augment along residual-graph paths; **Edmonds-Karp** (BFS augmentation) runs in O(VE²).

**Key Ideas:**
- Residual graph: encodes remaining capacity on forward edges and reversibility of flow on backward edges.
- Max-flow min-cut theorem: when no augmenting path exists, the reachable set S from s in the residual graph defines a minimum cut.
- Applications: bipartite matching (model as flow: s→Lᵢ→Rⱼ→t with unit capacities), network reliability, image segmentation.

**Common Misconceptions:**
- *"Ford-Fulkerson always runs in polynomial time"* — Polynomial only with BFS augmentation (Edmonds-Karp). Arbitrary path selection can cycle or take exponential time with irrational capacities.
- *"Max flow is unique"* — The value is unique (= min cut); the assignment f(u,v) need not be.

**Learning Objective:** Define flow networks and max flow; state and prove the max-flow min-cut theorem; trace Ford-Fulkerson; apply to bipartite matching.

---

## 9. Matchings {#matching}

**Concept ID:** `math.graph.matching`  
**Prerequisites:** math.graph.graph  
**Difficulty:** intermediate

A **matching** M is a set of pairwise vertex-disjoint edges. A **maximum matching** has the most edges; a **perfect matching** covers all vertices. **Hall's theorem:** bipartite G=(A∪B,E) has a matching covering A iff for all S⊆A, |N(S)|≥|S|. **Berge's theorem:** M is maximum iff no augmenting path exists.

**Key Ideas:**
- Hall's marriage condition: |N(S)|≥|S| for all S⊆A is both necessary and sufficient for a perfect matching covering A.
- Augmenting paths alternate between unmatched and matched edges; one augmentation increases |M| by 1.
- König's theorem (bipartite): max matching size = min vertex cover size.

**Common Misconceptions:**
- *"Perfect matching = maximum matching"* — Perfect implies maximum; maximum need not be perfect (may not cover all vertices).
- *"Hall's theorem applies to non-bipartite graphs"* — Hall's is specific to bipartite graphs; Tutte's theorem handles the general case.

**Learning Objective:** Define matchings and perfect matchings; state and apply Hall's theorem; use augmenting paths to find maximum matchings; state König's theorem.

---

## 10. Eulerian Circuits and Paths {#eulerian-circuit}

**Concept ID:** `math.graph.eulerian-circuit`  
**Prerequisites:** math.disc.euler-hamiltonian  
**Difficulty:** intermediate

An **Eulerian circuit** traverses every edge exactly once and returns to the starting vertex. An **Eulerian path** traverses every edge exactly once without necessarily returning. **Euler's theorem:** a connected graph has an Eulerian circuit iff every vertex has even degree; an Eulerian path (not circuit) iff exactly 2 vertices have odd degree. **Hierholzer's algorithm** constructs Eulerian circuits in O(|E|) time.

**Key Ideas:**
- Euler's theorem: degree parity characterizes Eulerian circuits and paths completely.
- Hierholzer's algorithm: build sub-circuits and splice them together; O(|E|) time.
- Chinese Postman Problem: duplicate minimum-weight edges to make all degrees even, then find Eulerian circuit; minimum duplication found by minimum-weight perfect matching on odd-degree vertices.

**Common Misconceptions:**
- *"Eulerian circuit = Hamiltonian cycle"* — Eulerian traverses every EDGE exactly once; Hamiltonian visits every VERTEX exactly once. Fundamentally different concepts.
- *"All-even degrees + disconnected ⟹ Eulerian circuit"* — Must also be connected (on the subgraph with edges).

**Learning Objective:** State Euler's theorem; prove both directions; apply Hierholzer's algorithm; relate to the Chinese Postman Problem.

---

## 11. Hamiltonian Cycles and Paths {#hamiltonian-cycle}

**Concept ID:** `math.graph.hamiltonian-cycle`  
**Prerequisites:** math.disc.euler-hamiltonian  
**Difficulty:** advanced

A **Hamiltonian cycle** visits every vertex exactly once and returns to the start. A **Hamiltonian path** visits every vertex exactly once. **Dirac's theorem:** if n≥3 and δ(G) ≥ n/2, then G has a Hamiltonian cycle. **Ore's theorem:** if deg(u)+deg(v) ≥ n for all non-adjacent u,v, then G has a Hamiltonian cycle. The Hamiltonian cycle problem is **NP-complete**.

**Key Ideas:**
- Dirac's and Ore's theorems are sufficient conditions, not necessary; many graphs with low minimum degree are Hamiltonian (e.g., Cₙ).
- NP-completeness: no polynomial-time algorithm is known; deciding Hamiltonicity requires global vertex-order consistency.
- Contrast with Eulerianness: Euler = polynomial (degree parity); Hamilton = NP-complete (no simple local condition).

**Common Misconceptions:**
- *"Eulerian circuit and Hamiltonian cycle are the same"* — One covers edges, the other covers vertices; complexity differs fundamentally.
- *"Dirac's condition is necessary"* — It is only sufficient; Cₙ is Hamiltonian with δ=2 ≪ n/2.

**Learning Objective:** Define Hamiltonian cycles and paths; state Dirac's and Ore's theorems with proofs; explain NP-completeness of the Hamiltonian cycle problem and contrast with Eulerian circuits.

---

## 12. Graph Coloring {#graph-coloring}

**Concept ID:** `math.graph.graph-coloring`  
**Prerequisites:** math.disc.graph-coloring  
**Difficulty:** intermediate

A **proper vertex k-coloring** assigns colors {1,...,k} to vertices so no two adjacent vertices share a color; χ(G) is the minimum k. **Brooks' theorem:** χ(G) ≤ Δ(G) for connected G ≠ Kₙ and ≠ odd cycle. **Vizing's theorem:** Δ(G) ≤ χ'(G) ≤ Δ(G)+1 for the chromatic index. **Four-color theorem:** every planar graph is 4-colorable.

**Key Ideas:**
- Brooks' theorem: χ ≤ Δ with exceptions Kₙ (χ = n = Δ+1) and odd cycles (χ = 3 = Δ+1 = 3).
- Vizing's theorem: edge chromatic number is either Δ (Class 1) or Δ+1 (Class 2); determining class is NP-complete.
- Four-color theorem (Appel-Haken 1976): first major computer-assisted proof; every planar graph is 4-colorable.

**Common Misconceptions:**
- *"χ(G) = ω(G) always"* — Mycielski's construction gives triangle-free graphs with χ → ∞.
- *"Greedy coloring gives χ(G)"* — Greedy is order-dependent and may use Δ+1 colors; optimal ordering is NP-hard.

**Learning Objective:** Define proper vertex and edge colorings; state Brooks' and Vizing's theorems; apply greedy coloring; prove 2-colorability ↔ bipartiteness.

---

## 13. Algebraic Graph Theory {#algebraic-graph-theory}

**Concept ID:** `math.graph.algebraic-graph-theory`  
**Prerequisites:** math.graph.graph, math.linalg.eigenvalues  
**Difficulty:** advanced

**Algebraic graph theory** studies graphs via linear algebra. The **adjacency matrix** A has A_{ij}=1 iff {i,j}∈E. The **Laplacian** L = D−A (D = degree matrix) is positive semidefinite with 0 as an eigenvalue (multiplicity = number of connected components). The **matrix-tree theorem:** τ(G) = (1/n)·λ₂·λ₃·...·λₙ where λᵢ are Laplacian eigenvalues.

**Key Ideas:**
- Laplacian eigenvalues: 0 always eigenvalue; λ₂ (Fiedler value) > 0 iff G connected; λ₂ measures expansion/algebraic connectivity.
- Spectrum of A: bipartite iff spectrum symmetric about 0; k-regular iff max eigenvalue = k.
- Matrix-tree theorem: connects algebraic (eigenvalues) to combinatorial (spanning tree count) structure.

**Common Misconceptions:**
- *"Spectrum of A determines G up to isomorphism"* — Co-spectral non-isomorphic graphs exist (e.g., C₄ ∪ K₁ and K_{1,4} have the same adjacency spectrum).
- *"L is always full rank"* — rank(L) ≤ n−1 always; rank(L) = n−1 iff G connected.

**Learning Objective:** Construct adjacency matrix and Laplacian; compute eigenvalues and relate to connectivity/bipartiteness; apply the matrix-tree theorem.

---

## 14. Ramsey Theory {#ramsey-theory}

**Concept ID:** `math.graph.ramsey-theory`  
**Prerequisites:** math.disc.pigeonhole, math.graph.graph  
**Difficulty:** advanced

**Ramsey's theorem:** for all s,t ≥ 1, there exists R(s,t) such that every 2-coloring of K_{R(s,t)} contains a red K_s or blue K_t. Key values: R(3,3)=6, R(3,4)=9, R(4,4)=18. The **probabilistic method (Erdős)** proves R(k,k) > 2^{k/2}. The recursion R(s,t) ≤ R(s-1,t)+R(s,t-1) bounds R(s,t) ≤ C(s+t-2, s-1).

**Key Ideas:**
- Pigeonhole argument for R(3,3)=6: any vertex in K₆ has ≥3 edges of one color; the monochromatic neighbors form a triangle or a monochromatic edge completes one.
- Probabilistic lower bound: random 2-coloring of K_n with n=2^{k/2} has P(monochromatic K_k) < 1 by union bound, so a good coloring exists.
- Most Ramsey numbers R(s,t) for s,t ≥ 5 are unknown; R(5,5) ∈ [43,48].

**Common Misconceptions:**
- *"Ramsey numbers are easy to compute"* — Even R(5,5) is unknown; computation is extraordinarily hard.
- *"Ramsey's theorem applies only to complete graphs"* — The general theorem applies to any pair of graphs G, H.

**Learning Objective:** State Ramsey's theorem; prove R(3,3)=6; prove the recursion R(s,t) ≤ R(s-1,t)+R(s,t-1); apply the probabilistic lower bound for R(k,k).

---

## 15. Extremal Graph Theory {#extremal-graph-theory}

**Concept ID:** `math.graph.extremal-graph-theory`  
**Prerequisites:** math.graph.graph, math.disc.combinatorics  
**Difficulty:** advanced

**Extremal graph theory** maximizes |E(G)| subject to a forbidden subgraph. **Turán's theorem:** ex(n, K_{r+1}) = |E(T(n,r))| where T(n,r) is the complete r-partite graph with balanced parts; T(n,r) is the unique extremal graph. **Kővári-Sós-Turán theorem:** ex(n, K_{s,t}) ≤ O(n^{2-1/s}) for s ≤ t.

**Key Ideas:**
- Turán graph T(n,r): balanced complete r-partite on n vertices; parts of size ⌊n/r⌋ or ⌈n/r⌉; unique K_{r+1}-free graph attaining ex(n, K_{r+1}).
- Turán density π(H) = lim ex(n,H)/C(n,2); for K_{r+1}: π = (r-1)/r; for bipartite H: π = 0.
- Zykov symmetrization: replacing non-adjacent vertices by copies preserves K_{r+1}-free and increases edges, converging to Turán graph.

**Common Misconceptions:**
- *"T(n,r) is not the unique extremal graph"* — T(n,r) IS unique (part of the strength of Turán's theorem).
- *"Extremal graph theory only concerns complete graphs"* — ex(n,H) is studied for any graph H (cycles, paths, bipartite graphs, etc.).

**Learning Objective:** State Turán's theorem; compute ex(n, K_{r+1}) and describe T(n,r); prove Turán's bound using Zykov symmetrization; state the Kővári-Sós-Turán theorem.

---

## 16. Random Graphs {#random-graph}

**Concept ID:** `math.graph.random-graph`  
**Prerequisites:** math.graph.graph, math.prob.probability-axioms  
**Difficulty:** advanced

The **Erdős-Rényi random graph** G(n,p) includes each edge independently with probability p. G(n,m) is a uniformly random graph with m edges. **Sharp thresholds:** connectivity threshold p* = log(n)/n; giant component emerges at p = 1/n (phase transition). The **probabilistic method** proves existence of graphs with specified properties by showing P(property holds) > 0.

**Key Ideas:**
- Phase transition at p = 1/n: for p = c/n with c < 1, components have O(log n) vertices; c > 1 gives a giant component of size Θ(n).
- Connectivity threshold: G(n,p) connected w.h.p. when p ≫ log(n)/n; disconnected w.h.p. when p ≪ log(n)/n.
- Probabilistic method: random construction + union bound shows P(bad event) < 1, hence a good object exists (non-constructive).

**Common Misconceptions:**
- *"G(n,p) is connected for large n"* — Connected only above the threshold p* = log(n)/n; for p = 1/n, isolated vertices exist w.h.p.
- *"Probabilistic method gives explicit constructions"* — It proves existence; derandomization is needed for explicit examples.

**Learning Objective:** Define G(n,p) and G(n,m); state the connectivity threshold and giant component phase transition; apply the probabilistic method to prove lower bounds.

---

*End of chapter — math.graph (Graph Theory), 16 concepts.*
