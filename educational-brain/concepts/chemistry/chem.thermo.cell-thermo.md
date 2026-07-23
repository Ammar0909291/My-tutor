# Electrochemical Thermodynamics — `chem.thermo.cell-thermo`

## Identity

- **KG ID**: chem.thermo.cell-thermo
- **Subject**: Chemistry
- **Domain**: Thermodynamics (chem.thermo)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.thermo.gibbs
- **Unlocks**: chem.elect.galvanic-cell
- **Cross-links**: none

## Learning Objective

Students can derive and apply ΔG = −nFE to relate Gibbs energy change to cell EMF; use ΔG° = −nFE° to calculate the equilibrium constant K; apply the Nernst equation to calculate cell EMF at non-standard conditions; and qualitatively describe the temperature dependence of EMF using thermodynamic relations.

## Core Understanding

**Connecting ΔG and cell EMF**:
The maximum electrical work a galvanic cell can do equals the Gibbs energy released by the cell reaction. For a reversible cell:
w_elec = −ΔG

The electrical work done when n moles of electrons pass through a potential difference E is:
w_elec = nFE

where F = Faraday's constant = 96,485 C mol⁻¹ (charge per mole of electrons) and n = moles of electrons transferred in the balanced cell equation.

Therefore:
**ΔG = −nFE**

At standard conditions (all activities = 1):
**ΔG° = −nFE°**

**Sign conventions**:
- Spontaneous cell reaction: ΔG < 0 → E > 0 (positive EMF)
- Non-spontaneous (electrolytic cell direction): ΔG > 0 → E < 0 (negative EMF, must be driven)
- At equilibrium: ΔG = 0 → E = 0 (flat battery)

**Equilibrium constant from E°**:
Combining ΔG° = −nFE° with ΔG° = −RT ln K:
−nFE° = −RT ln K
**E° = (RT/nF) ln K**

At 298 K, substituting R = 8.314, T = 298, F = 96485:
E° = (0.02569/n) ln K = (0.05916/n) log₁₀ K

A cell with E° = +0.1 V and n = 2 has ln K = nFE°/RT = 2 × 96485 × 0.1 / (8.314 × 298) ≈ 7.79 → K ≈ 2,400.

**Nernst equation** (EMF at non-standard Q):
Combining ΔG = ΔG° + RT ln Q with ΔG = −nFE and ΔG° = −nFE°:
−nFE = −nFE° + RT ln Q
**E = E° − (RT/nF) ln Q**

At 298 K in log₁₀ form:
E = E° − (0.05916/n) log₁₀ Q

As Q increases (products accumulate), E decreases. At equilibrium Q = K, E = 0.

**Temperature dependence of EMF**:
From ΔG = ΔH − TΔS and ΔG = −nFE:
−nFE = ΔH − TΔS
E = −ΔH/nF + TΔS/nF

The temperature coefficient of EMF:
(∂E/∂T)_P = ΔS/nF

A positive ΔS → EMF increases with T. A negative ΔS → EMF decreases with T.
ΔH = −nF[E − T(∂E/∂T)_P] (allows measuring ΔH of cell reaction from EMF data).

## Mental Models

**The electrical potential vs. Gibbs energy hill model**: ΔG is the height of a thermodynamic hill; E is the height of an electrical potential hill. Both are measures of the driving force — ΔG = −nFE converts between the two unit systems. A spontaneous cell runs "downhill" in both Gibbs energy (ΔG < 0) and cell potential (E > 0).

**The Nernst equation as a concentration correction**: E° is the driving force under "textbook" conditions (all activities = 1). The Nernst correction (−RT/nF × ln Q) adjusts for reality — when reactants are dilute or products concentrated, the driving force decreases. A dead battery has Q = K → E = 0.

## Why Students Fail

