# Adsorption — `chem.surface.adsorption`

## Identity

- **KG ID**: chem.surface.adsorption
- **Subject**: Chemistry
- **Domain**: Surface Chemistry (chem.surface)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.kinet.catalysis
- **Unlocks**: chem.anal.chromatography, chem.surface.heterogeneous-cat
- **Cross-links**: none

## Learning Objective

Students can distinguish physisorption from chemisorption on the basis of forces, enthalpy, reversibility, and layers; state the Freundlich and Langmuir adsorption isotherms and identify conditions under which each applies; explain the factors affecting the extent of adsorption; and connect the adsorption framework to heterogeneous catalysis.

## Core Understanding

**Adsorption vs. absorption**:
Adsorption: accumulation of a substance (adsorbate) on the surface of a solid or liquid (adsorbent). It is a surface phenomenon.
Absorption: a substance penetrates the bulk of another substance (e.g., a gas dissolving into a liquid throughout its volume — absorption).
Adsorption = surface only. Absorption = bulk penetration.

**Physisorption (physical adsorption)**:
- Force: van der Waals forces (weak, non-specific).
- Enthalpy: low, −20 to −40 kJ/mol.
- Reversibility: highly reversible; adsorbate easily removed by lowering pressure or raising temperature.
- Layers: multilayer adsorption possible.
- Specificity: non-specific — any gas adsorbs on any solid.
- Examples: N₂ on charcoal (used in BET surface area measurement); condensation of vapours on cool surfaces.

**Chemisorption (chemical adsorption)**:
- Force: covalent or ionic bond formation between adsorbate and adsorbent surface.
- Enthalpy: high, −40 to −400+ kJ/mol.
- Reversibility: less reversible; strong bonds require high temperature or reactive treatment to break.
- Layers: monolayer only (once all active sites are occupied, no further chemisorption).
- Specificity: highly specific — depends on chemical complementarity between adsorbate and surface active sites.
- Examples: CO on Pt (catalytic converter); H₂ on Fe (Haber process step 1).

**Comparison summary**:

| Feature | Physisorption | Chemisorption |
|---------|--------------|---------------|
| Force | van der Waals | Chemical bond |
| ΔH_ads | Low (20–40 kJ/mol) | High (40–400 kJ/mol) |
| Reversibility | High | Low |
| Layers | Multi | Mono |
| Specificity | Low | High |
| Temperature effect | ↓ with ↑T | ↑ then ↓ with ↑T (activation energy) |

**Factors affecting adsorption**:
1. Nature of adsorbent: higher surface area → greater adsorption. Activated charcoal and silica gel are maximised-surface-area adsorbents.
2. Nature of adsorbate: gases with higher critical temperatures (easier to liquefy) adsorb more readily (stronger intermolecular forces → better physisorption).
3. Temperature: physisorption decreases with increasing temperature (exothermic → Le Chatelier); chemisorption may first increase (activation energy required) then decrease.
4. Pressure: at low pressure, adsorption increases with pressure; above a saturation point, it plateaus (monolayer or multilayer capacity reached).

**Freundlich adsorption isotherm** (empirical):
x/m = k × P^(1/n)   where 0 < 1/n < 1, k and n are empirical constants.
log(x/m) = log k + (1/n) log P  (linear form — plot of log(x/m) vs. log P gives slope 1/n).
Valid at intermediate pressures; fails at very low and very high pressures.
x = mass adsorbed, m = mass of adsorbent, P = equilibrium pressure.

**Langmuir adsorption isotherm** (theoretical, monolayer):
θ = bP / (1 + bP)   where θ = fraction of surface covered, b = adsorption coefficient (= k_ads/k_des).
Alternatively: P/x = 1/(x_max × b) + P/x_max (linear double-reciprocal form).
Assumptions: fixed number of adsorption sites; monolayer only; all sites identical; no lateral interactions.
At low P: θ ≈ bP (linear, Freundlich-like behaviour).
At high P: θ → 1 (saturation, all sites occupied).

**Connection to heterogeneous catalysis**:
Adsorption is the first and rate-determining step in many heterogeneous catalytic mechanisms (Langmuir-Hinshelwood model). The catalyst must adsorb reactants (chemisorption) but not so strongly that the adsorbed species cannot react and desorb. The Sabatier principle: optimal catalyst has intermediate adsorption strength — too weak → too little coverage; too strong → blocked sites, products can't desorb.

