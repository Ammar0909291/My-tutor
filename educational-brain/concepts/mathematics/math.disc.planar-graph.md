# math.disc.planar-graph — Planar Graphs

## Identity
- **KG ID:** `math.disc.planar-graph`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.graph`
- **Unlocks:** (none in KG)
- **Cross-links:** (none)
- **Difficulty:** proficient
- **Bloom level:** analyze
- **Mastery threshold:** 0.75 (MAMR 4/5)
- **Estimated hours:** 4

## Learning Objective
By the end of this concept, the student can: (1) define planarity (a graph is planar iff it can be drawn in the plane with no edge crossings) and apply Euler's formula $V-E+F=2$ for CONNECTED planar graphs, deriving and correctly applying the edge-density bounds $E\le3V-6$ (simple planar graphs) and $E\le2V-4$ (triangle-free planar graphs) as NECESSARY, non-sufficient tests for planarity; (2) prove $K_5$ and $K_{3,3}$ are non-planar using these bounds, correctly selecting the tighter triangle-free bound when the general bound fails to detect non-planarity; (3) apply Kuratowski's theorem (planar iff no SUBDIVISION of $K_5$ or $K_{3,3}$ as a subgraph) to certify non-planarity, correctly distinguishing "subdivision" from the stricter, incorrect "strict subgraph" reading.

## Core Understanding
A graph is PLANAR if it can be drawn in the plane (embedded) with NO edge crossings. For a CONNECTED planar graph drawn without crossings, EULER'S FORMULA states $V-E+F=2$, where $F$ counts all faces including the unbounded outer region — provable by induction on edges (removing a cycle edge decreases both $E$ and $F$ by one, preserving the formula; a tree has $F=1$ and $V-E=1$, also preserving it). This formula requires CONNECTIVITY; for a disconnected planar graph with $C$ components, the corrected formula is $V-E+F=C+1$, which reduces to the standard form exactly when $C=1$.

From Euler's formula, EDGE-DENSITY BOUNDS follow for SIMPLE planar graphs: since every face is bounded by at least 3 edges and each edge borders at most 2 faces, $3F\le2E$; combining with Euler's formula gives $E\le3V-6$. For TRIANGLE-FREE planar graphs (no 3-cycles), every face is bounded by at least 4 edges, giving the TIGHTER bound $E\le2V-4$. Both bounds are strictly NECESSARY conditions for planarity, used ONLY in the direction "if violated, definitely non-planar" — satisfying a bound never, by itself, PROVES planarity, since the bound is not sufficient. $K_5$ ($V=5,E=10$) violates $3V-6=9$, immediately confirming non-planarity. $K_{3,3}$ ($V=6,E=9$) SATISFIES the general bound ($3V-6=12\ge9$) — the general test alone is inconclusive — but $K_{3,3}$ is bipartite (hence triangle-free), and the tighter bound $2V-4=8<9$ IS violated, correctly confirming non-planarity via the sharper test.

KURATOWSKI'S THEOREM gives a complete characterization: $G$ is planar if and only if it contains NO SUBDIVISION of $K_5$ or $K_{3,3}$ as a subgraph. A SUBDIVISION of $H$ is obtained by inserting degree-2 "pass-through" vertices into $H$'s edges — a strictly WEAKER (more permissive) requirement than containing $H$ itself as a strict subgraph. This precision matters: a graph can be non-planar by hiding a subdivided (not literal) copy of $K_5$ or $K_{3,3}$ inside a larger structure, with extra vertices sitting along what were originally $K_5$'s or $K_{3,3}$'s edges — a graph containing $K_5$ or $K_{3,3}$ as a strict subgraph is obviously non-planar too, but restricting the theorem's scope to strict subgraphs alone would MISS the subdivided cases, which are equally topologically non-planar. WAGNER'S THEOREM gives an equivalent characterization using the coarser MINOR relation (allowing edge contraction, not just subdivision-insertion) instead of subdivision.

## Mental Models
1. **Rung 1 — Euler's formula is an algebraic invariant of any connected plane drawing.** $V-E+F=2$ holds regardless of the SPECIFIC embedding chosen, as long as the graph is connected and planar.
2. **Rung 2 — the edge-density bounds are one-directional filters, never planarity proofs.** "Violates the bound $\Rightarrow$ definitely non-planar" is valid; "satisfies the bound $\Rightarrow$ planar" is NOT — the bound is necessary, not sufficient.
3. **Rung 3 — choosing the RIGHT bound matters.** The general $3V-6$ bound can fail to detect non-planarity that the tighter, triangle-free-specific $2V-4$ bound catches (as with $K_{3,3}$) — checking triangle-freeness first can sharpen the available test.
4. **Rung 4 — "subdivision" is strictly weaker than "strict subgraph."** Kuratowski's theorem's precise wording ("subdivision") catches non-planarity hidden inside a larger graph via extra pass-through vertices, which a naive "contains $K_5$ literally" reading would miss.

## Why Students Fail
The edge-density bounds are typically taught and practiced as a "does the graph violate this?" non-planarity test, but the natural cognitive shortcut — treating a bound as symmetric, so that SATISFYING it should mean the opposite conclusion holds — is easy to fall into, especially since the bound's arithmetic feels decisive in either direction even though only one direction is logically valid. Separately, Euler's formula is always FIRST proved and practiced for connected graphs, so the connectivity precondition can fade into the background, leading to reflexive application of $V-E+F=2$ to disconnected planar graphs without the necessary $+C$ correction. Finally, "contains $K_5$ or $K_{3,3}$" is the natural shorthand for Kuratowski's theorem, and this shorthand is easy to internalize literally (as "strict subgraph") rather than in its precise technical sense (SUBDIVISION, permitting inserted pass-through vertices) — the shorthand's convenience actively works against the precision the theorem requires.

## Misconceptions

### MC-1: EULER-FORMULA-FOR-DISCONNECTED
- **Birth type:** Type 5 (instruction-induced) — moderate (per this Blueprint's own classification, independently confirmed)
- **Description:** Applying $V-E+F=2$ to a disconnected planar graph; the correct formula for $C$ components is $V-E+F=C+1$, reducing to the standard form only when $C=1$.
- **Why this birth type:** Instruction-induced: Euler's formula is always stated and proved for CONNECTED graphs specifically, so students practice it exclusively in that context and apply it reflexively to any planar graph without first checking connectivity — the connectivity precondition, though always present in instruction, is easy to treat as incidental rather than load-bearing.
- **Detection probe:** "Two disjoint triangles are drawn in the plane (not connected to each other). What does $V-E+F$ equal?" A student with MC-1 answers 2 (applying the connected-graph formula) instead of the correct $C+1=3$ for $C=2$ components.
- **Repair:** Verify the corrected formula concretely: two disjoint triangles have $V=6,E=6,F=3$ (two inner triangular faces plus one shared outer face), giving $6-6+3=3=1+2$ — confirming the $C+1$ correction, not the standard $2$.
- **Verification of death:** Given a novel disconnected planar graph, the student applies $V-E+F=C+1$ (with the correct component count) rather than the standard connected-graph formula.

### MC-2: KURATOWSKI-SUBDIVISION-VS-SUBGRAPH
- **Birth type:** Type 4 (notation-induced) — moderate (per this Blueprint's own classification, independently confirmed)
- **Description:** Confusing "contains $K_5$ or $K_{3,3}$ as a subgraph" with "contains a SUBDIVISION of $K_5$ or $K_{3,3}$" — the correct statement uses subdivision, which permits intermediate degree-2 vertices inserted on edges.
- **Why this birth type:** Notation-induced: "contains $K_5$ or $K_{3,3}$" is the common conversational shorthand for Kuratowski's theorem, and students memorize the shorthand rather than the precise technical term "subdivision" — the shorthand's convenience obscures that the actual theorem is more permissive (catching subdivided copies too), not restricted to literal strict-subgraph containment.
- **Detection probe:** "A graph contains $K_5$'s five high-degree vertices, but with extra degree-2 vertices inserted along some of $K_5$'s original edges. Is this still relevant to Kuratowski's theorem?" A student with MC-2 answers "no," believing $K_5$ must appear as a strict, unmodified subgraph.
- **Repair:** Construct a $K_5$ subdivision explicitly: insert 2 new degree-2 vertices onto one of $K_5$'s edges, producing a 7-vertex, 11-edge graph that is STILL non-planar, topologically equivalent to $K_5$ despite not containing $K_5$ as a literal strict subgraph.
- **Verification of death:** Given a graph with a hidden subdivided copy of $K_5$ or $K_{3,3}$ (extra pass-through vertices included), the student correctly identifies it as certifying non-planarity via Kuratowski's theorem.

### MC-3: E-LESS-THAN-3V-MINUS-6-IS-SUFFICIENT
- **Birth type:** Type 5 (instruction-induced) — foundational (per this Blueprint's own classification, independently confirmed)
- **Description:** Treating $E\le3V-6$ as a SUFFICIENT condition for planarity ("this graph satisfies the bound, so it is planar"), when the bound is necessary but not sufficient — it is a valid non-planarity test only in the "if violated, then non-planar" direction.
- **Why this birth type:** Instruction-induced: the bound is taught and practiced as a non-planarity test ("if violated, then non-planar"), and the natural but incorrect move is to flip this into a claimed biconditional — treating "satisfies the bound" as equally decisive evidence FOR planarity, when the logical structure of the theorem supports only the one direction.
- **Detection probe:** "A graph satisfies $E\le3V-6$. Is it necessarily planar?" A student with MC-3 answers "yes."
- **Repair:** Present $K_{3,3}$ as the decisive counterexample: $V=6,E=9$, and $3V-6=12\ge9$ — the bound is SATISFIED — yet $K_{3,3}$ is non-planar (confirmed instead by the tighter triangle-free bound $2V-4=8<9$). State the correct logic chain: $E>3V-6\Rightarrow$ definitely non-planar; $E\le3V-6\Rightarrow$ undetermined, requiring further checking (e.g. the triangle-free bound, or Kuratowski's theorem directly).
- **Verification of death:** Given a graph satisfying $E\le3V-6$, the student does not conclude planarity from that fact alone, and instead pursues further verification (a tighter bound or Kuratowski's theorem).

## Analogies
1. **The fire-code-violation analogy.** The edge-density bound is like a building's occupancy limit: exceeding it definitely means the building violates fire code (non-planar) — but staying under the limit doesn't automatically mean every OTHER fire-code requirement is met (planarity requires more than just the edge count).
2. **The disguised-culprit analogy.** A $K_5$ subdivision is like a suspect wearing a disguise (extra degree-2 vertices along the edges) — still fundamentally the same "culprit" (topologically equivalent to $K_5$), and Kuratowski's theorem is written precisely to catch the disguise, not just the undisguised original.

## Demonstrations
### Demonstration 1 — proving $K_5$ and $K_{3,3}$ non-planar, breaking MC-3 (mirrors Blueprint's A01)
$K_5$: $V=5,E=10$, $3V-6=9<10$ — violates the general bound, immediately non-planar. $K_{3,3}$: $V=6,E=9$, $3V-6=12\ge9$ — general bound SATISFIED (inconclusive); but $K_{3,3}$ is bipartite (triangle-free), so the tighter bound applies: $2V-4=8<9$ — violated, confirming non-planarity via the sharper test.

### Demonstration 2 — the disconnected Euler formula correction, breaking MC-1 (mirrors Blueprint's TB-R01 Step 1)
Two disjoint triangles: $V=6,E=6,F=3$ (two inner faces plus one shared outer face), $C=2$: $6-6+3=3=1+2=C+1$ — confirming the corrected formula, not the standard connected-graph $V-E+F=2$.

### Demonstration 3 — subdivision vs. strict subgraph, breaking MC-2 (mirrors Blueprint's TB-R02)
Starting from $K_5$ (5 vertices, 10 edges), inserting 2 new degree-2 vertices on one edge produces a 7-vertex, 11-edge graph — still non-planar, still a genuine "$K_5$ subdivision," despite $K_5$ itself no longer appearing as a literal, unmodified subgraph.

## Discovery Questions
1. "If the edge-density bound is violated, you know the graph is non-planar for sure. If the bound is SATISFIED instead, does that tell you the graph definitely IS planar — or just that this particular test didn't catch anything?"
2. "Euler's formula $V-E+F=2$ was proved assuming the graph is connected. What might go wrong if you applied it directly to a graph made of two completely separate pieces?"
3. "If you insert a few extra 'pass-through' vertices along $K_5$'s edges, does the resulting graph become any LESS non-planar — or is it topologically still 'the same shape' as $K_5$?"

## Teaching Sequence
Best taught by **direct instruction of Euler's formula and the edge-density bounds, with guided discovery of the necessary-vs-sufficient distinction and the subdivision concept** — the formulas themselves are efficiently derived and stated directly, but Discovery Questions 1 and 3 let the student predict the LOGICAL STRUCTURE (one-directional test; subdivision as "same shape, extra vertices") themselves before the precise technical statement is confirmed, building genuine understanding of why the theorems are worded exactly as they are.
1. Introduce planarity and derive Euler's formula directly, with the connectivity precondition emphasized.
2. Pose Discovery Question 2, then work Demonstration 2's disconnected correction (targeting MC-1).
3. Derive the edge-density bounds directly; pose Discovery Question 1 before working Demonstration 1's $K_5$/$K_{3,3}$ proof (targeting MC-3).
4. Introduce Kuratowski's theorem; pose Discovery Question 3 before working Demonstration 3's subdivision construction (targeting MC-2).
5. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On an edge-density-bound check that is SATISFIED:** always ask "does satisfying this bound prove planarity, or just fail to disprove it?" before letting the student conclude planarity.
2. **On a disconnected planar graph:** always require the student to check connectivity first and apply the corrected $C+1$ formula if needed.
3. **On a "contains $K_5$" claim:** require the student to specify whether they mean a strict subgraph or a subdivision, surfacing MC-2 explicitly.
4. **On a bound-selection decision:** ask "is this graph triangle-free? If so, which bound is tighter?" before defaulting to the general $3V-6$ bound alone.

## Voice Teaching Notes
1. **Register:** rigorous and logically precise — this concept's central discipline is respecting the one-directional structure of necessary-but-not-sufficient tests, so language should consistently flag which direction of an implication is actually being used.
2. **Load-bearing sentence, spoken slowly:** "Violating the bound proves non-planarity — satisfying it proves nothing either way."
3. **Wait time:** pause after posing Discovery Question 1, giving the student space to reason about the asymmetry of the test before the $K_{3,3}$ counterexample confirms it.

## Assessment Signals
1. **Gate concept:** correctly applies Euler's formula to a novel connected planar graph and computes the correct face count.
2. **Bound-direction discrimination:** given a graph satisfying the edge-density bound, does not conclude planarity from that fact alone.
3. **Disconnected-formula accuracy:** correctly applies the $C+1$ correction to a novel disconnected planar graph.
4. **Subdivision precision:** correctly identifies a subdivided (not strict-subgraph) copy of $K_5$ or $K_{3,3}$ as certifying non-planarity via Kuratowski's theorem.
5. **Transfer:** applies the appropriate edge-density bound (general or triangle-free) and Kuratowski's theorem to a novel graph, correctly determining planarity or non-planarity.

## Tutor Recovery Strategy
If the student treats a satisfied bound as proof of planarity, work through the $K_{3,3}$ counterexample (Demonstration 1) explicitly every time until the necessary-vs-sufficient distinction becomes an automatic check rather than an afterthought. If the student conflates subdivision with strict subgraph, have them construct several subdivisions of $K_5$ or $K_{3,3}$ themselves (inserting varying numbers of pass-through vertices) until the "same topological shape, extra vertices" framing becomes concrete.

## Memory Hooks
1. "Violate the bound: definitely non-planar. Satisfy it: undetermined, not proven planar."
2. "Euler's formula needs connectivity — disconnected graphs need the $+C$ correction."
3. "Subdivision, not strict subgraph — Kuratowski catches $K_5$/$K_{3,3}$ even in disguise."

## Transfer Connections
- **`math.disc.graph`:** the vertex/edge/degree vocabulary this concept's planarity definitions and edge-density bounds directly build on.
- **`math.disc.graph-coloring`:** the Four Color Theorem's planar-graph scope directly connects to this concept's planarity characterization.

## Cross-Subject Connections
- **Computer Science (circuit board design, VLSI):** planarity directly determines whether a circuit can be laid out on a single board layer without wire crossings, a foundational constraint in physical chip design.
- **Cartography (map design, geographic information systems):** planar graph theory underlies map-coloring problems and geographic network representations where physical layout constraints matter.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.planar-graph.md` — reused by reference throughout (Learning Objective, worked examples, misconception inventory MC-1–MC-3 with birth types already assigned in the Blueprint itself and confirmed independently here, transfer probe). Not restated verbatim; this entry adds the mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- No genuine content-overlap was found with sibling `math.disc` graph-theory entries authored this campaign (`graph-coloring`, `graph-connectivity`, `graph-types`, `euler-hamiltonian`, `graph-trees`) — this entry's planarity/embedding content is structurally distinct from coloring, connectivity, classification, and traversal properties, though its Four Color Theorem connection to `graph-coloring` is noted as a genuine, non-duplicative cross-reference.
- This entry completes this batch's 3-concept authoring, bringing the graph-theory subtree's coverage substantially forward; the domain's remaining unauthored concepts (spanning-tree, graph-coloring's further extensions, and others) are candidates for future batches.

## Version History
- **Batch 22** (2026-09-11): initial authoring, part 3 of 3 this batch (with `math.disc.euler-hamiltonian` and `math.disc.graph-trees`). Blueprint reused by reference, including its own already-assigned birth-type classifications (MC-1 Type 5 moderate, MC-2 Type 4 moderate, MC-3 Type 5 foundational), independently confirmed.
