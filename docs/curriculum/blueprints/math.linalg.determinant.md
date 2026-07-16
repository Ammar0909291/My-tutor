# Teaching Blueprint — math.linalg.determinant

## Component 0 — Metadata
concept_id: math.linalg.determinant
concept_name: Determinant
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 6
mastery_threshold: 0.90
CPA_entry_stage: P
requires: [math.linalg.matrix-multiplication]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** The determinant det(A) is a scalar function on square matrices satisfying: (1) multilinearity in rows, (2) alternating (swapping two rows changes the sign), (3) det(I)=1. For 2×2 matrices: det([[a,b],[c,d]])=ad−bc. Geometrically: |det(A)| is the area (2×2) or volume (3×3) of the parallelepiped formed by the rows; the sign encodes orientation. det(A)≠0 if and only if A is invertible.

**Conceptual progression:**
1. 2×2 determinant: ad−bc — the "cross-multiply" formula; derive from area of parallelogram.
2. Geometric meaning: |det| = area (2D) or volume (3D); sign = orientation (positive=counterclockwise, negative=clockwise).
3. Row operations and sign: swapping rows changes the sign; scaling a row scales det; adding a multiple of one row to another leaves det unchanged.
4. 3×3 determinant: cofactor expansion along any row (or column); choose the row with zeros for efficiency.
5. Invertibility criterion: det(A)=0 ↔ rows are linearly dependent ↔ A is not invertible.
6. Product rule: det(AB)=det(A)·det(B). Consequence: det(A⁻¹)=1/det(A).

**CPA arc (entry: P):**
- Pictorial: parallelogram formed by row vectors (a,b) and (c,d) in the plane; area computed by the formula; graph of how scaling/shearing transforms change area
- Abstract: 2×2 formula ad−bc; 3×3 cofactor expansion formula; property det(AB)=det(A)det(B)

**Prior knowledge activated:** matrix multiplication (AB requires compatible dimensions and row-column products); inverse matrix concept (AA⁻¹=I); area of a parallelogram (base × height); signed quantities

---

## Component 2 — Misconception Registry

### MC-1: DETERMINANT-IS-JUST-A-FORMULA [FOUNDATIONAL]
**Description:** Learner applies the 2×2 formula ad−bc mechanically without understanding what the determinant measures. Cannot connect det=0 to non-invertibility or give geometric meaning to |det|.
**Surface form:** "det([[3,1],[2,4]])=3×4−1×2=10. Done." (No mention of area, orientation, or invertibility.)
**Root cause:** The formula is easy to apply; the geometric interpretation requires connecting a scalar output to an area — a non-obvious step.
**Trigger condition:** Any problem asking why det(A)=0 matters, or asking for the geometric meaning of the determinant.
**Repair target:** TA-B01.

### MC-2: DET(A+B)=DET(A)+DET(B) [FOUNDATIONAL alternate]
**Description:** Learner incorrectly applies linearity to the whole determinant: det(A+B)=det(A)+det(B). Confuses this with the valid property det(AB)=det(A)det(B). The determinant IS linear in each ROW separately, but NOT linear in the entire matrix.
**Surface form:** "det(A+B) = det(A)+det(B) because determinants are linear."
**Root cause:** Linear operations like trace satisfy tr(A+B)=tr(A)+tr(B). Learner imports this pattern to det without verifying. The distinction between row-multilinearity and full-matrix-additivity is subtle.
**Trigger condition:** Any problem comparing det(A+B) with det(A)+det(B).
**Repair target:** TA-B02.

