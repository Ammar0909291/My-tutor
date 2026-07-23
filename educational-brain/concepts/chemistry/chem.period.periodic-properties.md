# Periodic Properties — `chem.period.periodic-properties`

## Identity
- **KG ID**: chem.period.periodic-properties
- **Subject**: chemistry
- **Domain**: chem.period
- **Difficulty**: developing
- **Bloom level**: analyze
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.period.atomic-radius, chem.period.ionization-energy, chem.period.electron-affinity
- **Unlocks**: chem.dblock.general, chem.pblock.group13-18, chem.sblock.alkali

## Learning Objective
Synthesise all periodic trends (atomic radius, ionisation energy, electron affinity, and derived properties such as electronegativity, metallic character, and reactivity) under the unified framework of effective nuclear charge (Zeff) and principal quantum number (n), explain key anomalies with the same framework, and predict properties of unfamiliar elements from their position in the periodic table.

## Core Understanding
This is a synthesis node. Every periodic property discussed in its three prerequisite entries derives from two competing factors: (1) effective nuclear charge Zeff = Z − σ (actual nuclear charge minus shielding constant) and (2) the principal quantum number n of the valence shell. These two drivers oppose each other in determining trends across the table.

**Unified trend engine**:
- Across a period (left to right): n is constant; Zeff increases (nuclear charge increases faster than shielding from same-shell electrons, which shield poorly). Result: electrons are pulled closer → radius decreases → ionisation energy increases → electronegativity increases → metallic character decreases.
- Down a group (top to bottom): n increases; Zeff increases only slightly (each new shell adds effective shielding). Result: distance effect dominates → radius increases → ionisation energy decreases → electronegativity decreases → metallic character increases.

**Electronegativity** (Pauling scale): combines IE and EA information into a single polarity predictor. Trends parallel ionisation energy: increases across a period, decreases down a group. F is the most electronegative element (χ = 3.98); Fr the least (χ = 0.7). Electronegativity difference (Δχ) determines bond type: Δχ < ~0.5 (non-polar covalent), 0.5–1.7 (polar covalent), > 1.7 (ionic).

**Metallic character**: metals have low IE, low χ, large radius, and high electron affinity for their metallic solid state (low energy required to lose electrons to form cations and lattice). Non-metals have high IE, high χ, small radius. The metalloid line (Si, Ge, As, Sb, Te) marks the transition.

**Reactivity trends**:
- Alkali metals: reactivity INCREASES down Group 1 (lower IE → easier electron loss: Li < Na < K < Rb < Cs).
- Halogens: reactivity DECREASES down Group 17 (lower EA → weaker tendency to gain an electron: F > Cl > Br > I).
- The two trends are opposite in direction: losing electrons vs gaining electrons, controlled by IE and EA respectively.

**Diagonal relationships**: some pairs of elements on a diagonal show unexpectedly similar chemistry (Li/Mg, Be/Al, B/Si). Both Zeff and n change simultaneously in the diagonal direction in roughly offsetting amounts, producing similar sizes and charge densities. This is not a periodic trend but a consequence of the two-factor framework.

**Key anomalies (synthesis of prerequisite entries)**:
1. IE anomaly Group 2→13 (Mg > Al): Al's 3p electron is higher energy and less penetrating than Mg's 3s → lower IE despite higher Z. Framework explanation: 3p orbital is partly shielded by 3s electrons → lower Zeff seen by 3p.
2. IE anomaly Group 15→16 (P > S): S's extra paired 3p electron suffers spin-pairing repulsion → lower IE. Framework explanation: pairing repulsion is an intra-orbital effect superimposed on the Zeff trend.
3. EA anomaly F < Cl: F's compact n=2 shell → stronger electron–electron repulsion on adding the extra electron → less energy released per electron added than for Cl's more spacious n=3 shell. Framework: n factor (shell size) dominates over Zeff at small n.
4. Lanthanide contraction: the 14 f-electrons added across the lanthanides (58–71) provide poor shielding → unexpectedly high Zeff for post-lanthanide elements → Zr ≈ Hf, Mo ≈ W in atomic radius. The 4f subshell's poor penetration means these electrons shield less than expected.

