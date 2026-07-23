# Ionic Solids and Lattice Energy — `chem.solid.ionic-solids`

## Identity
- **KG ID**: chem.solid.ionic-solids
- **Subject**: chemistry
- **Domain**: chem.solid
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.solid.packing, chem.bond.ionic-bonding
- **Unlocks**: (none — terminal node)

## Learning Objective
State and apply the Born-Landé equation for lattice energy; use the Madelung constant to compare geometries; construct a Born-Haber cycle from standard enthalpy data to determine lattice energy experimentally; interpret discrepancies between calculated and experimental lattice energies as evidence for covalent character.

## Core Understanding
**Lattice energy (U)**:
The lattice energy is the enthalpy change when ONE MOLE of an ionic solid is formed from its gaseous ions:
M⁺(g) + X⁻(g) → MX(s), ΔH = U (negative, exothermic, energy released as the crystal lattice forms).
- Alternatively defined as the energy to DISSOCIATE the lattice: MX(s) → M⁺(g) + X⁻(g), ΔH = −U (positive). Note: different textbooks define the sign differently — always check the sign convention stated.

**Born-Landé equation**:
U = −(N_A A z⁺ z⁻ e²)/(4πε₀ r₀) × (1 − 1/n)

where:
- N_A = Avogadro's number
- A = **Madelung constant** (geometry-dependent)
- z⁺, z⁻ = charges on cation and anion (use absolute values; the sign of U is negative for lattice formation)
- e = electron charge
- ε₀ = permittivity of free space
- r₀ = nearest-neighbour interionic distance (= sum of ionic radii)
- n = Born exponent (related to electron configuration; typically 5–12; accounts for short-range repulsion)

**Key factors affecting lattice energy**:
1. **CHARGE (z⁺ and z⁻)**: lattice energy ∝ z⁺ × z⁻. Doubling either charge roughly quadruples the lattice energy. MgO (2+/2−) has a MUCH larger lattice energy than NaCl (1+/1−) despite similar crystal structures: U(MgO) ≈ −3850 kJ mol⁻¹ vs. U(NaCl) ≈ −787 kJ mol⁻¹.
2. **IONIC RADII (r₀)**: lattice energy ∝ 1/r₀. Smaller ions → shorter interionic distance → stronger electrostatic attraction → larger |U|. LiF > LiCl > LiBr > LiI (F⁻ is smallest halide); NaF > KF > RbF > CsF (Na⁺ is smallest alkali metal among these).
3. **Madelung constant (A)**: depends on CRYSTAL GEOMETRY, NOT on the specific ions. A reflects the sum of all coulombic interactions (attractions and repulsions) in the infinite lattice.
   - NaCl structure: A = 1.748
   - CsCl structure: A = 1.763
   - ZnS zinc blende: A = 1.638
   - ZnS wurtzite: A = 1.641
   - CaF₂ fluorite: A = 2.519
   - The NaCl Madelung constant is often treated as the benchmark.

**Born-Haber cycle**:
Lattice energy cannot be measured directly. The Born-Haber cycle applies Hess's Law to calculate it from measurable standard enthalpies:
For NaCl:
Na(s) + ½Cl₂(g) → NaCl(s), ΔH_f° = −411 kJ mol⁻¹

The cycle has FIVE steps (all measured experimentally):
1. Sublimation of Na(s) → Na(g): ΔH_sub = +108 kJ mol⁻¹ (endothermic)
2. Atomisation of ½Cl₂(g) → Cl(g): ΔH_atom = +122 kJ mol⁻¹ (endothermic)
3. First ionisation energy Na(g) → Na⁺(g) + e⁻: IE₁ = +496 kJ mol⁻¹ (endothermic)
4. Electron affinity Cl(g) + e⁻ → Cl⁻(g): EA = −349 kJ mol⁻¹ (exothermic)
5. Lattice energy Na⁺(g) + Cl⁻(g) → NaCl(s): U = ?

Hess's Law: ΔH_f° = step1 + step2 + step3 + step4 + step5
−411 = +108 + 122 + 496 + (−349) + U
U = −411 − 108 − 122 − 496 + 349 = **−788 kJ mol⁻¹** (lattice formation; exothermic)

