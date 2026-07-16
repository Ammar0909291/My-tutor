<!-- BLUEPRINT: math.alg.factoring-trinomials -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Factoring Trinomials
**Concept ID:** `math.alg.factoring-trinomials`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=8 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.alg.factoring-trinomials |
| name | Factoring Trinomials |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 8 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | P (Pictorial) |
| requires (Tier-1) | math.alg.factoring-gcf |
| cross_links | — |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.alg.factoring-gcf**: GCF extraction from polynomials; step: always extract GCF first before other methods
- **math.alg.factoring** (grandparent): general factoring strategy — GCF → special forms → trinomials → grouping

### Target Knowledge State
Student can factor monic trinomials (x²+bx+c) by finding two integers multiplying to c and adding to b, and factor non-monic trinomials (ax²+bx+c, a≠1) via the AC method (find two numbers multiplying to ac and adding to b, then split the middle term and factor by grouping). Student always extracts GCF first and recognizes irreducible quadratics.

### Conceptual Obstacles
1. Applying the monic shortcut (find two numbers → product=c, sum=b) to non-monic trinomials — correct product target is ac, not c
2. Sign errors when splitting the middle term and factoring by grouping (especially with negative leading signs)
3. Attempting to factor a sum of squares x²+k² over the reals (irreducible; only difference of squares factors)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | MONIC-SHORTCUT-FOR-NONMONIC | For ax²+bx+c (a≠1), student looks for two numbers with product c and sum b instead of product ac and sum b | Any non-monic trinomial where a≠1 |
| MC-2 | SIGN-ERROR-IN-GROUPING | When splitting the middle term and grouping, student assigns an incorrect sign to the second group, especially when the split term is negative | Trinomials with negative b or negative c |
| MC-3 | SUM-OF-SQUARES-FACTORABLE | Student attempts to factor x²+k² into two linear factors over the reals (e.g., (x+k)(x+k)) | Quadratics with positive constant term and negative discriminant |

**Foundational Misconception:** MC-1 (MONIC-SHORTCUT-FOR-NONMONIC) — arises immediately when students apply the monic rule to the non-monic case; addressed in A01 and reinforced in A02.

---

## Component 3 — Scaffolding Protocol

**Entry point:** Pictorial (P) — proficient learner.

**Scaffolding sequence:**
1. **A01 P03 ANALOGY BRIDGE** — connect integer factor-pair search (known: factor pairs of 12) to monic trinomial factoring; introduce the decision tree for monic vs. non-monic
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: monic x²−5x+6; WE2: non-monic 6x²+7x−3 via AC method
3. **A03 P06 CONTRAST PAIR** — monic vs. non-monic (different target for the product); factorable vs. irreducible quadratic
4. **A04 P91 Gate** — mastery assessment

**V-3 (CPA Concrete stage):** N/A — proficient learner enters at Pictorial stage.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Factor-Pair Bridge

**Primitive:** P03 ANALOGY BRIDGE
**Purpose:** Connect factor-pair search to polynomial factoring; introduce the monic vs. non-monic decision; address MC-1

---

**[P03 — ANALOGY BRIDGE]**

*Source domain (familiar):* Factor pairs of 12. List all pairs (p, q) with p×q=12:
(1,12), (2,6), (3,4), (−1,−12), (−2,−6), (−3,−4), (−4,−3), (4,3) …

For 12 with sum 7: pair (3, 4) — because 3×4=12 and 3+4=7.

*Bridge:* Factoring x²+bx+c is equivalent to finding two integers p, q where p×q=c and p+q=b, then writing (x+p)(x+q).

Why? Expand: (x+p)(x+q) = x²+(p+q)x+pq = x²+bx+c. ✓

*Target domain (new):*

**Monic trinomial (a=1): x²+bx+c**
- Find p, q: p×q = c, p+q = b
- Factor: (x+p)(x+q)

**Non-monic trinomial (a≠1): ax²+bx+c — AC Method**
1. Compute ac (the product of leading and constant coefficients)
2. Find p, q: p×q = ac, p+q = b
3. Rewrite: ax²+px+qx+c
4. Factor by grouping: group first two and last two terms; extract GCF from each group

*Decision tree:*

```
Trinomial ax²+bx+c
     ↓
a = 1?
  YES → Find p·q=c, p+q=b → (x+p)(x+q)
  NO  → Find p·q=ac, p+q=b → Split bx → Group → Factor
```

*Key rule (MC-1 antidote):* The product target is **ac**, not c, when a≠1.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* You want to factor 3x²+10x+8. What two numbers should you find?

