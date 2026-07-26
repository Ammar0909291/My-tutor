# chem.period.ionization-energy — Ionization Energy

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.period.ionization-energy` |
| Domain | Periodic Table & Periodicity |
| Requires | `chem.period.modern-periodic-law` |
| Unlocks | `chem.bond.ionic-bonding`, `chem.period.periodic-properties` |
| Difficulty | developing |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Ionization energy (IE) generally increases across a period (rising effective nuclear charge) and decreases down a group (increasing atomic radius/electron-nucleus distance dominates over the modest change in effective nuclear charge from very effective inner-shell shielding), with two well-defined exceptions in each period (Group 2→13 drop, from removing an easier-to-remove p electron versus a filled s subshell; Group 15→16 drop, from removing an easier-to-remove paired p electron versus a stable half-filled p subshell) — successive ionization energies (IE₁, IE₂, IE₃...) show a large jump precisely between the last valence-shell electron removed and the first core-shell electron removed, so the jump's position (not its numeric label) reveals the number of valence electrons.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing measured IE₁ values for period 3 elements (Na through Ar) and spotting where the expected monotonic increase actually dips.

**Representational**: A bar chart of successive ionization energies for a given element, with a visibly large gap marking the valence-to-core electron transition.

**Abstract**: The two named anomalies (Group 2→13, Group 15→16) explained by subshell type and pairing-repulsion arguments; the distance-dominates-shielding argument for the down-a-group decrease.

**Transfer**: Given successive IE data for an unfamiliar element, correctly identifying the valence electron count from the jump's position (not its ordinal number), and correctly predicting where period-3-style dips would occur for an unfamiliar period.

## 3. Why Beginners Fail

Students apply the "IE increases across a period" rule as an absolute, exception-free rule (since anomalies are often taught as brief footnotes after the general trend), because the anomalies are genuine, well-documented dips (Mg→Al, P→S) driven by specific electron-configuration effects; they misread the position of a large jump in successive ionization energies as directly stating the number of valence electrons (reading "jump at IE₄" as "4 valence electrons" instead of correctly counting the 3 electrons removed before the jump); and they misattribute the down-a-group IE decrease to "worse shielding" rather than correctly identifying that shielding from inner shells is actually very effective, with the dominant cause instead being the much greater electron-nucleus distance in later periods.

## 4. Misconception Library

### MC-1: IE increases monotonically across a period with no exceptions
- **Probe**: "Arrange the first ionization energies in order for the period 3 elements: Na, Mg, Al, Si, P, S, Cl, Ar. Note any deviations from the expected trend."
- **Characteristic phrase**: "IE₁ always increases from Na to Ar, so Al > Mg and S > P."
- **Trigger (Type 5, instruction-induced)**: The general increasing-Zeff trend is introduced first and thoroughly, while the anomalies are often treated as brief afterthought footnotes, leading students to apply the general rule universally.
- **Conflict evidence [P28]**: Two genuine dips interrupt the otherwise-increasing trend: Mg→Al drops (Al's outermost electron is in 3p, a subshell higher in energy and easier to remove than Mg's filled, relatively stable 3s subshell, even though Al's nuclear charge is greater), and P→S drops (S's fourth 3p electron must pair up in an already-singly-occupied orbital, and that paired electron experiences extra electron-electron repulsion making it easier to remove than P's cleanly half-filled, extra-stable 3p³ configuration).
- **Bridge [P30]**: The general Zeff-increases-across-a-period argument correctly predicts most of the trend, but doesn't account for the specific stability bonuses of filled and half-filled subshells — these subshell-structure effects can locally override the general Zeff trend at exactly the points where a new subshell type starts being filled or where pairing first occurs.
- **Replacement [P31]**: The period-3 IE order genuinely dips twice: Na < Mg > Al < Si < P > S < Cl < Ar — both dips are explained by subshell-type and pairing-repulsion effects, not violations of the underlying Zeff logic.
- **Discrimination pairs [P33]**: Na→Mg→Al (dip at Al, s-to-p subshell transition) vs. Al→Si→P (steady increase, no subshell-type transition) — the dip occurs specifically where the subshell type changes.
- **S6 repair path**: Have the student write out the actual electron configurations for Mg and Al (or P and S) and identify which specific electron is being removed in each case.

### MC-2: The large jump in successive IEs = the ionisation number of the jump
- **Probe**: "An element has successive IEs (kJ/mol): 578, 1817, 2745, 11578, 14831... Where is the big jump and how many valence electrons does it have?"
- **Characteristic phrase**: "The big jump is at IE₄, so the element has 4 valence electrons."
- **Trigger (Type 4, notation-induced)**: Students read the graph or data table as "the jump happens at position 4, so 4 valence electrons," conflating the label of the jump's position with the count of electrons removed before it.
- **Conflict evidence [P28]**: The jump occurs BETWEEN IE₃ and IE₄, not "at" IE₄ in the sense of counting it — the fourth electron removed (corresponding to IE₄) is the first one taken from an inner, core shell, meaning exactly 3 electrons were removed from the valence shell before that jump, correctly identifying the element as having 3 valence electrons (a Group 13 element, aluminium, matching the given data).
- **Bridge [P30]**: The jump marks a boundary — it signals "everything before this point came from the valence shell; this point onward comes from the core" — the count of valence electrons is the number of IEs BEFORE the jump, not the ordinal label attached to the jump itself.
- **Replacement [P31]**: Count the number of ionization energies occurring before the large jump to determine the number of valence electrons — the jump's ordinal position (IE₄ in this case) is one more than the valence electron count.
- **Discrimination pairs [P33]**: "Jump at IE₄" (naive misreading: 4 valence electrons) vs. "3 IEs before the jump" (correct reading: 3 valence electrons, and IE₄ itself is the first core-electron removal).
- **S6 repair path**: Have the student explicitly count and label each IE value as "valence" or "core" before answering, rather than reading the jump's position number directly as the answer.

### MC-3: IE decreases down a group because there are more electrons (more shielding is less effective)
- **Probe**: "Compare IE₁ for Li (520 kJ/mol) and Cs (376 kJ/mol). Explain why Cs has a lower IE₁."
- **Characteristic phrase**: "Cs has lower IE₁ because it has so many more electrons that shielding is very poor — the electrons block each other from the nucleus."
- **Trigger (Type 5, instruction-induced)**: Students correctly identify shielding as a key concept but invert the logic, believing shielding becomes LESS effective (worse) as more electrons are present, when the opposite is closer to true — inner-shell shielding is quite effective and roughly consistent across the group.
- **Conflict evidence [P28]**: Using Slater's rules, inner-shell electrons shield with σ≈0.85 per electron, quite effectively — the effective nuclear charge (Zeff) felt by the outermost electron barely changes between Li (Zeff≈1.3) and Cs (Zeff≈2.2), a small difference that alone wouldn't explain the large IE drop; the dominant cause is instead that Cs's outer electron sits in the n=6 shell, vastly farther from the nucleus than Li's n=2 electron, and this much greater distance weakens the nuclear attraction (which falls off with distance) far more significantly than the small Zeff change.
- **Bridge [P30]**: "Shielding" and "distance" are two separate contributing factors to how strongly an electron is held — shielding stays roughly similarly effective down a group (Zeff barely changes), while distance increases dramatically, making distance (not shielding effectiveness) the dominant explanation for the down-group IE decrease.
- **Replacement [P31]**: The down-a-group IE decrease is primarily driven by the outer electron's increasing distance from the nucleus across successive periods, not by shielding becoming less effective (Zeff itself stays roughly constant, thanks to consistently effective inner-shell shielding).
- **Discrimination pairs [P33]**: Zeff comparison (Li≈1.3, Cs≈2.2 — a small, non-explanatory difference) vs. distance comparison (n=2 for Li, n=6 for Cs — a large, explanatory difference).
- **S6 repair path**: Present the actual Zeff values for Li and Cs side by side, showing the small difference, then redirect to the much larger n-shell/distance difference as the real driver.

## 5. Explanation Library

**Primary explanation**: Ionization energy generally rises across a period because effective nuclear charge (Zeff) increases while shielding stays roughly constant within the same shell, pulling electrons more tightly. Two anomalies interrupt this general rise within each period, both caused by subshell stability effects: removing a p electron (higher energy, less stable) is easier than removing a paired s electron from a full subshell (Group 2→13), and removing a paired p electron is easier than removing an electron from a stable half-filled p subshell (Group 15→16).

**Secondary explanation (down-group and successive-IE framing)**: Down a group, IE decreases primarily because the outer electron occupies a shell of increasingly larger n, farther from the nucleus — shielding by inner shells stays quite effective throughout (Zeff barely changes), so distance, not shielding effectiveness, drives the trend. For successive ionization energies of a single element, a large jump appears precisely at the boundary between removing valence-shell electrons (relatively easy) and removing the first core-shell electron (much harder, since core electrons are both closer to the nucleus and no longer shielded by the now-removed valence electrons) — the count of electrons removed BEFORE that jump equals the valence electron count.

## 6. Analogy Library

- **Primary analogy**: A parking garage where cars on the outer, easily-accessible top floor (valence shell) can be removed one at a time without much resistance, but reaching a car on a deep, tightly-packed inner floor (core shell) suddenly requires far more effort — the "jump" in effort marks exactly where you've run out of top-floor cars.
- **Breaking point**: The parking-garage analogy conveys the valence-to-core jump well but doesn't naturally capture the specific subshell-type (Group 2→13) and pairing-repulsion (Group 15→16) anomalies — those require the explicit electron-configuration reasoning.
- **Anti-analogy**: Do NOT say "more electrons always means worse shielding" — this directly reinforces MC-3's inverted logic.

## 7. Demonstration Library

- **Demonstration 1 (period-3 anomaly plotting)**: Plot the eight period-3 first ionization energies and have students identify both dips before being told where they are, then explain each using electron configuration.
- **Demonstration 2 (successive-IE jump counting)**: Present a successive-IE dataset for an unfamiliar element and have students count valence electrons correctly by identifying the jump's position, not its label.

## 8. Discovery Lesson

**Opening**: "If ionization energy always increases across a period, why does aluminium actually have a LOWER first ionization energy than magnesium, right next to it?"

**Exploration**: Students write out Mg's and Al's electron configurations and identify which specific electron is removed from each, discovering the s-vs-p subshell difference.

**Synthesis**: Guide toward: the general Zeff-driven trend is real, but subshell-stability effects (filled or half-filled) can locally override it at specific, predictable points.

**Closure**: "Given the successive-IE dataset, is the jump really 'at' the 4th ionization energy, or does it tell you something about what happened before it?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the full period-3 IE plot with both dips marked, working through the electron-configuration explanation for each.
- **TA-2 (TELL)**: State explicitly that the valence-electron count equals the number of IEs BEFORE the jump, immediately followed by a worked counting example.
- **TA-3 (DO)**: Student identifies valence electron count from a new successive-IE dataset.
- **TA-4 (TEST-THINKING)**: Present MC-3's Li-vs-Cs probe and ask the student to compute/compare Zeff before concluding what actually drives the IE difference.

## 10. Voice Teaching

Whenever the general "IE increases across a period" rule is stated, immediately follow with "except at two specific points, both explained by subshell effects" — never present the rule as exception-free even briefly. When discussing successive ionization energies, always narrate the counting-before-the-jump procedure explicitly rather than reading off the jump's ordinal position.

## 11. Assessment

**Mastery gate**: Student can (a) correctly identify and explain both period-3-style IE dips using electron configuration, (b) correctly count valence electrons from a successive-IE dataset's jump position, (c) correctly identify distance (not shielding effectiveness) as the dominant cause of the down-group IE decrease.

- **FA-1**: "Arrange the period-3 first ionization energies and note any deviations." — targets MC-1.
- **FA-2**: "An element's successive IEs jump sharply between IE₃ and IE₄. How many valence electrons does it have?" — targets MC-2.
- **FA-3**: "Why does Cs have a lower IE₁ than Li?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students who've only seen the general trend rule without the anomaly footnotes emphasized.

**Delayed retrieval**: Re-probe MC-1's anomaly locations before `chem.bond.ionic-bonding` uses ionization energy values directly in Born-Haber cycle calculations, which assume fluent, anomaly-aware IE reasoning.

## 12. Recovery Notes

- **S3 (stuck)**: For the period-3 dip confusion, return to the explicit electron configurations of the two elements in question and identify the specific electron being removed in each.
- **S4 (frustrated)**: Normalize — the general trend genuinely does hold for most of the period, making the two dips a reasonable, common exception to miss on first exposure.
- **S6 (collision)**: Use the explicit before-the-jump counting procedure for MC-2; use the Zeff-vs-distance numeric comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why the jump in successive IEs occurs where it does, in terms of valence vs. core electrons.

## 13. Memory & Review

Tag as a conceptual-correction memory (period-3-style anomalies; distance vs. shielding for group trends) plus a procedural-counting memory (successive-IE jump interpretation). Schedule a spaced check at ~1 week and again before `chem.bond.ionic-bonding`.

## 14. Transfer Map

Feeds directly into `chem.bond.ionic-bonding` (Born-Haber cycles use ionization energy values directly, requiring fluent, anomaly-aware IE reasoning) and `chem.period.periodic-properties` (synthesizes ionization energy with other periodic trends).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
