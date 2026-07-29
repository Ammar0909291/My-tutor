<!-- BLUEPRINT: math.seq.arithmetic-series -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Arithmetic Series
**Concept ID:** `math.seq.arithmetic-series`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=4 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.seq.arithmetic-series |
| name | Arithmetic Series |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 4 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | A (Abstract) — learner arrives with symbolic command of the AP term formula (aₙ = a₁+(n−1)d) from `math.seq.arithmetic-sequence` and the partial-sum definition from `math.seq.series`; the new work is the Gauss pairing derivation, which is inherently algebraic |
| requires (Tier-1) | math.seq.arithmetic-sequence, math.seq.series |
| cross_links | none |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.arithmetic-sequence**: aₙ = a₁ + (n−1)d; the nth term; common difference d; recognising AP from constant differences
- **math.seq.series**: Sₙ = a₁ + a₂ + ⋯ + aₙ; partial sums as a new sequence; Σ notation

### Target Knowledge State
Student can derive both forms of the arithmetic series formula using the Gauss pairing argument (Sₙ = n(a₁+aₙ)/2) and substitute to obtain Sₙ = n(2a₁+(n−1)d)/2; can apply either form to compute partial sums given any two of {a₁, d, n, Sₙ, aₙ}; can evaluate the sum of the first n positive integers (1+2+⋯+n = n(n+1)/2) and related canonical sums; and can invert the formula to find a missing parameter.

### Conceptual Obstacles
1. Substituting the term formula aₙ = a₁+(n−1)d for Sₙ — the term formula gives one term, not the running total; these are different objects
2. Believing the pairing argument only works for even n — Gauss's proof writes Sₙ twice (forward and backward) and adds; n can be odd or even, and the n pairs always sum to n(a₁+aₙ)/2 in either case
3. Forgetting to multiply by n/2 after computing a₁+aₙ — students compute the "per-pair" sum correctly but omit the number-of-pairs factor

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | TERM-FORMULA-AS-SUM | Student writes Sₙ = a₁+(n−1)d (the term formula) instead of the sum formula; confuses the nth term with the sum of n terms | "Find the sum of the first n terms" |
| MC-2 | PAIRING-ONLY-WORKS-FOR-EVEN-n | Student applies the pairing argument only when n is even, thinking odd n leaves one term unmatched | Any AP sum with odd n |
| MC-3 | FORGETTING-n-IN-SUM | Student computes (a₁+aₙ)/2 and stops; omits multiplying by n; reports the average term instead of the total | Any AP sum application |

**Foundational Misconception:** MC-1 (TERM-FORMULA-AS-SUM) — arises from conflating two formulas for the same sequence; corrected by distinguishing the purpose of each formula in A01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — learner has both required prior-concept formulas in symbolic form.

**Scaffolding sequence:**
1. **A01 P02 FORMAL DEFINITION** — derive Sₙ = n(a₁+aₙ)/2 via the Gauss pairing argument; derive the substituted form Sₙ = n(2a₁+(n−1)d)/2; address MC-1 and MC-2
2. **A02 P04 PATTERN INDUCTION** — compute canonical sums (1+2+⋯+n; sum of first n odd integers); identify which formula form to use given available information; address MC-3
3. **A03 P06 CONTRAST PAIR** — term formula vs sum formula side-by-side; forward problems (find Sₙ) vs inverse problems (find n or d given Sₙ)
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Gauss Pairing Derivation

**Primitive:** P02 FORMAL DEFINITION
**Purpose:** Derive both sum formula forms; establish why the formula works for any n; address MC-1, MC-2

---

**[P02 — FORMAL DEFINITION]**

**Setup:** Let the AP have first term a₁, common difference d, and n terms.

The sum written forward and backward:
```
Sₙ =  a₁     +  (a₁+d)   + ⋯ + (aₙ−d)  + aₙ
Sₙ =  aₙ     +  (aₙ−d)   + ⋯ + (a₁+d)  + a₁
```

