# Named Carbonyl Reactions — `chem.carb.named-reactions`

## Identity
- **KG ID**: chem.carb.named-reactions
- **Subject**: Chemistry
- **Domain**: Carbonyl Chemistry (chem.carb)
- **Prerequisites**: chem.carb.alpha-reactions (enolate chemistry underlying Claisen/Perkin/Knoevenagel), chem.carb.derivatives (nucleophilic acyl substitution underlying Claisen condensation specifically)
- **Unlocks**: (none — terminal, synthesis-integration node)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Explain the Wittig reaction's specific synthetic advantage (regiochemical certainty in alkene formation) rather than treating it as interchangeable with elimination-based alkene synthesis; and predict Baeyer-Villiger oxidation regiochemistry using the migratory aptitude order, rather than defaulting to size- or proximity-based steric reasoning.

## Core Understanding
Several named reactions in this cluster (Perkin, Knoevenagel, Reformatsky, Wittig, Baeyer-Villiger) each solve a SPECIFIC synthetic problem that a generic reaction cannot, and understanding each one's specific value (not just its mechanism) is the actual skill being taught. **The Wittig reaction**'s defining synthetic advantage is REGIOCHEMICAL CERTAINTY: it forms a new C=C double bond specifically and exclusively between the ylide's carbanion-bearing carbon and the target carbonyl's carbon — the position of the resulting alkene is fully determined by which ylide and which carbonyl compound are chosen, with no competing regiochemical outcomes. This contrasts sharply with E1/E2 elimination on an unsymmetrical alkyl halide, which frequently produces a MIXTURE of regiochemical alkene products (Zaitsev/Hofmann competition) with no guaranteed single outcome — this positional certainty, not mere alkene formation, is why a synthetic chemist specifically selects a Wittig disconnection when a precisely-positioned alkene is required. **Baeyer-Villiger oxidation** converts a ketone to an ester by inserting an oxygen atom adjacent to the carbonyl carbon via a peroxyacid, proceeding through a tetrahedral Criegee intermediate; the regiochemistry (which of the two groups on the ketone ends up bonded to the new oxygen) is governed by MIGRATORY APTITUDE — roughly tertiary > secondary ≈ aryl > primary > methyl — reflecting which group best stabilizes developing positive character during the concerted migration step. This ranking can run directly counter to naive size-based intuition: for methyl tert-butyl ketone, the LARGER tert-butyl group (tertiary, high aptitude) migrates preferentially over the smaller methyl group, so the oxygen ends up between the carbonyl carbon and the METHYL group in the ester product — the opposite of a "smaller/closer group migrates" guess.

## Mental Models
- **Beginner (arriving, often wrong)**: "The Wittig reaction is just another way to make an alkene, interchangeable with elimination methods already learned." This model files the Wittig reaction under "alkene synthesis" purely by outcome type, without distinguishing what makes it specifically valuable.
- **Intermediate**: "The Wittig reaction gives a single, positionally certain alkene product, unlike elimination which can give a mixture." Correct and load-bearing for retrosynthetic decision-making.
- **Advanced**: "Baeyer-Villiger regiochemistry follows migratory aptitude (tertiary > secondary ≈ aryl > primary > methyl), which can override naive steric/size intuition — the group that migrates is often the LARGER, more substituted one." 
- **Expert**: selects among Wittig, Baeyer-Villiger, and other named disconnections during retrosynthetic planning based on which specific synthetic problem (regiochemical certainty, oxygen insertion with defined regiochemistry, chain extension, etc.) each one uniquely solves for a given target molecule.

## Why Students Fail
The Wittig failure comes from categorizing reactions by their PRODUCT TYPE (an alkene) rather than by the SPECIFIC PROBLEM they solve (regiochemical certainty), a natural simplification when a course presents "ways to make an alkene" as a single list without explicitly comparing their reliability — since elimination methods were likely taught first and already "work" for making alkenes in simple cases, the Wittig reaction's distinguishing advantage (guaranteed position) is easy to miss unless a directly comparative example (the same target alkene attempted both ways) is shown. The Baeyer-Villiger failure is a straightforward transfer of generic steric reasoning ("smaller/closer groups move more easily"), a heuristic that correctly predicts many other reaction outcomes, applied here without checking that THIS specific mechanism (migration with developing positive character) rewards electronic stabilization over steric ease — since no prior concept in the sequence has required "the bigger group moves preferentially," students have no signal to distrust their default steric intuition until shown a directly contradicting worked example.

