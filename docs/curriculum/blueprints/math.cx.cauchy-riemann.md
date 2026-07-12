<!-- BLUEPRINT: math.cx.cauchy-riemann -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Cauchy-Riemann Equations
**Concept ID:** `math.cx.cauchy-riemann`
**KG Fields:** difficulty=expert | bloom=apply | estimated_hours=5 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.cx.cauchy-riemann |
| name | Cauchy-Riemann Equations |
| difficulty | expert |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.cx.complex-function, math.calc.partial-derivatives |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.90 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.cx.complex-function**: f(z)=u(x,y)+iv(x,y) decomposition; path-dependent limits; complex differentiability definition as a limit; why 2D limits are harder than 1D
- **math.calc.partial-derivatives**: ∂f/∂x, ∂f/∂y; treating one variable as constant; Clairaut's theorem; mixed partials; chain rule for multivariable functions

### Target Knowledge State
Student can state the Cauchy-Riemann (CR) equations (∂u/∂x=∂v/∂y and ∂u/∂y=−∂v/∂x); derive them by computing f'(z) from two directions and requiring agreement; apply them to verify complex differentiability, compute f'(z) from real and imaginary parts, identify where a function fails to be analytic; and apply the sufficient condition (CR + continuous first partials → holomorphic). Student correctly identifies f(z)=z̄ as a canonical non-analytic function and f(z)=|z|² as analytic only at the origin.

### Conceptual Obstacles
1. Believing f(z)=z̄ (complex conjugate) is analytic — z̄=x−iy has u=x, v=−y; ∂u/∂x=1 but ∂v/∂y=−1 → CR equations fail everywhere; it is nowhere analytic, yet it is smooth as a real function of (x,y)
2. Assuming CR equations at a single point guarantee complex differentiability at that point — CR + continuous partials in a neighbourhood gives holomorphicity; CR at an isolated point does not (|z|⁴sin²(arg z) type examples)
3. Equating real differentiability of u and v with complex differentiability of f — u and v can both be infinitely differentiable as real functions while the CR equations fail, meaning f is not complex-differentiable despite its components being smooth

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | CONJUGATE-IS-ANALYTIC | Student claims f(z)=z̄ is analytic because it is "smooth" or "one-to-one"; does not check the CR equations; fails to see that ∂u/∂x=1≠−1=∂v/∂y | Any mention of z̄; functions that look smooth visually; students who confuse real smoothness with complex analyticity |
| MC-2 | POINTWISE-CR-IMPLIES-HOLOMORPHIC | Student concludes that CR at a point → complex differentiable at that point; unaware that continuous partials satisfying CR in an open neighbourhood are the sufficient condition | f(z)=|z|² which has CR at z=0 only; any function with an isolated point where CR hold |
| MC-3 | REAL-SMOOTH-IMPLIES-ANALYTIC | Student equates u,v∈C¹ (or C∞) as real functions with f=u+iv being complex-differentiable; ignores that complex differentiability is an additional constraint (the CR equations) not implied by real smoothness | Functions like f(z)=x²−y²+2xi (not z²): u=x²−y², v=2x; ∂u/∂x=2x, ∂v/∂y=0 → CR fails unless x=0 |

**Foundational Misconception:** MC-1 (CONJUGATE-IS-ANALYTIC) — z̄ is the canonical counterexample introduced in virtually every complex analysis course; students who accept its analyticity have misunderstood what the CR equations are testing.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — expert learner computes f'(z) for f(z)=z² from two approach directions, observes that both limits must agree, and extracts the CR equations before seeing them stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: compute limit of (f(z+Δz)−f(z))/Δz for f(z)=z² via real axis (Δy=0) and imaginary axis (Δx=0); require agreement; extract four partial equations that form CR; P: u-v component diagram; A: CR equations stated formally + sufficient condition theorem
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: f(z)=z² verify CR and find f'(z); WE2: f(z)=eˣcos(y)+ieˣsin(y)=eᶻ verify CR
3. **A03 P06 CONTRAST PAIR** — analytic (f=z²) vs non-analytic (f=z̄); |z|² analytic only at origin; sufficient condition vs necessary-only at a point
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Deriving the CR Equations from the Differentiability Limit

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Make the CR equations structurally inevitable by deriving them from the two-direction limit; ground the abstract equations in the concrete directional constraint; address MC-3 by showing that both u and v being smooth is not the issue — their mutual constraint is

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (two-direction derivation for f(z)=z²):**

