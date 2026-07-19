# Teaching Blueprint: Graph Connectivity (`math.disc.graph-connectivity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.graph-connectivity` |
| name | Graph Connectivity |
| domain | Discrete Mathematics |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.disc.graph` |
| unlocks | `math.disc.graph-trees`, `math.disc.euler-hamiltonian` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a specific small graph traced by finger to find paths, before the formal definitions |
| description (KG) | A path is a sequence of distinct vertices connected by edges. A cycle is a closed path. A graph is connected if there is a path between every pair of vertices. Strongly connected (directed): path from every vertex to every other. |

## Component 1 — Learning Objectives

- LO1: Define a **path** (a sequence of DISTINCT vertices, each connected to the next by an edge) and a **cycle** (a closed path — starts and ends at the same vertex, with all other vertices distinct) — correctly distinguishing a path from a mere "walk" that might revisit vertices.
- LO2: Determine whether an undirected graph is **connected** (a path exists between EVERY pair of vertices) by direct inspection or systematic search, and correctly identify a graph as disconnected the moment even ONE pair of vertices has no connecting path.
- LO3: Distinguish **connected** (undirected graphs) from **strongly connected** (directed graphs, requiring a path from every vertex to every OTHER vertex in BOTH directions) — directly refuting the misconception that a directed graph where every vertex can reach at least one other vertex is automatically strongly connected.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph` (a graph $G=(V,E)$, vertices and edges, undirected vs. directed, and vertex degree).

## Component 3 — Core Explanation

**Paths and cycles**: a **path** in a graph is a sequence of DISTINCT vertices $v_1,v_2,\dots,v_k$ where each consecutive pair $v_i,v_{i+1}$ is joined by an edge — the "distinct" requirement means a path never revisits a vertex. A **cycle** is a special case: a CLOSED path, where the sequence starts and ends at the same vertex ($v_1=v_k$), with every OTHER vertex in between still distinct — a loop that returns to its starting point without otherwise repeating any vertex.

**Connectedness**: an undirected graph is **connected** if there exists a path between EVERY pair of vertices — no matter which two vertices you pick, you can trace a route from one to the other using the graph's edges. Verifying connectedness requires checking (or being confident, via a systematic search like breadth-first or depth-first traversal) that NO pair of vertices is unreachable from each other; a single unreachable pair is enough to make the whole graph disconnected.

**Strong connectivity for directed graphs**: in a directed graph, edges have a direction, so reachability is not automatically symmetric — just because there's a directed path FROM vertex $a$ TO vertex $b$ doesn't mean there's a path back from $b$ to $a$. A directed graph is **strongly connected** if, for EVERY pair of vertices $u,v$, there is a directed path from $u$ to $v$ AND a directed path from $v$ to $u$ — both directions must be checked, for every pair, making strong connectivity a strictly demanding requirement compared to ordinary (undirected) connectedness.

## Component 4 — Worked Examples

