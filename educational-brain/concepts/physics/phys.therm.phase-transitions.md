# phys.therm.phase-transitions — Phase Transitions and Latent Heat

## 1. Identity

| Field | Value |
|---|---|
| **Concept ID** | `phys.therm.phase-transitions` |
| **Display name** | Phase Transitions and Latent Heat |
| **KG requires** | `phys.therm.calorimetry` |
| **KG unlocks** | — |
| **Difficulty** | proficient |
| **Bloom level** | apply |
| **Mastery threshold** | 0.80 |
| **Estimated hours** | 4 |
| **KG description** | Phase transitions absorb or release latent heat at constant temperature as a substance changes between solid, liquid, and gas phases. |

---

## 2. Mental Models

### Stage 1 — Intuitive (no formalism)

When ice melts, you add energy but the temperature stays at 0 °C. When water boils, you add energy but the temperature stays at 100 °C. The energy is not lost — it is being used to break the bonds between water molecules, not to speed them up. This "hidden" heat is called latent heat: it is absorbed without a temperature change.

### Stage 2 — Quantitative entry

**Latent heat**: the heat required to change the phase of a unit mass of substance at constant temperature.

**Q = mL**

where:
- Q = heat absorbed (J)
- m = mass of substance (kg)
- L = specific latent heat (J/kg) — depends on the substance and the transition type

Two main latent heats:
- **L_f (fusion/melting)**: solid → liquid (or liquid → solid: Q released = mL_f)
- **L_v (vaporisation/boiling)**: liquid → gas (or gas → liquid: Q released = mL_v)

Typical values (water at 1 atm):
- L_f = 334,000 J/kg (334 kJ/kg) at 0 °C
- L_v = 2,260,000 J/kg (2260 kJ/kg) at 100 °C

Note: L_v ≫ L_f — much more energy is needed to vaporise than to melt, because vaporisation breaks virtually all remaining intermolecular interactions (molecules go from touching to widely separated), while melting only disrupts long-range crystal order.

**Extended heat-balance equation**: for a calorimetry problem involving phase changes:

Σ (mcΔT terms) + Σ (mL terms) = 0

Each mL term is positive if the substance is absorbing heat (melting, vaporising) and negative if releasing (solidifying, condensing).

### Stage 3 — Phase diagrams

A **phase diagram** (P vs. T) shows which phase is stable at each (P, T) combination:
- **Solid/liquid boundary** (melting curve): steep, slightly negative slope for water (unusual — applying pressure melts ice).
- **Liquid/gas boundary** (vapour pressure curve): rises steeply with T; ends at the **critical point** (T_c, P_c).
- **Triple point**: the unique (T, P) where all three phases coexist in equilibrium. For water: T = 273.16 K = 0.01 °C, P = 611.7 Pa.
- Above T_c (critical temperature): no liquid-gas boundary — the fluid is a **supercritical fluid**.

**Clausius-Clapeyron equation**: dP/dT = L/(TΔv), where Δv is the change in specific volume at the transition. Explains the slope of the vapour pressure curve.

### Stage 4 — Enthalpy and the thermodynamic picture

At constant pressure (atmospheric): Q = ΔH (enthalpy change), not ΔU. The latent heat measured in calorimetry at constant pressure is ΔH_transition:
- ΔH_fus for melting
- ΔH_vap for vaporisation

ΔH_vap = ΔU_vap + PΔV ≈ ΔU_vap + RT (for ideal gas vapour)

For water at 100 °C: RT ≈ 2.5 kJ/mol; ΔH_vap ≈ 40.7 kJ/mol. The PΔV term is small (~6%) but non-negligible.

---

## 3. Why Beginners Fail

