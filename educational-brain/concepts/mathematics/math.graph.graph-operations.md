# math.graph.graph-operations — Graph Operations (Union, Complement, Join, Subgraphs, Contraction, Line Graph, Cartesian Product)

## Identity
- **KG ID:** `math.graph.graph-operations`
- **Domain:** math.graph (Graph Theory)
- **Requires:** `math.graph.graph`
- **Unlocks:** none
- **Cross-links:** none
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) define graph union, intersection, complement, and join, computing each for small explicit graphs and stating when each yields a simple graph; (2) define subgraph and induced subgraph, perform edge deletion, vertex deletion, and edge contraction, and compute the line graph together with its degree formula; (3) construct the Cartesian product of two graphs and correctly determine which properties (regularity, bipartiteness, connectivity) are preserved or destroyed by each operation in this concept.

## Core Understanding
`math.graph.graph` established the graph object itself. This concept treats graphs as OBJECTS that can be combined, transformed, and reduced by well-defined operations — the graph-theoretic analogue of arithmetic operations on numbers.

SET-THEORETIC OPERATIONS: given $G_1=(V_1,E_1)$ and $G_2=(V_2,E_2)$, the UNION $G_1\cup G_2=(V_1\cup V_2, E_1\cup E_2)$ (disjoint union $G_1\sqcup G_2$ when $V_1\cap V_2=\varnothing$); the INTERSECTION $G_1\cap G_2=(V_1\cap V_2, E_1\cap E_2)$ (meaningful only when $V_1=V_2$); the COMPLEMENT $\bar{G}=(V, \binom{V}{2}\setminus E)$, whose edges are exactly $G$'s non-edges (always simple if $G$ is simple; $\bar{K}_n$ is the empty graph and $\bar{\bar{G}}=G$ always); and the JOIN $G_1+G_2$, the disjoint union PLUS every edge between $V_1$ and $V_2$ (so $K_{m,n}=\bar{K}_m+\bar{K}_n$).

