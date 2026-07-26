# Vapour Pressure of Solutions — `chem.sol.vapour-pressure`

## Identity
- **KG ID**: chem.sol.vapour-pressure
- **Subject**: Chemistry
- **Domain**: Solutions (chem.sol)
- **Prerequisites**: chem.sol.types, chem.state.liquids
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 2

## Learning Objective
State and apply Raoult's law to calculate vapour pressure lowering for ideal solutions, distinguish ideal from non-ideal behaviour using deviations from Raoult's law, and connect vapour pressure lowering to the other colligative properties as a shared root cause.

## Core Understanding
**Vapour pressure lowering** is the reduction in a liquid's equilibrium vapour pressure when a non-volatile solute is dissolved in it; it is a colligative property (depends on the NUMBER of solute particles, not their identity). **Raoult's law**: P_solution = x_solvent × P°_solvent, where x_solvent is the mole fraction of solvent and P° is the pure solvent's vapour pressure at the same temperature. Equivalently, ΔP = P° − P = x_solute × P°, where x_solute is the mole fraction of solute. **Mechanism**: solute molecules occupy surface positions that would otherwise be occupied by solvent molecules; fewer solvent molecules can escape to the vapour phase per unit time, so the equilibrium vapour pressure is lower. This is a purely entropic/surface-availability effect — the solute molecules do not chemically bind the solvent (that is a different and additional effect that can cause negative deviations). **Ideal solutions** obey Raoult's law exactly: solute–solvent interactions equal solvent–solvent and solute–solute interactions (e.g., benzene + toluene, dilute aqueous solutions of non-electrolytes like glucose). **Positive deviations** (P_solution > Raoult prediction): solute–solvent interactions WEAKER than pure-component interactions; solvent molecules escape MORE easily; observed for ethanol + water at high ethanol concentration (ethanol disrupts water H-bonding network without compensating fully). **Negative deviations** (P_solution < Raoult prediction): solute–solvent interactions STRONGER than pure-component interactions; observed for acetone + chloroform (H-bond between C=O and CHCl₃ holds solvent molecules down). **Non-volatile solute assumption**: Raoult's law as stated assumes the solute has negligible vapour pressure; for volatile solutes, the total vapour pressure is P_total = x_A P°_A + x_B P°_B (Raoult's law applied to each component — the basis of fractional distillation of ideal mixtures). **Colligative connection**: the reduction in vapour pressure is the PHYSICAL CAUSE of the other three colligative properties: boiling point elevation (B.P. of solution must be raised for its P to match atmospheric; ΔTb = Kb × m), freezing point depression (the lower vapour pressure curve intersects the solid curve at a lower temperature; ΔTf = Kf × m), and osmotic pressure (π = MRT; derived from vapour pressure equality argument across a membrane). All four share the root cause: dilution of the solvent, lowering its chemical potential.

## Mental Models
- **Surface blockade model**: imagine the liquid surface as a parking lot where solvent molecules can "escape" (evaporate). Each solute molecule parks in one spot, permanently blocking a solvent escape route. The fraction of blocked spots equals x_solute; the fraction of open spots (where solvent can escape) equals x_solvent; the vapour pressure is proportional to the fraction of open spots = x_solvent × P°.
- **Colligative property tree**: vapour pressure lowering is the TRUNK; boiling point elevation, freezing point depression, and osmotic pressure are BRANCHES growing from the same trunk. Understanding the trunk makes the branches obvious.
- **Raoult's law as a dilution rule**: if you halve the mole fraction of solvent (by adding equal moles of solute), you halve the vapour pressure. It is linear in x_solvent — a straight line from (x=0, P=0) to (x=1, P=P°).

