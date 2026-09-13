# math.graph.shortest-path

## Identity
- **KG id**: `math.graph.shortest-path`
- **Domain**: math.graph
- **Requires**: `math.graph.graph`, `math.disc.asymptotic-notation`
- **Unlocks**: `math.graph.maximum-flow`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Define the shortest-path problem on a weighted directed graph and explain why negative-weight
cycles make it undefined; execute Dijkstra's algorithm (correct only for non-negative weights,
$O((n+m)\log n)$); execute Bellman-Ford (handles negative weights, detects negative cycles,
$O(nm)$); and execute Floyd-Warshall (all-pairs, $O(n^3)$), comparing all three on weight
restrictions, source count, and asymptotic complexity.

## Core Understanding
A weighted directed graph $G=(V,E,w)$ has a **shortest path** from $s$ to $t$ defined as the walk
of minimum total weight. A **negative cycle** — a directed cycle with negative total weight —
makes shortest paths to any vertex reachable through it undefined ($-\infty$), since the cycle can
be traversed indefinitely to decrease the total weight without bound. All three standard
algorithms either require the absence of negative cycles or explicitly detect them.

**Dijkstra's algorithm** requires all edge weights $w(e)\ge0$. It maintains tentative distances
$d[v]$, repeatedly extracts the vertex $u$ with smallest tentative distance, and RELAXES each of
$u$'s edges (updating $d[v]$ if a shorter path through $u$ is found). Its correctness hinges on
one invariant: once $u$ is extracted, $d[u]$ is FINAL, because every future relaxation uses a
non-negative weight and can therefore only ever increase a candidate distance through $u$, never
decrease $d[u]$ itself below its already-extracted value. With a binary min-heap, complexity is
$O((n+m)\log n)$.

**Bellman-Ford** handles ANY real edge weights. It relaxes every edge, $n-1$ times total. The
invariant: after $k$ relaxation rounds, $d[v]$ equals the true shortest-path weight using AT MOST
$k$ edges. Since any simple shortest path (in a negative-cycle-free graph) uses at most $n-1$
edges, $n-1$ rounds suffice for full correctness. A final, $n$-th relaxation pass serves a
DIFFERENT purpose — negative-cycle DETECTION, not further convergence: if any edge still relaxes
after $n-1$ rounds, a negative cycle is reachable. Complexity is $O(nm)$.

**Floyd-Warshall** computes ALL-PAIRS shortest paths via dynamic programming on intermediate
vertex sets: $d^{(k)}[i][j]$ is the shortest path from $i$ to $j$ using only vertices
$\{1,\ldots,k\}$ as intermediates, with the recurrence
$d^{(k)}[i][j]=\min(d^{(k-1)}[i][j],\,d^{(k-1)}[i][k]+d^{(k-1)}[k][j])$. Complexity is $O(n^3)$.
Negative-cycle detection is possible ONLY via the DIAGONAL entries: if $d^{(n)}[v][v]<0$ for some
$v$, a negative cycle through $v$ exists — since a negative cycle through $v$ must both start and
end at $v$, its evidence appears only on the diagonal; off-diagonal negative values simply mean a
cheap directed path exists, with no cycle implied.

## Mental Models
- **"Once a non-negative-weight vertex is finalized, it stays final — future relaxations can only
  make things worse, never better, for that vertex."**
- **"Bellman-Ford's $n-1$ rounds guarantee convergence; the $n$-th round is a detector, not more
  convergence."**
- **"A negative cycle can only be seen on the diagonal — off-diagonal negatives just mean a cheap
  path exists."**

## Why Students Fail
- **MC-1 (Type 1, overgeneralization)**: Dijkstra's correctness, proven specifically under the
  non-negative-weight assumption, is overgeneralized to graphs with negative edges, where the
  finalization invariant the proof depends on genuinely fails.
