# Complex Equilibria — `chem.equil.complex-equil`

## Identity

- **KG ID**: chem.equil.complex-equil
- **Subject**: Chemistry
- **Domain**: Chemical Equilibrium (chem.equil)
- **Difficulty**: advanced
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.equil.kc-kp
- **Unlocks**: chem.coord.stability
- **Cross-links**: none

## Learning Objective

Students can write formation constant (Kf) expressions for complex ions; apply stepwise and overall formation constants; predict whether precipitation or complex formation dominates in a competition equilibrium; and solve problems involving the dissolution of a precipitate in excess ligand.

## Core Understanding

**Complex ion formation**:
A complex ion consists of a central metal ion surrounded by ligands (Lewis bases). The equilibrium for complex ion formation is described by the formation constant Kf (also called the stability constant β):

M^n+ + L ⇌ ML^n+      Kf = [ML^n+] / [M^n+][L]

Large Kf → complex ion is thermodynamically stable (equilibrium lies far to the right).

**Stepwise formation constants (K₁, K₂, ... Kₙ)**:
Each ligand addition has its own stepwise constant. For Cu²⁺ + 4NH₃ ⇌ [Cu(NH₃)₄]²⁺:
K₁: Cu²⁺ + NH₃ ⇌ [Cu(NH₃)]²⁺
K₂: [Cu(NH₃)]²⁺ + NH₃ ⇌ [Cu(NH₃)₂]²⁺
... etc.

The overall formation constant β₄ = K₁ × K₂ × K₃ × K₄
(when equilibria are added, their K values multiply — a direct consequence of the Kc multiplication rule from chem.equil.kc-kp)

**Dissociation constant Kd = 1/Kf**: the reciprocal of Kf; describes how much the complex dissociates. Smaller Kd → more stable complex.

**Competition between precipitation and complex formation**:
AgCl(s) has Ksp = 1.8 × 10⁻¹⁰. Adding excess NH₃:
AgCl(s) + 2NH₃(aq) ⇌ [Ag(NH₃)₂]⁺(aq) + Cl⁻(aq)

The net equilibrium constant = Ksp × Kf = (1.8 × 10⁻¹⁰) × (1.7 × 10⁷) = 3.1 × 10⁻³

This combined equilibrium is derived by adding:
(1) AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)  [Ksp]
(2) Ag⁺(aq) + 2NH₃(aq) ⇌ [Ag(NH₃)₂]⁺(aq)  [Kf]
Net: AgCl(s) + 2NH₃(aq) ⇌ [Ag(NH₃)₂]⁺(aq) + Cl⁻(aq)  [Ksp × Kf]

When Ksp × Kf >> 1: complex formation dominates; precipitate dissolves.
When Ksp × Kf << 1: precipitate remains; complex formation insufficient to dissolve solid.

**Rule for combining equilibria**:
- Add equations → multiply K values.
- Reverse an equation → take 1/K.
- Multiply an equation by n → raise K to the nth power.

## Mental Models

**The stability ladder model**: Kf values span enormously — from ~10³ for weak complexes to ~10⁵¹ for EDTA-metal complexes. Each rung of the ladder represents an order of magnitude in stability. The competition equilibrium is a tug-of-war between the metal's tendency to precipitate (Ksp) and its tendency to complex (Kf). Whichever force is larger in the product Ksp × Kf determines which wins.

**The "adding reactions" number trick**: when two reactions are chained together, their K values multiply. This is not a coincidence — it follows from the algebra of logarithms: ΔG°_total = ΔG°₁ + ΔG°₂, and since ΔG° = −RT ln K, ln K_total = ln K₁ + ln K₂, so K_total = K₁ × K₂. Every time you add reaction arrows, multiply K values.

## Why Students Fail

1. **Reversing an equilibrium changes K to K²**: students reverse an equation and forget that reversal requires K → 1/K, not K → −K or K².
2. **Multiplying K values when equations are reversed**: students multiply Ksp × Kf but apply this for any combination without checking the direction of each equation.
3. **Forgetting to include all ligand additions in the overall K**: students use K₁ only (single NH₃ addition) when the complex is ML₄ (four NH₃ additions), missing that the overall K = K₁ × K₂ × K₃ × K₄.
4. **Interpreting "large Kf" as meaning the complex is kinetically inert**: thermodynamic stability (large Kf) is not the same as kinetic inertness (slow dissociation). Some complexes are both stable and inert (Cr³⁺ complexes); others are stable but labile (Ni²⁺ complexes).

## Misconceptions

