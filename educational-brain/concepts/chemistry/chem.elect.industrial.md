# Industrial Electrolysis — `chem.elect.industrial`

## Identity
- **KG ID**: chem.elect.industrial
- **Subject**: chemistry
- **Domain**: chem.elect
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.elect.electrolysis
- **Unlocks**: (none — terminal node)

## Learning Objective
Describe and explain the industrial electrolytic processes for the extraction of aluminium (Hall-Héroult), production of sodium and chlorine (Down's cell), production of NaOH and Cl₂ (chloralkali), and electroplating/electrorefining; calculate quantities using Faraday's laws; and evaluate the industrial importance and environmental impact of each process.

## Core Understanding
**Hall-Héroult process — aluminium extraction**:
Aluminium is too reactive to be extracted by carbon reduction (Al₂O₃ + C gives Al₄C₃, not Al). Electrolysis of molten Al₂O₃ is required, but Al₂O₃ melts at ~2050°C (impractically high energy cost). The key innovation: Al₂O₃ is DISSOLVED in molten CRYOLITE (Na₃AlF₆, mp ~1010°C) at ~950°C — the mixture conducts electricity and keeps Al₂O₃ dissolved (solubility ~8 wt%).

- **Cathode (negative electrode, reduction)**: Al³⁺ + 3e⁻ → Al (liquid aluminium, denser than cryolite, collects at the bottom as the cathode — the cell itself is lined with carbon/graphite).
- **Anode (positive electrode, oxidation)**: O²⁻ → ½O₂ + 2e⁻ (oxygen gas produced). BUT the carbon graphite anodes react with the oxygen: C + O₂ → CO₂. Anodes must be CONTINUOUSLY REPLACED (burnt away at ~10 kg anode per tonne of Al produced). Modern "inert" anode development is a major research area.
- **Energy consumption**: ~14 kWh per kg Al (extremely energy-intensive — "solid electricity" is sometimes used to describe Al). Smelters are located near cheap hydroelectric power. Aluminium recycling uses only ~5% of the energy of primary production.
- **Equations**: cathode: Al³⁺ + 3e⁻ → Al; anode: 2O²⁻ → O₂ + 4e⁻; overall: 2Al₂O₃ → 4Al + 3O₂.
- **Calcium fluoride (CaF₂) is sometimes added** to the cryolite bath to lower the melting point further and adjust conductivity.

**Down's cell — sodium and chlorine production**:
Sodium is too reactive for aqueous electrolysis (Na deposited from NaCl(aq) would react with water: 2Na + 2H₂O → 2NaOH + H₂). Therefore MOLTEN NaCl (with added CaCl₂ to lower mp from 800°C to ~600°C) is electrolysed.

- **Cathode (steel, negative)**: Na⁺ + e⁻ → Na (liquid sodium, less dense, floats upward and is collected above the melt — separated from the anode by a steel gauze diaphragm to prevent recombination with Cl₂).
- **Anode (graphite, positive)**: 2Cl⁻ → Cl₂ + 2e⁻ (chlorine gas, collected separately from the top of the anode compartment).
- **CaCl₂ role**: lowers the melting point from 800°C to ~600°C (energy saving) and suppresses Ca deposition (E° of Ca²⁺/Ca is more negative than Na⁺/Na, so Na deposits preferentially at the cathode at the operating temperature).
- **Products**: sodium metal (for Na₂O₂, NaCN, tetraethyllead [historical], pharmaceutical synthesis) and chlorine gas (for PVC, water treatment, HCl production).

**Chloralkali process — NaOH, Cl₂, H₂ from brine**:
Electrolysis of concentrated AQUEOUS NaCl solution (brine, ~25-27% NaCl). Water is present, so products differ from Down's cell.

- **Cathode (reduction)**: 2H₂O + 2e⁻ → H₂ + 2OH⁻. (NOT Na deposition — water reduction is preferred in aqueous solution at the cathode potential used.)
- **Anode (oxidation)**: 2Cl⁻ → Cl₂ + 2e⁻. (Despite E°(O₂/OH⁻) = +0.40 V and E°(Cl₂/Cl⁻) = +1.36 V, Cl₂ is produced preferentially because: high Cl⁻ concentration at the anode; kinetic overpotential for O₂ is much higher than for Cl₂ → Cl₂ evolution is kinetically favoured.)
- **Diaphragm/membrane cell design**:
  - Diaphragm cell (asbestos or polymeric): brine flows from anode compartment to cathode compartment through porous diaphragm; NaOH solution produced at cathode is contaminated with NaCl (must be evaporated/crystallised to separate).
  - Membrane cell (perfluorinated ion-exchange membrane, e.g. Nafion): Na⁺ passes through the membrane (from anode to cathode side); Cl⁻ and OH⁻ are blocked → purer NaOH product (33-35% NaOH solution, low NaCl contamination); higher efficiency. Environmental advantage: no asbestos.
  - Mercury cell (historical, now banned in most countries): Na forms a sodium-mercury amalgam at the Hg cathode (avoids H₂ production because Hg overpotential for H₂ is high); amalgam flows to a separate decomposer vessel where water regenerates Na → NaOH + H₂ + Hg; Hg recycled. Banned due to mercury pollution (Minamata disease).
- **Products**: three co-products — Cl₂ (anode), H₂ (cathode), NaOH (cathode compartment). All three are valuable; used in PVC, water treatment, soap manufacture, paper production, pharmaceuticals.
- **Equation**: 2NaCl(aq) + 2H₂O → Cl₂ + H₂ + 2NaOH.

**Electroplating**:
Depositing a thin layer of one metal (e.g., Cu, Ni, Cr, Ag, Au, Zn) onto the surface of another object by electrolysis.

- Object to be plated = CATHODE (reduction: M^n+ + ne⁻ → M deposited on object).
- Plating metal = ANODE (oxidation: M → M^n+ + ne⁻; dissolves to replenish the electrolyte solution and maintain constant ion concentration).
- Electrolyte = solution of the plating metal salt (e.g., CuSO₄ for copper plating; NiSO₄ for nickel plating; silver cyanide bath for silver plating).
- Applications: corrosion protection (zinc galvanising, nickel plating), appearance (chrome plating on cars, gold/silver jewellery plating), engineering (hard chrome for wear resistance, electroformed parts).
- **Faraday's laws applied to plating**: m = (I × t × M)/(n × F). A copper plating bath with 2A for 3600s using CuSO₄: m = (2 × 3600 × 63.5)/(2 × 96485) = 2.37 g Cu deposited.

**Electrorefining (copper refining)**:
To purify crude copper (blister copper, ~99% Cu with Ag, Au, Ni, Fe impurities):
- Crude copper = ANODE; pure copper sheet = CATHODE; CuSO₄/H₂SO₄ electrolyte.
- At anode: Cu (and impurities) dissolve. Fe and Ni dissolve and remain in solution (more active than Cu). Cu deposits at cathode (selective). Ag and Au (less active than Cu) do NOT dissolve — they fall as "anode slime" under the anode and are recovered (the slimes contain sufficient precious metals to be economically valuable, partly subsidising the refining cost).
- Product: 99.99% pure copper ("four nines copper") used in electrical wiring.

## Mental Models
**Down's cell vs. chloralkali as an aqueous-vs-molten choice**: the key question is always "is water present?" If water is present (chloralkali), water wins at the cathode (H₂ instead of Na). To get Na, you must remove water (molten salt, Down's cell). This one distinction explains why these two superficially similar cells give entirely different cathode products.

