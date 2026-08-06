# Blueprint: math.disc.binomial-theorem

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.binomial-theorem |
| name | Binomial Theorem |
| Domain | math.disc |
| Difficulty | developing |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.disc.combinations |
| Cross-links | math.alg.binomial-theorem |
| Unlocks | — |

## Component 1 — Learning Objective
The student states and applies the binomial theorem (x+y)ⁿ = Σₖ₌₀ⁿ C(n,k) xᵏ yⁿ⁻ᵏ; identifies the binomial coefficients C(n,k) as the coefficients in the expansion; uses Pascal's triangle to read off coefficients for small n; derives combinatorial identities from the binomial theorem (Σ C(n,k) = 2ⁿ by setting x=y=1; Σ(−1)ᵏC(n,k) = 0 by setting x=−1, y=1); applies the theorem to find specific terms in an expansion without expanding fully; and states the multinomial theorem for (x₁+⋯+xₘ)ⁿ.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw Pascal's triangle to row 5 with C(n,k) labels; beside each row write the corresponding expansion of (x+y)ⁿ up to n=5; draw arrows from row 4 of Pascal's triangle to the four coefficients of (x+y)⁴ = x⁴+4x³y+6x²y²+4xy³+y⁴; annotate: "Each C(n,k) counts the number of ways to choose k factors of y from n copies of (x+y) — the combinatorial explanation of why the coefficients are the same as the triangle")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | BINOMIAL-THEOREM-ONLY-FOR-INTEGERS | Student applies (x+y)ⁿ = Σ C(n,k)xᵏyⁿ⁻ᵏ only when n is a positive integer; doesn't know that the generalised binomial theorem extends to any real (or complex) n with C(n,k)=n(n−1)⋯(n−k+1)/k! (an infinite series for non-integer n, converging for |x/y|<1) | Type 5 — instruction-induced (the discrete combinatorics course presents the binomial theorem exclusively for positive integer n, where the expansion terminates; the generalised version appears in calculus/analysis courses; students don't know the extension exists unless explicitly bridged) |
| MC-2 | PASCAL-IDENTITY-BY-MEMORISATION | Student memorises C(n,k) = C(n−1,k−1) + C(n−1,k) as a formula without understanding why it holds; can't use it to prove other identities or reconstruct Pascal's triangle from the rule alone; treats it as a computational shortcut, not a structural theorem | Type 4 — notation-induced (the formula is presented symbolically before the combinatorial proof: when choosing k from n objects, we either INCLUDE or EXCLUDE the n-th object — exactly one of two cases — giving C(n−1,k−1) + C(n−1,k); this "choose or don't choose" argument is rarely emphasised because the formula already works computationally) |
| MC-3 | SPECIFIC-TERM-REQUIRES-FULL-EXPANSION | Student expands the full binomial (x+y)ⁿ when asked only for the coefficient of a specific term; doesn't use the direct formula: the term containing xᵃyᵇ (where a+b=n) has coefficient C(n,b) | Type 1 — overgeneralisation (expanding fully works and students have done it repeatedly for small n; when n is large, they carry over the same habit without recognising that the general term formula C(n,k)xᵏyⁿ⁻ᵏ gives the answer directly in one step) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The binomial theorem — combinatorial derivation:**

**Combinatorial argument:** (x+y)ⁿ = (x+y)(x+y)⋯(x+y) (n factors). When fully expanded, each term is a product of one letter from each factor. The term xᵏyⁿ⁻ᵏ arises by choosing x from k of the n factors and y from the remaining n−k factors. Number of ways = C(n,k). Therefore:

**(x+y)ⁿ = Σₖ₌₀ⁿ C(n,k) xᵏ yⁿ⁻ᵏ.**

**General term:** The (k+1)-th term (k starting at 0) is T_{k+1} = C(n,k) xⁿ⁻ᵏ yᵏ (conventionally written with xⁿ⁻ᵏ first).

**Pascal's identity:** C(n,k) = C(n−1,k−1) + C(n−1,k).
Combinatorial proof: from n objects, the n-th is either IN the chosen k (C(n−1,k−1) ways to choose the remaining k−1) or OUT (C(n,k) ways to choose all k from the first n−1). These cases are disjoint and exhaustive.

**Key identities from the binomial theorem:**
Set x=1, y=1: Σₖ C(n,k) = 2ⁿ (total subsets of an n-set).
Set x=1, y=−1: Σₖ (−1)ᵏC(n,k) = 0 (even-sized subsets = odd-sized subsets for n≥1).
Set x=1, y=2: Σₖ C(n,k)2ᵏ = 3ⁿ.

**Worked example — specific term:**
Find the coefficient of x³y⁵ in (x+y)⁸. k=5 (choosing y from 5 of 8 factors): T₆ = C(8,5)x³y⁵ = 56x³y⁵. No expansion needed.

**P49 checkpoint:**
- CORRECT → "(x+y)ⁿ=ΣC(n,k)xᵏyⁿ⁻ᵏ. Pascal's identity: include/exclude argument. Identities: x=y=1→2ⁿ; x=1,y=−1→0. Specific term: C(n,k)xᵏyⁿ⁻ᵏ." → A02
- PARTIAL (MC-3: full expansion for specific term) → "To find the term containing x^a y^b in (x+y)ⁿ where a+b=n: use the GENERAL TERM FORMULA T_{b+1} = C(n,b)xᵃyᵇ directly. For (x+y)¹⁰, the term with x⁷y³: C(10,3) = 120, so the term is 120x⁷y³. You never need to write the other 9 terms. The formula 'choose k objects from n' tells you which factors supply y (k of them) and which supply x (n−k of them)." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Prove Σₖ₌₀ⁿ C(n,k) = 2ⁿ using the binomial theorem: set x=1, y=1 in (x+y)ⁿ = Σ C(n,k)xᵏyⁿ⁻ᵏ → (1+1)ⁿ = Σ C(n,k)·1ᵏ·1ⁿ⁻ᵏ = Σ C(n,k). But (1+1)ⁿ = 2ⁿ. QED. Combinatorial meaning: 2ⁿ subsets of an n-element set, summed by subset size." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Multinomial theorem and advanced identities:**

**Multinomial theorem:**
(x₁ + x₂ + ⋯ + xₘ)ⁿ = Σ_{k₁+k₂+⋯+kₘ=n} [n!/(k₁!k₂!⋯kₘ!)] x₁^{k₁}x₂^{k₂}⋯xₘ^{kₘ}.
The coefficient n!/(k₁!⋯kₘ!) = C(n,k₁)C(n−k₁,k₂)⋯ is the multinomial coefficient.
Setting all xᵢ=1: number of multinomial terms with n!/(k₁!⋯kₘ!) summed over all compositions → mⁿ (m choices for each of n factors).

**Vandermonde's identity:** C(m+n, r) = Σₖ C(m,k)C(n,r−k).
Combinatorial proof: choose r from m+n objects (m of one type, n of another); for each k, choose k from the m-type and r−k from the n-type.
Proof via generating functions: (1+x)^{m+n} = (1+x)^m(1+x)^n; compare coefficients of xʳ.

**Vandermonde's corollary:** C(2n,n) = Σₖ C(n,k)² (set m=n, r=n).

**Upper summation identity:** Σᵢ₌₀ⁿ C(i,r) = C(n+1, r+1).
(Hockey stick identity — the "hockey stick" shape in Pascal's triangle: diagonal strip from apex.)

**P49 checkpoint:**
- CORRECT → "Multinomial: (Σxᵢ)ⁿ = Σ [n!/Πkᵢ!]Πxᵢ^kᵢ. Vandermonde: C(m+n,r)=ΣC(m,k)C(n,r−k). Hockey stick: ΣC(i,r)=C(n+1,r+1)." → Gate (P91)
- PARTIAL (MC-1: binomial theorem only for integers) → "The GENERALISED binomial theorem works for any real α: (1+x)^α = Σₖ₌₀^∞ C(α,k)xᵏ, converging for |x|<1, where C(α,k) = α(α−1)⋯(α−k+1)/k! (still a finite product). This is used in analysis: (1+x)^{1/2} = 1 + x/2 − x²/8 + ⋯ gives √(1+x) as a power series. The discrete C(n,k)=n!/(k!(n−k)!) is the special case where α=n is a non-negative integer and the series terminates." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Find the term containing x² in the expansion of (2x + 3)⁵. Using (x+y)ⁿ form: x↔2x, y↔3. Term with (2x)² = k=2: T₃ = C(5,2)(2x)²(3)³ = 10·4x²·27 = 1080x². Answer: 1080x²." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 + MC-3 combined):**
Step 1 — "Pascal's identity PROOF from definition: C(n,k) = n!/(k!(n−k)!). C(n−1,k−1)+C(n−1,k) = (n−1)!/((k−1)!(n−k)!) + (n−1)!/(k!(n−1−k)!) = [n−1)!/(k!(n−k)!)]·[k + (n−k)] = (n−1)!·n/(k!(n−k)!) = n!/(k!(n−k)!) = C(n,k). ✓ Both proofs (algebraic and combinatorial) are valid; the combinatorial one explains WHY."
Step 2 — "Specific-term formula: in (x+y)ⁿ, the term with exponents (a,b) satisfying a+b=n is UNIQUELY determined by k=b (since a=n−b is forced). The coefficient is C(n,b). Write down k first, compute C(n,k), then write xⁿ⁻ᵏyᵏ. Practice: (3x−2y)⁶, term with y⁴: n=6, k=4, coefficient = C(6,4)·3²·(−2)⁴ = 15·9·16 = 2160, term = 2160x²y⁴."
Step 3 — "Why memorisation fails for identities: Σ(−1)ᵏC(n,k) = 0 seems mysterious until you see it as (1−1)ⁿ=0 from the binomial theorem. Σ k·C(n,k) = n·2ⁿ⁻¹ (differentiate (1+x)ⁿ at x=1). Each identity is a SUBSTITUTION into the theorem — once you know the theorem and a substitution trick, you can DERIVE each identity rather than memorise it."

**TB-R02 (MC-1 GENERALISED BINOMIAL):**
Step 1 — "The convergence condition: the generalised series (1+x)^α = Σ C(α,k)xᵏ converges absolutely for |x|<1 and conditionally at x=1 if α>−1. For x>1 the series diverges. Example: (1+0.1)^{0.5}≈1+0.05−0.00125+… converges to √1.1 ≈ 1.04881."
Step 2 — "Applications in analysis: Newton used the generalised binomial theorem to discover the binomial series before calculus had a formal foundation. (1−x²)^{1/2} = Σ C(1/2,k)(−x²)ᵏ gives the integrand of arcsin as a power series. (1+x)^{−1} = Σ(−x)ᵏ (geometric series) is the special case α=−1."
Step 3 — "Connection to the discrete case: for α=n ∈ {0,1,2,…}, C(n,k)=0 for k>n (since one factor in n(n−1)⋯(n−k+1) equals zero), so the infinite series terminates at k=n — recovering the finite binomial theorem. The generalised and discrete theorems are one theorem; the integer case just happens to terminate."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Expand (2x − 3y)⁴ using the binomial theorem. Write out all 5 terms with coefficients simplified.
2. Find the coefficient of x⁴y⁶ in the expansion of (3x + 2y)¹⁰.
3. Prove the identity: Σₖ₌₀ⁿ k·C(n,k) = n·2ⁿ⁻¹. (Hint: differentiate (1+x)ⁿ = Σ C(n,k)xᵏ and set x=1.)
4. Use Pascal's identity C(n,k)=C(n−1,k−1)+C(n−1,k) to prove the hockey stick identity Σᵢ₌ᵣⁿ C(i,r) = C(n+1,r+1) by induction on n.
5. Find the term independent of x in the expansion of (x + 1/x)⁸. (The term independent of x means the x-exponent is zero; find which k achieves this.)

**P55 — Reflect & Consolidate:** "(x+y)ⁿ = Σₖ C(n,k)xᵏyⁿ⁻ᵏ. Pascal's identity: C(n,k)=C(n−1,k−1)+C(n−1,k). Identities: sum=2ⁿ (x=y=1), alternating=0 (y=−1). Specific term: T_{k+1}=C(n,k)xⁿ⁻ᵏyᵏ. Multinomial: (Σxᵢ)ⁿ. Vandermonde: C(m+n,r)=ΣC(m,k)C(n,r−k)."

**P76 — Transfer Probe (Cross-link: math.alg.binomial-theorem):**
Algebra frames the binomial theorem as a polynomial identity and uses it for: (a) computing (a+b)ⁿ modulo a prime p — by Fermat's little theorem, (a+b)^p ≡ aᵖ+bᵖ (mod p) since C(p,k) ≡ 0 (mod p) for 0<k<p; explain why this implies the Frobenius endomorphism φ: a↦aᵖ is a ring homomorphism in characteristic p. (b) The binomial series and Newton's method: using (1+x)^{1/2} ≈ 1+x/2 from the generalised theorem, derive a one-step Newton update for √a: if x₀≈√a, then x₁=x₀/2+a/(2x₀) (Newton-Raphson for f(x)=x²−a). Explain how each Newton iteration doubles the number of correct digits. (c) Galois theory connection: the splitting field of xⁿ−1 over ℚ is ℚ(ζₙ) where ζₙ is a primitive n-th root of unity. The degree [ℚ(ζₙ):ℚ]=φ(n) (Euler's totient). How do the coefficients C(n,k) appear in the minimal polynomial (cyclotomic polynomial) of ζₙ for prime n?

**P75 — Mastery Assessment:**
"(a) Find the coefficient of x³ in (1+2x)⁷·(1−x)³ by expanding each factor using the binomial theorem and collecting the x³ terms. (b) Prove that for n≥1: Σₖ₌₀ⁿ C(n,k)² = C(2n,n). (Hint: use Vandermonde's identity with m=n, r=n, and C(n,k)=C(n,n−k).) (c) The middle binomial coefficient C(2n,n): show that C(2n,n) ∼ 4ⁿ/√(πn) using Stirling's approximation n! ≈ √(2πn)(n/e)ⁿ. (d) The multinomial coefficient C(9;3,3,3) = 9!/(3!3!3!) counts the number of ways to arrange 3 red, 3 green, 3 blue balls in a row. Compute this. How many such arrangements have at least one red ball before all green balls? (Hint: use complement or direct counting.)"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW Pascal's identity proof and the specific-term extraction formula
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.combinations; reassign

**P78 — Completion:** Binomial Theorem certified. Student expands (x+y)ⁿ using the binomial theorem; extracts specific terms without full expansion; derives combinatorial identities by substituting specific values; applies Pascal's identity both algebraically and combinatorially; and states the multinomial theorem.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.alg.binomial-theorem])
Target: Frobenius endomorphism in characteristic p; Newton-Raphson via binomial approximation; cyclotomic polynomials
Skill tested: Connect the discrete combinatorial binomial theorem to algebraic structures (ring homomorphisms, polynomial roots, Galois extensions)

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
