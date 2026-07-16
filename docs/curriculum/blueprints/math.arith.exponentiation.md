# TEACHING BLUEPRINT — math.arith.exponentiation

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.arith.exponentiation |
| concept_name | Exponentiation |
| domain | arithmetic |
| difficulty | developing |
| bloom | apply |
| estimated_hours | 10 |
| mastery_threshold | 0.85 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.85 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.arith.multiplication]
**unlocks:** [math.arith.square-roots, math.arith.scientific-notation, math.alg.exponent-rules]
**cross_links:** [math.alg.exponential-function — NOT Tier 1]

---

## Component 1 — Cognitive Map

**Core concept:** Exponentiation aⁿ (read "a to the power n") means multiplying a by itself n times: aⁿ = a×a×…×a (n factors). The base a is the repeated factor; the exponent n counts how many times it appears. Key special cases: a⁰=1 for a≠0 (no factors means the multiplicative identity); a¹=a; a⁻ⁿ=1/aⁿ (for the extension to negative exponents).

**Knowledge prerequisites activated:**
- math.arith.multiplication: aⁿ is iterated multiplication; each step multiplies the running product by a

**Concept structure:**
1. **Definition**: aⁿ = a × a × … × a (n copies of a); n must be a positive integer for the basic definition
2. **Base and exponent roles**: base a is the factor being repeated; exponent n counts repetitions
3. **Special cases**: a¹=a (one copy); a⁰=1 (zero copies — multiplicative identity convention); a⁻ⁿ=1/aⁿ
4. **Common misconception boundary**: aⁿ ≠ a×n (exponent counts multiplications, not additions)

**Target understanding:** Given a base and exponent, the learner expands aⁿ as a repeated multiplication, computes the value, correctly handles the zero exponent, and distinguishes aⁿ from a×n.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | EXPONENT-MULTIPLIES-BASE | Presented with 2³ or 5² | Computes base × exponent: 2³=2×3=6 (instead of 2×2×2=8); or 5²=5×2=10 (instead of 5×5=25) | B01 |
| MC-2 | EXPONENT-ADDS-COPIES | Presented with 2³ | Computes base added n times: 2³=2+2+2=6 (repeated addition instead of repeated multiplication) | B02 |
| MC-3 | ZERO-EXPONENT-GIVES-ZERO | Asked for a⁰ | Computes a⁰=0 (instead of a⁰=1); reasons "no factor, no value" without applying the multiplicative identity convention | B03 |

**FOUNDATIONAL MC:** MC-1 (EXPONENT-MULTIPLIES-BASE) — confuses exponentiation with multiplication at the definition level; must be cleared before special-case and extension work.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
Paper-folding model: fold one sheet of paper once → 2 layers (2¹). Fold again → 4 layers (2²). Fold again → 8 layers (2³). The layer count doubles (multiplies) with each fold. Generalise: aⁿ means the running product is multiplied by a a total of n times.

