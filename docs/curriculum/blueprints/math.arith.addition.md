# Teaching Blueprint: Addition
**ID:** `math.arith.addition`
**Version:** 1.0
**Status:** PACKAGE_READY
**Spec:** Teaching Blueprint Specification v1.0

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.addition` |
| concept_name | Addition |
| domain | arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.95 |
| estimated_hours | 12 |
| requires | `math.arith.counting`, `math.arith.place-value` |
| unlocks | `math.arith.subtraction`, `math.arith.multiplication` |
| cross_links | `math.linalg.vector-addition` (Tier 1), `math.abst.group-operation` (not Tier 1) |
| blueprint_version | 1.0 |
| authored_date | 2026-07-12 |
| CPA_ENTRY_STAGE | C |

---

## Component 1 — Cognitive Map

### 1.1 Core Insight
Addition is the binary operation that computes the total cardinality of two disjoint sets: given A and B with |A| = a, |B| = b, A ∩ B = ∅, then a + b = |A ∪ B|. Positional notation makes addition computable column-by-column with carrying.

### 1.2 Knowledge Prerequisites (Activated)
- **math.arith.counting:** Bijection to {1,…,n}; cardinality is well-defined and set-size is independent of labelling order.
- **math.arith.place-value:** Each digit's value = digit × 10^position; columns hold exactly one digit (0–9).

### 1.3 Conceptual Sequence
1. Addition as combining two disjoint collections → total count.
2. Commutativity: a + b = b + a (same combined collection, two measuring orders).
3. Zero identity: a + 0 = 0 + a = a (combining with empty collection leaves total unchanged).
4. Column addition with carrying: column sum ≥ 10 → 1 ten moves left; remainder stays.
5. Multi-digit addition: right-to-left column processing, each carry propagating leftward.

### 1.4 Transfer Target
Column addition of multi-digit natural numbers with carrying; recognition that addition is the same binary operation that generalises to vectors and abstract groups.

---

## Component 2 — Misconception Registry

| ID | Name | Surface Pattern | Root Cause | Priority |
|---|---|---|---|---|
| MC-1 | CARRYING-BREAKDOWN | Writes full column sum without carrying: 47+35→712 | Treats each column independently; doesn't understand "10 ones = 1 ten" forces a carry | FOUNDATIONAL |
| MC-2 | COMMUTATIVITY-UNKNOWN | Claims 5+3 ≠ 3+5 because "starting number determines result" | Models addition as sequential counting-on where starting point matters | SECONDARY |
| MC-3 | ZERO-ANNIHILATES | Computes a+0 = 0 instead of a+0 = a | Overgeneralises multiplication rule a×0=0 to addition | SECONDARY |

**MAMR:** MC-1 FOUNDATIONAL cleared first. MC-2 and MC-3 addressed FIFO thereafter.

---

## Component 3 — Scaffolding Protocol

| Stage | Condition | Entry Action |
|---|---|---|
| C (Concrete) | foundational difficulty → always | Begin TA-A01 with physical grouping analogy |
| P (Pictorial) | After C: student groups correctly → introduce column notation | TA-A02 P07 worked examples with column grid |
| A (Abstract) | After P: student performs column addition → introduce algebraic properties | TA-A03 (commutativity), TA-A04 (zero identity) |

---

## Component 4 — Protocol A (Main Teaching Protocol)

### TA-A01 — Concrete Opening: Combining Groups
**Primitives:** P03 (ANALOGY BRIDGE), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (opens with B-category P03); GR-2 ✓ (P49 present)

**P03 — ANALOGY BRIDGE**
> "You have 47 red counters in one pile and 35 blue counters in another. You push both piles together into one big pile. How many counters are in the combined pile?
>
> Counting all of them one-by-one works — but takes forever for large numbers. **Addition** is the shortcut: combine the two groups and use place-value to compute the total efficiently.
>
> Key idea: addition combines two *disjoint* collections into one. The total size doesn't depend on which pile you start counting — only on how many are in each pile."

**P49 — ADAPTIVE CHECKPOINT**
> "I have 6 apples in one basket and 4 apples in another. I combine them. How many apples total? Now switch: 4 in one basket and 6 in the other — combined, how many?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | Both answers 10; recognises same total both orders | TA-A02 |
| PARTIAL | Gets one order correct; hesitates on the other | TA-A02 (flag MC-2 risk; monitor in TA-A03) |
| INCORRECT | Different totals for the two orders OR wrong total | TA-B02 (MC-2 repair) → TA-A02 |
| NO_RESPONSE | No answer after prompt | Restate with 2+3 apples; if still no response → TA-B02 |

---

### TA-A02 — Worked Example Pair: Column Addition with Carrying
**Primitives:** P07 (WORKED EXAMPLE PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P07 is B-category); GR-2 ✓; bloom=apply → P07 required ✓

**P07 — WORKED EXAMPLE PAIR**

*Example 1 — single carry:*
> Compute 47 + 35.
>
> **Ones column:** 7 + 5 = 12. Write **2** in ones; carry **1** to tens.
> **Tens column:** 4 + 3 = 7, plus carried 1 = **8**. Write 8 in tens.
>
> **Answer: 82.**
>
> *Why carry?* 12 ones = 1 ten + 2 ones. Place-value says a column holds one digit; the ten must move left.

*Example 2 — double carry:*
> Compute 376 + 457.
>
> **Ones:** 6 + 7 = 13 → write **3**, carry 1.
> **Tens:** 7 + 5 = 12 + 1 (carry) = 13 → write **3**, carry 1.
> **Hundreds:** 3 + 4 = 7 + 1 (carry) = **8**.
>
> **Answer: 833.**

**P49 — ADAPTIVE CHECKPOINT**
> "Now you try: compute 58 + 74."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 132 with carrying shown | TA-A03 |
| PARTIAL | Correct ones digit (2) but tens-column error (carry dropped) | TA-B01 (MC-1 repair) → TA-A03 |
| INCORRECT | Answer 1212 or other concatenation/column error | TA-B01 (MC-1 repair) → TA-A03 |
| NO_RESPONSE | No attempt | Re-model ones column only; ask "8+4=?"; if stuck → TA-B01 |

---

### TA-A03 — Commutativity by Pattern Induction
**Primitives:** P04 (PATTERN INDUCTION), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P04 is B-category); GR-2 ✓

**P04 — PATTERN INDUCTION**
> Observe these pairs:
>
> | a + b | b + a |
> |---|---|
> | 3 + 5 = 8 | 5 + 3 = 8 |
> | 12 + 7 = 19 | 7 + 12 = 19 |
> | 47 + 35 = 82 | 35 + 47 = 82 |
>
> **Pattern:** a + b = b + a for every pair of natural numbers. This is the **commutative law** of addition.
>
> *Why?* We are measuring the size of the same combined collection — the total doesn't depend on which pile we count first.

**P49 — ADAPTIVE CHECKPOINT**
> "True or false: 299 + 501 = 501 + 299. Explain without computing."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | Invokes commutative law or combined-collection argument | TA-A04 |
| PARTIAL | Says "true" but computes both sides to verify | TA-A04 (algorithmic; acceptable at foundational level) |
| INCORRECT | Claims different values | TA-B02 (MC-2 repair) → TA-A04 |
| NO_RESPONSE | No answer | Prompt: "Does the size of a combined pile depend on which pile I pour first?" If stuck → TA-B02 |

---

### TA-A04 — Zero Identity: Contrast Pair
**Primitives:** P06 (CONTRAST PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P06 is B-category); GR-2 ✓

**P06 — CONTRAST PAIR**
> | Expression | Result | Interpretation |
> |---|---|---|
> | 5 + 3 | 8 | two non-empty piles combine |
> | **5 + 0** | **5** | adding empty pile — total unchanged |
> | **0 + 7** | **7** | zero is the additive identity: a + 0 = a |
> | 5 × 0 | 0 | multiplication by zero annihilates — *different operation* |
>
> **Critical contrast:** 5 × 0 = 0 (multiplication — zero copies), but 5 **+** 0 = 5 (addition — no extra objects added). Zero annihilates in multiplication; it is the *identity element* in addition.

**P49 — ADAPTIVE CHECKPOINT**
> "Compute: (a) 836 + 0   (b) 0 + 4,729   (c) 0 + 0"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) 836, (b) 4,729, (c) 0 | TA-A05 |
| PARTIAL | (a) and (b) correct; minor confusion on (c) | TA-A05 (0+0=0 is correct; verify student's reasoning) |
| INCORRECT | Any answer of 0 for (a) or (b) | TA-B03 (MC-3 repair) → TA-A05 |
| NO_RESPONSE | No answer | Prompt: "If you have 836 apples and I give you zero more, how many do you have?" If stuck → TA-B03 |

---

### TA-A05 — Mastery Gate
**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Grammar:** GR-3 ✓ (terminal); GR-6 ✓ (P91 terminal in TA); GR-7 ✓ (P76 in gate); GR-9: `math.linalg.vector-addition` is Tier 1 → P76 CROSS-LINK PROBE

**pass_criterion:** ⌈0.95 × 5⌉ = **5 / 5** (4 P77 items + 1 P76 item)

**P77 — MULTI-PROBLEM SET (4 items)**
1. Compute 385 + 247.
2. Compute 1,594 + 2,786.
3. A shop has 439 red pens and 361 blue pens. How many pens in total?
4. True or false: 999,999 + 0 = 0 + 999,999 = 999,999. Name both laws illustrated.

**P55 — SCORE** (tally P77 results)

**P76 — TRANSFER PROBE (CROSS-LINK: `math.linalg.vector-addition`)**
> In linear algebra, **vector addition** adds corresponding components: if **u** = (12, 47) and **v** = (8, 53), then **u** + **v** = (12 + 8, 47 + 53). Each component uses exactly the binary addition operation you have just mastered.
>
> Compute **u** + **v**. Then compute **v** + **u**. Are the results equal? Which law does this illustrate?

*(Expected: (20, 100) in both orders; commutative law.)*

**P55 — SCORE** (add P76 result)

**P75 — MASTERY ASSESSMENT**
- pass: 5 / 5 → MASTERY ACHIEVED
- fail: ≤ 4 / 5 → MASTERY NOT ACHIEVED

**P55 — SCORE** (record mastery outcome)

**P74 — ROUTING DECISION**
- MASTERY ACHIEVED → P78
- MASTERY NOT ACHIEVED → identify weakest item: P77 items 1–2 failed → TA-B01; P77 item 4 or P76 failed → TA-B02; re-enter TA-A02

**P55 — SCORE** (record routing)

**P78 — COMPLETION**
> "You can now compute column addition of multi-digit numbers with carrying, and you understand commutativity (a + b = b + a) and the additive identity (a + 0 = a). These properties hold for natural numbers, integers, rationals, reals, and — as the transfer probe showed — for vectors. You are ready for subtraction and multiplication."

---

## Component 5 — Protocol B (Repair Protocol)

### TA-B01 — Repair: CARRYING-BREAKDOWN (MC-1 FOUNDATIONAL)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-4 ✓ (P41 and P64 gate repair chain)

**P27 — MISCONCEPTION NAMING**
> "A very common error is **CARRYING-BREAKDOWN**: when a column sum reaches 10 or more, writing the whole sum in that column instead of carrying. For example: 47 + 35, ones column 7 + 5 = 12 → writes '12' → gets 712. Let's understand why this violates place-value."

**P41 — MISCONCEPTION DETECTOR**
> "In the answer 712: the digit 7 is in the tens column. What value does it represent? Does '12 ones' fit in a single column that holds only one digit?"

**P64 — CONCEPTUAL SHIFT**
> "Each column holds exactly one digit (0–9). When ones sum to 12, we have **1 ten** plus **2 ones**. The 2 ones stay in the ones column; the 1 ten *carries* (moves) to the tens column — this is not a rule, it is place-value being enforced. Writing '12' in one column would mean that column represents both 10 and 2 simultaneously, which breaks the positional system."

**P49 — ADAPTIVE CHECKPOINT**
> "Redo 47 + 35 column by column with explicit carrying."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 82 with carry shown | Return to TA-A02 CORRECT branch |
| INCORRECT | Still writes 712 | Repeat P64 with physical grouping: 12 counters → bundle 10 into one group, 2 remaining |

---

### TA-B02 — Repair: COMMUTATIVITY-UNKNOWN (MC-2)
**Primitives:** P27 (MISCONCEPTION NAMING), P11 (REPRESENTATION SHIFT), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **COMMUTATIVITY-UNKNOWN** says 'order matters in addition; 5 + 3 might differ from 3 + 5.' Let's show why the combined total is independent of counting order."

**P11 — REPRESENTATION SHIFT**
> Represent 5 + 3 as five red squares then three blue squares: [■■■■■][■■■].
> Represent 3 + 5 as three blue squares then five red squares: [■■■][■■■■■].
> Both arrangements contain the same 8 squares — the collection is identical regardless of which group we list first.

**P64 — CONCEPTUAL SHIFT**
> "Addition measures the *size* of the combined collection. The collection is the same object; we are not doing anything sequentially in time. Choosing which pile to 'start with' when counting is a measurement convenience, not part of the operation."

**P49 — ADAPTIVE CHECKPOINT**
> "Without computing: does 1,000,001 + 999,999 equal 999,999 + 1,000,001? Why?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | Yes; invokes commutative law or combined-size argument | Return to TA-A03 CORRECT branch |
| INCORRECT | Claims different values | Repeat P11 with concrete counters, student arranges them |

---

### TA-B03 — Repair: ZERO-ANNIHILATES (MC-3)
**Primitives:** P27 (MISCONCEPTION NAMING), P06 (CONTRAST PAIR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **ZERO-ANNIHILATES** says 'a + 0 = 0 because zero makes everything disappear.' This confuses addition with multiplication: a × 0 = 0 is correct, but a **+** 0 = a. Zero is the *additive identity*, not an annihilator."

**P06 — CONTRAST PAIR**
> | Operation | Result | Reason |
> |---|---|---|
> | 5 + 0 | **5** | adding empty pile — nothing changes |
> | 0 + 7 | **7** | starting from zero, receiving 7 — total is 7 |
> | 5 × 0 | **0** | zero *copies* of 5 — annihilates |
> | 0 × 7 | **0** | zero copies of 7 — annihilates |

**P64 — CONCEPTUAL SHIFT**
> "Adding zero = combining your pile with an *empty* pile. The empty pile contributes nothing. Your pile is unchanged. Zero is the additive identity: a + 0 = a."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 4,512 + 0 and 0 + 0."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 4,512 and 0 | Return to TA-A04 CORRECT branch |
| INCORRECT | 0 for either | "If I give you zero apples, do you have more or fewer apples than before?" |

---

## Component 6 — P89 Spaced Repetition

**P89 — SPACED REPETITION SCHEDULE**

| Interval | Probe Type | Content |
|---|---|---|
| Day 1 (consolidation) | Computation | 3-digit column addition with double carry: 487 + 356 |
| Day 3 | Property recall | State commutativity and zero-identity; compute 0 + 5,280 and 5,280 + 0 |
| Day 7 | Multi-step | 4-digit addition: 3,847 + 2,953; word problem with two groups combining |
| Day 30 | Transfer check | Vector addition: (23, 47) + (17, 53); connect to today's addition operation |

---

## Component 7 — Cross-Blueprint Dependencies

**GR-8 ✓:** All cross_links documented.

| Dependency | Direction | Relationship |
|---|---|---|
| `math.arith.counting` | REQUIRES | Cardinality definition; addition = |A ∪ B| |
| `math.arith.place-value` | REQUIRES | Column arithmetic; carrying mechanism |
| `math.arith.subtraction` | UNLOCKS | Inverse: a − b = c iff c + b = a |
| `math.arith.multiplication` | UNLOCKS | Repeated addition: a × b = a + a + … (b times) |
| `math.linalg.vector-addition` | CROSS-LINK (Tier 1) | Component-wise addition; same binary operation in ℝⁿ |
| `math.abst.group-operation` | CROSS-LINK (not Tier 1) | Addition as the canonical abelian group operation on ℤ |

---

## Component 8 — Teaching Notes

- **CPA enforcement:** Begin with physical counter/pile representation (C stage) before introducing column notation (P). Do not skip the C stage even for students who appear to already know addition — CARRYING-BREAKDOWN is invisible until multi-digit problems appear.
- **Carrying language:** "Regroup" and "carry" name the same mechanism. Use whichever matches the student's curriculum context; clarify they are synonyms.
- **MAMR enforcement:** If both MC-1 and MC-2 trigger simultaneously (wrong carrying AND claims order matters), address MC-1 first — it is FOUNDATIONAL. Carrying must be correct before commutativity is explored.
- **Zero identity context:** MC-3 (ZERO-ANNIHILATES) almost always appears in students who have already seen multiplication. If the student is truly at the foundational stage with no prior multiplication exposure, MC-3 risk is low — spend less time on TA-A04.
- **P76 cross-link note:** The vector-addition transfer probe does NOT require prior knowledge of vectors. It gives the rule inline. Credit P76 correct if both components are computed correctly and commutativity is confirmed (by computation or by law citation).
- **Associativity:** (a+b)+c = a+(b+c) is a true property of addition but is NOT the focus of this blueprint. P77 item 4 targets commutativity and zero-identity only. Associativity is addressed naturally in multi-digit word problems; do not over-introduce it here.

---

## Component 10 — Validation Checklist

### V-1 through V-20

| Code | Check | Status |
|---|---|---|
| V-1 | All 10 components present (0–8, 10) | PASS |
| V-2 | Component 0 metadata complete and accurate | PASS |
| V-3 | CPA_ENTRY_STAGE = C (foundational difficulty) | PASS |
| V-4 | GR-1: every non-repair TA opens with B-category primitive | PASS (A01:P03, A02:P07, A03:P04, A04:P06, A05:P91) |
| V-5 | GR-2: every non-gate TA contains P49 | PASS (A01–A04 each have P49; A05 is gate) |
| V-6 | GR-3: mastery gate TA (A05) is terminal | PASS |
| V-7 | GR-4: repair TAs contain P41/P64 | PASS (B01:P27+P41+P64; B02:P27+P11+P64; B03:P27+P06+P64) |
| V-8 | GR-6: P91 terminal in TA-A05 | PASS (ends with P78) |
| V-9 | GR-7: P76 present in mastery gate | PASS (TA-A05) |
| V-10 | GR-8: all cross_links documented in Component 7 | PASS |
| V-11 | GR-9: P76 mode correct — cross_link to Tier 1 → CROSS-LINK PROBE | PASS (`math.linalg.vector-addition` is Tier 1) |
| V-12 | GR-10: MAMR stated and enforced | PASS (MC-1 FOUNDATIONAL first; B01 before B02/B03) |
| V-13 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-14 | pass_criterion: ⌈0.95 × 5⌉ = 5/5 | PASS |
| V-15 | bloom=apply → P07 (WORKED EXAMPLE PAIR) present | PASS (TA-A02) |
| V-16 | P49 in every non-gate TA has all 4 branches | PASS |
| V-17 | Session TA cap (h=12 ≥ 1h → max 7): happy path ≤ 5 TAs; repair TAs conditionally activated | PASS |
| V-18 | P89 spaced repetition schedule present (≥ 4 intervals) | PASS |
| V-19 | Component 7 documents all requires/unlocks/cross_links | PASS |
| V-20 | Misconception registry: ≥ 3 MCs, one FOUNDATIONAL | PASS |

### AIR

| Dimension | Check | Status |
|---|---|---|
| Accuracy | 47+35=82 ✓; 376+457=833 ✓; 58+74=132 ✓; 385+247=632 ✓; 1,594+2,786=4,380 ✓; (12,47)+(8,53)=(20,100) ✓ | PASS |
| Integrity | No component contradicts another; MAMR chain consistent throughout | PASS |
| Relevance | Every TA addresses addition directly; P76 legitimately previews vector-addition with same binary operation | PASS |

**PACKAGE_READY: YES**