**Example 1 (LO1 — identifying paths and cycles)**: In a graph with vertices $\{A,B,C,D\}$ and edges $A$-$B$, $B$-$C$, $C$-$D$, $D$-$A$: the sequence $A,B,C$ is a valid PATH (distinct vertices, consecutive edges exist). The sequence $A,B,C,D,A$ is a valid CYCLE (starts and ends at $A$, all other vertices $B,C,D$ are distinct, and it's a closed loop). The sequence $A,B,A,C$ is NEITHER a path nor a cycle in the strict sense used here — it revisits vertex $A$ in the middle, violating the distinctness requirement.

**Example 2 (LO2 — determining connectedness by finding the missing pair)**: Consider a graph with vertices $\{A,B,C,D,E\}$ and edges $A$-$B$, $B$-$C$, $D$-$E$ (two separate pieces). Checking connectedness: is there a path from $A$ to $D$? Tracing all reachable vertices from $A$: $A\to B\to C$ — this reaches only $\{A,B,C\}$, never touching $D$ or $E$. Since NO path connects $A$ (or $B$ or $C$) to $D$ (or $E$), this graph is **disconnected** — confirmed by finding just this one unreachable pair, with no need to check every other pair once a single counterexample is found.

**Example 3 (LO3 — connected vs. strongly connected, breaking MC-1)**: Consider a DIRECTED graph with vertices $\{A,B,C\}$ and directed edges $A\to B$, $B\to C$, $C\to A$ (a directed cycle) — checking strong connectivity: from $A$, can you reach $B$? Yes ($A\to B$). Can you reach $C$? Yes ($A\to B\to C$). From $B$, can you reach $A$? Yes ($B\to C\to A$). Every pair is mutually reachable — this IS strongly connected. Now modify: directed edges $A\to B$, $B\to C$ only (no edge back to $A$) — from $A$, you CAN reach both $B$ and $C$ (so "every vertex can reach at least one other" looks satisfied for $A$), but from $C$, there is NO directed path back to $A$ or $B$ at all. This graph is **NOT** strongly connected, despite every vertex being able to REACH somewhere — strong connectivity demands the return path too, for every single pair.

## Component 5 — Teaching Actions

### Teaching Action A01 — Paths, Cycles, and the Distinctness Requirement (Primitive P11: Representation Shift)

Trace a path with a finger on a drawn graph, vertex by vertex, checking off each one as visited. State: "a path never revisits a vertex — the moment you'd have to step on a vertex you've already used, that's not a path anymore (unless it's the very last step closing a cycle back to the start)." Work Example 1's three sequences, sorting each into path/cycle/neither.

### Teaching Action A02 — Connectedness: One Missing Pair Is Enough (Primitive P11: Representation Shift)

Work Example 2's search directly: starting from $A$, trace every reachable vertex, and observe the search simply never reaches $D$ or $E$. State: "you don't need to check every single pair exhaustively — the moment you find ONE pair with no connecting path, the whole graph is disconnected, full stop."

### Teaching Action A03 — Strongly Connected Requires BOTH Directions, Every Pair (Primitive P28: Conflict Evidence)

Present Example 3's direct conflict: the modified directed graph ($A\to B\to C$, no return edges) where every vertex CAN reach somewhere, yet it fails strong connectivity because $C$ cannot get back to $A$ or $B$. State: "being ABLE to reach other vertices from somewhere isn't the same as EVERY pair being mutually reachable in both directions. Strong connectivity is a much stricter, symmetric requirement."

- **MC-1 hook**: ask "if every vertex in a directed graph can reach at least one other vertex, is the graph automatically strongly connected?" — a "yes" answer reveals MC-1 (believing partial or one-directional reachability from every vertex is sufficient, missing that EVERY pair must be mutually reachable in both directions).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For a graph with vertices $\{P,Q,R,S\}$ and edges $P$-$Q$, $Q$-$R$, $R$-$S$, $S$-$P$, identify one path and one cycle, explicitly listing the vertex sequence for each.
  2. For a graph with vertices $\{A,B,C,D\}$ and edges $A$-$B$, $C$-$D$ (only these two edges), determine whether the graph is connected, and justify your answer by identifying a specific unreachable pair if it is disconnected.
  3. For the directed graph with edges $A\to B$, $B\to A$, $B\to C$ (no edge from $C$ back to anywhere), determine whether it is strongly connected, identifying the specific pair that fails (if any).
  4. Explain, in your own words, why "every vertex can reach somewhere" is a weaker condition than "the graph is strongly connected," using Example 3's modified graph as your illustration.
- **P76 (Transfer Probe, mode = independence)**: "A city's one-way street network can be modeled as a directed graph, where vertices are intersections and directed edges are one-way streets. (a) Explain, in terms of connectivity, what it would mean for this street network to be 'strongly connected,' using the definition from this lesson. (b) Suppose a driver reports 'I can get from my house to the downtown area, and also to the airport, so this network must be strongly connected.' Explain what's missing from this reasoning, using the distinction highlighted in Example 3. (c) If city planners want to guarantee every location is reachable from every other location (in both directions), explain what specific property they need to verify about the ENTIRE directed graph, not just about a few sample routes."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PARTIAL-REACHABILITY-ASSUMED-SUFFICIENT-FOR-STRONG-CONNECTIVITY | Believing that every vertex being able to reach SOME other vertex (in a directed graph) is sufficient for strong connectivity, missing that EVERY pair must be mutually reachable in both directions | Foundational |
| MC-2 | PATH-DEFINITION-ALLOWS-REPEATED-VERTICES | Treating a sequence that revisits a vertex as a valid path, missing the distinctness requirement that separates a path from a general walk | Foundational |
| MC-3 | CONNECTEDNESS-VERIFIED-BY-CHECKING-ONLY-A-FEW-PAIRS | Concluding a graph is connected after checking only a small sample of vertex pairs, rather than confirming (via systematic search) that literally every pair has a connecting path | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Partial-Reachability-Sufficient-for-Strong-Connectivity Assumption") → P41 (detect: present Example 3's modified graph and ask whether it is strongly connected, given that $A$ can reach both other vertices) → P64 (conceptual shift: re-walk Example 3's direct check of $C$'s reachability back to $A$ and $B$, confirming it fails, re-anchoring on "EVERY pair, BOTH directions — not just 'can reach something'").
- **B02 (targets MC-2)**: P27 (name it: "Repeated-Vertex Path Misclassification") → P41 (detect: present the sequence $A,B,A,C$ from Example 1 and ask whether it's a valid path) → P64 (conceptual shift: re-anchor on "a path's vertices must all be distinct — the moment a vertex repeats (other than closing a cycle at the very end), it's not a path anymore").
- **B03 (targets MC-3)**: P27 (name it: "Connectedness Verified by Sampling") → P41 (detect: ask a student to determine connectedness by checking only 2-3 pairs of vertices rather than a systematic search) → P64 (conceptual shift: re-walk Example 2's systematic reachability trace from a single starting vertex, re-anchoring on "the search must confirm every vertex is reachable — sampling a few pairs can miss the one disconnected piece").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph` (the vertex/edge structure, undirected vs. directed distinction, this concept's path/connectivity definitions are built on).
- **Unlocks**: `math.disc.graph-trees` (a tree is a connected graph with no cycles, directly combining this concept's connectivity and cycle definitions), `math.disc.euler-hamiltonian` (Euler/Hamiltonian paths and circuits are specific path/cycle types requiring connectivity as a precondition).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a developing/understand tag places this at a "3 TAs + gate" tier — A01 (paths and cycles), A02 (connectedness), and A03 (strong connectivity) each target a distinct LO, appropriate for a compact concept building foundational vocabulary for the graph-theory concepts it unlocks.
- Example 3 was deliberately constructed as a MODIFICATION of its own first (strongly connected) case — removing just one directed edge — rather than introducing an unrelated new graph, so the contrast between "strongly connected" and "not strongly connected" is isolated to the single structural change (the missing return edge), maximizing the clarity of what specifically breaks strong connectivity.
- MC-1 (partial reachability mistaken for strong connectivity) was given the most teaching weight because directed-graph reachability intuitions are frequently borrowed, incorrectly, from undirected-graph experience, where "connected to something" and "part of one connected piece" feel closer to equivalent than they actually are once edge direction is introduced.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (both) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: tracing a specific small graph before formal definitions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
