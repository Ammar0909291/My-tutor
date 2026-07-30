# Blueprint: math.de.variation-of-parameters

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.variation-of-parameters |
| name | Variation of Parameters |
| Domain | math.de |
| Difficulty | advanced |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.de.wronskian, math.de.second-order-homogeneous, math.calc.integration-by-parts |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student derives and applies the variation of parameters formula for a second-order linear ODE ay'' + by' + cy = g(x): given the homogeneous solutions y₁, y₂ (with Wronskian W), finds the particular solution yₚ = −y₁∫(y₂g/aW)dx + y₂∫(y₁g/aW)dx; evaluates the required integrals; and forms the general solution y = yₕ + yₚ. The student also recognises that this method applies to any g(x) (including tan x, ln x, 1/x) where undetermined coefficients fails.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw yₚ = u₁(x)y₁ + u₂(x)y₂ as a "blueprint" with two dashed boxes u₁, u₂ to be determined; show the Wronskian W=y₁y₂'−y₂y₁' as the key determinant; then display the formulas u₁'=−y₂g/aW and u₂'=y₁g/aW in boxed form; annotate: "We 'vary' the constants C₁, C₂ of yₕ into functions u₁(x), u₂(x); two constraints (the ODE + one extra) give two equations")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | FORGETTING-THE-LEADING-COEFFICIENT | Student applies the formula yₚ=−y₁∫(y₂g/W)dx + y₂∫(y₁g/W)dx without dividing g by the leading coefficient a when a≠1; gets an answer off by a factor of 1/a | Type 5 — instruction-induced (the formula is often stated for the monic form y''+Py'+Qy=f where the leading coefficient is 1; students apply it without checking whether the equation has been divided by a first) |
| MC-2 | WRONSKIAN-IN-DENOMINATOR-CAN-BE-ZERO | Student doesn't check that W≠0 before applying the formula; if y₁, y₂ are linearly dependent (W=0 everywhere), the formula fails entirely | Type 1 — overgeneralisation (students treat the Wronskian as just "a number to compute" and plug in without verifying that it's nonzero — i.e., that y₁, y₂ are genuinely independent) |
| MC-3 | VARIATION-OF-PARAMETERS-ALWAYS-GIVES-A-CLEANER-ANSWER-THAN-UNDETERMINED-COEFFICIENTS | Student prefers VoP even when undetermined coefficients applies, then struggles with difficult integrals that undetermined coefficients would have avoided entirely | Type 1 — overgeneralisation (students learn VoP as "the general method" and over-apply it; the principle is: use undetermined coefficients when g is a polynomial/exponential/trig product — VoP otherwise) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Deriving and applying the formula:**

**Setup:** ay'' + by' + cy = g(x). Let y₁, y₂ be two linearly independent solutions of the homogeneous equation. Assume yₚ = u₁(x)y₁ + u₂(x)y₂.

**Impose two constraints:**
1. u₁'y₁ + u₂'y₂ = 0 (reduces second derivative complexity)
2. yₚ must satisfy ay'' + by' + cy = g(x)

These give the system:
- u₁'y₁ + u₂'y₂ = 0
- a(u₁'y₁' + u₂'y₂') = g(x)

**Solve by Cramer's rule:**
W = y₁y₂' − y₂y₁' (Wronskian — must be ≠ 0).
u₁' = −y₂g/(aW), u₂' = y₁g/(aW).
**Integrate:** u₁ = −∫y₂g/(aW)dx, u₂ = ∫y₁g/(aW)dx.
**Particular solution:** yₚ = u₁y₁ + u₂y₂.

**Step 0 — always divide by a first:** Write the ODE as y'' + Py' + Qy = f where f = g/a. Then:
u₁' = −y₂f/W, u₂' = y₁f/W (no leading coefficient in denominator).

