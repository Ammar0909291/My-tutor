# math.disc.graph-types — Graph Types

## Identity
- **KG ID:** `math.disc.graph-types`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.graph`
- **Unlocks:** (none in KG)
- **Cross-links:** (none)
- **Difficulty:** developing
- **Bloom level:** understand
- **Mastery threshold:** 0.9 (MAMR 5/5)
- **Estimated hours:** 2

## Learning Objective
By the end of this concept, the student can: (1) classify graphs by structural type, distinguishing simple graphs from multigraphs (parallel edges allowed) and pseudographs (loops also allowed), identifying complete graphs $K_n$ (every pair adjacent), bipartite graphs (2-colorable, no odd cycles), and complete bipartite graphs $K_{m,n}$; (2) recognize directed graphs (with in-degree/out-degree) and weighted graphs as further structural variants; (3) compute degree sequences and verify the Handshaking Lemma extends beyond simple graphs (to multigraphs, pseudographs, and digraphs, via appropriately adapted degree definitions), deducing the parity constraint that the number of odd-degree vertices is always even.

## Core Understanding
A COMPLETE GRAPH $K_n$ has $n$ vertices with EVERY pair connected by exactly one edge ($|E|=\binom{n}{2}$, every vertex has degree $n-1$). A BIPARTITE graph has its vertex set partitionable into $X$ and $Y$ such that every edge goes BETWEEN the two parts (never within one part) — equivalently, a graph is bipartite if and only if it contains NO odd-length cycle. Critically, bipartiteness is a claim about EDGE STRUCTURE (which pairs can be adjacent), not about CONNECTIVITY — a bipartite graph can be perfectly connected, since cross-edges between the two parts are exactly what bipartiteness allows and often requires. A COMPLETE BIPARTITE graph $K_{m,n}$ has parts of size $m$ and $n$ with EVERY cross-pair adjacent ($|E|=mn$) — "complete" here means maximal WITHIN the bipartite structural constraint, a genuinely different maximality notion from $K_n$'s "every pair whatsoever" completeness.

A MULTIGRAPH allows multiple (parallel) edges between the same vertex pair; a PSEUDOGRAPH additionally allows loops (self-edges). A DIRECTED graph's edges are ordered pairs, splitting degree into IN-DEGREE (edges pointing in) and OUT-DEGREE (edges pointing out). A WEIGHTED graph attaches a numerical weight to each edge, modeling distances, costs, or capacities.

The HANDSHAKING LEMMA, $\sum_{v}\deg(v)=2|E|$, is a universal algebraic identity holding across ALL these graph variants, not merely a curiosity about social handshakes — each edge contributes exactly 1 to each of its two endpoints' degree counts, so summing all degrees always counts every edge exactly twice, regardless of graph type. It extends correctly to each variant with the appropriate degree definition: in a multigraph, each parallel edge counts separately toward both endpoints; in a pseudograph, a loop contributes 2 to its own vertex's degree (both "ends" attach there); in a digraph, $\sum\deg^+(v)=\sum\deg^-(v)=|E|$, and $\sum(\deg^++\deg^-)=2|E|$. A direct corollary follows from the fact that $2|E|$ is always even: the number of ODD-degree vertices in any graph is always EVEN — since the sum of an odd number of odd integers would itself be odd, contradicting $2|E|$'s evenness.

## Mental Models
1. **Rung 1 — bipartite is about EDGE structure, not connectivity.** The two parts are color classes, not disconnected pieces; a connected bipartite graph (like $K_{2,3}$) is entirely ordinary.
2. **Rung 2 — "complete" means two different things for $K_n$ versus $K_{m,n}$.** $K_n$'s completeness is "every pair, period"; $K_{m,n}$'s completeness is "every CROSS-pair, given the bipartite constraint" — genuinely different maximality notions sharing one word.
3. **Rung 3 — the Handshaking Lemma is a general algebraic fact, not a social-event metaphor.** It holds identically for simple graphs, multigraphs, pseudographs, and (in its $\deg^++\deg^-$ form) digraphs.
4. **Rung 4 — the odd-degree-vertex-count parity is a direct algebraic consequence of $\sum\deg(v)=2|E|$ being even.** Not a separate fact to memorize, but a one-line derivation from the Lemma itself.

## Why Students Fail
The prefix "bi-" plus "partite" ("two parts") linguistically suggests SEPARATION — two disconnected pieces — when the mathematical definition is actually about which pairs of vertices CAN be adjacent, with cross-edges between the two parts not only allowed but typically present and connecting the whole graph. Separately, $K_n$ is introduced first as "the complete graph," fixing a strong association between the word "complete" and "every possible pair adjacent"; when $K_{m,n}$ is introduced using the same word "complete" in a structurally different sense (maximal WITHIN the bipartite constraint, not overall), the two notions of completeness are easy to conflate without explicit contrast. Finally, the vivid "handshaking" mnemonic (each edge as two people shaking hands) is memorable for simple undirected graphs but does not obviously extend to asymmetric digraph degree or multi-edge multigraph degree, so students may treat the Lemma as a domain-specific curiosity rather than the universal algebraic identity it actually is.

## Misconceptions

### MC-1: BIPARTITE-MEANS-TWO-COMPONENTS
- **Birth type:** Type 3 (language contamination) — high (per this Blueprint's own classification, independently confirmed)
- **Description:** Thinking a bipartite graph has two disconnected components, not realizing a bipartite graph CAN be (and often is) connected — the two parts are vertex color classes, not separate components.
- **Why this birth type:** Language contamination: "bi-" + "partite" literally means "two parts," and the everyday sense of "parts" strongly suggests separate, disconnected pieces — while the mathematical definition's cross-edges (which bipartiteness allows and, in a connected bipartite graph, actively uses) connect the two parts into a single connected structure, a fact the word "parts" alone does not signal.
- **Detection probe:** "Is $K_{2,3}$ connected?" A student with MC-1 answers "no," assuming its two parts must be separate.
- **Repair:** Draw $K_{2,3}$ explicitly (parts $\{A,B\}$ and $\{1,2,3\}$, all 6 cross-edges present) and trace an actual walk between the parts (e.g. $A\to1\to B\to2$), confirming the graph is fully connected despite being bipartite. State clearly: bipartiteness is about which pairs CAN be adjacent (cross-part only), not about whether the graph is connected.
- **Verification of death:** Given a novel bipartite graph, the student correctly determines its connectivity independently of its bipartiteness, without assuming the two properties are linked.

### MC-2: COMPLETE-MEANS-ALL-EDGES-POSSIBLE
- **Birth type:** Type 5 (instruction-induced) — moderate (per this Blueprint's own classification, independently confirmed)
- **Description:** Conflating "complete" with "as many edges as possible given constraints," applying it to bipartite graphs incorrectly (e.g. treating $K_3$ as a subset of $K_{2,3}$), missing that $K_n$'s completeness (every pair whatsoever) and $K_{m,n}$'s completeness (every cross-pair only) are different maximality notions.
- **Why this birth type:** Instruction-induced: $K_n$ is always introduced first and firmly established as "the complete graph," fixing "complete = every pair adjacent" as the word's meaning; when $K_{m,n}$ is introduced later using the SAME word "complete" but in a structurally different sense (maximal only within the bipartite constraint, explicitly EXCLUDING same-part pairs), the two meanings are conflated unless explicitly contrasted.
- **Detection probe:** "Is $K_3$ (a triangle) a subgraph of $K_{2,3}$?" A student with MC-2 answers "yes."
- **Repair:** State explicitly: in $K_n$, EVERY pair of the $n$ vertices is adjacent, including same-part pairs (there are no parts). In $K_{m,n}$, ONLY cross-partition pairs are adjacent — same-part pairs are FORBIDDEN by the bipartite structure itself. $K_3$ requires a triangle (an edge within one part), which $K_{2,3}$'s bipartite structure explicitly forbids — so $K_3$ cannot be a subgraph of $K_{2,3}$.
- **Verification of death:** Given a novel question about $K_n$ vs. $K_{m,n}$'s edge sets, the student correctly identifies which pairs are adjacent in each, without conflating the two completeness notions.

### MC-3: HANDSHAKING-IS-ABOUT-HANDSHAKES
- **Birth type:** Type 3 (language contamination) — moderate (per this Blueprint's own classification, independently confirmed)
- **Description:** Treating the Handshaking Lemma as a combinatorial curiosity specific to social events rather than a universal algebraic identity, missing that it applies to directed, weighted, and multigraphs with appropriately adapted degree definitions.
- **Why this birth type:** Language contamination: the vivid "handshaking" mnemonic (each edge as two people shaking hands) is memorable for simple undirected graphs, but "handshaking" carries an implicit symmetric, one-per-pair connotation that does not obviously extend to a digraph's asymmetric in/out-degree split or a multigraph's multiple parallel edges between the same pair — the metaphor's own vividness can obscure the Lemma's actual full generality.
- **Detection probe:** "Does the Handshaking Lemma apply to a directed graph?" A student with MC-3 answers "no" or expresses uncertainty, treating the Lemma as undirected-graph-specific.
- **Repair:** State the Lemma's ALGEBRAIC justification directly (each edge contributes exactly 1 to each endpoint's degree, totaling 2 per edge, regardless of graph type) and work the digraph adaptation explicitly: $\sum\deg^+(v)=\sum\deg^-(v)=|E|$ (each directed edge contributes 1 to its tail's out-degree and 1 to its head's in-degree), so $\sum(\deg^++\deg^-)=2|E|$ still holds.
- **Verification of death:** Given a novel multigraph, pseudograph, or digraph, the student correctly applies the appropriately-adapted Handshaking Lemma without treating it as inapplicable outside simple undirected graphs.

## Analogies
1. **The color-class-not-team-split analogy.** Bipartite "parts" are like assigning every person at a gathering to one of two name-tag colors based on a rule (e.g. "connected only to the other color") — the gathering can still be one single connected crowd, not two separate rooms.
2. **The maximality-within-rules analogy.** $K_n$ is "maximal with no rules" (every pair connects); $K_{m,n}$ is "maximal within the bipartite rule" (every cross-pair connects, same-part pairs forbidden by the rule itself) — both are "complete" relative to their own constraint, not to some universal standard.

## Demonstrations
### Demonstration 1 — bipartite connectivity, breaking MC-1 (mirrors Blueprint's A01 checkpoint)
$K_{2,3}$ with parts $\{A,B\}$ and $\{1,2,3\}$: all 6 cross-edges present. Tracing $A\to1\to B\to2$ confirms full connectivity — $K_{2,3}$ is both bipartite AND connected.

### Demonstration 2 — $K_n$ vs. $K_{m,n}$ completeness, breaking MC-2 (mirrors Blueprint's TB-R01 Step 2)
In $K_4$: every pair among the 4 vertices is adjacent (including any 3 forming a triangle, $K_3$, as a subgraph). In $K_{2,3}$: only the 6 cross-pairs are adjacent; no triangle can exist, since any 3 vertices necessarily include either 2 from the same part (not adjacent) or fail to form a closed triangle.

### Demonstration 3 — the Handshaking Lemma's generality, breaking MC-3 (mirrors Blueprint's TB-R02)
For a digraph with edges $(A,B)$, $(B,C)$, $(C,A)$: $\deg^+(A)=1,\deg^-(A)=1$; similarly for $B,C$. $\sum\deg^+=\sum\deg^-=3=|E|$. $\sum(\deg^++\deg^-)=6=2|E|$ — the Lemma holds identically in its adapted digraph form.

## Discovery Questions
1. "If a bipartite graph's two parts are connected by cross-edges, what would actually have to be true for the graph to be DISCONNECTED — is bipartiteness itself enough to guarantee that?"
2. "$K_4$ and $K_{2,3}$ are both called 'complete.' Does 'complete' mean the exact same thing in both names, or is something different being maximized in each?"
3. "If the Handshaking Lemma's proof is really just 'every edge has two ends,' does that argument care whether the graph is directed, has parallel edges, or is a simple graph?"

## Teaching Sequence
Best taught by **direct instruction with deliberate side-by-side contrasts** — the graph-type vocabulary (complete, bipartite, complete bipartite, multigraph, pseudograph, digraph, weighted) is definitional content most efficiently introduced directly, with each Discovery Question posed immediately before its corresponding contrast demonstration so the student predicts before confirming, targeting each of the three specific conflations this concept is built to prevent.
1. Introduce $K_n$ and bipartite graphs, posing Discovery Question 1 before working Demonstration 1 (targeting MC-1).
2. Introduce $K_{m,n}$, posing Discovery Question 2 before working Demonstration 2 (targeting MC-2).
3. Introduce multigraphs, pseudographs, digraphs, and weighted graphs as further structural variants.
4. Restate the Handshaking Lemma, posing Discovery Question 3 before working Demonstration 3 (targeting MC-3), then derive the odd-degree-vertex parity corollary directly from the Lemma's evenness.
5. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On a bipartite-graph connectivity question:** always ask the student to trace an actual path between the two parts before answering, to preempt MC-1.
2. **On a $K_n$/$K_{m,n}$ completeness question:** require the student to state explicitly which pairs are and are not adjacent in each, rather than accepting "complete" as a single undifferentiated idea.
3. **On a Handshaking Lemma application to a non-simple graph:** require the student to state the adapted degree definition (multigraph multiplicity, pseudograph loop-counts-2, digraph in+out) before applying the Lemma.
4. **On the odd-degree parity corollary:** always derive it live from "the sum $2|E|$ is even" rather than presenting it as a separately memorized fact.

## Voice Teaching Notes
1. **Register:** classificatory and comparison-driven — this concept is fundamentally about sorting graphs into correctly-understood categories, so language should consistently invite "how is this different from that?" framing.
2. **Load-bearing sentence, spoken slowly:** "Bipartite is about which PAIRS can connect — not about whether the graph is connected."
3. **Wait time:** pause after posing Discovery Question 2, giving the student space to articulate the two different senses of "complete" before the contrast is confirmed.

## Assessment Signals
1. **Gate concept:** correctly classifies a novel graph by type (simple, multigraph, pseudograph, bipartite, complete, complete bipartite, directed, weighted).
2. **Bipartite-connectivity discrimination:** correctly determines a bipartite graph's connectivity independently of its bipartiteness.
3. **Completeness precision:** correctly distinguishes $K_n$'s and $K_{m,n}$'s different maximality notions when asked.
4. **Handshaking generality:** correctly applies the appropriately-adapted Handshaking Lemma to a novel multigraph, pseudograph, or digraph.
5. **Transfer:** applies degree-sequence and parity reasoning to a novel structural-constraint problem.

## Tutor Recovery Strategy
If the student persists in believing bipartite implies disconnected, have them construct several connected bipartite graphs themselves (starting from $K_{2,3}$ and modifying it) until connected-and-bipartite becomes an ordinary, unremarkable combination rather than a felt contradiction. If the student conflates the two completeness notions, work several explicit "is this a subgraph of that?" questions (as in Demonstration 2) until the different constraint structures become concrete.

## Memory Hooks
1. "Bipartite is about edges between parts — not about the graph being in pieces."
2. "$K_n$: every pair. $K_{m,n}$: every CROSS pair only — different kinds of 'complete.'"
3. "Handshaking is algebra, not a party trick — it holds for every graph type, adapted degree definitions and all."

## Transfer Connections
- **`math.disc.graph`:** the vertex/edge/degree vocabulary and original Handshaking Lemma statement this concept's classification and extended-Lemma work directly build on.
- **`math.disc.graph-coloring`, `math.disc.graph-connectivity`:** sibling graph-theory concepts, both authored this same batch, sharing the `math.disc.graph` prerequisite; bipartiteness here directly connects to graph-coloring's $\chi\le2$ characterization.

## Cross-Subject Connections
- **Computer Science (data modeling):** multigraphs and weighted graphs directly model real systems with multiple connections between the same nodes (e.g. multiple flight routes between two cities) or costs (e.g. network latency).
- **Chemistry (molecular graph representations):** pseudographs and weighted graphs appear directly in cheminformatics, modeling multi-bonds and bond-strength weights between atoms.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.graph-types.md` — reused by reference throughout (Learning Objective, worked examples, misconception inventory MC-1–MC-3 with birth types already assigned in the Blueprint itself and confirmed independently here, transfer probe). Not restated verbatim; this entry adds the mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- No genuine content-overlap was found with sibling `math.disc` graph-theory entries authored this batch (`graph-coloring`, `graph-connectivity`) — this entry's classification content and the extended Handshaking Lemma are distinct from coloring's chromatic properties and connectivity's path/reachability content, though bipartiteness's $\chi\le2$ connection to `graph-coloring` is noted as a genuine, non-duplicative cross-reference.

## Version History
- **Batch 21** (2026-09-11): initial authoring, part 4 of 5 this batch (with `math.disc.boolean-circuits`, `math.disc.graph-coloring`, `math.disc.graph-connectivity`, `math.disc.predicate-logic-disc`). Blueprint reused by reference, including its own already-assigned birth-type classifications (MC-1 Type 3 high, MC-2 Type 5 moderate, MC-3 Type 3 moderate), independently confirmed.
