# Heterogeneous Catalysis — `chem.surface.heterogeneous-cat`

## Identity

- **KG ID**: chem.surface.heterogeneous-cat
- **Subject**: Chemistry
- **Domain**: Surface Chemistry (chem.surface)
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.surface.adsorption, chem.kinet.mechanism
- **Unlocks**: none (terminal node)
- **Cross-links**: none

## Learning Objective

Students can describe the three-step mechanism of heterogeneous catalysis (adsorption → surface reaction → desorption); explain the role of active sites and why their geometric and electronic properties determine catalytic specificity; describe the mechanisms of catalyst poisoning and promotion; and analyse the industrial Haber process (Fe catalyst), Contact process (V₂O₅), and automotive catalytic converter as case studies integrating mechanism, kinetics, and surface adsorption.

## Core Understanding

**Mechanism of heterogeneous catalysis** (Langmuir-Hinshelwood mechanism — the most common):

1. **Adsorption of reactants onto the catalyst surface**: reactant molecules (gas or liquid) adsorb onto the solid catalyst surface at specific positions called active sites. The adsorption is chemisorption (chemical bond formed between reactant and surface atom), which weakens and activates the intramolecular bond in the reactant. This is the key activation step — chemisorption lowers the activation energy for bond-breaking within the reactant by partially breaking the bond on the surface.

2. **Surface reaction**: the adsorbed reactants (or reactant fragments) react with each other or with other species on the surface. The geometry of the active site positions reactants optimally for reaction. The surface reaction proceeds with a lower activation energy than the homogeneous gas-phase reaction because bond-breaking in the reactant is assisted by the bond-formation to the surface.

3. **Desorption of products**: products desorb from the surface, regenerating the active site for the next catalytic cycle. If products adsorb too strongly, they block the active site and slow the reaction — this is product inhibition or part of the poisoning mechanism.

Alternative mechanism: **Eley-Rideal mechanism** — one reactant adsorbs, the other reacts from the gas phase (less common).

**Active sites**:
Active sites are specific locations on the catalyst surface where catalytic activity occurs. They are determined by:
- *Geometric factors*: the spacing and arrangement of surface atoms must match the reactant's geometry for optimal adsorption (ensemble requirement). Example: N₂ dissociation on Fe requires a specific ensemble of Fe atoms for the N≡N triple bond to sit across multiple Fe atoms simultaneously.
- *Electronic factors*: the surface must form a bond with the reactant that is strong enough to chemisorb and activate it, but not so strong that the product cannot desorb. Sabatier's principle (from chem.surface.adsorption): intermediate adsorption energy is optimal — a volcano curve when reaction rate is plotted vs. adsorption energy.

**Catalyst poisoning**:
Certain substances (poisons) adsorb irreversibly or very strongly onto active sites, blocking them permanently. The catalyst is deactivated.
- Lead (Pb) in petrol poisons the Pt/Pd/Rh catalytic converter (occupies Pt active sites irreversibly) → leaded petrol was banned.
- Sulfur compounds poison Fe catalysts in the Haber process and Ni catalysts in hydrogenation → feedstock desulfurization required.
- CO poisons Pt fuel cell anodes by adsorbing too strongly onto Pt active sites.
- Mechanism: a poison has the right geometry and electronic affinity to bind to the active site but forms a bond too strong for desorption under reaction conditions.

**Catalyst promoters**:
Promoters are substances that are not catalytic themselves but increase the catalyst's activity or selectivity when added.
- Example: K₂O is added to the Fe catalyst in the Haber process — it is a structural promoter that increases the surface area of the active Fe by preventing sintering (aggregation of Fe particles at high temperature), and may electronically modify Fe's affinity for N₂.
- Al₂O₃ is another promoter in the Haber process catalyst (structural — stabilises the Fe particle dispersion).
- Electronic promoters modify the electronic structure of the surface metal atoms, tuning adsorption energies toward the Sabatier optimum.

**Industrial case studies**:

*Haber process (N₂ + 3H₂ → 2NH₃): Fe catalyst at 400–500°C, 150–300 atm*
- Rate-determining step: dissociative chemisorption of N₂ on the Fe surface (N≡N triple bond is very strong, 945 kJ/mol; chemisorption on Fe assists in breaking it).
- H₂ also chemisorbs dissociatively. Surface-adsorbed N and H atoms combine stepwise: N* + H* → NH*, NH* + H* → NH₂*, NH₂* + H* → NH₃, NH₃ desorbs.
- Promoters: K₂O (increases N₂ adsorption affinity, prevents Fe sintering), Al₂O₃ (structural support).
- Poison risk: S compounds, O₂, CO — feedstock N₂ and H₂ must be purified.

