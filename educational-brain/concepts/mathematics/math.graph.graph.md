# math.graph.graph — Graph (Order, Size, Weighted & Multigraph Extensions)

## Identity
- **KG ID:** `math.graph.graph`
- **Domain:** math.graph (Graph Theory)
- **Requires:** `math.found.set-theory`
- **Unlocks:** `math.graph.connectivity`, `math.graph.tree`
- **Cross-links:** `math.disc.graph` (already authored — see Blueprint References)
- **Difficulty:** developing
- **Bloom level:** understand
- **Mastery threshold:** 0.9 (MAMR 5/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) state a graph's ORDER ($n=|V|$, vertex count) and SIZE ($m=|E|$, edge count) and correctly treat them as independent counts, not linked quantities; (2) restate the Handshaking Lemma using order/size notation ($\sum_v\deg(v)=2m$), building directly on the vertex/edge/degree vocabulary already established in `math.disc.graph`; (3) distinguish four graph families by edge structure — simple undirected, directed, WEIGHTED (edges carry a numeric label), and MULTIGRAPH (multiple edges permitted between the same vertex pair) — and correctly classify a real-world network as the appropriate family.

## Core Understanding
This concept is deliberately NOT a re-teaching of what a graph is — `math.disc.graph` already owns the foundational vertex/edge/directed-vs-undirected/self-loop/degree/Handshaking-Lemma content. This concept extends that foundation into the field's standard ORDER/SIZE terminology and two genuine structural generalizations.

A graph's ORDER, $n=|V|$, is the number of vertices. Its SIZE, $m=|E|$, is the number of edges. These are easy to conflate — both are "a count for the graph" — but they measure independent things: high order (many vertices) can coexist with low size (few edges, e.g. mostly isolated vertices), and a simple graph on $n$ vertices has AT MOST $\binom{n}{2}$ edges, but nothing forces order and size toward each other below that ceiling.

Restated in this notation, the Handshaking Lemma from `math.disc.graph` is identical content with a new symbol: $\sum_{v\in V}\deg(v)=2m$ — the same $\sum\deg=2|E|$ fact, just written with $m$ in place of $|E|$.

Beyond simple graphs, two genuine extensions matter for modeling real networks:
- A **WEIGHTED graph** attaches a numeric label (weight) to each edge — e.g. a road network where each edge's weight is distance or travel time. Adding weights does NOT change which vertices are connected to which; the underlying connectivity structure is untouched, weights add information on top of it.
- A **MULTIGRAPH** permits MORE THAN ONE edge between the same vertex pair — e.g. two different airlines both operating a direct route between the same two cities, each a distinct edge despite connecting the identical pair. In a multigraph, degree counts EDGES, not distinct neighboring vertices — the Handshaking Lemma still holds exactly as stated, because it was always defined via edge-incidences, not neighbor-counts.

## Mental Models
1. **Rung 1 — order and size are two independent counts, one over $V$, one over $E$.** Neither determines the other; they are constrained only by which edges actually exist.
2. **Rung 2 — a weight is data attached ON TOP of an edge that already exists.** The connectivity skeleton underneath a weighted graph is identical to the same graph with weights stripped off.
3. **Rung 3 — a multigraph relaxes "at most one edge per pair," not the definition of degree.** Degree still counts edge-incidences one by one; a multigraph simply allows more of them between the same two vertices.
4. **Rung 4 — the Handshaking Lemma's coefficient of 2 comes from "every edge has two ends," and this is UNCHANGED by weights or multiplicity** — a weighted or multigraph edge still has exactly two endpoints, so $\sum\deg(v)=2m$ survives both extensions unmodified.

## Why Students Fail
Order and size are conflated because both are "a single number describing the graph," and without deliberately contrasting them (a graph with order 6 and size 4 looks unremarkable once drawn but can feel wrong in the abstract if a student has silently assumed vertex count and edge count move together). The weighted-graph confusion arises because a weighted diagram LOOKS visually different — labeled edges — inviting students to treat it as a different kind of object rather than the same graph with an extra attribute; this is a category error between STRUCTURE (who connects to whom) and DECORATION (a number sitting on an existing connection). The multigraph-degree error is the more serious one: a student who has internalized "degree = number of neighbors" (a reasonable shortcut in a SIMPLE graph, where it happens to coincide with edge-count) will apply that shortcut in a multigraph, where it silently breaks, because two parallel edges to the same neighbor are one neighbor but two incidences.

