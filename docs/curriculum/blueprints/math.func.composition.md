# Teaching Blueprint: math.func.composition
**Blueprint Specification Version:** 1.0
**Status:** PACKAGE_READY
**Last Validated:** 2026-07-12

---

## Component 0 — Metadata

```yaml
concept_id: math.func.composition
concept_name: Function Composition
domain: functions
difficulty: proficient
bloom_level: apply
mastery_threshold: 0.80
estimated_hours: 5
prerequisites:
  - math.func.function-concept
unlocks:
  - math.calc.chain-rule
cross_links:
  - math.calc.chain-rule
cpa_entry_stage: C
session_ta_cap: 7
mamr_policy: MC-1 FOUNDATIONAL cleared first; MC-2 and MC-3 FIFO after
pass_criterion: "⌈0.80 × 5⌉ = 4 out of 5 (4 P77 items + 1 P76 item)"
```

---

## Component 1 — Cognitive Map

### Core Insight
Function composition feeds the output of one function into the input of another. The order is right-to-left: in (f∘g)(x) = f(g(x)), g acts first. Getting this order wrong is the single most common composition error.

### Conceptual Hierarchy
```
Level 0 (Concrete): Assembly-line analogy: station g processes raw material first,
                    station f processes the output. Swap order → different product.
Level 1 (Pictorial): Arrow diagrams showing g: A→B and f: B→C composing to f∘g: A→C.
Level 2 (Abstract): (f∘g)(x) = f(g(x)); domain restriction; non-commutativity.
Level 3 (Transfer): Decomposing h(x)=(2x+1)³ into f(g(x)); inner/outer structure for chain rule.
```

### Core Formulas
```
Definition:  (f∘g)(x) = f(g(x))    [apply g first, then f]
Domain:      dom(f∘g) = {x ∈ dom(g) : g(x) ∈ dom(f)}
Notation:    f∘g  means  "f after g"  (right-to-left reading)

Key properties:
  Non-commutativity: f∘g ≠ g∘f in general
  Associativity:     (f∘g)∘h = f∘(g∘h)  (always)
  Identity:          f∘id = id∘f = f

Decomposition pattern (for chain-rule readiness):
  h(x) = (outer function) of (inner function)
  outer = f, inner = g → h = f∘g
```

### Skill Execution Steps (bloom=apply)
```
Step 1: Identify which function is inner (g) and which is outer (f).
Step 2: Evaluate g(x) — this is the input to f.
Step 3: Substitute g(x) wherever the variable appears in f.
Step 4: Simplify.
Step 5 (domain check): Confirm g(x) lies in dom(f) for each x.
```

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL]: COMPOSITION-REVERSED
**Belief:** (f∘g)(x) = g(f(x)) — student applies f first, then g.
**Origin:** Reading f∘g left-to-right: "f, then g." The ∘ symbol feels like multiplication (left-to-right).
**Trigger:** Asked to compute (f∘g)(2) with f(x)=x² and g(x)=x+3; student gets (2+3)²=25 instead of (2²+3)=7. Wait — correct is f(g(2))=f(5)=25 and g(f(2))=g(4)=7. Student confuses which is which.
**Clarification:** (f∘g)(x)=f(g(x)): g acts first. So (f∘g)(2)=f(g(2))=f(5)=25. (g∘f)(2)=g(f(2))=g(4)=7. The issue is the student may compute (f∘g) as g(f(x)).
**Repair:** Emphasise "f∘g means f AFTER g; g goes first." Use assembly-line analogy.
**Priority:** FOUNDATIONAL — must clear before any computation practice.

### MC-2: DOMAIN-IGNORED
**Belief:** The domain of f∘g is just dom(g), ignoring the constraint that g(x) must lie in dom(f).
**Origin:** Students focus on substitution mechanics without checking the intermediate output.
**Trigger:** f(x)=√x (requires x≥0), g(x)=x−4; student says dom(f∘g)=ℝ instead of [4,∞).
**Repair:** Two-stage domain check: (1) x must be in dom(g); (2) g(x) must be in dom(f). Both required.

