# Bonding in Complexes — `chem.coord.bonding`

## Identity
- **KG ID**: chem.coord.bonding
- **Subject**: chemistry
- **Domain**: chem.coord
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.coord.cft, chem.bond.mo-theory
- **Unlocks**: (none — terminal node)

## Learning Objective
Describe valence bond theory (VBT) hybridization for octahedral, square planar, and tetrahedral complexes; explain the limitations of VBT; and introduce ligand field theory (LFT) and MO theory as quantitative improvements, explaining how σ and π donation/back-donation from ligands determine Δ.

## Core Understanding
**Valence Bond Theory (VBT) applied to coordination compounds**:
VBT proposes that the metal uses hybrid atomic orbitals to form coordinate bonds with ligand lone pairs.

- **Octahedral complexes** (6-coordinate):
  - Inner orbital complexes (low-spin, strong-field ligands): d²sp³ hybridization using two (n−1)d orbitals + one ns + three np. Example: [Co(NH₃)₆]³⁺ — Co³⁺ uses (3d)²(4s)(4p)³ = d²sp³ → diamagnetic (electrons paired in the inner d orbitals before hybridization).
  - Outer orbital complexes (high-spin, weak-field ligands): sp³d² hybridization using ns + np³ + two nd orbitals (outer shell). Example: [CoF₆]³⁻ — Co³⁺ uses 4s, 4p³, 4d² = sp³d² → paramagnetic (electrons remain unpaired in inner 3d).
  - Experimental test: measure magnetic moment μ = √[n(n+2)] BM; back-calculate unpaired electrons n to determine hybridization class.

- **Square planar complexes** (4-coordinate, d⁸ metals — Ni²⁺, Pd²⁺, Pt²⁺, Au³⁺):
  - dsp² hybridization: one (n−1)d_{x²−y²} + ns + two np (px, py) → 4 coplanar orbitals. The remaining d orbitals remain on the metal. [Ni(CN)₄]²⁻ is diamagnetic → d⁸ with one d orbital vacated for hybridization → strong-field CN⁻ forces pairing in the other four d orbitals.
  - [NiCl₄]²⁻ is tetrahedral (sp³, paramagnetic) not square planar — Cl⁻ is a weak-field ligand insufficient to force square planar geometry for Ni²⁺.

- **Tetrahedral complexes** (4-coordinate):
  - sp³ hybridization. Example: [NiCl₄]²⁻, [CoCl₄]²⁻. Always outer orbital / high-spin (Δ_tet = 4/9 Δ_oct is too small to overcome pairing energy).

**Limitations of VBT**:
1. Cannot predict or explain the MAGNITUDE of the splitting (Δ) — treats all ligands equally; cannot explain the spectrochemical series.
2. Cannot explain WHY certain ligands produce low-spin vs. high-spin — simply assigns hybridization after the fact based on experimental magnetic data.
3. Does not explain the colour of complexes (d–d absorption energies cannot be computed).
4. Cannot predict the geometries of complexes without knowing the number of unpaired electrons experimentally first.
5. No quantitative treatment of bond energies or transition energies.

**Ligand Field Theory (LFT) and MO Theory — introduction**:
LFT is an adaptation of MO theory that models the d orbitals in the environment of the ligand field (a more rigorous version of CFT). Key additions:

- **σ-donor ligands** (NH₃, H₂O, amines): donate lone pair into metal's empty σ* orbital → raise energy of t₂g and e_g, but RAISE e_g more (which forms σ* with metal). The e_g orbitals become σ antibonding (σ*). Δ depends on σ-donor strength.
- **π-donor ligands** (F⁻, Cl⁻, OH⁻, O²⁻): fill filled π orbitals (ligand) to interact with metal t₂g. π-donation raises the energy of the metal t₂g → REDUCES Δ (weak-field). Halides and oxo-donors are π-donors → small Δ → high spin.
- **π-acceptor ligands** (CO, CN⁻, NO⁺, alkenes): have empty π* antibonding orbitals that ACCEPT electron density from the filled metal t₂g (π back-donation: metal d → ligand π*). This LOWERS the energy of the t₂g orbital (stabilised by back-donation) → INCREASES Δ (strong-field). CO and CN⁻ are the strongest-field ligands because they are the best π acceptors. Spectrochemical series position is directly linked to π-acceptance ability.

MO diagram for [ML₆] (simplified):
- Bonding MOs (σ): 6 from ligand σ donation → filled, mainly ligand character.
- Nonbonding/weakly antibonding: t₂g (metal d_xz, d_yz, d_xy, not pointing at ligands).
- Antibonding: e_g* (σ*) — high energy; HOMO–LUMO gap = Δ.
- π interaction: shifts t₂g up (π-donor) or down (π-acceptor) relative to pure σ-only picture.

