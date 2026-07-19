# Teaching Blueprint: Convex Function (`math.opt.convex-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.opt.convex-function` |
| name | Convex Function |
| domain | Optimization |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.calc.concavity` |
| unlocks | `math.opt.convex-optimization` |
| cross_links | `math.linalg.positive-definite` |
| CPA_entry_stage | C (Concrete) — begins with a direct numeric verification of the chord inequality before the general Hessian criterion |
| description (KG) | f is convex iff f(λx+(1−λ)y) ≤ λf(x)+(1−λ)f(y). Equivalent: ∇²f ⪰ 0. Jensen's inequality: f(E[X]) ≤ E[f(X)]. Every local minimum of a convex function is global. Key property underlying convex optimization. |

## Component 1 — Learning Objectives

- LO1: Define convexity via the **chord inequality** $f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y)$ for $\lambda\in[0,1]$ — "the chord lies on or above the graph" — correctly including the boundary case where EQUALITY holds throughout (linear functions), not requiring strict inequality or visible upward curvature.
- LO2: Apply the key consequence — **every local minimum of a convex function is global** — via a direct proof-by-contradiction argument, and apply **Jensen's inequality** $f(E[X])\le E[f(X)]$ concretely on a specific random variable.
- LO3: Verify the equivalence between the chord-inequality definition and the **Hessian positive-semidefinite criterion** ($\nabla^2f\succeq0$) concretely on a specific function, directly reusing `math.linalg.positive-definite`'s own eigenvalue test.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.concavity` (concave/convex curvature via the second derivative sign, for single-variable functions).

## Component 3 — Core Explanation

**Convexity is a chord inequality, including the equality case**: $f$ is convex if, for every pair of points $x,y$ and every $\lambda\in[0,1]$, the value of $f$ at the WEIGHTED AVERAGE $\lambda x+(1-\lambda)y$ is AT MOST the weighted average of the values $f(x),f(y)$ — geometrically, the chord connecting $(x,f(x))$ and $(y,f(y))$ lies ON OR ABOVE the graph of $f$ between them. This is a non-strict ($\le$) inequality — linear functions satisfy it with EQUALITY throughout (the chord coincides exactly with the graph), and are therefore convex (and also concave) even though they don't visually "curve upward" at all.

**Every local minimum of a convex function is automatically global**: this genuinely powerful, non-obvious property follows directly from the chord inequality: if $x^*$ were a local minimum but NOT the global minimum (some $y$ has $f(y)<f(x^*)$), then points on the segment toward $y$, arbitrarily close to $x^*$, would have $f$-values STRICTLY LESS than $f(x^*)$ by the chord inequality — contradicting $x^*$ being a local minimum. So no such $y$ can exist; $x^*$ must already be global. This is precisely what makes convex optimization tractable: finding ANY local minimum suffices to find THE minimum.

**Jensen's Inequality and the Hessian criterion are two further, equivalent-or-consequent characterizations**: Jensen's Inequality, $f(E[X])\le E[f(X)]$ for a random variable $X$, is a direct consequence of the chord inequality (generalized from two points to a full probability distribution). Separately, for twice-differentiable $f$, convexity is EQUIVALENT to the Hessian $\nabla^2f$ being positive semidefinite everywhere ($\nabla^2f\succeq0$) — checkable via `math.linalg.positive-definite`'s own eigenvalue or leading-principal-minor tests, giving a computational alternative to checking the chord inequality directly.

## Component 4 — Worked Examples

**Example 1 (LO1 — the chord inequality, including the linear equality case, breaking MC-1)**: For $f(x)=x^2$: check $f(\lambda x+(1-\lambda)y)$ vs. $\lambda f(x)+(1-\lambda)f(y)$ — expanding and simplifying the difference gives $\lambda(1-\lambda)(x-y)^2\ge0$ always (since $\lambda(1-\lambda)\ge0$ for $\lambda\in[0,1]$ and $(x-y)^2\ge0$) — confirming $f(x)=x^2$ is convex directly from the definition. Contrast: $f(x)=x$ (linear) — check: $f(\lambda x+(1-\lambda)y)=\lambda x+(1-\lambda)y=\lambda f(x)+(1-\lambda)f(y)$ EXACTLY — equality, not strict inequality. Linear functions are convex (and simultaneously concave) with equality holding throughout — a case a "curves upward" visual intuition would miss entirely, since a straight line doesn't curve at all.

