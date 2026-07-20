# Teaching Blueprint: Lagrange Multipliers (`math.opt.lagrange-multipliers`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.opt.lagrange-multipliers` |
| name | Lagrange Multipliers |
| domain | Optimization |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.calc.partial-derivatives`, `math.opt.unconstrained-optimization` |
| unlocks | `math.opt.kkt` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — proficient learner visualizes level curves of $f$ becoming tangent to the constraint curve $g=0$ before formalizing the parallel-gradient condition algebraically |
| description (KG) | For minimize $f(x)$ subject to $g(x)=0$: at a local optimum, $\nabla f=\lambda\nabla g$ ($\nabla f$ parallel to $\nabla g$). The system $\nabla f=\lambda\nabla g$, $g(x)=0$ has $n+1$ equations for $n+1$ unknowns $(x,\lambda)$. Generalizes to multiple constraints. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize that `math.opt.unconstrained-optimization`'s own condition $\nabla f(x^*)=0$ is EXACTLY the SPECIAL CASE of this concept's condition $\nabla f=\lambda\nabla g$ when there is NO constraint at all (equivalently, $\lambda=0$ always works trivially, or the constraint gradient $\nabla g$ plays no role) — and correctly explain WHY a constraint changes the optimality condition from "$\nabla f$ vanishes" to "$\nabla f$ is merely PARALLEL to $\nabla g$" (not necessarily zero).
- LO2: Derive the parallel-gradient condition $\nabla f=\lambda\nabla g$ geometrically — at a constrained optimum, $\nabla f$ CANNOT have any component tangent to the constraint curve $g=0$ (else moving along the curve would improve $f$ further, contradicting optimality), so $\nabla f$ must point in the SAME (or opposite) direction as $\nabla g$ (the constraint's own normal direction) — and correctly set up and solve the system $\nabla f=\lambda\nabla g,g(x)=0$ ($n+1$ equations, $n+1$ unknowns) for a specific constrained optimization problem.
- LO3: Correctly apply the method to a genuine applied problem (e.g. minimizing cost subject to a production constraint, or finding the closest point on a curve to a given point) — correctly identifying $f$ (the objective) and $g$ (the constraint) from a word problem, and correctly interpreting the solved value of $\lambda$ as the RATE at which the optimal objective value would change per unit relaxation of the constraint (the "shadow price" interpretation).

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.partial-derivatives` ($\partial f/\partial x$, and the gradient $\nabla f$ as the vector of partial derivatives) and `math.opt.unconstrained-optimization` (the necessary condition $\nabla f(x^*)=0$ for an unconstrained local optimum; local vs. global optima).

## Component 3 — Core Explanation

**The constrained optimality condition generalizes `math.opt.unconstrained-optimization`'s own $\nabla f=0$**: `math.opt.unconstrained-optimization` already establishes that, WITHOUT any constraint, a local optimum requires $\nabla f(x^*)=0$ — the gradient vanishes entirely, since there is no restriction on which direction to move to potentially improve $f$. With a constraint $g(x)=0$, movement is restricted to ALONG the constraint curve/surface — so the optimality condition weakens: $\nabla f$ no longer needs to vanish ENTIRELY, only its component TANGENT to the constraint (the only directions actually available to move) must vanish. This is EXACTLY captured by $\nabla f=\lambda\nabla g$: $\nabla f$ is forced to be PARALLEL to $\nabla g$ (the constraint's normal direction), meaning $\nabla f$ has NO tangential component left over. When there is no constraint (or $\lambda$ happens to be $0$), this reduces directly to `math.opt.unconstrained-optimization`'s own $\nabla f=0$.

