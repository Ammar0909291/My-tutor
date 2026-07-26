# chem.period.electron-affinity — Electron Affinity

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.period.electron-affinity` |
| Domain | Periodic Table & Periodicity |
| Requires | `chem.period.modern-periodic-law` |
| Unlocks | `chem.bond.covalent-bonding`, `chem.bond.ionic-bonding`, `chem.period.periodic-properties` |
| Difficulty | developing |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Electron affinity (measured as electron-gain enthalpy, ΔegH) quantifies the energy change when a gaseous atom gains an electron, with more negative ΔegH indicating a stronger, more exothermic (favorable) tendency to gain an electron — genuine periodic anomalies exist (F's electron gain enthalpy is less negative than Cl's, due to F's small n=2 shell causing high electron-electron repulsion upon addition, distinct from the separate half-filled-subshell anomaly seen at N versus O), and second (and later) electron affinities are always positive (endothermic) since adding an electron to an already-negative ion requires overcoming electron-electron repulsion — meaning species like O²⁻ never form spontaneously in the gas phase, only becoming stable when embedded in an ionic crystal lattice whose large lattice energy compensates.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing the tabulated ΔegH values for fluorine (−328 kJ/mol) and chlorine (−349 kJ/mol) and determining which element more strongly attracts an added electron.

**Representational**: A periodic-trend chart of first electron affinities across period 2 and period 3, with the F/Cl anomaly and N/O anomaly marked as distinct exceptions with distinct causes.

**Abstract**: The sign convention (negative ΔegH = exothermic = favorable = strong attraction) and the distinct physical mechanisms behind two separate anomaly types (small-shell electron-electron repulsion at F vs. half-filled-subshell stability at N).

**Transfer**: Given an unfamiliar pair of elements' electron affinities (including multi-electron cases like O⁻→O²⁻), correctly reasoning about sign, magnitude, and whether the anomaly (if any) stems from shell-size repulsion or half-filled-subshell stability.

## 3. Why Beginners Fail

Students interpret a more negative ΔegH value as indicating a weaker tendency to gain an electron (importing the everyday sense that "negative" means "less" or "unfavorable," rather than the thermodynamic convention where negative means exothermic/favorable); they assume the F-vs-Cl electron affinity anomaly has the same cause as the separate, better-known N-vs-O anomaly (both being lumped together as "half-filled subshell effects"); and they overgeneralize the observation that non-metals readily gain a first electron onto the assumption that gaining any subsequent electron must also be exothermic, missing that second electron affinities are reliably positive.

## 4. Misconception Library

### MC-1: More negative ΔegH means weaker tendency to gain an electron
- **Probe**: "ΔegH for fluorine is −328 kJ/mol and for chlorine is −349 kJ/mol. Which element has a stronger tendency to gain an electron?"
- **Characteristic phrase**: "F has ΔegH = −328 which is less negative than Cl's −349, so F gains electrons less readily than Cl."
- **Trigger (Type 4, notation-induced)**: Everyday language treats "negative" as meaning "less" or "unfavorable," colliding with the thermodynamic convention where a more negative ΔH indicates a more exothermic, more energetically favorable process.
- **Conflict evidence [P28]**: Negative ΔegH means energy is RELEASED when the electron is added — the process is exothermic and spontaneous; MORE negative therefore means MORE energy released, indicating a STRONGER attraction for the electron, so chlorine (−349 kJ/mol) genuinely attracts an added electron more strongly than fluorine (−328 kJ/mol) — this is a real, well-documented periodic anomaly.
- **Bridge [P30]**: The magnitude comparison must be interpreted through the sign convention, not read off as a plain number comparison — "more negative" and "stronger tendency" point the same direction, even though intuition about negative numbers often suggests the opposite.
- **Replacement [P31]**: For electron affinity, more negative ΔegH = stronger, more favorable tendency to gain an electron; less negative (or positive) ΔegH = weaker or unfavorable tendency.
- **Discrimination pairs [P33]**: Cl (−349 kJ/mol, stronger electron-gaining tendency) vs. F (−328 kJ/mol, weaker, despite F being higher up the group and generally more electronegative overall).
- **S6 repair path**: Explicitly restate the sign convention (negative = exothermic = favorable) before comparing the two numeric values, then re-ask which element attracts the electron more strongly.

### MC-2: The EA anomaly at F vs. Cl is the same as at N vs. O
- **Probe**: "Both N and F have less negative electron affinities than their right-side/down-side neighbors. Are these anomalies caused by the same effect?"
- **Characteristic phrase**: "F has a less negative EA than Cl because F's 2p subshell is half-filled."
- **Trigger (Type 5, instruction-induced)**: Students learn two separate electron-affinity anomalies (N vs. O; F vs. Cl) in close succession and, without the distinct mechanisms being emphasized separately, assume a single shared cause ("half-filled subshell") explains both.
- **Conflict evidence [P28]**: Nitrogen's anomaly genuinely is caused by a half-filled 2p³ subshell — adding an electron forces pairing in an already singly-occupied orbital, incurring spin-pairing repulsion; but fluorine has a 2p⁵ configuration (one vacancy, NOT half-filled), and its anomaly instead comes from the exceptionally small n=2 shell forcing the incoming electron into an already-crowded orbital, experiencing unusually high electron-electron repulsion — chlorine's larger 3p orbitals accommodate the added electron more comfortably, releasing more energy and giving a more negative EA.
- **Bridge [P30]**: Two different electron-configuration features (half-filled-subshell instability at N, small-shell crowding at F) can each independently cause an electron-affinity anomaly — superficial similarity ("both are less negative than expected") doesn't imply a shared underlying mechanism.
- **Replacement [P31]**: N's anomaly is a half-filled-subshell (pairing repulsion) effect; F's anomaly is a small-shell (electron-crowding) effect — genuinely distinct mechanisms that happen to produce a similarly-shaped deviation from the general trend.
- **Discrimination pairs [P33]**: Nitrogen (2p³, half-filled, pairing-repulsion anomaly) vs. fluorine (2p⁵, not half-filled, small-shell-crowding anomaly) — different electron configurations, different causes.
- **S6 repair path**: Write out N's and F's actual electron configurations side by side and have the student identify that F is not, in fact, half-filled, ruling out the shared-mechanism assumption directly.

### MC-3: The second electron affinity of oxygen is negative (adding electrons is always exothermic for non-metals)
- **Probe**: "O²⁻ is found in ionic oxides. Is the second electron affinity of oxygen positive or negative? Explain."
- **Characteristic phrase**: "O²⁻ forms readily because oxygen has a high electron affinity and gains electrons easily."
- **Trigger (Type 1, overgeneralization from the first EA)**: Students correctly learn that halogens and oxygen readily gain a first electron (negative first EA) and extend this pattern to any subsequent electron addition for the same or similar non-metals.
- **Conflict evidence [P28]**: The second electron affinity of oxygen is POSITIVE (≈+780 kJ/mol) — adding a second electron to an already-negatively-charged O⁻ ion requires overcoming substantial electron-electron repulsion between the incoming electron and the ion's existing negative charge, making the process endothermic; O²⁻ therefore does NOT form spontaneously in the gas phase and would be an unstable species there.
- **Bridge [P30]**: O²⁻'s real-world existence in ionic solids like MgO isn't explained by the second electron affinity being favorable at all — it's explained by the enormous lattice energy of the resulting ionic crystal (typically 3000-4000 kJ/mol for MgO-type solids), which more than compensates for the endothermic second EA once the full Born-Haber cycle (formation of the crystal, not just the isolated gas-phase ion) is considered.
- **Replacement [P31]**: Second (and later) electron affinities are always positive (endothermic) due to electron-electron repulsion with the existing negative charge; multiply-charged anions like O²⁻ are only stabilized by subsequent lattice-energy release in a crystal, never by a favorable gas-phase electron affinity.
- **Discrimination pairs [P33]**: O⁻ formation (first EA, negative/exothermic, spontaneous in the gas phase) vs. O²⁻ formation from O⁻ (second EA, positive/endothermic, NOT spontaneous in the gas phase alone).
- **S6 repair path**: Present the +780 kJ/mol second-EA value directly alongside the ~3000-4000 kJ/mol MgO lattice energy, showing which term actually drives O²⁻'s real-world stability.

## 5. Explanation Library

**Primary explanation**: Electron affinity, measured as electron-gain enthalpy, quantifies how favorably an atom accepts an added electron. Following standard thermodynamic sign convention, a more negative ΔegH means more energy is released, indicating a stronger, more favorable tendency to gain that electron. Real periodic trends show two distinct anomaly types superimposed on the general increase-across-a-period pattern: a half-filled-subshell pairing-repulsion effect (nitrogen) and a small-shell electron-crowding effect (fluorine) — genuinely different mechanisms, not a single shared cause.

**Secondary explanation (multi-electron framing)**: Every electron affinity beyond the first is positive (endothermic), because adding an electron to an already-negative ion must overcome direct electrostatic repulsion from the existing extra charge — multiply-charged anions like O²⁻ only become real, stable species once embedded in an ionic crystal lattice, where the crystal's large lattice energy (via the full Born-Haber cycle) more than compensates for the endothermic second electron affinity.

## 6. Analogy Library

- **Primary analogy**: A "welcome bonus" paid to the first new member joining a small, cozy room (first EA, exothermic, favorable) versus asking a second new member to squeeze into that same already-crowded room (second EA, endothermic, requires overcoming the crowding/repulsion already present).
- **Breaking point**: The crowded-room analogy conveys the repulsion-with-existing-charge idea well but doesn't distinguish the two separate first-EA anomaly mechanisms (half-filled subshell vs. small-shell crowding) — that requires the explicit electron-configuration comparison.
- **Anti-analogy**: Do NOT say "more negative EA means weaker attraction" — this directly reinforces MC-1's sign-convention error.

## 7. Demonstration Library

- **Demonstration 1 (sign-convention drill)**: Present several pairs of ΔegH values and have students state, for each pair, which element attracts an electron more strongly, explicitly applying the negative-means-favorable convention each time.
- **Demonstration 2 (Born-Haber lattice-energy comparison)**: Present oxygen's second EA (+780 kJ/mol) alongside MgO's lattice energy (~3000-4000 kJ/mol) side by side, having students compute the net favorability of forming solid MgO from the elements.

## 8. Discovery Lesson

**Opening**: "Chlorine's electron affinity is more negative than fluorine's. Does that mean Cl or F attracts an added electron more strongly?"

**Exploration**: Students work through the sign-convention reasoning explicitly, then examine F's and N's actual electron configurations to test whether their respective anomalies share a cause.

**Synthesis**: Guide toward: sign convention flips the naive "less negative sounds stronger" intuition, and the two well-known anomalies (N, F) turn out to have genuinely different electron-configuration causes.

**Closure**: "If oxygen so readily gains its first electron, does that mean O²⁻ forms just as easily in the gas phase?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the F/Cl electron affinity comparison with explicit sign-convention reasoning worked through.
- **TA-2 (TELL)**: State the two distinct anomaly mechanisms (N's half-filled subshell vs. F's small-shell crowding) explicitly, side by side.
- **TA-3 (DO)**: Student determines, for a new pair of elements, which has the stronger electron-gaining tendency using the correct sign interpretation.
- **TA-4 (TEST-THINKING)**: Present MC-3's O²⁻ probe and ask the student to reconcile O²⁻'s real-world existence with a positive second EA using the lattice-energy argument.

## 10. Voice Teaching

Whenever comparing two ΔegH values, verbally restate the sign convention before naming a winner: "more negative means stronger attraction — remember, that's backwards from how 'negative' usually sounds." When discussing F's anomaly, explicitly state "this is NOT a half-filled-subshell effect like nitrogen's" to preempt the mechanism-conflation error directly.

## 11. Assessment

**Mastery gate**: Student can (a) correctly apply the sign convention to compare two electron affinities, (b) correctly distinguish the causes of the N-vs-O and F-vs-Cl anomalies, (c) correctly explain why O²⁻'s real-world stability doesn't require a favorable second electron affinity.

- **FA-1**: "ΔegH for F is −328 kJ/mol and for Cl is −349 kJ/mol. Which has the stronger tendency to gain an electron?" — targets MC-1.
- **FA-2**: "Are the F-vs-Cl and N-vs-O electron affinity anomalies caused by the same effect?" — targets MC-2.
- **FA-3**: "Is the second electron affinity of oxygen positive or negative? How does O²⁻ exist in ionic oxides then?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students seeing this sign-convention pattern for the first time in this specific periodic-trend context.

**Delayed retrieval**: Re-probe MC-3's lattice-energy reasoning before `chem.bond.ionic-bonding` formally develops Born-Haber cycles and lattice energy as core content.

## 12. Recovery Notes

- **S3 (stuck)**: For sign confusion, have the student state in plain words what "energy released" physically means before assigning any numeric comparison.
- **S4 (frustrated)**: Normalize — the negative-number sign convention genuinely does run counter to everyday intuition, making this error extremely common and expected, not careless.
- **S6 (collision)**: Use the side-by-side electron-configuration comparison for MC-2; use the second-EA-vs-lattice-energy numeric comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why O²⁻ can exist in solid MgO despite a positive (unfavorable) second electron affinity.

## 13. Memory & Review

Tag as a sign-convention procedural memory (negative = favorable) plus two distinct conceptual-correction memories (N-vs-F anomaly mechanisms; multi-electron affinity positivity). Schedule a spaced check at ~1 week and again before `chem.bond.ionic-bonding`.

## 14. Transfer Map

Feeds directly into `chem.bond.ionic-bonding` (Born-Haber cycles and lattice energy directly resolve and extend MC-3's O²⁻ stability reasoning), `chem.bond.covalent-bonding` (electron affinity contributes to electronegativity, relevant to bond polarity), and `chem.period.periodic-properties` (synthesizes electron affinity with other periodic trends).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
