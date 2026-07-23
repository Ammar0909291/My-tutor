# Catalysis — `chem.kinet.catalysis`

## Identity

- **KG ID**: chem.kinet.catalysis
- **Subject**: Chemistry
- **Domain**: Chemical Kinetics (chem.kinet)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.kinet.arrhenius
- **Unlocks**: chem.surface.adsorption
- **Cross-links**: none

## Learning Objective

Students can distinguish homogeneous from heterogeneous catalysis with examples; explain how a catalyst lowers activation energy without altering ΔH, ΔG, or K; use the Arrhenius equation to quantify the rate increase from Ea reduction; describe enzyme kinetics qualitatively (active site, substrate specificity, lock-and-key/induced-fit models); and state that a catalyst is not consumed in the overall reaction.

## Core Understanding

**Definition**: a catalyst is a substance that increases the rate of a reaction without being consumed in the overall process. It provides an alternative reaction pathway with a lower activation energy (Ea).

**What a catalyst changes and what it does NOT change**:
- CHANGES: activation energy (Ea ↓), rate constant k (↑), reaction rate (↑).
- DOES NOT CHANGE: ΔH, ΔS, ΔG, the equilibrium constant K, the equilibrium position (only the speed of reaching equilibrium), the stoichiometry of the overall reaction.

A catalyst lowers Ea for BOTH forward and reverse reactions equally (because ΔH is unchanged). It speeds up the approach to equilibrium from either direction but cannot shift the equilibrium position — only changing T, pressure, or concentration can shift K.

**Homogeneous catalysis**: the catalyst is in the same phase as the reactants.
Example: NO(g) catalyses SO₂(g) oxidation: SO₂(g) + NO(g) → SO₃(g) + NO(g) is not the mechanism — rather:
Step 1: 2 NO(g) + O₂(g) → 2 NO₂(g)
Step 2: NO₂(g) + SO₂(g) → SO₃(g) + NO(g)
Overall: SO₂(g) + ½O₂(g) → SO₃(g) (NO regenerated, thus catalytic)

Acid/base catalysis in aqueous solution (H⁺ or OH⁻ as catalyst) is the most common homogeneous example in organic and biochemistry.

**Heterogeneous catalysis**: the catalyst is in a different phase from the reactants (usually a solid catalyst with gas or liquid reactants).
Examples: Fe(s) catalyst in the Haber process (N₂ + 3H₂ → 2NH₃); Pt/Pd/Rh in catalytic converters (CO, NOx, unburned hydrocarbons → CO₂, N₂, H₂O); V₂O₅ in the Contact process (SO₂ → SO₃ for H₂SO₄ production).

The mechanism involves four stages: (1) adsorption of reactants onto the catalyst surface; (2) surface migration/activation; (3) surface reaction; (4) desorption of products. The active sites on the surface are often metal atoms with specific electronic/geometric properties.

**Arrhenius equation quantification**:
k = Ae^(−Ea/RT)

If a catalyst lowers Ea from Ea,uncat to Ea,cat:
k_cat/k_uncat = exp[−(Ea,cat − Ea,uncat)/RT] = exp[(Ea,uncat − Ea,cat)/RT]

Even a modest reduction in Ea gives a large rate increase because of the exponential relationship. Example: at 298 K, a 10 kJ/mol reduction in Ea gives exp(10000/8.314/298) = exp(4.04) ≈ 57-fold rate increase.

**Enzyme kinetics (qualitative)**:
Enzymes are biological catalysts — proteins (mostly) that catalyse specific biochemical reactions with extraordinary rate enhancements (factors of 10⁶ to 10¹² compared to uncatalysed reactions).

Key features:
- **Active site**: a specific region of the enzyme with a shape and chemical environment complementary to the substrate.
- **Substrate specificity**: each enzyme catalyses one or a very small class of reactions (determined by active-site geometry and chemistry).
- **Lock-and-key model**: the substrate fits the active site like a key fits a lock — perfect geometric complementarity. (Oversimplified — see induced-fit.)
- **Induced-fit model**: the enzyme's active site undergoes a conformational change upon substrate binding, achieving complementarity only after binding — the enzyme "clasps" the substrate. This model better explains enzyme flexibility and explains how some inhibitors work.
- **Michaelis-Menten kinetics (qualitative)**: at low [substrate], rate ∝ [substrate] (first order); at high [substrate], rate → Vmax (zero order, active sites saturated). This saturation behaviour distinguishes enzyme kinetics from simple chemical kinetics.
- Enzymes are NOT consumed in the catalytic cycle — the enzyme is released after each reaction and catalyses another substrate molecule.

