# Acid-Base Titrations — `chem.equil.titration`

## Identity
- **KG ID**: chem.equil.titration
- **Subject**: chemistry
- **Domain**: chem.equil
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.equil.weak-acid
- **Unlocks**: chem.anal.volumetric

## Learning Objective
Sketch and interpret titration curves for all four acid-base combinations (strong-strong, weak-strong, strong-weak, weak-weak), identify the equivalence point pH and half-equivalence point, select appropriate indicators, and calculate pH at any stage of a weak acid–strong base titration.

## Core Understanding
A titration curve plots the pH of the analyte solution (y-axis) as a function of volume of titrant added (x-axis). The curve shape encodes the nature of the acid-base pair and allows extraction of Ka, equivalence point pH, and indicator requirements.

**Key vocabulary distinction**: the equivalence point is the stoichiometric point — where moles of titrant added exactly equal moles of analyte; it is a calculated value. The endpoint is when the indicator changes colour; it is an observed value. Good indicator selection makes them coincide.

**Strong acid–strong base titration (e.g., HCl titrated with NaOH)**:
- Before equivalence: pH from excess HCl directly; pH = −log[H⁺]remaining.
- At equivalence: only NaCl in water; pH = 7.00 (neutral salt, no hydrolysis).
- After equivalence: pH from excess NaOH; pOH = −log[OH⁻]excess, pH = 14 − pOH.
- Curve shape: slow rise initially, then a steep nearly vertical jump through pH 4–10 at the equivalence point.
- Indicator choice: any indicator with pKa in the range 4–10 works — phenolphthalein (pKa ~9.3) or methyl orange (pKa ~3.5) both acceptable.

**Weak acid–strong base titration (e.g., CH₃COOH titrated with NaOH)**:
- Before any titrant: pH from Ka of weak acid, ICE table, 5% check.
- Buffer region (before equivalence): Henderson-Hasselbalch pH = pKa + log([A⁻]/[HA]); the curve is flat here.
- Half-equivalence point (when half the acid is neutralised): [A⁻] = [HA], log(1) = 0, so pH = pKa. This is the method for experimentally determining Ka.
- Equivalence point: all acid converted to salt A⁻; pH > 7 (anion hydrolyses to give OH⁻). pH calculated from Kh = Kw/Ka.
- After equivalence: pH from excess NaOH.
- Curve shape: gradual rise in buffer region, steep jump at equivalence (narrower than strong-strong), equivalence pH > 7.
- Indicator choice: must change colour near the equivalence pH; phenolphthalein (pKa ~9.3, range 8.2–10) is appropriate for most weak acid–strong base titrations; methyl orange (endpoint ~3.5–4.5) is NOT appropriate because it changes colour in the buffer region, not at equivalence.

**Strong acid–weak base titration (e.g., HCl titrated with NH₃)**:
- Before any titrant: pH from Kb of weak base.
- Buffer region: pH = pKa(NH₄⁺) + log([NH₃]/[NH₄⁺]) = 14 − pKb + log([B]/[BH⁺]).
- Half-equivalence point: pH = pKa(conjugate acid) = 14 − pKb(NH₃) = 14 − 4.74 = 9.26.
- Equivalence point: all base converted to BH⁺ salt; pH < 7 (cation hydrolyses to give H₃O⁺).
- Indicator choice: methyl orange or methyl red (colour change range acidic, 3.1–6.2) is appropriate; phenolphthalein is NOT appropriate.
- General rule: choose indicator whose pKaInd is within ~1 unit of the equivalence point pH.

**Weak acid–weak base titration**: equivalence point pH ≈ 7 + ½(pKa − pKb); the steep jump at equivalence is very small or absent; accurate titration is impractical; no single indicator reliably detects the equivalence point.

**Titration calculations (summary)**:
1. Initial pH: Ka/Kb ICE table.
2. Before equivalence (buffer region): Henderson-Hasselbalch with mole quantities.
3. Half-equivalence: pH = pKa or pH = 14 − pKb.
4. Equivalence: Kh = Kw/Ka (or Kw/Kb); treat as weak-base (or weak-acid) equilibrium.
5. After equivalence: diluted excess strong base (or acid).

## Mental Models
**The six-stage map model**: every weak acid–strong base titration has six distinct calculation stages (initial → early buffer → half-equivalence → late buffer → equivalence → post-equivalence). Each stage has its own dominant equation. The art is identifying which stage the question is asking about.

**The indicator pKa target model**: an indicator is itself a weak acid (HIn ⇌ H⁺ + In⁻, two colours). It changes colour when pH ≈ pKaInd ± 1. To avoid error, choose an indicator whose midpoint change occurs near the equivalence point pH, inside the steep portion of the titration curve.

**The "flattening by weakness" model**: the stronger the weak acid (larger Ka), the steeper the jump at equivalence. The weaker the acid (smaller Ka), the less distinct the equivalence point. This explains why weak-weak titrations are experimentally unreliable.

