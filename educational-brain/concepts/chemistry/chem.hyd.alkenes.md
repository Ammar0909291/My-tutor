# Alkenes — `chem.hyd.alkenes`

## Identity
- **KG ID**: chem.hyd.alkenes
- **Subject**: Chemistry
- **Domain**: Hydrocarbons (chem.hyd)
- **Prerequisites**: chem.hal.sn1, chem.hal.sn2, chem.org.mechanisms
- **Difficulty**: advanced
- **Bloom level**: apply
- **Estimated hours**: 3

## Learning Objective
Describe the structure and bonding of alkenes (sp² carbon, planar geometry, restricted rotation), predict the products of electrophilic addition reactions (HX, H₂O, X₂, H₂, oxymercuration, hydroboration), apply Markovnikov's rule and anti-addition stereochemistry, and explain the mechanism of each addition using curved arrows.

## Core Understanding
**Structure**: each C=C carbon is sp²-hybridised; the three sp² orbitals form a planar trigonal arrangement (bond angles ~120°); the remaining p_z orbital on each carbon overlaps side-on to form the π-bond; the π-bond prevents rotation (unlike σ-bonds), creating cis/trans (Z/E) isomerism. The π electrons are more accessible than σ electrons (higher HOMO energy, further from nuclei) → alkenes are electron-rich and react primarily with electrophiles. **Electrophilic addition — general mechanism**: (1) electrophile (E+) attacks the π-bond; the π-electrons form a new C–E bond; a carbocation (for protic electrophiles) or cyclic intermediate (for Br₂) forms; (2) nucleophile (Nu:⁻) attacks the carbocation. **Markovnikov's rule**: the electrophile (H from HX) adds to the carbon that ALREADY has more hydrogens (the less substituted carbon); equivalently, the carbocation forms at the MORE SUBSTITUTED (more stable) carbon; equivalent statement: H adds to the end with more Hs, X adds to the end with fewer Hs. The mechanism-based explanation: the Markovnikov product arises from the more stable carbocation intermediate (3° > 2° > 1°). **Anti-Markovnikov addition (hydroboration)**: BH₃/THF followed by H₂O₂/NaOH; delivers H to the MORE substituted carbon (i.e., B goes to less substituted) — the OPPOSITE of Markovnikov. Mechanism: concerted syn addition via a 4-membered cyclic TS (no carbocation); no rearrangement; H₂O₂/NaOH oxidises C–B to C–OH with RETENTION. Product: primary or secondary alcohol with anti-Markovnikov, syn-addition. **Halogenation (X₂)**: Br₂ in CCl₄ — anti addition; the mechanism proceeds via a BROMONIUM ION (cyclic, 3-membered ring with Br bridging the two carbons); the nucleophilic Br⁻ attacks from the back side (anti to the bromonium); the two Br atoms end up on OPPOSITE faces → trans (anti) dibromide. Diagnostic test: Br₂ (brown) decolourises in alkene solution; alkanes do not decolourise in the dark. **Water addition (acid-catalysed hydration)**: H₂SO₄ then H₂O; H⁺ adds to the less substituted carbon (Markovnikov, via carbocation); water attacks the carbocation; Markovnikov alcohol product. Oxymercuration-demercuration (Hg(OAc)₂, then NaBH₄) gives Markovnikov addition of water WITHOUT carbocation rearrangement (mercury activates the alkene as a mercurinium ion; opens similarly to bromonium). **Catalytic hydrogenation**: H₂ + Pt or Pd or Ni catalyst; SYN addition of two H atoms (both added from the same face of the double bond via the catalyst surface); product is the alkane; useful to confirm degree of unsaturation or in stereoselective synthesis. **Ozonolysis**: O₃ then Zn/H₂O (reductive) → two carbonyl fragments (aldehydes from RCH=CHR' → RCHO + R'CHO; ketones from R₂C=CHR' → R₂C=O + R'CHO); oxidative workup (H₂O₂) converts aldehydes further to acids; used for structural determination and synthesis.

## Mental Models
- **The π-bond as a speed bump of electrons**: the π-electrons are high above and below the σ-framework — easily accessible to electrophiles from either face. The electrophile "hits" the π-bond first, generating the intermediate; then the nucleophile comes from behind (anti) or from the same side (syn for hydrogenation and hydroboration).
- **Markovnikov = "rich get richer"**: the more substituted carbon already has more alkyl groups (more carbon neighbours) → the carbocation at that position is MORE stable → H adds to the less substituted C to put the + on the more substituted C.
- **Anti vs. syn memory**: Br₂ = ANTI (bromonium blocks same-face attack). H₂/catalyst = SYN (both H delivered from the flat catalyst surface simultaneously). Hydroboration = SYN (concerted). Acid hydration = NOT stereospecific (carbocation is sp², attacks from either face → mixture).

## Why Students Fail
- Applying Markovnikov's rule without mechanistic reasoning — students memorise "H to the carbon with more Hs" without connecting it to carbocation stability, making the rule fragile when asked about exceptions or rearrangements.
- Forgetting the anti-addition stereochemistry of Br₂ — drawing both Br atoms adding to the same face (syn) instead of opposite faces (anti via bromonium ion opening).
- Confusing hydroboration and oxymercuration — both give "Markovnikov" or "anti-Markovnikov" alcohols but students cannot recall which is which.