(A) Multiply to 8 and add to 10
(B) Multiply to 24 and add to 10
(C) Multiply to 3 and add to 8
(D) Multiply to 10 and add to 8

*Branch CORRECT (B):* ac = 3×8 = 24. You need p×q = 24 and p+q = 10. The pair is (4, 6). Split: 3x²+4x+6x+8 = x(3x+4)+2(3x+4) = (x+2)(3x+4). ✓ Proceed to A02.

*Branch PARTIAL:* You may have computed ac correctly but made an error in the sum condition. For 3x²+10x+8: ac=24, p+q=10. Pair: 4 and 6 (4×6=24, 4+6=10). Proceed to A02.

*Branch INCORRECT (A):* Option A is the monic rule — it works only when a=1. Here a=3, so the product target is ac=3×8=24, not c=8. Always check a first. Proceed to A02.

*Branch NO_RESPONSE:* For ax²+bx+c with a≠1, the AC method requires finding p, q with p×q=ac and p+q=b. Here ac=3×8=24 and b=10 → pair (4,6). Proceed to A02.

---

### Teaching Action A02 — Worked Example Pair

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Step-by-step application of both monic and AC methods; address MC-2

---

**[P07 — WORKED EXAMPLE PAIR]**

**Worked Example 1 — Monic Trinomial: x²−5x+6**

*Step 1 — Check GCF:* GCF = 1 (no common factor). Proceed.

*Step 2 — Identify a=1:* Monic. Find p×q=6 and p+q=−5.

*Step 3 — List factor pairs of 6:* (1,6), (2,3), (−1,−6), (−2,−3).
- Check sums: −2+(−3)=−5 ✓ → p=−2, q=−3

*Step 4 — Write factored form:*
x²−5x+6 = **(x−2)(x−3)**

*Verify by expansion:* (x−2)(x−3) = x²−3x−2x+6 = x²−5x+6 ✓

---

**Worked Example 2 — Non-Monic Trinomial: 6x²+7x−3**

*Step 1 — Check GCF:* GCF = 1. Proceed.

*Step 2 — Identify a=6≠1:* Non-monic. Use AC method.

*Step 3 — Compute ac:* ac = 6×(−3) = **−18**

*Step 4 — Find p, q: p×q=−18, p+q=7.*
Factor pairs of −18: (1,−18), (2,−9), (3,−6), (6,−3), (9,−2), (−1,18), …
- Check sums: 9+(−2) = 7 ✓ → p=9, q=−2

*Step 5 — Split middle term:*
6x²+7x−3 = 6x²+9x−2x−3

*Step 6 — Factor by grouping:*
= 3x(2x+3) − 1(2x+3)
= **(3x−1)(2x+3)**

*Sign note (MC-2):* When the second group has a negative coefficient, factor out a negative: −2x−3 = −1(2x+3). The common binomial factor (2x+3) appears in both groups.

*Verify:* (3x−1)(2x+3) = 6x²+9x−2x−3 = 6x²+7x−3 ✓

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Factor 2x²−x−6 using the AC method.

(A) (2x+3)(x−2)
(B) (2x−3)(x+2)
(C) (2x+1)(x−6)
(D) Cannot be factored

*Branch CORRECT (A):* ac = 2×(−6) = −12. Find p×q=−12, p+q=−1: pair (3, −4). Split: 2x²+3x−4x−6 = x(2x+3)−2(2x+3) = (x−2)(2x+3). ✓ Proceed to A03.

*Branch PARTIAL:* You found the correct factor pair but may have split the middle term with incorrect signs. ac=−12; pair (3,−4) since 3+(−4)=−1 ✓. Split: 2x²+3x−4x−6 = x(2x+3)−2(2x+3) = (x−2)(2x+3). Verify by expansion.

*Branch INCORRECT (B, C, or D):* For 2x²−x−6: ac=2×(−6)=−12; b=−1. Find p×q=−12, p+q=−1: pair (3,−4). Split: 2x²+3x−4x−6 = x(2x+3)−2(2x+3) = (x−2)(2x+3). Note (A) = (2x+3)(x−2) — same result. Always verify by expanding. Proceed to A03.

*Branch NO_RESPONSE:* AC method: ac=2×(−6)=−12; find p×q=−12, p+q=−1 → pair (3,−4). Rewrite: 2x²+3x−4x−6 = x(2x+3)−2(2x+3) = (x−2)(2x+3). Proceed to A03.

---

