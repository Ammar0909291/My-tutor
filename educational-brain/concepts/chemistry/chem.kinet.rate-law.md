# Rate Law and Order — `chem.kinet.rate-law`

## Identity

- **KG ID**: chem.kinet.rate-law
- **Subject**: Chemistry
- **Domain**: Chemical Kinetics (chem.kinet)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.kinet.rate
- **Unlocks**: chem.kinet.arrhenius, chem.kinet.integrated-rate, chem.kinet.mechanism
- **Cross-links**: none

## Learning Objective

Students can write a rate law of the form rate = k[A]^m[B]^n; determine reaction orders with respect to individual reactants and overall order from initial-rate data; calculate the rate constant k from experimental data and state its units for different reaction orders; and explain why rate-law orders cannot be inferred from stoichiometry.

## Core Understanding

**Rate law**: for the reaction aA + bB → products, the rate law is:
rate = k[A]^m [B]^n

where m and n are the orders with respect to A and B respectively, determined experimentally — NOT from stoichiometric coefficients a and b. The overall order is m + n.

**Rate constant (k)**: a proportionality constant specific to the reaction, temperature, and solvent. Its units depend on overall order:
- Zero order: mol L⁻¹ s⁻¹
- First order: s⁻¹
- Second order: L mol⁻¹ s⁻¹
- nth order: L^(n−1) mol^(1−n) s⁻¹

**Initial-rate method (method of isolation)**: to determine m, compare two experiments in which [B] is held constant and [A] is varied:
rate₁/rate₂ = ([A]₁/[A]₂)^m

Taking log of both sides: m = log(rate₁/rate₂) / log([A]₁/[A]₂). Same logic for n using varying [B] with fixed [A].

**Orders need not be integers**: fractional orders (0.5, 1.5) and even negative orders are possible — a negative order means increasing [A] decreases the rate (encountered in enzyme inhibition and some chain mechanisms).

**Why stoichiometry does NOT determine order**: the rate law reflects the mechanism (specifically, the rate-determining step). The balanced equation describes the overall stoichiometry, which may be the net result of many elementary steps. Only for elementary (single-step) reactions does the rate law follow stoichiometry.

## Mental Models

**The recipe-vs-mechanism model**: the balanced equation is a recipe for the overall transformation (reactants → products). The rate law is a window into the mechanism — how the reaction actually proceeds step by step. You cannot read a recipe and know how quickly each step in the kitchen happens (some steps are slow, some fast). The rate law tells you which reactants participate in the slow step and how sensitively.

**The choke-point analogy**: the rate-determining step is the narrowest point in a traffic tunnel — overall throughput is set by that single bottleneck regardless of how wide the other sections are. Rate law orders reflect which species (in which concentrations) participate in that bottleneck step.

## Why Students Fail

1. **Order from stoichiometry**: students see 2A + B → products and write rate = k[A]²[B]. This is correct only if the reaction is elementary (a single-step mechanism) — most reactions are not. Always require experimental evidence.
2. **Units of k are always the same**: students think k has units of L mol⁻¹ s⁻¹ regardless of order. Units depend on order; checking units of k is a key self-consistency test.
3. **Method of isolation arithmetic**: students divide rates but forget to take the logarithm when m is not an obvious integer. For rate₁/rate₂ = 2 when [A]₁/[A]₂ = 2, m = 1. But for rate₁/rate₂ = 4 when [A]₁/[A]₂ = 2, students may write m = 4 instead of m = 2.
4. **Orders must be positive integers**: students reject fractional or negative orders as "impossible."

## Misconceptions

**MC-1 — Rate law orders equal stoichiometric coefficients** (Type 5, instruction-induced)
- *Mechanism*: the rate law is introduced immediately after writing a balanced equation; students incorrectly pattern-match exponents from coefficients.
- *Diagnostic probe*: "The reaction 2NO(g) + O₂(g) → 2NO₂(g) is experimentally found to be third order overall: rate = k[NO]²[O₂]. Could the rate law be rate = k[NO]²[O₂]² instead, given the stoichiometry?"
- *Characteristic phrase*: "Since there are 2 NO and 1 O₂, the rate law is rate = k[NO]²[O₂]."
- *Repair*: in this particular example the orders (2 for NO, 1 for O₂) happen to equal the coefficients, but this is a coincidence arising because the reaction has a single-step (or effectively single-step) mechanism. The general rule: orders are determined ONLY from experiment. The example H₂ + Br₂ → 2HBr, which has a complex chain mechanism and a rate law rate = k[H₂][Br₂]^½, disproves the stoichiometry rule definitively.

