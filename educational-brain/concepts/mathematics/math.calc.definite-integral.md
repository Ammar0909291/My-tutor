# math.calc.definite-integral

## Identity
- **KG ID**: `math.calc.definite-integral`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.riemann-sums` — load-bearing part: the partition/sample-point/sum machinery and the idea that a limit of these sums exists; this concept is exactly that limit, formalized and given properties.
- **Unlocks**: `math.calc.ftc-part1` (differentiating $\int_a^x f(t)\,dt$ with respect to its upper limit), `math.calc.ftc-part2` (the Fundamental Theorem's computational shortcut $F(b)-F(a)$).
- **Cross-links**: `math.real.riemann-integral` — confirmed genuinely unauthored (`math.real` is an entirely unstarted domain); **independence mode**, matching the Blueprint's own `P76_mode=independence`.
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.80
- **Estimated hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.calc.definite-integral.md` (reused by reference throughout)

## Learning Objective
- The learner can state that $\int_a^b f(x)\,dx=\lim_{n\to\infty}\sum f(x_i^*)\Delta x$ is a single real number — SIGNED area, not total area — with regions below the x-axis contributing negatively.
- The learner can apply the reversal ($\int_a^b f=-\int_b^a f$), additivity ($\int_a^c f=\int_a^b f+\int_b^c f$ for any $b$), and linearity ($\int(\alpha f+\beta g)=\alpha\int f+\beta\int g$) properties to compute integrals from partial information, without needing an antiderivative.
- The learner can evaluate a definite integral geometrically (triangle, rectangle, semicircle) when the antiderivative is unknown or the shape makes computation unnecessary.

## Core Understanding
`math.calc.riemann-sums` built the machinery — partition, sample points, sum, limit. This concept names that limit and gives it a life of its own: $\int_a^b f(x)\,dx$ is a single NUMBER, the SIGNED area between $f$ and the x-axis from $a$ to $b$ — regions where $f>0$ contribute positively, regions where $f<0$ contribute negatively, and they genuinely CANCEL (the integral of an odd function over a symmetric interval is exactly zero, not "the total area of two triangles"). Three properties follow directly from the Riemann sum definition rather than being separate rules to memorize: reversing the limits of integration reverses the sign of every $\Delta x_i=(b-a)/n$ in the sum, so $\int_a^b f=-\int_b^a f$ (and $\int_a^a f=0$, since there is no width at all); splitting the interval at any point $b$ (even outside $[a,c]$) splits the sum, giving $\int_a^c f=\int_a^b f+\int_b^c f$; and scaling or adding functions inside the sum scales or adds the resulting number, giving linearity. Because the integral is DEFINED as this limit — not as "whatever the antiderivative formula gives" — a definite integral over a simple geometric shape (a triangle, a rectangle, a semicircle) can be evaluated directly from that shape's area formula, with no antiderivative needed at all; the Fundamental Theorem of Calculus (met next) is a computational SHORTCUT for the general case, not the definition.

## Mental Models
1. **Beginner — the integral is the area under the curve.** Shade the region, find its area. *Upgrade trigger*: a function that dips below the x-axis, where "area" alone gives the wrong (too-large) answer. *Shelf life*: about one lesson.
2. **Intermediate — signed area: above adds, below subtracts.** $\int_a^b f=A_+-A_-$, where $A_+$ and $A_-$ are the (positive) areas above and below the axis. *Upgrade trigger*: needing to combine integrals given only partial numeric information (additivity, reversal) rather than a picture to shade.
3. **Advanced — the integral is a number defined by a limit, with algebraic properties that follow from that limit, not from geometry alone.** Reversal, additivity, and linearity are provable directly from the Riemann sum's own structure ($\Delta x$ flipping sign, the sum splitting, the sum distributing) — geometry is a convenient INTERPRETATION of the number, not its definition. *Upgrade trigger*: needing to evaluate an integral of a function with no known antiderivative and no obvious picture (comparison/bounding arguments).
4. **Expert — the definite integral is a linear functional on functions.** $\int_a^b(\cdot)\,dx$ takes a function and returns a number, linearly; this is the same abstraction later generalized to inner products, expectation, and measure theory. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is linguistic: "area" means a positive quantity in every prior year of a learner's mathematical life, and the word appears directly in how the integral is informally described — so a region below the x-axis gets its (positive) area ADDED rather than subtracted, and $\int_{-1}^1 x\,dx$ (which is exactly $0$, by symmetry) is computed as $1$ (two triangles' areas added) instead (MC-1, INTEGRAL-IS-ALWAYS-POSITIVE-AREA). A second failure is instructional: because the Fundamental Theorem of Calculus is the tool most often used to actually COMPUTE integrals in a typical course, a learner conflates the DEFINITION (a Riemann sum limit, computable from geometry alone for simple shapes) with the antiderivative-based COMPUTATION METHOD, and concludes an integral like $\int_0^2\sqrt{4-x^2}\,dx$ (a quarter-circle, area $\pi$) is simply unsolvable because "I don't know the antiderivative" (MC-2, DEFINITE-INTEGRAL-NEEDS-ANTIDERIVATIVE). The third failure imports a true fact about ordinary sums — $\sum a_i$ does not depend on the order the terms are listed — into a setting where order genuinely matters: reversing the limits of integration reverses the DIRECTION of traversal, which flips the sign of $\Delta x$ in every term of the underlying sum, so $\int_a^b f\ne\int_b^a f$ in general (MC-3, INTEGRAL-ORDER-DOESNT-MATTER).

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3) and its Component 4/5 repair actions B01–B03. **The Blueprint's Misconception Registry carries no explicit birth-type column** (the older document format, matching `math.calc.limits`/`continuity`/`derivative-intro`/`derivative-definition`); all three classifications below are independently assigned here.

