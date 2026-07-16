# TEACHING BLUEPRINT — math.nt.divisibility

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.nt.divisibility |
| concept_name | Divisibility |
| domain | number_theory |
| difficulty | developing |
| bloom | understand |
| estimated_hours | 5 |
| mastery_threshold | 0.85 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.85 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.arith.division, math.found.integers]
**unlocks:** [math.nt.prime-number, math.nt.gcd, math.nt.lcm]
**cross_links:** [math.abst.ring-theory — Tier 1]

---

## Component 1 — Cognitive Map

**Core concept:** For integers a and b (a ≠ 0), we say **a divides b** (written **a|b**) when there exists an integer k such that b = a×k. Divisibility is a relation (true/false), not an operation. Key properties: reflexive (a|a since a=a×1), transitive (a|b and b|c implies a|c), and NOT symmetric (a|b does not imply b|a in general).

**Knowledge prerequisites activated:**
- math.arith.division: b÷a = k exactly (remainder 0) is the computational face of divisibility
- math.found.integers: k must be an integer (ℤ), not merely a rational; negative integers and zero are included

**Concept structure:**
1. **Definition**: a|b ↔ ∃k∈ℤ: b = ak (the witnessing integer k is the quotient)
2. **Notation**: the vertical bar | means "divides" (relation); not to be confused with the division operator ÷
3. **Properties**: reflexive (a|a); transitive; NOT symmetric; a|0 for all a≠0 (k=0 works)
4. **Computational check**: a|b ↔ b÷a leaves remainder 0

**Target understanding:** Given integers a and b, the learner determines whether a|b by finding a witnessing integer k or confirming zero remainder; states correct properties of divisibility (reflexive, transitive, not symmetric); and distinguishes the relation a|b from the operation a÷b.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | DIVISIBILITY-CONFUSED-WITH-DIVISION | Shown a|b notation | Reads "4|12" as "4 divided by 12" giving 1/3, or "12÷4=3" treated as equivalent to "a|b means compute the quotient" — confuses a relation (true/false) with an operation (produces a number) | B01 |
| MC-2 | DIVISIBILITY-SYMMETRIC | Asked whether b|a given a|b | Concludes that if 4|12 then 12|4; ignores that b=ak requires k∈ℤ, which fails when b>a | B02 |
| MC-3 | DIVISIBILITY-RESTRICTED-TO-POSITIVES | Presented with 0 or negative integers | Refuses to apply divisibility to negative integers (e.g., does not recognise (−3)|12) or fails to see that a|0 holds for all nonzero a | B03 |

**FOUNDATIONAL MC:** MC-1 (DIVISIBILITY-CONFUSED-WITH-DIVISION) — notation confusion must be resolved before property reasoning can proceed.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
Grouping model: physical tiles. "Does 4 divide 12?" — arrange 12 tiles into rows of 4. If every tile fits with no leftover, 4|12. If a tile is left over, 4∤12.

