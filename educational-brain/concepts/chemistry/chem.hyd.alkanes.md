# Alkanes — `chem.hyd.alkanes`

## Identity
- **KG ID**: chem.hyd.alkanes
- **Subject**: chemistry
- **Domain**: chem.hyd
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.org.iupac, chem.org.hybridization
- **Unlocks**: (none — terminal node)

## Learning Objective
Name and draw straight-chain and branched alkanes using IUPAC rules; explain sp³ hybridisation in alkanes; describe conformational isomerism in ethane (Newman projections); explain ring strain in cycloalkanes; write the mechanism for free-radical halogenation (initiation, propagation, termination); and predict the relative selectivity of halogenation at primary, secondary, and tertiary carbon centres.

## Core Understanding
**Alkane structure**:
- General formula: C_nH_{2n+2} (acyclic alkanes).
- All carbon atoms are sp³ hybridised: tetrahedral, bond angles ≈109.5°, all C–C and C–H bonds are σ bonds, NO π bonds.
- Free rotation around C–C single bonds (rotation does not break the σ bond — the π overlap of double bonds would break, but σ bonds are cylindrically symmetric around the internuclear axis → no π to break).

**IUPAC nomenclature (recap and application to alkanes)**:
- Parent chain: longest continuous carbon chain.
- Number from the end that gives substituents the LOWEST locants.
- Substituents (alkyl groups): methyl, ethyl, propyl, isopropyl, butyl, isobutyl, sec-butyl, tert-butyl. Branched substituents use parentheses: 3-(1-methylethyl)hexane = 3-isopropylhexane.
- Multiple identical substituents: di-, tri-, tetra- prefixes.
- Cycloalkanes: prefix cyclo-; cyclopropane, cyclobutane, cyclopentane, cyclohexane.

**Conformational analysis (ethane)**:
- Newman projection: view down the C–C bond; front carbon as dot + 3 bonds; rear carbon as circle + 3 bonds.
- STAGGERED conformation: dihedral angle H–C–C–H = 60°; maximum separation of bonding electrons; lowest energy.
- ECLIPSED conformation: dihedral angle H–C–C–H = 0°; bonding pairs on front and rear carbons are closest; highest energy.
- Energy difference staggered vs. eclipsed ethane ≈ 12 kJ/mol (torsional strain = eclipsing strain).
- In butane: additional GAUCHE and ANTI conformations; anti (dihedral CH₃–C–C–CH₃ = 180°) is most stable; gauche (60°) is higher (van der Waals repulsion between methyl groups). Anti < gauche < eclipsed: quantitative energy differences.

**Ring strain in cycloalkanes (Baeyer strain theory)**:
- An sp³ C has ideal bond angles of 109.5°. Cyclopropane (60°) and cyclobutane (88°) have significant ANGLE STRAIN (bonds forced to deviate from the ideal angle → weakened, higher energy → more reactive).
- Cyclopentane (108°) — nearly strain-free; cyclohexane (chair conformation, all angles ≈111°, effectively strain-free via puckering).
- CYCLOHEXANE CHAIR: all C are sp³ at effective 111°; bonds occupy AXIAL (vertical) and EQUATORIAL (near-horizontal) positions. Chair flip interconverts the two chair conformations (axial ↔ equatorial); large substituents prefer EQUATORIAL (minimises 1,3-diaxial interactions).
- Transannular strain (medium rings, 8–11 carbon) — atoms across the ring interact unfavourably.

**Physical properties of alkanes**:
- Non-polar → only LONDON DISPERSION forces → low boiling points for short chains (CH₄, C₂H₆ gaseous at room temperature); bp increases with chain length (more electrons, more surface area).
- Branching LOWERS bp (less surface area, fewer London contacts): neopentane bp 9.5°C < n-pentane bp 36°C.
- Insoluble in water ("like dissolves like"); soluble in non-polar organic solvents.
- Combustion: complete combustion → CO₂ + H₂O; large negative ΔH_combustion per mole (increases with C_n). Incomplete combustion → CO + soot.

**Free-radical halogenation mechanism**:
Reaction: R–H + X₂ → R–X + H–X (where X = Cl or Br)
Conditions: UV light (hν) or high temperature (Δ) — provides energy to initiate.

**Initiation**: X₂ + hν → 2 X• (homolytic cleavage; each atom gets one electron; radical = species with an unpaired electron).

**Propagation (chain reaction — these two steps repeat)**:
1. X• + R–H → H–X + R• (abstraction of H from substrate; X• is consumed, R• is produced)
2. R• + X₂ → R–X + X• (new X• is produced, product formed; the cycle continues)

**Termination** (multiple pathways, all combine two radicals):
- X• + X• → X₂
- R• + X• → R–X (also a product!)
- R• + R• → R–R (coupling byproduct)

