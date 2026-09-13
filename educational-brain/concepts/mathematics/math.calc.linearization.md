# math.calc.linearization

## Identity
- **KG ID**: `math.calc.linearization`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.derivative-definition` — load-bearing part: $f'(a)$ is used here not merely as a slope NUMBER but as the input to a full linear FUNCTION built from it; this concept adds nothing new to computing $f'(a)$ itself.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.calc.linearization.md` (reused by reference throughout)

## Learning Objective
- The learner can construct the linearization $L(x)=f(a)+f'(a)(x-a)$ — the tangent line at $a$, built from the point-slope line formula using the already-computed derivative $f'(a)$ as the slope.
- The learner can use $L(x)$ to approximate $f(x)$ for $x$ near $a$, and can state explicitly that the approximation's accuracy DEGRADES as $x$ moves farther from $a$ — a genuine, measurable phenomenon, not a uniform guarantee.
- The learner can state, at orientation level, that the differential $dy=f'(x)\,dx$ formalizes the identical linearization idea as an INCREMENT approximation ($\Delta y\approx dy$ for small $\Delta x$), without needing the full Taylor-remainder derivation.

## Core Understanding
Linearization does not introduce a new computational skill — it REUSES the derivative's own slope value. `math.calc.derivative-definition` computes $f'(a)$ as a single number, the tangent line's slope at $a$; linearization plugs that exact number into the ordinary point-slope line formula, giving $L(x)=f(a)+f'(a)(x-a)$ — a full linear FUNCTION, not merely a slope. This line matches $f$ exactly AT $a$ (both equal $f(a)$ there) and matches $f$'s slope at $a$ (both equal $f'(a)$), but for $x\ne a$, $L(x)$ is only an APPROXIMATION, and the ERROR $|f(x)-L(x)|$ genuinely GROWS as $x$ moves farther from $a$, since a curved function bends away from its own tangent line — this is not a theoretical caveat but a measurable, distance-dependent phenomenon (the Blueprint's own worked example shows the error at a nearby point roughly a thousand times smaller, relatively, than at a distant one). The DIFFERENTIAL formalizes the identical idea from a different angle: writing $\Delta x=x-a$ and $\Delta y=f(x)-f(a)$ (the ACTUAL change), the differential $dy=f'(x)\,dx$ (with $dx=\Delta x$) gives $dy\approx\Delta y$ for small $\Delta x$ — literally the same arithmetic as $L(x)-f(a)$, simply reframed as predicting a CHANGE rather than a VALUE. This previews error-propagation applications and Taylor's theorem's higher-order refinements, both deliberately deferred beyond this concept's core scope.

## Mental Models
1. **Beginner — linearization is a new formula to memorize: $L(x)=f(a)+f'(a)(x-a)$.** Plug in numbers, get an approximate value. *Upgrade trigger*: being asked WHY this particular formula, rather than some other combination of $f(a)$ and $f'(a)$ — this model has no answer beyond "that's the formula."
2. **Intermediate — linearization is the point-slope line formula, with the slope supplied by the derivative.** $L(x)=f(a)+f'(a)(x-a)$ is recognizably $y=y_1+m(x-x_1)$ — nothing new, just a familiar tool with the slope already computed for you. *Upgrade trigger*: using $L(x)$ far from $a$ and getting a badly wrong answer, which this model alone doesn't predict.
3. **Advanced — the approximation's accuracy is a genuine, distance-dependent phenomenon.** $L(x)$ matches $f$ exactly only AT $a$; the error grows as $x$ moves away, because $f$ curves and the tangent line does not follow the curve. *Upgrade trigger*: needing to connect the value-approximation framing ($L(x)\approx f(x)$) to the increment framing ($dy\approx\Delta y$) as literally the same computation.
4. **Expert — linearization is the first-order Taylor approximation; the differential is its increment form.** $L(x)=f(a)+f'(a)(x-a)$ is the degree-1 Taylor polynomial at $a$; higher-order terms (quadratic, cubic, ...) refine it, and the error term this concept treats only qualitatively becomes a precisely bounded remainder. *Shelf life*: permanent, and it is the model that makes numerical methods (Newton's method, linear stability analysis) feel like applications of one idea.