Let f(z)=z²=(x+iy)²=x²−y²+2xyi. So u=x²−y² and v=2xy.

The complex derivative is defined as:
$$f'(z) = \lim_{\Delta z \to 0} \frac{f(z+\Delta z)-f(z)}{\Delta z}$$

For this limit to exist, it must give the same value regardless of the direction Δz→0.

**Direction 1 — along the real axis (Δz=Δx, Δy=0):**
$$f'(z) = \lim_{\Delta x \to 0}\frac{f(x+\Delta x,y)-f(x,y)}{\Delta x} = \frac{\partial u}{\partial x} + i\frac{\partial v}{\partial x}$$

For f(z)=z²: ∂u/∂x=2x, ∂v/∂x=2y. So f'(z)=2x+2iy=2z along the real axis.

**Direction 2 — along the imaginary axis (Δz=iΔy, Δx=0):**
$$f'(z) = \lim_{\Delta y \to 0}\frac{f(x,y+\Delta y)-f(x,y)}{i\Delta y} = \frac{1}{i}\frac{\partial u}{\partial y} + \frac{\partial v}{\partial y} = \frac{\partial v}{\partial y} - i\frac{\partial u}{\partial y}$$

For f(z)=z²: ∂v/∂y=2x, ∂u/∂y=−2y. So f'(z)=2x+2iy=2z along the imaginary axis. ✓ They agree.

**Requiring agreement of the two expressions for f'(z):**
$$\frac{\partial u}{\partial x} + i\frac{\partial v}{\partial x} = \frac{\partial v}{\partial y} - i\frac{\partial u}{\partial y}$$

Matching real parts: ∂u/∂x = ∂v/∂y
Matching imaginary parts: ∂v/∂x = −∂u/∂y

These are the **Cauchy-Riemann equations**.

**Stage P — Pictorial (u-v component diagram):**

```
f(z) = u(x,y) + i·v(x,y)
         │               │
    Real part         Imaginary part

  CR equations link u and v:

  ∂u/∂x = ∂v/∂y     (real parts agree)
  ∂u/∂y = -∂v/∂x    (imaginary parts agree)

  f'(z) = ∂u/∂x + i·∂v/∂x  (use real-axis formula once CR verified)
```

**Stage A — Abstract (CR equations and sufficient condition):**

**Cauchy-Riemann Equations (necessary condition):** If f=u+iv is complex-differentiable at z₀, then at z₀:
$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y} \qquad \text{and} \qquad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$$

**Derivative formula (when CR hold):**
$$f'(z) = \frac{\partial u}{\partial x} + i\frac{\partial v}{\partial x} = \frac{\partial v}{\partial y} - i\frac{\partial u}{\partial y}$$

**Sufficient condition (holomorphicity):** If u and v have continuous first partial derivatives in an open neighbourhood of z₀ and the CR equations hold throughout that neighbourhood, then f is holomorphic (complex-differentiable in the full neighbourhood) at z₀.

**Standard workflow:**
1. Write f=u+iv
2. Compute all four first partial derivatives
3. Check ∂u/∂x=∂v/∂y and ∂u/∂y=−∂v/∂x
4. If CR hold everywhere + partials continuous → f is holomorphic; compute f'(z)=∂u/∂x+i∂v/∂x

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** For f(z)=z̄=x−iy, write u and v, compute all four first partials, and check the CR equations.

**CORRECT:** u=x, v=−y. ∂u/∂x=1, ∂v/∂y=−1. CR requires 1=−1: fails. Also ∂u/∂y=0, −∂v/∂x=0: this part holds. But the first CR equation fails everywhere → f(z)=z̄ is nowhere analytic.
→ "Correct. z̄ fails the first CR equation at every point. Despite being smooth as a real function, it is not complex-differentiable anywhere." → Proceed to A02.

**PARTIAL:** Student checks only one of the two CR equations and declares success.
→ "Both CR equations must hold simultaneously. You correctly found ∂u/∂y=0=−∂v/∂x (second equation holds). Now check the first: ∂u/∂x=1 and ∂v/∂y=−1. These are not equal. The function fails the CR equations."

