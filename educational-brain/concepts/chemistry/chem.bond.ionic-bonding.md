# Ionic Bonding — `chem.bond.ionic-bonding`

## Identity
- **KG ID**: chem.bond.ionic-bonding
- **Subject**: chemistry
- **Domain**: chem.bond
- **Difficulty**: developing
- **Bloom level**: understand
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.period.ionization-energy, chem.period.electron-affinity
- **Unlocks**: chem.solid.crystal-systems, chem.solid.ionic-solids

## Learning Objective
Explain ionic bond formation in terms of electron transfer driven by electronegativity difference, predict ionic formulas from ion charges, and connect lattice energy to macroscopic properties of ionic compounds.

## Core Understanding
An ionic bond forms when one atom transfers one or more electrons to another, producing oppositely charged ions held together by electrostatic attraction. This occurs when the electronegativity difference between two atoms exceeds approximately 1.7 (Pauling scale), making electron transfer energetically favorable compared to sharing. The resulting ionic lattice is a three-dimensional array of alternating cations and anions, not discrete molecules — the formula unit (e.g., NaCl) represents the simplest ratio of ions, not a bonded pair.

Lattice energy (U) is the energy released when gaseous ions combine to form one mole of ionic solid; equivalently, it is the energy required to separate one mole of ionic solid into its constituent gaseous ions. The Born-Landé equation shows U ∝ |z⁺||z⁻|/r, so higher ion charges and smaller ionic radii both increase lattice energy. The Born-Haber cycle is the experimental route to lattice energy: ΔH°f = ΔH°sub + ½ΔH°diss + IE₁(+IE₂…) + EA(+EA₂…) + U; every term except U is independently measurable, so U is obtained by difference.

Ionic compound properties follow directly from the lattice model. High melting points result from the large energy required to overcome the strong electrostatic forces throughout the lattice — not merely breaking a bond between two atoms. Brittleness arises because mechanical stress can shift ion layers so that like charges align; the resulting repulsion cleaves the crystal along a plane. Electrical conductivity requires mobile charged particles: ionic solids have fixed-position ions and do not conduct; melting or dissolving releases free ions, enabling conductivity. Water dissolves ionic solids because hydration energy (ion–dipole interactions between ions and water molecules) compensates the lattice energy.

Ionic formulas are determined by charge balance. Each formula unit must be electrically neutral. Cross-multiplication: if the cation has charge +a and the anion has charge −b, the formula is CₐAᵦ unless a = b, in which case the formula is CA. Example: Al³⁺ and O²⁻ → Al₂O₃; Ca²⁺ and Cl⁻ → CaCl₂.

## Mental Models
**The electrostatic glue model**: imagine positively and negatively charged spheres in a repeating three-dimensional array; the attraction between every + sphere and every neighbouring − sphere, summed across the whole crystal, is what makes the lattice stable. Pulling the crystal apart means breaking ALL those attractions, hence a high mp.

**The layer-slip fracture model**: ionic layers are like stacked egg-carton trays — as long as + fits into − hollows, the structure is stable. Sliding one layer relative to another by even half a unit cell brings + next to + and − next to −; the repulsion snaps the crystal.

