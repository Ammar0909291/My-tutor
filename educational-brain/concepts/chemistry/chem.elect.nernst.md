# Nernst Equation — `chem.elect.nernst`

## Identity
- **KG ID**: chem.elect.nernst
- **Subject**: chemistry
- **Domain**: chem.elect
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.elect.standard-electrode, chem.equil.kc-kp
- **Unlocks**: (none — terminal node)

## Learning Objective
Write and apply the Nernst equation to calculate the cell potential at non-standard conditions; relate cell potential to Gibbs energy and equilibrium constant; predict the effect of concentration changes on cell potential; and interpret concentration cells using the Nernst equation.

## Core Understanding
**Why standard electrode potentials are insufficient**:
Standard electrode potentials (E°) are measured at standard conditions: all ions at 1 mol/L concentration, gases at 1 bar pressure, 298 K. Real cells rarely operate at these conditions. The Nernst equation extends E° to non-standard conditions by accounting for how ion concentrations affect the electrode potential.

**The Nernst equation**:
For a half-reaction or a full cell reaction, the potential E at non-standard conditions is:

**E = E° − (RT/nF) ln Q**

At 298 K, substituting R = 8.314 J mol⁻¹ K⁻¹, T = 298 K, F = 96485 C mol⁻¹, and converting ln to log₁₀:

**E = E° − (0.0592/n) log₁₀ Q**   (at 298 K, with E in volts)

Where:
- E = cell potential at the given conditions (V)
- E° = standard cell potential (V)
- n = number of electrons transferred in the balanced cell equation
- F = Faraday constant (96485 C mol⁻¹)
- Q = reaction quotient for the CELL REACTION (not a half-reaction unless explicitly stated)
- R = 8.314 J mol⁻¹ K⁻¹; T = temperature in K

**Setting up Q correctly**:
Q is written as for any equilibrium expression — products over reactants, raised to their stoichiometric coefficients, using concentrations for solutes and partial pressures for gases. PURE SOLIDS and PURE LIQUIDS (including water as a pure liquid) are OMITTED from Q. The convention: Q is written for the SPONTANEOUS direction of the cell reaction (the direction that has E_cell > 0).

Example — Daniell cell: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)
Q = [Zn²⁺]/[Cu²⁺] (solids omitted)
E = E°_cell − (0.0592/2) log₁₀([Zn²⁺]/[Cu²⁺])
E°_cell = +1.10V; if [Cu²⁺]=1.0M and [Zn²⁺]=0.1M: log Q = log(0.1/1.0) = −1; E = 1.10 − (0.0296)(−1) = 1.10 + 0.0296 = 1.13V (slightly higher than E° because Cu²⁺ is at standard, Zn²⁺ below standard → reaction is "pushed forward").

**Qualitative prediction of concentration effects**:
- Increasing the concentration of reactants (e.g., increasing [Cu²⁺] in the Daniell cell): decreases Q → decreases (RT/nF) ln Q term → increases E (makes cell more positive, more spontaneous). Le Chatelier: favouring forward reaction → higher cell potential.
- Increasing the concentration of products: increases Q → term increases → E decreases. At equilibrium, Q = K and E = 0 (the cell is exhausted).

**The relationship E°, ΔG°, and K**:
At standard conditions (Q = 1, so ln Q = 0): E = E°, and from thermodynamics:
**ΔG° = −nFE°**
At equilibrium (E = 0, Q = K):
0 = E° − (RT/nF) ln K → **E° = (RT/nF) ln K → ln K = nFE°/RT = nE°/0.0256 at 298K → log K = nE°/0.0592**

So E° connects to both ΔG° and K:
- Positive E° → ΔG° negative → spontaneous → K > 1 → equilibrium favours products.
- E° = 0.0592/n per decade of K (e.g., n=2, E°=0.30V → log K = 2×0.30/0.0592 = 10.1 → K ≈ 10^10).

**Concentration cells**:
A concentration cell is one where BOTH electrodes are made of the SAME METAL in contact with DIFFERENT concentrations of the SAME electrolyte. The EMF arises purely from the concentration difference — not from different metals.