1. **Forgetting the negative sign in ΔG = −nFE**: students write ΔG = nFE and get wrong signs throughout.
2. **Using n = total electrons, not balanced-equation electrons**: n is the number of moles of electrons transferred in the stoichiometrically balanced cell equation as written — if you double the equation, n doubles and E stays the same (intensive property) but ΔG doubles (extensive).
3. **Nernst equation at wrong temperature**: the 0.05916/n coefficient is valid ONLY at 298 K. At other temperatures, the full (RT/nF) factor must be used.
4. **E° gives the EMF at all concentrations**: students assume E° is the experimentally measured EMF. It is the EMF only when all activities are unity — the Nernst equation corrects for non-standard conditions.

## Misconceptions

**MC-1 — ΔG = nFE (missing the negative sign)** (Type 4, notation-induced)
- *Mechanism*: the negative sign is easy to drop in a long derivation; students remember "ΔG and E are related by nF" without the sign.
- *Diagnostic probe*: "A galvanic cell has E = +0.76 V and n = 2. Calculate ΔG. Is the reaction spontaneous?"
- *Characteristic phrase*: "ΔG = nFE = 2 × 96485 × 0.76 = +146,657 J. Since ΔG is positive... but E is positive too, so it should be spontaneous. I'm confused."
- *Repair*: ΔG = −nFE. The negative sign is not optional — it encodes the thermodynamic convention (spontaneous = negative ΔG) and the electrochemical convention (spontaneous = positive E). ΔG = −(2)(96485)(0.76) = −146,657 J = −146.7 kJ. Negative ΔG and positive E both mean spontaneous — consistent. The negative sign maintains consistency between the two sign conventions.