### MC-3: COMPOSITION-COMMUTATIVE
**Belief:** f∘g = g∘f always, so the order of composition doesn't matter.
**Origin:** Multiplication is commutative; student extends this to function composition.
**Trigger:** Presented with f(x)=x+1 and g(x)=2x; computes f∘g = 2x+1 but claims g∘f = 2x+1 too, missing that g∘f = 2(x+1) = 2x+2.
**Repair:** Concrete counter-example with different results. Stress that composition order is always significant unless a specific pair happens to commute.

---

## Component 3 — Scaffolding Protocol

### Entry Diagnostic (P41 gate)
```
P41 — MISCONCEPTION DETECTOR
Prompt: "Let f(x) = 2x and g(x) = x + 5.
Compute (f∘g)(3) and (g∘f)(3). Are they equal?"

CORRECT ((f∘g)(3)=f(8)=16; (g∘f)(3)=g(6)=11; not equal):
→ No MC-1 detected → proceed to TA-A01 standard opening.

INCORRECT ((f∘g)(3)=g(f(3))=g(6)=11 — applied g∘f instead of f∘g):
→ MC-1 FOUNDATIONAL active → P64 CONCEPTUAL SHIFT
→ Activate Protocol B (MC-1 Repair Chain)

INCORRECT ((f∘g)(3)=(g∘f)(3) — claims they're equal):
→ MC-3 active; flag for repair after MC-1 check.
```

### Prerequisite Bridge
Student completed math.func.function-concept. Composition extends the function-as-mapping idea: instead of one mapping, two mappings are chained. The codomain of g becomes (part of) the domain of f.

### MAMR Enforcement
MC-1 is FOUNDATIONAL. If active, clear completely before engaging MC-2 or MC-3 content. MC-2 and MC-3 addressed FIFO once MC-1 cleared.

### CPA Progression: C → P → A
- **Concrete (C):** Specific numbers through two specific functions; verify by substitution.
- **Pictorial (P):** Arrow diagram A→B→C; domain restriction diagram.
- **Abstract (A):** Symbolic definition (f∘g)(x)=f(g(x)); formal domain formula; decomposition for chain rule.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01: Concrete Foundation — Order Matters

**Opening (GR-1: B-category primitive)**
```
P03 — ANALOGY BRIDGE
Source domain: Two-stage assembly line
Target domain: Function composition

"Imagine a factory with two processing stations:
  Station G (first): takes raw plastic pellets, melts and moulds them into tubes.
  Station F (second): takes tubes, cuts them to length and labels them.

The finished pipe is the result of Station G THEN Station F.
If you run Station F before Station G (labels before tubes exist), it fails.

In function composition: (f∘g)(x) means 'apply g first, feed result to f.'
Read the symbol ∘ as AFTER: f∘g = 'f AFTER g.'"
```

**Concrete Computation**
```
P06 — CONTRAST PAIR
Given: f(x) = x², g(x) = x + 3

Left: (f∘g)(x) = f(g(x))          Right: (g∘f)(x) = g(f(x))
Step 1: g(x) = x+3  ← g goes FIRST  Step 1: f(x) = x²  ← f goes FIRST
Step 2: f(g(x)) = f(x+3) = (x+3)²  Step 2: g(f(x)) = g(x²) = x²+3

At x=2: f(g(2)) = f(5) = 25         At x=2: g(f(2)) = g(4) = 7
                     ≠
Conclusion: f∘g ≠ g∘f in general.
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Let f(x) = 3x and g(x) = x − 1.
Compute (f∘g)(4) showing every step."

CORRECT (g(4)=3, f(3)=9; shows 'g first then f'):
→ Affirm: "Exact. g acts on 4 first: 4−1=3. Then f acts on 3: 3×3=9.
  The notation f∘g tells you: g is the inner function, f is the outer."
→ Advance to TA-A02.

PARTIAL (gets 9 but skips intermediate step):
→ "Correct answer. Now write both steps explicitly:
  Step 1 — g(4)=? Step 2 — f(your answer)=?"
→ Re-attempt; advance.

INCORRECT (gets g(f(4))=g(12)=11 — reversed order):
→ MC-1 active. P27: "This is a very common reversal called COMPOSITION-REVERSED.
  f∘g does NOT mean f first. It means f AFTER g — g runs first.
  Reread the factory analogy: which station runs first?"
→ Recompute together: g(4)=3, f(3)=9. Activate B-1 repair before continuing.

NO_RESPONSE:
→ "Start with the inner function g. What is g(4)?"
→ Step through; advance.
```

