# Chromatography — `chem.anal.chromatography`

## Identity

- **KG ID**: chem.anal.chromatography
- **Subject**: Chemistry
- **Domain**: Analytical Chemistry (chem.anal)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.surface.adsorption
- **Unlocks**: none (terminal node)
- **Cross-links**: none

## Learning Objective

Students can define stationary and mobile phases and explain how their relative affinities separate mixtures; calculate Rf values for TLC; describe the principles of HPLC, GC, ion-exchange, and size-exclusion chromatography; and explain how chromatography is used for purification and analysis.

## Core Understanding

**Principle of chromatography**:
Chromatography separates components of a mixture based on their differential partitioning between a stationary phase (immobile) and a mobile phase (moving). Components that interact more strongly with the stationary phase move more slowly; components that interact more with the mobile phase move faster. The differing migration rates cause spatial separation.

**Stationary and mobile phases**:
- Stationary phase: solid or bound liquid that remains fixed (silica, alumina, ion-exchange resin, crosslinked polymer, bound PDMS).
- Mobile phase: liquid or gas that carries the mixture through the stationary phase (solvent in HPLC; carrier gas in GC).

**Rf value (thin-layer chromatography, TLC)**:
Rf = (distance travelled by component) / (distance travelled by solvent front)
Range: 0 ≤ Rf ≤ 1 (dimensionless).
Rf is characteristic of a compound under defined conditions (solvent, plate, temperature). Components with Rf close to 0 adsorb strongly to the stationary phase; Rf close to 1 travel with the solvent (poor stationary-phase affinity).

**Types of chromatography**:

*Thin-layer chromatography (TLC)*:
Stationary: silica or alumina on a glass/aluminium plate. Mobile: organic solvent mixture. Quick, qualitative/semi-quantitative. Spots visualised under UV light or with staining reagent. Used for monitoring reactions and identifying compounds.

*Column chromatography (CC)*:
Preparative; silica or alumina column; solvent mobile phase. Mixture loaded at top; components elute at different rates; fractions collected. Used for purification.

*High-performance liquid chromatography (HPLC)*:
Pressure-driven liquid mobile phase through a column packed with small-particle stationary phase (silica C-18 for reverse-phase HPLC). High resolution and speed. Quantitative: peak area ∝ concentration. Detection: UV-Vis, fluorescence, mass spectrometry. Wide application in pharmaceutical analysis, food chemistry.
Reverse-phase HPLC (most common): non-polar stationary phase (C-18); polar mobile phase (water/acetonitrile); non-polar analytes retained longer; eluted by increasing organic solvent.

*Gas chromatography (GC)*:
Mobile phase: inert carrier gas (He, N₂). Stationary phase: liquid polymer coating on column wall (capillary GC). Compounds must be volatile and thermally stable. Separation principle: compounds with lower boiling points (more volatile) elute first; also affected by polarity matching between compound and stationary phase. Detection: flame ionisation (FID), mass spectrometer (GC-MS). Used for volatile organic compounds, fuels, food aromas.

*Ion-exchange chromatography*:
Stationary phase: resin bearing fixed charged groups. Cation-exchange resins (negative fixed charges) retain cations; anion-exchange resins retain anions. Separation by charge magnitude and affinity. Used for water softening (Ca²⁺/Mg²⁺ replaced by Na⁺), amino acid analysis, protein purification.

*Size-exclusion chromatography (gel filtration)*:
Stationary phase: porous beads. Small molecules enter the pores and are retarded; large molecules cannot enter and elute first. Separates by molecular size/shape. Used for protein purification (molecular weight estimation), desalting, polymer molecular weight distribution.

## Mental Models

**The obstacle-course model**: the stationary phase is an obstacle course that slows some runners (analytes) more than others. Each runner (molecule) interacts with the obstacles (stationary phase) with different affinity. The runner who trips over the most obstacles (high stationary-phase affinity) arrives last; the runner who glides through (high mobile-phase affinity) arrives first.

**The Rf ladder model**: TLC is a snapshot of the race. The Rf value is the fraction of the total distance each runner has covered when the photograph was taken (solvent front reached the top). Rf = 0: didn't move (stuck at start). Rf = 1: moved with the solvent front (didn't interact with stationary phase at all).

## Why Students Fail

1. **Lower Rf means more mobile in the current system**: a compound with low Rf has HIGH affinity for the stationary phase and LOW affinity for the mobile phase. Students confuse "low Rf = moves slowly" with "low affinity for stationary phase."
2. **GC always elutes by boiling point alone**: boiling point is the primary factor, but polarity matching with the stationary phase also determines elution order in polar/non-polar column systems.
3. **Rf is a universal constant for a compound**: Rf depends on the solvent system, stationary phase material, temperature, and plate preparation. It is not a universal fingerprint — it is diagnostic only under defined, reproducible conditions.
4. **Size-exclusion: large molecules elute last**: in size-exclusion chromatography, LARGE molecules elute FIRST (cannot enter pores, pass through faster). Students expect large → slow because large = heavy.

