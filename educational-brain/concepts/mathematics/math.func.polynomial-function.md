# math.func.polynomial-function

## Identity
- **KG ID**: `math.func.polynomial-function`
- **Domain**: math.func (Functions)
- **Requires**: `math.func.quadratic-function`, `math.alg.polynomial`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.80 (MAMR 4/5)
- **Estimated hours**: 8
- **CPA stage**: Concrete (evaluating a cubic by hand, noticing a sign change between two evaluated points)

## Learning Objective
By the end of this concept, the learner can:
1. Recognize $p(x)$ as a FUNCTION — a general-degree extension of `math.func.function-concept`'s single-input/single-output rule to a polynomial expression of any degree $n$, not a new kind of object.
2. Evaluate a polynomial directly at a given input by substitution, reusing `math.alg.polynomial`'s own algebraic vocabulary (terms, degree, coefficients) without re-deriving any of it here.
3. Use evaluation together with continuity to locate a root informally: if $p(a)$ and $p(b)$ have opposite signs, a root lies somewhere in $(a,b)$ — an informal sign-change argument, not the full Intermediate Value Theorem, which belongs to calculus.
4. Combine end-behavior (from `math.alg.polynomial`) with a handful of evaluated points to predict a polynomial's overall shape, recognizing that neither tool alone is sufficient — end-behavior alone can hide interior dips and bumps that only evaluation reveals.

## Core Understanding
This concept is not "more polynomial algebra" — `math.alg.polynomial` already owns the algebraic anatomy: what a term is, what degree means, how to identify leading coefficient, and what end-behavior the degree and leading coefficient predict. This concept's job is different: it treats $p(x)$ as a genuine FUNCTION, in exactly the sense `math.func.function-concept` established for any function — one input, one output, evaluated by substitution — and asks what a learner can DO with that evaluation once they have it.

**EVALUATING A POLYNOMIAL IS SUBSTITUTION, NOT A NEW PROCEDURE.** $p(x) = 2x^3 - 5x^2 + x + 3$ evaluated at $x=2$ means: replace every $x$ with $2$, then compute. $p(2) = 2(8) - 5(4) + 2 + 3 = 16 - 20 + 2 + 3 = 1$. There is no polynomial-specific evaluation rule to learn beyond order of operations — this is exactly `math.func.function-notation`'s substitution model, applied to a longer expression.

**A SIGN CHANGE BETWEEN TWO EVALUATED POINTS GUARANTEES A ROOT BETWEEN THEM — BECAUSE POLYNOMIALS ARE CONTINUOUS.** If $p(-1) = -5$ (negative) and $p(0) = 3$ (positive), then somewhere between $x=-1$ and $x=0$, $p(x)$ must cross zero — it cannot jump from negative to positive without passing through zero, because a polynomial graph has no breaks, holes, or jumps (unlike, say, `math.func.step-function`, whose whole point is that it DOES jump). This is the informal content of the Intermediate Value Theorem; the formal continuity proof is a calculus-level topic, deliberately out of scope here — this concept licenses the informal argument as a search TOOL, not as a rigorous theorem statement.

**END-BEHAVIOR TELLS YOU WHAT HAPPENS AT THE EXTREMES, NOT WHAT HAPPENS IN BETWEEN.** `math.alg.polynomial`'s end-behavior rules (degree + leading coefficient sign) correctly predict that $p(x) = x^4 - 5x^2 + 4$ goes up on both ends (even degree, positive leading coefficient). But end-behavior says nothing about the middle: evaluating $p(1.5) = (1.5)^4 - 5(1.5)^2 + 4 = 5.0625 - 11.25 + 4 = -2.1875$ reveals a dip below the x-axis that "both ends go up" completely conceals. Full shape prediction needs BOTH tools together — end-behavior for the extremes, strategic evaluation for the interior — and refuting either tool's claim to sufficiency is itself a diagnostic skill this concept teaches.

## Mental Models
1. **Rung 1 — Evaluation as substitution.** $p(x)$ is a rule; $p(2)$ is what that rule outputs when fed $2$. No new arithmetic beyond order of operations.
2. **Rung 2 — The sign-change search.** Evaluating at scattered points and watching the sign flip is a targeted search strategy for roots, exactly like narrowing a number-guessing game by high/low feedback — each evaluation narrows the interval a root must live in.
3. **Rung 3 — Shape as a synthesis of two partial views.** End-behavior is the view from very far away (what the graph does near $\pm\infty$); evaluation at chosen points is the view up close. Correct shape prediction requires both, and a claim based on only one view is provisional until checked against the other.

