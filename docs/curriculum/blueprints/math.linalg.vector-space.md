<!-- BLUEPRINT: math.linalg.vector-space -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Vector Space
**Concept ID:** `math.linalg.vector-space`
**KG Fields:** difficulty=proficient | bloom=understand | estimated_hours=5 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.linalg.vector-space |
| name | Vector Space |
| difficulty | proficient |
| bloom | understand |
| estimated_hours | 5 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | P (Pictorial) |
| requires (Tier-1) | math.linalg.vector-addition, math.linalg.scalar-multiplication, math.abst.field |
| cross_links | math.abst.group-theory (Tier 1, has blueprint) |
| P76_mode | cross-link probe |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.linalg.vector-addition**: vector sum in ℝⁿ component-wise; geometric parallelogram law; commutativity and associativity of addition; zero vector; additive inverse
- **math.linalg.scalar-multiplication**: scaling a vector by a real number; distributivity over addition; identity scalar 1·v=v
- **math.abst.field**: commutative ring with multiplicative inverses for all nonzero elements; ℚ, ℝ, ℂ, ℤₚ; scalars come from a field

### Target Knowledge State
Student can state the eight vector-space axioms; recognise whether a given set with defined operations satisfies all axioms or fails at least one; identify the scalar field; explain why the zero vector and additive inverses are unique consequences of the axioms; connect the additive structure of a vector space to an abelian group; and give examples from ℝⁿ, polynomial spaces, and matrix spaces.

### Conceptual Obstacles
1. Assuming any set with addition and scalar multiplication is a vector space — closure under addition and scalar multiplication must be verified explicitly; operations can be redefined to break axioms while looking "natural"
2. Confusing the zero element's defining property — the zero vector 0 is defined by 0+v=v for all v; students who write "0=(0,0,…,0)" only for ℝⁿ cannot generalise to polynomial or function spaces
3. Assuming scalars can come from any number system — the scalar domain must be a field; using ℤ as scalars violates invertibility and breaks the axiom that scalar inverses can be applied (division by scalars must be possible)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | CLOSURE-UNSTATED | Student describes vector spaces without checking closure; assumes the set is automatically closed under the given operations without verification | Any proposed "vector space" where the underlying set might not be closed (e.g., {(x,y): x≥0}, non-standard operations) |
| MC-2 | ZERO-VECTOR-POSITIONAL | Student identifies the zero vector only as the tuple (0,0,…,0); cannot recognise the zero polynomial (p=0), the zero matrix (all entries 0), or the zero function as zero vectors in their respective spaces | Abstract vector spaces; polynomial or function spaces |
| MC-3 | SCALAR-DOMAIN-ARBITRARY | Student assumes scalars can come from ℤ or any ring; does not verify that the scalar domain is a field; confusion arises in examples like ℤ-modules (which are not vector spaces) | Any example where the scalar ring is non-obvious; abstract definitions; connection to algebra |

**Foundational Misconception:** MC-1 (CLOSURE-UNSTATED) — failing to check closure is the most common structural error when verifying vector spaces; a set that is "not closed" cannot be a vector space regardless of whether the other 7 axioms hold.

---

## Component 3 — Scaffolding Protocol

**Entry point:** P (Pictorial) — proficient learner begins with a structured table of familiar examples, observing the shared properties before seeing the formal axiom list.

**Scaffolding sequence:**
1. **A01 P04 PATTERN INDUCTION** — P: side-by-side table of ℝ², ℝ³, P₂ (polynomials ≤ degree 2), M₂ₓ₂ (2×2 matrices) — show addition and scalar multiplication in each; induce the 8 common axioms from the pattern; A: formal definition of vector space over a field F
2. **A02 P11 REPRESENTATION SHIFT** — P: axiom table with one concrete example per axiom; A: zero vector and additive inverse as theorems derived from axioms (uniqueness proofs)
3. **A03 P06 CONTRAST PAIR** — valid vector space vs axiom-breaking set; ℤ-module vs ℝ-vector space; subspace criterion (3-condition test) vs arbitrary subset
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Inducing the Eight Axioms from Examples

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Let familiar examples (ℝ², polynomials, matrices) reveal the common algebraic skeleton before imposing it as a definition; address MC-2 by showing the zero element in each concrete space

---

**[P04 — PATTERN INDUCTION]**

**Stage P — Pictorial (four example spaces side by side):**

