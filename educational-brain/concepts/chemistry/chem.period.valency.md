# Valency — `chem.period.valency`

## Identity

- **KG ID**: chem.period.valency
- **Subject**: Chemistry
- **Domain**: Periodic Table (chem.period)
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.period.modern-periodic-law
- **Unlocks**: chem.bond.ionic-bonding, chem.bond.covalent-bonding
- **Cross-links**: none

## Learning Objective

Students can derive the common valency of main-group elements from their electronic configurations; explain the concept of variable oxidation states for transition metals; predict the formulas of binary ionic and covalent compounds from valency data; and explain why some elements (e.g., N, P, S, Cl, Xe) exhibit valencies beyond their simple group valency through the involvement of d-orbitals or formal oxidation state conventions.

## Core Understanding

**Valency (valence)**:
Valency is the number of bonds an atom can form (or the number of electrons it can share, donate, or accept). For main-group elements, valency follows directly from the number of valence electrons and the number of unpaired electrons available for bonding.

**Deriving valency from electronic configuration**:
- Valency = number of bonds formed = number of electrons an atom needs to gain/share to reach the nearest noble-gas configuration, OR the number of unpaired valence electrons available.
- Group 1 (ns¹): 1 unpaired electron → valency 1. Example: Na forms NaCl (ionic, donates 1e⁻).
- Group 2 (ns²): 2 valence electrons → valency 2 (ionic: Ca²⁺ in CaCl₂, CaO).
- Group 13 (ns²np¹): 3 valence electrons, 1 unpaired → but forms 3 bonds via promotion → valency 3. Al₂O₃, AlCl₃.
- Group 14 (ns²np²): 4 valence electrons → valency 4. CH₄, SiO₂, CCl₄.
- Group 15 (ns²np³): 3 unpaired electrons → valency 3. NH₃, PCl₃. But also valency 5 (see below).
- Group 16 (ns²np⁴): 2 unpaired electrons → valency 2. H₂O, H₂S. Also shows 4 and 6.
- Group 17 (ns²np⁵): 1 unpaired electron → valency 1. HCl, HBr. Also shows 3, 5, 7 (Cl).
- Group 18 (ns²np⁶): 0 unpaired electrons → valency 0. Noble gases (largely); Xe shows 2, 4, 6 with F.

**Variable oxidation states and expanded valency**:
Some elements in period 3 onwards (P, S, Cl, Xe) can form more bonds than the simple unpaired-electron count predicts. Two explanations are in use:

*d-orbital involvement (traditional view)*: period 3 elements have empty 3d orbitals available; electrons in the ns²np pairs can be promoted to 3d orbitals, increasing the number of unpaired electrons available for bonding. Example: P in PCl₃ (valency 3, ground state) vs. PCl₅ (valency 5, with two electrons promoted to 3d). Sulfur: H₂S (valency 2) vs. SO₄²⁻ (valency 6, S in +6 state using 3d).

*Modern view (formal oxidation states)*: for many hypervalent molecules, the "expansion" is better described by the formal oxidation state — the oxidation state framework (assigning electrons to the more electronegative atom) accounts for the observed formulas without requiring actual d-orbital participation. Both views lead to the same predicted formulas.

Period 2 elements (N, O, F) CANNOT expand their valency because they have no available d orbitals in n=2. Maximum bonds: N = 4 (in NH₄⁺, using its lone pair), O = 3 (in H₃O⁺), F = 1 always. N does NOT form NF₅ or NCl₅ because expansion is impossible; PCl₅ exists because P can expand.

**Variable oxidation states in transition metals**:
d-block metals have both the (n−1)d and ns electrons available for bonding. Because the d and s orbitals are close in energy, different combinations can be used in different compounds → multiple common oxidation states.
Examples: Fe (+2 in FeCl₂, FeO; +3 in FeCl₃, Fe₂O₃); Cu (+1 in Cu₂O; +2 in CuO, CuSO₄); Mn (+2, +4, +6, +7 in MnO, MnO₂, K₂MnO₄, KMnO₄).

**Predicting compound formulas from valency**:
Cross-multiplication rule: combine ions/atoms so total positive valency = total negative valency.
Example: Al (valency 3) + O (valency 2) → Al₂O₃ (2×3 = 3×2 = 6).
Example: Ca (2+) + PO₄ (3−) → Ca₃(PO₄)₂ (3×2 = 2×3 = 6).

## Mental Models

**The handshake model for valency**: valency is how many handshakes (bonds) an atom can make. Each unpaired valence electron is an outstretched hand waiting for a partner. Na has one outstretched hand; Ca has two; N has three; C has four. When hands are all shaken, the atom is bonded and stable. Variable valency elements can put out different numbers of hands depending on conditions (like ambidextrous or extra-arm training for d-orbital expansion).