## Why Students Fail
Each of the three misconceptions below traces to treating one partial tool as though it were the whole picture. MC-1 happens because end-behavior is often the FIRST and most memorable rule taught about polynomial shape (from `math.alg.polynomial`), and a learner who has just mastered it over-trusts its reach — extending a genuinely correct rule about the extremes into a false claim about the interior, without any interior evidence to justify the extension. MC-2 happens because the sign-change search is taught as a mechanical recipe (evaluate, compare signs, narrow the interval) without ever stating out loud WHY it works — so when a learner meets a genuinely discontinuous function later (a rational function with a vertical asymptote, or `math.func.step-function`), they apply the identical recipe and get a false root, because the justification (continuity) was never attached to the technique in the first place. MC-3 happens because "evaluate the function" and "find where the function is zero" are both procedures involving $p(x)=0$-shaped equations and substitution, and without a clear functional framing (evaluation asks "what is $p$ at THIS input," root-finding asks "for WHICH input is $p$ zero") the two collapse into a single blurred procedure — especially likely for a learner arriving at this concept without having fully separated `math.func.zero-of-function`'s directionality from ordinary evaluation.

## Misconceptions

### MC-1: END-BEHAVIOR-ASSUMED-SUFFICIENT-FOR-FULL-SHAPE
- **Birth type**: Type 1 — Overgeneralization (independently classified; this Blueprint's Misconception Registry table does not carry an explicit birth-type column, unlike the Blueprints for `math.func.vertex-form` and `math.func.step-function` read the same batch — this classification is this program's own, not adopted from the Blueprint)
- **Description**: The learner believes that knowing a polynomial's end-behavior (both ends up, both ends down, or opposite ends) is enough to know the ENTIRE shape of the graph, including how many times it turns, where it dips, and where it bumps.
- **Why this birth type**: `math.alg.polynomial`'s end-behavior rule is genuinely correct and genuinely powerful for what it claims — behavior at the extremes. The overgeneralization is extending a true, narrow claim (behavior as $x \to \pm\infty$) into a false, broad claim (behavior everywhere) by dropping the "as $x\to\pm\infty$" qualifier the rule was always scoped to.
- **Detection probe**: "$p(x) = x^4 - 5x^2 + 4$ goes up on both ends. Does the graph ever dip below the x-axis?" — a learner holding this misconception answers no, reasoning purely from end-behavior.
- **Repair**: Evaluate $p(1.5) = -2.1875$ directly in front of the learner. The negative value is undeniable arithmetic, immediately contradicting "up on both ends means always non-negative." Follow with: "End-behavior told you the truth about the far edges. It never promised anything about the middle — that's what evaluation is for."
- **Verification of death**: Given a new quartic's end-behavior alone, the learner explicitly states they cannot determine interior shape from that information and requests (or performs) evaluation at interior points before making any shape claim.

### MC-2: SIGN-CHANGE-ARGUMENT-APPLIED-WITHOUT-CONTINUITY-JUSTIFICATION
- **Birth type**: Type 5 — Instruction-induced (independently classified, same reason as MC-1: no Blueprint birth-type column for this concept)
- **Description**: The learner applies the "opposite signs at two points means a root between them" rule to ANY function, including ones with breaks or jumps, because the rule was taught as a mechanical recipe rather than as a consequence of continuity.
- **Why this birth type**: This is a direct consequence of HOW the technique is typically introduced — as a step-by-step procedure (evaluate, compare signs, narrow) — without foregrounding the continuity requirement that makes it valid. The learner did not invent the error from a false intuition; they correctly reproduced a taught procedure whose scope condition was never taught alongside it.
- **Detection probe**: "For $f(x) = 1/x$, $f(-1) = -1$ and $f(1) = 1$ — opposite signs. Does that guarantee a root somewhere in $(-1,1)$?" — a learner holding this misconception says yes, missing that $f$ is undefined (and jumps) at $x=0$.
- **Repair**: Graph $1/x$ alongside a genuine polynomial with a sign change. Point directly at the break in $1/x$'s graph at $x=0$: "The sign-change rule needs the graph to have NO gaps between your two points. Polynomials never have gaps — that's exactly why this works for them. The moment a function can jump or break, like this one, the rule stops being safe."
- **Verification of death**: The learner correctly states that the sign-change argument requires the function to be continuous on the interval in question, and correctly identifies that polynomials always satisfy this (making the shortcut always safe for them) while flagging that it is not automatically safe for other function families.

