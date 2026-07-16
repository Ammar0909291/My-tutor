<!-- BLUEPRINT: math.calc.derivative-rules -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Basic Differentiation Rules
**Concept ID:** `math.calc.derivative-rules`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=8 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.calc.derivative-rules |
| name | Basic Differentiation Rules |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 8 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.calc.derivative-definition |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.calc.derivative-definition**: f'(x)=lim_{h→0}[f(x+h)−f(x)]/h; three-step expand→cancel h→limit procedure; non-differentiability at corners/discontinuities

### Target Knowledge State
Student can fluently apply the power rule d/dx(xⁿ)=nxⁿ⁻¹ for any real constant n (positive integer, zero, negative, fractional), the constant multiple rule d/dx(cf)=cf', and the sum/difference rule d/dx(f±g)=f'±g'; can rewrite radical and rational expressions as fractional/negative powers before differentiating; correctly identifies when these rules DO and DO NOT apply (distinguishes power functions from exponential functions; knows products require rewriting or the upcoming product rule); and applies the rules fluently to physics/geometry contexts.

### Conceptual Obstacles
1. Applying d/dx(xⁿ)=nxⁿ⁻¹ to exponential functions: writing d/dx(eˣ)=xeˣ⁻¹ or d/dx(2ˣ)=x·2ˣ⁻¹ — the power rule requires a CONSTANT exponent and VARIABLE base, not the reverse
2. Omitting the original coefficient: computing d/dx(3x²)=2x instead of 6x — the exponent multiplies the existing coefficient (3·2x)
3. Distributing derivatives over products: computing d/dx[f(x)·g(x)]=f'(x)·g'(x), which is incorrect at this level; the correct approach is to first simplify the product into a single power when possible

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | POWER-RULE-FOR-EXPONENTIAL | Student applies d/dx(xⁿ)=nxⁿ⁻¹ to d/dx(eˣ) or d/dx(2ˣ), getting xeˣ⁻¹ or x·2ˣ⁻¹ | Any expression containing eˣ or aˣ; "power rule everywhere" thinking |
| MC-2 | COEFFICIENT-MULTIPLICATION-OMITTED | Student writes d/dx(3x²)=2x, dropping the coefficient 3; confuses constant multiple rule with constant function rule | Any term with a leading coefficient; especially d/dx(cf(x)) with c≠1 |
| MC-3 | DISTRIBUTING-DERIVATIVE-OVER-PRODUCTS | Student writes d/dx[f(x)·g(x)]=f'(x)·g'(x) instead of simplifying to a single power first (or waiting for product rule) | Products like x²·x³ or (2x)(x³) where simplification is possible |

**Foundational Misconception:** MC-1 (POWER-RULE-FOR-EXPONENTIAL) — causes systematic errors on every mixed expression involving eˣ or aˣ in future calculus; the rule boundary (variable base, constant exponent) is the single most important scope condition of this blueprint.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner derives patterns from the definition before abstracting.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: use definition to compute d/dx(x²) and d/dx(x³); tabulate the emerging pattern; P: power table for n=0,1,2,3,4; A: power rule + constant multiple + sum/difference formally stated
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: polynomial 4x³−5x²+2x−7; WE2: radical/rational x^(1/2)+3x^(−2) requiring rewrite-first discipline
3. **A03 P06 CONTRAST PAIR** — power functions vs exponential functions (MC-1 repair boundary); sum rule scope (applies term-by-term) vs product (requires product rule — preview)
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Discovering and Stating the Differentiation Rules

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Derive the power rule from the definition so the formula feels discovered, not memorised; state all four rules; address MC-2 by emphasising coefficient carries through

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (derive from definition for xⁿ, n=2 and n=3):**

*Case n=2: f(x)=x²*
$$f'(x) = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h} = \lim_{h \to 0} \frac{x^2+2xh+h^2-x^2}{h} = \lim_{h \to 0} \frac{2xh+h^2}{h} = \lim_{h \to 0}(2x+h) = 2x$$

