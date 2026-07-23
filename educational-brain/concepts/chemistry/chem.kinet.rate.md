# Rate of Reaction — `chem.kinet.rate`

## Identity

- **KG ID**: chem.kinet.rate
- **Subject**: Chemistry
- **Domain**: Chemical Kinetics (chem.kinet)
- **Difficulty**: developing
- **Bloom level**: understand
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.found.concentration
- **Unlocks**: chem.kinet.photochemistry, chem.kinet.rate-law
- **Cross-links**: none

## Learning Objective

Students can define average reaction rate as −Δ[reactant]/Δt or +Δ[product]/Δt with the appropriate stoichiometric coefficient; define instantaneous rate as the gradient of a concentration-time graph at a specific point; correctly express the rate in terms of any species in the balanced equation; and qualitatively describe how concentration, temperature, surface area, and catalysts affect reaction rate.

## Core Understanding

**Average rate**: the change in concentration of a reactant or product per unit time over a finite interval. For a reaction aA + bB → cC + dD:

Rate = −(1/a)(Δ[A]/Δt) = −(1/b)(Δ[B]/Δt) = +(1/c)(Δ[C]/Δt) = +(1/d)(Δ[D]/Δt)

The negative sign ensures rate is positive for reactants (which decrease). The stoichiometric coefficient divides because different species change concentration at different rates.

**Instantaneous rate**: the rate at a specific instant — the slope (tangent) of the concentration-time graph at that point. The instantaneous rate decreases over time for most reactions (as reactants are consumed).

**Units of rate**: mol L⁻¹ s⁻¹ (or mol L⁻¹ min⁻¹ depending on the time scale of the reaction).

**Factors affecting rate** (qualitative at this level; quantitative treatment in chem.kinet.rate-law and chem.kinet.arrhenius):
- **Concentration**: more reactant molecules per unit volume → more frequent effective collisions → faster rate. Rate ∝ [reactant]ⁿ (the exponent is determined by experiment, not stoichiometry — that is chem.kinet.rate-law).
- **Temperature**: higher T → greater average kinetic energy → more collisions exceed the activation energy threshold → faster rate. Rule of thumb: rate roughly doubles per 10 °C rise.
- **Surface area**: for heterogeneous reactions (solid reactant), more surface area → more contact between reactant particles → faster rate.
- **Catalysts**: provide an alternative reaction pathway with lower activation energy → more collisions exceed the lower threshold → faster rate at the same temperature.

## Mental Models

**The collision frequency model**: reaction rate is controlled by (1) how often reactant molecules collide and (2) what fraction of those collisions have enough energy and correct orientation. Everything that increases collision frequency (higher concentration, temperature) or the fraction of successful collisions (catalysts, which lower the energy threshold) increases the rate.

**The slope-of-graph model for instantaneous rate**: plot [A] vs. time — the curve starts steep (fast rate when [A] is high) and flattens as [A] falls. Drawing the tangent at any point gives the instantaneous rate. At t = 0, the tangent has the steepest slope = initial rate.

## Why Students Fail

1. **Forgetting the stoichiometric coefficient**: for 2H₂ + O₂ → 2H₂O, the rate in terms of H₂ is −(1/2)(Δ[H₂]/Δt), not just −Δ[H₂]/Δt. Students set all species rates equal without dividing by their coefficients.
2. **Confusing rate with rate constant**: the rate depends on concentration and changes over time; the rate constant k depends on temperature but not on concentration. This distinction is introduced properly in chem.kinet.rate-law but students pre-empt it with incorrect usage.
3. **Concentration determines rate directly**: students think "higher concentration = rate doubled" (a 1:1 linear assumption). The actual dependence is an experimentally-determined power law — this is why the rate-law topic exists.
4. **Average vs. instantaneous rate**: students use average rate throughout, not recognising that "rate at t = 30 s" requires the tangent, not a chord.

## Misconceptions

**MC-1 — Rate is the same for all species in a reaction** (Type 4, notation-induced)
- *Mechanism*: students read "rate = Δ[A]/Δt = Δ[B]/Δt" from a simplified formula without the stoichiometric coefficients.
- *Diagnostic probe*: "For 2SO₂ + O₂ → 2SO₃, if [SO₂] decreases at 0.040 mol L⁻¹ s⁻¹, at what rate does [O₂] decrease?"
- *Characteristic phrase*: "Rate of SO₂ and O₂ decrease are the same — they're both reactants."
- *Repair*: rate = −(1/2)(Δ[SO₂]/Δt) = −(1/1)(Δ[O₂]/Δt); so Δ[O₂]/Δt = −0.020 mol L⁻¹ s⁻¹ (half the SO₂ rate, because the stoichiometric ratio O₂:SO₂ = 1:2).

