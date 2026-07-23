# VSEPR Theory — `chem.bond.vsepr`

## Identity
- **KG ID**: chem.bond.vsepr
- **Subject**: chemistry
- **Domain**: chem.bond
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.bond.covalent-bonding
- **Unlocks**: chem.bond.polar-molecules

## Learning Objective
Apply VSEPR theory to predict the electron geometry and molecular geometry of any main-group compound, determine bond angles including the effect of lone pairs, and name molecular geometries using the standard nomenclature.

## Core Understanding
VSEPR (Valence Shell Electron Pair Repulsion) theory: electron domains in the valence shell of a central atom arrange themselves as far apart as possible in three-dimensional space to minimise repulsion. An electron domain is any region of electron density: a single bond, double bond, triple bond, or lone pair each count as one electron domain.

**Repulsion hierarchy**: lone pair–lone pair (LP–LP) > lone pair–bond pair (LP–BP) > bond pair–bond pair (BP–BP). Lone pairs repel more strongly because they are held only by one nucleus (more diffuse, closer to the central atom) rather than two.

**Electron geometry vs. molecular geometry**: electron geometry describes the arrangement of ALL electron domains; molecular geometry describes only the arrangement of ATOMS (atoms at the non-lone-pair positions). These differ whenever lone pairs are present.

**Standard VSEPR geometries table**:

| Electron domains | Lone pairs | Electron geometry | Molecular geometry | Ideal bond angle |
|---|---|---|---|---|
| 2 | 0 | linear | linear | 180° |
| 3 | 0 | trigonal planar | trigonal planar | 120° |
| 3 | 1 | trigonal planar | bent | <120° |
| 4 | 0 | tetrahedral | tetrahedral | 109.5° |
| 4 | 1 | tetrahedral | trigonal pyramidal | <109.5° |
| 4 | 2 | tetrahedral | bent | <109.5° |
| 5 | 0 | trigonal bipyramidal | trigonal bipyramidal | 90°/120° |
| 5 | 1 | trigonal bipyramidal | see-saw | <90°/<120° |
| 5 | 2 | trigonal bipyramidal | T-shaped | <90° |
| 5 | 3 | trigonal bipyramidal | linear | 180° |
| 6 | 0 | octahedral | octahedral | 90° |
| 6 | 1 | octahedral | square pyramidal | <90° |
| 6 | 2 | octahedral | square planar | 90° |

**Lone-pair angle compression**: each lone pair on the central atom compresses the bond angles slightly below the ideal. Examples: CH₄ (4 BP, 0 LP): 109.5°; NH₃ (3 BP, 1 LP): ~107°; H₂O (2 BP, 2 LP): ~104.5°. The compression is approximately 2.5° per lone pair substitution (empirical estimate).

**Trigonal bipyramidal lone pair placement**: lone pairs prefer equatorial positions (three equatorial positions, 120° apart) over axial positions (two axial positions, 90° from equatorial) because equatorial positions have fewer 90° interactions (more severe repulsion than 120° interactions).

**Double/triple bonds in VSEPR**: treated as single electron domains. A double bond repels more than a single bond (more electron density), so angles adjacent to a double bond are compressed slightly. Example: H₂C=O, the H–C–H angle is <120° (the C=O domain repels more strongly than a C–H domain).

## Mental Models
**The balloon cluster model**: tie different-sized balloons (lone pairs = larger balloons; bond pairs = smaller) at a central point. They arrange to minimise overlap. The cluster shape depends on how many balloons of each type are tied together. The VSEPR geometry is the shape of the cluster; the molecular geometry is the shape you see if you make the large balloons invisible.

**The electron cloud spreading model**: electron domains are electron-dense regions; like-charge clouds repel; they push each other to the maximum possible separation. The geometry at each domain count is the one that maximises the minimum angle between any two domains.

## Why Students Fail
Students count BONDS rather than ELECTRON DOMAINS — they ignore lone pairs on the central atom when determining geometry. NH₃ has 3 bonds but 4 electron domains (including the lone pair); predicting "trigonal planar" for NH₃ is the classic error.

Students confuse electron geometry with molecular geometry — they name the electron geometry (tetrahedral for NH₃) instead of the molecular geometry (trigonal pyramidal).

