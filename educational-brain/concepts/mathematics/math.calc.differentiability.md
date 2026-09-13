# math.calc.differentiability

## Identity
- **KG ID**: `math.calc.differentiability`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.derivative-definition` — load-bearing part: differentiability is DEFINED as the existence of the limit $f'(a)=\lim_{h\to0}[f(a+h)-f(a)]/h$; this concept has no content without that definition already in hand.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG. Related, but not KG-recorded: `math.calc.continuity` (the one-directional implication this concept clarifies).
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.80
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.calc.differentiability.md` (reused by reference throughout)

## Learning Objective
- The learner can state that $f$ is differentiable at $a$ iff $f'(a)$ exists, and can identify the three common geometric reasons it fails: a corner (one-sided derivatives disagree, both finite), a cusp (the derivative diverges to $\pm\infty$ from both sides with OPPOSITE signs), or a vertical tangent (diverges to $\pm\infty$ from both sides with the SAME sign).
- The learner can state the correct one-directional implication — differentiability implies continuity, never the reverse — and produce $|x|$ at $x=0$ as a standing counterexample to the converse.
- The learner can check differentiability at a piecewise boundary point by verifying BOTH continuity there AND agreement of the one-sided derivatives, recognizing continuity alone is insufficient.

## Core Understanding
`math.calc.derivative-definition` already supplies the test: $f$ is differentiable at $a$ exactly when $f'(a)=\lim_{h\to0}[f(a+h)-f(a)]/h$ EXISTS as a finite number. This concept is about the three geometrically distinct ways that limit can fail to exist: a CORNER, where the left-hand and right-hand derivatives are both finite but genuinely DIFFERENT (the canonical case, $f(x)=|x|$ at $0$, where the left derivative is $-1$ and the right is $+1$); a CUSP, where the derivative's magnitude grows without bound from both sides but with OPPOSITE signs (a sharp point folding back on itself); and a VERTICAL TANGENT, where the derivative diverges to $\pm\infty$ from both sides with the SAME sign (like $x^{1/3}$ at $0$, whose tangent line is genuinely vertical). The single most important relationship this concept establishes is ONE-DIRECTIONAL: differentiability implies continuity (if the tangent slope exists, the graph cannot have a jump or hole there — algebraically, $f(a+h)-f(a)=\frac{f(a+h)-f(a)}{h}\cdot h\to f'(a)\cdot0=0$ as $h\to0$, so $f(a+h)\to f(a)$), but the CONVERSE is false — $|x|$ at $0$ is perfectly continuous (no jump) yet not differentiable (a corner). This makes checking differentiability at a piecewise boundary a TWO-part test, not one: continuity alone certifies nothing about the tangent slope's existence — the one-sided DERIVATIVES must also agree.

## Mental Models
1. **Beginner — differentiable means the graph looks smooth.** A visual, perceptual judgment: no obvious sharp points or breaks. *Upgrade trigger*: a corner that "looks smooth enough at a glance" but genuinely has disagreeing one-sided derivatives when actually computed (e.g. $|x-3|$ at $3$, easy to overlook on a coarse sketch). *Shelf life*: about one lesson.
2. **Intermediate — differentiable means the limit defining $f'(a)$ actually exists; check both one-sided derivatives explicitly.** Never trust appearance; compute. *Upgrade trigger*: needing to explain the relationship between differentiability and continuity, which this model alone doesn't address.
3. **Advanced — differentiability is a strictly STRONGER local condition than continuity.** Every differentiable function is continuous, but the reverse fails, and $|x|$ at $0$ is the standing proof; a piecewise boundary needs BOTH conditions checked, never one alone. *Upgrade trigger*: needing to classify a specific non-differentiable point as a corner, cusp, or vertical tangent — this model says THAT it fails, not WHICH way.
4. **Expert — differentiability sits in a hierarchy of local regularity conditions.** Continuous $\subsetneq$ differentiable $\subsetneq$ continuously differentiable ($C^1$) $\subsetneq \cdots$, each strictly stronger than the last; $|x|$ separates the first pair, and a function with a wildly-oscillating-but-continuous derivative separates the second pair. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is perceptual: a function that LOOKS smooth on a coarse sketch, or is simply defined everywhere with no visible break, is assumed differentiable without ever computing the one-sided derivatives explicitly — a judgment made by eye rather than by the actual limit test (MC-1, DIFFERENTIABILITY-ASSUMED-FROM-SMOOTH-APPEARANCE-WITHOUT-CHECKING-ONE-SIDED-DERIVATIVES). The second, more consequential failure is a logical-implication reversal: having correctly learned that differentiable functions are continuous, a learner concludes the CONVERSE also holds — that continuity is enough to guarantee differentiability — missing that $|x|$ at $0$ is continuous and manifestly not differentiable there (MC-2, CONTINUITY-ASSUMED-TO-IMPLY-DIFFERENTIABILITY). Both misconceptions are ranked Foundational in the Blueprint because each reflects a fundamental misunderstanding of the logical relationship between two related but genuinely distinct conditions, not a mere computational slip.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its Protocol B repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (both marked "Foundational") but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — DIFFERENTIABILITY-ASSUMED-FROM-SMOOTH-APPEARANCE-WITHOUT-CHECKING-ONE-SIDED-DERIVATIVES**
  - **Birth type**: Type 2, perceptual intuition. A function's graph, glanced at, either looks smooth or doesn't — and that visual judgment substitutes for the actual test (computing $\lim_{h\to0^-}$ and $\lim_{h\to0^+}$ of the difference quotient separately), especially when the corner is subtle or the function is only defined algebraically rather than sketched precisely.
  - **Characteristic phrase**: "$f(x)=|x|$ is defined everywhere and looks continuous enough — it must be differentiable."
  - **Detection probe** (verbatim, Blueprint's B01 P41): present Example 1 ($f(x)=|x|$ at $0$) and check whether the one-sided derivatives are actually computed rather than assumed.
  - **Repair**: Blueprint Repair Action B01 — re-compute both one-sided derivatives explicitly via the limit definition ($\lim_{h\to0^-}\frac{|h|}{h}=-1$, $\lim_{h\to0^+}\frac{|h|}{h}=1$); the disagreement, not the appearance, is what settles the question.
  - **Verification of death**: given a new function with a subtle corner (e.g. $f(x)=|x-3|$ at $x=3$), the learner computes both one-sided derivatives before concluding anything, without being prompted.

- **MC-2 — CONTINUITY-ASSUMED-TO-IMPLY-DIFFERENTIABILITY**
  - **Birth type**: Type 1, overgeneralization of a true implication into its false converse — the identical mechanism already classified this way for `math.calc.continuity-types`' own MC-2 and `math.calc.derivative-definition`'s own MC-2, both reversing a true "$A\Rightarrow B$" into the false "$B\Rightarrow A$."
  - **Characteristic phrase**: "$|x|$ is continuous at $0$, so it must also be differentiable there."
  - **Detection probe** (verbatim, Blueprint's B02 P41): present Example 2 (confirming $|x|$'s continuity at $0$) and check whether that continuity is then (incorrectly) used to conclude differentiability.
  - **Repair**: Blueprint Repair Action B02 — restate the correct one-directional implication (differentiable $\Rightarrow$ continuous), with $|x|$ at $0$ as the standing counterexample to the converse; continuity is NECESSARY but not SUFFICIENT.
  - **Verification of death**: given a fresh continuous-but-cornered function, the learner explicitly states that continuity alone does not settle differentiability, and checks the one-sided derivatives before concluding.

## Analogies
- **Best — a road with no gaps versus a road with a sudden bend.** Continuity is "no gaps in the road" (you can drive it without teleporting); differentiability is additionally "no sudden bends" (your steering wheel angle doesn't jump instantaneously). A gapless road can still have a sudden bend — that is exactly $|x|$ at $0$.
- **Alternative — a strictly-stronger membership test.** "Differentiable" is a smaller, more exclusive club than "continuous" — every member of the differentiable club is automatically in the continuous club, but not every member of the continuous club gets into the differentiable one.
- **ANTI-ANALOGY — "smooth means differentiable."** This is MC-2 wearing an everyday word. $|x|$ looks "smooth enough" to draw in one unbroken stroke (continuity), which is not the same claim as having one well-defined tangent direction everywhere (differentiability). Say "no gaps AND no sudden direction changes" instead of "smooth."

## Demonstrations
- **The one-sided-derivative computation on $|x|$.** Compute $\lim_{h\to0^-}\frac{|h|-0}{h}$ and $\lim_{h\to0^+}\frac{|h|-0}{h}$ side by side. *Predict whether they'll agree first.* The disagreement ($-1$ vs. $1$) is the demonstration for MC-1.
- **The continuity-check-then-differentiability-fails contrast.** Confirm $|x|$ is continuous at $0$ (both one-sided LIMITS of the function agree at $0$), then immediately show the one-sided DERIVATIVES disagree. *Predict whether continuity is enough before checking the derivatives.* The gap between the two checks is the demonstration for MC-2.
- **The piecewise boundary, both conditions checked in sequence.** For $f(x)=x^2$ if $x<1$, $2x-1$ if $x\ge1$: check continuity at $1$ (both sides give $1$), THEN check the one-sided derivatives (both give $2$) — showing the two-part test in action on a case where both parts pass.

## Discovery Questions
Guided discovery is used throughout — the three failure modes (corner, cusp, vertical tangent) and the one-directional implication are genuinely discoverable by computing one-sided derivatives on concrete cases, rather than conventions to be stated.
1. **Need** — "Is $f(x)=|x|$ differentiable at $x=0$? It's defined there, and it's continuous — check by computing $f'(0)$ from the definition." The limit doesn't settle to one value.
2. **Playground** — compute the one-sided limits separately ($h\to0^-$ and $h\to0^+$) and see they disagree.
3. **Invention** — "What does this disagreement mean geometrically?" Let the learner connect it to the visible corner in the graph.
4. **Collision** — confront a learner who assumed "continuous implies differentiable" with $|x|$'s own continuity (already established) alongside its failed derivative limit.
5. **Formalisation** — state the correct one-directional implication and the three failure-mode taxonomy (corner/cusp/vertical tangent).
6. **Compression** — "Differentiable means MORE than continuous — no gaps, AND no sudden bends."

## Teaching Sequence
The one-sided-derivative computation habit (targeting MC-1) must be established FIRST, on the canonical $|x|$ example, before the implication direction (MC-2) is stated — a learner who has just computed the disagreement themselves has direct, felt evidence for why "it looks smooth" cannot be trusted, which is exactly the evidence needed to accept that continuity (already established for the same function) is insufficient. The piecewise-boundary two-part test (A03) should come LAST, once both individual failure-detection skills are solid, since it requires applying both in sequence on a single problem — introducing it earlier risks a learner treating "check continuity" as sufficient on its own, re-planting MC-2. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the one-sided-derivative computation on $|x|$ at $0$, run with the learner computing both limits themselves. First action; anchors "compute, don't assume" concretely.
- **TEST-THINKING: Prediction** — "Is $|x|$ differentiable at $0$, given that it's continuous there?" asked BEFORE the one-sided derivatives are shown. Surfaces MC-2 in one turn.
- **DO: Demonstration** — the piecewise-boundary two-part test, run on a case where both parts genuinely pass, so the learner sees what "differentiable" positively looks like, not only what fails.
- **TEST-THINKING: Error Analysis** — "A student concluded $f(x)=x^{1/3}$ is differentiable at $0$ because it's continuous there. What's missing from their check?" targets MC-2 with a fresh (vertical-tangent) example.
- **Does NOT fit: introducing cusps and vertical tangents as a memorized taxonomy before the corner case (via $|x|$) is fully internalized.** The corner case is the Blueprint's own primary anchor; the other two failure modes are extensions, not independent starting points.

## Voice Teaching Notes
The load-bearing sentence is "continuity is necessary, but it is NOT enough — check the one-sided derivatives too." Say it every time a piecewise boundary or a "does this look smooth" judgment arises, not just the first. Listen for a learner declaring a function differentiable based purely on its graph's appearance, without mentioning having computed anything — that silence around computation is the tell for MC-1. Listen for fast, confident agreement when asked "so continuous means differentiable, right?" — fast agreement here, more than a hesitant guess, signals MC-2 is held as an assumed rule. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Declares a function differentiable based on visual smoothness without computing one-sided derivatives** — MC-1. Route to the one-sided-derivative computation, on the exact function in question.
- **Concludes differentiability from continuity alone** — MC-2. Route to the continuity-check-then-differentiability-fails contrast, using $|x|$ or a fresh cornered example.
- **Checks continuity at a piecewise boundary but skips the one-sided-derivative agreement check** — a partial instance of MC-2's territory; route to the two-part piecewise test.
- **Computes both one-sided derivatives before concluding, and correctly states differentiability's strict logical relationship to continuity** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.80×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a braking-then-accelerating velocity graph, connecting a corner to an undefined instantaneous acceleration) must include at least one item where continuity holds but differentiability fails — a gate made only of clean differentiable functions certifies nothing about the implication direction.

## Tutor Recovery Strategy
The likely utterance here is "but it's continuous — why isn't that enough?" — a reasonable question given how closely the two ideas seem related. The concept-specific smaller question returns to the road analogy: **"A road with no gaps can still have a sudden hairpin turn, right? Does 'no gaps' tell you anything about whether the turns are sudden or gradual?"** The learner says no, correctly, on ground they already own. Then return: "continuity is 'no gaps.' Differentiability is 'no gaps AND no sudden turns.' $|x|$ has no gaps at $0$, but it does have a sudden turn." If the frustration is instead about the one-sided-derivative computation itself feeling redundant when the function "obviously" has a corner, shrink to the bare check: **"You can SEE the corner in the picture — now show me the number that PROVES it, using the two one-sided limits."** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **conceptual distinction with an embedded procedure** (the implication direction is conceptual; computing one-sided derivatives is procedural). Review by *checking differentiability at a piecewise boundary where continuity holds but the derivatives DISAGREE*, not one where both checks trivially pass, since a trivial case lets MC-2's shortcut go undetected.
- Concept-specific deviation: keep $|x|$ at $x=0$ permanently in the review rotation as the standing counterexample to "continuous implies differentiable" — a review that only ever asks for the THEOREM's statement, without re-deriving the counterexample, lets MC-2 regrow as a memorized slogan.
- Interleaving partners: `math.calc.continuity` (the discriminating partner — reviewing continuity's own definition alongside this concept's differentiability definition keeps the two properly distinct) and `math.calc.derivative-definition` (the source of the actual computational test this concept applies).

## Transfer Connections
- **Near**: `math.calc.derivative-rules` (which presumes differentiability at every point it applies to, and implicitly assumes the scope check this concept makes explicit), `math.calc.mean-value-theorem` (whose hypotheses require differentiability on an open interval, precisely the condition this concept tests).
- **Far**: the hierarchy of regularity classes ($C^0\subsetneq C^1\subsetneq\cdots$) met in more advanced analysis, where "differentiable but not continuously differentiable" is the next strict-inclusion step beyond this concept's own "continuous but not differentiable."
- **Real-world**: any physical quantity whose RATE of change must be well-defined at every instant — velocity, acceleration, financial rate-of-return — where a "corner" in the underlying graph (a sudden gear shift, an abrupt policy change) genuinely breaks the derivative's existence at that instant.
- **Expert transfer**: the general discipline of checking a STRONGER condition explicitly rather than inferring it from a weaker one already established — the same discipline recurs whenever a theorem's hypothesis (differentiability, integrability, convergence) is easy to conflate with a related but strictly weaker property.

## Cross-Subject Connections
- **Physics**, genuine and strong: the transfer probe's braking-then-accelerating car is not a metaphor — a sudden gear change genuinely produces a velocity graph with a corner, at which point the car's acceleration (the derivative of velocity) is truly undefined, matching exactly what an accelerometer would show (a sudden reading, not a smooth transition).
- **Engineering**, real: mechanical systems with sudden control-input changes (a valve snapping open, a motor abruptly reversing) produce non-differentiable state variables at the switch instant, with real consequences for stress and vibration analysis.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the physics connection, while genuine and vivid (as the Blueprint's own transfer probe demonstrates), is an application of the concept rather than a structural dependency.

## Blueprint References
`docs/curriculum/blueprints/math.calc.differentiability.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the corner computation, Example 2 the continuity-without-differentiability contrast, Example 3 the piecewise boundary check), the Component 5 teaching actions (A01 P64 conceptual shift, A02 P06 contrast pair, A03 P11 representation shift, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2) and Protocol B repair actions (B01, B02), the P77 four-item problem set, and the P76 independence-mode transfer probe (the braking-then-accelerating car). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks both "Foundational" by severity but assigns no birth type), the mental-model ladder, the anti-analogy, the argued fully-guided-discovery approach, and the cross-reference naming MC-2's mechanism as the same implication-reversal pattern already documented for `math.calc.continuity-types` and `math.calc.derivative-definition`.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (none) and cross_links (none) match the live KG's own fields exactly, confirmed by direct query. Recorded as a positive finding, matching this batch's other three entries.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 39).
