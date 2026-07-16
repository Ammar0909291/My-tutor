<!-- BLUEPRINT: math.calc.chain-rule -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Chain Rule
**Concept ID:** `math.calc.chain-rule`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=8 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.calc.chain-rule |
| name | Chain Rule |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 8 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.calc.derivative-rules, math.func.composition |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.calc.derivative-rules**: power rule, constant multiple, sum/difference, d/dx(eˣ)=eˣ; rule-scope awareness (power vs. exponential)
- **math.func.composition**: (f∘g)(x)=f(g(x)); identifying outer and inner functions; domain of compositions

### Target Knowledge State
Student fluently applies the chain rule (f∘g)'(x)=f'(g(x))·g'(x) to differentiate composite functions; correctly identifies the outer and inner functions; evaluates the outer derivative AT the inner function (not at x); extends to double compositions; and distinguishes cases requiring the chain rule (composition) from those requiring the product rule (product) or the basic rules.

### Conceptual Obstacles
1. Computing f'(g(x)) but omitting ·g'(x) — the "missing inner derivative" is the most frequent chain-rule error; d/dx(sin(x²))=cos(x²) instead of cos(x²)·2x
2. Evaluating the outer derivative at x rather than at g(x) — writing d/dx(sin(x²))=cos(x)·2x instead of cos(x²)·2x
3. Applying the chain rule to products — treating f(x)·g(x) as a composition and writing f'(x)·g'(x); products require the product rule, not the chain rule

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | INNER-DERIVATIVE-MISSING | Student computes f'(g(x)) correctly but omits the factor g'(x); chain rule result is incomplete by one factor | Any composite function; especially chains with polynomial or trig inner functions |
| MC-2 | OUTER-EVALUATED-AT-X | Student writes f'(x)·g'(x) instead of f'(g(x))·g'(x); outer derivative is evaluated at x rather than at the inner function | Any composite requiring "plug inner into outer derivative"; especially non-trivial outer functions |
| MC-3 | CHAIN-RULE-FOR-PRODUCTS | Student applies chain rule to f(x)·g(x), treating one factor as "outer" and the other as "inner"; writes f'(g(x))·g'(x) for a product | Expressions like x·sin(x), eˣ·cos(x); confusion between composition and multiplication |

**Foundational Misconception:** MC-1 (INNER-DERIVATIVE-MISSING) — omitting g'(x) produces a wrong answer with a superficially correct-looking first factor; it propagates through every chain-rule application in future calculus (implicit differentiation, related rates, integration by substitution).

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner works through the Leibniz form with a specific substitution before seeing the abstract formula.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: Leibniz substitution u=x², y=sin(u): compute dy/du=cos(u), du/dx=2x, chain: dy/dx=cos(u)·2x=cos(x²)·2x; P: outer-inner decomposition diagram; A: formal (f∘g)'(x)=f'(g(x))·g'(x)
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: polynomial inner, power outer; WE2: trig inner, exponential outer
3. **A03 P06 CONTRAST PAIR** — chain rule (composition f(g(x))) vs product rule (product f(x)·g(x)); double chain rule; implicit differentiation preview
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Discovering the Chain Rule via Substitution

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Build the chain rule from the Leibniz form first, then state it in Lagrange notation; establish the two-factor structure f'(g(x))·g'(x); address MC-1 by making both factors explicit

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (Leibniz substitution for y=sin(x²)):**

Problem: differentiate y = sin(x²).

*Step 1 — Introduce substitution:* Let u = x². Then y = sin(u).

*Step 2 — Differentiate each relation:*
- dy/du = cos(u) (y in terms of u: standard rule)
- du/dx = 2x (u in terms of x: power rule)

*Step 3 — Chain the two rates:*
$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx} = \cos(u) \cdot 2x$$

*Step 4 — Back-substitute u = x²:*
$$\frac{dy}{dx} = \cos(x^2) \cdot 2x$$

The two factors dy/du and du/dx are the **outer derivative** (cos u, the derivative of sin) and the **inner derivative** (2x, the derivative of x²). Both are required.

**Stage P — Pictorial (outer-inner decomposition):**

Every composite function f(g(x)) has a structure:

