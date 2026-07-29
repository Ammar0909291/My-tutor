# Teaching Blueprint: Eulerian and Hamiltonian Graphs (`math.graph.eulerian-circuit`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.eulerian-circuit` |
| name | Eulerian and Hamiltonian Graphs |
| domain | Graph Theory |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.disc.euler-hamiltonian` |
| unlocks | none |
| cross_links | `math.disc.euler-hamiltonian` |
| CPA_entry_stage | A (Abstract) — proficient learner already familiar with the Königsberg bridge problem context; this blueprint develops the full formal graph-theoretic characterizations and the hardness contrast at the abstract level |
| description (KG) | Eulerian circuits (traverse every edge exactly once): connected, all vertices even degree. Eulerian path: exactly two odd-degree vertices. Hamiltonian cycles (visit every vertex exactly once): NP-complete to decide; necessary conditions (Dirac's theorem, Ore's theorem). |

## Component 1 — Learning Objectives

- LO1: State and prove **Euler's theorem**: a connected graph has an Eulerian circuit iff every vertex has even degree; has an Eulerian path (not circuit) iff exactly two vertices have odd degree; characterize **Eulerian digraphs** (in-degree = out-degree at every vertex for an Eulerian circuit); execute Hierholzer's algorithm to construct an Eulerian circuit.
- LO2: Define a **Hamiltonian path** and **Hamiltonian cycle**; state sufficient conditions — **Dirac's theorem** ($\delta(G)\ge n/2$ implies Hamiltonian) and **Ore's theorem** ($\deg(u)+\deg(v)\ge n$ for all non-adjacent $u,v$ implies Hamiltonian) — and give examples showing these conditions are not necessary.
- LO3: Explain the fundamental **complexity asymmetry**: Eulerian circuits are decidable and constructible in $O(n+m)$; Hamiltonian cycles are NP-complete (no polynomial algorithm known); identify this as one of the sharpest examples of two structurally similar-looking problems with completely different computational difficulty.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.euler-hamiltonian` (Königsberg bridge problem, informal Eulerian path definition, Hamiltonian cycle concept). Requires familiarity with graph connectivity, degree sequence, and basic algorithmic notation. No further prerequisites.

## Component 3 — Core Explanation

**Eulerian circuits.** An **Eulerian circuit** (Euler tour) is a closed walk that traverses every edge exactly once. An **Eulerian path** traverses every edge exactly once but need not be closed.

**Euler's Theorem** (1736). A connected graph $G$ has:
- An Eulerian circuit iff every vertex has even degree.
- An Eulerian path (not circuit) iff exactly two vertices have odd degree.

Proof ($\Rightarrow$, necessity): In any closed walk, each passage through a vertex uses one entering and one leaving edge; each vertex's degree contribution per visit is 2, so every vertex has even degree. For an open path, only the two endpoints contribute an odd count (one edge used at each endpoint in unmatched fashion).

Proof ($\Leftarrow$, sufficiency): by constructive algorithm. Start at any vertex; follow edges (without repeating) until returning to the start — this forms a closed walk. Remove those edges. If any remaining component with unused edges shares a vertex with the walk, splice in a new closed walk from that vertex. Repeat. Since every vertex has even degree, every partial walk closes correctly.

**Hierholzer's Algorithm** (1873): Start at any vertex, follow unused edges to form a circuit; splice subcircuits at vertices with unused edges until all edges are used. Time: $O(n+m)$.

**Eulerian digraphs.** A connected directed graph has an Eulerian circuit iff $\text{in-deg}(v)=\text{out-deg}(v)$ for all $v$; an Eulerian path iff exactly one vertex has $\text{out-deg}-\text{in-deg}=1$ (start) and one has $\text{in-deg}-\text{out-deg}=1$ (end).

**Hamiltonian paths and cycles.** A **Hamiltonian path** visits every vertex exactly once. A **Hamiltonian cycle** is a Hamiltonian path with an edge from the last to the first vertex. Named after Hamilton's Icosian game (1857).

**Necessary conditions** (but not sufficient):
- $G$ must be connected.
- $G$ must have $n\ge3$ vertices for a Hamiltonian cycle.
- Removing any $k$ vertices leaves at most $k$ components (toughness condition).

