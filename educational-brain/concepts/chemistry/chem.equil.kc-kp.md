# Equilibrium Constants Kc and Kp — `chem.equil.kc-kp`

## Identity

- **KG ID**: chem.equil.kc-kp
- **Subject**: Chemistry
- **Domain**: Chemical Equilibrium (chem.equil)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.equil.concept
- **Unlocks**: chem.equil.nernst, chem.equil.complex-equil, chem.equil.le-chatelier, chem.equil.solubility
- **Cross-links**: none

## Learning Objective

Students can write correct Kc and Kp expressions for homogeneous and heterogeneous equilibria; apply the Kp = Kc(RT)^Δn relationship; exclude pure solids and liquids from equilibrium expressions; solve ICE table problems to find equilibrium concentrations and K values; and use K to predict the direction of reaction from a given Q.

## Core Understanding

**Equilibrium constant Kc**:
For the general equilibrium aA + bB ⇌ cC + dD (all in solution or gas phase):
Kc = [C]^c[D]^d / [A]^a[B]^b

The exponents are the stoichiometric coefficients from the balanced equation. Kc is dimensionless in the thermodynamic convention (activities replace concentrations) but in introductory chemistry is written with molar concentration units implicit.

**Equilibrium constant Kp**:
For gas-phase equilibria, partial pressures replace concentrations:
Kp = P_C^c × P_D^d / (P_A^a × P_B^b)

Relationship between Kp and Kc: Kp = Kc(RT)^Δn
where Δn = (moles of gaseous products) − (moles of gaseous reactants) and R = 0.08206 L·atm·mol⁻¹·K⁻¹ when pressures are in atm.

If Δn = 0: Kp = Kc. If Δn > 0: Kp > Kc. If Δn < 0: Kp < Kc.

**Heterogeneous equilibria** — pure solids and pure liquids are excluded:
Their activities are defined as 1 (pure substance at standard state); including them would make K dependent on the amount of solid/liquid present, which it is not. Example:
CaCO₃(s) ⇌ CaO(s) + CO₂(g)  →  Kp = P_{CO₂}  (neither solid appears)

Common examples where exclusions matter:
- Ksp (solubility product): only dissolved ions, not the undissolved solid.
- Kw: water excluded from its own dissociation expression (pure liquid).

**ICE tables** (Initial-Change-Equilibrium):
Systematic method to find equilibrium concentrations when K is known or to find K from equilibrium data.
1. Write the balanced equation.
2. Set up Initial, Change, Equilibrium rows.
3. Define x as the change in one species (sign from stoichiometry).
4. Substitute equilibrium expressions into the K expression.
5. Solve for x (sometimes quadratic; sometimes the small-x approximation is valid: x << [A]₀ when K << 1).

**Using K to predict direction**:
Calculate Q (reaction quotient) using current concentrations (same expression as K but at non-equilibrium conditions).
- Q < K: reaction proceeds forward (products favoured).
- Q > K: reaction proceeds in reverse (reactants favoured).
- Q = K: system is at equilibrium.

**Magnitude of K and reaction extent**:
- K >> 1 (say K > 10³): products strongly favoured; reaction goes nearly to completion.
- K << 1 (say K < 10⁻³): reactants strongly favoured; very little product forms at equilibrium.
- K ≈ 1: neither side is strongly favoured; significant concentrations of both reactants and products at equilibrium.

## Mental Models

**The K-as-a-ratio-of-rates model**: at equilibrium, forward rate = reverse rate. K equals the ratio k_forward/k_reverse (from the Arrhenius kinetics of each elementary step). K is a kinetic ratio frozen in thermodynamic form — it tells how far the system would have to go to balance rates.

**The ICE table as a ledger**: each column of the ICE table is like a bank account for one species. The Change row records deposits (+) and withdrawals (−) constrained by stoichiometry — if you withdraw 2x mol/L of A, you must withdraw x mol/L of B and deposit x mol/L of C for A + ½B ⇌ ½C... (adjust by exact ratios). The Equilibrium row is the closing balance.

