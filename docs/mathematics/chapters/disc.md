# Discrete Mathematics

**Domain:** `math.disc`  
**Concepts:** 32  
**Status:** Draft  
**Generated:** 2026-07-11  
**KG Version:** 1.0.1  

---

## Table of Contents

1. [Counting Principles](#counting-principles)
2. [Permutations](#permutations)
3. [Combinations](#combinations)
4. [Binomial Theorem](#binomial-theorem)
5. [Combinatorics](#combinatorics)
6. [Stars and Bars](#stars-and-bars)
7. [Pigeonhole Principle](#pigeonhole-principle)
8. [Inclusion-Exclusion Principle](#inclusion-exclusion-principle)
9. [Derangements](#derangements)
10. [Recurrence Relations](#recurrence-relations)
11. [Linear Recurrences](#linear-recurrences)
12. [Divide-and-Conquer Recurrences](#divide-and-conquer-recurrences)
13. [Generating Functions](#generating-functions)
14. [Ordinary Generating Functions (OGF)](#ordinary-generating-functions-ogf)
15. [Exponential Generating Functions (EGF)](#exponential-generating-functions-egf)
16. [Graph Theory Fundamentals](#graph-theory-fundamentals)
17. [Types of Graphs](#types-of-graphs)
18. [Graph Representations](#graph-representations)
19. [Graph Connectivity](#graph-connectivity)
20. [Eulerian and Hamiltonian Paths](#eulerian-and-hamiltonian-paths)
21. [Trees](#trees)
22. [Spanning Trees](#spanning-trees)
23. [Graph Coloring](#graph-coloring)
24. [Planar Graphs](#planar-graphs)
25. [Propositional Logic](#propositional-logic)
26. [Boolean Circuits](#boolean-circuits)
27. [Predicate Logic](#predicate-logic)
28. [Asymptotic Notation](#asymptotic-notation)
29. [Algorithm Complexity](#algorithm-complexity)
30. [Complexity Classes](#complexity-classes)
31. [Catalan Numbers](#catalan-numbers)
32. [Stirling Numbers](#stirling-numbers)

---

## Counting Principles

**Concept ID:** `math.disc.counting-principles`  
**Prerequisites:** `math.arith.multiplication`, `math.found.set-theory`

The two fundamental counting principles underpin all of combinatorics. The Multiplication Rule (Product Rule) states: if a task can be performed in m ways and a second independent task in n ways, then both together can be performed in m × n ways. The Addition Rule states: if two choices are mutually exclusive (cannot occur together), the total number of options is m + n. These rules chain together—real counting problems often require alternating between them—and they extend naturally to three or more stages or choices. Mastering when to multiply versus when to add is the single most important skill in discrete enumeration.

**Key Ideas:**
- Multiplication Rule: stages that must ALL occur → multiply (AND logic). Addition Rule: alternatives where EXACTLY ONE occurs → add (OR logic).
- A decision tree visualizes the product rule: each level corresponds to one independent choice, and the number of leaves equals the product of branch counts at each level.
- The product rule requires independence: the number of options at each stage must not depend on choices made at earlier stages. When it does depend, use conditional counting and still multiply—but the factors may differ.
- Both rules extend by induction: k mutually exclusive choices with n₁, n₂, …, nₖ options give n₁ + n₂ + … + nₖ total by the addition rule; k sequential independent stages give n₁ × n₂ × … × nₖ total by the product rule.

**Common Misconceptions:**
- **Misconception:** Add when 'there are two things' and multiply when 'there are more.'
  **Correction:** The distinction is logical, not numerical. Add for mutually exclusive alternatives (OR); multiply for sequential/independent stages (AND). 'Choose a shirt OR choose pants' (two categories) still requires multiplication if you must pick one of each.
- **Misconception:** The stages must be physically ordered in time to use the product rule.
  **Correction:** The product rule applies whenever choices are logically independent, regardless of order. Choosing a username (26³ options) and a password (10⁸ options) simultaneously still gives 26³ × 10⁸ total accounts.

**Real-World Applications:**
- Password security analysis: IT departments use the product rule to compute the size of a password space (e.g., 8-character passwords mixing letters, digits, symbols = 94⁸ ≈ 6 × 10¹⁵) to estimate brute-force attack feasibility.
- Genetics: the product rule underlies Punnett squares — two independent traits with 3 allele options each give 3 × 3 = 9 genotype combinations.

---

## Permutations

**Concept ID:** `math.disc.permutations`  
**Prerequisites:** `math.disc.counting-principles`, `math.arith.multiplication`

A permutation is an ordered arrangement of objects. When selecting r items from n distinct objects where order matters, the count is P(n, r) = n!/(n − r)!, derived directly from the product rule: n choices for position 1, then n−1 for position 2, down to n−r+1 for position r. The special case r = n gives n! (read 'n factorial'), the total number of ways to arrange all n objects. Permutations arise whenever the sequence or ranking of selected items is meaningful—finishing order in a race, arrangement of books on a shelf, or scheduling tasks.

**Key Ideas:**
- P(n, r) = n × (n−1) × … × (n−r+1) = n! / (n−r)!. Each factor counts the available objects for the next position after previous selections.
- The key test for permutations: does swapping two selected items produce a DIFFERENT outcome? If yes, order matters → permutation.
- Permutations with repetition (where the same object can be chosen multiple times) give nʳ arrangements, since each of the r positions has n full options.
- Circular permutations of n distinct objects: (n−1)! because one object can be fixed as the 'reference point,' eliminating rotational equivalences.

**Common Misconceptions:**
- **Misconception:** P(n, r) requires memorizing a formula; it can't be derived.
  **Correction:** P(n, r) follows immediately from the product rule: n slots, filled one at a time, with one fewer option each time. P(5, 3) = 5 × 4 × 3 = 60—no formula memorization needed if you understand the product rule.
- **Misconception:** n! grows slowly, so large n values are manageable.
  **Correction:** Factorial growth is superexponential. 10! = 3,628,800; 20! ≈ 2.4 × 10¹⁸. This is why brute-force searching all arrangements of even 20 items is computationally infeasible.

**Real-World Applications:**
- Tournament scheduling: the number of ways to assign 1st/2nd/3rd place in a competition with n participants directly uses P(n,3), guiding bracket design.
- Cryptography: a PIN of 4 distinct digits from 0–9 gives P(10,4) = 5040 combinations, illustrating why distinct-digit PINs are more secure than repeated-digit ones.

---

## Combinations

**Concept ID:** `math.disc.combinations`  
**Prerequisites:** `math.disc.permutations`

A combination is an unordered selection: the r chosen items form a set, not a sequence, so {A, B, C} and {C, A, B} are the same combination. C(n, r) = P(n, r) / r! because every group of r items generates r! permutations all counted as one combination. Equivalently, C(n, r) = n! / (r!(n−r)!). The symbol C(n, r) is also written ⁿCᵣ or (n choose r) — the binomial coefficient. Pascal's identity C(n, r) = C(n−1, r−1) + C(n−1, r) connects adjacent values and underlies Pascal's triangle.

**Key Ideas:**
- C(n, r) = P(n, r) / r!. The division by r! removes the overcounting caused by the r! orderings of the same r-element set.
- Pascal's identity: C(n, r) = C(n−1, r−1) + C(n−1, r). Proof: fix one element x; combinations either include x (choose r−1 from remaining n−1) or exclude x (choose r from remaining n−1).
- Symmetry: C(n, r) = C(n, n−r). Choosing r to include is the same as choosing n−r to exclude.
- The test: would swapping two selected elements produce the SAME outcome? If yes, order doesn't matter → combination.

**Common Misconceptions:**
- **Misconception:** 'Choosing' always means combinations.
  **Correction:** The word 'choose' is ambiguous. Choosing a president, VP, and secretary from 10 people requires permutations (roles differ). Choosing a 3-person committee requires combinations (roles are identical). Read the problem, don't pattern-match on the word 'choose.'
- **Misconception:** C(n, r) = C(n, r−1) (symmetry around r = n/2).
  **Correction:** The symmetry is C(n, r) = C(n, n−r), not C(n, r−1). C(6,2) = 15, C(6,4) = 15, but C(6,1) = 6 ≠ 15.

**Real-World Applications:**
- Genomics: the number of possible single-nucleotide polymorphism (SNP) haplotypes of length k from n positions is C(n, k), central to genome-wide association study design.
- Network design: the number of possible direct links between n nodes is C(n, 2) = n(n−1)/2, determining the upper bound on edges in a complete network.

---

## Binomial Theorem

**Concept ID:** `math.disc.binomial-theorem`  
**Prerequisites:** `math.disc.combinations`

The Binomial Theorem gives a formula for (x + y)ⁿ expanded as a sum of n+1 terms: (x + y)ⁿ = Σₖ₌₀ⁿ C(n,k) xᵏ yⁿ⁻ᵏ. The coefficient C(n,k) — the binomial coefficient — counts how many ways to pick k of the n factors to contribute an x (the rest contribute a y). This combinatorial proof is more insightful than algebraic repeated multiplication: it reveals that the coefficients are exactly the entries of Pascal's triangle. Special cases include (1+x)ⁿ for approximations and (x−y)ⁿ where signs alternate. The theorem generalizes to fractional and negative n via the binomial series in analysis.

**Key Ideas:**
- Combinatorial derivation: expanding (x+y)(x+y)…(x+y) (n factors) picks x or y from each factor; the xᵏyⁿ⁻ᵏ term arises in C(n,k) ways (choose which k factors give x).
- The binomial coefficients are the rows of Pascal's triangle: row n contains C(n,0), C(n,1), …, C(n,n).
- Key identities derivable by substituting x=y=1: Σ C(n,k) = 2ⁿ (total subsets of an n-set); substituting x=1, y=−1: Σ (−1)ᵏ C(n,k) = 0 (equal number of even-/odd-sized subsets).
- The general term (k-th term) of (x+y)ⁿ is C(n,k) xᵏ yⁿ⁻ᵏ. To find a specific term, set the exponent of x equal to the desired power and solve for k.

**Common Misconceptions:**
- **Misconception:** (x + y)ⁿ = xⁿ + yⁿ.
  **Correction:** This is the 'freshman's dream' error, true only when n=1 or in characteristic-p arithmetic. (x+y)² = x² + 2xy + y²; the cross terms arise from C(2,1)=2 ways to choose one x and one y.
- **Misconception:** The coefficient of xᵏ in (x+y)ⁿ is kⁿ or nᵏ.
  **Correction:** It is C(n,k) = n!/(k!(n−k)!). For (x+y)⁵, the coefficient of x³y² is C(5,3) = 10, not 5³=125 or 3⁵=243.

**Real-World Applications:**
- Probability: the binomial distribution P(X=k) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ for n independent Bernoulli trials with success probability p is a direct application of the Binomial Theorem.
- Computer algebra systems: polynomial multiplication algorithms exploit binomial coefficients to expand (a+b)ⁿ efficiently without repeated multiplication.

---

## Combinatorics

**Concept ID:** `math.disc.combinatorics`  
**Prerequisites:** `math.disc.combinations`

Combinatorics is the branch of mathematics that counts, enumerates, and studies discrete structures. Beyond basic permutations and combinations, it includes multiset permutations (arrangements with repeated elements, counted by n!/k₁!k₂!…kₘ!), multinomial coefficients C(n; k₁, k₂, …, kₘ) for distributing n objects into m distinct groups, and combinatorial identities proved by double-counting or bijective proof. The power of combinatorics lies in reformulating counting problems as equivalent problems with known answers, then establishing bijections between the two sets. Combinatorics interacts deeply with probability, number theory, graph theory, and algorithm analysis.

**Key Ideas:**
- Multinomial coefficient: arranging n objects with kᵢ copies of type i gives n!/(k₁!k₂!…kₘ!) distinct arrangements. Generalizes both permutations (all kᵢ=1) and combinations (m=2).
- Double-counting (Counting two ways): prove identity |A| = |B| by independently counting the same set in two different ways. Classic example: Σₖ C(n,k) = 2ⁿ (count subsets by choosing each element in/out vs. by size).
- Bijective proof: establish a one-to-one correspondence between two sets to prove they have equal cardinality. More illuminating than algebraic manipulation because it shows WHY the identity holds.
- Complementary counting: count the total and subtract the 'bad' outcomes. Often easier than direct counting when restrictions are complex.

**Common Misconceptions:**
- **Misconception:** Counting problems always have clean closed-form answers.
  **Correction:** Many combinatorial quantities (e.g., the number of graphs on n vertices, partitions of n into primes) have no known closed form and are studied asymptotically. The existence of a 'nice' formula is a result, not an assumption.
- **Misconception:** Bijective proof is just a trick; algebraic proof is more rigorous.
  **Correction:** Bijective proofs are fully rigorous. For identity C(n,k) = C(n, n−k): the map that sends each k-subset S to its complement S̄ is a bijection between k-subsets and (n−k)-subsets. This is both rigorous and more insightful than algebraic cancellation.

**Real-World Applications:**
- Natural language processing: the multinomial coefficient counts the number of distinct orderings of words in a sentence, used in statistical language model perplexity calculations.
- Drug trial design: combinatorics determines how many distinct treatment sequences are possible in a crossover trial, affecting the number of patients needed.

---

## Stars and Bars

**Concept ID:** `math.disc.stars-bars`  
**Prerequisites:** `math.disc.combinations`

Stars and Bars (also called 'balls and bins') solves a canonical combinatorial problem: in how many ways can n identical objects be placed into k distinct labeled bins? The key insight is that any distribution corresponds to a sequence of n stars (objects) and k−1 bars (dividers), which is a sequence of length n+k−1 with k−1 bars among them. The answer is C(n+k−1, k−1) = C(n+k−1, n). For the constrained version (each bin ≥ 1 object), give one object to each bin first, reducing to C(n−1, k−1). This technique applies to integer solutions of equations and distributing resources.

**Key Ideas:**
- Bijection: each distribution of n identical balls into k distinct bins ↔ each sequence of n stars and k−1 bars → C(n+k−1, k−1) total distributions.
- Non-negative integer solutions of x₁ + x₂ + … + xₖ = n: exactly C(n+k−1, k−1) solutions (each solution corresponds to a distribution).
- Positive integer solutions (each xᵢ ≥ 1): substitute yᵢ = xᵢ − 1 ≥ 0, reducing to y₁ + … + yₖ = n−k, giving C(n−1, k−1) solutions.
- Upper bound constraints (each xᵢ ≤ uᵢ): use inclusion-exclusion on the 'violation' events where some xᵢ exceeds its bound.

**Common Misconceptions:**
- **Misconception:** Stars and Bars works for distinguishable objects.
  **Correction:** Stars and Bars counts arrangements when the objects are identical. If objects are distinguishable, you must use a different method (e.g., the multinomial coefficient or direct product rule).
- **Misconception:** The formula is C(n, k−1) — just n choose k−1.
  **Correction:** The formula is C(n+k−1, k−1). The n+k−1 comes from the total length of the stars-and-bars string (n stars + k−1 bars). Forgetting the +k−1 is the most common error.

**Real-World Applications:**
- Resource allocation: distributing computational tasks (identical jobs) across servers (distinct bins) uses the Stars and Bars formula to count possible load distributions.
- Pharmacy: counting the number of distinct drug dosage schedules that give a patient exactly n total pills across k days (each day ≥ 0 pills) applies the formula directly.

---

## Pigeonhole Principle

**Concept ID:** `math.disc.pigeonhole`  
**Prerequisites:** `math.disc.counting-principles`

The Pigeonhole Principle (Dirichlet's box principle) states: if more than k objects are placed into k bins, at least one bin contains at least 2 objects. More generally, if n objects are placed into k bins, at least one bin contains at least ⌈n/k⌉ objects. This seemingly trivial observation has profound consequences: it proves the existence of coincidences without constructing them explicitly. In mathematics, the Pigeonhole Principle is used to prove results in number theory, combinatorics, geometry, and analysis — often in non-obvious disguise where the 'bins' are abstract equivalence classes.

**Key Ideas:**
- Basic form: n+1 objects, n bins → some bin has ≥ 2 objects. Proof by contradiction: if every bin had ≤ 1 object, total objects ≤ n, contradicting n+1.
- Generalized form: n objects, k bins → some bin has ≥ ⌈n/k⌉ objects. The ceiling is necessary: n=7, k=3 → ⌈7/3⌉=3, so some bin has ≥ 3 objects.
- The proof method: to apply Pigeonhole, identify the 'objects' and 'bins' explicitly. The bins are often defined by a modular arithmetic class, geometric region, or a value range.
- Non-constructive: Pigeonhole guarantees existence without specifying which bin is overloaded. Constructive identification of the overloaded bin requires additional argument.

**Common Misconceptions:**
- **Misconception:** The Pigeonhole Principle requires physical objects in physical boxes.
  **Correction:** The 'objects' and 'bins' are mathematical abstractions. In the proof that some two integers from {1,…,101} sum to 202: 'bins' are pairs {k, 202−k} and 'objects' are the 51 integers. The power is in choosing the right abstraction.
- **Misconception:** ⌈n/k⌉ is always the exact maximum; some bin always achieves it.
  **Correction:** ⌈n/k⌉ is a lower bound on the maximum. Some bin has AT LEAST this many objects, but others may have more. Distribution of 7 objects into 3 bins could be (3,3,1), (3,2,2), (7,0,0), etc.

**Real-World Applications:**
- Data compression: the Pigeonhole Principle proves no lossless compression algorithm can compress ALL inputs — if n-bit strings map to shorter strings, there are more inputs (2ⁿ) than outputs (2ⁿ−1+…+1 < 2ⁿ), so some two inputs must map to the same compressed form.
- Collision in hash functions: a hash function mapping arbitrary inputs to 32-bit outputs means that for any 2³² + 1 inputs, at least two must hash to the same value — the existence of hash collisions is a Pigeonhole consequence.

---

## Inclusion-Exclusion Principle

**Concept ID:** `math.disc.inclusion-exclusion`  
**Prerequisites:** `math.disc.combinations`, `math.found.set-operations`

The Principle of Inclusion-Exclusion (PIE) gives an exact formula for the size of a union of sets by correcting for over-counting due to overlaps. For two sets: |A ∪ B| = |A| + |B| − |A ∩ B|. For three sets: |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|. The general pattern for n sets alternates between adding k-element intersection sizes (for odd k) and subtracting them (for even k). PIE is the combinatorial foundation for counting elements satisfying 'at least one' of several properties, and its complement gives elements satisfying 'none' of the properties — the sieve formula.

**Key Ideas:**
- Two-set formula: |A∪B| = |A|+|B|−|A∩B|. The intersection is subtracted once because it was added twice (once for A, once for B).
- General n-set formula: |A₁∪…∪Aₙ| = Σᵢ|Aᵢ| − Σᵢ<ⱼ|Aᵢ∩Aⱼ| + Σᵢ<ⱼ<ₖ|Aᵢ∩Aⱼ∩Aₖ| − … Each element in exactly m of the Aᵢ's is counted C(m,1)−C(m,2)+…+(−1)ᵐ⁺¹C(m,m) = 1 time.
- Complementary (sieve): the number of elements in NONE of the sets A₁,…,Aₙ equals |U| − |A₁∪…∪Aₙ| (where U is the universe). This is the sieve of Eratosthenes formulation.
- The formula has 2ⁿ−1 terms for n sets (exponential), making it intractable for large n without additional structure. Practical use is mainly n ≤ 5.

**Common Misconceptions:**
- **Misconception:** |A ∪ B ∪ C| = |A| + |B| + |C| − |A∩B| − |A∩C| − |B∩C| (forgetting the triple intersection).
  **Correction:** Must add back |A∩B∩C|. Elements in all three sets are added 3 times, subtracted 3 times, giving net 0 — they must be added back once. The full formula has +|A∩B∩C|.
- **Misconception:** PIE only works when the sets are disjoint.
  **Correction:** PIE is specifically designed for OVERLAPPING sets. For disjoint sets, |A∪B| = |A|+|B| trivially (no correction needed). PIE corrects for the overlaps.

**Real-World Applications:**
- Database query optimization: counting records matching 'condition A OR condition B OR condition C' uses PIE to avoid double-counting rows satisfying multiple conditions.
- Sieve of Eratosthenes: counting primes up to n uses PIE to subtract composite numbers divisible by 2, 3, 5, … and add back those counted twice, a direct application of the sieve formula.

---

## Derangements

**Concept ID:** `math.disc.derangements`  
**Prerequisites:** `math.disc.inclusion-exclusion`

A derangement is a permutation of {1, 2, …, n} in which no element appears in its original position (no fixed points). D(n) = n! Σₖ₌₀ⁿ (−1)ᵏ/k! = n!(1 − 1 + 1/2! − 1/3! + … + (−1)ⁿ/n!). As n → ∞, D(n)/n! → 1/e ≈ 0.3679, so about 36.8% of all permutations are derangements. Derangements arise in the 'hat-check' problem, secret Santa assignments, and Latin square constructions. The recurrence D(n) = (n−1)(D(n−1) + D(n−2)) offers an efficient computation and an insightful combinatorial proof.

**Key Ideas:**
- Derivation via PIE: let Aᵢ = permutations where element i is fixed. |A₁∪…∪Aₙ| by PIE = Σ(n−1)! − Σ(n−2)! + … D(n) = n! − |A₁∪…∪Aₙ| gives the inclusion-exclusion formula.
- Recurrence D(n) = (n−1)(D(n−1) + D(n−2)): element n goes to position k ≠ n (n−1 choices). If k also goes to position n: a derangement of the remaining n−2 → D(n−2) ways. If k doesn't go to n: relabel k↔n, giving a derangement of n−1 elements → D(n−1) ways.
- Asymptotic: D(n) ≈ n!/e for large n. This means roughly 1 in e ≈ 2.718 permutations is a derangement.
- Small values: D(1)=0, D(2)=1, D(3)=2, D(4)=9, D(5)=44, D(6)=265.

**Common Misconceptions:**
- **Misconception:** D(n) = n! − n (subtract one permutation per element that could be fixed).
  **Correction:** This overcounts — a permutation where element 1 AND element 2 are both fixed is subtracted twice. The correct formula requires inclusion-exclusion to handle all overlap cases.
- **Misconception:** D(n)/n! approaches 0 because most permutations have fixed points.
  **Correction:** D(n)/n! → 1/e ≈ 0.368, not 0. More than a third of all permutations are derangements. The probability that a random permutation is a derangement converges to 1/e.

**Real-World Applications:**
- Secret Santa / gift exchanges: derangements count valid assignments where no participant draws themselves, and software generating these assignments implements derangement algorithms.
- Latin squares: a derangement of rows in a Latin square construction ensures no symbol repeats in any row, forming a key building block for experimental design.

---

## Recurrence Relations

**Concept ID:** `math.disc.recurrence-relation`  
**Prerequisites:** `math.seq.sequence`, `math.alg.polynomial`

A recurrence relation defines each term of a sequence in terms of one or more previous terms, together with initial conditions (base cases). Examples: Fibonacci aₙ = aₙ₋₁ + aₙ₋₂; Factorial n! = n·(n−1)!; Tower of Hanoi T(n) = 2T(n−1) + 1. Recurrences are the natural language for recursive algorithms and divide-and-conquer strategies. The solution of a recurrence is a closed-form expression for the n-th term; finding it requires techniques like characteristic roots (for linear), generating functions (for non-linear or complex), or the Master Theorem (for divide-and-conquer recurrences).

**Key Ideas:**
- A recurrence has two parts: the recurrence rule (how term n depends on earlier terms) and the initial/base conditions (values needed to start the recursion).
- The order of a recurrence is the number of previous terms it references. Order k recurrences need k base cases.
- Iteration (unrolling): substitute the recurrence into itself repeatedly until reaching the base case. Useful for simple recurrences; gives a sum that may have a closed form.
- Recurrences model divide-and-conquer algorithms: if an algorithm splits an n-input problem into a subproblems of size n/b with O(nᵈ) work at each level, then T(n) = aT(n/b) + O(nᵈ).

**Common Misconceptions:**
- **Misconception:** A recurrence is only defined when there's an explicit formula for aₙ in terms of n.
  **Correction:** Recurrences define aₙ implicitly through earlier terms. The existence of a closed-form solution is a separate question (and sometimes there is none). The recurrence itself is a complete, unambiguous definition.
- **Misconception:** The base case can be anything; it doesn't affect the solution.
  **Correction:** Base cases are essential. Fibonacci with a₀=1, a₁=1 vs. a₀=0, a₁=1 produces the same recurrence but different sequences (Lucas numbers vs. Fibonacci). Wrong base cases give wrong answers.

**Real-World Applications:**
- Dynamic programming: virtually every DP algorithm (shortest paths, knapsack, edit distance) is expressed and analyzed through a recurrence relation that defines subproblem solutions.
- Financial modeling: compound interest A(n) = (1+r)A(n−1) is a first-order linear recurrence whose closed form A(n) = A(0)(1+r)ⁿ is the standard compound interest formula.

---

## Linear Recurrences

**Concept ID:** `math.disc.linear-recurrence`  
**Prerequisites:** `math.disc.recurrence-relation`, `math.alg.polynomial-roots`

A linear recurrence with constant coefficients has the form aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + … + cₖaₙ₋ₖ. Its characteristic equation is xᵏ − c₁xᵏ⁻¹ − … − cₖ = 0. If the k roots r₁, r₂, …, rₖ are distinct, the general solution is aₙ = A₁r₁ⁿ + A₂r₂ⁿ + … + Aₖrₖⁿ, with constants determined by the initial conditions. If root r has multiplicity m, it contributes (A₀ + A₁n + … + Aₘ₋₁nᵐ⁻¹)rⁿ. For non-homogeneous recurrences aₙ = (homogeneous part) + f(n), the solution is the general homogeneous solution plus a particular solution.

**Key Ideas:**
- Characteristic root method: assume aₙ = rⁿ; substitute into the recurrence to get the characteristic polynomial; roots give basis solutions; combine linearly.
- Fibonacci closed form (Binet's formula): F(n) = (φⁿ − ψⁿ)/√5 where φ=(1+√5)/2 ≈ 1.618 (golden ratio) and ψ=(1−√5)/2 ≈ −0.618. Characteristic equation: r²−r−1=0.
- Repeated root r with multiplicity m: basis solutions are rⁿ, n·rⁿ, n²·rⁿ, …, nᵐ⁻¹·rⁿ. The polynomial factor compensates for the 'extra' solutions that would otherwise be missing.
- Non-homogeneous: if f(n) = polynomial × (root)ⁿ where the root is already a characteristic root of multiplicity m, multiply the particular-solution trial form by nᵐ.

**Common Misconceptions:**
- **Misconception:** The characteristic roots of a recurrence are the values of aₙ.
  **Correction:** The characteristic roots are bases rᵢ for the exponential terms rᵢⁿ in the solution. The values aₙ themselves are linear combinations A₁r₁ⁿ + A₂r₂ⁿ + … determined by the initial conditions.
- **Misconception:** Two distinct roots always give two independent solutions, even if one is complex.
  **Correction:** Complex conjugate roots r, r̄ = α ± βi give real solutions αⁿcos(nθ) and αⁿsin(nθ) where r = αe^(iθ). Using complex exponentials and taking real/imaginary parts gives the real basis.

**Real-World Applications:**
- Signal processing: linear recurrences model digital IIR (Infinite Impulse Response) filters, whose frequency response is determined by the characteristic roots (poles of the z-transform).
- Population modeling: the Leslie matrix model for age-structured populations yields a linear recurrence whose largest characteristic root is the asymptotic growth rate.

---

## Divide-and-Conquer Recurrences

**Concept ID:** `math.disc.divide-conquer-recurrence`  
**Prerequisites:** `math.disc.recurrence-relation`, `math.alg.logarithm`

Divide-and-conquer recurrences arise when an algorithm of size n splits into a subproblems of size n/b and performs f(n) additional work at the current level. The Master Theorem gives the asymptotic solution in three cases based on comparing f(n) to nˡᵒᵍ_ᵦ⁽ᵃ⁾ (the 'watershed function'): (1) if f(n) = O(nˡᵒᵍ_ᵦ⁽ᵃ⁾⁻ᵉ), then T(n) = Θ(nˡᵒᵍ_ᵦ⁽ᵃ⁾); (2) if f(n) = Θ(nˡᵒᵍ_ᵦ⁽ᵃ⁾), then T(n) = Θ(nˡᵒᵍ_ᵦ⁽ᵃ⁾ log n); (3) if f(n) = Ω(nˡᵒᵍ_ᵦ⁽ᵃ⁾⁺ᵉ) and the regularity condition holds, then T(n) = Θ(f(n)). Classic examples: Merge Sort T(n)=2T(n/2)+Θ(n) → Θ(n log n); Binary Search T(n)=T(n/2)+Θ(1) → Θ(log n); Matrix multiplication via Strassen T(n)=7T(n/2)+Θ(n²) → Θ(n^2.807).

**Key Ideas:**
- The parameter log_b(a) is the critical exponent: it equals the 'cost' of the recursive splitting. If f(n) is smaller, recursion dominates; if larger, the top-level work dominates; if equal, they interleave giving an extra log factor.
- Recursion tree method: draw the tree of recursive calls, label work at each level, count levels, sum across levels. Provides intuition for all three Master Theorem cases.
- The Master Theorem does NOT apply when f(n) is not a polynomial (e.g., f(n) = n log n may fall in gaps between the cases), or when a or b are not constants, or when the split is unequal (use Akra-Bazzi for unequal splits).
- Strassen's algorithm (1969) was the first sub-cubic matrix multiplication: 7 multiplications of n/2 × n/2 matrices → T(n) = 7T(n/2)+O(n²) → T(n) = O(n^log₂7) ≈ O(n^2.807).

**Common Misconceptions:**
- **Misconception:** T(n) = 2T(n/2) + O(n²) has T(n) = O(n² log n) (applying Case 2).
  **Correction:** n^log₂(2) = n¹ = n. Since f(n)=n² = Ω(n¹⁺¹), Case 3 applies: T(n) = O(n²). The extra log factor only appears in Case 2 when f(n) = Θ(nˡᵒᵍ_ᵦ⁽ᵃ⁾).
- **Misconception:** Smaller a (fewer subproblems) always gives a faster algorithm.
  **Correction:** The ratio a to b matters, specifically log_b(a). Reducing a from 8 to 7 (Strassen) lowers the exponent from 3 to 2.807. The gain depends on both the number of subproblems and the splitting factor.

**Real-World Applications:**
- Algorithm design: the Master Theorem is the first analysis tool applied to any new divide-and-conquer algorithm, giving immediate complexity classification.
- Database indexing: B-tree operations split data into b subtrees at each level; the Master Theorem (or its tree-counting equivalent) explains why B-tree search is O(log n) despite the branching factor.

---

## Generating Functions

**Concept ID:** `math.disc.generating-functions`  
**Prerequisites:** `math.disc.combinatorics`, `math.disc.recurrence-relation`, `math.seq.series`

A generating function (GF) encodes a sequence a₀, a₁, a₂, … as the formal power series G(x) = a₀ + a₁x + a₂x² + … = Σₙ≥₀ aₙxⁿ. The variable x is a formal bookkeeping tool, not a number we substitute. Algebraic operations on GFs translate into operations on their coefficient sequences: multiplication of GFs corresponds to convolution of sequences; differentiation shifts coefficients. GFs solve recurrences by converting them into algebraic equations for G(x), then extracting coefficients by partial fractions or known series expansions. They also count combinatorial structures by encoding counting rules as product/sum operations on GFs.

**Key Ideas:**
- The GF of the all-ones sequence (1,1,1,…) is 1/(1−x) (geometric series). The GF of the sequence (C(n,k))ₙ≥₀ is 1/(1−x)ᵏ⁺¹ (negative binomial). These are the two workhorses of combinatorial GF computation.
- Recurrence → algebraic equation: multiply both sides of the recurrence by xⁿ, sum over all valid n, and recognize Σaₙxⁿ = G(x). The result is an algebraic equation for G(x), which can be solved.
- Convolution: if G(x) = A(x)·B(x), then gₙ = Σₖ₌₀ⁿ aₖbₙ₋ₖ. Counting sequences built by choosing one element from each of two sets corresponds to multiplying their GFs.
- Partial fractions: once G(x) = P(x)/Q(x) is a rational function, factor Q and decompose into partial fractions; each term r/(1−αx) contributes αⁿ·r to the coefficient of xⁿ, recovering the closed form.

**Common Misconceptions:**
- **Misconception:** The generating function G(x) is only valid when |x| < 1 (convergence radius).
  **Correction:** Generating functions are formal power series — x is a symbol, not a variable we evaluate. Convergence is irrelevant for coefficient extraction. We only 'substitute' values to derive functional equations, then immediately return to formal manipulation.
- **Misconception:** Exponential generating functions (EGFs) are just GFs with factorials, so OGFs are more natural.
  **Correction:** EGFs (where aₙ is encoded as xⁿ/n!) are the natural tool when counting labeled structures (permutations, arrangements) because the factorial accounts for labeling. OGFs are natural for unlabeled structures (partitions, graphs by structure). The right choice depends on the combinatorial context.

**Real-World Applications:**
- Combinatorics of coin change: the number of ways to make n cents from pennies, nickels, dimes, quarters is the coefficient of xⁿ in 1/((1−x)(1−x⁵)(1−x¹⁰)(1−x²⁵)), computed via generating function multiplication.
- Random walk analysis: the probability generating function G(z) = Σ pₙzⁿ (where pₙ = probability of return in n steps) encodes the full walk distribution, and its singularities determine recurrence vs. transience.

---

## Ordinary Generating Functions (OGF)

**Concept ID:** `math.disc.ogf`  
**Prerequisites:** `math.disc.generating-functions`

An Ordinary Generating Function (OGF) for a sequence (aₙ)ₙ≥₀ is A(x) = Σₙ≥₀ aₙxⁿ. OGFs are the natural tool for counting unlabeled combinatorial structures: the number of ways to build a structure of 'size n' is the coefficient [xⁿ]A(x). Independent choices combine by multiplication: if objects of type 1 have OGF A(x) and type 2 have B(x), structures combining both types have OGF A(x)·B(x). Key OGFs: partitions, integer compositions (ordered partitions), coin change, multisets. The Newton binomial series (1+x)^α = Σ C(α,n)xⁿ for real α extends beyond integers, enabling computation of OGFs for sequences involving roots and negative binomials.

**Key Ideas:**
- Fundamental OGFs: Σxⁿ = 1/(1−x) (all non-neg integers); Σ C(n+k,k)xⁿ = 1/(1−x)^(k+1) (multisets of size n from k types); Σ xⁿ/n! = eˣ (EGF, not OGF, but contrasted here).
- Product formula for independent structures: if structure A contributes part 1 and structure B contributes part 2, and their sizes add, then A(x)·B(x) has coefficient [xⁿ] = number of ways to form size-n structure as (size-j part A) + (size-(n−j) part B) summed over j.
- Coin change: making n cents with coins of denominations d₁, d₂, … has OGF Πᵢ 1/(1−x^dᵢ). The product is over coin types; 1/(1−x^d) encodes using d-cent coins 0, 1, 2, … times.
- Extraction shortcuts: [xⁿ] 1/(1−x)ᵏ = C(n+k−1, k−1) (stars and bars). [xⁿ] xᵐ/(1−x)ᵏ = C(n−m+k−1, k−1).

**Common Misconceptions:**
- **Misconception:** OGF and EGF give the same counting information; the choice is just notational.
  **Correction:** OGFs and EGFs count different things. The OGF coefficient [xⁿ] counts unlabeled or unordered structures; the EGF coefficient n![xⁿ] counts labeled structures. For permutations, the EGF is eˣ/(1−x) but the OGF is more complex. Choosing the wrong type gives wrong answers.
- **Misconception:** The OGF of the partition function p(n) (number of integer partitions of n) is computable in closed form.
  **Correction:** p(n)'s OGF is Π_{k≥1} 1/(1−xᵏ) (Euler's product formula), an infinite product with no simple closed form. The values p(n) grow sub-exponentially: p(100) = 190,569,292, but there's no elementary formula — Hardy-Ramanujan's asymptotic is the best known result.

**Real-World Applications:**
- Compiler optimization: counting the number of ways to parse an expression tree (Catalan-type structures) uses OGFs, and the singularity of the OGF determines asymptotic parse-tree counts.
- Statistical mechanics: the partition function in physics (counting microstates) is formally an OGF, and its singularity structure determines phase transitions.

---

## Exponential Generating Functions (EGF)

**Concept ID:** `math.disc.egf`  
**Prerequisites:** `math.disc.generating-functions`

An Exponential Generating Function (EGF) for a sequence (aₙ)ₙ≥₀ is  Â(x) = Σₙ≥₀ aₙ xⁿ/n!. The coefficient of xⁿ/n! in the EGF equals aₙ — the number of labeled structures of size n. The key advantage: if labeled structures of type A have EGF Â(x) and type B have B̂(x), then a labeled structure formed by partitioning an n-element set into a type-A part and a type-B part has EGF Â(x)·B̂(x). This 'labeled product' formula is the EGF analog of OGF multiplication, but for labeled structures. Standard EGFs: eˣ for sets (permutations), 1/(1−x) for sequences, eˣ−1 for non-empty sets, log(1/(1−x)) for cycles.

**Key Ideas:**
- EGF product theorem: [xⁿ/n!] Â(x)B̂(x) = Σₖ C(n,k) aₖ bₙ₋ₖ. The binomial coefficient C(n,k) counts the ways to choose which k elements go to the type-A part, automatically handling all relabelings.
- Permutations: EGF of (n!) = 1/(1−x). Derangements: EGF = e⁻ˣ/(1−x). Involutions (permutations equal to their inverse): EGF = e^(x+x²/2).
- Set partitions into non-empty blocks (Bell numbers Bₙ): EGF = e^(eˣ−1). Cycles: EGF = log(1/(1−x)) = Σ (n−1)! xⁿ/n! = Σ xⁿ/n. Permutations as assemblies of cycles: e^(log(1/(1−x))) = 1/(1−x). ✓
- Symbolic method: complex EGFs are built by composition of atomic EGFs (SET, CYCLE, SEQ, etc.) — a calculus for labeled structures that automatically gives the right EGF without manual derivation.

**Common Misconceptions:**
- **Misconception:** EGF coefficients are [xⁿ] just like OGF coefficients.
  **Correction:** EGF coefficients are n! × [xⁿ]. If the EGF is eˣ = Σ xⁿ/n!, then [xⁿ] eˣ = 1/n!, but the number of structures (the aₙ) is 1 for all n (there is one empty labeled set of each size n — namely {1,2,…,n}). Always multiply by n! when extracting from an EGF.
- **Misconception:** OGF and EGF can be used interchangeably; just pick whichever is simpler.
  **Correction:** OGFs count unlabeled structures; EGFs count labeled structures. Mixing them gives wrong answers. The number of labeled graphs on n vertices is 2^C(n,2); the EGF captures this. The number of unlabeled graphs (graph isomorphism classes) is much smaller and requires OGFs (or Burnside's lemma).

**Real-World Applications:**
- Bioinformatics: EGFs count the number of distinct molecular structures (RNA secondary structures, protein fold topologies) by treating them as labeled assemblies of loops and stems.
- Network enumeration: counting labeled trees on n vertices uses Cayley's formula n^(n−2), derived via EGFs and the matrix-tree theorem.

---

## Graph Theory Fundamentals

**Concept ID:** `math.disc.graph`  
**Prerequisites:** `math.found.set-theory`

A graph G = (V, E) consists of a vertex set V and an edge set E, where each edge is a pair of vertices. If edges are unordered pairs {u,v}, G is undirected; if ordered pairs (u,v), it is directed (digraph). The degree of a vertex v, denoted deg(v), counts the edges incident to v. The Handshaking Lemma states Σ deg(v) = 2|E|, since each edge contributes 1 to each endpoint's degree. A simple graph has no loops (edge from a vertex to itself) and no multi-edges (at most one edge between any pair). Graphs are the foundational model for networks, relationships, and connectivity in computer science, operations research, and combinatorics.

**Key Ideas:**
- A graph G=(V,E) is defined by its vertex set V and edge set E ⊆ V×V (undirected: unordered pairs). |V| = n (order), |E| = m (size) are standard notation.
- Handshaking Lemma: Σᵥ deg(v) = 2m. Consequence: every graph has an even number of odd-degree vertices.
- A complete graph Kₙ has all C(n,2) = n(n−1)/2 edges. A bipartite graph has vertex set partitioned into two disjoint sets A, B with all edges between A and B (none within A or within B).
- Subgraph: H is a subgraph of G if V(H) ⊆ V(G) and E(H) ⊆ E(G). Induced subgraph on S ⊆ V: take all vertices in S and all edges of G between them.

**Common Misconceptions:**
- **Misconception:** A graph is always drawn with straight edges; curves or crossings make it a different graph.
  **Correction:** A graph is a purely combinatorial object (V, E) — a set-theoretic structure. The drawing is just a visualization. Two drawings represent the same graph if they have the same vertex set and edge set, regardless of how edges are drawn.
- **Misconception:** A vertex with degree 0 is not part of the graph.
  **Correction:** An isolated vertex (degree 0) is a valid vertex in the graph. V contains it; it simply has no edges incident to it. Isolated vertices arise naturally (e.g., a person with no social connections in a social network).

**Real-World Applications:**
- Social networks: vertices = people, edges = friendships. The degree of a vertex is a person's number of connections. Graph theory analysis reveals community structure, influencers, and information spread paths.
- Internet routing: routers are vertices, links are edges. Graph algorithms (shortest paths, spanning trees) determine how packets are routed.

---

## Types of Graphs

**Concept ID:** `math.disc.graph-types`  
**Prerequisites:** `math.disc.graph`

Graphs come in many types based on structural properties. A regular graph has every vertex with the same degree; a k-regular graph has all vertices with degree k. A complete graph Kₙ is (n−1)-regular with all possible edges. A bipartite graph partitions vertices into two independent sets A and B, with edges only between sets; complete bipartite Kₘ,ₙ has all m·n cross-edges. A tree is a connected acyclic graph (exactly n−1 edges for n vertices). A weighted graph assigns a real number (weight) to each edge. A directed graph (digraph) gives each edge a direction; in-degree and out-degree replace the single degree. Multigraphs allow multiple edges (parallel edges) between vertex pairs; hypergraphs allow edges connecting more than 2 vertices.

**Key Ideas:**
- Bipartite test: a graph is bipartite if and only if it has no odd-length cycles (König's theorem). Two-coloring of vertices (BFS-based) detects this in O(V+E) time.
- Complement graph Ḡ: same vertex set as G, but edge {u,v} is in Ḡ iff it is NOT in G. |E(Ḡ)| = C(n,2) − |E(G)|. Ramsey theory studies cliques in G and independent sets in Ḡ.
- Planar graph: can be drawn in the plane with no edge crossings. K₅ and K₃,₃ are the minimal non-planar graphs (Kuratowski's theorem).
- Tournament: complete directed graph (exactly one directed edge between every pair). Models round-robin competitions where each pair plays once.

**Common Misconceptions:**
- **Misconception:** A bipartite graph can't have cycles.
  **Correction:** Bipartite graphs can have cycles — they just can't have ODD-length cycles. The 4-cycle C₄ is bipartite (alternating vertex sets). All even cycles are bipartite.
- **Misconception:** Trees are a special case of bipartite graphs, so they're not 'real' trees.
  **Correction:** Trees are indeed bipartite (they have no odd cycles since they have no cycles at all). Being bipartite is an additional property trees have, not a contradiction. A tree is defined by connectedness + acyclicity.

**Real-World Applications:**
- Job matching: bipartite graphs model job-candidate assignments (Kₘ,ₙ = all m candidates for n jobs); maximum bipartite matching algorithms find optimal assignments.
- Transportation networks: directed weighted graphs model road networks with one-way streets (directed) and travel times (weighted); Dijkstra's algorithm finds shortest routes.

---

## Graph Representations

**Concept ID:** `math.disc.graph-representation`  
**Prerequisites:** `math.disc.graph`, `math.linalg.matrix`

Graphs are stored computationally in two primary representations. The adjacency matrix A is an n×n matrix where Aᵢⱼ = 1 if edge {i,j} exists, 0 otherwise (for simple undirected graphs, A is symmetric). It uses O(n²) space but supports O(1) edge queries. The adjacency list stores, for each vertex, a list of its neighbors; space is O(n+m) and is efficient for sparse graphs. The key trade-off: dense graphs (m ≈ n²) favor matrices; sparse graphs (m ≪ n²) favor lists. The matrix representation has a powerful property: (Aᵏ)ᵢⱼ counts the number of walks of length k from vertex i to vertex j.

**Key Ideas:**
- Adjacency matrix for simple undirected graph: symmetric (Aᵢⱼ = Aⱼᵢ), 0 diagonal (no self-loops). For weighted graphs, Aᵢⱼ = weight(i,j) or ∞ if no edge.
- Adjacency list: array of n lists; list i contains the neighbors of vertex i. Space O(n+m). BFS/DFS naturally use adjacency lists. Finding a specific edge takes O(deg(v)) time.
- (Aᵏ)ᵢⱼ = number of walks of length exactly k from i to j. (A²)ᵢⱼ counts paths of length 2 (via one intermediate vertex). Useful for counting triangles: Tr(A³)/6.
- Incidence matrix B: n×m matrix, Bᵢₑ = 1 if vertex i is incident to edge e. BBᵀ = degree matrix D minus adjacency matrix A → yields the graph Laplacian L = D − A, central to spectral graph theory.

**Common Misconceptions:**
- **Misconception:** The adjacency matrix is always the best representation because matrix operations are well-studied.
  **Correction:** For sparse graphs (e.g., social networks with millions of vertices but average degree 50), the adjacency matrix requires O(n²) = O(10¹²) space — infeasible. Adjacency lists use O(n + m) = O(n·50) which is practical. Always match representation to graph density.
- **Misconception:** (Aᵏ)ᵢⱼ counts paths of length k, not walks.
  **Correction:** It counts WALKS of length k (sequences v₀,v₁,…,vₖ where {vᵢ,vᵢ₊₁} ∈ E; vertices and edges may repeat). Counting simple paths (no vertex repeated) is much harder — it's #P-hard in general.

**Real-World Applications:**
- PageRank: Google's original algorithm represents the web as an adjacency matrix (n×n for n webpages) and computes the dominant eigenvector, which measures page importance.
- Protein interaction networks: stored as adjacency lists (sparse: thousands of proteins, tens of thousands of interactions). Graph algorithms on these lists identify functional modules.

---

## Graph Connectivity

**Concept ID:** `math.disc.graph-connectivity`  
**Prerequisites:** `math.disc.graph`

A graph G is connected if there is a path between every pair of vertices. A path is a sequence of distinct vertices v₀, v₁, …, vₖ where each consecutive pair {vᵢ, vᵢ₊₁} is an edge; its length is k. A connected component is a maximal connected subgraph. BFS (Breadth-First Search) and DFS (Depth-First Search) each visit all vertices reachable from a source in O(V+E) time, simultaneously finding connected components and shortest paths (BFS). Vertex connectivity κ(G) is the minimum number of vertices whose removal disconnects G; edge connectivity λ(G) is the minimum number of edges whose removal disconnects G. Whitney's theorem: κ(G) ≤ λ(G) ≤ min degree.

**Key Ideas:**
- BFS from source s: visits vertices in order of distance from s; produces a BFS tree with shortest-path distances. DFS: explores as deep as possible before backtracking; produces DFS tree and discovers back edges (cycles), forward edges (already-visited paths).
- A cut vertex (articulation point) is a vertex whose removal increases the number of connected components. A bridge is an edge whose removal increases the component count. Both can be found in O(V+E) via DFS.
- Menger's theorem: the maximum number of internally vertex-disjoint paths between s and t equals the minimum vertex cut separating s and t (analogous to max-flow min-cut for edges).
- Strong connectivity (digraphs): a directed graph is strongly connected if every vertex is reachable from every other. Strongly connected components (SCCs) are found by Tarjan's or Kosaraju's algorithm in O(V+E).

**Common Misconceptions:**
- **Misconception:** A graph is connected if you can draw it without lifting your pen.
  **Correction:** That intuition only applies to Eulerian paths (traversing all edges), not general connectivity. A connected graph requires a PATH (vertex sequence) between every pair of vertices, not a single pen-stroke traversing all edges.
- **Misconception:** Every tree is connected, so trees have no interesting connectivity structure.
  **Correction:** Trees are connected but have the lowest possible connectivity: removing any single edge disconnects them (every edge is a bridge), and removing any internal vertex disconnects them (every internal vertex is a cut vertex). Trees have λ = κ = 1, the minimum for connected graphs.

**Real-World Applications:**
- Network reliability: utilities (power grids, internet backbone) model robustness as graph connectivity; κ(G) and λ(G) measure how many failures the network can tolerate before fragmenting.
- Epidemiology: disease spread models use connectivity to identify which communities are 'bridges' between otherwise isolated populations, targeting intervention at cut vertices.

---

## Eulerian and Hamiltonian Paths

**Concept ID:** `math.disc.euler-hamiltonian`  
**Prerequisites:** `math.disc.graph-connectivity`

An Eulerian circuit traverses every EDGE exactly once and returns to the start. An Eulerian path traverses every edge exactly once (start ≠ end allowed). Euler's theorem (1736, the birth of graph theory): a connected graph has an Eulerian circuit if and only if every vertex has even degree; it has an Eulerian path (not a circuit) iff it has exactly two vertices of odd degree. Hierholzer's algorithm constructs an Eulerian circuit in O(E) time. A Hamiltonian path visits every VERTEX exactly once; a Hamiltonian cycle returns to the start. In sharp contrast to the Eulerian case, determining whether a Hamiltonian path/cycle exists is NP-complete — no polynomial-time algorithm is known.

**Key Ideas:**
- Eulerian circuit exists ↔ connected + all degrees even. The 'if' direction is proven by Hierholzer's constructive algorithm; the 'only if' direction: at each vertex, the path enters and exits the same number of times → degree must be even.
- Eulerian path (not circuit): exactly 2 vertices of odd degree (these are the start and end). Seven Bridges of Königsberg: 4 vertices of odd degree → no Eulerian path, resolving the famous puzzle.
- Hamiltonian path/cycle detection is NP-complete. Known sufficient conditions (Dirac's theorem: every vertex has degree ≥ n/2 → Hamiltonian cycle exists) are only sufficient, not necessary or polynomial.
- Traveling Salesman Problem (TSP) is a weighted Hamiltonian cycle optimization problem — NP-hard, with heuristic and approximation algorithms in practice.

**Common Misconceptions:**
- **Misconception:** Eulerian and Hamiltonian problems are similar in difficulty because they both ask about traversals.
  **Correction:** Eulerian problems are polynomial (O(E) with Hierholzer's algorithm). Hamiltonian problems are NP-complete — no polynomial algorithm is known and one would imply P=NP. The problems look similar but have fundamentally different computational complexity.
- **Misconception:** Degree sequence determines the Eulerian property; the specific graph structure doesn't matter.
  **Correction:** Connectivity is also required. A disconnected graph with all even degrees (e.g., two triangles) has no Eulerian circuit. The theorem requires: connected AND all even degrees.

**Real-World Applications:**
- Route optimization: mail carriers, garbage trucks, and street sweepers need Eulerian circuits (traverse every street exactly once). The Chinese Postman Problem minimizes extra edge traversals when a graph isn't Eulerian.
- DNA sequencing: Eulerian path algorithms on de Bruijn graphs reconstruct genome sequences from overlapping k-mer fragments — the key algorithmic insight behind modern genome assemblers.

---

## Trees

**Concept ID:** `math.disc.graph-trees`  
**Prerequisites:** `math.disc.graph-connectivity`

A tree is a connected acyclic graph. For a graph on n vertices, the following are equivalent: (1) T is a tree, (2) T is connected with n−1 edges, (3) T is acyclic with n−1 edges, (4) there is exactly one path between any two vertices, (5) T is connected and removing any edge disconnects it. Trees have at least 2 leaves (vertices of degree 1) if n ≥ 2. Rooted trees designate one vertex as the root and impose a parent-child hierarchy. Ordered rooted trees with branching constrained to ≤ 2 children are binary trees, counted by Catalan numbers. Cayley's formula gives the number of labeled trees on n vertices as nⁿ⁻².

**Key Ideas:**
- Five equivalent definitions of a tree, any one of which can be taken as the definition with the others as theorems. Most useful in proofs: 'connected + n−1 edges' or 'connected + acyclic.'
- Every connected graph has a spanning tree (proved by iteratively removing edges from cycles). Minimum spanning trees (MST) minimize total weight and are found by Kruskal's or Prim's algorithm.
- A forest is an acyclic graph (not necessarily connected); each connected component of a forest is a tree. A forest with n vertices and m edges has n−m trees (connected components).
- Cayley's formula: the number of labeled trees on n vertices is nⁿ⁻². For n=4: 4² = 16 distinct labeled trees. Proved via the Prüfer sequence bijection.

**Common Misconceptions:**
- **Misconception:** A tree with n vertices has n edges.
  **Correction:** A tree with n vertices has exactly n−1 edges. This is a defining property. n edges with n vertices would create exactly one cycle, making it not a tree. The formula n−1 is fundamental.
- **Misconception:** Rooted tree and unrooted tree are the same structure; rooting just adds a label.
  **Correction:** Rooting fundamentally changes the structure: it imposes a parent-child relationship, defines depth, height, and subtrees. The same unrooted tree can produce different rooted trees depending on which vertex is chosen as root, giving rise to different algorithmic structures.

**Real-World Applications:**
- File systems: directory structures are rooted trees; operations like search, traversal, and space calculation are tree algorithms.
- Phylogenetics: evolutionary relationships among species are modeled as unrooted trees (phylogenetic trees); inferring the tree from DNA sequences is a central bioinformatics problem.

---

## Spanning Trees

**Concept ID:** `math.disc.spanning-tree`  
**Prerequisites:** `math.disc.graph-trees`

A spanning tree of a connected graph G = (V, E) is a subgraph that includes all vertices of V and forms a tree (connected, acyclic, |V|−1 edges). Every connected graph has at least one spanning tree. A minimum spanning tree (MST) of a weighted graph minimizes the total edge weight among all spanning trees. Kruskal's algorithm: sort edges by weight, greedily add each edge that doesn't form a cycle (uses Union-Find data structure). Prim's algorithm: grow the MST from a seed vertex, at each step adding the cheapest edge connecting the current tree to a new vertex. Both run in O(E log E) time and are proved correct by the cut property: for any cut (S, V−S), the minimum-weight crossing edge is in some MST.

**Key Ideas:**
- Cut property: let (S, V−S) be any cut; let e be the unique minimum-weight edge crossing the cut. Then e is in every MST. This proves greedy algorithms (Kruskal, Prim) are correct.
- Kruskal's correctness: sorting edges by weight and adding non-cycle edges produces an MST. Proof uses the cut property at each step. Union-Find detects cycle creation in nearly O(1) amortized time.
- Prim's correctness: at each step, the cheapest edge leaving the current partial tree connects to the globally cheapest cut — cut property applies directly.
- Uniqueness: if all edge weights are distinct, the MST is unique. If weights may be equal, there may be multiple MSTs but all have the same total weight.

**Common Misconceptions:**
- **Misconception:** The shortest path tree from a source and the MST are the same.
  **Correction:** They are different structures. The shortest path tree from source s minimizes path length from s to each vertex individually. The MST minimizes total weight of the tree. They can be completely different edge sets.
- **Misconception:** Kruskal's algorithm always produces the unique cheapest tree.
  **Correction:** When edge weights are equal, multiple MSTs may exist. Kruskal's produces ONE of them, which is valid. The MST is unique only when all edge weights are distinct.

**Real-World Applications:**
- Network design: MSTs minimize total cable/pipe length when connecting n nodes, used in telephone networks, power grids, and water distribution systems.
- Cluster analysis: minimum spanning tree algorithms cluster data points by removing the k−1 longest edges of the MST, yielding k natural clusters.

---

## Graph Coloring

**Concept ID:** `math.disc.graph-coloring`  
**Prerequisites:** `math.disc.graph`

A proper vertex coloring of a graph G assigns a color to each vertex so that no two adjacent vertices share a color. The chromatic number χ(G) is the minimum number of colors needed. Key results: bipartite graphs have χ(G)=2; cycles C_n have χ=2 (n even) or χ=3 (n odd); complete graph Kₙ has χ=n; planar graphs have χ(G) ≤ 4 (Four Color Theorem). The greedy algorithm colors vertices one by one, assigning the smallest available color, and uses at most Δ(G)+1 colors (where Δ is the maximum degree); Brooks' theorem improves this to Δ(G) except for complete graphs and odd cycles. Graph coloring is NP-hard for general graphs (determining if χ(G) ≤ k for k ≥ 3).

**Key Ideas:**
- Lower bounds on χ(G): (1) χ(G) ≥ ω(G) (clique number), since a complete subgraph on k vertices needs k colors. (2) χ(G) ≥ n/α(G) (independence number), since each color class is an independent set.
- Greedy coloring: order vertices v₁,…,vₙ; color vᵢ with the smallest color not used by any already-colored neighbor. Uses at most Δ+1 colors; optimal ordering can achieve χ (Δ+1 is not always achievable with bad ordering).
- Chromatic polynomial P(G, k): the number of proper k-colorings of G. P(Kₙ, k) = k(k−1)…(k−n+1); P(tree on n vertices, k) = k(k−1)ⁿ⁻¹. This polynomial encodes all coloring information.
- Edge coloring: assign colors to edges so no two incident edges share a color. The edge chromatic number χ'(G) = Δ(G) or Δ(G)+1 (Vizing's theorem).

**Common Misconceptions:**
- **Misconception:** χ(G) = ω(G) always (the chromatic number equals the clique number).
  **Correction:** χ(G) ≥ ω(G) always holds, but equality can fail. Triangle-free graphs (ω=2) can have arbitrarily large chromatic number (Mycielski graphs). The gap between ω(G) and χ(G) can be arbitrarily large.
- **Misconception:** The Four Color Theorem says any map needs at most 4 colors. This is the same as graph coloring.
  **Correction:** The Four Color Theorem is exactly the statement that planar graphs have χ ≤ 4 (each region = vertex, adjacent regions = edges). The theorem was proved in 1976 using computer assistance (checking ~1,936 cases), making it one of the first major computer-assisted proofs.

**Real-World Applications:**
- Register allocation: in compiler optimization, assigning variables to CPU registers is graph coloring — variables that are live simultaneously (adjacent in the interference graph) must use different registers, and χ = minimum registers needed.
- Exam scheduling: courses with overlapping student enrollments (adjacent vertices) cannot be scheduled at the same time (same color); χ = minimum number of time slots needed.

---

## Planar Graphs

**Concept ID:** `math.disc.planar-graph`  
**Prerequisites:** `math.disc.graph`

A planar graph is one that can be drawn in the plane with no edge crossings. Euler's formula for connected planar graphs states V − E + F = 2, where V = vertices, E = edges, F = faces (including the unbounded outer face). For simple connected planar graphs, E ≤ 3V − 6 (derived from F ≤ 2E/3 since each face has ≥ 3 edges). For bipartite planar graphs, E ≤ 2V − 4 (since each face has ≥ 4 edges). Kuratowski's theorem: a graph is planar if and only if it contains no subdivision of K₅ or K₃,₃ as a subgraph. Wagner's theorem: equivalently, G is planar iff K₅ and K₃,₃ are not graph minors of G.

**Key Ideas:**
- Euler's formula V − E + F = 2 for connected planar graphs. Proof by induction: base case = tree (F=1, E=V−1, so V−(V−1)+1=2). Inductive step: adding an edge on a tree either splits a face (F increases by 1, E increases by 1, V unchanged) → formula preserved.
- Edge bound: each face is bounded by ≥ 3 edges, and each edge borders exactly 2 faces → 3F ≤ 2E → F ≤ 2E/3. Combined with Euler: E ≤ 3V−6. This proves K₅ (V=5, E=10 > 3×5−6=9) is non-planar.
- K₃,₃ (V=6, E=9 = 3×6−6=12? No, 9 < 12 so edge bound doesn't rule it out) requires the bipartite bound E ≤ 2V−4: 9 > 2×6−4=8. Hence K₃,₃ is non-planar.
- Graph minor: G contains H as a minor if H can be obtained from a subgraph of G by contracting edges. Wagner's theorem uses minors; Kuratowski's uses topological minors (subdivisions). Both characterize planarity.

**Common Misconceptions:**
- **Misconception:** A graph with no edge crossings in one particular drawing is planar.
  **Correction:** Planarity requires the existence of SOME drawing with no crossings. A single drawing with crossings doesn't prove non-planarity — you must try all embeddings or use Kuratowski's theorem to rule out planarity.
- **Misconception:** Euler's formula V − E + F = 2 applies to all graphs.
  **Correction:** Euler's formula applies to connected planar graphs. For disconnected planar graphs: V − E + F = C + 1 where C = number of connected components. For non-planar graphs, no planar embedding exists, so the formula doesn't apply.

**Real-World Applications:**
- Circuit board design: VLSI circuits must be laid out on a plane (or small number of layers) without wire crossings. Planarity testing algorithms determine if a circuit layout is achievable on a single layer.
- Map coloring: the Four Color Theorem applies to planar graphs, making planarity a prerequisite for the 4-color bound in map coloring applications.

---

## Propositional Logic

**Concept ID:** `math.disc.propositional-logic`  
**Prerequisites:** `math.found.proposition`, `math.found.logical-connectives`

Propositional logic (sentential logic) is the study of logical propositions — declarative statements that are either true or false — and their combinations via logical connectives: negation ¬ (NOT), conjunction ∧ (AND), disjunction ∨ (OR), conditional → (IF…THEN), and biconditional ↔ (IF AND ONLY IF). A truth table lists the truth value of a formula for every combination of atomic proposition values. A tautology is a formula true for all truth assignments (e.g., p ∨ ¬p). A contradiction is always false (p ∧ ¬p). A satisfiable formula is true for at least one assignment. Logical equivalence (p ≡ q) holds when p ↔ q is a tautology. De Morgan's laws, double negation, and the distributive laws are the standard equivalence toolkit.

**Key Ideas:**
- Truth table method: for n atomic propositions, there are 2ⁿ rows. Each row assigns T/F to each atom; evaluate the compound formula for each row. Complexity is exponential in n.
- Key equivalences: De Morgan's (¬(p∧q) ≡ ¬p∨¬q; ¬(p∨q) ≡ ¬p∧¬q); Conditional (p→q ≡ ¬p∨q); Contrapositive (p→q ≡ ¬q→¬p); Double negation (¬¬p ≡ p).
- Normal forms: CNF (Conjunctive Normal Form) is a conjunction of clauses (each a disjunction of literals). DNF is a disjunction of cubes (each a conjunction of literals). Any formula is convertible to CNF or DNF. SAT problem (is a CNF formula satisfiable?) is NP-complete.
- The conditional p→q is FALSE only when p is TRUE and q is FALSE (vacuously true when p is false). This is the most counterintuitive truth table entry for students.

**Common Misconceptions:**
- **Misconception:** p → q is the same as q → p (confusing the conditional with its converse).
  **Correction:** p → q and q → p are not logically equivalent. 'If it rains, the ground is wet' does not mean 'If the ground is wet, it rained' (sprinklers could cause wetness). The converse of a true statement can be false.
- **Misconception:** If p → q is false, then p must be true.
  **Correction:** p → q is false only when p=T and q=F. If p=F, then p→q is TRUE (vacuously), regardless of q. A false conditional requires a true antecedent and false consequent.

**Real-World Applications:**
- Hardware verification: digital circuit correctness is expressed as propositional logic formulas; SAT solvers verify that no input makes the circuit output wrong.
- Legal and contractual reasoning: contracts are sometimes formalized as propositional logic to identify ambiguities or contradictions (e.g., clauses that are simultaneously required and prohibited).

---

## Boolean Circuits

**Concept ID:** `math.disc.boolean-circuits`  
**Prerequisites:** `math.disc.propositional-logic`

A Boolean circuit is a directed acyclic graph (DAG) of logic gates (AND, OR, NOT, NAND, NOR, XOR) computing a Boolean function f: {0,1}ⁿ → {0,1}. The circuit's size (number of gates) and depth (length of longest path) measure its time and space complexity. Every Boolean function on n variables can be represented by a circuit of size O(2ⁿ/n) and as a formula (read-once circuit where inputs appear at most once). Boolean algebra (Boole, 1847) provides algebraic laws for simplifying circuits: commutativity, associativity, distributivity, De Morgan's laws, complement laws, absorption, and idempotence. Karnaugh maps visually minimize 2–4 variable Boolean functions by grouping adjacent 1-cells.

**Key Ideas:**
- Universal gate sets: {AND, OR, NOT} is universal (any Boolean function is computable). {NAND} alone is universal (NAND alone suffices); similarly {NOR}. This matters for hardware minimization.
- DNF/CNF circuit construction: given a truth table, read off the minterms (rows with output 1) to build DNF; each minterm is an AND gate, combined in an OR gate. Circuit size = number of 1-rows × n gates per minterm + 1 OR gate.
- Shannon expansion: f(x₁,…,xₙ) = x₁·f(1,x₂,…,xₙ) + ¬x₁·f(0,x₂,…,xₙ). This recursive decomposition is the foundation of BDD (Binary Decision Diagram) data structures used in formal verification.
- Circuit complexity: circuit size lower bounds are central unsolved problems. Proving that a specific function requires super-polynomial circuit size would separate P from NP — it is equivalent to the P≠NP question.

**Common Misconceptions:**
- **Misconception:** NAND and NOR are just special cases of AND and OR; they have no special significance.
  **Correction:** NAND and NOR are universal gates — any Boolean function can be implemented using only NAND (or only NOR) gates. This is fundamental to hardware design: CMOS technology naturally implements NAND/NOR gates most efficiently.
- **Misconception:** Boolean algebra's laws are the same as arithmetic algebra.
  **Correction:** Key differences: In Boolean algebra, x+x=x (idempotence, vs. 2x in arithmetic); x+1=1 (vs. 1+x in arithmetic); x·x=x (vs. x² in arithmetic). Also, x+x̄=1 and x·x̄=0 have no arithmetic analogs. Applying arithmetic simplifications to Boolean expressions gives wrong results.

**Real-World Applications:**
- CPU design: all arithmetic units (ALU), memory, and control logic in a processor are implemented as Boolean circuits. The circuit depth of the critical path determines the CPU clock speed.
- SAT solvers: Boolean circuit satisfiability (circuit SAT) is the canonical NP-complete problem; modern SAT solvers (CDCL algorithms) power model checkers used to verify chip designs before manufacturing.

---

## Predicate Logic

**Concept ID:** `math.disc.predicate-logic-disc`  
**Prerequisites:** `math.found.predicate-logic`, `math.disc.propositional-logic`

Predicate logic (first-order logic) extends propositional logic by introducing predicates P(x) (properties of objects) and quantifiers: ∀x P(x) ('for all x, P(x)') and ∃x P(x) ('there exists an x such that P(x)'). The domain of discourse D specifies the objects over which variables range. Negation rules: ¬(∀x P(x)) ≡ ∃x ¬P(x); ¬(∃x P(x)) ≡ ∀x ¬P(x). Nested quantifiers: ∀x ∃y P(x,y) means 'for every x there exists a y (possibly depending on x),' while ∃y ∀x P(x,y) means 'there exists a single y that works for all x' — a much stronger statement. Counterexamples prove universal statements false; constructive proofs (exhibiting the witness) prove existential statements true.

**Key Ideas:**
- Quantifier negation: push ¬ inward, flipping ∀↔∃. ¬(∀x ∃y P(x,y)) ≡ ∃x ∀y ¬P(x,y). Apply successively for nested quantifiers.
- Universal proof (∀x P(x)): let x be an arbitrary element of D; prove P(x) without assuming anything special about x. This 'arbitrary element' technique is the foundation of most mathematical proofs.
- Existential proof (∃x P(x)): exhibit a specific witness x₀ and verify P(x₀). Constructive proofs give the witness explicitly; non-constructive proofs may prove existence without finding the witness.
- ∀x ∃y vs. ∃y ∀x: order matters critically. 'Every student has a teacher' (∀s ∃t Teaches(t,s)) is not the same as 'There is one teacher for all students' (∃t ∀s Teaches(t,s)). The second is much stronger.

**Common Misconceptions:**
- **Misconception:** ∀x P(x) → Q(x) means the same as ∀x P(x) → ∀x Q(x).
  **Correction:** ∀x (P(x)→Q(x)) means 'for every x, if x has property P then x has property Q.' This is very different from (∀x P(x)) → (∀x Q(x)), which would mean 'if everything has P then everything has Q.' The scope of ∀x in the first formula is the entire implication.
- **Misconception:** A statement with ∃x is weaker than one with ∀x, so ∀ statements are harder to prove.
  **Correction:** To PROVE ∀x P(x), you must prove P(x) for every element (an infinite obligation). To PROVE ∃x P(x), you only need one witness. But to DISPROVE ∀x P(x), you only need one counterexample; to DISPROVE ∃x P(x), you must eliminate all possibilities.

**Real-World Applications:**
- Database query languages: SQL SELECT-WHERE queries directly correspond to predicate logic. 'SELECT * FROM employees WHERE salary > 50000' is ∀e (Employee(e) ∧ salary(e) > 50000 → result(e)).
- Formal program verification: Hoare logic expresses program correctness as {P} code {Q} (precondition P, code, postcondition Q), where P and Q are predicate logic formulas quantified over program variables.

---

## Asymptotic Notation

**Concept ID:** `math.disc.asymptotic-notation`  
**Prerequisites:** `math.calc.limits`, `math.disc.counting-principles`

Asymptotic notation describes the growth rate of functions as n → ∞, ignoring constant factors and lower-order terms. Big-O: f(n) = O(g(n)) means f grows at most as fast as g (∃c>0, n₀: f(n) ≤ c·g(n) for all n ≥ n₀). Big-Omega: f(n) = Ω(g(n)) means f grows at least as fast as g. Big-Theta: f(n) = Θ(g(n)) means f and g grow at the same rate (both O and Ω). Little-o: f(n) = o(g(n)) means f grows strictly slower (lim f/g = 0). Little-omega: f(n) = ω(g(n)) means f grows strictly faster. These notations classify algorithms by worst-case (O), best-case (Ω), and average-case (Θ) time complexity.

**Key Ideas:**
- Formal definitions via constants c and n₀ eliminate constant factors. f(n)=3n²+5n = Θ(n²) because both are bounded by constant multiples of each other (lower: n², upper: 4n²) for large n.
- Growth rate hierarchy (slowest to fastest): 1 ≺ log n ≺ √n ≺ n ≺ n log n ≺ n² ≺ n³ ≺ … ≺ 2ⁿ ≺ n! ≺ nⁿ.
- Limit comparison: if lim_{n→∞} f(n)/g(n) = c > 0 then f = Θ(g); if limit = 0 then f = o(g); if limit = ∞ then f = ω(g); if limit ∈ (0,∞) then f = Θ(g). L'Hôpital's rule or logarithms help evaluate limits of competing growth rates.
- Asymptotic notation is about the class of the function, not a specific formula. O(n²) is an upper bound on the entire class; writing O(n²) when O(n) holds is technically correct but unhelpful — tightest bounds are preferred.

**Common Misconceptions:**
- **Misconception:** O(n²) means the algorithm takes n² steps.
  **Correction:** O(n²) means the algorithm takes AT MOST c·n² steps for some constant c and for sufficiently large n. It could be 5n², n²/1000, or 3n²+17n+4 — all are O(n²).
- **Misconception:** O(n log n) < O(n²) means sorting is faster than quadratic algorithms for all inputs.
  **Correction:** Asymptotic bounds describe large-n behavior. For n=5, a quadratic algorithm with small constant (e.g., 2n²=50) may outperform an n log n algorithm with large constant (100n log n ≈ 232). Asymptotic bounds apply reliably only for large enough n (beyond n₀).

**Real-World Applications:**
- Algorithm benchmarking: when choosing between two algorithms (e.g., quicksort Θ(n log n) average vs. bubble sort Θ(n²)), asymptotic notation predicts which will be faster for large inputs independent of machine speed.
- Scalability analysis: a SaaS company choosing a database algorithm needs to know whether O(log n) vs. O(n) behavior is achievable, since at n=10⁹ users, the difference between O(log n) ≈ 30 and O(n) = 10⁹ operations per query is the difference between a functional and a non-functional service.

---

## Algorithm Complexity

**Concept ID:** `math.disc.algorithm-complexity`  
**Prerequisites:** `math.disc.asymptotic-notation`, `math.disc.divide-conquer-recurrence`

Algorithm complexity analysis measures how an algorithm's resource usage (time = operations, space = memory) scales with input size n. Time complexity is expressed as T(n) and analyzed in worst-case (maximum over all inputs of size n), average-case (expected over random inputs), and best-case (minimum) scenarios. Constant factors are ignored (captured by the Θ notation); only asymptotic growth rate matters for large n. Techniques: counting loop iterations (nested loops → multiply), analyzing recursive calls (set up and solve recurrences), and amortized analysis (average cost per operation over a sequence). Key complexities: O(log n) binary search, O(n) linear search, O(n log n) merge sort, O(n²) insertion sort, O(n³) naive matrix multiplication.

**Key Ideas:**
- Rule of thumb: k nested loops each running n iterations → Θ(nᵏ) time. A loop where the index doubles (i=1,2,4,…,n) runs Θ(log n) times.
- Amortized analysis: some operations are expensive but infrequent. Dynamic array doubling: most appends are O(1), occasional doubling is O(n), but amortized cost per append is O(1) (total work ≤ 3n for n appends).
- Space complexity: often O(n) for standard algorithms, but merge sort requires O(n) auxiliary space while in-place quicksort requires O(log n) stack space. Space-time tradeoffs are a key engineering consideration.
- Lower bounds: comparison-based sorting has a Ω(n log n) lower bound (decision tree has ≥ n! leaves, height ≥ log₂(n!) ≈ n log n by Stirling). No comparison sort can do better than O(n log n).

**Common Misconceptions:**
- **Misconception:** O(n log n) means the algorithm does exactly n log n operations.
  **Correction:** O(n log n) means the number of operations is bounded above by c·n log n for some constant c. Merge sort does roughly 2n log₂n comparisons; quicksort does about 1.39n log₂n on average. Both are Θ(n log n) despite different constants.
- **Misconception:** Best-case analysis tells you the algorithm's actual performance.
  **Correction:** Best-case is often misleading. Bubble sort has best-case O(n) (already sorted input), but worst-case O(n²). For robust performance guarantees, worst-case or average-case analysis is more informative.

**Real-World Applications:**
- Database query optimization: query planners estimate operation counts (e.g., nested loop join = O(n²), hash join = O(n)) to choose the fastest execution plan.
- Search engine ranking: Google's original PageRank required O(n) operations per iteration on a graph with n pages; scalability required distributed computation because even O(n) for n=10¹⁰ is enormous.

---

## Complexity Classes

**Concept ID:** `math.disc.complexity-classes`  
**Prerequisites:** `math.disc.algorithm-complexity`

Complexity classes group computational problems by the resources (time, space) needed to solve or verify them. P: problems solvable in polynomial time by a deterministic algorithm (e.g., sorting, shortest paths, primality testing). NP (Nondeterministic Polynomial): problems whose solutions can be verified in polynomial time; equivalently, problems solvable by a nondeterministic Turing machine in polynomial time. P ⊆ NP; the P ≠ NP conjecture (unproven, Clay Millennium Problem) asserts P ⊊ NP. NP-complete: the hardest problems in NP, meaning every NP problem reduces to them in polynomial time. Cook's theorem (1971): SAT is NP-complete. NP-hard: at least as hard as NP-complete problems, but not necessarily in NP (e.g., HALT is NP-hard but undecidable).

**Key Ideas:**
- Decision vs. optimization: NP-completeness is defined for decision problems (yes/no answers). Optimization versions (find the minimum Hamiltonian cycle weight) are NP-hard even if they're not formally NP-complete.
- Polynomial-time reduction A ≤_p B: an algorithm solving B can be converted into an algorithm solving A with only polynomial overhead. If B is in P and A ≤_p B, then A is in P. If A is NP-hard and A ≤_p B, then B is NP-hard.
- Canonical NP-complete problems: SAT (Boolean satisfiability), 3-SAT, Clique, Independent Set, Vertex Cover, Hamiltonian Path/Cycle, TSP (decision version), Graph Coloring (k≥3), Subset Sum, Knapsack.
- Co-NP: problems whose complements are in NP. UNSAT (no satisfying assignment) is in co-NP. P ⊆ NP ∩ co-NP; whether NP = co-NP is also open.

**Common Misconceptions:**
- **Misconception:** NP stands for 'Not Polynomial.'
  **Correction:** NP stands for 'Nondeterministic Polynomial.' NP problems have polynomial-time VERIFICATION algorithms (for proposed solutions), even if finding the solution may take exponential time. Many NP problems are believed to require super-polynomial solve time, but this is unproven.
- **Misconception:** Proving a problem is NP-hard means it definitely requires exponential time.
  **Correction:** NP-hardness means: IF P ≠ NP (widely believed but unproven), then the problem has no polynomial-time algorithm. It's a conditional statement. If someone proves P = NP, all NP-hard problems would become polynomially solvable — but nearly everyone believes this won't happen.

**Real-World Applications:**
- Cryptography: RSA and most public-key cryptography relies on the belief that factoring large integers is hard (not known to be NP-complete, but not in P). Shor's quantum algorithm factors in polynomial time — a quantum computer would break RSA.
- Scheduling and logistics: real-world scheduling problems (job shop scheduling, vehicle routing) are NP-hard; companies use branch-and-bound, constraint programming, and machine learning heuristics rather than exact algorithms.

---

## Catalan Numbers

**Concept ID:** `math.disc.catalan-numbers`  
**Prerequisites:** `math.disc.combinations`, `math.disc.recurrence-relation`

The Catalan numbers Cₙ = C(2n,n)/(n+1) = (2n)! / ((n+1)! n!) count an extraordinarily diverse collection of combinatorial structures. C₀=1, C₁=1, C₂=2, C₃=5, C₄=14, C₅=42, C₆=132. Among the over 200 known interpretations: (1) the number of valid parenthesizations of n+1 factors; (2) the number of full binary trees with n+1 leaves; (3) the number of monotone lattice paths from (0,0) to (n,n) that do not cross above the diagonal; (4) the number of triangulations of a convex (n+2)-gon; (5) the number of 132-avoiding permutations of {1,…,n}. The recurrence Cₙ = Σₖ₌₀ⁿ⁻¹ CₖCₙ₋₁₋ₖ (with C₀=1) captures the root-based decomposition of binary trees.

**Key Ideas:**
- Ballot problem derivation: Cₙ = C(2n,n) − C(2n,n−1) = C(2n,n)/(n+1). The C(2n,n) counts all lattice paths; subtracting C(2n,n−1) removes those crossing the diagonal. This difference identity is a key bijective argument.
- Recurrence derivation: a full binary tree with n+1 leaves splits at its root into left subtree (k+1 leaves, Cₖ ways) and right subtree (n−k leaves, Cₙ₋₁₋ₖ ways). Summing over k=0,…,n−1 gives the recurrence.
- Generating function: C(x) = Σₙ≥₀ Cₙxⁿ satisfies xC(x)² − C(x) + 1 = 0, giving C(x) = (1 − √(1−4x)) / (2x). This is an algebraic (not rational) GF, reflecting the recurrence's self-referential structure.
- Asymptotics: Cₙ ≈ 4ⁿ / (n^(3/2) √π), growing as 4ⁿ but sub-exponentially below 4ⁿ due to the n^(3/2) denominator.

**Common Misconceptions:**
- **Misconception:** Catalan numbers are just a coincidence — there's no deep reason why such different structures share the same count.
  **Correction:** There exist bijective proofs connecting all Catalan structures. The ballot sequence (Dyck path) is a canonical form; every other Catalan structure bijects to Dyck paths. The unity comes from the self-similar decomposition inherent in all these structures (a tree splits into two subtrees, a path splits at a return to the diagonal, etc.).
- **Misconception:** C(2n,n) is the Catalan number.
  **Correction:** C(2n,n) is the central binomial coefficient; Cₙ = C(2n,n)/(n+1). The extra division by (n+1) is essential. C(2×3,3) = C(6,3) = 20, but C₃ = 20/4 = 5.

**Real-World Applications:**
- Compiler parsing: the number of valid parse trees for an ambiguous grammar is often a Catalan number; compilers must enumerate or select among these for correct code generation.
- Stack-sortable permutations: permutations sortable by a single stack pass are exactly the 132-avoiding permutations, counted by Catalan numbers. This characterizes operations feasible on stack-based machines.

---

## Stirling Numbers

**Concept ID:** `math.disc.stirling-numbers`  
**Prerequisites:** `math.disc.combinations`, `math.disc.recurrence-relation`

Stirling numbers come in two kinds, both fundamental in combinatorics. Stirling numbers of the second kind S(n,k) count the number of ways to partition an n-element set into exactly k non-empty subsets. Their recurrence: S(n,k) = k·S(n−1,k) + S(n−1,k−1), with S(0,0)=1, S(n,0)=S(0,k)=0 for n,k>0. Bell numbers Bₙ = Σₖ S(n,k) count all set partitions of an n-element set. Stirling numbers of the first kind s(n,k) (unsigned: c(n,k)) count permutations of n elements with exactly k cycles. Recurrence: c(n,k) = (n−1)c(n−1,k) + c(n−1,k−1). Connection: xⁿ = Σₖ S(n,k) x^(k) (rising/falling factorial expansion), where x^(k) = x(x−1)…(x−k+1).

**Key Ideas:**
- Second kind recurrence S(n,k): element n either joins one of the k existing blocks (k ways) giving k·S(n−1,k), or forms a new singleton block giving S(n−1,k−1). Together: S(n,k) = kS(n−1,k) + S(n−1,k−1).
- First kind recurrence c(n,k): element n either joins an existing cycle (at n−1 positions in n−1 cycles, each cycle has n−1 insertion points? No: element n can be inserted after any of the n−1 elements → (n−1)c(n−1,k)) or starts a new cycle c(n−1,k−1). Together: c(n,k) = (n−1)c(n−1,k) + c(n−1,k−1).
- Table for S(n,k): S(1,1)=1; S(2,1)=1,S(2,2)=1; S(3,1)=1,S(3,2)=3,S(3,3)=1; S(4,1)=1,S(4,2)=7,S(4,3)=6,S(4,4)=1. Bell numbers: B₁=1,B₂=2,B₃=5,B₄=15.
- Falling factorial xⁿ (underline) = x(x−1)…(x−n+1) = Σₖ s(n,k)xᵏ (with signed Stirling numbers of the first kind). Rising factorial xⁿ (overline) = x(x+1)…(x+n−1) = Σₖ |s(n,k)|xᵏ. These express ordinary powers in terms of factorial polynomials (change of basis for polynomial ring).

**Common Misconceptions:**
- **Misconception:** Stirling numbers of the second kind count permutations (like first kind).
  **Correction:** Second-kind Stirling numbers S(n,k) count SET PARTITIONS (unordered groups). First-kind c(n,k) count PERMUTATIONS by cycle structure. The mnemonic: S(econd kind) = S(et partitions); first kind = cycle counts.
- **Misconception:** Bell number Bₙ = n! (since it counts 'all' partitions).
  **Correction:** Bₙ ≪ n! for large n. B₄=15 vs. 4!=24. Bₙ counts set partitions, not permutations. Asymptotically Bₙ ~ (n/ln n)ⁿ·e^{…}, sub-factorial.

**Real-World Applications:**
- Database theory: Stirling numbers of the second kind count the number of distinct ways to group n database records into k non-empty equivalence classes (e.g., duplicate groups in deduplication tasks).
- Statistical physics: the partition function for bosons distributing n identical particles into k distinguishable energy states is directly related to Stirling numbers and Bell numbers.

---
