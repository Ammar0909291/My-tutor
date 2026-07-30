# Blueprint: math.de.exact-ode

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.exact-ode |
| name | Exact ODE |
| Domain | math.de |
| Difficulty | advanced |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.de.first-order-ode, math.calc.partial-derivatives |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student identifies when M(x,y)dx + N(x,y)dy = 0 is exact by checking ∂M/∂y = ∂N/∂x; when exact, finds the potential function F(x,y) satisfying ∂F/∂x = M and ∂F/∂y = N by successive integration; writes the general solution as F(x,y) = C; and when the equation is not exact, finds an integrating factor μ (a function of x alone or y alone) that makes it exact.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw M dx + N dy = 0 on the left; show two arrows, one pointing to ∂M/∂y and one to ∂N/∂x; label "Exactness test: these must be equal"; then draw the potential surface F(x,y)=C as a contour, with ∇F=(M,N) as the gradient field; annotate: "If M dx + N dy = dF, then the ODE says dF = 0, so F = constant")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | EXACT-MEANS-BOTH-PARTIALS-EQUAL-ZERO | Student thinks exactness means ∂M/∂y = 0 AND ∂N/∂x = 0, not that they are equal to each other | Type 3 — language contamination ("exact" in everyday language means precise or zero-error; students confuse the mathematical definition — equality of mixed partials — with the colloquial idea of something being zero or perfectly specified) |
| MC-2 | FORGETTING-THE-FUNCTION-OF-Y-IN-INTEGRATION | Student integrates M with respect to x to get F(x,y) = ∫M dx, then writes g(y) = 0 without determining g(y) from ∂F/∂y = N; the constant of integration with respect to x is actually an arbitrary function of y, not a true constant | Type 5 — instruction-induced (ordinary single-variable integration produces a constant +C; students apply the same idea to partial integration and treat the "constant" as a number, not recognising it is a function of the other variable) |
| MC-3 | INTEGRATING-FACTOR-ALWAYS-EXISTS-EASILY | Student assumes every non-exact ODE can be made exact by an integrating factor that is a simple function of x or y; doesn't know that an integrating factor may depend on both x and y (and then finding it requires solving a PDE — harder than the original ODE) | Type 1 — overgeneralisation (textbook problems are chosen so that μ=μ(x) or μ=μ(y) always works; students assume this is always the case) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The exactness test and potential function:**

**Exact ODE:** M(x,y)dx + N(x,y)dy = 0 is exact if and only if ∂M/∂y = ∂N/∂x (on a simply connected domain).

**Why:** The ODE is exact iff M dx + N dy = dF for some F, i.e., ∂F/∂x = M and ∂F/∂y = N. Then dF = 0 → F = C.

**Method:**
1. Check: ∂M/∂y = ∂N/∂x? If not, stop or find integrating factor.
2. Find F: integrate M with respect to x → F = ∫M dx + g(y).
3. Differentiate ∂F/∂y = N: ∂/∂y[∫M dx] + g'(y) = N → g'(y) = N − ∂/∂y[∫M dx].
4. Integrate to get g(y).
5. Write F(x,y) = C (implicit general solution).

**Worked example:**
(2xy + y²)dx + (x² + 2xy)dy = 0. Check: M = 2xy+y², N = x²+2xy.
∂M/∂y = 2x+2y. ∂N/∂x = 2x+2y. Equal → exact.
F = ∫(2xy+y²)dx = x²y + xy² + g(y).
∂F/∂y = x²+2xy+g'(y) = N = x²+2xy → g'(y) = 0 → g = C₀.
General solution: x²y + xy² = C.

**P49 checkpoint:**
- CORRECT → "Exact test: ∂M/∂y=∂N/∂x. Find F: integrate M (or N), use the other equation to find g(y). Solution: F(x,y)=C." → A02
- PARTIAL (MC-2: g(y)=0) → "When you integrate M with respect to x, the 'constant' of integration is actually g(y) — an arbitrary function of y. You must determine g by differentiating F with respect to y and setting it equal to N. If g'(y)=0, then g is truly a constant; if g'(y)≠0, you have a function to integrate." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "(3x²+6xy)dx+(3x²+e^y)dy=0. ∂M/∂y=6x. ∂N/∂x=6x. Equal → exact. F=∫(3x²+6xy)dx=x³+3x²y+g(y). ∂F/∂y=3x²+g'(y)=3x²+e^y → g'(y)=e^y → g=e^y. Solution: x³+3x²y+e^y=C." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Non-exact ODEs and integrating factors:**

**When ∂M/∂y ≠ ∂N/∂x:** The ODE is not exact. Look for an integrating factor μ.

**μ = μ(x) case:** Multiply by μ(x): μM dx + μN dy = 0. Exactness requires:
∂(μM)/∂y = ∂(μN)/∂x → μ·∂M/∂y = μ'N + μ·∂N/∂x → μ'/μ = (∂M/∂y − ∂N/∂x)/N.
This is a function of x alone iff (∂M/∂y − ∂N/∂x)/N depends only on x.

**μ = μ(y) case:** Multiply by μ(y): exactness requires:
μ'/μ = (∂N/∂x − ∂M/∂y)/M — a function of y alone.

**Example:**
ydx − xdy = 0. M=y, N=−x. ∂M/∂y=1, ∂N/∂x=−1. Not exact.
Try μ(x): (∂M/∂y−∂N/∂x)/N = (1−(−1))/(−x) = −2/x. Depends on x only!
μ'/μ = −2/x → μ = x^{−2} = 1/x².
Multiply: y/x² dx − 1/x dy = 0.
Check: ∂(y/x²)/∂y = 1/x². ∂(−1/x)/∂x = 1/x². Exact.
F = ∫(y/x²)dx = −y/x + g(y). ∂F/∂y = −1/x + g'(y) = −1/x → g'=0.
Solution: −y/x = C → y = −Cx = Kx.

