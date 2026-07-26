# Diols and Polyols — `chem.alc.diols`

## Identity
- **KG ID**: chem.alc.diols
- **Subject**: Chemistry
- **Domain**: Alcohols (chem.alc)
- **Prerequisites**: chem.alc.alcohols
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 1.5

## Learning Objective
Describe the structural features and naming of diols and polyols, explain the enhanced hydrogen-bonding properties that elevate boiling points and water-miscibility relative to monoalcohols, predict the products of pinacol rearrangement, and connect glycerol's structure to its role in fats and glycerine.

## Core Understanding
**Definition**: a diol (glycol) carries two hydroxyl groups; a polyol carries three or more. Key subclasses: **vicinal diols** (OH groups on adjacent carbons, 1,2-diols), **geminal diols** (both OHs on the same carbon — hydrates of aldehydes/ketones, unstable and rarely isolable), and **non-adjacent diols** (1,3-diols, 1,4-diols etc.). **Nomenclature**: IUPAC appends "-diol" with numbered positions; ethane-1,2-diol (ethylene glycol, EG); propane-1,2,3-triol (glycerol). **Physical properties**: each OH group contributes hydrogen bonding capacity, so diols have strikingly high boiling points (EG bp 197 °C vs. ethanol bp 78 °C despite similar MW — EG has two H-bond donors and two acceptors per molecule), high viscosity, and are miscible with water in all proportions. **Synthesis of vicinal diols**: (a) osmium tetroxide (OsO₄) or cold KMnO₄ — SYN hydroxylation (both OHs added to the SAME face of the alkene); useful for cis-diol synthesis; (b) peracid (RCOOH → epoxide) then base/acid ring-opening — ANTI hydroxylation (OHs end up on opposite faces); (c) bromination (anti) then SN2 displacement gives anti diol; (d) Sharpless asymmetric dihydroxylation (OsO₄ + chiral ligand) gives enantiopure diol. **Chemical reactions of diols**: (1) Periodate cleavage (IO₄⁻): cleaves vicinal diols at the C–C bond between the two OH-bearing carbons; each carbon becomes a carbonyl (CHO if CH, C=O if R₂C); quantitative, used analytically to locate diol units in sugars; (2) **Pinacol rearrangement** (1,2-diol + acid): acid protonates one OH → water leaves → secondary or tertiary carbocation → 1,2-alkyl or aryl shift → more stable oxocarbenium ion → ketone (pinacolone); driving force = more stable C+ (3° or resonance-stabilised); (3) Esterification with two equivalents of acid → diester; (4) Cyclic boronate esters (useful in sugar chemistry). **Glycerol** (propane-1,2,3-triol): the backbone of all triglycerides (triacylglycerols); the three OHs are esterified by fatty acids in fats and oils; hydrolysis of fats (saponification) regenerates glycerol + fatty acid soaps; glycerol itself is a humectant, emollient (cosmetics), and used in nitroglycerin synthesis (a trinitrate ester, explosive).

## Mental Models
- **Two OH-groups = double anchoring**: each vicinal diol molecule holds onto water and neighbouring molecules via TWO sets of H-bonds; this roughly doubles viscosity and boiling point relative to a monoalcohol of similar MW.
- **OsO₄ = syn (same side); anti addition → anti diol**: remember the mnemonic "OsO₄ = SYN" (the osmium atom delivers both oxygens simultaneously from one face of the double bond); this directly sets the stereochemistry of the diol product.
- **Pinacol rearrangement = alcohol → ketone via migration**: the 1,2-shift (alkyl or aryl migrates to the adjacent carbocation) is the same mechanism as carbocation rearrangement in SN1/elimination, but here it is driven by formation of a stable oxocarbenium ion → ketone. The product is ALWAYS a ketone (or aldehyde), never a diol.

## Why Students Fail
- Confusing OsO₄ (syn dihydroxylation) with Br₂/H₂O (bromohydrin = anti addition, OH anti to Br); students apply anti where syn is correct.
- Forgetting that periodate cleaves the C–C bond, not just the OH groups; students predict oxidation to carboxylic acids rather than two carbonyl fragments.
- In the pinacol rearrangement, failing to identify which OH leaves first (the one that forms the more stable carbocation) and which group migrates (the one that best stabilises the positive charge → highest-priority migrating group).

