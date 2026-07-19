# Teaching Blueprint: Multiple Integrals (`math.calc.multiple-integrals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.multiple-integrals` |
| name | Multiple Integrals |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 15 |
| requires | `math.calc.definite-integral`, `math.calc.multivariable-intro` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a solid volume under a surface over a rectangular base, before the iterated-integral formula |
| description (KG) | Extensions of the definite integral to functions of two or three variables; computed via iterated integrals using Fubini's theorem. |

## Component 1 — Learning Objectives

- LO1: Interpret the **double integral** $\iint_R f(x,y)\,dA$ over a region $R$ as the volume between the surface $z=f(x,y)$ and the $xy$-plane (for $f\ge0$), directly extending `math.calc.definite-integral`'s "signed area" interpretation to "signed volume."
- LO2: Compute a double integral over a **rectangular region** as an **iterated integral**, $\int_c^d\int_a^b f(x,y)\,dx\,dy$, integrating with respect to one variable at a time (holding the other fixed, per `math.calc.multivariable-intro`'s partial-derivative-style treatment) — and apply **Fubini's Theorem** to justify that the order of integration can be swapped freely when $f$ is continuous on the rectangle.
- LO3: Compute a double integral over a **non-rectangular region** by correctly determining variable (function-dependent) bounds for the inner integral — directly refuting the misconception that the inner integral's bounds are always constants, when in general they depend on the outer variable.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.definite-integral` (the single-variable definite integral as signed area, a limit of Riemann sums) and `math.calc.multivariable-intro` (functions of several variables, with domain a subset of $\mathbb{R}^n$).

## Component 3 — Core Explanation

**The double integral as signed volume**: for a function $f(x,y)\ge0$ over a region $R$ in the $xy$-plane, $\iint_R f(x,y)\,dA$ represents the VOLUME of the solid between the surface $z=f(x,y)$ and the plane $z=0$, over the base region $R$ — the direct two-dimensional analogue of the single-variable definite integral's signed-area interpretation, with "area under a curve over an interval" becoming "volume under a surface over a region."

**Iterated integrals over a rectangle, and Fubini's Theorem**: for a rectangular region $R=[a,b]\times[c,d]$, the double integral is computed as an **iterated integral**: first integrate with respect to ONE variable (say $x$), treating $y$ as a constant (exactly like a partial derivative treats other variables as fixed), producing a function of $y$ alone; THEN integrate that result with respect to $y$: $\int_c^d\left(\int_a^b f(x,y)\,dx\right)dy$. **Fubini's Theorem** guarantees that, for $f$ continuous on the rectangle, this can be done in EITHER order — integrating $x$ first then $y$, or $y$ first then $x$ — and both orders yield the identical final value.

**Non-rectangular regions require variable bounds**: when the region $R$ is not a simple rectangle — e.g. bounded above by one curve and below by another — the INNER integral's bounds must be expressed as FUNCTIONS of the outer variable, not constants. For instance, integrating over the region between $y=x^2$ and $y=x$ (for $0\le x\le1$): $\int_0^1\int_{x^2}^{x} f(x,y)\,dy\,dx$ — the inner integral's upper and lower bounds ($x^2$ and $x$) are themselves functions of $x$, reflecting that the vertical extent of the region genuinely changes depending on which $x$-slice you're looking at.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — a rectangular region, both orders via Fubini)**: Compute $\iint_R xy\,dA$ where $R=[0,2]\times[0,3]$. Integrating $x$ first: $\int_0^3\left(\int_0^2 xy\,dx\right)dy = \int_0^3\left[\frac{x^2y}{2}\right]_0^2dy = \int_0^3 2y\,dy = \left[y^2\right]_0^3 = 9$. Now integrating $y$ first instead: $\int_0^2\left(\int_0^3 xy\,dy\right)dx = \int_0^2\left[\frac{xy^2}{2}\right]_0^3dx = \int_0^2 \frac{9x}{2}\,dx = \left[\frac{9x^2}{4}\right]_0^2 = 9$ — the SAME answer, $9$, confirming Fubini's Theorem's guarantee that order doesn't matter here.

**Example 2 (LO3 — non-rectangular region, variable bounds)**: Compute $\iint_R (x+y)\,dA$ where $R$ is the region between $y=x^2$ and $y=x$, for $0\le x\le1$ (checking: at $x=0.5$, $x^2=0.25<x=0.5$, so $y$ ranges from the lower curve $x^2$ up to the upper curve $x$). Set up: $\int_0^1\int_{x^2}^{x}(x+y)\,dy\,dx$. Inner integral (treating $x$ as constant): $\int_{x^2}^x (x+y)\,dy = \left[xy+\frac{y^2}{2}\right]_{x^2}^x = \left(x^2+\frac{x^2}{2}\right)-\left(x^3+\frac{x^4}{2}\right) = \frac{3x^2}{2}-x^3-\frac{x^4}{2}$. Then integrate this result with respect to $x$ from $0$ to $1$: $\int_0^1\left(\frac{3x^2}{2}-x^3-\frac{x^4}{2}\right)dx = \left[\frac{x^3}{2}-\frac{x^4}{4}-\frac{x^5}{10}\right]_0^1 = \frac12-\frac14-\frac1{10} = \frac{10-5-2}{20}=\frac{3}{20}$.

**Example 3 (LO3 — constant bounds mistakenly applied to a non-rectangular region, breaking MC-1)**: A student attempts Example 2's SAME region but mistakenly sets up $\int_0^1\int_0^1(x+y)\,dy\,dx$ (using constant bounds $0$ to $1$ for $y$, as if the region were the full unit square). This computes the integral over the WRONG region entirely — the full square $[0,1]\times[0,1]$, not the triangular-ish region actually bounded by $y=x^2$ and $y=x$. Checking: the correct region (from Example 2) lies entirely within the unit square but is strictly SMALLER (only the sliver between the two curves), so this constant-bounds version necessarily overcounts, including points like $(0.5, 0.9)$ that lie above the curve $y=x$ and are NOT part of the intended region at all.

## Component 5 — Teaching Actions

### Teaching Action A01 — Double Integral as Signed Volume (Primitive P11: Representation Shift)

Show a 3D solid — a box-like shape with a curved top $z=f(x,y)$ sitting over a rectangular base. State: "exactly like the single integral measured area under a curve, the double integral measures VOLUME under a surface — same idea, one dimension higher." Connect explicitly to `math.calc.definite-integral`'s signed-area framing.

### Teaching Action A02 — Iterated Integration and Fubini's Order-Swap Guarantee (Primitive P11: Representation Shift)

State: "compute a double integral by peeling off one variable at a time — integrate with respect to $x$ FIRST (treating $y$ as fixed, just like a partial derivative), THEN integrate the result with respect to $y$." Work Example 1's BOTH orders side by side, confirming Fubini's guarantee that they agree.

### Teaching Action A03 — Non-Rectangular Regions Need Variable Bounds (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: using constant bounds $[0,1]\times[0,1]$ for a region that is actually the sliver between $y=x^2$ and $y=x$ integrates over entirely the WRONG set of points, including points that don't belong to the intended region at all. State: "the bounds of the INNER integral must match the actual shape of the region at each value of the outer variable — if that shape's boundary is a curve, not a straight edge, the bounds must be FUNCTIONS, not fixed numbers."

- **MC-1 hook**: ask "when setting up a double integral over ANY region, are the inner integral's bounds always just constant numbers, like the outer integral's?" — a "yes" answer reveals MC-1 (assuming constant bounds always suffice, missing that a non-rectangular region requires the inner bounds to be functions of the outer variable).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\iint_R (2x+3y)\,dA$ over $R=[0,1]\times[0,2]$, integrating $x$ first.
  2. Repeat problem 1 integrating $y$ first instead, and confirm both orders give the same answer (citing Fubini's Theorem).
  3. Set up (do not necessarily fully evaluate) the iterated integral for $\iint_R xy\,dA$ where $R$ is the region bounded by $y=\sqrt x$ and $y=x^2$ for $0\le x\le1$, identifying the correct variable bounds for the inner integral.
  4. A student sets up $\int_0^1\int_0^1 xy\,dy\,dx$ for the region described in problem 3. Explain specifically why this is incorrect, referencing the actual shape of the region.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs to compute the total mass of a thin metal plate shaped like the region between $y=4-x^2$ (a downward parabola) and $y=0$ (the $x$-axis), for $-2\le x\le2$, where the plate's density at each point is given by $\rho(x,y)=1+x^2$. (a) Set up the iterated double integral $\iint_R\rho(x,y)\,dA$ for this region, being careful to determine the correct (possibly variable) bounds for the inner integral. (b) Explain why using constant bounds $y$ from $0$ to $4$ (the maximum height of the parabola) would give an INCORRECT setup for this particular plate's mass, even though $4$ is technically the tallest point of the region. (c) Explain, referencing Fubini's Theorem, whether you could instead integrate with respect to $x$ first and $y$ second for this region, and what would be different about setting up THOSE bounds compared to your answer in part (a)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INNER-INTEGRAL-BOUNDS-ASSUMED-ALWAYS-CONSTANT | Believing the inner integral's bounds are always fixed numbers, missing that a non-rectangular region requires the inner bounds to be functions of the outer variable | Foundational |
| MC-2 | ORDER-OF-INTEGRATION-ASSUMED-TO-ALWAYS-MATTER | Believing swapping the order of integration always changes the result (or is never permitted), missing Fubini's Theorem's guarantee for continuous integrands over the correctly re-described region | Foundational |
| MC-3 | REGION-BOUNDARY-CURVES-MISIDENTIFIED-AS-UPPER-OR-LOWER | Reversing which curve serves as the upper bound and which as the lower bound for the inner integral, especially when the two boundary curves cross or are similar in shape | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Constant-Inner-Bounds Assumption") → P41 (detect: give a non-rectangular region and ask the student to set up the iterated integral, checking whether they use constant bounds throughout) → P64 (conceptual shift: re-walk Example 3's direct evidence — constant bounds integrate over the wrong set of points entirely — then re-derive Example 2's correct variable-bounds setup from the actual region shape).
- **B02 (targets MC-2)**: P27 (name it: "Order-of-Integration Always-Matters (or Never-Swappable) Assumption") → P41 (detect: ask whether swapping integration order is ever valid, or whether it always changes the answer) → P64 (conceptual shift: re-walk Example 1's both-orders computation over the rectangle, confirming they agree, then clarify Fubini's precise condition (continuity) that makes this guarantee hold).
- **B03 (targets MC-3)**: P27 (name it: "Upper/Lower Boundary Curve Reversed") → P41 (detect: give a region description and ask the student to identify which curve is the upper bound and which is the lower, checking for a reversed answer) → P64 (conceptual shift: re-anchor on "pick a specific test value of the outer variable within the range, and directly compare the two curves' heights AT that value — whichever curve is higher there is the upper bound, for that whole sub-range").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.definite-integral` (the signed-area interpretation this concept extends to signed volume), `math.calc.multivariable-intro` (functions of two or more variables, the domain this concept integrates over).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 15 with an advanced/apply tag places this at a "3 TAs + gate" tier with FULL worked-example treatment (not orientation-level) given its "apply" bloom level and its role as the capstone technique of introductory multivariable calculus — A01 (the volume interpretation), A02 (iterated integration and Fubini), and A03 (non-rectangular regions) each target a distinct LO, covering both the conceptual foundation and its most error-prone computational subtlety.
- This blueprint deliberately treats only DOUBLE integrals in full depth (per the KG description's "two or three variables," triple integrals are gestured at but not separately worked) — the double-integral case already contains every core idea (iterated integration, Fubini, variable bounds) that triple integrals extend by one further dimension, and fully working a triple-integral example would substantially duplicate the same teaching points without adding new conceptual content.
- MC-1 (constant-bounds assumption for non-rectangular regions) was given the most teaching weight because it is the single most common error when transitioning from rectangular to general regions — Example 3 deliberately reuses Example 2's exact region specifically to make the wrong-region consequence of constant bounds as concrete and checkable as possible.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: solid volume under a surface before the iterated-integral formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
