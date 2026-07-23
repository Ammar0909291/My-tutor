# Le Chatelier's Principle — `chem.equil.le-chatelier`

## Identity

- **KG ID**: chem.equil.le-chatelier
- **Subject**: Chemistry
- **Domain**: Chemical Equilibrium (chem.equil)
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.equil.kc-kp
- **Unlocks**: none (terminal node)
- **Cross-links**: none

## Learning Objective

Students can predict the direction of equilibrium shift in response to changes in concentration, pressure (volume), temperature, and addition of a catalyst; explain why catalyst addition does NOT shift the equilibrium position; apply the van't Hoff isochore to predict how K changes with temperature; and apply Le Chatelier's principle to the Haber and Contact industrial processes.

## Core Understanding

**Le Chatelier's principle**: if a system at equilibrium is subjected to a stress (change in conditions), it will respond by shifting in the direction that partially counteracts the stress and establishes a new equilibrium.

**Stresses and their effects**:

1. **Concentration change**:
   - Add a reactant (or remove a product): system shifts forward (→) to partially reduce the added reactant.
   - Remove a reactant (or add a product): system shifts in reverse (←) to partially restore the removed reactant.
   - K does NOT change when concentration is changed at constant temperature.

2. **Pressure (volume) change** — gas-phase equilibria only:
   - Decrease volume (increase pressure): system shifts toward the side with FEWER moles of gas (reduces the pressure increase).
   - Increase volume (decrease pressure): system shifts toward the side with MORE moles of gas.
   - If Δn_gas = 0: pressure change has no effect on equilibrium position.
   - K does NOT change with pressure (at constant T), but the concentrations (and partial pressures) of each species shift.

3. **Temperature change**:
   - Treat heat as a reactant (endothermic) or product (exothermic).
   - Increase T for exothermic reaction (ΔH < 0): shifts in reverse (←); K DECREASES.
   - Increase T for endothermic reaction (ΔH > 0): shifts forward (→); K INCREASES.
   - Temperature is the ONLY stress that changes K.

4. **Adding a catalyst**:
   - Speeds up BOTH forward and reverse reactions equally.
   - Does NOT change K, does NOT change the equilibrium position.
   - Only reaches equilibrium faster.

**Van't Hoff isochore** (qualitative):
ln(K₂/K₁) = −(ΔH°/R)(1/T₂ − 1/T₁)
Exothermic: ΔH° < 0 → increasing T decreases K. Endothermic: ΔH° > 0 → increasing T increases K.

**Industrial applications**:

*Haber process*: N₂(g) + 3H₂(g) ⇌ 2NH₃(g)  ΔH° = −92 kJ/mol
- Exothermic: low T favours NH₃ (K is larger), but rate is too slow at low T → compromise temperature ~400–500°C.
- Δn_gas = 2 − 4 = −2: high pressure favours NH₃ → operate at 150–300 atm (engineering constraint limits higher pressures).
- Fe catalyst: speeds up approach to equilibrium without shifting it.
- Continuous removal of NH₃: shifts equilibrium forward by concentration effect (not Le Chatelier on K).

*Contact process*: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g)  ΔH° = −197 kJ/mol
- Same logic: exothermic → high pressure, compromise temperature (~450°C), V₂O₅ catalyst.

## Mental Models

**The stress-response model**: think of the equilibrium as a sleeping person. A "stress" wakes it up. The response is to counteract the disturbance and go back to sleep (a new equilibrium). Add reactant → system "feels crowded on the left" → converts some reactant to product to reduce crowding → new equilibrium with slightly less reactant, slightly more product. K is unchanged.

**The temperature-is-special model**: concentration and pressure changes perturb a fixed equilibrium constant; temperature changes the equilibrium constant itself. K is the "target" the system shoots for. Add concentration: the system adjusts amounts to reach the same K. Change T: the target (K) changes, and the amounts change to reach the new K. This is why temperature is qualitatively different from all other stresses.

