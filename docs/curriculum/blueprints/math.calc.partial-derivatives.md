<!-- BLUEPRINT: math.calc.partial-derivatives -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Partial Derivatives
**Concept ID:** `math.calc.partial-derivatives`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=8 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.calc.partial-derivatives |
| name | Partial Derivatives |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 8 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.calc.multivariable-intro |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.calc.multivariable-intro**: f(x,y) has a 2D domain and a 3D surface graph; limits require all-path agreement; level curves f(x,y)=c; single-variable calculus derivatives carried into 2D space

### Target Knowledge State
Student understands that ∂f/∂x is the derivative of f(x,y) with respect to x when y is treated as a constant parameter — geometrically, it is the slope of the tangent line to the surface in the x-direction; fluently computes ∂f/∂x and ∂f/∂y for polynomial, exponential, and trigonometric functions using all single-variable rules; computes second-order partials f_{xx}, f_{yy}, f_{xy} and verifies Clairaut's theorem (f_{xy}=f_{yx} when both are continuous); and applies partial derivatives to compute rates of change in applied settings.

### Conceptual Obstacles
1. When computing ∂f/∂x, accidentally differentiating the y-terms — writing d/dx(y²)=2y instead of recognising y²=constant and d/dx(y²)=0
2. Believing mixed partials f_{xy} and f_{yx} are always different — in practice (with continuous mixed partials), Clairaut's theorem guarantees equality; the order of differentiation does not matter
3. Confusing ∂f/∂x (rate of change in the pure x-direction, y held fixed) with the total rate of change along an arbitrary path through (x,y)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | OTHER-VARIABLE-TREATED-AS-VARIABLE | When computing ∂f/∂x, student differentiates y-containing terms with respect to y (e.g., d/dx(3y²)=6y instead of 0) | Any term mixing x and y; especially y², y³, eʸ, sin(y) when computing ∂/∂x |
| MC-2 | MIXED-PARTIALS-NONCOMMUTATIVE | Student believes f_{xy} ≠ f_{yx} and computes them expecting different results; misses Clairaut's theorem | Second-order partial problems; "does the order matter?" questions |
| MC-3 | PARTIAL-IS-TOTAL-DERIVATIVE | Student treats ∂f/∂x as the full rate of change of f along any path; misses that ∂f/∂x is specifically the x-directional rate with y frozen | Word problems asking for "rate of change"; comparison with directional derivatives |

**Foundational Misconception:** MC-1 (OTHER-VARIABLE-TREATED-AS-VARIABLE) — every partial derivative calculation fails if the held variable is accidentally differentiated; addressed in A01 with explicit labelling of "held constants."

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner evaluates a specific function with one variable numerically frozen before abstracting to the general rule.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: fix y=2 in f(x,y)=x²y+3y² and differentiate in x; then fix x=1 and differentiate in y; observe that y² contributes 0 to ∂/∂x; P: geometric tangent-line diagram showing surface slices; A: limit definition and computational rule (treat other variable as constant)
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: polynomial with mixed terms; WE2: product of trig and exponential functions
3. **A03 P06 CONTRAST PAIR** — second-order partials; Clairaut's theorem; ∂f/∂x vs total rate of change
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — What Partial Derivatives Measure

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Establish that ∂f/∂x treats y as a constant; show the geometric meaning (slope of surface slice); state the computational rule; address MC-1 and MC-3

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (freeze one variable, differentiate in the other):**

Let f(x,y) = x²y + 3y².

**Computing ∂f/∂x:** Fix y = 2 (a specific number). The function becomes:
$$f(x, 2) = x^2 \cdot 2 + 3 \cdot 4 = 2x^2 + 12$$

Now differentiate in x (this is a single-variable function of x):
$$\frac{d}{dx}(2x^2 + 12) = 4x$$

So ∂f/∂x|_{y=2} = 4x. For general y: **∂f/∂x = 2xy** (treating y as a constant multiplier).

**Computing ∂f/∂y:** Fix x = 1. The function becomes:
$$f(1, y) = 1 \cdot y + 3y^2 = y + 3y^2$$

Differentiate in y: d/dy(y + 3y²) = 1 + 6y.

So ∂f/∂y|_{x=1} = 1+6y. For general x: **∂f/∂y = x² + 6y** (treating x as a constant).

