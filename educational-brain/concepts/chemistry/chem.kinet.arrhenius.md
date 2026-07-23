# Arrhenius Equation — `chem.kinet.arrhenius`

## Identity

- **KG ID**: chem.kinet.arrhenius
- **Subject**: Chemistry
- **Domain**: Chemical Kinetics (chem.kinet)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.kinet.rate-law
- **Unlocks**: chem.kinet.catalysis
- **Cross-links**: phys.therm.first-law

## Learning Objective

Students can state the Arrhenius equation and identify each parameter; use the linear form ln k = ln A − Ea/RT to determine Ea and A from k vs. T data; apply the two-temperature form to calculate k at a new temperature; describe the physical meaning of Ea and A in terms of collision theory; and explain qualitatively how catalysts lower Ea.

## Core Understanding

**Arrhenius equation**: k = A e^(−Ea/RT)

where:
- k = rate constant (units depend on reaction order)
- A = pre-exponential factor (frequency factor); same units as k; represents the maximum possible rate constant at T → ∞ (collision frequency × steric factor)
- Ea = activation energy (J mol⁻¹); the minimum kinetic energy colliding molecules must have along the reaction coordinate for a collision to result in reaction
- R = 8.314 J mol⁻¹ K⁻¹
- T = absolute temperature (KELVIN, not Celsius)

**Collision theory interpretation**:
- A = Z × p, where Z = collision frequency (per unit concentration squared) and p = steric factor (fraction of collisions with correct orientation)
- e^(−Ea/RT) = Boltzmann factor = fraction of collisions with energy ≥ Ea

Rate constant k = (collision frequency) × (steric factor) × (fraction of collisions with E ≥ Ea)

**Linear form (linearised Arrhenius)**:
ln k = ln A − Ea/RT

A plot of ln k vs. 1/T gives a straight line with:
- Slope = −Ea/R → Ea = −slope × R
- Intercept = ln A → A = e^(intercept)

**Two-temperature form** (eliminates A):
ln(k₂/k₁) = −(Ea/R)(1/T₂ − 1/T₁)

Use when given k at two temperatures and asked to find Ea, or given Ea and k at one temperature to find k at another.

**Rules of thumb**:
- For many reactions near room temperature, k approximately doubles for each 10°C rise (Q₁₀ ≈ 2).
- This corresponds to Ea ≈ 50–60 kJ mol⁻¹.

**Catalysts and Ea**: a catalyst provides an alternative reaction pathway with a lower Ea. Since Ea appears in the exponent, even a modest reduction in Ea produces a large increase in k. At a given T:
k_cat / k_uncat = e^(ΔEa/RT) where ΔEa = Ea,uncat − Ea,cat

A 40 kJ/mol reduction in Ea at 298 K → k increases by factor e^(40000/8.314×298) ≈ e^16 ≈ 10^7.

## Mental Models

**The mountain-pass model**: the energy diagram along the reaction coordinate is a mountain path. Reactants are in a valley; products are in another valley; between them is an energy mountain-pass (the transition state) at height Ea above the reactant valley. Only molecules with enough kinetic energy to reach the pass can react. A catalyst cuts a tunnel through the mountain — the same route but lower — so more molecules can pass per unit time.

**The bouncer-and-speed model**: imagine A is a fraction of molecules with enough speed to enter a club (activate). The Boltzmann factor e^(−Ea/RT) gives the fraction fast enough. A gives the number of molecules trying. k = A × fraction that succeed. Higher T → more fast molecules → higher fraction → higher k.

## Why Students Fail

1. **Using T in Celsius instead of Kelvin**: the most common arithmetic error. T must be in Kelvin in ALL Arrhenius calculations.
2. **Forgetting the negative sign in the slope**: ln k vs. 1/T has slope = −Ea/R. Students drop the negative and get a positive Ea from a negative slope.
3. **A has the same units as k**: students assume A is dimensionless or in mol units. A absorbs all the concentration-unit factors; its units match k.
4. **Higher Ea always means slower reaction, regardless of T**: true at fixed T, but at sufficiently high T, even high-Ea reactions can be fast. The rule is Ea-dependent; T modulates the effect.

## Misconceptions

**MC-1 — Temperature in Arrhenius can be in Celsius** (Type 4, notation-induced)
- *Mechanism*: students routinely use Celsius in other formulas (ΔH, cp, etc.) and transfer the habit.
- *Diagnostic probe*: "Calculate k at 27°C if k = 0.050 s⁻¹ at 17°C and Ea = 60 kJ mol⁻¹. Show your temperature conversion."
- *Characteristic phrase*: "I used T = 27 and T = 17 in the two-temperature formula — both in Celsius."
- *Repair*: T = 27°C = 300 K; T = 17°C = 290 K. The Arrhenius equation derives from the Boltzmann factor e^(−Ea/kT) where kT is thermal energy — kT only has energy units when T is in Kelvin (k_B × K = J). Celsius offsets destroy the zero-point reference. Always: T(K) = T(°C) + 273.

