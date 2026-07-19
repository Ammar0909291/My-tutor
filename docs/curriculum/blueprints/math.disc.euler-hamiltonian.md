# Teaching Blueprint: Euler and Hamiltonian Paths (`math.disc.euler-hamiltonian`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.euler-hamiltonian` |
| name | Euler and Hamiltonian Paths |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.disc.graph-connectivity` |
| unlocks | none |
| cross_links | `math.graph.eulerian-circuit`, `math.graph.hamiltonian-cycle` (both unauthored — see Component 7) |
| CPA_entry_stage | C (Concrete) — the historical Seven Bridges of Königsberg problem, before the formal degree criterion |
| description (KG) | Eulerian circuit: traverses every edge exactly once; exists iff connected with all even-degree vertices (Euler's theorem). Hamiltonian cycle: visits every vertex exactly once; NP-complete to determine existence. |

## Component 1 — Learning Objectives

- LO1: State **Euler's theorem** precisely — a connected graph has an **Eulerian circuit** (a closed walk traversing every EDGE exactly once) if and only if EVERY vertex has EVEN degree — and apply it to determine existence directly from vertex degrees, without attempting to construct or fail at tracing a circuit.
- LO2: Apply Euler's theorem to the historical **Seven Bridges of Königsberg** problem (this concept's own KG alias) — modeling landmasses as vertices and bridges as edges, counting degrees, and concluding no Eulerian circuit exists — and extend the degree criterion to the OPEN case: a connected graph has an Eulerian PATH (not necessarily returning to start) if and only if it has exactly $0$ or $2$ odd-degree vertices.
- LO3 (orientation level, given the concept's own explicit NP-completeness framing): contrast the EULERIAN case (a simple, efficiently checkable degree condition) against the **Hamiltonian cycle** case (visiting every VERTEX exactly once; no known simple characterization; NP-complete to determine existence in general) — recognizing this as a genuine complexity-class asymmetry between two superficially similar graph properties, and recognizing the two properties as logically INDEPENDENT (a graph can have one without the other).

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph-connectivity` (paths as sequences of distinct vertices, cycles as closed paths, connectedness as a path existing between every pair of vertices).

## Component 3 — Core Explanation

**Euler's theorem — a clean, efficiently checkable criterion**: a connected graph has an EULERIAN CIRCUIT — a closed walk that uses every EDGE exactly once, returning to its starting vertex — if and only if every vertex has EVEN degree. This is a genuine "if and only if": checking it requires only counting degrees (an $O(V)$ computation), never attempting to construct or search for the circuit itself. The intuition: every time the walk passes THROUGH a vertex (not counting the start/end), it uses up two of that vertex's edge-slots (one arriving, one leaving) — so a vertex's edges must pair up completely for the walk to pass through cleanly every time, which is only possible if its degree is even.

**Extending to the open case — Eulerian paths**: relaxing the requirement that the walk return to its start, a connected graph has an EULERIAN PATH (using every edge exactly once, but starting and ending at DIFFERENT vertices) if and only if EXACTLY $0$ or $2$ vertices have odd degree. Zero odd vertices recovers the closed-circuit case; exactly two odd vertices means an open path exists, necessarily starting at one odd-degree vertex and ending at the other (any other vertex count of odd-degree vertices — one, three, or more — makes even an OPEN Eulerian path impossible).

**Hamiltonian cycles — a fundamentally harder question**: a HAMILTONIAN CYCLE visits every VERTEX exactly once (edges may be skipped) and returns to the start. Unlike Euler's clean degree-based criterion, there is NO known simple characterization for when a Hamiltonian cycle exists — determining existence is **NP-complete** in general, meaning no efficient (polynomial-time) algorithm is known (or believed to exist) that solves it for arbitrary graphs. This is a genuine complexity-class gap between two properties that sound superficially similar (both involve "visiting everything exactly once"), and the two properties are logically INDEPENDENT of one another — neither implies the other.

## Component 4 — Worked Examples

