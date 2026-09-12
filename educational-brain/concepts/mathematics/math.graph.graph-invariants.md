# math.graph.graph-invariants — Graph Invariants (Isomorphism, Distinguishing Invariants, Their Limits)

## Identity
- **KG ID:** `math.graph.graph-invariants`
- **Domain:** math.graph (Graph Theory)
- **Requires:** `math.graph.graph`
- **Unlocks:** none
- **Cross-links:** none
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) define graph isomorphism (a bijection between vertex sets preserving adjacency) and define a graph invariant as any property preserved under isomorphism, naming the six standard invariants (degree sequence, order, size, number of components, girth, diameter); (2) compute the degree sequence, girth, diameter, and connectivity of a given graph, and use a mismatch in any single invariant to prove two graphs are NOT isomorphic without an exhaustive bijection search; (3) explain why matching invariants never PROVES isomorphism, exhibiting an explicit pair of non-isomorphic graphs with identical order, size, degree sequence, and girth, and recognize that the general graph isomorphism problem has no known polynomial-time algorithm.

## Core Understanding
`math.graph.graph` established the graph itself — order, size, degree, adjacency. This concept asks a genuinely different question: when are two DIFFERENTLY-DRAWN or DIFFERENTLY-LABELED graphs actually the SAME abstract structure?

GRAPH ISOMORPHISM: $G_1=(V_1,E_1)$ and $G_2=(V_2,E_2)$ are isomorphic ($G_1\cong G_2$) if there exists a bijection $f:V_1\to V_2$ such that $\{u,v\}\in E_1\iff\{f(u),f(v)\}\in E_2$. Isomorphic graphs are "the same graph drawn differently" — different vertex labels, possibly different-looking drawings, but identical adjacency structure once the labels are matched up correctly.

A GRAPH INVARIANT is any function $I$ from graphs to some set such that isomorphic graphs always agree: $G_1\cong G_2\Rightarrow I(G_1)=I(G_2)$. The logical direction matters enormously: invariants can only be used to DISPROVE isomorphism (if $I(G_1)\neq I(G_2)$, then certainly $G_1\not\cong G_2$) — they cannot, by themselves, PROVE isomorphism. Six standard invariants, in increasing computational cost: order $n=|V|$ ($O(1)$), size $m=|E|$ ($O(1)$), degree sequence (sorted degree list, $O(n+m)$), number of connected components ($O(n+m)$ via BFS/DFS), girth (length of the shortest cycle, $O(n(n+m))$), and diameter (the maximum shortest-path distance between any two vertices, $O(n(n+m))$ via BFS from every vertex).