**Geometric derivation: at a constrained optimum, $\nabla f$ has no tangential component**: parametrize the constraint curve locally by a tangent direction $\mathbf{t}$ (a vector along $g=0$ at the candidate point). Moving a small amount along $\mathbf{t}$ changes $f$ by approximately $\nabla f\cdot\mathbf{t}$ (the directional derivative). If $\nabla f\cdot\mathbf{t}\ne0$ for SOME tangent direction $\mathbf{t}$, moving along (or against) $\mathbf{t}$ would strictly IMPROVE $f$ while staying ON the constraint — contradicting that the candidate point is optimal. So $\nabla f\cdot\mathbf{t}=0$ for EVERY tangent direction $\mathbf{t}$ — meaning $\nabla f$ is PERPENDICULAR to every tangent direction, i.e., $\nabla f$ points purely in the NORMAL direction to the constraint. Since $\nabla g$ ITSELF is the constraint's normal direction (a standard fact: the gradient of a level-set-defining function is normal to that level set), $\nabla f$ must be a scalar MULTIPLE of $\nabla g$ — precisely $\nabla f=\lambda\nabla g$ for some scalar $\lambda$ (the Lagrange multiplier). Together with the constraint $g(x)=0$ itself, this gives $n+1$ equations (the $n$ components of the parallel-gradient condition, plus the constraint) for the $n+1$ unknowns $(x_1,\ldots,x_n,\lambda)$.

**$\lambda$ has a genuine interpretation: the constraint's "shadow price"**: solving the system yields not just the optimal $x^*$, but also a specific value of $\lambda$ — and this $\lambda$ is not merely an algebraic artifact of the solution method. It measures the RATE OF CHANGE of the optimal objective value $f(x^*)$ with respect to a small RELAXATION of the constraint (replacing $g(x)=0$ with $g(x)=c$ for small $c$) — a genuinely useful economic/physical interpretation (e.g., in a cost-minimization problem subject to a resource constraint, $\lambda$ measures how much the minimum cost would change per unit change in the available resource).

## Component 4 — Worked Examples

**Example 1 (LO1 — the constrained condition reducing to the unconstrained one when $\lambda=0$, breaking MC-1)**: consider minimizing $f(x,y)=x^2+y^2$ subject to NO constraint at all — `math.opt.unconstrained-optimization`'s own method gives $\nabla f=(2x,2y)=0\Rightarrow(x,y)=(0,0)$ directly. Reframing this (artificially) as a constrained problem with a TRIVIAL constraint $g(x,y)=0\cdot x+0\cdot y=0$ (satisfied everywhere, i.e., no genuine restriction): the parallel-gradient condition $\nabla f=\lambda\nabla g$ becomes $\nabla f=\lambda\cdot(0,0)=(0,0)$ for ANY $\lambda$ — forcing $\nabla f=0$ directly, EXACTLY `math.opt.unconstrained-optimization`'s own condition, confirming LO1's claimed reduction concretely (the constraint's gradient vanishing entirely is what collapses this concept's condition back to the unconstrained one).

**Example 2 (LO2 — solving a genuine constrained system, breaking MC-2)**: minimize $f(x,y)=x^2+y^2$ (distance-squared from the origin) subject to $g(x,y)=x+y-4=0$ (the line $x+y=4$). Setting up: $\nabla f=(2x,2y)$, $\nabla g=(1,1)$, so $\nabla f=\lambda\nabla g$ gives $2x=\lambda,2y=\lambda$ — forcing $x=y$ directly. Combined with the constraint $x+y=4$: $2x=4\Rightarrow x=2,y=2$, and $\lambda=2x=4$. Verifying geometrically: at $(2,2)$, the circle $x^2+y^2=8$ (the level curve of $f$ through this point) is TANGENT to the line $x+y=4$ — confirming the parallel-gradient condition holds exactly, and this is indeed the closest point on the line to the origin (by direct geometric inspection), concretely instantiating LO2's full setup-and-solve process.

