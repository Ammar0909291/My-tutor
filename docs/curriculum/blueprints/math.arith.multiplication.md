# Teaching Blueprint: Multiplication
**ID:** `math.arith.multiplication`
**Version:** 1.0
**Status:** PACKAGE_READY
**Spec:** Teaching Blueprint Specification v1.0

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.multiplication` |
| concept_name | Multiplication |
| domain | arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.95 |
| estimated_hours | 15 |
| requires | `math.arith.addition` |
| unlocks | `math.arith.division`, `math.arith.exponentiation`, `math.nt.divisibility` |
| cross_links | `math.linalg.matrix-multiplication` (Tier 1), `math.abst.ring-theory` (Tier 1) |
| blueprint_version | 1.0 |
| authored_date | 2026-07-12 |
| CPA_ENTRY_STAGE | C |

---

## Component 1 — Cognitive Map

### 1.1 Core Insight
Multiplication is repeated addition: a × b is the sum of b copies of a (equivalently, a rows of b objects = b × a total). The distributive law a×(b+c) = a×b + a×c is the engine behind long multiplication and extends multiplication to all number systems. Key properties: commutativity, associativity, identity element 1, annihilator element 0.

### 1.2 Knowledge Prerequisites (Activated)
- **math.arith.addition:** Multi-digit column addition with carrying; commutativity; zero identity. Multiplication is defined as iterated addition; long multiplication uses column addition for partial products.

### 1.3 Conceptual Sequence
1. Multiplication as repeated addition: a × b = a + a + … + a (b times).
2. Rectangular array model: a × b = number of cells in a rows × b columns array.
3. Commutativity: a × b = b × a (rotate the array; same total cells).
4. Distributive law: a × (b + c) = a×b + a×c (splits array into two sub-arrays).
5. Multiplication by 1 (identity): a × 1 = 1 × a = a.
6. Multiplication by 0 (annihilator): a × 0 = 0 × a = 0 (zero copies of any quantity = zero).
7. Long multiplication procedure: partial products via distributive law, column addition of results.

### 1.4 Transfer Target
Single-digit recall and 2-digit × 2-digit long multiplication; recognition that multiplication is the same binary operation underlying matrix multiplication and ring axioms.

---

## Component 2 — Misconception Registry

| ID | Name | Surface Pattern | Root Cause | Priority |
|---|---|---|---|---|
| MC-1 | ADDITION-CONFUSION | Adds instead of multiplying: 3×4=7 (not 12); or uses × to mean "add one more time" | Has not yet distinguished multiplication from repeated addition at the operational level | FOUNDATIONAL |
| MC-2 | COMMUTATIVITY-FALSE | Claims 3×4 ≠ 4×3 because "3 groups of 4" and "4 groups of 3" are physically different | Correct that the models differ physically; incorrect conclusion that the totals differ | SECONDARY |
| MC-3 | ZERO-IDENTITY-CONFUSION | Computes a×0 = a instead of a×0 = 0 | Overgeneralises additive identity (a+0=a) to multiplication | SECONDARY |

**MAMR:** MC-1 FOUNDATIONAL cleared first. MC-2 and MC-3 addressed FIFO thereafter.

---

## Component 3 — Scaffolding Protocol

| Stage | Condition | Entry Action |
|---|---|---|
| C (Concrete) | foundational → always | Begin TA-A01 with rectangular array analogy |
| P (Pictorial) | After C → introduce number-line skip-counting and partial-product diagram | TA-A02 P07 worked examples |
| A (Abstract) | After P → commutativity, identity/annihilator, distributive law | TA-A03 and TA-A04 |

---

## Component 4 — Protocol A (Main Teaching Protocol)

### TA-A01 — Concrete Opening: Rectangular Array
**Primitives:** P03 (ANALOGY BRIDGE), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (opens with B-category P03); GR-2 ✓ (P49 present)

**P03 — ANALOGY BRIDGE**
> "You are arranging chairs in a hall: 4 rows with 6 chairs each. Total chairs?
>
> Method 1 (repeated addition): 6 + 6 + 6 + 6 = 24.
> Method 2 (multiplication): 4 × 6 = 24 — a shorthand for '4 groups of 6.'
>
> **Key model:** a × b = total cells in a rectangular array of a rows and b columns. The total doesn't change if you rotate the array: 4 rows × 6 columns = 6 rows × 4 columns = 24 cells. Multiplication is *fast* repeated addition."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 3 × 7 by thinking of 3 groups of 7 objects. Then compute 7 × 3 by thinking of 7 groups of 3. Are the results the same?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | Both 21; recognises equal totals | TA-A02 |
| PARTIAL | 21 for one; hesitates on the other or gives 22/23 (addition slip) | TA-A02 (flag; note MC-2 risk) |
| INCORRECT | 3×7=10 (adds instead) | TA-B01 (MC-1 repair) → TA-A02 |
| NO_RESPONSE | No answer | "3 × 7 means 7 + 7 + 7. What is 7+7+7?" If stuck → TA-B01 |

---

### TA-A02 — Worked Example Pair: Long Multiplication
**Primitives:** P07 (WORKED EXAMPLE PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P07 is B-category); GR-2 ✓; bloom=apply → P07 required ✓

**P07 — WORKED EXAMPLE PAIR**

*Example 1 — single-digit multiplier:*
> Compute 24 × 6.
>
> Distributive law: 24 = 20 + 4.
> 6 × 4 = 24 → write **4**, carry **2**.
> 6 × 2 = 12, plus carry 2 = **14** → write **14** in tens and hundreds.
>
> **Answer: 144.** Verify: 24 + 24 + 24 + 24 + 24 + 24 = 144 ✓

*Example 2 — two-digit multiplier:*
> Compute 47 × 23.
>
> Partial products using distributive law: 47 × 23 = 47 × (20 + 3) = 47×3 + 47×20.
>
> **47 × 3:**  7×3=21 → write 1, carry 2; 4×3=12+2=14 → write 141.
>
> **47 × 20 = 47 × 2 × 10:** 7×2=14 → write 4, carry 1; 4×2=8+1=9 → write 940 (shift one place left).
>
> **Total:** 141 + 940 = **1,081**.

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 36 × 4."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 144 | TA-A03 |
| PARTIAL | 134 or 154 (carrying error) | TA-A03 (minor; reinforce carrying in addition) |
| INCORRECT | 40 (3+6+4 type confusion) or 144 via wrong process | TA-B01 (MC-1 repair) → TA-A03 |
| NO_RESPONSE | No attempt | "36 × 4 = 30×4 + 6×4. Compute each." If stuck → TA-B01 |

---

### TA-A03 — Commutativity: Contrast Pair
**Primitives:** P06 (CONTRAST PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P06 is B-category); GR-2 ✓

**P06 — CONTRAST PAIR**
> | a × b | b × a | Interpretation |
> |---|---|---|
> | 3 × 4 = 12 | 4 × 3 = 12 | 3 rows of 4 cells; 4 rows of 3 cells — same array, rotated 90° |
> | 6 × 7 = 42 | 7 × 6 = 42 | Same total; different grouping stories |
> | 100 × 99 | 99 × 100 | Both = 9,900 — rotate the array |
>
> **Commutative law of multiplication:** a × b = b × a. The physical stories differ ("3 groups of 4" vs "4 groups of 3") but the total is invariant under rotation of the array.

**P49 — ADAPTIVE CHECKPOINT**
> "Without computing, is 97 × 43 the same as 43 × 97? Name the law. Then verify with a simpler pair: 8 × 5 and 5 × 8."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | Yes; commutative law; 8×5=40=5×8 | TA-A04 |
| PARTIAL | Correct answer but computes both to check | TA-A04 (acceptable; algorithmic verification of a conceptual law) |
| INCORRECT | Claims different products | TA-B02 (MC-2 repair) → TA-A04 |
| NO_RESPONSE | No answer | "Draw a 8×5 grid. Now rotate it 90°. How many cells?" |

---

### TA-A04 — Identity and Annihilator: Contrast Pair
**Primitives:** P06 (CONTRAST PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P06 is B-category); GR-2 ✓

**P06 — CONTRAST PAIR**
> | Expression | Result | Reason |
> |---|---|---|
> | a × 1 | a | 1 copy of a = a; 1 is the multiplicative identity |
> | a × 0 | 0 | 0 copies of a = nothing; 0 is the multiplicative annihilator |
> | a + 0 | a | adding nothing = unchanged; 0 is the additive identity |
>
> **Critical contrast:** 0 is the *additive identity* (a+0=a) but the *multiplicative annihilator* (a×0=0). These are different roles in different operations. Also: 1 is the *multiplicative identity* (a×1=a) but has no special role in addition.

**P49 — ADAPTIVE CHECKPOINT**
> "Compute: (a) 8,500 × 1   (b) 8,500 × 0   (c) 8,500 + 0"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) 8,500; (b) 0; (c) 8,500 | TA-A05 |
| PARTIAL | (a) and (c) correct; (b) wrong (says 8,500) | TA-B03 (MC-3 repair) → TA-A05 |
| INCORRECT | Any of (a)–(c) wrong | Diagnose which zero rule failed; route to B02 or B03 as needed |
| NO_RESPONSE | No answer | Prompt: "How many objects do you have if you have 8,500 copied zero times?" |

---

### TA-A05 — Mastery Gate
**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Grammar:** GR-3 ✓ (terminal); GR-6 ✓; GR-7 ✓ (P76 in gate); GR-9: `math.linalg.matrix-multiplication` is Tier 1 → P76 CROSS-LINK PROBE

**pass_criterion:** ⌈0.95 × 5⌉ = **5 / 5** (4 P77 items + 1 P76 item)

**P77 — MULTI-PROBLEM SET (4 items)**
1. Compute 7 × 8.
2. Compute 24 × 6.
3. Compute 47 × 23.
4. Verify the distributive law: compute 5 × (3 + 4) both as 5×7 and as 5×3 + 5×4. Do the results agree?

**P55 — SCORE** (tally P77 results)

**P76 — TRANSFER PROBE (CROSS-LINK: `math.linalg.matrix-multiplication`)**
> In matrix multiplication, computing the **(1,1) entry** of a product uses a row of one matrix and a column of another:
>
> **[3  1  2]** × **[4; 0; 5]** = 3×4 + 1×0 + 2×5
>
> Each term is a scalar multiplication; the three terms are added — the distributive law you mastered.
>
> Compute: **[3  1  2]** × **[4; 0; 5]** = ?
>
> Then compute **[5  2  1]** × **[3; 4; 2]** = ?

*(Expected: 3×4+1×0+2×5 = 12+0+10 = 22; 5×3+2×4+1×2 = 15+8+2 = 25.)*

**P55 — SCORE** (add P76 result)

**P75 — MASTERY ASSESSMENT**
- pass: 5 / 5 → MASTERY ACHIEVED
- fail: ≤ 4 / 5 → MASTERY NOT ACHIEVED

**P55 — SCORE** (record mastery outcome)

**P74 — ROUTING DECISION**
- MASTERY ACHIEVED → P78
- MASTERY NOT ACHIEVED → P77 items 1–2 failed → TA-B01; P77 item 4 failed → TA-B02; P76 failed → TA-B01 (basic products); re-enter TA-A02

**P55 — SCORE** (record routing)

**P78 — COMPLETION**
> "You can now compute single-digit products, perform long multiplication via partial products, and apply commutativity, identity, and annihilator rules. The transfer probe showed that scalar multiplication is the atomic operation inside matrix multiplication — every entry of a matrix product is computed using exactly what you practiced here. Division and exponentiation come next."

---

## Component 5 — Protocol B (Repair Protocol)

### TA-B01 — Repair: ADDITION-CONFUSION (MC-1 FOUNDATIONAL)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-4 ✓

**P27 — MISCONCEPTION NAMING**
> "The error **ADDITION-CONFUSION** applies addition where multiplication is required: 3 × 4 = 7 (adds) or '3 × 4 = 4 + 3 + 1' (partially repeats, then adds one more). Multiplication is not the same as one more addition — it is *b* additions of *a*, all at once."

**P41 — MISCONCEPTION DETECTOR**
> "3 × 4: how many times is 4 being added? Write it out: 4 + 4 + 4 = ?. Now check: is that equal to 4 + 3?"

**P64 — CONCEPTUAL SHIFT**
> "3 × 4 means 4 added to itself exactly 3 times: 4 + 4 + 4 = 12. The operation × tells you *how many copies*, not 'do it one more time.' Think of the rectangular array: 3 rows of 4 cells = 12 cells. This is a different counting process from 3 + 4 = 7 (putting 3 and 4 together in one group)."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 5 × 6 by writing out 6+6+6+6+6. What is the sum?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 30 | Return to TA-A02 CORRECT branch |
| INCORRECT | Adds 5+6 or 5×6=11 | Draw the 5×6 array; count rows × columns |

---

### TA-B02 — Repair: COMMUTATIVITY-FALSE (MC-2)
**Primitives:** P27 (MISCONCEPTION NAMING), P11 (REPRESENTATION SHIFT), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **COMMUTATIVITY-FALSE** claims 3×4 ≠ 4×3 because the physical stories differ. The physical stories do differ — but they produce equal totals."

**P11 — REPRESENTATION SHIFT**
> Draw a 3×4 grid (3 rows, 4 columns) = 12 cells.
> Now rotate 90°: becomes a 4×3 grid (4 rows, 3 columns) — still 12 cells.
> Same physical array, two orientations → same count.

**P64 — CONCEPTUAL SHIFT**
> "Multiplication counts cells in a rectangle. Rotating a rectangle doesn't change the number of cells. So a × b = b × a — even if the physical stories ('groups of') feel different."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 9 × 4 and 4 × 9. Show both using the array model."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | Both 36; same array rotated | Return to TA-A03 CORRECT branch |
| INCORRECT | Different values | Physically count both arrays; verify same total |

---

### TA-B03 — Repair: ZERO-IDENTITY-CONFUSION (MC-3)
**Primitives:** P27 (MISCONCEPTION NAMING), P06 (CONTRAST PAIR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **ZERO-IDENTITY-CONFUSION** says a×0 = a, carrying over the additive identity rule (a+0=a) to multiplication. Zero has the opposite role in multiplication: it is the annihilator, not the identity."

**P06 — CONTRAST PAIR**
> | Operation with zero | Result | Role of zero |
> |---|---|---|
> | a + 0 | a | Additive identity (unchanged) |
> | **a × 0** | **0** | **Multiplicative annihilator (collapses to zero)** |
> | a × 1 | a | Multiplicative identity (unchanged) |
>
> "0 copies of anything = nothing. 7 × 0 means: how many objects if you have 7 in each group but have 0 groups? Answer: 0 objects."

**P64 — CONCEPTUAL SHIFT**
> "The identities are paired differently across operations: addition's identity is 0 (a+0=a); multiplication's identity is 1 (a×1=a). Zero's role switches: in multiplication, zero is the annihilator, not the identity."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute: (a) 1,000 × 0   (b) 1,000 × 1   (c) 1,000 + 0"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 0, 1,000, 1,000 | Return to TA-A04 CORRECT branch |
| INCORRECT | (a) gives 1,000 | "Zero groups of 1,000: you have zero of them. How many objects total?" |

---

## Component 6 — P89 Spaced Repetition

**P89 — SPACED REPETITION SCHEDULE**

| Interval | Probe Type | Content |
|---|---|---|
| Day 1 (consolidation) | Computation | Times table drill: all products n×m for n,m ∈ {6,7,8,9} |
| Day 3 | Long multiplication | 3-digit × 2-digit: 136 × 24 |
| Day 7 | Property application | Apply distributive: 8×(100+37); compute; verify via long multiplication |
| Day 30 | Transfer check | Row-vector × column-vector: [4  2  3]×[5;1;6]; connect each product to today's multiplication |

---

## Component 7 — Cross-Blueprint Dependencies

**GR-8 ✓:** All cross_links documented.

| Dependency | Direction | Relationship |
|---|---|---|
| `math.arith.addition` | REQUIRES | Multiplication = repeated addition; long multiplication uses column addition for partial products |
| `math.arith.division` | UNLOCKS | Inverse of multiplication: a×b=c ↔ c÷b=a |
| `math.arith.exponentiation` | UNLOCKS | Repeated multiplication: aⁿ = a×a×…×a (n times) |
| `math.nt.divisibility` | UNLOCKS | b divides a iff a = b×k for some integer k |
| `math.linalg.matrix-multiplication` | CROSS-LINK (Tier 1) | Matrix product entries computed via scalar multiplication + addition (row · column) |
| `math.abst.ring-theory` | CROSS-LINK (Tier 1) | Multiplication is the second binary operation in every ring; distributive law is a ring axiom |

---

## Component 8 — Teaching Notes

- **CPA enforcement:** Use a physical rectangular array (counters in rows and columns) before introducing the column-multiplication algorithm. The array model motivates both commutativity (rotation) and the distributive law (splitting into sub-arrays).
- **Distributive law as the backbone of long multiplication:** Long multiplication of 47×23 is: 47×3 (partial product 1) + 47×20 (partial product 2, shifted). Every step uses the distributive law. Making this explicit prevents the common "magic procedure" understanding of long multiplication.
- **MAMR enforcement:** MC-1 (ADDITION-CONFUSION) is FOUNDATIONAL. A student who adds instead of multiplies cannot meaningfully work on commutativity or identity rules. Repair MC-1 fully before introducing any properties.
- **Times-table mastery:** Fluent recall of single-digit products (1×1 through 9×9) is a prerequisite for long multiplication. If recall is slow, the P89 Day 1 drill addresses this; allow additional sessions if needed.
- **P76 cross-link note:** The row-vector × column-vector probe is fully self-contained — it gives the rule inline. The student only needs to compute scalar multiplications and add. Credit P76 correct if both dot products (22 and 25) are computed correctly.

---

## Component 10 — Validation Checklist

### V-1 through V-20

| Code | Check | Status |
|---|---|---|
| V-1 | All 10 components present (0–8, 10) | PASS |
| V-2 | Component 0 metadata complete and accurate | PASS |
| V-3 | CPA_ENTRY_STAGE = C (foundational difficulty) | PASS |
| V-4 | GR-1: every non-repair TA opens with B-category primitive | PASS (A01:P03, A02:P07, A03:P06, A04:P06, A05:P91) |
| V-5 | GR-2: every non-gate TA contains P49 | PASS (A01–A04 each have P49; A05 is gate) |
| V-6 | GR-3: mastery gate TA (A05) is terminal | PASS |
| V-7 | GR-4: repair TAs contain P41/P64 | PASS (B01:P27+P41+P64; B02:P27+P11+P64; B03:P27+P06+P64) |
| V-8 | GR-6: P91 terminal in TA-A05 | PASS (ends with P78) |
| V-9 | GR-7: P76 present in mastery gate | PASS (TA-A05) |
| V-10 | GR-8: all cross_links documented in Component 7 | PASS |
| V-11 | GR-9: P76 mode — cross_link to Tier 1 `math.linalg.matrix-multiplication` → CROSS-LINK PROBE | PASS |
| V-12 | GR-10: MAMR stated and enforced | PASS (MC-1 FOUNDATIONAL first; B01 before B02/B03) |
| V-13 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-14 | pass_criterion: ⌈0.95 × 5⌉ = 5/5 | PASS |
| V-15 | bloom=apply → P07 (WORKED EXAMPLE PAIR) present | PASS (TA-A02) |
| V-16 | P49 in every non-gate TA has all 4 branches | PASS |
| V-17 | Session TA cap (h=15 ≥ 1h → max 7): happy path ≤ 5 TAs; repair TAs conditionally activated | PASS |
| V-18 | P89 spaced repetition schedule present (≥ 4 intervals) | PASS |
| V-19 | Component 7 documents all requires/unlocks/cross_links | PASS |
| V-20 | Misconception registry: ≥ 3 MCs, one FOUNDATIONAL | PASS |

### AIR

| Dimension | Check | Status |
|---|---|---|
| Accuracy | 3×4=12 ✓; 7×8=56 ✓; 24×6=144 ✓; 36×4=144 ✓; 47×23: 47×3=141, 47×20=940, total=1,081 ✓; 5×7=35=5×3+5×4=15+20 ✓; [3,1,2]·[4,0,5]=12+0+10=22 ✓; [5,2,1]·[3,4,2]=15+8+2=25 ✓ | PASS |
| Integrity | No component contradicts another; MAMR chain consistent | PASS |
| Relevance | Every TA addresses multiplication; P76 directly uses scalar multiplication to compute a matrix entry | PASS |

**PACKAGE_READY: YES**
