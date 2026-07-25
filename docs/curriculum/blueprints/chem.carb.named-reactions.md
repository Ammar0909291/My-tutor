# chem.carb.named-reactions — Named Carbonyl Reactions

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.carb.named-reactions` |
| Domain | Carbonyl Compounds |
| Requires | `chem.carb.alpha-reactions`, `chem.carb.derivatives` |
| Unlocks | (none) |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

The Wittig reaction is NOT just "another way to make an alkene" interchangeable with E1/E2 elimination or catalytic reduction of an alkyne — it is SPECIFICALLY valuable because it installs a C=C double bond at a PREDICTABLE, DEFINED position (exactly where the phosphorus ylide's carbon and the carbonyl carbon were), avoiding the regiochemical ambiguity/mixture-of-products problem that plagues elimination reactions on unsymmetrical substrates — this positional certainty, not merely "another alkene-forming method," is the Wittig's core synthetic value; and the Baeyer-Villiger oxidation's regiochemistry (which side of an unsymmetrical ketone the oxygen inserts on) is NOT random or determined by which carbon is "closer" to the peroxide — it follows a specific MIGRATORY APTITUDE order (roughly tertiary > secondary > aryl > primary > methyl) for which alkyl/aryl group migrates to oxygen during the concerted rearrangement step, so predicting the product requires ranking the two groups on the ketone by migratory aptitude, not by any other criterion like size or proximity alone.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing a Wittig reaction between a stabilized ylide and a specific aldehyde (giving one exclusively defined alkene product, C=C exactly where the ylide carbon met the carbonyl carbon) against attempting the same alkene via E2 elimination of an unsymmetrical alkyl halide (which could give a mixture of regiochemical alkene products via Zaitsev/Hofmann competition).

**Representational**: A Baeyer-Villiger mechanism diagram showing an unsymmetrical ketone (e.g., methyl tert-butyl ketone) with the peroxyacid attacking the carbonyl, followed by a concerted step where the migratory-aptitude-ranked group (tert-butyl, not methyl) migrates to oxygen, inserting oxygen specifically next to the more-substituted carbon.

**Abstract**: The general principle that the Wittig reaction's synthetic value lies in its positionally unambiguous alkene formation, contrasting with elimination reactions' potential regiochemical mixtures; and the general principle that Baeyer-Villiger regiochemistry is governed by a fixed migratory aptitude order (tertiary > secondary > aryl > primary > methyl), not by proximity or ketone symmetry alone.

**Transfer**: Given an unfamiliar retrosynthesis target requiring a specific, unambiguous alkene position, correctly recognizing the Wittig reaction's advantage over elimination-based alkene synthesis; given an unfamiliar unsymmetrical ketone undergoing Baeyer-Villiger oxidation, correctly predicting which group migrates (and thus the ester regiochemistry) from the migratory aptitude order.

## 3. Why Beginners Fail

Students, having already learned several ways to make alkenes (E1/E2 elimination, alkyne reduction), sometimes file the Wittig reaction away as simply "one more method in the alkene-synthesis toolbox" without distinguishing WHY a synthetic chemist would specifically choose it, missing that the Wittig's defining advantage is REGIOCHEMICAL CERTAINTY — the new C=C bond forms exactly between the ylide carbon and the carbonyl carbon, with no competing regiochemical outcomes the way elimination reactions on unsymmetrical alkyl halides can produce (Zaitsev vs. Hofmann product mixtures) — this predictability, not mere alkene formation, is the actual synthetic reason to select a Wittig disconnection; and students, learning Baeyer-Villiger oxidation as "an oxygen gets inserted into the ketone," often assume the insertion position is either random or determined by simple proximity/size reasoning (e.g., "oxygen goes next to the smaller/easier-to-reach carbon"), missing that the reaction proceeds via a specific mechanism (a Criegee intermediate undergoing concerted migration) in which one particular alkyl or aryl group MIGRATES to the electrophilic oxygen based on its relative migratory aptitude (tertiary > secondary > aryl > primary > methyl, correlating with the group's ability to stabilize developing positive character during migration) — predicting the correct product requires ranking the two groups on the ketone by this specific aptitude order, not by size, proximity, or any other criterion.

## 4. Misconception Library

### MC-1: The Wittig reaction is just another way to make an alkene, interchangeable with elimination
- **Probe**: "Could you use E2 elimination on an unsymmetrical alkyl halide to achieve the exact same regiochemical outcome as a Wittig reaction targeting a specific alkene position?"
- **Characteristic phrase**: "The Wittig reaction just makes an alkene — you could use elimination instead and get the same thing."
- **Trigger (Type 1, overgeneralization treating all alkene-forming methods as interchangeable)**: Students categorize the Wittig reaction purely by its outcome type (forms a C=C bond) without distinguishing its specific synthetic advantage.
- **Conflict evidence [P28]**: E2 elimination on an unsymmetrical alkyl halide frequently produces a MIXTURE of regiochemical alkene products (competing Zaitsev/Hofmann pathways, depending on base strength/sterics), with no absolute guarantee of a single defined product. The Wittig reaction, by contrast, forms the new C=C bond specifically and exclusively between the ylide's carbanion-bearing carbon and the target carbonyl's carbon — the position of the resulting double bond is fully defined by which ylide and which carbonyl compound were chosen, with no regiochemical ambiguity. This positional certainty is precisely why synthetic chemists select the Wittig reaction over elimination when a specific, unambiguous alkene position is required.
- **Bridge [P30]**: Different alkene-forming methods are not synonymous synthetic tools — each has a distinct mechanistic basis that determines its regiochemical reliability; the Wittig's carbonyl-to-alkene disconnection logic provides positional certainty that elimination-based methods on unsymmetrical substrates structurally cannot guarantee.
- **Replacement [P31]**: The Wittig reaction's core synthetic value is regiochemical certainty — the alkene forms exactly at the position defined by the ylide and carbonyl compound chosen — distinguishing it from elimination reactions, which can produce regiochemical mixtures on unsymmetrical substrates.
- **Discrimination pairs [P33]**: Wittig reaction (exclusively one defined alkene product, position set by ylide/carbonyl choice) vs. E2 elimination on an unsymmetrical alkyl halide (potential mixture of regiochemical alkene products).
- **S6 repair path**: Present the explicit regiochemical-certainty comparison, deriving the Wittig's specific synthetic advantage from its mechanism.

### MC-2: Baeyer-Villiger oxygen insertion is random/determined by proximity, not migratory aptitude
- **Probe**: "In the Baeyer-Villiger oxidation of methyl tert-butyl ketone, does the oxygen insert next to the methyl group or the tert-butyl group? Is this determined by which group is smaller/closer?"
- **Characteristic phrase**: "The oxygen should insert wherever there's more room, or on the smaller/simpler side."
- **Trigger (Type 1, overgeneralization from simple steric/proximity reasoning applied without checking the actual mechanism)**: Students apply generic steric intuition rather than the mechanism-specific migratory aptitude order.
- **Conflict evidence [P28]**: In the Baeyer-Villiger mechanism, after the peroxyacid adds to the carbonyl carbon (forming a tetrahedral Criegee intermediate), one of the two groups attached to that carbon MIGRATES to the adjacent oxygen in a concerted step as the O-O bond breaks. The migrating group is the one with HIGHER migratory aptitude — more substituted/more stabilizing groups migrate preferentially (roughly tertiary > secondary > aryl > primary > methyl), because migration proceeds with partial positive character developing on the migrating group in the transition state, favored by groups that stabilize that character. For methyl tert-butyl ketone, the tert-butyl group (tertiary, high migratory aptitude) migrates preferentially over the methyl group (lowest migratory aptitude), so oxygen inserts specifically between the carbonyl carbon and the METHYL group (i.e., the tert-butyl group ends up bonded to oxygen in the ester product) — the opposite of a "smaller group migrates" or purely proximity-based prediction.
- **Bridge [P30]**: Migration in the Baeyer-Villiger mechanism is governed by which group better stabilizes developing positive charge during the concerted rearrangement — this is a specific electronic/structural ranking (migratory aptitude), not a generic steric or proximity argument, and it can run counter to naive size-based intuition (the LARGER, more substituted group is typically the one that migrates, not the smaller one).
- **Replacement [P31]**: Baeyer-Villiger regiochemistry is governed by migratory aptitude (tertiary > secondary > aryl > primary > methyl) — the higher-aptitude group migrates to oxygen — never assume the outcome from proximity or size alone.
- **Discrimination pairs [P33]**: Methyl tert-butyl ketone's tert-butyl group (tertiary, high migratory aptitude, migrates to oxygen) vs. its methyl group (lowest migratory aptitude, remains attached to the original carbonyl carbon in the ester product).
- **S6 repair path**: Present the explicit migratory aptitude order alongside the Criegee intermediate mechanism, deriving the correct migrating group from aptitude ranking, not proximity/size.

## 5. Explanation Library

**Primary explanation**: The Wittig reaction's defining synthetic advantage is regiochemical certainty — the new C=C bond forms exactly at the position set by the chosen ylide and carbonyl compound, avoiding the regiochemical mixtures that can arise from elimination-based alkene synthesis on unsymmetrical substrates.

**Secondary explanation (Baeyer-Villiger migratory aptitude)**: Baeyer-Villiger oxidation's regiochemistry is governed by migratory aptitude (tertiary > secondary > aryl > primary > methyl) — the group best able to stabilize developing positive character during the concerted migration step is the one that migrates to oxygen, which can run counter to simple size-based or proximity-based intuition.

## 6. Analogy Library

- **Primary analogy**: A GPS-guided delivery (the Wittig reaction) that always drops a package at one exact, pre-specified address, versus a delivery service that sometimes drops it at one of several plausible nearby addresses depending on traffic conditions (elimination's regiochemical mixtures) — the GPS-guided method's core value is the guaranteed exact destination.
- **Breaking point**: The GPS-delivery analogy conveys the Wittig's positional certainty (MC-1) well but doesn't naturally extend to the migratory-aptitude ranking governing Baeyer-Villiger regiochemistry (MC-2) — that needs the explicit aptitude-order argument.
- **Anti-analogy**: Do NOT say "the Wittig reaction just makes a double bond, like any elimination would" — this directly reinforces MC-1 by ignoring the regiochemical-certainty distinction.

## 7. Demonstration Library

- **Demonstration 1 (regiochemical-certainty comparison for Wittig vs. elimination)**: Present the explicit side-by-side product comparison, deriving the Wittig's specific synthetic advantage.
- **Demonstration 2 (Criegee intermediate mechanism with migratory aptitude ranking)**: Present the explicit mechanism and aptitude order, deriving the correct migrating group for an unsymmetrical ketone.

## 8. Discovery Lesson

**Opening**: "Could you use E2 elimination on an unsymmetrical alkyl halide to achieve the exact same regiochemical outcome as a Wittig reaction targeting a specific alkene position?"

**Exploration**: Students examine the regiochemical-certainty comparison, discovering the Wittig's specific advantage.

**Synthesis**: Guide toward: positional certainty, not mere alkene formation, is the Wittig's synthetic value.

**Closure**: "In the Baeyer-Villiger oxidation of methyl tert-butyl ketone, does the oxygen insert next to the methyl group or the tert-butyl group?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit regiochemical-certainty comparison between Wittig and elimination-based alkene synthesis.
- **TA-2 (TELL)**: State the migratory aptitude order explicitly, anchored to the Criegee intermediate mechanism diagram.
- **TA-3 (DO)**: Student predicts the Baeyer-Villiger product regiochemistry for an unfamiliar unsymmetrical ketone using the migratory aptitude order.
- **TA-4 (TEST-THINKING)**: Present the MC-1 probe and ask the student to justify why the Wittig reaction is specifically chosen over elimination for regiochemically sensitive alkene targets.

## 10. Voice Teaching

Whenever an alkene-forming method is chosen in a synthesis, narrate "check if regiochemical certainty matters — that's when the Wittig is specifically valuable." Whenever Baeyer-Villiger regiochemistry is predicted, state "rank the groups by migratory aptitude, not by size or proximity" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly explain why the Wittig reaction is chosen over elimination for regiochemically defined alkene synthesis, (b) correctly predict Baeyer-Villiger product regiochemistry from migratory aptitude ranking.

- **FA-1**: "Could you use E2 elimination on an unsymmetrical alkyl halide to achieve the exact same regiochemical outcome as a Wittig reaction targeting a specific alkene position?" — targets MC-1.
- **FA-2**: "In the Baeyer-Villiger oxidation of methyl tert-butyl ketone, does the oxygen insert next to the methyl group or the tert-butyl group? Is this determined by which group is smaller/closer?" — targets MC-2.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-2 among students who default to steric/proximity reasoning without exposure to the migratory aptitude order.

**Delayed retrieval**: Re-probe MC-1's regiochemical-certainty rationale and MC-2's migratory aptitude order as foundational knowledge for subsequent retrosynthetic-planning applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the interchangeability confusion, have the student explicitly identify the possible regiochemical outcomes of the elimination alternative before concluding the two methods are equivalent.
- **S4 (frustrated)**: Normalize — filing the Wittig reaction as "just another alkene method" is a genuinely common first-exposure simplification, since multiple alkene-forming methods are taught in sequence.
- **S6 (collision)**: Use the explicit Criegee intermediate mechanism with migratory aptitude ranking for MC-2.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why the tert-butyl group migrates preferentially over the methyl group in Baeyer-Villiger oxidation.

## 13. Memory & Review

Tag as two conceptual-correction memories (Wittig regiochemical-certainty rationale; Baeyer-Villiger migratory aptitude ranking). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates alpha-carbon reasoning (`chem.carb.alpha-reactions`) and derivative reasoning (`chem.carb.derivatives`), forming a capstone application to retrosynthetic planning contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
