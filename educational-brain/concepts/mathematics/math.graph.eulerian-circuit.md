# math.graph.eulerian-circuit — Eulerian and Hamiltonian Graphs (Euler's Theorem, Hierholzer's Algorithm, the Complexity Contrast)

## Identity
- **KG ID:** `math.graph.eulerian-circuit`
- **Domain:** math.graph (Graph Theory)
- **Requires:** `math.disc.euler-hamiltonian`
- **Unlocks:** none
- **Cross-links:** `math.disc.euler-hamiltonian` (already authored — see Blueprint References)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) state and justify Euler's theorem (a connected graph has an Eulerian circuit iff every vertex has even degree; an Eulerian path iff exactly two vertices have odd degree), extend it to Eulerian digraphs, and execute Hierholzer's algorithm to construct an Eulerian circuit; (2) define Hamiltonian paths and cycles, and state Dirac's and Ore's theorems as SUFFICIENT (not necessary) conditions; (3) explain the fundamental complexity asymmetry between Eulerian circuits (linear-time decidable and constructible) and Hamiltonian cycles (NP-complete) as one of the sharpest contrasts in combinatorics between two structurally similar-looking problems.

## Core Understanding
`math.disc.euler-hamiltonian` established the Königsberg bridge problem and an informal degree-based test for Eulerian paths, plus the basic Hamiltonian cycle concept and its NP-completeness. This concept develops the FULL formal machinery on both sides and sharpens the complexity contrast between them.

EULER'S THEOREM (1736): a connected graph has an Eulerian circuit (a closed walk traversing every edge exactly once) iff every vertex has EVEN degree; it has an Eulerian path (not closed) iff exactly TWO vertices have ODD degree. The necessity direction follows directly from degree-counting: each passage through a vertex in a closed walk uses one entering and one leaving edge, contributing 2 to that vertex's degree per visit, so every vertex ends with even degree; an open path's two endpoints each contribute one unmatched edge, giving exactly two odd-degree vertices. The sufficiency direction is CONSTRUCTIVE: HIERHOLZER'S ALGORITHM (1873) starts at any vertex, follows unused edges to form a closed walk, then splices in sub-circuits at any vertex still holding unused edges, repeating until every edge is used — because every vertex has even degree, every partial walk closes correctly, and the algorithm runs in $O(n+m)$ time. For DIRECTED graphs, a connected digraph has an Eulerian circuit iff in-degree equals out-degree at every vertex.

HAMILTONIAN paths and cycles visit every VERTEX exactly once (contrast: Eulerian visits every EDGE exactly once). No clean iff-characterization is known — determining Hamiltonian cycle existence is NP-complete in general. Two useful SUFFICIENT conditions exist: DIRAC'S THEOREM ($\delta(G)\ge n/2\Rightarrow$ Hamiltonian) and ORE'S THEOREM ($\deg(u)+\deg(v)\ge n$ for every non-adjacent pair $\Rightarrow$ Hamiltonian). Both are sufficient but NOT necessary: a cycle graph $C_n$ has $\delta=2$, far below $n/2$ for large $n$, yet is itself a Hamiltonian cycle.