## Misconceptions

### MC-1: ORDER-SIZE-ASSUMED-EQUAL
- **Birth type:** Type 1 (overgeneralization) — moderate
- **Description:** Believing a graph's order (vertex count) and size (edge count) must be equal or otherwise directly linked, rather than independent counts.
- **Why this birth type:** An overgeneralization from small worked examples where order and size happen to coincide (a cycle graph $C_n$ has $n$ vertices AND $n$ edges) — the student extends a coincidental equality observed in one family of graphs into an assumed general law, rather than recognizing it as a special property of cycles specifically.
- **Detection probe:** "If a graph has order 6, does it necessarily have size 6 too?" A student with MC-1 answers "yes."
- **Repair:** Present a graph with clearly mismatched order and size (e.g. order 6, size 4 — several isolated or sparsely-connected vertices) and have the student verify by direct count that both numbers are independently determined by the actual edge set, not by each other.
- **Verification of death:** Given a novel graph with deliberately different order and size, the student states both correctly without hesitation and does not expect them to match.

### MC-2: WEIGHTED-GRAPH-DIFFERENT-OBJECT
- **Birth type:** Type 2 (perceptual intuition) — moderate
- **Description:** Believing a weighted graph is a fundamentally different kind of mathematical structure rather than the same underlying graph with numeric labels added to its edges.
- **Why this birth type:** A perceptual-intuition error: a weighted diagram visually LOOKS different (numbers annotate every edge), and that surface-level visual distinction is mistaken for a structural one — the student has not yet separated "what the picture shows" from "what mathematical object the picture represents."
- **Detection probe:** "Does adding distances to a road network's edges change which towns are connected to which?" A student with MC-2 answers "yes" or hesitates.
- **Repair:** Draw the identical graph twice — once unweighted, once with weights added — and have the student trace, edge by edge, that the SAME pairs of vertices are connected in both drawings; only the labels differ.
- **Verification of death:** Given a weighted graph, the student correctly identifies its underlying unweighted connectivity structure by simply ignoring the weight labels.

### MC-3: MULTIGRAPH-DEGREE-BY-NEIGHBOR-COUNT
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** In a multigraph, counting a vertex's degree by its number of distinct neighboring vertices rather than by its number of incident edges.
- **Why this birth type:** An overgeneralization of the simple-graph shortcut "degree = number of neighbors," which happens to be CORRECT in a simple graph (where at most one edge connects any pair) but silently fails the moment more than one edge is permitted between the same pair — the student has generalized a rule that was only ever valid under an unstated simple-graph assumption.
- **Detection probe:** "In a multigraph, vertex X has two distinct edges to vertex Y and no other edges. What is deg(X)?" A student with MC-3 answers 1 instead of 2.
- **Repair:** State explicitly: "in a multigraph, degree counts EDGES, not distinct neighbors" — have the student recount by tracing each individual edge's incidence at the vertex, one at a time, rather than counting distinct neighbor labels.
- **Verification of death:** Given a multigraph with parallel edges, the student correctly computes degree by edge-incidence and verifies the Handshaking Lemma still holds with that count.

## Analogies
1. **The road-map-with-distances analogy (targets MC-2).** A road map with distances written on each road is still the SAME road map as one without distances — the roads connect the same towns either way; the numbers are extra information layered on top, not a redefinition of which roads exist.
2. **The multiple-flight-routes analogy (targets MC-3).** Two different airlines both flying nonstop between the same two cities are two SEPARATE flights (two edges), even though they connect the identical pair of cities (one neighbor relationship) — a traveler counting "how many flight options do I have from this city" must count flights, not distinct destinations.

## Demonstrations
### Demonstration 1 — order and size as independent counts (mirrors Blueprint Ex1)
A graph has $V=\{A,B,C,D,E\}$ and $E=\{\{A,B\},\{B,C\},\{C,D\},\{D,E\},\{E,A\}\}$ — a 5-cycle. Order: $n=|V|=5$. Size: $m=|E|=5$. (This particular example has order = size, which is exactly the cycle-specific coincidence MC-1 overgeneralizes from — contrasted immediately by Demonstration 1b: a star graph on the same 5 vertices, $E=\{\{A,B\},\{A,C\},\{A,D\},\{A,E\}\}$, has order 5 but size only 4.)