**Example 1 (LO1 — Euler's theorem applied by degree count alone, breaking MC-1)**: a 4-cycle graph with vertices $A,B,C,D$ and edges $A$-$B$, $B$-$C$, $C$-$D$, $D$-$A$: every vertex has degree $2$ (even). By Euler's theorem, an Eulerian circuit exists — confirmed by tracing $A\to B\to C\to D\to A$, using every edge exactly once. Now add ONE more edge, the diagonal $A$-$C$: vertices $A$ and $C$ now have degree $3$ (odd), while $B,D$ remain degree $2$. Euler's theorem immediately says NO Eulerian circuit exists — determined purely by the degree count, with no attempt at tracing required or even useful.

**Example 2 (LO2 — Seven Bridges of Königsberg, and the open-path extension, breaking MC-2)**: the four landmasses of Königsberg (two riverbanks, two islands), connected by seven bridges, model as a multigraph with vertex degrees $3,3,3,5$ — ALL FOUR vertices odd. Since Euler's theorem requires ALL vertices even for a circuit, none exists — Euler's own 1736 resolution: no walk crosses each of the seven bridges exactly once and returns to the start. Contrast with a simple path graph $A$-$B$-$C$-$D$-$E$ (edges $A$-$B$,$B$-$C$,$C$-$D$,$D$-$E$): degrees are $1,2,2,2,1$ — exactly TWO odd vertices ($A$ and $E$). This does NOT satisfy the all-even circuit condition, but it DOES satisfy the exactly-two-odd condition for an OPEN Eulerian path: $A\to B\to C\to D\to E$ uses every edge exactly once, just without returning to $A$.

**Example 3 (LO3, orientation level — Eulerian vs. Hamiltonian independence, breaking MC-3)**: take the "bowtie" graph — two triangles sharing one common vertex $C$: triangle $A$-$B$-$C$-$A$ and triangle $C$-$D$-$E$-$C$ (edges $AB,BC,CA,CD,DE,EC$). Degrees: $C$ has degree $4$ (even, appearing in $CA,BC,CD,EC$), and $A,B,D,E$ each have degree $2$ (even). ALL vertices are even, so by Euler's theorem an EULERIAN CIRCUIT EXISTS (e.g. $A\to B\to C\to D\to E\to C\to A$, using every edge once, passing through $C$ twice as a VISIT, which is allowed since only edges need be used exactly once). But a HAMILTONIAN CYCLE does NOT exist: $C$ is the only connection between the two triangles, so any cycle visiting vertices from both sides must pass through $C$ at least twice to return to its start — contradicting the Hamiltonian requirement of visiting every VERTEX (including $C$) exactly once. This single graph has an Eulerian circuit but no Hamiltonian cycle, proving the two properties are genuinely independent.

## Component 5 — Teaching Actions

### Teaching Action A01 — Check Degrees, Never Trace to Determine Existence (Primitive P11: Representation Shift)

State: "Euler's theorem turns 'does an Eulerian circuit exist?' into a simple counting question — add up each vertex's degree, and if even one comes out odd, you already know the answer without touching a pencil to trace a route." Work Example 1's diagonal-edge modification, showing the answer flips from yes to no purely by degree count.

- **MC-1 hook**: ask "to determine whether a graph has an Eulerian circuit, do you need to attempt tracing a route and see if it works?" — a "yes" answer reveals MC-1 (missing that the degree-based criterion answers existence directly, with no construction attempt needed).

### Teaching Action A02 — Exactly Two Odd Vertices Still Gives an Open Eulerian Path (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the path graph $A$-$B$-$C$-$D$-$E$ fails the all-even CIRCUIT condition (two odd vertices), yet still has a genuine Eulerian PATH using every edge exactly once. State: "failing the closed-circuit condition doesn't mean there's no Eulerian structure at all — exactly two odd vertices still guarantees an open path between those two vertices specifically."

- **MC-2 hook**: ask "if a connected graph has some odd-degree vertices, does that mean it has no Eulerian structure at all?" — a "yes" answer reveals MC-2 (missing the exactly-two-odd-vertices case, which still guarantees an open Eulerian path).

### Teaching Action A03 — Eulerian and Hamiltonian Are Independent Properties (Primitive P06: Contrast Pair)

Contrast Example 1's 4-cycle (has BOTH an Eulerian circuit and, coincidentally, a Hamiltonian cycle — the same trace) against Example 3's bowtie graph (has an Eulerian circuit but NO Hamiltonian cycle, since the shared vertex $C$ cannot be visited only once while connecting both triangles). State: "these two properties sound similar — 'visit every edge once' versus 'visit every vertex once' — but they are governed by completely different mathematics: one has a simple degree test, the other is NP-complete, and a graph can have either one without the other."

- **MC-3 hook**: ask "if a graph has an Eulerian circuit, must it also have a Hamiltonian cycle?" — a "yes" answer reveals MC-3 (conflating the two properties, missing the bowtie-graph counterexample and the deep complexity-class asymmetry between them).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A connected graph has vertex degrees $2,2,4,2$. Does it have an Eulerian circuit? Justify using Euler's theorem alone, without tracing.
  2. Model a small multigraph of your own (or reuse the Seven Bridges) and show, via degree counting, why no Eulerian circuit exists.
  3. A path graph $A$-$B$-$C$-$D$ (edges $AB,BC,CD$) has degrees $1,2,2,1$ — exactly two odd vertices. Does it have an Eulerian circuit? An Eulerian path? Explain both answers.
  4. Explain, referencing the bowtie graph from this lesson, why having an Eulerian circuit does NOT guarantee having a Hamiltonian cycle, using a graph where you can verify both properties directly.
- **P76 (Transfer Probe, mode = independence)**: "A hexagonal hallway layout connects rooms $R_1,\dots,R_6$ with hallways $R_1$-$R_2$, $R_2$-$R_3$, $R_3$-$R_4$, $R_4$-$R_5$, $R_5$-$R_6$, $R_6$-$R_1$, plus one extra diagonal hallway $R_1$-$R_4$. (a) Compute each room's degree, and using Euler's theorem, determine whether a security guard can walk every hallway exactly once and return to the start. (b) Exactly how many rooms have odd degree, and what does this tell you about whether an OPEN route (not returning to start) using every hallway exactly once is possible? (c) Separately, could the same guard visit every ROOM exactly once (not necessarily every hallway) and return to start? Explain why this second question is generally far harder to answer than parts (a) and (b)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TRACING-REQUIRED-TO-DETERMINE-EXISTENCE | Believing Eulerian circuit existence can only be determined by attempting to trace a route, missing that Euler's degree-based iff criterion answers existence directly with no construction attempt needed | Foundational |
| MC-2 | ODD-VERTICES-IMPLY-NO-EULERIAN-STRUCTURE | Believing any odd-degree vertex rules out all Eulerian structure, missing that exactly two odd vertices still guarantees an open Eulerian path between those two vertices | High |
| MC-3 | EULERIAN-IMPLIES-HAMILTONIAN | Conflating Eulerian circuits with Hamiltonian cycles as essentially the same kind of property, missing their logical independence and the deep complexity-class gap (simple degree test vs. NP-complete) between them | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Tracing Assumed Necessary") → P41 (detect: ask whether determining Eulerian circuit existence requires attempting to trace a route) → P64 (conceptual shift: re-walk Example 1's diagonal-edge modification, re-anchoring on "the degree count alone answers existence — no tracing attempt needed").
- **B02 (targets MC-2)**: P27 (name it: "Odd Vertices Assumed to Rule Out All Eulerian Structure") → P41 (detect: give a graph with exactly two odd vertices and ask whether it has any Eulerian structure at all) → P64 (conceptual shift: re-walk Example 2's path-graph case, re-anchoring on "exactly two odd vertices still guarantees an open Eulerian path between those two vertices specifically").
- **B03 (targets MC-3)**: P27 (name it: "Eulerian Assumed to Imply Hamiltonian") → P41 (detect: ask whether a graph with an Eulerian circuit must also have a Hamiltonian cycle) → P64 (conceptual shift: re-walk Example 3's bowtie graph, re-anchoring on "these are independent properties — the bowtie graph has one without the other").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph-connectivity` (paths, cycles, and connectedness — this concept's degree-based criteria build directly on that concept's structural vocabulary).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.graph.eulerian-circuit` and `math.graph.hamiltonian-cycle`, both checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (Euler's theorem applied directly, plus its own historical motivating problem and the open-path extension) and LO3 kept at orientation level, appropriately surveying the Eulerian/Hamiltonian complexity asymmetry the KG's own description explicitly names (NP-completeness) without attempting to teach NP-completeness itself.
- **Division of labor**: `math.disc.graph-connectivity` owns the basic structural vocabulary (paths, cycles, connectedness); this concept owns the DEGREE-BASED existence criteria for Eulerian structures and the qualitative contrast with Hamiltonian cycles, deliberately not re-deriving path/cycle definitions from scratch.
- The bowtie graph in Example 3 was chosen specifically because it is the smallest common counterexample showing Eulerian-without-Hamiltonian in one concrete, hand-verifiable graph — a genuine graph rather than an abstract assertion, making MC-3's target error checkable rather than merely stated.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both cross_links confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: the historical Seven Bridges problem before the formal criterion) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
