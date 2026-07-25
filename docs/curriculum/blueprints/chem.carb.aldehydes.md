# chem.carb.aldehydes — Aldehydes

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.carb.aldehydes` |
| Domain | Carbonyl Compounds |
| Requires | `chem.alc.alcohols`, `chem.org.mechanisms` |
| Unlocks | `chem.bio.carbohydrates`, `chem.carb.carboxylic`, `chem.carb.ketones` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

A nucleophile attacks the ELECTROPHILIC carbonyl CARBON (δ+), never the oxygen (δ−) — the π-bond electrons are then pushed onto oxygen (forming the alkoxide), not because oxygen "attracted" the incoming nucleophile, but because carbon is the positively-polarized site a nucleophile is drawn to (like poles repel: a negative nucleophile does not attack another negative center); reducing an ALDEHYDE with NaBH₄ gives a PRIMARY alcohol (the carbonyl carbon has only one alkyl/H substituent plus the incoming H), never a secondary alcohol — secondary alcohols require a KETONE (two carbon substituents on the carbonyl carbon) as starting material, so "aldehyde reduces to secondary alcohol" conflates aldehyde and ketone reduction outcomes; and Fehling's test is positive ONLY for ALIPHATIC aldehydes, NOT for aromatic aldehydes like benzaldehyde — Cu²⁺ in alkaline tartrate cannot oxidize benzaldehyde under typical conditions, so a positive Fehling's result cannot be assumed from "it's an aldehyde" alone; Tollens' reagent (silver mirror), not Fehling's, is the correct diagnostic for aromatic aldehydes.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Drawing the explicit curved-arrow mechanism for NaBH₄ addition to ethanal, tracing the hydride's arrow to the carbonyl CARBON, with the π-electrons moving to oxygen as a consequence, not a cause.

**Representational**: A side-by-side product diagram: propanal+NaBH₄→propan-1-ol (primary, one alkyl group + H at the former carbonyl carbon) vs. a ketone+NaBH₄→secondary alcohol (two alkyl groups at the former carbonyl carbon), visually anchoring the substituent-count distinction.

**Abstract**: The general principle that nucleophiles attack electrophilic centers (like-charge repulsion rules out attacking the negative oxygen); the general aliphatic-vs-aromatic-aldehyde distinction for oxidation-based diagnostic tests (Fehling's vs. Tollens').

**Transfer**: Given an unfamiliar carbonyl compound and nucleophile, correctly identifying the carbon as the attack site, correctly predicting primary-vs-secondary alcohol product from aldehyde-vs-ketone starting material, and correctly selecting Tollens' (not Fehling's) for aromatic aldehyde detection.

## 3. Why Beginners Fail

Students correctly identify the carbonyl's dipole (C+/O−) but then misidentify the electrophilic site, reasoning that a nucleophile should be "attracted" to the negatively-polarized oxygen, missing that a nucleophile (itself electron-rich/negative) attacks the POSITIVELY polarized carbon, not another negative center — the oxygen's negative charge in the product arises from the π-electrons being displaced there as a CONSEQUENCE of the carbon attack, not from any "attraction" of the nucleophile to oxygen; they overgeneralize from ketone reduction ("carbonyl → alcohol") without distinguishing aldehyde from ketone substrates, missing that the aldehyde carbonyl carbon bears only ONE alkyl/aryl substituent (plus the incoming hydride/H), producing a PRIMARY alcohol, while a secondary alcohol specifically requires TWO carbon substituents on the carbonyl carbon (a ketone); and they treat Fehling's test as a universal "aldehyde test" without qualification, missing that Fehling's reagent specifically fails to oxidize aromatic aldehydes like benzaldehyde under normal conditions — a distinction frequently omitted in initial, simplified teaching of the test.

## 4. Misconception Library

### MC-1: Nucleophiles attack the oxygen of the carbonyl because oxygen is δ−
- **Probe**: "In the addition of NaBH₄ to ethanal, which atom does the hydride (H⁻) attack?"
- **Characteristic phrase**: "H⁻ attacks the oxygen because it's δ−" / "H⁻ goes to the negative end."
- **Trigger (Type 2, perceptual intuition)**: Students see the dipole correctly (C+/O−) but misidentify the electrophilic site; a nucleophile attacks the POSITIVE centre — the carbon — not the negative oxygen. The oxygen ends up as an alkoxide because the π electrons are pushed there, not because O was "attracted" to the incoming nucleophile.
- **Conflict evidence [P28]**: Drawing the curved arrow from H⁻ to the C(δ+); the π-bond electrons move to O → alkoxide; protonation gives the alcohol. A nucleophile (H⁻ = negative species) attacks the electrophilic site (C+), NOT another negatively polarised site. Like poles repel.
- **Bridge [P30]**: Identifying the correct dipole direction (C+/O−) is necessary but not sufficient — the student must then apply the correct electrostatic reasoning (opposite charges attract) to identify WHICH end of the dipole a nucleophile targets; oxygen's final negative charge in the alkoxide product is a downstream consequence of electron-pair displacement during the carbon attack, not evidence that oxygen was the original attack site.
- **Replacement [P31]**: Nucleophiles always attack the electrophilic (positively-polarized) carbon of a carbonyl, never the oxygen — the oxygen becomes negatively charged in the product as a consequence of the π-electrons being pushed there, not as the site of nucleophilic attack.
- **Discrimination pairs [P33]**: Correct H⁻ attack at carbon (electrons flow C=O→alkoxide) vs. incorrect H⁻ attack at oxygen (would violate like-charge repulsion).
- **S6 repair path**: Walk through the explicit curved-arrow mechanism, having the student justify each arrow's direction from electrostatic attraction/repulsion.

### MC-2: Aldehydes give secondary alcohols when reduced with NaBH₄
- **Probe**: "What is the product of reducing propanal (CH₃CH₂CHO) with NaBH₄ followed by workup?"
- **Characteristic phrase**: "the product is propan-2-ol" / "propanal reduced gives a secondary alcohol."
- **Trigger (Type 1, overgeneralization)**: Students learn "carbonyl→alcohol" from ketone reduction and conflate aldehyde (→1°) with ketone (→2°).
- **Conflict evidence [P28]**: The aldehyde carbonyl carbon gains one H from the hydride; the other substituent is the alkyl chain; the –OH is on the terminal carbon → propan-1-ol (1-propanol). Secondary alcohol requires TWO carbon groups on the carbonyl carbon → that requires a ketone.
- **Bridge [P30]**: The alcohol's classification (primary/secondary/tertiary) is determined by how many CARBON groups are attached to the carbinol carbon in the PRODUCT — an aldehyde's carbonyl carbon already has only one carbon substituent before reduction (the other position being H), so after hydride addition it still has only one carbon substituent, yielding a primary alcohol; a ketone's carbonyl carbon has two carbon substituents from the start, yielding a secondary alcohol after reduction.
- **Replacement [P31]**: Aldehyde reduction (NaBH₄ or LiAlH₄) always gives a PRIMARY alcohol; ketone reduction always gives a SECONDARY alcohol — never conflate the two starting-material classes.
- **Discrimination pairs [P33]**: Propanal+NaBH₄ (→propan-1-ol, primary) vs. a ketone e.g. acetone+NaBH₄ (→propan-2-ol, secondary) — same reducing agent, different product class from different substrate class.
- **S6 repair path**: Draw the explicit carbonyl-carbon substituent count for both an aldehyde and a ketone side by side before and after reduction.

### MC-3: Fehling's test is positive for all aldehydes including benzaldehyde
- **Probe**: "What would you observe when benzaldehyde is added to Fehling's solution?"
- **Characteristic phrase**: "brick-red precipitate because benzaldehyde is an aldehyde."
- **Trigger (Type 5, instruction-induced)**: Fehling's is introduced as a general "aldehyde test" without qualification; the distinction between aliphatic and aromatic aldehydes is often omitted in initial teaching.
- **Conflict evidence [P28]**: Fehling's requires an aliphatic aldehyde; benzaldehyde does NOT give a positive Fehling's test (no brick-red Cu₂O precipitate) under normal conditions. Tollens' (silver mirror) is the correct diagnostic for aromatic aldehydes. The distinction: Cu²⁺ in alkaline tartrate cannot oxidise benzaldehyde under typical conditions.
- **Bridge [P30]**: "Aldehyde" as a functional-group category is not a guarantee of uniform reactivity toward every oxidizing test reagent — the specific oxidation mechanism Fehling's relies on (Cu²⁺ reduction in alkaline tartrate) genuinely fails for aromatic aldehydes under normal conditions, making the aliphatic/aromatic distinction essential rather than a minor exception.
- **Replacement [P31]**: Fehling's test is a positive diagnostic specifically for ALIPHATIC aldehydes — use Tollens' reagent (silver mirror test) to test for aromatic aldehydes like benzaldehyde, never assume Fehling's works universally for "any aldehyde."
- **Discrimination pairs [P33]**: Aliphatic aldehyde (e.g., ethanal, positive Fehling's, brick-red Cu₂O) vs. aromatic aldehyde (benzaldehyde, negative Fehling's, requires Tollens' instead).
- **S6 repair path**: Present the explicit aliphatic-vs-aromatic Fehling's-result contrast, having the student select the correct diagnostic test for each aldehyde class.

## 5. Explanation Library

**Primary explanation**: In nucleophilic addition to a carbonyl, the nucleophile always attacks the electrophilic (positively-polarized) carbon, never the oxygen — the resulting negative charge on oxygen (alkoxide) is a consequence of the displaced π-electrons, not evidence of the oxygen being the actual attack site. The product's classification as primary or secondary alcohol depends directly on the substrate class: aldehydes (one carbon substituent at the carbonyl carbon) always give primary alcohols; ketones (two carbon substituents) always give secondary alcohols.

**Secondary explanation (aliphatic vs. aromatic aldehyde diagnostic tests)**: Fehling's test, while a reliable positive diagnostic for aliphatic aldehydes, genuinely fails for aromatic aldehydes like benzaldehyde under normal conditions — Tollens' reagent (silver mirror test) is the correct choice when testing an aromatic aldehyde, since "aldehyde" as a functional-group label does not guarantee uniform reactivity across every oxidation-based test.

## 6. Analogy Library

- **Primary analogy**: A tug-of-war where the negatively-charged nucleophile is pulled specifically toward the positively-charged carbon (like a magnet toward its opposite pole), never toward the already-negative oxygen — the oxygen's growing negative charge is a side effect of the electrons being pulled away from it, not a target.
- **Breaking point**: The tug-of-war analogy conveys the electrostatic attack-site reasoning well but doesn't naturally capture the primary-vs-secondary product distinction (MC-2) or the aliphatic-vs-aromatic test-selectivity distinction (MC-3) — those need the explicit substituent-count comparison and the Fehling's-vs-Tollens' contrast.
- **Anti-analogy**: Do NOT say "the nucleophile goes to wherever the negative charge is drawn" — this directly reinforces MC-1 by conflating the drawn dipole's negative end with the actual attack site.

## 7. Demonstration Library

- **Demonstration 1 (explicit curved-arrow mechanism with electrostatic justification)**: Draw the NaBH₄+ethanal mechanism step by step, justifying the arrow's direction from electrostatic attraction to the electrophilic carbon.
- **Demonstration 2 (aldehyde vs. ketone reduction product comparison)**: Reduce propanal and a comparable ketone side by side, tracking carbonyl-carbon substituent count before and after reduction.
- **Demonstration 3 (Fehling's vs. Tollens' aliphatic/aromatic contrast)**: Present the explicit positive/negative Fehling's results for an aliphatic and an aromatic aldehyde, then introduce Tollens' as the correct aromatic-aldehyde diagnostic.

## 8. Discovery Lesson

**Opening**: "The carbonyl carbon is δ+ and the oxygen is δ−. Which one does a nucleophile like H⁻ attack?"

**Exploration**: Students trace the curved-arrow mechanism, discovering the nucleophile attacks the positively-charged carbon, with oxygen's negative charge arising afterward.

**Synthesis**: Guide toward: nucleophiles attack electrophilic (positive) centers — like charges repel, opposite charges attract.

**Closure**: "Does benzaldehyde give a positive Fehling's test, just like any other aldehyde?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit curved-arrow mechanism for NaBH₄ addition, justifying attack-site selection electrostatically.
- **TA-2 (TELL)**: State the aldehyde-gives-primary/ketone-gives-secondary rule explicitly, anchored to the substituent-count comparison.
- **TA-3 (DO)**: Student predicts the reduction product for an unfamiliar aldehyde or ketone.
- **TA-4 (TEST-THINKING)**: Present the benzaldehyde-Fehling's probe and ask the student to justify the negative result from the aliphatic/aromatic distinction.

## 10. Voice Teaching

Whenever a nucleophilic addition mechanism is drawn, narrate "the nucleophile attacks the positive carbon — never the negative oxygen." Whenever an aldehyde test is discussed, state "check aliphatic vs. aromatic before assuming Fehling's works" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly draw nucleophilic addition arrows attacking the carbonyl carbon, (b) correctly predict primary-vs-secondary alcohol product from aldehyde-vs-ketone substrate, (c) correctly select Tollens' over Fehling's for aromatic aldehyde detection.

- **FA-1**: "In the addition of NaBH₄ to ethanal, which atom does the hydride attack?" — targets MC-1.
- **FA-2**: "What is the product of reducing propanal with NaBH₄?" — targets MC-2.
- **FA-3**: "What would you observe when benzaldehyde is added to Fehling's solution?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who correctly identify the carbonyl dipole but haven't yet connected it to nucleophile-attack-site reasoning.

**Delayed retrieval**: Re-probe MC-1's electrostatic attack-site reasoning and MC-2's aldehyde-vs-ketone product distinction before `chem.carb.ketones` requires fluent, comparative reasoning between the two carbonyl classes.

## 12. Recovery Notes

- **S3 (stuck)**: For the attack-site confusion, have the student explicitly state which atom is electrophilic (positive) before drawing any arrow, never reasoning from "where is the negative charge."
- **S4 (frustrated)**: Normalize — attacking the wrong end of the carbonyl dipole is genuinely common on first exposure to nucleophilic addition mechanisms.
- **S6 (collision)**: Use the explicit substituent-count comparison for MC-2; use the Fehling's-vs-Tollens' contrast for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why benzaldehyde fails the Fehling's test.

## 13. Memory & Review

Tag as one procedural memory (electrostatically-justified nucleophilic addition mechanism) plus two conceptual-correction memories (aldehyde-vs-ketone reduction product; aliphatic-vs-aromatic Fehling's diagnostic). Schedule a spaced check at ~1 week and again before `chem.carb.ketones`.

## 14. Transfer Map

Feeds directly into `chem.carb.ketones` (comparative aldehyde/ketone reasoning established here is directly required), `chem.carb.carboxylic` (aldehyde oxidation is a direct route to carboxylic acids), and `chem.bio.carbohydrates` (carbonyl reactivity underlies sugar chemistry).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