1. **Latent heat adds to temperature** — learners expect Q = mcΔT to hold always; they predict that adding heat during melting causes ΔT > 0. The constant-temperature plateau during a phase change is non-intuitive.
2. **L_f and L_v are similar in magnitude** — learners treat both latent heats as interchangeable or guess L_v < L_f ("it takes less to boil than to melt"). In fact L_v ≈ 7× L_f for water. The large energy needed for vaporisation surprises learners.
3. **Mixing problems ignore phase changes** — in calorimetry, learners add only mcΔT terms and omit the mL term for a substance that melts or freezes during the process. This systematically produces wrong final temperatures.
4. **Condensation releases heat** — learners expect condensation to absorb heat (by analogy: vaporisation absorbs). In fact condensation (gas → liquid) releases L_v. Steam burns are more severe than boiling-water burns of the same temperature for this reason.

---

## 4. Misconception Library

### M1 — "Adding heat during melting raises temperature"

**Probe**: "A pot of ice water at 0 °C is on a hot plate. Heat is added for 5 minutes. What is the temperature after 5 minutes?"  
**Characteristic phrase**: "It goes up from 0 °C — maybe to 30 °C."  
**What's wrong**: While ice remains, the temperature stays at 0 °C. All heat goes into melting (Q = mL_f), not into raising T. Only after all ice has melted does T begin to rise.  
**Recovery**: Plot the temperature-time graph from Demo A (ice-melting experiment). The flat section at 0 °C is visible and undeniable. Ask: "The hot plate is still on — energy is flowing in. Temperature is flat. Where is the energy going?" → Into breaking the intermolecular bonds of ice (increasing U_P).

### M2 — "L_v is roughly equal to L_f"

**Probe**: "Estimate: which requires more energy per kilogram — melting ice or boiling water?"  
**Characteristic phrase**: "About the same — both are phase changes."  
**What's wrong**: L_v = 2260 kJ/kg vs. L_f = 334 kJ/kg — nearly 7× difference. Melting only disrupts the crystal lattice (long-range order lost, but molecules still touch). Vaporisation breaks essentially all remaining intermolecular contacts (molecules now metres apart at STP). Far more bonds to break → far more energy required.  
**Recovery**: Compare the molecular picture: in liquid water, molecules are still in contact with ~4–5 neighbours. Vaporisation separates them to ~3 nm average separation. The energy required scales with the bond energy × number of bonds broken per molecule.

### M3 — "In calorimetry with a phase change, only use Q = mcΔT"

**Probe**: "50 g of ice at 0 °C is added to 200 g of water at 80 °C. Find the final temperature. (L_f = 334 kJ/kg, c_water = 4200 J/kg·K)"  
**Characteristic phrase**: "Q_ice = 0.05 × 4200 × T_f; Q_water = 0.2 × 4200 × (T_f − 80); set equal."  
**What's wrong**: The ice must first melt: Q_melt = 0.05 × 334,000 = 16,700 J absorbed. Then the melted water (at 0 °C) warms. The full equation: 0.05 × 334,000 + 0.05 × 4200 × T_f + 0.2 × 4200 × (T_f − 80) = 0. Without the mL term, the predicted T_f is wrong.  
**Recovery**: Check first whether there is enough energy to melt all the ice. Q_available = 0.2 × 4200 × 80 = 67,200 J. Q_to_melt_ice = 16,700 J < 67,200 J → all ice melts. Then solve the full heat-balance equation. T_f = (67,200 − 16,700)/(0.25 × 4200) ≈ 48.1 °C.

### M4 — "Steam at 100 °C has the same heating power as hot water at 100 °C"

**Probe**: "You are burned by a puff of steam at 100 °C and by a splash of water at 100 °C of the same mass. Which burn is worse?"  
**Characteristic phrase**: "Same temperature — same burn."  
**What's wrong**: Steam at 100 °C condenses on your skin, releasing L_v = 2260 kJ/kg at constant temperature. This additional energy is deposited on top of the heat from cooling to body temperature. Total energy from steam: L_v + c_water × 75 K per kg ≈ 2260 + 315 = 2575 kJ/kg. From water at 100 °C: only c_water × 75 ≈ 315 kJ/kg. Steam delivers ≈8× more energy to the skin.  
**Recovery**: Write both energy release calculations side by side. The condensation step (steam → water at 100 °C) delivers L_v to the skin before any cooling occurs. This is why pressure cookers (steam at >100 °C) cause much more severe scalds than hot water.

