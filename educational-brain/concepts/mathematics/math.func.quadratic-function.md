# math.func.quadratic-function — Quadratic Function (Evaluation, Vertex Formula, Vertex-vs-Roots Division of Labor)

## Identity
- **KG ID:** `math.func.quadratic-function`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.linear-function`, `math.alg.quadratic-equation`
- **Unlocks:** `math.func.polynomial-function`
- **Cross-links:** `math.geom.parabola` (confirmed genuinely unauthored — independence mode, see Blueprint References)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 10

## Learning Objective
By the end of this concept, the student can: (1) recognize $f(x)=ax^2+bx+c$ as a FUNCTION — per `math.func.linear-function`'s function-notation framing, now extended to degree 2 — and evaluate it at specific inputs, a distinct emphasis from `math.alg.quadratic-equation`'s exclusive focus on solving $f(x)=0$; (2) find the vertex $\left(-\frac{b}{2a}, f\left(-\frac{b}{2a}\right)\right)$ directly, reusing `math.alg.completing-the-square`'s vertex-form derivation as a general formula, and use it to determine the function's maximum or minimum value; (3) apply quadratic functions to model real-world optimization and projectile-motion scenarios, correctly distinguishing "where is the maximum/minimum" (the vertex) from "where does the function equal zero" (the roots) as genuinely separate questions.

## Core Understanding
`math.func.linear-function` established the function-notation lens on a geometric object; `math.alg.quadratic-equation` fully owns root-finding for $ax^2+bx+c=0$. This concept extends the function-notation lens to degree 2, treating $f(x)=ax^2+bx+c$ as a genuine function to EVALUATE, find the EXTREME VALUE of, and use to MODEL real quantities — deliberately not re-deriving root-finding.

EXPLICIT DIVISION OF LABOR WITH `math.alg.quadratic-equation`: that concept owns finding ROOTS — where $f(x)=0$. This concept's job, paralleling `math.func.linear-function`'s relationship to `math.geom.line-equation`, is treating $f(x)=ax^2+bx+c$ as a function: evaluating it, finding its vertex, and modeling real-world quantities that change quadratically.

THE VERTEX FORMULA IS COMPLETING THE SQUARE, PACKAGED: from `math.alg.completing-the-square`'s general vertex-form derivation, $ax^2+bx+c=a\left(x+\frac{b}{2a}\right)^2+\left(c-\frac{b^2}{4a}\right)$ — the vertex is at $x=-\frac{b}{2a}$, with the $y$-coordinate given by EVALUATING $f$ there. This formula is not new content — it is that concept's own already-derived result, restated as a direct plug-in-and-evaluate procedure.

VERTEX (EXTREME VALUE) AND ROOTS (ZERO-CROSSINGS) ARE DIFFERENT QUESTIONS: a quadratic model can be asked two structurally different questions — "what is the maximum/minimum value, and where?" (the vertex, this concept's contribution) versus "when does the quantity equal zero?" (the roots, `math.alg.quadratic-equation`'s contribution). Both may be relevant to the SAME model (a projectile's peak height vs. when it lands), but they answer genuinely different real-world questions and require different techniques — finding one never automatically gives you the other.

## Mental Models
1. **Rung 1 — a quadratic function is evaluated at specific inputs before it is ever solved for zero; these are different operations.** Function evaluation and root-finding run in opposite directions.
2. **Rung 2 — the vertex formula IS completing the square, just packaged for direct use: find $x=-b/2a$, then evaluate $f$ there for the full point.** No new derivation is needed.
3. **Rung 3 — the vertex answers "what's the extreme value, and where," the roots answer "where is it zero" — never assume one calculation answers both.** A projectile's peak and its landing time are genuinely different moments.

## Why Students Fail
Having just spent significant effort mastering root-finding in `math.alg.quadratic-equation`, students can assume that finding a quadratic function's vertex also somehow reveals its roots (or vice versa), missing that these are separate questions with separate numeric answers, both potentially relevant to the same model but never substitutable for each other. Having correctly computed $-b/2a$, students can stop there and report it as "the vertex," missing that the vertex is a POINT with two coordinates, and the second coordinate requires actually EVALUATING $f$ at that $x$-value — a step easy to forget once the formula for the first coordinate feels complete. Finally, having practiced evaluating $f(x)$ at given inputs, students can confuse this direction (input known, find output) with solving $f(x)=$ some target value for $x$ (output known, find input), applying the wrong procedure to whichever direction is actually being asked.

## Misconceptions

### MC-1: VERTEX-AND-ROOTS-CONFLATED
- **Birth type:** Type 1 (overgeneralization) — Blueprint designates this "Foundational," independently confirmed
- **Description:** Believing finding a quadratic function's vertex also tells you its roots (or vice versa), rather than recognizing these as separate questions requiring separate techniques.
- **Why this birth type:** Overgeneralization from the fact that both quantities come from the "same" quadratic expression, to a mistaken belief that computing one automatically yields the other, when in fact they are structurally different calculations (an extremum vs. a zero-crossing) that happen to share a source formula.
- **Detection probe:** "If you've found a quadratic function's vertex, have you also found where it crosses zero (its roots)?" A student with MC-1 answers "yes."
- **Repair:** For $f(t)=-5t^2+20t+2$ (a projectile's height): the vertex is at $t=2$, giving a maximum height of $22$ m (Demonstration 2). The roots — when the ball hits the ground — require solving $-5t^2+20t+2=0$ via the quadratic formula, giving $t\approx4.1$ seconds (rejecting the negative solution). These are TWO GENUINELY DIFFERENT numbers ($t=2$ for the maximum, $t\approx4.1$ for landing) answering two different real-world questions about the SAME function.
- **Verification of death:** Given a quadratic model, the student correctly computes both the vertex and the roots as separate calculations, explicitly stating what real-world question each answers.

### MC-2: VERTEX-FORMULA-X-COORDINATE-MISTAKEN-FOR-THE-FULL-VERTEX
- **Birth type:** Type 5 (instruction-induced) — Blueprint designates this "Foundational," independently confirmed
- **Description:** Computing only $-b/2a$ (the vertex's $x$-coordinate) and stopping there, forgetting to evaluate $f$ at that point to get the full vertex $(h,k)$.
- **Why this birth type:** Instruction-induced: the formula $-b/2a$ is often the most heavily drilled part of vertex-finding, so the second, equally necessary step — evaluating $f$ there to get the $y$-coordinate — is easy to treat as optional or already-done once the "formula" has been applied.
- **Detection probe:** "What is the vertex of $f(x)=2x^2-8x+3$?" A student with MC-2 answers with only the $x$-value (e.g. "the vertex is $x=2$").
- **Repair:** For $f(x)=2x^2-8x+3$: the $x$-coordinate is $-\frac{-8}{2(2)}=2$ — but this is only HALF the vertex. Evaluating $f(2)=2(4)-8(2)+3=8-16+3=-5$ gives the FULL vertex point $(2,-5)$. The vertex is always a POINT with two coordinates — the formula finds one, evaluation finds the other.
- **Verification of death:** Given a quadratic function, the student reports the vertex as a complete ordered pair $(h,k)$, explicitly performing the evaluation step after computing $h=-b/2a$.

### MC-3: QUADRATIC-FUNCTION-EVALUATION-CONFUSED-WITH-SOLVING
- **Birth type:** Type 3 (language contamination) — Blueprint rates this "Moderate," independently confirmed
- **Description:** Confusing evaluating $f(x)$ at a given input with solving $f(x)=$ (some value) for $x$, using the wrong direction of the input-output relationship.
- **Why this birth type:** Language contamination: both tasks are phrased using the same function notation and similar verbal instructions ("find $f(3)$" versus "solve $f(x)=3$"), so the surface similarity obscures that they run in opposite directions through the function.
- **Detection probe:** "For $f(x)=2x^2-8x+3$, to find $f(5)$, do you set $2x^2-8x+3=5$ and solve for $x$?" A student with MC-3 answers "yes."
- **Repair:** Evaluating $f(5)$ means: input is $5$, find the OUTPUT — substitute directly, $f(5)=2(25)-8(5)+3=50-40+3=13$. Solving $f(x)=5$ means: output is $5$, find the INPUT(s) — set $2x^2-8x+3=5$ and solve, a genuinely different (and generally two-answer) task. Confusing the two applies the wrong procedure to the wrong direction.
- **Verification of death:** Given an instruction to either evaluate $f$ at a specific input or solve $f(x)=$ a specific output, the student correctly identifies which direction is being asked and applies the matching procedure.

## Analogies
1. **The mountain-peak-versus-sea-level-crossing analogy (targets MC-1).** A mountain's highest peak (the vertex) and the specific points where its base crosses sea level (the roots) are two different, independently measured features of the same landform — knowing the peak's height tells you nothing about where the base meets the shoreline.
2. **The map-coordinates-need-both-numbers analogy (targets MC-2).** A location on a map needs both a latitude AND a longitude — reporting only one number leaves the location genuinely incomplete, exactly as reporting only $-b/2a$ leaves the vertex incomplete without the $y$-coordinate from evaluation.
3. **The vending-machine-forward-versus-backward analogy (targets MC-3).** Asking "what snack comes out if I press button 5" (evaluation) is a different question from "which button gives me a snack worth \$5" (solving) — even though both involve the same machine, they run in opposite directions.

## Demonstrations
### Demonstration 1 — evaluating the quadratic function directly (mirrors Blueprint Example 1)
A ball's height is modeled by $f(t)=-5t^2+20t+2$ (meters, $t$ in seconds). Evaluating $f(1)=-5(1)+20(1)+2=17$ meters — the height at exactly $t=1$ second, a direct evaluation, distinct from asking "when is the ball at height $17$" (which would instead require solving $f(t)=17$).

### Demonstration 2 — finding the vertex via the formula, reusing completing the square (mirrors Blueprint Example 2)
Continuing $f(t)=-5t^2+20t+2$: the vertex's $t$-coordinate is $-\frac{20}{2(-5)}=2$. Evaluating $f(2)=-5(4)+20(2)+2=-20+40+2=22$. The vertex is $(2,22)$ — since $a=-5<0$, this is a MAXIMUM: the ball's peak height, $22$ meters, occurs at $t=2$ seconds. This matches exactly what `math.alg.completing-the-square`'s own transfer probe (using this identical function) derived via full completing-the-square.

### Demonstration 3 — vertex vs. roots, two different real-world questions (mirrors Blueprint Example 3)
Continuing the same $f(t)=-5t^2+20t+2$: Demonstration 2 answered "what's the maximum height, and when?" ($22$ m at $t=2$ s). A DIFFERENT question — "when does the ball hit the ground (height $=0$)?" — requires the quadratic formula: $t=\frac{-20\pm\sqrt{400-4(-5)(2)}}{2(-5)}=\frac{-20\pm\sqrt{440}}{-10}$, giving $t\approx-0.1$ (rejected, negative time) or $t\approx4.1$ seconds. Two genuinely different numeric answers to two different questions about the identical function.

## Discovery Questions
1. "If you've found a quadratic function's vertex, have you also found its roots? Test with $f(t)=-5t^2+20t+2$: is the vertex's $t$-value the same as the landing time?"
2. "What is the vertex of $f(x)=2x^2-8x+3$? Is a single number ($x=2$) the complete answer, or is something missing?"
3. "For $f(x)=2x^2-8x+3$, to find $f(5)$, do you substitute $5$ for $x$, or do you set the whole expression equal to $5$ and solve?"

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — a projectile's height evaluated at several specific times, before the general vertex-form theory**, matching the Blueprint's own CPA justification.
1. Work Demonstration 1's direct evaluation for $f(t)=-5t^2+20t+2$, posing Discovery Question 3 before confirming evaluation and solving run in opposite directions.
2. Work Demonstration 2's vertex-formula application, posing Discovery Question 2 before confirming the vertex needs both coordinates.
3. Work Demonstration 3's vertex-vs-roots contrast on the same function, posing Discovery Question 1 before confirming the two numbers answer different questions.
4. Assess with the P77 problem set and the parabolic-archway transfer probe (P76, independence mode).

## Tutor Actions
1. **On any function-evaluation task:** require the student to substitute the specific input directly and compute a specific output, distinguishing this from solving for a root.
2. **On any vertex-finding task:** require the student to report a complete ordered pair, explicitly performing the evaluation step after computing $-b/2a$.
3. **On any model with both vertex and root relevance:** require the student to state explicitly which real-world question each calculation answers, never assuming one substitutes for the other.

## Voice Teaching Notes
1. **Register:** proficient/apply — this concept assumes fluency with function notation and root-finding, and synthesizes both into degree-2 function treatment.
2. **Load-bearing sentence, spoken slowly:** "The vertex tells you the peak; the roots tell you when it's zero — two different questions, two different numbers."
3. **Wait time:** pause after Discovery Question 1, letting the student genuinely compare the vertex's $t$-value and the landing time before confirming they differ.

## Assessment Signals
1. **Gate concept:** correctly evaluates a quadratic function at specific inputs, distinct from solving for roots.
2. **Vertex fluency:** correctly computes the complete vertex $(h,k)$, including the evaluation step for $k$.
3. **Vertex-vs-roots discrimination:** correctly distinguishes the vertex question from the roots question for the same model, computing both when both are relevant.
4. **Direction discrimination:** correctly distinguishes evaluating $f$ at a known input from solving for an input given a known output.
5. **Transfer:** applies both evaluation and vertex-finding to a parabolic archway model (P76), correctly distinguishing what the vertex and the roots each tell the architect.

## Tutor Recovery Strategy
If the student conflates the vertex with the roots, require them to compute both explicitly for several fresh models, stating which real-world question each answers, until the distinction is automatic. If the student reports only the vertex's $x$-coordinate, require them to complete the evaluation step on fresh functions until the full ordered pair is the automatic response. If the student confuses evaluation with solving, require them to state explicitly, before computing, whether the input or the output is known, on fresh tasks until the direction is chosen correctly without prompting.

## Memory Hooks
1. "Vertex and roots are different questions with different numbers — don't let one answer stand in for the other."
2. "The vertex is a point, not a number — find $x=-b/2a$, then evaluate $f$ there for the rest."
3. "Evaluate first, solve second — $f(5)$ asks for one output, not an equation to unravel."

## Transfer Connections
- **`math.func.linear-function`:** the function-notation evaluation framework this concept extends to degree 2.
- **`math.alg.quadratic-equation`:** the root-finding machinery this concept explicitly distinguishes its own vertex-focused content from, while both remain relevant to the same real-world models.
- **`math.func.polynomial-function`** (not yet authored): the next function family, generalizing this concept's evaluation-and-extremum framework beyond degree 2.
- **`math.geom.parabola`** (cross-link, currently unauthored): the geometric properties (focus, directrix) of the parabola this function's graph traces, extending the vertex concept established here.

## Cross-Subject Connections
- **Physics (projectile motion):** the height-vs-time model $h(t)=-\frac12gt^2+v_0t+h_0$ is the canonical real-world instance of this concept's vertex-as-maximum-height application.
- **Economics (profit/revenue optimization):** a quadratic profit function's vertex identifies the production level that maximizes profit — a direct real-world application of the vertex-finding skill developed here.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.quadratic-function.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on a parabolic archway, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 1, MC-2 Type 5, MC-3 Type 3), independently confirmed rather than re-derived.
- Cross-link: `math.geom.parabola` re-verified genuinely unauthored (Blueprint exists, no Educational Brain entry) — confirmed matching the Blueprint's own independence-mode declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks `math.func.polynomial-function`, cross_links `math.geom.parabola`, both confirmed against the live KG).

## Version History
- **Batch 32** (2026-09-12): initial authoring, part 1 of 4 this batch (with `math.func.exponential-function`, `math.func.logarithmic-function`, `math.func.piecewise-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 1, MC-2 Type 5, MC-3 Type 3).
