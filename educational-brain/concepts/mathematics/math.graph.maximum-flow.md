# math.graph.maximum-flow — Maximum Flow (Residual Graphs, Max-Flow Min-Cut, Bipartite Matching Reduction)

## Identity
- **KG ID:** `math.graph.maximum-flow`
- **Domain:** math.graph (Graph Theory)
- **Requires:** `math.graph.connectivity`
- **Unlocks:** none
- **Cross-links:** none
- **Difficulty:** expert
- **Bloom level:** apply
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 6

## Learning Objective
By the end of this concept, the student can: (1) define a flow network, feasible flow, flow value, residual graph, and augmenting path, and state the Ford-Fulkerson method with correctness reasoning; (2) state and apply the Max-Flow Min-Cut Theorem, computing the minimum cut for a given network by identifying the reachable set in the residual graph after achieving max flow; (3) describe Edmonds-Karp's polynomial guarantee, reduce bipartite maximum matching to a max-flow problem, and correctly state that this reduction does not extend to general (non-bipartite) matching.

## Core Understanding
`math.graph.connectivity` established vertex/edge cuts and connectivity numbers. This concept develops the algorithmic and structural theory of FLOW through a directed capacitated network — one of the richest duality results in combinatorial optimization.

FLOW NETWORKS AND FEASIBLE FLOWS: a flow network $G=(V,E,c,s,t)$ has non-negative edge capacities $c(u,v)$, a source $s$, and a sink $t$. A feasible flow $f$ satisfies CAPACITY ($0\le f(u,v)\le c(u,v)$) and CONSERVATION (inflow equals outflow at every internal vertex). The flow VALUE $|f|=\sum_v f(s,v)$ is the net outflow from the source.

THE RESIDUAL GRAPH AND AUGMENTING PATHS: the residual graph $G_f$ records, for each edge, the forward residual capacity $c_f(u,v)=c(u,v)-f(u,v)$ (remaining capacity) and the backward residual capacity $c_f(v,u)=f(u,v)$ (the amount of already-committed flow that can be "cancelled" and rerouted). An AUGMENTING PATH is an $s$-$t$ path in $G_f$; sending $\delta=\min$ residual capacity along it strictly increases $|f|$ by $\delta$. FORD-FULKERSON'S METHOD repeatedly augments until no $s$-$t$ path remains in $G_f$.

THE MAX-FLOW MIN-CUT THEOREM (Ford-Fulkerson 1956): three statements are EQUIVALENT — (1) $f$ is a maximum flow; (2) $G_f$ has no $s$-$t$ augmenting path; (3) $|f|$ equals the capacity of some $s$-$t$ cut $(S^*,T^*)$ (the minimum cut). After reaching max flow, the minimum cut is read off DIRECTLY: $S^*$ is the set of vertices reachable from $s$ in the final residual graph, and $(S^*, V\setminus S^*)$ is a genuine minimum cut, with capacity exactly equal to the max flow value.

EDMONDS-KARP AND POLYNOMIAL TERMINATION: Ford-Fulkerson using BFS to find the SHORTEST augmenting path each time (Edmonds-Karp) guarantees termination in $O(nm^2)$ time, because each edge can be the "bottleneck" of a shortest augmenting path only $O(n)$ times, resolving Ford-Fulkerson's theoretical possibility of non-termination under pathological (irrational-capacity) inputs.

BIPARTITE MATCHING AS A FLOW PROBLEM: given bipartite $G=(A\cup B, E)$, build a network with source $s$ connected to every $a\in A$ (capacity 1), every original edge $(a,b)$ (capacity 1), and every $b\in B$ connected to sink $t$ (capacity 1). Because ALL capacities are 1, any integer flow of value $k$ corresponds EXACTLY to a matching of size $k$ — this reduction works precisely because the network's two-layer, source-behind-$A$/sink-behind-$B$ structure forces every unit of flow to cross the $A$-$B$ boundary exactly once. This reduction does NOT extend to general (non-bipartite) graphs, which lack this clean two-sided layering and instead require Edmonds' substantially more intricate blossom algorithm.

## Mental Models
1. **Rung 1 — the residual graph's backward edges represent uncommitted, cancellable flow, never a physical reverse channel.** Understanding augmenting paths correctly requires treating the residual graph as a pure bookkeeping device, not a literal second network.
2. **Rung 2 — max flow and min cut are two sides of the SAME optimal value, proven by one canonical construction.** The reachable-set-in-the-residual-graph trick is not a coincidence; it is the theorem's own constructive proof, giving both the flow's optimality certificate and the cut simultaneously.
3. **Rung 3 — a reduction (bipartite matching to flow) works only because of a structural property (the two-layer bipartite shape) that a target problem must genuinely share; a superficially similar problem (general matching) can fail the reduction entirely.**