Critical observation: When computing ∂f/∂x, the term 3y² is a constant in x (y is frozen). Its x-derivative is **0**, not 6y. Many students write 6y — this is the foundational error.

**Stage P — Pictorial (surface tangent lines):**

The surface z=f(x,y) is a 3D object. At a point (x₀,y₀):
- ∂f/∂x(x₀,y₀) = slope of the curve on the surface obtained by cutting with the plane y=y₀ (an x-slice)
- ∂f/∂y(x₀,y₀) = slope of the curve obtained by cutting with x=x₀ (a y-slice)

These are two different tangent lines at the same point on the surface — one pointing in the x-direction, one in the y-direction.

**Stage A — Algebraic (formal definition and computational rule):**

**Limit definition:**
$$\frac{\partial f}{\partial x}(x,y) = \lim_{h\to 0} \frac{f(x+h,y)-f(x,y)}{h}$$

(y is fixed; this is exactly the single-variable limit with y as a parameter.)

**Computational rule:** Treat all variables other than the one being differentiated as constants, then apply all standard single-variable differentiation rules.

**Notation:** ∂f/∂x = fₓ = f_x = D₁f (first partial with respect to x).

| Example | ∂/∂x | ∂/∂y |
|---------|-------|-------|
| x²y | 2xy | x² |
| x³y² | 3x²y² | 2x³y |
| sin(x)·cos(y) | cos(x)·cos(y) | −sin(x)·sin(y) |
| eˣʸ | y·eˣʸ | x·eˣʸ |
| x²+y² | 2x | 2y |

---

**[P49 — ADAPTIVE CHECKPOINT]**

f(x,y) = 3x²y³ − 7y². Find ∂f/∂x.

- **CORRECT** → ∂f/∂x = 3·2x·y³ − 0 = 6xy³. (The term −7y² is constant in x → derivative is 0.) Affirm: "Correct — y³ is a constant multiplier, and −7y² vanishes."
- **PARTIAL** → Student writes 6xy³−14y. They differentiated −7y² with respect to y (getting −14y) instead of treating y as constant. Address: "When computing ∂/∂x, y is held fixed. 7y² does not change as x changes — it contributes 0."
- **INCORRECT** → Student writes 6xy³−7 or 6x·3y². Redirect with concrete substitution: "Set y=2. f(x,2)=3x²·8−7·4=24x²−28. Now differentiate in x: 48x. Does your formula give 48x when y=2?"
- **NO_RESPONSE** → Prompt: "Replace y with the number 2 everywhere. Now f is a function of x only. Differentiate that function. This is ∂f/∂x at y=2, which tells us the general ∂f/∂x formula."

---

### Teaching Action A02 — Worked Examples

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Model partial differentiation for polynomial-exponential and product-trig functions; reinforce the "freeze the other variable" discipline

---

**[P07 — WORKED EXAMPLE PAIR]**

**WE1 — Polynomial with mixed terms: f(x,y) = x³y + 2x²y² − 5xy + 3**

*Finding ∂f/∂x (y is a constant parameter):*

| Term | Treatment | ∂/∂x |
|------|-----------|-------|
| x³y | y = constant; d/dx(x³) = 3x² | 3x²y |
| 2x²y² | y² = constant multiplier; d/dx(2x²) = 4x | 4xy² |
| −5xy | y = constant; d/dx(−5x) = −5 | −5y |
| 3 | constant | 0 |

$$\frac{\partial f}{\partial x} = 3x^2y + 4xy^2 - 5y$$

*Finding ∂f/∂y (x is a constant parameter):*

| Term | Treatment | ∂/∂y |
|------|-----------|-------|
| x³y | x³ = constant; d/dy(y) = 1 | x³ |
| 2x²y² | x² = constant; d/dy(2y²) = 4y | 4x²y |
| −5xy | x = constant; d/dy(−5y) = −5 | −5x |
| 3 | constant | 0 |

$$\frac{\partial f}{\partial y} = x^3 + 4x^2y - 5x$$

*Cross-check:* At (1,1): ∂f/∂x = 3+4−5=2; ∂f/∂y = 1+4−5=0.

---

**WE2 — Products with trig and exponential: g(x,y) = x²sin(y) + cos(x)·y³**

