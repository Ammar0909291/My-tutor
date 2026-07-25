# chem.period.atomic-radius — Atomic and Ionic Radius Trends

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.period.atomic-radius` |
| Domain | Periodic Table & Periodicity |
| Requires | `chem.period.modern-periodic-law` |
| Unlocks | `chem.period.periodic-properties` |
| Difficulty | developing |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Atomic radius DECREASES across a period (not increases), because effective nuclear charge (Zeff) rises faster than the modest additional shielding from electrons added to the SAME shell — sodium (186 pm) is genuinely larger than chlorine (99 pm) despite chlorine having more electrons, since Zeff rises from ~2.2 to ~6.1 across period 3, pulling the electron cloud inward; ionic radius depends on whether electrons are LOST (cation, smaller — same nuclear charge, less electron-electron repulsion) or GAINED (anion, larger — same nuclear charge, more electron-electron repulsion), NOT on the numeric sign of the charge itself (Na⁺ at 102 pm is genuinely smaller than Cl⁻ at 181 pm, which is smaller than neutral Na at 186 pm); and the general "radius increases down a group" rule has a genuine, dramatic exception at the period 5-to-6 d-block transition, where the lanthanide contraction (14 poorly-shielding f-electrons inserted before 5d→6d) nearly cancels the expected increase, making Zr and Hf (~155 vs ~159 pm) almost identical in size despite being two periods apart.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing sodium's (Z=11) and chlorine's (Z=17) atomic radii directly, discovering sodium is genuinely LARGER despite having fewer electrons.

**Representational**: A three-way size comparison diagram of Na (neutral, 186 pm), Na⁺ (102 pm), and Cl⁻ (181 pm), visually ordering them from smallest to largest.

**Abstract**: The general Zeff-versus-shielding argument explaining the across-period decrease; the electron-loss-versus-gain (not charge-sign) argument explaining cation/anion size; the lanthanide-contraction exception to the down-group increase rule.

**Transfer**: Given an unfamiliar pair of atoms or ions, correctly predicting relative size using Zeff/shielding reasoning (not electron count alone), correctly ranking a neutral atom against its cation and anion using the electron-loss/gain principle, and correctly recognizing the period 5/6 d-block exception where relevant.

## 3. Why Beginners Fail

Students assume more electrons directly means a larger atom (treating "electron count" as a proxy for "electron cloud size"), missing that nuclear charge rises simultaneously and, with poor same-shell shielding, actually PULLS the electron cloud inward, making atoms across a period genuinely SMALLER despite having more electrons; they conflate the SIGN of an ion's charge with its physical size (assuming "positive = more of something = bigger"), missing that the correct determinant is whether electrons were LOST (smaller, cation) or GAINED (larger, anion), independent of charge sign labeling; and they apply the "radius increases down a group" rule without exception across the entire periodic table, missing that the lanthanide contraction creates a genuine, dramatic exception specifically at the period 5-to-6 d-block transition, where the expected size increase nearly vanishes.

## 4. Misconception Library

### MC-1: Atomic radius increases across a period (more electrons = bigger atom)
- **Probe**: "Why does sodium (Z=11) have a larger atomic radius than chlorine (Z=17), even though chlorine has more electrons?"
- **Characteristic phrase**: "Chlorine is bigger than sodium because it has more electrons and therefore a larger electron cloud."
- **Trigger (Type 2, perceptual intuition)**: Students intuitively equate "more electrons" with "bigger atom," a plausible-sounding count-to-size heuristic that fails to account for the simultaneous increase in nuclear charge.
- **Conflict evidence [P28]**: Across period 3, electrons are added to the SAME n=3 shell, but nuclear charge rises from 11 (Na) to 17 (Cl) — since same-shell electrons shield each other only poorly, effective nuclear charge (Zeff) experienced by any outer electron rises substantially, from roughly 2.2 (Na) to roughly 6.1 (Cl); this stronger effective pull draws the electron cloud inward, making Na (186 pm) genuinely LARGER than Cl (99 pm), despite chlorine having more electrons.
- **Bridge [P30]**: Atomic size depends on the BALANCE between electron count (which alone might suggest a bigger cloud) and nuclear attraction strength (which pulls that cloud inward) — across a period, the nuclear-charge increase wins decisively over the modest additional shielding, producing an overall size DECREASE, not increase.
- **Replacement [P31]**: Atomic radius DECREASES across a period, driven by rising effective nuclear charge (Zeff) outpacing the poor same-shell shielding from added electrons — electron count alone never predicts size correctly.
- **Discrimination pairs [P33]**: Na (Zeff≈2.2, 186 pm, larger) vs. Cl (Zeff≈6.1, 99 pm, smaller) — more electrons, but genuinely smaller size, due to the dominant Zeff effect.
- **S6 repair path**: Present explicit Zeff values for both elements, connecting the numeric increase directly to the observed radius decrease.

### MC-2: Cation radius > anion radius for the same element
- **Probe**: "Compare the radius of Na (neutral) with Na⁺ and with Cl⁻. Which is largest?"
- **Characteristic phrase**: "Na⁺ is larger than Cl⁻ because Na has a positive charge and Cl has a negative charge."
- **Trigger (Type 1, overgeneralization)**: Students conflate the mathematical SIGN of a charge with physical size, associating "positive = more of something = bigger" without examining what's actually changing at the electron level.
- **Conflict evidence [P28]**: Na⁺ (having LOST one electron, same Z=11, but now only 10 electrons instead of 11, meaning less electron-electron repulsion at the same nuclear charge, pulling the remaining electrons in tighter) shrinks to 102 pm from neutral Na's 186 pm; Cl⁻ (having GAINED one electron, Z=17, now 18 electrons instead of 17, meaning more electron-electron repulsion at the same nuclear charge, pushing electrons apart) expands to 181 pm; the correct size order is Na⁺ (102 pm) < Cl⁻ (181 pm) < Na (186 pm) — directly contradicting a charge-sign-based size assumption.
- **Bridge [P30]**: The charge's SIGN (+/−) is merely a label describing whether electrons were removed or added — the physical size consequence comes from the resulting change in electron-electron repulsion at a FIXED nuclear charge, not from the sign itself; losing electrons always shrinks an ion (less repulsion, same pull), gaining electrons always expands it (more repulsion, same pull).
- **Replacement [P31]**: Cations (electrons lost) are always smaller than their neutral parent atom; anions (electrons gained) are always larger — this is determined by electron loss/gain and its effect on electron-electron repulsion, never by the charge's numeric sign alone.
- **Discrimination pairs [P33]**: Na⁺ (102 pm, electrons LOST, smaller than neutral Na) vs. Cl⁻ (181 pm, electrons GAINED, larger than neutral Cl) — the sign alone doesn't predict which is bigger; the loss/gain direction does.
- **S6 repair path**: Present the explicit three-way size ordering (Na⁺ < Cl⁻ < Na) with the electron-count reasoning for each, breaking the sign-based assumption directly.

### MC-3: Period 6 d-block elements are always larger than period 5 congeners
- **Probe**: "Compare the atomic radii of Zr (period 5, Group 4) and Hf (period 6, Group 4). Which is larger?"
- **Characteristic phrase**: "Hf is larger than Zr because it is in a lower period."
- **Trigger (Type 5, instruction-induced)**: The general "radius increases down a group" rule is taught first, thoroughly, and applied broadly before the specific period 5-to-6 d-block exception is introduced, leading students to apply the rule without exception.
- **Conflict evidence [P28]**: The lanthanide contraction — the insertion of 14 poorly-shielding f-electrons (filling the 4f subshell) between the 5d and 6d transition-metal rows — causes Zr and Hf to have nearly IDENTICAL atomic radii (~155 pm vs. ~159 pm), almost entirely cancelling the size increase the general down-group rule would predict; this near-identical sizing is precisely why separating zirconium and hafnium is one of the most notoriously difficult separations in industrial chemistry — their nearly identical radii produce nearly identical chemical behavior.
- **Bridge [P30]**: The general down-group radius-increase rule assumes each successive period simply adds another full shell of poorly-shielding electrons at a proportionally increasing distance — but the lanthanide series' f-electrons are inserted specifically between periods 5 and 6's d-block rows, adding substantial extra nuclear charge (14 additional protons) while providing very poor shielding, largely cancelling the expected radius increase for elements immediately following the lanthanides.
- **Replacement [P31]**: The general "radius increases down a group" rule has a genuine, well-documented exception at the period 5-to-6 d-block transition, caused by the lanthanide contraction — always check for this exception when comparing period 5 and period 6 transition metals specifically.
- **Discrimination pairs [P33]**: A typical group (radius clearly increases down the group, e.g., Na→K→Rb) vs. Zr/Hf specifically (radius barely changes, due to the lanthanide contraction cancelling the expected increase).
- **S6 repair path**: Present the explicit Zr/Hf radius values (155 vs. 159 pm) alongside the lanthanide-contraction mechanism, connecting the near-identical sizing directly to the 14 inserted f-electrons.

## 5. Explanation Library

**Primary explanation**: Atomic radius decreases across a period because effective nuclear charge (Zeff) rises substantially as protons are added, while same-shell electrons shield each other only poorly — this stronger net attraction pulls the electron cloud inward, outweighing the modest size contribution from additional electrons. Ionic radius is determined by whether electrons are lost (cations, smaller — reduced electron-electron repulsion at fixed nuclear charge) or gained (anions, larger — increased repulsion at fixed nuclear charge), never by the charge's numeric sign alone.

**Secondary explanation (lanthanide contraction framing)**: While atomic radius generally increases down a group (each period adding a new, more distant shell), this trend has a genuine exception at the period 5-to-6 d-block transition — the lanthanide series' 14 f-electrons, inserted between these rows, add substantial nuclear charge with very poor shielding, nearly cancelling the expected size increase and making period 5 and period 6 congeners (like Zr and Hf) almost identical in size.

## 6. Analogy Library

- **Primary analogy**: A tug-of-war between two effects pulling in opposite directions — adding more people to a team (electrons) might suggest a "bigger" team, but if the anchor point (nuclear charge) also gets dramatically stronger at the same time, the whole team gets pulled in TIGHTER overall, not spread out further.
- **Breaking point**: The tug-of-war analogy conveys the Zeff-versus-electron-count balance well but doesn't naturally capture the electron-loss/gain-versus-charge-sign distinction for ions or the lanthanide contraction — those need the explicit electron-repulsion and f-electron-insertion arguments.
- **Anti-analogy**: Do NOT say "more electrons means a bigger atom" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (Zeff-vs-radius comparison across period 3)**: Present explicit Zeff and radius data across period 3 (Na through Cl), having students connect the rising Zeff directly to the falling radius.
- **Demonstration 2 (three-way Na/Na⁺/Cl⁻ size ordering)**: Present the explicit radius values for Na, Na⁺, and Cl⁻ side by side, having students explain each size using electron-count-versus-nuclear-charge reasoning.

## 8. Discovery Lesson

**Opening**: "Chlorine has more electrons than sodium. Do you expect chlorine's atom to be bigger?"

**Exploration**: Students examine Zeff values across period 3, discovering the dramatic rise from Na to Cl, and connect this directly to the actual (opposite-of-naive-expectation) radius trend.

**Synthesis**: Guide toward: atomic size depends on the balance between electron count and nuclear attraction, with nuclear attraction (Zeff) dominating across a period.

**Closure**: "Zr and Hf are two periods apart. Does the general down-group trend predict Hf should be noticeably bigger than Zr?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit Zeff-vs-radius data across period 3.
- **TA-2 (TELL)**: State the electron-loss/gain principle explicitly, worked through for the Na/Na⁺/Cl⁻ three-way comparison.
- **TA-3 (DO)**: Student predicts relative radius for a new pair of atoms or ions using Zeff/electron-repulsion reasoning.
- **TA-4 (TEST-THINKING)**: Present MC-3's Zr/Hf probe and ask the student to explain the near-identical sizing using the lanthanide contraction.

## 10. Voice Teaching

Whenever atomic radius trends are discussed, narrate "Zeff versus shielding" explicitly as the deciding factor, never relying on electron count alone. Whenever comparing period 5 and period 6 d-block elements specifically, flag the lanthanide contraction as a standing exception to check.

## 11. Assessment

**Mastery gate**: Student can (a) correctly explain the across-period radius decrease using Zeff/shielding reasoning, (b) correctly rank a neutral atom against its cation and anion using electron-loss/gain reasoning, not charge sign, (c) correctly identify the period 5/6 d-block lanthanide-contraction exception when relevant.

- **FA-1**: "Why does sodium have a larger atomic radius than chlorine, despite chlorine having more electrons?" — targets MC-1.
- **FA-2**: "Compare the radius of Na, Na⁺, and Cl⁻. Which is largest?" — targets MC-2.
- **FA-3**: "Compare the atomic radii of Zr and Hf. Which is larger?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've just learned "more electrons" as a general size-related concept from prior contexts.

**Delayed retrieval**: Re-probe MC-1's Zeff reasoning and MC-2's electron-loss/gain principle before `chem.period.periodic-properties` synthesizes atomic radius with other periodic trends.

## 12. Recovery Notes

- **S3 (stuck)**: For the across-period confusion, present explicit Zeff numbers directly rather than reasoning abstractly about "more electrons."
- **S4 (frustrated)**: Normalize — "more electrons = bigger" is a very reasonable, common first intuition that genuinely doesn't account for the simultaneous nuclear-charge increase.
- **S6 (collision)**: Use the three-way Na/Na⁺/Cl⁻ comparison for MC-2; use the explicit lanthanide-contraction mechanism for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why Cl⁻ is larger than neutral Cl despite both having the same nuclear charge.

## 13. Memory & Review

Tag as a conceptual-correction memory (Zeff drives the across-period decrease; electron loss/gain, not sign, drives ionic size) plus an exception-awareness memory (lanthanide contraction at period 5/6 d-block). Schedule a spaced check at ~1 week and again before `chem.period.periodic-properties`.

## 14. Transfer Map

Feeds directly into `chem.period.periodic-properties` (synthesizes atomic radius with ionization energy, electron affinity, and other periodic trends established in prior concepts).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