- **MC-2 (Type 1, overgeneralization)**: a generic "more iterations is always safer" algorithmic
  instinct is overgeneralized onto Bellman-Ford, obscuring that its own convergence proof
  guarantees correctness in EXACTLY $n-1$ rounds — no more are needed for convergence, and the
  $n$-th round serves an entirely different (detection) purpose.
- **MC-3 (Type 2, perceptual intuition)**: any negative number in the distance matrix visually
  reads as "a problem," and that perceptual impression is overgeneralized into treating any
  negative entry as negative-cycle evidence, when only the diagonal genuinely proves it.

## Misconceptions

### MC-1: DIJKSTRA-WORKS-WITH-NEGATIVE-EDGES
- **Surface form**: applying Dijkstra to a graph containing a negative edge and trusting the
  result, believing the algorithm remains correct.
- **Frequency band**: Critical.
- **Root cause (Type 1)**: as described above.
- **Repair**: construct a graph where a negative edge from a LATER vertex would need to reduce
  an ALREADY-finalized vertex's distance, showing Dijkstra's finalization invariant is violated
  and the wrong distance is returned.

### MC-2: BELLMAN-FORD-NEEDS-MORE-THAN-N-MINUS-1-ROUNDS
- **Surface form**: believing Bellman-Ford requires $n$ or more rounds for correctness, treating
  the detection round as necessary for convergence.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: re-derive the invariant explicitly — after $k$ rounds, $d[v]$ is correct for paths
  using at most $k$ edges — and note that since any simple path (with no negative cycle) uses at
  most $n-1$ edges, round $n-1$ already achieves full correctness; the $n$-th round is purely
  diagnostic.

### MC-3: FLOYD-WARSHALL-NEGATIVE-CYCLE-FROM-OFF-DIAGONAL
- **Surface form**: believing a negative off-diagonal entry $d[i][j]<0$ proves a negative cycle
  exists.
- **Frequency band**: Moderate.
- **Root cause (Type 2)**: as described above.
- **Repair**: re-anchor that $d[v][v]$ represents the length of the shortest closed walk starting
  and ending at $v$ — only a negative VALUE THERE proves a negative cycle through $v$; an
  off-diagonal negative simply reflects a cheap directed path from $i$ to $j$, with no cyclic
  claim at all.

## Analogies
- **"A sealed envelope"**: once Dijkstra finalizes a vertex's distance (extracts it), the value is
  sealed — but that seal is only trustworthy because every future contribution can only add,
  never subtract; a negative edge breaks the seal's guarantee.
- **Anti-analogy**: Bellman-Ford's extra round is NOT "more of the same convergence work" — it is
  a fundamentally different kind of check (detection), and treating it as simply "round $n$ of
  convergence" misses its actual purpose.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: run Dijkstra on a graph with one negative edge, showing the
  finalized distance is wrong compared to the true shortest path.
- **Demonstration 2 (targets MC-2)**: run Bellman-Ford, showing distances stabilize exactly by
  round $n-1$ and the $n$-th round changes nothing (in a negative-cycle-free graph) — confirming
  it serves detection, not further convergence.
- **Demonstration 3 (targets MC-3)**: run Floyd-Warshall on a graph with a cheap directed path but
  no negative cycle, showing a negative off-diagonal entry with every diagonal entry remaining
  non-negative.

## Discovery Questions
1. "If a vertex has been 'finalized' by Dijkstra, what would have to be true for a LATER edge to
   still improve its distance? Can that happen with negative weights?"
2. "If Bellman-Ford's own invariant guarantees correctness after $n-1$ rounds, what is the $n$-th
   round actually checking?"
3. "Does a negative entry ANYWHERE in the distance matrix prove a negative cycle, or only a
   negative entry in a SPECIFIC location?"

## Teaching Sequence
1. **Anchor**: connect to `math.graph.graph`'s weighted directed graphs and
   `math.disc.asymptotic-notation`'s complexity analysis, framing the shortest-path problem and
   the role of negative cycles.
2. **Representation shift**: Dijkstra as "expand the closest frontier," with a live finalization
   demonstration.
