# Solubility Equilibria — `chem.equil.solubility`

## Identity

- **KG ID**: chem.equil.solubility
- **Subject**: Chemistry
- **Domain**: Chemical Equilibrium (chem.equil)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.equil.kc-kp
- **Unlocks**: chem.anal.gravimetric
- **Cross-links**: none

## Learning Objective

Students can write Ksp expressions for sparingly soluble salts; interconvert Ksp and molar solubility; predict precipitation using the ionic product Q; explain and apply the common ion effect; and determine conditions for selective precipitation.

## Core Understanding

**Solubility product Ksp**:
For a sparingly soluble salt dissolving: MₓAᵧ(s) ⇌ x M^(y+)(aq) + y A^(x−)(aq)
Ksp = [M^(y+)]^x × [A^(x−)]^y

The solid is excluded (pure solid, activity = 1). Ksp is a constant at fixed temperature.

Examples:
- AgCl(s) ⇌ Ag⁺ + Cl⁻:  Ksp = [Ag⁺][Cl⁻]
- Ag₂CrO₄(s) ⇌ 2Ag⁺ + CrO₄²⁻:  Ksp = [Ag⁺]²[CrO₄²⁻]
- Ca₃(PO₄)₂(s) ⇌ 3Ca²⁺ + 2PO₄³⁻:  Ksp = [Ca²⁺]³[PO₄³⁻]²

**Converting Ksp to molar solubility**:
Define s = molar solubility of the salt (mol/L dissolved). For AgCl: [Ag⁺] = s, [Cl⁻] = s → Ksp = s². For Ag₂CrO₄: [Ag⁺] = 2s, [CrO₄²⁻] = s → Ksp = (2s)²(s) = 4s³.

Important: comparing solubilities using Ksp alone is ONLY valid for salts with the same formula type (same stoichiometry). AgCl (Ksp = 1.8 × 10⁻¹⁰) is more soluble than Ag₂CrO₄ (Ksp = 1.1 × 10⁻¹²) only because both are 1:1 in ions. Different formula types require converting to s first.

**Predicting precipitation — ionic product Q**:
Q_sp = [M^(y+)]^x × [A^(x−)]^y (same expression as Ksp, but using current, non-equilibrium concentrations after mixing)
- Q_sp < Ksp: solution is unsaturated; no precipitate; more solid can dissolve.
- Q_sp = Ksp: solution is exactly saturated; equilibrium.
- Q_sp > Ksp: solution is supersaturated; precipitate forms until Q_sp = Ksp.

**Common ion effect**:
Dissolving AgCl in a solution already containing Cl⁻ (e.g., 0.10 M NaCl):
Ksp = [Ag⁺][Cl⁻] = [Ag⁺](0.10 + s) ≈ [Ag⁺](0.10)  [if s << 0.10]
[Ag⁺] = Ksp/0.10 = 1.8 × 10⁻¹⁰ / 0.10 = 1.8 × 10⁻⁹ M

Much less soluble than in pure water (where s = 1.34 × 10⁻⁵ M). The presence of a common ion reduces solubility — a direct Le Chatelier consequence (adding Cl⁻ product shifts dissolution equilibrium in reverse).

**Selective precipitation**:
When two ions in solution both form precipitates with a common reagent, selective precipitation uses the difference in Ksp values to precipitate one ion while keeping the other in solution. The ion with the SMALLER Ksp precipitates FIRST (requires lower reagent concentration to initiate). Selective precipitation is complete when [ion to be precipitated]remaining < 0.1% of initial, typically controlled by controlling the concentration of precipitating reagent.

## Mental Models

**The saturated-solution equilibrium model**: Ksp is the equilibrium constant for the dissolution process. In a saturated solution, the rate of dissolution = rate of crystallisation. Adding a common ion shifts the equilibrium toward crystallisation (Le Chatelier reverse) — the solution is no longer at Ksp for the original conditions; ions precipitate until the new lower Ksp-compatible concentrations are reached.

**The Q-Ksp compass model**: Q_sp tells you where you are; Ksp tells you where equilibrium is. If Q_sp > Ksp, you've overshot — precipitate forms to bring you back. If Q_sp < Ksp, you haven't reached equilibrium — solid (if present) dissolves to bring you forward. If Q_sp = Ksp, you're exactly at equilibrium.

## Why Students Fail

