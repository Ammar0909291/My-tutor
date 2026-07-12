# TEACHING BLUEPRINT — math.linalg.dot-product

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.linalg.dot-product |
| concept_name | Dot Product |
| domain | linear_algebra |
| difficulty | developing |
| bloom | apply |
| estimated_hours | 3 |
| mastery_threshold | 0.90 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.90 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.linalg.vector, math.arith.multiplication]
**unlocks:** [math.linalg.norm, math.linalg.angle-vectors, math.linalg.orthogonality]
**cross_links:** [math.geom.dot-product — NOT Tier 1]

---

## Component 1 — Cognitive Map

**Core concept:** The dot product of vectors **a** = (a₁,…,aₙ) and **b** = (b₁,…,bₙ) is the scalar **a·b = Σᵢ aᵢbᵢ**. Geometrically, **a·b = |a||b|cosθ** where θ is the angle between them. The dot product equals zero if and only if the vectors are orthogonal.

**Knowledge prerequisites activated:**
- math.linalg.vector: vectors are ordered n-tuples; each component occupies a fixed positional slot
- math.arith.multiplication: multiply paired components; accumulate signed products via addition

**Concept structure:**
1. **Component formula** (computational): pair components by position, multiply each pair, sum all products
2. **Geometric formula** (interpretive): |a||b|cosθ — connects to angle and magnitude
3. **Orthogonality criterion**: a·b = 0 ↔ θ = 90°
4. **Scalar output invariant**: result is always a single number, never a vector

**Target understanding:** Given two same-dimension vectors, the learner computes a·b using the component formula, correctly identifies the result as a scalar, and determines orthogonality by checking whether a·b = 0.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | ADD-THEN-MULTIPLY | Presented with (2,3)·(4,5) | Adds components within each vector first (2+3=5, 4+5=9), then multiplies the sums (5×9=45) instead of pairing by position | B01 |
| MC-2 | DOT-PRODUCT-IS-VECTOR | Asked for result of dot product | Returns component-wise product as a vector: (2,3)·(4,5)=(8,15) instead of scalar 23 | B02 |
| MC-3 | COSINE-FORMULA-ONLY | Asked to compute dot product from components | Cannot apply component formula; attempts to find |a|, |b|, and θ even when components are given | B03 |

**FOUNDATIONAL MC:** MC-1 (ADD-THEN-MULTIPLY) — wrong operation at the component pairing level; must be cleared before output-type or formula misconceptions are addressed.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
Physical pairing: write vectors as two labelled rows; draw lines connecting position 1 to position 1, position 2 to position 2; multiply each connected pair, then sum the products into one box.