**Example 3 (LO3 — interpreting $\lambda$ as a shadow price in an applied problem, breaking MC-3)**: a factory minimizes cost $f(x,y)=2x^2+3y^2$ (production cost for two inputs $x,y$) subject to a production requirement $g(x,y)=x+y-10=0$ (total output must equal 10 units). Solving: $\nabla f=(4x,6y)=\lambda(1,1)\Rightarrow4x=\lambda,6y=\lambda\Rightarrow x=\lambda/4,y=\lambda/6$; substituting into $x+y=10$: $\lambda/4+\lambda/6=10\Rightarrow\lambda(3/12+2/12)=10\Rightarrow\lambda(5/12)=10\Rightarrow\lambda=24$. So $x=6,y=4$, minimum cost $f(6,4)=2(36)+3(16)=72+48=120$. Interpreting $\lambda=24$: if the production requirement were relaxed slightly to $10.1$ units instead of $10$, the minimum cost would increase by APPROXIMATELY $\lambda\times0.1=2.4$ — directly using $\lambda$'s shadow-price interpretation to predict the SENSITIVITY of the optimal cost to the constraint, without re-solving the entire optimization problem from scratch.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Parallel-Gradient Condition Reduces to `math.opt.unconstrained-optimization`'s Own $\nabla f=0$ When Unconstrained (Primitive P11: Representation Shift)

State: "this concept's condition $\nabla f=\lambda\nabla g$ isn't a completely new idea replacing `math.opt.unconstrained-optimization`'s own $\nabla f=0$ — it's a genuine GENERALIZATION, which collapses back to $\nabla f=0$ exactly when there's no genuine constraint pulling $\nabla f$ in a required direction." Walk Example 1's degenerate-constraint reduction.

- **MC-1 hook**: ask "is the constrained optimality condition $\nabla f=\lambda\nabla g$ a completely separate, unrelated idea from `math.opt.unconstrained-optimization`'s own $\nabla f=0$ condition, or a direct generalization of it?" — a "completely separate" answer reveals MC-1 (missing the direct generalization relationship).

### Teaching Action A02 — At a Constrained Optimum, $\nabla f$ Can Have No Tangential Component — Verified Geometrically (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the solved point $(2,2)$ verified geometrically as the tangency point between $f$'s level curve and the constraint line — a directly checkable geometric confirmation, not just algebra. State: "the parallel-gradient condition isn't an arbitrary algebraic rule to memorize — it's exactly what 'no room left to improve while staying on the constraint' looks like geometrically, and you can literally SEE the tangency at the solution."

- **MC-2 hook**: ask "does the parallel-gradient condition $\nabla f=\lambda\nabla g$ have a genuine geometric meaning (tangency between level curves), or is it simply an algebraic recipe with no deeper interpretation?" — a "just an algebraic recipe" answer reveals MC-2 (missing the geometric tangency meaning underlying the condition).

### Teaching Action A03 — $\lambda$ Is Not Just an Algebra Byproduct — It's the Constraint's Shadow Price (Primitive P06: Contrast Pair)

Contrast treating $\lambda$ as a disposable intermediate variable (solved for, then discarded) against Example 3's direct use of $\lambda=24$ to PREDICT the cost change from a relaxed constraint, without re-solving the whole problem. State: "$\lambda$ isn't just scratch-work used to solve for $x$ and $y$ — its VALUE tells you something genuinely useful: exactly how sensitive your optimal outcome is to a small change in the constraint."