*Case n=3: f(x)=x³*
$$(x+h)^3 = x^3+3x^2h+3xh^2+h^3$$
$$f'(x) = \lim_{h \to 0} \frac{3x^2h+3xh^2+h^3}{h} = \lim_{h \to 0}(3x^2+3xh+h^2) = 3x^2$$

*Case n=0: f(x)=1 (constant)*
$$f'(x) = \lim_{h \to 0} \frac{1-1}{h} = \lim_{h \to 0} 0 = 0$$

**Stage P — Pictorial (power table):**

| f(x) | f'(x) | Pattern |
|------|-------|---------|
| x⁰ = 1 | 0 | bring down 0 → annihilates |
| x¹ = x | 1 = 1·x⁰ | bring down 1, reduce power by 1 |
| x² | 2x¹ = 2x | bring down 2, reduce power by 1 |
| x³ | 3x² | bring down 3, reduce power by 1 |
| x⁴ | 4x³ | bring down 4, reduce power by 1 |
| xⁿ | nxⁿ⁻¹ | general pattern → **Power Rule** |

**Stage A — Algebraic (four rules, formally stated):**

| Rule | Statement | Example |
|------|-----------|---------|
| **Power Rule** | d/dx(xⁿ) = nxⁿ⁻¹ for any constant n | d/dx(x⁷) = 7x⁶ |
| **Constant Rule** | d/dx(c) = 0 | d/dx(π) = 0 |
| **Constant Multiple Rule** | d/dx(cf(x)) = c·f'(x) | d/dx(3x²) = 3·2x = **6x** |
| **Sum/Difference Rule** | d/dx(f±g) = f'±g' | d/dx(x²+x) = 2x+1 |

**Critical: Constant Multiple Rule.** The constant c multiplies the result of differentiating f(x). For d/dx(3x²): bring down n=2, reduce power: 2x¹. Then multiply by 3: **3·2x = 6x**. The 3 does NOT disappear; it does NOT become part of the exponent.

**Scope note:** These rules apply when the base is the variable x and the exponent is a constant. They do NOT apply when the exponent is the variable (exponential functions like eˣ, 2ˣ — those need different rules in later blueprints).

---

**[P49 — ADAPTIVE CHECKPOINT]**

Differentiate f(x) = 5x⁴ − 2x + 9.

- **CORRECT** → f'(x)=5·4x³−2·1+0=20x³−2. Confirm: coefficient (5) multiplies the exponent product (4x³), constant (9) vanishes. Proceed to A02.
- **PARTIAL** → Student may write 4x³−2 (dropped the 5) or 20x³−2x (forgot 2x derivative). Identify which coefficient step failed and reteach the constant multiple example.
- **INCORRECT** → Student writes 5·4·x³⁻¹=5·4·x² (double error: wrong power reduction) or 20x⁴ (wrong exponent). Use the Stage P table to recheck the pattern.
- **NO_RESPONSE** → Prompt: "Apply the power rule to each term: 5x⁴ → bring down 4, reduce power by 1. What does 5·4x³ simplify to?"

---

### Teaching Action A02 — Worked Examples: Polynomials and Rational/Radical Functions

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Model the full differentiation procedure for polynomial and non-integer power functions; establish rewrite-first discipline for radical and rational expressions; address MC-2 in context

---

**[P07 — WORKED EXAMPLE PAIR]**

**WE1 — Polynomial: f(x) = 4x³ − 5x² + 2x − 7**

*Step 1 — Apply power rule term-by-term (sum rule):*
- d/dx(4x³) = 4·3·x² = **12x²**
- d/dx(−5x²) = (−5)·2·x = **−10x**
- d/dx(2x) = 2·1·x⁰ = **2**
- d/dx(−7) = **0**

*Step 2 — Collect:*
$$f'(x) = 12x^2 - 10x + 2$$

*Self-check:* Degree of f is 3; degree of f' is 2 (always drops by 1 for polynomials). ✓