**MC-2 — Increasing concentration always increases rate** (Type 1, overgeneralization)
- *Mechanism*: for orders m ≥ 1, doubling [A] always increases rate; students assume this is universal.
- *Diagnostic probe*: "For the reaction A + B → C, the rate law is rate = k[A]⁻¹[B]. If [A] is doubled, what happens to the rate?"
- *Characteristic phrase*: "More A means more collisions, so rate must increase."
- *Repair*: a negative order (m = −1) means the species inhibits the reaction — often because it promotes a competing back-reaction or competes for a catalyst. For rate = k[A]⁻¹[B], doubling [A] halves the rate. Enzyme inhibition is the most common real-world example.

**MC-3 — The rate constant k changes with concentration** (Type 2, perceptual intuition)
- *Mechanism*: students observe that rate changes when [A] changes and incorrectly attribute this to k changing.
- *Diagnostic probe*: "If [A] doubles and rate quadruples in a reaction rate = k[A]², has k changed?"
- *Characteristic phrase*: "As concentration increases, k gets bigger because the molecules are hitting more often."
- *Repair*: k is a constant at fixed temperature. It absorbs all the factors that are not concentration-dependent (collision frequency per unit concentration, steric factor, activation energy). When rate = k[A]², the rate changes because [A]² changes — not k. k is determined by temperature only (the Arrhenius equation in the next node). Computing k from two sets of rate/[A] data and verifying the same k value is the self-consistency check.

## Analogies

**The recipe multiplier analogy**: k is like the conversion factor from ingredient amounts to baking time — it is fixed for a given oven temperature (analogue of T). Changing the amount of flour (concentration) changes the outcome, but the conversion factor (k) stays the same unless you change the temperature.

**The amplifier gain analogy**: rate = k × [A]^m. k is the amplifier gain; [A]^m is the input signal. The same input produces twice the output only if you turn up the gain (increase k by raising T) or increase the signal (increase [A]).

## Demonstrations

**Demonstration 1 — Clock reaction (iodine clock)**
- The iodine clock reaction can be run at different initial concentrations of H₂O₂ and I⁻, with the time to the colour change measuring the rate. Students observe that doubling [H₂O₂] roughly halves the time → doubles the rate → first order in H₂O₂. The quantitative relationship between time and rate reinforces the meaning of rate law order.

## Discovery Questions

1. "Experiment 1: [A] = 0.10 M, [B] = 0.10 M, rate = 2.0 × 10⁻⁴ mol L⁻¹ s⁻¹. Experiment 2: [A] = 0.20 M, [B] = 0.10 M, rate = 4.0 × 10⁻⁴ mol L⁻¹ s⁻¹. Experiment 3: [A] = 0.10 M, [B] = 0.20 M, rate = 8.0 × 10⁻⁴ mol L⁻¹ s⁻¹. Determine the rate law and k." (Targets: m = log(4/2)/log(2/1) = 1; n = log(8/2)/log(2/1) = 2. Rate law: rate = k[A][B]². k = rate/([A][B]²) = 2.0 × 10⁻⁴/(0.10 × 0.01) = 0.20 L² mol⁻² s⁻¹. Units: second order overall in B alone → overall order 3, units L² mol⁻² s⁻¹.)
2. "For the reaction A → products: rate = k[A]². If [A]₀ = 0.50 mol L⁻¹ and rate₀ = 1.0 × 10⁻² mol L⁻¹ s⁻¹, calculate k and its units." (Targets: k = rate/[A]² = 0.010/0.25 = 0.040 L mol⁻¹ s⁻¹. Units for 2nd-order: L mol⁻¹ s⁻¹.)
3. "A reaction has the rate law rate = k[A]^½[B]. What are the orders with respect to A, B, and overall?" (Targets: order in A = ½, order in B = 1, overall order = 3/2. The fractional order is permitted — it arises from a mechanism with a reversible equilibrium step.)

## Teaching Sequence

1. Review from chem.kinet.rate: rate definition, factors affecting rate. Set up the question: "We know concentration affects rate — but HOW (linear, squared, not at all)? That's what the rate law tells us."
2. Introduce the rate law equation: rate = k[A]^m[B]^n. Define k, m, n, overall order.
3. Explicitly address MC-1: "Can we read m and n from the balanced equation?" → No. Provide the H₂ + Br₂ counterexample. Drill: "Orders are EXPERIMENTAL."
4. Introduce units of k for different orders (derive from rate = k[A]^n: k = rate/[A]^n → units of k = (mol L⁻¹ s⁻¹)/(mol L⁻¹)^n). Work Discovery Question 2.
5. Teach the initial-rate method. Work Discovery Question 1 step by step, first finding m, then n, then k.
6. Introduce fractional and negative orders. Address MC-2 (negative orders possible) and Discovery Question 3.
7. Address MC-3: k is constant at fixed T; verify with the same k computed from two different experiments in Question 1.

