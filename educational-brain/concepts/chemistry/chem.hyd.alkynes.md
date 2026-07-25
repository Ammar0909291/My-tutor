# Alkynes — `chem.hyd.alkynes`

## Identity
- **KG ID**: chem.hyd.alkynes
- **Subject**: Chemistry
- **Domain**: Hydrocarbons (chem.hyd)
- **Prerequisites**: chem.hyd.alkenes
- **Difficulty**: advanced
- **Bloom level**: apply
- **Estimated hours**: 2

## Learning Objective
Describe the structure and bonding of alkynes (sp hybridisation, linear geometry, two π-bonds), predict the products of electrophilic addition reactions (HX, H₂, X₂, H₂O), explain Markovnikov selectivity for HX and H₂O addition to terminal alkynes, describe the acidity of terminal alkynes and the synthesis of alkynide ions, and connect alkynes to synthetic chain-extension strategies.

## Core Understanding
**Structure**: each carbon of the C≡C triple bond is sp-hybridised; the two sp orbitals are collinear (180° bond angle) giving a linear geometry; the remaining two p orbitals on each carbon (p_y and p_z) overlap side-on to form TWO mutually perpendicular π-bonds. The cylindrical π-electron density around the C≡C axis makes the triple bond MORE electron-rich than a double bond (higher HOMO energy per unit length) but the two π-bonds also make the triple bond difficult for bulky reagents to approach. **Physical properties**: nonpolar, similar solubility profile to alkenes; triple bond has slightly shorter C–C bond length (120 pm vs. 134 pm for alkene vs. 154 pm for alkane) and higher bond strength. **Terminal vs. internal alkynes**: a TERMINAL alkyne has a C≡C–H group at the end of the chain; the ≡C–H is an acidic hydrogen (pKₐ ~25, far more acidic than alkene ≡C–H at ~44 or alkane C–H at ~50) due to the high s-character of the sp orbital (50% s vs. 25% in sp³) — the negative charge on the carbon is held closer to the nucleus. This acidity allows: (1) deprotonation with NaNH₂ (sodamide, pKₐ NH₃ ≈ 38) or n-BuLi to give alkynide ions (RC≡C⁻); (2) alkynide ions are strong nucleophiles — they react with primary alkyl halides (SN2) or carbonyls (addition) to extend the carbon chain by the alkyne unit. **Electrophilic addition to alkynes**: SLOWER than to alkenes (vinyl carbocation intermediate is less stable than alkyl carbocation); Markovnikov's rule applies when adding to terminal alkynes; reactions proceed in two stages (first addition to alkene → vinyl intermediate; second addition to the resulting alkene). (1) **HX addition** (1 equiv): Markovnikov vinyl halide (X on more-substituted C); (2 equiv HX): geminal dihalide (both X on same C, Markovnikov ×2); (2) **X₂ addition** (Br₂): anti addition via cyclic bromonium analogue → trans-dibromoalkene; 2nd equiv Br₂ → tetrabromoalkane; (3) **Catalytic hydrogenation**: H₂ + Pt catalyst → full reduction to alkane; H₂ + Lindlar catalyst (Pd/CaCO₃/quinoline, partially poisoned) → cis-alkene (syn addition, stops at alkene); H₂ + Na/liq. NH₃ (Birch-type, dissolving metal reduction) → trans-alkene (anti addition via vinyl radical then carbanion intermediates); (4) **Hydration** (H₂O + H₂SO₄/HgSO₄ catalyst): Markovnikov addition → enol intermediate (vinyl alcohol) → IMMEDIATELY tautomerises to ketone (keto form more stable; enol → keto tautomerism); for terminal alkyne + H₂SO₄/HgSO₄: enol → METHYL KETONE (Markovnikov: OH on more substituted C = 2° → ketone). Special case: hydration of acetylene (HC≡CH) → acetaldehyde (CH₃CHO). Anti-Markovnikov hydration: hydroboration of alkyne (9-BBN, bulky borane) gives the ALDEHYDE (terminal aldehyde from terminal alkyne via anti-Markovnikov, via syn addition of B, then oxidation). **Summary of product decision**: Lindlar → cis-alkene; Na/NH₃ → trans-alkene; H₂/Pt → alkane; H₂SO₄/HgSO₄ + terminal alkyne → methyl ketone; hydroboration-oxidation of terminal alkyne → aldehyde.

