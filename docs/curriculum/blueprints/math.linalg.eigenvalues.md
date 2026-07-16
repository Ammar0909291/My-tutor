# Teaching Blueprint — math.linalg.eigenvalues

## Component 0 — Metadata
concept_id: math.linalg.eigenvalues
concept_name: Eigenvalues and Eigenvectors
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 6
mastery_threshold: 0.90
CPA_entry_stage: P
requires: [math.linalg.matrix-multiplication, math.linalg.determinant]
cross_links: [math.de.char-equation, math.fnal.spectral-theory]
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** A nonzero vector v is an eigenvector of a square matrix A with eigenvalue λ if Av=λv — the matrix maps v to a scalar multiple of itself. Eigenvalues are found by solving the characteristic equation det(A−λI)=0. For each eigenvalue λ, the eigenspace ker(A−λI) contains all eigenvectors with that eigenvalue (plus the zero vector). Geometrically: eigenvectors are the FIXED DIRECTIONS of the linear transformation — only their scale changes, not their direction.

**Conceptual progression:**
1. Geometric idea: most transformations rotate AND scale vectors; eigenvectors are the special directions that are only SCALED (no rotation).
2. Definition: Av=λv, v≠0. λ is the eigenvalue (how much scaling); v is the eigenvector (the fixed direction).
3. Finding eigenvalues: Av=λv ↔ (A−λI)v=0 has a nonzero solution ↔ det(A−λI)=0 (characteristic equation).
4. Finding eigenvectors: for each λ, solve (A−λI)v=0 — find the null space (eigenspace) of (A−λI).
5. Characteristic polynomial: det(A−λI) is a degree-n polynomial in λ; its roots are the eigenvalues.
6. Eigenvalues may be complex: rotation matrices over ℝ have no real eigenvalues; complex roots pair as conjugates.

**CPA arc (entry: P):**
- Pictorial: diagram of a vector before and after transformation showing scale-only (eigenvector) vs. rotation+scale (non-eigenvector); parallelogram of det(A−λI)=0 collapsing
- Abstract: characteristic equation det(A−λI)=0; null space (A−λI)v=0; eigenspace notation Eλ=ker(A−λI)

**Prior knowledge activated:** matrix multiplication (Av for a vector v); determinant (det(A−λI) is a polynomial in λ); solving linear equations (null space of (A−λI)); polynomial roots

---

## Component 2 — Misconception Registry

### MC-1: EIGENVECTOR-CAN-BE-ZERO [FOUNDATIONAL]
**Description:** Learner accepts v=(0,0) or v=(0,0,0) as a valid eigenvector. Does not apply (or understand) the nonzero requirement in the definition Av=λv, v≠0.
**Surface form:** "For any matrix A and any λ, the zero vector satisfies Av=λv, so it's an eigenvector."
**Root cause:** Algebraically, A·0=λ·0=0 for every A and λ — the zero vector satisfies the equation. The nonzero requirement is an explicit exclusion that must be stated and justified.
**Trigger condition:** Any problem asking for eigenvectors of a given eigenvalue.
**Repair target:** TA-B01.

### MC-2: EIGENVALUES-ARE-DIAGONAL-ENTRIES
**Description:** Learner reads off the diagonal entries of A as its eigenvalues, skipping the characteristic equation. Correct only for diagonal matrices; wrong in general.
**Surface form:** "A=[[3,1],[0,2]]. Eigenvalues are 3 and 2 because those are on the diagonal." (True here but for the wrong reason — coincidence that A is upper triangular.)
**Root cause:** For diagonal and triangular matrices, diagonal entries ARE eigenvalues. Learner generalises this shortcut without realising it fails for non-triangular matrices.
**Trigger condition:** Any non-diagonal matrix problem asking for eigenvalues.
**Repair target:** TA-B01.

### MC-3: EIGENVECTORS-ARE-UNIQUE
**Description:** Learner believes each eigenvalue has exactly one eigenvector. Does not understand that the eigenspace is a subspace — any nonzero scalar multiple of an eigenvector is also an eigenvector with the same eigenvalue.
**Surface form:** "The eigenvector for λ=3 is (1,0). There's only one."
**Root cause:** The characteristic equation gives a unique eigenvalue, so learner assumes a unique eigenvector follows. The distinction between "unique solution" (to a full-rank system) and "eigenspace" (null space, always at least one-dimensional) is not yet clear.
**Trigger condition:** Any problem asking for the eigenspace or all eigenvectors for a given eigenvalue.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Compute det([[3−λ, 1],[0, 2−λ]])." If the learner correctly expands to (3−λ)(2−λ) = λ²−5λ+6, the prerequisites (determinant of a matrix with a parameter, polynomial multiplication) are active. Proceed to A01.

