# Blueprint: math.nt.algebraic-integers

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.algebraic-integers |
| name | Algebraic Integers |
| Domain | math.nt |
| Difficulty | research |
| Bloom level | analyze |
| Estimated hours | 20 |
| Mastery threshold | 0.60 |
| MAMR | 3/5 |
| Prerequisites | math.nt.algebraic-number-theory, math.abst.ring-theory |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines an algebraic integer as an element α∈ℂ satisfying a monic polynomial with integer coefficients; proves that the set of algebraic integers in any field extension forms a ring (closed under addition and multiplication); identifies the algebraic integers in ℚ as exactly ℤ; defines the norm N(α)=∏σ(α) and trace Tr(α)=∑σ(α) over all field embeddings σ; computes norm and trace for elements of quadratic fields using N(a+b√D)=a²−Db² and Tr(a+b√D)=2a; and explains why norm and trace are rational integers when α is an algebraic integer.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a nested-set diagram: ℤ ⊂ ℚ ⊂ algebraic integers ⊂ algebraic numbers ⊂ ℂ; label each region with examples: ℤ contains 5; ℚ\ℤ contains 3/2 (algebraic but not an algebraic integer); algebraic integers\ℚ contains √2 (satisfies x²−2=0, monic), ζ₃=(−1+√−3)/2 (satisfies x²+x+1=0, monic), but NOT 3/2 (would require 2x−3=0 which is NOT monic); algebraic numbers\algebraic integers contains π, e (transcendental, so actually outside algebraic numbers); annotate the boundary between ℚ and algebraic integers with "the only algebraic integers that are rational are the ordinary integers ℤ")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ALL-ALGEBRAIC-NUMBERS-ARE-ALGEBRAIC-INTEGERS | Student assumes every number satisfying an integer-coefficient polynomial is an algebraic integer; forgets the monic condition; believes 3/2 (satisfying 2x−3=0) is an algebraic integer | Type 3 — language contamination ("algebraic" is shared between "algebraic number" and "algebraic integer"; the crucial monic requirement is easily forgotten; the term "integer" misleads students into thinking it is automatically a stronger condition that subsumes all algebraic numbers) |
| MC-2 | ALGEBRAIC-INTEGER-MEANS-INTEGER | Student believes "algebraic integer" is just a synonym for an ordinary integer, not understanding it refers to complex numbers satisfying monic polynomials; fails to recognise √2 or i as algebraic integers | Type 3 — language contamination (the word "integer" carries its ordinary meaning of ℤ from arithmetic; students do not expect "algebraic integer" to apply to irrational or complex numbers; the algebraic-number-theory sense is a technical extension of the intuitive one that requires deliberate teaching) |
| MC-3 | NORMS-ARE-ALWAYS-POSITIVE | Student assumes N(α)>0 always; fails to account for real quadratic fields where N(a+b√D)=a²−Db² can be negative when Db²>a² | Type 1 — overgeneralisation (in complex quadratic fields N(α)=|α|² which IS positive; students generalise this to all fields; the norm for real embeddings is not a squared modulus but the product of all real Galois conjugates, which can be negative) |

## Component 4 — Session TA Cap
**Cap = 22** (hrs = 20 → cap 22)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**What makes a complex number an algebraic integer:**

| Question | Answer |
|---|---|
| "What is an algebraic number?" | Any α∈ℂ satisfying a nonzero polynomial p(x)∈ℚ[x] — equivalently, p(x)∈ℤ[x] (one can always clear denominators) |
| "What makes it an algebraic integer?" | The polynomial must be monic (leading coefficient = 1) and have coefficients in ℤ: α satisfies xⁿ + aₙ₋₁xⁿ⁻¹ + ⋯ + a₀ = 0 with all aᵢ∈ℤ |
| "Is 3/2 an algebraic integer?" | 3/2 satisfies 2x−3=0. Not monic. Can we find a MONIC integer polynomial? Suppose 3/2 satisfies xⁿ+aₙ₋₁xⁿ⁻¹+⋯+a₀=0. Multiply by 2ⁿ: 3ⁿ+aₙ₋₁·2·3ⁿ⁻¹+⋯+a₀·2ⁿ=0, so 3ⁿ≡0(mod 2), impossible. So 3/2 is NOT an algebraic integer. |
| "Is √2 an algebraic integer?" | √2 satisfies x²−2=0 — monic with integer coefficients. YES. |
| "Is (1+√5)/2 an algebraic integer?" | Satisfies x²−x−1=0 (monic, integer coefficients). YES — despite being irrational and non-integer-looking. |

