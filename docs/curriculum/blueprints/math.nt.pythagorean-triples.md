# Blueprint: math.nt.pythagorean-triples

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.pythagorean-triples |
| name | Pythagorean Triples |
| Domain | math.nt |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.nt.general-diophantine, math.geom.pythagorean-theorem |
| Cross-links | math.geom.pythagorean-theorem |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines a Pythagorean triple as a positive-integer solution (a,b,c) to a²+b²=c²; classifies triples as primitive (gcd(a,b,c)=1) or non-primitive; states and applies Euclid's parametrisation of primitive triples: a=m²−n², b=2mn, c=m²+n² where m>n>0, gcd(m,n)=1, and m,n have opposite parity; proves that every Pythagorean triple is a non-negative integer multiple of a primitive one; identifies all primitive triples (a,b,c) with c<100; and connects the parametrisation to the Gaussian integer factorisation c=|m+ni|².

## Component 2 — CPA Entry Stage
**C — Concrete** (use graph paper: draw a right triangle with legs 3 and 4; measure hypotenuse = 5; verify 9+16=25; then try legs 5,12 and measure 13; then legs 8,15 and measure 17; ask "are there infinitely many such triangles with integer sides?")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | FEW-PYTHAGOREAN-TRIPLES-EXIST | Student believes only a handful of Pythagorean triples exist (3,4,5), (5,12,13), (8,15,17), etc.; doesn't realise Euclid's formula generates infinitely many primitive triples, and scalar multiples generate even more | Type 3 — language contamination (textbooks list a few famous triples; the word "triple" sounds specific/finite; students don't realise the formula gives a parametric infinite family) |
| MC-2 | EUCLID-FORMULA-WITHOUT-COPRIMALITY-CONDITION-GIVES-ALL-PRIMITIVE-TRIPLES | Student applies a=m²−n², b=2mn, c=m²+n² for all m>n without the gcd(m,n)=1 and opposite-parity conditions; produces non-primitive triples thinking they are primitive | Type 5 — instruction-induced (many sources present Euclid's formula without carefully stating the two conditions on m,n; the conditions are treated as an optional refinement when they're actually required to get exactly the primitive triples) |
| MC-3 | HYPOTENUSE-OF-PRIMITIVE-TRIPLE-CAN-BE-EVEN | Student believes the hypotenuse c=m²+n² can be even in a primitive triple; doesn't trace through the parity argument that forces c to be odd | Type 1 — overgeneralization (non-primitive triples like (6,8,10) have even hypotenuse 10; students see these and conclude primitive triples can too; the parity argument requires m and n to have opposite parity, forcing m²+n² ≡ 1 (mod 2) = odd) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four views of Pythagorean triples:**

| View | Content |
|---|---|
| Parametric formula | Primitive: a=m²−n², b=2mn, c=m²+n² with m>n>0, gcd(m,n)=1, m−n odd. General: (ka, kb, kc) for k∈ℤ₊ |
| Table of primitives | (m,n)=(2,1)→(3,4,5); (3,2)→(5,12,13); (4,1)→(15,8,17); (4,3)→(7,24,25); (5,2)→(21,20,29) |
| Circle parametrisation | Points (a/c, b/c) on the unit circle x²+y²=1 with rational coordinates; parametrised by slope t=n/m from (−1,0); connects Euclid's formula to rational points on a circle |
| Gaussian integers | c=|m+ni|² (norm in ℤ[i]): factorisation c=(m+ni)(m−ni); a+bi=(m+ni)²=(m²−n²)+2mni connects the triple to prime factorisation in ℤ[i] |

**Proof that Euclid's formula gives all primitive triples:**

Step 1: In any primitive triple (a,b,c), exactly one of a,b is even. (If both odd: a²+b²≡2 mod 4, but c² must be ≡0 or 1 mod 4 — can't be ≡2. If both even: gcd≥2, contradicts primitive.)

Step 2: WLOG b is even. Write b²=c²−a²=(c−a)(c+a). Since gcd(a,c)=1 (from primitive), gcd(c−a,c+a)|gcd(2a,2c)=2; since c,a odd, c−a and c+a are both even, but (c−a)/2 and (c+a)/2 are coprime positive integers.

Step 3: b/2 is even... actually b²/4 = ((c−a)/2)((c+a)/2). Since these factors are coprime and their product is a perfect square, each must be a perfect square: (c−a)/2=n², (c+a)/2=m². Then c=m²+n², a=m²−n², b=2mn with gcd(m,n)=1, m>n>0, m−n odd. ✓

**First few primitive triples (c<50):**

| m | n | a=m²−n² | b=2mn | c=m²+n² |
|---|---|---|---|---|
| 2 | 1 | 3 | 4 | 5 |
| 3 | 2 | 5 | 12 | 13 |
| 4 | 1 | 15 | 8 | 17 |
| 4 | 3 | 7 | 24 | 25 |
| 5 | 2 | 21 | 20 | 29 |
| 5 | 4 | 9 | 40 | 41 |
| 6 | 1 | 35 | 12 | 37 |
| 6 | 5 | 11 | 60 | 61 → c>50 |

**P49 checkpoint:**
- CORRECT → "Primitive triple ↔ m>n>0, gcd(m,n)=1, m−n odd. Euclid gives a=m²−n², b=2mn, c=m²+n². Every triple is a primitive one scaled by k." → A02
- PARTIAL (knows the formula but not the conditions) → "Without gcd(m,n)=1: take m=2, n=2 (not m>n but as example)... actually take m=4, n=2: a=12, b=16, c=20. gcd(12,16,20)=4 — not primitive! Euclid's formula without gcd(m,n)=1 produces non-primitive triples. Without opposite parity: m=3, n=1 (same parity, both odd): a=8, b=6, c=10=2×5. Not primitive — gcd=2. The conditions ensure primitivity." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Check: is (20,21,29) a Pythagorean triple? Verify 400+441=841=29². Find m,n from Euclid's formula (a=m²−n²=21, b=2mn=20 → mn=10 and m²−n²=21 → (m−n)(m+n)=21=3×7 → m−n=3,m+n=7 → m=5,n=2)." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Patterns in Pythagorean triples:**

**Divisibility patterns in primitive triples:**
- Exactly one of a,b is even (always b=2mn in Euclid's formula)
- c is always odd (since m²+n² with m,n of opposite parity: (odd+even=odd or even+odd=odd))
- Exactly one of a,b,c is divisible by 3 (provable from quadratic residues mod 3)
- Exactly one of a,b,c is divisible by 5 (from quadratic residues mod 5)

**Counting primitive triples with c≤N:** the count is approximately N/(2π) (density decreases as 1/(2πc) per c value).

**Infinite families:** fix n=1 in Euclid's formula: a=m²−1, b=2m, c=m²+1 for m≥2 and m even (since gcd(m,1)=1 always, and m−1 must be odd → m even). Gives (3,4,5),(8,15,17),(24,7,25),(35,12,37),… Note: m must be even for opposite parity with n=1 odd.

**Connection to sum of two squares:** c=m²+n² is expressible as a sum of two squares; by Fermat's theorem on sums of two squares, a prime p is c of a primitive triple iff p≡1(mod 4).

**P49 checkpoint:**
- CORRECT → "Primitive triple: one even leg (b=2mn), odd hypotenuse. Divisible by 3 and by 5 (one of each triple). Hypotenuse ≡1(mod 4) is prime iff that prime is a sum of two squares." → A03
- PARTIAL (doesn't see divisibility patterns) → Provide the mod-3 analysis for a specific triple and ask student to verify → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "In the triple (3,4,5): which is divisible by 3? By 4? By 5? In (5,12,13): which is divisible by 3? By 5? Do you see a pattern?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Conditions-for-primitivity gate:**

**Gate question (MC-2):** "Using Euclid's formula with m=6, n=2: compute the triple. Is it primitive? What conditions are violated?"

a=36−4=32, b=2×6×2=24, c=36+4=40. Triple: (32,24,40). Check primitivity: gcd(32,24,40)=8. Not primitive. Violation: gcd(6,2)=2≠1 (the coprimality condition is violated). The formula gives a non-primitive triple. Dividing by 8 gives (4,3,5), which is (the same as) the primitive (3,4,5) scaled up.

**P49 checkpoint:**
- CORRECT → "Both conditions (gcd(m,n)=1 AND m−n odd) required for primitive triple. Without them, the formula still gives a Pythagorean triple, but one that's a scalar multiple of a primitive." → Gate (P91)
- PARTIAL → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Apply Euclid's formula to m=3, n=1. Is gcd(3,1)=1? Is m−n=2 even or odd? Is the triple primitive? What happens if m=2, n=2? (Not valid since m>n needed — try m=4,n=2 instead.)" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 FEW-PYTHAGOREAN-TRIPLES-EXIST):**
Step 1 — "Euclid's formula produces one primitive triple for each valid pair (m,n) with m>n>0, gcd(m,n)=1, m−n odd. The number of such pairs is infinite. For each fixed m, there are φ(m)/2 valid n values (roughly). So infinitely many primitive triples exist." Step 2 — "For each primitive triple, we can scale: k×(3,4,5)=(3k,4k,5k) for any k∈ℤ₊. That's another infinite family. So among all Pythagorean triples, there are ∞ primitive ones and infinitely many non-primitive for each primitive." Step 3 — "The number of primitive triples with hypotenuse ≤N is ≈N/(2π) — it grows without bound. For N=100: about 16 primitive triples."

**TB-R02 (MC-3 HYPOTENUSE-OF-PRIMITIVE-TRIPLE-CAN-BE-EVEN):**
Step 1 — "In Euclid's formula: m and n have opposite parity (one odd, one even). So m²+n² is odd+even=odd or even+odd=odd. The hypotenuse c=m²+n² is ALWAYS ODD for a primitive triple." Step 2 — "Non-primitive triples can have even hypotenuse: (6,8,10) has c=10=2×5. But this is 2×(3,4,5); the primitive underlying triple (3,4,5) has odd hypotenuse 5." Step 3 — "Proof that c must be odd: in a primitive triple (a,b,c), a and c are both odd (since one of a,b is even, and c must be odd to keep gcd(a,c)=1 with a odd). An even c would force a²+b²≡0(mod 4) requiring both a,b to be even — contradicting primitivity."

**TB-R03 (MC-2 EUCLID-FORMULA-WITHOUT-COPRIMALITY-CONDITION-GIVES-ALL-PRIMITIVE-TRIPLES):**
Step 1 — "Test: m=4, n=2. Conditions: gcd(4,2)=2≠1 (fail), m−n=2 is even (fail). Formula: a=12, b=16, c=20. gcd=4 — not primitive. The formula gives (3,4,5)×4, not a new primitive triple." Step 2 — "Test: m=3, n=1. gcd=1 ✓, m−n=2 is even (fail, both odd). Formula: a=8, b=6, c=10. gcd=2 — not primitive. This gives (3,4,5)×2 (reordered)." Step 3 — "Without the conditions, you still always get A Pythagorean triple (the formula is always correct as a Pythagorean relation), but you may get a non-primitive one. The conditions ensure the OUTPUT is primitive, not just that it satisfies a²+b²=c²."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Find all primitive Pythagorean triples with hypotenuse c<50. Organise by (m,n) values. How many are there?
2. Prove: in any primitive Pythagorean triple (a,b,c), exactly one of a,b is divisible by 4, and c≡1(mod 4).
3. Find all Pythagorean triples (primitive and non-primitive) with one leg equal to 20. (Hint: set 20=2mn or 20=m²−n² and solve for integers.)
4. The triple (a,b,c) with b=a+1 (consecutive integers) is called a 'nearly isosceles' Pythagorean triple. Find the first four such triples and the values of (m,n) that produce them.

**P55 — Reflect & Consolidate:** "Euclid: a=m²−n², b=2mn, c=m²+n² with m>n>0, gcd(m,n)=1, m−n odd. Every primitive triple arises this way. Parity: one leg always even (b), hypotenuse always odd. Multiples of primitive triples give all triples."

**P76 — Transfer Probe (Cross-link mode: math.geom.pythagorean-theorem):**
(a) A ladder of length 25 feet leans against a wall. If the base is an integer number of feet from the wall and the top is an integer number of feet above the ground, what are the possible configurations? (Connect to Pythagorean triples with hypotenuse 25.) (b) A Pythagorean triple (a,b,c) can be derived from the Gaussian integer z=m+ni: set a=Re(z²)=m²−n², b=Im(z²)=2mn, c=|z|²=m²+n². Verify this for z=2+i. (c) Fermat's Last Theorem for n=4: prove x⁴+y⁴=z² has no positive-integer solution. (Hint: assume (a,b,c) with a=x², b=y², c=z is a Pythagorean triple and apply Euclid's formula, then descend.) This implies x⁴+y⁴=z⁴ also has no solution.

**P55 — Reflect & Consolidate:** "Pythagorean triples with c=25: 25=5²; primes ≡1(mod 4) appearing in c. 25=5×5; 5≡1(mod 4). Triples: (7,24,25) and (15,20,25)=(3,4,5)×5. The Gaussian integer derivation shows why Pythagorean triples and the arithmetic of ℤ[i] are the same theory."

**P75 — Mastery Assessment:**
"(a) List all primitive Pythagorean triples with hypotenuse between 25 and 75. (b) Prove that there are infinitely many primitive Pythagorean triples by showing the formula for n=1, m=2,4,6,8,… gives distinct primitive triples. (c) A right triangle has area 6. Find all primitive Pythagorean triples for which the area of the right triangle (ab/2) is a perfect square. [This connects to the 'congruent number problem' — 6 is the first congruent number.]"

**P55 — Reflect & Consolidate:** "Area=ab/2=m n(m²−n²)=mn(m+n)(m−n). For primitive triples with gcd(m,n)=1 and m−n odd, the four factors m,n,m+n,m−n are pairwise coprime. The product being a perfect square requires each factor to be a perfect square. Finding such m,n is the congruent number problem for a specific value of area."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.pythagorean-triples complete
- Score 3/5 → REVIEW the primitivity conditions and parity arguments; replay A01
- Score ≤ 2/5 → PREREQUISITE GAP in math.geom.pythagorean-theorem; reassign

**P78 — Completion:** Pythagorean Triples certified. Student applies Euclid's formula with correct conditions (gcd=1, opposite parity); lists primitive triples; proves parity and divisibility properties; connects to Gaussian integers; applies to geometric problems.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.geom.pythagorean-theorem])
Target: Integer ladders; Gaussian integer derivation; Fermat's Last Theorem n=4; congruent number problem
Skill tested: Connect parametric formula to geometric problems; derive FLT n=4 from Pythagorean structure

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