*Contact process (2SO₂ + O₂ → 2SO₃): V₂O₅ catalyst at ~450°C, 1–2 atm*
- Mechanism: V₂O₅ is reduced to V₂O₄ by SO₂ (SO₂ oxidised to SO₃; V is reduced from +5 to +4). O₂ re-oxidises V₂O₄ back to V₂O₅ (regenerating catalyst). This is a Mars-van Krevelen mechanism — the catalyst cycles through two oxidation states.
- Promoter: K₂SO₄ added to reduce the melting point of V₂O₅ (promotes liquid-phase catalysis on the surface at 450°C).

*Catalytic converter (automotive exhaust)*:
- Three-way catalyst: Pt and Pd for oxidation (CO + ½O₂ → CO₂; unburned hydrocarbons + O₂ → CO₂ + H₂O); Rh for reduction (2NO + 2CO → N₂ + 2CO₂).
- Support: γ-Al₂O₃ washcoat (high surface area ≈ 10⁴–10⁵ m²/g total) carrying dispersed Pt/Pd/Rh nanoparticles.
- Poisoned by lead and sulfur → requires unleaded, low-sulfur fuel.
- Oxygen sensor (lambda probe) feedback loop maintains near-stoichiometric air-fuel ratio for simultaneous oxidation and reduction activity (the three functions cannot all be optimal at the same air-fuel ratio).

## Mental Models

**The docking-station model for active sites**: the active site is a molecular docking station. A key (reactant molecule) must fit the lock (active site geometry) to be activated. If the key doesn't fit (wrong geometry), no reaction. If a permanent plastic plug (poison) fills the lock, no key can enter.

**The Goldilocks adsorption model (Sabatier)**: the bond between reactant and surface must be "just right." Too weak: reactant doesn't stay long enough to react (no activation). Too strong: product can't leave (active site blocked). The optimal catalyst is in the middle — the volcano peak. This is why Pt works for some reactions, Fe for N₂ activation, and Au for CO oxidation at the nanoscale.

## Why Students Fail

1. **The catalyst provides energy to the reaction**: students say the catalyst "gives energy" to reactants to overcome the activation barrier. The catalyst LOWERS Ea by providing an alternative mechanism (surface reaction pathway); it does not supply energy.
2. **Poisoning permanently deactivates the catalyst for ALL reactions**: some poisons are highly specific to particular active sites or reaction types. A catalyst may remain partially active for other reactions after one active site type is blocked.
3. **The Haber process uses a V₂O₅ catalyst**: students confuse the Haber (Fe) and Contact (V₂O₅) catalysts. Each process uses a different catalyst tuned to its specific chemistry.

## Misconceptions

**MC-1 — The catalyst provides energy to the reactants** (Type 5, instruction-induced from "the catalyst helps the reaction" casual framing)
- *Mechanism*: "helps" language suggests energy input. Students conflate "lowering Ea" (what the catalyst does) with "providing activation energy" (what a heat source does).
- *Diagnostic probe*: "Explain HOW the Fe catalyst in the Haber process makes the reaction go faster."
- *Characteristic phrase*: "The Fe catalyst gives the N₂ and H₂ molecules more energy so they can overcome the activation barrier."
- *Repair*: the Fe catalyst provides an alternative reaction pathway — one where N₂ adsorbs onto the Fe surface, and the Fe–N bond partially breaks the N≡N bond (starting the triple bond breaking at the surface). This surface pathway has a lower Ea than the gas-phase direct collision. The catalyst does not supply energy; it changes the route, making the mountain smaller. The same final products and the same ΔH are reached.