## Why Students Fail

1. **Writing Kc from the equation as written without raising to stoichiometric powers**: students write Kc = [C][D]/[A][B] for 2A + B ⇌ 3C + D instead of [C]³[D]/[A]²[B].
2. **Including pure solids or liquids in Kc/Kp**: students include [CaCO₃] or [H₂O(l)] because they appear in the balanced equation — forgetting the exclusion rule.
3. **Confusing Kc and Kp when Δn = 0**: students assume Kc = Kp always, missing that this equality holds only when Δn = 0.
4. **Using the wrong sign for Δn in Kp = Kc(RT)^Δn**: students count total moles rather than net gas-phase change; for CaCO₃(s) ⇌ CaO(s) + CO₂(g), Δn = 1 (one mole of gas produced, solids don't count).

## Misconceptions

**MC-1 — Stoichiometric coefficients appear as multipliers, not exponents** (Type 5, instruction-induced from balanced equation writing)
- *Mechanism*: students are used to reading coefficients as multipliers in stoichiometric calculations; they carry this habit into K expressions.
- *Diagnostic probe*: "Write Kc for 2SO₂(g) + O₂(g) ⇌ 2SO₃(g)."
- *Characteristic phrase*: "Kc = 2[SO₃] / (2[SO₂] × [O₂])" or "Kc = [SO₃]² / (2[SO₂]² × [O₂])."
- *Repair*: the coefficient becomes an exponent in K. The balanced equation 2SO₂ + O₂ ⇌ 2SO₃ gives Kc = [SO₃]²/([SO₂]²[O₂]). The factor of 2 in front of SO₂ and SO₃ becomes the power 2 in the K expression — never a multiplier in front of [SO₃].

**MC-2 — Pure solids and liquids must appear in Kc/Kp** (Type 5, instruction-induced from always using balanced equation species)
- *Mechanism*: students learn "write equilibrium expression from the balanced equation" and include every species that appears.
- *Diagnostic probe*: "Write Kp for CaCO₃(s) ⇌ CaO(s) + CO₂(g)."
- *Characteristic phrase*: "Kp = [CaO][CO₂] / [CaCO₃]" or "Kp = P_{CaO} × P_{CO₂} / P_{CaCO₃}."
- *Repair*: the activity of a pure solid or pure liquid is 1 by definition (it doesn't change as long as some solid/liquid is present). Including it would make K vary with the amount of solid present — which it doesn't. Rule: exclude all (s) and (l) from K expressions. Kp = P_{CO₂} only.

**MC-3 — Kp always equals Kc** (Type 1, overgeneralization from the special case Δn = 0)
- *Mechanism*: students often first encounter examples where Δn = 0 and remember "Kp = Kc"; they apply this universally.
- *Diagnostic probe*: "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), calculate Kp if Kc = 977 at 298 K."
- *Characteristic phrase*: "Kp = Kc = 977."
- *Repair*: Δn = 2 − (1 + 3) = −2. Kp = Kc(RT)^Δn = 977 × (0.08206 × 298)^(−2) = 977 / (24.45)² = 977 / 597.8 ≈ 1.63. Kp < Kc because more moles of gas are on the reactant side (Δn < 0) — high pressure favours the product side (Le Chatelier), so products achieve the same equilibrium at lower partial pressure, making Kp smaller.

## Analogies

**The recipe-scaling analogy for stoichiometric exponents**: if a recipe requires 2 eggs and 1 cup of flour to make 3 cookies, the K ratio uses the "recipe amounts" as powers, not multipliers — K = [cookies]³ / ([eggs]² × [flour]¹), not K = 3[cookies] / (2[eggs] × [flour]).

**The solid-sugar analogy for heterogeneous equilibria**: saturating a solution with sugar — the dissolution K depends only on the dissolved sugar concentration, not on how many lumps of solid are in the beaker. Adding more lumps doesn't change K; it changes only how long until equilibrium. This is exactly why [solid sugar] doesn't appear in Ksp.

## Demonstrations

**Demonstration 1 — ICE table with the Haber process**
- Use N₂ + 3H₂ ⇌ 2NH₃. Given [N₂]₀ = 0.500 M, [H₂]₀ = 0.800 M, [NH₃]₀ = 0 M and Kc = 977 at 298 K. Students set up the ICE table, write Kc = [NH₃]²/([N₂][H₂]³), and solve for x. The quadratic (or numerical) solution makes the ICE method concrete and tests whether students raise [NH₃] to the second power.

## Discovery Questions

1. "Write Kc and Kp for the equilibrium: PCl₅(g) ⇌ PCl₃(g) + Cl₂(g). Calculate Kp if Kc = 0.041 at 250°C." (Targets: Kc = [PCl₃][Cl₂]/[PCl₅]; Δn = 2 − 1 = 1; T = 523 K; Kp = 0.041 × (0.08206 × 523)^1 = 0.041 × 42.9 = 1.76.)
2. "For 2NO₂(g) ⇌ N₂O₄(g), at equilibrium [NO₂] = 0.0200 M and [N₂O₄] = 0.500 M. (a) Calculate Kc. (b) If a mixture contains [NO₂] = 0.050 M and [N₂O₄] = 0.800 M, predict the direction the reaction proceeds." (Targets: (a) Kc = [N₂O₄]/[NO₂]² = 0.500/(0.0200)² = 1250. (b) Q = 0.800/(0.050)² = 320. Q < K → forward (towards N₂O₄).)
3. "Write the Kc expression for the dissolution equilibrium: Fe(OH)₃(s) ⇌ Fe³⁺(aq) + 3 OH⁻(aq). Identify which species are excluded and why." (Targets: Ksp = [Fe³⁺][OH⁻]³. Fe(OH)₃(s) is excluded — pure solid, activity = 1. Water is a solvent (treated as pure liquid at dilute concentrations), activity = 1.)

## Teaching Sequence

1. Review from chem.equil.concept: dynamic equilibrium; Q vs K; ΔG = 0 at equilibrium. Set up: "How do we express K quantitatively?"
2. Derive Kc from first principles: at equilibrium, rate_forward = rate_reverse. For elementary bimolecular A + B ⇌ C + D: k_f[A][B] = k_r[C][D] → Kc = [C][D]/[A][B] = k_f/k_r. Extend to general stoichiometry: coefficients become exponents.
3. Address MC-1 (exponents, not multipliers) with the SO₂/O₂/SO₃ probe immediately.
4. Heterogeneous equilibria: why pure solids/liquids are excluded. Address MC-2.
5. Kp: derive from Kc via ideal gas PV = nRT → P = (n/V)RT = [gas]RT. Derive Kp = Kc(RT)^Δn. Address MC-3. Work Discovery Question 1.
6. ICE tables: systematic procedure. Work Discovery Question 2 (part b shows Q < K reasoning).
7. K magnitude and reaction extent. Work Discovery Question 3.

## Tutor Actions

- If student includes solid/liquid in K expression → MC-2 repair: activity of pure phase = 1; they don't appear.
- If student writes coefficients as multipliers instead of exponents → MC-1 repair: balanced coefficient 2 before SO₂ → exponent 2 on [SO₂]; demo with SO₂/O₂ probe.
- If student equates Kp = Kc without checking Δn → MC-3 repair: compute Δn for the specific gas reaction; apply Kp = Kc(RT)^Δn.
- Advance when student can write Kc/Kp for any homogeneous or heterogeneous equilibrium, apply Kp = Kc(RT)^Δn, and solve ICE tables.

## Voice Teaching Notes

"Coefficients become exponents. Say it before you write the K expression every time — never divide by 2, never multiply by 2, only raise to the power 2." This prevents MC-1.

For heterogeneous equilibria: "Read the state symbol. If it says (s) or (l): it's gone from the K expression. Every time. No exceptions."

## Assessment Signals

**Mastery gate**:
1. Student correctly writes Kc and Kp with stoichiometric exponents for any homogeneous equilibrium.
2. Student correctly excludes pure solids and liquids from K expressions.
3. Student correctly applies Kp = Kc(RT)^Δn, including correct calculation of Δn.
4. Student correctly sets up and solves an ICE table to find equilibrium concentrations.

**FRAGILE signal**: student writes K expressions correctly but cannot explain WHY pure solids are excluded (no conceptual anchor for activity = 1).

**MISCONCEIVING signal**: student writes K = [C][D]/[A][B] for 2A + B ⇌ 2C + D (coefficients missing as exponents). Address MC-1 before any ICE table work.

## Tutor Recovery Strategy

If stuck:
1. For stoichiometric exponents: "Write the equilibrium 2A ⇌ 2B. The forward rate (elementary) is k_f[A]². The reverse rate is k_r[B]². At equilibrium k_f[A]² = k_r[B]² → K = [B]²/[A]². The coefficient 2 became the exponent 2, because the rate law for an elementary step is rate = k[reactant]^(stoichiometric coeff)."
2. For pure solid exclusion: "Write Kc for A(s) ⇌ B(aq). Does doubling the amount of A change K? No. So A's concentration can't appear in K — if it did, K would change when you add more A. The formal way: activity of pure A = 1, so it divides out. Shortcut: (s) and (l) don't appear."
3. For Kp = Kc(RT)^Δn: "Write Kp for 1 mole of gas on each side: Kp = P_B/P_A = [B]RT/[A]RT = Kc × (RT)^(1-1) = Kc. Now for 2A → B: Kp = P_B/P_A² = [B]RT/([A]RT)² = Kc/(RT). That's Kc(RT)^(1-2) = Kc(RT)^(-1). Δn = 1 − 2 = −1. ✓"

## Memory Hooks

- **Kc = [products]^stoich / [reactants]^stoich. Coefficients → exponents, NEVER multipliers.**
- **Exclude (s) and (l): activity = 1. Only (g) and (aq) appear.**
- **Kp = Kc(RT)^Δn. Δn = Σmoles gas products − Σmoles gas reactants.**
- **Q < K → forward. Q > K → reverse. Q = K → equilibrium.**
- **ICE: write Initial, Change (±x with stoichiometric ratios), Equilibrium, then substitute into K.**

## Transfer Connections

- **chem.equil.le-chatelier**: Le Chatelier's principle is the qualitative prediction tool for how equilibrium shifts when conditions change; Kc/Kp provides the quantitative underpinning — the equilibrium constant itself doesn't change (at fixed T), only Q changes until Q = K again.
- **chem.equil.complex-equil**: multi-equilibria (coupled equilibria, simultaneous equilibria) use the same Kc/Kp expressions, adding the rule that when equilibria are added, their K values multiply; when reversed, K becomes 1/K.

## Cross-Subject Connections

- **Physics (statistical mechanics)**: K is a ratio of partition functions at the quantum statistical level — molecules at equilibrium distribute among energy states such that the chemical potential of products equals that of reactants. K = exp(−ΔG°/RT) is the bridge from macroscopic thermodynamics to this statistical picture.
- **Mathematics (logarithms and exponentials)**: ΔG° = −RT ln K; ln K = −ΔG°/RT; K = e^(−ΔG°/RT). Facility with logarithms and exponentials is required for computing K from ΔG° and vice versa.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.equil.kc-kp`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.equil.kc-kp` as of 2026-07-23.

## Curriculum Feedback

The four unlocks (nernst, complex-equil, le-chatelier, solubility) are well-sequenced: this node provides the mathematical foundation all four require. The ICE table is a cross-cutting skill that appears in every downstream equilibrium calculation — it deserves more drill time than typical 4-hour nodes allow, and teachers should plan supplementary practice problems. The heterogeneous equilibria rule (exclude solids/liquids) is the most frequently lost detail on assessments; it should be revisited at every downstream concept that involves Ksp or Kw.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