**Sufficient conditions**:
- **Dirac's Theorem** (1952): if $n\ge3$ and $\delta(G)\ge n/2$ (minimum degree at least $n/2$), then $G$ is Hamiltonian.
- **Ore's Theorem** (1960): if for every pair of non-adjacent vertices $u,v$: $\deg(u)+\deg(v)\ge n$, then $G$ is Hamiltonian.

Both are SUFFICIENT but NOT NECESSARY: $C_n$ (cycle on $n$ vertices) has $\delta=2$ and is Hamiltonian whenever $n\ge3$, even for large $n$ where $\delta=2\ll n/2$.

**Complexity asymmetry.** Eulerian circuit: test in $O(n+m)$ (check degrees + connectivity); construct in $O(n+m)$. Hamiltonian cycle: NP-complete (Cook-Levin; also Karp 1972 listed as one of 21 NP-complete problems). No polynomial algorithm known unless P=NP. This is one of the most striking examples in combinatorics: two problems about closed walks differ only in what they traverse (edges vs. vertices) yet one is linear-time and the other is presumably intractable.

## Component 4 — Worked Examples

**Example 1 (LO1 — Euler's theorem and Hierholzer)**: $K_4$ on vertices $\{1,2,3,4\}$ ($m=6$ edges). Degree of each vertex: 3. Three odd-degree vertices — wait: $K_4$ has degree sequence $(3,3,3,3)$ — all odd. Euler's theorem: not all even → no Eulerian circuit. Exactly two odd? No — four odd-degree vertices. So no Eulerian path either. Contrast: $K_5$ has degree sequence $(4,4,4,4,4)$ — all even, $K_5$ is connected → Eulerian circuit exists. Hierholzer on $K_5$: start at 1, follow $1\to2\to3\to4\to5\to1$ (circuit 1). Splice: from 2, follow $2\to4\to1\to3\to5\to2$ — wait, edges must be unused. Execute step-by-step tracking used edges to produce a valid Euler tour of $K_5$ with all 10 edges.

**Example 2 (LO2 — Dirac's and Ore's theorems)**: Graph $G=K_{3,3}$ ($n=6$, $\delta=3$). Dirac: $\delta=3\ge6/2=3$ ✓ → $K_{3,3}$ is Hamiltonian. Exhibit a Hamiltonian cycle: $a_1\to b_1\to a_2\to b_2\to a_3\to b_3\to a_1$. Graph $H=C_5$ ($n=5$, $\delta=2$): Dirac requires $\delta\ge5/2=2.5$, so $\delta=2<2.5$ — Dirac does NOT apply. But $C_5$ is itself a Hamiltonian cycle, so Dirac's condition is not necessary. Ore for $C_5$: each pair of non-adjacent vertices (distance 2 in $C_5$) has $\deg(u)+\deg(v)=2+2=4<5=n$ — Ore also fails. Yet $C_5$ is Hamiltonian. This shows BOTH sufficient conditions can fail while the graph is Hamiltonian.

**Example 3 (LO3 — complexity asymmetry)**: Demonstrate on a bipartite graph $K_{m,n}$ with $m\ne n$: Eulerian circuit in $K_{m,n}$? Both parts need even degree, so need $m$ even AND $n$ even (each vertex in $A$ has degree $n$; each in $B$ has degree $m$). Check algorithmically in $O(n+m)$. Hamiltonian cycle in $K_{m,n}$? Necessary: $m=n$ (must alternate $A$ and $B$ vertices, so parts must be equal). But detecting whether $K_{m,n}$ with $m=n$ has a Hamiltonian cycle is trivially yes (it always does when $m=n\ge2$) — but in general graphs, this check is NP-hard. No degree condition decides Hamiltonicity for all graphs in polynomial time.

## Component 5 — Teaching Actions

### Teaching Action A01 — From Königsberg to Formal Theorem (Primitive P11: Representation Shift)

Begin with the 4-vertex multigraph of the Königsberg bridge problem (known from the prerequisite). Map each landmass to a vertex, each bridge to an edge. Ask: which vertices have odd degree? All four. Euler's theorem then says: no Eulerian path exists (need exactly 0 or 2 odd-degree vertices). Then shift to the abstract proof structure: why does even degree ensure a closed walk?

- **MC-1 hook**: ask "If a graph has exactly 4 odd-degree vertices, can we traverse all edges using two separate walks?" — Yes: by Handshaking Lemma, the number of odd-degree vertices is always even; a graph with $2k$ odd-degree vertices can be traversed using exactly $k$ edge-disjoint trails (one starting at each pair of odd-degree vertices).

### Teaching Action A02 — Sufficient Conditions That Aren't Necessary (Primitive P25: Deductive)

State Dirac's theorem. Work $K_{3,3}$ (Example 2). Then immediately show $C_5$ where Dirac fails but Hamiltonicity holds. State: "Dirac and Ore are one-way doors — they guarantee a Hamiltonian cycle when satisfied, but they cannot detect ALL Hamiltonian graphs." This is WHY Hamiltonian detection is hard: no simple degree condition is both necessary and sufficient.

- **MC-2 hook**: ask "If a graph satisfies Dirac's condition, must it also satisfy Ore's?" — Yes: if $\delta(G)\ge n/2$, then for any non-adjacent $u,v$: $\deg(u)+\deg(v)\ge 2\cdot(n/2)=n$. Ore's condition is weaker (implied by Dirac's). So Dirac ⇒ Ore but Ore ⇏ Dirac.

