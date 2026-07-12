# TEACHING BLUEPRINT — math.func.real-valued-function

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.func.real-valued-function |
| concept_name | Real-Valued Function |
| domain | functions |
| difficulty | proficient |
| bloom | understand |
| estimated_hours | 2 |
| mastery_threshold | 0.85 |
| CPA_ENTRY | P |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.85 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.func.function-concept, math.found.real-numbers]
**unlocks:** [math.calc.limits]
**cross_links:** [math.calc.limits] — Tier 1 concept → P76 cross-link probe

---

## Component 1 — Cognitive Map

**Core concept:** A real-valued function is a function f: D → ℝ whose domain D is a subset of ℝ and whose output is always a real number. The natural domain is the largest subset of ℝ for which the formula is defined (excluding division by zero, square roots of negatives, logarithms of non-positives). Real-valued functions on ℝ are the primary objects of calculus.

**Knowledge prerequisites activated:**
- math.func.function-concept: a function assigns exactly one output to each input; domain, codomain, and range
- math.found.real-numbers: the real line ℝ; intervals; natural domain constraints arise from the structure of ℝ

**Concept structure:**
1. **Definition**: f: D ⊆ ℝ → ℝ; both inputs and outputs are real numbers
2. **Natural domain**: the largest D ⊆ ℝ for which f(x) is a well-defined real number; found by excluding points where the formula fails
3. **Common domain restrictions**: x ≠ 0 in denominators; x ≥ 0 under even-index roots; x > 0 for logarithms
4. **Range vs. domain**: domain = set of valid inputs; range = set of actual outputs; these are different sets
5. **Single-output rule**: for every x ∈ D, there is exactly one f(x) ∈ ℝ; ±√x is not a function

**Target understanding:** The learner determines the natural domain of a given real-valued formula, distinguishes domain from range, and recognises that the single-output rule is a necessary property (not just a convention).

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | DOMAIN-RANGE-CONFUSED | Asked for domain and range separately | Swaps them: says "the range is the set of x-values" or "the domain is what f outputs"; reverses input and output roles | B01 |
| MC-2 | DOMAIN-IS-ALWAYS-ALL-REALS | Shown f(x)=1/(x−2) or f(x)=√(x−3), asked for domain | States "domain = ℝ" without checking where the formula is undefined; does not identify division-by-zero or square-root-of-negative restrictions | B02 |
| MC-3 | MULTI-VALUED-IS-A-FUNCTION | Told that ±√x gives two values for positive x; asked if ±√x is a function | Agrees that ±√x is a function because "it comes from the same formula x"; does not apply the single-output rule | B03 |

**FOUNDATIONAL MC:** MC-1 (DOMAIN-RANGE-CONFUSED) — confusing which set is input and which is output invalidates every statement about domain restrictions and range computation.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** P — Pictorial
"Input-output machine" diagram: a function is a box; real numbers feed in from the left (domain); real numbers emerge on the right (range). The box accepts only numbers from its domain; it always produces exactly one output number.

**Progression Gate (P → A):** Learner correctly identifies which real numbers a given formula accepts (domain) and how the domain restriction is determined by the formula's structure.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Domain, Range, and the Single-Output Rule (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

| Feature | Not a real-valued function | Real-valued function |
|---|---|---|
| Example | ±√x (for x > 0, gives +√x AND −√x) | √x (principal root; for x ≥ 0, gives exactly one output) |
| Single-output rule | FAILS — two outputs for same input | PASSES — one output per input |
| Domain condition | Would need x > 0 for two outputs | x ≥ 0 (x = 0 gives √0 = 0; valid) |
| Example | g: ℝ → ℝ, g(x) = x² (many inputs share output 4) | Valid function — different inputs may share outputs; the rule is one output per input, not the reverse |
| Domain vs. Range | Domain: inputs the function accepts | Range: outputs the function actually produces |

Domain vs. Range for f(x) = x²:
```
Domain: all real numbers ℝ  (any real number can be squared)
Range:  [0, ∞)              (x² ≥ 0 for all real x; outputs are non-negative)
Domain ≠ Range
```

