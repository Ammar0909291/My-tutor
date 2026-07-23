# Integrated Rate Laws — `chem.kinet.integrated-rate`

## Identity

- **KG ID**: chem.kinet.integrated-rate
- **Subject**: Chemistry
- **Domain**: Chemical Kinetics (chem.kinet)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.kinet.rate-law
- **Unlocks**: none (terminal node)
- **Cross-links**: none

## Learning Objective

Students can derive and apply the integrated rate laws for zero-, first-, and second-order reactions; calculate concentration at a given time; determine half-life for each order and its concentration-dependence; identify reaction order from graphical data (linear plot recognition); and apply the pseudo-first-order approximation.

## Core Understanding

**Integrated rate laws** are derived by integrating the differential rate law rate = −d[A]/dt with respect to time, converting the instantaneous-rate expression into an expression for [A] as a function of time.

**Zero-order reaction** (rate = k, independent of [A]):
- Differential: d[A]/dt = −k
- Integrated: [A]_t = [A]₀ − kt
- Linear plot: [A] vs. t (slope = −k)
- Half-life: t₁/₂ = [A]₀ / 2k (depends on [A]₀ — decreases as reaction proceeds)

**First-order reaction** (rate = k[A]):
- Differential: d[A]/dt = −k[A]
- Integrated: ln[A]_t = ln[A]₀ − kt  (equivalently, [A]_t = [A]₀ e^(−kt))
- Linear plot: ln[A] vs. t (slope = −k)
- Half-life: t₁/₂ = ln 2 / k = 0.693/k (CONSTANT — independent of [A]₀)

**Second-order reaction** (rate = k[A]²):
- Differential: d[A]/dt = −k[A]²
- Integrated: 1/[A]_t = 1/[A]₀ + kt
- Linear plot: 1/[A] vs. t (slope = k)
- Half-life: t₁/₂ = 1/(k[A]₀) (depends on [A]₀ — increases as reaction proceeds)

**Graphical determination of order**: plot the same time-course data three ways:
1. [A] vs. t — straight line → zero-order
2. ln[A] vs. t — straight line → first-order
3. 1/[A] vs. t — straight line → second-order

Whichever plot is linear identifies the order.

**Pseudo-first-order**: if the rate law is rate = k[A][B] but [B] >> [A], then [B] ≈ constant throughout the reaction, and k' = k[B] behaves as a first-order rate constant. The reaction follows first-order kinetics in [A] under these conditions. Plotting ln[A] vs. t gives slope = −k' = −k[B]. Running the experiment at several [B] values and plotting k' vs. [B] recovers the true second-order k.

## Mental Models

**The three-plot filter model**: think of the three plots ([A], ln[A], 1/[A] vs. t) as three different lenses on the same data. Only the correct lens gives a straight-line focus — the others will be curved. This diagnostic method is purely graphical; no calculation is required to identify order.

**The radioactive-decay analogy for first-order**: first-order reactions behave exactly like radioactive decay — constant half-life, exponential concentration decay. This analogy is exact: nuclear decay is a first-order process, with the rate constant replaced by the decay constant λ and the nucleus count by N. Any student who has seen radioactive decay already knows first-order kinetics.

## Why Students Fail

1. **All reactions have constant half-lives**: students learn the famous first-order constant half-life and assume it applies to all reactions. Zero- and second-order half-lives change during the reaction.
2. **ln[A] vs. t for ANY reaction**: students memorise the first-order plot and apply it universally, even when the data gives a curved ln[A] plot (indicating zero or second order).
3. **The slope of 1/[A] vs. t is negative for second-order**: because 1/[A] increases as [A] decreases, the slope of 1/[A] vs. t is +k (positive). Students expect a negative slope by analogy with first-order.
4. **Forgetting to convert concentration to ln(concentration) before plotting**: students plot raw [A] on the y-axis of the "first-order" graph instead of ln[A].

## Misconceptions

**MC-1 — Half-life is always constant regardless of reaction order** (Type 1, overgeneralization from first-order)
- *Mechanism*: the constant half-life of first-order reactions is memorable and universal in popular science (radioactive decay); students extend it to all orders.
- *Diagnostic probe*: "A second-order reaction has t₁/₂ = 50 s when [A]₀ = 0.10 M. What is t₁/₂ when [A] has fallen to 0.05 M?"
- *Characteristic phrase*: "The half-life is 50 s no matter what the concentration is."
- *Repair*: for second-order, t₁/₂ = 1/(k[A]₀). As [A] decreases, t₁/₂ increases — the reaction slows down non-linearly. If t₁/₂ = 50 s at 0.10 M, then k = 1/(50 × 0.10) = 0.20 L mol⁻¹ s⁻¹. At 0.05 M: t₁/₂ = 1/(0.20 × 0.05) = 100 s — it doubled. For zero-order, t₁/₂ decreases as [A] falls.

