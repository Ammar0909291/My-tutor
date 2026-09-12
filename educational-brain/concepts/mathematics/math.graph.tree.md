# math.graph.tree — Trees (Characterizations, Rooted Trees, Cayley's Formula, Prüfer Sequences)

## Identity
- **KG ID:** `math.graph.tree`
- **Domain:** math.graph (Graph Theory)
- **Requires:** `math.disc.graph-trees`
- **Unlocks:** `math.graph.minimum-spanning-tree`
- **Cross-links:** `math.disc.graph-trees` (already authored — see Blueprint References)
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.9 (MAMR 5/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) state and apply the SIX equivalent characterizations of a tree (any two of connected/acyclic/$m=n-1$ suffice to force the third; unique path between any two vertices; every edge is a bridge; adding any non-edge creates a unique cycle), and distinguish a FOREST (acyclic, not necessarily connected) from a tree; (2) define rooted trees (root, parent/child/leaf/depth/height) and spanning trees, and state Cayley's formula $\kappa(K_n)=n^{n-2}$ for the number of labeled trees on $n$ vertices; (3) execute the PRÜFER SEQUENCE encoding/decoding bijection that proves Cayley's formula, on a small labeled tree.

## Core Understanding
A **tree** is a connected acyclic graph. Six statements about a graph $T$ on $n\ge1$ vertices are EQUIVALENT — any two of them imply the third (or all remaining ones): (1) $T$ is connected and acyclic; (2) $T$ is connected with $n-1$ edges; (3) $T$ is acyclic with $n-1$ edges; (4) any two vertices are joined by a UNIQUE path; (5) $T$ is connected but removing any single edge disconnects it (every edge is a "bridge"); (6) $T$ is acyclic but adding any single non-edge creates a unique cycle. This redundancy is not incidental trivia — it is the single most useful FACT about trees, because a problem that hands you information matching ONE characterization (e.g. "connected, $n-1$ edges") lets you immediately conclude ALL the others (acyclic, unique paths, every edge a bridge) without separately verifying each.

The equivalence between (1) and (2) follows by induction: a tree on $n\ge2$ vertices always has a LEAF (a degree-1 vertex) — removing it leaves a tree on $n-1$ vertices with $n-2$ edges by the inductive hypothesis, so the original tree has $n-1$ edges.

A **forest** is an acyclic graph, not necessarily connected — each of its connected components is itself a tree, and a forest with $n$ vertices and $k$ components has $n-k$ edges (generalizing the tree case, $k=1$).

A **rooted tree** designates one vertex $r$ as root, inducing a parent-child relation along paths back to $r$; DEPTH of a vertex is its distance from $r$, and HEIGHT of the tree is the maximum depth over all vertices.

A **spanning tree** of a connected graph $G=(V,E)$ is a subgraph on ALL of $V$ that is itself a tree — every connected graph has at least one (found by BFS or DFS from any vertex), and usually MANY.

**Cayley's formula**: the number of distinct LABELED trees on vertex set $\{1,\ldots,n\}$ is $n^{n-2}$. The proof is a bijection via the **Prüfer sequence**: repeatedly remove the smallest-labeled leaf and record its (former) neighbor, until 2 vertices remain, producing a sequence of length $n-2$ over $\{1,\ldots,n\}$ — since this map is a bijection between labeled trees and such sequences, and there are exactly $n^{n-2}$ such sequences, there are exactly $n^{n-2}$ labeled trees. A direct corollary: $\kappa(K_n)=n^{n-2}$, since every labeled tree on $n$ vertices IS a spanning tree of the complete graph $K_n$.

## Mental Models
1. **Rung 1 — any TWO of {connected, acyclic, $m=n-1$} force the third.** This is a proof TOOL, not three separate facts to check independently every time.
2. **Rung 2 — a tree's uniqueness of paths is the SAME fact as its acyclicity, viewed from a different angle.** If two distinct paths existed between the same pair, they would trace out a cycle; a tree forbids exactly this.
3. **Rung 3 — the Prüfer sequence's length ($n-2$) and alphabet size ($n$) directly count the labeled trees, because the map to and from trees loses no information.** The bijection IS the proof of Cayley's formula, not an illustration of it.
4. **Rung 4 — a vertex's multiplicity in its own Prüfer sequence equals $\deg_T(v)-1$.** The sequence is not an opaque code; it directly encodes the degree sequence of the tree, readable before decoding.