**P49 ADAPTIVE CHECKPOINT**
Q: "For f(x) = x², is x = −3 in the domain? What is f(−3)? Is −9 in the range?"
→ CORRECT [x = −3 is in the domain; f(−3) = 9; −9 is NOT in the range — x² ≥ 0]: "Correct — x² is always non-negative." → TA-A02
→ INCORRECT [swaps: says −3 is the output]: Flag MC-1. Route → B01.
→ INCORRECT [says −9 is in the range]: Flag MC-3 borderline. "Can any real number squared give a negative result?" → guided.

---

### TA-A02 — Natural Domain Determination (GR-1: P11 | GR-2: P49)

**P11 REPRESENTATION SHIFT**

Three representations of the same function f(x) = 1/(x−2):

| Representation | Form | Domain constraint |
|---|---|---|
| Formula | f(x) = 1/(x−2) | x ≠ 2 (denominator = 0 when x = 2) |
| Number line | ℝ with x = 2 excluded: ←——●——→ (hole at 2) | Domain = (−∞, 2) ∪ (2, ∞) |
| Table | f(0)=−½; f(1)=−1; f(3)=1; f(2)=undefined | x = 2 is not in the table |

Natural domain determination procedure:
```
Step 1: Identify formula operations that can fail on ℝ.
  - Denominator = 0         → exclude those x
  - Even root of negative   → exclude x where radicand < 0
  - Logarithm of ≤ 0        → exclude x where argument ≤ 0

Step 2: Natural domain = ℝ minus excluded values.

Examples:
  f(x) = √(x − 3):    need x − 3 ≥ 0 → x ≥ 3  → domain [3, ∞)
  g(x) = 1/√(x − 1): need x − 1 > 0 → x > 1  → domain (1, ∞)
  h(x) = x²:          no restrictions          → domain ℝ
```

**P49 ADAPTIVE CHECKPOINT**
Q: "State the natural domain of f(x) = 1/(x−2) and g(x) = √(x−3)."
→ CORRECT [f: ℝ\{2} or (−∞,2)∪(2,∞); g: [3,∞) or x ≥ 3]: "Correct." → TA-A03
→ INCORRECT [f domain = ℝ or g domain = ℝ]: Flag MC-2. Route → B02.
→ NO_RESPONSE: "For f: what x makes the denominator zero? For g: what x makes the radicand negative?" → guided.

---

### TA-A03 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **State the natural domain of f(x) = √(x − 3).**
   *(Expected: x ≥ 3, or [3,∞); x − 3 must be non-negative for the square root to be real)*

2. **Is ±√x (giving both positive and negative square roots for x > 0) a real-valued function from ℝ to ℝ? Explain.**
   *(Expected: No — for x = 4, it gives both +2 and −2; this violates the single-output rule: a function must assign exactly one output per input)*

3. **True/False:** The range of f(x) = x² with domain ℝ is all of ℝ.
   *(Expected: FALSE — the range is [0, ∞) because x² ≥ 0 for all real x; negative numbers are not in the range)*

4. **State the natural domain of h(x) = 1/√(x − 1).**
   *(Expected: x > 1, or (1,∞); x − 1 must be strictly positive (not zero, since it is also in a denominator))*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: cross-link to math.calc.limits — Tier 1 concept)

*Bridge to limits:*

"Consider the function f(x) = (x² − 1)/(x − 1).

(a) State the natural domain of f.
(b) Evaluate f(x) at x = 0.9, x = 0.99, x = 0.999. What value does f(x) appear to approach as x → 1?
(c) Note that x² − 1 = (x−1)(x+1). Simplify f(x) for x ≠ 1. What does this tell you about the value that f approaches as x → 1 even though f(1) is undefined?"