### Demonstration 2 — Handshaking Lemma in order/size notation (mirrors Blueprint Ex2)
For Demonstration 1's 5-cycle, every vertex has degree 2. Check: $\sum\deg(v)=5\times2=10=2m=2(5)=10$. ✓ — identical arithmetic to `math.disc.graph`'s own Demonstration 3, now expressed with $m$.

### Demonstration 3 — classifying a real network, breaking MC-2 and MC-3 (mirrors Blueprint Ex3)
A city's public-transit map has bus stops as vertices; between some stop pairs there are TWO separate bus routes (a multigraph feature), and each edge is labeled with its average travel time (a weight). This network is a **weighted multigraph** — neither a simple graph nor a plain directed graph captures both features. If stop X has two separate routes to stop Y and no other edges, $\deg(X)=2$ (two edge-incidences), not 1 (one distinct neighbor).

## Discovery Questions
1. "You've seen a 5-vertex graph where order and size were both 5. Can you draw a different 5-vertex graph where order and size are NOT equal? What does that tell you about whether order determines size?"
2. "If I draw the same road network twice — once with distances labeled, once without — have I drawn two different graphs, or the same graph shown two ways?"
3. "In a network where two separate bus routes connect the same two stops, is that one connection or two? What should 'degree' count — the number of routes, or the number of stops you can reach?"

## Teaching Sequence
Best taught by **direct instruction with embedded contrast pairs** — order/size terminology and the weighted/multigraph extensions are notational and structural conventions, not concepts a student could independently derive; the discovery questions serve to surface intuitions before confirming the correct convention, not to have the student invent the terminology from scratch.
1. Briefly recall `math.disc.graph`'s vertex/edge/degree vocabulary, then introduce order ($n$) and size ($m$) via Demonstration 1, posing Discovery Question 1 before revealing Demonstration 1b's contrast.
2. Restate the Handshaking Lemma in order/size notation via Demonstration 2.
3. Introduce weighted graphs by contrast, posing Discovery Question 2 before confirming that weights are decoration, not structure.
4. Introduce multigraphs by contrast, posing Discovery Question 3 before confirming the edge-incidence definition of degree.
5. Work Demonstration 3 as a combined applied classification exercise.
6. Assess with the P77 problem set and cross-link transfer probe.

## Tutor Actions
1. **On introducing order and size:** always have the student count BOTH explicitly for a worked example before naming which is which, so the two counts are anchored to genuinely separate tallies rather than one combined impression.
2. **On a weighted graph:** ask the student to first identify the underlying connectivity (ignoring weights), then add weights back in, to keep the two layers (structure vs. decoration) explicitly separated.
3. **On a multigraph's degree:** require the student to trace and count each individual edge-incidence at the vertex aloud, rather than accepting a neighbor-count shortcut.
4. **On the Handshaking Lemma's robustness:** explicitly confirm that the factor of 2 survives BOTH extensions unmodified, since every edge — weighted or not, in a multigraph or not — still has exactly two endpoints.

## Voice Teaching Notes
1. **Register:** concrete and visual, consistent with `math.disc.graph` — order/size terminology and the weighted/multigraph extensions benefit from being anchored to a drawn or described network rather than pure symbolic manipulation.
2. **Load-bearing sentence, spoken slowly:** "A weight is extra information sitting ON TOP of an edge that already exists — it never changes who's connected to whom."
3. **Wait time:** pause after Discovery Question 3 (the multigraph degree question), giving the student space to notice the tension between "one neighbor" and "two routes" before resolving it.

## Assessment Signals
1. **Gate concept:** correctly states both order and size for a novel graph and confirms they are independent counts.
2. **Handshaking Lemma in order/size notation:** correctly verifies $\sum\deg(v)=2m$ for a novel graph.
3. **Weighted-graph discrimination:** correctly identifies that adding or removing weight labels does not change a graph's connectivity structure.
4. **Multigraph degree accuracy:** correctly computes a vertex's degree in a multigraph by edge-incidence, not neighbor-count.
5. **Transfer:** correctly classifies a novel real-world network among simple/directed/weighted/multigraph, justifying each part of the classification.