**MC-2 — E° is intensive (stays constant when equation is multiplied)** (Type 5, instruction-induced)
- *Mechanism*: students are told "E° doesn't change when you multiply the equation" (which is true) and over-apply it: they also assume ΔG° doesn't change.
- *Diagnostic probe*: "Write the Zn/Cu cell reaction with n = 2. Now double it (n = 4). Do E° and ΔG° change? By how much?"
- *Characteristic phrase*: "When I double the equation, neither E° nor ΔG° changes because they are both equilibrium properties."
- *Repair*: E° is intensive (doesn't depend on amount, like temperature or density). ΔG° = −nFE° is EXTENSIVE — it scales with n. When you double the equation, n doubles (from 2 to 4), so ΔG° doubles (becomes more negative). E° stays the same. ΔG° changes. This is why the ΔG = −nFE formulation is more powerful than E alone — it carries information about the extent of the reaction.

**MC-3 — A higher E° always means a faster reaction** (Type 6, analogy overextension from "higher driving force → faster")
- *Mechanism*: students correctly know that a larger positive E means a more spontaneous reaction and analogise this to reaction rate.
- *Diagnostic probe*: "Reaction A has E° = +1.5 V; Reaction B has E° = +0.2 V. Which one is necessarily faster?"
- *Characteristic phrase*: "A is faster because it has a larger cell potential, so it has more driving force."
- *Repair*: E° (and ΔG°) are thermodynamic quantities — they describe the driving force toward equilibrium, not the rate of approach. Rate depends on activation energy Ea (Arrhenius, from chem.kinet.arrhenius), which is kinetic, not thermodynamic. A highly favourable reaction (large |ΔG°|) can still be very slow if Ea is high (e.g., diamond → graphite: very favourable ΔG but essentially zero rate at room temperature).

## Analogies

**The water wheel analogy**: Gibbs energy is the height of a waterfall; cell potential is the height of a water wheel's drop; nF is the conversion from water-volume to electrical power. The spontaneous flow is from high to low — both ΔG < 0 and E > 0 signal downhill flow. The wheel stops (E = 0) when water levels equalise (Q = K).

**The Nernst correction as loan repayment analogy**: E° is the ideal value when you start with no debt (standard conditions). As the reaction proceeds (Q increases), the "debt" (RT/nF ln Q) accumulates and reduces the driving force. The battery goes flat when the debt equals the starting capital (Q = K).

## Demonstrations

**Demonstration 1 — Concentration cell (Nernst in action)**
- Set up two half-cells: both Cu/Cu²⁺, but one with [Cu²⁺] = 1.0 M and the other with [Cu²⁺] = 0.001 M. E° = 0 (identical electrodes). Nernst equation predicts a non-zero EMF: E = 0 − (0.05916/2) log₁₀(0.001/1.0) = 0 − (0.02958)(−3) = +0.089 V. Measure with a voltmeter — confirms that EMF arises purely from the concentration gradient, not from the electrode identity.

## Discovery Questions

1. "A galvanic cell based on Zn²⁺/Zn and Cu²⁺/Cu half-reactions has E° = +1.10 V with n = 2. (a) Calculate ΔG°. (b) Calculate K at 298 K." (Targets: (a) ΔG° = −nFE° = −(2)(96485)(1.10) = −212,267 J ≈ −212 kJ. (b) K = e^(nFE°/RT) = e^(212267/2477) = e^(85.7) ≈ 10^37. Equilibrium strongly favours products — essentially irreversible.)
2. "For the Zn/Cu cell (E° = 1.10 V, n = 2), calculate E when [Zn²⁺] = 0.001 M and [Cu²⁺] = 2.0 M at 298 K." (Targets: Q = [Zn²⁺]/[Cu²⁺] = 0.001/2.0 = 5 × 10⁻⁴. E = 1.10 − (0.05916/2) log₁₀(5 × 10⁻⁴) = 1.10 − 0.02958 × (−3.301) = 1.10 + 0.0977 = 1.198 V. Higher [Cu²⁺] and lower [Zn²⁺] increase the driving force above E°.)
3. "For a cell with ΔS° = +85 J mol⁻¹ K⁻¹ and n = 2, calculate the temperature coefficient (∂E/∂T)_P and state whether EMF increases or decreases with temperature." (Targets: (∂E/∂T)_P = ΔS/nF = 85/(2 × 96485) = 4.40 × 10⁻⁴ V K⁻¹. Positive coefficient → EMF increases with temperature. This is the electrochemical signature of a reaction that gains entropy — consistent with ΔG becoming more negative as T increases when ΔS > 0.)

## Teaching Sequence

1. Review from chem.thermo.gibbs: ΔG = ΔH − TΔS; ΔG° = −RT ln K; ΔG = ΔG° + RT ln Q.
2. Motivate the electrochemical connection: electrical work = nFE; thermodynamic work = −ΔG. Derive ΔG = −nFE (with the negative sign explicitly motivated).
3. Standard conditions: ΔG° = −nFE°. Sign conventions: spontaneous → E > 0, ΔG < 0. Address MC-1.
4. E° as intensive property: explain n's role; show that doubling the equation doubles n and ΔG° but not E°. Address MC-2.
5. Equilibrium constant: derive E° = (RT/nF) ln K; compute K at 298 K using E°. Work Discovery Question 1.
6. Nernst equation: derive from ΔG = ΔG° + RT ln Q; apply at 298 K (0.05916/n coefficient). Work Discovery Question 2.
7. Temperature dependence: derive (∂E/∂T)_P = ΔS/nF; work Discovery Question 3. Address MC-3 (E° ≠ rate).

## Tutor Actions

- If student writes ΔG = +nFE → MC-1 repair: the negative sign; both conventions demand it; check consistency.
- If student says both E° and ΔG° are unchanged when equation is doubled → MC-2 repair: E° is intensive, ΔG° = −nFE° is extensive; n doubles → ΔG° doubles.
- If student says higher E° means faster reaction → MC-3 repair: thermodynamics ≠ kinetics; Ea determines rate, not ΔG.
- Advance when student can use ΔG = −nFE, compute K from E°, and apply the Nernst equation to non-standard Q.

## Voice Teaching Notes

"ΔG = −nFE. Say the negative sign every time." For every calculation, read the formula aloud with emphasis: "negative n F E." This prevents MC-1.

For the Nernst equation at 298 K: "If you're at 298 K, you can use the number 0.05916 — but if T ≠ 298, write RT/nF, plug in T in Kelvin, and compute." This catches the MC variant where students use 0.05916 at the wrong temperature.

## Assessment Signals

**Mastery gate**:
1. Student correctly calculates ΔG° from E° (or vice versa), with correct sign.
2. Student correctly calculates K from E° at 298 K.
3. Student correctly applies the Nernst equation to calculate E at non-standard Q.
4. Student correctly states that E° is intensive (doesn't change when equation is scaled) while ΔG° scales with n.

**FRAGILE signal**: student applies Nernst correctly numerically but cannot explain physically why E decreases as Q increases (no connection to the reaction becoming less favourable as products build up).

**MISCONCEIVING signal**: student gets a positive ΔG for a spontaneous cell (E > 0). Address MC-1 (negative sign in ΔG = −nFE) immediately.

## Tutor Recovery Strategy

If stuck:
1. For the sign in ΔG = −nFE: "Spontaneous cell: the reaction happens on its own → ΔG < 0. We measure E > 0 for this cell. We need ΔG = (something) × E = negative. That something must be negative: ΔG = −nFE. The minus sign is forced by thermodynamic logic."
2. For Nernst equation derivation: "Write ΔG = ΔG° + RT ln Q. Replace ΔG = −nFE and ΔG° = −nFE°. Divide through by −nF. That gives E = E° − (RT/nF) ln Q. Done."
3. For K from E°: "At equilibrium, E = 0 and Q = K. Substitute into the Nernst equation: 0 = E° − (RT/nF) ln K. Rearrange: ln K = nFE°/RT. If n = 2, T = 298, F = 96485, R = 8.314 → ln K = 2 × 96485 × E° / (8.314 × 298) = E° × 77.93."

## Memory Hooks

- **ΔG = −nFE. (Negative sign is non-negotiable. E > 0 → ΔG < 0 → spontaneous.)**
- **ΔG° = −nFE°. K from E°: ln K = nFE°/RT. At 298 K: E° = 0.05916/n × log₁₀ K.**
- **Nernst: E = E° − (RT/nF) ln Q. At 298 K: E = E° − (0.05916/n) log₁₀ Q.**
- **E° is intensive (doesn't scale). ΔG° = −nFE° is extensive (scales with n).**
- **(∂E/∂T)_P = ΔS/nF. Positive ΔS → EMF increases with T.**

## Transfer Connections

- **chem.elect.galvanic-cell**: the galvanic cell unlocked by this node uses E°, ΔG, and the Nernst equation as its quantitative framework — cell-thermo provides the theory; galvanic-cell provides the device-level application (half-cell potentials, salt bridges, standard electrode potentials).
- **chem.equil.concept**: the equilibrium constant K derived from E° is the same K that governs the equilibrium between Zn²⁺, Cu²⁺, Zn, and Cu — the electrochemical route to K is an alternative to the ΔG°/RT derivation, providing a second method for the same quantity.

## Cross-Subject Connections

- **Physics (electrical energy)**: nFE is the electrical energy formula (charge × voltage); this derivation is directly from physics; chemistry uses the thermodynamic interpretation (maximum work = −ΔG).
- **Environmental chemistry**: the thermodynamic driving force for corrosion reactions (Fe oxidation, E° > 0) and for electrochemical remediation of contaminated groundwater (reduction of Cr⁶⁺ or NO₃⁻) are computed from ΔG = −nFE.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.thermo.cell-thermo`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.thermo.cell-thermo` as of 2026-07-23.

## Curriculum Feedback

This concept is a bridge between thermodynamics (chem.thermo) and electrochemistry (chem.elect), with chem.elect.galvanic-cell as its single unlock. The prerequisite (chem.thermo.gibbs) is essential — students who cannot compute ΔG from ΔH and ΔS will be unable to connect to E through ΔG = −nFE. The temperature coefficient section (∂E/∂T = ΔS/nF) is genuinely proficient-level and often omitted at a developing level — it should be treated as an extension for students who have completed the Mastery Gate for this node.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