## Why Students Fail
The six-characterization equivalence is easy to under-appreciate as "just definitions" rather than as a genuine PROOF TOOL — a student who has only memorized one characterization (say, "connected and acyclic") will get stuck on a problem stated in terms of a different one (say, "$n-1$ edges, and I want to show it's connected"), because they have not internalized that the characterizations are interchangeable, each implying the others under the stated minimal pairing. The Prüfer sequence is frequently taught as an algorithm to execute mechanically without the accompanying insight that its multiplicities directly encode the tree's degree sequence — so students can run the algorithm correctly while treating its output as an opaque code rather than transparent information. Finally, Cayley's formula counts LABELED trees (distinct vertex names matter), and this is easily confused with counting distinct SHAPES (unlabeled/nonisomorphic trees) — a much smaller, structurally different count with no simple closed form, and the confusion is compounded because both concepts are called simply "trees on $n$ vertices" in casual language.

## Misconceptions

### MC-1: TREE-REQUIRES-THREE-PROPERTIES
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Believing a tree requires all three of (connected, acyclic, $m=n-1$) to be checked independently, rather than recognizing that any TWO of these three imply the third.
- **Why this birth type:** An overgeneralization from the ordinary experience of checking multiple independent conditions for most mathematical definitions — the student extends that general habit to a case where the conditions are NOT independent, missing the specific redundancy theorem that applies here.
- **Detection probe:** "Can a connected graph with $n-1$ edges fail to be a tree?" A student with MC-1 hesitates or answers "yes" (looking for a separate acyclicity check); the correct answer is "no" — connected plus $n-1$ edges already forces acyclicity.
- **Repair:** Attempt to draw a counterexample: a connected graph on, say, 4 vertices with exactly 3 edges that ALSO has a cycle. Show this is impossible — a cycle among connected vertices forces at least as many edges as vertices in that cyclic portion, exceeding $n-1$ once connectivity to the rest is added.
- **Verification of death:** Given any two of the three properties for a novel graph, the student immediately concludes the third without additional verification.

