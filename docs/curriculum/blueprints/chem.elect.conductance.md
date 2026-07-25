# chem.elect.conductance — Electrolytic Conductance

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.elect.conductance` |
| Domain | Electrochemistry |
| Requires | `chem.found.measurement` |
| Unlocks | `chem.elect.electrolysis` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

Conductance (G, 1/resistance) depends on cell geometry, while conductivity (κ = G × l/A) removes that geometry dependence to become a true material property; molar conductivity (Λm = κ/c) further normalizes for concentration, and Kohlrausch's law of independent ionic migration (Λm° = λ+° + λ−°, individual ionic contributions sum) is stated specifically at infinite dilution, because only there are ions far enough apart to migrate without interfering with each other — strong electrolytes dissociate essentially completely at all concentrations, but their molar conductivity still decreases with increasing concentration due to inter-ionic attractions slowing ion mobility, not due to reduced dissociation.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Measuring the same solution's conductance in a small beaker versus a large beaker (same solution, different cell geometry) — the conductance reading changes even though the solution itself hasn't.

**Representational**: A graph of molar conductivity Λm vs. √c for a strong electrolyte, showing a gentle downward trend that extrapolates to Λm° at c=0 (infinite dilution).

**Abstract**: G = κ(A/l) removes geometry to give the material property κ; Λm = κ/c removes concentration to enable per-mole comparison; Kohlrausch's law Λm° = λ+° + λ−° applies strictly at c→0.

**Transfer**: Given an unfamiliar electrolyte's conductivity data across several concentrations, correctly extrapolating to Λm° and explaining why the trend exists without invoking incomplete dissociation for a known strong electrolyte.

## 3. Why Beginners Fail

Students use "conductance" and "conductivity" interchangeably, missing that conductance is geometry-dependent while conductivity is a true material property with the geometry factored out; they apply Kohlrausch's law of independent migration at any concentration, missing that it's specifically an infinite-dilution law because ionic interactions only vanish as concentration approaches zero; and they misattribute a strong electrolyte's declining molar conductivity with rising concentration to "less dissociation happening," when in fact dissociation stays essentially complete and the real cause is reduced ionic mobility from inter-ionic attraction.

## 4. Misconception Library

### MC-1: Conductance and conductivity are the same
- **Probe**: "If you measure the conductance of a solution in a beaker, then pour the same solution into a larger beaker, how does the conductance change? The conductivity?"
- **Characteristic phrase**: "Conductivity is just another word for conductance."
- **Trigger (Type 3, language contamination)**: The two terms sound like simple synonyms in everyday usage, and students don't initially register the technical distinction being made between a geometry-dependent measurement and a geometry-independent material property.
- **Conflict evidence [P28]**: Conductance depends on cell geometry via G = κ × (A/l) — pouring the identical solution into a larger or differently-shaped beaker (changing the effective electrode area A and separation l) changes the measured conductance G, even though the solution's intrinsic conductivity κ (a true material property) stays exactly the same.
- **Bridge [P30]**: Conductance is what you directly measure with a specific physical cell; conductivity is what remains once the cell's specific geometry (A and l) has been divided out — one is apparatus-dependent, the other is solution-dependent only.
- **Replacement [P31]**: κ = G × (l/A) — conductivity is conductance corrected for cell geometry, making it a genuine, comparable material property independent of which cell was used to measure it.
- **Discrimination pairs [P33]**: Conductance (changes with beaker size/electrode geometry for the same solution) vs. conductivity (constant for the same solution regardless of the measuring cell).
- **S6 repair path**: Walk through the G = κ(A/l) formula explicitly and have the student predict what happens to G (not κ) when A or l changes.

### MC-2: Kohlrausch's law applies at all concentrations
- **Probe**: "Why is Kohlrausch's law of independent migration specifically stated as being applicable at infinite dilution?"
- **Trigger (Type 5, instruction-induced)**: Students learn the Kohlrausch law formula without the infinite-dilution qualifier being sufficiently emphasized, and apply it as if it were a general rule at any concentration.
- **Conflict evidence [P28]**: At finite (non-infinitesimal) concentrations, inter-ionic electrostatic attractions between oppositely-charged ions slow down their migration, so each ion's individual contribution to conductivity is NOT independent of the other ions present — only as concentration approaches zero (c→0) do ions become far enough apart on average that these interactions vanish and true independent migration is achieved.
- **Bridge [P30]**: "Independent migration" is a limiting-case idealization, not a universal property of ions in solution — it becomes true specifically in the limit where ions are so dilute they essentially never interact with each other.
- **Replacement [P31]**: Kohlrausch's law (Λm° = λ+° + λ−°) holds exactly only at infinite dilution (denoted by the ° superscript); at any finite concentration, ionic interactions cause deviations from simple additivity.
- **Discrimination pairs [P33]**: Infinite dilution (ions independent, Kohlrausch's law exact) vs. finite concentration (ionic interactions present, law only approximate or requires correction).
- **S6 repair path**: Ask directly why ions being "far apart" (dilute) would matter for whether they interact — connecting dilution to interaction-distance directly.

### MC-3: Strong electrolytes fully dissociate at all concentrations, and declining molar conductivity means declining dissociation
- **Probe**: "Does the molar conductivity of NaCl change with concentration? What does that tell you about ionic interactions at higher concentrations?"
- **Trigger (Type 1, overgeneralization)**: "Strong electrolyte" is taught as "completely dissociates," and students extend the observed decline in molar conductivity with rising concentration to mean dissociation itself must be declining.
- **Conflict evidence [P28]**: "Complete dissociation" correctly describes the equilibrium state — essentially all NaCl genuinely does dissociate into Na⁺ and Cl⁻ ions at any concentration — but the ions' MOBILITY (how fast they can move through solution under an electric field) is reduced by inter-ionic interactions at higher concentrations; Λm is lower at higher c because of this mobility reduction, not because less NaCl has actually dissociated.
- **Bridge [P30]**: Dissociation (whether ions form at all) and mobility (how freely those ions can move once formed) are two separate physical properties — a strong electrolyte can have 100% dissociation at every concentration while still showing reduced molar conductivity at higher concentrations purely from mobility effects.
- **Replacement [P31]**: For strong electrolytes, molar conductivity declines with concentration due to reduced ionic mobility from inter-ionic attraction, not due to any actual decrease in the degree of dissociation.
- **Discrimination pairs [P33]**: A weak electrolyte's declining Λm (genuinely caused by declining dissociation as concentration rises) vs. a strong electrolyte's declining Λm (caused by mobility reduction alone, dissociation stays ~100%) — same observed trend, different underlying cause.
- **S6 repair path**: Explicitly separate the two questions — "has NaCl stopped dissociating?" (no) vs. "can the ions move as freely?" (no, due to inter-ionic attraction) — and connect the Λm decline to the second question only.

## 5. Explanation Library

**Primary explanation**: Conductance (G) is what's directly measured with a specific electrochemical cell and depends on that cell's geometry. Dividing out the geometry (κ = G × l/A) gives conductivity, a true material property. Dividing conductivity by concentration (Λm = κ/c) gives molar conductivity, letting different concentrations be compared on a per-mole basis. At infinite dilution, ions are far enough apart to migrate completely independently of each other, so their individual contributions simply add (Kohlrausch's law); at any finite concentration, inter-ionic attractions reduce ion mobility and cause Λm to decline as concentration rises.

**Secondary explanation (strong vs. weak electrolyte framing)**: For strong electrolytes, the decline in Λm with rising concentration comes entirely from reduced ion mobility (inter-ionic attraction), since dissociation itself stays essentially complete throughout — this is fundamentally different from weak electrolytes, where Λm's decline with concentration reflects a genuinely lower degree of dissociation at higher concentration (per the electrolyte's dissociation equilibrium).

## 6. Analogy Library

- **Primary analogy**: A crowded highway (higher-concentration solution) where cars (ions) all want to move fast but keep interfering with each other's paths, versus an empty highway (infinite dilution) where every car can travel at its true maximum, unimpeded speed — the cars (ions) haven't disappeared or "stopped existing" in the crowded case, they're just slowed by mutual interference.
- **Breaking point**: The highway analogy conveys the mobility-reduction mechanism well but doesn't naturally distinguish conductance from conductivity (a geometry-vs-material-property distinction that needs the explicit formula-based framing).
- **Anti-analogy**: Do NOT say "higher concentration means less dissociation for a strong electrolyte" — this directly reinforces MC-3.

## 7. Demonstration Library

- **Demonstration 1 (geometry-dependence check)**: Measure or present conductance data for the identical solution in cells of different geometry, showing G changes while κ (computed via G×l/A) stays constant.
- **Demonstration 2 (Λm vs. √c extrapolation)**: Present real molar-conductivity-vs-concentration data for a strong electrolyte, having students extrapolate to c=0 to find Λm°, connecting the extrapolation directly to the infinite-dilution requirement of Kohlrausch's law.

## 8. Discovery Lesson

**Opening**: "If you pour the exact same salt solution into a bigger beaker with different electrodes, does its 'ability to conduct' — in the deepest sense — actually change?"

**Exploration**: Students compute κ from measured G values across different cell geometries for the same solution, discovering κ stays constant while G varies.

**Synthesis**: Guide toward: conductance is an apparatus-dependent measurement; conductivity is the underlying, geometry-independent solution property.

**Closure**: "For a strong electrolyte like NaCl, if Λm drops as concentration rises, does that mean some NaCl 'un-dissociated'? What else could explain the drop?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the G-vs-κ geometry-dependence comparison across different cell sizes for the same solution.
- **TA-2 (TELL)**: State the infinite-dilution requirement of Kohlrausch's law explicitly, connected to the "ions far apart, no interaction" physical reasoning.
- **TA-3 (DO)**: Student extrapolates a given Λm-vs-√c dataset to find Λm° for a strong electrolyte.
- **TA-4 (TEST-THINKING)**: Present MC-3's probe and ask the student to separate the dissociation question from the mobility question explicitly.

## 10. Voice Teaching

Whenever "conductance" is used, immediately clarify whether "conductivity" (the geometry-independent property) is meant instead, since the two terms are easily conflated in casual speech. When discussing declining molar conductivity for a strong electrolyte, explicitly separate "has dissociation declined?" from "has mobility declined?" as two distinct questions before answering either.

## 11. Assessment

**Mastery gate**: Student can (a) correctly distinguish conductance from conductivity using the geometry-dependence argument, (b) explain why Kohlrausch's law specifically requires infinite dilution, (c) correctly attribute a strong electrolyte's declining Λm to mobility reduction, not reduced dissociation.

- **FA-1**: "If you measure conductance of a solution in a small vs. large beaker, does it change? Does conductivity?" — targets MC-1.
- **FA-2**: "Why is Kohlrausch's law specifically stated for infinite dilution?" — targets MC-2.
- **FA-3**: "Does NaCl's molar conductivity changing with concentration mean less of it is dissociating?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students encountering the conductance/conductivity distinction for the first time, since the terms sound almost synonymous.

**Delayed retrieval**: Re-probe MC-3's dissociation-vs-mobility distinction before `chem.elect.electrolysis` builds on ionic mobility and migration concepts directly.

## 12. Recovery Notes

- **S3 (stuck)**: For conductance/conductivity confusion, return to the explicit G=κ(A/l) formula and have the student identify which symbol changes with beaker size.
- **S4 (frustrated)**: Normalize — the near-synonymous everyday usage of "conductance" and "conductivity" makes this a genuinely common, reasonable confusion, not carelessness.
- **S6 (collision)**: Use the geometry-dependence demonstration for MC-1; use the explicit dissociation-vs-mobility question-separation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why Kohlrausch's law wouldn't hold exactly at a moderate, non-infinite concentration.

## 13. Memory & Review

Tag as a definitional-correction memory (conductance vs. conductivity) plus a conceptual-correction memory (infinite-dilution requirement; dissociation vs. mobility). Schedule a spaced check at ~1 week and again before `chem.elect.electrolysis`.

## 14. Transfer Map

Feeds directly into `chem.elect.electrolysis` (ionic migration and mobility concepts established here underlie electrolysis current-carrying mechanisms).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
