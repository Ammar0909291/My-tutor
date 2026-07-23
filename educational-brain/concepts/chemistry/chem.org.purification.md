# Purification Techniques in Organic Chemistry — `chem.org.purification`

## Identity
- **KG ID**: chem.org.purification
- **Subject**: chemistry
- **Domain**: chem.org
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.org.iupac
- **Unlocks**: chem.org.qualitative-analysis

## Learning Objective
Select and describe the appropriate purification technique (distillation, recrystallisation, solvent extraction, chromatography) for a given organic product, explain the physical principle underlying each technique, and describe how to test purity using melting point and TLC.

## Core Understanding
Organic reactions almost never produce a single pure product — the crude reaction mixture contains the target compound, unreacted starting materials, by-products, and solvent. Purification isolates the target compound; purity assessment confirms the result.

**Distillation**: separates liquids based on differences in boiling point. The more volatile (lower bp) component evaporates first, is condensed, and collected.
- Simple distillation: bp difference > 25°C between components; used to remove solvent from a solution.
- Fractional distillation: bp difference < 25°C; a fractionating column (packed with glass beads or plates) provides multiple vaporisation–condensation cycles → sharper separation. Used for petroleum refining, separation of ethanol/water mixtures.
- Steam distillation: co-distillation of a water-immiscible compound at a temperature below its own bp; the two-component system boils when P(compound) + P(water) = 1 atm. Used for temperature-sensitive compounds (e.g. essential oils).
- Vacuum distillation: reduces the boiling point for heat-sensitive compounds; used in pharmaceutical production.

**Recrystallisation** (for purification of solids): dissolve the crude solid in the minimum volume of hot solvent (the compound is MORE soluble in hot solvent); filter hot to remove insoluble impurities; cool slowly to crystallise the pure compound (pure crystals form ordered lattices, excluding impurities); filter cold, wash with a minimum of cold solvent, dry.
- Key requirement: the compound must be MUCH MORE soluble in hot than in cold solvent; impurities must be either insoluble in the hot solvent (filtered away before cooling) or much more soluble than the compound (remain in the mother liquor on cooling).
- Solvent choice: the compound should dissolve well in the hot solvent but crystallise on cooling; the solvent should NOT react with the compound.

**Solvent extraction (liquid-liquid extraction)**: exploits differential solubility of the target compound vs. impurities between two immiscible solvents (typically an organic solvent like ethyl acetate/diethyl ether and water).
- Separating funnel technique: add both solvents; shake; allow layers to separate; run off the bottom layer; recover target from the organic layer by evaporating the solvent.
- Acid-base extraction: convert an organic acid to its anion (add base, R–COOH → RCOO⁻ sodium salt, now water-soluble) to transfer it into the aqueous phase; acidify to re-protonate → compound re-enters organic phase. Used to separate acids from neutral organics.

**Chromatography**: separation based on differential adsorption or partition between a mobile phase (moves) and a stationary phase (fixed).
- **TLC (thin-layer chromatography)**: spot the sample on silica-coated plate; develop in solvent (mobile phase); compare Rf = distance moved by spot / distance moved by solvent front. Each compound has a characteristic Rf in a given solvent system. Used to MONITOR reactions (has starting material disappeared? is product forming?) and CHECK PURITY (a pure compound gives a single spot).
- **Column chromatography**: silica packed in a column; sample loaded on top; solvent(s) eluted; fractions collected; fractions monitored by TLC. Preparative-scale purification.
- **HPLC (High Performance Liquid Chromatography)**: high-pressure liquid column; very fine stationary phase particles; quantitative and very high resolution; routine in pharmaceutical QC.
- **Gas chromatography (GC)**: vaporised sample carried through a capillary column by an inert gas; components separated by bp and polarity; detected (usually by FID); retention time identifies compounds; peak area = quantity. Best for volatile organics; often coupled with mass spectrometry (GC-MS) for structural identification.

