# Teaching Blueprint: Gradient (`math.calc.gradient`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.gradient` |
| name | Gradient |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.calc.partial-derivatives` |
| unlocks | `math.calc.directional-derivative`, `math.opt.gradient-methods` |
| cross_links | `math.opt.gradient-methods` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | P (Pictorial) — a contour/topographic map before the vector-of-partials formula |
| description (KG) | ∇f = (∂f/∂x, ∂f/∂y, …); the vector of partial derivatives pointing in the direction of steepest ascent; its magnitude is the maximum rate of change. |

## Component 1 — Learning Objectives

- LO1: Compute the **gradient** $\nabla f = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \ldots\right)$ of a multivariable function as the vector whose components are its partial derivatives, evaluated at a specific point.
- LO2: State and interpret the two key geometric facts about the gradient: it points in the direction of **steepest ascent** of $f$ at that point, and its **magnitude** $\|\nabla f\|$ equals the **maximum rate of change** of $f$ in any direction at that point.
- LO3: Correctly relate the gradient to level curves/surfaces — the gradient at a point is always **perpendicular (normal)** to the level curve/surface of $f$ passing through that point — and use this to find a tangent line/plane to a level curve/surface.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.partial-derivatives` (computing $\partial f/\partial x$, $\partial f/\partial y$, etc., holding other variables constant).

## Component 3 — Core Explanation

The **gradient** of a scalar function $f(x,y,\ldots)$ is the vector of its partial derivatives:
$$\nabla f = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \ldots\right)$$
evaluated at a specific point, giving a specific vector at that point (the gradient is technically a **vector field** — a different vector at each point — but is often computed and interpreted at one point at a time).

**Two key geometric facts** (stated here, proven rigorously once directional derivatives are available in the next concept):
1. **Direction of steepest ascent**: among all directions you could move from a given point, $\nabla f$ points in the direction that increases $f$ the **fastest**.
2. **Magnitude = maximum rate of change**: $\|\nabla f\|$ (the length of the gradient vector) equals the actual numerical **rate** of that fastest increase — moving in the gradient's direction, $f$ increases at rate $\|\nabla f\|$ per unit distance; moving in the *opposite* direction ($-\nabla f$) gives the steepest **descent**, at the same rate.

**Perpendicularity to level curves**: for a level curve $f(x,y)=k$ (a fixed value $k$, e.g. one contour line on a topographic map), the gradient $\nabla f$ at any point on that curve is **perpendicular** to the curve there. Intuitively: moving *along* a level curve keeps $f$ constant (zero rate of change in that direction), while the gradient captures the direction of *maximum* change — and the direction of zero change is always perpendicular to the direction of maximum change for a smooth function.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing the gradient)**: $f(x,y) = x^2y + 3y^2$. $\frac{\partial f}{\partial x} = 2xy$, $\frac{\partial f}{\partial y} = x^2+6y$. So $\nabla f = (2xy,\ x^2+6y)$. At the point $(1,2)$: $\nabla f(1,2) = (2(1)(2),\ 1+6(2)) = (4,13)$.

**Example 2 (LO2 — magnitude as maximum rate of change)**: For the same $f$ at $(1,2)$, $\nabla f(1,2)=(4,13)$. The maximum rate of increase of $f$ at $(1,2)$, in any direction, is $\|\nabla f(1,2)\| = \sqrt{4^2+13^2}=\sqrt{16+169}=\sqrt{185}\approx13.6$ — moving in the direction $(4,13)$ (normalized) increases $f$ at this rate; moving in the opposite direction $(-4,-13)$ decreases $f$ at the same rate; moving in any OTHER direction gives a strictly *smaller* rate of increase (or a decrease).

**Example 3 (LO3 — perpendicularity to level curves)**: For $f(x,y)=x^2+y^2$ (level curves are circles centered at the origin), $\nabla f = (2x,2y)$. At the point $(3,4)$ (on the level curve $x^2+y^2=25$): $\nabla f(3,4) = (6,8)$. The circle's tangent direction at $(3,4)$ is perpendicular to the radius vector $(3,4)$ itself — and indeed $(6,8) = 2(3,4)$ is exactly parallel to the radius, hence perpendicular to the circle's tangent line there, confirming the gradient is normal to the level curve.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Gradient Vector and Steepest Ascent, via a Topographic Map (Primitive P11: Representation Shift)

Start pictorial: show a topographic (contour) map of a hill, with elevation as $f(x,y)$ and contour lines as level curves. Pick a point on the hillside and ask: "if you wanted to climb as steeply as possible from here, which direction would you walk?" — trace the direction perpendicular to the local contour line, pointing toward higher elevation. State: "this direction, and how steep it is, IS the gradient — mathematically, the vector of partial derivatives."

Shift representation to the symbolic definition: work Example 1, computing $\nabla f$ at a point from the partial derivatives directly.