### Teaching Action A03 — Monic vs. Non-Monic Contrast

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Consolidate the monic/non-monic distinction; introduce irreducible quadratics; address MC-3

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Monic vs. Non-Monic Product Target**

| | x²+5x+6 (Monic) | 2x²+5x+3 (Non-Monic) |
|--|-----------------|---------------------|
| Strategy | Find p×q=**c=6**, p+q=5 | Find p×q=**ac=6**, p+q=5 |
| Pair found | (2, 3) | (2, 3) |
| Method | Write (x+2)(x+3) directly | Split 5x = 2x+3x; group |
| Result | (x+2)(x+3) | (2x+3)(x+1) |
| Verify | x²+5x+6 ✓ | 2x²+2x+3x+3=2x²+5x+3 ✓ |

*Key difference:* Both cases happen to use the pair (2,3), but for the non-monic case the pair was found from ac=2×3=6, not c=3.

**Contrast 2 — Factorable vs. Irreducible Quadratic**

| | x²−9 | x²+9 |
|--|------|------|
| Discriminant b²−4ac | 0−4(1)(−9)=36>0 | 0−4(1)(9)=−36<0 |
| Type | Difference of squares | Sum of squares |
| Factors over ℝ | (x−3)(x+3) | **Irreducible over ℝ** |
| Note | Always factors | No real linear factors |

*Rule:* x²−k² = (x−k)(x+k) always. x²+k² has no real linear factors. Never write (x+k)(x+k) for x²+k² — expanding gives x²+2kx+k², not x²+k².

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Which of these cannot be factored over the reals?

(A) x²−16
(B) x²+16
(C) 2x²−8
(D) x²−2x−8

*Branch CORRECT (B):* x²+16 is a sum of squares — irreducible over ℝ. The others factor: (A)=(x−4)(x+4); (C)=2(x²−4)=2(x−2)(x+2); (D)=(x−4)(x+2). Proceed to A04.

*Branch PARTIAL:* You identified B correctly. Confirm: (A) x²−16=(x−4)(x+4) ✓; (C) 2x²−8=2(x²−4)=2(x−2)(x+2) ✓; (D) x²−2x−8: find p×q=−8, p+q=−2 → (−4)(+2): (x−4)(x+2) ✓. Only (B) is irreducible. Proceed to A04.

*Branch INCORRECT:* x²+16 cannot be written as (x+4)(x+4)=x²+8x+16 (wrong!) or (x−4)(x+4)=x²−16 (wrong!). Sum of squares x²+k² has no real factor pair. Use the discriminant: b²−4ac=0−4(16)=−64<0 → no real roots → irreducible. Proceed to A04.

*Branch NO_RESPONSE:* A sum of squares x²+k² (k≠0) is always irreducible over ℝ. Check each: (A)=(x−4)(x+4), (C)=2(x−2)(x+2), (D)=(x−4)(x+2) all factor; only (B) does not. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*Factor completely. Show all steps including GCF extraction if applicable.*

**Problem 1.** x²+7x+12

**Problem 2.** x²−3x−18

**Problem 3.** 3x²+11x+6

**Problem 4.** 4x²−4x−3

---

**[P55 — SCORE]**

*Answers:*

1. Find p×q=12, p+q=7 → (3,4): **(x+3)(x+4)**
   Verify: x²+4x+3x+12=x²+7x+12 ✓

2. Find p×q=−18, p+q=−3 → (3,−6): **(x+3)(x−6)**
   Verify: x²−6x+3x−18=x²−3x−18 ✓

3. ac=3×6=18; find p×q=18, p+q=11 → (2,9):
   3x²+2x+9x+6 = x(3x+2)+3(3x+2) = **(x+3)(3x+2)**
   Verify: 3x²+2x+9x+6=3x²+11x+6 ✓

4. ac=4×(−3)=−12; find p×q=−12, p+q=−4 → (2,−6):
   4x²+2x−6x−3 = 2x(2x+1)−3(2x+1) = **(2x−3)(2x+1)**
   Verify: 4x²+2x−6x−3=4x²−4x−3 ✓

Score 1 point per problem (P77 total: 4 points).

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence — cross_links = [])*

*Problem:* Factor completely: **6x³−x²−12x**

Note: This problem requires first extracting the GCF, then factoring the resulting trinomial.

(a) Identify and factor out the GCF.
(b) Apply the AC method to the remaining trinomial factor.
(c) Write the completely factored form and verify by expanding.

*Expected solution:*

(a) GCF = x: 6x³−x²−12x = x(6x²−x−12)

