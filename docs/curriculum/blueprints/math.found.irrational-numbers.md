# Teaching Blueprint: Irrational Numbers

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.found.irrational-numbers |
| KG_ID | math.found.irrational-numbers |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Foundations |
| NAME | Irrational Numbers |
| ALIASES | non-rational reals, √2, π, e |
| DIFFICULTY | developing |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.80 |
| ESTIMATED_HOURS | 4 |
| REQUIRES | math.found.rational-numbers |
| UNLOCKS | math.found.real-numbers |
| CROSS_LINKS | (none) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 5 (TA-A01 through TA-A05) |
| MASTERY_GATE_TA | TA-A05 (P91, terminal) |
| PASS_CRITERION | 4/5 (⌈0.80 × 5⌉ = 4; threshold = 0.80) |
| MAMR | MC-1 IRRATIONAL-IMPRECISE is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links = []; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.rational-numbers**: ℚ = {p/q : p, q ∈ ℤ, q ≠ 0}. Every rational has a terminating or eventually repeating decimal. Irrationals are defined as the complement: ℝ \ ℚ — real numbers that are NOT rational. The prerequisite also establishes that ℚ is dense but incomplete; irrationals fill the "holes."

### Target Understanding
1. **Formal definition**: A real number is irrational if it cannot be expressed as p/q with p, q ∈ ℤ and q ≠ 0.
2. **Decimal characterization**: Irrationals have non-terminating AND non-repeating decimal expansions. This is the diagnostic: if a decimal neither terminates nor eventually repeats, the number is irrational.
3. **Canonical examples**:
   - √2: irrational (proof by contradiction — see below)
   - √3, √5, √7, √p for any prime p: irrational
   - π ≈ 3.14159265358979…: irrational (Niven 1947)
   - e ≈ 2.71828182845904…: irrational (Euler 1737)
   - φ = (1+√5)/2 ≈ 1.61803398…: irrational (golden ratio)
   - ln(2) ≈ 0.693147…: irrational
4. **Proof that √2 is irrational** (proof by contradiction):
   Assume √2 = p/q in lowest terms (GCD(p,q)=1). Then 2 = p²/q², so p² = 2q². Thus p² is even, so p is even (p = 2k). Substituting: (2k)² = 2q², so 4k² = 2q², so q² = 2k², so q is even. But if both p and q are even, GCD(p,q) ≥ 2 — contradiction with p/q in lowest terms. Therefore √2 ∉ ℚ. ∎
5. **Operations on irrationals**: sums and products of irrationals can be rational (√2 + (−√2) = 0 ∈ ℚ; √2 × √2 = 2 ∈ ℚ) or irrational (√2 + 1, √2 × √3 = √6). Irrationals are NOT closed under + or ×.
6. **Abundance of irrationals**: Informally, ℚ is countable and ℝ is uncountable — "most" real numbers are irrational in a rigorous technical sense (ℚ has measure zero in ℝ).
7. **Number chain**: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ, where ℝ = ℚ ∪ (ℝ \ ℚ) (rationals union irrationals, disjoint).

