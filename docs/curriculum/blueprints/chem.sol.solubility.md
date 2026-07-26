# chem.sol.solubility — Solubility and Henry's Law

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.sol.solubility` |
| Domain | Solutions |
| Requires | `chem.sol.types`, `chem.state.gas-laws` |
| Unlocks | (none) |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

Gas solubility DECREASES with increasing temperature (the opposite of most solid solutes), because gas dissolution is EXOTHERMIC — Le Chatelier's principle then dictates that raising temperature shifts the equilibrium toward the endothermic direction (gas leaving solution), explaining why warm soda goes flat faster and warm rivers hold less dissolved O₂; Henry's law applies ONLY to GASES dissolved in liquids, never to solid solutes — pressure has negligible effect on solid solubility because solids are nearly incompressible with no comparable phase-volume change, while gas solubility responds to pressure because compressing the gas phase forces more molecules into solution; and non-reactive, non-polar gases (N₂, O₂, noble gases) are NOT literally insoluble in water — they have small but genuinely non-zero solubility (via weak London dispersion interactions), with O₂≈8mg/L and N₂≈14mg/L at 25°C/1atm being fully sufficient to sustain aquatic life and to cause decompression sickness ("the bends") from dissolved N₂ — "insoluble" in casual usage means very low solubility, never literally zero.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing warm vs. cold soda's CO₂ retention explicitly, tracing the exothermic-dissolution/Le Chatelier reasoning to the observed "warm soda goes flat faster" phenomenon.

**Representational**: A two-panel diagram: pressurizing a gas-liquid system (Henry's law, gas forced into solution) vs. pressurizing a solid-liquid system (negligible effect, solid nearly incompressible), visually contrasting the applicability boundary.

**Abstract**: The general principle that gas dissolution being exothermic (unlike many solid dissolutions) reverses the expected temperature-solubility relationship via Le Chatelier's principle; the general scope restriction of Henry's law to gas solutes specifically; the general principle that "insoluble" is a practical, not absolute, description.

**Transfer**: Given an unfamiliar gas-liquid or solid-liquid system, correctly predicting the temperature-dependence direction of gas solubility from exothermicity, correctly restricting Henry's law application to gas solutes only, and correctly recognizing that even non-reactive gases have measurable, non-zero solubility.

## 3. Why Beginners Fail

Students learn that dissolving many solids is endothermic (heat promotes dissolving, so warmer water dissolves more solid solute) and extend this pattern to gases without recognizing that gas dissolution is typically EXOTHERMIC — the opposite thermal relationship — missing that Le Chatelier's principle, applied correctly to an exothermic process, predicts DECREASING gas solubility with increasing temperature, the reverse of the solid-solubility pattern they've generalized from; students see Henry's law framed as a general "pressure increases solubility" rule and apply it to any solute regardless of phase, missing that Henry's law's mechanism specifically depends on compressing a GAS phase to force more gas molecules into solution — solids, being nearly incompressible, have no comparable phase-volume response to pressure, so pressure has negligible effect on solid solubility; and students reason that "dissolving requires attraction" and conclude that non-reactive, non-polar gases (which seemingly lack any strong attraction to polar water) must be essentially insoluble, missing that even weak London dispersion interactions between gas molecules and water provide small but genuinely measurable, biologically and physically significant solubility — "insoluble" as commonly used describes very low solubility, not a literal zero.

## 4. Misconception Library

### MC-1: Gas solubility increases with temperature
- **Probe**: "Why does a warm soda go flat faster than a cold one? Is dissolved CO₂ more or less soluble at higher temperature?"
- **Characteristic phrase**: "Hot water dissolves things better, so more CO₂ would dissolve at higher temperatures."
- **Trigger (Type 1, overgeneralization)**: Students learn that dissolving many solids is endothermic → more heat → more dissolving → higher solubility. They extend this to gases without recognising that dissolution of most gases is exothermic.
- **Conflict evidence [P28]**: Gas dissolution is exothermic (gas gives up energy when entering the liquid). Le Chatelier's principle: raising T shifts the endothermic direction → gas leaves solution. Result: gas solubility decreases with increasing T. Warm soda goes flat (CO₂ solubility is lower at warm T); fish die in warm polluted rivers (O₂ solubility drops).
- **Bridge [P30]**: The direction of the temperature-solubility relationship is not a fixed, universal pattern — it depends specifically on whether the dissolution process is exothermic or endothermic for that particular solute, and applying Le Chatelier's principle correctly to each case; since gas dissolution is generally exothermic (unlike many common solid dissolutions, which are endothermic), the temperature-solubility relationship for gases genuinely reverses direction compared to the solid-solubility pattern students learn first.
- **Replacement [P31]**: Gas solubility DECREASES with increasing temperature (exothermic dissolution, Le Chatelier's principle) — never assume the solid-solubility "hotter=more soluble" pattern applies to gases.
- **Discrimination pairs [P33]**: Cold soda (higher CO₂ solubility, retains carbonation) vs. warm soda (lower CO₂ solubility, goes flat faster) — temperature increase reduces gas solubility, opposite the typical solid pattern.
- **S6 repair path**: Present the explicit exothermic-dissolution/Le Chatelier argument, connecting it directly to the observable warm-soda-goes-flat phenomenon.

### MC-2: Henry's law applies to solid solutes
- **Probe**: "If you increase the pressure on a saturated NaCl solution, does more NaCl dissolve?"
- **Characteristic phrase**: "Higher pressure makes everything more soluble, so increasing pressure on the NaCl solution should dissolve more salt."
- **Trigger (Type 1, overgeneralization)**: Students see Henry's law as a general "pressure increases solubility" rule and apply it to any solute.
- **Conflict evidence [P28]**: Henry's law applies ONLY to gases dissolved in liquids. Pressure has negligible effect on solid solubility because solids are nearly incompressible — there is no phase-volume change comparable to gas compression. NaCl solubility is essentially unchanged by modest pressures. The driving force for increased gas solubility is the compression of the gas phase forcing more molecules into the liquid; no such compression occurs for solid or liquid solutes.
- **Bridge [P30]**: Henry's law's pressure-solubility relationship is mechanistically tied to a specific physical process — compressing a GAS PHASE, which reduces its volume and forces more gas molecules into the adjacent liquid to maintain equilibrium; a solid solute has no analogous compressible phase whose volume responds meaningfully to modest pressure changes, so the entire mechanism underlying Henry's law simply does not apply to solid dissolution.
- **Replacement [P31]**: Henry's law applies specifically and only to gas solutes dissolved in liquids — pressure has negligible effect on solid (or liquid) solute solubility, since there is no compressible gas phase to force additional dissolution.
- **Discrimination pairs [P33]**: Dissolved CO₂ under increased pressure (Henry's law applies, more gas dissolves) vs. dissolved NaCl under increased pressure (Henry's law does not apply, negligible change in solubility).
- **S6 repair path**: Present the explicit gas-phase-compression mechanism, contrasted with a solid's lack of any comparable compressible phase.

### MC-3: Non-reactive gases are insoluble in water
- **Probe**: "Is there any dissolved oxygen in lake water? How do fish breathe?"
- **Characteristic phrase**: "Oxygen doesn't react with water and it's non-polar, so it won't dissolve."
- **Trigger (Type 2, perceptual intuition)**: Students think "dissolving requires attraction" and assume non-reactive, non-polar gases (N₂, O₂, noble gases) cannot dissolve in polar water at all.
- **Conflict evidence [P28]**: Even non-reactive gases have small but non-zero solubility (weak London dispersion with water molecules). O₂≈8mg/L in water at 25°C, 1atm — enough to sustain aquatic life. N₂≈14mg/L. The bends occurs because of dissolved N₂ in blood — a non-reactive gas with measurable Henry's law solubility. "Insoluble" means very low solubility, not zero.
- **Bridge [P30]**: "Dissolving requires attraction" is technically true, but the required attraction can be as weak as London dispersion forces (present between ANY two molecules, including non-polar ones and water) — these weak forces are enough to give a small, genuinely non-zero solubility, even without any strong polar or reactive interaction; "insoluble" as commonly used in everyday and even scientific casual speech is a practical description of very low solubility, not a literal claim of zero dissolved molecules.
- **Replacement [P31]**: Non-reactive, non-polar gases have small but genuinely non-zero, biologically/physically significant solubility in water via weak London dispersion interactions — never treat "insoluble" as literally zero solubility.
- **Discrimination pairs [P33]**: O₂ in water (≈8mg/L, small but sufficient to sustain fish) vs. a hypothetical truly zero-solubility gas (would make aquatic life and the bends both impossible) — the small, non-zero value is physically and biologically significant.
- **S6 repair path**: Present the explicit O₂/N₂ solubility values and their real-world consequences (aquatic respiration, the bends), reinforcing that "insoluble" describes magnitude, not absence.

## 5. Explanation Library

**Primary explanation**: Gas solubility in liquids depends on temperature in the OPPOSITE direction from many common solid solutes — because gas dissolution is exothermic, Le Chatelier's principle predicts that increasing temperature shifts equilibrium toward gas release, decreasing solubility (unlike many solids, whose endothermic dissolution means higher temperature increases solubility). Henry's law, which links pressure to increased solubility, applies specifically and only to gas solutes, since its mechanism depends on compressing a gas phase — a process with no analog for incompressible solid solutes.

**Secondary explanation (non-zero solubility of non-reactive gases)**: Even non-reactive, non-polar gases like O₂ and N₂ have small but genuinely non-zero solubility in water, driven by weak London dispersion interactions present between any two molecules — this small solubility is nonetheless biologically and physically significant (sustaining aquatic respiration, causing decompression sickness), demonstrating that "insoluble" is a practical description of low magnitude, not a literal claim of zero dissolved molecules.

## 6. Analogy Library

- **Primary analogy**: A crowded elevator (the gas phase) being compressed (pressure increase) forcing some occupants out into an adjacent room (dissolved in liquid) — this only works if the source room can actually be compressed; a room full of furniture (solid solute) cannot be meaningfully compressed the same way.
- **Breaking point**: The compressible-elevator analogy conveys the Henry's law mechanism well but doesn't naturally capture the exothermic-dissolution temperature relationship (MC-1) or the non-zero-solubility-via-weak-forces concept (MC-3) — those need the explicit Le Chatelier argument and the O₂/N₂ solubility data.
- **Anti-analogy**: Do NOT say "hot water dissolves everything better" as a blanket statement — this directly reinforces MC-1 by ignoring the exothermic exception for gas solutes.

## 7. Demonstration Library

- **Demonstration 1 (exothermic-dissolution/Le Chatelier derivation for warm soda)**: Derive the temperature-solubility relationship for CO₂ explicitly from exothermic dissolution and Le Chatelier's principle.
- **Demonstration 2 (gas-phase-compression mechanism for Henry's law)**: Present the explicit compression mechanism for a gas-liquid system, contrasted with a solid solute's lack of a comparable mechanism.
- **Demonstration 3 (O₂/N₂ solubility data with real-world consequences)**: Present the explicit O₂/N₂ solubility values, connecting them to aquatic respiration and decompression sickness.

## 8. Discovery Lesson

**Opening**: "Does warm soda or cold soda hold onto its fizz (dissolved CO₂) better?"

**Exploration**: Students trace the exothermic-dissolution/Le Chatelier reasoning, discovering gas solubility decreases with temperature, opposite the common solid pattern.

**Synthesis**: Guide toward: the temperature-solubility relationship depends on whether dissolution is exothermic or endothermic for that specific solute.

**Closure**: "Is oxygen truly insoluble in water, given it's non-polar and non-reactive?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit exothermic-dissolution/Le Chatelier derivation for CO₂ temperature-solubility behavior.
- **TA-2 (TELL)**: State Henry's law's gas-only scope explicitly, anchored to the gas-phase-compression mechanism.
- **TA-3 (DO)**: Student predicts the solubility response to a pressure change for both a gas solute and a solid solute.
- **TA-4 (TEST-THINKING)**: Present the "is oxygen truly insoluble" probe and ask the student to justify aquatic respiration from non-zero solubility.

## 10. Voice Teaching

Whenever gas solubility and temperature are discussed, narrate "gas dissolution is exothermic — check Le Chatelier before assuming hotter means more soluble." Whenever Henry's law is applied, state "gas solutes only — solids don't compress the same way" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly predict gas solubility decreasing with temperature from exothermic-dissolution reasoning, (b) correctly restrict Henry's law application to gas solutes only, (c) correctly recognize non-reactive gases as having small but non-zero solubility.

- **FA-1**: "Why does a warm soda go flat faster than a cold one?" — targets MC-1.
- **FA-2**: "If you increase the pressure on a saturated NaCl solution, does more NaCl dissolve?" — targets MC-2.
- **FA-3**: "Is there any dissolved oxygen in lake water? How do fish breathe?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only encountered solid-solubility temperature dependence before gas solubility.

**Delayed retrieval**: Re-probe MC-1's exothermic-dissolution reasoning and MC-2's Henry's-law scope restriction as foundational knowledge for subsequent equilibrium and environmental-chemistry applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the temperature-solubility confusion, have the student explicitly check whether dissolution is exothermic or endothermic before predicting the temperature effect.
- **S4 (frustrated)**: Normalize — overgeneralizing the solid-solubility temperature pattern to gases is genuinely common on first exposure, since the solid case is usually taught first.
- **S6 (collision)**: Use the explicit gas-phase-compression mechanism for MC-2; use the O₂/N₂ solubility data for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why increased pressure has negligible effect on NaCl solubility.

## 13. Memory & Review

Tag as two conceptual-correction memories (exothermic-dissolution temperature relationship; non-zero solubility of non-reactive gases) plus one procedural memory (Henry's-law gas-only scope restriction). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates equilibrium and gas-law reasoning built across `chem.sol.types` and `chem.state.gas-laws`, forming a capstone application to environmental and biological solubility contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
