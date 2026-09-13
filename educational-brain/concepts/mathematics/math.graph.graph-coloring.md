# math.graph.graph-coloring — Graph Coloring (Chromatic Number, Brooks' Theorem, Four/Five Color Theorems, Vizing's Theorem)

## Identity
- **KG ID:** `math.graph.graph-coloring`
- **Domain:** math.graph (Graph Theory)
- **Requires:** `math.disc.graph-coloring`
- **Unlocks:** none
- **Cross-links:** `math.disc.graph-coloring` (already authored — see Blueprint References; a Blueprint-staleness finding is recorded in Curriculum Feedback)
- **Difficulty:** expert
- **Bloom level:** analyze
- **Mastery threshold:** 0.75 (MAMR 4/5)
- **Estimated hours:** 6

## Learning Objective
By the end of this concept, the student can: (1) define a proper vertex coloring and the chromatic number $\chi(G)$, compute or bound $\chi(G)$ for small graphs by combining lower bounds (clique/independence number) with upper bounds (greedy/Brooks' theorem), and correctly distinguish $\chi(G)$ from $\omega(G)$ (clique number is a lower bound, not an equality); (2) state the Four Color Theorem and prove the Five Color Theorem constructively via the induction-plus-Kempe-chain argument, and explain why the Kempe-chain idea does NOT extend to four colors; (3) define edge coloring and the chromatic index $\chi'(G)$, state Vizing's theorem, classify a graph as Class 1 or Class 2, and recognize that Vizing's theorem applies only to simple graphs.

## Core Understanding
`math.disc.graph-coloring` established the basic vertex-coloring definition, the map-coloring motivation, and the chromatic number concept at introductory depth. This concept develops the full formal machinery: precise lower/upper bound techniques, Brooks' theorem, the Five Color Theorem's complete constructive proof (in explicit contrast with the Four Color Theorem's fundamentally different computer-assisted proof), and edge coloring via Vizing's theorem.

CHROMATIC NUMBER, BOUNDED FROM BOTH SIDES: a proper $k$-coloring assigns colors $1,\ldots,k$ to vertices so that no edge joins two same-colored vertices; $\chi(G)$ is the minimum such $k$. LOWER bounds come from structure already present: $\chi(G)\ge\omega(G)$ (a clique of size $\omega$ needs $\omega$ distinct colors) and $\chi(G)\ge n/\alpha(G)$ (independence-number argument). UPPER bounds come from construction: the greedy algorithm, coloring vertices in order and assigning the smallest available color, uses at most $\Delta(G)+1$ colors, so $\chi(G)\le\Delta(G)+1$. BROOKS' THEOREM (1941) sharpens this: for a CONNECTED graph, $\chi(G)\le\Delta(G)$ UNLESS $G$ is a complete graph $K_n$ or an odd cycle $C_{2k+1}$ — these two families are the ONLY exceptions where the naive greedy bound cannot be improved by one.

$\chi(G)$ AND $\omega(G)$ CAN DIVERGE ARBITRARILY: the clique number gives a genuine lower bound, but it is not an equality in general — the Mycielski construction produces triangle-free graphs (so $\omega=2$) with arbitrarily large chromatic number, the smallest example being the Grötzsch graph (11 vertices, triangle-free, $\chi=4$). This gap is precisely what makes graph coloring's computational difficulty qualitatively different from clique detection.

THE FOUR COLOR THEOREM VS. THE FIVE COLOR THEOREM — A GENUINE PROOF-STRUCTURE DIVIDE: every planar graph is 4-colorable (Appel–Haken 1976, originally verified via 1,936 computer-checked reducible configurations, later simplified to 633 by Robertson–Seymour–Sanders–Thomas 1997) — no short human-checkable proof is currently known. By contrast, the FIVE Color Theorem (Kempe 1879, corrected Heawood 1890) has a complete, elegant, human-checkable inductive proof: find a vertex $v$ of degree $\le5$ (guaranteed to exist in any planar graph by Euler's formula), remove it, 5-color the rest by induction, then reintroduce $v$ — if $\deg(v)\le4$, one color is trivially free; if $\deg(v)=5$ and all 5 neighbor colors are used, a KEMPE CHAIN argument (swapping colors along a connected two-color component) frees a color for $v$. Kempe's own 1879 attempt to extend this exact chain-swapping idea to FOUR colors contains a genuine error (found by Heawood in 1890): with only four colors, two Kempe chains can become entangled in a way that is impossible to rule out with a simple local argument, which is exactly why the real Four Color proof needed an entirely different, exhaustive, computer-assisted approach.

EDGE COLORING AND VIZING'S THEOREM — A TIGHT TWO-VALUE BOUND: a proper edge coloring assigns colors to edges so that no two edges sharing a vertex share a color; the chromatic index $\chi'(G)$ is the minimum count. VIZING'S THEOREM (1964) proves, for any SIMPLE graph, $\Delta(G)\le\chi'(G)\le\Delta(G)+1$ — an extraordinarily tight bound, with only two possible values. Graphs achieving $\chi'=\Delta$ are CLASS 1 (e.g. bipartite graphs, by König's theorem); those requiring $\chi'=\Delta+1$ are CLASS 2 (e.g. $K_{2n+1}$, the Petersen graph). Determining WHICH class a given graph falls into is NP-hard in general (Holyer 1981) — even though the answer is known to be one of just two values. Vizing's theorem applies ONLY to simple graphs; for multigraphs with maximum edge multiplicity $\mu$, Shannon's theorem instead gives $\chi'\le\lfloor3\Delta/2\rfloor$, which can be far larger than $\Delta+1$.

## Mental Models
1. **Rung 1 — $\chi(G)$ is bounded from below by structure already present (cliques, independent sets) and from above by construction (greedy, Brooks).** Computing it exactly requires closing the gap between these two directions.
2. **Rung 2 — the clique number is a lower bound, never an equality in general.** Triangle-free graphs can still need arbitrarily many colors — sparseness in ONE structural sense (no triangles) does not bound chromatic number, a genuinely counter-intuitive fact worth sitting with.
3. **Rung 3 — a beautiful, complete, human-checkable proof (Five Color) and a fundamentally different, computer-verified proof (Four Color) can both be true theorems about closely related statements.** Proof STRUCTURE, not just the truth of a theorem, is itself worth attending to.
4. **Rung 4 — Vizing's theorem pins $\chi'(G)$ to one of exactly two adjacent values, yet determining WHICH one is NP-hard.** A tiny, tight numerical range does not imply an easy decision — range and decidability are separate axes.

## Why Students Fail
Having a genuine, provable lower bound ($\chi\ge\omega$) that is often tight on small, hand-drawn examples, students readily overgeneralize it to an equality, missing that the Mycielski construction exists specifically to demonstrate this gap can be made arbitrarily large — the failure is trusting a bound that happens to be tight in every example seen so far. Having just walked through the Five Color Theorem's elegant Kempe-chain proof, students can assume the "obvious next step" — running the identical argument with one fewer color — must also work, missing that Heawood's own historical correction of Kempe's 1879 error shows this exact extension genuinely fails, for a subtle reason (chain entanglement) invisible without deliberately probing it. Finally, Vizing's theorem's clean two-value bound can create a false sense that the remaining question (which of the two values) must also be easy, since the RANGE was so tightly pinned down — students conflate "we know the answer is one of two numbers" with "we can efficiently determine which," missing that Holyer's NP-hardness result specifically targets this remaining decision.

## Misconceptions

### MC-1: CHROMATIC-NUMBER-EQUALS-CLIQUE-NUMBER
- **Birth type:** Type 1 (overgeneralization) — critical (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Believing $\chi(G)=\omega(G)$ always — the clique number gives a lower bound ($\chi\ge\omega$) but not an equality; triangle-free graphs (Mycielski construction) can have arbitrarily large chromatic number while $\omega=2$.
- **Why this birth type:** Overgeneralization from small worked examples (where the bound IS tight, e.g. $K_4$, $C_5$-with-a-chord) to a universal claim — the student has not yet encountered a counterexample forcing the bound-versus-equality distinction.
- **Detection probe:** "If a graph has no triangle ($\omega=2$), is $\chi\le3$ guaranteed?" A student with MC-1 answers "yes."
- **Repair:** Present the Grötzsch graph (11 vertices, triangle-free, $\chi=4$) directly: $\omega=2$ but $\chi=4$, a clean, concrete counterexample to any general equality claim, reinforcing that $\chi\ge\omega$ is a one-directional bound.
- **Verification of death:** Given a triangle-free graph, the student states only that $\chi\ge2$ can be concluded from $\omega$ alone (via the general $\chi\ge\omega$ bound), without assuming any upper bound follows from clique structure.

### MC-2: FIVE-COLOR-PROOF-EXTENDS-TO-FOUR
- **Birth type:** Type 1 (overgeneralization) — foundational (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Believing the Kempe-chain argument used in the Five Color Theorem can be directly extended to prove the Four Color Theorem, missing that Kempe's own 1879 attempt using this exact idea contains an error found by Heawood in 1890.
- **Why this birth type:** Overgeneralization from "this proof technique worked for 5 colors" to "the same technique, applied with one fewer color, must also work" — a natural but unjustified extrapolation of a successful method to a superficially similar, harder case.
- **Detection probe:** "Why does the Kempe-chain argument used to prove the Five Color Theorem fail when attempted with only four colors?" A student with MC-2 cannot articulate a failure point, or assumes it simply "also works."
- **Repair:** Walk the specific entanglement: with five colors, the Kempe chain for colors 1-3 and the chain for colors 2-4 (both starting from $v$'s neighbors) provably cannot both pass through the same region in a way that blocks the swap, because a fifth color is always available as a "buffer." With only FOUR colors, no such buffer color exists, and the two chains CAN become entangled in a way a simple local swap cannot resolve — this is the exact gap Heawood identified in Kempe's original argument, and why the real Four Color proof required an entirely different, exhaustive method.
- **Verification of death:** Given the Five Color Theorem's proof, the student correctly identifies the specific step (the buffer-color availability in the Kempe-chain swap) that fails to generalize to four colors, rather than assuming the argument "just also works."

### MC-3: VIZING-HOLDS-FOR-MULTIGRAPHS
- **Birth type:** Type 1 (overgeneralization) — moderate (per this Blueprint's own severity rating, independently confirmed)
- **Description:** Applying Vizing's theorem ($\Delta\le\chi'\le\Delta+1$) to multigraphs, missing that it holds only for SIMPLE graphs; for multigraphs with maximum edge multiplicity $\mu$, the correct bound is Shannon's $\lfloor3\Delta/2\rfloor$, which can be far larger.
- **Why this birth type:** Overgeneralization of a theorem's stated hypothesis — "graph" is read informally to include multigraphs, when Vizing's own proof structure (an augmenting-path recoloring argument) genuinely requires the absence of parallel edges to go through.
- **Detection probe:** "Two vertices are joined by 4 parallel edges. Does Vizing's theorem bound $\chi'\le\Delta+1=5$ for this multigraph?" A student with MC-3 answers "yes," applying the simple-graph bound uncritically.
- **Repair:** Directly compute: with 4 parallel edges between two vertices, $\Delta=4$ and each color class can take at most one of the parallel edges (since they share both endpoints), so $\chi'=4=\Delta$ here — consistent by coincidence. But push further with a case where $\mu\approx\Delta$: Shannon's bound $\lfloor3\Delta/2\rfloor$ genuinely exceeds $\Delta+1$ for such graphs, showing Vizing's tighter bound is a simple-graph-only guarantee, not a universal one.
- **Verification of death:** Given a multigraph with parallel edges, the student applies Shannon's bound (not Vizing's) and states explicitly that Vizing's theorem's hypothesis excludes multigraphs.

## Analogies
1. **The height-vs-weight-class analogy (targets MC-1).** Knowing a boxer's weight class gives you a LOWER bound on how tall they plausibly are for that division, but it doesn't tell you their exact height — some boxers in a division are much taller than the minimum. Similarly, $\omega(G)$ gives a lower bound on $\chi(G)$, but the actual chromatic number can be much higher, especially for graphs cleverly constructed (like Mycielski's) to hide a small clique number behind a much larger coloring requirement.
2. **The recipe-that-almost-transfers analogy (targets MC-2).** A cooking technique perfected for a five-ingredient dish doesn't automatically work when you remove one ingredient — sometimes that missing ingredient was doing structural work (binding, buffering) you didn't notice until it's gone. The Five Color proof's fifth color plays exactly this buffering role in the Kempe-chain swap, and removing it (attempting four colors) breaks the argument in a specific, identifiable way.

## Demonstrations
### Demonstration 1 — chromatic number via bounds, breaking MC-1 (mirrors Blueprint Ex1)
Petersen graph ($n=10$, 3-regular, $\Delta=3$): not bipartite (odd girth 5) so $\chi\ge3$ via the odd-cycle lower bound. A 3-coloring exists explicitly (color the outer 5-cycle 1,2,1,2,3, breaking the odd cycle, then extend inward). Brooks' theorem: $\Delta=3$, Petersen is neither $K_4$ nor $C_5$, so $\chi\le3$. Combined with the lower bound: $\chi(\text{Petersen})=3$ exactly — the two directions meet.

### Demonstration 2 — the Five Color Theorem's constructive proof (mirrors Blueprint Ex2)
$G=K_6$ minus one edge $\{5,6\}$, $n=6$: vertices 5 and 6 have degree 4; all others have degree 5. Every vertex has $\deg\le5$, satisfying the induction's requirement. Pick $v=5$ ($\deg=4$): remove it, 5-color the remaining graph (which, on 5 vertices, needs at most 5 colors trivially), then reintroduce $v=5$ — its 4 neighbors use at most 4 distinct colors, leaving at least one of the 5 colors free. Note: $\chi(K_6)=6$ but $\chi(K_6-e)=5$, so this example genuinely needs all 5 colors — the theorem is tight here, not merely satisfied with room to spare.

### Demonstration 3 — Vizing's theorem, Class 1 vs. Class 2 (mirrors Blueprint Ex3)
$K_4$ ($\Delta=3$, 6 edges): three perfect matchings $\{12,34\}$, $\{13,24\}$, $\{14,23\}$ partition all 6 edges into 3 color classes — $\chi'(K_4)=3=\Delta$, Class 1. Contrast $K_3$ ($\Delta=2$, 3 edges): every matching has size at most 1 (any two edges share a vertex), so 3 separate colors are needed for 3 edges — $\chi'(K_3)=3=\Delta+1$, Class 2. Identical theorem, identical bound structure, opposite classification — determined by structure invisible from $\Delta$ alone.

## Discovery Questions
1. "If a graph has no triangles at all, must its chromatic number be small? Can you imagine (or look up) a triangle-free graph that still needs many colors?"
2. "The Five Color Theorem's proof uses a fifth color as a kind of safety buffer when swapping Kempe chains. What do you think happens to that buffer if you only have four colors to work with?"
3. "Vizing's theorem says $\chi'(G)$ is always either $\Delta$ or $\Delta+1$ — just two possible values. Does knowing there are only two options make it easy to figure out which one applies to a given graph?"

## Teaching Sequence
Best taught by **direct instruction, given this concept's Abstract CPA entry stage** — expert-level formal combinatorial arguments (Brooks' theorem, the Five Color proof, Vizing's theorem) benefit from precise statement and proof before exploration, though each misconception hook is best posed as a genuine question before the resolving demonstration is revealed.
1. Establish $\chi(G)$'s lower/upper bound structure and work Demonstration 1 (Petersen graph), posing Discovery Question 1 before revealing the Mycielski/Grötzsch counterexample to MC-1.
2. Work the Five Color Theorem's full constructive proof via Demonstration 2, posing Discovery Question 2 before contrasting with the Four Color Theorem's fundamentally different proof structure (resolving MC-2).
3. Introduce edge coloring and Vizing's theorem via Demonstration 3, posing Discovery Question 3 before revealing Holyer's NP-hardness result.
4. Assess with the P77 problem set and the $k$-critical-graph transfer probe (P76, independence mode).

## Tutor Actions
1. **On any $\chi(G)$ computation:** require the student to state BOTH a lower bound (from clique or independence structure) and an upper bound (from greedy or Brooks) before claiming an exact value.
2. **On the Five Color Theorem:** after completing the proof, always ask explicitly "would this exact argument work with one fewer color?" to surface MC-2 before it goes unaddressed.
3. **On Vizing's theorem:** always confirm the graph is SIMPLE (no parallel edges) before applying the $\Delta\le\chi'\le\Delta+1$ bound.

## Voice Teaching Notes
1. **Register:** expert/analytical — this concept assumes comfort with formal proof structure (induction, contradiction-by-counterexample) and NP-hardness framing from the domain's earlier entries.
2. **Load-bearing sentence, spoken slowly:** "A clique tells you a floor, not a ceiling — the true chromatic number can climb far above it."
3. **Wait time:** pause after Discovery Question 2, letting the student genuinely attempt to see where the four-color version of the Kempe-chain swap would break, before revealing Heawood's historical correction.

## Assessment Signals
1. **Gate concept:** correctly computes or bounds $\chi(G)$ for a novel graph using both lower-bound (clique/independence) and upper-bound (greedy/Brooks) techniques.
2. **Bound-vs-equality discrimination:** explicitly states that $\chi\ge\omega$ is a lower bound, not an equality, and can name or construct a graph where they diverge.
3. **Proof-structure articulation:** explains why the Five Color Theorem's Kempe-chain proof does not extend to four colors, citing the specific chain-entanglement issue.
4. **Edge-coloring classification:** correctly determines $\chi'(G)$ for small graphs and classifies them as Class 1 or Class 2, while correctly restricting Vizing's theorem to simple graphs.
5. **Transfer:** applies the $k$-critical graph framework (P76) to prove structural properties (minimum degree bound, edge count bound) from the criticality definition.

## Tutor Recovery Strategy
If the student assumes $\chi=\omega$, work the Grötzsch graph (or a smaller Mycielski-family example) explicitly, computing both quantities side by side until the gap is concrete and no longer surprising. If the student assumes the Five Color proof extends to four colors, walk the exact buffer-color argument a second time with a fresh planar graph, explicitly identifying where the four-color version would need an entangled swap the argument cannot resolve. If the student misapplies Vizing's theorem to a multigraph, work a specific high-multiplicity example against Shannon's bound until the simple-graph restriction is automatic.

## Memory Hooks
1. "Clique number is a floor for chromatic number, never a guaranteed ceiling."
2. "Five colors leave a buffer; four colors don't — that's exactly why Kempe's argument broke."
3. "Vizing pins the answer to one of two numbers — but which one is still hard to find."

## Transfer Connections
- **`math.disc.graph-coloring`:** the basic vertex-coloring definition, map-coloring motivation, and introductory chromatic-number concept this entry formalizes into Brooks' theorem, the Five Color Theorem's full constructive proof, and edge coloring via Vizing's theorem.
- **`math.graph.hamiltonian-cycle`:** shares the same "existence is efficiently guaranteed under a sufficient condition, but the fully general problem remains hard" structural pattern (Dirac's theorem there; the Four/Five Color Theorems' contrasting proof structures here) — a recurring theme across this domain, cross-referenced in that entry's own Transfer Connections.
- **`math.disc.combinatorics`:** the Mycielski construction and $k$-critical graph analysis (P76) both draw on general combinatorial counting and extremal-structure techniques developed there.

## Cross-Subject Connections
- **Computer Science (register allocation, scheduling):** graph coloring is the direct theoretical foundation of compiler register allocation and exam/job scheduling, where conflicting resources are modeled as adjacent vertices needing distinct colors.
- **Cartography and geography (the Four Color Theorem's original motivation):** the map-coloring problem that originally motivated the Four Color Theorem remains the canonical real-world framing for the entire chromatic-number theory developed here.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.graph.graph-coloring.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on $k$-critical graphs, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions independently confirmed against this program's own taxonomy: MC-1 Type 1 critical, MC-2 Type 1 foundational, MC-3 Type 1 moderate.
- Cross-link: `docs/curriculum/blueprints/math.disc.graph-coloring.md` and `educational-brain/concepts/mathematics/math.disc.graph-coloring.md` — both files were verified present via direct directory listing, so this concept's own already-authored EB sibling was read directly to ground this entry's Transfer Connections (that entry owns the introductory vertex-coloring definition and map-coloring motivation at basic depth; this entry owns the full formal apparatus — Brooks' theorem, the Five/Four Color proof-structure contrast, and Vizing's theorem).

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found on requires/unlocks/difficulty/bloom/mastery_threshold/estimated_hours — all match the live KG exactly.
- **Genuine Blueprint-staleness finding (not fixed, per standing program scope — Blueprints are never edited by this program):** this concept's own Blueprint (Component 7, Cross-Blueprint Dependencies, and its Validation Checklist V-5) states the `math.disc.graph-coloring` cross-link is "MISSING on disk" and sets $P76_{mode}=$ independence on that basis. This is factually stale — verified via direct directory listing that BOTH `docs/curriculum/blueprints/math.disc.graph-coloring.md` AND `educational-brain/concepts/mathematics/math.disc.graph-coloring.md` genuinely exist. This entry follows the corrected, current state: the cross-link target is already authored, and its misconception register was consulted directly to ground this entry's own Transfer Connections, per this program's established case-2 cross-link handling (substantive incorporation of an already-authored peer entry) rather than the Blueprint's stale independence-mode declaration. This mirrors the exact discipline established in Batch 24's `math.graph.minimum-spanning-tree.md` entry, whose own Blueprint carried the identical class of stale claim about a different, since-authored sibling.

## Version History
- **Batch 25** (2026-09-12): initial authoring, part 4 of 4 this batch (with `math.graph.connectivity`, `math.graph.eulerian-circuit`, `math.graph.hamiltonian-cycle`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1 critical, MC-2 Type 1 foundational, MC-3 Type 1 moderate); one genuine Blueprint-staleness finding recorded regarding the `math.disc.graph-coloring` cross-link (confirmed authored, contrary to the Blueprint's own stale "MISSING on disk" claim).
