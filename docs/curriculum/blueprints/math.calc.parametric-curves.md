<!-- BLUEPRINT: math.calc.parametric-curves -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Parametric Equations and Curves
**Concept ID:** `math.calc.parametric-curves`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=6 | mastery_threshold=0.75

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.calc.parametric-curves |
| name | Parametric Equations and Curves |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 6 |
| mastery_threshold | 0.75 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.func.function-concept, math.geom.coordinate-plane |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.75 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.func.function-concept**: a function assigns exactly one output to each input — the vertical line test's underlying rule; parametric curves are motivated precisely by curves that VIOLATE this rule as $y=f(x)$ but are still perfectly well-defined via a THIRD variable
- **math.geom.coordinate-plane**: (x,y) points plotted on axes — parametric equations produce these same (x,y) points, just generated via an intermediate parameter rather than a direct $y=f(x)$ rule

### Target Knowledge State
Student can plot a parametric curve $x=f(t), y=g(t)$ by computing (x,y) pairs at several t-values and connecting them IN ORDER of increasing t (tracking direction of travel, not just the resulting shape); correctly recognize that a parametric curve can trace out a shape (like a full circle) that is NOT the graph of any single function $y=f(x)$, because it fails the vertical line test; correctly eliminate the parameter to find a Cartesian (x,y)-only equation when possible, while recognizing this ALWAYS loses information (the direction/order of tracing, and sometimes the exact t-range/domain restriction); and correctly distinguish "the same curve, different parametrizations" from "different curves," recognizing that multiple different (f(t),g(t)) pairs can trace an IDENTICAL set of points, possibly at different speeds or in different directions.