Example: Cu|Cu²⁺(0.01 M) || Cu²⁺(1.0 M)|Cu
E°_cell = 0 (same electrode material), n = 2.
Q = [Cu²⁺]_dilute / [Cu²⁺]_concentrated = 0.01/1.0 = 0.01
E = 0 − (0.0592/2) log(0.01) = − (0.0296)(−2) = +0.0592 V.

The more dilute solution is the ANODE (the metal dissolves, releasing Cu²⁺ to increase the concentration); the more concentrated solution is the CATHODE (Cu²⁺ is deposited, reducing the concentration). The cell spontaneously tends to EQUALIZE concentrations.

**pH measurement — the hydrogen electrode as a Nernst application**:
For the hydrogen half-cell: H⁺ + e⁻ → ½H₂; E = E° − (0.0592/1) log([H₂]^½/[H⁺])
At P(H₂) = 1 bar: E = 0 − (0.0592)(−pH) = 0.0592 × pH
A glass electrode in a pH meter measures a potential that is a Nernst function of [H⁺] — 59.2 mV per pH unit at 298 K. This is the electrochemical basis of pH measurement.

**Temperature dependence**:
At temperatures other than 298 K, the 0.0592 factor changes — it is (RT/nF) × 2.303, so at temperature T: (0.02569 × 2.303 / n) = (0.05916/n) at 298K. At 37°C (310K): 2.303 × R × 310 / F = 0.0615V per unit of log Q — relevant for biological systems (membrane potentials, the Nernst equation for biological ion channels).

## Mental Models
**Nernst equation as a correction for reality**: E° is the potential in a "perfect," standard world. The Nernst equation adds a correction term (−RT/nF ln Q) that says: "how far are we from standard conditions, and in which direction does that push the potential?" When Q < 1 (products less than equilibrium), the correction is positive (E > E°, more driving force). When Q > 1 (products exceed equilibrium), the correction is negative (E < E°, less driving force). When Q = K, the correction exactly cancels E° and E = 0 — battery dead.

**Concentration cell as a "pressure difference"**: just as gas flows from high pressure to low pressure, ions flow (electrochemically) from high concentration to low concentration. The concentration cell converts this thermodynamic gradient into electrical work. The EMF tells you how much work is available per coulomb from the concentration gradient — the same principle that generates membrane potentials in neurons.

## Why Students Fail
Students substitute individual half-cell concentrations into Q instead of the full cell reaction Q. They forget to include only the stoichiometrically correct powers of concentration. They confuse the sign convention (decreasing product concentration increases E, not decreases it). They cannot set up Q for a concentration cell because they think E° = 0 means no EMF is possible.

## Misconceptions
- **MC-1 (Type 4 — notation-induced)**: "Q in the Nernst equation is calculated from the half-reaction at each electrode separately and then combined." Probe: "For the Daniell cell Zn/Cu, write Q. Is it [Zn²⁺]/[Cu²⁺] or [Cu²⁺]/[Zn²⁺] or something else?" Characteristic phrase: "Q has four concentration terms, two for each half-cell." Intervention: Q in the Nernst equation is the reaction quotient for the OVERALL CELL REACTION written in the spontaneous direction. For Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s): Q = [Zn²⁺]/[Cu²⁺]. This is the standard equilibrium-expression format (products/reactants, raised to stoichiometric coefficients, solids omitted). You do NOT write separate half-reaction Q values and combine them. The same rules as for K_c/K_p apply to Q in the Nernst equation — it is the SAME reaction quotient concept applied to the cell's overall equation.
- **MC-2 (Type 2 — perceptual intuition)**: "A concentration cell has E° = 0, so it can't generate any voltage — it's always a dead cell." Probe: "If one half-cell has [Cu²⁺] = 0.001 M and the other has [Cu²⁺] = 1.0 M, does E = E° − (0.0592/n) log Q give zero?" Characteristic phrase: "E° = 0 means no voltage." Intervention: E° = 0 means the cell has no voltage under STANDARD CONDITIONS (both concentrations at 1 M). The Nernst correction term (−0.0592/n) log Q is NOT zero when concentrations differ. If [Cu²⁺] = 0.001 M (dilute, anode side) and [Cu²⁺] = 1.0 M (concentrated, cathode side): Q = 0.001/1.0 = 10⁻³; log Q = −3; E = 0 − (0.0592/2)(−3) = +0.0888 V. A real voltage exists purely from the concentration gradient. E° = 0 is NOT E = 0 — it means only that the standard potential is zero, but the concentration-dependent term can still be nonzero.
- **MC-3 (Type 5 — instruction-induced)**: "Increasing the concentration of the oxidant always increases the cell potential by the same amount per decade." Probe: "If n=1, what is the change in E per 10-fold change in the oxidant concentration? What if n=2?" Characteristic phrase: "every 10× concentration change gives the same voltage shift." Intervention: the change in E per decade of Q change is (0.0592/n) volts at 298 K. For n=1: 0.0592 V per decade of Q; for n=2: 0.0296 V per decade; for n=6: 0.00987 V per decade. The n-dependence means that reactions transferring more electrons are LESS sensitive to concentration changes per decade — the 0.0592/n factor decreases. This has practical implications: the Nernst potential of a half-cell depends on the number of electrons in the half-reaction, and you must always divide the 0.0592 factor by n correctly.

