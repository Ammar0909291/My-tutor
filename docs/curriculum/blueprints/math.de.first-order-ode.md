<!-- BLUEPRINT: math.de.first-order-ode -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: First-Order ODE
**Concept ID:** `math.de.first-order-ode`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=6 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.de.first-order-ode |
| name | First-Order ODE |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 6 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.de.ode, math.calc.antiderivatives, math.calc.u-substitution |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.de.ode**: ODE definition; order/degree; general vs particular solution; verification procedure; classifying equations (order, linearity)
- **math.calc.antiderivatives**: ∫f(x)dx=F(x)+C; reverse power rule; ∫eˣdx=eˣ+C; ∫(1/x)dx=ln|x|+C
- **math.calc.u-substitution**: recognise and apply substitution; du-verification; composite integrands

### Target Knowledge State
Student fluently solves separable first-order ODEs (separate variables, integrate both sides, solve for y, apply initial conditions); recognises the linear first-order form y'+P(x)y=Q(x) and applies the integrating factor μ=e^{∫P(x)dx} to solve it; correctly handles the arbitrary constant throughout (does not absorb A=e^C prematurely); uses an initial condition to find the particular solution; and identifies which method (separation or integrating factor) is appropriate for a given first-order ODE.

### Conceptual Obstacles
1. Attempting separation on non-separable ODEs — y'=y+x cannot be written as g(y)dy=h(x)dx; recognising a separable equation requires being able to factor the RHS into a product f(x)·g(y) (or sum is never separable)
2. Absorbing the constant into the exponential — after ln|y|=f(x)+C, student writes y=e^{f(x)} instead of y=e^{f(x)+C}=e^C·e^{f(x)}=Ae^{f(x)}; A=e^C is a nonzero constant that must be retained
3. Forgetting +C on one side of the separated equation — integrating both sides ∫dy/g(y)=∫h(x)dx and writing only a constant on the right; both sides gain a constant, which net to a single constant C on the right by convention

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SEPARATION-ON-NON-SEPARABLE | Student attempts to "separate" y'=y+x or y'=x+y² by moving y-terms to one side and x-terms to the other, without verifying the RHS factors as f(x)·g(y); produces incorrect or undefined expressions | Any first-order ODE where the RHS is a sum f(x)+g(y) rather than a product |
| MC-2 | CONSTANT-ABSORBED-PREMATURELY | After integrating ln|y|=f(x)+C, student drops the +C and writes y=e^{f(x)}, losing the general-solution family and any ability to apply an initial condition | Any separable equation whose separation produces a logarithm on the y-side |
| MC-3 | SINGLE-SIDE-CONSTANT | Student integrates both sides of the separated equation but adds +C to only one side (or neither); forgets that C on the right absorbs the left-side constant by convention | Multi-step separations; especially when the left integral also yields a constant term |

