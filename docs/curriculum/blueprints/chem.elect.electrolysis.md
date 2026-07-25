# chem.elect.electrolysis — Electrolysis and Faraday's Laws

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.elect.electrolysis` |
| Domain | Electrochemistry |
| Requires | `chem.elect.galvanic-cell`, `chem.elect.conductance` |
| Unlocks | `chem.elect.industrial` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

The cathode is ALWAYS defined by the PROCESS occurring there (reduction), never by its sign — in a galvanic cell the cathode is the positive terminal, but in an electrolytic cell the cathode is connected to the NEGATIVE terminal of the external power supply (electrons pumped in to force reduction), so the sign flips between cell types while the defining process (reduction) never does; in AQUEOUS electrolysis, water genuinely competes with dissolved cations/anions for discharge at the electrodes, and the species with the more favorable (less negative, for cations; or, for common anions, kinetically favorable) discharge potential wins — so aqueous NaCl deposits H₂ at the cathode (water reduced far more readily than Na⁺, E°(Na⁺/Na)=−2.71V vs. E°(H₂O/H₂)=−0.83V), and only MOLTEN NaCl (Down's cell, no water present) deposits metallic Na; and Faraday's Second Law states EQUAL CHARGE passed gives EQUAL MOLES OF ELECTRONS, never equal MASS, across different electrolytic cells in series — mass deposited depends on M/n (the electrochemical equivalent), which differs by ion.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Tracing the external circuit of an electrolytic cell explicitly — power supply negative terminal → wire → cathode (reduction happens here) → electrolyte → anode (oxidation happens here) → wire → power supply positive terminal — confirming the cathode's sign flips relative to a galvanic cell while its defining process does not.

**Representational**: A side-by-side circuit diagram comparing a galvanic cell (cathode = positive terminal, spontaneous, generates current) against an electrolytic cell (cathode = connected to negative terminal, non-spontaneous, driven by external current), both labeled by process (reduction at cathode in both) rather than by sign alone.

**Abstract**: The general principle that electrode identity is defined by process (oxidation=anode, reduction=cathode), with sign determined afterward by cell type; the general competitive-discharge principle governing which species is actually deposited/liberated in aqueous vs. molten electrolysis; Faraday's Second Law as equal moles of electrons (not equal mass) per equal charge.

**Transfer**: Given an unfamiliar electrolytic setup (aqueous or molten, single or series cells), correctly identifying the cathode/anode by process and sign, correctly predicting which species is actually discharged (accounting for aqueous competition with water), and correctly computing deposited mass via moles of electrons and the electrochemical equivalent M/n.

## 3. Why Beginners Fail

Students apply the galvanic-cell convention (cathode = positive) directly to electrolytic cells, missing that the cathode's SIGN depends on cell type while its DEFINING PROCESS (reduction) never changes — in electrolysis the cathode is connected to the negative terminal of the external supply, precisely the opposite sign from a galvanic cell; they assume the cation present in solution (e.g., Na⁺ in aqueous NaCl) is automatically the species deposited at the cathode, missing that in AQUEOUS solutions, water competes with dissolved cations for reduction, and water often wins decisively (E°(H₂O/H₂)=−0.83V is far less negative than E°(Na⁺/Na)=−2.71V, so H₂ is produced instead of Na) — metallic sodium is only obtained from MOLTEN NaCl electrolysis, with no water present to compete; and they assume Faraday's Second Law means equal charge always deposits equal MASS across different metals, missing that equal charge gives equal MOLES OF ELECTRONS, while mass depends on the electrochemical equivalent M/n, which differs by ion (e.g., Cu²⁺ requiring 2 electrons per atom vs. Ag⁺ requiring only 1, so equal charge deposits different masses of each).

## 4. Misconception Library

### MC-1: In electrolysis, the cathode is the positive electrode
- **Probe**: "In a galvanic cell, is the cathode positive or negative? Now in an electrolytic cell, which terminal of the external power supply is connected to the cathode?"
- **Characteristic phrase**: "cathode is positive in electrolysis too."
- **Trigger (Type 4, notation-induced)**: Students learn "cathode = positive" as a fixed rule from galvanic cells and apply it universally, not recognizing the rule was specific to spontaneous cells.
- **Conflict evidence [P28]**: The cathode is ALWAYS the electrode where REDUCTION occurs — that is the definition, independent of cell type. In a GALVANIC cell, the cathode is the POSITIVE terminal (conventional current flows into it from the external circuit). In an ELECTROLYTIC cell, the cathode is connected to the NEGATIVE terminal of the external power supply (electrons are pumped IN to force reduction) — the sign is genuinely opposite between the two cell types.
- **Bridge [P30]**: Electrode identity is anchored to the PROCESS (reduction=cathode, oxidation=anode) as the invariant definition; the SIGN of each electrode is then deduced separately from the specific cell type (spontaneous galvanic vs. externally-driven electrolytic), never assumed to transfer directly between the two.
- **Replacement [P31]**: Always identify cathode/anode by process (reduction/oxidation) first, then deduce sign from cell type — never assume the galvanic-cell sign convention applies to an electrolytic cell.
- **Discrimination pairs [P33]**: Galvanic cathode (positive terminal, reduction, spontaneous) vs. electrolytic cathode (connected to negative terminal, reduction, externally driven) — same process, opposite sign.
- **S6 repair path**: Present the explicit external-circuit trace for both cell types side by side, anchoring on process before sign.

### MC-2: In chloralkali electrolysis, sodium is deposited at the cathode from aqueous NaCl because Na⁺ is the cation
- **Probe**: "Compare E°(Na⁺/Na) and E°(H₂O/H₂). Which is more readily reduced?"
- **Characteristic phrase**: "Na⁺ migrates to cathode so Na must be deposited."
- **Trigger (Type 5, instruction-induced)**: Students assume the cation present in solution is automatically the species reduced at the cathode, without checking competitive discharge against water.
- **Conflict evidence [P28]**: E°(Na⁺/Na)=−2.71V; E°(2H₂O+2e⁻→H₂+2OH⁻)=−0.83V. Water is far more easily reduced than Na⁺ in aqueous solution → H₂ is produced at the cathode, NOT Na. Na is only produced in the DOWN'S CELL where the electrolyte is MOLTEN NaCl (no water present).
- **Bridge [P30]**: In AQUEOUS electrolysis, water itself is always a competing species for both reduction (at the cathode) and oxidation (at the anode) — the species actually discharged is whichever is easiest to reduce/oxidize under the real conditions, not simply "whichever ion is present." This is the distinction between molten and aqueous electrolytes — in aqueous systems, H₂O and H⁺ compete with dissolved cations and often win.
- **Replacement [P31]**: In aqueous electrolysis, always compare the discharge potential of the dissolved ion against water's own discharge potential before predicting the product — presence of an ion in solution does not guarantee its discharge.
- **Discrimination pairs [P33]**: Aqueous NaCl electrolysis (H₂ produced at cathode, water wins) vs. molten NaCl electrolysis (Na produced at cathode, no water present to compete).
- **S6 repair path**: Present the explicit E° comparison between Na⁺/Na and H₂O/H₂, then contrast aqueous vs. molten conditions.

### MC-3: Faraday's Second Law means you always get the same mass of different metals from the same charge
- **Probe**: "If 96 500 C is passed through CuSO₄ and AgNO₃ solutions in series, what mass of each is deposited?"
- **Characteristic phrase**: "same charge = same mass for both metals."
- **Trigger (Type 1, overgeneralization)**: Students generalize "same charge gives the same result" from moles of electrons to mass, without accounting for differing electrons-per-ion (n) and molar mass (M) across metals.
- **Conflict evidence [P28]**: The SAME CHARGE gives the SAME NUMBER OF MOLES OF ELECTRONS. But the mass deposited depends on M/n (the electrochemical equivalent). Cu²⁺+2e⁻→Cu: moles Cu=(96500/96500)/2=0.5mol → mass=0.5×63.5=31.75g. Ag⁺+e⁻→Ag: moles Ag=96500/96500=1mol → mass=107.9g. The MOLES of electrons are equal, but the masses differ because n (and M) differ.
- **Bridge [P30]**: Faraday's Second Law is precisely and only a statement about moles of electrons per unit charge — it says nothing directly about mass. Converting from moles of electrons to mass requires the additional, ion-specific steps of dividing by n (electrons per ion) and multiplying by M (molar mass), both of which vary by species.
- **Replacement [P31]**: "Same charge = same moles of electrons" is the correct statement of Faraday's Second Law — mass deposited must be separately computed via M/n for each specific ion, never assumed equal across different metals.
- **Discrimination pairs [P33]**: Cu²⁺ (n=2, mass=31.75g) vs. Ag⁺ (n=1, mass=107.9g) from identical charge — equal moles of electrons, unequal masses.
- **S6 repair path**: Walk through both computations explicitly side by side, highlighting the shared moles-of-electrons step and the diverging M/n step.

## 5. Explanation Library

**Primary explanation**: Cathode and anode are defined by process (reduction=cathode, oxidation=anode), a definition that never changes between cell types — but the SIGN of each electrode depends on whether the cell is galvanic (spontaneous, generating current) or electrolytic (driven by an external power supply), and these signs are genuinely opposite between the two cell types. In electrolysis, the cathode connects to the power supply's negative terminal, forcing reduction that would not occur spontaneously.

**Secondary explanation (competitive discharge and Faraday's Second Law)**: In aqueous electrolysis, the species actually discharged at each electrode is determined by competitive discharge potentials — water itself is always a competitor, and frequently wins over dissolved ions like Na⁺, which is why aqueous NaCl electrolysis produces H₂, not Na (metallic Na requires molten NaCl electrolysis instead). Faraday's Second Law states that equal charge gives equal moles of electrons across different cells in series — but the resulting MASS deposited differs by ion, since mass depends on the electrochemical equivalent M/n (molar mass divided by electrons transferred per ion).

## 6. Analogy Library

- **Primary analogy**: A job interview where "cathode = the position that gets filled (reduction/gaining)" — in a galvanic cell this position pays out (positive terminal), while in an electrolytic cell someone must be paid to force the filling (negative terminal, external power) — the job description (reduction) stays fixed, but who's paying whom flips.
- **Breaking point**: The job-interview analogy conveys the process-vs-sign distinction well but doesn't naturally capture competitive discharge or the electrochemical-equivalent computation — those need the explicit E° comparison and worked mass calculations.
- **Anti-analogy**: Do NOT say "the cathode is wherever positive current goes in" as a universal rule — this directly reinforces MC-1 by treating a galvanic-specific sign rule as universal.

## 7. Demonstration Library

- **Demonstration 1 (galvanic vs. electrolytic circuit trace)**: Trace the external circuit for both cell types side by side, showing the cathode's process (reduction) stays fixed while its sign flips.
- **Demonstration 2 (aqueous vs. molten NaCl electrolysis)**: Compute the E° comparison for Na⁺/Na vs. H₂O/H₂, then explicitly contrast the aqueous product (H₂) against the molten product (Na).
- **Demonstration 3 (Faraday's Second Law worked comparison)**: Compute deposited mass for Cu²⁺ and Ag⁺ from identical charge side by side, highlighting the shared moles-of-electrons step and the diverging mass outcome.

## 8. Discovery Lesson

**Opening**: "If you electrolyze aqueous NaCl, do you think you'll get metallic sodium at the cathode?"

**Exploration**: Students compare E°(Na⁺/Na) against E°(H₂O/H₂), discovering water is reduced far more readily, and that H₂ (not Na) is actually produced.

**Synthesis**: Guide toward: in aqueous electrolysis, water always competes with dissolved ions for discharge, and the easier-to-reduce/oxidize species wins — presence of an ion in solution never guarantees its discharge.

**Closure**: "If 96 500 C deposits 0.5 mol of Cu but 1 mol of Ag, does 'same charge' mean 'same mass'?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the side-by-side galvanic-vs-electrolytic circuit trace, anchoring cathode identity on process before sign.
- **TA-2 (TELL)**: State the aqueous-vs-molten NaCl electrolysis distinction explicitly, backed by the E° comparison.
- **TA-3 (DO)**: Student computes deposited mass for two different ions from an identical charge, using Faraday's Second Law correctly.
- **TA-4 (TEST-THINKING)**: Present the chloralkali probe and ask the student to justify why H₂, not Na, forms at the cathode using E° comparison, not ion presence alone.

## 10. Voice Teaching

Whenever cathode/anode is discussed in electrolysis, narrate "process first (reduction=cathode), then sign from cell type — never assume the galvanic sign." Whenever Faraday's Second Law is applied, state "same moles of electrons, not same mass" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly identify cathode/anode by process and correctly deduce sign for a given cell type, (b) correctly predict which species is actually discharged in aqueous electrolysis via competitive discharge potentials, (c) correctly compute deposited mass for different ions from identical charge using M/n.

- **FA-1**: "In an electrolytic cell, which terminal of the external power supply connects to the cathode?" — targets MC-1.
- **FA-2**: "Predict the cathode product when aqueous NaCl is electrolyzed, and justify using E° values." — targets MC-2.
- **FA-3**: "96 500 C is passed through CuSO₄ and AgNO₃ solutions in series. Compute the mass of each metal deposited." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who learned "cathode = positive" as a memorized universal rule from galvanic cells without exposure to electrolytic cells.

**Delayed retrieval**: Re-probe MC-2's competitive-discharge reasoning and MC-3's M/n computation before `chem.elect.industrial` requires fluent application to real industrial electrolysis processes.

## 12. Recovery Notes

- **S3 (stuck)**: For the cathode-sign confusion, have the student explicitly trace the external circuit before assigning any sign, never relying on a memorized rule alone.
- **S4 (frustrated)**: Normalize — the sign flip between galvanic and electrolytic cathodes is genuinely counterintuitive on first exposure and a very common point of confusion.
- **S6 (collision)**: Use the explicit E° comparison for MC-2; use the side-by-side Cu/Ag mass computation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why aqueous NaCl electrolysis produces H₂ rather than Na.

## 13. Memory & Review

Tag as a procedural memory (electrode identification by process, then sign by cell type; Faraday's Second Law mass computation) plus one conceptual-correction memory (aqueous competitive discharge with water). Schedule a spaced check at ~1 week and again before `chem.elect.industrial`.

## 14. Transfer Map

Feeds directly into `chem.elect.industrial` (industrial electrolysis processes — chloralkali, aluminum extraction, electrorefining — directly require fluent, correct electrode identification, competitive-discharge reasoning, and Faraday's Law mass computation established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
