# math.disc.graph-trees — Trees

## Identity
- **KG ID:** `math.disc.graph-trees`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.graph-connectivity`
- **Unlocks:** `math.disc.spanning-tree`
- **Cross-links:** `math.graph.tree` (Blueprint exists, no EB entry yet — see Curriculum Feedback)
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.9 (MAMR 5/5)
- **Estimated hours:** 4

## Learning Objective
By the end of this concept, the student can: (1) define a TREE as a graph that is BOTH connected AND acyclic SIMULTANEOUSLY, directly reusing `math.disc.graph-connectivity`'s connectedness and cycle definitions, and verify a specific graph is or is not a tree by checking BOTH conditions; (2) apply the counting property that a tree with $n$ vertices has exactly $n-1$ edges, recognizing this is NECESSARY but NOT SUFFICIENT — a disconnected graph can also have exactly $n-1$ edges without being a tree; (3) distinguish a ROOTED tree (one vertex designated root, inducing a parent-child hierarchy) from the underlying FREE (unrooted) tree, recognizing the SAME free tree rooted at different vertices produces genuinely different hierarchies.

## Core Understanding
A TREE is a graph that is CONNECTED (a path exists between every pair of vertices, per `math.disc.graph-connectivity`) AND ACYCLIC (contains no cycle) — BOTH properties holding SIMULTANEOUSLY. A connected graph containing a cycle is not a tree; an acyclic but disconnected graph (a "forest" of separate acyclic pieces) is also not a single tree. Verifying tree status genuinely requires checking BOTH conditions independently — satisfying only one is insufficient.

A tree with $n$ vertices always has exactly $n-1$ edges — a direct consequence of connectedness (needing at least $n-1$ edges to connect $n$ vertices) combined with acyclicity (any additional edge beyond $n-1$ would necessarily create a cycle in an already-connected structure). Crucially, this edge count is NECESSARY but NOT SUFFICIENT: a graph can have exactly $n$ vertices and $n-1$ edges while still failing to be a tree — for instance, a DISCONNECTED graph where a cycle in one component is compensated by isolated, edge-free vertices elsewhere can still total exactly $n-1$ edges overall, despite being neither connected nor acyclic as a whole. Matching the edge count is a consequence one can check quickly, but it never substitutes for verifying connectedness (and, separately, acyclicity) directly.

A ROOTED tree designates one vertex as the ROOT, imposing a PARENT-CHILD HIERARCHY relative to that choice: every other vertex's "parent" is determined by its position along the tree's unique paths back to the root. The underlying FREE tree's structure (which vertices connect to which) does not change based on root choice — but the hierarchy it induces genuinely does. Choosing a DIFFERENT vertex as root produces a structurally different parent-child hierarchy from the IDENTICAL underlying free tree, not merely a relabeling of the same hierarchy.

## Mental Models
1. **Rung 1 — a tree needs BOTH connected AND acyclic, together, not either alone.** Neither property alone is sufficient; both must be verified independently.
2. **Rung 2 — $n-1$ edges is a NECESSARY consequence of being a tree, never a sufficient test by itself.** A graph can match the edge count while being neither connected nor acyclic.
3. **Rung 3 — the free tree's structure is fixed; the hierarchy it induces depends entirely on the chosen root.** Same edges, same connections — genuinely different parent-child relationships depending on where you start.
4. **Rung 4 — connectedness needs at least $n-1$ edges; acyclicity forbids more than $n-1$ (once connected).** The exact count $n-1$ is the unique value satisfying both constraints simultaneously, which is why it characterizes trees so tightly (necessarily, not sufficiently).

## Why Students Fail
Because "connected" and "acyclic" are each individually meaningful, easily-checked properties, students sometimes treat satisfying either one as sufficient evidence of tree status, missing that the definition's power comes specifically from requiring BOTH simultaneously — a connected-but-cyclic graph and an acyclic-but-disconnected graph both fail to qualify, for structurally different reasons. Separately, since the $n-1$ edge count is a clean, quickly-computable number, it is tempting to treat it as a standalone sufficient TEST for tree status, rather than recognizing it as merely a necessary CONSEQUENCE that a disconnected graph (with a cycle compensated by isolated vertices) can satisfy without being a tree at all. Finally, having learned the free tree's structure is fixed regardless of root choice, students sometimes over-extend that fixedness to the induced HIERARCHY as well, missing that the parent-child relationships genuinely change with a different root, even though the underlying edges do not.

## Misconceptions

### MC-1: TREE-ASSUMED-FROM-EITHER-CONDITION-ALONE
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Believing a graph is a tree if it is either connected or acyclic alone, missing that both conditions must hold simultaneously.
- **Why this birth type:** An overgeneralization of the reasonable-seeming habit "one strong property is usually enough evidence" applied to a definition that specifically requires a CONJUNCTION of two independent properties — the student has not yet registered that the tree definition's entire content lies in demanding both together, not in either property being individually impressive.
- **Detection probe:** "Is a connected graph with a cycle a tree?" A student with MC-1 answers "yes," treating connectedness alone as sufficient.
- **Repair:** Contrast all three cases from Demonstration 1 explicitly — the genuine tree (both conditions), the connected-but-cyclic graph, and the acyclic-but-disconnected graph — making clear that failing EITHER condition alone disqualifies a graph from tree status.
- **Verification of death:** Given a novel graph, the student checks BOTH connectedness and acyclicity independently before concluding tree status, never accepting one alone as sufficient.

### MC-2: N-MINUS-1-EDGES-ASSUMED-SUFFICIENT
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Believing a graph with exactly $n-1$ edges (for $n$ vertices) must automatically be a tree, missing that this is necessary but not sufficient without also verifying connectedness.
- **Why this birth type:** An overgeneralization of the correctly-learned FORWARD implication (tree $\Rightarrow$ $n-1$ edges) mistakenly reversed into a claimed biconditional ($n-1$ edges $\Rightarrow$ tree) — a common logical slip when a clean numerical consequence is available and feels like it should characterize the property completely.
- **Detection probe:** "A graph has $n=4$ vertices and exactly $3=n-1$ edges. Must it be a tree?" A student with MC-2 answers "yes."
- **Repair:** Present the triangle-plus-isolated-vertex counterexample (Demonstration 2) explicitly: $n=4$, exactly 3 edges, yet disconnected AND containing a cycle — proving the edge count alone cannot certify tree status.
- **Verification of death:** Given a graph matching the $n-1$ edge count, the student explicitly checks connectedness (and acyclicity) separately before concluding tree status, rather than accepting the count alone.

### MC-3: TREE-HIERARCHY-ASSUMED-ROOT-INDEPENDENT
- **Birth type:** Type 1 (overgeneralization) — moderate
- **Description:** Believing a tree has one single intrinsic hierarchy regardless of the chosen root, missing that different roots produce genuinely different hierarchies from the same free tree.
- **Why this birth type:** An overgeneralization of the correctly-learned fact that the free tree's STRUCTURE (edges, connections) is fixed and root-independent, extended incorrectly to the derived HIERARCHY as well — the student conflates "the underlying object doesn't change" with "everything derived from it doesn't change either."
- **Detection probe:** "Does a free tree have one single intrinsic parent-child hierarchy, regardless of which vertex is chosen as root?" A student with MC-3 answers "yes."
- **Repair:** Work Demonstration 3's two different rootings of the identical free tree explicitly, showing the parent-child relationships genuinely differ (depth 1 hierarchy when rooted centrally, depth 2 when rooted at a leaf) despite the underlying edges never changing.
- **Verification of death:** Given a free tree and two different candidate roots, the student correctly derives two genuinely different hierarchies, confirming they are not merely relabelings of one fixed structure.

## Analogies
1. **The AND-gate analogy.** A tree requires connected AND acyclic exactly like a logic AND gate requires both inputs true — either input alone being true (or both false) fails to produce the required output.
2. **The family-tree-vantage-point analogy.** The same family relationships (who is related to whom) don't change, but describing them as "my grandmother, my mother, me" versus "my granddaughter, my daughter, me" depends entirely on which family member is doing the describing — the underlying tree of relationships is fixed, but the hierarchy (who's whose ancestor/descendant) depends on the chosen vantage point (root).

## Demonstrations
### Demonstration 1 — checking both conditions, breaking MC-1 (mirrors Blueprint Ex1)
Graph A: $\{1,2,3,4\}$, edges $\{(1,2),(2,3),(3,4)\}$ — connected AND acyclic — a genuine TREE. Graph B: same vertices plus edge $(4,1)$ — still connected, but now cyclic — NOT a tree. Graph C: $\{1,2,3,4\}$, edges $\{(1,2),(3,4)\}$ — acyclic but disconnected — NOT a tree.

### Demonstration 2 — $n-1$ edges without being a tree, breaking MC-2 (mirrors Blueprint Ex2)
Vertices $\{1,2,3,4\}$, edges $\{(1,2),(2,3),(1,3)\}$ (a triangle on $1,2,3$) with vertex 4 isolated. $n=4$, edges $=3=n-1$ — matching the tree edge count exactly, yet disconnected (vertex 4 unreachable) AND cyclic (triangle $1$-$2$-$3$-$1$) — NOT a tree.

### Demonstration 3 — the same free tree, rooted differently, breaking MC-3 (mirrors Blueprint Ex3)
Free tree $\{A,B,C,D\}$, edges $\{(A,B),(B,C),(B,D)\}$. Rooted at $B$: $A,C,D$ are all direct children of $B$ (depth-1 hierarchy). Rooted at $A$ instead (identical edges): $B$ is $A$'s child; $C,D$ become GRANDCHILDREN of $A$ (depth-2 hierarchy).

## Discovery Questions
1. "If a graph is connected but has a cycle somewhere, does calling it 'connected' alone tell you it's a tree — what else would you need to check?"
2. "A graph has $n$ vertices and exactly $n-1$ edges. Does that number alone guarantee the graph is all one connected piece — or could those $n-1$ edges be arranged some other way?"
3. "If you pick a different vertex as the root of the same free tree, do the actual connections between vertices change — or does something else about the tree change instead?"

## Teaching Sequence
Best taught by **direct instruction with embedded conflict-evidence and contrast demonstrations** — the tree definition, edge-count property, and rooted/free distinction are precise definitional content most efficiently introduced directly, with each Discovery Question posed immediately before its corresponding demonstration so the student predicts before the contrast is confirmed, targeting each of the three specific overgeneralizations this concept is built to prevent.
1. Introduce the connected-AND-acyclic definition, posing Discovery Question 1 before working Demonstration 1's three-graph contrast (targeting MC-1).
2. Introduce the $n-1$ edge-count property, posing Discovery Question 2 before working Demonstration 2's counterexample (targeting MC-2).
3. Introduce rooted vs. free trees, posing Discovery Question 3 before working Demonstration 3's two-rooting contrast (targeting MC-3).
4. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On a tree-classification question:** always require the student to check connectedness AND acyclicity as two SEPARATE steps, never accepting one alone as conclusive.
2. **On an $n-1$-edge-count observation:** ask "does this number alone prove connectedness, or does it just match what a tree WOULD have?" before accepting tree status.
3. **On a rooted-tree question:** require the student to state the hierarchy explicitly for at least two different root choices when first introducing the concept, to make the root-dependence concrete.
4. **On the spanning-tree preview:** may be mentioned as the natural next application (a tree connecting all vertices of a LARGER graph), but full development is deferred to `math.disc.spanning-tree`.

## Voice Teaching Notes
1. **Register:** precise and conjunction-focused — this concept's central discipline is verifying TWO independent conditions together, so language should consistently reinforce "have you checked both?"
2. **Load-bearing sentence, spoken slowly:** "Matching the edge count is necessary — it is never, by itself, sufficient to prove tree status."
3. **Wait time:** pause after posing Discovery Question 3, giving the student space to predict whether the hierarchy changes before the two-rooting demonstration confirms it.

## Assessment Signals
1. **Gate concept:** correctly classifies a novel graph as a tree or not, checking both connectedness and acyclicity explicitly.
2. **Edge-count discrimination:** given a graph matching the $n-1$ edge count, does not conclude tree status without separately verifying connectedness.
3. **Rooted-hierarchy accuracy:** correctly derives the parent-child hierarchy for a free tree under two different root choices.
4. **Necessary-vs-sufficient precision:** correctly articulates why the $n-1$ edge count is necessary but not sufficient when asked.
5. **Transfer:** applies the tree definition and root-dependence reasoning in a novel real-world hierarchical structure (e.g. a file system or organizational chart).

## Tutor Recovery Strategy
If the student accepts a single condition as sufficient for tree status, work through several graphs that satisfy exactly one condition (connected-but-cyclic, acyclic-but-disconnected) until the necessity of checking both becomes an automatic two-step habit. If the student believes the hierarchy is root-independent, have them derive the FULL hierarchy for the same free tree under three or more different root choices, until the genuine structural divergence becomes unmistakable.

## Memory Hooks
1. "Connected AND acyclic — both, together, always."
2. "$n-1$ edges is necessary, never sufficient — check connectedness separately."
3. "Same tree, different root, different hierarchy — the edges don't move, but the family tree does."

## Transfer Connections
- **`math.disc.graph-connectivity`:** the path/cycle/connectedness definitions this concept's tree definition directly combines and builds on.
- **`math.disc.spanning-tree`:** the direct further application — a tree connecting all vertices of a larger graph — unlocked by this concept.
- **`math.disc.euler-hamiltonian`:** a sibling concept, both authored this same batch, sharing the `math.disc.graph-connectivity` prerequisite.

## Cross-Subject Connections
- **Computer Science (data structures, file systems):** rooted trees are the direct mathematical model for directory structures, binary search trees, and hierarchical organization charts.
- **Biology (phylogenetic trees):** evolutionary relationships between species are modeled as trees, where root choice (which ancestor is designated as the starting point) directly determines the displayed hierarchy.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.graph-trees.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe). Not restated verbatim; this entry adds birth-type classification (this Blueprint did not pre-assign birth types), mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- **Cross-link status clarified**, matching the established intermediate case: `math.graph.tree` has a genuine Blueprint but NO Educational Brain entry yet (the entire `math.graph` subject, 0/16, is unstarted). This entry's Transfer Connections section does not cite it as a peer entry.
- No genuine content-overlap was found with `math.disc.graph-connectivity` — that entry owns paths/cycles/connectedness in general; this entry owns the specific combination defining a tree, its edge-count property, and the rooted/free distinction.
- This entry's unlocked child, `math.disc.spanning-tree`, is not yet authored — a natural continuation of this program's graph-theory subtree work.

## Version History
- **Batch 22** (2026-09-11): initial authoring, part 2 of 3 this batch (with `math.disc.euler-hamiltonian` and `math.disc.planar-graph`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1 foundational, MC-2 Type 1 foundational, MC-3 Type 1 moderate) — birth types independently derived, since this Blueprint does not pre-assign them.
