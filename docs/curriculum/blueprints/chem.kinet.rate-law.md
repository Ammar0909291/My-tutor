# chem.kinet.rate-law — The Rate Law

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.kinet.rate-law` |
| Domain | Chemical Kinetics |
| Requires | `chem.kinet.rate` |
| Unlocks | `chem.kinet.arrhenius`, `chem.kinet.integrated-rate`, `chem.kinet.mechanism` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

A rate law (rate = k[A]ᵐ[B]ⁿ...) expresses how reaction rate depends on reactant concentrations, with the exponents (orders) determined purely by experiment — never assumed from the balanced equation's stoichiometric coefficients — and the rate constant k, fixed at a given temperature, absorbing every rate-affecting factor that is not itself a reactant concentration (collision frequency terms, steric factor, activation energy via the Arrhenius relationship). Orders can be zero, positive integers, fractions, or even negative (indicating inhibition).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: The initial-rate method — running a reaction multiple times at different starting concentrations and measuring the initial rate each time, then comparing how rate scales with concentration changes to deduce the order experimentally.

**Representational**: A table of experimental trials (concentration combinations vs. measured initial rate) from which orders are extracted by comparing ratios between trials that isolate one reactant's concentration change at a time.

**Abstract**: rate = k[A]ᵐ[B]ⁿ, with m and n as experimentally-determined orders (not assumed equal to stoichiometric coefficients), and k as a temperature-dependent constant independent of concentration.

**Transfer**: Given a novel set of experimental rate data (concentrations and measured rates across trials), determining the rate law's orders and the value of k from first principles, without being told the mechanism or the answer in advance.

## 3. Why Beginners Fail

Students pattern-match rate-law exponents directly from stoichiometric coefficients (since the balanced equation is introduced right before the rate law), assume increasing any reactant's concentration must increase rate (missing that negative orders exist and mean inhibition), and misattribute an observed rate change to a change in k itself rather than correctly recognizing k as a fixed constant at fixed temperature, with only the concentration-dependent terms actually changing.

## 4. Misconception Library

### MC-1: Rate law orders equal stoichiometric coefficients
- **Probe**: "The reaction 2NO(g) + O₂(g) → 2NO₂(g) is experimentally found to be third order overall: rate = k[NO]²[O₂]. Could the rate law be rate = k[NO]²[O₂]² instead, given the stoichiometry?"
- **Characteristic phrase**: "Since there are 2 NO and 1 O₂, the rate law is rate = k[NO]²[O₂]."
- **Trigger (Type 5, instruction-induced)**: The rate law is introduced immediately after writing a balanced equation, so students incorrectly pattern-match the exponents directly from the coefficients.
- **Conflict evidence [P28]**: For the NO/O₂ example, the orders (2 for NO, 1 for O₂) happen to equal the coefficients only because this particular reaction is effectively single-step — the definitive counterexample is H₂ + Br₂ → 2HBr, which has a complex chain mechanism and an experimentally-measured rate law of rate = k[H₂][Br₂]^½, with a fractional order that bears no resemblance to the 1:1 stoichiometric coefficients.
- **Bridge [P30]**: Orders happening to match coefficients in some examples is a mechanism-dependent coincidence for single-step-like reactions, not a general rule — the rate law reflects the actual reaction mechanism, which stoichiometry alone cannot reveal.
- **Replacement [P31]**: Reaction orders can ONLY be determined from experimental data (e.g., the initial-rate method), never assumed from the balanced equation.
- **Discrimination pairs [P33]**: NO/O₂ (orders happen to match coefficients) vs. H₂/Br₂ (fractional order, no coefficient match at all) — proof the match isn't general.
- **S6 repair path**: Present the H₂/Br₂ fractional-order counterexample directly as definitive disproof of the stoichiometry-matching rule.

### MC-2: Increasing concentration always increases rate
- **Probe**: "For the reaction A + B → C, the rate law is rate = k[A]⁻¹[B]. If [A] is doubled, what happens to the rate?"
- **Characteristic phrase**: "More A means more collisions, so rate must increase."
- **Trigger (Type 1, overgeneralization)**: For the common case of positive orders (m ≥ 1), doubling concentration does increase rate, and students assume this is universal across all possible orders.
- **Conflict evidence [P28]**: A negative order (m = −1) means the species inhibits the reaction — for rate = k[A]⁻¹[B], doubling [A] actually halves the rate, the opposite of the naive collision-frequency intuition; enzyme inhibition is a common real-world example of this behavior.
- **Bridge [P30]**: A species with a negative order isn't simply "colliding more" in a way that helps the reaction — it's promoting a competing process (like a back-reaction or competing for a catalyst) that actively slows the forward reaction as its concentration rises.
- **Replacement [P31]**: The sign and magnitude of a reactant's order determines the direction and strength of its effect on rate — positive orders increase rate with concentration, negative orders decrease it, zero order means no effect at all.
- **Discrimination pairs [P33]**: A positive-order species (more concentration → faster) vs. a negative-order species (more concentration → slower, inhibitory).
- **S6 repair path**: Walk through the rate = k[A]⁻¹[B] calculation directly, showing the rate halves when [A] doubles, and connect it to the enzyme-inhibition real-world example.

### MC-3: The rate constant k changes with concentration
- **Probe**: "If [A] doubles and rate quadruples in a reaction rate = k[A]², has k changed?"
- **Characteristic phrase**: "As concentration increases, k gets bigger because the molecules are hitting more often."
- **Trigger (Type 2, perceptual intuition)**: Students observe rate changing as concentration changes and incorrectly attribute the whole change to k itself changing, rather than to the concentration-dependent [A]ᵐ term changing.
- **Conflict evidence [P28]**: k is a constant at fixed temperature that absorbs all the rate-affecting factors that are NOT concentration-dependent (base collision frequency per unit concentration, steric factor, activation energy); computing k from two different rate/[A] data pairs for the same reaction at the same temperature gives the same k value both times — a direct self-consistency check that k didn't change.
- **Bridge [P30]**: In rate = k[A]², when [A] doubles and rate quadruples, that's exactly consistent with a fixed k and a squared concentration dependence (2² = 4) — no change in k is needed or implied to explain the observation.
- **Replacement [P31]**: k depends only on temperature (via the Arrhenius equation, covered next); all concentration-dependence lives entirely in the [A]ᵐ[B]ⁿ terms, never in k.
- **Discrimination pairs [P33]**: k (temperature-dependent only) vs. rate (both k and concentration-dependent) — conflating the two is the error.
- **S6 repair path**: Have the student compute k from two separate rate/[A] data points for the same reaction and verify the values match, demonstrating k's constancy directly.

## 5. Explanation Library

**Primary explanation**: A rate law expresses how measured reaction rate depends on reactant concentrations, in the form rate = k[A]ᵐ[B]ⁿ. The exponents m and n (orders with respect to each reactant) can only be determined by running experiments — typically the initial-rate method, comparing trials where one concentration is varied while others are held constant — because they reflect the actual step-by-step reaction mechanism, which the overall balanced equation does not reveal.

**Secondary explanation (rate constant framing)**: The rate constant k is fixed at a given temperature and absorbs every factor affecting rate that isn't itself a reactant concentration — it changes only with temperature (formalized by the Arrhenius equation), never with concentration; all concentration-dependence is captured entirely by the [A]ᵐ[B]ⁿ terms.

## 6. Analogy Library

- **Primary analogy**: A recipe where the "amount of an ingredient's effect" isn't always proportional to how much you add — for most ingredients (positive order), more means a stronger effect, but for an ingredient that actively counteracts the recipe (negative order, like a competing/inhibiting species), adding more actually weakens the outcome.
- **Breaking point**: The recipe analogy conveys directional effect well but doesn't capture why orders must be found experimentally rather than assumed from a recipe's stated proportions (the stoichiometric-coefficient misconception) — that requires the explicit mechanism-dependence argument.
- **Anti-analogy**: Do NOT say "the balanced equation tells you the rate law" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (initial-rate method)**: Provide a table of experimental trials with varying initial concentrations of two reactants and measured initial rates; have students isolate each reactant's order by comparing pairs of trials that hold one concentration constant while doubling the other.
- **Demonstration 2 (k self-consistency check)**: Using the rate law derived in Demonstration 1, have students compute k from two different trials and confirm the values match — directly disproving MC-3's "k changes with concentration."

## 8. Discovery Lesson

**Opening**: "For 2NO + O₂ → 2NO₂, would you expect the rate law to be rate = k[NO]²[O₂], just reading off the coefficients? Let's check with real data."

**Exploration**: Students work through the initial-rate method for the NO/O₂ system, confirming the orders do match coefficients here, then are shown the H₂/Br₂ system's data, where the derived order (½) doesn't match the 1:1 stoichiometry at all.

**Synthesis**: Guide toward: coefficient-matching in the NO/O₂ case was a coincidence of that reaction's mechanism, not a general rule — the only reliable way to find orders is experimental data.

**Closure**: "So if you're ever handed a new reaction's balanced equation and asked for the rate law, what's the one thing you cannot do?" (Directly resolves MC-1.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the H₂/Br₂ fractional-order rate-law data as the definitive counterexample to coefficient-matching.
- **TA-2 (TELL)**: State explicitly that k depends only on temperature, worked through with the two-trial self-consistency check.
- **TA-3 (DO)**: Student determines orders m and n from a given initial-rate data table using the comparison method.
- **TA-4 (TEST-THINKING)**: Present MC-2's negative-order scenario and ask the student to predict the rate change when [A] doubles.

## 10. Voice Teaching

Never write a rate law expression immediately after a balanced equation without an explicit verbal caveat: "we cannot read these exponents off the equation — they must come from experiment." When working the initial-rate method, narrate the comparison-of-trials logic step by step rather than jumping to the answer.

## 11. Assessment

**Mastery gate**: Student can (a) determine rate-law orders from initial-rate experimental data without assuming they match stoichiometric coefficients, (b) correctly predict the rate effect of a negative-order reactant, (c) compute k from rate/concentration data and demonstrate its constancy across multiple trials.

- **FA-1**: "Could the rate law for 2NO + O₂ → 2NO₂ be rate = k[NO]²[O₂]²? Why or why not?" — targets MC-1.
- **FA-2**: "For rate = k[A]⁻¹[B], what happens to the rate if [A] is doubled?" — targets MC-2.
- **FA-3**: "If [A] doubles and rate quadruples in rate = k[A]², has k changed?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've only seen single-step-like reactions where coefficients happen to match orders.

**Delayed retrieval**: Re-probe MC-1's experimental-determination requirement before `chem.kinet.mechanism` introduces multi-step mechanisms, where the rate-determining step's molecularity (not the overall equation) sets the rate law.

## 12. Recovery Notes

- **S3 (stuck)**: For order determination, isolate one reactant at a time — hold [B] constant across two trials, compare how rate changes as [A] changes, and use that ratio to find m before touching n.
- **S4 (frustrated)**: Normalize — coefficient-matching genuinely does work for some reactions, making this a reasonable-but-incomplete generalization, not a careless error.
- **S6 (collision)**: Use the H₂/Br₂ fractional-order data for MC-1; use the k self-consistency computation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why the balanced equation alone can never determine a rate law's orders.

## 13. Memory & Review

Tag as a procedural-analytical memory (initial-rate method) plus a conceptual-correction memory (orders are experimental, not stoichiometric; k is concentration-independent). Schedule a spaced check at ~1 week and again before `chem.kinet.mechanism`.

## 14. Transfer Map

Feeds directly into `chem.kinet.arrhenius` (k's temperature dependence, established as concentration-independent here), `chem.kinet.integrated-rate` (integrated forms of the rate law for specific orders), and `chem.kinet.mechanism` (multi-step mechanisms explain why orders and coefficients diverge, directly resolving MC-1's root cause).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
