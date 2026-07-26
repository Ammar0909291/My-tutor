# chem.org.reactive-intermediates — Reactive Intermediates

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.org.reactive-intermediates` |
| Domain | Organic Chemistry |
| Requires | `chem.org.electronic-effects` |
| Unlocks | `chem.hal.sn1`, `chem.hal.sn2`, `chem.org.mechanisms`, `chem.poly.addition` |
| Difficulty | proficient |
| Bloom Level | analyze |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

Alkyl-group electron donation (+I, hyperconjugation) STABILIZES electron-DEFICIENT carbocations (tertiary > secondary > primary) but DESTABILIZES electron-RICH carbanions (methyl > primary > secondary > tertiary) — the identical electronic effect produces OPPOSITE stability orderings depending on which species is electron-poor vs. electron-rich, so "more alkyl groups = more stable" cannot be applied universally across reactive intermediates; free radicals are ELECTRICALLY NEUTRAL species with an odd number of electrons (specifically one unpaired electron) — "radical" refers to electron-count PARITY (odd vs. even), never to net charge, so a carbon radical R₃C• is neither positively nor negatively charged; and carbene spin state (singlet vs. triplet) determines REACTION MECHANISM (concerted one-step vs. stepwise two-step with a rotating intermediate), which in turn determines STEREOCHEMICAL OUTCOME — singlet carbenes give STEREOSPECIFIC addition (retention of alkene geometry), while triplet carbenes give a MIXTURE of stereoisomers (rotation occurs during the stepwise process), so spin state is never a stereochemically-irrelevant detail.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing methyl carbanion (CH₃⁻, most stable) against tert-butyl carbanion ((CH₃)₃C⁻, least stable) explicitly, contrasted with the familiar tertiary-carbocation-is-most-stable ordering, making the reversal concrete.

**Representational**: A side-by-side stability-order diagram for carbocations (tertiary→primary, decreasing) and carbanions (methyl→tertiary, decreasing) sharing the same "alkyl group count" x-axis but pointing in opposite directions.

**Abstract**: The general principle that a given electronic effect (electron donation) stabilizes or destabilizes depending on the electron-richness/deficiency of the reactive center; the general electron-parity definition of a radical (odd electron count = neutral, unpaired); the general mechanism-determines-stereochemistry principle for carbene spin states.

**Transfer**: Given an unfamiliar reactive intermediate (novel carbocation, carbanion, or radical) or an unfamiliar carbene addition, correctly predicting relative stability from electron-richness reasoning (not a blind alkyl-group count), correctly identifying radical charge as neutral from electron parity, and correctly predicting stereochemical outcome from carbene spin state.

## 3. Why Beginners Fail

Students memorize "more alkyl groups = more stable" as a universal rule from carbocation study and directly transfer it to carbanions without re-deriving the underlying reasoning, missing that alkyl groups are electron-DONATING, which stabilizes an electron-poor carbocation but destabilizes an already electron-rich carbanion — the SAME substituent effect produces opposite orderings depending on the intermediate's electron status; they interpret the word "radical" as implying an "extra" electron and hence a negative charge (conflating the notion of an unpaired electron with the notion of excess electron count), missing that a radical is defined by ODD electron-count PARITY (one unpaired electron among an otherwise complete set), which corresponds to overall electrical NEUTRALITY, not negative charge; and they assume all carbene additions to an alkene give the same cyclopropane product regardless of spin state, missing that singlet carbenes react via a CONCERTED mechanism (both bonds form simultaneously, preserving alkene geometry, i.e., stereospecific), while triplet carbenes react STEPWISE (via a rotating biradical intermediate between the two bond-forming steps), which scrambles the stereochemistry into a mixture — spin state is mechanistically, and therefore stereochemically, consequential.

## 4. Misconception Library

### MC-1: Tertiary carbanions are the most stable, just like tertiary carbocations
- **Probe**: "A methyl carbanion (CH₃⁻) and a tert-butyl carbanion ((CH₃)₃C⁻): which is more stable? Which has more alkyl groups?"
- **Characteristic phrase**: "more alkyl groups = more stable for all reactive intermediates."
- **Trigger (Type 1, overgeneralization)**: Students correctly learn the tertiary-carbocation-most-stable rule and overgeneralize it to all reactive intermediates without re-examining the underlying electronic logic.
- **Conflict evidence [P28]**: Alkyl groups are ELECTRON-DONATING (+I, hyperconjugation). For carbocations (electron-deficient), electron donation STABILIZES — so tertiary>secondary>primary. For carbanions (electron-rich), electron donation DESTABILIZES — adding more alkyl groups pushes MORE electron density onto an already-electron-rich centre, raising energy. Therefore the order REVERSES: methyl>primary>secondary>tertiary. A tertiary carbanion is the LEAST stable, not the most.
- **Bridge [P30]**: The same electronic effect (alkyl electron donation) has consequences that depend entirely on whether the reactive center is electron-deficient (donation helps, stabilizes) or already electron-rich (donation hurts, destabilizes) — "more alkyl groups = more stable" is only a valid shortcut for carbocations specifically, never a universal rule across all reactive intermediates.
- **Replacement [P31]**: Always re-derive stability from the reactive center's electron status (deficient vs. rich) before applying an alkyl-substitution rule — carbocations: tertiary>secondary>primary (most substituted most stable); carbanions: methyl>primary>secondary>tertiary (least substituted most stable) — the orders are opposite.
- **Discrimination pairs [P33]**: tert-butyl cation (electron-deficient, most stabilized by 3 donating groups) vs. tert-butyl carbanion (electron-rich, most destabilized by the same 3 donating groups) — identical substitution, opposite stability consequence.
- **S6 repair path**: Present both stability-order diagrams side by side, explicitly re-deriving each from electron-richness/deficiency rather than presenting them as separately memorized rules.

### MC-2: Free radicals are negatively charged because they have an "extra" electron
- **Probe**: "Is a carbon radical (R₃C•) positively charged, negatively charged, or neutral?"
- **Characteristic phrase**: "radical means extra electron → negative."
- **Trigger (Type 3, language contamination)**: The everyday sense of "extra" (as in "additional, beyond a complete/expected set") is conflated with "excess negative charge," when the technical meaning refers only to electron-count parity, not overall charge balance.
- **Conflict evidence [P28]**: FREE RADICALS are ELECTRICALLY NEUTRAL. The term "radical" refers to a species with an ODD NUMBER OF ELECTRONS — specifically, one UNPAIRED electron. The carbon radical R₃C• has 7 electrons in its bonds and lone electrons totalling exactly the right number to be NEUTRAL (no net charge). Compare: R₃C⁺ (carbocation, 6 electrons, positive); R₃C⁻ (carbanion, 8 electrons, negative); R₃C• (radical, 7 electrons, neutral).
- **Bridge [P30]**: "Extra" in the context of radicals refers to PARITY (an odd, unpaired count relative to the even, paired counts typical of stable closed-shell species) — not to an excess of electrons relative to a neutral atom's expected count. A radical's total electron count is exactly what a neutral species requires; only its PAIRING pattern (one unpaired) is unusual.
- **Replacement [P31]**: A free radical is electrically neutral with one unpaired electron (odd electron count) — never assume "unpaired" implies "excess" or "negatively charged."
- **Discrimination pairs [P33]**: R₃C⁺ (6 electrons, positive) vs. R₃C• (7 electrons, neutral) vs. R₃C⁻ (8 electrons, negative) — three genuinely distinct species distinguished by electron count and charge, with the radical specifically neutral.
- **S6 repair path**: Present the explicit electron-count comparison across all three species (cation/radical/anion), anchoring charge to total count, not to "unpaired" status.

### MC-3: Singlet and triplet carbenes both give the same cyclopropane product because both insert into the π bond
- **Probe**: "If you add singlet carbene to cis-2-butene vs. trans-2-butene, do you get the same cyclopropane product or different ones? What about triplet carbene?"
- **Characteristic phrase**: "the product is cyclopropane — it doesn't matter which spin state."
- **Trigger (Type 5, instruction-induced)**: Instruction that names "cyclopropane" as the product of carbene addition without distinguishing mechanism leaves the stereochemical consequence of spin state unaddressed.
- **Conflict evidence [P28]**: The STEREOCHEMICAL OUTCOME differs crucially. Singlet carbene addition is CONCERTED — both new C–C bonds form simultaneously, before either end of the alkene can rotate → the relative configuration of the substituents on the alkene is RETAINED in the cyclopropane (cis-alkene→cis-cyclopropane; trans-alkene→trans-cyclopropane). Triplet carbene reacts STEPWISE (first radical addition→rotating triplet biradical intermediate→second ring closure)→rotation can occur between the two steps→MIXTURE of cis- and trans-cyclopropanes from either alkene starting material.
- **Bridge [P30]**: "Same product class" (cyclopropane) is not the same as "same product" (specific stereoisomer) — spin state determines the reaction MECHANISM (concerted vs. stepwise), and mechanism is what actually determines whether alkene geometry survives into the product (stereospecific) or is scrambled by intermediate rotation (loses stereochemical information).
- **Replacement [P31]**: Singlet carbene addition is stereospecific (concerted, geometry retained); triplet carbene addition gives a stereoisomer mixture (stepwise, geometry scrambled by intermediate rotation) — never treat "cyclopropane forms" as the complete stereochemical answer.
- **Discrimination pairs [P33]**: Singlet carbene + cis-2-butene (→ cis-cyclopropane only, stereospecific) vs. triplet carbene + cis-2-butene (→ mixture of cis- and trans-cyclopropane, non-stereospecific).
- **S6 repair path**: Walk through both mechanisms explicitly (concerted vs. stepwise-with-rotating-intermediate), deriving the stereochemical consequence from the mechanism rather than stating it as a separate fact.

## 5. Explanation Library

**Primary explanation**: Carbocations (electron-deficient) and carbanions (electron-rich) respond oppositely to the same electron-donating alkyl substituents — donation stabilizes the electron-poor cation but destabilizes the already electron-rich anion, reversing the stability order between the two intermediate types (tertiary most stable for cations; methyl most stable for anions). Free radicals are a third, distinct category — electrically neutral species with one unpaired electron (odd electron-count parity), never to be confused with charged species based on the word "extra."

**Secondary explanation (carbene spin state and stereochemistry)**: Carbenes exist in singlet (paired, empty+filled orbital) and triplet (two unpaired electrons, diradical-like) spin states, and this spin state determines the addition mechanism to alkenes — singlet carbenes add in a single concerted step (retaining alkene geometry, stereospecific), while triplet carbenes add stepwise via a rotating intermediate (losing alkene geometry, giving a stereoisomer mixture). Mechanism, not just product identity, governs the stereochemical outcome.

## 6. Analogy Library

- **Primary analogy**: A crowded elevator (carbocation, wants more people/electron density) vs. an already-full elevator (carbanion, doesn't want more people/electron density) — the "same" extra passengers (alkyl electron donation) are welcome in one and unwelcome in the other.
- **Breaking point**: The elevator analogy conveys the stabilize-vs-destabilize reversal well but doesn't naturally capture radical electron-parity or carbene mechanism/stereochemistry — those need the explicit electron-count comparison and the concerted-vs-stepwise mechanism walkthrough.
- **Anti-analogy**: Do NOT say "a radical has an extra electron, like an anion" — this directly reinforces MC-2 by equating "unpaired" with "excess/negative."

## 7. Demonstration Library

- **Demonstration 1 (side-by-side stability-order reversal)**: Present the carbocation stability order (tertiary→primary) and the carbanion stability order (methyl→tertiary) as mirror images, re-derived explicitly from electron-richness/deficiency.
- **Demonstration 2 (electron-count comparison across cation/radical/anion)**: Present R₃C⁺/R₃C•/R₃C⁻ with explicit electron counts (6/7/8) and resulting charges (+/neutral/−), isolating "unpaired" from "charged."
- **Demonstration 3 (concerted vs. stepwise carbene mechanism)**: Walk through singlet carbene's simultaneous bond formation vs. triplet carbene's rotating-intermediate stepwise process, deriving the stereochemical consequence from each mechanism.

## 8. Discovery Lesson

**Opening**: "We know tertiary carbocations are the most stable. Do you think tertiary carbanions are also the most stable?"

**Exploration**: Students examine the electron-donating nature of alkyl groups and reason through its effect on an electron-rich vs. electron-poor center, discovering the stability order reverses for carbanions.

**Synthesis**: Guide toward: the SAME electronic effect (donation) has opposite consequences depending on whether the center is electron-deficient or electron-rich.

**Closure**: "Does a radical carry a charge, like a carbanion does?" (Directly resolves MC-2, transitioning into the electron-count-vs-parity distinction.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the side-by-side carbocation/carbanion stability-order diagrams, re-derived from electron-richness/deficiency.
- **TA-2 (TELL)**: State the radical electron-parity definition explicitly, anchored to the R₃C⁺/R₃C•/R₃C⁻ electron-count comparison.
- **TA-3 (DO)**: Student predicts the stability order for an unfamiliar carbanion or carbocation series from first-principles electron reasoning.
- **TA-4 (TEST-THINKING)**: Present the singlet-vs-triplet carbene cis-2-butene probe and ask the student to justify the stereochemical outcome from mechanism, not from "same product" assumption.

## 10. Voice Teaching

Whenever reactive-intermediate stability is discussed, narrate "check electron-deficient vs. electron-rich first, before applying an alkyl-substitution rule." Whenever radicals are introduced, state "unpaired means neutral, not charged" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly derive and apply opposite stability orders for carbocations vs. carbanions from electron-richness reasoning, (b) correctly identify a free radical as neutral from electron-count parity, (c) correctly predict stereochemical outcome (stereospecific vs. mixture) from carbene spin state.

- **FA-1**: "Rank CH₃⁻, CH₃CH₂⁻, and (CH₃)₃C⁻ by stability." — targets MC-1.
- **FA-2**: "Is R₃C• positively charged, negatively charged, or neutral? Justify with electron count." — targets MC-2.
- **FA-3**: "Predict whether singlet carbene addition to cis-2-butene gives a single stereoisomer or a mixture, and justify from mechanism." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who memorized the carbocation stability order as a general rule without exposure to carbanion stability first.

**Delayed retrieval**: Re-probe MC-1's stability-order reversal and MC-3's mechanism-stereochemistry link before `chem.hal.sn1`/`chem.hal.sn2` require fluent reasoning about carbocation intermediates and stereochemical outcomes.

## 12. Recovery Notes

- **S3 (stuck)**: For the stability-order confusion, have the student explicitly classify the intermediate as electron-deficient or electron-rich before applying any alkyl-substitution rule.
- **S4 (frustrated)**: Normalize — the stability-order reversal between cations and anions is genuinely counterintuitive on first exposure after learning the cation rule.
- **S6 (collision)**: Use the explicit electron-count comparison for MC-2; use the concerted-vs-stepwise mechanism walkthrough for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a tertiary carbanion is the least stable despite having the most alkyl groups.

## 13. Memory & Review

Tag as two conceptual-correction memories (stability-order reversal between cations/anions; radical electron-parity vs. charge) plus one procedural memory (deriving stereochemical outcome from carbene mechanism). Schedule a spaced check at ~1 week and again before `chem.hal.sn1`/`chem.hal.sn2`.

## 14. Transfer Map

Feeds directly into `chem.hal.sn1` and `chem.hal.sn2` (carbocation stability reasoning is central to SN1 mechanism/rate prediction), `chem.org.mechanisms` (radical and carbene intermediates recur throughout mechanistic organic chemistry), and `chem.poly.addition` (radical intermediates drive addition polymerization mechanisms).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