**Worked example:**
y'' + y = tan x. yₕ: char. eq. r²+1=0 → r=±i → y₁=cos x, y₂=sin x.
W = cos x·cos x − sin x·(−sin x) = 1.
f = tan x = sin x/cos x.
u₁' = −sin x·(sin x/cos x)/1 = −sin²x/cos x = cos x − sec x.
u₁ = sin x − ln|sec x + tan x|.
u₂' = cos x·(sin x/cos x)/1 = sin x.
u₂ = −cos x.
yₚ = (sin x − ln|sec x+tan x|)cos x + (−cos x)sin x = −cos x·ln|sec x+tan x|.

**P49 checkpoint:**
- CORRECT → "yₚ=u₁y₁+u₂y₂. u₁'=−y₂f/W, u₂'=y₁f/W. W=y₁y₂'−y₂y₁'. Divide by leading coefficient first." → A02
- PARTIAL (MC-1: forgot leading coefficient) → "If the ODE is ay''+by'+cy=g with a≠1, FIRST divide through by a to get y''+Py'+Qy=f=g/a. The VoP formulas use f=g/a (NOT g) in the numerator. If you use g without dividing by a, your u₁' and u₂' are off by factor a, so yₚ is wrong by factor a." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "y'' − y = eˣ/x. yₕ: r²−1=0 → r=±1 → y₁=eˣ, y₂=e^{−x}. W=eˣ(−e^{−x})−e^{−x}(eˣ)=−1−1=−2. f=eˣ/x. u₁'=−e^{−x}·(eˣ/x)/(−2)=1/(2x). u₁=(1/2)ln|x|. u₂'=eˣ·(eˣ/x)/(−2)=−e²ˣ/(2x). u₂=−(1/2)∫e²ˣ/x dx (Ei function). yₚ=(1/2)eˣln|x|−(e^{−x}/2)∫e²ˣ/x dx." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**When to use VoP vs. undetermined coefficients:**

**Use undetermined coefficients when:**
- g(x) is a polynomial, eᵃˣ, sin(bx), cos(bx), or their products.
- Reason: the integral ∫y₂g/W dx is explicit and matched by the trial function automatically.

**Use variation of parameters when:**
- g(x) = tan x, sec x, ln x, 1/x, 1/(1+x²), or any function not of the listed form.
- Also always valid for all g — but may produce harder integrals.

**Higher-order generalisation:** For y⁽ⁿ⁾ + ⋯ = g(x) with n homogeneous solutions y₁,…,yₙ:
u_k' = Wₖ/(W) where W is the n×n Wronskian determinant and Wₖ is the Wronskian with the k-th column replaced by (0,0,…,0,g)ᵀ.

**P49 checkpoint:**
- CORRECT → "VoP: always valid but may produce hard integrals. UC: faster when g is polynomial/exp/trig. High order: Wₖ/W formula." → Gate (P91)
- PARTIAL (MC-3: VoP preferred always) → "VoP is always VALID but often produces integrals that can't be evaluated in closed form (e.g., ∫e²ˣ/x dx is not elementary). Undetermined coefficients, when applicable, produces only algebraic equations — no integration needed. Always try UC first if g is polynomial/exponential/trig; VoP is the fallback." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "y''+4y=sec2x. y₁=cos2x, y₂=sin2x. W=2. f=sec2x. u₁'=−sin2x·sec2x/2=−tan2x/2. u₁=(1/4)ln|cos2x|. u₂'=cos2x·sec2x/2=1/2. u₂=x/2. yₚ=(1/4)cos2x·ln|cos2x|+(x/2)sin2x." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Step 0: divide the ODE by its leading coefficient a. Write y'' + Py' + Qy = f where f = g/a. All VoP formulas use f, not g."
Step 2 — "Before applying the formula: compute W = y₁y₂'−y₂y₁'. Check W ≠ 0 for all x in your domain. If W = 0 everywhere, y₁ and y₂ are linearly dependent — you don't have a fundamental solution set."
Step 3 — "Abel's theorem: W(x) = W(x₀)·exp(−∫P(x)dx). If the ODE has continuous P and W(x₀)≠0 at some x₀, then W≠0 everywhere on the interval — no need to check pointwise."

