# Teaching Blueprint: Quadratic Function (`math.func.quadratic-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.quadratic-function` |
| name | Quadratic Function |
| domain | Functions |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 10 |
| requires | `math.func.linear-function`, `math.alg.quadratic-equation` |
| unlocks | `math.func.polynomial-function` |
| cross_links | `math.geom.parabola` (unauthored — see Component 7) |
| CPA_entry_stage | C (Concrete) — a projectile's height evaluated at several times, before the general vertex-form theory |
| description (KG) | A degree-2 function f(x) = ax² + bx + c; its graph is a parabola; vertex at (−b/2a, f(−b/2a)); models projectile motion and optimization. |

## Component 1 — Learning Objectives

- LO1: Recognize $f(x)=ax^2+bx+c$ as a FUNCTION (per `math.func.linear-function`'s established function-notation framing, now extended to degree 2) and evaluate it at specific inputs — a distinct emphasis from `math.alg.quadratic-equation`'s exclusive focus on solving $f(x)=0$ for roots.
- LO2: Find the **vertex** $\left(-\frac{b}{2a}, f\left(-\frac{b}{2a}\right)\right)$ directly (reusing `math.alg.completing-the-square`'s vertex-form derivation, now stated as a general formula) and use it to determine the function's maximum or minimum value — a genuinely different question than "where are the roots," which `math.alg.quadratic-equation` already fully covers.
- LO3: Apply quadratic functions to **model real-world optimization and projectile-motion scenarios**, correctly distinguishing "where is the maximum/minimum" (vertex, LO2's question) from "where does the function equal zero" (roots, `math.alg.quadratic-equation`'s question) — directly refuting the misconception that these are the same question or that one automatically answers the other.

## Component 2 — Prerequisite Check

Assumes mastery of `math.func.linear-function` (function notation $f(x)$, evaluation, and the geometric-vs-function-theoretic framing distinction) and `math.alg.quadratic-equation` (the quadratic $ax^2+bx+c=0$, its three solution methods, and the discriminant).

## Component 3 — Core Explanation

**Explicit division of labor with `math.alg.quadratic-equation`**: that concept fully owns finding ROOTS — where $f(x)=0$. This concept's distinct job, paralleling `math.func.linear-function`'s own relationship to `math.geom.line-equation`, is treating $f(x)=ax^2+bx+c$ as a genuine FUNCTION: evaluating it at specific inputs, finding its extreme value (the vertex), and using it to model real-world quantities that change quadratically.

**The vertex formula, reusing completing the square**: from `math.alg.completing-the-square`'s general vertex-form derivation, $ax^2+bx+c = a\left(x+\frac{b}{2a}\right)^2 + \left(c-\frac{b^2}{4a}\right)$ — the vertex is at $x=-\frac{b}{2a}$, with the function VALUE there, $f\left(-\frac{b}{2a}\right)$, giving the $y$-coordinate. This formula is simply that concept's own vertex-form result, restated as a direct plug-in formula: find $x=-b/(2a)$, then EVALUATE $f$ there (a direct application of LO1's function-evaluation skill) to get the full vertex point.

**Modeling: vertex (extreme value) vs. roots (zero-crossings) are different questions**: a quadratic function used to model a real quantity (projectile height over time, profit as a function of price, etc.) can be asked two structurally DIFFERENT questions: "what is the maximum/minimum value, and where does it occur?" (answered by the vertex, THIS concept's contribution) versus "when does the quantity equal zero?" (answered by the roots, `math.alg.quadratic-equation`'s contribution). Both questions are often relevant to the SAME model, but they require different techniques and answer different real-world questions (e.g., a projectile's maximum height vs. when it lands).

## Component 4 — Worked Examples

**Example 1 (LO1 — evaluating the quadratic function directly)**: A ball's height is modeled by $f(t)=-5t^2+20t+2$ (meters, $t$ in seconds). Evaluate $f(1)$: $f(1)=-5(1)+20(1)+2=17$ meters — the ball's height at exactly $t=1$ second, a direct function evaluation, distinct from asking "when is the ball at height $17$" (which would instead require solving $f(t)=17$).

**Example 2 (LO2 — finding the vertex via the formula, reusing completing the square)**: Continuing Example 1's $f(t)=-5t^2+20t+2$: the vertex's $t$-coordinate is $-\frac{b}{2a} = -\frac{20}{2(-5)} = 2$. Evaluating $f(2) = -5(4)+20(2)+2 = -20+40+2=22$. So the vertex is $(2,22)$ — since $a=-5<0$, this is a MAXIMUM: the ball reaches its highest point, $22$ meters, at $t=2$ seconds. This matches exactly what `math.alg.completing-the-square`'s own transfer probe (using this identical function) derived via full completing-the-square — confirming the vertex FORMULA is just that concept's result, packaged for direct use.

**Example 3 (LO3 — vertex vs. roots, two different real-world questions, breaking MC-1)**: Continuing the same $f(t)=-5t^2+20t+2$: Example 2 answered "what's the MAXIMUM height, and when?" ($22$ m at $t=2$ s — the vertex). A DIFFERENT question: "when does the ball hit the ground (height $=0$)?" requires solving $-5t^2+20t+2=0$ via the quadratic formula (`math.alg.quadratic-equation`'s own method): $t = \frac{-20\pm\sqrt{400-4(-5)(2)}}{2(-5)} = \frac{-20\pm\sqrt{440}}{-10}$, giving $t\approx-0.1$ (rejected, negative time) or $t\approx4.1$ seconds. These are TWO GENUINELY DIFFERENT numeric answers ($t=2$ for the maximum vs. $t\approx4.1$ for landing) to two different questions about the identical function — proving that finding the vertex and finding the roots are separate tasks, neither one substituting for the other.

## Component 5 — Teaching Actions

### Teaching Action A01 — Quadratic Functions as Functions: Evaluation First (Primitive P11: Representation Shift)

State: "before asking where this hits zero, ask the more basic question: what output does a specific input give?" Work Example 1's direct evaluation.

### Teaching Action A02 — The Vertex Formula, Directly From Completing the Square (Primitive P11: Representation Shift)

State: "you already derived vertex form in `math.alg.completing-the-square` — this is that SAME result, packaged as a direct formula: find $x=-b/2a$, then evaluate $f$ there." Work Example 2's direct computation, explicitly citing the match with that concept's own transfer probe.

### Teaching Action A03 — Vertex and Roots Answer Different Questions (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: the SAME function's vertex ($t=2$, max height) and its roots ($t\approx4.1$, landing time) are different numbers answering different real-world questions. State: "don't assume finding one gives you the other — a projectile's peak height and its landing time are genuinely different moments, requiring different techniques (vertex formula vs. quadratic formula) to find."

- **MC-1 hook**: ask "if you've found a quadratic function's vertex, have you also found where it crosses zero (its roots)?" — a "yes" answer reveals MC-1 (confusing the vertex with the roots, or assuming one calculation answers both questions).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f(x)=2x^2-8x+3$, evaluate $f(0)$, $f(2)$, and $f(5)$.
  2. Find the vertex of $f(x)=2x^2-8x+3$ using the formula, and state whether it's a maximum or minimum.
  3. A company's profit is modeled by $P(x)=-3x^2+120x-500$ (x = units sold, hundreds). Find the vertex, and state the maximum profit and at what production level it occurs.
  4. For the SAME profit function in problem 3, explain what finding the ROOTS of $P(x)=0$ would tell the company, and why this is a different question from finding the vertex.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.geom.parabola` is not yet authored; a future revision may add a genuine cross-link probe into the parabola's geometric properties — focus, directrix — once that entry exists)**: "An architect designs a parabolic archway modeled by the height function $h(x) = -0.5x^2+4x$ (meters, $x$ = horizontal distance from the left base). (a) Evaluate $h(2)$ and explain what this tells the architect about the archway's shape at that specific horizontal position. (b) Find the vertex of $h(x)$, and explain what this tells the architect about the archway's maximum height and where it occurs. (c) Find where $h(x)=0$ (the roots), and explain what these two values represent physically for the archway — are they the same information as the vertex, or something different?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | VERTEX-AND-ROOTS-CONFLATED | Believing finding a quadratic function's vertex also tells you its roots (or vice versa), rather than recognizing these as separate questions requiring separate techniques | Foundational |
| MC-2 | VERTEX-FORMULA-X-COORDINATE-MISTAKEN-FOR-THE-FULL-VERTEX | Computing only $-b/2a$ (the vertex's $x$-coordinate) and stopping there, forgetting to evaluate $f$ at that point to get the full vertex $(h,k)$ | Foundational |
| MC-3 | QUADRATIC-FUNCTION-EVALUATION-CONFUSED-WITH-SOLVING | Confusing evaluating $f(x)$ at a given input with solving $f(x)=\text{(some value)}$ for $x$, using the wrong direction of the input-output relationship | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Vertex-Roots Conflation") → P41 (detect: ask a student whether finding the vertex of a quadratic model also tells them where it crosses zero) → P64 (conceptual shift: re-walk Example 3's direct numeric contrast — vertex at $t=2$, roots near $t\approx4.1$ — genuinely different numbers for genuinely different questions).
- **B02 (targets MC-2)**: P27 (name it: "Vertex X-Coordinate Mistaken for Full Vertex") → P41 (detect: ask a student to find the vertex and check whether they stop after computing $-b/2a$, without evaluating $f$ there) → P64 (conceptual shift: re-walk Example 2's full two-step process, re-anchoring on "the vertex is a POINT — you need both coordinates, and the second one requires evaluating $f$").
- **B03 (targets MC-3)**: P27 (name it: "Function-Evaluation-vs-Solving Confusion") → P41 (detect: ask a student to find $f(3)$ for a given quadratic and check whether they instead attempt to solve $f(x)=3$) → P64 (conceptual shift: re-anchor on "evaluating means: input given, find the output; solving means: output given, find the input — these are opposite directions").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.func.linear-function` (the function-notation evaluation framework this concept extends to degree 2), `math.alg.quadratic-equation` (the root-finding methods this concept explicitly distinguishes its own vertex-focused content from).
- **Unlocks**: `math.func.polynomial-function` (the next function family, generalizing beyond degree 2).
- **Cross-link**: KG lists `math.geom.parabola` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.geom.parabola.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into the parabola's geometric properties (focus, directrix) once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 10 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (function evaluation), A02 (the vertex formula, reusing completing the square), and A03 (vertex vs. roots as distinct questions) each target a distinct LO, appropriate for a concept synthesizing two substantial prerequisites (linear-function framing, quadratic-equation's root machinery) into function-notation treatment of degree-2 functions.
- **Explicit division of labor with `math.alg.quadratic-equation`** (stated directly in Component 3), directly paralleling the established `math.func.linear-function`/`math.geom.line-equation` pattern: that concept owns root-finding; this concept owns function evaluation, the vertex/extremum, and real-world optimization/projectile-motion modeling.
- Examples 1-3 deliberately use the SAME projectile function throughout ($f(t)=-5t^2+20t+2$), and Example 2 explicitly cites that this is the identical function `math.alg.completing-the-square`'s own transfer probe used — reinforcing that this concept's vertex formula is not new content but a direct packaging of that concept's already-derived result.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.geom.parabola not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a projectile's height evaluated at several times before the general theory) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