The COMPLEXITY ASYMMETRY is the sharpest lesson here: testing and constructing an Eulerian circuit takes $O(n+m)$ time (check degrees, run Hierholzer's), while deciding Hamiltonian cycle existence is NP-complete, with no known polynomial algorithm. Two problems that LOOK nearly identical — closed walks covering everything — differ only in whether they traverse edges or vertices, yet one is linear-time and the other is presumably intractable.

## Mental Models
1. **Rung 1 — Euler's theorem is an EXACT iff-test via degree parity, requiring no tracing attempt.** Existence is answered by counting, not by trial-and-error construction.
2. **Rung 2 — the number of odd-degree vertices is always EVEN (Handshaking Lemma), so a graph with $2k$ odd-degree vertices can be covered by exactly $k$ edge-disjoint trails, never an odd number.**
3. **Rung 3 — Dirac's and Ore's theorems are one-way doors: satisfied $\Rightarrow$ Hamiltonian, but failing them proves NOTHING about non-existence.** They guarantee a broad useful class of graphs, without solving the general problem.
4. **Rung 4 — Eulerian and Hamiltonian existence are LOGICALLY INDEPENDENT properties that happen to sound similar, with a genuine complexity-class gap between deciding them** ($O(n+m)$ vs. NP-complete) — the sharpest structural lesson in this entry.

## Why Students Fail
Having just learned an informal, tracing-based approach to Eulerian paths in the prerequisite concept, students can persist in believing existence must be VERIFIED by attempting a trace, rather than trusting the degree-parity iff-test to answer the question outright — this is compounded by Hierholzer's algorithm itself being a construction procedure, which can blur the line between "proving existence" (the degree test alone suffices) and "producing the actual circuit" (Hierholzer's is needed only for the latter). Dirac's and Ore's theorems, stated as clean if-then implications, are easily read backward: a graph failing the degree threshold is assumed to lack a Hamiltonian cycle, when the theorems say nothing about that direction at all. Finally, because Eulerian and Hamiltonian properties are named so similarly and both concern "visiting everything exactly once," students often assume one property implies constraints on the other, missing that a graph can be Eulerian without being Hamiltonian, Hamiltonian without being Eulerian, or both, or neither — with no logical dependency running either direction.

## Misconceptions

### MC-1: EULERIAN-CIRCUIT-REQUIRES-EVEN-NUMBER-OF-EDGES
- **Birth type:** Type 4 (notation-induced) — moderate (per this Blueprint's own classification, independently confirmed)
- **Description:** Believing Eulerian circuits require an EVEN NUMBER OF EDGES overall, rather than the correct vertex-by-vertex condition that every individual vertex has even degree.
- **Why this birth type:** Notation-induced: the Handshaking Lemma's own statement, $\sum\deg(v)=2m$, prominently features the number 2 alongside the edge count $m$, and this visual proximity invites conflating "the total is even" (always true, trivially, since it's $2m$) with the actual, stronger per-vertex requirement Euler's theorem demands.
- **Detection probe:** "If a graph has 6 edges (an even number), does it necessarily have an Eulerian circuit?" A student with MC-1 answers "yes" without checking individual vertex degrees.
- **Repair:** Present $K_4$ (4 vertices, 6 edges — an even edge count — but every vertex has degree 3, odd): no Eulerian circuit exists despite the even edge total, because the per-vertex parity fails.
- **Verification of death:** Given a graph with an even edge count but at least one odd-degree vertex, the student correctly identifies that no Eulerian circuit exists.

