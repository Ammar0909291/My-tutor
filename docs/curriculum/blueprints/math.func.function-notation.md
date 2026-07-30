# Blueprint: math.func.function-notation

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.function-notation |
| name | Function Notation |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 2 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.func.function-concept |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a function defined by a rule, the student reads and writes f(x) notation fluently — evaluating f(a) for a specific value, evaluating f(expression) by substitution, interpreting f(a)=b as "input a gives output b," distinguishing f(x) (the function value) from f (the function itself), and using notation for piecewise, composed, and named functions.

## Component 2 — CPA Entry Stage
**C — Concrete** (input-output machine diagrams; explicit substitution with numerical examples)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | f(x)-MEANS-f-TIMES-x | Student interprets f(x) as multiplication: f(x) = f × x; writes "2f(3) = 2×f×3 = 6f" or similar | Type 3 — language contamination (juxtaposition in algebra means multiplication: 2x = 2×x; students apply this to f(x)) |
| MC-2 | f(a+b)=f(a)+f(b) | Student assumes all functions are linear/additive: f(a+b)=f(a)+f(b) for any f; applies this even when f is quadratic, exponential, or absolute value | Type 1 — overgeneralization (linearity holds for f(x)=cx; students extend it to all functions) |
| MC-3 | f(a)-IS-f-APPLIED-AMBIGUOUSLY | Student confuses f(a) = "f evaluated at a" with f · (a) (multiplication) or with f − a (subtraction); makes errors like computing g(x+h)−g(x) as g·(h)−g·x | Type 3 — language contamination (same notation as multiplication is extended inconsistently across algebraic operations) |

## Component 4 — Session TA Cap
**Cap = 4** (hrs = 2 → cap 4)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Function notation — four representations:**

| Representation | Example |
|---|---|
| Arrow notation (machine) | x → f → f(x); input 3 → machine → output 9 |
| f(x) notation | f(x)=x²; f(3)=9; f(−2)=4 |
| Equation notation | y=x²; y-value when x=3 is 9 |
| Table / ordered pair | (3, 9) is on the graph ↔ f(3)=9 |

**Key reading rules:**
- f(a): f evaluated AT a. Substitute a for x in the rule.
- f(x+h): f evaluated AT (x+h). Substitute (x+h) everywhere x appears.
- f(a)=b means "input a gives output b."

**Worked evaluations with f(x)=2x²−3x+1:**

f(0)=2(0)²−3(0)+1=1.
f(2)=2(4)−3(2)+1=8−6+1=3.
f(−1)=2(1)−3(−1)+1=2+3+1=6.
f(x+1)=2(x+1)²−3(x+1)+1=2(x²+2x+1)−3x−3+1=2x²+4x+2−3x−3+1=2x²+x.
f(x+h)−f(x)=[2(x+h)²−3(x+h)+1]−[2x²−3x+1]=2(x²+2xh+h²)−3x−3h+1−2x²+3x−1=4xh+2h²−3h=h(4x+2h−3).

**P49 checkpoint:**
- CORRECT → "f(a): substitute a for x. f(x+h): substitute (x+h) for x everywhere. f(a)=b: a is the input, b is the output." → A02
- PARTIAL (evaluates at numbers, struggles with expressions) → "For f(x)=x²−1, compute f(x+h) by replacing every x with (x+h). Don't simplify yet." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "If f(x)=3x+2, what is f(5)? Now compute f(5) again by substituting 5 for x in 3x+2." → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**f(a+b)≠f(a)+f(b) in general — gate:**

Counter-example: f(x)=x². f(3+4)=f(7)=49. f(3)+f(4)=9+16=25. 49≠25.

**Gate question (MC-2):** "Is f(2x)=2f(x) for f(x)=x²?"

f(2x)=(2x)²=4x². 2f(x)=2x². 4x²≠2x² for x≠0. So NO.

The identity f(ca)=cf(a) holds ONLY for LINEAR functions f(x)=kx (not even all linear functions — only those through the origin). For quadratic, exponential, absolute value, etc., this fails.

**Notation contrast table:**
| Expression | Meaning | NOT |
|---|---|---|
| f(x) | function evaluated at x | f times x |
| f(a+b) | function evaluated at the sum a+b | f(a)+f(b) in general |
| f(2x) | function evaluated at 2x | 2f(x) in general |
| f⁻¹(x) | inverse function at x | 1/f(x) |
| [f(x)]² | square of the output | f(x²) |

