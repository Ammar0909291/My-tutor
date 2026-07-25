# Carboxylic Acid Derivatives — `chem.carb.derivatives`

## Identity
- **KG ID**: chem.carb.derivatives
- **Subject**: Chemistry
- **Domain**: Carbonyl Chemistry (chem.carb)
- **Prerequisites**: chem.carb.carboxylic (the parent functional group all four derivatives are built from)
- **Unlocks**: chem.bio.lipids (triglyceride esters), chem.carb.named-reactions (nucleophilic acyl substitution as a named-reaction building block), chem.poly.condensation (ester/amide-forming step-growth polymerization)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Rank the four carboxylic acid derivatives (acyl chloride, anhydride, ester, amide) by nucleophilic acyl substitution reactivity and explain the ranking via leaving-group ability, not carbonyl electrophilicity alone; and predict which direct derivative interconversions are mechanistically straightforward (downhill on the reactivity ladder) versus which require specialized activating reagents (uphill).

## Core Understanding
All four carboxylic acid derivatives (acyl chloride, anhydride, ester, amide) share an essentially identical carbonyl carbon in terms of electrophilicity — the differences in their reactivity toward nucleophilic acyl substitution (which spans many orders of magnitude, from acyl chlorides reacting violently with water to amides being essentially inert toward it at room temperature) are governed almost entirely by the LEAVING-GROUP ABILITY of the atom/group attached to that carbonyl carbon: chloride (from an acyl chloride) is an excellent leaving group; a carboxylate (from an anhydride) is a good leaving group; an alkoxide (from an ester) is a poor leaving group; and an amide nitrogen (from an amide) is the worst leaving group of the four. This produces the fixed reactivity order **acyl chloride > anhydride > ester > amide**. This ordering is not merely a ranking — it is a DIRECTIONAL CONSTRAINT on which conversions are mechanistically straightforward via simple nucleophilic acyl substitution: a MORE reactive derivative can be converted directly into any LESS reactive derivative (e.g., acyl chloride + amine → amide, straightforward, since the incoming amine nitrogen only needs to displace chloride, a far better leaving group than itself), but the REVERSE direction (e.g., amide → acyl chloride) cannot proceed by the same simple substitution, because the incoming nucleophile (chloride) would need to displace the amide nitrogen, a far WORSE leaving group than chloride itself — mechanistically unfavorable without specialized activating reagents that circumvent the ordinary substitution pathway entirely.

## Mental Models
- **Beginner (arriving, often wrong)**: "All four derivatives should react at similar rates toward a given nucleophile, since they all share the same C=O carbonyl group." This model correctly identifies the shared carbonyl but has no place for leaving-group differences, since those differences are invisible if the student's attention is fixed only on the carbonyl carbon.
- **Intermediate**: "Reactivity follows acyl chloride > anhydride > ester > amide, because of leaving-group ability." Correct and load-bearing for predicting relative reaction rates.
- **Advanced**: "Direct interconversion between derivatives only flows downhill on the reactivity ladder — going uphill requires an activating reagent, not the same straightforward substitution mechanism used going downhill." This is the operational, synthesis-planning-ready model.
- **Expert**: uses the reactivity ladder generatively in retrosynthetic planning, recognizing that a target ester or amide should often be disconnected back through the corresponding acyl chloride (the most reliably reactive, most easily controlled starting derivative) rather than attempted directly from the free carboxylic acid.

## Why Students Fail
The primary failure is attention narrowing onto the one structural feature all four derivatives visibly share (the C=O carbonyl) while the decisive, reactivity-determining feature (the identity of the OTHER group attached to that carbonyl carbon, and specifically its leaving-group ability) receives comparatively little emphasis in typical introductory presentations, especially since leaving-group ability itself is a concept usually taught earlier, in a different reaction context (SN1/SN2 substitution at sp³ carbon) and not always explicitly re-invoked here. The secondary, independent failure is assuming reaction directionality is symmetric by default — many other reactions students have already studied (equilibria, some substitutions) are explicitly reversible, so without a clear statement that THIS reactivity ladder specifically constrains direction, students default to assuming any shown conversion (e.g., acyl chloride to amide) implies its reverse should be comparably accessible by the same method.