**Enzyme inhibition (qualitative)**:
- *Competitive inhibitor*: binds the active site, blocking substrate access. Increasing [substrate] can overcome it.
- *Non-competitive inhibitor*: binds elsewhere (allosteric site), changing the enzyme's shape so the active site is less effective. Cannot be overcome by increasing [substrate].

## Mental Models

**The mountain-pass model for catalysts**: the energy diagram for a reaction is a mountain between reactant valley and product valley. The uncatalysed path goes over the main peak (high Ea). The catalyst provides a tunnel or a lower mountain pass — the destination (products) and the starting elevation (ΔH) are unchanged; only the maximum height traversed is lower.

**The lock-and-key → induced-fit upgrade**: the lock-and-key model implies a rigid enzyme. Tell students: "start with lock-and-key because it explains specificity. Then upgrade to induced-fit because real enzymes flex — the key slightly reshapes the lock when inserted." This two-step narrative avoids teaching a misconception first and then correcting it.

## Why Students Fail

1. **A catalyst shifts the equilibrium**: the most conceptually important error. A catalyst increases RATE in both directions equally; K is unchanged; equilibrium position is unchanged; only the time to reach equilibrium decreases.
2. **A catalyst is consumed in the reaction**: students confuse an intermediate (which IS consumed in one step and regenerated in another, like NO in the SO₂ example) with the net result — the catalyst reappears in the product of the last step.
3. **Lowering Ea by 50% doubles the rate**: the rate increase is exponential (Arrhenius), not linear. A 50% reduction in Ea can increase k by many orders of magnitude.
4. **Lock-and-key means all enzymes are rigid**: students use lock-and-key as a permanent model rather than an approximation, and fail to explain inhibitor effects or enzyme flexibility.

## Misconceptions

**MC-1 — A catalyst shifts the equilibrium position** (Type 1, overgeneralization of "catalyst increases reaction")
- *Mechanism*: students hear "catalyst makes reaction go faster" and extend this to "more product forms" — conflating rate with equilibrium extent.
- *Diagnostic probe*: "You add a catalyst to a reaction at equilibrium. What happens to K? What happens to [products]?"
- *Characteristic phrase*: "The catalyst shifts the equilibrium to the right, increasing product concentration."
- *Repair*: at equilibrium, both forward and reverse rates are already equal. A catalyst lowers Ea equally for both directions — it increases both rates by the same factor. The ratio k_f/k_r = K remains unchanged. The equilibrium position (and [products]) is unchanged. The catalyst only speeds up how quickly a non-equilibrium mixture reaches equilibrium.

