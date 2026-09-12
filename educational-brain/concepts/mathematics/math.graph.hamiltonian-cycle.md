# math.graph.hamiltonian-cycle — Hamiltonian Cycle (Dirac's Theorem, Sufficient-Not-Necessary, TSP)

## Identity
- **KG ID:** `math.graph.hamiltonian-cycle`
- **Domain:** math.graph (Graph Theory)
- **Requires:** `math.disc.euler-hamiltonian`
- **Unlocks:** none
- **Cross-links:** `math.disc.complexity-classes` (confirmed genuinely unauthored — independence mode, see Blueprint References)
- **Difficulty:** expert
- **Bloom level:** apply
- **Mastery threshold:** 0.7 (MAMR 4/5)
- **Estimated hours:** 6

## Learning Objective
By the end of this concept, the student can: (1) recall that Hamiltonian cycle existence is NP-complete in general, with no known simple universal test, and recognize Dirac's theorem (every vertex has degree $\ge n/2$ $\Rightarrow$ a Hamiltonian cycle exists) as a genuine, efficiently-checkable SUFFICIENT condition covering a broad class of graphs, without contradicting the general hardness result; (2) apply Dirac's theorem to verify existence via minimum degree, and correctly reason that FAILING the condition proves nothing about non-existence; (3) at orientation level, distinguish the (efficiently-guaranteed-for-dense-graphs) EXISTENCE question from the strictly harder Traveling Salesman Problem (finding the minimum-weight Hamiltonian cycle), recognizing TSP as NP-hard in general but efficiently approximable in the metric case.

## Core Understanding
`math.disc.euler-hamiltonian` already established the basic Hamiltonian cycle concept (visit every vertex exactly once, return to start) and its NP-completeness in general — no known degree-based test, unlike Euler's clean criterion for Eulerian circuits. `math.graph.eulerian-circuit` then sharpened that Eulerian/Hamiltonian complexity contrast and surveyed Dirac's/Ore's theorems at introductory breadth. This concept develops Dirac's theorem as its own dedicated focus, in full depth, plus the TSP extension.

DIRAC'S THEOREM IDENTIFIES A BROAD, USEFUL SUFFICIENT CONDITION DESPITE GENERAL NP-COMPLETENESS: if EVERY vertex of a graph on $n$ vertices has degree $\ge n/2$, a Hamiltonian cycle is GUARANTEED to exist. This does NOT contradict the general NP-completeness result — it identifies a SPECIFIC, efficiently-checkable (just compute each vertex's degree) class of "dense enough" graphs where the answer IS guaranteed, while the fully general question, for graphs outside this class, remains NP-complete.

SUFFICIENT, NOT NECESSARY — FAILING DIRAC'S CONDITION PROVES NOTHING: Dirac's theorem is a ONE-WAY implication (high minimum degree $\Rightarrow$ Hamiltonian). It says nothing about graphs that fail the condition — such a graph MIGHT still have a Hamiltonian cycle (found by some other means), or might not. Failing the test means only that this particular sufficient condition doesn't apply; it does NOT prove non-existence.

