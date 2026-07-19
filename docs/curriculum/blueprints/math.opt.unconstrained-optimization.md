# Teaching Blueprint: Unconstrained Optimization (`math.opt.unconstrained-optimization`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.opt.unconstrained-optimization` |
| name | Unconstrained Optimization |
| domain | Optimization |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.calc.critical-points`, `math.calc.concavity` |
| unlocks | `math.opt.gradient-methods`, `math.opt.convex-optimization` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — proficient learner already fluent in 1D critical points and concavity; the multivariable generalization is introduced directly via the gradient/Hessian formalism |
| description (KG) | Find min f(x) over x∈ℝⁿ. Necessary condition: ∇f(x*)=0. Sufficient: ∇²f(x*) positive definite (second-order condition). Local vs global optima. Functions with many local minima require global optimization. |

## Component 1 — Learning Objectives

- LO1: Generalize the single-variable critical-point condition $f'(c)=0$ (`math.calc.critical-points`) to the multivariable **stationary-point condition** $\nabla f(x^*) = 0$ — ALL partial derivatives simultaneously zero at $x^*$ — and correctly find stationary points by solving the resulting system of equations.
- LO2: Generalize the single-variable second-derivative test ($f''>0$ from `math.calc.concavity`, confirming a local min) to the multivariable **Hessian test**: at a stationary point $x^*$, $\nabla^2f(x^*)$ **positive definite** confirms a local minimum, correctly applying the 2-variable discriminant shortcut $D=f_{xx}f_{yy}-f_{xy}^2$ (positive definite iff $D>0$ and $f_{xx}>0$).
- LO3: Distinguish **local** from **global** optima — recognize that a stationary point with a positive-definite Hessian is only a guaranteed LOCAL minimum, and that functions with multiple local minima require dedicated **global optimization** methods (named here, not derived) to find the true global minimum.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.critical-points` (a critical point is where $f'(c)=0$ or $f'(c)$ undefined; critical points are only candidates for extrema, never guarantees) and `math.calc.concavity` (concave up, $f''>0$, confirms a local min at a critical point; concavity as the sign of the second derivative).

## Component 3 — Core Explanation

**From one equation to a system: the stationary-point condition $\nabla f(x^*)=0$**: `math.calc.critical-points` found candidates for extrema of $f:\mathbb{R}\to\mathbb{R}$ by solving the single equation $f'(x)=0$. For $f:\mathbb{R}^n\to\mathbb{R}$, the direct generalization uses the gradient vector $\nabla f = (\partial f/\partial x_1,\ldots,\partial f/\partial x_n)$: a point $x^*$ is a **stationary point** exactly when $\nabla f(x^*)=0$, meaning **every** partial derivative vanishes simultaneously at $x^*$ — not just one of them. This is genuinely a SYSTEM of $n$ equations (one per partial derivative) that must ALL hold at once, not $n$ independent one-variable checks.

**From a sign check to a matrix check: the Hessian test**: `math.calc.concavity` confirmed a local min at a 1D critical point by checking a single sign, $f''(c)>0$. The direct multivariable analog replaces the single number $f''(c)$ with the **Hessian matrix** $\nabla^2f(x^*)$ — the matrix of all second partial derivatives — and replaces "positive" with **positive definite** (informally: the function curves upward in EVERY direction from $x^*$, not just along the coordinate axes). For a function of two variables, this reduces to a computable **discriminant test**: with $D = f_{xx}f_{yy}-f_{xy}^2$ evaluated at $x^*$, the Hessian is positive definite (confirming a local min) exactly when $D>0$ AND $f_{xx}>0$; if $D<0$, $x^*$ is a **saddle point** (neither a min nor a max), regardless of the individual signs of $f_{xx}$ and $f_{yy}$ alone.

**Local optima are still only candidates, and global optimization is a separate problem**: exactly as `math.calc.critical-points` warned that a critical point need not be an extremum at all, a stationary point with a positive-definite Hessian is confirmed only as a LOCAL minimum — the smallest value of $f$ in some neighborhood, not necessarily the smallest value overall. A function with many local minima (e.g. a bumpy landscape with several separate valleys) may have a **global minimum** at only one of them, and distinguishing "the local min I found" from "the true global min" generally requires comparing across all stationary points, or dedicated global optimization methods that go beyond checking $\nabla f=0$ and the Hessian at a single point — a separate, more advanced problem this concept only names, not solves.

## Component 4 — Worked Examples

