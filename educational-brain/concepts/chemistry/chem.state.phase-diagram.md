# Phase Diagrams — `chem.state.phase-diagram`

## Identity
- **KG ID**: chem.state.phase-diagram
- **Subject**: Chemistry
- **Domain**: States of matter (chem.state)
- **Prerequisites**: chem.state.liquids, chem.state.real-gases
- **Difficulty**: proficient
- **Bloom level**: analyse
- **Estimated hours**: 2

## Learning Objective
Read and interpret a P–T phase diagram for a pure substance, locate and explain the triple point and critical point, predict phase transitions from any P–T coordinate, explain why water's solid–liquid boundary has negative slope, and apply the Clausius-Clapeyron equation qualitatively to the liquid–vapour boundary.

## Core Understanding
**Phase diagram axes**: pressure (P, y-axis) vs. temperature (T, x-axis); every point on the diagram represents a P–T condition; the diagram is divided into three regions (solid, liquid, gas) by three boundary curves. **Three boundary curves**: (1) Solid–gas (sublimation curve): below this line the substance is solid; above, gas; along the line, solid and gas coexist; this is where dry ice sublimes. (2) Liquid–gas (vaporisation curve): the vapour pressure curve; it gives the substance's VP at each temperature; the boiling point at any pressure is read directly from this curve; along the curve, liquid and gas coexist. (3) Solid–liquid (fusion curve): gives the melting/freezing point as a function of pressure; usually nearly vertical; the slope is positive for most substances (higher pressure = higher melting point) and NEGATIVE for water. **Triple point**: the single P–T coordinate where all three boundary curves meet; at the triple point, all three phases coexist in equilibrium; for water, T = 273.16 K (0.01°C), P = 611 Pa (0.006 atm). The triple point is a fixed thermodynamic invariant — it is used to define the Kelvin scale. **Critical point**: the upper end of the liquid–gas curve; beyond T_c and P_c, the distinction between liquid and gas disappears — the substance becomes a supercritical fluid, with liquid-like density but gas-like viscosity; for CO₂, T_c = 304 K (31°C), P_c = 73 atm; for water, T_c = 647 K, P_c = 218 atm. **Normal vs. standard boiling/melting points**: normal bp/mp = at 1 atm (101.325 kPa); standard bp = at 1 bar (100 kPa) — a small difference (0.325 kPa) but important for precision. **Water's anomalous fusion curve**: the solid–liquid boundary for H₂O has a NEGATIVE slope (melting point DECREASES as pressure increases — ice melts under pressure); this is because ice is LESS DENSE than liquid water (the open H-bond lattice contracts on melting, releasing volume — positive ΔV_fus → by the Clausius–Clapeyron/Clapeyron equation dP/dT = ΔH_fus / (T ΔV_fus), a positive ΔH_fus and NEGATIVE ΔV_fus → negative slope). **CO₂ phase diagram**: T_c = 31°C, so CO₂ is gas at room temperature even at moderate pressures; the triple point is at −56.6°C, 5.11 atm — CO₂ CANNOT exist as a liquid at atmospheric pressure; CO₂ sublimes directly from solid (dry ice) to gas at 1 atm, −78.5°C. **Clausius-Clapeyron equation**: d(ln P)/dT = ΔH_vap / (RT²); this is the slope of the liquid–vapour boundary; it explains why VP increases exponentially with temperature; applied to find VP at a new temperature: ln(P₂/P₁) = −ΔH_vap/R × (1/T₂ − 1/T₁). **Supercritical fluids**: properties intermediate between gas and liquid; supercritical CO₂ (scCO₂) is used as a "green" solvent (decaffeination of coffee, extraction of hops); supercritical water (scH₂O) for oxidative waste treatment.

## Mental Models
- **Phase diagram as a map**: each region is a "territory" (solid, liquid, gas); the lines are "borders"; crossing a border = phase transition; the triple point is where three borders meet; the critical point is where the liquid–gas border ends abruptly.
- **Vapour pressure curve as a pressure gauge**: the liquid–gas line tells you, at any given temperature, exactly what pressure you need to apply to keep the substance liquid (or conversely, what VP the liquid exerts at that temperature). The boiling point is where that curve reaches atmospheric pressure.
- **Water's inverted fusion slope**: picture an iceberg — it floats (ice < density of water). Squeezing the ice (higher P) favours the denser phase (liquid), so ice melts under pressure. The negative slope means "higher pressure = lower melting point" — the opposite of everything else.

## Why Students Fail
- Reading the x-axis direction incorrectly — students sometimes read temperature as increasing to the LEFT, misidentifying phases.
- Confusing the triple point (fixed invariant, unique P and T) with the normal boiling point (which is on the vapour pressure curve at P = 1 atm); they are different points on different features of the diagram.
- Not knowing why water's fusion curve slopes negatively — students accept it as a fact without the density argument, making it a fragile fact rather than understood knowledge.