## Misconceptions
1. **"The Wittig reaction is just another way to make an alkene, interchangeable with elimination"** (Type 1 — overgeneralization categorizing reactions by product type rather than by their specific synthetic guarantee).
   - Probe: "Could you use E2 elimination on an unsymmetrical alkyl halide to achieve the exact same regiochemical outcome as a Wittig reaction targeting a specific alkene position?"
   - Characteristic phrase: "The Wittig reaction just makes an alkene — you could use elimination instead and get the same thing."
   - Intervention: present the direct side-by-side comparison — E2 elimination on an unsymmetrical alkyl halide frequently gives a MIXTURE of regiochemical products (Zaitsev/Hofmann competition), while the Wittig reaction forms the C=C bond exclusively between the ylide carbon and the carbonyl carbon, with the position fully determined by the reagents chosen. State plainly that this positional certainty, not mere "makes an alkene," is why the Wittig reaction is specifically selected in synthesis planning.

2. **"Baeyer-Villiger oxygen insertion is determined by which group is smaller or closer, not by migratory aptitude"** (Type 1 — overgeneralization from generic steric/proximity reasoning that works for many other reactions but not this specific migration mechanism).
   - Probe: "In the Baeyer-Villiger oxidation of methyl tert-butyl ketone, does the oxygen insert next to the methyl group or the tert-butyl group? Is this determined by which group is smaller/closer?"
   - Characteristic phrase: "The oxygen should insert wherever there's more room, or on the smaller/simpler side."
   - Intervention: draw the Criegee intermediate and the concerted migration step explicitly, stating the migratory aptitude order (tertiary > secondary ≈ aryl > primary > methyl) and its electronic basis (stabilization of developing positive character). For methyl tert-butyl ketone, show that the tert-butyl group (tertiary, high aptitude) migrates preferentially, placing oxygen next to the METHYL group in the product — directly opposite a size-based guess.