**P49 checkpoint:**
- CORRECT → "f(a+b)≠f(a)+f(b) unless f is linear. f(ca)≠cf(a) unless f is linear. f(x) is not f times x — it is f evaluated at x. Each evaluation requires full substitution." → Gate (P91)
- PARTIAL (knows it's not multiplication, still confused about f(a+b)) → "Compute f(1+2) and f(1)+f(2) for f(x)=x². Are they equal? Why not?" → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "For g(x)=|x|, compute g(3+4) and g(3)+g(4). Are they equal?" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 f(x)-MEANS-f-TIMES-x):**
Step 1 — "In algebra, 2x means 2 times x. But f(x) is different notation entirely: f is the NAME of the function, and (x) is the INPUT written in parentheses. There is no multiplication happening." Step 2 — Analogy: cos(x) means cosine evaluated at x, not cos times x. Similarly, f(x) means f evaluated at x. Step 3 — "Whenever you see f(something), substitute the something in for x in the rule. For f(x)=x²+1: f(3)=3²+1=10. Replace x with 3."

**TB-R02 (MC-2 f(a+b)=f(a)+f(b)):**
Step 1 — "This equality is called LINEARITY. It holds for functions f(x)=cx (lines through origin). For any other function, plugging in a+b is different from evaluating at a and b separately." Step 2 — Visual: the graph of f(x)=x² is curved. On a curve, f(a+b)≠f(a)+f(b) because the curve doesn't 'add up' the way a line does. Step 3 — "Always expand f(a+b) by substituting a+b for x in the full rule. Never split across the addition without checking linearity first."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. For f(x)=x²−2x+3: compute f(0), f(−2), f(a), f(x+1), and f(x+h)−f(x).
2. For g(x)=|2x−1|: compute g(0), g(½), g(−1). Is g(a+b)=g(a)+g(b)? Verify with a=1,b=2.
3. Given h(3)=7 and h(5)=−1, and knowing h is linear (h(x)=mx+b), find h(x). Then compute h(8).
4. Express "the output of f when the input is increased by 1" in function notation. Simplify for f(x)=3x−5.

**P55 — Reflect & Consolidate:** "f(a): evaluate at a by substituting. f(a+b): substitute the whole expression a+b — never split. f(a)=b: a is the input, b is the output. f is the function; f(x) is its value at x."

**P76 — Transfer Probe (Independence mode):**
The difference quotient: for f(x)=x², compute [f(x+h)−f(x)]/h and simplify. Show that as h→0, this approaches 2x. This is the derivative of f(x)=x² at x. Now compute the difference quotient for g(x)=x³ and simplify for general h, then identify what it approaches as h→0. This is the derivative of x³.

**P55 — Reflect & Consolidate:** "The difference quotient [f(x+h)−f(x)]/h is the foundation of differential calculus — it measures the average rate of change. Computing it requires correct function notation: substitute (x+h) fully into f's rule before simplifying."

**P75 — Mastery Assessment:**
"f(x)=2x²+x−3. (a) Compute f(2), f(−1), f(a−1). (b) Compute f(x+h)−f(x) and divide by h. Simplify. (c) Let g(x)=f(2x)−f(x). Simplify g(x). Is g(x)=f(x)? Explain. (d) Compute g(0) two ways: directly and using your simplified expression."

**P55 — Reflect & Consolidate:** "Function notation is a substitution rule, not multiplication. Every evaluation requires full substitution of the argument into the rule. The difference quotient [f(x+h)−f(x)]/h requires two separate full substitutions before subtraction."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.function-notation complete
- Score 3/5 → REVIEW substitution into expressions and the f(a+b)≠f(a)+f(b) non-linearity; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.function-concept; reassign

**P78 — Completion:** Function notation certified. Student reads and writes f(x) as substitution, evaluates at numbers and expressions, computes difference quotients, and correctly interprets f(a)=b.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Difference quotient [f(x+h)−f(x)]/h as limit as h→0; correct full substitution required
Skill tested: Evaluate f at a compound expression; simplify ratio; recognise the derivative as the h→0 limit

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
