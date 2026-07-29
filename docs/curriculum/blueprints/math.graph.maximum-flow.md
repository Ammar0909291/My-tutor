# Teaching Blueprint: Maximum Flow (`math.graph.maximum-flow`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.maximum-flow` |
| name | Maximum Flow |
| domain | Graph Theory |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.graph.connectivity` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner; maximum flow is defined entirely abstractly on directed capacity networks; no physical pipe or road analogy required for formal treatment |
| description (KG) | Maximum flow in networks: source $s$, sink $t$, capacities $c(u,v)$. Ford-Fulkerson method (augmenting paths in residual graph). Max-flow min-cut theorem (max flow = min cut capacity). Edmonds-Karp $O(VE^2)$. Applications: bipartite matching, network reliability. |

## Component 1 — Learning Objectives

- LO1: Define a **flow network** (directed graph with capacities $c:E\to\mathbb{R}_{\ge0}$, source $s$, sink $t$), a **feasible flow** (conservation at internal vertices, capacity constraints), and **flow value** $|f|=\sum_{v}f(s,v)$; define the **residual graph** $G_f$ and **augmenting path**; state the **Ford-Fulkerson method** and its correctness.
- LO2: State and apply the **Max-Flow Min-Cut Theorem**: $\max|f|=\min\text{cap}(S,T)$ over all $s$-$t$ cuts $(S,T)$; compute the minimum cut for a given flow network by identifying the reachable set in the residual graph after max flow is achieved.
- LO3: Describe **Edmonds-Karp** (Ford-Fulkerson using BFS for augmenting paths, guaranteeing $O(nm^2)$ complexity); apply max-flow to reduce **bipartite maximum matching** to a flow problem; state the complexity of the resulting matching algorithm.

## Component 2 — Prerequisite Check

Assumes mastery of `math.graph.connectivity` (paths, cuts, connected components, vertex/edge cuts). Requires familiarity with BFS, directed graphs, and integer capacities for the standard algorithm treatments. No further prerequisites.

## Component 3 — Core Explanation

**Flow network.** $G=(V,E,c,s,t)$ with $c(u,v)\ge0$ for all directed edges; $s$ is the source, $t$ is the sink. A **feasible flow** $f:V\times V\to\mathbb{R}$ satisfies:

- **Capacity**: $0\le f(u,v)\le c(u,v)$ for all $(u,v)$.
- **Conservation**: $\sum_v f(u,v)=\sum_v f(v,u)$ for all $u\ne s,t$ (inflow = outflow at internal vertices).
- **Skew symmetry**: $f(u,v)=-f(v,u)$ (notational convenience; net flow).

The **flow value** is $|f|=\sum_v f(s,v)$ (net flow out of $s$).

**Residual graph.** $G_f=(V,E_f)$ where for each edge $(u,v)\in E$: the **forward residual capacity** is $c_f(u,v)=c(u,v)-f(u,v)$ (remaining capacity); the **backward residual capacity** is $c_f(v,u)=f(u,v)$ (amount that can be pushed back). Include edge $(u,v)$ in $E_f$ if $c_f(u,v)>0$.

**Augmenting path.** An $s$-$t$ path in $G_f$. Sending $\delta=\min_{e\in p}c_f(e)$ units along path $p$ increases $|f|$ by $\delta$ (Ford-Fulkerson update). **Ford-Fulkerson method**: while an augmenting path exists in $G_f$, augment; terminate when no $s$-$t$ path exists in $G_f$. With integer capacities and rational path selection: terminates in finite steps; total augmentations $\le|f^*|$ (the max flow). With irrational capacities and bad path choices: may not terminate (rare pathological case).

**Max-Flow Min-Cut Theorem** (Ford-Fulkerson 1956). For any flow $f$ and $s$-$t$ cut $(S,T)$ (partition with $s\in S, t\in T$): $|f|\le\text{cap}(S,T)=\sum_{u\in S,v\in T}c(u,v)$.

The following are equivalent:
1. $f$ is a maximum flow.
2. The residual graph $G_f$ has no $s$-$t$ augmenting path.
3. $|f|=\text{cap}(S^*,T^*)$ for some $s$-$t$ cut $(S^*,T^*)$ (the minimum cut).

To find the minimum cut after max flow: let $S^*=$ vertices reachable from $s$ in $G_f$; then $(S^*,V\setminus S^*)$ is a minimum cut.

**Edmonds-Karp.** Ford-Fulkerson using BFS (shortest augmenting path — fewest edges). Guarantees termination and complexity $O(nm^2)$ because: (1) each augmentation saturates at least one edge on the shortest path, and (2) each edge is saturated at most $O(n)$ times (the shortest-path length from $s$ to any vertex is non-decreasing over augmentations). The $O(nm^2)$ bound is polynomial, resolving Ford-Fulkerson's non-termination issue.

**Bipartite matching via max flow.** Given bipartite graph $G=(A\cup B,E)$: create source $s$ with capacity-1 edges to each $a\in A$; capacity-1 edges along each $(a,b)\in E$; capacity-1 edges from each $b\in B$ to sink $t$. A max flow of integer value $k$ corresponds to a maximum matching of size $k$. Complexity: $O(m\sqrt{n})$ using Hopcroft-Karp (based on augmenting-path structure), or $O(nm)$ via Edmonds-Karp on unit-capacity networks.

## Component 4 — Worked Examples

**Example 1 (LO1 — residual graph and augmenting path)**: Network on $\{s,a,b,t\}$: $s\to a=10, s\to b=10, a\to t=10, b\to t=10, a\to b=2$. Initial flow $f=0$. Path $s\to a\to t$: $\delta=10$; send 10 units. Residual: $c_f(s,a)=0, c_f(a,s)=10, c_f(a,t)=0, c_f(t,a)=10$. Path $s\to b\to t$: $\delta=10$; send 10 units. Residual: $c_f(s,b)=0, c_f(b,s)=10$, etc. No more $s$-$t$ paths in residual (both $s$-edges saturated). Max flow $|f|=20$. Min cut: reachable from $s$ in $G_f$: only $s$ (since $c_f(s,a)=c_f(s,b)=0$). Cut $(\{s\},\{a,b,t\})$ with capacity $c(s,a)+c(s,b)=10+10=20$ = max flow. ✓

**Example 2 (LO2 — applying Max-Flow Min-Cut)**: Modify Example 1 by setting $a\to t=5$ (bottleneck). Re-run: path $s\to a\to t$: $\delta=5$. Path $s\to b\to t$: $\delta=10$. Residual: $c_f(a,t)=0$; can we route more through $a$? Path $s\to a\to b\to t$: $c_f(s,a)=5,c_f(a,b)=2,c_f(b,t)=0$ — $b\to t$ is saturated. Path $s\to a\to b$ not viable to $t$. Max flow $|f|=15$. Reachable from $s$ in residual: $s,a$ (since $c_f(s,b)=0$; $c_f(a,t)=0$; $c_f(a,b)=2>0$ but $b\to t$ leads to $t\notin S^*$? No — $c_f(b,t)=0$ and $b$ is reachable from $a$ via $c_f(a,b)=2$). $S^*=\{s,a,b\}$, $T^*=\{t\}$. Cap$(S^*,T^*)=c(a,t)+c(b,t)=5+10=15$ = max flow. ✓

**Example 3 (LO3 — bipartite matching as flow)**: Bipartite graph $A=\{a_1,a_2\}$, $B=\{b_1,b_2,b_3\}$; edges $a_1b_1, a_1b_2, a_2b_2, a_2b_3$. Flow network: $s\to a_1=1, s\to a_2=1$; $a_1\to b_1=1, a_1\to b_2=1, a_2\to b_2=1, a_2\to b_3=1$; $b_1\to t=1, b_2\to t=1, b_3\to t=1$. Max flow: route $s\to a_1\to b_1\to t$ (flow 1) and $s\to a_2\to b_3\to t$ (flow 1). Total $|f|=2$ = maximum matching $\{a_1b_1, a_2b_3\}$. Note: matching $\{a_1b_2, a_2b_2\}$ is impossible since $b_2\to t$ has capacity 1 (only one unit through $b_2$).

## Component 5 — Teaching Actions

### Teaching Action A01 — Flow as a "Current Through Pipes" Shifted to Abstraction (Primitive P11: Representation Shift)

Begin with the intuition: water flows from source to sink through a network of pipes with capacity constraints; we want to maximize throughput. Then immediately shift to the abstract definition: flow conservation (inflow = outflow at internal vertices), capacity constraints, net flow value. Emphasize: the water analogy is only an intuition-builder; the residual graph (sending flow backward) has no physical pipe meaning and must be understood abstractly.

- **MC-1 hook**: ask "If I send 3 units along a path and a backward edge appears in the residual graph with capacity 3, what does that mean physically?" — It means we can "undo" up to 3 units of the forward flow on that edge by canceling it, effectively rerouting; physically there is no backward pipe, but abstractly backward flow represents uncommitted capacity. This is the key abstraction that makes augmenting paths work.

### Teaching Action A02 — Max-Flow Min-Cut: Duality in Action (Primitive P25: Deductive)

State the theorem. Prove the easy direction: $|f|\le\text{cap}(S,T)$ for any cut (flow into the sink can't exceed cut capacity). Prove existence of the tight cut after max flow: define $S^*$ as reachable from $s$ in $G_f$ after max flow. Show $t\notin S^*$ (by definition — no augmenting path). Show cap$(S^*,T^*)=|f^*|$ by analyzing the flow and capacity on cut edges. Work Example 2 to compute $S^*$ explicitly.

- **MC-2 hook**: ask "Is the minimum cut always unique?" — No: Example 1 has minimum cut $(\{s\},\{a,b,t\})$ of capacity 20, but is there another? Compute cap$(\{s,a\},\{b,t\})=c(a,t)+c(a,b)+c(s,b)=5+2+10=17$ — not minimum. Cap$(\{s,b\},\{a,t\})=c(a,t)+c(s,a)=5+10=15$. So cut $(\{s,b\},\{a,t\})$ is also minimum (capacity 15)! Multiple minimum cuts can coexist.

### Teaching Action A03 — Bipartite Matching Reduction (Primitive P16: Counterexample direction reversed — show power of reduction)

State: "Any bipartite matching problem can be solved by a single max-flow computation." Work Example 3. Then pose: "Given a maximum matching, how do we read it off the flow?" — Each unit-flow path $s\to a_i\to b_j\to t$ corresponds to matched pair $(a_i,b_j)$. Emphasize: the reduction works because unit capacities force the flow to be 0/1 on each edge, perfectly mimicking a matching.

- **MC-3 hook**: ask "Does the bipartite matching reduction work for non-bipartite matching (matching in general graphs)?" — No: the flow-network reduction only works for bipartite graphs; general graph matching requires Edmond's blossom algorithm, which handles odd cycles and is significantly more complex. Max-flow does not solve general matching.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Run Ford-Fulkerson on the following network: $s\to a=7, s\to b=4, a\to c=3, a\to b=3, b\to c=6, c\to t=5, b\to t=4$. Find the max flow and identify the min cut.
  2. After reaching max flow in Problem 1, identify $S^*$ (vertices reachable from $s$ in the residual graph) and verify that cap$(S^*,T^*)=|f^*|$.
  3. Reduce the following bipartite matching problem to a max-flow problem and solve it: $A=\{a_1,a_2,a_3\}$, $B=\{b_1,b_2,b_3\}$; edges $a_1b_1, a_1b_3, a_2b_1, a_2b_2, a_3b_2, a_3b_3$. State the maximum matching.
  4. Edmonds-Karp uses BFS augmenting paths. Give the sequence of BFS-augmenting paths for Problem 1 and verify that the total number of augmentations is at most $O(nm)=O(5\cdot7)=35$.
- **P76 (Transfer Probe, mode = independence)**: "The **minimum vertex cut** between $s$ and $t$ (minimum number of vertices whose removal disconnects $s$ from $t$) can be computed via max flow using the following reduction: replace each vertex $v$ (other than $s$ and $t$) by two vertices $v_{in}$ and $v_{out}$ with a capacity-1 edge $v_{in}\to v_{out}$; for each original edge $(u,v)$, add $u_{out}\to v_{in}$ with capacity $\infty$; find the max $s_{out}$-$t_{in}$ flow. (a) Explain why this reduction correctly computes the minimum vertex cut (use Menger's theorem: the minimum vertex cut between $s$ and $t$ equals the maximum number of internally vertex-disjoint $s$-$t$ paths). (b) Apply the reduction to the graph $\{s,a,b,c,t\}$ with edges $sa, sb, ac, bc, ct$ to compute the minimum vertex cut. (c) How does the reduction change if we want vertex-disjoint paths instead of edge-disjoint paths?"
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Maximum Flow — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BACKWARD-EDGES-ARE-PHYSICAL | Treating the backward residual edges as representing physical reverse capacity in the original network — they represent the ability to cancel previously committed forward flow, not actual reverse pipes; without this abstraction, the correctness of augmenting paths cannot be understood | Foundational |
| MC-2 | MIN-CUT-IS-UNIQUE | Believing the minimum cut is always unique in a flow network — multiple minimum cuts can coexist (any subset of $V$ that forms a cut with the same capacity as the max flow is a minimum cut); the specific cut $S^*$ (reachable vertices in $G_f$) is one canonical minimum cut, not necessarily the only one | Moderate |
| MC-3 | MAX-FLOW-SOLVES-GENERAL-MATCHING | Believing max-flow techniques directly solve maximum matching in general (non-bipartite) graphs — the unit-capacity flow reduction works ONLY for bipartite graphs; general graph matching (with odd cycles) requires Edmond's blossom algorithm and cannot be handled by standard network flow | Critical |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Backward Residual Edges Represent Flow Cancellation, Not Reverse Capacity") → P41 (detect: ask what it means to send 2 units along a backward edge $(b,a)$ with residual capacity 2 in a network that has no original edge $b\to a$ — can this be done? Yes — it decreases $f(a,b)$ by 2, effectively uncommitting that flow and rerouting it) → P64 (conceptual shift: the residual graph is a mathematical device for tracking what can still be done to the current flow; its backward edges have no physical meaning but are necessary for the algorithm to find augmenting paths that "reroute" previously committed flow — without backward edges, Ford-Fulkerson would miss many augmenting paths and produce suboptimal flows).
- **B02 (targets MC-2)**: P27 (name it: "Multiple Minimum Cuts Can Coexist") → P41 (detect: in Example 1 with $a\to t=5$, the canonical min cut is $(\{s,a,b\},\{t\})$ with capacity 15; ask whether there is another cut of capacity 15 — yes, $(\{s,a\},\{b,t\})$ has capacity $c(a,t)+c(a,b)+c(s,b)=5+2+10=17$; no. Try $(\{s\},\{a,b,t\})$: cap $=10+10=20$; not minimum. So in this specific graph, the minimum cut IS unique — but explain that other graphs have multiple minimum cuts) → P64 (conceptual shift: the algorithm gives one canonical minimum cut; all cuts with capacity equal to $|f^*|$ are minimum cuts; finding all of them requires more analysis than the standard residual-graph reachability computation).
- **B03 (targets MC-3)**: P27 (name it: "Max-Flow Works for Bipartite Matching Only") → P41 (detect: ask whether max flow can find a maximum matching in $C_5$, a 5-cycle — what would the flow network look like? All vertices have both in- and out-edges, so there's no natural bipartition, and the source-sink structure breaks down) → P64 (conceptual shift: the bipartite reduction works because we can partition vertices into two layers with the source behind $A$ and the sink behind $B$, and all flow crosses the $A$-$B$ boundary exactly once; a general graph lacks this two-layer structure; odd cycles (like $C_5$) create matching constraints that flow cannot enforce, requiring Edmond's blossom contraction).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.graph.connectivity` (vertex/edge cuts, paths, connectivity definition).
- **Unlocks**: none listed in the KG.
- **Cross-link**: none in KG → P76 uses independence mode.

## Component 8 — Teaching Notes

- The Max-Flow Min-Cut Theorem is one of the most beautiful duality theorems in combinatorics — it states that two very different optimization problems (maximize flow, minimize cut capacity) have the same optimal value. Establishing this duality cleanly, with the canonical $S^*$ construction, is the single highest-value lesson in this blueprint.
- The bipartite matching reduction is the primary application and should be worked fully; it models how algorithmic reductions work in general (transform problem A into problem B, use B's algorithm, translate back).
- The transfer probe's vertex-connectivity reduction via node-splitting is a standard technique that recurs throughout combinatorial optimization; it also directly illustrates Menger's theorem, a core result in connectivity theory that builds on the prerequisite concept.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.graph.connectivity`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01–A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS (MAMR = 4/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert, formal flow networks with abstract residual-graph constructions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires running Ford-Fulkerson on a new graph, identifying the min cut from the residual graph, executing the bipartite matching reduction, and verifying Edmonds-Karp augmentation count — not just stating the theorem | PASS |
