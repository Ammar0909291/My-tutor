# math.graph.minimum-spanning-tree — Minimum Spanning Tree (Cut/Cycle Properties, Kruskal's & Prim's Algorithms)

## Identity
- **KG ID:** `math.graph.minimum-spanning-tree`
- **Domain:** math.graph (Graph Theory)
- **Requires:** `math.disc.spanning-tree`
- **Unlocks:** none
- **Cross-links:** `math.disc.spanning-tree` (already authored — see Blueprint References; the Blueprint itself, authored before that entry existed, declares independence mode, but this EB entry substantively incorporates it since it now exists)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 4

## Learning Objective
By the end of this concept, the student can: (1) define a minimum spanning tree (MST) of a connected weighted graph, state that an MST always exists and need not be unique, and explain the CUT PROPERTY (the minimum-weight edge crossing any cut belongs to some MST) and CYCLE PROPERTY (the maximum-weight edge of any cycle belongs to no MST) that together justify greedy correctness; (2) execute KRUSKAL'S algorithm (sort edges, add if acyclic) and PRIM'S algorithm (grow from a vertex via the minimum frontier edge) on explicit weighted graphs, and state their time complexities; (3) apply MST algorithms to network design problems, recognize when an MST is unique, and distinguish MST from a shortest-path tree.

## Core Understanding
A weighted graph $G=(V,E,w)$ assigns a real weight $w(e)$ to each edge; the weight of a subgraph is the sum of its edge weights. A **minimum spanning tree (MST)** is a spanning tree minimizing total weight. Since a connected graph has at least one spanning tree and finitely many of them, a minimum-weight one always exists; if all edge weights are DISTINCT, the MST is UNIQUE.

