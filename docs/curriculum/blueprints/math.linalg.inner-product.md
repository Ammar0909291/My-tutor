<!-- BLUEPRINT: math.linalg.inner-product -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Inner Product
**Concept ID:** `math.linalg.inner-product`
**KG Fields:** difficulty=expert | bloom=understand | estimated_hours=4 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.linalg.inner-product |
| name | Inner Product |
| difficulty | expert |
| bloom | understand |
| estimated_hours | 4 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.linalg.vector-space, math.linalg.dot-product |
| cross_links | math.fnal.hilbert-space (not yet authored — see Component 7) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.linalg.vector-space**: the 8 axioms defining an abstract vector space (ℝⁿ, polynomials, function spaces all qualify) — inner products are defined on TOP of a vector space, applicable to any of these examples, not just ℝⁿ
- **math.linalg.dot-product**: $a\cdot b=\sum a_ib_i$ on ℝⁿ — the MOTIVATING special case this concept generalizes; every fact already known about the dot product transfers as one example of the broader inner-product framework

### Target Knowledge State
Student can state the axioms of a (real) inner product — symmetry $\langle u,v\rangle=\langle v,u\rangle$, bilinearity (linear in each argument), and positive-definiteness $\langle v,v\rangle>0$ for $v\ne0$ — and verify whether a proposed bilinear form on ℝⁿ or a function space satisfies all three; correctly recognize that inner products exist BEYOND the standard dot product, including on abstract spaces (polynomials, functions) with no literal "dot" of components, and even non-standard (weighted) inner products on ℝⁿ itself; correctly check positive-definiteness explicitly rather than assuming any symmetric bilinear form qualifies (an INDEFINITE form, positive for some vectors and negative or zero for others, fails to be an inner product); and (for the complex case) correctly state that the conjugate-symmetric property $\langle u,v\rangle=\overline{\langle v,u\rangle}$ replaces plain symmetry, since $\langle v,v\rangle$ must be REAL (and positive) even when the vector space is over ℂ.

### Conceptual Obstacles
1. Assuming "inner product" is just a fancier name for "dot product," missing that the concept generalizes to abstract vector spaces (polynomial spaces, function spaces) where components and a literal "dot" don't exist, and that even on ℝⁿ, non-standard (weighted) inner products are valid alternatives to the standard dot product
2. Assuming any symmetric bilinear form automatically qualifies as an inner product, without checking positive-definiteness — an INDEFINITE symmetric bilinear form (one that can be negative or zero for some nonzero vector) fails to be a genuine inner product, even though it satisfies symmetry and bilinearity
3. (Complex case) Assuming complex inner products are exactly symmetric ($\langle u,v\rangle=\langle v,u\rangle$) like the real case, missing the CONJUGATE symmetry requirement ($\langle u,v\rangle=\overline{\langle v,u\rangle}$) needed to keep $\langle v,v\rangle$ real and positive

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | INNER-PRODUCT-IS-JUST-DOT-PRODUCT | Student treats "inner product" as merely a renaming of the standard dot product, missing the generalization to abstract spaces (polynomials, functions) and non-standard weighted inner products on ℝⁿ | Any inner product defined on a space without literal numeric components, e.g. polynomials or continuous functions |
| MC-2 | ANY-SYMMETRIC-BILINEAR-FORM-QUALIFIES | Student assumes any symmetric, bilinear form is automatically a valid inner product, without checking positive-definiteness | Any indefinite symmetric bilinear form, e.g. $\langle u,v\rangle=u_1v_1-u_2v_2$ |
| MC-3 | COMPLEX-INNER-PRODUCT-IS-PLAIN-SYMMETRIC | Student applies plain symmetry ($\langle u,v\rangle=\langle v,u\rangle$) to a complex inner product, rather than the required conjugate symmetry $\langle u,v\rangle=\overline{\langle v,u\rangle}$ | Any complex vector space inner product, especially self-pairings $\langle v,v\rangle$ needing to be real |