### MC-3: ZERO-DETERMINANT-MEANS-ZERO-MATRIX
**Description:** Learner believes det(A)=0 implies A is the zero matrix, or that A is "trivial/empty" in some sense. Does not understand that det(A)=0 means linear dependence of rows — A can be a nonzero matrix with a zero determinant.
**Surface form:** "det(A)=0 so A must be the zero matrix."
**Root cause:** In scalar arithmetic, only 0 has det/value=0 in the trivial sense. The learner has not yet met non-trivial matrices with zero determinant. The concept of linear dependence has not been linked to det=0.
**Trigger condition:** Any problem where a nonzero matrix has zero determinant (e.g., [[1,2],[2,4]]).
**Repair target:** TA-B01.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Compute the matrix product [[1,2],[3,4]]×[[5,6],[7,8]]." If the learner correctly computes [[19,22],[43,50]], matrix multiplication is active and they are ready for A01. If not, briefly review from math.linalg.matrix-multiplication.

**Scaffolding ladder:**
- Rung 1 (pictorial): Show the parallelogram for rows (1,0) and (0,1) — area=1=det(I). Then (2,0) and (0,3) — area=6=det([[2,0],[0,3]]). Learner reads area from the picture.
- Rung 2 (partial abstract): Learner applies the 2×2 formula ad−bc to three given matrices, then checks one geometrically using the parallelogram picture.
- Rung 3 (full abstract): Learner does a 3×3 cofactor expansion independently, choosing the most efficient row.

**Pacing note:** h=6 estimated hours; A01–A02 in session 1; A03 + mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — INVERTIBLE MATRIX (det ≠ 0):
Example: A = [[3,1],[2,4]].
det(A) = 3×4 − 1×2 = 12 − 2 = 10.
Geometric: rows as vectors (3,1) and (2,4). The parallelogram they form has AREA = |10| = 10.
The rows point in genuinely different directions → the parallelogram is non-degenerate → A is invertible.
det(A⁻¹) = 1/10.

PAIR B — SINGULAR MATRIX (det = 0):
Example: B = [[1,2],[2,4]].
det(B) = 1×4 − 2×2 = 4 − 4 = 0.
Geometric: rows as vectors (1,2) and (2,4). But (2,4) = 2×(1,2) — row 2 is a scalar multiple of row 1. The "parallelogram" collapses to a LINE SEGMENT — area = 0.
Consequence: B maps the entire plane to a line. The transformation is NOT reversible → B is NOT invertible.

THE CRITICAL LINK:
det(A) = 0 ↔ rows are linearly dependent ↔ A collapses dimension ↔ A is NOT invertible.
det(A) ≠ 0 ↔ rows are linearly independent ↔ A preserves dimension ↔ A IS invertible.

SIGN OF THE DETERMINANT:
det > 0: the transformation preserves orientation (counterclockwise → counterclockwise).
det < 0: the transformation reverses orientation (like a reflection).
|det|: the scale factor for areas/volumes.

**Assessment primitive: P49**

PROBE: "For each matrix, compute the determinant, state whether it is invertible, and interpret the sign: (a) [[2,0],[0,3]], (b) [[1,2],[−1,−2]]."
- CORRECT: "(a) det=2×3−0=6>0. Invertible. Positive: orientation preserved. Rows (2,0) and (0,3) form a 6×1=6-area rectangle. (b) det=1×(−2)−2×(−1)=−2+2=0. Singular. Row 2=(−1,−2)=−1×(1,2). Rows are proportional — parallelogram collapses." → "Both correct. The geometric picture makes det=0 visually obvious — the rows are parallel."
- PARTIAL: Correct computations, no interpretation → "det(a)=6 ✓, det(b)=0 ✓. Now interpret: 6≠0 → invertible; 0 → singular. Geometric: rows of (b) are (1,2) and (−1,−2)=(−1)×(1,2) — same direction, zero area parallelogram."
- INCORRECT: det(a)=5 → "ad−bc: a=2,b=0,c=0,d=3. det=2×3−0×0=6−0=6."
- NO_RESPONSE: "2×2 formula: det([[a,b],[c,d]])=ad−bc. For (a): a=2,b=0,c=0,d=3. Multiply the diagonal, subtract the off-diagonal product."

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — 2×2 determinant with geometric verification:
"A = [[3,1],[2,4]]. Compute det(A) and verify using the parallelogram area."