Two properties together justify why greedy algorithms work for this problem — a genuinely rare situation, since greedy strategies fail for most optimization problems (e.g. shortest paths from a source require Dijkstra's careful relaxation, not pure greedy):
- **Cut property**: if $e$ is the UNIQUE minimum-weight edge crossing some cut $(S,V\setminus S)$, then $e$ belongs to EVERY MST.
- **Cycle property**: if $e$ is the UNIQUE maximum-weight edge in some cycle, then $e$ belongs to NO MST.

**Kruskal's algorithm**: sort all edges by weight ascending; add each edge to the growing forest if and only if it does not create a cycle (checked via Union-Find in near-constant time per operation); stop once $n-1$ edges are added. Total complexity $O(m\log m)$, dominated by sorting. Correctness follows from the cut property: each added edge is the minimum-weight edge crossing SOME cut with no cheaper alternative yet available.

**Prim's algorithm**: start from any vertex $s$ with $S=\{s\}$; repeatedly add to the tree the minimum-weight edge with one endpoint in $S$ and one outside, expanding $S$ by one vertex each step. Complexity $O(m\log n)$ with a binary heap. Correctness follows directly and explicitly from the cut property — each added edge is exactly the minimum-weight edge crossing the current cut $(S,V\setminus S)$.

Kruskal's and Prim's are BOTH RESTRICTED greedy strategies relative to naive "always pick the cheapest edge overall": Kruskal's restricts by rejecting cycle-forming edges; Prim's restricts by only considering edges crossing the current frontier cut. They always agree on WHICH edges form the MST (when weights are distinct, since the MST is then unique) but discover them in different orders.

An **MST minimizes TOTAL weight**, which is a fundamentally different objective from a **shortest-path tree** (e.g. Dijkstra's tree from a source $s$), which minimizes each INDIVIDUAL path length from $s$. These can differ structurally even on the same graph — the MST is the cheapest way to CONNECT everything; a shortest-path tree is the fastest way to REACH everything from one particular vertex.

## Mental Models
1. **Rung 1 — the cut property and cycle property are the SAME logical fact viewed from opposite directions.** An edge that is cheapest across some cut belongs to every MST; an edge that is priciest around some cycle belongs to none. Both properties follow from "an MST cannot be improved by swapping in a cheaper alternative that preserves spanning-tree-ness."
2. **Rung 2 — Kruskal's and Prim's are both greedy, but RESTRICTED greedy, not unrestricted.** Neither picks "the single cheapest edge left in the whole graph" unconditionally; each applies exactly one structural restriction (acyclicity for Kruskal, frontier-crossing for Prim) that makes greedy provably correct here.
3. **Rung 3 — an MST answers "cheapest way to connect everyone," a shortest-path tree answers "fastest way to reach everyone from HERE."** These are genuinely different engineering questions with genuinely different correct answers on the same graph.
4. **Rung 4 — uniqueness of the MST is guaranteed by DISTINCT weights, but not REQUIRED by them.** Distinct weights are a sufficient condition for uniqueness, not a necessary one; some graphs with repeated weights still happen to have a unique MST.

## Why Students Fail
Kruskal's and Prim's are frequently taught as two separate algorithms to memorize independently, without the unifying insight that BOTH are direct applications of the cut property — so a student can execute either algorithm correctly while being unable to explain WHY either one works, or to recognize that a third algorithm (Borůvka's, in the transfer probe) is correct for the identical underlying reason. The MST-vs-shortest-path-tree confusion arises because both are "trees built from a weighted graph using a greedy-flavored procedure," inviting students to conflate the two DIFFERENT optimization objectives they solve — total connection cost vs. per-vertex reachability cost from one source. The uniqueness misconception (confusing "distinct weights guarantee uniqueness" with "uniqueness requires distinct weights") is a classic sufficient-vs-necessary-condition slip: the biconditional students actually need is subtler than the one-directional implication that gets remembered.

## Misconceptions

### MC-1: GREEDY-ALWAYS-GIVES-MST
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Believing that greedily adding the globally cheapest available edge at every step always yields the MST, without distinguishing Prim's RESTRICTED greedy (cheapest edge crossing the current frontier cut) from Kruskal's RESTRICTED greedy (cheapest edge overall that doesn't create a cycle) — both correct, for the same underlying reason (the cut property), but via different restrictions.
- **Why this birth type:** An overgeneralization of "greedy algorithms are simple, so surely any reasonable greedy rule works here" — the student has not yet internalized that MST is a special case where greedy provably succeeds ONLY under one of two specific restrictions, and that unrestricted greedy (ignoring cycles entirely, or ignoring the frontier) would fail.
- **Detection probe:** "Do Prim's and Kruskal's always add edges in the same ORDER?" A student with MC-1 answers "yes" or cannot explain why they might differ despite finding the same tree.
- **Repair:** Run both algorithms side by side on one example (Demonstration 2), explicitly tracking WHICH restriction each algorithm applies at each step — Kruskal's rejects an edge for creating a cycle; Prim's simply never considers an edge that doesn't cross the current frontier. Both restrictions independently implement the cut property.
- **Verification of death:** Given a novel weighted graph, the student correctly predicts that Kruskal's and Prim's may process edges in different orders while landing on the same MST (when weights are distinct), and can explain why each restriction is necessary for correctness.

### MC-2: UNIQUE-WEIGHTS-NOT-REQUIRED-FOR-UNIQUENESS
- **Birth type:** Type 4 (notation-induced) — moderate
- **Description:** Confusing the sufficient condition (all weights distinct → MST unique) with a necessary one, rather than recognizing that some graphs with repeated weights still have a unique MST.
- **Why this birth type:** Notation-induced: the "distinct weights → unique MST" theorem is typically stated and used as a one-directional implication, and the compressed if-then phrasing is easily misread as an if-and-only-if — the correct relationship is genuinely asymmetric (sufficient but not necessary) and the standard phrasing does not visually flag that asymmetry.
- **Detection probe:** "$K_3$ (a triangle) has all edges weight 1 — is its MST unique? A path $P_3$ also has all edges weight 1 — is ITS MST unique?" A student with MC-2 answers both the same way, or assumes repeated weights automatically mean non-uniqueness in both cases.
- **Repair:** Work both examples explicitly: $K_3$ with all weights 1 has THREE distinct spanning trees (any 2-edge path formed by dropping one edge), all tied at weight 2, so the MST is NOT unique; $P_3$ (a path) has only ONE spanning tree total (itself), so its MST IS unique despite repeated weights — because there was never a competing tree to tie with.
- **Verification of death:** Given a graph with repeated edge weights, the student checks the ACTUAL SET of competing minimum-weight spanning trees rather than assuming uniqueness or non-uniqueness from the weight pattern alone.

### MC-3: MST-GIVES-SHORTEST-PATHS
- **Birth type:** Type 6 (analogy overextension) — critical
- **Description:** Believing the MST provides shortest paths between all pairs of vertices, rather than recognizing that the MST minimizes total edge weight across the whole tree, which is a different objective from minimizing individual path lengths.
- **Why this birth type:** An overextension of the general intuition "the best/cheapest structure should also give the best/fastest routes" — a reasonable-sounding heuristic in many everyday contexts, but false here because "cheapest to build overall" and "fastest to travel between any two specific points" are provably different optimization criteria that can produce structurally different trees on the same graph.
- **Detection probe:** "If an MST is built for a city road network, does the path between two specific cities IN THE MST give the shortest route between them?" A student with MC-3 answers "yes."
- **Repair:** Work Demonstration 3, constructing a graph where the MST and the Dijkstra shortest-path tree from a source genuinely differ in structure, and have the student measure path lengths in both trees to see the MST's path can be longer.
- **Verification of death:** Given a graph, the student correctly explains that the MST answers "cheapest way to connect everyone" while a shortest-path tree answers "fastest way to reach everyone from one source," and constructs an example where the two trees differ.

## Analogies
1. **The restricted-shopping-list analogy (targets MC-1).** Kruskal's is like shopping from a master price-sorted list but skipping any item that would duplicate something you already own (cycle-avoidance); Prim's is like only ever buying from the shop nearest your current location (frontier-restriction) — both restrictions, applied consistently, lead to the same total minimum spend, just via different shopping orders.
2. **The infrastructure-budget-vs-commute-time analogy (targets MC-3).** A city government building the cheapest possible road network to connect every neighborhood (MST) is solving a DIFFERENT problem than a single commuter trying to find the fastest route from their house to every destination (shortest-path tree) — the cheapest overall network need not contain anyone's fastest individual route.

## Demonstrations
### Demonstration 1 — cut and cycle properties (mirrors Blueprint Ex1)
Graph on $\{a,b,c,d\}$: edges $ab=1$, $ac=3$, $bc=2$, $bd=4$, $cd=5$. Cut $(\{a\},\{b,c,d\})$: cut edges $ab=1$, $ac=3$; minimum is $ab=1$ → cut property: $ab$ is in every MST. Cycle $a$-$b$-$c$-$a$: edges $ab=1,bc=2,ac=3$; maximum is $ac=3$ → cycle property: $ac$ is in no MST. Resulting MST: $\{ab=1, bc=2, bd=4\}$, total weight 7.

### Demonstration 2 — Kruskal's and Prim's side by side, breaking MC-1 (mirrors Blueprint Ex2)
Using Demonstration 1's graph, sorted edges: $ab=1, bc=2, ac=3, bd=4, cd=5$. **Kruskal's**: add $ab$ (no cycle) ✓; add $bc$ (no cycle) ✓; skip $ac$ (would create cycle $a$-$b$-$c$-$a$) ✗; add $bd$ (no cycle) ✓ — done, $n-1=3$ edges, MST $\{ab,bc,bd\}$, weight 7. **Prim's from $a$**: frontier initially $\{ab=1,ac=3\}$, add $ab$ (cheapest); frontier now includes $bc=2, bd=4$ (plus $ac=3$, already in $S$'s reach from $a$) — add $bc$ (cheapest); frontier now $bd=4$ — add $bd$. Both algorithms reach the identical MST via different discovery ORDERS, confirming MC-1's target distinction.

### Demonstration 3 — MST vs. shortest-path tree, breaking MC-3 (mirrors Blueprint Ex3)
Graph on $\{s,a,b,t\}$: $sa=1, ab=1, bt=1, sb=5, st=10$. Kruskal's MST: add $sa=1, ab=1, bt=1$ — path $s$-$a$-$b$-$t$, weight 3; this happens to coincide with the Dijkstra shortest-path tree here. Modify by adding edge $at=2$: Dijkstra now gives $d(t)=3$ via $s\to a\to t$ (cost $1+2=3$) — a DIFFERENT path than before. Kruskal's, however, still rejects $at=2$ (it would create a cycle $a$-$b$-$t$-$a$ once $ab$ and $bt$ are already in) and keeps the same MST $\{sa,ab,bt\}$, weight 3. The MST's $s$-to-$t$ path remains $s$-$a$-$b$-$t$ (length 3 via 3 hops) while the graph's genuinely shortest path is now $s$-$a$-$t$ (length 3 via 2 hops, tied in total weight but structurally different) — demonstrating the MST and shortest-path tree can diverge in STRUCTURE even when total weights coincide.

## Discovery Questions
1. "Does always picking the single cheapest UNUSED edge in the entire graph — with no other restriction — always give you a valid spanning tree? What could go wrong?"
2. "If two different algorithms both correctly find an MST but process the edges in different orders, does that mean one of them is wrong? What has to be true for their final answer to be forced to agree?"
3. "If I build the cheapest possible road network connecting five cities, does the route between any two specific cities IN that network have to be the fastest possible route between them?"

## Teaching Sequence
Best taught by **direct instruction establishing the cut and cycle properties FIRST, before either algorithm** — students who understand the properties can derive both algorithms' correctness from first principles, rather than memorizing two separate proofs; the discovery questions surface intuitions before the properties are named.
1. Introduce weighted graphs and the MST objective via Demonstration 1's setup, posing Discovery Question 1 before revealing the cut and cycle properties.
2. Run Kruskal's and Prim's side by side via Demonstration 2, posing Discovery Question 2 before confirming both restrictions independently implement the cut property.
3. Contrast MST with a shortest-path tree via Demonstration 3, posing Discovery Question 3 before revealing the structural difference.
4. Assess with the P77 problem set, including the uniqueness proof, and the cross-link transfer probe on Borůvka's algorithm.

## Tutor Actions
1. **On introducing either algorithm:** always state which RESTRICTION it applies (cycle-avoidance for Kruskal, frontier-crossing for Prim) before running it, so the algorithm is understood as an application of the cut property rather than an arbitrary procedure.
2. **On MST uniqueness:** never accept "the weights are distinct" or "the weights repeat" alone as a full answer — require the student to check whether a genuinely competing minimum-weight tree exists.
3. **On any MST vs. shortest-path comparison:** require the student to state which OBJECTIVE each tree optimizes (total connection cost vs. per-vertex reachability from one source) before comparing their structures.
4. **On the transfer probe (Borůvka's algorithm):** frame it explicitly as a THIRD application of the same cut property, reinforcing that the unifying idea — not the specific algorithm — is the transferable content.

## Voice Teaching Notes
1. **Register:** proficient/applied — this concept assumes fluency with spanning trees and develops algorithmic procedures with complexity analysis; comfortable with symbolic weighted-graph notation.
2. **Load-bearing sentence, spoken slowly:** "Both algorithms are greedy, but each one is greedy with exactly one restriction — and that restriction is what makes greedy actually work here."
3. **Wait time:** pause after Discovery Question 3, letting the student sit with the tension between "cheapest overall" and "fastest between two points" before the demonstration resolves it.

## Assessment Signals
1. **Gate concept:** correctly states and applies the cut property to identify an edge that must belong to every MST.
2. **Algorithm execution:** correctly runs BOTH Kruskal's and Prim's on a novel weighted graph and confirms they yield the same MST.
3. **Uniqueness reasoning:** correctly proves that distinct edge weights force a unique MST, and correctly identifies a graph with repeated weights whose MST is nonetheless unique.
4. **MST-vs-shortest-path discrimination:** constructs or identifies a graph where the MST and a shortest-path tree differ structurally.
5. **Transfer:** applies the cut property to justify the correctness of a THIRD algorithm (Borůvka's) not explicitly taught step by step.

## Tutor Recovery Strategy
If the student treats Kruskal's and Prim's as unrelated procedures, have them annotate each step of both algorithms with the specific cut or cycle-avoidance justification, until the shared cut-property foundation becomes visible. If the student assumes distinct weights are necessary for uniqueness, work the $K_3$-vs-$P_3$ contrast (both weight-1-everywhere, one non-unique and one unique) until the sufficient-not-necessary relationship is concrete. If the student conflates MST with shortest-path trees, have them compute BOTH trees on the same graph and measure actual path lengths in each, confirming the trees can differ even when it feels counterintuitive.

## Memory Hooks
1. "Cut property: cheapest crossing wins a spot in every MST. Cycle property: priciest in a loop earns a spot in none."
2. "Kruskal restricts by cycles, Prim restricts by frontier — same cut property, two doors in."
3. "MST asks 'cheapest to connect everyone'; shortest-path asks 'fastest from HERE to everyone.'"

## Transfer Connections
- **`math.disc.spanning-tree`:** the foundational spanning-tree definition and existence proof this concept extends into the weighted optimization setting — cross-linked directly (see Blueprint References).
- **`math.graph.tree`:** this concept's spanning trees are drawn from that concept's characterization and counting theory (a spanning tree is, structurally, exactly the tree concept applied to a spanning subgraph).
- **`math.graph.connectivity`:** the cut concept used throughout this entry (minimum-weight crossing edge) is the same cut construction that concept's own connectivity theory (Menger's theorem, max-flow min-cut) develops further.

## Cross-Subject Connections
- **Computer Science (network design algorithms):** Kruskal's and Prim's are foundational algorithms-course content; Union-Find (used in Kruskal's cycle detection) and binary/Fibonacci heaps (used in Prim's frontier selection) are themselves standard data-structure topics this concept motivates.
- **Engineering (infrastructure network design):** the MST directly models the cheapest way to connect a set of locations with cabling, piping, or road networks — a genuine real-world optimization problem, distinct from (and often confused with) routing/logistics problems that need shortest-path algorithms instead.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.graph.minimum-spanning-tree.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on Borůvka's algorithm). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. This Blueprint pre-assigns no birth types; birth types classified independently here (MC-1 Type 1, MC-2 Type 4, MC-3 Type 6) against this program's own 6-type taxonomy.
- Cross-link note: the Blueprint's own Component 7 states `math.disc.spanning-tree` was MISSING on disk at the time it was authored, declaring independence mode for its transfer probe (P76, on Borůvka's algorithm, which does not reference `math.disc.spanning-tree`'s content). That concept has since been authored (`educational-brain/concepts/mathematics/math.disc.spanning-tree.md`, Batch 23) — this EB entry substantively incorporates it in Transfer Connections above, updating the cross-link's status from the Blueprint's own stale independence declaration, without altering the Blueprint file itself or restating its content.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- Genuine Blueprint/reality discrepancy found and resolved here (not a KG/Blueprint metadata mismatch, but a Blueprint-authoring-time-vs-now staleness): the Blueprint's Component 7 and Validation Checklist (V-5, V-11) both record `math.disc.spanning-tree` as MISSING, which was accurate when the Blueprint was authored but is no longer accurate — that concept was authored in Batch 23 of this same campaign. This entry's own Transfer Connections section reflects the corrected, current state; the Blueprint file itself is left unmodified per this program's standing rule against altering Blueprints.
- This closes the `math.graph.graph → math.graph.tree → math.graph.minimum-spanning-tree` authoring chain opened this batch — all three concepts requiring only already-authored `math.disc` prerequisites are now complete. `math.graph`'s remaining 13 concepts (connectivity, eulerian-circuit, hamiltonian-cycle, graph-coloring, and others) each require their own `math.disc` sibling, several of which (`graph-connectivity`, `euler-hamiltonian`, `graph-coloring`) are already authored, making them immediately ready for a future batch.

## Version History
- **Batch 24** (2026-09-12): initial authoring, part 3 of 3 this batch (with `math.graph.graph` and `math.graph.tree`). Blueprint reused by reference; 3 misconceptions birth-type classified independently (MC-1 Type 1 foundational, MC-2 Type 4 moderate, MC-3 Type 6 critical). Corrected a Blueprint-staleness finding: the Blueprint's own independence-mode declaration for `math.disc.spanning-tree` predates that concept's Batch-23 authoring.