| Property | ℝ² | P₂ (polys deg ≤ 2) | M₂ₓ₂ (2×2 matrices) |
|----------|-----|---------------------|----------------------|
| Elements | (a,b) | a₀+a₁x+a₂x² | 2×2 array of reals |
| Addition | component-wise | add coefficients | add entry-wise |
| Scalar mult. | k(a,b)=(ka,kb) | k·p(x)=kp(x) | k·A=kA |
| Zero element | (0,0) | p(x)=0 (zero poly) | O (zero matrix) |
| Additive inverse | −(a,b)=(−a,−b) | −p(x) | −A |
| Is u+v=v+u? | ✓ | ✓ | ✓ |
| Is (u+v)+w=u+(v+w)? | ✓ | ✓ | ✓ |
| Is 0+v=v? | ✓ | ✓ | ✓ |
| Is v+(−v)=0? | ✓ | ✓ | ✓ |
| Is k(u+v)=ku+kv? | ✓ | ✓ | ✓ |
| Is (k+l)v=kv+lv? | ✓ | ✓ | ✓ |
| Is k(lv)=(kl)v? | ✓ | ✓ | ✓ |
| Is 1·v=v? | ✓ | ✓ | ✓ |

Every column satisfies the same eight properties. This pattern is the definition of a vector space.

**Stage A — Abstract (formal definition):**

**Definition:** A **vector space** over a field F is a set V equipped with two operations:
- **Vector addition:** V × V → V, denoted (u,v) ↦ u+v
- **Scalar multiplication:** F × V → V, denoted (k,v) ↦ k·v

satisfying the following eight axioms for all u,v,w∈V and all k,l∈F:

| # | Axiom | Name |
|---|-------|------|
| A1 | u+v = v+u | Commutativity |
| A2 | (u+v)+w = u+(v+w) | Associativity |
| A3 | ∃ 0∈V: 0+v=v for all v | Zero vector |
| A4 | ∀v∈V, ∃(−v)∈V: v+(−v)=0 | Additive inverse |
| S1 | k(u+v) = ku+kv | Scalar dist. over vector sum |
| S2 | (k+l)v = kv+lv | Scalar dist. over field sum |
| S3 | k(lv) = (kl)v | Associativity of scaling |
| S4 | 1·v = v | Identity scalar |

Note: "closure" (the sum and scalar multiple stay in V) is built into the operation definitions (V×V→V and F×V→V). When verifying a subset, closure must be checked explicitly.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** The set W = {(x,y,z)∈ℝ³: x+y+z=0} with standard addition and scalar multiplication. (a) Name two elements of W. (b) Check closure under addition. (c) Check closure under scalar multiplication. (d) Is W a vector space?

**CORRECT:** (a) e.g. (1,−1,0) and (0,1,−1). (b) (a₁+b₁)+(a₂+b₂)+(a₃+b₃)=(a₁+a₂+a₃)+(b₁+b₂+b₃)=0+0=0 → closed. (c) k(a+b+c)=k·0=0 → closed. (d) Yes — W inherits all other axioms from ℝ³, and closure holds.
→ "Correct. W is the plane x+y+z=0 through the origin — a subspace of ℝ³." → Proceed to A02.

**PARTIAL:** Student checks closure but doesn't verify the zero vector is in W.
→ "Good closure check. Also confirm the zero vector (0,0,0) lies in W: 0+0+0=0 ✓. Since ℝ³ axioms A1-A4 and S1-S4 are inherited, and W is closed and contains 0, W is a vector space (subspace of ℝ³)."

**INCORRECT:** Student says W is not a vector space because "you can't add freely."
→ "In a subspace, you can add freely within the set. Check: if u=(1,−1,0) and v=(0,1,−1), then u+v=(1,0,−1); sum of components=1+0+(-1)=0 ✓. The constraint x+y+z=0 is preserved by addition and scalar multiplication. All 8 axioms hold."

**NO_RESPONSE:** → "Test closure first. Take two elements: u=(1,−1,0) (sum 0) and v=(0,2,−2) (sum 0). Their sum: (1,1,−2); sum of components=1+1+(−2)=0 ✓ — still in W. For scalar: 3·(1,−1,0)=(3,−3,0); sum=0 ✓. The other 8 axioms are inherited from ℝ³. W is a vector space."

---

### Teaching Action A02 — Zero Vector and Additive Inverse as Derived Properties

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Show that the zero vector and additive inverse are forced by the axioms and are unique — not just "whatever the tuple (0,0,…,0) is"; address MC-2 by working in polynomial and matrix spaces explicitly

