# Teaching Blueprint: Extremal Graph Theory (`math.graph.extremal-graph-theory`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.extremal-graph-theory` |
| name | Extremal Graph Theory |
| domain | Graph Theory |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.5 → MAMR = ⌈0.5×5⌉ = 3/5 |
| estimated_hours | 8 |
| requires | `math.graph.graph`, `math.disc.combinatorics` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — constructing the Turán graph for one small specific case before naming the general theorem |
| description (KG) | Turán's theorem: the maximum edges in an $n$-vertex $K_{r+1}$-free graph is $\mathrm{ex}(n,K_{r+1})=(1-1/r)n^2/2$, achieved by the Turán graph $T(n,r)$. Szemerédi Regularity Lemma: every dense graph can be decomposed into quasi-random bipartite parts.
 |

## Component 1 — Learning Objectives

- LO1: State Turán's theorem: the MAXIMUM number of edges in an $n$-vertex graph containing NO $K_{r+1}$ (complete graph on $r+1$ vertices) as a subgraph is $\mathrm{ex}(n,K_{r+1})=(1-1/r)n^2/2$ — recognizing this as an EXTREMAL question, combining `math.graph.graph`'s own edge-counting ($m=|E|$) with a FORBIDDEN-SUBSTRUCTURE constraint, and asking for the extreme (maximum) value achievable under that constraint.
- LO2: Construct the TURÁN GRAPH $T(n,r)$ (partition $n$ vertices into $r$ nearly-equal parts, connect all pairs of vertices in DIFFERENT parts, none WITHIN the same part) for a small case, verify it is genuinely $K_{r+1}$-FREE, and count its edges to confirm it ACHIEVES the extremal bound — recognizing the theorem's construction as CONCRETE and verifiable, not merely an abstract existence claim.
- LO3 (orientation level — full Szemerédi Regularity Lemma proof deferred): recognize, without full derivation, that the Szemerédi Regularity Lemma addresses a DIFFERENT kind of extremal question — not "how many edges can avoid a substructure" but "how STRUCTURED must ANY sufficiently dense graph be" — guaranteeing every dense graph decomposes into quasi-random bipartite pieces, previewing this as a foundational STRUCTURAL tool (not itself a specific edge-count formula) underlying much of modern extremal graph theory.

## Component 2 — Prerequisite Check

Assumes mastery of `math.graph.graph` ($G=(V,E)$, order $n=|V|$, size $m=|E|$, degree, the handshaking lemma) and `math.disc.combinatorics` (counting, arrangement, combination techniques).

## Component 3 — Core Explanation

**Turán's theorem answers a genuine extremal question — maximize edges subject to a forbidden-subgraph constraint**: `math.graph.graph` already lets you COUNT a graph's edges ($m=|E|$). Turán's theorem asks a genuinely EXTREMAL (optimization) question built on top of this: among ALL $n$-vertex graphs that AVOID containing $K_{r+1}$ as a subgraph (no $r+1$ mutually-adjacent vertices), what is the LARGEST possible edge count? The answer, $(1-1/r)n^2/2$, is not merely a bound — it is the EXACT maximum, achieved by a specific, explicitly constructible graph.

**The Turán graph $T(n,r)$ concretely achieves the bound, verifiably**: $T(n,r)$ partitions the $n$ vertices into $r$ groups (as evenly as possible) and connects EVERY pair of vertices in DIFFERENT groups, but NO pair within the SAME group (a "complete $r$-partite" graph). This graph is $K_{r+1}$-FREE by construction: any set of $r+1$ vertices must include TWO from the SAME group (pigeonhole, since there are only $r$ groups), and those two are NOT connected — so no $(r+1)$-clique can exist. Counting its edges directly VERIFIES it achieves the theorem's stated maximum — the theorem's content is BOTH the upper bound (no $K_{r+1}$-free graph can have MORE edges) AND the explicit achievability (this specific construction reaches that bound exactly).