*Finding ∂g/∂x:*
- x²sin(y): sin(y)=constant; d/dx(x²sin(y))=2x·sin(y)
- cos(x)·y³: y³=constant; d/dx(cos(x))=−sin(x); result=−sin(x)·y³

$$\frac{\partial g}{\partial x} = 2x\sin(y) - y^3\sin(x)$$

*Finding ∂g/∂y:*
- x²sin(y): x²=constant; d/dy(sin(y))=cos(y); result=x²cos(y)
- cos(x)·y³: cos(x)=constant; d/dy(y³)=3y²; result=3y²cos(x)

$$\frac{\partial g}{\partial y} = x^2\cos(y) + 3y^2\cos(x)$$

*At (π/2, π/2):* sin(π/2)=1, cos(π/2)=0.
∂g/∂x|_{(π/2,π/2)} = 2·(π/2)·1 − (π/2)³·1 = π − π³/8
∂g/∂y|_{(π/2,π/2)} = (π/2)²·0 + 3·(π/2)²·0 = 0

---

**[P49 — ADAPTIVE CHECKPOINT]**

h(x,y) = eˣ·y² + x·ln(y) (assume y>0). Find hₓ and h_y.

- **CORRECT** → hₓ = eˣ·y² + ln(y) (treat y² and ln(y) as constants w.r.t. x; eˣ differentiates to eˣ; x differentiates to 1). h_y = eˣ·2y + x·(1/y) = 2yeˣ + x/y (treat eˣ and x as constants; y² → 2y; ln(y) → 1/y).
- **PARTIAL** → Student may write hₓ=eˣ·2y (differentiated y² in x). Address: "When finding ∂/∂x, y² is a constant. Only eˣ and the x in x·ln(y) change."
- **INCORRECT** → Various errors. Use the freeze-and-check: "Set y=1. h(x,1)=eˣ·1+x·0=eˣ. So ∂h/∂x at y=1 is eˣ. Does your formula give eˣ when y=1?"
- **NO_RESPONSE** → Prompt: "Start with hₓ. Treat y as a constant. The first term is eˣ·y². What is d/dx(eˣ·y²) when y is fixed?"

---

### Teaching Action A03 — Second-Order Partials and Clairaut's Theorem

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Introduce second-order partials; establish Clairaut's theorem (f_{xy}=f_{yx}); contrast ∂f/∂x with the total derivative; address MC-2

---

**[P06 — CONTRAST PAIR]**

**Second-order partial derivatives:**

From f(x,y), four second-order partials exist:
- f_{xx} = ∂²f/∂x² = ∂/∂x(∂f/∂x): differentiate ∂f/∂x with respect to x
- f_{yy} = ∂²f/∂y²: differentiate ∂f/∂y with respect to y
- f_{xy} = ∂²f/∂x∂y = ∂/∂x(∂f/∂y): differentiate ∂f/∂y with respect to x
- f_{yx} = ∂²f/∂y∂x = ∂/∂y(∂f/∂x): differentiate ∂f/∂x with respect to y

**Clairaut's theorem:** If f_{xy} and f_{yx} are both continuous on an open region, then f_{xy} = f_{yx} throughout that region.

*Example — verify for f(x,y) = x³y²:*
- f_x = 3x²y²; f_{xy} = ∂/∂y(3x²y²) = 6x²y
- f_y = 2x³y; f_{yx} = ∂/∂x(2x³y) = 6x²y ✓ Equal.

| f_{xy} computation | f_{yx} computation |
|-------------------|-------------------|
| Start with f_y, then differentiate in x | Start with f_x, then differentiate in y |
| f_y = 2x³y → f_{yx} = ∂/∂x = 6x²y | f_x = 3x²y² → f_{xy} = ∂/∂y = 6x²y |
| **Same result** ✓ | **Same result** ✓ |

In practice (for smooth functions encountered in calculus): f_{xy}=f_{yx} always. You can compute either order; choose whichever is easier.

**Partial derivative vs. total rate of change:**

| | Partial derivative ∂f/∂x | Rate of change along path (x(t),y(t)) |
|-|--------------------------|---------------------------------------|
| What varies? | Only x (y is frozen) | Both x and y change simultaneously |
| Formula | ∂f/∂x (from definition) | df/dt = (∂f/∂x)·(dx/dt) + (∂f/∂y)·(dy/dt) (chain rule) |
| Interpretation | Slope of surface in x-direction | Total rate of change along the path |