### MC-3: FUNCTION-EVALUATION-CONFUSED-WITH-ROOT-FINDING
- **Birth type**: Type 3 — Language contamination (independently classified; matches the identical pattern already classified this way for the equivalent "evaluation vs. solving" misconception in `math.func.quadratic-function` and `math.func.linear-function`)
- **Description**: The learner conflates "evaluate $p$ at $x=3$" (compute $p(3)$, a single determined output) with "find where $p(x) = 3$" (solve for $x$, potentially several unknown inputs) — treating both as the same kind of task because both involve the numeral $3$ and the expression $p(x)$.
- **Why this birth type**: Both tasks are phrased using nearly identical surface language ("$p$ of 3", "$p(x)$ equals 3") and both are answered by manipulating the same symbolic object $p(x)$ — the SURFACE similarity of the language obscures a genuine DIRECTIONAL difference (input-to-output vs. output-to-input), the same mechanism already documented for this exact confusion in sibling function concepts.
- **Detection probe**: "$p(x) = x^2 - 4$. What is $p(3)$? And separately: for what value of $x$ is $p(x) = 3$?" — a learner holding this misconception answers both questions identically, or answers the second by simply evaluating at $x=3$ again.
- **Repair**: Physically separate the two directions with an input/output arrow diagram: "$p(3) = ?$" points input $3$ INTO the machine, output comes out. "$p(x) = 3$" points OUTPUT $3$ and asks which input(s) could have produced it — potentially more than one, potentially requiring solving an equation. Compute both explicitly side by side: $p(3) = 5$ (evaluation, one answer, no equation-solving) vs. $p(x)=3 \Rightarrow x^2-4=3 \Rightarrow x=\pm\sqrt7$ (root-type problem, equation-solving, generally more than one answer).
- **Verification of death**: Given a mixed set of "evaluate at..." and "solve for $x$ where $p(x) = ...$" questions, the learner correctly identifies which direction each requires before attempting either, and does not default to substitution when solving is actually required.

## Analogies
1. **The postal-code lookup vs. the address search (for MC-3)**: evaluating $p(3)$ is like looking up what's at a known address — one definite answer. Solving $p(x)=3$ is like being given a description and searching for every address that matches it — the search could turn up one match, several, or none, and it is fundamentally a different kind of task even though both involve "addresses" and "$3$."
2. **The telescope vs. the magnifying glass (for MC-1)**: end-behavior is a telescope aimed at the far horizon — it tells you exactly what's out there, but nothing about what's on the ground right in front of you. Evaluation at chosen points is the magnifying glass for the ground. A full picture needs both instruments; neither replaces the other.
3. **Stepping-stones across a stream, never a floating platform (for MC-2)**: sign-change root-finding only works when you can be SURE the ground between two stones is solid (continuous) — for a polynomial, it always is. For a function with a hidden hole or a sudden jump (a floating platform disguised as solid ground), stepping confidently from one side to the other based only on the two endpoints is exactly the mistake that leads to a false conclusion.

## Demonstrations
1. **D1 — Live evaluation.** Compute $p(2) = 1$ for $p(x) = 2x^3-5x^2+x+3$ step by step, narrating each substitution, establishing evaluation as ordinary substitution with no special polynomial trick.
2. **D2 — The sign-change hunt.** Evaluate $p(-1) = -5$ and $p(0) = 3$ for the same polynomial, narrate the sign flip, and locate a root in $(-1, 0)$ — then narrow further by evaluating $p(-0.5)$ to demonstrate the search can be refined indefinitely.
3. **D3 — The end-behavior trap.** Predict $p(x) = x^4-5x^2+4$'s shape from end-behavior alone ("up, up — probably just a big U"), then evaluate $p(1.5) = -2.1875$ live and let the contradiction land before explaining why: end-behavior was never wrong, just incomplete.

## Discovery Questions
1. "If I told you a polynomial is negative at $x=-1$ and positive at $x=0$, and NOTHING else, can you be certain it has a root somewhere between them? Why does that certainty depend on this being a polynomial specifically?"
2. "Two quartic polynomials both go up on both ends. Does that guarantee they have the same number of dips and bumps in between? What would you need to check to find out?"
3. "What's the difference between the question 'what does $p$ output when I put in 3?' and the question 'what input makes $p$ output 3?' Are they ever the same question?"