**INCORRECT:** Student writes v=y (forgetting the minus sign in z̄=x−iy) and claims CR holds (MC-1).
→ "z̄=x−iy means u=x and v=−y (not v=y). Write out: if z=x+iy, then z̄ is the conjugate: replace i with −i to get x−iy. So v=−y. Now ∂v/∂y=−1 and ∂u/∂x=1: the CR equation ∂u/∂x=∂v/∂y fails (1≠−1)."

**NO_RESPONSE:** → "For z=x+iy, z̄=x−iy. So u=x and v=−y. Four partials: ∂u/∂x=1, ∂u/∂y=0, ∂v/∂x=0, ∂v/∂y=−1. First CR check: ∂u/∂x=1 vs ∂v/∂y=−1: 1≠−1 → FAILS. f(z)=z̄ is not analytic anywhere."

---

### Teaching Action A02 — Worked Example Pair: Verifying CR and Computing f'(z)

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Build the four-step workflow into procedural fluency; show CR verification for polynomial (WE1) and transcendental (WE2) analytic functions; model the f'(z) formula after CR are confirmed

---

**[P07 — WORKED EXAMPLE PAIR]**

**WE1 — Polynomial: f(z)=z²**

**Step 1 — Decompose:**
f(z)=z²=(x+iy)²=x²−y²+2xyi
→ u=x²−y², v=2xy

**Step 2 — Compute four first partials:**
$$\frac{\partial u}{\partial x}=2x, \quad \frac{\partial u}{\partial y}=-2y, \quad \frac{\partial v}{\partial x}=2y, \quad \frac{\partial v}{\partial y}=2x$$

**Step 3 — Check CR equations:**
- First: ∂u/∂x = 2x = ∂v/∂y = 2x ✓
- Second: ∂u/∂y = −2y = −∂v/∂x = −2y ✓

CR equations hold everywhere. Partials are continuous polynomials → f is entire (holomorphic everywhere).

**Step 4 — Compute f'(z):**
$$f'(z) = \frac{\partial u}{\partial x} + i\frac{\partial v}{\partial x} = 2x + i(2y) = 2(x+iy) = 2z$$

Confirms the expected result from complex algebra: d/dz(z²)=2z. ✓

---

**WE2 — Exponential: f(z)=eˣcos(y)+ieˣsin(y) = eᶻ**

**Step 1 — Decompose:**
u=eˣcos(y), v=eˣsin(y)

**Step 2 — Compute four first partials:**
$$\frac{\partial u}{\partial x}=e^x\cos(y), \quad \frac{\partial u}{\partial y}=-e^x\sin(y)$$
$$\frac{\partial v}{\partial x}=e^x\sin(y), \quad \frac{\partial v}{\partial y}=e^x\cos(y)$$

**Step 3 — Check CR equations:**
- First: ∂u/∂x = eˣcos(y) = ∂v/∂y = eˣcos(y) ✓
- Second: ∂u/∂y = −eˣsin(y) = −∂v/∂x = −eˣsin(y) ✓

CR equations hold everywhere. Partials continuous → eᶻ is entire.

**Step 4 — Compute f'(z):**
$$f'(z) = e^x\cos(y) + ie^x\sin(y) = e^x(\cos(y)+i\sin(y)) = e^x \cdot e^{iy} = e^{x+iy} = e^z$$

Confirms d/dz(eᶻ)=eᶻ via the CR approach. ✓

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** For f(z)=z³, write u and v, verify the CR equations, and find f'(z) using the CR formula.

**CORRECT:** (x+iy)³=x³−3xy²+i(3x²y−y³). u=x³−3xy², v=3x²y−y³. ∂u/∂x=3x²−3y²=∂v/∂y=3x²−3y² ✓. ∂u/∂y=−6xy=−∂v/∂x=−6xy ✓. f'(z)=(3x²−3y²)+i(6xy)=3(x²−2xyi−y²)... actually 3(x+iy)²=3z². Let me verify: (3x²−3y²)+i(6xy)=3(x²+2xyi−y²)... wait. 3(x+iy)²=3(x²+2xyi+(iy)²)=3(x²+2xyi−y²)=3(x²−y²)+6xyi=3x²−3y²+6xyi ✓. So f'(z)=3z².
→ "Correct. CR confirm f=z³ is entire and f'(z)=3z² matches the complex power rule." → Proceed to A03.