The total derivative combines both partials, weighted by how fast x and y are changing along the path. ∂f/∂x alone captures only the x-contribution.

---

**[P49 — ADAPTIVE CHECKPOINT]**

f(x,y) = x²y + eˣʸ. Find f_{xy} and verify it equals f_{yx}.

- **CORRECT** → f_x = 2xy + y·eˣʸ; f_{xy} = 2x + eˣʸ + xy·eˣʸ = 2x + (1+xy)eˣʸ.
  f_y = x² + x·eˣʸ; f_{yx} = 2x + eˣʸ + x²y·... wait, ∂/∂y(x·eˣʸ)=x·x·eˣʸ=x²eˣʸ? No: f_y=x²+x·eˣʸ; f_{yx}=∂/∂x(x²+x·eˣʸ)=2x+(eˣʸ+x·y·eˣʸ)=2x+(1+xy)eˣʸ ✓ Equal.
- **PARTIAL** → Student computes f_{xy} correctly but not f_{yx}. Prompt: "Now start from f_y=x²+xeˣʸ and differentiate in x."
- **INCORRECT** → Student confuses f_{xy} with (f_x)·(f_y) or tries to differentiate f twice in the same variable. Redirect: "f_{xy} means: first differentiate in y to get f_y, then differentiate that result in x."
- **NO_RESPONSE** → Prompt: "Step 1: find f_y (treat x as constant). Step 2: differentiate f_y with respect to x. This gives f_{yx}."

---

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)

---

**[P77 — MULTI-PROBLEM SET]** *(4 items)*

**Item 1:** f(x,y) = 3x²y − 2xy³ + 5y. Find ∂f/∂x and ∂f/∂y.

*Solution:*
∂f/∂x = 6xy − 2y³
∂f/∂y = 3x² − 6xy² + 5

**Item 2:** g(x,y) = x²sin(y) + cos(x)·y². Find g_x and g_y.

*Solution:*
g_x = 2xsin(y) − sin(x)·y²
g_y = x²cos(y) + 2y·cos(x)

**Item 3:** f(x,y) = x³y² + 4xy. Find f_{xx} and f_{xy}; verify f_{xy}=f_{yx}.

*Solution:*
f_x = 3x²y² + 4y → f_{xx} = 6xy²; f_{xy} = ∂/∂y(3x²y²+4y) = 6x²y + 4
f_y = 2x³y + 4x → f_{yx} = ∂/∂x(2x³y+4x) = 6x²y + 4 ✓

**Item 4:** h(x,y,z) = x²yz − 2xz³. Find ∂h/∂x, ∂h/∂y, ∂h/∂z.

*Solution:*
∂h/∂x = 2xyz − 2z³
∂h/∂y = x²z
∂h/∂z = x²y − 6xz²

---

**[P55 — SCORE]** Count correct items (Items 1–4). Running total: _/4.

---

**[P76 — TRANSFER PROBE]** *(independence mode)*

The temperature at a point (x,y) in a metal plate is modelled by:
$$T(x,y) = 100\,e^{-(x^2+y^2)/4}$$

**(a)** Find ∂T/∂x and ∂T/∂y. (Use the chain rule for the exponential.)

**(b)** Evaluate ∂T/∂x and ∂T/∂y at (2,0). Interpret physically: in which direction is temperature decreasing most rapidly from (2,0)?

**(c)** Find the mixed partial ∂²T/∂x∂y.

**(d)** Find ∂²T/∂y∂x and verify it equals ∂²T/∂x∂y.

---

*Expected solution:*

(a) Let u = −(x²+y²)/4. Then T=100eᵘ.
∂T/∂x = 100·eᵘ·(∂u/∂x) = 100·e^{−(x²+y²)/4}·(−2x/4) = **−50x·e^{−(x²+y²)/4}**
∂T/∂y = 100·e^{−(x²+y²)/4}·(−2y/4) = **−50y·e^{−(x²+y²)/4}**

(b) At (2,0):
∂T/∂x|(2,0) = −50·2·e^{−4/4} = −100e^{−1} ≈ −36.8 (°C per unit in x-direction)
∂T/∂y|(2,0) = −50·0·e^{−1} = 0 (no change in y-direction from this point on the x-axis)

