<!-- BLUEPRINT: math.abst.field -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Field
**Concept ID:** `math.abst.field`
**KG Fields:** difficulty=advanced | bloom=understand | estimated_hours=4 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.abst.field |
| name | Field |
| difficulty | advanced |
| bloom | understand |
| estimated_hours | 4 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.abst.ring-theory, math.abst.prime-ideal |
| cross_links | math.linalg.vector-space (Tier 1) |
| P76_mode | cross-link probe |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.abst.ring-theory**: ring axioms (addition + multiplication, distributivity); commutative rings; units (invertible elements); zero divisors; integral domains (commutative, no zero divisors)
- **math.abst.prime-ideal**: maximal ideal M iff R/M is a field; ⟨p⟩ maximal in ℤ iff p is prime → ℤ/⟨p⟩=ℤₚ is a field; chain of ideals; quotient ring structure

### Target Knowledge State
Student can state the field definition (commutative ring where every nonzero element is invertible); recognise the standard fields (ℚ, ℝ, ℂ, ℤₚ for prime p); verify a given ring is or is not a field by checking the nonzero-invertibility condition; state the characteristic of a field (0 or prime); explain why the scalar domain of a vector space must be a field; and distinguish fields from integral domains and arbitrary commutative rings by counterexample.

### Conceptual Obstacles
1. Trying to invert 0 — the axiom "every nonzero element has a multiplicative inverse" explicitly excludes 0; attempting 0⁻¹ produces contradiction (0·a=0≠1 for any a); the exclusion is definitional, not a gap
2. Treating ℤ as a field — ℤ is a commutative ring and an integral domain with no zero divisors, but 2 has no multiplicative inverse in ℤ (2·a=1 requires a=1/2∉ℤ); being an integral domain is necessary but not sufficient for a field
3. Equating "characteristic p" with "the field has p elements" — ℤₚ does have p elements, but ℚ has char 0 and infinitely many elements; GF(p²) has characteristic p and p² elements; characteristic counts how many times 1 must be added to reach 0, not how many elements exist

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | ZERO-INVERSE | Student attempts to define 0⁻¹ or claims 0 must be invertible for the ring to be a field; confuses "every element invertible" with "every nonzero element invertible" | Any discussion of the field axioms; especially when the student lists "every element has an inverse" without the qualifier |
| MC-2 | RING-NOT-FIELD | Student identifies ℤ or another integral domain as a field because "multiplication exists and there are no zero divisors"; cannot explain the missing inverses | Integral domain vs. field comparison; examples like ℤ, ℤ[x] |
| MC-3 | CHARACTERISTIC-CONFUSION | Student equates characteristic p with "the field has p elements"; unaware that char p means 1+1+⋯+1 (p times)=0, not a cardinality statement | Any discussion of ℤₚ, GF(p²), or the characteristic of ℚ/ℝ/ℂ |

**Foundational Misconception:** MC-1 (ZERO-INVERSE) — the nonzero qualifier is the definitional distinction between a field and "every element is a unit"; missing it invalidates every field-verification argument and underlies confusion about why 0 is always excluded.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner compares ℤ and ℚ on specific division failures before seeing the abstract axiom; the concrete failure (3/2∉ℤ) motivates the invertibility requirement.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: ℤ vs ℚ side by side — 2·(1/2)=1 in ℚ but 1/2∉ℤ; division by any nonzero number always works in ℚ; P: comparison table of ring types; A: field axioms (commutative ring + every nonzero element has a multiplicative inverse), standard examples
2. **A02 P06 CONTRAST PAIR** — field vs. integral domain vs. commutative ring; ℤₚ vs ℤₙ (n composite); characteristic of a field; vector-space scalar requirement
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — From Division Failure to the Field Definition

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground the invertibility axiom in arithmetic failure (ℤ) vs. arithmetic success (ℚ); make the "nonzero" qualifier structurally visible; establish the canonical field examples

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (ℤ vs ℚ on division):**

In ℤ (integers): is there an element a with 2·a = 1?

- 2·0=0, 2·1=2, 2·(−1)=−2, … No integer satisfies 2a=1.
- Therefore 2 has no multiplicative inverse in ℤ.

In ℚ (rationals): 2·(1/2)=1. So 2 is invertible in ℚ. In fact, every nonzero rational n/m has inverse m/n∈ℚ.