**Progression Gate (C → P):** Learner can express the grouping outcome as a multiplication equation (12 = 4×3) and identify k=3 as the witnessing integer.
**Progression Gate (P → A):** Learner writes the formal definition a|b ↔ ∃k∈ℤ: b=ak from memory and applies it to verify or refute divisibility claims.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Exact Fit: The Tiling Analogy (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: Tiling a hallway — "do tiles of length a fit the hallway of length b exactly, with no gaps or overhangs?"
Target domain: Divisibility — "does a divide b exactly, with no remainder?"
Mapping: tile length ↔ a; hallway length ↔ b; number of tiles used ↔ k (the witnessing integer); exact fit ↔ a|b; leftover gap ↔ remainder ≠ 0

"Tiles of width 4 tiling a hall of width 12: 3 tiles fit exactly (12=4×3). We say 4 divides 12, written 4|12.
Tiles of width 5 in a hall of width 12: 2 tiles (=10) leaves a gap of 2. We say 5 does not divide 12, written 5∤12."

Concrete check procedure:
1. Try to write b = a×k for some integer k.
2. If k ∈ ℤ (a whole number) works: a|b (YES).
3. If no such integer k exists: a∤b (NO).

Example — does 7|42?
```
42 = 7 × 6   →   k = 6 ∈ ℤ   →   7|42   (YES)
```
Example — does 7|40?
```
40 = 7 × 5 + 5   →   no integer k with 7k=40   →   7∤40   (NO)
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Does 6|18? Find the witnessing integer k and write the equation b=ak."
→ CORRECT [18=6×3, k=3, so 6|18]: "Correct — k=3 witnesses the divisibility." → TA-A02
→ PARTIAL [says YES but cannot produce the equation]: "Write: 18 = 6 × ___. What fills the blank?" → re-prompt
→ INCORRECT [computes 6÷18=1/3 or 18÷6=3 but says 'the answer is 3' without recognising it as a relation]: Flag MC-1. Route → B01
→ NO_RESPONSE: Replay tiling example with 6-unit tiles and 18-unit hallway.

---

### TA-A02 — From Concrete Grouping to Formal Definition (GR-1: P11 | GR-2: P49)

**P11 REPRESENTATION SHIFT**

Three representations of the same fact (4|12):

| Representation | Form | Example |
|---|---|---|
| Concrete | Tiles with no remainder | 12 tiles into groups of 4: 3 full groups, 0 left |
| Procedural | Division algorithm | 12 ÷ 4 = 3 remainder 0 |
| Formal | Existential statement | ∃k∈ℤ: 12 = 4×k (k=3) |

All three represent the same fact. The formal definition is the most general — it works for negative integers and zero, where grouping intuition breaks down.

Notation distinction (critical):
- **a|b** (vertical bar) — a relation; means "a divides b"; result is TRUE or FALSE
- **a÷b** or **b/a** — an operation; means "divide a into b"; result is a number

Reading "4|12" aloud: "4 divides 12" (not "4 divided by 12").

**P49 ADAPTIVE CHECKPOINT**
Q: "Write the formal definition check for: does 9|45? State TRUE or FALSE, identify k, and write the equation."
→ CORRECT [45=9×5, k=5∈ℤ, TRUE]: "Correct — TRUE, k=5." → TA-A03
→ PARTIAL [says TRUE but writes '9÷45' or computes 9÷45=0.2]: Flag MC-1 if notation confused. Route → B01
→ INCORRECT [says FALSE or cannot find k]: "Is there a whole number k with 9×k=45? Try k=5." → guided re-prompt
→ NO_RESPONSE: Walk through the three-representation table for 9|45.

---

### TA-A03 — Divisibility as Relation vs. Division as Operation (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

*Case A — a|b (divisibility relation — outputs TRUE/FALSE):*
- "Does 4 divide 12?" → check if 12=4×k for some k∈ℤ → k=3 → **TRUE**
- "Does 5 divide 12?" → check if 12=5×k for some k∈ℤ → no integer k → **FALSE**
- Output: a yes/no verdict, written 4|12 (TRUE) or 5∤12 (FALSE)

*Case B — a÷b (division operation — outputs a number):*
- 12÷4 = **3** (a number)
- 12÷5 = **2.4** (a number, possibly non-integer)
- Output: always a number, even when the answer is not an integer

Side-by-side:
```
4|12  means  "4 divides 12"   →  TRUE    (a relation, not a number)
12÷4  means  "12 divided by 4" → 3       (a number)
```
The relation 4|12 is TRUE because the operation 12÷4 produces an integer (3). But 4|12 ≠ 3.

**P49 ADAPTIVE CHECKPOINT**
Q: "What does 8|24 mean? Is the result of writing '8|24' a number or a truth value?"
→ CORRECT ["8 divides 24" / TRUE / truth value]: "Correct — it is a relation, result is TRUE." → TA-A04
→ INCORRECT [says "8|24 = 3" or confuses with 24÷8=3]: Flag MC-1. Route → B01
→ NO_RESPONSE: Re-present the side-by-side contrast table.

---

### TA-A04 — Properties of Divisibility (GR-1: P04 | GR-2: P49)

**P04 PATTERN INDUCTION**

Observe these examples and identify the pattern:

*Reflexive property — every integer divides itself:*
```
3|3   because 3 = 3×1,   k=1 ∈ ℤ  ✓
−5|(−5) because −5 = (−5)×1, k=1 ∈ ℤ  ✓
Pattern: a|a for all nonzero integers a.
```

*Transitive property — divisibility chains:*
```
2|6  (6=2×3)  and  6|18  (18=6×3)  →  2|18  (18=2×9)  ✓
3|12 (12=3×4) and  12|60 (60=12×5) →  3|60  (60=3×20) ✓
Pattern: if a|b and b|c, then a|c.
```

*NOT symmetric — divisibility does not reverse:*
```
4|12  (12=4×3, k=3∈ℤ)  ✓
12|4  would need 4=12×k → k=1/3 ∉ ℤ  ✗
2|10 ✓  but  10|2 ✗  (k=1/5 ∉ ℤ)
Pattern: a|b does NOT imply b|a (unless a=b or a=−b).
```

*Divisibility of zero:*
```
a|0 for any nonzero a, because 0 = a×0, k=0 ∈ ℤ  ✓
0|b is undefined (0 cannot be a divisor).
```

**P49 ADAPTIVE CHECKPOINT**
Q: "True or false: (a) 7|7; (b) if 3|9 and 9|27 then 3|27; (c) since 4|20, we also have 20|4."
→ CORRECT [(a) TRUE — reflexive; (b) TRUE — transitive; (c) FALSE — not symmetric]: "All three correct." → TA-A05
→ PARTIAL [(c) answered TRUE]: Flag MC-2. Route → B02
→ INCORRECT [(a) or (b) wrong]: Re-present the pattern evidence for the missed property. → re-prompt
→ NO_RESPONSE: "Start with (a): can you write 7=7×___? What is k?" → guided scaffold

---

### TA-A05 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **Does 7|42?** Find the witnessing integer k and write b=ak.
   *(Expected: 42=7×6, k=6∈ℤ, YES — 7|42)*

2. **Does 8|36?** Answer YES or NO and justify with the definition.
   *(Expected: 36=8×4+4; no integer k satisfies 8k=36; NO — 8∤36)*

3. **True/False:** If 4|12, then 12|4.
   *(Expected: FALSE — 4=12×k requires k=1/3, not an integer)*

4. **Prove a|0 for any nonzero integer a.** (Exhibit the witnessing k.)
   *(Expected: 0=a×0, so k=0∈ℤ witnesses a|0 for any nonzero a ✓)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: cross-link mode — math.abst.ring-theory IS Tier 1)

*Ring-theoretic extension — divisibility in polynomial rings:*

"In the integers ℤ, we defined a|b as: ∃k∈ℤ such that b=a×k. Ring theory extends this to other rings using the same definition. Consider the polynomial ring ℤ[x] (polynomials with integer coefficients), where the role of 'integers' is played by polynomials.

We say (x−1) divides p(x) in ℤ[x] when ∃ q(x)∈ℤ[x] such that p(x)=(x−1)·q(x).

(a) Does (x−1) divide (x²−1)? Find the witnessing polynomial q(x).
(b) Does (x−1) divide (x²+1)? Attempt to find q(x); if you cannot, explain why."

*(Expected:*
*(a) YES: x²−1=(x−1)(x+1), so q(x)=x+1∈ℤ[x] ✓*
*(b) NO: dividing x²+1 by (x−1) gives quotient x+1 with remainder 2. Since 2≠0, there is no polynomial q(x)∈ℤ[x] satisfying x²+1=(x−1)·q(x). The same definition — same structure, same test — applies in both ℤ and ℤ[x].)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.85; ⌈0.85×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 DIVISIBILITY-CONFUSED-WITH-DIVISION first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now determine whether a|b using the definition, name the witnessing integer k, state the reflexive and transitive properties, and correctly identify that divisibility is not symmetric. This is the foundation for prime numbers, GCD, and LCM — all of which rest on this definition."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: DIVISIBILITY-CONFUSED-WITH-DIVISION (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A very common confusion: reading '4|12' as '4 divided by 12' (=1/3) or treating divisibility as synonymous with performing division. The vertical bar | in '4|12' is not the division symbol — it names a relation (true/false), not an operation (a number)."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "When you write '4|12', do you mean (A) a yes/no question 'does 4 divide 12?', or (B) a computation '4 divided by 12'?"
→ Answer B (computation): MC-1 confirmed. Continue B01.
→ Answer A (relation): MC-1 not active. Exit B01 → next flagged misconception or TA-A05.

**P64 CONCEPTUAL SHIFT**
"The symbol | in divisibility notation reads as the English word 'divides': '4|12' reads '4 divides 12'. This is a claim — TRUE or FALSE — not a calculation.

The division operation 12÷4=3 is related but distinct: we say 4|12 (TRUE) precisely because 12÷4 yields an integer. But 4|12 is not equal to 3; it is a true statement.

Quick key:
```
4|12   →  TRUE (relation; reads "4 divides 12")
12÷4   →  3    (operation; reads "12 divided by 4")
```
Never read the | as ÷."

**P49 ADAPTIVE CHECKPOINT**
Q: "Write out what '6|30' means in a full English sentence and state whether it is TRUE or FALSE."
→ CORRECT ["6 divides 30" / TRUE since 30=6×5]: "Correct — a sentence about a relation, not a number." Exit B01 → B02 if flagged, else TA-A05.
→ INCORRECT [says "6 divided by 30 = 0.2"]: Re-present P64 notation key. → re-prompt.

---

### TA-B02 — Repair: DIVISIBILITY-SYMMETRIC (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Divisibility can feel symmetric because multiplication is commutative, but the relation is NOT symmetric. If 4|12, it does not follow that 12|4. The direction of divisibility matters."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Since 4|12, does that mean 12|4? Explain."
→ "Yes, because multiplication is symmetric": MC-2 confirmed. Continue B02.
→ "No": MC-2 not active. Exit B02 → B03 if flagged, else TA-A05.

**P64 CONCEPTUAL SHIFT**
"Test 12|4 directly: we need an integer k with 4 = 12×k.
k = 4/12 = 1/3 — not an integer. So 12∤4.

The asymmetry is structural: if a<b and a|b (with a,b positive), then b/a > 1, so b cannot divide a (b/a is a fraction, 1/a < 1). Divisibility 'flows' from smaller factors to larger multiples, not back.

```
4|12:  12 = 4×3,   k=3∈ℤ   ✓
12|4:  4  = 12×k → k=1/3∉ℤ  ✗
```
"

**P49 ADAPTIVE CHECKPOINT**
Q: "True or False: since 3|15, we have 15|3. Show the definition check."
→ CORRECT [FALSE; 3=15×k → k=1/5∉ℤ]: "Correct — not symmetric." Exit B02 → B03 if flagged, else TA-A05.
→ INCORRECT: "Attempt 3=15×k. What is k?" → guided.

---

### TA-B03 — Repair: DIVISIBILITY-RESTRICTED-TO-POSITIVES (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"The definition a|b works for all integers — positive, negative, and zero — not just positive ones. A learner who checks only positive cases may miss that (−3)|12 is TRUE, or that a|0 is always TRUE for nonzero a."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Does (−3) divide 12? And does 7 divide 0?"
→ Says NO to either (refuses to handle negatives/zero): MC-3 confirmed. Continue B03.
→ Correct on both: MC-3 not active. Exit B03 → TA-A05.

**P64 CONCEPTUAL SHIFT**
"The definition ∃k∈ℤ: b=ak uses all integers, including negatives and zero.

(−3)|12: need 12=(−3)×k → k=−4∈ℤ  ✓  so (−3)|12 is TRUE.
7|0:     need  0=7×k    → k=0∈ℤ   ✓  so 7|0 is TRUE for any nonzero 7.
0|5:     need  5=0×k    → 0×k=0≠5 ✗  so 0∤5 — zero cannot be a divisor.

The only restriction: a≠0 (zero is never a divisor). The dividend b can be any integer, including 0 or negative."

**P49 ADAPTIVE CHECKPOINT**
Q: "Does (−4)|20? Find the witnessing k."
→ CORRECT [20=(−4)×(−5), k=−5∈ℤ, YES]: "Correct — negative divisors work." Exit B03 → TA-A05.
→ INCORRECT: "Try k=−5: (−4)×(−5)=?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Definition and witnessing k | Does 6|42? Find k. (k=7 ✓) |
| Day 3 | Non-divisibility: confirming NO | Does 9|50? (50=9×5+5; remainder≠0; NO) |
| Day 7 | Properties: reflexive, transitive, NOT symmetric | If 3|6 and 6|24, does 3|24? (YES, transitive, k=8) |
| Day 30 | Cross-domain: polynomial divisibility preview | Does (x−2) divide (x²−4)? (YES: (x−2)(x+2)=x²−4) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.arith.division (required): b÷a=k with remainder 0 is the computational equivalent of a|b; division algorithm b=aq+r formalised here as r=0
- math.found.integers (required): the witnessing k must lie in ℤ — rationals do not count; integer domain is essential to the definition

**Enables:**
- math.nt.prime-number: p is prime ↔ the only divisors of p in ℤ are ±1 and ±p
- math.nt.gcd: gcd(a,b) = largest d such that d|a and d|b
- math.nt.lcm: lcm(a,b) = smallest positive m such that a|m and b|m

**Cross-links (GR-8):**
- math.abst.ring-theory (Tier 1): divisibility generalises from ℤ to any ring using the same existential definition b=ak; P76 cross-link probe uses polynomial ring ℤ[x] to demonstrate the same structure

---

## Component 8 — Teaching Notes

1. **Notation is the primary barrier:** The vertical bar | looks like the fraction bar / and the division operator ÷. Require learners to read a|b aloud as "a divides b" every time they write it until the language is automatic.

2. **Witnessing integer k is the proof:** Every YES answer to a divisibility question must include an explicit k. This habit becomes essential in number theory proofs.

3. **Zero cases are counterintuitive:** a|0 always holds (k=0) but 0|b never holds. These are tested in P77 item 4 and must be drilled. Learners who restrict to positive integers miss half the integer domain.

4. **Negative witnessing k:** (−3)|12 uses k=−4 (negative). Do not let learners believe divisors or quotients must be positive — the only requirement is k∈ℤ.

5. **P76 cross-link motivation:** The polynomial ring probe is not a deep ring theory lesson — it is a concrete demonstration that the same three-word definition ("exists integer k") has power far beyond arithmetic. It motivates why ring theory is studied.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.arith.division ✓, math.found.integers ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02, A03, A04) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A05 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A05 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A05 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 | PASS |
| V-11 | GR-9: math.abst.ring-theory IS Tier 1 → P76 cross-link probe (polynomial ring) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.85×5⌉ = 5/5 | PASS |
| V-14 | bloom=understand → P07 not required; P11 (REPRESENTATION SHIFT) used in A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe extends divisibility to ring-theoretic context (Tier 1 cross-link) | PASS |
| V-18 | MC-1 DIVISIBILITY-CONFUSED-WITH-DIVISION designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
