# math.disc.graph-representation

## Identity
- **KG id**: `math.disc.graph-representation`
- **Domain**: math.disc
- **Requires**: `math.disc.graph`, `math.linalg.matrix`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Represent graphs using adjacency matrices, incidence matrices, and adjacency lists, reusing
`math.disc.graph`'s own vertex/edge structure and `math.linalg.matrix`'s own $(i,j)$-indexed grid;
convert among these representations; read structural properties (degree, adjacency, connectivity)
from each; compute matrix powers to count walks; and select the appropriate representation for a
given algorithmic task (dense graph → adjacency matrix; sparse graph → adjacency list).

## Core Understanding
The SAME graph can be stored in structurally different ways, each trading off space and access
speed differently — reusing `math.linalg.matrix`'s own $(i,j)$-indexed grid structure directly.
The ADJACENCY MATRIX $A$ is an $n\times n$ matrix with $A_{ij}=1$ if edge $\{i,j\}$ exists, else
$0$; for an UNDIRECTED graph this is symmetric ($A_{ij}=A_{ji}$) by definition, but for a DIRECTED
graph, $A_{ij}=1$ (edge $i\to j$) and $A_{ji}$ are entirely INDEPENDENT — a directed graph's matrix
is asymmetric as a rule, not an exception. The INCIDENCE MATRIX $B$ is $n\times m$ (vertices ×
edges), with $B_{ie}=1$ if vertex $i$ is an endpoint of edge $e$; each column has exactly two 1s
for an undirected graph. The ADJACENCY LIST is a genuinely different DATA STRUCTURE — an array of
size $|V|$ where each entry holds a list of that vertex's neighbours — not merely a compact
notation for the same information.

Matrix POWERS carry real structural meaning: the $(i,j)$ entry of $A^k$ equals the number of
WALKS of length $k$ from vertex $i$ to vertex $j$ — a walk allows REPEATED vertices and edges,
which is a genuinely weaker notion than a PATH (which forbids repetition). This distinction
matters because $A^k$ counting walks is a fast, purely algebraic computation, while counting
SIMPLE PATHS of a given length is NP-hard in general — the two problems only coincide by accident
for small $k$ or special graphs.

Choosing a representation is a genuine algorithmic decision, not a stylistic one: the adjacency
matrix costs $O(V^2)$ space but gives $O(1)$ edge lookup, making it efficient for DENSE graphs
($E\approx V^2$); the adjacency list costs $O(V+E)$ space with $O(\deg(v))$ neighbour iteration,
making it efficient for SPARSE graphs ($E\ll V^2$), where BFS/DFS run in $O(V+E)$ overall.

## Mental Models
- **"Same graph, three storage formats — the information is identical, the access pattern is
  not."**
- **"$A^k[i,j]$ counts WALKS, which allow repeats — never confuse this with counting simple
  PATHS, which forbid them."**
- **"Dense graph, matrix; sparse graph, list — the choice is a space-versus-lookup-speed trade,
  not a preference."**

## Why Students Fail

### MC-1: ADJACENCY-MATRIX-IS-ALWAYS-SYMMETRIC
- **Surface form**: assumes the adjacency matrix of a digraph is symmetric; applies
  symmetric-matrix properties (e.g. $A=A^T$) to directed graphs.
- **Frequency band**: not stated in the Blueprint (adopted as given).
- **Root cause (Type 5, instruction-induced)**: undirected graphs are always presented first, and
  their adjacency matrix genuinely IS symmetric; when digraphs are introduced, the resulting
  asymmetry of the matrix is often underemphasized, leaving the residual assumption of symmetry
  intact.
- **Repair**: test a specific directed cycle explicitly (e.g. $1\to2\to3\to1$) and confirm
  $A_{13}\ne A_{31}$ directly, establishing that symmetry holds ONLY for a "symmetric digraph"
  (every edge paired with its reverse), which is equivalent to an undirected graph in disguise.

