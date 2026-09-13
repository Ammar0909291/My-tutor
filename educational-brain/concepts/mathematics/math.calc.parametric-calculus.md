# math.calc.parametric-calculus

## Identity
- **KG ID**: `math.calc.parametric-calculus`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.parametric-curves` — load-bearing part: the curve representation $x(t),y(t)$ itself, the object this concept's differentiation and arc-length formulas operate on.
  - `math.calc.chain-rule` — load-bearing part: $\frac{dy}{dx}=\frac{dy/dt}{dx/dt}$ is derived directly from the chain-rule relation $\frac{dy}{dt}=\frac{dy}{dx}\cdot\frac{dx}{dt}$.
  - `math.calc.definite-integral` — load-bearing part: the arc-length formula is a definite integral, requiring proper-integral fluency to evaluate.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.70 (MAMR = ⌈0.70×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.calc.parametric-calculus.md` (reused by reference throughout)

## Learning Objective
- The learner can compute $\frac{dy}{dx}$ for a parametric curve as $\frac{dy/dt}{dx/dt}$ — NOT $\frac{dy}{dt}$ or $\frac{dx}{dt}$ alone — requiring $\frac{dx}{dt}\neq0$ at the point in question.
- The learner can compute a parametric curve's arc length as $L=\int\sqrt{(dx/dt)^2+(dy/dt)^2}\,dt$, recognizing this as the direct parametric analogue of the Pythagorean "distance traveled" idea, generalizing the $y=f(x)$ arc-length formula.
- The learner can recognize that the SECOND derivative $\frac{d^2y}{dx^2}$ requires differentiating $\frac{dy}{dx}$ (itself a function of $t$) WITH RESPECT TO $t$ AGAIN, then dividing by $\frac{dx}{dt}$ ONCE MORE — a genuine two-step process, not a repetition of the first-derivative formula.

## Core Understanding
For a curve given parametrically by $x=x(t)$, $y=y(t)$, the derivative $\frac{dy}{dx}$ is found via $\frac{dy}{dx}=\frac{dy/dt}{dx/dt}$ (provided $dx/dt\neq0$) — a direct consequence of the chain rule, since $y$ depends on $t$ and $t$ implicitly determines $x$: $\frac{dy}{dt}=\frac{dy}{dx}\cdot\frac{dx}{dt}$, and solving for $\frac{dy}{dx}$ gives exactly this ratio. Computing $\frac{dy}{dx}$ therefore requires the DIVISION step — never $\frac{dy}{dt}$ reported alone, since $t$ and $x$ are genuinely different variables related by a possibly non-trivial rate $dx/dt$. The ARC LENGTH of the curve from $t=\alpha$ to $t=\beta$ is $L=\int_\alpha^\beta\sqrt{(dx/dt)^2+(dy/dt)^2}\,dt$ — a direct generalization of the "distance traveled equals speed integrated over time" idea, where $\sqrt{(dx/dt)^2+(dy/dt)^2}$ is the instantaneous speed of the point tracing the curve, exactly the Pythagorean combination of the horizontal and vertical velocity components. Finally, the SECOND derivative $\frac{d^2y}{dx^2}$ is NOT obtained by naively repeating the first-derivative pattern: since $\frac{dy}{dx}$ is itself some expression in terms of $t$, computing $\frac{d^2y}{dx^2}$ genuinely requires TWO separate steps — differentiate that first-derivative expression with respect to $t$, THEN divide the result by $\frac{dx}{dt}$ AGAIN: $\frac{d^2y}{dx^2}=\frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{dx/dt}$.