**The Regularity Lemma addresses a different, structural question (orientation level)**: rather than asking "how many edges can avoid a specific forbidden subgraph," the Szemerédi Regularity Lemma asks "how STRUCTURED must EVERY sufficiently dense graph be" — it guarantees that ANY dense enough graph's vertex set can be partitioned into a BOUNDED number of parts such that the edges BETWEEN most pairs of parts behave "quasi-randomly" (like a random bipartite graph of the same density). This is a fundamentally different KIND of extremal-flavored result — not a specific numerical bound like Turán's theorem, but a general STRUCTURAL decomposition tool, widely used as a foundational technique underlying many OTHER extremal graph theory results. Full derivation is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — Turán's theorem as a genuine extremal optimization, breaking MC-1)**: for $n=6$, $r=2$ (forbidding $K_3$, i.e. triangles): Turán's theorem states the maximum triangle-free edge count is $(1-1/2)(6)^2/2=\frac12\cdot36/2=9$. This is a genuine CLAIM to verify: is $9$ really the MOST edges a $6$-vertex triangle-free graph can have, with no triangle-free graph on $6$ vertices exceeding it? The theorem asserts YES — this specific number is both an upper bound and (as Example 2 will verify) achievable.

**Example 2 (LO2 — constructing $T(6,2)$ and verifying it achieves the bound, breaking MC-2)**: for $n=6$, $r=2$: $T(6,2)$ splits the $6$ vertices into $2$ groups of $3$ each (say $\{A,B,C\}$ and $\{D,E,F\}$), connecting EVERY vertex in the first group to EVERY vertex in the second (a complete bipartite graph $K_{3,3}$), with NO edges WITHIN either group. Counting edges: $3\times3=9$ — EXACTLY matching Example 1's claimed maximum. Verifying $K_3$-freeness: any triangle would need $3$ mutually-adjacent vertices, but any $2$ vertices from the SAME group are non-adjacent — so no triangle can form using $2$ or more vertices from one group, and using vertices from BOTH groups (at most $2$ from a bipartite structure without same-side edges) can't complete a $3$-cycle either. This CONCRETE construction, not merely an abstract argument, achieves the theorem's stated maximum exactly.

**Example 3 (LO3, orientation level — the Regularity Lemma as a structural tool, breaking MC-3)**: contrast Turán's theorem (a PRECISE numerical answer: "the maximum is EXACTLY $(1-1/r)n^2/2$") against the Regularity Lemma's claim (a QUALITATIVE structural guarantee: "ANY sufficiently dense graph's vertices can be partitioned so that MOST inter-part edge densities look quasi-random"). For a specific dense graph (say, a random-like graph with $n=1000$ vertices and roughly half of all possible edges present), the Regularity Lemma guarantees SOME partition into a bounded number of parts exists with this quasi-random property — but, unlike Turán's theorem's exact formula, it does NOT hand you a specific edge count or an explicit construction; it is used as a foundational LEMMA, invoked as a tool WITHIN the proofs of many other extremal results, rather than being itself a direct numerical answer to a specific extremal question.

## Component 5 — Teaching Actions

### Teaching Action A01 — Turán's Theorem Is a Genuine Extremal Optimization Question (Primitive P11: Representation Shift)

State: "you already know how to count a graph's edges — Turán's theorem asks the genuinely NEW question of maximizing that count, subject to a forbidden-subgraph constraint, and gives you the EXACT answer." Walk Example 1's direct computation of the claimed maximum for $n=6,r=2$.