**Purity assessment**:
- **Melting point (for solids)**: pure solids melt sharply at a well-defined temperature (literature value); impurities DEPRESS the melting point AND BROADEN the range. A pure compound: sharp melting point (within 1–2°C range) matching literature. An impure compound: depressed and broad range. Melting point depression = ΔTf = Kf × molality of impurity.
- **TLC**: a pure compound gives a SINGLE SPOT; multiple spots indicate multiple components (impurities or isomers). Used to confirm the completion of recrystallisation or column separation.
- **Boiling point (for liquids)**: pure liquids have sharp boiling points at constant pressure; if the bp range is wide (e.g. 75–90°C instead of 77°C), the liquid is impure. Less sensitive than melting point as a purity test.

**Technique selection guide**:
- Liquid product + liquid impurities with different bp → distillation.
- Solid product, low-solubility impurities → recrystallisation.
- Compound of interest partitions preferentially into organic solvent from aqueous mixture → solvent extraction.
- Complex mixture requiring separation of components with close properties → chromatography.

## Mental Models
**The sorting analogy**: purification is like sorting objects by one measurable property — temperature at which they vaporise (distillation), how much they stick to silica (TLC/column), or how well they dissolve in a cold solvent (recrystallisation). The technique exploits the property that differs MOST between compound and impurity.

**The melting point as a compound fingerprint**: every pure compound has a characteristic melting point as precise as a fingerprint — it identifies the compound AND certifies its purity in one measurement. Impurities are like fingerprints from a second person overlaid: they smear the fingerprint (broaden the range) and shift it downward (depress the mp).

## Why Students Fail
Students confuse the purpose of chromatography (which component MOVES MORE in the solvent = less retained by silica = larger Rf) with what Rf means — they assume a large Rf means the compound is "better" or more polar, when it actually means it travels faster in the mobile phase (less interaction with the stationary silica phase).

Students describe recrystallisation as "dissolving and filtering" without specifying that both hot and cold steps are essential for a different reason.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "A higher Rf value in TLC means the compound is more polar, because it moved further." Probe: "Silica is a polar stationary phase and the mobile phase is an organic solvent. Would a very polar compound move far or stay near the bottom?" Characteristic phrase: "higher Rf = more polar compound." Intervention: silica (the stationary phase) is POLAR. Polar compounds interact MORE with silica → they move LESS → lower Rf. Non-polar compounds interact little with silica → they move more in the (less polar) organic mobile phase → HIGHER Rf. The rule is: non-polar compound → high Rf (on silica); polar compound → low Rf. Higher Rf = LESS polar on normal-phase silica.
- **MC-2 (Type 5 — instruction-induced)**: "Recrystallisation means dissolving the compound at room temperature and filtering." Probe: "Why must the compound be dissolved in HOT solvent and why must it cool SLOWLY?" Characteristic phrase: "dissolve and filter is enough." Intervention: dissolving in HOT solvent achieves two things: (1) removes insoluble impurities by hot filtration; (2) allows use of minimum solvent volume so that cooling causes maximum crystallisation. Slow cooling gives large, ordered crystals that exclude impurities effectively; fast cooling gives a microcrystalline powder that may trap impurity molecules. Temperature control is not optional — it is the mechanism.
- **MC-3 (Type 2 — perceptual intuition)**: "Impurities always raise the melting point because they add extra particles." Probe: "A student finds a substance with mp 65–80°C. The literature mp for the pure compound is 82°C. What does this tell you?" Characteristic phrase: "more particles = higher mp." Intervention: impurities DEPRESS melting points (colligative property — same as freezing point depression). The impurity molecules disrupt the ordered crystal lattice, requiring less thermal energy to melt. The literature mp of the pure compound (82°C) is HIGHER than the impure sample (65–80°C) — the impurity pushed it down and widened the range.

## Analogies
**Valid**: TLC as a race on a sticky track. The starting line is the baseline; the finish line is the solvent front. Non-polar runners (non-polar compounds) slide easily on the sticky silica track (little interaction) → they run far → high Rf. Polar runners stick to the track and are slowed down → low Rf. The race result (Rf) tells you exactly how polar each runner is.

## Demonstrations
**TLC of a mixture** (e.g., two dyes or a plant extract in different solvents): spot a mixture on silica TLC plate; develop in two different solvents; compare Rf values and the effect of solvent polarity on separation. The visual result (coloured spots at different heights) is immediately interpretable and memorable.

