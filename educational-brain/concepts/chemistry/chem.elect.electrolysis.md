# Electrolysis and Faraday's Laws — `chem.elect.electrolysis`

## Identity
- **KG ID**: chem.elect.electrolysis
- **Subject**: chemistry
- **Domain**: chem.elect
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.elect.galvanic-cell, chem.elect.conductance
- **Unlocks**: (none — terminal node)

## Learning Objective
Distinguish electrolytic from galvanic cells; apply Faraday's first and second laws to calculate mass deposited or gas produced; predict which species is preferentially discharged at each electrode using the electrochemical series and concentration; and describe key industrial applications (Hall-Héroult, Down's cell, chloralkali, electroplating).

## Core Understanding
**Electrolytic vs. galvanic cells**:
In a GALVANIC cell, spontaneous redox drives current (ΔG < 0 → E_cell > 0). In an ELECTROLYTIC cell, an external power supply forces a non-spontaneous reaction (ΔG > 0 → E_applied must exceed E°_cell for the reverse reaction). The cathode (reduction) and anode (oxidation) terminology is the SAME in both cells, but the polarity is reversed: in a galvanic cell the cathode is positive (conventional current in); in an electrolytic cell the cathode is connected to the negative terminal of the external supply (electrons pumped in → reduction occurs).

- **Anode** (oxidation): the electrode connected to the POSITIVE terminal of the external supply. Species at or in the anode are oxidised.
- **Cathode** (reduction): connected to the NEGATIVE terminal. Species at or near cathode are reduced.

**Preferential discharge**:
When several species are present in the electrolyte, the species discharged depends on:
1. **Position in the electrochemical series**: at the cathode, the species with the most POSITIVE (least negative) E° is preferentially reduced. At the anode, the species with the most NEGATIVE E° (easiest to oxidise) is preferentially oxidised.
2. **Concentration**: high concentration shifts the discharge potential (Nernst equation effect). At high Cl⁻ concentration in NaCl solution, Cl⁻ is discharged at the anode (despite O₂/H₂O having a more positive E°) because concentration overpowers thermodynamics at this level.
3. **Overpotential**: the extra potential beyond E° needed to drive gas evolution at a rate measurable in practice. O₂ has high overpotential on most electrodes → Cl⁻ discharged instead in concentrated NaCl even though E°(O₂/H₂O) > E°(Cl₂/Cl⁻).
4. **Nature of electrode**: at an active anode (e.g., Cu), the anode dissolves (Cu → Cu²⁺ + 2e⁻) preferentially over oxidation of the electrolyte. At an inert anode (Pt, graphite), electrolyte species are discharged.

**Faraday's First Law**:
The mass of substance deposited (or liberated) at an electrode is directly proportional to the quantity of charge passed:
**m = (Q × M) / (n × F)**
where m = mass (g), Q = charge passed (C = A × s), M = molar mass (g/mol), n = number of electrons per ion (moles of electrons per mole of ion), F = Faraday's constant = 96 485 C/mol ≈ 96 500 C/mol.

- From Q = I × t: m = (I × t × M) / (n × F).
- Example: 2.00 A for 1 hour through CuSO₄ solution → Cu deposited: Q = 2.00 × 3600 = 7200 C; moles of e⁻ = 7200/96500 = 0.0746 mol; Cu²⁺ + 2e⁻ → Cu, so moles Cu = 0.0746/2 = 0.0373 mol; mass = 0.0373 × 63.5 = 2.37 g.

**Faraday's Second Law**:
When the same charge is passed through different electrolytes in series, the amounts deposited are proportional to their ELECTROCHEMICAL EQUIVALENT (M/n, also called equivalent weight). For the same Q: m₁/m₂ = (M₁/n₁)/(M₂/n₂).

**Industrial electrolytic processes**:

- **Hall-Héroult process (aluminium production)**:
  - Electrolyte: molten Al₂O₃ (alumina) dissolved in molten cryolite (Na₃AlF₆) at ~950°C. Cryolite lowers the melting point of pure Al₂O₃ (~2050°C) to ~950°C — essential for practical operation.
  - Cathode: liquid aluminium produced (density 2.7 g/cm³ — sinks to bottom). Al³⁺ + 3e⁻ → Al(l).
  - Anode: carbon (graphite) electrodes oxidised: 2O²⁻ → O₂ + 4e⁻. The hot O₂ burns the carbon anode: C + O₂ → CO₂ — anodes must be continuously or periodically replaced.
  - Net: 2Al₂O₃ + 3C → 4Al + 3CO₂ (including the anode combustion).
  - Energy-intensive: ~15 kWh per kg of Al. Aluminium smelters are located near cheap hydroelectric power.