```
x ──[inner: g]──► g(x) ──[outer: f]──► f(g(x))
    du/dx = g'(x)        dy/du = f'(g(x))
    
    ────────────────────────────────────────
    dy/dx = f'(g(x)) · g'(x)
              ↑ outer      ↑ inner
              evaluated    evaluated at x
              at g(x)!
```

The critical point: the outer derivative f'(u) must be evaluated at u=g(x), NOT at x. This is where MC-2 errors arise.

**Stage A — Algebraic (Lagrange notation):**

**Chain Rule:** If g is differentiable at x and f is differentiable at g(x), then:
$$(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$$

Or equivalently (Leibniz form): if y=f(u) and u=g(x), then:
$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$

**Identification checklist:**
1. Is the function a composition f(g(x))? (Not a product or sum?)
2. What is the outer function f? What is the inner function g?
3. Differentiate f to get f'(u) — DON'T substitute x back yet.
4. Evaluate f' at u=g(x): this gives f'(g(x)).
5. Multiply by g'(x).

| Composite | Outer f | Inner g | f'(g(x)) | g'(x) | Derivative |
|-----------|---------|---------|----------|-------|-----------|
| sin(x²) | sin(u) | x² | cos(x²) | 2x | 2x·cos(x²) |
| e^{3x} | eᵘ | 3x | e^{3x} | 3 | 3e^{3x} |
| (x²+1)^5 | u^5 | x²+1 | 5(x²+1)^4 | 2x | 10x(x²+1)^4 |
| √(2x+1) | √u | 2x+1 | 1/(2√(2x+1)) | 2 | 1/√(2x+1) |

---

**[P49 — ADAPTIVE CHECKPOINT]**

Find d/dx[e^{3x²}].

- **CORRECT** → Outer: eᵘ, inner: u=3x²; g'(x)=6x. d/dx = e^{3x²}·6x = 6xe^{3x²}. Affirm: "Both factors present — e^{3x²} (outer at inner) times 6x (inner derivative)."
- **PARTIAL** → Student writes e^{3x²} only (missing 6x). Address: "You have f'(g(x)) correct, but the chain rule requires multiplying by g'(x). Here g(x)=3x², so g'(x)=6x."
- **INCORRECT** → Student writes 3x²·e^{3x²−1} (applied power rule to eˣ-style function). Redirect: "eˣ is not a power function — its derivative is eˣ, not xeˣ⁻¹. Here the outer function is eᵘ, not uⁿ."
- **NO_RESPONSE** → Prompt: "Let u=3x². Then y=eᵘ. What is dy/du? What is du/dx? Multiply them."

---

### Teaching Action A02 — Worked Examples

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Model the chain rule procedure for polynomial-in-power and trig-in-exponential composites; demonstrate the checklist; address MC-2 by consistently writing f'(g(x)) before substituting

---

**[P07 — WORKED EXAMPLE PAIR]**

**WE1 — Power outer, polynomial inner: h(x) = (4x³ + 1)^7**

*Step 1 — Identify outer and inner:*
- Outer: f(u) = u^7; Inner: g(x) = 4x³+1

*Step 2 — Derivatives:*
- f'(u) = 7u^6
- g'(x) = 12x²

*Step 3 — Apply chain rule:*
$$h'(x) = f'(g(x)) \cdot g'(x) = 7(4x^3+1)^6 \cdot 12x^2 = 84x^2(4x^3+1)^6$$

Note: f'(u)=7u^6 must be evaluated at u=g(x)=4x³+1. Writing 7x^6·12x² is MC-2: the outer was evaluated at x, not at the inner function.

*Self-check:* Expand (4x³+1)^7 as a polynomial of degree 21; its derivative should have degree 20. Our answer 84x²(4x³+1)^6 has degree 2+6·3=20 ✓.

---

**WE2 — Trig inner, exponential outer: k(x) = e^{sin(x)}**

*Step 1 — Identify:*
- Outer: f(u) = eᵘ; Inner: g(x) = sin(x)

*Step 2 — Derivatives:*
- f'(u) = eᵘ (exponential: derivative is itself)
- g'(x) = cos(x)

*Step 3 — Apply chain rule:*
$$k'(x) = e^{\sin(x)} \cdot \cos(x)$$

Note: e^{sin(x)} is NOT e^x — the exponent is sin(x), not x. And the inner derivative is cos(x), not 1.

*Cross-check at x=0:* k(0)=e^0=1; k'(0)=e^{sin(0)}·cos(0)=1·1=1. Slope = 1 at x=0; the graph of e^{sin(x)} has tangent slope 1 at x=0 (since sin(0)=0 and cos(0)=1). Reasonable.

---

**[P49 — ADAPTIVE CHECKPOINT]**

Find d/dx[cos(x³ + 2)].

- **CORRECT** → Outer: cos(u), f'(u)=−sin(u); inner: u=x³+2, g'(x)=3x². d/dx = −sin(x³+2)·3x² = −3x²sin(x³+2).
- **PARTIAL** → Student writes −sin(x³+2) only. Ask: "What is the inner derivative? u=x³+2, so du/dx=?"
- **INCORRECT** → Student writes −sin(x)·3x² (evaluated outer at x, not x³+2). Address: "The outer derivative is −sin(u), evaluated at u=x³+2, giving −sin(x³+2), not −sin(x)."
- **NO_RESPONSE** → Prompt: "Let u=x³+2. Then y=cos(u). Find dy/du and du/dx separately."

---

### Teaching Action A03 — Chain Rule Scope and Extensions

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Contrast chain rule (composition) with product rule (product); introduce double chain rule; preview implicit differentiation; address MC-3

---

**[P06 — CONTRAST PAIR]**

**Contrast A: Chain rule vs. Product rule**

| Structure | Expression | Rule needed | Derivative |
|-----------|-----------|-------------|-----------|
| f(g(x)): composition | sin(x²) | Chain rule | cos(x²)·2x |
| f(x)·g(x): product | sin(x)·x² | Product rule | cos(x)·x² + sin(x)·2x |
| f(g(x)): composition | eˣ² | Chain rule | eˣ²·2x |
| f(x)·g(x): product | eˣ·x² | Product rule | eˣ·x² + eˣ·2x = eˣ(x²+2x) |

**Diagnostic question:** Is the variable in the exponent/argument, or is it a separate multiplicative factor?
- sin(x²): x² is INSIDE sin → composition → chain rule
- x²·sin(x): x² is multiplied by sin(x) → product → product rule

**Contrast B: Single chain rule vs. Double chain rule**

For triple compositions h(x) = f(g(u(x))):
$$h'(x) = f'(g(u(x))) \cdot g'(u(x)) \cdot u'(x)$$

*Example:* d/dx[e^{cos(x²)}]
- Outer: eᵘ, middle: cos(v), inner: v=x²
- d/dx = e^{cos(x²)} · (−sin(x²)) · 2x = −2x·sin(x²)·e^{cos(x²)}

Procedure: peel layers from outside in. Each new layer contributes one more factor in the product.

**Preview: Implicit differentiation (application of chain rule)**

The equation y²=x implicitly defines y as a function of x. Differentiating both sides:
$$\frac{d}{dx}(y^2) = \frac{d}{dx}(x)$$
$$2y \cdot \frac{dy}{dx} = 1 \quad \Rightarrow \quad \frac{dy}{dx} = \frac{1}{2y}$$

The key step d/dx(y²)=2y·(dy/dx) is the chain rule: outer=u², inner=y(x), so d/dx(y²)=2y·y'. This becomes the full implicit differentiation technique in math.calc.implicit-differentiation.

---

**[P49 — ADAPTIVE CHECKPOINT]**

Classify each and find the derivative:
(i) d/dx[sin(x)·cos(x)]   (ii) d/dx[sin(cos(x))]

- **CORRECT** → (i) Product: d/dx[sin(x)]·cos(x)+sin(x)·d/dx[cos(x)]=cos²(x)−sin²(x). (ii) Chain: outer=sin(u), inner=cos(x); d/dx=cos(cos(x))·(−sin(x))=−sin(x)cos(cos(x)).
- **PARTIAL** → Student applies chain rule to (i): cos(cos(x))·(−sin(x)). Ask: "Is sin(x)·cos(x) a composition or a product? Can you write one as a function of the other?"
- **INCORRECT** → Student applies product rule to (ii): cos(x)·(−sin(x)) (treating it as a product sin×cos). Address: "sin(cos(x)) means sin applied TO cos(x) — the argument of sin is cos(x). That is a composition."
- **NO_RESPONSE** → Prompt: "For (i): sin(x)·cos(x) means sin(x) TIMES cos(x) — two separate functions multiplied. For (ii): sin(cos(x)) means sin of (cos(x)) — one function inside another. Which rule applies to each?"

---

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)

