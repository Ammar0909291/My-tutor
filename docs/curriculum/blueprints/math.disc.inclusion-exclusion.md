# Blueprint: math.disc.inclusion-exclusion

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.inclusion-exclusion |
| name | Inclusion-Exclusion Principle |
| Domain | math.disc |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 4 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.disc.combinations, math.found.set-operations |
| Cross-links | — |
| Unlocks | math.disc.derangements |

## Component 1 — Learning Objective
The student states and applies the inclusion-exclusion principle for n sets: |A₁∪⋯∪Aₙ| = Σ|Aᵢ| − Σ|Aᵢ∩Aⱼ| + Σ|Aᵢ∩Aⱼ∩Aₖ| − ⋯ ± |A₁∩⋯∩Aₙ|; identifies when a problem requires inclusion-exclusion by the presence of "at least one" or "at most k" constraints; applies the formula to count surjective functions, derangements (existence only), and solutions to combinatorial problems with forbidden positions; uses the complementary form to count elements in none of the sets; and verifies the formula for small cases.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a Venn diagram with two overlapping circles A and B inside a rectangle U; shade A∪B; show: |A∪B| = |A| + |B| − |A∩B|, annotating the overlap region as "counted twice if we just add |A|+|B|, so subtract once"; extend with three circles A, B, C showing +|A|+|B|+|C| −|A∩B|−|A∩C|−|B∩C| +|A∩B∩C|; annotate: "Each element in exactly k of the sets contributes C(k,1)−C(k,2)+C(k,3)−⋯=1 to the final count — this is why the alternating sum works")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | INCLUSION-EXCLUSION-ALWAYS-SUBTRACTS | Student always applies IE as "total minus bad," forgetting that the full formula alternates signs (+individual −pairs +triples −⋯); in problems with three or more properties, drops the triple (and higher) intersection terms, giving wrong counts | Type 5 — instruction-induced (the two-set case |A∪B|=|A|+|B|−|A∩B| is taught first and memorised as "add individual, subtract overlap"; when three or more sets are introduced, students extend this as "add individual, subtract ALL overlaps" without adding back the triple intersections — a systematic sign error) |
| MC-2 | IE-COUNTS-ELEMENTS-IN-ANY-SET | Student confuses |A₁∪⋯∪Aₙ| (at least one property) with the complementary count |U|−|A₁∪⋯∪Aₙ| (no property); applies the IE formula but doesn't subtract from |U| when the problem asks for elements with NONE of the properties | Type 3 — language contamination ("none of the properties" problems use IE to count the union (those with ≥1 property) and then complement; students compute the union sum correctly but report it as the answer instead of |U|−union) |
| MC-3 | SURJECTION-FORMULA-IS-kⁿ | Student thinks the number of surjections from an n-set to a k-set is just kⁿ − (non-surjections excluded by an ad hoc argument); doesn't use the systematic IE formula: Σⱼ₌₀ᵏ (−1)ʲC(k,j)(k−j)ⁿ | Type 5 — instruction-induced (surjection counting is often posed as "subtract the non-onto functions" without making the IE structure explicit; students develop ad hoc exclusion arguments for k=2 (correct) or k=3 (partially correct) and generalise incorrectly to larger k) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Inclusion-exclusion principle — derivation and basic form:**

**Statement:** For finite sets A₁,…,Aₙ:
|A₁∪⋯∪Aₙ| = Σᵢ|Aᵢ| − Σᵢ<ⱼ|Aᵢ∩Aⱼ| + Σᵢ<ⱼ<ₖ|Aᵢ∩Aⱼ∩Aₖ| − ⋯ + (−1)ⁿ⁺¹|A₁∩⋯∩Aₙ|.

**Proof by tracking an element:** Consider element x in exactly m of the n sets (m≥1). Its contribution to the right-hand side is:
C(m,1) − C(m,2) + C(m,3) − ⋯ + (−1)^{m+1}C(m,m) = 1 − (1−1)^m + … (by binomial theorem: Σ_{j=0}^m (−1)ʲC(m,j) = (1−1)^m = 0 → Σ_{j=1}^m (−1)^{j+1}C(m,j) = 1). So x contributes exactly 1, as desired. Elements in no set contribute 0. ✓

**Complementary form (none of the properties):**
|U| − |A₁∪⋯∪Aₙ| = |U| − Σ|Aᵢ| + Σ|Aᵢ∩Aⱼ| − ⋯

**Worked example (2 sets):**
Students in a class: 30 like Math, 25 like English, 10 like both. How many like at least one?
|M∪E| = 30 + 25 − 10 = 45.
How many like neither? 60 − 45 = 15 (if total class = 60).

**Worked example (3 sets):**
|A|=40, |B|=35, |C|=30; |A∩B|=15, |A∩C|=10, |B∩C|=12; |A∩B∩C|=5.
|A∪B∪C| = 40+35+30 − 15−10−12 + 5 = 105 − 37 + 5 = 73.