1. **Comparing Ksp values across different formula types**: students compare Ksp numbers directly to rank solubility without converting to s. Ag₂CrO₄ has a smaller Ksp than AgCl but is NOT less soluble by a factor of 10 — the 4s³ vs. s² expressions change the conversion entirely.
2. **Forgetting to double ion concentration in Ksp expression**: for Ag₂CrO₄: [Ag⁺] = 2s, not s. Students write Ksp = s²·s = s³ instead of (2s)²·s = 4s³.
3. **Applying common ion effect with incorrect algebra**: students set up [Cl⁻] = s (ignoring the pre-existing 0.10 M) instead of [Cl⁻] = 0.10 + s ≈ 0.10.
4. **Q_sp uses equilibrium concentrations**: students compute Q_sp using concentrations after equilibration (same as Ksp by definition), rather than immediately after mixing.

## Misconceptions

**MC-1 — Larger Ksp always means greater molar solubility** (Type 1, overgeneralization to different formula types)
- *Mechanism*: students see Ksp as a direct measure of solubility; larger Ksp → dissolves more. This is true only within the same formula type.
- *Diagnostic probe*: "AgCl has Ksp = 1.8 × 10⁻¹⁰. Ag₂CrO₄ has Ksp = 1.1 × 10⁻¹². Which has the greater molar solubility?"
- *Characteristic phrase*: "AgCl is more soluble because its Ksp is larger."
- *Repair*: convert both to s. AgCl: s = √(1.8 × 10⁻¹⁰) = 1.34 × 10⁻⁵ M. Ag₂CrO₄: 4s³ = 1.1 × 10⁻¹²; s = (1.1 × 10⁻¹²/4)^(1/3) = (2.75 × 10⁻¹³)^(1/3) = 6.5 × 10⁻⁵ M. Ag₂CrO₄ is MORE soluble (6.5 × 10⁻⁵ > 1.34 × 10⁻⁵) despite having a SMALLER Ksp. The 4s³ formula type makes the difference.

**MC-2 — [Ag⁺] = s in the Ksp for Ag₂CrO₄** (Type 5, instruction-induced from 1:1 salt template)
- *Mechanism*: students first learn AgCl where [Ag⁺] = s and [Cl⁻] = s, then apply the same pattern to Ag₂CrO₄ where the stoichiometry is 2:1.
- *Diagnostic probe*: "Write the Ksp expression for Ag₂CrO₄ and express Ksp in terms of s."
- *Characteristic phrase*: "Ksp = s × s = s² (for Ag₂CrO₄)."
- *Repair*: Ag₂CrO₄ → 2Ag⁺ + CrO₄²⁻. For each formula unit that dissolves, 2 moles of Ag⁺ and 1 mole of CrO₄²⁻ are released. If s mol/L dissolves: [Ag⁺] = 2s, [CrO₄²⁻] = s. Ksp = (2s)²(s) = 4s³. The stoichiometry from the balanced equation MUST be applied.

**MC-3 — Q_sp is computed using post-equilibrium concentrations** (Type 5, instruction-induced confusion between Q and K)
- *Mechanism*: students have learned Q and K and know Q = K at equilibrium; they confuse the timing — Q must be computed immediately after mixing, BEFORE the system re-equilibrates.
- *Diagnostic probe*: "50 mL of 2.0 × 10⁻⁴ M AgNO₃ is mixed with 50 mL of 2.0 × 10⁻⁴ M NaCl. Will a precipitate form? (Ksp(AgCl) = 1.8 × 10⁻¹⁰)"
- *Characteristic phrase*: "I calculated the equilibrium concentrations first, then checked if Q > Ksp."
- *Repair*: Q_sp must use concentrations IMMEDIATELY after mixing (before any reaction). After mixing: [Ag⁺] = [Cl⁻] = 1.0 × 10⁻⁴ M (diluted by factor 2). Q_sp = (1.0 × 10⁻⁴)² = 1.0 × 10⁻⁸. Q_sp (10⁻⁸) > Ksp (1.8 × 10⁻¹⁰) → precipitate forms. The question is: do the initial (just-mixed) concentrations exceed what the saturated solution can hold? Not what happens after equilibration.

## Analogies

**The parking lot analogy for Ksp**: a parking lot has a maximum occupancy (Ksp). If cars (ions) arrive below the limit (Q < Ksp), all park — unsaturated solution. If they arrive at exactly the limit (Q = Ksp), the lot is full. If more arrive (Q > Ksp), the overflow is redirected elsewhere (precipitate forms) until exactly the right number remain parked.