**Foundational Misconception:** MC-1 (SEPARATION-ON-NON-SEPARABLE) — attempting the wrong method on a non-separable equation wastes work and produces incorrect results; recognising separability (RHS = product of x-function and y-function) is the prerequisite for the entire separation procedure.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner starts from a known antiderivative problem (y'=2x → y=x²+C) and extends the technique to y'=y via the separation of variables method.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: y'=2x antiderivative gives y=x²+C; y'=y cannot be integrated directly — separate: dy/y=dx, integrate both sides, solve for y=Ae^x; P: solution-curve family diagram; A: separation of variables algorithm (5 steps) with separability test
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: separable y'=x/y with IC; WE2: linear first-order y'−2y=4eˣ via integrating factor
3. **A03 P06 CONTRAST PAIR** — separable vs non-separable; with IC (particular) vs without IC (general); separation vs integrating factor decision
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — From Antiderivative to Separation of Variables

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Root separation of variables in antiderivative mechanics already mastered; introduce the 5-step algorithm; explicitly show the A=e^C step to preempt MC-2

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (from simple antiderivative to y'=y):**

*Step back:* y'=2x → y=∫2x dx=x²+C. This works because the right side depends only on x.

*Problem:* y'=y. The right side depends on y, not x directly. We cannot just integrate.

*Separation idea:* Rewrite as dy/dx=y. If we treat dy and dx formally:
$$\frac{dy}{y} = dx$$

Integrate both sides:
$$\int \frac{dy}{y} = \int dx \implies \ln|y| = x + C$$

Solve for y:
$$|y| = e^{x+C} = e^C \cdot e^x$$

Since e^C > 0 and y can be positive or negative, write A=±e^C (a nonzero constant):
$$y = A e^x$$

This is the **general solution** — a family of curves, one for each value of A.

*Initial condition:* If y(0)=3, then 3=Ae⁰=A. Particular solution: y=3eˣ.

**Stage P — Pictorial (solution family diagram):**

```
y
|    y=3eˣ (A=3)
|   /
|  /  y=eˣ (A=1)
| /
|/ y=0.5eˣ (A=0.5)
+--------→ x
|  y=−eˣ (A=−1)
|\
```

Each value of A traces a different solution curve. All curves satisfy y'=y. The IC pins one curve.

**Stage A — Abstract (separation of variables algorithm):**

**Separability test:** A first-order ODE y'=f(x,y) is **separable** iff f can be written as h(x)·g(y) — a product of a function of x alone and a function of y alone. A sum f(x)+g(y) is never separable.

**Algorithm (5 steps):**
1. Rewrite as dy/dx = h(x)·g(y)
2. Separate: g(y)⁻¹ dy = h(x) dx (move all y with dy, all x with dx)
3. Integrate both sides: ∫g(y)⁻¹ dy = ∫h(x) dx + C (single constant on one side by convention)
4. Solve for y (if algebraically possible)
5. Apply initial condition (if given) to find C

**MC-2 warning:** After ∫dy/y = ∫f(x)dx → ln|y|=F(x)+C, the +C must travel with the exponent:
y=e^{F(x)+C}=e^C·e^{F(x)}=A·e^{F(x)} where A=e^C (or A=±e^C). Never drop A.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Solve y'=3y. State the separability test result, write the separated form, and give the general solution.

**CORRECT:** Separable: RHS=3y=h(x)·g(y) with h(x)=3, g(y)=y. Separated: dy/y=3dx. Integrate: ln|y|=3x+C. General solution: y=Ae^{3x}.
→ "Correct. The constant A=e^C absorbs the sign; Ae^{3x} includes negative solutions by allowing A∈ℝ\{0}." → Proceed to A02.

**PARTIAL:** Student gets ln|y|=3x+C but writes y=e^{3x} (MC-2 — drops C).
→ "You correctly separated and integrated. Now solve for y: ln|y|=3x+C → |y|=e^{3x+C}=e^C·e^{3x}. Since e^C is a positive constant, write A=e^C (or A=±e^C for general A≠0): y=Ae^{3x}. If you drop C here, you can never find a particular solution."

**INCORRECT:** Student tries to integrate ∫y dy=∫3 dx on the wrong side (y with dx, not dy).
→ "Check the separation: y'=3y → dy/dx=3y. Divide both sides by y: (1/y)dy=3dx. Now integrate (1/y) with respect to y (not y with respect to x): ∫(1/y)dy=∫3dx → ln|y|=3x+C."

**NO_RESPONSE:** → "Step 1: write as dy/dx=3y. Step 2: divide by y: (1/y)dy=3dx. Step 3: integrate both sides: ln|y|=3x+C. Step 4: solve: |y|=e^{3x+C}=e^Ce^{3x}. Set A=e^C: y=Ae^{3x}."

---

### Teaching Action A02 — Worked Example Pair

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Build fluency across two solution methods — WE1 demonstrates separation with an IC; WE2 demonstrates the integrating factor for a linear first-order ODE that is not separable

---

**[P07 — WORKED EXAMPLE PAIR]**

**WE1 — Separable with IC: y'=x/y, y(0)=2**

**Step 1 — Separability check:** RHS = x/y = x · (1/y) = h(x)·g(y). ✓ Separable.

**Step 2 — Separate:**
$$y\, dy = x\, dx$$

**Step 3 — Integrate both sides:**
$$\frac{y^2}{2} = \frac{x^2}{2} + C$$

**Step 4 — Solve for y:**
$$y^2 = x^2 + 2C = x^2 + K \quad (K=2C \text{ is still arbitrary})$$
$$y = \pm\sqrt{x^2 + K}$$

**Step 5 — Apply IC y(0)=2:**
$$2 = \pm\sqrt{0 + K} \implies K = 4 \quad (\text{take } + \text{ since } y(0)=2>0)$$

**Particular solution:** y = √(x²+4)

**Verification:** y'=x/√(x²+4)=x/y ✓

---

**WE2 — Linear first-order (integrating factor): y'−2y=4eˣ**

*Why not separation?* RHS−2y is a sum of a y-term and an x-term function; cannot factor as h(x)·g(y). Use the integrating factor.

**Standard form:** y' + P(x)y = Q(x) with P(x)=−2, Q(x)=4eˣ.

**Integrating factor:** μ(x) = e^{∫P(x)dx} = e^{∫(−2)dx} = e^{−2x}

**Multiply through by μ:**
$$e^{-2x}y' - 2e^{-2x}y = 4e^x \cdot e^{-2x} = 4e^{-x}$$

Recognise the left side as d/dx[μ·y]:
$$(e^{-2x}y)' = 4e^{-x}$$

**Integrate both sides:**
$$e^{-2x}y = \int 4e^{-x}\, dx = -4e^{-x} + C$$

**Solve for y:**
$$y = e^{2x}(-4e^{-x} + C) = -4e^x + Ce^{2x}$$

**Verification:** y'=−4eˣ+2Ce^{2x}; y'−2y=(−4eˣ+2Ce^{2x})−2(−4eˣ+Ce^{2x})=−4eˣ+8eˣ=4eˣ ✓

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Solve y'=2xy with y(1)=e.

**CORRECT:** Separable (RHS=2xy=h(x)·g(y) with h=2x, g=y). dy/y=2x dx. ln|y|=x²+C. y=Ae^{x²}. IC: e=Ae¹ → A=e⁰=1. Particular solution: y=e^{x²}.
→ "Correct. Verify: y'=2xe^{x²}=2x·y ✓." → Proceed to A03.

**PARTIAL:** Student separates correctly but writes y=e^{x²+C}=e^{x²} (drops A at IC step by setting C=0 instead of A=1).
→ "Good separation. IC: y(1)=e. General solution y=Ae^{x²}. At x=1: e=Ae^1 → A=e/e=1. Particular solution: y=1·e^{x²}=e^{x²}. You set C=0 incorrectly — C=0 is not the same as A=1. A=e^C, not C."

**INCORRECT:** Student tries integrating factor on y'=2xy (unnecessary — it is separable).
→ "y'=2xy is separable: move dy to left, dx to right: dy/y=2x dx. Integrate: ln|y|=x²+C → y=Ae^{x²}. The integrating factor is for non-separable linear equations. Separation is simpler here."

**NO_RESPONSE:** → "Check separability: y'=2xy = (2x)·y = h(x)·g(y) ✓. Separate: dy/y=2x dx. Integrate both sides: ln|y|=x²+C. Solve: y=Ae^{x²}. Apply y(1)=e: e=Ae¹ → A=1. Answer: y=e^{x²}."

---

### Teaching Action A03 — Contrast Pair: Method Selection and Common Errors

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Build method-selection judgment; contrast separable vs linear-IF; general vs particular; correct vs MC-2 constant handling

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Separable vs non-separable (MC-1):**

| ODE | RHS | Separable? | Reason |
|-----|-----|------------|--------|
| y'=xy | xy = x·y | ✓ | Product of h(x)=x and g(y)=y |
| y'=x+y | x+y | ✗ | Sum, not product; cannot factor |
| y'=y² | y² = 1·y² | ✓ | h(x)=1, g(y)=y² |
| y'=x+y² | x+y² | ✗ | Sum, not product |
| y'=xy−x | x(y−1) | ✓ | Factor out x: h(x)=x, g(y)=y−1 |

For non-separable linear equations y'+Py=Q → use the integrating factor μ=e^{∫Pdx}.

**Contrast 2 — General vs particular solution:**

| Setting | Form | Example for y'=3y |
|---------|------|-------------------|
| No IC | General: y=Ae^{3x} | Whole family of curves |
| y(0)=5 | Particular: y=5e^{3x} | A=5, single curve |

To find A: substitute the IC coordinates into the general solution and solve. Never set A=0 unless the IC forces it (A=0 gives y=0, the trivial solution).

**Contrast 3 — Correct vs MC-2 constant handling:**

*Wrong:* ln|y|=3x+C → y=e^{3x} (C dropped)

*Correct:* ln|y|=3x+C → |y|=e^{3x}·e^C → y=Ae^{3x} (A=±e^C, nonzero constant)

*IC example:* y(0)=2. Wrong gives y=e^{3·0}=1≠2. Correct gives y=Ae^{3·0}=A=2 → y=2e^{3x}. Dropping A makes it impossible to satisfy any non-trivial IC.

**Contrast 4 — Method decision tree:**

```
First-order ODE y'=f(x,y)?
         │
    Can RHS be written as h(x)·g(y)?
    YES ──────────────────────── NO
    Separate variables           Linear form y'+Py=Q?
                                 YES ──── NO
                                 IF method  → advanced methods
                                              (exact, Bernoulli, etc.)
```

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Identify the best method for each: (a) y'+3y=0, (b) y'=y·cos(x), (c) y'=x+2y.

**CORRECT:** (a) Separation (RHS=−3y=−3·y) OR integrating factor (linear, P=3, Q=0). (b) Separation (RHS=y·cos(x)=cos(x)·y). (c) Integrating factor (not separable — x+2y is a sum).
→ "Correct. Note (a) is both separable and linear — either method works. Choose the simpler one (separation here)." → Proceed to A04.

**PARTIAL:** Student identifies (b) correctly but classifies (c) as separable (MC-1).
→ "For (c): y'=x+2y. Is this h(x)·g(y)? Try: can x+2y be written as f(x)·g(y)? No — it's a sum. You cannot factor (x+2y) into a product with separated variables. Use the integrating factor: standard form y'−2y=x, P(x)=−2, Q(x)=x."

**INCORRECT:** Student applies separation to (c): divides by (x+2y).
→ "Dividing by (x+2y) gives dy/(x+2y)=dx, but the denominator still contains both x and y — the variables are not separated. For separation you need all y (and dy) on one side and all x (and dx) on the other. That's impossible here. Use the integrating factor."

**NO_RESPONSE:** → "(a) y'+3y=0: RHS=−3y — separable (or linear IF). (b) y'=y·cos(x): RHS=cos(x)·y — clearly separable. (c) y'=x+2y: RHS=x+2y is a sum. Cannot factor. Standard form: y'−2y=x. Use integrating factor μ=e^{∫(−2)dx}=e^{−2x}."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess fluent application of both separation and integrating factor methods

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Solve y'=3y, y(0)=2.

*Solution:* Separable. dy/y=3dx → ln|y|=3x+C → y=Ae^{3x}. IC: 2=A → **y=2e^{3x}**

**Problem 2:** Solve dy/dx = x/y.

*Solution:* Separable. y dy=x dx → y²/2=x²/2+C → **y²=x²+K** (K=2C arbitrary; y=±√(x²+K))

**Problem 3:** Solve y'+y=eˣ.

*Solution:* Linear, not separable (RHS=eˣ−y is a sum). P(x)=1, Q(x)=eˣ. μ=eˣ. (eˣy)'=e^{2x}. eˣy=e^{2x}/2+C. **y=(eˣ/2)+Ce^{−x}**

**Problem 4:** Verify y=3e^{−x}+2 is a particular solution of y'+y=2, and find the value of the initial condition it satisfies.

*Solution:* y'=−3e^{−x}. y'+y=(−3e^{−x})+(3e^{−x}+2)=2 ✓. IC: y(0)=3+2=**5** → y(0)=5.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A tank contains 100 L of fresh water. Brine with salt concentration 0.5 kg/L flows in at 3 L/min, and the well-mixed solution drains at 3 L/min.

(a) Let Q(t) be the kg of salt in the tank at time t minutes. Explain why Q satisfies a first-order linear ODE and write it in standard form y'+P(x)y=Q(x).

(b) Solve the ODE with the initial condition Q(0)=0.

(c) What is the salt content as t→∞? Interpret this physically.

**Expected solution:**

(a) Rate in: 0.5 kg/L × 3 L/min = 1.5 kg/min.
Rate out: (Q/100) kg/L × 3 L/min = 3Q/100 = 0.03Q kg/min.
dQ/dt = 1.5 − 0.03Q
Standard form: **Q' + 0.03Q = 1.5** (linear, P=0.03, Q(x)=1.5)

(b) Integrating factor: μ = e^{0.03t}.
(e^{0.03t}Q)' = 1.5e^{0.03t}
e^{0.03t}Q = 50e^{0.03t} + C
Q = 50 + Ce^{−0.03t}
IC Q(0)=0: 0 = 50 + C → C = −50
**Q(t) = 50(1 − e^{−0.03t})**

(c) As t→∞: Q→50 kg. Physical interpretation: the concentration approaches 0.5 kg/L × 100 L = 50 kg — the tank eventually reaches the same concentration as the incoming brine. Equilibrium is when inflow equals outflow.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.85 × 5⌉ = ⌈4.25⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.de.second-order-ode; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.de.first-order-ode assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SEPARATION-ON-NON-SEPARABLE (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Applying separation to a non-separable ODE is SEPARATION-ON-NON-SEPARABLE. Separation requires the RHS to factor as a product h(x)·g(y). A sum h(x)+g(y) cannot be separated."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Apply separation of variables to y'=y+x."
- MC-1 response: Student moves y to one side and x to the other: dy/(y)=x dx or similar incorrect expression.

**[P64 — CONCEPTUAL SHIFT]**
"Check: can y+x be written as h(x)·g(y)? Try: h(x)·g(y)=y+x. Whatever h and g are, h(x)·g(y) can equal y+x only if... it can't — no product of a pure-x function and a pure-y function gives y+x. The separability test fails. For y'=y+x: standard form is y'−y=x — linear with P(x)=−1, Q(x)=x. Use the integrating factor μ=e^{−x}."

Practice: For each — determine separable or IF-needed: (i) y'=xy² (sep), (ii) y'=x+y² (IF), (iii) y'=(x+1)y (sep: h=x+1, g=y).

---

### Repair Action B02 — CONSTANT-ABSORBED-PREMATURELY (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Writing y=e^{f(x)} after ln|y|=f(x)+C is CONSTANT-ABSORBED-PREMATURELY. The +C inside the exponent cannot be dropped — it becomes a multiplicative constant A=e^C."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Solve y'=2y step by step, writing each intermediate line."
- MC-2 response: ln|y|=2x+C → y=e^{2x} (last line skips the e^C factor).

**[P64 — CONCEPTUAL SHIFT]**
"Show the algebra explicitly: e^{2x+C}=e^{2x}·e^C. Since e^C is always positive (for any real C), write A=e^C. So y=A·e^{2x} where A>0. To allow negative solutions: y=±Ae^{2x}, which we consolidate as A∈ℝ\{0}. The constant A is what allows the IC to be satisfied: y(0)=A·e⁰=A=y(0). If A is dropped, all ICs except y(0)=1 are impossible."

Practice: Redo y'=y (from A01): ln|y|=x+C → y=A·e^x. Now apply y(0)=−3. Answer: A=−3, y=−3e^x. Verify −3<0: allowed since A∈ℝ\{0}.

---

### Repair Action B03 — SINGLE-SIDE-CONSTANT (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Adding the integration constant to only one side — or neither — is SINGLE-SIDE-CONSTANT. Both sides gain constants when integrated, but by convention they are combined into one constant C on the right."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Integrate both sides of y dy = x dx."
- MC-3 response: y²/2=x²/2 (no C).

**[P64 — CONCEPTUAL SHIFT]**
"When integrating, each integral produces a +C: ∫y dy + C₁ = ∫x dx + C₂. Rearranging: y²/2 = x²/2 + (C₂−C₁). Since C₂−C₁ is an arbitrary constant, call it C. Result: y²/2=x²/2+C. Without C, the answer y²=x² is one specific curve (C=0), not a general solution. Always carry C through; apply IC to determine C."

Practice: Redo y dy=x dx with IC y(1)=2. y²/2=x²/2+C → y²=x²+K. y(1)=2: 4=1+K → K=3. y=√(x²+3).

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Solve y'=xy, y(0)=1 (separable); solve y'+y=x (IF method); verify both |
| SR-2 | +3 days | Classify three ODEs as separable/IF/neither; solve the separable one step-by-step with correct constant handling |
| SR-3 | +7 days | Applied problem: exponential decay A'=−0.1A, A(0)=50; find half-life (t=ln2/0.1≈6.93) |
| SR-4 | +14 days | Linear first-order with variable P(x): y'+cos(x)·y=cos(x); IF=e^{sin(x)}; solution y=1+Ce^{-sin(x)} |

Retrieval flag: if student applies separation to a non-separable ODE (MC-1) or drops A after exponentiating (MC-2), re-execute B01/B02 immediately.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|--------------|
| Requires (Tier-1) | math.de.ode | ODE definition, order/degree, verification procedure, and general vs particular solution are assumed |
| Requires (Tier-1) | math.calc.antiderivatives | Integral tables (∫(1/y)dy=ln|y|, ∫e^{ax}dx, etc.) and the +C handling assumed fluent |
| Requires (Tier-1) | math.calc.u-substitution | Integrating factor method uses the product-rule structure d/dx[μy]=(μy)' and u-sub may appear in computing ∫P(x)dx |
| Unlocks | math.de.second-order-ode | Second-order ODEs build on first-order methods; reduction of order technique applies first-order skills |

**GR-9:** cross_links=[] → P76 mode = independence (tank-problem transfer probe is self-contained).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=6 → standard structure (3 main TAs + gate)
- bloom=apply → V-4 = PASS (P07 required; WE1=separable with IC, WE2=integrating factor in A02)
- CPA_entry = C for advanced learner: concrete antiderivative extension in A01 before the abstract algorithm

**Key teaching insight:** The two methods (separation and integrating factor) cover nearly all first-order ODEs students encounter. The decision tree in A03 (Contrast 4) is more valuable than memorising either method in isolation — students who can route correctly outperform those who know the methods but apply them to wrong equations. Every ODE in this blueprint should be prefaced with an explicit separability check before any computation begins.

**MC-2 permanence:** The constant-handling error (dropping A=e^C) is extremely persistent. WE1, the P49 checkpoints, and B02 all address it. Reinforce at every SR session by having the student write out the exponential expansion e^{f(x)+C}=e^C·e^{f(x)}=A·e^{f(x)} explicitly.

**P76 design:** The mixing-tank problem is the canonical first-order linear ODE application. Students who can set up the rate-in minus rate-out model, write the standard form, and solve with IF have genuinely mastered the concept. The equilibrium interpretation (c) tests conceptual understanding beyond computation.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.de.first-order-ode ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.de.ode ✓, math.calc.antiderivatives ✓, math.calc.u-substitution ✓ | PASS |
| V-3 | CPA entry = C for advanced difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 present | P07 in A02 (WE1=separable with IC, WE2=integrating factor) ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_links=[] → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=6 → standard (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Mixing-tank problem; Q'+0.03Q=1.5; Q=50(1−e^{-0.03t}); equilibrium Q→50 kg correct ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