**Hall-Héroult as dissolving the mountain in a different solvent**: Al₂O₃ has such a high melting point that direct electrolysis would require impractical temperatures. Cryolite dissolves it at a manageable ~950°C. The same principle is used in other molten-salt electrolysis processes: find a solvent that lowers the melting point while keeping the desired ions available for discharge.

## Why Students Fail
Students confuse the Down's cell (molten NaCl → Na + Cl₂) with the chloralkali process (aqueous NaCl → NaOH + Cl₂ + H₂) — both use NaCl but products differ entirely because one is molten, the other aqueous. They forget that the Hall-Héroult carbon anodes are consumed by reaction with O₂ → CO₂. They also confuse electroplating cathode (object to be plated) with anode.

## Misconceptions
- **MC-1 (Type 3 — language contamination)**: "The chloralkali process is the same as the Down's cell process because both electrolyse sodium chloride." Probe: "In the chloralkali process, does sodium metal form at the cathode? If not, what does?" Characteristic phrase: "both use NaCl, so both give sodium." Intervention: the CRITICAL DIFFERENCE is the physical state of the NaCl. Down's cell uses MOLTEN NaCl — Na⁺ is the only cation available at the cathode (no water to compete), so Na deposits. Chloralkali uses AQUEOUS NaCl — water is present, and water is preferentially reduced at the cathode (2H₂O + 2e⁻ → H₂ + 2OH⁻) because the reduction of water occurs at a less negative potential than Na⁺/Na in aqueous solution. The Down's cell was specifically designed to EXCLUDE water, which is why it operates at ~600°C on the molten salt — precisely to avoid making NaOH and H₂ instead of metallic Na.
- **MC-2 (Type 5 — instruction-induced)**: "In the Hall-Héroult process, the anodes are inert and permanent — they just provide the electrical connection." Probe: "What gas is produced at the anode in the Hall-Héroult process? Does carbon react with that gas?" Characteristic phrase: "the anode is just a conductor — it doesn't react." Intervention: in the Hall-Héroult process, the anode product is O₂ gas (from oxidation of O²⁻). Carbon (graphite) REACTS WITH OXYGEN to form CO₂ (and some CO): C + O₂ → CO₂. The anodes are therefore CONSUMED and must be continuously replaced. This represents a significant operating cost (~10 kg C per tonne Al) and produces CO₂ — making Hall-Héroult Al production both energy-intensive AND carbon-intensive. True inert anodes (nickel ferrite alloys, cermet materials) remain an active research priority specifically because carbon anode replacement and CO₂ emission are major drawbacks.
- **MC-3 (Type 2 — perceptual intuition)**: "In electroplating, the object to be plated is the anode because it needs to RECEIVE the plating material — things are attracted to positives." Probe: "In electrolysis, does the metal cation (e.g., Cu²⁺) travel toward the cathode or the anode?" Characteristic phrase: "the plate receives metal, so it must be the positive terminal." Intervention: metal ions (cations, M^n+) are POSITIVE and are therefore ATTRACTED TO THE CATHODE (negative electrode). REDUCTION occurs at the cathode: M^n+ + ne⁻ → M (deposited as solid metal). The OBJECT to be plated must be the CATHODE — it is the negative terminal, to which the positive metal ions migrate and are deposited. The ANODE is the sacrificial plating metal itself, which DISSOLVES (M → M^n+ + ne⁻) to replenish ions in the solution. Confusing this means imagining cations being attracted to a positive pole, which would never lead to deposition — like-charge repulsion would push them away.

