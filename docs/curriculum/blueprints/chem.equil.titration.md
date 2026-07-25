# chem.equil.titration — Acid-Base Titration Curves

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.equil.titration` |
| Domain | Equilibrium |
| Requires | `chem.equil.weak-acid` |
| Unlocks | `chem.anal.volumetric` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

The equivalence point of a titration has pH=7 ONLY when both acid and base are strong — for a weak acid/strong base titration, the resulting salt's conjugate base hydrolyzes (e.g., CH₃COO⁻+H₂O⇌CH₃COOH+OH⁻), genuinely producing pH>7 at equivalence; the equivalence point (defined by stoichiometry — moles acid=moles base) and the endpoint (defined by indicator color change) are DIFFERENT concepts, requiring an appropriately-matched indicator to minimize titration error — an indicator that changes color within a titration's steep, near-vertical pH-jump region (like methyl orange's ~3.5-4.5 range for a weak-acid/strong-base titration whose equivalence point is well above pH 7) will produce a false, premature endpoint; and the half-equivalence point of a weak-acid titration has pH=pKa specifically (from Henderson-Hasselbalch at [A⁻]=[HA]), NOT pH=7, since pH=7 would require pKa=7, which is not generally true for weak acids.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Titrating 0.1 M acetic acid with 0.1 M NaOH and discovering the equivalence-point pH is genuinely above 7, not exactly 7 as a strong-acid/strong-base titration would produce.

**Representational**: A titration curve diagram for weak-acid/strong-base, marking the half-equivalence point (pH=pKa) and equivalence point (pH>7) as two distinct, differently-located points on the curve.

**Abstract**: The general principle that equivalence-point pH depends on acid/base strength (strong-strong: pH=7; weak-strong or strong-weak: pH shifted by hydrolysis); the distinction between equivalence point (stoichiometric) and endpoint (indicator-observed), requiring careful indicator matching.

**Transfer**: Given an unfamiliar titration scenario (specifying acid/base strengths), correctly predicting the equivalence-point pH direction, correctly selecting an appropriately-matched indicator, and correctly computing the half-equivalence-point pH using pKa.

## 3. Why Beginners Fail

Students assume neutralization always produces pH=7 at the equivalence point (from the everyday "acid+base=neutral" intuition), missing that this holds only for strong-acid/strong-base titrations — weak-acid titrations produce a hydrolyzing conjugate base, genuinely shifting equivalence-point pH away from 7; they treat "endpoint" and "equivalence point" as interchangeable terms, missing that equivalence point is a stoichiometric fact (moles acid=moles base) while endpoint is an experimentally-observed indicator color change, which can genuinely occur at a different pH if the indicator is poorly matched to the specific titration; and they assume any indicator works for any titration, missing that an indicator's color-change pH range must fall within the titration's steep pH-jump region near the true equivalence point, or a significant, systematic titration error results.

## 4. Misconception Library

### MC-1: Neutralisation always gives pH 7 at the equivalence point
- **Probe**: "What is the pH at the equivalence point when 0.1 M acetic acid is titrated with 0.1 M NaOH?"
- **Characteristic phrase**: "acid + base = neutral."
- **Trigger (Type 5, instruction-induced)**: The everyday phrase "acid + base = neutral" and initial exposure to strong-acid/strong-base titrations (which genuinely do produce pH=7) lead students to generalize this specific case into a universal rule.
- **Conflict evidence [P28]**: pH=7 at equivalence occurs ONLY when both acid and base are STRONG; for acetic acid titrated with NaOH, the resulting salt CH₃COONa contains the conjugate base CH₃COO⁻, which genuinely hydrolyzes in water (CH₃COO⁻+H₂O⇌CH₃COOH+OH⁻), producing excess OH⁻ and giving a true equivalence-point pH GREATER than 7, not exactly 7.
- **Bridge [P30]**: "Neutralization" describes the stoichiometric reaction of acid with base (moles matching exactly), but the resulting SOLUTION's pH depends on what species remain after that reaction — a weak acid's conjugate base is itself a genuine (weak) base that reacts with water, shifting the solution's pH away from neutral even though the acid-base stoichiometry has been exactly satisfied.
- **Replacement [P31]**: Equivalence-point pH=7 only for strong-acid/strong-base titrations; weak-acid/strong-base titrations produce pH>7 (basic conjugate-base hydrolysis); weak-base/strong-acid titrations produce pH<7 (acidic conjugate-acid hydrolysis) — always check acid/base strength before assuming pH=7.
- **Discrimination pairs [P33]**: HCl+NaOH (both strong, equivalence pH=7) vs. CH₃COOH+NaOH (weak acid, strong base, equivalence pH>7, due to CH₃COO⁻ hydrolysis).
- **S6 repair path**: Present the explicit CH₃COO⁻ hydrolysis equilibrium, connecting the genuine production of OH⁻ directly to the above-7 equivalence-point pH.

### MC-2: Endpoint and equivalence point are the same thing
- **Probe**: "If you use an indicator that changes colour at pH 6, but the equivalence point is pH 8.8, what error occurs?"
- **Characteristic phrase**: "you stop at the endpoint because that's when the reaction is complete."
- **Trigger (Type 3, language contamination)**: Both terms describe "the point where you stop the titration" in everyday usage, obscuring the genuine conceptual distinction between a stoichiometric fact and an experimental observation.
- **Conflict evidence [P28]**: The equivalence point is determined purely by STOICHIOMETRY (moles acid=moles base, a mathematical/chemical fact independent of any indicator); the endpoint is determined by INDICATOR COLOR CHANGE (an experimental observation, dependent on the specific indicator chosen) — with a mismatched indicator (changing color at pH 6, while the true equivalence point is pH 8.8), the titration would be stopped SIGNIFICANTLY BEFORE the true equivalence point is reached, producing a systematic, quantifiable titration error (under-titrating, giving an inaccurate result).
- **Bridge [P30]**: Equivalence point is a fixed, calculable target determined by the chemistry itself; endpoint is the practical, experimentally-observable signal used to APPROXIMATE that target — a well-chosen indicator's endpoint closely coincides with the true equivalence point, but a poorly-chosen indicator's endpoint can diverge significantly, introducing real experimental error.
- **Replacement [P31]**: Equivalence point (stoichiometric, calculated) and endpoint (indicator-observed, experimental) are genuinely distinct concepts — indicator selection must ensure the endpoint closely approximates the true equivalence point to minimize titration error.
- **Discrimination pairs [P33]**: True equivalence point (pH 8.8, stoichiometric fact) vs. observed endpoint with a mismatched indicator (pH 6, where the color actually changes) — a significant, real discrepancy causing titration error.
- **S6 repair path**: Present the explicit pH gap (6 vs. 8.8) and quantify the resulting volume/concentration error this mismatch would introduce.

### MC-3: Any indicator can be used for any titration
- **Probe**: "Why can't you use methyl orange (pKa ~3.5) for a weak acid–strong base titration?"
- **Trigger (Type 5, instruction-induced)**: Without the specific pH-range-matching requirement being emphasized, students may assume any color-changing indicator serves the general purpose of "showing when the titration is done," regardless of whether its specific pH range aligns with the titration's actual equivalence-point region.
- **Conflict evidence [P28]**: Methyl orange changes color specifically around pH 3.5-4.5, which for a weak-acid/strong-base titration lies WITHIN the buffer region of the titration curve (a relatively flat, gradually-changing pH zone), NOT anywhere near the true equivalence point (which is above pH 7 for this titration type); using methyl orange here would produce a false, drastically premature endpoint, occurring well before the actual equivalence point is reached, causing substantial titration error.
- **Bridge [P30]**: A titration curve has a steep, near-vertical pH-jump specifically AT the equivalence point, flanked by more gradual, buffer-region pH changes elsewhere — only an indicator whose color-change range falls WITHIN this steep jump region will produce an endpoint that accurately approximates the true equivalence point; an indicator changing color in the gradual buffer region (far from the equivalence point) produces a fundamentally unreliable endpoint.
- **Replacement [P31]**: Indicator selection requires matching the indicator's specific color-change pH range to the titration's steep pH-jump region near the true equivalence point — never assume any indicator works universally, since a mismatched indicator (like methyl orange for a weak-acid/strong-base titration) produces significant, systematic error.
- **Discrimination pairs [P33]**: Methyl orange (pH 3.5-4.5, appropriate for strong-acid titrations with low equivalence-point pH) vs. phenolphthalein (pH 8.2-10, appropriate for weak-acid/strong-base titrations with equivalence-point pH above 7).
- **S6 repair path**: Present the full titration curve with methyl orange's color-change range marked explicitly within the flat buffer region, far from the actual steep equivalence-point jump.

### MC-4: The half-equivalence point always has pH = 7
- **Probe**: "What is the pH at the half-equivalence point when acetic acid (pKa = 4.75) is titrated with NaOH?"
- **Characteristic phrase**: "half-neutralised means half way to neutral."
- **Trigger (Type 1, overgeneralization)**: The phrase "half-equivalence" superficially suggests "halfway to neutral (pH 7)," an intuitive but incorrect linguistic association rather than the correct Henderson-Hasselbalch-derived relationship.
- **Conflict evidence [P28]**: At the half-equivalence point, exactly half the weak acid has been converted to its conjugate base, giving [A⁻]=[HA] — substituting into the Henderson-Hasselbalch equation, pH=pKa+log([A⁻]/[HA])=pKa+log(1)=pKa+0=pKa; for acetic acid (pKa=4.75), the half-equivalence-point pH is genuinely 4.75, not 7 — pH would only equal 7 at half-equivalence if the specific acid's pKa happened to equal 7, which is not true for most weak acids.
- **Bridge [P30]**: "Half-equivalence" describes the STOICHIOMETRIC fraction of acid converted (exactly half), a completely separate fact from the resulting solution's pH value, which is determined by the Henderson-Hasselbalch relationship and the acid's specific pKa — there's no inherent reason "half converted" should correspond to "pH 7."
- **Replacement [P31]**: At the half-equivalence point, pH=pKa (from Henderson-Hasselbalch at [A⁻]=[HA]) — this equals 7 only if the acid's specific pKa happens to be 7, which is the exception, not the rule.
- **Discrimination pairs [P33]**: Half-equivalence point pH (=pKa, e.g., 4.75 for acetic acid) vs. the naive "halfway to neutral" assumption (pH=7) — genuinely different values for most weak acids.
- **S6 repair path**: Derive the Henderson-Hasselbalch result explicitly at [A⁻]=[HA], showing pH=pKa directly, disconnected from any "halfway to 7" reasoning.

## 5. Explanation Library

**Primary explanation**: Equivalence-point pH depends on the strengths of the acid and base being titrated — pH=7 occurs only for strong-acid/strong-base titrations; weak-acid titrations produce a hydrolyzing conjugate base, shifting equivalence-point pH above 7 (and analogously below 7 for weak-base titrations). The equivalence point (a stoichiometric fact) and the endpoint (an indicator-observed color change) are distinct concepts, and accurate titration requires selecting an indicator whose color-change pH range falls within the titration's steep pH-jump region near the true equivalence point.

**Secondary explanation (half-equivalence framing)**: At the half-equivalence point of a weak-acid titration, exactly half the acid has converted to its conjugate base ([A⁻]=[HA]), and Henderson-Hasselbalch directly gives pH=pKa — a value determined by the specific acid's properties, not a universal pH=7, since "halfway converted" and "pH 7" are unrelated facts unless the acid's pKa happens to coincidentally equal 7.

## 6. Analogy Library

- **Primary analogy**: A finish line marked precisely on a racetrack (the true equivalence point, a fixed stoichiometric fact) versus a spectator's shout announcing "they've finished!" at whatever moment the spectator happens to notice (the endpoint, dependent on the specific observer/indicator) — a spectator standing far from the actual finish line will announce a "finish" at the wrong moment, just as a poorly-matched indicator signals an endpoint far from the true equivalence point.
- **Breaking point**: The finish-line-vs-spectator analogy conveys the equivalence-point-vs-endpoint distinction well but doesn't naturally capture the weak-acid hydrolysis mechanism or the Henderson-Hasselbalch half-equivalence relationship — those need the explicit chemical-equilibrium arguments.
- **Anti-analogy**: Do NOT say "the equivalence point is always pH 7" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (weak-acid equivalence-point pH computation)**: Compute the actual equivalence-point pH for acetic acid/NaOH explicitly, tracing the hydrolysis mechanism producing pH>7.
- **Demonstration 2 (indicator-mismatch error visualization)**: Present the full titration curve with methyl orange's color-change range marked in the flat buffer region, contrasted with phenolphthalein's appropriately-matched range near the true equivalence point.

## 8. Discovery Lesson

**Opening**: "If you titrate a strong acid with a strong base, the equivalence point is pH 7. Does the same hold if you titrate a weak acid with a strong base instead?"

**Exploration**: Students trace the conjugate base's hydrolysis reaction for a weak-acid titration, discovering it genuinely shifts equivalence-point pH above 7.

**Synthesis**: Guide toward: equivalence-point pH depends on whether the resulting salt's ions hydrolyze, not on a universal "acid+base=neutral" rule.

**Closure**: "Why can't methyl orange be used for a weak acid–strong base titration?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the CH₃COO⁻ hydrolysis mechanism explicitly, connecting it to the above-7 equivalence-point pH.
- **TA-2 (TELL)**: State the equivalence-point-vs-endpoint distinction explicitly, immediately followed by the pH-gap error quantification.
- **TA-3 (DO)**: Student selects an appropriately-matched indicator for a given titration type, justifying the choice using the equivalence-point pH.
- **TA-4 (TEST-THINKING)**: Present MC-4's half-equivalence probe and ask the student to derive the pH=pKa result from Henderson-Hasselbalch directly.

## 10. Voice Teaching

Whenever equivalence-point pH is discussed, ask "are both the acid and base strong?" before assuming pH=7. Whenever indicator selection is discussed, always check the indicator's color-change range against the specific titration's equivalence-point pH before accepting it as appropriate.

## 11. Assessment

**Mastery gate**: Student can (a) correctly predict equivalence-point pH direction based on acid/base strength, (b) correctly distinguish equivalence point from endpoint and select an appropriately-matched indicator, (c) correctly compute half-equivalence-point pH as pKa using Henderson-Hasselbalch.

- **FA-1**: "What is the pH at the equivalence point when 0.1 M acetic acid is titrated with 0.1 M NaOH?" — targets MC-1.
- **FA-2**: "If an indicator changes colour at pH 6, but the equivalence point is pH 8.8, what error occurs?" — targets MC-2.
- **FA-3**: "Why can't you use methyl orange for a weak acid–strong base titration?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've only worked strong-acid/strong-base titration examples so far.

**Delayed retrieval**: Re-probe MC-1's hydrolysis-driven pH shift and MC-3's indicator-matching principle before `chem.anal.volumetric` requires fluent, correct titration analysis across diverse acid-base combinations.

## 12. Recovery Notes

- **S3 (stuck)**: For the pH=7 confusion, present the explicit conjugate-base hydrolysis equilibrium and have the student trace where the extra OH⁻ comes from.
- **S4 (frustrated)**: Normalize — "acid+base=neutral" is a genuinely common, reasonable everyday intuition that the strong-strong titration case happens to confirm, making the weak-acid exception a legitimate surprise.
- **S6 (collision)**: Use the explicit pH-gap error quantification for MC-2; use the full titration-curve indicator-range visualization for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why the half-equivalence point's pH equals pKa rather than 7.

## 13. Memory & Review

Tag as three conceptual-correction memories (equivalence-point pH depends on acid/base strength; equivalence point vs. endpoint distinction; half-equivalence pH=pKa). Schedule a spaced check at ~1 week and again before `chem.anal.volumetric`.

## 14. Transfer Map

Feeds directly into `chem.anal.volumetric` (quantitative volumetric analysis directly applies titration curve and indicator-selection reasoning established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