---

## 5. Explanation Library

### Explanation A — Why temperature is constant during a phase change

During melting, the system consists of a mixture of solid and liquid water. The temperature of this two-phase mixture is fixed at the melting point (0 °C at 1 atm) by equilibrium: if T rose above 0 °C, any remaining ice would melt (removing energy, cooling the mixture back to 0 °C); if T fell below 0 °C, some liquid would freeze (releasing L_f, warming back to 0 °C). The two-phase equilibrium enforces T = T_melt until one phase is exhausted. Thermodynamically: at the melting point, ΔG = 0 → the two phases are in equilibrium → any added energy changes the phase fractions, not the temperature.

### Explanation B — Heat balance with phase changes (procedure)

1. Identify all substances and their initial/final phases.
2. Check if a phase change occurs by testing whether enough energy exists to complete it.
3. For each substance, write Q terms:
   - Heating within a phase: Q = mcΔT (signed: ΔT = T_f − T_i)
   - Phase change: Q = ±mL (+ if absorbing/melting/vaporising; − if releasing/freezing/condensing)
4. Set ΣQ = 0.
5. Solve for T_f (or for m, or for L).

### Explanation C — Vapour pressure and phase diagram

The liquid-gas boundary represents the vapour pressure P_vap(T): the equilibrium partial pressure of the vapour above a liquid. Liquids boil when P_vap = P_external. At sea level (P = 101 kPa), water boils at 100 °C. At high altitude (P < 101 kPa), P_vap = P_external at a lower T → water boils below 100 °C → pasta takes longer to cook. In a pressure cooker (P > 101 kPa), water boils above 100 °C → food cooks faster.

---

## 6. Analogy Library

### Primary analogy — Filling a bucket with a hole at a fixed level

Imagine pouring water into a bucket that has a small hole at a fixed height h. Below the hole: water level rises (temperature rising). At the hole: water flows out at the same rate as you pour in (temperature plateau — energy goes into the "overflow" = breaking bonds). After the hole is plugged (all ice melted): level rises again (temperature rising again). The "hole" represents the phase transition energy sink — a fixed temperature drain for the input energy.

**Breaking point**: A real hole drains at a rate dependent on head pressure and hole size, not at a fixed "energy exactly balanced" equilibrium. The analogy does not explain WHY the temperature is fixed at exactly 0 °C (thermodynamic equilibrium of two phases) — it only shows that input energy can be absorbed without temperature change.

### Anti-analogy — "Condensation cools things down"

Learners sometimes say "steam condenses → it gets cool → less heat." In fact condensation releases latent heat to the surroundings — the steam gives up L_v to whatever it condenses on. The steam itself cools (from gas to liquid), but it heats everything around it. "Condensation = cooling" conflates the phase change of the steam with the heat transfer to the surroundings. Steam radiators work by condensing steam on the radiator surfaces — the condensation releases L_v into the room.

---

## 7. Demonstration Library

### Demo A — Temperature-time graph of water being heated

**Setup**: Data logger + temperature probe in a beaker of crushed ice on a hot plate. Record every 10 seconds.  
**Observation**: Rising temperature (ice warming), flat plateau at 0 °C (melting), rising again (water warming), flat plateau at 100 °C (boiling), rising (steam — harder to measure directly).  
**Teaching target**: The two plateaux are physical and visible. Students identify L_f from the length of the 0 °C plateau (knowing the power of the hot plate and the mass of ice).

### Demo B — Steam burn vs. hot water burn (comparison argument)

