# math.calc.ftc-part2

## Identity
- **KG ID**: `math.calc.ftc-part2`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.ftc-part1` — load-bearing part: Part 1 establishes the antiderivative-area link and the accumulation function $\frac{d}{dx}\int_a^x f(t)\,dt=f(x)$; Part 2 is the computational shortcut that follows from it.
  - `math.calc.antiderivatives` — load-bearing part: the reverse power rule, antiderivatives of $e^x$ and trig functions, and the $+C$ family are all assumed fluent before Part 2's evaluation procedure can be applied.
- **Unlocks**: `math.calc.u-substitution` (u-substitution extends the Evaluation Theorem to composite integrands).
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.calc.ftc-part2.md` (reused by reference throughout)

## Learning Objective
- The learner can evaluate a definite integral using the Evaluation Theorem, $\int_a^b f(x)\,dx=F(b)-F(a)$, where $F$ is ANY antiderivative of $f$, correctly performing the subtraction in the order upper bound minus lower bound.
- The learner can recognize that the constant $C$ cancels algebraically in the subtraction, $[F(x)+C]_a^b=(F(b)+C)-(F(a)+C)=F(b)-F(a)$, and correctly omits $+C$ from definite-integral answers.
- The learner can evaluate the antiderivative at BOTH bounds and subtract, never stopping after evaluating at only one bound.

## Core Understanding
FTC Part 2 (the Evaluation Theorem) converts the abstract limit-of-Riemann-sums definition of the definite integral into a concrete two-step computation: find ANY antiderivative $F$ of the integrand $f$, then compute $F(b)-F(a)$ — the antiderivative evaluated at the upper bound, minus the antiderivative evaluated at the lower bound. The bracket notation $\bigl[F(x)\bigr]_a^b$ compactly records this: evaluate at the TOP number first (the upper bound $b$), then subtract the value at the BOTTOM number (the lower bound $a$) — reversing this order negates the entire answer, since $F(a)-F(b)=-\bigl(F(b)-F(a)\bigr)$. A subtlety that trips many learners moving from indefinite to definite integrals: the arbitrary constant $C$ that MUST be included in every indefinite-integral answer is NEVER included in a definite-integral answer, because it cancels exactly in the subtraction — $\bigl[F(x)+C\bigr]_a^b=(F(b)+C)-(F(a)+C)=F(b)-F(a)$, with the two copies of $C$ canceling regardless of which antiderivative (which value of $C$) was chosen.

## Mental Models
1. **Beginner — "find an antiderivative, plug in the top number, plug in the bottom number, subtract."** A three-step mechanical recipe with no attention yet to order or the fate of $C$. *Upgrade trigger*: getting a negative-of-the-correct answer on a problem where the bounds were processed in the wrong order.
2. **Intermediate — "the bracket $[F(x)]_a^b$ means $F(b)-F(a)$: TOP bound first, then subtract the BOTTOM bound; no $+C$ needed, it cancels."** Both the order-discipline and the $C$-omission are now explicit rules, followed correctly but not yet justified. *Upgrade trigger*: needing to PROVE, not just state, why $C$ cancels — some learners doubt the omission is genuinely always safe.
3. **Advanced — "$[F(x)+C]_a^b=(F(b)+C)-(F(a)+C)=F(b)-F(a)$, with the $C$'s canceling algebraically, regardless of which antiderivative was chosen."** The cancellation is now derived, not merely trusted, and the learner can verify it with any specific antiderivative. *Upgrade trigger*: needing to connect the numeric result back to geometric area, net displacement, or another applied quantity.
4. **Expert — FTC Part 2 converts an infinite limiting process (the Riemann sum) into a finite, exact, two-evaluation computation, and the SAME antiderivative used for indefinite integration is reused here, with the only new step being the bound-subtraction and $C$-cancellation.** The theorem is recognized as the computational payoff of Part 1's structural insight, not an independent new rule. *Shelf life*: permanent.

