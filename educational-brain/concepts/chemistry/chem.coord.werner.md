# Werner's Theory and Coordination Compounds — `chem.coord.werner`

## Identity
- **KG ID**: chem.coord.werner
- **Subject**: chemistry
- **Domain**: chem.coord
- **Difficulty**: proficient
- **Bloom level**: understand
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.bond.coordinate-bond
- **Unlocks**: chem.coord.cft, chem.coord.nomenclature, chem.coord.stability

## Learning Objective
Describe the key postulates of Werner's coordination theory, define coordination number, coordination sphere, and ligand, and explain how Werner's theory resolved the anomalous bonding in compounds such as CoCl₃·6NH₃.

## Core Understanding
**Historical problem**: Alfred Werner (1893) faced compounds like CoCl₃·6NH₃ that could not be explained by the classical valency theory. Co has valency 3; adding 6 NH₃ molecules was unexplained — why didn't the extra NH₃ just fall off? Electrolytic conductance experiments showed that different amounts of Cl⁻ were free in solution for different "hydrates" of CoCl₃ — some Cl⁻ were "inside" the complex and some "outside."

**Werner's postulates**:
1. Metal atoms have TWO types of valency:
   - **Primary valency** (ionisable, satisfied by anions such as Cl⁻, SO₄²⁻ — these counter-ions dissociate in solution and are outside the coordination sphere).
   - **Secondary valency** (non-ionisable, satisfied by neutral molecules or anions that coordinate directly to the metal — these are inside the coordination sphere and do NOT dissociate).
2. Every metal has a **fixed coordination number** — the number of groups (ligands) directly bonded to it (in its secondary valency sphere), regardless of the primary valency.
3. These groups surround the metal in a definite geometric arrangement (octahedral for CN=6, square planar or tetrahedral for CN=4).

**Key terms**:
- **Central metal ion (CMI)**: the metal atom at the centre of the complex; usually a transition metal with vacant d orbitals (Lewis acid, accepts lone pairs).
- **Ligand**: any ion or molecule that donates at least one lone pair to the CMI via a coordinate (dative covalent) bond. Ligand = Lewis base. Examples: NH₃ (monodentate, 1 donor), en = ethylenediamine (bidentate, 2 donors), EDTA (hexadentate, 6 donors). Anion ligands: Cl⁻ (chlorido), CN⁻ (cyanido), OH⁻ (hydroxido).
- **Coordination number (CN)**: the total number of donor atoms directly bonded to the CMI in the coordination sphere. CN = 2 (linear, e.g. [Ag(NH₃)₂]⁺), 4 (tetrahedral or square planar), 6 (octahedral, most common for transition metals).
- **Coordination sphere**: the CMI plus all its ligands, enclosed in square brackets in the formula.
- **Outer sphere**: the counter-ions (primary valency ions) outside the coordination sphere.

**CoCl₃·6NH₃ resolved**:
- Formula: [Co(NH₃)₆]Cl₃; Co³⁺ is the CMI; 6 NH₃ are ligands (secondary valency); 3 Cl⁻ are counter-ions (primary valency, dissociate freely → 4 ions per formula unit in solution → conductance equivalent to 1:3 electrolyte).
- CoCl₃·5NH₃: [Co(NH₃)₅Cl]Cl₂; 5 NH₃ + 1 Cl⁻ inside (3 donor atoms short of 6 primary); 2 Cl⁻ outside → 3 ions per formula unit in solution.
- CoCl₃·4NH₃: [Co(NH₃)₄Cl₂]Cl; 4 NH₃ + 2 Cl⁻ inside; 1 Cl⁻ outside → 2 ions per formula unit.
- CoCl₃·3NH₃: [CoCl₃(NH₃)₃]; all 3 Cl⁻ inside; 0 outside → non-electrolyte (1 species in solution).
This conductance evidence was Werner's proof — it was later confirmed by precipitation with AgNO₃ (only free Cl⁻ outside the sphere precipitate).

**Charge calculation**: charge on complex = OS of metal + sum of charges of ligands. Counter-ions balance: [Co(NH₃)₆]³⁺ (Co³⁺, 6×0 NH₃) is balanced by 3Cl⁻. [Fe(CN)₆]⁴⁻ (Fe²⁺, 6×(−1) CN⁻ = −6; +2−6 = −4).

**Denticity and chelation**: monodentate ligands bind through one donor atom; bidentate (e.g. en, oxalate ox²⁻) bind through two; chelate effect — bidentate/polydentate ligands form more stable complexes than equivalent monodentate ligands (chelate effect: more positive ΔS on replacing monodentate by chelating ligand; higher stability constant).

