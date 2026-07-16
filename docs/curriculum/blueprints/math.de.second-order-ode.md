<!-- BLUEPRINT: math.de.second-order-ode -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Second-Order ODE
**Concept ID:** `math.de.second-order-ode`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=6 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.de.second-order-ode |
| name | Second-Order ODE |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 6 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.de.first-order-ode |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.de.first-order-ode**: separation of variables; integrating factor; general vs particular solutions; single arbitrary constant fixed by one initial condition; verification by substitution

### Target Knowledge State
Student fluently solves homogeneous linear second-order constant-coefficient ODEs ay″+by′+cy=0 via the characteristic equation ar²+br+c=0, handling all three root cases (distinct real → y=C₁e^{r₁x}+C₂e^{r₂x}; repeated real → y=(C₁+C₂x)e^{rx}; complex α±βi → y=e^{αx}(C₁cos βx+C₂sin βx)); applies TWO initial conditions y(x₀), y′(x₀) to fix both constants; verifies solutions by substitution; and recognises the standard form y″+P(x)y′+Q(x)y=G(x) and the homogeneous/non-homogeneous distinction.

### Conceptual Obstacles
1. Carrying over the one-constant habit — a second-order general solution needs TWO independent constants; writing y=Ce^{r₁x} (or fixing C₂=0 silently) loses half the solution family and makes the second initial condition unsatisfiable
2. The repeated-root case — when r₁=r₂=r, writing y=C₁e^{rx}+C₂e^{rx}=(C₁+C₂)e^{rx} collapses to ONE effective constant; the second independent solution is xe^{rx}, and forgetting the x-factor is the classic error
3. Complex roots mishandled — leaving the answer as C₁e^{(α+βi)x}+C₂e^{(α−βi)x} or dropping the real part; the real form e^{αx}(C₁cos βx+C₂sin βx) must be extracted via Euler's formula, and sign/placement errors in α and β are frequent

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SINGLE-CONSTANT-SOLUTION | Student writes the general solution with one arbitrary constant (y=Ce^{r₁x}), or applies only one initial condition; the solution family is half-missing and IVPs with two conditions become unsolvable | Any second-order general solution; IVPs specifying both y(0) and y′(0) |
| MC-2 | REPEATED-ROOT-COLLAPSE | For a double root r, student writes y=C₁e^{rx}+C₂e^{rx}, which is really one constant (C₁+C₂)e^{rx}; misses the xe^{rx} second solution | Characteristic equations with zero discriminant, e.g. y″−4y′+4y=0 |
| MC-3 | COMPLEX-ROOTS-MISREAD | Student misextracts α and β from roots α±βi (sign errors, swapping), or leaves complex exponentials in the final answer instead of the real cos/sin form | Characteristic equations with negative discriminant, e.g. y″+2y′+5y=0 |

**Foundational Misconception:** MC-1 (SINGLE-CONSTANT-SOLUTION) — the two-constant structure IS the defining feature of second-order equations (order = number of constants = number of initial conditions); a student missing it has not grasped what changed from first order, and MC-2 is its specialized recurrence.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner tests y=e^{rx} in a specific equation and watches the ODE collapse to a quadratic in r, discovering the characteristic-equation method rather than receiving it.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: guess y=e^{rx} in y″−5y′+6y=0 → (r²−5r+6)e^{rx}=0 → r=2,3; superposition gives two-constant family; P: solution-family/IC diagram; A: standard form, characteristic equation, superposition theorem, order=constants=conditions principle
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: distinct real roots with full IVP (two conditions, 2×2 system for C₁,C₂); WE2: complex roots with Euler extraction to the real form
3. **A03 P06 CONTRAST PAIR** — the three root cases side by side; repeated-root xe^{rx} fix; first-order vs second-order structural comparison
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Discovering the Characteristic Equation

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Derive the characteristic-equation method from a concrete trial solution; establish superposition and the two-constant principle before any case taxonomy; preempt MC-1 by counting constants against conditions

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (trial solution in y″−5y′+6y=0):**

