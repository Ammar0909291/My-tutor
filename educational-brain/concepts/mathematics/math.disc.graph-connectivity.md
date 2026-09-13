# math.disc.graph-connectivity — Graph Connectivity

## Identity
- **KG ID:** `math.disc.graph-connectivity`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.graph`
- **Unlocks:** `math.disc.graph-trees`, `math.disc.euler-hamiltonian`
- **Cross-links:** (none)
- **Difficulty:** developing
- **Bloom level:** understand
- **Mastery threshold:** 0.9 (MAMR 5/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) define a PATH (a sequence of DISTINCT vertices, each connected to the next by an edge) and a CYCLE (a closed path), correctly distinguishing a path from a general "walk" that might revisit vertices; (2) determine whether an undirected graph is CONNECTED (a path exists between every pair of vertices), correctly identifying disconnection the moment even ONE pair has no connecting path; (3) distinguish CONNECTED (undirected graphs) from STRONGLY CONNECTED (directed graphs, requiring mutual reachability in BOTH directions for every pair), directly refuting the belief that partial reachability implies strong connectivity.

## Core Understanding
A PATH in a graph is a sequence of DISTINCT vertices $v_1,v_2,\ldots,v_k$ where each consecutive pair is joined by an edge — the distinctness requirement means a path never revisits a vertex mid-route. A CYCLE is a closed path: the sequence starts and ends at the same vertex ($v_1=v_k$), while every OTHER vertex in between remains distinct — a loop returning to its start without otherwise repeating any vertex.

An undirected graph is CONNECTED if a path exists between EVERY pair of vertices. Verifying connectedness genuinely requires confirming (typically via systematic search — breadth-first or depth-first traversal) that NO pair is unreachable; a single unreachable pair is sufficient to make the entire graph disconnected, and conversely, checking only a sample of pairs can never confirm connectedness — it can only fail to find a counterexample.

In a DIRECTED graph, edges carry direction, so reachability is NOT automatically symmetric: a directed path FROM $a$ TO $b$ says nothing about whether a path exists BACK from $b$ to $a$. A directed graph is STRONGLY CONNECTED if, for EVERY pair of vertices $u,v$, there is a directed path from $u$ to $v$ AND a separate directed path from $v$ to $u$ — both directions, for every pair. This is a strictly MORE demanding requirement than merely "every vertex can reach at least one other vertex" — a directed graph can have every vertex able to reach SOMEWHERE without being anywhere close to strongly connected, since the return paths may simply not exist.

## Mental Models
1. **Rung 1 — a path never revisits a vertex; a cycle is a path that closes back to its start.** The distinctness requirement is what separates both from a general "walk."
2. **Rung 2 — one unreachable pair is enough to prove disconnection; no finite sample of reachable pairs proves connection.** Connectedness is a universal claim (EVERY pair), requiring systematic confirmation, not spot-checking.
3. **Rung 3 — directed reachability is not automatically symmetric.** An arrow in one direction says nothing about the reverse; each direction is an independent fact requiring its own edge or path.
4. **Rung 4 — strong connectivity demands mutual reachability for EVERY pair, in BOTH directions.** "Can reach somewhere" is a far weaker condition than "the whole graph is strongly connected."

## Why Students Fail
Because everyday reasoning about undirected connections ("this town connects to that one") transfers a sense of automatic mutuality, students carry the same assumption into directed graphs, where reachability from $a$ to $b$ genuinely does not imply the reverse — and this borrowed intuition is exactly what makes strong connectivity feel like a stricter but still "roughly similar" condition to ordinary connectivity, rather than the fundamentally different, much stronger requirement it actually is. Separately, confirming connectedness by systematic search feels laborious, so students are tempted to spot-check a few pairs and generalize — missing that connectedness, as a universal ("every pair") claim, cannot be confirmed by sampling, only refuted by a single counterexample.

## Misconceptions

### MC-1: PARTIAL-REACHABILITY-ASSUMED-SUFFICIENT-FOR-STRONG-CONNECTIVITY
- **Birth type:** Type 6 (analogy overextension) — foundational
- **Description:** Believing that every vertex being able to reach SOME other vertex (in a directed graph) is sufficient for strong connectivity, missing that EVERY pair must be mutually reachable in both directions.
- **Why this birth type:** An overextension of undirected-graph intuition (where "connected to something" and "part of one connected component" feel nearly equivalent) applied to the directed setting, where edge direction breaks that near-equivalence entirely — the student's analogy to the already-familiar undirected case does not account for the asymmetry direction introduces.
- **Detection probe:** "In a directed graph, every vertex can reach at least one other vertex. Is the graph automatically strongly connected?" A student with MC-1 answers "yes."
- **Repair:** Present a directed graph where every vertex CAN reach somewhere (satisfying the weaker condition) but strong connectivity genuinely fails — e.g. $A\to B\to C$ with no return edges: from $A$, both $B$ and $C$ are reachable, but $C$ cannot reach back to $A$ or $B$ at all.
- **Verification of death:** Given a novel directed graph, the student checks EVERY pair in BOTH directions before concluding strong connectivity, rather than inferring it from partial reachability.

### MC-2: PATH-DEFINITION-ALLOWS-REPEATED-VERTICES
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Treating a sequence that revisits a vertex as a valid path, missing the distinctness requirement that separates a path from a general walk.
- **Why this birth type:** An overgeneralization of the everyday, looser sense of "a path from A to B" (any route at all, revisits included) applied to the formal mathematical definition, which specifically excludes revisits — the everyday usage and the technical term share a name but not a definition.
- **Detection probe:** "Is the sequence $A,B,A,C$ a valid path?" A student with MC-2 answers "yes," treating the revisit of $A$ as acceptable.
- **Repair:** Re-state the distinctness requirement explicitly: "a path never revisits a vertex — the moment you'd have to step on an already-visited vertex, that's not a path anymore (unless it's the very last step closing a cycle back to the start)." Sort several example sequences into path/cycle/neither, making the distinctness check concrete.
- **Verification of death:** Given a novel sequence of vertices, the student correctly classifies it as a path, a cycle, or neither, based on the distinctness requirement.

### MC-3: CONNECTEDNESS-VERIFIED-BY-CHECKING-ONLY-A-FEW-PAIRS
- **Birth type:** Type 1 (overgeneralization) — moderate
- **Description:** Concluding a graph is connected after checking only a small sample of vertex pairs, rather than confirming (via systematic search) that literally every pair has a connecting path.
- **Why this birth type:** An overgeneralization of a reasonable-seeming inductive habit ("I checked several examples and they all worked, so it probably holds generally") applied to a claim that is actually universal ("every pair"), where sampling can never confirm the claim — only a systematic search, or finding a single counterexample, settles the question.
- **Detection probe:** "You check 3 pairs of vertices in a 10-vertex graph and all 3 are connected by a path. Is the graph connected?" A student with MC-3 answers "yes" (or "probably") based on the sample.
- **Repair:** Work Demonstration 2's systematic search explicitly: starting from one vertex, trace EVERY reachable vertex, and observe the search simply never reaches some subset — making clear that only a full systematic trace (not sampling) can confirm connectedness, while a single unreachable pair, found anywhere, immediately disproves it.
- **Verification of death:** Given a novel graph, the student performs (or describes) a systematic reachability search from a starting vertex before concluding connectedness, rather than checking only a handful of pairs.

## Analogies
1. **The one-way-street network analogy.** A directed graph's reachability is like a city's one-way streets: being able to drive FROM your house TO downtown says nothing about whether a route exists driving BACK — each direction is its own independent fact.
2. **The exhaustive-search-vs-spot-check analogy.** Confirming a building has no unlocked doors requires checking every door, not a sample of a few — connectedness is the same kind of universal claim, immune to confirmation-by-sampling.

## Demonstrations
### Demonstration 1 — identifying paths and cycles (mirrors Blueprint Ex1)
In a graph with $V=\{A,B,C,D\}$ and edges $A$-$B$, $B$-$C$, $C$-$D$, $D$-$A$: the sequence $A,B,C$ is a valid PATH. The sequence $A,B,C,D,A$ is a valid CYCLE. The sequence $A,B,A,C$ is NEITHER — it revisits $A$ mid-sequence.

### Demonstration 2 — determining connectedness by finding the missing pair, breaking MC-3 (mirrors Blueprint Ex2)
$V=\{A,B,C,D,E\}$, edges $A$-$B$, $B$-$C$, $D$-$E$ (two separate pieces). Tracing from $A$: reaches only $\{A,B,C\}$, never $D$ or $E$. Since no path connects $\{A,B,C\}$ to $\{D,E\}$, the graph is DISCONNECTED — confirmed by finding this one unreachable pair.

### Demonstration 3 — connected vs. strongly connected, breaking MC-1 (mirrors Blueprint Ex3)
Directed graph with $A\to B$, $B\to C$, $C\to A$: every pair mutually reachable — STRONGLY CONNECTED. Modified: $A\to B$, $B\to C$ only (no return edges): from $A$, both $B$ and $C$ are reachable, but $C$ has NO path back to $A$ or $B$ — NOT strongly connected, despite every vertex being able to reach somewhere.

## Discovery Questions
1. "If you're checking whether a graph is connected, and you find just ONE pair of vertices with no path between them, do you need to check any more pairs? What does that single finding already tell you?"
2. "In a directed graph, if vertex $A$ can reach vertex $B$, does that automatically mean $B$ can reach $A$? What would you need to check to be sure either way?"
3. "The sequence $A,B,A,C$ revisits vertex $A$. Does that disqualify it from being a path — or is that allowed as long as you eventually reach your destination?"

## Teaching Sequence
Best taught by **direct instruction of the formal definitions with embedded conflict-evidence contrasts** — path/cycle/connectedness/strong-connectivity are precise definitional content best introduced directly, with Discovery Questions posed immediately before each contrasting demonstration so the student predicts the answer before it is confirmed or corrected, rather than open discovery from scratch (there is no prior knowledge from which these specific conventions could be independently derived).
1. Introduce paths and cycles concretely (Demonstration 1), posing Discovery Question 3 before confirming the neither-classification.
2. Introduce connectedness, posing Discovery Question 1 before working Demonstration 2's systematic search (targeting MC-3).
3. Introduce directed reachability and strong connectivity, posing Discovery Question 2 before working Demonstration 3's contrast (targeting MC-1).
4. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On a candidate path/cycle sequence:** always check EVERY vertex for repeats before classifying it, to preempt MC-2.
2. **On a connectedness claim:** ask whether the student performed a systematic search or merely sampled a few pairs, to preempt MC-3.
3. **On a strong-connectivity claim in a directed graph:** require the student to check BOTH directions for EVERY pair explicitly, never accepting "it can reach things" as sufficient.
4. **On the strongly-connected/connected distinction:** consistently use the one-way-street analogy to reinforce that directed reachability is not automatically symmetric.

## Voice Teaching Notes
1. **Register:** precise and definitionally careful — this concept's entire value lies in exact vocabulary (path vs. walk, connected vs. strongly connected), so language should model that precision consistently.
2. **Load-bearing sentence, spoken slowly:** "Being able to reach SOMEWHERE isn't the same as EVERY pair being mutually reachable — strong connectivity is a much stricter requirement."
3. **Wait time:** pause after posing Discovery Question 2, giving the student space to reason through the one-way-street analogy before the definition is confirmed.

## Assessment Signals
1. **Gate concept:** correctly classifies a novel sequence as a path, cycle, or neither, and correctly determines whether a novel undirected graph is connected.
2. **Systematic-search habit:** performs (or describes) a systematic reachability trace rather than sampling when determining connectedness.
3. **Directed-reachability discrimination:** correctly identifies that a directed path in one direction does not imply the reverse.
4. **Strong-connectivity precision:** correctly distinguishes a directed graph where every vertex can reach somewhere from one that is genuinely strongly connected.
5. **Transfer:** models a novel real-world directed network (e.g. a one-way street system) and correctly reasons about what strong connectivity would require for it.

## Tutor Recovery Strategy
If the student assumes partial reachability implies strong connectivity, work several directed examples where reachability genuinely fails to be mutual, until the independence of the two directions becomes concrete rather than assumed. If the student samples pairs instead of systematically searching for connectedness, have them attempt a full systematic trace (as in Demonstration 2) every time until the habit becomes automatic.

## Memory Hooks
1. "A path never revisits a vertex — distinctness is the whole rule."
2. "One unreachable pair disconnects the whole graph — no sampling can confirm connection."
3. "Strongly connected means EVERY pair, BOTH directions — not just 'can reach something.'"

## Transfer Connections
- **`math.disc.graph`:** the vertex/edge/degree vocabulary, undirected-vs-directed distinction, this concept's path and connectivity definitions build directly on.
- **`math.disc.graph-trees`:** builds directly on this concept, defining a tree as a connected, acyclic graph — combining connectivity and cycle definitions from here.
- **`math.disc.euler-hamiltonian`:** Euler and Hamiltonian paths/circuits are specific path/cycle types requiring connectivity as a precondition, unlocked by this concept.

## Cross-Subject Connections
- **Computer Science (network reliability, routing):** connectivity and strong connectivity directly model whether a computer network can route data between all node pairs, with directed-graph strong connectivity relevant to one-way communication links.
- **Transportation planning (one-way street networks):** the strongly-connected-vs-partial-reachability distinction directly models whether every location in a one-way street system is genuinely mutually accessible.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.graph-connectivity.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe). Not restated verbatim; this entry adds birth-type classification (this Blueprint did not pre-assign birth types), mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- No genuine content-overlap was found with sibling `math.disc` graph-theory entries authored this batch (`graph-coloring`, `graph-types`) — each targets a distinct structural property.
- This entry's two unlocked children (`math.disc.graph-trees`, `math.disc.euler-hamiltonian`) are not yet authored — both are natural continuations of this program's graph-theory subtree work.

## Version History
- **Batch 21** (2026-09-11): initial authoring, part 3 of 5 this batch (with `math.disc.boolean-circuits`, `math.disc.graph-coloring`, `math.disc.graph-types`, `math.disc.predicate-logic-disc`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 6 foundational, MC-2 Type 1 foundational, MC-3 Type 1 moderate) — birth types independently derived, since this Blueprint does not pre-assign them.
