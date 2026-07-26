# chem.hyd.alkenes — Alkenes

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.hyd.alkenes` |
| Domain | Hydrocarbons |
| Requires | `chem.hyd.alkanes`, `chem.org.mechanisms` |
| Unlocks | `chem.alc.epoxides`, `chem.hyd.alkynes`, `chem.poly.addition` |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 3 |

## 1. Concept Spine

Markovnikov's rule is not an arbitrary mnemonic but a direct consequence of carbocation stability — H⁺ adds to the alkene carbon that generates the MORE STABLE carbocation (e.g., the secondary over the primary from propene+HBr), and Br⁻ then attacks that more stable carbocation, so "H goes to the carbon with more Hs" is only a correct SUMMARY, never a substitute for the underlying mechanism, which correctly predicts outcomes even where the mnemonic fails (vinyl systems, 1,2-shifts); Br₂ addition to an alkene proceeds via a bromonium-ion intermediate that BRIDGES both carbons, sterically blocking same-face attack, so Br⁻ can only attack from the OPPOSITE face — addition is genuinely ANTI, never syn, meaning cis-alkenes give the racemic (d,l) dibromide pair, not the meso compound; and hydroboration (B adds to the LESS substituted carbon, giving anti-Markovnikov alcohol after oxidation) and oxymercuration (Hg activates the alkene, water attacks the MORE substituted carbon, giving Markovnikov alcohol) are genuinely OPPOSITE regiochemical outcomes from similarly-named "alkene hydration" methods, never interchangeable.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Drawing both possible carbocations from H⁺ addition to propene (1° vs. 2°) explicitly, identifying the 2° as more stable, and confirming Br⁻ attacks it to give 2-bromopropane (the Markovnikov product).

**Representational**: A bromonium-ion bridging diagram for Br₂ addition to cis-but-2-ene, showing the intermediate physically blocking same-face nucleophilic attack, forcing anti addition.

**Abstract**: The general principle that regiochemistry (Markovnikov vs. anti-Markovnikov) and stereochemistry (syn vs. anti addition) both follow directly from mechanism (carbocation stability; bridged intermediate geometry) rather than being memorized as independent facts; the general opposite-regiochemistry relationship between hydroboration and oxymercuration.

**Transfer**: Given an unfamiliar alkene and electrophilic addition reagent, correctly predicting the major product's regiochemistry from carbocation-stability (or analogous intermediate-stability) reasoning, correctly predicting stereochemical outcome (syn/anti) from intermediate geometry, and correctly choosing between hydroboration and oxymercuration based on desired regiochemistry.

## 3. Why Beginners Fail

Students memorize Markovnikov's rule as a surface-level mnemonic ("H goes to the carbon with more Hs") without connecting it to the underlying carbocation-stability mechanism, missing that this connection is what allows correct prediction in situations where the mnemonic itself fails or becomes ambiguous (vinyl systems, rearrangement via 1,2-shifts) — the mechanistic understanding both predicts the Markovnikov product and explains why it forms; they assume Br₂ adds to both carbons of the alkene from the same face (an intuitive "two hands grabbing from the same side" mental image), missing that the actual mechanism proceeds through a bromonium ion that bridges and physically occupies one face of both carbons, forcing the second bromide to attack from the opposite face — addition is genuinely anti, and this changes the stereochemical outcome (racemic pair, not meso, from a cis-alkene); and they conflate hydroboration and oxymercuration as producing the "same" alcohol product because both are learned as "alkene hydration methods," missing that the two methods have genuinely opposite regiochemical outcomes (anti-Markovnikov via hydroboration's less-substituted boron attachment vs. Markovnikov via oxymercuration's more-substituted water attack).

## 4. Misconception Library

### MC-1: Markovnikov's rule is just about hydrogen going to the carbon with more Hs — it doesn't have a mechanism
- **Probe**: "Why does HBr add to propene to give 2-bromopropane rather than 1-bromopropane? Explain using the mechanism, not just the rule."
- **Characteristic phrase**: "H goes to the one with more Hs" (rote, no mechanism).
- **Trigger (Type 5, instruction-induced)**: The mnemonic version of Markovnikov's rule is taught first and students use it without connecting it to carbocation stability; when the situation changes (e.g., a vinyl system or a 1,2-shift), the mnemonic fails while the mechanistic understanding succeeds.
- **Conflict evidence [P28]**: Drawing the two possible carbocations from H⁺ adding to each end of propene (1° and 2°); the 2° is more stable; Br⁻ attacks the more stable carbocation (2°) — the mechanistic understanding predicts the Markovnikov product AND explains why, unlike the mnemonic which is a mere pattern with no explanatory or generalizable power.
- **Bridge [P30]**: Markovnikov's rule is a correct SUMMARY of a specific mechanistic outcome (electrophilic addition proceeding via the more stable carbocation) — it is not an independent rule that happens to coincide with mechanism; treating it as a standalone fact rather than a consequence of carbocation stability leaves the student unable to predict outcomes when the surface pattern ("more Hs") becomes ambiguous or misleading.
- **Replacement [P31]**: Always derive the major product from carbocation stability (draw both possible carbocations, identify the more stable one) — treat "H goes to the carbon with more Hs" only as a shortcut summary that follows from this mechanism, never as an independent rule.
- **Discrimination pairs [P33]**: Propene+HBr via mechanism (correctly predicts 2-bromopropane from 2° carbocation stability) vs. blind mnemonic application (works here but fails to explain vinyl-system or rearrangement cases).
- **S6 repair path**: Draw both carbocations explicitly for the propene case, having the student identify which is more stable before predicting the product.

### MC-2: Br₂ adds to both carbons of the alkene from the same face (syn addition)
- **Probe**: "Adding Br₂ to cis-but-2-ene gives which stereochemical product — meso or d,l pair?"
- **Characteristic phrase**: "both Br atoms come from the same side" / student draws syn dibromide.
- **Trigger (Type 2, perceptual intuition)**: Students draw Br₂ approaching the π-bond and assume it attacks the double bond symmetrically from one face, like two hands grabbing from the same side.
- **Conflict evidence [P28]**: The bromonium ion intermediate bridges both carbons, blocking same-side attack; Br⁻ can only attack from the OPPOSITE face (anti); for cis-but-2-ene: anti addition → (2R,3S)- and (2S,3R)-dibromobutane = the d,l (racemic) pair (not meso). If it were syn, cis-alkene would give meso; the actual stereochemical outcome distinguishes the two mechanisms cleanly.
- **Bridge [P30]**: The bromonium ion is a genuine, discrete cyclic intermediate that physically occupies one face of the alkene — this structural feature is what forces the SECOND bromide (the nucleophile) to approach from the opposite, unoccupied face, making anti addition a structural necessity of the mechanism, not an arbitrary rule.
- **Replacement [P31]**: Br₂ addition to alkenes is ANTI (via the bridging bromonium ion), never syn — always predict stereochemistry from this bridged-intermediate geometry.
- **Discrimination pairs [P33]**: Anti addition to cis-but-2-ene (→ racemic d,l pair, correct) vs. hypothetical syn addition to cis-but-2-ene (→ meso, incorrect prediction).
- **S6 repair path**: Draw the explicit bromonium-ion bridging structure, showing why the second bromide is structurally forced to the opposite face.

### MC-3: Hydroboration and oxymercuration both give the same product
- **Probe**: "You want to convert 1-methylcyclohexene to 1-methylcyclohexanol (Markovnikov). Do you use hydroboration or oxymercuration?"
- **Characteristic phrase**: "use hydroboration" (inverted) / "both give the same alcohol."
- **Trigger (Type 1, overgeneralization)**: Students learn "hydroboration gives anti-Markovnikov alcohol" and "oxymercuration gives Markovnikov alcohol" as two separate facts but mix up which is which, or overgeneralize both as interchangeable "hydration methods."
- **Conflict evidence [P28]**: Hydroboration = B goes to LESS substituted C → OH ends up at LESS substituted C → anti-Markovnikov. Oxymercuration = Hg activates alkene; water attacks MORE substituted C → OH at MORE substituted C → Markovnikov. The diagnostic is: "which carbon gets OH?" — this maps to "which addition method?"
- **Bridge [P30]**: The two methods differ in which step controls regiochemistry — hydroboration's concerted, four-center transition state places boron (and hence eventual OH) at the less hindered, less substituted carbon, while oxymercuration's carbocation-like mercurinium intermediate directs water to the more substituted, more stabilized position — these are genuinely opposite regiochemical mechanisms, not variations of the same outcome.
- **Replacement [P31]**: For Markovnikov alcohol, use oxymercuration; for anti-Markovnikov alcohol, use hydroboration — always check the desired regiochemistry before selecting a method, never assume interchangeability.
- **Discrimination pairs [P33]**: Hydroboration of 1-methylcyclohexene (OH at less substituted C, anti-Markovnikov) vs. oxymercuration of 1-methylcyclohexene (OH at more substituted C, Markovnikov, correct choice for the target product).
- **S6 repair path**: Use the explicit two-column comparison table (which carbon gets OH, for each method), having the student select the method matching the target regiochemistry.

## 5. Explanation Library

**Primary explanation**: Markovnikov's rule is a direct consequence of carbocation stability in electrophilic addition — H⁺ adds to whichever alkene carbon generates the more stable carbocation, and the nucleophile then attacks that carbocation. This mechanistic reasoning, not the surface mnemonic alone, correctly predicts outcomes even in cases (vinyl systems, rearrangements) where the simple mnemonic fails.

**Secondary explanation (stereochemistry and regiochemistry of alkene addition methods)**: Br₂ addition proceeds through a bridging bromonium ion that physically blocks same-face attack, forcing genuinely anti addition (never syn). Hydroboration and oxymercuration are two structurally distinct hydration methods with opposite regiochemical outcomes — hydroboration places OH at the less substituted carbon (anti-Markovnikov, via a concerted transition state), while oxymercuration places OH at the more substituted carbon (Markovnikov, via a mercurinium-ion-like intermediate).

## 6. Analogy Library

- **Primary analogy**: A "more stable seat wins" auction (carbocation stability) where the electrophile "sits" wherever it's most comfortable (most stabilized) before the nucleophile arrives — this seat-selection logic, not a memorized seating chart, determines the outcome.
- **Breaking point**: The seat-selection analogy conveys carbocation-stability-driven regiochemistry well but doesn't naturally capture the bromonium-ion anti-addition geometry (MC-2) or the hydroboration/oxymercuration regiochemical opposition (MC-3) — those need the explicit bridging-intermediate diagram and the two-column comparison table.
- **Anti-analogy**: Do NOT say "Markovnikov's rule is just a pattern to memorize, like a spelling rule" — this directly reinforces MC-1 by detaching the rule from its mechanistic origin.

## 7. Demonstration Library

- **Demonstration 1 (carbocation-stability derivation of Markovnikov's rule)**: Draw both possible carbocations for propene+HBr explicitly, deriving the major product from relative stability rather than the mnemonic.
- **Demonstration 2 (bromonium-ion bridging and anti addition)**: Draw the explicit bromonium-ion intermediate for cis-but-2-ene+Br₂, showing the structural basis for anti (not syn) addition and the resulting d,l pair.
- **Demonstration 3 (hydroboration vs. oxymercuration two-column comparison)**: Present both methods side by side for the same alkene, tracking which carbon receives OH in each case.

## 8. Discovery Lesson

**Opening**: "Why does HBr give 2-bromopropane from propene, not 1-bromopropane?"

**Exploration**: Students draw both possible carbocation intermediates and compare their stability, discovering the more stable carbocation determines the product.

**Synthesis**: Guide toward: Markovnikov's rule is a consequence of carbocation stability, not an independent memorized pattern.

**Closure**: "Does Br₂ add to both carbons of an alkene from the same face, or opposite faces?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit carbocation-stability derivation for propene+HBr.
- **TA-2 (TELL)**: State the anti-addition rule for Br₂ explicitly, anchored to the bromonium-ion bridging structure.
- **TA-3 (DO)**: Student selects hydroboration or oxymercuration for a target regiochemistry on an unfamiliar alkene.
- **TA-4 (TEST-THINKING)**: Present the cis-but-2-ene+Br₂ stereochemistry probe and ask the student to justify the d,l (not meso) outcome from the bromonium mechanism.

## 10. Voice Teaching

Whenever Markovnikov's rule is applied, narrate "derive from carbocation stability first — the 'more Hs' pattern is just the summary." Whenever Br₂ addition is discussed, state "bromonium ion forces anti addition, never syn" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly derive the Markovnikov product from carbocation-stability reasoning, (b) correctly predict anti-addition stereochemistry for Br₂ addition, (c) correctly select hydroboration or oxymercuration for a target regiochemistry.

- **FA-1**: "Why does HBr add to propene to give 2-bromopropane? Explain via mechanism." — targets MC-1.
- **FA-2**: "Adding Br₂ to cis-but-2-ene gives which stereochemical product — meso or d,l pair?" — targets MC-2.
- **FA-3**: "To convert 1-methylcyclohexene to 1-methylcyclohexanol (Markovnikov), which method do you use?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-3 among students who correctly recall both regiochemical facts individually but invert which method maps to which outcome.

**Delayed retrieval**: Re-probe MC-1's carbocation-stability derivation and MC-2's anti-addition mechanism before `chem.poly.addition` requires fluent reasoning about addition mechanisms in polymerization contexts.

## 12. Recovery Notes

- **S3 (stuck)**: For the mnemonic-only confusion, have the student draw both possible carbocations explicitly before predicting any product, never relying on the "more Hs" phrase alone.
- **S4 (frustrated)**: Normalize — treating Markovnikov's rule as a standalone pattern rather than a mechanistic consequence is genuinely common on first exposure, since the mnemonic is often taught before the mechanism.
- **S6 (collision)**: Use the explicit bromonium-ion diagram for MC-2; use the two-column comparison table for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why Br₂ addition is anti rather than syn.

## 13. Memory & Review

Tag as two conceptual-correction memories (mechanism-derived Markovnikov reasoning; anti-addition via bromonium bridging) plus one procedural memory (hydroboration-vs-oxymercuration method selection). Schedule a spaced check at ~1 week and again before `chem.poly.addition`.

## 14. Transfer Map

Feeds directly into `chem.alc.epoxides` (epoxide-forming reactions build on alkene addition mechanisms), `chem.hyd.alkynes` (addition mechanisms extend directly to triple bonds), and `chem.poly.addition` (addition polymerization directly requires fluent carbocation/radical addition mechanism reasoning established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
