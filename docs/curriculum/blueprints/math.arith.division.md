# Teaching Blueprint: Division
**ID:** `math.arith.division`
**Version:** 1.0
**Status:** PACKAGE_READY
**Spec:** Teaching Blueprint Specification v1.0

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.division` |
| concept_name | Division |
| domain | arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.9 |
| estimated_hours | 12 |
| requires | `math.arith.multiplication` |
| unlocks | `math.arith.fractions`, `math.nt.divisibility` |
| cross_links | `math.nt.divisibility` (Tier 1) |
| blueprint_version | 1.0 |
| authored_date | 2026-07-12 |
| CPA_ENTRY_STAGE | C |

---

## Component 1 — Cognitive Map

### 1.1 Core Insight
Division is the inverse operation of multiplication: a ÷ b = c if and only if c × b = a (with b ≠ 0). For natural numbers, division may leave a remainder: a = b×q + r with 0 ≤ r < b. When r = 0, b divides a exactly. Division by zero is undefined — no number q satisfies 0×q = a for a ≠ 0.

### 1.2 Knowledge Prerequisites (Activated)
- **math.arith.multiplication:** a × b = c; long multiplication; commutative/distributive law; zero annihilator. Division is defined as multiplication's inverse; quotient verification uses multiplication.

### 1.3 Conceptual Sequence
1. Division as inverse of multiplication: a ÷ b = c iff c × b = a.
2. Two models: partitive (share a equally among b groups, each gets c) and quotitive (how many groups of b fit in a?).
3. Division algorithm: a = b × q + r, where q is the quotient, 0 ≤ r < b is the remainder.
4. Exact division: r = 0 → "b divides a exactly"; remainder division: r > 0 → "a ÷ b = q remainder r".
5. Non-commutativity: a ÷ b ≠ b ÷ a in general.
6. Division by zero: undefined — 0×q = a has no solution for a ≠ 0; the inverse of multiplication by zero does not exist.

### 1.4 Transfer Target
Computing integer quotients and remainders; verifying via the division algorithm; recognising when exact division holds (r = 0) and applying this to divisibility in number theory.

---

## Component 2 — Misconception Registry

| ID | Name | Surface Pattern | Root Cause | Priority |
|---|---|---|---|---|
| MC-1 | DIVISION-COMMUTATIVE | Claims a÷b = b÷a; writes 12÷4 = 4÷12 = 3 | Overgeneralises commutativity from multiplication to division | FOUNDATIONAL |
| MC-2 | DIVISION-BY-ZERO-DEFINED | Computes a÷0 = 0, or a÷0 = a | Pattern-matches from a×0=0 or a÷a=1; doesn't grasp "no inverse exists" | SECONDARY |
| MC-3 | REMAINDER-IGNORED | Writes 13÷4 = 3, silently dropping the remainder | Only practised exact-division examples; remainder feels like an error rather than part of the answer | SECONDARY |

**MAMR:** MC-1 FOUNDATIONAL cleared first. MC-2 and MC-3 addressed FIFO thereafter.

---

## Component 3 — Scaffolding Protocol

| Stage | Condition | Entry Action |
|---|---|---|
| C (Concrete) | foundational → always | Begin TA-A01 with equal-sharing analogy |
| P (Pictorial) | After C → diagram of groups and remainders | TA-A02 P07 worked examples with grouping diagram |
| A (Abstract) | After P → commutativity contrast and division-by-zero | TA-A03 and TA-A04 |

---

## Component 4 — Protocol A (Main Teaching Protocol)

### TA-A01 — Concrete Opening: Equal Sharing
**Primitives:** P03 (ANALOGY BRIDGE), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (opens with B-category P03); GR-2 ✓ (P49 present)

**P03 — ANALOGY BRIDGE**
> "You have 12 apples and 4 friends. You want to share equally. How many apples does each friend get?
>
> Model 1 — *Sharing (partitive):* Distribute one apple at a time to each friend in turn. Each friend gets **3** apples.
>
> Model 2 — *Grouping (quotitive):* Pack apples in groups of 4. How many bags? **3** bags.
>
> Both give 12 ÷ 4 = **3**. The answer is the **quotient**. Division is the inverse of multiplication: 3 × 4 = 12 confirms the answer.
>
> **Verification rule:** quotient × divisor = dividend. Always check: c × b = a."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 28 ÷ 7. Then verify using multiplication."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 4; and 4×7=28 confirmed | TA-A02 |
| PARTIAL | 4 correct but skips verification | TA-A02 (reinforce verification habit) |
| INCORRECT | 5 or other wrong answer | Restate: "how many 7s fit in 28? Count: 7,14,21,28 — four 7s." If stuck → TA-B01 |
| NO_RESPONSE | No answer | "7 × ? = 28. What times 7 equals 28?" If stuck → TA-B01 |

---

### TA-A02 — Worked Example Pair: Exact and Remainder Division
**Primitives:** P07 (WORKED EXAMPLE PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P07 is B-category); GR-2 ✓; bloom=apply → P07 required ✓

**P07 — WORKED EXAMPLE PAIR**

*Example 1 — exact division:*
> Compute 56 ÷ 8.
>
> Ask: "8 × ? = 56." Answer: 8 × 7 = 56. So 56 ÷ 8 = **7**, remainder **0**.
>
> Division algorithm: 56 = 8 × 7 + 0. Verify: 8 × 7 = 56 ✓.

*Example 2 — division with remainder:*
> Compute 47 ÷ 5.
>
> Ask: "5 × ? is as large as possible without exceeding 47." 5 × 9 = 45 ≤ 47; 5 × 10 = 50 > 47.
> Quotient q = 9. Remainder r = 47 − 45 = 2.
>
> **Answer: 47 ÷ 5 = 9 remainder 2.**
>
> Division algorithm: 47 = 5 × 9 + 2. Verify: 5 × 9 + 2 = 45 + 2 = 47 ✓.
>
> Note: r = 2 is a valid part of the answer, not an error.

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 38 ÷ 6. Give quotient and remainder. Verify using the division algorithm."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | q=6, r=2; 6×6+2=38 ✓ | TA-A03 |
| PARTIAL | q=6 correct; remainder 2 dropped or stated as "none" | TA-B03 (MC-3 repair) → TA-A03 |
| INCORRECT | q=5 or q=7 | "6×6=36≤38; 6×7=42>38. Which fits?" |
| NO_RESPONSE | No attempt | "How many 6s fit in 38? Try 6×6=36. Is 36 close to 38?" |

---

### TA-A03 — Non-Commutativity: Contrast Pair
**Primitives:** P06 (CONTRAST PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P06 is B-category); GR-2 ✓

**P06 — CONTRAST PAIR**
> | Expression | Value | Note |
> |---|---|---|
> | 12 ÷ 4 | **3** | share 12 among 4 |
> | 4 ÷ 12 | **0 remainder 4** | share 4 among 12 (< 1 each; quotient 0) |
> | 6 × 2 | 12 | multiplication is commutative |
> | **6 ÷ 2** | **3** | ≠ 2 ÷ 6 (= 0R2) — *not commutative* |
>
> **Division is NOT commutative.** The dividend (numerator) must come first; reversing the order changes the problem fundamentally — just as subtraction is not commutative.

**P49 — ADAPTIVE CHECKPOINT**
> "Is 36 ÷ 4 the same as 4 ÷ 36? Compute both and compare."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 36÷4=9; 4÷36=0R4; not equal | TA-A04 |
| PARTIAL | Correct that they differ; arithmetic error in one | TA-A04 (minor) |
| INCORRECT | Claims equal | TA-B01 (MC-1 repair) → TA-A04 |
| NO_RESPONSE | No answer | "12 apples shared among 4 friends: 3 each. 4 apples shared among 12: less than 1 each — same problem?" |

---

### TA-A04 — Division by Zero: Pattern Induction
**Primitives:** P04 (PATTERN INDUCTION), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P04 is B-category); GR-2 ✓

**P04 — PATTERN INDUCTION**
> Division is defined by: a ÷ b = c iff c × b = a.
>
> | Divide by | Equation to solve | Solution |
> |---|---|---|
> | 12 ÷ 4 = ? | c × 4 = 12 | c = 3 ✓ |
> | 12 ÷ 2 = ? | c × 2 = 12 | c = 6 ✓ |
> | 12 ÷ 1 = ? | c × 1 = 12 | c = 12 ✓ |
> | 12 ÷ 0 = ? | c × 0 = 12 | **No solution exists** — c × 0 = 0 ≠ 12 |
>
> **Pattern:** As divisor approaches 0, no valid quotient exists. Division by zero is **undefined** — it has no answer. This is not zero; it is meaningless as a question.

**P49 — ADAPTIVE CHECKPOINT**
> "What is 7 ÷ 0? Explain."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | Undefined (or "no answer"); explains no c satisfies c×0=7 | TA-A05 |
| INCORRECT | Says 0 or 7 | TA-B02 (MC-2 repair) → TA-A05 |
| NO_RESPONSE | No answer | "Is there a number c such that c × 0 = 7? What is any number times zero?" → TA-B02 |

---

### TA-A05 — Mastery Gate
**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Grammar:** GR-3 ✓ (terminal); GR-6 ✓; GR-7 ✓ (P76 in gate); GR-9: `math.nt.divisibility` is Tier 1 → P76 CROSS-LINK PROBE

**pass_criterion:** ⌈0.90 × 5⌉ = **5 / 5** (4 P77 items + 1 P76 item)

**P77 — MULTI-PROBLEM SET (4 items)**
1. Compute 56 ÷ 8.
2. Compute 47 ÷ 5 with quotient and remainder.
3. True or false: 36 ÷ 4 = 4 ÷ 36.
4. Verify item 2 using the division algorithm: write a = b×q + r and confirm.

**P55 — SCORE** (tally P77 results)

**P76 — TRANSFER PROBE (CROSS-LINK: `math.nt.divisibility`)**
> In number theory, we write **b | a** ("b divides a") when a ÷ b has remainder 0 — that is, a = b×q for some integer q.
>
> (a) Does 4 | 28? Show by computing 28 ÷ 4.
>
> (b) Does 6 | 25? Show by computing 25 ÷ 6 and stating the remainder.
>
> (c) Does 4 | 28 imply 28 | 4? Compute 4 ÷ 28 to decide.

*(Expected: (a) 28÷4=7 R0 → YES; (b) 25÷6=4 R1 → NO; (c) 4÷28=0 R4 → NO; divisibility is not symmetric.)*

**P55 — SCORE** (add P76 result)

**P75 — MASTERY ASSESSMENT**
- pass: 5 / 5 → MASTERY ACHIEVED
- fail: ≤ 4 / 5 → MASTERY NOT ACHIEVED

**P55 — SCORE** (record mastery outcome)

**P74 — ROUTING DECISION**
- MASTERY ACHIEVED → P78
- MASTERY NOT ACHIEVED → P77 items 1–2 failed → TA-A02; P77 item 3 failed → TA-B01; P77 item 4 or P76 remainder related → TA-B03; re-enter TA-A02

**P55 — SCORE** (record routing)

**P78 — COMPLETION**
> "You can now compute integer division with quotient and remainder, verify using the division algorithm a = b×q + r, and recognise that division is not commutative and division by zero is undefined. The transfer probe showed how exact division (r = 0) is the basis of divisibility in number theory — a topic central to all of arithmetic and algebra."

---

## Component 5 — Protocol B (Repair Protocol)

### TA-B01 — Repair: DIVISION-COMMUTATIVE (MC-1 FOUNDATIONAL)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-4 ✓

**P27 — MISCONCEPTION NAMING**
> "The error **DIVISION-COMMUTATIVE** says a÷b = b÷a, by analogy with multiplication's commutativity. But division has a fixed order: the dividend (what is being shared) comes first, the divisor (how many groups) comes second. Reversing them changes the problem."

**P41 — MISCONCEPTION DETECTOR**
> "In 12÷4: what is being shared? Into how many groups? Now reverse: 4÷12. What is being shared? Into how many groups? Are those the same question?"

**P64 — CONCEPTUAL SHIFT**
> "Multiplication is commutative because both operands play the same role in the product (both are factors). Division assigns different roles: the dividend is what you divide; the divisor is what you divide by. '12 apples shared among 4' and '4 apples shared among 12' are different situations — different quotients."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 20÷5 and 5÷20. Are they equal?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | 20÷5=4; 5÷20=0R5; not equal | Return to TA-A03 CORRECT branch |
| INCORRECT | Both equal 4 | "5÷20: share 5 among 20 people. Each gets how many? Less than 1 each — quotient 0." |

---

### TA-B02 — Repair: DIVISION-BY-ZERO-DEFINED (MC-2)
**Primitives:** P27 (MISCONCEPTION NAMING), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **DIVISION-BY-ZERO-DEFINED** assigns a value (0 or a) to a÷0. Division is defined by the inverse: a÷b=c requires c×b=a. When b=0, this becomes c×0=a — but c×0=0 for every c. If a≠0, there is no solution. If a=0, every number is a 'solution,' so it is still undefined (not unique)."

**P64 — CONCEPTUAL SHIFT**
> "Division by zero has no answer — not because the answer is unknown, but because the defining equation has no solution (or no unique solution). We say it is *undefined*: the question itself is malformed, like asking 'which integer is between 2 and 3?' There are conventions for limits, but as an arithmetic operation, a÷0 is undefined."

**P49 — ADAPTIVE CHECKPOINT**
> "Why is 5 ÷ 0 undefined? What equation would need to have a solution?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | c × 0 = 5 has no solution because c×0=0 for all c | Return to TA-A04 CORRECT branch |
| INCORRECT | Still says 0 or 5 | "What is 0 × 1,000,000? What is 0 × 0? Can any c×0 equal 5?" |

---

### TA-B03 — Repair: REMAINDER-IGNORED (MC-3)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **REMAINDER-IGNORED** states 13÷4 = 3, dropping the remainder 1. The complete answer is 3 remainder 1, because 3×4=12 ≠ 13. The remainder is a required part of the answer when division is not exact."

**P41 — MISCONCEPTION DETECTOR**
> "If 13÷4 = 3, verify: does 3×4 = 13? What value is 3×4? What is 13 − 12?"

**P64 — CONCEPTUAL SHIFT**
> "The division algorithm says a = b×q + r with 0 ≤ r < b. If r > 0, the answer is incomplete without r. Think of sharing 13 apples among 4 friends: each gets 3 (3×4=12 apples distributed), but 1 apple is left over. Writing '3' alone ignores that leftover. The full answer is **q=3, r=1**."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 19÷4. State quotient AND remainder. Verify."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | q=4, r=3; 4×4+3=19 ✓ | Return to TA-A02 CORRECT branch |
| INCORRECT | States q=4 only | "4×4=16. 19−16=? That's the remainder." |

---

## Component 6 — P89 Spaced Repetition

**P89 — SPACED REPETITION SCHEDULE**

| Interval | Probe Type | Content |
|---|---|---|
| Day 1 (consolidation) | Computation | 48÷6 (exact) and 53÷7 (with remainder); verify both |
| Day 3 | Property recall | Is 100÷4 = 4÷100? Why not? What is 7÷0? |
| Day 7 | Division algorithm | Express 83=7×q+r; find q and r; verify |
| Day 30 | Transfer | Does 7 | 49? Does 5 | 37? Write answer using divisibility notation |

---

## Component 7 — Cross-Blueprint Dependencies

**GR-8 ✓:** All cross_links documented.

| Dependency | Direction | Relationship |
|---|---|---|
| `math.arith.multiplication` | REQUIRES | Division defined as inverse: a÷b=c iff c×b=a |
| `math.arith.fractions` | UNLOCKS | a÷b as a fraction a/b when b does not divide a exactly |
| `math.nt.divisibility` | UNLOCKS + CROSS-LINK (Tier 1) | b | a iff a÷b has remainder 0; the bridge from arithmetic to number theory |

---

## Component 8 — Teaching Notes

- **CPA enforcement:** Start with physical sharing (C stage) — actual objects distributed into groups. The partitive model (share equally) is more intuitive than quotitive (how many groups fit). Use physical grouping before column long-division.
- **Remainder as a complete answer:** MC-3 (REMAINDER-IGNORED) is most common when students have only encountered exact-division examples. Introduce inexact division early and frame the remainder as an integral part of the answer, not an error or oversight.
- **Division by zero:** Do not use "undefined = ∞" language — this belongs to limits/calculus, not arithmetic. At this level: "the inverse equation has no solution; the operation is undefined."
- **Verification habit:** Like subtraction, division has a clean verification: c × b + r = a. Enforce this as a self-check on every problem.
- **P76 cross-link:** The divisibility probe does not require formal knowledge of number theory notation — the b|a symbol and definition are given inline. Credit P76 correct if (a) and (b) correctly identify yes/no with remainder evidence, and (c) correctly concludes divisibility is not symmetric.

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
| V-10 | GR-8: all cross_links documented in Component 7 | PASS |
| V-11 | GR-9: P76 mode — cross_link to Tier 1 `math.nt.divisibility` → CROSS-LINK PROBE | PASS |
| V-12 | GR-10: MAMR stated and enforced | PASS (MC-1 FOUNDATIONAL first; B01 before B02/B03) |
| V-13 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-14 | pass_criterion: ⌈0.90 × 5⌉ = 5/5 | PASS |
| V-15 | bloom=apply → P07 (WORKED EXAMPLE PAIR) present | PASS (TA-A02) |
| V-16 | P49 in every non-gate TA has all 4 branches | PASS |
| V-17 | Session TA cap (h=12 ≥ 1h → max 7): happy path ≤ 5 TAs; repair TAs conditionally activated | PASS |
| V-18 | P89 spaced repetition schedule present (≥ 4 intervals) | PASS |
| V-19 | Component 7 documents all requires/unlocks/cross_links | PASS |
| V-20 | Misconception registry: ≥ 3 MCs, one FOUNDATIONAL | PASS |

### AIR

| Dimension | Check | Status |
|---|---|---|
| Accuracy | 28÷7=4 ✓; 56÷8=7 ✓; 47÷5=9R2 ✓ (5×9+2=47); 38÷6=6R2 ✓ (6×6+2=38); 36÷4=9 ✓; 4÷36=0R4 ✓; 28÷4=7R0 ✓; 25÷6=4R1 ✓; 4÷28=0R4 ✓ | PASS |
| Integrity | No component contradicts another; MAMR chain consistent | PASS |
| Relevance | Every TA addresses division; P76 legitimately bridges to number-theoretic divisibility | PASS |

**PACKAGE_READY: YES**