---

### TA-A02: Skill Execution — Computing and Decomposing Compositions

**Opening (GR-1: B-category primitive)**
```
P07 — WORKED EXAMPLE PAIR
[bloom=apply: model the skill of computing compositions step-by-step]

EXAMPLE 1 — Computing a composition formula:
Given: f(x) = √x  (dom f: x≥0),  g(x) = x² + 1.
Find (f∘g)(x) and state its domain.

Step 1 — Identify inner: g(x) = x²+1.
Step 2 — Substitute into f: f(g(x)) = √(x²+1).
Step 3 — Simplify: (f∘g)(x) = √(x²+1).
Step 4 — Domain check:
  (a) x must be in dom(g) = ℝ. ✓ always.
  (b) g(x) = x²+1 ≥ 1 > 0, so g(x) is always in dom(f). ✓
  dom(f∘g) = ℝ.

EXAMPLE 2 — Decomposing a composite into f and g:
Given: h(x) = (3x−2)⁴.
Find f and g such that h = f∘g (h(x) = f(g(x))).

Step 1 — Identify the outermost operation: raising to the 4th power.
  → Outer function: f(u) = u⁴.
Step 2 — The inner expression is what gets raised to 4th power: 3x−2.
  → Inner function: g(x) = 3x−2.
Step 3 — Verify: f(g(x)) = f(3x−2) = (3x−2)⁴ = h(x). ✓

Decomposition is the skill chain-rule will require: always find 'what is inside.'
```

**Domain Focus — MC-2 Direct Address**
```
P11 — REPRESENTATION SHIFT (formula → arrow diagram)
"Draw the domain restriction as a pipeline:

  dom(g) ──g──▶ range(g) ──f──▶ range(f)
  
For f∘g to be defined at x:
  (1) x must enter dom(g)  [x ∈ dom(g)]
  (2) g(x) must enter dom(f)  [g(x) ∈ dom(f)]
Both gates must open.

Example: f(x)=√x, g(x)=x−4.
  Gate 1: x ∈ dom(g) = ℝ.   [always open]
  Gate 2: g(x)=x−4 ≥ 0 → x ≥ 4.  [open only when x≥4]
  dom(f∘g) = [4, ∞)."
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Let f(x) = 1/x  (dom f: x≠0) and g(x) = x²−4.
(a) Compute (f∘g)(x).
(b) State dom(f∘g)."

CORRECT ((f∘g)(x) = 1/(x²−4); dom = ℝ\{−2, 2}):
→ Affirm: "Perfect. Gate 1: dom(g)=ℝ. Gate 2: g(x)=x²−4≠0 → x≠±2.
  The domain excludes exactly the two points where the denominator is zero."
→ Advance to TA-A03.

PARTIAL (correct formula, wrong domain — says ℝ or misses one of ±2):
→ "Formula is right. For the domain, ask: when does g(x) fall outside dom(f)?
  When is x²−4 = 0? Solve that."
→ Re-attempt domain; advance.

INCORRECT (domain check skipped entirely — says dom = ℝ):
→ MC-2 active. P27: "DOMAIN-IGNORED. Two conditions must both hold.
  Condition 2: g(x) must land inside dom(f)=ℝ\{0}. When is x²−4=0?"
→ Return to arrow-diagram; re-attempt.

NO_RESPONSE:
→ "First compute f(g(x)) by substituting g(x) into f(x)=1/x.
  Then ask: for which x-values is f(g(x)) undefined?"
→ Step through.
```

---

### TA-A03: Non-Commutativity and Decomposition Practice