**PARTIAL:** Student correctly computes partials and confirms CR but cannot simplify f'(z)=3x²−3y²+6xyi as 3z².
→ "Factor: 3(x²−y²)+6xyi=3[(x²−y²)+2xyi]=3(x+iy)²=3z². Recognise the real and imaginary parts of z² to rewrite the partial-derivative formula back as a complex expression."

**INCORRECT:** Student confuses ∂u/∂y with ∂u/∂x in the CR check (sign error).
→ "The CR equations are: (1) ∂u/∂x=∂v/∂y and (2) ∂u/∂y=−∂v/∂x. Note the minus sign in the second equation. For f=z³: ∂u/∂y=−6xy and −∂v/∂x=−(6xy)=−6xy. So ∂u/∂y=−∂v/∂x ✓. The minus sign is part of the CR structure — both equations must hold."

**NO_RESPONSE:** → "Step 1: (x+iy)³=x³+3x²(iy)+3x(iy)²+(iy)³=x³+3x²yi−3xy²−iy³=(x³−3xy²)+i(3x²y−y³). So u=x³−3xy², v=3x²y−y³. Step 2: ∂u/∂x=3x²−3y², ∂v/∂y=3x²−3y² ✓; ∂u/∂y=−6xy, ∂v/∂x=6xy → ∂u/∂y=−∂v/∂x ✓. Step 3: f'(z)=(3x²−3y²)+i(6xy)=3z²."

---

### Teaching Action A03 — Contrast Pair: Analytic vs Non-Analytic; Necessary vs Sufficient

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Establish the CR equations as a necessary condition that can fail; address MC-2 (pointwise CR ≠ holomorphic); sharpen the sufficient-condition statement; provide the z̄ and |z|² canonical examples

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — f(z)=z² (analytic everywhere) vs f(z)=z̄ (nowhere analytic):**

| | f(z)=z²: u=x²−y², v=2xy | f(z)=z̄: u=x, v=−y |
|--|--------------------------|---------------------|
| ∂u/∂x | 2x | 1 |
| ∂v/∂y | 2x | −1 |
| First CR: ∂u/∂x=∂v/∂y? | **2x=2x ✓** | **1≠−1 ✗** |
| Second CR | ✓ everywhere | ✓ everywhere |
| Holomorphic? | Yes, entire | **No, nowhere** |

f(z)=z̄ satisfies the second CR equation everywhere but fails the first — one failure suffices to conclude non-analyticity everywhere.

**Contrast 2 — f(z)=|z|² (analytic only at z=0, MC-2 counterexample):**

f(z)=|z|²=x²+y². So u=x²+y², v=0.

Four partials: ∂u/∂x=2x, ∂u/∂y=2y, ∂v/∂x=0, ∂v/∂y=0.

CR check:
- First: ∂u/∂x=2x = ∂v/∂y=0 → requires 2x=0 → x=0
- Second: ∂u/∂y=2y = −∂v/∂x=0 → requires 2y=0 → y=0

CR equations hold only at (x,y)=(0,0), i.e., z=0. But they fail in every neighbourhood of z=0 (away from the origin). Therefore:
- f is complex-differentiable at z=0 (CR hold at that isolated point, and partials are continuous)
- f is NOT holomorphic in any disc around z=0 (CR fail off the origin)
- f is not analytic anywhere in the complex sense

This is the MC-2 trap: CR at a single isolated point does NOT imply holomorphicity there. The sufficient condition requires CR in an open neighbourhood.

**Contrast 3 — Necessary vs. sufficient condition summary:**

| Condition | Conclusion |
|-----------|-----------|
| f complex-differentiable at z₀ | CR equations hold at z₀ (necessary) |
| CR hold at z₀ (only) | Cannot conclude differentiability |
| CR hold in open nbhd of z₀ + continuous partials | f holomorphic at z₀ (sufficient) |
| CR hold for all z | f entire (e.g., polynomials, eᶻ, sin(z), cos(z)) |

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Let f(z)=x²−y²+2xi. Write u and v, check the CR equations, and determine where (if anywhere) f is complex-differentiable.

