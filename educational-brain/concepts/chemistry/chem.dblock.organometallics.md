# Organometallic Chemistry — `chem.dblock.organometallics`

## Identity
- **KG ID**: chem.dblock.organometallics
- **Subject**: chemistry
- **Domain**: chem.dblock
- **Difficulty**: expert
- **Bloom level**: analyze
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.coord.cft, chem.dblock.general
- **Unlocks**: (none — terminal node)

## Learning Objective
State and apply the 18-electron rule to predict stability and substitution lability of metal complexes; describe the structure, bonding, and properties of metal carbonyls; explain the structure and bonding of ferrocene (η⁵); and outline the catalytic cycles of Ziegler–Natta (polymerization) and Wilkinson's catalyst (hydrogenation).

## Core Understanding
**The 18-electron rule**:
In organometallic chemistry, stable mononuclear transition metal complexes tend to have 18 electrons in the metal valence shell (the d orbitals + the electrons donated by all ligands). The rule is derived from the same principle as the octet rule — filled valence shell → stability. The 18-electron count corresponds to filling the 9 valence AOs of a d-block metal: 1 × (n)s + 3 × (n)p + 5 × (n−1)d = 9 orbitals → 18 electrons.

- **Counting electrons (ionic method, most common)**: assign formal charges to the metal and all ligands, then count d electrons on the metal + lone-pair electrons donated by each ligand.
  - CO (2e donor), PR₃ (2e), H⁻ (2e), Cl⁻ (2e), η⁵-Cp (5e cyclopentadienyl anion, C₅H₅⁻), η⁶-benzene (6e), alkene η² (2e), allyl η³ (4e as allyl anion), NO⁺ (2e as 3e donor counting as 2e in ionic: formally 2e); each bridging CO (1e per metal).
- Examples:
  - Cr(CO)₆: Cr is Cr⁰ (d⁶) + 6 × CO (2e each) = 6 + 12 = 18 e. ✓
  - Fe(CO)₅: Fe⁰ (d⁸) + 5 CO (10e) = 18 e. ✓
  - [CpFe(CO)₂]⁻ (CpFe "piano stool"): Fe⁻ (d⁹) + Cp⁻ (5e) + 2 CO (4e) = 9 + 5 + 4 = 18 e. ✓
  - Wilkinson's catalyst [Rh(PPh₃)₃Cl]: Rh(I) (d⁸) + 3 PPh₃ (6e) + Cl⁻ (2e) = 8 + 6 + 2 = 16 e (deliberately 16e: coordinatively unsaturated, reactive → will bind H₂).
- **16-electron rule**: square planar d⁸ complexes (Rh(I), Ir(I), Pd(II), Pt(II)) are stable at 16e — the fourth equatorial site is empty (n-type LUMO). This 16e stability is a special case; most organometallics prefer 18e.
- **Violation ≠ instability**: some complexes are stable at <18e (bulky ligands prevent filling; 16e sq. planar d⁸). Some are >18e (not possible for d metals without invoking antibonding occupancy — generally these decompose).

**Metal carbonyls**:
- CO binds to metals through synergistic σ donation (C lone pair → metal empty orbital) + π back-donation (filled metal t₂g → CO π*). This C–O back-donation weakens the C≡O bond and reduces the C–O stretching frequency from 2143 cm⁻¹ (free CO) to 1850–2125 cm⁻¹ (in metal carbonyls). More electron-rich metal (lower oxidation state, more d electrons) → more back-donation → lower ν(CO).
- Binary carbonyls: Cr(CO)₆ (octahedral), Fe(CO)₅ (trigonal bipyramidal), Ni(CO)₄ (tetrahedral) — all 18e, all diamagnetic.
- Mn₂(CO)₁₀: Mn is d⁵ → 5 CO gives only 15e; solution: Mn–Mn METAL–METAL BOND (provides 1e per Mn) → each Mn achieves 18e. Metal–metal bonds in binuclear carbonyls.
- **CO is toxic** via coordination to Fe²⁺ in haemoglobin (connection to chem.coord.applications); the same π-acceptor property that makes CO a strong-field ligand also makes it a potent metabolic poison.