**Progression Gate (C → P):** Learner correctly pairs, multiplies, and sums components of two 2D vectors with no prompting.
**Progression Gate (P → A):** Learner states the component formula symbolically and applies it to 3D vectors with negative entries.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Pair-Multiply-Sum: The Invoice Analogy (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: An invoice ledger — "quantity × price per item, summed over all items gives total cost."
Target domain: Dot product — "a₁×b₁ + a₂×b₂ + … summed gives one number."
Mapping: items ↔ vector positions; quantity ↔ aᵢ; price ↔ bᵢ; total cost ↔ a·b

"Imagine two vectors as two rows in a ledger. You pair each column (same position), multiply the pair (quantity × price), then add all results to get a single total — that total is the dot product."

Concrete demonstration:
```
a = (2,  3)
b = (4,  5)
      ↓    ↓
   2×4  3×5
=   8 + 15
=   23        ← single number (scalar)
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Using the pair-multiply-sum method, compute (1,2)·(3,4). Write out each paired product before summing."
→ CORRECT [1×3+2×4 = 3+8 = 11]: "Correct — 11. The result is one number." → TA-A02
→ PARTIAL [gets 11 but skips intermediate products]: "Show both paired products explicitly before summing." → re-prompt
→ INCORRECT [e.g., 1+2=3, 3+4=7, 3×7=21 — adds first]: Flag MC-1. Route → B01
→ NO_RESPONSE: Replay concrete demo step by step with (1,2)·(3,4) partially filled.

---

### TA-A02 — Worked Examples: Component Formula in 2D and 3D (GR-1: P07 | GR-2: P49)

**P07 WORKED EXAMPLE PAIR**

*Example 1 — Two-dimensional:*
Compute (2,3)·(4,5).
```
Step 1 — Check dimensions: both 2D ✓
Step 2 — Multiply paired components:
         Position 1: 2 × 4  =  8
         Position 2: 3 × 5  = 15
Step 3 — Sum all products: 8 + 15 = 23
Result: (2,3)·(4,5) = 23   ← scalar
```

*Example 2 — Three-dimensional with negatives:*
Compute (1,−2,3)·(4,0,−2).
```
Step 1 — Check dimensions: both 3D ✓
Step 2 — Multiply paired components:
         Position 1:  1  × 4   =  4
         Position 2: (−2)× 0   =  0
         Position 3:  3  ×(−2) = −6
Step 3 — Sum: 4 + 0 + (−6) = −2
Result: (1,−2,3)·(4,0,−2) = −2   ← negative scalar is valid
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Compute (3,−1,2)·(2,4,−3). Show all three paired products."
→ CORRECT [3×2+(−1)×4+2×(−3) = 6−4−6 = −4]: "Correct — −4." → TA-A03
→ PARTIAL [correct products, arithmetic error in sum]: "Re-add: 6 + (−4) + (−6). Work left to right." → re-prompt
→ INCORRECT [returns a vector such as (6,−4,−6)]: Flag MC-2. Route → B02
→ INCORRECT [wrong products, add-first pattern]: Flag MC-1. Route → B01
→ NO_RESPONSE: Re-present Example 2 with (3,−1,2)·(2,4,−3) with position 1 partially filled.

---

### TA-A03 — Scalar vs. Vector Output; Two Equivalent Formulas (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

*Case A — Dot product (collapses to scalar):*
a·b = Σ aᵢbᵢ = one number
(2,3)·(4,5) = 8+15 = **23**   ← scalar

*Case B — Element-wise (Hadamard) product (stays a vector):*
a⊙b = (a₁b₁, a₂b₂) = vector
(2,3)⊙(4,5) = **(8,15)**   ← vector; different operation, NOT the dot product

Critical rule: **·** sums all paired products into one number. Any answer that is still a vector is not a dot product.

Geometric complement — two formulas, same value:
```
Component:  a·b = a₁b₁ + a₂b₂ + … + aₙbₙ   (use when components are given)
Geometric:  a·b = |a||b|cosθ                   (use when angle/magnitude are given)
```
Key corollary: if **a·b = 0**, then cosθ = 0, so θ = 90° — the vectors are orthogonal.

**P49 ADAPTIVE CHECKPOINT**
Q: "Are u=(3,4) and v=(−4,3) orthogonal? Compute u·v. State whether the result is a scalar or vector."
→ CORRECT [3×(−4)+4×3 = −12+12 = 0; scalar; YES orthogonal]: "Correct — zero scalar confirms orthogonality." → TA-A04
→ PARTIAL [gets 0 but calls it 'vector']: "0 is a number (scalar). Dot product always yields one number." → clarify → TA-A04
→ INCORRECT [returns vector (−12,12)]: Flag MC-2. Route → B02
→ NO_RESPONSE: "Start with position 1: 3×(−4)=?" → guided re-prompt

---

### TA-A04 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. Compute **(2,3)·(4,5)**.
   *(Expected: 2×4+3×5 = 8+15 = 23)*

2. Compute **(1,−2,3)·(4,0,−2)**.
   *(Expected: 4+0+(−6) = −2)*

3. **True/False:** The dot product of two vectors is always a vector.
   *(Expected: FALSE — the dot product is always a scalar)*

4. Find **k** such that **(2,k)·(1,−3) = 0**.
   *(Expected: 2×1 + k×(−3) = 0 → 2−3k = 0 → k = 2/3)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — math.geom.dot-product is NOT Tier 1; novel context used)

*Physics application — work done by a force:*

"In physics, the work done by force **F** along displacement **d** is W = **F·d**. Suppose **F** = (3,4) newtons and **d** = (6,0) metres.

