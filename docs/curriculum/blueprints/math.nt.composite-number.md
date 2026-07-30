# Blueprint: math.nt.composite-number

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.composite-number |
| name | Composite Numbers |
| Domain | math.nt |
| Difficulty | developing |
| Bloom level | remember |
| Estimated hours | 2 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.nt.prime-number |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student classifies any positive integer greater than 1 as either prime or composite; states that a composite number has at least one factor pair other than 1 and itself; lists all factor pairs of a given composite number; explains why 1 is neither prime nor composite; and uses the Fundamental Theorem of Arithmetic to confirm that every composite number has a unique prime factorisation.

## Component 2 — CPA Entry Stage
**C — Concrete** (arrange 12 counters into equal rows — more than one arrangement exists, so 12 is composite; try 7 counters — only one row of 7 works, so 7 is prime)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | COMPOSITE-MEANS-EVEN | Student believes all even numbers are composite and uses "even" as a synonym for "composite" — not recognising that 2 is even and prime | Type 3 — language contamination ("composite" and "even" are both contrasted with "prime" in early lessons; the mnemonic "all even numbers are composite" is taught without the exception 2) |
| MC-2 | ONE-IS-PRIME | Student classifies 1 as prime because it is divisible only by 1 and itself — confusing the definition's requirement of EXACTLY two distinct divisors with "no divisors other than 1" | Type 3 — language contamination (the phrase "divisible only by 1 and itself" applied to 1 gives two identical values — 1 and 1 — so students conclude it qualifies; the "distinct divisors" qualifier is often omitted in early formulations) |
| MC-3 | COMPOSITES-HAVE-EXACTLY-ONE-FACTOR-PAIR | Student thinks a composite number has exactly one non-trivial factor pair — does not recognise that numbers like 12 have multiple factor pairs | Type 1 — overgeneralization (small composite examples in textbooks often use 4=2×2 or 6=2×3, each with one non-trivial pair; students do not see examples with multiple pairs until larger composites are introduced) |

## Component 4 — Session TA Cap
**Cap = 4** (hrs = 2 → cap 4)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of composite numbers:**

| Representation | Content |
|---|---|
| Rectangular arrays | 12 counters: 2×6, 3×4, 4×3, 6×2 — each rectangle is a factor pair |
| Factor pair list | 12: (1,12), (2,6), (3,4); 15: (1,15), (3,5); 16: (1,16), (2,8), (4,4) |
| Definition | n>1 is composite if it has a divisor d with 1<d<n; equivalently, n=ab for integers a,b with 1<a≤b<n |
| Venn diagram | Positive integers > 1 split into two disjoint sets: primes (exactly 2 divisors) ∪ composites (≥3 divisors). 1 is excluded from both |

**Classification table:**
| Number | Divisors | Classification |
|---|---|---|
| 1 | {1} | Neither (only 1 divisor) |
| 2 | {1,2} | Prime (exactly 2) |
| 4 | {1,2,4} | Composite (3 divisors) |
| 6 | {1,2,3,6} | Composite (4 divisors) |
| 7 | {1,7} | Prime |
| 12 | {1,2,3,4,6,12} | Composite (6 divisors) |

**Why 1 is excluded:** The Fundamental Theorem of Arithmetic states that every integer >1 has a UNIQUE prime factorisation. If 1 were prime, we could write 12=2²×3=1×2²×3=1²×2²×3=… — factorisation would not be unique. Excluding 1 from primes preserves uniqueness.

**P49 checkpoint:**
- CORRECT → "Composite: n>1 with a divisor strictly between 1 and n. 1 is neither prime nor composite. Every composite has ≥3 divisors and at least one non-trivial factor pair." → A02
- PARTIAL (understands composite but classifies 1 as prime) → "The definition of prime requires EXACTLY two DISTINCT divisors: 1 and itself. For n=1: both divisors are the same number (1=1), so there is only ONE distinct divisor, not two. 1 fails the primality test. It is excluded from both categories to preserve the uniqueness of prime factorisation." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "List all factor pairs of 18. Is 18 prime or composite? How many divisors does 18 have? What about 19?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Factor count patterns:**

**Perfect squares have an odd number of divisors:** 9: {1,3,9} = 3 divisors; 16: {1,2,4,8,16} = 5 divisors. Every non-perfect-square has an even number of divisors (divisors pair up as (d, n/d) with d≠n/d).