### Cross-Link Activation
- No cross-links. P76 uses an independence probe (diagonal of a unit square — the classic concrete introduction to √2).

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — IRRATIONAL-IMPRECISE
- **Trigger**: "√2 is not an exact number — it's just an approximation like 1.414" or "irrational numbers are inexact."
- **Root cause**: Learner encounters √2 only through decimal approximations; conflates the REPRESENTATION (the truncated decimal) with the NUMBER (the precise mathematical object).
- **Error pattern**: Claims √2 ≈ 1.414 (equal, not approximately equal); believes irrational numbers have less mathematical status than rationals; refuses to write √2 as an exact answer.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — INFINITE-DECIMAL-IRRATIONAL
- **Trigger**: "Any decimal that goes on forever must be irrational" or "0.333… is irrational because it never ends."
- **Root cause**: Learner correctly identifies that irrationals have non-terminating decimals, but over-generalizes: non-terminating implies irrational (forgetting the repeating case).
- **Error pattern**: Classifies 0.333…, 1/7 = 0.142857…, or any non-terminating decimal as irrational; ignores the "non-repeating" requirement.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — IRRATIONAL-RARE
- **Trigger**: "Irrational numbers are unusual special cases; most numbers are rational" or "you only need irrationals for square roots."
- **Root cause**: In school, irrationals are introduced as exceptions (√2, π) while rationals form the default; the informal sense is that irrationals are edge cases.
- **Error pattern**: Dismisses irrationals as rare; doesn't recognize that between any two rationals lie infinitely many irrationals; thinks ℚ and ℝ are essentially the same set.
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open Concrete (unit square diagonal physically cannot be measured as a fraction) → Pictorial (number line with rational "gaps" and √2 marked) → Abstract (formal proof of irrationality, decimal characterization theorem).

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). If triggered in later TAs, route → TA-B01 → return. MC-2 and MC-3 FIFO after MC-1 cleared.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — The Hole in the Number Line: Concrete Motivation
**Primitives**: P03 → P49

**P03 (ANALOGY BRIDGE):**
- **Source domain**: A number line. ℚ fills the number line densely — between any two rationals lie more rationals. A traveler walking the number line through ℚ can get arbitrarily close to any target. Yet some positions have NO rational address.
- **Target domain**: Irrational numbers. Take the unit square with side 1. By the Pythagorean theorem, the diagonal has length √(1²+1²) = √2. This is a definite LENGTH — a real, measurable distance. But no fraction p/q (with p, q ∈ ℤ) equals √2 exactly. The number line has a definite "point" for √2, but ℚ has a hole there.
- **Bridge**: The "holes" in ℚ — positions on the number line with no rational address — are exactly the irrational numbers. ℝ is ℚ + all the holes filled in.
- **Concrete construction**: On a coordinate plane, draw a unit square. Its diagonal = √2. Mark this length on a number line starting at 0: the compass-and-straightedge construction places √2 at a definite location — and that location is not rational.

**P49:** "The diagonal of a square with side length 1 has length √2. Is √2 a rational number? How would you check?"
- **CORRECT**: √2 is irrational. To check: assume √2 = p/q in lowest terms, square both sides, show a contradiction (as in the proof sketch) → √2 ∉ ℚ. → TA-A02.
- **PARTIAL**: Prompt: "Try to find integers p, q with (p/q)² = 2. Can you? What does failure to find one suggest?" → TA-A02.
- **INCORRECT**: "√2 ≈ 1.414, but no fraction equals √2 exactly. We'll prove this formally in TA-A03." → TA-A02.
- **NO_RESPONSE**: Show the unit-square diagonal construction; note that the length is definite but no fraction captures it. → TA-A02.

---

### TA-A02 — Misconception Gate: IRRATIONAL-IMPRECISE (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "A student writes: '√2 = 1.414.' Is this equation correct? Is it exact or approximate?"
- If learner says **Correct and exact**: proceed to P64.
- If learner says **Approximate** (correctly): validate, then proceed to P64 to formalize why.

**P64 (CONCEPTUAL SHIFT):**
"The student wrote '√2 = 1.414' but the correct statement is '√2 ≈ 1.414' (approximately equal). These are fundamentally different:

- √2 is the NUMBER: the exact, unique positive real number whose square is 2. It exists precisely, defined by the equation x² = 2.
- 1.414 is a RATIONAL APPROXIMATION: 1.414 = 1414/1000 ∈ ℚ, and (1.414)² = 1.999396 ≠ 2. So 1.414 is close but NOT equal to √2.
- The decimal 1.41421356237… is also approximate — each truncated decimal is a rational number that's close to √2 but not equal.

Analogy: the number 'one-third' is exactly 1/3. Writing 0.33 is an approximation of 1/3, not the number itself. Similarly, writing 1.414 is an approximation of √2, not the number itself.

Irrational numbers are EXACT mathematical objects. Their defining property is not imprecision — it's the impossibility of a finite fraction representation."