**Scaffolding ladder:**
- Rung 1 (pictorial): Diagram showing a scaling-only transformation (the stretch along one axis). Learner identifies which vectors are scaled without rotation.
- Rung 2 (partial abstract): Learner sets up (A−λI), computes its determinant symbolically, and factors the characteristic polynomial.
- Rung 3 (full abstract): Learner solves (A−λI)v=0 for each eigenvalue and writes the eigenspace.

**Pacing note:** h=6 estimated hours; A01–A02 in session 1; A03 + mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Stretching a rubber band.
"Imagine pulling a rubber band in the x-direction only. All points move right — but only along the x-axis. The x-axis direction is 'special': applying the stretch leaves x-direction arrows pointing the same way, just longer. Any other direction (diagonal, upward) gets deflected sideways too."

TARGET DOMAIN: A linear transformation with matrix A.
For most vectors v: Av points in a DIFFERENT DIRECTION than v (rotated and scaled).
For EIGENVECTORS v: Av = λv — same direction, just scaled by λ.

EXAMPLE: A = [[2, 0],[0, 3]] (diagonal matrix — different scaling on each axis).
- v₁=(1,0): Av₁=(2,0)=2v₁. Direction unchanged, scaled by 2. EIGENVECTOR, λ=2.
- v₂=(0,1): Av₂=(0,3)=3v₂. Direction unchanged, scaled by 3. EIGENVECTOR, λ=3.
- v₃=(1,1): Av₃=(2,3). Is (2,3)=λ(1,1) for some λ? That needs 2=λ and 3=λ simultaneously — impossible. NOT an eigenvector.

ANALOGY MAPPING:
| Rubber band stretch | Linear transformation |
|---|---|
| x-axis direction (unchanged direction) | Eigenvector |
| Stretch factor | Eigenvalue λ |
| Diagonal direction (deflected sideways) | Non-eigenvector |
| "Fixed direction" under the operation | Characteristic direction of A |

