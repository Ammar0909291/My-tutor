# chem.hal.grignard — Grignard and Organolithium Reagents

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.hal.grignard` |
| Domain | Haloalkanes |
| Requires | `chem.hal.sn2` |
| Unlocks | (none) |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 3 |

## 1. Concept Spine

Grignard reagents CANNOT be stored in or diluted with water/aqueous acid before workup — the Grignard (pKₐ of RH~50) INSTANTLY and COMPLETELY deprotonates water (pKₐ 15.7, K≈10³⁴), destroying the Grignard entirely (producing RH+Mg(OH)X) — the aqueous NH₄Cl workup happens strictly AFTER the main reaction is complete, to protonate the resulting alkoxide, never as a step compatible with an active Grignard reaction mixture; the Grignard's nucleophilic carbon attacks the ELECTROPHILIC CARBON of a carbonyl (C=O), NEVER the oxygen — despite oxygen bearing the δ− charge, a nucleophile (the Grignard's carbanion) is attracted to the electrophilic (δ+) carbon, not to another electron-rich center (like charges repel, opposite charges attract) — the oxygen becomes an alkoxide as a CONSEQUENCE of the carbon attack, never the site of attack itself; and adding Grignard to an ester does NOT stop at a ketone intermediate with one equivalent — the tetrahedral intermediate collapses, expelling methoxide and regenerating a carbonyl (now a ketone), which is MORE reactive than the original ester, so a SECOND equivalent of Grignard adds immediately, giving a TERTIARY ALCOHOL as the final product (after workup) — the ketone intermediate cannot be isolated under standard Grignard conditions, since it's consumed as fast as (or faster than) it forms.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Computing the explicit equilibrium constant for Grignard-plus-water deprotonation (K≈10^(50−15.7)≈10³⁴), quantifying just how completely and instantly the Grignard is destroyed by trace water.

**Representational**: A carbonyl charge-distribution diagram (C(δ+)=O(δ−)) with the Grignard's carbanion arrow explicitly drawn attacking the carbon, never the oxygen, making the electrostatic attraction direction concrete.

**Abstract**: The general principle that reagent-stage (anhydrous) and workup-stage (aqueous) conditions are strictly sequential and incompatible, never interchangeable; the general electrostatic principle that nucleophiles attack electrophilic centers, never other electron-rich centers, regardless of superficial charge-matching intuitions; the general principle that a reaction intermediate more reactive than the starting material cannot be isolated under conditions where excess reagent is present.

**Transfer**: Given an unfamiliar Grignard reaction setup, correctly identifying which stage (anhydrous reaction vs. aqueous workup) any given step belongs to; given an unfamiliar carbonyl electrophile, correctly predicting nucleophilic attack at carbon, never oxygen; given an unfamiliar ester-plus-excess-Grignard reaction, correctly predicting the tertiary alcohol final product, never an isolable ketone intermediate.

## 3. Why Beginners Fail

Students, seeing "workup with NH₄Cl/H�2O" described as part of the overall Grignard reaction procedure, assume this indicates the Grignard reagent itself is reasonably water-tolerant or that water can be introduced at various points without catastrophic consequence, missing that the workup stage is STRICTLY SEPARATE from and happens only AFTER the main, strictly anhydrous reaction — the Grignard reagent's extraordinarily high basicity (as a carbanion) means even trace water reacts instantly and completely, destroying it before it can perform its intended nucleophilic addition; students, correctly identifying that oxygen carries the δ− charge in a carbonyl group, reason (via a surface-level "negative attracts positive" intuition applied incorrectly) that the Grignard's own negatively-charged carbon should be attracted to and attack the oxygen, missing that a nucleophile is specifically attracted to and attacks the ELECTROPHILIC (positively-polarized) center — which is the carbon, not the oxygen — with the oxygen's negative charge actually INCREASING (not being neutralized) as a result of the carbon attack, forming the alkoxide product; and students, having practiced Grignard addition to simple ketones (which cleanly gives one tertiary alcohol product from one equivalent), assume the same "one equivalent, one clean addition" pattern applies to esters, missing that an ester's initial tetrahedral intermediate collapses by expelling the alkoxy leaving group, REGENERATING a carbonyl (now a ketone) that is even MORE reactive toward the remaining Grignard than the original ester was — this newly-formed ketone reacts immediately with a second equivalent, meaning the "ketone stage" is never actually isolable under normal Grignard reaction conditions.

## 4. Misconception Library

### MC-1: Grignard reagents can be stored in water or diluted with aqueous acid before workup
- **Probe**: "You accidentally add one drop of water to your Grignard solution before adding the carbonyl compound. What happens?"
- **Characteristic phrase**: "it's okay, I'll just add water at the end anyway" / "water is just a solvent."
- **Trigger (Type 5, instruction-induced)**: Students see "workup with NH₄Cl/H₂O" in the product-isolation step and assume the Grignard itself is water-stable; they do not distinguish the REACTION stage (anhydrous) from the WORKUP stage (aqueous).
- **Conflict evidence [P28]**: The Grignard (pKₐ of RH~50) deprotonates water (pKₐ 15.7) INSTANTLY and completely (K=10^(50−15.7)≈10³⁴). The product is RH (alkane)+Mg(OH)X. The Grignard is completely destroyed. Workup with aqueous NH₄Cl happens AFTER the addition is complete, to protonate the alkoxide intermediate — the Grignard itself is gone by then.
- **Bridge [P30]**: The Grignard reaction procedure genuinely involves TWO strictly SEQUENTIAL, incompatible stages — an anhydrous reaction stage (where the Grignard must remain completely water-free to survive and react productively with the intended electrophile) followed only afterward by an aqueous workup stage (where water is deliberately introduced, but only once the Grignard has already been fully consumed by reaction with the carbonyl, converting it into a much less basic alkoxide that CAN safely tolerate water) — conflating these two stages (assuming water-tolerance applies throughout) ignores this essential ordering.
- **Replacement [P31]**: Grignard reagents must remain strictly anhydrous throughout the reaction stage — water is introduced only in the separate, subsequent workup stage, after the Grignard has already reacted with its intended electrophile and is no longer present as a free, basic species.
- **Discrimination pairs [P33]**: Grignard+trace water during the reaction stage (instant, complete destruction, K≈10³⁴, RH byproduct) vs. aqueous NH₄Cl workup after the reaction is complete (safely protonates the already-formed alkoxide product).
- **S6 repair path**: Present the explicit equilibrium-constant computation for Grignard-plus-water, quantifying the instant, complete destruction that trace water causes.

### MC-2: The Grignard adds to the oxygen of the carbonyl
- **Probe**: "In the reaction of CH₃MgBr with acetone, which atom does the methyl carbanion attack?"
- **Characteristic phrase**: "attacks the oxygen because it's negative" / "the oxygen is the electrophile."
- **Trigger (Type 2, perceptual intuition)**: Oxygen carries the δ− charge in C=O; students see "negative attacks negative oxygen attacks negative Grignard carbon" — this is wrong; the nucleophilic carbon of the Grignard attacks the ELECTROPHILIC CARBON of C=O.
- **Conflict evidence [P28]**: In a carbonyl, the oxygen bears δ− and the CARBON bears δ+; a nucleophile always attacks the ELECTROPHILIC atom (the carbon). Draw the charge distribution: C(δ+)=O(δ−); the Grignard's carbanion carbon attacks C(δ+). The oxygen ends up as an alkoxide after the addition.
- **Bridge [P30]**: Correctly identifying the carbonyl's charge distribution (oxygen δ−, carbon δ+) is necessary but not sufficient — the student must then correctly apply electrostatic attraction logic (a nucleophile, itself electron-rich/negative, is attracted to and attacks the POSITIVELY polarized site, never another negatively-polarized site) to determine WHICH end of the dipole the Grignard's carbanion actually targets; the oxygen's resulting negative charge in the alkoxide product is a downstream CONSEQUENCE of the carbon attack (electron-pair displacement), not evidence that oxygen was itself the attack site.
- **Replacement [P31]**: The Grignard's nucleophilic carbanion carbon always attacks the electrophilic carbonyl carbon, never the oxygen — the oxygen becomes negatively charged (alkoxide) as a consequence of this attack, not as the site of attack.
- **Discrimination pairs [P33]**: Correct attack at carbon (C(δ+), electrons flow to form the new C–C bond and push the π-electrons onto O, forming alkoxide) vs. incorrect attack at oxygen (would violate like-charge repulsion between the carbanion and the already-negative oxygen).
- **S6 repair path**: Present the explicit charge-distribution diagram with the curved arrow drawn attacking carbon, reinforcing the electrostatic-attraction logic.

### MC-3: Adding one equivalent of Grignard to an ester gives a ketone as the final product
- **Probe**: "What is the product of treating methyl benzoate with 2 equivalents of CH₃MgBr?"
- **Characteristic phrase**: "first you get a ketone and then you stop" / "one equivalent gives one addition."
- **Trigger (Type 1, overgeneralization)**: Overgeneralization from the Grignard+ketone experience; students assume one equivalent=one addition product, not recognising that the ketone intermediate is more reactive than the ester starting material toward Grignard addition.
- **Conflict evidence [P28]**: The tetrahedral intermediate from the first addition collapses, expelling methoxide (–OCH₃) as a leaving group, regenerating a carbonyl — now a ketone (PhCOCH₃); this ketone is MORE reactive than the ester was; the second equivalent of CH₃MgBr adds immediately; the final product (after workup) is Ph–C(OH)(CH₃)₂ (a tertiary alcohol). You cannot isolate the ketone under Grignard conditions.
- **Bridge [P30]**: A ketone's carbonyl carbon is INHERENTLY more electrophilic (more reactive toward nucleophilic addition) than an ester's carbonyl carbon (whose carbonyl is stabilized by resonance donation from the adjacent alkoxy oxygen) — so once an ester's initial tetrahedral intermediate collapses to regenerate a carbonyl as a ketone, that newly-formed ketone is actually a BETTER electrophile than the STARTING ester was, meaning it reacts with any remaining Grignard reagent (present in excess, as is standard practice) even faster than the original ester did, precluding any possibility of isolating the ketone stage under ordinary reaction conditions.
- **Replacement [P31]**: Grignard addition to an ester proceeds through an unisolable ketone intermediate directly to a tertiary alcohol final product (with 2 equivalents of Grignard consumed) — never expect to isolate the ketone stage under standard Grignard conditions.
- **Discrimination pairs [P33]**: Ester (less electrophilic carbonyl, resonance-stabilized) vs. the resulting ketone intermediate (more electrophilic, no comparable resonance stabilization, reacts immediately with excess Grignard) — the ketone's greater reactivity is what precludes its isolation.
- **S6 repair path**: Present the explicit two-addition mechanism (ester→tetrahedral intermediate→ketone→second tetrahedral intermediate→tertiary alcohol), emphasizing the ketone's heightened reactivity at each stage.

## 5. Explanation Library

**Primary explanation**: Grignard reagents must remain strictly anhydrous throughout the reaction stage (destroyed instantly and completely by even trace water, via an essentially irreversible acid-base reaction) — the aqueous workup stage is strictly sequential, occurring only after the Grignard has already reacted with its intended electrophile. In carbonyl addition, the Grignard's nucleophilic carbon always attacks the electrophilic carbonyl carbon (never the oxygen), following standard electrostatic attraction logic (nucleophile to electrophile), with the oxygen's negative charge in the product being a consequence, not the site, of attack.

**Secondary explanation (esters require two equivalents, giving tertiary alcohols)**: Grignard addition to an ester proceeds through a ketone intermediate that is inherently MORE reactive than the starting ester (lacking the ester's resonance stabilization), so this intermediate reacts immediately with a second equivalent of Grignard reagent (present in excess under standard conditions), giving a tertiary alcohol as the isolable final product — the ketone stage is never isolable under normal Grignard reaction conditions.

## 6. Analogy Library

- **Primary analogy**: A extremely reactive, "starving" base (the Grignard) that will instantly and completely consume the very first available proton source it encounters (water) before it ever gets the chance to perform its intended, more deliberate nucleophilic addition task — introducing water prematurely is like feeding the wrong meal first, permanently satisfying (and thereby neutralizing) its reactivity.
- **Breaking point**: The starving-base analogy conveys the water-sensitivity concept well but doesn't naturally capture the carbon-vs-oxygen attack-site electrostatics (MC-2) or the ester-to-ketone-to-tertiary-alcohol cascade (MC-3) — those need the explicit charge-distribution diagram and the two-addition mechanism.
- **Anti-analogy**: Do NOT say "the Grignard's carbon and the carbonyl's oxygen are both negative, so they're compatible/attracted" — this directly reinforces MC-2 by implying like-charge attraction.

## 7. Demonstration Library

- **Demonstration 1 (Grignard-plus-water equilibrium-constant computation)**: Compute the explicit K value for Grignard deprotonating water, quantifying the instant, complete destruction.
- **Demonstration 2 (carbonyl charge-distribution diagram with correct attack-site arrow)**: Present the explicit charge diagram with the curved arrow attacking carbon, reinforcing the electrostatic logic.
- **Demonstration 3 (two-addition ester-to-tertiary-alcohol mechanism)**: Present the explicit full mechanism, tracking the ketone intermediate's heightened reactivity at each stage.

## 8. Discovery Lesson

**Opening**: "If you accidentally add one drop of water to a Grignard solution before the main reaction, what happens?"

**Exploration**: Students compute the explicit equilibrium constant for Grignard-plus-water, discovering instant, complete destruction.

**Synthesis**: Guide toward: the Grignard reaction has strictly sequential anhydrous-reaction and aqueous-workup stages — never interchangeable.

**Closure**: "Does treating an ester with 2 equivalents of Grignard stop at the ketone stage?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit Grignard-plus-water equilibrium-constant computation.
- **TA-2 (TELL)**: State the carbon-attack (never oxygen-attack) rule explicitly, anchored to the charge-distribution diagram.
- **TA-3 (DO)**: Student predicts the final product for an unfamiliar ester-plus-excess-Grignard reaction.
- **TA-4 (TEST-THINKING)**: Present the CH₃MgBr-plus-acetone probe and ask the student to justify carbon (not oxygen) as the attack site.

## 10. Voice Teaching

Whenever Grignard reagents are handled, narrate "strictly anhydrous until workup — even a drop of water destroys it completely." Whenever carbonyl addition is drawn, state "attack the carbon, the electrophile — never the oxygen" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly distinguish the anhydrous reaction stage from the aqueous workup stage, (b) correctly draw nucleophilic attack at the carbonyl carbon, never oxygen, (c) correctly predict the tertiary-alcohol final product from ester-plus-excess-Grignard.

- **FA-1**: "You accidentally add one drop of water to your Grignard solution before adding the carbonyl compound. What happens?" — targets MC-1.
- **FA-2**: "In the reaction of CH₃MgBr with acetone, which atom does the methyl carbanion attack?" — targets MC-2.
- **FA-3**: "What is the product of treating methyl benzoate with 2 equivalents of CH₃MgBr?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-3 among students who have only practiced Grignard addition to ketones, without exposure to the ester-specific two-addition cascade.

**Delayed retrieval**: Re-probe MC-1's anhydrous-stage requirement and MC-3's ester-cascade mechanism as foundational knowledge for subsequent multi-step organic synthesis applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the water-tolerance confusion, have the student explicitly compute the Grignard-water K value before assuming any water compatibility.
- **S4 (frustrated)**: Normalize — conflating the workup stage's water tolerance with the reaction stage's requirements is genuinely common on first exposure.
- **S6 (collision)**: Use the explicit charge-distribution diagram for MC-2; use the two-addition mechanism for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why the ketone intermediate from an ester-Grignard reaction can't be isolated.

## 13. Memory & Review

Tag as one procedural memory (strict anhydrous-vs-workup stage separation) plus two conceptual-correction memories (carbon-attack-site electrostatics; ester-to-tertiary-alcohol two-addition cascade). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates SN2 reasoning built across `chem.hal.sn2`, forming a capstone application to multi-step organic synthesis and carbon-carbon-bond-formation contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