## Mental Models
1. **Beginner — "the slope of a parametric curve is dy/dt."** The chain-rule-derived division step is missing entirely, and $\frac{dy}{dt}$ is treated as if it directly answered the "slope in terms of $x$" question. *Upgrade trigger*: comparing a parametric computation against the same curve's slope computed a different way and finding a mismatch.
2. **Intermediate — "$\frac{dy}{dx}$ is $\frac{dy/dt}{dx/dt}$ — divide the two rates."** The core computational discipline is now correct for first derivatives. *Upgrade trigger*: being asked for the SECOND derivative and attempting to simply differentiate the first-derivative formula "the same way" without recognizing the extra division step required.
3. **Advanced — "the arc-length formula's squared-and-summed structure comes directly from the Pythagorean theorem applied to instantaneous velocity components, and the second derivative genuinely requires differentiating the FIRST derivative's own $t$-expression before dividing by $dx/dt$ a second time."** Both the geometric origin of the arc-length formula and the genuinely two-step nature of the second derivative are now explicit. *Upgrade trigger*: needing to apply these same techniques to a curve given in polar coordinates, a related but structurally distinct representation.
4. **Expert — parametric calculus is one instance of a broader pattern: whenever a curve or quantity is described via an auxiliary parameter rather than directly, every calculus operation (differentiation, arc length, and beyond) must be re-derived through that parameter via the chain rule, rather than assumed to transfer unchanged.** The learner anticipates this re-derivation requirement whenever a new parametrized representation is encountered. *Shelf life*: permanent.