**The octets-as-parking-spaces model**: valence electrons fill the 8 parking spaces of the outer shell (s + p). Period 2 elements can only park in 4 spaces (n=2 has only s and p). Period 3+ elements have extra parking in the d lot (3d orbitals) → can accommodate more bonds.

## Why Students Fail

1. **Valency = group number always**: Group 1 → valency 1, Group 16 → valency 6, Group 17 → valency 7. These are wrong for the heavier elements (S is not valency 6 in most compounds; Cl in HCl has valency 1, not 7).
2. **Period 2 elements can expand valency like period 3**: students predict NCl₅ or OF₄ by analogy with PCl₅ or SF₄. Period 2 elements have NO d orbitals available → strict octet; no expansion.
3. **Variable oxidation state = different numbers of total electrons**: students confuse oxidation state (a bookkeeping number) with the actual number of electrons on an atom. An atom in oxidation state +3 still has the same number of protons and most of its electrons; the oxidation state is how those electrons are assigned in accounting.

## Misconceptions

**MC-1 — Valency of S is always 6 (or of Cl is always 7) because they are in Groups 16 and 17** (Type 5, instruction-induced from "group number = valency" taught initially)
- *Mechanism*: early valency teaching uses "Group number = valency" as a shortcut. Students apply it to all groups and all elements without internalising that valency means bonds formed from unpaired electrons.
- *Diagnostic probe*: "What is the valency of S in H₂S? What is it in H₂SO₄? Explain."
- *Characteristic phrase*: "S is in Group 16, so its valency is 6 in all compounds."
- *Repair*: valency of S in H₂S = 2 (S has 2 unpaired electrons in its ground state → forms 2 bonds → paired with 2 H). Valency of S in H₂SO₄ = 6 (S uses expanded valency, possible because S is period 3 and has accessible 3d orbitals). The group number gives the MAXIMUM possible valency for period 3+ elements, not the only valency. For period 2 (C in Group 14): maximum AND common valency is 4; it cannot exceed 4.

**MC-2 — N can form NCl₅ by analogy with PCl₅** (Type 6, analogy overextension from the N/P comparison)
- *Mechanism*: students learn PCl₅ and write NCl₅ by substituting N (same group, smaller). Period 2 elements lack d orbitals; no expansion is possible.
- *Diagnostic probe*: "PCl₅ is a stable compound. Can NCl₅ exist? Explain."
- *Characteristic phrase*: "NCl₅ can exist because N and P are in the same group and P can form PCl₅."
- *Repair*: N is in period 2 — it has only n=2 orbitals (2s and 2p, max 8 electrons = 4 bonds). No 2d orbitals exist. N's maximum valency is 4 (as in NH₄⁺, where N uses a lone pair for a dative bond). PCl₅ exists because P has accessible 3d orbitals in period 3. NCl₅ does not and cannot exist.

**MC-3 — Oxidation state = actual electron count on the atom** (Type 3, language contamination: "state" and "charge" language)
- *Mechanism*: students treat oxidation state as the actual charge or electron count of the atom, rather than a bookkeeping convention.
- *Diagnostic probe*: "In KMnO₄, the oxidation state of Mn is +7. Does this mean Mn has lost 7 real electrons?"
- *Characteristic phrase*: "In KMnO₄, Mn has only 18 electrons left because it lost 7."
- *Repair*: oxidation state is an accounting convention — electrons in a bond are assigned fully to the more electronegative atom for counting purposes. In Mn (+7), the Mn atom has not literally lost 7 electrons; it has 25 (its atomic number) minus 0 actual ionizations in most bonding models. The +7 means that IF the bonds were ionic, 7 electrons would be assigned to O. Real electron density around Mn is much more than 18 electrons — oxidation state is a formalism, not physical reality.

## Analogies

**The voting analogy for oxidation states**: in an election (bond), votes (electrons) are assigned to the candidate (atom) who normally wins (more electronegative). In H₂O: O wins both electrons from each O–H bond (O is more electronegative). O gets 8 electrons assigned → oxidation state = 8 − 8 = 0 (starting 6 valence + 2 lone pairs... this gets the convention across). The votes aren't actually handed over — it's the official result of who would win if the bond broke heterolytically.

**The octopus analogy for variable valency**: a common crab (valency-fixed) always has two claws; it can't grow more. A cuttlefish (variable valency, d-block) can extend tentacles depending on its environment — sometimes 2, sometimes 8. Period 2 atoms are crabs (fixed octet maximum); period 3+ and d-block atoms are cuttlefish (variable bonds, d orbitals available).

