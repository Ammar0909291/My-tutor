# chem.hal.sn2 — SN2 Mechanism

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.hal.sn2` |
| Domain | Haloalkanes |
| Requires | `chem.org.reactive-intermediates`, `chem.hal.introduction` |
| Unlocks | `chem.alc.alcohols`, `chem.hal.elimination`, `chem.hal.grignard` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

PURE SN2 gives complete stereochemical inversion (Walden inversion), but on SECONDARY substrates, especially in polar protic solvents, competing SN1 can contaminate the outcome with racemization, producing a partially-inverted (not perfectly inverted) product — clean inversion is guaranteed only for primary substrates with a strong nucleophile in polar aprotic solvent; nucleophilicity and basicity are DIFFERENT properties (basicity = thermodynamic affinity for H⁺; nucleophilicity = kinetic rate of attack on carbon), and in POLAR PROTIC solvents they can genuinely diverge — small hard anions (F⁻) are heavily H-bond-solvated and must shed that shell before attacking carbon (slow), while large soft anions (I⁻) are weakly solvated and attack readily (fast), so I⁻ is a better nucleophile than F⁻ in methanol despite being the weaker base; and SN2 is a ONE-STEP CONCERTED mechanism with exactly ONE transition state and ONE energy-diagram maximum, with NO intermediate and NO dip between two peaks — a two-hump SN2 energy diagram is a category error that wrongly implies a discrete intermediate exists.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing SN2 on a primary substrate (clean, complete inversion) against SN2 attempted on a secondary substrate in a polar protic solvent (partial inversion, contaminated by competing SN1 racemization), making the substrate/solvent dependence concrete.

**Representational**: A single-hump energy diagram for SN2 (one transition state, backside-attack geometry with the nucleophile and leaving group on opposite faces) contrasted directly against a two-hump SN1 diagram with an intermediate well.

**Abstract**: The general principle that nucleophilicity and basicity are governed by different physical quantities (kinetic rate vs. thermodynamic proton affinity) and can diverge based on solvent H-bonding; the general one-step, no-intermediate nature of concerted SN2.

**Transfer**: Given an unfamiliar substrate/nucleophile/solvent combination, correctly predicting whether clean SN2 inversion or a mixed SN1/SN2 outcome is expected, correctly ranking nucleophile strength given the solvent type (protic vs. aprotic), and correctly drawing a one-maximum, no-intermediate SN2 energy profile.

## 3. Why Beginners Fail

Students assume SN2 always gives complete, clean stereochemical inversion regardless of substrate, missing that secondary substrates (unlike primary) can support a competing SN1 pathway, especially in polar protic solvents, which contaminates the inversion product with racemization from the planar carbocation intermediate — clean inversion is reliably guaranteed only under primary-substrate, aprotic-solvent, strong-nucleophile conditions; they equate a stronger base with a better nucleophile as a blanket rule (conflating basicity, a thermodynamic proton-affinity measure, with nucleophilicity, a kinetic carbon-attack-rate measure), missing that in polar protic solvents the two properties can genuinely reverse order — small, hard, strongly H-bonded anions like F⁻ must shed a stabilizing solvent shell before attacking carbon, making them SLOWER nucleophiles than large, weakly-solvated anions like I⁻, even though F⁻ is the stronger base; and they draw the SN2 energy profile with two humps and a dip (mentally modeling it as "nucleophile attacks, then leaving group leaves" as two separate steps), missing that SN2 is genuinely concerted — bond formation and bond breaking happen SIMULTANEOUSLY in one transition state, with no intermediate and hence only one energy maximum.

## 4. Misconception Library

### MC-1: SN2 on a secondary substrate in water always gives the inversion product cleanly
- **Probe**: "If you run SN2 on a secondary substrate in water (polar protic), might SN1 compete? What would that do to the stereochemical outcome?"
- **Characteristic phrase**: "SN2 always gives inversion."
- **Trigger (Type 5, instruction-induced)**: Instruction states "SN2 gives inversion" as a general rule without qualifying that the guarantee holds only for genuinely pure SN2 conditions, leaving secondary/protic cases unaddressed.
- **Conflict evidence [P28]**: PURE SN2 gives complete inversion. BUT secondary substrates can undergo COMPETING SN1, especially in polar protic solvents. If SN1 operates alongside SN2, the product will show: inversion (from SN2) + racemisation (from SN1) → partially inverted product (excess inversion, but not 100%). The cleanest inversion results come from: PRIMARY substrates (only SN2 possible) + strong nucleophile + polar APROTIC solvent (suppress SN1 + enhance SN2 rate).
- **Bridge [P30]**: "SN2 gives inversion" is a true statement about the SN2 pathway specifically, not a claim that every reaction under SN2-favoring conditions proceeds exclusively via SN2 — secondary substrates sit in a genuine mechanistic gray zone where both SN1 and SN2 are structurally accessible, and solvent/nucleophile conditions determine which pathway (or mixture) actually dominates.
- **Replacement [P31]**: Clean, complete inversion is only guaranteed for primary substrates with a strong nucleophile in a polar aprotic solvent — secondary substrates in polar protic solvents can show partial racemization from competing SN1, never assume 100% inversion by default.
- **Discrimination pairs [P33]**: Primary substrate + strong nucleophile + polar aprotic solvent (clean inversion, pure SN2) vs. secondary substrate + polar protic solvent (partial inversion, SN1/SN2 mixture).
- **S6 repair path**: Present the explicit product-composition breakdown (inversion from SN2 + racemization from SN1) for the secondary/protic case, contrasted with the clean primary/aprotic case.

### MC-2: A stronger base is always a better nucleophile in SN2
- **Probe**: "I⁻ is a weaker base than F⁻ (pKa HI ≈ −10, pKa HF ≈ 3.2). But in methanol (polar protic), I⁻ is a BETTER nucleophile toward CH₃Br than F⁻. How?"
- **Characteristic phrase**: "basicity = nucleophilicity."
- **Trigger (Type 2, perceptual intuition)**: Students perceive basicity and nucleophilicity as the same underlying "electron-donating strength" property, since both involve a species attacking an electrophilic center (H⁺ or C).
- **Conflict evidence [P28]**: Nucleophilicity and basicity measure DIFFERENT things. Basicity measures thermodynamic affinity for a PROTON (H⁺). Nucleophilicity measures kinetic rate of attack on a CARBON electrophile. In polar PROTIC solvents, anions are solvated by H-bonds from the solvent. SMALL, HARD anions (F⁻, OH⁻) are heavily solvated → must "shed" solvation shell before attacking C → high activation energy → slow SN2. LARGE, SOFT anions (I⁻) are weakly solvated → easy to desolvate → fast SN2. In polar aprotic solvents: no H-bonding possible → all anions are naked → nucleophilicity tracks basicity (F⁻>Cl⁻>Br⁻>I⁻).
- **Bridge [P30]**: Basicity is an equilibrium (thermodynamic) property measuring proton affinity, entirely independent of solvent kinetics; nucleophilicity is a kinetic (rate) property that is strongly modulated by how heavily the solvent solvates the nucleophile before it can reach the carbon electrophile — the two properties only track each other when solvation effects are absent (i.e., in polar aprotic solvents).
- **Replacement [P31]**: In polar protic solvents, nucleophilicity depends heavily on desolvation ease (favoring large, soft, weakly-solvated anions like I⁻) and can diverge from basicity order; in polar aprotic solvents, nucleophilicity tracks basicity closely — always specify solvent before ranking nucleophile strength.
- **Discrimination pairs [P33]**: I⁻ in methanol (weakly solvated, fast nucleophile despite weak base) vs. F⁻ in methanol (heavily solvated, slow nucleophile despite strong base) — reversed from the aprotic-solvent ranking.
- **S6 repair path**: Present the explicit solvation-shell argument (H-bonding strength vs. anion size/charge density) as the mechanistic explanation for the protic-solvent reversal.

### MC-3: The energy diagram for SN2 shows two transition states with a dip in between, similar to SN1
- **Probe**: "How many steps does SN2 have? What does each step imply for the energy profile?"
- **Characteristic phrase**: "SN2 has the nucleophile attacking and then the leaving group leaving — two steps, two peaks."
- **Trigger (Type 4, notation-induced)**: Students narrate SN2 verbally as a two-part process ("nucleophile attacks, leaving group leaves"), which primes a mental model of two sequential steps rather than one simultaneous event.
- **Conflict evidence [P28]**: SN2 is a ONE-STEP CONCERTED mechanism. Bond formation (Nu–C) and bond breaking (C–X) happen SIMULTANEOUSLY. The energy profile has ONLY ONE MAXIMUM (one transition state, one hump) and NO MINIMUM between. There is no intermediate. SN1 has TWO maxima and ONE minimum (the carbocation well) — drawing an SN2 energy profile with two humps is a category error implying an intermediate exists, which it does not for concerted SN2.
- **Bridge [P30]**: Describing a mechanism in words as a sequence of events ("attack, then leave") does not necessarily mean those events are temporally separated on the reaction coordinate — in SN2 specifically, the bond-forming and bond-breaking "events" occur at the SAME point along the reaction coordinate (the single transition state), making them simultaneous rather than sequential despite how the verbal description sounds.
- **Replacement [P31]**: SN2 has exactly one transition state and one energy maximum, with bond formation and bond breaking occurring simultaneously — never draw a two-hump profile or an intermediate well for concerted SN2.
- **Discrimination pairs [P33]**: SN2 energy profile (one hump, no intermediate) vs. SN1 energy profile (two humps, one intermediate well, the carbocation) — genuinely different mechanistic topologies.
- **S6 repair path**: Draw both energy profiles side by side, explicitly counting maxima and minima for each and connecting the count to the presence/absence of a discrete intermediate.

## 5. Explanation Library

**Primary explanation**: SN2 proceeds via a single concerted transition state in which the nucleophile attacks from the face opposite the leaving group (backside attack), producing complete stereochemical inversion (Walden inversion) — but this clean outcome is guaranteed only under conditions that suppress competing SN1 (primary substrate, strong nucleophile, polar aprotic solvent); secondary substrates in polar protic solvents can show partial racemization from competing SN1.

**Secondary explanation (nucleophilicity vs. basicity, and reaction profile shape)**: Nucleophilicity (kinetic rate of carbon attack) and basicity (thermodynamic proton affinity) are distinct properties that diverge in polar protic solvents, where heavy H-bond solvation slows small hard anions relative to large soft ones. Mechanistically, SN2 has exactly one transition state and no intermediate — its energy profile has a single maximum, never two humps with a dip, since bond formation and bond breaking are genuinely simultaneous.

## 6. Analogy Library

- **Primary analogy**: A revolving door (backside attack, SN2) that only lets one person in as another is simultaneously pushed out the opposite side — the two "events" happen at the same instant, in the same single motion, never sequentially.
- **Breaking point**: The revolving-door analogy conveys the concerted, single-transition-state nature well but doesn't naturally capture the nucleophilicity-vs-basicity solvation argument (MC-2) or the substrate/solvent dependence of clean inversion (MC-1) — those need the explicit solvation-shell mechanism and the primary-vs-secondary substrate comparison.
- **Anti-analogy**: Do NOT say "SN2 nucleophile strength always matches how basic the ion is" — this directly reinforces MC-2 by treating basicity and nucleophilicity as interchangeable.

## 7. Demonstration Library

- **Demonstration 1 (primary vs. secondary substrate stereochemical outcome)**: Contrast clean inversion for a primary substrate in aprotic solvent against partial racemization for a secondary substrate in protic solvent.
- **Demonstration 2 (solvation-shell nucleophilicity argument)**: Present the explicit H-bond-solvation comparison between F⁻ and I⁻ in methanol, deriving the reversed nucleophilicity order from desolvation energy.
- **Demonstration 3 (side-by-side SN2/SN1 energy profiles)**: Draw both profiles explicitly, counting maxima/minima and connecting the count to intermediate presence/absence.

## 8. Discovery Lesson

**Opening**: "Does SN2 always give a perfectly, completely inverted product, no matter the substrate?"

**Exploration**: Students examine a secondary substrate in a polar protic solvent, discovering competing SN1 contaminates the inversion with racemization.

**Synthesis**: Guide toward: clean inversion requires conditions that suppress SN1 — primary substrate, strong nucleophile, aprotic solvent.

**Closure**: "Does SN2's energy diagram have one hump or two?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the primary-vs-secondary substrate stereochemical-outcome comparison explicitly.
- **TA-2 (TELL)**: State the nucleophilicity-vs-basicity distinction explicitly, anchored to the solvation-shell mechanism.
- **TA-3 (DO)**: Student predicts the dominant nucleophile in a new protic-vs-aprotic solvent scenario.
- **TA-4 (TEST-THINKING)**: Present the "how many steps" probe and ask the student to justify a one-hump energy profile from the concerted mechanism.

## 10. Voice Teaching

Whenever SN2 stereochemistry is discussed, narrate "clean inversion needs primary substrate, aprotic solvent — check before assuming 100% inversion." Whenever nucleophile strength is compared, state "always specify the solvent before ranking nucleophilicity" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly predict clean vs. contaminated stereochemical outcomes from substrate/solvent conditions, (b) correctly rank nucleophile strength given solvent type, (c) correctly draw a one-maximum, no-intermediate SN2 energy profile.

- **FA-1**: "Would SN2 on a secondary substrate in water give perfectly clean inversion? Explain." — targets MC-1.
- **FA-2**: "Why is I⁻ a better nucleophile than F⁻ toward CH₃Br in methanol, despite being the weaker base?" — targets MC-2.
- **FA-3**: "How many transition states and intermediates does SN2 have? Draw the energy profile." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-2 among students who have only encountered basicity comparisons without exposure to a protic-solvent nucleophilicity reversal.

**Delayed retrieval**: Re-probe MC-1's substrate/solvent dependence and MC-2's solvation argument before `chem.hal.elimination` requires fluent competition reasoning between substitution and elimination pathways.

## 12. Recovery Notes

- **S3 (stuck)**: For the clean-inversion overgeneralization, have the student explicitly classify the substrate (primary/secondary/tertiary) and solvent (protic/aprotic) before predicting stereochemical outcome.
- **S4 (frustrated)**: Normalize — the nucleophilicity/basicity divergence in protic solvents is genuinely counterintuitive and a very common confusion on first exposure.
- **S6 (collision)**: Use the explicit solvation-shell argument for MC-2; use the side-by-side energy-profile comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why SN2's energy profile has exactly one maximum.

## 13. Memory & Review

Tag as two conceptual-correction memories (substrate/solvent-dependent stereochemical cleanliness; nucleophilicity-vs-basicity solvation dependence) plus one procedural memory (drawing the correct one-maximum SN2 energy profile). Schedule a spaced check at ~1 week and again before `chem.hal.elimination`.

## 14. Transfer Map

Feeds directly into `chem.alc.alcohols` (SN2 is a key alcohol-synthesis route), `chem.hal.elimination` (SN2/E2 competition directly requires this mechanism's substrate/nucleophile/solvent reasoning), and `chem.hal.grignard` (nucleophilic substitution reasoning underlies Grignard reactivity patterns).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
