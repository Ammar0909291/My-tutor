# chem.sol.types — Types of Solutions

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.sol.types` |
| Domain | Solutions |
| Requires | `chem.found.pure-substances`, `chem.found.states-of-matter` |
| Unlocks | `chem.sol.solubility`, `chem.sol.vapour-pressure` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

A solution is a homogeneous mixture of two or more substances (solute dissolved in solvent) where composition and properties are uniform throughout at the molecular level. Solutions can be classified by the physical state of solute and solvent (gas-in-gas, liquid-in-liquid, solid-in-liquid, etc.), by amount of solute relative to the maximum that can dissolve (unsaturated, saturated, supersaturated), and by particle-level miscibility rules ("like dissolves like" — polarity matching between solute and solvent governs whether a homogeneous solution forms at all).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Dissolve salt in water and see it "disappear" (homogeneous) vs. mixing oil and water and watching them stay separated into two visible layers (heterogeneous, not a solution).

**Representational**: A particle-level diagram showing solute particles fully surrounded and separated by solvent particles (true solution) vs. clumped/separated solute (not dissolved — a mixture, not a solution).

**Abstract**: The general rule "like dissolves like" — polar solvents (water) dissolve polar/ionic solutes; non-polar solvents (hexane) dissolve non-polar solutes — derived from intermolecular force compatibility, not the physical state of either substance.

**Transfer**: Predicting whether a given solute-solvent pair will form a solution (e.g., will iodine dissolve in water vs. in hexane?) using polarity reasoning alone, without having seen that specific pair before.

## 3. Why Beginners Fail

Students default to classifying "solution vs. not a solution" by physical state matching (liquid + liquid = automatically a solution) rather than by polarity/intermolecular compatibility, and separately assume "solubility" is a fixed yes/no property of a substance rather than a substance-pair-and-condition-dependent property (a solute can be highly soluble in one solvent and insoluble in another).

## 4. Misconception Library

### MC-1: An "ideal" or "pure" solution is more soluble than an "impure" one
- **Probe**: "What makes a solution ideal — does it mean it dissolves better?"
- **Characteristic phrase**: "Ideal solution means it dissolves perfectly, more than a normal one."
- **Trigger**: Everyday use of "ideal" as a superlative ("perfect," "best") collides with the technical thermodynamic meaning (a solution whose solute-solvent interactions are energetically identical to solute-solute and solvent-solvent interactions, so mixing is governed purely by entropy — this describes a specific energetic condition, not a superlative amount of dissolving).
- **Conflict evidence [P28]**: Some real "ideal" solution pairs (e.g., benzene and toluene) are only moderately soluble in each other compared to other non-ideal but highly soluble pairs (e.g., HCl gas in water, which is strongly non-ideal due to ionization, yet extremely soluble).
- **Bridge [P30]**: "Ideal" in chemistry is a technical term about the *nature* of intermolecular interactions during mixing, not a rating of dissolving power.
- **Replacement [P31]**: Ideal solutions follow Raoult's law because solute-solvent forces equal solute-solute and solvent-solvent forces; this is a mixing-energetics classification, separate from how much solute can dissolve.
- **Discrimination pairs [P33]**: Ideal-but-moderate-solubility pairs (benzene/toluene) vs. non-ideal-but-high-solubility pairs (HCl/water).
- **S6 repair path**: Present the benzene/toluene vs. HCl/water contrast directly to break the amount-vs-nature conflation.

### MC-2: Non-polar substances can never dissolve in polar solvents (or vice versa) — solubility is absolute
- **Probe**: "Can a non-polar substance dissolve in water at all?"
- **Characteristic phrase**: "Oil never dissolves in water, period."
- **Trigger**: Overgeneralizing the qualitative "like dissolves like" heuristic into an absolute binary rule, when solubility is actually a continuous, quantitative, condition-dependent property (measured in g/100mL, temperature-dependent) — even "insoluble" pairs have some tiny, nonzero equilibrium solubility.
- **Conflict evidence [P28]**: Oxygen (non-polar) does dissolve in water (polar) — not much (~8 mg/L at room temperature), but enough to sustain all aquatic life; if the rule were absolute, fish couldn't breathe.
- **Bridge [P30]**: "Like dissolves like" predicts *relative* solubility (more vs. less), not a strict yes/no cutoff — every solute has some finite solubility in every solvent, even if extremely small.
- **Replacement [P31]**: Solubility exists on a continuous scale from "negligible" to "fully miscible"; polarity matching predicts where on that scale a pair falls, not whether dissolving happens at all.
- **Discrimination pairs [P33]**: O₂ in water (small but life-critical solubility) vs. NaCl in water (high solubility) vs. wax in water (negligible but technically nonzero solubility).
- **S6 repair path**: Use dissolved O₂ in water as the concrete, high-stakes counterexample (without it, no fish).

### MC-3: The physical state of the solution must match the physical state of the solute
- **Probe**: "If you dissolve a solid in a liquid, what state is the resulting solution?"
- **Characteristic phrase**: "Dissolving a solid gives a solid solution; dissolving a gas gives a gas solution."
- **Trigger**: Overgeneralizing "the solution keeps the solute's original state" from limited classroom examples (usually solid-in-liquid, so the answer 'liquid' happens to match the *solvent's* state, not the solute's — students may misattribute which component determined the outcome).
- **Conflict evidence [P28]**: Air is a gas-in-gas solution (state matches both); brass is a solid-in-solid solution of copper and zinc (a solid solute — zinc — dissolved in a solid solvent — copper — giving a solid result, but seawater is liquid-in-liquid, and soda water is gas-in-liquid giving a *liquid* result, not a gas).
- **Bridge [P30]**: The resulting solution's physical state is determined by the *solvent's* state (the majority component), not the solute's original state.
- **Replacement [P31]**: Classify solutions by the (solute state, solvent state) pair; the overall solution's observable state equals the solvent's state.
- **Discrimination pairs [P33]**: Soda water (gas solute, liquid solvent → liquid solution) vs. air (gas solute, gas solvent → gas solution) — same solute state, different outcome, because solvent state differs.
- **S6 repair path**: Build the full 3×3 solute-state × solvent-state grid with a real example in each populated cell, and highlight that the answer column is always the solvent's row.

## 5. Explanation Library

**Primary explanation**: A solution is a homogeneous mixture where solute particles are dispersed at the molecular/ionic level throughout the solvent. Whether a given solute-solvent pair forms a true solution (vs. staying visibly separate) depends primarily on intermolecular force compatibility ("like dissolves like") — polar/ionic solutes dissolve well in polar solvents (water), non-polar solutes dissolve well in non-polar solvents (hexane, oil), because similar intermolecular forces let new solute-solvent interactions replace the old solute-solute and solvent-solvent interactions without a large energy penalty.

**Secondary explanation (classification framing)**: Solutions are classified along two independent axes — physical state (9 possible solute-solvent state combinations) and saturation level (unsaturated: more solute could still dissolve; saturated: at the dissolving limit for that temperature; supersaturated: an unstable state holding more dissolved solute than the equilibrium limit, achieved by careful cooling or evaporation).

## 6. Analogy Library

- **Primary analogy**: A crowded, polite party (polar solvent) where guests happily mingle if they share similar interests (polarity) — put someone with totally different interests (non-polar solute) into the mix and they'll clump alone in a corner rather than blend in evenly.
- **Breaking point**: This analogy suggests solubility is entirely social/binary; it doesn't capture that even "clumped in the corner" guests exchange some conversation (nonzero solubility) or that temperature/pressure can shift the mixing.
- **Anti-analogy**: Do NOT say "solids only dissolve into solids, liquids into liquids" — this directly reinforces MC-3.

## 7. Demonstration Library

- **Demonstration 1 (like dissolves like)**: Attempt to dissolve iodine crystals in water (poor solubility, faint color) vs. in hexane or rubbing alcohol (much stronger color, dissolves readily) — same solute, different solvent, dramatically different outcome.
- **Demonstration 2 (dissolved gas)**: Open a bottle of carbonated water and show fizzing (dissolved CO₂ gas leaving a liquid solution) as direct evidence that gas-in-liquid solutions exist and behave as liquids until disturbed.

## 8. Discovery Lesson

**Opening**: "I have iodine crystals here. Watch what happens when I try to dissolve them in water versus in this clear alcohol." (Demonstration 1 live or via video.)

**Exploration**: Students record color intensity in each solvent, then are given a table of solvent polarities and asked to predict which solvent would dissolve a given new solute (e.g., table salt, wax, sugar) before testing.

**Synthesis**: Guide toward: solubility depends on the *match* between solute and solvent character (polarity), not on either substance alone.

**Closure**: "So is it accurate to say 'oil and water don't mix' as an absolute law, or is there a more precise way to say it now?" (Leads to MC-2's continuous-scale correction.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Live or video demonstration of iodine in water vs. iodine in a non-polar solvent.
- **TA-2 (TELL)**: State "like dissolves like" as a polarity-matching heuristic, immediately followed by the continuous-scale caveat.
- **TA-3 (DO)**: Student fills in the 3×3 solute-state × solvent-state classification grid with real examples.
- **TA-4 (TEST-THINKING)**: Present the O₂-in-water fact and ask the student to reconcile it with "oil and water never mix."

## 10. Voice Teaching

Keep the register concrete and demonstration-anchored; when introducing "ideal solution," explicitly flag the term as a technical false-friend before defining it, to preempt MC-1 rather than repair it after the fact.

## 11. Assessment

**Mastery gate**: Student can (a) predict, using polarity, whether an unfamiliar solute-solvent pair will dissolve well, (b) explain why solubility is a continuous property with real counterexamples, (c) correctly determine the physical state of a solution from the solvent's state.

- **FA-1**: "Will naphthalene (non-polar) dissolve better in water or in hexane? Why?" — targets application of "like dissolves like."
- **FA-2**: "Explain how fish can survive underwater if oxygen 'doesn't dissolve' in water." — targets MC-2.
- **FA-3**: "What is the physical state of soda water, and why?" — targets MC-3.

**Confidence calibration**: Predict overconfidence on FA-3 among students who've only seen solid-in-liquid examples in prior science classes.

**Delayed retrieval**: Re-probe MC-2's "absolute solubility" framing before `chem.sol.solubility` introduces quantitative Ksp/solubility-curve content, since that topic requires the continuous-scale correction already in place.

## 12. Recovery Notes

- **S3 (stuck)**: Return to the live iodine demonstration and ask the student to describe only what they observe, not what they expect.
- **S4 (frustrated)**: Normalize the "ideal = best" confusion — it's a genuine terminology trap that catches most students on first exposure.
- **S6 (collision)**: Use the O₂-in-water fact as the direct collision artifact for MC-2.
- **S9 (post-repair check)**: Ask the student to state, unprompted, why "never dissolves" is imprecise language.

## 13. Memory & Review

Tag as a conceptual-correction memory (continuous solubility) plus a classification-scheme memory (state grid, saturation levels). Schedule a spaced check at ~1 week and again before `chem.sol.solubility` is introduced.

## 14. Transfer Map

Feeds into `chem.sol.solubility` (quantitative solubility curves build directly on the continuous-scale correction from MC-2) and `chem.sol.vapour-pressure` (Raoult's law and ideal-solution behavior build directly on MC-1's corrected technical definition of "ideal").

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