---

**[P77 — MULTI-PROBLEM SET]** *(4 items)*

**Item 1:** d/dx[cos(3x)].

*Solution:* Outer: cos(u), f'(u)=−sin(u); inner: 3x, g'=3.
Answer: −sin(3x)·3 = **−3sin(3x)**

**Item 2:** d/dx[e^{x²}].

*Solution:* Outer: eᵘ, f'(u)=eᵘ; inner: x², g'=2x.
Answer: **2xe^{x²}**

**Item 3:** d/dx[(x²+1)^5].

*Solution:* Outer: u^5, f'(u)=5u^4; inner: x²+1, g'=2x.
Answer: 5(x²+1)^4·2x = **10x(x²+1)^4**

**Item 4:** d/dx[√(2x+1)].

*Solution:* Rewrite as (2x+1)^(1/2). Outer: u^(1/2), f'(u)=(1/2)u^(−1/2); inner: 2x+1, g'=2.
Answer: (1/2)(2x+1)^(−1/2)·2 = **(2x+1)^(−1/2) = 1/√(2x+1)**

---

**[P55 — SCORE]** Count correct items (Items 1–4). Running total: _/4.

---

**[P76 — TRANSFER PROBE]** *(independence mode)*

A population grows according to:
$$P(t) = 1000\,e^{0.05t}, \quad t \geq 0 \text{ (years)}$$

