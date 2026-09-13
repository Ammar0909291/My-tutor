# math.disc.graph-coloring — Graph Coloring

## Identity
- **KG ID:** `math.disc.graph-coloring`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.graph`
- **Unlocks:** (none in KG)
- **Cross-links:** `math.graph.graph-coloring` (Blueprint exists, no EB entry yet — see Curriculum Feedback)
- **Difficulty:** proficient
- **Bloom level:** analyze
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 4

## Learning Objective
By the end of this concept, the student can: (1) define proper vertex coloring and the chromatic number $\chi(G)$, applying the greedy coloring algorithm while recognizing it gives only an UPPER bound ($\le\Delta(G)+1$), never automatically the exact chromatic number; (2) prove a chromatic number exactly by combining a lower-bound argument (clique number $\omega(G)$ or an odd cycle) with an explicit coloring (upper bound), and state key values ($\chi(K_n)=n$, bipartite $\chi\le2$, odd cycle $\chi=3$, planar $\chi\le4$ per the Four Color Theorem); (3) compute the chromatic polynomial $P(G,k)$ via deletion-contraction for small graphs, correctly distinguishing it (a polynomial function of $k$) from the chromatic number (a single integer, its smallest positive root).

## Core Understanding
A PROPER VERTEX COLORING assigns a color to each vertex so no two adjacent vertices share a color; the CHROMATIC NUMBER $\chi(G)$ is the minimum number of colors needed. Establishing $\chi(G)=k$ exactly requires TWO separate arguments: an UPPER bound (exhibit a valid $k$-coloring, proving $\chi(G)\le k$) and a LOWER bound (prove no $(k-1)$-coloring can work, proving $\chi(G)\ge k$) — neither alone suffices.

Standard lower-bound tools: the CLIQUE lower bound $\chi(G)\ge\omega(G)$ (a $k$-clique needs $k$ mutually-distinct colors, since every pair is adjacent), and the ODD-CYCLE argument ($\chi=3$ for any odd cycle, since alternating 2-coloring always fails to close the loop). Standard upper-bound tools: the GREEDY algorithm (order vertices arbitrarily, assign each the smallest color not used by its already-colored neighbors, giving $\chi(G)\le\Delta(G)+1$ where $\Delta(G)$ is the maximum degree), and BROOKS' THEOREM (for a connected graph that is neither a complete graph nor an odd cycle, $\chi(G)\le\Delta(G)$ — tightening the greedy bound by one for "generic" graphs).

Critically, the greedy algorithm's OUTPUT count is order-dependent and gives only an UPPER bound on $\chi(G)$ — it is NOT automatically the exact chromatic number, since a poorly-chosen vertex ordering can use more colors than the true minimum requires. Only when a matching lower bound (typically clique or odd-cycle) independently confirms the same value does $\chi(G)$ become genuinely established.

Key established values: $\chi(K_n)=n$ (complete graph), $\chi(\text{bipartite})\le2$ (and bipartite iff 2-colorable), $\chi(\text{odd cycle})=3$, $\chi(\text{even cycle})=2$, and the FOUR COLOR THEOREM ($\chi\le4$ for every planar graph) — one of the deepest results in combinatorics, first proved in 1976 via computer-assisted verification of 1,936 reducible configurations, with no known short human-verifiable proof.

The CHROMATIC POLYNOMIAL $P(G,k)$ counts the number of proper colorings of $G$ using a palette of $k$ colors — a POLYNOMIAL FUNCTION of $k$, computable via the deletion-contraction recurrence $P(G,k)=P(G-e,k)-P(G/e,k)$ for any edge $e$. The chromatic number is recovered as the SMALLEST positive integer $k$ for which $P(G,k)>0$ — the polynomial's smallest positive root plus one, in effect; $P(G,k)$ and $\chi(G)$ are genuinely different mathematical objects (a function vs. a single integer derived from it), not interchangeable notation for the same idea.

## Mental Models
1. **Rung 1 — establishing $\chi(G)=k$ needs TWO proofs: an upper bound (a working $k$-coloring) and a lower bound (why $k-1$ fails).** Neither alone establishes the exact value.
2. **Rung 2 — greedy gives A valid coloring, not automatically THE minimum coloring.** Greedy's output is order-dependent and only ever an upper bound; matching it against an independent lower bound is what confirms exactness.
3. **Rung 3 — the Four Color Theorem's difficulty is entirely in the UPPER bound direction.** The lower bound (some planar graph needs 4 colors) is trivial ($K_4$ is planar); proving 4 colors always SUFFICE is the genuinely hard, computer-assisted result.
4. **Rung 4 — $P(G,k)$ is a function; $\chi(G)$ is one specific integer derived from that function.** $\chi(G)$ is the smallest $k$ where $P(G,k)$ first becomes positive, found by evaluating the polynomial at successive integers, not by substituting a value already guessed.

## Why Students Fail
Because greedy coloring is the first algorithm taught and always produces A valid coloring, students naturally conflate "a valid coloring greedy produced" with "the minimum coloring," missing that the lower-bound half of the proof (clique number or odd-cycle argument) requires an entirely separate argument greedy itself cannot supply. Separately, the Four Color Theorem's simple-sounding statement ("4 colors always suffice for a map") invites either dismissing it as obvious or, in the opposite direction, attempting a short hand-proof — both responses miss that the genuine difficulty (the upper-bound direction) required an unprecedented computer-assisted verification, one of the first major theorems proved this way. Finally, $P(G,k)$ and $\chi(G)$ share the same variable $k$ and are introduced close together, inviting a notational conflation between the polynomial itself and the single integer value ($\chi(G)$) that the polynomial's smallest positive root reveals.

## Misconceptions

### MC-1: CHROMATIC-NUMBER-EQUALS-GREEDY-COLORS
- **Birth type:** Type 5 (instruction-induced) — foundational (per this Blueprint's own classification, independently confirmed)
- **Description:** Believing the number of colors produced by the greedy algorithm equals $\chi(G)$; applying greedy and reporting that count as the exact chromatic number without verifying it as a lower bound too.
- **Why this birth type:** Instruction-induced: greedy is the FIRST coloring algorithm taught, and it always produces a valid coloring — so students naturally conflate "a valid coloring" with "the minimum coloring," since the gap between the two (greedy gives $\chi(G)\le\text{greedy-count}\le\Delta+1$, not equality) requires a SEPARATE lower-bound argument that greedy's own procedure never supplies.
- **Detection probe:** "You run greedy on a graph and it uses 4 colors. Is $\chi(G)=4$?" A student with MC-1 answers "yes" without asking for a lower-bound justification.
- **Repair:** State explicitly: proving $\chi(G)=k$ requires BOTH an upper bound (greedy or any explicit coloring) AND a lower bound (clique number or odd-cycle argument) independently confirming the same value. Present a graph where greedy, under a poor ordering, uses MORE colors than $\chi(G)$ actually requires (e.g. a bipartite "crown graph" where a bad ordering yields many colors despite $\chi=2$).
- **Verification of death:** Given a novel graph's greedy output, the student explicitly asks for or supplies an independent lower-bound argument before claiming the greedy count equals $\chi(G)$.

### MC-2: FOUR-COLOR-THEOREM-IS-OBVIOUS
- **Birth type:** Type 1 (overgeneralization) — moderate (per this Blueprint's own classification, independently confirmed)
- **Description:** Treating the Four Color Theorem as trivially obvious ("just use four colors"), or conversely attempting to prove it by hand in a few lines, missing that it is one of the deepest results in combinatorics with no known short human-verifiable proof.
- **Why this birth type:** An overgeneralization from the theorem's simple-sounding STATEMENT ("every planar graph needs at most 4 colors") to an assumption that the PROOF must be similarly simple — a reasonable-seeming inference that fails here because the genuine difficulty lies entirely in the upper-bound direction, requiring exhaustive case analysis (1,936 configurations) that is computer-verifiable but not humanly traceable in full.
- **Detection probe:** "Can you sketch a short proof that every planar graph is 4-colorable?" A student with MC-2 attempts a brief hand-argument, or alternatively dismisses the question as unnecessary since "it's obviously true."
- **Repair:** Distinguish the two directions explicitly: the LOWER bound (some planar graph genuinely needs 4 colors) is trivial — $K_4$ is planar and $\chi(K_4)=4$. The UPPER bound (4 colors always suffice for ANY planar graph) resisted proof for 124 years and was finally settled in 1976 via 1,200 hours of computer verification checking 1,936 reducible configurations — a fundamentally different scale of difficulty from the lower bound.
- **Verification of death:** The student correctly identifies that the Four Color Theorem's difficulty is entirely in the upper-bound direction, and that the lower bound (via $K_4$) is comparatively trivial.

### MC-3: CHROMATIC-POLYNOMIAL-IS-CHROMATIC-NUMBER
- **Birth type:** Type 4 (notation-induced) — moderate (per this Blueprint's own classification, independently confirmed)
- **Description:** Confusing $P(G,k)$ (the number of proper colorings using at most $k$ colors, a polynomial in $k$) with $\chi(G)$ (the minimum $k$ for which $P(G,k)>0$) — e.g. saying "the chromatic polynomial is 3" when meaning $\chi(G)=3$.
- **Why this birth type:** Notation-induced: $P(G,k)$ and $\chi(G)$ share the same variable $k$ and appear close together in instruction, inviting a surface-level conflation between the FUNCTION (which evaluates to a number for each specific $k$) and the SPECIFIC INTEGER ($\chi(G)$) that the function's smallest positive root reveals.
- **Detection probe:** "What is the chromatic polynomial of $K_3$?" A student with MC-3 answers "3" (confusing it with $\chi(K_3)=3$) instead of the correct polynomial expression $P(K_3,k)=k(k-1)(k-2)$.
- **Repair:** Evaluate $P(K_3,k)$ at successive small integers explicitly: $P(K_3,1)=0$ (can't 1-color a triangle), $P(K_3,2)=0$ (can't 2-color it either), $P(K_3,3)=6$ (six valid 3-colorings) — so $\chi(K_3)=3$ is the SMALLEST $k$ where the polynomial first becomes positive, not the polynomial itself.
- **Verification of death:** Given a novel graph, the student correctly computes and states the chromatic polynomial as a polynomial EXPRESSION, then separately identifies $\chi(G)$ as the smallest positive integer at which that expression is positive.

## Analogies
1. **The two-sided-proof analogy.** Proving $\chi(G)=k$ is like proving a container holds exactly $k$ liters: you must show it CAN hold $k$ (pour in $k$ liters successfully — the upper bound) AND that it CANNOT hold $k+1$ (it overflows — actually, more precisely, that fewer than $k$ liters is insufficient for the intended purpose, mirroring the lower bound's "no smaller number works" direction).
2. **The polynomial-vs-root analogy.** $P(G,k)$ is like a function $y=f(k)$ graphed on paper; $\chi(G)$ is the specific $k$-value where the graph first crosses above zero — the whole curve is the polynomial, one particular point on it is the chromatic number.

## Demonstrations
### Demonstration 1 — establishing $\chi(K_4)=4$ via both bounds, breaking MC-1 (mirrors Blueprint's A01 checkpoint)
Upper bound: an explicit 4-coloring of $K_4$ (vertex 1 gets A, vertex 2 gets B, vertex 3 gets C, vertex 4 gets D) shows $\chi(K_4)\le4$. Lower bound: $K_4$ is itself a 4-clique, so $\omega(K_4)=4$, giving $\chi(K_4)\ge4$. Together: $\chi(K_4)=4$.

### Demonstration 2 — the Four Color Theorem's asymmetric difficulty, breaking MC-2 (mirrors Blueprint's TB-R01 Step 2)
Lower bound for planar graphs generally: $K_4$ is planar (draw 3 vertices as a triangle, 1 in the center connected to all three) and $\chi(K_4)=4$ — trivial. Upper bound (every planar graph is 4-colorable): resisted proof for 124 years (conjectured 1852), finally settled in 1976 by exhaustive computer verification of 1,936 configurations, with no known short human-checkable proof today.

### Demonstration 3 — chromatic polynomial vs. chromatic number, breaking MC-3 (mirrors Blueprint's TB-R02)
$P(K_3,k)=k(k-1)(k-2)$. At $k=1$: $P=0$. At $k=2$: $P=0$. At $k=3$: $P=6$ (six valid 3-colorings of a triangle). So $\chi(K_3)=3$ is the smallest positive $k$ where the polynomial first becomes positive.

## Discovery Questions
1. "If greedy coloring always produces A valid coloring, does the FACT that it produced one using $k$ colors, by itself, tell you that $k-1$ colors would have been impossible?"
2. "$K_4$ (a 4-clique) is planar and needs exactly 4 colors. Does that fact alone prove the FULL Four Color Theorem — that EVERY planar graph needs at most 4? What's the difference between what $K_4$ proves and what the full theorem claims?"
3. "If $P(G,k)$ is a polynomial, what would it even mean to ask 'is the polynomial equal to 3'? What question would you actually need to ask to find $\chi(G)$?"

## Teaching Sequence
Best taught by **direct instruction of the upper/lower-bound proof structure and the polynomial-vs-number distinction, with guided discovery of the Four Color Theorem's asymmetric difficulty** — the two-part proof requirement and the polynomial/number distinction are procedural facts efficiently stated and drilled directly; Discovery Question 2 lets the student themselves articulate why a trivial lower bound ($K_4$) does not constitute a proof of the full theorem, building genuine appreciation for the upper bound's difficulty rather than being told it is hard.
1. Introduce proper coloring and $\chi(G)$, working Demonstration 1's two-part proof directly.
2. Pose Discovery Question 1, reinforcing that greedy alone never proves exactness (targeting MC-1).
3. State key chromatic values (complete, bipartite, cycles) and introduce the Four Color Theorem's statement.
4. Pose Discovery Question 2, then work Demonstration 2's asymmetric-difficulty contrast (targeting MC-2).
5. Introduce the chromatic polynomial and deletion-contraction; pose Discovery Question 3 before working Demonstration 3 (targeting MC-3).
6. Assess with the P77 problem set and cross-link transfer probe.

## Tutor Actions
1. **On a greedy-coloring result:** always ask for an accompanying lower-bound argument before accepting the greedy count as the true chromatic number.
2. **On a Four Color Theorem discussion:** explicitly separate the trivial lower bound ($K_4$ needs 4) from the genuinely hard upper bound (4 always suffices), naming the 1976 computer-verification history.
3. **On a chromatic-polynomial computation:** require the student to state whether their answer is a polynomial EXPRESSION or a single INTEGER before accepting it, to preempt MC-3.
4. **On the deletion-contraction recurrence:** work through it explicitly for a small graph rather than presenting $P(G,k)$ results as facts to memorize.

## Voice Teaching Notes
1. **Register:** rigorous and proof-structure-focused — this concept's central discipline is the two-part (upper+lower) proof requirement, so language should consistently reinforce "have you shown BOTH halves?"
2. **Load-bearing sentence, spoken slowly:** "Greedy gives an upper bound — you still need a lower bound to know it's exact."
3. **Wait time:** pause after posing Discovery Question 2, giving the student space to articulate why $K_4$'s trivial lower bound doesn't by itself prove the full Four Color Theorem.

## Assessment Signals
1. **Gate concept:** correctly determines $\chi(G)$ for a novel small graph by supplying BOTH an upper-bound coloring and a lower-bound argument.
2. **Greedy-limitation awareness:** given a greedy-coloring result, does not accept it as $\chi(G)$ without an independent lower bound.
3. **Four Color Theorem accuracy:** correctly states that the theorem's difficulty is entirely in the upper-bound direction, distinguishing it from the trivial $K_4$-based lower bound.
4. **Polynomial/number discrimination:** correctly computes a chromatic polynomial as an expression and separately identifies $\chi(G)$ as its smallest positive root.
5. **Transfer:** applies chromatic-number reasoning to a novel real-world scenario (e.g. register allocation or scheduling), correctly modeling it as a coloring problem.

## Tutor Recovery Strategy
If the student consistently accepts greedy's output as exact, present a graph where a deliberately bad vertex ordering makes greedy use visibly more colors than the true $\chi(G)$, making the order-dependence and the gap concrete. If the student conflates $P(G,k)$ with $\chi(G)$, have them evaluate the polynomial at several successive integers by hand (as in Demonstration 3) until the "smallest positive root" framing becomes the natural way to find $\chi(G)$.

## Memory Hooks
1. "Chromatic number needs TWO proofs: an upper bound AND a lower bound."
2. "The Four Color Theorem's hard part is the UPPER bound — the lower bound ($K_4$) is trivial."
3. "$P(G,k)$ is a function; $\chi(G)$ is the smallest $k$ where that function turns positive."

## Transfer Connections
- **`math.disc.graph`:** the vertex/edge/degree vocabulary this concept's coloring definitions and greedy-algorithm bound ($\Delta(G)+1$) directly build on.
- **`math.disc.graph-connectivity`, `math.disc.graph-types`:** sibling graph-theory concepts, both authored this same batch, sharing the `math.disc.graph` prerequisite.

## Cross-Subject Connections
- **Computer Science (compiler register allocation):** graph coloring directly models assigning a limited number of hardware registers to program variables, with $\chi(G)$ determining the minimum registers needed.
- **Telecommunications (frequency assignment):** assigning non-conflicting radio frequencies to nearby transmitters is a direct graph-coloring application, with adjacency representing interference.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.graph-coloring.md` — reused by reference throughout (Learning Objective, worked examples, misconception inventory MC-1–MC-3 with birth types already assigned in the Blueprint itself and confirmed independently here, cross-link transfer probe). Not restated verbatim; this entry adds the mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- **Cross-link status clarified, not a discrepancy to fix:** the KG's `cross_links: ['math.graph.graph-coloring']` and the Blueprint's declared "Cross-link mode" both check out against a genuine Blueprint file at `docs/curriculum/blueprints/math.graph.graph-coloring.md` — but that target concept has NO Educational Brain entry yet, since the entire `math.graph` subject (0/16) is unstarted in this campaign. This is a new intermediate case for this program's Curriculum Feedback convention: not full independence (a real Blueprint does exist and could inform a future cross-reference), but also not the "genuinely non-empty, already-authored cross-link" incorporated substantively in `binomial-theorem` (Batch 19) or `propositional-logic` (Batch 20), since there is no EB SIBLING entry yet to cite. This entry's Transfer Connections section therefore does not cite `math.graph.graph-coloring` as a peer entry — that would misrepresent the state of the corpus.
- No genuine content-overlap was found with sibling `math.disc` graph-theory entries authored this batch (`graph-connectivity`, `graph-types`) — each targets a distinct structural property (coloring vs. connectivity vs. classification).

## Version History
- **Batch 21** (2026-09-11): initial authoring, part 2 of 5 this batch (with `math.disc.boolean-circuits`, `math.disc.graph-connectivity`, `math.disc.graph-types`, `math.disc.predicate-logic-disc`). Blueprint reused by reference, including its own already-assigned birth-type classifications (MC-1 Type 5 foundational, MC-2 Type 1 moderate, MC-3 Type 4 moderate), independently confirmed.