Temperature decreases as we move in the +x direction from (2,0); it is locally flat in the y-direction (by symmetry, the point (2,0) is on the x-axis where the temperature distribution is symmetric).

(c) ∂²T/∂x∂y = ∂/∂y[∂T/∂x] = ∂/∂y[−50x·e^{−(x²+y²)/4}]
= −50x·e^{−(x²+y²)/4}·(−2y/4) = **25xy·e^{−(x²+y²)/4}**

(d) ∂²T/∂y∂x = ∂/∂x[∂T/∂y] = ∂/∂x[−50y·e^{−(x²+y²)/4}]
= −50y·e^{−(x²+y²)/4}·(−2x/4) = **25xy·e^{−(x²+y²)/4}** ✓ Equal.

Clairaut's theorem confirmed: T(x,y)=100e^{−(x²+y²)/4} has continuous second partials everywhere, so the mixed partials must agree — and they do.

---

**[P55 — SCORE]** Score P76 (0 or 1). Running total: _/5.

---

**[P75 — MASTERY ASSESSMENT]** MAMR = 4/5.

- Score ≥ 4/5 → PASS → proceed to P74.
- Score < 4/5 → FAIL → P74 routes to repair.

---

**[P55 — SCORE]** Record final pass/fail.

---

**[P74 — ROUTING DECISION]**

- **PASS (≥4/5):** Concept mastered. Proceed to math.calc.gradient, math.calc.directional-derivative, math.calc.chain-rule-multivariable.
- **FAIL:** Diagnose: MC-1 errors (differentiating held variable) → B-MC1. Mixed partial order confusion → B-MC2. Total vs partial confusion → B-MC3.

---

**[P55 — SCORE]** Log routing outcome.

---

**[P78 — COMPLETION]**

Session complete for math.calc.partial-derivatives.

---

## Component 5 — Protocol B (Repair Sequences)

### B-MC1 — Repair: OTHER-VARIABLE-TREATED-AS-VARIABLE

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"When computing ∂f/∂x, you differentiated the y-terms. In partial differentiation, y is held fixed — it behaves like a constant number, not a variable. d/dx(y²)=0, not 2y."

**[P41 — MISCONCEPTION DETECTOR]**
f(x,y)=3x²y². You wrote ∂f/∂x=6xy·2y=12xy². Substitute y=2: f(x,2)=3x²·4=12x². Differentiate: d/dx(12x²)=24x. Your formula gives 12x·2=24x. Now try y=3: f(x,3)=27x². d/dx=54x. Your formula gives 12x·3=36x. These disagree (54≠36). The error is the second factor 2y — y² is a constant, so d/dx(3x²·y²)=6x·y² (not 6xy·2y).

**[P64 — CONCEPTUAL SHIFT]**
In ∂f/∂x, y is not a variable — it is a frozen number whose value we don't happen to know. Think of it as an unspecified constant c. If f(x,c)=3x²c², then d/dx(f)=6x·c². Replace c back with y: ∂f/∂x=6x·y². This is the correct answer. Treat y (and all non-x variables) exactly as you would a numeric constant when computing ∂/∂x.

---

### B-MC2 — Repair: MIXED-PARTIALS-NONCOMMUTATIVE

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You expected f_{xy} and f_{yx} to give different results. For smooth functions (continuous mixed partials), Clairaut's theorem guarantees f_{xy}=f_{yx}. The order of differentiation does not matter."

**[P41 — MISCONCEPTION DETECTOR]**
f(x,y)=x²y³. f_x=2xy³; f_{xy}=∂/∂y(2xy³)=6xy². f_y=3x²y²; f_{yx}=∂/∂x(3x²y²)=6xy². Same. Try f(x,y)=sin(xy): f_x=y·cos(xy); f_{xy}=cos(xy)−xy·sin(xy). f_y=x·cos(xy); f_{yx}=cos(xy)−xy·sin(xy). Same again. This is always the case for smooth f.

**[P64 — CONCEPTUAL SHIFT]**
Clairaut's theorem is a deep result: the order you differentiate in doesn't matter for well-behaved functions. The notation f_{xy} means "first y, then x" (reading left to right in subscripts: f_{xy}=∂/∂x(f_y)), while f_{yx}=∂/∂y(f_x). Both give the same result. Choose whichever order produces simpler intermediate expressions.

---

