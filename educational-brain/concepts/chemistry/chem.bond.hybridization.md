# Hybridization — `chem.bond.hybridization`

## Identity
- **KG ID**: chem.bond.hybridization
- **Subject**: chemistry
- **Domain**: chem.bond
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.bond.covalent-bonding
- **Unlocks**: chem.bond.mo-theory, chem.org.hybridization

## Learning Objective
Determine the hybridization of a central atom from the number of electron domains (bonding pairs + lone pairs), predict the geometry and bond angles of molecules using hybridization, and explain why unhybridized p orbitals give rise to π bonds while hybridized orbitals give σ bonds.

## Core Understanding
Hybridization is a mathematical model — a way of describing the mixing of atomic orbitals to form a new set of equivalent hybrid orbitals that better explain observed molecular geometries. It is NOT a physical process that occurs when a bond forms; it is a conceptual tool. The geometry comes first (from VSEPR or experiment); hybridization rationalises it.

**Hybridization determination algorithm**:
1. Draw the Lewis structure of the central atom.
2. Count electron domains (ED) on the central atom: each single bond = 1 ED; each double bond = 1 ED; each triple bond = 1 ED; each lone pair = 1 ED.
3. Assign hybridization: 2 ED = sp; 3 ED = sp²; 4 ED = sp³; 5 ED = sp³d; 6 ED = sp³d².

**sp hybridization** (2 electron domains):
- Two sp orbitals, two unhybridized p orbitals.
- Linear geometry: 180° bond angle.
- Examples: BeCl₂ (0 lone pairs), C₂H₂ (each C: 1 σ bond to H + 1 triple bond = 2 ED), CO₂ (each O is also sp).
- Each sp orbital participates in a σ bond; the two remaining p orbitals participate in two π bonds (for triple bond).

**sp² hybridization** (3 electron domains):
- Three sp² orbitals, one unhybridized p orbital perpendicular to the sp² plane.
- Trigonal planar electron geometry: 120° bond angles (if no lone pairs on central atom).
- Examples: BF₃ (0 lone pairs), CH₂=CH₂ (each C: 3 σ bonds), SO₃, NO₃⁻.
- The unhybridized p orbital forms the π bond in a double bond.

**sp³ hybridization** (4 electron domains):
- Four sp³ orbitals, no unhybridized p.
- Tetrahedral electron geometry: 109.5° ideal bond angles.
- Examples: CH₄ (0 lone pairs, 109.5°), NH₃ (1 lone pair, pyramidal, ~107°), H₂O (2 lone pairs, bent, ~104.5°); lone pairs compress bond angles from 109.5°.
- Note: every bond in an sp³ compound is a σ bond; no π bonds present.

**σ and π bond accounting**:
- Every single bond = 1 σ bond.
- Every double bond = 1 σ + 1 π.
- Every triple bond = 1 σ + 2 π.
- Hybridized orbitals ALWAYS form σ bonds (head-on overlap).
- Unhybridized p orbitals form π bonds (sideways overlap).
- A molecule with n total bonds has n − (number of π bonds) σ bonds and (number of double bonds + 2 × number of triple bonds − number of double bonds − ... actually: total π = double bonds + 2 × triple bonds).

**σ bond count** = total bonds (counting each double bond as 1 and each triple as 1) = total bond lines in Lewis structure.
**π bond count** = (number of double bonds × 1) + (number of triple bonds × 2).

Example: CH₃–CH=CH–C≡N: draw bonds, count σ (every bond line = 1 σ): 8 σ bonds; count π: 1 (from C=C) + 2 (from C≡N) = 3 π bonds.

**sp³d and sp³d²** (expanded octets, period 3+ only):
- sp³d: 5 ED, trigonal bipyramidal electron geometry (PCl₅, SF₄, ClF₃, XeF₂).
- sp³d²: 6 ED, octahedral electron geometry (SF₆, XeF₄, BrF₅).
- Lone pairs preferentially occupy equatorial sites in sp³d (larger, farther from other EDs).

## Mental Models
**The blender model**: imagine the s and p orbitals as ingredients in a blender. Blend 1 s + 1 p → 2 sp hybrid orbitals. Blend 1 s + 2 p → 3 sp² hybrid orbitals. Blend 1 s + 3 p → 4 sp³ hybrid orbitals. Whatever you blend becomes new equivalent hybrid orbitals; what you don't blend stays as unhybridised p orbitals available for π bonding.

**The ED counting shortcut**: "The hybridization superscript plus 1 equals the number of electron domains." sp¹ (or just sp) = 2 ED; sp² = 3 ED; sp³ = 4 ED. Memorise the mapping and the geometry follows automatically.