## Misconceptions
1. **"The triple point is where the substance can only exist in three phases temporarily — it must quickly become one phase"** (Type 2 — perceptual intuition: the word "point" and the idea of meeting lines suggests instability; in reality, the triple point is a stable equilibrium with all three phases present simultaneously, as long as P and T are held there).
   - Probe: "If you could perfectly control temperature and pressure at water's triple point, what would you see?"
   - Characteristic phrase: "it would immediately change to one of the phases" / "you can't stay there"
   - Intervention: explain that equilibrium means the rate of conversion between phases is equal in both directions; no net change occurs; the triple point is thermodynamically stable (but it requires very precise P control — even a tiny departure takes you into one-phase territory).

2. **"Water's solid–liquid line slopes positively like all other substances"** (Type 1 — overgeneralization from the typical phase diagram drawn in textbooks, often using a "generic" substance; students then apply the same slope to water without checking).
   - Probe: "Increasing pressure on ice at 0°C causes it to...?" (students often say "stay solid" or "become more solid")
   - Characteristic phrase: "higher pressure raises the melting point" / "same as everything else"
   - Intervention: start with the observable fact (ice floats on water; density of ice < density of water); then apply Le Chatelier's principle (higher P favours the denser phase = liquid); connect to the Clapeyron equation's sign (negative ΔV → negative slope).

3. **"Beyond the critical point, the substance is neither liquid nor gas and doesn't have properties of either"** (Type 3 — language contamination: "critical" sounds like "neither this nor that, ambiguous"; in reality, supercritical fluids have BOTH liquid-like density AND gas-like low viscosity — a property combination that neither pure phase alone can match).
   - Probe: "What physical properties does supercritical CO₂ have that make it useful as a solvent?"
   - Characteristic phrase: "it's just a special gas" / "it loses all liquid properties"
   - Intervention: show a table of scCO₂ properties: density ~0.5–0.9 g/cm³ (comparable to liquid solvents); viscosity ~10⁻⁴–10⁻⁵ Pa·s (10–100× lower than liquid water); diffusivity 10–100× higher than liquid — this COMBINATION (dissolves like a liquid, flows like a gas) is what makes it useful.

## Analogies
- **Good**: A phase diagram is like a country's political map where territories (phases) are separated by borders (phase boundaries). The triple point is the capital city where all three provinces meet at a single point. The critical point is where one border simply ends — you can travel from the "gas province" to the "liquid province" without crossing a border if you go around the critical point at high enough T and P.
- **Anti-analogy**: Do NOT say "the phase diagram shows what the substance prefers" — phases are not preferences; they are determined by thermodynamics (minimum Gibbs energy at given P and T). Calling them "preferences" implies the substance "chooses," which leads to anthropomorphic reasoning errors.

## Demonstrations
- **Dry ice sublimation**: place dry ice (solid CO₂) in air at 1 atm; observe direct sublimation (no liquid puddle) — visual proof that CO₂'s triple point is above 1 atm, so the liquid phase is never accessed at atmospheric pressure.
- **Pressure cooker**: explain that water boils above 100°C in a pressure cooker because the increased pressure raises the point on the vapour pressure curve that intersects that pressure — direct phase diagram reading.
- **Supercritical CO₂ demonstration** (if available): a sealed view-cell with CO₂ showing meniscus between liquid and gas; as temperature is raised through T_c, the meniscus vanishes as the two phases become indistinguishable.

## Discovery Questions
1. At what conditions does CO₂ exist as a liquid? Why is dry ice called "dry"? (It sublimes — never passes through the liquid phase at 1 atm.)
2. Mountaineers at high altitude (low P) report that water boils at ~90°C. Which feature of the phase diagram explains this? (The liquid–gas curve at lower P corresponds to a lower boiling temperature.)
3. A figure skater glides on ice. The old explanation was that blade pressure melts the ice. Does the water phase diagram support this? (The fusion curve does slope negatively for water, so pressure can lower the melting point — but the pressure under a skate blade produces only ~0.1°C lowering; pre-melting and frictional heating are the main mechanisms.)
4. If ΔH_vap for a substance is very large, how does this affect the slope of the vapour pressure curve? (Clausius-Clapeyron: d(ln P)/dT = ΔH_vap/RT² — steeper slope, more sensitive to temperature.)

## Teaching Sequence
1. **Establish axes**: draw blank P–T axes; ask "what happens to water as you heat it at 1 atm?" — liquid → gas at 100°C; mark that point on the diagram.
2. **Draw the liquid–gas curve**: extend the boiling point concept to other pressures; explain that at each temperature, liquid has a specific VP; connect points to form the curve; note it ends at the critical point.
3. **Add the solid–liquid curve**: nearly vertical; for most substances, positive slope (high P = higher mp); mark ice's curve as negatively sloping.
4. **Add the solid–gas curve**: connects the triple point to the left; sublimation occurs along this line.
5. **Triple point**: mark the intersection; define it; give water's values; explain co-existence.
6. **Critical point**: mark the upper end of the vapour pressure curve; explain supercritical fluid properties.
7. **CO₂ phase diagram**: draw for comparison; highlight that the triple point is above 1 atm; explain dry ice sublimation.
8. **Clausius-Clapeyron** (qualitative + formula): show that the vapour pressure curve is not a straight line — VP increases exponentially with T; give the equation; apply one numerical example.