**Opening (GR-1: B-category primitive)**
```
P04 — PATTERN INDUCTION
"Let's compute f∘g AND g∘f for three pairs and observe the pattern.

Pair 1: f(x)=x+1, g(x)=2x.
  (f∘g)(x)=f(2x)=2x+1.  (g∘f)(x)=g(x+1)=2(x+1)=2x+2.  DIFFERENT.

Pair 2: f(x)=x², g(x)=x+3.
  (f∘g)(x)=(x+3)².  (g∘f)(x)=x²+3.  DIFFERENT.

Pair 3: f(x)=2x, g(x)=3x.
  (f∘g)(x)=f(3x)=6x.  (g∘f)(x)=g(2x)=6x.  SAME!

Pattern: f∘g = g∘f is a coincidence, not a rule.
Special cases (like two linear functions through origin) may commute.
General assumption: ORDER MATTERS."
```

**MC-3 Direct Address**
```
P27 — MISCONCEPTION NAMING
"COMPOSITION-COMMUTATIVE: assuming f∘g always equals g∘f.
Pair 1 above disproves it: 2x+1 ≠ 2x+2.
Commutativity is a property of multiplication of numbers — not of function composition.
Pair 3 shows that specific pairs CAN commute, but this is the exception, never the rule."
```

**Abstract Layer: Decomposition Skill**
```
P11 — REPRESENTATION SHIFT (composite expression → f/g decomposition)
"Every composite function h can be described as h = f∘g where:
  g = the inner function (applied first, inside the expression)
  f = the outer function (applied second, the overall 'shape')

Strategy: look for the outermost operation.
  h(x) = sin(x²)  → outer: sin, inner: x²  → f(u)=sin(u), g(x)=x²
  h(x) = (ln x)³  → outer: cube, inner: ln  → f(u)=u³, g(x)=ln x
  h(x) = e^(2x+1) → outer: exp, inner: 2x+1 → f(u)=eᵘ, g(x)=2x+1"
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Let f(x) = x³ and g(x) = x+2.
(a) Show that f∘g ≠ g∘f by computing both at x=1.
(b) Decompose h(x) = √(5x−3) into an outer function f and inner function g."

CORRECT ((f∘g)(1)=(3)³=27; (g∘f)(1)=(1)³+2=3; f(u)=√u, g(x)=5x−3):
→ Affirm: "Perfect. 27≠3 confirms non-commutativity. Decomposition:
  inner 5x−3 runs first; outer √ operates on the result."
→ Advance to TA-A04 (mastery gate).

PARTIAL (non-commutativity correct but decomposition reversed — f=5x−3, g=√u):
→ "Check your decomposition: f(g(x)) means g runs first.
  If g(x)=√x and f(x)=5x−3, what is f(g(1))? Compare to h(1)=√(5−3)=√2."
→ Correct and advance.

INCORRECT (claims f∘g = g∘f from part (a)):
→ MC-3 active. P64: "CONCEPTUAL SHIFT: Let's read the numbers carefully.
  (f∘g)(1) = f(g(1)) = f(3) = 27. (g∘f)(1) = g(f(1)) = g(1) = 3.
  27 ≠ 3. They are different. Commutativity failed."
→ Re-examine pair; advance.

NO_RESPONSE:
→ "Start with (f∘g)(1): compute g(1) first. What is 1+2?"
→ Step through both computations; then proceed to decomposition.
```

---

### TA-A04: Mastery Gate (P91 Terminal)

```
P77 — MULTI-PROBLEM SET (4 problems)

Problem 1:
"Let f(x) = x² + 1 and g(x) = 2x − 3.
Compute (f∘g)(x) and (g∘f)(x). Are they equal?"

Problem 2:
"Let f(x) = ln(x) (dom f: x>0) and g(x) = x² − 9.
(a) Compute (f∘g)(x).
(b) State dom(f∘g) carefully."

Problem 3:
"Decompose h(x) = sin²(x) (= (sin x)²) into f and g such that h = f∘g.
State f(u) and g(x)."

Problem 4:
"True or false: For any two functions f and g with matching domains,
(f∘g)∘h = f∘(g∘h). Justify with one example or one proof."
[Answer: True — composition is associative. Example: any three functions.]
```

```
P55 — SCORE (after P77)
Award 1 point per problem.
Running total before P76: __/4.
```