**MC-2 — The integrated rate law for second-order gives a decreasing 1/[A] plot** (Type 2, perceptual intuition from negative-slope expectation)
- *Mechanism*: all previous kinetics plots (rate vs. time, [A] vs. time) decrease; students assume 1/[A] also decreases.
- *Diagnostic probe*: "Sketch the 1/[A] vs. t plot for a second-order reaction. Does it slope up or down?"
- *Characteristic phrase*: "1/[A] decreases because [A] is decreasing."
- *Repair*: as [A] decreases, 1/[A] increases (e.g., [A] = 0.1 → 1/[A] = 10; [A] = 0.05 → 1/[A] = 20). The second-order integrated law is 1/[A]_t = 1/[A]₀ + kt — 1/[A] INCREASES with time, with positive slope k. The slope is POSITIVE for second-order, unlike the negative slopes of zero- and first-order.

**MC-3 — Plotting [A] vs. t as the test for first-order** (Type 5, instruction-induced)
- *Mechanism*: students are told "check for linearity" and plot the wrong quantity — [A] instead of ln[A] — for first-order.
- *Diagnostic probe*: "You want to test whether a reaction is first-order. What do you plot on the y-axis? Against what on the x-axis?"
- *Characteristic phrase*: "I plot [A] vs. t and check if it's a straight line."
- *Repair*: [A] vs. t linear → zero-order. ln[A] vs. t linear → first-order. 1/[A] vs. t linear → second-order. The [A] vs. t plot for first-order is a DECAYING EXPONENTIAL (curved), not a straight line. Memorise the three correct plots explicitly, not just "check for linearity."

## Analogies

**The shrinking debt analogy for second-order half-life**: a debt that grows as you pay it off (perversely) — the half-life of a second-order reaction gets longer as [A] decreases, just as paying off a compound-interest debt might take progressively longer for each subsequent halving. (This is an anti-intuitive analogy — choose whether to use it based on student mathematical comfort.)

**The staircase vs. curve analogy for all three orders**: zero-order is a straight staircase (linear drop). First-order is a ski slope that flattens out (exponential). Second-order is a ski slope that STEEPENS then flattens (reciprocal growth). Draw all three on the same axes to show the characteristic shapes.

## Demonstrations

**Demonstration 1 — Graphical order determination from H₂O₂ decomposition data**
- Provide time-series [H₂O₂] data (first-order) and have students plot [A] vs. t, ln[A] vs. t, and 1/[A] vs. t on the same dataset. Students see that ln[A] vs. t is the unique straight line. The other two are visibly curved. Extract k from the slope. Use the same k and t₁/₂ = 0.693/k for verification.

## Discovery Questions

