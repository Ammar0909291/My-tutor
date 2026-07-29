# Teaching Blueprint: Shortest Path Algorithms (`math.graph.shortest-path`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.shortest-path` |
| name | Shortest Path Algorithms |
| domain | Graph Theory |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.graph.graph`, `math.disc.asymptotic-notation` |
| unlocks | `math.graph.maximum-flow` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — proficient learner fluent in graphs and asymptotic complexity; shortest-path algorithms are abstract procedures on weighted digraphs with formal correctness arguments |
| description (KG) | Shortest path in weighted graphs. Dijkstra's algorithm (non-negative weights, $O((V+E)\log V)$ with min-heap). Bellman-Ford (handles negative weights, detects negative cycles, $O(VE)$). Floyd-Warshall (all-pairs, $O(V^3)$). Negative weight cycles and their implications. |

## Component 1 — Learning Objectives

- LO1: Define the **shortest-path problem** (single-source, single-target, all-pairs) on a weighted directed graph; explain why negative-weight cycles make shortest paths undefined; state the conditions under which **Dijkstra's algorithm** is correct (non-negative edge weights) and execute it using a min-priority queue, stating complexity $O((n+m)\log n)$.
- LO2: Execute **Bellman-Ford** (relax all edges $n-1$ times; detect negative cycles via a final relaxation pass) on graphs with negative edges; state its complexity $O(nm)$; explain the correctness argument via the shortest-path optimality substructure.
- LO3: Execute **Floyd-Warshall** (all-pairs shortest paths via dynamic programming on intermediate vertex sets) on small graphs; state its complexity $O(n^3)$; detect negative cycles (diagonal entry $d[v][v]<0$); compare all three algorithms on the axes of: weight restrictions, source count, and asymptotic complexity.

## Component 2 — Prerequisite Check

Assumes mastery of `math.graph.graph` (weighted directed graphs, adjacency) and `math.disc.asymptotic-notation` ($O, \Omega, \Theta$, analysis of nested loops). Requires familiarity with priority queues and dynamic programming at the level of informal recurrences. No further prerequisites.

## Component 3 — Core Explanation

**Setup.** A weighted directed graph $G=(V,E,w)$ with $w:E\to\mathbb{R}$. The **shortest path** from $s$ to $t$ is a walk from $s$ to $t$ of minimum total weight. A **negative cycle** is a directed cycle with negative total weight; if reachable from $s$, the "shortest path" to any vertex reachable from that cycle is $-\infty$ (undefined). All three algorithms detect or assume the absence of negative cycles.

**Dijkstra's Algorithm** (Dijkstra 1959). Requires $w(e)\ge0$ for all $e$.

1. Initialize $d[s]=0$; $d[v]=+\infty$ for all $v\ne s$; priority queue $Q=V$ keyed by $d[\cdot]$.
2. While $Q\ne\varnothing$: extract $u=\arg\min_{v\in Q}d[v]$; for each neighbor $v$ of $u$: if $d[u]+w(u,v)<d[v]$, update $d[v]\leftarrow d[u]+w(u,v)$ (relaxation).
3. Output $d[\cdot]$ = single-source shortest distances.

Correctness: when $u$ is extracted, $d[u]$ is finalized (because all future relaxations use non-negative weights, so $d[u]$ can only increase if revisited — but it won't be). Complexity: $O((n+m)\log n)$ with binary min-heap ($n$ extractions × $O(\log n)$ + $m$ relaxations × $O(\log n)$).

**Bellman-Ford Algorithm** (Bellman 1958, Ford 1956). Works with negative weights; detects negative cycles.

1. Initialize $d[s]=0$; $d[v]=+\infty$ for $v\ne s$.
2. Repeat $n-1$ times: for each edge $(u,v)$: if $d[u]+w(u,v)<d[v]$, update $d[v]$.
3. Negative-cycle detection: for each edge $(u,v)$: if $d[u]+w(u,v)<d[v]$, a negative cycle is reachable.

Correctness: after $k$ relaxation rounds, $d[v]$ equals the true shortest-path weight using at most $k$ edges. Since any simple shortest path uses at most $n-1$ edges, $n-1$ rounds suffice if no negative cycle. Complexity: $O(nm)$.

**Floyd-Warshall Algorithm** (Floyd 1962). All-pairs shortest paths. Let $d^{(k)}[i][j]$ = weight of shortest path from $i$ to $j$ using only vertices $\{1,\ldots,k\}$ as intermediates.

- Base: $d^{(0)}[i][j]=w(i,j)$ if $(i,j)\in E$; $0$ if $i=j$; $+\infty$ otherwise.
- Recurrence: $d^{(k)}[i][j]=\min(d^{(k-1)}[i][j],\;d^{(k-1)}[i][k]+d^{(k-1)}[k][j])$.
- Final: $d^{(n)}[i][j]$ = true shortest-path distance. Negative cycle: if $d^{(n)}[v][v]<0$ for any $v$.

Complexity: $O(n^3)$ time, $O(n^2)$ space (matrices updated in place).

**Algorithm comparison**:

| Algorithm | Weights | Source | Time complexity | Negative-cycle detection |
|---|---|---|---|---|
| Dijkstra | $\ge0$ only | Single | $O((n+m)\log n)$ | No (invalid for negative) |
| Bellman-Ford | Any real | Single | $O(nm)$ | Yes |
| Floyd-Warshall | Any real | All pairs | $O(n^3)$ | Yes (diagonal check) |

## Component 4 — Worked Examples

**Example 1 (LO1 — Dijkstra)**: Graph on $\{s,a,b,t\}$: $s\to a=2, s\to b=5, a\to b=1, a\to t=6, b\to t=3$. Initialize: $d[s]=0, d[a]=d[b]=d[t]=\infty$. Extract $s$: relax $a\to 2$, $b\to 5$. Extract $a$ ($d=2$): relax $b\to\min(5,2+1)=3$, $t\to\min(\infty,2+6)=8$. Extract $b$ ($d=3$): relax $t\to\min(8,3+3)=6$. Extract $t$ ($d=6$). Final: $d[s]=0, d[a]=2, d[b]=3, d[t]=6$. Shortest path $s\to t$: $s\to a\to b\to t$ with cost 6.

**Example 2 (LO2 — Bellman-Ford with negative edge)**: Graph on $\{s,a,b,t\}$: $s\to a=3, s\to b=5, a\to t=2, b\to a=-2$. Dijkstra would fail (negative edge $b\to a=-2$). Bellman-Ford: Round 1 (process all edges): $d[a]\to3, d[b]\to5, d[t]\to5$ (via $a$), $d[a]\to\min(3,5-2)=3$ (no update). Round 2: $d[t]\to\min(5,3+2)=5$ (no change). Round 3: no change. True shortest: $s\to b\to a\to t=5-2+2=5$? Wait: $s\to b=5, b\to a=-2$ gives $d[a]=5-2=3$; $a\to t=2$ gives $d[t]=5$. Same as direct $s\to a\to t=3+2=5$. No negative cycle. Final: $d[s]=0, d[a]=3, d[b]=5, d[t]=5$.

**Example 3 (LO3 — Floyd-Warshall)**: Graph on $\{1,2,3\}$: $1\to2=3, 2\to3=1, 1\to3=8, 3\to1=2$. Initial $d^{(0)}$: $d[1][2]=3, d[2][3]=1, d[1][3]=8, d[3][1]=2$; all $d[i][i]=0$; rest $=\infty$. After $k=1$ (intermediate vertex 1): $d[2][1]=\infty$ (no $2\to1$), no updates from using 1. After $k=2$: $d[1][3]=\min(8, d[1][2]+d[2][3])=\min(8,3+1)=4$. After $k=3$: $d[2][1]=\min(\infty, d[2][3]+d[3][1])=\min(\infty,1+2)=3$; $d[1][1]=\min(0, d[1][3]+d[3][1])=\min(0,4+2)=0$ (no update). Final: $d[1][2]=3, d[1][3]=4, d[2][3]=1, d[2][1]=3, d[3][1]=2, d[3][2]=\min(\infty,d[3][1]+d[1][2])=5$. No diagonal negative — no negative cycle.

## Component 5 — Teaching Actions

### Teaching Action A01 — Dijkstra as "Expand the Closest Frontier" (Primitive P11: Representation Shift)

Draw the graph on a board with distances labeled. Simulate Dijkstra by placing coins on vertices at current $d$ values; each round, flip the coin with smallest value to "finalized" and update neighbors. The key insight: once a vertex is finalized, its distance is FOREVER correct — because no future edge can make it shorter (all weights non-negative).

- **MC-1 hook**: ask "What goes wrong if we apply Dijkstra to a graph with a $-4$ edge?" — Demonstrate on Example 2: Dijkstra would finalize $d[a]=3$ from the direct path, but the true shortest path $s\to b\to a$ has cost $5-2=3$ — same in this case, but in general, a negative edge can route through a "more expensive" vertex to arrive cheaper, which Dijkstra's finalization rule cannot handle.

### Teaching Action A02 — Bellman-Ford: Why $n-1$ Rounds (Primitive P25: Deductive)

State: "A shortest path with no negative cycles visits at most $n-1$ edges (otherwise it repeats a vertex and we could short-circuit)." So after round $k$, $d[v]$ is the true shortest distance using at most $k$ edges. After $n-1$ rounds, it's the true shortest distance overall. Round $n$ (the detection round): if any edge still relaxes, there's a negative cycle. Run on a concrete example with a negative cycle — show $d$ values decrease without bound.

- **MC-2 hook**: ask "Can Bellman-Ford compute wrong answers after $n-1$ rounds if there's no negative cycle?" — No: the invariant guarantees correctness. But if there IS a negative cycle, the values at round $n-1$ are also wrong (undefined semantically), and the detection pass catches this.

### Teaching Action A03 — Floyd-Warshall: DP on Intermediate Sets (Primitive P16: Counterexample for limits)

Explain the DP structure: $d^{(k)}[i][j]$ considers paths that only go through $\{1,\ldots,k\}$ as intermediaries. Work Example 3 step by step. Then show: Floyd-Warshall is $O(n^3)$ but handles all pairs at once — for dense graphs ($m=\Theta(n^2)$), running Dijkstra from each vertex is $O(n\cdot m\log n)=O(n^3\log n)$, slower than Floyd-Warshall. For sparse graphs ($m=\Theta(n)$), $n$ Dijkstra runs is $O(n^2\log n)$, faster than Floyd-Warshall's $O(n^3)$.

- **MC-3 hook**: ask "Can Floyd-Warshall detect a negative cycle at a non-diagonal entry?" — No: a negative cycle through vertex $v$ must include $v$ as both start and end, so only the diagonal entry $d[v][v]<0$ reveals it. Off-diagonal entries may be wrong (very negative), but the negative-cycle EVIDENCE is only at the diagonal.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (5-problem set)**:
  1. Run Dijkstra on: $s\to a=1, s\to b=4, a\to b=2, a\to c=5, b\to c=1$. List the order in which vertices are finalized and give $d[c]$.
  2. Add edge $c\to a=-3$ to the graph above. Explain why Dijkstra would give an incorrect answer, and run Bellman-Ford to compute the correct $d[c]$. Is there a negative cycle?
  3. Run Floyd-Warshall on the 3-vertex graph: $1\to2=5, 2\to3=3, 3\to1=-4$. Compute the full distance matrix and determine whether a negative cycle exists.
  4. A graph has $n=100$ vertices and $m=200$ edges, all non-negative. Which algorithm gives the fastest correct answer for all-pairs shortest paths — running Dijkstra from each vertex or Floyd-Warshall? Justify with complexity analysis.
  5. Prove that the shortest path substructure holds: if $p$ is a shortest path from $u$ to $v$ passing through $w$, then the sub-path from $u$ to $w$ is a shortest path from $u$ to $w$. (Use this to justify why the Bellman-Ford relaxation invariant works.)
- **P76 (Transfer Probe, mode = independence)**: "**Johnson's algorithm** solves all-pairs shortest paths on sparse graphs with possibly negative weights. It works in three steps: (1) Add a new vertex $q$ with zero-weight edges to all other vertices; run Bellman-Ford from $q$ to compute potentials $h(v)$; (2) Reweight every edge $(u,v)$ by $\hat{w}(u,v)=w(u,v)+h(u)-h(v)$ (making all weights non-negative); (3) Run Dijkstra from each vertex on the reweighted graph; adjust back using $d(u,v)=\hat{d}(u,v)-h(u)+h(v)$. (a) Verify that the reweighting $\hat{w}(u,v)\ge0$ whenever $h$ satisfies the Bellman-Ford invariant (i.e., $h(v)\le h(u)+w(u,v)$ for all edges). (b) State Johnson's overall complexity and explain when it beats Floyd-Warshall. (c) Why is adding the dummy vertex $q$ necessary rather than simply using Bellman-Ford from any existing vertex?"
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Shortest Path Algorithms — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIJKSTRA-WORKS-WITH-NEGATIVE-EDGES | Believing Dijkstra is correct for graphs with negative edge weights — once a vertex is finalized (extracted from the priority queue), Dijkstra assumes no further relaxation is possible, but a negative edge from a later vertex can invalidate that finalization | Critical |
| MC-2 | BELLMAN-FORD-NEEDS-MORE-THAN-N-MINUS-1-ROUNDS | Believing Bellman-Ford requires $n$ or more rounds to guarantee correctness — in fact $n-1$ rounds suffice because any simple path (in a negative-cycle-free graph) uses at most $n-1$ edges; round $n$ is used only for negative-cycle DETECTION, not for convergence | Foundational |
| MC-3 | FLOYD-WARSHALL-NEGATIVE-CYCLE-FROM-OFF-DIAGONAL | Believing that an off-diagonal entry $d[i][j]<0$ proves a negative cycle — negative off-diagonal values can occur without a negative cycle (simply meaning there's a cheaper path from $i$ to $j$); a negative cycle is proven only by $d[v][v]<0$ for some $v$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Dijkstra Requires Non-Negative Weights for Correctness") → P41 (detect: ask what Dijkstra computes on a graph with edge weight $-1$ and whether it's correct — construct a 3-vertex example where the finalized distance is wrong) → P64 (conceptual shift: Dijkstra's correctness proof relies on the invariant that extracting a vertex $u$ means $d[u]$ is final; this holds only because future relaxations via non-negative edges cannot decrease $d[u]$; a single negative edge destroys this invariant; use Bellman-Ford or Johnson's algorithm for negative weights).
- **B02 (targets MC-2)**: P27 (name it: "Bellman-Ford Converges in $n-1$ Rounds Exactly") → P41 (detect: ask why running Bellman-Ford for $n$ rounds instead of $n-1$ would still give the correct answer when there is no negative cycle — it would, but the $n$th round is entirely redundant for convergence; it's used as a detection pass, a different purpose) → P64 (conceptual shift: the invariant after round $k$ is "d[v] ≤ true shortest distance using ≤k edges" — this is the key; after $n-1$ rounds it equals the true shortest distance because simple paths use at most $n-1$ edges; understanding the invariant makes it clear that exactly $n-1$ rounds — not $n-2$, not $n$ — are required for correctness without detection).
- **B03 (targets MC-3)**: P27 (name it: "Negative-Cycle Evidence Is Only at the Diagonal") → P41 (detect: in Example 3's Floyd-Warshall result, ask which entries could be negative even without a negative cycle — off-diagonal entries can be large negative numbers simply because there is a cheap directed path from $i$ to $j$) → P64 (conceptual shift: $d[v][v]$ starts at 0 and represents the length of the shortest closed walk at $v$; if this becomes negative after all $n$ Floyd-Warshall iterations, a negative-weight closed walk (= negative cycle reachable from and returning to $v$) exists; off-diagonal entries going negative just mean cheap paths exist, not cycles).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.graph.graph` (weighted digraphs, adjacency); `math.disc.asymptotic-notation` ($O$-notation, loop analysis).
- **Unlocks**: `math.graph.maximum-flow`.
- **Cross-link**: none in KG → P76 uses independence mode.

## Component 8 — Teaching Notes

- The three algorithms form a clean progression: Dijkstra (fastest, restricted); Bellman-Ford (slower, handles negatives); Floyd-Warshall (all-pairs, DP structure). Teaching them in this order makes each algorithm's tradeoffs immediately apparent by comparison with the previous.
- Johnson's algorithm in the transfer probe is the natural synthesis: it combines Bellman-Ford's reweighting with Dijkstra's speed to achieve all-pairs SP on sparse negative-weight graphs — a result no student expects to be possible after seeing Dijkstra's restriction. This makes it a genuinely high-level transfer challenge.
- Negative cycles are the boundary condition that makes shortest paths ill-defined. Always establish this first; then every algorithm's restriction or detection capability makes conceptual sense. Students who don't internalize this will be repeatedly confused by "undefined" outputs.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.graph.graph`, `math.disc.asymptotic-notation`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.graph.maximum-flow`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: proficient, algorithm analysis on abstract weighted digraphs) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires running all three algorithms on new graphs, detecting negative cycles, formal substructure proof, and complexity comparison — not listing algorithm names | PASS |