Concrete verdict:
- ℤ: division by 2 fails (2−1∉ℤ). **Not a field.**
- ℚ: division by any nonzero element works. **Is a field.**

The distinguishing property is that ℚ has a multiplicative inverse for every nonzero element.

**Stage P — Pictorial (ring classification table):**

| Structure | Examples | Commutative | No zero div. | Every nonzero invertible |
|-----------|----------|-------------|--------------|--------------------------|
| Ring | ℤ₆, Mat₂(ℝ) | ✗ (in general) | ✗ | ✗ |
| Commutative ring | ℤ₆, ℤ | ✓ | ✗ | ✗ |
| Integral domain | ℤ, ℤ[x], ℝ[x] | ✓ | ✓ | ✗ |
| Field | ℚ, ℝ, ℂ, ℤ₅ | ✓ | ✓ | ✓ |

Reading the table: each row adds one property. A field is an integral domain with the additional property that every nonzero element is invertible.

**Stage A — Abstract (field axioms and examples):**

**Definition:** A **field** is a commutative ring F in which every nonzero element has a multiplicative inverse:
$$\forall\, a \in F,\; a \neq 0 \implies \exists\, a^{-1} \in F \text{ such that } a \cdot a^{-1} = 1$$

Note: 0 is excluded. 0 has no inverse in any field (0·a=0≠1 for any a) — this is a theorem, not an additional axiom.

**Standard fields:**
- ℚ (rationals), ℝ (reals), ℂ (complex numbers) — all have characteristic 0 (1+1+⋯+1 never equals 0)
- ℤₚ for any prime p — finite field of order p, characteristic p
- GF(pⁿ) (Galois fields) — finite field of order pⁿ, characteristic p (existence guaranteed by Galois theory)

**Non-field integral domains:** ℤ, ℤ[x], ℝ[x] — all lack inverses for non-unit elements.

**Characterisation via prime ideals:** By the maximal ideal criterion (ADR prime-ideal): F is a field iff F ≅ R/M for some ring R and maximal ideal M. Equivalently, the only ideals of a field F are {0} and F itself — no proper nonzero ideals exist.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Is ℤ₁₀ a field? Is ℤ₇ a field? Explain using the invertibility criterion.

**CORRECT:** ℤ₁₀: 2 has no inverse (2·a≡1 mod 10 has no solution since gcd(2,10)=2≠1). Not a field. ℤ₇: 7 is prime, so every nonzero element a has gcd(a,7)=1, hence an inverse exists (Bezout). Is a field.
→ "Correct. In ℤₙ, an element a is invertible iff gcd(a,n)=1. ℤₙ is a field iff every nonzero element satisfies this iff n is prime." → Proceed to A02.

**PARTIAL:** Student correctly classifies but cannot explain (just "7 is prime → field").
→ "Right answer — let me add the mechanism: in ℤ₇, every nonzero element a satisfies gcd(a,7)=1 (since 7 is prime). By Bezout's theorem, there exist integers x,y with ax+7y=1, so ax≡1 (mod 7), meaning x=a⁻¹ in ℤ₇. That's the invertibility axiom."

**INCORRECT:** Student says ℤ₁₀ is a field (MC-2 pattern — "no zero divisors in ℤ₁₀"?).
→ "Check: in ℤ₁₀, does 2 have an inverse? You need 2a≡1 mod 10. Try a=1,2,…,9: 2·1=2, 2·2=4, 2·3=6, 2·4=8, 2·5=10≡0, 2·6=12≡2, 2·7=14≡4, 2·8=16≡6, 2·9=18≡8. None equal 1. Also: 2·5=10≡0 — there are zero divisors. ℤ₁₀ is neither an integral domain nor a field."

**NO_RESPONSE:** → "Test ℤ₇ first. Try to find a⁻¹ for a=3 in ℤ₇: need 3a≡1 mod 7. Try a=5: 3·5=15=14+1≡1 mod 7 ✓. So 3⁻¹=5 in ℤ₇. In general, when n is prime, every nonzero element is invertible → field. When n=10: try 2a≡1 mod 10 — no solution since 2 and 10 share factor 2."

---