(a) Compute W = **F·d**.
(b) Now suppose the displacement changes to **d** = (0,5) metres. Compute W again.
(c) Which displacement produces more work? Explain why the vertical component of **F** contributes nothing when motion is purely horizontal."

*(Expected:*
*(a) W = 3×6+4×0 = 18+0 = 18 J*
*(b) W = 3×0+4×5 = 0+20 = 20 J*
*(c) d=(0,5) gives more work (20 J vs 18 J). When motion is purely horizontal, only the horizontal force component (3 N) does work; the vertical component (4 N) is perpendicular to the displacement, contributing zero — the dot product captures exactly this perpendicularity via the cosθ factor.)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.90; ⌈0.90×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 ADD-THEN-MULTIPLY first; then B02 or B03 as flagged by prior TAs)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now compute dot products in any dimension, identify the scalar output, and apply the operation in novel physical contexts. This operation is the foundation of orthogonality checks, vector norms, and angle measurement — the next concepts in this sequence."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: ADD-THEN-MULTIPLY (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A common mistake is adding components within each vector first, then multiplying the sums. For example: (1,2)·(3,4) → (1+2)×(3+4) = 3×7 = 21. This is not the dot product. The dot product pairs by position and multiplies each pair before any summing."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "For (1,2)·(3,4), what is the very first arithmetic step: add 1+2, or multiply 1×3?"
→ "Add 1+2 first": MC-1 ADD-THEN-MULTIPLY confirmed. Continue B01.
→ "Multiply 1×3 first": MC-1 not active. Exit B01; proceed to next flagged misconception or TA-A04.

**P64 CONCEPTUAL SHIFT**
"The dot product pairs positions across vectors and multiplies each pair — never adds within a single vector first.

Rule: for position i, compute aᵢ × bᵢ. Then sum all of those products.

```
(1, 2)·(3, 4):
  Position 1: 1×3 = 3    ← pair across vectors, multiply
  Position 2: 2×4 = 8    ← pair across vectors, multiply
  Sum:        3+8 = 11   ← sum the products (not sum within one vector)
```

The incorrect approach (adding within vectors) gives 3×7=21, which is a completely different calculation."

**P49 ADAPTIVE CHECKPOINT**
Q: "Compute (3,2)·(1,4). What are the two paired products before you sum?"
→ CORRECT [3×1=3 and 2×4=8; sum=11]: "Correct — pair-multiply first, then sum." Exit B01 → B02 if flagged, else TA-A04.
→ INCORRECT: Repeat P64 with a visual diagram showing arrows from a₁ to b₁ and a₂ to b₂. After second failure, escalate.

---

### TA-B02 — Repair: DOT-PRODUCT-IS-VECTOR (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A frequent error is expecting the dot product to return a vector — for example, writing (2,3)·(4,5)=(8,15). This is actually the element-wise (Hadamard) product, a different operation. The dot product always collapses two vectors into one number."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "What does (2,3)·(4,5) produce: a vector (8,15), or a number?"
→ "A vector (8,15)": MC-2 DOT-PRODUCT-IS-VECTOR confirmed. Continue B02.
→ "A number": MC-2 not active. Exit B02 → B03 if flagged, else TA-A04.

**P64 CONCEPTUAL SHIFT**
"The dot product sums all paired products into one number. There is no final vector.

```
(2,3)·(4,5):
  Products:   2×4=8,  3×5=15
  Sum:        8+15 = 23   ← one number, the dot product
```

If you stop at (8,15) without summing, you have the element-wise product (written a⊙b), not the dot product a·b. The dot symbol · always means: multiply pairs, then add everything."

**P49 ADAPTIVE CHECKPOINT**
Q: "Compute (5,1)·(2,3). Is your answer a scalar or a vector?"
→ CORRECT [5×2+1×3=10+3=13; scalar]: "Correct — 13 is a scalar." Exit B02 → B03 if flagged, else TA-A04.
→ INCORRECT [returns vector (10,3)]: Re-present P64: "Sum the products 10+3." → re-prompt.

---