**Key theorem (ring structure):** If α and β are algebraic integers, then α+β and αβ are algebraic integers. (Proof sketch: consider the tensor product of the lattices ℤ[α] and ℤ[β]; the matrix representing multiplication by α+β or αβ on this lattice has integer entries and its characteristic polynomial is monic over ℤ.) Hence the algebraic integers form a ring.

**Intersection with ℚ:** If α is an algebraic integer AND α∈ℚ, then α∈ℤ. (Proof: let α=p/q in lowest terms. α satisfies xⁿ+aₙ₋₁xⁿ⁻¹+⋯+a₀=0. Multiply by qⁿ: pⁿ+aₙ₋₁qpⁿ⁻¹+⋯+a₀qⁿ=0, so q|pⁿ. Since gcd(p,q)=1, q=±1, hence α∈ℤ.)

**P49 checkpoint:**
- CORRECT → "Algebraic integer: monic polynomial in ℤ[x]. Ring: sum/product of algebraic integers are algebraic integers. ℚ∩(algebraic integers)=ℤ." → A02
- PARTIAL (forgets monic condition) → "The monic condition is what separates algebraic integers from algebraic numbers. The algebraic integer 3/2 question: 3/2 satisfies 2x−3=0 (not monic). To be an algebraic integer, it would need to satisfy a monic polynomial with INTEGER coefficients. Can it? If (3/2)ⁿ+aₙ₋₁(3/2)ⁿ⁻¹+⋯+a₀=0, multiply by 2ⁿ to get 3ⁿ+aₙ₋₁·2·3ⁿ⁻¹+⋯=0, making 3ⁿ even — impossible. So 3/2 is NOT an algebraic integer." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Does √2 satisfy a polynomial with integer coefficients? Write it. Is the leading coefficient 1? Then √2 IS an algebraic integer. Does 3/2 satisfy any monic polynomial with INTEGER coefficients? Suppose (3/2)²+a(3/2)+b=0 with a,b∈ℤ. Compute: 9/4+3a/2+b=0. Multiply by 4: 9+6a+4b=0. Can this hold for integer a,b?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Norm and trace — the two canonical maps from K to ℚ:**

For a number field K=ℚ(α) of degree n=[K:ℚ], there are exactly n field embeddings σ₁,…,σₙ: K→ℂ (homomorphisms from K into ℂ that fix ℚ pointwise). For any element β∈K:
- **Norm:** N_{K/ℚ}(β) = ∏ᵢσᵢ(β) (product of all Galois conjugates)
- **Trace:** Tr_{K/ℚ}(β) = ∑ᵢσᵢ(β) (sum of all Galois conjugates)

Both N(β) and Tr(β) lie in ℚ (they are symmetric functions of conjugates, hence rational). If β∈O_K (an algebraic integer), then N(β)∈ℤ and Tr(β)∈ℤ.

**Quadratic field formulas (most important case):**
For K=ℚ(√D) with D square-free, elements are β=a+b√D (a,b∈ℚ). The two embeddings are σ₁(β)=a+b√D and σ₂(β)=a−b√D. So:
- N(a+b√D) = (a+b√D)(a−b√D) = a²−Db²
- Tr(a+b√D) = (a+b√D)+(a−b√D) = 2a

Note: for real quadratic (D>0), N can be negative if Db²>a². For imaginary quadratic (D<0), N=a²+|D|b²>0 always.

**Examples:**
- K=ℚ(√2): N(3+2√2)=9−8=1, Tr(3+2√2)=6. N=1 means 3+2√2 is a UNIT of ℤ[√2].
- K=ℚ(√−5): N(1+√−5)=1+5=6, Tr(1+√−5)=2. N=6 means norm(1+√−5)=6.
- K=ℚ(ζ₃) (ζ₃=e^{2πi/3}): three embeddings. N(ζ₃)=1 (ζ₃ is a root of unity, N=constant term of x²+x+1 = 1). Tr(ζ₃)=−1 (sum of roots of x²+x+1).