(b) AC method on 6x²−x−12:
   ac = 6×(−12) = −72; find p×q=−72, p+q=−1 → pair (8, −9) since 8×(−9)=−72 and 8+(−9)=−1 ✓
   6x²+8x−9x−12 = 2x(3x+4)−3(3x+4) = (2x−3)(3x+4)

(c) Completely factored: **x(2x−3)(3x+4)**

Verify: (2x−3)(3x+4)=6x²+8x−9x−12=6x²−x−12; then x(6x²−x−12)=6x³−x²−12x ✓

---

**[P55 — SCORE]**

Transfer probe scoring: 1 point (GCF extraction correct, AC method correct, final form correct, verified).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.8 × 5⌉ = 4). Total n = 5 (P77 items: 4, P76: 1).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 or 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Review missed items; identify pattern (sign errors → B02; non-monic method → B01); targeted re-explanation |
| ≤ 2/5 | → Return to A01; re-engage factor-pair analogy; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.alg.factoring-trinomials` complete. Threshold 0.8 requires 4/5 correct.

**Unlocks:** `math.alg.quadratic-equation`

Next concept recommendation: `math.alg.quadratic-equation` — factoring trinomials is the primary method for solving quadratics without the quadratic formula.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — MONIC-SHORTCUT-FOR-NONMONIC Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You applied the monic shortcut — finding two numbers with product c and sum b — to a non-monic trinomial. This rule only works when a=1. When a≠1, the product target changes from c to ac."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* For 2x²+7x+3, a student finds the pair (1, 3) since 1×3=3 and 1+3=4≠7. They then try (3, 1) — same. They conclude it does not factor. Is this correct?
*Correct response:* No. The correct product target is ac=2×3=6, not c=3. Find p×q=6, p+q=7 → pair (1,6): 2x²+x+6x+3=x(2x+1)+3(2x+1)=(x+3)(2x+1).

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'product target = c' → to: 'product target = ac when a≠1.' The rule Σ(product=c) applies only to monic polynomials. For non-monic, the AC method finds a pair for ac, splits the middle term, then uses grouping — a mechanically different but reliable procedure."

---

### Repair Action B02 — SIGN-ERROR-IN-GROUPING Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You made a sign error when factoring by grouping. After splitting the middle term, factoring out a GCF from the second group must preserve the correct sign on the common binomial factor."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Factor 2x²−5x+3. Student splits as 2x²−2x−3x+3 and writes 2x(x−1)−3(x+1) — claiming the factors are different. What is the error?
*Correct response:* −3x+3 = −3(x−1), not −3(x+1). Since 3×(−1)=−3 and there is a +3 at the end: −3(x−1)=−3x+3 ✓. Both groups share (x−1), so: 2x(x−1)−3(x−1)=(2x−3)(x−1).

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'distribute to check the sign after grouping' → to: 'verify the common binomial factor by expanding the group's GCF × binomial before writing the outer product.' Always expand −k(px+q) and compare term-by-term to the original split terms."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Factor x²+2x−15. |
| R2 | 3 days | Factor 4x²+8x+3 using the AC method. |
| R3 | 7 days | Factor completely: 5x³−5x²−30x. (Hint: extract GCF first.) |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | — |
| P76_mode | independence (cross_links = []) |
| Unlocks | math.alg.quadratic-equation |
| Requires (Tier-1) | math.alg.factoring-gcf |

**GR-8 compliance:** No cross-links to document.
**GR-9 compliance:** P76 uses an independent problem (GCF + AC on a cubic) unrelated to any cross-linked concept.

---

## Component 8 — Teaching Notes

- **GCF-first rule:** Emphasize repeatedly: always check for and extract GCF before attempting trinomial factoring. P76 deliberately includes a cubic where GCF extraction is the first step — this reinforces the habit.
- **Irreducible check:** After any factoring attempt, if no factor pair exists for ac (no integer pair), compute the discriminant b²−4ac. If negative → irreducible over ℝ; if a perfect square → rational factors exist (possible arithmetic error); if non-square positive → irrational roots (use quadratic formula, not factoring).
- **Verification as habit:** Every WE ends with expand-and-verify. Students who skip verification consistently make and repeat MC-2 sign errors.
- **AC method naming:** Some curricula call this the "split the middle" or "grouping method." All names refer to the same procedure.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=P; concrete stage skipped for proficient | N/A |
| V-4 | bloom=apply → P07 present in main sequence | PASS (A02) |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P03, A02=P07, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, cross_links=[]) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.8×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=8 → standard structure (3 main TAs + gate) | PASS (A01, A02, A03, A04=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