## Demonstrations

**Demonstration 1 — Comparing structures of NF₃ and PF₃ vs. PF₅**
- Show 3D molecular models of NF₃ (pyramidal, valency 3) and PF₃ (pyramidal, valency 3) and PF₅ (trigonal bipyramidal, valency 5). PF₅ has P in a five-bonded configuration; N cannot form NF₅. Ask students: why does P extend to 5 bonds but N stops at 3 (or 4 in NH₄⁺)? The molecular model makes the structural contrast visible before the electronic explanation is given.

## Discovery Questions

1. "Give the formulas and valencies of: (a) the compound formed between calcium (Group 2) and nitrogen (Group 15); (b) the compound formed between aluminium and sulphate ion (SO₄²⁻, charge −2)." (Targets: (a) Ca has valency 2; N has valency 3. Ca₃N₂ (cross-multiply: 3×2 = 2×3 = 6). Check: Ca₃²⁺N₂³⁻. (b) Al has valency 3 (Al³⁺); SO₄²⁻ has charge 2−. Al₂(SO₄)₃ (2×3 = 3×2 = 6). Check: 2 Al³⁺ + 3 SO₄²⁻ → neutral compound.)
2. "Chlorine (period 3, Group 17) shows valencies of 1, 3, 5, and 7 in different compounds. (a) Which valency is its ground-state valency? (b) How does Cl achieve valency 3, 5, and 7? (c) Could fluorine (period 2, Group 17) show valency 3, 5, or 7?" (Targets: (a) Ground state Cl: [Ne]3s²3p⁵ — 1 unpaired electron → ground-state valency = 1 (e.g., HCl). (b) Cl can promote electrons to 3d orbitals: promote one 3p paired electron → 3 unpaired (valency 3, e.g., ClF₃); promote two pairs → 5 unpaired (valency 5, ClF₅); promote three pairs → 7 unpaired (valency 7, ClF₇). All require 3d orbitals. (c) F has no 3d orbitals available; maximum valency = 1 always. OF₂ exists (valency 2 for O) but FF₂ is impossible because F can only form 1 bond.)
3. "Iron forms Fe²⁺ and Fe³⁺ in different compounds. Write the formulas of iron(II) chloride, iron(III) oxide, and iron(II) sulphate." (Targets: Fe²⁺ + Cl⁻: FeCl₂ (one Fe²⁺ balanced by two Cl⁻). Fe³⁺ + O²⁻: Fe₂O₃ (two Fe³⁺ balanced by three O²⁻; cross-multiply 3×2=2×3=6). Fe²⁺ + SO₄²⁻: FeSO₄ (one Fe²⁺ balanced by one SO₄²⁻; equal charges, 1:1).)

## Teaching Sequence

1. Review from chem.period.modern-periodic-law: block structure; valence electron counts by group; Hund's rule → unpaired electrons.
2. Define valency: number of bonds formed = number of unpaired valence electrons (for simple cases). Derive for Groups 1, 2, 13–17 in period 2. Apply to predict formulas (cross-multiplication). Work Discovery Question 1.
3. Variable valency: introduce period 3 elements (P, S, Cl) expanding via d orbitals. Address MC-1 (Group number ≠ fixed valency). Work Discovery Question 2.
4. Period 2 limitation: no d orbitals → NO expansion. N ≠ NCl₅. Address MC-2.
5. Transition metal variable oxidation states. Address MC-3 (oxidation state ≠ literal electron count). Work Discovery Question 3.

## Tutor Actions

- If student says S always has valency 6 or Cl always has valency 7 → MC-1 repair: ground-state valency = unpaired electrons count; group number = maximum valency for period 3+ only.
- If student predicts NCl₅ by analogy with PCl₅ → MC-2 repair: N is period 2, no d orbitals, strict octet (maximum 4 bonds); P is period 3, has 3d available.
- If student says oxidation state +7 for Mn = 7 electrons removed → MC-3 repair: oxidation state is a bookkeeping convention; electrons are not literally removed in covalent bonds.
- Advance when student can derive formulas from valency correctly (including cross-multiplication), explain the period 2 vs. period 3 expansion difference, and assign oxidation states to known compounds.

## Voice Teaching Notes

"Before any valency question: ground state valency = number of unpaired electrons. That's the starting point. Group 16 → 2 unpaired → valency 2. Group 15 → 3 unpaired → valency 3. Group number is not valency directly — it's the total electrons, not the unpaired ones."