**Setup**: No live demonstration of burns. Instead, calculate: 10 g of steam at 100 °C vs. 10 g of water at 100 °C, both coming into contact with 100 g of human tissue at 37 °C (approximate values).  
**Calculation**:  
Steam: Q = mL_v + mc_w(100 − 37) = 0.01 × 2,260,000 + 0.01 × 4200 × 63 = 22,600 + 2,646 = 25,246 J.  
Water: Q = mc_w(100 − 37) = 0.01 × 4200 × 63 = 2,646 J.  
Steam delivers ≈9.5× more energy. The calculation makes the danger of steam physically real.  
**Teaching target**: M4 misconception resolved; latent heat of condensation is the dominant term.

### Demo C — Boiling under reduced pressure

**Setup**: Flask of water that has just boiled and been sealed. Connect to a vacuum pump (or use a hand-held syringe to reduce pressure above the water).  
**Observation**: Water at well below 100 °C (say 50 °C) reboils as the pressure is reduced to its vapour pressure at that temperature (~12 kPa).  
**Teaching target**: Boiling point depends on external pressure, not just temperature. The liquid-gas boundary of the phase diagram is traced in real time. Altitude cooking and pressure-cooker speed both explained.

---

## 8. Discovery Lesson

### Stance: Argue the inductive case — *measure the plateau, then account for the hidden energy*

**Why inductive here**: The temperature plateau is the central mystery of phase transitions. Learners who see the data before hearing the explanation are much more motivated to understand why the plateau exists — and therefore remember the latent heat concept. A deductive start ("phase changes occur at constant T; Q = mL") removes the mystery before it has a chance to puzzle.

**Opening challenge**: "I have an ice-water mixture at 0 °C in a calorimeter and I am adding exactly 1000 J every minute. Predict the temperature after each minute for the next 10 minutes."

**Sequence**:
1. Students apply Q = mcΔT: predict T rising 1000/(m × 4200) K per minute. All predict a steady rise.
2. Demo A: reveal the plateau. Temperature stays at 0 °C for several minutes.
3. Ask: "Energy in; temperature not rising. Energy is not disappearing — where is it going?"
4. Introduce U_P: energy stored in the intermolecular bonds. During melting, energy breaks bonds, not speeds up molecules. "The heat is *latent* — hidden in the structure."
5. Define L_f = 334 kJ/kg. Calculate: if the hot plate delivers 100 W to 50 g of ice, how long does the plateau last? t = mL_f/P = 0.05 × 334,000/100 = 167 s ≈ 2.8 min.
6. Students verify against the recorded plateau duration. Agreement confirms Q = mL.
7. Closure: extend to L_v — why is it so much larger? Molecular picture: boiling fully separates all contacts; melting only disrupts the lattice.

---

## 9. Teaching Actions

| Prior state | Action |
|---|---|
| Learner expects T to rise during melting | Demo A plateau. "The hot plate is on. T is flat. The energy is going somewhere — and it is not into temperature. It is into breaking bonds." |
| Learner guesses L_v ≈ L_f | Compare molecular pictures: melting = disrupting crystal order (molecules still touching); boiling = pulling molecules from contact to separated by ~3 nm. Far more bonds to break → 7× more energy. |
| Learner omits mL term in calorimetry | Before solving: ask "Does any substance change phase?" If yes, add the mL term. Emphasise: the heat-balance equation has two types of Q terms — mcΔT (temperature change) and mL (phase change). Both must be present when both occur. |
| Learner thinks condensation cools the environment | Steam radiator example. "The steam condenses — loses L_v — and that energy goes INTO the room. Condensation releases heat to surroundings." |
| Learner asks about partial phase changes | If ice+water is the final state: not all ice melts. Write: mL_f × x + m_ice × c_ice × ΔT_ice + m_water × c_water × ΔT_water = 0, where x is the fraction melted. Solve for x. |

---

