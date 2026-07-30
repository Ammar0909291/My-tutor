# Blueprint: math.nt.sieve-of-eratosthenes

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.sieve-of-eratosthenes |
| name | Sieve of Eratosthenes |
| Domain | math.nt |
| Difficulty | developing |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.nt.prime-number, math.nt.divisibility |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student executes the Sieve of Eratosthenes to find all primes up to N by sequentially crossing off multiples; explains why it suffices to start crossing off at p² (not 2p) for each prime p; states the time complexity O(N log log N) and space complexity O(N); derives the prime counting function approximation π(N) ≈ N/ln N (prime number theorem); and implements or traces the sieve for N=50 without omitting any prime.

## Component 2 — CPA Entry Stage
**C — Concrete** (write numbers 2–30 on a grid; circle 2, cross out every second number after 2; circle 3, cross out every third uncrossed number after 3; circle 5, cross out every fifth; circle 7 — all remaining numbers are prime)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | START-CROSSING-AT-2p-NOT-p² | Student starts crossing off multiples of p from 2p (the first multiple after p) rather than p² — does not recognise that all composites less than p² that are multiples of p have a smaller prime factor and are already crossed off | Type 5 — instruction-induced (the most natural starting point for "cross off multiples of p" is "start just after p, i.e. at 2p"; the p² optimisation is presented as an optional speedup rather than the theoretically justified starting point) |
| MC-2 | SIEVE-MISSES-PRIMES-AFTER-√N | Student stops the sieve at √N and incorrectly crosses off all remaining numbers, not recognising that numbers remaining after crossing off multiples of primes up to √N are themselves prime | Type 1 — overgeneralization (the fact that trial division only needs to go to √N leads students to think the sieve is "done" when they reach √N and incorrectly delete remaining numbers) |
| MC-3 | CROSSING-OFF-MUST-VISIT-EVERY-MULTIPLE | Student marks composites by testing every pair (p, kp) without using the sieve's sequential structure, turning the O(N log log N) algorithm into O(N√N) | Type 5 — instruction-induced (the description "cross off every multiple of p" does not specify the starting point or the sequential structure; students independently implement an inner loop from p+1 to N/p rather than marking p², p²+p, p²+2p, …) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of the sieve:**

| Representation | Content |
|---|---|
| Physical grid | Write 2 to N on a grid; circle each uncrossed number and cross its multiples; remaining circled numbers are prime |
| Algorithm | for p = 2,3,5,7,…,⌊√N⌋ (uncrossed): mark p²,p²+p,p²+2p,… as composite; uncrossed numbers at end are primes |
| Correctness argument | If n≤N is composite, n=ab (a≤b, a≤√N). Since a≤√N, a was processed at some step and n=a×b was crossed off |
| Complexity | Crossings: N/2+N/3+N/5+… ≈ N × ln ln N (sum over primes ≤N of N/p ≈ N ln ln N). Space: O(N) bits |

**Why start at p²:**
Multiples of p less than p² are: 2p, 3p, …, (p−1)p.
Each of these has a factor smaller than p (namely 2, 3, …, p−1), so they were already crossed off when we processed those smaller primes.
First uncrossed multiple of p is p×p = p².

**Sieve for N=30:**
Start: 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
p=2: cross 4,6,8,10,12,14,16,18,20,22,24,26,28,30 (start at 4=2²)
p=3: cross 9,15,21,27 (start at 9=3²; 6,12,18,24,30 already crossed)
p=5: cross 25 (start at 25=5²; 10,15,20,30 already crossed)
p=7: 7²=49>30, stop.
Primes: 2,3,5,7,11,13,17,19,23,29

**P49 checkpoint:**
- CORRECT → "Sieve: circle p, cross p² to N stepping p. Correctness: every composite n≤N has a factor ≤√N, already processed. Complexity: O(N log log N)." → A02
- PARTIAL (applies sieve correctly but starts at 2p not p²) → "Starting at 2p works but is redundant. Multiples 2p, 3p, …, (p-1)p each have a factor smaller than p — for example, 2p has factor 2. The prime 2 was processed first, so 2p was already crossed when we marked 2's multiples. p² is the FIRST multiple of p that was not already eliminated. Starting there saves work and is the standard efficient form." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Apply the Sieve of Eratosthenes to find all primes up to 25. Show each crossing-off step." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Prime counting and density gallery:**

**Prime Number Theorem:** π(N) ≈ N/ln N, where π(N) counts primes ≤N.
| N | π(N) (exact) | N/ln N (approx) | Relative error |
|---|---|---|---|
| 100 | 25 | 21.7 | 13% |
| 1,000 | 168 | 144.8 | 14% |
| 10,000 | 1,229 | 1,085.7 | 12% |
| 100,000 | 9,592 | 8,685.9 | 9% |
| 10⁶ | 78,498 | 72,382 | 8% |

Better approximation: Li(N) = ∫₂^N dt/ln t (the logarithmic integral) — error O(√N ln N).