```
P76 — TRANSFER PROBE (cross-link: math.calc.chain-rule)
"Consider h(x) = (2x + 1)³.

(a) Decompose h into f and g such that h(x) = f(g(x)).
    Write f(u) = ___ and g(x) = ___.

(b) In calculus, the chain rule states: if h = f∘g then h'(x) = f'(g(x))·g'(x).
    Using your decomposition, identify:
    • f'(u) = ___
    • g'(x) = ___
    • h'(x) = f'(g(x))·g'(x) = ___ (do not evaluate — just substitute)

(c) This decomposition — identifying inner and outer functions — is exactly
    what the chain rule requires. Explain in one sentence how function
    composition is the structural foundation of the chain rule."

[Expected answer:
(a) g(x) = 2x+1 (inner), f(u) = u³ (outer). f(g(x)) = (2x+1)³. ✓
(b) f'(u) = 3u², g'(x) = 2. h'(x) = 3(2x+1)²·2.
(c) The chain rule differentiates composite functions by operating on the
    outer and inner functions separately — it requires the composition
    f(g(x)) structure to identify what to differentiate with what.]
```

```
P55 — SCORE (after P76)
Award 1 point for P76.
Running total: __/5.
```

```
P75 — MASTERY ASSESSMENT
Pass criterion: 4 out of 5 (⌈0.80 × 5⌉ = 4)
```

```
P55 — SCORE (final)
Record pass/fail status.
```

```
P74 — ROUTING DECISION
Score ≥ 4/5 → MASTERY ACHIEVED → P78 COMPLETION
Score < 4/5 → NEEDS REVIEW → identify lowest-scoring item; activate Protocol B for its misconception
```

```
P55 — SCORE (routing recorded)
```

```
P78 — COMPLETION
"Function composition checkpoint complete. You have established:
  • (f∘g)(x) = f(g(x)): g acts first, f acts second. Order is right-to-left.
  • dom(f∘g) = {x ∈ dom(g) : g(x) ∈ dom(f)}: both domain gates must be checked.
  • f∘g ≠ g∘f in general: composition is not commutative.
  • Decomposing h into f∘g — identifying inner and outer — is the skill that
    makes the chain rule tractable.
Next concept: math.calc.chain-rule, where you will differentiate h = f∘g
using h'(x) = f'(g(x))·g'(x)."
```

---

## Component 5 — Protocol B (Misconception Repair Chains)

### Repair Chain B-1: COMPOSITION-REVERSED (MC-1 FOUNDATIONAL)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: (f∘g)(x) = g(f(x))  [f goes first]
 AFTER:  (f∘g)(x) = f(g(x))  [g goes first]

Memory trick: read the ∘ symbol as AFTER.
f∘g = 'f AFTER g' → g runs, then f processes the result.

Equivalently: the function written on the RIGHT goes first.
In f∘g, g is on the right → g is the inner (first) function."

Repair exercise:
Let f(x)=x+10, g(x)=3x.
(a) Which function runs first in f∘g?  [g]
(b) Compute (f∘g)(2) step by step.
    Step 1: g(2) = 6.  Step 2: f(6) = 16.
    (f∘g)(2) = 16.  NOT f(2)=12 first → g(12)=36.

Exit gate: "In (f∘g)(x), which function is applied first?"
Expected: "g — the right-hand function in the notation."
→ Correct: return to TA-A01 P49 re-attempt.
→ Incorrect: repeat P64 with new concrete pair.
```

### Repair Chain B-2: DOMAIN-IGNORED (MC-2)

```
P41 — MISCONCEPTION DETECTOR
Diagnostic: "Find dom(f∘g) where f(x)=√x and g(x)=x−4."
If student says dom = ℝ or dom = [0,∞) without checking: MC-2 confirmed.

P27 — MISCONCEPTION NAMING
"DOMAIN-IGNORED: Only checking dom(g), not whether g(x) lands in dom(f).
Two conditions must BOTH hold:
  (1) x ∈ dom(g): x can enter the inner function.
  (2) g(x) ∈ dom(f): the output of g can enter the outer function."

P03 — ANALOGY BRIDGE
"Two security checkpoints at an airport:
  Checkpoint G: you must have a valid ticket.
  Checkpoint F: your bag must weigh under 10 kg.
Both must be cleared. Passing checkpoint G doesn't mean you'll pass F."

