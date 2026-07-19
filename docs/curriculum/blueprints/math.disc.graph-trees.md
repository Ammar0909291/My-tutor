# Teaching Blueprint: Trees (`math.disc.graph-trees`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.graph-trees` |
| name | Trees |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.disc.graph-connectivity` |
| unlocks | `math.disc.spanning-tree` |
| cross_links | `math.graph.tree` |
| CPA_entry_stage | C (Concrete) — begins with three small labeled graphs checked for both tree conditions before the general edge-count property |
| description (KG) | A tree is a connected acyclic graph. Properties: n vertices → n−1 edges; unique path between any two vertices. Rooted tree: one vertex designated root, gives parent-child hierarchy. Binary tree: each node has at most 2 children. |

## Component 1 — Learning Objectives

- LO1: Define a **tree** as a graph that is BOTH connected AND acyclic — SIMULTANEOUSLY — directly reusing `math.disc.graph-connectivity`'s own connectedness and cycle definitions, and verify a specific graph is/isn't a tree by checking BOTH conditions.
- LO2: Apply the counting property that a tree with $n$ vertices has EXACTLY $n-1$ edges — and recognize this is a NECESSARY but NOT SUFFICIENT condition: a disconnected graph can also have exactly $n-1$ edges without being a tree.
- LO3: Distinguish a **rooted tree** (one vertex designated root, inducing a parent-child hierarchy) from the underlying **free (unrooted) tree** — recognizing the SAME free tree can be rooted at DIFFERENT vertices, producing genuinely different hierarchies.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph-connectivity` (paths, cycles, and connectedness — a path between every pair of vertices).

## Component 3 — Core Explanation

**A tree requires BOTH connectedness and acyclicity, simultaneously**: a tree is a graph that is connected (a path exists between every pair of vertices, per `math.disc.graph-connectivity`) AND acyclic (contains no cycle) — BOTH properties must hold together. A connected graph WITH a cycle is not a tree; an acyclic graph that is disconnected (a "forest" of multiple separate acyclic pieces) is also not a single tree.

**$n-1$ edges is necessary but not sufficient**: a tree with $n$ vertices always has exactly $n-1$ edges — but the converse doesn't automatically hold: a graph can have exactly $n$ vertices and $n-1$ edges while still failing to be a tree, if it is DISCONNECTED with a cycle concentrated in one component (compensated by isolated, edge-free vertices elsewhere) — the total edge count can still match $n-1$ even though the graph is neither connected nor acyclic as a whole.

**A rooted tree's hierarchy depends entirely on which vertex is chosen as root**: the underlying tree structure (which vertices connect to which) is fixed, but designating a ROOT imposes a parent-child hierarchy relative to that choice — every OTHER vertex's "parent" is determined by its position relative to the root along the tree's unique paths. Choosing a DIFFERENT vertex as root produces a genuinely different hierarchy from the identical underlying tree.

## Component 4 — Worked Examples

**Example 1 (LO1 — checking both conditions on three graphs, breaking MC-1)**: Graph A: vertices $\{1,2,3,4\}$, edges $\{(1,2),(2,3),(3,4)\}$ — connected (a path exists between every pair) AND acyclic (no cycle exists) — a genuine TREE. Graph B: same vertices, edges $\{(1,2),(2,3),(3,4),(4,1)\}$ — still connected, but NOW contains the cycle $1$-$2$-$3$-$4$-$1$ — NOT a tree, despite being connected. Graph C: same vertices, edges $\{(1,2),(3,4)\}$ — acyclic (no cycles anywhere) but NOT connected (vertices $\{1,2\}$ and $\{3,4\}$ form two separate components) — NOT a tree, despite being acyclic. Only Graph A satisfies BOTH required conditions.

**Example 2 (LO2 — n−1 edges without being a tree, breaking MC-2)**: Vertices $\{1,2,3,4\}$, edges $\{(1,2),(2,3),(1,3)\}$ (a triangle on vertices $1,2,3$) plus vertex $4$ left ISOLATED (no edges to it at all). Total vertices $n=4$; total edges $=3=n-1$ — matching the tree edge-count exactly. Yet this graph is NOT a tree: it is DISCONNECTED (vertex $4$ is unreachable from the triangle) AND the triangle component itself contains a cycle ($1$-$2$-$3$-$1$). Matching $n-1$ in total edge count is not, by itself, sufficient — connectedness must be separately verified.

**Example 3 (LO3 — the same free tree, rooted differently, breaking MC-3)**: The free tree with vertices $\{A,B,C,D\}$ and edges $\{(A,B),(B,C),(B,D)\}$ ($B$ is the "center," connected to $A,C,D$). Rooting at $B$: $B$ becomes the root, with $A,C,D$ all as its DIRECT children (a hierarchy of depth $1$). Rooting the IDENTICAL underlying tree at $A$ instead: $A$ becomes the root, $B$ is $A$'s child, and $C,D$ become $B$'s children — hence GRANDCHILDREN of $A$ (a hierarchy of depth $2$). Same free tree, genuinely different hierarchies, depending entirely on the chosen root.

## Component 5 — Teaching Actions

### Teaching Action A01 — Connected AND Acyclic, Not Either Alone (Primitive P06: Contrast Pair)

Contrast Example 1's three graphs: A (both conditions, genuine tree), B (connected but cyclic, not a tree), C (acyclic but disconnected, not a tree). State: "a tree needs BOTH properties simultaneously — being connected without being acyclic, or acyclic without being connected, both fail to qualify."

- **MC-1 hook**: ask "is a graph a tree as long as it is either connected OR acyclic, without necessarily needing both?" — a "yes" answer reveals MC-1 (missing that both conditions must hold simultaneously).

