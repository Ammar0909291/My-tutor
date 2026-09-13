# math.calc.related-rates

## Identity
- **KG ID**: `math.calc.related-rates`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.implicit-differentiation` — load-bearing part: related rates is exactly implicit differentiation performed with respect to TIME rather than an unnamed independent variable; every technique transfers directly.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.calc.related-rates.md` (reused by reference throughout)

## Learning Objective
- The learner can set up a related-rates problem by identifying an equation relating the quantities involved, then differentiate BOTH sides with respect to time $t$ using implicit differentiation, giving every variable quantity a $\frac{d(\cdot)}{dt}$ term via the Chain Rule.
- The learner can correctly distinguish GIVEN rates (known numerical values, often at a specific instant) from the UNKNOWN rate being solved for, and substitutes numerical values ONLY AFTER differentiating — never before.
- The learner recognizes that a well-posed related-rates problem specifies the instant at which rates are evaluated, and that a rate may be genuinely ZERO or UNDEFINED at that instant, even if it varies at other times.

## Core Understanding
Related rates problems connect the rates of change of several quantities related by some equation — typically geometric, like a sphere's volume and radius — via `math.calc.implicit-differentiation`'s own machinery, applied specifically with respect to TIME. The method: identify the relating equation (e.g. $V=\frac43\pi r^3$ for a sphere); differentiate BOTH sides with respect to $t$, treating each variable as an implicit function of time, so $\frac{dV}{dt}=4\pi r^2\frac{dr}{dt}$ (a Chain Rule application, since $r$ itself depends on $t$); then substitute the GIVEN numerical values to solve for the UNKNOWN rate. A crucial ordering rule, inherited directly from implicit differentiation's own discipline: substitute numbers ONLY AFTER differentiating symbolically — substituting a specific numerical value for a variable BEFORE differentiating would incorrectly treat that variable as a CONSTANT (with derivative $0$), destroying the very relationship the problem asks about. Rates can genuinely be ZERO or UNDEFINED at a specified instant (e.g. a ball at the peak of its trajectory has vertical velocity $0$) — this is not an error signal, but a real feature of the specific instant being examined.

## Mental Models
1. **Beginner — "write the equation, differentiate with respect to $t$, plug in the numbers."** A three-step recipe applied without yet distinguishing WHEN numbers may safely be substituted. *Upgrade trigger*: substituting a known value too early and getting a derivative of $0$ where a real rate was expected.
2. **Intermediate — "differentiate FIRST, with every variable kept symbolic, THEN substitute the given numerical values to solve for the unknown rate."** The ordering discipline is now explicit and deliberate. *Upgrade trigger*: encountering an instant where the algebra produces a genuinely zero or undefined rate, and needing to interpret rather than "fix" it.
3. **Advanced — "a degenerate (zero or undefined) result at a specific instant is a real feature of the geometry at THAT instant, not evidence of a setup error."** The learner distinguishes a genuine computational mistake from a correctly-computed but surprising result. *Upgrade trigger*: needing to set up a problem with a genuine multi-step geometric relationship (e.g. similar triangles relating two changing dimensions) before differentiating at all.
4. **Expert — related rates is recognized as implicit differentiation with respect to time, with NO new differentiation rule required — only a disciplined setup (identify the relationship, differentiate, then and only then substitute) and a willingness to interpret degenerate results honestly.** *Shelf life*: permanent.