**P49:** "Which expression is the EXACT length of the diagonal of a unit square: (A) 1.414; (B) √2; (C) 1.41421356…?"
- **CORRECT**: B — √2 is exact. A is a rational approximation; C is also a truncated decimal (still approximate). → TA-A03.
- **PARTIAL**: "C is still an approximation — every finite decimal is rational and hence ≠ √2. The exact value is √2 (the radical expression)." → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Pattern Induction: Decimal Characterization and Canonical Examples
**Primitives**: P04 → P49

**P04 (PATTERN INDUCTION):**
Decimal classification:

| Number | Decimal | Terminates? | Repeats? | Rational or Irrational? |
|---|---|---|---|---|
| 3/4 | 0.75 | ✓ Yes | — | Rational (ℚ) |
| 1/3 | 0.333… | ✗ No | ✓ Yes (period 1) | Rational (ℚ) |
| 1/7 | 0.142857142857… | ✗ No | ✓ Yes (period 6) | Rational (ℚ) |
| √2 | 1.41421356237… | ✗ No | ✗ No | Irrational (ℝ \ ℚ) |
| π | 3.14159265358… | ✗ No | ✗ No | Irrational (ℝ \ ℚ) |
| e | 2.71828182845… | ✗ No | ✗ No | Irrational (ℝ \ ℚ) |

Induced rule: A real number is IRRATIONAL iff its decimal expansion is BOTH non-terminating AND non-repeating. Terminating = rational. Non-terminating + repeating = rational. Non-terminating + non-repeating = irrational.

Proof sketch for √2 (accessible version):
"Assume √2 = p/q, lowest terms (GCD(p,q)=1). Then p² = 2q² → p² is even → p is even (p=2k). So (2k)² = 2q² → 4k² = 2q² → q² = 2k² → q is even. But both p and q even contradicts GCD(p,q)=1. Contradiction. So √2 ∉ ℚ."

Operations:
- √2 × √2 = 2 ∈ ℚ (product of two irrationals CAN be rational)
- √2 + (−√2) = 0 ∈ ℚ (sum of two irrationals CAN be rational)
- √2 + 1 ∈ ℝ \ ℚ (irrational + rational = irrational)
- 3 × √2 ∈ ℝ \ ℚ (rational × irrational = irrational, for rational ≠ 0)

**P49:** "Classify without computing the full decimal: (a) √9; (b) √3; (c) 0.101001000100001… (the digit 1 with increasing blocks of zeros — no repeating block)."
- **CORRECT**: (a) √9 = 3 ∈ ℤ ⊂ ℚ (rational — perfect square); (b) √3 is irrational (3 is not a perfect square); (c) irrational — the pattern of zeros grows without bound, so no block repeats periodically. → TA-A04.
- **PARTIAL**: Address any wrong classification. → TA-A04.
- **INCORRECT/NO_RESPONSE**: Work through each: (a) compute; (b) proof by contradiction similar to √2; (c) count zeros: 1, 2, 3, 4, … — never a fixed repeating period. → TA-A04.

---

### TA-A04 — Contrast Pair: ℚ vs. ℝ \ ℚ; Closure and Abundance
**Primitives**: P06 → P49

**P06 (CONTRAST PAIR PROMPT):**

Contrast A — Classification:
| Property | Rational ℚ | Irrational ℝ \ ℚ |
|---|---|---|
| Expressed as p/q? | ✓ Always | ✗ Never |
| Decimal | Terminates or repeats | Non-terminating, non-repeating |
| Examples | 1/2, 0.75, 0.333…, 22/7 | √2, π, e, φ, ln(2) |
| Algebraic over ℚ? | ✓ Trivially | Can be (√2 satisfies x²−2=0) or transcendental (π, e) |