**Melting point of pure vs. impure benzoic acid**: measure mp of pure benzoic acid (122°C, sharp) vs. a mixture with a small amount of a different solid (e.g. salicylic acid) — observe depressed and broadened range. Students directly see the purity-indicating value of sharp mp.

## Discovery Questions
1. "A student runs a reaction and TLC shows two spots: the starting material (Rf 0.3) and the product (Rf 0.7) using ethyl acetate/hexane. The reaction appears 80% complete. Describe a purification plan to isolate the product and assess its purity."
2. "Explain why steam distillation can be used to isolate a high-boiling essential oil (bp ~250°C) at a temperature well below 100°C. Why can't ordinary distillation be used at the oil's actual boiling point?"

## Teaching Sequence
1. Why purification is necessary: crude mixture composition after a reaction.
2. Distillation: simple vs. fractional vs. steam; selection criteria.
3. Recrystallisation: hot dissolve → hot filter → slow cool → cold filter; solvent selection.
4. Solvent extraction: miscibility, partitioning, acid-base trick; separating funnel.
5. TLC: stationary vs. mobile phase; Rf calculation; polarity and Rf relationship; use as purity check.
6. Column chromatography and GC-MS briefly (scale-up and identification).
7. Melting point: purity criterion; depression and broadening by impurities.

## Tutor Actions
- **If student says higher Rf = more polar**: draw a silica plate; label it "polar stationary phase"; ask "which compound is more attracted to the polar silica?" (the polar one); "which moves less?" (the polar one, stays near baseline); conclude: polar → low Rf on silica.
- **If student omits the hot filtration step in recrystallisation**: ask "when would you remove the insoluble impurities — before or after cooling?" (before — hot filtration removes them while compound is still dissolved); "what happens if you filter cold?" (the product would be on the filter, not just the impurities).
- **FRAGILE sign**: correctly describes each technique in isolation but cannot choose the right one when given a scenario (e.g. "product is a solid, impurity is a gas → recrystallisation not required").

## Voice Teaching Notes
The most commonly examined mistake is the Rf polarity relationship — drill it with the phrase "polar sticks to silica, stays low; non-polar slips past, goes high." In a voice session, have the student predict the Rf of ethanol vs. hexane on silica before giving the answer. The prediction exercise locks in the principle.

## Assessment Signals
- **Green**: selects correct technique for a given scenario; explains the physical principle behind each; calculates Rf; interprets melting point range as a purity indicator; explains why impurities depress the melting point.
- **Amber**: knows the technique names and procedures but reverses the Rf-polarity relationship.
- **Red**: says impurities raise the melting point; cannot explain why hot dissolution is necessary in recrystallisation; says high Rf = polar compound.
- **Probe**: "A crude organic product is a solid contaminated with a small amount of a very soluble impurity. The compound melts at 58–72°C (literature: 78°C). Suggest a purification method, describe the procedure, and state how you would confirm purity after purification."

## Tutor Recovery Strategy
If student cannot select a technique: convert the problem to one property — "Is your product a solid or liquid? Solid → recrystallisation or column. Liquid → distillation. Need to separate from a water-soluble impurity? → extraction." Use a decision tree with at most two binary questions until the student can navigate it independently.

## Memory Hooks
- **Technique selection**: "Liquid → distillation. Solid → recrystallisation. Immiscible solvents → extraction. Need to separate similar compounds → chromatography."
- **Rf and polarity on silica**: "Polar sticks to polar silica → LOW Rf. Non-polar slides → HIGH Rf."
- **Melting point and purity**: "Pure = SHARP at literature value. Impure = BROAD and DEPRESSED below literature value."

## Transfer Connections
- **chem.org.qualitative-analysis**: purity is a prerequisite for meaningful qualitative analysis; the techniques here (recrystallisation, TLC, mp) are the standard workflow before any structural characterisation.

## Cross-Subject Connections
- **Pharmaceutical industry**: every drug compound must meet ICH purity specifications (typically >99.5%) verified by HPLC; the techniques described here are the basis of pharmaceutical quality control.
- **Food science**: solvent extraction of oils/flavours; distillation of essential oils; chromatography for food additive analysis and authenticity testing (e.g. adulteration of olive oil).

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.org.purification`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.org.purification` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