First-order experience says exponentials solve linear constant-coefficient equations (y′=ky → y=Ae^{kx}). Try the same idea: guess **y=e^{rx}** with r unknown.

Compute: y′=re^{rx}, y″=r²e^{rx}. Substitute:

$$r^2e^{rx} − 5re^{rx} + 6e^{rx} = (r^2−5r+6)\,e^{rx} = 0$$

Since e^{rx}≠0 for every x, the guess works exactly when:

$$r^2 − 5r + 6 = 0 \implies (r−2)(r−3)=0 \implies r=2 \text{ or } r=3$$

Two solutions found: y₁=e^{2x} and y₂=e^{3x}. Check by substitution: (4−10+6)e^{2x}=0 ✓, (9−15+6)e^{3x}=0 ✓.

**Combine them:** if y₁ and y₂ solve the equation, so does any combination C₁y₁+C₂y₂ (the equation is linear and homogeneous — substitute and watch each piece vanish separately). General solution:

$$y = C_1e^{2x} + C_2e^{3x}$$

**Stage P — Pictorial (why TWO constants — the IC picture):**

```
 first order:  y' = ky            second order:  y'' − 5y' + 6y = 0
 family: 1 constant               family: 2 constants
 one curve per point:             one curve per point AND slope:
      ↑ pick y(0)                      ↑ pick y(0)  AND  y'(0)
   ───●───→                          ───●═══→  (position + direction)
```

A second-order equation prescribes the ACCELERATION; to pin one trajectory you must supply both starting position y(x₀) and starting velocity y′(x₀). Order 2 = 2 constants = 2 initial conditions.

**Stage A — Abstract (standard form and the method):**

**Standard form:** y″ + P(x)y′ + Q(x)y = G(x). If G≡0 the equation is **homogeneous**. This blueprint's core case: constant coefficients, homogeneous —

$$ay'' + by' + cy = 0,\qquad a\neq 0$$

**Characteristic equation:** substituting y=e^{rx} always yields

$$ar^2 + br + c = 0$$

**Superposition theorem:** if y₁, y₂ solve the homogeneous equation, so does C₁y₁+C₂y₂ for any constants.

**General solution structure:** two "independent" building-block solutions (not constant multiples of each other), combined with two arbitrary constants; the discriminant b²−4ac decides which building blocks (three cases, developed in A03).

**Solution protocol:**
1. Write the characteristic equation ar²+br+c=0
2. Solve it (quadratic formula); note the discriminant's sign
3. Write the two-constant general solution for the applicable case
4. If ICs are given: impose y(x₀) and y′(x₀), solve the 2×2 linear system for C₁, C₂
5. Verify by substitution

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Solve y″ − y′ − 6y = 0 (general solution only).

**CORRECT:** Characteristic: r²−r−6=0 → (r−3)(r+2)=0 → r=3, −2. General solution: y=C₁e^{3x}+C₂e^{−2x}.
→ "Correct. Two roots, two exponentials, two constants — the count is the structural signature of second order." → Proceed to A02.

**PARTIAL:** Student finds r=3, −2 but writes y=Ce^{3x} or y=C(e^{3x}+e^{−2x}) (MC-1 — one constant).
→ "Both roots earn their own INDEPENDENT constant: y=C₁e^{3x}+C₂e^{−2x}. With one constant you have a one-parameter family, but a second-order IVP imposes two conditions — y(0) and y′(0) — which one constant cannot satisfy in general. Two constants, always."

**INCORRECT:** Student writes the characteristic equation as r²−r−6y=0 or differentiates the guess wrongly (y″=r e^{rx}).
→ "Redo the substitution carefully: y=e^{rx} → y′=re^{rx} → y″=r²e^{rx} (each derivative brings down one factor of r). Then r²e^{rx}−re^{rx}−6e^{rx}=(r²−r−6)e^{rx}=0. The characteristic equation is r²−r−6=0 — pure algebra in r, no y left."