**Ferrocene [Fe(η⁵-C₅H₅)₂]**:
- Structure: two cyclopentadienyl (Cp) rings sandwich an iron centre; both rings are η⁵ bonded (all 5 carbons coordinate, the ring donates 5e as Cp⁻ in ionic counting or 6e as neutral η⁵-cyclopentadienyl). Fe²⁺ (d⁶) + 2 × Cp⁻ (5e each) = 6 + 10 = 16e? Wait: ionic method: Fe²⁺ (d⁶) + 2 Cp⁻ → 6 + 5 + 5 = 16? Alternatively, covalent method: Fe(0) (d⁸) + 2 Cp• (5e each) = 8 + 10 = 18e ✓. In practice ferrocene is stable at 18e with the covalent method. Fe(III) (Cp)₂ would be 17e → ferricinium cation (paramagnetic).
- Bonding: molecular orbital description — Cp π MOs interact with Fe 3d, 4s, 4p. Main stabilisation: e₂g (Fe d_{x²−y²}, d_{xy}) + Cp ψ₂,₃ bonding interaction.
- Aromatic character: ferrocene undergoes Friedel-Crafts acylation (electrophilic aromatic substitution), Birch reduction — reacts as if its Cp rings are aromatic, consistent with 6π electrons per ring (Hückel).
- Significant as the "discovery compound" of sandwich complexes (Wilkinson and Fischer, 1951 → Nobel Prize 1973).

**Ziegler–Natta polymerization**:
- Catalyst: TiCl₄/Al(C₂H₅)₃ (or TiCl₃/AlEt₂Cl). Ti is reduced to Ti(III) or Ti(II) at the catalyst surface; coordination site for propylene.
- Mechanism (Cossee–Arlman): (1) alkene coordinates to empty site on Ti; (2) migratory insertion — alkene inserts into Ti–C bond (chain growth step); (3) coordination of next monomer → repeat; (4) chain transfer or H₂ termination.
- Stereochemical control: the chiral Ti surface selects the re or si face of propylene → isotactic polymer (all methyl groups on same side). Metallocene catalysts (Zr/Ti sandwich complexes with chiral ancillary ligands) give precise stereocontrol → syndiotactic or isotactic PP.
- **Product**: isotactic polypropylene (iPP): crystalline, high mp, used in containers, fibres. Atactic PP: amorphous, lower mp, used in adhesives.

**Wilkinson's catalyst [Rh(PPh₃)₃Cl]**:
- 16e Rh(I) complex: coordinatively unsaturated → ready to undergo oxidative addition.
- Hydrogenation catalytic cycle:
  1. **Oxidative addition** of H₂: Rh(I) (16e d⁸) + H₂ → Rh(III)(H)₂ (18e d⁶) — Rh oxidation state increases by 2, electron count increases by 2.
  2. **Alkene coordination**: an alkene (substrate) displaces one PPh₃ ligand (18e → 16e intermediate) → alkene binds (back to 18e).
  3. **Migratory insertion**: one H migrates to coordinated alkene → Rh-alkyl intermediate (16e).
  4. **Reductive elimination**: the remaining H and the alkyl group couple on Rh(III) → alkane product is released, Rh(I) regenerated (d⁸, 14e) → PPh₃ binds to restore 16e Rh(I) catalyst.
- Selectivity: homogeneous, mild conditions (room temperature, 1 atm H₂), selective for monosubstituted alkenes, does not reduce carbonyl, ester, or aromatic rings under mild conditions.

## Mental Models
**18-electron rule as the "organometallic octet"**: just as carbon seeks 8 electrons in organic chemistry to achieve noble-gas configuration, transition metals in organometallic chemistry seek 18 electrons — but with 9 valence AOs rather than 4. A complex with exactly 18 electrons is coordinatively saturated; one with 16 has one empty orbital — a reactive site.

**Catalytic cycle as a loop through oxidation states**: in Wilkinson's catalysis, the metal cycles: Rh(I) → Rh(III) (after H₂ addition) → Rh(III) (after insertion) → Rh(I) (after reductive elimination). The metal is a shuttle, cycling between oxidation states, never consumed. The alkene enters and the alkane exits; the catalyst is regenerated.

## Why Students Fail
Students count electrons without assigning oxidation state to the metal first (using the wrong d electron count). They also say "18-electron complexes are always stable" — forgetting that kinetic and thermodynamic stability depend on more than the electron count alone (16e square planar d⁸ are also stable). They describe migratory insertion as "the alkene inserts into the metal" rather than specifying that the metal–carbon bond to the growing chain is what the alkene inserts into.

