# Reactive Intermediates — `chem.org.reactive-intermediates`

## Identity
- **KG ID**: chem.org.reactive-intermediates
- **Subject**: chemistry
- **Domain**: chem.org
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.org.electronic-effects
- **Unlocks**: (none — terminal node)

## Learning Objective
Classify and describe the structure, stability, and generation of carbocations, carbanions, free radicals, and carbenes; predict stability orders for each using electronic and structural arguments; and relate each intermediate type to its characteristic reactions in organic mechanisms.

## Core Understanding
**Reactive intermediates — overview**:
Reactive intermediates are short-lived, high-energy species that form during multi-step organic reactions but cannot be isolated under normal conditions. They have incomplete valence shells or unpaired electrons, making them highly reactive. The four principal types are: carbocations, carbanions, free radicals, and carbenes.

**Carbocations (carbenium ions)**:
- **Structure**: positively charged carbon with only THREE bonds; the central carbon is sp² hybridised, trigonal planar; the empty p orbital is perpendicular to the plane; the central carbon has only 6 valence electrons (sextet, not octet).
- **Generation**: loss of a leaving group (R–X → R⁺ + X⁻, especially in SN1 and E1); protonation of an alkene (Markovnikov addition first step); Lewis acid-assisted ionization (Friedel–Crafts); ring-opening of epoxides under acidic conditions.
- **Stability order**: 3° > 2° > 1° > methyl.
  - Alkyl groups stabilise by +I (inductive electron donation) and hyperconjugation (σ_C–H → p+ overlap, delocalises positive charge). Three alkyl groups (tertiary) provide maximum stabilisation.
  - Allylic and benzylic carbocations are especially stable — the empty p orbital aligns with the π system → positive charge delocalised by resonance over 3 atoms.
  - Vinyl and aryl carbocations are extremely unstable (the empty orbital is in an sp² orbital in the plane, orthogonal to the π system — no resonance stabilisation; the positive charge on an sp² carbon has higher s-character and is held tighter by the nucleus).
  - Bridgehead carbocations at small bicyclic bridgeheads are also destabilised (Bredt's rule: the empty p orbital cannot align with adjacent bonds in a rigid bicyclic system).
- **Rearrangements**: carbocations rearrange to more stable carbocations via 1,2-hydride shifts or 1,2-alkyl shifts (Wagner–Meerwein rearrangements) — a primary carbocation will rapidly rearrange to secondary or tertiary before further reaction.

**Carbanions**:
- **Structure**: negatively charged carbon with THREE bonds; the central carbon usually sp³ hybridised (lone pair in sp³ orbital); has 8 electrons. Some carbanions are sp² hybridised (lone pair in p orbital, allylic/benzylic).
- **Generation**: deprotonation of C–H bonds by strong base (n-BuLi, LDA, NaH, NaNH₂); reductive cleavage (organolithium and Grignard reagents behave as carbanions: R–MgX → R⁻ equivalent); metal–halogen exchange (R–X + n-BuLi → R–Li + n-BuX).
- **Stability order**: 3° < 2° < 1° < methyl (OPPOSITE to carbocations).
  - Alkyl groups destabilise carbanions via +I (donate electron density into the already-electron-rich carbon — increases energy). Fewer alkyl groups = more stable carbanion.
  - Resonance stabilisation: allylic and benzylic carbanions stabilise by lone-pair → π* overlap (negative charge delocalised). Enolate anions (adjacent C=O) are stabilised by resonance with the carbonyl; these are the most important stabilised carbanions in synthesis.
  - Inductive destabilisation by electropositive groups; inductive stabilisation by electronegative substituents (−I: CF₃, SO₃H, NO₂ adjacent to the carbanion stabilise by withdrawing density — pKa of DMSO ≈ 35; pKa of CH₃NO₂ ≈ 10, because nitro group strongly delocalises the carbanion).
  - sp hybridised carbanions are more stable than sp² (more s character → electrons held closer to nucleus, better accommodated): pKa alkyne terminal ≈ 25 < pKa alkene vinylic ≈ 44 < pKa alkane ≈ 50.
- **Reactions**: nucleophilic addition (to carbonyls), nucleophilic substitution (SN2), Grignard/organolithium reactions; aldol condensation; Claisen condensation; Michael addition.

**Free radicals**:
- **Structure**: neutral carbon (or other atom) with ONE unpaired electron and three bonds; the radical centre is trigonal planar (sp² hybridised; the radical occupies the p orbital or an sp³ orbital in different systems — for carbon radicals, essentially planar). Has 7 valence electrons (or 6+1 in different counting — the point is one unpaired electron).
- **Generation**: homolytic bond cleavage by heat (thermolysis) or UV radiation; radical initiators (peroxides: RO–OR → 2 RO•; azo compounds: AIBN → 2 R• + N₂); chain propagation in radical chain reactions.
- **Stability order**: 3° > 2° > 1° > methyl (SAME as carbocations).
  - Alkyl groups stabilise via hyperconjugation (σ_C–H → SOMO overlap, delocalises radical, lowers energy). Same direction as for carbocations, but weaker than in cations (no formal charge to stabilise).
  - Allylic and benzylic radicals are very stable (the radical p orbital overlaps with the π system → radical delocalised over 3 or more atoms). The allyl radical is effectively the textbook example of resonance-stabilised radical.
  - Vinylic and aryl radicals are less stable than their aliphatic analogues (high s-character or constrained geometry limits hyperconjugation).
- **Reactions**: radical chain reactions (initiation → propagation → termination); radical addition to alkenes (anti-Markovnikov addition in HBr/peroxide); halogenation of alkanes (selectivity: Cl• less selective → statistical product; Br• more selective → thermodynamic/stability-controlled product because Br• abstraction is endothermic → transition state late → resembles the radical product); polymerisation.
- **Radical chain mechanism (halogenation of methane)**:
  1. Initiation: Cl₂ → 2 Cl• (UV)
  2. Propagation: Cl• + CH₄ → HCl + CH₃•; CH₃• + Cl₂ → CH₃Cl + Cl•
  3. Termination: any two radicals combine (Cl• + Cl•; Cl• + CH₃•; CH₃• + CH₃•).

**Carbenes**:
- **Structure**: neutral divalent carbon with only TWO bonds and two non-bonding electrons; the carbon is sp² hybridised. The two non-bonding electrons can either be PAIRED in one orbital (singlet carbene, opposite spins, antiparallel) or UNPAIRED in two separate orbitals (triplet carbene, same-spin, paramagnetic — like a diradical).
- **Singlet carbene** (paired electrons in the sp² orbital, empty p orbital): electrophilic; reacts stereospecifically (stereochemistry of the alkene is RETAINED in the cyclopropane product — concerted addition); more reactive and shorter-lived.
- **Triplet carbene** (diradical, two electrons in two different orbitals): reacts like a stepwise diradical — stereochemistry of addition is NOT retained (two sequential radical additions → mixture of stereoisomers).
- **Generation**: α-elimination of HX from CHX₃ with strong base (CHCl₃ + KOH → :CCl₂ + KCl + H₂O); photolysis of diazo compounds (CH₂N₂ → :CH₂ + N₂); pyrolysis of ketene (H₂C=C=O → :CH₂ + CO).
- **Reactions**: cyclopropane ring formation by addition to alkenes (Simmons–Smith reagent: Zn/CH₂I₂ → carbenoid :CH₂Zn — a carbene equivalent that reacts in a singlet-like concerted fashion → stereospecific cyclopropanation); C–H insertion reactions.
- **Nitrenes** (analogous to carbenes, nitrogen-centred divalent N with lone pair): briefly mentioned as the nitrogen analogue.

## Mental Models
**Electron-counting as the key to reactivity direction**: carbocations are electrophiles (they WANT electrons — electron-deficient, empty orbital). Carbanions are nucleophiles (they GIVE electrons — electron-rich, lone pair). Free radicals are radical species (they TAKE one electron — homolytic). Carbenes are ambiphilic (can act as electrophile, nucleophile, or radical depending on spin state). Knowing which type of intermediate is forming immediately tells the student what the intermediate will do next.

**Stability order cross-check**: for carbocations and radicals, electron-donating alkyl groups stabilise (more substituents = more stable). For carbanions, electron-donating groups destabilise (opposite). The easiest memory handle: "positive species love electrons from alkyl groups (stabilise with more substituents); negative species hate more electron-donating groups." This covers 80% of stability trend questions.

**Singlet vs. triplet carbene as "gun" vs. "punching bag"**: a singlet carbene hits with one fast punch (concerted, simultaneous from both sides) → the alkene can't rotate → stereochemistry preserved. A triplet carbene jabs, then follows up (stepwise radical), during which the carbon can rotate → stereochemistry scrambled.

## Why Students Fail
Students rank carbanion stability the same way as carbocations (more substituents = more stable) — forgetting the reversal. They confuse free radicals with ions — a radical is NEUTRAL; a radical does not have a charge. They cannot state when singlet vs. triplet carbene reactions are stereospecific vs. non-stereospecific. They also mix up the GENERATION of carbocations (loss of leaving group) with their rearrangements (which happen AFTER the carbocation forms).

## Misconceptions
- **MC-1 (Type 1 — overgeneralization)**: "Tertiary carbanions are the most stable, just like tertiary carbocations." Probe: "A methyl carbanion (CH₃⁻) and a tert-butyl carbanion ((CH₃)₃C⁻): which is more stable? Which has more alkyl groups?" Characteristic phrase: "more alkyl groups = more stable for all reactive intermediates." Intervention: alkyl groups are ELECTRON-DONATING (+I, hyperconjugation). For carbocations (electron-deficient), electron donation STABILISES — so tertiary > secondary > primary. For carbanions (electron-rich), electron donation DESTABILISES — adding more alkyl groups pushes MORE electron density onto an already-electron-rich centre, raising energy. Therefore the order REVERSES: methyl > primary > secondary > tertiary. The same alkyl group does opposite things to opposite charges. A tertiary carbanion is the LEAST stable, not the most.
- **MC-2 (Type 3 — language contamination)**: "Free radicals are negatively charged because they have an 'extra' electron." Probe: "Is a carbon radical (R₃C•) positively charged, negatively charged, or neutral?" Characteristic phrase: "radical means extra electron → negative." Intervention: FREE RADICALS are ELECTRICALLY NEUTRAL. The term "radical" refers to a species with an ODD NUMBER OF ELECTRONS — specifically, one UNPAIRED electron. The carbon radical R₃C• has 7 electrons in its bonds and lone electrons totalling exactly the right number to be NEUTRAL (no net charge). Compare: R₃C⁺ (carbocation, 6 electrons, positive); R₃C⁻ (carbanion, 8 electrons, negative); R₃C• (radical, 7 electrons, neutral). "Extra" electron refers to parity, not charge balance. This is a language confusion between "having an unpaired electron" (odd count) and "having an extra electron" (anion charge).
- **MC-3 (Type 5 — instruction-induced)**: "Singlet and triplet carbenes both give the same cyclopropane product because both insert into the π bond." Probe: "If you add singlet carbene to cis-2-butene vs. trans-2-butene, do you get the same cyclopropane product or different ones? What about triplet carbene?" Characteristic phrase: "the product is cyclopropane — it doesn't matter which spin state." Intervention: the STEREOCHEMICAL OUTCOME differs crucially. Singlet carbene addition is CONCERTED — both new C–C bonds form simultaneously, before either end of the alkene can rotate → the relative configuration of the substituents on the alkene is RETAINED in the cyclopropane (cis-alkene → cis-cyclopropane; trans-alkene → trans-cyclopropane). Triplet carbene reacts STEPWISE (first radical addition → rotating triplet biradical intermediate → second ring closure) → rotation can occur between the two steps → MIXTURE of cis- and trans-cyclopropanes from either alkene starting material. Spin state determines mechanism, and mechanism determines stereochemistry.

## Analogies
**Valid**: carbocation stability by degree is like a positively charged celebrity (the carbocation = the celebrity seeking attention/electron density). A small number of fans (1° carbocation, 1 alkyl group) provides little support; a large crowd of fans (3°, 3 alkyl groups) provides maximal support via hyperconjugation. The celebrity is most stable when the whole crowd is donating energy (electron density). For carbanions, reverse the analogy: the carbanion is an embarrassingly shy person who already has too much attention (electron density); more fans (alkyl groups donating more electrons) make things worse.

## Demonstrations
**Radical chain reaction — burning magnesium in CO₂**: Mg burns in CO₂ (produces MgO + C), demonstrating radical combustion chemistry in the absence of O₂. A safer classroom demo of radical reactivity. Discuss the initiation step (heat → Mg radical + CO₂ radical character in the propagation).

**Chlorination selectivity demonstration (computational)**: show the statistical vs. selectivity argument using molecular models or a free-energy diagram — Cl• abstraction of 3° vs. 1° H is almost equally fast (Eₐ similar, little selectivity) while Br• shows high 3° selectivity. This makes the relative radical stability visible through observed product distribution.

## Discovery Questions
1. "2-bromo-2-methylpropane reacts with AgNO₃ in aqueous ethanol to give a precipitate (AgBr) immediately, while 1-bromo-2-methylpropane reacts only very slowly. Explain this difference in terms of the intermediate involved, and predict what structural rearrangement product you might observe from 1-bromo-2-methylpropane."
2. "Radical bromination of 2-methylbutane gives predominantly 2-bromo-2-methylbutane rather than 1-bromo-2-methylbutane or 3-bromo-2-methylbutane. Explain this selectivity using radical stability and the Hammond postulate."

## Teaching Sequence
1. Overview: four types of reactive intermediates; all are transient, not isolable; formed in multi-step mechanisms.
2. Carbocations: structure (sp², empty p, 6e, planar); generation (SN1, E1, EAS, protonation); stability order (3°>2°>1°>methyl; allylic/benzylic = extra stable; vinyl/aryl = extra unstable); hyperconjugation and +I; rearrangements (1,2-shifts).
3. Carbanions: structure (sp³, lone pair, 8e); generation (base deprotonation, organometallics); stability order reversed (methyl>1°>2°>3°; sp > sp² > sp³ by pKa; resonance-stabilised anions: enolates, allylic); reactions (nucleophilic).
4. Free radicals: structure (neutral, one unpaired e, sp² or sp³); generation (homolysis, UV, peroxides); stability order (3°>2°>1°>methyl, same as cation); radical chain mechanism (initiation/propagation/termination); selectivity of Cl• vs. Br•.
5. Carbenes: structure (divalent C, two non-bonding electrons); singlet vs. triplet distinction; generation (α-elimination, photolysis); reactions (cyclopropanation; stereospecific singlet vs. non-stereospecific triplet).

## Tutor Actions
- **If student ranks carbanion stability same as carbocation**: ask "Alkyl groups DONATE electrons. The carbocation is electron-DEFICIENT — does donation help or hurt?" (Helps — stabilises.) "The carbanion is electron-RICH — does donation help or hurt?" (Hurts — adds more to what's already surplus.) "So the stability order must be..." (Reversed: methyl > primary > secondary > tertiary.)
- **If student says free radicals have a charge**: ask "Write the electron structure of CH₃•. How many electrons does carbon have total in that species? Is that the same as neutral carbon?" (Carbon has 6e in CH₃• — 4 in bonds as 2 per bond but… revisit: CH₃• has 3 C–H bonds (6e counted on both atoms, 3 from C) + 1 radical (1e) = 7 electrons total including shared ones — but counting just around carbon: 3 bonds + 1 radical electron = 7 electrons around carbon in the Lewis sense, yet the molecule is neutral because there's no charge separation.) Force the student to count charges: CH₃• has no net charge.
- **FRAGILE sign**: can name all four types of intermediates and state their stability orders but cannot explain WHY the carbanion order is reversed, or cannot distinguish singlet from triplet carbene reactions.

## Voice Teaching Notes
The stability-order reversal for carbanions is the single most common confusion in this topic, and it must be built from first principles in voice. Ask: "Which direction do alkyl groups push electrons — toward or away from themselves?" (They DONATE — push electrons toward the central carbon.) "If the central carbon already has a NEGATIVE charge, does receiving more electrons make it more or less stable?" (Less stable — more charge build-up → higher energy → less stable carbanion.) "So what does the stability order for carbanions look like?" (Reversed: fewer alkyl groups = more stable.) In voice, draw the contrast to carbocations immediately: "Same alkyl group, opposite effect, because we've flipped the charge." Revisit singlet/triplet after the four intermediates are introduced — students need to understand carbene structure before the sterochemical consequence makes sense.

## Assessment Signals
- **Green**: correctly describes structure and hybridisation of all four intermediate types; gives correct stability order for carbocations, carbanions, and free radicals with at least one correct structural justification per order; correctly states that carbanion stability is the REVERSE of carbocation stability; distinguishes singlet (stereospecific) from triplet (non-stereospecific) carbene addition; explains why allylic/benzylic intermediates are stabilised by resonance; describes the radical chain mechanism with initiation/propagation/termination steps.
- **Amber**: correct stability orders by memory but cannot explain WHY carbanion order is reversed; or can describe carbocations/carbanions but confuses free radicals (neutral) with anions/cations.
- **Red**: ranks tertiary carbanion as most stable; says free radicals are negatively charged; says both singlet and triplet carbenes give the same stereochemical outcome.
- **Probe**: "A chemist generates a carbene from CHBr₃ + KOH (strong base). Is this likely to be singlet or triplet? What stereochemical prediction can you make about its addition to cis-2-butene?"

## Tutor Recovery Strategy
If student cannot explain carbanion stability reversal: use the electrostatic argument step by step. "Draw a tertiary carbanion (CH₃)₃C⁻. Each methyl group donates electrons (+I). The central carbon already has a negative charge. Three methyl groups push MORE electron density onto an already-negative carbon. Is this stabilising or destabilising?" (Destabilising — like trying to pour water into an already-overflowing cup.) "Draw a methyl carbanion CH₃⁻. No alkyl groups to donate — the negative charge sits on carbon with the minimum of extra electron density being forced on. Is this more or less stable than the tertiary?" (More stable — less electron crowding.) Then contrast with the carbocation: "Draw (CH₃)₃C⁺. The carbon is positive (electron-deficient). Three methyl groups DONATE — they relieve the positive charge. Is this stabilising or destabilising?" (Stabilising.) This direct-comparison argument is usually sufficient to make the reversal logically inescapable.

## Memory Hooks
- **Carbocation stability**: "3° > 2° > 1° > methyl. Allylic/benzylic = extra stable (resonance). Vinyl/aryl = extra unstable. 1,2-shifts give rearrangements."
- **Carbanion stability**: "OPPOSITE to carbocations: methyl > 1° > 2° > 3°. Resonance (enolate, allylic) stabilises. sp > sp² > sp³ (pKa order). Organometallics and strong bases generate them."
- **Free radicals**: "NEUTRAL — not charged. 3° > 2° > 1° (same as carbocation). Allylic/benzylic = extra stable. Radical chain: initiation → propagation → termination."
- **Carbenes**: "Singlet = CONCERTED = stereospecific. Triplet = STEPWISE (diradical) = non-stereospecific. Generated by α-elimination (CHX₃ + base) or photolysis."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for reactive intermediate chemistry.

## Cross-Subject Connections
- **Biochemistry**: carbocations appear in biological isoprene metabolism (mevalonate pathway, the biosynthesis of steroids and terpenes — farnesyl pyrophosphate → squalene involves tertiary allylic carbocation intermediates). Free radicals appear in oxidative stress (reactive oxygen species: HO•, O₂•⁻) and in the mechanism of radical S-adenosylmethionine enzymes, which use a 5'-deoxyadenosyl radical to initiate hydrogen abstraction. Enolate carbanion chemistry underlies the Claisen condensation used in fatty acid biosynthesis (malonyl-CoA → fatty acid chain elongation via nucleophilic addition of the enolate onto the thioester).
- **Pharmacology/toxicology**: reactive radical intermediates from drug metabolism (e.g., acetaminophen → NAPQI, a reactive quinone-imine via radical/oxidative metabolism) can cause hepatotoxicity. Antioxidants (vitamins C, E; β-carotene) function as radical scavengers — they donate a hydrogen atom to a damaging radical, generating a stabilised (delocalised) radical that terminates the chain rather than propagating it.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.org.reactive-intermediates`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.org.reactive-intermediates` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
