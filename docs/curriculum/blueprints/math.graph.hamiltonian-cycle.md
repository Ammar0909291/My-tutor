# Teaching Blueprint: Hamiltonian Cycle (`math.graph.hamiltonian-cycle`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.hamiltonian-cycle` |
| name | Hamiltonian Cycle |
| domain | Graph Theory |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.disc.euler-hamiltonian` |
| unlocks | none |
| cross_links | `math.disc.complexity-classes` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — verifying Dirac's theorem's degree condition guarantees a cycle on one specific graph before naming the general theorem |
| description (KG) | A cycle visiting every vertex exactly once. NP-complete to determine existence (unlike Eulerian circuits). Dirac's theorem: exists if every vertex has degree $\ge n/2$. Traveling Salesman Problem: find minimum-weight Hamiltonian cycle (NP-hard). Approximation algorithms for metric TSP. |

## Component 1 — Learning Objectives

- LO1: Recall `math.disc.euler-hamiltonian`'s own framing — determining Hamiltonian cycle existence is NP-complete IN GENERAL, with no known simple universal criterion — and recognize DIRAC'S THEOREM (every vertex has degree $\ge n/2\Rightarrow$ a Hamiltonian cycle exists) as a genuine, USEFUL SUFFICIENT condition that identifies a broad class of graphs where the answer IS efficiently guaranteed, WITHOUT contradicting the general NP-completeness result.
- LO2: Apply Dirac's theorem to verify a specific graph's Hamiltonian-cycle existence via its minimum degree, and recognize the theorem's LIMITS: a graph FAILING Dirac's condition (some vertex with degree $<n/2$) may STILL have a Hamiltonian cycle — the theorem gives a SUFFICIENT, not NECESSARY, condition.
- LO3 (orientation level — full TSP approximation-algorithm derivation deferred): recognize, without full derivation, that the TRAVELING SALESMAN PROBLEM (finding the MINIMUM-WEIGHT Hamiltonian cycle) is a strictly HARDER question than mere existence — NP-hard even to approximate well in general, though EFFICIENT approximation algorithms exist for the special "metric" case (triangle-inequality-satisfying edge weights), previewing the practical gap between "prove a solution exists" and "find the optimal one."

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.euler-hamiltonian` (Eulerian circuits' simple degree-based characterization, versus Hamiltonian cycles' NP-complete existence question, and the two properties' logical independence).

## Component 3 — Core Explanation

**Dirac's theorem identifies a broad, useful sufficient condition despite general NP-completeness**: `math.disc.euler-hamiltonian` already established that Hamiltonian cycle existence has NO known simple universal test, unlike Euler's clean degree criterion, and is NP-complete in general. Dirac's theorem does NOT contradict this — it identifies a SPECIFIC, useful SUFFICIENT condition: if EVERY vertex has degree $\ge n/2$ (where $n$ is the total number of vertices), a Hamiltonian cycle is GUARANTEED to exist. This is a genuine, efficiently-checkable (just compute each vertex's degree) criterion covering a broad and useful class of "dense enough" graphs, even though the FULLY GENERAL question remains NP-complete for graphs outside this class.

**Sufficient, not necessary — failing Dirac's condition proves nothing about the graph**: Dirac's theorem is a ONE-WAY implication: high minimum degree $\Rightarrow$ Hamiltonian cycle exists. It says NOTHING about graphs that FAIL the degree condition — such a graph MIGHT still have a Hamiltonian cycle (found by some other means), or might not. Failing Dirac's test simply means this PARTICULAR sufficient condition doesn't apply — it does NOT prove non-existence, and confusing "Dirac's condition fails" with "no Hamiltonian cycle exists" is a genuine logical error.