*(Expected:
(a) Domain = ℝ \ {1}; x = 1 makes denominator 0
(b) f(0.9) = (0.81−1)/(0.9−1) = (−0.19)/(−0.1) = 1.9; f(0.99) ≈ 1.99; f(0.999) ≈ 1.999 → approaching 2
(c) f(x) = (x−1)(x+1)/(x−1) = x+1 for x ≠ 1; as x → 1, x+1 → 2; lim_{x→1} f(x) = 2 even though f(1) is undefined)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.85; ⌈0.85×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 DOMAIN-RANGE-CONFUSED first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now state the natural domain of a real-valued function by identifying formula restrictions, distinguish domain from range, and apply the single-output rule to test whether a given correspondence is a function. These skills are the entry point for limits, continuity, and all of calculus."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: DOMAIN-RANGE-CONFUSED (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Domain and range are the input set and output set of a function respectively — they are not interchangeable. The domain is what goes IN; the range is what comes OUT. For f(x) = x², the numbers 3 and −3 are in the domain (valid inputs); the number 9 = f(3) = f(−3) is in the range (an actual output). The number −9 is in neither."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "For f(x) = x + 1, is 5 in the domain? What is the range if the domain is {1, 2, 3}?"
→ "Yes (5 is a valid input); range = {2, 3, 4}": MC-1 not active. Exit B01 → next flagged MC or TA-A03.
→ Says range = {1,2,3} or domain = {2,3,4}: MC-1 confirmed. Continue B01.

**P64 CONCEPTUAL SHIFT**
"Use the input/output machine model:

```
Domain (inputs) → [  f  ] → Range (outputs)

f(x) = x²:
  Input 3  → [x²] → Output 9      (3 is in the domain; 9 is in the range)
  Input −3 → [x²] → Output 9      (−3 is in the domain; 9 is STILL the only output for both)
  
Domain = {all valid inputs} = ℝ
Range  = {all actual outputs} = [0, ∞)

Domain ≠ Range for this function.
```

Rule: domain is always about the x-axis (horizontal); range is always about the y-axis (vertical / output)."

**P49 ADAPTIVE CHECKPOINT**
Q: "For f(x) = x − 4 with domain ℝ: (a) What does f(10) equal? (b) Is 10 in the domain or range? Is 6 in the domain or range?"
→ CORRECT [(a) 6; (b) 10 is in the domain (it's an input); 6 is in the range (it's the output f(10))]: "Correct." Exit B01 → B02 if flagged, else TA-A03.
→ INCORRECT: "Which number is plugged in? Which number comes out? The plugged-in number belongs to the domain." → guided.

---

### TA-B02 — Repair: DOMAIN-IS-ALWAYS-ALL-REALS (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Not every real number is a valid input for every formula. Some values cause division by zero (result is undefined) or square roots of negative numbers (not a real number). These values must be excluded from the domain. The natural domain is the largest subset of ℝ where the formula produces a real-number output."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "What is the natural domain of f(x) = 1/(x − 2)?"
→ "ℝ \ {2}" or "all real numbers except 2": MC-2 not active. Exit B02 → B03 if flagged, else TA-A03.
→ "ℝ" or "all real numbers": MC-2 confirmed. Continue B02.

**P64 CONCEPTUAL SHIFT**
"Test every operation in the formula for failure points:

```
f(x) = 1/(x − 2)

Denominator: x − 2. When is it zero? When x = 2.
Division by zero is undefined → x = 2 must be excluded.
Natural domain: ℝ \ {2} = (−∞, 2) ∪ (2, ∞)

g(x) = √(x − 3)

Radicand: x − 3. When is it negative? When x < 3.
Square root of negative is not real → x < 3 must be excluded.
Natural domain: {x ∈ ℝ : x − 3 ≥ 0} = [3, ∞)
```

The domain is all of ℝ ONLY if no operation ever fails — e.g., f(x) = x² + 1 has no restrictions."

**P49 ADAPTIVE CHECKPOINT**
Q: "State the natural domain of f(x) = √(4 − x)."
→ CORRECT [x ≤ 4, or (−∞, 4]]: "Correct — 4 − x ≥ 0 requires x ≤ 4." Exit B02 → B03 if flagged, else TA-A03.
→ INCORRECT [domain = ℝ]: "Set the radicand 4 − x ≥ 0 and solve for x." → guided.

---

### TA-B03 — Repair: MULTI-VALUED-IS-A-FUNCTION (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A function must assign EXACTLY ONE output to each input. If any single input maps to two or more different outputs, it is not a function. ±√x gives +√x AND −√x for any x > 0 — two outputs for one input — which violates the function rule."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Is the rule 'x maps to ±√x' a real-valued function from (0,∞) to ℝ?"
→ "No — for any x > 0 it gives two values, violating the single-output rule": MC-3 not active. Exit B03 → TA-A03.
→ "Yes — ±√x comes from a single formula": MC-3 confirmed. Continue B03.

