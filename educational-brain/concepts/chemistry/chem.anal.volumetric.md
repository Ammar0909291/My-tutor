# Volumetric Analysis — `chem.anal.volumetric`

## Identity
- **KG ID**: chem.anal.volumetric
- **Subject**: chemistry
- **Domain**: chem.anal
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.found.concentration, chem.equil.titration, chem.redox.titrations
- **Unlocks**: (none — terminal node)

## Learning Objective
Perform calculations for acid-base, back, complexometric (EDTA), and argentometric titrations; select and justify the correct indicator or detection method for each titration type; identify and correct sources of systematic error in volumetric analysis.

## Core Understanding
**Volumetric analysis fundamentals**: a titrant of known concentration (standard solution) is added from a burette to a measured volume of analyte until the equivalence point is reached. The volume of titrant used, combined with its concentration and the stoichiometric ratio from the balanced equation, gives the amount of analyte.

**Primary and secondary standards**:
- PRIMARY standard: pure, stable, high molar mass, non-hygroscopic. Examples: Na₂CO₃, KIO₃, KH(IO₃)₂, anhydrous oxalic acid, KHP. Used to make standard solutions directly by dissolving a weighed mass in a known volume.
- SECONDARY standard: standardised against a primary standard (e.g. NaOH standardised against KHP; HCl against Na₂CO₃).

**Acid-base titrations**:
- Equivalence point: moles of acid = moles of base (adjusted for stoichiometry, e.g. 2 mol NaOH per mol H₂SO₄).
- Endpoint detection: indicator changes colour at the endpoint (ideally = equivalence point). Match indicator pKₐ to equivalence point pH: strong acid/strong base ≈ pH 7 (phenolphthalein or methyl orange both work); weak acid/strong base ≈ pH 8–9 (phenolphthalein); strong acid/weak base ≈ pH 5 (methyl orange); weak acid/weak base: no sharp equivalence point — not suitable for simple volumetric titration.
- Half-equivalence point: pH = pKₐ of weak acid (used to determine pKₐ from titration curve).

**Back titration**: used when (1) analyte reacts too slowly with titrant, (2) analyte is insoluble, (3) no suitable indicator exists for the direct titration, or (4) analyte is volatile. Add a known EXCESS of reagent A to the analyte → excess A is back-titrated with reagent B of known concentration. Amount of analyte = initial moles of A − moles of A that reacted with B. Example: determination of CaCO₃ purity by adding excess HCl, filtering, then back-titrating remaining HCl with NaOH.

**Complexometric titrations (EDTA)**:
- EDTA (ethylenediaminetetraacetic acid, H₄Y) is a hexadentate ligand that forms 1:1 complexes with almost all metal cations regardless of oxidation state.
- Titration requires pH control (buffer): Ca²⁺/Mg²⁺ at pH 10 (ammonia buffer); Cu²⁺ at pH 4.5; Zn²⁺ at pH 5–7.
- Indicators (metal ion indicators/metallochromic): Eriochrome Black T (EBT, Mg²⁺/Ca²⁺ at pH 10, wine-red → blue at endpoint); Murexide (Cu²⁺, yellow → violet at endpoint). Indicator must form a WEAKER complex with the metal than EDTA does, otherwise endpoint never reached.
- Water hardness: total hardness = Ca²⁺ + Mg²⁺ titrated with EDTA at pH 10 (EBT); Ca²⁺ alone at pH > 12 (Mg²⁺ precipitated as Mg(OH)₂, EBT cannot be used — use Patton-Reeder indicator or calcon).
- Calculation: n(M^n+) = n(EDTA) = c(EDTA) × V(EDTA); 1:1 always.

**Argentometric titrations** (precipitation with AgNO₃):
- **Mohr method**: Cl⁻ or Br⁻ titrated with AgNO₃ at pH 6–9. Indicator: K₂CrO₄ (forms brick-red Ag₂CrO₄ at endpoint, after all AgCl precipitated). Cannot be used for I⁻ (AgI precipitates preferentially, masking endpoint) or SCN⁻ or in acidic/alkaline media (CrO₄²⁻ protonation / Ag₂O precipitation). ANALYTE in flask.
- **Volhard method**: Ag⁺ titrated with KSCN (back-titration for halides: excess AgNO₃ added to halide, then back-titrate excess Ag⁺ with KSCN). Indicator: Fe³⁺ (forms blood-red [Fe(SCN)]²⁺ at endpoint). Works in ACID solution (avoids Fe(OH)₃). For Cl⁻ back-titration: filter off AgCl before back-titrating, or add nitrobenzene to coat AgCl (prevent AgCl dissolving in excess SCN⁻ → premature endpoint). TITRANT in burette.
- **Fajans method**: direct titration of Cl⁻/Br⁻/I⁻ with AgNO₃. Indicator: adsorption indicator (dichlorofluorescein, fluorescein). Before endpoint: AgCl particles adsorb Cl⁻ → net negative surface → repels anionic indicator. At endpoint: excess Ag⁺ makes surface positive → adsorbs indicator → colour change (yellow-green → pink). Requires colloidal (not coarse) precipitate — add dextrin to prevent coagulation.