### MC-2: DIRAC-IMPLIES-HAMILTONICITY-IS-NECESSARY
- **Birth type:** Type 4 (notation-induced) — critical (per this Blueprint's own classification, independently confirmed)
- **Description:** Confusing the direction of Dirac's theorem — believing the degree condition is NECESSARY for Hamiltonicity (every Hamiltonian graph must satisfy it), rather than only SUFFICIENT.
- **Why this birth type:** Notation-induced: the theorem's if-then phrasing ("if $\delta\ge n/2$, then Hamiltonian") is a single directional implication, and without deliberate emphasis on that directionality, the compact statement is easy to misread as a biconditional test rather than a one-way guarantee.
- **Detection probe:** "A cycle graph $C_7$ has minimum degree 2, well below $n/2=3.5$. Is $C_7$ Hamiltonian?" A student with MC-2 answers "no" (since Dirac's condition fails), missing that $C_7$ IS itself a Hamiltonian cycle.
- **Repair:** Directly verify $C_n$ for any $n$: it is trivially Hamiltonian (it IS a Hamiltonian cycle by definition) while having $\delta=2$, arbitrarily far below $n/2$ for large $n$ — a graph can be Hamiltonian while badly failing Dirac's sufficient condition.
- **Verification of death:** Given a graph that fails Dirac's condition, the student states that this proves NOTHING about Hamiltonicity, and checks existence by some other means rather than concluding non-existence.

### MC-3: EULERIAN-IMPLIES-HAMILTONIAN
- **Birth type:** Type 6 (analogy overextension) — moderate (per this Blueprint's own classification, independently confirmed, and directly matching this cross-link's Blueprint-source EB entry `math.disc.euler-hamiltonian`'s own MC-3 of the identical name)
- **Description:** Conflating Eulerian circuits with Hamiltonian cycles as essentially the same kind of property, missing their logical independence and the deep complexity-class gap between them.
- **Why this birth type:** An overextension of the surface-level similarity between the two definitions ("visit every X exactly once, return to start") — the analogy between edges and vertices as interchangeable "things to visit once" is a reasonable first guess that breaks down once the actual logical and computational relationship is examined.
- **Detection probe:** "If a graph has an Eulerian circuit, must it also have a Hamiltonian cycle?" A student with MC-3 answers "yes" or hesitates without a clear counterexample in mind.
- **Repair:** Construct an explicit counterexample: a graph that is Eulerian but not Hamiltonian (e.g. two triangles sharing a single vertex — every vertex has even degree, so it's Eulerian, but the shared vertex would need to be visited twice in any cycle covering both triangles, so no Hamiltonian cycle exists).
- **Verification of death:** Given a graph, the student checks Eulerian and Hamiltonian properties INDEPENDENTLY, using the appropriate test for each, without assuming one property constrains the other.

## Analogies
1. **The mail-carrier-vs-tourist analogy.** An Eulerian circuit is like a mail carrier who must deliver to every street (edge) exactly once, retracing intersections (vertices) as needed; a Hamiltonian cycle is like a tourist who must visit every neighborhood (vertex) exactly once, using whichever streets connect them — genuinely different tasks with genuinely different difficulty.
2. **The checklist-vs-treasure-hunt analogy (targets MC-2).** Dirac's theorem is like a checklist that GUARANTEES success if every box is checked ("if every vertex is well-connected enough, you WILL find a Hamiltonian cycle") — but failing to check every box doesn't mean failure; it just means you need to search for the treasure directly instead of relying on the guaranteed shortcut.

## Demonstrations
### Demonstration 1 — Euler's theorem and Hierholzer's algorithm (mirrors Blueprint Ex1)
$K_4$ on $\{1,2,3,4\}$: every vertex has degree 3 (odd), and there are FOUR odd-degree vertices (not zero, not two) — by Euler's theorem, no Eulerian circuit and no Eulerian path exist. Contrast: $K_5$ has degree sequence $(4,4,4,4,4)$ — all even — and is connected, so an Eulerian circuit exists. Running Hierholzer's algorithm from vertex 1: trace a closed walk using unused edges, splicing in sub-circuits at any vertex with remaining unused edges, until all 10 edges of $K_5$ are used exactly once.

### Demonstration 2 — Dirac's and Ore's theorems, breaking MC-2 (mirrors Blueprint Ex2)
$K_{3,3}$ ($n=6$, $\delta=3$): Dirac's condition $\delta\ge n/2=3$ holds exactly, guaranteeing a Hamiltonian cycle — exhibited directly: $a_1{-}b_1{-}a_2{-}b_2{-}a_3{-}b_3{-}a_1$. Contrast: $C_5$ ($n=5$, $\delta=2$) fails Dirac ($2<2.5$) AND fails Ore (each non-adjacent pair sums to $2+2=4<5$), yet $C_5$ IS a Hamiltonian cycle by construction — both sufficient conditions can fail on a graph that is still Hamiltonian.

### Demonstration 3 — the complexity asymmetry (mirrors Blueprint Ex3)
For $K_{m,n}$: Eulerian circuit existence requires BOTH $m$ and $n$ even (checkable in $O(n+m)$ by direct degree count). Hamiltonian cycle existence in $K_{m,n}$ requires $m=n$ (parts must alternate) — trivially checkable HERE, but the general Hamiltonian-cycle-detection problem for arbitrary graphs remains NP-hard; no degree-based test decides Hamiltonicity in polynomial time for all graphs, in sharp contrast to Euler's clean, universal, linear-time criterion.

## Discovery Questions
1. "A graph has 4 odd-degree vertices. Handshaking guarantees this count is always even — so can you cover all its edges using more than one trail? How many trails would you need?"
2. "A cycle graph $C_{100}$ has minimum degree 2, far below $100/2=50$. Does Dirac's theorem tell you $C_{100}$ is NOT Hamiltonian? Is $C_{100}$ actually Hamiltonian?"
3. "If a graph has an Eulerian circuit (every edge visited once, returning to start), does that constrain whether it also has a Hamiltonian cycle (every vertex visited once, returning to start)? Can you think of a small graph that is one but not the other?"

## Teaching Sequence
Best taught by **direct instruction establishing Euler's theorem as an exact test FIRST, before any Hamiltonian content** — the degree-parity criterion is a precise theorem best presented directly and then applied; the Hamiltonian side benefits from the discovery questions surfacing the "failing a sufficient condition proves nothing" intuition before the theorems are stated formally.
1. Recall the Königsberg problem informally, then formalize Euler's theorem and work Demonstration 1's contrast, posing Discovery Question 1 on the odd-vertex-count structure.
2. Introduce Hierholzer's algorithm as the constructive half, distinct from the existence test.
3. Introduce Dirac's and Ore's theorems via Demonstration 2, posing Discovery Question 2 before revealing $C_5$'s counterexample.
4. Establish the complexity asymmetry via Demonstration 3, posing Discovery Question 3 before confirming Eulerian/Hamiltonian independence.
5. Assess with the P77 problem set and the Chinese Postman / TSP transfer probe.

## Tutor Actions
1. **On Eulerian existence:** always require the student to answer via the degree-parity TEST first, separately from any request to actually construct the circuit via Hierholzer's algorithm.
2. **On Dirac's/Ore's theorems:** explicitly ask "does failing this condition tell you anything?" every time a graph fails the threshold, to prevent the necessary/sufficient confusion from going unaddressed.
3. **On any Eulerian-vs-Hamiltonian question:** require the student to check each property independently, using its own specific test, rather than inferring one from the other.

## Voice Teaching Notes
1. **Register:** proficient/applied — this concept assumes familiarity with the Königsberg context and develops formal theorem statements plus an algorithmic construction; comfortable with symbolic degree notation.
2. **Load-bearing sentence, spoken slowly:** "Failing Dirac's condition tells you nothing at all — it simply means you have to look some other way."
3. **Wait time:** pause after Discovery Question 2, letting the student sit with the apparent contradiction of a "well-connected-sounding" cycle graph failing a sufficient condition before revealing why that's expected.

## Assessment Signals
1. **Gate concept:** correctly applies Euler's theorem to determine Eulerian circuit/path existence for a novel graph via degree parity alone.
2. **Construction fluency:** correctly executes Hierholzer's algorithm to construct an actual Eulerian circuit on a small graph.
3. **Sufficient-not-necessary reasoning:** correctly states that failing Dirac's or Ore's condition proves nothing about Hamiltonicity, and identifies at least one Hamiltonian graph failing both.
4. **Complexity-asymmetry articulation:** correctly explains why Eulerian circuit detection is linear-time while Hamiltonian cycle detection is NP-complete, despite the superficial similarity of the two problems.
5. **Transfer:** connects the complexity asymmetry to the Chinese Postman Problem (polynomial) vs. Traveling Salesman Problem (NP-hard) distinction.

## Tutor Recovery Strategy
If the student insists on tracing to verify Eulerian existence, work several examples where the degree-parity test alone answers the question correctly and quickly, before ever attempting a trace, until the test's sufficiency becomes trusted. If the student misreads Dirac's/Ore's direction, work the $C_n$-for-large-$n$ example repeatedly (a graph that is Hamiltonian while badly failing both sufficient conditions) until the one-way nature is automatic. If the student conflates Eulerian and Hamiltonian properties, have them construct or examine graphs in all four combinations (Eulerian-and-Hamiltonian, Eulerian-not-Hamiltonian, Hamiltonian-not-Eulerian, neither) until the independence is concrete.

## Memory Hooks
1. "Count degrees, don't trace — Euler's theorem answers existence by parity alone."
2. "Failing Dirac's test tells you nothing — it's a one-way guarantee, not a two-way test."
3. "Eulerian visits every EDGE once; Hamiltonian visits every VERTEX once — genuinely different problems, genuinely different difficulty."

## Transfer Connections
- **`math.disc.euler-hamiltonian`:** the Königsberg problem, informal Eulerian path definition, and basic Hamiltonian cycle concept this entry formalizes into Euler's theorem, Hierholzer's algorithm, Dirac's/Ore's theorems, and the sharpened complexity contrast — cross-linked directly (see Blueprint References).
- **`math.graph.hamiltonian-cycle`:** develops Dirac's theorem in substantially greater depth (the sufficient-not-necessary structure as its own dedicated focus) and extends to the Traveling Salesman Problem — this entry's Hamiltonian content is deliberately kept at introductory breadth, with the deeper treatment owned there (see that entry's own Blueprint References for the explicit division of labor).
- **`math.graph.graph-connectivity`:** connectivity is a prerequisite condition for Euler's theorem (stated for connected graphs) and for Hamiltonian cycle existence generally.

## Cross-Subject Connections
- **Computer Science (Chinese Postman Problem, DNA sequencing):** Eulerian circuit theory directly underlies mail-route/road-inspection optimization (Chinese Postman) and genome assembly algorithms (De Bruijn graph Eulerian paths).
- **Operations Research (Traveling Salesman Problem):** Hamiltonian cycle theory is the foundation of TSP, one of the most studied NP-hard optimization problems in logistics and routing.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.graph.eulerian-circuit.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on the Chinese Postman Problem vs. TSP). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions independently confirmed against this program's own taxonomy: MC-1 Type 4, MC-2 Type 4, MC-3 Type 6 (MC-3 matches the identically-named misconception already registered in the prerequisite `math.disc.euler-hamiltonian` entry, cited there directly rather than re-derived).
- Cross-link: `docs/curriculum/blueprints/math.disc.euler-hamiltonian.md` — the sibling foundational Blueprint this concept's own Blueprint explicitly builds on. Its already-authored EB entry, `educational-brain/concepts/mathematics/math.disc.euler-hamiltonian.md`, was read directly to ground this entry's Transfer Connections and MC-3's cross-reference (that entry owns the informal Königsberg-problem framing and the same MC-3 misconception at introductory depth; this entry owns the full formal theorem statements, Hierholzer's algorithm, Dirac's/Ore's theorems, and the sharpened complexity-class contrast).
- **Genuine content-overlap identified and handled by division of labor, not duplication**: this Blueprint's own survey of Dirac's theorem (Learning Objective 2, Example 2) substantially overlaps `math.graph.hamiltonian-cycle`'s own Blueprint, which develops the identical theorem (using the SAME wheel-graph and $C_5$/$P_4$-family examples) in far greater depth as its primary focus. This entry deliberately keeps its own Dirac's/Ore's treatment at introductory breadth (establishing both theorems exist and are sufficient-not-necessary) and defers the deeper sufficient-not-necessary argument structure, the TSP extension, and the wheel-graph running example to that concept — see this entry's own Transfer Connections note above.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- The genuine content-overlap with `math.graph.hamiltonian-cycle`'s own Dirac's-theorem treatment (both Blueprints independently develop the identical theorem, one at introductory breadth and one in depth) is a Blueprint-level authoring artifact from the external Curriculum Production Pipeline — recorded here and cross-referenced in Transfer Connections, not fixed, per this program's standing scope (it does not author or modify Blueprints).

## Version History
- **Batch 25** (2026-09-12): initial authoring, part 2 of 4 this batch (with `math.graph.connectivity`, `math.graph.hamiltonian-cycle`, `math.graph.graph-coloring`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 4 moderate, MC-2 Type 4 critical, MC-3 Type 6 moderate — all confirming the Blueprint's own implicit classification, MC-3 additionally cross-referenced to the identically-named misconception in `math.disc.euler-hamiltonian`).