- **Down's cell (sodium and chlorine production)**:
  - Electrolyte: molten NaCl (with CaCl₂ to lower mp from 801°C to ~600°C).
  - Cathode: Na⁺ + e⁻ → Na(l) (liquid sodium collected above the cathode).
  - Anode: 2Cl⁻ → Cl₂(g) + 2e⁻.
  - A steel diaphragm separates the sodium and chlorine products to prevent recombination.

- **Chloralkali process (industrial Cl₂ and NaOH)**:
  - Electrolysis of concentrated brine (aqueous NaCl).
  - Cathode: 2H₂O + 2e⁻ → H₂(g) + 2OH⁻ (water reduced, not Na⁺, because Na⁺ has a very negative E°).
  - Anode: 2Cl⁻ → Cl₂(g) + 2e⁻ (Cl⁻ discharged in preference to H₂O despite E° argument — high Cl⁻ concentration + overpotential effect).
  - Net: 2NaCl + 2H₂O → 2NaOH + H₂ + Cl₂. Three valuable products (NaOH, Cl₂, H₂); Na⁺ and OH⁻ left in solution → NaOH liquor.
  - Membrane cell: cation-exchange membrane allows Na⁺ but not Cl⁻ or OH⁻ to pass → pure NaOH on cathode side, no mixing.

- **Electroplating**:
  - Object to be plated = cathode; metal to be deposited = anode (active anode dissolves) OR plating solution contains the metal ion.
  - Cu electroplating from CuSO₄: Cu²⁺ + 2e⁻ → Cu (cathode); Cu(s) → Cu²⁺ + 2e⁻ (anode). Anode dissolves to replenish Cu²⁺ — concentration of CuSO₄ remains approximately constant.
  - Chrome plating uses inert Pt anode + Cr₂O₇²⁻ electrolyte — the anode does NOT dissolve; Cr₂O₇²⁻ provides the Cr.

## Mental Models
**Electrolytic cell as a chemical pump**: an external power supply is a pump that forces electrons "uphill" — it pumps electrons from cathode to the external circuit and forces them back in at the negative terminal (cathode). This is the reverse of a battery (which lets electrons flow downhill spontaneously). Just as a water pump can force water uphill (reverse of gravity), a power supply can force electrons through a non-spontaneous reaction (reverse of spontaneous redox).

**Faraday's law as a currency conversion**: electrons are the currency. Every time n electrons flow, one formula unit of the electrode material is deposited. Q/F = moles of electrons; moles of product = (Q/F)/n. The M/n ratio (electrochemical equivalent) is the "exchange rate" between electron-currency and mass.

## Why Students Fail
Students confuse which electrode is cathode/anode in electrolytic vs. galvanic cells, especially the polarity (cathode is positive in galvanic; cathode is connected to the negative terminal in electrolytic). They also confuse Faraday's First and Second Laws — First is about charge → mass; Second is about comparing two electrolytes at the same charge. They use n=1 for everything (forgetting that Cu²⁺ needs 2e⁻, Al³⁺ needs 3e⁻).

