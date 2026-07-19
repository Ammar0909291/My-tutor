# Teaching Blueprint: Linear Function (`math.func.linear-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.linear-function` |
| name | Linear Function |
| domain | Functions |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.func.function-concept`, `math.geom.slope` |
| unlocks | `math.func.quadratic-function` |
| cross_links | `math.geom.line-equation` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | C (Concrete) — a real-world constant-rate scenario (a taxi fare) evaluated at several input values, before the general function notation |
| description (KG) | A function of the form f(x) = mx + b; its graph is a straight line with slope m and y-intercept b. |

## Component 1 — Learning Objectives

- LO1: Recognize a **linear function** $f(x)=mx+b$ specifically as a FUNCTION — a rule assigning exactly one output to each input $x$ (`math.func.function-concept`'s own framework) — and evaluate $f(x)$ for specific input values, distinguishing this function-notation view from `math.geom.line-equation`'s purely geometric treatment of the same object as "a line in the plane."
- LO2: Interpret the slope $m$ as the function's **constant rate of change**: for ANY two inputs, $\frac{f(x_2)-f(x_1)}{x_2-x_1}=m$ always, regardless of which two inputs are chosen — directly refuting the misconception that the rate of change of a linear function might vary depending on which part of the domain you examine.
- LO3: Translate fluently between `math.geom.line-equation`'s three geometric forms (slope-intercept, point-slope, standard) and this concept's function notation $f(x)=mx+b$, recognizing these as the SAME mathematical object viewed through two different lenses — geometric (a line in the plane) versus function-theoretic (an input-output rule) — rather than two unrelated topics.

## Component 2 — Prerequisite Check

Assumes mastery of `math.func.function-concept` (a function as a rule assigning each domain element exactly one codomain element) and `math.geom.slope` (the slope $m=\frac{y_2-y_1}{x_2-x_1}$ between two points).

## Component 3 — Core Explanation

**A linear function as a function specifically**: $f(x)=mx+b$ is, first and foremost, a FUNCTION in the sense of `math.func.function-concept` — a rule that takes any input $x$ (from its domain, all real numbers here) and produces exactly one output $f(x)$. This is a genuinely different framing than `math.geom.line-equation`'s treatment of $y=mx+b$ as "the equation of a geometric line" — both describe the same underlying object, but the function view emphasizes EVALUATION (plug in an $x$, get an output) and input-output behavior, while the geometric view emphasizes the line's position and shape in the plane.

**The slope as a constant rate of change**: for a linear function, the slope $m$ is not merely "the steepness of the line" (the geometric framing) but equivalently the function's constant RATE OF CHANGE: for ANY two inputs $x_1,x_2$ (not just specific ones), $\frac{f(x_2)-f(x_1)}{x_2-x_1} = \frac{(mx_2+b)-(mx_1+b)}{x_2-x_1} = \frac{m(x_2-x_1)}{x_2-x_1}=m$ — the SAME value $m$ no matter which two inputs are chosen. This constancy is the defining feature of linearity: equal changes in input ALWAYS produce the same proportional change in output ($\Delta f = m\cdot\Delta x$), everywhere in the domain.

**Translating between geometric forms and function notation**: `math.geom.line-equation`'s slope-intercept form ($y=mx+b$), point-slope form ($y-y_1=m(x-x_1)$), and standard form ($ax+by=c$) all describe the identical line — and whenever $y$ can be isolated as a function of $x$ (i.e. the line is not vertical), that isolated form IS exactly $f(x)=mx+b$ in function notation. Converting from any of the three geometric forms to function notation is simply solving for $y$ (renaming it $f(x)$); converting the other direction is equally direct.

## Component 4 — Worked Examples

**Example 1 (LO1 — evaluating as a function, not just graphing)**: A taxi charges a flat $\$3$ fee plus $\$2$ per mile: $f(x)=2x+3$ (where $x$ is miles traveled). Evaluate $f(5)$: $f(5)=2(5)+3=13$ — the fare for a 5-mile ride is $\$13$. This is a direct FUNCTION EVALUATION (input $5$, output $13$), a different kind of question than "graph this line" — it's asking "what specific output does this specific input produce," exactly the function-notation use `math.geom.line-equation` never addresses.

**Example 2 (LO2 — verifying the constant rate of change from ANY two points)**: For the same $f(x)=2x+3$, compute the rate of change between $x=1$ and $x=4$: $\frac{f(4)-f(1)}{4-1} = \frac{11-5}{3}=2$. Now compute it between $x=10$ and $x=100$ (very different inputs): $\frac{f(100)-f(10)}{100-10} = \frac{203-23}{90} = \frac{180}{90}=2$ — the IDENTICAL rate of change, $2$ (matching the slope $m=2$ directly), regardless of which two input values were chosen. This confirms the rate of change is a fixed property of the function itself, not something that depends on where in the domain you happen to look.

**Example 3 (LO3 — converting between geometric forms and function notation, breaking MC-1)**: `math.geom.line-equation`'s own Example 1 found the point-slope form $y-5=3(x-1)$ for the line through $(1,5)$ and $(3,11)$, converting it to slope-intercept form $y=3x+2$. In THIS concept's function notation, this is simply $f(x)=3x+2$ — evaluate $f(1)=3(1)+2=5$ and $f(3)=3(3)+2=11$, confirming both original points are recovered as function evaluations. A student who treated "the equation of a line" and "a linear function" as two unrelated topics might not recognize that solving `math.geom.line-equation`'s standard form $2x-3y=12$ for $y$ (giving $y=\frac{2x-12}{-3}=\frac{2}{3}x-4$, matching that concept's own Example 3) is EXACTLY the same operation as writing that same line as the function $f(x)=\frac23x-4$ — the geometric manipulation and the function-notation conversion are the identical algebra.

## Component 5 — Teaching Actions

### Teaching Action A01 — Linear Functions as Genuine Functions: Evaluation, Not Just Graphing (Primitive P11: Representation Shift)

State: "before this was ever 'a line to graph,' it's a FUNCTION — a rule taking an input and producing an output." Work Example 1's taxi-fare evaluation directly, emphasizing the input-output framing.

### Teaching Action A02 — The Rate of Change Is Constant Everywhere (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: computing the rate of change between two very different pairs of inputs ($1,4$ and $10,100$) and getting the SAME value both times. State: "this is the whole point of 'linear' — the rate of change never varies, no matter which part of the domain you check."

### Teaching Action A03 — Function Notation and Geometric Forms Are the Same Object (Primitive P06: Contrast Pair)

Work Example 3's direct connection to `math.geom.line-equation`'s own worked examples, showing the point-slope-to-slope-intercept conversion IS the same algebra as writing the function $f(x)=mx+b$. State: "you already know how to convert between the three geometric forms — writing the result as $f(x)=\ldots$ instead of $y=\ldots$ isn't new algebra, just a different name for the output."

- **MC-1 hook**: ask "are 'the equation of a line' and 'a linear function' two genuinely different mathematical topics requiring separate techniques?" — a "yes" answer reveals MC-1 (treating the geometric and function-theoretic framings as unrelated, missing that converting between them is the identical algebra already mastered).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f(x)=-4x+7$, evaluate $f(0)$, $f(2)$, and $f(-3)$.
  2. Verify that the rate of change of $f(x)=-4x+7$ is the same between $x=0,x=2$ as it is between $x=2,x=-3$.
  3. Convert the standard-form line equation $3x+2y=8$ into function notation $f(x)=mx+b$, showing your algebra.
  4. A gym charges a $\$20$ signup fee plus $\$5$ per class attended. Write this as a function $f(x)$ (x = number of classes), and use it to find the total cost for someone who attends 8 classes.
- **P76 (Transfer Probe, mode = cross-link probe against `math.geom.line-equation`)**: "Recall from your `math.geom.line-equation` lesson that a line through $(4,-1)$ with slope $-2$ has point-slope form $y+1=-2(x-4)$, converting to slope-intercept form $y=-2x+7$. (a) Write this same line as a function $f(x)$ in function notation, and evaluate $f(4)$ to confirm it matches the original point $(4,-1)$'s $y$-coordinate. (b) Using THIS lesson's constant-rate-of-change framing, verify that $\frac{f(10)-f(4)}{10-4}$ equals the slope $-2$ directly, without needing to re-derive the line's equation. (c) Explain, in your own words, why every technique you already know for manipulating equations of lines (point-slope, standard form, converting between them) applies without modification once you start writing the line as a function $f(x)$ instead of as an equation in $y$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LINEAR-FUNCTIONS-AND-LINE-EQUATIONS-TREATED-AS-UNRELATED | Believing "the equation of a line" (geometric framing) and "a linear function" (function-theoretic framing) are separate topics requiring independent techniques, rather than recognizing them as the same object viewed two ways | Foundational |
| MC-2 | RATE-OF-CHANGE-ASSUMED-TO-VARY-ACROSS-THE-DOMAIN | Believing a linear function's rate of change might differ depending on which part of the domain is examined, rather than recognizing it as constant everywhere | Foundational |
| MC-3 | FUNCTION-EVALUATION-CONFUSED-WITH-SOLVING-FOR-X | Confusing evaluating $f(x)$ at a given input (compute the output) with solving $f(x)=0$ or a similar equation (find the input producing a given output) — using the wrong direction of the input-output relationship | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Linear-Functions-Line-Equations Unrelated-Topics Assumption") → P41 (detect: ask a student whether converting a line's standard form to function notation requires a fundamentally different technique from converting it to slope-intercept form) → P64 (conceptual shift: re-walk Example 3's direct demonstration that the algebra is identical, re-anchoring on "solving for $y$ and writing $f(x)$ instead of $y$ are the same step").
- **B02 (targets MC-2)**: P27 (name it: "Rate-of-Change Variability Assumption") → P41 (detect: ask a student to compute the rate of change between two DIFFERENT pairs of inputs for the same linear function and check whether they expect different answers) → P64 (conceptual shift: re-walk Example 2's direct verification across two very different input pairs, both giving the identical rate of change).
- **B03 (targets MC-3)**: P27 (name it: "Function-Evaluation-vs-Solving-for-x Confusion") → P41 (detect: ask a student to find $f(3)$ for a given function and check whether they instead attempt to solve $f(x)=3$) → P64 (conceptual shift: re-anchor on "evaluating $f(3)$ means: input is $3$, find the OUTPUT. Solving $f(x)=3$ means: output is $3$, find the INPUT — these are opposite directions of the same rule").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.func.function-concept` (the input-output rule framework this concept applies specifically to $f(x)=mx+b$), `math.geom.slope` (the slope $m$ this concept reinterprets as a constant rate of change).
- **Unlocks**: `math.func.quadratic-function` (the next function family, building on the same function-notation framework established here).
- **Cross-link**: KG lists `math.geom.line-equation` as a cross-link — **verified authored** via `ls docs/curriculum/blueprints/math.geom.line-equation.md` — so P76_mode = **cross-link probe**, directly reusing that blueprint's own worked examples (the point-slope-to-slope-intercept conversion, the standard-form conversion) as the transfer probe's anchor, per this corpus's established cross-link-probe convention.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/apply tag places this at a "3 TAs + cross-link-probe gate" tier — A01 (function evaluation), A02 (constant rate of change), and A03 (geometric forms and function notation as the same object) each target a distinct LO, appropriate for a concept whose primary contribution is re-framing an already-familiar geometric object (the line) through the function lens.
- This blueprint deliberately treats `math.geom.line-equation` and this concept as two DELIBERATELY DIFFERENT lenses on the identical mathematical object (a direct parallel structure, not a duplication) — that concept owns the geometric forms and their interconversion; this concept owns function-notation evaluation, rate-of-change interpretation, and real-world modeling via $f(x)$ notation, explicitly connecting back to (not re-deriving) that concept's own algebra.
- Example 3 and the cross-link probe deliberately reuse `math.geom.line-equation`'s own specific worked examples (the $(1,5)$-$(3,11)$ line, the standard-form conversion) verbatim, maximizing the transfer signal that this concept's function-notation view is a direct re-framing of already-mastered material, not new content to learn from scratch.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.geom.line-equation authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.geom.line-equation) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a real-world constant-rate scenario evaluated at several inputs before general notation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
