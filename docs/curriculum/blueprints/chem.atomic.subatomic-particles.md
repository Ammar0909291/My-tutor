# Teaching Blueprint: Subatomic Particles

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | chem.atomic.subatomic-particles |
| **Name** | Subatomic Particles |
| **Domain** | Atomic Structure |
| **Difficulty** | Foundational |
| **Bloom Level** | Remember |
| **Estimated Hours** | 2 |
| **Mastery Threshold** | 0.7 |
| **Prerequisites** | chem.atomic.atomic-theory |
| **Unlocks** | chem.atomic.atomic-spectra, chem.period.classification |

---

## 1. Concept Spine

**One-sentence definition:** An atom's identity is fixed entirely by its proton count (atomic number, Z); neutron count can vary (isotopes) without changing the element, and electron count can vary (ions) without changing either the element or the isotope — three independently adjustable counts, each with a specific, non-interchangeable role.

**The core insight:** Three subatomic particles — proton (positive, defines element identity), neutron (neutral, adds mass without changing identity), electron (negative, adjustable via ionization) — combine in exactly three independent counts to fully describe any atomic species. Confusing WHICH count changes for isotopes (neutrons, not protons) versus WHICH count changes for ions (electrons, not protons) is the central discrimination this concept builds, on top of correctly distinguishing mass number (an integer particle count) from atomic mass (a weighted-average, rarely-integer measured quantity).