## Misconceptions
- **MC-1 (Type 4 — notation-induced)**: "In electrolysis, the cathode is the positive electrode." Probe: "In a galvanic cell, is the cathode positive or negative? Now in an electrolytic cell, which terminal of the external power supply is connected to the cathode?" Characteristic phrase: "cathode is positive in electrolysis too." Intervention: the cathode is ALWAYS the electrode where REDUCTION occurs — that is the definition. In a GALVANIC cell, the cathode is the POSITIVE terminal (conventional current flows into it from the external circuit). In an ELECTROLYTIC cell, the cathode is connected to the NEGATIVE terminal of the external power supply (electrons are pumped INTO it to force reduction). The confusion arises from the galvanic convention being applied to the electrolytic case. Anchor to the PROCESS (reduction = cathode) rather than the sign — then deduce the sign from the setup.
- **MC-2 (Type 5 — instruction-induced)**: "In chloralkali electrolysis, sodium is deposited at the cathode from aqueous NaCl because Na⁺ is the cation." Probe: "Compare E°(Na⁺/Na) and E°(H₂O/H₂). Which is more readily reduced?" Characteristic phrase: "Na⁺ migrates to cathode so Na must be deposited." Intervention: E°(Na⁺/Na) = −2.71 V; E°(2H₂O + 2e⁻ → H₂ + 2OH⁻) = −0.83 V. Water is far more easily reduced than Na⁺ in aqueous solution → H₂ is produced at the cathode, NOT Na. Na is only produced in the DOWN'S CELL where the electrolyte is MOLTEN NaCl (no water present). This is the distinction between molten and aqueous electrolytes — in aqueous systems, H₂O and H⁺ compete with Na⁺ and always win.
- **MC-3 (Type 1 — overgeneralization)**: "Faraday's Second Law means you always get the same mass of different metals from the same charge." Probe: "If 96 500 C is passed through CuSO₄ and AgNO₃ solutions in series, what mass of each is deposited?" Characteristic phrase: "same charge = same mass for both metals." Intervention: the SAME CHARGE gives the SAME NUMBER OF MOLES OF ELECTRONS. But the mass deposited depends on M/n (the electrochemical equivalent). Cu²⁺ + 2e⁻ → Cu: moles Cu = (96500/96500)/2 = 0.5 mol → mass = 0.5 × 63.5 = 31.75 g. Ag⁺ + e⁻ → Ag: moles Ag = 96500/96500 = 1 mol → mass = 107.9 g. The MOLES of electrons are equal, but the masses differ because n (and M) differ. "Same mass" is wrong — "same moles of electrons" is the correct statement of Faraday's Second Law.

## Analogies
**Valid**: Faraday's First Law is like a coin-minting machine — every coin requires exactly n presses (electrons). Pass Q/F moles of presses → make (Q/F)/n moles of coins. Different coins need different numbers of presses (different n) and have different masses (different M) — but the machine runs at the same rate regardless.

## Demonstrations
**Copper electroplating**: set up a cell with a copper anode, an iron key (cathode), and CuSO₄ electrolyte (acidified with H₂SO₄). Run 0.5 A for 10 minutes; calculate predicted Cu mass: m = (0.5 × 600 × 63.5)/(2 × 96500) = 0.099 g. Weigh the key before and after → compare with prediction. Students see Faraday's First Law as a quantitative tool, not just a formula.

**Preferential discharge in brine**: electrolyse dilute vs. concentrated NaCl solution at platinum electrodes. Test cathode gas (H₂ — squeaky pop) and anode gas (Cl₂ — bleaches litmus). In dilute NaCl, both O₂ and Cl₂ may form at the anode (mixture). In concentrated NaCl, primarily Cl₂ forms — demonstrating the concentration effect on preferential discharge.

## Discovery Questions
1. "How long must a 3.00 A current flow through an aqueous solution of NiSO₄ to deposit exactly 2.93 g of nickel? (Ni molar mass = 58.7 g/mol; Ni forms Ni²⁺.)"
2. "In the Hall-Héroult process, why are the anodes made of carbon rather than platinum, even though Pt would not be consumed? Compare the relative merits of cost vs. consumability for the two choices. Calculate how many kg of carbon (as CO₂) is consumed per kg of Al produced, given the net reaction 2Al₂O₃ + 3C → 4Al + 3CO₂."

## Teaching Sequence
1. Distinguish electrolytic cell from galvanic: external power supply, forced non-spontaneous reaction, polarity of cathode/anode.
2. Preferential discharge: electrochemical series, concentration effect, overpotential. Worked examples with NaCl solutions.
3. Faraday's First Law: derive m = (Q × M)/(n × F); worked example with copper plating.
4. Faraday's Second Law: same Q → same moles of electrons → different masses if M/n differs; series electrolysis example.
5. Industrial applications: Hall-Héroult (molten Al₂O₃, C anodes consumed); Down's cell (molten NaCl, Na and Cl₂); chloralkali (aqueous NaCl, H₂ at cathode, Cl₂ at anode, NaOH in solution); electroplating.