## Why Students Fail
The dominant failure treats the parametric derivative as simply $\frac{dy}{dt}$ reported directly, omitting the required DIVISION by $\frac{dx}{dt}$ — effectively treating $x$ and $t$ as if they were the same variable, when in fact the chain-rule-derived division step is mathematically essential to convert a rate-with-respect-to-$t$ into a genuine slope-with-respect-to-$x$ (MC-1, PARAMETRIC-DY-DX-COMPUTED-AS-DY-DT-ALONE-WITHOUT-DIVIDING-BY-DX-DT) — a Type 4 notation-induced gap, since $\frac{dy}{dt}$ and $\frac{dy}{dx}$ look superficially similar (both "$dy$ over something") and the specific denominator's identity is easy to lose track of under notational pressure. A second, distinct failure omits the SQUARING step when assembling the arc-length integrand, writing $\sqrt{dx/dt+dy/dt}$ instead of the correct $\sqrt{(dx/dt)^2+(dy/dt)^2}$ — losing the Pythagorean structure entirely and producing an expression with no genuine geometric meaning (MC-2, ARC-LENGTH-FORMULA-MISSING-THE-SQUARING-STEP-ON-EACH-DERIVATIVE-TERM) — a Type 1 overgeneralization of a simpler additive pattern (perhaps recalling a formula that merely SUMS two rates elsewhere) extended into a context that specifically requires the Pythagorean squared-and-summed structure this concept's own arc-length formula depends on.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its own repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (both "Foundational") but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — PARAMETRIC-DY-DX-COMPUTED-AS-DY-DT-ALONE-WITHOUT-DIVIDING-BY-DX-DT** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 4, notation-induced. $\frac{dy}{dt}$ and $\frac{dy}{dx}$ share the visually similar "$dy$ over" structure, obscuring that the denominator's specific identity ($t$ versus $x$) is not interchangeable, and the chain-rule-derived division by $\frac{dx}{dt}$ is mathematically required to convert between them.
  - **Characteristic phrase**: reporting $\frac{dy}{dx}$ as simply $\frac{dy}{dt}$, without the division step.
  - **Detection probe** (Blueprint's A01 hook): check whether the division by $dx/dt$ is correctly performed.
  - **Repair**: Blueprint Repair Action B01 — re-derive the formula from the chain rule relation $\frac{dy}{dt}=\left(\frac{dy}{dx}\right)\left(\frac{dx}{dt}\right)$, solving explicitly for $\frac{dy}{dx}$.
  - **Verification of death**: given a fresh parametric curve, the learner computes both $\frac{dx}{dt}$ and $\frac{dy}{dt}$ separately and explicitly divides before reporting $\frac{dy}{dx}$.

- **MC-2 — ARC-LENGTH-FORMULA-MISSING-THE-SQUARING-STEP-ON-EACH-DERIVATIVE-TERM** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization. A simpler pattern of adding two rates directly (without squaring) is extended into the arc-length context, which specifically requires the Pythagorean squared-and-summed structure to correctly represent instantaneous speed as a combination of two perpendicular velocity components.
  - **Characteristic phrase**: writing $\sqrt{dx/dt+dy/dt}$ instead of $\sqrt{(dx/dt)^2+(dy/dt)^2}$ in the arc-length integrand.
  - **Detection probe** (Blueprint's A02 hook): this directly targets MC-2 (omitting the squaring step in the arc-length formula).
  - **Repair**: Blueprint Repair Action B02 — re-derive the formula from the Pythagorean "distance = speed × time" idea, explicitly squaring each velocity component.
  - **Verification of death**: given a fresh parametric curve, the learner sets up the arc-length integral with both derivative terms correctly squared before being added under the square root.

## Analogies
- **Best — converting a car's speedometer reading (speed per time) into "steepness per horizontal distance" on a hill.** A car's speed is naturally measured against TIME, but if you want to know how steep the road is (a rate against HORIZONTAL DISTANCE instead), you must divide the vertical rate by the horizontal rate — exactly the chain-rule division converting $\frac{dy}{dt}$-and-$\frac{dx}{dt}$ into the genuine slope $\frac{dy}{dx}$.
- **Alternative — a ship's true speed combining its northward and eastward velocity components.** A ship moving simultaneously north and east has a true speed found by the Pythagorean combination of its two component speeds, $\sqrt{(\text{north speed})^2+(\text{east speed})^2}$ — exactly the arc-length integrand's own structure, combining $dx/dt$ and $dy/dt$.
- **ANTI-ANALOGY — "the parametric derivative is just dy/dt, since t is basically standing in for x."** This phrasing licenses MC-1 directly, implying $t$ and $x$ can be treated interchangeably, when the division by $dx/dt$ is mathematically essential precisely because they are genuinely different variables. Say "$t$ is a completely separate variable from $x$ — converting a $t$-rate into an $x$-rate always requires dividing by $dx/dt$" instead.

## Demonstrations
- **The missing-division catch.** For $x(t)=t^2$, $y(t)=t^3$, compute $\frac{dy}{dt}=3t^2$ and present it, unmodified, as $\frac{dy}{dx}$. *Predict, before dividing by $\frac{dx}{dt}=2t$, whether this un-divided value is already the correct slope.* Getting the WRONG answer (missing the division to reach the correct $\frac{3t}{2}$) is the demonstration for MC-1.
- **The unsquared-formula check.** For $x(t)=\cos t$, $y(t)=\sin t$ (a unit circle), compute the arc length from $t=0$ to $t=\pi$ using BOTH the unsquared formula $\int\sqrt{dx/dt+dy/dt}\,dt$ and the correct squared formula, then compare against the known half-circumference $\pi$. *Predict, before comparing, whether the unsquared formula will give a sensible geometric answer.* Finding the unsquared version produces a nonsensical or mismatched result (while the squared version correctly gives $\pi$) is the demonstration for MC-2.
- **The two-step second-derivative computation.** For $x(t)=t^2$, $y(t)=t^3$ (from Example 1, where $\frac{dy}{dx}=\frac{3t}{2}$), compute $\frac{d^2y}{dx^2}$ by differentiating $\frac{3t}{2}$ with respect to $t$ (getting $\frac32$), then dividing by $\frac{dx}{dt}=2t$ AGAIN. *Predict, before computing, whether a single differentiation step will suffice.* Confirming the genuinely two-step process is required is the demonstration reinforcing LO3.

## Discovery Questions
Direct instruction is the argued call for the formal derivation of both formulas from the chain rule and the Pythagorean theorem (best presented explicitly), but the missing-division consequence (MC-1) and the missing-squaring consequence (MC-2) are both genuinely discoverable by direct comparison.
1. **Need** — "For $x(t)=t^2$, $y(t)=t^3$, is $\frac{dy}{dt}=3t^2$ already the slope $\frac{dy}{dx}$, or does something else need to happen first?" Dividing by $\frac{dx}{dt}$ changes the answer.
2. **Playground** — try the same division-versus-no-division comparison on a couple more parametric curves.
3. **Invention** — "Why does the slope formula need a division step, when $\frac{dy}{dt}$ already looks like a rate of change?" Let the learner connect it to $t$ and $x$ being genuinely different variables.
4. **Collision** — confront a learner who reported $\frac{dy}{dt}$ alone as the slope with the direct mismatch against the known geometric slope.
5. **Formalisation** — state both formulas precisely: $\frac{dy}{dx}=\frac{dy/dt}{dx/dt}$; $L=\int\sqrt{(dx/dt)^2+(dy/dt)^2}\,dt$.
6. **Compression** — "Divide for slope. Square-then-sum for length."

## Teaching Sequence
The division-step discipline for $\frac{dy}{dx}$ (MC-1, per the Blueprint's own A01) must be established FIRST, since it is derived directly from the chain rule already mastered and is the most foundational of the three learning objectives. The arc-length formula and its required squaring step (MC-2, per the Blueprint's own A02) follows, using the unit-circle sanity check to make the Pythagorean origin of the formula vivid and verifiable against a known geometric fact. The second-derivative's genuinely two-step nature (per the Blueprint's own A03) is introduced LAST, once both the division discipline and the arc-length formula are fluent, since it directly reuses the first-derivative formula as its own starting point rather than introducing independent new content. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the missing-division catch (Example 1), computing $\frac{dy}{dt}$ and $\frac{dx}{dt}$ separately and explicitly dividing to reach $\frac{dy}{dx}$. First action; anchors the division-step discipline concretely.
- **TEST-THINKING: Prediction** — "Is $\frac{dy}{dt}$ alone already the correct slope $\frac{dy}{dx}$, or is another step needed?" asked BEFORE working through the full computation. Surfaces MC-1 in one turn.
- **DO: Demonstration** — the unit-circle arc-length sanity check (Example 2), verifying the squared-and-summed formula against the known half-circumference $\pi$.
- **TEST-THINKING: Error Analysis** — "A student wrote the arc-length integrand as $\sqrt{dx/dt+dy/dt}$, without squaring either term. What's wrong?" targets MC-2 directly.
- **Does NOT fit: arc length or calculus for curves given in polar coordinates, or surface area of revolution for parametric curves, here.** Those extensions belong to more advanced or separately-authored treatments not covered by this specific concept.

## Voice Teaching Notes
The load-bearing sentence is "divide for slope, square-then-sum for length — $t$ is never a stand-in for $x$." Say it every time a new parametric-calculus problem is set up, not just the first. Listen for a learner who reports $\frac{dy}{dt}$ directly as "the slope," with no division step mentioned — that specific omission is the tell for MC-1. Listen for a learner who writes the arc-length integrand without visible squaring on either term — that specific formula shape is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Reports $\frac{dy}{dt}$ directly as the slope $\frac{dy}{dx}$, without dividing by $\frac{dx}{dt}$** — MC-1. Route to the missing-division catch, on the exact curve in question.
- **Sets up the arc-length integrand without squaring both derivative terms before summing** — MC-2. Route to the unsquared-formula check, on the exact curve in question.
- **Correctly divides for the first derivative, squares-and-sums for arc length, and recognizes the second derivative as a genuine two-step process** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.70×5⌉=4). The 4-item P77 set plus the P76 transfer probe (the robotic-arm circular-path problem) must include at least one item requiring the learner to verify their arc-length setup against a known geometric result, not merely execute the formula mechanically — a gate made only of correct-formula-application items risks certifying pattern-matching without certifying the sanity-checking discipline against MC-2.

