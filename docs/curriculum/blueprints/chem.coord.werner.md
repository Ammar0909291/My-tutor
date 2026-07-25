# chem.coord.werner — Werner's Theory of Coordination Compounds

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.coord.werner` |
| Domain | Coordination Chemistry |
| Requires | `chem.bond.coordinate-bond` |
| Unlocks | `chem.coord.cft`, `chem.coord.nomenclature`, `chem.coord.stability` |
| Difficulty | proficient |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Werner's theory distinguishes primary valency (oxidation state, satisfied by anions, determined via overall charge balance) from secondary valency (coordination number, the count of donor atoms directly bonded, determined structurally) — these are genuinely INDEPENDENT quantities, often numerically different for the same complex (e.g., [Co(NH₃)₆]Cl₃ has oxidation state +3 but coordination number 6); anions are not automatically counter-ions outside the coordination sphere — they CAN be ligands directly bonded inside the bracket (like Cl⁻ in [Co(NH₃)₄Cl₂]Cl, where two Cl⁻ are ligands and one is a counter-ion), with Werner's classic conductivity/precipitation experiments distinguishing the two roles; and coordination number is NOT universally 6 — it genuinely varies by metal and oxidation state (Ag⁺/Au⁺ commonly CN=2 linear; Cu²⁺/Ni²⁺ commonly CN=4 square planar or tetrahedral; CN=6 octahedral is common but far from universal for first-row transition metals).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Determining Co's oxidation state (+3, from charge balance) and coordination number (6, from counting bonded NH₃ ligands) in [Co(NH₃)₆]Cl₃ — two different numbers describing two different properties.

**Representational**: A structural diagram of [Co(NH₃)₄Cl₂]Cl showing exactly which Cl⁻ ions sit inside the coordination sphere (as ligands) versus outside (as counter-ions), visually distinguishing the two roles.

**Abstract**: The general principle that primary valency (oxidation state, a charge-balance property) and secondary valency (coordination number, a structural/bonding property) are independently determined, never assumed equal; the recognition that coordination number varies genuinely by metal identity, not fixed at any single universal value.

**Transfer**: Given an unfamiliar coordination compound's formula, correctly computing oxidation state via charge balance, correctly determining coordination number by counting bonded donor atoms, correctly identifying which anions (if any) are ligands versus counter-ions, and correctly predicting coordination number without assuming it's always 6.

## 3. Why Beginners Fail

Students conflate coordination number with oxidation state or valency, assuming a complex with 6 ligands must have an oxidation state of +6, missing that these are measured by entirely different methods (charge balance for oxidation state, direct bond counting for coordination number) and frequently produce different numeric values for the same complex; they assume all anions present in a complex's formula (like Cl⁻ or Br⁻) are automatically counter-ions sitting outside the coordination sphere, missing that anions can genuinely serve as ligands bonded directly to the metal, with their specific role (ligand vs. counter-ion) determined experimentally, not by anion identity alone; and they assume coordination number is universally 6 (octahedral) for all transition metal complexes, missing that coordination number genuinely varies by metal and oxidation state, with common values including 2 (linear, e.g., Ag⁺), 4 (square planar or tetrahedral, e.g., Cu²⁺/Ni²⁺), and 6 (octahedral, common but not universal).

## 4. Misconception Library

### MC-1: Coordination number is the same as valency or oxidation state
- **Probe**: "In [Co(NH₃)₆]Cl₃, what is the oxidation state and what is the coordination number of Co?"
- **Characteristic phrase**: "Co is +6 because it has 6 ligands."
- **Trigger (Type 3, language contamination)**: The word "valency" historically used loosely for both concepts (Werner's own "primary" and "secondary" valency terminology) leads students to conflate the two distinct numbers into a single quantity.
- **Conflict evidence [P28]**: Oxidation state (OS) is determined via charge balance — for [Co(NH₃)₆]Cl₃, Co + 6×(0, since NH₃ is neutral) + 3×(−1, from the three Cl⁻ counter-ions) = 0 overall, giving Co=+3; coordination number (CN) is instead the count of donor atoms directly bonded to the metal — here, 6 NH₃ molecules bonded, giving CN=6; these two genuinely DIFFERENT numbers (OS=3, CN=6) for the very same complex directly disprove any assumption that they're the same quantity.
- **Bridge [P30]**: Oxidation state and coordination number are measured by fundamentally different methods answering different questions — OS answers "what is the metal's formal charge, balanced against all surrounding charged species?" while CN answers "how many donor atoms are structurally bonded to the metal?" — there's no inherent reason these two independently-determined numbers should match.
- **Replacement [P31]**: Always compute oxidation state via charge balance and coordination number via direct bond-counting as two SEPARATE procedures — never assume one equals the other.
- **Discrimination pairs [P33]**: [Co(NH₃)₆]Cl₃'s oxidation state (+3, from charge balance) vs. its coordination number (6, from bond counting) — different numbers, different methods, same complex.
- **S6 repair path**: Walk through both computations explicitly and separately for the same complex, showing the two different resulting numbers side by side.

### MC-2: All anions in the formula (Cl⁻, Br⁻) are counter-ions outside the coordination sphere
- **Probe**: "Write the formula and charge of the complex ion in CoCl₃·4NH₃."
- **Characteristic phrase**: "the Cl atoms are always outside the bracket."
- **Trigger (Type 5, instruction-induced)**: Early, simplified examples may consistently show anions as counter-ions, leading students to generalize this pattern as a universal rule rather than a case-by-case structural fact.
- **Conflict evidence [P28]**: Anions CAN genuinely serve as ligands, bonded directly inside the coordination sphere — chloride (Cl⁻) is a common monodentate ligand (donating one lone pair, sometimes called "chlorido" in modern nomenclature); in [Co(NH₃)₄Cl₂]Cl specifically, two of the three chloride ions are ligands (INSIDE the bracket, directly bonded to Co) while only the third is a counter-ion (OUTSIDE the bracket) — Werner's classic precipitation/conductivity experiments were specifically designed to distinguish which anions are ligands (unprecipitated by AgNO₃, since they're bound to the metal) versus counter-ions (readily precipitated as AgCl, since they're free in solution).
- **Bridge [P30]**: Whether a given anion acts as a ligand or a counter-ion is a structural fact about that SPECIFIC complex, determined by whether primary or secondary valency is being satisfied — it cannot be assumed from the anion's identity (chloride, bromide, etc.) alone, since the same anion type can play either role depending on the specific compound.
- **Replacement [P31]**: Anions can be either ligands (inside the coordination sphere, directly bonded) or counter-ions (outside, free in solution) — determine each anion's specific role experimentally (e.g., via precipitation testing) or from the given structural formula, never assume all anions are automatically counter-ions.
- **Discrimination pairs [P33]**: [Co(NH₃)₆]Cl₃ (all three Cl⁻ are counter-ions, none are ligands) vs. [Co(NH₃)₄Cl₂]Cl (two Cl⁻ are ligands inside the bracket, one is a counter-ion outside) — same anion type, different roles depending on the specific complex.
- **S6 repair path**: Present Werner's precipitation-test logic explicitly, connecting "doesn't precipitate with AgNO₃" to "is a ligand, bound inside the sphere" versus "readily precipitates" to "is a free counter-ion."

### MC-3: The coordination number of all transition metals in complexes is 6
- **Probe**: "What is the coordination number of silver in [Ag(NH₃)₂]⁺?"
- **Characteristic phrase**: "all complexes are octahedral."
- **Trigger (Type 1, overgeneralization)**: Octahedral (CN=6) complexes are frequently used as the primary teaching example, leading students to overgeneralize this specific, common case into a universal rule for all transition metal complexes.
- **Conflict evidence [P28]**: Coordination number genuinely varies by metal identity and oxidation state — Ag⁺ and Au⁺ commonly show CN=2 (linear geometry, as in [Ag(NH₃)₂]⁺, directly contradicting the CN=6 assumption); Cu²⁺ and Ni²⁺ commonly show CN=4 (square planar or tetrahedral geometry); CN=6 (octahedral) is indeed the most common coordination number for many first-row transition metal complexes, but it is genuinely NOT universal across all metals and oxidation states.
- **Bridge [P30]**: Coordination number reflects the specific metal ion's electronic structure, size, and oxidation state preferences — different metals genuinely prefer different coordination geometries, making CN=6 a common but far from exclusive outcome, not a fixed universal rule.
- **Replacement [P31]**: Coordination number varies genuinely by metal and oxidation state — common values include 2 (linear, e.g., Ag⁺/Au⁺), 4 (square planar or tetrahedral, e.g., Cu²⁺/Ni²⁺), and 6 (octahedral, common for many first-row transition metals but not universal) — always determine CN case-by-case, never assume 6 by default.
- **Discrimination pairs [P33]**: [Ag(NH₃)₂]⁺ (CN=2, linear, silver's typical preference) vs. [Co(NH₃)₆]³⁺ (CN=6, octahedral, cobalt's typical preference) — genuinely different coordination numbers for different metals.
- **S6 repair path**: Present [Ag(NH₃)₂]⁺'s structure directly, having the student count only 2 bonded NH₃ ligands, directly contradicting the CN=6 default assumption.

## 5. Explanation Library

**Primary explanation**: Werner's theory distinguishes two independently-determined properties of a coordination compound: primary valency (oxidation state, satisfied by the metal's charge balance against surrounding ionic species) and secondary valency (coordination number, the actual count of donor atoms directly bonded to the metal, determined structurally). These two numbers are measured by entirely different methods and frequently differ for the same complex — never assume they're equal.

**Secondary explanation (ligand-vs-counter-ion and variable-CN framing)**: Anions in a coordination compound's formula can serve as either ligands (bonded directly inside the coordination sphere, satisfying secondary valency) or counter-ions (free outside the sphere, balancing overall charge) — this role must be determined structurally or experimentally (as Werner did via precipitation and conductivity testing), never assumed from the anion's identity alone. Coordination number itself varies genuinely by metal and oxidation state, with common values of 2, 4, or 6 depending on the specific metal ion involved — never assumed to be universally 6.

## 6. Analogy Library

- **Primary analogy**: A hotel's total bill (oxidation state, an overall balance-sheet number) versus the number of rooms actually occupied (coordination number, a direct physical count) — these are computed from entirely different information (total charges owed vs. rooms physically filled), and there's no reason the two numbers should match just because they both describe the same hotel.
- **Breaking point**: The hotel-bill-vs-rooms analogy conveys the independence of the two quantities well but doesn't naturally capture the ligand-vs-counter-ion distinction or the variable-CN principle — those need the explicit precipitation-test and metal-specific-geometry arguments.
- **Anti-analogy**: Do NOT say "6 ligands means +6 oxidation state" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (OS-vs-CN dual computation)**: Compute both oxidation state (via charge balance) and coordination number (via bond counting) explicitly and separately for [Co(NH₃)₆]Cl₃, showing the two different resulting numbers.
- **Demonstration 2 (Werner's precipitation-test logic)**: Walk through the conceptual precipitation-test reasoning distinguishing ligand chlorides (don't precipitate, bound inside the sphere) from counter-ion chlorides (readily precipitate, free in solution) for [Co(NH₃)₄Cl₂]Cl.

## 8. Discovery Lesson

**Opening**: "[Co(NH₃)₆]Cl₃ has 6 ligands bonded to cobalt. Does that mean cobalt's oxidation state is +6?"

**Exploration**: Students compute oxidation state via charge balance separately from coordination number via bond counting, discovering the two numbers (+3 and 6) differ.

**Synthesis**: Guide toward: oxidation state and coordination number are independently-determined properties, measured by entirely different methods.

**Closure**: "Is [Ag(NH₃)₂]⁺'s coordination number also 6, just like most cobalt complexes?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the dual OS/CN computation for [Co(NH₃)₆]Cl₃ explicitly, side by side.
- **TA-2 (TELL)**: State the ligand-vs-counter-ion distinction explicitly, immediately followed by Werner's precipitation-test logic for [Co(NH₃)₄Cl₂]Cl.
- **TA-3 (DO)**: Student determines coordination number for a new, unfamiliar complex (like a silver or copper complex) without defaulting to 6.
- **TA-4 (TEST-THINKING)**: Present MC-2's CoCl₃·4NH₃ probe and ask the student to identify which chlorides are ligands versus counter-ions.

## 10. Voice Teaching

Whenever oxidation state and coordination number are both discussed for the same complex, compute and state them as two SEPARATE numbers explicitly, never implying a default relationship. Whenever coordination number is assigned, ask "what does THIS specific metal typically prefer?" rather than defaulting to 6.

## 11. Assessment

**Mastery gate**: Student can (a) correctly compute oxidation state and coordination number as independent quantities for a given complex, (b) correctly identify which anions in a formula are ligands versus counter-ions, (c) correctly determine coordination number without assuming a universal value of 6.

- **FA-1**: "In [Co(NH₃)₆]Cl₃, what is the oxidation state and coordination number of Co?" — targets MC-1.
- **FA-2**: "Write the formula and charge of the complex ion in CoCl₃·4NH₃." — targets MC-2.
- **FA-3**: "What is the coordination number of silver in [Ag(NH₃)₂]⁺?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-3 among students who've primarily seen octahedral (CN=6) examples so far.

**Delayed retrieval**: Re-probe MC-1's OS-vs-CN independence and MC-3's variable-CN principle before `chem.coord.cft`/`chem.coord.nomenclature` require fluent, correct structural analysis of diverse complexes.

## 12. Recovery Notes

- **S3 (stuck)**: For the OS-CN conflation, compute the two quantities in two entirely separate, clearly labeled steps before comparing results.
- **S4 (frustrated)**: Normalize — Werner's own historical "primary/secondary valency" terminology genuinely does invite the conflation, making this a reasonable, common confusion rooted in the field's own naming history.
- **S6 (collision)**: Use the explicit precipitation-test reasoning for MC-2; use the [Ag(NH₃)₂]⁺ direct-count demonstration for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why coordination number and oxidation state can genuinely differ for the same complex.

## 13. Memory & Review

Tag as a conceptual-correction memory (OS vs. CN independence; ligand vs. counter-ion role; variable coordination number by metal). Schedule a spaced check at ~1 week and again before `chem.coord.cft`/`chem.coord.nomenclature`.

## 14. Transfer Map

Feeds directly into `chem.coord.cft` (crystal field theory analysis requires fluent, correct coordination number and geometry determination), `chem.coord.nomenclature` (naming coordination compounds requires correctly distinguishing ligands from counter-ions), and `chem.coord.stability` (stability constant analysis assumes correct structural understanding of the coordination sphere).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
