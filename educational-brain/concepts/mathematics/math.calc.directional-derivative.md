# math.calc.directional-derivative

## Identity
- **KG ID**: `math.calc.directional-derivative`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.gradient` — load-bearing part: the directional derivative IS the gradient dotted with a direction, and its steepest-ascent/magnitude-as-rate facts are rigorously PROVEN here using exactly the object that concept introduces only descriptively.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (MAMR = ⌈0.75×5⌉ = 4/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.calc.directional-derivative.md` (reused by reference throughout)

## Learning Objective
- The learner can compute the directional derivative $D_uf=\nabla f\cdot u$, requiring $u$ to be a UNIT vector — a non-unit direction vector must be NORMALIZED first, or the formula gives an incorrectly scaled result.
- The learner can state that the directional derivative is MAXIMIZED when $u$ points in the SAME direction as $\nabla f$ (equal to $|\nabla f|$, the maximum rate of increase), and MINIMIZED (most negative) when $u$ points OPPOSITE to $\nabla f$.
- The learner can recognize the standard partial derivatives $f_x$ and $f_y$ as the SPECIAL CASES of the directional derivative in the directions $u=(1,0)$ and $u=(0,1)$ respectively.

## Core Understanding
The directional derivative $D_uf=\nabla f\cdot u$ measures the rate of change of $f$ at a point, moving in the specific direction of a UNIT vector $u$. Requiring $u$ to be a unit vector is not a technicality — the formula measures rate of change PER UNIT DISTANCE traveled in that direction, so using a non-unit vector scales the result by that vector's own length, producing a physically meaningless number unless normalization happens first. This single formula also makes rigorous two facts `math.calc.gradient` could only state descriptively: the directional derivative is genuinely MAXIMIZED — over every possible choice of unit direction $u$ — precisely when $u$ points in the SAME direction as $\nabla f$, giving $D_uf=|\nabla f|$ (the gradient's own magnitude); pointing $u$ in the OPPOSITE direction gives the most negative value, $-|\nabla f|$, the steepest possible decrease. Finally, the ordinary partial derivatives already familiar are themselves nothing more than SPECIAL CASE directional derivatives, measured along the coordinate axes: $f_x=D_{(1,0)}f$ and $f_y=D_{(0,1)}f$. The directional derivative is the genuine GENERALIZATION — it allows the rate of change to be measured in literally ANY direction, not merely the two special ones the axes happen to provide.

## Mental Models
1. **Beginner — "the directional derivative is the gradient dotted with a direction vector."** The formula is applied mechanically, without checking whether the given direction vector is already a unit vector. *Upgrade trigger*: computing $D_uf$ with a visibly non-unit vector and getting an answer that is exactly some multiple of the correct one.
2. **Intermediate — "normalize the direction vector first, THEN dot it with the gradient."** The normalization discipline is now reliably applied. *Upgrade trigger*: being asked for the direction of MAXIMUM increase, and needing to distinguish the maximizing DIRECTION from the maximum VALUE.
3. **Advanced — "the maximum directional derivative occurs in the gradient's own direction, and equals the gradient's MAGNITUDE — a single number, not the gradient's raw components; and the ordinary partials are simply directional derivatives along the axes."** All three facts (normalization, maximum-rate-as-magnitude, partials-as-special-case) are now connected as one coherent formula-and-its-consequences picture. *Upgrade trigger*: needing to apply this machinery to classify a multivariable critical point via a full second-order (Hessian) analysis, which builds on but goes beyond a single directional rate.
4. **Expert — the directional derivative formalizes exactly what `math.calc.gradient`'s own "steepest ascent" and "perpendicular to level curves" claims meant, using a rigorous dot-product argument (maximized by the Cauchy-Schwarz inequality when the two vectors are parallel).** The learner can now PROVE, not merely cite, the gradient's own geometric properties. *Shelf life*: permanent.