*Common error demonstration:* Student writes d/dx(4x³)=3x² (omits the 4). Correct: 4·3x²=12x². The coefficient 4 multiplies the result 3x² — it does not vanish.

---

**WE2 — Radical and Rational: f(x) = √x + 3/x²**

*Step 1 — Rewrite using power notation FIRST:*
$$f(x) = x^{1/2} + 3x^{-2}$$

*Step 2 — Differentiate each term:*
- d/dx(x^(1/2)) = (1/2)x^(1/2−1) = (1/2)x^(−1/2) = **1/(2√x)**
- d/dx(3x^(−2)) = 3·(−2)x^(−2−1) = **−6x^(−3) = −6/x³**

*Step 3 — Collect:*
$$f'(x) = \frac{1}{2\sqrt{x}} - \frac{6}{x^3}$$

*Rewriting rule table:*

| Expression | Power form |
|-----------|-----------|
| √x | x^(1/2) |
| ∛x | x^(1/3) |
| 1/x | x^(−1) |
| 1/x² | x^(−2) |
| 1/xⁿ | x^(−n) |
| x^(p/q) | p-th power of q-th root |

*Discipline:* Never apply the power rule to 1/x² directly as written. Rewrite → then differentiate. This rewrite-first step catches most errors with rational and radical expressions.

---

**[P49 — ADAPTIVE CHECKPOINT]**

Differentiate g(x) = 2x^(3/2) − 4/x.

- **CORRECT** → Rewrite: 2x^(3/2) − 4x^(−1). Differentiate: 2·(3/2)x^(1/2) − 4·(−1)x^(−2) = 3x^(1/2) + 4x^(−2) = 3√x + 4/x². Correct!
- **PARTIAL** → Student may forget the 4·(−1) sign flip: gets 4x^(−2) = 4/x² but writes +4/x² without the sign flip (already positive: 4·(−1)=−4, times x^(−2), then the minus in the original term — actually −4x^(−1) derivative = −4·(−1)x^(−2) = +4x^(−2) = +4/x²). Confirm the sign chain: −4x^(−1) → d/dx = −4·(−1)x^(−2) = +4/x².
- **INCORRECT** → Student applies power rule without rewriting 1/x: writes d/dx(4/x)=4/1=4. Redirect: "Rewrite 4/x as 4x^(−1), then apply the power rule."
- **NO_RESPONSE** → Prompt: "First rewrite 4/x as a power of x with a negative exponent. What is 1/x in power form?"

---

### Teaching Action A03 — Scope and Limits: What the Rules Can and Cannot Do

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Clarify exactly where the power rule applies and where it does not (MC-1); preview that products need a different approach; establish the full scope of this blueprint's toolset

---

**[P06 — CONTRAST PAIR]**

**Contrast A: Power function vs. Exponential function**

| | Power function xⁿ | Exponential function aˣ |
|-|------------------|------------------------|
| Variable | BASE (x) | EXPONENT (x) |
| Constant | EXPONENT (n) | BASE (a) |
| Derivative | nxⁿ⁻¹ (power rule ✓) | aˣ·ln(a) (NOT power rule ✗) |
| Example | d/dx(x³) = 3x² | d/dx(eˣ) ≠ xeˣ⁻¹; d/dx(eˣ) = eˣ |

**Warning:** eˣ, 2ˣ, 10ˣ are NOT power functions. They are exponential functions. The power rule does not apply to them. Writing d/dx(eˣ)=xeˣ⁻¹ is one of the most common errors in calculus — avoid it by checking: "Is the base the variable? Is the exponent a constant?" Only if both: yes → power rule.

**Contrast B: Sum/Difference rule (applies) vs Products (requires care)**

| Expression | Approach | Result |
|-----------|----------|--------|
| x² + x³ | Sum rule → term-by-term | 2x + 3x² ✓ |
| x² · x³ | **Simplify first**: x²·x³=x⁵ → power rule | 5x⁴ ✓ |
| 2x · x³ | Simplify first: 2x⁴ → power rule | 8x³ ✓ |
| x² · sin(x) | Cannot simplify → needs Product Rule (future) | — |

