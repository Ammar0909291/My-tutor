# Teaching Blueprint — math.linalg.matrix-multiplication

## Component 0 — Metadata
concept_id: math.linalg.matrix-multiplication
concept_name: Matrix Multiplication
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 4
mastery_threshold: 0.90
CPA_entry_stage: P
requires: [math.linalg.matrix, math.linalg.dot-product]
cross_links: [math.abst.ring-theory]
P76_mode: cross-link (math.abst.ring-theory is Tier 1)

---

## Component 1 — Cognitive Map

**Core concept:** Matrix multiplication C = AB is defined by C_{ij} = Σ_k A_{ik}B_{kj} — the dot product of row i of A with column j of B. This requires the inner dimensions to match: A must be m×n and B must be n×p, producing C of size m×p. Matrix multiplication is generally non-commutative (AB ≠ BA).

**Conceptual progression:**
1. Compatibility check: inner dimensions must match — A(m×n) × B(n×p) is defined; result is m×p.
2. Entry formula: each C_{ij} = row i of A · column j of B (dot product of vectors).
3. Non-commutativity: AB and BA may differ, or one may be defined while the other is not.
4. Ring structure: the set of n×n matrices under addition and multiplication forms a non-commutative ring.

**CPA arc (entry: P):**
- Pictorial: dimension diagrams showing inner/outer dimension matching; colour-coded row-times-column entry computations
- Abstract: entry formula C_{ij} = Σ_k A_{ik}B_{kj}; general proof that AB ≠ BA using concrete 2×2 counterexample

**Prior knowledge activated:** matrix as rectangular array of numbers; m×n dimension notation; dot product of two vectors as Σ a_k b_k

---

## Component 2 — Misconception Registry

### MC-1: DIMENSION-RULE-IGNORED [FOUNDATIONAL]
**Description:** Learner attempts to multiply matrices whose inner dimensions do not match.
**Surface form:** Computes product of A(2×3) and B(2×3) claiming result is "2×3" or "2×2".
**Root cause:** Treats matrix multiplication like scalar multiplication (element-wise), unaware that the inner dimension constraint is structural.
**Trigger condition:** Any problem presenting two matrices with matching outer but non-matching inner dimensions.
**Repair target:** TA-B01.

### MC-2: ROW-COLUMN-ORDER-REVERSED
**Description:** Learner uses column i of A dotted with row j of B instead of row i dotted with column j.
**Surface form:** For C = AB, computes C_{12} using column 1 of A times row 2 of B.
**Root cause:** Confuses the index ordering of the entry formula; may remember "rows and columns" but applies them in reversed roles.
**Trigger condition:** Any entry computation requiring identification of which factor contributes a row vs. a column.
**Repair target:** TA-B02.

### MC-3: ASSUMES-COMMUTATIVITY
**Description:** Learner claims AB = BA for general matrices.
**Surface form:** Computes AB and assumes BA must equal it without checking.
**Root cause:** Transfers commutativity from scalar multiplication (ab = ba for numbers) to matrix multiplication without recognising that order-dependence arises from the non-symmetric entry formula.
**Trigger condition:** Any problem asking about the relationship between AB and BA.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry diagnostic:** Present A = [[1,0];[0,1]] (identity) × B = [[3,4];[5,6]]. Ask learner to state result dimensions and compute C_{11}. If correct → begin TA-A01. If incorrect → repair prerequisite (math.linalg.matrix).

**Scaffolding ladder:**
1. Dimension check only (no entry computation): which products are defined?
2. Single-entry computation: find C_{11} or C_{12} for a given pair of small matrices
3. Full 2×2 product computation: compute all 4 entries
4. Non-commutativity: compute AB and BA for the same pair

**Pacing gate:** Must score ≥ 5/5 on P91 to earn mastery credit (MAMR = 90%).

---

## Component 4 — Protocol A (Main Instruction Path)

### TA-A01 — Dimension Rule and Entry Formula
**Primitive sequence:** P06 → P49

**P06 — CONTRAST PAIR:**

| Feature | DEFINED product | UNDEFINED product |
|---|---|---|
| A dimensions | 2×3 | 2×3 |
| B dimensions | 3×4 | 2×4 |
| Inner dims | 3 = 3 ✓ | 3 ≠ 2 ✗ |
| Result | 2×4 | — (undefined) |

Inner-outer mnemonic: check the INNER dimensions (must match); the result takes the OUTER dimensions.

Entry formula: C_{ij} = row i of A · col j of B = Σ_{k=1}^{n} A_{ik} · B_{kj}

Demonstration for 2×2 × 2×2:
A = [[1,2];[3,4]], B = [[5,6];[7,8]]

