# Blueprint: math.disc.pigeonhole

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.pigeonhole |
| name | Pigeonhole Principle |
| Domain | math.disc |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.disc.counting-principles |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student states and applies the pigeonhole principle in its basic form (n+1 objects in n holes → some hole has ≥2) and generalised form (m objects in n holes → some hole has ≥⌈m/n⌉); sets up the pigeons and holes correctly for a given problem by identifying the objects and the categories; applies the principle to number theory (repeated remainders, Dirichlet approximation), combinatorics (repeated sum/difference, colouring), and the birthday problem; and recognises that the principle is non-constructive (guarantees existence without finding the specific hole).

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw 5 pigeons being placed into 4 pigeonholes, with the 5th pigeon forced to share a hole; annotate: "5 pigeons, 4 holes → at least one hole gets ≥2 pigeons — guaranteed, regardless of arrangement"; then draw 13 cards from a standard deck and 4 suits, annotating "13 cards, 4 suits → at least ⌈13/4⌉=4 cards of the same suit")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | PIGEONHOLE-IS-A-FORMULA-NOT-AN-ARGUMENT | Student memorises "n+1 into n gives ≥2 in one hole" as a formula and applies it mechanically without identifying the pigeons and holes; fails on non-obvious problems where the objects and categories require creative definition | Type 5 — instruction-induced (the principle is always stated formally first, then examples follow; students learn to recognise the n+1→n pattern but not the meta-skill of CHOOSING the categories cleverly for the problem at hand — e.g., using intervals as holes or remainder classes as holes) |
| MC-2 | PIGEONHOLE-GUARANTEES-THE-MAXIMUM | Student thinks ⌈m/n⌉ is an exact value for the maximum category size, not a lower bound; says "some hole has exactly ⌈m/n⌉ objects"; misses that the principle only guarantees AT LEAST ⌈m/n⌉, not exactly — the actual maximum could be much larger | Type 4 — notation-induced (⌈m/n⌉ is written as a single value; students treat it as an equality constraint, not a floor; the "≥" in "some hole has ≥⌈m/n⌉" is underemphasised compared to computing the numerical answer) |
| MC-3 | THE-PRINCIPLE-FINDS-THE-COLLISION | Student believes the pigeonhole principle identifies WHICH objects share a category, or which hole is the full one; uses it to find a specific example rather than just proving one exists | Type 1 — overgeneralisation (after seeing the principle applied in examples where the collision is obvious, students assume the proof identifies it; in non-constructive applications — e.g., Dirichlet's approximation theorem, existence of two points at integer distance — the principle only guarantees existence; the specific collision may be unknown) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The pigeonhole principle — statement and basic applications:**

**Basic form:** If n+1 or more objects are placed in n boxes (holes), then at least one box contains 2 or more objects.

**Generalised form:** If m objects are distributed among n boxes, then at least one box contains ≥ ⌈m/n⌉ objects. Proof: if every box had fewer than ⌈m/n⌉ = k objects, every box has ≤k−1 objects, total ≤ n(k−1) < n·m/n = m — contradiction.

**Setting up pigeons and holes:**
- Pigeons = the objects (what you have many of).
- Holes = the categories/labels (what you're distributing into).
- Claim: some category has ≥⌈m/n⌉ representatives.
- The creativity lies in choosing the holes cleverly.

**Worked examples:**

1. **Birthday problem (worst case):** 366 people → at least 2 share a birthday (365 possible birthdays = holes; people = pigeons; ≥2 in some hole).

2. **Same remainder mod 5:** Among any 6 integers, two have the same remainder when divided by 5. (Holes = remainders {0,1,2,3,4}; pigeons = 6 integers; 6 > 5 → some hole has ≥2.)

3. **Repeated digit in decimal:** Any integer with more than 10 digits has at least one repeated digit. (Holes = digits {0,…,9}; pigeons = digit positions.)

4. **Points at integer distance:** Among 5 lattice points in the plane, two have a midpoint with integer coordinates. (Define the parity class of (x,y) as (x mod 2, y mod 2); 4 parity classes, 5 points → two points in the same class; their sum has even coordinates → midpoint is a lattice point.)

**P49 checkpoint:**
- CORRECT → "n+1 into n → some hole ≥2. m into n → some hole ≥⌈m/n⌉. Pigeons=objects, holes=categories. Non-constructive: guarantees existence, not location." → A02
- PARTIAL (MC-1: applies formula without creative setup) → "The key step is CHOOSING the holes. For the 5 lattice-point problem: holes are NOT the points themselves — they are the 4 parity classes of (x mod 2, y mod 2). Once you define the holes correctly, the argument is automatic. Practice: 'Any 5 real numbers between 0 and 2 contain two within distance 1 of each other.' Holes = intervals [0,1) and [1,2] — 2 holes, 5 numbers → some interval contains ≥3 → two are within 1 of each other. Choose the intervals as holes, not the numbers." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Among any 13 integers, two have the same remainder when divided by 12. Holes = {0,1,…,11} (12 remainders). 13 > 12 → by pigeonhole, some hole has ≥2 integers → those two differ by a multiple of 12. (But we can't say WHICH two.)" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Dirichlet's approximation and Erdős–Szekeres:**

**Dirichlet's approximation theorem:**
For any real α and positive integer N, there exist integers p, q with 1 ≤ q ≤ N and |α − p/q| < 1/(qN).
Proof: Consider the N+1 numbers {0}, {α}, {2α}, …, {Nα} (fractional parts) in [0,1). Divide [0,1) into N equal subintervals [k/N, (k+1)/N) for k=0,…,N−1. By pigeonhole (N+1 numbers, N intervals), two fractional parts {jα} and {kα} fall in the same interval → |{jα}−{kα}| < 1/N → |jα−kα − m| < 1/N for some integer m → |(j−k)α − m| < 1/N. Set q=|j−k|≤N, p=m. Then |α − p/q| < 1/(qN).

**Erdős–Szekeres theorem:**
Any sequence of more than rs distinct real numbers contains a monotone increasing subsequence of length r+1 OR a monotone decreasing subsequence of length s+1.
Proof: assign each number aₖ a label (iₖ, dₖ) where iₖ is the length of the longest increasing subsequence ending at aₖ, and dₖ the longest decreasing. If no increasing subsequence has length r+1 and no decreasing has length s+1, then all labels (i,d) satisfy 1≤i≤r, 1≤d≤s → at most rs distinct labels for rs+1 numbers → two numbers aₖ, aₗ (k<l) share a label → contradiction (aₗ > aₖ would extend the increasing; aₗ < aₖ would extend the decreasing; they can't be equal since elements are distinct).

**P49 checkpoint:**
- CORRECT → "Dirichlet: N+1 fractional parts in N intervals → some gap < 1/N → rational approximation |α−p/q|<1/(qN). Erdős-Szekeres: rs+1 numbers → long monotone subsequence." → Gate (P91)
- PARTIAL (MC-2: ⌈m/n⌉ is exact) → "⌈m/n⌉ is a LOWER BOUND on the maximum hole size, not the exact value. If 13 people live in 4 cities, at least one city has ≥⌈13/4⌉=4 people — but one city might have 10. The principle guarantees 'at least ⌈m/n⌉' — nothing more. To get an UPPER bound on the maximum, you'd need additional information about the specific distribution." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Among any 5 points inside a unit equilateral triangle, two are within distance 1/2 of each other. Divide the triangle into 4 congruent smaller triangles (midpoint subdivision), each with side 1/2 and diameter 1/2. 5 points, 4 sub-triangles → some sub-triangle contains ≥2 points → those two are within diameter 1/2 of each other." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "Two-step setup: (1) IDENTIFY the pigeons and holes for your problem. Ask: 'what are the many objects?' → pigeons. 'What categories/labels can each object receive?' → holes. (2) COUNT: # pigeons > # holes → some hole has ≥2, guaranteed. Never skip step 1 — the power of the principle is in the creative hole-design."
Step 2 — "The principle is non-constructive: once you conclude 'some hole has ≥2 pigeons,' the argument is DONE. You don't need to find which hole. If the problem asks 'prove that two people share a birthday,' you stop after: 366 people, 365 possible birthdays, pigeonhole → done. If asked 'which birthday is shared?' — pigeonhole can't answer that; you need additional information."
Step 3 — "Challenging example: among any 5 integers, two have the same sum-mod-4. Holes = {0,1,2,3} (4 classes). Pigeons = the 5 integers. 5>4 → two integers aᵢ,aⱼ with aᵢ≡aⱼ (mod 4) → 4 | (aᵢ−aⱼ). Notice: here the 'pigeon assignment' is x ↦ x mod 4, a function whose definition itself requires the creative step."

**TB-R02 (MC-2 BOUND vs. EXACT):**
Step 1 — "The floor/ceiling distinction: given m objects in n holes, the AVERAGE number per hole is m/n. By pigeonhole, the MAX is ≥⌈m/n⌉. The min hole size (by complementary pigeonhole) is ≤⌊m/n⌋. Neither is exact without additional constraints."
Step 2 — "Explicit counterexample to 'exactly ⌈m/n⌉': 7 objects in 3 holes. ⌈7/3⌉=3. Distribution [5,1,1] satisfies pigeonhole (max=5≥3) but has max far larger than 3. Distribution [3,2,2] also satisfies it (max=3=3). Both are valid; the principle only guarantees max≥3."
Step 3 — "When is ⌈m/n⌉ tight? If m=kn (m divisible by n), the uniform distribution [k,k,…,k] achieves max=k=m/n=⌈m/n⌉. This is the ONLY case where every hole achieves the bound. For all other distributions, at least one hole exceeds ⌈m/n⌉."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Prove: among any n+1 integers from {1, 2, …, 2n}, some two integers are consecutive (differ by 1). Set up the pigeons and holes explicitly, then apply the principle.
2. Dirichlet approximation: use the pigeonhole principle to show that for any irrational α, there are infinitely many fractions p/q (in lowest terms) satisfying |α − p/q| < 1/q². (Hint: apply the theorem for N=1,2,3,… and argue the approximations must be distinct.)
3. A chess tournament has 11 players who each play every other player exactly once. Show that at some point during the tournament, two players have played the same number of games so far.
4. Prove Erdős-Szekeres: any sequence of more than (r−1)(s−1) distinct reals has an increasing subsequence of length r or a decreasing subsequence of length s. (Use the labelling argument from A02.)
5. Among any 10 integers, some two have the property that their difference is divisible by 9. Prove this and find the minimum number of integers guaranteeing that some three have pairwise differences divisible by 9.

**P55 — Reflect & Consolidate:** "Pigeonhole: m objects, n holes → some hole ≥⌈m/n⌉. Non-constructive. Key skill: creative hole design (remainders, intervals, parity classes). Dirichlet: N+1 fractional parts in N intervals → rational approximation within 1/(qN). Erdős-Szekeres: rs+1 → monotone subsequence r+1 or s+1."

**P76 — Transfer Probe (Independence mode):**
(a) Probabilistic pigeonhole: the expected number of objects in a uniformly random hole when m balls are placed uniformly in n bins is m/n. By the first moment method (linearity of expectation), prove that the maximum load is ≥m/n (a strengthening of the generalised pigeonhole). Extend to show: if m = 2n log n balls are placed in n bins, the maximum load is at least 2 log n with probability →1 (Chernoff bound sketch). (b) Ramsey numbers and pigeonhole: prove R(3,3)=6 by showing: (1) in K₆ with edges 2-coloured red/blue, some vertex has ≥3 edges of the same colour (pigeonhole on degree 5 split into 2 colours); (2) from those 3 edges, either a triangle of that colour exists or the opposite colour gives a triangle. Extend to prove R(3,3)≤6. (c) Van der Waerden's theorem (statement only): for any r-colouring of {1,…,N} for N large enough (N≥W(k;r)), there is a monochromatic arithmetic progression of length k. Explain why the pigeonhole principle alone cannot prove this (the holes are not finitely many in a direct sense) and what the compactness argument that is used instead says about the limits of the principle.

**P75 — Mastery Assessment:**
"(a) Prove: among any 5 points with integer coordinates in the plane, some two have a midpoint with integer coordinates. (b) Show that in any group of 13 people, either 4 people were born in the same month, or 4 people were born in different seasons. (Use generalised pigeonhole twice.) (c) A student claims: 'By pigeonhole, among any 366 people some 2 share a birthday — so among 732 people some 3 share a birthday.' Explain why this reasoning is WRONG, and give the correct minimum number of people needed to guarantee 3 share a birthday. (d) Prove Dirichlet's theorem: for any real α and any N, ∃ integers p, q with 1 ≤ q ≤ N and |qα − p| < 1/N. (Write the full argument using the N+1 fractional parts {0},{α},…,{Nα} and N equal subintervals.)"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the generalised form (⌈m/n⌉) and the creative hole-design step
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.counting-principles; reassign

**P78 — Completion:** Pigeonhole Principle certified. Student sets up the pigeons and holes for both standard and creative problems; applies both basic and generalised forms; identifies the non-constructive nature of the conclusion; uses the principle in number-theoretic and geometric contexts; and applies the Dirichlet approximation theorem as a pigeonhole application.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Probabilistic first-moment method; Ramsey numbers via pigeonhole; Van der Waerden's theorem and limits of the principle
Skill tested: Connect the deterministic pigeonhole argument to probabilistic bounds, Ramsey theory, and arithmetic combinatorics

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