**P64 CONCEPTUAL SHIFT**
"A function is a RULE, not a formula — and the rule must satisfy: one input → exactly one output.

```
Test: is 'x maps to ±√x' a function?

Input x = 4:
  ±√4 = +2  AND  −2   ← two different outputs from input 4

Verdict: NOT a function. Two outputs for one input fails the single-output rule.

Compare: f(x) = √x (principal, non-negative square root):
  Input x = 4: f(4) = +2 only   ← exactly one output

Verdict: f(x) = √x IS a function.
```

The graphical test: the vertical line test. If any vertical line x = c crosses the graph more than once, the correspondence is not a function. The graph of ±√x forms a full circle-style curve crossed by vertical lines twice."

**P49 ADAPTIVE CHECKPOINT**
Q: "Is g(x) = x² a function from ℝ to ℝ? Does g have the same output for x = 3 and x = −3? Does this violate the function rule?"
→ CORRECT [Yes, g is a function; g(3) = g(−3) = 9; same output for two different inputs does NOT violate the rule — the rule only prevents one input giving two outputs, not two inputs giving the same output]: "Correct — functions can be many-to-one, but not one-to-many." Exit B03 → TA-A03.
→ INCORRECT [says g is not a function because g(3)=g(−3)]: "The rule says: each input has exactly one output. Does x=3 give more than one output? Does x=−3 give more than one output?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Natural domain of rational and root functions | "Domain of f(x) = 1/(x²−4)?" (ℝ \ {−2,2}) |
| Day 3 | Range vs. domain | "f(x) = |x|: domain? range?" (ℝ; [0,∞)) |
| Day 7 | Single-output rule applied to implicitly defined curves | "Is x² + y² = 1 a function y of x? Why or why not?" (No — fails vertical line test; two y for most x) |
| Day 30 | Transfer to limit setup | "Why does lim_{x→0} 1/x require x ≠ 0 in the domain?" (domain of 1/x excludes 0; limit asks about behavior as x approaches 0, not at x=0) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.func.function-concept (required): single-output rule; domain, codomain, range definitions for general functions
- math.found.real-numbers (required): ℝ as the domain and codomain; real-line structure determines natural domain constraints (square roots, denominators)

**Enables:**
- math.calc.limits (directly): limits study the behavior of a real-valued function near a point; the domain must exclude that point for the limit to be non-trivial (as shown in the P76 probe)

**Cross-links (GR-8):**
- math.calc.limits (Tier 1): P76 cross-link probe shows that the natural domain excludes the limit point x = 1 for f(x) = (x²−1)/(x−1), and the behavior as x → 1 is the prototype limit question

---

## Component 8 — Teaching Notes

1. **h=2 lean structure:** Real-valued function adds domain-restriction reasoning and single-output testing to existing function-concept knowledge; 2 main TAs + gate is sufficient.

2. **CPA_ENTRY = P for proficient difficulty:** Learners already know the general function concept and the real number system; the pictorial input-output machine model is the appropriate entry-level representation.

3. **P76 cross-link design:** The f(x) = (x²−1)/(x−1) probe is the canonical introductory limit example. The learner applies natural-domain analysis (step a) before observing limit behavior numerically (step b) and algebraically (step c). The P76 is achievable using only real-valued function knowledge plus arithmetic; no prior calculus is required.

4. **Range vs. domain for common functions:** The Teaching Notes call out the f(x)=x² example because proficient learners frequently confuse domain ℝ with range ℝ, not realising that the set of actual outputs is smaller. The contrast pair in TA-A01 addresses this directly.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.func.function-concept ✓, math.found.real-numbers ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | N/A — difficulty is proficient; CPA_ENTRY = P (pictorial entry appropriate for proficient learners) |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P06) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A03 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A03 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A03 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 | PASS |
| V-11 | GR-9: cross_links=[math.calc.limits] Tier 1 → P76 cross-link probe | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.85×5⌉ = 5/5 | PASS |
| V-14 | bloom=understand → P07 not required; P06, P11 used | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is cross-link probe bridging to math.calc.limits | PASS |
| V-18 | MC-1 DOMAIN-RANGE-CONFUSED designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
