# chem.carb.ketones — Ketones

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.carb.ketones` |
| Domain | Carbonyl Compounds |
| Requires | `chem.carb.aldehydes` |
| Unlocks | `chem.carb.alpha-reactions`, `chem.carb.spectro` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 3 |

## 1. Concept Spine

Keto-enol tautomers are NOT resonance structures (not two ways of drawing "the same" electron distribution) — they are genuinely DIFFERENT constitutional isomers with different connectivity (the enol has an O–H bond and a C=C bond; the keto form has a C=O bond and an extra C–H bond), interconverting via a real bond-breaking/forming equilibrium (tautomerization), never instantaneously via electron-pushing alone; the Baeyer-Villiger oxidation of an UNSYMMETRICAL ketone does NOT insert oxygen at a random or "either" position — the MORE SUBSTITUTED (better migrating-group-ability) carbon group migrates preferentially to oxygen, following a specific migratory-aptitude order (tertiary>secondary>aryl>primary>methyl), so the ester product's regiochemistry is predictable, not arbitrary; and ketones are NOT generally prepared by simple oxidation of secondary alcohols alone in industrial contexts — the Wacker process specifically converts terminal ALKENES directly to methyl ketones via Pd(II)/Cu(II) catalytic oxidation (Markovnikov-selective), an entirely different, industrially significant route that does not require a pre-existing alcohol at all.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Drawing the explicit keto and enol tautomers of acetone side by side, tracking the specific bonds that break and form (C–H/C=O vs. O–H/C=C) during the interconversion, distinguishing this from a resonance arrow (same connectivity, different electron placement).

**Representational**: A migratory-aptitude ranking diagram (tertiary>secondary>aryl>primary>methyl) applied to an explicit unsymmetrical ketone, predicting which group migrates in Baeyer-Villiger oxidation.

**Abstract**: The general principle that tautomers are genuine constitutional isomers (different bonding, real equilibrium), never resonance structures (same bonding, electron delocalization only); the general principle that migratory aptitude in 1,2-shift-type rearrangements (like Baeyer-Villiger) follows a predictable substitution-based order, not arbitrary/statistical placement.

**Transfer**: Given an unfamiliar carbonyl compound, correctly distinguishing its tautomers (genuine isomers) from its resonance structures (same isomer, different electron depiction); given an unfamiliar unsymmetrical ketone, correctly predicting Baeyer-Villiger regiochemistry from migratory aptitude.

## 3. Why Beginners Fail

Students, having learned resonance structures as "different ways of drawing the same molecule with delocalized electrons," see the similar-looking keto/enol interconversion (also involving electron movement) and assume tautomers are simply another instance of resonance, missing that tautomers are genuinely DIFFERENT constitutional isomers with different atom connectivity (a real O–H/C=C bond arrangement vs. a real C=O/extra-C–H arrangement) — interconversion requires actual bond-breaking and forming (a real chemical equilibrium), never the "same molecule, different arrow-pushing" logic of true resonance; and students, encountering the Baeyer-Villiger oxidation for the first time, may assume the inserted oxygen atom's position is arbitrary or determined by chance/statistics between the two possible migrating groups, missing that the reaction follows a specific, predictable MIGRATORY APTITUDE order (more substituted/more electron-rich groups migrate preferentially), making the ester product's regiochemistry a determinable, not random, outcome.

## 4. Misconception Library

### MC-1: Keto and enol tautomers are just resonance structures of the same molecule
- **Probe**: "Draw the keto and enol forms of acetone. Are these two resonance structures of one molecule, or two different molecules?"
- **Characteristic phrase**: "tautomers are just resonance forms, like drawing electrons differently."
- **Trigger (Type 3, language contamination)**: The keto-enol interconversion is often introduced alongside resonance concepts, and both involve "moving electrons," inviting conflation.
- **Conflict evidence [P28]**: The keto form (e.g., acetone, CH₃COCH₃) has a C=O bond and specific C–H bonds at each methyl group. The enol form (CH₂=C(OH)CH₃) has a C=C bond, an O–H bond, and one fewer C–H bond at the former carbonyl carbon's neighbor. These are genuinely DIFFERENT constitutional isomers — different atoms are bonded to different other atoms — not the same molecule with electrons merely redistributed. Interconversion (tautomerization) requires an actual proton to physically move from carbon to oxygen (or vice versa), a real bond-breaking/bond-forming process, unlike resonance (which involves no atomic movement at all, only electron delocalization within one fixed set of connectivity).
- **Bridge [P30]**: Resonance structures share IDENTICAL atomic connectivity (the same atoms bonded to the same other atoms) and differ only in how electron pairs are formally depicted — no atoms or bonds are considered to physically move between resonance structures, since they represent one single, real electron distribution viewed through different simplified Lewis-structure snapshots. Tautomers, in contrast, have GENUINELY DIFFERENT connectivity (different bonds actually present), interconverting via a real, physical equilibrium reaction that breaks and forms actual bonds (here, a C–H bond breaking and an O–H bond forming, or vice versa) — this is chemically a completely different phenomenon from resonance.
- **Replacement [P31]**: Tautomers are genuine constitutional isomers with different bond connectivity, interconverting via a real equilibrium reaction (bond-breaking/forming) — never treat them as resonance structures of a single fixed-connectivity molecule.
- **Discrimination pairs [P33]**: Resonance structures (identical connectivity, only electron depiction differs, no real interconversion) vs. keto/enol tautomers (genuinely different connectivity, real bond-breaking/forming equilibrium).
- **S6 repair path**: Present the explicit bond-by-bond comparison between keto and enol forms, tracking exactly which bonds break and form during tautomerization.

### MC-2: Baeyer-Villiger oxidation inserts oxygen at a random or arbitrary position in an unsymmetrical ketone
- **Probe**: "In the Baeyer-Villiger oxidation of methyl tert-butyl ketone (a highly unsymmetrical ketone), which carbon group migrates to oxygen — the methyl or the tert-butyl group?"
- **Characteristic phrase**: "either group could migrate, it's basically random."
- **Trigger (Type 2, perceptual intuition)**: Without exposure to the specific migratory-aptitude concept, students may assume an unspecified rearrangement step is unpredictable.
- **Conflict evidence [P28]**: Baeyer-Villiger oxidation follows a specific migratory aptitude order: tertiary>secondary>aryl (with electron-donating groups)>primary>methyl. The MORE SUBSTITUTED (more electron-rich, better able to stabilize developing positive character during the concerted migration step) group migrates preferentially to the electrophilic oxygen. For methyl tert-butyl ketone, the tert-butyl group migrates, giving the ester with tert-butyl bonded to oxygen (not methyl).
- **Bridge [P30]**: The Baeyer-Villiger mechanism's migration step is a concerted process where the migrating group's bonding electrons assist in displacing the peracid's leaving group, meaning groups that can better STABILIZE the resulting partial positive character during this transition state (more substituted, more electron-donating groups) migrate PREFERENTIALLY and predictably — this is directly analogous to carbocation stability trends in other rearrangement reactions, making the regiochemistry a determinable consequence of substituent electronics, never an arbitrary or statistical outcome.
- **Replacement [P31]**: Baeyer-Villiger oxidation follows a specific migratory aptitude order (tertiary>secondary>aryl>primary>methyl) — always predict the major product from this order, never assume random or arbitrary oxygen insertion.
- **Discrimination pairs [P33]**: Methyl tert-butyl ketone (tert-butyl migrates, predictable from migratory aptitude) vs. a hypothetical random-insertion assumption (would predict an unpredictable mixture, contradicted by the observed selectivity).
- **S6 repair path**: Present the explicit migratory-aptitude ranking, deriving the predicted product for an unsymmetrical ketone from this order.

### MC-3: Ketones are prepared only by oxidizing secondary alcohols
- **Probe**: "Can a ketone be prepared directly from a terminal alkene, without first making an alcohol?"
- **Characteristic phrase**: "ketones always come from oxidizing an alcohol."
- **Trigger (Type 1, overgeneralization)**: The most commonly first-taught ketone synthesis (secondary alcohol oxidation) is generalized as the only route.
- **Conflict evidence [P28]**: The Wacker process converts terminal alkenes DIRECTLY to methyl ketones using a Pd(II)/Cu(II) catalytic system (Markovnikov-selective oxidation), with no alcohol intermediate isolated or required. This is a major industrial route (e.g., ethylene→acetaldehyde in the related Wacker-Tsuji process; propene→acetone). Friedel-Crafts acylation and alkyne hydration are additional non-alcohol-oxidation routes to ketones.
- **Bridge [P30]**: Secondary alcohol oxidation is one CONCEPTUALLY SIMPLE route to ketones (a straightforward two-electron oxidation), but organic synthesis offers multiple independent strategic routes to the same functional group, each proceeding through entirely different mechanisms and starting materials — the Wacker process's palladium-mediated alkene oxidation achieves the same carbonyl outcome through an organometallic catalytic cycle that never passes through an isolable alcohol intermediate, demonstrating that "ketone preparation" is not synonymous with "alcohol oxidation."
- **Replacement [P31]**: Ketones can be prepared through multiple independent routes (alcohol oxidation, Wacker process from alkenes, Friedel-Crafts acylation, alkyne hydration) — never assume alcohol oxidation is the only pathway.
- **Discrimination pairs [P33]**: Secondary alcohol oxidation (classic two-electron oxidation route) vs. Wacker process (direct alkene-to-ketone, Pd/Cu catalytic, no alcohol intermediate) — genuinely different synthetic strategies reaching the same product class.
- **S6 repair path**: Present the explicit Wacker-process catalytic cycle, contrasting it with the simple alcohol-oxidation route to reinforce the existence of multiple independent ketone-synthesis strategies.

## 5. Explanation Library

**Primary explanation**: Keto and enol tautomers are genuinely distinct constitutional isomers (different bond connectivity), interconverting via a real chemical equilibrium involving actual bond-breaking and bond-forming — fundamentally different from resonance structures, which share identical connectivity and differ only in electron-pair depiction with no true interconversion.

**Secondary explanation (migratory aptitude and multiple synthesis routes)**: The Baeyer-Villiger oxidation's regiochemistry is predictable from migratory aptitude (tertiary>secondary>aryl>primary>methyl), reflecting which group best stabilizes developing positive character during the concerted migration step — never arbitrary. Ketones can be synthesized via multiple independent strategic routes (alcohol oxidation, the Wacker process, Friedel-Crafts acylation, alkyne hydration), not exclusively through alcohol oxidation.

## 6. Analogy Library

- **Primary analogy**: Two different houses built from rearranged building materials (tautomers, genuinely different structures) vs. two different photographs of the identical house taken from different angles (resonance structures, same structure, different depiction).
- **Breaking point**: The houses-vs-photographs analogy conveys the tautomer-vs-resonance distinction well but doesn't naturally capture the migratory-aptitude ordering (MC-2) or the multiple-synthesis-routes concept (MC-3) — those need the explicit migratory-aptitude ranking and the Wacker-process mechanism.
- **Anti-analogy**: Do NOT say "tautomers are like resonance structures but for the whole molecule" — this directly reinforces MC-1 by treating tautomerization as an extension of resonance rather than a genuinely different phenomenon.

## 7. Demonstration Library

- **Demonstration 1 (bond-by-bond keto/enol comparison)**: Draw both tautomers explicitly, tracking every bond that breaks and forms during interconversion.
- **Demonstration 2 (migratory-aptitude-based Baeyer-Villiger prediction)**: Apply the explicit migratory-aptitude ranking to an unsymmetrical ketone, predicting the major ester product.
- **Demonstration 3 (Wacker-process catalytic cycle)**: Present the explicit Pd(II)/Cu(II) catalytic cycle converting a terminal alkene directly to a methyl ketone.

## 8. Discovery Lesson

**Opening**: "Are the keto and enol forms of acetone the same molecule drawn two ways, or genuinely different molecules?"

**Exploration**: Students track the specific bonds present in each tautomer, discovering genuinely different connectivity requiring real bond-breaking/forming to interconvert.

**Synthesis**: Guide toward: tautomers are constitutional isomers in real equilibrium, categorically different from resonance structures.

**Closure**: "In Baeyer-Villiger oxidation of an unsymmetrical ketone, does the oxygen insert randomly?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit bond-by-bond keto/enol comparison.
- **TA-2 (TELL)**: State the migratory-aptitude order explicitly, anchored to an unsymmetrical-ketone prediction.
- **TA-3 (DO)**: Student predicts the Baeyer-Villiger product for an unfamiliar unsymmetrical ketone.
- **TA-4 (TEST-THINKING)**: Present the Wacker-process probe and ask the student to justify a non-alcohol-oxidation ketone synthesis route.

## 10. Voice Teaching

Whenever tautomers are discussed, narrate "genuinely different bonds, real equilibrium — never just resonance." Whenever Baeyer-Villiger regiochemistry is predicted, state "check migratory aptitude — more substituted groups migrate preferentially" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly distinguish tautomers from resonance structures, (b) correctly predict Baeyer-Villiger regiochemistry from migratory aptitude, (c) correctly identify multiple independent ketone-synthesis routes.

- **FA-1**: "Draw the keto and enol forms of acetone. Are these two resonance structures of one molecule, or two different molecules?" — targets MC-1.
- **FA-2**: "In the Baeyer-Villiger oxidation of methyl tert-butyl ketone, which carbon group migrates to oxygen?" — targets MC-2.
- **FA-3**: "Can a ketone be prepared directly from a terminal alkene, without first making an alcohol?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only recently learned resonance and encounter tautomers immediately afterward.

**Delayed retrieval**: Re-probe MC-1's tautomer-vs-resonance distinction and MC-2's migratory-aptitude reasoning as foundational knowledge for subsequent alpha-carbon-reaction and spectroscopic-identification applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the tautomer/resonance confusion, have the student explicitly count and compare bonds in both forms before concluding anything about their relationship.
- **S4 (frustrated)**: Normalize — conflating tautomers with resonance is genuinely common on first exposure, since both involve electron/proton movement language.
- **S6 (collision)**: Use the explicit migratory-aptitude ranking for MC-2; use the Wacker-process mechanism for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why tautomerization requires an actual chemical equilibrium, unlike resonance.

## 13. Memory & Review

Tag as one conceptual-correction memory (tautomer-vs-resonance distinction) plus two procedural memories (migratory-aptitude-based Baeyer-Villiger prediction; multiple ketone-synthesis routes). Schedule a spaced check at ~1 week.

## 14. Transfer Map

Feeds directly into `chem.carb.alpha-reactions` (keto-enol tautomerism is foundational to alpha-carbon chemistry) and `chem.carb.spectro` (distinguishing tautomers and predicting oxidation products informs spectroscopic structure elucidation).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
