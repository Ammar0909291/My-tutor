# Teaching Blueprint: Subtraction
**ID:** `math.arith.subtraction`
**Version:** 1.0
**Status:** PACKAGE_READY
**Spec:** Teaching Blueprint Specification v1.0

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.subtraction` |
| concept_name | Subtraction |
| domain | arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.95 |
| estimated_hours | 10 |
| requires | `math.arith.addition` |
| unlocks | `math.arith.negative-numbers`, `math.arith.multiplication` |
| cross_links | (none) |
| blueprint_version | 1.0 |
| authored_date | 2026-07-12 |
| CPA_ENTRY_STAGE | C |

---

## Component 1 — Cognitive Map

### 1.1 Core Insight
Subtraction is the inverse operation of addition: a − b = c if and only if c + b = a. It computes the difference between two quantities and enables the "how many remain?" and "how far apart?" questions. Column subtraction with borrowing enforces place-value: when a minuend digit is smaller than the subtrahend digit, one unit from the next column is regrouped.

### 1.2 Knowledge Prerequisites (Activated)
- **math.arith.addition:** Column addition with carrying; commutativity; zero identity. Subtraction is defined via addition's inverse.

### 1.3 Conceptual Sequence
1. Subtraction as inverse of addition: a − b = c iff c + b = a.
2. Two models: take-away (remove b objects from a) and difference (how far apart are a and b?).
3. Non-commutativity: a − b ≠ b − a in general (contrast with addition).
4. Zero: a − 0 = a; a − a = 0.
5. Column subtraction with borrowing: when minuend digit < subtrahend digit, regroup 1 from the next column (adds 10 to current column, reduces next column by 1).
6. Verification: c + b = a confirms the subtraction is correct.

### 1.4 Transfer Target
Column subtraction of multi-digit numbers with borrowing; understanding subtraction as the inverse of addition (verified by adding back); appreciation that subtraction is not commutative — a prerequisite intuition for signed integers.

---

## Component 2 — Misconception Registry

| ID | Name | Surface Pattern | Root Cause | Priority |
|---|---|---|---|---|
| MC-1 | SMALLER-FROM-LARGER | Subtracts smaller digit from larger regardless of position: 53−28 ones column → 8−3=5, answer 35 | Skips borrowing entirely; treats each column as independent and avoids negative digits by reversing the subtraction | FOUNDATIONAL |
| MC-2 | COMMUTATIVITY-ASSUMED | Claims a−b = b−a; writes 3−8 = 8−3 = 5 | Overgeneralises commutativity from addition to subtraction | SECONDARY |
| MC-3 | BORROW-NOT-REDUCED | Borrows correctly for the current column but forgets to reduce the donor column by 1 | Knows the borrowing step for the current column but treats it as "free" — doesn't track the debt to the next column | SECONDARY |

**MAMR:** MC-1 FOUNDATIONAL cleared first. MC-2 and MC-3 addressed FIFO thereafter.

---

## Component 3 — Scaffolding Protocol

| Stage | Condition | Entry Action |
|---|---|---|
| C (Concrete) | foundational → always | Begin TA-A01 with take-away analogy and counting-back model |
| P (Pictorial) | After C → introduce column notation | TA-A02 P07 worked examples with column grid and borrowing |
| A (Abstract) | After P → non-commutativity and zero rules | TA-A03 (contrast pair), TA-A04 (pattern induction) |

---

## Component 4 — Protocol A (Main Teaching Protocol)

### TA-A01 — Concrete Opening: Take-Away and Difference
**Primitives:** P03 (ANALOGY BRIDGE), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (opens with B-category P03); GR-2 ✓ (P49 present)

**P03 — ANALOGY BRIDGE**
> "You have 53 coins. You spend 28. How many remain?
>
> Two ways to think about this:
> - **Take-away:** Start with 53, remove 28. What's left?
> - **Difference:** How far apart are 53 and 28 on the number line?
>
> Both give the same answer: **53 − 28 = 25**.
>
> Verification: does 25 + 28 = 53? Yes. **Subtraction is the inverse of addition** — the answer plus the subtracted number must equal the original. This check always works."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 40 − 15. Then verify by adding back: does your answer + 15 = 40?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 25; and 25 + 15 = 40 confirmed | TA-A02 |
| PARTIAL | 25 correct but doesn't verify / verification fails | TA-A02 (reinforce verification habit; note MC-3 risk) |
| INCORRECT | Answer 35 (SMALLER-FROM-LARGER: 5−0=5 in ones, 4−1=3 in tens) | TA-B01 (MC-1 repair) → TA-A02 |
| NO_RESPONSE | No answer | "If you have 40 and remove 15, how many remain? Count back 15 from 40." If stuck → TA-B01 |

---

### TA-A02 — Worked Example Pair: Column Subtraction with Borrowing
**Primitives:** P07 (WORKED EXAMPLE PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P07 is B-category); GR-2 ✓; bloom=apply → P07 required ✓

**P07 — WORKED EXAMPLE PAIR**

*Example 1 — single borrow:*
> Compute 53 − 28.
>
> **Ones column:** 3 < 8 → cannot subtract. Borrow 1 ten from the tens column.
> Tens becomes 5 − 1 = **4**. Ones becomes 10 + 3 = **13**.
> 13 − 8 = **5** in ones.
>
> **Tens column:** 4 − 2 = **2** in tens.
>
> **Answer: 25.** Verify: 25 + 28 = 53 ✓

*Example 2 — double borrow:*
> Compute 401 − 167.
>
> **Ones:** 1 < 7 → borrow from tens. But tens digit is 0 — must first borrow from hundreds.
> Hundreds: 4 → 3. Tens: 0 → 10. Now borrow 1 ten for ones: tens → 9, ones → 11.
> 11 − 7 = **4** ones.
>
> **Tens:** 9 − 6 = **3** tens.
>
> **Hundreds:** 3 − 1 = **2** hundreds.
>
> **Answer: 234.** Verify: 234 + 167 = 401 ✓

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 82 − 47. Show borrowing explicitly."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 35 with borrowing shown; verification optional | TA-A03 |
| PARTIAL | 35 correct but borrowing not shown / tens not reduced | TA-B03 (MC-3 repair) → TA-A03 |
| INCORRECT | Answer 45 (SMALLER-FROM-LARGER: 7−2=5 in ones, 8−4=4 in tens) | TA-B01 (MC-1 repair) → TA-A03 |
| NO_RESPONSE | No attempt | "Which column do we start from? Is 2 ≥ 7? What do we do when it's not?" If stuck → TA-B01 |

---

### TA-A03 — Non-Commutativity: Contrast Pair
**Primitives:** P06 (CONTRAST PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P06 is B-category); GR-2 ✓

**P06 — CONTRAST PAIR**
> | Operation | Result | Commutative? |
> |---|---|---|
> | 8 + 3 | 11 | Same as 3 + 8 = 11 ✓ |
> | **8 − 3** | **5** | **≠ 3 − 8** (which would be negative) |
> | 3 − 8 | **−5** (or "undefined" over ℕ) | Subtraction is NOT commutative |
>
> **Physical model:** Taking 3 away from 8 leaves 5. Taking 8 away from 3 — you run out of objects. Order matters: the minuend (the number we start with) must be named first.

**P49 — ADAPTIVE CHECKPOINT**
> "True or false: 100 − 37 = 37 − 100. Explain."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | False; subtraction is not commutative; 37−100 would be negative | TA-A04 |
| PARTIAL | Says false but cannot explain | TA-A04 (acceptable at foundational level) |
| INCORRECT | Says true | TA-B02 (MC-2 repair) → TA-A04 |
| NO_RESPONSE | No answer | "If you have 37 coins and owe 100, can you pay? That's 37 − 100." If stuck → TA-B02 |

---

### TA-A04 — Zero Rules: Pattern Induction
**Primitives:** P04 (PATTERN INDUCTION), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P04 is B-category); GR-2 ✓

**P04 — PATTERN INDUCTION**
> | Expression | Value | Pattern |
> |---|---|---|
> | 7 − 0 | 7 | subtracting nothing leaves the number unchanged |
> | 15 − 0 | 15 | same pattern |
> | 100 − 0 | 100 | same pattern |
> | 7 − 7 | 0 | removing all copies leaves zero |
> | 53 − 53 | 0 | same: a − a = 0 for any a |
>
> **Two zero rules:** a − 0 = a (zero subtracted = identity preserved); a − a = 0 (self-subtraction = zero).

**P49 — ADAPTIVE CHECKPOINT**
> "Compute: (a) 4,729 − 0   (b) 4,729 − 4,729   (c) 0 − 0"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) 4,729, (b) 0, (c) 0 | TA-A05 |
| INCORRECT | (a) 0 (ZERO-ANNIHILATES transferred from multiplication) | Prompt: "If I take nothing away from 4,729, how many remain?" |
| NO_RESPONSE | No answer | Restate: "Subtracting 0 = taking away nothing. What remains?" |

---

### TA-A05 — Mastery Gate
**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Grammar:** GR-3 ✓ (terminal); GR-6 ✓; GR-7 ✓ (P76 in gate); GR-9: cross_links = [] → P76 INDEPENDENCE PROBE

**pass_criterion:** ⌈0.95 × 5⌉ = **5 / 5** (4 P77 items + 1 P76 item)

**P77 — MULTI-PROBLEM SET (4 items)**
1. Compute 73 − 48. Show borrowing.
2. Compute 503 − 278.
3. A bookshop had 824 books and sold 367. How many remain?
4. True or false: 500 − 200 = 200 − 500. Name the property this relates to.

**P55 — SCORE** (tally P77 results)

**P76 — TRANSFER PROBE (INDEPENDENCE)**
> Compute 1,001 − 999 using column subtraction with borrowing. Then compute the same difference by asking "how many steps from 999 to 1,001 on the number line?"
>
> (a) Give the answer by both methods.
> (b) Do both methods agree? Why?
> (c) Verify your answer using addition.

*(Expected: (a) 2 by both; (b) yes — subtraction = distance = inverse of addition; (c) 2 + 999 = 1,001 ✓.)*

**P55 — SCORE** (add P76 result)

**P75 — MASTERY ASSESSMENT**
- pass: 5 / 5 → MASTERY ACHIEVED
- fail: ≤ 4 / 5 → MASTERY NOT ACHIEVED

**P55 — SCORE** (record mastery outcome)

**P74 — ROUTING DECISION**
- MASTERY ACHIEVED → P78
- MASTERY NOT ACHIEVED → P77 items 1–2 failed → TA-B01 or TA-B03; P77 item 4 failed → TA-B02; re-enter TA-A02

**P55 — SCORE** (record routing)

**P78 — COMPLETION**
> "You can now perform column subtraction with borrowing, verify using addition, recognise that subtraction is not commutative, and apply the zero rules a−0=a and a−a=0. The transfer probe showed that subtraction also measures the distance between two numbers on the number line — the insight that powers negative numbers, which come next."

---

## Component 5 — Protocol B (Repair Protocol)

### TA-B01 — Repair: SMALLER-FROM-LARGER (MC-1 FOUNDATIONAL)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-4 ✓

**P27 — MISCONCEPTION NAMING**
> "The error **SMALLER-FROM-LARGER** occurs when a digit in the ones column of the minuend is smaller than the corresponding digit in the subtrahend — instead of borrowing, the student flips the subtraction (subtracts the larger from the smaller). For example, 53−28: ones column 3 < 8 → computes 8−3=5 → incorrect answer 35."

**P41 — MISCONCEPTION DETECTOR**
> "In 53−28: in the ones column, you have 3 (top) and 8 (bottom). Is 3 ≥ 8? Can you subtract 8 from 3 and get a non-negative result? What does that tell you?"

**P64 — CONCEPTUAL SHIFT**
> "When the top digit is smaller than the bottom digit in a column, we **borrow** 1 unit from the next column to the left. That 1 unit equals 10 in the current column. So ones becomes 10 + 3 = 13; we can now subtract 8: 13 − 8 = 5. The tens column pays for this: 5 − 1 = 4 tens. Then 4 − 2 = 2. Answer: 25.
>
> Flipping (8−3) silently changes the problem from '53−28' to '53−(20+3)=30', not 53−28. It gives a wrong answer and a wrong original problem."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 71 − 46 with explicit borrowing shown."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 25 with borrowing | Return to TA-A02 CORRECT branch |
| INCORRECT | Still writes 35 (flipping) | Physically: count out 71 objects, remove 46, count remainder |

---

### TA-B02 — Repair: COMMUTATIVITY-ASSUMED (MC-2)
**Primitives:** P27 (MISCONCEPTION NAMING), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **COMMUTATIVITY-ASSUMED** says a − b = b − a, copying addition's commutative law. This is false for subtraction: removing 8 objects from 3 is not the same as removing 3 from 8."

**P64 — CONCEPTUAL SHIFT**
> "In a − b, *a* is the minuend (what you start with) and *b* is the subtrahend (what you remove). These roles are not interchangeable. 8 − 3 = 5 (start with 8, remove 3) but 3 − 8 would require starting with 3 and removing 8 — you run out. Over the natural numbers, 3 − 8 is undefined; over the integers it is −5. Either way, it is not equal to 8 − 3 = 5."

**P49 — ADAPTIVE CHECKPOINT**
> "Is 20 − 7 the same as 7 − 20? Compute both (if possible) and explain."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 20−7=13; 7−20 not possible over ℕ (or = −13); not equal | Return to TA-A03 CORRECT branch |
| INCORRECT | Says both equal 13 | "7−20: you have 7 objects, remove 20 — do you have enough?" |

---

### TA-B03 — Repair: BORROW-NOT-REDUCED (MC-3)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **BORROW-NOT-REDUCED** correctly adds 10 to the current column when borrowing but forgets to subtract 1 from the donor column to the left. The borrow is a *loan* — the current column gains 10 and the next column loses 1."

**P41 — MISCONCEPTION DETECTOR**
> "In 82 − 47: you borrow 1 ten for the ones column, making ones 12. Where did that 10 come from? Does the tens column still have 8 tens, or something less?"

**P64 — CONCEPTUAL SHIFT**
> "Borrowing is a two-step operation: (1) add 10 to the current column (the loan); (2) subtract 1 from the next column (repay the loan to the left). Step 2 is not optional — skipping it overcounts the total. Think of it as moving 1 ten from tens to ones: the total is unchanged, only the column representation changes."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 62 − 35 showing both borrowing steps explicitly: (1) current column gains 10, (2) donor column loses 1."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 27: ones 12−5=7; tens (6−1)−3=2 → 27 | Return to TA-A02 CORRECT branch |
| INCORRECT | Answer 37: tens 6−3=3 (forgot to reduce) | Write out: "Tens column started with 6. You borrowed 1. Tens now = 5. Then 5−3=2." |

---

## Component 6 — P89 Spaced Repetition

**P89 — SPACED REPETITION SCHEDULE**

| Interval | Probe Type | Content |
|---|---|---|
| Day 1 (consolidation) | Computation | 3-digit subtraction with borrowing: 723 − 456; verify using addition |
| Day 3 | Property recall | Is 300−150 = 150−300? Why? Compute both if possible |
| Day 7 | Multi-step | 4-digit subtraction with double borrow: 4,003 − 1,267 |
| Day 30 | Transfer check | Difference interpretation: how far apart are 1,001 and 998? Express as subtraction and add back to verify |

---

## Component 7 — Cross-Blueprint Dependencies

**GR-8 ✓:** All cross_links documented.

| Dependency | Direction | Relationship |
|---|---|---|
| `math.arith.addition` | REQUIRES | Subtraction defined as inverse of addition; verification by adding back |
| `math.arith.negative-numbers` | UNLOCKS | Subtraction extended to b > a via additive inverses |
| `math.arith.multiplication` | UNLOCKS | Multiplication uses subtraction in long-division (inverse of multiplication) |
| (no cross_links) | CROSS-LINK | — |

---

## Component 8 — Teaching Notes

- **CPA enforcement:** Start with physical taking-away (C stage) before column notation. The borrowing mechanism is easiest to understand physically: exchange 1 ten-block for 10 unit-cubes.
- **Verification habit:** Establish early that every subtraction can be verified by adding back: c + b = a. This transforms subtraction from a one-way procedure into a reversible operation and previews the concept of inverse operations throughout algebra.
- **MAMR enforcement:** If both MC-1 (SMALLER-FROM-LARGER) and MC-3 (BORROW-NOT-REDUCED) appear simultaneously, address MC-1 first — it is FOUNDATIONAL. Correct borrowing direction must be established before the two-step loan/repayment nuance of MC-3.
- **Non-commutativity framing:** Subtraction's non-commutativity (MC-2) is best contrasted against addition at the concrete level. Ask: "Did we establish that addition of objects doesn't depend on order? Does removing objects work the same way?" The physical intuition is immediate — you cannot remove 8 apples if you only have 3.
- **Transition to negative numbers:** The P76 transfer probe introduces the "distance" interpretation of subtraction intentionally — this intuition is the bridge to negative numbers (1,001 − 999 = 2, so 999 − 1,001 = −2, representing movement in the opposite direction).

---

## Component 10 — Validation Checklist

### V-1 through V-20

| Code | Check | Status |
|---|---|---|
| V-1 | All 10 components present (0–8, 10) | PASS |
| V-2 | Component 0 metadata complete and accurate | PASS |
| V-3 | CPA_ENTRY_STAGE = C (foundational difficulty) | PASS |
| V-4 | GR-1: every non-repair TA opens with B-category primitive | PASS (A01:P03, A02:P07, A03:P06, A04:P04, A05:P91) |
| V-5 | GR-2: every non-gate TA contains P49 | PASS (A01–A04 each have P49; A05 is gate) |
| V-6 | GR-3: mastery gate TA (A05) is terminal | PASS |
| V-7 | GR-4: repair TAs contain P41/P64 | PASS (B01:P27+P41+P64; B02:P27+P64; B03:P27+P41+P64) |
| V-8 | GR-6: P91 terminal in TA-A05 | PASS (ends with P78) |
| V-9 | GR-7: P76 present in mastery gate | PASS (TA-A05) |
| V-10 | GR-8: all cross_links documented in Component 7 | PASS (cross_links = none) |
| V-11 | GR-9: P76 mode — cross_links = [] → INDEPENDENCE PROBE | PASS |
| V-12 | GR-10: MAMR stated and enforced | PASS (MC-1 FOUNDATIONAL first; B01 before B02/B03) |
| V-13 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-14 | pass_criterion: ⌈0.95 × 5⌉ = 5/5 | PASS |
| V-15 | bloom=apply → P07 (WORKED EXAMPLE PAIR) present | PASS (TA-A02) |
| V-16 | P49 in every non-gate TA has all 4 branches | PASS |
| V-17 | Session TA cap (h=10 ≥ 1h → max 7): happy path ≤ 5 TAs; repair TAs conditionally activated | PASS |
| V-18 | P89 spaced repetition schedule present (≥ 4 intervals) | PASS |
| V-19 | Component 7 documents all requires/unlocks/cross_links | PASS |
| V-20 | Misconception registry: ≥ 3 MCs, one FOUNDATIONAL | PASS |

### AIR

| Dimension | Check | Status |
|---|---|---|
| Accuracy | 53−28=25 ✓ (13−8=5 ones; 4−2=2 tens); 401−167=234 ✓; 82−47=35 ✓; 73−48=25 ✓; 503−278=225 ✓; 824−367=457 ✓; 1001−999=2 ✓; 2+999=1001 ✓ | PASS |
| Integrity | No component contradicts another; MAMR chain consistent | PASS |
| Relevance | Every TA addresses subtraction; P76 legitimately previews difference interpretation and negative-number intuition | PASS |

**PACKAGE_READY: YES**
