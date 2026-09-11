# math.disc.graph — Graph

## Identity
- **KG ID:** `math.disc.graph`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.found.set-theory`
- **Unlocks:** `math.disc.graph-connectivity`, `math.disc.graph-trees`
- **Cross-links:** `math.graph.graph` (not yet authored — independence mode)
- **Difficulty:** developing
- **Bloom level:** understand
- **Mastery threshold:** 0.9 (MAMR 5/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) define a graph $G=(V,E)$ as a set of vertices $V$ and a set of edges $E$, and distinguish UNDIRECTED (unordered-pair edges) from DIRECTED (ordered-pair edges) graphs; (2) compute the degree of a vertex — the number of incident edges — correctly, including the rule that a self-loop contributes 2, not 1; (3) state and apply the Handshaking Lemma ($\sum_v\deg(v)=2|E|$) to solve for an unknown quantity (edge count, a missing degree, or an impossible degree sequence).

## Core Understanding
A graph $G=(V,E)$ is a pair: a set of VERTICES $V$ (nodes, drawn as dots) and a set of EDGES $E$ connecting pairs of vertices (drawn as lines or arrows). In an UNDIRECTED graph, each edge is an unordered pair $\{u,v\}$ — a two-way connection, like a friendship, where $\{u,v\}=\{v,u\}$. In a DIRECTED graph (digraph), each edge is an ordered pair $(u,v)$ — a one-way connection, like a "follows" relationship, where $(u,v)\ne(v,u)$ in general: having one arrow does not automatically produce the reverse arrow.

This distinction is formally grounded in `math.found.set-theory`'s own Cartesian-product framework: $E\subseteq V\times V$, with the ordered-pair structure of the Cartesian product giving directed edges their formal justification, while undirected edges are the special case where the pair is treated as unordered.

The DEGREE of a vertex $v$, $\deg(v)$, is the number of edges incident to (touching) $v$. A SELF-LOOP (an edge from $v$ back to itself) contributes exactly 2 to $\deg(v)$, not 1 — because BOTH "ends" of the loop attach at $v$.

The HANDSHAKING LEMMA states: for any undirected graph, $\sum_{v\in V}\deg(v)=2|E|$. This holds because every edge has exactly two endpoints, and each endpoint contributes 1 to that vertex's degree count — so summing all degrees counts every edge exactly TWICE, once per endpoint. A direct corollary: the sum of degrees is always even, and therefore the number of vertices with ODD degree is always even (never 1, 3, 5, ...) — a fact used elsewhere in graph theory but not developed further here.

## Mental Models
1. **Rung 1 — edges are unordered pairs (undirected) or ordered pairs (directed).** The formal distinction traces directly to `math.found.set-theory`'s ordered-pair-vs-set framing.
2. **Rung 2 — a self-loop attaches at both ends of the SAME vertex.** Two attachments, so it contributes 2 to that one vertex's degree, not 1.
3. **Rung 3 — every edge is counted TWICE when summing degrees, once at each endpoint.** This is exactly why $\sum\deg(v)=2|E|$, not $|E|$ — a direct consequence of "every edge has two ends," not a separately memorized coefficient.
4. **Rung 4 — a directed edge grants no automatic reverse.** $(u,v)\ne(v,u)$ in general; the existence of one arrow says nothing about whether the opposite arrow also exists.

## Why Students Fail
Because everyday intuitions about "connections" (roads, friendships) are usually mutual, students often assume a directed edge automatically implies its reverse — a genuine category error between the undirected and directed frameworks that the notation alone does not prevent without deliberate emphasis. Separately, a self-loop's "both ends at the same vertex" structure is visually less obvious than an ordinary edge's two distinct endpoints, so its degree-2 contribution is easy to undercount as 1. Finally, the Handshaking Lemma's factor of 2 is frequently presented as a formula to apply rather than re-derived from "every edge has two ends" each time, leaving students without a way to reconstruct the correct coefficient if the formula is forgotten or misremembered.

## Misconceptions

### MC-1: DIRECTED-EDGE-ASSUMED-SYMMETRIC
- **Birth type:** Type 6 (analogy overextension) — moderate
- **Description:** Believing an edge $(u,v)$ in a directed graph implies $(v,u)$ also exists.
- **Why this birth type:** An overextension of the everyday analogy of "connection" (roads, friendships, relationships) that is usually bidirectional by default in ordinary experience — the student applies this default mutuality assumption to directed graphs specifically, where the entire point of the "directed" qualifier is to break that default.
- **Detection probe:** "In a directed graph with edge $(A,B)$ only, does the edge $(B,A)$ also exist?" A student with MC-1 answers "yes."
- **Repair:** Re-anchor on the one-way-street analogy explicitly: a one-way street from A to B does not create a road back from B to A — the two directions are entirely independent facts, each requiring its own explicit edge to exist.
- **Verification of death:** Given a directed graph with only some edges specified, the student correctly identifies which reverse edges do NOT exist without being prompted.

### MC-2: SELF-LOOP-DEGREE-ONE
- **Birth type:** Type 2 (perceptual intuition) — moderate
- **Description:** Counting a self-loop as contributing 1 (not 2) to a vertex's degree.
- **Why this birth type:** A perceptual-intuition error: a self-loop LOOKS like a single line/curve drawn at one vertex, so a quick visual count naturally registers "one loop, contributes one" — the fact that both its endpoints coincide at the SAME vertex (and therefore both contribute) is not visually salient the way two distinct endpoints on an ordinary edge are.
- **Detection probe:** "A vertex has exactly one self-loop and no other edges. What is its degree?" A student with MC-2 answers 1 instead of the correct 2.
- **Repair:** State explicitly: "both ends of the loop attach at this same vertex — count each attachment separately." Have the student physically trace both ends of the loop back to the vertex, confirming two distinct attachment points despite the visual appearance of a single curve.
- **Verification of death:** Given a vertex with a self-loop plus other ordinary edges, the student correctly adds 2 (not 1) for the self-loop's contribution to the total degree.

### MC-3: HANDSHAKE-SUM-EQUALS-EDGES
- **Birth type:** Type 4 (notation-induced) — foundational
- **Description:** Believing $\sum\deg(v)=|E|$ rather than the correct $2|E|$.
- **Why this birth type:** Notation-induced: the Handshaking Lemma is frequently presented and used as a computational formula ("$\sum\deg=2|E|$, so...") without the student re-deriving the factor of 2 each time from "every edge has two ends" — so under pressure, the simpler-looking (but wrong) relationship $\sum\deg=|E|$ is easy to default to, since it superficially resembles a more intuitive "edges equal degree total" framing.
- **Detection probe:** "A graph has 4 edges. Without listing individual vertex degrees, what is $\sum_v\deg(v)$?" A student with MC-3 answers 4 instead of 8.
- **Repair:** Re-derive from first principles every time it is needed: "each edge has 2 endpoints, so it contributes 2 to the total — not 1." Verify against Demonstration 1's concrete example, confirming the individually-computed degrees sum to exactly twice the edge count.
- **Verification of death:** Given a novel edge count, the student correctly computes $\sum\deg(v)=2|E|$ without hesitation and can explain why the factor is 2, not 1, if asked.

## Analogies
1. **The one-way-street analogy.** A directed edge $(A,B)$ is a one-way street from A to B; no road back from B to A exists unless a SEPARATE edge $(B,A)$ is explicitly present.
2. **The handshake-count analogy (the Lemma's own namesake).** If every handshake at a party is counted once by EACH participant (so a single handshake between two people contributes 1 to each of their personal handshake counts), the sum of everyone's individual counts is exactly TWICE the number of actual handshakes — mirroring $\sum\deg(v)=2|E|$ exactly.

## Demonstrations
### Demonstration 1 — undirected graph and degree computation (mirrors Blueprint Ex1)
$G$ has $V=\{A,B,C,D\}$, $E=\{\{A,B\},\{A,C\},\{B,C\},\{C,D\}\}$. $\deg(A)=2$, $\deg(B)=2$, $\deg(C)=3$, $\deg(D)=1$. Check: $2+2+3+1=8=2\times4=2|E|$ — Handshaking Lemma confirmed.

### Demonstration 2 — directed graph, breaking MC-1 (mirrors Blueprint Ex2)
$G$ has $V=\{X,Y\}$, $E=\{(X,Y),(Y,X),(X,X)\}$: $(X,Y)$ and $(Y,X)$ are genuinely DIFFERENT edges (an arrow $X\to Y$ and a separate arrow $Y\to X$), coexisting without contradiction; $(X,X)$ is a self-loop at $X$.

### Demonstration 3 — solving via the Handshaking Lemma (mirrors Blueprint Ex3)
An undirected graph has 5 edges and four known vertex degrees $2,3,1,3$. $\sum\deg(v)=2|E|=2(5)=10$; known sum $=2+3+1+3=9$; fifth vertex degree $=10-9=1$.

## Discovery Questions
1. "If a directed edge $(A,B)$ exists, does anything in its definition automatically produce a separate edge $(B,A)$? What would have to be true for both to exist?"
2. "A self-loop is drawn as a single curve at one vertex. If you carefully trace where each END of that curve attaches, how many attachment points does it actually have?"
3. "If every edge in a graph has exactly two endpoints, and you sum up every vertex's individual degree, how many times does each edge get counted in that sum?"

## Teaching Sequence
Best taught by **direct instruction with embedded contrast pairs** — the vertex/edge/directed/undirected vocabulary and the Handshaking Lemma are foundational definitional content best presented directly and reinforced through explicit contrasts (undirected vs. directed; self-loop vs. ordinary edge; sum-of-degrees vs. edge-count), rather than open discovery, since there is no prior knowledge from which a student could independently derive these specific conventions.
1. Introduce vertices and undirected edges concretely (Demonstration 1), building the formal $G=(V,E)$ notation from the drawn diagram.
2. Introduce directed graphs by contrast (Demonstration 2), posing Discovery Question 1 before confirming the answer.
3. Introduce self-loops and pose Discovery Question 2 before revealing the degree-2 rule.
4. State and derive the Handshaking Lemma, posing Discovery Question 3 before confirming the factor-of-2 derivation.
5. Work Demonstration 3 as an applied solving exercise.
6. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On introducing a directed graph:** immediately ask "does an edge in one direction guarantee the reverse?" before letting the student assume symmetry.
2. **On a self-loop's degree:** always ask the student to trace both attachment points explicitly before accepting a degree value.
3. **On a Handshaking Lemma application:** require the student to state WHY the factor is 2 ("every edge has two ends") before proceeding with the arithmetic.
4. **On the odd-degree-vertex-count corollary:** may be mentioned as an interesting aside, but is deliberately not developed as a separate teaching target at this concept's level — full treatment belongs to a future degree-sequence or graph-connectivity concept.

## Voice Teaching Notes
1. **Register:** concrete and visual — graph theory benefits enormously from drawn diagrams, so the tutor's language should consistently point back to a picture rather than relying purely on symbolic notation.
2. **Load-bearing sentence, spoken slowly:** "Every edge has two ends — that's the whole reason the Handshaking Lemma has a factor of 2."
3. **Wait time:** pause after asking "does one direction guarantee the reverse?" giving the student space to reason through the one-way-street analogy themselves.

## Assessment Signals
1. **Gate concept:** correctly identifies a graph as directed or undirected and computes vertex degrees for a novel small graph.
2. **Directed-edge discrimination:** correctly identifies that a directed edge in one direction does not imply the reverse, given a novel directed graph.
3. **Self-loop accuracy:** correctly counts a self-loop's contribution as 2, not 1, for a novel vertex.
4. **Handshaking Lemma application:** correctly solves for an unknown edge count or missing degree using $\sum\deg(v)=2|E|$.
5. **Transfer:** models a novel real-world scenario (e.g. a handshake or social-network scenario) as a graph, correctly identifying vertices, edges, and directedness.

## Tutor Recovery Strategy
If the student assumes directed-edge symmetry, work through several directed examples where one direction genuinely does NOT imply the other, until the independence of the two directions becomes concrete rather than assumed. If the student undercounts a self-loop's degree, have them physically trace both ends of the loop on a drawn diagram every time until the two-attachment-point structure becomes automatic.

## Memory Hooks
1. "Directed means one-way — no automatic return trip."
2. "A self-loop touches its vertex twice — both ends are here."
3. "Every edge has two ends — that's why $\sum\deg(v)=2|E|$."

## Transfer Connections
- **`math.found.set-theory`:** the ordered-pair/Cartesian-product framework ($E\subseteq V\times V$) this concept's directed-edge definition is formally grounded in.
- **`math.disc.graph-connectivity`:** builds directly on this concept's vertex/edge/degree vocabulary to develop paths and connectedness.
- **`math.disc.graph-trees`:** trees are a specialization of graphs (connected, acyclic) — a direct application of this concept's foundational definitions.

## Cross-Subject Connections
- **Computer Science (network topology, social graphs):** the vertex/edge/directed-undirected framework is the direct mathematical model underlying computer networks, social media "follows" relationships, and web link structures.
- **Chemistry (molecular structure graphs):** molecules are often modeled as graphs with atoms as vertices and bonds as edges, with degree corresponding to a given atom's number of bonds (valence-related).

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.graph.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76). Not restated verbatim; this entry adds the birth-type classification (this Blueprint did not pre-assign birth types, unlike several other math.disc Blueprints sourced this campaign), mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- The Blueprint's own cross-link target, `math.graph.graph`, is genuinely unauthored (no Blueprint exists for it either, verified via file-existence check) — confirming the Blueprint's own independence-mode P76 declaration is still accurate; this entry's Transfer Probe likewise does not fabricate a cross-reference to that unauthored content.
- This entry opens the graph-theory subtree of `math.disc`, deliberately deferred from Batch 19 as one of the two structurally distinct subtrees. Its two unlocked children (`math.disc.graph-connectivity`, `math.disc.graph-trees`) are not yet authored.

## Version History
- **Batch 20** (2026-09-11): initial authoring, part 2 of 3 this batch (with `math.disc.derangements` and `math.disc.propositional-logic`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 6 moderate, MC-2 Type 2 moderate, MC-3 Type 4 foundational) — birth types independently derived, since this Blueprint (unlike several other math.disc sources this campaign) does not pre-assign them.