## Analogies
**Valid**: electroplating as airbrushing with ions — the anode is the paint reservoir (dissolves to release metal ions into solution). The ion-carrying electrolyte solution is the air. The cathode (the object) is the surface being painted. The current is the air pump — directing the ions from source to target. Higher current = faster painting; too high = uneven/rough coating.

## Demonstrations
**Copper electroplating demonstration**: set up a simple electrolytic cell with a copper anode, an iron nail (or strip) as cathode, and CuSO₄ solution as electrolyte. Apply 3–6V DC for 5–10 minutes. The nail acquires a visible pink copper coating. Weigh before and after to illustrate Faraday's law quantitatively. Confirm anode has lost mass (it dissolved) and cathode has gained mass (copper deposited).

**Purification by electrorefining demonstration**: set up a two-anode experiment (one anode of impure copper-aluminium alloy, one anode of pure copper) in CuSO₄ solution. Observe that the cathodic deposit from pure Cu anode is more uniform; discuss how the anode slime from impure copper retains the less-active impurities.

## Discovery Questions
1. "An industrial electroplating line deposits silver from an AgNO₃ bath. The bath carries a current of 50A for 2 hours. Calculate the mass of silver deposited and the mass dissolved from the silver anode. If the efficiency of the process is 95%, how does your answer change? (M(Ag)=108, F=96485 C mol⁻¹)"
2. "A Down's cell operates at 600°C with CaCl₂ added to the NaCl melt. Explain (a) why CaCl₂ is added rather than simply using pure NaCl, and (b) why Na deposits at the cathode rather than Ca, despite CaCl₂ being present."

## Teaching Sequence
1. Review electrolysis fundamentals: cathode=reduction, anode=oxidation; preferential discharge depends on E°, concentration, overpotential, electrode nature.
2. Hall-Héroult: why Al₂O₃ can't be smelted by C reduction; why direct molten Al₂O₃ electrolysis is impractical; cryolite as solvent; cathode (Al) and anode (C → CO₂); energy intensity; carbon anode consumption.
3. Down's cell: why molten not aqueous NaCl; CaCl₂ additive; Na at cathode, Cl₂ at anode; physical cell design (diaphragm separates products); products and uses.
4. Chloralkali: aqueous NaCl; H₂ at cathode (NOT Na), Cl₂ at anode; overall equation; membrane vs. diaphragm vs. mercury cells (with environmental note); three co-products.
5. Electroplating: object = cathode; plating metal = anode; electrolyte = metal salt solution; applications; Faraday's law calculation.
6. Electrorefining: crude Cu anode, pure Cu cathode; selective dissolution/deposition; anode slime (precious metals); purity achieved.

## Tutor Actions
- **If student confuses Down's cell with chloralkali**: ask "In the Down's cell, is water present in the electrolyte?" (No — it's molten.) "In the chloralkali process, is water present?" (Yes — it's a solution.) "What happens at the cathode when water IS present?" (Water is reduced: H₂ formed.) "So which cell gives sodium metal?" (Down's cell, no water.) "And which gives NaOH + H₂?" (Chloralkali, water present.)
- **If student says Hall-Héroult anodes are permanent**: ask "What gas is produced at the carbon anode?" (O₂.) "Carbon in O₂ at 950°C — what does it form?" (CO₂.) "So the carbon anode is..." (Consumed.) "Must it be replaced?" (Yes, continuously.)
- **FRAGILE sign**: can describe the process correctly but cannot explain WHY the cathode product differs between Down's cell (Na) and chloralkali (H₂), or cannot write Faraday's law and apply it to a plating calculation.

