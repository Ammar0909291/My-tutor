# Blueprint: math.nt.bezout-identity

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.bezout-identity |
| name | Bézout's Identity |
| Domain | math.nt |
| Difficulty | proficient |
| Bloom level | understand |
| Estimated hours | 4 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.nt.extended-euclidean-algorithm, math.nt.gcd |
| Cross-links | — |
| Unlocks | math.nt.linear-diophantine |

## Component 1 — Learning Objective
The student states Bézout's Identity: for any integers a,b (not both zero), there exist integers s,t such that sa+tb=gcd(a,b); finds a specific pair (s,t) by back-substituting the steps of the Extended Euclidean Algorithm; describes the complete set of solutions as s₀+k(b/d), t₀−k(a/d) for k∈ℤ where d=gcd(a,b); proves that gcd(a,b) is the smallest positive integer representable as a linear combination of a and b; and identifies the implication that gcd(a,b)=1 iff there exist s,t with sa+tb=1.

## Component 2 — CPA Entry Stage
**C — Concrete** (use fraction tiles or coloured rods of lengths 6 and 10: can you tile a strip of length 2 using only ±6 and ±10 pieces? Yes: 2×6−1×10=2; strip length 2 = gcd(6,10) — connects to the theorem)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | BEZOUT-COEFFICIENTS-ARE-UNIQUE | Student believes there is exactly one pair (s,t) satisfying sa+tb=gcd(a,b); does not recognize the infinite family of solutions parameterised by k | Type 1 — overgeneralization (the back-substitution method produces one specific solution; students treat it as the unique solution rather than one member of an infinite family) |
| MC-2 | ANY-LINEAR-COMBINATION-IS-ACHIEVABLE | Student believes sa+tb=c has an integer solution for any integer c (not just multiples of gcd); tries to write 7=s×6+t×10 and is confused when it fails | Type 1 — overgeneralization (Bézout says gcd is achievable, and its multiples are; student doesn't absorb the gcd(a,b)|c necessity) |
| MC-3 | BACK-SUBSTITUTION-GIVES-THE-SMALLEST-COEFFICIENTS | Student believes the s,t obtained from back-substitution are the pair with smallest absolute values; doesn't recognize they can be reduced by adding/subtracting multiples of b/d and a/d | Type 5 — instruction-induced (back-substitution is taught as "the" method; its output is presented as definitive; the parametric family s₀+k(b/d) is often deferred or omitted entirely in introductory treatments) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of Bézout's Identity:**

| Representation | Content |
|---|---|
| Numerical example | gcd(35,15)=5; back-sub: 35=2×15+5, so 5=35−2×15; thus s=1, t=−2: 1×35+(−2)×15=5 ✓ |
| Integer combinations | The set {sa+tb : s,t∈ℤ} = {multiples of gcd(a,b)}; Bézout says the generator gcd is itself achievable |
| Parametric family | One solution (s₀,t₀) gives all solutions: (s₀+k·b/d, t₀−k·a/d) for k∈ℤ, where d=gcd(a,b) |
| Coprimality criterion | sa+tb=1 has integer solution ↔ gcd(a,b)=1; used to find modular inverses |

**Back-substitution worked example for gcd(21,15):**
- 21=1×15+6
- 15=2×6+3
- 6=2×3+0 → gcd=3

Back-substitute:
- 3=15−2×6
- 6=21−1×15, so 3=15−2×(21−15)=3×15−2×21
- Thus s=−2, t=3: (−2)×21+3×15=−42+45=3 ✓

Parametric family (d=3, a/d=7, b/d=5): all solutions are (−2+5k, 3−7k) for k∈ℤ. Check k=1: (3,−4): 3×21+(−4)×15=63−60=3 ✓.

**P49 checkpoint:**
- CORRECT → "Bézout: sa+tb=gcd(a,b) always solvable; gcd is the smallest achievable positive linear combination; complete family: (s₀+kb/d, t₀−ka/d)." → A02
- PARTIAL (finds one solution but treats it as unique) → "The solution (s₀,t₀) you found is correct but not unique. Adding b/d to s and subtracting a/d from t preserves sa+tb: (s₀+b/d)a+(t₀−a/d)b = s₀a+b+(t₀)b−a = s₀a+t₀b = d. So infinitely many integer solutions exist. The back-substitution gives the canonical one with smallest |s|+|t|, but all others are equally valid." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Use the Extended Euclidean Algorithm on 35 and 20. Then back-substitute to find integers s,t with s×35+t×20=gcd(35,20)." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**When does sa+tb=c have an integer solution?**

**Theorem (extension of Bézout):** sa+tb=c has integer solutions ↔ gcd(a,b)|c.

| Equation | gcd | c divisible by gcd? | Solvable? |
|---|---|---|---|
| 6s+10t=2 | 2 | 2|2 ✓ | Yes: s=2,t=−1 |
| 6s+10t=3 | 2 | 2∤3 ✗ | No |
| 6s+10t=8 | 2 | 2|8 ✓ | Yes: s=3,t=−1 (×4 of base solution) |
| 6s+10t=6 | 2 | 2|6 ✓ | Yes: s=1,t=0 |

**Key applications of Bézout:**
1. **Modular inverses:** gcd(a,n)=1 ↔ ∃s: sa≡1(mod n); s is obtained directly from Bézout's s
2. **GCD as generator:** gcd(a,b) generates the ideal aℤ+bℤ = gcd(a,b)ℤ in ring theory
3. **Coprimality and primes:** if p is prime and p|ab, then p|a or p|b (since gcd(p,a)=p or 1; if gcd=1, Bézout gives sp+ta=1, multiply by b: spb+tab=b, and p|left side so p|b)

**Pattern recognition:** the set of all representable values sa+tb is closed under addition, subtraction, and integer scaling — exactly the multiples of gcd(a,b).

**P49 checkpoint:**
- CORRECT → "Solvable iff gcd|c. Applications: modular inverse, prime-divisibility proof, ideal generation. All solutions form a coset of (b/d)ℤ×(−a/d)ℤ." → A03
- PARTIAL (can't extend to general c) → "If (s₀,t₀) solves sa+tb=d (Bézout), then (cs₀/d, ct₀/d) solves sa+tb=c — provided d|c so the coefficients are integers. All solutions to sa+tb=c then form the parametric family (cs₀/d+kb/d, ct₀/d−ka/d)." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Does 5s+7t=3 have integer solutions? Does 6s+9t=4? Explain your reasoning in each case." → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Achievability gate:**

**Gate question (MC-2):** "A student claims: 'By Bézout, I can always write any integer as 6s+10t.' Evaluate this claim."

False. Bézout says gcd(6,10)=2 is achievable; and any multiple of 2 is achievable. But 3=6s+10t has no integer solution (3 is odd; 6s+10t=2(3s+5t) is always even). The set {6s+10t : s,t∈ℤ} = {…,−4,−2,0,2,4,6,…} = 2ℤ, not all of ℤ.

**P49 checkpoint:**
- CORRECT → "Achievable values = multiples of gcd. Any integer not a multiple of gcd(a,b) is not representable as sa+tb." → Gate (P91)
- PARTIAL (understands the theorem statement but makes arithmetic errors) → Provide a worked example with careful notation → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "What values of c make 4s+6t=c solvable? List five values that work and two that don't." → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 BEZOUT-COEFFICIENTS-ARE-UNIQUE):**
Step 1 — "The back-substitution gives ONE solution (s₀,t₀). But consider: if s₀a+t₀b=d, then (s₀+b/d)a+(t₀−a/d)b = s₀a+(b/d)a+t₀b−(a/d)b = s₀a+t₀b+(ab/d−ab/d) = d. Adding b/d to s and subtracting a/d from t leaves the sum unchanged." Step 2 — Example: (−2,3) for 21s+15t=3. Try k=1: (−2+5, 3−7)=(3,−4). Check: 3×21+(−4)×15=63−60=3 ✓. Try k=−1: (−7,10). Check: −7×21+10×15=−147+150=3 ✓. Step 3 — "Infinitely many solutions exist, but the minimal-|s| or minimal-|t| can be found by choosing k appropriately. Back-substitution just happens to give the solution that falls out naturally from the algorithm."

**TB-R02 (MC-2 ANY-LINEAR-COMBINATION-IS-ACHIEVABLE):**
Step 1 — "6s+10t is always even, because 6=2×3 and 10=2×5 both contain the factor 2. So 6s+10t=2×(3s+5t), which is always a multiple of 2. You can NEVER get an odd number." Step 2 — "More generally, any linear combination sa+tb is a multiple of gcd(a,b). So c must be a multiple of gcd(a,b) for the equation to have a solution. This is both necessary and sufficient (Bézout gives the solution when it's necessary)." Step 3 — Checklist: (1) compute d=gcd(a,b); (2) check d|c; (3) if yes, multiply Bézout coefficients by c/d to get the particular solution for c.

**TB-R03 (MC-3 BACK-SUBSTITUTION-GIVES-THE-SMALLEST-COEFFICIENTS):**
Step 1 — "The back-substitution output depends on how the algorithm runs — it's not guaranteed to be the smallest. Example: 3=−2×21+3×15 gives (s,t)=(−2,3) with |s|+|t|=5. But k=−1 gives (−7,10) with sum 17; k=1 gives (3,−4) with sum 7. The k=0 solution (−2,3) happens to be smallish but is not always minimal." Step 2 — "To find the solution with smallest |s|: reduce s₀ modulo b/d to land in [−b/2d, b/2d]; the corresponding t follows." Step 3 — "In practice, any valid (s,t) is as useful as any other for applications like computing modular inverses — which solution you use doesn't affect correctness."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Find integers s,t such that 47s+30t=gcd(47,30). Show all Extended Euclidean Algorithm steps and the back-substitution. Then find two more solutions to the equation.
2. Determine whether each equation has integer solutions; if yes, find one: (a) 14s+21t=7; (b) 15s+25t=6; (c) 35s+56t=14.
3. Prove: if gcd(a,b)=1 and a|bc, then a|c. (Hint: use Bézout to write sa+tb=1, then multiply through by c.)
4. Given that 3×17+(−5)×10=1, find the modular inverse of 17 modulo 10. Verify: 17×?≡1(mod 10).

**P55 — Reflect & Consolidate:** "Bézout: sa+tb=gcd(a,b) always solvable. General sa+tb=c solvable iff gcd(a,b)|c. Complete solution family: (s₀+kb/d, t₀−ka/d). Application: gcd(a,n)=1 gives the modular inverse of a mod n as the Bézout coefficient s."

**P76 — Transfer Probe (Independence mode):**
(a) The integers 1994 and 1993 are consecutive integers. Without computing, what is gcd(1994,1993)? Write down specific integers s,t with s×1994+t×1993=gcd(1994,1993). (b) Prove that for consecutive integers n and n+1, gcd(n,n+1)=1. (c) If gcd(a,b)=1, prove that gcd(a,b²)=1 and gcd(a²,b)=1. (d) A Chicken McNugget theorem variant: if gcd(a,b)=1 with a,b>1, prove that every integer N≥(a−1)(b−1) can be written as sa+tb with s,t≥0. (Hint: for each N, find a Bézout representation and adjust to make both coefficients non-negative.)

**P55 — Reflect & Consolidate:** "gcd(n,n+1)=1 always (consecutive integers share no prime factor). If gcd(a,b)=1, then gcd(a,bⁿ)=1 for all n (no prime can divide both a and any power of b). The Chicken McNugget bound (a−1)(b−1)−1 = ab−a−b is the largest non-representable number when gcd(a,b)=1 — the Frobenius number."

**P75 — Mastery Assessment:**
"(a) Use the Extended Euclidean Algorithm and back-substitution to find s,t with 252s+198t=gcd(252,198). (b) Find all solutions to 252s+198t=18. (c) Does 252s+198t=25 have a solution? Explain. (d) Find the modular inverse of 252 modulo 11 (if it exists); otherwise explain why it doesn't."

**P55 — Reflect & Consolidate:** "gcd(252,198)=18; Bézout gives one (s₀,t₀); all solutions to =18 use the parametric family. For =25: 18∤25, no solution. Modular inverse of 252 mod 11: gcd(252,11)=gcd(10,11)=1 (since 252≡10≡−1 mod 11), so inverse exists and equals −1≡10 mod 11; check: 252×10=2520=229×11+1 ✓."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.bezout-identity complete
- Score 3/5 → REVIEW the solvability condition gcd|c and the parametric family; replay A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.extended-euclidean-algorithm; reassign

**P78 — Completion:** Bézout's Identity certified. Student states and applies Bézout's Identity; finds coefficients by back-substitution; generates the complete solution family; applies the condition gcd|c for general sa+tb=c; uses Bézout to find modular inverses and prove coprimality lemmas.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Consecutive-integer GCD; coprimality of powers; Frobenius/Chicken-McNugget bound
Skill tested: Apply Bézout to abstract existence proofs; determine largest non-representable integer

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