### Teaching Action A02 — n−1 Edges Doesn't Guarantee a Tree (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: a graph with $n=4$ vertices and exactly $n-1=3$ edges that is neither connected nor acyclic. State: "matching the edge count is a NECESSARY consequence of being a tree — it is not, by itself, SUFFICIENT to guarantee tree status; connectedness must be checked separately."

- **MC-2 hook**: ask "does a graph with exactly n−1 edges (for n vertices) automatically qualify as a tree?" — a "yes" answer reveals MC-2 (missing that this edge count is necessary but not sufficient without also verifying connectedness).

### Teaching Action A03 — The Same Tree, Different Roots, Different Hierarchies (Primitive P11: Representation Shift)

State: "the underlying free tree doesn't change when you pick a root — but the PARENT-CHILD HIERARCHY it induces genuinely does, depending entirely on which vertex you designate." Work Example 3's two different rootings of the identical free tree.

- **MC-3 hook**: ask "does a free tree have one single, intrinsic hierarchy, regardless of which vertex is chosen as root?" — a "yes" answer reveals MC-3 (missing that different root choices produce genuinely different hierarchies from the same underlying tree).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Determine whether a graph with vertices $\{1,2,3,4,5\}$ and edges $\{(1,2),(2,3),(3,4),(4,5),(5,1)\}$ is a tree, justifying via both conditions.
  2. Construct a graph with $5$ vertices and $4$ edges that is NOT a tree, and identify which requirement it fails.
  3. For the free tree with edges $\{(P,Q),(Q,R),(R,S)\}$, determine the parent-child hierarchy when rooted at $Q$, and separately when rooted at $P$.
  4. Explain why a tree with $n$ vertices cannot have fewer than $n-1$ edges while remaining connected.
- **P76 (Transfer Probe, mode = independence)**: "A file-system designer models a directory structure as a tree, with folders as vertices and containment relationships as edges. (a) Explain what it means, in this context, for the directory structure to satisfy BOTH tree conditions (connected and acyclic), and what a violation of each would look like in practice (e.g., a folder unreachable from the root, or a folder that is somehow its own ancestor). (b) The designer verifies the structure has exactly (number of folders − 1) containment edges and concludes this alone proves it's a valid tree structure. Using this lesson's n−1-edges-is-not-sufficient reasoning, explain what additional check the designer still needs to perform. (c) The designer then wants to display the SAME folder structure with a different folder chosen as the display root (e.g., showing a subfolder's contents as if it were the top level). Explain why this is possible without changing the underlying tree, and what specifically changes in the resulting hierarchy."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TREE-ASSUMED-FROM-EITHER-CONDITION-ALONE | Believing a graph is a tree if it is either connected or acyclic alone, missing that both conditions must hold simultaneously | Foundational |
| MC-2 | N-MINUS-1-EDGES-ASSUMED-SUFFICIENT | Believing a graph with exactly n-1 edges (for n vertices) must automatically be a tree, missing that this is necessary but not sufficient without also verifying connectedness | Foundational |
| MC-3 | TREE-HIERARCHY-ASSUMED-ROOT-INDEPENDENT | Believing a tree has one single intrinsic hierarchy regardless of the chosen root, missing that different roots produce genuinely different hierarchies from the same free tree | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Tree Assumed from Either Condition Alone") → P41 (detect: ask a student whether a connected graph with a cycle counts as a tree, checking for "yes") → P64 (conceptual shift: re-walk Example 1's three-graph contrast, re-anchoring on "both connected AND acyclic are required together").
- **B02 (targets MC-2)**: P27 (name it: "n−1 Edges Assumed Sufficient") → P41 (detect: present the triangle-plus-isolated-vertex graph and ask whether its n−1 edge count confirms tree status, checking for "yes") → P64 (conceptual shift: re-walk Example 2's counterexample, re-anchoring on "n−1 edges is necessary, not sufficient — connectedness must be checked separately").
- **B03 (targets MC-3)**: P27 (name it: "Tree Hierarchy Assumed Root-Independent") → P41 (detect: ask a student whether rooting a tree at a different vertex changes its hierarchy, checking for "no") → P64 (conceptual shift: re-walk Example 3's two different rootings, re-anchoring on "the hierarchy depends entirely on the chosen root").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph-connectivity` (the path/cycle/connectedness definitions this concept's tree definition directly combines).
- **Unlocks**: `math.disc.spanning-tree` (a tree connecting all vertices of a larger graph, building directly on this concept's tree definition and edge-count property).
- **Cross-link**: KG lists `math.graph.tree` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/understand tag places this at a "3 TAs + gate" tier, appropriately compact given the concept directly reuses `math.disc.graph-connectivity`'s already-mastered path/cycle/connectedness machinery, combining them into the tree definition rather than introducing new foundational concepts.
- **Division of labor**: `math.disc.graph-connectivity` owns paths, cycles, and connectedness in general. This concept, `math.disc.graph-trees`, deliberately does not re-teach any of that; it owns the SPECIFIC combination (connected AND acyclic) defining a tree, the resulting edge-count property (and its necessary-but-not-sufficient status), and the rooted-vs-free tree distinction.
- Example 3's free tree was deliberately kept small (4 vertices, a simple "star-like" shape centered at B) so both possible rootings (at the center B, and at a leaf A) could be fully worked out and visually contrasted within a single compact example, rather than a larger tree where the hierarchy comparison would be harder to follow.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.graph.tree unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: three small labeled graphs checked for both tree conditions before the general edge-count property) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