**TSP is a strictly harder question than mere existence (orientation level)**: even KNOWING a Hamiltonian cycle exists (perhaps via Dirac's theorem) doesn't tell you the MINIMUM-WEIGHT one (for a weighted graph) — the Traveling Salesman Problem, finding this optimal cycle, is NP-HARD, and even APPROXIMATING it well is generally hard. However, for the special "METRIC" case (edge weights satisfying the triangle inequality — a realistic assumption for genuine geographic distances), efficient APPROXIMATION algorithms exist, guaranteeing a solution within a bounded factor of optimal, even though finding the EXACT optimum remains hard. Full derivation of these approximation algorithms is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — Dirac's theorem as a useful sufficient condition, breaking MC-1)**: for the complete bipartite-like graph $K_{3,3}$-adjacent structure — actually, take the wheel graph $W_5$ (a 5-cycle plus a central vertex connected to all 5, giving $n=6$ vertices): the central vertex has degree $5$, and each rim vertex has degree $3$ (two rim neighbors plus the center). Checking Dirac's condition: is every vertex's degree $\ge n/2=3$? The center has degree $5\ge3$ ✓, and EACH rim vertex has degree $3\ge3$ ✓ — Dirac's condition HOLDS for every vertex, so the theorem GUARANTEES a Hamiltonian cycle exists (indeed, the rim cycle itself, going around all 5 rim vertices, IS one, though it doesn't even need the center) — obtained WITHOUT needing to search the exponentially many possible vertex orderings, thanks to the theorem's efficient degree check.

**Example 2 (LO2 — Dirac's condition failing does not prove non-existence, breaking MC-2)**: for a PATH graph $P_4$ (vertices $1$-$2$-$3$-$4$ in a line, $n=4$): the endpoint vertices $1$ and $4$ each have degree $1$, far below $n/2=2$ — Dirac's condition FAILS. This means Dirac's theorem gives NO information here — and indeed, checking directly, $P_4$ has NO Hamiltonian cycle (a path has no cycle at all). But contrast with the graph formed by adding JUST ONE edge, connecting $1$ and $4$ directly (making it a 4-cycle $C_4$): now $1$ and $4$ each have degree $2\ge n/2=2$ ✓ — Dirac's condition holds, guaranteeing (correctly) a Hamiltonian cycle. The KEY point: failing Dirac's condition (as in $P_4$) does NOT by itself PROVE no Hamiltonian cycle exists — it simply means this test doesn't apply; one must check some other way (as done here directly) to determine the true answer.

**Example 3 (LO3, orientation level — existence versus optimal-weight, TSP as a harder question, breaking MC-3)**: for a WEIGHTED version of Example 1's wheel graph $W_5$ (with distances assigned to each edge, satisfying the triangle inequality — a genuinely "metric" case): Dirac's theorem (via Example 1) already GUARANTEES a Hamiltonian cycle exists. But finding the SHORTEST such cycle (the TSP solution) is a genuinely HARDER question — even for this small graph, one would in principle need to compare all valid Hamiltonian cycles' total weights, a combinatorially explosive search for larger graphs. For the METRIC case specifically, efficient approximation algorithms (e.g. based on minimum spanning trees) guarantee a cycle within a bounded factor (e.g. within 1.5× or 2× depending on the algorithm) of the true minimum — without needing to find the exact optimum, which remains NP-hard in general.

## Component 5 — Teaching Actions

### Teaching Action A01 — Dirac's Theorem Is a Useful Sufficient Condition, Not a Contradiction of NP-Completeness (Primitive P11: Representation Shift)

State: "Dirac's theorem doesn't magically solve the general NP-complete problem — it identifies a SPECIFIC, broad, efficiently-checkable class of graphs (high minimum degree) where the answer IS guaranteed, leaving the fully general case genuinely hard." Walk Example 1's direct degree-check on the wheel graph $W_5$.

- **MC-1 hook**: ask "does Dirac's theorem contradict `math.disc.euler-hamiltonian`'s claim that Hamiltonian cycle existence is NP-complete in general?" — a "yes" answer reveals MC-1 (missing that Dirac's theorem identifies a specific sufficient condition, not a general efficient algorithm for all graphs).

### Teaching Action A02 — Failing Dirac's Test Proves Nothing About Existence (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $P_4$ fails Dirac's condition AND has no Hamiltonian cycle, but adding one edge (forming $C_4$) makes it PASS Dirac's condition — showing failing the test genuinely means "inconclusive," not "proven absent." State: "when a graph fails Dirac's degree check, that tells you NOTHING definitive — you have to determine existence some other way, since the theorem is a one-way implication."

- **MC-2 hook**: ask "if a graph fails Dirac's condition (some vertex has degree less than $n/2$), does this PROVE the graph has no Hamiltonian cycle?" — a "yes" answer reveals MC-2 (missing that Dirac's theorem is sufficient, not necessary — failing it proves nothing about existence).

### Teaching Action A03 — Knowing a Cycle Exists Is Not the Same as Finding the Cheapest One (Primitive P06: Contrast Pair)

Contrast Example 1's EASY existence guarantee (Dirac's theorem, a simple degree check) against Example 3's genuinely HARD optimal-weight question (TSP, NP-hard even to approximate well in general). State: "proving a Hamiltonian cycle exists and finding the CHEAPEST one are fundamentally different difficulty levels — Dirac's theorem solves the first question efficiently for dense-enough graphs, but says nothing about the second."

- **MC-3 hook**: ask "if Dirac's theorem efficiently guarantees a Hamiltonian cycle exists, does this also mean finding the minimum-weight (TSP-optimal) Hamiltonian cycle is efficiently solvable?" — a "yes" answer reveals MC-3 (missing that TSP — finding the optimal weight — is a strictly harder, NP-hard question, separate from mere existence).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For the complete graph $K_5$ ($n=5$, every vertex degree $4$), verify Dirac's condition and state its conclusion.
  2. For a star graph $S_4$ (one central vertex connected to 4 leaves, $n=5$), check Dirac's condition for the leaf vertices, and determine directly whether a Hamiltonian cycle exists.
  3. Explain why a graph failing Dirac's condition might still have a Hamiltonian cycle, citing the logical structure of "sufficient but not necessary."
  4. Explain, in one or two sentences, why proving a Hamiltonian cycle exists (via Dirac's theorem) does not solve the Traveling Salesman Problem for that graph.
- **P76 (Transfer Probe, mode = independence)**: "A delivery company models its 8 delivery zones as vertices of a graph, with edges representing feasible direct routes, and needs to know if a route visiting every zone exactly once and returning to base exists, and ideally the SHORTEST such route. (a) If every zone connects to at least 4 other zones ($n=8$, so $n/2=4$), explain what Dirac's theorem would conclude, and why this check is efficient to perform. (b) If instead one zone only connects to 2 others, explain what Dirac's theorem tells you (or fails to tell you) about that case, and what the company would need to do to determine existence directly. (c) Even once existence is confirmed, explain why finding the SHORTEST route (minimizing total travel weight) is a separate, harder problem, and what property of realistic travel distances (metric TSP) might make an approximation algorithm practically useful here."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIRAC-THEOREM-ASSUMED-TO-CONTRADICT-NP-COMPLETENESS | Believing Dirac's theorem contradicts the general NP-completeness of Hamiltonian cycle existence, missing that it identifies a specific sufficient condition, not a general algorithm | Foundational |
| MC-2 | FAILED-DIRAC-CONDITION-ASSUMED-TO-PROVE-NON-EXISTENCE | Believing failing Dirac's condition proves a graph has no Hamiltonian cycle, missing that the theorem is sufficient, not necessary | High |
| MC-3 | EXISTENCE-ASSUMED-TO-SOLVE-TSP | Believing proving Hamiltonian cycle existence (via Dirac's theorem) also solves the TSP optimal-weight question, missing that TSP is a strictly harder, separate problem | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Dirac Theorem Assumed to Contradict NP-Completeness") → P41 (detect: ask whether Dirac's theorem contradicts general NP-completeness) → P64 (conceptual shift: re-walk Example 1's specific-sufficient-condition framing, re-anchoring on "a specific sufficient condition, not a general algorithm").
- **B02 (targets MC-2)**: P27 (name it: "Failed Dirac Condition Assumed to Prove Non-Existence") → P41 (detect: ask whether failing Dirac's condition proves no Hamiltonian cycle exists) → P64 (conceptual shift: re-walk Example 2's $P_4$-versus-$C_4$ contrast, re-anchoring on "sufficient, not necessary — failing the test proves nothing").
- **B03 (targets MC-3)**: P27 (name it: "Existence Assumed to Solve TSP") → P41 (detect: ask whether proving existence also solves the TSP optimal-weight question) → P64 (conceptual shift: re-walk Example 3's existence-versus-optimal-weight contrast, re-anchoring on "TSP is a strictly harder, separate problem").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.euler-hamiltonian` (the NP-completeness framing and the Eulerian/Hamiltonian contrast this concept's Dirac's-theorem discussion directly builds on).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.disc.complexity-classes`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the direct degree-check verification and the sufficient-not-necessary demonstration) and LO3 kept orientation-level, appropriately surveying TSP's harder difficulty and the metric-approximation distinction without deriving any specific approximation algorithm's guarantee.
- **Division of labor**: `math.disc.euler-hamiltonian` owns the basic Hamiltonian-cycle definition, its contrast with Eulerian circuits, and the general NP-completeness framing; this concept owns Dirac's theorem as a SPECIFIC useful sufficient condition and the TSP extension — deliberately reusing the SAME wheel graph $W_5$ across Examples 1 and 3 so the existence guarantee and the harder optimal-weight question connect to one running, concrete graph.
- Example 2's deliberate choice to show a MINIMAL single-edge modification ($P_4\to C_4$) flipping Dirac's condition from failing to holding was chosen to make the sufficient-not-necessary distinction as sharply falsifiable as possible, isolating the degree threshold as the single relevant variable.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.complexity-classes` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: verifying Dirac's theorem's condition on a specific graph precedes the general theorem statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