## 10. Voice Teaching

### Opening
"You add heat to boiling water. The temperature does not go up. You keep adding heat. Still 100 °C. Where is the energy going? Not into speed — the molecules are already moving at the speed that defines 100 °C. The energy is going into separating molecules that were clinging to each other. That energy is called latent heat: hidden heat that changes the structure, not the temperature."

### Core
"Two quantities. L_f: latent heat of fusion — energy to melt one kilogram. Q = mL_f. L_v: latent heat of vaporisation — energy to boil one kilogram. Q = mL_v. For water: L_f = 334 kJ/kg, L_v = 2260 kJ/kg. Vaporisation needs about 7 times more energy than melting, because vaporising fully separates molecules that were still touching in the liquid."

### Calorimetry extension
"When a problem involves a phase change, add a mL term to the heat balance. ΣQ = 0 still holds — but now some Q terms are mcΔT (temperature change) and some are ±mL (phase change). Both types can appear for the same substance in the same problem: melt it first (mL), then warm the liquid (mcΔT)."

### Misconception interrupt
"Steam at 100 °C is not the same as water at 100 °C. The steam carries an extra L_v = 2260 kJ/kg that it will release when it condenses on your skin. A splash of boiling water burns; a puff of steam of the same mass burns much worse because of that hidden energy released at the moment of condensation."

---

## 11. Assessment

### Mastery gate

The learner can:
1. State that phase transitions occur at constant temperature and that the heat absorbed or released is Q = mL.
2. Use L_f and L_v values (given or from memory for water) to calculate Q for a given mass.
3. Solve a calorimetry problem that includes both mcΔT and mL terms (with a check for whether the phase change is complete).
4. Explain why L_v ≫ L_f using the molecular picture (bond-breaking during vaporisation vs. lattice disruption during melting).
5. Predict the effect of pressure on boiling point using the phase diagram concept.

### Formative golden probe

> "30 g of steam at 120 °C is passed into a calorimeter containing 200 g of ice at −10 °C. (c_steam = 2000 J/kg·K; L_v = 2260 kJ/kg; c_water = 4200 J/kg·K; L_f = 334 kJ/kg; c_ice = 2100 J/kg·K.) Find the equilibrium temperature."

*Strategy*: Multiple phase changes possible. Compute available heat from steam vs. energy needed to warm ice:
- Steam cools from 120 → 100 °C: Q₁ = 0.03 × 2000 × 20 = 1,200 J (released)
- Steam condenses at 100 °C: Q₂ = 0.03 × 2,260,000 = 67,800 J (released)
- Water cools from 100 → 0 °C: Q₃ = 0.03 × 4200 × 100 = 12,600 J (released)
- Total released: 81,600 J
- Ice warms from −10 → 0 °C: 0.2 × 2100 × 10 = 4,200 J (absorbed)
- Ice melts at 0 °C: 0.2 × 334,000 = 66,800 J (absorbed)
- Total absorbed so far: 71,000 J < 81,600 J → all ice melts; remaining energy = 81,600 − 71,000 = 10,600 J warms mixture.
- Total water mass: 200 + 30 = 230 g = 0.23 kg. T_f = 0 + 10,600/(0.23 × 4200) ≈ 11.0 °C.  
*Likely errors*: Omitting the steam-cooling step or the condensation step; computing total energy incorrectly; not checking whether all ice melts before assigning T_f = 0.

### Confidence calibration

After the probe, ask: "How did you know all the ice melted?" Students who compare total energy available (81,600 J) to energy needed to just melt all ice (71,000 J) and confirm the surplus are calibrated. Students who assume T_f = 0 without the surplus check may get wrong answers when not all ice melts.

### Delayed retrieval check (next session opener)

"Write the heat-balance equation for: 50 g of ice at 0 °C added to 100 g of water at 60 °C."  
Expected: 0.05 × 334,000 + 0.05 × 4200 × T_f + 0.1 × 4200 × (T_f − 60) = 0. If the learner omits the 334 kJ/kg term: latent heat is not yet fluent — drill Q = mL until automatic.