## Misconceptions
- **MC-1 (Type 4 — notation-induced)**: "CO is a 2-electron donor so Cr(CO)₆ has 2 + 6 = 8 electrons." Probe: "What is the d electron count for Cr in Cr(CO)₆ BEFORE counting the CO donation?" Characteristic phrase: "6 CO × 2e = 12 electrons total." Intervention: in the ionic counting method, you FIRST determine the metal's formal oxidation state and d electron count. Cr in Cr(CO)₆ is Cr(0) → d⁶ → 6 electrons FROM THE METAL. Then add: 6 CO × 2e = 12e donated. Total = 6 + 12 = 18. The metal's own electrons are NOT zero — they are the d electrons. The ligands ADD to the metal's own count.
- **MC-2 (Type 5 — instruction-induced)**: "Ferrocene is stable because iron forms ionic bonds with the cyclopentadienyl anion." Probe: "What evidence would distinguish an ionic compound from a covalently bonded organometallic?" Characteristic phrase: "Fe²⁺ and two Cp⁻ are just attracted by charges." Intervention: ferrocene does NOT behave like an ionic compound — it is volatile (sublimes), soluble in non-polar solvents, and undergoes electrophilic aromatic substitution on the Cp rings. These are properties of a COVALENTLY bonded molecule, not an ionic salt. The bonding involves substantial overlap of Fe d orbitals with the Cp π system (π-sandwich bonding via MO theory). The ionic formulation (Fe²⁺ + 2Cp⁻) is a FORMALISM for electron counting only, not a description of the actual bonding.
- **MC-3 (Type 2 — perceptual intuition)**: "Wilkinson's catalyst is consumed in the reaction because Rh(I) becomes Rh(III) after H₂ addition — so it must be reduced back." Probe: "After reductive elimination of the alkane, what is the oxidation state and electron count of rhodium?" Characteristic phrase: "it changes oxidation state so it must be used up." Intervention: reductive elimination reverses the oxidative addition — Rh(III) → Rh(I) is restored as the alkane is expelled. The catalyst cycles: Rh(I) → Rh(III) → Rh(I). The NET change over a complete catalytic cycle is zero: catalyst ends in the same state it started. This is the definition of a catalyst. Drawing the complete catalytic cycle with arrows makes this visual.

## Analogies
**Valid**: Wilkinson's catalyst as a molecular ferry service. The Rh centre picks up two H atoms from H₂ (oxidative addition, ferry loaded), transfers them to the alkene passenger (migratory insertion + reductive elimination, ferry unloaded), and the ferry returns empty for the next trip. The ferry (Rh catalyst) is unchanged at the end of each trip.

## Demonstrations
**ν(CO) IR spectroscopy**: record IR spectra of Cr(CO)₆ and compare with free CO gas (2143 cm⁻¹ vs. ~2000 cm⁻¹ for the carbonyl). The red-shift of ν(CO) directly demonstrates back-donation: metal d electrons are delocalised into CO π*, weakening the C≡O bond.

**Ferrocene synthesis**: (advanced lab) synthesise ferrocene from FeCl₂ and freshly cracked cyclopentadiene with KOH in DMSO or under N₂. Purify by vacuum sublimation. Perform Friedel-Crafts acylation to give acetylferrocene — yellow precipitate. Students see the aromatic reactivity directly.

## Discovery Questions
1. "Mn₂(CO)₁₀ contains a Mn–Mn single bond. (a) Verify that each Mn obeys the 18-electron rule. (b) Predict whether Mn₂(CO)₁₀ is paramagnetic or diamagnetic and justify. (c) In CO₂(CO)₈, each Co has three terminal CO and there are two bridging CO. Verify the 18-electron count for each Co assuming one bridging CO provides 1e to each metal."
2. "In Ziegler–Natta polymerization, isotactic polypropylene forms when the catalyst selects one face of propylene consistently. (a) Draw the migratory insertion step for one unit of propylene. (b) Explain what 'isotactic' means at the polymer level. (c) How does a chiral metallocene catalyst improve stereochemical control over heterogeneous TiCl₄/AlEt₃?"

## Teaching Sequence
1. 18-electron rule: derivation (9 AOs × 2e), counting procedure (ionic method), examples (Cr(CO)₆, Fe(CO)₅, Ni(CO)₄). 16e square planar exception.
2. Metal carbonyls: synergistic bonding (σ-donation + π-back-donation), IR evidence, structural types (mono-, di-, cluster). CO toxicity link.
3. Ferrocene: structure (η⁵, sandwich), electron count (covalent method → 18e), aromatic reactivity, significance.
4. Ziegler–Natta: Ti/Al catalyst, Cossee–Arlman mechanism (coordination + insertion + chain transfer), isotactic selectivity.
5. Wilkinson's catalyst: 16e Rh(I), oxidative addition of H₂, alkene coordination, migratory insertion, reductive elimination, selectivity.