**Highly composite numbers:** 12 is the smallest number with 6 divisors; 24 has 8; 36 has 9; 60 has 12. These appear as denominators in fractions, clock face divisions, and musical time signatures — they are "convenient" precisely because they have many factor pairs.

**Test for compositeness:** Trial division up to √n — if any d with 2≤d≤√n divides n, then n is composite (with factor pair d and n/d). If no such d exists, n is prime. For n=100, check only d=2,3,5,7 (√100=10).

**Number of divisors formula:** If n=p₁^a₁ × p₂^a₂ × … × pₖ^aₖ, then τ(n)=(a₁+1)(a₂+1)…(aₖ+1). Example: 12=2²×3 → τ(12)=(2+1)(1+1)=6. ✓

**Pattern:** Composites are the complement of primes in the integers >1. The structure of a composite number (number of divisors, factor pairs) is completely determined by its prime factorisation.

**P49 checkpoint:**
- CORRECT → "Composite: at least one factor pair (a,b) with 1<a≤b<n. Perfect squares have odd divisor counts. Trial division to √n tests compositeness. τ(n) from prime factorisation exponents." → A03
- PARTIAL (understands factor pairs but not the √n test) → "Every factor pair (d, n/d) of n has one element ≤√n and one ≥√n (since d×(n/d)=n, if both d and n/d were >√n their product would exceed n). So it suffices to search only d≤√n. If n has a factor, one of its factors is ≤√n and will be found by trial division up to √n." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Is 91 prime or composite? Check divisibility by 2,3,5,7 (since √91<10). What factor pair does 91 have?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Even-number gate:**

**Gate question (MC-1):** "A student says 'all composite numbers are even because 2 is the most common factor.' Is this correct?"

Completely false. Counterexamples: 9=3×3, 15=3×5, 21=3×7, 25=5×5, 27=3³, 35=5×7, 49=7×7. All odd composites. In fact, infinitely many composites are odd. The student has the direction backwards: all even numbers greater than 2 ARE composite (since 2 divides them), but not all composites are even. And 2 itself is an even prime.

**P49 checkpoint:**
- CORRECT → "Most composites are odd. 2 is the only even prime. All even numbers >2 are composite. Odd composites (9,15,21,25,...) form an infinite set." → Gate (P91)
- PARTIAL (knows 2 is prime but thinks other evens being composite means composites are mostly even) → "There are infinitely many odd composites: 9,15,21,25,27,35,49,51,... In fact, the proportion of even numbers among composites approaches 1/2 for large n (half of all composites are odd). The statement 'all even numbers >2 are composite' is the CONVERSE of the student's claim, which is false." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "List the first 10 composite numbers. How many are odd?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 ONE-IS-PRIME):**
Step 1 — "A prime number is defined as a positive integer with EXACTLY TWO DISTINCT positive divisors. For p to be prime, we need two different numbers — 1 and p — that divide p. For n=1: the divisors of 1 are just {1}. Only ONE distinct divisor. So 1 is not prime." Step 2 — Historical note: some 19th-century mathematicians DID include 1 as prime. The modern convention excludes 1 to make the Fundamental Theorem of Arithmetic work cleanly: 12=2²×3=2²×3×1=2²×3×1²=… would have infinitely many factorisations. Excluding 1 makes factorisation unique. Step 3 — "1 is neither prime nor composite — it is its own category (a unit). The three categories of positive integers: 1 (unit), primes (exactly 2 divisors), composites (≥3 divisors). Every integer >1 is either prime or composite."

**TB-R02 (MC-1 COMPOSITE-MEANS-EVEN):**
Step 1 — "The only even prime is 2. Every even number >2 has 2 as a divisor — so it's composite. But 'composite' means 'has a factor other than 1 and itself' — the factor doesn't have to be 2. Odd composites use odd factors: 9=3×3, 15=3×5, 35=5×7." Step 2 — Counting: among composites from 1 to 20 (4,6,8,9,10,12,14,15,16,18,20): 4 are odd (9,15,16... wait, 16 is even). Let me list: 4(even),6(even),8(even),9(ODD),10(even),12(even),14(even),15(ODD),16(even),18(even),20(even). 2 odd composites out of 11. Among larger numbers, the density of odd composites grows. Step 3 — "The correct rule: 2 is the only even prime; all other even numbers are composite. Composites can be even or odd. Odd composites exist in abundance: 9,15,21,25,27,35,49,51,55,63,65,..."