Repair exercise: f(x)=1/x, g(x)=x²−1.
  Cond 1: dom(g) = ℝ. Cond 2: g(x)=x²−1≠0 → x≠±1.
  dom(f∘g) = ℝ\{−1,1}.

Exit gate: "State dom(f∘g) as a two-condition intersection."
→ Correct: return to TA-A02.
```

### Repair Chain B-3: COMPOSITION-COMMUTATIVE (MC-3)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: f∘g = g∘f always.
 AFTER:  f∘g = g∘f is the exception, not the rule.

Counter-example: f(x)=x+1, g(x)=2x.
  (f∘g)(x) = f(2x) = 2x+1.
  (g∘f)(x) = g(x+1) = 2(x+1) = 2x+2.
  2x+1 ≠ 2x+2 (they differ by 1 for every x).

Why functions ≠ multiplication: multiplication of numbers is
commutative (a×b = b×a) because both are just scaling.
Function composition changes the TYPE of operation between applications —
adding vs. squaring vs. multiplying — and those operations interfere
differently depending on order."

Exit gate: "Give one pair of functions where f∘g ≠ g∘f and verify."
Expected: any valid counter-example with two distinct computed values.
→ Correct: return to TA-A03.
```

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89 — SPACED REPETITION
Review schedule for math.func.composition:

Interval 1 (1 day after mastery):
  Recall prompt: "Write the definition of (f∘g)(x). Which function runs first?"
  Target: f(g(x)); g runs first.

Interval 2 (3 days):
  Application: "Let f(x)=eˣ and g(x)=x²+1.
  Compute (f∘g)(x), (g∘f)(x), and state dom(f∘g)."
  Target: e^(x²+1) vs. (eˣ)²+1; dom(f∘g)=ℝ (since x²+1>0 always).

Interval 3 (7 days):
  Transfer: "Decompose h(x) = cos(3x²−1) into f and g.
  What would the chain-rule give for h'(x)?"
  Target: f(u)=cos(u), g(x)=3x²−1; h'(x)=−sin(3x²−1)·6x.

Interval 4 (21 days):
  Integration: "A student in math.calc.chain-rule cannot identify the
  inner function in h(x)=ln(sin x). Explain using function composition
  how to decompose it and why that decomposition is what the chain rule differentiates."
  Target: g(x)=sin(x), f(u)=ln(u); h'(x)=cos(x)/sin(x)=cot(x).
```

---

## Component 7 — Cross-Blueprint Dependencies

### GR-8: Cross-link documentation
```
Incoming prerequisite:
  math.func.function-concept → Provides domain/codomain/function-as-mapping.
  Composition requires understanding a function as a rule f: A→B;
  without this, "feeding output of g to input of f" is meaningless.

Outgoing unlocks:
  math.calc.chain-rule → Requires h = f∘g decomposition as the structural
  prerequisite. Chain rule cannot be applied without knowing which function
  is inner and which is outer.

Cross-linked (non-prerequisite):
  math.calc.chain-rule (Tier 1) → Used in P76 transfer probe: decompose
  (2x+1)³ and preview the chain-rule structure without computing derivatives.
```

### GR-9: P76 Mode Determination
```
cross_links = [math.calc.chain-rule]
math.calc.chain-rule IS in Tier 1 set → P76 CROSS-LINK PROBE
P76 probe: decompose h(x)=(2x+1)³ into f∘g; identify f'(u) and g'(x);
  state h'(x)=f'(g(x))·g'(x) without evaluating — previews chain-rule structure.