## Tutor Actions

- If student reads orders from stoichiometry → MC-1 repair: H₂ + Br₂ counterexample; remind "experimental only."
- If student says k changes with concentration → MC-3 repair: calculate k from two experiments and show they give the same value; k only changes with T.
- If student rejects fractional orders → Discovery Question 3 as concrete example; explain mechanism origin.
- Advance when student correctly determines order from initial-rate data, computes k with correct units, and states that orders are experimental.

## Voice Teaching Notes

"Orders are experimental" — say this phrase every time a student writes a rate law, until it becomes a reflex. The single most common error in kinetics is writing orders from stoichiometry, and the repair is repetition: "Can you read this from the equation? No — experimental only."

For units of k: rather than memorising, derive. "Rate has units mol L⁻¹ s⁻¹. Rate = k × (concentration)^n. So k = rate/(concentration)^n. Plug in the units and simplify." Students who derive the units never confuse them.

## Assessment Signals

**Mastery gate**:
1. Student correctly uses the initial-rate method to determine m and n from three experiments.
2. Student correctly calculates k and states its units for a given order.
3. Student correctly states that reaction order cannot be inferred from stoichiometry.
4. Student correctly writes the rate law from experimental data including non-integer orders.

**FRAGILE signal**: student gets m and n correct from initial-rate data but units of k are wrong — systematic unit confusion, not random.

**MISCONCEIVING signal**: student reads orders from the balanced equation. Stop immediately; address MC-1 before any calculation.

## Tutor Recovery Strategy

If stuck:
1. For initial-rate method: use only two experiments at a time. "In experiments 1 and 2, which concentration changed? How much? How did the rate change? Divide rate₁/rate₂ and [A]₁/[A]₂ — the ratio of rate change equals ([A] change)^m. Solve for m."
2. For units of k: write rate = k[A]^n, rearrange k = rate/[A]^n, substitute units: k = (mol L⁻¹ s⁻¹)/(mol L⁻¹)^n, simplify algebraically.
3. For stoichiometry ≠ order: ask "Is this reaction elementary (single step)?" → "How do you know?" → "You don't — you need the mechanism or experimental data." Elementary reactions are the only exception; most real reactions are multi-step.

## Memory Hooks

- **Rate = k[A]^m[B]^n. Orders m, n are EXPERIMENTAL — never from stoichiometry.**
- **Units of k depend on order. First order: s⁻¹. Second order: L mol⁻¹ s⁻¹. Derive, don't memorise.**
- **Initial-rate method: ratio of rates / ratio of concentrations = concentration^m → solve for m.**
- **k is constant at fixed T — it does NOT change with concentration.**

## Transfer Connections

- **chem.kinet.arrhenius**: k depends on temperature via the Arrhenius equation k = A e^(−Ea/RT); the rate constant derived here is the same k that Arrhenius relates to activation energy and temperature.
- **chem.kinet.integrated-rate**: the integrated rate laws (first-order ln[A] vs. t; second-order 1/[A] vs. t) are derived by integrating rate = k[A]^n over time; knowing the order from initial-rate data selects the correct integrated form.
- **chem.kinet.mechanism**: the elementary steps of a mechanism each have their own rate law (order = stoichiometry for elementary steps); the overall observed rate law is derived from the mechanism via the rate-determining step approximation.

## Cross-Subject Connections

- **Biology (enzyme kinetics)**: Michaelis-Menten kinetics reduce to first-order in substrate at low [S] and zero-order at high [S]; the transition between these apparent orders reflects the mechanism of enzyme saturation.
- **Mathematics (logarithms)**: determining reaction order from initial-rate ratios requires solving (rate ratio) = (concentration ratio)^m → log-log relationship; this is a direct application of logarithm properties.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.kinet.rate-law`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.kinet.rate-law` as of 2026-07-23.

## Curriculum Feedback

The proficient/apply difficulty/bloom combination is appropriate. The 0.80 mastery threshold (higher than the 0.75 default) reflects that rate-law determination is a computational skill that must be reliably executable, not just understood conceptually. Three downstream unlocks (arrhenius, integrated-rate, mechanism) make this a genuine hub node in the kinetics domain.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
