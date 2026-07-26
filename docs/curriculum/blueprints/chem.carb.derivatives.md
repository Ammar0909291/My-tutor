# chem.carb.derivatives — Carboxylic Acid Derivatives

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.carb.derivatives` |
| Domain | Carbonyl Compounds |
| Requires | `chem.carb.carboxylic` |
| Unlocks | `chem.bio.lipids`, `chem.carb.named-reactions`, `chem.poly.condensation` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

Carboxylic acid derivative reactivity toward nucleophilic acyl substitution follows a FIXED order — acyl chloride > anhydride > ester > amide — driven ENTIRELY by the leaving-group ability of the group attached to the carbonyl carbon (Cl- best, carboxylate good, alkoxide poor, amide nitrogen worst), NOT by the electrophilicity of the carbonyl carbon alone as beginners often assume; and this reactivity order is a ONE-WAY STREET for direct interconversion — a MORE reactive derivative can be converted into any LESS reactive derivative (e.g., acyl chloride → ester), but a less reactive derivative CANNOT be directly converted into a more reactive one (e.g., you cannot directly convert an amide into an acyl chloride by simple nucleophilic acyl substitution) — attempting the "wrong direction" conversion requires activating reagents that circumvent the reactivity order entirely, not a straightforward substitution.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing acetyl chloride's vigorous, instantaneous reaction with water (violent hydrolysis) against acetamide's near-total inertness toward water at room temperature (requiring strong acid/base and heat for hydrolysis) — both share the identical carbonyl carbon electrophilicity in isolation, yet react at vastly different rates.

**Representational**: A reactivity-ladder diagram ranking acyl chloride > anhydride > ester > amide, with arrows showing that conversions only flow DOWNWARD (more reactive → less reactive), never upward without special activation.

**Abstract**: The general principle that nucleophilic acyl substitution reactivity is governed by leaving-group ability of the group on the carbonyl carbon, not carbonyl electrophilicity alone; and the general principle that direct derivative interconversion only proceeds from a more reactive to a less reactive derivative, never the reverse without an activating reagent.

**Transfer**: Given an unfamiliar pair of carboxylic acid derivatives, correctly predicting relative reactivity from leaving-group ability; given an unfamiliar proposed synthesis step converting one derivative to another, correctly judging whether it's a straightforward substitution (downhill on the reactivity ladder) or requires an activating reagent (uphill).

## 3. Why Beginners Fail

Students, having learned that nucleophilic acyl substitution depends on the carbonyl carbon being electrophilic, assume all carboxylic acid derivatives (which share the identical C=O carbonyl group) should react at roughly similar rates toward a given nucleophile, missing that the LEAVING GROUP attached to that carbonyl carbon (Cl-, RCOO-, RO-, or R2N-) varies enormously in leaving-group ability and is actually what dominates the reactivity difference — a chloride ion leaves far more easily than an amide nitrogen, making acyl chlorides intrinsically far more reactive than amides despite an essentially identical carbonyl carbon; and students, having learned that acyl chlorides can be converted into esters, amides, and anhydrides via simple nucleophilic substitution, incorrectly assume the reverse conversions (e.g., amide → acyl chloride) should work the same simple way, missing that this direction is fundamentally uphill in reactivity and requires specialized activating reagents (e.g., converting an amide back to more reactive derivatives is not a standard undergraduate transformation via simple substitution) rather than a straightforward nucleophilic acyl substitution.

## 4. Misconception Library

### MC-1: All carboxylic acid derivatives react at similar rates since they share the same carbonyl
- **Probe**: "Acetyl chloride and acetamide both have a carbonyl carbon. Would you expect them to hydrolyze in water at similar rates?"
- **Characteristic phrase**: "They both have a C=O, so they should react about the same with water."
- **Trigger (Type 1, overgeneralization from carbonyl-electrophilicity reasoning alone)**: Students focus only on the shared carbonyl group, ignoring the substituent's leaving-group ability.
- **Conflict evidence [P28]**: Acetyl chloride reacts violently and instantly with water at room temperature (vigorous hydrolysis, releasing HCl). Acetamide is essentially inert toward water at room temperature — it requires prolonged heating with strong acid or base to hydrolyze. The reactivity difference spans many orders of magnitude despite both having an identical carbonyl carbon, because chloride is an excellent leaving group while amide nitrogen is a very poor one.
- **Bridge [P30]**: The rate-determining factor in nucleophilic acyl substitution is how easily the ATTACHED GROUP can depart as a leaving group after the nucleophile adds to the carbonyl carbon — the carbonyl's electrophilicity is necessary but not sufficient; a poor leaving group (amide N) makes the overall reaction slow even if initial nucleophilic addition to the carbonyl is fast.
- **Replacement [P31]**: Carboxylic acid derivative reactivity follows the fixed order acyl chloride > anhydride > ester > amide, governed by leaving-group ability, not by carbonyl electrophilicity alone.
- **Discrimination pairs [P33]**: Acetyl chloride (excellent leaving group Cl-, reacts violently with water) vs. acetamide (poor leaving group R2N-, essentially inert toward water at room temperature).
- **S6 repair path**: Present the explicit reactivity-ladder diagram tied to leaving-group ability, deriving the reactivity difference from leaving-group quality rather than carbonyl electrophilicity alone.

### MC-2: Derivative interconversion works equally well in either direction
- **Probe**: "Acyl chlorides can be converted into amides easily. Can amides be converted back into acyl chlorides by the same simple nucleophilic substitution approach?"
- **Characteristic phrase**: "If you can go one way, you should be able to go back the same way."
- **Trigger (Type 1, overgeneralization treating substitution as reversible in either direction)**: Students assume derivative interconversion is symmetric, like many reactions they've seen framed as reversible.
- **Conflict evidence [P28]**: Direct interconversion via simple nucleophilic acyl substitution only proceeds from a MORE reactive derivative to a LESS reactive one (acyl chloride → anhydride → ester → amide, in that downhill direction) because the incoming nucleophile must displace a leaving group that is a WORSE leaving group than itself for the reaction to be favorable in the simple mechanism. Going the other direction (e.g., amide → acyl chloride) would require the amide nitrogen to leave as a leaving group and be replaced by chloride — but amide nitrogen is a much POORER leaving group than chloride, making this direction mechanistically unfavorable via straightforward substitution; it requires specialized activating conditions instead, not the same simple approach.
- **Bridge [P30]**: The reactivity ladder isn't just a ranking — it's a directional CONSTRAINT on which conversions are mechanistically straightforward: converting to a derivative that has a BETTER-or-equal leaving group is favorable, while converting to one requiring the incoming group to displace a worse leaving group is not, without extra activation.
- **Replacement [P31]**: Derivative interconversion via simple nucleophilic acyl substitution only flows downhill on the reactivity ladder (more reactive → less reactive) — converting "uphill" requires activating reagents, not the same straightforward approach.
- **Discrimination pairs [P33]**: Acyl chloride → amide (straightforward, downhill, simple substitution) vs. amide → acyl chloride (not achievable by the same simple substitution, requires special activation).
- **S6 repair path**: Present the explicit directional reactivity-ladder diagram, deriving which conversions are straightforward from the leaving-group comparison in each direction.

## 5. Explanation Library

**Primary explanation**: Carboxylic acid derivative reactivity in nucleophilic acyl substitution follows the fixed order acyl chloride > anhydride > ester > amide, governed by the leaving-group ability of the attached group (Cl- best, amide nitrogen worst) — not by carbonyl electrophilicity, which is essentially shared across all derivatives.

**Secondary explanation (directional interconversion)**: Direct derivative interconversion via simple substitution only flows downhill on the reactivity ladder (more reactive → less reactive derivative), because the incoming nucleophile must displace a leaving group no better than itself for the substitution to be favorable — converting uphill requires specialized activating reagents, not the same straightforward mechanism.

## 6. Analogy Library

- **Primary analogy**: A one-way financial exchange where a "harder currency" (better leaving group, like Cl-) can always be readily traded for a "softer currency" (worse leaving group, like amide N), but the reverse trade requires a specialized broker (activating reagent) rather than a simple direct exchange.
- **Breaking point**: The currency-exchange analogy conveys the directional-constraint concept (MC-2) well but doesn't fully explain WHY the order is fixed (MC-1) — that needs the explicit leaving-group-ability argument.
- **Anti-analogy**: Do NOT say "all these derivatives react about the same since they're all carbonyls" — this directly reinforces MC-1 by ignoring the leaving-group difference.

## 7. Demonstration Library

- **Demonstration 1 (leaving-group-ability reactivity ladder)**: Present the explicit acyl chloride > anhydride > ester > amide ranking tied to leaving-group quality, deriving the reactivity order.
- **Demonstration 2 (directional interconversion diagram)**: Present the explicit downhill-only conversion diagram, deriving which interconversions are straightforward.

## 8. Discovery Lesson

**Opening**: "Acetyl chloride and acetamide both have a carbonyl carbon. Would you expect them to hydrolyze in water at similar rates?"

**Exploration**: Students examine the leaving-group-ability ladder, discovering the true source of the reactivity difference.

**Synthesis**: Guide toward: leaving-group ability, not carbonyl electrophilicity, governs derivative reactivity.

**Closure**: "Can amides be converted back into acyl chlorides by the same simple nucleophilic substitution approach used to make amides from acyl chlorides?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit leaving-group-ability reactivity ladder for the four derivative classes.
- **TA-2 (TELL)**: State the directional-interconversion rule explicitly, anchored to the downhill-only conversion diagram.
- **TA-3 (DO)**: Student predicts whether a proposed conversion between two unfamiliar derivatives is straightforward (downhill) or requires activation (uphill).
- **TA-4 (TEST-THINKING)**: Present the MC-1 probe and ask the student to justify why acetyl chloride and acetamide react so differently despite sharing a carbonyl group.

## 10. Voice Teaching

Whenever derivative reactivity is compared, narrate "check the leaving group, not just the carbonyl — that's what actually governs the rate." Whenever a derivative interconversion is proposed, state "check the direction on the reactivity ladder — uphill needs special activation" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly rank carboxylic acid derivative reactivity from leaving-group ability, (b) correctly judge whether a proposed derivative interconversion is straightforward or requires activation.

- **FA-1**: "Acetyl chloride and acetamide both have a carbonyl carbon. Would you expect them to hydrolyze in water at similar rates?" — targets MC-1.
- **FA-2**: "Acyl chlorides can be converted into amides easily. Can amides be converted back into acyl chlorides by the same simple nucleophilic substitution approach?" — targets MC-2.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-2 among students who have only seen downhill conversion examples and assume reversibility by default.

**Delayed retrieval**: Re-probe MC-1's leaving-group-based reactivity order and MC-2's directional-interconversion rule as foundational knowledge for subsequent lipid and polymer (condensation) applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the equal-reactivity confusion, have the student explicitly identify the leaving group in each derivative before concluding anything about reactivity.
- **S4 (frustrated)**: Normalize — assuming all carbonyls react similarly is a genuinely common first-exposure error, since the carbonyl group looks identical across all four derivative classes.
- **S6 (collision)**: Use the explicit downhill-only conversion diagram for MC-2.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why amide-to-acyl-chloride conversion isn't achievable by simple substitution.

## 13. Memory & Review

Tag as two conceptual-correction memories (leaving-group-based reactivity ordering; directional-only interconversion). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept unlocks `chem.bio.lipids`, `chem.carb.named-reactions`, and `chem.poly.condensation`, extending derivative-reactivity reasoning to ester-based lipids, named acyl-substitution reactions, and condensation polymerization.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
