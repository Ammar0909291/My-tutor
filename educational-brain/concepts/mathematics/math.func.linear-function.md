# math.func.linear-function — Linear Function (Function-Notation Evaluation, Constant Rate of Change, Geometric Forms as the Same Object)

## Identity
- **KG ID:** `math.func.linear-function`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`, `math.geom.slope`
- **Unlocks:** `math.func.quadratic-function`
- **Cross-links:** `math.geom.line-equation` (confirmed authored — cross-link probe mode, see Blueprint References)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.9 (MAMR 5/5)
- **Estimated hours:** 6

## Learning Objective
By the end of this concept, the student can: (1) recognize $f(x)=mx+b$ as a FUNCTION in `math.func.function-concept`'s sense — a rule assigning exactly one output to each input $x$ — and evaluate $f(x)$ for specific inputs, distinguishing this function-notation view from `math.geom.line-equation`'s purely geometric treatment of the same object as "a line in the plane"; (2) interpret the slope $m$ as the function's constant rate of change, verifying that $\frac{f(x_2)-f(x_1)}{x_2-x_1}=m$ for ANY two inputs, never varying across the domain; (3) fluently translate between `math.geom.line-equation`'s three geometric forms and function notation $f(x)=mx+b$, recognizing both as the same mathematical object viewed through two different lenses.

## Core Understanding
`math.func.function-concept` supplies the general input-output framework; `math.geom.slope` supplies the constant $m=\frac{y_2-y_1}{x_2-x_1}$. This concept fuses them: the same object `math.geom.line-equation` treats geometrically is, viewed through the function lens, $f(x)=mx+b$.

A LINEAR FUNCTION IS FIRST A FUNCTION, EVALUATED LIKE ANY OTHER: $f(x)=mx+b$ is, before anything else, a rule taking any input $x$ and producing exactly one output $f(x)$ (per `math.func.function-concept`). This is a genuinely different framing from `math.geom.line-equation`'s treatment of $y=mx+b$ as "the equation of a geometric line" — both describe the identical object, but the function view emphasizes EVALUATION (plug in $x$, get an output), while the geometric view emphasizes position and shape in the plane.

THE SLOPE IS A CONSTANT RATE OF CHANGE, EVERYWHERE: for a linear function, $m$ is not merely "steepness" but equivalently the constant rate of change: for ANY two inputs $x_1,x_2$, $\frac{f(x_2)-f(x_1)}{x_2-x_1}=\frac{m(x_2-x_1)}{x_2-x_1}=m$ — the SAME value, no matter which pair of inputs is chosen. This constancy is the defining feature of linearity: equal changes in input always produce the same proportional change in output, everywhere in the domain, not just near where you happen to check.

FUNCTION NOTATION AND GEOMETRIC FORMS ARE THE IDENTICAL OBJECT: `math.geom.line-equation`'s slope-intercept, point-slope, and standard forms all describe the same line, and whenever $y$ can be isolated as a function of $x$, that isolated form IS exactly $f(x)=mx+b$. Converting from any geometric form to function notation is simply solving for $y$ and renaming it $f(x)$ — the identical algebra already mastered, not a new technique.

## Mental Models
1. **Rung 1 — before it's a line to graph, it's a function to evaluate: input in, one specific output out.** The function-notation framing asks a genuinely different question than "graph this."
2. **Rung 2 — the rate of change is the same number no matter which two inputs you pick, near or far apart.** Checking it once nearby and once far apart and getting the identical answer is the direct proof of linearity.
3. **Rung 3 — solving for $y$ and writing $f(x)$ instead are the exact same algebraic step, not two different skills.** Every technique already known for line equations applies unchanged once the result is named $f(x)$.

## Why Students Fail
Having learned $y=mx+b$ primarily as "the equation of a line to graph," students can treat function-notation questions ("evaluate $f(5)$") and graphing questions as calling for entirely separate skill sets, missing that $f(x)=mx+b$ is, first and foremost, the same rule-based function object from `math.func.function-concept`, simply evaluated rather than graphed. Having verified a rate of change between one convenient pair of nearby points, students can implicitly assume the rate might behave differently somewhere else in the domain (perhaps because non-linear functions DO behave this way), missing that constancy EVERYWHERE — not just locally — is the defining feature of linearity itself, provable directly from the algebra. Finally, having studied `math.geom.line-equation`'s three forms as their own separate unit, students can treat "the equation of a line" and "a linear function" as two unrelated topics requiring independent techniques, missing that converting between the geometric forms and writing $f(x)=mx+b$ is the identical algebraic operation — solving for $y$ — under two different names.

## Misconceptions

### MC-1: LINEAR-FUNCTIONS-AND-LINE-EQUATIONS-TREATED-AS-UNRELATED
- **Birth type:** Type 3 (language contamination) — Blueprint designates this "Foundational," independently confirmed
- **Description:** Believing "the equation of a line" (geometric framing) and "a linear function" (function-theoretic framing) are separate topics requiring independent techniques, rather than the same object viewed two ways.
- **Why this birth type:** Language contamination: the two framings are typically taught in separate units with separate vocabulary ("line equation" versus "function"), so the surface-level naming difference is mistaken for a genuine conceptual difference, even though the underlying algebra is identical.
- **Detection probe:** "Are 'the equation of a line' and 'a linear function' two genuinely different mathematical topics requiring separate techniques?" A student with MC-1 answers "yes."
- **Repair:** Take `math.geom.line-equation`'s own point-slope result for the line through $(1,5)$ and $(3,11)$: $y-5=3(x-1)$, converting to $y=3x+2$. In function notation this is simply $f(x)=3x+2$ — evaluating $f(1)=5$ and $f(3)=11$ recovers both original points directly. Solving that same line's standard form $2x-3y=12$ for $y$ gives $y=\frac23x-4$, which is exactly the function $f(x)=\frac23x-4$ — the identical algebra, renamed.
- **Verification of death:** Given a line in any geometric form, the student converts it directly to function notation by solving for $y$ and renaming it $f(x)$, recognizing this as the same algebra already used for form conversion, not a new procedure.

### MC-2: RATE-OF-CHANGE-ASSUMED-TO-VARY-ACROSS-THE-DOMAIN
- **Birth type:** Type 1 (overgeneralization) — Blueprint designates this "Foundational," independently confirmed
- **Description:** Believing a linear function's rate of change might differ depending on which part of the domain is examined, rather than being constant everywhere.
- **Why this birth type:** Overgeneralization from experience with non-linear functions (where the rate of change genuinely DOES vary across the domain, e.g. a parabola steepens) to linear functions, where this variability does not hold, but the pattern is carried over anyway.
- **Detection probe:** "Could the rate of change of $f(x)=2x+3$ be different between $x=1,x=4$ than between $x=10,x=100$?" A student with MC-2 answers "yes, it could be different."
- **Repair:** For $f(x)=2x+3$: between $x=1$ and $x=4$, $\frac{f(4)-f(1)}{4-1}=\frac{11-5}{3}=2$. Between $x=10$ and $x=100$ (very different inputs), $\frac{f(100)-f(10)}{100-10}=\frac{203-23}{90}=2$ — the IDENTICAL value, matching the slope $m=2$ directly. This is not a coincidence of the chosen pairs; it follows algebraically for ANY $x_1,x_2$: $\frac{f(x_2)-f(x_1)}{x_2-x_1}=\frac{m(x_2-x_1)}{x_2-x_1}=m$.
- **Verification of death:** Given a linear function, the student computes the rate of change between two DIFFERENT pairs of inputs (one nearby, one far apart) and confirms both give the identical value, matching the slope.

### MC-3: FUNCTION-EVALUATION-CONFUSED-WITH-SOLVING-FOR-X
- **Birth type:** Type 3 (language contamination) — Blueprint rates this "Moderate," independently confirmed
- **Description:** Confusing evaluating $f(x)$ at a given input (compute the output) with solving $f(x)=0$ or similar (find the input producing a given output) — using the wrong direction of the input-output relationship.
- **Why this birth type:** Language contamination: both operations are phrased using the same symbol "$f(x)$" and similar verbal instructions ("find $f(3)$" versus "solve $f(x)=3$"), so the surface similarity in wording obscures that they run in opposite directions through the function.
- **Detection probe:** "To find $f(3)$ for $f(x)=2x+1$, do you set $2x+1=3$ and solve for $x$?" A student with MC-3 answers "yes."
- **Repair:** Evaluating $f(3)$ means: input is $3$, find the OUTPUT — substitute directly, $f(3)=2(3)+1=7$. Solving $f(x)=3$ means: output is $3$, find the INPUT — set $2x+1=3$ and solve, giving $x=1$. These are opposite directions through the identical rule, and confusing them (e.g. setting $2x+1=3$ when asked for $f(3)$) produces a wrong answer for the wrong question.
- **Verification of death:** Given an instruction to either evaluate $f$ at a specific input or solve $f(x)=$ a specific output, the student correctly identifies which direction is being asked and applies the matching procedure.

## Analogies
1. **The two-lenses-on-one-object analogy (targets MC-1).** The same building can be described by its blueprint (geometric shape, dimensions) or by its function (what happens when you walk in the front door) — two different, equally valid lenses on the identical structure, not two different buildings. Line equations and linear functions are the same relationship.
2. **The fixed-exchange-rate analogy (targets MC-2).** A currency exchange with a genuinely fixed rate converts \$1 to the same number of euros whether you exchange it near the start of the day or the end — the rate never depends on which transaction you happen to check. A linear function's rate of change is the same fixed-everywhere property.
3. **The vending-machine-forward-versus-backward analogy (targets MC-3).** Asking "what snack comes out if I press button 3" (evaluation: input known, find output) is a different question from "which button do I press to get a candy bar" (solving: output known, find input) — even though both involve the same machine, they run in opposite directions.

## Demonstrations
### Demonstration 1 — function evaluation, not just graphing (mirrors Blueprint Example 1)
A taxi charges a flat \$3 fee plus \$2 per mile: $f(x)=2x+3$. Evaluating $f(5)=2(5)+3=13$ — the fare for a 5-mile ride is \$13. This is a direct function evaluation (input 5, output 13), a genuinely different kind of question than "graph this line."

### Demonstration 2 — verifying the constant rate of change from very different pairs (mirrors Blueprint Example 2)
For $f(x)=2x+3$: between $x=1$ and $x=4$, $\frac{f(4)-f(1)}{4-1}=\frac{11-5}{3}=2$. Between $x=10$ and $x=100$: $\frac{f(100)-f(10)}{100-10}=\frac{203-23}{90}=2$ — the identical rate of change, matching the slope $m=2$, regardless of which input pair was chosen.

### Demonstration 3 — converting geometric forms to function notation is the same algebra (mirrors Blueprint Example 3)
`math.geom.line-equation`'s point-slope form for the line through $(1,5)$ and $(3,11)$, $y-5=3(x-1)$, converts to $y=3x+2$ — in function notation, $f(x)=3x+2$; evaluating $f(1)=5$ and $f(3)=11$ recovers both original points. That concept's standard form $2x-3y=12$, solved for $y$, gives $y=\frac23x-4$ — exactly the function $f(x)=\frac23x-4$: the identical operation, renamed.

## Discovery Questions
1. "If asked to evaluate $f(5)$ for $f(x)=2x+3$, is this the same kind of task as 'graph this line'? What specifically is being asked?"
2. "Could the rate of change of a linear function be different between two nearby inputs than between two far-apart inputs? Test it directly with two very different pairs."
3. "Are converting a line's standard form to slope-intercept form, and converting it to function notation $f(x)=mx+b$, genuinely different techniques — or the same algebra?"

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — a real-world constant-rate scenario (a taxi fare) evaluated at several input values, before the general function notation and rate-of-change proof**, matching the Blueprint's own CPA justification.
1. Work Demonstration 1's taxi-fare evaluation, posing Discovery Question 1 before confirming function evaluation is a distinct kind of task from graphing.
2. Work Demonstration 2's rate-of-change verification across two very different input pairs, posing Discovery Question 2 before confirming the constancy is algebraic, not coincidental.
3. Work Demonstration 3's direct reuse of `math.geom.line-equation`'s own worked examples, posing Discovery Question 3 before confirming the conversion is the identical algebra.
4. Assess with the P77 problem set and the cross-link transfer probe (P76, cross-link probe against `math.geom.line-equation`).

## Tutor Actions
1. **On any function-evaluation task:** require the student to substitute the specific input directly and compute a specific output, distinguishing this from graphing the line.
2. **On any rate-of-change claim:** require verification across at least two genuinely different pairs of inputs, confirming the identical value both times.
3. **On any evaluate-versus-solve task:** require the student to state explicitly which direction is being asked (input known, find output; or output known, find input) before proceeding.

## Voice Teaching Notes
1. **Register:** proficient/apply — this concept assumes fluency with both the general function concept and slope, and applies both concretely.
2. **Load-bearing sentence, spoken slowly:** "Solving for $y$ and writing $f(x)$ instead of $y$ — that's the same step, not a new one."
3. **Wait time:** pause after Discovery Question 2, letting the student genuinely compute both rate-of-change pairs before confirming they match.

## Assessment Signals
1. **Gate concept:** correctly evaluates $f(x)$ at specific inputs for a given linear function, distinct from graphing tasks.
2. **Constant-rate fluency:** verifies the rate of change is identical across at least two different input pairs, connecting it directly to the slope.
3. **Form-translation fluency:** converts fluently between any of the three geometric forms and function notation, recognizing the shared algebra.
4. **Direction discrimination:** correctly distinguishes evaluating $f$ at a known input from solving for an input given a known output.
5. **Transfer:** applies function-notation evaluation and the constant-rate-of-change framing to a line already solved geometrically in `math.geom.line-equation` (P76), confirming the results match without re-deriving the line.

## Tutor Recovery Strategy
If the student treats function notation and line equations as unrelated, require them to convert several fresh geometric forms directly into function notation, explicitly naming each step as identical to prior algebra, until the connection is automatic. If the student doubts rate-of-change constancy, require them to verify it across at least two genuinely different input pairs on fresh functions until constancy is expected rather than checked skeptically. If the student confuses evaluation with solving, require them to state explicitly, before computing, whether the input or the output is known, on several fresh tasks until the direction is chosen correctly without prompting.

## Memory Hooks
1. "Evaluate first, graph second — $f(5)$ asks for one specific output, not a picture."
2. "Same rate near or far — check two very different pairs, get the same number, every time."
3. "Solving for $y$ and writing $f(x)$: same algebra, different name."

## Transfer Connections
- **`math.func.function-concept`:** the general input-output rule framework this concept applies specifically to $f(x)=mx+b$.
- **`math.geom.slope`:** the constant $m$ this concept reinterprets as a rate of change, not merely a steepness measure.
- **`math.geom.line-equation`** (cross-link, authored): the three geometric forms this concept's function notation directly re-expresses; every conversion technique from that concept applies unchanged here.
- **`math.func.quadratic-function`** (not yet authored): the next function family, building on the same function-notation and evaluation framework established here, where the rate of change will no longer be constant.

## Cross-Subject Connections
- **Economics (fixed-cost-plus-variable-rate models):** cost, wage, and pricing models with a fixed base plus a constant per-unit rate are directly linear functions, and evaluating them at specific quantities is exactly this concept's core skill.
- **Physics (constant-velocity motion):** position as a function of time under constant velocity, $x(t)=x_0+vt$, is a linear function whose constant rate of change IS the velocity — the identical constancy argument this concept establishes algebraically.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.linear-function.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 as a cross-link probe against `math.geom.line-equation`, mode = cross-link probe per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy: MC-1 Type 3, MC-2 Type 1, MC-3 Type 3 (independently classified — the Blueprint assigns severity but not formal birth types).
- Cross-link: `math.geom.line-equation` re-verified authored (both Blueprint and Educational Brain entry exist, `math.geom` domain CERTIFIED) — substantively incorporated per the Blueprint's own cross-link-probe design, directly reusing that concept's own $(1,5)$-$(3,11)$ worked line and standard-form conversion (Demonstration 3) rather than re-deriving fresh examples.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks `math.func.quadratic-function`, cross_links `math.geom.line-equation`, both confirmed against the live KG).

## Version History
- **Batch 30** (2026-09-12): initial authoring, part 4 of 4 this batch (with `math.func.inverse-functions`, `math.func.graph-of-function`, `math.func.real-valued-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 3, MC-2 Type 1, MC-3 Type 3).