**CORRECT:** u=x²−y², v=2x. ∂u/∂x=2x, ∂v/∂y=0. CR1: 2x=0 → x=0. ∂u/∂y=−2y, −∂v/∂x=−2. CR2: −2y=−2 → y=1. CR hold only at z=0+i·1=i. Since partials are continuous everywhere and CR hold only at z=i, f is complex-differentiable at z=i only and not holomorphic anywhere.
→ "Correct. f'(i)=∂u/∂x|(x=0,y=1)+i∂v/∂x|(x=0,y=1)=0+2i=2i. Not holomorphic, only differentiable at this isolated point." → Proceed to A04.

**PARTIAL:** Student correctly finds CR hold only at x=0, y=1 but concludes "f is holomorphic at z=i" (MC-2).
→ "CR at an isolated point gives complex differentiability at that point only — not holomorphicity. Holomorphic means differentiable in an open disc around z=i. But for any disc around z=i, points with x≠0 or y≠1 are included, and CR fail there. So f is differentiable at z=i but not holomorphic anywhere."

**INCORRECT:** Student says f is analytic because u=x²−y² and v=2x are smooth (MC-3).
→ "Real smoothness of u and v (both are C∞ as real functions) does NOT imply complex differentiability. That requires the CR equations. Check: ∂u/∂x=2x and ∂v/∂y=0 — these are equal only when x=0. The CR equations fail everywhere except on the line x=0 (and further restricted to y=1 by the second equation). f is not analytic despite smooth components."

**NO_RESPONSE:** → "u=x²−y², v=2x. Compute: ∂u/∂x=2x, ∂u/∂y=−2y, ∂v/∂x=2, ∂v/∂y=0. CR1: ∂u/∂x=∂v/∂y → 2x=0 → x=0. CR2: ∂u/∂y=−∂v/∂x → −2y=−2 → y=1. CR hold only at (0,1), i.e., z=i. So f is complex-differentiable only at z=i and not holomorphic anywhere."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess fluent CR verification, f'(z) computation, and non-analytic classification

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Verify that f(z)=sin(z)=sin(x)cosh(y)+icos(x)sinh(y) satisfies the CR equations and find f'(z).

*Solution:* u=sin(x)cosh(y), v=cos(x)sinh(y).
∂u/∂x=cos(x)cosh(y)=∂v/∂y=cos(x)cosh(y) ✓
∂u/∂y=sin(x)sinh(y), −∂v/∂x=sin(x)sinh(y) ✓
f'(z)=cos(x)cosh(y)+i(−sin(x)sinh(y))=cos(z). **f'(z)=cos(z)** ✓

**Problem 2:** Show that f(z)=z̄ is nowhere analytic using the CR equations.

*Solution:* u=x, v=−y. ∂u/∂x=1, ∂v/∂y=−1. CR1: 1≠−1 everywhere. **Nowhere analytic.**

**Problem 3:** Find all points where f(z)=x³−3xy²+i(3x²y+y³) might be holomorphic.

*Solution:* Note f(z)=(x+iy)³=z³? Check: (x+iy)³=x³+3x²(iy)+3x(iy)²+(iy)³=x³+3x²yi−3xy²−iy³=(x³−3xy²)+i(3x²y−y³). But here v=3x²y+y³ (note + sign on y³). So f≠z³.
u=x³−3xy², v=3x²y+y³.
∂u/∂x=3x²−3y², ∂v/∂y=3x²+3y². CR1: 3x²−3y²=3x²+3y² → −3y²=3y² → y²=0 → y=0.
∂u/∂y=−6xy, −∂v/∂x=−6xy. CR2 holds for all (x,y). ✓
CR hold only when y=0. Not holomorphic anywhere. Complex-differentiable only on the real axis (y=0 line), at isolated points.

**Problem 4:** If f=u+iv is analytic and u(x,y)=x²−y², find v(x,y) (up to a constant) using the CR equations.

*Solution:* ∂v/∂y=∂u/∂x=2x → v=2xy+h(x). Also −∂v/∂x=∂u/∂y=−2y → ∂v/∂x=2y → d/dx(2xy+h(x))=2y+h'(x)=2y → h'(x)=0 → h=const. **v=2xy+C**. So f(z)=x²−y²+i(2xy+C)=z²+iC.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** Let u(x,y)=eˣcos(y). Without being told what f is, use the CR equations to find a harmonic conjugate v(x,y) (so that f=u+iv is analytic). Then identify f(z) as a complex function of z=x+iy.