For compounds with 2+ ions (MgCl₂): include both IE₁ and IE₂; two Cl electron affinities; lattice step involves Mg²⁺(g) + 2Cl⁻(g) → MgCl₂(s). The step for forming the 2+ ion requires substantially more energy (IE₂ >> IE₁), compensated by the much larger lattice energy.

**Polarisation and covalent character**:
- THEORETICAL lattice energy (from Born-Landé): calculated assuming purely ionic bonding (point charges).
- EXPERIMENTAL lattice energy (from Born-Haber cycle): derived from real thermochemical data, includes any covalent contribution.
- DISCREPANCY: experimental |U| > theoretical |U| → SIGNIFICANT COVALENT CHARACTER. The larger the discrepancy, the more covalent the bonding.
- **Fajans' rules**: polarisation (and covalent character) increases when:
  1. Cation is SMALL and/or highly charged (high charge density = high polarising power)
  2. Anion is LARGE and/or highly charged (large, easily polarisable anion)
  - Example: AgI has much more covalent character than NaI (Ag⁺ has high polarising power; I⁻ is very polarisable → large discrepancy in lattice energy; AgI is insoluble and has yellow colour, unlike colourless purely ionic salts).

**Solubility and the lattice energy / hydration enthalpy balance**:
ΔH_solution = lattice energy + hydration enthalpies = U + ΔH_hyd(cation) + ΔH_hyd(anion)
(using the convention of lattice DISSOCIATION energy = +U)
- Solubility is determined by ΔG_solution = ΔH_solution − TΔS_solution. A compound dissolves if ΔG_solution < 0.
- LiF is less soluble than expected (lattice energy NOT well-matched by hydration enthalpy because Li⁺ small → very high lattice energy AND high hydration enthalpy, but the lattice energy exceeds the hydration enthalpy).
- Group 2 hydroxide solubility increases down the group: Ba(OH)₂ > Sr(OH)₂ > Ca(OH)₂ > Mg(OH)₂ — as cation radius increases, lattice energy DECREASES faster than hydration enthalpy → net ΔH_solution becomes more negative → more soluble.

## Mental Models
**Lattice energy as ionic "glue"**: the stronger the glue (larger |U|), the harder it is to pull the lattice apart (higher mp, lower solubility if hydration is weaker). High charge and small radii are the two ways to make stronger glue. The Madelung constant is the geometric efficiency of the glue — how well the arrangement of ions exploits electrostatic attraction from ALL neighbours, not just the nearest one.

**Born-Haber cycle as a financial ledger**: each step is a transaction (deposit or withdrawal). The balance sheet must sum to ΔH_f° (the net cost of forming the compound from elements). Lattice energy is the "profit" at the end — the single term you calculate from what's left over after all other transactions are accounted for.

## Why Students Fail
Students forget to include SECOND ionisation energies and SECOND electron affinities when constructing Born-Haber cycles for 2+ ions (MgO, CaCl₂, etc.). They also confuse the sign convention for lattice energy (formation exothermic vs. dissociation endothermic) when setting up the Hess's Law equation. The Madelung constant is often stated without understanding what it physically represents.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Larger lattice energy always means the compound is more stable/has a higher melting point, regardless of the anion." Probe: "NaF has a larger lattice energy than NaCl. Does this mean NaF is always more thermally stable or less soluble than NaCl?" Characteristic phrase: "larger |U| = better in every respect." Intervention: lattice energy is one factor. Solubility depends on ΔH_solution = −|U_lattice| + |ΔH_hyd|; if hydration enthalpy compensates for the large lattice energy, the compound may still be quite soluble. Thermal stability depends on what decomposition products are possible (not directly on lattice energy alone). Melting point IS generally correlated with |U| — but the correlation is only strict within the same structural type and similar charge types.
- **MC-2 (Type 4 — notation-induced)**: "In the Born-Haber cycle for NaCl, the lattice energy step should include Na as Na⁺ and Cl as Cl because the step forms the lattice from atoms, not ions." Probe: "What are the starting materials for the lattice energy step in the Born-Haber cycle?" Characteristic phrase: "atoms go into the lattice, so the lattice energy starts from atoms." Intervention: lattice energy is DEFINED as the enthalpy change for M⁺(g) + X⁻(g) → MX(s) — starting from GASEOUS IONS, not from atoms. The separate steps (sublimation, atomisation, ionisation, electron affinity) CONVERT elements to gaseous ions BEFORE the lattice energy step assembles them into the solid. The lattice energy step's starting materials are the isolated gaseous ions, not atoms.
- **MC-3 (Type 3 — language contamination)**: "The Madelung constant tells you how many nearest neighbours the ion has (coordination number)." Probe: "NaCl has A = 1.748 and CsCl has A = 1.763. NaCl has CN = 6:6 and CsCl has CN = 8:8. How does the Madelung constant relate to coordination number?" Characteristic phrase: "Madelung = coordination number." Intervention: the Madelung constant is NOT the coordination number. It is the SUM of an alternating series of coulombic terms from ALL ions in the lattice (nearest + next-nearest + next-next-nearest... for both attractions and repulsions). For NaCl: A = 6/1 − 12/√2 + 8/√3 − 6/2 + ... ≈ 1.748. It encodes the FULL ELECTROSTATIC GEOMETRY of the lattice, not just the nearest neighbours. CsCl (A = 1.763) has a HIGHER Madelung constant than NaCl (A = 1.748) even though CsCl has CN = 8 and NaCl CN = 6 — showing the Madelung constant and CN are not equivalent.