### MC-2: PRUFER-SEQUENCE-ENCODES-STRUCTURE-NOT-DEGREES
- **Birth type:** Type 4 (notation-induced) — moderate
- **Description:** Believing the Prüfer sequence is just a structural fingerprint with no intrinsic meaning, rather than recognizing that the multiplicity of vertex $v$ in the sequence equals $\deg_T(v)-1$.
- **Why this birth type:** Notation-induced: the encoding/decoding ALGORITHM is often taught as a mechanical procedure (remove smallest leaf, record neighbor, repeat) without connecting each step back to what it means for the tree's structure — the student can execute the steps correctly while the sequence remains an opaque symbol string rather than a transparent record of degree information.
- **Detection probe:** "Given Prüfer sequence $(3,3,4)$ on $n=5$ vertices, what is the degree of vertex 3?" A student with MC-2 cannot answer without fully decoding the tree first.
- **Repair:** Re-derive the multiplicity rule directly from the algorithm's own mechanics: a leaf never appears in the sequence (it's removed, not recorded), and a vertex is recorded once each time one of its OTHER edges gets pruned away before it becomes a leaf itself — so its final multiplicity is exactly (its degree) minus (the one edge that remains when it's finally removed or the process ends), giving $\deg_T(v)-1$.
- **Verification of death:** Given a Prüfer sequence, the student states the full degree sequence of the corresponding tree directly from vertex multiplicities, before decoding the actual edges.

### MC-3: CAYLEY-COUNTS-UNLABELED-TREES
- **Birth type:** Type 3 (language contamination) — moderate
- **Description:** Confusing Cayley's $n^{n-2}$ formula (which counts LABELED trees — distinct structures on a fixed, named vertex set) with the much smaller count of nonisomorphic (unlabeled) tree SHAPES.
- **Why this birth type:** Language contamination: both quantities are casually described as "the number of trees on $n$ vertices" in everyday mathematical speech, and the crucial qualifier — labeled vs. unlabeled — is easy to drop in conversation even though it changes the answer from an exponential formula to a count with no simple closed form.
- **Detection probe:** "How many labeled trees exist on $n=3$ vertices? How many DIFFERENT-SHAPED trees exist on 3 vertices?" A student with MC-3 gives the same answer to both, or applies Cayley's formula to the shape question.
- **Repair:** Work $n=3$ explicitly: Cayley gives $3^1=3$ labeled trees (three paths, each with a different center vertex — $\{1,2\}\cup\{2,3\}$, $\{1,3\}\cup\{3,2\}$, $\{1,2\}\cup\{1,3\}$), but all three are the SAME SHAPE (a path of length 2) once vertex labels are ignored — so there is exactly ONE nonisomorphic tree on 3 vertices, not three.
- **Verification of death:** Given a small $n$, the student correctly computes both the labeled count (via Cayley) and recognizes that the unlabeled count is a genuinely different, smaller number without a simple formula.

## Analogies
1. **The "any two locks open the same door" analogy (targets MC-1).** Some doors are designed so that any two of three keys (say, a physical key, a code, and a fingerprint) unlock it, and having those two automatically satisfies the requirement of the third check — the tree's three properties work the same way: satisfying any two automatically "unlocks" the third.
2. **The seating-chart analogy (targets MC-3).** Three people can be seated in a row in $3!=6$ distinct SEATING arrangements (labeled: who sits where matters) but there is only ONE distinct SHAPE of arrangement (a row of three) if you ignore who specifically sits in each seat — Cayley's formula is a "seating chart" count (labeled), not a "shape" count (unlabeled).

## Demonstrations
### Demonstration 1 — the six characterizations on a path graph (mirrors Blueprint Ex1)
$P_n$, the path on $n$ vertices, is connected (each vertex links to the next) and acyclic (no repeated vertex in any walk), with $n-1$ edges. Adding any non-edge $\{i,j\}$ with $|i-j|\ge2$ creates a cycle via the unique existing path from $i$ to $j$. Removing any single edge disconnects the vertices on either side. All six characterizations hold simultaneously.

### Demonstration 2 — Cayley's formula on small cases (mirrors Blueprint Ex2)
Labeled trees on $\{1,2,3\}$: Cayley predicts $3^{3-2}=3$. Direct list: $\{1\text{-}2,2\text{-}3\}$ (center 2), $\{1\text{-}3,3\text{-}2\}$ (center 3), $\{1\text{-}2,1\text{-}3\}$ (center 1) — exactly 3, all the SAME unlabeled shape (a path), confirming MC-3's distinction directly. For $n=4$: $4^2=16$ labeled trees; for $n=5$: $5^3=125$.

### Demonstration 3 — Prüfer encoding and decoding (mirrors Blueprint Ex3)
Encode the labeled tree on $\{1,2,3,4,5\}$ with edges $\{1,3\},\{2,3\},\{3,4\},\{4,5\}$. Leaves initially $\{1,2,5\}$; smallest is 1, its neighbor is 3 → write 3, delete 1. Remaining leaves $\{2,5\}$; smallest is 2, neighbor is 3 → write 3, delete 2. Remaining leaves $\{3,5\}$; smallest is 3, neighbor is 4 → write 4, delete 3. Prüfer sequence: $(3,3,4)$. By MC-2's own multiplicity rule: vertex 3 appears twice → $\deg_T(3)=2+1=3$; vertex 4 appears once → $\deg_T(4)=1+1=2$; vertices 1, 2, 5 (absent) are leaves with $\deg=1$. Check: $3+2+1+1+1=8=2\times4=2(n-1)$ ✓. Decoding $(3,3,4)$ independently recovers the identical original tree.

## Discovery Questions
1. "If I tell you a graph is connected and has exactly $n-1$ edges, do you also need to separately check for cycles to know it's a tree? What would a cycle plus connectivity force about the edge count?"
2. "Given a tree's Prüfer sequence, without decoding it into an actual tree, can you already tell how many edges touch a particular vertex? What does a vertex's absence from the sequence tell you?"
3. "For 3 vertices, Cayley's formula says there are 3 labeled trees. If you draw all three and then erase the vertex labels, how many genuinely DIFFERENT-looking trees do you actually have?"

## Teaching Sequence
Best taught by **direct instruction with a proof-tool framing for the six characterizations**, followed by **guided algorithmic practice for Prüfer sequences** — the equivalence theorem is not something a student would independently discover, but the Prüfer bijection benefits from hands-on execution once the target theorem (Cayley's formula) has been motivated by the discovery questions.
1. Present a tree and walk through all six characterizations via Demonstration 1, posing Discovery Question 1 before revealing the redundancy theorem explicitly.
2. Introduce rooted trees, spanning trees, and Cayley's formula via Demonstration 2, contrasting labeled vs. unlabeled counts immediately via Discovery Question 3.
3. Introduce the Prüfer sequence via Demonstration 3, posing Discovery Question 2 before revealing the degree-multiplicity rule.
4. Have the student independently encode and decode a fresh small tree.
5. Assess with the P77 problem set and cross-link transfer probe.

## Tutor Actions
1. **On stating a tree property:** always ask which OTHER properties are automatically implied, reinforcing the two-of-three redundancy rather than treating each property as needing separate verification.
2. **On Prüfer encoding:** require the student to state each vertex's Prüfer-sequence multiplicity as a degree prediction BEFORE decoding, testing whether the sequence is read as transparent (MC-2's target) rather than opaque.
3. **On any count of "trees on $n$ vertices":** immediately clarify labeled vs. unlabeled before answering, since the ambiguity is the exact mechanism of MC-3.
4. **On spanning trees:** emphasize that a connected graph typically has MANY spanning trees, not one — Cayley's formula counts ALL of $K_n$'s spanning trees precisely because every labeled tree on $n$ vertices is one.

## Voice Teaching Notes
1. **Register:** proficient/formal — this concept assumes fluency with tree basics from `math.disc.graph-trees` and develops abstract counting theory; less reliance on drawn pictures than `math.graph.graph`, more on symbolic derivation.
2. **Load-bearing sentence, spoken slowly:** "Any two of connected, acyclic, and $n$-minus-one edges — pick any two — and the third one comes for free."
3. **Wait time:** pause after Discovery Question 3, letting the student notice on their own that three labeled trees can share one shape before naming the labeled/unlabeled distinction.

## Assessment Signals
1. **Gate concept:** correctly applies at least one pair of the six characterizations to conclude a graph is (or is not) a tree.
2. **Redundancy application:** given any two of {connected, acyclic, $m=n-1$}, correctly concludes the third without independent verification.
3. **Cayley's formula:** correctly computes $n^{n-2}$ for a stated $n$ and correctly distinguishes it from an unlabeled-tree count.
4. **Prüfer fluency:** correctly encodes AND decodes a novel small labeled tree, and reads at least one vertex's degree directly from sequence multiplicity before decoding.
5. **Transfer:** connects the Prüfer/Cayley machinery to a genuinely different counting context (e.g. spanning trees of $K_n$ vs. of a cycle $C_n$).

## Tutor Recovery Strategy
If the student insists on checking all three tree properties independently, work several examples where checking only two properties already determines the third, until the redundancy becomes the default habit rather than an extra fact to remember. If the student treats the Prüfer sequence as opaque, have them predict the FULL degree sequence from a given Prüfer sequence's multiplicities before attempting to decode the tree, then verify the prediction against the decoded result. If the student conflates labeled and unlabeled counts, work the $n=3$ and $n=4$ cases side by side, explicitly drawing every labeled tree and grouping them by shape.

## Memory Hooks
1. "Any two of the three tree properties — the third rides along for free."
2. "A vertex missing from the Prüfer sequence is a leaf; count its appearances plus one for its true degree."
3. "Cayley counts NAMES on the vertices, not SHAPES of the tree."

## Transfer Connections
- **`math.disc.graph-trees`:** the foundational tree definition, leaf, path, and acyclicity content this concept extends into the six-characterization equivalence, rooted trees, and the Cayley/Prüfer counting theory — cross-linked directly (see Blueprint References).
- **`math.graph.minimum-spanning-tree`:** the direct next concept — MST algorithms operate on WEIGHTED spanning trees, building on this concept's spanning-tree definition and existence proof.
- **`math.graph.graph`:** this concept's order/size relation for trees ($m=n-1$) is a direct application of that concept's order/size framing.

## Cross-Subject Connections
- **Computer Science (data structures):** binary search trees, heaps, and tries are rooted trees whose height (this concept's own vocabulary) directly determines algorithmic efficiency; the Prüfer sequence itself is a classic technique for compactly encoding tree structures.
- **Chemistry (molecular tree structures):** acyclic molecular graphs (e.g. alkanes, which have no rings) are trees, and counting distinct labeled/unlabeled structural isomers directly parallels the labeled-vs-unlabeled tree-counting distinction this concept develops.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.graph.tree.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, cross-link transfer probe P76 connecting to binary-tree height and the Matrix-Tree Theorem). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. This Blueprint pre-assigns no birth types; birth types classified independently here (MC-1 Type 1, MC-2 Type 4, MC-3 Type 3) against this program's own 6-type taxonomy.
- Cross-link: `docs/curriculum/blueprints/math.disc.graph-trees.md` — the sibling foundational Blueprint this concept's own Blueprint explicitly builds on. Its already-authored EB entry, `educational-brain/concepts/mathematics/math.disc.graph-trees.md`, was read directly to ground this entry's Transfer Connections and to verify no content duplication (that entry owns the basic tree definition, leaf, and acyclicity content; this entry owns the six-characterization equivalence, rooted trees, Cayley's formula, and Prüfer sequences).

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- This entry's MC-1 (TREE-REQUIRES-THREE-PROPERTIES, the equivalence-redundancy misconception) is structurally similar to a broader pattern this program has repeatedly documented — treating jointly-sufficient conditions as though each must be independently verified — but is not a duplicate of any prior entry's specific misconception; no cross-reference was warranted since no other authored entry addresses tree-characterization redundancy specifically.
- `math.disc.graph-trees`'s own Curriculum Feedback (authored Batch 22) noted this concept as a genuine Blueprint-exists-no-EB-yet cross-link target; that status is now resolved by this batch's authoring, though the prior entry is not modified per this program's no-retroactive-rewrite convention.

## Version History
- **Batch 24** (2026-09-12): initial authoring, part 2 of 3 this batch (with `math.graph.graph` and `math.graph.minimum-spanning-tree`). Blueprint reused by reference; 3 misconceptions birth-type classified independently (MC-1 Type 1 foundational, MC-2 Type 4 moderate, MC-3 Type 3 moderate).
