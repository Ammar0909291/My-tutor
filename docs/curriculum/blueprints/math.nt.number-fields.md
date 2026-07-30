# Blueprint: math.nt.number-fields

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.number-fields |
| name | Number Fields |
| Domain | math.nt |
| Difficulty | research |
| Bloom level | analyze |
| Estimated hours | 30 |
| Mastery threshold | 0.55 |
| MAMR | 3/5 |
| Prerequisites | math.nt.algebraic-integers, math.abst.field-extension |
| Cross-links | math.abst.galois-theory |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines a number field K as a finite-degree field extension of ℚ; constructs K=ℚ(α)≅ℚ[x]/(f) where f is the minimal polynomial of α over ℚ; identifies the degree [K:ℚ] as the degree of f; describes the ring of integers O_K as the ring of algebraic integers in K and identifies O_K for quadratic fields; defines the field discriminant disc(K) and explains its role in detecting ramified primes; classifies how rational primes split in O_K as split/inert/ramified; defines the Galois group Gal(K/ℚ) for Galois extensions (K/ℚ normal and separable); and states the fundamental theorem of Galois theory relating subfields of K to subgroups of Gal(K/ℚ).

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw the "Galois correspondence" diamond diagram for K=ℚ(√2,√3): at the top, K itself (degree 4 over ℚ); in the middle, three intermediate fields ℚ(√2), ℚ(√3), ℚ(√6) (each degree 2 over ℚ); at the bottom, ℚ; draw the same diamond upside-down for the Galois group Gal(K/ℚ)={id,σ,τ,στ}≅(ℤ/2ℤ)²: at the top, the whole group; in the middle, three order-2 subgroups {id,σ}, {id,τ}, {id,στ}; at the bottom, {id}; label the correspondence: each intermediate field ↔ the subgroup of Gal(K/ℚ) that fixes it; annotate with "degree of extension = index of corresponding subgroup")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | NUMBER-FIELDS-ARE-JUST-FIELDS | Student treats a number field as any abstract field, missing that the definition requires (1) a subfield of ℂ (or at least a finite extension of ℚ), (2) finite degree over ℚ; doesn't distinguish number fields from finite fields 𝔽_p or function fields | Type 3 — language contamination ("number field" and "field" share the word "field"; students already know fields abstractly from algebra; the specific constraint "finite extension of ℚ" and the embedding in ℂ are not foregrounded by the word; students conflate number fields with 𝔽_p or treat ℚ̄ as a number field, which it isn't — ℚ̄ is infinite-degree) |
| MC-2 | ALL-PRIMES-SPLIT-THE-SAME-WAY | Student assumes every rational prime p has the same splitting behaviour in O_K; doesn't know that splitting type depends on how f(x) (the defining polynomial) factors mod p; forgets the special case of ramification at discriminant primes | Type 1 — overgeneralisation (students correctly learn "p splits in ℤ[i] iff p≡1 mod 4" for the Gaussian integers; they overgeneralise to "there's one rule for all fields and all primes"; in reality, splitting type varies by field and by prime, and is computed from Kummer's theorem via factorisation of f mod p) |
| MC-3 | GALOIS-GROUP-EQUALS-CYCLIC-GROUP | Student assumes Gal(K/ℚ) is always cyclic or always ℤ/nℤ; unaware that Galois groups can be any group (S_n, A_n, dihedral groups, etc.) and that most degree-5+ polynomial splitting fields have Galois group S_5 or A_5 | Type 5 — instruction-induced (first examples taught are always quadratic (Gal≅ℤ/2ℤ), cyclotomic (Gal≅(ℤ/nℤ)× which is abelian), or specific cubic cases — all abelian or cyclic; the first non-abelian Galois group requires a degree-6 splitting field of a degree-3 polynomial with Galois group S₃, which appears later; students extrapolate the abelian pattern from first examples) |

## Component 4 — Session TA Cap
**Cap = 32** (hrs = 30 → cap 32)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Three equivalent pictures of a number field:**

