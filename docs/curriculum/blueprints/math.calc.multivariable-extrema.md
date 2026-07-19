# Teaching Blueprint: Multivariable Extrema (`math.calc.multivariable-extrema`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.multivariable-extrema` |
| name | Multivariable Extrema |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.gradient`, `math.calc.higher-order-derivatives` |
| unlocks | `math.opt.lagrange-multipliers` |
| cross_links | `math.opt.lagrange-multipliers` |
| CPA_entry_stage | C (Concrete) — computing the Hessian discriminant for a specific critical point before the general classification rule | 
| description (KG) | Critical points where ∇f = 0; classified via the Hessian matrix: D > 0 and fₓₓ > 0 → local min, D > 0 and fₓₓ < 0 → local max, D < 0 → saddle point. |

## Component 1 — Learning Objectives

- LO1: Find critical points via $\nabla f=0$ and compute the Hessian discriminant $D=f_{xx}f_{yy}-f_{xy}^2$, correctly computing the mixed partial $f_{xy}$ using `math.calc.higher-order-derivatives`'s own procedure and Clairaut's theorem ($f_{xy}=f_{yx}$) to verify it.
- LO2: Recognize that when $D=0$, the discriminant test is genuinely **INCONCLUSIVE** — it neither confirms nor denies a local extremum — and that direct examination of the function near the critical point (not a variant reading of the test) is required in that case.
- LO3: Correctly classify a critical point using the FULL 2-variable behavior, not a single 1D cross-sectional slice — recognizing that a critical point can look like a minimum along one direction and a maximum along another (a saddle), and that only the complete discriminant test correctly distinguishes this from a genuine local extremum.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.gradient` ($\nabla f=(\partial f/\partial x,\partial f/\partial y)$) and `math.calc.higher-order-derivatives` (computing $f''$ by differentiating $f'$ again, never by squaring; second-order partials $f_{xx},f_{yy},f_{xy}$; Clairaut's theorem $f_{xy}=f_{yx}$ for continuous mixed partials).

## Component 3 — Core Explanation

**Division of labor with `math.opt.unconstrained-optimization`**: that concept already establishes the general stationary-point condition $\nabla f=0$ (a system of equations) and the Hessian discriminant test $D=f_{xx}f_{yy}-f_{xy}^2$, from an optimization-motivated perspective (why we search for minima, the local-vs-global caveat). This concept owns the DIRECT calculus classification skill from a geometric perspective, including the discriminant's own limiting case ($D=0$, inconclusive) and the "single-slice is not enough" caution — genuinely distinguishing content that concept's own worked examples did not cover.

**Computing D carefully, using Clairaut's theorem**: at a critical point where $\nabla f=0$, computing $D=f_{xx}f_{yy}-f_{xy}^2$ requires the mixed partial $f_{xy}$, found using `math.calc.higher-order-derivatives`'s own differentiate-twice procedure — and Clairaut's theorem guarantees $f_{xy}=f_{yx}$ (for continuous mixed partials), giving a direct consistency check on the computation.

**$D=0$ is genuinely inconclusive — not weak evidence either way**: when $D=0$ exactly, the second-derivative test provides NO information about the critical point's classification at all — it is not "weak evidence for a min" or "borderline" — the test simply fails to apply, and the function must be examined directly near the point (e.g. checking its actual values nearby) to determine the true classification.