**Progression Gate (C → P):** Learner can expand any aⁿ as a chain of n copies of a connected by × signs, then compute the product step by step.
**Progression Gate (P → A):** Learner computes 2-digit and 3-digit bases to small exponents, handles zero exponent, and applies exponentiation inside PEMDAS expressions.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Repeated Doubling: Paper-Fold and Layer Count (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: Folding paper — each fold doubles the layer count; after n folds, there are 2ⁿ layers.
Target domain: Exponentiation — each step multiplies by the base; after n steps, the product is aⁿ.
Mapping: number of folds ↔ exponent n; starting sheet (1 layer) ↔ the implicit starting value 1; doubling ↔ multiplying by base 2

"Start with 1 sheet. Fold 1 time → 2 layers. Fold again → 4. Fold again → 8. Three folds → 2³=8 layers. The exponent counts the folds; each fold multiplies by 2. This is why 2³ means 2×2×2, not 2×3."

Concrete expansion table:
```
2¹ = 2                    (1 factor of 2)
2² = 2 × 2 = 4            (2 factors of 2)
2³ = 2 × 2 × 2 = 8        (3 factors of 2)
2⁴ = 2 × 2 × 2 × 2 = 16  (4 factors of 2)
```
General rule: aⁿ = a × a × … × a (n copies of a as factors).

**P49 ADAPTIVE CHECKPOINT**
Q: "Expand 3³ as a multiplication chain and compute the result."
→ CORRECT [3×3×3=27]: "Correct — three 3s multiplied: 27." → TA-A02
→ INCORRECT [3×3=9 — stops after 2 factors]: "How many copies of 3 does the exponent 3 require? Count them." → re-prompt
→ INCORRECT [3³=3×3=9 or 3+3+3=9]: Flag MC-1 or MC-2. Route → B01 (MC-1 if multiplied by exponent; B02 if added)
→ NO_RESPONSE: Show the row for 3¹=3, 3²=3×3=9; ask: what does 3³ add?

---

### TA-A02 — Worked Examples: Computing aⁿ Step by Step (GR-1: P07 | GR-2: P49)

**P07 WORKED EXAMPLE PAIR**

*Example 1 — Integer base, small exponent:*
Compute 3⁴.
```
Step 1 — Expand: 3⁴ = 3 × 3 × 3 × 3   (4 copies of 3)
Step 2 — Multiply left to right:
         3 × 3 = 9
         9 × 3 = 27
         27 × 3 = 81
Result: 3⁴ = 81
```

*Example 2 — Larger base, exponent 5:*
Compute 2⁵.
```
Step 1 — Expand: 2⁵ = 2 × 2 × 2 × 2 × 2   (5 copies of 2)
Step 2 — Multiply left to right:
         2 × 2 = 4
         4 × 2 = 8
         8 × 2 = 16
         16 × 2 = 32
Result: 2⁵ = 32
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Compute 4³. Show the expansion and multiply step by step."
→ CORRECT [4×4×4; 4×4=16; 16×4=64]: "Correct — 64." → TA-A03
→ PARTIAL [says 64 but skips steps]: "Write out 4×4×4 as a chain with intermediate results." → re-prompt
→ INCORRECT [4³=4×3=12]: Flag MC-1. Route → B01
→ INCORRECT [4³=4+4+4=12]: Flag MC-2. Route → B02
→ NO_RESPONSE: Re-present Example 1 with 4³ partially filled: "4⁴ = 4 × 4 × 4 = __ × 4 = __." → guided

---

### TA-A03 — Exponentiation vs. Multiplication: aⁿ ≠ a×n (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

*Case A — Multiplication (a×n):*
Adding a to itself n times
```
4 × 3 = 4+4+4 = 12       (three 4s added)
2 × 5 = 2+2+2+2+2 = 10   (five 2s added)
```

*Case B — Exponentiation (aⁿ):*
Multiplying a by itself n times
```
4³ = 4×4×4 = 64          (three 4s multiplied)
2⁵ = 2×2×2×2×2 = 32      (five 2s multiplied)
```

Side-by-side comparison:
```
Operation       | 4 and 3         | 2 and 5
----------------|-----------------|----------
Multiplication  | 4×3 = 12        | 2×5 = 10
Exponentiation  | 4³  = 64        | 2⁵  = 32
```

Exponentiation grows far faster than multiplication for the same inputs. Confusing the two produces drastically wrong results. The notation: the superscript position (⁴) means exponent; the inline position with × (×4) means multiply.

**P49 ADAPTIVE CHECKPOINT**
Q: "Compute (a) 5×3 and (b) 5³. Are they equal? Which grows faster as the exponent/factor increases?"
→ CORRECT [(a) 15; (b) 125; not equal; exponentiation grows far faster]: "Correct — 125 vs. 15. Exponentiation dominates." → TA-A04
→ INCORRECT [(b) 5³=15 same as 5×3]: Flag MC-1. Route → B01
→ NO_RESPONSE: "Expand 5³: 5×5×5=?" → guided

---

### TA-A04 — Zero Exponent, Negative Exponents, and the Pattern (GR-1: P04 | GR-2: P49)

**P04 PATTERN INDUCTION**

Observe the decreasing-exponent pattern for base 2:
```
2⁴ = 16
2³ = 8      (16÷2)
2² = 4      (8÷2)
2¹ = 2      (4÷2)
2⁰ = ?      (2÷2 = 1)  ← each step divides by 2
2⁻¹ = ?     (1÷2 = 1/2)
2⁻² = ?     (1/2÷2 = 1/4)
```

**Generalised rules derived from the pattern:**
- a⁰ = 1 for any nonzero a (dividing aⁿ by a one more time: aⁿ/a = aⁿ⁻¹; at n=1: a¹/a = a⁰ = 1)
- a⁻ⁿ = 1/aⁿ for any nonzero a (extending the pattern below zero)

Verify with base 3:
```
3² = 9  →  3¹ = 3  →  3⁰ = 1  →  3⁻¹ = 1/3  →  3⁻² = 1/9
```

Common mistake: a⁰=0. The pattern shows a⁰=1 — "zero multiplications" gives the multiplicative identity (1), not zero.

**P49 ADAPTIVE CHECKPOINT**
Q: "Using the decreasing-exponent pattern, compute: (a) 5⁰, (b) 2⁻³."
→ CORRECT [(a) 1; (b) 1/(2³)=1/8]: "Correct — 1 and 1/8." → TA-A05
→ INCORRECT [(a) 5⁰=0]: Flag MC-3. Route → B03
→ INCORRECT [(b) 2⁻³=−8 or −1/8]: "Negative exponent means reciprocal, not negative base: 1/2³=1/8." → re-prompt
→ NO_RESPONSE: Show the table for base 2 down to 2⁰; ask: "Continue one more step: 2⁻¹=?" → guided

---

### TA-A05 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **Compute 3⁴.** Show the expansion and step-by-step multiplication.
   *(Expected: 3×3×3×3; 9×3=27; 27×3=81)*

2. **Compute 2⁵.**
   *(Expected: 2×2×2×2×2 = 32)*

3. **True/False:** 5² = 5×2 = 10.
   *(Expected: FALSE — 5²=5×5=25; the exponent counts multiplications of the base, not a product with the exponent)*

4. **Compute 7⁰.**
   *(Expected: 1 — the zero exponent rule; any nonzero base to the power zero equals 1)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — math.alg.exponential-function is NOT Tier 1; novel scientific notation context)

*Scientific notation — powers of 10:*

"Scientific notation represents very large and very small numbers using powers of 10.

(a) Compute 10¹, 10², and 10³. What pattern do you notice about each result?
(b) Compute 10⁰. State the general rule this illustrates.
(c) The speed of light is approximately 3×10⁸ metres per second. Expand 10⁸ as a number (without scientific notation). How many digits does it have?"

*(Expected:*
*(a) 10¹=10; 10²=100; 10³=1,000. Pattern: each power of 10 adds one zero (multiplies by 10).*
*(b) 10⁰=1. Rule: any nonzero base to the power zero equals the multiplicative identity, 1.*
*(c) 10⁸=100,000,000 (one followed by 8 zeros; 9 digits total). 3×10⁸=300,000,000 m/s.)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.85; ⌈0.85×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 EXPONENT-MULTIPLIES-BASE first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now compute aⁿ by repeated multiplication, distinguish exponentiation from multiplication, apply the zero-exponent rule, and transfer the operation to scientific notation contexts. Square roots, scientific notation, and all exponent-rule algebra build directly on this foundation."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: EXPONENT-MULTIPLIES-BASE (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"The most common exponentiation error: treating aⁿ as a×n — multiplying the base by the exponent. This is a confusion between the notation for multiplication (a×n) and exponentiation (aⁿ). The exponent counts repetitions of multiplication, not a single multiplication to perform."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "What is 2³ — compute it now."
→ Answers 6 (=2×3): MC-1 EXPONENT-MULTIPLIES-BASE confirmed. Continue B01.
→ Answers 8 (=2×2×2): MC-1 not active. Exit B01 → next flagged MC or TA-A05.

**P64 CONCEPTUAL SHIFT**
"The exponent is a counter — it counts how many times the base appears as a factor.

```
2³  means:  2 × 2 × 2  (the base 2, appearing 3 times as factors)
         =  4 × 2
         =  8

NOT: 2 × 3 = 6  ← that would be ordinary multiplication
```

Memory anchor: the exponent is in the 'air' (superscript) — it counts factors in the air above the expression. It does not multiply the base directly."

**P49 ADAPTIVE CHECKPOINT**
Q: "Expand 4² by writing out the factors, then compute."
→ CORRECT [4×4=16]: "Correct — two 4s multiplied: 16." Exit B01 → B02 if flagged, else TA-A05.
→ INCORRECT [4×2=8]: Re-present P64: "Write 4 once for each copy: 4_4. What operation connects them?" → guided.

---

### TA-B02 — Repair: EXPONENT-ADDS-COPIES (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A subtler error: computing 2³ as 2+2+2=6 — repeated addition instead of repeated multiplication. Adding 2 three times is 2×3=6 (ordinary multiplication). Multiplying 2 three times is 2³=8 (exponentiation). The step up from repeated addition to repeated multiplication is exactly the step from multiplication to exponentiation."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "How would you compute 2³ — do you add 2 three times, or multiply 2 three times?"
→ "Add 2 three times": MC-2 confirmed. Continue B02.
→ "Multiply 2 three times": MC-2 not active. Exit B02 → B03 if flagged, else TA-A05.

**P64 CONCEPTUAL SHIFT**
"The hierarchy of operations:
```
2+2+2       = 6   (repeated addition)   → this IS multiplication: 2×3=6
2×2×2       = 8   (repeated multiplication) → this IS exponentiation: 2³=8
```

Just as multiplication is repeated addition, exponentiation is repeated multiplication. They are two different levels of the same stacking idea.

2³ instructs repeated multiplication — each step multiplies the running product by 2, not adds."

**P49 ADAPTIVE CHECKPOINT**
Q: "Compute 3³. At each step, multiply (not add) by 3."
→ CORRECT [3×3=9; 9×3=27]: "Correct — 27." Exit B02 → B03 if flagged, else TA-A05.
→ INCORRECT [3+3+3=9]: Re-present the hierarchy: "After step 1: 3. After step 2: 3×3=9 (not 3+3=6). After step 3: ?" → guided.

---

### TA-B03 — Repair: ZERO-EXPONENT-GIVES-ZERO (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Many learners compute a⁰=0, reasoning 'zero multiplications gives zero.' But the mathematical convention is a⁰=1 for any nonzero a. The 'zero products' intuition applies to addition (zero additions gives 0) but not to multiplication (zero multiplications gives the multiplicative identity: 1)."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "What is 5⁰?"
→ Answers 0: MC-3 confirmed. Continue B03.
→ Answers 1: MC-3 not active. Exit B03 → TA-A05.

**P64 CONCEPTUAL SHIFT**
"Think about what happens to the product when you reduce the exponent by 1:
```
5⁴ = 625
5³ = 125   (625÷5)
5² = 25    (125÷5)
5¹ = 5     (25÷5)
5⁰ = ?     (5÷5 = 1)
```
Each step divides by 5. One more step: 5÷5=1. So 5⁰=1.

Alternatively: a⁰ represents the product of zero copies of a. The 'empty product' — like adding zero numbers gives 0 (additive identity), multiplying zero numbers gives 1 (multiplicative identity). Zero × anything = 0 is addition's empty sum rule, not multiplication's."

**P49 ADAPTIVE CHECKPOINT**
Q: "Using the decreasing pattern for base 3 (3²=9, 3¹=3, 3⁰=?), compute 3⁰."
→ CORRECT [3÷3=1]: "Correct — 3⁰=1." Exit B03 → TA-A05.
→ INCORRECT [0]: "One more step in the table: 3÷3=?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Basic expansion and computation | "Compute 2⁴ and 3³." (16 and 27) |
| Day 3 | Distinguishing aⁿ from a×n | "Is 4³ equal to 12 or 64?" (64; 4×4×4) |
| Day 7 | Zero and negative exponents | "Compute 6⁰ and 2⁻³." (1 and 1/8) |
| Day 30 | Application in PEMDAS context | "Evaluate 3+2³×2−1." (3+16−1=18) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.arith.multiplication (required): aⁿ is n successive multiplications by a; the entire concept builds on iterated multiplication

**Enables:**
- math.arith.square-roots: √a = a^(1/2) — square root is the inverse of squaring; a^(1/2) × a^(1/2) = a
- math.arith.scientific-notation: numbers written as c×10ⁿ; the 10ⁿ factor uses exponentiation
- math.alg.exponent-rules: product rule aᵐ×aⁿ=aᵐ⁺ⁿ, power rule (aᵐ)ⁿ=aᵐⁿ, etc. — all depend on the repeated-multiplication definition

**Cross-links (GR-8):**
- math.alg.exponential-function (NOT Tier 1): aˣ for real-valued x (extending from integer n to real x) — P76 independence mode used (scientific notation powers-of-10 probe instead)

---

## Component 8 — Teaching Notes

1. **Repeated multiplication hierarchy:** Present exponentiation explicitly as "the next level above multiplication" in the addition→multiplication→exponentiation tower. This structural framing prevents both MC-1 and MC-2 because learners who understand the tower do not confuse levels.

2. **Notation precision:** Require learners to write out the full expansion (3⁴=3×3×3×3) before any shortcut. After the expansion habit is established, mental computation is fine. Skipping the expansion is the primary source of MC-1 errors.

3. **Zero exponent motivation:** Always teach a⁰=1 via the decreasing-exponent pattern (TA-A04), not as a rule to memorise. Learners who see the pattern actively derive the rule and resist MC-3 much more effectively.

4. **Estimated hours = 10:** The high estimate reflects that this blueprint is a gateway for square roots, scientific notation, and all exponent algebra. Plan multiple sessions: session 1 (positive integer exponents), session 2 (zero exponent and pattern), session 3 (applications in PEMDAS and scientific notation).

5. **Negative base with even exponents:** (−2)²=4 (positive), but (−2)³=−8. This is a common source of sign errors. Not addressed in this blueprint (it belongs in math.alg.exponent-rules) but worth flagging if learners raise it.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.arith.multiplication ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02, A03, A04) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A05 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A05 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A05 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 | PASS |
| V-11 | GR-9: math.alg.exponential-function NOT Tier 1 → P76 independence (scientific notation probe) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.85×5⌉ = 5/5 | PASS |
| V-14 | bloom=apply → P07 WORKED EXAMPLE PAIR present in TA-A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (powers of 10 / scientific notation) | PASS |
| V-18 | MC-1 EXPONENT-MULTIPLIES-BASE designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
