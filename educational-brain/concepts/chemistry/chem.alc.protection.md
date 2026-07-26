# Protecting Group Strategy — `chem.alc.protection`

## Identity
- **KG ID**: chem.alc.protection
- **Subject**: Chemistry
- **Domain**: Alcohols, Phenols and Ethers (chem.alc)
- **Prerequisites**: chem.alc.alcohols (the O–H functionality being masked), chem.alc.phenols (the second, more acidic O–H functionality that needs its own, distinct protection chemistry)
- **Unlocks**: (none — this is a terminal, synthesis-integration node)
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 3

## Learning Objective
Explain why a protecting group is installed and removed as a deliberate two-step bracket around a synthesis, never a permanent structural change; identify, for a named protecting group (THP, MOM, TBS, benzyl, acetyl), its installation conditions, its removal conditions, and what other functionality it is stable toward; and evaluate whether a proposed pair of protecting groups on the same molecule is orthogonal (independently removable) before selecting a synthetic route.

## Core Understanding
A protecting group is a temporary covalent modification installed on a reactive functional group specifically so that group survives a set of reaction conditions elsewhere in the molecule that would otherwise destroy it, and then deliberately removed later in the same synthesis to regenerate the original functionality. The five workhorse groups for alcohols/phenols each trade off differently: **acetyl** (installed with acetic anhydride/pyridine; removed by base or mild acid hydrolysis) is cheap and simple but only moderately robust; **benzyl** (installed via Williamson ether synthesis with benzyl bromide/base; removed by hydrogenolysis, H₂/Pd-C) is very robust to both acid and base but requires a metal-catalyzed reductive step to remove, which is incompatible with other reducible functionality (alkenes, alkynes, nitro groups) present in the same molecule; **THP** (tetrahydropyranyl, installed with dihydropyran/acid catalyst; removed by mild aqueous acid) and **MOM** (methoxymethyl, installed with MOM-Cl/base; removed by acid) are both acid-labile acetals, stable to base and to nucleophiles/organometallics, making them ideal partners for a subsequent Grignard or organolithium step; **TBS** (tert-butyldimethylsilyl, installed with TBSCl/imidazole; removed specifically by fluoride, e.g. TBAF) is stable to both mild acid AND base, and its removal condition (fluoride) is essentially orthogonal to every other common deprotection condition, making it the group of choice when two OTHER protecting groups already occupy the acid-labile and base-labile removal niches. **Orthogonality** is the central design requirement in any multi-protecting-group synthesis: when a molecule carries two or more protected groups, the conditions used to remove ONE must not also remove or damage any OTHER protected (or unprotected, sensitive) functionality present — this is verified by checking each group's stated stability profile against every other group's removal conditions, not merely confirming that a given reagent removes the intended target.

## Mental Models
- **Beginner (arriving, often wrong)**: "Protecting the alcohol as a TBS ether makes the molecule into a TBS ether" — treats the transformation as a normal, permanent synthetic step, the same as any other functional-group interconversion already learned.
- **Intermediate**: "A protecting group is temporary — it gets removed later." Correct but incomplete: does not yet reason about WHICH removal conditions are safe when more than one protected group is present.
- **Advanced**: "Selecting a protecting group means selecting BOTH its installation step AND a removal condition that is orthogonal to every other group and every other sensitive functionality present in the molecule at deprotection time." This is the operational, synthesis-planning-ready model.
- **Expert**: reasons about protecting-group strategy holistically across an entire multi-step synthesis before the first step is run — choosing the ORDER of installation/removal so that intermediate structures never expose a group to conditions it cannot survive, and treating "which groups pair well together" (e.g., TBS + THP; benzyl reserved for molecules with no other reducible groups) as a standing piece of expert pattern knowledge, not a case-by-case derivation.

## Why Students Fail
The primary failure mechanism is treating protection as an ordinary, permanent synthetic transformation rather than a temporary bracket — because the reaction arrow used to install a protecting group looks identical to any other synthetic step, nothing in the notation itself signals "this must be undone later," so a synthesis scheme that stops after installation (without a deprotection step shown) can look complete to a student even though it is not. The secondary, independent failure is selecting a deprotection reagent by checking ONLY whether it removes the intended target group, without checking its effect on every OTHER group present in the same molecule — this happens because early practice problems typically feature only ONE protecting group, so the habit of "does this reagent work on my target" is never stress-tested against a second, co-existing group until a multi-protecting-group problem is encountered, often for the first time in an exam or a real synthesis-design task.

