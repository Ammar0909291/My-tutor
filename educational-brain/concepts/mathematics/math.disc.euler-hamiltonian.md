# math.disc.euler-hamiltonian — Euler and Hamiltonian Paths

## Identity
- **KG ID:** `math.disc.euler-hamiltonian`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.graph-connectivity`
- **Unlocks:** (none in KG)
- **Cross-links:** `math.graph.eulerian-circuit`, `math.graph.hamiltonian-cycle` (both have Blueprints, no EB entries yet — see Curriculum Feedback)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 4

## Learning Objective
By the end of this concept, the student can: (1) state Euler's theorem precisely — a connected graph has an EULERIAN CIRCUIT if and only if every vertex has EVEN degree — and apply it to determine existence directly from vertex degrees, without attempting to trace a route; (2) apply Euler's theorem to the historical Seven Bridges of Königsberg problem, and extend the criterion to the OPEN case: a connected graph has an Eulerian PATH if and only if it has exactly 0 or 2 odd-degree vertices; (3) at orientation level, contrast the Eulerian case (a simple, efficiently checkable degree condition) against the HAMILTONIAN CYCLE case (visiting every vertex exactly once; NP-complete in general), recognizing the two properties as logically INDEPENDENT.

## Core Understanding
A connected graph has an EULERIAN CIRCUIT — a closed walk using every EDGE exactly once, returning to its starting vertex — if and only if EVERY vertex has EVEN degree. This is a genuine "if and only if": checking existence requires only counting degrees (an efficient $O(V)$ computation), never attempting to construct or search for the circuit itself. The intuition: every time the walk passes THROUGH a vertex, it uses two of that vertex's edge-slots (one arriving, one leaving); for the walk to pass through cleanly every time and eventually return to close the loop, each vertex's edges must pair up completely — possible only when degree is even.

Relaxing the closed-return requirement gives the OPEN case: a connected graph has an EULERIAN PATH (using every edge exactly once, but starting and ending at DIFFERENT vertices) if and only if EXACTLY 0 or 2 vertices have odd degree. Zero odd-degree vertices recovers the closed-circuit case; exactly two odd-degree vertices means an open path exists, necessarily starting at one odd-degree vertex and ending at the other. Failing the all-even CIRCUIT condition does NOT mean no Eulerian structure exists at all — the exactly-two-odd-vertices case still guarantees a genuine open path.

A HAMILTONIAN CYCLE visits every VERTEX exactly once (edges may be skipped) and returns to the start — superficially similar to an Eulerian circuit ("visit everything exactly once"), but governed by fundamentally different mathematics. Unlike Euler's clean degree-based criterion, NO known simple characterization exists for Hamiltonian cycle existence — determining it is NP-COMPLETE in general, meaning no efficient algorithm is known or believed to exist for arbitrary graphs. The two properties are logically INDEPENDENT: a graph can have an Eulerian circuit without a Hamiltonian cycle (and vice versa), since one property concerns EDGES and the other concerns VERTICES, with no structural implication running from one to the other.

## Mental Models
1. **Rung 1 — Euler's theorem turns "does a circuit exist?" into pure arithmetic.** Count degrees; one odd degree already answers the question, with no tracing needed.
2. **Rung 2 — exactly two odd-degree vertices still gives a genuine (open) Eulerian structure.** Failing the closed-circuit condition is not the same as failing every Eulerian condition.
3. **Rung 3 — "visit every edge once" and "visit every vertex once" are governed by completely different mathematics.** One has an efficient degree test; the other is NP-complete — a genuine complexity-class gap, not a difference of degree.
4. **Rung 4 — Eulerian and Hamiltonian are logically independent properties.** Neither implies the other; a single graph (the bowtie) can demonstrably have one without the other.

## Why Students Fail
Without the degree criterion firmly internalized, the natural instinct when asked "does an Eulerian circuit exist?" is to attempt tracing a route by trial and error — an approach that can work by luck on small graphs but misses that the question has a direct, efficient arithmetic answer requiring no construction attempt at all. Separately, seeing that all-even degree gives a circuit, students often overgeneralize to "any odd-degree vertex rules out ALL Eulerian structure," missing the genuinely useful intermediate case (exactly two odd vertices, giving an open path) between the all-even circuit case and total failure. Finally, both Eulerian and Hamiltonian properties share the surface framing "visit everything exactly once," inviting a natural but false assumption that they are essentially the same kind of property, or that one implies the other — when in fact they differ not just in scope (edges vs. vertices) but in fundamental computational difficulty.

## Misconceptions

### MC-1: TRACING-REQUIRED-TO-DETERMINE-EXISTENCE
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Believing Eulerian circuit existence can only be determined by attempting to trace a route, missing that Euler's degree-based iff criterion answers existence directly with no construction attempt needed.
- **Why this birth type:** An overgeneralization of the natural, pre-theorem instinct that "to know if a route exists, try to find one" — a reasonable default strategy for many search problems that happens to be entirely unnecessary here, since Euler's theorem replaces the search with a direct arithmetic check the student has not yet learned to trust over their own trial-and-error instinct.
- **Detection probe:** "To determine whether a graph has an Eulerian circuit, do you need to attempt tracing a route and see if it works?" A student with MC-1 answers "yes."
- **Repair:** Work the diagonal-edge modification (Demonstration 1) explicitly, showing the answer flips from yes to no purely by recomputing degrees — no attempted trace, successful or failed, enters into the determination at all.
- **Verification of death:** Given a novel graph, the student determines Eulerian circuit existence by counting degrees alone, without attempting or describing a trace.

### MC-2: ODD-VERTICES-IMPLY-NO-EULERIAN-STRUCTURE
- **Birth type:** Type 1 (overgeneralization) — high
- **Description:** Believing any odd-degree vertex rules out all Eulerian structure, missing that exactly two odd vertices still guarantees an open Eulerian path between those two vertices.
- **Why this birth type:** An overgeneralization from the correctly-learned all-even CIRCUIT condition, extended (incorrectly) to treat "not all even" as equivalent to "no Eulerian structure of any kind" — missing that the theorem has a genuinely useful intermediate case (exactly two odd) the all-or-nothing generalization discards.
- **Detection probe:** "A connected graph has exactly two odd-degree vertices. Does it have any Eulerian structure at all?" A student with MC-2 answers "no."
- **Repair:** Work the path-graph example (Demonstration 2) explicitly, showing it fails the all-even circuit condition yet still has a genuine Eulerian PATH — state the rule precisely: exactly 0 or 2 odd vertices, not "zero only."
- **Verification of death:** Given a novel connected graph with exactly two odd-degree vertices, the student correctly identifies that an open Eulerian path exists between those two vertices.

### MC-3: EULERIAN-IMPLIES-HAMILTONIAN
- **Birth type:** Type 6 (analogy overextension) — moderate
- **Description:** Conflating Eulerian circuits with Hamiltonian cycles as essentially the same kind of property, missing their logical independence and the deep complexity-class gap between them.
- **Why this birth type:** An overextension of the surface-level similarity between the two definitions ("visit every X exactly once") into an assumed structural relationship — the shared phrasing invites treating them as variations on one idea rather than recognizing they concern entirely different graph elements (edges vs. vertices) governed by entirely different mathematics.
- **Detection probe:** "If a graph has an Eulerian circuit, must it also have a Hamiltonian cycle?" A student with MC-3 answers "yes."
- **Repair:** Present the bowtie graph (Demonstration 3) as a concrete, hand-verifiable counterexample: all vertices even (Eulerian circuit exists), yet the shared vertex $C$ forces any vertex-visiting-once cycle to fail (no Hamiltonian cycle). State the rule: these are independent properties governed by different complexity classes.
- **Verification of death:** Given a novel graph with an Eulerian circuit, the student does not assume a Hamiltonian cycle also exists, and can articulate why the two properties are logically independent.

## Analogies
1. **The mail-carrier-vs-tour-guide analogy.** An Eulerian circuit is like a mail carrier who must walk down EVERY STREET exactly once and return home — a question answerable by counting street intersections (degrees). A Hamiltonian cycle is like a tour guide who must visit EVERY STOP exactly once and return — a fundamentally harder planning problem with no simple counting trick.
2. **The bowtie-bottleneck analogy.** The bowtie graph's shared vertex $C$ is like a single doorway connecting two rooms — a mail carrier can pass through it twice (once per room's circuit), but a tour guide visiting each ROOM's furniture exactly once cannot avoid passing through that one doorway more than once to connect both rooms.

## Demonstrations
### Demonstration 1 — Euler's theorem applied by degree count alone, breaking MC-1 (mirrors Blueprint Ex1)
A 4-cycle $A,B,C,D$: every vertex has degree 2 (even) — an Eulerian circuit exists, confirmed by tracing $A\to B\to C\to D\to A$. Adding the diagonal $A$-$C$: now $A,C$ have degree 3 (odd) — Euler's theorem immediately says NO circuit exists, determined purely by degree count.

### Demonstration 2 — Seven Bridges and the open-path extension, breaking MC-2 (mirrors Blueprint Ex2)
Königsberg's four landmasses have degrees $3,3,3,5$ — all odd, so no Eulerian circuit exists (Euler's 1736 resolution). Contrast: a path graph $A$-$B$-$C$-$D$-$E$ has degrees $1,2,2,2,1$ — exactly two odd vertices ($A,E$) — failing the circuit condition but satisfying the open-path condition: $A\to B\to C\to D\to E$ uses every edge exactly once.

### Demonstration 3 — Eulerian/Hamiltonian independence, breaking MC-3 (mirrors Blueprint Ex3)
The "bowtie" graph — two triangles sharing vertex $C$ — has all vertices even degree ($C$ has degree 4; others degree 2), so an Eulerian circuit exists. But $C$ is the ONLY connection between the two triangles, so any cycle visiting every vertex exactly once cannot connect both triangles without revisiting $C$ — no Hamiltonian cycle exists. One graph, one property present, the other genuinely absent.

## Discovery Questions
1. "If a walk passes THROUGH a vertex (not starting or ending there), how many of that vertex's edges does it use up — and what does that tell you about what degree the vertex needs for the walk to pass through cleanly every time?"
2. "If a connected graph has exactly two odd-degree vertices, does that failing the all-even circuit test mean NO Eulerian structure exists — or could there still be a path, just not a closed loop?"
3. "'Visit every edge once' and 'visit every vertex once' sound similar. Does having an efficient test for one guarantee an efficient test exists for the other?"

## Teaching Sequence
Best taught by **direct instruction of Euler's theorem with a discovery-driven derivation of the degree criterion, and guided discovery for the Eulerian/Hamiltonian independence** — Discovery Question 1 lets the student derive WHY even degree is required (by reasoning about a walk passing through a vertex) rather than being told the rule outright, and Discovery Question 3 lets the student predict, before being shown the bowtie counterexample, that the two properties might not be as related as they superficially appear.
1. Pose Discovery Question 1 and let the student reason toward the even-degree requirement before stating Euler's theorem formally.
2. Work Demonstration 1's degree-only determination directly (targeting MC-1).
3. Pose Discovery Question 2, then work Demonstration 2's Königsberg/open-path contrast (targeting MC-2).
4. Pose Discovery Question 3, then present Demonstration 3's bowtie counterexample (targeting MC-3), naming NP-completeness at orientation level only.
5. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On an Eulerian-circuit existence question:** always require a degree count first, actively discouraging an attempted trace as the determination method.
2. **On a graph with some odd-degree vertices:** ask "exactly how many odd vertices?" before concluding anything, to distinguish the exactly-two case from total failure.
3. **On an Eulerian/Hamiltonian comparison:** consistently emphasize the edges-vs-vertices distinction and the efficient-test-vs-NP-complete complexity gap.
4. **On the NP-completeness framing:** keep strictly at orientation level — name the complexity gap without attempting to prove or fully explain NP-completeness itself.

## Voice Teaching Notes
1. **Register:** puzzle-resolving and historically grounded — the Königsberg story gives this concept genuine narrative hooks that support engagement with an otherwise abstract degree criterion.
2. **Load-bearing sentence, spoken slowly:** "Count degrees — that's the whole test. No tracing required."
3. **Wait time:** pause after posing Discovery Question 1, giving the student space to reason about "arriving and leaving" before the even-degree requirement is confirmed.

## Assessment Signals
1. **Gate concept:** correctly determines Eulerian circuit existence for a novel graph via degree count alone.
2. **Open-path recognition:** correctly identifies the exactly-two-odd-vertices case as still guaranteeing an Eulerian path, distinct from total failure.
3. **Independence awareness:** given a graph with an Eulerian circuit, does not assume a Hamiltonian cycle also exists, and vice versa.
4. **Complexity-gap accuracy:** correctly states that Eulerian existence is efficiently checkable while Hamiltonian existence is NP-complete in general.
5. **Transfer:** applies Euler's theorem and the Eulerian/Hamiltonian distinction in a novel real-world-framed scenario (e.g. a building/hallway layout).

## Tutor Recovery Strategy
If the student persists in attempting to trace routes to determine existence, have them predict the answer via degree count FIRST, then verify (or not) by tracing, so the degree-based prediction is seen to be reliably correct before the tracing habit is dropped. If the student conflates Eulerian and Hamiltonian properties, work through the bowtie graph's specific bottleneck ($C$) concretely until the structural reason for the divergence becomes visible rather than asserted.

## Memory Hooks
1. "All even degree → Eulerian circuit. Exactly two odd → Eulerian path. Count, don't trace."
2. "Failing the circuit test isn't failing everything — check for exactly two odd vertices."
3. "Eulerian is easy (count degrees); Hamiltonian is hard (NP-complete) — and neither implies the other."

## Transfer Connections
- **`math.disc.graph-connectivity`:** the path/cycle/connectedness vocabulary this concept's degree-based criteria directly build on.
- **`math.disc.graph-types`:** the Handshaking Lemma and degree-sequence concepts this concept's degree criterion directly applies.

## Cross-Subject Connections
- **Computer Science (route planning, network traversal):** Eulerian path/circuit existence directly models efficient network-traversal problems (e.g. mail delivery, network cable inspection routes).
- **Operations research (the Traveling Salesman Problem):** the Hamiltonian cycle problem is the unweighted ancestor of the Traveling Salesman Problem, one of the most-studied NP-complete problems in optimization.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.euler-hamiltonian.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe). Not restated verbatim; this entry adds birth-type classification (this Blueprint did not pre-assign birth types), mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- **Cross-link status clarified**, matching the intermediate case first identified in Batch 21's `math.disc.graph-coloring`: both `math.graph.eulerian-circuit` and `math.graph.hamiltonian-cycle` have genuine Blueprints but NO Educational Brain entries yet (the entire `math.graph` subject, 0/16, is unstarted). This entry's Transfer Connections section does not cite either as a peer entry, avoiding misrepresentation of the corpus's current state.
- No genuine content-overlap was found with `math.disc.graph-connectivity` — that entry owns paths/cycles/connectedness in general; this entry owns the DEGREE-BASED existence criteria for Eulerian structures and the qualitative Hamiltonian contrast, built on top of that vocabulary without re-deriving it.

## Version History
- **Batch 22** (2026-09-11): initial authoring, part 1 of 3 this batch (with `math.disc.graph-trees` and `math.disc.planar-graph`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1 foundational, MC-2 Type 1 high, MC-3 Type 6 moderate) — birth types independently derived, since this Blueprint does not pre-assign them.
