# chem.kinet.integrated-rate — Integrated Rate Laws

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.kinet.integrated-rate` |
| Domain | Chemical Kinetics |
| Requires | `chem.kinet.rate-law` |
| Unlocks | (none) |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

Half-life is CONSTANT (concentration-independent) ONLY for first-order reactions — for second-order reactions, t½=1/(k[A]₀), which INCREASES as concentration decreases (the reaction genuinely slows down non-linearly, doubling t½ each time [A]₀ halves), and for zero-order reactions, t½ DECREASES as concentration falls — the famous constant-half-life property of radioactive decay is a first-order-SPECIFIC feature, never universal; the second-order integrated rate law 1/[A]_t=1/[A]₀+kt means 1/[A] INCREASES linearly with time (positive slope k), NOT decreases — even though [A] itself decreases, its reciprocal necessarily increases, contradicting a naive "all kinetics plots decrease" expectation; and the correct diagnostic plot for testing reaction order is order-SPECIFIC — [A] vs. t linear tests zero-order, ln[A] vs. t linear tests first-order, and 1/[A] vs. t linear tests second-order — plotting [A] vs. t and checking for a straight line ONLY correctly diagnoses zero-order; for a genuinely first-order reaction, [A] vs. t is a curved, decaying exponential, not linear.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Computing t½ explicitly for a second-order reaction at two different starting concentrations (0.10M→50s, 0.05M→100s), confirming half-life genuinely doubles as concentration halves, contradicting a constant-half-life assumption.

**Representational**: A three-panel diagnostic-plot comparison: [A] vs. t (linear only for zero-order), ln[A] vs. t (linear only for first-order), 1/[A] vs. t (linear, POSITIVE slope, only for second-order) — each correctly paired with its diagnostic order.

**Abstract**: The general principle that half-life's concentration-(in)dependence is order-specific, not universal; the general principle that a decreasing quantity's reciprocal necessarily increases, so 1/[A] vs. t must have positive slope even as [A] itself falls; the general principle that each reaction order has its own SPECIFIC linearizing plot, and "checking for linearity" requires plotting the CORRECT transformed quantity.

**Transfer**: Given an unfamiliar reaction's kinetic data, correctly computing and interpreting half-life behavior specific to the actual reaction order; correctly predicting the sign/direction of a 1/[A]-vs-t plot's slope; correctly selecting and applying the order-specific diagnostic plot to determine reaction order from data.

## 3. Why Beginners Fail

Students encounter the constant half-life of first-order reactions (memorably reinforced by radioactive decay in popular science) and extend this concentration-independence to all reaction orders, missing that half-life's dependence on initial concentration is fundamentally different for each order — second-order half-life genuinely increases as concentration decreases (t½=1/(k[A]₀)), and zero-order half-life decreases, only first-order gives a truly constant half-life; students see that all prior kinetics plots they've encountered ([A] vs. t, rate vs. t) show decreasing trends and assume 1/[A] vs. t must also decrease since [A] is decreasing, missing the basic mathematical fact that a DECREASING quantity's RECIPROCAL necessarily INCREASES — the second-order integrated law 1/[A]_t=1/[A]₀+kt has 1/[A] increasing linearly with time, a positive-slope relationship despite [A] itself falling; and students are told to "check for linearity" when testing reaction order but then plot the wrong quantity — typically [A] vs. t regardless of the hypothesized order — missing that each specific reaction order has its OWN linearizing transformation ([A] for zero-order, ln[A] for first-order, 1/[A] for second-order), and plotting [A] vs. t for a genuinely first-order reaction produces a curved (exponentially decaying), not linear, result.

## 4. Misconception Library

### MC-1: Half-life is always constant regardless of reaction order
- **Probe**: "A second-order reaction has t₁/₂ = 50 s when [A]₀ = 0.10 M. What is t₁/₂ when [A] has fallen to 0.05 M?"
- **Characteristic phrase**: "The half-life is 50 s no matter what the concentration is."
- **Trigger (Type 1, overgeneralization)**: The constant half-life of first-order reactions is memorable and universal in popular science (radioactive decay); students extend it to all orders.
- **Conflict evidence [P28]**: For second-order, t₁/₂=1/(k[A]₀). As [A] decreases, t₁/₂ increases — the reaction slows down non-linearly. If t₁/₂=50s at 0.10M, then k=1/(50×0.10)=0.20L mol⁻¹s⁻¹. At 0.05M: t₁/₂=1/(0.20×0.05)=100s — it doubled. For zero-order, t₁/₂ decreases as [A] falls.
- **Bridge [P30]**: Radioactive decay's famous constant half-life is a consequence of the SPECIFIC mathematical form of the first-order rate law (exponential decay, where the rate of decrease is always proportional to the CURRENT amount) — this specific mathematical relationship does not hold for second-order (where rate depends on [A]²) or zero-order (where rate is independent of [A]) kinetics, and each order's specific integrated rate law produces a genuinely different, order-specific half-life formula and concentration-dependence.
- **Replacement [P31]**: Half-life is concentration-independent ONLY for first-order reactions — always derive t½'s concentration-dependence from the specific order's integrated rate law, never assume universal constancy.
- **Discrimination pairs [P33]**: First-order (t½=ln2/k, genuinely constant, independent of [A]₀) vs. second-order (t½=1/(k[A]₀), increases as [A]₀ decreases) — different orders, genuinely different half-life behavior.
- **S6 repair path**: Present the explicit second-order t½ computation at two concentrations, confirming the doubling relationship numerically.

### MC-2: The integrated rate law for second-order gives a decreasing 1/[A] plot
- **Probe**: "Sketch the 1/[A] vs. t plot for a second-order reaction. Does it slope up or down?"
- **Characteristic phrase**: "1/[A] decreases because [A] is decreasing."
- **Trigger (Type 2, perceptual intuition)**: All previous kinetics plots (rate vs. time, [A] vs. time) decrease; students assume 1/[A] also decreases.
- **Conflict evidence [P28]**: As [A] decreases, 1/[A] increases (e.g., [A]=0.1→1/[A]=10; [A]=0.05→1/[A]=20). The second-order integrated law is 1/[A]_t=1/[A]₀+kt — 1/[A] INCREASES with time, with positive slope k. The slope is POSITIVE for second-order, unlike the negative slopes of zero- and first-order plots.
- **Bridge [P30]**: The mathematical operation of taking a reciprocal necessarily REVERSES the direction of change — a decreasing quantity's reciprocal is always increasing, and this is a basic mathematical fact independent of any specific chemistry; students correctly track that [A] decreases but fail to apply the reciprocal-reversal logic when reasoning about the transformed quantity 1/[A].
- **Replacement [P31]**: 1/[A] vs. t has a POSITIVE slope for second-order reactions (1/[A] increases as [A] decreases, since reciprocals of decreasing quantities increase) — never assume all kinetics-related plots slope downward.
- **Discrimination pairs [P33]**: [A] vs. t (decreasing, negative slope) vs. 1/[A] vs. t (increasing, positive slope) — the same underlying concentration decrease produces opposite-slope plots depending on which quantity is graphed.
- **S6 repair path**: Present the explicit numerical reciprocal computation at two time points, confirming 1/[A] increases even as [A] decreases.

### MC-3: Plotting [A] vs. t as the test for first-order
- **Probe**: "You want to test whether a reaction is first-order. What do you plot on the y-axis? Against what on the x-axis?"
- **Characteristic phrase**: "I plot [A] vs. t and check if it's a straight line."
- **Trigger (Type 5, instruction-induced)**: Students are told "check for linearity" and plot the wrong quantity — [A] instead of ln[A] — for first-order.
- **Conflict evidence [P28]**: [A] vs. t linear→zero-order. ln[A] vs. t linear→first-order. 1/[A] vs. t linear→second-order. The [A] vs. t plot for first-order is a DECAYING EXPONENTIAL (curved), not a straight line. Memorise the three correct plots explicitly, not just "check for linearity."
- **Bridge [P30]**: "Check for linearity" is an incomplete instruction without specifying WHICH transformed quantity to plot — each reaction order's integrated rate law linearizes a DIFFERENT function of concentration against time ([A] itself for zero-order, ln[A] for first-order, 1/[A] for second-order), and plotting the wrong quantity (like raw [A] when testing for first-order) will correctly show a curve, but this curve doesn't rule out first-order — it simply means the WRONG diagnostic plot was chosen.
- **Replacement [P31]**: Always match the specific transformed quantity to the order being tested — [A] for zero-order, ln[A] for first-order, 1/[A] for second-order — never plot [A] vs. t as a universal "check for linearity" test.
- **Discrimination pairs [P33]**: [A] vs. t for a genuinely first-order reaction (curved, decaying exponential, NOT linear) vs. ln[A] vs. t for the same first-order reaction (genuinely linear, the correct diagnostic).
- **S6 repair path**: Present all three diagnostic plots explicitly for the same dataset, showing only the order-matched transformation produces a straight line.

## 5. Explanation Library

**Primary explanation**: Half-life's dependence on initial concentration is specific to each reaction order — only first-order reactions have a genuinely constant, concentration-independent half-life; second-order half-life increases as concentration decreases, and zero-order half-life decreases. The second-order integrated rate law (1/[A]_t=1/[A]₀+kt) produces an INCREASING 1/[A] vs. t plot (positive slope), a direct mathematical consequence of taking the reciprocal of a decreasing quantity.

**Secondary explanation (order-specific diagnostic plots)**: Testing reaction order requires plotting the SPECIFIC transformed quantity appropriate to each hypothesized order — [A] for zero-order, ln[A] for first-order, 1/[A] for second-order — since each order's integrated rate law linearizes a different function; plotting the wrong quantity (e.g., raw [A] to test for first-order) will show a curve regardless of the reaction's actual order, and does not by itself rule out that order.

## 6. Analogy Library

- **Primary analogy**: A savings account with a fixed percentage interest rate (first-order, proportional to current amount) doubling in the same fixed time period regardless of the current balance — vs. a diminishing-returns scenario where the "time to lose half" genuinely lengthens as the balance shrinks (second-order behavior).
- **Breaking point**: The interest-rate analogy conveys the concentration-independence of first-order half-life well but doesn't naturally capture the reciprocal-reversal logic for 1/[A] plots (MC-2) or the order-specific diagnostic-plot matching (MC-3) — those need the explicit numerical reciprocal computation and the three-panel plot comparison.
- **Anti-analogy**: Do NOT say "half-life is always a fixed, universal property of a reaction" — this directly reinforces MC-1 by ignoring the order-dependence of half-life behavior.

## 7. Demonstration Library

- **Demonstration 1 (second-order half-life doubling computation)**: Compute t½ explicitly at two concentrations, confirming the doubling relationship as [A]₀ halves.
- **Demonstration 2 (numerical 1/[A] reciprocal-reversal computation)**: Compute 1/[A] at two time points explicitly, confirming it increases even as [A] decreases.
- **Demonstration 3 (three-panel order-specific diagnostic-plot comparison)**: Present [A], ln[A], and 1/[A] vs. t for the same dataset, showing only the order-matched plot is linear.

## 8. Discovery Lesson

**Opening**: "Radioactive decay has a constant half-life. Does a second-order reaction also have a constant half-life?"

**Exploration**: Students compute t½ for a second-order reaction at two concentrations, discovering it genuinely increases as concentration decreases.

**Synthesis**: Guide toward: half-life's concentration-dependence is order-specific — only first-order gives a truly constant half-life.

**Closure**: "Does 1/[A] vs. t slope up or down as the reaction proceeds?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit second-order half-life computation at two concentrations.
- **TA-2 (TELL)**: State the reciprocal-reversal logic for 1/[A] vs. t explicitly, anchored to the numerical computation.
- **TA-3 (DO)**: Student selects and applies the correct order-specific diagnostic plot for an unfamiliar kinetic dataset.
- **TA-4 (TEST-THINKING)**: Present the "which plot tests first-order" probe and ask the student to justify why [A] vs. t fails to test first-order correctly.

## 10. Voice Teaching

Whenever half-life is discussed, narrate "check the specific order — only first-order gives a constant half-life." Whenever a reaction-order diagnostic plot is chosen, state "match the transformed quantity to the order being tested — never default to raw [A] vs. t" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly compute and interpret order-specific half-life behavior, (b) correctly predict the positive slope of 1/[A] vs. t for second-order reactions, (c) correctly select and apply the order-specific diagnostic plot.

- **FA-1**: "A second-order reaction has t₁/₂=50s when [A]₀=0.10M. What is t₁/₂ when [A] has fallen to 0.05M?" — targets MC-1.
- **FA-2**: "Sketch the 1/[A] vs. t plot for a second-order reaction. Does it slope up or down?" — targets MC-2.
- **FA-3**: "You want to test whether a reaction is first-order. What do you plot?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only encountered first-order/radioactive-decay half-life before exposure to other orders.

**Delayed retrieval**: Re-probe MC-1's order-specific half-life reasoning and MC-3's diagnostic-plot matching as foundational knowledge for subsequent chemical-kinetics mechanism and pseudo-first-order applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the constant-half-life overgeneralization, have the student explicitly derive t½ from the specific order's integrated rate law before making any claim about concentration-dependence.
- **S4 (frustrated)**: Normalize — extending the memorable constant-half-life property universally is genuinely common on first exposure, since radioactive decay is such a strong first-order example.
- **S6 (collision)**: Use the explicit numerical reciprocal computation for MC-2; use the three-panel plot comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why 1/[A] vs. t has a positive slope even though [A] is decreasing.

## 13. Memory & Review

Tag as one procedural memory (order-specific half-life derivation) plus two conceptual-correction memories (reciprocal-reversal logic for 1/[A] plots; order-specific diagnostic-plot matching). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates rate-law reasoning built across `chem.kinet.rate-law`, forming a capstone application to reaction-mechanism determination and pseudo-first-order kinetics contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
