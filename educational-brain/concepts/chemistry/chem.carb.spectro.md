# Spectroscopic ID of Carbonyls — `chem.carb.spectro`

## Identity
- **KG ID**: chem.carb.spectro
- **Subject**: Chemistry
- **Domain**: Carbonyl Chemistry (chem.carb)
- **Prerequisites**: chem.org.spectroscopy (general IR/NMR/mass spec interpretation framework), chem.carb.ketones (the carbonyl functional group being identified)
- **Unlocks**: (none — terminal application/integration node)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 3

## Learning Objective
Predict the direction (not just the existence) of C=O IR stretch frequency shifts from conjugation, ring strain, and electronegative substituents, rather than treating ~1715 cm⁻¹ as a single fixed carbonyl signature; and determine whether McLafferty rearrangement is structurally possible for a given carbonyl compound by checking for an accessible gamma-hydrogen, rather than assuming it applies to any carbonyl compound generically.

## Core Understanding
The carbonyl C=O IR stretching frequency directly reflects the C=O bond's force constant (effectively its bond order/strength), which is systematically and predictably modulated by structural context — it is NOT a single fixed value near 1715 cm⁻¹ that all carbonyls share. **Ring strain** raises the frequency: small rings (e.g., cyclobutanone, ~1775 cm⁻¹) force additional s-character into the ring's C-C(=O)-C bonds, which strengthens the C=O bond and raises its stretching frequency above the unstrained baseline (cyclohexanone, ~1715 cm⁻¹). **Conjugation** lowers the frequency: an alpha,beta-unsaturated ketone (e.g., methyl vinyl ketone, ~1675 cm⁻¹) delocalizes some double-bond character away from the C=O bond into the extended pi system, weakening the C=O bond and lowering its frequency. **Electronegative substituents** raise the frequency: esters (~1735-1750 cm⁻¹) and acid chlorides (~1800 cm⁻¹) have less electron density donated into the carbonyl from the adjacent oxygen/halogen lone pair (inductive withdrawal competing with donation), strengthening the C=O bond relative to a simple ketone. Each of these three structural features shifts the frequency in a specific, predictable direction, and the shift itself is diagnostic evidence for identifying which structural feature is present. **McLafferty rearrangement** in mass spectrometry is not a generic fragmentation available to any carbonyl compound — it specifically requires a GAMMA-HYDROGEN (a hydrogen on the carbon three positions from the carbonyl carbon) positioned to participate in a SIX-MEMBERED CYCLIC TRANSITION STATE, in which that gamma-hydrogen transfers to the carbonyl oxygen while the C(alpha)-C(beta) bond simultaneously cleaves, releasing a neutral alkene and forming an enol radical cation. A carbonyl compound genuinely lacking any accessible gamma-hydrogen (e.g., a quaternary carbon at the gamma position, or too short a carbon chain to reach a gamma position at all) structurally CANNOT undergo McLafferty rearrangement — it would fragment via other pathways (such as simple alpha-cleavage) exclusively.

## Mental Models
- **Beginner (arriving, often wrong)**: "All carbonyls show their C=O stretch around 1715 cm⁻¹" — a single memorized value taken from the first, most commonly cited example (a simple, unstrained, unconjugated ketone) and treated as universal.
- **Intermediate**: "The C=O stretch frequency shifts with structure — conjugation lowers it, ring strain and electron-withdrawing substituents raise it." Correct and load-bearing for using IR data diagnostically.
- **Advanced**: "The exact C=O frequency of an unknown compound can be used to infer specific structural features (conjugation present? ring-strained? ester vs. ketone vs. acid chloride?) rather than merely confirming 'a carbonyl is present.'" 
- **Expert**: integrates IR frequency data with NMR and mass spec fragmentation patterns (including checking gamma-hydrogen availability before invoking McLafferty rearrangement) as a combined structure-elucidation toolkit, cross-validating each technique's conclusions against the others.

## Why Students Fail
The IR failure is a straightforward overgeneralization from a single, most heavily emphasized worked example: because introductory treatments typically present one representative "the carbonyl stretch is around 1715 cm⁻¹" figure using an unstrained, unconjugated ketone, and rarely present a contrasting strained or conjugated example side by side, students never encounter the evidence needed to recognize the frequency as a variable diagnostic quantity rather than a fixed constant. The McLafferty failure is a category error: the rearrangement is taught as "how carbonyl compounds fragment in mass spec," which frames it as a property of the FUNCTIONAL GROUP CLASS rather than of the SPECIFIC MOLECULE's accessible geometry — since the gamma-hydrogen requirement is a structural detail easily glossed over when the rearrangement is first introduced with an example that happens to have one, students have no reason to check for its presence or absence in a new, unfamiliar structure.