## Why Students Fail
Having just been introduced to flow through the intuitive water-in-pipes metaphor, students naturally try to interpret every subsequent construct — especially the residual graph's backward edges — as a literal physical feature of the network, missing that backward residual capacity encodes an ABSTRACT bookkeeping fact (how much previously-sent flow could be un-sent) with no physical counterpart, and that this abstraction is precisely what makes Ford-Fulkerson's augmenting-path search complete and correct. Having proven the Max-Flow Min-Cut Theorem via one specific canonical cut construction (reachability in the final residual graph), students readily assume this is the UNIQUE minimum cut, missing that several distinct vertex partitions can share the identical minimum capacity value whenever multiple bottleneck structures coexist in the network. Finally, having just successfully reduced bipartite matching to a max-flow computation — a genuinely elegant, general-feeling technique — students overgeneralize the reduction to ANY matching problem, missing that the reduction's correctness depends specifically on the two-sided, no-internal-edges structure of bipartite graphs, which general graphs (containing odd cycles) simply do not have.

## Misconceptions

### MC-1: BACKWARD-EDGES-ARE-PHYSICAL
- **Birth type:** Type 6 (analogy overextension) — foundational (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Treating the backward residual edges as representing physical reverse capacity in the original network, rather than the ability to cancel previously committed forward flow.
- **Why this birth type:** Analogy overextension: the water-through-pipes intuition used to introduce flow networks is extended past its intended scope to the residual graph, which has no physical-pipe interpretation at all — the analogy that helped introduce the topic actively misleads once the residual construction is introduced.
- **Detection probe:** "A backward residual edge $(b,a)$ has capacity 3, but there is no original edge from $b$ to $a$. What does sending flow along it physically represent?" A student with MC-1 struggles to answer, or invents a nonexistent physical reverse pipe.
- **Repair:** Trace what sending 2 units along a backward edge $(b,a)$ actually does: it DECREASES $f(a,b)$ by 2, un-committing that flow so it can be rerouted elsewhere — a bookkeeping cancellation, never a physical reverse flow.
- **Verification of death:** Given a residual graph with a backward edge, the student explains its meaning purely in terms of cancelling previously-sent forward flow, without invoking any physical reverse-channel interpretation.

### MC-2: MIN-CUT-IS-UNIQUE
- **Birth type:** Type 1 (overgeneralization) — moderate (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Believing the minimum cut in a flow network is always unique, when multiple distinct vertex partitions can share the same minimum capacity value.
- **Why this birth type:** Overgeneralization from the canonical construction (the reachable set in the final residual graph gives ONE specific minimum cut) to an assumption that this is the ONLY minimum cut, since the construction procedure itself outputs just one answer without signaling that others might exist.
- **Detection probe:** "The canonical construction gives minimum cut $(S^*,T^*)$ with capacity $k$. Could there be a different partition with the same capacity $k$?" A student with MC-2 answers "no" by default.
- **Repair:** Search for an alternative cut of equal capacity on a network engineered to have two bottleneck structures — verify a second partition achieves the identical minimum capacity, showing minimum cuts need not be unique.
- **Verification of death:** Given a flow network, the student checks for the possibility of multiple minimum cuts rather than assuming the canonical construction's output is the only one.

### MC-3: MAX-FLOW-SOLVES-GENERAL-MATCHING
- **Birth type:** Type 1 (overgeneralization) — critical (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Believing max-flow techniques directly solve maximum matching in general (non-bipartite) graphs, when the unit-capacity flow reduction works only for bipartite graphs.
- **Why this birth type:** Overgeneralization from the elegant, successful bipartite reduction to an assumption of universal applicability, without checking whether the structural property enabling it (the two-sided layering) transfers to graphs with no natural bipartition.
- **Detection probe:** "Can the bipartite matching reduction be applied directly to find a maximum matching in $C_5$ (a 5-cycle)?" A student with MC-3 answers "yes" without qualification.
- **Repair:** Attempt to construct the flow network for $C_5$: every vertex would need both incoming and outgoing structure with no natural source/sink layering, since $C_5$ has no bipartition (it contains an odd cycle) — the reduction's source-behind-$A$/sink-behind-$B$ structure simply has no analogue here, and general matching genuinely requires Edmonds' blossom algorithm instead.
- **Verification of death:** Given a non-bipartite graph, the student states explicitly that the flow-network matching reduction does not apply, and names Edmonds' blossom algorithm as the correct general tool.

## Analogies
1. **The refundable-deposit analogy (targets MC-1).** A backward residual edge is like a refundable deposit slip: it doesn't represent a real, separate pipe carrying water backward — it represents the option to "get back" resources you had previously committed, freeing them to be redirected somewhere more useful. The slip is bookkeeping, not plumbing.
2. **The bottleneck-with-two-doors analogy (targets MC-2).** If a warehouse's total inbound capacity is constrained equally by two entirely different doorways (each independently limiting), sealing EITHER doorway achieves the same minimum restriction — there can be more than one "true bottleneck" achieving the identical minimum, exactly as multiple minimum cuts can share one capacity value.

## Demonstrations
### Demonstration 1 — residual graph and augmenting path (mirrors Blueprint Ex1)
Network on $\{s,a,b,t\}$ with $s{\to}a=10$, $s{\to}b=10$, $a{\to}t=10$, $b{\to}t=10$, $a{\to}b=2$: augmenting along $s{\to}a{\to}t$ sends 10 units, then $s{\to}b{\to}t$ sends 10 more — both $s$-edges are now saturated, no further $s$-$t$ path exists in the residual graph. Max flow $=20$. Reading off the min cut: only $s$ is reachable from $s$ in the residual graph (both outgoing $s$-edges are saturated), so $(\{s\},\{a,b,t\})$ is the minimum cut, with capacity $10+10=20$ — exactly matching the max flow.

### Demonstration 2 — applying Max-Flow Min-Cut with a bottleneck (mirrors Blueprint Ex2)
Modifying Demonstration 1 by setting $a{\to}t=5$: augmenting $s{\to}a{\to}t$ (5 units) then $s{\to}b{\to}t$ (10 units) saturates both sink-side edges from $b$ and $a$; a further path $s{\to}a{\to}b{\to}t$ is blocked since $b{\to}t$ is already saturated. Max flow $=15$. The reachable set from $s$ in the final residual graph is $\{s,a,b\}$ (since $c_f(a,b)=2>0$ remains), giving min cut $(\{s,a,b\},\{t\})$ with capacity $c(a,t)+c(b,t)=5+10=15$ — matching the max flow exactly.

### Demonstration 3 — bipartite matching as a flow problem (mirrors Blueprint Ex3)
$A=\{a_1,a_2\}$, $B=\{b_1,b_2,b_3\}$, edges $a_1b_1,a_1b_2,a_2b_2,a_2b_3$: building the unit-capacity source/sink network and routing $s{\to}a_1{\to}b_1{\to}t$ and $s{\to}a_2{\to}b_3{\to}t$ (each carrying 1 unit) achieves max flow $|f|=2$, corresponding EXACTLY to the maximum matching $\{a_1b_1, a_2b_3\}$. The matching $\{a_1b_2,a_2b_2\}$ is impossible precisely because $b_2{\to}t$ has capacity only 1 — the network enforces the matching constraint (each $b$ used at most once) automatically.

## Discovery Questions
1. "A backward residual edge exists between two vertices with no original edge connecting them in that direction. What could this possibly represent, if not an actual reverse pipe?"
2. "After computing the minimum cut via the canonical reachability construction, is it possible another completely different partition achieves the same minimum capacity?"
3. "The bipartite matching reduction works beautifully for two-sided graphs. What structural feature of a bipartite graph does the reduction actually depend on, and does a general graph (like a 5-cycle) have it?"

## Teaching Sequence
Best taught by **direct instruction establishing the abstract flow definitions FIRST, using the water-pipe intuition only as an entry hook**, given the Abstract CPA entry stage — the residual graph's abstraction must be established precisely before any misleading physical analogy can take hold, with the discovery questions surfacing each theorem's genuine subtlety before the demonstrations confirm it.
1. Introduce flow networks and the residual graph via Demonstration 1, posing Discovery Question 1 before formalizing the backward-edge abstraction explicitly.
2. State and prove the Max-Flow Min-Cut Theorem, working Demonstration 2's bottleneck case, posing Discovery Question 2 before revealing that multiple minimum cuts can coexist.
3. Introduce Edmonds-Karp's polynomial guarantee, then the bipartite matching reduction via Demonstration 3, posing Discovery Question 3 before confirming the reduction's bipartite-only scope.
4. Assess with the P77 problem set and the vertex-connectivity-via-max-flow transfer probe (P76, independence mode).

## Tutor Actions
1. **On any residual-graph question:** require the student to state the bookkeeping (cancellation) interpretation of backward edges explicitly, never a physical one.
2. **On any minimum-cut claim:** ask whether the student has checked for alternative partitions achieving the identical capacity before treating the found cut as unique.
3. **On any matching-via-flow application:** require the student to confirm bipartiteness explicitly before applying the reduction.

## Voice Teaching Notes
1. **Register:** expert/applied — this concept assumes comfort with directed graphs, BFS, and formal duality-style theorem statements.
2. **Load-bearing sentence, spoken slowly:** "A backward edge cancels committed flow — it never carries water the other way."
3. **Wait time:** pause after Discovery Question 2, letting the student genuinely search for a second minimum cut on the worked example before revealing whether one exists.

## Assessment Signals
1. **Gate concept:** correctly executes Ford-Fulkerson on a novel network, tracking the residual graph through each augmentation.
2. **Duality fluency:** correctly extracts the minimum cut from the final residual graph and verifies its capacity equals the max flow.
3. **Reduction application:** correctly reduces a bipartite matching problem to a flow network and reads off the matching from the resulting flow.
4. **Scope discrimination:** correctly states that the matching reduction requires bipartiteness and names Edmonds' blossom algorithm as the general alternative.
5. **Transfer:** applies the vertex-splitting reduction (P76) to compute minimum vertex cuts via max flow, connecting to Menger's theorem.

## Tutor Recovery Strategy
If the student treats backward edges as physical, work several augmenting-path sequences that explicitly route flow backward along a residual edge, tracing the resulting change to the ORIGINAL forward flow value each time, until the cancellation interpretation is automatic. If the student assumes minimum cuts are unique, work a network specifically engineered with two independent bottlenecks of equal capacity until a second minimum cut is found and verified. If the student overextends the bipartite matching reduction, attempt to build the flow network for a small non-bipartite graph (like $C_5$) and identify exactly where the construction breaks down.

## Memory Hooks
1. "Backward edges cancel, they don't carry — residual graphs are bookkeeping, not plumbing."
2. "Max flow equals min cut — one theorem, two answers, from the same construction."
3. "Bipartite matching becomes flow because of the two-layer shape — no shape, no reduction."

## Transfer Connections
- **`math.graph.connectivity`:** vertex/edge cuts and Menger's theorem, which the max-flow-based minimum vertex cut reduction (P76 transfer probe) directly connects to — max-flow-min-cut and Menger's theorem are both instances of the same combinatorial duality principle.
- **`math.graph.matching`:** the bipartite matching reduction gives a second, algorithmic route to the same maximum matching problem already developed via Hall's and König's theorems — the two approaches (augmenting paths in a bipartite graph directly, versus flow on the constructed network) are provably equivalent.

## Cross-Subject Connections
- **Computer Science and Operations Research (network design, scheduling):** max-flow algorithms directly solve network capacity planning, airline scheduling, and project selection problems formulated as flow networks.
- **Telecommunications (network reliability):** the max-flow-min-cut duality directly quantifies a network's bottleneck bandwidth and identifies its most vulnerable point of failure.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.graph.maximum-flow.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on the vertex-connectivity reduction via node-splitting, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions independently confirmed against this program's own taxonomy: MC-1 Type 6 foundational, MC-2 Type 1 moderate, MC-3 Type 1 critical.
- Cross-link: KG lists no cross-links for this concept — independence mode, matching the Blueprint's own Component 7 declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- A genuine forward connection recorded (not developed further): the P76 transfer probe's vertex-connectivity-via-max-flow reduction is a direct algorithmic realization of Menger's theorem, already surveyed at orientation level in `math.graph.connectivity` — worth a future cross-referencing pass, noted here rather than developed to avoid overreach beyond this entry's own scope.

## Version History
- **Batch 27** (2026-09-12): initial authoring, part 1 of 3 this batch (with `math.graph.ramsey-theory`, `math.graph.extremal-graph-theory`), closing math.graph's frontier to 13/16 (PARKED — the domain's remaining 3 concepts each need a cross-domain prerequisite not yet authored). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 6 foundational, MC-2 Type 1 moderate, MC-3 Type 1 critical).