### Conceptual Obstacles
1. Plotting the (x,y) points from a parametrization without tracking the ORDER (direction) of increasing t — a parametric curve carries a direction of travel (like a moving particle's path) that a bare Cartesian equation for the same shape does not capture; two parametrizations can trace the identical set of points in OPPOSITE directions, and this is a genuinely different piece of information, not an equivalent restatement
2. Assuming every parametric curve corresponds to some function $y=f(x)$ — the classic counterexample is the full circle $x=\cos t, y=\sin t$, which fails the vertical line test (each x between $-1$ and $1$, except the endpoints, corresponds to TWO different y-values) and hence is NOT the graph of a function at all, even though it is perfectly well-defined and plottable as a parametric curve
3. Believing that eliminating the parameter (finding a Cartesian equation) always recovers an EQUIVALENT description with no loss — eliminating $t$ from $x=\cos t, y=\sin t$ gives $x^2+y^2=1$, the full circle equation, but the ORIGINAL parametrization (with a restricted t-range, e.g. $t\in[0,\pi]$) might trace only the TOP HALF of the circle, information the Cartesian equation $x^2+y^2=1$ alone does not preserve

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | DIRECTION-OF-TRACING-IGNORED | Student plots the (x,y) points of a parametrization without tracking the order/direction of increasing t, treating the parametric curve as equivalent to its bare point-set shape | Any parametrization where reversing the direction of t produces a visually identical curve, but traced oppositely (e.g. swapping cos t and sin t's roles, or reversing the t-range) |
| MC-2 | EVERY-PARAMETRIC-CURVE-IS-A-FUNCTION | Student assumes a parametric curve must correspond to some $y=f(x)$ function, missing that curves like a full circle fail the vertical line test and are not function graphs at all | The circle $x=\cos t, y=\sin t$; any closed or self-intersecting parametric curve |
| MC-3 | ELIMINATING-PARAMETER-LOSES-NOTHING | Student believes the Cartesian equation obtained by eliminating t is fully equivalent to the original parametrization, missing that direction and t-range restrictions can be lost in the process | Any parametrization with a restricted t-domain (e.g. only half a circle, or only part of a curve traced once vs. multiple times) |

**Foundational Misconception:** MC-2 (EVERY-PARAMETRIC-CURVE-IS-A-FUNCTION) — it is the exact motivating reason this concept exists (per the KG description: "enables representation of curves that are not functions, like circles"); a student who assumes every parametrization secretly IS a function graph has missed the concept's entire point, and this misconception directly enables MC-1 and MC-3, since a student thinking "it's just a function in disguise" has no reason to track direction (MC-1) or worry about information loss when eliminating the parameter (MC-3) — both errors stem from treating parametric curves as merely an alternate NOTATION for ordinary functions rather than a genuinely more general kind of object.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner plots a table of (t,x,y) values for the unit circle parametrization and connects the points IN ORDER, observing the traced shape and direction directly, before the general theory is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: a (t,x,y) table for $x=\cos t,y=\sin t$, plotted in order with arrows showing direction; P: the same curve compared against a vertical-line-test failure picture; A: formal parametric curve definition, and the parameter-elimination procedure
2. **A02 P06 CONTRAST PAIR** — two parametrizations of the same circle tracing OPPOSITE directions (MC-1); the circle's failure of the vertical line test vs. a genuine function's parametrization (MC-2); a restricted-t-range semicircle vs. its full-circle Cartesian equation (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Plotting in Order: A Traced Path, Not Just a Shape

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Build the unit-circle parametrization from a concrete (t,x,y) table, tracking direction explicitly; state the formal definition and the elimination procedure

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (a (t,x,y) table for $x=\cos t, y=\sin t$, $t\in[0,2\pi]$):**

| $t$ | $x=\cos t$ | $y=\sin t$ | Point |
|-----|-----------|-----------|-------|
| $0$ | $1$ | $0$ | $(1,0)$ |
| $\pi/2$ | $0$ | $1$ | $(0,1)$ |
| $\pi$ | $-1$ | $0$ | $(-1,0)$ |
| $3\pi/2$ | $0$ | $-1$ | $(0,-1)$ |
| $2\pi$ | $1$ | $0$ | $(1,0)$ (back to start) |

Plotting these five points and connecting them IN THE ORDER LISTED (as $t$ increases from 0 to $2\pi$) traces the unit circle **counterclockwise**, starting and ending at $(1,0)$. The ORDER matters: connecting the same five points in a DIFFERENT order (say, jumping from $(1,0)$ to $(-1,0)$ directly) would not represent this parametrization at all — a parametric curve is a PATH (with a start, an end, and a direction of travel), not merely the unordered set of points it passes through.

**Stage P — Pictorial (the traced path with direction arrows, vs. the vertical line test):**

```
        y                              Vertical line test at x=0.5:
        │  (0,1)                       the vertical line x=0.5 crosses
        │   ↑                          the circle at TWO points:
   (-1,0)───┼───(1,0)  → (direction:    y≈+0.87 AND y≈-0.87
        │   ↓    counterclockwise,      → FAILS the vertical line test
        │  (0,-1)  starting/ending        → NOT the graph of a function
        │           at (1,0))              y=f(x), even though it is a
                                            perfectly well-defined curve
```

**Stage A — Abstract (formal definition and elimination):**

**Parametric curve:** a pair of equations $x=f(t), y=g(t)$ for $t$ in some interval, defining a path in the plane as $t$ varies — tracing (x,y) points IN ORDER as $t$ increases.

**Eliminating the parameter:** solve one equation for $t$ (or use an identity) and substitute into the other to obtain a Cartesian (x,y)-only equation. For $x=\cos t, y=\sin t$: using $\cos^2t+\sin^2t=1$ directly, $x^2+y^2=1$ — the familiar unit circle equation. This procedure recovers the SHAPE traced, but (as A02's Contrast 3 shows) can lose the direction and any t-range restriction.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** For $x=t, y=t^2$, $t\in[-2,2]$: compute the (x,y) points at $t=-2,-1,0,1,2$, and state the direction of tracing (left-to-right, right-to-left, or something else) as $t$ increases.

**CORRECT:** Points: $t=-2\to(-2,4)$; $t=-1\to(-1,1)$; $t=0\to(0,0)$; $t=1\to(1,1)$; $t=2\to(2,4)$. As $t$ increases from $-2$ to $2$, $x=t$ also increases steadily, so the curve is traced LEFT TO RIGHT (this happens to be a parabola $y=x^2$, and here $x$ increasing monotonically with $t$ means the parametric direction matches the usual left-to-right reading of the graph).
→ "Correct — here x=t means the parameter IS the x-coordinate, so tracking t's direction is exactly the same as tracking x's direction; not every parametrization is this simple, as A02 will show." → Proceed to A02.

**PARTIAL:** Student computes the points correctly but doesn't explicitly state the direction, or says "it's just the parabola y=x²" without addressing direction at all.
→ "The points and the resulting shape (a parabola) are correct, but the QUESTION specifically asks about DIRECTION — since x=t increases monotonically as t goes from −2 to 2, the curve is traced left to right. This might feel like a redundant observation for THIS particular parametrization (since x=t makes direction obvious), but for other parametrizations (like the circle in A01), direction is a genuinely separate fact from the shape, and the habit of checking it should start now."

**INCORRECT:** Student lists the points in a different order (e.g. sorted by y-value first) or doesn't connect them in the order that t dictates.
→ "The points must be connected in the order t VISITS them, not re-sorted by x or y value. Here t goes $-2,-1,0,1,2$ in that specific order, so the path visits $(-2,4)\to(-1,1)\to(0,0)\to(1,1)\to(2,4)$ in exactly that sequence — sorting by y-value, for instance, would incorrectly suggest starting at $(0,0)$ (smallest y) and jumping around, which is not how this parametrization actually traces the curve."

**NO_RESPONSE:** → "Points: (-2,4),(-1,1),(0,0),(1,1),(2,4), traced in that order as t goes from -2 to 2. Since x=t increases steadily, the direction of tracing is left to right."

---

### Teaching Action A02 — Direction Matters; Not Every Curve Is a Function; Elimination Loses Information

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with two parametrizations of the same circle traced in opposite directions; break MC-2 by directly applying the vertical line test to the circle; break MC-3 with a restricted-range semicircle vs. its Cartesian equation

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Same circle, opposite directions (MC-1):**

$x=\cos t, y=\sin t$ ($t\in[0,2\pi]$) traces the unit circle **counterclockwise** (as shown in A01). Compare: $x=\cos t, y=-\sin t$ (same $t$-range) traces the IDENTICAL set of points (still the unit circle $x^2+y^2=1$) but **clockwise** instead — check $t=\pi/2$: first parametrization gives $(0,1)$; second gives $(0,-1)$ instead, and follows the opposite rotational sense thereafter. **Same shape, same Cartesian equation ($x^2+y^2=1$ for both), but genuinely DIFFERENT parametric curves** — direction of travel is real information a bare (x,y) point-set does not capture, and two parametrizations that look "the same" by their eliminated equation can still be different curves in this fuller sense.

**Contrast 2 — The circle fails the vertical line test; it is not a function (MC-2):**

Take $x=0.5$ on the circle $x^2+y^2=1$: solving, $y^2=1-0.25=0.75$, so $y=\pm\sqrt{0.75}\approx\pm0.87$ — **TWO y-values for the same x**. A vertical line at $x=0.5$ crosses the circle at both $(0.5, 0.87)$ and $(0.5,-0.87)$. By the vertical line test (from math.func.function-concept), this means the circle is **NOT the graph of any function $y=f(x)$** — yet it is a perfectly legitimate, well-defined PARAMETRIC curve ($x=\cos t, y=\sin t$ traces it completely and unambiguously). Parametric curves are strictly MORE general than function graphs; every function graph $y=f(x)$ can be parametrized trivially ($x=t, y=f(t)$), but not every parametric curve is a function graph.

**Contrast 3 — Eliminating the parameter can lose the t-range (MC-3):**

Parametrization: $x=\cos t, y=\sin t$, restricted to $t\in[0,\pi]$ ONLY (not the full $[0,2\pi]$). This traces just the TOP HALF of the unit circle (from $(1,0)$ at $t=0$, counterclockwise up and over to $(-1,0)$ at $t=\pi$), never touching the bottom half at all.

Eliminating the parameter using $\cos^2t+\sin^2t=1$ still gives $x^2+y^2=1$ — but this Cartesian equation describes the **FULL circle**, top and bottom halves both. The restricted t-range's information (only the top half is actually traced) is **LOST** in the elimination process; recovering it requires also noting the restriction $y\ge0$ (since $\sin t\ge0$ for $t\in[0,\pi]$) alongside the equation, or simply keeping the original parametrization with its t-range intact.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Consider $x=t^2, y=t$, $t\in[-2,2]$. (a) Compute points at $t=-2,-1,0,1,2$ and state the direction of tracing. (b) Eliminate the parameter to find a Cartesian equation. (c) Does the Cartesian equation from (b), by itself, correctly capture everything about the original parametrization? If not, what is missing?

**CORRECT:** (a) Points: $t=-2\to(4,-2)$; $t=-1\to(1,-1)$; $t=0\to(0,0)$; $t=1\to(1,1)$; $t=2\to(4,2)$. As t increases, y=t increases steadily (from $-2$ to $2$), so the curve is traced BOTTOM TO TOP; x decreases then increases (from 4 down to 0 then back up to 4) — the path comes in from the lower right, touches the vertex at the origin, then goes back out to the upper right. (b) From $y=t$, substitute $t=y$ into $x=t^2$: $x=y^2$ (a sideways parabola). (c) NO — $x=y^2$ by itself describes the FULL sideways parabola for all real y, but the original parametrization is restricted to $t\in[-2,2]$, i.e. $y\in[-2,2]$ only; the Cartesian equation alone doesn't convey this restriction, nor does it convey the DIRECTION of tracing (bottom to top) that the original parametrization specifies.
→ "Correct — this example reuses the direction-tracking and elimination-loses-information lessons together on a fresh curve (a sideways parabola instead of a circle)." → Proceed to A03.

**PARTIAL:** Student gets (a) and (b) but in (c) says "yes, the Cartesian equation captures everything, since it's the same curve."
→ "Check specifically: does $x=y^2$ alone tell you the curve stops at $y=\pm2$ (rather than continuing for all real y)? It doesn't — that boundary is a fact about the ORIGINAL t-range ($t\in[-2,2]$), not visible in the bare equation $x=y^2$. Similarly, does $x=y^2$ alone tell you which DIRECTION the curve is traced? It doesn't — a Cartesian equation describes a static shape, with no built-in sense of 'traveling' along it in a particular order, which is exactly the extra information a parametrization carries that its eliminated equation does not."

**INCORRECT:** Student claims the parametrization must correspond to some $y=f(x)$ function since "it eliminates to a nice equation" (a version of MC-2 applied here, though this specific curve DOES pass the vertical-line-test in x as a function of y, testing whether the student can tell WHEN the concern does vs. doesn't apply).
→ "Careful: $x=y^2$ is NOT a function of the form $y=f(x)$ (solving for y given x, $y=\pm\sqrt x$, gives two values for most positive x — this fails the vertical line test in the usual x-independent, y-dependent sense). It IS however expressible as $x=g(y)$, a function of y (each y gives exactly one x=y²) — a valid but different kind of function relationship. The general lesson stands: don't assume a parametric curve is automatically a $y=f(x)$ function; check the vertical line test directly on the resulting shape."

**NO_RESPONSE:** → "(a) Points: (4,-2),(1,-1),(0,0),(1,1),(4,2), traced bottom to top as t goes from -2 to 2. (b) x=y² (substituting t=y into x=t²). (c) No — the equation x=y² alone doesn't specify the t-range restriction (y∈[-2,2]) or the direction of tracing (bottom to top)."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess direction-tracking, correct vertical-line-test application to parametric curves, and awareness of information loss under elimination, under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** For $x=3\cos t, y=3\sin t$, $t\in[0,2\pi]$, eliminate the parameter and state the resulting curve.

*Solution:* $x^2+y^2=9\cos^2t+9\sin^2t=9$ — a circle of radius 3 centered at the origin.

**Problem 2:** Does the curve $x=t^3, y=t$ (all real $t$) pass the vertical line test as a graph $y=f(x)$? Justify.

*Solution:* Yes — solving $x=t^3$ for $t=x^{1/3}$ (a genuine, single-valued function of x, since cube roots are unique for all reals), so $y=x^{1/3}$, a valid function of x; each x gives exactly one y, passing the vertical line test.

**Problem 3:** Two parametrizations both trace the line segment from $(0,0)$ to $(1,1)$: (i) $x=t,y=t$, $t\in[0,1]$; (ii) $x=1-t,y=1-t$, $t\in[0,1]$. Do these represent the SAME parametric curve? Justify using direction.

*Solution:* No — they trace the identical SET of points (the segment from (0,0) to (1,1)) but in OPPOSITE directions: (i) starts at (0,0) when t=0 and ends at (1,1) when t=1; (ii) starts at (1,1) when t=0 and ends at (0,0) when t=1. Same shape, opposite direction — different parametric curves.

**Problem 4:** For $x=\cos t, y=\sin t$ restricted to $t\in[\pi, 2\pi]$ only, which half of the circle is traced, and does the eliminated equation $x^2+y^2=1$ alone convey this restriction?

*Solution:* The BOTTOM half (since $\sin t\le0$ for $t\in[\pi,2\pi]$, giving $y\le0$ throughout). The eliminated equation $x^2+y^2=1$ does NOT convey this — it describes the full circle; the restriction to the bottom half is lost unless explicitly noted (e.g. as $x^2+y^2=1, y\le0$) or the original parametrization with its t-range is kept.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A robot moves along a path given by $x=t\cos t, y=t\sin t$ for $t\in[0,4\pi]$ (a spiral, moving outward while rotating).

(a) Compute the robot's position at $t=0, \pi, 2\pi, 3\pi, 4\pi$, and describe qualitatively how the distance from the origin changes as $t$ increases (do NOT attempt to fully eliminate the parameter — reason about the shape and direction directly from the parametrization).
(b) A colleague says: "Since this path eventually returns to angle 0 (mod $2\pi$) multiple times, and the x,y formulas involve cos and sin just like a circle, this must just be a circle, possibly traced multiple times." Evaluate this claim using your answer to (a).
(c) Explain, in terms of this specific example, why "eliminating the parameter" is not just difficult here but would in fact throw away one of the MOST IMPORTANT features of this curve if it were somehow accomplished. Connect this explicitly to the general elimination-loses-information lesson from Contrast 3, identifying precisely what information a bare Cartesian equation could never capture about this particular curve.

**Expected solution:**

(a) At $t=0$: $(0,0)$ (the origin, distance 0). At $t=\pi$: $x=\pi\cos\pi=-\pi\approx-3.14$, $y=\pi\sin\pi=0$, point $(-\pi,0)$, distance $\pi\approx3.14$ from origin. At $t=2\pi$: $x=2\pi\cos2\pi=2\pi\approx6.28$, $y=2\pi\sin2\pi=0$, point $(2\pi,0)$, distance $2\pi\approx6.28$. At $t=3\pi$: distance $3\pi\approx9.42$. At $t=4\pi$: distance $4\pi\approx12.57$. The distance from the origin (which equals $t$ itself here, since $\sqrt{x^2+y^2}=\sqrt{t^2\cos^2t+t^2\sin^2t}=|t|=t$ for $t\ge0$) grows STEADILY and without bound as $t$ increases — the path spirals outward, never retracing the same point twice (each full rotation, at $t=2\pi k$, lands on the positive x-axis but at an ever-increasing distance $2\pi k$ from the origin).

(b) The colleague's claim is **wrong**. While the path does return to angle 0 repeatedly (at $t=2\pi, 4\pi$, etc.), it does NOT return to the SAME point each time — from (a), the distance from the origin keeps growing ($0, \pi, 2\pi, 3\pi, 4\pi,\ldots$), so this is a spiral moving continuously outward, never a circle (which would require the distance from the origin to stay CONSTANT while the angle varies). "Involves cos and sin" is not sufficient evidence for "is a circle" — the key defining feature of a circle is constant radius, which this path explicitly lacks (the radius here IS the parameter t itself, growing without bound).

(c) Attempting to eliminate the parameter here (e.g. via $r=t, \theta=t$ in polar-like reasoning, or trying to express $y$ directly in terms of $x$ alone) would be difficult in general, but more importantly: even if some Cartesian $F(x,y)=0$ relation could be extracted describing the spiral's SHAPE, it would necessarily lose the ORDER/TIMING information that makes this a "moving robot's path" rather than a static curve — specifically, WHICH point the robot is at, AT WHAT TIME (value of t), and hence how FAST or in what temporal sequence it visits successive loops of the spiral. A bare shape-only equation (even if one could be written down) could never distinguish "the robot completed 2 full loops by time $t=4\pi$" from some other timing of visiting the identical set of spiral points — exactly the kind of order/direction/timing information Contrast 3 showed is always at risk of being lost when eliminating the parameter, and here that loss would be especially severe, since the entire point of describing a robot's PATH (as opposed to just its final shape) is to know where it is at each moment, information that lives entirely in the parameter t and simply has no representation in a parameter-free Cartesian equation.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 4/5 (⌈0.75 × 5⌉ = ⌈3.75⌉ = 4)

- S ≥ 4: MASTERY ACHIEVED → proceed to P74
- S = 3: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 2: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.calc.parametric-calculus; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.calc.parametric-curves assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — DIRECTION-OF-TRACING-IGNORED (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Plotting only the resulting shape without tracking the order of increasing t is DIRECTION-OF-TRACING-IGNORED. A parametric curve is a PATH with a direction of travel — two parametrizations can trace an identical shape in opposite directions, and that is genuinely different information."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "x=cos t, y=sin t and x=cos t, y=-sin t both trace the unit circle. Are they the same parametric curve?"
- MC-1 response: "Yes, since they produce the exact same set of (x,y) points."

**[P64 — CONCEPTUAL SHIFT]**
"Check a specific t-value, not just the overall shape: at $t=\pi/2$, the first gives $(0,1)$; the second gives $(0,-1)$ — different points at the SAME t, meaning they trace the circle in OPPOSITE rotational directions (one counterclockwise, one clockwise). The overall SET of points visited (the full circle) is identical, but the ORDER/DIRECTION in which those points are visited is not — and that direction is part of what a parametrization specifies, beyond just the shape."

Practice: For x=t, y=t² (t∈[-1,1]) versus x=-t, y=t² (t∈[-1,1]), determine whether both trace the same shape, and if so, whether they trace it in the same direction.

---

### Repair Action B02 — EVERY-PARAMETRIC-CURVE-IS-A-FUNCTION (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Assuming a parametric curve must be some function y=f(x) is EVERY-PARAMETRIC-CURVE-IS-A-FUNCTION. Parametric curves are strictly MORE general — curves like a full circle fail the vertical line test and are not function graphs at all, even though they are perfectly well-defined parametrically."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "x=cos t, y=sin t traces the unit circle. Is this circle the graph of a function y=f(x)?"
- MC-2 response: "Yes, since it's expressed with cos and sin, which are functions."

**[P64 — CONCEPTUAL SHIFT]**
"Check the vertical line test directly on the resulting SHAPE (the circle), not on the formulas used to define it: at x=0.5, solving $x^2+y^2=1$ gives $y=\pm\sqrt{0.75}$ — TWO y-values for one x. A vertical line at x=0.5 crosses the circle twice, so the circle FAILS the vertical line test and is NOT a function graph — even though the individual formulas cos(t) and sin(t) are themselves perfectly good functions OF t. The parametrization uses functions of t; that doesn't make the resulting (x,y) curve itself a function of x."

Practice: Check whether the parametrization x=t², y=t (all real t) passes the vertical line test as a curve in the xy-plane, by finding an x-value with two corresponding y-values (if one exists).

---

### Repair Action B03 — ELIMINATING-PARAMETER-LOSES-NOTHING (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Believing the Cartesian equation from eliminating t captures everything about the original parametrization is ELIMINATING-PARAMETER-LOSES-NOTHING. Elimination can lose the t-range restriction (which portion of the shape is actually traced) and the direction of travel."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "x=cos t, y=sin t for t∈[0,π] eliminates to x²+y²=1. Does this equation fully describe the original curve?"
- MC-3 response: "Yes, x²+y²=1 is the complete, equivalent description."

**[P64 — CONCEPTUAL SHIFT]**
"Check which part of the circle t∈[0,π] actually traces: since $\sin t\ge0$ throughout that range, only the TOP half (y≥0) is traced — the bottom half is never visited. But $x^2+y^2=1$ alone describes the FULL circle (top and bottom). The equation is missing the restriction that only the top half applies here; recovering the full original information requires keeping the t-range (or an equivalent restriction like y≥0) alongside the eliminated equation, not replacing the parametrization with the bare equation alone."

Practice: For x=2cos t, y=2sin t restricted to t∈[π/2, 3π/2], state which portion of the resulting circle is traced, and confirm the eliminated equation x²+y²=4 alone does not specify this.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Reconstruct the unit-circle (t,x,y) table from memory and state the direction of tracing |
| SR-2 | +3 days | Apply the vertical line test directly to a fresh parametric curve's resulting shape (not its defining formulas) |
| SR-3 | +7 days | Eliminate the parameter for a fresh restricted-t-range curve and identify what information (direction, range) is lost |
| SR-4 | +14 days | Reconstruct the spiral transfer probe's argument for why elimination would lose the path's essential timing/order information |

Retrieval flag: if student ignores tracing direction (MC-1) or assumes a parametric curve must be a function (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.func.function-concept | Supplies the vertical line test and the definition of a function, which parametric curves are shown to generalize beyond (circles are not function graphs) |
| Requires (Tier-1) | math.geom.coordinate-plane | Supplies the (x,y) plane on which parametric curves are plotted |
| Unlocks | math.calc.parametric-calculus | Differentiating/integrating parametric curves (dy/dx via dy/dt over dx/dt, arc length) builds directly on the tracing-direction and elimination concepts developed here |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the direction/function/elimination-loss lessons to a genuinely new curve type — an outward spiral — rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=6 → compact structure (2 main TAs + gate), matching the concept's tightly focused scope (one representation, three core distinctions) despite advanced difficulty
- bloom=apply → every checkpoint and the gate require constructing tables, plotting, and eliminating parameters — executable procedures, not just definitional recall
- CPA_entry = C for an advanced learner: a concrete (t,x,y) table for the canonical circle example anchors both the plotting procedure and the direction-tracking discipline before the formal vertical-line-test argument (which requires abstract reasoning about the shape) is introduced

**Key teaching insight:** MC-2 (every parametric curve is a function) is this concept's root misconception because it directly contradicts the concept's own reason for existing (per the KG description, parametric curves exist specifically to represent non-function shapes like circles) — a student who doesn't accept this loses the motivation for the entire topic. A02's Contrast 2 is placed centrally (after the direction contrast, before the elimination contrast) because it is the conceptually deepest of the three, and MC-1 and MC-3 both become easier to teach once a student has internalized that a parametric curve carries MORE information than a bare (x,y) shape (exactly what makes both direction and t-range genuinely extra content worth tracking).

**Reuse of the unit circle as the canonical example:** The circle $x=\cos t,y=\sin t$ is used across A01 (introduction), A02 (all three contrasts), and B01-B03 (all three repairs) — deliberately, so a single, maximally memorable example carries the full weight of the concept, with only the composite transfer probe (A03/P76) introducing a genuinely novel curve (the spiral) to test whether the lessons generalize beyond the one anchor example.

**Sequencing note:** No cross-link concept exists yet for math.calc.parametric-curves; the P76 transfer probe instead uses an outward-spiraling path, deliberately chosen because the "returns to the same angle repeatedly" feature could superficially suggest a circle (testing MC-2's territory in a new guise) while the growing radius decisively distinguishes it, and because a moving robot's path makes the elimination-loses-timing-information argument (MC-3) especially vivid and consequential.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.calc.parametric-curves ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.func.function-concept ✓ (documented content gap, see mathPackageCorpus.test.ts — blueprint exists, referenced here as prose prerequisite only), math.geom.coordinate-plane ✓ | PASS |
| V-3 | CPA entry = C for advanced difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Table-construction/plotting/elimination tasks throughout A01-A03 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=4/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.75×5⌉=⌈3.75⌉=4; PASS=4/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1, MC-2 FOUNDATIONAL, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=6, tightly-scoped → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Outward spiral robot path; timing-information-loss argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