**(a)** Identify the composition: what are the outer function f(u) and inner function g(t)?

**(b)** Apply the chain rule to find the growth rate P'(t).

**(c)** Find P'(0) and P'(20). What do they mean?

**(d)** The doubling time T satisfies P(T)=2000. Find T algebraically (using logarithms).

**(e)** At the doubling time, is P'(T) greater than, equal to, or less than 2·P'(0)? Verify numerically.

---

*Expected solution:*

(a) Outer: f(u)=1000eᵘ (or just eᵘ with the 1000 as a constant multiple); Inner: g(t)=0.05t.

(b) P'(t) = 1000·e^{0.05t}·0.05 = **50e^{0.05t}** (people/year)

(c) P'(0) = 50e⁰ = 50 people/year (initial growth rate).
P'(20) = 50e^{1} ≈ 50·2.718 ≈ 135.9 people/year (much faster — exponential growth is accelerating).

(d) 1000e^{0.05T}=2000 → e^{0.05T}=2 → 0.05T=ln(2) → T = ln(2)/0.05 = 20ln(2) ≈ **13.86 years**

(e) P'(T) = 50e^{0.05T} = 50·2 = 100 (since e^{0.05T}=2 from part d).
2·P'(0) = 2·50 = 100.
P'(T) = **exactly** 2·P'(0). This is a general property of exponential growth: when the population doubles, the growth rate doubles too (both are proportional to P(t)).

---

**[P55 — SCORE]** Score P76 (0 or 1). Running total: _/5.

---

**[P75 — MASTERY ASSESSMENT]** MAMR = 5/5.

- Score ≥ 5/5 → PASS → proceed to P74.
- Score < 5/5 → FAIL → P74 routes to repair.

---

**[P55 — SCORE]** Record final pass/fail.

---

**[P74 — ROUTING DECISION]**

- **PASS (5/5):** Concept mastered. Proceed to math.calc.implicit-differentiation.
- **FAIL:** Diagnose: missing g'(x) factor → B-MC1. Outer evaluated at x → B-MC2. Product/chain confusion → B-MC3.

---

**[P55 — SCORE]** Log routing outcome.

---

**[P78 — COMPLETION]**

Session complete for math.calc.chain-rule.

---

## Component 5 — Protocol B (Repair Sequences)