**Sieve variants and optimisations:**
1. **Segmented sieve**: for N too large to fit in memory (N>10⁸), process in blocks of √N numbers. Store only the primes ≤√N and sieve each block.
2. **Bit sieve**: store one bit per number instead of one byte — reduces memory by 8×.
3. **Odds-only sieve**: skip all even numbers (already composite after p=2). Reduces work by ~50%.
4. **Linear sieve** (Euler's sieve): each composite is crossed off exactly once — O(N) time, but more complex to implement.

**Pattern:** The Sieve of Eratosthenes is the fastest practical method for finding all primes up to ~10⁹. The prime counting function grows as N/ln N — primes thin out, but never stop (Euclid's proof: finitely many primes leads to a contradiction).

**P49 checkpoint:**
- CORRECT → "Sieve: O(N log log N) time, O(N) space. π(N)≈N/ln N. Segmented sieve for N>memory. Primes thin out but are infinite." → A03
- PARTIAL (knows the sieve but cannot derive the complexity) → "At step p, we cross off ≈N/p numbers. Total crossings ≈ Σ_{p prime ≤N} N/p. A classical result (Mertens' theorem) says Σ_{p≤N} 1/p ≈ ln ln N. So total crossings ≈ N × ln ln N = O(N log log N). This is much better than O(N√N) for naive trial division of each number." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Using the prime number theorem, approximately how many primes are there between 10⁶ and 2×10⁶? Between 10⁶ and 10⁶+1000?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Stop-at-√N gate:**

**Gate question (MC-2):** "A student sieves up to N=50 but stops the outer loop at p=5 (since 7²=49<50 and 7<√50<8). They then say 'all numbers from 8 to 50 that are still uncrossed must be crossed off because they haven't been tested yet.' Is this correct?"

No — exactly the opposite. After processing all primes p≤√N, every remaining uncrossed number IS prime. Here's why: suppose n>√N is composite and still uncrossed after the sieve. Then n=ab with a≤√N. But a is a prime factor of n with a≤√N, so a was processed in the sieve and n=ab was crossed off. Contradiction — n cannot still be uncrossed. Therefore all remaining uncrossed numbers are prime.

For N=50, after p=7: uncrossed numbers 11,13,17,19,23,29,31,37,41,43,47 are ALL prime.

**P49 checkpoint:**
- CORRECT → "After processing all primes p≤√N, every surviving (uncrossed) number is prime. No additional crossing-off needed — remaining numbers are certified prime." → Gate (P91)
- PARTIAL (knows remaining are prime but not why) → "If n≤N survives and n is composite, n=ab (a≤b). Since a≤√N (the smaller factor), a must have been processed. When we processed prime p≤a, we crossed off all multiples of p including n (since p divides n). So n is already crossed. Contradiction. Therefore the only surviving numbers are prime." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "After running the sieve for N=100 and processing p=2,3,5,7, the number 97 is uncrossed. Is 97 prime? Check: is 97 divisible by 2,3,5,7? Since 7²=49<97 and 11²=121>97, what does this tell you?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 START-CROSSING-AT-2p-NOT-p²):**
Step 1 — "When we process prime p, we want to cross off all composites that have p as their smallest prime factor. What are they? They are p×p, p×(p+1), p×(p+2),…. Multiples of p smaller than p² — like 2p, 3p, …, (p−1)p — each has a factor smaller than p. For 2p: factor 2<p was processed first; 2p was already crossed. For 3p: factor 3<p was processed first. And so on." Step 2 — Concrete: when p=7, multiples 14, 21, 28, 35, 42 were crossed when we processed 2, 3, 2, 5, 2 respectively. The first uncrossed multiple is 49=7². Step 3 — "Starting at p² instead of 2p doesn't change the final prime list — correctness is identical. It only avoids re-crossing already-crossed numbers, which is the efficiency improvement that makes the algorithm O(N log log N) instead of a larger constant times O(N log N)."

**TB-R02 (MC-3 CROSSING-OFF-MUST-VISIT-EVERY-MULTIPLE):**
Step 1 — "The sieve's key insight is that once you identify a prime p, you mark all its multiples in a single pass: p², p²+p, p²+2p,…, stepping by p each time. This is an arithmetic progression — no division or modulo operation needed, just addition. This is what makes the sieve fast: marking multiples takes O(N/p) steps for prime p, not O(N) steps." Step 2 — Contrast with trial division: for each n from 2 to N, check divisibility by all primes ≤√n. Cost: Σ_{n≤N} π(√n) ≈ O(N√N/ln N). For N=10⁶: trial division ≈10⁹ operations; sieve ≈ 10⁶ × ln ln 10⁶ ≈ 3×10⁶ operations — 300× faster. Step 3 — "The sieve works ACROSS all numbers at once, not ONE number at a time. This global structure is what eliminates most of the work: each composite is found and marked exactly once (by its smallest prime factor), not individually tested."

**TB-R03 (MC-2 SIEVE-MISSES-PRIMES-AFTER-√N):**
Step 1 — "The sieve's outer loop processes primes p up to √N because every COMPOSITE n≤N has a prime factor ≤√N. So after all primes ≤√N are processed, the only uncrossed numbers are those with NO prime factor ≤√N — which means they have no prime factor except possibly themselves. Those numbers are prime." Step 2 — Check: is 97 (≤100) composite? If so, its smallest prime factor is ≤√100=10. Primes ≤10: 2,3,5,7. Is 97÷2, 97÷3, 97÷5, 97÷7 — no integer result. So 97 is prime, and the sieve correctly leaves it uncrossed. Step 3 — "Remaining numbers after the outer loop MUST stay uncrossed — they are certified prime. If you erroneously cross them off, you lose correct primes. The outer loop stopping at √N is both sufficient (finds all composites) and necessary (remaining are prime)."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Apply the Sieve of Eratosthenes for N=50. Show each step (which prime p is processed, which numbers are newly crossed, starting from p²). List all primes ≤50. Count them and compare with the estimate 50/ln(50)≈13.5.
2. Implement the sieve in pseudocode. Your implementation should: (a) use a boolean array `is_prime[2..N]`; (b) start crossing multiples at p²; (c) step by p in the inner loop; (d) output all i with is_prime[i]=true. Trace your pseudocode for N=15.
3. How many crossings does the sieve make for N=100? Estimate using Σ_{p≤10} ⌊(100−p²)/p⌋+1 for primes p=2,3,5,7. How does this compare with naively crossing from 2p to N?
4. The twin prime conjecture states there are infinitely many primes p with p+2 also prime (e.g., 3,5; 5,7; 11,13; 17,19). Apply the sieve for N=100 and list all twin prime pairs. Using π(N)≈N/ln N, estimate the density of primes near N=10⁶. How rare would you expect twin primes to be at that scale?

**P55 — Reflect & Consolidate:** "Sieve: cross p², p²+p, … for each prime p≤√N. Remaining uncrossed = prime. O(N log log N) time. π(N)≈N/ln N (primes thin out). Segmented sieve for large N. Stop outer loop at √N, never cross remaining numbers."

**P76 — Transfer Probe (Independence mode):**
The Sieve of Eratosthenes can be adapted to sieve for other arithmetic properties. (a) Sieve for squarefree numbers (numbers not divisible by any perfect square p²): mark multiples of 4, 9, 25, 49, … as square-full; remaining numbers are squarefree. How does the density of squarefree numbers up to N compare with the prime density? (The fraction of squarefree integers is 6/π²≈0.608.) (b) Sieve for k-almost-primes (products of exactly k prime factors with multiplicity): describe the algorithm and its complexity. (c) The Sieve of Sundaram (1934) sieve for primes directly: mark all numbers of the form i+j+2ij (for i,j≥1) and then 2k+1 where k is unmarked gives an odd prime. Verify this for i,j up to 5 and explain why it works.

**P55 — Reflect & Consolidate:** "Sieve-style algorithms extend beyond primes: squarefree numbers, smooth numbers, k-almost-primes, powerful numbers. The core idea is the same — use divisibility information propagated globally across an array to classify numbers in O(N polylog N) time, far faster than checking each number individually."

**P75 — Mastery Assessment:**
"A programmer needs all primes up to N=10⁹ for a cryptographic key-screening tool. Available RAM: 128 MB. (a) A standard bit-array sieve needs N/8 bytes of RAM. Is 128 MB enough? (b) If not, describe the segmented sieve approach and estimate how many segments are needed. (c) The screening tool needs to test whether a given 512-bit integer is prime. Can the Sieve of Eratosthenes be used directly? What method is used instead? (d) How many primes are approximately in the range [10⁹, 10⁹+10⁶] (use the prime number theorem)?"

**P55 — Reflect & Consolidate:** "N=10⁹ requires 125 MB as a bit array — just feasible, but segmented sieve is safer for memory-limited environments. For primality testing of large numbers (>10¹⁵), the sieve is infeasible; use Miller-Rabin probabilistic test (O(k log²N) per test) or AKS deterministic test (O(log⁶N)). The sieve is optimal for range primality; probabilistic tests are optimal for individual large-number testing."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.sieve-of-eratosthenes complete
- Score 3/5 → REVIEW the p² starting point and correctness argument; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.prime-number or math.nt.divisibility; reassign

**P78 — Completion:** Sieve of Eratosthenes certified. Student executes the sieve from p², explains the p² optimisation and the correctness argument, states O(N log log N) complexity, applies the prime number theorem, and describes the segmented sieve for large N.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Generalised sieves; squarefree numbers; k-almost-primes; Sieve of Sundaram
Skill tested: Adapt sieve to other arithmetic properties; analyse density; verify alternative sieve correctness

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
