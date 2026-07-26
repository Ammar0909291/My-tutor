# chem.solid.ionic-solids — Ionic Crystal Structures

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.solid.ionic-solids` |
| Domain | Solid State |
| Requires | `chem.solid.packing`, `chem.bond.ionic-bonding` |
| Unlocks | (none) |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

Larger lattice energy does NOT universally mean "more stable/better in every respect" — solubility depends on ΔH_solution=−|U_lattice|+|ΔH_hydration|, so a large lattice energy can be OFFSET by an equally large hydration enthalpy, and thermal stability depends on possible decomposition pathways, not lattice energy alone — melting point IS generally correlated with |U|, but only strictly within the SAME structural/charge type; lattice energy is DEFINED as the enthalpy change for the specific process M⁺(g)+X⁻(g)→MX(s), starting from GASEOUS IONS, never from atoms — the separate Born-Haber cycle steps (sublimation, atomization, ionization, electron affinity) convert elements to gaseous ions BEFORE the lattice-energy step, which itself only assembles pre-formed ions; and the Madelung constant is NOT the coordination number — it is the SUM of an alternating series of coulombic terms from ALL ions in the lattice (nearest AND next-nearest AND beyond, for both attractions and repulsions), encoding the FULL electrostatic geometry — CsCl (Madelung A=1.763, coordination number 8:8) genuinely has a HIGHER Madelung constant than NaCl (A=1.748, coordination number 6:6), despite NaCl's lower coordination number, proving the two quantities are not equivalent.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing NaF's larger lattice energy against NaCl's smaller one, then explicitly checking whether NaF is actually less soluble (via the ΔH_solution=−|U|+|ΔH_hyd| balance), demonstrating that larger |U| doesn't guarantee "better" behavior across all properties.

**Representational**: A Born-Haber cycle diagram with the lattice-energy step explicitly starting from gaseous ions M⁺(g)+X⁻(g), preceded by separate sublimation/ionization/electron-affinity steps that convert elements to those ions.

**Abstract**: The general principle that lattice energy is one factor among several (offset by hydration enthalpy for solubility, by decomposition pathways for thermal stability); the general definitional principle that lattice energy specifically starts from gaseous ions, never atoms; the general principle that the Madelung constant encodes full lattice electrostatic geometry, distinct from and not reducible to coordination number.

**Transfer**: Given an unfamiliar ionic compound, correctly assessing whether larger lattice energy implies "better" solubility/stability by checking the relevant balancing factor; correctly constructing a Born-Haber cycle with the lattice-energy step starting from gaseous ions; correctly distinguishing Madelung constant from coordination number for an unfamiliar crystal structure.

## 3. Why Beginners Fail

Students see lattice energy correlate with melting point in familiar examples and generalize this correlation to ALL properties (solubility, thermal stability, general "goodness"), missing that lattice energy is only ONE factor in these more complex properties — solubility specifically depends on the BALANCE between lattice energy and hydration enthalpy, and a large lattice energy can be fully compensated by an equally large hydration enthalpy, so "larger |U|" does not straightforwardly predict lower solubility or greater stability in general; students, when constructing a Born-Haber cycle, reason that since the lattice-energy step ultimately assembles the solid FROM its constituent elements (in some overall sense), the lattice-energy step itself should start from atoms, missing that lattice energy has a precise, narrower DEFINITION specifically as the enthalpy change for combining GASEOUS IONS (not atoms) into the solid lattice — the atom-to-ion conversion happens in separate, earlier Born-Haber cycle steps (sublimation, ionization, electron affinity); and students, encountering the word "Madelung constant" in close association with lattice geometry and ion arrangement, conflate it with the more familiar and intuitive coordination number, missing that the Madelung constant is a considerably more complex quantity — an infinite alternating series summing coulombic contributions from EVERY ion in the lattice at every distance, not merely a count of nearest neighbors — and the two quantities can rank compounds in different orders (CsCl has both a higher Madelung constant AND a higher coordination number than NaCl, but this parallel ranking is coincidental, not a proof of equivalence).

## 4. Misconception Library

### MC-1: Larger lattice energy always means the compound is more stable/has a higher melting point, regardless of the anion
- **Probe**: "NaF has a larger lattice energy than NaCl. Does this mean NaF is always more thermally stable or less soluble than NaCl?"
- **Characteristic phrase**: "larger |U| = better in every respect."
- **Trigger (Type 5, instruction-induced)**: Lattice energy is often introduced as a single, unqualified predictor of "stability" without specifying which specific property it predicts and under what conditions.
- **Conflict evidence [P28]**: Lattice energy is one factor. Solubility depends on ΔH_solution=−|U_lattice|+|ΔH_hyd|; if hydration enthalpy compensates for the large lattice energy, the compound may still be quite soluble. Thermal stability depends on what decomposition products are possible (not directly on lattice energy alone). Melting point IS generally correlated with |U| — but the correlation is only strict within the same structural type and similar charge types.
- **Bridge [P30]**- Different physical properties (melting point, solubility, thermal stability) are governed by DIFFERENT underlying thermodynamic balances, and lattice energy is only a direct, dominant factor for SOME of them (melting point, within consistent structural/charge contexts) — for others (like solubility), lattice energy is just one term in a larger balance equation (against hydration enthalpy), meaning a larger lattice energy alone cannot predict the outcome without also knowing the competing term's magnitude.
- **Replacement [P31]**: Always identify which SPECIFIC property is being predicted and the relevant balancing factors (e.g., hydration enthalpy for solubility) before concluding "larger lattice energy=better" — never treat lattice energy as a universal, unqualified predictor.
- **Discrimination pairs [P33]**: Melting point comparison within the same structural type (lattice energy directly predictive) vs. solubility comparison (lattice energy must be balanced against hydration enthalpy, not directly predictive alone).
- **S6 repair path**: Present the explicit ΔH_solution balance equation, having the student assess both terms before predicting solubility from lattice energy alone.

### MC-2: In the Born-Haber cycle for NaCl, the lattice energy step should include Na as Na⁺ and Cl as Cl because the step forms the lattice from atoms, not ions
- **Probe**: "What are the starting materials for the lattice energy step in the Born-Haber cycle?"
- **Characteristic phrase**: "atoms go into the lattice, so the lattice energy starts from atoms."
- **Trigger (Type 4, notation-induced)**: The overall cycle's starting point (elements) may be conflated with the specific lattice-energy step's own defined starting point.
- **Conflict evidence [P28]**: Lattice energy is DEFINED as the enthalpy change for M⁺(g)+X⁻(g)→MX(s) — starting from GASEOUS IONS, not from atoms. The separate steps (sublimation, atomisation, ionisation, electron affinity) CONVERT elements to gaseous ions BEFORE the lattice energy step assembles them into the solid. The lattice energy step's starting materials are the isolated gaseous ions, not atoms.
- **Bridge [P30]**: The Born-Haber cycle is deliberately DECOMPOSED into a sequence of distinct, individually-defined steps, each with its own precise starting and ending point — the overall cycle beginning with elements does not mean every individual step within it also begins with elements; specifically, the lattice-energy step is defined narrowly and specifically as ion-to-solid, with the atom-to-ion conversion work already completed by the preceding steps.
- **Replacement [P31]**: The lattice-energy step in a Born-Haber cycle always starts from gaseous IONS (M⁺(g)+X⁻(g)), never from atoms — atom-to-ion conversion is handled by separate, earlier steps in the cycle.
- **Discrimination pairs [P33]**: Correct lattice-energy step (Na⁺(g)+Cl⁻(g)→NaCl(s)) vs. incorrect atom-based step (Na(g)+Cl(g)→NaCl(s), which conflates lattice energy with a combination of ionization/electron-affinity/lattice-energy steps).
- **S6 repair path**: Present the full explicit Born-Haber cycle with each step's precise starting/ending species labeled, isolating the lattice-energy step's specific ion-to-solid definition.

### MC-3: The Madelung constant tells you how many nearest neighbours the ion has (coordination number)
- **Probe**: "NaCl has A = 1.748 and CsCl has A = 1.763. NaCl has CN = 6:6 and CsCl has CN = 8:8. How does the Madelung constant relate to coordination number?"
- **Characteristic phrase**: "Madelung = coordination number."
- **Trigger (Type 3, language contamination)**: Both terms are introduced in close proximity when discussing lattice geometry, inviting a surface-level conflation.
- **Conflict evidence [P28]**: The Madelung constant is NOT the coordination number. It is the SUM of an alternating series of coulombic terms from ALL ions in the lattice (nearest+next-nearest+next-next-nearest... for both attractions and repulsions). For NaCl: A=6/1−12/√2+8/√3−6/2+...≈1.748. It encodes the FULL ELECTROSTATIC GEOMETRY of the lattice, not just the nearest neighbours. CsCl (A=1.763) has a HIGHER Madelung constant than NaCl (A=1.748) even though CsCl has CN=8 and NaCl CN=6 — showing the Madelung constant and CN are not equivalent.
- **Bridge [P30]**: The Madelung constant is a mathematically much richer quantity than a simple neighbor count — it is an INFINITE, ALTERNATING series summing electrostatic (coulombic) contributions from every ion in the lattice at every distance, with attractive and repulsive terms partially canceling in a specific, structure-dependent pattern; while coordination number (a simple count) and the Madelung constant (a converging infinite sum) both derive from the same underlying lattice geometry, they capture genuinely different mathematical aspects of it, and can rank compounds differently or, as in this case, coincidentally agree in ranking direction without being interchangeable quantities.
- **Replacement [P31]**: The Madelung constant is a converging infinite sum of alternating coulombic terms encoding the full lattice electrostatic geometry — never equate it with coordination number, even when their rankings happen to align for a given comparison.
- **Discrimination pairs [P33]**: Coordination number (a simple count of nearest neighbors, e.g., 6 for NaCl) vs. Madelung constant (an infinite alternating coulombic sum over the whole lattice, e.g., 1.748 for NaCl) — related to the same structure but mathematically and conceptually distinct quantities.
- **S6 repair path**: Present the explicit partial-series computation for NaCl's Madelung constant, showing the alternating nearest/next-nearest/next-next-nearest terms contributing beyond simple neighbor counting.

## 5. Explanation Library

**Primary explanation**: Lattice energy is one specific thermodynamic factor among several governing an ionic compound's properties — it correlates well with melting point within consistent structural/charge contexts, but for solubility specifically, it must be balanced against hydration enthalpy (ΔH_solution=−|U|+|ΔH_hyd|), meaning larger lattice energy alone cannot predict solubility or general "stability" without considering the competing term.

**Secondary explanation (precise definitions in the Born-Haber cycle and Madelung constant)**: The lattice-energy step in a Born-Haber cycle is precisely defined as starting from gaseous ions (M⁺(g)+X⁻(g)→MX(s)), never from atoms — the atom-to-ion conversion is handled by separate, earlier cycle steps. The Madelung constant is a mathematically distinct quantity from coordination number — an infinite, alternating sum of coulombic contributions from the entire lattice, not a simple nearest-neighbor count, and the two quantities can genuinely diverge or coincidentally align in ranking without being equivalent.

## 6. Analogy Library

- **Primary analogy**: A tug-of-war between two teams (lattice energy pulling toward the solid state, hydration enthalpy pulling toward dissolution) — knowing only one team's strength (lattice energy) tells you nothing about who wins (solubility) without also knowing the other team's strength (hydration enthalpy).
- **Breaking point**: The tug-of-war analogy conveys the balance-of-factors concept for solubility well but doesn't naturally capture the precise ion-vs-atom starting point for lattice energy (MC-2) or the Madelung-constant-vs-coordination-number distinction (MC-3) — those need the explicit Born-Haber cycle diagram and the partial-series computation.
- **Anti-analogy**: Do NOT say "bigger lattice energy always wins in every comparison" — this directly reinforces MC-1 by ignoring the property-specific balancing factors.

## 7. Demonstration Library

- **Demonstration 1 (ΔH_solution balance-equation check for NaF vs. NaCl)**: Compute the explicit ΔH_solution balance for both compounds, checking whether larger lattice energy actually predicts lower solubility.
- **Demonstration 2 (full Born-Haber cycle with labeled step boundaries)**: Present the complete cycle explicitly, labeling each step's precise starting/ending species, isolating the lattice-energy step's ion-only starting point.
- **Demonstration 3 (partial Madelung-series computation for NaCl)**: Compute the explicit alternating nearest/next-nearest series terms for NaCl, deriving the constant beyond simple neighbor counting.

## 8. Discovery Lesson

**Opening**: "NaF has a larger lattice energy than NaCl. Does this automatically mean NaF is less soluble?"

**Exploration**: Students compute the ΔH_solution balance explicitly, discovering hydration enthalpy can compensate for a larger lattice energy.

**Synthesis**: Guide toward: lattice energy is one factor among several — always check the relevant balancing factor for the specific property in question.

**Closure**: "Does the Madelung constant directly tell you the coordination number?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit ΔH_solution balance-equation computation for NaF vs. NaCl.
- **TA-2 (TELL)**: State the ion-only starting point for the lattice-energy Born-Haber step explicitly, anchored to the full labeled cycle diagram.
- **TA-3 (DO)**: Student constructs a Born-Haber cycle for an unfamiliar ionic compound, correctly placing the lattice-energy step.
- **TA-4 (TEST-THINKING)**: Present the Madelung-constant-vs-CN probe and ask the student to justify why CsCl's higher Madelung constant doesn't simply equal its coordination number.

## 10. Voice Teaching

Whenever lattice energy is used to predict a property, narrate "check which specific property, and what it's balanced against — lattice energy alone isn't enough." Whenever the Born-Haber cycle's lattice-energy step is set up, state "always start from gaseous ions, never atoms" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly assess lattice energy's predictive power for a specific property by checking the relevant balancing factor, (b) correctly construct the lattice-energy step in a Born-Haber cycle starting from gaseous ions, (c) correctly distinguish the Madelung constant from coordination number.

- **FA-1**: "NaF has a larger lattice energy than NaCl. Does this mean NaF is always more thermally stable or less soluble than NaCl?" — targets MC-1.
- **FA-2**: "What are the starting materials for the lattice energy step in the Born-Haber cycle?" — targets MC-2.
- **FA-3**: "How does the Madelung constant relate to coordination number?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only seen lattice energy correlate cleanly with melting point, without exposure to the solubility counterexample.

**Delayed retrieval**: Re-probe MC-2's ion-only lattice-energy definition and MC-3's Madelung-constant distinction as foundational knowledge for subsequent advanced solid-state and thermodynamics applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the "bigger lattice energy = better" confusion, have the student explicitly identify the relevant balancing factor for the specific property before drawing any conclusion.
- **S4 (frustrated)**: Normalize — treating lattice energy as a universal predictor is genuinely common on first exposure, since it's often first introduced via a clean melting-point correlation.
- **S6 (collision)**: Use the explicit labeled Born-Haber cycle for MC-2; use the partial Madelung-series computation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why the lattice-energy step starts from ions, not atoms.

## 13. Memory & Review

Tag as two conceptual-correction memories (property-specific lattice-energy predictive power; Madelung-constant vs. coordination-number distinction) plus one procedural memory (ion-only lattice-energy Born-Haber step). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates packing and ionic-bonding reasoning built across `chem.solid.packing` and `chem.bond.ionic-bonding`, forming a capstone application to advanced solid-state chemistry and thermodynamics contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