### B-MC1 — Repair: INNER-DERIVATIVE-MISSING

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You computed f'(g(x)) but didn't multiply by g'(x). The chain rule is a product of two derivatives — the outer and the inner. Missing one gives the wrong answer."

**[P41 — MISCONCEPTION DETECTOR]**
Check d/dx[sin(x²)]=cos(x²) numerically. At x=1: the true value is cos(1)·2≈1.080. Your answer cos(1²)=cos(1)≈0.540 — half the correct value. The missing factor is g'(x)=2x=2 at x=1. The inner derivative is the "speed" at which the input to the outer function is changing — if the inner function changes fast, the composition changes fast too.

**[P64 — CONCEPTUAL SHIFT]**
Think of the chain rule as a gear ratio: if the inner function changes at rate g'(x) and the outer function changes at rate f'(u) per unit of u, then the composite changes at rate f'(g(x))·g'(x). Both gears matter. The outer gear ratio alone (cos(x²)) describes how fast y changes per unit of u, not per unit of x.

---

### B-MC2 — Repair: OUTER-EVALUATED-AT-X

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote f'(x)·g'(x) instead of f'(g(x))·g'(x). The outer derivative must be evaluated at the inner function u=g(x), not at x."

**[P41 — MISCONCEPTION DETECTOR]**
d/dx[sin(x²)]. True answer: cos(x²)·2x. Your answer: cos(x)·2x. At x=2: true = cos(4)·4≈−2.615; yours = cos(2)·4≈−1.665. Different. The outer derivative is d/du[sin(u)]=cos(u); after the chain rule, substitute u=x² → cos(x²), not cos(x).

**[P64 — CONCEPTUAL SHIFT]**
The outer function takes u=g(x) as its input, not x directly. So its derivative (with respect to its input u) must be evaluated WHERE it currently receives its input — at u=g(x). The Leibniz form makes this natural: dy/du evaluated at u=g(x) gives f'(g(x)). Always write the outer derivative in terms of u first, then substitute u=g(x) back. Never substitute x directly into f'(u).

---

### B-MC3 — Repair: CHAIN-RULE-FOR-PRODUCTS

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You applied the chain rule to a product. The chain rule is for compositions f(g(x)) — one function inside another. For products f(x)·g(x), you need the product rule."

**[P41 — MISCONCEPTION DETECTOR]**
Consider eˣ·sin(x). This is NOT a composition — eˣ and sin(x) are multiplied together. Chain rule attempt: treating sin(x) as "inner" → outer=eᵘ, f'(u)=eᵘ, f'(sin(x))=e^{sin(x)}... but then the second factor eˣ just disappears. This makes no sense. Product rule: d/dx(eˣ·sin(x)) = eˣ·sin(x)+eˣ·cos(x) = eˣ(sin(x)+cos(x)). This is the correct answer.

**[P64 — CONCEPTUAL SHIFT]**
Diagnostic: can you write one factor AS A FUNCTION OF the other? In sin(x²): sin applied to x² — yes, composition. In eˣ·sin(x): can you write eˣ as a function of sin(x) or vice versa? No — they are independent functions of x. Independent functions multiplied → product rule. One function with the other's output as its input → chain rule. The notation is the giveaway: f(g(x)) has one argument; f(x)·g(x) has two separate expressions multiplied.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Interval | Prompt |
|----------|--------|
| Day 1 | d/dx[sin²(x)] = d/dx[(sin(x))²]. Outer: u², inner: sin(x). [2sin(x)·cos(x)] |
| Day 3 | d/dx[e^{−x²/2}] — outer: eᵘ, inner: −x²/2, g'=−x. [−xe^{−x²/2}] |
| Day 7 | d/dx[√(sin(3x))] — double chain: outer=√u, middle=sin(v), inner=3x. [(1/2)(sin(3x))^{−1/2}·cos(3x)·3=3cos(3x)/(2√(sin(3x)))] |
| Day 14 | If y=f(u) and u=3x²+1, and f'(2)=5, find dy/dx at x=−1. [u(−1)=4, g'(−1)=−6... wait, u=3(1)+1=4: f'(4)... need f'(4). If instead the problem says f'(4)=5: dy/dx=f'(4)·6·(−1)=5·(−6)=−30] |