- **MC-1 — INTEGRAL-IS-ALWAYS-POSITIVE-AREA** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 3, language contamination. The Blueprint's own root-cause note names this directly: "'area' is always positive in everyday language... the word 'area' in the definition causes the learner to interpret the integral as absolute area." The everyday word carries a connotation (always positive) the mathematical object does not have.
  - **Characteristic phrase**: given $f$ positive on part of an interval and negative on another, adding both regions' (positive) areas rather than subtracting the negative-region contribution.
  - **Detection probe** (verbatim, Blueprint's B01 P41): "$\int_{-1}^1 x\,dx$... What is it?" offering "(A) $1/2+1/2=1$ (total area)" vs. "(B) $-1/2+1/2=0$ (signed area)".
  - **Repair**: Blueprint Repair Action B01 — name $x$ as an odd function on a symmetric interval, so the halves genuinely cancel; the Riemann sum makes this precise, since $f(x_i^*)$ is negative on the lower half, making those summands negative.
  - **Verification of death**: given a fresh sign-changing function with region areas stated numerically, the learner subtracts the negative-region area rather than adding it, unprompted.

- **MC-2 — DEFINITE-INTEGRAL-NEEDS-ANTIDERIVATIVE**
  - **Birth type**: Type 5, instruction-induced. The Blueprint's own root-cause note: "the Fundamental Theorem of Calculus (FTC) is the primary computational tool for definite integrals in most curricula; learners conflate the DEFINITION... with the COMPUTATION method." The teaching sequence that emphasizes FTC produces the belief that FTC IS the definition.
  - **Characteristic phrase**: "I can't evaluate $\int_0^2\sqrt{4-x^2}\,dx$ because I don't know the antiderivative of $\sqrt{4-x^2}$."
  - **Detection probe** (verbatim, Blueprint's B02 P41): "Evaluate $\int_0^3\sqrt{9-x^2}\,dx$" offering "(A) Can't do it — no antiderivative" vs. "(B) recognize the quarter-circle, area $=9\pi/4$".
  - **Repair**: Blueprint Repair Action B02 — the FTC is a shortcut for many functions; for a shape recognizable geometrically (triangle, rectangle, semicircle), compute the area directly, no antiderivative required.
  - **Verification of death**: given a fresh geometrically-recognizable integral, the learner computes it from the shape's area formula without first searching for an antiderivative.

- **MC-3 — INTEGRAL-ORDER-DOESNT-MATTER**
  - **Birth type**: Type 1, overgeneralization of the commutativity of addition — "$\sum a_i$ doesn't depend on the order of the summands," true for ordinary sums, wrongly extended to integrals, where the limits of integration encode a DIRECTION.
  - **Characteristic phrase**: "$\int_3^1 x\,dx=\int_1^3 x\,dx=4$."
  - **Detection probe** (verbatim, Blueprint's B03 P41): "$\int_1^3 x\,dx=4$. What is $\int_3^1 x\,dx$?" offering "(A) also 4" vs. "(B) $-4$".
  - **Repair**: Blueprint Repair Action B03 — in the Riemann sum, $\Delta x=(b-a)/n$; when $a>b$, $(b-a)<0$, so every $\Delta x$ flips sign and the whole sum negates. $\int_a^a f=0$ follows the same way, since $(b-a)=0$ there.
  - **Verification of death**: given $\int_a^b f$ and asked for $\int_b^a f$, the learner states the negated value without being prompted to check the sign.

## Analogies
- **Best — net displacement.** A particle moving right contributes positive distance, moving left contributes negative distance to the NET displacement — not the total distance traveled. $\int v(t)\,dt$ is exactly this net quantity (the Blueprint's own primary A01 representation).
- **Alternative — a bank ledger.** Deposits (above the axis) add, withdrawals (below the axis) subtract; the "total area" misconception is like adding the absolute value of every withdrawal to the balance instead of subtracting it.
- **ANTI-ANALOGY — "the integral is the area under the curve."** This is the exact phrase that licenses MC-1: "under the curve" carries no signed connotation, and a beginner reads it as "the shaded region's size." Say "the integral is the SIGNED area between the curve and the x-axis" instead, every time.

## Demonstrations
- **The odd-function cancellation.** Compute $\int_{-1}^1 x\,dx$ by splitting into the below-axis triangle ($-1/2$) and above-axis triangle ($+1/2$). *Predict the sum before adding.* Getting exactly $0$, not $1$, is the demonstration for MC-1.
- **The geometry-first evaluation.** Present $\int_0^3\sqrt{9-x^2}\,dx$ and ask for the antiderivative first (none obvious), THEN reveal the quarter-circle picture and compute $9\pi/4$ directly. *Predict whether it's solvable before the picture is shown.* The reveal is the demonstration for MC-2.
- **The reversal sign-flip.** Compute $\int_1^3 x\,dx=4$ and $\int_3^1 x\,dx$ side by side via the reversal rule, then verify numerically that a Riemann sum built with decreasing sample points does produce negative $\Delta x$ values throughout.

## Discovery Questions
Direct instruction is the argued call for the formal definition and its three algebraic properties (these are conventions/derivable consequences of the Riemann sum's own structure, not something a learner reinvents from scratch), but the signed-vs-total-area distinction is genuinely discoverable from a picture.
1. **Need** — "Find $\int_{-1}^1 x\,dx$ two ways: (a) shading the total region and finding its area, (b) computing the Riemann sum directly with a few sample points." The two methods disagree.
2. **Playground** — try a few different odd functions on symmetric intervals and see whether the "total area" answer or the "signed sum" answer keeps matching a directly-computed Riemann sum.
3. **Invention** — "Why does the Riemann sum keep giving zero for these?" Let the learner notice the negative-side terms are themselves negative numbers.
4. **Collision** — confront a learner who computed "total area" with the direct Riemann sum's own arithmetic, term by term.
5. **Formalisation** — state the signed-area interpretation and the definition explicitly.
6. **Compression** — "Above the axis: add. Below: subtract. The integral keeps score, it doesn't just measure size."

## Teaching Sequence
The signed-area distinction (MC-1) must be established BEFORE the algebraic properties (reversal, additivity, linearity) in A02 — a learner still adding unsigned areas will misapply additivity itself (treating $\int_a^c f=\int_a^b f+\int_b^c f$ as an area-sum rather than a signed-number identity). The geometry-first evaluation habit (targeting MC-2) should be established using SEVERAL simple shapes before FTC is introduced in the next concept, per the Blueprint's own Teaching Notes — "MC-2 cannot form if the geometric interpretation is primary." The reversal property (MC-3) is best taught immediately alongside additivity, since both are provable from the identical fact about $\Delta x$'s sign, and separating them invites treating reversal as an arbitrary rule to memorize rather than a consequence already understood. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 4 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the odd-function cancellation ($\int_{-1}^1 x\,dx=0$), computed by the learner from both the signed-region breakdown and a direct Riemann sum. First action; anchors signed area concretely.
- **TEST-THINKING: Prediction** — "Is $\int_0^3\sqrt{9-x^2}\,dx$ solvable without an antiderivative?" asked BEFORE revealing the quarter-circle picture. Surfaces MC-2 in one turn.
- **DO: Demonstration** — the reversal sign-flip, run with the learner computing $\Delta x$'s sign for both directions themselves.
- **TEST-THINKING: Error Analysis** — "A student computed $\int_{-2}^2 x^3\,dx$ as the sum of two equal-area triangles, getting a positive number. What's wrong?" targets MC-1 with a fresh odd function.
- **Does NOT fit: introducing the Fundamental Theorem of Calculus before the signed-area/geometry-first habits are solid.** `math.calc.ftc-part1`/`ftc-part2` own that; introducing it early lets a learner reach for antiderivatives reflexively and never build the geometric-evaluation instinct.

## Voice Teaching Notes
The load-bearing sentence is "above the axis, add; below, subtract — the integral keeps score." Say it every time a sign-changing function's integral is discussed, not just the first. Listen for a learner describing a region below the axis as simply "the area there" without qualifying its sign — that omission, even when the shape is correctly identified, is the tell that MC-1 is still active. Listen for immediate reaching for "what's the antiderivative?" before even glancing at the graph's shape — fast reflexive antiderivative-seeking, more than a hesitant guess, signals MC-2 is operating as an assumed first step rather than a genuine choice. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Adds unsigned region areas for a sign-changing function** — MC-1. Route to the odd-function cancellation demonstration, never to a restatement of "signed area."
- **Declares an integral unsolvable purely because the antiderivative is unknown, without checking the shape** — MC-2. Route to the geometry-first evaluation, on the exact integral in question.
- **States or implies $\int_a^b f=\int_b^a f$** — MC-3. Route to the reversal sign-flip, checking $\Delta x$'s sign directly.
- **Correctly signs each region, checks for a recognizable shape before reaching for antiderivatives, and applies reversal/additivity fluently from partial information** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.80×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a two-region signed-area problem with all four of value/reversal/additivity) must include at least one item where a naive unsigned-area answer would differ from the correct signed one — a gate made only of same-sign regions certifies MC-1's shortcut rather than the full concept.

## Tutor Recovery Strategy
The likely utterance here is "so is it just the area or not?" — a reasonable question given how loosely "area" gets used elsewhere in math. The concept-specific smaller question returns to the bank ledger: **"If you deposit $50 and then withdraw $30, is your net change $80 or $20?"** The learner says $20, correctly, on ground they already own. Then return: "the region above the axis is a deposit, the region below is a withdrawal — the integral is the NET change, not the total amount that moved." If the frustration is instead about the reversal property feeling arbitrary, shrink to the bare check: **"If you drive from mile marker 1 to mile marker 3, then immediately drive back from 3 to 1 — did you travel the same distance both times, in the same direction?"** The direction-reversal is the whole argument. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **conceptual distinction with three derived procedures** (signed vs. unsigned area is conceptual; reversal/additivity/linearity are procedures that follow from it). Review by *applying the properties to a sign-changing function*, not a same-sign one, since a same-sign review item lets MC-1's shortcut pass undetected.
- Concept-specific deviation: keep at least one geometrically-evaluable integral (no obvious antiderivative) permanently in the review rotation — a review that only ever uses polynomial integrands never re-exercises the geometry-first habit, and MC-2 regrows once FTC becomes routine.
- Interleaving partners: `math.calc.riemann-sums` (the discriminating partner — reviewing the raw sum alongside the named integral keeps the definition-vs-shortcut distinction alive) and the upcoming `math.calc.ftc-part2`, whose entire value depends on this concept's signed-area foundation being solid first.

## Transfer Connections
- **Near**: `math.calc.ftc-part1`/`ftc-part2` (the Fundamental Theorem, which supplies the antiderivative shortcut this concept's own MC-2 warns against over-relying on prematurely).
- **Far**: `math.real.riemann-integral` — the fully rigorous treatment of the same limit, genuinely unauthored at present (independence mode, per the Blueprint's own `P76_mode=independence`).
- **Real-world**: net displacement from a velocity graph, net profit/loss from a rate-of-change graph, net charge from a current-vs-time graph — all instances of signed accumulation.
- **Expert transfer**: the general pattern of a linear functional on functions — the same abstraction recurs as expectation in probability, work as a line integral in physics, and inner products in linear algebra.

## Cross-Subject Connections
- **Physics**, genuine and central: net displacement from velocity, net work from a force-vs-displacement graph — both signed accumulations exactly matching this concept's own framing, not a metaphor.
- **Economics**, real: net profit over a period from a marginal-profit rate, where negative periods (losses) genuinely subtract rather than add to the total.
- **Chemistry**, real: net charge transferred over time from a current-vs-time graph, where current direction (sign) matters exactly as it does here.
- The KG records `cross_links: ['math.real.riemann-integral']` — a single, genuinely-unauthored-domain link, not the physics/economics/chemistry connections above, which are real but unrecorded in the KG.

## Blueprint References
`docs/curriculum/blueprints/math.calc.definite-integral.md`. Reused by reference, not restated: the Component 1 Cognitive Map, the Component 2 Misconception Registry (MC-1..MC-3), the Component 4 teaching actions (A01 P11 the net-displacement/signed-area/formal-definition representation shift, A02 P06 the reversal/additivity/linearity contrast, A03 P04 pattern induction over linearity/symmetry/comparison/geometric-computation, A04 P91 mastery gate at MAMR 4/5), the P77 four-item problem set, and the P76 independence-mode transfer probe. This entry adds independent birth-type classification for all three misconceptions (the Blueprint carries no explicit birth-type column, matching the older-document-format gap already found across `math.calc.limits`/`continuity`/`derivative-intro`/`derivative-definition`), the mental-model ladder, the anti-analogy, the argued direct-instruction-for-the-definition / guided-discovery-for-the-sign-distinction split, and the ordering constraint placing the signed-area distinction before the algebraic properties.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (`math.calc.ftc-part1`, `math.calc.ftc-part2`) and cross_links (`math.real.riemann-integral`) match the live KG's own fields exactly, confirmed by direct query against `docs/mathematics/kg/graph.json`.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 39).