**MC-2 — Rate stays constant until reactants are used up** (Type 2, perceptual intuition)
- *Mechanism*: students imagine reactions running at a constant speed that suddenly stops — analogous to a factory machine.
- *Diagnostic probe*: "Sketch [A] vs. time for 2A → products. Is the curve a straight line? What does the slope tell you about the rate?"
- *Characteristic phrase*: "The rate is constant, then suddenly drops to zero when all A is used."
- *Repair*: as [A] decreases, fewer A molecules are available to collide → collision frequency decreases → rate decreases continuously. The [A] vs. time graph is a curve (usually exponential for first-order), not a straight line that then drops to zero.

**MC-3 — Temperature affects rate because it melts particles** (Type 2, perceptual intuition)
- *Mechanism*: everyday experience of heat "loosening" things (ice → water, softening materials) generates an intuitive non-kinetic explanation.
- *Diagnostic probe*: "At 25 °C, a reaction runs slowly in aqueous solution. At 35 °C it runs faster. What changed at the molecular level?"
- *Characteristic phrase*: "Heat loosens the bonds so they break more easily."
- *Repair*: temperature raises the average kinetic energy of molecules → more collisions per second AND a greater fraction of collisions exceed the activation energy threshold. The particles don't "loosen" — the energy distribution shifts so more molecules can pass the activation energy barrier.

## Analogies

**The crowded room analogy for concentration**: imagine two people trying to find each other in a room. An empty room (low concentration) → they rarely meet. A packed room (high concentration) → they meet frequently. More people per unit area = more encounters = more chance of a reaction.

**The activation-energy hurdle**: think of the activation energy as a hurdle that each pair of colliding molecules must clear for a reaction to occur. Increasing temperature is like raising the energy of every runner (more can clear the hurdle). A catalyst is like lowering the hurdle height (more runners can clear it at the same energy level).

## Demonstrations

**Demonstration 1 — Concentration effect**
- React marble chips (CaCO₃) with HCl at two concentrations (0.5 mol L⁻¹ and 2 mol L⁻¹). Time the reaction by loss of mass (CO₂ evolution, weigh on a balance) or volume of CO₂ collected. Students observe faster initial rate with higher concentration. Plot mass vs. time for both experiments.

**Demonstration 2 — Temperature effect**
- React sodium thiosulfate with HCl at 20 °C and 40 °C. Time until the sulphur precipitate makes a cross drawn on paper invisible. Students directly compare times — the 40 °C reaction is roughly twice as fast, illustrating the "rate doubles per 10 °C" rule of thumb.

## Discovery Questions

1. "For the reaction N₂ + 3H₂ → 2NH₃, [H₂] decreases from 0.90 to 0.60 mol L⁻¹ in 30 s. Calculate the average rate of this reaction and the rate of change of [NH₃] over the same period." (Targets: Rate = −(1/3)(Δ[H₂]/Δt) = −(1/3)(−0.30/30) = +0.0033 mol L⁻¹ s⁻¹; Δ[NH₃]/Δt = +2 × rate = 0.0067 mol L⁻¹ s⁻¹.)
2. "A graph of [A] vs. time for a first-order reaction is exponential. At t = 0, the tangent has slope −0.05 mol L⁻¹ s⁻¹. At t = 50 s, the tangent has slope −0.025 mol L⁻¹ s⁻¹. What does this tell you about how the rate changes with time? How does this relate to [A] at each time?" (Targets: rate halved as time doubled — consistent with rate ∝ [A]: if [A] halved (first-order), rate halves. The instantaneous rate decreases as [A] decreases.)
3. "A catalyst is added to a reaction and the rate increases by a factor of 1000 at room temperature. Why would it take an enormous temperature increase to achieve the same rate increase without the catalyst?" (Targets: rate ∝ exp(−Ea/RT); to multiply rate by 1000 requires reducing Ea by RTln(1000) ≈ 17 kJ/mol — at 298 K. Alternatively, T must rise to where the Boltzmann factor exp(−Ea/RT) is 1000× larger — which may require T to reach hundreds of degrees depending on Ea. Catalyst makes the chemistry thermodynamically equivalent to a huge temperature increase without the energy cost or side reactions.)

## Teaching Sequence