### Teaching Action A02 — Contrast: Field vs Ring vs Integral Domain; Characteristic; Vector Spaces

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Sharpen the field/non-field boundary; address MC-2 (integral domain not field) and MC-3 (characteristic); connect fields to vector spaces as the cross-link topic

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Field vs integral domain (MC-2):**

| Property | ℤ (integral domain) | ℚ (field) |
|----------|---------------------|-----------|
| Commutative ring | ✓ | ✓ |
| No zero divisors | ✓ | ✓ |
| Every nonzero element invertible | ✗ (2−1∉ℤ) | ✓ |
| **Field?** | **No** | **Yes** |

Key: integral domain + every nonzero element invertible = field. ℤ satisfies the first two conditions but not the third.

**Contrast 2 — ℤₚ (field) vs ℤₙ (composite, not field):**

ℤ₅: 1⁻¹=1, 2⁻¹=3 (2·3=6≡1), 3⁻¹=2, 4⁻¹=4 (4·4=16≡1). All nonzero elements invertible. **Field.**

ℤ₆: 2 has no inverse (2·a=1 mod 6 has no solution); also 2·3=6≡0 — zero divisors. **Not a field (not even an integral domain).**

**Contrast 3 — Characteristic (MC-3):**

The **characteristic** of a field F is the smallest n>0 such that 1+1+⋯+1 (n times)=0, or 0 if no such n exists.

| Field | Char | No. of elements |
|-------|------|----------------|
| ℚ | 0 | ∞ |
| ℝ | 0 | uncountably ∞ |
| ℂ | 0 | uncountably ∞ |
| ℤ₅ | 5 | 5 |
| GF(4) | 2 | 4 |

Characteristic and cardinality are independent: char 0 fields can be infinite (ℚ, ℝ) or... (in fact, all char 0 fields are infinite — they contain ℚ as a subfield). Char p fields can have pⁿ elements for any n≥1. Characteristic p ≠ "field has p elements."

**Contrast 4 — Why vector spaces need a field (cross-link to math.linalg.vector-space):**

A vector space over F requires scalar multiplication λ·v for λ∈F and v∈V. The axiom (λμ)·v=λ·(μ·v) requires associativity in F. More critically, the axiom 1·v=v requires a multiplicative identity, and the ability to "divide by scalars" (solve λ·v=w for v when λ≠0) requires λ⁻¹∈F. If F were merely a ring with non-invertible elements, certain scalar equations would have no solution, breaking the vector space structure.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Give one example of a field and one example of a commutative ring that is an integral domain but not a field. Explain what property the integral domain lacks.

**CORRECT:** Field: ℝ (or ℚ, ℤ₅). Integral domain: ℤ (or ℝ[x], or ℤ[√2]). Missing property: ℤ lacks a multiplicative inverse for 2 (and all non-±1 elements) — these are non-units that are not zero divisors, so ℤ is not a field.
→ "Correct. ℝ[x] is another excellent example: x has no inverse in ℝ[x] (deg(x·f)≥1, so x·f≠1 for any polynomial f)." → Proceed to A03.

**PARTIAL:** Student gives examples but says the domain "lacks zero divisors" as the missing property (confuses field vs. integral domain test).
→ "The missing property is invertibility, not zero divisors. An integral domain already has no zero divisors — that's what makes it an integral domain. The extra step to field is: every nonzero element must have a multiplicative inverse. ℤ has no zero divisors but 2 has no inverse."

**INCORRECT:** Student names ℤ₆ as an integral domain (MC-2 confusion — ℤ₆ has zero divisors).
→ "ℤ₆ is not an integral domain: 2·3=6≡0 mod 6, so 2 and 3 are zero divisors. Try ℤ instead: 5·7=35≠0 in ℤ (no zero divisors), but 2 has no inverse (2a=1 has no integer solution). So ℤ is an integral domain but not a field."

**NO_RESPONSE:** → "Consider arithmetic in ℚ vs ℤ. ℚ: divide 3 by 7 → 3/7∈ℚ (has inverse). ℤ: 2 has no inverse (2·a=1 → a=1/2∉ℤ). ℤ is an integral domain (no zero divisors) but not a field (2 not invertible). ℚ is a field."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess fluent classification and understanding of fields, including the cross-link to vector spaces

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Is ℤ₄ a field? Give a specific non-invertible nonzero element.

