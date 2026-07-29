# Teaching Blueprint: Graph Matching (`math.graph.matching`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.matching` |
| name | Graph Matching |
| domain | Graph Theory |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.graph.graph` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner; matching theory is built on formal set-theoretic definitions of vertex-disjoint edge sets, augmenting paths, and combinatorial theorems requiring abstract proof |
| description (KG) | Matching: set of pairwise non-adjacent edges. Perfect matching, maximum matching, maximal matching. Hall's theorem (bipartite perfect matching condition). Augmenting path algorithm. König's theorem (bipartite: max matching = min vertex cover). |

## Component 1 — Learning Objectives

- LO1: Define a **matching** $M$ (set of pairwise non-adjacent edges), **maximum matching** (largest $|M|$), **maximal matching** (cannot add more edges), and **perfect matching** ($|M|=n/2$); distinguish these three concepts via counterexamples; define **$M$-alternating** and **$M$-augmenting** paths and state Berge's theorem ($M$ is maximum iff no augmenting path exists).
- LO2: State and apply **Hall's theorem**: a bipartite graph $G=(A\cup B,E)$ has a perfect matching (saturating all of $A$) iff for every $S\subseteq A$, $|N(S)|\ge|S|$; use Hall's condition to certify or refute the existence of a perfect matching without finding one.
- LO3: State **König's theorem** (in bipartite graphs, max matching size = min vertex cover size); apply it to find a minimum vertex cover from a maximum matching; contrast with general graphs where König fails and only the Gallai identity $\alpha+\tau=n$ holds.

## Component 2 — Prerequisite Check

Assumes mastery of `math.graph.graph` (bipartite graphs, adjacency, paths, connected components). Requires familiarity with induction and set notation for Hall's theorem proof. No further prerequisites.

## Component 3 — Core Explanation

**Matching definitions.** A **matching** $M\subseteq E$ in $G=(V,E)$ is a set of edges with no shared endpoints. A vertex $v$ is **$M$-saturated** if some edge of $M$ is incident to $v$; otherwise **$M$-free**. A **perfect matching** saturates every vertex (requires $n$ even). A **maximum matching** has maximum $|M|$. A **maximal matching** has no edges that can be added without violating the matching property (greedy matchings are maximal; maximal ≠ maximum).

**Augmenting paths.** An **$M$-alternating path** alternates between edges in $M$ and edges not in $M$. An **$M$-augmenting path** is an $M$-alternating path between two $M$-free vertices. Augmenting along path $P$: $M\leftarrow M\triangle P$ (symmetric difference) increases $|M|$ by 1.

**Berge's Theorem** (1957). $M$ is a maximum matching iff no $M$-augmenting path exists. Proof sketch: if $M$ is not maximum, let $M^*$ be larger; consider $M\triangle M^*$ (a set of paths/cycles alternating between $M$ and $M^*$-edges); since $|M^*|>|M|$, some component has more $M^*$-edges than $M$-edges — this is an augmenting path.

**Bipartite matching algorithms.** In bipartite graphs, augmenting paths are found in $O(m)$ by BFS/DFS. Starting from any matching (e.g., empty), augment while augmenting paths exist. Total: $O(nm)$. Hopcroft-Karp finds augmenting paths in batches of shortest length: $O(m\sqrt{n})$.

**Hall's Theorem** (1935). A bipartite graph $G=(A\cup B,E)$ has a matching saturating all of $A$ iff for every $S\subseteq A$: $|N(S)|\ge|S|$ where $N(S)=$ neighbors of $S$ in $B$. This is the **Hall condition**.

Proof direction ($\Rightarrow$): if a perfect matching on $A$ exists, each vertex in $S$ is matched to a distinct vertex in $N(S)$, so $|N(S)|\ge|S|$.

Proof direction ($\Leftarrow$): by induction on $|A|$. Base $|A|=1$: Hall condition gives $|N(\{a\})|\ge1$, so $a$ has a neighbor. Inductive step: two cases — (1) Hall condition is tight for all proper $S\subsetneq A$: use a matched edge and induct; (2) Hall condition is slack for all proper $S$: pick any edge $ab$, match $a$ to $b$, verify Hall condition still holds for $A\setminus\{a\}$ in $G-\{a,b\}$ (the slack condition provides the spare).

**Vertex cover.** A **vertex cover** $C\subseteq V$ is a set such that every edge has at least one endpoint in $C$. The **minimum vertex cover** $\tau(G)$ = minimum $|C|$.

**König's Theorem** (1931). In bipartite graphs: $\nu(G)=\tau(G)$ (max matching = min vertex cover). Always $\nu(G)\le\tau(G)$ (a matched edge requires at least one endpoint in the cover). Equality in bipartite graphs follows from LP duality on the bipartite matching polytope.

**Gallai identities.** For any graph: $\alpha(G)+\tau(G)=n$ (independence number + vertex cover = $n$). In bipartite graphs additionally: $\nu(G)+\alpha'(G)=m$ does not hold in general; but $\nu=\tau$ gives $\alpha=n-\tau=n-\nu$.

## Component 4 — Worked Examples

**Example 1 (LO1 — augmenting paths)**: Bipartite graph $A=\{a_1,a_2,a_3\}$, $B=\{b_1,b_2,b_3\}$; edges $a_1b_1, a_1b_2, a_2b_1, a_3b_2, a_3b_3$. Matching $M=\{a_1b_1, a_3b_2\}$. $M$-free vertices: $a_2, a_3$ — wait, $a_3$ is saturated; $a_2$ is $M$-free; $b_2$ is saturated, $b_3$ is $M$-free. Augmenting path from $a_2$: $a_2\to b_1$ (not in $M$) $\to a_1$ (in $M$) $\to b_2$ (not in $M$) $\to a_3$ (in $M$) $\to b_3$ (not in $M$). Wait — $a_3b_3$ is not in $E$ in this example. Augmenting path from $a_2$: $a_2b_1\notin M \to b_1a_1\in M \to a_1b_2\notin M$. End at $b_2$ which is $M$-saturated (via $a_3b_2\in M$). Continue: $\to b_2a_3\in M \to a_3b_3\notin M$. End: $b_3$ is $M$-free! Augmenting path: $a_2-b_1-a_1-b_2-a_3-b_3$. Augment: $M\leftarrow\{a_2b_1, a_1b_2, a_3b_3\}$, $|M|=3$ (perfect matching).

**Example 2 (LO2 — Hall's theorem)**: $A=\{a_1,a_2,a_3\}$, $B=\{b_1,b_2\}$; edges $a_1b_1, a_2b_1, a_3b_2$. Check Hall's condition: $S=\{a_1,a_2\}$: $N(S)=\{b_1\}$, $|N(S)|=1<2=|S|$. Hall condition FAILS. No perfect matching on $A$ exists (since $|B|<|A|$ anyway, but even restricting to "matching saturating $A$" fails). More interesting: $A=\{a_1,a_2\}$, $B=\{b_1,b_2,b_3\}$; edges $a_1b_1, a_1b_2, a_2b_2, a_2b_3$. Check: $S=\{a_1\}$: $|N|=2\ge1$ ✓. $S=\{a_2\}$: $|N|=2\ge1$ ✓. $S=\{a_1,a_2\}$: $N=\{b_1,b_2,b_3\}$, $|N|=3\ge2$ ✓. Hall satisfied → perfect matching saturating $A$ exists: $\{a_1b_1, a_2b_3\}$.

**Example 3 (LO3 — König's theorem and vertex cover)**: From Example 1's final matching $M=\{a_2b_1, a_1b_2, a_3b_3\}$ (perfect matching on 3+3 vertices). Min vertex cover: by König, $\tau=\nu=3$. One cover: $\{a_2,a_1,a_3\}=A$ (all left vertices) — covers every edge ✓ — has size 3 = max matching. A smaller cover of size 2 would contradict König. Verify: any cover of size 2 must leave one $a_i$ uncovered; then the edge $a_ib_j\in M$ (matched edge) has $b_j$ covered; but is every edge covered? With $A\setminus\{a_i\}$ covered, edges incident to $a_i$ need $b_j$ covered — if we include $b_j$, we have cover $\{a_{i'},a_{i''},b_j\}$ of size 3. Can't do it in 2. ✓

## Component 5 — Teaching Actions

### Teaching Action A01 — Maximal vs. Maximum: A Critical Distinction (Primitive P11: Representation Shift)

Draw a path $P_6=1-2-3-4-5-6$. Maximal matching via greedy: take edge $\{1,2\}$, then $\{3,4\}$, then $\{5,6\}$ → perfect matching, size 3. Now take $\{2,3\}$, then $\{5,6\}$ → maximal (can't add more), size 2. A maximal matching can be half the size of the maximum. State: greedy matchings are maximal but may not be maximum.

- **MC-1 hook**: ask "If I can't add any more edges to a matching $M$, is $M$ maximum?" — No: maximal means no edges can be added while preserving the matching property; maximum means $|M|$ is largest possible. A matching can be maximal but not maximum. The gap can be as bad as $\nu/2$ (half the maximum matching size) for a maximal matching.

### Teaching Action A02 — Hall's Condition as a Structural Test (Primitive P25: Deductive)

State Hall's theorem. Demonstrate with Example 2 (Hall fails → no perfect matching). Then work the positive case. Emphasize: Hall's condition tests ALL subsets $S$ — exponentially many — but in practice one can often find the violating set $S$ (called a Hall violator) quickly by inspection or network-flow arguments (the König min-cut gives it automatically).

- **MC-2 hook**: ask "If Hall's condition holds for all SINGLETONS $S=\{a\}$ (each vertex has a neighbor), does that guarantee a perfect matching?" — No: Hall's condition must hold for ALL subsets, not just singletons. Example: $A=\{a_1,a_2\}$, $B=\{b_1\}$; $a_1b_1$ and $a_2b_1$: each singleton satisfies Hall ($|N(\{a_i\})|=1\ge1$), but $S=\{a_1,a_2\}$ gives $|N|=1<2$: no perfect matching.

### Teaching Action A03 — König's Theorem: Matching Equals Cover in Bipartite Graphs (Primitive P16: Counterexample for general graphs)

State König's theorem. Work Example 3. Then ask: "Does König hold for general graphs?" — No: $K_3$ (triangle) has $\nu=1$ (one edge is a maximum matching) but $\tau=2$ (need two vertices to cover all 3 edges — check: one vertex covers only 2 edges of $K_3$). So $\nu=1<2=\tau$ in $K_3$ — König fails for non-bipartite graphs. The correct general relation is $\nu\le\tau\le2\nu$ (Gallai's inequality).

- **MC-3 hook**: ask "Does a minimum vertex cover always contain exactly one endpoint of each maximum matching edge?" — Not necessarily: a minimum vertex cover might include both endpoints of some matched edges and neither endpoint of others (as long as all edges are covered); the exact structure relates to the alternating-path construction in the König proof.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find a maximum matching in the bipartite graph $A=\{a_1,a_2,a_3,a_4\}$, $B=\{b_1,b_2,b_3,b_4\}$, edges: $a_1b_1,a_1b_2,a_2b_2,a_2b_3,a_3b_3,a_3b_4,a_4b_1,a_4b_4$. Show the augmenting-path sequence starting from the empty matching.
  2. Check Hall's condition for the bipartite graph $A=\{a_1,a_2,a_3\}$, $B=\{b_1,b_2,b_3\}$; edges: $a_1b_1,a_2b_1,a_2b_2,a_3b_2,a_3b_3$. Does a perfect matching saturating $A$ exist? If not, exhibit the Hall violator $S$.
  3. Use König's theorem to find the minimum vertex cover of the graph in Problem 1 from its maximum matching. Verify your answer by checking that every edge has at least one endpoint in the cover.
  4. Give an example of a non-bipartite graph on 5 vertices where $\nu(G)<\tau(G)$. State both values and verify.
- **P76 (Transfer Probe, mode = independence)**: "**Deficiency version of Hall's theorem**: For a bipartite graph $G=(A\cup B,E)$, the maximum size of a matching saturating $A$ is $\min_{S\subseteq A}(|A|-|S|+|N(S)|)=|A|-\text{def}(G)$, where $\text{def}(G)=\max_{S\subseteq A}(|S|-|N(S)|)$ is the **deficiency** (0 if Hall's condition holds). (a) Compute the deficiency of the graph in Problem 2 above and verify that the maximum matching size equals $|A|-\text{def}(G)$. (b) State and prove the deficiency formula as a generalization of Hall's theorem (hint: the Hall violator achieving maximum $|S|-|N(S)|$ is the bottleneck; connecting it to Berge's theorem gives the formula). (c) How does the deficiency formula change if we want a matching saturating all of $B$ instead of $A$?"
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Graph Matching — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MAXIMAL-EQUALS-MAXIMUM | Confusing maximal matching (locally extensible to no further edges) with maximum matching (globally largest); a maximal matching may have fewer than half the edges of a maximum matching; greedy construction gives maximal, not necessarily maximum | Critical |
| MC-2 | HALL-CONDITION-ONLY-FOR-SINGLETONS | Believing Hall's theorem only requires checking individual vertices (each $a\in A$ has a neighbor) rather than ALL subsets $S\subseteq A$; the Hall violator is almost always a non-singleton subset, and singleton-checking catches only isolated vertices | Critical |
| MC-3 | KÖNIG-HOLDS-FOR-ALL-GRAPHS | Believing König's theorem ($\nu=\tau$) applies to general (non-bipartite) graphs — it fails for odd cycles and general non-bipartite graphs; the Gallai inequality $\nu\le\tau\le2\nu$ is the correct general bound; matching and covering theory diverge for non-bipartite graphs (Edmonds' blossom algorithm is required for maximum matching) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Maximal Matching Is Not Maximum Matching") → P41 (detect: give $P_4=1-2-3-4$ and ask for a maximal matching of size 1 — yes: $\{2,3\}$ is maximal (vertices 1,4 are free but $1-2$ would extend it — wait, $\{2,3\}$: add $\{1,2\}$? No, 2 is already saturated. Add $\{1,4\}$? No edge $\{1,4\}$ exists in $P_4$. Actually $\{2,3\}$ is maximal with size 1, while max matching is 2) → P64 (conceptual shift: a matching is maximal when no additional edge can be added WITHOUT violating the matching property; maximal is a LOCAL stability condition; maximum is a GLOBAL optimality condition; Berge's theorem gives the global test — existence of an augmenting path — that distinguishes them).
- **B02 (targets MC-2)**: P27 (name it: "Hall's Condition Must Hold for All Subsets") → P41 (detect: exhibit the smallest failure — $A=\{a_1,a_2\}$, $B=\{b_1\}$; each vertex in $A$ has exactly one neighbor $b_1$ (singleton check passes), but $S=A$ gives $|N(S)|=1<2$; ask whether a perfect matching on $A$ exists — clearly not, since $b_1$ can be matched to at most one vertex) → P64 (conceptual shift: Hall's condition is a constraint on SETS of $A$-vertices collectively — it checks that the neighborhood expands fast enough to accommodate all vertices simultaneously, not just individually; the violating set is exactly the "bottleneck" subset where the neighborhood is too small).
- **B03 (targets MC-3)**: P27 (name it: "König's Theorem Requires Bipartiteness") → P41 (detect: compute $\nu$ and $\tau$ for $K_3$: $\nu(K_3)=1$ (only one matched edge possible); $\tau(K_3)=2$ (need 2 vertices to cover all 3 edges); $\nu\ne\tau$) → P64 (conceptual shift: König's theorem is equivalent to the strong LP duality of bipartite matching, which holds because bipartite graphs have a totally unimodular incidence matrix; for general graphs, the integrality of the matching polytope fails — fractional matchings can beat integer matchings — and König's equality breaks down; Edmonds showed that for general graphs, max matching = min vertex cover only modulo the LP relaxation, not integrally).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.graph.graph` (bipartite graphs, adjacency, paths).
- **Unlocks**: none listed in the KG.
- **Cross-link**: none in KG → P76 uses independence mode.

## Component 8 — Teaching Notes

- The maximal vs. maximum distinction (MC-1) is the entry-level trap in matching; every student who has done any greedy algorithm problem needs to confront it explicitly. Building a counterexample with $P_4$ is fast and definitive.
- Hall's theorem is one of the most applicable results in combinatorics (scheduling, assignment problems, Latin squares, doubly stochastic matrices) — establishing it with proof and counterexamples early makes the transfer probe's deficiency formula accessible as a natural extension.
- König's theorem and the Gallai identities tie matching to two other central covering concepts (vertex cover and independence number), giving a single equation $\nu=\tau$ that connects four graph parameters. Proving this requires the LP-duality perspective at the expert level, which is appropriate here.

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
| V-10 | P77 problem set has exactly 4 problems | PASS (MAMR = 4/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert, formal definitions of augmenting paths and combinatorial theorems at the proof level) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires running augmenting-path algorithm on new graph, checking Hall's condition with explicit violator search, constructing minimum vertex cover, and exhibiting König failure in non-bipartite graph — not reciting definitions | PASS |