## Misconceptions
1. **"All carboxylic acid derivatives react at similar rates since they share the same carbonyl group"** (Type 1 — overgeneralization from carbonyl-electrophilicity reasoning alone, ignoring the leaving-group variable).
   - Probe: "Acetyl chloride and acetamide both have a carbonyl carbon. Would you expect them to hydrolyze in water at similar rates?"
   - Characteristic phrase: "They both have a C=O, so they should react about the same with water."
   - Intervention: state the dramatic real-world contrast — acetyl chloride reacts violently and instantly with water at room temperature; acetamide is essentially inert toward water at room temperature, requiring prolonged heating with strong acid or base to hydrolyze. Point out both share an essentially identical carbonyl carbon; the entire difference is in the leaving-group ability of what's attached (chloride, excellent; amide nitrogen, very poor).

2. **"Derivative interconversion works equally well in either direction"** (Type 1 — overgeneralization treating nucleophilic acyl substitution as symmetric/reversible by default, as many other previously-studied reactions are).
   - Probe: "Acyl chlorides can be converted into amides easily. Can amides be converted back into acyl chlorides by the same simple nucleophilic substitution approach?"
   - Characteristic phrase: "If you can go one way, you should be able to go back the same way."
   - Intervention: state explicitly that direct interconversion via simple substitution only proceeds downhill on the reactivity ladder — the incoming nucleophile must displace a leaving group no worse than itself for the substitution to be mechanistically favorable. Converting amide → acyl chloride would require the amide nitrogen to leave and be replaced by chloride, but amide nitrogen is a far worse leaving group than chloride — this direction requires specialized activating reagents, not the identical simple approach used going the other way.

## Analogies
- **Best**: a one-way currency exchange where a "harder currency" (a better leaving group, like chloride) can always be readily traded for a "softer currency" (a worse leaving group, like amide nitrogen), but the reverse trade requires a specialized broker (an activating reagent) rather than the same simple, direct exchange window.
- **Anti-analogy**: do NOT say "all these derivatives react about the same since they're all carbonyls" — this directly installs MC-1 by discarding the leaving-group variable that actually governs reactivity.

## Demonstrations
- **Reactivity-contrast demonstration**: present the real hydrolysis-rate contrast between acetyl chloride (violent, instant) and acetamide (essentially inert at room temperature) as the anchoring evidence, before any abstract ranking is introduced.
- **Directional-ladder demonstration**: draw the four derivatives on a ladder (acyl chloride at top, amide at bottom) with arrows only pointing downward for simple substitution, explicitly marking the upward direction as "requires activation" rather than leaving it unmarked/implied.

## Discovery Questions
Direct instruction is the better choice for the core reactivity ranking (leaving-group ability is a fact set to be told, not re-derived), but a discovery-shaped question works well for the directionality constraint once the ranking is known: "Given the reactivity order acyl chloride > anhydride > ester > amide, and knowing that a nucleophile needs to displace a leaving group no worse than itself for the substitution to proceed easily, which conversions on this ladder should be straightforward, and which should not?" — letting students derive the "downhill only" rule from the leaving-group logic they already have, rather than being told the rule as a separate fact to memorize.

## Teaching Sequence
1. Anchor the reactivity-contrast demonstration (acetyl chloride vs. acetamide) FIRST, before presenting the four-derivative ranking abstractly — concrete evidence should precede the abstraction.
2. Introduce the full reactivity ladder and explicitly attribute it to leaving-group ability, not carbonyl electrophilicity.
3. Use the discovery question above to let students derive the directional constraint themselves from the leaving-group logic.
4. Close with practice items requiring students to judge, for an unfamiliar pair of derivatives, whether a proposed conversion is straightforward or requires activation.