## Misconceptions
1. **"Markovnikov's rule is just about hydrogen going to the carbon with more Hs — it doesn't have a mechanism"** (Type 5 — instruction-induced: the mnemonic version of Markovnikov's rule is taught first and students use it without connecting it to carbocation stability; when the situation changes — e.g., a vinyl system or a 1,2-shift — the mnemonic fails while the mechanistic understanding succeeds).
   - Probe: "Why does HBr add to propene to give 2-bromopropane rather than 1-bromopropane? Explain using the mechanism, not just the rule."
   - Characteristic phrase: "H goes to the one with more Hs" (rote, no mechanism)
   - Intervention: draw the two possible carbocations from H⁺ adding to each end of propene (1° and 2°); ask which is more stable; confirm Br⁻ attacks the more stable carbocation (2°); the mechanistic understanding predicts the Markovnikov product AND explains why.

2. **"Br₂ adds to both carbons of the alkene from the same face (syn addition)"** (Type 2 — perceptual intuition: students draw Br₂ approaching the π-bond and assume it attacks the double bond symmetrically from one face, like two hands grabbing from the same side).
   - Probe: "Adding Br₂ to cis-but-2-ene gives which stereochemical product — meso or d,l pair?"
   - Characteristic phrase: "both Br atoms come from the same side" / student draws syn dibromide
   - Intervention: draw the bromonium ion intermediate — Br bridges both carbons, blocking same-side attack; Br⁻ can only attack from the OPPOSITE face (anti); for cis-but-2-ene: anti addition → (2R,3S)- and (2S,3R)-dibromobutane = the d,l (racemic) pair (not meso). If it were syn, cis → meso; the actual stereochemical outcome distinguishes the two mechanisms cleanly.

3. **"Hydroboration and oxymercuration both give the same product"** (Type 1 — overgeneralization: students learn "hydroboration gives anti-Markovnikov alcohol" and "oxymercuration gives Markovnikov alcohol" but mix up which is which).
   - Probe: "You want to convert 1-methylcyclohexene to 1-methylcyclohexanol (Markovnikov). Do you use hydroboration or oxymercuration?"
   - Characteristic phrase: "use hydroboration" (inverted) / "both give the same alcohol"
   - Intervention: hydroboration = B goes to LESS substituted C → OH ends up at LESS substituted C → anti-Markovnikov. Oxymercuration = Hg activates alkene; water attacks MORE substituted C → OH at MORE substituted C → Markovnikov. The diagnostic is: "which carbon gets OH?" — this maps to "which addition method?" Use a two-column comparison table.

## Analogies
- **Good**: The bromonium ion is like a bridge that closes the road from one side — once Br bridges the top, traffic (Br⁻) must come from the bottom. This is why anti addition is enforced.
- **Anti-analogy**: Do NOT say "the alkene just reacts with anything — no particular face preference without saying why" — alkene reactions have precise stereoelectronic requirements; treating addition as unspecific leads to wrong stereochemical predictions.

## Demonstrations
- **Br₂ decolouration test**: add a few drops of Br₂ in CCl₄ (brown-orange) to cyclohexene; the solution decolourises rapidly in the dark (electrophilic addition, no light needed); add the same Br₂ to cyclohexane — colour persists in the dark (radical addition requires light). This single test distinguishes alkene from alkane.
- **Hydrogenation (catalytic)**: bubble H₂ through 1-hexene in the presence of Raney Ni; confirm by loss of Br₂-decolouration test (the product hexane does not decolourise Br₂ in the dark).
- **Stereospecific bromination** (conceptual): draw the Newman projection of the bromonium ion of cis-2-butene; show anti attack by Br⁻; derive the stereochemical product; compare with trans-2-butene.

## Discovery Questions
1. HBr adds to but-1-ene. What is the major product? What is the intermediate, and why is it more stable than the alternative?
2. Br₂ in water (Br₂/H₂O) adds to propene. What is the product? (Hint: water is the nucleophile in step 2, not Br⁻ — the product is a bromohydrin, anti addition, Markovnikov for the OH.)
3. How would you convert 1-methylcyclohexene into the trans-diol (both OHs on opposite faces)? (Br₂/H₂O then SN2 with OH⁻, or OsO₄ gives cis-diol — distinguish.)
4. Hydroboration of propene with BH₃, then H₂O₂/NaOH: what is the product? Why is this the anti-Markovnikov result?

## Teaching Sequence
1. **Structure review**: draw sp² carbons, planar geometry, the π-bond; explain restricted rotation and cis/trans isomerism.
2. **General electrophilic addition**: the π-bond as nucleophile; electrophile attacks first; nucleophile attacks carbocation second.
3. **HX addition and Markovnikov's rule**: work through mechanism for propene + HBr; two possible carbocations; stability argument; confirm major product.
4. **Anti-Markovnikov via hydroboration**: BH₃ concerted syn addition (boron to less hindered C); H₂O₂/NaOH oxidation (retention); product is anti-Markovnikov alcohol; contrast with HX.
5. **Br₂ addition**: bromonium ion formation; anti opening by Br⁻; stereochemical consequence; Br₂ decolouration diagnostic.
6. **Acid hydration and oxymercuration**: both Markovnikov; difference is carbocation rearrangement risk in acid hydration vs. none in oxymercuration.
7. **Catalytic hydrogenation and ozonolysis**: syn H₂ addition; ozonolysis as the reverse retrosynthetic tool.
8. **Comparative summary table**: all reactions, conditions, regioselectivity, stereochemistry.

## Tutor Actions
- **If student applies Markovnikov without mechanism**: ask "which carbocation is more stable?" and build the answer from there; the rule is derived from the mechanism, not memorised separately.
- **If student draws syn Br₂ addition**: draw the bromonium ion; ask "can Br⁻ attack from the same face as the bridging Br?" — no; confirm anti.
- **If hydroboration/oxymercuration are confused**: use a two-column "which carbon gets OH?" comparison; reinforce with one worked example for each.

## Voice Teaching Notes
- "Electrophiles attack the π-bond first" — say this before every electrophilic addition mechanism; it is the universal first step.
- Markovnikov mnemonic: "The rich get richer — H adds to the carbon that already has more Hs (the less substituted), and the + charge goes to the more substituted (more stable) carbon."
- For stereochemistry: "Br₂ = anti. H₂ = syn. Hydroboration = syn. Acid hydration = no stereocontrol." Rehearse this as a list before assessment.

## Assessment Signals
- **Green**: predicts the correct Markovnikov product AND gives the mechanistic explanation via carbocation stability; correctly identifies anti addition from Br₂ and syn from hydroboration; distinguishes anti-Markovnikov (hydroboration) from Markovnikov (oxymercuration/acid hydration).
- **Amber**: gets regiochemistry right but not stereochemistry; knows Markovnikov as a rule without the carbocation mechanism.
- **Red**: applies anti-Markovnikov when Markovnikov is correct; draws syn Br₂ addition; cannot recall any addition reaction mechanism.

## Tutor Recovery Strategy
- Markovnikov without mechanism: give a vinyl carbocation example (vinyl carbocations are very unstable — this forces the mechanistic reasoning beyond the mnemonic).
- Anti-addition not understood: use a physical model showing the bromonium ion as a wall on one face; the nucleophile must approach from the opposite side — the geometry enforces anti addition.
- Hydroboration/oxymercuration mix-up: focus on ONE at a time; master the product (anti-Markovnikov OH for hydroboration); then introduce oxymercuration as the Markovnikov counterpart.

## Memory Hooks
- **Markovnikov = H to the more-H carbon; + to the more-substituted** (two formulations of the same rule).
- **Br₂ = anti (bromonium blocks the face). H₂ = syn (catalyst delivers both H from one face). BH₃ = syn (concerted, boron to less hindered C).**
- **HBoration = anti-Markovnikov OH; Hg(OAc)₂ = Markovnikov OH** — the two reagent–product pairs.
- **Ozonolysis: O₃ then reductive workup → two carbonyls** — the alkene is "cut at the double bond."

## Transfer Connections
- **Halogenoalkane chemistry (chem.hal)**: the Markovnikov product (e.g., 2-bromopropane) is used in SN1/SN2 and elimination reactions — alkenes are the upstream source of halogenoalkanes.
- **Alcohol synthesis**: Markovnikov (acid hydration, oxymercuration) and anti-Markovnikov (hydroboration) routes to specific alcohols are key retrosynthetic tools.
- **Polymer chemistry**: addition polymerisation (ethene → polyethylene, propene → polypropylene) is electrophilic or radical addition of the monomers — conceptually identical to small-molecule addition.
- **Stereochemistry**: the anti/syn addition rules make alkene chemistry one of the most powerful tools for stereocontrolled synthesis; every asymmetric synthesis course uses these reactions.

## Cross-Subject Connections
- **Biology**: fatty acid unsaturation (cis/trans configuration of C=C bonds in lipids) controls membrane fluidity; trans fats have different physical properties from cis fats due to the restricted rotation of the C=C bond — a real-world consequence of alkene geometry.
- **Materials**: polyethylene, PVC (poly(vinyl chloride)), polystyrene all derive from alkene monomers; the polymer chain is the product of repeated addition reactions.
- **Environmental**: ethylene gas (ethene) is a plant hormone (triggers fruit ripening); also the world's most-produced organic chemical (50+ million tonnes/year) for plastics production.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.hyd.alkenes`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.hyd.alkenes` as of 2026-07-23.

## Curriculum Feedback
- The comparative summary table (all addition reactions × regiochemistry × stereochemistry) is one of the most revision-useful pedagogical artefacts for this concept; the platform should consider a structured table format for the Assessment and Teaching Sequence sections.
- Ozonolysis is covered here briefly; if there is a dedicated node for oxidative cleavage reactions, ozonolysis should have a KG cross-link from this node.

## Version History
- v1.0.0 — 2026-07-24 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