C_{11} = row 1 of A · col 1 of B = [1,2]·[5,7] = 1·5 + 2·7 = 5 + 14 = 19
C_{12} = row 1 of A · col 2 of B = [1,2]·[6,8] = 1·6 + 2·8 = 6 + 16 = 22
C_{21} = row 2 of A · col 1 of B = [3,4]·[5,7] = 3·5 + 4·7 = 15 + 28 = 43
C_{22} = row 2 of A · col 2 of B = [3,4]·[6,8] = 3·6 + 4·8 = 18 + 32 = 50

AB = [[19,22];[43,50]]

**P49 — ADAPTIVE CHECKPOINT:**
"A is 3×2 and B is 2×4. (a) Is AB defined? (b) What are the dimensions of AB? (c) Compute C_{12} given A=[[1,2];[3,4];[5,6]], B=[[7,8,9,10];[11,12,13,14]]."

- CORRECT (defined, 3×4, C_{12}=1·8+2·12=8+24=32): "Excellent — you checked inner dimensions, read the outer for the result size, and computed the entry correctly." → TA-A02
- PARTIAL (dimensions correct, entry computation error): "C_{12} uses ROW 1 of A dotted with COL 2 of B. Row 1 of A = [1,2]; Col 2 of B = [8,12]. Dot product = 8 + 24 = 32." → TA-A02
- INCORRECT (claimed undefined, or wrong dimensions): "A is 3×2 — the inner dimension of A is 2. B is 2×4 — the inner dimension of B is 2. They match, so AB is defined. Outer dims: 3 (from A) and 4 (from B) → AB is 3×4." → TA-B01
- NO_RESPONSE: Work through all three parts step by step, then ask: "Now try: C is 4×3, D is 3×1. Is CD defined? What is its size?" → TA-A02

---

### TA-A02 — Non-Commutativity
**Primitive sequence:** P07 → P49

**P07 — WORKED EXAMPLE PAIR:**

*Worked Example 1: AB and BA for 2×2 matrices*
A = [[1,2];[3,4]], B = [[5,6];[7,8]]

AB (computed in TA-A01) = [[19,22];[43,50]]

BA:
BA_{11} = [5,6]·[1,3] = 5 + 18 = 23
BA_{12} = [5,6]·[2,4] = 10 + 24 = 34
BA_{21} = [7,8]·[1,3] = 7 + 24 = 31
BA_{22} = [7,8]·[2,4] = 14 + 32 = 46

BA = [[23,34];[31,46]]

AB = [[19,22];[43,50]] ≠ [[23,34];[31,46]] = BA.

Conclusion: AB ≠ BA for these matrices. This is NOT a coincidence — it is the general rule.

*Worked Example 2: A case where BA is undefined*
A is 2×3, B is 3×4.
AB is defined (2×4).
BA: B(3×4) × A(2×3) — inner dims 4 ≠ 2 → BA is UNDEFINED.
This makes commutativity structurally impossible even to state here.

**P49 — ADAPTIVE CHECKPOINT:**
"For A = [[2,1];[0,3]] and B = [[1,4];[2,0]], compute AB and BA. Are they equal?"

- CORRECT (AB=[[4,8];[6,0]], BA=[[2,13];[4,2]], not equal): "AB ≠ BA confirmed. Matrix multiplication is non-commutative in general." → TA-A03
- PARTIAL (one product correct, one with entry error): Identify which entry is wrong and walk through the dot product for that entry. → TA-A03
- INCORRECT (both errors or claimed AB=BA): "Let's compute AB_{11} together: row 1 of A=[2,1], col 1 of B=[1,2]. Dot product: 2·1+1·2=4. Now find BA_{11}: row 1 of B=[1,4], col 1 of A=[2,0]. Dot product: 1·2+4·0=2. Already AB_{11}≠BA_{11}." → TA-B02
- NO_RESPONSE: Complete walkthrough of both products. Highlight entry-by-entry that AB_{11}=4 but BA_{11}=2. → TA-A03

---

### TA-A03 — Mastery Gate (P91)
**Primitive sequence:** P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

MAMR: 90% → PASS requires ⌈0.90 × 5⌉ = 5/5 (4 P77 items + 1 P76 item).

**P77 — MULTI-PROBLEM SET (4 items):**

Item 1: A is 3×2 and B is 2×4. Is AB defined? If so, what are the dimensions of AB? [Answer: Yes, 3×4]
Item 2: Compute [[1,2];[3,4]] × [[1,0];[0,1]]. [Answer: [[1,2];[3,4]] — multiplying by identity]
Item 3: True or False — for any two square matrices A and B, AB = BA. [Answer: FALSE — non-commutative in general]
Item 4: Find the (1,2) entry of [[2,1,3];[0,4,1]] × [[1,2];[3,0];[-1,1]]. [Answer: row 1 · col 2 = [2,1,3]·[2,0,1] = 4+0+3 = 7]