## Analogies
**Valid**: the Nernst equation is like a tax adjustment to a standard salary (E°). The tax depends on how far your actual income (Q) is from the standard reference level (Q=1 → standard). If you earn less than standard (Q < 1 → more reactant than product), you pay NEGATIVE tax — your take-home (E) is higher than E°. If you earn more than standard (Q > 1 → more product than reactant), you pay POSITIVE tax — your take-home is lower. When the tax exactly equals the salary (Q = K), you take home nothing (E = 0 — equilibrium, cell exhausted).

## Demonstrations
**Concentration cell measurement**: set up a cell with two copper half-cells at different [Cu²⁺] concentrations (e.g., 0.1M and 1.0M) connected by a salt bridge. Measure the EMF with a voltmeter. Predict using the Nernst equation (E = 0.0296 V for a 10-fold difference, n=2). Compare measured vs. calculated. Direct, quantitative confirmation.

**Effect of concentration on Daniell cell**: measure the Daniell cell voltage. Then dilute the CuSO₄ solution 100-fold and remeasure (voltage decreases by ~0.0592V for 100-fold dilution with n=2 = 2 × 0.0296 = 0.0592V drop). Alternatively, increase CuSO₄ concentration (voltage increases). Students see the Nernst equation operating in real time.

## Discovery Questions
1. "Calculate the cell potential for the cell: Mg|Mg²⁺(0.001M)||Fe²⁺(0.1M)|Fe at 298 K. Given E°(Mg²⁺/Mg)=−2.37V and E°(Fe²⁺/Fe)=−0.44V. Identify cathode and anode. Calculate E°_cell, Q, and then E."
2. "A galvanic cell gives E°=+0.60V with n=2. What is log K for this reaction? If the reaction is run at non-standard conditions with Q=10⁴, what is E? At what value of Q does E = 0?"

## Teaching Sequence
1. Motivation: E° assumes standard conditions; real cells differ. Need a correction.
2. Nernst equation: E = E° − (0.0592/n) log Q at 298K. Define each term.
3. Setting up Q: use the full CELL REACTION (spontaneous direction), products/reactants, stoichiometric powers, solids/pure liquids omitted. Practice with Daniell cell and one other example.
4. Qualitative effects: increasing reactant concentration → Q ↓ → E ↑. Increasing product concentration → Q ↑ → E ↓. At Q = K, E = 0.
5. Connection to ΔG and K: ΔG = −nFE; ΔG° = −nFE°; log K = nE°/0.0592. Triangle of relationships.
6. Concentration cells: E° = 0 but E ≠ 0 when concentrations differ; anode = dilute side; cathode = concentrated side.
7. Applications: pH measurement (glass electrode); biological membrane potentials (Nernst potential for single ion).

## Tutor Actions
- **If student sets up Q incorrectly**: ask "Write the balanced cell equation in the spontaneous direction. Now write Q for that equation as you would for any equilibrium expression — products over reactants, stoichiometric coefficients as powers. What are the products?" Walk through each species.
- **If student says concentration cells have no EMF**: ask "Write the Nernst equation for a Cu/Cu²⁺ cell where E° = 0. Is the whole equation zero, or is there still the correction term?" (Still the correction term.) "So what gives the EMF?" (The log Q term — which is non-zero when concentrations differ.)
- **FRAGILE sign**: student can substitute numbers into the Nernst equation correctly but cannot set up Q for a cell not already worked, or cannot predict qualitatively which direction E changes when a concentration changes.

