# TEACHING BLUEPRINT — math.alg.simplification

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.alg.simplification |
| concept_name | Algebraic Simplification |
| domain | algebra |
| difficulty | developing |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.85 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.85 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.alg.like-terms, math.alg.expression]
**unlocks:** [math.alg.equation]
**cross_links:** [] — none

---

## Component 1 — Cognitive Map

**Core concept:** Algebraic simplification rewrites an expression in an equivalent but simpler form by applying three techniques in sequence: (1) expand brackets using the distributive law, (2) combine like terms, and (3) apply exponent rules where applicable. The simplified form is equivalent (same value for every substitution) but contains fewer terms and operations.

**Knowledge prerequisites activated:**
- math.alg.like-terms: terms with identical variable parts can be combined by operating on their coefficients; like-term recognition drives steps (2) and (3)
- math.alg.expression: an algebraic expression is a collection of terms; simplification produces an equivalent expression, never changes it to an equation

**Concept structure:**
1. **Bracket expansion**: distributive law — a(b+c) = ab + ac; extend to (a+b)(c+d) = ac + ad + bc + bd
2. **Sign management**: distributing a negative sign flips all enclosed signs — −(x−3) = −x+3
3. **Like-terms collection**: after expanding, group and combine like terms
4. **Exponent rules in context**: x²·x³ = x⁵; x³·x³ = x⁶ (from math.arith.exponent-rules, applied within expressions)
5. **Equivalence**: the result has the same value as the original for every permissible substitution

**Target understanding:** Given a bracket expression with like terms, the learner expands brackets, manages signs correctly, and collects like terms to produce a fully simplified equivalent expression.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | DISTRIBUTES-INCORRECTLY | Shown a(b+c), asked to expand | Multiplies only the first term: a(b+c) = ab + c; omits multiplying a by the second term c | B01 |
| MC-2 | SIGN-FLIPS-MISSED | Shown −(x−3) or 3(x−4), asked to expand | Ignores the sign effect: −(x−3) = −x−3 (wrong) or 3(x−4) = 3x−4 (wrong — misses multiplying −4 by 3) | B02 |
| MC-3 | UNLIKE-TERMS-COMBINED-AFTER-EXPANSION | After expanding 3(x+2)−2(x−1), asked to simplify | Combines unlike residual terms: 3x+6−2x+2 → "5x+something" or combines the constant with the x-coefficient | B03 |

**FOUNDATIONAL MC:** MC-1 (DISTRIBUTES-INCORRECTLY) — incomplete distribution means every subsequent step operates on wrong terms, making all simplification results incorrect.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
"Bill calculation" model: 3 bags each containing (2 apples and 1 orange) = 3×2 apples + 3×1 orange = 6 apples + 3 oranges. Each item in the bag gets multiplied by the number of bags. The distributive law is this itemised multiplication.