**P55 — SCORE:** Record items correct out of 4.

**P76 — TRANSFER PROBE (cross-link to math.abst.ring-theory):**
Consider the set M₂(ℝ) of all 2×2 real matrices under standard matrix addition and multiplication.

Let A = [[1,1];[0,1]] and B = [[1,0];[1,1]].

(a) Compute AB. [Answer: AB = [[2,1];[1,1]]]
(b) Compute BA. [Answer: BA = [[1,1];[2,1]]]
(c) Does AB = BA? [Answer: No]
(d) This demonstrates that M₂(ℝ) is a non-commutative ring. What ring axiom does M₂(ℝ) fail for multiplication? [Answer: commutativity — it satisfies closure, associativity, distributivity, and has an identity (I) and additive inverses, but AB ≠ BA in general.]

**P55 — SCORE:** Record P76 correct (1) or incorrect (0).

**P75 — MASTERY ASSESSMENT:** Total score = P77 score + P76 score (max 5).

**P55 — SCORE:** Final score out of 5.

**P74 — ROUTING DECISION:**
- Score 5/5 → PASS → P78 COMPLETION
- Score < 5/5 → FAIL → Route to TA-B01 (dimension errors) or TA-B02 (entry computation / commutativity errors)

**P55 — SCORE:** Log routing outcome.

**P78 — COMPLETION:**
> "Matrix multiplication: mastered. You can check dimension compatibility, compute any entry using the row-column dot product formula, demonstrate non-commutativity with a counterexample, and connect the structure to abstract ring theory. This underpins matrix inverse, determinants, and linear transformations."

---

## Component 5 — Protocol B (Repair Path)

### TA-B01 — Repair: Dimension Rule Ignored
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "There is a specific error here: DIMENSION-RULE-IGNORED. Matrix multiplication is not element-wise — you cannot multiply two 2×3 matrices to get a 2×3 result. The inner dimensions (number of columns of A and number of rows of B) must be equal for the product to exist."

**P41 — MISCONCEPTION DETECTOR:**
> "Test: A is 2×3, B is 2×3. Can we compute AB? Inner dim of A = 3 (columns). Inner dim of B = 2 (rows). 3 ≠ 2 → AB is undefined. What about BA? Inner dim of B = 3, inner dim of A = 2. Still 3 ≠ 2 → BA is also undefined."

**P64 — CONCEPTUAL SHIFT:**
> "Why does the inner dimension matter? Entry C_{ij} requires a dot product of row i of A (length n) with column j of B (length n). They must have the same length to form a dot product. That length is the inner dimension. Without matching lengths, the dot product cannot be computed."

→ TA-A01

---

### TA-B02 — Repair: Row-Column Reversal / Commutativity
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "Two related errors: ROW-COLUMN-ORDER-REVERSED (using column i of A with row j of B instead of row i of A with column j of B) and ASSUMES-COMMUTATIVITY (claiming AB always equals BA). Both come from not internalising the asymmetric formula C_{ij} = row i of A · col j of B."

**P41 — MISCONCEPTION DETECTOR:**
> "Compute AB for A=[[1,0];[0,2]], B=[[3,4];[5,6]]. Entry AB_{12}: row 1 of A = [1,0]; col 2 of B = [4,6]. Correct: 1·4+0·6=4. If you used col 1 of A = [1,0] and row 2 of B = [5,6], you'd get 1·5+0·6=5 ≠ 4. Now BA_{12}: row 1 of B = [3,4]; col 2 of A = [0,2]. Correct: 3·0+4·2=8. AB_{12}=4 ≠ BA_{12}=8."

**P64 — CONCEPTUAL SHIFT:**
> "Commit the formula asymmetry: for AB, it is always ROW of the FIRST matrix dotted with COLUMN of the SECOND. Swapping which matrix provides rows vs. columns is exactly what BA does — and that changes the entry values. Non-commutativity is a direct consequence of this asymmetry."

→ TA-A02

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89:
  concept_id: math.linalg.matrix-multiplication
  MAMR: 0.90
  intervals: [1, 3, 7, 14, 30]
  session_1_probe: "Is a (4×2)×(2×3) product defined? What is its size?"
  session_3_probe: "Compute [[2,0];[1,3]] × [[1,4];[2,1]]."
  session_7_probe: "Find a 2×2 example where AB ≠ BA."
  session_14_probe: "Under what conditions is AB=BA guaranteed for 2×2 matrices?"
  session_30_probe: "Explain why M_n(ℝ) is a ring. Is it commutative? Justify."