## Misconceptions

**MC-1 — Low Rf means low affinity for stationary phase** (Type 1, logic inversion of the Rf definition)
- *Mechanism*: students reason "didn't move = doesn't interact with anything" rather than "didn't move = strongly held by stationary phase, not pulled forward by mobile phase."
- *Diagnostic probe*: "Compound X has Rf = 0.05 on a silica TLC plate with hexane. What does this tell you about compound X's affinity for silica?"
- *Characteristic phrase*: "Rf = 0.05 means compound X doesn't interact much with silica."
- *Repair*: Rf = 0.05 means compound X barely moved — it was strongly retained on silica (stationary phase). The mobile phase (hexane) was unable to pull it forward because silica held it so tightly. Rf close to 0 → HIGH stationary-phase affinity. To move it, you'd need a stronger (more polar) solvent or a different stationary phase.

**MC-2 — Size-exclusion: large molecules elute last** (Type 2, perceptual intuition: large = slow)
- *Mechanism*: students expect large molecules to be slower in any separation, by analogy with sieving.
- *Diagnostic probe*: "In size-exclusion chromatography, a mixture of large proteins (MW 100 kDa) and small buffer salts (MW 0.3 kDa) is loaded onto a gel filtration column. Which elutes first?"
- *Characteristic phrase*: "Large proteins elute last because they're too big to move quickly."
- *Repair*: in size-exclusion, the pores are the key. Large molecules cannot enter the pores — they are excluded and travel only through the space between beads (shorter effective path). They elute FIRST. Small molecules enter the pores, increasing their path length. They are retarded and elute LAST. This is the opposite of sieving intuition.

## Analogies

**The revolving-door analogy for size-exclusion**: imagine a corridor with revolving doors that only short people can enter. Tall people (large molecules) walk straight past the doors (excluded from the pores) and reach the exit first. Short people (small molecules) keep entering the revolving doors (pores), spending extra time going round and round, and reach the exit last.

**The sticky-road analogy for Rf**: the stationary phase is a road coated with glue of varying stickiness for different compounds. A compound that sticks hard (high stationary-phase affinity) barely moves; one that glides over the glue (low affinity) travels with the solvent. Rf = fraction of the total road covered in the available time.

## Demonstrations

**Demonstration 1 — TLC of food colouring dyes**
- Spot a mixture of commercial food colouring dyes on a silica TLC plate. Develop with an appropriate solvent (e.g., ethanol/water). Students calculate Rf for each separated spot and compare with known dye standards. They observe directly that the mixture separates into distinct components and that Rf identifies each component. Extends to reverse-phase (polar stationary phase, non-polar mobile phase) for comparison.

## Discovery Questions

1. "On a TLC plate (silica, hexane/ethyl acetate 9:1), compound A travels 3.5 cm and compound B travels 1.2 cm. The solvent front is at 6.0 cm. (a) Calculate Rf for A and B. (b) Which is more polar? (c) If you switch to a more polar solvent, what happens to both Rf values?" (Targets: (a) Rf_A = 3.5/6.0 = 0.58; Rf_B = 1.2/6.0 = 0.20. (b) B is more polar — it interacts more strongly with the polar silica stationary phase, hence lower Rf. (c) More polar mobile phase outcompetes the stationary phase for both compounds → both Rf values increase; the more polar compound (B) will show a larger increase.)
2. "In reverse-phase HPLC with a C-18 column and acetonitrile/water mobile phase, would a non-polar drug (aspirin ester) or a polar drug (paracetamol/acetaminophen) elute first at 30% acetonitrile?" (Targets: reverse-phase HPLC: non-polar stationary phase (C-18), polar mobile phase. Non-polar analytes are retained by the C-18 column (like-dissolves-like). Paracetamol (polar) has less affinity for C-18 → elutes FIRST. The non-polar aspirin ester is retained longer → elutes LATER. Increasing organic solvent % (acetonitrile) elutes non-polar compounds.)
3. "Explain why GC cannot be used to separate glucose (a sugar) directly." (Targets: GC requires volatile, thermally stable analytes. Glucose has very high boiling point (decomposes before boiling at ~186°C), is non-volatile at reasonable temperatures, and thermally decomposes (caramelises). GC would destroy the sample. Solution: glucose can be derivatised (converted to a trimethylsilyl or acetate derivative) to increase volatility before GC analysis — a standard technique in carbohydrate chemistry.)

## Teaching Sequence