## Why Students Fail
The dominant failure is treating a familiar tool wearing new vocabulary as an unfamiliar one: "linearization," "$L(x)$," and the differential notation "$dy=f'(x)\,dx$" are all NEW LABELS attached to a computation the learner already knows how to do (compute a slope, plug it into point-slope form) — and the instructional act of introducing new terminology and notation, without immediately connecting it back to the already-mastered derivative computation, produces the belief that this is a genuinely separate procedure requiring its own new derivation (MC-1, LINEARIZATION-ASSUMED-NEW-PROCEDURE). The second failure is an overgeneralization of "the tangent line approximates the curve" into "the tangent line approximates the curve EQUALLY WELL everywhere," missing that the approximation is built from LOCAL information (the slope at one point) and has no claim to accuracy far from that point — a learner who has only ever used $L(x)$ on points very close to $a$ has no evidence yet that the error grows (MC-2, LINEARIZATION-ACCURACY-ASSUMED-UNIFORM). The third failure is notation-driven: $L(x)=f(a)+f'(a)(x-a)$ and $dy=f'(x)\,dx$ LOOK structurally different on the page (one solves for a function value, the other for a differential symbol), so a learner reasonably but wrongly treats them as unrelated ideas rather than recognizing the identical arithmetic reframed (MC-3, DIFFERENTIAL-ASSUMED-SEPARATE-CONCEPT).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3) and its repair actions B01–B03. **The Blueprint's Misconception Registry carries a Severity column (Foundational/High/Moderate) but no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — LINEARIZATION-ASSUMED-NEW-PROCEDURE** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 5, instruction-induced. New vocabulary ("linearization") and new notation ($L(x)$) are introduced together, and without an explicit, immediate connection back to the point-slope line formula the learner already knows, the presentation itself suggests a new topic rather than a restatement.
  - **Characteristic phrase**: treating the construction of $L(x)$ as requiring its own separate derivation, distinct from computing $f'(a)$.
  - **Detection probe** (verbatim, Blueprint's A01 MC-1 hook): "is constructing the linearization $L(x)$ a fundamentally new procedure, separate from computing the derivative $f'(a)$ you already know how to find?"
  - **Repair**: Blueprint Repair Action B01 — re-walk Example 1's direct construction, re-anchoring explicitly on "the point-slope line formula, with the already-computed derivative as slope."
  - **Verification of death**: given a fresh function and point, the learner constructs $L(x)$ immediately after computing $f'(a)$, without treating the construction step as requiring new derivation.

- **MC-2 — LINEARIZATION-ACCURACY-ASSUMED-UNIFORM**
  - **Birth type**: Type 1, overgeneralization of "the tangent line approximates the curve" (true locally) into "the tangent line approximates the curve equally well everywhere" (false), missing the LOCAL scope of the information the tangent line is built from.
  - **Characteristic phrase**: using $L(x)$ far from $a$ with the same confidence as near $a$, with no expectation of degraded accuracy.
  - **Detection probe** (verbatim, Blueprint's A02 MC-2 hook): "does the linearization $L(x)$ provide roughly the same quality of approximation to $f(x)$ regardless of how far $x$ is from $a$?"
  - **Repair**: Blueprint Repair Action B02 — re-walk Example 2's near-versus-far numeric comparison (error of about $0.0002$ at $x=4.1$ versus $0.25$ at $x=9$, for $f(x)=\sqrt x$ at $a=4$), re-anchoring on "accuracy genuinely degrades with distance."
  - **Verification of death**: given a fresh linearization and asked to compare its accuracy at a near point versus a far point, the learner predicts (and confirms) the far point is markedly less accurate, without being prompted.

- **MC-3 — DIFFERENTIAL-ASSUMED-SEPARATE-CONCEPT**
  - **Birth type**: Type 4, notation-induced. $L(x)=f(a)+f'(a)(x-a)$ and $dy=f'(x)\,dx$ are visually and structurally distinct expressions — different symbols, different framing (a function value versus a differential) — even though the underlying computation is identical; the notation itself obscures the equivalence.
  - **Characteristic phrase**: treating $dy=f'(x)\,dx$ as requiring its own separate justification, distinct from the already-understood linearization.
  - **Detection probe** (verbatim, Blueprint's A03 MC-3 hook): "is the differential $dy=f'(x)\,dx$ a genuinely different mathematical idea from the linearization $L(x)$, requiring its own separate justification?"
  - **Repair**: Blueprint Repair Action B03 — re-walk Example 3's matching numeric computation (showing $dy$ and $L(x)-f(a)$ are literally the same arithmetic), re-anchoring on "the same tangent-line idea, reframed as an increment."
  - **Verification of death**: given a fresh linearization already constructed, the learner writes down the corresponding differential $dy=f'(a)\,dx$ immediately, recognizing it as the same slope value applied to an increment rather than a value.

## Analogies
- **Best — a rented tool you already own.** You already have the tool (the derivative, $f'(a)$) — linearization is just a new NAME for one specific way of using a tool you already possess (plugging it into the point-slope formula), not a new tool to acquire.
- **Alternative — a flashlight beam.** Near where you're standing (near $a$), the beam illuminates clearly; far away, the beam's accuracy (how well it shows what's really there) degrades — directly counters MC-2's uniform-accuracy assumption.
- **ANTI-ANALOGY — "the differential is a tiny number you multiply by."** Treating $dx$ and $dy$ as mysterious infinitesimal objects (rather than as $\Delta x$ and the tangent line's predicted $\Delta y$) is what licenses MC-3 — it invites treating differentials as their own algebraic species rather than the SAME linearization arithmetic under a new name. Say "the differential IS the linearization, just asking for the change instead of the value" instead.

## Demonstrations
- **The point-slope recognition.** Write $L(x)=f(a)+f'(a)(x-a)$ next to the general point-slope formula $y=y_1+m(x-x_1)$ and match term by term. *Predict whether they match before comparing.* The direct correspondence is the demonstration for MC-1.
- **The near-versus-far error comparison.** Compute $L(4.1)$ and $L(9)$ for $f(x)=\sqrt x$ at $a=4$, compare each against the true value. *Predict which will be more accurate first.* The thousand-fold relative-error gap is the demonstration for MC-2.
- **The linearization-differential numeric match.** Compute $dy=f'(4)\cdot0.1$ and $L(4.1)-f(4)$ side by side for the same function. *Predict whether they'll match before computing.* Getting the identical number twice, from two different-looking formulas, is the demonstration for MC-3.

## Discovery Questions
Direct instruction is the argued call for the linearization formula itself (it is a direct application of the already-known point-slope formula, not something requiring rediscovery), but the distance-dependent accuracy claim (MC-2) is genuinely discoverable numerically.
1. **Need** — "Use $L(x)=2+\frac14(x-4)$ (built from $\sqrt x$ at $a=4$) to estimate $\sqrt{4.1}$ and $\sqrt9$. Compare both to the true values." One estimate is far more accurate than the other.
2. **Playground** — try a few more points at varying distances from $a=4$ and record the error at each.
3. **Invention** — "What pattern do you see in how the error changes with distance from $a$?" Let the learner state it before naming it.
4. **Collision** — confront a learner who expected uniform accuracy with the actual error table just built.
5. **Formalisation** — state explicitly that linearization is a LOCAL approximation, with error growing as $x$ moves from $a$.
6. **Compression** — "The tangent line agrees with the curve at one point, and less and less as you move away."

## Teaching Sequence
The point-slope recognition (targeting MC-1) must come FIRST, before any numerical approximation is attempted — a learner who sees $L(x)$ as "the familiar line formula with the slope already computed" has no reason to treat later steps (the error analysis, the differential) as separate new topics rather than extensions of one idea. The near-versus-far error comparison (MC-2) should use the SAME running example ($f(x)=\sqrt x$ at $a=4$) established in A01, per the Blueprint's own Teaching Notes — introducing a fresh function for the accuracy demonstration would obscure that this is the SAME linearization being tested at different distances, not a new scenario. The differential (MC-3) is introduced LAST, reusing the identical numeric data from the accuracy comparison, so its equivalence to the already-computed linearization is verifiable by direct comparison rather than asserted. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the point-slope recognition, constructing $L(x)$ for $f(x)=\sqrt x$ at $a=4$ side-by-side with the general point-slope formula. First action; anchors "not a new procedure" concretely.
- **TEST-THINKING: Prediction** — "Will $L(x)$ approximate $\sqrt x$ equally well at $x=4.1$ and $x=9$?" asked BEFORE computing either. Surfaces MC-2 in one turn.
- **DO: Demonstration** — the linearization-differential numeric match, run with the learner computing both $dy$ and $L(4.1)-f(4)$ themselves and confirming they agree.
- **TEST-THINKING: Error Analysis** — "A student treated the differential as a completely separate topic requiring its own new formula sheet. What did they miss?" targets MC-3 directly.
- **Does NOT fit: deriving the Taylor remainder or higher-order terms.** LO3 is explicitly orientation-level per the KG description; the full error-bound derivation is deferred to a later concept, and attempting it here would dilute this concept's own tightly-scoped reuse-not-reinvent message.

## Voice Teaching Notes
The load-bearing sentence is "you already know how to find the slope — linearization just uses that number in the line formula you already know." Say it the first time $L(x)$ is introduced, and again whenever the differential appears. Listen for a learner treating the introduction of "linearization" or "$dy=f'(x)dx$" as signaling a wholly new topic (asking "wait, is this different from derivatives?") — that question itself is the tell for MC-1 or MC-3. Listen for unqualified confidence when using $L(x)$ at a point far from $a$ — confidence with no caveat about distance is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Treats constructing $L(x)$ as requiring separate derivation from computing $f'(a)$** — MC-1. Route to the point-slope recognition, on the exact function in question.
- **Uses $L(x)$ far from $a$ with the same confidence as near $a$, or is surprised the far estimate is inaccurate** — MC-2. Route to the near-versus-far error comparison on the same function.
- **Treats the differential $dy=f'(x)\,dx$ as needing its own separate justification** — MC-3. Route to the linearization-differential numeric match, using the learner's own already-computed data.
- **Constructs $L(x)$ immediately after computing $f'(a)$, qualifies any approximation with a distance caveat, and connects the differential to the linearization without prompting** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.80×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a ball-bearing volume-uncertainty estimate, explicitly requiring the learner to explain why a LARGER radius uncertainty makes the differential-based estimate less reliable) must include at least one item requiring the near-vs-far accuracy judgment explicitly — a gate made only of near-point approximations certifies the formula without certifying the accuracy-degradation understanding.

## Tutor Recovery Strategy
The likely utterance here is "wait, is this a totally new formula I have to learn?" — a reasonable reaction to new notation and vocabulary appearing together. The concept-specific smaller question returns to the point-slope form directly: **"You already know $y=y_1+m(x-x_1)$. If $m$ is the slope you already computed, $y_1=f(a)$, and $x_1=a$ — what does this formula become?"** The learner arrives at $L(x)=f(a)+f'(a)(x-a)$ themselves, on ground they already own. Then confirm: "that's it — that's the whole formula, and you just built it from something you already knew." If the frustration is instead about the differential feeling like a separate topic, shrink to the bare check: **"Compute $f'(4)\times0.1$. Now compute $L(4.1)-f(4)$. Are they the same number?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure that reuses a prior computation** (constructing $L(x)$ and the differential are procedures; the distance-dependent accuracy claim is conceptual). Review by *estimating at BOTH a near and a far point from the same $a$*, not a near point alone, since a near-point-only review lets MC-2's uniform-accuracy assumption pass undetected.
- Concept-specific deviation: keep at least one review item requiring the learner to write BOTH $L(x)$ and the corresponding differential $dy$ for the same function and point — a review that only ever asks for one or the other never re-exercises the equivalence, and MC-3 regrows once the two notations are practiced separately.
- Interleaving partners: `math.calc.derivative-definition` (the source of the slope value this concept reuses without re-deriving) and the future error-bound/Taylor-remainder concept, which this entry's own LO3 explicitly previews and defers.

## Transfer Connections
- **Near**: Taylor's theorem (met later), whose higher-order polynomial terms refine exactly this concept's degree-1 approximation with precisely bounded error, replacing this concept's qualitative "accuracy degrades with distance" with a quantitative remainder formula.
- **Far**: Newton's method for root-finding, which repeatedly uses a function's own linearization to generate successively better estimates — the identical $L(x)$ construction, applied iteratively.
- **Real-world**: any small-perturbation estimate — error propagation from a measurement uncertainty (the Blueprint's own ball-bearing transfer probe), a first-order approximation of a physical law near an operating point, a linear stability analysis near an equilibrium.
- **Expert transfer**: the general pattern of approximating a complicated (nonlinear) object by its best LOCAL linear model — the same move underlies the Jacobian in multivariable calculus, linearized control systems in engineering, and local linear approximations in machine learning.

## Cross-Subject Connections
- **Engineering**, genuine and central: the Blueprint's own transfer probe (estimating volume uncertainty from a radius-measurement uncertainty) is a real error-propagation computation, performed exactly this way in any measurement-based engineering context.
- **Physics**, real: small-oscillation and small-angle approximations (e.g. $\sin\theta\approx\theta$ for small $\theta$) are linearizations of trigonometric functions near $\theta=0$, using this exact construction.
- **Economics**, real: marginal analysis (estimating the change in cost/revenue from a small change in quantity) is a direct application of the differential $dy\approx f'(x)\,dx$.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged — the engineering/physics connections, while genuine and central to why this concept matters practically, are applications rather than structural KG dependencies.

## Blueprint References
`docs/curriculum/blueprints/math.calc.linearization.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the direct construction, Example 2 the near-versus-far accuracy comparison, Example 3 the differential's matching numeric computation), the Component 5 teaching actions (A01 P11 representation shift, A02 P28 conflict evidence, A03 P06 contrast pair, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1..MC-3) and repair actions (B01–B03), the P77 four-item problem set, and the P76 independence-mode transfer probe (the ball-bearing volume estimate). This entry adds independent birth-type classification for all three misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-formula / guided-discovery-for-the-accuracy-claim split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (none) and cross_links (none) match the live KG's own fields exactly, confirmed by direct query. Recorded as a positive finding, matching this batch's other three entries.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 39).