## Why Students Fail
The dominant and most damaging failure is a notation-driven order error: the bracket notation $[F(x)]_a^b$ places the lower bound $a$ visually BELOW and the upper bound $b$ visually ABOVE, and a learner who reads this top-to-bottom or processes the bounds in the order they are first encountered in the integral symbol $\int_a^b$ (reading $a$ "first") writes $F(a)-F(b)$ instead of the required $F(b)-F(a)$ — silently negating every single answer, a sign error made especially dangerous because it produces a plausible-looking (if wrong) numeric result rather than an obviously broken one (MC-1, BOUNDS-SWAPPED). A second, distinct failure is a direct overgeneralization of the indefinite integral's own genuine rule: having just internalized that EVERY antiderivative must carry $+C$, a learner carries that same requirement into the definite-integral setting, where it does not apply, appending $+C$ (or a numeric $C$) to an otherwise-correct definite-integral answer (MC-2, C-IN-DEFINITE-INTEGRAL). A third failure imports the wrong procedural template from a DIFFERENT, earlier-learned computation: differentiation's own "evaluate at the point" pattern (finding $f'(x)$ then evaluating at one specific $x$-value) gets carried over incorrectly, leading a learner to evaluate the antiderivative at only ONE bound and treat that single value as the complete answer, omitting the required subtraction of the other bound entirely (MC-3, SINGLE-BOUND-EVALUATION).

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1, MC-2, MC-3) and its own Protocol B repair actions B01–B03. **The Blueprint's Misconception Registry carries a Trigger column but no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — BOUNDS-SWAPPED** (the Blueprint's own declared "Foundational Misconception" — the sign error propagates silently into every area, net-change, and applied problem)
  - **Birth type**: Type 4, notation-induced. The bracket notation $[F(x)]_a^b$ places the lower bound visually beneath the upper bound, and reading order (encountering $a$ "first" in $\int_a^b$) invites evaluating $a$ first rather than $b$ first, even though the correct order is $F(b)-F(a)$.
  - **Characteristic phrase**: writing $F(a)-F(b)$ instead of $F(b)-F(a)$, producing the exact negative of the correct answer.
  - **Detection probe** (Blueprint's B01 P41): evaluate $\int_1^3(2x)\,dx$; the correct answer is $F(3)-F(1)=9-1=8$, while BOUNDS-SWAPPED yields $F(1)-F(3)=1-9=-8$.
  - **Repair**: Blueprint Repair Action B01 — write the formula $\int_a^b f\,dx=F(b)-F(a)$ EXPLICITLY before substituting any numbers, treating the bracket as "top-slot goes first, bottom-slot is subtracted," never evaluating a bound in-place without first writing the formula skeleton.
  - **Verification of death**: given a fresh definite integral, the learner writes the formula skeleton $F(b)-F(a)$ (with the actual bound values substituted for $b$ and $a$) before evaluating either antiderivative value.

- **MC-2 — C-IN-DEFINITE-INTEGRAL** (the Blueprint's own second registered misconception)
  - **Birth type**: Type 1, overgeneralization of the indefinite integral's genuine rule (every antiderivative must carry $+C$) into the definite-integral setting, where the constant cancels and must be omitted.
  - **Characteristic phrase**: writing $[F(x)+C]_a^b=F(b)-F(a)+C$ or otherwise appending $+C$ to a definite-integral's final numeric answer.
  - **Detection probe** (Blueprint's B02 P41): evaluate $\int_0^2(3x^2)\,dx$; a student who writes "$8+C$" rather than the numeric answer $8$ demonstrates MC-2.
  - **Repair**: Blueprint Repair Action B02 — explicitly expand $[F(x)+C]_a^b=(F(b)+C)-(F(a)+C)$ and show the two copies of $C$ canceling algebraically, using a NON-ZERO value of $C$ (e.g. $C=7$) to make the cancellation visibly independent of which antiderivative was chosen.
  - **Verification of death**: given a fresh definite integral, the learner's final answer is a bare number with no $C$, and the learner can explain WHY $C$ cancels if asked, not merely omit it by rote.

- **MC-3 — SINGLE-BOUND-EVALUATION** (the Blueprint's own third registered misconception)
  - **Birth type**: Type 1, overgeneralization of a DIFFERENT prior procedure — differentiation's own "find $f'(x)$, then evaluate at one point" template — carried over inappropriately into the definite integral's genuinely TWO-evaluation, subtraction-based procedure.
  - **Characteristic phrase**: evaluating $F(b)$ (or $F(a)$) alone and presenting that single value as the complete answer, with the subtraction step simply omitted.
  - **Detection probe** (Blueprint's B03 P41): evaluate $\int_1^4(2x)\,dx$; a student who writes only $16$ (the value of $F(4)$) or only $-1$ (a partial computation using $F(1)$ alone), rather than the correct $16-1=15$, demonstrates MC-3.
  - **Repair**: Blueprint Repair Action B03 — apply an explicit three-item checklist before writing any final answer: "(1) Did I evaluate at the upper bound? (2) Did I evaluate at the lower bound? (3) Did I subtract upper minus lower?"
  - **Verification of death**: given a fresh definite integral, the learner writes both bound values explicitly (e.g. "$F(4)=16$, $F(1)=1$") before writing the subtracted final answer.

## Analogies
- **Best — a bank balance: ending balance minus starting balance gives the net change.** $F(b)$ is the "ending total," $F(a)$ is the "starting total," and the definite integral is the NET CHANGE between them — always ending minus starting, never the reverse, and never with a leftover constant appended (the "starting balance" reference point cancels out of a NET CHANGE calculation, exactly like $C$ cancels here).
- **Alternative — a race's finish-line reading minus its start-line reading.** The upper bound $b$ is the finish line (read first, in the formula), the lower bound $a$ is the start line (subtracted) — swapping which line is "finish" and which is "start" reverses the sign of the net distance covered.
- **ANTI-ANALOGY — "just evaluate the antiderivative at the endpoint, like you did for derivatives."** This vague phrasing licenses MC-3 directly, since differentiation genuinely does end with a single-point evaluation, while a definite integral requires TWO evaluations and a subtraction. Say "definite integrals need BOTH bounds evaluated and subtracted — this is not the same pattern as evaluating a derivative at one point" instead.

## Demonstrations
- **The sign-flip swap.** Compute $\int_0^3(2x+1)\,dx$ correctly ($F(3)-F(0)=12-0=12$) and then with the bounds deliberately swapped ($F(0)-F(3)=0-12=-12$). *Predict whether swapping will change the answer, and how, before computing.* Getting the exact negative is the demonstration for MC-1.
- **The C-cancellation reveal.** Compute $\int_{-1}^1(4x)\,dx$ using $F(x)=2x^2+7$ (an antiderivative with $C=7$, deliberately non-zero) and show the full expansion $(2+7)-(2+7)=0$. *Predict whether a different choice of $C$ would change the final answer before computing with a second value of $C$.* Getting the SAME final answer regardless of $C$ is the demonstration for MC-2.
- **The missing-half answer.** Compute $\int_1^4(2x)\,dx$ by evaluating $F(4)=16$ alone, then completing the subtraction to get $F(4)-F(1)=16-1=15$. *Predict whether $16$ is the complete answer before completing the second evaluation.* Realizing $16$ alone is NOT the answer, and that a second bound-value and a subtraction were still needed, is the demonstration for MC-3.

## Discovery Questions
Direct instruction is the argued call for the Evaluation Theorem's statement itself (it is a specific consequence of FTC Part 1 that is not independently rediscoverable at this level without the accumulation-function machinery), but the bound-order sign-dependence (MC-1) and the $C$-cancellation (MC-2) are both genuinely discoverable by direct numeric comparison.
1. **Need** — "Compute $[x^2+x]_0^3$ (bounds in the given order) and then $[x^2+x]_3^0$ (bounds swapped). Are the two answers the same?" They are exact negatives.
2. **Playground** — try the same swapped-order comparison on a couple more definite integrals.
3. **Invention** — "Why would swapping the bounds always give the exact negative, rather than some unrelated number?" Let the learner connect it to the formula $F(b)-F(a)$ being the negative of $F(a)-F(b)$.
4. **Collision** — confront a learner who swapped the bounds believing it wouldn't matter with the direct sign-flip evidence.
5. **Formalisation** — state the Evaluation Theorem explicitly, with the upper-bound-first reminder built into the bracket notation's stated meaning.
6. **Compression** — "Top bound's antiderivative value, MINUS bottom bound's antiderivative value — no leftover $C$, every time."

## Teaching Sequence
The bound-order discipline (MC-1) must be established FIRST, since it is the single sign-flipping error that silently corrupts every subsequent answer regardless of how correctly the rest of the computation proceeds — per the Blueprint's own A01, the +C-cancellation proof is written out algebraically immediately after the order is established, so the learner sees BOTH the correct order AND the correct handling of $C$ before independent practice begins. The single-bound-evaluation check (MC-3) is folded into the SAME early practice, since it is a completeness check (did both evaluations happen at all?) rather than a separate conceptual hurdle, and per the Blueprint's own A02, is caught naturally within the worked-example pair's checkpoint. The contrast pair (A03) — definite versus indefinite, correct-versus-reversed bounds, and different-antiderivatives-same-answer — is deliberately placed LAST, once the mechanics are fluent, since it consolidates all three misconceptions into one explicit side-by-side comparison rather than introducing new content. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 4 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the sign-flip swap ($\int_0^3(2x+1)dx$ correct order versus swapped), with the learner predicting the relationship between the two answers BEFORE either is computed. First action; anchors the bound-order discipline concretely.
- **TEST-THINKING: Prediction** — "Will $[F(x)]_a^b$ give the same number as $[F(x)]_b^a$?" asked BEFORE computing either, using the bank-balance analogy as the point of reference. Surfaces MC-1 in one turn.
- **DO: Demonstration** — the C-cancellation reveal (a non-zero-$C$ antiderivative, expanded algebraically), run with the learner verifying the cancellation with a SECOND choice of $C$ independently.
- **TEST-THINKING: Error Analysis** — "A student computed $\int_1^4(2x)dx$ and wrote the answer as $16$. What's missing?" targets MC-3 directly.
- **Does NOT fit: introducing u-substitution or any composite-integrand technique here.** This concept applies the Evaluation Theorem to integrands whose antiderivative is already known directly (via `math.calc.antiderivatives`); u-substitution's own content is the next, separate concept this one unlocks.

## Voice Teaching Notes
The load-bearing sentence is "top bound's value MINUS bottom bound's value — no leftover $C$, every time." Say it every time a new definite integral is evaluated, not just the first. Listen for a learner who reads the integral symbol $\int_a^b$ and immediately evaluates $F(a)$ first, before $F(b)$ — that reading-order habit is the tell for MC-1. Listen for a learner who says "$8+C$" or hesitates over whether to include a constant in a definite-integral answer — that hesitation is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Writes $F(a)-F(b)$ instead of $F(b)-F(a)$** — MC-1. Route to the sign-flip swap demonstration, on the exact integral in question.
- **Appends $+C$ or a specific constant to a definite-integral's final numeric answer** — MC-2. Route to the C-cancellation reveal, on the exact integral in question.
- **Evaluates the antiderivative at only one bound and presents that value as the complete answer** — MC-3. Route to the missing-half-answer demonstration, on the exact integral in question.
- **Correctly evaluates both bounds, subtracts in the upper-minus-lower order, and omits $C$** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 5/5 (⌈0.85×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a factory production-rate net-change problem, explicitly requiring both the definite-integral evaluation AND an interpretation of the result as net change) must include at least one item requiring the learner to articulate the NET-CHANGE interpretation of the result, not merely evaluate the integral mechanically — a gate made only of correct-computation items certifies mechanics without certifying the applied interpretation.

## Tutor Recovery Strategy
The likely utterance here is "why don't I need $+C$ anymore? I just learned I always need it." — a reasonable question given how recently the indefinite integral's own genuine $+C$-requirement was learned. The concept-specific smaller question returns to direct algebraic verification: **"Let $F(x)=x^2+C$. Compute $F(3)+C$ minus... wait, compute $(F(3)+C)-(F(0)+C)$. What happens to the two $C$'s?"** The learner works through the cancellation themselves on a concrete pair of numbers. Then return: "the $C$'s always cancel in a subtraction, no matter what number $C$ is — that's why definite integrals never need it." If the frustration is instead about the bound order, shrink to the bare check: **"Which number is written on TOP of the integral symbol? Evaluate that one first."** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with two embedded precision requirements** (correct bound order and complete two-bound evaluation are both procedural precision points, and the $C$-omission is a conceptual understanding point, all three needed simultaneously for a correct answer). Review by *requiring the learner to write the formula skeleton $F(b)-F(a)$ with both bound values substituted, EXPLICITLY, before simplifying to a final number*, never accepting a bare final answer, since skipping the visible skeleton step lets MC-1 and MC-3 both pass undetected on problems where a lucky arithmetic coincidence produces a plausible-looking wrong answer.
- Concept-specific deviation: keep at least one definite integral in the review rotation where $F(a)$ is NEGATIVE (so the subtraction becomes "minus a negative," i.e. addition), since this specific case is where SINGLE-BOUND-EVALUATION (MC-3) and simple arithmetic slips compound most visibly.
- Interleaving partners: `math.calc.ftc-part1` (the discriminating partner — reviewing the accumulation-function derivative alongside this concept's evaluation procedure keeps the "why does this shortcut work" connection alive) and the upcoming `math.calc.u-substitution`, which this concept directly unlocks.

## Transfer Connections
- **Near**: `math.calc.u-substitution` (a direct extension, applying the SAME Evaluation Theorem to composite integrands via a substitution step first).
- **Far**: improper integrals and multivariable/line integrals, which reuse the same evaluate-and-subtract structure at their own respective bounds or limits.
- **Real-world**: the Blueprint's own transfer probe — total production from a rate function, via $\int_0^6 R(t)\,dt$ — is a direct, literal net-change application, not a metaphor.
- **Expert transfer**: recognizing that ANY quantity accumulated from a known RATE (production, distance from velocity, charge from current) is recoverable via this exact evaluate-and-subtract procedure, applied to the rate function's antiderivative — the same net-change reasoning recurs across every applied accumulation context.

## Cross-Subject Connections
- **Economics/manufacturing**, real: the Blueprint's own transfer probe (total widgets produced from a production-rate function) is a standard, literal net-change application in operations and economics.
- **Physics**, real: net displacement from a velocity function, and net charge from a current function, are both computed via this exact Evaluation Theorem.
- **Engineering**, real: total work done by a variable force, computed as a definite integral of the force function, uses this exact technique.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the production-rate connection, while genuine and central to this concept's own transfer probe, is an application rather than a structural KG dependency.

## Blueprint References
`docs/curriculum/blueprints/math.calc.ftc-part2.md`. Reused by reference, not restated: the Component 1 Cognitive Map, the Component 4 Teaching Actions (A01 P11 representation shift from rectangle approximation to the Evaluation Theorem with the $+C$-cancellation proof written out, A02 P07 worked example pair, A03 P06 contrast pair, A04 P91 mastery gate at MAMR 5/5), the Component 2 Misconception Registry (MC-1, MC-2, MC-3) and Component 5 repair actions (B01, B02, B03), the four-item P77 problem set, and the P76 independence-mode transfer probe (the factory production-rate problem). This entry adds independent birth-type classification for all three misconceptions (the Blueprint marks triggers but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-theorem / guided-discovery-for-the-order-and-cancellation split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.ftc-part1`, `math.calc.antiderivatives`), unlocks (`math.calc.u-substitution`), cross_links (none), difficulty, bloom, mastery_threshold (0.85), and estimated_hours (5) all match the live KG's own fields exactly, confirmed by direct query. This is the third consecutive concept in this batch with zero Blueprint/KG discrepancy (following `math.calc.volume-revolution`).

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 42).