## Mental Models
- **The two-π-bond cylinder**: visualise the alkyne triple bond as a cylinder of π-electron density (not two separate flat lobes like in alkene); electrophiles approach from the outside of the cylinder; the cylindrical symmetry means there is no one preferred face of attack — explaining why cyclic intermediates are less well-defined and overall addition is slower than with alkenes.
- **Acidity from s-character**: the more s-character in the C–H bond, the closer the electrons are to the nucleus when the bond breaks, and the more stable the carbanion formed. sp = 50% s → most acidic C–H; sp² = 25% s; sp³ = 25% s. Order: R–C≡C–H (pKₐ 25) > R–CH=CH₂ (pKₐ 44) > R–CH₂–CH₃ (pKₐ 50). This is why NaNH₂ (pKₐ ~38) deprotonates terminal alkynes but NOT alkenes.
- **Lindlar vs. Na/NH₃ = syn vs. anti hydrogenation**: Lindlar catalyst delivers both H from the catalyst surface (syn) → cis; dissolving metal adds one H at a time via radicals (anti) → trans. The two methods are NOT interchangeable — they give stereoisomers.

## Why Students Fail
- Predicting the wrong stereochemical product from partial hydrogenation — confusing Lindlar (cis) with Na/NH₃ (trans).
- Forgetting that hydration of a terminal alkyne gives a METHYL KETONE (not an aldehyde) due to Markovnikov; then forgetting the enol intermediate.
- Overlooking the two-stage nature of HX addition (1 equiv gives vinyl halide; 2 equiv gives geminal dihalide) and predicting the wrong product.

## Misconceptions
1. **"Lindlar catalyst gives the trans-alkene and Na/NH₃ gives the cis-alkene"** (Type 5 — instruction-induced: students mix up the two partial hydrogenation methods, perhaps because "Lindlar" sounds like a foreign/unfamiliar reagent while Na/NH₃ is the more dramatic-sounding reagent — some students invert the pairing).
   - Probe: "What is the product of treating but-2-yne with Lindlar's catalyst + H₂?"
   - Characteristic phrase: "Lindlar gives trans-but-2-ene because it blocks the second addition"
   - Intervention: Lindlar = partial Pd catalyst (quinoline poisoned) on CaCO₃; both H atoms are delivered from the catalyst SURFACE simultaneously (syn addition) → cis product (both H on same face). Na/liq. NH₃: dissolving metal → radical anion → proton from NH₃ → vinyl radical → proton → trans (anti addition, the second H approaches from the opposite face of the first). Memory hook: Lindlar = syn = cis.

2. **"Hydration of a terminal alkyne gives an aldehyde"** (Type 1 — overgeneralization from anti-Markovnikov hydroboration giving an aldehyde; students confuse the two hydration methods and predict aldehyde from both Markovnikov and anti-Markovnikov routes).
   - Probe: "What is the product of reacting hex-1-yne with dilute H₂SO₄ and HgSO₄ catalyst?"
   - Characteristic phrase: "the OH goes to the terminal C → hexanal" / "hydration always gives an aldehyde"
   - Intervention: H₂SO₄/HgSO₄ gives MARKOVNIKOV addition; the OH goes to the MORE SUBSTITUTED carbon (C-2 for a terminal alkyne); the enol tautomerises to the KETONE (hexan-2-one, a methyl ketone), not an aldehyde. To get an aldehyde from a terminal alkyne, use HYDROBORATION (9-BBN or disiamylborane) followed by H₂O₂/NaOH → anti-Markovnikov → terminal alcohol equivalent → aldehyde.

3. **"Terminal alkynes are not acidic because carbon-hydrogen bonds are not acidic"** (Type 3 — language contamination: "acidic" is mentally paired with O–H and N–H bonds; C–H is considered a non-acidic bond by default; students do not recognise the pKₐ ≈ 25 significance for sp carbon).
   - Probe: "Can NaNH₂ deprotonate a terminal alkyne? Write the equation."
   - Characteristic phrase: "NaNH₂ is a base but C–H bonds can't be deprotonated" / "only O–H and N–H bonds are acidic"
   - Intervention: RC≡CH has pKₐ ≈ 25; NH₃ has pKₐ ≈ 38 → the equilibrium favours deprotonation (ΔpKₐ = 13, K ≈ 10¹³). The alkynide ion RC≡C⁻ forms readily. Compare: n-BuLi (pKₐ butane ≈ 50) can deprotonate terminal alkynes; NaOH (pKₐ water = 15.7) cannot (pKₐ of alkyne > pKₐ of water → NaOH too weak). This is a useful acid-base reasoning exercise.