## Mental Models
**The volumetric triangle**: every calculation has three vertices — moles of titrant, stoichiometric ratio, moles of analyte. The ratio is the bridge. For EDTA it is always 1:1 so the ratio disappears; for KMnO₄/Fe²⁺ it is 1:5; for Ag⁺/Cl⁻ it is 1:1. Write the balanced equation first, extract the ratio, then calculate.

**Indicator choice as a pH geography problem**: the equivalence-point pH is set by the chemistry of the reaction, not by choice. The indicator's pKₐ (and transition range) must overlap that pH. Using methyl orange (transition pH 3.1–4.4) for a weak acid/strong base titration (equivalence point pH 9) will give a completely wrong result — the indicator changes colour 4–5 pH units before the equivalence point.

## Why Students Fail
Students confuse the endpoint (indicator colour change) with the equivalence point (stoichiometric equivalence), and select indicators without considering the equivalence-point pH. They also forget to account for the 1:1 EDTA:metal ratio and apply wrong stoichiometry, or confuse Mohr (analyte in flask), Volhard (titrant in burette, back-titration), and Fajans (adsorption) without understanding what chemical property drives each choice.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Any indicator can be used for any titration — just use whatever the lab has." Probe: "A student uses phenolphthalein for a strong acid/weak base titration and claims the result is valid. Are they correct?" Characteristic phrase: "all indicators work the same." Intervention: phenolphthalein transitions at pH 8.2–10 (colourless to pink). For a strong acid/weak base titration, the equivalence-point pH is ≈ 5 (buffered toward the acid side by the resulting weak base salt). The phenolphthalein endpoint is reached far BEFORE the equivalence point — less titrant is consumed and the result is systematically low. Indicator pKₐ must match equivalence-point pH.
- **MC-2 (Type 4 — notation-induced)**: "In a back titration, the amount of analyte = moles of back-titrant." Probe: "25.0 cm³ of 0.100 mol dm⁻³ HCl was added to excess CaCO₃; the mixture was filtered and 10.0 cm³ of 0.100 mol dm⁻³ NaOH was required to neutralise the filtrate. Calculate the moles of CaCO₃ that reacted." Characteristic phrase: "use the NaOH directly." Intervention: moles of HCl added = 25.0 × 0.100/1000 = 0.00250 mol. Moles of HCl remaining (back-titrated by NaOH, 1:1) = 10.0 × 0.100/1000 = 0.00100 mol. Moles of HCl that reacted = 0.00250 − 0.00100 = 0.00150 mol. Since CaCO₃ + 2HCl, moles CaCO₃ = 0.00150/2 = 0.000750 mol. The NaOH volume gives the LEFTOVER acid, not the acid that reacted with the analyte.
- **MC-3 (Type 3 — language contamination)**: "The Volhard method titrates halides directly." Probe: "Describe the steps to determine [Cl⁻] by the Volhard method." Characteristic phrase: "add KSCN to the Cl⁻ solution and use Fe³⁺ indicator." Intervention: the Volhard method is a BACK TITRATION. For Cl⁻: (1) add a KNOWN EXCESS of AgNO₃ to precipitate AgCl; (2) FILTER or add nitrobenzene to coat AgCl; (3) back-titrate the EXCESS Ag⁺ with standard KSCN, using Fe³⁺ as indicator (red [FeSCN]²⁺ at endpoint). [Cl⁻] is calculated from: n(Cl⁻) = n(Ag⁺ added) − n(Ag⁺ remaining) = n(Ag⁺ added) − n(KSCN used). Titrating Cl⁻ DIRECTLY with KSCN is not possible — there is no reaction.

## Analogies
**Valid**: EDTA as a molecular handcuff — no matter which metal ion you present (Ca²⁺, Mg²⁺, Cu²⁺, Zn²⁺), EDTA snaps on all six of its arms simultaneously, forming a 1:1 cage complex. This is why every EDTA calculation has the same 1:1 ratio: one handcuff per prisoner, regardless of the prisoner's charge.

## Demonstrations
**Water hardness determination**: titrate a tap water sample vs. distilled water with EDTA at pH 10 (EBT indicator). Students see the vivid wine-red → blue endpoint and calculate water hardness in mg CaCO₃ dm⁻³. Extend by testing bottled water brands — gives immediate connection to real-world chemistry.

**Mohr titration of Cl⁻**: titrate a NaCl solution with AgNO₃ using K₂CrO₄ indicator. The brick-red Ag₂CrO₄ endpoint after a creamy AgCl precipitate is visually unambiguous. Students calculate [Cl⁻] and compare to the theoretical value.