**Summary table of trends**:

| Property | Across period (→) | Down group (↓) |
|---|---|---|
| Atomic radius | Decreases | Increases |
| Ionisation energy | Increases (with anomalies) | Decreases |
| Electron affinity | Generally increases (with anomalies) | Generally decreases |
| Electronegativity | Increases | Decreases |
| Metallic character | Decreases | Increases |
| Reactivity (metals) | Decreases | Increases |
| Reactivity (non-metals) | Increases | Decreases |

## Mental Models
**The Zeff/n tug-of-war model**: picture two forces acting on valence electrons — Zeff pulling inward (effective nuclear attraction) and n pushing outward (shell distance effect). Across a period, Zeff wins (n constant); down a group, n wins (Zeff rises only slowly). Every periodic trend is a scoreboard for this tug-of-war.

**The periodic table as a property gradient map**: colour-code the periodic table by any property; the gradient always runs smoothly from one corner to the opposite — most metallic at bottom-left (Cs, Fr), most non-metallic at top-right (F). Any anomaly is a localised deviation from this gradient.

**The three-question shortcut**: for any unfamiliar element's property, ask: (1) which period? (higher period = larger n); (2) which group? (higher group = higher Zeff); (3) is there a subshell anomaly? (Group 2→13 or 15→16 anomalies for IE; F < Cl for EA). The first two questions give the expected trend; the third catches the exceptions.

## Why Students Fail
Students memorise the individual trends (radius decreases, IE increases, etc.) as isolated facts but cannot synthesise them. When asked why metallic character decreases across a period, they have no single answer — they cannot see the Zeff engine driving all trends simultaneously.

Students treat anomalies as exceptions to memorise rather than as evidence that the simple Zeff model needs a second layer (spin-pairing repulsion, orbital energy ordering, shell size effects).

Students mix up the direction of reactivity trends for metals vs non-metals — they know reactivity increases down Group 1 and try to apply the same rule to Group 17, producing the opposite-of-correct answer.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Electronegativity and electron affinity are the same thing." Probe: "O has a more negative electron affinity than F. Which is more electronegative?" Characteristic phrase: "most electronegative means highest EA." Intervention: EA is the energy change for gaining one electron in the gas phase (context: isolated atoms); electronegativity is the tendency to attract bonding electrons in a bond (context: a bond). F is the most electronegative despite having a less negative EA than Cl, because electronegativity depends on all the electron-attracting factors in a bonded context, not just the gas-phase single-electron addition.
- **MC-2 (Type 1 — overgeneralization)**: "Reactivity always increases down a group." Probe: "Is iodine more reactive than fluorine?" Characteristic phrase: "down the group the trend is always increasing." Intervention: reactivity increases down a group for METALS (easier to lose electrons: IE decreases) but DECREASES down a group for NON-METALS (harder to gain electrons: EA becomes less negative); the direction depends on whether the element reacts by losing or gaining electrons.
- **MC-3 (Type 5 — instruction-induced)**: "All periodic trends are perfectly smooth with no exceptions." Probe: "Does IE always increase from left to right across period 2?" Characteristic phrase: "the trend is always increasing." Intervention: two established anomalies exist in every period — Group 2→13 (Mg > Al in period 3) and Group 15→16 (P > S in period 3); these arise from orbital energy ordering and spin-pairing repulsion, as covered in chem.period.ionization-energy.
- **MC-4 (Type 3 — language contamination)**: "Periodic law means properties repeat exactly every period." Probe: "Do period 2 and period 4 elements in the same group have identical properties?" Intervention: periodic law means properties recur PERIODICALLY (similar trends in each period), not identically; Zeff increases down each group and n increases, so properties change systematically; the lanthanide contraction means period 6 d-block elements are more similar to period 5 than to period 4 counterparts.