**NO_RESPONSE:** → "Step 1: characteristic equation r²−r−6=0. Step 2: factor: (r−3)(r+2)=0, so r=3 and r=−2. Step 3: each root gives an exponential solution; combine with independent constants: y=C₁e^{3x}+C₂e^{−2x}."

---

### Teaching Action A02 — Worked Example Pair: Full IVP and Complex Roots

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Model the complete solution protocol end-to-end — WE1 exercises the 2×2 constant-fixing system (MC-1 antidote); WE2 models the Euler extraction for complex roots (MC-3 antidote)

---

**[P07 — WORKED EXAMPLE PAIR]**

**WE1 — Distinct real roots with IVP: y″ + y′ − 2y = 0, y(0)=3, y′(0)=0**

**Step 1 — Characteristic equation:**
$$r^2 + r − 2 = 0 \implies (r+2)(r−1) = 0 \implies r = −2,\ 1$$

**Step 2 — General solution:**
$$y = C_1e^{x} + C_2e^{−2x}$$

**Step 3 — Impose both initial conditions:**
$$y(0)=3:\quad C_1 + C_2 = 3$$
$$y' = C_1e^{x} − 2C_2e^{−2x};\qquad y'(0)=0:\quad C_1 − 2C_2 = 0$$

**Step 4 — Solve the 2×2 system:** subtract: (C₁+C₂)−(C₁−2C₂)=3−0 → 3C₂=3 → C₂=1, then C₁=2.

**Particular solution:** y = 2eˣ + e^{−2x}

**Step 5 — Verify:** y″=2eˣ+4e^{−2x}, y′=2eˣ−2e^{−2x}. y″+y′−2y = (2+2−4)eˣ + (4−2−2)e^{−2x} = 0 ✓; y(0)=3 ✓; y′(0)=0 ✓.

---

**WE2 — Complex roots: y″ + 2y′ + 5y = 0**

**Step 1 — Characteristic equation:**
$$r^2 + 2r + 5 = 0 \implies r = \frac{−2 ± \sqrt{4−20}}{2} = \frac{−2 ± 4i}{2} = −1 ± 2i$$

**Step 2 — Read off α and β:** roots are α±βi with **α=−1, β=2**.