## Misconceptions
1. **"A protecting group is a permanent structural modification"** (Type 1 — overgeneralization from ordinary functional-group transformations, where the product of a reaction IS the intended final structure).
   - Probe: "A synthesis converts an alcohol to its TBS ether in step 2, then does a Grignard addition in step 3. Is the TBS ether part of the final product?"
   - Characteristic phrase: "The TBS group is now part of the molecule's structure."
   - Intervention: state explicitly that a synthesis scheme using a protecting group is INCOMPLETE until a deprotection step is shown; walk through the full protect → react → deprotect bracket for this exact example, ending with TBAF regenerating the free alcohol, and ask the student to identify what would be wrong with a synthesis scheme that stopped one step early.

2. **"Any reagent that removes my target protecting group is a safe choice, regardless of what else is on the molecule"** (Type 1 — overgeneralization from single-protecting-group practice problems, where there is no "what else" to check).
   - Probe: "A molecule has both a TBS ether and a THP acetal. You want to remove only the TBS group and keep the THP group intact. Does it matter which reagent you choose?"
   - Characteristic phrase: "Any reagent that removes the TBS group will work fine."
   - Intervention: build the two-group stability table explicitly: TBAF (fluoride) removes TBS and leaves THP untouched; dilute aqueous acid removes THP and leaves TBS untouched. State the general principle — every deprotection choice must be checked against EVERY group present, not just the target — and have the student verify (not just recall) the pairing by consulting each group's stability profile.

## Analogies
- **Best**: bubble wrap placed around a fragile item specifically for the trip (surviving the "reaction conditions" of shipping), then deliberately removed on arrival to reveal the unchanged original item — nobody mistakes the bubble wrap for a permanent feature of the item.
- **Story analogy**: two guests at a party each wearing a name tag that can only be removed by a specific, different keyword — the host (chemist) must know which keyword removes which tag before calling either one out loud, or the wrong guest's identity gets revealed.
- **Anti-analogy**: do NOT say "protecting the alcohol turns it into an ether" as a flat structural statement without immediately following it with "temporarily, and here is how it comes back off" — stated alone, this phrasing actively installs the permanence misconception (MC-1).

## Demonstrations
- **Board/scheme demonstration**: draw the complete three-step protect → Grignard → deprotect scheme for a real target molecule, explicitly labeling each arrow's reagent and asking students to identify which arrow is "undoing" an earlier one.
- **Orthogonality-table demonstration**: build, live, a 2×2 stability grid for TBS and THP against {mild acid, fluoride}, filling in "removed" / "stable" in each cell from the groups' known properties, then use the completed grid to answer the MC-2 probe as a lookup rather than a guess.

## Discovery Questions
Direct instruction is the better choice for this concept's core facts (which reagent installs/removes which named group are memorized conventions, not derivable principles), but a discovery-shaped question is valuable for the orthogonality REASONING once the individual group facts are known: "Here is a molecule that needs both its primary alcohol and its phenol protected before a strong base is used elsewhere in the synthesis, and both must later be removed independently. Given the five groups' stability profiles, which pair would you choose, and in what order would you remove them?" — this lets the student apply, not re-derive, the underlying principle (orthogonality) to a genuinely new combination.

## Teaching Sequence
1. Install the temporary-bracket model FIRST, using a single protecting group end-to-end (protect → react → deprotect), before any second group or orthogonality question is introduced — MC-1 must be resolved before MC-2 can even be meaningfully asked.
2. Introduce each named group's installation/removal pair one at a time, always stating what it is stable toward, not only how to install/remove it.
3. Only once at least two groups' stability profiles are both secure, introduce the two-group orthogonality question — attempting this earlier forces guessing rather than table-lookup reasoning.
4. Close with a synthesis-design item requiring the student to choose an orthogonal pair AND the correct removal order for a molecule with two sensitive groups.