## Tutor Actions
- **If student confuses triple point and critical point**: ask "does the critical point have all three phases? Does the triple point have boundaries beyond it?" — distinguish by what each point terminates or starts.
- **If student says water's fusion slope is positive**: return to "what is the density of ice vs. liquid water?" — ice floats, ice is LESS dense; then "higher P favours the denser phase — which phase does that favour?" — liquid; "so higher P melts the ice, meaning lower melting point, negative slope."
- **If student cannot read phase from a diagram coordinate**: give coordinates (e.g., P = 2 atm, T = 50°C for water); ask "which side of each boundary line are we on?" and determine phase step-by-step.

## Voice Teaching Notes
- The three key features — triple point, critical point, and water's anomalous fusion slope — are the most exam-relevant; spend at least one question on each before moving on.
- When explaining supercritical fluids: "above the critical point, the border between liquid and gas disappears — you can cross between those two territories without any phase transition."
- For Clausius-Clapeyron: "The vapour pressure curve is steep and curves upward — it's not a straight line. This equation tells you HOW curved it is."
- Wait for students to read phase diagrams independently before confirming; reading a phase diagram is a motor skill (locating coordinates) as well as a conceptual one.

## Assessment Signals
- **Green**: correctly reads any P–T coordinate to identify phase; locates and defines triple point and critical point; explains water's negative fusion slope via density argument; reads boiling point at non-standard pressure from the curve.
- **Amber**: identifies phases in normal regions but cannot explain the critical point or negative fusion slope; reads normal boiling point correctly but not at other pressures.
- **Red**: confuses triple and critical points; says water's fusion slope is positive; cannot read the diagram at a given coordinate.

## Tutor Recovery Strategy
- Phase identification failures: go back to basics — "solid is cold and compressed; gas is hot and low pressure; liquid is in between" — then locate coordinates relative to those intuitions, then use the diagram to confirm.
- Triple vs. critical confusion: associate the critical point with disappearance of the liquid–gas meniscus (a visual event that can be described); associate the triple point with the word "triple" — three phases co-existing.
- Negative fusion slope not clicking: use the ice-floating physical demonstration as an anchor; then connect "ice floats because it's LESS dense" → "squeezing prefers the denser liquid phase" → "higher P melts ice" → negative slope.

## Memory Hooks
- **Triple point = three phases, one point** — all three coexist.
- **Critical point = the end of the line** — the liquid–gas boundary simply ends; beyond it, no distinction.
- **Water's slope is the exception** — "ice floats → slope is negative; everything else positive."
- **Dry ice is dry because CO₂ skips liquid at 1 atm** — triple point at 5 atm, above atmospheric.
- **Clausius-Clapeyron: ln(P₂/P₁) = −ΔH_vap/R × (1/T₂ − 1/T₁)** — steeper slope = higher ΔH_vap.

## Transfer Connections
- **Distillation**: reading the vapour pressure curve at a given temperature gives the composition of the vapour phase in equilibrium with a liquid mixture — the basis of fractional distillation.
- **Freeze-drying (lyophilisation)**: food or pharmaceuticals are frozen, then the pressure is lowered below the triple point; ice sublimes directly without ever becoming liquid — preserves structure (biotechnology, instant coffee).
- **Vapour pressure of solutions** (chem.sol.vapour-pressure): adding a solute shifts the vapour pressure CURVE DOWN on the P–T diagram, moving the intersections with the solid curve (→ lower fp) and the atmospheric pressure line (→ higher bp).
- **Steam engines**: the working cycle of steam turbines depends on phase changes along the vapour pressure curve — generating steam (liquid → gas at high T and P) and condensing (gas → liquid as P drops).

## Cross-Subject Connections
- **Physics**: Gibbs phase rule (F = C − P + 2, for C components and P phases) gives the number of degrees of freedom at any point on the diagram; the triple point has zero degrees of freedom (no free variables).
- **Biology**: lipid bilayer phase transitions (gel–liquid crystalline) have analogues to phase diagrams; understanding phases helps interpret membrane fluidity and lipid rafts.
- **Engineering**: supercritical fluids in industrial extraction (scCO₂ for decaffeination, hop extraction, polymer processing); steam tables used for engineering design.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.state.phase-diagram`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.state.phase-diagram` as of 2026-07-23.

## Curriculum Feedback
- The triple point is defined here as a thermodynamic invariant used to anchor the Kelvin temperature scale. The KG would benefit from a dedicated metrology/SI units cross-link, since this is one of the concrete examples in the 2019 SI redefinition.
- The Clausius-Clapeyron equation connects phase diagrams to both vapour pressure and thermodynamics (ΔH_vap). If there is a dedicated KG node for thermodynamic relationships between ΔG, ΔH, and ΔS, this concept should cross-link to it.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