## Mental Models
**VBT as a post-hoc labelling exercise**: VBT tells you WHICH hybrid orbitals are used AFTER you already know the geometry and spin state from experiment. It is a language, not a predictive framework. MO/LFT is the predictive framework — it explains why a ligand is strong-field or weak-field from first principles (π-acceptor vs. π-donor character).

**π-backdonation as electron traffic reversal**: normally the ligand gives electrons to the metal (σ-donation = ligand → metal). In π-backdonation the traffic reverses — the metal donates electrons from filled t₂g into the ligand's empty π* (metal → ligand). This mutual sharing (synergistic bonding: σ donation + π back-donation) is why CO binds so strongly to metals — it gets a double dose of stabilisation.

## Why Students Fail
Students use VBT to "predict" hybridization from first principles, not realising that VBT requires the experimental magnetic moment FIRST to determine how many d electrons are promoted before hybridization. They also confuse π-donor (raises t₂g, DECREASES Δ) with π-acceptor (lowers t₂g, INCREASES Δ) — getting the spectrochemical series prediction backwards.

## Misconceptions
- **MC-1 (Type 4 — notation-induced)**: "d²sp³ hybridization means two d orbitals + one s + three p = six hybrid orbitals, which is the same as sp³d² — so inner and outer orbital complexes are equivalent." Probe: "Which d orbitals are used in d²sp³ vs. sp³d²?" Characteristic phrase: "same six orbitals, just written differently." Intervention: d²sp³ uses the (n−1)d inner d orbitals (e.g. 3d² in a first-row complex), while sp³d² uses the outer nd orbitals (4d² in the same row). These are DIFFERENT orbitals with different energies and radial extents. Inner orbital complexes are typically low-spin (stronger metal–ligand overlap, stronger Δ), while outer orbital complexes are high-spin. The notation order matters.
- **MC-2 (Type 5 — instruction-induced)**: "π-donor ligands are strong-field because they donate more electron density to the metal." Probe: "If a ligand donates electron density into the t₂g orbital, does the energy of t₂g go up or down? And what happens to Δ?" Characteristic phrase: "more donation = stronger field." Intervention: π-DONORS fill filled t₂g-based MOs with electron density from ligand π orbitals → interaction raises the energy of the metal t₂g → Δ DECREASES (t₂g and e_g get closer). More donation from a π-donor WEAKENS the field. π-ACCEPTORS lower t₂g by back-donation → Δ INCREASES. The direction of the interaction (who gives to whom) determines the effect on Δ, not the amount of electron density alone.
- **MC-3 (Type 6 — analogy overextension)**: "MO theory proves that VBT is wrong — so VBT should not be used at all." Probe: "For which questions is VBT still the simplest useful model?" Characteristic phrase: "VBT is outdated and wrong." Intervention: VBT correctly predicts GEOMETRY and MAGNETIC BEHAVIOUR in many cases (d²sp³ → octahedral, diamagnetic; sp³ → tetrahedral, paramagnetic) from hybridization, and it does so in a conceptually simple way that matches qualitative experimental observations. VBT is LIMITED but not wrong for what it claims. MO/LFT is needed for spectroscopy, bond energies, π-effects, and quantitative Δ. Different theories serve different questions; VBT retains pedagogical value as an entry point.

## Analogies
**Valid**: VBT is like a paper map — it tells you where the roads are but cannot tell you traffic speeds. MO/LFT is a GPS with real-time data — it predicts how fast you can travel and why some routes are congested (high-spin) or clear (low-spin) based on the actual landscape (ligand field).

## Demonstrations
**Magnetic susceptibility**: measure the magnetic moment of [Co(NH₃)₆]³⁺ (diamagnetic, d²sp³) and [CoF₆]³⁻ (paramagnetic, sp³d²). The contrast is direct experimental evidence for different hybridization and spin states. In laboratory, a simple magnetic balance or Evans NMR method distinguishes para- from diamagnetic species.

## Discovery Questions
1. "Using VBT, determine the hybridization and number of unpaired electrons for [Fe(CN)₆]⁴⁻ (Fe²⁺, d⁶) and [Fe(H₂O)₆]²⁺ (Fe²⁺, d⁶). Justify your prediction using the spectrochemical series. Then explain why VBT could not have predicted this result from first principles without knowing the ligand field strength."
2. "CO is a stronger-field ligand than NH₃. Using MO/LFT arguments (π back-donation), explain why CO produces a larger Δ. Predict the C–O bond order in a metal carbonyl complex [M(CO)₆] compared to free CO, and explain the change."