---

**[P11 — REPRESENTATION SHIFT]**

**Stage P — Pictorial (zero vectors in different spaces):**

| Space | Zero element | Why it's the zero |
|-------|-------------|-------------------|
| ℝ² | (0,0) | (0,0)+(a,b)=(a,b) ✓ |
| P₂ | p(x)=0 (identically) | 0+p(x)=p(x) ✓ |
| M₂ₓ₂ | [[0,0],[0,0]] | O+A=A ✓ |
| C([0,1]) | f(x)=0 for all x | 0+g(x)=g(x) ✓ |

The zero element is not always "the number 0" — it is the identity element for addition in the specific vector space.

**Stage A — Abstract (uniqueness proofs from axioms):**

**Theorem 1 (zero vector is unique):** If 0 and 0' both satisfy Axiom A3, then 0=0'.

*Proof:* 0 = 0+0' (since 0' satisfies A3 for all elements, including 0) = 0'+0 (by A1) = 0' (since 0 satisfies A3 for 0'). So 0=0'. ∎

**Theorem 2 (additive inverse is unique):** For each v, the inverse −v is unique.

*Proof:* Suppose v+w=0 and v+w'=0. Then w=w+0=w+(v+w')=(w+v)+w'=0+w'=w'. So w=w'. ∎

**Theorem 3 (0·v = 0 for all v):**

*Proof:* 0·v=(0+0)·v=0·v+0·v (by S2). Subtract 0·v from both sides: 0=0·v. ∎

These theorems show that the axioms alone determine the zero vector and inverses — you don't need to identify them by inspection.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** In the space P₃ (polynomials of degree ≤ 3 over ℝ), identify (a) the zero vector, (b) the additive inverse of p(x)=x³−2x+5.

**CORRECT:** (a) The zero polynomial: 0 (identically 0 for all x). (b) −p(x)=−x³+2x−5. Check: p(x)+(−p(x))=(x³−2x+5)+(−x³+2x−5)=0 ✓.
→ "Correct. In polynomial spaces, 'zero vector' means the identically-zero polynomial, not the number 0." → Proceed to A03.

**PARTIAL:** Student writes zero as "0" but can't specify it's the zero polynomial (MC-2).
→ "The zero vector in P₃ is the polynomial that is 0 for every value of x: p(x)=0. It has all coefficients 0: 0x³+0x²+0x+0. This is the unique element satisfying 0+q=q for every polynomial q∈P₃."

**INCORRECT:** Student says additive inverse of x³−2x+5 is x³−2x−5 (just negates the constant).
→ "The additive inverse must satisfy p+(−p)=0. Check: (x³−2x+5)+(x³−2x−5)=2x³−4x≠0. You need to negate every coefficient: −(x³−2x+5)=−x³+2x−5. Check: (x³−2x+5)+(−x³+2x−5)=0 ✓."

**NO_RESPONSE:** → "The zero vector in P₃ is the polynomial with all zero coefficients: 0·x³+0·x²+0·x+0=0. For the inverse of p=x³−2x+5: negate every coefficient to get −p=−x³+2x−5. Check: p+(−p)=(x³−2x+5)+(−x³+2x−5)=0 ✓."

---

### Teaching Action A03 — Contrast Pair: Valid Vector Space vs. Axiom Violations

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Sharpen axiom-checking by showing what breaks and why; address MC-1 (closure) and MC-3 (scalar field); introduce the 3-condition subspace test

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Non-standard operations that break axioms:**

*Proposed "vector space":* V=ℝ² with operations (a,b)⊕(c,d)=(a+c+1, b+d+1) and k⊙(a,b)=(ka,kb).

Test A3 (zero vector): Need (x,y) with (a,b)⊕(x,y)=(a,b), i.e., (a+x+1, b+y+1)=(a,b) → x=−1, y=−1. So the "zero" is (−1,−1).

Test A4 (additive inverse): Need (c,d) with (a,b)⊕(c,d)=(−1,−1), i.e., (a+c+1)=−1 → c=−a−2; (b+d+1)=−1 → d=−b−2. So inverse of (a,b) is (−a−2,−b−2).

Test S2 ((k+l)⊙v): (k+l)⊙(a,b)=((k+l)a,(k+l)b). But k⊙(a,b)⊕l⊙(a,b)=(ka,kb)⊕(la,lb)=(ka+la+1,kb+lb+1)=((k+l)a+1,(k+l)b+1)≠((k+l)a,(k+l)b).