- **MC-3 hook**: ask "once you've solved for the optimal $(x,y)$, does the specific numerical value of $\lambda$ carry any further useful meaning, or can it be discarded as just an intermediate algebraic step?" — a "can be discarded" answer reveals MC-3 (missing $\lambda$'s genuine shadow-price interpretation).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Minimize $f(x,y)=x^2+4y^2$ subject to $g(x,y)=x+y-3=0$, solving the full system for $(x,y,\lambda)$.
  2. Verify your answer to problem 1 geometrically by checking that the level curve of $f$ through your solution is tangent to the constraint line.
  3. Explain why, if the constraint gradient $\nabla g$ happened to be the zero vector at a candidate point, the method as stated would break down (this is a genuine edge case worth flagging, not covered in the main examples).
  4. Interpret the sign and magnitude of a solved $\lambda=-5$ in a cost-minimization context: does relaxing the constraint increase or decrease the minimum cost, and by approximately how much per unit relaxation?
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A farmer wants to minimize the total fencing perimeter $f(x,y)=2x+2y$ needed to enclose a rectangular field of dimensions $x\times y$, subject to the constraint that the field's AREA must equal a fixed value: $g(x,y)=xy-A=0$ for some constant $A$. (a) Set up and solve the Lagrange multiplier system for this problem in terms of $A$, finding $x,y$, and $\lambda$. (b) Using your solved $\lambda$, explain what it would mean, in farming terms, if the farmer decided to enclose a SLIGHTLY larger area than $A$ — specifically, how the minimum required fencing would change. (c) Explain why `math.opt.unconstrained-optimization`'s own method (setting $\nabla f=0$ directly) would NOT work for this problem on its own, without first incorporating the area constraint."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LAGRANGE-CONDITION-ASSUMED-UNRELATED-TO-UNCONSTRAINED | Believing the constrained optimality condition $\nabla f=\lambda\nabla g$ is completely unrelated to `math.opt.unconstrained-optimization`'s own $\nabla f=0$ condition, missing the direct generalization relationship | Foundational |
| MC-2 | PARALLEL-GRADIENT-CONDITION-ASSUMED-ARBITRARY | Believing the parallel-gradient condition is an arbitrary algebraic recipe with no deeper geometric meaning, missing its direct tangency interpretation | High |
| MC-3 | LAMBDA-ASSUMED-DISPOSABLE | Believing the solved value of $\lambda$ is a disposable intermediate algebraic quantity, missing its genuine shadow-price interpretation | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Lagrange Condition Assumed Unrelated to Unconstrained") → P41 (detect: ask whether the constrained condition is related to the unconstrained one) → P64 (conceptual shift: re-walk Example 1's degenerate-constraint reduction).
- **B02 (targets MC-2)**: P27 (name it: "Parallel Gradient Condition Assumed Arbitrary") → P41 (detect: ask whether the condition has geometric meaning) → P64 (conceptual shift: re-walk Example 2's directly verified tangency).
- **B03 (targets MC-3)**: P27 (name it: "Lambda Assumed Disposable") → P41 (detect: ask whether $\lambda$'s value carries further meaning after solving) → P64 (conceptual shift: re-walk Example 3's shadow-price interpretation and prediction).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.partial-derivatives` (the gradient $\nabla f$ this concept's optimality condition is built from) and `math.opt.unconstrained-optimization` (the $\nabla f=0$ condition this concept's own condition directly generalizes).
- **Unlocks**: `math.opt.kkt` (the Karush-Kuhn-Tucker conditions, generalizing this concept's equality-constraint method to INEQUALITY constraints).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 grounding the condition in `math.opt.unconstrained-optimization`'s own already-known special case, LO2 given full geometric-derivation depth with a directly verified tangency, and LO3 demonstrating $\lambda$'s genuine shadow-price interpretation on an applied problem.
- **Division of labor**: `math.opt.unconstrained-optimization` already owns the unconstrained $\nabla f=0$ condition and local/global optimum classification (verified by grep — no constraint or Lagrange-multiplier content there). This concept owns the constrained generalization, its geometric derivation via the tangency argument, and the genuinely useful shadow-price interpretation of $\lambda$ — none of which appear in the prerequisite.
- Example 3's deliberate choice of a genuine applied (cost-minimization) scenario, rather than a purely abstract algebraic problem, was made specifically to give LO3's shadow-price interpretation concrete, relatable meaning — predicting a specific numerical cost change from a specific constraint relaxation, rather than an abstract assertion that $\lambda$ "means something."

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.opt.kkt`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: proficient learner visualizes level-curve tangency before formalizing algebraically) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