## Why Students Fail
Students confuse equivalence point and endpoint, then choose indicators randomly or use "universal indicators" (which show gradual colour change, useless for endpoint detection).

Students do not recognise that the half-equivalence point is the Ka measurement method — they treat it as just another calculation point rather than the diagnostic tool it is.

Students apply the wrong equation at the equivalence point: they use Henderson-Hasselbalch (buffer equation) at equivalence, where [A⁻] >> [HA], making H-H inapplicable; they should use the hydrolysis Kh approach instead.

Students claim all titrations have equivalence pH = 7 because "neutralisation gives a neutral salt."

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Neutralisation always gives pH 7 at the equivalence point." Probe: "What is the pH at the equivalence point when 0.1 M acetic acid is titrated with 0.1 M NaOH?" Characteristic phrase: "acid + base = neutral." Intervention: pH = 7 only when both acid and base are STRONG; the resulting salt CH₃COONa hydrolyses (CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻), giving pH > 7.
- **MC-2 (Type 3 — language contamination)**: "Endpoint and equivalence point are the same thing." Probe: "If you use an indicator that changes colour at pH 6, but the equivalence point is pH 8.8, what error occurs?" Characteristic phrase: "you stop at the endpoint because that's when the reaction is complete." Intervention: the equivalence point is determined by stoichiometry (moles acid = moles base); the endpoint is determined by indicator colour change; imprecise indicator selection causes a systematic titration error.
- **MC-3 (Type 5 — instruction-induced)**: "Any indicator can be used for any titration." Probe: "Why can't you use methyl orange (pKa ~3.5) for a weak acid–strong base titration?" Intervention: methyl orange changes colour around pH 3.5–4.5, which lies within the buffer region of a weak acid–strong base titration, NOT at the equivalence point (pH > 7); using it would give a false endpoint far before the actual equivalence point.
- **MC-4 (Type 1 — overgeneralization)**: "The half-equivalence point always has pH = 7." Probe: "What is the pH at the half-equivalence point when acetic acid (pKa = 4.75) is titrated with NaOH?" Characteristic phrase: "half-neutralised means half way to neutral." Intervention: at the half-equivalence point [A⁻] = [HA], so Henderson-Hasselbalch gives pH = pKa + log(1) = pKa = 4.75; pH = 7 only if pKa = 7, which is not true for most weak acids.

## Analogies
**Valid**: The indicator as a chemical pH-range detector — it is itself a weak acid with two colours; its working range (±1 around its pKa) must overlap the steep jump of the titration curve; mismatched indicator-to-curve is like using a thermometer that only reads 90–100°C to measure room temperature.

**Valid**: The titration curve as a geographic elevation profile — the buffer region is a plateau, the equivalence point is a cliff edge; you can read off the pKa of the acid from the elevation at the half-way point on the plateau.

**Anti-analogy**: Do NOT describe the equivalence point as "where the acid and base cancel each other out." This implies symmetry (pH = 7) and ignores the subsequent hydrolysis equilibrium.

## Demonstrations
**Live titration with phenolphthalein**: titrate acetic acid with NaOH; the indicator remains colourless through the buffer region and turns pink at equivalence (~pH 8.8). Students log the volume at colour change and calculate the concentration.

**Comparative indicator demonstration**: use two identical acetic acid samples, one with methyl orange and one with phenolphthalein. The methyl orange changes colour early (in the buffer region, incorrect endpoint); phenolphthalein changes at equivalence (correct endpoint). Directly demonstrates indicator selection importance.

**pH curve construction**: titrate 0.1 M CH₃COOH with 0.1 M NaOH in 1 mL increments, measuring pH after each addition. Plot the curve; identify buffer region (flat), half-equivalence (read off pKa from pH axis), equivalence point jump, and post-equivalence rise. The same data is used for Ka extraction and curve interpretation.

## Discovery Questions
1. "If you titrate a triprotic acid H₃PO₄ with NaOH, how many steep jumps would you expect on the titration curve? At how many half-equivalence points can you read Ka values?"
2. "A student mistakenly uses a very weak acid (pKa = 9.5) as the analyte. What would the titration curve look like, and why is endpoint detection difficult?"
3. "You have a solution of unknown composition — either acetic acid or hydrochloric acid, both at the same concentration. How could a titration curve (not just a single endpoint) tell you which it is?"

## Teaching Sequence
1. **Establish vocabulary**: equivalence point (stoichiometric, calculated from moles) vs endpoint (observed indicator colour change); titrate to match them.
2. **Strong-strong titration**: derive pH at 5 representative stages (initial, ¼ equivalence, equivalence, ¾ equivalence, excess); plot the curve; note the steep jump and pH = 7 at equivalence.
3. **Weak acid–strong base titration**: introduce the six stages; derive pH at each using the appropriate equation (Ka ICE, Henderson-Hasselbalch, half-equivalence pH = pKa, equivalence Kh, excess strong base); plot and compare to strong-strong.
4. **Indicator selection**: explain the indicator equilibrium; establish the pKaInd ± 1 colour-change window; match to the equivalence point pH.
5. **Strong acid–weak base titration**: parallel to step 3, but equivalence pH < 7; cation hydrolyses; acid-range indicator required.
6. **Ka determination from experiment**: show how the half-equivalence pH from a real titration curve gives an experimental pKa; connect to data analysis skills.
7. **Polyprotic acids (brief)**: n dissociable protons → n steep jumps at n equivalence points → n half-equivalence points for n Ka values.