## Why Students Fail
The dominant and most destructive failure is bringing numbers in too early, out of habit from earlier, more static algebra problems where substituting a known value before manipulating an equation is completely safe: a learner substitutes a specific numerical radius (e.g. $r=5$) directly into the relating equation BEFORE differentiating, producing a fixed NUMBER whose derivative is trivially $0$ — destroying the relationship entirely, since the radius must remain the SYMBOL $r$ throughout differentiation, with numbers substituted only afterward (MC-1, NUMERICAL-VALUES-SUBSTITUTED-BEFORE-DIFFERENTIATING). A second, distinct failure is an unwarranted expectation that every correctly-set-up problem must yield a "normal," non-zero, well-defined numerical answer: when the algebra genuinely produces a degenerate result — a rate of exactly $0$, or a division by zero signaling an undefined (infinite) rate — a learner assumes this must indicate a setup mistake somewhere, rather than recognizing it as a real, correctly-derived feature of the specific instant being examined (MC-2, DEGENERATE-RATE-RESULT-ASSUMED-TO-BE-A-SETUP-ERROR).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its own repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (Foundational, Moderate) but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — NUMERICAL-VALUES-SUBSTITUTED-BEFORE-DIFFERENTIATING** (the Blueprint's own declared "Foundational" misconception — "the single most common and most destructive error in this topic")
  - **Birth type**: Type 1, overgeneralization of the ordinary algebra habit of substituting known values early to simplify an expression — a habit that is completely safe in static problems but destroys the variable-quantity relationship that a related-rates problem specifically needs preserved through differentiation.
  - **Characteristic phrase**: substituting $r=5$ directly into $V=\frac43\pi r^3$ before differentiating, producing a fixed number whose derivative is $0$.
  - **Detection probe** (Blueprint's B01 P41): present Example 1 (the inflating balloon) and check whether a number is substituted before differentiating.
  - **Repair**: Blueprint Repair Action B01 — re-work the problem keeping the variable symbolic throughout differentiation, substituting numerical values only at the final step, after the symbolic derivative relationship is established.
  - **Verification of death**: given a fresh related-rates problem, the learner writes the symbolic derivative relationship (e.g. $\frac{dV}{dt}=4\pi r^2\frac{dr}{dt}$) BEFORE substituting any given numerical values.

- **MC-2 — DEGENERATE-RATE-RESULT-ASSUMED-TO-BE-A-SETUP-ERROR** (the Blueprint's own second registered misconception, "Moderate" severity)
  - **Birth type**: Type 2, perceptual intuition. A correctly-posed problem intuitively "should" yield a clean, well-defined numerical answer, so a genuinely degenerate result (zero or undefined) feels perceptually like something must have gone wrong, even when the algebra is entirely correct.
  - **Characteristic phrase**: encountering a division-by-zero result (like $\frac{dy}{dt}$ at $y=0$ in the sliding-ladder problem) and assuming a setup mistake was made, rather than recognizing the rate is genuinely undefined (infinite) at that precise instant.
  - **Detection probe** (Blueprint's B02 P41): present Example 3 (the sliding ladder at the instant it lies flat) and check whether the division-by-zero result is incorrectly treated as a mistake.
  - **Repair**: Blueprint Repair Action B02 — re-examine the specific geometric instant explicitly, confirming the degenerate result reflects genuine physical behavior (e.g. the top of the ladder moving infinitely fast at the exact instant it touches the ground) rather than an algebraic error.
  - **Verification of death**: given a fresh problem that produces a degenerate rate at a specific instant, the learner interprets the result physically/geometrically rather than searching for a computational mistake.

## Analogies
- **Best — reading a car's speedometer versus reading its odometer.** The odometer (a fixed distance value at one moment) is like substituting a number too early — a static snapshot with no rate information left in it. The speedometer (the RATE of change, requiring the car to still be moving through the differentiation) is what related rates actually computes — you cannot get a speedometer reading from a parked (already-substituted, now-constant) car.
- **Alternative — a snapshot versus a video.** Substituting numbers before differentiating is like trying to measure motion from a single photograph (a snapshot has no rate information); differentiating first, with variables still "moving" symbolically, is like measuring motion from a video, where the changing quantity is still present to be measured.
- **ANTI-ANALOGY — "just plug in what you know and solve."** This vague phrasing, borrowed correctly from ordinary algebra, licenses MC-1 directly in this specific setting, since "what you know" here is a snapshot value whose derivative would be destroyed by early substitution. Say "differentiate FIRST while every quantity is still symbolic — THEN plug in what you know" instead.

## Demonstrations
- **The too-early-substitution wipeout.** Differentiate $V=\frac43\pi r^3$ with respect to $t$ correctly (keeping $r$ symbolic) side by side with substituting $r=5$ first and then differentiating (giving $\frac{d}{dt}[\text{constant}]=0$). *Predict whether the two approaches will agree before doing both.* Getting $0$ from the early-substitution route — a nonsensical "the volume never changes" claim — is the demonstration for MC-1.
- **The degenerate-instant reveal.** Work the sliding-ladder problem (Example 3) through to the exact instant $y=0$, showing the division-by-zero result and interpreting it physically (the top of the ladder moving infinitely fast right as it touches the ground). *Predict whether this specific instant will give a "normal" finite answer before computing.* Getting a genuine mathematical undefined-ness, correctly interpreted as real infinite speed, is the demonstration for MC-2.
- **The ordering-matters race.** Solve the SAME problem (Example 1/2's balloon) with the correct differentiate-then-substitute order and with the incorrect substitute-then-differentiate order side by side, comparing the two final "answers."

## Discovery Questions
Direct instruction is the argued call for the implicit-differentiation-with-respect-to-time procedure itself (it directly reuses already-mastered machinery, not independently rediscoverable as a "new" technique), but the substitution-ordering discipline (MC-1) and the degenerate-result interpretation (MC-2) are both genuinely discoverable by direct comparison.
1. **Need** — "Differentiate $V=\frac43\pi r^3$ with respect to $t$, keeping $r$ symbolic. Now substitute $r=5$ FIRST, then differentiate. Do you get the same answer?" The learner discovers the early-substitution route gives $0$.
2. **Playground** — try the same order-comparison on a couple more relating equations.
3. **Invention** — "Why does substituting first destroy the rate information?" Let the learner connect it to treating a variable as a fixed constant, whose derivative is always $0$.
4. **Collision** — confront a learner who substituted early with the direct comparison showing the nonsensical $0$ result.
5. **Formalisation** — state the ordering rule explicitly: differentiate symbolically FIRST, substitute numbers SECOND, always.
6. **Compression** — "Numbers come LAST, never first — differentiate the relationship while it's still alive."

## Teaching Sequence
The substitution-ordering discipline (MC-1) must be established FIRST, per the Blueprint's own A01, since it is the single most destructive and most common error, and every subsequent worked example depends on the learner already keeping variables symbolic through differentiation. The given-versus-unknown separation (A02, reused procedure) follows directly, building fluency in the ordinary case where the algebra proceeds without incident. The degenerate-result interpretation (MC-2) is introduced LAST, per the Blueprint's own A03, since it is a conceptual maturity point (correctly-computed results can be surprising) rather than a mechanical skill, and a learner who has not yet internalized the basic procedure is not ready to additionally judge whether an unusual RESULT is correct. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the too-early-substitution wipeout (correct symbolic differentiation versus premature substitution on the SAME balloon problem), with the learner predicting whether the two routes will agree BEFORE computing either. First action; anchors the ordering discipline concretely.
- **TEST-THINKING: Prediction** — "If you substitute the known radius BEFORE differentiating, what will the derivative of a fixed number be?" asked BEFORE the learner attempts a fresh problem. Surfaces MC-1 in one turn.
- **DO: Demonstration** — the degenerate-instant reveal (the sliding-ladder problem's division-by-zero result), run with the learner predicting whether the specific instant will give a "normal" answer before computing.
- **TEST-THINKING: Error Analysis** — "A student substituted $r=5$ into $V=\frac43\pi r^3$ and then differentiated, getting $\frac{dV}{dt}=0$. What went wrong?" targets MC-1 directly.
- **Does NOT fit: introducing multivariable partial-derivative machinery here.** Related rates uses ordinary (single-variable, with respect to time) implicit differentiation exclusively; genuinely multivariable relationships are out of this concept's scope.

## Voice Teaching Notes
The load-bearing sentence is "numbers come LAST, never first — differentiate the relationship while every quantity is still symbolic." Say it every time a new related-rates problem is set up, not just the first. Listen for a learner who writes a specific numerical value into the relating equation before any differentiation has happened — that premature substitution is the tell for MC-1, the single most common and most destructive error in this topic. Listen for a learner who, on reaching a zero or undefined result, immediately says "that can't be right" or starts re-checking their algebra rather than interpreting the result — that reflexive doubt is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Substitutes a specific numerical value for a variable before differentiating** — MC-1. Route to the too-early-substitution wipeout, on the exact relating equation in question.
- **Treats a zero or undefined rate result as evidence of a setup mistake** — MC-2. Route to the degenerate-instant reveal, on the exact instant in question.
- **Differentiates symbolically first, substitutes given values second, and correctly interprets degenerate results as genuine** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.75×5⌉). The 4-item P77 set (including one item explicitly requiring the learner to EXPLAIN why early substitution is incorrect, and one requiring physical interpretation of an undefined rate) plus the P76 independence-mode transfer probe (a conical-tank draining problem requiring an extra proportionality step between radius and height) must include at least one item requiring the learner to articulate WHY the substitution-ordering rule matters, not merely apply it correctly — a gate made only of correct-computation items risks certifying rote procedure-following without certifying the underlying conceptual discipline against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "I plugged in the numbers I was given and got zero — is that right?" — a reasonable-sounding step that is exactly the destructive early-substitution error. The concept-specific smaller question returns to a concrete check: **"Before you plugged in that number, was it still a LETTER (a variable) in your equation, or had you already replaced it with a number?"** The learner traces back their own steps to find where the number entered. Then return: "once you replace a letter with a number, differentiating it always gives zero — the letter has to stay a letter until AFTER you differentiate." If the frustration is instead about a degenerate result feeling wrong, shrink to the bare check: **"At this exact moment, does it make physical sense for this rate to be zero (or to be impossibly large)? What's special about this particular instant?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded ordering constraint plus one interpretive judgment** (the differentiate-before-substitute ordering is a strict procedural precondition, never optional, while recognizing a degenerate result as genuine rather than erroneous is a conceptual judgment call). Review by *requiring the learner to write the fully symbolic differentiated equation, with every variable still as a letter, BEFORE any numerical substitution appears anywhere in their work*, never accepting a solution that shows numbers mixed in from the first line.
- Concept-specific deviation: keep at least one problem in the review rotation that produces a genuinely degenerate (zero or undefined) result at the specified instant, so the interpretive judgment against MC-2 stays exercised rather than atrophying into "results are always clean numbers."
- Interleaving partners: `math.calc.implicit-differentiation` (the direct discriminating partner — reviewing the general with-respect-to-$x$ procedure alongside this concept's with-respect-to-$t$ specialization keeps the "this is the SAME technique" connection alive) and geometric relationship review (similar triangles, the Pythagorean theorem, standard volume/area formulas), since setting up the correct relating equation is often the harder half of a related-rates problem.

## Transfer Connections
- **Near**: `math.calc.implicit-differentiation` (the direct parent technique, applied here specifically with respect to time).
- **Far**: differential equations describing coupled changing quantities, and multivariable calculus's own total-derivative machinery, both of which generalize this concept's single-time-variable relating-rate reasoning.
- **Real-world**: the Blueprint's own transfer probe — a conical tank draining at a known rate, requiring a proportionality relationship between radius and height before differentiating — is a direct, literal engineering/fluid-dynamics application.
- **Expert transfer**: recognizing that ANY system of quantities constrained by a fixed relationship (geometric, physical, economic) has its rates of change fully determined by differentiating that constraint with respect to time — the same "differentiate the constraint" reasoning recurs across physics (constrained motion), economics (budget constraints), and engineering (coupled system dynamics).

## Cross-Subject Connections
- **Physics**, real: virtually all kinematics problems involving changing geometric configurations (a ladder sliding down a wall, a shadow's length changing as a person walks, orbital mechanics) are direct related-rates applications.
- **Engineering**, real: the Blueprint's own transfer probe (a draining conical tank) is a standard, literal application in fluid dynamics and chemical engineering.
- **Economics**, real: relationships between coupled economic quantities (e.g. price and quantity constrained by a demand curve) analyzed for their joint rates of change over time use this exact technique.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the engineering connection, while genuine and central to this concept's own transfer probe, is an application rather than a structural KG dependency.

## Blueprint References
`docs/curriculum/blueprints/math.calc.related-rates.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the balloon setup breaking MC-1, Example 2 the given-versus-unknown substitution, Example 3 the sliding-ladder degenerate-rate case breaking MC-2), the Component 5 Teaching Actions (A01 P64 conceptual shift, A02 reused procedure, A03 P06 contrast pair, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the four-item P77 problem set, and the P76 independence-mode transfer probe (the draining conical tank). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, and the anti-analogy.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.implicit-differentiation`), unlocks (none), cross_links (none), difficulty, bloom, mastery_threshold (0.75), and estimated_hours (6) all match the live KG's own fields exactly, confirmed by direct query.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 44).
