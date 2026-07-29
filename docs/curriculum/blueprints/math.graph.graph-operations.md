# Teaching Blueprint: Graph Operations (`math.graph.graph-operations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.graph-operations` |
| name | Graph Operations |
| domain | Graph Theory |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.graph.graph` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — proficient learner already fluent in graph definition, degree, and adjacency; operations on graphs are abstract set-level constructions defined without reference to drawing or physical arrangement |
| description (KG) | Key operations on graphs: union, intersection, complement, join, product (Cartesian, tensor), line graph. Edge/vertex deletion and contraction. Subgraph and induced subgraph. Regular and bipartite graph construction via operations. |

## Component 1 — Learning Objectives

- LO1: Define **graph union** $G_1\cup G_2$, **intersection** $G_1\cap G_2$, **complement** $\bar{G}$, and **join** $G_1+G_2$; state when these yield simple graphs; compute each for small explicit graphs.
- LO2: Define **subgraph** and **induced subgraph**; perform **edge deletion** $G-e$, **vertex deletion** $G-v$, and **edge contraction** $G/e$; compute the **line graph** $L(G)$ and state its degree sequence in terms of $G$.
- LO3: Construct the **Cartesian product** $G\square H$ (recognizing it as $n_H$ copies of $G$ joined by matching edges) and explain which graph-theoretic properties — regularity, bipartiteness, connectivity — are preserved or destroyed by the operations in LO1–LO2.

## Component 2 — Prerequisite Check

Assumes mastery of `math.graph.graph` (graph as $G=(V,E)$, order $n$, size $m$, degree $\deg(v)$, adjacency, Handshaking Lemma, path, connectivity, bipartite definition). No further prerequisites.

## Component 3 — Core Explanation

**Set-theoretic operations on graphs.** Given $G_1=(V_1,E_1)$ and $G_2=(V_2,E_2)$:

- **Union** $G_1\cup G_2=(V_1\cup V_2,\,E_1\cup E_2)$. If $V_1\cap V_2=\varnothing$, called **disjoint union** $G_1\sqcup G_2$.
- **Intersection** $G_1\cap G_2=(V_1\cap V_2,\,E_1\cap E_2)$. Meaningful only when $V_1=V_2$ (same vertex set).
- **Complement** $\bar{G}=(V,\,\binom{V}{2}\setminus E)$: edges of $\bar{G}$ are exactly the non-edges of $G$. Always simple if $G$ is simple. $K_n$'s complement is the empty graph; $\bar{K}_n=K_n$.
- **Join** $G_1+G_2$: disjoint union of $G_1$ and $G_2$ plus all edges between $V_1$ and $V_2$. $K_{m,n}=\bar{K}_m+\bar{K}_n$.

**Subgraph and induced subgraph.** $H=(V',E')$ is a **subgraph** of $G$ if $V'\subseteq V$ and $E'\subseteq E\cap\binom{V'}{2}$. The **induced subgraph** $G[S]$ for $S\subseteq V$ has vertex set $S$ and exactly those edges of $G$ with both endpoints in $S$. Induced subgraphs are canonical: no choice in edges.

**Deletion and contraction.** $G-e$: remove edge $e$ (vertex set unchanged). $G-v$: remove vertex $v$ and all incident edges. **Edge contraction** $G/e$ where $e=\{u,v\}$: merge $u$ and $v$ into a new vertex $w$; $w$ is adjacent to all former neighbors of $u$ and $v$ (excluding $u$ and $v$); remove any resulting self-loops (multi-edges may arise — contract in simple-graph model merges parallel edges). Contraction is the key operation in the proof of Kuratowski's theorem and in graph minors theory.

**Line graph.** $L(G)$: vertex set = $E(G)$; two vertices of $L(G)$ adjacent iff the corresponding edges of $G$ share an endpoint. $\deg_{L(G)}(e)=\deg_G(u)+\deg_G(v)-2$ for $e=\{u,v\}\in E(G)$. $L(K_5)=K_5$ (up to isomorphism); $L(K_{3,3})$ is the 4-regular graph on 9 vertices.

**Cartesian product.** $G\square H$: vertex set $V(G)\times V(H)$; $(g_1,h_1)\sim(g_2,h_2)$ iff ($g_1=g_2$ and $h_1\sim_H h_2$) or ($h_1=h_2$ and $g_1\sim_G g_2$). $\deg_{G\square H}(g,h)=\deg_G(g)+\deg_H(h)$. $P_2\square P_3=$ the 2×3 grid graph. If $G$ is $r$-regular and $H$ is $s$-regular, $G\square H$ is $(r+s)$-regular.

**Property preservation summary**:

| Operation | Bipartiteness preserved? | Connectivity preserved? |
|---|---|---|
| Subgraph | Yes (bipartite subgraph of bipartite $G$) | Not necessarily |
| $G\cup H$ (common vertices) | Not necessarily | Not necessarily |
| $G\square H$ | Yes iff $G$ or $H$ bipartite | Yes (if both connected) |
| $G/e$ | Not necessarily | Yes (contraction preserves connectivity) |
| Complement $\bar{G}$ | Not necessarily | Yes (complement of disconnected graph is connected, except $\bar{K}_n$) |

## Component 4 — Worked Examples

**Example 1 (LO1 — complement and join)**: Let $G=C_5$ (5-cycle). Compute $\bar{G}$. Each vertex of $C_5$ has degree 2, so each vertex of $\bar{G}$ has degree $4-2=2$. $\bar{C}_5$ has 5 vertices each of degree 2 — it is also a 5-cycle ($\bar{C}_5\cong C_5$, since $C_5$ is self-complementary). Compute $K_2+K_3$: $\bar{K}_2$ has 2 isolated vertices, $\bar{K}_3$ has 3 isolated vertices; their join is the complete bipartite graph $K_{2,3}$.

**Example 2 (LO2 — contraction and line graph)**: Let $G=K_4$ ($n=4$, $m=6$). Contract edge $e=\{1,2\}$: the merged vertex $w$ is adjacent to 3 and 4 (former neighbors of both 1 and 2); 3 and 4 remain adjacent to each other. Result: $K_3$ (one edge contracted in $K_4$ yields $K_3$). Line graph $L(K_4)$: vertex set = 6 edges of $K_4$; two edge-vertices adjacent iff they share an endpoint in $K_4$. Each edge $\{i,j\}$ shares an endpoint with $3+3-2=4$ other edges, so $L(K_4)$ is 4-regular on 6 vertices — this is $K_4$ with a perfect matching removed, i.e., the octahedron graph $K_{2,2,2}$.

**Example 3 (LO3 — Cartesian product, property preservation)**: Construct $C_4\square K_2$. $C_4$ has 4 vertices (cycle), $K_2$ has 2 vertices; product has 8 vertices. Each vertex $(c,k)$ has degree $\deg_{C_4}(c)+\deg_{K_2}(k)=2+1=3$: the product is 3-regular on 8 vertices (the **3-cube graph** $Q_3$). Since $C_4$ is bipartite and $K_2$ is bipartite, $C_4\square K_2$ is bipartite (PASS). Since both factors are connected, the product is connected (PASS). By contrast, $C_3\square K_2$ (triangular prism) is NOT bipartite because $C_3$ is not bipartite — the product inherits the odd cycle from $C_3$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Complement as "What's Missing" (Primitive P11: Representation Shift)

Draw $C_5$ on 5 vertices. Ask: "If I draw all the edges that are NOT in $C_5$, what graph do I get?" Compute degree: each vertex gains $4-2=2$ new edges. Draw $\bar{C}_5$ — it looks like another 5-cycle. Contrast: $\bar{K}_n$ is the empty graph; $\bar{\bar{G}}=G$ always. Use the complement to encode graph properties: $G$ is a clique iff $\bar{G}$ has no edges; $G$ is bipartite iff $\bar{G}$ is... (not necessarily anything simple — avoid the false claim).

- **MC-1 hook**: ask "Is the complement of a bipartite graph always bipartite?" — No: $\bar{C}_6$ has odd cycles (check: $C_6$ is bipartite, $\bar{C}_6$ has triangles).

### Teaching Action A02 — Building with Operations (Primitive P25: Deductive)

Show how standard graphs arise from operations: $K_{m,n}=\bar{K}_m+\bar{K}_n$ (join); Petersen graph = $K_5$ with a 5-cycle contracted and specific edges placed (motivate, not required to verify). Work the line-graph construction on $K_4$ (Example 2). Demonstrate contraction $K_4/e=K_3$ step by step.

- **MC-2 hook**: ask "Does the induced subgraph $G[S]$ have the same edges as the subgraph obtained by deleting $V\setminus S$?" — Yes, by definition: these are the same operation. Contrast with a subgraph that deletes additional edges: $G[S]$ forces ALL edges between $S$-vertices to remain.

### Teaching Action A03 — When Operations Destroy Properties (Primitive P16: Counterexample)

Present claim: "Graph operations on simple graphs always produce simple graphs." Refute: $G/e$ can produce multi-edges when two vertices share multiple common neighbors. Present claim: "Taking a subgraph of a connected graph is still connected." Refute: $G-v$ for a cut-vertex disconnects $G$. Present claim: "Cartesian product of two non-bipartite graphs is non-bipartite." Refute: the Cartesian product of any two graphs is bipartite iff at least one factor is bipartite.

- **MC-3 hook**: ask "Is $G\square H$ always regular if $G$ and $H$ are regular?" — Yes if $G$ is $r$-regular and $H$ is $s$-regular, then $G\square H$ is $(r+s)$-regular. But the converse fails: $G\square H$ can be regular even if neither factor is (give example if desired — harder).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (5-problem set)**:
  1. Compute $\bar{C}_6$ (6-cycle complement): find its degree sequence and determine whether it is connected and bipartite.
  2. Given $G=P_4$ (path on 4 vertices: $1-2-3-4$), compute $L(G)$ (line graph): draw $L(P_4)$, state its order and degree sequence.
  3. Contract the edge $\{2,3\}$ in the path $P_4=1-2-3-4$. Identify the resulting graph.
  4. Construct $K_2\square K_3$ (Cartesian product). Draw it, state its order, size, degree sequence, and whether it is bipartite.
  5. Determine whether the complement of a connected graph on $n\ge4$ vertices is always connected. Prove or give a counterexample.
- **P76 (Transfer Probe, mode = independence)**: "The **tensor product** (also called categorical product) $G\times H$ is defined by: $(g_1,h_1)\sim(g_2,h_2)$ iff $g_1\sim_G g_2$ AND $h_1\sim_H h_2$ — both coordinates must advance simultaneously. (a) Compute $K_2\times K_3$: draw the product and determine its connected components. (b) Explain why $G\times K_2$ is bipartite for any graph $G$ (without exception). (c) Compare the Cartesian product $K_2\square K_3$ (already computed in Problem 4) with the tensor product $K_2\times K_3$ — what structural difference explains why one is connected and the other may not be?"
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Graph Operations — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COMPLEMENT-PRESERVES-BIPARTITE | Believing the complement of a bipartite graph is bipartite — in fact $\bar{C}_6$ (complement of the bipartite 6-cycle) contains triangles, so bipartiteness is not preserved by complementation | Moderate |
| MC-2 | INDUCED-SUBGRAPH-VS-SUBGRAPH | Confusing induced subgraph $G[S]$ (forced to include ALL edges between $S$-vertices) with an arbitrary subgraph that may also delete some of those edges; induced subgraph gives no choice in edge set once $S$ is chosen | Foundational |
| MC-3 | CONTRACTION-ALWAYS-SIMPLE | Believing edge contraction always produces a simple graph — in fact, when two vertices $u,v$ share a common neighbor $w$, contracting $\{u,v\}$ creates a double-edge from $w$ to the merged vertex; the resulting multigraph must be simplified if the context requires simple graphs | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Complementation Does Not Preserve Bipartiteness") → P41 (detect: ask whether $\bar{K}_{3,3}$ is bipartite — $K_{3,3}$ is bipartite; its complement on 6 vertices, $\bar{K}_{3,3}$, has two disjoint triangles $K_3\sqcup K_3$, which are NOT bipartite) → P64 (conceptual shift: bipartiteness depends on the presence of odd cycles; the complement can CREATE odd cycles even when none existed in $G$; only the complement of an acyclic graph might avoid them, and even then it's not guaranteed).
- **B02 (targets MC-2)**: P27 (name it: "Induced Subgraph Forces All Edges Inside the Vertex Set") → P41 (detect: given $G=K_4$ and $S=\{1,2,3\}$, ask which graph is $G[S]$ — it must be $K_3$, not $P_3$ or any other 3-vertex graph) → P64 (conceptual shift: the induced subgraph operator $G[\cdot]$ is a function of the vertex set alone; once $S$ is chosen, the edge set of $G[S]$ is determined by $G$ itself — there is no freedom; an arbitrary subgraph on $S$ could delete some of those edges too).
- **B03 (targets MC-3)**: P27 (name it: "Edge Contraction May Create Multi-Edges") → P41 (detect: in $K_4$, contract any edge — since every pair of vertices has exactly one common neighbor among the remaining two vertices, do any parallel edges arise? In $K_4/e$, $u$ and $v$ both have the same two non-endpoints as neighbors, so TWO edges connect the merged vertex to each — yes, multi-edges appear if we do not simplify) → P64 (conceptual shift: the convention in simple-graph theory is to delete the resulting self-loops and merge parallel edges after contraction, making $K_4/e=K_3$; in multigraph contexts, this simplification step is omitted; always state which convention is in use).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.graph.graph` (graph definition, degree, adjacency, connectivity, bipartite).
- **Unlocks**: none listed in the KG.
- **Cross-link**: none in KG → P76 uses independence mode.

## Component 8 — Teaching Notes

- The line graph and Cartesian product are the most computationally rich operations and should receive the most worked-example time; union/complement can be treated more quickly as set-level constructions.
- Edge contraction is the gateway to graph minors theory (Robertson–Seymour theorem) and Kuratowski's planarity characterization — establish it precisely here so it can be cited later without re-derivation.
- The tensor product in the transfer probe is a natural contrast to the Cartesian product; both are products on $V(G)\times V(H)$, but the adjacency rule differs, producing structurally very different graphs. This comparison is a high-yield conceptual probe.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.graph.graph`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01–A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 5 problems | PASS (MAMR = 5/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: proficient, set-level graph constructions without physical/pictorial reference) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires computing $L(K_4)$, performing contraction, and constructing $K_2\square K_3$ — not just listing operation definitions | PASS |