- **MC-1 hook**: ask "does the gradient at a point tell you the VALUE of $f$ there, or something else?" — an answer confusing $\nabla f$ (a direction-and-rate vector) with $f$ itself (a scalar value) reveals MC-1 (conflating the function's value with its gradient).

### Teaching Action A02 — Magnitude as Rate, and Perpendicularity to Level Curves (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 2 — show the gradient's *direction* (steepest ascent) separately from its *magnitude* (the actual numeric rate of that ascent), computed via $\|\nabla f\|=\sqrt{185}$. Contrast against moving in a "sideways" (non-gradient) direction, where the rate of increase is strictly less — this can be verified informally by noting any direction other than $\nabla f/\|\nabla f\|$ gives a smaller directional rate (formally proven once directional derivatives, the next concept, are available).

**Contrast 2 (targets MC-2, gradient direction vs. level-curve direction)**: Work Example 3 — show explicitly that the gradient vector $(6,8)$ at $(3,4)$ points radially outward (same direction as the position vector from the origin), while the circle's tangent line at that point runs perpendicular to that radius. Ask: "if you walked ALONG the contour line (constant elevation), would $f$ be changing?" (No — that's exactly the definition of a level curve.) "So does the gradient point along the contour, or across it?" — state clearly: "always across (perpendicular to) the level curve/surface — the gradient and the 'stay at the same value' directions are opposite ends of the same geometric picture: one is maximum change, the other is zero change, and for smooth functions these are always perpendicular."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find $\nabla f$ for $f(x,y)=3x^2y-y^3$ and evaluate it at $(2,1)$.
  2. Using your answer to problem 1, find $\|\nabla f(2,1)\|$ (the maximum rate of increase of $f$ at that point).
  3. For $f(x,y)=x^2+4y^2$ (level curves are ellipses), find $\nabla f$ at $(2,1)$ and explain why this vector must be perpendicular to the ellipse $x^2+4y^2=8$ at that point.
  4. A student computes $\nabla f(3,5) = (0,0)$ for some function $f$. What does this tell you about the rate of change of $f$ in every direction at that point?
- **P76 (Transfer Probe, mode = independence)**: "A weather-mapping app models atmospheric pressure as $P(x,y)$ over a region, with $\nabla P(x_0,y_0) = (-2,6)$ hPa/km at a specific weather station's location. (a) In which direction is pressure increasing fastest at that location, and at what rate (per km)? (b) A meteorologist draws an isobar (a curve of constant pressure) through that station — using this lesson's perpendicularity fact, describe the isobar's direction relative to the gradient vector at that point, without needing the isobar's actual equation. (c) A pilot wants to fly in the direction of LEAST pressure change (to avoid turbulence associated with rapid pressure gradients) — which direction should they choose, and why, relating your answer directly to this lesson's gradient-vs-level-curve relationship?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GRADIENT-CONFLATED-WITH-FUNCTION-VALUE | Confusing the gradient vector $\nabla f$ (direction and rate of change) with the function's scalar value $f$ at that point | Foundational |
| MC-2 | GRADIENT-ASSUMED-PARALLEL-TO-LEVEL-CURVE | Believing the gradient points ALONG the level curve/surface (the direction of no change) rather than perpendicular to it (the direction of maximum change) | Foundational |
| MC-3 | ZERO-GRADIENT-MISINTERPRETED | Failing to recognize that $\nabla f=\vec0$ at a point means the rate of change is zero in EVERY direction there (a candidate critical point for the multivariable case), rather than some other special meaning | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Gradient/Value Conflation") → P41 (detect: ask what $\nabla f(2,3)$ tells you about $f(2,3)$ directly) → P64 (conceptual shift: re-anchor on "the gradient is a DIFFERENT object than the function — it describes how $f$ is changing nearby, never what $f$ currently equals").
- **B02 (targets MC-2)**: P27 (name it: "Gradient-Along-Contour Error") → P41 (detect: ask whether the gradient points along or across a level curve at a given point) → P64 (conceptual shift: re-derive from "moving along a level curve keeps $f$ constant — zero change — while the gradient is specifically the MAXIMUM-change direction; these are geometrically opposite kinds of directions, hence perpendicular").
- **B03 (targets MC-3)**: P27 (name it: "Zero-Gradient Misinterpretation") → P41 (detect: give $\nabla f(a,b)=(0,0)$ and ask what this implies about $f$'s behavior near $(a,b)$) → P64 (conceptual shift: re-anchor on the definition — every partial derivative there is zero, so every directional rate of change (a combination of the partials, formalized in the next concept) is also zero — flagging this as a genuine critical point, analogous to the single-variable $f'(c)=0$ case).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.partial-derivatives` (the individual component computations $\partial f/\partial x$, etc., that the gradient vector assembles).
- **Unlocks**: `math.calc.directional-derivative` (the rigorous proof that the gradient gives the maximum directional rate, and the formula $D_{\vec u}f = \nabla f\cdot\vec u$, built directly on this concept), `math.opt.gradient-methods` (gradient-based optimization algorithms use this concept's steepest-ascent/descent fact directly).
- **Cross-link**: KG lists `math.opt.gradient-methods` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.opt.gradient-methods.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's steepest-descent fact directly to gradient descent's core algorithmic step ($x_{n+1}=x_n - \alpha\nabla f(x_n)$).

## Component 8 — Teaching Notes

- estimated_hours = 6 with an advanced/apply tag places this at the "2 main TAs + gate" tier — A01 (the gradient vector via the topographic-map picture) and A02 (magnitude-as-rate plus the level-curve perpendicularity fact) jointly cover all three LOs, appropriate given the concept's content is a specific vector construction plus two geometric facts about it, rather than broad computational variety.
- Both geometric facts (steepest ascent, perpendicularity) were deliberately presented here as STATED facts with intuitive/pictorial justification only, explicitly deferring their rigorous proofs to `math.calc.directional-derivative` (named directly in Component 3) — proving them properly requires the directional derivative formula $D_{\vec u}f=\nabla f\cdot\vec u$ and the Cauchy-Schwarz-based maximization argument, machinery this concept's sole prerequisite (`math.calc.partial-derivatives`) does not yet provide.
- The weather-mapping transfer probe was chosen because atmospheric pressure gradients are a genuinely standard, easily-visualized real-world instance of this exact mathematical object, and isobars map naturally onto the level-curve perpendicularity fact without requiring any invented framing.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.partial-derivatives`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.opt.gradient-methods` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: topographic map before formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