**σ = head-on, π = side-on**: visualise the electron clouds. Head-on overlap between two hybrid orbitals → σ bond (rotation allowed). Side-on overlap between two unhybridised p orbitals → π bond (rotation blocked — must keep p orbitals parallel).

## Why Students Fail
Students count bonds instead of electron domains — they ignore lone pairs, giving sp instead of sp³ for NH₃. Always count ALL electron domains (bonds AND lone pairs) on the central atom.

Students believe hybridization determines bond angle exactly, forgetting that lone pairs compress angles below the ideal (109.5° → 107° for NH₃ → 104.5° for H₂O).

Students confuse molecular geometry (shape defined by atom positions) with electron geometry (shape defined by ALL electron domains); a bent molecule (H₂O) has a tetrahedral electron geometry with two lone pairs.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Lone pairs don't count as electron domains for hybridization." Probe: "What is the hybridization of N in NH₃?" Characteristic phrase: "N has 3 bonds so it's sp²." Intervention: N in NH₃ has 3 bonding pairs + 1 lone pair = 4 electron domains → sp³; the lone pair occupies a hybridized sp³ orbital; ignoring lone pairs in the ED count is the most common source of hybridization errors.
- **MC-2 (Type 2 — perceptual intuition)**: "Hybridization physically happens when atoms approach — the orbitals really mix." Probe: "When does hybridization occur?" Intervention: hybridization is a mathematical description of the final wavefunction, not a temporal process; it is equally valid to describe bonding without hybridization using molecular orbital theory; hybridization is a model, not a mechanism.
- **MC-3 (Type 1 — overgeneralization)**: "All atoms in a molecule have the same hybridization." Probe: "In CH₃–CH=CH₂, what is the hybridization of each carbon atom?" Intervention: each central atom is hybridized independently; the three carbons are sp³ (CH₃), sp² (CH=), and sp² (=CH₂) respectively.
- **MC-4 (Type 5 — instruction-induced)**: "Double bond = sp² and that means the geometry is ALWAYS 120°." Probe: "Why is the H–N=O bond angle in HNO₂ different from 120°?" Intervention: the ideal is 120° for 3 ED with no lone pairs; lone pairs on the central atom and electronegativity effects modify the real angle; sp² establishes the ELECTRON geometry (trigonal planar), not a fixed bond angle.

## Analogies
**Valid**: Hybridization is like mixing paint colours: red + blue → two portions of purple. The original red and blue no longer exist independently; what you have is two equivalent purple orbitals. If you only mix two of three colours available, the third remains as the original.

**Anti-analogy**: Do NOT describe hybridization as "the atom prepares itself before bonding by promoting an electron." This is a common textbook model but implies hybridization is a real energy cost (promotion + hybridization) — the energy accounting is more complex; it is better to treat hybridization as a description of the final state, not a step-by-step mechanism.

## Demonstrations
**VSEPR model kits**: build CH₄ (tetrahedral, 109.5°), NH₃ (pyramidal, 107°), H₂O (bent, 104.5°). All three are sp³; the geometry changes because lone pairs are present, not because hybridization changes. This directly addresses the lone-pair-as-domain misconception.

**Ethylene rigidity**: demonstrate that a double-bonded carbon model (C₂H₄) cannot rotate by physically blocking the rotation — the side-on p-p overlap (π bond) must be maintained; rotating breaks it. Contrast with the ethane (C₂H₆) model, which rotates freely.

## Discovery Questions
1. "What is the hybridization of each S in the thiosulfate ion S₂O₃²⁻? (One S is bonded to three O and the other S; the other S is bonded only to the first S.) Does hybridization explain the observed structure?"
2. "Formaldehyde (H₂C=O) and acetaldehyde (CH₃CHO) both contain a C=O group. What is the hybridization of each carbon in acetaldehyde?"
3. "Allene (CH₂=C=CH₂) has two cumulated double bonds. What is the hybridization of the central C? What is the geometry around the central C? Are the two CH₂ planes parallel or perpendicular?"