**The common ion analogy as a pre-parked car**: dissolving AgCl in 0.10 M NaCl means 0.10 M of the lot's spaces are already taken by Cl⁻ (pre-parked). Ag⁺ can fill fewer spaces — only 1.8 × 10⁻⁹ M's worth — before the lot hits capacity (Ksp).

## Demonstrations

**Demonstration 1 — Common ion effect with AgCl**
- Dissolve AgCl in pure water; measure turbidity (saturated clear solution). Add concentrated NaCl: AgCl precipitates (common ion reduces solubility). Then add concentrated NH₃: AgCl re-dissolves as [Ag(NH₃)₂]⁺ complex forms (competition equilibrium from chem.equil.complex-equil, if already taught). The three stages illustrate Ksp, common ion effect, and complex equilibrium as one sequential demonstration.

## Discovery Questions

1. "Calculate the molar solubility of Ca₃(PO₄)₂ (Ksp = 2.1 × 10⁻³³) in pure water." (Targets: Ca₃(PO₄)₂ → 3Ca²⁺ + 2PO₄³⁻. [Ca²⁺] = 3s, [PO₄³⁻] = 2s. Ksp = (3s)³(2s)² = 27s³ × 4s² = 108s⁵. s⁵ = 2.1 × 10⁻³³/108 = 1.94 × 10⁻³⁵. s = (1.94 × 10⁻³⁵)^(1/5) = 6.9 × 10⁻⁷ M.)
2. "Will BaSO₄ precipitate when 100 mL of 0.010 M BaCl₂ is mixed with 100 mL of 0.0030 M Na₂SO₄? (Ksp(BaSO₄) = 1.1 × 10⁻¹⁰)" (Targets: after mixing, [Ba²⁺] = 0.0050 M, [SO₄²⁻] = 0.0015 M. Q_sp = (0.0050)(0.0015) = 7.5 × 10⁻⁶. Q_sp >> Ksp (10⁻¹⁰) → precipitate forms.)
3. "The molar solubility of AgBr in pure water is 7.1 × 10⁻⁷ M. Calculate the molar solubility of AgBr in 0.10 M NaBr." (Targets: pure water: Ksp = s² = (7.1 × 10⁻⁷)² = 5.0 × 10⁻¹³. In 0.10 M NaBr: [Ag⁺] = s, [Br⁻] = 0.10 + s ≈ 0.10. Ksp = s × 0.10 = 5.0 × 10⁻¹³. s = 5.0 × 10⁻¹² M. Common ion reduces solubility by a factor of ~142,000.)

## Teaching Sequence

1. Review from chem.equil.kc-kp: Kc expression; exclude pure solids; ICE tables; Q vs K.
2. Define Ksp: write dissolution equilibrium for AgCl; exclude solid; write Ksp = [Ag⁺][Cl⁻].
3. Convert Ksp to s: 1:1 type (AgCl), then 2:1 type (Ag₂CrO₄). Address MC-2 (2s for Ag⁺).
4. Compare solubilities across formula types. Address MC-1. Work part of Discovery Question 1.
5. Q_sp → precipitate prediction. Address MC-3 (use initial concentrations after mixing). Work Discovery Question 2.
6. Common ion effect: algebraic setup with pre-existing ion concentration. Le Chatelier interpretation. Work Discovery Question 3.
7. Selective precipitation (brief): order of precipitation by Ksp magnitude; qualitative only unless time allows.

## Tutor Actions

- If student compares Ksp directly to rank solubility across formula types → MC-1 repair: convert to s for each; show Ag₂CrO₄ is more soluble despite smaller Ksp.
- If student writes [Ag⁺] = s for Ag₂CrO₄ → MC-2 repair: balanced equation gives 2Ag⁺ per formula unit; [Ag⁺] = 2s; Ksp = 4s³.
- If student computes Q from equilibrium concentrations → MC-3 repair: Q is computed from concentrations immediately after mixing (before reaction), not after equilibration.
- Advance when student can set up Ksp expressions for any salt, convert to s, compute Q and predict precipitation, and apply common ion effect algebra.

## Voice Teaching Notes

"Before writing Ksp in terms of s: look at the stoichiometry. How many of each ion does one formula unit give? That's the coefficient, and the coefficient becomes the multiplier of s — AND appears as the exponent in Ksp. Do this for every salt before any calculation."