**TB-R03 (MC-3 COMPOSITES-HAVE-EXACTLY-ONE-FACTOR-PAIR):**
Step 1 — "A factor pair of n is a pair (a,b) with a×b=n and 1<a≤b<n (excluding the trivial pair (1,n)). A composite can have one, two, or many such pairs." Step 2 — Examples: 6=(2,3) — one pair; 12=(2,6),(3,4) — two pairs; 36=(2,18),(3,12),(4,9),(6,6) — four pairs. The number of factor pairs equals (τ(n)−2)/2 when n is not a perfect square, and (τ(n)−2)/2+1/2 for perfect squares (the pair (√n,√n) is one pair, not two). Step 3 — "The number of divisors τ(n) directly counts factor pairs (including the trivial (1,n)). A composite with τ(n)=k has k−2 additional divisors and ⌊(k−2)/2⌋ or ⌈(k−2)/2⌉ non-trivial factor pairs."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Classify each of the following as prime, composite, or neither: 1, 2, 17, 24, 49, 51, 97. For each composite, list ALL factor pairs.
2. A student says: "If n is divisible by 3 and n>3, then n is composite." Is this always true? If so, prove it. If a number's digit sum is divisible by 3 and the number is >3, what can you conclude?
3. Find the smallest composite number that: (a) has exactly 3 divisors; (b) has exactly 4 divisors; (c) has exactly 6 divisors. What do these numbers have in common structurally?
4. How many divisors does 360 have? Use the prime factorisation 360=2³×3²×5. How many non-trivial factor pairs does 360 have?

**P55 — Reflect & Consolidate:** "Composite: n>1 with divisor d satisfying 1<d<n. 1 is neither prime nor composite (unit). Factor pairs: (d, n/d) for each d≤√n. τ(n)=(a₁+1)(a₂+1)… from prime factorisation. Trial division to √n tests compositeness."

**P76 — Transfer Probe (Independence mode):**
A semiprime is a product of exactly two primes (not necessarily distinct): pq where p,q prime. (a) List all semiprimes up to 30. (b) Prove that a semiprime pq (p≤q) has exactly 4 divisors when p<q, or 3 divisors when p=q. (c) The RSA cryptosystem relies on the difficulty of factoring large semiprimes. If p=12,227 and q=12,251 are both prime, is n=p×q=149,814,377 composite? How many divisors does it have? How would you verify p and q are prime? (d) Explain why semiprimes are the "simplest" composites and why factoring them is harder than factoring a number with many small factors.

**P55 — Reflect & Consolidate:** "Semiprimes (n=pq, both prime) have the fewest divisors possible for a composite: exactly 4 when p≠q, or 3 when p=q. This minimal structure makes them hardest to factor — no small factor to find by trial division. RSA exploits exactly this: factoring a semiprime requires work proportional to √n (trial division) or sub-exponential algorithms for cryptographic sizes."

**P75 — Mastery Assessment:**
"A school has 36 students in a class. The teacher wants to arrange them in equal rows. (a) List all ways to arrange them in a rectangle with at least 2 rows and 2 columns. (b) In how many ways can 37 students be arranged? (c) If 35 students are absent and only the remaining number can be arranged in a 5×7 rectangle, how many are absent? (d) The teacher wants a number of students that can be arranged into MORE than 6 different rectangles (counting (a,b) and (b,a) as one). What is the smallest such number?"

**P55 — Reflect & Consolidate:** "Rectangular arrangements of n objects correspond to factor pairs of n. Numbers with many factor pairs (highly composite numbers: 12, 24, 36, 48, 60) are maximally flexible for equal groupings. A prime number can only be arranged in one rectangle: 1×p."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.composite-number complete
- Score 3/5 → REVIEW factor pairs and the status of 1; replay A01
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.prime-number; reassign

**P78 — Completion:** Composite numbers certified. Student classifies integers >1 as prime or composite, explains why 1 is excluded from both, lists all factor pairs, applies the √n trial-division test, and uses the divisor-count formula τ(n).

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Semiprimes; divisor count for two-prime products; RSA connection; factoring difficulty
Skill tested: Characterise semiprimes; prove divisor counts for pq; connect to cryptographic hardness

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