## Voice Teaching Notes
Begin by anchoring the need for the Nernst equation with a concrete question: "Imagine a Daniell cell where the Cu²⁺ concentration has dropped to 0.001 M as the cell discharges. Does the cell potential stay the same as at 1.0 M?" (No — it must change.) "So we need a formula that connects the concentration to the voltage — that's the Nernst equation." In voice, walk through Q setup before introducing the equation, as students stumble most on constructing Q correctly. Then present the equation with Q already defined. Avoid introducing the RT/nF form first — go straight to the 0.0592/n form at 298K to reduce cognitive load.

## Assessment Signals
- **Green**: writes the Nernst equation correctly (E = E° − 0.0592/n × log Q at 298K); correctly sets up Q for a given cell reaction (products/reactants, solids omitted, correct stoichiometric powers); calculates E at non-standard conditions for a given cell; states that E = 0 at equilibrium (Q = K); derives log K = nE°/0.0592 and applies it; correctly identifies anode (dilute) and cathode (concentrated) in a concentration cell and calculates its EMF.
- **Amber**: applies the formula correctly when Q is given but cannot construct Q from a cell equation; or correctly sets up Q but makes sign errors in the log term.
- **Red**: substitutes half-reaction concentrations separately into Q rather than using the cell equation Q; says concentration cells produce no EMF because E° = 0.
- **Probe**: "The cell Pt|H₂(1 bar)|H⁺(pH=4)||H⁺(pH=1)|H₂(1 bar)|Pt has E°=0. Calculate the cell potential. Which half-cell is the anode?"

## Tutor Recovery Strategy
If student cannot set up Q: return to equilibrium constant rules first. "Write the equilibrium constant K for the reaction A + B → C + D. Products over reactants — yes. Now apply the SAME rule to the Nernst equation's Q for your cell reaction. Write the cell reaction first. Now products over reactants with stoichiometric powers." The Nernst Q is the exact same object as K from equilibrium — same rules, just evaluated before equilibrium is reached. Once this connection is made explicit, Q setup usually becomes straightforward.

## Memory Hooks
- **Nernst equation**: "E = E° − (0.0592/n) × log Q at 298K."
- **Sign interpretation**: "Q < 1 → log Q negative → correction term positive → E > E°. Q > 1 → E < E°. Q = K → E = 0."
- **K from E°**: "log K = nE°/0.0592. Positive E° → large K → spontaneous."
- **ΔG trinity**: "ΔG° = −nFE°; ΔG° = −RT ln K; log K = nE°/0.0592. Three faces of the same quantity."
- **Concentration cell**: "E° = 0. EMF from concentration difference only. Dilute side = anode. Concentrated side = cathode."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for electrochemical thermodynamics.

## Cross-Subject Connections
- **Biochemistry / physiology**: the Nernst equation is the foundation of membrane biophysics. The Nernst potential for an ion (e.g., K⁺ across a cell membrane) is E = (RT/zF) ln([K⁺]_out/[K⁺]_in) — the voltage at which there is no net electrochemical driving force for that ion. For K⁺ (z=+1, [K⁺]_out ≈ 5mM, [K⁺]_in ≈ 140mM): E_K = −90mV (close to the resting membrane potential). The Goldman equation extends the Nernst equation to multiple ions with different permeabilities — the basis of the action potential calculation.
- **Analytical chemistry**: the glass electrode in a pH meter exploits the Nernst equation — a thin glass membrane develops a potential proportional to [H⁺] difference between the internal buffer and the test solution (59.2 mV per pH unit at 25°C, exactly as the Nernst equation predicts for n=1). Ion-selective electrodes (ISEs) for Na⁺, K⁺, Ca²⁺, Cl⁻, NO₃⁻ all operate on the Nernst principle. The Nikolsky equation extends the Nernst-based ISE response to account for interfering ions.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.elect.nernst`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.elect.nernst` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