### B-MC3 — Repair: PARTIAL-IS-TOTAL-DERIVATIVE

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"∂f/∂x is the rate of change of f only in the x-direction, with y held fixed. It does not capture how f changes along an arbitrary path where both x and y vary simultaneously."

**[P41 — MISCONCEPTION DETECTOR]**
f(x,y)=x²+y². Moving along the path x=t, y=t: df/dt = d/dt(t²+t²)=4t. But ∂f/∂x = 2x = 2t. These differ (4t ≠ 2t): the total rate of change along the diagonal path is 4t, but the partial in x alone is 2t. The missing 2t comes from the y-component: ∂f/∂y·(dy/dt)=2y·1=2t. Total = 2t+2t=4t ✓.

**[P64 — CONCEPTUAL SHIFT]**
Moving through ℝ² along a path, both x and y change. The total rate df/dt combines both: df/dt=(∂f/∂x)·(dx/dt)+(∂f/∂y)·(dy/dt). This is the multivariable chain rule. The partial ∂f/∂x is only one piece — it answers "how fast does f change if ONLY x moves?" In practice, you often need both partials together to answer "how fast does f change along this specific path?"

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Interval | Prompt |
|----------|--------|
| Day 1 | f(x,y)=x⁴y²−3xy+7. Find f_x and f_y. [f_x=4x³y²−3y; f_y=2x⁴y−3x] |
| Day 3 | g(x,y)=e^{x+2y}. Find g_{xx} and g_{xy}. [g_x=e^{x+2y}; g_{xx}=e^{x+2y}; g_{xy}=2e^{x+2y}] |
| Day 7 | f(x,y)=x²/(x²+y²). Find f_x (simplify fully). [Product/quotient: f_x=(2x(x²+y²)−x²·2x)/(x²+y²)²=2xy²/(x²+y²)²] |
| Day 14 | True/False: if f(x,y) is differentiable at (a,b), then ∂f/∂x and ∂f/∂y both exist at (a,b). [True. But the converse fails: partials can exist without differentiability.] |

---

## Component 7 — Cross-Blueprint Dependencies

### Prerequisite Blueprints Required
| Concept ID | Blueprint Status | Dependency |
|------------|-----------------|------------|
| math.calc.multivariable-intro | PACKAGE_READY | 2D domain, surface graphs, 2D limits — conceptual foundation for partial differentiation |

### Blueprints This Unlocks
| Concept ID | Dependency |
|------------|------------|
| math.calc.gradient | Requires both partial derivatives (gradient = (∂f/∂x, ∂f/∂y)) |
| math.calc.directional-derivative | Requires partial derivatives via dot product formula |
| math.calc.chain-rule-multivariable | Requires both partials for the chain rule formula |

### Cross-Links
*(none — cross_links field is empty in the KG)*

---

## Component 8 — Teaching Notes

**The freeze-and-check method:** The most reliable way to teach MC-1 repair is to have students literally substitute a specific number for the held variable, differentiate the resulting single-variable function, and then check that their general formula matches at that number (as modelled in A01 Stage C and the P49 hints). This makes "y is a constant" visceral rather than abstract.

**Notation clarity:** Students encounter four notations for the same thing: ∂f/∂x, fₓ, f_x, D₁f. Standardise to ∂f/∂x in A01, then introduce fₓ in WE1, and note all notations are equivalent. The subscript notation (f_{xy}) is especially useful for second-order partials.

**Clairaut's theorem as a practical tool:** Students who are told "it doesn't matter which order you differentiate in" gain flexibility — they can choose the easier order. For instance, to compute f_{xy} for a complicated f, it may be easier to compute f_x first (if simpler) or f_y first (if that leads to a simpler intermediate). Clairaut makes both valid.

**P76 as an applied capstone:** The temperature distribution T=100e^{−(x²+y²)/4} (a Gaussian) appears naturally in heat diffusion, signal processing, and statistics (2D normal distribution). The computation requires the chain rule for exponentials in partial differentiation — a preview of the skills needed for the gradient and chain rule in multivariable calculus. The mixed partial computation also provides a complete worked Clairaut verification.

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
| V-11 | GR-10: MAMR=4/5 stated and enforced (thresh=0.8, n=5: ⌈0.8×5⌉=4) | PASS |
| V-12 | PASS criterion (≥4/5) stated in P75 and P74 | PASS |
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