**MC-2 — The slope of ln k vs. 1/T equals Ea/R (positive)** (Type 4, notation-induced from sign error)
- *Mechanism*: students write ln k = ln A − Ea/RT, then rearrange and forget the negative sign when extracting Ea from the slope.
- *Diagnostic probe*: "A graph of ln k vs. 1/T has slope = −8500 K. What is Ea?"
- *Characteristic phrase*: "slope = Ea/R, so Ea = slope × R = −8500 × 8.314 — but energy can't be negative, so something is wrong."
- *Repair*: ln k = ln A − (Ea/R)(1/T). Slope = −Ea/R. Ea = −slope × R = −(−8500) × 8.314 = +70,669 J mol⁻¹ ≈ 70.7 kJ mol⁻¹. Activation energy is always positive — if you get a negative answer, the sign of the slope was handled incorrectly.

**MC-3 — A is the activation energy** (Type 3, language contamination)
- *Mechanism*: "A" is the first parameter in k = A e^(−Ea/RT); students sometimes conflate it with "activation" and think A = Ea.
- *Diagnostic probe*: "In the Arrhenius equation, what does A represent physically? What are its units?"
- *Characteristic phrase*: "A is the activation energy — that's what the 'A' stands for."
- *Repair*: A is the frequency factor (also called the pre-exponential factor). It represents the maximum rate constant when every collision leads to reaction (T → ∞ → e^(−Ea/RT) → 1). Its name mnemonic: A for "Attempt frequency." Ea is written as "E" with subscript "a" (for activation). A and Ea are completely different physical quantities with different units.

## Analogies

**The ignition threshold analogy**: Ea is a spark threshold. Some molecules have enough energy to ignite (react); most don't. Temperature is the fuel supply: more fuel (higher T) means a larger fraction of molecules above the threshold. A is how many molecules are attempting to ignite per second.

**The Boltzmann fraction analogy**: at room temperature (RT ≈ 2.5 kJ/mol), Ea = 50 kJ/mol means only e^(−50/2.5) = e^(−20) ≈ 2 × 10⁻⁹ of collisions succeed. Even with 10^30 collisions per second in a mole of gas, only ~2 × 10^21 reactions per second — a measurable rate. This number viscerally illustrates why most collisions don't react and why Ea is so influential.

## Demonstrations

**Demonstration 1 — Effect of temperature on reaction rate**
- Run the permanganate/oxalic acid decolourisation at 0°C (ice), 25°C (room temp), and 60°C (warm water bath). Time to decolourisation changes dramatically. Students empirically observe that k increases with T. Plotting ln k vs. 1/T from the three time measurements gives a straight line → extract Ea graphically.

## Discovery Questions

1. "For the decomposition of N₂O₅: k = 3.0 × 10⁻⁵ s⁻¹ at 25°C and k = 1.4 × 10⁻³ s⁻¹ at 45°C. Calculate Ea." (Targets: T₁ = 298 K, T₂ = 318 K. ln(k₂/k₁) = ln(1.4 × 10⁻³ / 3.0 × 10⁻⁵) = ln(46.7) = 3.844. Ea = −R × 3.844 / (1/318 − 1/298) = −8.314 × 3.844 / (−2.109 × 10⁻⁴) = 31,946/2.109 × 10⁻⁴ ≈ 102 kJ/mol.)
2. "A reaction has Ea = 85 kJ/mol and A = 2.5 × 10¹² s⁻¹. Calculate k at 37°C." (Targets: T = 310 K. k = 2.5 × 10¹² × e^(−85000/8.314×310) = 2.5 × 10¹² × e^(−32.98) = 2.5 × 10¹² × 4.55 × 10⁻¹⁵ ≈ 0.011 s⁻¹ ≈ 1.1 × 10⁻² s⁻¹.)
3. "A catalyst reduces Ea from 120 kJ/mol to 75 kJ/mol at 298 K. By what factor does k increase?" (Targets: k_cat/k_uncat = e^(−75000/RT) / e^(−120000/RT) = e^((120000−75000)/RT) = e^(45000/8.314×298) = e^18.15 ≈ 7.7 × 10⁷. The rate increases by ~77 million times.)

## Teaching Sequence