## Tutor Actions
- **TELL** each named group's installation and removal conditions directly — these are conventions to be told, not concepts to be discovered.
- **SHOW** the full protect-react-deprotect bracket at least once before asking any orthogonality question.
- **DO**: have the student select an orthogonal protecting-group pair and removal order for an unfamiliar multi-functional-group target — this is the single highest-value practice action, since it is the actual synthetic-design skill being certified.
- **TEST-THINKING**: ask the student to justify why a synthesis scheme is incomplete without its deprotection step shown, rather than simply asking them to recite that it is.

## Voice Teaching Notes
Listen for a synthesis description that ends at the protected intermediate with no mention of removal — this is the clearest verbal tell of MC-1, often surfacing as confident silence (the student sees nothing left to say) rather than a wrong statement. Listen also for "I'd just use [reagent] because it removes TBS" with no qualifying check against the other group present — the absence of the qualifying check, not an explicitly wrong answer, is the tell for MC-2.

## Assessment Signals
- **Green**: spontaneously includes the deprotection step when describing any protected synthesis; correctly selects an orthogonal reagent pair for a two-group molecule and can state WHY the chosen reagent leaves the other group untouched (not just that it does).
- **Amber**: correctly names installation/removal reagents for individual groups in isolation but does not check orthogonality unprompted when two groups are present together.
- **Red**: describes a protected intermediate as if it were the final product; selects a deprotection reagent based only on "does it remove my target," ignoring the other group.
- **Mastery-certification trigger**: correct orthogonal pair selection AND correct removal order, with an unprompted justification referencing both groups' stability profiles, on a synthesis target not seen in instruction.

## Tutor Recovery Strategy
Per `../foundations/01-recovery-engine.md` for generic stuck-learner scripts. Concept-specific shrink: if a student cannot select an orthogonal pair, do not re-present the full stability table — instead ask the smaller question "what removes group A?" then "does that same reagent also affect group B?" one comparison at a time, rather than expecting the full grid to be reconstructed from memory in one step.

## Memory Hooks
Concept type: procedure with an embedded conceptual correction (temporariness) plus a lookup-table fact set (five groups' install/remove/stability profiles). Review form: spaced re-probe of the orthogonality-selection task specifically (not the individual group facts in isolation), since selecting a correct PAIR is the actual transferable skill and regresses faster than the individual facts. Interleaving partner: pair with general SN2/acid-catalyzed-substitution review, since THP/MOM installation and removal are themselves acetal-formation/hydrolysis reactions the student has already learned in a different context.

## Transfer Connections
- **Near transfer**: selecting a protecting group for a new alcohol-bearing target given a stated set of downstream reaction conditions to survive.
- **Far transfer**: recognizing the same temporary-bracket logic in amine protection (Boc, Fmoc, Cbz groups) even though those are outside this KG node's explicit scope.
- **Real-world/expert transfer**: virtually every multi-step total synthesis of a complex natural product or pharmaceutical (e.g., Taxol, erythromycin) relies on carefully planned, orthogonal protecting-group strategies exactly like the ones taught here; process chemists in industry spend significant design effort minimizing the NUMBER of protecting-group steps, since each one adds cost and yield loss, making orthogonality reasoning a genuine, high-stakes professional skill, not only an exam topic.

## Cross-Subject Connections
No KG `cross_links` are recorded for this concept, and no strong, currently-unencoded cross-subject connection was identified — protecting-group strategy is a chemistry-synthesis-specific skill without a clear parallel in another subject's KG at this level; recorded here as an honest "no genuine cross-subject link" rather than a fabricated one.

## Blueprint References
Blueprint file: `docs/curriculum/blueprints/chem.alc.protection.md` (fully authored, 16-section format). This entry reuses that Blueprint's MC-1 and MC-2 misconception content (probe, characteristic phrase, replacement, discrimination pairs) by reference, restated here in this entry's required format with birth-type classification added (both Type 1, overgeneralization) since the Blueprint does not classify birth type itself.

## Runtime Asset References
`docs/chemistry/teaching-assets/assets.json` carries an authored (`status: draft`) entry `asset.chem.alc.protection` (transcribed from the above Blueprint). No `AssetIdentity` records (per ADR 14) are seeded for `chem.alc.protection` as of this entry's authoring date — seeding is a separate, Wave-0-gated step, not performed here.

## Curriculum Feedback
None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this entry's design.

## Version History
- v1.0.0 — 2026-07-25 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0, closing the KG − EB coverage gap for this concept.