**Expected solution:**

**Step 1 — Find v using CR equations:**

From CR: ∂v/∂y = ∂u/∂x = eˣcos(y).

Integrate with respect to y:
$$v = \int e^x\cos(y)\, dy = e^x\sin(y) + h(x)$$

**Step 2 — Use the second CR equation:**

∂u/∂y = −eˣsin(y). CR requires ∂u/∂y = −∂v/∂x:
$$-e^x\sin(y) = -\frac{\partial v}{\partial x} = -(e^x\sin(y) + h'(x))$$
$$-e^x\sin(y) = -e^x\sin(y) - h'(x) \implies h'(x) = 0 \implies h = C \text{ (constant)}$$

So **v(x,y) = eˣsin(y) + C** (take C=0 for simplicity).

**Step 3 — Identify f(z):**

$$f(z) = e^x\cos(y) + ie^x\sin(y) = e^x(\cos(y)+i\sin(y)) = e^x\cdot e^{iy} = e^{x+iy} = e^z$$

**Verification:** CR equations for u=eˣcos(y), v=eˣsin(y) hold everywhere (verified in WE2). f(z)=eᶻ is entire. ✓

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.90 × 5⌉ = ⌈4.5⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.cx.analytic-functions and math.cx.harmonic-functions; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.cx.cauchy-riemann assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — CONJUGATE-IS-ANALYTIC (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Claiming f(z)=z̄ is analytic is the CONJUGATE-IS-ANALYTIC error. z̄=x−iy appears smooth and well-behaved, but the CR equations fail everywhere. Real smoothness ≠ complex analyticity."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is f(z)=z̄ analytic? Verify with CR."
- MC-1 response: "Yes, it's smooth / continuous / bijective."

**[P64 — CONCEPTUAL SHIFT]**
"CR check for z̄: u=x, v=−y. ∂u/∂x=1, ∂v/∂y=−1. CR requires 1=−1: impossible. The failure is total — there is not a single point where z̄ is complex-differentiable. The intuition from real analysis (smooth = differentiable) fails completely in complex analysis. z̄ is the canonical non-analytic function: smooth as a map ℝ²→ℝ², yet nowhere complex-differentiable."

Practice: Compute the limit (f(z+Δz)−f(z))/Δz for f(z)=z̄ along the real axis vs imaginary axis directly, and show they give different limits (1 vs −1).

---

### Repair Action B02 — POINTWISE-CR-IMPLIES-HOLOMORPHIC (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Concluding that CR equations at a single point imply holomorphicity there is POINTWISE-CR-IMPLIES-HOLOMORPHIC. The sufficient condition requires CR in an open neighbourhood, not at a single point."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "f(z)=|z|² has CR at z=0. Is f holomorphic at z=0?"
- MC-2 response: "Yes, CR hold at z=0."

**[P64 — CONCEPTUAL SHIFT]**
"CR at z=0 means f is complex-differentiable at z=0 (f'(0)=0). But holomorphic means differentiable in a neighbourhood. In any disc around 0, there are points z≠0 where CR fail (∂u/∂x=2x≠0=∂v/∂y unless x=0). So f is differentiable only at z=0 — an isolated point — and not holomorphic anywhere. Complex-differentiable at a single point is a degenerate situation in complex analysis; holomorphic (open domain) is the useful concept."

Practice: Show f(z)=|z|⁴ is complex-differentiable only at z=0 using CR equations.

---

### Repair Action B03 — REAL-SMOOTH-IMPLIES-ANALYTIC (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Equating real-smooth components with complex analyticity is REAL-SMOOTH-IMPLIES-ANALYTIC. The CR equations are an additional constraint beyond smoothness — they encode the one-complex-variable structure."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "f(z)=x²+iy² — are u=x² and v=y² smooth? Is f analytic?"
- MC-3 response: "Yes, x² and y² are smooth, so f is analytic."

**[P64 — CONCEPTUAL SHIFT]**
"CR check: ∂u/∂x=2x, ∂v/∂y=2y. CR requires 2x=2y → x=y. CR hold only on the diagonal x=y, not in an open set. f is not analytic anywhere. u=x² and v=y² are both infinitely differentiable as real functions — but the CR equations fail. Complex analyticity imposes a rigid coupling between u and v that real smoothness does not."

Practice: For u=x²−y² (smooth), find the unique v making f=u+iv analytic. Show v=2xy (not y²). Smooth v=y² doesn't work; the coupled CR system determines v uniquely (up to constant).

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Verify CR for f(z)=cos(z)=cos(x)cosh(y)−isin(x)sinh(y); find f'(z)=−sin(z) |
| SR-2 | +3 days | State: (1) necessary condition for complex-diff; (2) sufficient condition for holomorphic; (3) canonical non-analytic example; (4) f'(z) formula from partials |
| SR-3 | +7 days | Given u(x,y), find the harmonic conjugate v using CR (two-step integration); identify the resulting f(z) |
| SR-4 | +14 days | Prove: if f is analytic and real-valued, then f is constant (use CR: ∂u/∂x=∂v/∂y=0 and ∂u/∂y=−∂v/∂x=0 since v=0; both partials zero → u constant by connected domain) |

Retrieval flag: if student claims z̄ is analytic (MC-1) or confuses pointwise-CR with holomorphicity (MC-2) in any SR, re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|--------------|
| Requires (Tier-1) | math.cx.complex-function | f=u+iv decomposition, path-dependent limits, complex differentiability definition assumed |
| Requires (Tier-1) | math.calc.partial-derivatives | First partial derivatives ∂u/∂x, ∂u/∂y, ∂v/∂x, ∂v/∂y and their computation assumed; continuity of partials used in sufficient condition |
| Unlocks | math.cx.analytic-functions | CR equations are the gateway to analytic function theory; the sufficient condition is the working definition of holomorphic used throughout complex analysis |
| Unlocks | math.cx.harmonic-functions | The harmonic conjugate construction (P76 transfer probe) leads directly to harmonic functions (u satisfies Laplace's equation when f=u+iv is analytic) |

**GR-9:** cross_links=[] → P76 mode = independence (transfer probe is a harmonic conjugate reconstruction, self-contained within complex analysis).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=5 → standard structure (3 main TAs + gate)
- bloom=apply → V-4 = PASS (P07 required; WE1=f(z)=z², WE2=f(z)=eᶻ in A02)
- CPA_entry = C for expert learner: two-direction limit derivation in A01 before the CR formula; this is the most important pedagogical choice for this blueprint

**Key teaching insight:** The CR equations feel like arbitrary constraints unless the student has derived them from first principles. A01's two-direction limit computation (real axis vs. imaginary axis, requiring agreement) transforms CR from a formula to be memorised into a structural inevitability. Students who derive CR themselves rarely forget the sign in the second equation (∂u/∂y=−∂v/∂x, not +∂v/∂x).

**MC-1 permanence:** The z̄ example should be returned to in every spaced-repetition session. It is the most important single example in introductory complex analysis because it demonstrates that real smoothness and complex analyticity are genuinely different properties. The fact that |z̄|=|z| (same magnitude) makes z̄ seem "close to z" but this has no analytic relevance.

**P76 design:** The harmonic conjugate construction (given u, find v so f=u+iv is analytic) is the most important skill beyond just checking CR. It appears throughout applications (conformal mapping, fluid dynamics, electrostatics). The P76 probe uses u=eˣcos(y) (the real part of eᶻ) and expects the student to recover v=eˣsin(y) and identify f=eᶻ — a transfer that requires understanding the two-step integration procedure and recognising the resulting complex exponential.

**Problem 3 in P77:** The subtle sign choice in f=x³−3xy²+i(3x²y+y³) vs z³=(x³−3xy²)+i(3x²y−y³) tests careful computation and catches students who assume every polynomial is analytic. The positive y³ in v breaks the pattern.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.cx.cauchy-riemann ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.cx.complex-function ✓, math.calc.partial-derivatives ✓ | PASS |
| V-3 | CPA entry = C for expert difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 present | P07 in A02 (WE1=f(z)=z², WE2=f(z)=eᶻ) ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_links=[] → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.90×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=5 → standard (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Harmonic conjugate of eˣcos(y); v=eˣsin(y) derived via two-step CR integration; f=eᶻ identified correctly ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
