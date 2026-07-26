# Ketones — `chem.carb.ketones`

## Identity
- **KG ID**: chem.carb.ketones
- **Subject**: Chemistry
- **Domain**: Carbonyl Chemistry (chem.carb)
- **Prerequisites**: chem.carb.aldehydes (the neighboring carbonyl class whose reactivity ketones are constantly compared against)
- **Unlocks**: chem.carb.alpha-reactions (enolate chemistry at the carbon adjacent to the ketone carbonyl), chem.carb.spectro (spectroscopic identification of the C=O group)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 3

## Learning Objective
Distinguish keto-enol tautomers (constitutional isomers in dynamic equilibrium) from resonance structures (the same molecule, no atoms moved); predict the major product and regiochemistry of Baeyer-Villiger oxidation using the migratory aptitude order; and name at least one ketone synthesis route beyond alcohol oxidation (the Wacker process) to avoid treating "oxidize a secondary alcohol" as the only way ketones are made.

## Core Understanding
A ketone's carbonyl carbon bears two carbon substituents (distinguishing it from an aldehyde's one carbon + one hydrogen), giving it lower electrophilicity than an aldehyde toward nucleophilic addition (both a steric effect — more crowding around the carbonyl carbon — and an electronic effect — two electron-donating alkyl groups partially neutralize the carbonyl carbon's partial positive charge, compared to an aldehyde's one). **Keto-enol tautomerism**: every ketone with at least one alpha-hydrogen exists in a rapid, acid/base-catalyzed equilibrium between its keto form (C=O, sp² carbonyl carbon, sp³ alpha-carbon) and its enol form (C=C-OH, both carbons sp²) — these are genuine CONSTITUTIONAL ISOMERS (different connectivity of atoms and bonds: a C=O and a C-H become a C-OH and a C=C), not resonance structures of one single molecule; the keto form dominates overwhelmingly at equilibrium for simple ketones (typically >99.9%) because a C=O pi bond is substantially stronger than a C=C pi bond. **Baeyer-Villiger oxidation** converts a ketone to an ester by inserting an oxygen atom next to the carbonyl carbon, using a peroxyacid (e.g., mCPBA); the mechanism proceeds through a tetrahedral Criegee intermediate, and the regiochemistry (which of the two carbonyl substituents ends up bonded to the new oxygen) is governed by MIGRATORY APTITUDE (roughly tertiary > secondary ≈ aryl > primary > methyl) — the group that migrates is the one best able to stabilize developing positive character in the concerted rearrangement step, which is often the LARGER, more substituted group, contrary to a naive "smaller group moves" intuition. **Synthesis beyond alcohol oxidation**: while oxidation of a secondary alcohol (with, e.g., PCC or Jones reagent) is the most commonly taught ketone synthesis, ketones also arise from the Wacker process (Pd(II)/Cu(II)-catalyzed oxidation of a terminal alkene directly to a methyl ketone, industrially important for acetaldehyde/acetone-scale production), Friedel-Crafts acylation (aryl ketones), and ozonolysis of tetrasubstituted alkenes.

## Mental Models
- **Beginner (arriving, often wrong)**: "The keto and enol forms are resonance structures of the same molecule, like the two Kekulé structures of benzene." This model is imported directly from resonance content taught immediately before or alongside tautomerism and must be explicitly distinguished, not merely supplemented.
- **Intermediate**: "Keto-enol tautomers are different molecules in equilibrium, with keto strongly favored." Correct, and sufficient for most reaction-prediction purposes.
- **Advanced**: "Enol content and reactivity (e.g., in halogenation alpha to a ketone) can be quantitatively reasoned about via the tautomeric equilibrium constant, and Baeyer-Villiger regiochemistry is predictable from a migratory aptitude ranking, not guessable from ketone symmetry or group size alone."
- **Expert**: integrates ketone reactivity into the full carbonyl reactivity ladder (acyl chloride > aldehyde > ketone > ester > amide, for nucleophilic acyl substitution/addition) and recognizes when a synthetic target's retrosynthetic disconnection should route through Baeyer-Villiger (installing an ester regiospecifically) versus a more conventional esterification.

## Why Students Fail
The dominant failure is the same surface-pattern confusion that afflicts several concepts near this one in the curriculum: keto and enol forms are drawn as two structures connected by an equilibrium arrow, visually resembling the double-headed resonance arrow taught for genuine resonance structures, so students who have only just mastered "these two drawings are the same molecule" for resonance apply that exact rule here — missing that a resonance arrow connects structures differing ONLY in electron placement (no atom moves), while keto-enol tautomerism genuinely moves a hydrogen atom and a pi bond, producing a different constitutional isomer. The Baeyer-Villiger failure is independent and structural: students default to size-based or proximity-based steric reasoning (the habit that correctly predicts many other reaction outcomes) rather than checking the specific, sometimes counter-intuitive migratory aptitude order, because no prior concept in the sequence has required "the bigger group moves preferentially" as an explicit rule.