## Analogies
- **Best (Wittig)**: a GPS-guided delivery that always drops a package at one exact, pre-specified address, versus a delivery service that sometimes drops it at one of several plausible nearby addresses depending on conditions (elimination's regiochemical mixtures) — the GPS-guided method's core value is the guaranteed exact destination, not merely "making a delivery."
- **Best (Baeyer-Villiger)**: a game of musical chairs where the chair goes to whichever player is best able to steady themselves mid-transition (stabilize positive character), not necessarily the smallest or closest player.
- **Anti-analogy**: do NOT say "the Wittig reaction just makes a double bond, like any elimination would" — this directly installs MC-1 by discarding the regiochemical-certainty distinction that is the entire point of choosing this reaction.

## Demonstrations
- **Side-by-side regiochemistry demonstration**: present the same target alkene synthesized via (a) E2 elimination on an unsymmetrical alkyl halide (showing the possible product mixture) and (b) a Wittig reaction (showing the single, certain product), making the contrast directly comparable.
- **Criegee mechanism demonstration**: draw the full Baeyer-Villiger mechanism for methyl tert-butyl ketone, eliciting a student prediction for which group migrates BEFORE revealing the migratory aptitude order, so the counter-intuitive result registers as a genuine surprise to resolve.

## Discovery Questions
For the Wittig reaction's advantage, a discovery-shaped comparative question works well: "Given an unsymmetrical alkyl halide that could eliminate to give two different alkenes, and a Wittig disconnection targeting the same molecule — which method guarantees you get only the alkene you want?" letting students reach the regiochemical-certainty conclusion themselves from the direct comparison. For Baeyer-Villiger migratory aptitude, direct instruction is preferable — the aptitude ranking is an empirically-derived order that cannot be re-derived from first principles in one session.

## Teaching Sequence
1. Introduce the Wittig reaction only after elimination-based alkene synthesis (and its regiochemical mixture problem) is already familiar, so the contrast is available immediately rather than needing to be retrofitted.
2. Use the side-by-side regiochemistry demonstration to make the Wittig's specific advantage concrete before naming it abstractly.
3. Introduce Baeyer-Villiger only after basic ketone nucleophilic addition and the Criegee-intermediate concept (tetrahedral intermediate formation) are secure.
4. Present the migratory aptitude order with the counter-intuitive methyl tert-butyl ketone example deliberately, to directly confront and break size-based guessing rather than avoiding the harder case.

## Tutor Actions
- **SHOW** the side-by-side Wittig-vs-elimination regiochemistry comparison before naming the Wittig reaction's advantage abstractly.
- **TELL** the migratory aptitude order directly; this is a convention to be told, not discovered.
- **DO**: have the student predict the Baeyer-Villiger product regiochemistry for an unfamiliar unsymmetrical ketone using the migratory aptitude order.
- **TEST-THINKING**: ask the student to justify why the Wittig reaction is specifically chosen over elimination for a regiochemically sensitive target, not merely state that it is.

## Voice Teaching Notes
Listen for the Wittig reaction described purely as "a way to make an alkene" with no mention of regiochemical certainty or comparison to elimination — this omission, even when technically not wrong, signals MC-1 is still the operative framing. Listen for confident, fast, WRONG Baeyer-Villiger predictions defaulting to "the smaller group migrates" — this specific error pattern indicates the general steric-reasoning habit overriding the not-yet-installed migratory aptitude rule.

## Assessment Signals
- **Green**: explains the Wittig reaction's advantage as regiochemical certainty with a direct comparison to elimination's potential mixtures; correctly predicts Baeyer-Villiger regiochemistry from migratory aptitude with a stated electronic justification.
- **Amber**: correctly predicts the Wittig product but cannot articulate why it's preferred over elimination for a given target; correctly predicts Baeyer-Villiger regiochemistry for a case where the tertiary group also happens to be the smaller one (not a discriminating test) but fails on the methyl tert-butyl ketone case.
- **Red**: treats Wittig and elimination as interchangeable; predicts Baeyer-Villiger insertion by smaller-group-migrates reasoning.
- **Mastery-certification trigger**: correct, justified answers on both misconception probes without prompting.

## Tutor Recovery Strategy
Per `../foundations/01-recovery-engine.md` for generic stuck-learner scripts. Concept-specific shrink: if a student cannot apply migratory aptitude, ask the smaller, already-mastered question "which of these two groups would form a more stable carbocation on its own?" and let them transfer that ranking directly into the migration-preference question, exactly as in `chem.carb.ketones`'s parallel recovery strategy for the same mechanism.

## Memory Hooks
Concept type: comparative-reasoning skill (Wittig vs. elimination) + procedural rule (migratory aptitude). Review form: spaced re-probe specifically requiring justification (not just the correct product) for both misconceptions, since a correct answer for the wrong reason is the highest-risk failure mode here. Interleaving partner: pair with `chem.carb.ketones`'s Baeyer-Villiger content (the same mechanism, first introduced there) and with elimination-reaction review for the Wittig comparison.

## Transfer Connections
- **Near transfer**: selecting between Wittig and elimination-based disconnections for an unfamiliar retrosynthetic target requiring a specific alkene position; predicting Baeyer-Villiger regiochemistry for an unfamiliar unsymmetrical ketone.
- **Far transfer**: recognizing the general pattern that "some reactions are chosen specifically for the guarantee they provide, not merely for the product class they generate" in other reaction-selection contexts throughout organic chemistry.
- **Real-world/expert transfer**: the Wittig reaction is a Nobel Prize-recognized (Georg Wittig, 1979) cornerstone of modern organic synthesis, used industrially in vitamin A and carotenoid production specifically because of its regiochemical reliability; Baeyer-Villiger oxidation is used industrially to convert cyclohexanone to caprolactone/caprolactam precursors for nylon-6 production.

## Cross-Subject Connections
No KG `cross_links` are recorded for this concept. Baeyer-Villiger's role in caprolactam production connects directly to `chem.poly.condensation`'s step-growth polymer chemistry — flagged as Curriculum Feedback below.

## Blueprint References
Blueprint file: `docs/curriculum/blueprints/chem.carb.named-reactions.md` (fully authored, 16-section format, self-authored misconceptions since no prior Educational Brain source existed at Blueprint-authoring time). This entry reuses that Blueprint's MC-1 and MC-2 content by reference, restated in this entry's required format with birth-type classification added.

## Runtime Asset References
`docs/chemistry/teaching-assets/assets.json` carries an authored (`status: draft`) entry `asset.chem.carb.named-reactions`. No `AssetIdentity` records are seeded for `chem.carb.named-reactions` as of this entry's authoring date.

## Curriculum Feedback
Baeyer-Villiger oxidation's industrial role in caprolactam/nylon-6 precursor production connects directly to `chem.poly.condensation`, currently not encoded as a KG cross-link — recorded as feedback to the Curriculum Production Pipeline, not fixed locally.

## Version History
- v1.0.0 — 2026-07-25 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0, closing the KG − EB coverage gap for this concept.