## Analogies
**Valid**: The periodic table is a chess board — position alone determines most of what a piece can do; the anomalies are like special-case rules (castling, en passant) that require one extra fact but follow a clear logic.

**Valid**: The Zeff tug-of-war as a rope between nuclear attraction and distance. Across a period, the nuclear team adds players (protons) faster than the distance team adds rope length (shell unchanged). Down a group, the distance team adds rope (larger n) faster than the nuclear team adds meaningful players (new shell electrons shield efficiently).

**Anti-analogy**: Do NOT describe electronegativity as "how much the atom wants electrons" without immediately distinguishing it from electron affinity. The informal language leads directly to MC-1.

## Demonstrations
**Reactivity series demonstration**: demonstrate Na, K reacting with water and compare reaction vigour; contrast with halogen displacement reactions (Cl₂ displaces Br⁻ and I⁻; Br₂ displaces I⁻; I₂ does not displace Cl⁻ or Br⁻) — direct empirical grounding for the two opposite reactivity directions.

**Ionisation energy anomaly confirmation**: provide successive IE data for period 3 elements in a table; ask students to identify which elements show a lower IE than expected from their neighbours. The Mg > Al and P > S anomalies emerge from the data without being told in advance — discovery from evidence.

**Property gradient map**: colour-code a blank periodic table using numerical values of any property (IE, radius, χ); the gradient pattern emerges visually; anomalies stand out as colour discontinuities.

## Discovery Questions
1. "Element X is in period 4, Group 16. Predict its metallic character, relative IE compared to its group 15 and 17 neighbours, and whether it is more or less reactive than its group 17 neighbour."
2. "The element tennessine (Ts, Z = 117) was synthesised in 2010. Using only its position (period 7, Group 17), predict its relative reactivity compared to I, Br, Cl, and F."
3. "Why do Zr (period 5, Group 4) and Hf (period 6, Group 4) have virtually identical atomic radii (160 vs 159 pm), even though every other pair of same-group Period 5/6 elements shows an increasing radius?"

## Teaching Sequence
1. **Establish the Zeff/n two-factor framework**: review Slater's rules qualitatively; confirm that Zeff increases across a period and n increases down a group.
2. **Map all properties onto the framework**: go through each of the five rows of the summary table and derive the direction from Zeff/n competition.
3. **Anomalies as second-order effects**: systematically revisit each anomaly from prerequisites; ask "which second-order effect causes the local reversal?" — builds the hierarchy (Zeff/n = first order; pairing repulsion, orbital energy ordering, shell crowding = second order).
4. **Electronegativity as a derived property**: compare Pauling and Mulliken χ (Mulliken χ = ½(IE₁ + EA) — shows it IS a combination of IE and EA); explain why F > Cl for χ despite Cl having more negative EA.
5. **Metallic vs non-metallic character and reactivity**: reinforce the metal (loses e⁻, IE governs) vs non-metal (gains e⁻, EA governs) distinction; derive opposite reactivity directions for Groups 1 and 17.
6. **Diagonal relationships**: introduce Li/Mg, Be/Al, B/Si; explain as cancelling Zeff (increased by moving right) and n (decreased by moving up) effects in the diagonal direction.
7. **Unseen element prediction exercise**: give coordinates for a hypothetical element; student predicts radius, IE, EA, χ, metallic character, reactivity — all from position alone.

## Tutor Actions
- **If student cannot synthesise trends**: return to the Zeff/n tug-of-war framing; ask "what changes across a period — Zeff, n, or both?" before addressing any specific property.
- **If student reverses non-metal reactivity direction**: give the halogen displacement reactions as data; ask "which halogen can displace all others?" (F); connect to F having the most negative EA among commonly assessed conditions and highest χ.
- **If student treats anomalies as random exceptions**: re-derive the Mg > Al anomaly from orbital energy ordering; the pattern (Group 2 > Group 13 and Group 15 > Group 16 for IE) is predictable, not random — there are exactly two anomalies per period in the main block, both explainable from the same framework.
- **FRAGILE sign**: predicts all trends correctly from the table but cannot explain why the trend for non-metal reactivity is opposite to metal reactivity. The distinction (lose vs gain electrons, IE vs EA as the governing factor) is the conceptual depth.

