# Teaching Blueprint: Graph Representation (`math.disc.graph-representation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.graph-representation` |
| name | Graph Representation |
| domain | Discrete Mathematics |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.disc.graph`, `math.linalg.matrix` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — a drawn graph before its matrix/list encodings |
| description (KG) | Adjacency matrix: A_{ij}=1 iff (i,j)∈E. Adjacency list: list of neighbors for each vertex. Incidence matrix: rows=vertices, columns=edges. Matrix representation enables algebraic graph theory.

 |

## Component 1 — Learning Objectives

- LO1: Construct the ADJACENCY MATRIX for a given graph, and read a graph's edges directly from a given adjacency matrix.
- LO2: Construct the ADJACENCY LIST for a given graph, and compare its structure to the adjacency matrix for the same graph.
- LO3: Construct the INCIDENCE MATRIX for a given graph (rows = vertices, columns = edges), and correctly interpret its entries.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph` (vertices and edges) and `math.linalg.matrix` (matrix structure and indexing this concept applies).

## Component 3 — Core Explanation

Graphs can be represented computationally/algebraically in several standard ways:

- **Adjacency matrix**: an $n\times n$ matrix $A$ (for $n$ vertices) with $A_{ij}=1$ if vertices $i,j$ are connected by an edge, $0$ otherwise. For an UNDIRECTED graph, this matrix is symmetric ($A_{ij}=A_{ji}$).
- **Adjacency list**: for each vertex, a list of its neighboring vertices — often more space-efficient than the adjacency matrix for SPARSE graphs (few edges relative to the maximum possible).
- **Incidence matrix**: rows indexed by vertices, columns indexed by EDGES; entry is $1$ if the vertex is an endpoint of that edge, $0$ otherwise (for undirected graphs; directed graphs use $+1$/$-1$ to distinguish source/target).

Each representation captures the same underlying graph but suits different computational purposes — matrix representations in particular enable ALGEBRAIC graph theory (using linear algebra techniques like eigenvalues to study graph structure).

## Component 4 — Worked Examples

**Example 1 (LO1 — adjacency matrix, breaking MC-1)**: A graph with vertices $\{1,2,3\}$ and edges $\{1,2\}$, $\{2,3\}$ has adjacency matrix $A=\begin{pmatrix}0&1&0\\1&0&1\\0&1&0\end{pmatrix}$. Note the DIAGONAL entries are all $0$ (a simple graph has no self-loops) and the matrix is SYMMETRIC (since the graph is undirected — an edge $\{1,2\}$ means BOTH $A_{12}=1$ AND $A_{21}=1$). A common error fills only the "upper triangle" (e.g. setting $A_{12}=1$ but leaving $A_{21}=0$), failing to recognize that an undirected edge must be recorded symmetrically in both positions.