1. Review from chem.kinet.rate-law: k is the rate constant; at fixed T, k is constant. Now we ask: how does k depend on T?
2. Motivate from data: show k measured at several temperatures — k increases with T. Ask students to propose a mathematical relationship. Introduce the Arrhenius equation k = A e^(−Ea/RT).
3. Physical meaning of each parameter: Ea (energy threshold), A (attempt frequency), e^(−Ea/RT) (Boltzmann fraction). Mountain-pass model.
4. Linear form: derive ln k = ln A − Ea/RT. Show how to get Ea from slope. Address MC-2 (negative sign). Work Discovery Question 1.
5. Two-temperature form: derive directly from the linear form. Emphasise T in Kelvin. Address MC-1.
6. Work Discovery Question 2 (single-temperature calculation).
7. Catalysts: show energy diagram with and without catalyst. Compute the rate increase for a Ea reduction. Work Discovery Question 3. Lead into chem.kinet.catalysis.

## Tutor Actions

- If student uses Celsius in Arrhenius → MC-1 repair: T = °C + 273; RT must be in J/mol; thermal energy is meaningless in Celsius.
- If student gets negative Ea from slope → MC-2 repair: slope = −Ea/R; Ea = −slope × R; check sign convention.
- If student confuses A with Ea → MC-3 repair: A is frequency factor, same units as k; Ea is energy in J/mol.
- Advance when student correctly extracts Ea from two-temperature data and correctly calculates k at a new temperature.

## Voice Teaching Notes

Before every Arrhenius calculation: "Is T in Kelvin?" Say it out loud. It catches MC-1 ~80% of the time before the arithmetic begins.

For the two-temperature formula: "Write it as ln(k₂/k₁) = −(Ea/R)(1/T₂ − 1/T₁). Never rearrange it from memory until you've written it from the linearized Arrhenius equation at least ten times. The sign errors come from rearranging a half-remembered formula."

## Assessment Signals

**Mastery gate**:
1. Student correctly identifies Ea and A in the Arrhenius equation and states their physical meanings.
2. Student correctly calculates Ea from k at two temperatures (with T in Kelvin, correct signs).
3. Student correctly calculates k at a new temperature given Ea and k at another temperature.
4. Student correctly explains (qualitatively and with the factor calculation) how a catalyst increases k by lowering Ea.

**FRAGILE signal**: student gets Ea calculation correct but cannot connect Ea to the fraction of successful collisions (the Boltzmann factor) — the thermodynamic physics is absent.

**MISCONCEIVING signal**: student uses T in Celsius. Stop immediately; correct before any calculation proceeds.

## Tutor Recovery Strategy

If stuck:
1. For the two-temperature form: "Start from ln k = ln A − Ea/RT. Write this equation twice — once for T₁ and once for T₂. Subtract the first from the second. What cancels? ln A cancels. What remains? ln k₂ − ln k₁ = −Ea/R × (1/T₂ − 1/T₁). That's the two-temperature form — derived, not memorised."
2. For Ea from slope: "Your graph gives you rise/run = Δ(ln k)/Δ(1/T). That equals −Ea/R. Multiply by −R and flip the sign. If slope is negative (as expected), Ea is positive."
3. For units of A: "What are units of k for a first-order reaction? s⁻¹. k = A × (dimensionless Boltzmann factor). So A also has units of s⁻¹." Generalise to other orders.

## Memory Hooks

- **k = A e^(−Ea/RT). T in KELVIN. Ea in J/mol.**
- **ln k = ln A − (Ea/R)(1/T). Slope of ln k vs. 1/T = −Ea/R. (Negative slope → positive Ea.)**
- **Two-temperature form: ln(k₂/k₁) = −(Ea/R)(1/T₂ − 1/T₁).**
- **Catalyst: lowers Ea → exponential increase in k (e^ΔEa/RT factor, can be millions).**

## Transfer Connections

- **chem.kinet.catalysis**: the quantitative rate increase from lowering Ea (this node) motivates catalysis — how enzymes and industrial catalysts achieve such dramatic rate enhancements.
- **chem.kinet.mechanism**: the transition state at the top of the Ea barrier is a rate-determining molecular configuration; mechanism determines which bond-breaking step has the highest Ea.

## Cross-Subject Connections

- **Physics (statistical mechanics)**: the Boltzmann factor e^(−E/kT) is the probability of occupying a state with energy E at temperature T — the Arrhenius Boltzmann factor is the same physics applied to chemical kinetics.
- **Biology (enzyme kinetics)**: enzyme-catalysed reactions have dramatically lower Ea than uncatalysed ones; the Arrhenius framework explains why metabolic reactions at body temperature (37°C) can run fast enough to sustain life.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.kinet.arrhenius`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.kinet.arrhenius` as of 2026-07-23.

## Curriculum Feedback

The proficient/apply level and 0.80 mastery threshold are appropriate — Arrhenius is heavily computational and must be reliably executable. The three discovery questions progress from Ea extraction (two-T form) → k calculation → catalyst factor, covering all three skill-modes. The cross-link to phys.therm.first-law (the Boltzmann distribution is a thermodynamic result) is correctly noted — a physics student who has covered statistical mechanics should find Arrhenius immediately familiar.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