- **MC-1 hook**: ask "is Turán's theorem simply restating `math.graph.graph`'s own edge-counting definition, without asking any genuinely new optimization question?" — a "yes" answer reveals MC-1 (missing that Turán's theorem answers a genuine extremal — maximization subject to a constraint — question).

### Teaching Action A02 — The Turán Graph Concretely Achieves the Bound, Verifiably (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $T(6,2)$'s edge count ($9$) was computed directly and matched Example 1's claimed maximum EXACTLY, and its triangle-freeness was verified structurally, not merely asserted. State: "Turán's theorem isn't just an abstract upper bound — the Turán graph construction concretely ACHIEVES it, in a way you can build and verify by hand."

- **MC-2 hook**: ask "does Turán's theorem only establish an abstract upper bound, without providing any concrete graph that actually achieves it?" — a "yes" answer reveals MC-2 (missing that the Turán graph is an explicit, verifiable construction achieving the bound exactly).

### Teaching Action A03 — The Regularity Lemma Answers a Fundamentally Different Kind of Question (Primitive P06: Contrast Pair)

Contrast Turán's theorem's PRECISE numerical formula (Examples 1–2) against the Regularity Lemma's QUALITATIVE structural guarantee (Example 3, no specific numbers, no explicit construction, used as a tool within other proofs). State: "these aren't two versions of the same kind of result — Turán's theorem gives you an exact number and an explicit construction; the Regularity Lemma gives you a structural guarantee used as machinery inside other proofs, not a direct numerical answer."

- **MC-3 hook**: ask "is the Szemerédi Regularity Lemma essentially another precise numerical formula, like Turán's theorem, just for a different forbidden subgraph?" — a "yes" answer reveals MC-3 (missing that the Regularity Lemma is a qualitative structural decomposition tool, not a specific numerical extremal formula).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute Turán's theorem's maximum edge count for $n=9$, $r=3$ (forbidding $K_4$).
  2. Construct the Turán graph $T(9,3)$ (three groups of 3), and count its edges to verify it matches your answer to problem 1.
  3. Verify $T(9,3)$ is $K_4$-free, explaining the pigeonhole argument.
  4. Explain, in one or two sentences, how the Szemerédi Regularity Lemma's TYPE of conclusion differs from Turán's theorem's type of conclusion.
- **P76 (Transfer Probe, mode = independence)**: "A network engineer designs a communication network with $n=12$ nodes, and for reliability reasons, no group of 4 nodes should be FULLY interconnected (no $K_4$ subgraph, to avoid a single point of catastrophic redundancy failure), while maximizing the total number of direct connections. (a) Using Turán's theorem, compute the maximum number of connections achievable under this constraint. (b) Construct the corresponding Turán graph structure ($T(12,3)$) explicitly, describing how the 12 nodes should be grouped and connected. (c) A colleague suggests using the Szemerédi Regularity Lemma instead to directly compute this maximum connection count — explain why this would be the wrong tool, citing the difference between Turán's theorem's precise numerical answer and the Regularity Lemma's qualitative structural guarantee."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TURAN-THEOREM-ASSUMED-MERE-EDGE-COUNTING | Believing Turán's theorem simply restates edge-counting without asking a genuinely new optimization question, missing that it answers a genuine extremal (maximization-under-constraint) question | Foundational |
| MC-2 | TURAN-BOUND-ASSUMED-MERELY-ABSTRACT | Believing Turán's theorem only establishes an abstract upper bound with no concrete achieving construction, missing that the Turán graph explicitly achieves it | High |
| MC-3 | REGULARITY-LEMMA-ASSUMED-ANOTHER-NUMERICAL-FORMULA | Believing the Szemerédi Regularity Lemma is essentially another precise numerical formula like Turán's theorem, missing that it is a qualitative structural decomposition tool | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Turán Theorem Assumed Mere Edge Counting") → P41 (detect: ask whether Turán's theorem simply restates edge-counting) → P64 (conceptual shift: re-walk Example 1's genuine maximization framing, re-anchoring on "a genuine extremal question, maximization subject to a constraint").
- **B02 (targets MC-2)**: P27 (name it: "Turán Bound Assumed Merely Abstract") → P41 (detect: ask whether the bound is merely abstract with no achieving construction) → P64 (conceptual shift: re-walk Example 2's explicit $T(6,2)$ construction and verification, re-anchoring on "the Turán graph explicitly achieves the bound").
- **B03 (targets MC-3)**: P27 (name it: "Regularity Lemma Assumed Another Numerical Formula") → P41 (detect: ask whether the Regularity Lemma is another precise numerical formula) → P64 (conceptual shift: re-walk Example 3's qualitative-versus-quantitative contrast, re-anchoring on "a structural decomposition tool, not a specific numerical formula").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.graph.graph` (the basic vertex/edge/degree vocabulary and edge-counting this concept's extremal question builds on) and `math.disc.combinatorics` (counting and arrangement techniques, directly used in verifying the Turán graph's edge count and clique-freeness).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a research/analyze tag and a notably reduced mastery_threshold (0.5, MAMR 3/5) supports the "3 TAs + gate" tier at genuinely demanding scope, with LO1 and LO2 given full concrete verification (the explicit numerical computation and the constructed, verified Turán graph) and LO3 kept orientation-level, appropriately contrasting the Regularity Lemma's qualitative nature without proving it.
- **Division of labor**: `math.graph.graph` owns the basic vertex/edge vocabulary; `math.disc.combinatorics` owns general counting techniques. This concept owns COMBINING these into the specific extremal-optimization question and its Turán-graph solution — deliberately using the SAME small case ($n=6,r=2$) across Examples 1–2 so the claimed maximum and its constructive verification connect to one fully hand-computable running example.
- Example 2's deliberate choice to explicitly verify $K_3$-freeness via the pigeonhole argument (rather than merely asserting it) was chosen to make the Turán graph's clique-avoidance property concretely checkable, not merely stated as a given property of the construction.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.5×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: constructing the Turán graph for one small specific case precedes the general theorem) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