"Period 2 cannot expand: N, O, F maximum bonds 4, 3, 1. Period 3 can expand via d: P up to 5, S up to 6, Cl up to 7. This is a testable fact in almost every curriculum."

## Assessment Signals

**Mastery gate**:
1. Student correctly derives ground-state valency from unpaired electron count for Groups 1, 2, 13–17.
2. Student correctly explains that period 3 elements can expand valency (d-orbital availability) while period 2 cannot.
3. Student correctly applies cross-multiplication to write formulas of binary ionic compounds.
4. Student correctly identifies that transition metals show variable oxidation states due to d-electron participation.

**FRAGILE signal**: student correctly writes compound formulas using cross-multiplication but cannot explain WHY a given valency was chosen (no mechanistic connection to electronic configuration).

**MISCONCEIVING signal**: student says N can form NCl₅ or that S always has valency 6. Address MC-2 / MC-1 with the ground-state unpaired electron count before any formula-writing task.

## Tutor Recovery Strategy

If stuck:
1. For deriving valency from configuration: "Write the electronic configuration. Identify the valence subshell. Apply Hund's rule: fill orbitals singly first. Count unpaired electrons. That's the ground-state valency. Example: S = [Ne]3s²3p⁴. Draw the 3p box: ↑↓ ↑ ↑. Two unpaired → valency 2 in ground state (H₂S). But 3d orbitals are empty and accessible → can promote to get more unpaired → higher valency states (4, 6) in other compounds."
2. For period 2 limitation: "Draw the energy level diagram for n=2: 2s and 2p orbitals exist. Is there a 2d orbital? No — d orbitals start at n=3. N in period 2 can have at most 8 electrons in its valence shell (2s²2p³ + one more in 2p⁵ with a dative bond = 4 bonds max in NH₄⁺). There is literally nowhere for a 5th or 6th bond to go. For P in period 3: 3s, 3p, AND 3d orbitals exist → 5, 6, 7 bonds possible."
3. For oxidation state vs. real electrons: "Oxidation state is like a referee's decision in a tug-of-war. The electrons don't actually move — they're still shared in the bond — but the referee (the rule: give both electrons to the more electronegative atom) declares one side the winner. Mn in KMnO₄ is officially assigned +7 by this rule. Its actual electron configuration is [Ar]3d⁰4s⁰ in the formal ionic model, but in the real molecule the electron density around Mn is far more than 18 electrons."

## Memory Hooks

- **Ground-state valency = unpaired electrons. Count unpaired before predicting bonds.**
- **Period 2 (N, O, F): maximum 4, 3, 1 bonds respectively. CANNOT expand. No 2d orbitals.**
- **Period 3+ (P, S, Cl, Xe): can expand via empty d orbitals. Maximum valency = group number for these.**
- **Cross-multiplication rule: Al₂O₃ from Al (3) and O (2) → valencies cross over as subscripts.**
- **Transition metals: multiple oxidation states from d and s electrons. Fe: +2 and +3. Cu: +1 and +2. Mn: +2 to +7.**

## Transfer Connections

- **chem.bond.ionic-bonding**: the ionic formulas derived from valency/cross-multiplication are the direct input to ionic bonding and lattice structure. Valency correctly predicts the formula; ionic bonding explains the energy and structure.
- **chem.bond.covalent-bonding**: valency = number of covalent bonds = number of shared electron pairs. VSEPR geometry (bond angles, molecular shape) builds on the bond count derived here.

## Cross-Subject Connections

- **Biology (biochemistry — oxidation states in metabolism)**: electron carriers in cellular respiration (NAD⁺/NADH, FAD/FADH₂) change oxidation states of their cofactor atoms. Fe in cytochrome c alternates between +2 and +3. The variable oxidation state concept from this node is the foundation of all biological redox chemistry.
- **Environmental science (nitrogen and sulfur chemistry)**: N has oxidation states from −3 (NH₃) to +5 (NO₃⁻); S from −2 (H₂S) to +6 (SO₄²⁻). The range of valency and oxidation state directly controls the chemistry of nitrification, denitrification, acid rain (SO₂ → SO₃ → H₂SO₄), and the nitrogen cycle.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.period.valency`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.period.valency` as of 2026-07-23.

## Curriculum Feedback

Terminal prerequisite for ionic and covalent bonding (both unlock from this node), correctly placed. The developing/apply classification is right — students must both understand and apply valency to formula writing. The period 2 vs. period 3 d-orbital expansion distinction is the highest-frequency exam distinction involving valency at this curriculum level and should be explicitly included, as many curricula (CBSE, A-Level) directly test NCl₅ impossibility.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