## Misconceptions
1. **"The carbonyl C=O IR stretch is always at a fixed ~1715 cm⁻¹"** (Type 1 — overgeneralization from a single representative, unstrained/unconjugated worked example).
   - Probe: "Cyclohexanone shows a C=O stretch around 1715 cm⁻¹. Would you expect cyclobutanone's C=O stretch to appear at essentially the same frequency?"
   - Characteristic phrase: "All carbonyls show their C=O stretch around 1715 cm⁻¹."
   - Intervention: present the three-compound comparison (cyclobutanone ~1775 cm⁻¹, ring-strain-raised; cyclohexanone ~1715 cm⁻¹, unstrained baseline; methyl vinyl ketone ~1675 cm⁻¹, conjugation-lowered) and connect each shift to its specific structural cause (s-character/bond strength for ring strain; pi-delocalization for conjugation) — the exact frequency is diagnostic information, not noise around a fixed number.

2. **"McLafferty rearrangement occurs for any carbonyl compound in mass spectrometry"** (Type 1 — overgeneralization treating a specific, structurally-gated mechanism as a generic property of the functional-group class).
   - Probe: "Does every carbonyl compound undergo McLafferty rearrangement in its mass spectrum, or does it depend on the compound's structure?"
   - Characteristic phrase: "McLafferty rearrangement is just how carbonyl compounds fragment in mass spec, so it should happen for any of them."
   - Intervention: draw the six-membered cyclic transition state explicitly, highlighting the gamma-hydrogen's specific geometric role, then present a counter-example compound with a quaternary gamma-carbon (no accessible gamma-hydrogen) and state plainly that this compound cannot undergo McLafferty rearrangement — it would fragment by alpha-cleavage or another pathway instead.

## Analogies
- **Best (IR)**: a tuning fork whose pitch (the C=O frequency) shifts measurably and predictably with subtle changes to its material or shape (structural context) — the specific note played is informative in itself, not merely confirmation that "a tuning fork was struck."
- **Best (McLafferty)**: a very specific dance move that only works if a partner (the gamma-hydrogen) is standing in exactly the right position (three atoms away, geometrically able to reach the carbonyl oxygen) — without a partner in that position, the move simply cannot be performed, no matter how much the dancer (the molecule) wants to.
- **Anti-analogy**: do NOT say "all ketones show their carbonyl peak in the same place around 1715" — this directly installs MC-1 by discarding the diagnostic shift information.

## Demonstrations
- **Three-compound IR comparison demonstration**: present real IR frequency data for cyclobutanone, cyclohexanone, and methyl vinyl ketone side by side, asking students to predict the direction of each shift from the structural feature before revealing the actual value.
- **Gamma-hydrogen-availability demonstration**: present a carbonyl compound WITH an accessible gamma-hydrogen (McLafferty-capable) beside one WITHOUT (a quaternary gamma-carbon, McLafferty-incapable), drawing the six-membered transition state for the first and explicitly showing why the second cannot form it.

## Discovery Questions
For IR shifts, a discovery-shaped question works well after the baseline (unstrained, unconjugated) frequency is established: "Given that ring strain increases the s-character (and thus the strength) of the C-C(=O)-C bonds, would you predict a strained ring's C=O stretch to be higher or lower in frequency than an unstrained one — and why?" letting students reason from the bond-strength-frequency relationship rather than being told the direction outright. For McLafferty rearrangement, direct instruction is preferable — the six-membered transition-state requirement is a specific mechanistic fact that must be shown explicitly, not re-derived.

## Teaching Sequence
1. Establish the baseline C=O frequency (cyclohexanone, ~1715 cm⁻¹) and immediately follow with the ring-strain and conjugation contrasts, rather than presenting the baseline alone and adding contrasts much later — this ordering prevents the baseline from calcifying as "the" carbonyl frequency before its variability is shown.
2. Use the discovery question above to have students predict, then verify, the ring-strain shift direction.
3. Introduce McLafferty rearrangement only after basic mass spec fragmentation (simple alpha-cleavage) is secure, since McLafferty is best taught as a SPECIFIC alternative pathway, not the default one.
4. Present the gamma-hydrogen-availability contrast immediately alongside the six-membered mechanism, never teaching the mechanism in isolation without a counter-example showing when it fails to apply.

