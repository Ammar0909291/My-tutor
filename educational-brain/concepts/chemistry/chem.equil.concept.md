# Equilibrium Concept — `chem.equil.concept`

## Identity

- **KG ID**: chem.equil.concept
- **Subject**: Chemistry
- **Domain**: Equilibrium (chem.equil)
- **Difficulty**: developing
- **Bloom level**: understand
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.thermo.gibbs
- **Unlocks**: chem.equil.kc-kp, chem.equil.kw-ph
- **Cross-links**: none

## Learning Objective

Students can define dynamic equilibrium and distinguish it from static (zero-change) equilibrium; identify observable characteristics of a system at equilibrium; distinguish physical from chemical equilibria; and explain the thermodynamic basis of equilibrium using ΔG and the relationship ΔG° = −RT ln K.

## Core Understanding

**Dynamic equilibrium**: a state in which the forward and reverse reaction rates are equal so that macroscopic properties (concentrations, colour, pressure) remain constant — but the forward and reverse reactions do NOT stop. Molecules are continuously interconverted at equal rates.

Contrast with **static equilibrium** (true rest): no molecular change occurring. Chemical equilibrium is always dynamic, never static.

**Observable characteristics at equilibrium**:
1. Macroscopic properties (concentration, colour, pressure, density) are constant over time.
2. The system is closed (no matter enters or leaves).
3. The equilibrium state is reached from EITHER direction: the same equilibrium is attained whether starting from pure reactants or pure products (under the same conditions).
4. The equilibrium state is temperature-dependent.

**Physical equilibria** involve changes of state with no change in chemical identity:
- Ice ⇌ liquid water: H₂O(s) ⇌ H₂O(l)
- Vapour pressure equilibrium: H₂O(l) ⇌ H₂O(g)
- Dissolution equilibrium: NaCl(s) ⇌ Na⁺(aq) + Cl⁻(aq)

**Chemical equilibria** involve bond breaking/forming:
- N₂(g) + 3H₂(g) ⇌ 2NH₃(g)  (Haber process)
- H₂(g) + I₂(g) ⇌ 2HI(g)
- CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq)

**Thermodynamic basis (from chem.thermo.gibbs)**:
At constant T and P, a system moves to lower Gibbs energy (ΔG < 0 is spontaneous). At equilibrium, ΔG = 0: the Gibbs energy is at its minimum with respect to composition. The relationship to the standard Gibbs energy change:
ΔG° = −RT ln K

where K is the thermodynamic equilibrium constant. This means:
- ΔG° < 0 → K > 1 → equilibrium favours products.
- ΔG° > 0 → K < 1 → equilibrium favours reactants.
- ΔG° = 0 → K = 1 → reactants and products equally favoured at standard conditions.

**Reaction quotient Q vs. K**: Q has the same form as K but uses current (non-equilibrium) concentrations/pressures.
- Q < K: system shifts forward (toward products) to reach equilibrium.
- Q > K: system shifts backward (toward reactants) to reach equilibrium.
- Q = K: at equilibrium.

## Mental Models

**The dance-floor model of dynamic equilibrium**: imagine dancers constantly entering and leaving a dance floor at equal rates. From above, the number of dancers on the floor (analogous to concentration) looks constant — but this is because the inflow and outflow rates are equal, not because dancers have stopped moving. Chemical equilibrium is exactly this: constant macro-state, non-stop micro-activity.

**The hillside model of Gibbs energy**: picture the reaction progress as walking along a hillside. Starting from pure reactants is one valley; pure products is another. The equilibrium position is the lowest point on the saddle between them — where ΔG = 0 and the system rests. K tells you how close to the product valley the saddle sits.

## Why Students Fail

1. **Equilibrium means the reaction has stopped**: the most persistent misconception. Students infer "constant concentrations = no reaction." The dynamic nature must be repeated and anchored to molecular kinetics.
2. **Equilibrium means equal concentrations**: students conflate "equilibrium" with "equal amounts on both sides." K = 1 is a special case; K can be very large or very small.
3. **Equilibrium can only be reached from the reactants side**: students think equilibrium is a one-directional endpoint. The same equilibrium state is reached from either direction.
4. **ΔG = ΔG° at equilibrium**: students confuse ΔG° (standard-state free energy change, constant for a given reaction at fixed T) with ΔG (free energy change at the actual mixture composition). At equilibrium, ΔG = 0; ΔG° is generally not zero.

## Misconceptions

**MC-1 — Equilibrium means the reaction has stopped** (Type 2, perceptual intuition)
- *Mechanism*: at the macroscopic level, everything looks the same → students interpret "no observable change" as "no change," collapsing the micro/macro distinction.
- *Diagnostic probe*: "If you add a tiny amount of radioactively labelled reactant A* to a system at equilibrium, where would you detect the label one minute later — only in A, or in both A and products?"
- *Characteristic phrase*: "At equilibrium, the forward and reverse reactions have both stopped, so concentrations stay constant."
- *Repair*: the label would appear in products as well, because the forward reaction is still occurring. Distinguish macro-constant (what you see) from micro-dynamic (what molecules do). The radiotracer test is the empirical proof of dynamic equilibrium. At the molecular level: forward rate = reverse rate ≠ 0.