**A saddle can look like a minimum (or maximum) along one direction alone**: examining a critical point only along ONE cross-sectional slice (fixing one variable, varying the other) can be deeply misleading — a saddle point can appear to be a clean local minimum along one direction while appearing to be a clean local maximum along a different direction. Only the FULL discriminant test, using both diagonal second partials AND the mixed partial together, correctly captures the true 2D behavior.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing D via Clairaut-verified mixed partials)**: For $f(x,y)=x^3-3xy+y^3$: $\nabla f=(3x^2-3y,\,-3x+3y^2)=0$ gives $y=x^2$ and $x=y^2$; substituting, $x=x^4\Rightarrow x(x^3-1)=0\Rightarrow x=0$ or $x=1$, giving critical points $(0,0)$ and $(1,1)$. Hessian entries: $f_{xx}=6x$, $f_{yy}=6y$, $f_{xy}=-3$ (verify $f_{yx}=-3$ too, matching Clairaut's theorem exactly). At $(1,1)$: $f_{xx}=6,f_{yy}=6,f_{xy}=-3$; $D=(6)(6)-(-3)^2=36-9=27>0$, and $f_{xx}=6>0$ — **local minimum** at $(1,1)$.

**Example 2 (LO2 — the D=0 inconclusive case, breaking MC-1)**: For $f(x,y)=x^4+y^4$: $\nabla f=(4x^3,4y^3)=0$ at $(0,0)$. $f_{xx}=12x^2$, $f_{yy}=12y^2$, $f_{xy}=0$. At $(0,0)$: $f_{xx}=0,f_{yy}=0,f_{xy}=0$, so $D=(0)(0)-0^2=0$ — the discriminant test gives NO information. But examining $f$ directly: $f(x,y)=x^4+y^4\ge0$ everywhere, with $f(0,0)=0$ — so $(0,0)$ is CLEARLY a genuine (global, hence local) minimum, a fact the discriminant test itself was completely unable to establish.

**Example 3 (LO3 — a saddle looks like a min or max along different single slices, breaking MC-3)**: For $g(x,y)=x^2-y^2$ (`math.opt.unconstrained-optimization`'s own saddle example) at $(0,0)$: along the slice $y=0$, $g(x,0)=x^2$ — looks like a genuine local MINIMUM in $x$ alone. Along the slice $x=0$, $g(0,y)=-y^2$ — looks like a genuine local MAXIMUM in $y$ alone. The full discriminant test: $f_{xx}=2,f_{yy}=-2,f_{xy}=0$, $D=(2)(-2)-0^2=-4<0$ — correctly identifies this as a **SADDLE POINT**, neither a min nor a max, exactly demonstrating why checking only one directional slice can be deeply misleading.

## Component 5 — Teaching Actions

### Teaching Action A01 — Computing D With Clairaut's Theorem as a Check (Primitive P11: Representation Shift)

State: "the mixed partial $f_{xy}$ is computed by differentiating twice, in either order — Clairaut's theorem guarantees $f_{xy}=f_{yx}$, giving you a direct way to double-check your computation." Work Example 1's full critical-point and discriminant computation.

### Teaching Action A02 — D=0 Means the Test Gives No Information (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $D=0$ at $(0,0)$ for $f(x,y)=x^4+y^4$, yet direct examination proves $(0,0)$ is genuinely a minimum. State: "when $D=0$ exactly, the test isn't weak evidence one way or the other — it simply doesn't apply, and you have to look at the function directly."

- **MC-1 hook**: ask "does the Hessian discriminant test always give a definitive classification, for any critical point?" — a "yes" answer reveals MC-1 (missing the genuinely inconclusive $D=0$ case).

### Teaching Action A03 — One Slice Can Be Misleading; the Full Test Isn't (Primitive P06: Contrast Pair)

Contrast Example 3's two single-directional slices (looking like a min along $y=0$, a max along $x=0$) against the full discriminant test's correct saddle classification. State: "checking only one direction can show you a clean parabola opening up OR down — but the true 2D shape needs the FULL test, using both diagonal partials and the mixed partial together."

- **MC-2 hook**: ask "is it enough to check only f_xx (one diagonal Hessian entry) to classify a critical point?" — a "yes" answer reveals MC-2 (missing that the mixed partial $f_{xy}$ and the full discriminant $D$ must be computed).
- **MC-3 hook**: ask "if a critical point looks like a minimum when I fix y and vary only x, is it necessarily a genuine local minimum of the full function?" — a "yes" answer reveals MC-3 (missing that a saddle can look like an extremum along one slice while genuinely being neither).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find all critical points of $f(x,y)=x^2+y^2-2x+4y+5$ and classify each using the discriminant test.
  2. For $f(x,y)=x^4-y^4$, compute the discriminant at $(0,0)$ and state whether the test is conclusive.
  3. For $f(x,y)=y^2-x^2$, check the slices $y=0$ and $x=0$ separately, then classify the critical point at $(0,0)$ using the full discriminant test.
  4. Explain why "D=0" should never be interpreted as weak or partial evidence for a local minimum or maximum.
- **P76 (Transfer Probe, mode = independence)**: "An engineer models the stress on a metal plate as a function $f(x,y)$ of position, and wants to find all local stress minima and maxima. (a) Explain the two-step process (finding critical points, then classifying each) the engineer should follow. (b) At one critical point, the engineer computes $D=0$ exactly — explain why the engineer cannot conclude anything about this point from the discriminant test alone, and what they should do instead. (c) At another critical point, the engineer notices the stress appears to decrease in the x-direction but increase in the y-direction, right at that point. Using this lesson's saddle-point example, explain what kind of critical point this likely is, and why checking only the x-direction or only the y-direction would have been misleading."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | D-EQUALS-ZERO-ASSUMED-CONCLUSIVE | Believing the Hessian discriminant test always gives a definitive classification, missing that D=0 is genuinely inconclusive and requires direct examination of the function | Foundational |
| MC-2 | SINGLE-HESSIAN-ENTRY-CHECKED-ALONE | Believing checking only one diagonal Hessian entry (like f_xx) suffices to classify a critical point, missing that the mixed partial and the full discriminant D must be computed | Foundational |
| MC-3 | SINGLE-DIRECTIONAL-SLICE-ASSUMED-SUFFICIENT | Believing a critical point that looks like an extremum along one directional slice must be a genuine local extremum of the full function, missing that a saddle can look like a min or max along different single directions | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "D-Equals-Zero Assumed Conclusive") → P41 (detect: ask a student what a discriminant of exactly 0 tells them about a critical point, and check for a definitive answer) → P64 (conceptual shift: re-walk Example 2's $x^4+y^4$ case, showing $D=0$ gives no information while direct inspection proves it's a genuine minimum, re-anchoring on "D=0 means the test doesn't apply — not that it's borderline").
- **B02 (targets MC-2)**: P27 (name it: "Single Hessian Entry Checked Alone") → P41 (detect: ask a student to classify a critical point using only $f_{xx}$'s sign, and check whether they skip computing $f_{xy}$ and $D$) → P64 (conceptual shift: re-walk Example 1's full discriminant computation, re-anchoring on "always compute the full $D=f_{xx}f_{yy}-f_{xy}^2$ — never judge from one entry alone").
- **B03 (targets MC-3)**: P27 (name it: "Single Directional Slice Assumed Sufficient") → P41 (detect: ask a student to classify a critical point using only one directional slice, and check whether they generalize to the full function without further checking) → P64 (conceptual shift: re-walk Example 3's contrasting slices for the saddle point, re-anchoring on "one slice can show a clean parabola shape in either direction — only the full discriminant test reveals the true 2D behavior").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.gradient` ($\nabla f$, this concept's stationary-point condition), `math.calc.higher-order-derivatives` (the second-order partials and Clairaut's theorem this concept's discriminant is built from).
- **Unlocks**: `math.opt.lagrange-multipliers` (extends unconstrained extrema classification to constrained optimization problems).
- **Cross-link (P76_mode = independence)**: KG lists `math.opt.lagrange-multipliers` as a cross-link — not yet authored (checked via `ls docs/curriculum/blueprints/`).
- **Division-of-labor note**: `math.opt.unconstrained-optimization` (already authored, batch 100) owns the optimization-motivated framing of the identical $\nabla f=0$/Hessian-discriminant machinery (why we search for minima, the local-vs-global caveat, the connection to gradient descent). This concept owns the direct calculus classification skill, specifically covering the $D=0$ inconclusive case and the single-slice caution — content that concept's own worked examples did not cover, avoiding duplication while both concepts remain individually complete.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an advanced/apply tag places this at a "3 TAs + gate" tier — A01 (careful discriminant computation with Clairaut verification), A02 (the D=0 inconclusive case), and A03 (the single-slice caution) each target a distinct LO, deliberately chosen to complement rather than duplicate `math.opt.unconstrained-optimization`'s own already-authored content on the same underlying mathematical machinery.
- Example 3 deliberately reuses `math.opt.unconstrained-optimization`'s own saddle-point example ($x^2-y^2$) specifically to demonstrate a NEW angle on already-familiar material (the single-slice caution) rather than re-deriving the saddle classification from scratch.
- Example 2's $f(x,y)=x^4+y^4$ was chosen as the standard textbook illustration of the discriminant test's genuine limitation (a case where direct inspection trivially settles what the algebraic test cannot), giving MC-1 a concrete, verifiable counterexample rather than an assertion.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.opt.lagrange-multipliers unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific discriminant computed before the general rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