## Mental Models

**The sticky surface model for physisorption vs. chemisorption**: physisorption is like Post-it note adhesion — the adsorbate sticks via weak van der Waals forces and can be peeled off easily. Chemisorption is like superglue — the adsorbate forms a real chemical bond with the surface; removing it requires breaking that bond.

**The Langmuir seat model**: the surface has a fixed number of seats (active sites). At low pressure, few adsorbate molecules arrive — most seats are empty; coverage grows linearly with pressure. As pressure increases, seats fill up; the rate of new adsorption slows because fewer seats are available. At high pressure, all seats are taken — the isotherm flattens to θ = 1. Adding more pressure cannot add more adsorption.

## Why Students Fail

1. **Confusing adsorption with absorption**: students use the terms interchangeably. The surface vs. bulk distinction is definitional.
2. **Physisorption increases with temperature**: students expect "more energy → more adsorption." Actually, physisorption is exothermic — higher T shifts equilibrium back (Le Chatelier → desorption). Chemisorption has a more complex T-dependence (activation energy first increases coverage, then desorption wins at high T).
3. **Chemisorption allows multiple layers**: students assume chemisorption can build up layers. Only physisorption is multilayer; chemisorption is strictly monolayer (once every active site has one adsorbate molecule chemically bonded, no more chemisorption is possible).
4. **Freundlich isotherm is theoretically derived**: students treat both isotherms symmetrically. Freundlich is purely empirical — it fits data well but has no theoretical derivation; Langmuir is derived from explicit assumptions about surface sites.

## Misconceptions