## Analogies
- **Good**: the Lindlar/Na·NH₃ contrast is like two ways to apply a stamp to paper: Lindlar presses both ink pads (both H) onto the same face at once (syn → cis); Na·NH₃ applies one pad, flips the paper, applies the second (anti → trans). Same result (alkene) but opposite faces.
- **Anti-analogy**: Do NOT say "alkynes react just like alkenes but twice" — the rate of addition is different (slower for alkynes), the intermediate is different (vinyl vs. alkyl carbocation), and the two-stage addition creates genuinely distinct intermediate products that can be isolated. Alkynes are their own reaction class.

## Demonstrations
- **Acetylene generation**: add CaC₂ (calcium carbide) to water → acetylene gas (HC≡CH) produced; ignite carefully (produces a bright luminous flame, used in oxy-acetylene welding). The reaction is: CaC₂ + 2H₂O → Ca(OH)₂ + C₂H₂. Shows: terminal alkyne; exothermic; industrial acetylene production.
- **Br₂ decolorisation test**: Br₂/CCl₄ (brown) decolourises rapidly with a terminal alkyne (first equivalent anti addition to vinyl dibromide; second gives tetrabromoalkane). Compare with alkene: both decolourise Br₂, showing the similar electrophilic addition reactivity.

## Discovery Questions
1. Predict the stereochemistry of the product when 2-butyne is partially hydrogenated with (a) Lindlar catalyst; (b) Na in liquid ammonia.
2. What product forms when propyne reacts with (a) excess HBr; (b) H₂SO₄/HgSO₄ in H₂O; (c) NaNH₂ then CH₃Br?
3. Show how you would use a terminal alkyne to add 3 carbon units to a primary alkyl halide chain (i.e., combine a 1-carbon terminal alkyne with a 2-carbon primary halide to make a 3-carbon chain).
4. Why is acetylene (HC≡CH) more acidic than ethylene (H₂C=CH₂)? Use orbital hybridisation to explain.

## Teaching Sequence
1. **Structure**: sp hybridisation; 180° linear geometry; two perpendicular π-bonds; cylinder of π-density.
2. **Nomenclature**: IUPAC "-yne" suffix; terminal vs. internal alkynes.
3. **Acidity of terminal alkynes**: pKₐ ≈ 25; s-character argument; comparison to alkene (pKₐ 44) and alkane (pKₐ 50); deprotonation with NaNH₂.
4. **Alkynide ions as nucleophiles**: SN2 with primary halides; chain extension strategy.
5. **Electrophilic addition of HX**: 1 equiv → vinyl halide (Markovnikov); 2 equiv → geminal dihalide.
6. **Halogenation (Br₂)**: anti addition; 1 vs. 2 equiv.
7. **Partial hydrogenation**: Lindlar → cis (syn); Na/NH₃ → trans (anti); full H₂/Pt → alkane.
8. **Hydration**: H₂SO₄/HgSO₄ → enol → methyl ketone (Markovnikov for terminal); hydroboration-oxidation → aldehyde (anti-Markovnikov).
9. **Summary table**: all reactions, conditions, regio- and stereoselectivity.

## Tutor Actions
- **If Lindlar/Na·NH₃ confusion**: ask "how many H atoms arrive at once in each case?" — Lindlar: both simultaneously from surface (syn → cis); Na·NH₃: one at a time via radical (anti → trans).
- **If hydration gives wrong product**: ask "which C does OH attach to under Markovnikov conditions?" → the more substituted C (C-2 for terminal); "is the immediate product an alcohol or an enol?" — enol; "what is the enol's stable tautomer?" — ketone.
- **If alkyne acidity denied**: ask "what is the pKₐ of a terminal alkyne?" → 25; "what is the pKₐ of NH₃?" → 38; "can a base of pKₐ 38 deprotonate an acid of pKₐ 25?" — yes, ΔpKₐ > 0 → equilibrium favours deprotonation.

## Voice Teaching Notes
- "Lindlar = syn = cis. Na/NH₃ = anti = trans. These are the two partial hydrogenation rules. State them before every stereochemistry problem on alkynes."
- "Hydration of terminal alkyne under Markovnikov conditions → methyl ketone (not aldehyde). The enol is just a passing intermediate."
- "Terminal alkyne pKₐ = 25 — it IS acidic enough to be deprotonated by NaNH₂ (pKₐ 38) or RLi. C–H CAN be acidic when the carbon is sp."