**MC-2 — Haber process uses V₂O₅ catalyst; Contact process uses Fe** (Type 5, instruction-induced: two high-profile processes studied back to back, catalyst names swapped)
- *Mechanism*: both processes are taught in the same unit; the catalyst names are not tied to any memorable chemical logic.
- *Diagnostic probe*: "Which catalyst is used in the industrial production of ammonia? Which is used in sulfuric acid manufacture?"
- *Characteristic phrase*: "V₂O₅ is used in the Haber process for ammonia."
- *Repair*: Haber = Fe (iron, for N₂ dissociation — needs a transition metal that activates the N≡N triple bond). Contact = V₂O₅ (vanadium pentoxide — works via Mars-van Krevelen redox cycling between V⁵⁺ and V⁴⁺). Memory anchor: **H**aber = **Fe** (H is the first letter; F is the next heavy consonant — tenuous, but the chemical logic works: Fe's d-electrons bind N₂ optimally). Contact = **V**₂O₅ — **V** is in the name "V for vanadium, V for variable oxidation state of vanadium."

**MC-3 — Catalyst poisoning always destroys all catalytic activity** (Type 1, overgeneralization from "poison = death = total inactivation")
- *Mechanism*: the word "poison" implies total killing. In reality, catalysts may have multiple types of active sites; some may be selectively blocked while others remain active.
- *Diagnostic probe*: "A heterogeneous catalyst is poisoned by 10% coverage of its active sites by sulfur compounds. Does it lose 10% of its activity, more than 10%, or all activity?"
- *Characteristic phrase*: "Catalyst poisoning means the catalyst is completely deactivated."
- *Repair*: the effect depends on whether the poisoned sites are randomly distributed or selectively the most active sites. If the 10% of sites poisoned are the most active ones (often true — the most reactive sites bind poisons most readily), activity loss may be >10%. But if 90% of sites remain clean, the catalyst retains substantial activity. Complete deactivation requires either all sites being poisoned or the catalyst's structural integrity being destroyed.

## Analogies

**The assembly-line analogy for the catalytic cycle**: the catalyst surface is an assembly line. Reactants arrive (adsorption), the robotic arm (active site) grasps the parts and assembles them (surface reaction), and the finished product rolls off (desorption) leaving the robotic arm free. The arm is not consumed — it is the mechanism, not the material.

**The Mars-van Krevelen sponge analogy for V₂O₅**: the vanadium catalyst is a chemical sponge. It absorbs oxygen from the lattice and uses it to oxidise SO₂ (being reduced to V⁴⁺). Then it soaks up fresh O₂ from the gas phase to refill (back to V⁵⁺). The sponge cycles between two oxidation states without being destroyed — it is regenerated by the reaction itself.

## Demonstrations

**Demonstration 1 — MnO₂ as a catalyst for H₂O₂ decomposition**
- Add manganese dioxide (MnO₂, solid) to 30% H₂O₂ solution. O₂ gas is produced rapidly (relight a glowing splint). The MnO₂ remains at the end (not consumed). Remove the MnO₂, add more H₂O₂ — rapid O₂ production resumes. Demonstrates: catalyst speeds reaction but is not consumed, can be reused. Extends to surface area effect: powdered MnO₂ vs. a single lump — powder is faster (more active sites exposed). Connects to the adsorption-based mechanism (H₂O₂ chemisorbs on MnO₂ surface).

## Discovery Questions

1. "In the Haber process, the rate-determining step is the dissociative adsorption of N₂. (a) Why is this step rate-determining? (b) How does the Fe surface assist this step? (c) Why is a temperature of 400–500°C used rather than room temperature or 1000°C?" (Targets: (a) N≡N triple bond (945 kJ/mol) is extremely strong; it is the most energy-demanding step in the sequence. (b) N₂ chemisorbs across multiple Fe surface atoms; the Fe–N bond formation partially breaks the N≡N bond (charge transferred from Fe d-orbitals into N₂ antibonding orbitals → N≡N bond weakens). (c) Too low T: rate too slow (Arrhenius, insufficient thermal energy to cross even the lowered Ea on the Fe surface). Too high T: K decreases (exothermic reaction, Le Chatelier → equilibrium shifts reverse → less NH₃ at equilibrium). Compromise ~400–450°C balances rate and yield.)
2. "In the Contact process, the mechanism involves V₂O₅ being reduced to V₂O₄ and then re-oxidised. (a) Name this mechanism type. (b) What is the oxidation state of V in V₂O₅ and in V₂O₄? (c) Write the two half-equations for the catalytic cycle." (Targets: (a) Mars-van Krevelen mechanism (catalyst cycles through oxidation states). (b) V in V₂O₅: V is +5 (confirmed: 2V + 5O×(−2) = 0 → V = +5). V in V₂O₄: V is +4. (c) Reduction step: V₂O₅ + SO₂ → V₂O₄ + SO₃ (V reduced from +5 to +4; SO₂ oxidised from +4 to +6). Oxidation step: V₂O₄ + ½O₂ → V₂O₅ (V re-oxidised from +4 to +5). Overall: SO₂ + ½O₂ → SO₃ (catalyst regenerated).)
3. "A catalytic converter requires unleaded petrol. (a) Explain how lead poisons the converter. (b) Why must the converter simultaneously oxidise CO and reduce NO? (c) Why is the lambda probe (oxygen sensor) essential to the three-way converter's function?" (Targets: (a) Pb adsorbs irreversibly onto Pt/Pd active sites (Pb has high affinity for Pt surface, forms stable Pt-Pb surface alloy or occupies sites permanently). Active sites blocked → rate falls → converter fails. (b) The three pollutants are CO (toxic, oxidised to CO₂), unburned hydrocarbons (oxidised to CO₂ + H₂O), and NO (toxic, reduced to N₂). Oxidation and reduction must both occur simultaneously. This requires a near-stoichiometric air-fuel ratio (lambda ≈ 1): too rich → excess CO/HC (not enough O₂ for oxidation); too lean → excess O₂ prevents NO reduction on Rh. (c) The lambda probe measures exhaust O₂ content and feeds back to the engine control unit to maintain lambda ≈ 1 in real time. Without it, the air-fuel ratio drifts and the three-way function degrades.)

## Teaching Sequence

1. Review from chem.surface.adsorption: physisorption vs. chemisorption; Sabatier principle; active sites concept.
2. Review from chem.kinet.mechanism: rate-determining step; elementary steps.
3. Present the three-step heterogeneous mechanism: adsorption → surface reaction → desorption. Langmuir-Hinshelwood vs. Eley-Rideal. Address MC-1 (catalyst lowers Ea, doesn't provide energy).
4. Active sites: geometric (ensemble) and electronic (Sabatier optimum) factors.
5. Catalyst poisoning and promotion. Address MC-3 (poisoning not always total). Address MC-2 (Haber=Fe, Contact=V₂O₅).
6. Haber process: rate-determining step, promoters, poisons. Work Discovery Question 1.
7. Contact process: Mars-van Krevelen mechanism. Work Discovery Question 2.
8. Catalytic converter: three-way function, Pb poisoning, lambda probe. Work Discovery Question 3.

## Tutor Actions

- If student says catalyst provides energy → MC-1 repair: catalyst provides an alternative surface pathway with lower Ea; the thermal energy still comes from the surroundings (the 400°C furnace temperature); the mountain is made smaller, not the climbers more energetic.
- If student swaps Haber/Contact catalysts → MC-2 repair: Haber = Fe (iron activates N₂ by chemisorption); Contact = V₂O₅ (vanadium cycles +5/+4).
- If student says poisoning always destroys all activity → MC-3 repair: degree of deactivation depends on fraction of active sites blocked and whether the most active sites are selectively targeted.
- Advance when student can write all three steps of the mechanism for a given reaction on a surface, explain poisoning at the molecular (active-site blocking) level, and correctly assign catalysts to the Haber and Contact processes with mechanistic justification.

## Voice Teaching Notes

"Three steps: adsorb → surface react → desorb. Every heterogeneous catalysis question starts with those three words. Apply them to whatever surface is in the question."

"Haber = Fe. Contact = V₂O₅. One memory hook: the Haber process makes H-ammonia; Fe and H start with letters near each other in the alphabet. Weaker hook: the Contact process contacts two gases on vanadium. Use whichever sticks — but never swap them."

## Assessment Signals

**Mastery gate**:
1. Student correctly describes all three steps (adsorption/surface reaction/desorption) with active-site language for a given surface reaction.
2. Student correctly identifies Fe as the Haber catalyst and V₂O₅ as the Contact catalyst, with mechanistic justification for each.
3. Student correctly explains catalyst poisoning as active-site blockage and names a specific poison for at least one industrial catalyst.
4. Student correctly explains Sabatier's principle (intermediate adsorption energy is optimal) and applies it to explain why a given metal is used for a given reaction.

**FRAGILE signal**: student correctly identifies all three mechanism steps and both industrial catalysts but cannot explain WHY Fe is used in the Haber process rather than a more reactive or less reactive metal (no Sabatier principle connection).

**MISCONCEIVING signal**: student says the catalyst provides energy to reactants. Address MC-1 with the energy-diagram comparison (same ΔH, lower Ea via different pathway) before any industrial case study.

## Tutor Recovery Strategy

If stuck:
1. For the catalyst energy misconception: "Draw two energy profiles side by side — one without catalyst (high hill), one with catalyst (lower hill, but same starting height of reactants and same ending height of products). What's the same? ΔH is identical — same thermal gap between start and finish. What's different? The hill height. The catalyst makes the hill shorter by changing the route (surface mechanism). It doesn't push the climbers up; it tunnels through the mountain."
2. For the Haber mechanism: "N₂ has a triple bond — 945 kJ/mol to break entirely. In the gas phase, H₂ and N₂ simply don't react at room temperature even though the reaction is exothermic. The Fe surface: N₂ molecule approaches, adsorbs across multiple Fe atoms (the N≡N bond sits across the Fe surface), Fe's d-electrons donate into the N₂ antibonding orbitals → N≡N bond weakens → starts to break. This chemisorption step is what the Fe provides. It's not energy — it's a new bond to the surface that partially replaces (breaks) the N≡N bond."
3. For Mars-van Krevelen: "V₂O₅ contains V⁵⁺. SO₂ arrives and steals an oxygen from V₂O₅: SO₂ + O (from lattice) → SO₃. Now V is reduced to V⁴⁺ (V₂O₄). The catalyst is partially reduced. Then O₂ from the gas restores V⁴⁺ → V⁵⁺: V₂O₄ + ½O₂ → V₂O₅. Catalyst regenerated. The vanadium cycles between +4 and +5 every catalytic cycle — it is the mechanism."

## Memory Hooks

- **Three steps: adsorption (chemisorption activates reactant) → surface reaction (lower Ea, geometric fit) → desorption (product leaves, active site free).**
- **Active site: geometric fit (ensemble) + electronic fit (Sabatier: not too strong, not too weak).**
- **Poison = strong irreversible adsorbate blocking active sites. Pb poisons Pt converter; S poisons Fe/Ni catalysts.**
- **Haber = Fe catalyst. Contact = V₂O₅ (Mars-van Krevelen redox cycling V⁵⁺ ↔ V⁴⁺).**
- **Catalyst NEVER supplies energy — it lowers Ea by providing a surface pathway. ΔH is unchanged.**

## Transfer Connections

- **chem.surface.adsorption**: this node is the applied continuation of adsorption — heterogeneous catalysis IS controlled chemisorption in service of a chemical transformation. Sabatier's principle, active sites, and physisorption vs. chemisorption from that node are all directly deployed here.
- **chem.kinet.catalysis**: the general catalyst principles (lowers Ea, not consumed, no effect on K) established in that node apply here; this node goes deeper into the molecular mechanism and industrial applications.

## Cross-Subject Connections

- **Biology (enzyme catalysis)**: enzymes are biological heterogeneous catalysts (in the sense that the active site is a specific 3D pocket, not a bulk phase). Lock-and-key / induced-fit → active site geometric/electronic fit; enzyme poisoning (inhibitors) → poison analogy; enzyme saturation → full surface coverage (Langmuir isotherm at high substrate concentration). The mechanistic parallels are direct.
- **Environmental science (catalytic converters and air quality)**: catalytic converters prevent the atmospheric conversion of NO to O₃ (photochemical smog) and reduce CO (toxic). Understanding that Pb permanently poisons converters explains the public-health rationale for unleaded fuel regulations introduced globally from the 1970s–2000s.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.surface.heterogeneous-cat`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.surface.heterogeneous-cat` as of 2026-07-23.

## Curriculum Feedback

Terminal node at advanced/analyze, appropriate — this is one of the most integrative chemistry nodes, connecting kinetics, equilibrium (Le Chatelier in Haber/Contact trade-offs), surface chemistry, and industrial chemistry. The three industrial case studies (Haber, Contact, catalytic converter) are universally expected in secondary and early tertiary chemistry curricula. The Mars-van Krevelen mechanism for V₂O₅ is specific enough to distinguish high-performing students in examinations; its inclusion at the "analyze" level is appropriate.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