## Mental Models
**The onion model**: a coordination compound has two layers, like an onion. The INNER layer (coordination sphere, inside square brackets) contains the metal and its directly bonded ligands — stable, does not break apart unless treated very harshly. The OUTER layer (outer sphere, counter-ions) is the first thing to peel off in water — these ions dissociate freely. Werner's key insight was recognising these two distinct layers where classical theory saw only one.

**The ligand as a hand**: each donor atom of a ligand is a hand offering a lone pair to the metal's empty orbital. A monodentate ligand has one hand (NH₃); a bidentate has two hands (en); EDTA has six. The more hands gripping the metal simultaneously (chelation), the more stable the grip — a single rope tied with one hand is easier to untie than a rope knotted with six.

## Why Students Fail
Students confuse primary and secondary valency — they write all Cl⁻ ions outside the square brackets when some are actually ligands (coordinated), or they put all Cl⁻ inside when some are counter-ions. The test is: if Cl⁻ is inside the bracket, it does NOT precipitate with AgNO₃; if outside, it does. This is the empirical discriminator.

Students confuse coordination number with oxidation state. They are completely different: in [Co(NH₃)₆]Cl₃, the OS of Co is +3 and the CN is 6.

## Misconceptions
- **MC-1 (Type 3 — language contamination)**: "Coordination number is the same as valency or oxidation state." Probe: "In [Co(NH₃)₆]Cl₃, what is the oxidation state and what is the coordination number of Co?" Characteristic phrase: "Co is +6 because it has 6 ligands." Intervention: OS is determined from charge balance (Co + 6×0 NH₃ + 3×(−1) Cl⁻ = 0 overall → Co = +3); CN is the number of donor atoms directly bonded (6 NH₃ → CN = 6). OS and CN are measured by completely different methods and happen to be different numbers here (OS=3, CN=6). They are independent quantities.
- **MC-2 (Type 5 — instruction-induced)**: "All anions in the formula (Cl⁻, Br⁻) are counter-ions outside the coordination sphere." Probe: "Write the formula and charge of the complex ion in CoCl₃·4NH₃." Characteristic phrase: "the Cl atoms are always outside the bracket." Intervention: anions CAN be ligands (inside the bracket) — Cl⁻ is a common ligand (chlorido, monodentate, one lone pair donated). In [Co(NH₃)₄Cl₂]Cl, two Cl⁻ are inside (ligands) and one is outside (counter-ion). The placement depends on whether the Cl⁻ satisfies primary or secondary valency — Werner's precipitation test distinguishes them.
- **MC-3 (Type 1 — overgeneralization)**: "The coordination number of all transition metals in complexes is 6." Probe: "What is the coordination number of silver in [Ag(NH₃)₂]⁺?" Characteristic phrase: "all complexes are octahedral." Intervention: CN is not fixed at 6 for all metals. Ag⁺ and Au⁺ have CN=2 (linear); Cu²⁺ and Ni²⁺ commonly show CN=4 (square planar or tetrahedral); CN=6 (octahedral) is most common for first-row transition metals but is NOT universal.

## Analogies
**Valid**: Werner's theory as the difference between employees at a company (coordination sphere, directly answerable to the CEO/metal) vs. external contractors (outer sphere/counter-ions, loosely associated). When the company dissolves in solution (water), the contractors immediately leave (dissociate) but the core employees stay bound to the CEO (coordination sphere intact). How many contractors leave is precisely measurable by conductance — Werner measured the number of free ions.

## Demonstrations
**AgNO₃ precipitation test**: add AgNO₃ to solutions of [Co(NH₃)₆]Cl₃, [Co(NH₃)₅Cl]Cl₂, [Co(NH₃)₄Cl₂]Cl, and [CoCl₃(NH₃)₃]. The amount of white AgCl precipitate (moles Cl⁻ precipitated per formula unit) is 3, 2, 1, 0 respectively — directly mapping the number of outer-sphere Cl⁻ ions. This is Werner's original evidence, now routine as a demonstration.

## Discovery Questions
1. "A compound with formula PtCl₄·4NH₃ is tested with AgNO₃ and gives a precipitate corresponding to 2 Cl⁻ per formula unit, and its conductance corresponds to a 1:2 electrolyte. Write the coordination formula and determine the OS and CN of Pt."
2. "EDTA (ethylenediaminetetraacetic acid) is hexadentate. Write the formula of the EDTA complex of Ca²⁺ and explain why EDTA is used medicinally to treat heavy metal poisoning — using the chelate effect."