## Voice Teaching Notes
Begin with the key question: "When we electrolyse NaCl, do we get sodium or hydrogen at the cathode?" Then walk through the fork: "Is it molten NaCl or aqueous NaCl?" Guide the student to recognise that the answer depends entirely on whether water is present. In voice, the two processes (Down's cell vs. chloralkali) are commonly confused because students hear "sodium chloride electrolysis" and activate only one schema. The physical state distinction must be the first thing established before any products are discussed. For Hall-Héroult, the concept of "finding a better solvent" is the memorable hook — cryolite dissolves Al₂O₃ the same way salt dissolves ice (lowers melting point, makes it processable).

## Assessment Signals
- **Green**: correctly states that Down's cell uses molten NaCl (→Na + Cl₂) while chloralkali uses aqueous NaCl (→NaOH + Cl₂ + H₂); explains why: water reduction is preferred in aqueous solution; explains Hall-Héroult: cryolite dissolves Al₂O₃ at 950°C, carbon anodes are consumed by O₂, Al deposits at cathode; correctly identifies object-to-be-plated as cathode in electroplating; applies Faraday's first law to plating calculations; describes electrorefining principle (anode slime, selective deposition).
- **Amber**: knows products of each cell but cannot explain WHY cathode product differs (Down's vs. chloralkali); or correct on processes but makes consistent error in Faraday's law formula (e.g., wrong sign of n).
- **Red**: says Down's cell gives H₂ at cathode (not Na); says chloralkali gives Na at cathode; says Hall-Héroult anodes are permanent.
- **Probe**: "A membrane cell for chloralkali production uses a Nafion membrane. What does the membrane allow to pass, and what does it block? How does this make the NaOH purer than in a diaphragm cell?"

## Tutor Recovery Strategy
If student cannot explain Down's cell vs. chloralkali cathode difference: use the electrode potential argument. "The standard reduction potential of Na⁺/Na is −2.71V. The standard reduction potential of H₂O/H₂ (in neutral water) is about −0.83V at pH 7. Which is more positive?" (H₂O/H₂.) "Which is easier to reduce?" (H₂O — more positive E° requires less energy.) "So in aqueous solution, which is preferentially reduced at the cathode?" (H₂O → H₂ + OH⁻.) "This is why sodium cannot be deposited from aqueous NaCl — water beats Na⁺ every time. Only when water is absent (molten salt) does Na⁺ deposit."

## Memory Hooks
- **Hall-Héroult**: "Al₂O₃ dissolved in cryolite at 950°C. Al at cathode, O₂ burns C anodes → CO₂ (anodes replaced). Energy-intensive — ~14 kWh/kg."
- **Down's cell**: "Molten NaCl + CaCl₂ at 600°C. Na at cathode, Cl₂ at anode. No water → Na deposits."
- **Chloralkali**: "Aqueous NaCl brine. Cathode: H₂ (NOT Na, water wins). Anode: Cl₂. NaOH in solution. Three co-products."
- **Electroplating**: "Object = CATHODE (metal deposits on it). Plating metal = ANODE (dissolves). Metal salt solution = electrolyte."
- **Electrorefining**: "Crude Cu anode dissolves. Pure Cu cathode grows. Precious metals stay as anode slime."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for industrial electrolysis.

## Cross-Subject Connections
- **Environmental chemistry**: the Hall-Héroult process accounts for ~1% of global electricity consumption and produces significant CO₂ from carbon anode burning. Green aluminium smelting (using renewable hydroelectric power and developing inert anodes to eliminate CO₂ from O₂ evolution directly) is a major sustainability target. The chloralkali process historically produced mercury-contaminated wastewater (from mercury cells); the Minamata disease outbreak in Japan (1956) was caused by industrial methylmercury discharge into Minamata Bay, leading to the global phase-out of mercury cells in chloralkali plants.
- **Materials science**: electroplating is fundamental to the electronics industry — printed circuit boards are copper-electroplated; interconnects in integrated circuits are copper-electroplated by the Damascene process. Hard chrome plating on precision engineering parts has been increasingly replaced by HVOF (high-velocity oxy-fuel) thermal spray coatings due to hexavalent chromium's carcinogenicity. The entire semiconductor industry depends on electrodeposition at the nanoscale.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.elect.industrial`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.elect.industrial` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