## Analogies
**Valid**: the Born-Haber cycle is like balancing a profit-and-loss statement. The "final revenue" is ΔH_f° (what you get by going directly from elements to product — the efficient route). The "expenses" are all the individual steps (sublimation, ionisation, etc.). The lattice energy is what's left — the one unknown "revenue item" you back-calculate from the rest of the financial picture. If the accounts don't balance without it, you've found it.

## Demonstrations
**Comparing lattice energies through melting points**: show a table of melting points of NaF (993°C), NaCl (801°C), NaBr (747°C), NaI (661°C) — same 1+/1− charges, same Na⁺, increasing halide radius. Melting point decreases as r₀ increases, directly reflecting decreasing |U|. Extend to MgO (2850°C) vs. NaF (993°C): the 2+/2− charges cause vastly higher lattice energy.

**Born-Haber cycle construction**: work through the NaCl Born-Haber cycle on a board as a stepped diagram (energy axis) — each step is an arrow up (endothermic) or down (exothermic); the lattice energy is the final large arrow down to ΔH_f° level. The visual representation makes Hess's Law concrete.

## Discovery Questions
1. "Construct a Born-Haber cycle for MgO and calculate the lattice energy. Data: ΔH_f°(MgO) = −601 kJ mol⁻¹; ΔH_sub(Mg) = +148 kJ mol⁻¹; IE₁(Mg) = +738 kJ mol⁻¹; IE₂(Mg) = +1451 kJ mol⁻¹; ΔH_atom(O) = +249 kJ mol⁻¹; EA₁(O) = −141 kJ mol⁻¹; EA₂(O) = +798 kJ mol⁻¹. Comment on the value of EA₂(O) and explain why MgO is nevertheless a stable compound."
2. "The theoretical lattice energy of AgCl (Born-Landé) is −717 kJ mol⁻¹, but the experimental (Born-Haber) value is −905 kJ mol⁻¹. Interpret the discrepancy using Fajans' rules. How does this explain the physical properties of AgCl (yellow colour, insolubility in water, dissolves in NH₃)?"