*Solution:* ℤ₄ is not a field. The element 2 has no inverse: 2·1=2, 2·2=4≡0, 2·3=6≡2. No product equals 1. (Also: 2·2=0 in ℤ₄ — zero divisor, so not even integral domain.)

**Problem 2:** Is ℝ a field? Is ℝ[x] a field?

*Solution:* ℝ is a field (every nonzero real a has inverse 1/a∈ℝ). ℝ[x] is NOT a field: the polynomial x has no inverse in ℝ[x] (x·f(x) has degree ≥ 1 for f≠0, so x·f≠1).

**Problem 3:** What is the characteristic of ℤ₇? Of ℤ? Explain.

*Solution:* char(ℤ₇)=7: in ℤ₇, 1+1+⋯+1 (7 times)=7≡0, and no smaller sum equals 0. char(ℤ)=0: no finite sum of 1s ever equals 0 in ℤ.

**Problem 4:** True or false: every integral domain is a field.

*Solution:* **False.** ℤ is an integral domain (no zero divisors, commutative) but 2 has no multiplicative inverse in ℤ. (A finite integral domain IS a field — but infinite ones need not be.)

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: cross-link probe — math.linalg.vector-space)*

**Prompt:** Every vector space V over ℝ uses the real numbers as scalars — and ℝ is a field.

(a) Which specific field property of ℝ ensures that for any nonzero scalar λ∈ℝ and any vector v∈V, the equation λ·w=v has a unique solution w∈V?

(b) Suppose we tried to define a "vector space over ℤ" (using integers as scalars). Show by example that scalar division can fail: give specific integer λ≠0 and a specific "vector" v∈ℤ² such that λ·w=v has no solution w∈ℤ².

(c) What field axiom is violated by ℤ, and why does this make ℤ unsuitable as a scalar domain?

**Expected solution:**

(a) The field axiom "every nonzero element has a multiplicative inverse": since λ≠0 in ℝ, λ⁻¹=1/λ∈ℝ exists. Setting w=λ⁻¹·v gives λ·w=λ·(λ⁻¹·v)=(λλ⁻¹)·v=1·v=v. Uniqueness: if λ·w₁=v=λ·w₂, then λ⁻¹·(λ·w₁)=λ⁻¹·(λ·w₂), so w₁=w₂.

(b) Take λ=2 and v=(1,0)∈ℤ². The equation 2·w=v means 2·(w₁,w₂)=(1,0), so w₁=1/2∉ℤ. No solution exists in ℤ².