**MC-2 — Equilibrium means equal concentrations of reactants and products** (Type 3, language contamination from "balance")
- *Mechanism*: the word "equilibrium" triggers the everyday meaning of "balance" → "equal." Students write [products] = [reactants] as the equilibrium condition.
- *Diagnostic probe*: "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), K ≈ 977 at 300°C. At equilibrium, which is more abundant — reactants or products?"
- *Characteristic phrase*: "At equilibrium there's the same amount of reactants as products — that's what equilibrium means."
- *Repair*: "equilibrium" in chemistry means "steady state," not "equal amounts." K = 977 >> 1 means products dominate enormously. "Equal" refers to RATES (forward rate = reverse rate), not concentrations. K is the measure of which side is favoured at equilibrium.

**MC-3 — ΔG° = 0 at equilibrium** (Type 1, overgeneralization: ΔG = 0 at equilibrium → confuses ΔG with ΔG°)
- *Mechanism*: students learn "ΔG = 0 at equilibrium" and miscode it as "ΔG° = 0 at equilibrium."
- *Diagnostic probe*: "For the Haber synthesis at 298 K, ΔG° = −33.3 kJ mol⁻¹. Is this reaction at equilibrium under standard conditions?"
- *Characteristic phrase*: "At equilibrium ΔG must equal zero, so ΔG° = 0 at equilibrium too."
- *Repair*: ΔG° is a fixed thermodynamic property of the reaction at a given T — it does NOT change as the reaction proceeds. ΔG = ΔG° + RT ln Q does change as Q changes. At equilibrium: Q = K, so ΔG = ΔG° + RT ln K = 0 → ΔG° = −RT ln K. ΔG° ≠ 0 unless K = 1. Distinguish: ΔG° is the standard-state driving force; ΔG is the current driving force; only ΔG = 0 at equilibrium.

## Analogies

**The two-way traffic tunnel analogy**: dynamic equilibrium is like a tunnel with equal traffic in both directions — the number of cars in the tunnel stays constant not because cars have stopped, but because arrivals equal departures. The rate of entry = rate of exit.

**The bank balance analogy**: ΔG° is the interest rate set by the bank (fixed for a given reaction at fixed T). ΔG is the actual daily gain or loss depending on your current balance (Q). Equilibrium is when gain = loss → ΔG = 0. The interest rate (ΔG°) need not be zero for the balance to stabilise.

## Demonstrations

**Demonstration 1 — NO₂/N₂O₄ equilibrium in sealed tubes**
- Seal NO₂/N₂O₄ gas mixture (brown/colourless) in two identical tubes. Heat one (brown deepens → more NO₂), cool the other (paler → more N₂O₄). After each temperature change, the colour stabilises at a new constant level — new equilibrium. Students observe: (1) equilibrium is temperature-dependent, (2) constant colour ≠ no reaction.

## Discovery Questions

1. "You are told that [A] = 0.5 M, [B] = 0.5 M, and [C] = 2.0 M for the reaction A + B ⇌ C with K = 16 at the current temperature. Calculate Q. Which direction does the reaction proceed?" (Targets: Q = [C]/([A][B]) = 2.0/(0.5 × 0.5) = 8. Q = 8 < K = 16 → system shifts forward, producing more C.)
2. "For the reaction H₂(g) + I₂(g) ⇌ 2HI(g), K = 794 at 298 K. Calculate ΔG° at 298 K." (Targets: ΔG° = −RT ln K = −(8.314)(298) ln(794) = −(8.314)(298)(6.677) = −16,540 J/mol ≈ −16.5 kJ/mol. Negative ΔG° confirms products are strongly favoured.)
3. "Explain why the same equilibrium concentrations are reached whether you start with 1 mol H₂ + 1 mol I₂, or with 2 mol HI in a 1 L container at the same temperature." (Targets: the Gibbs energy minimum of the system is a property of the mixture and temperature, not the starting composition. Both starting points are on the same energy landscape — one starts on the left of the minimum, one on the right — and both roll to the same lowest-energy composition.)

## Teaching Sequence

1. Review from chem.thermo.gibbs: ΔG = ΔH − TΔS; ΔG < 0 is spontaneous; ΔG° = −RT ln K.
2. Define equilibrium: start with the key distinction — dynamic, not static. Use the dance-floor or traffic-tunnel model. Address MC-1.
3. Observable characteristics: constant macro properties, closed system, reachable from either direction, temperature-dependent.
4. Physical vs. chemical equilibria: show examples of each. The principle is identical.
5. Thermodynamic basis: ΔG = ΔG° + RT ln Q; at equilibrium Q = K, ΔG = 0. Distinguish ΔG° from ΔG. Address MC-3.
6. Q vs. K: predict the direction of reaction shift. Work Discovery Question 1.
7. Calculate ΔG° from K. Work Discovery Question 2. Address MC-2.
8. Equilibrium from either direction. Work Discovery Question 3.