## Tutor Recovery Strategy
If the student conflates order and size, work through several graphs with deliberately mismatched counts (both directions — order exceeding size, and dense small graphs where size approaches $\binom{n}{2}$) until the independence becomes concrete. If the student treats a weighted graph as a different object, have them physically redraw a weighted graph with the weight labels erased and confirm the connectivity is unchanged before re-adding weights. If the student undercounts a multigraph vertex's degree, have them number each edge at that vertex individually (edge 1, edge 2, ...) and count the numbers rather than the distinct endpoints.

## Memory Hooks
1. "Order counts corners, size counts connections — and neither one decides the other."
2. "A weight is a sticky note on an edge that's already there."
3. "In a multigraph, count the routes, not the destinations."

## Transfer Connections
- **`math.disc.graph`:** the foundational vertex/edge/directed-vs-undirected/self-loop/degree/Handshaking-Lemma content this concept extends into order/size terminology and the weighted/multigraph generalizations — cross-linked directly (see Blueprint References).
- **`math.graph.connectivity`:** builds directly on this concept's order/size vocabulary to develop paths, connectedness, and Menger's theorem.
- **`math.graph.tree`:** trees are characterized in part by the exact order/size relation $m=n-1$, a direct application of this concept's order/size framing.

## Cross-Subject Connections
- **Computer Science (weighted networks, multigraphs in practice):** weighted graphs model networks with costs (routing, scheduling); multigraphs model systems with genuinely parallel connections (multiple communication channels, parallel edges in transportation networks).
- **Physics/Engineering (circuit analysis):** electrical circuits are frequently modeled as weighted multigraphs, with edge weights as resistances/impedances and multigraph structure arising from multiple parallel components between the same two nodes.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.graph.graph.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, cross-link transfer probe P76). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. This Blueprint pre-assigns no birth types; birth types classified independently here (MC-1 Type 1, MC-2 Type 2, MC-3 Type 1) against this program's own 6-type taxonomy — MC-1 and MC-3 differ in this entry's classification from the Blueprint's own MC-1/MC-3 labels ("ORDER-SIZE-ASSUMED-EQUAL"/"MULTIGRAPH-DEGREE-BY-NEIGHBOR-COUNT"), which the Blueprint itself does not birth-type; both are classified here as Type 1 (overgeneralization) rather than treated as sui generis, since each is a shortcut valid in a narrower case (cycles; simple graphs) incorrectly extended to the general case.
- Cross-link: `docs/curriculum/blueprints/math.disc.graph.md` — the sibling foundational Blueprint this concept's own Blueprint explicitly divides labor against (see the Blueprint's own Component 7). Its already-authored EB entry, `educational-brain/concepts/mathematics/math.disc.graph.md`, was read directly to ground this entry's Transfer Connections and to verify no content duplication (that entry owns vertex/edge/directed/self-loop/Handshaking-Lemma foundations; this entry owns order/size terminology plus weighted/multigraph extensions only).

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- This is the first `math.graph` concept authored — the domain's root node. It opens `math.graph` (16 concepts total) as a genuinely distinct, deeper-formalism domain paralleling several already-authored `math.disc` graph-theory entries (`graph`, `graph-connectivity`, `graph-trees`, `euler-hamiltonian`, `graph-coloring`), each of which named `math.graph`'s sibling concept as a Blueprint-exists-no-EB-yet cross-link. This entry's authoring begins closing that gap: `math.disc.graph`'s own Curriculum Feedback (Batch 20) can now be considered partially resolved, though that entry is not modified here per this program's no-retroactive-rewrite convention.
- The KG's `unlocks` for this concept (`math.graph.connectivity`, `math.graph.tree`) are both already topologically ready per this concept's own authoring (their sole `requires` are `math.disc.graph-connectivity`/`math.disc.graph-trees`, already authored) — this concept's own authoring does not gate them, but pedagogically it makes sense to teach this concept first, which this batch does.

## Version History
- **Batch 24** (2026-09-12): initial authoring, part 1 of 3 this batch (with `math.graph.tree` and `math.graph.minimum-spanning-tree`), opening the `math.graph` domain. Blueprint reused by reference; 3 misconceptions birth-type classified independently (MC-1 Type 1 moderate, MC-2 Type 2 moderate, MC-3 Type 1 foundational).
