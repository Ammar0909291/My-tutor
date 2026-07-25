# chem.dblock.oxo-species — Oxides and Oxyanions of Transition Metals

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.dblock.oxo-species` |
| Domain | D-Block Elements |
| Requires | `chem.dblock.first-row` |
| Unlocks | (none) |
| Difficulty | proficient |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

MnO₄⁻'s purple color is NOT a d-d transition despite Mn being a d-block element — Mn in MnO₄⁻ is in the +7 oxidation state, meaning it is genuinely d⁰ (ZERO d electrons), so d-d transitions are structurally impossible (no electrons to promote); the color instead arises from LIGAND-TO-METAL CHARGE TRANSFER (LMCT), where oxygen lone-pair electrons are promoted into Mn's empty 3d/4p orbital manifold; adding acid to yellow chromate (CrO₄²⁻) does NOT leave the color unchanged — the equilibrium 2CrO₄²⁻+2H⁺⇌Cr₂O₇²⁻+H₂O genuinely shifts RIGHT under acidic conditions (Le Chatelier), turning the solution ORANGE as CrO₄²⁻ converts to Cr₂O₇²⁻, with alkali reversing this color change back to yellow; and in VO₂⁺, vanadium is NOT +2 despite the ion's overall "+" charge visually suggesting a simple match — with two oxygens each at −2, solving x+2(−2)=+1 gives x=+5, so VO₂⁺ genuinely contains V(+5) — the apparent numeral in the formula (and the ion's overall charge) refers to the OVERALL POLYATOMIC ION CHARGE, never directly to the central atom's individual oxidation state (exactly as NH₄⁺'s "+1" charge does not mean N is +1 — N is actually −3).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Computing Mn's oxidation state in MnO₄⁻ explicitly (x+4(−2)=−1→x=+7, d⁰), directly confirming zero d electrons are available for any d-d transition.

**Representational**: A side-by-side color-change diagram for CrO₄²⁻ (yellow) transforming to Cr₂O₇²⁻ (orange) upon acid addition, with the reverse transformation shown upon alkali addition.

**Abstract**: The general principle that a d-block element's specific oxidation state (not merely its "d-block" category membership) determines its actual d-electron count and hence its capacity for d-d transitions; the general principle that oxyanion interconversion equilibria respond predictably to pH via Le Chatelier's principle; the general principle that a polyatomic ion's overall formula charge is distinct from, and must never be equated with, the central atom's individual oxidation state.

**Transfer**: Given an unfamiliar high-oxidation-state transition-metal species, correctly checking d-electron count before attributing color to d-d transitions; given an unfamiliar chromate/dichromate-type equilibrium, correctly predicting the pH-dependent color shift; given an unfamiliar polyatomic oxyanion, correctly computing the central atom's individual oxidation state via the full charge-balance equation, never reading it directly from the overall ion charge.

## 3. Why Beginners Fail

Students see that manganese is a d-block element and, knowing that transition-metal colors often arise from d-d transitions, assume MnO₄⁻'s vivid purple color must likewise be a d-d transition, missing that Mn in this specific ion is in the +7 oxidation state — meaning it has genuinely LOST all its d electrons (d⁰) — making d-d transitions structurally impossible, with the actual color arising from an entirely different mechanism (ligand-to-metal charge transfer); students, perhaps expecting acid addition to have no dramatic visible effect on a stable-seeming yellow solution, assume the chromate ion's color remains unchanged upon acidification, missing that the chromate-dichromate equilibrium genuinely and visibly shifts toward the orange dichromate form under acidic conditions, a classic, direct consequence of Le Chatelier's principle applied to this specific proton-consuming/releasing equilibrium; and students, seeing the numeral "2" prominently in "VO₂⁺" and noting the ion's overall "+1" (or sometimes loosely associated "+2"-looking) charge, incorrectly read off an oxidation state for vanadium directly from some superficial feature of the formula, missing that the correct procedure requires solving the FULL charge-balance equation (accounting for all atoms' contributions, including both oxygens at −2 each) — a procedure that reveals V is actually +5, entirely different from any number suggested by superficially eyeballing the formula.

## 4. Misconception Library

### MC-1: MnO₄⁻ is purple because it has lots of d electrons (Mn has many d electrons before forming the ion)
- **Probe**: "How many d electrons does Mn in MnO₄⁻ have? What type of electronic transition causes the purple colour?"
- **Characteristic phrase**: "it must be d–d because manganese is a d-block element."
- **Trigger (Type 2, perceptual intuition)**: Category membership (d-block element) is assumed to guarantee the specific electronic behavior (d-d transitions) typically associated with that category, without checking the actual electron count in the specific oxidation state.
- **Conflict evidence [P28]**: Mn in MnO₄⁻ is +7 (d⁰) — zero d electrons. The purple colour CANNOT be d–d (no electrons to promote). It is LIGAND-TO-METAL CHARGE TRANSFER (LMCT): O lone pair electrons are promoted to the empty 3d/4p manifold on Mn. The fact that Mn is a d-block element is true, but in the +7 state its d shell is empty.
- **Bridge [P30]**: "Being a d-block element" describes an atom's position in the periodic table (and its neutral-atom or low-oxidation-state electron configuration), but it does NOT guarantee that every ion or compound of that element retains d electrons — Mn's very high +7 oxidation state in MnO₄⁻ specifically means it has LOST all of its d electrons in forming this ion, making the d-block category membership irrelevant to whether d-d transitions can actually occur in THIS specific species.
- **Replacement [P31]**: Always compute the actual oxidation state and resulting d-electron count for the SPECIFIC species in question before attributing color to d-d transitions — d-block category membership alone does not guarantee d electrons are present.
- **Discrimination pairs [P33]**: MnO₄⁻ (Mn⁷⁺, d⁰, LMCT color mechanism) vs. a lower-oxidation-state Mn complex (genuine d electrons present, capable of true d-d transitions).
- **S6 repair path**: Present the explicit oxidation-state computation for Mn in MnO₄⁻, deriving the d⁰ configuration and ruling out d-d transitions.

### MC-2: Adding acid to chromate gives chromate (yellow → remains yellow)
- **Probe**: "What happens to the colour when concentrated H₂SO₄ is added to a yellow K₂CrO₄ solution?"
- **Characteristic phrase**: "acid has no effect on chromate colour."
- **Trigger (Type 5, instruction-induced)**: Without explicit exposure to the chromate-dichromate equilibrium's pH-sensitivity, students may default to assuming a stable-looking colored solution remains unaffected by acid addition.
- **Conflict evidence [P28]**: The equilibrium 2CrO₄²⁻+2H⁺⇌Cr₂O₇²⁻+H₂O shifts RIGHT in acid (Le Chatelier: removing OH⁻ or adding H⁺). The solution turns ORANGE as CrO₄²⁻ (yellow) converts to Cr₂O₇²⁻ (orange). Adding alkali reverses this (orange→yellow). This is a classic and visually unambiguous demonstration.
- **Bridge [P30]**: The chromate/dichromate species exist in a genuine, pH-sensitive chemical equilibrium — adding H⁺ (acid) directly consumes a reactant of the reverse reaction and supplies a reactant for the forward reaction as written, driving the equilibrium toward dichromate formation (Le Chatelier's principle applied straightforwardly to this specific proton-involving equilibrium), producing a visible, unambiguous color change rather than no effect.
- **Replacement [P31]**: Adding acid to chromate solution genuinely shifts the equilibrium toward dichromate (yellow→orange), and alkali reverses this — never assume the color remains static upon pH change for this specific equilibrium.
- **Discrimination pairs [P33]**: Chromate under acidic conditions (shifts to orange dichromate) vs. chromate under alkaline conditions (remains/reverts to yellow) — a directly pH-dependent, visually demonstrable equilibrium.
- **S6 repair path**: Present the explicit equilibrium equation with Le Chatelier reasoning, deriving the rightward shift and resulting color change from acid addition.

### MC-3: In VO₂⁺, vanadium must be +2 (matching the apparent charge on V)
- **Probe**: "Assign the oxidation state of V in VO₂⁺."
- **Characteristic phrase**: "VO₂⁺ has V²⁺ because it has a 2+ charge."
- **Trigger (Type 4, notation-induced)**: The formula's numerals and the ion's overall charge invite a superficial, incorrect direct reading of the central atom's oxidation state.
- **Conflict evidence [P28]**: VO₂⁺ is the dioxovanadium(V) ion — it contains TWO oxygen atoms each with O=−2. Let V=x: x+2(−2)=+1 (the ion's charge)→x=+5. VO₂⁺ contains V(+5). The apparent "+2" in the formula refers to the OVERALL CHARGE on the polyatomic ion, not to the OS of vanadium alone — same as in NH₄⁺ (N is −3 despite the ion being +1).
- **Bridge [P30]**: A polyatomic ion's overall net charge is the SUM of contributions from every atom in the ion (each atom's oxidation state, weighted by how many of that atom are present) — reading the central atom's individual oxidation state directly off the ion's overall charge (or off any numeral appearing in the formula) skips this necessary summation step entirely, and can produce a wildly incorrect answer, exactly as it would for the well-known NH₄⁺ case (where N is actually −3, not +1).
- **Replacement [P31]**: Always solve the full charge-balance equation (summing all atoms' oxidation-state contributions to equal the ion's overall charge) to find a central atom's oxidation state — never read it directly off the ion's overall charge or any formula numeral.
- **Discrimination pairs [P33]**: Correct computation (x+2(−2)=+1→x=+5 for V in VO₂⁺) vs. incorrect direct reading (assuming V=+2 from the ion's superficial "+" appearance) — the correct answer differs dramatically from the naive guess.
- **S6 repair path**: Present the explicit full charge-balance computation for VO₂⁺, paralleled with the well-known NH₄⁺ example to reinforce the general principle.

## 5. Explanation Library

**Primary explanation**: A transition metal's category membership (being a d-block element) does not guarantee d electrons are present in every ion of that element — Mn in MnO₄⁻ is in the +7 oxidation state, genuinely d⁰, ruling out d-d transitions and requiring an alternative mechanism (ligand-to-metal charge transfer) to explain its purple color. The chromate-dichromate equilibrium is genuinely pH-sensitive, with acid addition visibly shifting yellow chromate toward orange dichromate via Le Chatelier's principle.

**Secondary explanation (polyatomic ion charge vs. central-atom oxidation state)**: A polyatomic ion's overall net charge is the sum of every constituent atom's oxidation-state contribution, never a direct readout of the central atom's individual oxidation state — VO₂⁺'s vanadium is actually +5 (not +2), requiring the full charge-balance equation to compute correctly, exactly paralleling the well-known NH₄⁺ case where nitrogen is −3 despite the ion's +1 overall charge.

## 6. Analogy Library

- **Primary analogy**: A company's total quarterly profit (the ion's overall charge) being the sum of many departments' individual contributions (each atom's oxidation state) — you cannot read off any single department's specific performance just by looking at the company-wide total number.
- **Breaking point**: The company-profit analogy conveys the summation-required-for-central-atom-oxidation-state concept well but doesn't naturally capture the d-electron-count/color-mechanism distinction (MC-1) or the pH-dependent chromate-dichromate equilibrium (MC-2) — those need the explicit oxidation-state computation for Mn and the Le Chatelier equilibrium argument.
- **Anti-analogy**: Do NOT say "any d-block metal's colored compounds are always d-d transitions" — this directly reinforces MC-1 by ignoring the oxidation-state-dependence of d-electron availability.

## 7. Demonstration Library

- **Demonstration 1 (Mn oxidation-state computation and d-electron count for MnO₄⁻)**: Compute Mn's oxidation state explicitly, deriving the d⁰ configuration and ruling out d-d transitions.
- **Demonstration 2 (chromate-dichromate Le Chatelier equilibrium with observable color change)**: Present the explicit equilibrium equation and its acid/alkali-driven shift, connecting it to the observed color change.
- **Demonstration 3 (full charge-balance computation for VO₂⁺ paralleled with NH₄⁺)**: Compute both examples explicitly side by side, reinforcing the general principle that ion charge ≠ central-atom oxidation state.

## 8. Discovery Lesson

**Opening**: "Manganese is a d-block element. Does that mean MnO₄⁻'s purple color must be a d-d transition?"

**Exploration**: Students compute Mn's actual oxidation state in MnO₄⁻, discovering it's genuinely d⁰, ruling out d-d transitions.

**Synthesis**: Guide toward: d-block category membership doesn't guarantee d electrons in every specific ion — always check the actual oxidation state.

**Closure**: "Does acid have any effect on the color of a chromate solution?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit Mn oxidation-state computation for MnO₄⁻, deriving the d⁰ configuration.
- **TA-2 (TELL)**: State the pH-dependent chromate-dichromate equilibrium explicitly, anchored to the Le Chatelier argument.
- **TA-3 (DO)**: Student computes the central-atom oxidation state for an unfamiliar polyatomic oxyanion via full charge balance.
- **TA-4 (TEST-THINKING)**: Present the VO₂⁺ probe and ask the student to justify V(+5) from the full charge-balance computation, not the ion's superficial charge.

## 10. Voice Teaching

Whenever a transition-metal species' color is discussed, narrate "check the actual oxidation state and d-electron count — d-block membership alone isn't enough." Whenever a polyatomic ion's central-atom oxidation state is assigned, state "always solve the full charge-balance equation — never read it off the overall ion charge" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly determine d-electron count from actual oxidation state before attributing color to d-d transitions, (b) correctly predict the pH-dependent chromate-dichromate color shift, (c) correctly compute a central atom's oxidation state via full charge balance.

- **FA-1**: "How many d electrons does Mn in MnO₄⁻ have? What type of electronic transition causes the purple colour?" — targets MC-1.
- **FA-2**: "What happens to the colour when concentrated H₂SO₄ is added to a yellow K₂CrO₄ solution?" — targets MC-2.
- **FA-3**: "Assign the oxidation state of V in VO₂⁺." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-3 among students who have only encountered simple, single-atom-charge oxidation-state assignments without complex polyatomic-ion practice.

**Delayed retrieval**: Re-probe MC-1's oxidation-state-dependent d-electron reasoning and MC-3's full-charge-balance procedure as foundational knowledge for subsequent advanced inorganic and analytical-chemistry applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the d-block-membership confusion, have the student explicitly compute the oxidation state and resulting d-electron count before attributing color to any mechanism.
- **S4 (frustrated)**: Normalize — assuming d-block membership guarantees d-d transitions is genuinely common on first exposure, since this pattern holds for many lower-oxidation-state complexes.
- **S6 (collision)**: Use the explicit Le Chatelier equilibrium argument for MC-2; use the full charge-balance computation paralleled with NH₄⁺ for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why MnO₄⁻'s purple color cannot be a d-d transition.

## 13. Memory & Review

Tag as one conceptual-correction memory (oxidation-state-dependent d-electron count and color mechanism) plus two procedural memories (pH-dependent chromate-dichromate equilibrium; full charge-balance oxidation-state computation). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates first-row transition-metal reasoning built across `chem.dblock.first-row`, forming a capstone application to industrial (chromate/permanganate oxidants, V₂O₅ catalysis) and analytical chemistry contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