## Why Students Fail
The dominant failure applies the formula $\nabla f\cdot v$ directly to whatever direction vector is given, without first checking or performing normalization — since a dot product is computable for ANY two vectors regardless of length, nothing in the mechanical act of dotting two vectors together signals that the RESULT is only meaningful when $v$ has unit length (MC-1, DIRECTION-VECTOR-NOT-NORMALIZED-BEFORE-APPLYING-THE-FORMULA) — a Type 5 instruction-induced gap, since the dot-product OPERATION itself places no restriction on its inputs, so the unit-vector requirement is an external convention easy to omit without an explicit reminder attached to every application. A second, distinct failure reports the gradient VECTOR's own raw components as "the maximum rate," rather than correctly computing and reporting the gradient's MAGNITUDE — a single scalar number — conflating the maximizing DIRECTION (a vector, the normalized gradient) with the maximum VALUE (a scalar, the gradient's length) as if they were the same kind of answer to the same question (MC-2, MAXIMUM-RATE-REPORTED-AS-GRADIENT-COMPONENTS-RATHER-THAN-ITS-MAGNITUDE) — a Type 4 notation-induced gap, since both the direction and the rate are derived from the identical gradient vector, making it easy to report the vector itself without the additional step of extracting its magnitude for the rate question specifically.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its own repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (both "Foundational") but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — DIRECTION-VECTOR-NOT-NORMALIZED-BEFORE-APPLYING-THE-FORMULA** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 5, instruction-induced. The dot-product operation itself is defined for vectors of any length, so nothing in the mechanical computation signals that the RESULT is only physically meaningful for a unit direction vector — the unit-vector requirement is an external convention that must be explicitly checked, not something the formula enforces on its own.
  - **Characteristic phrase**: computing $\nabla f\cdot v$ directly using a visibly non-unit vector $v$, without a normalization step.
  - **Detection probe** (Blueprint's A01 hook): check whether normalization is performed for a non-unit direction vector.
  - **Repair**: Blueprint Repair Action B01 — re-compute the vector's magnitude explicitly and divide each component by it before applying the formula.
  - **Verification of death**: given a fresh non-unit direction vector, the learner computes its magnitude and normalizes it BEFORE performing the dot product, without prompting.

- **MC-2 — MAXIMUM-RATE-REPORTED-AS-GRADIENT-COMPONENTS-RATHER-THAN-ITS-MAGNITUDE** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 4, notation-induced. The maximizing direction and the maximum rate are both derived from the identical gradient vector, making it easy to report the vector's own components as the answer to "what is the maximum rate," when that question specifically requires the vector's MAGNITUDE, a different, scalar quantity.
  - **Characteristic phrase**: reporting $\nabla f=(4,1)$ itself, rather than $|\nabla f|=\sqrt{17}$, as "the maximum rate of increase."
  - **Detection probe** (Blueprint's A02 hook): this directly targets MC-2 (reporting the gradient's components directly as the maximum rate, rather than its magnitude).
  - **Repair**: Blueprint Repair Action B02 — re-derive the maximum rate explicitly as $|\nabla f|$, distinguishing it from the maximizing DIRECTION.
  - **Verification of death**: given a fresh gradient computation, the learner reports the maximum rate as a single scalar (the magnitude), distinct from the maximizing direction (a normalized vector).

## Analogies
- **Best — measuring wind speed only along the direction you're actually facing.** Wind blowing at a given true speed and direction produces a DIFFERENT "felt" speed depending on which way you face; facing directly into the wind gives the maximum felt speed (the wind's own true speed), while facing any other direction gives a smaller value — exactly like the directional derivative depending on the chosen direction $u$, maximized when $u$ aligns with $\nabla f$.
- **Alternative — a car's speedometer reading versus its top-speed capability.** The speedometer's reading right now depends on how hard the accelerator is pressed (a chosen "direction" of driving), but the car's own maximum POSSIBLE speed is a single fixed number (its top speed) — exactly like the directional derivative's value depending on the chosen direction, while the gradient's magnitude is the single fixed "top rate" achievable in the best direction.
- **ANTI-ANALOGY — "the maximum rate is just the gradient vector."** This phrasing licenses MC-2 directly, implying the vector itself IS the rate, when the rate is specifically the vector's MAGNITUDE (a scalar). Say "the gradient's magnitude — its length as a single number — is the maximum rate; the gradient's direction is a separate piece of information" instead.

## Demonstrations
- **The normalization catch.** For $f(x,y)=x^2y$ at $(1,2)$ with $\nabla f=(4,1)$, compute $\nabla f\cdot(3,4)$ directly (using the non-unit vector), then compute it again after normalizing $(3,4)$ to $\left(\frac35,\frac45\right)$. *Predict, before normalizing, whether the two computations will give the same answer.* Getting a result exactly 5 TIMES too large from the un-normalized computation is the demonstration for MC-1.
- **The direction-versus-magnitude contrast.** For the same function at $(1,2)$, report $\nabla f=(4,1)$ itself alongside $|\nabla f|=\sqrt{17}$ side by side, asking which one answers "what is the maximum rate of increase." *Predict, before computing the magnitude, which of the two — the vector or its length — is the correct answer to a rate question.* Confirming the magnitude (a single number) is the demonstration for MC-2.
- **The partial-derivative special-case check.** Compute $D_{(1,0)}f$ directly via the dot product, then compare against $f_x$ computed the ordinary way. *Predict, before comparing, whether these two different-looking computations will match.* Getting the IDENTICAL result reinforces that ordinary partials are simply directional derivatives along the axes.

## Discovery Questions
Direct instruction is the argued call for the formula's own definition (a specific dot-product construction best presented explicitly), but the normalization consequence (MC-1) and the direction-versus-magnitude distinction (MC-2) are both genuinely discoverable by direct trial.
1. **Need** — "Compute $\nabla f\cdot(3,4)$ directly. Now normalize $(3,4)$ to a unit vector and compute again. Do they match?" They do not.
2. **Playground** — try the same normalized-versus-unnormalized comparison on a couple more direction vectors.
3. **Invention** — "Why does using a non-unit vector scale the answer?" Let the learner connect it to the vector's own length multiplying into the dot product.
4. **Collision** — confront a learner who skipped normalization with the direct numerical mismatch against the normalized computation.
5. **Formalisation** — state the rule precisely: the directional derivative formula requires $u$ to be a unit vector.
6. **Compression** — "Normalize first — always."

## Teaching Sequence
The normalization requirement (MC-1, per the Blueprint's own A01) must be established FIRST, since it is a precondition for every subsequent computation in this concept — the maximum-rate discussion (MC-2) would be meaningless if built on an incorrectly-scaled directional derivative. The maximum-rate-as-magnitude distinction (per the Blueprint's own A02) follows directly, using the SAME gradient already computed to make the direction-versus-magnitude contrast vivid. The partial-derivative special-case connection (reused procedure, per the Blueprint's own A03) is placed LAST, once the general formula is fluent, since it is a confirming special-case check rather than new conceptual content. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the normalization catch (Example 1), computing the dot product both with and without normalization and comparing results. First action; anchors the normalization discipline concretely.
- **TEST-THINKING: Error Analysis** — "A student computed $\nabla f\cdot v$ directly using $v=(3,4)$ without normalizing. What's wrong?" targets MC-1 directly.
- **DO: Demonstration** — the direction-versus-magnitude contrast (Example 2), reporting both the gradient vector and its magnitude side by side.
- **TEST-THINKING: Prediction** — "Is the maximum rate of increase the gradient vector itself, or a single number derived from it?" asked BEFORE computing the magnitude. Surfaces MC-2 in one turn.
- **Does NOT fit: the Hessian-based classification of multivariable critical points, or the rigorous Cauchy-Schwarz proof of why the gradient direction maximizes the dot product, here.** Those belong to more advanced treatments not covered by this specific concept's own scope.

## Voice Teaching Notes
The load-bearing sentence is "normalize the direction first — and the maximum RATE is the gradient's magnitude, a single number, never the vector itself." Say it every time a new directional-derivative problem is set up, not just the first. Listen for a learner who dots the gradient with a visibly non-unit vector without pausing to normalize — that specific omission is the tell for MC-1. Listen for a learner who reports a vector (like "(4,1)") when asked for "the maximum rate" — that specific answer shape is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Computes the directional derivative using a non-unit direction vector without normalizing first** — MC-1. Route to the normalization catch, on the exact function and vector in question.
- **Reports the gradient vector's own components, rather than its magnitude, as the maximum rate of increase** — MC-2. Route to the direction-versus-magnitude contrast, on the exact function in question.
- **Correctly normalizes any non-unit direction vector before applying the formula, and distinguishes the maximizing direction from the maximum rate (a scalar magnitude)** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.75×5⌉=4). The 4-item P77 set plus the P76 transfer probe (the hiker-on-a-mountainside problem) must include at least one item requiring the learner to explain WHY the direction vector must be a unit vector, not merely execute a given directional-derivative computation mechanically — a gate made only of correct-computation items risks certifying mechanics without certifying the conceptual discrimination against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "I dotted the gradient with the direction vector — isn't that the whole formula?" — a reasonable-sounding shortcut given that the dot product IS the core operation. The concept-specific smaller question returns to a direct length check: **"What is the LENGTH of this direction vector — is it exactly 1?"** The learner computes the magnitude and finds it is not 1. Then return: "the formula specifically measures rate per unit distance — using a longer vector scales the answer by that extra length. Normalize first, then dot." If the frustration is instead about the direction-versus-magnitude question, shrink to the bare check: **"Is 'the maximum rate' asking for a direction, or a single number?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded input-validation requirement** (checking and enforcing the unit-vector condition is the single most load-bearing discipline in this concept, not an optional refinement). Review by *requiring the learner to state the direction vector's magnitude explicitly, before computing any dot product*, never accepting a correctly-computed final answer alone as evidence of understanding, since a learner can occasionally be given an already-unit vector and never be forced to demonstrate the normalization step.
- Concept-specific deviation: keep at least one review item requiring the maximum-rate DIRECTION and one requiring the maximum-rate VALUE, asked as genuinely separate questions, so the discrimination against MC-2 stays exercised rather than atrophying into always reporting the same kind of answer.
- Interleaving partners: `math.calc.gradient` (the discriminating partner — this concept directly proves what that one only states descriptively, so reviewing them together keeps the "gradient's own facts, now rigorously derived" connection explicit) and `math.calc.partial-derivatives`, whose individual partials are the special-case directional derivatives along the axes.

## Transfer Connections
- **Near**: `math.calc.gradient` (the parent concept this one directly extends and rigorously justifies).
- **Far**: the Cauchy-Schwarz inequality's own maximization argument — the fact that a dot product $\nabla f\cdot u$ is maximized precisely when $u$ aligns with $\nabla f$ is a direct instance of this more general algebraic inequality, applicable well beyond calculus.
- **Real-world**: the Blueprint's own transfer probe — a hiker choosing a specific compass direction on a mountainside — is a direct, intuitive physical application distinguishing "steepness in a chosen direction" from "steepest possible climb."
- **Expert transfer**: recognizing that a general formula (here, the directional derivative) can both COMPUTE a specific instance's answer and, via its own optimization over all possible inputs, PROVE a more general geometric fact (the gradient's steepest-ascent property) — a pattern recurring whenever a parametrized family of computations is optimized over its own parameter.