## Tutor Actions
- **SHOW** the acetyl chloride/acetamide reactivity contrast as concrete anchoring evidence before any ranking is presented.
- **TELL** the leaving-group-based reactivity ranking directly.
- **DO**: have the student judge, for an unfamiliar pair of derivatives and a proposed conversion, whether it is straightforward or requires activation.
- **TEST-THINKING**: ask the student to justify why amide → acyl chloride is not achievable by the same simple approach used for acyl chloride → amide.

## Voice Teaching Notes
Listen for reactivity comparisons framed purely in terms of "it's a carbonyl" with no mention of the leaving group — this omission, even when the eventual answer happens to be correct, signals MC-1 is not yet resolved. Listen for a proposed "reverse" conversion stated without any qualifying concern about direction — the absence of a directional check is the tell for MC-2.

## Assessment Signals
- **Green**: correctly ranks derivative reactivity citing leaving-group ability (not carbonyl electrophilicity) as the reason; correctly judges an unfamiliar proposed conversion as straightforward or requiring activation, with a stated leaving-group-based justification.
- **Amber**: correctly recalls the reactivity order but cannot explain WHY when asked; correctly judges the "easy" direction for conversions but does not spontaneously flag the reverse direction as problematic.
- **Red**: predicts similar reactivity across derivatives; assumes a shown conversion implies its reverse is equally accessible by the same method.
- **Mastery-certification trigger**: correct, justified answers on both misconception probes without prompting.

## Tutor Recovery Strategy
Per `../foundations/01-recovery-engine.md` for generic stuck-learner scripts. Concept-specific shrink: if a student cannot connect reactivity differences to leaving-group ability, ask the smaller, already-mastered question "which is the better leaving group, chloride or an amide nitrogen?" (a direct SN1/SN2 leaving-group-ability question) and let them transfer that ranking directly into the derivative-reactivity context.

## Memory Hooks
Concept type: procedural/conceptual rule (leaving-group-based reactivity ranking) + directional constraint (downhill-only interconversion). Review form: spaced re-probe of the directionality rule specifically, since "does the reverse work the same way" is the higher-risk-of-regression half of this concept compared to the ranking itself. Interleaving partner: pair with earlier SN1/SN2 leaving-group-ability review, since the underlying leaving-group concept is directly reused here in a new reaction class.

## Transfer Connections
- **Near transfer**: predicting whether a proposed conversion between two unfamiliar derivatives is straightforward or requires activation.
- **Far transfer**: recognizing the same leaving-group-governs-reactivity logic in other nucleophilic substitution contexts entirely (e.g., alkyl halide SN2 reactivity trends).
- **Real-world/expert transfer**: peptide bond formation in solid-phase peptide synthesis relies on deliberately activating a carboxylic acid (converting it to a much more reactive derivative, e.g., an active ester or acyl chloride analog) before coupling — a direct, professionally significant application of "you cannot go uphill without activation."

## Cross-Subject Connections
No KG `cross_links` are recorded for this concept. The reactivity-ladder logic here directly underlies ester formation in `chem.bio.lipids` (triglycerides) and amide (peptide) bond formation relevant to protein biochemistry — flagged as Curriculum Feedback below.

## Blueprint References
Blueprint file: `docs/curriculum/blueprints/chem.carb.derivatives.md` (fully authored, 16-section format, self-authored misconceptions since no prior Educational Brain source existed at Blueprint-authoring time). This entry reuses that Blueprint's MC-1 and MC-2 content by reference, restated in this entry's required format with birth-type classification added.

## Runtime Asset References
`docs/chemistry/teaching-assets/assets.json` carries an authored (`status: draft`) entry `asset.chem.carb.derivatives`. No `AssetIdentity` records are seeded for `chem.carb.derivatives` as of this entry's authoring date.

## Curriculum Feedback
The reactivity-ladder logic here is directly relevant to ester formation in `chem.bio.lipids` and (via peptide bond formation) to protein biochemistry more broadly, currently not encoded as a KG cross-link — recorded as feedback to the Curriculum Production Pipeline, not fixed locally.

## Version History
- v1.0.0 — 2026-07-25 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0, closing the KG − EB coverage gap for this concept.