### TA-B03 — Repair: COSINE-FORMULA-ONLY (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Some learners recall only the geometric formula a·b=|a||b|cosθ and reach for magnitudes and angles even when components are given. Both formulas define the same operation — the component formula Σaᵢbᵢ is almost always faster when components are available."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "To compute (2,3)·(4,5), can you get the answer without finding |a|, |b|, or any angle?"
→ "No, I need the magnitudes or angle first": MC-3 confirmed. Continue B03.
→ "Yes": MC-3 not active. Exit B03 → TA-A04.

**P64 CONCEPTUAL SHIFT**
"The component formula needs nothing beyond the components themselves:
```
a·b = a₁b₁ + a₂b₂ + … + aₙbₙ

(2,3)·(4,5) = 2×4 + 3×5 = 8+15 = 23
```
No magnitudes. No angles. Just pair, multiply, sum.

The geometric formula a·b = |a||b|cosθ is equivalent and useful when you know the angle but not all components. When components are given — use the component formula."

**P49 ADAPTIVE CHECKPOINT**
Q: "Compute (1,2)·(2,1) using only the component formula. Do not compute any magnitudes."
→ CORRECT [1×2+2×1=2+2=4]: "Correct — 4. Components only." Exit B03 → TA-A04.
→ INCORRECT: Scaffold — "Position 1 product: 1×2=?" → guided re-prompt.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Component formula: pair-multiply-sum in 2D | (3,−1)·(2,4) = 6+(−4) = 2 |
| Day 3 | Scalar output + orthogonality check | Are (1,2) and (−2,1) orthogonal? (−2+2=0 → YES) |
| Day 7 | 3D dot product with negatives | (1,0,−1)·(2,3,2) = 2+0+(−2)=0 orthogonal? YES |
| Day 30 | Cross-context transfer | Work W=F·d: F=(5,0), d=(3,4) → W=15; why is the vertical force wasted? |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.linalg.vector (required): vectors are ordered n-tuples with positional slots; dot product pairs by position index
- math.arith.multiplication (required): multiply paired signed components; accumulate products

**Enables:**
- math.linalg.norm: ‖a‖ = √(a·a) — norm is the square root of the dot product of a vector with itself
- math.linalg.angle-vectors: cosθ = (a·b)/(|a||b|) — angle formula derived directly from dot product
- math.linalg.orthogonality: a ⊥ b defined by a·b = 0 — orthogonality is the zero dot product condition

**Cross-links (GR-8):**
- math.geom.dot-product (NOT Tier 1): geometric interpretation in coordinate geometry — P76 independence mode used (novel physics work probe, not the cross-linked concept)

---

## Component 8 — Teaching Notes

1. **Dimension guard:** Before any computation, confirm both vectors have the same number of components. Mismatched dimensions make the dot product undefined. If a learner attempts (2,3)·(4,5,1), stop and flag immediately.

2. **Signed products:** Require learners to write each signed product explicitly: (−2)×0=0, 3×(−2)=−6. Mental arithmetic skipping this step is the primary source of sign errors.

3. **Scalar zero vs. zero vector:** A dot product of 0 is the scalar zero — not the zero vector (0,0). When orthogonality is confirmed by a·b=0, emphasize the learner is reading a scalar.

4. **Geometric formula scope:** The formula a·b=|a||b|cosθ is the gateway to math.linalg.angle-vectors and math.linalg.orthogonality. Introduce it here as a complement, not a replacement, for the component formula. Full treatment belongs in those downstream blueprints.

5. **Physics hook:** Work = F·d grounds the abstraction. The fact that perpendicular force contributes zero work is a direct consequence of cos(90°)=0 in the geometric formula — a compelling motivator for why the dot product is not arbitrary.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.linalg.vector ✓, math.arith.multiplication ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02, A03) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A04 is terminal (no outbound TA link) | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A04 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A04 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 | PASS |
| V-11 | GR-9: math.geom.dot-product NOT Tier 1 → P76 independence (novel physics probe) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and in P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.90×5⌉ = 5/5 | PASS |
| V-14 | bloom=apply → P07 WORKED EXAMPLE PAIR present in TA-A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (physics work) | PASS |
| V-18 | MC-1 ADD-THEN-MULTIPLY designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