STEP 1 — Formula:
det(A) = 3×4 − 1×2 = 12 − 2 = 10.

STEP 2 — Geometric verification:
Rows as vectors: u=(3,1) and v=(2,4). Place them at the origin.
Area of parallelogram = |u||v|sin(θ), where θ is the angle between them.
Alternatively: the "shoelace" formula for a parallelogram with one vertex at origin and adjacent vertices at u=(3,1) and v=(2,4):
Area = |3×4 − 1×2| = |10| = 10. ✓ Matches the formula.

STEP 3 — Invertibility:
det(A) = 10 ≠ 0 → A is invertible.
A⁻¹ = (1/10)[[4,−1],[−2,3]]. Verify: A×A⁻¹ = I (can be checked by multiplication).

WORKED EXAMPLE 2 — 3×3 cofactor expansion:
"B = [[1,2,3],[4,5,6],[7,8,9]]. Compute det(B) by expansion along row 1."

STEP 1 — Cofactor expansion along row 1:
det(B) = 1·M₁₁ − 2·M₁₂ + 3·M₁₃
where Mᵢⱼ = determinant of the 2×2 matrix obtained by deleting row i and column j.

STEP 2 — Compute each minor:
M₁₁ = det([[5,6],[8,9]]) = 5×9 − 6×8 = 45 − 48 = −3.
M₁₂ = det([[4,6],[7,9]]) = 4×9 − 6×7 = 36 − 42 = −6.
M₁₃ = det([[4,5],[7,8]]) = 4×8 − 5×7 = 32 − 35 = −3.

STEP 3 — Combine:
det(B) = 1×(−3) − 2×(−6) + 3×(−3) = −3 + 12 − 9 = 0.

STEP 4 — Interpretation:
det(B) = 0 → B is SINGULAR. Geometric: the three rows lie in a 2D plane (they are linearly dependent: row 3 = 2×row 2 − row 1). The "parallelepiped" has zero volume.

**Assessment primitive: P49**

PROBE: "Compute det([[2,1,0],[3,0,2],[−1,2,1]]) by expansion along row 1. Is the matrix invertible?"
- CORRECT: "M₁₁=det([[0,2],[2,1]])=0−4=−4. M₁₂=det([[3,2],[−1,1]])=3+2=5. M₁₃=det([[3,0],[−1,2]])=6−0=6. det=2(−4)−1(5)+0(6)=−8−5+0=−13. det≠0 → invertible." → "Excellent. All three minors correct, signs applied correctly, invertibility identified."
- PARTIAL: Correct minors, sign error in expansion → "Minor M₁₁=−4 and M₁₂=5 are correct. Check the sign pattern for row 1 expansion: +M₁₁, −M₁₂, +M₁₃. The alternating sign pattern (checkerboard) is +−+ for row 1. Apply: 2(−4)−1(5)+0=−13."
- INCORRECT: Cannot set up minors → "To find M₁₁: delete row 1 and column 1 from the matrix. What 2×2 matrix remains? Compute its determinant. Repeat for M₁₂ (delete row 1, column 2) and M₁₃ (delete row 1, column 3)."
- NO_RESPONSE: "Start with the top-left entry: 2. Delete its row and column — what 2×2 matrix is left? Find its det. Multiply by 2. Then handle the 1 in position (1,2), and the 0 in position (1,3)."

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: Determinant properties — building a toolkit.

PROPERTY 1 — Row swap changes sign:
A = [[1,2],[3,4]], det(A) = −2.
Swap rows: A' = [[3,4],[1,2]], det(A') = 3×2 − 4×1 = 2 = −det(A). ✓

PROPERTY 2 — Row scaling multiplies det:
B = [[2,4],[3,4]] (= row 1 of A scaled by 2), det(B) = 8 − 12 = −4 = 2×det(A). ✓
General: scaling one row by k multiplies det(A) by k.