| Representation | Content |
|---|---|
| Abstract algebraic | K is a field with ℚ⊆K and [K:ℚ]<∞ |
| Quotient ring | K≅ℚ[x]/(f) where f∈ℚ[x] is irreducible; degree [K:ℚ]=deg(f); element of K is represented by a polynomial of degree <deg(f) in the image of x |
| Explicit generated form | K=ℚ(α) where α is a root of f in ℂ; elements are ℚ-linear combinations {1,α,α²,…,α^{n-1}} for n=deg(f) |

**Examples:**
- ℚ(√2): f=x²−2; K≅ℚ[x]/(x²−2); elements a+b√2 (a,b∈ℚ); [K:ℚ]=2
- ℚ(i): f=x²+1; elements a+bi; [K:ℚ]=2
- ℚ(ζ₃) where ζ₃=e^{2πi/3}: f=x²+x+1; elements a+bζ₃; [K:ℚ]=2
- ℚ(2^{1/3}): f=x³−2; elements a+b·2^{1/3}+c·2^{2/3}; [K:ℚ]=3 (NOT a Galois extension: does not contain ζ₃·2^{1/3}, the other complex cube root)
- ℚ(ζ₅)=ℚ(e^{2πi/5}): f=x⁴+x³+x²+x+1; [K:ℚ]=4; Gal(K/ℚ)≅(ℤ/5ℤ)×≅ℤ/4ℤ

**Key distinctions:**
- NOT a number field: 𝔽_p (characteristic p>0, not a ℚ-extension), ℝ, ℂ (infinite degree over ℚ), ℚ̄ (algebraic closure, infinite degree)
- IS a number field: any ℚ(α) for algebraic α (degree = deg of minimal polynomial of α over ℚ)