**Example 2 (LO2 — adjacency list for the same graph)**: For the same graph as Example 1, the adjacency list is: vertex $1\to[2]$; vertex $2\to[1,3]$; vertex $3\to[2]$ — each vertex's list contains exactly its neighbors, matching the adjacency matrix's nonzero row entries but stored more compactly (no need to store the many zero entries a sparse graph's matrix would contain).

**Example 3 (LO3 — incidence matrix, breaking MC-2)**: For the same graph with edges labeled $e_1=\{1,2\}$, $e_2=\{2,3\}$, the incidence matrix is $M=\begin{pmatrix}1&0\\1&1\\0&1\end{pmatrix}$ (rows = vertices 1,2,3; columns = edges $e_1,e_2$). Vertex $2$'s row has TWO 1's (it is an endpoint of BOTH edges) — this is DIFFERENT from the adjacency matrix, where each row's entries indicate connections to OTHER VERTICES, not incidences with EDGES. A common error confuses the incidence matrix's dimensions with the adjacency matrix's (expecting an $n\times n$ square matrix), when the incidence matrix is generally $n\times m$ (vertices × edges, not necessarily square).

## Component 5 — Teaching Actions

### Teaching Action A01 — Adjacency Matrix Is Symmetric for Undirected Graphs (Primitive P64: Conceptual Shift)

Work Example 1 in full, drawing the graph first, then filling the matrix cell by cell, explicitly checking BOTH $A_{ij}$ and $A_{ji}$ for each edge to reinforce the symmetry requirement.

- **MC-1 hook**: present a new small graph and check whether both symmetric positions are filled for each edge (revealing MC-1: filling only one of the two symmetric positions for an undirected edge).

### Teaching Action A02 — Three Representations of the Same Graph, Side by Side (Primitive P06: Contrast Pair)

Display Examples 1, 2, and 3's three representations of the SAME underlying graph side by side, explicitly contrasting the incidence matrix's vertex-by-EDGE structure (generally non-square) against the adjacency matrix's vertex-by-vertex structure (always square). State the rule: "the adjacency matrix relates vertices to vertices; the incidence matrix relates vertices to edges — check which axis each representation's rows and columns actually index."

- **MC-2 hook**: this contrast directly targets MC-2 (confusing incidence and adjacency matrix dimensions/structure).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Construct the adjacency matrix for a graph with vertices $\{1,2,3,4\}$ and edges $\{1,2\},\{1,3\},\{2,4\}$.
  2. Construct the adjacency list for the same graph.
  3. Construct the incidence matrix for the same graph, labeling edges $e_1,e_2,e_3$ in the order given.
  4. Given an adjacency matrix, determine whether the represented graph is undirected by checking a specific structural property.
- **P76 (Transfer Probe, mode = independence)**: "A social network app stores friendship connections among 5 users. (a) Given the friendship pairs $\{A,B\},\{B,C\},\{C,D\},\{D,E\},\{A,E\}$ (forming a 5-cycle), construct the adjacency matrix. (b) The app's engineers are deciding between storing this data as an adjacency matrix or an adjacency list for a network that will eventually have millions of users but each user only has a few hundred friends (a very SPARSE graph). Explain, using this lesson's efficiency comparison, which representation would be more space-efficient at that scale, and why."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ADJACENCY-MATRIX-FILLED-ASYMMETRICALLY | Filling only one of the two symmetric positions ($A_{ij}$ or $A_{ji}$) for an undirected edge, breaking the matrix's required symmetry | Foundational |
| MC-2 | INCIDENCE-MATRIX-CONFUSED-WITH-ADJACENCY-MATRIX | Expecting the incidence matrix to be square (vertex-by-vertex) like the adjacency matrix, rather than vertex-by-edge (generally non-square) | Foundational |
| MC-3 | ADJACENCY-LIST-OMITS-A-NEIGHBOR | Constructing an adjacency list that misses one or more of a vertex's actual neighbors, an incomplete-enumeration error | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Adjacency Matrix Filled Asymmetrically") → P41 (detect: review a submitted adjacency matrix for a broken symmetric pair) → P64 (conceptual shift: re-derive by explicitly stating "an undirected edge $\{i,j\}$ sets BOTH $A_{ij}=1$ AND $A_{ji}=1$" and re-checking every edge against this rule).
- **B02 (targets MC-2)**: P27 ("Incidence Matrix Confused with Adjacency Matrix") → P41 (detect: present Example 3 and check whether the submitted incidence matrix is incorrectly forced into a square, vertex-by-vertex shape) → P64 (conceptual shift: re-derive by explicitly labeling the incidence matrix's columns as EDGES (not vertices), confirming the dimensions vertices × edges).
- **B03 (targets MC-3)**: P27 ("Adjacency List Omits a Neighbor") → P41 (detect: cross-check a submitted adjacency list against the corresponding adjacency matrix's nonzero entries for a missing neighbor) → P64 (conceptual shift: re-derive the adjacency list systematically, scanning each vertex's full row in the adjacency matrix to ensure every neighbor is captured).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph`, `math.linalg.matrix`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared; enables later algebraic graph theory (eigenvalue-based graph analysis) not covered in this batch.

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that constructing each representation is procedurally simple once the graph is drawn, with the genuine complexity in correctly distinguishing the three representations' differing structures.
- MC-2 was ranked most severe alongside MC-1 because the incidence matrix's non-square, edge-indexed structure is the single most conceptually distinct feature among the three representations, and conflating it with the more familiar adjacency matrix undermines its entire purpose.
- The social-network transfer probe's part (b) was deliberately designed around a genuine practical engineering tradeoff (sparse-graph storage efficiency) to motivate WHY multiple representations exist at all, rather than presenting them as interchangeable notational choices with no practical consequence.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.graph`, `math.linalg.matrix`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: drawn graph before matrix/list encodings) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