## Teaching Sequence
Entry stage: Concrete (evaluate a cubic by direct substitution; notice a sign change between two evaluated outputs before any abstract framing is introduced).
1. Substitution-first evaluation (D1) — establish $p(x)$ as an ordinary function, reusing `math.func.function-notation`'s substitution model on a longer expression.
2. The sign-change search as a targeted tool (D2) — frame it as a search strategy, immediately paired with the "why does this work" continuity justification (pre-empting MC-2).
3. The end-behavior trap (D3) — deliberately let end-behavior's claim fail against direct evaluation, using the contradiction itself as the teaching moment (pre-empting MC-1).
4. Evaluation-vs-root-finding directionality drill (pre-empting MC-3), then transfer probe (P76: bridge cable tension modeling — locate where a modeled tension function crosses a safety threshold via sign-change search, and explain in the engineer's own terms why end-behavior alone could never have answered that question).

## Tutor Actions
1. Before predicting any polynomial's full shape from end-behavior, explicitly ask the learner what end-behavior actually claims (extremes only) versus what they're about to claim (everywhere) — surface the gap before it becomes an error.
2. When a learner performs a sign-change argument, ask them to state, out loud, why the function they're working with can't have a hidden jump between the two points — reinforce the continuity justification as inseparable from the technique.
3. When a learner is asked to "find $p(x) = $ [some value]," watch for immediate substitution at that value as an input rather than setting up an equation — catch MC-3 at the moment of the very first symbolic move, before an answer is even produced.

## Voice Teaching Notes
- **Register**: proficient/analyze — this concept sits above `math.alg.polynomial`'s procedural algebra; language should treat the learner as someone who already trusts polynomial manipulation and is now being asked to reason ABOUT what evaluation and end-behavior can and cannot tell them.
- **Load-bearing sentence**: "Evaluating tells you what happens at one spot. End-behavior tells you what happens infinitely far away. Neither one, alone, tells you the whole story in between."
- **Wait time note**: after posing the sign-change discovery question, allow enough silence for the learner to attempt the "why does this work" justification unprompted — this is the single most diagnostic moment for catching MC-2 before it hardens.

## Assessment Signals
1. Correctly evaluates a degree-3 or higher polynomial at a specified value via direct substitution.
2. Correctly identifies an interval containing a root using the sign-change argument, AND states the continuity justification unprompted.
3. Given a polynomial's end-behavior, correctly declines to claim full interior shape without further evaluation.
4. Correctly distinguishes "evaluate $p$ at $x=k$" from "solve $p(x)=k$" when given both phrasings back-to-back.
5. **P76 Transfer Probe** (independence mode): given a bridge cable tension model as a polynomial-like function of load, locates where the tension crosses a stated safety threshold using the sign-change search, and explains in engineering terms why end-behavior alone would be insufficient for the engineer's actual question.

## Tutor Recovery Strategy
If the learner conflates evaluation and root-finding (MC-3) under time pressure, do not simply restate the correct definitions — return to the input/output arrow diagram from the MC-3 repair and have the learner physically point to which direction the specific question in front of them is asking, before any computation begins. If a learner has just been burned by the end-behavior trap (MC-1) and swings to the opposite over-correction — refusing to use end-behavior at all — explicitly re-validate it as a correct, useful FIRST step that must be followed by interior checks, not discarded.

## Memory Hooks
1. "Substitute in, get a number out — evaluation is a one-way door."
2. "No gaps, no jumps — that's what makes the sign-change trick safe for polynomials, and only for functions like them."
3. "Far away view, close-up view — you need both to see the whole shape."

## Transfer Connections
- `math.alg.polynomial` — this concept's own prerequisite; owns the algebraic anatomy (terms, degree, end-behavior rules) this concept builds on without re-deriving.
- `math.func.zero-of-function` — the sign-change search is a concrete search STRATEGY for exactly the roots that concept defines abstractly.
- `math.func.function-concept` and `math.func.function-notation` — this concept's evaluation model is a direct, unmodified reuse of those concepts' substitution framework, just applied to longer polynomial expressions.

## Cross-Subject Connections
- Physics: locating where a projectile's height function crosses zero (landing time) is a direct sign-change-search application, and end-behavior reasoning about a modeled quantity as time grows large mirrors this concept's own end-behavior caution.
- Engineering: the P76 transfer probe's bridge cable tension model exemplifies a broader engineering pattern — modeling a physical quantity as a polynomial-like function of a controllable parameter, then using evaluation and sign-change search (not blind trust in asymptotic behavior) to locate safety thresholds.

## Blueprint References
- `docs/curriculum/blueprints/math.func.polynomial-function.md` — fully reused by reference. This Blueprint's Misconception Registry table does NOT include an explicit birth-type column (unlike the Blueprints for `math.func.vertex-form` and `math.func.step-function`, both authored the same batch, which do carry explicit birth-type classifications). All 3 misconceptions in this entry are therefore **independently classified** by this program (MC-1 Type 1, MC-2 Type 5, MC-3 Type 3), not adopted from the Blueprint — stated here explicitly and honestly, per this program's standing discipline for concepts lacking a pre-assigned birth type.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration). The one genuine finding this batch is process-level, not content-level: this Blueprint's Misconception Registry table is missing the explicit birth-type column present in every other Blueprint read across this entire campaign so far — worth flagging to the Curriculum Production Pipeline as a possible one-off gap in this specific Blueprint's authoring pass, though it does not affect this entry's completeness (independent classification fully substitutes for it, per the Educational Brain's own authoring discipline).

## Version History
- **Batch 33** (2026-09-13): initial authoring, part 2 of 3 this batch (with `math.func.vertex-form`, `math.func.step-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions independently classified (MC-1 Type 1, MC-2 Type 5, MC-3 Type 3) since this Blueprint's Misconception Registry lacks an explicit birth-type column, unlike its two batch-siblings.