1. Review from chem.surface.adsorption: adsorption; stationary-phase affinity; differential interaction.
2. Principle of chromatography: stationary vs. mobile phase; differential partitioning → separation. Obstacle-course model.
3. Rf values and TLC: calculate, interpret. Address MC-1 (low Rf = high stationary-phase affinity). Work Discovery Question 1.
4. Column chromatography: preparative extension of TLC. Elution order by polarity.
5. HPLC: normal vs. reverse-phase; pressure; quantitation by peak area. Work Discovery Question 2.
6. GC: volatile compounds; elution by boiling point and polarity. Work Discovery Question 3 (why glucose fails).
7. Ion-exchange: charged stationary phase; charge-based separation; water softening.
8. Size-exclusion: pores; large-first elution. Address MC-2.

## Tutor Actions

- If student says low Rf = low stationary-phase affinity → MC-1 repair: low Rf = compound barely moved = strongly retained by stationary phase.
- If student says large molecules elute last in size-exclusion → MC-2 repair: large molecules excluded from pores → shorter path → elute FIRST.
- If student applies GC to non-volatile samples → guide: GC requires volatility; non-volatile compounds need derivatisation or HPLC instead.
- Advance when student can calculate Rf, predict elution order for different stationary/mobile phase combinations, and distinguish all five chromatography types by principle.

## Voice Teaching Notes

"Before any TLC question: Rf low → stuck to stationary phase. Rf high → moved with mobile phase. Stuck = high affinity for stationary phase. Say it before you write anything."

"Size-exclusion: the big ones go through first. They can't get into the holes. Short path. Fast exit. Small ones explore the holes — longer path — slow exit."

## Assessment Signals

**Mastery gate**:
1. Student correctly calculates and interprets Rf values.
2. Student correctly predicts elution order for TLC/HPLC given stationary and mobile phase polarity.
3. Student correctly identifies which chromatography type is appropriate for a given separation (volatile → GC; charged → ion-exchange; size-based → SEC; polar/non-polar → HPLC/TLC).
4. Student correctly describes size-exclusion elution order (large first, small last).

**FRAGILE signal**: student correctly calculates Rf but cannot explain what a change in mobile-phase polarity would do to Rf values (no understanding of the competition between mobile and stationary phase).

**MISCONCEIVING signal**: student inverts Rf-affinity relationship. Address MC-1 before any elution order prediction.

## Tutor Recovery Strategy

If stuck:
1. For Rf interpretation: "Two forces compete: stationary phase pulls compound back (retention); mobile phase carries compound forward (elution). High stationary-phase affinity: strong pull back → slow movement → low Rf. High mobile-phase affinity: strongly carried forward → high Rf."
2. For size-exclusion reversal: "Draw two beads with pores. A small molecule enters the pore (longer path). A large molecule bounces off the bead surface (shorter path). Who reaches the bottom of the column first? The one with the shorter path — the large molecule."
3. For HPLC polarity: "C-18 is like an oil (non-polar). A non-polar compound dissolves in the oil and sticks. A polar compound prefers the water-rich mobile phase and is carried out first. Rule: like sticks to like."

## Memory Hooks

- **Rf = distance(compound)/distance(solvent front). Low Rf = high stationary-phase affinity (slow). High Rf = high mobile-phase affinity (fast).**
- **TLC: normal-phase silica (polar SP); non-polar compounds move faster (high Rf). Reverse-phase HPLC: non-polar C-18 SP; polar compounds elute first.**
- **GC: volatile compounds only; boiling point (and polarity) determines elution order.**
- **Size-exclusion: LARGE molecules elute FIRST (excluded from pores). Small molecules enter pores → retarded → elute last.**
- **Ion-exchange: separates by charge. Cation-exchange retains cations; anion-exchange retains anions.**

## Transfer Connections

- **chem.anal.gravimetric**: both nodes belong to the analytical chemistry domain — gravimetric analysis separates by precipitation/mass; chromatography separates by differential partitioning. Together they form the core of classical and instrumental separation methods.
- **chem.surface.adsorption**: chromatographic separation directly exploits differential adsorption on the stationary phase surface — the Freundlich and Langmuir isotherm concepts describe the equilibrium partitioning that drives separation; this node is the applied realisation of chem.surface.adsorption's principles.

## Cross-Subject Connections

- **Biology (biochemistry)**: protein purification uses a sequence of chromatographic steps (affinity, ion-exchange, size-exclusion) to isolate pure proteins from cell lysates. HPLC and GC-MS are universal tools in metabolomics and proteomics.
- **Environmental science (trace analysis)**: GC-MS and HPLC are the primary instruments for detecting trace contaminants (pesticides, pharmaceuticals, VOCs) in water, soil, and air at parts-per-billion levels.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.anal.chromatography`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.anal.chromatography` as of 2026-07-23.

## Curriculum Feedback

This is a terminal node (no unlocks), appropriate for an applied analytical technique node. The proficient/apply classification correctly reflects the expected skill level: students must be able to calculate Rf, predict elution orders, and choose the appropriate chromatographic technique for a given sample. The five chromatography types (TLC, HPLC, GC, ion-exchange, size-exclusion) are the minimum set expected in most university-level curricula; instructors can trim to TLC + one instrumental technique for shorter courses.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