**At this level:** When two power functions multiply, simplify to a single power first, then differentiate. Applying d/dx(f·g)=f'·g' is WRONG (that gives (2x)(3x²)=6x³ for x²·x³, but the correct answer is 5x⁴). The Product Rule (f'g+fg') is the future fix, but rewriting the product first is simpler and always works when both factors are power functions of x.

**The four rules together cover:** any polynomial, any rational function (after rewriting), any function built from sums and differences of power terms. They do NOT cover products of non-simplifiable functions, compositions (chain rule), trigonometric, exponential, or logarithmic functions.

---

**[P49 — ADAPTIVE CHECKPOINT]**

Which of these can be differentiated using only the rules from this blueprint? For those that can, find the derivative.
(i) h(x) = (x²+1)/x   (ii) k(x) = x²·eˣ   (iii) m(x) = 3x⁴−√x

- **CORRECT** → (i) Rewrite: x+x^(−1) → h'=1−x^(−2)=1−1/x². ✓ Power rule after rewriting. (ii) Cannot simplify x²·eˣ — needs product rule (future); d/dx(x²·eˣ) ≠ 2x·eˣ (that's wrong). (iii) 3x⁴−x^(1/2) → m'=12x³−(1/2)x^(−1/2). ✓
- **PARTIAL** → Student handles (i) and (iii) but writes (ii)=2xeˣ. Address: "Is eˣ a power function? No — eˣ has x in the exponent. The power rule doesn't apply to eˣ."
- **INCORRECT** → Student applies power rule to eˣ: d/dx(x²eˣ)=2x·xeˣ⁻¹=2x²eˣ⁻¹. Full MC-1 repair needed via B-MC1.
- **NO_RESPONSE** → Prompt: "For (x²+1)/x, try splitting the fraction: (x²+1)/x = x²/x + 1/x = x + 1/x. Now differentiate."

---

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Purpose:** Assess fluent application of all four rules including non-integer powers and scope awareness

---

**[P77 — MULTI-PROBLEM SET]** *(4 items)*

**Item 1:** Differentiate f(x) = 7x⁴ − 3x² + x − 9.

*Solution:*
f'(x) = 7·4x³ − 3·2x + 1 − 0 = **28x³ − 6x + 1**

**Item 2:** Differentiate g(x) = 2x^(3/2) − 4x^(−1) + 6.

*Solution:*
g'(x) = 2·(3/2)x^(1/2) − 4·(−1)x^(−2) + 0 = **3x^(1/2) + 4x^(−2) = 3√x + 4/x²**

**Item 3:** Differentiate h(x) = (x²+1)/x (rewrite first).

*Solution:*
h(x) = x²/x + 1/x = x + x^(−1)
h'(x) = 1 + (−1)x^(−2) = **1 − 1/x²**

**Item 4:** True or false (with explanation): d/dx(e^x) = x·e^(x−1).

*Solution:*
**False.** The power rule d/dx(xⁿ)=nxⁿ⁻¹ applies when the BASE is the variable x and the EXPONENT is a constant. In eˣ, the BASE (e) is a constant and the EXPONENT (x) is the variable — the power rule does not apply. The correct derivative is d/dx(eˣ)=eˣ (a distinct rule, established later).

---

**[P55 — SCORE]** Count correct items (Items 1–4). Running total: _/4.

---

**[P76 — TRANSFER PROBE]** *(independence mode)*

A ball is thrown upward. Its height in metres is:
$$s(t) = -4.9t^2 + 20t + 1.5, \quad t \geq 0$$

**(a)** Use the differentiation rules (not the limit definition) to find the velocity function v(t) = s'(t).

**(b)** Find the initial velocity v(0). What does it represent physically?

**(c)** Find the time t* when the ball momentarily stops (v(t*)=0).

**(d)** Find the maximum height. Compute s(t*).