## Teaching Sequence
1. **Review the problem**: explain why observed bond angles (109.5°, 120°, 180°) cannot be explained by pure s and p atomic orbital overlap angles (90° for pure p-p overlap).
2. **Define hybridization as a model**: electron domains counted on the central atom; hybridization follows from ED count.
3. **sp hybridization**: BeCl₂ and C₂H₂; linear geometry; two unhybridised p → two π bonds in the triple bond.
4. **sp² hybridization**: BF₃ and CH₂=CH₂; trigonal planar electron geometry; one unhybridised p → one π bond in the double bond.
5. **sp³ hybridization**: CH₄, NH₃, H₂O; tetrahedral electron geometry; angle compression by lone pairs.
6. **σ/π bond counting**: systematic count for any molecule.
7. **sp³d and sp³d² (brief)**: PCl₅ and SF₆; expand using d orbitals; equatorial preference for lone pairs.
8. **Hybridization as a model critique**: acknowledge that MO theory (chem.bond.mo-theory) handles delocalized systems better.

## Tutor Actions
- **If student omits lone pairs in ED count**: always ask "how many lone pairs are on the central atom?" before assigning hybridization; make the step explicit.
- **If student says geometry = electron geometry**: distinguish the two; ask "if water is sp³, why is it called 'bent' not 'tetrahedral'?" — the lone pairs are invisible in the MOLECULAR geometry description.
- **If student cannot count σ and π bonds**: strip to a single bond first; ask "is a single bond a σ or π bond?" → σ; "is a double bond one bond or two?" → one σ and one π; build up from there.
- **FRAGILE sign**: assigns hybridization correctly for presented examples but cannot derive it for an unfamiliar molecule from first principles.

## Voice Teaching Notes
"How many electron domains?" is the most important question in this topic — make it a ritual opening for every hybridization question; students who ask it first very rarely get the hybridization wrong.

Latency is highest on sp³d/sp³d² — students need to mentally check both the number of bonds and the lone pairs simultaneously for expanded-octet molecules; allow full wait time.

For adult learners: frame hybridization explicitly as a model (not reality) early — they often appreciate the epistemological clarity and resist the "atoms choose to hybridise" narrative.

## Assessment Signals
- **Green**: correctly assigns hybridization AND geometry (including lone pair effect on bond angle) for CH₄, NH₃, H₂O, BF₃, C₂H₂, and PCl₅; correctly counts σ and π bonds in a given molecule.
- **Amber**: correct hybridization for main-group bonds/lone pairs combinations but fails on expanded octets or lone-pair angle compression.
- **Red**: ignores lone pairs in electron domain count; confuses sp² with 120° as an invariant.
- **Probe**: "Determine hybridization, electron geometry, and molecular geometry of SO₂ (S has 2 bonding regions and 1 lone pair, and one resonance structure has a double bond). How many σ and π bonds does SO₂ have?"

## Tutor Recovery Strategy
If student cannot count electron domains correctly: begin with H₂O as a worked example without using the word "hybridization" — ask "how many regions of electrons surround the central O?" (4: 2 bonds + 2 lone pairs); "what shape would 4 regions arrange themselves into?" (tetrahedral); only after the geometry is established, connect: "this 4-domain electron geometry corresponds to sp³ hybridization." The domain count → geometry → hybridization sequence avoids the common shortcut error of guessing the hybridization label before counting.

## Memory Hooks
- **ED count shortcut**: "2 domains = sp; 3 = sp²; 4 = sp³; 5 = sp³d; 6 = sp³d²."
- **σ and π**: "Every bond line in a Lewis structure is one σ bond. Each double bond has one extra π bond. Each triple bond has two extra π bonds."
- **Lone pair check**: "Lone pairs ARE domains — always count them."

## Transfer Connections
- **chem.bond.mo-theory**: molecular orbital theory provides a complementary (and for delocalized systems, superior) description of bonding; hybridization is the stepping stone.
- **chem.org.hybridization**: organic chemistry applies hybridization systematically to carbon chains and functional groups; every mechanism in organic chemistry implicitly uses the sp/sp²/sp³ classification.
- **chem.bond.vsepr**: hybridization and VSEPR are two parallel models for molecular geometry; VSEPR is often taught first (in chem.bond.vsepr), hybridization provides the orbital basis.

## Cross-Subject Connections
- **Biology (protein structure)**: the peptide bond is sp² hybridized (partial double-bond character due to resonance → planar peptide group); this constraint on rotation governs protein secondary structure (α helices, β sheets).
- **Materials science (graphene, diamond)**: graphite/graphene is sp² carbon (delocalized π system across the sheet, conductive); diamond is sp³ carbon (no π, all σ bonds, insulator with very high hardness) — the same element, different hybridization, completely different properties.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.bond.hybridization`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.bond.hybridization` as of 2026-07-23.

## Curriculum Feedback
None. Unlocking chem.bond.mo-theory and chem.org.hybridization is appropriate; hybridization is a prerequisite model for both MO theory (which extends it) and organic structure interpretation.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