## Teaching Sequence
1. VBT recap: metal uses hybrid AOs to accept ligand lone pairs. Inner orbital (d²sp³, strong-field, low-spin) vs. outer orbital (sp³d², weak-field, high-spin). Square planar: dsp², d⁸, strong-field. Tetrahedral: sp³.
2. Determine hybridization from magnetic moment (experimental → theory, not theory → prediction).
3. VBT limitations: list explicitly (no Δ prediction, no colour, no spectrochemical series).
4. MO/LFT introduction: σ-only picture → Δ arises from σ interaction. Add π-donor: raises t₂g → reduces Δ. Add π-acceptor: lowers t₂g (back-donation) → increases Δ. Connect to spectrochemical series.
5. Synergistic bonding in metal carbonyls: σ-donation + π-back-donation. IR evidence (C–O stretch frequency decreases with more back-donation).

## Tutor Actions
- **If student predicts hybridization "from first principles" using VBT**: immediately ask "What does VBT require you to know before you can assign hybridization?" (Experimental magnetic data = number of unpaired electrons = spin state.) Force the student to acknowledge VBT's dependency on prior experimental knowledge.
- **If student says π-donors increase Δ**: draw the MO energy diagram. "π-donor fills an orbital that RAISES t₂g energy. If t₂g goes up, does the gap Δ between t₂g and e_g get larger or smaller?" (Smaller — both go up but t₂g goes up more.) "So π-donors are weak-field. Which ligands in the spectrochemical series are π-donors? Confirm: F⁻, Cl⁻ — both at the weak-field end."
- **FRAGILE sign**: knows d²sp³ vs. sp³d² labels but cannot explain what "inner" vs. "outer" means in terms of orbital identity, or cannot predict the effect of a π-donor vs. π-acceptor on Δ without prompting.

## Voice Teaching Notes
The π-donor/acceptor direction confusion is the single most important distinction in this entry. In voice: "I want you to trace the electron flow direction for a π-donor. Ligand π lone pair → metal t₂g? Or metal t₂g → ligand π*?" Force the student to name the direction, then immediately connect to energy consequence. Repeat the process for π-acceptors with the reversed direction.

## Assessment Signals
- **Green**: assigns correct hybridization (d²sp³, sp³d², dsp², sp³) with justification; states 5 limitations of VBT explicitly; correctly predicts π-donor effect (↑t₂g, ↓Δ) and π-acceptor effect (↓t₂g, ↑Δ); correctly explains CO's position at the top of the spectrochemical series via π-back-donation.
- **Amber**: correct hybridization assignments but cannot explain the limitations of VBT or the π-interaction effects on Δ.
- **Red**: predicts hybridization from first principles (without using experimental magnetic data); says π-donors increase Δ; says sp³d² and d²sp³ are the same hybridization.
- **Probe**: "[Ni(CN)₄]²⁻ is square planar and diamagnetic. [NiCl₄]²⁻ is tetrahedral and paramagnetic. (a) Assign hybridization to each using VBT. (b) Explain using MO/LFT why CN⁻ forces square planar geometry while Cl⁻ does not for Ni²⁺. (c) Predict the effect of replacing CN⁻ with CO in [Ni(CO)₄] on Δ, using the π interaction framework."

## Tutor Recovery Strategy
If student cannot distinguish inner from outer orbital complexes: use a concrete orbital diagram. Draw the 3d, 4s, 4p, 4d energy levels. Mark which orbitals are used in d²sp³ (all inner shell: 3d × 2 + 4s × 1 + 4p × 3) vs. sp³d² (mixed: 4s × 1 + 4p × 3 + 4d × 2). The visual separation between the 3d (inner) and 4d (outer) energy levels makes the "inner" vs. "outer" labelling physically meaningful rather than arbitrary.

## Memory Hooks
- **VBT hybridizations**: "Octahedral: inner = d²sp³ (low-spin); outer = sp³d². Square planar: dsp² (d⁸, strong-field). Tetrahedral: sp³."
- **VBT limitation mantra**: "VBT cannot predict Δ, colour, or which ligands give low vs. high spin — it describes AFTER the fact."
- **π interactions**: "π-DONOR raises t₂g → REDUCES Δ → weak-field (F⁻, Cl⁻). π-ACCEPTOR lowers t₂g (back-donation) → INCREASES Δ → strong-field (CO, CN⁻)."
- **CO/CN⁻ strong field**: "Best π-acceptors = top of spectrochemical series. Back-donation: metal t₂g → ligand π*."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for coordination bonding theory.

## Cross-Subject Connections
- **Organometallic chemistry**: the π back-donation model is central to understanding metal carbonyl stability, Wilkinson's catalyst, and Ziegler-Natta catalysis — all of which depend on the t₂g → ligand π* interaction to both bind and activate substrates.
- **Physical chemistry / spectroscopy**: IR stretching frequency of C–O in metal carbonyls directly measures the extent of back-donation (more back-donation → weaker C–O → lower ν(C–O)). This is a quantitative experimental probe of the MO picture.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.coord.bonding`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.coord.bonding` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