**(e)** Does the power rule apply to −4.9t²? Would it apply to a term like e^t if it appeared? Explain the difference in one sentence each.

---

*Expected solution:*

(a) s(t)=−4.9t²+20t+1.5
v(t) = s'(t) = −4.9·2t + 20·1 + 0 = **−9.8t + 20**

(b) v(0) = 20 m/s. This is the launch speed of the ball at t=0.

(c) v(t*)=0 → −9.8t*+20=0 → t* = 20/9.8 ≈ **2.04 s**

(d) s(t*) = −4.9·(20/9.8)² + 20·(20/9.8) + 1.5
= −4.9·(400/96.04) + 400/9.8 + 1.5
= −4.9·4.163 + 40.816 + 1.5
≈ −20.40 + 40.82 + 1.5 ≈ **21.9 m**

(e) −4.9t²: base=t (variable), exponent=2 (constant) → **power rule applies**. If e^t appeared: base=e (constant), exponent=t (variable) → **power rule does NOT apply** (e^t is an exponential function, not a power function).

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

- **PASS (5/5):** Concept mastered. Proceed to math.calc.product-rule, math.calc.quotient-rule, and math.calc.chain-rule.
- **FAIL:** Diagnose: Item 4 failed or (e) wrong → B-MC1 (exponential confusion). Items 1–3 coefficient errors → B-MC2. Product simplification wrong → B-MC3. After repair, re-enter A04.

---

**[P55 — SCORE]** Log routing outcome.

---

**[P78 — COMPLETION]**

Session complete for math.calc.derivative-rules. MAMR 5/5 required; student has either passed (unlocking product/quotient/chain rules) or been routed to repair.

---

## Component 5 — Protocol B (Repair Sequences)

### B-MC1 — Repair: POWER-RULE-FOR-EXPONENTIAL

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You applied d/dx(xⁿ)=nxⁿ⁻¹ to eˣ. The power rule only works when the BASE is the variable (x) and the EXPONENT is a constant number. In eˣ, those roles are reversed — the exponent is x and the base (e) is constant."

**[P41 — MISCONCEPTION DETECTOR]**
Apply the proposed rule d/dx(eˣ)=xeˣ⁻¹ and check it at x=1: gives 1·e⁰=1. But from the definition: [e^(1+h)−e^1]/h = e^1·[e^h−1]/h → e (since [e^h−1]/h→1 as h→0). The proposed rule gives 1; the definition gives e≈2.718. The formula is wrong.

**[P64 — CONCEPTUAL SHIFT]**
Two entirely different families of functions:

| | Power function | Exponential function |
|-|---------------|---------------------|
| Form | x^c (c constant) | c^x (c constant) |
| Examples | x², x^(1/2), x^(−3) | eˣ, 2ˣ, 10ˣ |
| Derivative | c·x^(c−1) (power rule) | c^x·ln(c) (separate rule) |

Check before applying power rule: "Is the base the variable?" If no → power rule does not apply.

---

### B-MC2 — Repair: COEFFICIENT-MULTIPLICATION-OMITTED

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote d/dx(3x²)=2x, dropping the 3. The constant multiple rule says d/dx(cf)=c·f' — the constant factor c multiplies the derivative of f, it doesn't disappear."

**[P41 — MISCONCEPTION DETECTOR]**
Verify numerically: f(x)=3x². f(2)=12; f(2.001)=3·(2.001)²=3·4.004001=12.012003. Slope ≈ (12.012003−12)/0.001 = 12.003 ≈ 12. But your answer 2x gives 2·2=4 at x=2. Correct answer 6x gives 6·2=12. The numerical check matches 12, not 4.

**[P64 — CONCEPTUAL SHIFT]**
Think of it as: f(x)=3·(x²). The 3 is a fixed scaling factor — it stretches the function vertically by 3. This also stretches the slope by 3. Derivative of x² is 2x; derivative of 3x² is 3 times larger: 3·2x=6x. The coefficient multiplies the rate of change, it doesn't vanish.