PROPERTY 3 — Row replacement leaves det unchanged:
Add 2×row 1 to row 2 of A: A'' = [[1,2],[5,8]], det(A'') = 8 − 10 = −2 = det(A). ✓
This is why Gaussian elimination (which uses row replacements) doesn't require tracking det changes from replacements — only swaps and scalings matter.

PROPERTY 4 — Product rule: det(AB) = det(A)·det(B).
Example: A = [[1,2],[3,4]] (det=−2), B = [[2,0],[1,3]] (det=6).
AB = [[4,6],[10,12]], det(AB) = 48 − 60 = −12 = (−2)×6. ✓
Consequence: det(A⁻¹) = 1/det(A) (since det(A)·det(A⁻¹) = det(I) = 1).

PROPERTY 5 — Determinant NOT additive:
det(A+B) ≠ det(A) + det(B) in general.
A=[[1,0],[0,1]] (det=1), B=[[1,0],[0,1]] (det=1).
A+B=[[2,0],[0,2]], det(A+B)=4 ≠ 1+1=2. Counterexample established.

GENERALISED PATTERN:
The determinant is a multiplicative function on matrices. Row operations let you reduce any matrix to echelon form, tracking sign changes (swaps) and scale factors to compute det from the diagonal product.

**Assessment primitive: P49**

PROBE: "A and B are 2×2 matrices with det(A)=3 and det(B)=−2. Compute: (a) det(AB), (b) det(A²), (c) det(A⁻¹)."
- CORRECT: "(a) det(AB)=3×(−2)=−6. (b) det(A²)=det(A)²=9. (c) det(A⁻¹)=1/3." → "All three correct. The product rule extends to powers: det(Aⁿ)=(det A)ⁿ."
- PARTIAL: (a) correct, (b) and (c) wrong → "(b) A²=A×A, so det(A²)=det(A)×det(A)=9. (c) A×A⁻¹=I, so det(A)×det(A⁻¹)=det(I)=1, giving det(A⁻¹)=1/det(A)=1/3."
- INCORRECT: det(A+B)=1 (adds scalars instead of multiplying) → "The product rule is det(AB)=det(A)×det(B). Note: it is for PRODUCTS, not SUMS. det(A)×det(B)=3×(−2)=−6."
- NO_RESPONSE: "The product rule states det(AB)=det(A)×det(B). What is 3×(−2)?"

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 and MC-3 (NO-GEOMETRIC-MEANING / ZERO-MEANS-ZERO-MATRIX)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"Two connected gaps: treating the determinant as just a formula with no geometric content, and thinking det=0 means the matrix must be zero. The determinant measures area/volume change — connecting it to geometry makes det=0 immediately visual."

