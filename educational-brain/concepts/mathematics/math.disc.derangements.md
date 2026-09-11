# math.disc.derangements — Derangements

## Identity
- **KG ID:** `math.disc.derangements`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.inclusion-exclusion`
- **Unlocks:** (none in KG)
- **Cross-links:** (none)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) compute $D(n)$, the number of derangements of $n$ elements — permutations with NO fixed point — using the closed-form formula $D(n)=n!\sum_{k=0}^n\frac{(-1)^k}{k!}$; (2) derive this formula via inclusion-exclusion, treating "element $i$ is fixed" as the $i$-th excluded property; (3) use the approximation $D(n)\approx n!/e$ and the limit $D(n)/n!\to1/e$ to estimate the probability that a random permutation is a derangement, correctly recognizing this approximation converges rapidly and is already highly accurate for modest $n$.

## Core Understanding
A derangement of $n$ elements is a permutation with NO fixed points — no element maps to its own original position. The count $D(n)$ is derived directly from `math.disc.inclusion-exclusion`, previewed there and fully developed here: let $A_i$ be the set of permutations where element $i$ IS fixed (a "bad" event). The number of permutations with AT LEAST ONE fixed point is $|A_1\cup\cdots\cup A_n|$, computed by the full inclusion-exclusion alternating sum, and $D(n)=n!-|A_1\cup\cdots\cup A_n|$ simplifies to the closed form $D(n)=n!\sum_{k=0}^n\frac{(-1)^k}{k!}$.

As $n\to\infty$, $D(n)/n!\to\sum_{k=0}^\infty\frac{(-1)^k}{k!}=e^{-1}=1/e\approx0.368$ — roughly 36.8% of all permutations of a large set are derangements. This gives the useful approximation $D(n)\approx n!/e$ (rounded to the nearest integer, since $D(n)$ is always a whole number). Because the underlying series is a rapidly-converging ALTERNATING series (each successive term $\frac{(-1)^k}{k!}$ shrinks factorially fast), the approximation becomes highly accurate remarkably quickly — already excellent by $n\approx10$, not requiring the "very large $n$" that a slower-converging series would demand.

Critically, "derangement" means NO element maps to its OWN original position, ANYWHERE in the permutation — a much stronger condition than merely "the element at position 1 is not in its original spot." A permutation can avoid a fixed point at one specific position while still fixing a DIFFERENT position elsewhere, and such a permutation is NOT a derangement; every single position must simultaneously avoid being fixed.

## Mental Models
1. **Rung 1 — a derangement is inclusion-exclusion applied to "no position is fixed."** The formula is not a separately memorized fact but a direct instance of the already-mastered technique, applied to the specific "bad" events $A_i=$"position $i$ is fixed."
2. **Rung 2 — the alternating series converges FAST.** Because each term shrinks by a factor of roughly $k$ (from $k!$ in the denominator), the sum stabilizes near $1/e$ well before $n$ reaches double digits — the approximation is trustworthy much sooner than intuition might suggest.
3. **Rung 3 — "no fixed point" means EVERY position, not just one.** A derangement fails if even a single position happens to map to itself; checking only one position is checking a strictly weaker, different condition.
4. **Rung 4 — $D(n)$ is always a whole number, despite its formula's non-integer-looking pieces.** Each $\frac{(-1)^k}{k!}$ term is generally fractional, but the finite alternating sum, multiplied by $n!$, always produces an integer, since it counts an actual finite set of permutations.

## Why Students Fail
Deriving $D(n)$ correctly requires accurately tracking not just each individual fixed-point-overlap value (which is straightforward, $(n-k)!$ for a specific set of $k$ fixed positions) but also HOW MANY such terms exist at each inclusion-exclusion level — $n$ singles, $\binom{n}{2}$ pairs, $\binom{n}{3}$ triples, and so on — and this second bookkeeping step is easy to garble even when the first is done correctly. Separately, having just learned that many approximations in mathematics require impractically large inputs to become trustworthy, students often assume the $1/e$ approximation follows the same pattern, missing that THIS particular alternating series converges unusually fast. Finally, the everyday phrase "avoids its original spot" can be misread as referring to a single, specific position rather than the universally-quantified condition the definition actually requires.

## Misconceptions

### MC-1: INCLUSION-EXCLUSION-TERM-COUNT-MISCOMPUTED-FOR-DERANGEMENTS
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Correctly computing individual fixed-point-overlap values but miscounting how many such terms exist at each inclusion-exclusion level (singles, pairs, triples, ...).
- **Why this birth type:** An overgeneralization of the mechanical, arithmetic-only aspect of the inclusion-exclusion formula (computing each intersection's size, which is genuinely straightforward here — always $(n-k)!$) without carrying over equal care for the COMBINATORIAL bookkeeping step (how many $k$-fold intersections exist, $\binom{n}{k}$) that the general technique from `math.disc.inclusion-exclusion` also requires — the arithmetic success can mask an error in the term-counting step.
- **Detection probe:** "For $n=3$, compute $D(3)$ via inclusion-exclusion, showing each level's term count explicitly." A student with MC-1 correctly computes $|A_i|=2!=2$ but may use the wrong number of such terms (e.g. summing only 2 single-fixed-point cases instead of the correct 3, since there are $\binom{3}{1}=3$ choices of which element is fixed).
- **Repair:** For a small case, explicitly LIST every single, pair, and triple combination before summing — for $n=3$: 3 single-element choices, $\binom{3}{2}=3$ pair choices, $\binom{3}{3}=1$ triple choice — counting them directly rather than trusting a half-remembered pattern.
- **Verification of death:** Given a novel small $n$, the student correctly states the term count at every inclusion-exclusion level ($\binom{n}{k}$ for level $k$) before computing the sum.

### MC-2: ONE-OVER-E-APPROXIMATION-ASSUMED-TO-NEED-HUGE-N
- **Birth type:** Type 1 (overgeneralization) — moderate
- **Description:** Believing the $D(n)\approx n!/e$ approximation only becomes trustworthy for very large $n$, missing that convergence is already excellent by roughly $n=10$.
- **Why this birth type:** An overgeneralization of experience with OTHER, more slowly-converging approximations or limits encountered previously, where "large $n$" genuinely does mean thousands or more — applied here without checking whether THIS specific alternating series (with factorially-shrinking terms) actually converges at that same slow rate, which it does not.
- **Detection probe:** "Is $D(10)/10!$ a trustworthy estimate of $1/e$, or would you need $n$ in the thousands to trust it?" A student with MC-2 claims the approximation is unreliable at $n=10$.
- **Repair:** Compute $D(10)/10!$ explicitly and compare numerically against $1/e\approx0.3679$, showing the near-exact match (differing by less than $0.001\%$) already at this modest size — the factorially-shrinking alternating terms are what drive this unusually fast convergence.
- **Verification of death:** Given a moderate $n$ (e.g. $n=8$ or $n=10$), the student confidently applies the $1/e$ approximation without hedging that "larger $n$ would be needed" for trustworthiness.

### MC-3: DERANGEMENT-CONFUSED-WITH-ANY-PERMUTATION-WITHOUT-A-SPECIFIC-FIXED-POINT
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Treating "no fixed point at position 1" (a weaker condition) as equivalent to "no fixed point anywhere" (the true derangement condition).
- **Why this birth type:** An overgeneralization from the everyday linguistic habit of treating "avoids its spot" as referring to a single salient position under discussion, rather than the mathematically precise universally-quantified condition ("for EVERY position, that position is not fixed") the actual definition requires — a natural but incorrect narrowing of scope.
- **Detection probe:** "Is the permutation $(2,1,3,4)$ [meaning $1\to2, 2\to1, 3\to3, 4\to4$] a derangement, given that position 1 is not fixed (element 1 maps to position 2)?" A student with MC-3 may answer "yes" by checking only position 1, missing that positions 3 and 4 ARE fixed.
- **Repair:** Re-state the definition precisely: "NO element anywhere maps to its own original position" — and require the student to verify a candidate permutation against EVERY position, not stopping after checking just one.
- **Verification of death:** Given a candidate permutation, the student systematically checks all $n$ positions before declaring it a derangement or not, rather than stopping at the first (or only) position examined.

## Analogies
1. **The hat-check problem analogy.** $n$ people check hats at a cloakroom; the hats are returned uniformly at random. A derangement corresponds to EVERY person receiving someone else's hat — not just one specific person avoiding their own hat, but all $n$ simultaneously.
2. **The musical-chairs-with-labels analogy.** If every chair has a name tag matching the person who originally sat there, a derangement is a reseating where NOBODY, not even one person out of $n$, ends up back in their own labeled seat.

## Demonstrations
### Demonstration 1 — direct computation (mirrors Blueprint Ex1)
$D(4)=4!\left(\frac{1}{0!}-\frac{1}{1!}+\frac{1}{2!}-\frac{1}{3!}+\frac{1}{4!}\right)=24(1-1+0.5-0.1667+0.0417)=24\times0.375=9$.

### Demonstration 2 — the inclusion-exclusion derivation, breaking MC-1 (mirrors Blueprint Ex2)
For $n=3$: $|A_i|=2!=2$ for each of $\binom{3}{1}=3$ single choices; $|A_i\cap A_j|=1!=1$ for each of $\binom{3}{2}=3$ pairs; $|A_1\cap A_2\cap A_3|=0!=1$. So $|A_1\cup A_2\cup A_3|=3(2)-3(1)+1(1)=6-3+1=4$, giving $D(3)=3!-4=6-4=2$.

### Demonstration 3 — probability approximation, breaking MC-2 (mirrors Blueprint Ex3)
For 10 shuffled letters placed into 10 addressed envelopes, the probability NONE ends up correct is $D(10)/10!\approx1/e\approx0.368$ — already accurate to within $0.001\%$ at this modest $n=10$.

## Discovery Questions
1. "You've already learned inclusion-exclusion for a general union of $n$ sets. If $A_i$ is 'position $i$ is fixed,' what would $|A_1\cup\cdots\cup A_n|$ mean, and how would $n!$ minus that quantity relate to derangements?"
2. "If the alternating terms in $D(n)$'s formula shrink by roughly a factor of $k$ each step (because of the $k!$ in the denominator), how quickly would you expect the sum to stabilize near its limiting value — slowly, over thousands of terms, or quickly?"
3. "If a permutation leaves position 1 unfixed but happens to fix position 3, is it a derangement? What does your answer tell you about what 'no fixed point' actually requires?"

## Teaching Sequence
Best taught by **guided discovery of the inclusion-exclusion derivation, direct instruction of the closed-form computation and convergence rate** — Discovery Question 1 lets the student connect derangements to the already-mastered general technique themselves, which builds a much sturdier understanding than being handed the formula, while the closed-form arithmetic and the fast-convergence fact are efficiently stated directly once the derivation's origin is secure.
1. Pose Discovery Question 1 and let the student attempt to set up the inclusion-exclusion framing (`$A_i=$"position $i$ fixed"`) before revealing the full derivation.
2. Work Demonstration 2's small-case derivation in full, explicitly counting terms at each level (targeting MC-1).
3. State the closed-form formula and work Demonstration 1's direct computation.
4. Pose Discovery Question 2, then work Demonstration 3 to confirm the fast-convergence intuition (targeting MC-2).
5. Pose Discovery Question 3 to consolidate the "every position, not just one" definition (targeting MC-3).
6. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On a derangement-count problem:** always connect back to the inclusion-exclusion framing ("$A_i$ is 'position $i$ fixed'") before applying the closed-form formula, reinforcing this is an application, not a new independent fact.
2. **On a term-counting step:** require the student to state HOW MANY terms exist at each level ($\binom{n}{k}$) explicitly, separate from computing each term's individual value.
3. **On a probability-estimation question with moderate $n$:** confirm the $1/e$ approximation is already trustworthy rather than deferring to "you'd need much larger $n$."
4. **On a candidate-permutation check:** require systematic verification of EVERY position before a derangement/non-derangement verdict is accepted.

## Voice Teaching Notes
1. **Register:** connective and confirmatory — this concept's central pedagogical move is showing the student that a technique they already trust (inclusion-exclusion) directly produces this new result, so language should repeatedly draw that connection rather than presenting new content in isolation.
2. **Load-bearing sentence, spoken slowly:** "No fixed point means EVERY position avoids its own spot — not just the one you happened to check."
3. **Wait time:** pause after posing Discovery Question 1, giving genuine space for the student to attempt the inclusion-exclusion setup themselves before it is confirmed or corrected.

## Assessment Signals
1. **Gate concept:** correctly computes $D(n)$ for a novel small $n$ using the closed-form formula.
2. **Derivation fluency:** derives $D(n)$ from scratch via inclusion-exclusion for a small case, with correct term counts at every level.
3. **Convergence confidence:** applies the $1/e$ approximation confidently for moderate $n$ (e.g. $n=8$–$12$) without hedging.
4. **Definition precision:** correctly identifies whether a candidate permutation is a derangement by checking every position, not just one.
5. **Transfer:** applies the derangement formula and probability approximation in a novel real-world-framed context (e.g. exam or gift redistribution).

## Tutor Recovery Strategy
If the student consistently miscounts terms at each inclusion-exclusion level, do not just restate the binomial-coefficient pattern — have them LIST every specific combination for a small $n$ (as in Demonstration 2) until the counting becomes concrete rather than a half-remembered rule. If the student doubts the convergence speed, compute $D(n)/n!$ for several increasing $n$ (e.g. $n=5,8,10$) live and watch the sequence visibly stabilize near $1/e$.

## Memory Hooks
1. "Derangements are inclusion-exclusion applied to 'no position is fixed.'"
2. "The alternating series shrinks fast — $1/e$ is already trustworthy by $n\approx10$."
3. "No fixed point means EVERY position — not just the one you checked."

## Transfer Connections
- **`math.disc.inclusion-exclusion`:** the direct technique this concept's entire derivation applies, previewed there and fully developed here.
- **`math.disc.stars-bars`, `math.disc.pigeonhole`:** sibling counting/existence techniques within the broader `math.disc.combinatorics` survey.

## Cross-Subject Connections
- **Probability theory (random permutation statistics):** the derangement probability $D(n)/n!\to1/e$ is a canonical example of a discrete probability converging to a continuous limiting constant.
- **Computer Science (randomized algorithm analysis):** derangement counting underlies analyses of random shuffling algorithms and collision-avoidance guarantees.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.derangements.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76). Not restated verbatim; this entry adds birth-type classification, mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- No genuine content-overlap was found with `math.disc.inclusion-exclusion` — that entry previews the derangement formula at orientation level only, deferring full development (closed-form computation, term-counting practice, convergence-rate analysis, and the "every position" precision) to this entry, matching the division-of-labor already established between the two Blueprints.
- This entry closes the `math.disc.inclusion-exclusion`-unblocked branch of the domain; `math.disc.graph` and `math.disc.propositional-logic` (both authored this same batch) open the domain's two remaining, structurally distinct subtrees.

## Version History
- **Batch 20** (2026-09-11): initial authoring, part 1 of 3 this batch (with `math.disc.graph` and `math.disc.propositional-logic`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1 foundational, MC-2 Type 1 moderate, MC-3 Type 1 foundational).