**Discriminant:**
disc(β₁,…,βₙ) = det(σᵢ(βⱼ))². For an integral basis {1,β} of a quadratic field: disc = (σ₁(β)−σ₂(β))² = (2b√D)² = 4Db² for the element a+b√D. The field discriminant disc(K) = disc of O_K as a ℤ-module.

**P49 checkpoint:**
- CORRECT → "Norm = product of conjugates; Trace = sum. Both in ℤ when element is algebraic integer. Quadratic: N(a+b√D)=a²−Db², Tr=2a. Norm=1 characterises units. Norm can be negative for real quadratic." → A03
- PARTIAL (doesn't recognise negative norms) → "For REAL quadratic fields ℚ(√D) with D>0, the two conjugates a+b√D and a−b√D are BOTH real. Their product a²−Db² can be negative when b is large and D is large relative to a. For example in ℚ(√2): N(1+√2)=1−2=−1<0. This means 1+√2 is a unit of norm −1 (a 'norm-negative' unit). Contrast with IMAGINARY quadratic ℚ(√−5): N(a+b√−5)=a²+5b²>0 always (sum of squares)." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "In ℚ(√2): compute N(1+√2). Answer: (1+√2)(1−√2)=1−2=−1. Is this consistent with 1+√2 being a unit of ℤ[√2]? (What is (1+√2)(−1+√2)? What's N(unit)?)" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Monic-condition gate (MC-1 + MC-2 combined):**

**Gate question:** "A student says: 'The golden ratio φ=(1+√5)/2 is NOT an algebraic integer because it has a fractional part and algebraic integers should be integers.' Another student says: 'The number 3/2 is an algebraic integer because it satisfies 2x−3=0 which has integer coefficients.' Identify the error in each claim."

First student: WRONG. "Algebraic integer" does NOT mean an element of ℤ; it means satisfying a MONIC integer polynomial. φ satisfies x²−x−1=0 (monic, integer coefficients) — it IS an algebraic integer. The name is misleading: algebraic integers are elements of rings of integers O_K of number fields, which generally contain non-integer rationals... wait, actually they contain no non-integer rationals (the ℚ∩O_K=ℤ theorem) but they DO contain irrational numbers like φ. The word "integer" here is "integer-like" in the algebraic sense, not "element of ℤ."

Second student: WRONG. 2x−3=0 is NOT monic (leading coefficient 2, not 1). The key is that 3/2 would need to satisfy a monic polynomial with integer coefficients. By the rational-root theorem, any rational root p/q (in lowest terms) of a monic integer polynomial xⁿ+⋯+a₀ satisfies q|1, so q=±1, meaning p/q∈ℤ. Therefore 3/2 CANNOT be an algebraic integer.

**P49 checkpoint:**
- CORRECT → "φ=(1+√5)/2 IS an algebraic integer (monic polynomial x²−x−1). 3/2 is NOT (rational root theorem: rational algebraic integers must lie in ℤ)." → Gate (P91)
- PARTIAL → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "For φ: verify φ²=φ+1, so φ²−φ−1=0 (monic?). For 3/2: suppose (3/2)ⁿ+a_{n-1}(3/2)^{n-1}+⋯+a₀=0 with aᵢ∈ℤ. Multiply by 2ⁿ: 3ⁿ+2a_{n-1}·3^{n-1}+⋯+2ⁿa₀=0. What does this say about 3ⁿ mod 2?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 ALL-ALGEBRAIC-NUMBERS-ARE-ALGEBRAIC-INTEGERS):**
Step 1 — "An algebraic number satisfies ANY polynomial with rational (or integer) coefficients. An algebraic integer satisfies a MONIC polynomial with INTEGER coefficients. The monic condition — leading coefficient = 1 — is everything. Example: 3/2 satisfies 2x−3=0 (algebraic number: YES; algebraic integer: NO, because 2x−3 is not monic). The polynomial 3x²−3x+1/3 has 3/2 as a potential root — but it's not monic and not integer-coefficient. No monic integer polynomial has 3/2 as a root."
Step 2 — "Why does monic matter? A key theorem: any rational number that is an algebraic integer must in fact be an integer. Proof: if p/q (gcd(p,q)=1) satisfies xⁿ+a_{n-1}xⁿ⁻¹+⋯+a₀=0, multiply by qⁿ: pⁿ = −qⁿa₀−q^{n-1}a₁p−⋯, so q|pⁿ. Since gcd(p,q)=1, q=1. Hence p/q = p/1 ∈ ℤ."
Step 3 — "So the classification is: ℤ ⊂ (algebraic integers) ∩ ℚ = ℤ (exactly ℤ). Algebraic integers outside ℚ include: √2, √−1, ζ_n (roots of unity), (1+√5)/2, ∛3, ζ_p for any prime p. The 'non-integer' feeling comes from the value, not from the algebraic property."