**Example 2 (LO2 — every local min is global, plus Jensen's inequality concretely, breaking MC-2)**: For $f(x)=x^2$, suppose $x^*=0$ (where $f'(0)=0$, a candidate local min) were NOT the global minimum — some $y$ would have $f(y)<f(0)=0$, impossible since $f(y)=y^2\ge0$ always; so $x^*=0$ genuinely is both local AND global (consistent with the general theorem, verified directly here). For Jensen's Inequality: let $X$ take values $1,3,5$ each with probability $\frac13$. $E[X]=3$, so $f(E[X])=f(3)=9$. $E[f(X)]=E[X^2]=\frac{1^2+3^2+5^2}3=\frac{1+9+25}3=\frac{35}3\approx11.67$. Check: $9\le11.67$ ✓ — Jensen's Inequality confirmed concretely for this specific convex function and distribution.

**Example 3 (LO3 — chord inequality and Hessian criterion agree, cross-link probe, breaking MC-3)**: For $f(x,y)=x^2+y^2$: compute the Hessian $\nabla^2f=\begin{pmatrix}2&0\\0&2\end{pmatrix}$ — directly applying `math.linalg.positive-definite`'s own eigenvalue test: both eigenvalues are $2$ (positive) — POSITIVE DEFINITE (hence positive semidefinite), confirming convexity via the Hessian criterion. Cross-check via the chord inequality directly: for $x=(0,0)$, $y=(2,2)$, $\lambda=0.5$: $f(\lambda x+(1-\lambda)y)=f(1,1)=2$; $\lambda f(x)+(1-\lambda)f(y)=0.5(0)+0.5(8)=4$; checking $2\le4$ ✓. BOTH tests — the Hessian criterion (via `math.linalg.positive-definite`'s eigenvalue test) and the direct chord inequality — agree this function is convex, confirming they are EQUIVALENT characterizations of the identical property, not two separate facts requiring independent verification.

## Component 5 — Teaching Actions

### Teaching Action A01 — Equality Counts Too — Linear Functions Are Convex (Primitive P06: Contrast Pair)

Contrast Example 1's two cases: $f(x)=x^2$ (strict inequality, genuine curvature) against $f(x)=x$ (exact equality, no curvature at all, yet still convex). State: "the chord inequality is $\le$, not strictly $<$ — a function satisfying it with EQUALITY throughout, like any linear function, still counts as convex."

- **MC-1 hook**: ask "must a convex function visibly 'curve upward' everywhere, ruling out linear functions?" — a "yes" answer reveals MC-1 (missing that the non-strict chord inequality includes linear functions as a boundary case).

### Teaching Action A02 — Local Minimum Forces Global, By Contradiction (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: assuming a local min $x^*$ isn't global leads to a direct contradiction via the chord inequality. State: "this genuinely powerful property — no 'trap' local minima that aren't the true minimum — is exactly what the chord inequality guarantees, and it's why convex optimization is tractable."

- **MC-2 hook**: ask "can a convex function have a local minimum that is not the global minimum?" — a "yes" answer reveals MC-2 (missing the every-local-min-is-global theorem).

### Teaching Action A03 — Chord Inequality and Hessian Test Are Equivalent, Not Separate Checks (Primitive P11: Representation Shift)

State: "checking the Hessian is positive semidefinite (reusing the eigenvalue test already mastered) and checking the chord inequality directly are two ROUTES to the exact same conclusion — not two independent properties that could disagree." Work Example 3's side-by-side verification via both routes.

