# math.graph.matching — Graph Matching (Maximum vs. Maximal, Hall's Theorem, König's Theorem)

## Identity
- **KG ID:** `math.graph.matching`
- **Domain:** math.graph (Graph Theory)
- **Requires:** `math.graph.graph`
- **Unlocks:** none
- **Cross-links:** none
- **Difficulty:** expert
- **Bloom level:** apply
- **Mastery threshold:** 0.75 (MAMR 4/5)
- **Estimated hours:** 6

## Learning Objective
By the end of this concept, the student can: (1) define a matching, maximum matching, maximal matching, and perfect matching, distinguishing all three via explicit counterexamples, and define $M$-alternating and $M$-augmenting paths, stating Berge's theorem (a matching is maximum iff no augmenting path exists); (2) state and apply Hall's theorem (a bipartite graph has a matching saturating one side iff every subset's neighborhood is at least as large as the subset), using it to certify or refute perfect-matching existence without constructing one; (3) state König's theorem (in bipartite graphs, maximum matching size equals minimum vertex cover size), apply it to extract a minimum vertex cover from a maximum matching, and correctly identify that König's equality fails outside bipartite graphs, where only the weaker Gallai inequality holds.

## Core Understanding
`math.graph.graph` established bipartite graphs, adjacency, and paths. This concept develops the theory of MATCHINGS — sets of edges that share no endpoints — culminating in two of the deepest classical results in combinatorics.

MATCHING DEFINITIONS, CAREFULLY DISTINGUISHED: a MATCHING $M\subseteq E$ is a set of pairwise non-adjacent edges (no two edges share an endpoint). A vertex is $M$-SATURATED if some $M$-edge touches it, otherwise $M$-FREE. A PERFECT MATCHING saturates EVERY vertex (requires $n$ even). A MAXIMUM MATCHING has the largest possible $|M|$ across all matchings. A MAXIMAL MATCHING simply cannot have any edge added without breaking the matching property — greedy construction naturally produces a maximal matching, but a maximal matching can be as small as HALF the size of a maximum matching, so maximal and maximum are genuinely different concepts, not synonyms.

AUGMENTING PATHS AND BERGE'S THEOREM: an $M$-ALTERNATING path alternates between edges in $M$ and edges not in $M$; an $M$-AUGMENTING path is an $M$-alternating path connecting two $M$-FREE vertices. Given an augmenting path $P$, taking the symmetric difference $M\triangle P$ strictly increases the matching size by exactly 1. BERGE'S THEOREM (1957) states $M$ is maximum if and only if NO $M$-augmenting path exists — this gives both a certificate of maximality (no augmenting path found) and an algorithm (repeatedly find and apply augmenting paths until none remain).

HALL'S THEOREM, A STRUCTURAL EXISTENCE TEST: for a bipartite graph $G=(A\cup B,E)$, a matching saturating ALL of $A$ exists if and only if, for EVERY subset $S\subseteq A$ (not just single vertices), $|N(S)|\ge|S|$ — the HALL CONDITION. This must hold for ALL subsets simultaneously; checking only individual vertices (singletons) is insufficient, since the true bottleneck subset is frequently a larger, non-obvious set whose combined neighborhood fails to expand fast enough even though every individual vertex has a neighbor.

KÖNIG'S THEOREM AND ITS LIMITS: a VERTEX COVER is a vertex set touching every edge; the MINIMUM VERTEX COVER size is $\tau(G)$. Always $\nu(G)\le\tau(G)$ (matching size never exceeds cover size, since each matched edge needs its own cover vertex). KÖNIG'S THEOREM (1931) proves EQUALITY, $\nu(G)=\tau(G)$, specifically for BIPARTITE graphs. This equality FAILS for general graphs — the triangle $K_3$ has $\nu=1$ but $\tau=2$ — where only the weaker GALLAI INEQUALITY $\nu\le\tau\le2\nu$ holds; matching general (non-bipartite) graphs optimally requires Edmonds' substantially more intricate blossom algorithm.

## Mental Models
1. **Rung 1 — maximal is a LOCAL stopping condition (no more edges fit); maximum is a GLOBAL optimality claim.** A matching can satisfy the local condition while being far from globally optimal; Berge's theorem is the tool that distinguishes them rigorously.
2. **Rung 2 — Hall's condition is a claim about EVERY subset collectively, not about individual vertices.** The bottleneck that defeats a perfect matching is almost always a genuinely multi-vertex subset whose combined neighborhood is too small, invisible from checking vertices one at a time.
3. **Rung 3 — bipartiteness is the hidden assumption making König's equality true; drop it and only a two-sided inequality survives.** The clean equality is a special structural gift of two-sided graphs, not a universal law of matching and covering.

## Why Students Fail
Having just constructed a matching greedily and found it cannot be extended, students naturally conclude they've found THE maximum matching, missing that "cannot be extended by adding one more edge" (maximal) is a strictly weaker claim than "no larger matching exists anywhere in the graph" (maximum) — the gap between the two can be as severe as a factor of two. Hall's theorem's quantifier structure ("for every subset $S$") is easy to under-apply because checking individual vertices FEELS like it covers "every possibility," when in fact the genuinely dangerous violating subsets are almost always sets of two or more vertices whose combined neighborhood, while each member individually has a neighbor, fails to expand enough collectively. Finally, König's theorem is stated and proven so cleanly for bipartite graphs that students readily assume it must be a universal fact about matchings and covers in any graph, missing that its proof relies specifically on bipartite structure (via LP duality and total unimodularity) that simply does not hold for graphs containing odd cycles like triangles.

## Misconceptions

### MC-1: MAXIMAL-EQUALS-MAXIMUM
- **Birth type:** Type 3 (language contamination) — critical (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Confusing maximal matching (cannot be locally extended) with maximum matching (globally largest possible); a maximal matching may have fewer than half the edges of a maximum matching, and greedy construction naturally produces maximal, not necessarily maximum, matchings.
- **Why this birth type:** Language contamination: "maximal" and "maximum" are near-homophones in everyday English often used interchangeably, while in graph theory they name genuinely different, non-equivalent conditions — a classic case where ordinary word usage actively misleads the technical distinction.
- **Detection probe:** "If I can't add any more edges to a matching $M$ without breaking the matching property, is $M$ necessarily maximum?" A student with MC-1 answers "yes."
- **Repair:** Work the path $P_6=1{-}2{-}3{-}4{-}5{-}6$ directly: the matching $\{\{2,3\},\{5,6\}\}$ (size 2) is maximal — no further edge can be added — while $\{\{1,2\},\{3,4\},\{5,6\}\}$ (size 3) is a perfect matching, strictly larger; the first is maximal but nowhere near maximum.
- **Verification of death:** Given a matching described as "cannot be extended," the student explicitly states this proves maximality only, not maximum size, and applies Berge's theorem (checking for an augmenting path) to test true maximality.

### MC-2: HALL-CONDITION-ONLY-FOR-SINGLETONS
- **Birth type:** Type 1 (overgeneralization) — critical (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Believing Hall's theorem only requires checking that each individual vertex in $A$ has at least one neighbor, rather than checking EVERY subset $S\subseteq A$ collectively; the true Hall violator is almost always a non-singleton subset.
- **Why this birth type:** Overgeneralization from the easiest, most intuitive partial check (does each vertex have SOME neighbor?) to the mistaken belief that this partial check is the whole theorem, since satisfying it FEELS like a natural sufficient condition.
- **Detection probe:** "$A=\{a_1,a_2\}$, $B=\{b_1\}$, with edges $a_1b_1$ and $a_2b_1$. Every vertex in $A$ has a neighbor. Does a perfect matching saturating $A$ exist?" A student with MC-2 answers "yes," having checked only singletons.
- **Repair:** Check the subset $S=\{a_1,a_2\}$ directly: $N(S)=\{b_1\}$, so $|N(S)|=1<2=|S|$ — Hall's condition FAILS on this two-element subset even though every individual vertex has a neighbor, so no perfect matching saturating $A$ can exist (only one of $a_1,a_2$ can be matched to the single available $b_1$).
- **Verification of death:** Given a bipartite graph, the student systematically searches for a violating subset among ALL subsets of $A$ (not just singletons) before concluding Hall's condition holds.

### MC-3: KÖNIG-HOLDS-FOR-ALL-GRAPHS
- **Birth type:** Type 1 (overgeneralization) — foundational (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Believing König's theorem ($\nu=\tau$) applies to general (non-bipartite) graphs, when it specifically requires bipartiteness; general graphs satisfy only the weaker Gallai inequality $\nu\le\tau\le2\nu$, and maximum matching in general graphs requires Edmonds' blossom algorithm.
- **Why this birth type:** Overgeneralization from a cleanly-proven, elegant equality (established specifically for bipartite graphs) to an assumption of universal applicability, since nothing in the STATEMENT of the equality visibly signals the bipartiteness dependency without deliberate attention.
- **Detection probe:** "For the triangle $K_3$, is the maximum matching size equal to the minimum vertex cover size?" A student with MC-3 answers "yes" by default, assuming König's theorem applies universally.
- **Repair:** Compute both values for $K_3$ directly: $\nu(K_3)=1$ (only one edge can be chosen without sharing a vertex) while $\tau(K_3)=2$ (any single vertex covers only 2 of the 3 edges, leaving one edge uncovered) — $\nu\neq\tau$, so König's equality genuinely fails on this non-bipartite graph.
- **Verification of death:** Given a non-bipartite graph, the student computes $\nu$ and $\tau$ independently rather than assuming their equality, and correctly cites the Gallai inequality as the applicable general bound.

## Analogies
1. **The parking-lot analogy (targets MC-1).** A maximal matching is like a parking lot where every remaining space is too small or too oddly-shaped for another car to fit as currently parked — locally, nothing more can be added. But a completely different, more efficient arrangement of the SAME cars might fit noticeably more of them in — that rearrangement is the maximum matching, and Berge's augmenting-path theorem is exactly the procedure for finding it.
2. **The committee-assignment analogy (targets MC-2).** Assigning each of several people (in $A$) to a distinct role (in $B$) works if EVERY GROUP of people, taken together, has enough distinct roles they're collectively qualified for — not just if each person individually has SOME role they can do. Two people who can only both do the SAME one role are a bottleneck no amount of individual qualification checking would catch.

## Demonstrations
### Demonstration 1 — finding an augmenting path (mirrors Blueprint Ex1)
Bipartite graph $A=\{a_1,a_2,a_3\}$, $B=\{b_1,b_2,b_3\}$, edges $a_1b_1,a_1b_2,a_2b_1,a_3b_2,a_3b_3$, starting matching $M=\{a_1b_1,a_3b_2\}$: $a_2$ and $b_3$ are $M$-free. Tracing the alternating path from $a_2$: $a_2b_1$ (not in $M$) $\to b_1a_1$ (in $M$) $\to a_1b_2$ (not in $M$) $\to b_2a_3$ (in $M$) $\to a_3b_3$ (not in $M$), ending at the $M$-free vertex $b_3$ — a genuine augmenting path. Augmenting via symmetric difference yields $M'=\{a_2b_1,a_1b_2,a_3b_3\}$, size 3 — a perfect matching.

### Demonstration 2 — applying Hall's theorem (mirrors Blueprint Ex2)
$A=\{a_1,a_2,a_3\}$, $B=\{b_1,b_2\}$, edges $a_1b_1,a_2b_1,a_3b_2$: checking $S=\{a_1,a_2\}$ gives $N(S)=\{b_1\}$, so $|N(S)|=1<2$ — Hall's condition FAILS, no matching saturating $A$ exists. Contrast: $A=\{a_1,a_2\}$, $B=\{b_1,b_2,b_3\}$, edges $a_1b_1,a_1b_2,a_2b_2,a_2b_3$: every subset check passes (singletons each have 2 neighbors, and the full set $A$ has $N(A)=\{b_1,b_2,b_3\}$, size 3 $\ge$ 2) — Hall's condition HOLDS, and a perfect matching saturating $A$ exists: $\{a_1b_1,a_2b_3\}$.

### Demonstration 3 — König's theorem and its failure outside bipartite graphs (mirrors Blueprint Ex3)
From Demonstration 1's final perfect matching (size 3 on 3+3 vertices), König's theorem gives $\tau=\nu=3$, with $A$ itself serving as a valid cover of size 3 — and no cover of size 2 can work, since removing any two $A$-vertices from consideration still leaves at least one matched edge needing coverage. Contrast with $K_3$: $\nu(K_3)=1$ but $\tau(K_3)=2$ — König's equality genuinely fails once bipartiteness is dropped, and only the Gallai inequality $\nu\le\tau\le2\nu$ (here $1\le2\le2$) remains valid.

## Discovery Questions
1. "You've built a matching that can't be extended by adding one more edge. Does that guarantee it's the largest matching possible in the graph?"
2. "In a bipartite graph, every single vertex in $A$ has at least one neighbor in $B$. Is that enough to guarantee a perfect matching saturating $A$?"
3. "König's theorem says maximum matching equals minimum vertex cover — does this hold for EVERY graph, or only some?"

## Teaching Sequence
Best taught by **direct instruction establishing the maximal-vs-maximum distinction FIRST**, given the Abstract CPA entry stage — the definitions and theorems here (Berge's, Hall's, König's) are formal combinatorial results requiring precise statement before application, with the discovery questions surfacing each theorem's genuine subtlety before the demonstrations confirm it.
1. Establish matching definitions and the maximal-vs-maximum gap via the $P_6$ counterexample, posing Discovery Question 1 before formalizing Berge's theorem via Demonstration 1's augmenting path.
2. Introduce Hall's theorem, posing Discovery Question 2 before working Demonstration 2's both-directions example.
3. Introduce vertex covers and König's theorem via Demonstration 3, posing Discovery Question 3 before revealing the $K_3$ counterexample and the Gallai inequality.
4. Assess with the P77 problem set and the deficiency-version-of-Hall's-theorem transfer probe (P76, independence mode).

## Tutor Actions
1. **On any "no more edges fit" claim:** require the student to state explicitly whether this means maximal, maximum, or both, and to apply Berge's theorem (search for an augmenting path) before claiming maximum.
2. **On any Hall's-condition check:** require the student to search beyond singletons for a violating subset before concluding the condition holds.
3. **On any König's-theorem application:** require the student to first confirm the graph is bipartite before invoking the equality $\nu=\tau$.

## Voice Teaching Notes
1. **Register:** expert/applied — this concept assumes comfort with formal set-theoretic definitions and proof-level theorem statements (Berge's, Hall's, König's).
2. **Load-bearing sentence, spoken slowly:** "Maximal means nothing more fits here — maximum means nothing bigger exists anywhere."
3. **Wait time:** pause after Discovery Question 2, letting the student genuinely attempt to find (or fail to find) a violating subset before revealing the two-vertex bottleneck.

## Assessment Signals
1. **Gate concept:** correctly finds a maximum matching in a novel bipartite graph via the augmenting-path algorithm, starting from an arbitrary initial matching.
2. **Hall's-theorem fluency:** correctly checks Hall's condition across genuine subsets (not just singletons) to certify or refute perfect-matching existence.
3. **König's-theorem application:** correctly extracts a minimum vertex cover from a maximum matching in a bipartite graph, and correctly identifies when König's equality does NOT apply (non-bipartite graphs).
4. **Maximal-vs-maximum discrimination:** given a matching, correctly determines whether it is maximal, maximum, both, or neither, using Berge's theorem as the deciding test.
5. **Transfer:** applies the deficiency version of Hall's theorem (P76) to compute the maximum matching size when Hall's condition fails outright.

## Tutor Recovery Strategy
If the student conflates maximal and maximum, work several matchings of increasing size on the same graph, explicitly testing each for both properties via direct inspection and Berge's theorem, until the gap is concrete. If the student checks only singletons for Hall's condition, work progressively larger subset checks on a graph specifically engineered to pass every singleton check while failing on a pair, until the systematic subset search becomes automatic. If the student assumes König's equality is universal, compute $\nu$ and $\tau$ on several small non-bipartite graphs (odd cycles in particular) until the equality's dependence on bipartiteness is unmistakable.

## Memory Hooks
1. "Maximal is a dead end nearby — maximum is the best anywhere. Berge's theorem tells them apart."
2. "Hall's condition is about GROUPS, not individuals — check subsets, not just single vertices."
3. "König needs two sides — bipartite gives equality, everything else only an inequality."

## Transfer Connections
- **`math.graph.graph`:** the bipartite graph definition, adjacency, and paths this concept's matching theory builds directly on.
- **`math.graph.connectivity`:** Menger's theorem (max vertex-disjoint paths = min vertex cut) and König's theorem (max matching = min vertex cover) share the same max-flow-min-cut structural pattern — both are instances of LP duality in combinatorial optimization, though this connection is not developed further in either entry.
- **`math.graph.graph-operations`:** the line graph construction connects matchings in $G$ to independent sets in $L(G)$ — a matching in $G$ corresponds exactly to a set of pairwise non-adjacent vertices in $L(G)$.

## Cross-Subject Connections
- **Computer Science and Operations Research (assignment problems, scheduling):** Hall's theorem and bipartite matching algorithms directly underlie job assignment, scheduling, and resource allocation problems — determining whether every task can be assigned a qualified worker is precisely a perfect-matching-existence question.
- **Economics (stable matching, market design):** bipartite matching theory is the mathematical foundation of stable matching markets (school assignment, medical residency matching), where Hall-type conditions determine when every participant can be feasibly matched.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.graph.matching.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on the deficiency version of Hall's theorem, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions independently confirmed against this program's own taxonomy: MC-1 Type 3 critical, MC-2 Type 1 critical, MC-3 Type 1 foundational.
- Cross-link: KG lists no cross-links for this concept — independence mode, matching the Blueprint's own Component 7 declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- A genuine forward connection identified (not developed further, recorded honestly): König's theorem and `math.graph.connectivity`'s Menger's theorem are both instances of the same max-flow-min-cut/LP-duality structural pattern in combinatorial optimization — worth a future cross-referencing pass once a domain reaches that depth of synthesis, but not developed here to avoid overreach beyond this entry's own scope.

## Version History
- **Batch 26** (2026-09-12): initial authoring, part 3 of 3 this batch (with `math.graph.graph-invariants`, `math.graph.graph-operations`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 3 critical, MC-2 Type 1 critical, MC-3 Type 1 foundational).