**P49 checkpoint:**
- CORRECT → "IE: Σ|Aᵢ|−Σ|Aᵢ∩Aⱼ|+Σ|Aᵢ∩Aⱼ∩Aₖ|−⋯ Each element in m sets contributes 1. Complement: |U|−|union| = elements in none." → A02
- PARTIAL (MC-1: drops triple intersection) → "For 3 or more sets: the alternating pattern is +individual −pairs +triples −quadruples ⋯ You MUST include the triple intersection term with a PLUS sign. In the Venn diagram for 3 sets: |A∩B∩C| is first over-counted at the individual level (+3 times), then over-corrected at the pair level (−3 times), then needs +1 more to restore its true single count. Omitting the triple term gives |A∪B∪C| = 105 − 37 = 68 instead of the correct 73 — off by 5." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Integers from 1 to 100 divisible by 2 or 3 or 5: |A₂|=50, |A₃|=33, |A₅|=20; |A₂∩A₃|=|A₆|=16, |A₂∩A₅|=|A₁₀|=10, |A₃∩A₅|=|A₁₅|=6; |A₂∩A₃∩A₅|=|A₃₀|=3. IE: 50+33+20−16−10−6+3=74 integers." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Surjections and forbidden positions:**

**Surjections (onto functions) from [n] to [k]:**
By IE on "missing at least one element": let Aⱼ = functions f: [n]→[k] that miss element j (i.e., j∉range f). |Aⱼ|=(k−1)ⁿ. |Aⱼ₁∩⋯∩Aⱼₘ|=(k−m)ⁿ (functions missing m specified elements).

**Surjections = |U| − |A₁∪⋯∪Aₖ|:**
= kⁿ − C(k,1)(k−1)ⁿ + C(k,2)(k−2)ⁿ − ⋯ + (−1)^{k−1}C(k,k−1)·1ⁿ
= **Σⱼ₌₀ᵏ (−1)ʲ C(k,j)(k−j)ⁿ**.

**Example:** surjections from 4-element set to 3-element set (k=3, n=4):
= 3⁴ − C(3,1)·2⁴ + C(3,2)·1⁴ − C(3,3)·0⁴ = 81 − 3·16 + 3·1 − 0 = 81 − 48 + 3 = 36.

**Forbidden positions (problème des ménages preview):**
Count permutations of n elements avoiding certain positions. Define Aᵢ = permutations where element i is in a forbidden position. Apply IE. General form requires knowing |intersections|, which depends on structure of forbidden positions.

**Connection to derangements:** D_n = number of permutations of n elements with NO element in its original position = Σⱼ₌₀ⁿ (−1)ʲ C(n,j)(n−j)! = n! Σⱼ₌₀ⁿ (−1)ʲ/j! ≈ n!/e.
This is IE applied to the n sets Aⱼ = {permutations with j in position j}. (Detailed derivation in math.disc.derangements.)

**P49 checkpoint:**
- CORRECT → "Surjections: Σ(−1)ʲC(k,j)(k−j)ⁿ. Derangements: n!Σ(−1)ʲ/j!. IE handles 'at least one missing' → complement gives 'all present' = surjections." → Gate (P91)
- PARTIAL (MC-3: surjection = kⁿ minus ad hoc) → "The systematic surjection formula is Σⱼ₌₀ᵏ(−1)ʲC(k,j)(k−j)ⁿ. For k=2: 2ⁿ−2·1=2ⁿ−2 (correct, and this ad hoc works). For k=3: 3ⁿ−3·2ⁿ+3·1ⁿ (this is the IE formula — there is an extra +3·1ⁿ term that ad hoc reasoning often omits). For k=3,n=3: 27−24+3=6 (the 3!=6 bijections, correct). Ad hoc: 27−3·8=3 (wrong — misses the triple intersection)." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Count 4-letter words over alphabet {a,b,c,d,e} (5 letters) that use ALL 5 letters... impossible (4 < 5). Try: 5-letter words using all 5 letters = surjections from 5 to 5 = 5! = 120 (derangements are a special case of surjections with forbidden positions). Surjections from 5 to 4 (use at least 3 of 4 letters): Σ(−1)ʲC(4,j)(4−j)⁵ = 4⁵−4·3⁵+6·2⁵−4·1⁵+0 = 1024−972+192−4=240." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Sign pattern: individual sets → PLUS. Pairwise intersections → MINUS. Triple intersections → PLUS. Quadruple → MINUS. The sign for k-fold intersections is (−1)^{k+1}. For 3 sets, the pattern is +A+B+C −AB−AC−BC +ABC. Each level reverses the sign of the previous."
Step 2 — "Complementary count: once you compute |A₁∪⋯∪Aₙ| using IE (elements with at least one property), the count of elements with NO property is |U|−|A₁∪⋯∪Aₙ|. If the problem says 'none of the conditions' or 'all conditions violated,' you must take this complement. If it says 'at least one condition,' report the union directly."
Step 3 — "Check: for 2 sets and a concrete case — |A|=5, |B|=3, |A∩B|=1, |U|=10. IE: |A∪B|=5+3−1=7. Elements in neither: 10−7=3. Verify: 10 elements; 4 in A only, 2 in B only, 1 in both, 3 in neither. 4+2+1+3=10 ✓. 4+1+2+1=7=|A∪B| ✓."

