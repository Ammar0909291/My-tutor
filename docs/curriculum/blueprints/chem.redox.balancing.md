# chem.redox.balancing — Balancing Redox Equations

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.redox.balancing` |
| Domain | Redox Reactions |
| Requires | `chem.redox.oxidation-state` |
| Unlocks | `chem.redox.activity-series`, `chem.redox.disproportionation`, `chem.redox.titrations` |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 3 |

## 1. Concept Spine

The half-reaction method's H₂O/H⁺ balancing rule is NOT "always add to a fixed side" — H₂O goes specifically to whichever side is SHORT of oxygen, and H⁺ goes specifically to whichever side is SHORT of hydrogen, with the deficit side genuinely varying by which specific molecule/reaction is being balanced, requiring first-principles application every time rather than memorized fixed placement; electrons appear on the LEFT only in REDUCTION half-reactions (consumed, gaining electrons) and on the RIGHT only in OXIDATION half-reactions (produced, losing electrons) — never assume electrons always go on one fixed side (the mnemonic "OAR" — Oxidation Adds Right — captures this); and converting a balanced acidic-solution half-reaction to basic solution requires a specific THREE-STEP procedure (balance fully in acid first, then add OH⁻ to BOTH sides equal to the H⁺ count, then combine H⁺+OH⁻→H₂O and cancel any resulting duplicate H₂O molecules) — simply replacing every H⁺ with OH⁻ directly skips the essential H₂O-adjustment step and produces an incorrect equation.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Balancing NO₃⁻→NO in acidic solution step by step, discovering H₂O and H⁺ placement depends on which side is actually short of O or H, not a fixed rule.

**Representational**: A side-by-side comparison of an oxidation half-reaction (electrons on the right, OAR mnemonic) against a reduction half-reaction (electrons on the left), visually anchoring the electron-placement rule.

**Abstract**: The general first-principles balancing procedure (charge balance, mass balance via H₂O/H⁺, deficit-side determination case by case); the general three-step acid-to-basic conversion procedure (balance in acid, add OH⁻ to both sides, combine and cancel).

**Transfer**: Given an unfamiliar half-reaction, correctly determining H₂O and H⁺ placement from first principles (checking actual O/H deficits), correctly placing electrons based on oxidation-versus-reduction direction, and correctly converting a balanced acidic equation to basic solution using the full three-step procedure.

## 3. Why Beginners Fail

Students memorize a fixed rule like "always add H₂O to the right, H⁺ to the left" from one or two worked examples, missing that the correct side genuinely depends on which side is actually deficient in oxygen or hydrogen for that SPECIFIC reaction, requiring case-by-case first-principles application; they assume electrons always go on the same fixed side of a half-reaction (perhaps defaulting to "left, since they're consumed"), missing that electron placement genuinely depends on whether the half-reaction is oxidation (electrons produced, right side) or reduction (electrons consumed, left side); and they attempt to convert an acidic-solution equation to basic solution by directly substituting OH⁻ for every H⁺ symbol, missing that the correct procedure requires an additional H₂O-adjustment step (adding OH⁻ to both sides, then combining and canceling), which the direct-substitution shortcut skips entirely.

## 4. Misconception Library

### MC-1: Add H₂O to balance O and H⁺ to balance H — always in that order, and always on the same side as the deficit
- **Probe**: "Balance the half-reaction: NO₃⁻ → NO in acidic solution. Where does H₂O go, and where does H⁺ go?"
- **Trigger (Type 5, instruction-induced)**: Students memorize the specific placement pattern from one or two worked examples (where H₂O and H⁺ happened to go on particular sides) and apply that fixed pattern universally, without re-checking the actual deficit for each new reaction.
- **Conflict evidence [P28]**: H₂O genuinely goes to whichever side is SHORT of oxygen (balancing step 4), and H⁺ genuinely goes to whichever side is SHORT of hydrogen (balancing step 5) — but WHICH side is actually deficient varies depending on the specific molecules involved; students who memorize "always add to the right" (from an example where that happened to be correct) will fail on a different reaction where the product actually has MORE oxygen than the reactant, requiring H₂O on the opposite side instead.
- **Bridge [P30]**: The balancing procedure is a systematic METHOD (identify what's missing, add the appropriate species to the deficient side) that must be re-applied from first principles for each new reaction — it is not a fixed template where the same species always goes to the same side, since the "deficit side" is a property of the SPECIFIC reaction, not the method itself.
- **Replacement [P31]**: Always determine H₂O and H⁺ placement by checking the actual oxygen and hydrogen deficit for the SPECIFIC reaction being balanced — never assume a fixed placement pattern from a previous example.
- **Discrimination pairs [P33]**: A reaction where the product has less O (H₂O added to product side) vs. a reaction where the product has more O (H₂O added to reactant side) — the correct placement genuinely differs by reaction.
- **S6 repair path**: Walk through the NO₃⁻→NO balancing explicitly, counting actual O atoms on each side before deciding where H₂O goes.

### MC-2: Electrons go on the left of every half-reaction because they are "consumed"
- **Probe**: "Write the oxidation half-reaction for Fe²⁺ → Fe³⁺. Where are the electrons?"
- **Characteristic phrase**: "electrons are reactants so they go on the left."
- **Trigger (Type 4, notation-induced)**: Students may have first encountered a reduction half-reaction (where electrons genuinely are consumed, appearing on the left) and generalize this specific placement to all half-reactions, including oxidation.
- **Conflict evidence [P28]**: Electrons appear on the LEFT only in REDUCTION half-reactions (genuinely consumed there — the oxidant gains electrons); in OXIDATION half-reactions, electrons appear on the RIGHT (genuinely produced there — the reductant loses electrons); for Fe²⁺→Fe³⁺ (an oxidation, since Fe's oxidation state increases from +2 to +3), the correctly-balanced half-reaction is Fe²⁺→Fe³⁺+e⁻, with the electron on the RIGHT, directly contradicting a fixed "always left" assumption.
- **Bridge [P30]**: Electron placement directly reflects the physical direction of electron transfer for that specific half-reaction — a species being oxidized LOSES electrons (they appear as a product, on the right), while a species being reduced GAINS electrons (they appear as a reactant, on the left) — the mnemonic OAR (Oxidation Adds Right) captures this directional logic.
- **Replacement [P31]**: Electrons appear on the right in oxidation half-reactions (produced) and on the left in reduction half-reactions (consumed) — never assume a fixed side without checking which direction (oxidation or reduction) the half-reaction represents.
- **Discrimination pairs [P33]**: Fe²⁺→Fe³⁺+e⁻ (oxidation, electron on the right) vs. a reduction half-reaction like MnO₄⁻+8H⁺+5e⁻→Mn²⁺+4H₂O (electron on the left) — opposite placements for opposite directions.
- **S6 repair path**: Have the student determine whether the given half-reaction is oxidation or reduction FIRST (checking the oxidation-state change), then apply the OAR mnemonic to correctly place the electron.

### MC-3: For basic solution, just replace all H⁺ with OH⁻
- **Probe**: "In basic solution, does H₂O in the half-reaction also change?"
- **Characteristic phrase**: "swap H⁺ for OH⁻."
- **Trigger (Type 1, overgeneralization)**: Students correctly know that basic-solution equations shouldn't contain H⁺ and incorrectly conclude the conversion is a simple, direct symbol substitution (H⁺→OH⁻), rather than the more involved procedure actually required.
- **Conflict evidence [P28]**: The correct conversion procedure is: (1) balance the half-reaction FULLY in acidic conditions first; (2) THEN add OH⁻ to BOTH sides of the equation, in an amount equal to the number of H⁺ ions present; (3) combine H⁺+OH⁻→H₂O on whichever side the H⁺ originally was, which eliminates the H⁺ but may leave H₂O molecules on BOTH sides of the equation, requiring a final cancellation/simplification step; directly substituting H⁺→OH⁻ (without adding the extra OH⁻ to balance and without the subsequent H₂O cancellation) skips essential steps and produces an incorrect final equation.
- **Bridge [P30]**: Converting to basic conditions isn't simply "renaming" H⁺ as OH⁻ — it requires genuinely ADDING new OH⁻ species (to both sides, to maintain balance) and then performing a real chemical combination (H⁺+OH⁻→H₂O) that changes the equation's actual species composition, not just their symbols.
- **Replacement [P31]**: Convert to basic solution using the full three-step procedure (balance in acid, add OH⁻ to both sides equal to H⁺ count, combine and cancel H₂O) — never use direct H⁺-to-OH⁻ symbol substitution as a shortcut.
- **Discrimination pairs [P33]**: The correct three-step procedure (balance in acid → add OH⁻ to both sides → combine/cancel) vs. the incorrect direct substitution (simply writing OH⁻ wherever H⁺ appeared, skipping the OH⁻-addition and H₂O-cancellation steps).
- **S6 repair path**: Walk through the full three-step conversion explicitly for a given acidic half-reaction, showing each step's genuine chemical content, not just symbol replacement.

## 5. Explanation Library

**Primary explanation**: Balancing redox half-reactions requires a systematic, first-principles procedure — balance atoms other than O/H, then add H₂O to whichever side is actually deficient in oxygen, then add H⁺ to whichever side is actually deficient in hydrogen, then balance charge with electrons placed according to the reaction's direction (right for oxidation, since electrons are produced; left for reduction, since electrons are consumed, following the OAR mnemonic) — this deficit-checking and directional reasoning must be reapplied for each specific reaction, never assumed from a fixed template.

**Secondary explanation (acid-to-basic-conversion framing)**: Converting a balanced acidic-solution equation to basic solution requires a specific three-step procedure — balance fully in acid first, add OH⁻ to both sides equal to the H⁺ count present, then combine H⁺+OH⁻→H₂O and cancel any resulting duplicate H₂O — this genuinely changes the equation's species composition through real chemical combination, never achieved by simply substituting the OH⁻ symbol for H⁺ directly.

## 6. Analogy Library

- **Primary analogy**: A recipe adjustment that requires actually SUBSTITUTING one ingredient with a chemically different reaction (like using baking soda plus vinegar instead of baking powder, which changes what other ingredients are needed) rather than simply relabeling the ingredient list — the acid-to-basic conversion genuinely changes the equation's chemistry, not just its symbols.
- **Breaking point**: The recipe-substitution analogy conveys the "genuine chemical change, not symbol swap" concept well but doesn't naturally capture the deficit-checking procedure for H₂O/H⁺ placement or the OAR electron-placement rule — those need the explicit first-principles balancing and directional-electron arguments.
- **Anti-analogy**: Do NOT say "electrons always go on the left" — this directly reinforces MC-2.

## 7. Demonstration Library

- **Demonstration 1 (NO₃⁻→NO deficit-checking walkthrough)**: Balance the NO₃⁻→NO half-reaction step by step, explicitly counting O and H atoms on each side before placing H₂O and H⁺.
- **Demonstration 2 (three-step acid-to-basic conversion)**: Convert a balanced acidic half-reaction to basic solution using the full three-step procedure explicitly, showing the genuine H₂O-adjustment and cancellation steps.

## 8. Discovery Lesson

**Opening**: "If you balanced one half-reaction by adding H₂O to the product side, does that mean H₂O always goes to the product side for every half-reaction?"

**Exploration**: Students balance a new half-reaction where the deficit side differs from their previous example, discovering the fixed-placement assumption fails.

**Synthesis**: Guide toward: H₂O and H⁺ placement must be determined by checking the actual deficit for each specific reaction, never assumed from a memorized pattern.

**Closure**: "Is converting to basic solution as simple as replacing every H⁺ symbol with OH⁻?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit deficit-checking walkthrough for NO₃⁻→NO.
- **TA-2 (TELL)**: State the OAR mnemonic explicitly, worked through for Fe²⁺→Fe³⁺.
- **TA-3 (DO)**: Student converts a new balanced acidic half-reaction to basic solution using the full three-step procedure.
- **TA-4 (TEST-THINKING)**: Present MC-1's probe with a reaction where the deficit side differs from a prior example, asking the student to re-derive the correct placement.

## 10. Voice Teaching

Whenever H₂O or H⁺ is placed in a balancing procedure, narrate the deficit-check explicitly: "which side is actually short?" — never state a placement without this check. Whenever electrons are placed, state "oxidation adds right" (OAR) explicitly before writing the electron.

## 11. Assessment

**Mastery gate**: Student can (a) correctly determine H₂O/H⁺ placement from first-principles deficit-checking, not memorized pattern, (b) correctly place electrons based on oxidation-vs-reduction direction, (c) correctly convert an acidic equation to basic solution using the full three-step procedure.

- **FA-1**: "Balance NO₃⁻ → NO in acidic solution. Where does H₂O go, and where does H⁺ go?" — targets MC-1.
- **FA-2**: "Write the oxidation half-reaction for Fe²⁺ → Fe³⁺. Where are the electrons?" — targets MC-2.
- **FA-3**: "Does converting to basic solution just mean replacing H⁺ with OH⁻?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've only practiced with reactions where the deficit happened to fall on one consistent side.

**Delayed retrieval**: Re-probe MC-1's deficit-checking procedure and MC-3's three-step conversion before `chem.redox.titrations` requires fluent, correct redox-equation balancing across diverse acidic and basic scenarios.

## 12. Recovery Notes

- **S3 (stuck)**: For the H₂O/H⁺-placement confusion, have the student count actual O and H atoms on each side explicitly before placing anything.
- **S4 (frustrated)**: Normalize — memorizing a pattern from a first successful example is a very reasonable, common learning strategy that genuinely doesn't generalize here.
- **S6 (collision)**: Use the explicit OAR-mnemonic application for MC-2; use the full three-step conversion walkthrough for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why H₂O placement can differ between two different half-reactions.

## 13. Memory & Review

Tag as three procedural memories (first-principles deficit-checking; OAR electron-placement rule; three-step acid-to-basic conversion). Schedule a spaced check at ~1 week and again before `chem.redox.titrations`.

## 14. Transfer Map

Feeds directly into `chem.redox.activity-series`, `chem.redox.disproportionation`, and `chem.redox.titrations` (all directly require fluent, correct redox-equation balancing established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
