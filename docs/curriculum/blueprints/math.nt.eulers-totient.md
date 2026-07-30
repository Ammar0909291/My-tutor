# Blueprint: math.nt.eulers-totient

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.eulers-totient |
| name | Euler's Totient Function |
| Domain | math.nt |
| Difficulty | advanced |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.nt.divisibility, math.nt.prime-factorization |
| Cross-links | — |
| Unlocks | math.nt.rsa-basics |

## Component 1 — Learning Objective
The student defines φ(n) as the count of integers in {1,2,…,n} that are coprime to n; computes φ(n) from prime factorisation using the product formula φ(n)=n∏_{p|n}(1−1/p); proves multiplicativity φ(mn)=φ(m)φ(n) when gcd(m,n)=1; computes φ(pᵏ) directly; states and applies Euler's Theorem a^φ(n)≡1(mod n) when gcd(a,n)=1; and identifies Fermat's Little Theorem as the special case n=p prime.

## Component 2 — CPA Entry Stage
**C — Concrete** (list 1–12 and circle each number coprime to 12 by crossing out multiples of 2 and multiples of 3: remaining = {1,5,7,11} = 4 numbers; φ(12)=4; compare with the formula 12×(1−1/2)×(1−1/3)=12×1/2×2/3=4 ✓)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | TOTIENT-COUNTS-PRIMES-UP-TO-n | Student believes φ(n) = the number of primes ≤ n (the prime-counting function π(n)); confuses two different counting functions with similar sounding definitions | Type 3 — language contamination ("totient" is an unfamiliar word; "count of numbers up to n satisfying a primeness-adjacent property" conflates with the more familiar prime-counting concept; both are listed in the same lesson) |
| MC-2 | TOTIENT-ALWAYS-MULTIPLICATIVE | Student applies φ(mn)=φ(m)φ(n) without the gcd(m,n)=1 condition; computes φ(12)=φ(4)×φ(3) (correct, gcd=1), then incorrectly applies the same formula to φ(36)=φ(4)×φ(9)=2×6=12 when in fact φ(36)=12 (happens to be correct here but for wrong reasoning since gcd(4,9)=1 anyway — a better trap is φ(6)=φ(2)×φ(3) vs φ(4)=φ(2)×φ(2)) | Type 1 — overgeneralization (multiplicativity is a clean rule; the gcd condition is easily forgotten when it's "usually" satisfied in textbook examples) |
| MC-3 | EULERS-THEOREM-HOLDS-FOR-ALL-a | Student applies a^φ(n)≡1(mod n) for any a without checking gcd(a,n)=1; tries 2^φ(6)≡1(mod 6) but 2²=4≢1(mod 6) | Type 5 — instruction-induced (Euler's Theorem is stated cleanly without always emphasising the coprimality hypothesis; students applying Fermat's Little Theorem for prime p know all 1≤a<p are coprime, so the habit of not checking transfers) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of Euler's Totient:**

| Representation | Content |
|---|---|
| Direct count | φ(12): list {1,2,…,12}, keep only those with gcd(k,12)=1: {1,5,7,11} → φ(12)=4 |
| Inclusion-exclusion | For n=pq (distinct primes): φ(pq)=pq−p−q+1=(p−1)(q−1) |
| Product formula | φ(n)=n·∏_{p prime, p|n}(1−1/p) |
| Prime power case | φ(pᵏ)=pᵏ−pᵏ⁻¹=pᵏ⁻¹(p−1): among 1…pᵏ, exactly pᵏ⁻¹ are divisible by p |

**Product formula derivation (n=2³×3):**
- Integers 1…24 NOT coprime to 24=2³×3: multiples of 2 (count 12) + multiples of 3 (count 8) − multiples of 6 (count 4) = 16 non-coprime
- φ(24) = 24−16 = 8
- Formula: 24×(1−1/2)×(1−1/3) = 24×(1/2)×(2/3) = 8 ✓

**Table of values:**
| n | Prime factorisation | φ(n) |
|---|---|---|
| 1 | — | 1 |
| 2 | 2 | 1 |
| 6 | 2×3 | (2−1)(3−1)=2 |
| 12 | 2²×3 | 4 |
| 24 | 2³×3 | 8 |
| 30 | 2×3×5 | (1)(2)(4)=8 |
| p (prime) | p | p−1 |
| p² | p² | p(p−1) |

**P49 checkpoint:**
- CORRECT → "φ(n) = count of integers in {1,…,n} coprime to n. Product formula: n∏(1−1/p). φ(pᵏ)=pᵏ⁻¹(p−1). Multiplicativity: gcd(m,n)=1 → φ(mn)=φ(m)φ(n)." → A02
- PARTIAL (cannot use the product formula, only direct count) → "The product formula saves time for large n. For n=2³×3²×5: direct count is impractical. Formula: n×(1−1/2)×(1−1/3)×(1−1/5)=360×(1/2)×(2/3)×(4/5)=96. Each factor (1−1/p) removes the fraction of numbers divisible by prime p, with inclusion-exclusion built in." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "How many integers from 1 to 10 have no factor in common with 10? List them." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Patterns in totient values:**

**Sum formula:** ∑_{d|n} φ(d) = n. Example: for n=12, divisors are 1,2,3,4,6,12; φ(1)+φ(2)+φ(3)+φ(4)+φ(6)+φ(12)=1+1+2+2+2+4=12 ✓

**Euler's Theorem derivation sketch:**
Consider the set S = {a₁,a₂,…,a_φ(n)} of integers in {1,…,n} coprime to n. Multiply each by a (where gcd(a,n)=1): aS = {aa₁,…,aa_φ(n)} mod n is again a permutation of S (since multiplication by a is a bijection on the coprime residues). Therefore:
∏(aaᵢ) ≡ ∏aᵢ (mod n) → a^φ(n) ∏aᵢ ≡ ∏aᵢ (mod n) → a^φ(n)≡1(mod n)

**Fermat's Little Theorem as a special case:** if n=p prime, then φ(p)=p−1, and every a with 1≤a≤p−1 satisfies gcd(a,p)=1, so a^(p−1)≡1(mod p). This is Fermat's Little Theorem.

**Computing large powers modulo n using Euler's Theorem:**
Find 7^100 mod 9. φ(9)=6. gcd(7,9)=1 ✓. 7^6≡1(mod 9). 100=16×6+4. So 7^100=(7^6)^16×7^4≡1^16×7^4≡7^4(mod 9). 7²=49≡4, 7^4≡16≡7(mod 9). So 7^100≡7(mod 9).

**P49 checkpoint:**
- CORRECT → "Euler's Theorem: a^φ(n)≡1(mod n) when gcd(a,n)=1. ∑_{d|n}φ(d)=n. Modular exponentiation: reduce exponent mod φ(n)." → A03
- PARTIAL (knows theorem but forgets gcd condition) → "Euler's Theorem requires gcd(a,n)=1. Counterexample: a=2, n=4. φ(4)=2. 2²=4≡0(mod 4) ≠ 1. Since gcd(2,4)=2≠1, the theorem doesn't apply. Always check coprimality before applying." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Compute φ(35). Then find 3^φ(35) mod 35 without computing 3^24 directly." → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Totient vs prime-counting gate:**

**Gate question (MC-1):** "A student says φ(n) counts the primes up to n. Is this correct? What does φ(n) actually count?"

Completely wrong. φ(n) counts integers in {1,…,n} coprime to n — not primes. For n=12: primes up to 12 are {2,3,5,7,11} = 5 primes, but φ(12)=4 (counting {1,5,7,11} — note 2 and 3 are NOT coprime to 12 and are excluded). The prime-counting function is π(n). For prime p: φ(p)=p−1 (all integers 1…p−1 are coprime to p), while π(p) can vary widely. The functions agree only in trivial cases.

**P49 checkpoint:**
- CORRECT → "φ(n) = #{k : 1≤k≤n, gcd(k,n)=1}. The prime-counting function π(n) = #{primes ≤ n}. These are distinct. For composite n, many non-prime numbers are still coprime to n (e.g. 1 is always coprime to n)." → Gate (P91)
- PARTIAL → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "List all integers from 1 to 8 that are coprime to 8. How many are there? Is 1 coprime to 8? Is 3?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 TOTIENT-COUNTS-PRIMES-UP-TO-n):**
Step 1 — "φ(n) counts integers from 1 to n sharing NO common factor with n — this includes 1 (always coprime to everything) and non-prime numbers like 5 when computing φ(6) (gcd(5,6)=1, so 5 is counted). But 2 and 3 are NOT counted in φ(6) even though they're prime, because they divide 6." Step 2 — Counter: φ(6)=#{1,5}=2. The primes up to 6 are {2,3,5}=3 primes. These are different numbers. Step 3 — "φ(p)=p−1 for prime p might suggest a prime connection, but that's because ALL numbers 1…p−1 happen to be coprime to the prime p (none divide it). For composite n, coprimality is more selective."

**TB-R02 (MC-3 EULERS-THEOREM-HOLDS-FOR-ALL-a):**
Step 1 — "Euler's Theorem requires gcd(a,n)=1. When a and n share a common factor, the theorem fails. Try a=4, n=6: φ(6)=2, but 4²=16≡4(mod 6) ≠ 1." Step 2 — "The proof of Euler's Theorem uses multiplication by a as a bijection on the set of coprime residues. If gcd(a,n)>1, then a is NOT in this set, and multiplying by a maps some coprime residues to non-coprime residues — the permutation argument breaks." Step 3 — "Check gcd FIRST. If gcd(a,n)=1, apply Euler. If not, find the actual order of a mod n by direct computation or use the Carmichael function."

**TB-R03 (MC-2 TOTIENT-ALWAYS-MULTIPLICATIVE):**
Step 1 — "Multiplicativity φ(mn)=φ(m)φ(n) requires gcd(m,n)=1. Counterexample: φ(4)=2, φ(2)=1, φ(4×2)=φ(8)=4. But φ(4)×φ(2)=2×1=2 ≠ 4. Here gcd(4,2)=2≠1, so multiplicativity fails." Step 2 — "When gcd(m,n)>1, the shared prime factors get counted/adjusted multiple times in the product formula. The correct computation always goes through the prime factorisation: φ(8)=8×(1−1/2)=4." Step 3 — "General rule: ALWAYS compute φ via prime factorisation, never via multiplying φ(d₁)×φ(d₂) unless you've verified gcd(d₁,d₂)=1 first."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Compute φ(n) for n=100, n=210, n=p^5 (p prime), n=p²q (p,q distinct primes). Use the product formula; show work.
2. Find all n such that φ(n)=4. (There are multiple answers.) Explain how to find them systematically.
3. Compute 13^100 mod 7 using Fermat's Little Theorem. Compute 2^100 mod 15 using Euler's Theorem. Show that Euler's Theorem applies by checking gcd(2,15)=1.
4. Prove the sum formula ∑_{d|n} φ(d) = n by partitioning {1,…,n} into classes based on gcd(k,n).

**P55 — Reflect & Consolidate:** "φ(n)=n∏_{p|n}(1−1/p). φ(pᵏ)=pᵏ⁻¹(p−1). Multiplicativity requires gcd(m,n)=1. Euler's Theorem: a^φ(n)≡1(mod n) when gcd(a,n)=1. Reduce exponents mod φ(n) for modular exponentiation. φ(p)=p−1 gives Fermat's Little Theorem."

**P76 — Transfer Probe (Independence mode):**
The RSA algorithm uses two large primes p=61, q=53 (toy example). (a) Compute n=p×q and φ(n)=(p−1)(q−1). Why does φ(n)=(p−1)(q−1) hold here? (b) Choose public exponent e=17. Find d such that ed≡1(mod φ(n)); this is the private key. (c) To encrypt message m=65: compute c=m^e mod n. (d) Decrypt: verify m≡c^d(mod n). (e) Explain why the security of RSA depends on difficulty of computing φ(n) without knowing p and q.

**P55 — Reflect & Consolidate:** "For n=pq (distinct primes): φ(n)=(p−1)(q−1) from multiplicativity (gcd(p,q)=1) and φ(p)=p−1. The RSA encryption works because m^(ed)=m^(kφ(n)+1)=m·(m^φ(n))^k≡m·1^k≡m(mod n) by Euler's Theorem (gcd(m,n)=1 for valid messages). Computing φ(n) from n requires knowing p and q — hence factoring n is the hard problem."

**P75 — Mastery Assessment:**
"(a) Compute φ(1000). (b) Find all n≤30 with φ(n)=φ(n+1). (c) For which n is φ(n) odd? (d) Compute 7^500 mod 1000 using Euler's Theorem. (e) Is it true that φ(mn) ≥ φ(m)φ(n) for all m,n? Prove it or find a counterexample."

**P55 — Reflect & Consolidate:** "φ(1000)=400. φ(n) is odd only for n=1 and n=2 (since φ(n) is always even for n≥3: every prime p has p−1 even, and every prime power has φ(pᵏ)=pᵏ⁻¹(p−1) even). φ(mn)≥φ(m)φ(n) always: since φ is multiplicative, φ(mn)=φ(m)φ(n)∏gcd-corrections ≥ φ(m)φ(n)."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.eulers-totient complete
- Score 3/5 → REVIEW the product formula and the gcd(a,n)=1 condition on Euler's Theorem; replay A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.prime-factorization or math.nt.divisibility; reassign

**P78 — Completion:** Euler's Totient certified. Student computes φ(n) via the product formula and prime factorisation; proves and applies multiplicativity; states and applies Euler's Theorem (checking the gcd condition); reduces modular exponentials using φ; identifies Fermat's Little Theorem as a special case.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: RSA toy protocol; φ(pq) multiplicativity; finding private key via Bézout/modular inverse; security argument
Skill tested: Apply totient to cryptographic key generation; explain why φ(n) is hard to compute from n alone

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