## Discovery Questions
1. "A 0.250 g sample of impure Na₂CO₃ is dissolved and titrated with 0.100 mol dm⁻³ HCl, requiring 42.5 cm³ to reach the methyl orange endpoint. Calculate the percentage purity of the Na₂CO₃. (M = 106 g mol⁻¹.) State why phenolphthalein would give an incorrect result for this titration."
2. "A water sample is known to contain Ca²⁺ and Mg²⁺. Describe TWO separate EDTA titrations you would perform to find the concentration of EACH ion individually. State the pH of each titration, the indicator used, and explain why you cannot use EBT at very high pH."

## Teaching Sequence
1. Standard solutions: primary vs. secondary standards; making a standard solution (weigh, dissolve, make to mark in volumetric flask).
2. Acid-base titration: equivalence point vs. endpoint; matching indicator pKₐ to equivalence-point pH; four cases (SA/SB, WA/SB, SA/WB, WA/WB).
3. Back titration: when to use; calculation as subtraction (excess − leftover = reacted).
4. EDTA complexometric titration: hexadentate; 1:1 ratio always; pH control; metallochromic indicators; water hardness.
5. Argentometric: Mohr (K₂CrO₄), Volhard (Fe³⁺, back-titration, HNO₃ medium), Fajans (adsorption indicator); conditions and limitations.
6. Systematic errors: parallax in burette, washed vs. rinsed glassware, indicator blank, air bubbles.

## Tutor Actions
- **If student selects wrong indicator**: draw the titration curve, mark the equivalence point pH, show indicator transition range — ask "does your indicator change colour at the right pH?"
- **If student gets back titration wrong**: write out: moles added, moles leftover (from back-titration), moles reacted = added − leftover; then apply stoichiometry. Do this as a table, not a single equation.
- **FRAGILE sign**: can complete a simple acid-base calculation but cannot decide which indicator to use or explain why a back titration is needed.

## Voice Teaching Notes
The three argentometric methods are easily confused by name. Teach them by their DETECTION CHEMISTRY, not their names: one uses a coloured precipitate forming (Mohr → silver chromate); one uses a soluble coloured complex forming (Volhard → iron thiocyanate); one uses precipitate particles changing charge (Fajans → adsorption). Names are just labels — understanding comes from the chemistry.

## Assessment Signals
- **Green**: selects correct indicator by equivalence-point pH argument; performs back titration calculation correctly; states EDTA ratio is always 1:1; explains Mohr/Volhard/Fajans by chemical principle; identifies what makes a good primary standard.
- **Amber**: correct calculations for straightforward titrations but selects indicator by memory not argument; or confuses Mohr and Volhard procedures.
- **Red**: uses any indicator for any titration; adds analyte moles to back-titrant moles instead of subtracting; believes EDTA ratio varies with metal charge.
- **Probe**: "A 0.500 g sample of an alloy containing Cu is dissolved and the solution made to 250 cm³. A 25.0 cm³ aliquot is treated with excess KI, and the I₂ liberated is titrated with 18.4 cm³ of 0.0500 mol dm⁻³ Na₂S₂O₃. Calculate the percentage of Cu in the alloy. (2Cu²⁺ + 4I⁻ → 2CuI + I₂; I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻)"

## Tutor Recovery Strategy
If student cannot set up a back titration calculation: return to a simpler analogy — "you know you started with 10 sweets; you gave some away; 6 are left; how many did you give? 10−6=4. Back titrations are the same: you started with n(A) moles of reagent, n(B) moles are left (measured by back-titration), n(A)−n(B) reacted with the analyte." Once the subtraction logic is secure, apply stoichiometry.

## Memory Hooks
- **Indicator choice**: "Match indicator pKₐ to equivalence-point pH. WA/SB → phenolphthalein (pH 9). SA/WB → methyl orange (pH 5). SA/SB → either."
- **EDTA ratio**: "Always 1:1. Every metal, every charge."
- **Argentometric trilogy**: "Mohr = chromate precipitate. Volhard = thiocyanate complex (Fe³⁺), back-titration, acid. Fajans = adsorption indicator."
- **Back titration key**: "Added − leftover = reacted."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for analytical chemistry.

## Cross-Subject Connections
- **Pharmaceutical quality control**: EDTA titrations determine Ca²⁺ and Mg²⁺ levels in intravenous infusion fluids; argentometric titrations verify NaCl concentration in saline solutions. Back titrations are used when active pharmaceutical ingredients are insoluble or react incompletely under standard conditions.
- **Environmental chemistry**: EDTA water hardness titrations are the standard method (ISO 6059) for drinking water quality monitoring.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.anal.volumetric`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.anal.volumetric` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