**S2 fails**: this is NOT a vector space with these operations.

**Contrast 2 — Non-closed subset (MC-1):**

*Proposed:* W = {(x,y)∈ℝ²: x≥0} with standard operations.

- Closure under scalar multiplication: take (1,0)∈W and scalar k=−1. Then (−1)·(1,0)=(−1,0). Is (−1,0)∈W? No (x=−1<0).

**W fails closure under scalar multiplication** → not a vector space.

**Contrast 3 — Subspace test (3 conditions suffice):**

A non-empty subset W of a vector space V is a **subspace** iff:
1. 0∈W (zero vector)
2. u,v∈W ⟹ u+v∈W (closed under addition)
3. v∈W, k∈F ⟹ k·v∈W (closed under scalar multiplication)

If these hold, all 8 vector-space axioms follow automatically (inherited from V).

Example — W = {(x,y,z)∈ℝ³: 2x−y+z=0}:
1. 0: 2(0)−0+0=0 ✓
2. u+v: 2(u₁+v₁)−(u₂+v₂)+(u₃+v₃)=(2u₁−u₂+u₃)+(2v₁−v₂+v₃)=0+0=0 ✓
3. k·v: 2(kv₁)−(kv₂)+(kv₃)=k(2v₁−v₂+v₃)=k·0=0 ✓

W is a subspace (and hence a vector space).

**Contrast 4 — Scalar field matters (MC-3):**

ℤ² as a ℤ-module: the set ℤ² with integer scalars satisfies most "axioms," but since ℤ is not a field (2 has no inverse), ℤ² is NOT a vector space. For example, solving 2·v=w for v in ℤ² may have no solution (w=(1,0): v=(1/2,0)∉ℤ²). A vector space requires a field as its scalar domain.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Is W = {p∈P₂: p(0)=0} a subspace of P₂? Apply the 3-condition test.

**CORRECT:** (1) Zero poly: 0(0)=0 ✓. (2) (p+q)(0)=p(0)+q(0)=0+0=0 ✓. (3) (kp)(0)=k·p(0)=k·0=0 ✓. W is a subspace.
→ "Correct. W = {ax+bx²: a,b∈ℝ} (polynomials with zero constant term) is indeed a subspace of P₂." → Proceed to A04.

**PARTIAL:** Student applies the test but forgets to verify condition 1.
→ "Good — conditions 2 and 3 hold. Also check condition 1: is the zero polynomial in W? 0(0)=0 ✓. Since all three conditions hold, W is a subspace."

**INCORRECT:** Student checks only whether P₂ axioms hold, not whether W is closed.
→ "Use the 3-condition subspace test — it's faster than checking all 8 axioms. Test: (1) 0∈W? Yes. (2) If p(0)=0 and q(0)=0, is (p+q)(0)=0? Yes. (3) If p(0)=0 and k∈ℝ, is (kp)(0)=0? Yes, k·0=0. All three conditions hold, so W is a subspace."

**NO_RESPONSE:** → "The 3-condition test: (1) Is 0∈W? The zero polynomial satisfies 0(0)=0, so yes. (2) Closure under addition: if p(0)=0 and q(0)=0, then (p+q)(0)=p(0)+q(0)=0. (3) Closure under scalar multiplication: (kp)(0)=k·p(0)=0. All hold → W is a subspace of P₂."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess understanding of vector-space axioms, zero elements, and the cross-link to group theory

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Is V = {f: [0,1]→ℝ: f(0)=1} a vector space over ℝ with standard addition and scalar multiplication?

*Solution:* Not a vector space. The zero function satisfies 0(0)=0≠1, so 0∉V. Alternatively: take f,g∈V (f(0)=g(0)=1); then (f+g)(0)=2≠1, so V is not closed under addition. **Not a vector space.**

**Problem 2:** In the space M₂ₓ₂ (2×2 real matrices), what is the zero vector? What is the additive inverse of A=[[1,2],[3,4]]?

*Solution:* Zero vector: O=[[0,0],[0,0]]. Additive inverse: −A=[[−1,−2],[−3,−4]]. Check: A+(−A)=O ✓.

**Problem 3:** Does the set V = {(x,y)∈ℝ²: x+2y=5} form a vector space (with standard operations)?

*Solution:* The zero vector (0,0) satisfies 0+2(0)=0≠5, so 0∉V. V is not a subspace, and not a vector space. (Alternatively, closure fails: 2·(1,2)=(2,4), check: 2+2(4)=10≠5.)

