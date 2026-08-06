# Blueprint: math.disc.graph-representation

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.graph-representation |
| name | Graph Representation |
| Domain | math.disc |
| Difficulty | developing |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.disc.graph, math.linalg.matrix |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student represents graphs using adjacency matrices, incidence matrices, and adjacency lists; converts among these representations; reads structural properties (degree, adjacency, connectivity) from each representation; computes matrix powers to count walks; and selects the appropriate representation for a given algorithmic task (dense graph → adjacency matrix; sparse graph → adjacency list).

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a 4-vertex graph with edges {1-2, 1-3, 2-3, 2-4} and beside it three representations: (1) Adjacency matrix: 4×4 with 1s at positions (1,2),(1,3),(2,1),(2,3),(3,1),(3,2),(2,4),(4,2); (2) Adjacency list: 1:[2,3], 2:[1,3,4], 3:[1,2], 4:[2]; (3) Incidence matrix: 4 rows (vertices) × 4 columns (edges), 1 at row v if v is an endpoint of edge e; annotate: "Three different ways to store the SAME graph — same information, different access patterns")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ADJACENCY-MATRIX-IS-ALWAYS-SYMMETRIC | Student assumes the adjacency matrix of a digraph is symmetric; applies symmetric-matrix properties (e.g., A = Aᵀ) to directed graphs; misses that for digraphs Aᵢⱼ=1 means edge i→j exists, which does NOT imply Aⱼᵢ=1 (edge j→i) | Type 5 — instruction-induced (undirected graphs are always presented first; their adjacency matrix IS symmetric; when digraphs are introduced, the asymmetry of the matrix is underemphasised, leaving students with the residual assumption of symmetry) |
| MC-2 | MATRIX-POWER-Aᵏ-COUNTS-PATHS | Student thinks the (i,j) entry of Aᵏ counts the number of simple PATHS of length k from i to j; in reality it counts WALKS of length k (vertex repetitions allowed); for k=2, A²[i,i] counts closed walks of length 2 (equals deg(i) for simple graphs), not the number of simple cycles | Type 5 — instruction-induced (the statement "A² counts walks" is correct; the phrase "walk" is often loosely called "path" in early courses; students then carry the confusion into algorithms and derive wrong counts for simple paths, which is actually NP-hard to count) |
| MC-3 | ADJACENCY-LIST-IS-JUST-A-LIST | Student treats the adjacency list as merely a compact way to write down edges; misses that it is a specific data structure — typically an array of linked lists or hash sets — where the algorithmic consequence is O(1) adjacency check with careful implementation and O(deg(v)) iteration over neighbours, making it optimal for sparse graphs in BFS/DFS | Type 3 — language contamination ("list" in everyday language is just an enumeration; in algorithm design, "adjacency list" is a specific data structure with distinct O-notation guarantees: space O(V+E), adjacency check O(deg(v)) vs. adjacency matrix's O(1) adjacency but O(V²) space) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Adjacency matrix and incidence matrix:**

**Adjacency matrix A (undirected):** n×n matrix with Aᵢⱼ = 1 if {i,j}∈E, else 0. Symmetric (Aᵢⱼ=Aⱼᵢ). Diagonal: Aᵢᵢ=0 for simple graph (=1 for loops). Row sum = deg(v).

**Adjacency matrix (directed):** Aᵢⱼ = 1 if directed edge i→j exists; NOT generally symmetric.

**Counting walks via matrix powers:** The (i,j) entry of Aᵏ equals the number of WALKS of length k from vertex i to vertex j (walks allow repeated vertices/edges). Proof by induction: Aᵏ[i,j] = Σₗ Aᵏ⁻¹[i,l]·A[l,j] = Σₗ (walks of length k−1 from i to l) × (is l adjacent to j) = walks of length k from i to j.

**Incidence matrix B:** n×m matrix (n vertices, m edges). Bᵢₑ = 1 if vertex i is an endpoint of edge e. For undirected: each column has exactly two 1s (endpoints). Row sum = deg(v). Note: BBᵀ = degree matrix + adjacency matrix (D + A in spectral graph theory).

**Worked example:**
G: vertices {1,2,3,4}, edges {1-2, 2-3, 3-4, 4-1} (cycle C₄).
A = [[0,1,0,1],[1,0,1,0],[0,1,0,1],[1,0,1,0]]. Symmetric, each row sums to 2.
A² = [[2,0,2,0],[0,2,0,2],[2,0,2,0],[0,2,0,2]]. A²[1,1]=2 (two walks of length 2 from 1 back to 1: 1→2→1 and 1→4→1). A²[1,3]=2 (two walks of length 2: 1→2→3 and 1→4→3).

**P49 checkpoint:**
- CORRECT → "A: n×n, Aᵢⱼ=1 iff adjacent, symmetric for undirected. Aᵏ[i,j] counts walks of length k. B: incidence matrix, each column = one edge's endpoints." → A02
- PARTIAL (MC-2: matrix power counts paths) → "Aᵏ[i,j] counts WALKS of length k — walks allow revisiting vertices and edges. A 'walk' is NOT the same as a 'path' (which forbids repetitions). For k=2: A²[i,i] = Σⱼ A[i,j]·A[j,i] = Σⱼ A²[i,j] = deg(i) (counts walks i→j→i for each neighbour j). This counts closed walks of length 2, not triangles. Counting simple paths of a given length is NP-hard in general — Aᵏ does NOT solve this." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "For K₃ (triangle, vertices 1,2,3): A=[[0,1,1],[1,0,1],[1,1,0]]. A²=[[2,1,1],[1,2,1],[1,1,2]]. A²[1,1]=2 (walks: 1→2→1 and 1→3→1). A³[1,1] = ? Row 1 of A²: [2,1,1]. Column 1 of A: [0,1,1]. A³[1,1]=0·2+1·1+1·1=2. Walks of length 3 from 1 back to 1: 1→2→3→1 and 1→3→2→1. 2 closed walks of length 3." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Adjacency list and representation selection:**

**Adjacency list:** array Adj of size |V|; Adj[v] = list of all neighbours of v.
Space: O(V + E) (sum of all degrees = 2E).
Check if {u,v}∈E: O(deg(u)).
Iterate neighbours of v: O(deg(v)).

**Comparison table:**

| Operation | Adjacency Matrix | Adjacency List |
|-----------|-----------------|---------------|
| Space | O(V²) | O(V + E) |
| Check edge {u,v} | O(1) | O(deg(u)) |
| Iterate all edges | O(V²) | O(V + E) |
| Iterate neighbours(v) | O(V) | O(deg(v)) |

**Selection rule:**
- Dense graph (E ≈ V²): adjacency matrix (fast edge check, space not wasted).
- Sparse graph (E ≪ V²): adjacency list (space O(V+E), BFS/DFS run in O(V+E)).

**Spectral graph theory (preview):**
Laplacian matrix: L = D − A, where D is the diagonal degree matrix. L is positive semi-definite. The second-smallest eigenvalue λ₂ (algebraic connectivity / Fiedler value) measures connectivity: λ₂ > 0 iff G is connected.

**P49 checkpoint:**
- CORRECT → "Adjacency list: space O(V+E), edge check O(deg). Matrix: O(V²) space, O(1) edge check. Dense: matrix. Sparse: list. Laplacian L=D−A: λ₂>0 iff connected." → Gate (P91)
- PARTIAL (MC-1: digraph matrix is symmetric) → "For a DIRECTED graph, A[i][j] = 1 means edge i→j; A[j][i] = 1 means edge j→i — these are INDEPENDENT. An asymmetric adjacency matrix is the rule for digraphs, not the exception. The only digraph with a symmetric adjacency matrix is one where every directed edge is paired with its reverse (a symmetric digraph, which is essentially an undirected graph stored as two antiparallel directed edges). Never assume symmetry for a digraph without checking." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Path graph P₄: 1−2−3−4. A=[0100|1010|0101|0010]. A²[1,3]=1 (walk 1→2→3). A²[1,1]=1 (walk 1→2→1). Adjacency list: 1:[2], 2:[1,3], 3:[2,4], 4:[3]. Space: 4+4=8 entries total. Compare adjacency matrix: 16 entries (4×4)." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 + MC-3 combined):**
Step 1 — "Walk vs. path: a WALK from u to v of length k is a sequence u=v₀,v₁,…,vₖ=v where each consecutive pair is adjacent. NO restriction on repetitions — v₀=v₂ is allowed. A PATH additionally requires all vertices to be distinct. The matrix power Aᵏ counts walks, not paths. For k small (≤3) these often coincide for particular (i,j) pairs by coincidence — but for k=4 in C₄, A⁴[1,1]=6, which counts walks including 1→2→1→2→1 (not a path)."
Step 2 — "Adjacency list data structure: the standard implementation is an array of size V, where each entry is a pointer to a linked list (or a resizable array) of neighbours. Insert edge: O(1) amortized. Check edge: O(deg(v)). Most BFS and DFS implementations run in O(V+E) because they iterate each adjacency list once."
Step 3 — "Why dense vs. sparse matters: the US road network has ~10⁷ vertices and ~10⁷ edges (E≈V, very sparse). Its adjacency matrix would need 10¹⁴ entries — more than any computer can store. The adjacency list needs 10⁷ entries. For dense graphs (social network of 10³ users where everyone knows 900 others, E≈V²), the adjacency matrix wastes no space and gives O(1) lookups that pay off."

**TB-R02 (MC-1 SYMMETRIC DIGRAPH):**
Step 1 — "The adjacency matrix definition for a digraph: A[i][j] = 1 iff the directed edge from i to j exists. For undirected graphs, {i,j}={j,i} forces A[i][j]=A[j][i]=1 always — the symmetry is definitional, not a theorem. For digraphs, edge i→j and edge j→i are DIFFERENT objects; A[i][j] and A[j][i] are independently 0 or 1."
Step 2 — "Test with an example: triangle with edges 1→2, 2→3, 3→1 (directed cycle). A=[[0,1,0],[0,0,1],[1,0,0]]. Is A symmetric? A[1][3]=0, A[3][1]=1 — NOT equal → NOT symmetric. The transpose Aᵀ represents the graph with all edges reversed."
Step 3 — "When is a digraph's matrix symmetric? Only when for every edge i→j, the edge j→i also exists — i.e., the digraph is SYMMETRIC. Symmetric digraphs are equivalent to undirected graphs (replace each pair of antiparallel edges by one undirected edge). If you encounter a symmetric adjacency matrix for a supposed directed graph, check whether the underlying graph is actually undirected."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Given the adjacency matrix A of K₄, compute A² and A³. Identify what the diagonal entries of A² and A³ represent (in terms of walks). How many triangles does K₄ contain? (Hint: triangles = Tr(A³)/6.)
2. Draw the graph represented by the adjacency list: 1:[2,4], 2:[1,3], 3:[2,4,5], 4:[1,3], 5:[3]. Write its adjacency matrix and compute its number of edges. Is it bipartite?
3. A graph G has V=1,000,000 vertices and E=3,000,000 edges (sparse). A graph H has V=1,000 vertices and E=400,000 edges (dense, E≈V²/2.5). For each, which representation is more space-efficient? By what factor?
4. For the directed graph with 4 vertices and edges {1→2, 2→3, 3→4, 4→1, 1→3}: write the adjacency matrix A. Compute A²[1,3]. Verify by listing all walks of length 2 from vertex 1 to vertex 3.
5. Write the incidence matrix B for the graph with vertices {a,b,c,d} and edges {e₁=ab, e₂=bc, e₃=cd, e₄=da, e₅=ac}. Compute BBᵀ and interpret its entries.

**P55 — Reflect & Consolidate:** "Adjacency matrix: O(V²) space, O(1) edge check, symmetric for undirected, Aᵏ[i,j]=walks of length k. Incidence matrix: V×E, each column = edge endpoints. Adjacency list: O(V+E) space, O(deg) edge check, optimal for BFS/DFS on sparse graphs. Choose: dense→matrix, sparse→list."

**P76 — Transfer Probe (Independence mode):**
(a) Spectral graph theory: the eigenvalues of the adjacency matrix A of a d-regular graph lie in [−d, d] with d the largest eigenvalue. The number of closed walks of length k is Tr(Aᵏ) = Σᵢ λᵢᵏ. For a d-regular bipartite graph, −d is also an eigenvalue. Use this to show: a d-regular graph is bipartite iff −d is an eigenvalue of A. (b) The Laplacian L=D−A: prove that the number of spanning trees of G equals any cofactor of L (Matrix-Tree Theorem / Kirchhoff). For Kₙ: all eigenvalues of L are 0 (once) and n (n−1 times), giving τ(Kₙ)=n^{n−2} (Cayley's formula via the Matrix-Tree Theorem). (c) Compressed graph representations for massive graphs: in the WebGraph model (used for the web graph with billions of vertices), vertices are ordered and neighbourhoods are encoded as sorted difference lists (delta-encoded integers) with reference compression (copy common sub-lists from nearby vertices). Estimate the bits-per-edge for a scale-free graph (power-law degree distribution) under this scheme vs. a plain adjacency list.

**P75 — Mastery Assessment:**
"(a) Given the matrix A = [[0,1,1,0],[1,0,1,1],[1,1,0,1],[0,1,1,0]], draw the corresponding graph, compute its degree sequence, and determine whether it is bipartite. (b) For the graph in (a), compute A² and use the diagonal to find the degree sequence (verify against your drawing). (c) A directed graph has adjacency matrix A = [[0,1,0],[0,0,1],[1,0,0]]. Compute A³ and explain what A³[1,1] represents. What is the period of this directed graph? (d) Compare the space and time complexity of BFS on a graph with V=10⁶ vertices and E=10⁷ edges using (i) adjacency matrix, (ii) adjacency list. Which would you choose, and why?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW matrix power walk-counting and the directed/undirected symmetry distinction
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.graph or math.linalg.matrix; reassign

**P78 — Completion:** Graph Representation certified. Student constructs adjacency matrices, incidence matrices, and adjacency lists for undirected and directed graphs; interprets matrix powers as walk counts; selects representations based on density and algorithmic requirements; and applies the diagonal walk-counting identity to compute graph properties.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Spectral graph theory and eigenvalues; Matrix-Tree Theorem; WebGraph compressed representations
Skill tested: Connect concrete graph representations to spectral properties and large-scale computational graph models

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