### MC-2: MATRIX-POWER-Aᵏ-COUNTS-PATHS
- **Surface form**: thinks the $(i,j)$ entry of $A^k$ counts simple PATHS of length $k$ from $i$
  to $j$, rather than WALKS (which allow vertex repetition).
- **Frequency band**: not stated in the Blueprint (adopted as given).
- **Root cause (Type 5, instruction-induced)**: the statement "$A^k$ counts walks" is correct, but
  the word "walk" is often loosely called "path" in early, informal treatments, and that
  terminological looseness is carried forward into a genuine mathematical confusion once the
  precise distinction (paths forbid repetition, walks don't) actually matters.
- **Repair**: compute $A^2$ for a triangle and show $A^2[1,1]=2$ counts the two CLOSED WALKS
  $1\to2\to1$ and $1\to3\to1$ — a diagonal entry that could never represent a "path" back to the
  same vertex, since a path by definition has distinct endpoints unless it is a trivial
  zero-length walk.

### MC-3: ADJACENCY-LIST-IS-JUST-A-LIST
- **Surface form**: treats the adjacency list as merely a compact way to write down edges, missing
  that it is a specific DATA STRUCTURE with its own complexity guarantees.
- **Frequency band**: not stated in the Blueprint (adopted as given).
- **Root cause (Type 3, language contamination)**: "list" in everyday language means a simple
  enumeration, but in algorithm design "adjacency list" names a specific implementation (typically
  an array of linked lists or hash sets) with distinct Big-O guarantees — the everyday sense of the
  word actively obscures the algorithmic content the term is meant to convey.
- **Repair**: contrast the adjacency list's $O(V+E)$ space and $O(\deg(v))$ neighbour iteration
  against the adjacency matrix's $O(V^2)$ space and $O(1)$ lookup on a concrete large-sparse-graph
  example (a road network with $10^7$ vertices and $10^7$ edges), showing the matrix would require
  more storage than exists.

## Misconceptions

### MC-1: ADJACENCY-MATRIX-IS-ALWAYS-SYMMETRIC
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: MATRIX-POWER-Aᵏ-COUNTS-PATHS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: ADJACENCY-LIST-IS-JUST-A-LIST
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A city's road network stored three ways: a full distance grid between every pair of
  intersections (matrix, wasteful for a sparse road system), a table of which roads touch which
  intersections (incidence), or each intersection's own list of directly connected streets
  (adjacency list, efficient for exactly this sparse case)."**
- **Anti-analogy**: an adjacency LIST is NOT just an informal way of writing down edges — it is a
  specific array-of-lists data structure with its own $O(\deg(v))$ access guarantee, distinct from
  simply listing edge pairs on paper.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: build the adjacency matrix for the directed cycle
  $1\to2\to3\to1$ and confirm $A_{13}=0$ while $A_{31}=1$ — genuinely asymmetric.
- **Demonstration 2 (targets MC-2)**: compute $A^2$ for the 4-cycle $C_4$ and confirm
  $A^2[1,1]=2$ counts the two closed walks of length 2, contrasting against the (nonsensical for
  this entry) idea of a length-2 "path" returning to its own start.
- **Demonstration 3 (targets MC-3)**: compare the storage requirement of the adjacency matrix
  ($10^{14}$ entries) against the adjacency list ($10^7$ entries) for a real-scale sparse road
  network, making the data-structure distinction concrete rather than notational.

## Discovery Questions
1. "For a directed graph, if $A_{ij}=1$ (an edge from $i$ to $j$ exists), does that guarantee
   $A_{ji}=1$ as well?"
2. "Does $A^k[i,j]$ count routes that are allowed to revisit a vertex, or only routes that never
   repeat a vertex?"
3. "For a graph with a million vertices but only a few edges per vertex, would a full grid of all
   pairs, or a per-vertex list of actual neighbours, use less memory?"

## Teaching Sequence
1. **Anchor**: connect to `math.disc.graph`'s own vertex/edge structure and `math.linalg.matrix`'s
   own $(i,j)$-indexed grid, framing the adjacency matrix as a direct application of both.
2. **Conflict evidence**: the directed-cycle asymmetry example, breaking the symmetric-matrix
   assumption directly.
3. **Contrast pair**: walks (repetition allowed) versus paths (repetition forbidden), and the
   adjacency matrix's $O(V^2)$/$O(1)$ trade-off versus the adjacency list's $O(V+E)$/$O(\deg(v))$
   trade-off.
4. **Mastery gate**: require constructing all three representations for a given graph, computing
   matrix powers to count walks, and selecting the appropriate representation for a stated density
   scenario, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a directed graph's adjacency matrix as symmetric without the learner explicitly
  checking at least one asymmetric entry pair.
- When a learner reports a matrix-power entry as counting "paths," require them to state whether
  vertex repetition is allowed in the count.

## Voice Teaching Notes
- Say "check both directions" whenever a learner assumes a digraph's adjacency matrix is
  symmetric.
- When a learner conflates walks with paths, ask "could this route revisit a vertex, or not?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs an adjacency matrix, incidence matrix,
  and adjacency list for a given small graph.
- **Rung 2 (application)**: learner correctly computes a matrix power and interprets its entries
  as walk counts, and correctly distinguishes directed-graph asymmetry from undirected-graph
  symmetry.
- **Rung 3 (transfer)**: learner correctly selects the appropriate representation for a stated
  density scenario and justifies the choice via space/time trade-offs.

## Tutor Recovery Strategy
- If MC-1 recurs, re-test a specific directed-cycle example for asymmetry.
- If MC-2 recurs, re-derive a diagonal matrix-power entry as a closed-walk count, never a path
  count.
- If MC-3 recurs, re-run the storage-comparison demonstration for a real-scale sparse graph.

## Memory Hooks
- "Directed means check both directions — symmetry is the exception, not the rule."
- "Matrix powers count walks, which can repeat — not paths, which can't."
- "Dense, matrix. Sparse, list. The choice is about space and speed, not preference."

## Transfer Connections
- `math.disc.graph` (already authored, this campaign): supplies the vertex/edge structure this
  concept encodes into matrix and list forms.
- `math.linalg.matrix` (already authored, this campaign): supplies the $(i,j)$-indexed grid
  structure the adjacency and incidence matrices are direct instances of — this concept is the
  direct payoff of authoring `matrix`, closing the exact dependency this program's own tracking
  identified as the sole remaining blocker for math.disc's domain certification.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.disc.graph-representation.md`, reused by
  reference for its worked example (walk-counting via matrix powers on $C_4$), its
  representation-comparison table (space/time trade-offs), and its three-misconception registry
  (birth types explicitly given by the Blueprint — MC-1 Type 5, MC-2 Type 5, MC-3 Type 3 —
  adopted directly).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (spectral graph
  theory previews — eigenvalue bounds for $d$-regular graphs, the Matrix-Tree Theorem, and
  compressed graph representations for massive graphs).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `graph`+`matrix`,
  unlocks none, cross_links none, developing/apply, mastery_threshold 0.85, estimated_hours 3)
  was directly verified against the live KG and matches exactly.
- **This concept CLOSES the math.disc domain to 32/32 — DOMAIN CERTIFIED, the ninth mathematics
  domain** (after math.found, math.geom, math.arith, math.nt, math.alg, math.func, math.trig,
  math.seq), confirmed via `scripts/math/state.ts` in this same batch's own validation.

## Version History
- 2026-09-13 (Batch 73): authored. Unblocked by `math.disc.graph` (already authored) and
  `math.linalg.matrix` (Batch 72). Companion batch concepts: `math.linalg.matrix-addition`,
  `math.linalg.matrix-multiplication`, `math.linalg.matrix-transpose`. **`math.disc` reaches
  32/32 — DOMAIN CERTIFIED**, the ninth mathematics domain.