**Step 3 — Why cos/sin appear (Euler's formula):**
$$e^{(−1+2i)x} = e^{−x}e^{2ix} = e^{−x}(\cos 2x + i\sin 2x)$$
Real and imaginary parts of a complex solution of a real equation are each real solutions. Extract: y₁=e^{−x}cos 2x, y₂=e^{−x}sin 2x.

**Step 4 — Real general solution:**
$$y = e^{−x}(C_1\cos 2x + C_2\sin 2x)$$

**Interpretation:** e^{−x} is a decaying envelope; cos 2x/sin 2x oscillate — a damped oscillation. (α controls growth/decay; β controls the oscillation frequency.)

**Verification (y₁):** y₁′=e^{−x}(−cos 2x−2 sin 2x); y₁″=e^{−x}(−3cos 2x+4 sin 2x). Sum: y₁″+2y₁′+5y₁ = e^{−x}[(−3−2+5)cos 2x+(4−4)sin 2x]=0 ✓.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Solve y″ + 9y = 0 with y(0)=2, y′(0)=−3.

**CORRECT:** r²+9=0 → r=±3i, so α=0, β=3. General: y=C₁cos 3x+C₂sin 3x. y(0)=2 → C₁=2. y′=−3C₁sin 3x+3C₂cos 3x; y′(0)=−3 → 3C₂=−3 → C₂=−1. Answer: y=2cos 3x−sin 3x.
→ "Correct. With α=0 there is no exponential envelope — pure oscillation (this is the harmonic oscillator y″=−9y)." → Proceed to A03.

**PARTIAL:** Student reaches y=C₁cos 3x+C₂sin 3x but sets C₂ using y(0) again or forgets to differentiate before imposing y′(0) (MC-1's IC half).
→ "The second condition applies to the DERIVATIVE. Differentiate first: y′=−3C₁sin 3x+3C₂cos 3x. At x=0: sin 0=0, cos 0=1, so y′(0)=3C₂=−3 → C₂=−1. Each condition fixes its own constant through its own equation."

**INCORRECT:** Student writes r=±3 (real) and answers y=C₁e^{3x}+C₂e^{−3x} (MC-3 — sign of the discriminant misread).
→ "Solve r²+9=0: r²=−9, so r=±√(−9)=±3i — imaginary, not real. (r=±3 would solve r²−9=0.) With α=0, β=3 the real solution is y=C₁cos 3x+C₂sin 3x. Substitute your y=e^{3x} to see it fail: 9e^{3x}+9e^{3x}=18e^{3x}≠0."

**NO_RESPONSE:** → "Characteristic: r²+9=0 → r=±3i (α=0, β=3). General: y=C₁cos 3x+C₂sin 3x. IC 1: y(0)=C₁=2. Differentiate: y′=−6 sin 3x+3C₂cos 3x; IC 2: y′(0)=3C₂=−3 → C₂=−1. Final: y=2cos 3x−sin 3x."

---

### Teaching Action A03 — Contrast Pair: The Three Root Cases

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Consolidate the case taxonomy in one table; give the repeated-root fix (MC-2) its own explicit treatment with a collapse demonstration; contrast first- vs second-order structure

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — The three cases of ar²+br+c=0, decided by the discriminant Δ=b²−4ac:**

| Case | Roots | General solution | Example |
|------|-------|------------------|---------|
| Δ>0 | distinct real r₁≠r₂ | y=C₁e^{r₁x}+C₂e^{r₂x} | y″−5y′+6y=0 → C₁e^{2x}+C₂e^{3x} |
| Δ=0 | repeated real r | y=(C₁+C₂x)e^{rx} | y″−4y′+4y=0 → (C₁+C₂x)e^{2x} |
| Δ<0 | complex α±βi | y=e^{αx}(C₁cos βx+C₂sin βx) | y″+2y′+5y=0 → e^{−x}(C₁cos 2x+C₂sin 2x) |

All three cases: exactly two constants. The case only changes the building blocks.

**Contrast 2 — The repeated-root collapse and its fix (MC-2):**

Take y″−4y′+4y=0: characteristic r²−4r+4=(r−2)²=0, double root r=2.

*Naive attempt:* y=C₁e^{2x}+C₂e^{2x}=(C₁+C₂)e^{2x} — the two constants MERGE into one. This is a one-parameter family in disguise; it cannot meet two initial conditions. Something independent is missing.

*The fix:* try y=xe^{2x}. Then y′=(1+2x)e^{2x}, y″=(4+4x)e^{2x}. Substitute:
$$(4+4x)e^{2x} −4(1+2x)e^{2x} +4xe^{2x} = (4+4x−4−8x+4x)e^{2x} = 0 ✓$$

xe^{2x} is a genuine second solution, not a multiple of e^{2x}. Correct general solution:
$$y=(C_1+C_2x)e^{2x}$$

Rule: **double root r → multiply the second copy by x.**

**Contrast 3 — First order vs second order (structure table):**

| | First order y′+py=0 | Second order ay″+by′+cy=0 |
|--|---------------------|---------------------------|
| Characteristic object | r+p=0 (linear) | ar²+br+c=0 (quadratic) |
| Arbitrary constants | 1 | 2 |
| Initial conditions | y(x₀) | y(x₀) AND y′(x₀) |
| Solution shapes | pure exponential | exponentials, t-weighted exponentials, damped oscillations |

The pattern generalizes: order n → degree-n characteristic polynomial → n constants → n initial conditions (this is the road to higher-order ODEs).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Solve y″ + 6y′ + 9y = 0, y(0)=1, y′(0)=0.

**CORRECT:** r²+6r+9=(r+3)²=0 → double root r=−3. General: y=(C₁+C₂x)e^{−3x}. y(0)=C₁=1. y′=(C₂)e^{−3x}−3(C₁+C₂x)e^{−3x}; y′(0)=C₂−3C₁=0 → C₂=3. Answer: y=(1+3x)e^{−3x}.
→ "Correct — repeated root handled with the x-factor, and both conditions consumed. Verify at will: it satisfies both ICs and the equation." → Proceed to A04.

**PARTIAL:** Student writes y=C₁e^{−3x}+C₂e^{−3x} then gets stuck on the second IC (MC-2).
→ "Notice your two terms merge: C₁e^{−3x}+C₂e^{−3x}=(C₁+C₂)e^{−3x} — really ONE constant, and the system y(0)=1, y′(0)=0 becomes inconsistent (it would force −3(C₁+C₂)=0 but C₁+C₂=1). Double root r=−3 needs the x-factor: y=(C₁+C₂x)e^{−3x}. Now redo the ICs."

**INCORRECT:** Student computes the derivative of (C₁+C₂x)e^{−3x} without the product rule (writes y′=−3(C₁+C₂x)e^{−3x}).
→ "The x-factor demands the product rule: y′ = C₂·e^{−3x} + (C₁+C₂x)·(−3e^{−3x}). At x=0: y′(0)=C₂−3C₁. Set equal to 0 with C₁=1: C₂=3."

**NO_RESPONSE:** → "Characteristic: r²+6r+9=(r+3)²=0 — double root r=−3, so y=(C₁+C₂x)e^{−3x}. IC 1: y(0)=C₁=1. Product rule: y′=C₂e^{−3x}−3(C₁+C₂x)e^{−3x}, so y′(0)=C₂−3C₁=0 → C₂=3. Final: y=(1+3x)e^{−3x}."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess fluent handling of all three root cases and full IVP solving

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Solve y″ − 7y′ + 10y = 0.

*Solution:* r²−7r+10=(r−2)(r−5)=0 → r=2,5. **y=C₁e^{2x}+C₂e^{5x}**

**Problem 2:** Solve y″ + 4y′ + 4y = 0, y(0)=2, y′(0)=1.

*Solution:* (r+2)²=0 → double root r=−2. y=(C₁+C₂x)e^{−2x}. y(0)=C₁=2. y′=C₂e^{−2x}−2(C₁+C₂x)e^{−2x}; y′(0)=C₂−2C₁=1 → C₂=5. **y=(2+5x)e^{−2x}**

**Problem 3:** Solve y″ − 2y′ + 10y = 0.

*Solution:* r=(2±√(4−40))/2=1±3i → α=1, β=3. **y=eˣ(C₁cos 3x+C₂sin 3x)**

**Problem 4:** Verify that y=e^{−x}sin 2x satisfies y″+2y′+5y=0, and state which characteristic roots this solution corresponds to.

*Solution:* y′=e^{−x}(2cos 2x−sin 2x); y″=e^{−x}(−3sin 2x−4cos 2x). Sum: y″+2y′+5y=e^{−x}[(−3−2+5)sin 2x+(−4+4)cos 2x]=0 ✓. Roots: **−1±2i** (α=−1 from the envelope e^{−x}, β=2 from sin 2x).

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A mass on a spring with friction obeys

$$x'' + 2x' + 26x = 0$$

where x(t) is the displacement (cm) at time t (s). The mass is pulled to x(0)=5 cm and released from rest (x′(0)=0).

(a) Solve the initial value problem.
(b) Identify the decay envelope and the oscillation frequency, and describe the motion in one sentence.
(c) Show that the mass passes through the equilibrium position x=0 infinitely many times, and find the first positive time it does so.

**Expected solution:**

(a) Characteristic: r²+2r+26=0 → r=(−2±√(4−104))/2=−1±5i → α=−1, β=5.
General: x=e^{−t}(C₁cos 5t+C₂sin 5t).
x(0)=5 → C₁=5.
x′=e^{−t}(−C₁cos 5t−C₂sin 5t−5C₁sin 5t+5C₂cos 5t); x′(0)=−C₁+5C₂=0 → C₂=1.
**x(t)=e^{−t}(5cos 5t+sin 5t)**

(b) Decay envelope e^{−t} (amplitude shrinks by factor e each second); oscillation frequency β=5 rad/s (period 2π/5≈1.26 s). The mass oscillates about equilibrium with exponentially dying amplitude — damped oscillation (underdamped: Δ<0).

(c) x(t)=0 requires 5cos 5t+sin 5t=0 (the envelope e^{−t} is never zero), i.e. tan 5t=−5. Since tan is periodic, solutions occur once every π/5 seconds — infinitely many crossings. First positive: 5t=π−arctan 5 → **t=(π−arctan 5)/5 ≈ (3.1416−1.3734)/5 ≈ 0.354 s**.

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

- MASTERY ACHIEVED → unlock math.de.higher-order-ode and math.de.systems-ode; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.de.second-order-ode assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SINGLE-CONSTANT-SOLUTION (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Writing a second-order general solution with one constant is SINGLE-CONSTANT-SOLUTION. Order 2 means two constants and two initial conditions — position AND velocity."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Write the general solution of y″−9y=0."
- MC-1 response: y=Ce^{3x} (or any one-constant answer).

**[P64 — CONCEPTUAL SHIFT]**
"Count degrees of freedom physically: y″−9y=0 prescribes acceleration from position. To launch a trajectory you choose where to start (y(0)) and how fast (y′(0)) — two independent choices, so the family must have two dials. Roots r=±3 give y=C₁e^{3x}+C₂e^{−3x}. Test your one-constant answer against y(0)=0, y′(0)=1: Ce⁰=0 forces C=0, but then y′(0)=0≠1 — unsolvable. With two constants: C₁+C₂=0, 3C₁−3C₂=1 → C₁=1/6, C₂=−1/6. Solvable."

Practice: y″−y=0 with y(0)=1, y′(0)=−1 (answer: y=e^{−x}; here the ICs happen to zero out C₁ — but only the two-constant setup can discover that).

---

### Repair Action B02 — REPEATED-ROOT-COLLAPSE (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Writing C₁e^{rx}+C₂e^{rx} for a double root is REPEATED-ROOT-COLLAPSE — the constants merge and you secretly have a one-parameter family. The second independent solution is xe^{rx}."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "General solution of y″−6y′+9y=0?"
- MC-2 response: y=C₁e^{3x}+C₂e^{3x}.

**[P64 — CONCEPTUAL SHIFT]**
"Simplify your answer: C₁e^{3x}+C₂e^{3x}=(C₁+C₂)e^{3x}=Ke^{3x} — one dial, not two. The repair: when (r−3)²=0, the second building block is xe^{3x}. Verify it: y=xe^{3x} → y′=(1+3x)e^{3x} → y″=(6+9x)e^{3x}; then y″−6y′+9y=(6+9x−6−18x+9x)e^{3x}=0 ✓. Correct family: y=(C₁+C₂x)e^{3x}. Trigger to memorize: discriminant zero → x-factor."

Practice: Solve y″+10y′+25y=0, y(0)=0, y′(0)=2 (answer: y=2xe^{−5x} — note C₁=0 is forced, and only the x-term survives).

---

### Repair Action B03 — COMPLEX-ROOTS-MISREAD (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Extracting α, β wrongly from complex roots — or leaving complex exponentials in the final answer — is COMPLEX-ROOTS-MISREAD. Roots α±βi give the real solution e^{αx}(C₁cos βx+C₂sin βx)."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Roots of the characteristic equation are −2±7i. Write the general solution."
- MC-3 response: y=e^{7x}(C₁cos 2x+C₂sin 2x) (α and β swapped), or y=C₁e^{(−2+7i)x}+C₂e^{(−2−7i)x} left complex.

**[P64 — CONCEPTUAL SHIFT]**
"Anchor the roles: α is the REAL part — it sits alone and becomes the exponential envelope e^{αx}. β is the coefficient OF i — it becomes the frequency inside cos/sin. For −2±7i: α=−2 (decay envelope e^{−2x}), β=7 (oscillation cos 7x, sin 7x): y=e^{−2x}(C₁cos 7x+C₂sin 7x). Sanity check via Euler: e^{(−2+7i)x}=e^{−2x}(cos 7x+i sin 7x) — the real part carries e^{−2x}cos 7x, exactly matching. Swapped α/β would claim a GROWING envelope e^{7x} from a damped system — physically absurd for negative real part."

Practice: Write general solutions for roots: 3±i; ±4i; −1±√2 i. (Answers: e^{3x}(C₁cos x+C₂sin x); C₁cos 4x+C₂sin 4x; e^{−x}(C₁cos √2x+C₂sin √2x).)

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | One equation from each root case (general solutions only); state the discriminant rule from memory |
| SR-2 | +3 days | Full IVP with distinct real roots (2×2 system for C₁,C₂); verify by substitution |
| SR-3 | +7 days | Repeated-root IVP and complex-root IVP; explicit product-rule derivative before imposing y′(0) |
| SR-4 | +14 days | Damped-oscillator modeling problem (mass-spring, Δ<0); identify envelope, frequency, first zero-crossing |

Retrieval flag: if student produces a one-constant general solution (MC-1) or writes C₁e^{rx}+C₂e^{rx} for a double root (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|--------------|
| Requires (Tier-1) | math.de.first-order-ode | Exponential trial solutions, general-vs-particular, IC mechanics; this blueprint doubles the constants and conditions |
| Unlocks | math.de.higher-order-ode | Order n → degree-n characteristic polynomial with the same case rules (A03 Contrast 3 previews this) |
| Unlocks | math.de.systems-ode | A second-order equation converts to a 2×2 first-order system; eigenvalues replay the characteristic roots |

**GR-9:** cross_links=[] → P76 mode = independence (mass-spring transfer probe is self-contained).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=6 → standard structure (3 main TAs + gate)
- bloom=apply → V-4 = PASS (P07 required; WE1=full IVP distinct roots, WE2=complex roots in A02)
- CPA_entry = C for advanced learner: trial-solution discovery in A01 before any case taxonomy

**Key teaching insight:** The method should feel discovered, not decreed: the trial y=e^{rx} collapses the ODE into a quadratic before the student's eyes (A01 Stage C), making the characteristic equation an observation rather than a recipe. The organizing principle to drill relentlessly is the count: order 2 = 2 constants = 2 initial conditions. Every misconception in the registry is a violation of that count or of the case table.

**Case-table pedagogy (A03):** The three cases should be taught as one table with a single decision variable (the discriminant), not as three separate methods. MC-2 deserves the explicit "collapse demonstration" — showing C₁e^{rx}+C₂e^{rx} merging into one constant is far more convincing than asserting that xe^{rx} is needed.

**Scope note:** This blueprint covers the homogeneous constant-coefficient core plus recognition of the general standard form y″+P(x)y′+Q(x)y=G(x). Non-homogeneous techniques (undetermined coefficients, variation of parameters) belong to the higher-order/systems follow-on concepts and are only named here as the meaning of G(x)≠0.

**P76 design:** The damped mass-spring problem is the canonical second-order application (per the KG description: "Newton's second law, harmonic oscillators"). Part (c) — the zero-crossing computation — forces genuine engagement with the cos/sin structure (envelope never vanishes; the trig factor does), separating students who understand the solution's anatomy from those who only assembled it.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.de.second-order-ode ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.de.first-order-ode ✓ | PASS |
| V-3 | CPA entry = C for advanced difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 present | P07 in A02 (WE1=IVP distinct roots, WE2=complex roots) ✓ | PASS |
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
| V-20 | P76 transfer probe is novel and correct | Mass-spring x″+2x′+26x=0; x=e^{−t}(5cos 5t+sin 5t); first crossing (π−arctan 5)/5≈0.354 s ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