**P49 checkpoint:**
- CORRECT → "Non-exact: compute (My−Nx)/N. If f(x) only: μ=e^{∫f(x)dx}. Or (Nx−My)/M for μ(y). Then solve the exact ODE." → Gate (P91)
- PARTIAL (MC-3: integrating factor always simple) → "An integrating factor μ(x) exists when (∂M/∂y−∂N/∂x)/N is purely a function of x. An integrating factor μ(y) exists when (∂N/∂x−∂M/∂y)/M is purely a function of y. If neither holds, μ might depend on both x and y, and finding it requires solving a PDE — in that case, try a different method (e.g., separable or linear form)." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "(x+y²)dx − 2xy dy = 0. M=x+y², N=−2xy. My=2y, Nx=−2y. (My−Nx)/N=(2y−(−2y))/(−2xy)=4y/(−2xy)=−2/x. Function of x only → μ=e^{∫−2/x dx}=x^{−2}=1/x². Multiply: (1/x+y²/x²)dx+(−2y/x)dy=0. Verify exact. F=∫(1/x+y²/x²)dx=ln|x|−y²/x+g(y). ∂F/∂y=−2y/x+g'(y)=−2y/x → g'=0. Solution: ln|x|−y²/x=C." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Exactness means ∂M/∂y = ∂N/∂x (they EQUAL each other — neither need be zero)."
Step 2 — "Partial integration: ∫M dx + g(y) means integrate M treating y as a constant, then add g(y) — an UNKNOWN FUNCTION of y. This is NOT a constant."
Step 3 — "To find g(y): differentiate F = ∫M dx + g(y) with respect to y (treating x as a constant). Set the result equal to N. Solve the resulting ODE for g (it will always be separable — just g'(y) = something depending only on y)."

**TB-R02 (MC-3 INTEGRATING-FACTOR-ALWAYS-EXISTS-EASILY):**
Step 1 — "Test for μ(x): compute h(x) = (∂M/∂y − ∂N/∂x)/N. If h depends on x only (no y), then μ = e^{∫h dx}."
Step 2 — "Test for μ(y): compute k(y) = (∂N/∂x − ∂M/∂y)/M. If k depends on y only (no x), then μ = e^{∫k dy}."
Step 3 — "If both tests fail, the ODE might be solvable by another method (linear, Bernoulli, homogeneous substitution). Don't persist with an integrating factor that doesn't simplify."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Determine if exact and solve: (2x+y)dx + (x+2y)dy = 0.
2. Determine if exact and solve: (y²−x)dx + (2xy+1)dy = 0. If not exact, find an integrating factor μ(x) or μ(y) and solve.
3. Solve: (y cos x + 2xe^y)dx + (sin x + x²e^y)dy = 0. Verify exactness first.
4. For the ODE (4xy+3y²)dx + (2x²+3xy)dy = 0: (a) check if exact; (b) if not, find an integrating factor of the form μ = xᵃyᵇ; (c) solve.
5. Show that for a linear first-order ODE dy/dx + P(x)y = Q(x) written as (Py−Q)dx + dy = 0, the integrating factor formula for exact ODEs recovers the standard integrating factor μ = e^{∫P dx}.

**P55 — Reflect & Consolidate:** "Exact ODE: M dx + N dy = 0 with ∂M/∂y = ∂N/∂x. Find F with ∂F/∂x=M, ∂F/∂y=N: integrate M in x, add g(y), differentiate in y to find g'(y)=N−∂/∂y(∫M dx). Solution: F=C. Non-exact: try μ(x) if (My−Nx)/N=f(x), or μ(y) if (Nx−My)/M=g(y)."

**P76 — Transfer Probe (Independence mode):**
(a) Conservative vector fields: M dx + N dy = 0 is exact iff (M, N) is a conservative vector field with potential F. State Green's theorem and explain how it provides a condition for exactness in terms of circulation. (b) The Poincaré lemma: on a simply connected domain, ∂M/∂y = ∂N/∂x is sufficient for exactness. Give an example on a non-simply-connected domain (e.g., the annulus) where ∂M/∂y = ∂N/∂x holds but the form is NOT exact (the 1-form dθ = (−y dx + x dy)/(x²+y²)). (c) Euler's criterion for integrability: for a general ODE F(x, y, y') = 0, what is the condition for the existence of a first integral (a function I(x,y) constant along solution curves)?

**P75 — Mastery Assessment:**
"(a) Classify as exact or not exact: (3x²y² + y)dx + (2x³y + x)dy = 0. If exact, find the general solution. (b) For the ODE (e^y + 2xy)dx + (xe^y + x²)dy = 0: verify exactness and find the solution satisfying y(1) = 0. (c) The equation (x + y)dx − (x − y)dy = 0 is not exact. Find an integrating factor of the form μ = μ(x²+y²) and solve. (Hint: try μ = 1/(x²+y²).) (d) Derive the condition for an integrating factor μ = μ(xy) to exist for M dx + N dy = 0."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the g(y) determination step and integrating factor tests
- Score ≤ 3/5 → PREREQUISITE GAP in math.calc.partial-derivatives or math.de.first-order-ode; reassign

**P78 — Completion:** Exact ODE certified. Student tests exactness via mixed partial derivatives; finds the potential function F by successive partial integration; determines g(y) correctly; finds integrating factors μ(x) or μ(y) when the ODE is not exact.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Conservative vector fields and Green's theorem; Poincaré lemma on non-simply-connected domains; first integrals
Skill tested: Connect exact ODEs to multivariable calculus geometry and topology

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