**MC-2 — A catalyst is consumed during the reaction** (Type 5, instruction-induced: students see the catalyst appear in the mechanism but don't track it to the end)
- *Mechanism*: students read mechanism step 1 and see the catalyst consumed, then don't read step 2 where it is regenerated.
- *Diagnostic probe*: "In the NO-catalysed oxidation of SO₂, NO appears in step 1 as a reactant. Is NO consumed overall?"
- *Characteristic phrase*: "NO is used up in step 1, so it's consumed."
- *Repair*: write the net equation: sum all steps. NO appears as a reactant in step 1 and a product in step 2 → NO cancels out of the overall equation. An intermediate is produced in one step and consumed in a later step (it never appears in the overall equation). A catalyst is consumed in one step and regenerated in a later step (it also doesn't appear in the overall equation). The distinction: intermediates are produced FIRST, then consumed; catalysts are consumed FIRST, then regenerated.

**MC-3 — Rate enhancement is proportional to Ea reduction** (Type 2, perceptual intuition of linearity)
- *Mechanism*: students treat "smaller Ea → faster reaction" as linear, missing the exponential Arrhenius relationship.
- *Diagnostic probe*: "If a catalyst halves the activation energy from 80 kJ/mol to 40 kJ/mol at 298 K, estimate how much faster the reaction is."
- *Characteristic phrase*: "The reaction is twice as fast because the Ea is halved."
- *Repair*: k ∝ e^(−Ea/RT). Ratio = exp(−40000/RT) / exp(−80000/RT) = exp(40000/8.314/298) = exp(16.1) ≈ 10 million. Halving Ea increases the rate by a factor of ~10⁷, not 2. The Arrhenius exponential is the key: small changes in Ea produce enormous changes in rate.

## Analogies

**The enzyme as a jig (machining analogy)**: a machinist's jig holds parts in the exact position needed for a precision cut — it doesn't change what is made, only how efficiently and accurately it is made. The enzyme active site is a molecular jig: it holds the substrate in precisely the geometry and electronic environment needed to lower the transition-state energy.

**The catalyst as a tour guide analogy**: a tour guide takes a group through a city using back streets (low Ea route) rather than gridlocked highways (high Ea route). The destination is the same; the guide is not "used up" — they lead the next group immediately after. The number of tourists at each landmark (equilibrium) is unchanged; only the time to get there is reduced.

## Demonstrations

**Demonstration 1 — MnO₂ catalysis of H₂O₂ decomposition**
- Add solid MnO₂ to 30% H₂O₂ and observe rapid O₂ evolution. Then filter and wash the MnO₂ — add it to fresh H₂O₂ and observe the same rapid evolution. Students see directly that the catalyst is not consumed. Contrast with the slow uncatalysed decomposition. Connects to heterogeneous catalysis (solid MnO₂ in liquid H₂O₂).

## Discovery Questions

1. "The activation energy for the decomposition of N₂O₅ is 103 kJ/mol uncatalysed and 63 kJ/mol with a catalyst at 300 K. By what factor does the catalyst increase the rate? (R = 8.314 J mol⁻¹ K⁻¹)" (Targets: ratio = exp[(103000 − 63000)/(8.314 × 300)] = exp(40000/2494) = exp(16.04) = 9.2 × 10⁶. The catalyst increases the rate by about 9 million-fold — even though Ea is reduced by only 39%.)
2. "A catalyst is added to the equilibrium: N₂O₄(g) ⇌ 2NO₂(g). Predict the effect on: (a) Kc, (b) [NO₂] at equilibrium, (c) the time needed to reach equilibrium from a non-equilibrium mixture." (Targets: (a) Kc unchanged — catalyst doesn't change ΔG° or K. (b) [NO₂] unchanged — equilibrium position not shifted. (c) Time decreases — both forward and reverse rates increase, so equilibrium is reached more quickly.)
3. "Describe the difference between a competitive and a non-competitive enzyme inhibitor in terms of the active site. Why can increasing substrate concentration overcome competitive but not non-competitive inhibition?" (Targets: competitive inhibitor binds the active site, competing directly with substrate — high [substrate] displaces it by mass action. Non-competitive inhibitor binds elsewhere, distorting the active site so even substrate-bound enzyme has reduced activity — [substrate] can't overcome structural distortion at a different site.)

## Teaching Sequence

1. Review from chem.kinet.arrhenius: k = Ae^(−Ea/RT); Ea's role in rate; energy diagrams (transition state).
2. Define catalyst: alternative pathway, lower Ea, not consumed. Draw energy diagram with and without catalyst — same reactant/product energies, different activation barrier.
3. What a catalyst does NOT change: K, ΔH, ΔG, equilibrium position. Address MC-1 explicitly before proceeding.
4. Homogeneous catalysis: NO in SO₂ oxidation. Track catalyst through mechanism. Address MC-2.
5. Heterogeneous catalysis: Haber process, catalytic converter. Four stages of surface catalysis.
6. Quantify rate enhancement with Arrhenius. Address MC-3. Work Discovery Question 1.
7. Work Discovery Question 2 (consolidates catalyst vs. K confusion).
8. Enzyme kinetics: active site, substrate specificity, lock-and-key → induced-fit, Michaelis-Menten saturation, inhibition. Work Discovery Question 3.

## Tutor Actions

- If student says catalyst shifts equilibrium → MC-1 repair: catalyst lowers Ea equally for forward and reverse; K = k_f/k_r unchanged; equilibrium position unchanged.
- If student says catalyst is consumed → MC-2 repair: track catalyst through all mechanism steps; it is regenerated in the last step; write net equation to confirm cancellation.
- If student expects linear rate increase from Ea reduction → MC-3 repair: Arrhenius exponential; work the numerical example with exp(ΔEa/RT).
- Advance when student can correctly predict catalyst effects on rate, K, and equilibrium position, and can distinguish homogeneous from heterogeneous catalysis with examples.

## Voice Teaching Notes

"A catalyst changes the route, not the destination. Lower Ea: you reach equilibrium faster. The equilibrium? Identical. Draw the energy diagram every time — the reactant and product levels don't move, only the hump drops."

For enzyme kinetics: "The enzyme is a molecular jig. It holds the substrate in exactly the right position, but it is never used up. After each reaction, it releases the product and grabs a new substrate."

## Assessment Signals

**Mastery gate**:
1. Student correctly draws an energy diagram showing catalysed and uncatalysed pathways with identical ΔH and different Ea.
2. Student correctly states that K and equilibrium position are unchanged by a catalyst.
3. Student correctly applies the Arrhenius ratio to compute rate enhancement from Ea reduction.
4. Student correctly distinguishes homogeneous from heterogeneous catalysis with examples.

**FRAGILE signal**: student applies the correct Arrhenius ratio calculation but cannot explain the physical reason — they treat it as a formula without connecting Ea to the fraction of molecules that have sufficient energy.

**MISCONCEIVING signal**: student says the catalyst increases K or shifts equilibrium. Address MC-1 with the energy diagram and the Arrhenius ratio before any enzyme discussion.

## Tutor Recovery Strategy

If stuck:
1. For K unchanged: "Write ΔG° = −RT ln K. Does a catalyst change ΔG°? No — ΔG° depends on the energies of reactants and products, not on the pathway. So ln K is unchanged, and K is unchanged."
2. For Arrhenius ratio: "Write k_cat = Ae^(−Ea,cat/RT). Write k_uncat = Ae^(−Ea,uncat/RT). Divide: k_cat/k_uncat = e^(−Ea,cat/RT) / e^(−Ea,uncat/RT) = e^[(Ea,uncat − Ea,cat)/RT]. Plug in numbers."
3. For enzyme specificity: "The active site has a shape, a charge distribution, and specific functional groups. Only the substrate with the matching shape, charge, and groups can bind tightly. Other molecules either don't bind or bind too weakly to be activated."

## Memory Hooks

- **Catalyst: lowers Ea, increases rate, NOT consumed. Does NOT change K, ΔH, ΔG, equilibrium position.**
- **Homogeneous = same phase. Heterogeneous = different phase (usually solid catalyst + gas/liquid reactants).**
- **Arrhenius rate ratio = exp[(Ea,uncat − Ea,cat)/RT]. Even modest Ea reduction → enormous rate increase.**
- **Enzyme: active site + substrate specificity + not consumed. Lock-and-key (rigid) → induced-fit (flexible, better model).**
- **Catalyst speeds up approach to equilibrium; never shifts equilibrium position.**

## Transfer Connections

- **chem.surface.adsorption**: heterogeneous catalysis is the primary application of surface adsorption science — reactant molecules adsorb onto the catalyst surface, react at active sites, and desorb as products. The Langmuir adsorption isotherm describes the equilibrium between surface-bound and free-phase molecules.
- **chem.kinet.mechanism**: enzyme kinetics uses the SSA (steady-state approximation) on the enzyme-substrate complex [ES] — E + S ⇌ ES → E + P — giving the Michaelis-Menten equation rate = Vmax[S]/(Km + [S]), which is a direct application of the mechanism-analysis tools from chem.kinet.mechanism.

## Cross-Subject Connections

- **Biology (metabolism)**: virtually every metabolic reaction in living systems is enzyme-catalysed. The concept of substrate specificity, active site, Michaelis-Menten kinetics, and competitive vs. non-competitive inhibition (the molecular basis of many drugs) are biological applications of the catalysis principles from this node.
- **Environmental science (catalytic converters)**: catalytic converters in automobiles use Pt, Pd, and Rh surfaces (heterogeneous catalysis) to convert CO → CO₂, NO → N₂, and unburned hydrocarbons → CO₂ + H₂O. The three-way catalyst operates optimally near stoichiometric air-fuel ratio — a real-world constraint of heterogeneous catalysis under conditions.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.kinet.catalysis`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.kinet.catalysis` as of 2026-07-23.

## Curriculum Feedback

This node correctly unlocks chem.surface.adsorption — heterogeneous catalysis IS the primary application of surface science, so the dependency direction is appropriate. The enzyme kinetics content at the qualitative level is well-scoped: Michaelis-Menten quantitative kinetics belongs in chem.bio.enzyme-kinetics (unlocked by chem.kinet.mechanism), not here; this node correctly introduces only the qualitative lock-and-key/induced-fit picture and the saturation behaviour. The Arrhenius-based quantification of Ea reduction is the bridge connecting catalysis to the prior kinetics nodes — it is the key calculation a proficient student should be able to execute.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