**MC-1 — Adsorption and absorption are the same process** (Type 3, language contamination: both words sound similar and involve "taking up" a substance)
- *Mechanism*: students conflate the two processes because the words sound similar and both describe uptake.
- *Diagnostic probe*: "Silica gel absorbs moisture from the air. Is this correct? What is the correct term?"
- *Characteristic phrase*: "Silica gel absorbs water vapour from the air."
- *Repair*: silica gel adsorbs water — the water accumulates on the surface of the silica particles, not inside the bulk of the solid. Adsorption = surface phenomenon. Absorption = bulk phenomenon (e.g., water absorbed by a sponge penetrates the sponge's whole volume). The mnemonic: adsorption collects at the interface (like ads on a billboard — posted on the surface, not inside the wall).

**MC-2 — Physisorption increases with temperature** (Type 2, perceptual intuition: more energy = more reaction)
- *Mechanism*: students apply the general rule "higher temperature → faster reactions → more product" to adsorption without considering its exothermic nature.
- *Diagnostic probe*: "How does increasing temperature affect the extent of physisorption at constant pressure?"
- *Characteristic phrase*: "Higher temperature increases physisorption because molecules have more energy to stick."
- *Repair*: physisorption is exothermic (ΔH_ads < 0). By Le Chatelier's principle, increasing T shifts the equilibrium toward desorption → physisorption decreases with increasing T. The van der Waals forces are already effective at low T; no activation energy is needed. At higher T, the added thermal energy allows adsorbed molecules to escape back into the gas phase — the equilibrium coverage falls.

**MC-3 — Chemisorption can form multiple layers** (Type 1, overgeneralization from physisorption's multilayer capability)
- *Mechanism*: students accept multilayer adsorption as a general property of adsorption and apply it to chemisorption.
- *Diagnostic probe*: "Can chemisorption form a second layer once the first monolayer is complete?"
- *Characteristic phrase*: "If pressure is high enough, chemisorption can build multiple layers just like physisorption."
- *Repair*: chemisorption requires a specific chemical interaction between the adsorbate and the adsorbent surface (metal atoms, specific functional groups). Once all surface active sites are occupied (monolayer complete), no further chemical bonding is possible — the second layer would be interacting with the first layer of adsorbate, which has no active sites. Only physisorption (van der Waals) can stack multiple layers because van der Waals forces act between any molecules, including adsorbate-adsorbate.

## Analogies

**The bulletin-board analogy for the Langmuir isotherm**: a bulletin board has a fixed number of pins (active sites). At low message volume (low pressure), most pins are free; each new message (adsorbate) finds a pin easily — coverage grows linearly. As more messages arrive, fewer pins are free; it takes longer to find an empty pin. When all pins are taken (saturation), new messages can't be posted — the board is full regardless of how many messages arrive.

**The adsorbent as a very large carpet (surface area analogy)**: activated charcoal, when unrolled, has a surface area of ~1,000 m² per gram — nearly the area of a football pitch. The reason activated charcoal and silica gel are such effective adsorbents is not their mass but their enormous internal surface area (from millions of micropores), providing billions of adsorption sites.

## Demonstrations

**Demonstration 1 — Activated charcoal decolourisation**
- Add a few drops of potassium permanganate (purple) to water; add activated charcoal; shake and filter. The filtrate is colourless — KMnO₄ is adsorbed onto charcoal's surface. This directly shows adsorption as a surface phenomenon and motivates the surface-area concept. Students connect this to water purification and gas masks (adsorption of toxins on activated carbon).

## Discovery Questions

1. "Compare physisorption and chemisorption for the adsorption of H₂ on Ni: (a) Which type occurs at −196°C (liquid nitrogen temperature)? (b) Which type occurs at 300°C? Justify." (Targets: (a) at −196°C: physisorption dominates — very low T favours exothermic adsorption; low activation energy of physisorption; van der Waals forces effective. (b) At 300°C: chemisorption dominates (now above the activation energy for H₂ dissociation and bonding to Ni surface; the strong Ni−H bond forms); physisorption would desorb at this temperature.)
2. "The Freundlich isotherm for an adsorbent gives a log–log plot with slope 0.42 and intercept 0.70. Calculate x/m at P = 5.0 kPa. (x/m in g g⁻¹, P in kPa)" (Targets: slope = 1/n = 0.42, log k = 0.70 → k = 10^0.70 = 5.0. x/m = 5.0 × (5.0)^0.42. log(5.0) = 0.699. 0.42 × 0.699 = 0.294. x/m = 5.0 × 10^0.294 = 5.0 × 1.97 = 9.8 g g⁻¹.)
3. "Using the Langmuir isotherm, derive what x/m approaches as pressure P → ∞. What does this represent physically?" (Targets: Langmuir: θ = bP/(1 + bP). As P → ∞: θ → 1 (monolayer saturation). In terms of mass: x/m → x_max/m (the maximum adsorption at monolayer coverage). Physically: all surface active sites are occupied by one adsorbate molecule each; no further chemisorption possible.)

## Teaching Sequence

1. Review from chem.kinet.catalysis: heterogeneous catalysis; reactants adsorb on catalyst surface; Ea lowered. Set up: "What exactly happens when a molecule adsorbs? There are two types."
2. Define adsorption vs. absorption. Address MC-1. Use the billboard vs. sponge analogy.
3. Physisorption: forces, enthalpy, reversibility, multilayer, T-dependence. Address MC-2 (exothermic → decreases with T).
4. Chemisorption: forces, enthalpy, reversibility, monolayer, T-dependence. Address MC-3 (monolayer only). Build the comparison table.
5. Factors affecting adsorption: surface area, nature of gas/solid, T, P.
6. Freundlich isotherm: empirical; log-linear form; limitations. Work Discovery Question 2.
7. Langmuir isotherm: derivation from site-balance (rate_ads = rate_des at equilibrium); θ expression; low-P and high-P limits. Work Discovery Question 3.
8. Connection to heterogeneous catalysis and Sabatier principle. Work Discovery Question 1.

## Tutor Actions

- If student confuses adsorption/absorption → MC-1 repair: surface vs. bulk; silica gel on the surface, sponge through the volume.
- If student says physisorption increases with T → MC-2 repair: physisorption is exothermic; Le Chatelier: ↑T → desorption; draw the equilibrium.
- If student says chemisorption is multilayer → MC-3 repair: chemisorption requires active surface sites; monolayer exhausts all sites; second layer has no active sites to bond to.
- Advance when student can classify adsorption type, apply the log-linear Freundlich plot, and describe Langmuir saturation behaviour.

## Voice Teaching Notes

"Adsorption: say the 'd' — it's different from absorption. Surface phenomenon. Not bulk." Say this distinction explicitly before any adsorption question.

"Physisorption: cold is better (exothermic). Chemisorption: needs some heat to activate (activation energy), but too hot and it desorbs again. The volcano-shaped chemisorption vs. T curve."

## Assessment Signals

**Mastery gate**:
1. Student correctly distinguishes physisorption and chemisorption on all five criteria (force, ΔH, reversibility, layers, specificity).
2. Student correctly applies the Freundlich log-linear form to extract k and 1/n and calculate x/m.
3. Student correctly describes Langmuir saturation behaviour and its physical meaning (monolayer capacity).
4. Student correctly predicts the effect of temperature on each type of adsorption.

**FRAGILE signal**: student correctly classifies examples but cannot explain WHY physisorption is multilayer and chemisorption is monolayer (no connection to active site exhaustion vs. van der Waals stacking).

**MISCONCEIVING signal**: student says adsorption and absorption are the same. Address MC-1 with the surface vs. bulk distinction before any isotherm discussion.

## Tutor Recovery Strategy

If stuck:
1. For physisorption T-dependence: "Physisorption: adsorbate + adsorbent → adsorbed complex + heat (exothermic). Le Chatelier: add heat (increase T) → system shifts away from heat → shifts toward desorption → less adsorption. At higher T, the thermal energy kicks molecules back into the gas phase."
2. For chemisorption monolayer: "Draw a metal surface as a grid of atoms (active sites). Each site can chemically bond to exactly one adsorbate molecule. Once every site has one molecule: every site is occupied. No more chemisorption is possible — the second layer would interact with the first-layer molecules, not with the metal surface. No chemical bond."
3. For Langmuir derivation: "At equilibrium: rate of adsorption = rate of desorption. Rate of adsorption = k_ads × P × (1 − θ) [proportional to empty fraction]. Rate of desorption = k_des × θ [proportional to occupied fraction]. Set equal: k_ads P(1−θ) = k_des θ. Solve for θ: θ = k_ads P / (k_des + k_ads P) = bP/(1 + bP) where b = k_ads/k_des."

## Memory Hooks

- **Adsorption = surface. Absorption = bulk. "Ad" = added to surface.**
- **Physisorption: van der Waals, low ΔH, reversible, multilayer, decreases with ↑T.**
- **Chemisorption: chemical bond, high ΔH, less reversible, monolayer only, complex T-dependence.**
- **Freundlich: log(x/m) = log k + (1/n)log P. Empirical.**
- **Langmuir: θ = bP/(1+bP). Monolayer saturation at high P. Theoretical.**

## Transfer Connections

- **chem.surface.heterogeneous-cat**: heterogeneous catalysis begins with chemisorption of reactants onto the catalyst surface — this node's chemisorption framework, monolayer concept, and Langmuir isotherm are the quantitative foundation for the Langmuir-Hinshelwood and Eley-Rideal mechanisms.
- **chem.anal.chromatography**: chromatographic separation depends on differential adsorption of analytes onto the stationary phase surface; the Freundlich and Langmuir isotherms describe the equilibrium partitioning that underlies all adsorption-based chromatography.

## Cross-Subject Connections

- **Physics (surface physics)**: adsorption isotherms are central to surface physics; BET (Brunauer-Emmett-Teller) theory extends Langmuir to multilayers and is the standard method for measuring surface area of solids using N₂ adsorption at −196°C (liquid nitrogen).
- **Environmental science (water treatment)**: activated charcoal filtration (adsorption of organic pollutants, toxins, chlorine) and ion exchange (adsorption/desorption of ions on resin surfaces) are the most widespread applications of surface adsorption in environmental chemistry.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.surface.adsorption`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.surface.adsorption` as of 2026-07-23.

## Curriculum Feedback

The two unlocks (chromatography, heterogeneous-cat) correctly reflect the dual application directions of adsorption science. The proficient/understand classification is appropriate — students must understand the physical picture (surface vs. bulk, active sites, monolayer vs. multilayer) and the two isotherm frameworks without necessarily deriving them from first principles. The Freundlich/Langmuir contrast is a frequent exam topic; both isotherms should be presented with their linear plotting forms (log-log for Freundlich; double-reciprocal for Langmuir) to enable graphical determination of parameters.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