## Tutor Actions
- **If student uses Henderson-Hasselbalch at the equivalence point**: identify the error — at equivalence [HA] ≈ 0 and the buffer region has ended; redirect to Kh = Kw/Ka and the hydrolysis approach.
- **If student says "use any indicator"**: ask "what is the indicator's pKa and what is the equivalence point pH?" — if they differ by more than ~1, the choice is wrong; build the rule from specific examples.
- **If student cannot calculate pH at the half-equivalence point**: return to Henderson-Hasselbalch; substitute [A⁻] = [HA] explicitly; the log term is log(1) = 0; pH = pKa follows immediately.
- **If student confuses the direction of equivalence point pH** (weak acid titration: pH > 7, weak base titration: pH < 7): reinforce with "which parent was weak?" — the weak acid leaves a basic salt; the weak base leaves an acidic salt (from the hydrolysis concept).
- **FRAGILE sign**: correct calculations but the student predicts phenolphthalein works for NH₃/HCl titration without checking equivalence pH first.

## Voice Teaching Notes
Long latency is expected on "which indicator to choose" — this is genuinely a multi-step judgement (equivalence pH → indicator pKa range matching → does the jump encompass the colour-change range). Give full wait time.

The word "neutralisation" is a loaded vocabulary trigger — it activates the "pH = 7" misconception immediately; counter-condition by always adding "which type of neutralisation?" or "which parent acid and base?" when the word appears.

Hesitation on "half-equivalence point" often means the student hasn't connected the phrase to Henderson-Hasselbalch with equal concentrations — this verbal link is the key to fix.

## Assessment Signals
- **Green**: correctly identifies equivalence point pH (> 7 for weak acid–strong base), selects appropriate indicator, calculates pH at any of the six stages, reads pKa from a titration curve at the half-equivalence point.
- **Amber**: correct numerical calculations but incorrect indicator choice; or correct indicator choice but cannot explain why; or predicts equivalence pH = 7 for weak acid–strong base.
- **Red**: cannot distinguish equivalence point from endpoint; applies Henderson-Hasselbalch at the equivalence point; selects methyl orange for a weak acid–strong base titration.
- **Probe**: "Sketch the titration curve for 25 mL of 0.1 M NH₃ titrated with 0.1 M HCl (Kb = 1.8 × 10⁻⁵). Label: (a) the approximate initial pH, (b) the pH at half-equivalence, (c) the approximate equivalence point pH, (d) a suitable indicator."

## Tutor Recovery Strategy
If the student cannot explain why equivalence pH ≠ 7 for weak acid–strong base: return directly to the hydrolysis concept (chem.equil.hydrolysis); the equivalence point leaves pure salt in solution; the acetate ion is basic (CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻); the pH is determined by Kh, not by the neutral-salt assumption. Do not reteach titration mechanics until the hydrolysis concept is confirmed INDEPENDENT of the titration context.

## Memory Hooks
- **Indicator selection rule**: "Match the indicator pKa to the equivalence pH ± 1."
- **Equivalence pH rule**: "Weak acid–strong base → equivalence pH > 7 (basic salt hydrolysis). Strong acid–weak base → equivalence pH < 7 (acidic salt hydrolysis). Strong + strong → pH = 7."
- **Half-equivalence trick**: "Half-neutralised → [A⁻] = [HA] → pH = pKa." (Direct Ka reading from the curve.)

## Transfer Connections
- **chem.anal.volumetric**: titration is the technique used in volumetric analysis; the concentration calculation (M₁V₁ = M₂V₂ at equivalence) is the analytical result from the understanding developed here.
- **chem.equil.hydrolysis**: the equivalence point pH in weak acid/base titrations is determined entirely by hydrolysis; both nodes must be understood to interpret titration curves correctly.
- **chem.equil.buffer**: the buffer region of the titration curve is simply a buffer solution in action; Henderson-Hasselbalch used in both contexts.

## Cross-Subject Connections
- **Biology (enzyme assays)**: enzymatic activity is often measured by titrating a substrate or product; the same weak acid–base titration principles apply to biological buffer pH control during assay.
- **Environmental science**: alkalinity titration of natural water samples (titrating HCO₃⁻ and CO₃²⁻ with HCl) uses the same weak acid equivalence-point principles.
- **Pharmacy**: acid-base titrations are used for drug purity assay (e.g., aspirin titration with NaOH); the choice of indicator depends on the drug's pKa.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.equil.titration`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.equil.titration` as of 2026-07-23.

## Curriculum Feedback
None. The KG correctly lists this node as unlocking chem.anal.volumetric; titration concepts are the theoretical foundation for volumetric analytical work.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