Students forget that double bonds count as ONE electron domain in VSEPR — they count C=O as "two bonds" and assign 5 domains to CO₂ when there are only 2 (both double bonds counted as 1 each).

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Double bonds count as two electron domains." Probe: "How many electron domains does the central C in CO₂ have?" Characteristic phrase: "CO₂ has 4 bonds (2 double bonds = 4 single bonds), so 4 electron domains." Intervention: a double bond occupies ONE region of space (one electron domain), regardless of how many electron pairs it contains; CO₂ has 2 electron domains (both C=O) → linear geometry.
- **MC-2 (Type 5 — instruction-induced)**: "The molecular geometry IS the electron geometry." Probe: "What is the molecular geometry of H₂O?" Characteristic phrase: "H₂O is tetrahedral." Intervention: H₂O has tetrahedral ELECTRON geometry (4 electron domains), but molecular geometry (atom arrangement) is BENT (only 2 atoms around O; the lone pairs are not counted as "atoms" in naming the shape).
- **MC-3 (Type 1 — overgeneralization)**: "Lone pairs are always at equatorial positions in trigonal bipyramidal molecules." Probe: "Where are the lone pairs in XeF₄ (octahedral electron geometry, 2 lone pairs)?" Intervention: the equatorial-preference rule applies specifically to TRIGONAL BIPYRAMIDAL electron geometry (5 electron domains); in octahedral geometry (6 electron domains), the two lone pairs go TRANS to each other (both axial → square planar molecular geometry), NOT equatorial (which doesn't exist in an octahedral arrangement).
- **MC-4 (Type 2 — perceptual intuition)**: "More electrons in a double bond should cause MORE repulsion, opening the angle." Probe: "In H₂C=O, what is the H–C–H angle compared to the ideal 120°?" Intervention: the double bond domain IS bigger and repels more, but this repulsion pushes the H atoms TOGETHER (compresses H–C–H), not further apart; the C=O pushes on both C–H bonds simultaneously, squeezing H–C–H below 120°.

## Analogies
**Valid**: Balloon cluster (see Mental Models) — well-established analogy in chemistry education; directly demonstrates that the geometry is determined by minimising crowding, and that larger balloons (lone pairs) push smaller ones closer together.

**Anti-analogy**: Do NOT describe VSEPR as "electrons choose their positions." Electrons don't make choices; the geometry is the energy minimum configuration for charge distributions that repel each other.

## Demonstrations
**Molecular model kits**: build CH₄, NH₃, H₂O with a physical model kit; physically show that removing a bonded atom (replacing a bond pair with a lone pair) while keeping the overall electron domain geometry changes the molecular geometry name. The change in bond angle is observable.

**Balloon demonstration**: tie 2, 3, 4, 5, or 6 long balloons at a central knot; observe the linear, trigonal planar, tetrahedral, trigonal bipyramidal, and octahedral arrangements spontaneously forming. Iconic chemistry demonstration; directly embeds the electron-domain principle.

**3D visualisation**: using molecular modelling software or interactive VSEPR tables, display the 3D shape and bond angles for: BeCl₂ (linear), BCl₃ (trigonal planar), NH₃ (trigonal pyramidal), H₂O (bent), PCl₅ (trigonal bipyramidal), SF₆ (octahedral), ClF₃ (T-shaped), XeF₄ (square planar). Students predict before viewing.

## Discovery Questions
1. "IO₂F₂⁻ has iodine as the central atom with 2 I–O bonds, 2 I–F bonds, and one lone pair. What is the electron geometry and molecular geometry?"
2. "SF₄ has 4 S–F bonds and 1 lone pair on S. Sketch both possible arrangements of the lone pair (axial vs equatorial). Which is favoured by VSEPR and why?"
3. "Predict the geometry of XeO₃ (Xe has 3 double bonds and 1 lone pair in one Lewis structure). How does this compare to SO₃ which also has 3 bonds but no lone pair on S?"

## Teaching Sequence
1. **Establish the core principle**: electron domains repel; maximum separation = minimum energy; demonstrate with balloon analogy.
2. **Define electron domain**: bond (single/double/triple) = 1 domain; lone pair = 1 domain.
3. **Electron geometry for 2–6 domains** (no lone pairs): linear, trigonal planar, tetrahedral, trigonal bipyramidal, octahedral — build and name each.
4. **Molecular geometry with lone pairs**: NH₃ and H₂O; distinguish electron geometry from molecular geometry; name both correctly.
5. **Lone pair angle compression**: quantify the NH₃ → H₂O trend; explain repulsion hierarchy (LP–LP > LP–BP > BP–BP).
6. **5-domain lone pair placement**: SF₄ and ClF₃ with lone pairs in equatorial positions; explain using 90° vs. 120° repulsion count.
7. **6-domain lone pair placement**: SF₆ → SF₅⁻ (square pyramidal) → XeF₄ (square planar with two trans lone pairs).
8. **Double bonds in VSEPR**: apply to CO₂, SO₂, H₂C=O; confirm double bonds = one electron domain.

## Tutor Actions
- **If student omits lone pairs in electron domain count**: ask "look at the Lewis structure — are there any lone pairs ON the central atom?" Make this a mandatory step in the algorithm.
- **If student names electron geometry instead of molecular geometry**: ask "what does the molecular geometry describe?" (atom positions only); "can you see lone pairs in the molecule's shape?" (no); name the shape based on atom positions only.
- **If student places lone pairs in axial position in SF₄**: ask "how many 90° angles does an axial lone pair have vs. an equatorial lone pair?" (axial: 3 equatorial bonds at 90°; equatorial: only 2 axial bonds at 90°) → axial lone pair has more severe repulsions → equatorial is favoured.
- **FRAGILE sign**: names all presented geometries correctly but makes errors when a novel molecule requires counting both lone pairs AND multiple bonds as one domain each.

## Voice Teaching Notes
The two-step process (electron geometry → molecular geometry) must become a ritual. Say it aloud every time: "Step 1: electron geometry from domain count. Step 2: molecular geometry from atom positions only." Students who skip step 1 always get confused about lone pairs.

"Electron domain" vs. "lone pair" — students often conflate these; be explicit: lone pairs are a TYPE of electron domain, not a separate concept.

For younger students: physical model kits or the balloon demonstration is more effective than table-memorisation; let the 3D shape be discovered, then name it, rather than naming first and building second.

## Assessment Signals
- **Green**: correctly predicts both electron geometry and molecular geometry for all rows of the standard table; explains why lone pairs compress angles; explains equatorial lone-pair preference in trigonal bipyramidal geometry.
- **Amber**: correct geometry for 2–4 electron domains but struggles with expanded octets (5–6 domains); or confuses electron and molecular geometry name.
- **Red**: counts double bonds as 2 electron domains; ignores lone pairs on the central atom; names only the electron geometry for molecules with lone pairs.
- **Probe**: "Determine the molecular geometry and approximate bond angles of (a) ClF₃, (b) XeF₄, (c) SO₂."

## Tutor Recovery Strategy
If student consistently confuses electron and molecular geometry: introduce a "lone pair invisibility" rule explicitly — "molecular geometry is what you see when the lone pairs become invisible." Have the student draw the electron geometry first (naming all domains); then physically cross out the lone pairs from the diagram; the remaining atom arrangement is the molecular geometry. This visual deletion step makes the distinction concrete.

## Memory Hooks
- **Domain count to geometry**: "2=linear, 3=trigonal planar, 4=tetrahedral, 5=trigonal bipyramidal, 6=octahedral."
- **Lone pair compression**: "More lone pairs → smaller bond angles. LP–LP > LP–BP > BP–BP repulsion."
- **5-domain lone pair placement**: "Lone pairs go equatorial in trigonal bipyramidal (fewer 90° angles = less repulsion)."

## Transfer Connections
- **chem.bond.polar-molecules**: molecular polarity depends on molecular geometry (the vector sum of bond dipoles); VSEPR determines the geometry required to calculate the dipole vector sum.

## Cross-Subject Connections
- **Biology (enzyme active sites)**: the three-dimensional geometry of active site amino acids is determined by VSEPR-governed bond angles around every sp³/sp²/sp central atom; the lock-and-key specificity of enzymes depends on precise molecular geometry.
- **Materials science (crystal field theory)**: coordination compound geometry around metal ions is often octahedral or tetrahedral — these VSEPR-predicted geometries at the metal centre determine splitting patterns and magnetic properties.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.bond.vsepr`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.bond.vsepr` as of 2026-07-23.

## Curriculum Feedback
None. Unlocking chem.bond.polar-molecules is appropriate; polarity requires knowledge of molecular geometry established here.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