**TB-R02 (MC-3 NORMS-ARE-ALWAYS-POSITIVE):**
Step 1 — "The norm N_{K/ℚ}(β) = ∏ᵢσᵢ(β) is a PRODUCT of conjugates. For imaginary quadratic fields like ℚ(√−5), the two conjugates a+b√−5 and a−b√−5 are complex conjugates: their product a²+5b² is always ≥0. For REAL quadratic fields like ℚ(√2), both conjugates are real numbers, and their product a²−2b² can be negative (e.g. N(1+√2)=1−2=−1)."
Step 2 — "More generally: N_{K/ℚ}(β) = (-1)ⁿ × constant term of the minimal polynomial of β over ℚ. If the minimal polynomial is xⁿ+a_{n-1}xⁿ⁻¹+⋯+a₀, then N(β)=(−1)ⁿa₀. This can have any sign."
Step 3 — "Units (invertible elements of O_K) are characterised by N(u)=±1. In imaginary quadratic fields: N(u)=a²+|D|b²=1 forces very few units (just ±1 for D<−1, or ±1,±i for D=−1, etc.). In real quadratic fields: N(u)=±1 gives infinitely many units because a²−Db²=±1 has infinitely many solutions (Pell's equation!). The sign freedom is exactly what gives real quadratic fields infinite unit groups."

**TB-R03 (MC-2 ALGEBRAIC-INTEGER-MEANS-INTEGER):**
Step 1 — "The word 'integer' in 'algebraic integer' is an analogy, not equality. In ℤ, the integers are 'nice' (closed under +, ×, have factorisation properties). The ring of integers O_K of a number field K is the 'nicest' subring of K — it plays the same role as ℤ plays in ℚ. But O_K is generally NOT a subset of ℤ."
Step 2 — "Examples in specific rings: in K=ℚ(√2): O_K=ℤ[√2]={a+b√2: a,b∈ℤ} — this includes √2≈1.414…, 2+3√2≈6.24…, etc., none of which are ordinary integers. In K=ℚ(i): O_K=ℤ[i]={a+bi: a,b∈ℤ} — includes i, 2+3i, etc. These are algebraic integers but not in ℤ."
Step 3 — "The crucial fact IS: O_K ∩ ℚ = ℤ. So the only algebraic integers that HAPPEN to be rational numbers are the ordinary integers. But algebraic integers can be irrational or complex while still being algebraic integers."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Determine whether each of the following is an algebraic integer: (a) 2/3; (b) √3; (c) (1+√−3)/2; (d) 1+∛2; (e) e^{iπ/4}=(√2/2)(1+i). For each, either exhibit a monic integer polynomial it satisfies or prove it is not an algebraic integer.
2. In ℚ(√−7): compute N(3+√−7) and Tr(3+√−7). Is 3+√−7 an algebraic integer? (The ring of integers of ℚ(√−7) is ℤ[(1+√−7)/2] since −7≡1(mod 4).) Verify that (1+√−7)/2 is an algebraic integer but 3+√−7 ∈ O_{ℚ(√−7)}.
3. Prove the ring-closure property: if α and β satisfy monic integer polynomials of degrees m and n respectively, then α+β is a root of a monic integer polynomial of degree ≤mn. (Hint: consider the matrix of multiplication-by-(α+β) acting on the ℤ-module ℤ[α]⊗ℤ[β] which has rank mn and is closed under multiplication by α and β separately.)
4. Prove that if α is an algebraic integer with α∈ℚ then α∈ℤ. What does this imply about the number φ−1=(√5−1)/2? Is it an algebraic integer? Is it in ℤ?

**P55 — Reflect & Consolidate:** "Algebraic integer: monic integer polynomial. NOT the same as ℤ (includes √2, i, φ, ζ_n). Ring-closed. Rational algebraic integers are exactly ℤ. Norm = product of embeddings; Trace = sum. Norm can be negative for real quadratic fields. N=1 or N=−1 ↔ unit."