## Why Students Fail

1. **A catalyst shifts the equilibrium**: the single most common Le Chatelier error. Students see "catalyst → faster reaction → more product" and conclude the equilibrium shifts. It does not.
2. **Temperature change doesn't change K**: students predict concentration changes but forget K itself shifts with T. They say "more product forms" but not "K increased."
3. **Adding an inert gas at constant volume shifts equilibrium**: adding an inert gas at constant volume increases total pressure but doesn't change any partial pressure. No shift occurs. Adding an inert gas at constant pressure DOES change mole fractions and can shift equilibrium — a subtle distinction most introductory courses avoid.
4. **"Partially counteracts" means fully counteracts**: students say the system completely offsets the stress. Le Chatelier says "partially" — the system moves toward a new equilibrium, never fully returning to the original concentrations.

## Misconceptions

**MC-1 — A catalyst shifts the equilibrium position** (Type 1, overgeneralization from "catalyst increases product formation")
- *Mechanism*: students reason from "faster → more product" without considering that the reverse reaction is equally accelerated.
- *Diagnostic probe*: "A catalyst is added to an equilibrium mixture. What happens to (a) the reaction rate, (b) Kc, (c) the equilibrium concentrations?"
- *Characteristic phrase*: "The catalyst shifts equilibrium to the right, increasing [product] at equilibrium."
- *Repair*: (a) rate increases for both forward and reverse equally; (b) Kc unchanged (catalyst doesn't change ΔG° or thermodynamics); (c) equilibrium concentrations unchanged — only the TIME to reach equilibrium decreases. Use the energy diagram: the catalyst lowers the hill equally from left and right; the valley depths (reactant and product energies) are unchanged; K = e^(−ΔG°/RT) is unchanged.

**MC-2 — Adding reactant increases K** (Type 5, instruction-induced: students conflate "system shifts right" with "K increases")
- *Mechanism*: students see the forward shift and assume K changed; they don't distinguish between a shift in amounts and a change in K.
- *Diagnostic probe*: "You add more H₂ to the Haber process equilibrium at constant temperature. Does Kc change? Does [NH₃] change?"
- *Characteristic phrase*: "Adding H₂ increases K because more NH₃ is produced."
- *Repair*: K depends ONLY on temperature. Adding H₂ increases Q initially (Q > K), so the system shifts forward to reduce [H₂] and increase [NH₃] until Q = K again. K is the same; the amounts redistributed until the ratio matches K. The final [NH₃] is higher than before, but K is unchanged.

**MC-3 — Increased pressure always shifts toward products** (Type 1, overgeneralization from specific cases)
- *Mechanism*: students learn examples where high pressure favours products (Haber process) and apply this universally.
- *Diagnostic probe*: "For H₂(g) + I₂(g) ⇌ 2HI(g), predict the effect of doubling the pressure."
- *Characteristic phrase*: "Doubling pressure shifts the equilibrium toward HI (products), increasing yield."
- *Repair*: count gas moles. Δn_gas = 2 − (1 + 1) = 0. Pressure change has NO effect on equilibrium position when Δn_gas = 0. Rate increases (more frequent collisions) but both forward and reverse rates increase equally. The equilibrium position and K are unchanged. "High pressure favours products" is only true when products have fewer gas moles (Δn_gas < 0).

## Analogies

**The displaced weight analogy for Le Chatelier**: place a ball in a bowl at equilibrium (bottom). Add a weight to one side (stress). The bowl tilts, and the ball rolls partially up the other side to a new resting point. The tilt is partially counteracted; the bowl doesn't snap back to the original position. The new resting point is the new equilibrium.

**The thermostat analogy for temperature effects**: temperature changing K is like the thermostat resetting: it doesn't just push the current system harder — it changes the target temperature (K) entirely. Every other stress is like a gust of wind that temporarily pushes the temperature away from the setpoint; the thermostat (K) works to restore it.

## Demonstrations

**Demonstration 1 — Cobalt equilibrium colour shift**
- CoCl₂ in solution: [Co(H₂O)₆]²⁺ (pink) ⇌ [CoCl₄]²⁻ (blue) + ... 
Add HCl: shifts right (blue). Add H₂O: shifts left (pink). Heat: shifts to blue (endothermic in one direction). Cool: pink. Students observe qualitative Le Chatelier shifts with immediate visible feedback. Note to tutor: this demonstration requires checking local regulations on CoCl₂; alternatives (NO₂/N₂O₄ gas tube) may be used.

## Discovery Questions

1. "For the equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g)  ΔH° = −197 kJ/mol, predict the effect of: (a) decreasing volume, (b) increasing temperature, (c) adding a V₂O₅ catalyst, (d) removing SO₃ as it forms." (Targets: (a) Δn_gas = 2−3 = −1 → fewer gas moles on product side → forward shift; more SO₃ produced. (b) Exothermic → increase T shifts reverse → K decreases; less SO₃ at equilibrium. (c) No shift; faster equilibration, same Kc. (d) Removing product → forward shift; continuous removal drives near-complete conversion.)
2. "N₂O₄(g) ⇌ 2NO₂(g)  ΔH° = +57 kJ/mol (brown gas). A sealed tube is cooled from 298 K to 273 K. What colour change occurs, and does K increase or decrease?" (Targets: endothermic reaction. Decreasing T shifts equilibrium reverse → [NO₂] decreases (brown), [N₂O₄] increases (colourless) → tube becomes less brown/more pale. K decreases with decreasing T for an endothermic reaction (opposite of exothermic). van't Hoff: ln(K₂/K₁) = −(ΔH°/R)(1/T₂ − 1/T₁) = −(57000/8.314)(1/273 − 1/298) is negative because 1/273 > 1/298 → K₂ < K₁.)
3. "In the Haber process, which condition change would BOTH increase the equilibrium yield of NH₃ AND increase the rate of reaction? Choose: (a) increase T, (b) decrease T, (c) increase pressure, (d) add catalyst." (Targets: (c) increase pressure — Δn_gas = −2, so high pressure favours NH₃ (yield increases) AND higher pressure increases collision frequency (rate increases). (a) decreases yield (exothermic, K falls). (b) decreases rate (too slow). (d) does not change yield, only rate.)

## Teaching Sequence

1. Review from chem.equil.kc-kp: what K means; Q vs K; concentration/pressure don't change K; only T does.
2. State Le Chatelier's principle. Emphasise "partially counteracts" (not fully reverses).
3. Concentration perturbations: add/remove reactant or product. Walk through Q-then-K framework — stress makes Q ≠ K; system shifts to make Q = K again. Address MC-2.
4. Pressure perturbations: only gas-phase; count Δn_gas; Δn_gas = 0 case. Address MC-3.
5. Temperature: K changes with T. Exothermic vs. endothermic logic. State van't Hoff isochore. Work Discovery Question 2.
6. Catalyst: no shift. Address MC-1. Connect to catalysis node.
7. Industrial applications: Haber and Contact processes as integrated case studies. Work Discovery Question 1 and 3.

## Tutor Actions

- If student says catalyst shifts equilibrium → MC-1 repair: catalyst lowers Ea equally for both directions; K = ratio of rate constants; K unchanged; draw the energy diagram.
- If student says adding reactant increases K → MC-2 repair: K depends only on T; adding reactant makes Q > K momentarily; system shifts until Q = K (same K) at new concentrations.
- If student generalises "high pressure → products" → MC-3 repair: count Δn_gas first; if Δn_gas = 0, no effect; if Δn_gas > 0, pressure shifts toward reactants, not products.
- Advance when student can predict direction of shift and K change for any combination of stresses.

## Voice Teaching Notes

"Before any Le Chatelier prediction: one stress at a time, tell me whether K changes or not. Temperature: K changes. Everything else: K stays the same. Then predict the shift."

For catalyst: say explicitly every time — "Catalyst: no shift. Faster equilibration. No change in K, no change in equilibrium amounts."

## Assessment Signals

**Mastery gate**:
1. Student correctly predicts equilibrium shift and K change (or non-change) for all four stress types.
2. Student correctly identifies that catalyst does not shift equilibrium position.
3. Student correctly applies Δn_gas logic for pressure changes, including the Δn_gas = 0 case.
4. Student correctly explains the Haber process trade-offs (T, P, catalyst, NH₃ removal) using Le Chatelier.

**FRAGILE signal**: student correctly predicts all shifts but cannot explain the Q vs. K mechanism (the "why" of the shift — that Q ≠ K drives the system until Q = K again).

**MISCONCEIVING signal**: student says a catalyst shifts equilibrium. Address MC-1 with the energy diagram before any industrial application questions.

## Tutor Recovery Strategy

If stuck:
1. For the Q → K mechanism: "When you add reactant, Q = [products]/[reactants]. Adding reactant increases denominator → Q falls below K. System shifts forward (more product) until Q rises back to K. The shift stops exactly when Q = K. K itself never changed."
2. For pressure with Δn_gas = 0: "Write the Kp expression. H₂ + I₂ ⇌ 2HI: Kp = P_HI²/(P_H₂ × P_I₂). Double all pressures: Kp = (2P_HI)²/((2P_H₂)(2P_I₂)) = 4P_HI²/(4P_H₂P_I₂) = Kp. Nothing changes."
3. For temperature and K: "Treat heat as a species. Exothermic: reactants → products + heat. Add heat (increase T): equilibrium shifts away from the heat side (←) to reduce heat. Fewer products at equilibrium: K decreases. Same logic as adding a reactant."

## Memory Hooks

- **Le Chatelier: stress → shift to partially counteract the stress.**
- **Concentration/pressure change: Q ≠ K → shift until Q = K. K unchanged.**
- **Temperature change: K itself changes. Exothermic ↑T → K ↓. Endothermic ↑T → K ↑.**
- **Catalyst: NEVER shifts equilibrium. Only speeds approach to equilibrium. K unchanged.**
- **Pressure: shift toward fewer gas moles if Δn_gas ≠ 0. No effect if Δn_gas = 0.**

## Transfer Connections

- **chem.equil.kc-kp**: Le Chatelier's principle is the qualitative shortcut for what Kc/Kp quantifies — this node makes the framework intuitive and applicable to industrial problems; chem.equil.kc-kp remains the quantitative tool.
- **chem.thermo.gibbs**: the temperature dependence of K follows from ΔG° = ΔH° − TΔS° = −RT ln K; rearranging gives the van't Hoff isochore. The thermodynamic basis of Le Chatelier's temperature effect is grounded in Gibbs.

## Cross-Subject Connections

- **Biology (oxygen transport)**: haemoglobin's binding of O₂ is a cooperative equilibrium. At high [O₂] (lungs), equilibrium shifts toward oxyhaemoglobin; at low [O₂] (tissues), it shifts toward deoxyhaemoglobin + O₂ released — Le Chatelier in a biological context.
- **Environmental science (ocean acidification)**: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. Increasing atmospheric CO₂ dissolves in ocean water, shifting equilibria right → [H⁺] increases → pH decreases. Le Chatelier explains the mechanism of ocean acidification.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.equil.le-chatelier`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.equil.le-chatelier` as of 2026-07-23.

## Curriculum Feedback

This is a terminal node (no unlocks), appropriate for a conceptual application node at the developing/apply level. The three misconceptions (catalyst shifts equilibrium; concentration changes K; Δn_gas = 0 case) are the three most frequently tested errors in examinations — all three should be explicitly addressed before any assessment. The industrial applications (Haber, Contact) are universally expected in chemistry curricula and provide the best motivation for why Le Chatelier matters beyond textbook exercises.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
