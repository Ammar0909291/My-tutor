# Blueprint: math.de.bernoulli

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.bernoulli |
| name | Bernoulli ODE |
| Domain | math.de |
| Difficulty | advanced |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.de.linear-first-order |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student identifies a Bernoulli ODE of the form dy/dx + P(x)y = Q(x)yⁿ (n ≠ 0, 1); makes the substitution v = y^{1−n} to transform it into a linear first-order ODE in v; solves that linear ODE using the integrating factor method; and converts back to y.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw dy/dx + Py = Qyⁿ on the left; show an arrow labelled "divide by yⁿ"; then show y^{−n}dy/dx + Py^{1−n} = Q; then an arrow labelled "let v=y^{1−n}" and show dv/dx=(1−n)y^{−n}dy/dx; result: (1/(1−n))dv/dx + Pv = Q — a linear ODE in v; annotate: "One substitution turns a nonlinear ODE into a linear ODE")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | WRONG-EXPONENT-IN-SUBSTITUTION | Student substitutes v = yⁿ instead of v = y^{1−n}, getting a different (wrong) equation | Type 1 — overgeneralisation (the denominator of y^{−n} in the divide-by-yⁿ step makes students think the substitution involves the exponent n directly, not 1−n) |
| MC-2 | FORGETTING-THE-1-MINUS-N-FACTOR-IN-DV-DX | Student computes dv/dx = y^{−n}dy/dx (without the (1−n) factor) when differentiating v = y^{1−n}, making the substitution incorrect | Type 5 — instruction-induced (students apply the chain rule but forget the power-rule coefficient: d/dx[y^{1−n}] = (1−n)y^{−n}dy/dx, not y^{−n}dy/dx) |
| MC-3 | BERNOULLI-APPLIES-FOR-ALL-N | Student attempts the Bernoulli substitution for n=0 or n=1 (which are already linear ODEs not needing this method), or applies it when the right side is Q(x)·f(y) with f not a power function | Type 1 — overgeneralisation (the pattern yⁿ on the right triggers the Bernoulli label; students don't check whether n=0 or n=1, which are excluded cases) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The Bernoulli substitution:**

**Bernoulli ODE:** dy/dx + P(x)y = Q(x)yⁿ, where n ≠ 0, 1.

**Excluded cases:**
- n = 0: dy/dx + P(x)y = Q(x) — already linear; solve directly.
- n = 1: dy/dx + P(x)y = Q(x)y → dy/dx = [Q(x)−P(x)]y — separable; solve directly.

**Substitution:** v = y^{1−n}.
**Derivative:** dv/dx = (1−n)y^{−n} dy/dx (chain rule).
**Divide ODE by yⁿ:** y^{−n}dy/dx + P(x)y^{1−n} = Q(x).
**Substitute:** (1/(1−n))dv/dx + P(x)v = Q(x).
**Multiply by (1−n):** dv/dx + (1−n)P(x)v = (1−n)Q(x) — LINEAR in v!

**Worked example — logistic equation variant:**
dy/dx − y = −y². Here n=2. v = y^{−1}.
dv/dx = −y^{−2}dy/dx. Divide by y²: y^{−2}dy/dx − y^{−1} = −1.
Substitute: −dv/dx − v = −1 → dv/dx + v = 1.
Integrating factor: e^x. (e^x v)' = e^x. e^x v = e^x + C. v = 1 + Ce^{−x}.
Convert back: 1/y = 1 + Ce^{−x} → y = 1/(1 + Ce^{−x}).

**P49 checkpoint:**
- CORRECT → "Bernoulli: n≠0,1. Substitute v=y^{1−n}. ODE becomes linear: dv/dx+(1−n)Pv=(1−n)Q. Solve, convert back via y=v^{1/(1−n)}." → A02
- PARTIAL (MC-2: forgot 1−n factor) → "When differentiating v=y^{1−n}: by the chain rule, dv/dx=(1−n)y^{(1−n)−1}·dy/dx=(1−n)y^{−n}·dy/dx. The factor (1−n) is essential. After dividing the ODE by yⁿ, you have y^{−n}dy/dx=(1/(1−n))dv/dx, so the substitution gives (1/(1−n))dv/dx+Pv=Q. Don't lose the (1−n) or you'll get the wrong linear ODE." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "dy/dx + (1/x)y = x²y³. n=3. v=y^{1−3}=y^{−2}. dv/dx=−2y^{−3}dy/dx. Divide by y³: y^{−3}dy/dx+(1/x)y^{−2}=x². Substitute: (−1/2)dv/dx+(1/x)v=x². Multiply by −2: dv/dx−(2/x)v=−2x². Linear! μ=e^{∫−2/x dx}=x^{−2}. (x^{−2}v)'=−2x^{−2}·x²=−2. x^{−2}v=−2x+C. v=x²(C−2x). Convert: 1/y²=Cx²−2x³." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Physical applications and recognition:**

**Population dynamics:** The logistic ODE dP/dt = rP(1 − P/K) can be rewritten as dP/dt − rP = −(r/K)P². This is Bernoulli with n=2. The substitution v=P^{−1} linearises it, recovering the logistic solution P(t)=K/(1+Ae^{−rt}).

**Torricelli variant:** dh/dt = −k√h = −kh^{1/2}. Bernoulli with n=1/2, P=0, Q=−k. v=h^{1/2}. dv/dt=(1/2)h^{−1/2}dh/dt=−k/2. v=−kt/2+C. h=(−kt/2+C)².

**Recognition checklist:**
1. Is the equation of the form dy/dx + P(x)y = Q(x)yⁿ?
2. Is n ≠ 0 and n ≠ 1? (If n=0 or 1 → linear, skip Bernoulli)
3. Do P and Q depend on x only (not y)? (If P or Q depend on y, it's not Bernoulli)

**P49 checkpoint:**
- CORRECT → "Logistic = Bernoulli with n=2. Torricelli = Bernoulli with n=1/2. Pattern: right side = Q(x)·yⁿ with P,Q functions of x." → Gate (P91)
- PARTIAL (MC-3: applies to n=0 or n=1, or wrong right side) → "n=0: dy/dx+Py=Q — already linear (Q times y⁰=Q times 1=Q). n=1: dy/dx+Py=Qy → dy/dx=(Q−P)y — separable. Neither needs the Bernoulli substitution. Also, the right side must be Q(x)·yⁿ — a power of y with a coefficient depending only on x; if it's Q(x,y) in a more complex form, check whether another method applies first." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "dP/dt = rP − aP² (a=r/K). Rewrite: dP/dt − rP = −aP². Bernoulli with n=2, P_coeff=−r, Q=−a. v=P^{−1}: dv/dt+rv=a. Integrating factor: e^{rt}. (e^{rt}v)'=ae^{rt}. v=a/r+Ce^{−rt}. 1/P=a/r+Ce^{−rt}. P=r/(a+Cre^{−rt})=K/(1+Ke/P₀·e^{−rt})." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "The substitution is v = y^{1−n}, NOT v = yⁿ. For n=2: v = y^{−1}. For n=3: v = y^{−2}. For n=1/2: v = y^{1/2}."
Step 2 — "Differentiating: dv/dx = (1−n)·y^{(1−n)−1}·dy/dx = (1−n)y^{−n}·(dy/dx). This is the chain rule applied to y^{1−n}. Don't forget the exponent coefficient (1−n)."
Step 3 — "Quick route to the linear ODE: divide the Bernoulli ODE by yⁿ, then substitute directly: y^{−n}dy/dx becomes (1/(1−n))dv/dx. The equation becomes (1/(1−n))dv/dx + Pv = Q. Multiply by (1−n) to clear."

**TB-R02 (MC-3 BERNOULLI-APPLIES-FOR-ALL-N):**
Step 1 — "Bernoulli requires n ≠ 0, 1. Check n FIRST before applying the substitution."
Step 2 — "n = 0: the equation is dy/dx + Py = Q (right side = Q·y⁰ = Q). Already linear — use integrating factor directly."
Step 3 — "n = 1: dy/dx + Py = Qy → dy/dx = (Q−P)y. Separable. Solve by separation of variables."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Solve: dy/dx + y = y². (Logistic-type. Identify n, make the substitution, solve the linear ODE, convert back.)
2. Solve: dy/dx − (4/x)y = x√y, for x > 0. (Identify n = 1/2. Let v = √y.)
3. Solve the Bernoulli equation dv/dx + v = e^x v^{1/2}. Convert, solve, convert back.
4. A population P(t) satisfies dP/dt = 0.5P − 0.001P². (a) Identify this as Bernoulli with n=2. (b) What is the carrying capacity K? (c) Solve with P(0)=100.
5. Show that the substitution v = y^{1−n} converts the general Bernoulli ODE dy/dx + P(x)y = Q(x)yⁿ into the linear ODE dv/dx + (1−n)P(x)v = (1−n)Q(x). (Derive the transformation algebraically.)

**P55 — Reflect & Consolidate:** "Bernoulli ODE: dy/dx + Py = Qyⁿ, n≠0,1. Substitute v=y^{1−n}: dv/dx+(1−n)Pv=(1−n)Q (linear). Solve for v using integrating factor. Convert back: y=v^{1/(1−n)}. Excluded: n=0 (linear), n=1 (separable)."

**P76 — Transfer Probe (Independence mode):**
(a) The Riccati equation dy/dx = P(x) + Q(x)y + R(x)y² is more general than Bernoulli (a particular solution y₁ must be known; then v = 1/(y−y₁) converts it to a linear ODE). How does the Riccati equation reduce to a Bernoulli equation when P(x) = 0? (b) In fluid dynamics, the boundary layer equation contains a Bernoulli-type nonlinear term. Explain qualitatively why a substitution v=y^{1−n} might linearise such equations. (c) Ordinary Bernoulli differential equation vs. Bernoulli's principle in fluid mechanics: both are named after the same family but are mathematically unrelated. Bernoulli's principle P + ½ρv² + ρgh = const arises from integrating Euler's equation (a PDE, not an ODE). Classify Euler's equation for an inviscid fluid.

**P75 — Mastery Assessment:**
"(a) Solve: t dy/dt + y = y² ln t, t > 0. (Rewrite in standard form; identify n; apply the substitution.) (b) A tank contains a chemical that decays according to dy/dt = −ky + ay^{3/2}, where k, a > 0 are constants. This is a Bernoulli ODE. Find the general solution. (c) Show that the substitution v = y^{1−n} transforms Bernoulli into a linear ODE, and then show that the general solution of the Bernoulli ODE can be written as y^{1−n} = (1−n)e^{−(1−n)∫P dx} ∫Q(x)e^{(1−n)∫P dx} dx + C·e^{−(1−n)∫P dx}. (d) For n > 1, does the Bernoulli ODE have a constant solution? Find it."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the chain-rule differentiation of v = y^{1−n} and the (1−n) factor
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.linear-first-order; reassign

**P78 — Completion:** Bernoulli ODE certified. Student identifies Bernoulli form; makes the correct v=y^{1−n} substitution; differentiates correctly including the (1−n) factor; solves the resulting linear ODE; converts back.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Riccati equation reduction; nonlinear fluid dynamics; Bernoulli ODE vs. Bernoulli's principle
Skill tested: Generalise the substitution technique and situate Bernoulli ODEs in a broader mathematical landscape

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
