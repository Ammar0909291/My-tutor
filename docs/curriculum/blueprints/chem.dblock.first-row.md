# chem.dblock.first-row — First-Row Transition Metal Chemistry

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.dblock.first-row` |
| Domain | d-Block and f-Block Elements |
| Requires | `chem.dblock.general` |
| Unlocks | `chem.dblock.oxo-species` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

Not all transition metal ions are colored — Sc³⁺ (d⁰, no d electrons at all) and Zn²⁺ (d¹⁰, completely filled d subshell) are both genuinely colorless, since color requires a d-d transition, which needs BOTH at least one d electron AND at least one d-orbital vacancy; the d¹⁰-stability argument (often invoked to explain why Cu⁺ "should" be stable) applies to isolated atoms/ions but breaks down in AQUEOUS solution specifically — Cu⁺(aq) genuinely disproportionates spontaneously to Cu(s)+Cu²⁺(aq), because Cu²⁺'s much higher hydration enthalpy (a charge² effect) more than compensates for the extra ionization energy required to reach +2, meaning Cu⁺ is only stable in insoluble salts or non-aqueous/soft-ligand environments, never freely in water; and transition-metal ion ionization removes 4s electrons FIRST, regardless of Aufbau filling order — Fe²⁺ is [Ar]3d⁶ (both 4s removed), and only Fe³⁺ removes a 3d electron ([Ar]3d⁵), a known, deliberate inconsistency in the simple Aufbau model, since 4s is genuinely the outermost, energetically highest orbital once the atom (or ion) actually exists.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing a Sc³⁺ or Zn²⁺ solution (colorless) against a typical d⁵ or d⁶ transition-metal solution (vividly colored), discovering colorlessness correlates with d⁰/d¹⁰ configurations specifically.

**Representational**: A disproportionation diagram for Cu⁺(aq)→Cu(s)+Cu²⁺(aq), explicitly showing the hydration-enthalpy and ionization-energy terms driving the reaction despite Cu⁺'s "stable" d¹⁰ configuration.

**Abstract**: The general d-d-transition requirement (partial d-filling needed) for color; the general recognition that isolated-ion stability arguments (like d¹⁰ stability) can be overridden by solvent-specific effects (like hydration enthalpy) in aqueous conditions; the general 4s-removed-first ionization rule.

**Transfer**: Given an unfamiliar first-row transition-metal ion or aqueous system, correctly predicting colorlessness from d⁰/d¹⁰ configuration, correctly predicting whether a given oxidation state is stable in aqueous solution (accounting for hydration effects, not isolated-ion arguments alone), and correctly writing ion configurations with 4s removed first.

## 3. Why Beginners Fail

Students assume ALL transition-metal ions must be colored (treating "transition metal" as synonymous with "colored"), missing that color specifically requires partially-filled d orbitals for a genuine d-d transition — d⁰ (Sc³⁺, Ti⁴⁺) and d¹⁰ (Zn²⁺) configurations are colorless regardless of the element's general classification; they apply the d¹⁰-stability argument (correct for isolated atoms/ions) directly to aqueous solution behavior, missing that hydration enthalpy (a solvent-specific effect, strongly favoring higher-charge ions) can override the isolated-ion stability preference, causing Cu⁺(aq) to genuinely disproportionate spontaneously; and they reverse the correct ionization order, assuming 3d electrons (filled "later" per Aufbau) must be removed first from a transition-metal ion, missing that once the atom/ion exists, 4s genuinely sits at higher energy than 3d, making 4s the first electrons removed.

## 4. Misconception Library

### MC-1: All transition metal ions are coloured
- **Probe**: "What colour is a solution of Sc³⁺ or Zn²⁺?"
- **Characteristic phrase**: "transition metals are always coloured."
- **Trigger (Type 1, overgeneralization)**: The vivid, memorable colors of many common transition-metal ions lead students to overgeneralize "transition metal" as synonymous with "colored," missing the specific electron-configuration requirement.
- **Conflict evidence [P28]**: Color requires a genuine d-d electron transition, which requires BOTH at least one d electron present AND at least one vacancy in the d subshell for that electron to be promoted into; Sc³⁺ is genuinely d⁰ (no d electrons at all, so no transition is possible) and Zn²⁺ is genuinely d¹⁰ (all d orbitals completely filled, so no vacancy exists for an electron to be promoted into) — both are genuinely colorless, along with Ti⁴⁺ (also d⁰).
- **Bridge [P30]**: "Transition metal" describes an element's general periodic classification (capable of having partially-filled d orbitals in SOME oxidation state), but any SPECIFIC ion can still end up with a completely empty (d⁰) or completely full (d¹⁰) d subshell, in which case no d-d transition is structurally possible, regardless of the element's general classification.
- **Replacement [P31]**: Color requires partially-filled d orbitals (at least one electron AND at least one vacancy) for a genuine d-d transition — d⁰ and d¹⁰ configurations are genuinely colorless, regardless of transition-metal classification.
- **Discrimination pairs [P33]**: Sc³⁺ (d⁰, no electrons to promote, colorless) and Zn²⁺ (d¹⁰, no vacancy for promotion, colorless) vs. a d⁵ or d⁶ ion (partially filled, genuine d-d transition possible, vividly colored).
- **S6 repair path**: Present Sc³⁺'s d⁰ and Zn²⁺'s d¹⁰ configurations explicitly, connecting each directly to the absence of any possible d-d transition.

### MC-2: Cu⁺ is more stable than Cu²⁺ in aqueous solution because Cu has a filled d¹⁰ configuration
- **Probe**: "What happens when you dissolve CuI in water?"
- **Characteristic phrase**: "d¹⁰ means Cu⁺ is stable."
- **Trigger (Type 5, instruction-induced)**: Students correctly learn the d¹⁰ electron-configuration stability argument (a genuine, valid consideration for isolated atoms/ions) and incorrectly extend it directly to aqueous-solution behavior without accounting for solvent-specific effects.
- **Conflict evidence [P28]**: The d¹⁰-stability argument genuinely applies to isolated atoms/ions in the gas phase — but in WATER specifically, Cu⁺(aq) genuinely DISPROPORTIONATES spontaneously to Cu(s)+Cu²⁺(aq), because the hydration enthalpy of Cu²⁺ is MUCH higher than Cu⁺'s (a charge² effect in electrostatic hydration energy), and this large hydration-enthalpy advantage more than compensates for the extra ionization energy needed to remove a second electron and reach Cu²⁺; Cu⁺ is genuinely stable only in INSOLUBLE salts (like CuI, Cu₂O, Cu₂S, where no water solvation occurs) or when coordinated to soft ligands in non-aqueous environments — never freely in aqueous solution.
- **Bridge [P30]**: An electron-configuration-based stability argument (like d¹⁰ stability) describes only ONE contributing factor to overall stability — in a specific SOLVENT environment like water, additional factors (hydration enthalpy, scaling strongly with ionic charge) can genuinely dominate and override the electron-configuration preference, producing behavior (spontaneous disproportionation) that a configuration-only argument would not predict.
- **Replacement [P31]**: The d¹⁰-stability argument applies to isolated ions, but in aqueous solution, hydration enthalpy (strongly favoring higher-charge ions) can override this preference — Cu⁺ genuinely disproportionates in water, and is stable only in insoluble salts or non-aqueous/soft-ligand environments.
- **Discrimination pairs [P33]**: Cu⁺ in an insoluble salt like CuI (genuinely stable, no water solvation) vs. Cu⁺(aq) in aqueous solution (genuinely unstable, disproportionates to Cu(s)+Cu²⁺(aq)).
- **S6 repair path**: Present the explicit hydration-enthalpy comparison between Cu⁺ and Cu²⁺, connecting the large Cu²⁺ advantage directly to the observed disproportionation.

### MC-3: Fe²⁺ has configuration [Ar]3d⁴ because Fe is [Ar]3d⁶4s² and you remove 2 electrons from 3d
- **Probe**: "Write the electron configuration of Fe²⁺."
- **Characteristic phrase**: "remove from 3d first."
- **Trigger (Type 4, notation-induced)**: Students correctly learn 4s fills before 3d in the Aufbau building-up sequence and incorrectly reverse this into "4s is removed after 3d" for ionization, assuming filling order and removal order must mirror each other.
- **Conflict evidence [P28]**: IONIZATION removes electrons from 4s FIRST, regardless of Aufbau filling order — Fe: [Ar]3d⁶4s² → Fe²⁺: [Ar]3d⁶ (both 4s electrons removed, NOT [Ar]3d⁴4s² or [Ar]3d⁴ as a naive reversal would suggest); Fe³⁺: [Ar]3d⁵ (only after both 4s are gone is one 3d electron removed); this is a well-known, deliberate inconsistency in the simple Aufbau model — 4s is genuinely the outermost orbital energetically once the atom (or ion) actually exists, so it's lost first upon ionization.
- **Bridge [P30]**: The relative energy ordering of 3d and 4s genuinely SWAPS once the atom is fully formed (or partially ionized) — increased effective nuclear charge from the added protons makes 3d lower in energy than 4s in the filled/ionized configuration, meaning 4s is now the outermost, most weakly-held shell, and hence the first removed, opposite to its filling-time behavior.
- **Replacement [P31]**: Always remove 4s electrons first when writing a transition-metal ion's configuration, regardless of the neutral atom's Aufbau filling order — Fe²⁺ is [Ar]3d⁶, never [Ar]3d⁴4s².
- **Discrimination pairs [P33]**: Neutral Fe filling (4s fills before 3d, [Ar]3d⁶4s²) vs. Fe²⁺/Fe³⁺ ionization (4s removed before 3d, [Ar]3d⁶ then [Ar]3d⁵) — filling order and removal order are opposite.
- **S6 repair path**: Walk through Fe→Fe²⁺→Fe³⁺ step by step, explicitly removing 4s electrons first at each stage, before touching any 3d electron.

## 5. Explanation Library

**Primary explanation**: Color in first-row transition-metal ions requires genuinely partially-filled d orbitals for a d-d electron transition — d⁰ (Sc³⁺, Ti⁴⁺) and d¹⁰ (Zn²⁺) configurations are colorless, since no such transition is structurally possible in either case, regardless of the element's general transition-metal classification. Transition-metal ion configurations are always written with 4s electrons removed first, since 4s genuinely sits at higher energy than 3d once the atom/ion actually exists, reversing the neutral atom's Aufbau filling order.

**Secondary explanation (solvent-specific-stability framing)**: Electron-configuration stability arguments (like d¹⁰ stability) describe only isolated atoms/ions and can be overridden by solvent-specific effects — in water, Cu²⁺'s much higher hydration enthalpy (a strong charge-dependent effect) makes Cu⁺(aq) genuinely unstable, driving spontaneous disproportionation to Cu(s)+Cu²⁺(aq), despite Cu⁺'s seemingly favorable d¹⁰ configuration; Cu⁺ remains stable only where no aqueous solvation occurs (insoluble salts, non-aqueous/soft-ligand environments).

## 6. Analogy Library

- **Primary analogy**: A financial "safe bet" investment strategy that works well in isolation (the d¹⁰-stability argument for isolated ions) but genuinely fails once a specific, powerful external market force (hydration enthalpy in water) enters the picture and dominates the outcome — the isolated-case reasoning doesn't automatically transfer to every real-world environment.
- **Breaking point**: The investment-strategy analogy conveys the context-dependence of stability arguments well but doesn't naturally capture the d-d-transition color requirement or the 4s-removed-first ionization rule — those need the explicit electron-configuration and orbital-energy arguments.
- **Anti-analogy**: Do NOT say "d¹⁰ configuration always means the ion is stable" — this directly reinforces MC-2.

## 7. Demonstration Library

- **Demonstration 1 (Sc³⁺/Zn²⁺ colorlessness comparison)**: Present both ions' explicit d⁰ and d¹⁰ configurations, connecting each directly to the absence of any possible d-d transition.
- **Demonstration 2 (Cu⁺ disproportionation hydration-enthalpy computation)**: Present the explicit hydration-enthalpy values for Cu⁺ and Cu²⁺ side by side, showing how the Cu²⁺ advantage drives the observed disproportionation.

## 8. Discovery Lesson

**Opening**: "Zn²⁺ is a d-block ion, but its solutions are colorless. Does that contradict 'transition metals are colored'?"

**Exploration**: Students examine Zn²⁺'s d¹⁰ configuration, discovering no d-d transition is possible, resolving the apparent contradiction.

**Synthesis**: Guide toward: color requires partial d-filling specifically, not merely transition-metal classification.

**Closure**: "If Cu⁺ has a favorable d¹⁰ configuration, why does it disproportionate in water instead of staying stable?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the Sc³⁺/Zn²⁺ d⁰/d¹⁰ colorlessness comparison explicitly.
- **TA-2 (TELL)**: State the hydration-enthalpy-overrides-isolated-stability principle explicitly, worked through for Cu⁺/Cu²⁺.
- **TA-3 (DO)**: Student writes Fe²⁺ and Fe³⁺ configurations correctly, removing 4s electrons first.
- **TA-4 (TEST-THINKING)**: Present MC-2's CuI probe and ask the student to explain why Cu⁺ is stable there but not in aqueous solution.

## 10. Voice Teaching

Whenever a transition-metal ion's color is discussed, always check the specific d-electron count first, never assuming color from "transition metal" status alone. Whenever an isolated-ion stability argument (like d¹⁰) is invoked for aqueous behavior, ask "does hydration enthalpy change this picture?" before concluding.

## 11. Assessment

**Mastery gate**: Student can (a) correctly predict colorlessness for d⁰/d¹⁰ transition-metal ions, (b) correctly explain why Cu⁺ disproportionates in water despite its d¹⁰ configuration, (c) correctly write transition-metal ion configurations with 4s removed first.

- **FA-1**: "What colour is a solution of Sc³⁺ or Zn²⁺?" — targets MC-1.
- **FA-2**: "What happens when you dissolve CuI in water?" — targets MC-2.
- **FA-3**: "Write the electron configuration of Fe²⁺." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students who've just learned the d¹⁰-stability argument in an isolated-ion context.

**Delayed retrieval**: Re-probe MC-2's hydration-enthalpy argument and MC-3's ionization-order rule before `chem.dblock.oxo-species` requires fluent, correct first-row transition-metal ion and oxidation-state reasoning.

## 12. Recovery Notes

- **S3 (stuck)**: For the colorless-ion confusion, present the explicit d-electron count and connect it directly to whether any d-d transition is structurally possible.
- **S4 (frustrated)**: Normalize — the d¹⁰-stability argument genuinely is correct for isolated ions, making its extension to aqueous behavior a reasonable, common oversight.
- **S6 (collision)**: Use the explicit hydration-enthalpy comparison for MC-2; use the Fe→Fe²⁺→Fe³⁺ step-by-step ionization for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why Cu⁺ is stable in CuI but not in water.

## 13. Memory & Review

Tag as two conceptual-correction memories (d⁰/d¹⁰ colorlessness; hydration-enthalpy-overrides-isolated-stability for Cu⁺) plus a procedural-rule memory (4s-removed-first ionization). Schedule a spaced check at ~1 week and again before `chem.dblock.oxo-species`.

## 14. Transfer Map

Feeds directly into `chem.dblock.oxo-species` (transition-metal oxo-species chemistry requires fluent, correct ion-configuration and oxidation-state-stability reasoning established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