## Tutor Recovery Strategy
The likely utterance here is "I already found dy/dt — isn't that the slope?" — a reasonable-sounding shortcut given how naturally $\frac{dy}{dt}$ reads as "a rate of change." The concept-specific smaller question returns to a direct chain-rule check: **"What does $\frac{dy}{dt}$ actually measure — how fast $y$ changes as $t$ changes, or how fast $y$ changes as $x$ changes?"** The learner recognizes $\frac{dy}{dt}$ measures change against $t$, not $x$. Then return: "exactly — to get the slope AGAINST $x$, you need to account for how fast $x$ ITSELF is changing too. Dividing by $\frac{dx}{dt}$ does exactly that conversion." If the frustration is instead about the arc-length squaring step, shrink to the bare check: **"If you're combining a horizontal speed and a vertical speed into one true speed, do you just ADD them, or is there a specific geometric way to combine them?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded variable-conversion requirement** (recognizing that $t$ is never interchangeable with $x$, and that converting between $t$-rates and $x$-rates always requires the chain-rule division, is the single most load-bearing discipline in this concept). Review by *requiring the learner to state explicitly, before reporting any parametric slope, which variable each derivative in their computation is taken with respect to*, never accepting a correctly-computed final slope alone as evidence of understanding, since a learner can occasionally reach a correct-looking numeric answer through a coincidental simplification while having genuinely skipped the division step.
- Concept-specific deviation: keep at least one review item requiring the SECOND derivative $\frac{d^2y}{dx^2}$ (not just the first), so the genuinely-two-step discipline stays exercised rather than atrophying on a steady diet of first-derivative-only problems.
- Interleaving partners: `math.calc.chain-rule` (the discriminating partner — reviewing the ordinary chain rule alongside this concept keeps the division-step's own derivation explicit) and `math.calc.arc-length`, whose own $y=f(x)$ arc-length formula this concept's parametric version directly generalizes.

## Transfer Connections
- **Near**: `math.calc.arc-length` (the $y=f(x)$-specific arc-length formula this concept's parametric version directly generalizes).
- **Far**: line integrals (`math.calc.line-integrals`, deferred to a future batch) — both extend the same "speed integrated along a parametrized path" idea to more general settings, including curves in three dimensions and vector fields.
- **Real-world**: the Blueprint's own transfer probe — a robotic arm's end-effector tracing a circular path — is a direct, literal robotics application, computing both instantaneous path direction and total path length.
- **Expert transfer**: recognizing that whenever a curve or quantity is described through an AUXILIARY parameter rather than directly, every calculus operation must be re-derived through that parameter via the chain rule — a general representational discipline that recurs whenever a new parametrized description (polar coordinates, vector-valued functions, and beyond) is introduced.

## Cross-Subject Connections
- **Robotics**, real: the Blueprint's own transfer probe (a robotic arm's end-effector tracing a parametrized path) is a standard, literal application in motion planning and path-length computation.
- **Physics**, real: computing the instantaneous velocity direction and total distance traveled by a particle whose position is given parametrically in time uses this exact technique.
- **Computer graphics**, real: parametric curves (Bézier curves, splines) are foundational to computer-graphics path and animation systems, and their slopes and arc lengths are computed via exactly this machinery.
- No genuine KG cross_link exists for this concept.

## Blueprint References
`docs/curriculum/blueprints/math.calc.parametric-calculus.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the basic $\frac{dy}{dx}$ computation breaking MC-1, Example 2 the unit-circle arc-length sanity check breaking MC-2, Example 3 the two-step second-derivative computation), the Component 5 Teaching Actions (A01 P64 conceptual shift, A02 P06 contrast pair, A03 P11 representation shift, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the four-item P77 problem set, and the P76 independence-mode transfer probe (the robotic-arm circular-path problem). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-formula-derivations / guided-discovery-for-the-missing-division-and-missing-squaring split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.parametric-curves`, `math.calc.chain-rule`, `math.calc.definite-integral`), unlocks (none), cross_links (none), difficulty (advanced), bloom (apply), mastery_threshold (0.70), and estimated_hours (6) all match the live KG's own fields exactly, confirmed by direct query. This is the fourth of four zero-discrepancy concepts in this batch, continuing the streak restarted in Batch 43 after Batch 42's `arc-length` broke the prior five-consecutive-zero run — making Batch 47 the FIFTH consecutive all-4-zero-discrepancy batch.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 47).