SUBGRAPHS AND REDUCTION OPERATIONS: $H=(V',E')$ is a SUBGRAPH of $G$ if $V'\subseteq V$ and $E'\subseteq E\cap\binom{V'}{2}$ — any choice of edges among the retained vertices is allowed. The INDUCED SUBGRAPH $G[S]$ for $S\subseteq V$ is CANONICAL: it forces EVERY edge of $G$ between two $S$-vertices to be present — there is no freedom in the edge set once $S$ is chosen. EDGE DELETION $G-e$ removes one edge; VERTEX DELETION $G-v$ removes a vertex and all its incident edges. EDGE CONTRACTION $G/e$ (for $e=\{u,v\}$) merges $u$ and $v$ into a single new vertex adjacent to all former neighbors of either — the key operation behind graph minors theory and Kuratowski's planarity theorem, and one that can introduce multi-edges when $u$ and $v$ share a common neighbor (conventionally simplified away in simple-graph contexts).

DERIVED STRUCTURES: the LINE GRAPH $L(G)$ has vertex set $E(G)$, with two edge-vertices adjacent iff the corresponding original edges share an endpoint; $\deg_{L(G)}(e)=\deg_G(u)+\deg_G(v)-2$ for $e=\{u,v\}$. The CARTESIAN PRODUCT $G\square H$ has vertex set $V(G)\times V(H)$, with $(g_1,h_1)\sim(g_2,h_2)$ iff EXACTLY one coordinate advances by an edge in its own factor while the other stays fixed; $\deg_{G\square H}(g,h)=\deg_G(g)+\deg_H(h)$, so an $r$-regular graph times an $s$-regular graph is $(r+s)$-regular.

PROPERTY PRESERVATION IS NOT UNIVERSAL AND MUST BE CHECKED PER OPERATION: subgraphs preserve bipartiteness (a bipartite subgraph of a bipartite graph is automatically bipartite) but NOT necessarily connectivity; the Cartesian product preserves bipartiteness iff at least one factor is bipartite, and preserves connectivity when both factors are connected; edge contraction and complementation each preserve connectivity in specific, provable ways, but NEITHER preserves bipartiteness in general (the complement of the bipartite $C_6$ contains triangles).

## Mental Models
1. **Rung 1 — an induced subgraph is a FUNCTION of the chosen vertex set alone; an arbitrary subgraph has independent freedom over which edges to keep.** Choosing $S$ for $G[S]$ fully determines the edges; choosing a general subgraph requires a second, independent decision.
2. **Rung 2 — every operation must be checked individually against each property of interest; no operation preserves everything.** Bipartiteness, connectivity, and regularity behave differently under union, complement, contraction, and product — a table, not a single rule, governs preservation.
3. **Rung 3 — contraction and the line graph are STRUCTURE-TRANSFORMING operations, not mere relabelings.** Contraction can genuinely reduce a graph's complexity (motivating minors theory); the line graph re-casts EDGES as the new objects of study, a genuine change of representation.

## Why Students Fail
Having just learned that the complement of the empty graph is complete (and vice versa) — a clean, symmetric-feeling operation — students readily assume complementation preserves "nice" global properties like bipartiteness, missing that flipping every edge/non-edge relationship can introduce entirely new odd cycles that were never present in the original graph. Induced subgraphs and arbitrary subgraphs are easily conflated because both start from "pick some vertices," and only careful attention to whether the EDGE set is forced (induced) or freely chosen (arbitrary) prevents the confusion — a subtlety many students glide past on a first exposure. Finally, having established that edge contraction on a SIMPLE graph like $K_4$ happens to yield another simple graph ($K_3$), students overgeneralize that contraction always stays within simple graphs, missing that contraction genuinely creates multi-edges whenever the two merged vertices share a common neighbor, and that the simple-graph result requires a silent simplification step the student may not have noticed was applied.

## Misconceptions

### MC-1: COMPLEMENT-PRESERVES-BIPARTITE
- **Birth type:** Type 1 (overgeneralization) — moderate (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Believing the complement of a bipartite graph is always bipartite, when complementation can introduce odd cycles that were never present in the original graph.
- **Why this birth type:** Overgeneralization from the symmetric-feeling nature of complementation (it "flips" edges cleanly) to an assumption that clean structural properties like bipartiteness survive the flip — a reasonable-feeling but false inference about what a symmetric operation preserves.
- **Detection probe:** "Is the complement of $C_6$ (the bipartite 6-cycle) also bipartite?" A student with MC-1 answers "yes."
- **Repair:** Compute $\bar{C}_6$ directly: it contains triangles (two disjoint triangles, in fact — the complement of a 6-cycle is $K_3\sqcup K_3$'s edge structure joined appropriately), which are odd cycles, so $\bar{C}_6$ is NOT bipartite despite $C_6$ being bipartite.
- **Verification of death:** Given a bipartite graph, the student states that its complement's bipartiteness must be checked independently, rather than assumed.

### MC-2: INDUCED-SUBGRAPH-VS-SUBGRAPH
- **Birth type:** Type 4 (notation-induced) — foundational (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Confusing the induced subgraph $G[S]$ (which forces ALL edges between $S$-vertices to remain) with an arbitrary subgraph on the same vertex set (which may freely omit some of those edges).
- **Why this birth type:** Notation-induced: both $G[S]$ and a general subgraph on vertex set $S$ are described by "choosing a vertex set," and the bracket notation $G[S]$ does not visually signal the crucial extra rule (forced edge inclusion) distinguishing it from a free choice.
- **Detection probe:** "For $G=K_4$ and $S=\{1,2,3\}$, is $G[S]$ necessarily $K_3$, or could it be any 3-vertex graph with some edges removed?" A student with MC-2 believes it could be any 3-vertex graph on $S$.
- **Repair:** Compute $G[\{1,2,3\}]$ for $K_4$ explicitly: since $K_4$ has every possible edge, $G[\{1,2,3\}]$ MUST be $K_3$ — there is no freedom; the induced subgraph operator is fully determined once $S$ is fixed, unlike an arbitrary subgraph which could delete additional edges beyond just restricting to $S$.
- **Verification of death:** Given a graph and a vertex subset $S$, the student correctly computes $G[S]$ as forcing every $G$-edge between $S$-vertices, distinguishing it explicitly from any arbitrary edge-reduced subgraph on the same vertices.

### MC-3: CONTRACTION-ALWAYS-SIMPLE
- **Birth type:** Type 1 (overgeneralization) — moderate (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Believing edge contraction always produces a simple graph, when contracting an edge whose endpoints share a common neighbor genuinely creates a multi-edge that must be explicitly simplified away by convention.
- **Why this birth type:** Overgeneralization from a single worked example (contracting an edge in $K_4$ yields $K_3$, a simple graph) to a universal claim, without checking whether that example's cleanliness was a coincidence or a guaranteed outcome.
- **Detection probe:** "When contracting edge $\{u,v\}$ in a graph where $u$ and $v$ share a common neighbor $w$, does the result stay a simple graph automatically?" A student with MC-3 answers "yes" without qualification.
- **Repair:** Trace $K_4/e$ explicitly at the multigraph level: contracting $\{1,2\}$ in $K_4$ genuinely creates TWO edges from the merged vertex to vertex 3 (since both 1 and 2 were adjacent to 3) and TWO edges to vertex 4 — a true multigraph — which is then, by CONVENTION, simplified to a single edge each, yielding $K_3$; the simplification is a deliberate choice, not an automatic consequence.
- **Verification of death:** Given an edge contraction where the endpoints share a common neighbor, the student explicitly identifies the resulting multi-edge before stating whether or how it is simplified.

## Analogies
1. **The photo-negative analogy (targets MC-1).** The complement of a graph is like a photographic negative — every "dark" spot (edge) becomes "light" (non-edge) and vice versa. A negative of a clean, orderly photo isn't guaranteed to look equally orderly; flipping every relationship can produce a genuinely different pattern of structure, including new odd cycles never visible in the original.
2. **The zoom-vs-crop-with-erasing analogy (targets MC-2).** An induced subgraph $G[S]$ is like ZOOMING IN on a region of a photo — everything genuinely present within that region stays exactly as it was, nothing is erased. An arbitrary subgraph is like zooming in AND THEN erasing some details by hand — a second, independent editing step beyond the zoom.

## Demonstrations
### Demonstration 1 — complement and join (mirrors Blueprint Ex1)
$G=C_5$ (5-cycle): each vertex has degree 2, so each vertex of $\bar{G}$ has degree $4-2=2$; $\bar{C}_5$ turns out to also be a 5-cycle ($C_5$ is self-complementary). Computing $\bar{K}_2+\bar{K}_3$: two isolated vertices joined with three isolated vertices, plus every cross-edge, yields exactly $K_{2,3}$ — the complete bipartite graph, obtained purely from complements and a join.

### Demonstration 2 — contraction and line graph (mirrors Blueprint Ex2)
$G=K_4$ ($n=4$, $m=6$): contracting edge $\{1,2\}$ merges them into $w$, adjacent to both 3 and 4 (the former neighbors of 1 and 2); 3 and 4 remain adjacent to each other — the result, after simplification, is $K_3$. Line graph $L(K_4)$: vertex set = the 6 edges of $K_4$; each edge shares an endpoint with $3+3-2=4$ other edges, so $L(K_4)$ is 4-regular on 6 vertices — this is the octahedron graph $K_{2,2,2}$.

### Demonstration 3 — Cartesian product and property preservation (mirrors Blueprint Ex3)
$C_4\square K_2$: 4 vertices times 2 vertices = 8 vertices; each vertex $(c,k)$ has degree $\deg_{C_4}(c)+\deg_{K_2}(k)=2+1=3$ — a 3-regular graph on 8 vertices, in fact the 3-cube graph $Q_3$. Since $C_4$ is bipartite, $C_4\square K_2$ is bipartite (property PRESERVED); since both factors are connected, the product is connected (property PRESERVED). Contrast: $C_3\square K_2$ (the triangular prism) is NOT bipartite, because $C_3$ itself is not bipartite — the product inherits the odd cycle directly from its non-bipartite factor.

## Discovery Questions
1. "If $C_6$ is bipartite, do you expect $\bar{C}_6$ to also be bipartite? What would you need to check to be sure?"
2. "For $G=K_4$ and $S=\{1,2,3\}$, could $G[S]$ ever be a 3-vertex graph with only 2 edges instead of all 3? Why or why not?"
3. "When you contract an edge whose two endpoints share a common neighbor, what happens to the edges from that neighbor to each of the two original endpoints?"

## Teaching Sequence
Best taught by **direct instruction establishing each operation's exact definition FIRST**, given the Abstract CPA entry stage — the set-theoretic operations (union, complement, join) and structural operations (deletion, contraction, line graph, product) are each precisely defined constructions best introduced directly, with the discovery questions surfacing "does this operation preserve X?" intuitions before each demonstration confirms or refutes them.
1. Establish complement and join via Demonstration 1, posing Discovery Question 1 before revealing $\bar{C}_6$'s odd cycles in the misconception repair.
2. Introduce subgraph versus induced subgraph, posing Discovery Question 2 before working the contraction and line graph computations in Demonstration 2.
3. Introduce edge contraction's multi-edge subtlety explicitly, posing Discovery Question 3 before the Cartesian product in Demonstration 3.
4. Assess with the P77 problem set and the tensor-product transfer probe (P76, independence mode).

## Tutor Actions
1. **On any complement question involving a "nice" property:** explicitly ask the student to verify the property on the complement directly, rather than assume it transfers.
2. **On any induced-subgraph computation:** require the student to state explicitly that EVERY qualifying edge is included, distinguishing it from an arbitrary edge-reduced subgraph.
3. **On any contraction:** require the student to check for a shared common neighbor between the merged vertices before declaring the result automatically simple.

## Voice Teaching Notes
1. **Register:** proficient/applied — this concept assumes fluency with graph, degree, and adjacency from the prerequisite and introduces a family of well-defined constructive operations.
2. **Load-bearing sentence, spoken slowly:** "Complementing, contracting, and taking products each need their OWN check — no single rule tells you what survives."
3. **Wait time:** pause after Discovery Question 3, letting the student work through what happens to the shared-neighbor edges before revealing the multi-edge outcome explicitly.

## Assessment Signals
1. **Gate concept:** correctly computes complement, join, induced subgraph, contraction, and line graph for novel small graphs.
2. **Property-preservation discrimination:** correctly determines, for a given operation and property pair, whether preservation is guaranteed, sometimes true, or never guaranteed.
3. **Induced-vs-arbitrary distinction:** given a vertex subset, correctly computes the induced subgraph and explicitly distinguishes it from any arbitrary subgraph on the same vertices.
4. **Contraction fluency:** correctly identifies when contraction produces a multi-edge and states the simplification convention explicitly.
5. **Transfer:** applies the tensor product's simultaneous-advance adjacency rule (P76) and correctly contrasts it with the Cartesian product's single-coordinate-advance rule.

## Tutor Recovery Strategy
If the student assumes complementation preserves bipartiteness, work $\bar{C}_6$ and a second example (a longer even cycle) until odd cycles reliably appear in the complement. If the student conflates induced and arbitrary subgraphs, work several $G[S]$ computations on graphs with genuinely missing edges among $S$-vertices, contrasting explicitly with a hand-chosen arbitrary subgraph that deletes one of those edges. If the student assumes contraction always stays simple, work through a shared-common-neighbor contraction step by step at the multigraph level before simplifying, until the multi-edge step is visible and expected.

## Memory Hooks
1. "A negative isn't guaranteed to be as orderly as the photo — complements need their own bipartiteness check."
2. "Induced means forced — $G[S]$ keeps every edge inside $S$, no exceptions."
3. "Shared neighbor, doubled edge — contraction creates multi-edges before anyone simplifies them away."

## Transfer Connections
- **`math.graph.graph`:** the graph definition (order, size, degree, adjacency, bipartite) this concept's operations all act upon.
- **`math.graph.graph-invariants`:** several operations here are naturally analyzed through their effect on invariants — a graph and its complement have complementary degree sequences, and the line graph's degree formula is itself an invariant-transformation rule.
- **`math.graph.matching`:** the line graph construction connects directly to matching theory — a matching in $G$ corresponds to an independent set of vertices in $L(G)$, though this connection is not developed further here.

## Cross-Subject Connections
- **Computer Science (graph minors, planarity testing):** edge contraction is the foundational operation in graph minors theory (Robertson–Seymour theorem) and in Kuratowski's/Wagner's planarity characterizations, both central to algorithmic graph theory.
- **Chemistry (molecular graph transformations):** graph operations like induced subgraph extraction and complementation model substructure searches and complementary-bond analyses in cheminformatics representations of molecules.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.graph.graph-operations.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on the tensor product, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions independently confirmed against this program's own taxonomy: MC-1 Type 1 moderate, MC-2 Type 4 foundational, MC-3 Type 1 moderate.
- Cross-link: KG lists no cross-links for this concept — independence mode, matching the Blueprint's own Component 7 declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.

## Version History
- **Batch 26** (2026-09-12): initial authoring, part 2 of 3 this batch (with `math.graph.graph-invariants`, `math.graph.matching`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1 moderate, MC-2 Type 4 foundational, MC-3 Type 1 moderate).