## Teaching Sequence
1. Historical problem: why does CoCl₃ bind NH₃ beyond its valency of 3?
2. Werner's two postulates: primary vs. secondary valency; fixed coordination number.
3. Coordination sphere notation: square brackets, charge calculation.
4. Evidence: conductance and AgNO₃ precipitation for the four CoCl₃/NH₃ series.
5. Ligand types: monodentate, bidentate, polydentate; chelate effect briefly.
6. Key definitions: CMI, ligand, CN, coordination sphere, denticity.

## Tutor Actions
- **If student confuses OS with CN**: write out the two calculations side by side for [Co(NH₃)₆]Cl₃ — OS: "Co + 6(0) + 3(−1) = 0 → Co = +3"; CN: "count donor atoms inside bracket = 6". Make them write both calculations every time until automatic.
- **If student puts all Cl⁻ outside the bracket**: present the AgNO₃ test result for CoCl₃·4NH₃ (precipitates 1 Cl⁻, not 3) as hard evidence; ask "if all 3 Cl⁻ were outside the bracket, how many would precipitate?" (3); "but only 1 does — what does that mean?" (2 Cl⁻ are inside the bracket as ligands).
- **FRAGILE sign**: can name ligands and CMI correctly but cannot write the charge on the complex ion or the overall formula given the compounds' components.

## Voice Teaching Notes
Werner's theory is a beautiful example of resolving a paradox by introducing a second category (secondary valency = coordination sphere). The insight is architectural — "there are two layers" — not a calculation. Teach it as an intellectual story: what was the puzzle, what was the missing concept, what evidence resolved it. Students remember a good story far better than a definition list.

## Assessment Signals
- **Green**: converts between CoCl₃·nNH₃ notation and [Co(NH₃)ₙClₘ]Cl₃₋ₘ notation for all four cases; calculates OS and CN independently; explains AgNO₃ test evidence; defines ligand, CM I, coordination number, chelate effect.
- **Amber**: correct formula notation but cannot calculate OS independently of CN.
- **Red**: equates OS with CN; places all counter-ions outside bracket by default; says CN is always 6.
- **Probe**: "A compound of formula IrCl₃·3PPh₃ does not conduct electricity in solution and does not precipitate AgCl on addition of AgNO₃. Write its coordination formula, state the OS of Ir, and explain the conductance result."

## Tutor Recovery Strategy
If student cannot assign OS from the complex formula: return to the charge-balance rule from chem.redox.oxidation-state (sum of OS = ion charge); apply it step by step: "the complex ion [Co(NH₃)₆]³⁺ has total charge +3; each NH₃ is neutral (0); so OS of Co = +3." Then confirm with a negative-ligand example: [Fe(CN)₆]⁴⁻ — "each CN⁻ is −1; 6 × (−1) = −6; total charge = −4; OS of Fe = −4 − (−6) = +2." The arithmetic is the same as from chem.redox.oxidation-state; only the context (ligand charges instead of atom charges) changes.

## Memory Hooks
- **Two valencies**: "PRIMARY valency = ionisable (counter-ions, OUTSIDE bracket). SECONDARY valency = non-ionisable (ligands, INSIDE bracket)."
- **Charge on complex**: "OS(metal) + Σ(ligand charges) = charge on the complex ion."
- **AgNO₃ test**: "Only OUTER SPHERE Cl⁻ precipitates. Count the precipitate → count the counter-ions → infer the formula."
- **CN ≠ OS**: "CN = ligands bonded. OS = electron bookkeeping. Completely different numbers."

## Transfer Connections
- **chem.coord.nomenclature**: Werner's formula notation (coordination sphere in square brackets, coordination number, ligand names) is the direct basis of the IUPAC systematic nomenclature taught in the nomenclature node.
- **chem.coord.stability**: the chelate effect (bidentate > monodentate, thermodynamic stability) is quantified as the stability constant Kf; the comparison is enabled by Werner's framework.

## Cross-Subject Connections
- **Biology**: haemoglobin and chlorophyll are naturally occurring coordination compounds — Fe²⁺ in haem (CN=6, octahedral, one axial site binds O₂) and Mg²⁺ in porphyrin (CN=4+2 or 6); the coordinate bond between Fe and O₂ is the basis of oxygen transport.
- **Medicine**: cisplatin (cis-[PtCl₂(NH₃)₂], CN=4, square planar) is an anti-cancer drug; its cis geometry allows it to cross-link DNA strands (cis Cl⁻ ligands replaced by N-donors in DNA). The trans isomer is pharmacologically inactive — a direct application of Werner's geometry postulate.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.coord.werner`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.coord.werner` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