- **MC-3 hook**: ask "are the chord-inequality definition and the Hessian positive-semidefinite criterion two separate, independently-checked properties of a function?" — a "yes" answer reveals MC-3 (missing that they are equivalent characterizations of the identical property).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify the chord inequality directly for $f(x)=|x|$ at $x=-2,y=2,\lambda=0.5$.
  2. Explain why $f(x)=-x^2$ is NOT convex, using the chord inequality with a specific counterexample pair of points.
  3. Compute the Hessian of $f(x,y)=x^2+4y^2$ and determine convexity using the eigenvalue test.
  4. Verify Jensen's Inequality for $f(x)=x^2$ and a random variable taking values $0,2,4$ each with probability $\frac13$.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.positive-definite`)**: "A machine learning engineer needs to verify that a loss function $f(w_1,w_2)=w_1^2+2w_2^2+w_1w_2$ used in a training algorithm is convex, to guarantee gradient descent finds the global minimum. (a) Compute the Hessian of $f$, and using `math.linalg.positive-definite`'s own eigenvalue or leading-principal-minor test, determine whether it is positive semidefinite. (b) A colleague, skeptical of matrix methods, wants to verify convexity directly via the chord inequality on a couple of specific test points instead. Explain what such a spot-check would and would NOT conclusively establish, compared to the Hessian test covering all points at once. (c) The colleague also asks: 'if the Hessian test says the function is convex, does that also automatically tell us gradient descent will find the local minimum quickly, or just that whatever local minimum it finds is guaranteed to be the true global minimum?' Explain specifically what the convexity property does and does not guarantee here."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONVEXITY-REQUIRES-VISIBLE-CURVATURE | Believing a convex function must visibly curve upward everywhere, ruling out linear functions, missing that the non-strict chord inequality includes equality (linear functions) as a valid case | Foundational |
| MC-2 | CONVEX-LOCAL-MIN-ASSUMED-NOT-NECESSARILY-GLOBAL | Believing a convex function could have a local minimum that isn't the global minimum, missing the every-local-min-is-global theorem | Foundational |
| MC-3 | CHORD-INEQUALITY-AND-HESSIAN-TEST-TREATED-AS-SEPARATE | Believing the chord-inequality definition and the Hessian positive-semidefinite criterion are two separate, independently-checked properties, missing that they are equivalent characterizations | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Convexity Requires Visible Curvature") → P41 (detect: ask a student whether a linear function can be convex, checking for "no") → P64 (conceptual shift: re-walk Example 1's linear-function equality case, re-anchoring on "the chord inequality is non-strict; equality throughout still counts as convex").
- **B02 (targets MC-2)**: P27 (name it: "Convex Local Min Assumed Not Necessarily Global") → P41 (detect: ask a student whether a convex function could have a non-global local minimum, checking for "yes") → P64 (conceptual shift: re-walk Example 2's proof-by-contradiction argument, re-anchoring on "every local minimum of a convex function is forced to be global").
- **B03 (targets MC-3)**: P27 (name it: "Chord Inequality and Hessian Test Treated as Separate") → P41 (detect: ask a student whether the chord inequality and Hessian test could give different answers for the same function, checking for "yes, potentially") → P64 (conceptual shift: re-walk Example 3's side-by-side agreement between both tests, re-anchoring on "they are equivalent characterizations of the same property").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.concavity` (single-variable curvature via the second derivative, this concept generalizes to the multivariable chord/Hessian framework).
- **Unlocks**: `math.opt.convex-optimization` (uses convexity's every-local-min-is-global property as the central reason convex optimization problems are tractable).
- **Cross-link**: KG lists `math.linalg.positive-definite` as a cross-link — **authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **cross-link probe**, directly reusing that concept's own eigenvalue test to verify the Hessian criterion in LO3/Example 3.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/understand tag places this at a "3 TAs + gate" tier, appropriately compact given the concept directly reuses `math.calc.concavity`'s curvature intuition and `math.linalg.positive-definite`'s eigenvalue test, focusing the budget on the chord-inequality definition and its two key consequences (global minima, Jensen's inequality).
- **Division of labor**: `math.calc.concavity` owns single-variable second-derivative curvature; `math.linalg.positive-definite` owns the matrix positive-semidefiniteness test. This concept, `math.opt.convex-function`, deliberately does not re-teach either; it owns the GENERAL chord-inequality definition (covering the multivariable and equality cases), the global-minimum and Jensen's-inequality consequences, and the explicit equivalence connecting the chord inequality to the already-mastered Hessian test.
- Example 3's $f(x,y)=x^2+y^2$ was deliberately verified via BOTH the Hessian eigenvalue test and the direct chord inequality on the same function, rather than presenting only one method, specifically to make the equivalence claim (LO3) concretely checkable rather than merely asserted.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.linalg.positive-definite authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.linalg.positive-definite) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: direct numeric verification of the chord inequality before the general Hessian criterion) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
