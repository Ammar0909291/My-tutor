<!-- BLUEPRINT: math.de.ode -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Ordinary Differential Equation
**Concept ID:** `math.de.ode`
**KG Fields:** difficulty=advanced | bloom=understand | estimated_hours=4 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.de.ode |
| name | Ordinary Differential Equation |
| difficulty | advanced |
| bloom | understand |
| estimated_hours | 4 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.calc.derivative-intro, math.calc.antiderivatives, math.func.function-concept |
| cross_links | math.phys.classical-mechanics (NOT Tier-1) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.calc.derivative-intro**: derivative as instantaneous rate of change; dy/dx notation; slope interpretation
- **math.calc.antiderivatives**: F'=f means F is an antiderivative of f; general solution F(x)+C; initial conditions determine C
- **math.func.function-concept**: function as a rule y=f(x); domain; the distinction between an equation in x and y vs. an equation involving a function and its derivatives

### Target Knowledge State
Student understands that an ODE is an equation relating an unknown function and its derivatives; can identify the order (highest derivative present) and degree (power of that highest-order derivative); distinguishes general solutions (containing arbitrary constants) from particular solutions (constants fixed by initial/boundary conditions); verifies that a proposed function satisfies an ODE by substituting and differentiating; and recognises ODEs in physical modelling contexts (exponential growth/decay, harmonic motion).