**Selectivity (Cl vs. Br)**:
- Free radical stability order: tertiary (3°) > secondary (2°) > primary (1°) > methyl. Tertiary C–H bonds are weakest (BDE 3° < 2° < 1°); tertiary radicals are most stable.
- CHLORINATION: mildly selective (3°:2°:1° ≈ 5:4:1 per H — not dramatically different); Cl• is very reactive → low activation energy for H-abstraction → EARLY transition state (Hammond postulate: early TS resembles reactants → radical stability differences have less effect on rate).
- BROMINATION: highly selective (3°:2°:1° ≈ 1600:80:1 per H); Br• is less reactive → HIGH activation energy → LATE transition state resembling the radical product → radical stability matters greatly.
- Memory rule: "Chlorine is indiscriminate; bromine is selective." When selectivity is required (e.g. single product from alkane halogenation), use bromine.

## Mental Models
**Free-radical chain as a factory conveyor belt**: initiation starts the belt; propagation runs it continuously (Cl• produces R•, R• produces Cl•, repeating thousands of times per initiation event); termination stops individual belts by combining two radical workers. The product comes off the belt in propagation step 2, not in initiation.

**Selectivity as activation energy sensitivity**: imagine choosing between three doors (1°, 2°, 3°) — Cl• is in a hurry and tries all doors almost equally fast; Br• is cautious and will only open the easiest door (the most stable radical is at the lowest-energy door, and since Br• is slower, it's more selective about which door it tries).

## Why Students Fail
Students confuse the three stages of the mechanism (initiation/propagation/termination), often writing X₂ → X–X as a termination step (that's the reverse of initiation, not a new reaction). They also apply the wrong selectivity — claiming chlorination is more selective than bromination, reversing the correct order. The conformational analysis concepts (axial/equatorial, Newman projections) are understandably challenging when students lack 3D visualisation skills.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "In the mechanism, the radical product R–X is formed in the initiation step." Probe: "Which step of the free-radical chain mechanism actually forms the product R–X?" Characteristic phrase: "initiation gives the product." Intervention: INITIATION only breaks X–X to give X• radicals — no product yet, and the substrate is not involved at all. The organic product R–X is formed in the SECOND PROPAGATION STEP (R• + X₂ → R–X + X•). Initiation is merely the match that lights the fuse; propagation is the actual reaction. This is why a single photon can initiate a chain reaction that produces millions of product molecules.
- **MC-2 (Type 2 — perceptual intuition)**: "Chlorination is more selective than bromination because Cl is more electronegative and more 'choosy' about bonds." Probe: "Which gives a more product distribution of isomers: monochlorination or monobromination of butane?" Characteristic phrase: "chlorine is more reactive and selective." Intervention: BROMINE is more selective, not chlorine. The reason is kinetic: Br• is LESS reactive (the Br–H bond is weaker than Cl–H → H-abstraction by Br• is endothermic → late, product-like TS → TS energy differences reflect product stability → highly selective). Cl• IS more reactive (Cl–H bond stronger → abstraction exothermic → early TS → all C–H bonds react at similar rates → low selectivity). Electronegativity is not the right concept here — reactivity and TS timing are.
- **MC-3 (Type 3 — language contamination)**: "Free rotation around C–C bonds means all conformations are equally stable." Probe: "Is the staggered conformation of ethane more or less stable than the eclipsed? By how much?" Characteristic phrase: "free rotation means no preference." Intervention: "free rotation" means there is no BARRIER high enough to PREVENT rotation (unlike C=C rotation, which would break the π bond, requiring >250 kJ/mol → restricted rotation → cis/trans isomers). But free does not mean energy-flat: the staggered conformation is ~12 kJ/mol lower in energy than eclipsed (torsional strain). At room temperature (kT ≈ 2.5 kJ/mol), this means staggered is strongly preferred (> 99% staggered for ethane) but interconversion is extremely fast (essentially instantaneous). "Free" refers to the ABILITY to rotate, not to the absence of an ENERGETIC PREFERENCE.

## Analogies
**Valid**: free-radical halogenation as a bucket brigade — initiation provides the first "spark" (Cl• at the front of the line); each person in propagation hands a bucket (H-atom or X₂) to the next; termination is when two people in the line collide and both drop their buckets. The fire (product formation) happens continuously in propagation, not at the start (initiation).

## Demonstrations
**Free-radical bromination of cyclohexane**: add Br₂ in CCl₄ to cyclohexane; in the DARK, the orange Br₂ colour persists; expose to UV light (or sunlight) → Br₂ rapidly decolourises as bromo products form. The light-dependence is the visible signature of the radical mechanism (initiation requires photons).

**Cyclohexane chair model**: build cyclohexane from a molecular model kit; show the chair flip; identify axial (perpendicular to approximate plane) and equatorial (tilted toward the plane) bonds; attach a large group (e.g. cyclohexyl = methylcyclohexane) and show that equatorial placement is preferred to minimise 1,3-diaxial interactions. Students see why cyclohexane is strain-free.

## Discovery Questions
1. "Write the complete free-radical chain mechanism for the bromination of propane to give 2-bromopropane. State all three stages with equations. Explain why 2-bromopropane is the major product rather than 1-bromopropane."
2. "Neopentane (2,2-dimethylpropane) undergoes free-radical chlorination. (a) How many different monochloroalkane products can form? (b) Draw and name each product. (c) Explain why all C–H bonds in neopentane are equivalent in terms of the type of radical formed."

## Teaching Sequence
1. Alkane structure: sp³, tetrahedral, σ bonds only, general formula.
2. IUPAC naming recap (from chem.org.iupac) — apply to branched examples.
3. Conformational analysis: Newman projections; staggered vs. eclipsed ethane; anti vs. gauche butane.
4. Ring strain: cyclopropane angle strain; cyclohexane chair (strain-free); axial/equatorial; chair flip.
5. Physical properties: London forces → bp trends; branching lowers bp; insolubility in water.
6. Free-radical halogenation: mechanism (initiation, propagation ×2, termination variants); why chain reaction.
7. Selectivity: radical stability order; Cl• vs. Br• (reactivity vs. selectivity trade-off); Hammond postulate (qualitative).

## Tutor Actions
- **If student lists initiation as the product-forming step**: ask "what molecules are present when initiation happens?" (X₂ and light, no R–H involved). "Can R–X form if R–H is not yet reacting?" No. Direct the student to propagation step 2.
- **If student says Cl is more selective than Br**: ask "which halogen radical is more reactive toward C–H bonds?" (Cl•). "If a radical is more reactive, does it stop to choose carefully or react with whatever is nearby?" (reacts broadly). "So which is more selective — the reactive or the sluggish radical?" (sluggish = Br).
- **FRAGILE sign**: writes the mechanism correctly for chlorination of methane (only one product possible) but cannot predict the product distribution for propane chlorination or explain why selectivity changes with halogen.

## Voice Teaching Notes
In voice, the three mechanism stages (initiation/propagation/termination) need to be clearly distinguished. Use a mnemonic: "IPS — Initiation breaks the dihalogen; Propagation does the chemistry in two steps (repeated); Stopping [termination] combines two radicals." Test each stage with a simple alkane (CH₄ or C₂H₆) before moving to branched examples. Selectivity discussion works best after the mechanism is secure.

## Assessment Signals
- **Green**: names branched alkanes; draws Newman projections and identifies staggered/eclipsed; describes ring strain in cyclopropane/cyclohexane; writes free-radical halogenation mechanism in all three stages; predicts major product and explains Cl vs. Br selectivity from radical stability.
- **Amber**: correct mechanism for simple (methane) halogenation but cannot predict regioselectivity for a branched alkane; or cannot draw a Newman projection from a 3D structure.
- **Red**: says product forms in initiation; says chlorination is more selective than bromination; says free rotation = all conformers equally stable.
- **Probe**: "Write the mechanism for the monobromination of 2-methylbutane. Identify the major product, naming it, and explain why it forms preferentially. Draw a Newman projection looking down the C2–C3 bond of 2-methylbutane in the staggered and eclipsed conformations."

## Tutor Recovery Strategy
If student cannot write the mechanism: scaffold it as a fill-in structure. "Step 1 (Initiation): ? + hν → 2?. Use the molecule names." (Cl₂ → 2Cl•) "Now Cl• needs to react with propane. Which bond does it break?" (C–H) "Write that as an equation." (Cl• + C₃H₈ → HCl + C₃H₇•) "Now C₃H₇• reacts with Cl₂. What breaks and what forms?" (C₃H₇• + Cl₂ → C₃H₇Cl + Cl•) "That's the product step! And the Cl• starts the whole thing again — that's the chain." Build step-by-step until the chain logic is visible.

## Memory Hooks
- **sp³ hybridisation**: "All C–C and C–H in alkanes are σ bonds; all angles ≈109.5°."
- **Staggered preference**: "Staggered = lowest energy (bonds far apart). Eclipsed = highest energy."
- **Cyclohexane**: "Chair = strain-free. Equatorial position preferred for large groups."
- **Mechanism stages**: "IPS: Initiation (X₂ → 2X•), Propagation (two steps, forms product), Stopping (two radicals combine)."
- **Selectivity**: "Cl = indiscriminate (fast). Br = selective (slow, late TS, resembles product)."
- **Radical stability**: "3° > 2° > 1° > methyl."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for alkane chemistry.

## Cross-Subject Connections
- **Atmospheric chemistry**: methane (the simplest alkane) and other volatile organic compounds (VOCs) from vehicle exhausts and solvents react with atmospheric Cl• and OH• radicals by a free-radical mechanism essentially identical to laboratory halogenation — tropospheric oxidation of VOCs is a massive-scale free-radical chain process contributing to smog and ozone depletion.
- **Petroleum refining**: alkanes are the major components of crude oil fractions (LPG, petrol, diesel, lubricating oils by molecular weight and bp). Free-radical cracking converts long-chain alkanes to shorter, more useful fractions and alkenes — a high-temperature industrial free-radical process.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.hyd.alkanes`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.hyd.alkanes` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