## Why Students Fail
- Confusing mole fraction with mass fraction or molarity — Raoult's law requires mole fraction, not concentration in other units; students substitute molarity and get wrong answers.
- Not knowing which vapour pressure to lower: students ask "whose vapour pressure?" — it is ALWAYS the solvent's vapour pressure that is lowered; the solute is non-volatile (or treated as such in this context).
- Forgetting to account for electrolyte dissociation: NaCl in water produces 2 ions; the colligative effect is doubled (van 't Hoff factor i); x_solute uses total moles of particles, not formula units.

## Misconceptions
1. **"Vapour pressure lowering is caused by the solute 'holding onto' the solvent molecules chemically"** (Type 2 — perceptual intuition: it looks like the solute is trapping the solvent; in reality, the primary cause is the surface blockade / entropy effect, not chemical bonding — the bonding effect is ADDITIONAL and causes negative deviations, not the baseline lowering).
   - Probe: "Why does glucose (which doesn't hydrogen bond to water very strongly) still lower water's vapour pressure?"
   - Characteristic phrase: "solute molecules are attracted to water so it can't escape" / "the solute traps the water"
   - Intervention: use the surface blockade model; if it were purely chemical bonding, glucose (weak H-bond to water) would lower VP much less than NaCl or HCl — but per mole of particles, the VP lowering is the same. It's the OCCUPANCY of the surface that matters, not the chemistry of the interaction.

2. **"The solute's concentration in mol/L (molarity) goes into Raoult's law"** (Type 4 — notation-induced: students have used molarity for most solution calculations; Raoult's law's x_solvent notation is unfamiliar and they substitute the formula they know).
   - Probe: "Calculate the vapour pressure of a solution made by dissolving 0.5 mol glucose in 2 mol water. P° = 24 mmHg."
   - Characteristic phrase: student writes "x_solvent = 0.5/(0.5+2)" rather than "x_solvent = 2/(2+0.5)"
   - Intervention: state clearly that x_solvent + x_solute = 1; the mole fraction of the SOLVENT (2 mol water / 2.5 mol total = 0.80); P = 0.80 × 24 = 19.2 mmHg. Reinforce "whose mole fraction? — the solvent's."

3. **"Boiling point elevation and vapour pressure lowering are unrelated phenomena"** (Type 5 — instruction-induced: the four colligative properties are usually taught sequentially as separate topics; students memorise the equations without connecting them to a shared root cause).
   - Probe: "Why does dissolving salt in water both lower the vapour pressure and raise the boiling point? Are these connected?"
   - Characteristic phrase: "VP lowering is about evaporation; boiling point elevation is a different effect" / "they just happen to both depend on concentration"
   - Intervention: draw the P–T diagram; show the vapour pressure CURVE of solution shifted DOWN relative to pure water; the new curve meets the atmospheric pressure line at a HIGHER temperature — that is the boiling point elevation, directly from the same VP lowering.

## Analogies
- **Good**: Vapour pressure lowering is like a concert venue (liquid surface) where some seats are taken by non-performing guests (solute); fewer performers (solvent molecules) can reach the stage (vapour phase); the venue is proportionally quieter (lower VP).
- **Anti-analogy**: Do NOT say "the solute dissolves into the vapour as well" — for a non-volatile solute, the vapour phase is pure solvent. The solute stays entirely in the liquid.

## Demonstrations
- **Direct vapour pressure measurement**: seal two identical flasks connected to a manometer; one with pure water, one with concentrated glucose solution; show the pressure difference after equilibration at 25°C.
- **Boiling point elevation visible from VP lowering**: dissolve 5 g NaCl in 100 mL water; show that the boiling point rises by ~1°C per 0.5 mol/kg; connect this to the reduced VP needing a higher T to reach 101 kPa.
- **Deviation from Raoult's law**: mix measured volumes of ethanol + water in different proportions; measure total VP at each composition; plot against the Raoult prediction line; show positive deviation and the maximum at intermediate composition (azeotrope implication).

## Discovery Questions
1. Pure water has vapour pressure 23.8 mmHg at 25°C. You dissolve 0.5 mol sucrose in 9.5 mol water. What is the mole fraction of water? What is the new vapour pressure?
2. NaCl and glucose lower water's vapour pressure by different amounts per gram dissolved. Why? (Moles vs. grams, plus i for NaCl.)
3. If you kept lowering a solution's vapour pressure by adding more and more solute, at what point does the solution's boiling point become impossibly high? (What limits this? — at very high solute concentration, the approximations break down and the solution is no longer ideal.)
4. Two solutions — one with 1 mol glucose in 1 L water, one with 0.5 mol NaCl in 1 L water — which has the lower vapour pressure? Why?

## Teaching Sequence
1. **Recall vapour pressure from chem.state.liquids**: ask "what is vapour pressure and what happens to it when you add heat?"
2. **Establish the question**: what happens to VP when you dissolve something non-volatile in the liquid?
3. **Surface blockade model**: draw the surface, add solute dots, count available escape positions, derive proportionality to x_solvent.
4. **State Raoult's law**: P = x_solvent × P°; define each symbol explicitly; work through a numerical example (sucrose in water).
5. **Rewrite as ΔP**: ΔP = x_solute × P°; this form shows that VP lowering is proportional to the amount of SOLUTE added (colligative property established).
6. **Ideal vs. non-ideal**: draw the P vs. x_solvent graph; ideal = straight line; show positive and negative deviations with one example each.
7. **The colligative tree**: draw the P–T diagram and show that the SAME VP lowering explains boiling point elevation; foreshadow freezing point depression and osmotic pressure (covered separately).
8. **Electrolyte complication**: redo the NaCl calculation with i = 2; confirm the doubled effect.

## Tutor Actions
- **If student uses molarity in Raoult's law**: pause; ask "what units does x_solvent need?" — mole fraction; work through converting from moles to mole fraction together.
- **If student is confused about "whose" VP**: state explicitly "Raoult's law is about the SOLVENT's VP. The solute is non-volatile — it has no VP contribution in this model."
- **If student cannot connect VP lowering to boiling point elevation**: draw the P–T graph together; mark both pure water's curve and solution's curve; find where each meets the atmospheric pressure line.

## Voice Teaching Notes
- When stating Raoult's law, say it in full: "The vapour pressure of the solution equals the mole fraction of the SOLVENT times the vapour pressure of the PURE SOLVENT." Emphasise SOLVENT twice — students frequently apply x_solute by mistake.
- Use the surface blockade metaphor early and revisit it whenever a student makes the "chemical bonding" error.
- For the colligative tree: say "one cause, four effects" — repeat until the student can say it without prompting.

## Assessment Signals
- **Green**: correctly applies Raoult's law with mole fractions; calculates ΔP for both non-electrolyte and electrolyte (using i); explains the connection between VP lowering and boiling point elevation.
- **Amber**: gets the equation right but uses x_solute instead of x_solvent or uses wrong i; explains the phenomena separately without connecting them.
- **Red**: uses molarity in Raoult's law; believes the solute chemically binds the solvent as the sole mechanism; cannot calculate x_solvent.

## Tutor Recovery Strategy
- Persistent molarity/mole fraction confusion: give a simple example: "1 mol glucose in 9 mol water; what is x_solvent?" — work through it; then generalise to "x = moles of component / total moles; always mole fraction, never mol/L."
- Surface blockade not landing: use a physical analogy (parking lot, seat occupancy) and have student repeat the logic; then map it to the equation.
- Electrolyte i-factor error: ask "what particles are in solution when NaCl dissolves?" — 2 ions; "what does colligative mean?" — depends on number of particles; "so how many effective solute particles do you count?" — 2 per NaCl.

## Memory Hooks
- **P = x_solvent × P°** — "the SOLVENT's fraction gives the solution's pressure."
- **ΔP = x_solute × P°** — "the SOLUTE's fraction tells you how much you've lowered it."
- **One cause, four effects**: VP lowering → ΔTb, ΔTf, osmotic pressure.
- **Positive deviation = weaker solute–solvent forces; negative deviation = stronger** — the sign of the deviation tells you something physical about intermolecular interactions.

## Transfer Connections
- **Boiling point elevation (ΔTb = Kb × m)**: direct consequence of VP lowering; same root, same i-factor application.
- **Freezing point depression**: same P–T argument; solution VP curve crosses the solid VP curve at a lower temperature.
- **Osmotic pressure (π = iMRT)**: derived from the requirement that chemical potential of solvent is equal on both sides of a semipermeable membrane — fundamentally a VP argument.
- **Fractional distillation**: for volatile solutes (benzene + toluene), total VP = sum of partial pressures (Raoult for each component); the more volatile component is enriched in the vapour — this is the physical basis of distillation.

## Cross-Subject Connections
- **Biology**: osmotic pressure maintains cell turgor; blood plasma osmolarity (osmotic pressure maintenance) is critical for cell function; kidney concentrates urine via osmotic gradients — all rooted in VP-lowering/osmotic pressure theory.
- **Environmental science**: sea water's lower VP relative to fresh water affects evaporation rates and climate; salt spread on roads lowers the freezing point (ΔTf application).
- **Physics**: the Clausius-Clapeyron equation (from chem.state.phase-diagram) quantifies how VP changes with temperature; vapour pressure lowering shifts the entire curve down and hence changes where it intersects phase boundary lines.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.sol.vapour-pressure`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.sol.vapour-pressure` as of 2026-07-23.

## Curriculum Feedback
- This node connects naturally to a dedicated colligative-properties node that would cover boiling-point elevation, freezing-point depression, and osmotic pressure together under one colligative umbrella. If such a node exists at a higher KG level, the entry here should explicitly foreshadow it rather than partially covering those topics.
- The distinction between volatile and non-volatile solutes (affecting whether one or two Raoult terms apply) deserves its own coverage flag in the KG; currently `chem.sol.vapour-pressure` likely assumes the non-volatile case only.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
