# Teaching Blueprint: Trees (`math.graph.tree`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.tree` |
| name | Trees |
| domain | Graph Theory |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.disc.graph-trees` |
| unlocks | `math.graph.minimum-spanning-tree` |
| cross_links | `math.disc.graph-trees` |
| CPA_entry_stage | A (Abstract) — proficient learner already fluent in tree definition from discrete mathematics; this blueprint develops the formal graph-theoretic characterizations and counting theory (Cayley's formula) at the abstract level |
| description (KG) | Trees: connected acyclic graphs. Characterizations: n vertices, n-1 edges, unique path between any two vertices. Rooted trees, forests. Cayley's formula ($n^{n-2}$ labeled trees on n vertices). Spanning trees. |

## Component 1 — Learning Objectives

- LO1: State and apply the **five equivalent characterizations** of a tree ($T$ is a tree iff any two of: connected, acyclic, $m=n-1$ hold; unique path between any two vertices; removing any edge disconnects; adding any non-edge creates a unique cycle); distinguish a **forest** (acyclic, not necessarily connected) from a tree.
- LO2: Define **rooted trees** (distinguished root, parent/child/ancestor/leaf/depth/height), **spanning tree** of a connected graph $G$ (spanning subgraph that is a tree), and prove that every connected graph has a spanning tree; state the number of distinct spanning trees of $K_n$ given by **Cayley's formula** $\kappa(K_n)=n^{n-2}$.
- LO3: Explain the **Prüfer sequence** bijection (labeled tree $\leftrightarrow$ sequence in $\{1,\ldots,n\}^{n-2}$) that proves Cayley's formula; encode and decode a small labeled tree via its Prüfer sequence.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph-trees` (tree definition, leaf, path, acyclicity, degree). Requires familiarity with graph $G=(V,E)$, connectivity, BFS/DFS (for spanning tree existence). No further prerequisites.

## Component 3 — Core Explanation

**Tree characterizations.** A **tree** is a connected acyclic graph. The following are equivalent for a graph $T$ on $n\ge1$ vertices:

1. $T$ is connected and acyclic.
2. $T$ is connected and has $n-1$ edges.
3. $T$ is acyclic and has $n-1$ edges.
4. Any two vertices of $T$ are connected by a **unique** path.
5. $T$ is connected, but removing any single edge disconnects it (every edge is a bridge).
6. $T$ is acyclic, but adding any single non-edge creates a **unique** cycle.

Proof of $(1)\Leftrightarrow(2)$: induction on $n$. Base $n=1$: no edges, vacuously acyclic and connected. Inductive step: a tree with $n\ge2$ vertices has a leaf (vertex of degree 1) — removing it gives a tree on $n-1$ vertices with $n-2$ edges (by hypothesis), so $T$ has $n-1$ edges. Conversely, a connected graph with $n-1$ edges and any cycle would contradict $(n-1)$-edge count by the cycle + connectivity argument.

**Forest.** An acyclic graph (not necessarily connected). A forest with $n$ vertices and $k$ connected components has $n-k$ edges. Each component of a forest is a tree.

**Rooted trees.** Designate a vertex $r$ as **root**. This induces a parent-child relation: the parent of $v\ne r$ is the unique vertex adjacent to $v$ on the path from $v$ to $r$. **Leaf** = vertex of degree 1 (in the unrooted tree) or no children (in the rooted tree). **Depth** of $v$ = distance from $r$. **Height** of the tree = $\max_v\text{depth}(v)$.

**Spanning trees.** A **spanning tree** of a connected graph $G=(V,E)$ is a subgraph $(V,T)$ with $T\subseteq E$ that is a tree on $V$. Every connected graph has a spanning tree: BFS or DFS from any vertex produces one. The number of distinct spanning trees of $G$ is given by the **Matrix-Tree Theorem** (Kirchhoff 1847): $\kappa(G)=$ any cofactor of the Laplacian $L=D-A$.

**Cayley's formula.** The number of distinct labeled trees on vertex set $\{1,2,\ldots,n\}$ is $n^{n-2}$. Proof via **Prüfer sequence**: encode a labeled tree $T$ as a sequence $a_1,a_2,\ldots,a_{n-2}\in\{1,\ldots,n\}$ by the following algorithm: (1) identify the leaf with the smallest label; (2) write down its neighbor; (3) delete that leaf; repeat until 2 vertices remain. The resulting sequence is the Prüfer code. This is a bijection from labeled trees on $n$ vertices to $\{1,\ldots,n\}^{n-2}$, so there are $n^{n-2}$ labeled trees. Consequence: $\kappa(K_n)=n^{n-2}$ (since every labeled tree is a spanning tree of $K_n$).

**Decoding the Prüfer sequence.** Given $(a_1,\ldots,a_{n-2})$: let $L=\{1,\ldots,n\}$; at step $i$, add edge from the smallest element of $L$ not in $\{a_i,\ldots,a_{n-2}\}$ to $a_i$; remove that element from $L$; after the loop, add the final edge between the two remaining elements of $L$.

## Component 4 — Worked Examples