## Assessment Signals
- **Green**: correctly predicts cis from Lindlar and trans from Na/NH₃; correctly predicts methyl ketone (not aldehyde) from Markovnikov hydration of a terminal alkyne; deprotonates terminal alkyne with NaNH₂ and uses the alkynide for SN2 chain extension.
- **Amber**: correct regiochemistry but wrong stereochemistry for partial hydrogenation; knows hydration gives a carbonyl but cannot distinguish ketone vs. aldehyde outcome.
- **Red**: inverts Lindlar/Na·NH₃ stereochemistry; predicts aldehyde from H₂SO₄/HgSO₄ hydration of terminal alkyne; denies that terminal alkynes are acidic.

## Tutor Recovery Strategy
- Lindlar/Na·NH₃ inversion: draw a Newman projection of the alkene being formed; label which face each H arrives on in each method; cis = same face = syn = Lindlar; trans = opposite faces = anti = Na/NH₃.
- Ketone vs. aldehyde confusion: always pass through the enol intermediate; draw the enol explicitly (OH on C-2 for a terminal alkyne); then tautomerise to the ketone. The enol → keto tautomerism is the step that determines the final product class.
- Acidity denial: do the pKₐ arithmetic out loud — "25 minus 38 = −13; negative means acid is stronger than conjugate acid of the base; therefore the base WINS and deprotonation occurs."

## Memory Hooks
- **sp → 50% s-character → pKₐ ≈ 25 (terminal alkyne is acidic C–H)**
- **Lindlar = SYN = CIS; Na/NH₃ = ANTI = TRANS**
- **H₂SO₄/HgSO₄ + terminal alkyne → enol → METHYL KETONE (Markovnikov)**
- **Hydroboration of alkyne → ALDEHYDE (anti-Markovnikov)**
- **Alkynide (RC≡C⁻) = nucleophile for SN2 chain extension**
- **1 equiv HX → vinyl halide; 2 equiv HX → geminal dihalide**

## Transfer Connections
- **Alkene chemistry** (chem.hyd.alkenes): all the electrophilic addition reactions of alkenes carry over to alkynes with the added complexity of two-stage addition and the possibility of stopping at the vinyl/alkene stage. Alkynes are a downstream application of alkene reaction logic.
- **Grignard and organolithium** (chem.hal.grignard): alkynide ions (RC≡C⁻) from terminal alkynes are strong nucleophiles; they add to carbonyl compounds to give propargylic alcohols — a key chain-extension strategy in synthesis.
- **Acidity and pKₐ** (chem.acid.proton-transfer): the acidity argument for terminal alkynes (s-character) is a direct application of pKₐ reasoning and the relationship between orbital hybridisation and electron-pair stability.
- **Tautomerism** (chem.carb.ketones): enol–keto tautomerism is the final step in alkyne hydration; the concept that enol and keto forms interconvert and that the keto form is thermodynamically favoured connects to carbonyl chemistry.

## Cross-Subject Connections
- **Biology**: the terminal alkyne group is used in bioorthogonal chemistry (click chemistry) — an azide and an alkyne react in a [3+2] cycloaddition to label biomolecules inside living cells without disrupting normal chemistry; this relies on the alkyne's relative inertness toward biological nucleophiles while reacting selectively with azides.
- **Materials**: polyynes (carbon chains with multiple triple bonds) are studied as components of molecular wires and as precursors to carbon allotropes; carbyne (a hypothetical all-carbon chain of triple bonds) is the linear analogue of graphene/fullerene.
- **Industry**: acetylene is one of the most important industrial chemicals — used in oxy-acetylene welding/cutting and as a feedstock for vinyl chloride (from HCl addition), vinyl acetate, and acrylonitrile production.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.hyd.alkynes`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.hyd.alkynes` as of 2026-07-23.

## Curriculum Feedback
- The enol–keto tautomerism that is introduced in alkyne hydration is a major topic in its own right (it underpins the Claisen condensation, keto-enol equilibria in biology, and alpha-halogenation of carbonyl compounds); a KG cross-link from chem.hyd.alkynes to whatever chem.carb node covers tautomerism would help students see the connection.
- The Lindlar/Na·NH₃ stereochemistry contrast is consistently the highest-difficulty point on this concept; a dedicated stereochemical comparison problem (with Newman projections for both) in the assessment bank would significantly improve diagnostic quality.

## Version History
- v1.0.0 — 2026-07-24 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