```

---

## Component 7 — Cross-Blueprint Dependencies

**Requires (prerequisites with blueprints):**
- math.linalg.matrix — matrix as m×n array; dimension notation; entry indexing [BLUEPRINT EXISTS]
- math.linalg.dot-product — dot product as Σ a_k b_k [BLUEPRINT EXISTS]

**Unlocks:**
- math.linalg.matrix-inverse — inverse requires square matrix and full-rank condition
- math.linalg.determinant — determinant defined for square matrices (shares non-commutativity context)

**Cross-links:** [math.abst.ring-theory] — Tier 1 concept; P76 cross-link probe used.

**GR-8 satisfied:** all prerequisite and unlock relationships documented.
**GR-9 satisfied:** math.abst.ring-theory is Tier 1 → P76 cross-link probe applied in TA-A03.

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The inner-dimension check must be drilled until automatic before entry computation is introduced. Learners who skip the dimension check will compute nonsense products.

**Non-commutativity emphasis:** This is the single most important property distinguishing matrix algebra from scalar algebra. Every learner who assumes commutativity will make errors in later linear algebra (especially when computing inverses or proving ring properties).

**Entry formula memory aid:** "C_{ij} = ROW i, COLUMN j" — emphasise that row comes from the FIRST matrix (A) and column from the SECOND (B). This is an asymmetric operation.

**V-3 check:** N/A — difficulty is proficient; CPA_ENTRY=P (not C, so V-3 concrete-anchor check does not apply).

**GR-10 — MAMR enforcement:** MAMR = 90%. A learner who scores 4/5 on the P91 gate does NOT receive mastery credit and routes to repair, then retakes the gate. A score of 5/5 is required.

---

## Component 10 — Validation Checklist

### Grammar Rules
- [x] GR-1: TA-A01 opens with P06 (B-category primitive for proficient/apply)
- [x] GR-2: Each non-gate TA (A01, A02) contains P49
- [x] GR-3: TA-A03 is terminal (P91 contains P74 → P78 PASS or repair branch)
- [x] GR-4: Repair TAs B01 and B02 open with P27 + P41 + P64
- [x] GR-6: P91 is terminal within TA-A03; no further TAs follow PASS
- [x] GR-7: P76 present in TA-A03 (mastery gate)
- [x] GR-8: Cross-blueprint dependencies documented in Component 7
- [x] GR-9: math.abst.ring-theory is Tier 1 → P76 cross-link probe applied
- [x] GR-10: MAMR = 90% stated; PASS threshold = 5/5 enforced in P74 routing

### Structural Validators
- [x] V-1: concept_id matches KG entry (math.linalg.matrix-multiplication)
- [x] V-2: difficulty=proficient, bloom=apply, h=4, thresh=0.90 match KG
- [x] V-3: N/A — difficulty is proficient; CPA_ENTRY=P
- [x] V-4: All 3 MCs have FOUNDATIONAL flag on MC-1 only
- [x] V-5: P06 correctly anchors TA-A01 (contrast pair for dimension rule)
- [x] V-6: P07 present in TA-A02 (bloom=apply requires worked example pair)
- [x] V-7: P91 structure complete: P77(4 items)→P55→P76→P55→P75→P55→P74→P55→P78
- [x] V-8: PASS criterion: ⌈0.90 × 5⌉ = 5/5 — 4 P77 items + 1 P76 = n=5
- [x] V-9: P74 routes PASS → P78, FAIL → TA-B01 or TA-B02
- [x] V-10: All repair TAs (B01, B02) terminate by routing back to a main TA
- [x] V-11: P49 has four branches (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) in each TA
- [x] V-12: P77 items are distinct, non-repetitive, cover key skill facets
- [x] V-13: P76 probe is genuine transfer (ring theory connection, not symbolic repetition)
- [x] V-14: Spaced repetition schedule (P89) present with 5 intervals
- [x] V-15: Component 7 documents requires, unlocks, cross_links explicitly
- [x] V-16: TA chain is lean for h=4 (2 main TAs + gate — within spec)
- [x] V-17: MCs link to repair TAs in Component 2
- [x] V-18: P49 NO_RESPONSE branch gives complete worked demonstration
- [x] V-19: P78 completion statement summarizes what mastery enables
- [x] V-20: Teaching Notes (Component 8) include MAMR restatement and V-3 N/A note

### AIR Assessment
- Actionable: P49 branches provide specific re-routing and feedback for each response type ✓
- Irreversible: Dimension check established before entry computation; non-commutativity demonstrated with concrete counterexamples ✓
- Robust: Lean TA chain matches h=4 scope; P91 gate enforces 90% threshold ✓

**STATUS: PACKAGE_READY**