1. Review from chem.found.concentration: molarity, concentration in mol L⁻¹, dilution.
2. Define average rate: concentration change over time. Work a simple example (Δ[A] = −0.4 mol L⁻¹ over 10 s → rate = 0.04 mol L⁻¹ s⁻¹).
3. Introduce stoichiometric coefficients: for aA → products, rate = −(1/a)(Δ[A]/Δt). Extend to both sides. Work Discovery Question 1.
4. Introduce instantaneous rate: tangent to the concentration-time graph. Draw a typical curve showing rate decreasing over time (MC-2 repair built in).
5. Present factors affecting rate: concentration, temperature, surface area, catalyst. For each, give the molecular explanation (collision model). Run Demonstrations 1 and 2.
6. Clarify what is NOT covered yet: the mathematical relationship between rate and concentration requires rate laws (chem.kinet.rate-law); why temperature has the quantitative effect it does requires Arrhenius (chem.kinet.arrhenius).

## Tutor Actions

- If student equates rates for all species without stoichiometric factor → MC-1 repair: compute the discrepancy for a simple 2:1 ratio stoichiometry.
- If student says rate is constant → MC-2 repair: draw the concentration-time curve; mark the tangent at two different times to show the rate decreasing.
- If student gives non-kinetic explanation for temperature → MC-3 repair: the activation-energy hurdle and Boltzmann energy distribution.
- Advance when student correctly calculates average rate with stoichiometric correction and correctly identifies that instantaneous rate requires the tangent of the concentration-time curve.

## Voice Teaching Notes

The stoichiometric coefficient rule is the most overlooked piece in rate calculations. Always write out the full rate expression (all four species for aA + bB → cC + dD) before doing any calculation. Make the student read the coefficients aloud from the balanced equation first.

When explaining instantaneous rate, the sketch of [A] vs. time is essential. Draw it slowly, explain the decreasing slope, then draw the tangent at two points. The visual of the tangent is more effective than any verbal definition.

## Assessment Signals

**Mastery gate**:
1. Student correctly computes average rate from concentration-time data, including the stoichiometric coefficient, for all species.
2. Student correctly identifies that instantaneous rate requires a tangent, not a chord, on the concentration-time graph.
3. Student correctly identifies the molecular explanation for concentration, temperature, surface area, and catalyst effects.

**FRAGILE signal**: student applies stoichiometric coefficients correctly for reactants but forgets them for products, or reverses the sign.

**MISCONCEIVING signal**: student says the rate is constant throughout the reaction. Draw the concentration-time curve immediately before any further calculation.

## Tutor Recovery Strategy

If stuck:
1. For stoichiometric correction: return to the balanced equation and count atoms. "If 2 mol SO₂ reacts for every 1 mol O₂, how many moles of O₂ react per second if SO₂ reacts at 2 mol/s?" The logical argument sidesteps the formula.
2. For instantaneous rate: use the speed analogy — average speed over a trip vs. speedometer reading at one instant. "Instantaneous speed = speedometer. Instantaneous rate = tangent."
3. For rate-decrease over time: "fewer reactant molecules → fewer collisions per second → slower rate." The collision frequency argument is intuitive.

## Memory Hooks

- **Rate formula with coefficients: −(1/a)(Δ[A]/Δt) = −(1/b)(Δ[B]/Δt) = +(1/c)(Δ[C]/Δt).** Negative for reactants; divide by stoichiometric coefficient.
- **Instantaneous rate = slope of tangent at that point on the [A] vs. t graph.** Not the chord.
- **Four factors: concentration, temperature, surface area, catalyst.** All increase rate; all act by increasing effective collision frequency or fraction.

## Transfer Connections

- **chem.kinet.rate-law**: the rate law r = k[A]ᵐ[B]ⁿ quantifies how concentration affects rate; m and n are determined experimentally, not from stoichiometry.
- **chem.kinet.arrhenius**: the Arrhenius equation k = Ae^(−Ea/RT) quantifies how temperature affects rate; it formalises the activation-energy threshold introduced here.

## Cross-Subject Connections

- **Biology (bio.enzymes)**: enzymes are biological catalysts; the factors affecting reaction rate (concentration, temperature, catalyst) apply directly to enzyme kinetics, where Km and Vmax are the enzyme equivalents of rate law parameters.
- **Physics (phys.therm.kinetic-theory)**: the Maxwell-Boltzmann energy distribution of molecular kinetic energies provides the quantitative basis for understanding why both temperature and catalysts affect the rate.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.kinet.rate`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.kinet.rate` as of 2026-07-23.

## Curriculum Feedback

None. The dependency structure is appropriate: rate fundamentals (this node) must precede rate laws and Arrhenius quantification.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