## Cross-Subject Connections
- **Geography/cartography**, real: the Blueprint's own transfer probe (a hiker's steepness in a chosen compass direction) is a standard, literal application in trail planning and topographic analysis.
- **Physics**, real: computing the rate of change of a scalar field (temperature, pressure, potential) in a SPECIFIC direction of travel, rather than the overall steepest direction, is a direct application of this exact formula.
- **Engineering**, real: analyzing how a measured quantity changes along a specific direction of motion through a field of values (e.g. a sensor moving through a stress or temperature field) uses this identical technique.
- No genuine KG cross_link exists for this concept.

## Blueprint References
`docs/curriculum/blueprints/math.calc.directional-derivative.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the normalization computation breaking MC-1, Example 2 the maximum-rate-as-magnitude computation breaking MC-2, Example 3 the partial-derivative special-case verification), the Component 5 Teaching Actions (A01 P64 conceptual shift, A02 P11 representation shift, A03 reused procedure, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the four-item P77 problem set, and the P76 independence-mode transfer probe (the hiker-on-a-mountainside problem). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-formula-definition / guided-discovery-for-the-normalization-and-magnitude-distinction split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.gradient`), unlocks (none), cross_links (none), difficulty (advanced), bloom (apply), mastery_threshold (0.75), and estimated_hours (4) all match the live KG's own fields exactly, confirmed by direct query. This is the first of four zero-discrepancy concepts in this batch, continuing the streak restarted in Batch 43 after Batch 42's `arc-length` broke the prior five-consecutive-zero run — this would make Batch 48 the SIXTH consecutive all-4-zero-discrepancy batch if the pattern holds across the remaining three entries.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 48).