For Q: "Q uses mixing concentrations, not equilibrium concentrations. Dilute first. Then compute Q. Then compare to Ksp."

## Assessment Signals

**Mastery gate**:
1. Student correctly writes Ksp for any salt (excluding solid; correct exponents from stoichiometry).
2. Student correctly converts Ksp to s with proper stoichiometric multipliers (2s, 3s, etc.).
3. Student correctly computes Q_sp from initial concentrations after mixing and predicts precipitation.
4. Student correctly sets up the common ion effect algebraic problem.

**FRAGILE signal**: student correctly calculates s from Ksp but cannot explain why the common ion reduces solubility using Le Chatelier logic (arithmetic correct, physical interpretation absent).

**MISCONCEIVING signal**: student compares Ksp directly across different formula types. Address MC-1 before any multi-salt comparison problem.

## Tutor Recovery Strategy

If stuck:
1. For stoichiometric multipliers: "Write out the dissolution: Ag₂CrO₄ → Ag⁺ + Ag⁺ + CrO₄²⁻. Count: 2 Ag⁺ and 1 CrO₄²⁻. If s mol/L dissolves: Ag⁺ appears twice → [Ag⁺] = 2s. Write Ksp = [Ag⁺]²[CrO₄²⁻] = (2s)²(s) = 4s³."
2. For Q_sp approach: "Immediately after mixing (time = 0): nothing has precipitated yet. Concentrations are just the diluted values. Compute Q from those. If Q > Ksp, precipitation will occur (hasn't yet). If Q < Ksp, no precipitation."
3. For common ion: "Ksp = [Ag⁺][Cl⁻]. In 0.10 M NaCl: [Cl⁻] = 0.10 (from NaCl, before any AgCl dissolves). When AgCl dissolves, [Ag⁺] = s, [Cl⁻] = 0.10 + s ≈ 0.10. Substitute: Ksp = s × 0.10. Solve for s."

## Memory Hooks

- **Ksp = [cations]^a × [anions]^b with stoichiometric exponents. Solid excluded.**
- **s = molar solubility. [M^y+] = ys, [A^x-] = xs. Always match stoichiometry.**
- **Q_sp > Ksp → precipitate. Q_sp < Ksp → dissolves. Q uses initial (mixing) concentrations.**
- **Common ion → shifts dissolution equilibrium reverse → reduced solubility. [common ion] >> s → approximate.**
- **Comparing solubility across formula types: convert to s first. Never compare raw Ksp values of different types.**

## Transfer Connections

- **chem.anal.gravimetric**: gravimetric analysis uses selective precipitation to isolate an analyte quantitatively; Ksp values determine the precipitation conditions and the completeness of precipitation — this node's Q_sp framework is the quantitative foundation.
- **chem.equil.complex-equil**: the competition between precipitation (Ksp) and complex ion formation (Kf) is a direct application of the solubility equilibrium framework combined with formation constants; the net K = Ksp × Kf determines whether adding ligand dissolves the precipitate.

## Cross-Subject Connections

- **Biology (biomineralisation)**: bones and teeth are calcium phosphate (hydroxyapatite), a sparingly soluble salt. The Ksp framework governs mineralisation and demineralisation — acid conditions lower pH, which raises [H⁺] and converts PO₄³⁻ to HPO₄²⁻, reducing [PO₄³⁻] below equilibrium, dissolving the mineral matrix (dental caries). Fluoride therapy shifts the equilibrium back.
- **Environmental science (water hardness)**: hard water contains Ca²⁺ and Mg²⁺. Water softening by precipitation (adding Na₂CO₃ or Ca(OH)₂ to precipitate CaCO₃/Mg(OH)₂) uses the Q_sp > Ksp framework. Scaling in pipes is supersaturation of CaCO₃.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.equil.solubility`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.equil.solubility` as of 2026-07-23.

## Curriculum Feedback

The 0.80 mastery threshold is appropriate for this computation-heavy node — solubility calculations are a frequently examined skill requiring reliable execution of the stoichiometric multiplier rule. The three misconceptions here (Ksp comparison, stoichiometric multipliers, Q_sp timing) are the three most common sources of calculation errors; they should be explicitly tested in assessment before any multi-step problem. The selective precipitation content is listed in the KG description and is correctly scoped here as qualitative; a full quantitative treatment belongs in an analytical chemistry follow-up.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
