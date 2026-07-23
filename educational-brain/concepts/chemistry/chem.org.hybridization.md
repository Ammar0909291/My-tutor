# Hybridization in Organic Molecules — `chem.org.hybridization`

## Identity
- **KG ID**: chem.org.hybridization
- **Subject**: chemistry
- **Domain**: chem.org
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.bond.hybridization
- **Unlocks**: chem.hyd.alkanes, chem.org.aromaticity, chem.org.electronic-effects, chem.org.isomerism

## Learning Objective
Assign hybridization states to every carbon (and relevant heteroatoms N, O) in a given organic structure, connect hybridization to bond angles and molecular geometry, and use hybridization to predict planarity, conjugation, and restricted rotation in organic systems.

## Core Understanding
This node applies the general hybridization rules from chem.bond.hybridization directly to organic molecules. The key operational skill is: **count electron domains on each atom → assign hybridization → derive geometry and angles**.

**Carbon hybridization states in organic chemistry**:
- **sp³ carbon** (4 σ bonds, 0 π bonds): tetrahedral, 109.5°. All σ bonds from hybridised sp³ orbitals. Examples: methane CH₄, ethane C₂H₆, all alkane carbons, sp³ C in alcohols/ethers/amines.
- **sp² carbon** (3 σ bonds, 1 π bond): trigonal planar, 120°. One unhybridised 2p orbital perpendicular to the plane → sideways overlap with adjacent unhybridised p → π bond. Examples: ethylene C₂H₄ (both C sp²), benzene (all 6 C sp²), carbonyl group C=O in aldehydes/ketones (C sp²), carboxylic acids (carbonyl C sp²).
- **sp carbon** (2 σ bonds, 2 π bonds): linear, 180°. Two unhybridised p orbitals → two mutually perpendicular π bonds → triple bond. Examples: ethyne HC≡CH (both C sp), nitriles R–C≡N (C sp), carbon in CO₂ (sp, 180°).

**Heteroatoms**:
- **Oxygen in alcohols/ethers** (–OH, –O–): 2 bonds + 2 lone pairs → sp³; bent geometry like water; 104–109° bond angle.
- **Oxygen in carbonyl** (C=O): 1 double bond + 2 lone pairs → sp² (3 electron domains); lone pairs in sp² and unhybridised p; contributes to conjugation.
- **Nitrogen in amines** (–NH₂): 3 bonds + 1 lone pair → sp³ (pyramidal); compare to ammonia.
- **Nitrogen in imines/pyridine** (C=N–, aromatic N): sp² (lone pair in sp² orbital in the plane, unhybridised p in the π system).
- **Nitrogen in pyrrole**: sp², lone pair in unhybridised p (contributes 2 electrons to aromatic π system — different from pyridine where N lone pair is sp², in-plane, not part of the aromatic π system).

**Planarity**: a molecule or fragment is PLANAR if all atoms involved are sp² (their unhybridised p orbitals all point in the same direction → can overlap). An sp³ carbon in a ring breaks planarity. All-sp² systems (benzene, amide group –CO–NH–) are flat.

**Restricted rotation**: π bonds arise from sideways overlap of unhybridised p orbitals. Rotating around a C=C double bond would break this overlap → very high energy barrier (~260 kJ/mol) → rotation does not occur under normal conditions → gives rise to geometric (cis/trans) isomerism. σ bonds have free rotation (low barrier ~12 kJ/mol for ethane).

**Conjugation**: consecutive sp² atoms allow p orbital overlap extending over multiple atoms. Conjugated systems (alternating σ and π bonds: C=C–C=C, benzene, amide –CO–NH–) are stabilised by delocalisation (lower energy than isolated double bonds). Consequence: amide bond has partial double-bond character and restricted rotation (barrier ~80 kJ/mol), important in protein secondary structure.

**Quick assignment procedure for organic structures**:
1. Look at the bond type to each C: single bond = σ, double bond = σ+π, triple bond = σ+2π.
2. Count bonds: 4 bonds all single → sp³; 3 bonds (one double) → sp²; 2 bonds (one triple or two doubles) → sp.
3. Lone pairs on C: never in ordinary organic molecules (radical C is a special case).
4. For heteroatoms: count bonds + lone pairs as electron domains → sp³ if 4 domains, sp² if 3, sp if 2.