1. "The decomposition A → products is followed by measuring [A] over time. The data gives a straight line when ln[A] is plotted vs. t, with slope = −0.035 min⁻¹. (a) What is the reaction order? (b) What is k? (c) What is t₁/₂? (d) If [A]₀ = 0.80 M, what is [A] after 30 minutes?" (Targets: (a) first-order. (b) k = 0.035 min⁻¹. (c) t₁/₂ = 0.693/0.035 = 19.8 min. (d) ln[A]_30 = ln(0.80) − 0.035 × 30 = −0.2231 − 1.05 = −1.273; [A]_30 = e^(−1.273) = 0.280 M.)
2. "A second-order reaction has k = 0.150 L mol⁻¹ s⁻¹ and [A]₀ = 0.200 M. (a) What is [A] after 10 s? (b) What is t₁/₂?" (Targets: (a) 1/[A]_10 = 1/0.200 + 0.150 × 10 = 5 + 1.5 = 6.5 L mol⁻¹; [A]_10 = 1/6.5 = 0.154 M. (b) t₁/₂ = 1/(0.150 × 0.200) = 33.3 s.)
3. "A reaction of the form rate = k[A][B] is studied with [B]₀ = 0.500 M (>> [A]₀ = 0.010 M). A pseudo-first-order plot gives slope = −0.025 s⁻¹. Find the true second-order rate constant k." (Targets: k' = k[B] ≈ k × 0.500 = 0.025 s⁻¹ (since [B] >> [A], [B] ≈ [B]₀). k = 0.025/0.500 = 0.050 L mol⁻¹ s⁻¹.)

## Teaching Sequence

1. Review from chem.kinet.rate-law: rate law; orders; k constant at fixed T. Set up: "The rate law tells us how fast at one instant. The integrated rate law tells us where we are at any time."
2. Derive zero-order integrated law: integrate d[A]/dt = −k → [A] = [A]₀ − kt. Derive t₁/₂. Draw [A] vs. t (straight line).
3. Derive first-order: integrate d[A]/dt = −k[A] → ln[A] = ln[A]₀ − kt. Constant half-life. Draw ln[A] vs. t (straight line).
4. Derive second-order: integrate d[A]/dt = −k[A]² → 1/[A] = 1/[A]₀ + kt. Half-life = 1/(k[A]₀). Draw 1/[A] vs. t (positive slope). Address MC-2.
5. Graphical diagnosis: present the three-plot method. Address MC-1 (constant half-life only for first-order) and MC-3 ([A], not [A], gives linear plot for first-order).
6. Work Discovery Questions 1 and 2.
7. Pseudo-first-order: motivate with a bimolecular reaction; explain the approximation; work Discovery Question 3.

## Tutor Actions

- If student says half-life is constant for all orders → MC-1 repair: show second-order t₁/₂ = 1/(k[A]₀); compute two consecutive half-lives numerically to show they differ.
- If student expects 1/[A] to decrease → MC-2 repair: when [A] goes down, 1/[A] goes up; plug in numbers.
- If student plots [A] vs. t to test first-order → MC-3 repair: the three plots explicitly; [A] vs. t linear only for zero-order.
- Advance when student can identify order from graphical data, compute k, calculate [A] at a given time, and state the half-life formula for each order.

## Voice Teaching Notes

"Three plots. One is straight for each order. Learn which one." Repeat this as a mantra before any graphical diagnosis question. The student must be able to recite: "[A] vs. t → zero; ln[A] vs. t → first; 1/[A] vs. t → second" without hesitation.

For half-life: "Only first-order has a constant half-life. Say that word — constant — and think of radioactive decay. Second-order half-life increases. Zero-order half-life decreases. These are the exceptions to memorise."

## Assessment Signals

**Mastery gate**:
1. Student correctly writes all three integrated rate laws and the corresponding half-life formulas.
2. Student correctly identifies order from three-plot graphical data.
3. Student correctly calculates [A] at time t using the appropriate integrated law.
4. Student correctly applies pseudo-first-order: identifies the condition ([B] >> [A]), defines k', and extracts true k.

**FRAGILE signal**: student applies the correct integrated law but cannot explain why the second-order 1/[A] plot has a positive slope (arithmetic correct, physical picture absent).

**MISCONCEIVING signal**: student plots [A] vs. t for a first-order test. Address MC-3 with explicit table of three plots before any graphical exercise.

## Tutor Recovery Strategy

If stuck:
1. For integrated law derivation: "Write rate = −d[A]/dt = k[A]^n. Rearrange: d[A]/[A]^n = −k dt. Integrate both sides from [A]₀ to [A] and from 0 to t. For n=0: left side = [A] − [A]₀; for n=1: left side = ln[A] − ln[A]₀; for n=2: left side = −1/[A] + 1/[A]₀." Walk the calculus step-by-step.
2. For 1/[A] sign: "If [A] = 1, 1/[A] = 1. If [A] = 0.5, 1/[A] = 2. If [A] = 0.25, 1/[A] = 4. As [A] falls, 1/[A] rises. Draw this." Numbers beat words here.
3. For pseudo-first-order: "Write rate = k[A][B]. Now write [B] → constant = [B]₀. Define k' = k[B]₀. Rewrite: rate = k'[A]. This is first-order in [A] with effective rate constant k'. Measure k' by the first-order method. Then k = k'/[B]₀."

## Memory Hooks

- **Zero: [A] = [A]₀ − kt. t₁/₂ = [A]₀/2k (decreases). Plot [A] vs. t.**
- **First: ln[A] = ln[A]₀ − kt. t₁/₂ = 0.693/k (CONSTANT). Plot ln[A] vs. t.**
- **Second: 1/[A] = 1/[A]₀ + kt. t₁/₂ = 1/(k[A]₀) (increases). Plot 1/[A] vs. t.**
- **Graphical: which plot is LINEAR identifies the order. First-order: never plot [A], always ln[A].**

## Transfer Connections

- **chem.kinet.arrhenius**: k in the integrated rate law is the same temperature-dependent constant from the Arrhenius equation; knowing how [A] evolves with time (this node) and how k varies with T (Arrhenius) gives a complete kinetic picture.
- **chem.kinet.mechanism**: the integrated rate laws are derived assuming a particular rate law; the rate law itself comes from the mechanism's rate-determining step. Choosing the correct integrated law requires knowing the order, which requires knowing the mechanism.

## Cross-Subject Connections

- **Physics (radioactive decay)**: nuclear decay is exactly a first-order process — N(t) = N₀ e^(−λt); λ is the decay constant analogous to k; t₁/₂ = ln 2/λ. Students who know nuclear physics already know first-order kinetics in a different notation.
- **Mathematics (differential equations)**: the three integrated rate laws are solutions to the simplest separable first-order ODE families; this is an accessible, chemically motivated entry point to solving differential equations.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.kinet.integrated-rate`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.kinet.integrated-rate` as of 2026-07-23.

## Curriculum Feedback

This is a terminal node (no unlocks), which is correct — integrated rate laws are a computational endpoint, not a gateway to further kinetics concepts (catalysis and mechanism unlock from rate-law and Arrhenius respectively). The 0.80 mastery threshold is appropriate for a computation-heavy node. The three-plot diagnostic method should be the structural spine of the teaching sequence; students who can do this reliably have the main skill.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