## Misconceptions
1. **"Periodate oxidises each OH of a vicinal diol separately to give two carboxylic acids"** (Type 1 — overgeneralization from monoalcohol oxidation: students know OH → COOH via strong oxidants and map this to both OHs, missing the C–C bond cleavage that is periodate's signature reaction).
   - Probe: "What are the products of treating (CH₃)₂C(OH)–C(OH)(CH₃)₂ with NaIO₄?"
   - Characteristic phrase: "each OH oxidises to give a ketone and then further to an acid"
   - Intervention: periodate forms a cyclic ester intermediate with BOTH oxygens simultaneously; the ring collapses by breaking the C–C bond. For pinacol: (CH₃)₂C(OH)–C(OH)(CH₃)₂ → 2 equivalents of acetone (propanone). No C–C bond survives periodate cleavage.

2. **"OsO₄ gives anti addition, like Br₂"** (Type 5 — instruction-induced: anti addition is taught first and more prominently for Br₂/H₂O; students over-apply it to every dihydroxylation).
   - Probe: "What diol is obtained when cis-but-2-ene reacts with OsO₄ and then H₂O₂ workup?"
   - Characteristic phrase: "OsO₄ adds anti like Br₂ so the OHs are on opposite faces"
   - Intervention: OsO₄ reacts via a concerted [3+2] cycloaddition forming a cyclic osmate ester; BOTH oxygens are delivered from the SAME face → syn diol. Cis-but-2-ene + OsO₄ → (2R,3R)- and (2S,3S)-butane-2,3-diol (the meso compound would come from anti addition and trans starting alkene — help students draw this out).

3. **"The pinacol rearrangement converts a diol into an ether or an alkene, not a ketone"** (Type 2 — perceptual intuition: seeing two OHs and an acid, students think condensation to ether or dehydration to alkene — the typical outcomes of monoalcohol under acid — rather than the 1,2-shift rearrangement to a carbonyl).
   - Probe: "What is the major product of treating pinacol (2,3-dimethylbutane-2,3-diol) with dilute H₂SO₄?"
   - Characteristic phrase: "acid + diol → water leaves → ether" or "H₂SO₄ dehydrates to alkene"
   - Intervention: the first step IS protonation → water departure → carbocation (3° at the quaternary carbon). Then instead of another dehydration, a methyl group MIGRATES to the adjacent carbon bearing an OH, forming an oxocarbenium ion (stabilised by O lone pair) → pinacolone (3,3-dimethylbutan-2-one). The 1,2-shift is thermodynamically driven by the greater stability of C=O over C=C (pi BDE ~~357 vs. ~260 kJ/mol).

## Analogies
- **Good**: OsO₄ dihydroxylation is like a staple gun — the staple (osmium atom bridged to two oxygens) is pushed into one face of the alkene, pinning both oxygens to the same face simultaneously; you cannot get anti-addition from a single staple.
- **Anti-analogy**: Do NOT say "strong oxidant + diol = two carboxylic acids" without specifying the reagent; periodate gives C–C cleavage to carbonyls; KMnO₄ hot/acidic gives C–C cleavage to carboxylic acids from internal diols; the reagent identity completely changes the product class.

## Demonstrations
- **Glycerol viscosity**: pour glycerol and compare to water — the extraordinary viscosity (1000× water) demonstrates multi-H-bond cooperative interaction even though glycerol has low MW.
- **Periodate sugar cleavage**: add NaIO₄ to mannitol (sugar alcohol, vicinal diol at every bond); watch the solution turn acidic (formaldehyde + formic acid generated); demonstrates the analytical power of periodate counting diol units.

## Discovery Questions
1. Predict the products when (R,R)-butane-2,3-diol is cleaved with NaIO₄.
2. What is the product of OsO₄ oxidation of cyclohexene? What would Br₂/H₂O give? Draw both and compare stereochemistry.
3. In the pinacol rearrangement of 3-methyl-3-phenylbutane-2,3-diol, which group migrates preferentially — methyl or phenyl? Explain using the principle of migration aptitude (Ph > alkyl > H).
4. How does ethylene glycol function as antifreeze? Use colligative property reasoning.

## Teaching Sequence
1. **Review monoalcohol reactions** from chem.alc.alcohols; establish OH group count as a structural variable.
2. **Define diol classes**: vicinal (1,2-), geminal (unstable), non-adjacent; nomenclature.
3. **Physical properties**: compare EG, glycerol bp and viscosity to monoalcohols; H-bonding as cumulative.
4. **Synthesis of vicinal diols**: OsO₄ (syn); peracid + ring-opening (anti); introduce Sharpless as an advanced mention.
5. **Periodate cleavage**: draw the cyclic ester intermediate; show C–C bond breaking; work one numerical example.
6. **Pinacol rearrangement**: mechanism step-by-step; identify which OH leaves first; identify which group migrates; show pinacolone product.
7. **Glycerol and biological significance**: triglyceride structure; saponification; industrial uses.

## Tutor Actions
- **If student confuses OsO₄ with anti-addition**: draw the cyclic osmate ester intermediate; both oxygens are covalently attached to Os before delivery — they must arrive together from one face.
- **If student predicts wrong periodate product**: ask "periodate forms a cyclic ester with which two atoms?" — both oxygens; "what bond breaks when the ring collapses?" — the C–C bond.
- **If pinacol rearrangement product is wrong**: ask "which carbocation forms after the first water departs?" and "which group migrates to make that C+ even more stable?" — walk the two steps explicitly.

## Voice Teaching Notes
- "OsO₄ = syn. Br₂ = anti. Never mix these up." — repeat as a rule before any dihydroxylation problem.
- "Periodate cuts the C–C bond. Oxidants like KMnO₄ cut the C–C bond AND oxidise. But periodate just cuts — you get two carbonyl fragments."
- "Pinacol rearrangement: one OH leaves → 1,2-shift → oxocarbenium ion → ketone. If you don't see a ketone product, you made an error in step 3 or 4."

## Assessment Signals
- **Green**: predicts OsO₄ → syn diol and Br₂ → anti diol correctly; applies periodate to give two carbonyl fragments from a vicinal diol; correctly identifies the migrating group and ketone product in the pinacol rearrangement.
- **Amber**: correct diol product but wrong stereochemistry; can do periodate cleavage but not pinacol rearrangement.
- **Red**: confuses syn and anti in dihydroxylation; predicts periodate gives carboxylic acids; cannot draw the pinacol mechanism.

## Tutor Recovery Strategy
- OsO₄ anti-error: draw the Os atom covalently bonded to both oxygens; ask "can a single Os atom simultaneously deliver one O to the top face and one to the bottom?" — no; therefore syn addition is geometrically enforced.
- Periodate confusion: use a simple numerical example (EG → 2 formaldehyde); show that no COOH is formed; confirm product by noting the characteristic color/smell tests for aldehydes.
- Pinacol rearrangement failure: scaffold the problem into three questions (1. Which C+ forms? 2. What migrates? 3. What is the C=O product?) and require answers to each in sequence.

## Memory Hooks
- **OsO₄ = SYN (Osmium = Same Side)**
- **Periodate = C–C cut → two carbonyls** (not carboxylic acids)
- **Pinacol → pinacolone: diol → ketone via 1,2-shift**
- **Glycerol = triglyceride backbone; saponification releases it**
- **Diol bp >> monoalcohol bp: each OH doubles H-bonding anchor points**

## Transfer Connections
- **Alkene chemistry** (chem.hyd.alkenes): OsO₄ is an alternative to Br₂/H₂O for diol synthesis; choice of reagent selects stereochemical outcome.
- **Carbonyl chemistry** (chem.carb.aldehydes/ketones): pinacol rearrangement produces a ketone; periodate cleavage produces aldehydes or ketones from diol C–C bonds — diols are upstream carbonyl precursors.
- **Colligative properties** (chem.sol.colligative): ethylene glycol antifreeze depresses freezing point of water; ΔTf = Kf × m × i; for EG i = 1 (non-electrolyte) but high molality → large depression.
- **Lipid biochemistry**: glycerol is the triol backbone of all triglycerides; diol and triol chemistry underpins fat hydrolysis and resynthesis.

## Cross-Subject Connections
- **Biology**: glycerol is released during lipolysis (fat breakdown); phospholipids carry a glycerol-based backbone; glycerol kinase phosphorylates glycerol → enters glycolysis; the diol structure of sugars (ribose, deoxyribose) is biologically essential.
- **Materials**: polyester synthesis from diols + diacids (e.g., EG + terephthalic acid → PET); polyurethane synthesis uses polyols; these are among the most commercially important diol applications.
- **Food science**: glycerol (E422) is a food-approved humectant, keeping baked goods moist by retaining water via H-bonding — a direct macroscopic consequence of the multi-OH structure.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.alc.diols`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.alc.diols` as of 2026-07-23.

## Curriculum Feedback
- The pinacol rearrangement is a key example of carbocation rearrangement in a diol context; it should be cross-linked to chem.hal.sn1 (where 1,2-shifts are introduced) so students see the same mechanism applied in two settings.
- OsO₄ dihydroxylation and the Sharpless asymmetric version are closely tied to chem.hyd.alkenes; a KG cross-link from chem.alc.diols → chem.hyd.alkenes (beyond the existing prerequisite) would make retrosynthetic planning clearer.

## Version History
- v1.0.0 — 2026-07-24 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