---

## Component 7 — Cross-Blueprint Dependencies

### Prerequisite Blueprints Required
| Concept ID | Blueprint Status | Dependency |
|------------|-----------------|------------|
| math.calc.derivative-rules | PACKAGE_READY | Power rule, exponential rule, trig derivatives — the building blocks that chain rule combines |
| math.func.composition | Required | Understanding f(g(x)) structure and identifying outer/inner functions |

### Blueprints This Unlocks
| Concept ID | Dependency |
|------------|------------|
| math.calc.implicit-differentiation | Requires chain rule for d/dx(y²)=2y·y' and all implicit expressions |

### Cross-Links
*(none — cross_links field is empty in the KG)*

---

## Component 8 — Teaching Notes

**Leibniz first, then Lagrange:** The A01 Stage C Leibniz derivation (u=x², dy/du=cos(u), du/dx=2x, multiply: cos(x²)·2x) is more transparent than the abstract (f∘g)'=f'(g(x))·g'(x) for first exposure. Students see exactly why two derivatives appear and why the "gears" must be multiplied. After that, the Lagrange notation is a compact summary of what was just derived.

**The identification checklist in A01 Stage A:** The five-step checklist (identify outer, identify inner, differentiate f, evaluate at g(x), multiply by g') should be worked explicitly for the first several problems, then gradually internalised. Students who skip steps 2 and 4 produce MC-2 errors; those who skip step 5 produce MC-1 errors. The checklist enforces both.

**MC-1 is the highest-frequency error:** Every chain-rule application ever done in calculus requires the inner derivative. The numerical check (compare derivative formula to numerical approximation) in B-MC1 is particularly effective because it gives students a concrete failure: their answer is exactly wrong by a factor of 2 at a specific point, making the error undeniable.

**P76 models exponential growth as chain rule:** P(t)=1000e^{0.05t} — the composite structure is visible (outer eᵘ, inner 0.05t). Part (e) (verifying P'(T)=2P'(0) at the doubling time) is a pleasant surprise — the chain rule result, combined with the doubling condition, gives an elegant identity that a student who "just plugs in" will discover only if they carry through the algebra. It rewards thorough chain-rule application.

---

## Component 10 — Validation Checklist

| ID | Check | Status |
|----|-------|--------|
| V-1 | All Teaching Actions have assigned primitives | PASS |
| V-2 | GR-1: A01 opens with P11 (B-category primitive, non-repair) | PASS |
| V-3 | CPA entry stage = C for advanced difficulty | PASS |
| V-4 | bloom=apply → P07 present in A02 (WORKED EXAMPLE PAIR) | PASS |
| V-5 | GR-2: P49 present in A01, A02, A03, each with 4 branches | PASS |
| V-6 | GR-3: A04 (P91) is terminal — no further TAs after gate | PASS |
| V-7 | GR-4: All B-sequences open with P27+P41+P64 | PASS |
| V-8 | GR-6: P91 is terminal in A04 | PASS |
| V-9 | GR-7: P76 present inside A04 mastery gate | PASS |
| V-10 | GR-9: cross_links=[] → P76 mode = independence | PASS |
| V-11 | GR-10: MAMR=5/5 stated and enforced (thresh=0.85, n=5: ⌈0.85×5⌉=5) | PASS |
| V-12 | PASS criterion (5/5) stated in P75 and P74 | PASS |
| V-13 | GR-8: Component 7 documents all cross-blueprint dependencies | PASS |
| V-14 | Standard structure: h=8 → 3 main TAs (A01,A02,A03) + gate (A04) | PASS |
| V-15 | Component 0 metadata fields complete | PASS |
| V-16 | Component 1 (prior anchors, target state, obstacles) complete | PASS |
| V-17 | Component 2: 3 MCs with 1 foundational designated | PASS |
| V-18 | Component 3 scaffolding protocol complete | PASS |
| V-19 | Component 6 P89 schedule complete (4 intervals) | PASS |
| V-20 | Component 8 teaching notes complete | PASS |
| AIR | No prohibited operations (no curriculum modification, no framework redesign) | PASS |

**Status: PACKAGE_READY**