**P41 — MISCONCEPTION DETECTOR**
"The matrix C=[[1,2],[2,4]]. Compute det(C). What does it tell you about C?
(A) det=0, so C must be the zero matrix.
(B) det=0 even though C≠0; this means the rows are parallel — C collapses 2D to 1D."
[If A: learner holds MC-3.]
"The rows of C are (1,2) and (2,4). Draw these as arrows. What shape do they form?
(A) A parallelogram with positive area.
(B) They point in the same direction — no parallelogram, zero area."
[If B is not immediately obvious: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"The determinant = SIGNED AREA of the parallelogram formed by the rows.
C=[[1,2],[2,4]]: row 2=(2,4)=2×(1,2)=2×row 1. Same direction → no parallelogram → zero area → det=0.
C is NOT the zero matrix (its entries are 1,2,2,4) — yet det(C)=0 because the rows are proportional.
Geometric interpretation: C squashes the plane onto a single line. Every point ends up on the line spanned by (1,2). This is irreversible — you can't recover the original 2D information. That is why det=0 ↔ non-invertible ↔ linear dependence of rows."

---

### TA-B02 — Repair for MC-2 (DET(A+B)≠DET(A)+DET(B))

**Opening primitive: P27 — MISCONCEPTION NAMING**
"A natural but false analogy: the trace is linear (tr(A+B)=tr(A)+tr(B)), so learners expect det to also be additive. It is NOT. The determinant is linear in each ROW separately, but adding two matrices and taking det gives a completely different result from adding their determinants."

**P41 — MISCONCEPTION DETECTOR**
"A=[[1,0],[0,1]] (det=1), B=[[1,0],[0,1]] (det=1). Compute det(A+B).
(A) det(A+B)=det(A)+det(B)=1+1=2.
(B) A+B=[[2,0],[0,2]], det(A+B)=4≠2."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"det(A+B)=4 ≠ 2=det(A)+det(B). This is a clean counterexample — two identity matrices, easiest possible case, yet additivity fails.
The CORRECT product property is: det(AB)=det(A)×det(B) (multiplication, not addition).
Why does row-multilinearity not give full matrix additivity? Because adding two matrices changes ALL rows simultaneously, and the determinant is multilinear in one row at a time (while holding others fixed). Changing all rows creates cross-terms that break simple additivity.
The only safe formula is det(AB)=det(A)det(B). Do not transpose it to addition."

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Let A=[[2,3],[1,4]]. (a) Compute det(A). (b) Find det(2A). (c) Find det(A²)."
[Expected: (a) 8−3=5. (b) det(2A)=2²×det(A)=4×5=20 (scaling each of the 2 rows by 2 scales det by 2²). (c) det(A²)=25.]

**Day 10 prompt:**
"Compute det([[2,−1,3],[0,4,1],[0,0,5]]) without full cofactor expansion. What shortcut applies?"
[Expected: Upper triangular matrix — det = product of diagonal entries = 2×4×5=40. The row operations that create zeros below the diagonal are row replacements (which don't change det), so the final triangular matrix has the same det as the original.]

**Day 30 prompt:**
"Explain why det(AB)=det(A)det(B) implies that if A is invertible, det(A⁻¹)=1/det(A). Then explain why det(A)=0 implies A cannot be invertible."
[Expected: Since AA⁻¹=I: det(AA⁻¹)=det(I)=1, so det(A)det(A⁻¹)=1, giving det(A⁻¹)=1/det(A). If det(A)=0: suppose A were invertible with inverse B; then det(A)det(B)=det(AB)=det(I)=1, so 0×det(B)=1 — contradiction. So det(A)=0 → A is not invertible.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.linalg.matrix-multiplication — matrix product AB; cofactor expansion involves 2×2 sub-products; product rule requires AB

**Unlocked blueprints:**
- math.linalg.matrix-inverse — A⁻¹ exists iff det(A)≠0; inversion formula (1/det)×adj(A)
- math.linalg.eigenvalues — characteristic polynomial det(A−λI)=0 defines eigenvalues
- math.linalg.cramer-rule — uses det to solve Ax=b

**Cross-links (none):**
- cross_links=[] — no Tier-1 cross-links

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The geometric interpretation (area/volume scaling) is what makes the determinant meaningful rather than a formula. Invest in the parallelogram picture in A01 — it provides the visual justification for why det=0 means non-invertibility.

**Cofactor expansion efficiency:** For a 3×3 matrix, always expand along the row or column with the most zeros. If the matrix is upper triangular, the determinant is simply the product of diagonal entries — highlight this shortcut explicitly.

**Product rule vs. sum failure:** Explicitly contrast det(AB)=det(A)det(B) (TRUE) with det(A+B)≠det(A)+det(B) (FALSE) in A03, as in TA-B02. Both statements are memorable, and the false one must be actively rejected.

**Row operations and computation:** Gaussian elimination + tracking row swaps and scalings provides the most efficient general computation for larger matrices. This will be formalised in cofactor-expansion and det-properties successor blueprints.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P06, A02: P07, A03: P04
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01 and B02 comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence (cross_links=[]); P76 uses independent novel problem (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 present in A02 (GR — apply requires worked example pair)
- [x] V-12: Misconception registry has ≥3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC; B01 covers MC-1 and MC-3; B02 covers MC-2
- [x] V-14: P76 independence probe is a novel, unseen problem (area of image of unit square under A=[[2,1],[1,2]], invertibility, det(A⁻¹))
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.90 × 5⌉ = ⌈4.5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: No curriculum content generated outside the Canonical KG description; all mathematical content consistent with KG fields and standard linear algebra pedagogy; no fabricated identities or misleading claims

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.90 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Compute det([[4,2],[3,5]])."
[Expected: 4×5 − 2×3 = 20 − 6 = 14.]

**Item 2:**
"The matrix M=[[2,4],[1,2]]. Compute det(M). Is M invertible?"
[Expected: det(M)=2×2−4×1=4−4=0. Not invertible. Row 2=(1,2)=(1/2)×row 1 — linearly dependent rows.]

**Item 3:**
True or False: "det(A+B)=det(A)+det(B) for all 2×2 matrices A and B."
[Expected: FALSE. Counterexample: A=B=I, det(A)=det(B)=1, but det(A+B)=det(2I)=4≠1+1=2.]

**Item 4:**
"If det(A)=4 and det(B)=−3, what is det(AB)?"
[Expected: det(AB)=det(A)×det(B)=4×(−3)=−12.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"A linear map T: ℝ²→ℝ² has matrix A=[[2,1],[1,2]].

(a) Compute det(A).
(b) The unit square has corners at (0,0), (1,0), (0,1), (1,1). After applying T, the image has corners T(0,0)=(0,0), T(1,0)=(2,1), T(0,1)=(1,2), T(1,1)=(3,3). What is the area of the image parallelogram?
(c) Is A invertible? If so, what is det(A⁻¹)?"

[Expected:
(a) det(A)=2×2−1×1=3.
(b) Area of image = |det(A)| × area of original = 3 × 1 = 3. (The determinant gives the area scale factor.)
(c) det(A)=3≠0 → A is invertible. det(A⁻¹)=1/det(A)=1/3.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (a) correct (det=3) and (c) correct (invertible, det(A⁻¹)=1/3) with the area answer in (b) stated as 3. Award 0 if det(A) wrong or invertibility conclusion wrong.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: 5 out of 5 (MAMR = ⌈0.90 × 5⌉ = 5).
- PASS (5/5): Learner can compute 2×2 determinants, identify singular matrices, apply the product rule, disprove additivity, and interpret det geometrically as an area scale factor.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS (5/5): → P78 COMPLETION
- FAIL on Item 2 (det=0 doesn't mean zero matrix): → TA-B01 (MC-3 repair)
- FAIL on Item 3 (false additivity): → TA-B02 (MC-2 repair)
- FAIL on Item 1 (formula error): → Review A02 WE1; re-gate
- FAIL on Item 4 (product rule not applied): → Review A03 Property 4; re-gate
- FAIL on P76 (no geometric interpretation): → TA-B01 (MC-1 — geometric meaning repair)
- FAIL on multiple items: → TA-B01 then TA-B02; re-gate with two fresh items + P76

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated ability to compute determinants, apply the product rule, identify singular matrices, and interpret the determinant geometrically as an area/volume scale factor.

Key anchors to carry forward:
- 2×2: det([[a,b],[c,d]])=ad−bc; geometric: area of parallelogram formed by rows.
- det(A)=0 ↔ rows linearly dependent ↔ A singular (not invertible) ↔ area/volume collapses to 0.
- Product rule: det(AB)=det(A)det(B). Consequence: det(A⁻¹)=1/det(A).
- det(A+B) ≠ det(A)+det(B) in general — additivity is FALSE.
- 3×3: cofactor expansion along the row/column with the most zeros.

Next concepts: math.linalg.matrix-inverse — explicit formula for A⁻¹ using the adjugate; math.linalg.eigenvalues — characteristic equation det(A−λI)=0."
