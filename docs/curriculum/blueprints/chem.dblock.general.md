# chem.dblock.general — General Characteristics of Transition Elements

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.dblock.general` |
| Domain | d-Block and f-Block Elements |
| Requires | `chem.atomic.electronic-config`, `chem.period.periodic-properties` |
| Unlocks | `chem.dblock.first-row`, `chem.dblock.lanthanides`, `chem.dblock.organometallics` |
| Difficulty | proficient |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Transition metal ionization always removes 4s electrons FIRST, regardless of the Aufbau filling order (Fe atom=[Ar]3d⁶4s², Fe²⁺=[Ar]3d⁶ with both 4s removed, Fe³⁺=[Ar]3d⁵ with one 3d electron removed only AFTER both 4s are gone), since once the atom is formed, increased Zeff makes 3d genuinely lower in energy than 4s, making 4s the outermost, most easily removed shell; not all transition metal compounds are colored — color specifically requires a d-d transition, which requires partially-filled d orbitals, so d¹⁰ (Zn²⁺) and d⁰ (Ti⁴⁺) species are genuinely colorless despite being transition-metal-derived; and "variable oxidation state" does NOT mean an element can adopt any arbitrary whole-number oxidation state — it's bounded by the actual number of accessible d+s electrons and by whether the resulting compound is chemically stable (Mn's highest common oxidation state is +7, using all 3d⁵4s² electrons; +8 or +9 are not accessible under normal conditions).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Writing Fe's neutral configuration ([Ar]3d⁶4s²), then Fe²⁺ ([Ar]3d⁶, both 4s removed), then Fe³⁺ ([Ar]3d⁵, one 3d removed only after 4s is fully gone) — tracing the correct removal order step by step.

**Representational**: A side-by-side comparison of ZnSO₄ (colorless, d¹⁰) against a vividly colored d⁵ or d⁶ transition-metal salt, visually anchoring that color requires partial d-filling specifically.

**Abstract**: The general filling-vs-removal-order distinction (4s fills before 3d, but 4s is removed first from ions); the general principle that oxidation-state accessibility is bounded by actual electron count and compound stability, not an open-ended "any number" claim.

**Transfer**: Given an unfamiliar transition-metal ion, correctly writing its electron configuration with 4s removed first, correctly predicting whether a given d-count compound will be colored, and correctly bounding an element's accessible oxidation states using its actual d+s electron count.

## 3. Why Beginners Fail

Students reverse the correct ionization order, assuming 3d electrons (filled "later" per Aufbau) must also be removed first from a transition-metal ion, missing that once the atom exists, 3d sits at lower energy than 4s (due to increased Zeff), making 4s — not 3d — the electrons genuinely removed first; they assume all transition-metal compounds must be colored (treating "transition metal" as synonymous with "colored"), missing that color specifically requires partially-filled d orbitals for a genuine d-d transition, with d⁰/d¹⁰ configurations being colorless regardless of the metal's general classification; and they interpret "variable oxidation state" as meaning an element can adopt essentially any whole-number charge, missing that the actual accessible range is bounded by the real number of available d+s electrons and by whether the resulting compound is genuinely stable under normal chemical conditions.

## 4. Misconception Library

### MC-1: Transition metal ions lose their 3d electrons first when ionized
- **Probe**: "Write the electron configuration of Fe³⁺."
- **Characteristic phrase**: "Fe³⁺ is [Ar]3d³4s²."
- **Trigger (Type 5, instruction-induced)**: Students correctly learn 4s fills before 3d in the Aufbau building-up sequence and incorrectly reverse this into "4s is removed after 3d" for ionization, assuming filling order and removal order must mirror each other.
- **Conflict evidence [P28]**: The 4s electrons are ALWAYS lost first in ionization, regardless of the Aufbau order used during filling — Fe atom is [Ar]3d⁶4s²; Fe²⁺ is [Ar]3d⁶ (both 4s electrons removed first); Fe³⁺ is [Ar]3d⁵ (only THEN, after both 4s are gone, is one 3d electron removed) — the naive [Ar]3d³4s² answer incorrectly keeps 4s electrons while removing 3d ones, the exact opposite of the correct order.
- **Bridge [P30]**: Once the atom is fully formed (or partially ionized), the relative energy ordering of 3d and 4s genuinely SWAPS compared to the filling-time ordering — increased effective nuclear charge from the added protons makes 3d lower in energy than 4s in the filled/ionized configuration, meaning 4s is now the outermost, most weakly-held shell, and hence the first removed.
- **Replacement [P31]**: Always remove 4s electrons first when writing a transition-metal ion's configuration, regardless of the neutral atom's Aufbau filling order — this reflects the genuine, post-filling energy-level swap between 3d and 4s.
- **Discrimination pairs [P33]**: Neutral Fe filling (4s fills before 3d) vs. Fe²⁺/Fe³⁺ ionization (4s removed before 3d) — filling order and removal order are opposite.
- **S6 repair path**: Walk through Fe→Fe²⁺→Fe³⁺ step by step, explicitly removing 4s electrons first at each stage, before touching any 3d electron.

### MC-2: All transition metal compounds are coloured
- **Probe**: "Why is ZnSO₄ solution colourless?"
- **Characteristic phrase**: "transition metals always make coloured compounds."
- **Trigger (Type 1, overgeneralization)**: The vivid, memorable colors of many common transition-metal compounds lead students to overgeneralize "transition metal" as synonymous with "colored."
- **Conflict evidence [P28]**: Color requires a genuine d-d electron transition, which requires partially-filled d orbitals; Zn²⁺ has a completely FULL d¹⁰ configuration — there is no empty d orbital for an electron to be promoted into, making a d-d transition physically impossible, hence colorless; TiO₂ (Ti⁴⁺, d⁰, completely empty) is similarly white/colorless for the analogous reason (no d electrons at all to promote).
- **Bridge [P30]**: "Transition metal" describes an element's general periodic classification, but any SPECIFIC ion/compound can end up with a completely full (d¹⁰) or completely empty (d⁰) d subshell, in which case no d-d transition is possible, regardless of the element's general classification.
- **Replacement [P31]**: Color requires partially-filled d orbitals (d¹ through d⁹) for a genuine d-d transition — d⁰ and d¹⁰ configurations are genuinely colorless, regardless of transition-metal classification.
- **Discrimination pairs [P33]**: Zn²⁺ (d¹⁰, full, colorless) and Ti⁴⁺ (d⁰, empty, colorless) vs. a d⁵ or d⁶ ion (partially filled, genuine d-d transition, vividly colored).
- **S6 repair path**: Present Zn²⁺'s explicit d¹⁰ configuration, connecting the absence of any empty d orbital directly to the observed colorlessness.

### MC-3: "Variable oxidation state" means the element can have any whole-number OS
- **Probe**: "Can Mn exhibit OS = +8 or +9?"
- **Trigger (Type 3, language contamination)**: The word "variable," suggesting flexibility or openness, is generalized into "unlimited" or "any value," without the specific electron-count and compound-stability constraints being made explicit.
- **Conflict evidence [P28]**: Variable oxidation state is genuinely limited by the number of accessible d+s electrons AND by the stability of the resulting compound under normal chemical conditions — manganese's highest common oxidation state is +7 (achieved by removing all 3d⁵4s² electrons, its full complement of accessible valence electrons); oxidation states beyond +7 (like +8 or +9) are not accessible under normal chemical conditions, since there are no more valence electrons available to remove.
- **Bridge [P30]**: "Variable" correctly describes the genuine flexibility transition metals show WITHIN a bounded, physically meaningful range (multiple stable oxidation states are possible, unlike main-group elements' typically fixed oxidation state) — but this flexibility has a hard upper bound set by the total number of electrons actually available to lose.
- **Replacement [P31]**: An element's accessible oxidation states are bounded by its actual available d+s electron count and by compound stability — "variable" means flexible within this bounded range, never unlimited.
- **Discrimination pairs [P33]**: Mn's accessible range (up to +7, using all available 3d⁵4s² electrons) vs. a hypothetical +8 or +9 (not accessible, exceeding the total available valence electrons).
- **S6 repair path**: Count Mn's total available valence electrons (3d⁵4s²=7) explicitly, connecting this count directly to the +7 maximum oxidation state.

## 5. Explanation Library

**Primary explanation**: Transition metal ions are formed by removing 4s electrons FIRST, regardless of the neutral atom's Aufbau filling order — once the atom exists, increased effective nuclear charge makes 3d genuinely lower in energy than 4s, reversing the relative ordering compared to filling time. Color in transition-metal compounds requires partially-filled d orbitals for a genuine d-d electron transition — d⁰ and d¹⁰ configurations are colorless, since no such transition is structurally possible.

**Secondary explanation (bounded-variability framing)**: "Variable oxidation state," a hallmark of transition metals, describes genuine flexibility across multiple accessible states — but this flexibility is bounded by the actual number of available d+s valence electrons and by whether the resulting compound is chemically stable, never an unlimited, arbitrary range of possible charges.

## 6. Analogy Library

- **Primary analogy**: A parking garage's most recently-arrived cars (4s, the "newest" additions in filling order) parking near the exit, easiest to remove first — while earlier-arrived cars (3d) are parked deeper inside and harder to reach — the ARRIVAL order (filling) and the DEPARTURE order (removal) can genuinely differ based on which spots end up more accessible once the whole garage is full.
- **Breaking point**: The parking-garage analogy conveys the filling-vs-removal-order distinction well but doesn't naturally capture the color-requires-partial-filling argument or the bounded-oxidation-state-range principle — those need the explicit d-d-transition and electron-count arguments.
- **Anti-analogy**: Do NOT say "3d electrons are removed first since they filled last" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (Fe-to-Fe³⁺ step-by-step ionization)**: Write out Fe's neutral, Fe²⁺, and Fe³⁺ configurations explicitly and sequentially, removing 4s electrons before any 3d electron.
- **Demonstration 2 (Zn²⁺ colorlessness explanation)**: Present Zn²⁺'s explicit d¹⁰ configuration, connecting the absence of any empty d orbital directly to ZnSO₄'s observed colorlessness.

## 8. Discovery Lesson

**Opening**: "4s fills before 3d when building up a neutral iron atom. Do you think 4s or 3d electrons get removed first when iron becomes an ion?"

**Exploration**: Students examine the correct Fe→Fe²⁺→Fe³⁺ configuration sequence, discovering 4s is removed first, opposite to a naive filling-order-mirrors-removal-order assumption.

**Synthesis**: Guide toward: the relative energy of 3d and 4s genuinely swaps once the atom is filled/ionized, making removal order the opposite of filling order.

**Closure**: "Can manganese have an oxidation state of +8 or +9?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the Fe→Fe²⁺→Fe³⁺ step-by-step ionization sequence explicitly.
- **TA-2 (TELL)**: State the color-requires-partial-d-filling rule explicitly, immediately followed by the Zn²⁺/Ti⁴⁺ colorless examples.
- **TA-3 (DO)**: Student determines the maximum accessible oxidation state for a given transition metal using its total d+s valence electron count.
- **TA-4 (TEST-THINKING)**: Present MC-1's Fe³⁺ probe and ask the student to justify the correct configuration using the post-filling energy-swap argument.

## 10. Voice Teaching

Whenever a transition-metal ion's configuration is written, narrate "4s comes off first, always" explicitly before touching any 3d electron. Whenever a transition-metal compound's color is discussed, always check the specific d-electron count first, never assuming color from "transition metal" status alone.

## 11. Assessment

**Mastery gate**: Student can (a) correctly write transition-metal ion configurations with 4s removed first, (b) correctly predict colorlessness for d⁰/d¹⁰ configurations, (c) correctly bound an element's accessible oxidation states using its total available valence electron count.

- **FA-1**: "Write the electron configuration of Fe³⁺." — targets MC-1.
- **FA-2**: "Why is ZnSO₄ solution colourless?" — targets MC-2.
- **FA-3**: "Can Mn exhibit OS = +8 or +9?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've just learned the Aufbau filling order and haven't yet encountered the ionization-order distinction.

**Delayed retrieval**: Re-probe MC-1's ionization order and MC-3's bounded-oxidation-state principle before `chem.dblock.first-row` requires fluent, correct ion configuration and oxidation-state reasoning across the first-row transition series.

## 12. Recovery Notes

- **S3 (stuck)**: For the ionization-order confusion, return to experimental evidence (ionization energies, magnetic data) directly rather than re-deriving from Aufbau alone.
- **S4 (frustrated)**: Normalize — the filling-order-mirrors-removal-order assumption is a genuinely reasonable, common first guess, given how thoroughly Aufbau is taught for building up neutral atoms.
- **S6 (collision)**: Use the Zn²⁺ d¹⁰ configuration analysis for MC-2; use the explicit Mn valence-electron count for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why 3d being "filled after" 4s doesn't mean it's "removed after" 4s.

## 13. Memory & Review

Tag as a procedural-rule memory (4s-removed-first ionization order) plus two conceptual-correction memories (color requires partial d-filling; oxidation-state range is bounded by electron count). Schedule a spaced check at ~1 week and again before `chem.dblock.first-row`.

## 14. Transfer Map

Feeds directly into `chem.dblock.first-row` (first-row transition metal chemistry requires fluent ion-configuration and oxidation-state reasoning established here), `chem.dblock.lanthanides` (extends variable-oxidation-state reasoning to f-block elements), and `chem.dblock.organometallics` (organometallic chemistry assumes correct d-electron counting).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