### Conceptual Obstacles
1. Expecting the "solution" to be a number (as in algebraic equations x=3) rather than a function y(x) satisfying the equation for all x in some interval
2. Confusing the order (highest derivative's index) with the degree (power of that derivative); (y'')²+y=0 has order 2 and degree 2, not order 4
3. Not understanding why the general solution has exactly n arbitrary constants (one per order) — and why an initial/boundary condition fixes each one uniquely

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SOLUTION-IS-A-NUMBER | Student expects an ODE to "solve for y" as a specific number or value, not as a function y(x); may write y=5 or "y is some constant" as the solution | First exposure to ODE; any verification or solution-construction problem |
| MC-2 | ORDER-VERSUS-DEGREE | Student reports the degree of the highest derivative (power) as the order, or vice versa; e.g., in (y'')³+y=0, claims order=3 (the exponent) instead of order=2 (the index of the highest derivative) | Classification problems; equations with higher powers of derivatives |
| MC-3 | GENERAL-PARTICULAR-CONFLATED | Student doesn't recognise that a general solution requires one constant C per order; writes a "particular" solution without boundary conditions, or adds too many or too few constants | Solution construction; initial-value problems |

**Foundational Misconception:** MC-1 (SOLUTION-IS-A-NUMBER) — all subsequent ODE work (verification, general solution, initial conditions) depends on understanding that the "answer" is a function; addressed first in A01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner begins with a concrete ODE from known calculus (antiderivative problem) before abstracting.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: a position/velocity ODE s'(t)=2t is recognised as the antiderivative problem ∫2t dt=t²+C; observe that the solution is a function with a constant; P: algebraic equation vs ODE contrast (number-solution vs function-solution); A: formal definition, order, degree, general and particular solutions
2. **A02 P06 CONTRAST PAIR** — first-order vs second-order ODEs; linear vs nonlinear; autonomous vs non-autonomous; solution verification procedure
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — What an ODE Is and What Its Solution Means

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Establish that ODE solutions are functions, not numbers; connect to known antiderivative work; define order, degree, general and particular solutions; address MC-1 and MC-3

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (a familiar ODE disguised as an antiderivative problem):**

You already know: if s'(t)=2t, then s(t)=∫2t dt = t² + C.

This IS an ODE: s'=2t is an equation involving the unknown function s and its first derivative. Its general solution s(t)=t²+C is a function of t, with one free constant C.

If we know s(0)=3 (an initial condition), we can find C: s(0)=0+C=3 → C=3. The **particular solution** is s(t)=t²+3.

**Stage P — Pictorial (algebraic equation vs ODE):**

| | Algebraic equation | ODE |
|-|--------------------|-----|
| Example | x² − 4 = 0 | y' − 2y = 0 |
| Unknown | A number x | A function y(x) |
| Solution | x = ±2 (two numbers) | y(x) = Ce^{2x} (a family of functions) |
| How many solutions? | Finitely many | Infinitely many (one per value of C) |
| What pins it down? | The equation has finitely many roots | An initial condition y(0)=y₀ fixes C |

**Stage A — Algebraic (formal definitions):**

**Definition:** An ordinary differential equation (ODE) is an equation of the form:
$$F\!\left(x,\, y,\, y',\, y'',\, \ldots, y^{(n)}\right) = 0$$
where y=y(x) is the unknown function and y^{(k)} denotes its k-th derivative.

**Order:** The order of an ODE is the index of the highest-order derivative that appears.

**Degree:** The degree is the power (exponent) to which that highest-order derivative is raised, after clearing fractions/radicals.

| ODE | Order | Degree |
|-----|-------|--------|
| y' = 3x | 1 | 1 |
| y'' + y = 0 | 2 | 1 |
| (y'')³ + y' = 0 | 2 | 3 |
| (y')² = 1−y² | 1 | 2 |
| y'' + sin(y') = x | 2 | 1 |

**General solution:** A family of functions containing n arbitrary constants (for an n-th order ODE), satisfying the equation identically.

**Particular solution:** A specific function from the general solution family, obtained by applying initial or boundary conditions to determine each arbitrary constant.

---

**[P49 — ADAPTIVE CHECKPOINT]**

What is the order and degree of y''' − (y')² + 3y = cos(x)?

- **CORRECT** → Order: 3 (highest derivative is y'''); Degree: 1 (y''' appears to the first power). The (y')² term has y' to the second power, but degree is the power of the HIGHEST-order derivative (y'''), not any derivative.
- **PARTIAL** → Student may say order=3 correctly but degree=2 (confusing the ² on y' with the degree). Clarify: "Degree is the power of the HIGHEST-ORDER derivative. The highest is y''' and it appears to the first power. The (y')² term is not the highest-order."
- **INCORRECT** → Student gives order=1 (looking at the highest power, which is the ² on y') or order=4 (misinterpreting y''' as y⁴). Redirect: "Order = the highest NUMBER of primes on a y. Count the primes on each derivative: y' has 1, y''' has 3. Highest is 3."
- **NO_RESPONSE** → Prompt: "Find the y-term with the most derivative symbols (' marks). How many does it have? That's the order."

---

### Teaching Action A02 — ODE Classification and Solution Verification

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Distinguish first-order vs second-order, linear vs nonlinear; demonstrate the verification procedure (substitute and check); address MC-2

---

**[P06 — CONTRAST PAIR]**

**Classification table:**

| Criterion | First-order | Second-order |
|-----------|-------------|--------------|
| Highest derivative | y' | y'' |
| General solution | 1 constant (C) | 2 constants (C₁, C₂) |
| Needs to fix solution | 1 initial condition | 2 conditions |
| Example | y' = ky | y'' + ω²y = 0 |
| Physical model | Exponential growth/decay | Harmonic oscillator |

| Criterion | Linear | Nonlinear |
|-----------|--------|-----------|
| y and its derivatives | Appear to first power only | Appear in products, powers, or nonlinear functions |
| Example | y'' − 3y' + 2y = sin(x) | y' = y² or y'·y'' = 1 |
| Superposition | Solutions can be added (if homogeneous) | Generally no superposition |

**Canonical ODEs with known solutions:**

| ODE | General Solution | Physics |
|-----|-----------------|---------|
| y' = ky | y = Ce^{kx} | Exponential growth (k>0) or decay (k<0) |
| y' = −ky | y = Ce^{−kx} | Radioactive decay, cooling |
| y'' + ω²y = 0 | y = C₁cos(ωx)+C₂sin(ωx) | Simple harmonic oscillator |
| y'' = g | y = (1/2)gx² + C₁x + C₂ | Free fall under constant gravity |

**Solution verification procedure:**

To verify that y=f(x) satisfies ODE F(x,y,y',…)=0:
1. Compute y', y'', … by differentiating f(x).
2. Substitute into the left-hand side of the ODE.
3. Simplify: if the result equals the right-hand side identically (for all x), the function is a solution.

*Example:* Verify y=3e^{−2x} satisfies y'+2y=0.
y'=−6e^{−2x}; y'+2y=−6e^{−2x}+6e^{−2x}=0 ✓.

---

**[P49 — ADAPTIVE CHECKPOINT]**

Verify that y=sin(3x) satisfies y''+9y=0.

- **CORRECT** → y'=3cos(3x); y''=−9sin(3x). y''+9y=−9sin(3x)+9sin(3x)=0 ✓.
- **PARTIAL** → Student computes y' correctly but makes error in y''. Ask: "Differentiate y'=3cos(3x) using the chain rule."
- **INCORRECT** → Student substitutes x directly into the ODE without differentiating y. Redirect: "To verify, differentiate y=sin(3x) twice to get y'' and substitute back."
- **NO_RESPONSE** → Prompt: "Step 1: differentiate y=sin(3x) to get y'. Step 2: differentiate y' to get y''. Step 3: compute y''+9y."

---

### Teaching Action A03 — Mastery Gate

**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)

---

**[P77 — MULTI-PROBLEM SET]** *(4 items)*

**Item 1:** State the order and degree of (y'')³ + 2y' − y = x².

*Solution:* Highest derivative: y'' (order 2). It appears to the power 3. **Order = 2, Degree = 3.**

**Item 2:** Verify that y=3e^{2x} is a solution of y'−2y=0.

*Solution:* y'=6e^{2x}; y'−2y=6e^{2x}−6e^{2x}=0 ✓. Yes, y=3e^{2x} is a solution.

**Item 3:** The general solution of y'=3x² is y=x³+C. Find the particular solution satisfying y(0)=5.

*Solution:* y(0)=0+C=5 → C=5. **Particular solution: y=x³+5.**

**Item 4:** Which of the following is an ODE? (a) x²+y²=1; (b) y'=x·y; (c) ∂y/∂t=y².

*Solution:* (a) Algebraic equation — not an ODE. (b) **ODE** — involves unknown function y(x) and its derivative y'=dy/dx. (c) Partial differential equation (PDE) — involves a partial derivative with respect to t, not an ordinary derivative.

---

**[P55 — SCORE]** Count correct items (Items 1–4). Running total: _/4.

---

**[P76 — TRANSFER PROBE]** *(independence mode)*

A radioactive substance decays at a rate proportional to its current mass:
$$\frac{dM}{dt} = -0.03\,M, \quad M(0) = 100 \text{ g}$$

**(a)** State the order and degree of this ODE.

**(b)** Verify that M(t) = M₀e^{−0.03t} is a solution for any constant M₀.

**(c)** Apply the initial condition M(0)=100 to find the particular solution.

**(d)** Find the half-life: the time T at which M(T) = 50 g.

---

*Expected solution:*

(a) Highest derivative: dM/dt (first derivative). Power = 1. **Order = 1, Degree = 1.**

(b) M'(t)=−0.03M₀e^{−0.03t}. Check: M'−(−0.03M)=−0.03M₀e^{−0.03t}+0.03·M₀e^{−0.03t}=0 ✓.

(c) M(0)=M₀e⁰=M₀=100 → M₀=100. **Particular solution: M(t)=100e^{−0.03t}.**

(d) 100e^{−0.03T}=50 → e^{−0.03T}=0.5 → −0.03T=ln(0.5)=−ln2 → T=ln2/0.03 ≈ **23.1 years.**

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

- **PASS (5/5):** Concept mastered. Proceed to math.de.first-order-ode, math.de.second-order-ode.
- **FAIL:** Diagnose: Item 1 wrong → B-MC2. Item 2 (verification) wrong → B-MC1 (solution concept). Item 3 (particular solution) wrong → B-MC3.

---

**[P55 — SCORE]** Log routing outcome.

---

**[P78 — COMPLETION]**

Session complete for math.de.ode.

---

## Component 5 — Protocol B (Repair Sequences)

### B-MC1 — Repair: SOLUTION-IS-A-NUMBER

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You're treating the ODE solution as a number, like solving x²=4 gives x=2. But an ODE solution is a function y(x) — an entire rule assigning outputs to inputs — not a single value."

**[P41 — MISCONCEPTION DETECTOR]**
Check: is y=5 a solution of y'=2x? Compute y'=d/dx(5)=0. Does 0=2x for all x? No — only at x=0. A constant doesn't work. Try y=x²: y'=2x. Does 2x=2x? Yes, for all x! So y=x² is a solution. The "solution" is a function, checked for ALL x, not at one point.

**[P64 — CONCEPTUAL SHIFT]**
An algebraic equation (like x²=4) is a condition on a number. An ODE (like y'=2x) is a condition on a function — it must hold at every point in the domain. The solution is a function that makes the equation true everywhere, not a number that makes it true at one point. Think of it as: "find the curve whose slope at every x equals 2x" — the answer is a parabola, a geometric object, not a point.

---

### B-MC2 — Repair: ORDER-VERSUS-DEGREE

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You reported the degree as the order, or vice versa. Order is about which derivative is present (how many times the function is differentiated); degree is about the power of that derivative in the equation."

**[P41 — MISCONCEPTION DETECTOR]**
Two equations: (a) y'''=0 (order=3, degree=1 — third derivative to the first power); (b) (y')²=1−y² (order=1, degree=2 — first derivative squared). In (a), order=3 is the NUMBER OF PRIMES on y'''. Degree=1 because y''' appears to the first power. In (b), order=1 but degree=2 because y' appears squared.

**[P64 — CONCEPTUAL SHIFT]**
Order = count the prime marks on the highest derivative (y'=1, y''=2, y'''=3, etc.). Degree = the exponent on that highest-order derivative (after clearing fractions). A useful check: degree≥1 always (you can't have a derivative to the zeroth power — that's just a function, not a derivative). Order and degree are independent: an ODE can have high order and low degree, or low order and high degree.

---

### B-MC3 — Repair: GENERAL-PARTICULAR-CONFLATED

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You mixed up the general solution (a family with free constants) and the particular solution (a specific member of that family). The general solution of an n-th order ODE always has exactly n arbitrary constants."

**[P41 — MISCONCEPTION DETECTOR]**
ODE: y'=6x (first order). Integrate: y=3x²+C. This is the general solution — it represents infinitely many parabolas. If y(0)=7: 3·0+C=7 → C=7 → y=3x²+7. This particular solution is the unique parabola passing through (0,7) with the right slope everywhere. Without the condition, any C works; with it, exactly one C is forced.

**[P64 — CONCEPTUAL SHIFT]**
An n-th order ODE needs n integrations to reach the solution function, and each integration introduces one constant (C₁, C₂, … Cₙ). The general solution is all functions with those n free constants. Each initial/boundary condition is one equation, and n conditions pin down all n constants uniquely (under appropriate hypotheses). Missing a constant in the general solution means missing entire families of solutions.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Interval | Prompt |
|----------|--------|
| Day 1 | Classify: y'' − 5y' + 6y = e²ˣ. Order? Degree? Linear or nonlinear? [Order=2, degree=1, linear] |
| Day 3 | Verify y=e^{−x}+2 is NOT a solution of y'+y=0. [y'=−e^{−x}; y'+y=−e^{−x}+e^{−x}+2=2≠0] |
| Day 7 | y'=−0.1y, y(0)=50. Find the particular solution. [y=50e^{−0.1x}] |
| Day 14 | True/False: the general solution of a second-order ODE always has exactly two arbitrary constants. [True — under regularity conditions (Picard-Lindelöf); for explicit n-th order ODEs this holds.] |

---

## Component 7 — Cross-Blueprint Dependencies

### Prerequisite Blueprints Required
| Concept ID | Blueprint Status | Dependency |
|------------|-----------------|------------|
| math.calc.derivative-intro | Required | Derivative concept and notation are the core language of ODEs |
| math.calc.antiderivatives | PACKAGE_READY | General solution via integration; +C as the origin of the arbitrary constant |
| math.func.function-concept | Required | ODE solution is a function, not a number — this understanding is the prerequisite |

### Blueprints This Unlocks
| Concept ID | Dependency |
|------------|------------|
| math.de.first-order-ode | Requires ODE concept, order/degree, verification |
| math.de.second-order-ode | Requires ODE concept and two-constant general solution understanding |

### Cross-Links
| Concept ID | T1 Status | Notes |
|------------|-----------|-------|
| math.phys.classical-mechanics | NOT T1 | ODEs naturally arise in mechanics (Newton's second law as a second-order ODE); cross-domain preview |

---

## Component 8 — Teaching Notes

**The "solution is a function" shift is everything:** Students who have spent years solving algebraic equations for numbers need to make a genuine conceptual shift. A01's Stage C uses the antiderivative problem — which they already know — to reframe it as an ODE, making the shift feel like a renaming rather than a leap. The Stage P contrast table (number vs. function solutions) then makes the difference explicit.

**Verification as the primary tool:** At the ODE-introduction level, students cannot yet solve most ODEs. But they can always VERIFY whether a given function is a solution. This is the key skill A02 develops — differentiate, substitute, simplify to 0. It builds rigour without requiring solution techniques, and it prepares students for the first-order and second-order ODE blueprints.

**Order vs. degree mnemonic:** Order = position of the derivative in the sequence (1st, 2nd, 3rd). Degree = power (1st power, squared, cubed). The confusion comes from using numbers for both. Require students to say "order 2" and "degree 3" (not just 2 and 3) until the distinction is automatic.

---

## Component 10 — Validation Checklist

| ID | Check | Status |
|----|-------|--------|
| V-1 | All Teaching Actions have assigned primitives | PASS |
| V-2 | GR-1: A01 opens with P11 (B-category primitive, non-repair) | PASS |
| V-3 | CPA entry stage = C for advanced difficulty | PASS |
| V-4 | bloom=understand → no P07 required; V-4 = N/A | N/A |
| V-5 | GR-2: P49 present in A01 and A02, each with 4 branches | PASS |
| V-6 | GR-3: A03 (P91) is terminal — no further TAs after gate | PASS |
| V-7 | GR-4: All B-sequences open with P27+P41+P64 | PASS |
| V-8 | GR-6: P91 is terminal in A03 | PASS |
| V-9 | GR-7: P76 present inside A03 mastery gate | PASS |
| V-10 | GR-9: cross_t1=[] → P76 mode = independence | PASS |
| V-11 | GR-10: MAMR=5/5 stated and enforced (thresh=0.85, n=5: ⌈0.85×5⌉=5) | PASS |
| V-12 | PASS criterion (5/5) stated in P75 and P74 | PASS |
| V-13 | GR-8: Component 7 documents all cross-blueprint dependencies | PASS |
| V-14 | Lean structure: h=4 → 2 main TAs (A01,A02) + gate (A03) | PASS |
| V-15 | Component 0 metadata fields complete | PASS |
| V-16 | Component 1 (prior anchors, target state, obstacles) complete | PASS |
| V-17 | Component 2: 3 MCs with 1 foundational designated | PASS |
| V-18 | Component 3 scaffolding protocol complete | PASS |
| V-19 | Component 6 P89 schedule complete (4 intervals) | PASS |
| V-20 | Component 8 teaching notes complete | PASS |
| AIR | No prohibited operations (no curriculum modification, no framework redesign) | PASS |

**Status: PACKAGE_READY**