## Voice Teaching Notes
This is a synthesis/analysis node — expect long latency on every question. Students need time to route through three prerequisite concepts before answering any question about a specific trend. Wait 15+ seconds before hinting.

The word "reactivity" is vague in students' minds — always follow it with "reactivity towards what?" (water, oxygen, other halogens) to ground it in specific reactions and avoid the metal-non-metal confusion.

Older learners often find the framework summary table immediately useful as a reference; provide it early and refer back to it. Younger learners may need to build it step by step before it becomes a usable tool.

## Assessment Signals
- **Green**: explains every trend in the summary table from the Zeff/n framework, predicts properties of an unfamiliar element from its position, explains at least two anomalies mechanistically (not just by name).
- **Amber**: correct trend predictions from the table but cannot explain the underlying framework; or correctly explains the framework but reverses the direction of non-metal reactivity.
- **Red**: cannot identify any trend as driven by Zeff or n; treats all anomalies as random exceptions; confuses electronegativity with electron affinity.
- **Probe**: "Element A is in period 5, Group 2. Element B is in period 5, Group 15. Element C is in period 6, Group 2. Rank A, B, C by: (a) atomic radius (largest first), (b) first ionisation energy (largest first). Explain each ranking."

## Tutor Recovery Strategy
If the student cannot perform cross-property synthesis: do not attempt to teach all five properties simultaneously. Start with the Zeff/n framework and derive atomic radius trends only; confirm that one property is understood from the framework. Then map a second property onto the same framework ("now apply the same Zeff/n logic to IE — when the electron is pulled closer by higher Zeff, what happens to the energy needed to remove it?"). Build iteratively; the synthesis emerges after the pattern is recognised in two or three properties.

## Memory Hooks
- **Framework mnemonic**: "Across the period, Zeff wins (radius shrinks, IE rises). Down the group, n wins (radius grows, IE falls)."
- **Reactivity direction flip**: "Metals: reactivity rises as we go down (easier to lose e⁻). Non-metals: reactivity falls as we go down (harder to gain e⁻)."
- **Anomaly pair**: "13 less than 12, and 16 less than 15 — the exceptions to the IE increase rule." (Groups 13 and 16 each have an IE lower than the group to their left.)

## Transfer Connections
- **chem.dblock.general**: the d-block introduces additional shielding complications (d-electrons shield even more poorly than p) and the lanthanide contraction effect; the Zeff/n framework established here is the foundation for understanding d-block anomalies.
- **chem.sblock.alkali**: alkali metal reactivity trends down Group 1 are the primary application of the IE decreasing down-group trend derived here.
- **chem.pblock.group13-18**: group trends for the p-block require the full periodic-properties framework; the IE anomalies within a period are directly applicable.
- **chem.bond.covalent-bonding**: electronegativity difference (Δχ) determines bond polarity; bond types depend on the periodic property values synthesised here.

## Cross-Subject Connections
- **Physics (atomic structure)**: Zeff and orbital energies derive from quantum mechanical models; the periodic trends are empirical manifestations of the Schrödinger equation solutions for multi-electron atoms.
- **Materials science**: material properties (conductivity, hardness, reactivity with air/water) correlate directly with periodic position; semiconductor behaviour is explained by the metalloid band at the non-metal/metal transition.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.period.periodic-properties`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.period.periodic-properties` as of 2026-07-23.

## Curriculum Feedback
This is correctly positioned as a synthesis node unlocking the three major subgroup chemistry domains (d-block, p-block, s-block). The three prerequisite nodes (atomic-radius, ionization-energy, electron-affinity) supply all necessary property-specific knowledge; the synthesis here adds only the cross-property integration and derived properties. The arrangement is pedagogically sound.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