---

### B-MC3 — Repair: DISTRIBUTING-DERIVATIVE-OVER-PRODUCTS

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You applied d/dx(f·g)=f'·g'. Derivatives do NOT distribute over products the way they distribute over sums. The sum rule d/dx(f+g)=f'+g' is special — it does NOT extend to multiplication."

**[P41 — MISCONCEPTION DETECTOR]**
Test on x²·x³=x⁵. Your formula: d/dx(x²)·d/dx(x³)=2x·3x²=6x³. But x²·x³=x⁵, so d/dx(x⁵)=5x⁴. These differ: 6x³≠5x⁴. At x=2: 6·8=48 vs 5·16=80. The formula f'·g' gives the wrong answer.

**[P64 — CONCEPTUAL SHIFT]**
At this level, when both factors are power functions: combine them first using exponent rules (x^a·x^b=x^(a+b)), then differentiate the single resulting power. For x²·x³: combine to x⁵, then differentiate to 5x⁴. When the factors cannot be combined (like x²·sin(x)), a new rule — the Product Rule — is needed (upcoming blueprint). The sum rule is a special property of linearity; products do not have it.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Interval | Prompt |
|----------|--------|
| Day 1 | Differentiate f(x)=5x³−3x^(1/2)+2/x. [f'=15x²−(3/2)x^(−1/2)−2x^(−2)] |
| Day 3 | True/False: d/dx(x·eˣ)=eˣ+x·eˣ. (True — this uses the product rule, but the student cannot verify yet; mark for revisit after product rule) |
| Day 7 | f(x)=(x³−2x)/x for x≠0: simplify, then differentiate. [x²−2 → 2x] |
| Day 14 | At what value of x does the tangent to f(x)=x³−3x have slope 0? [f'=3x²−3=0 → x=±1] |

---

## Component 7 — Cross-Blueprint Dependencies

### Prerequisite Blueprints Required
| Concept ID | Blueprint Status | Dependency |
|------------|-----------------|------------|
| math.calc.derivative-definition | PACKAGE_READY | The definition is the source from which A01's Stage C derives the power rule pattern |

### Blueprints This Unlocks
| Concept ID | Dependency |
|------------|------------|
| math.calc.product-rule | Requires power rule fluency and understanding of rule scope |
| math.calc.quotient-rule | Requires power rule and constant multiple rule |
| math.calc.chain-rule | Requires fluency with basic differentiation rules |

### Cross-Links
*(none — cross_links field is empty in the KG)*

---

## Component 8 — Teaching Notes

**Derive before stating:** A01's Stage C uses the definition to get d/dx(x²)=2x and d/dx(x³)=3x² before announcing the power rule. Students who see the rule emerge from two worked examples remember it structurally ("bring the exponent down, reduce by 1") rather than as an arbitrary formula. The Stage P table reinforces the pattern visually.

**MC-1 is the highest-stakes error:** Applying d/dx(eˣ)=xeˣ⁻¹ propagates through all future calculus — chain rule, integration by parts, differential equations — as a persistent source of wrong answers. A03's contrast table (power function vs. exponential function) with the two-question check ("Is the base the variable? Is the exponent a constant?") should be referenced every time eˣ appears for the first few weeks.

**Rewrite-first is a discipline, not a technique:** WE2 (A02) models writing x^(1/2) and 3x^(−2) explicitly before differentiating. Students who skip this step consistently make sign errors on d/dx(1/x) or reduce-power errors on d/dx(√x). Requiring the rewritten form as a visible intermediate step eliminates these.

**P76 connects rules to physics:** The projectile problem ties the abstract derivative-rules to the concrete velocity=slope narrative from the prerequisite blueprint (math.calc.derivative-definition), and part (e) forces the student to articulate the power/exponential distinction in their own words — a strong retention technique.

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
| V-11 | GR-10: MAMR=5/5 stated and enforced (thresh=0.9, n=5: ⌈0.9×5⌉=5) | PASS |
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