Contrast B — Closure:
| Operation | ℚ closed? | ℝ \ ℚ closed? |
|---|---|---|
| Addition | ✓ p/q + r/s = (ps+qr)/qs | ✗ √2 + (−√2) = 0 ∈ ℚ |
| Multiplication | ✓ (p/q)(r/s) = pr/qs | ✗ √2 × √2 = 2 ∈ ℚ |
| Irrational + rational | — | ✓ Always irrational |
| Rational × irrational (≠0) | — | ✓ Always irrational |

Abundance: ℚ is countable (can be listed: 0, 1, −1, 1/2, −1/2, 2, −2, 1/3, …). ℝ is uncountable (Cantor's diagonal argument). Therefore ℝ \ ℚ is uncountable — in fact "much larger" than ℚ in a precise mathematical sense. Irrationals are not rare; rationals are the exceptional minority.

**P49:** "True or False: (a) ℚ is closed under addition. (b) ℝ \ ℚ is closed under addition. (c) Irrational numbers are 'most' real numbers."
- **CORRECT**: (a) TRUE — p/q + r/s = (ps+qr)/(qs) ∈ ℚ. (b) FALSE — √2 + (−√2) = 0 ∈ ℚ. (c) TRUE (in the sense of cardinality/measure: ℚ is countable, ℝ is uncountable, so ℝ \ ℚ is uncountable). → TA-A05.
- **PARTIAL**: Address the wrong item with the appropriate example. → TA-A05.
- **INCORRECT/NO_RESPONSE**: For (b): counterexample √2 + (−√2) = 0. For (c): ℚ is countable (listable), ℝ is not. → TA-A05.

---

### TA-A05 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal in this TA]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**

Q1: Classify each as rational or irrational: (a) √4; (b) √5; (c) 0.12121212… (repeating "12"); (d) π.
Q2: True or False: The product of two irrational numbers is always irrational. Give a counterexample if false.
Q3: The decimal for √7 begins 2.6457513… Does it terminate? Does it repeat? What does this tell you about √7?
Q4: A student argues: "π ≈ 22/7, so π is rational because 22/7 ∈ ℚ." Identify the error.

**P55 (SCORE):**
Q1: (a) √4 = 2 ∈ ℤ ⊂ ℚ — rational. (b) √5 is irrational (5 is not a perfect square; proof by contradiction). (c) 0.12121212… = 0.̄1̄2̄ — repeating with period 2 → rational (= 12/99 = 4/33). (d) π is irrational (proved by Niven 1947).
Q2: FALSE. Counterexample: √2 × √2 = 2 ∈ ℚ. The product of two irrationals can be rational.
Q3: It does not terminate (we can see more digits extend). The key question: does it ever repeat? No — √7 is irrational (7 is not a perfect square), so its decimal is non-terminating AND non-repeating. Conclusion: √7 is irrational.
Q4: The error is confusing approximation with equality. 22/7 ≈ 3.14286… ≠ π = 3.14159… 22/7 is a rational approximation of π — a rational number CLOSE to π but not equal. π itself is not rational. "Approximately equal" (≈) is not "equal" (=).

**P76 (TRANSFER PROBE — Independence: cross_links = []):**

**Context**: A surveyor is measuring the diagonal of a perfectly square plot of land with side length 1 km.

**(a)** Using the Pythagorean theorem, express the EXACT length of the diagonal.
**(b)** Is the diagonal length rational or irrational? Justify briefly (one sentence).
**(c)** A colleague says: "We'll just use 1.414 km — that's accurate enough for practical purposes." Is 1.414 km the exact diagonal? What is the exact value, and how does 1.414 relate to it?

**Expected answers**:
(a) d² = 1² + 1² = 2, so d = √2 km.
(b) Irrational — √2 cannot be expressed as p/q (integer over non-zero integer), as proved by contradiction; equivalently, 1.41421356… is non-terminating and non-repeating.
(c) 1.414 km is NOT the exact diagonal. 1.414 = 1414/1000 ∈ ℚ, and (1.414)² = 1.999396 ≠ 2. The exact diagonal is √2 km. 1.414 is a rational approximation — close enough for surveying practice, but mathematically distinct from √2.

**P55 (SCORE):** √2 km identified as exact; irrational classification with brief justification; distinction between exact √2 and rational approximation 1.414 stated clearly.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, P76 = **5 items**.
Pass criterion: **4/5** (⌈0.80 × 5⌉ = 4; threshold = 0.80).
- **PASS (≥ 4/5)** → P78.
- **FAIL (< 4/5)** → P74 repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 (c) or Q3 wrong (classified non-repeating decimal incorrectly) → TA-B02 (INFINITE-DECIMAL-IRRATIONAL; repeating vs. non-repeating confusion); apply MAMR.
- Q2 wrong → TA-B03 (IRRATIONAL-RARE — belief that irrationals form a "nice" closed system like ℚ).
- Q4 wrong or P76 (c) wrong → TA-B01 (IRRATIONAL-IMPRECISE; confusing approximation with exact value); apply MAMR.
- Q1 (a) or Q1 (b) wrong → TA-B02 (misclassifying perfect squares or non-perfect-squares).
- Multiple wrongs → MAMR: TA-B01 first; then FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.found.real-numbers.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 IRRATIONAL-IMPRECISE
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You wrote '√2 = 1.414.' Is this equation exact or approximate? What is (1.414)²?"

**P06 (CONTRAST PAIR PROMPT):**
| | Exact value | Decimal approximation |
|---|---|---|
| 1/3 | 1/3 (exact fraction) | 0.33 (approximate) |
| √2 | √2 (exact radical) | 1.414 (approximate) |
| π | π (exact symbol) | 3.14159 (approximate) |
| What it means | THE number, defined precisely | A nearby rational, with error |
| Symbol | = | ≈ |

**P64**: "A mathematical number is defined by its PROPERTIES, not by its decimal. √2 is defined by 'the positive number whose square is 2.' This is a perfect, exact definition. The decimal 1.41421356… is a representation that goes on forever — any truncation is a nearby rational, not √2 itself. Never write = where you mean ≈."

**P49**: "Compute: (√2)² = ? and (1.414)² = ? Are both equal to 2?"
- **CORRECT**: (√2)² = 2 exactly (by definition). (1.414)² = 1.999396 ≠ 2 (rational approximation). Only √2 satisfies x² = 2 exactly. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "√2 satisfies x²=2 by definition — that's what the radical means. 1.414 squared is 1.999396, not 2." → return.

---

### TA-B02 — Repair MC-2 INFINITE-DECIMAL-IRRATIONAL
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 INFINITE-DECIMAL-IRRATIONAL: the belief that any non-terminating decimal is irrational. This is false. The correct test requires TWO conditions: (1) non-terminating AND (2) non-repeating. Non-terminating but repeating decimals are RATIONAL."

**P06 (CONTRAST):**
| Decimal | Terminates? | Repeats? | Type |
|---|---|---|---|
| 0.75 | ✓ | — | Rational (3/4) |
| 0.333… | ✗ | ✓ (period 1) | Rational (1/3) |
| 0.142857142857… | ✗ | ✓ (period 6) | Rational (1/7) |
| 1.41421356… | ✗ | ✗ | Irrational (√2) |
| 3.14159265… | ✗ | ✗ | Irrational (π) |

Test: if you can identify a repeating block (no matter how long), the number is rational.

**P49**: "Classify: 0.31313131… (repeating '31') — rational or irrational?"
- **CORRECT**: Rational. Repeating block = '31', period 2. x = 0.313131…; 100x = 31.313131…; 99x = 31; x = 31/99 ∈ ℚ. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "A repeating block (no matter how long) = rational. 0.313131… = 31/99." → return.

---

### TA-B03 — Repair MC-3 IRRATIONAL-RARE
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 IRRATIONAL-RARE: the belief that irrationals are unusual exceptions. The opposite is true. ℚ is countable (can be listed); ℝ is uncountable (Cantor). The irrational numbers ℝ \ ℚ are uncountably infinite — in a precise measure-theoretic sense, 'almost all' real numbers are irrational. Between ANY two distinct real numbers lie infinitely many irrationals."

**P06 (CONTRAST):**
| Set | Countable? | Measure (in ℝ) | Intuitive sense |
|---|---|---|---|
| ℕ | ✓ | 0 | Discrete, sparse |
| ℤ | ✓ | 0 | Discrete, sparse |
| ℚ | ✓ | 0 | Dense, yet measure zero |
| ℝ \ ℚ (irrationals) | ✗ (uncountable) | Full (= 1 in [0,1]) | "Almost all" reals |
| ℝ | ✗ (uncountable) | Full | Full line |

Key fact: ℚ has MEASURE ZERO in ℝ — if you pick a random real number uniformly from [0,1], the probability of picking a rational is ZERO. Irrationals have probability 1.

**P49**: "Between 1.41 and 1.42 (two rationals), are there any irrational numbers?"
- **CORRECT**: Yes — infinitely many. For example: √2 ≈ 1.41421356… ∈ (1.41, 1.42). In fact, uncountably many irrationals lie in any interval between two distinct reals. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "√2 ≈ 1.414 is between 1.41 and 1.42, and it's irrational. This can be repeated for any interval — infinitely many irrationals always exist between any two distinct reals." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (classify a,b,c,d) + Q4 (π ≠ 22/7) | 2/2 |
| Day 3 | Q2 (product irrational?) + P76 (b,c) | 2/2 |
| Day 7 | Mixed 3-item: classify two decimals, prove one irrational (√5 sketch) | 2/3 |
| Day 21 | Q1, Q2, Q3, Q4 (4 items) | 3/4 |
| Day 60 | Full 5-item mastery gate | 4/5 |

**Decay**: Failure → reset to Day 1 + TA-B routing by error type.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Rational Numbers | math.found.rational-numbers | ℚ = {p/q : p,q ∈ ℤ, q≠0}; irrationals are defined as ℝ \ ℚ; decimal characterization of ℚ (terminating or repeating) is the baseline for the diagnostic test |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Real Numbers | math.found.real-numbers | ℝ = ℚ ∪ (ℝ \ ℚ); the complete ordered field; requires both ℚ and irrationals to be understood first |

### Cross-Links
- None. Concept is self-contained at this stage. P76 uses an independent real-world context (unit square diagonal).

---

## Component 8 — Teaching Notes

1. **The √2 proof is required**: Bloom=understand means learners must be able to follow and explain the proof, not merely recite that √2 is irrational. The proof-by-contradiction structure is accessible and should be presented with explicit steps.
2. **Exact vs. approximate**: This distinction (MC-1) appears repeatedly in all subsequent mathematics. Establishing it firmly here — √2 IS an exact number; 1.414 is an approximation — prevents persistent errors in calculus, linear algebra, and analysis.
3. **π and e are harder**: The proofs of π's and e's irrationality (Niven 1947, Euler 1737) are not accessible at this level. State the facts with references; the key skill is recognizing the decimal character and applying the diagnostic.
4. **Closure failure**: ℝ \ ℚ is not closed under + or ×. This is counterintuitive (ℚ and ℝ both are) and must be stated explicitly with counterexamples.
5. **Abundance**: The countability argument is important for correcting MC-3 but should be presented informally ("ℚ can be listed, ℝ cannot") without requiring formal set cardinality theory.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.found.irrational-numbers |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (developing) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.80) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (4) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.found.rational-numbers ✓ |
| V-9 | CPA_ENTRY correct (developing → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=4 ≥ 1h → max 7; used 5) | ✓ 5 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P04, A04:P06 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01 through TA-A04 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A05 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1 IRRATIONAL-IMPRECISE; P64 provides exact-vs-approximate shift |
| V-15 | GR-6: P91 terminal in TA-A05 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 independence probe (unit square diagonal) |
| V-17 | GR-8: cross_links documented | ✓ (none) — stated explicitly in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links=[] → independence probe) | ✓ P76 uses self-contained surveying context, no KG cross-link |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; Component 0 and 2; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