## Mental Models
**The p-orbital antenna**: an sp² carbon has one unhybridised 2p orbital sticking straight up (and down) perpendicular to the trigonal plane — like a vertical antenna. Adjacent sp² carbons have parallel antennas. When the antennas are parallel, they broadcast to each other (π bond or conjugation); when sp³ appears, the antenna is gone — transmission stops and conjugation breaks.

**The geometry-tells-you rule**: if a bond angle at a carbon is 109.5° → sp³; if ~120° → sp²; if 180° → sp. Geometry (observable, measurable) is the most direct experimental indicator of hybridization.

## Why Students Fail
Students assign hybridization to C by counting only BONDS and forgetting lone pairs on heteroatoms (N, O). An amine nitrogen with 3 bonds and a lone pair is sp³ (4 electron domains), NOT sp² — unless it is part of an aromatic ring or a conjugated system where the lone pair must enter the π system.

Students confuse pyridine-N (sp², lone pair in-plane, not aromatic) with pyrrole-N (sp², lone pair in p, part of π system). This distinction matters for basicity and aromatic electron counts.

## Misconceptions
- **MC-1 (Type 1 — overgeneralization)**: "All nitrogen atoms in organic molecules are sp³ because nitrogen has a lone pair." Probe: "What is the hybridization of the nitrogen atom in pyridine?" Characteristic phrase: "N always has a lone pair, so N is always sp³." Intervention: when N is double-bonded to C (C=N) or in an aromatic ring where it contributes a lone pair to the π system, N is sp² (3 electron domains: 2 bonds + lone pair, OR 3 bonds with one double bond). The lone pair's LOCATION (sp² in-plane vs. unhybridised p in π system) determines the hybridization count, not just its presence.
- **MC-2 (Type 5 — instruction-induced)**: "The carbonyl oxygen (C=O) is sp³ because it has two lone pairs and a double bond, giving 4 electron domains." Probe: "How many σ bonds does the oxygen in C=O have?" Characteristic phrase: "double bond + 2 lone pairs = 4 domains for oxygen." Intervention: the oxygen in C=O forms ONE σ bond (to C), ONE π bond (to C — counts as one domain), and has TWO lone pairs. Total electron domains on O = σ bond (1) + π bond (1, counted as one domain) + lone pairs (2) = NOT 4 separate domains — the double bond counts as ONE domain (just as in VSEPR). So O in C=O has 3 domains: 1 double bond + 2 lone pairs → sp².
- **MC-3 (Type 4 — notation-induced)**: "A carbon with two double bonds (e.g. CO₂, allene) is sp² because it has double bonds." Probe: "What is the hybridization and geometry of the central C in CO₂?" Characteristic phrase: "C=O means sp² because C=O is a double bond." Intervention: C in CO₂ has TWO double bonds → 2 electron domains → sp hybridisation → linear (180°). sp² has 3 electron domains (one double bond + something else). Count electron domains, don't pattern-match on "has a double bond."

## Analogies
**Valid**: Hybridization as a mixing desk. An sp³ carbon puts all four mixing channels equally into the four sp³ hybrid outputs (all equivalent bonds). An sp² carbon uses three channels for sp² hybrids (the trigonal σ bonds) and leaves one channel unmixed (the raw 2p → the π bond). An sp carbon uses two channels for sp hybrids and leaves two raw (two perpendicular π bonds). The "mixing ratio" directly determines the shape and the number of π bonds possible.