**The Born-Haber energy ladder**: draw a vertical energy axis. Start at the elements in their standard states. Each step (atomisation, dissociation, ionisation, electron affinity, lattice formation) moves the energy up or down. The sum of all steps must equal ΔH°f (Hess's law), so the unknown (usually lattice energy) is obtained by subtraction.

## Why Students Fail
Students conflate "ionic bond" with "molecule" — they draw NaCl as a diatomic pair and calculate properties as if only two ions interact. The lattice concept is counter-intuitive because everyday objects appear as discrete units.

Students apply the melting-point argument backwards: they think ionic compounds have high melting points because "the bond is strong" (meaning the Na–Cl pair bond), not because the full three-dimensional lattice must be dismantled simultaneously.

Students confuse conductivity conditions: they either claim ionic solids always conduct (because they "have charged particles") or that melted ionic compounds do not conduct (because they "no longer have a crystal structure").

The cross-multiplication rule is applied mechanically without understanding why — students produce correct formulas but cannot explain why Al₂O₃ has that ratio, and they fail on unusual charges like Fe³⁺/SO₄²⁻ → Fe₂(SO₄)₃.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "NaCl is a molecule with one Na–Cl bond." Probe: "Draw the structure of sodium chloride." Characteristic phrase: "the ionic bond between Na and Cl." Intervention: show the crystal lattice structure; each Na⁺ is surrounded by 6 Cl⁻ and vice versa (coordination number 6:6 in rock salt structure); there is no single privileged Na–Cl pair.
- **MC-2 (Type 2 — perceptual intuition)**: "Ionic compounds have high melting points because the bond between the two ions is very strong." Probe: "Why does MgO have a much higher mp than NaCl if both are 'ionic bonds'?" Intervention: mp reflects the total lattice energy (all electrostatic interactions in the 3D array); MgO has +2/−2 ions (vs +1/−1 for NaCl), so its lattice energy is ~4× larger per formula unit, giving mp ~2852°C vs 801°C.
- **MC-3 (Type 1 — overgeneralization)**: "Ionic compounds always conduct electricity." Probe: "Does solid NaCl conduct electricity?" Characteristic phrase: "ionic compounds have charged particles so they must conduct." Intervention: conductivity requires MOBILE charged particles; in the solid, ions are fixed in the lattice; only on melting or dissolving do ions become free to move.
- **MC-4 (Type 4 — notation-induced)**: "The formula NaCl tells me there is one Na bonded to one Cl." Probe: "How many Cl⁻ ions surround each Na⁺ in solid NaCl?" Intervention: the formula unit is the simplest RATIO; in the crystal each Na⁺ is surrounded by 6 Cl⁻ neighbors.

## Analogies
**Valid**: A magnetic tray full of alternating north-south pole discs — each disc is attracted to all its neighbours; removing one disc requires overcoming attraction in multiple directions simultaneously. This explains why lattice disruption (melting) requires so much energy.

**Valid**: Dissolving as a competitive attraction — water molecules compete with the lattice for the ions; when hydration energy exceeds lattice energy, dissolution is spontaneous.

**Anti-analogy**: Do NOT compare ionic bonds to covalent bonds by saying "ionic bonds are stronger." Lattice energy (U) is not a single-bond energy; the correct comparison is lattice energy vs bond dissociation energy, and the relationship to mp depends on the structural context, not a simple strong/weak ranking.

## Demonstrations
**Conductivity test (conceptual)**: compare NaCl solid (no conductivity), NaCl(aq) (conducts), and molten NaCl (conducts) — three states that directly test the mobile-ion model without any additional theory.

**Crystal cleavage**: a halite crystal cleaved along a {100} plane splits cleanly; the flat face demonstrates the layer-plane geometry. Contrast with bending a metal wire (which deforms without fracturing) — reinforces that metallic bonding (electron sea) is non-directional while ionic layers cleave when like charges align.

**Born-Haber cycle diagram**: draw the energy ladder for NaCl on the board, inserting numerical values at each step (ΔH°sub Na = +108, ½ΔH°diss Cl₂ = +121, IE₁ Na = +496, EA Cl = −349, U = −787, ΔH°f = −411 kJ/mol). Verify Hess's law holds; then ask what would change for MgCl₂ (two IEs, larger lattice energy).

## Discovery Questions
1. "NaCl dissolves easily in water but MgO barely dissolves. Both are ionic. What determines whether an ionic compound dissolves?"
2. "Why can you hammer a copper rod into a new shape but striking a NaCl crystal with a hammer shatters it?"
3. "Predict which has the higher melting point: NaCl or CaO. What about NaCl vs CsCl?"

## Teaching Sequence
1. **Establish the transfer scenario**: start from a Na atom (IE₁ = 496 kJ/mol) and a Cl atom (EA = −349 kJ/mol); the net energy for isolated ion-pair formation is +147 kJ/mol — endothermic in isolation.
2. **Introduce lattice energy**: explain that the isolated ion pair calculation ignores the fact that in the solid, each Na⁺ is surrounded by six Cl⁻ and vice versa; sum of all electrostatic attractions exceeds repulsions by −787 kJ/mol, making the overall process (Born-Haber cycle) exothermic at −411 kJ/mol.
3. **Crystal structure**: establish the lattice as a 3D array of formula units, not molecules; show the rock-salt structure (NaCl, 6:6 coordination) as the exemplar.
4. **Properties from the model**: derive high mp (must break all lattice interactions), brittleness (layer shift → like-charge repulsion → cleavage), conductivity conditions (solid: fixed ions; molten/dissolved: mobile ions).
5. **Formula writing**: practice cross-multiplication with simple (NaCl, CaCl₂, Al₂O₃) and polyatomic (Fe₂(SO₄)₃, Ca₃(PO₄)₂) examples; emphasise charge neutrality as the governing law.
6. **Lattice energy trends**: compare NaCl vs MgO (charge effect: 1×1 vs 2×2) and NaCl vs NaI (size effect: smaller Cl⁻ → higher U → higher mp for NaCl vs NaI).

## Tutor Actions
- **If student draws NaCl as a diatomic molecule**: show the unit cell; ask "how many Cl⁻ neighbors does each Na⁺ have in the solid?" → builds the lattice model from evidence.
- **If student says 'ionic compounds conduct because they have ions'**: probe with "does solid NaCl conduct?" → forces the mobile-vs-fixed distinction.
- **If student cannot explain brittleness**: use the layer-shift diagram; ask "when one layer slides half a unit cell, what charge faces what charge?" → student derives the repulsion argument.
- **If student struggles with formula writing**: strip to the principle: "the total positive charge must equal the total negative charge"; practice with charges only, no element symbols first.
- **FRAGILE sign** (fast correct answers but cannot explain): give a novel compound (e.g., Fe₂O₃) and ask for lattice energy trend prediction vs FeO; inability to reason from charge/size = FRAGILE.

## Voice Teaching Notes
Latency signal: "ionic bond" questions elicit fast responses; "why does it conduct when molten" elicits longer latency — the latter is the harder conceptual hurdle, worth extra wait time.

Hesitation location: students typically hesitate on "lattice energy" and "why high mp specifically" — these are the conceptually deep spots, not formula writing.

Register note: for adult learners, use the Born-Haber energy ladder explicitly and early — they find the accounting approach reassuring. For younger learners, lead with the conductivity demonstration framing before introducing lattice energy formally.

The word "bond" misleads — in ionic compounds there is no discrete bond; use "electrostatic interaction" or "attraction" in preference to "the ionic bond" when referring to individual ion–ion forces.

## Assessment Signals
- **Green**: correctly predicts that CaO has a higher mp than NaCl with the reason (charge 2×2 vs 1×1 increases U), and correctly states solid NaCl does not conduct.
- **Amber**: writes formulas correctly but cannot explain why the ratio is what it is; or states lattice energy increases with charge without being able to apply it comparatively.
- **Red**: draws NaCl as a two-atom molecule; claims solid NaCl conducts electricity; confuses lattice energy with bond dissociation energy.
- **Probe**: "Why does MgCl₂ have a higher melting point than NaCl, even though both contain Cl⁻?" (expected answer: Mg²⁺ has charge +2 vs Na⁺ +1, increasing lattice energy; also Mg²⁺ is smaller than Na⁺, further increasing U).

## Tutor Recovery Strategy
If the student fails the lattice concept: return to the conductivity three-state demonstration (solid/molten/dissolved); the mobile-ion argument is the most direct evidence that the solid is a lattice, not a collection of molecules. Only after the student accepts mobile vs. fixed ions does the lattice structure argument become tractable. Do not push the Born-Haber cycle until the structural concept is secure.

If the student fails the brittleness explanation: use the layer-shift diagram; do NOT re-explain the crystal structure abstractly. The physical action (shift → alignment of like charges → repulsion) must be traced step by step.

## Memory Hooks
- **Lattice energy mnemonic**: "Higher charge, tighter space — the lattice stands in place." (More charge = higher U; smaller radius = higher U = higher mp.)
- **Conductivity conditions**: "Solid: stuck. Solution/melt: free. Free ions = current flows."
- **Formula writing**: "Swap and drop — swap the charge numbers, drop the signs, simplify." (Cross-multiplication rule.)

## Transfer Connections
- **chem.solid.crystal-systems**: ionic bonding is the force holding ionic crystal systems together; crystal geometry (cubic, face-centred, etc.) is determined by ion radius ratios.
- **chem.solid.ionic-solids**: the lattice model here is the foundation for calculating lattice energy with the Born-Landé equation and understanding defect structures.
- **chem.equil.solubility**: dissolution of ionic compounds in water is a competition between lattice energy and hydration energy — both concepts required together.

## Cross-Subject Connections
- **Physics (electrostatics)**: Coulomb's law F = kq₁q₂/r² is the quantitative basis for lattice energy; the Born-Landé equation is Coulomb's law summed over the Madelung constant geometry.
- **Biology (membranes and ion channels)**: Na⁺ and K⁺ gradients across cell membranes exploit the same ionic properties; conductivity in biological contexts requires aqueous (free-ion) conditions.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.bond.ionic-bonding`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.bond.ionic-bonding` as of 2026-07-23.

## Curriculum Feedback
None. KG prerequisites (chem.period.ionization-energy, chem.period.electron-affinity) are appropriate; ionic bonding logically follows the establishment of both IE and EA trends.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