**TB-R02 (MC-3 SURJECTION FORMULA):**
Step 1 — "Set up: total functions from [n]→[k] is kⁿ. 'Non-surjections' = functions missing ≥1 element. Define Aⱼ = functions not using element j. The non-surjections are A₁∪⋯∪Aₖ. Apply IE to find |A₁∪⋯∪Aₖ|, then subtract from kⁿ."
Step 2 — "Compute |Aⱼ₁∩⋯∩Aⱼₘ|: functions that avoid m specific elements → only k−m elements available → (k−m)ⁿ functions. The number of m-element subsets of [k] is C(k,m). Total at the m-th IE level: (−1)ᵐ⁺¹ C(k,m)(k−m)ⁿ (using subtraction-first convention: we're computing the union so the sign is (−1)^{m+1} for the union formula, then we subtract that union from kⁿ, giving overall (−1)ᵐC(k,m)(k−m)ⁿ in the surjection sum)."
Step 3 — "Verify for k=2, n=2: surjections from {1,2} to {a,b} should be 2 (f(1)=a,f(2)=b and f(1)=b,f(2)=a). Formula: Σ(−1)ʲC(2,j)(2−j)² = 1·4 − 2·1 + 1·0 = 4−2=2. ✓"

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. In a group of 200 students: 120 study mathematics, 90 study physics, 75 study chemistry. 45 study both math and physics, 35 study both math and chemistry, 20 study both physics and chemistry, 10 study all three. How many study at least one subject? How many study none?
2. Count surjective functions from a 5-element set to a 3-element set.
3. Count integers from 1 to 1000 that are divisible by at least one of 3, 5, 7. (Use IE with |Aᵢ| = ⌊1000/i⌋.)
4. Count 6-letter strings over {A, B, C, D} that use every letter at least once. (k=4, n=6.)
5. Derive the formula for derangements D_n using IE: let Aᵢ = {permutations with σ(i)=i}. Compute |Aᵢ|, |Aᵢ∩Aⱼ|, …, then write D_n = n! − |A₁∪⋯∪Aₙ|.

**P55 — Reflect & Consolidate:** "IE: |∪Aᵢ|=Σ|Aᵢ|−Σ|Aᵢ∩Aⱼ|+⋯ Each element in m sets contributes exactly 1. Complement: |U|−|union| = elements in none. Surjections: Σ(−1)ʲC(k,j)(k−j)ⁿ. Sign alternates: +individual, −pairs, +triples."

**P76 — Transfer Probe (Independence mode):**
(a) Möbius inversion on posets: the inclusion-exclusion principle is a special case of Möbius inversion on the Boolean lattice 2^[n]. The Möbius function μ(x,y) on a poset satisfies Σ_{z: x≤z≤y} μ(x,z) = [x=y]. For 2^[n], μ(S,T) = (−1)^{|T|−|S|} — recovering the IE sign pattern. Explain how the Möbius function on the divisor lattice (poset by divisibility) gives the classical Möbius function μ(n) used in the Möbius inversion formula in number theory: Σ_{d|n} μ(d) = [n=1]. (b) Principle of sieve and the sieve of Eratosthenes: the count of integers ≤ N coprime to a product p₁p₂⋯pₖ is given by IE: N·Π(1−1/pᵢ) in the limit → φ(n)/n formula for Euler's totient. Derive φ(n) = n·Π_{p|n}(1−1/p) using IE. (c) Rook polynomial: the problème des ménages asks for the number of ways to seat n married couples at a circular table so that no husband and wife are adjacent. Define the rook polynomial of the forbidden board and explain how IE on the rooks gives the exact count. What is the rook polynomial for the problème des ménages?

**P75 — Mastery Assessment:**
"(a) 100 integers from 1 to 100: how many are NOT divisible by 2, 3, or 5? (b) Compute the number of surjective functions from a 7-element set to a 4-element set. (c) Prove: D_n = (n−1)(D_{n−1} + D_{n−2}). (Hint: consider where element 1 goes and whether the element that went to position 1's original position goes back to 1's current position.) (d) A class of 40 students takes three exams. 25 pass Exam 1, 22 pass Exam 2, 18 pass Exam 3. 14 pass both 1 and 2, 10 pass both 1 and 3, 8 pass both 2 and 3, and 5 pass all three. How many students pass at least two exams? How many pass exactly one exam?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the surjection formula and the sign pattern for 3+ sets
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.combinations or math.found.set-operations; reassign

**P78 — Completion:** Inclusion-Exclusion certified. Student applies the IE formula with correct alternating signs for 2, 3, and n sets; computes complementary counts; derives the surjection formula; connects IE to derangements; and handles problems with "at least one" and "none" framings correctly.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Möbius inversion on posets; Euler totient via IE; rook polynomial for problème des ménages
Skill tested: Connect combinatorial IE to algebraic number theory (Möbius inversion, Euler phi) and more complex enumeration (ménages problem, rook theory)

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