## Demonstrations
**Molecular model building**: use a physical model kit to build ethane (all sp³, 109.5°, free rotation), ethylene (sp² carbons, flat, 120°, cannot rotate without breaking the model's π bond connector), and ethyne (sp carbons, linear, 180°). Hold each model up and show: rotation is free in ethane, blocked in ethylene. The physical click of the double-bond connector stopping rotation is a strong kinesthetic memory.

## Discovery Questions
1. "Aspirin (acetylsalicylic acid) contains a benzene ring, an ester group (–COOC–), and an aromatic hydroxyl. Assign the hybridization of every non-hydrogen atom in aspirin and identify all planar regions."
2. "The peptide bond (–CO–NH–) has restricted rotation with a barrier of ~80 kJ/mol, much higher than a typical C–N single bond (~12 kJ/mol). Explain this using hybridization and conjugation. Why does this matter for protein structure?"

## Teaching Sequence
1. Recap chem.bond.hybridization counting rule: electron domains → sp/sp²/sp³.
2. Apply to all three C types in organic molecules with canonical examples.
3. Extend to heteroatoms: O in alcohol vs. carbonyl; N in amine vs. imine vs. aromatic.
4. Planarity: sp² regions are flat; sp³ breaks planarity.
5. Restricted rotation: π bond = blocked rotation; consequences (geometric isomerism, peptide bond).
6. Conjugation preview: what happens when sp² carbons line up (link to aromaticity and electronic effects).

## Tutor Actions
- **If student assigns sp² to all C in a double bond without checking heteroatom lone pairs**: ask "how many electron domains does the carbonyl OXYGEN have?" and walk through: 1 double bond (1 domain) + 2 lone pairs (2 domains) = 3 → sp².
- **If student confuses sp and sp²**: show CO₂ (two double bonds → 2 domains → sp → linear 180°) vs. formaldehyde H₂C=O (one double bond + two H → 3 domains → sp² → 120°). The number of DOMAINS, not the presence of a double bond, is the discriminator.
- **FRAGILE sign**: correctly assigns sp³/sp²/sp to carbon but cannot predict whether a molecule or region is planar.

## Voice Teaching Notes
Organic hybridization is the single most reused concept across all of organic chemistry — it underlies conformational analysis, geometric isomerism, aromaticity, electronic effects, and NMR (sp, sp², sp³ carbons have distinct ¹H and ¹³C chemical shifts). Treat it as a tool, not a topic: every time a new organic structure appears, the first question is "what is the hybridization of each non-H atom?" until that becomes automatic.

## Assessment Signals
- **Green**: assigns hybridization to every atom in an unfamiliar organic structure without hesitation; identifies planar vs. non-planar regions; explains restricted rotation; distinguishes pyridine-N from pyrrole-N.
- **Amber**: correct for C but wrong for N or O (especially lone pair domain count); or correct hybridization but cannot predict planarity.
- **Red**: assigns sp² to all double bond carbons without counting domains; assigns sp³ to all nitrogen atoms; cannot identify which bonds have restricted rotation.
- **Probe**: "Draw the structure of acrylonitrile (CH₂=CH–CN). Assign hybridization to every non-hydrogen atom. Identify which portions are planar and whether there is restricted rotation about the C–C single bond between the vinyl group and the nitrile."

## Tutor Recovery Strategy
If student confuses sp and sp²: use the one-number trick — "sp has 2 domains (linear); sp² has 3 domains (trigonal planar); sp³ has 4 domains (tetrahedral). Count the domains first, then look up the label. Never look at the label first." Drill on three examples: ethyne (count: 2 domains per C → sp), ethylene (3 domains per C → sp²), ethane (4 domains per C → sp³). When the counting is automatic, the label always follows.

## Memory Hooks
- **Quick organic hybridization**: "In organic structures: single bonds only → sp³; one double bond → sp²; triple bond or two double bonds → sp."
- **Planarity rule**: "sp² atom = flat at that atom. A chain of sp² atoms = a flat region. One sp³ atom = fold point."
- **Restricted rotation**: "C=C: cannot rotate (π overlap breaks). C–C: free rotation. Peptide bond: ~sp² character → restricted."

## Transfer Connections
- **chem.org.aromaticity**: aromaticity requires ALL ring atoms to be sp² with overlapping unhybridised p orbitals → the 4n+2 π electron criterion; this node's sp² planarity concept is the structural prerequisite.
- **chem.org.electronic-effects**: inductive (through σ bonds, depends on orbital electronegativity: sp > sp² > sp³) and resonance effects (through conjugated sp² systems only) both depend on hybridization; this node provides the structural foundation.
- **chem.org.isomerism**: geometric (cis/trans) isomerism requires restricted rotation → requires a double bond → requires sp² carbons at that bond; hybridization is the structural explanation.

## Cross-Subject Connections
- **Biology**: protein secondary structure (α-helix, β-sheet) is enforced by the planarity and restricted rotation of peptide bonds (sp² carbonyl C, sp² amide N) → the Ramachandran plot defines allowed backbone angles; RNA/DNA base-pairing geometry is determined by the sp² hybridization of all aromatic ring atoms in nucleobases.
- **Materials science**: graphene is all-sp² carbon → delocalised π system → metallic conductivity; diamond is all-sp³ → σ bonds only → electrical insulator. The hybridization IS the property.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.org.hybridization`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.org.hybridization` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