TSP IS A STRICTLY HARDER QUESTION THAN MERE EXISTENCE (orientation level): even knowing a Hamiltonian cycle exists (perhaps via Dirac's theorem) doesn't reveal the MINIMUM-WEIGHT one for a weighted graph. The Traveling Salesman Problem — finding this optimal cycle — is NP-hard, and even approximating it well is generally hard. For the special "metric" case (edge weights satisfying the triangle inequality, a realistic assumption for genuine geographic distances), efficient approximation algorithms exist, guaranteeing a solution within a bounded factor of optimal, even though finding the exact optimum remains hard in general. Full derivation of these approximation algorithms is deferred beyond this concept's core scope.

## Mental Models
1. **Rung 1 — Dirac's theorem is a targeted sufficient condition, not a general algorithm.** It carves out one broad, efficiently-verified class of graphs (minimum degree $\ge n/2$) where existence is guaranteed, leaving the general NP-complete question untouched for graphs outside that class.
2. **Rung 2 — sufficient-not-necessary means failing the test is INFORMATIONALLY EMPTY, not evidence against existence.** A graph failing Dirac's condition sits in an unresolved state requiring a separate determination, never a "no" by default.
3. **Rung 3 — existence and optimal-weight are two different questions on two different difficulty tiers.** Dirac's theorem answers "does a Hamiltonian cycle exist?" efficiently for dense graphs; TSP answers "what is the CHEAPEST one?" — a strictly harder question, NP-hard in general, tractably approximable only under the metric restriction.

## Why Students Fail
Dirac's theorem's compact if-then phrasing ("if minimum degree $\ge n/2$, then Hamiltonian") is easily misread as a two-way test once a student has internalized "the theorem tells you about Hamiltonicity" without holding onto its strict directionality — this is compounded by the theorem being introduced right after the general NP-completeness claim, inviting the (false) inference that a special theorem must somehow "solve" the general hard problem, rather than merely covering a specific sufficient case. Students who accept the sufficient-not-necessary structure in the abstract often still slip back into "failing the test proves absence" under time pressure, because the sufficient-condition logic requires holding two facts in mind simultaneously (the condition is not met; the property might still hold) rather than the single-fact shortcut that failing feels more decisive than it is. Finally, having just proven a cycle exists via an efficient theorem, students readily assume the HARD part is over, missing that identifying that SOME solution exists is a fundamentally different, easier task than finding the BEST one — the same "existence versus optimization" gap that recurs throughout combinatorics and algorithms.

## Misconceptions

### MC-1: DIRAC-THEOREM-ASSUMED-TO-CONTRADICT-NP-COMPLETENESS
- **Birth type:** Type 1 (overgeneralization) — foundational (per this Blueprint's own severity rating, independently classified)
- **Description:** Believing Dirac's theorem contradicts the general NP-completeness of Hamiltonian cycle existence, missing that it identifies a specific sufficient condition rather than a general efficient algorithm for all graphs.
- **Why this birth type:** Overgeneralization from "here is an efficient theorem about Hamiltonian cycles" to "the Hamiltonian cycle problem has been efficiently solved" — the student generalizes a narrow, dense-graph-only result to the entire problem class, missing the theorem's restricted scope.
- **Detection probe:** "Does Dirac's theorem contradict the claim that determining Hamiltonian cycle existence is NP-complete in general?" A student with MC-1 answers "yes," treating the theorem as a universal algorithm.
- **Repair:** Present a graph FAILING Dirac's condition (e.g. a path graph $P_4$, endpoints of degree 1) alongside one satisfying it (e.g. the wheel graph $W_5$): Dirac's theorem simply says nothing about the first — it is not a universal decision procedure, only a targeted sufficient condition for graphs meeting its threshold.
- **Verification of death:** Given the general NP-completeness claim and Dirac's theorem side by side, the student explains that the theorem identifies a specific efficiently-checkable sufficient condition, not a general solution, with no perceived contradiction.

### MC-2: FAILED-DIRAC-CONDITION-ASSUMED-TO-PROVE-NON-EXISTENCE
- **Birth type:** Type 4 (notation-induced) — high (per this Blueprint's own severity rating, independently classified, matching `math.graph.eulerian-circuit`'s own MC-2 — the identical directional misreading recurring on the specific theorem this entry now develops in depth)
- **Description:** Believing failing Dirac's condition (some vertex has degree $<n/2$) proves a graph has no Hamiltonian cycle, missing that the theorem is sufficient, not necessary.
- **Why this birth type:** Notation-induced: the theorem's compact if-then form invites reading it as biconditional without deliberate emphasis on its one-way structure — the same mechanism already registered for this exact misreading in `math.graph.eulerian-circuit`'s own MC-2.
- **Detection probe:** "A path graph $P_4$ (vertices 1-2-3-4 in a line) has endpoint degree 1, far below $n/2=2$. Does this prove $P_4$ has no Hamiltonian cycle?" A student with MC-2 treats the failed condition itself as the proof, rather than checking directly.
- **Repair:** Work Example 2's minimal single-edge modification directly: $P_4$ genuinely has no Hamiltonian cycle (verified by direct inspection, not by the failed Dirac test), but adding just one edge (connecting vertices 1 and 4, forming $C_4$) flips Dirac's condition to HOLDING (now every vertex has degree 2 $\ge n/2=2$) — showing the test's outcome is highly sensitive to structure the theorem itself cannot resolve, and that the correct verdict for $P_4$ came from direct inspection, not from the failed test.
- **Verification of death:** Given a graph failing Dirac's condition, the student states this proves nothing, and determines existence by direct inspection rather than concluding absence from the failed test alone.

### MC-3: EXISTENCE-ASSUMED-TO-SOLVE-TSP
- **Birth type:** Type 1 (overgeneralization) — moderate (per this Blueprint's own severity rating, independently classified)
- **Description:** Believing that proving Hamiltonian cycle existence (via Dirac's theorem) also solves the Traveling Salesman Problem's optimal-weight question, missing that TSP is a strictly harder, separate problem.
- **Why this birth type:** Overgeneralization from "I can efficiently prove SOME solution exists" to "I can efficiently find the BEST solution" — collapsing the existence question and the optimization question into one, when they occupy genuinely different difficulty tiers.
- **Detection probe:** "Dirac's theorem efficiently guarantees the weighted wheel graph $W_5$ has a Hamiltonian cycle. Does this also mean finding the CHEAPEST such cycle is efficiently solvable?" A student with MC-3 answers "yes."
- **Repair:** Contrast Example 1's easy existence guarantee (a simple degree check) against Example 3's genuinely hard optimal-weight question (comparing all valid Hamiltonian cycles' total weights, a combinatorially explosive search) on the SAME running graph — the theorem answers "does one exist?" but says nothing about "which one is cheapest?"
- **Verification of death:** Given a graph where Dirac's theorem guarantees existence, the student explicitly states that finding the minimum-weight cycle (TSP) remains a separate, harder (NP-hard) question, not resolved by the existence guarantee.

## Analogies
1. **The building-permit-vs-optimal-floorplan analogy.** Dirac's theorem is like a building code that GUARANTEES "if your lot meets these density requirements, a valid building CAN be built here" — a genuine, useful, efficiently-checkable guarantee for lots meeting the code. But a lot failing the code isn't necessarily unbuildable — it just means this particular shortcut doesn't apply, and someone must check some other way. And even once a valid building is guaranteed possible, finding the CHEAPEST valid design is an entirely separate, much harder optimization problem (targets MC-1 and MC-2 together).
2. **The proof-of-existence-vs-treasure-map analogy (targets MC-3).** Dirac's theorem is like being told, with certainty, "treasure is buried somewhere on this island" — genuinely useful, efficiently established. But that guarantee is not a map to the BEST treasure spot; finding the optimal (cheapest) route to collect it is an entirely different, much harder undertaking.

## Demonstrations
### Demonstration 1 — Dirac's theorem as a useful sufficient condition (mirrors Blueprint Ex1)
Wheel graph $W_5$ (a 5-cycle plus a central vertex connected to all 5, $n=6$): the center has degree 5, each rim vertex has degree 3 (two rim neighbors plus the center). Checking Dirac's condition — every vertex's degree $\ge n/2=3$: center $5\ge3$ ✓, each rim vertex $3\ge3$ ✓ — the condition HOLDS for every vertex, so the theorem guarantees a Hamiltonian cycle exists (indeed, the rim cycle itself IS one), obtained without searching the exponentially many possible vertex orderings.

### Demonstration 2 — Dirac's condition failing does not prove non-existence (mirrors Blueprint Ex2)
Path graph $P_4$ (vertices 1-2-3-4 in a line, $n=4$): endpoints 1 and 4 have degree 1, far below $n/2=2$ — Dirac's condition FAILS, giving no information. Direct inspection confirms $P_4$ genuinely has no Hamiltonian cycle (a path has no cycle at all). Contrast: adding just ONE edge connecting 1 and 4 directly (forming the 4-cycle $C_4$) flips both endpoints to degree $2\ge n/2=2$ ✓ — Dirac's condition now HOLDS, correctly guaranteeing a Hamiltonian cycle. The key point: failing Dirac's condition on $P_4$ did not itself PROVE absence — direct inspection did that; the theorem was simply silent.

### Demonstration 3 — existence versus optimal weight, TSP as a harder question (mirrors Blueprint Ex3)
A weighted version of Demonstration 1's wheel graph $W_5$, with edge distances satisfying the triangle inequality (a genuinely "metric" case): Dirac's theorem already guarantees a Hamiltonian cycle exists. But finding the SHORTEST such cycle (the TSP solution) requires, in principle, comparing all valid Hamiltonian cycles' total weights — combinatorially explosive for larger graphs. For the metric case specifically, efficient approximation algorithms (e.g. based on minimum spanning trees) guarantee a cycle within a bounded factor (e.g. within 1.5x or 2x) of the true minimum, without needing the exact optimum, which remains NP-hard in general.

## Discovery Questions
1. "Does Dirac's theorem, an efficient degree check, contradict the claim that Hamiltonian cycle existence is NP-complete in general? How can both be true at once?"
2. "A path graph $P_4$ fails Dirac's condition, and truly has no Hamiltonian cycle. Adding one edge (forming $C_4$) makes Dirac's condition HOLD. Does the failed test on $P_4$ itself PROVE the absence, or did you need to check some other way?"
3. "If you know (via Dirac's theorem) that a weighted graph definitely has a Hamiltonian cycle, have you also found the CHEAPEST one? What would you still need to do?"

## Teaching Sequence
Best taught by **direct instruction establishing Dirac's theorem's precise sufficient-not-necessary structure FIRST**, using the CPA Concrete entry stage (verifying the degree condition on one specific graph, $W_5$, before naming the general theorem) — the sufficient-not-necessary logic is precise and best anchored to a concrete verified example before generalizing, with the TSP extension held at orientation level until existence is solid.
1. Verify Dirac's condition directly on $W_5$ (Demonstration 1) before stating the general theorem, posing Discovery Question 1 on the apparent tension with NP-completeness.
2. Work Demonstration 2's $P_4$-versus-$C_4$ contrast, posing Discovery Question 2 before confirming the sufficient-not-necessary structure explicitly.
3. Introduce the TSP extension via Demonstration 3 at orientation level, posing Discovery Question 3 before revealing the metric-approximation distinction.
4. Assess with the P77 problem set and the delivery-route transfer probe (P76, independence mode).

## Tutor Actions
1. **On any Dirac's-theorem application:** always require the student to state explicitly whether the condition holds or fails BEFORE drawing any conclusion, and if it fails, to state "inconclusive — must check some other way" rather than "no."
2. **On the NP-completeness tension:** explicitly ask "does this theorem contradict the general hardness result?" whenever Dirac's theorem is first applied, to surface MC-1 immediately.
3. **On any existence-versus-TSP question:** require the student to name BOTH questions separately (does a cycle exist? what is the cheapest one?) before answering either.

## Voice Teaching Notes
1. **Register:** expert/applied — this concept assumes comfort with NP-completeness framing from the prerequisite and develops a full sufficient-condition theorem plus an orientation-level optimization extension.
2. **Load-bearing sentence, spoken slowly:** "Failing Dirac's test tells you nothing at all — it just means you have to find out some other way."
3. **Wait time:** pause after Discovery Question 2, letting the student sit with the fact that the SAME graph's Dirac status can flip with a single edge, before revealing that this sensitivity is exactly why the test is only sufficient, not necessary.

## Assessment Signals
1. **Gate concept:** correctly applies Dirac's theorem to determine when it guarantees a Hamiltonian cycle, and correctly identifies when the condition fails without concluding non-existence.
2. **Directional-logic fluency:** explicitly states "sufficient, not necessary" when asked what failing the theorem's condition proves.
3. **Existence-versus-optimization discrimination:** correctly distinguishes "does a Hamiltonian cycle exist?" from "what is the cheapest one?" and identifies TSP as the strictly harder question.
4. **Transfer:** applies the sufficient-not-necessary reasoning pattern to the delivery-route scenario (P76), correctly handling both a dense-enough zone graph and a sparse one.

## Tutor Recovery Strategy
If the student treats Dirac's theorem as contradicting NP-completeness, work several graphs both inside and outside Dirac's covered class side by side, making explicit that the theorem's guarantee applies ONLY to the dense subclass, leaving the general problem genuinely hard. If the student concludes non-existence from a failed Dirac test, repeat the $P_4$-versus-$C_4$ single-edge-flip demonstration with a fresh pair of graphs until the fragility of the test (and hence its non-definitiveness on failure) is concrete. If the student conflates existence with optimal weight, have them explicitly answer "does one exist?" and "what is the cheapest one?" as two separate written questions for the same graph, until the distinction is automatic.

## Memory Hooks
1. "Dirac's theorem is a sufficient shortcut for dense graphs — not a universal solver."
2. "Failing Dirac's test proves nothing — it's one-way, not a two-way test."
3. "Existence is not optimization — knowing a cycle exists doesn't tell you the cheapest one."

## Transfer Connections
- **`math.disc.euler-hamiltonian`:** the basic Hamiltonian cycle definition and general NP-completeness framing this concept's Dirac's-theorem treatment builds directly on.
- **`math.graph.eulerian-circuit`:** surveys Dirac's and Ore's theorems at introductory breadth as part of the Eulerian/Hamiltonian complexity contrast; this concept develops Dirac's theorem specifically in full depth as its own dedicated focus, using the SAME wheel-graph $W_5$ running example across both entries' Examples 1 and 3, per that entry's own Curriculum Feedback note recording this division of labor.
- **`math.graph.graph-coloring`:** shares the same "existence is efficiently guaranteed under a sufficient condition, but the fully general problem remains hard" structural pattern (Dirac's theorem here; the Four Color Theorem's asymptotic guarantee there), a genuinely recurring theme in this domain worth surfacing explicitly to the student.

## Cross-Subject Connections
- **Operations Research (Traveling Salesman Problem):** the TSP extension is the direct foundation of vehicle-routing and logistics optimization, one of the most-studied NP-hard problems in industry.
- **Computer Science (approximation algorithms, complexity theory):** the metric-TSP approximation-guarantee framing previews the broader field of approximation algorithms for NP-hard optimization problems.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.graph.hamiltonian-cycle.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on delivery-route Hamiltonian planning, mode = independence). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions independently confirmed against this program's own taxonomy: MC-1 Type 1 foundational, MC-2 Type 4 high (matching `math.graph.eulerian-circuit`'s own MC-2 mechanism, cited directly), MC-3 Type 1 moderate.
- Cross-link: KG lists `math.disc.complexity-classes`; verified via direct directory listing that neither a Blueprint nor an Educational Brain entry exists for it — confirmed genuinely unauthored, matching this concept's own Blueprint's V-5 finding. Independence mode.
- **Genuine content-overlap resolved by division of labor (confirmed from the sibling side)**: `math.graph.eulerian-circuit`'s own Blueprint and EB entry (authored earlier this same batch) explicitly defer their Dirac's-theorem treatment to this concept, keeping their own coverage at introductory breadth. This entry is the one that develops the theorem, its sufficient-not-necessary structure, and the TSP extension in full depth — confirming and completing that sibling entry's own forward-pointing note.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- Confirms and closes `math.graph.eulerian-circuit`'s own forward-pointing Curriculum Feedback note: the deeper Dirac's-theorem treatment it deferred is authored here, at the depth and with the running $W_5$ example that entry anticipated.

## Version History
- **Batch 25** (2026-09-12): initial authoring, part 3 of 4 this batch (with `math.graph.connectivity`, `math.graph.eulerian-circuit`, `math.graph.graph-coloring`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1 foundational, MC-2 Type 4 high, MC-3 Type 1 moderate); cross-link `math.disc.complexity-classes` re-verified genuinely unauthored (independence mode confirmed).