---

## 12. Recovery Notes

**Recovery for omitted latent heat in calorimetry**:
1. Ask explicitly before every problem: "Does any substance start and end in different phases?"
2. If yes: draw a phase diagram for that substance and trace its path: solid → (absorb L_f) → liquid → (absorb mcΔT) → (absorb L_v) → gas. Each arrow requires a Q term.
3. Keep a checklist: for every substance in the problem, list all Q terms: warming/cooling within phase + any phase changes.

**Recovery for partial phase change (not all ice melts)**:
1. Check: Q_available from hot bodies < Q_needed to melt all ice → not all ice melts.
2. Final state: mixture of ice and water at 0 °C.
3. Solve: Q_available = m_melted × L_f → m_melted. Report: m_melted grams of ice melted; T_f = 0 °C.

---

## 13. Memory & Review

**Memory type**: Quantitative (L_f, L_v for water) + procedural (heat balance with phase terms) + conceptual (constant-T plateau, molecular picture)

**Encoding hooks**:
- Q = mL — the phase change formula; no ΔT because ΔT = 0
- L_f ≈ 334 kJ/kg (water/ice); L_v ≈ 2260 kJ/kg (water/steam) — ratio ≈ 7:1
- Steam burns: L_v released on skin makes steam much more dangerous than water at the same T
- Phase change: bond energy goes in/out (U_P changes); molecular speed unchanged (T constant)

**Spaced retrieval schedule**:
- Session +1: "How much energy is needed to convert 200 g of ice at 0 °C into steam at 100 °C?"
- Week 1: "Solve a calorimetry problem with one phase change."
- Week 3: "Explain why boiling point decreases at altitude. What does this mean for cooking pasta?"
- Month 2: "Derive the Clausius-Clapeyron equation qualitatively: why does the liquid-gas boundary slope upward on a phase diagram?"

**Interleave with**: `phys.therm.calorimetry` (prerequisite — heat balance equation), `phys.therm.internal-energy` (U_P is the energy store that latent heat fills or drains)

---

## 14. Transfer Map

| Target concept | Bridge |
|---|---|
| `phys.therm.internal-energy` | Latent heat increases U_P (potential energy of molecular bonds) at constant T; U_K (kinetic energy) unchanged during transition |
| `phys.therm.first-law` | Q absorbed at constant pressure during phase change = ΔH_transition; the First Law accounts for this Q |
| Chemistry — standard enthalpy | ΔH_fus and ΔH_vap are tabulated per mole; Hess's Law uses them in thermochemical cycles |
| Engineering — refrigeration | The refrigeration cycle exploits L_v: refrigerant evaporates (absorbs L_v from interior) and condenses (releases L_v to exterior) |
| Atmospheric science | Latent heat of condensation drives thunderstorm and hurricane energy; released when water vapour condenses to rain |
| Materials science — casting and solidification | Solidification releases L_f; controlling the rate of heat removal determines grain structure of metals |
| Medicine — fever management | Sweating: evaporation of water from skin absorbs L_v, cooling the body efficiently (≈2260 J per gram evaporated) |

---

## 15. Curriculum Feedback

**KG note**: `phys.therm.calorimetry` is the necessary prerequisite — the heat-balance equation (ΣQ = 0) must be fluent before adding the mL term. The concept has no listed downstream unlocks in the KG but feeds naturally into `phys.therm.internal-energy` (U_P interpretation of latent heat) and any thermodynamic cycle treatment.

**Authoring note**: The two most important teaching moments are (1) the temperature-plateau demonstration, which empirically establishes the constant-T nature of phase transitions, and (2) the steam-vs-water burn calculation, which makes the large magnitude of L_v physically real and memorable. Neither should be omitted.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