**TB-R02 (MC-3 VoP-ALWAYS):**
Step 1 — "Decision: is g(x) a product of polynomial, eᵃˣ, sin(bx), cos(bx)? If YES → undetermined coefficients (algebraic, no integration). If NO → variation of parameters."
Step 2 — "VoP may produce integrals expressible only via special functions (Ei, Si, Ci, erf). This is not an error — it means the particular solution doesn't have a closed-form elementary expression, and that's a valid mathematical answer."
Step 3 — "If VoP produces a non-elementary integral, write yₚ as ∫-form explicitly (with limits). Numerically evaluate if needed. This is still a complete solution."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Solve: y'' + y = sec x using variation of parameters.
2. Solve: y'' − 2y' + y = eˣ/x using variation of parameters. (y₁=eˣ, y₂=xeˣ.)
3. Solve: y'' + 4y = cos² x using both methods: (a) undetermined coefficients (write cos²x = (1+cos2x)/2, use superposition); (b) variation of parameters. Verify the answers agree.
4. For the ODE y'' − y = 1/(1+eˣ): find yₚ using VoP. (The integrals involve logarithms.)
5. Derive the VoP formula for the first-order linear ODE y' + P(x)y = g(x): assume y₁ = e^{−∫P dx} and yₚ = u(x)y₁; find u'. Show the result equals the integrating factor formula.

**P55 — Reflect & Consolidate:** "Variation of parameters: yₚ=u₁y₁+u₂y₂. Divide ODE by a first. W=y₁y₂'−y₂y₁'. u₁'=−y₂f/W, u₂'=y₁f/W. Integrate to get u₁, u₂. Use when g∉{polynomial/exp/trig products}. Otherwise prefer undetermined coefficients."

**P76 — Transfer Probe (Independence mode):**
(a) Green's function: for y''+P(x)y'+Q(x)y=f(x) with boundary conditions y(a)=y(b)=0, the solution is y(x)=∫ₐᵇ G(x,s)f(s)ds where G(x,s) is the Green's function built from y₁, y₂, and W. Identify G(x,s) in terms of the VoP formula and explain why G is the ODE's "impulse response." (b) For the initial value problem y''+y=f(t), y(0)=0, y'(0)=0, the solution y(t)=∫₀ᵗ sin(t−s)f(s)ds is a convolution. Identify the "kernel" sin(t−s) as the Green's function and connect to the VoP formula. (c) For the nth-order linear ODE, the VoP formula extends to n homogeneous solutions and n integrals. State the formula for n=3 and write the system of n equations determining u₁', u₂', u₃'.

**P75 — Mastery Assessment:**
"(a) Solve y'' − 3y' + 2y = eˣ/(1+eˣ) using variation of parameters. (b) Solve x²y'' − 2xy' + 2y = x ln x (Euler-Cauchy equation; first find y₁=x, y₂=x² by the substitution y=xᵐ, then apply VoP). (c) Verify Abel's theorem for y'' + P(x)y' + Q(x)y = 0: if y₁, y₂ are any two solutions, show d/dx[y₁y₂'−y₂y₁'] = −P(x)W. Solve this first-order ODE for W and write W(x)=W(x₀)·exp(−∫P dx). (d) When does VoP yield a particular solution that coincides with the solution produced by undetermined coefficients? Explain why."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the leading-coefficient division and when to prefer undetermined coefficients
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.wronskian; reassign

**P78 — Completion:** Variation of Parameters certified. Student applies the VoP formula correctly (divides by a, checks W≠0, integrates u₁' and u₂'); uses VoP when UC fails; connects to Green's functions and convolution.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Green's functions and impulse response; convolution representation; nth-order VoP
Skill tested: Situate VoP within the broader theory of linear ODEs and kernel methods

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