**Foundational Misconception:** MC-1 (INNER-PRODUCT-IS-JUST-DOT-PRODUCT) — it undermines the entire reason this concept exists as separate from math.linalg.dot-product (which the KG already covers): the inner product's power is precisely that it is an AXIOMATIC generalization applicable to spaces (polynomials, functions, weighted ℝⁿ) where no literal dot product of numeric components makes sense, and a student who thinks "inner product = dot product" cannot correctly apply the concept to any of these genuinely new settings, which is exactly what MC-2 (checking axioms on unfamiliar bilinear forms) and MC-3 (the complex generalization) require doing.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — expert learner verifies the three inner-product axioms on the FAMILIAR dot product first (confirming it's a special case), then on a genuinely new example (polynomials), before the general axiomatic definition is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: axiom verification on the dot product (familiar) and then on a polynomial-space inner product (new); P: a "family of inner products" picture showing dot product as one member among many; A: formal axioms (real case) stated precisely, plus the induced norm
2. **A02 P06 CONTRAST PAIR** — dot product vs. a weighted/polynomial inner product, both valid (MC-1); a genuine inner product vs. an indefinite bilinear form that fails positive-definiteness (MC-2); real symmetry vs. complex conjugate symmetry (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — The Dot Product Is One Example, Not the Definition

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Verify the three axioms hold for the familiar dot product, then for a genuinely new (polynomial) example; state the formal axioms and induced norm

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (verifying the axioms on TWO examples: the dot product, and a polynomial inner product):**

**Example 1 — the standard dot product on ℝ²**, $\langle u,v\rangle = u_1v_1+u_2v_2$:
- Symmetry: $u_1v_1+u_2v_2 = v_1u_1+v_2u_2$ ✓ (ordinary multiplication commutes)
- Bilinearity: $\langle u+w,v\rangle = (u_1+w_1)v_1+(u_2+w_2)v_2 = \langle u,v\rangle+\langle w,v\rangle$ ✓ (distributes)
- Positive-definiteness: $\langle v,v\rangle=v_1^2+v_2^2 \ge0$, and $=0$ only when $v_1=v_2=0$, i.e. $v=0$ ✓

**Example 2 — an inner product on polynomials of degree ≤1**, $\langle p,q\rangle = p(0)q(0)+p(1)q(1)$ (evaluate at two points and multiply):
- For $p(x)=2x+1, q(x)=x-3$: $p(0)=1,q(0)=-3$; $p(1)=3,q(1)=-2$. $\langle p,q\rangle = (1)(-3)+(3)(-2) = -3-6=-9$.
- Symmetry: swapping $p,q$ gives the same products in reverse order — $q(0)p(0)+q(1)p(1)$, identical by commutativity of real multiplication ✓
- Positive-definiteness: $\langle p,p\rangle = p(0)^2+p(1)^2 \ge0$, and $=0$ only if $p(0)=p(1)=0$ — for a degree-≤1 polynomial, having TWO roots (0 and 1) forces $p$ to be the zero polynomial (a nonzero linear polynomial has at most one root) ✓

**Neither example is "the dot product" in the usual componentwise sense for Example 2** (polynomials aren't lists of numbers to literally "dot") — yet both satisfy the identical three axioms, confirming the dot product is ONE INSTANCE of a broader pattern, not the definition itself.

**Stage P — Pictorial (a family of valid inner products, dot product as one member):**

```
              INNER PRODUCTS (anything satisfying the 3 axioms)
             ╱              │                  ╲
   standard dot        weighted dot        polynomial/function
   product on ℝⁿ       products on ℝⁿ      evaluation products
   (Example 1)         (e.g. Σwᵢuᵢvᵢ,        (Example 2, and
                        wᵢ>0 weights)         many others)

   All members of this family share the SAME three defining
   properties; "dot product" names only the leftmost branch.
```

**Stage A — Abstract (formal axioms, real case, and the induced norm):**

A (real) **inner product** on a vector space $V$ is a function $\langle\cdot,\cdot\rangle:V\times V\to\mathbb R$ satisfying, for all $u,v,w\in V$ and scalars $c$:
1. **Symmetry:** $\langle u,v\rangle=\langle v,u\rangle$
2. **Bilinearity:** $\langle cu+w,v\rangle = c\langle u,v\rangle+\langle w,v\rangle$ (linear in the first argument; symmetry then gives linearity in the second too)
3. **Positive-definiteness:** $\langle v,v\rangle\ge0$, with equality iff $v=0$

**Induced norm:** every inner product automatically DEFINES a norm via $\|v\|=\sqrt{\langle v,v\rangle}$ — positive-definiteness is exactly what makes this square root well-defined and zero only for the zero vector.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Consider $\langle u,v\rangle = 2u_1v_1+3u_2v_2$ on $\mathbb R^2$ (a "weighted" dot product). Verify symmetry and positive-definiteness explicitly.

**CORRECT:** Symmetry: $2u_1v_1+3u_2v_2 = 2v_1u_1+3v_2u_2$ ✓ (real multiplication commutes in each term). Positive-definiteness: $\langle v,v\rangle=2v_1^2+3v_2^2$ — a sum of non-negative terms (since squares are non-negative and the weights 2,3 are positive), equal to 0 only when both $v_1=0$ and $v_2=0$, i.e. $v=0$ ✓. **Valid inner product** — genuinely different from the standard dot product (which would use weights 1,1), yet still qualifies.
→ "Correct — this confirms inner products on ℝⁿ aren't limited to the one 'standard' dot product; any positive weights work equally well." → Proceed to A02.

**PARTIAL:** Student verifies symmetry correctly but only checks positive-definiteness for a specific numeric example (e.g. v=(1,1)) rather than the general case.
→ "Check the GENERAL case, not just one example: $\langle v,v\rangle=2v_1^2+3v_2^2$ for ARBITRARY $v_1,v_2$ — since $v_1^2\ge0$ and $v_2^2\ge0$ always, and the weights 2,3 are positive, the whole sum is $\ge0$ for every possible $v$, and can only equal 0 when BOTH squared terms are 0, forcing $v_1=v_2=0$. A single numeric check (like v=(1,1) giving $2+3=5>0$) is suggestive but doesn't PROVE the axiom holds for every vector; the general algebraic argument does."

**INCORRECT:** Student assumes this is NOT a valid inner product because "it's not the standard dot product with weights 1,1" (MC-1).
→ "Being different from the STANDARD dot product doesn't disqualify it — check the actual AXIOMS, not whether it matches one specific familiar example. This weighted form satisfies symmetry (shown directly) and positive-definiteness (a sum of positive multiples of squares, zero only at the zero vector) — it fully qualifies as a valid inner product, just a different one from the standard dot product. Many different inner products can coexist on the same space."

**NO_RESPONSE:** → "Symmetry: $2u_1v_1+3u_2v_2=2v_1u_1+3v_2u_2$ ✓ (multiplication commutes). Positive-definiteness: $2v_1^2+3v_2^2\ge0$ always, $=0$ only when $v_1=v_2=0$ ✓. Valid inner product, different from but alongside the standard dot product."

---

### Teaching Action A02 — Beyond the Dot Product; When Positive-Definiteness Fails; Complex Conjugate Symmetry

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 by presenting a function-space inner product with no literal components at all; break MC-2 with an indefinite bilinear form that fails the positive-definiteness check; break MC-3 with the complex case's conjugate symmetry made explicit

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — A function-space inner product, no "dot" of components at all (MC-1):**

On the space of continuous functions on $[0,1]$, define $\langle f,g\rangle = \int_0^1 f(x)g(x)\,dx$. There is no finite list of "components" to literally multiply and add — the vectors here are entire FUNCTIONS. Yet all three axioms hold: symmetry ($fg=gf$ pointwise, so the integrals match), bilinearity (integration is linear), and positive-definiteness ($\langle f,f\rangle=\int_0^1 f(x)^2\,dx \ge0$, and equals 0 only if $f$ is identically 0 — a continuous function whose square integrates to 0 must itself be 0 everywhere). This is a genuine inner product on an infinite-dimensional space where "dot product" (which presumes a finite list of numeric components) simply has no direct meaning at all — the AXIOMATIC definition is what makes this example possible.

**Contrast 2 — A symmetric bilinear form that FAILS positive-definiteness (MC-2):**

Consider $\langle u,v\rangle = u_1v_1 - u_2v_2$ on $\mathbb R^2$ (an INDEFINITE form). Check: symmetry holds ($u_1v_1-u_2v_2=v_1u_1-v_2u_2$ ✓); bilinearity holds (each term is linear ✓). But positive-definiteness: $\langle v,v\rangle = v_1^2-v_2^2$. For $v=(0,1)$: $\langle v,v\rangle = 0-1=-1 < 0$ — **NEGATIVE**, violating positive-definiteness outright (a nonzero vector giving a negative self-pairing). This form is symmetric and bilinear but is **NOT a valid inner product** — satisfying two of the three axioms is not enough; ALL three must hold, and this one fails specifically at positive-definiteness.

**Contrast 3 — Complex case: conjugate symmetry, not plain symmetry (MC-3):**

On $\mathbb C^n$, define $\langle u,v\rangle = \sum u_i\overline{v_i}$ (note the conjugate on the SECOND argument). Check self-pairing: $\langle v,v\rangle=\sum v_i\overline{v_i}=\sum|v_i|^2$ — a sum of squared MAGNITUDES, always a non-negative REAL number (even though the $v_i$ themselves are complex). Now check "symmetry": is $\langle u,v\rangle=\langle v,u\rangle$ literally? $\langle v,u\rangle=\sum v_i\overline{u_i}$, while $\overline{\langle u,v\rangle}=\overline{\sum u_i\overline{v_i}}=\sum\overline{u_i}v_i=\sum v_i\overline{u_i}$ — these MATCH: $\langle v,u\rangle=\overline{\langle u,v\rangle}$, i.e. **CONJUGATE symmetry**, not plain symmetry ($\langle u,v\rangle=\langle v,u\rangle$ would generally be FALSE for complex vectors — e.g. try $u=(1,0),v=(i,0)$: $\langle u,v\rangle=1\cdot\overline i=-i$, but $\langle v,u\rangle=i\cdot\overline1=i$; these are NEGATIVES of each other, not equal, but they ARE complex conjugates of each other, confirming conjugate symmetry holds while plain symmetry does not).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Is $\langle p,q\rangle=\int_0^1 p(x)q(x)\,dx$ (on polynomials) a valid inner product, even though it has "no numeric components to dot"? Briefly justify using the axioms. (b) Is $\langle u,v\rangle=u_1v_2+u_2v_1$ (on $\mathbb R^2$) a valid inner product? Check positive-definiteness specifically. (c) For $\langle u,v\rangle=\sum u_i\overline{v_i}$ on $\mathbb C^n$, is $\langle v,v\rangle$ real, complex-but-not-real, or always exactly zero?

**CORRECT:** (a) Yes — it's an instance of the general integral-based inner product (Contrast 1's pattern) applied to polynomials specifically (a subspace of continuous functions); symmetry, bilinearity, and positive-definiteness ($\int_0^1p(x)^2dx\ge0$, zero only for the zero polynomial) all hold, with no numeric "components" required at all. (b) Check symmetry first (holds: $u_1v_2+u_2v_1=v_1u_2+v_2u_1$ ✓ by commutativity) but positive-definiteness: $\langle v,v\rangle=v_1v_2+v_2v_1=2v_1v_2$ — for $v=(1,-1)$: $\langle v,v\rangle=2(1)(-1)=-2<0$ — **FAILS**, not a valid inner product (indefinite, like Contrast 2's example). (c) $\langle v,v\rangle=\sum v_i\overline{v_i}=\sum|v_i|^2$ — ALWAYS a non-negative REAL number (a sum of squared magnitudes), never complex-but-not-real, and equal to zero only when every $v_i=0$.
→ "Correct across all three — (b) directly tests whether the positive-definiteness check is applied as a genuine verification step, not skipped because symmetry/bilinearity already looked fine." → Proceed to A03.

**PARTIAL:** Student gets (a) and (c) but in (b) only checks symmetry and bilinearity, concluding "valid" without testing positive-definiteness.
→ "Symmetry and bilinearity holding is NOT sufficient — Contrast 2 showed exactly this trap. Test positive-definiteness explicitly: compute $\langle v,v\rangle=2v_1v_2$ for a SPECIFIC vector where $v_1,v_2$ have opposite signs, e.g. $v=(1,-1)$: $2(1)(-1)=-2$, which is negative. A single such counterexample is enough to disqualify this form as an inner product — always test positive-definiteness with at least one deliberately-chosen vector before declaring a form valid."

**INCORRECT:** Student answers (a) "No, since polynomials don't have components to dot together" (MC-1).
→ "The definition doesn't require literal numeric 'components' — it requires the three AXIOMS to hold for whatever the vectors happen to be (here, polynomials). The integral $\int_0^1p(x)q(x)dx$ plays the exact same structural role as $\sum u_iv_i$ does for ℝⁿ vectors: it's linear in each argument, symmetric, and positive-definite. 'No components to dot' describes why this ISN'T literally 'the dot product' — but it says nothing about whether it's a valid INNER PRODUCT, which is the broader, axiomatic category."

**NO_RESPONSE:** → "(a) Yes — satisfies all three axioms via integration, no numeric components needed. (b) No — positive-definiteness fails: v=(1,-1) gives ⟨v,v⟩=-2<0. (c) Always real and non-negative — a sum of squared magnitudes |vᵢ|²."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess axiom verification on unfamiliar forms, positive-definiteness discipline, and complex conjugate symmetry under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Verify positive-definiteness for $\langle u,v\rangle=5u_1v_1+u_2v_2$ on $\mathbb R^2$.

*Solution:* $\langle v,v\rangle=5v_1^2+v_2^2\ge0$ for all $v$ (sum of non-negative terms with positive weights), equal to 0 only when $v_1=v_2=0$. Valid.

**Problem 2:** Is $\langle u,v\rangle=u_1v_1-2u_2v_2$ a valid inner product on $\mathbb R^2$? Check positive-definiteness.

*Solution:* $\langle v,v\rangle=v_1^2-2v_2^2$. At $v=(0,1)$: $0-2=-2<0$ — fails positive-definiteness, NOT a valid inner product.

**Problem 3:** On polynomials of degree ≤2, is $\langle p,q\rangle=p(0)q(0)+p(1)q(1)+p(2)q(2)$ a valid inner product? Briefly justify positive-definiteness.

*Solution:* Yes — $\langle p,p\rangle=p(0)^2+p(1)^2+p(2)^2\ge0$, equal to 0 only if $p(0)=p(1)=p(2)=0$; a degree-≤2 polynomial with THREE roots must be the zero polynomial (a nonzero degree-≤2 polynomial has at most 2 roots).

**Problem 4:** For a complex inner product, why must $\langle v,v\rangle$ come out real even though $v$'s entries are complex numbers?

*Solution:* Because positive-definiteness requires $\langle v,v\rangle\ge0$, which is only a meaningful (orderable) statement for REAL numbers — complex numbers aren't ordered, so "≥0" wouldn't make sense if $\langle v,v\rangle$ could be a genuinely complex (non-real) value. Conjugate symmetry ($\langle v,v\rangle=\overline{\langle v,v\rangle}$, since swapping v with itself trivially satisfies the conjugate-symmetric identity) forces $\langle v,v\rangle$ to equal its own conjugate, which is only possible for a REAL number.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** Define, on the space of $2\times2$ real matrices, $\langle A,B\rangle = \text{trace}(A^TB)$ (the trace of $A$-transpose times $B$; recall trace sums the diagonal entries).

(a) For $A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$, compute $\langle A,A\rangle$ directly, and confirm it is non-negative.
(b) A student argues: "Matrices aren't vectors and don't have a 'dot product,' so this can't possibly be a genuine inner product — at best it's just a convenient notation trick." Evaluate this claim, connecting explicitly to why matrices DO form a vector space (satisfying the 8 vector-space axioms) and why this trace-based pairing is exactly the kind of generalization this concept is built around.
(c) Verify symmetry for this pairing in general: is $\text{trace}(A^TB) = \text{trace}(B^TA)$? (You may use the general fact that $\text{trace}(M) = \text{trace}(M^T)$ for any square matrix $M$.)

**Expected solution:**

(a) $A^TA = \begin{pmatrix}1&0\\2&1\end{pmatrix}\begin{pmatrix}1&2\\0&1\end{pmatrix} = \begin{pmatrix}1&2\\2&5\end{pmatrix}$. $\text{trace}(A^TA)=1+5=6\ge0$ ✓ (in fact, this equals the sum of squares of all four entries of $A$: $1^2+2^2+0^2+1^2=1+4+0+1=6$, confirming positive-definiteness pattern-matches the familiar "sum of squares" structure).

(b) The student's claim is **incorrect**. The space of $2\times2$ real matrices genuinely IS a vector space (matrices can be added entrywise and scaled, satisfying all 8 vector-space axioms — closure, associativity, identity, inverses, distributivity, etc., exactly as established in math.linalg.vector-space), so "vectors" in this concept's sense INCLUDES matrices, not just lists of numbers. The trace-based pairing $\langle A,B\rangle=\text{trace}(A^TB)$ is not a notation trick — it satisfies the exact same three axioms (symmetry, bilinearity, positive-definiteness) that define ANY inner product, and in fact this specific construction is precisely analogous to Contrast 1's integral-based function inner product: both take a vector space whose elements aren't literal numeric tuples (functions; matrices) and define a genuine inner product using an operation natural to that space (integration; trace) instead of a componentwise sum. This IS exactly the kind of generalization the concept is built around, not an exception to it.

(c) $\text{trace}(A^TB)$ vs. $\text{trace}(B^TA)$: using $\text{trace}(M)=\text{trace}(M^T)$ with $M=A^TB$: $\text{trace}(A^TB) = \text{trace}((A^TB)^T) = \text{trace}(B^TA)$ (since $(A^TB)^T=B^T(A^T)^T=B^TA$, using the transpose-of-a-product rule). So $\text{trace}(A^TB)=\text{trace}(B^TA)$ — **symmetry holds**, confirmed algebraically for ANY matrices $A,B$, not just the specific numeric example in (a).

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

- MASTERY ACHIEVED → unlock math.linalg.inner-product-space; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.linalg.inner-product assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — INNER-PRODUCT-IS-JUST-DOT-PRODUCT (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Treating 'inner product' as just a renaming of 'dot product' is INNER-PRODUCT-IS-JUST-DOT-PRODUCT. The dot product is ONE example of an inner product; the concept generalizes to any vector space (polynomials, functions, matrices) satisfying the three axioms."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Can polynomials have an inner product, even though they don't have numeric components to 'dot'?"
- MC-1 response: "No, inner product IS the dot product, and polynomials don't have components to dot together."

**[P64 — CONCEPTUAL SHIFT]**
"The definition of inner product doesn't require numeric components at all — it requires symmetry, bilinearity, and positive-definiteness for WHATEVER the 'vectors' are. On polynomials, $\langle p,q\rangle=\int_0^1p(x)q(x)dx$ satisfies all three (checkable directly), making it a fully genuine inner product, despite having no literal componentwise 'dot' anywhere in its definition. 'Dot product' names the specific ℝⁿ, componentwise case; 'inner product' names the whole broader family it belongs to."

Practice: Verify that $\langle p,q\rangle=p(0)q(0)+p'(0)q'(0)$ (using values and derivatives at 0) satisfies the three axioms on degree-≤1 polynomials.

---

### Repair Action B02 — ANY-SYMMETRIC-BILINEAR-FORM-QUALIFIES (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Assuming any symmetric, bilinear form is automatically an inner product is ANY-SYMMETRIC-BILINEAR-FORM-QUALIFIES. Positive-definiteness must be checked SEPARATELY and explicitly — an indefinite form can satisfy symmetry and bilinearity while still failing to be a genuine inner product."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "⟨u,v⟩=3u₁v₁-u₂v₂ is symmetric and bilinear. Is it an inner product?"
- MC-2 response: "Yes, since it's symmetric and bilinear."

**[P64 — CONCEPTUAL SHIFT]**
"Check positive-definiteness directly, not just the other two axioms: $\langle v,v\rangle=3v_1^2-v_2^2$. Try $v=(0,1)$: $3(0)-1=-1<0$ — a NEGATIVE self-pairing for a nonzero vector, which directly violates positive-definiteness. This form is symmetric and bilinear, but genuinely FAILS to be an inner product — all three axioms must hold, and the third one (often the easiest to forget to check) is exactly where this example breaks down."

Practice: Determine whether $\langle u,v\rangle=u_1v_1+4u_2v_2$ is a valid inner product by explicitly testing positive-definiteness, contrasting it with the failing example above.

---

### Repair Action B03 — COMPLEX-INNER-PRODUCT-IS-PLAIN-SYMMETRIC (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Applying plain symmetry to a complex inner product is COMPLEX-INNER-PRODUCT-IS-PLAIN-SYMMETRIC. Complex inner products require CONJUGATE symmetry ($\langle u,v\rangle=\overline{\langle v,u\rangle}$), needed specifically so that $\langle v,v\rangle$ comes out real."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "For u=(1,0), v=(i,0) in ℂ², is ⟨u,v⟩=⟨v,u⟩ (plain symmetry)?"
- MC-3 response: assumes yes without checking, or computes both sides incorrectly assuming they must match exactly.

**[P64 — CONCEPTUAL SHIFT]**
"Compute directly, using $\langle u,v\rangle=\sum u_i\overline{v_i}$: $\langle u,v\rangle=1\cdot\overline i=-i$. $\langle v,u\rangle=i\cdot\overline1=i$. These are NOT equal ($-i\ne i$) — plain symmetry FAILS here. But check conjugate symmetry: is $\langle v,u\rangle=\overline{\langle u,v\rangle}$? $\overline{-i}=i$, matching $\langle v,u\rangle=i$ exactly — CONJUGATE symmetry holds. The complex case genuinely requires this weaker (conjugate, not plain) symmetry — memorizing the real case's exact formula and applying it unchanged to ℂ produces a false conclusion."

Practice: For u=(1+i,0), v=(1,0) in ℂ², compute ⟨u,v⟩ and ⟨v,u⟩ directly, and verify conjugate symmetry (not plain symmetry) holds between them.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Verify the three axioms for a fresh weighted dot product on ℝ² from memory |
| SR-2 | +3 days | Verify (or refute) positive-definiteness for a fresh symmetric bilinear form, including at least one deliberately-chosen test vector |
| SR-3 | +7 days | Verify all three axioms for a fresh function-space or polynomial-space inner product |
| SR-4 | +14 days | Reconstruct the matrix trace-inner-product transfer probe's symmetry proof (trace(AᵀB)=trace(BᵀA)) from the transpose-of-a-product rule |

Retrieval flag: if student assumes inner products only exist on ℝⁿ (MC-1) or accepts a symmetric bilinear form without checking positive-definiteness (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.linalg.vector-space | Inner products are defined ON TOP of a vector space; the abstract-space examples (polynomials, matrices, functions) all rely on already having established vector-space status |
| Requires (Tier-1) | math.linalg.dot-product | The motivating special case this concept generalizes; every dot-product fact (symmetry, bilinearity, positive-definiteness) reappears here as the FIRST verified example |
| Unlocks | math.linalg.inner-product-space | A vector space equipped with a chosen inner product — the formal structure this concept's axioms make possible |

**GR-9:** cross_links: math.fnal.hilbert-space is listed in the KG but has **no authored blueprint yet** — P76_mode is therefore set to independence for now; once math.fnal.hilbert-space is authored, a future revision may add a genuine cross-link probe connecting inner product spaces to their completion into Hilbert spaces (the function-space example in Contrast 1 is exactly the motivating case).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=4 → compact structure (2 main TAs + gate), matching the concept's tightly focused scope (one axiom set, verified across several examples) despite expert difficulty
- bloom=understand → V-4 = N/A (no P07 required; axiom-verification and classification tasks, not open derivations)
- CPA_entry = C for an expert learner: verifying the axioms on the ALREADY-FAMILIAR dot product first (before the genuinely new polynomial example) confirms the framework is consistent with prior knowledge before extending it

**Key teaching insight:** MC-1 is this concept's root misconception because the KG already has a separate, dedicated math.linalg.dot-product concept — a student who has just mastered that concept has strong incentive to assume "inner product" is a redundant restatement rather than a genuine generalization. A01 is deliberately structured to verify the SAME three axioms on the dot product AND on a polynomial example side by side, so the student sees firsthand that the axioms (not the dot-product formula itself) are the actual content of the concept.

**MC-2 as the concept's most frequently-skipped check:** Because symmetry and bilinearity are often "obviously true" by inspection for a proposed bilinear form, positive-definiteness is the axiom most likely to be assumed rather than verified — A02's Contrast 2 is deliberately placed to show a form that PASSES the first two axioms easily and FAILS only at the third, training the habit of checking positive-definiteness as a non-optional, independent step every time.

**Sequencing note (cross-link):** math.fnal.hilbert-space (the completion of an inner product space, central to functional analysis) is not yet authored in the corpus; this blueprint's function-space example (Contrast 1) is exactly the motivating case that future concept will build on, and Component 7 records the pending cross-link for a future authoring pass.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.linalg.inner-product ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.linalg.vector-space ✓, math.linalg.dot-product ✓ | PASS |
| V-3 | CPA entry = C for expert difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented; not-yet-authored cross-link noted ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_link target not yet authored → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=4, tightly-scoped → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Matrix trace inner product; symmetry proof via transpose-of-product rule ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