## Tutor Actions
- **If student says cathode is positive in electrolysis**: "Define cathode by process, not charge. Cathode = REDUCTION always. In electrolysis, which terminal of the battery forces reduction — the terminal that PUSHES electrons in. Which terminal pushes electrons? The negative terminal." (Cathode = negative terminal in electrolytic cell.)
- **If student uses n=2 for Ag or n=1 for Cu**: ask "What is the oxidation state of the ion being deposited? Cu²⁺ needs 2e⁻ per atom. Ag⁺ needs 1e⁻. The n equals the charge on the ion." Force the oxidation-state identification before the calculation.
- **FRAGILE sign**: can apply Faraday's First Law to a worked example when given n, but cannot determine n independently or handle the Second Law comparison between two metals.

## Voice Teaching Notes
Faraday's First Law calculation is procedural — in voice, enforce the exact sequence: (1) state the half-equation (to find n), (2) calculate Q = I × t, (3) calculate moles of electrons = Q/F, (4) calculate moles of product = moles of electrons/n, (5) calculate mass = moles × M. If the student skips step (1), interrupt: "Before you calculate, write the half-equation at the cathode. What is n?" Never allow number-plugging before identifying n from the half-equation.

## Assessment Signals
- **Green**: correctly identifies cathode/anode in electrolytic cell (by process and by terminal polarity); explains preferential discharge using E° + concentration + overpotential; applies Faraday's First Law correctly (correct n from half-equation); correctly applies Second Law to compare two metals at same Q; explains Hall-Héroult, Down's, chloralkali, and electroplating with electrode reactions.
- **Amber**: applies Faraday's First Law correctly for familiar examples but incorrectly identifies n for unfamiliar ions; or confuses cathode polarity in electrolytic vs. galvanic cells.
- **Red**: says Na is produced at the cathode in aqueous NaCl electrolysis; says the cathode is the positive electrode in electrolysis; applies Faraday's Second Law as "same mass at same charge."
- **Probe**: "A 0.50 A current is passed for 30 minutes through a silver nitrate solution. (a) Calculate the mass of silver deposited. (b) The same current is then passed for 30 minutes through a CuSO₄ solution. Calculate the mass of copper deposited. (c) Compare the two masses and explain which law this demonstrates."

## Tutor Recovery Strategy
If student cannot set up Faraday's calculation: provide a template. "Step 1: write the cathode half-equation and identify n. Step 2: Q = I × t (in C). Step 3: moles of e⁻ = Q/96500. Step 4: moles of metal = moles of e⁻ ÷ n. Step 5: mass = moles × M_r." Walk through exactly one example with the student completing each step before moving to the next. Then immediately apply to a second, slightly different example without the template to test transfer.

## Memory Hooks
- **Cathode polarity**: "ALWAYS: cathode = reduction. Galvanic: cathode = + terminal. Electrolytic: cathode = − terminal (negative terminal pushes e⁻ in to force reduction)."
- **Faraday's First Law**: "m = (I × t × M)/(n × F). n = charge on ion. F = 96500 C/mol."
- **Faraday's Second Law**: "Same Q → same moles of e⁻ → DIFFERENT masses if M/n differs. m is proportional to M/n (electrochemical equivalent)."
- **Hall-Héroult**: "Molten Al₂O₃ in cryolite → Al at cathode, O₂ burns C anodes → CO₂. Very energy-intensive."
- **Chloralkali**: "Aqueous NaCl → H₂ at cathode (H₂O reduced, not Na⁺), Cl₂ at anode (Cl⁻ discharged), NaOH in solution."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for electrolysis and electrochemical quantitative analysis.

## Cross-Subject Connections
- **Physics**: the connection between charge (Q = I × t), Faraday's constant, Avogadro's number, and electron charge (F = N_A × e) links electrochemistry quantitatively to atomic-scale physics. The measurement of F was historically one of the precision measurements of Avogadro's number.
- **Industrial chemistry**: electrolysis underpins the production of Al (Hall-Héroult), Na, Cl₂, NaOH, F₂, H₂ (by water electrolysis), Cu refining (electrorefining — impure anode dissolves, pure Cu plates at cathode), and Zn (electrowinning). These represent major branches of the chemicals industry.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.elect.electrolysis`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.elect.electrolysis` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