WHY MATCHING INVARIANTS IS NEVER ENOUGH: two graphs can agree on every invariant checked so far and still not be isomorphic. The canonical minimal example: $C_6$ (the 6-cycle) versus $C_3\sqcup C_3$ (two disjoint triangles) share $n=6$, $m=6$, and degree sequence $(2,2,2,2,2,2)$ — but $C_6$ has ONE connected component while $C_3\sqcup C_3$ has TWO, so the components invariant distinguishes them. A subtler pair, $K_{3,3}$ versus the triangular prism $K_3\square K_2$, shares $n=6$, $m=9$, and degree sequence $(3,3,3,3,3,3)$ — but $K_{3,3}$ has girth 4 (bipartite, no triangles) while the prism has girth 3 (it contains triangles), so girth distinguishes them. Constructing pairs that agree on EVERY standard invariant simultaneously requires substantially more elaborate structures (cospectral graphs, certain cage constructions) — this is precisely why the general graph isomorphism problem remains computationally hard: no small, efficiently-computable, complete set of invariants is known (Babai's 2015 quasi-polynomial-time algorithm is the best general result, still not confirmed polynomial).

## Mental Models
1. **Rung 1 — isomorphism is a bijection preserving structure, never literal set equality.** Two graphs with completely different vertex labels can be the identical abstract shape; a bijection is the certificate, not matching labels.
2. **Rung 2 — an invariant is a one-way filter: a mismatch proves non-isomorphism instantly; a match proves nothing on its own.** Every additional invariant that matches raises suspicion of isomorphism without ever confirming it.
3. **Rung 3 — the harder two graphs are to distinguish by cheap invariants, the closer the isomorphism problem sits to its genuinely hard core.** Constructing invariant-matching non-isomorphic pairs is itself a research-level combinatorial skill (cospectral graphs, strongly regular graph families).

## Why Students Fail
Having just learned that a MISMATCHED invariant instantly proves non-isomorphism, students readily flip the logic and assume a MATCHED invariant — especially the degree sequence, which feels like it should "encode everything" about local structure — must prove isomorphism, missing that the degree sequence says nothing about how the high-level pieces connect globally (as $C_6$ versus $C_3\sqcup C_3$ shows starkly with an identical degree sequence but different global connectivity). Diameter and girth are easily conflated because both are single numbers describing "how big" a graph is in some vague sense, even though one measures the longest of the shortest vertex-to-vertex distances and the other measures the shortest cycle length — genuinely unrelated quantities that can move independently (a tree has infinite girth but finite diameter). Finally, because isomorphism is introduced via drawings that "look the same when redrawn," students can slip into thinking isomorphism REQUIRES the same vertex labels or the same-looking drawing, rather than recognizing that a completely different labeling and a completely different-looking drawing can still be the identical abstract structure.

## Misconceptions

### MC-1: EQUAL-INVARIANTS-MEANS-ISOMORPHIC
- **Birth type:** Type 1 (overgeneralization) — critical (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Believing that matching degree sequences (or any other single invariant, or even a finite collection of invariants) is sufficient to conclude isomorphism, when any finite set of invariants may agree for genuinely non-isomorphic graphs.
- **Why this birth type:** Overgeneralization from the correct one-way implication (isomorphic $\Rightarrow$ invariants match) to its false converse (invariants match $\Rightarrow$ isomorphic) — a natural but invalid inference students make with implications generally, sharpened here because the invariants FEEL comprehensive.
- **Detection probe:** "Two graphs on 6 vertices both have degree sequence $(2,2,2,2,2,2)$. Must they be isomorphic?" A student with MC-1 answers "yes."
- **Repair:** Exhibit $C_6$ versus $C_3\sqcup C_3$ directly: identical $n$, $m$, degree sequence, but $C_6$ has 1 component and $C_3\sqcup C_3$ has 2 — clearly not isomorphic despite matching several invariants at once.
- **Verification of death:** Given two graphs with several matching invariants, the student states this is SUGGESTIVE but not conclusive, and either searches for a distinguishing invariant or attempts an explicit bijection before concluding isomorphism.

### MC-2: DIAMETER-EQUALS-GIRTH
- **Birth type:** Type 3 (language contamination) — foundational (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Confusing diameter (the maximum shortest-path distance between any two vertices) with girth (the length of the shortest cycle in the graph) — two structurally unrelated invariants sharing no common measurement.
- **Why this birth type:** Language contamination: both terms describe "how big" a graph is in everyday usage, and "diameter" in particular carries a strong everyday geometric connotation (the widest measurement across a shape) that does not obviously separate itself from "the shortest loop" without deliberate emphasis on their formal definitions.
- **Detection probe:** "What is the diameter and girth of $C_6$ (the 6-cycle)?" A student with MC-2 gives the same value for both, or cannot articulate what distinguishes them.
- **Repair:** Compute both explicitly on $C_6$: diameter = 3 (the two vertices directly opposite each other on the cycle are 3 steps apart), girth = 6 (the cycle itself is the shortest — indeed only — cycle). Contrast further with a tree: girth is $\infty$ (no cycles exist at all) while diameter is finite (any two vertices are still connected by a finite path).
- **Verification of death:** Given a novel graph, the student computes diameter (via shortest paths between vertex pairs) and girth (via shortest cycle length) as two independent quantities, without conflating either computation or definition.

### MC-3: ISOMORPHISM-IS-SAME-AS-EQUAL-GRAPHS
- **Birth type:** Type 3 (language contamination) — moderate (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Believing isomorphic graphs must have the same vertex and edge sets (literal set equality), rather than understanding isomorphism as a bijective adjacency-preserving map that allows completely different vertex labels.
- **Why this birth type:** Language contamination from everyday "same" and "equal": the word "isomorphic" is often loosely translated by students as "the same graph," and "the same" invites literal set-level sameness rather than the structural equivalence isomorphism actually captures.
- **Detection probe:** "Is the path $a{-}b{-}c$ (vertices $\{a,b,c\}$) isomorphic to the path $1{-}2{-}3$ (vertices $\{1,2,3\}$)?" A student with MC-3 answers "no" because the vertex sets are literally different.
- **Repair:** Construct the explicit bijection $f(a)=1, f(b)=2, f(c)=3$ and verify it preserves every adjacency — the two graphs ARE isomorphic despite having entirely disjoint vertex sets; isomorphism is about STRUCTURE, never about the literal labels used.
- **Verification of death:** Given two graphs with disjoint vertex sets, the student correctly determines isomorphism by constructing (or refuting the existence of) an adjacency-preserving bijection, never by comparing vertex-set equality.

## Analogies
1. **The fingerprint-database analogy (targets MC-1).** A fingerprint invariant (whorl count, ridge pattern category) can instantly rule out two people being the same person if the categories don't match — but two DIFFERENT people can share every coarse category checked so far, and only a full print comparison (the bijection) truly confirms identity. Cheap invariants filter; only the full match certifies.
2. **The translated-document analogy (targets MC-3).** Two documents written in different languages, with completely different words, can express the identical logical argument once translated correctly — the words (vertex labels) differ entirely, but the underlying structure (the argument, the adjacency) is the same. Isomorphism is exactly this translation relationship for graphs.

## Demonstrations
### Demonstration 1 — proving non-isomorphism by degree sequence (mirrors Blueprint Ex1)
$G_1=C_4$ (4-cycle) versus $G_2=K_{1,3}$ (star, center connected to 3 leaves): degree sequence of $G_1$ is $(2,2,2,2)$; degree sequence of $G_2$ is $(3,1,1,1)$. These differ immediately, so $G_1\not\cong G_2$ — settled instantly by one invariant, with no need to check order, size, or components (both happen to share $n=4$, $m=4$, and one component, showing those three invariants alone would have been insufficient here).

### Demonstration 2 — computing girth and diameter (mirrors Blueprint Ex2)
The Petersen graph (10 vertices, 15 edges, 3-regular): girth = 5 (no triangles or 4-cycles exist, but 5-cycles do), diameter = 2 (any two vertices are at most 2 steps apart). Together with the degree sequence $(3,\ldots,3)$, $n=10$, and $m=15$, these invariants essentially characterize the Petersen graph uniquely among small cubic graphs — a striking case where a handful of invariants comes very close to full identification, without ever formally proving it.

### Demonstration 3 — equal invariants, genuinely non-isomorphic (mirrors Blueprint Ex3)
$C_6$ versus $C_3\sqcup C_3$: identical $n=6$, $m=6$, degree sequence $(2,\ldots,2)$ — but girth 6 versus girth 3 distinguishes them (equivalently, 1 component versus 2). A second, subtler pair: $K_{3,3}$ versus the triangular prism $K_3\square K_2$ — identical $n=6$, $m=9$, degree sequence $(3,\ldots,3)$ — but girth 4 (bipartite) versus girth 3 (contains triangles) distinguishes them. Constructing pairs matching on girth, degree sequence, $n$, AND $m$ simultaneously requires substantially larger, more elaborate constructions.

## Discovery Questions
1. "Two graphs both have degree sequence $(2,2,2,2,2,2)$ on 6 vertices. Can you think of two different graphs — genuinely not isomorphic — that both satisfy this?"
2. "What is the diameter of a straight-line path on 5 vertices? What is its girth? Why are these such different numbers?"
3. "If I told you two graphs match on order, size, AND degree sequence, would you conclude they're isomorphic? What would you check next?"

## Teaching Sequence
Best taught by **direct instruction establishing the bijection definition FIRST**, given the Abstract CPA entry stage — a proficient learner already fluent in graph basics benefits from the precise isomorphism definition stated directly, with the discovery questions surfacing the "matching invariants isn't enough" intuition before Demonstration 3 confirms it formally.
1. Establish isomorphism via bijection, working Demonstration 1's clean invariant-mismatch proof, posing Discovery Question 1 before revealing Demonstration 3's pair.
2. Build the invariant computation toolkit (degree sequence, girth, diameter) via Demonstration 2's Petersen graph, posing Discovery Question 2 to separate girth from diameter explicitly.
3. Work Demonstration 3 in full, posing Discovery Question 3 before stating the general isomorphism problem's computational hardness.
4. Assess with the P77 problem set and the reconstruction-conjecture transfer probe (P76, independence mode).

## Tutor Actions
1. **On any non-isomorphism claim:** require the student to name the SPECIFIC invariant that differs, rather than a vague "they look different."
2. **On any isomorphism claim:** require an explicit bijection, never a list of matching invariants alone, before accepting the claim as proven.
3. **On diameter/girth questions:** always require both values computed and stated separately, never merged into one "size" judgment.

## Voice Teaching Notes
1. **Register:** proficient/conceptual — this concept assumes fluency with graph, degree, and adjacency from the prerequisite and introduces formal isomorphism and invariant vocabulary.
2. **Load-bearing sentence, spoken slowly:** "A matching invariant is a clue, never a verdict — only a bijection settles isomorphism."
3. **Wait time:** pause after Discovery Question 1, letting the student genuinely attempt to construct a matching-degree-sequence, non-isomorphic pair before revealing $C_6$ versus $C_3\sqcup C_3$.

## Assessment Signals
1. **Gate concept:** correctly proves non-isomorphism between two novel graphs by identifying a specific mismatched invariant.
2. **Computation fluency:** correctly computes degree sequence, girth, diameter, and component count for a given graph.
3. **Sufficiency discrimination:** explicitly states that matching invariants never proves isomorphism, and constructs or recognizes a genuine equal-invariant non-isomorphic pair.
4. **Bijection construction:** given two small isomorphic graphs with disjoint or differently-labeled vertex sets, constructs a valid adjacency-preserving bijection.
5. **Transfer:** applies the deck/reconstruction framework (P76) to compute a graph's deck and reason about reconstructible invariants.

## Tutor Recovery Strategy
If the student treats matching invariants as proof of isomorphism, work through the $C_6$/$C_3\sqcup C_3$ pair and then a second pair (the $K_{3,3}$/prism example) until the pattern — invariants matching, isomorphism still failing — becomes expected rather than surprising. If the student conflates diameter and girth, compute both explicitly on several graphs (a cycle, a tree, a complete graph) side by side until the values visibly diverge in different graphs. If the student treats isomorphism as requiring identical vertex labels, work several relabeled copies of the same small graph, constructing the bijection each time, until the label-independence is automatic.

## Memory Hooks
1. "A mismatched invariant proves NOT isomorphic — a matched one proves nothing on its own."
2. "Diameter measures the longest shortest walk between vertices; girth measures the shortest loop — unrelated numbers."
3. "Isomorphism is a bijection, not label equality — different names, same structure."

## Transfer Connections
- **`math.graph.graph`:** the graph definition (order, size, degree, adjacency) this concept's invariants are all computed FROM.
- **`math.graph.graph-operations`:** several graph operations (complement, Cartesian product) are naturally analyzed through how they transform invariants — a graph and its complement, for instance, have complementary degree sequences.
- **`math.graph.graph-coloring`:** the chromatic number is itself a graph invariant (an isomorphism-preserved quantity), joining the family introduced here, though computing it is NP-hard rather than polynomial like the invariants emphasized in this entry.

## Cross-Subject Connections
- **Computer Science (graph isomorphism problem, chemistry/network matching):** the graph isomorphism problem is directly applied in chemical structure matching (identifying identical molecules drawn differently) and network/database schema matching.
- **Cryptography and complexity theory:** the graph isomorphism problem's unresolved complexity status (neither known to be in P nor NP-complete) makes it a recurring reference point in computational complexity theory and has been used as the basis for zero-knowledge proof protocols.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.graph.graph-invariants.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on the reconstruction conjecture, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions independently confirmed against this program's own taxonomy: MC-1 Type 1 critical, MC-2 Type 3 foundational, MC-3 Type 3 moderate.
- Cross-link: KG lists no cross-links for this concept — independence mode, matching the Blueprint's own Component 7 declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.

## Version History
- **Batch 26** (2026-09-12): initial authoring, part 1 of 3 this batch (with `math.graph.graph-operations`, `math.graph.matching`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1 critical, MC-2 Type 3 foundational, MC-3 Type 3 moderate).
