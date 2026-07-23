# Spectroscopic Methods in Organic Chemistry — `chem.org.spectroscopy`

## Identity
- **KG ID**: chem.org.spectroscopy
- **Subject**: chemistry
- **Domain**: chem.org
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Estimated hours**: 5
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.atomic.electromagnetic-radiation, chem.org.iupac
- **Unlocks**: chem.anal.spectroscopy, chem.carb.spectro

## Learning Objective
Use infrared (IR), mass spectrometry (MS), and ¹H NMR spectral data to identify functional groups, determine molecular formula from the molecular ion, and deduce structural features of an unknown organic compound; combine multiple spectra to propose a structure.

## Core Understanding
Structure determination in organic chemistry relies on four main spectroscopic techniques. The first two are typically introduced together at this level.

**Mass Spectrometry (MS)**:
- Principle: molecules are vaporised and ionised (typically by electron impact, EI); molecular ions (M⁺•) and fragment ions are separated by mass-to-charge ratio (m/z) and detected.
- Molecular ion (M⁺): the peak at the highest m/z corresponding to the intact molecule minus one electron; gives the molecular mass (and from it, the molecular formula if high-resolution MS is used).
- Base peak: the most abundant fragment (tallest peak, set to 100%); not always M⁺.
- Fragmentation patterns: bonds break at characteristic positions. α-cleavage (next to heteroatom or double bond); loss of common small molecules (H₂O from alcohols: M−18; CO from aldehydes; HCl from chlorides: M−36/38; CH₃ loss: M−15; Br isotope pattern 1:1 M and M+2; Cl isotope pattern 3:1 M and M+2).
- Isotope patterns: Br gives two peaks of equal height at M and M+2 (⁷⁹Br/⁸¹Br ≈ 1:1); Cl gives 3:1 peaks at M and M+2 (³⁵Cl/³⁷Cl ≈ 3:1). Recognition of these patterns immediately identifies Br or Cl presence without any other data.

**Infrared Spectroscopy (IR)**:
- Principle: molecules absorb IR radiation at frequencies matching bond vibrational frequencies (stretching/bending); only bonds with a change in dipole moment during vibration are IR active.
- Region: 4000–400 cm⁻¹. The FINGERPRINT REGION (1500–400 cm⁻¹) is unique to each compound (used to confirm identity by reference matching); the FUNCTIONAL GROUP REGION (4000–1500 cm⁻¹) identifies functional groups.
- Key absorptions to memorise:
  - O–H (alcohol): broad, 3200–3550 cm⁻¹.
  - O–H (carboxylic acid): very broad, 2500–3300 cm⁻¹.
  - N–H (amine, primary): two peaks ~3300 and ~3400 cm⁻¹.
  - C–H: 2800–3000 cm⁻¹ (sp³); slightly above 3000 cm⁻¹ for sp², sp.
  - C≡N (nitrile): strong, 2200–2260 cm⁻¹.
  - C≡C (alkyne): 2100–2260 cm⁻¹.
  - C=O (carbonyl): the most diagnostic; strong absorption 1680–1750 cm⁻¹. Exact position:
    - Ester: ~1735 cm⁻¹
    - Aldehyde/ketone: ~1715 cm⁻¹
    - Carboxylic acid: ~1710 cm⁻¹
    - Amide: ~1680 cm⁻¹ (conjugation lowers frequency)
  - C=C (aromatic): multiple peaks 1450–1600 cm⁻¹.
  - C–O (alcohol, ether, ester): 1000–1300 cm⁻¹.
- Absence of O–H and carbonyl: likely alkane/alkene/alkyne/nitrile/amine.
- IR is best at confirming WHAT FUNCTIONAL GROUP IS PRESENT, not the carbon skeleton.

**¹H NMR Spectroscopy** (introduced at A-level/pre-university):
- Principle: protons in different chemical environments absorb radio waves at slightly different frequencies in a magnetic field (chemical shift, δ, in ppm); the spectrum shows peaks whose position (δ), splitting pattern (n+1 rule), and area (integration) each carry structural information.
- Chemical shift (δ) diagnostic ranges:
  - TMS reference: δ = 0 ppm.
  - Alkyl CH₃/CH₂/CH: 0.5–2.0 ppm.
  - Next to C=O (α-carbon): 2.0–2.5 ppm.
  - Alkyne ≡C–H: 1.8–3.1 ppm.
  - Next to O (ether, alcohol): 3.3–4.5 ppm.
  - Alkene =C–H: 4.5–6.0 ppm.
  - Aromatic Ar–H: 6.5–8.0 ppm.
  - Aldehyde –CHO: 9.4–10.0 ppm.
  - Carboxylic acid –COOH: 10–12 ppm.
  - Alcohol O–H: 0.5–5.0 ppm (broad, variable).