**Conceptual chain:**
1. Protons (mass ≈1 u, charge +1) define element identity — atomic number Z = proton count, and changing Z changes the element itself.
2. Neutrons (mass ≈1 u, charge 0) add mass without affecting chemical identity — atoms of the same element (same Z) with different neutron counts are isotopes of each other.
3. Electrons (mass ≈1/1836 u, negligible for mass number purposes, charge -1) determine charge balance — a neutral atom has electron count = proton count; gaining or losing electrons (without changing protons) creates an ion, not a different element or isotope.
4. Mass number (A) = proton count + neutron count, always a whole integer for any specific isotope, computed by simple addition.
5. Atomic mass (the number on the periodic table, e.g. chlorine's 35.45) is a WEIGHTED AVERAGE across all naturally-occurring isotopes' masses, weighted by their natural abundance — rarely an integer, and not the mass number of any single isotope.
6. Ion charge directly tells you the electron adjustment: a +1 ion has LOST one electron (fewer electrons than protons); a -1 ion has GAINED one electron (more electrons than protons) — never adjust proton count to explain an ion's charge.

**Central relations:**
- Atomic number Z = proton count = defines the element.
- Mass number A = protons + neutrons (integer, per isotope).
- Atomic mass (periodic table value) = weighted average across isotope masses and abundances (not an integer, not any single isotope's mass number).
- Ion charge = proton count − electron count (electrons adjust, protons never do, for ordinary chemical ionization).

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- A "build an atom" card exercise: given a target species (e.g. "chlorine-37, as a Cl⁻ ion"), select the correct number of proton, neutron, and electron tokens.
- A weighted-average analogy using classroom test scores: if 76% of students scored 90 and 24% scored 70, the CLASS AVERAGE (not any individual student's score) is the weighted average — directly paralleling atomic mass.

### Representational (Iconic)
- A three-particle property table: particle name, relative mass, charge, location (nucleus vs. shell) — proton/neutron/electron side by side.
- An isotope abundance bar chart for chlorine (³⁵Cl at 75.77%, ³⁷Cl at 24.23%) with the weighted-average calculation shown directly beneath, arriving at 35.45.

### Abstract (Symbolic)
- A = Z + N (mass number = atomic number + neutron count), always a whole-number identity for a specific isotope.
- Ion notation: charge = protons − electrons; e.g. Na⁺ has 11 protons, 10 electrons (11−10 = +1); Cl⁻ has 17 protons, 18 electrons (17−18 = −1).

### Transfer (+)
- Nuclear chemistry (isotope stability, radioactive decay) depends entirely on correctly distinguishing proton count (fixed, defines element) from neutron count (variable, defines isotope and stability).
- Ionic bonding and compound formulas (later domains) depend entirely on correctly predicting electron gain/loss from an element's typical ion charge.
- Mass spectrometry (an analytical technique) directly measures isotope abundances, the exact data used to compute the weighted-average atomic mass introduced here.

---

## 3. Why Beginners Fail

**Mode 1 — Treating mass number and atomic mass as the same quantity:** Correct: mass number is an integer count of protons plus neutrons for ONE SPECIFIC isotope; atomic mass is a weighted average across ALL naturally-occurring isotopes' masses and abundances — the periodic table's atomic mass is essentially never a whole number and does not correspond to any single isotope's actual mass number.

**Mode 2 — Believing different isotopes are different elements:** Correct: isotopes share identical proton count (identical Z, identical chemical identity, identical element) and differ ONLY in neutron count — the language "carbon-12 vs. carbon-14" already tells you they're both carbon, just with different mass numbers.

**Mode 3 — Assuming ion electron count always equals proton count:** Correct: a NEUTRAL atom has electron count = proton count; an ION (with nonzero charge) has electron count adjusted from that baseline by exactly the amount indicated by the charge — protons never change during ordinary chemical ionization.

---

## 4. Misconception Library

### MC-1: "Mass number = atomic mass"
- **Probe:** "Chlorine's atomic mass is 35.45. Is there a chlorine isotope with mass number 35.45?"
- **Characteristic phrase:** "The atomic mass is 35.45, so the mass number is 35.45."
- **Trigger:** Notation-induced — both quantities are called "mass" and both appear as numbers near an element's symbol, inviting conflation without an explicit distinction being taught.
- **Conflict evidence [P28]:** Mass number is ALWAYS a whole-number count of protons plus neutrons for one specific isotope — no isotope can have a fractional mass number, since you cannot have a fractional neutron. Chlorine-35 (mass number 35, integer) and chlorine-37 (mass number 37, integer), weighted by their actual natural abundances (75.77% and 24.23% respectively), average to 35.45 — the periodic table value, which belongs to NEITHER isotope individually.
- **Bridge [P30]:** "Mass number counts whole protons and neutrons — always an integer, for one specific isotope. Atomic mass is a weighted average across the abundances of ALL naturally occurring isotopes of that element. ³⁵Cl and ³⁷Cl together, weighted by how common each one actually is in nature, give 35.45 as the average — not the mass number of either one."
- **Replacement [P31]:** Mass number (integer, per isotope) and atomic mass (weighted average across isotopes, rarely integer) are different quantities describing different things.
- **Discrimination pairs [P33]:** ³⁵Cl's mass number (35, exact integer for that specific isotope) vs. chlorine's atomic mass (35.45, weighted average across both natural isotopes) — same element, genuinely different numbers with different meanings.
- **S6 repair path:** Run the weighted-average class-test-score analogy (Section 2) explicitly, then re-apply it to the chlorine isotope data before returning to the probe.

### MC-2: "Isotopes are different elements"
- **Probe:** "¹²C and ¹⁴C — are these the same element? How do you know? What is the same? What is different?"
- **Characteristic phrase:** "C-12 and C-14 are different elements because their masses are different."
- **Trigger:** Language contamination — differing numbers attached to the same element symbol, combined with an intuitive "different number = different thing" heuristic.
- **Conflict evidence [P28]:** Element identity is determined by proton count (Z) ALONE. Both ¹²C and ¹⁴C have exactly Z=6 (six protons) — both are unambiguously carbon, participating in identical chemical bonds and reactions. The neutron count difference (6 vs. 8) changes only mass and nuclear stability (¹⁴C is radioactive, ¹²C is stable), never chemical identity.
- **Bridge [P30]:** "Element identity is Z only — proton count, full stop. Both ¹²C and ¹⁴C have Z=6, so both are carbon, no exceptions. The neutron difference affects mass and nuclear stability, but chemically, in every reaction, they behave identically as carbon."
- **Replacement [P31]:** Isotopes share identical proton count (same element, same Z) and differ only in neutron count (different mass, potentially different nuclear stability) — never a different element.
- **Discrimination pairs [P33]:** "Different element" (would require different proton count, e.g. carbon Z=6 vs. nitrogen Z=7) vs. "different isotope of the same element" (same proton count, different neutron count, e.g. ¹²C vs. ¹⁴C, both Z=6).
- **S6 repair path:** Explicitly state and verify the proton count for both isotopes side by side before returning to the probe.

### MC-3: "Ion electron count equals proton count"
- **Probe:** "A sodium ion Na⁺ has how many electrons? A chloride ion Cl⁻ has how many electrons?"
- **Characteristic phrase:** "Na⁺ has 11 electrons because sodium has 11 protons."
- **Trigger:** Instruction-induced — the neutral-atom rule (electrons = protons) is over-generalized to ions without recognizing that ionization specifically changes electron count while leaving proton count untouched.
- **Conflict evidence [P28]:** Na⁺ forms when a neutral sodium atom (11 protons, 11 electrons) LOSES one electron, giving 11 protons but only 10 electrons — the resulting +1 charge (11 protons − 10 electrons = +1) is exactly consistent with the observed ion charge. Assuming Na⁺ still has 11 electrons would predict zero net charge, contradicting the ion's defining +1 charge.
- **Bridge [P30]:** "The charge tells you the electron adjustment directly: Na⁺ lost one electron, going from 11 to 10 — protons stay at 11 throughout. Cl⁻ gained one electron, going from 17 to 18 — protons stay at 17 throughout. Protons never change during ordinary chemical ionization; only electrons move."
- **Replacement [P31]:** Ion formation changes electron count (never proton count); the ion's charge value directly indicates how many electrons were gained (negative ion) or lost (positive ion) relative to the neutral atom.
- **Discrimination pairs [P33]:** Neutral Na (11 protons, 11 electrons, charge 0) vs. Na⁺ (11 protons, 10 electrons, charge +1) — protons identical in both, only electron count differs.
- **S6 repair path:** Walk through the proton-minus-electron charge formula explicitly for both Na⁺ and Cl⁻ before returning to the probe.

---

## 5. Explanation Library

**Explanation A — Three particles, three independent roles (conceptual):**
"Protons define WHICH element you have — change proton count, and you have a genuinely different element. Neutrons add mass without changing which element you have — change neutron count, and you have a different isotope of the SAME element. Electrons balance charge and are the ones that move during ionization — change electron count (protons unchanged), and you have a different ion of the same element and isotope. Each particle has one job; confusing which particle changes for which phenomenon (isotope vs. ion) is the single most common error in this topic."

**Explanation B — Why atomic mass is rarely a whole number (conceptual):**
"The periodic table's atomic mass is a weighted average, computed exactly like a class average test score: multiply each isotope's mass by its natural abundance (as a decimal fraction), and sum across all naturally-occurring isotopes. Because it's an average across two or more different integer mass numbers, weighted by non-round abundance percentages, the result is essentially never itself a whole number — this is expected, not an error."

---

## 6. Analogy Library

**Primary analogy — A class average vs. an individual student's score:**
Atomic mass is like a class's average test score — a single number describing the whole population, even though no individual student actually scored that exact average. Mass number is like one specific student's actual score — always a real, achievable, integer value for that one student (isotope).

**Breaking point:** A class average can, by coincidence, exactly equal one student's actual score; an element's atomic mass, while it CAN occasionally land close to one isotope's mass number (especially for elements with one hugely dominant isotope), is still computed by the same averaging process, not as a special exception — the analogy holds throughout, it's just a coincidence when the numbers land close together.

**Anti-analogy:** Do NOT describe an ion as having "gained or lost a proton" under any ordinary chemical circumstance — this reinforces MC-3's core error; only nuclear reactions change proton count, never ordinary chemical ionization.

---

## 7. Demonstration Library

**Demo 1 — Build-an-atom card exercise:**
Present target species (e.g. "potassium-39, as a K⁺ ion") and have students select the correct proton/neutron/electron counts, directly targeting all three misconceptions simultaneously.

**Demo 2 — Chlorine isotope weighted-average calculation:**
Walk through the explicit weighted-average calculation for chlorine (75.77% × 35 + 24.23% × 37 = 35.45), directly targeting MC-1.

**Demo 3 — Proton-electron charge table:**
Present a table of 4-5 common ions (Na⁺, Cl⁻, Mg²⁺, O²⁻) with proton count, electron count, and resulting charge computed explicitly for each, directly targeting MC-3.

---

## 8. Discovery Lesson

**Opening (5 min):** "Chlorine's atomic mass on the periodic table is 35.45. But mass number always has to be a whole number — you can't have a fractional neutron. What's going on?"

**Exploration (15 min):**
- Run Demo 2 (chlorine weighted-average calculation), directly targeting MC-1.
- Build Explanation B (why atomic mass is rarely whole) step by step.

**Synthesis (10 min):**
- Run Demo 1 (build-an-atom exercise) across several isotope and ion targets, directly targeting MC-2 and MC-3.
- Introduce Explanation A (three particles, three roles) as the organizing framework.

**Closure:** "Every one of the three subatomic particles has exactly one job: protons decide the element, neutrons decide the isotope, electrons decide the ion. Keep those three jobs straight, and you'll never again wonder which count is supposed to change."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [DEMONSTRATE + EXPLAIN]:** Demo 2 (chlorine weighted-average calculation) alongside Explanation B, directly probing MC-1.

**TA-2 [EXPLAIN]:** Deliver Explanation A (three particles, three roles) as the organizing framework.

**TA-3 [PRACTICE]:** Demo 1 (build-an-atom card exercise), directly probing MC-2.

**TA-4 [PRACTICE]:** Demo 3 (proton-electron charge table), directly probing MC-3.

---

## 10. Voice Teaching

**Opening:**
"Chlorine's atomic mass on the periodic table is 35.45. But mass number has to be a whole number — you can't have a third of a neutron. So what does that 35.45 actually mean?"

**At the isotope clarification:**
"Element identity comes down to exactly one thing: proton count. Carbon-12 and carbon-14 both have six protons — both are carbon, full stop, chemically identical in every reaction. The neutron count is different, which changes the mass and, in carbon-14's case, makes it radioactive. But it never changes what element you're looking at."

**At the ion clarification:**
"Here's the rule: protons never move during ordinary chemistry. Only electrons do. Sodium loses one electron to become Na⁺ — eleven protons the whole time, but electrons drop from eleven to ten. That missing electron is exactly what the plus-one charge is telling you."

---

## 11. Assessment

**Mastery gate:** Student correctly distinguishes mass number from atomic mass, correctly identifies isotopes as sharing element identity, and correctly computes electron count for a given ion. Score ≥ 70%.

**FA-1 — Mass number vs. atomic mass:**
*Q: Boron has two natural isotopes: ¹⁰B (19.9% abundance) and ¹¹B (80.1% abundance). Is boron's periodic-table atomic mass closer to 10 or 11? Why?*
Expected: Closer to 11, since ¹¹B is far more abundant (80.1% vs. 19.9%) and the weighted average is pulled toward the dominant isotope's mass.
Threshold: Must correctly reason from abundance weighting, not just guess a number.

**FA-2 — Isotope identity:**
*Q: Uranium-235 and uranium-238 — are these the same element? Justify using proton count.*
Expected: Yes, same element — both have Z=92 (92 protons); they differ only in neutron count (143 vs. 146), making them isotopes of the same element, not different elements.
Threshold: Must explicitly cite proton count as the identity criterion.

**FA-3 — Ion electron count:**
*Q: A magnesium ion Mg²⁺ has how many electrons, given magnesium's atomic number is 12?*
Expected: 10 electrons (12 protons − 2, since the +2 charge indicates 2 electrons were lost).
Threshold: Must correctly apply the charge = protons − electrons relationship, not simply restate the proton count.

**Confidence calibration:** After FA-1, students rate confidence before revealing the answer; students confident but wrong are walked through Demo 2's weighted-average calculation again before re-attempting a parallel item.

**Delayed retrieval (session + 3):** "Explain why an element's atomic mass is almost never a whole number, using the concept of weighted average." Expected: atomic mass averages across multiple isotopes' integer mass numbers, weighted by non-round natural abundances.

---

## 12. Recovery Notes

**S3:** Student can define proton/neutron/electron but cannot apply the three-role framework to a novel species. Re-run Demo 1 (build-an-atom exercise) with a new target species before returning to the probe.

**S4:** Student conflates mass number and atomic mass (MC-1). Re-run Demo 2's weighted-average calculation explicitly, step by step, before returning to the probe.

**S6:** Student is anxious about "why does an average even make sense for something as fixed as an atom." Anchor entirely in the class-test-score analogy (concrete, familiar) before returning to the abstract atomic-mass framing.

**S9:** Extend into isobars/isotones (equal mass number/equal neutron count across different elements) as enrichment, previewing nuclear chemistry content.

---

## 13. Memory & Review

**Memory type:** Conceptual/procedural (three-particle-role framework, weighted-average computation, charge-electron relationship) — retrieval practice should emphasize applying the framework to novel species, not just reciting particle properties.

**Spaced retrieval schedule:**
- Session + 1: "Compute an element's atomic mass from given isotope masses and abundances."
- Session + 3: "Explain why two isotopes are the same element despite different masses."
- Session + 7: "Compute electron count for a given ion from its charge and atomic number."

**Interleaving partners:** chem.atomic.atomic-theory (prerequisite — historical discovery of these particles), chem.atomic.atomic-spectra (successor — electron energy levels), chem.period.classification (successor — periodic table organization by atomic number).

---

## 14. Transfer Map

**Near transfer:** Atomic spectra and periodic classification (the immediate successor concepts) both depend directly on correctly distinguishing proton count (element identity, periodic table position) from electron behavior (spectra, reactivity).

**Far transfer:** Nuclear chemistry and radioactivity (isotope stability directly depends on neutron-to-proton ratio); ionic bonding and compound formula prediction (directly depends on predictable electron gain/loss patterns); mass spectrometry (directly measures the isotope abundance data used in weighted-average calculations here).

**Structural abstraction:** "A single measured quantity (like atomic mass) can be a statistical composite across multiple underlying discrete values (isotope mass numbers), and understanding a phenomenon requires knowing WHICH underlying quantity actually changes for a given transformation (isotope vs. ion vs. element)." This composite-quantity-vs-underlying-discrete-values distinction recurs throughout chemistry, from atomic mass to reaction rate averages to bond-order calculations.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** chem.atomic.atomic-theory (historical discovery narrative) is necessary and sufficient.
- **Unlock readiness:** Both direct unlocks (atomic spectra, periodic classification) depend on the proton-count-as-identity framework established here; sequencing is well-motivated.
- **Difficulty calibration:** Foundational/Remember at 0.7 mastery threshold is appropriate for the particle-property recall content, though the weighted-average and ion-charge reasoning arguably approach Understand-level — flagged as a minor calibration note, not requiring KG modification.
- **No open issues:** description, prerequisites, and unlocks are internally consistent with the Chemistry KG's Atomic Structure domain.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
