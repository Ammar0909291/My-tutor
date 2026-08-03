# Teaching Blueprint: Derangements (`math.disc.derangements`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.derangements` |
| name | Derangements |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.disc.inclusion-exclusion` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | D(n) = n!∑_{k=0}^n (−1)ᵏ/k! ≈ n!/e. The number of permutations with no fixed point. Derived via inclusion-exclusion. D(n)/n! → 1/e as n→∞; probability a random permutation is a derangement.

 |

## Component 1 — Learning Objectives

- LO1: Compute $D(n)$ (the number of derangements of $n$ elements — permutations with NO fixed point) using the formula $D(n)=n!\sum_{k=0}^n\frac{(-1)^k}{k!}$.
- LO2: Derive the derangement formula via inclusion-exclusion, treating "element $i$ is fixed" as the $i$-th "bad" property being excluded.
- LO3: Use the approximation $D(n)\approx n!/e$ and the limit $D(n)/n!\to1/e$ to estimate the probability that a random permutation is a derangement, for reasonably large $n$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.inclusion-exclusion` (the technique this concept's derivation directly applies).

## Component 3 — Core Explanation

A **derangement** of $n$ elements is a permutation with NO fixed points (no element maps to itself). The count $D(n)$ is derived via inclusion-exclusion: let $A_i$ be the set of permutations where element $i$ IS fixed (a "bad" event to exclude). By inclusion-exclusion, the number of permutations with AT LEAST ONE fixed point is $|A_1\cup\cdots\cup A_n|=\sum|A_i|-\sum|A_i\cap A_j|+\cdots$, and $D(n)=n!-|A_1\cup\cdots\cup A_n|$ simplifies to the closed form $D(n)=n!\sum_{k=0}^n\frac{(-1)^k}{k!}$.

As $n\to\infty$, $D(n)/n!\to\sum_{k=0}^\infty\frac{(-1)^k}{k!}=e^{-1}=1/e\approx0.368$ — so roughly 36.8% of all permutations of a large set are derangements, giving the useful approximation $D(n)\approx n!/e$ (rounded to the nearest integer, since $D(n)$ is always a whole number).

## Component 4 — Worked Examples

**Example 1 (LO1 — direct computation)**: Compute $D(4)$: $D(4)=4!\left(\frac{1}{0!}-\frac{1}{1!}+\frac{1}{2!}-\frac{1}{3!}+\frac{1}{4!}\right)=24\left(1-1+0.5-0.1667+0.0417\right)=24\times0.375=9$.

**Example 2 (LO2 — the inclusion-exclusion derivation, breaking MC-1)**: For $n=3$: $|A_i|$ (permutations with element $i$ fixed) $=2!=2$ for each of the 3 choices of $i$; $|A_i\cap A_j|$ (both $i,j$ fixed) $=1!=1$ for each of $\binom{3}{2}=3$ pairs; $|A_1\cap A_2\cap A_3|=0!=1$. By inclusion-exclusion: $|A_1\cup A_2\cup A_3|=3(2)-3(1)+1(1)=6-3+1=4$. So $D(3)=3!-4=6-4=2$. A common error computes $|A_i|$ as $(n-1)!$ correctly but then miscounts the NUMBER of such terms (using $n$ terms for singles, $\binom{n}{2}$ for pairs, etc. — mixing up which binomial coefficient counts which level), producing a wrong intermediate sum despite each individual $|A_i|$-type value being correct.

**Example 3 (LO3 — probability approximation, breaking MC-2)**: For $n=10$ shuffled letters being placed back into 10 addressed envelopes, the probability NONE ends up in its correct envelope is approximately $D(10)/10!\approx1/e\approx0.368$ — even for a relatively small $n=10$, this is already very close to the limiting value $1/e$ (the actual value is $D(10)/10!\approx0.3679$, differing from $1/e\approx0.3679$ by less than $0.001\%$). A common error assumes the $1/e$ approximation is only valid for VERY large $n$ (thousands or more), missing that convergence is actually extremely fast — the approximation is already excellent by $n=10$ or so, due to the alternating series' rapidly shrinking terms.

## Component 5 — Teaching Actions

### Teaching Action A01 — Computing D(n) from the Closed Form (Primitive P64: Conceptual Shift)

Work Example 1 term by term, computing each $\frac{(-1)^k}{k!}$ piece before multiplying by $n!$, connecting the alternating-sum structure to the inclusion-exclusion pattern it derives from.

### Teaching Action A02 — Deriving the Formula via Inclusion-Exclusion (Primitive P64: Conceptual Shift, second instance)

Work Example 2's small-case derivation in full, explicitly connecting each level of the inclusion-exclusion sum ($n$ single terms, $\binom{n}{2}$ pair terms, etc.) back to `math.disc.inclusion-exclusion`'s general alternating-sum structure, reinforcing that $D(n)$'s formula is not arbitrary but a direct instance of that already-mastered technique.

- **MC-1 hook**: check whether the number of terms at each inclusion-exclusion level is correctly counted (revealing MC-1: correctly computing individual $|A_i\cap\cdots|$-style values but miscounting how many such terms exist at each level).

### Teaching Action A03 — Fast Convergence to 1/e (Primitive P06: Contrast Pair)

Work Example 3, computing $D(10)/10!$ explicitly and comparing it against $1/e$, showing the approximation is already excellent at a modest $n=10$ — contrasting against the (incorrect) assumption that only extremely large $n$ would justify using the approximation. State the rule: "the alternating series converges very quickly — the $1/e$ approximation is already highly accurate well before $n$ reaches even double digits."

- **MC-2 hook**: this directly targets MC-2 (assuming the approximation requires enormous $n$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Compute $D(5)$ using the closed-form formula.
  2. Derive $D(4)$ from scratch via inclusion-exclusion (computing the fixed-point overlap terms explicitly), and verify it matches Example 1's closed-form value of 9.
  3. Estimate the probability that a random shuffle of 8 distinct items results in a derangement (no item in its original position), using the $1/e$ approximation.
  4. Explain, in one sentence, why $D(n)$ must always be a WHOLE number even though its formula involves the seemingly non-integer quantity $n!/e$.
- **P76 (Transfer Probe, mode = independence)**: "A teacher randomly redistributes 6 graded exams back to 6 students (without looking at names, purely at random) as an icebreaker activity. (a) Compute the exact number of ways this redistribution can happen such that NO student gets their own exam back, using the derangement formula. (b) Estimate the PROBABILITY that this happens (no student gets their own exam) using the $1/e$ approximation, and explain, using this lesson's fast-convergence point, why this approximation is already trustworthy for a class of only 6 students despite $n=6$ being quite small."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INCLUSION-EXCLUSION-TERM-COUNT-MISCOMPUTED-FOR-DERANGEMENTS | Correctly computing individual fixed-point-overlap values but miscounting how many such terms exist at each inclusion-exclusion level (singles, pairs, triples, ...) | Foundational |
| MC-2 | ONE-OVER-E-APPROXIMATION-ASSUMED-TO-NEED-HUGE-N | Believing the $D(n)\approx n!/e$ approximation only becomes trustworthy for very large $n$, missing that convergence is already excellent by roughly $n=10$ | Moderate |
| MC-3 | DERANGEMENT-CONFUSED-WITH-ANY-PERMUTATION-WITHOUT-A-SPECIFIC-FIXED-POINT | Treating "no fixed point at position 1" (a weaker condition) as equivalent to "no fixed point anywhere" (the true derangement condition) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Inclusion-Exclusion Term Count Miscomputed for Derangements") → P41 (detect: present Example 2 and check whether the correct number of pair-terms, $\binom{n}{2}$, is used) → P64 (conceptual shift: re-derive by explicitly listing every single, pair, and triple combination for the small case, counting them directly before summing).
- **B02 (targets MC-2)**: P27 ("1/e Approximation Assumed to Need Huge N") → P41 (detect: ask whether the approximation is trustworthy for $n=10$; check for an "only for huge $n$" answer) → P64 (conceptual shift: compute $D(10)/10!$ explicitly and compare numerically against $1/e$, showing the near-exact match at this modest size).
- **B03 (targets MC-3)**: P27 ("Derangement Confused with Single-Position-Avoidance") → P41 (detect: ask the student to define a derangement in their own words; check for a definition referencing only ONE specific position) → P64 (conceptual shift: re-state the definition precisely — "NO element anywhere maps to its own original position" — and verify a candidate permutation against EVERY position, not just one).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.inclusion-exclusion`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that this concept is a direct, well-scoped APPLICATION of the already-mastered inclusion-exclusion technique to a single, specific counting problem.
- MC-1 was ranked most severe because it reflects an incomplete internalization of inclusion-exclusion's general term-counting structure (already covered in that prerequisite concept), surfacing here as a genuine test of whether that earlier learning transfers correctly to a new application.
- The exam-redistribution transfer probe was deliberately chosen as a vivid, relatable scenario (the classic "hat-check problem" reframed) to make the abstract probability computation concrete, while part (b)'s explicit convergence-speed question directly targets MC-2's correction in a probability-estimation context rather than a pure formula-application one.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.inclusion-exclusion`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