**Example 1 (LO1 — solving $\nabla f=0$ as a system, breaking MC-2)**: For $f(x,y) = x^2+y^2-4x-6y+13$: $\nabla f = (2x-4,\ 2y-6)$. Setting BOTH components to zero: $2x-4=0 \Rightarrow x=2$; $2y-6=0 \Rightarrow y=3$. So $(2,3)$ is the unique stationary point — found by solving both equations together, not either one alone. Checking the point $(2,0)$: $\partial f/\partial x = 2(2)-4=0$ (this one partial vanishes!), but $\partial f/\partial y = 2(0)-6=-6\neq0$ — so $(2,0)$ is **NOT** a stationary point, despite one partial derivative being zero there; ALL partials must vanish simultaneously.

**Example 2 (LO2 — Hessian confirms a local min)**: Continuing with $f(x,y)=x^2+y^2-4x-6y+13$ at $(2,3)$: $f_{xx}=2$, $f_{yy}=2$, $f_{xy}=0$. Discriminant $D = (2)(2)-0^2=4>0$, and $f_{xx}=2>0$ — so $(2,3)$ is a confirmed local minimum. (Since $f$'s Hessian is constant and positive definite everywhere, this is in fact the GLOBAL minimum too, $f(2,3)=4+9-8-18+13=0$.)

**Example 3 (LO2/LO3 — a saddle point, breaking MC-1 and MC-3)**: For $g(x,y)=x^2-y^2$: $\nabla g = (2x,-2y) = 0$ at $(0,0)$ — a stationary point, exactly like Example 2. But the Hessian here is $g_{xx}=2$, $g_{yy}=-2$, $g_{xy}=0$, giving $D=(2)(-2)-0^2=-4<0$ — this is a **saddle point**, neither a local min nor a local max (moving along the $x$-axis from $(0,0)$, $g$ increases; moving along the $y$-axis, $g$ decreases). $(0,0)$ satisfies $\nabla g=0$ exactly as $(2,3)$ satisfied $\nabla f=0$ in Example 2 — the stationary-point condition ALONE could not distinguish these two genuinely different outcomes; only the Hessian test could.

## Component 5 — Teaching Actions

### Teaching Action A01 — Solving $\nabla f(x^*)=0$ as a System (Primitive P11: Representation Shift)

State: "`math.calc.critical-points` solved one equation, $f'(x)=0$; here, with $n$ variables, $\nabla f(x)=0$ is $n$ equations that must ALL hold simultaneously — solving one partial derivative's equation alone is not enough." Work Example 1's full system, including the $(2,0)$ non-example.

- **MC-2 hook**: ask "if $\partial f/\partial x = 0$ at some point, is that point automatically a stationary point?" — a "yes" answer reveals MC-2 (checking only one partial derivative rather than requiring all of them to vanish together).

### Teaching Action A02 — The Hessian Test: A Matrix, Not Just a Sign (Primitive P11: Representation Shift)

State: "`math.calc.concavity` checked one number's sign, $f''(c)$; here, $\nabla^2f(x^*)$ is a full matrix, and 'positive' becomes 'positive definite' — for two variables, this reduces to the discriminant test $D=f_{xx}f_{yy}-f_{xy}^2$, which needs BOTH $D>0$ and $f_{xx}>0$." Work Example 2's full discriminant computation.

### Teaching Action A03 — Same Stationary Condition, Opposite Outcome (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: $(0,0)$ satisfies $\nabla g=0$ exactly as $(2,3)$ satisfied $\nabla f=0$ in Example 2, yet the discriminant test gives $D<0$ here versus $D>0$ there — a saddle point versus a genuine local min, from the identical-looking stationary-point condition alone. State: "$\nabla f(x^*)=0$ only tells you WHERE to look — exactly like a 1D critical point, it is never a guarantee of what you'll find there; the Hessian test is what actually distinguishes a min from a saddle (or a max)."

- **MC-1 hook**: ask "if $\nabla f(x^*)=0$, is $x^*$ automatically a local minimum?" — a "yes" answer reveals MC-1 (the direct multivariable analog of assuming every 1D critical point is an extremum).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find all stationary points of $f(x,y) = x^2+y^2+2x-6y+5$ by solving $\nabla f=0$.
  2. For the stationary point found in problem 1, compute the Hessian discriminant $D=f_{xx}f_{yy}-f_{xy}^2$ and $f_{xx}$, and state whether it is a local min, local max, or saddle point.
  3. For $h(x,y)=y^2-x^2$, verify $(0,0)$ is a stationary point, then use the discriminant test to classify it.
  4. Explain, in your own words, why finding a point where $\nabla f=0$ and confirming a positive-definite Hessian only guarantees a LOCAL minimum, not necessarily the smallest value of $f$ everywhere.
- **P76 (Transfer Probe, mode = independence)**: "A company models its profit-reducing cost function as $C(x,y) = x^2+y^2-2x-4y+10$, where $x$ and $y$ are quantities of two raw materials. (a) Find the stationary point of $C$ by solving $\nabla C=0$. (b) Use the discriminant test to confirm this stationary point is a genuine local minimum of cost, not a saddle point. (c) The company's operations manager claims that once a local minimum is found, no cheaper combination of $x,y$ could possibly exist anywhere. Explain, using the local-vs-global distinction from this lesson, why this claim is not automatically justified — under what circumstance would it actually be justified?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | STATIONARY-POINT-ASSUMED-TO-BE-EXTREMUM | Believing ∇f(x*)=0 alone guarantees a local minimum (or maximum), without checking the Hessian — the direct multivariable analog of assuming every 1D critical point is an extremum | Foundational |
| MC-2 | SINGLE-PARTIAL-DERIVATIVE-CHECKED-ALONE | Treating a point as stationary because ONE partial derivative vanishes there, without checking that ALL partial derivatives vanish simultaneously | Foundational |
| MC-3 | HESSIAN-TEST-REDUCED-TO-INDIVIDUAL-SECOND-PARTIALS | Checking only the individual signs of f_xx and f_yy (as if each were an independent 1D concavity check) instead of the full discriminant D=f_xx f_yy − f_xy², missing that a positive f_xx alone does not rule out a saddle point | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Stationary Point Assumed to Be Extremum") → P41 (detect: ask a student whether $\nabla f(x^*)=0$ alone is enough to conclude a local min, and check for a "yes" without mentioning the Hessian) → P64 (conceptual shift: re-walk Example 3's saddle point directly beside Example 2's genuine local min, re-anchoring on "the stationary condition tells you WHERE to check, the Hessian tells you WHAT you find there — exactly as in the 1D case").
- **B02 (targets MC-2)**: P27 (name it: "Single Partial Derivative Checked Alone") → P41 (detect: ask a student to verify a candidate stationary point and check whether they stop after confirming only one partial derivative is zero) → P64 (conceptual shift: re-walk Example 1's $(2,0)$ non-example, re-anchoring on "every partial derivative must vanish AT THE SAME point — check all of them, every time").
- **B03 (targets MC-3)**: P27 (name it: "Hessian Test Reduced to Individual Second Partials") → P41 (detect: ask a student to classify a stationary point using only the signs of $f_{xx}$ and $f_{yy}$ separately, without computing $D$) → P64 (conceptual shift: re-walk Example 3's computation, showing $f_{xx}=2>0$ alone would (incorrectly) suggest a min-like curvature in the $x$-direction, while the full discriminant $D=-4<0$ correctly reveals a saddle, re-anchoring on "always compute the full discriminant $D=f_{xx}f_{yy}-f_{xy}^2$ — never judge from one second partial alone").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.critical-points` (the 1D critical-point condition $f'(c)=0$ this concept generalizes to $\nabla f(x^*)=0$, and the "candidates, not guarantees" caution reused directly), `math.calc.concavity` (the 1D second-derivative test $f''>0$ this concept generalizes to the Hessian positive-definite test).
- **Unlocks**: `math.opt.gradient-methods` (iterative algorithms that use $\nabla f$ directly to search for stationary points computationally), `math.opt.convex-optimization` (the special case where every local minimum is automatically global, resolving this concept's own local-vs-global caveat under an added convexity assumption).
- **Cross-link**: KG lists no cross-links for this concept.
- **Notation note**: this blueprint's gradient notation $\nabla f = (\partial f/\partial x,\ldots)$ and $\|\nabla f\|$ deliberately match the already-authored `math.calc.gradient` blueprint's conventions, even though that concept is not a formal KG prerequisite here, to keep gradient notation consistent across the corpus.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (stationary-point system), A02 (Hessian/discriminant test), and A03 (the saddle-point contrast) each target a distinct LO, appropriate for a concept that is fundamentally two direct generalizations (1D critical point → multivariable stationary point; 1D concavity sign → Hessian definiteness) plus one new caution (local vs. global) rather than entirely new machinery.
- Examples 2 and 3 were deliberately built as a matched pair — identical stationary-point structure ($\nabla f=0$ at the origin-shifted point in each), opposite Hessian outcomes — to make the "stationary condition alone is insufficient" lesson as stark as possible, directly mirroring `math.calc.critical-points`' own Example 1-vs-Example 2 contrast structure (genuine extremum vs. inflection-like critical point) one dimension up.
- LO3's local-vs-global distinction and the term "global optimization" are introduced by name only, per the KG description's own scope ("functions with many local minima require global optimization") — the actual methods are correctly deferred to `math.opt.convex-optimization`, which is not yet authored.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: proficient learner, direct generalization of two mastered prerequisites) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