### Teaching Action A03 — The NP-Hard Contrast (Primitive P16: Counterexample direction — show hardness)

State that Hamiltonicity is NP-complete. Demonstrate via the 3-SAT reduction (sketch only, not required in full): encode each Boolean variable as a gadget of vertices and edges where a Hamiltonian path through the gadget corresponds to a truth assignment. Ask: "Why can't we use a degree condition to decide Hamiltonicity?" — Because the same degree sequence can correspond to both Hamiltonian and non-Hamiltonian graphs (give explicit pair: two graphs with the same degree sequence $(2,2,2,2,2,2)$ where one has a Hamiltonian cycle and one doesn't).

- **MC-3 hook**: ask "Is there a polynomial-time algorithm for Hamiltonian cycles on dense graphs (say, $m\ge cn^2$)?" — On dense graphs with $m\ge n^2/4$ (Dirac's condition follows), yes — the cycle exists and Hierholzer-like constructions work; but for sparse graphs, the problem remains NP-hard even for cubic graphs (degree 3 everywhere), one of the classic NP-hardness results.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (5-problem set)**:
  1. Determine whether the Petersen graph (10 vertices, 3-regular) has an Eulerian circuit or Eulerian path. Justify using Euler's theorem.
  2. Construct an Eulerian circuit on $K_5$ (5 vertices, 4-regular, 10 edges) using Hierholzer's algorithm. List the edges in traversal order.
  3. A connected graph has degree sequence $(2,2,3,3,4,4)$. State whether it has an Eulerian circuit, Eulerian path, both, or neither. Justify.
  4. Verify that $K_6$ satisfies Dirac's condition and exhibit a Hamiltonian cycle in $K_6$.
  5. Give a graph on 6 vertices that is Hamiltonian but does NOT satisfy Dirac's condition. (Dirac requires $\delta\ge3$; find a Hamiltonian graph with $\delta\le2$.)
- **P76 (Transfer Probe, mode = cross-link with `math.disc.euler-hamiltonian`)**: "The **Chinese Postman Problem** asks for the shortest closed walk traversing every edge at least once in a weighted graph. (a) Show that if $G$ is Eulerian, the Chinese Postman tour has weight equal to the total weight of all edges (no edges need to be repeated). (b) If $G$ has $2k$ odd-degree vertices, the Chinese Postman solution requires adding $k$ extra traversals to make all vertices even-degree. Explain why the optimal solution pairs up the $2k$ odd-degree vertices into $k$ pairs and adds the shortest path between each pair (this is the **minimum-weight perfect matching on odd-degree vertices**, solvable in polynomial time). (c) Contrast with the **Travelling Salesman Problem** (TSP): find the shortest Hamiltonian cycle in a complete weighted graph. Explain why TSP is NP-hard while the Chinese Postman Problem is polynomial, even though both involve closed walks."
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Eulerian and Hamiltonian Graphs — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EULERIAN-CIRCUIT-REQUIRES-EVEN-NUMBER-OF-EDGES | Believing Eulerian circuits require an even number of edges rather than the correct condition that every vertex has even degree; the number of edges can be odd (e.g., the Petersen graph has 15 edges and is 3-regular, so all vertices have odd degree — no Eulerian circuit — but 15 is odd by coincidence of a separate property) | Moderate |
| MC-2 | DIRAC-IMPLIES-HAMILTONICITY-IS-NECESSARY | Confusing the direction: believing Dirac's condition is NECESSARY for Hamiltonicity (i.e., every Hamiltonian graph satisfies Dirac) rather than only SUFFICIENT (Dirac is enough, but not needed); $C_n$ for large $n$ has $\delta=2\ll n/2$ yet is Hamiltonian | Critical |
| MC-3 | HAMILTONICITY-IS-EASY-ON-DENSE-GRAPHS-IN-GENERAL | Believing that all Hamiltonian problems are polynomial on dense graphs; while SUFFICIENT-CONDITION problems (does this graph satisfy Dirac?) are trivially polynomial, deciding Hamiltonicity remains hard for general graphs even with specific density constraints not meeting Dirac | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Eulerian Circuits Depend on Vertex Degrees, Not Edge Counts") → P41 (detect: present $K_4$ (4 vertices, 6 edges, degree 3 each): ask whether it has an Eulerian circuit — no, because degrees are odd; 6 is even but all vertices have odd degree) → P64 (conceptual shift: the Handshaking Lemma guarantees an even total degree sum, hence an even number of edge-degree-pairings; but individual vertex degrees can be anything; Euler's theorem checks individual vertex parity, not total edges; a graph with all even degrees can have any number of edges).
- **B02 (targets MC-2)**: P27 (name it: "Dirac's Condition Is Sufficient, Not Necessary") → P41 (detect: ask whether $C_7$ (7-cycle, $\delta=2$, $n=7$) is Hamiltonian — yes, it IS the Hamiltonian cycle; does $C_7$ satisfy Dirac? $\delta=2<7/2=3.5$ — no) → P64 (conceptual shift: Dirac's theorem says "if $\delta\ge n/2$, then Hamiltonian"; the converse "if Hamiltonian, then $\delta\ge n/2$" is FALSE; sufficient conditions are one-way implications; the difficulty of Hamiltonicity is precisely that no simple condition is both necessary and sufficient).
- **B03 (targets MC-3)**: P27 (name it: "Hamiltonicity Is Hard Even for Some Dense Graphs") → P41 (detect: ask whether the following is true: "any graph with $m\ge n^2/4$ edges is Hamiltonian" — this IS true by Turán-type arguments and Ore's theorem; but ask whether deciding Hamiltonicity for a graph with, say, $m=n^2/5$ edges is polynomial — no, the problem remains NP-hard for graphs not meeting the Dirac/Ore thresholds) → P64 (conceptual shift: "dense" is a spectrum; once a graph is dense ENOUGH — specifically meeting Ore's condition — the polynomial sufficient condition kicks in; below that threshold, no efficient decision procedure is known; "dense but not enough" graphs fall in the hard zone).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.euler-hamiltonian` (Königsberg bridge problem, informal Eulerian path context).
- **Unlocks**: none listed in the KG.
- **Cross-link**: `math.disc.euler-hamiltonian` (verified on disk) → P76 uses cross-link probe mode.

## Component 8 — Teaching Notes

- The Euler/Hamilton complexity contrast is one of the most pedagogically powerful examples in all of discrete mathematics: two problems that look nearly identical (closed walks covering everything) differ dramatically in difficulty. Establishing this contrast clearly — and not just mentioning it — is the primary teaching goal of this blueprint beyond the technical content.
- Hierholzer's algorithm should be worked on paper for a small example ($K_5$ or a 6-vertex Eulerian graph); students who can only state the degree condition but cannot construct the tour have not achieved the apply-level Bloom target.
- The Chinese Postman transfer probe is the canonical real-world application of Eulerian theory (mail delivery, road inspection, DNA sequencing) and directly contrasts with TSP (the Hamiltonian analogue). This probe is pedagogically aligned: both are "traversal" problems on weighted graphs, yet one is polynomial and the other is NP-hard.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.euler-hamiltonian`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.euler-hamiltonian` EXISTS → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01–A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 5 problems | PASS (MAMR = 5/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link with `math.disc.euler-hamiltonian`) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: proficient, formal characterization theorems and algorithmic complexity arguments) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires constructing an Euler tour by algorithm, verifying degree conditions, exhibiting a Hamiltonian graph that violates Dirac, and connecting TSP/Chinese Postman — not listing theorem statements | PASS |