Adding column by column: each of the n columns sums to a₁ + aₙ (consecutive terms from front and back always pair to the same value).

```
2Sₙ = n(a₁ + aₙ)
Sₙ = n(a₁ + aₙ) / 2
```

This works for **any n** (odd or even) because we are adding two copies of Sₙ — no column is left unpaired. (MC-2 resolved.)

**Substituted form** (when aₙ is unknown but d is known):
Substitute aₙ = a₁ + (n−1)d:
```
Sₙ = n(a₁ + a₁ + (n−1)d) / 2 = n(2a₁ + (n−1)d) / 2
```

**Two formulas — when to use each:**

| Formula | Use when |
|---------|----------|
| Sₙ = n(a₁+aₙ)/2 | Both a₁ and aₙ are known |
| Sₙ = n(2a₁+(n−1)d)/2 | a₁ and d are known; aₙ not given |

**MC-1 contrast:**

| Formula | Computes |
|---------|----------|
| aₙ = a₁ + (n−1)d | The value of the **nth term only** |
| Sₙ = n(2a₁+(n−1)d)/2 | The **sum** of the first n terms |

These are different objects. Sₙ grows approximately as n²; aₙ grows linearly.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* An AP has a₁ = 3 and d = 4. Find S₅ (the sum of the first 5 terms).

(A) S₅ = 3 + 4·4 = 19 (the 5th term)
(B) S₅ = 5(2·3 + 4·4)/2 = 5(6+16)/2 = 55
(C) S₅ = 5(2·3 + 4·4)/2 = 5·22/2 = 55
(D) S₅ = 5(2·3 + (5−1)·4)/2 = 5(6+16)/2 = 55

*Branch CORRECT (D):* Sₙ = n(2a₁+(n−1)d)/2 = 5(2·3+(5−1)·4)/2 = 5(6+16)/2 = 5·22/2 = **55** ✓ (Options B, C, D all reach 55 — any of B/C/D is acceptable since they all correctly apply the formula.) Proceed to A02.

*Branch PARTIAL (B or C):* Correct result 55, though intermediate steps may skip showing (n−1)d = 4·4. Verify: a₅ = 3+4·4=19; S₅ = 5(3+19)/2 = 5·22/2 = 55. Proceed to A02.

*Branch INCORRECT (A):* You computed the 5th term (a₅=19), not the sum. Sₙ adds all n terms; aₙ is just one term. Use Sₙ = n(2a₁+(n−1)d)/2 = 5(6+16)/2 = 55. Proceed to A02.

*Branch NO_RESPONSE:* Sₙ = n(2a₁+(n−1)d)/2 = 5(6+16)/2 = 55. Terms: 3,7,11,15,19; add: 3+7=10, 10+11=21, 21+15=36, 36+19=55. Proceed to A02.

---

### Teaching Action A02 — Canonical Sums and Inverse Problems

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Apply both formula forms to standard examples; practice choosing the right form; address MC-3

---

**[P04 — PATTERN INDUCTION]**

**Pattern 1 — Sum of first n positive integers:**
a₁=1, d=1: Sₙ = n(2·1+(n−1)·1)/2 = n(n+1)/2