## Tutor Actions

- If student says reaction has stopped at equilibrium → MC-1 repair: radiotracer argument; forward rate = reverse rate ≠ 0.
- If student says equilibrium = equal concentrations → MC-2 repair: K = 977 for Haber; rates are equal, not concentrations.
- If student says ΔG° = 0 at equilibrium → MC-3 repair: ΔG = 0, not ΔG°; ΔG° = −RT ln K; work a numerical example.
- Advance when student correctly computes Q, compares to K, predicts shift direction, and explains the dynamic nature of equilibrium verbally.

## Voice Teaching Notes

"Dynamic equilibrium is the single most misunderstood phrase in chemistry." Say it explicitly at the start. The word "dynamic" is load-bearing — it means molecular-level activity continues. The word "equilibrium" only means macro-constant. Separate the two words and define each independently before combining them.

For MC-3, the critical contrast is: "ΔG tells you whether the system wants to move now. ΔG° tells you which side the system ultimately prefers. At equilibrium, the system doesn't want to move (ΔG = 0). That doesn't mean it equally likes both sides (ΔG° ≠ 0 in general)."

## Assessment Signals

**Mastery gate**:
1. Student correctly explains dynamic equilibrium (forward rate = reverse rate ≠ 0; macro properties constant).
2. Student correctly calculates Q and predicts direction of shift relative to K.
3. Student correctly distinguishes ΔG (= 0 at equilibrium) from ΔG° (= −RT ln K, generally ≠ 0).
4. Student correctly states that the same equilibrium is reached from either starting composition.

**FRAGILE signal**: student computes Q and K correctly but cannot explain WHY Q < K means shift forward (no connection between Q/K comparison and ΔG driving force).

**MISCONCEIVING signal**: student says "at equilibrium the reaction stops." Address MC-1 with the radiotracer probe before proceeding to Q/K calculations.

## Tutor Recovery Strategy

If stuck:
1. For dynamic equilibrium: "What is the forward reaction rate at equilibrium? (Nonzero.) What is the reverse reaction rate? (Nonzero. And equal.) So is anything happening at the molecular level? Yes. Then why don't concentrations change? Because equal rates of production and consumption."
2. For Q vs. K: "Write K. Now write Q with the actual numbers. Are they equal? If Q < K, K is bigger — the denominator (reactants) or numerator (products) needs to get smaller or bigger respectively. Which direction does that mean the reaction must shift?"
3. For ΔG° vs. ΔG: "Write ΔG = ΔG° + RT ln Q. At equilibrium, what is Q? Substitute Q = K. What does the equation say? ΔG° = −RT ln K. Is ΔG° zero? Only if K = 1. Is ΔG zero? Yes. These are different things."

## Memory Hooks

- **Dynamic equilibrium: forward rate = reverse rate ≠ 0. Macro constant; micro active.**
- **Q < K → shift forward. Q > K → shift backward. Q = K → at equilibrium.**
- **At equilibrium: ΔG = 0. Not ΔG°. ΔG° = −RT ln K.**
- **K > 1 → products favoured. K < 1 → reactants favoured. K = 1 → equal (special case).**

## Transfer Connections

- **chem.equil.kc-kp**: the equilibrium concept (K, Q, direction of shift) is formalized into Kc (concentration-based) and Kp (pressure-based) expressions — the immediate mathematical extension of this node.
- **chem.equil.kw-ph**: the autoionisation of water is a specific chemical equilibrium with K = Kw = 1.0 × 10⁻¹⁴ at 298 K; pH is derived from this equilibrium constant.

## Cross-Subject Connections

- **Biology (homeostasis)**: biological systems maintain steady states (blood pH, temperature, glucose) via coupled equilibria and feedback — analogous to dynamic equilibrium in chemistry, where the steady state is maintained by equal and opposite rates.
- **Economics (market equilibrium)**: supply equals demand at market equilibrium — a steady state maintained by equal and opposite flows, exactly the dynamic-equilibrium pattern.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.equil.concept`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.equil.concept` as of 2026-07-23.

## Curriculum Feedback

This concept is correctly placed as the gateway to all equilibrium quantitative work (Kc/Kp and Kw/pH). The prerequisite of chem.thermo.gibbs is essential — students who lack the ΔG° = −RT ln K foundation will treat K as an empirical constant with no thermodynamic meaning, severely limiting transfer. The developing/understand classification is appropriate: the concept is conceptually deep (dynamic vs. static, ΔG vs. ΔG°) but requires no difficult calculation at this level.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