## Tutor Actions
- **If student forgets to include metal's d electrons in 18e count**: "Before you count ligand electrons, what is the oxidation state of the metal? What is its d electron count? Start there — ligands ADD to that number."
- **If student says ferrocene is ionic**: "Would an ionic compound sublime and dissolve in benzene? No. So the nature of bonding in ferrocene must be covalent, even though we use Fe²⁺/Cp⁻ for electron counting convenience."
- **FRAGILE sign**: can count electrons for simple examples correctly but cannot explain WHY 18e confers stability, or cannot draw the catalytic cycle for Wilkinson's with correct arrow-pushing.

## Voice Teaching Notes
The 18-electron rule's electron-counting method is highly procedural and error-prone in voice. Always establish: (1) identify oxidation state first, (2) look up/compute d electron count, (3) add ligand electrons. Force all three steps explicitly before summing. For catalytic cycles in voice: "Tell me the oxidation state of Rh at each step of the cycle. What happens to it during oxidative addition? Reductive elimination? Is Rh regenerated at the end?" This narration makes the catalytic cycle a story, not a formula.

## Assessment Signals
- **Green**: correctly applies 18-electron rule to Cr(CO)₆, Fe(CO)₅, ferrocene, Wilkinson's catalyst; explains synergistic CO bonding and ν(CO) shift; draws Wilkinson's catalytic cycle with correct Rh oxidation states at each step; explains isotactic selectivity in Ziegler–Natta; distinguishes ionic bonding description of ferrocene from its actual covalent character.
- **Amber**: counts electrons correctly for mononuclear carbonyls but cannot apply to sandwich compounds or catalytic cycles; or explains the catalytic cycle without tracking oxidation states.
- **Red**: counts only ligand electrons (forgets metal's d electrons); says ferrocene is an ionic compound; says Wilkinson's catalyst is consumed.
- **Probe**: "[Rh(CO)(PPh₃)₂Cl] (Wilkinson's analog with one CO). (a) What is the electron count? Is it coordinatively saturated? (b) Predict what happens when H₂ is added. (c) State the steps of a catalytic cycle for hydrogenation of propylene using this complex."

## Tutor Recovery Strategy
If student cannot draw Wilkinson's catalytic cycle: provide the four steps as labels on a blank cycle diagram (oxidative addition → alkene coordination → migratory insertion → reductive elimination) and ask the student to fill in: (a) the oxidation state of Rh at each node, (b) the electron count at each node, (c) what species enters and exits at each step. The structured diagram makes the cycle's logic flow visible without requiring the student to recall the sequence from memory.

## Memory Hooks
- **18e rule**: "9 AOs × 2e = 18. Metal d electrons first, then ADD ligand electrons. 16e d⁸ = stable exception (square planar)."
- **CO synergistic bonding**: "σ: C→metal (lone pair). π: metal→CO π* (back-donation). Back-donation lowers ν(CO) below 2143 cm⁻¹."
- **Ferrocene**: "Fe²⁺ + 2Cp⁻ = 18e (covalent method: Fe⁰ + 2Cp•). Volatile, aromatic EAS. Sandwich = η⁵."
- **Wilkinson's cycle**: "Rh(I)(16e) → + H₂ → Rh(III)(H)₂(18e) → + alkene, insert → Rh(III)-alkyl(16e) → reductive elim → Rh(I) + alkane."
- **Ziegler–Natta**: "Ti(III)/Al coordination + insertion on alkene → chain growth → isotactic PP from chiral surface."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for organometallic chemistry.

## Cross-Subject Connections
- **Industrial chemistry**: Ziegler–Natta polymerization is the industrial process for making polypropylene and polyethylene (multi-billion tonne scale globally). Wilkinson's homogeneous hydrogenation is used in pharmaceutical synthesis where chiral control is required (e.g. DOPA synthesis using chiral Rh-BINAP catalysts → Noyori Nobel Prize 2001).
- **Biology**: metal-carbene and metal-carbonyl chemistry has direct parallels in enzymatic CO-dehydrogenase and Fe-only hydrogenase active sites — natural enzymes that bind CO and H₂ at iron-sulfur cluster active sites using organometallic-style bonding.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.dblock.organometallics`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.dblock.organometallics` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