- Splitting (n+1 rule): a proton coupled to n equivalent neighbouring protons gives n+1 peaks. Doublet (d): 1 neighbour; triplet (t): 2 neighbours; quartet (q): 3 neighbours; singlet (s): 0 neighbours. (This is first-order coupling approximation; exam questions use it exclusively.)
- Integration (peak area): proportional to the number of protons in that environment. A ratio 3:2:1 indicates 3, 2, 1 proton environments (scale by the total count from the molecular formula).
- Exchange: O–H and N–H peaks are broad and disappear on adding D₂O (deuterium exchange) — useful diagnostic to confirm their presence.

**Strategy for structural determination** (integration of spectra):
1. MS: get molecular mass (M⁺) and any isotope patterns (Cl, Br).
2. Molecular formula → degree of unsaturation (DoU) = (2C + 2 + N − H)/2 (for CₓHᵧNₙOₒ; O and S don't appear in formula).
3. DoU = 0: only single bonds (alkane, alcohol, amine). DoU = 1: one ring or double bond. DoU = 4: likely benzene ring (1 ring + 3 double bonds = DoU 4).
4. IR: identify functional groups (carbonyl type, O–H, N–H, C≡N).
5. ¹H NMR: count environments, integration, splitting → determine connectivity.
6. Propose structure consistent with ALL data; check against molecular formula.

## Mental Models
**The three lenses model**: MS gives the WEIGHT (molecular mass and fragments); IR gives the FUNCTION (what functional groups are present); NMR gives the SHAPE (how many environments, how they connect to neighbours). Structure determination is always triangulating between these three lenses — no single technique gives the whole answer.

**Chemical shift as electron density gauge**: downfield (high δ) = deshielded (electron density pulled away by electronegative groups or ring current). Upfield (low δ) = shielded (electron-rich environment, typical alkyl). The chemical shift is a direct measure of how electron-poor each H is in its local environment.

## Why Students Fail
Students try to match NMR peaks to memorised structures rather than interpreting δ, splitting, and integration independently first and THEN assembling the structure. This bottom-up approach (collect evidence, then assemble) is more reliable than pattern-matching.

Students confuse the molecular ion (M⁺, the intact molecule) with the base peak (the most intense fragment). The M⁺ is almost always the HIGHEST m/z in the spectrum; the base peak may be anywhere.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "The base peak in a mass spectrum is always the molecular ion." Probe: "The mass spectrum shows peaks at m/z = 29 (base peak), 43, 57, and 86. Which is the molecular ion?" Characteristic phrase: "the tallest peak is the molecular mass." Intervention: the MOLECULAR ION is the peak at the HIGHEST m/z (here, 86); the base peak (tallest, set to 100%) is at m/z = 29 — a fragment, not the intact molecule. The molecular ion may not be the base peak and may even be absent for compounds that fragment readily.
- **MC-2 (Type 4 — notation-induced)**: "A triplet in ¹H NMR means the proton has three neighbours." Probe: "Ethanol CH₃CH₂OH: the CH₂ group appears as a quartet. How many neighbours does CH₂ have?" Characteristic phrase: "triplet = 3 neighbours." Intervention: n+1 rule: a triplet (3 peaks) means n = 2 neighbours; a quartet (4 peaks) means n = 3 neighbours. The NUMBER OF PEAKS is one more than the number of neighbours. CH₂ in ethanol: neighbour is CH₃ (3H) → CH₂ gives a quartet (3+1 = 4 peaks). Students confuse "number of peaks" with "number of neighbours."
- **MC-3 (Type 1 — overgeneralization)**: "If the IR spectrum shows a broad O–H absorption, the compound must be an alcohol." Probe: "A compound has a broad O–H absorption from 2500–3300 cm⁻¹, a strong C=O peak at 1710 cm⁻¹, and no C–O stretch. What is the functional group?" Characteristic phrase: "broad O–H = alcohol." Intervention: there are TWO types of O–H: alcohol O–H (3200–3550 cm⁻¹, narrow-to-broad) AND carboxylic acid O–H (2500–3300 cm⁻¹, very broad, always accompanied by C=O at ~1710 cm⁻¹). If you see a very broad O–H COMBINED with a carbonyl, it is a carboxylic acid, not an alcohol. Always interpret the O–H peak IN COMBINATION with the rest of the spectrum.

## Analogies
**Valid**: NMR as a noise-cancelling microphone survey. Each type of H in the molecule holds up its own microphone and broadcasts at a frequency that depends on its electronic neighbourhood. An aldehyde H broadcasts at a high frequency (very deshielded, δ ~10 ppm); an alkyl H broadcasts quietly at a low frequency (δ ~1 ppm). Integration = number of people in each group broadcasting.

## Demonstrations
**IR spectrum comparison**: show IR spectra of ethanol, acetone, acetic acid, and an alkane side by side. Identify: broad O–H at 3300 in ethanol; C=O at 1715 in acetone (no O–H); broad O–H at 2500–3300 AND C=O at 1710 in acetic acid; absence of both in alkane. Students extract the pattern: "C=O without O–H = ketone/aldehyde; C=O with broad O–H = carboxylic acid."

**MS isotope pattern**: show a mass spectrum with two peaks of equal height (M and M+2) → students deduce Br presence. Show 3:1 pattern → Cl. This is a fast-recognition game that becomes reflexive with practice.

## Discovery Questions
1. "An unknown compound C₄H₈O has: IR — C=O at 1715 cm⁻¹, no O–H; MS — M⁺ at 72, base peak at 43 (CH₃CO⁺); ¹H NMR — singlet δ 2.1 (3H), singlet δ 2.1 (3H) [note: only one environment, 6H total integration]. Identify the compound and explain how each piece of data is consistent."
2. "A compound shows a Cl isotope pattern (3:1 doublet at M=78/80). Its ¹H NMR shows a singlet (1H, δ 7.3) and no other signals. Suggest a structure and justify it."

## Teaching Sequence
1. MS: molecular ion, base peak, fragmentation; Cl/Br isotope patterns.
2. Degree of unsaturation: formula from MS → DoU.
3. IR: functional group region key absorptions; O–H types; C=O types and positions.
4. ¹H NMR: chemical shift ranges; integration; n+1 splitting rule; D₂O exchange.
5. Strategy: MS → MW and formula → DoU → IR → NMR → structure proposal.
6. Practice: work through 2–3 full unknowns with all three spectra.

## Tutor Actions
- **If student identifies tallest MS peak as M⁺**: ask "what would happen to a fragile molecule — would the M⁺ survive?" (may fragment completely); "which peak corresponds to the INTACT molecule?" (highest m/z = M⁺). Establish: M⁺ = highest m/z; base peak = tallest (may or may not be M⁺).
- **If student confuses triplet with 3 neighbours**: write the n+1 rule explicitly; count examples: "singlet → 0 neighbours; doublet → 1 neighbour; triplet → 2 neighbours; quartet → 3." Then verify with ethanol: CH₂ next to CH₃ (3 neighbours) → quartet.
- **FRAGILE sign**: correctly identifies individual peaks but cannot assemble a coherent structural proposal when all three spectra are given together.

## Voice Teaching Notes
Spectroscopy is best taught by doing — never describe a spectrum, always show one and ask "what does this tell us?" for each feature before synthesising. The integration-first approach (read integration ratios, draw the carbon skeleton implied, then check against δ and splitting) is faster in practice than the reverse. For voice teaching, ask the student to narrate what each peak tells them before you say anything — their narration reveals exactly where the gaps are.

## Assessment Signals
- **Green**: reads all three spectra independently; computes DoU; identifies functional groups from IR; assigns δ ranges and splitting patterns in NMR; proposes a structure consistent with all data.
- **Amber**: correct individual spectral readings but cannot assemble a final structure; or correct MS and IR but confused by NMR splitting.
- **Red**: identifies base peak as M⁺; says triplet = 3 neighbours; confuses alcohol and carboxylic acid O–H absorption.
- **Probe**: "Give the student an IR (C=O at 1735, no O–H) and MS (M⁺ = 74, loss of 45 → m/z 29). What functional group does the IR suggest? What does loss of 45 imply? Propose a structure."

## Tutor Recovery Strategy
If student cannot read NMR splitting: return to the n+1 rule with a non-chemistry analogy — "I have N friends next to me, each of whom can flip heads or tails. The number of ways they can combine gives the splitting pattern: 0 friends → 1 way (singlet); 1 friend → 2 ways (doublet); 2 friends → 3 ways (triplet); 3 friends → 4 ways (quartet)." Link this back to the molecular structure (each neighbour H can be α or β spin → adds peaks). Then apply to a simple case (CH₃CH₂–, each group's splitting is determined by the other).

## Memory Hooks
- **IR C=O positions**: "Ester ~1735 (highest), aldehyde/ketone ~1715, acid ~1710, amide ~1680 (lowest — conjugation lowers)."
- **NMR δ anchors**: "Alkyl ~1; α-C=O ~2.2; next to O ~3.5; alkene ~5; aromatic ~7; aldehyde ~10; acid ~11."
- **n+1 rule shortcut**: "Peaks in the cluster = neighbours + 1. Quartet = 3 neighbours. Triplet = 2 neighbours."
- **Isotope patterns**: "Br = 1:1 (M and M+2). Cl = 3:1 (M and M+2)."

## Transfer Connections
- **chem.anal.spectroscopy**: this node introduces spectroscopic methods at an organic-identification level; chem.anal.spectroscopy extends to quantitative applications and additional techniques (UV-Vis, atomic absorption, ICP).
- **chem.carb.spectro**: carbohydrate-specific spectroscopy (anomeric proton signal in ¹H NMR, characteristic IR of pyranose ring) builds directly on the tools introduced here.

## Cross-Subject Connections
- **Biochemistry**: ¹H NMR is used to determine protein solution structures (NOE spectroscopy); ¹³C NMR gives the backbone carbon assignments; IR is used to monitor protein secondary structure (amide I band at ~1650 cm⁻¹ for α-helix, ~1630 cm⁻¹ for β-sheet).
- **Pharmaceutical industry**: MS (LCMS) is the universal QC tool for drug compound identification and quantification; IR is used for raw material identification at intake; NMR is required for new drug applications to confirm structure.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.org.spectroscopy`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.org.spectroscopy` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
