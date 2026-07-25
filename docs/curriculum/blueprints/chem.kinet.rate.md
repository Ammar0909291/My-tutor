# chem.kinet.rate — Rate of Reaction

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.kinet.rate` |
| Domain | Chemical Kinetics |
| Requires | `chem.found.concentration` |
| Unlocks | `chem.kinet.photochemistry`, `chem.kinet.rate-law` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

Reaction rate measures how fast reactant concentration decreases or product concentration increases over time, expressed as average rate (Δconcentration/Δt over an interval) or instantaneous rate (the tangent slope of concentration vs. time at one moment) — with stoichiometric coefficients required to reconcile the differing rates of change of different species in the same reaction, and rate influenced by concentration, temperature, surface area, and catalysts through their effect on collision frequency and the fraction of collisions exceeding the activation energy.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: React marble chips with hydrochloric acid at two concentrations, timing CO₂ evolution — the higher-concentration reaction visibly bubbles faster.

**Representational**: A concentration-vs-time graph, curved (not straight) and steepest at t=0, flattening as the reaction proceeds.

**Abstract**: rate = −(1/a)(Δ[A]/Δt) = +(1/c)(Δ[C]/Δt) for aA → cC, with instantaneous rate as the tangent slope at any point on the curve.

**Transfer**: Predicting, from a stoichiometric equation and one species' measured rate, the rate of change of every other species — without re-measuring each one.

## 3. Why Beginners Fail

Students apply "rate = Δ[A]/Δt = Δ[B]/Δt" from an oversimplified formula without the stoichiometric coefficients (so unequal-coefficient reactions get equal rates assigned to unequal-coefficient species), picture reaction rate as constant-then-abruptly-zero like a machine switching off rather than continuously decreasing, and explain temperature's effect on rate with an intuitive "heat melts/loosens things" mechanism instead of the collision-frequency/activation-energy mechanism.

## 4. Misconception Library

### MC-1: Rate is the same for all species in a reaction
- **Probe**: "For 2SO₂ + O₂ → 2SO₃, if [SO₂] decreases at 0.040 mol L⁻¹ s⁻¹, at what rate does [O₂] decrease?"
- **Characteristic phrase**: "Rate of SO₂ and O₂ decrease are the same — they're both reactants."
- **Trigger (Type 4, notation-induced)**: Students read "rate = Δ[A]/Δt = Δ[B]/Δt" from a simplified formula without the stoichiometric coefficients.
- **Conflict evidence [P28]**: With the correct expression rate = −(1/2)(Δ[SO₂]/Δt) = −(1/1)(Δ[O₂]/Δt), Δ[O₂]/Δt works out to −0.020 mol L⁻¹ s⁻¹ — half the SO₂ rate, exactly matching the 2:1 stoichiometric ratio.
- **Bridge [P30]**: Rate of reaction (a single number) is not the same as rate of change of any one species' concentration — the two are linked by dividing out each species' stoichiometric coefficient.
- **Replacement [P31]**: rate = −(1/a)(Δ[A]/Δt) = −(1/b)(Δ[B]/Δt) = +(1/c)(Δ[C]/Δt) for aA + bB → cC, always normalized by coefficients.
- **Discrimination pairs [P33]**: 1:1 stoichiometry (rates genuinely equal) vs. 2:1 stoichiometry (rates in a 2:1 ratio, not equal).
- **S6 repair path**: Compute the SO₂/O₂ discrepancy directly for the 2:1 ratio case.

### MC-2: Rate stays constant until reactants are used up
- **Probe**: "Sketch [A] vs. time for 2A → products. Is the curve a straight line? What does the slope tell you about the rate?"
- **Characteristic phrase**: "The rate is constant, then suddenly drops to zero when all A is used."
- **Trigger (Type 2, perceptual intuition)**: Students imagine reactions running at a constant speed that suddenly stops, analogous to a factory machine switching off.
- **Conflict evidence [P28]**: As [A] decreases, fewer A molecules are available to collide, so collision frequency — and thus rate — decreases continuously; the [A]-vs-time graph is a curve (typically exponential for first-order), never a straight line that drops abruptly to zero.
- **Bridge [P30]**: Rate depends on how much reactant is currently present, so as that amount falls, rate must fall with it — continuously, not in a sudden step.
- **Replacement [P31]**: Instantaneous rate is the tangent slope of the concentration-time curve at a given moment; that slope shrinks continuously as the reaction proceeds.
- **Discrimination pairs [P33]**: A straight declining line (constant rate, wrong) vs. a curve steepest at t=0 and flattening toward the end (correct).
- **S6 repair path**: Draw the tangent at two different time points on the same curve and compare slopes directly.

### MC-3: Temperature affects rate because it melts particles
- **Probe**: "At 25°C, a reaction runs slowly in aqueous solution. At 35°C it runs faster. What changed at the molecular level?"
- **Characteristic phrase**: "Heat loosens the bonds so they break more easily."
- **Trigger (Type 2, perceptual intuition)**: Everyday experience of heat "loosening" things (ice → water, softening materials) generates an intuitive non-kinetic explanation.
- **Conflict evidence [P28]**: Temperature raises the average kinetic energy of molecules, which both increases collision frequency AND increases the fraction of collisions exceeding the activation energy threshold — this is a shift in the energy distribution among reactant molecules, not a softening of bonds before any collision occurs.
- **Bridge [P30]**: The "loosening" intuition confuses what happens to a solid material's internal bonds with what happens to the kinetic energy of separate colliding molecules in a reaction mixture.
- **Replacement [P31]**: Higher temperature shifts the molecular kinetic-energy distribution so more molecules carry enough energy to clear the activation-energy barrier upon collision.
- **Discrimination pairs [P33]**: A solid melting (bonds within one substance weakening) vs. two separate reactant molecules colliding with enough energy to react (a kinetic, not structural, effect).
- **S6 repair path**: Use the activation-energy hurdle analogy — raising temperature raises the energy of every runner, so more clear the hurdle.

## 5. Explanation Library

**Primary explanation**: Reaction rate is how fast concentration changes over time, measured as average rate (over an interval) or instantaneous rate (the tangent slope at one moment). Because different species in a reaction change concentration at different rates set by their stoichiometric coefficients, the rate expression divides each species' Δconcentration/Δt by its own coefficient so that all species give the same single "rate of reaction" value.

**Secondary explanation (collision framing)**: Rate depends on how often reactant particles collide with enough energy to react — concentration and surface area affect collision frequency, temperature affects both collision frequency and the fraction of collisions exceeding the activation energy, and catalysts provide an alternative pathway with lower activation energy.

## 6. Analogy Library

- **Primary analogy**: A crowded room where two people are trying to find each other — an empty room (low concentration) means they rarely meet; a packed room (high concentration) means frequent encounters; the activation-energy hurdle is a bar that colliding pairs must clear to react, and temperature raises everyone's energy so more pairs clear it.
- **Breaking point**: The room analogy captures collision frequency but not the exponential (Arrhenius) dependence of rate on temperature — that quantitative relationship needs `chem.kinet.arrhenius`.
- **Anti-analogy**: Do NOT describe temperature as "melting" or "loosening" the reactants — this directly reinforces MC-3's non-kinetic mental model.

## 7. Demonstration Library

- **Demonstration 1 (concentration effect)**: React marble chips (CaCO₃) with HCl at 0.5 mol L⁻¹ and 2 mol L⁻¹, timing by mass loss (CO₂ evolution) or gas volume collected; plot mass vs. time for both — the higher-concentration run is visibly faster.
- **Demonstration 2 (temperature effect)**: React sodium thiosulfate with HCl at 20°C and 40°C, timing until a precipitate obscures a cross drawn on paper beneath the flask — the 40°C run is roughly twice as fast, illustrating the "rate doubles per 10°C" rule of thumb.

## 8. Discovery Lesson

**Opening**: "For N₂ + 3H₂ → 2NH₃, [H₂] decreases from 0.90 to 0.60 mol L⁻¹ in 30 s. What's the rate of change of [NH₃] over that same period — is it the same number?"

**Exploration**: Students compute the average rate of H₂ consumption, then are guided to derive the NH₂ rate of change using the reaction's stoichiometric ratio (2:3), discovering it isn't the same raw number as H₂'s Δ/Δt.

**Synthesis**: Guide toward: a single "rate of reaction" value exists once each species' Δconcentration/Δt is divided by its own coefficient — this is why the coefficient-normalized rate expression is necessary.

**Closure**: "If someone told you 'the reaction rate is constant until the reactant runs out,' how would you use today's stoichiometry work to also challenge that claim about the *shape* of the rate over time?" (Bridges into MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present a real concentration-vs-time curve and mark the tangent slope at two different points.
- **TA-2 (TELL)**: State the coefficient-normalized rate expression explicitly, applied to a worked stoichiometric example.
- **TA-3 (DO)**: Student computes Δ[NH₃]/Δt from given Δ[H₂]/Δt using stoichiometry (Discovery Question 1 style).
- **TA-4 (TEST-THINKING)**: Present MC-3's "heat loosens bonds" claim and ask the student to reframe it using collision/activation-energy language.

## 10. Voice Teaching

Always write out the full coefficient-normalized rate expression before any calculation, and have the student read the stoichiometric coefficients aloud from the balanced equation first — this is the single most overlooked step. When introducing instantaneous rate, draw the concentration-time curve slowly and mark the tangent live rather than stating the definition verbally first.

## 11. Assessment

**Mastery gate**: Student can (a) compute average rate from concentration-time data including the stoichiometric coefficient for any species, (b) correctly state that instantaneous rate requires a tangent, not a chord, (c) give the collision/activation-energy explanation for concentration, temperature, surface area, and catalyst effects.

- **FA-1**: "For 2SO₂ + O₂ → 2SO₃, if [SO₂] decreases at 0.040 mol L⁻¹ s⁻¹, at what rate does [O₂] decrease?" — targets MC-1.
- **FA-2**: "Sketch [A] vs. time for a reaction. Is the line straight or curved? Why?" — targets MC-2.
- **FA-3**: "Explain, at the molecular level, why raising temperature speeds up a reaction." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 for reactions with unequal stoichiometric coefficients, since equal-coefficient examples are usually taught first and generalized incorrectly.

**Delayed retrieval**: Re-probe MC-1's stoichiometric normalization before `chem.kinet.rate-law` introduces rate laws with reaction orders, since rate-law work assumes fluent coefficient handling.

## 12. Recovery Notes

- **S3 (stuck)**: For stoichiometric correction, return to the balanced equation and count atoms directly: "If 2 mol SO₂ reacts for every 1 mol O₂, how many moles of O₂ react per second if SO₂ reacts at 2 mol/s?"
- **S4 (frustrated)**: Normalize — the constant-rate intuition is a reasonable transfer from everyday machine-like processes, not a careless error.
- **S6 (collision)**: Use the SO₂/O₂ discrepancy computation for MC-1; use the two-tangent comparison for MC-2.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why instantaneous rate needs a tangent rather than an average slope.

## 13. Memory & Review

Tag as a procedural-formula memory (stoichiometric rate normalization) plus a conceptual-correction memory (continuously decreasing rate, collision-based temperature effect). Schedule a spaced check at ~1 week and again before `chem.kinet.rate-law`.

## 14. Transfer Map

Feeds into `chem.kinet.rate-law` (rate expressions and reaction orders build directly on the coefficient-normalized rate definition) and `chem.kinet.photochemistry` (light-driven reaction rates use the same rate-definition machinery with a different energy source).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