3. **Deductive**: derive Bellman-Ford's $n-1$-round correctness from the shortest-path
   optimal-substructure invariant.
4. **Contrast/counterexample**: Floyd-Warshall's dynamic-programming structure, with the
   diagonal-only negative-cycle detection rule.
5. **Mastery gate**: require running all three algorithms on novel graphs, detecting a negative
   cycle correctly, proving the shortest-path optimal-substructure property, and comparing
   complexity across algorithms for a given graph density.

## Tutor Actions
- Whenever a graph might contain a negative edge, ask which algorithm is actually valid before
  accepting a Dijkstra-based answer.
- When Bellman-Ford's round count is discussed, ask the learner to state what the $n$-th round is
  FOR, separately from the first $n-1$.
- When a negative distance-matrix entry is flagged as a possible cycle, ask whether it is on the
  diagonal before accepting the claim.

## Voice Teaching Notes
- Introduce negative cycles FIRST, before any algorithm, so every algorithm's restriction or
  detection capability makes sense as a response to this boundary condition from the start.
- When a learner claims Dijkstra "should still basically work" with a negative edge, ask them to
  trace which vertex was finalized before the negative edge was even considered.

## Assessment Signals
- **Rung 1 (recognition)**: learner states that Dijkstra requires non-negative weights and that a
  negative cycle makes shortest paths undefined.
- **Rung 2 (application)**: learner correctly executes Dijkstra, Bellman-Ford, and Floyd-Warshall
  on concrete graphs, including negative-cycle detection.
- **Rung 3 (transfer)**: learner correctly proves the shortest-path optimal-substructure property
  and correctly compares the three algorithms' complexity trade-offs for a given graph density.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the negative-edge counterexample with the learner's own graph.
- If MC-2 recurs, re-derive the $n-1$-round invariant explicitly with the learner.
- If MC-3 recurs, re-run the cheap-path-without-cycle demonstration.

## Memory Hooks
- "Non-negative weights only — Dijkstra's finalization depends on it."
- "$n-1$ rounds converge; the $n$-th round only detects."
- "Only the diagonal proves a negative cycle."

## Transfer Connections
- `math.graph.graph` (already authored): supplies the weighted directed graph structure this
  entire concept operates on.
- `math.disc.asymptotic-notation` (already authored): supplies the complexity-analysis vocabulary
  used to compare the three algorithms.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.graph.shortest-path.md`, reused by
  reference for its worked Dijkstra/Bellman-Ford/Floyd-Warshall examples, its algorithm
  comparison table, and its three-misconception registry (independently birth-type-classified
  above, since the Blueprint carries severity labels but no birth-type column).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe on Johnson's
  algorithm (combining Bellman-Ford reweighting with Dijkstra's speed for all-pairs shortest
  paths on sparse negative-weight graphs).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy.** `requires`, `unlocks`, `cross_links` (none, on both
  sides), `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` all match exactly
  between the Blueprint and the live KG.
- Genuine one-directional `unlocks`/`requires` asymmetry noted (not fixed): this entry's own
  `unlocks` field names `math.graph.maximum-flow`, but that already-authored entry (Batch 26)
  does not name `shortest-path` back in its own `requires` (its actual prerequisite is
  `math.graph.connectivity`) — recorded as a one-directional forward note, not a contradiction,
  since the KG's `unlocks` field is not required to mirror `requires` exactly.

## Version History
- 2026-09-13 (Batch 65): authored. Unblocked by `math.graph.graph` (Batch 24) and
  `math.disc.asymptotic-notation` (Batch 63) — this is the concept whose unblocking was
  discovered as a side effect of Batch 63's own `asymptotic-notation` authoring, reopening
  `math.graph` from its PARKED state. Companion batch concepts: `math.calc.taylor-series`,
  `math.seq.harmonic-series`, `math.disc.stirling-numbers`. `math.graph` moves from **13/16**
  toward **14/16** this batch.
