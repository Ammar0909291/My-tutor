# Teaching Blueprint: Gradient Descent (`math.opt.gradient-methods`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.opt.gradient-methods` |
| name | Gradient Descent |
| domain | Optimization |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.opt.unconstrained-optimization`, `math.calc.gradient` |
| unlocks | `math.opt.stochastic-gradient`, `math.opt.newton-optimization` |
| cross_links | `math.num.newtons-method` |
| CPA_entry_stage | C (Concrete) — hand-iterating gradient descent on a specific quadratic before the general update rule and convergence theory | 
| description (KG) | xₖ₊₁ = xₖ − αₖ∇f(xₖ). Converges for convex f with Lipschitz gradient: rate O(1/k). Strongly convex: linear (geometric) convergence. Step size by line search or fixed rule. Most widely used optimization algorithm in machine learning. |

## Component 1 — Learning Objectives

- LO1: State the gradient descent update rule $x_{k+1}=x_k-\alpha_k\nabla f(x_k)$ — directly reusing `math.calc.gradient`'s own steepest-ascent fact ($\nabla f$ points toward steepest ASCENT, so $-\nabla f$ points toward steepest DESCENT) — and perform several iterations by hand for a simple function, moving in the CORRECT (negative gradient) direction.
- LO2: Recognize the critical role of the step size $\alpha_k$: too large a step can cause DIVERGENCE (overshooting away from the minimum) even for a simple convex function, while too small a step converges reliably but slowly — directly refuting the assumption that any positive step size guarantees convergence.
- LO3: State the convergence-rate distinction from `math.opt.unconstrained-optimization`'s own local-vs-global framework: for general convex $f$ with Lipschitz gradient, convergence is only SUBLINEAR (rate $O(1/k)$), while for STRONGLY convex $f$, convergence is LINEAR (geometric) — a genuinely faster guarantee — directly refuting the assumption that gradient descent converges at one fixed, automatic rate regardless of the function's own convexity structure.

## Component 2 — Prerequisite Check

Assumes mastery of `math.opt.unconstrained-optimization` (stationary points $\nabla f(x^*)=0$; the Hessian test for local minima; local vs. global optima) and `math.calc.gradient` ($\nabla f$ points in the direction of steepest ascent; its magnitude is the maximum rate of change).

## Component 3 — Core Explanation

**Descent uses the NEGATIVE gradient**: `math.calc.gradient` established that $\nabla f$ points in the direction of steepest ASCENT. Gradient descent seeks a MINIMUM, so each step moves in the OPPOSITE direction, $-\nabla f(x_k)$ — the direction of steepest DESCENT. The update rule $x_{k+1}=x_k-\alpha_k\nabla f(x_k)$ takes a step of size $\alpha_k$ (the **step size** or **learning rate**) in that descent direction, repeated iteratively.

**Step size is critical — not just any positive value works**: choosing $\alpha_k$ too LARGE can cause the iterates to overshoot the minimum and DIVERGE (growing in magnitude, moving further away with each step) — even for a simple convex quadratic function, where the minimum is easy to find in principle. Choosing $\alpha_k$ appropriately small guarantees convergence, but too small a value converges very slowly. Step size is typically chosen via a line search (searching along the descent direction for a good step) or a fixed rule tuned to the function's known properties.

**Convergence rate depends on the function's convexity structure**: for a general convex function $f$ with Lipschitz continuous gradient, gradient descent is guaranteed to converge only at a SUBLINEAR rate, $O(1/k)$ — the error shrinks roughly like $1/k$, a comparatively slow guarantee. For a STRONGLY convex function (one whose curvature is bounded away from zero everywhere, per `math.opt.unconstrained-optimization`'s own Hessian-positive-definiteness idea, now uniformly so), gradient descent converges LINEARLY (geometrically) instead — the error shrinks by a fixed multiplicative FACTOR at every step, a genuinely much faster guarantee. The function's own structure — not gradient descent itself — determines which of these two guarantees applies.

## Component 4 — Worked Examples

**Example 1 (LO1 — hand-iterating with the correct descent direction, breaking MC-1)**: For $f(x)=x^2$ (so $\nabla f(x)=2x$), starting at $x_0=4$ with step size $\alpha=0.1$: $x_1=x_0-\alpha\nabla f(x_0) = 4-0.1(8)=4-0.8=3.2$. $x_2=3.2-0.1(6.4)=3.2-0.64=2.56$ — moving steadily TOWARD the minimum at $x=0$. If a student mistakenly used $x_1=x_0+\alpha\nabla f(x_0)=4+0.8=4.8$ (adding, not subtracting, the gradient), this would move AWAY from the minimum — exactly the wrong (ascent) direction.

**Example 2 (LO2 — too large a step size causes divergence, breaking MC-2)**: Same $f(x)=x^2$, $\nabla f(x)=2x$, but with a much larger step size $\alpha=1.5$, starting at $x_0=4$: $x_1=4-1.5(2)(4)=4-12=-8$. $x_2=-8-1.5(2)(-8)=-8+24=16$. $x_3=16-1.5(2)(16)=16-48=-32$. The iterates GROW in magnitude ($4\to-8\to16\to-32\to\cdots$), **diverging** away from the minimum at $x=0$ — despite using a genuinely positive step size and the correct descent direction throughout.

**Example 3 (LO3 — sublinear vs. linear convergence, orientation-level illustration)**: For $f(x)=x^2$ (strongly convex — its second derivative is the fixed positive constant $2$ everywhere), with step size $\alpha=0.1$: $x_{k+1}=x_k-0.1(2x_k)=x_k(0.8)$, so the error $e_k=|x_k|$ satisfies $e_{k+1}=0.8e_k$ EXACTLY — a genuine, constant-ratio geometric (linear) convergence, verifiable directly. Contrast with $f(x)=x^4$ near its flat minimum at $x=0$ (merely convex, NOT strongly convex there — its second derivative $12x^2\to0$ as $x\to0$, no longer bounded away from zero): gradient descent's guaranteed convergence rate near this flatter minimum slows to the weaker $O(1/k)$ sublinear guarantee instead, since the strong-convexity condition that produced Example 3's clean constant ratio for $x^2$ genuinely fails here.

## Component 5 — Teaching Actions

### Teaching Action A01 — Subtract the Gradient, Never Add It (Primitive P11: Representation Shift)

State: "`math.calc.gradient` already told you $\nabla f$ points toward steepest ASCENT — to descend toward a minimum, you move in exactly the OPPOSITE direction, which is why the update rule subtracts $\alpha_k\nabla f(x_k)$." Work Example 1's full iteration, explicitly checking the direction of movement at each step.

- **MC-1 hook**: ask "does gradient descent move in the direction of the gradient, ∇f(x_k), or the opposite direction?" — an "the gradient itself" answer reveals MC-1 (a direct sign error, confusing steepest ascent with steepest descent).

### Teaching Action A02 — Step Size Choice Is Critical, Not Automatic (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: a genuinely positive step size, correctly applied in the descent direction, still produces DIVERGENCE because it is too large. State: "gradient descent's correctness depends on choosing a reasonable step size — 'any positive number' is not enough; too large a step overshoots and the iterates can spiral away entirely."

- **MC-2 hook**: ask "as long as the step size is positive, is gradient descent guaranteed to converge to the minimum?" — a "yes" answer reveals MC-2 (missing that too large a step size can cause outright divergence, even for a simple convex function).

### Teaching Action A03 — Strongly Convex Converges Faster (Primitive P06: Contrast Pair)

Contrast Example 3's two cases: $f(x)=x^2$ (strongly convex, clean geometric $0.8^k$ convergence) versus $f(x)=x^4$ near its flat minimum (merely convex, only the weaker sublinear $O(1/k)$ guarantee applies). State: "gradient descent doesn't converge at one fixed universal rate — the function's OWN structure, specifically whether it's strongly convex or just convex, determines how strong a convergence guarantee you actually get."

- **MC-3 hook**: ask "does gradient descent converge at the same rate for every convex function, strongly convex or not?" — a "yes" answer reveals MC-3 (missing the genuine rate distinction between merely-convex and strongly-convex functions).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f(x)=3x^2$, starting at $x_0=2$ with step size $\alpha=0.1$, compute $x_1$ and $x_2$ using gradient descent.
  2. Explain why a student who computes $x_1=x_0+\alpha\nabla f(x_0)$ has made a critical directional error.
  3. For $f(x)=x^2$ with step size $\alpha=2$ (very large), compute $x_1,x_2,x_3$ starting from $x_0=1$, and describe what happens to the sequence.
  4. Explain why gradient descent applied to a strongly convex function is guaranteed a faster convergence rate than the same algorithm applied to a merely convex (but not strongly convex) function.
- **P76 (Transfer Probe, mode = independence)**: "A machine learning engineer trains a model by minimizing a loss function $f(\theta)$ over the model's parameters $\theta$, using gradient descent. (a) Explain, using LO1's steepest-ascent/descent fact, why the parameter update rule subtracts (rather than adds) the gradient at each training step. (b) The engineer notices the training loss is oscillating wildly and increasing rather than decreasing — using this lesson's Example 2, explain the most likely cause and what adjustment (referencing $\alpha_k$) should be tried first. (c) The engineer is training two different models: one whose loss function is strongly convex, and one whose loss function is only weakly (merely) convex near its minimum. Explain why the engineer should expect noticeably different convergence behavior between the two, even using the identical gradient descent algorithm and step-size rule."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GRADIENT-DESCENT-DIRECTION-SIGN-ERROR | Believing gradient descent moves in the direction of the gradient itself rather than its negative, confusing steepest ascent with steepest descent | Foundational |
| MC-2 | ANY-POSITIVE-STEP-SIZE-ASSUMED-SUFFICIENT | Believing any positive step size guarantees convergence, missing that too large a step size can cause the iterates to diverge, even for a simple convex function | Foundational |
| MC-3 | CONVERGENCE-RATE-ASSUMED-UNIFORM-ACROSS-ALL-CONVEX-FUNCTIONS | Believing gradient descent converges at the same rate for every convex function, missing the genuine distinction between sublinear (merely convex) and linear (strongly convex) convergence guarantees | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Gradient Descent Direction Sign Error") → P41 (detect: ask a student to state the update rule and check whether they add rather than subtract the gradient term) → P64 (conceptual shift: re-walk Example 1's iteration, contrasting the correct descent path toward $x=0$ with the wrong ascent-direction alternative, re-anchoring on "$\nabla f$ points toward steepest ascent — subtracting it is exactly how you descend").
- **B02 (targets MC-2)**: P27 (name it: "Any Positive Step Size Assumed Sufficient") → P41 (detect: ask a student whether any positive step size guarantees convergence, and check for a "yes") → P64 (conceptual shift: re-walk Example 2's diverging iteration sequence, re-anchoring on "step size choice genuinely matters — too large a step overshoots and can spiral away from the minimum entirely").
- **B03 (targets MC-3)**: P27 (name it: "Convergence Rate Assumed Uniform Across All Convex Functions") → P41 (detect: ask a student whether gradient descent's convergence rate is the same for every convex function, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's $x^2$-versus-$x^4$-near-zero contrast, re-anchoring on "strongly convex functions get a genuinely faster, geometric convergence guarantee — merely convex functions only get the weaker sublinear one").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.opt.unconstrained-optimization` (stationary points and the Hessian test this concept's iterative search ultimately aims to satisfy), `math.calc.gradient` (the steepest-ascent fact this concept's descent direction directly negates).
- **Unlocks**: `math.opt.stochastic-gradient` (a noisy, sampled variant of this exact update rule), `math.opt.newton-optimization` (an alternative iterative method using second-order (Hessian) information instead of just the gradient).
- **Cross-link**: KG lists `math.num.newtons-method` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe contrasting gradient descent's first-order iteration with Newton's method's second-order iteration once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (the correct descent direction), A02 (step-size criticality), and A03 (the convergence-rate distinction) each target a distinct LO, appropriate for a concept whose core content is one iterative update rule plus two important behavioral cautions about its use.
- All three worked examples deliberately reuse the SAME function, $f(x)=x^2$ (with Example 3 additionally introducing $x^4$ purely for the rate contrast) — letting one simple, fully hand-computable quadratic carry the correct-direction demonstration, the divergence demonstration, and the linear-convergence-rate verification, rather than introducing fresh functions for each objective.
- Example 3's exact geometric ratio ($e_{k+1}=0.8e_k$) was deliberately chosen as a directly VERIFIABLE instance of linear convergence (computable by hand from the update rule itself), rather than merely asserting the KG's stated $O(1/k)$-vs-linear distinction without a concrete anchor.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.num.newtons-method unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: hand-iterated specific quadratic before the general update rule and rate theory) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