DEFINITION:
A nonzero vector v is an eigenvector of A with eigenvalue λ if Av = λv.
The nonzero requirement excludes v=0 (which trivially satisfies A·0=λ·0 for all λ but carries no geometric information about A's "fixed directions").

**Assessment primitive: P49**

PROBE: "A = [[5,0],[0,−2]]. Is v₁=(1,0) an eigenvector? Is v₂=(1,1)? What are the eigenvalues?"
- CORRECT: "v₁=(1,0): Av₁=(5,0)=5v₁ ✓, eigenvalue λ=5. v₂=(1,1): Av₂=(5,−2). Is (5,−2)=λ(1,1)? Needs 5=λ and −2=λ — impossible. NOT an eigenvector. Eigenvalues from diagonal entries (diagonal matrix): λ=5 and λ=−2." → "Correct. For diagonal matrices, the standard basis vectors are always eigenvectors and the diagonal entries are the eigenvalues. This is the simplest case."
- PARTIAL: Correct v₁, wrong on v₂ → "v₂=(1,1): Av₂=(5,−2). For v₂ to be an eigenvector, we need (5,−2)=λ(1,1) for SOME single λ. That means 5=λ·1 and −2=λ·1 simultaneously — two different values for λ. Impossible. v₂ is not an eigenvector."
- INCORRECT: Claims v₂=(1,1) is an eigenvector with λ=5 → "Check: A(1,1)=(5,−2). Is (5,−2) a scalar multiple of (1,1)? That would require (5,−2)=(λ,λ) for some λ — but 5≠−2. So no."
- NO_RESPONSE: "Compute A×v₁ and A×v₂ (matrix-vector products). Then check: is the result a scalar multiple of the input vector? If yes: eigenvector. If no: not."

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Distinct real eigenvalues.
"Find the eigenvalues and eigenvectors of A = [[3,1],[0,2]]."

STEP 1 — Characteristic equation:
det(A−λI) = det([[3−λ,1],[0,2−λ]]) = (3−λ)(2−λ) − 0 = (3−λ)(2−λ).
Set to 0: (3−λ)(2−λ)=0 → λ₁=3, λ₂=2.

STEP 2 — Eigenvector for λ₁=3:
(A−3I)v=0: [[0,1],[0,−1]]v=0 → equation: 0·v₁+1·v₂=0 → v₂=0; v₁ is free.
Eigenvector: v₁=(1,0) (choosing v₁=1).
Eigenspace: E₃ = span{(1,0)}.

STEP 3 — Eigenvector for λ₂=2:
(A−2I)v=0: [[1,1],[0,0]]v=0 → equation: v₁+v₂=0 → v₁=−v₂; v₂ is free.
Eigenvector: v₂=(−1,1) (choosing v₂=1).
Eigenspace: E₂ = span{(−1,1)}.

STEP 4 — Verify:
A(1,0)=(3,0)=3(1,0) ✓. A(−1,1)=(−2,2)=2(−1,1) ✓.

WORKED EXAMPLE 2 — Repeated eigenvalue (eigenspace may be 2D).
"Find the eigenvalues and eigenvectors of B = [[2,0],[0,2]] = 2I."

STEP 1 — Characteristic equation:
det(2I−λI) = det([[(2−λ),0],[0,(2−λ)]]) = (2−λ)² = 0 → λ=2 (repeated, multiplicity 2).

STEP 2 — Eigenspace for λ=2:
(B−2I)v=0: 0v=0 → every vector satisfies this. Eigenspace = all of ℝ².
Any nonzero vector is an eigenvector of 2I with eigenvalue 2.
B=2I scales everything by 2 — no direction is preferred; all are "fixed" in direction.

STEP 3 — Geometric meaning:
B uniformly scales the entire plane. There are infinitely many eigenspaces (all of ℝ²), but one eigenvalue: λ=2. The eigenspace is two-dimensional — not one-dimensional as usual.

**Assessment primitive: P49**

PROBE: "Find the eigenvalues and one eigenvector for each eigenvalue of C=[[1,2],[2,1]]."
- CORRECT: "det(C−λI)=det([[1−λ,2],[2,1−λ]])=(1−λ)²−4=λ²−2λ−3=(λ−3)(λ+1)=0. λ₁=3, λ₂=−1.
For λ₁=3: (C−3I)v=[[−2,2],[2,−2]]v=0 → v₁=v₂ → eigenvector (1,1).
For λ₂=−1: (C+I)v=[[2,2],[2,2]]v=0 → v₁=−v₂ → eigenvector (1,−1).
Verify: C(1,1)=(3,3)=3(1,1) ✓; C(1,−1)=(−1,1)=−(1,−1) ✓." → "Complete and verified. Note C is symmetric — eigenvectors (1,1) and (1,−1) are perpendicular. Symmetric matrices always have perpendicular eigenvectors."
- PARTIAL: Correct eigenvalues, error in eigenvectors → "Eigenvalues λ=3,−1 ✓. For λ=3: (C−3I)=[[−2,2],[2,−2]]. Both rows give −v₁+v₂=0, so v₂=v₁. Eigenvector: (1,1)."
- INCORRECT: Reads off diagonal: eigenvalues are 1 and 1 → Address MC-2: "C is NOT diagonal — you must use det(C−λI)=0. The diagonal entries 1 and 1 are NOT the eigenvalues here. Compute det([[1−λ,2],[2,1−λ]])=(1−λ)²−4. This equals zero when λ=3 or λ=−1."
- NO_RESPONSE: "Step 1: form C−λI by subtracting λ from each diagonal entry. Step 2: compute its determinant (you'll get a polynomial in λ). Step 3: set equal to 0 and solve for λ."

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: Properties of eigenvalues across different matrix types.

INSTANCE 1 — Triangular matrix:
A = [[4,2],[0,−1]]. Characteristic polynomial: (4−λ)(−1−λ)=0. Eigenvalues: λ=4,−1.
PATTERN: For upper (or lower) triangular matrices, the eigenvalues are exactly the diagonal entries.
WHY: det(A−λI) for a triangular matrix is the product of diagonal entries of (A−λI), which are (d₁−λ),(d₂−λ),…,(dₙ−λ).

INSTANCE 2 — Rotation matrix (no real eigenvalues):
R = [[0,−1],[1,0]] (90° counterclockwise rotation).
det(R−λI) = det([[−λ,−1],[1,−λ]]) = λ²+1 = 0 → λ=±i (complex, no real solutions).
PATTERN: A pure rotation has no real eigenvectors — no direction is left unchanged by a 90° rotation.

INSTANCE 3 — Projection matrix:
P = [[1,0],[0,0]] (projection onto x-axis).
det(P−λI) = (1−λ)(0−λ) = (1−λ)(−λ) = 0 → λ=1 and λ=0.
- λ=1: eigenvectors are the x-axis direction (1,0) — vectors ON the x-axis are unchanged.
- λ=0: eigenvectors are the y-axis direction (0,1) — vectors ON the y-axis are collapsed to 0 by projection.
PATTERN: Projection matrices have eigenvalues 0 (collapsed direction) and 1 (preserved direction).

GENERALISED PATTERN:
- Eigenvalues of A^k are λᵢᵏ (eigenvalues of the kth power are the kth powers).
- Eigenvalues of A+cI are λᵢ+c (shift adds c to all eigenvalues).
- det(A) = product of all eigenvalues (including multiplicity).
- tr(A) = sum of all eigenvalues.

**Assessment primitive: P49**

PROBE: "A is a 2×2 matrix with eigenvalues λ=4 and λ=−1. (a) What is det(A)? (b) What is tr(A)? (c) If A has eigenvector (1,2) for λ=4, is 3(1,2)=(3,6) also an eigenvector for λ=4?"
- CORRECT: "(a) det(A)=4×(−1)=−4. (b) tr(A)=4+(−1)=3. (c) Yes: A(3,6)=3·A(1,2)=3·(4,8)=12(1,2)+... wait: A(3,6)=3A(1,2)=3·4(1,2)=12(1,2)=4·3(1,2)=4(3,6). So 3(1,2) is an eigenvector with λ=4." → "All three correct. The det/trace formulas and eigenspace closure under scaling are key properties."
- PARTIAL: (a) and (b) correct, unsure about (c) → "Yes — any nonzero scalar multiple of an eigenvector is also an eigenvector with the SAME eigenvalue. A(cv)=c·Av=c·λv=λ(cv). The eigenspace is closed under scalar multiplication."
- INCORRECT: det(A)=4+(−1)=3 (adds instead of multiplies) → "det = PRODUCT of eigenvalues: 4×(−1)=−4. TRACE = SUM of eigenvalues: 4+(−1)=3. Product for det, sum for trace."
- NO_RESPONSE: "Two useful formulas for n×n matrices: det(A)=λ₁λ₂…λₙ (product of all eigenvalues). tr(A)=λ₁+λ₂+…+λₙ (sum of all eigenvalues). Apply these to the two eigenvalues λ=4 and λ=−1."

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 and MC-2 (ZERO-EIGENVECTOR / DIAGONAL-ENTRIES-ARE-EIGENVALUES)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"Two fundamental errors about eigenvalues/eigenvectors. First: accepting the zero vector as an eigenvector. Second: reading eigenvalues from the diagonal without computing the characteristic equation. Both lead to incorrect results."

**P41 — MISCONCEPTION DETECTOR**
"Is the zero vector v=(0,0) an eigenvector of A=[[1,0],[0,2]] with λ=1?
(A) Yes — A(0,0)=1·(0,0)=(0,0) ✓.
(B) No — the definition requires v≠0."
[If A: learner holds MC-1.]
"For A=[[1,3],[2,4]], what are the eigenvalues?
(A) 1 and 4 (diagonal entries).
(B) Solve det(A−λI)=0 to find the actual eigenvalues."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"MC-1: The zero vector satisfies A·0=λ·0 for EVERY matrix A and EVERY scalar λ. It gives no information about A — it's a trivial, uninformative solution. The definition v≠0 is not arbitrary formalism; it excludes this useless degenerate case. An eigenvector must be a DIRECTION (arrows have direction; the zero vector has none).
MC-2: For diagonal matrices only, diagonal entries happen to be eigenvalues. For A=[[1,3],[2,4]]: det(A−λI)=(1−λ)(4−λ)−6=λ²−5λ−2=0. Eigenvalues: λ=(5±√33)/2 ≈ 5.37 or −0.37. Neither is 1 or 4. The characteristic equation is mandatory for non-diagonal matrices."

---

### TA-B02 — Repair for MC-3 (EIGENVECTORS-ARE-UNIQUE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"A common assumption: each eigenvalue has exactly one eigenvector. In fact, eigenvalues have an entire SUBSPACE of eigenvectors — the eigenspace — and any nonzero vector in that subspace is an eigenvector."

**P41 — MISCONCEPTION DETECTOR**
"For A=[[3,1],[0,2]] with eigenvalue λ=2, the eigenvector is (−1,1). Is 2(−1,1)=(−2,2) also an eigenvector with λ=2?
(A) No — there is only one eigenvector per eigenvalue.
(B) Yes — A(−2,2)=2·A(−1,1)=2·2(−1,1)=2(−2,2), so (−2,2) is also an eigenvector with λ=2."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"The eigenspace Eλ = {v : (A−λI)v=0} is the NULL SPACE of (A−λI). Null spaces are subspaces — they are SETS of vectors, not just one vector. For a 2×2 matrix with a simple eigenvalue, the eigenspace is a 1D subspace (a line through the origin). Every nonzero vector on that line is an eigenvector: if Av=λv and c≠0, then A(cv)=c·Av=c·λv=λ(cv). So cv is ALSO an eigenvector with the same λ. The conventional answer 'the eigenvector is (−1,1)' really means 'the eigenspace is span{(−1,1)} — all scalar multiples.' Any nonzero choice from this line works."

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Find the eigenvalues of A=[[2,1],[1,2]] and an eigenvector for each. Are the eigenvectors perpendicular?"
[Expected: char. poly. (2−λ)²−1=λ²−4λ+3=(λ−3)(λ−1)=0. λ=3: (1,1)/√2; λ=1: (1,−1)/√2. (1,1)·(1,−1)=0 ✓ — perpendicular. Symmetric matrices always have perpendicular eigenvectors.]

**Day 10 prompt:**
"A has eigenvalues 2 and 3 with eigenvectors v₁=(1,0) and v₂=(0,1). What is A?"
[Expected: Av₁=2v₁=(2,0) → first column of A is (2,0). Av₂=3v₂=(0,3) → second column is (0,3). A=[[2,0],[0,3]].]

**Day 30 prompt:**
"Why does a rotation matrix R_θ (rotation by angle θ ≠ 0°, 180°) have no real eigenvalues? What about θ=180°?"
[Expected: char. poly. of [[cos θ,−sin θ],[sin θ,cos θ]] is λ²−2(cos θ)λ+1=0. Discriminant: 4cos²θ−4=4(cos²θ−1)≤0 with equality only at θ=0°,180°. For θ≠0°,180°: discriminant<0 → no real roots. At θ=180°: R=−I, eigenvalue λ=−1, every nonzero vector is an eigenvector (everything flips direction).]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.linalg.matrix-multiplication — Av for a column vector v; required for computing Av=λv
- math.linalg.determinant — det(A−λI)=0 is the characteristic equation; determinant of a matrix with symbolic parameter λ

**Unlocked blueprints:**
- math.linalg.diagonalization — a matrix is diagonalizable if it has n linearly independent eigenvectors
- math.linalg.spectral-theorem — symmetric matrices have real eigenvalues and an orthonormal eigenvector basis

**Cross-links (non-Tier-1, reference only):**
- math.de.char-equation — the characteristic equation of an ODE system Ax=λx mirrors the matrix eigenvalue equation; eigenvalues give the exponents in e^{λt} solutions
- math.fnal.spectral-theory — eigenvalues generalise to infinite-dimensional linear operators (spectral theorem for compact/self-adjoint operators in functional analysis)

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The connection between Av=λv and det(A−λI)=0 is the central computational step — learners must understand WHY the determinant condition arises (the system (A−λI)v=0 has a nonzero solution iff A−λI is singular iff its det=0).

**Geometric emphasis:** Maintain the "fixed-direction" geometric language throughout. Eigenvalues describe HOW MUCH a direction is scaled; eigenvectors describe WHICH DIRECTION. A rotation matrix has no real eigenvectors — no real direction is left unchanged. This geometric test (does any direction survive unchanged?) precedes the algebra.

**Eigenspace awareness:** Actively resist the unique-eigenvector framing. Always say "an eigenvector" (not "the eigenvector") and always mention the eigenspace as the full subspace.

**Verification habit:** After finding eigenvalues and eigenvectors, always verify Av=λv by direct multiplication. This catches sign errors in the characteristic polynomial and reinforces the definition.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07, A03: P04
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01 and B02 comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: cross_links=[math.de.char-equation, math.fnal.spectral-theory] NOT Tier 1 → P76 independence mode (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 present in A02 (GR — apply requires worked example pair)
- [x] V-12: Misconception registry has ≥3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC; B01 covers MC-1 and MC-2; B02 covers MC-3
- [x] V-14: P76 independence probe is a novel, unseen problem (rotation matrix R=[[0,−1],[1,0]]; characteristic polynomial λ²+1=0; no real eigenvalues; geometric interpretation)
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
"Find the eigenvalues of A=[[4,1],[0,3]]."
[Expected: Upper triangular — characteristic polynomial (4−λ)(3−λ)=0. Eigenvalues: λ=4 and λ=3. (Also derivable from det(A−λI) directly.)]

**Item 2:**
"For A in Item 1, find an eigenvector for λ=3."
[Expected: (A−3I)v=[[1,1],[0,0]]v=0 → v₁+v₂=0 → v₁=−v₂. Eigenvector: (−1,1) (or any scalar multiple, e.g. (1,−1)).]

**Item 3:**
True or False: "The zero vector v=0 is an eigenvector of every matrix A."
[Expected: FALSE. The definition requires v≠0. Although A·0=λ·0 for all λ, the zero vector is explicitly excluded from the definition of eigenvector.]

**Item 4:**
"A 2×2 matrix has eigenvalues λ=5 and λ=−2. What is det(A)? What is tr(A)?"
[Expected: det(A)=5×(−2)=−10. tr(A)=5+(−2)=3.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"The matrix R = [[0,−1],[1,0]] represents a 90° counterclockwise rotation of the plane.

(a) Compute the characteristic polynomial det(R−λI).
(b) Do real eigenvalues exist? Solve for λ.
(c) A 90° rotation maps every vector to a new direction perpendicular to its original direction. Explain in one sentence why this is consistent with your answer to (b)."

[Expected:
(a) det([[−λ,−1],[1,−λ]]) = (−λ)(−λ)−(−1)(1) = λ²+1.
(b) λ²+1=0 → λ²=−1. No real solutions. Eigenvalues are complex: λ=±i.
(c) A 90° rotation has no real eigenvectors because no real direction is left pointing the same way (only scaled) — every real vector is rotated 90°, changing its direction. A fixed direction under a pure rotation would require the vector to point both in its original and rotated directions simultaneously, which is impossible for a nonzero real vector (unless the rotation is by 0° or 180°).]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (a) and (b) are correctly solved (λ²+1=0, no real eigenvalues) and (c) gives a correct geometric explanation. 0 if the characteristic polynomial is wrong or real eigenvalues are falsely claimed.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: 5 out of 5 (MAMR = ⌈0.90 × 5⌉ = 5).
- PASS (5/5): Learner can find eigenvalues via characteristic equation, compute eigenvectors via null space, correctly excludes the zero vector, and recognises that rotation matrices have no real eigenvectors.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS (5/5): → P78 COMPLETION
- FAIL on Item 3 (zero vector accepted): → TA-B01 (MC-1 repair)
- FAIL on Item 1 (diagonal entries read directly without char. eqn.): → TA-B01 (MC-2 repair; note it happens to work for triangular A but not in general)
- FAIL on Item 2 or P76 (eigenspace confusion): → TA-B02 (MC-3 repair; reinforce eigenspace as subspace)
- FAIL on Item 4 (det/trace formulas): → Return to A03 pattern; re-gate
- FAIL on multiple items: → TA-B01 then TA-B02; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated the ability to find eigenvalues via the characteristic equation and eigenvectors via null-space computation, and you understand the geometric meaning of eigenvectors as fixed directions under a linear transformation.

Key anchors to carry forward:
- Av=λv, v≠0 — the definition. Zero vector excluded always.
- det(A−λI)=0 — the characteristic equation; its roots are the eigenvalues.
- Eigenspace Eλ = ker(A−λI) — a subspace; any nonzero element is an eigenvector.
- det(A) = product of eigenvalues; tr(A) = sum of eigenvalues.
- Rotation matrices have no real eigenvectors — complex eigenvalues ±i.

Next concepts: math.linalg.diagonalization — when A = PDP⁻¹ (diagonal D); math.linalg.spectral-theorem — symmetric matrices have real eigenvalues and orthonormal eigenvector bases."