**P76 — Transfer Probe (Independence mode: cross_links = []):**
(a) The ring ℤ[√2] is norm-Euclidean: the division algorithm works using the norm as the 'size' measure. Specifically: for any a,b∈ℤ[√2] with b≠0, there exist q,r∈ℤ[√2] with a=qb+r and N(r)<N(b). Show that for b=3+√2 (with N(3+√2)=9−2=7) and a=5+2√2 (with N(5+2√2)=25−8=17), you can find such q and r by computing a/b=(5+2√2)/(3+√2)=(5+2√2)(3−√2)/7=(15−5√2+6√2−4)/7=(11+√2)/7≈(11+1.41)/7≈1.77+0.2√2. Round to nearest element of ℤ[√2]: q=2 (rounding 1.77→2, 0.2→0). Then r=a−qb=5+2√2−2(3+√2)=5+2√2−6−2√2=−1. Verify N(−1)=1<7=N(b). (b) Use norm-Euclidean property to explain why ℤ[√2] is a PID (hence a UFD), contrasting with ℤ[√−5] which has class number 2. (c) Can you use the norm function N(a+b√D)=a²−Db² to run a Euclidean algorithm in ℤ[√3]? The key requirement is: for all a,b∈ℤ[√3] with b≠0, |N(r)|<|N(b)|. Does ℤ[√3] satisfy this? (It does — ℤ[√3] is norm-Euclidean.)

**P55 — Reflect & Consolidate:** "Norm-Euclidean rings are PIDs (hence UFDs): ℤ[√2], ℤ[i], ℤ[√−2], ℤ[ω] (ω=e^{2πi/3}). Non-Euclidean but PID: ℤ[(1+√−19)/2]. Non-PID (h>1): ℤ[√−5] (h=2). Class number measures failure of both PID and UFD properties."

**P75 — Mastery Assessment:**
"(a) Prove that the set of all algebraic integers in ℂ forms a ring. You must show: (i) 0 and 1 are algebraic integers; (ii) if α and β are algebraic integers then so is α+β; (iii) if α and β are algebraic integers then so is αβ. You may use the fact that if M and N are finitely generated ℤ-modules with αM⊆M and βN⊆N, then M⊗N is finitely generated with both α and β acting on it, hence α+β and αβ act on M⊗N. (b) Determine O_K for K=ℚ(√−11). (Hint: −11≡1 mod 4.) Verify that (1+√−11)/2 is an algebraic integer. What is N((1+√−11)/2)? (c) Let α=2^{1/3} (cube root of 2). Its minimal polynomial over ℚ is x³−2. Is α an algebraic integer? What are N_{ℚ(α)/ℚ}(α) and Tr_{ℚ(α)/ℚ}(α)? (Hint: the three embeddings send α to 2^{1/3}, 2^{1/3}ω, 2^{1/3}ω² where ω=e^{2πi/3}.)"

**P55 — Reflect & Consolidate:** "The ring of all algebraic integers in ℂ is a fascinating object: it is a Bézout domain (every finitely generated ideal is principal) but NOT Noetherian (the chain ℤ ⊂ ℤ[√2] ⊂ ℤ[2^{1/2},2^{1/3}] ⊂ ⋯ never stabilises). The algebraic integers in a fixed number field K form the ring O_K which IS Noetherian and Dedekind — the Noetherian condition is what makes ideal factorisation unique."

**P74 — Routing Decision:**
- Score ≥ 3/5 → MASTERED; math.nt.algebraic-integers complete
- Score 2/5 → REVIEW monic condition and norm computation; replay A01
- Score ≤ 1/5 → PREREQUISITE GAP in math.nt.algebraic-number-theory or math.abst.ring-theory; reassign

**P78 — Completion:** Algebraic Integers certified. Student defines algebraic integers via monic polynomials; confirms ℤ = (algebraic integers)∩ℚ; verifies ring closure; computes norm and trace in quadratic fields; connects norm to units and Euclidean domains.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Norm-Euclidean domains; PID/UFD implications; contrasting ℤ[√2] (h=1) with ℤ[√−5] (h=2)
Skill tested: Use the norm function to run a Euclidean algorithm; connect ring-theoretic properties to class numbers

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
