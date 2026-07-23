# Conformational Analysis — `chem.hyd.conformations`

## Identity
- **KG ID**: chem.hyd.conformations
- **Subject**: chemistry
- **Domain**: chem.hyd
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.hyd.alkanes
- **Unlocks**: (none — terminal node)

## Learning Objective
Draw and interpret Newman projections for ethane and butane; identify and rank conformers by torsional and steric strain; distinguish chair and boat conformations of cyclohexane; identify axial and equatorial positions; and predict the most stable chair conformer for substituted cyclohexanes.

## Core Understanding
**Conformations vs. configurations**:
Conformations are spatial arrangements of a molecule that interconvert by ROTATION about a single bond without breaking any bonds. They are not isomers — they are the SAME molecule in different shapes. At room temperature, alkanes rotate rapidly about C–C bonds; the various conformations are populated according to a Boltzmann distribution.

**Newman projections (ethane)**:
Newman projections view down a C–C bond; the front carbon is a dot (with bonds to three H atoms drawn at 120° apart) and the rear carbon is a circle (with its three bonds drawn from the circle's edge, also at 120°).

- **Staggered ethane** (dihedral angle between front and rear H = 60°): H atoms are as far apart as possible → minimum torsional strain (Pitzer strain). Maximum stability. H–H distance ~0.25 nm.
- **Eclipsed ethane** (dihedral angle = 0°): front and rear H atoms directly overlap → torsional strain ~12 kJ/mol. Eclipsed ≠ stable; this is the maximum energy conformation.
- Rotation about C–C gives a periodic energy profile with minima at staggered conformations and maxima at eclipsed (period 60°).

**Newman projections (butane) — four canonical conformers**:
View down the C2–C3 bond of butane (two CH₃ groups on front and rear carbons):

| Name | Dihedral angle (CH₃–CH₃) | Stability | Energy |
|---|---|---|---|
| Anti | 180° | Most stable | Lowest |
| Gauche | 60° or 300° | Second most stable | ~3.8 kJ/mol above anti |
| Eclipsed (gauche) | 120° | Less stable | Intermediate |
| Fully eclipsed | 0° | Least stable | ~19 kJ/mol above anti |

- **Anti conformation**: two large CH₃ groups as far apart as possible → minimum steric (van der Waals) repulsion. Most stable.
- **Gauche conformation**: CH₃ groups at 60° — partial steric clash (gauche interaction ≈ +3.8 kJ/mol per gauche pair).
- **Fully eclipsed**: CH₃ groups directly eclipsing each other — MAXIMUM steric strain (eclipsing + CH₃/CH₃ steric clash) → least stable conformer.

**Ring strain (Baeyer strain)** in cycloalkanes:
- Cyclopropane: 60° internal angles vs. sp³ ideal 109.5° → severe ring strain (~115 kJ/mol).
- Cyclobutane: puckered (to reduce torsional strain), angles ~88°, moderate strain.
- Cyclopentane: near strain-free; slightly puckered (envelope conformation) to minimise torsional strain.
- **Cyclohexane**: adopts the CHAIR conformation — all internal angles ~111° (very close to 109.5°), all C–H bonds fully STAGGERED → essentially strain-free (residual torsional or angle strain negligible).

**Cyclohexane chair conformation**:
- In the chair, alternating carbons point up or down. The 12 C–H bonds come in two types:
  - **Axial bonds**: parallel to the ring's vertical axis, alternating up/down around the ring (6 axial).
  - **Equatorial bonds**: roughly in the plane of the ring, angled slightly up/down (6 equatorial).
- At any given carbon, if the axial bond points up, the equatorial bond points slightly downward, and vice versa.
- **Ring flip (chair-to-chair interconversion)**: at room temperature, cyclohexane rapidly interconverts between the two chair conformers (~50 kJ/mol barrier — measurable but fast at RT). On ring flip: ALL axial bonds become equatorial and vice versa.
- **Boat conformation**: highest energy of the common cyclohexane conformers — two C–H bonds on the "prow" and "stern" are eclipsing each other (flagpole interaction: ~3 kJ/mol per pair of flagpole H atoms; torsional strain in the four equatorial CH₂ groups). Energy ~30 kJ/mol above chair.

**Substituted cyclohexanes**:
- A substituent in the EQUATORIAL position is more stable than in the AXIAL position for bulky groups. In the axial position, the substituent experiences 1,3-diaxial interactions (steric clash with the two axial H atoms on the same side of the ring, three bonds away). Equatorial substituents point outward from the ring, avoiding these interactions.
- **A-value**: energy cost of placing a group in the axial vs. equatorial position. CH₃: A-value ≈ 7.3 kJ/mol (axial methyl ≈ 7.3 kJ/mol LESS stable than equatorial). t-Bu: A-value ≈ 22.8 kJ/mol → t-Bu essentially locks the ring in the conformation with t-Bu equatorial.
- For disubstituted cyclohexanes: the more stable chair is the one with the LARGER group equatorial. If both groups cannot both be equatorial in either chair → find the minimum 1,3-diaxial strain sum.

## Mental Models
**Staggered/eclipsed as a zipper**: eclipsed ethane is like a zipper half-zipped — the teeth (H atoms) are pushing against each other (torsional strain). Staggered is the fully aligned (open) zipper — maximum spacing. Rotation "unzips" through eclipsed to the next staggered.

**Axial/equatorial in cyclohexane as a reclining chair with armrests**: the six equatorial bonds stick outward from the "armrests" of the chair (comfortable, roomy) while the axial bonds stick straight up or down from the "seat" and "head/feet" (cramped, causing 1,3-diaxial interactions with the neighbours in those axial positions). Big groups prefer the armrest position (equatorial).

## Why Students Fail
Students draw the eclipsed conformation as the most stable (confusing "fully overlapping" with "interlocking gears = stable"). They draw Newman projections with the wrong number of bonds per carbon (6 bonds per C — impossible). In cyclohexane, they confuse axial and equatorial, especially after ring flip. They also forget that ring flip interconverts axial and equatorial — a group that was axial in one chair is equatorial in the other.

## Misconceptions
- **MC-1 (Type 2 — perceptual intuition)**: "The eclipsed conformation is the most stable because the bonds overlap more and sharing increases stability." Probe: "If the H atoms on front and rear carbons point toward each other (dihedral = 0°), does their proximity stabilise or destabilise the molecule?" Characteristic phrase: "more overlap = more stable." Intervention: BOND overlap stabilises (covalent bond formation) but non-bonding H–H proximity at 0° dihedral does NOT constitute a bond — it is a VAN DER WAALS REPULSION (at distances shorter than the sum of van der Waals radii, repulsion increases steeply). This torsional strain (Pitzer strain) is typically attributed to repulsion between bonding electrons in the C–H bonds on front vs. rear carbon (hyperconjugative model). The staggered conformation minimises this repulsion. The "more overlap = more stable" reasoning is incorrect for non-bonded atoms.
- **MC-2 (Type 4 — notation-induced)**: "In a Newman projection of ethane, each carbon has 6 bonds shown." Probe: "Count the bonds on the front carbon in the Newman projection. How many do you see? How many bonds does carbon have in total?" Characteristic phrase: "front carbon has three bonds shown plus the bond to rear carbon = four." Intervention: this is actually CORRECT — the Newman projection shows 3 bonds to the front carbon (the three C–H bonds, drawn as lines from the central dot) plus the C–C bond (implied as the line of sight through the dot into the circle). The rear carbon also shows 3 bonds (drawn from the circle's edge). Total per C = 4 bonds, consistent with carbon's valence. The misconception arises when students draw 6 lines per carbon or omit the implied C–C bond. The Newman projection is a PROJECTION — the C–C bond is the viewing direction, represented by the dot/circle pair, not drawn as a line.
- **MC-3 (Type 5 — instruction-induced)**: "After a ring flip, the cyclohexane ring has the same number of axial and equatorial bonds as before, so the molecule doesn't change." Probe: "If the methyl group on C1 was axial before a ring flip, where is it after the flip?" Characteristic phrase: "the ring just changes shape but the substituents stay in the same place." Intervention: ring flip INTERCONVERTS all axial and equatorial positions. Every bond that was AXIAL becomes EQUATORIAL and vice versa. For methylcyclohexane: axial-CH₃ chair (less stable) → ring flip → equatorial-CH₃ chair (more stable). The energy difference between the two conformers is the A-value for the substituent. Saying "substituents don't change" is wrong — their relationship to the ring axis (axial vs. equatorial) completely changes.

## Analogies
**Valid**: 1,3-diaxial interactions are like trying to sit in a cinema seat with your elbows out (axial) when the neighbouring seats (C-3 axial H atoms) are also occupied with elbows out — everyone clashes. Switching to equatorial (elbows in) removes the clash. Large groups (popcorn buckets, large substituents) cause bigger clashes — they overwhelmingly prefer equatorial.

## Demonstrations
**Molecular model kit**: build cyclohexane in chair conformation, label one C with a coloured H (to track axial/equatorial). Perform the ring flip by holding the "seat" carbons and rotating the "footrest" or "backrest" up/down. Students directly observe the axial H becoming equatorial and vice versa. Then build the boat and compare with the chair — flagpole clashes are physically visible.

**CPK or DReidoscope models**: show anti and gauche butane in space-filling models. Students see that in the gauche conformation, the methyl groups are much closer (steric crowding visible) than in anti.

## Discovery Questions
1. "Draw Newman projections for all four canonical conformers of butane (viewed along C2–C3). Rank them in order of increasing energy and explain each energy difference (type and magnitude of strain)."
2. "Predict the most stable chair conformation of trans-1-methyl-4-tert-butylcyclohexane. Draw both chair conformers and explain why one is overwhelmingly preferred. Would cis-1-methyl-4-tert-butylcyclohexane also show a strong preference? Explain."

## Teaching Sequence
1. Conformations: definition (same molecule, rotation about σ bonds, no bond breaking). Not isomers — contrast with stereoisomers.
2. Newman projections: drawing convention (dot = front C, circle = rear C). Ethane: staggered vs. eclipsed; torsional strain; energy profile.
3. Butane: four canonical conformers (anti, gauche, two eclipsed). Steric strain vs. torsional strain. Energy ranking.
4. Ring strain: cyclopropane (high), cyclobutane (moderate), cyclopentane (low), cyclohexane (chair = ~zero).
5. Cyclohexane chair: axial vs. equatorial; drawing the chair correctly. Ring flip: all axial ↔ equatorial.
6. Boat conformation: flagpole interactions; boat energy vs. chair.
7. Substituted cyclohexanes: equatorial preferred for bulky groups; A-values; disubstituted examples.

## Tutor Actions
- **If student says eclipsed is most stable**: draw a Newman projection and ask "What is the distance between the H atoms on front and rear carbons in the eclipsed form? As atoms approach closer than their van der Waals radius sum, does the energy go up or down?" (Up — repulsion.) "So eclipsed has HIGHER energy — it is LEAST stable."
- **If student forgets ring flip swaps axial/equatorial**: physically draw two chairs for the same molecule with different "positions" of the foot/head, and label the CH₃ group in each. "Was it axial? Now it is equatorial." Make it explicit before asking them to determine the more stable conformer.
- **FRAGILE sign**: can draw Newman projections correctly but cannot rank conformers by energy OR cannot identify axial vs. equatorial in a three-dimensional chair drawing without help.

## Voice Teaching Notes
Newman projections in voice require careful narration of the drawing convention before any question. In voice: "I want you to look along the C1–C2 bond. Describe what you see: a dot with three bonds (front carbon) and a circle with three bonds at the edges (rear carbon). Now the dihedral angle between the front H and the nearest rear H is what we need to state. What angle makes the conformation staggered?" (60° between adjacent front and rear bonds.) Anchor the dihedral angle visually before asking for conformer name or energy.

## Assessment Signals
- **Green**: draws Newman projections correctly for ethane and butane; correctly names and ranks all four butane conformers by energy; explains torsional strain (ethane) and steric + torsional strain (butane eclipsed); draws cyclohexane chair correctly; identifies axial and equatorial bonds; explains ring flip (axial ↔ equatorial); predicts the more stable chair for a monosubstituted cyclohexane; explains 1,3-diaxial interaction.
- **Amber**: draws correct Newman projections but cannot rank conformer energies; or can identify axial/equatorial but cannot predict which chair is more stable after ring flip.
- **Red**: says eclipsed conformation is most stable; draws 6 bonds per carbon in Newman projection; says ring flip doesn't change axial/equatorial positions.
- **Probe**: "Draw both chair conformers of methylcyclohexane. Identify the axial and equatorial positions of the methyl group in each. Explain which is more stable and by approximately how much (use the A-value concept). If a ring flip occurs, what happens to the methyl group?"

## Tutor Recovery Strategy
If student cannot draw a correct cyclohexane chair: give a step-by-step recipe. "(1) Draw a W shape — four C atoms in a zigzag. (2) Add the 5th C above the right end and 6th C below the left end of the W. (3) Connect them. (4) Now add axial bonds: up from every other C, down from the rest (alternating). (5) Add equatorial bonds: on each C, the equatorial bond goes in the opposite direction to the axial and is angled outward." Walk through this construction for one full chair before asking the student to draw one independently.

## Memory Hooks
- **Ethane**: "Staggered = stable (60° apart). Eclipsed = unstable (torsional strain, 0°). ΔE ≈ 12 kJ/mol."
- **Butane conformers**: "Anti (180°) most stable. Gauche (60°) +3.8 kJ/mol. Fully eclipsed (0°) least stable +19 kJ/mol."
- **Cyclohexane**: "Chair = stable (all staggered, angles ~111°). Boat = unstable (eclipsed bonds + flagpole clash)."
- **Ring flip**: "Axial ↔ Equatorial (all of them, simultaneously)."
- **Equatorial preference**: "Big group → equatorial → avoids 1,3-diaxial clashes. t-Bu locks the ring."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for conformational analysis.

## Cross-Subject Connections
- **Biochemistry**: protein folding and enzyme active-site geometry depend critically on backbone dihedral angles (φ, ψ in the Ramachandran map). These are the protein-chain analogues of the ethane/butane dihedral angles; steric strain in backbone conformations determines secondary structure (α-helix, β-sheet). The language of conformational analysis (dihedral, gauche, anti, staggered, eclipsed) is directly imported into structural biology.
- **Drug design**: the preferred conformation of flexible drug molecules (global minimum energy conformer in solution vs. bioactive conformation at the receptor) is a central problem in computational chemistry and pharmacology. Cyclohexane ring conformations in drug scaffolds (e.g., glucose analogs, steroid-inspired drugs) are explicitly designed to place key pharmacophore groups in equatorial positions.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.hyd.conformations`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.hyd.conformations` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