## Misconceptions
1. **"Keto and enol forms are resonance structures of the same molecule"** (Type 3 — notation-induced: the equilibrium arrow between keto and enol structures visually resembles, and is drawn similarly to, the double-headed resonance arrow taught for genuinely single-molecule resonance structures).
   - Probe: "Are the keto and enol forms of acetone resonance structures, or something else?"
   - Characteristic phrase: "They're resonance structures, like the two forms of a carboxylate ion."
   - Intervention: point out that resonance structures share IDENTICAL atom connectivity (only electrons move); keto and enol forms differ in WHERE a hydrogen atom is bonded and whether a given carbon has a pi bond to oxygen or to carbon — this is bond reorganization, making them genuine constitutional isomers in equilibrium, interconverted by an actual (if fast) chemical reaction (tautomerization), never merely different electron-pushing depictions of one fixed structure.

2. **"Baeyer-Villiger oxygen insertion is random, or governed by which group is smaller/closer to the peroxide"** (Type 1 — overgeneralization from generic steric/proximity reasoning that works for many other reactions but not this specific rearrangement mechanism).
   - Probe: "In the Baeyer-Villiger oxidation of methyl tert-butyl ketone, does the oxygen insert next to the methyl group or the tert-butyl group?"
   - Characteristic phrase: "The oxygen goes wherever there's more room — the smaller group's side."
   - Intervention: walk through the Criegee intermediate mechanism, showing that the group which migrates to oxygen is the one that best stabilizes developing positive character in the transition state — tertiary > secondary ≈ aryl > primary > methyl. For methyl tert-butyl ketone, the tert-butyl group (tertiary, highest aptitude) migrates, so the oxygen ends up between the carbonyl carbon and the METHYL group in the ester product — opposite to a smaller-group-migrates guess.

3. **"Ketones can only be made by oxidizing a secondary alcohol"** (Type 1 — overgeneralization from the single, most heavily emphasized synthesis route taught first).
   - Probe: "Besides oxidizing a secondary alcohol, can you name another way to make a ketone?"
   - Characteristic phrase: "The only way to make a ketone is to oxidize a secondary alcohol."
   - Intervention: introduce the Wacker process (Pd(II)/Cu(II)-catalyzed, terminal alkene + O₂/H₂O → methyl ketone) as a genuinely independent, industrially significant route, and note Friedel-Crafts acylation as a second independent route for aryl ketones — the goal is breaking the single-route mental model, not memorizing every route exhaustively.

## Analogies
- **Best (keto-enol)**: two different rooms connected by a revolving door (the tautomerization equilibrium) — people (atoms) genuinely move from one room's furniture arrangement to the other's, unlike a single room viewed through two different colored lenses (resonance, where nothing physically moves).
- **Best (Baeyer-Villiger)**: in a game of musical chairs where the "chair" (the migrating position) goes to whichever player (substituent) is best able to steady themselves mid-transition (stabilize positive character) — not necessarily the smallest or the closest player, but the most stable one under those specific dynamics.
- **Anti-analogy**: do NOT describe keto-enol tautomers as "just two ways of drawing the same molecule" — this phrasing, even said casually, directly installs MC-1.

## Demonstrations
- **Board demonstration**: draw acetone's keto form and enol form side by side, explicitly counting and comparing atom connectivity (which atom bears the OH, which carbon has the double bond) to make the constitutional-isomer distinction visually undeniable, contrasted immediately with an actual resonance pair (e.g., acetate ion) where connectivity is identical.
- **Mechanism demonstration**: draw the Criegee intermediate for an unsymmetrical ketone and have students predict, before being shown, which group migrates — then reveal the migratory aptitude order and let them self-correct.

## Discovery Questions
For keto-enol tautomerism: a short guided-discovery sequence works well — present the keto and enol structures of acetone without labeling them as tautomers or resonance forms, ask "are these the same molecule drawn two ways, or two different molecules?", have students attempt to overlay/match every atom's bonding pattern (a countable, checkable task), and let the mismatch (H bonded to O vs. to C; double bond to O vs. to C) force the "these are different molecules" conclusion themselves. For Baeyer-Villiger regiochemistry, direct instruction is the better choice — migratory aptitude is an empirically-derived ranking, not something a learner can re-derive from first principles in one session.

## Teaching Sequence
1. Secure the resonance-vs-isomer distinction using a real resonance pair BEFORE introducing keto-enol tautomerism, so the contrast is available immediately rather than retrofitted after the misconception forms.
2. Introduce keto-enol tautomerism with the atom-connectivity-counting discovery task above.
3. State the equilibrium heavily favors keto (>99.9% typically) and why (C=O pi bond strength).
4. Introduce Baeyer-Villiger only after basic ketone nucleophilic addition chemistry is secure, since the Criegee mechanism assumes familiarity with tetrahedral carbonyl intermediates.
5. Teach migratory aptitude as a ranked list to be applied, with the counter-intuitive methyl tert-butyl ketone example used deliberately to break size-based guessing.
6. Close with the synthesis-diversity correction (Wacker process, Friedel-Crafts) as a short, separate coda — this does not need to be woven into the tautomerism/Baeyer-Villiger sequence.

