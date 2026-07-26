# chem.alc.alcohols — Alcohols

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.alc.alcohols` |
| Domain | Alcohols |
| Requires | `chem.hal.sn2`, `chem.org.iupac` |
| Unlocks | `chem.alc.diols`, `chem.alc.ethers`, `chem.alc.phenols`, `chem.alc.protection`, `chem.carb.aldehydes`, `chem.nitro.amines` |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Ordinary alcohols (pKₐ~16–18) do NOT react appreciably with NaOH (conjugate acid water, pKₐ~15.7) — the equilibrium constant K=10^(ΔpKₐ) is near or below 1, unfavorable for ordinary alcohols, while phenol (pKₐ~10) reacts strongly (K≈10⁵) — so "alcohols are acidic, therefore they react with NaOH" is true only for the specific, much-more-acidic phenol case, never for ordinary aliphatic alcohols; PCC (mild, anhydrous) stops oxidation cleanly AT the aldehyde stage for primary alcohols (no water present to hydrate the aldehyde into the gem-diol needed for further oxidation), while aqueous KMnO₄ (strong, aqueous) oxidizes all the way to the carboxylic acid — "any oxidizing agent gives the same product" ignores this genuine mechanistic endpoint difference; and tertiary alcohols CANNOT be oxidized under mild conditions to a ketone (or anything) because oxidation requires removing the α-hydrogen from the carbinol carbon, and a tertiary carbinol carbon has NO hydrogen to remove — carbon count around the OH is irrelevant to oxidizability.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Computing the explicit equilibrium constant K=10^(pKₐ(water)−pKₐ(alcohol)) for ethanol+NaOH (K≈0.5, unfavorable) vs. phenol+NaOH (K≈10⁵, strongly favorable), making the acidity-magnitude distinction concrete.

**Representational**: A side-by-side oxidation pathway diagram: primary alcohol → (PCC, anhydrous) → aldehyde (stops here) vs. primary alcohol → (KMnO₄, aqueous) → aldehyde → (via gem-diol hydration) → carboxylic acid.

**Abstract**: The general principle that acid-base reactivity requires comparing actual pKₐ values, never a blanket "has OH, therefore acidic enough to react" assumption; the general principle that alcohol oxidizability depends on the presence of an α-hydrogen at the carbinol carbon, which tertiary alcohols structurally lack.

**Transfer**: Given an unfamiliar alcohol and a proposed base or oxidant, correctly predicting reactivity with NaOH from actual pKₐ comparison, correctly predicting the oxidation product (aldehyde vs. carboxylic acid vs. no reaction) from both the oxidant identity and the alcohol's substitution pattern.

## 3. Why Beginners Fail

Students apply a general "acids react with bases" rule from earlier acid-base study directly to alcohols and NaOH without checking whether the specific pKₐ values actually favor the reaction, missing that ordinary alcohols' pKₐ (~16–18) is close to or above water's conjugate-acid pKₐ (~15.7), making the equilibrium constant near or below 1 — only phenol's much lower pKₐ (~10) shifts the equilibrium decisively toward reaction; they treat "oxidizing agent" as a single undifferentiated category and assume any two oxidants listed for alcohols must give the same product, missing that PCC's anhydrous, mild conditions genuinely halt oxidation at the aldehyde (no water to form the gem-diol intermediate required for further oxidation), while aqueous KMnO₄ proceeds all the way to the carboxylic acid; and they assume a tertiary alcohol, having "more carbons around the OH," must be oxidizable to something under mild conditions, missing that oxidation specifically requires removing a hydrogen from the carbinol (C–OH) carbon itself, and a tertiary carbinol carbon is bonded to three carbon groups with no such hydrogen available.

## 4. Misconception Library

### MC-1: Alcohols react with NaOH because OH is acidic
- **Probe**: "Does ethanol (pKₐ 16) react with NaOH (conjugate acid water, pKₐ 15.7)?"
- **Characteristic phrase**: "alcohols are acids so they react with all bases" / "OH group reacts with NaOH."
- **Trigger (Type 1, overgeneralization)**: Students apply the "acids react with bases" rule from the acid-base chapter without checking whether the alcohol's pKₐ is actually below or above NaOH's conjugate acid's pKₐ — the equilibrium does NOT strongly favor product for ordinary alcohols.
- **Conflict evidence [P28]**: Comparing pKₐ of ethanol (16) and water (15.7); equilibrium: EtOH+NaOH⇌EtO⁻Na⁺+H₂O; K=10^(15.7−16)≈0.5 — not strongly favoured. Comparing phenol (pKₐ10): K=10^(15.7−10)≈10⁵ — strongly favoured. Only phenol reacts visibly with NaOH.
- **Bridge [P30]**: "Has an OH group" is not sufficient grounds to predict acid-base reactivity — the actual magnitude of the pKₐ relative to the base's conjugate acid determines whether the equilibrium favors reaction; a genuinely quantitative comparison, not a qualitative "has acidic-looking group" judgment, is required.
- **Replacement [P31]**: Always compare actual pKₐ values via K=10^(ΔpKₐ) before predicting whether an alcohol reacts appreciably with NaOH — never assume from OH-group presence alone.
- **Discrimination pairs [P33]**: Ethanol+NaOH (K≈0.5, no appreciable reaction) vs. phenol+NaOH (K≈10⁵, strong reaction) — same "has an OH" structural feature, opposite reactivity outcome.
- **S6 repair path**: Present the explicit K computation for both ethanol and phenol side by side, deriving the reactivity difference from the numbers rather than a qualitative impression.

### MC-2: PCC and KMnO₄ give the same product from a primary alcohol
- **Probe**: "You want to convert 1-butanol to butanal (the aldehyde). Do you use PCC or KMnO₄? What does the other reagent give?"
- **Characteristic phrase**: "both give the oxidised product" / "any oxidising agent does the job."
- **Trigger (Type 5, instruction-induced)**: Both reagents are listed as "oxidising agents for alcohols" in many textbooks without clearly distinguishing endpoint; students treat "oxidises" as synonymous across reagents.
- **Conflict evidence [P28]**: PCC is a mild, anhydrous, non-aqueous oxidant; the aldehyde product cannot be further oxidised (anhydrous conditions prevent hydration of aldehyde to gem-diol, the substrate for further oxidation). KMnO₄ in aqueous base is a strong oxidant that oxidises the intermediate aldehyde all the way to the carboxylic acid.
- **Bridge [P30]**: The oxidation of a primary alcohol to a carboxylic acid genuinely proceeds through the aldehyde as an intermediate, which must first be HYDRATED to a gem-diol before further oxidation can occur — PCC's anhydrous conditions structurally prevent this hydration step, cleanly halting the reaction at the aldehyde, while aqueous KMnO₄ provides the water necessary for the gem-diol pathway to proceed to the carboxylic acid.
- **Replacement [P31]**: Use PCC (anhydrous, mild) to stop cleanly at the aldehyde; use aqueous KMnO₄ (or similar aqueous strong oxidant) to proceed to the carboxylic acid — never assume "an oxidizing agent" is interchangeable with another for controlling reaction endpoint.
- **Discrimination pairs [P33]**: 1-butanol + PCC (anhydrous, → butanal only) vs. 1-butanol + aqueous KMnO₄ (→ butanoic acid, aldehyde over-oxidized).
- **S6 repair path**: Present the explicit gem-diol hydration mechanism, showing why anhydrous PCC structurally cannot proceed past the aldehyde.

### MC-3: Tertiary alcohols can be oxidised to ketones
- **Probe**: "Draw the product of oxidising 2-methyl-2-propanol (t-butanol) with Jones reagent."
- **Characteristic phrase**: "three carbon groups oxidised to give something" / "it must react somehow."
- **Trigger (Type 2, perceptual intuition)**: Students count the carbons around the OH-bearing carbon and reason "it's carbon-heavy, surely something can be oxidised," without checking for the specific bond (C–H at the carbinol carbon) that oxidation actually requires.
- **Conflict evidence [P28]**: Writing the carbon's bond situation for t-BuOH: C(CH₃)₃–OH; the central carbon has no H — oxidation of an alcohol requires removing the H from the C–OH bond (the α-hydrogen); without it, no mild oxidation can proceed. Harsh conditions (conc. H₂SO₄ at high temperature) would cause C–C cleavage, not simple oxidation.
- **Bridge [P30]**: Alcohol oxidation is mechanistically a hydride (or two-electron/proton) removal specifically from the carbinol carbon's C–H bond — it is not a generic "more carbons means more reactive" phenomenon; a carbon with zero hydrogens attached (fully substituted by three other carbon groups, as in a tertiary carbinol carbon) simply has no such bond available to remove.
- **Replacement [P31]**: Alcohol oxidizability under mild conditions requires an α-hydrogen at the carbinol carbon — primary and secondary alcohols have one, tertiary alcohols do not, and therefore cannot be oxidized to a carbonyl compound under normal conditions.
- **Discrimination pairs [P33]**: Secondary alcohol (has one α-H, oxidizes cleanly to a ketone) vs. tertiary alcohol (zero α-H, cannot be oxidized under mild conditions).
- **S6 repair path**: Draw the explicit bond structure at the carbinol carbon for a tertiary alcohol, having the student locate (and fail to find) an available α-hydrogen.

## 5. Explanation Library

**Primary explanation**: Alcohol acidity must be assessed by actual pKₐ comparison, not by the qualitative presence of an OH group — ordinary alcohols are far too weakly acidic (pKₐ~16–18) to react appreciably with NaOH, while phenol's much lower pKₐ (~10) makes its reaction with NaOH strongly favorable. Oxidation endpoint (aldehyde vs. carboxylic acid) is controlled by whether water is present to enable the gem-diol hydration pathway past the aldehyde — anhydrous PCC halts at the aldehyde, aqueous KMnO₄ proceeds to the acid.

**Secondary explanation (the α-hydrogen requirement)**: Mild alcohol oxidation is mechanistically a removal of the α-hydrogen from the carbinol (C–OH) carbon — primary alcohols (two α-H) oxidize to aldehydes (then acids), secondary alcohols (one α-H) oxidize to ketones, and tertiary alcohols (zero α-H) cannot be oxidized under mild conditions at all, regardless of how many carbon substituents surround the OH.

## 6. Analogy Library

- **Primary analogy**: A locked door requiring a specific key (the α-hydrogen) to open (oxidize) — having many decorative features around the door (carbon substituents) is irrelevant if the specific key slot (C–H bond at the carbinol carbon) simply isn't present.
- **Breaking point**: The locked-door analogy conveys the α-hydrogen requirement well but doesn't naturally capture the quantitative pKₐ comparison (MC-1) or the anhydrous-vs-aqueous oxidation endpoint distinction (MC-2) — those need the explicit K computation and the gem-diol mechanism.
- **Anti-analogy**: Do NOT say "alcohols are acidic, like all OH-containing compounds" as a blanket statement — this directly reinforces MC-1 by treating acidity as qualitative rather than quantitative.

## 7. Demonstration Library

- **Demonstration 1 (explicit pKₐ/K comparison)**: Compute K for ethanol+NaOH and phenol+NaOH side by side, deriving the reactivity contrast numerically.
- **Demonstration 2 (gem-diol hydration mechanism)**: Draw the aldehyde-to-gem-diol hydration step explicitly, showing why anhydrous PCC cannot proceed past the aldehyde while aqueous KMnO₄ can.
- **Demonstration 3 (carbinol-carbon bond structure comparison)**: Draw the explicit bond structure at the carbinol carbon for primary, secondary, and tertiary alcohols, locating the available α-hydrogens (or their absence) in each.

## 8. Discovery Lesson

**Opening**: "Does ethanol react with NaOH the same way phenol does?"

**Exploration**: Students compute the equilibrium constant for both reactions from pKₐ values, discovering ethanol's reaction is unfavorable while phenol's is strongly favorable.

**Synthesis**: Guide toward: acid-base reactivity requires comparing actual pKₐ magnitudes, not just checking for an OH group.

**Closure**: "Can t-butanol be oxidised to a ketone with Jones reagent?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit K computation for ethanol+NaOH vs. phenol+NaOH.
- **TA-2 (TELL)**: State the PCC-vs-KMnO₄ endpoint distinction explicitly, anchored to the gem-diol mechanism.
- **TA-3 (DO)**: Student predicts the oxidation product for an unfamiliar primary/secondary/tertiary alcohol under specified oxidant conditions.
- **TA-4 (TEST-THINKING)**: Present the t-butanol Jones-reagent probe and ask the student to justify "no reaction" from the α-hydrogen requirement.

## 10. Voice Teaching

Whenever alcohol acidity is discussed, narrate "compare actual pKₐ values — don't assume from the OH group alone." Whenever alcohol oxidation is discussed, state "check for an α-hydrogen at the carbinol carbon first" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly predict NaOH reactivity from actual pKₐ comparison, (b) correctly predict oxidation endpoint (aldehyde vs. acid) from oxidant identity, (c) correctly identify tertiary alcohols as non-oxidizable under mild conditions from the α-hydrogen requirement.

- **FA-1**: "Does ethanol react appreciably with NaOH? Justify with pKₐ values." — targets MC-1.
- **FA-2**: "Convert 1-butanol to butanal — which reagent, PCC or KMnO₄? What does the other give?" — targets MC-2.
- **FA-3**: "Can t-butanol be oxidised to a ketone? Explain using the carbinol carbon's bonding." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students transferring the general "acids react with bases" rule without checking specific pKₐ magnitudes.

**Delayed retrieval**: Re-probe MC-2's PCC-vs-KMnO₄ endpoint distinction and MC-3's α-hydrogen requirement before `chem.carb.aldehydes` requires fluent reasoning about carbonyl-compound formation from alcohols.

## 12. Recovery Notes

- **S3 (stuck)**: For the acidity overgeneralization, have the student compute the explicit K value before predicting reactivity, never relying on "has an OH" alone.
- **S4 (frustrated)**: Normalize — assuming all OH-containing compounds react identically with NaOH is genuinely common on first exposure, since the acid-base chapter emphasizes qualitative categories.
- **S6 (collision)**: Use the explicit gem-diol mechanism for MC-2; use the carbinol-carbon bond structure comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why tertiary alcohols cannot be oxidized under mild conditions.

## 13. Memory & Review

Tag as two conceptual-correction memories (quantitative pKₐ-based acidity reasoning; α-hydrogen requirement for oxidation) plus one procedural memory (PCC-vs-aqueous-KMnO₄ endpoint selection). Schedule a spaced check at ~1 week and again before `chem.carb.aldehydes`.

## 14. Transfer Map

Feeds directly into `chem.carb.aldehydes` (alcohol oxidation is the direct synthetic route to aldehydes), `chem.alc.diols`, `chem.alc.ethers`, `chem.alc.phenols`, `chem.alc.protection` (all build on alcohol reactivity patterns established here), and `chem.nitro.amines` (comparative acid-base reasoning recurs).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