```

---

## Component 8 — Teaching Notes

### Pedagogical Rationale
Function composition (bloom=apply) requires students to execute a multi-step procedure reliably, not just recognise the definition. The P07 worked example pair in TA-A02 models both directions of the skill: computing a composition formula from scratch AND decomposing a given expression into inner/outer — the decomposition direction is the one chain-rule requires.

### Common Session Failure Modes
1. **MC-1 is near-universal:** The left-to-right reading of f∘g misleads nearly all first-time learners. Expect the P41 gate to fire; the B-1 repair chain should clear it in one pass with the assembly-line analogy.
2. **Decomposition is underpractised:** Students can compute f(g(x)) but freeze when asked to reverse-engineer f and g from a given h. The worked example pair and TA-A03 pattern induction address this directly.
3. **Domain check is skipped under time pressure:** Students in computation-heavy sessions default to "domain is whatever works." The two-gate framing in TA-A02 and the airport analogy in B-2 make this memorable.

### Connections to Broader Curriculum
- **Downstream — math.calc.chain-rule:** The P76 probe intentionally previews the chain rule's structure. By the time students reach chain-rule, they should arrive with h = f∘g decomposition as a practised, automatic skill.
- **Cross-domain — math.abst.group-theory:** Function composition on bijections forms a group (under composition). This connection enriches both topics but is not required content here.
- **Prerequisite — math.func.function-concept:** Domain/codomain terminology, and the notion of a function as a mapping f: A→B, must be solid before domain-of-composition arguments make sense.

### Language Precision
- Always write "g runs first" or "g is the inner function" — never "g is on the left" (it's on the right in f∘g).
- Say "f AFTER g" as a mnemonic for f∘g.
- Distinguish (f∘g)(x) = f(g(x)) from f·g(x) = f(x)·g(x) (product of functions).

---

## Component 10 — Validation Checklist

### Structural Validators
- [x] V-1: Blueprint has all 10 components (0–8, 10).
- [x] V-2: Metadata YAML complete with all required fields.
- [x] V-3: concept_id matches filename `math.func.composition`.
- [x] V-4: difficulty=proficient, bloom_level=apply, mastery_threshold=0.80.
- [x] V-5: estimated_hours=5, session_ta_cap=7.

### Grammar Rule Validators
- [x] V-6 (GR-1): Every non-repair TA opens with B-category primitive (TA-A01: P03+P06; TA-A02: P07; TA-A03: P04; TA-A04 is mastery gate).
- [x] V-7 (GR-2): Every non-gate TA contains P49 with all 4 branches. TA-A01, TA-A02, TA-A03 each have P49.
- [x] V-8 (GR-3): Mastery gate TA-A04 is terminal (ends with P78).
- [x] V-9 (GR-4): P41 entry diagnostic gates P64 → Protocol B when MC-1 active.
- [x] V-10 (GR-6): P91 compound (P77→P55→P76→P55→P75→P55→P74→P55→P78) complete in TA-A04.
- [x] V-11 (GR-7): P76 present in mastery gate TA-A04.
- [x] V-12 (GR-8): Cross-links documented in Component 7. math.calc.chain-rule named.
- [x] V-13 (GR-9): P76 mode is CROSS-LINK (math.calc.chain-rule is Tier 1). P76 probe previews chain-rule decomposition structure.
- [x] V-14 (GR-10): MAMR stated in Component 0 and enforced in Component 3.

### Content Validators
- [x] V-15: Pass criterion = ⌈0.80 × 5⌉ = 4/5. P77 has 4 problems; P76 contributes 1; total n=5. ✓
- [x] V-16: CPA_ENTRY_STAGE = C. proficient/apply starts Concrete (no prior concrete in prerequisites). ✓
- [x] V-17: MC-1 is FOUNDATIONAL and cleared first per MAMR. ✓
- [x] V-18: P49 INCORRECT branch activates P27 or P64 with repair pathway in TA-A01, TA-A02, TA-A03. ✓
- [x] V-19: P76 probe independent of P77 problems (P77: algebraic computation; P76: decompose (2x+1)³ and chain-rule preview). ✓
- [x] V-20: Spaced repetition intervals are 1, 3, 7, 21 days with distinct prompts. ✓

### bloom=apply Validator
- [x] V-APPLY: P07 (WORKED EXAMPLE PAIR) present in TA-A02, modelling both computation and decomposition directions. ✓

### Automated Invariant Check (AIR)
- [x] AIR-1: No implementation code present.
- [x] AIR-2: No references to internal system variables.
- [x] AIR-3: All cross-linked concept IDs use canonical prefix format.
- [x] AIR-4: P91 sequence order is P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
- [x] AIR-5: Protocol B repair chains each have explicit exit gate with return instruction. ✓

**VALIDATION RESULT: PASS — PACKAGE_READY**