**P49 checkpoint:**
- CORRECT → "[K:ℚ] = degree of minimal polynomial. Three equivalent pictures. Degree 2 examples: ℚ(√D). Non-Galois example: ℚ(2^{1/3}) — degree 3 but doesn't contain all roots of x³−2." → A02
- PARTIAL (doesn't understand quotient ring picture) → "ℚ[x]/(f) means: take all polynomials with rational coefficients, and declare that f(x)=0. So if f=x²−2, we get x²=2 in this ring. Any polynomial g(x) reduces modulo f: e.g. x³+1=x·x²+1=x·2+1=2x+1 (using x²=2). The resulting ring has elements of the form a+bx with a,b∈ℚ, where x is 'a square root of 2'. This is exactly ℚ(√2)." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Is ℝ a number field? (Does it have finite degree over ℚ?) Is ℚ(√2,√3) a number field? What is its degree over ℚ?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**The ring of integers O_K and prime splitting:**

**O_K for quadratic fields** (summary, already studied):
- ℚ(√D): O_K=ℤ[√D] if D≡2,3(mod 4); O_K=ℤ[(1+√D)/2] if D≡1(mod 4)
- disc(K)=4D if D≡2,3(mod 4); disc(K)=D if D≡1(mod 4)

**How primes split in O_K** (Kummer's theorem for O_K=ℤ[α], p∤disc(K)):
Factor f mod p: f(x)≡g₁(x)^{e₁}⋯g_r(x)^{e_r} (mod p) with gᵢ distinct irreducible mod p.
Then (p)=P₁^{e₁}⋯P_r^{e_r} in O_K where Pᵢ=(p,gᵢ(α)) (as ideals of O_K).
- **Splits completely:** r=[K:ℚ], all eᵢ=1, all deg(gᵢ)=1 — "p splits"
- **Inert:** r=1, e₁=1, deg(g₁)=[K:ℚ] — "p stays prime"
- **Ramified:** some eᵢ>1 — "p ramifies"; ramification occurs precisely when p|disc(K)
- **Partial split:** r>1 but deg(gᵢ)>1 for some i — mixed splitting

**Quadratic field examples** (K=ℚ(√D), f=x²−D, checking (D/p) = Legendre symbol):
- p splits (p≡1 mod 4 in ℚ(i), or (D/p)=1): (p)=P·P̄, two distinct prime ideals
- p inert ((D/p)=−1): (p) remains prime in O_K
- p ramifies (p|disc(K), i.e. p|D or p=2 when D≡2,3 mod 4): (p)=P²

**Concrete example** (ℚ(√5), D=5, disc=5):
- p=5: ramifies. (5)=(√5)². 
- p=11: (5/11)=(5·11^{(-1)} mod 11)... Legendre symbol (5/11): 5^5=3125≡3125−284·11=3125−3124=1 mod 11. (5/11)=1. Splits: 11=split (11 splits in ℤ[(1+√5)/2]).
- p=3: (5/3)=(2/3)=−1. Inert. (3) stays prime.
- p=2: disc=5, 2∤5. f=x²−5≡x²+1≡(x+1)² mod 2. Ramifies? Actually p=2 divides disc of ℤ[√5]=4·5=20, but disc(K)=5. So 2 does not divide disc(K)=5. f=x²−5≡x²−1=(x−1)(x+1) mod 2. Splits! (2)=P·P̄ where P=(2,(√5−1)/2)... Actually ℤ[(1+√5)/2] is the ring of integers, so we apply Kummer with g(x)=x²−x−1 (the minimal polynomial of (1+√5)/2). g≡x²+x+1 mod 2 (irreducible over 𝔽₂). So 2 is INERT.

**P49 checkpoint:**
- CORRECT → "Kummer's theorem: factor f mod p, degree patterns give splitting type. Ramification ↔ p|disc(K). Quadratic fields: Legendre symbol determines split/inert/ramify. Know examples with p=2,3,5,7 in ℚ(√5)." → A03
- PARTIAL (doesn't connect discriminant to ramification) → "A prime p ramifies in K iff p divides the field discriminant disc(K). This is why disc(K) is so important — it encodes exactly which primes behave 'badly' (gain squared factors in their ideal factorisation). For K=ℚ(√D) with D square-free: disc=D if D≡1(mod 4), disc=4D otherwise. So the primes that ramify in ℚ(√5) are exactly the prime divisors of 5, namely p=5 only. In ℚ(√6): disc=4·6=24, so p=2 and p=3 both ramify." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "In ℚ(i) with O_K=ℤ[i]: the defining polynomial is f=x²+1. Factor f mod p: (a) f mod 5 = (x−2)(x+2) over 𝔽₅ (since 2²=4≡−1). So 5 splits: (5)=(2+i)(2−i) in ℤ[i]. (b) f mod 3 = x²+1 (irreducible over 𝔽₃). So 3 is inert. (c) f mod 2 = (x+1)² over 𝔽₂. So 2 ramifies: (2)=(1+i)²(−i) in ℤ[i]. What is the discriminant of ℚ(i)? Is 2 a divisor of disc(ℚ(i))?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Prime-splitting gate:**

**Gate question (MC-2):** "A student claims: 'If a prime p splits in ℚ(√2), then it also splits in ℚ(√3) and in ℚ(√6), since all three are degree-2 number fields with the same structure.' Identify the specific error."

The error: splitting type is field-specific and depends on the Legendre symbol (D/p), which differs by D. For the three fields:
- p splits in ℚ(√2) iff (2/p)=1 iff p≡±1(mod 8)
- p splits in ℚ(√3) iff (3/p)=1 iff p≡±1(mod 12)
- p splits in ℚ(√6) iff (6/p)=1 iff (2/p)(3/p)=1

These are different conditions! Example: p=7.
- (2/7)=1 (since 7≡±1 mod 8? 7≡−1 mod 8. Yes.) So 7 splits in ℚ(√2).
- (3/7)=(7/3)(−1)^{(3−1)(7−1)/4}=(1/3)(−1)³=1·(−1)=−1. So 7 is INERT in ℚ(√3).
- (6/7)=(2/7)(3/7)=1·(−1)=−1. So 7 is INERT in ℚ(√6).

So p=7 splits in ℚ(√2) but is inert in ℚ(√3) and ℚ(√6). Three degree-2 fields, three different splitting behaviours for the same prime.

**P49 checkpoint:**
- CORRECT → "Splitting depends on the specific field, not just the degree. Legendre symbol (D/p) determines splitting in ℚ(√D). Three quadratic fields can have three different splitting behaviours for the same prime." → Gate (P91)
- PARTIAL → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "For p=7: compute x²−2 mod 7. Does it have roots mod 7? (Find x with x²≡2 mod 7: try x=3: 9≡2. Yes! So 7 splits in ℚ(√2).) Now compute x²−3 mod 7. Try x=1: 1−3=−2. x=2: 4−3=1. x=3: 9−3=6. x=4: 16−3=13≡6. x=5: 25−3=22≡1. x=6: 36−3=33≡5. No root, so 7 is INERT in ℚ(√3). Same prime, different fields, different behaviour." → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 NUMBER-FIELDS-ARE-JUST-FIELDS):**
Step 1 — "A number field is not just any field — it is a field K with ℚ⊆K AND [K:ℚ]<∞. The key restrictions: (1) characteristic 0 (since ℚ has characteristic 0 and K contains ℚ); (2) finite dimension as a ℚ-vector space. Fields that are NOT number fields: 𝔽_p (characteristic p, no ℚ); ℝ (contains ℚ but [ℝ:ℚ] is infinite); ℂ (same); ℚ̄ (algebraic closure, infinite degree because [ℚ(2^{1/n}):ℚ]=n → ∞ as n→∞)."
Step 2 — "Every number field is of the form ℚ(α) for some algebraic α. (This is the primitive element theorem applied over ℚ.) The degree [K:ℚ] equals the degree of the minimal polynomial of α over ℚ. Every element of K=ℚ(α) is a ℚ-linear combination of 1,α,α²,…,α^{n-1} (an n-dimensional ℚ-vector space)."
Step 3 — "Why restrict to finite extensions of ℚ specifically? Because these extensions have the richest structure: unique ideal factorisation in O_K (Dedekind domains), finite class numbers, controlled unit groups (Dirichlet's unit theorem), and a deep connection to L-functions and automorphic representations. Infinite extensions or positive-characteristic fields have fundamentally different behaviour."

**TB-R02 (MC-2 ALL-PRIMES-SPLIT-THE-SAME-WAY):**
Step 1 — "Splitting type is computed from Kummer's theorem: factor the DEFINING POLYNOMIAL f(x) of the generator of K modulo p (when p∤disc(K)). The splitting of f mod p directly encodes the splitting of p in O_K. Different fields have different defining polynomials, so the same prime can split differently in each."
Step 2 — "More precisely: for K=ℚ(√D), the minimal polynomial is f=x²−D. Modulo p: x²≡D(mod p) has solutions iff D is a quadratic residue mod p, iff the Legendre symbol (D/p)=1. This symbol depends on BOTH D and p. So the splitting law in ℚ(√D) depends on D — change D, change the law."
Step 3 — "Quadratic reciprocity is the theorem that makes (D/p) computable in terms of (p/D). It reveals that the splitting of p in ℚ(√D) depends only on p mod (4D) (when D is odd and square-free). This is the first case of 'class field theory': the splitting of primes in an abelian extension is controlled by congruence conditions on p."

**TB-R03 (MC-3 GALOIS-GROUP-EQUALS-CYCLIC-GROUP):**
Step 1 — "Galois groups can be any finite group. The degree of K/ℚ gives an UPPER BOUND on |Gal(K/ℚ)| (equal when the extension is Galois). Examples by group type: ℤ/2ℤ: ℚ(√2)/ℚ; ℤ/3ℤ: ℚ(ζ₇+ζ₇⁻¹)/ℚ (unique cubic subfield of ℚ(ζ₇)); S₃: splitting field of x³−2 over ℚ (degree 6); ℤ/4ℤ: ℚ(ζ₅)/ℚ; (ℤ/2ℤ)²: ℚ(√2,√3)/ℚ; A₄: splitting field of x⁴−x−1; S₄: splitting field of 'generic' degree-4 polynomial."
Step 2 — "Why are first examples always abelian? Because abelian extensions of ℚ are all contained in cyclotomic fields ℚ(ζ_n) (Kronecker-Weber theorem), and cyclotomic fields are the most natural explicit examples. The smallest non-abelian Galois group is S₃ (order 6); it appears as the Galois group of the splitting field of x³−2, which has degree 6 over ℚ, with intermediate subfields ℚ(2^{1/3}) (not Galois, Gal is undefined) and ℚ(√−3) (Galois, degree 2)."
Step 3 — "Inverse Galois problem (open for 100+ years): is every finite group the Galois group of some extension of ℚ? Known YES for: all abelian groups (Kronecker-Weber), all symmetric groups Sₙ (Hilbert's theorem), A₅ (Klein), sporadically many simple groups. Not known in general — this is among the deepest open problems in number theory."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. For K=ℚ(∛2) (cube root of 2): (a) What is [K:ℚ]? (b) Is K/ℚ Galois? (Justify: does K contain all roots of x³−2 over ℚ?) (c) What is the splitting field L of x³−2 over ℚ? What is [L:ℚ]? (d) What is Gal(L/ℚ)? (Hint: L=ℚ(∛2,ω) where ω=e^{2πi/3}. The automorphisms send ∛2 to its other roots and fix or permute ω.)
2. Determine how p=7 splits in the ring of integers of K=ℚ(√−3). (First identify O_K: is disc(K)=−3 or −12? What is the minimal polynomial of (1+√−3)/2=ζ₃? Then factor the minimal polynomial of the generator of O_K modulo 7.)
3. Let K=ℚ(ζ₇) where ζ₇=e^{2πi/7}. Then [K:ℚ]=6 and Gal(K/ℚ)≅(ℤ/7ℤ)×≅ℤ/6ℤ (cyclic of order 6). List all subgroups of Gal(K/ℚ) and their corresponding fixed subfields (intermediate extensions of ℚ). What are the degrees of these subfields over ℚ?
4. State the Chebotarev Density Theorem and apply it to K=ℚ(√5): (a) What fraction of primes split completely in K? (b) What fraction are inert? (c) What fraction ramify? (Use the fact that Gal(K/ℚ)≅ℤ/2ℤ and that "splits completely" corresponds to the identity element.)

**P55 — Reflect & Consolidate:** "Number field: finite extension of ℚ. Degree = dimension as ℚ-vector space. O_K: ring of algebraic integers. Discriminant: encodes ramified primes. Prime splitting: factor defining polynomial mod p (Kummer). Galois group: can be any finite group. Fundamental theorem: subfield ↔ subgroup (inclusion-reversing). Chebotarev: density of splitting primes = fraction of identity-class conjugacy class in Gal(K/ℚ)."

**P76 — Transfer Probe (Cross-link mode: math.abst.galois-theory):**
(a) The Langlands program: a non-abelian generalisation of class field theory. For abelian extensions of ℚ, class field theory (Kronecker-Weber) says the splitting of p in K depends only on p mod n for some n. For non-abelian extensions, the "generalised reciprocity law" would say the splitting of p depends on the trace of the Frobenius element Frob_p in a representation ρ: Gal(K̄/ℚ)→GL_n(ℂ). The Langlands program conjectures that all such representations arise from automorphic forms (L-functions of modular forms, Hecke eigenvalues). Wiles' proof of Fermat's Last Theorem completed a key case: the Galois representation attached to an elliptic curve over ℚ corresponds to a modular form. Explain in your own words: why is "Galois representation corresponds to a modular form" a generalisation of "prime splitting in K depends on p mod n"? (b) For K=ℚ(√5) and the Legendre symbol (5/p): quadratic reciprocity says (5/p)=(p/5) when p≢5 mod 4... actually (5/p)(p/5)=(−1)^{(5−1)(p−1)/4}=(−1)^{p−1}=1 (since p odd). So (5/p)=(p/5). The primes p with (5/p)=1 are exactly the primes p≡±1 mod 5. This is the "explicit reciprocity law" for ℚ(√5). What is the analogous explicit law for ℚ(ζ₅)? (Hint: how does p split in ℚ(ζ₅)? Answer: p splits completely iff p≡1 mod 5.) (c) Artin's reciprocity law: for a Galois extension K/ℚ with abelian Galois group G, there is a surjective homomorphism (ℤ/nℤ)×→G (for appropriate n) such that the Frobenius element Frob_p maps to the class [p mod n]. This generalises both quadratic reciprocity and the Kronecker-Weber theorem. For K=ℚ(i): G=ℤ/2ℤ, and the map (ℤ/4ℤ)×→G sends p≡1(mod 4) to identity (splits), p≡3(mod 4) to the non-trivial element (stays prime). Verify this for p=5 (splits in ℤ[i] since 5=(2+i)(2−i)) and p=3 (inert since (−1/3)=−1).

**P55 — Reflect & Consolidate:** "Class field theory and Galois theory are inseparable at the advanced level. Artin reciprocity: splitting of primes in abelian extensions determined by congruence conditions (generalises every classical reciprocity law). Langlands program: non-abelian case, connects Galois representations to automorphic forms — the deepest open territory in modern number theory, the proof of Fermat's Last Theorem being one completed chapter."

**P75 — Mastery Assessment:**
"(a) Classify the splitting of p=11 in (i) ℚ(√−1)=ℚ(i), (ii) ℚ(√2), (iii) ℚ(√11). Show work using Legendre symbols or direct computation. (b) For the splitting field K of x³−2 over ℚ: [K:ℚ]=6, Gal(K/ℚ)≅S₃. The subgroup lattice of S₃ has: S₃ itself; three order-2 subgroups ⟨(12)⟩,⟨(13)⟩,⟨(23)⟩; one order-3 subgroup A₃=⟨(123)⟩; and {e}. By the fundamental theorem of Galois theory, list the six intermediate fields (subfields of K containing ℚ). What are their degrees over ℚ? (c) Dedekind's theorem: if f(x)=x³−2 and p=5, factor f mod 5. Use this to determine how 5 splits in ℤ[2^{1/3}]. (Note: ℤ[2^{1/3}] may not be the full ring of integers of ℚ(2^{1/3}); but for p∤disc(ℤ[2^{1/3}]) Kummer's theorem still applies.)"

**P55 — Reflect & Consolidate:** "Number fields unify arithmetic and geometry: prime splitting in K↔factorisation in O_K↔ramification in a covering of Spec(ℤ) (the 'arithmetic curve'). This geometric picture — due to Grothendieck — makes étale fundamental groups the arithmetic analogue of Galois groups, and is the language of modern arithmetic geometry and the Langlands program."

**P74 — Routing Decision:**
- Score ≥ 3/5 → MASTERED; math.nt.number-fields complete
- Score 2/5 → REVIEW prime splitting and Galois group structure; replay A02
- Score ≤ 1/5 → PREREQUISITE GAP in math.nt.algebraic-integers or math.abst.field-extension; reassign

**P78 — Completion:** Number Fields certified. Student defines number fields and their degrees; identifies rings of integers; computes discriminants; classifies prime splitting via Kummer's theorem; describes Galois groups and the Galois correspondence; connects to class field theory and the Langlands program.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.abst.galois-theory])
Target: Artin reciprocity; Langlands program; Frobenius elements; arithmetic geometry perspective
Skill tested: Connect prime splitting to Galois theory; recognise classical reciprocity laws as special cases of Artin reciprocity

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