**Problem 4:** State (don't prove) which of the 8 axioms would fail if we redefined scalar multiplication in ℝ² as k·(a,b)=(ka,0) (scaling zeroes out the second component).

*Solution:* Axiom S4 (identity scalar) fails: 1·(a,b)=(a,0)≠(a,b) (unless b=0). Also S1 fails: k((a,b)+(c,d))=k(a+c,b+d)=(k(a+c),0)=(ka+kc,0), but k(a,b)+k(c,d)=(ka,0)+(kc,0)=(ka+kc,0)... actually S1 holds here. S4 fails is the clearest.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: cross-link probe — math.abst.group-theory)*

**Prompt:** A vector space V over ℝ has an underlying additive structure (V, +).

(a) State the four properties (from group theory) that make (V, +) an abelian group. Identify which of the 8 vector-space axioms provide each property.

(b) The set of 2×2 invertible real matrices GL(2,ℝ) forms a group under matrix multiplication. Is GL(2,ℝ) a vector space over ℝ with standard scalar multiplication k·A=kA? Justify your answer by identifying one axiom that fails.

**Expected solution:**

(a) Abelian group (V, +) properties and their axiom sources:
- **Closure:** built into V×V→V definition (the sum of two vectors stays in V)
- **Associativity:** Axiom A2 ((u+v)+w = u+(v+w))
- **Identity element (0):** Axiom A3 (∃ 0: 0+v=v)
- **Inverse:** Axiom A4 (∀v, ∃(−v): v+(−v)=0)
- **Commutativity:** Axiom A1 (u+v = v+u)

So (V, +) is an abelian group, and axioms A1-A4 exactly encode this structure. The remaining axioms S1-S4 link the field scalars to the group structure.

(b) GL(2,ℝ) with scalar multiplication k·A=kA: take k=0 and A=I (identity matrix). Then 0·I = [[0,0],[0,0]] = O. But O is not invertible (det(O)=0), so O∉GL(2,ℝ). The "zero vector" (needed for Axiom A3) is the zero matrix O, but O∉GL(2,ℝ). So Axiom A3 fails: there is no zero vector in GL(2,ℝ). **GL(2,ℝ) with kA is not a vector space.**

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