**Progression Gate (C → P):** Learner correctly multiplies every term inside brackets by the outside factor.
**Progression Gate (P → A):** Learner manages negative outside factors and combines like terms after expansion without prompting.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — "Every Item Gets Multiplied": Bracket Expansion (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: A shopping receipt — if you buy 3 packs, each containing (2 pens and 4 erasers), the total is 3×2 = 6 pens and 3×4 = 12 erasers. Every item inside the pack gets multiplied by the quantity of packs.
Target domain: Distributive law — a(b+c) means every term inside the brackets is multiplied by a.
Mapping: packs count ↔ outside factor a; items in pack ↔ terms inside brackets; itemised total ↔ expanded expression.

Expansion procedure:
```
a(b + c)  =  a·b  +  a·c
          =  ab   +  ac

3(x + 4)  =  3·x  +  3·4  =  3x + 12
5(2y - 3) =  5·2y + 5·(−3) = 10y − 15
```

Sign note — when the outside factor is negative:
```
−2(x + 3) = (−2)·x + (−2)·3 = −2x − 6
−(x − 3)  = (−1)·x + (−1)·(−3) = −x + 3
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Expand 4(3x − 2)."
→ CORRECT [12x − 8]: "Correct — 4·3x = 12x; 4·(−2) = −8." → TA-A02
→ INCORRECT [12x − 2]: Flag MC-1. Route → B01.
→ INCORRECT [12x + 8]: Flag MC-2. Route → B02.
→ NO_RESPONSE: "Multiply 4 by each term: 4 × 3x = ___; 4 × (−2) = ___." → guided.

---

### TA-A02 — Full Simplification: Expand Then Collect (GR-1: P07 | GR-2: P49)

**P07 WORKED EXAMPLE PAIR**

**Worked example 1:** Simplify 3(2x − 1) + 2(x + 4).

Step 1 — Expand each bracket:
```
3(2x − 1) = 6x − 3
2(x + 4)  = 2x + 8
```

Step 2 — Write the expanded expression:
```
6x − 3 + 2x + 8
```

Step 3 — Collect like terms:
```
(6x + 2x) + (−3 + 8)
= 8x + 5
```

Result: **8x + 5**

---

**Worked example 2:** Simplify 2x(x + 3) − x(x − 1).

Step 1 — Expand each bracket:
```
2x(x + 3) = 2x² + 6x
x(x − 1)  = x² − x
```

Step 2 — Write the expanded expression (note subtraction of the second group):
```
2x² + 6x − (x² − x)
= 2x² + 6x − x² + x     ← distribute the negative sign
```

Step 3 — Collect like terms:
```
(2x² − x²) + (6x + x)
= x² + 7x
```

Result: **x² + 7x**

**P49 ADAPTIVE CHECKPOINT**
Q: "Simplify 5(a + 2) − 3(a − 1)."
→ CORRECT [2a + 13]: "Correct — (5a+10) − (3a−3) = 5a+10−3a+3 = 2a+13." → TA-A03
→ INCORRECT [2a + 7]: Flag MC-2. Route → B02. (Likely wrote −(a−1)=−a−1, missing sign flip)
→ INCORRECT [8a + 7 or similar]: Flag MC-3. Route → B03.
→ NO_RESPONSE: "Expand each bracket first. Then subtract the second from the first, collecting like terms." → guided.

---

### TA-A03 — Simplified vs. Not Simplified (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

| Feature | Not simplified | Simplified | Why it's simpler |
|---|---|---|---|
| Example A | 3(x+2) − 2(x−1) | x + 8 | One term per variable part; no brackets |
| Example B | 2x(x+3) − x(x−1) | x² + 7x | Two unlike terms, both in canonical form |
| Example C | 4a² − 2a + 3a² + a | 7a² − a | Combined like a²-terms and a-terms |
| Example D | −(2x−3) + x | −x + 3 | Bracket expanded, unlike terms preserved |

A fully simplified expression:
- Has no unexpanded brackets
- Has no like terms that can still be combined
- Has each variable part appearing at most once

An expression is NOT simplified if any bracket remains unexpanded or any two like terms are still separate.

**P49 ADAPTIVE CHECKPOINT**
Q: "Is the expression 4x² + 2x − x² + 3x fully simplified? If not, simplify it."
→ CORRECT [No — 4x² and −x² are like; 2x and 3x are like → 3x² + 5x]: "Correct." → TA-A04
→ INCORRECT [leaves as is]: Flag MC-3. Route → B03.
→ NO_RESPONSE: "Check each term. Do any two share the same variable part?" → guided.

---

### TA-A04 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **Expand and simplify: 3(2x − 1) + 2(x + 4).**
   *(Expected: 6x − 3 + 2x + 8 = 8x + 5)*

2. **Expand and simplify: 2x(x + 3) − x(x − 1).**
   *(Expected: 2x² + 6x − x² + x = x² + 7x)*

3. **True/False:** 5(x + 2) = 5x + 2.
   *(Expected: FALSE — 5(x+2) = 5x + 10; both terms inside the bracket must be multiplied by 5)*

4. **Simplify: 4a² − 2a + 3a² + a.**
   *(Expected: 7a² − a — collect the a²-terms and the a-terms)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — cross_links=[], novel context)

*Perimeter and area of a rectangle:*

"A rectangle has length (3x + 1) metres and width (x − 2) metres.

(a) Write and simplify an expression for the perimeter P = 2(length + width).
(b) Expand (but do not factor) the area expression A = (3x + 1)(x − 2)."

*(Expected:
(a) P = 2((3x+1) + (x−2)) = 2(4x−1) = 8x − 2
(b) A = 3x·x + 3x·(−2) + 1·x + 1·(−2) = 3x² − 6x + x − 2 = 3x² − 5x − 2)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.85; ⌈0.85×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 DISTRIBUTES-INCORRECTLY first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now expand brackets using the distributive law, manage negative signs correctly, and collect like terms to produce a fully simplified equivalent expression. Algebraic simplification is applied in every equation-solving, function analysis, and polynomial operation that follows."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: DISTRIBUTES-INCORRECTLY (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"The distributive law requires multiplying the outside factor by EVERY term inside the brackets — not just the first term. Stopping after the first multiplication leaves an incorrect expression that cannot be simplified correctly."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Expand 3(x + 5)."
→ "3x + 15": MC-1 not active. Exit B01 → next flagged MC or TA-A04.
→ "3x + 5": MC-1 confirmed. Continue B01.

**P64 CONCEPTUAL SHIFT**
"Every term inside the brackets gets multiplied. Draw an arrow from the outside factor to each term:

```
    3
   /|\
  / | \
3x  +  15
│      │
3·x   3·5

3(x + 5) = 3·x + 3·5 = 3x + 15
```

Check: count the terms inside the brackets (here: 2). Count the multiplication results (should also be 2: 3x and 15). If the counts differ, you missed a multiplication."

**P49 ADAPTIVE CHECKPOINT**
Q: "Expand 2(3a + b − 4)."
→ CORRECT [6a + 2b − 8]: "Correct — 2×3a, 2×b, 2×(−4)." Exit B01 → B02 if flagged, else TA-A04.
→ INCORRECT: "There are 3 terms inside the brackets. How many products should result?" → guided.

---

### TA-B02 — Repair: SIGN-FLIPS-MISSED (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"When the outside factor is negative, every term inside the brackets changes sign. −(x−3) = −x+3, not −x−3. A common error is to apply the negative sign to the variable but not to subsequent terms, or to forget to flip the sign of a negative term inside."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Expand −(x − 3)."
→ "−x + 3": MC-2 not active. Exit B02 → B03 if flagged, else TA-A04.
→ "−x − 3": MC-2 confirmed. Continue B02.

**P64 CONCEPTUAL SHIFT**
"A negative outside factor = multiplying by −1. Every sign inside flips:

```
−(x − 3)
= (−1)·x + (−1)·(−3)
= −x + (+3)
= −x + 3

Mnemonic: Negative outside → every sign inside FLIPS.
  '+' inside becomes '−' outside; '−' inside becomes '+' outside.

Example: −2(3x − 4)
= (−2)·3x + (−2)·(−4)
= −6x + 8        ← both signs flipped
```"

**P49 ADAPTIVE CHECKPOINT**
Q: "Expand −3(2x − 5)."
→ CORRECT [−6x + 15]: "Correct — (−3)(2x) = −6x; (−3)(−5) = +15." Exit B02 → B03 if flagged, else TA-A04.
→ INCORRECT [−6x − 15]: "Multiply (−3) × (−5). What is the sign of the result?" → re-prompt.

---

### TA-B03 — Repair: UNLIKE-TERMS-COMBINED-AFTER-EXPANSION (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"After expanding brackets, learners sometimes combine terms with different variable parts — for instance, adding a constant to an x-coefficient. Only like terms (identical variable parts) can be combined. An expression with two unlike terms remaining after correct expansion is already fully simplified."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Simplify 3(x + 2) − 2x." (Expected: x + 6.)
→ "x + 6": MC-3 not active. Exit B03 → TA-A04.
→ Any answer combining x and constant (e.g., "−x + 6" mishandled, or "7" treating x as combinable with 6): MC-3 confirmed. Continue B03.

**P64 CONCEPTUAL SHIFT**
"After expanding, apply the like-terms rule strictly: only terms with identical variable parts combine.

```
Simplify 3(x + 2) − 2x:

Step 1 — Expand: 3x + 6 − 2x

Step 2 — List variable parts: 3x (part: x), 6 (part: constant), −2x (part: x)

Step 3 — Group:
  x-terms: 3x, −2x → (3−2)x = x
  constants: 6

Step 4 — Result: x + 6  ← x and 6 are UNLIKE; cannot combine further
```

'x + 6' is fully simplified. You cannot add 1 + 6 to get 7, because 1 is the coefficient of x, not a standalone constant."

**P49 ADAPTIVE CHECKPOINT**
Q: "Simplify 4(a + 1) − 2a + 3. Show the intermediate expanded form, then collect like terms."
→ CORRECT [4a + 4 − 2a + 3; → 2a + 7]: "Correct — a-terms: 4a−2a=2a; constants: 4+3=7." Exit B03 → TA-A04.
→ INCORRECT [combines 2a and 7]: "The coefficient 2 belongs to 'a'. The number 7 is a standalone constant. Do they have the same variable part?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Bracket expansion | "Expand and simplify 4(x+3)−2(x−1)" (2x+14) |
| Day 3 | Negative bracket | "Expand and simplify 3x−(x−4)+2" (2x+6) |
| Day 7 | Product of a monomial and bracket | "Simplify 2x(x+1)−x²+3x" (x²+5x) |
| Day 30 | Transfer: substitution in simplified vs. original | "Verify 3(2x−1)+2(x+4) = 8x+5 by substituting x=2 in both" (both give 21) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.alg.like-terms (required): after expansion, like-terms collection completes the simplification; the entire combining step draws on like-term recognition
- math.alg.expression (required): the input and output of simplification are algebraic expressions; learner must distinguish expression (simplify) from equation (solve)

**Enables:**
- math.alg.equation: solving equations requires simplifying both sides; simplification is prerequisite for any equation work beyond single-step cases

**Cross-links (GR-8):**
- (none — cross_links=[])

---

## Component 8 — Teaching Notes

1. **h=5 three-TA structure:** Simplification has three sub-skills (expansion, sign management, like-terms collection); 3 TAs + gate allocates one TA per sub-skill group before the gate.

2. **P07 worked examples model the two-step process explicitly:** Both examples show the intermediate expanded form before collecting like terms. The intermediate form is essential — learners who skip it make more sign errors.

3. **Negative bracket is the most common error surface:** MC-2 (sign flips missed) is typically more common than MC-1 at this stage because learners understand the distributive law conceptually but lose track of sign arithmetic. B02's mnemonic ("every sign inside flips") is designed to be self-applicable without a formula.

4. **P76 uses double-bracket expansion for area:** (3x+1)(x−2) previews the FOIL / distributive double-expansion without naming FOIL. The expectation is an expanded polynomial form — the conceptual leap is applying distribution twice. Learner is not asked to factor.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.alg.like-terms ✓, math.alg.expression ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01–A03) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A04 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A04 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A04 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 (none) | PASS |
| V-11 | GR-9: cross_links=[] → P76 independence (perimeter and area context) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.85×5⌉ = 5/5 | PASS |
| V-14 | bloom=apply → P07 present in TA-A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (rectangle perimeter and area) | PASS |
| V-18 | MC-1 DISTRIBUTES-INCORRECTLY designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