(c) ℤ violates the invertibility axiom: 2∈ℤ, 2≠0, but 2⁻¹=1/2∉ℤ. Without inverses for all nonzero scalars, scaling cannot always be reversed, and the vector-space axiom "for each v∈V and λ≠0, the equation λ·w=v has a unique solution" fails.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.85 × 5⌉ = ⌈4.25⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.abst.field-extension; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.abst.field assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — ZERO-INVERSE (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"A specific error: stating 'every element of a field has a multiplicative inverse' without the word 'nonzero.' This is ZERO-INVERSE. In any ring, 0·a=0 for all a — no element a can satisfy 0·a=1. The definition's nonzero qualifier is not optional."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "State the field definition in your own words."
- MC-1 response: "Every element has an inverse."
- Correct: "Every nonzero element has an inverse."

**[P64 — CONCEPTUAL SHIFT]**
"Proof that 0 can never have an inverse: suppose 0·a=1 for some a. Then 0=0·a=1. But 1≠0 in any non-trivial ring. Contradiction. So 0⁻¹ does not exist by a theorem — the definition correctly excludes 0 to avoid this. Field axiom: every element a with a≠0 has an inverse."

Practice: Restate the field definition writing "a≠0" explicitly before the ∃a⁻¹ clause.

---

### Repair Action B02 — RING-NOT-FIELD (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Classifying an integral domain (like ℤ) as a field is the RING-NOT-FIELD error. An integral domain has no zero divisors but may still lack multiplicative inverses for non-unit elements."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is ℤ a field? Why or why not?"
- MC-2 response: "Yes, because it has no zero divisors."

**[P64 — CONCEPTUAL SHIFT]**
"No zero divisors is the integral domain condition, not the field condition. Fields require every nonzero element to have an inverse. In ℤ: does 2 have an inverse? Need 2·a=1, so a=1/2. But 1/2∉ℤ. ℤ fails the field test. Upgrade path: ℤ → field of fractions ℚ (adjoin all a/b, b≠0) — that's why ℚ is a field."

Practice: For each of {ℤ, ℤ[x], ℝ, ℤ₁₁}, determine field/non-field. Name a specific non-invertible nonzero element for any non-field.

---

### Repair Action B03 — CHARACTERISTIC-CONFUSION (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Equating 'characteristic p' with 'the field has p elements' is CHARACTERISTIC-CONFUSION. Characteristic is an additive order question, not a cardinality statement."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is the characteristic of ℚ?"
- MC-3 response: "ℚ is infinite, so no characteristic" or "characteristic = ∞."

**[P64 — CONCEPTUAL SHIFT]**
"Characteristic 0 means no finite sum of 1s ever equals 0 — not that the field is finite or that char=∞. ℚ has char 0. GF(4) has char 2 and 4 elements. ℤ₅ has char 5 and 5 elements. The formula: char F = smallest n with n·1=0, or 0 if none. Char is always 0 or prime (theorem: char p → p is prime)."

Practice: Compute char of GF(9) (char=3; GF(9) has 9=3² elements). Confirm char≠element-count.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Classify: ℤ₁₃, ℤ[i] (Gaussian integers), ℝ[x] — field or not? Explain each using invertibility criterion |
| SR-2 | +3 days | State from memory: field definition, three examples of char-0 fields, two finite fields; explain why char must be 0 or prime |
| SR-3 | +7 days | Explain why a vector space needs its scalar domain to be a field (invertibility for unique scalar division) |
| SR-4 | +14 days | Prove: a finite integral domain is a field (for each nonzero a, the map x↦ax is injective on a finite set, hence surjective, so 1 is in the image) |

Retrieval flag: any reappearance of ZERO-INVERSE (no "nonzero" qualifier) or RING-NOT-FIELD → re-execute B01/B02.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|--------------|
| Requires (Tier-1) | math.abst.ring-theory | Field is a special commutative ring; ring axioms and unit definition assumed |
| Requires (Tier-1) | math.abst.prime-ideal | Maximal ideal criterion (R/M is a field) used as a motivating bridge from prime/maximal ideals to field structure |
| Cross-link (Tier-1) | math.linalg.vector-space | Fields are the scalar domains of vector spaces; P76 cross-link probe tests this connection |
| Unlocks | math.abst.field-extension | Field extensions (adjoin elements to a field) are the central object of Galois theory |

**GR-9:** cross_links=[math.linalg.vector-space] (Tier 1) → P76 mode = cross-link probe (transfer probe tests the field-as-scalar-domain relationship).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=4 → lean structure (2 main TAs + gate)
- bloom=understand → V-4 = N/A (no P07 required; concept-classification and definition tasks)
- CPA_entry = C for advanced learner: concrete ℤ vs ℚ division comparison in A01 before the axiom

**Key teaching insight:** The field concept is often presented purely abstractly, but the concrete failure of division in ℤ (3/2∉ℤ) is the strongest motivator for why the invertibility axiom matters. A01 Stage C leads with this failure before the definition, so the definition feels like a formalization of something already understood.

**Cross-link design (P76):** The connection between fields and vector spaces is foundational to linear algebra — every vector space definition begins "let F be a field." The P76 transfer probe asks the student to diagnose concretely why ℤ fails as a scalar domain (λ=2, v=(1,0): no solution to 2·w=(1,0) in ℤ²), directly linking the field axiom to a linear algebra consequence. This probe is more valuable than a further abstract-algebra exercise because it spans two major subject areas.

**MC-1 repair note:** The "nonzero" qualifier is so small that students frequently drop it without noticing. In teaching, it helps to typographically emphasise it: "every **nonzero** element has an inverse" with stress and repetition, and to explicitly prove 0⁻¹ cannot exist (B01).

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.abst.field ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.abst.ring-theory ✓, math.abst.prime-ideal ✓ | PASS |
| V-3 | CPA entry = C for advanced difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01 and A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires, cross-links, and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_links=[math.linalg.vector-space] (Tier 1) → P76=cross-link probe ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=4 → lean (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | ℤ vs ℝ scalar domain; λ=2, v=(1,0) counterexample; field axiom identified correctly ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