## Teaching Sequence
1. Define lattice energy (formation from gaseous ions); sign convention.
2. Born-Landé equation: identify each variable; how charge and radius affect U; qualitative trends.
3. Madelung constant: what it represents; values for NaCl, CsCl, ZnS, CaF₂; A not same as CN.
4. Born-Haber cycle: concept (Hess's Law for lattice energy); identify all steps for a 1+/1− compound; work through NaCl numerically.
5. Born-Haber for 2+ compounds: additional IE₂ and two EA steps; work through MgO or CaCl₂.
6. Theoretical vs. experimental lattice energy: comparison; discrepancy → covalent character.
7. Fajans' rules: polarising power of cation; polarisability of anion; examples (NaCl vs. AlCl₃).
8. Solubility from lattice/hydration balance: Group 1 halide solubility; Group 2 hydroxide trend.

## Tutor Actions
- **If student omits second ionisation energy**: "For Mg²⁺, how many electrons were removed?" (2) "How many ionisation steps is that?" (2: IE₁ then IE₂). Add both to the cycle.
- **If student uses wrong sign for lattice energy in Hess's Law**: "Is lattice formation exothermic or endothermic?" (exothermic = negative). "Add that negative value to the endothermic steps; the sum must equal ΔH_f°."
- **FRAGILE sign**: can set up and solve the NaCl Born-Haber cycle correctly but cannot explain what the Madelung constant represents or cannot construct the cycle for MgO without extensive prompting.

## Voice Teaching Notes
The Born-Haber cycle is the first topic in chemistry where students must track multiple energy terms of different signs simultaneously. In voice teaching, use a consistent running total approach: "Write down all the terms on one side of the equation, their values, and sum them. The lattice energy is what's left to reach ΔH_f°." This avoids sign errors from rearranging the equation. Always check: "should the lattice energy be a large negative number (exothermic)? If your answer is positive, you've made a sign error."

## Assessment Signals
- **Green**: states the two key factors in lattice energy (charge and ionic radius) with direction; explains the Madelung constant as a geometric sum; constructs the Born-Haber cycle for a 1+/1− and 2+/2− compound correctly; interprets discrepancy between Born-Landé and Born-Haber values as covalent character; applies Fajans' rules.
- **Amber**: correct Born-Haber cycle for NaCl but omits second IE/EA for multi-charged ions; or knows lattice energy trends but cannot construct a cycle.
- **Red**: confuses Madelung constant with coordination number; omits IE₂ for Mg²⁺ in Born-Haber; says positive experimental − theoretical discrepancy means more ionic (wrong — more covalent).
- **Probe**: "Arrange in order of increasing lattice energy: NaF, MgO, KI, CaO. Justify the ordering using the Born-Landé equation. Then calculate the lattice energy of CaF₂ from these Born-Haber data: ΔH_f° = −1219 kJ mol⁻¹; ΔH_sub(Ca) = +178 kJ mol⁻¹; IE₁+IE₂(Ca) = +1735 kJ mol⁻¹; 2ΔH_atom(F) = +158 kJ mol⁻¹; 2EA(F) = −656 kJ mol⁻¹."

## Tutor Recovery Strategy
If student cannot build the Born-Haber cycle: start from the DEFINITION of lattice energy (the only step that directly involves the lattice). Then ask "what must we do to turn the ELEMENTS (as they naturally exist) into GASEOUS IONS?" Each transformation is one step: "Is sodium a solid element? How do we get gaseous Na? → sublimation. Is Cl₂ molecular? → atomise. Is Na a neutral atom? → ionise. Is Cl a neutral atom? → electron affinity. Now: gaseous ions → lattice → lattice energy." Build it as a narrative before writing equations.

## Memory Hooks
- **Lattice energy factors**: "Larger charges → larger |U|. Smaller radii → larger |U|."
- **Born-Haber steps (NaCl)**: "Sublimation + Atomisation + IE + EA + Lattice = ΔH_f°."
- **Sign check**: "Lattice formation must be strongly negative (exothermic). If positive, sign error."
- **Madelung constant**: "Geometry-dependent; NaCl = 1.748, CsCl = 1.763, CaF₂ = 2.519. NOT coordination number."
- **Covalent character**: "Experimental |U| > Theoretical |U| → polarisation → covalent character. Use Fajans' rules."
- **Fajans' rules**: "Small, high-charge cation + large, high-charge anion → more covalent."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for solid-state chemistry.

## Cross-Subject Connections
- **Materials science**: the extremely high lattice energies of MgO (−3850 kJ mol⁻¹) and Al₂O₃ (−15,900 kJ mol⁻¹) explain why these are used as refractory ceramics (high-temperature furnace linings) — vast energy required to disrupt the lattice.
- **Nuclear chemistry**: the Born-Haber cycle approach extends to estimating lattice energies of radioactive compounds (e.g. UO₂) where direct measurement is complicated, using thermochemical cycles combined with estimated Madelung constants for the fluorite structure.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.solid.ionic-solids`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.solid.ionic-solids` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