**MC-1 — Adding equilibria means adding K values** (Type 5, instruction-induced: students confuse adding equilibria with adding numbers)
- *Mechanism*: in mathematics, adding two equations usually adds their constants; students apply this arithmetic to equilibrium constants.
- *Diagnostic probe*: "Reaction 1 has K₁ = 3 × 10⁻⁵. Reaction 2 (the next step in a sequence) has K₂ = 7 × 10². What is the K for the overall reaction (reactions 1 + 2 added)?"
- *Characteristic phrase*: "K_overall = K₁ + K₂ = 3 × 10⁻⁵ + 7 × 10² ≈ 7 × 10²."
- *Repair*: adding reactions → MULTIPLY K values. K_overall = K₁ × K₂ = 3 × 10⁻⁵ × 7 × 10² = 2.1 × 10⁻². The source of the rule: K = e^(−ΔG°/RT); ΔG°_total = ΔG°₁ + ΔG°₂ (energies add); taking the exponential of a sum gives a product of exponentials → K_total = K₁ × K₂.

**MC-2 — Reversing an equilibrium changes K to −K** (Type 4, notation-induced: sign-flipping from ΔG° = −RT ln K)
- *Mechanism*: students know reversing a reaction changes ΔG° to −ΔG°. They apply the sign change to K instead of taking the reciprocal.
- *Diagnostic probe*: "Reaction A ⇌ B has K = 500. Write K for B ⇌ A."
- *Characteristic phrase*: "K for B ⇌ A is −500."
- *Repair*: K is always ≥ 0 (it's a ratio of concentrations). Reversing changes the sign of ΔG°: ΔG°_reverse = −ΔG°_forward. Then K_reverse = e^(−ΔG°_reverse/RT) = e^(ΔG°_forward/RT) = 1/K_forward. K_reverse = 1/500 = 0.002. Always: reverse → take reciprocal, never negate.

## Analogies

**The tug-of-war analogy**: the Ag⁺ ion is the rope between two teams — the Cl⁻ team (pulling toward precipitation, force ∝ 1/Ksp) and the NH₃ team (pulling toward complex formation, force ∝ Kf). The winning team is determined by the ratio Kf/K_dissolution = Kf × Ksp. If Kf × Ksp > 1, NH₃ wins; precipitate dissolves.

**The staircase model for stepwise constants**: each ligand addition is a step on a staircase. Each step (K₁, K₂, ...) gets slightly smaller as the metal becomes more shielded and electrostatically less attractive to new ligands. The overall K is the product of all step heights — a large number of modest steps can produce an enormous overall stability constant.

## Demonstrations

**Demonstration 1 — Dissolving AgCl in ammonia**
- Add AgNO₃ to NaCl solution: white AgCl precipitate forms. Add concentrated NH₃: precipitate dissolves as [Ag(NH₃)₂]⁺ forms. Re-acidify: precipitate reforms (H⁺ reacts with NH₃, removing ligand, pushing equilibrium back). The cycle directly demonstrates competition between precipitation and complex formation.

## Discovery Questions

1. "The overall formation constant for [Fe(SCN)₆]³⁻ is β₆ = 3.2 × 10¹⁶. Write the overall equation for its formation from Fe³⁺ and SCN⁻. What is Kd, the dissociation constant?" (Targets: Fe³⁺ + 6 SCN⁻ ⇌ [Fe(SCN)₆]³⁻; β₆ = 3.2 × 10¹⁶. Kd = 1/β₆ = 1/(3.2 × 10¹⁶) = 3.1 × 10⁻¹⁷. Very small Kd → very stable complex; barely dissociates.)
2. "Will Mg(OH)₂ (Ksp = 5.6 × 10⁻¹²) dissolve in excess EDTA⁴⁻ if Kf for [MgEDTA]²⁻ = 4.9 × 10⁸? Calculate the net K for: Mg(OH)₂(s) + EDTA⁴⁻(aq) ⇌ [MgEDTA]²⁻(aq) + 2OH⁻(aq)." (Targets: K_net = Ksp × Kf = 5.6 × 10⁻¹² × 4.9 × 10⁸ = 2.7 × 10⁻³. K_net < 1 but not negligibly small; partial dissolution occurs, but the solid won't dissolve completely unless excess EDTA is very large. Contrast with cases where K_net >> 1.)
3. "For the stepwise formation of [Cu(NH₃)₄]²⁺: K₁ = 1.9 × 10⁴, K₂ = 3.9 × 10³, K₃ = 1.0 × 10³, K₄ = 1.5 × 10². Calculate β₄." (Targets: β₄ = K₁ × K₂ × K₃ × K₄ = 1.9 × 10⁴ × 3.9 × 10³ × 1.0 × 10³ × 1.5 × 10² = 1.11 × 10¹³. The individual Ks decrease with each step — each added NH₃ finds fewer open sites and more steric/electrostatic resistance.)

## Teaching Sequence

1. Review from chem.equil.kc-kp: K expressions; combining equilibria (add → multiply K); reverse → 1/K.
2. Define complex ion, formation constant Kf. Write the equilibrium and Kf expression. Define β as the overall constant.
3. Stepwise formation: K₁, K₂, ... Kₙ. β = K₁ × K₂ × ... (direct application of the add→multiply rule). Work Discovery Question 3.
4. Competition equilibria: Ksp × Kf framework. Derive the net K for AgCl + NH₃ system. Address MC-1 (multiply, don't add). Work Discovery Question 2.
5. Address MC-2 (reversing → reciprocal, not negation) in context of dissociation constant Kd = 1/Kf. Work Discovery Question 1.
6. Stability vs. lability distinction (brief, qualitative): kinetic inertness ≠ thermodynamic stability.

## Tutor Actions

- If student adds K values when combining equilibria → MC-1 repair: adding reactions multiplies K; show the ΔG° algebra.
- If student writes K_reverse = −K_forward → MC-2 repair: K is always ≥ 0; reverse → reciprocal; 1/K.
- If student uses only K₁ for a multi-ligand complex → guide: the overall β₄ = K₁ × K₂ × K₃ × K₄; work the stepwise example.
- Advance when student can write Kf expressions, compute β from stepwise Ks, and set up competition equilibria using Ksp × Kf.

## Voice Teaching Notes

"Add reaction arrows → multiply K numbers. Every single time. Commit this before any complex equilibrium problem."

For Kd: "Kd = 1/Kf. One over. Never negative. K can never be negative — it's a ratio of concentrations."

## Assessment Signals

**Mastery gate**:
1. Student correctly writes Kf and Kd expressions for any given complex ion formation.
2. Student correctly computes β from stepwise formation constants by multiplication.
3. Student correctly computes K_net = Ksp × Kf and interprets whether precipitation or complexation dominates.
4. Student correctly derives reversed equilibrium K as 1/K.

**FRAGILE signal**: student correctly multiplies K values but cannot explain the thermodynamic basis (ΔG°_total = ΔG°₁ + ΔG°₂ → exponentials multiply).

**MISCONCEIVING signal**: student adds K values. Address MC-1 immediately with the ΔG° derivation.

## Tutor Recovery Strategy

If stuck:
1. For multiply vs. add: "K = e^(−ΔG°/RT). ΔG°_total = ΔG°₁ + ΔG°₂. K_total = e^(−(ΔG°₁+ΔG°₂)/RT) = e^(−ΔG°₁/RT) × e^(−ΔG°₂/RT) = K₁ × K₂. Adding exponents in the exponential is the same as multiplying the exponentials."
2. For competition K: "Write the Ksp dissolution step. Write the Kf complex formation step. Check they add to give the net equation. Multiply their K values. That's K_net."
3. For stepwise vs. overall: "K₁ describes adding just the first NH₃. β₄ describes adding all four NH₃ at once. If the four individual steps are a staircase, β₄ is the total height gain from bottom to top = product of all step heights."

## Memory Hooks

- **Kf (formation constant): large Kf = stable complex. Kd = 1/Kf.**
- **Stepwise: β_n = K₁ × K₂ × ... × K_n. Add equilibria → multiply Ks.**
- **Reverse equilibrium → K becomes 1/K. K is always positive.**
- **Competition: K_net = Ksp × Kf. If K_net >> 1: complex wins, precipitate dissolves.**

## Transfer Connections

- **chem.coord.stability**: this node's Kf / β framework is the quantitative foundation for coordination chemistry stability; chelate effect (EDTA's extraordinarily large β) and hard-soft acid-base theory (qualitative prediction of Kf magnitude) are the next layer.
- **chem.equil.kc-kp**: the rule "add equilibria → multiply K" used throughout this node is the direct application of the K-multiplication rule established in chem.equil.kc-kp. No new principle is introduced here; only a new application domain (complex ion formation).

## Cross-Subject Connections

- **Biology (metalloenzymes)**: enzyme cofactors like heme (Fe-porphyrin), cobalamin (Co-corrin), and zinc finger proteins are coordination complexes with specific Kf values that determine how tightly the metal is held. Selective chelation therapy (treating metal poisoning with EDTA or deferoxamine) exploits the competition equilibrium framework.
- **Analytical chemistry (EDTA titrations)**: EDTA (ethylenediaminetetraacetate) chelates virtually every divalent metal with log β typically 8–25. EDTA complexometric titrations (hardness measurement, Ca²⁺/Mg²⁺ analysis) are direct quantitative applications of the formation constant framework.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.equil.complex-equil`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.equil.complex-equil` as of 2026-07-23.

## Curriculum Feedback

This node is correctly classified as advanced/apply — competition equilibria require multi-step reasoning (dissolve Ksp → form complex Kf → multiply and interpret) that is genuinely demanding. The single unlock (chem.coord.stability) reflects the node's specialised nature as a bridge between general equilibrium and coordination chemistry. Instructors should ensure students have strong fluency with the K-multiplication rule from chem.equil.kc-kp before attempting this node; the rule is necessary but is likely not yet automatic at this stage.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