## Tutor Actions
- **SHOW** the three-compound IR frequency comparison before any single "typical" carbonyl frequency is stated as representative.
- **DO**: have the student predict the qualitative IR shift direction for an unfamiliar carbonyl compound given its structural features (conjugated? strained? electronegative substituent?).
- **TELL** the gamma-hydrogen requirement for McLafferty rearrangement directly, since it is a specific mechanistic fact to be shown, not discovered.
- **TEST-THINKING**: present an unfamiliar structure lacking a gamma-hydrogen and ask the student to justify why McLafferty rearrangement cannot occur for it.

## Voice Teaching Notes
Listen for a single number ("1715," or any other single value) offered with no qualifying mention of structural context — this is the verbal tell of MC-1. Listen for McLafferty rearrangement invoked automatically upon seeing any carbonyl compound in a mass spec problem, without first checking for a gamma-hydrogen — the skipped check, not a stated wrong fact, is the tell for MC-2.

## Assessment Signals
- **Green**: correctly predicts the direction of C=O frequency shift for an unfamiliar structural feature (conjugation, ring strain, or electronegative substituent) with a stated mechanistic reason; correctly determines whether McLafferty rearrangement is structurally possible for an unfamiliar compound by checking gamma-hydrogen availability first.
- **Amber**: correctly recalls that frequency "can shift" but cannot predict the direction for a new structural feature without prompting; applies McLafferty rearrangement correctly when a gamma-hydrogen is obviously present but does not spontaneously check for its absence in an unfamiliar structure.
- **Red**: states a single fixed carbonyl frequency for any structure; assumes McLafferty rearrangement applies to any carbonyl compound without checking gamma-hydrogen availability.
- **Mastery-certification trigger**: correct, justified answers on both misconception probes without prompting.

## Tutor Recovery Strategy
Per `../foundations/01-recovery-engine.md` for generic stuck-learner scripts. Concept-specific shrink: if a student cannot predict an IR shift direction, ask the smaller question "does this structural feature make the C=O bond stronger or weaker?" (a bond-strength question they can reason about directly) and let the frequency-direction conclusion follow from that, rather than re-teaching the full force-constant relationship from scratch.

## Memory Hooks
Concept type: diagnostic-interpretation skill (IR frequency shifts) + structural-gating rule (McLafferty gamma-hydrogen requirement). Review form: spaced re-probe specifically requiring direction prediction for a NEW, unseen structural combination (not a memorized value), and separately re-probing gamma-hydrogen-availability judgment on an unfamiliar structure. Interleaving partner: pair with general `chem.org.spectroscopy` review for combined IR/NMR/mass-spec structure elucidation practice.

## Transfer Connections
- **Near transfer**: predicting IR shift direction or McLafferty feasibility for an unfamiliar carbonyl compound not seen in instruction.
- **Far transfer**: applying the same "specific structural feature enables/disables a specific mechanism" reasoning pattern to other gated reactions (e.g., E2 elimination requiring anti-periplanar geometry).
- **Real-world/expert transfer**: combined IR/NMR/mass-spec structure elucidation (using exactly this diagnostic reasoning) is the standard workflow for confirming the identity of a newly synthesized compound in any research or industrial organic chemistry laboratory.

## Cross-Subject Connections
No KG `cross_links` are recorded for this concept, and no strong, currently-unencoded cross-subject connection was identified beyond the general analytical-chemistry skill set already covered under `chem.anal.*` — recorded here as an honest "no additional genuine cross-subject link" rather than a fabricated one.

## Blueprint References
Blueprint file: `docs/curriculum/blueprints/chem.carb.spectro.md` (fully authored, 16-section format, self-authored misconceptions since no prior Educational Brain source existed at Blueprint-authoring time). This entry reuses that Blueprint's MC-1 and MC-2 content by reference, restated in this entry's required format with birth-type classification added.

## Runtime Asset References
`docs/chemistry/teaching-assets/assets.json` carries an authored (`status: draft`) entry `asset.chem.carb.spectro`. No `AssetIdentity` records are seeded for `chem.carb.spectro` as of this entry's authoring date.

## Curriculum Feedback
None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this entry's design.

## Version History
- v1.0.0 — 2026-07-25 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0, closing the KG − EB coverage gap for this concept.