**Example 1 (LO1 — characterization)**: Verify that $P_n$ (path on $n$ vertices) is a tree. $P_n$ is connected (each vertex connected to next), acyclic (no repeated vertex in a walk), and has $n-1$ edges. Check: adding any non-edge $\{i,j\}$ with $|i-j|\ge2$ creates a cycle with the unique path $i\to i+1\to\cdots\to j$. Any edge removal disconnects the path between the vertices on opposite sides of the removed edge. All six characterizations satisfied.

**Example 2 (LO2 — Cayley's formula)**: Count labeled trees on $n=3$ vertices $\{1,2,3\}$. Cayley: $3^{3-2}=3^1=3$. List: $\{1-2, 2-3\}$ (path, center 2), $\{1-3, 3-2\}$ (path, center 3), $\{1-2, 1-3\}$ (path, center 1) — exactly 3. For $n=4$: $4^2=16$ labeled trees. For $n=5$: $5^3=125$.

**Example 3 (LO3 — Prüfer sequence)**: Encode the labeled tree on $\{1,2,3,4,5\}$ with edges $\{1,3\},\{2,3\},\{3,4\},\{4,5\}$. Step 1: leaves = $\{1,2,5\}$; smallest leaf = 1; neighbor of 1 = 3; write 3; delete 1. Remaining: $\{2,3,4,5\}$ with edges $\{2,3\},\{3,4\},\{4,5\}$. Step 2: leaves = $\{2,5\}$; smallest = 2; neighbor of 2 = 3; write 3; delete 2. Remaining: $\{3,4,5\}$ with edges $\{3,4\},\{4,5\}$. Step 3: leaves = $\{3,5\}$; smallest = 3; neighbor = 4; write 4; delete 3. Prüfer sequence: $(3,3,4)$. Decode: $L=\{1,2,3,4,5\}$; smallest not in $(3,3,4)$ = 1 → edge $\{1,3\}$, remove 1, $L=\{2,3,4,5\}$; smallest not in $(3,4)$ = 2 → edge $\{2,3\}$, remove 2; smallest not in $(4)$ = 3 → edge $\{3,4\}$, remove 3; final pair $\{4,5\}$ → edge $\{4,5\}$. Recovered: original tree. ✓

## Component 5 — Teaching Actions

### Teaching Action A01 — The Six Faces of a Tree (Primitive P11: Representation Shift)

Present a tree drawn on a whiteboard and ask six successive questions, each corresponding to one characterization: "Is it connected? Count edges. Any cycles? Unique path between these two vertices? What happens if I cut this edge? What if I add this edge?" Show that all six questions yield "yes/no/yes/yes/disconnected/cycle" — and explain that each question is an alternative DEFINITION of tree.

- **MC-1 hook**: ask "Can a connected graph with $n-1$ edges fail to be a tree?" — No (characterization 2): a connected graph with $n-1$ edges is always a tree. Lead student to check by trying to draw one.

### Teaching Action A02 — Prüfer Encoding Systematically (Primitive P25: Deductive)

Run the Prüfer encoding and decoding algorithms on Example 3 step by step at the board, writing the deleted leaf, the neighbor recorded, and the resulting sequence. Then decode a fresh sequence $(2,2,1)$ on $n=5$ to get a new labeled tree, and verify the tree by drawing it. Emphasize: the algorithm is deterministic — no choices — proving the bijection.

- **MC-2 hook**: ask "Does the Prüfer sequence tell us how many times each vertex $v$ appears?" — Yes: vertex $v$ appears exactly $\deg_T(v)-1$ times in the Prüfer sequence (leaves never appear; the root of the algorithm effectively appears $\deg-1$ times). This is how one reads the degree sequence of the tree directly from the Prüfer code.

### Teaching Action A03 — Limits: Not Every Graph Has a Unique Spanning Tree (Primitive P16: Counterexample)

State: "A connected graph has at least one spanning tree, but usually many." Demonstrate: $K_3$ (triangle) has 3 spanning trees (each is a 2-edge path formed by dropping one edge) — all distinct, all spanning, all trees. $K_4$ has $4^{4-2}=16$ spanning trees (Cayley). Emphasize: Cayley counts LABELED trees; unlabeled trees on 4 vertices number only 2 (path $P_4$ and star $K_{1,3}$), not 16.

- **MC-3 hook**: ask "Does Cayley's formula count unlabeled trees?" — No: Cayley counts labeled trees (each vertex has a distinct label/name). The number of nonisomorphic (unlabeled) trees grows much more slowly and has no clean closed form.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (5-problem set)**:
  1. Prove that a tree on $n\ge2$ vertices has at least two leaves (vertices of degree 1). (Hint: use the edge count $n-1$ and the Handshaking Lemma.)
  2. How many labeled trees exist on $n=6$ vertices? How many spanning trees does $K_6$ have?
  3. Encode the labeled tree on $\{1,2,3,4\}$ with edges $\{1,2\},\{1,3\},\{1,4\}$ (the star $K_{1,3}$ with center 1) as a Prüfer sequence.
  4. Decode the Prüfer sequence $(3,1,3)$ on vertex set $\{1,2,3,4,5\}$ to recover the labeled tree.
  5. Prove that adding any edge to a tree creates exactly one cycle (use the uniqueness of paths in trees).
- **P76 (Transfer Probe, mode = cross-link with `math.disc.graph-trees`)**: "In discrete mathematics, trees appear in data structures (binary search trees, heaps, tries) where the concept of **height** determines algorithm efficiency. (a) A **complete binary tree** of height $h$ has $2^{h+1}-1$ vertices. Express its number of leaves as a function of $h$ and verify it using the tree characterization that relates degree to Prüfer-sequence appearances. (b) The number of spanning trees of the **cycle** $C_n$ is $n$ (each spanning tree is obtained by removing one of the $n$ edges). Verify this for $C_4$ by listing all spanning trees of the 4-cycle, and relate it to Kirchhoff's Matrix-Tree Theorem (compute the Laplacian of $C_4$ and verify that any cofactor equals 4)."
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Trees — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TREE-REQUIRES-THREE-PROPERTIES | Believing a tree requires all three of (connected, acyclic, $m=n-1$) to be checked independently — in fact any TWO of these three imply the third; the redundancy is a powerful proof tool | Foundational |
| MC-2 | PRÜFER-SEQUENCE-ENCODES-STRUCTURE-NOT-DEGREES | Believing the Prüfer sequence is just a structural fingerprint with no intrinsic meaning — in fact the multiplicity of vertex $v$ in the Prüfer sequence equals $\deg_T(v)-1$, directly encoding the degree sequence of the tree | Moderate |
| MC-3 | CAYLEY-COUNTS-UNLABELED-TREES | Confusing Cayley's $n^{n-2}$ formula (counts labeled trees, i.e., distinct structures on a fixed vertex set $\{1,\ldots,n\}$) with the count of nonisomorphic trees; the latter is much smaller and has no simple closed form | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Two of Three Conditions Suffice to Define a Tree") → P41 (detect: ask whether a connected graph with $n-1$ edges that has a cycle is possible — no, a connected graph with a cycle has at least $n$ edges) → P64 (conceptual shift: the three properties are not independent for graphs — connected + acyclic already forces $m=n-1$ by induction; connected + $m=n-1$ forces acyclicity because a cycle in a connected graph forces at least $n$ edges; this redundancy is the content of the equivalence theorem and should be internalized, not ignored).
- **B02 (targets MC-2)**: P27 (name it: "Prüfer Multiplicity = Degree Minus One") → P41 (detect: given Prüfer sequence $(3,3,4)$ on $n=5$, ask for the degree of vertex 3 in the corresponding tree) → P64 (conceptual shift: vertex 3 appears twice in $(3,3,4)$, so $\deg_T(3)=2+1=3$; vertex 4 appears once, so $\deg_T(4)=2$; vertices 1, 2, 5 do not appear, so they are leaves with $\deg=1$; check: $3+2+1+1+1=8=2\times4$ edges $=2(n-1)$ ✓; the degree sequence is FULLY recoverable from the Prüfer code before decoding).
- **B03 (targets MC-3)**: P27 (name it: "Cayley Counts Labeled Trees, Not Shapes") → P41 (detect: ask how many labeled trees exist on $n=3$ and how many nonisomorphic trees exist on $n=3$) → P64 (conceptual shift: Cayley gives $3^1=3$ labeled trees — three paths with different centers — but only ONE nonisomorphic tree on 3 vertices (the path $P_3$); the 3 labeled trees are all isomorphic to each other as unlabeled graphs but are distinct as labeled objects; isomorphism ignores labels, Cayley's formula does not).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph-trees` (tree definition, leaf, acyclicity, degree).
- **Unlocks**: `math.graph.minimum-spanning-tree`.
- **Cross-link**: `math.disc.graph-trees` (verified on disk) → P76 uses cross-link probe mode.

## Component 8 — Teaching Notes

- The six-characterization equivalence is the single most important fact about trees; students who memorize only one definition are repeatedly stuck when a problem gives them information matching a different characterization. Emphasize the redundancy as a proof TOOL.
- Prüfer sequences are a uniquely testable way to encode the Cayley formula — they turn a counting argument into an algorithm a student can execute on paper and verify. The degree-multiplicity observation (MC-2) transforms the Prüfer sequence from a magic encoding into a transparent degree record.
- The cross-link probe to `math.disc.graph-trees` uses binary-tree height and the Matrix-Tree Theorem to connect trees in two directions: algorithmic (data structures) and algebraic (Kirchhoff). Both directions are standard in a comprehensive graph-theory course.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.graph-trees`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.graph.minimum-spanning-tree`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.graph-trees` EXISTS → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01–A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 5 problems | PASS (MAMR = 5/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link with `math.disc.graph-trees`) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: proficient, formal characterizations and Prüfer bijection on abstract labeled graphs) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires proving the two-leaf theorem, executing Prüfer encode/decode, and constructing a formal proof about cycles — not just reciting Cayley's formula | PASS |
