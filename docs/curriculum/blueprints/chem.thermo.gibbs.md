# chem.thermo.gibbs — Gibbs Free Energy

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.thermo.gibbs` |
| Domain | Thermodynamics |
| Requires | `chem.thermo.enthalpy`, `chem.thermo.entropy` |
| Unlocks | `chem.equil.concept`, `chem.thermo.cell-thermo` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

Gibbs free energy (ΔG = ΔH − TΔS) combines enthalpy and entropy into a single system-side spontaneity indicator at constant temperature and pressure, related to the equilibrium constant by ΔG° = −RT ln K (so ΔG°=0 means K=1, a genuine, actively-occurring equilibrium, not "nothing happens") — with the crucial distinction that ΔG° (the standard-state value) predicts spontaneity only at standard-state concentrations, while the actual driving force at any real concentration is ΔG = ΔG° + RT ln Q, meaning a positive ΔG° reaction can still proceed forward if Q is kept small enough (e.g., large reactant excess).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: A reaction with ΔG° = +20 kJ/mol that nonetheless proceeds forward when set up with a huge excess of reactant relative to product — direct evidence that the standard-state ΔG° isn't the whole story.

**Representational**: A plot of ΔG vs. reaction progress/Q, showing ΔG° as just one point (Q=1) on a curve that crosses zero at Q=K.

**Abstract**: ΔG = ΔG° + RT ln Q, with ΔG°=0 ⟺ K=1 (a real, actively occurring equilibrium), and ΔG=0 defining the general equilibrium condition at any composition.

**Transfer**: Given an unfamiliar reaction's ΔG° and a specified set of non-standard concentrations, correctly computing Q and predicting whether the forward reaction is actually spontaneous under those specific conditions.

## 3. Why Beginners Fail

Students conflate ΔG=0 (the general equilibrium condition) with ΔG°=0 (the specific standard-state condition where K happens to equal 1), concluding the latter means "nothing happens" rather than "a genuine, balanced equilibrium"; they apply ΔG° universally to predict spontaneity regardless of actual reaction-mixture concentrations, missing the RT ln Q correction term that can flip the sign of the true driving force ΔG; and they compute T_crossover = ΔH/ΔS without converting units consistently (mixing kJ and J), producing physically absurd temperatures that go unchecked.

## 4. Misconception Library

### MC-1: ΔG° = 0 means the reaction doesn't occur
- **Probe**: "For a reaction with ΔG° = 0, what is K? Does the reaction occur?"
- **Characteristic phrase**: "ΔG° = 0 means no energy is available, so nothing happens."
- **Trigger (Type 3, language contamination)**: Students conflate ΔG=0 (equilibrium, a well-known "reaction has stopped changing net" condition) with ΔG°=0 (a specific standard-state value where K happens to equal 1).
- **Conflict evidence [P28]**: ΔG°=0 → K = e^0 = 1 → [products]/[reactants] = 1 at equilibrium — the reaction genuinely does occur, with forward and reverse rates equally favored; K=1 is actually the most perfectly balanced equilibrium possible, not an absence of reaction.
- **Bridge [P30]**: "No energy available" confuses ΔG° as an abstract number with ΔG° as literally describing whether reaction happens — ΔG° = 0 specifically means the standard state IS the equilibrium state (Q = K = 1 initially), which is a statement about composition balance, not about reaction occurring or not.
- **Replacement [P31]**: ΔG° = 0 corresponds to K = 1, a genuine equilibrium with substantial forward and reverse reaction both occurring, not a "nothing happens" state.
- **Discrimination pairs [P33]**: ΔG°=0 (K=1, balanced equilibrium, reaction occurs) vs. a hypothetical "reaction genuinely doesn't happen" (would require an entirely different, much larger positive ΔG° with essentially no reverse pathway either — not what ΔG°=0 represents).
- **S6 repair path**: Compute K directly from ΔG°=0 and have the student state what K=1 physically means for product/reactant balance.

### MC-2: ΔG° determines spontaneity at all concentrations
- **Probe**: "A reaction has ΔG° = +20 kJ mol⁻¹. A student mixes 0.001 mol L⁻¹ of product and 10 mol L⁻¹ of reactant. Is the forward reaction spontaneous?"
- **Characteristic phrase**: "ΔG° is positive, so the reaction won't go forward."
- **Trigger (Type 5, instruction-induced)**: ΔG° is the tabulated, commonly-discussed number in class, and students apply it universally as if it directly determined spontaneity under any real-world concentration, without the standard-state caveat.
- **Conflict evidence [P28]**: ΔG = ΔG° + RT ln Q — with reactants in large excess over products, Q is very small, making RT ln Q a large negative number that can overwhelm a positive ΔG°, giving ΔG < 0 (genuinely spontaneous forward) despite ΔG° itself being positive; this is exactly the thermodynamic basis for driving unfavorable-by-standard-state reactions using reactant excess (a Le Chatelier's-principle-style strategy).
- **Bridge [P30]**: ΔG° describes spontaneity specifically at standard-state concentrations (1 M, 1 atm, etc.) — the actual driving force at any other concentration requires the RT ln Q correction, which can be large enough to flip the overall sign.
- **Replacement [P31]**: True spontaneity at any given concentration requires computing ΔG = ΔG° + RT ln Q (equivalently, comparing Q to K), not reading the sign of ΔG° alone.
- **Discrimination pairs [P33]**: Standard-state conditions (ΔG° alone determines spontaneity) vs. non-standard, reactant-excess conditions (RT ln Q correction can dominate and reverse the conclusion).
- **S6 repair path**: Compute ΔG explicitly for the given non-standard concentrations, showing the RT ln Q term's magnitude and sign flip.

### MC-3: T_cross = ΔH/ΔS without unit checking
- **Probe**: "ΔH = −100 kJ mol⁻¹, ΔS = −200 J mol⁻¹ K⁻¹. At what temperature does ΔG change sign?"
- **Characteristic phrase**: "T = −100/−200 = 0.5 K — the reaction stops being spontaneous at 0.5 K."
- **Trigger (Type 4, notation-induced)**: Students apply the formula T = ΔH/ΔS mechanically without converting ΔH (typically given in kJ) and ΔS (typically given in J/K) to consistent units first.
- **Conflict evidence [P28]**: Converting ΔH to J first (−100 kJ = −100,000 J), the correct calculation is T = −100,000/−200 = 500 K — the uncorrected 0.5 K answer is 1000× too small, a physically absurd temperature (far below any realistic chemistry) that should immediately trigger a sanity check.
- **Bridge [P30]**: A formula that mixes kJ and J silently produces numbers off by exactly the conversion factor (1000) — the error is entirely mechanical (units), not conceptual, but its physically implausible result is the tell that something went wrong.
- **Replacement [P31]**: Always convert ΔH to J (or ΔS to kJ/K) before dividing to find T_cross — check that the resulting temperature is physically reasonable as a sanity check.
- **Discrimination pairs [P33]**: 0.5 K (uncorrected, unit-mismatched, physically absurd) vs. 500 K (correctly unit-converted, physically reasonable) — same numbers, off by exactly 1000×.
- **S6 repair path**: Redo the calculation with explicit unit conversion shown as a required first step, then have the student judge whether 500 K is a more plausible chemistry temperature than 0.5 K.

## 5. Explanation Library

**Primary explanation**: Gibbs free energy combines enthalpy and entropy into a single system-side quantity, ΔG = ΔH − TΔS, that determines spontaneity at constant temperature and pressure without needing to separately track the surroundings. At standard-state concentrations, ΔG° relates directly to the equilibrium constant via ΔG° = −RT ln K — a negative ΔG° means K > 1 (products favored at equilibrium), a positive ΔG° means K < 1 (reactants favored), and ΔG° = 0 means K = 1 exactly (an evenly balanced equilibrium).

**Secondary explanation (non-standard-state framing)**: The true driving force for a reaction at any given (non-standard) set of concentrations is ΔG = ΔG° + RT ln Q, where Q is the reaction quotient computed from actual current concentrations — this correction term can be large enough to flip the sign of the overall driving force relative to ΔG° alone, which is why reactions with unfavorable ΔG° can still be driven forward by manipulating concentrations (e.g., large reactant excess).

## 6. Analogy Library

- **Primary analogy**: A tug-of-war where ΔG° tells you who wins if both teams start with exactly equal-strength anchors (standard-state concentrations) — but if one team gets a massive numbers advantage (large reactant excess, small Q), they can win even if their "standard" per-person strength (ΔG°) was weaker.
- **Breaking point**: The tug-of-war analogy conveys the concentration-can-override-ΔG° idea well but doesn't capture the specific logarithmic relationship (RT ln Q) or the equilibrium-constant connection (ΔG°=−RT ln K) — those need the explicit formula work.
- **Anti-analogy**: Do NOT say "ΔG° = 0 means the reaction is dead/inert" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (Q-driven spontaneity flip)**: Compute ΔG explicitly for the ΔG°=+20 kJ/mol example under the given reactant-excess concentrations, showing RT ln Q's magnitude flips the overall sign to negative.
- **Demonstration 2 (unit-check T_cross)**: Work the T_cross calculation both with and without unit conversion side by side (0.5 K vs. 500 K), having students judge which is chemically plausible.

## 8. Discovery Lesson

**Opening**: "If ΔG° = +20 kJ/mol for a reaction, does that mean it can NEVER go forward, under any conditions?"

**Exploration**: Students compute ΔG using the given non-standard concentrations (large reactant excess, small product amount), discovering the RT ln Q term is large enough to make the true ΔG negative.

**Synthesis**: Guide toward: ΔG° describes only the standard-state case; the actual driving force depends on the real concentrations present, via the RT ln Q correction.

**Closure**: "So is ΔG° = 0 a description of 'nothing happening,' or something else entirely?" (Directly resolves MC-1.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the ΔG = ΔG° + RT ln Q computation explicitly for the reactant-excess example.
- **TA-2 (TELL)**: State the ΔG°=0 ⟺ K=1 relationship explicitly, emphasizing this describes an active, balanced equilibrium.
- **TA-3 (DO)**: Student computes T_cross with explicit unit conversion, checking the result's physical plausibility.
- **TA-4 (TEST-THINKING)**: Present MC-2's reactant-excess scenario and ask the student to predict spontaneity before computing, then check against the formal calculation.

## 10. Voice Teaching

Whenever ΔG° is introduced, immediately state "this is the standard-state value — the real driving force at other concentrations needs the RT ln Q correction," before any spontaneity conclusion is drawn. Whenever computing T_cross = ΔH/ΔS, verbally state the required unit conversion as an explicit first step, every time, before doing the division.

## 11. Assessment

**Mastery gate**: Student can (a) correctly state what ΔG°=0 means physically (K=1, active equilibrium), (b) compute true spontaneity at non-standard concentrations using ΔG=ΔG°+RT ln Q, (c) correctly compute T_cross with consistent units and sanity-check the result.

- **FA-1**: "For a reaction with ΔG° = 0, what is K? Does the reaction occur?" — targets MC-1.
- **FA-2**: "A reaction has ΔG° = +20 kJ/mol but is mixed with reactants in large excess. Is the forward reaction spontaneous?" — targets MC-2.
- **FA-3**: "ΔH = −100 kJ/mol, ΔS = −200 J/mol·K. At what temperature does ΔG change sign?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students who've only worked standard-state ΔG° problems so far.

**Delayed retrieval**: Re-probe MC-1's K=1 interpretation before `chem.equil.concept` formally develops equilibrium constant behavior, which depends entirely on this ΔG°-K relationship being solid.

## 12. Recovery Notes

- **S3 (stuck)**: For the ΔG°=0 confusion, compute K from ΔG°=0 directly and have the student state, in their own words, what K=1 means for the products-to-reactants ratio.
- **S4 (frustrated)**: Normalize — "ΔG° = 0" and "ΔG = 0" looking nearly identical in notation is a genuine, common source of confusion, not carelessness.
- **S6 (collision)**: Use the explicit ΔG=ΔG°+RT ln Q computation for MC-2; use the side-by-side unit-checked vs. unit-mismatched T_cross calculation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a reaction with unfavorable ΔG° can still be driven forward by adjusting concentrations.

## 13. Memory & Review

Tag as a conceptual-correction memory (ΔG° vs. ΔG=0; standard-state caveat) plus a procedural/unit-checking memory (T_cross calculation). Schedule a spaced check at ~1 week and again before `chem.equil.concept`.

## 14. Transfer Map

Feeds directly into `chem.equil.concept` (the equilibrium constant's full behavior builds directly on the ΔG°=−RT ln K relationship established here) and `chem.thermo.cell-thermo` (electrochemical cell potentials are directly related to ΔG via ΔG=−nFE).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
