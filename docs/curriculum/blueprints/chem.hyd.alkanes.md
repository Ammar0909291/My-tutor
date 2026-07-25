# chem.hyd.alkanes — Alkanes

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.hyd.alkanes` |
| Domain | Hydrocarbons |
| Requires | `chem.org.iupac`, `chem.org.hybridization` |
| Unlocks | `chem.hal.introduction`, `chem.hyd.alkenes`, `chem.hyd.arenes`, `chem.hyd.conformations`, `chem.hyd.petroleum` |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Alkanes undergo free-radical halogenation via a three-stage chain mechanism (initiation: X₂ homolytically breaks into X• radicals, forming NO product yet; propagation: two repeating steps, the SECOND of which — R•+X₂→R–X+X• — actually forms the organic product; termination: radical-radical combination), with chlorination's LOW selectivity and bromination's HIGH selectivity explained by transition-state timing (Cl–H bond formation is exothermic with an early, reactant-like transition state that barely discriminates between C–H bond types; Br–H bond formation is endothermic with a late, product-like transition state that strongly favors the more stable radical); and "free rotation" around C–C single bonds means no barrier PREVENTS rotation, not that all conformations are equally stable — staggered ethane is genuinely ~12 kJ/mol more stable than eclipsed (torsional strain), even though interconversion between them is essentially instantaneous at room temperature.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Tracing methane's chlorination mechanism step by step, identifying exactly which step (the second propagation step, not initiation) produces the first molecule of CH₃Cl.

**Representational**: A reaction-coordinate energy diagram comparing chlorination's early, reactant-like transition state against bromination's late, product-like transition state, visually explaining the selectivity difference.

**Abstract**: The general principle that reaction selectivity correlates with reactivity via transition-state timing (Hammond postulate intuition) — a more reactive, less selective radical (Cl•) reacts via an early TS; a less reactive, more selective radical (Br•) reacts via a late TS resembling the more stable product.

**Transfer**: Given an unfamiliar radical halogenation scenario, correctly identifying which mechanistic step forms product, correctly predicting relative selectivity for a new halogen based on reactivity/TS-timing reasoning, and correctly distinguishing "free rotation is possible" from "all rotational conformations are equally stable."

## 3. Why Beginners Fail

Students assume the initiation step of a radical chain mechanism produces the organic product, missing that initiation only generates the radical species (X•) with no organic substrate involved at all — the actual product-forming step is the second propagation step; they attribute chlorination's lower selectivity to electronegativity ("Cl is more electronegative, so more choosy"), missing that the real explanation is kinetic (transition-state timing tied to reaction exothermicity/endothermicity), and get the selectivity ranking backwards (bromination is actually MORE selective, not less); and they interpret "free rotation" as meaning all conformations around a C–C bond are energetically equivalent, missing that "free" refers only to the ABSENCE of a rotation-preventing barrier, not the absence of any energetic preference among conformations.

## 4. Misconception Library

### MC-1: In the mechanism, the radical product R–X is formed in the initiation step
- **Probe**: "Which step of the free-radical chain mechanism actually forms the product R–X?"
- **Characteristic phrase**: "initiation gives the product."
- **Trigger (Type 5, instruction-induced)**: Students see "initiation" as the mechanism's first, foundational step and assume it must be where the reaction's defining product first appears, without tracking exactly which species are involved at each stage.
- **Conflict evidence [P28]**: INITIATION only breaks X₂ into two X• radicals (via homolytic bond cleavage) — no organic substrate (R–H) is involved at all in this step, so no product can form here; the organic product R–X is genuinely first formed in the SECOND PROPAGATION step (R•+X₂→R–X+X•), where the previously-formed alkyl radical R• (itself created in the FIRST propagation step) reacts with X₂.
- **Bridge [P30]**: Initiation is best understood as merely "lighting the fuse" — generating the reactive radical species needed to start the chain — while propagation is where the actual repeating, product-forming chemistry occurs; this is exactly why a single photon (initiating just one X₂ molecule) can trigger a chain reaction producing millions of product molecules through repeated propagation cycles.
- **Replacement [P31]**: Initiation generates radicals with no product formed; propagation (specifically its second step) is where the organic product R–X is actually formed, repeatedly, in a self-sustaining chain.
- **Discrimination pairs [P33]**: Initiation (X₂→2X•, no organic substrate involved, no product) vs. propagation step 2 (R•+X₂→R–X+X•, genuine product formation).
- **S6 repair path**: Have the student trace each mechanistic step explicitly, identifying which species are reactants and products at each stage, to locate exactly where R–X first appears.

### MC-2: Chlorination is more selective than bromination because Cl is more electronegative and more "choosy" about bonds
- **Probe**: "Which gives a more product distribution of isomers: monochlorination or monobromination of butane?"
- **Characteristic phrase**: "chlorine is more reactive and selective."
- **Trigger (Type 2, perceptual intuition)**: Students intuitively associate "more electronegative" with "more discriminating/selective," applying a plausible-sounding but incorrect chemical-personality reasoning rather than the actual kinetic (transition-state) explanation.
- **Conflict evidence [P28]**: BROMINE is actually the MORE selective halogen, not chlorine — the reason is kinetic: the Br–H bond is weaker than the Cl–H bond, making H-abstraction by Br• genuinely ENDOTHERMIC, which produces a late, product-like transition state whose energy closely reflects the stability of the resulting radical, making Br• highly selective for the most stable (most substituted) C–H position; Cl• abstraction, by contrast, is exothermic with an early, reactant-like transition state that barely distinguishes between different C–H bond types, giving chlorination LOW selectivity, reacting at similar rates across different positions.
- **Bridge [P30]**: Electronegativity describes an atom's electron-pulling tendency in a formed bond, but selectivity in a radical reaction is governed by transition-state TIMING (early vs. late, tied to whether the step is exothermic or endothermic) — a genuinely different physical concept that happens to correlate inversely with naive electronegativity-based intuition here.
- **Replacement [P31]**: Selectivity is governed by reactivity and transition-state timing, not electronegativity — the LESS reactive radical (Br•, endothermic abstraction, late TS) is MORE selective; the MORE reactive radical (Cl•, exothermic abstraction, early TS) is LESS selective.
- **Discrimination pairs [P33]**: Cl• (more reactive, exothermic H-abstraction, early TS, LOW selectivity) vs. Br• (less reactive, endothermic H-abstraction, late TS, HIGH selectivity) — the naive "more reactive = more selective" intuition is backwards.
- **S6 repair path**: Present the reaction-coordinate diagrams for both halogens side by side, connecting exothermicity/endothermicity directly to early/late TS position and resulting selectivity.

### MC-3: Free rotation around C–C bonds means all conformations are equally stable
- **Probe**: "Is the staggered conformation of ethane more or less stable than the eclipsed? By how much?"
- **Characteristic phrase**: "free rotation means no preference."
- **Trigger (Type 3, language contamination)**: The word "free" in "free rotation" suggests an absence of any constraint or preference whatsoever, leading students to conflate "rotation is not blocked" with "rotation produces no energy differences."
- **Conflict evidence [P28]**: "Free rotation" specifically means there is no barrier high enough to PREVENT rotation (unlike C=C double-bond rotation, which would require breaking the π bond, needing over 250 kJ/mol — genuinely restricted, producing distinguishable cis/trans isomers); but "free" does NOT mean energetically flat — ethane's staggered conformation is genuinely ~12 kJ/mol lower in energy than eclipsed (due to torsional strain), and at room temperature (kT≈2.5 kJ/mol), this energy difference means staggered is strongly preferred (over 99% staggered at any instant), even though interconversion between conformations happens essentially instantaneously.
- **Bridge [P30]**: "Free" describes the ABILITY to rotate (no prohibitively high barrier blocking it), which is entirely separate from whether different rotational positions have different energies — a door can swing "freely" on its hinges while still having a preferred resting position due to gravity, without that preference meaning the door is somehow "not free" to swing.
- **Replacement [P31]**: Free rotation means rotation isn't blocked by a prohibitive energy barrier, not that all resulting conformations are equally stable — genuine energy differences (like staggered vs. eclipsed) can and do exist even for "freely rotating" bonds.
- **Discrimination pairs [P33]**: C–C single bond rotation (genuinely "free" — low barrier, but staggered still preferred by ~12 kJ/mol) vs. C=C double bond rotation (genuinely restricted — very high barrier, over 250 kJ/mol, producing stable, distinguishable cis/trans isomers).
- **S6 repair path**: Present the ~12 kJ/mol staggered-vs-eclipsed energy difference directly alongside the room-temperature thermal energy (kT≈2.5 kJ/mol), showing both the strong preference AND the fast interconversion simultaneously.

## 5. Explanation Library

**Primary explanation**: Alkane free-radical halogenation proceeds through initiation (generating X• radicals, no product yet), propagation (a repeating two-step cycle where the SECOND step genuinely forms the organic product R–X), and termination (radical-radical combination, ending chains). The relative selectivity of different halogens is explained by transition-state timing: less reactive radicals (like Br•) react through later, more product-like transition states that strongly favor forming the most stable possible radical intermediate, making them more selective; more reactive radicals (like Cl•) react through earlier, less discriminating transition states, making them less selective.

**Secondary explanation (conformational-preference framing)**: "Free rotation" around C–C single bonds means no prohibitive energy barrier blocks rotation — genuinely distinct from C=C double bonds, where rotation would require breaking the pi bond and is truly restricted. However, "free" doesn't mean all rotational positions are equally stable — ethane's staggered conformation is measurably lower in energy than eclipsed, creating a real, quantifiable preference even though rotation between conformations remains extremely fast.

## 6. Analogy Library

- **Primary analogy**: A single lit match (initiation) versus a spreading wildfire's actual burning (propagation) — the match itself doesn't burn the forest; it merely starts the self-sustaining chain of combustion that does the actual, repeated work.
- **Breaking point**: The match/wildfire analogy conveys the initiation-vs-propagation distinction well but doesn't naturally capture the selectivity/transition-state-timing argument or the free-rotation-vs-energy-preference distinction — those need the explicit kinetic and thermodynamic arguments.
- **Anti-analogy**: Do NOT say "free rotation means no energetic preference between conformations" — this directly reinforces MC-3.

## 7. Demonstration Library

- **Demonstration 1 (mechanism step-by-step tracing)**: Walk through the complete methane chlorination mechanism, having students identify exactly which species are present at each step and pinpoint the first appearance of CH₃Cl.
- **Demonstration 2 (selectivity reaction-coordinate comparison)**: Present side-by-side energy diagrams for chlorination and bromination H-abstraction, connecting TS position (early vs. late) to the resulting selectivity difference.

## 8. Discovery Lesson

**Opening**: "If initiation is the very first step of the radical chain mechanism, does that mean it's where the product first appears?"

**Exploration**: Students trace the mechanism step by step, tracking exactly which species are involved at initiation versus the two propagation steps, discovering the product only appears in the second propagation step.

**Synthesis**: Guide toward: initiation merely generates the reactive radical needed to start the chain; the actual product-forming chemistry happens in propagation.

**Closure**: "Given that C–C bonds rotate 'freely,' does that mean staggered and eclipsed ethane have exactly the same energy?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the full mechanism step-by-step trace, explicitly marking where product first forms.
- **TA-2 (TELL)**: State the transition-state-timing explanation for selectivity explicitly, contrasted directly with the (incorrect) electronegativity-based intuition.
- **TA-3 (DO)**: Student predicts relative selectivity for a new halogenation scenario using reactivity/TS-timing reasoning.
- **TA-4 (TEST-THINKING)**: Present MC-3's staggered-vs-eclipsed probe and ask the student to reconcile "free rotation" with a genuine energy preference.

## 10. Voice Teaching

Whenever the radical chain mechanism is discussed, narrate explicitly "initiation makes radicals, not product — watch for where the organic substrate first appears" before naming any product-forming step. Whenever selectivity is compared between halogens, state "reactivity and TS timing, not electronegativity" as the governing principle before naming which halogen is more selective.

## 11. Assessment

**Mastery gate**: Student can (a) correctly identify the propagation step (not initiation) as where product forms, (b) correctly explain bromination's higher selectivity using TS-timing reasoning, not electronegativity, (c) correctly distinguish "free rotation is possible" from "conformations are equally stable."

- **FA-1**: "Which step of the free-radical chain mechanism actually forms the product R–X?" — targets MC-1.
- **FA-2**: "Which gives a more product distribution of isomers: monochlorination or monobromination of butane?" — targets MC-2.
- **FA-3**: "Is the staggered conformation of ethane more or less stable than the eclipsed? By how much?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students applying a plausible-sounding electronegativity heuristic rather than the correct kinetic explanation.

**Delayed retrieval**: Re-probe MC-1's mechanism-step distinction and MC-2's selectivity reasoning before `chem.hyd.conformations` and `chem.hal.introduction` build directly on these foundations.

## 12. Recovery Notes

- **S3 (stuck)**: For mechanism-step confusion, have the student list, species by species, exactly what's present before and after each step, rather than relying on step-name intuition.
- **S4 (frustrated)**: Normalize — the electronegativity-based selectivity explanation is a genuinely plausible-sounding heuristic, making its incorrectness here a reasonable, common surprise.
- **S6 (collision)**: Use the reaction-coordinate-diagram comparison for MC-2; use the explicit energy-difference-vs-thermal-energy comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a less reactive radical ends up being more selective, using TS-timing language.

## 13. Memory & Review

Tag as a procedural-mechanistic memory (initiation vs. propagation product formation) plus a conceptual-correction memory (selectivity via TS-timing, not electronegativity; free rotation vs. energy preference). Schedule a spaced check at ~1 week and again before `chem.hyd.conformations`.

## 14. Transfer Map

Feeds directly into `chem.hal.introduction` (halogenation chemistry directly extends this mechanism), `chem.hyd.alkenes` (contrasts alkane's free single-bond rotation with alkene's restricted double-bond rotation), `chem.hyd.arenes`, `chem.hyd.conformations` (directly develops the staggered/eclipsed energy analysis introduced in MC-3), and `chem.hyd.petroleum`.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