## Tutor Actions
- **SHOW** a genuine resonance pair immediately before introducing keto-enol tautomers, as a direct contrast anchor.
- **DO**: have the student count/match atom connectivity between keto and enol forms as a concrete discovery task.
- **TELL** the migratory aptitude order directly; this is a convention to be told, not discovered.
- **TEST-THINKING**: present the methyl tert-butyl ketone Baeyer-Villiger probe and require a justification citing migratory aptitude, not just the correct product.

## Voice Teaching Notes
Listen for "resonance" used to describe keto-enol interconversion — this exact word choice is the clearest verbal tell of MC-1 and should trigger immediate reteaching via the connectivity-counting demonstration, not a generic re-explanation. Listen for confident, fast, WRONG Baeyer-Villiger predictions defaulting to "the smaller group migrates" — fast+confident+wrong here specifically indicates the steric-reasoning habit is overriding the not-yet-installed migratory aptitude rule.

## Assessment Signals
- **Green**: correctly identifies keto-enol tautomers as constitutional isomers (not resonance) with a stated reason (atom connectivity differs); correctly predicts Baeyer-Villiger regiochemistry from migratory aptitude and can justify it; names at least one non-alcohol-oxidation ketone synthesis route.
- **Amber**: correctly predicts Baeyer-Villiger product but justifies it via size/proximity reasoning that happened to give the right answer for that specific case — flag for a second, discriminating example (a case where the tertiary group is also the smaller one is not diagnostic).
- **Red**: calls keto-enol forms "resonance structures"; predicts Baeyer-Villiger insertion by smaller-group-migrates reasoning; states alcohol oxidation as the only ketone synthesis route.
- **Mastery-certification trigger**: correct, justified answers on all three misconception probes without prompting.

## Tutor Recovery Strategy
Per `../foundations/01-recovery-engine.md` for generic stuck-learner scripts. Concept-specific shrink: if the student cannot apply migratory aptitude, don't re-teach the full Criegee mechanism — ask the smaller question "which of these two groups would form a more stable carbocation on its own?" (already-mastered content) and let them transfer that ranking directly into the migration-preference question.

## Memory Hooks
Concept type: conceptual correction (keto-enol vs. resonance) + procedural rule (migratory aptitude) + fact-correction (synthesis diversity). Review form: spaced re-probe of the resonance-vs-tautomer discrimination specifically, since this concept sits directly adjacent to heavy resonance-structure content in the curriculum and is at elevated risk of re-confusion via interference. Interleaving partner: pair with carbocation-stability review for the migratory aptitude connection.

## Transfer Connections
- **Near transfer**: predicting keto-enol behavior (e.g., alpha-halogenation rate) for an unfamiliar ketone; predicting Baeyer-Villiger product for an unfamiliar unsymmetrical ketone.
- **Far transfer**: recognizing tautomerism in other functional groups (e.g., imine-enamine tautomerism) as the same connectivity-changing phenomenon under a different name.
- **Real-world/expert transfer**: Baeyer-Villiger oxidation is used industrially to convert cyclohexanone to caprolactone/caprolactam precursors for nylon-6 production — a direct link to `chem.poly.condensation`'s step-growth polymer chemistry.

## Cross-Subject Connections
No KG `cross_links` are recorded for this concept. Enol content is directly relevant to `chem.bio.carbohydrates`'s discussion of sugar reactivity (aldoses/ketoses can tautomerize and interconvert via their shared enediol intermediate) — flagged as Curriculum Feedback below.

## Blueprint References
Blueprint file: `docs/curriculum/blueprints/chem.carb.ketones.md` (fully authored, 16-section format, self-authored misconceptions since no prior Educational Brain source existed at Blueprint-authoring time). This entry reuses that Blueprint's MC-1, MC-2, and MC-3 content by reference, restated in this entry's required format with birth-type classification added.

## Runtime Asset References
`docs/chemistry/teaching-assets/assets.json` carries an authored (`status: draft`) entry `asset.chem.carb.ketones`. No `AssetIdentity` records are seeded for `chem.carb.ketones` as of this entry's authoring date.

## Curriculum Feedback
A genuine cross-subject connection exists between ketone/aldehyde tautomerism here and the enediol-mediated aldose-ketose interconversion central to `chem.bio.carbohydrates`, currently not encoded as a KG cross-link — recorded as feedback to the Curriculum Production Pipeline, not fixed locally.

## Version History
- v1.0.0 — 2026-07-25 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0, closing the KG − EB coverage gap for this concept.