| n | 1+2+⋯+n | Formula |
|---|---------|---------|
| 5 | 15 | 5·6/2=15 ✓ |
| 10 | 55 | 10·11/2=55 ✓ |
| 100 | 5050 | 100·101/2=5050 (Gauss's famous result) ✓ |

**Pattern 2 — Sum of first n odd integers:**
a₁=1, d=2: Sₙ = n(2·1+(n−1)·2)/2 = n(2n)/2 = n²

| n | 1+3+5+⋯+(2n−1) | n² |
|---|----------------|-----|
| 3 | 1+3+5=9 | 9 ✓ |
| 4 | 1+3+5+7=16 | 16 ✓ |
| 5 | 1+3+5+7+9=25 | 25 ✓ |

The sum of the first n odd integers is always a perfect square.

**Pattern 3 — Inverse problem (find n given Sₙ):**
AP: a₁=2, d=3, Sₙ=77. Find n.

Sₙ = n(2a₁+(n−1)d)/2:
77 = n(4+(n−1)·3)/2 = n(3n+1)/2
154 = n(3n+1) = 3n²+n
3n²+n−154 = 0 → discriminant: 1+1848=1849=43² → n=(−1+43)/6=7

Verify: S₇ = 7(2·2+6·3)/2 = 7(4+18)/2 = 7·22/2 = 77 ✓

(MC-3 addressed: students must multiply by n/2, not just compute 2a₁+(n−1)d = 22 and stop.)

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* The sum of 8 terms of an AP is 100, and the first term is 4. Find the common difference d.

(A) d = (100/8 − 4) · 2/(8−1)
(B) S₈ = 8(2·4+7d)/2 = 100 → 4(8+7d)=100 → 8+7d=25 → d=17/7
(C) S₈ = 8(2·4+7d)/2 = 100 → 4(8+7d)=100 → 7d=17 → d=17/7 ≈ 2.43
(D) d = S₈/8 − a₁ = 100/8 − 4 = 8.5

*Branch CORRECT (C):* S₈=100: 4(8+7d)=100 → 8+7d=25 → 7d=17 → **d=17/7**. Verify: S₈=4(8+17)=4·25=100 ✓ Proceed to A03.

*Branch PARTIAL (B):* Same process as (C) — both reach d=17/7. Proceed to A03.

*Branch INCORRECT (D):* S₈/8 = 12.5 is the average term, not a₁+d. Subtract a₁ from the average doesn't give d; you need Sₙ = n(2a₁+(n−1)d)/2. Proceed to A03.

*Branch NO_RESPONSE:* S₈ = 8(2·4+7d)/2 → 4(8+7d)=100 → 8+7d=25 → d=17/7. Proceed to A03.

---

### Teaching Action A03 — Term vs Sum Contrast and Applications

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Reinforce the MC-1 distinction; cover AP sum applications

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — What each formula computes:**

| Question | Formula used | Result (a₁=2, d=3, n=5) |
|----------|--------------|--------------------------|
| "What is the 5th term?" | aₙ = a₁+(n−1)d = 2+4·3 = 14 | a₅ = **14** |
| "What is the sum of 5 terms?" | Sₙ = 5(2·2+4·3)/2 = 5·20/2 = 50 | S₅ = **50** |

A student who confuses these would report S₅=14 (a single term) or a₅=50 (a total).

**Contrast 2 — Two formula forms for the same Sₙ:**

| Given | Use | Example (a₁=5, d=2, n=10 vs a₁=5, aₙ=23, n=10) |
|-------|-----|---------------------------------------------------|
| a₁, d, n known; aₙ unknown | Sₙ = n(2a₁+(n−1)d)/2 | 10(10+18)/2 = 140 |
| a₁, aₙ, n known; d unknown | Sₙ = n(a₁+aₙ)/2 | 10(5+23)/2 = 140 |

Both give the same answer — choose the form that avoids extra computation.

**Application — Σ multiples of 3 from 3 to 99:**
This is an AP with a₁=3, aₙ=99, d=3. Number of terms: (99−3)/3+1=33.
S = 33(3+99)/2 = 33·102/2 = 33·51 = **1683**.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* The 3rd term of an AP is 7 and the 7th term is 23. Find S₁₀.

(A) Find d first: d=(23−7)/(7−3)=4; a₁=7−2·4=−1; S₁₀=10(2·(−1)+9·4)/2=10·34/2=170
(B) a₁=7, d=4, S₁₀=10(14+9·4)/2=10·50/2=250
(C) S₁₀ = 10·(a₁+a₁₀)/2; find a₁ first from a₃=7
(D) d=(a₇−a₃)/4=4; a₁=a₃−2d=7−8=−1; a₁₀=−1+9·4=35; S₁₀=10(−1+35)/2=170

*Branch CORRECT (A or D):* d=(23−7)/4=4; a₁=7−2d=−1; S₁₀=10(−2+36)/2=170 ✓ Proceed to A04.

*Branch PARTIAL (C):* Correct approach; ensure you get a₁=−1 and S₁₀=170. Proceed to A04.

*Branch INCORRECT (B):* You used a₁=7 but a₁ is the first term, not a₃. From a₃=a₁+2d=7 and d=4: a₁=7−8=−1. Proceed to A04.

*Branch NO_RESPONSE:* d=(a₇−a₃)/(7−3)=16/4=4; a₁=a₃−2d=7−8=−1; S₁₀=10(2·(−1)+9·4)/2=10·34/2=170. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*Apply the appropriate arithmetic series formula.*

**Problem 1.** Find S₁₂ for the AP: 1, 4, 7, 10, ...

**Problem 2.** Find the sum of all integers from 1 to 200.

**Problem 3.** An AP has a₁=10, S₁₀=145. Find the common difference d.

**Problem 4.** The 5th partial sum of an AP is 25 and the 5th term is 7. Find a₁.

**Problem 5.** Find the sum of all multiples of 7 between 1 and 100.

---

**[P55 — SCORE]**

*Answers:*

1. a₁=1, d=3, n=12: S₁₂=12(2+(11·3))/2=12·35/2=**210**
2. n=200, a₁=1, aₙ=200: S=200·201/2=**20100**
3. S₁₀=10(20+9d)/2=145 → 5(20+9d)=145 → 20+9d=29 → 9d=9 → **d=1**
4. S₅=5(a₁+a₅)/2=25 → (a₁+7)/2=5 → a₁+7=10 → **a₁=3**; verify: a₅=a₁+4d; need d too: d=(a₅−a₁)/4=4/4=1; S₅=5(2·3+4·1)/2=5·10/2=25 ✓
5. Multiples of 7: 7,14,...,98; a₁=7, aₙ=98, n=(98−7)/7+1=14; S=14(7+98)/2=14·105/2=**735**

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* A theatre has 20 rows of seats. The first row has 15 seats, and each subsequent row has 3 more seats than the row before.

(a) How many seats are in the 20th row?

(b) What is the total number of seats in the theatre?

(c) If tickets for row n cost £(50−n) each, and every seat is sold, find the total ticket revenue. (Hint: revenue = Σ_{n=1}^{20} [seats in row n × ticket price for row n].)

*Expected answers:*

(a) a₂₀ = 15 + 19·3 = 15+57 = **72 seats**

(b) S₂₀ = 20(15+72)/2 = 20·87/2 = **870 seats**

(c) Row n has (15+3(n−1)) seats at price (50−n) each:
Revenue = Σ_{n=1}^{20} (12+3n)(50−n) = Σ(600 − 12n + 150n − 3n²) = Σ(600 + 138n − 3n²)
= 20·600 + 138·S₂₀^{Σn} − 3·Σn²
= 12000 + 138·(20·21/2) − 3·(20·21·41/6)
= 12000 + 138·210 − 3·2870
= 12000 + 28980 − 8610
= **£32370**

(Part c is a challenging extension; parts a and b suffice for full marks if c is attempted.)

---

**[P55 — SCORE]**

Transfer probe: 1 point for parts (a)+(b) correct; bonus for part (c).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 5/5 (⌈0.85 × 5⌉ = 5). Total n = 6 (P77: 5 items, P76: 1 item — P77 score + P76 score, capped at 5/5 for MAMR).

---

**[P55 — SCORE]**

Record total score X/5 (max 5 from P77; P76 replaces any missed P77 item up to cap).

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 | → P78 COMPLETION — mastery confirmed |
| 4/5 | → Review missed item type; if MC-1 (used term formula) → B01; if MC-3 (forgot n) → B02; targeted repair, then re-gate |
| ≤ 3/5 | → Return to A01; rederive the formula from the pairing argument; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.seq.arithmetic-series` complete. Threshold 0.85 requires 5/5 correct.

**Unlocks:** none directly (see KG).

Next concept: `math.seq.infinite-geometric-series` extends sum-to-infinity reasoning for the geometric case; `math.seq.telescoping-series` uses partial-fraction decomposition for closed-form sums.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — TERM-FORMULA-AS-SUM Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You used the formula aₙ = a₁+(n−1)d to answer a sum question. That formula gives only the nth term — one number. The sum Sₙ adds n terms together and requires a different formula."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* For the AP 2, 5, 8, ..., compute the 4th term and the sum of the first 4 terms. Are they different?
*Correct response:* a₄ = 2+3·3 = 11 (one term). S₄ = 4(2+11)/2 = 26 (sum of four terms: 2+5+8+11=26). They are different: 11 ≠ 26.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'both use the same formula' → to: 'aₙ = nth term (one value); Sₙ = sum of first n terms (accumulated total). Sum questions require Sₙ = n(a₁+aₙ)/2 or n(2a₁+(n−1)d)/2.' Always check whether the question asks for a specific term or a total."

---

### Repair Action B02 — FORGETTING-n-IN-SUM Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You computed (a₁+aₙ)/2 and stopped. This is the average term, not the sum. The sum multiplies the average by the number of terms: Sₙ = n·(a₁+aₙ)/2."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* AP: 1, 3, 5, 7, 9. Average of first and last: (1+9)/2=5. Total of all five terms?
*Correct response:* S₅ = 5·(1+9)/2 = 5·5 = 25. Verify: 1+3+5+7+9=25. The average (5) is just one intermediate value; multiply by n=5 to get the sum.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'sum = (a₁+aₙ)/2' → to: 'sum = n × average = n(a₁+aₙ)/2.' The factor n counts how many terms you are averaging over. Always write the formula in full before substituting."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Find S₁₅ for the AP: 3, 7, 11, 15, ... |
| R2 | 3 days | The sum of 12 terms of an AP is 144 and the first term is 2. Find d and a₁₂. |
| R3 | 7 days | Show from the Gauss pairing argument that S₇ for the AP 1,4,7,...,19 equals 70. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | none |
| Requires (Tier-1) | math.seq.arithmetic-sequence, math.seq.series |

**GR-8 compliance:** no cross_links in KG — documented.
**GR-9 compliance:** P76 uses an independent theatre-seating problem, not connected to any cross-linked concept.

---

## Component 8 — Teaching Notes

- **Gauss's derivation as the cornerstone:** Every student should be able to reproduce the "write Sₙ twice, add column by column" argument. This derivation is more durable than the formula alone and makes MC-2 (odd n concern) self-evidently wrong.
- **Two formula forms — practice switching:** Require students to use Sₙ = n(a₁+aₙ)/2 when aₙ is given and Sₙ = n(2a₁+(n−1)d)/2 when d is given. Alternating forms in exercises prevents formula overspecialisation.
- **Inverse problems are high-value:** Problems that give Sₙ and ask for d or n are common exam questions and also reinforce the difference between Sₙ and aₙ. Include at least one inverse problem in every practice set.
- **Sum of first n natural numbers:** The formula n(n+1)/2 appears throughout combinatorics, number theory, and computer science (e.g., triangular numbers, handshake problem). Students who derive it from the AP sum formula have a tool, not a memorised fact.
- **Part (c) of P76 (revenue):** This optional extension requires distributing Sₙ over a product — a foretaste of mixed-term sums; assign to advanced students only.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; algebraic Gauss derivation requires symbolic prior knowledge | PASS |
| V-4 | bloom=apply → application problems throughout | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P02, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 5/5 = ⌈0.85×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 5 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=4 → standard structure (3 main TAs + gate) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