- MASTERY ACHIEVED → unlock math.linalg.linear-map and math.linalg.inner-product-space; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.linalg.vector-space assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — CLOSURE-UNSTATED (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Assuming closure without checking is CLOSURE-UNSTATED. In any proposed vector space or subspace, you must verify that the sum and scalar multiple of elements stay inside the set — this is not automatic."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is W={(x,y,z)∈ℝ³: xyz=0} a subspace?"
- MC-1 response: "Yes, the operations are standard."

**[P64 — CONCEPTUAL SHIFT]**
"Counterexample for xyz=0: take u=(1,0,0) (product=0) and v=(0,1,0) (product=0). Then u+v=(1,1,0); product=1·1·0=0 ✓ — closure holds here. But try u=(1,1,0) and v=(1,0,1): u+v=(2,1,1); product=2·1·1=2≠0. Not closed! W is not a subspace. Always test closure before concluding a subset is a subspace."

Practice: Apply the 3-condition test to W={(x,y)∈ℝ²: y=x²}. Fails closure: (1,1)∈W, 2·(1,1)=(2,4); 4≠2²=4... actually 2·1=2, so y-coord=4, x-coord=2, but 4≠2²? Wait: 4=2²=4. Hmm. Then check addition: (1,1)+(1,1)=(2,2); 2≠2²=4. Not closed.

---

### Repair Action B02 — ZERO-VECTOR-POSITIONAL (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Identifying the zero vector only as (0,0,…,0) is ZERO-VECTOR-POSITIONAL. The zero vector is defined by its property (0+v=v), not by its appearance."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is the zero vector in P₃?"
- MC-2 response: "0" without specifying "the zero polynomial."

**[P64 — CONCEPTUAL SHIFT]**
"In P₃, the zero vector is the polynomial p(x)=0 (identically zero; all coefficients are zero: 0x³+0x²+0x+0). Verify: 0+q(x)=0+q(x)=q(x) for any polynomial q ✓. In M₂ₓ₂, the zero vector is the 2×2 zero matrix. In C([0,1]), it is the zero function f(x)=0 for all x. Each space has its own zero — identified by the axiom, not by appearance."

Practice: Identify the zero vector in V=ℝ^{ℕ} (sequences of real numbers). Answer: the sequence (0,0,0,…).

---

### Repair Action B03 — SCALAR-DOMAIN-ARBITRARY (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming any ring can serve as the scalar domain is SCALAR-DOMAIN-ARBITRARY. Vector spaces require a field of scalars — division by nonzero scalars must be possible."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Can we define a vector space over ℤ?"
- MC-3 response: "Yes, scalars are just numbers."

**[P64 — CONCEPTUAL SHIFT]**
"A vector space over ℤ would need: for any scalar 2 and vector v, the equation 2·w=v must be solvable for w. But in ℤ², 2·w=(1,0) requires w=(1/2,0)∉ℤ². The field axiom of invertibility makes this work: in ℝ or ℚ, 1/2 exists. ℤ-modules exist but are not vector spaces. The scalar domain must be a field."

Practice: Explain why ℚ[√2]={a+b√2: a,b∈ℚ} can serve as the scalar domain of a vector space over ℚ (it is a field), but ℤ[√2]={a+b√2: a,b∈ℤ} cannot (it is only a ring).

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | State all 8 axioms from memory; identify the zero vector and additive inverse in P₂ |
| SR-2 | +3 days | Apply the 3-condition subspace test to W={(A∈M₂ₓ₂: tr(A)=0} (trace-zero matrices) |
| SR-3 | +7 days | Identify which axiom fails for each of three proposed non-vector-spaces (non-standard operations) |
| SR-4 | +14 days | Explain why (V,+) is an abelian group and identify which axioms provide each group property (reinforces cross-link to group theory) |

Retrieval flag: if student fails to specify the zero element in a non-ℝⁿ space (MC-2), or claims closure without verifying (MC-1), re-execute B01/B02.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|--------------|
| Requires (Tier-1) | math.linalg.vector-addition | Axioms A1-A4 extend the geometric addition from ℝⁿ to abstract spaces |
| Requires (Tier-1) | math.linalg.scalar-multiplication | Axioms S1-S4 formalise scaling; identity scalar S4 directly mirrors scalar multiplication prior knowledge |
| Requires (Tier-1) | math.abst.field | The scalar domain must be a field; the field axioms underpin why scalar inversion is possible (math.abst.field blueprint) |
| Cross-link (Tier-1) | math.abst.group-theory | (V,+) is an abelian group; P76 probe tests this connection by identifying axioms A1-A4 as the abelian group axioms |
| Unlocks | math.linalg.linear-map | Linear maps are structure-preserving functions between vector spaces; requires vector-space definition |
| Unlocks | math.linalg.inner-product-space | Inner product spaces add a scalar product structure to vector spaces |

**GR-9:** cross_links=[math.abst.group-theory] (Tier 1, has blueprint) → P76 mode = cross-link probe (tests the abelian group structure of (V,+)).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=5 → standard structure (3 main TAs + gate)
- bloom=understand → V-4 = N/A (no P07 required)
- CPA_entry = P (Pictorial) for proficient difficulty; V-3 = N/A

**Key teaching insight:** The 8-axiom list feels overwhelming as a definition without seeing where it comes from. A01's induction from familiar examples (ℝ², polynomials, matrices) transforms the axioms from arbitrary rules into observed patterns. Students who derive the axioms from examples retain them far better than students who memorise a list.

**Subspace test (A03):** The 3-condition test is the working tool for linear algebra — students will use it in every subsequent course. Emphasising that "if you're checking a subset of a known vector space, 3 conditions suffice" saves enormous verification effort and reinforces why the other 5 axioms come for free from the surrounding space.

**P76 design:** The cross-link to math.abst.group-theory tests whether the student sees that the additive axioms A1-A4 are exactly the abelian group axioms. The GL(2,ℝ) example is a careful choice: it is a group under multiplication, it has a scalar multiplication, yet it fails to be a vector space because the zero matrix is excluded. This shows that "group + scalar multiplication" is not enough — you also need a zero vector.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.linalg.vector-space ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.linalg.vector-addition ✓, math.linalg.scalar-multiplication ✓, math.abst.field ✓ | PASS |
| V-3 | CPA entry rule | proficient → CPA=P; V-3=N/A ✓ | N/A |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P04 PATTERN INDUCTION ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires, cross-links, unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_links=[math.abst.group-theory] (T1, has blueprint) → P76=cross-link probe ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=5 → standard (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | GL(2,ℝ) fails Axiom A3 (zero matrix not invertible); abelian group structure identified via axioms A1-A4 ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
