# Weak Acid and Base Equilibria — `chem.equil.weak-acid`

## Identity

- **KG ID**: chem.equil.weak-acid
- **Subject**: Chemistry
- **Domain**: Chemical Equilibrium (chem.equil)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.equil.acids-bases
- **Unlocks**: chem.equil.buffer
- **Cross-links**: none

## Learning Objective

Students can set up an ICE table and derive a Ka expression for a weak acid or Kb expression for a weak base; apply Ostwald's dilution law (including the 5% approximation check); calculate the pH of a weak acid or weak base solution of known concentration; calculate the degree of dissociation; and identify the stepwise Ka values for a polyprotic acid and explain why each successive Ka is smaller.

## Core Understanding

**Weak acid equilibrium**:
HA(aq) ⇌ H⁺(aq) + A⁻(aq)

Ka = [H⁺][A⁻] / [HA]

Ka is constant at fixed temperature. A weak acid has Ka << 1 (partial dissociation). A strong acid has effectively no equilibrium (complete dissociation, Ka "→ ∞").

**ICE table setup**:
Let initial concentration of HA = C₀ mol/L, and let x = [H⁺] at equilibrium.

|  | HA | H⁺ | A⁻ |
|--|--|--|--|
| I | C₀ | 0 | 0 |
| C | −x | +x | +x |
| E | C₀ − x | x | x |

Ka = x² / (C₀ − x)

**The 5% approximation**: if x << C₀, then C₀ − x ≈ C₀:
Ka ≈ x²/C₀ → x = √(Ka · C₀)

The approximation is valid when x/C₀ < 5% (i.e., √(Ka/C₀) < 0.05). If violated, solve the quadratic: x² + Ka·x − Ka·C₀ = 0.

**Degree of dissociation (α)**:
α = x / C₀ (dimensionless, 0 to 1; often expressed as %)
At equilibrium: Ka = C₀α² / (1 − α)

**Ostwald's dilution law**:
Ka = C₀α² / (1 − α)   [exact]
When α << 1:  Ka ≈ C₀α²  →  α = √(Ka/C₀)

Key consequence: as C₀ decreases (solution is diluted), α increases — weaker solutions are MORE dissociated (higher α), even though [H⁺] = C₀α decreases absolutely. This is a Le Chatelier outcome: dilution shifts the equilibrium right.

**pH of weak acid**:
pH = −log[H⁺] = −log(x) = −log√(Ka·C₀) = ½(pKa − log C₀) [using the approximation]

**Weak base equilibrium**:
B(aq) + H₂O(l) ⇌ BH⁺(aq) + OH⁻(aq)

Kb = [BH⁺][OH⁻] / [B]

pOH = ½(pKb − log C₀) → pH = 14 − pOH  (at 298 K)

Relationship: Ka × Kb = Kw  (for a conjugate acid-base pair) → pKa + pKb = 14 (at 298 K).

**Polyprotic acids**:
Each dissociation step has its own Ka:
H₂A ⇌ H⁺ + HA⁻    Ka1
HA⁻ ⇌ H⁺ + A²⁻    Ka2

Ka1 >> Ka2 >> Ka3 (successive removal of H⁺ from an increasingly negative ion is harder → each Ka is smaller). For most practical pH calculations, only Ka1 matters; Ka2 contribution to [H⁺] is negligible.

Example: H₂SO₄ — Ka1 is very large (essentially strong acid step); Ka2 = 0.012 (weak acid step). H₂CO₃: Ka1 = 4.3×10⁻⁷; Ka2 = 4.7×10⁻¹¹. H₃PO₄: Ka1 = 7.5×10⁻³; Ka2 = 6.2×10⁻⁸; Ka3 = 2.2×10⁻¹³.

## Mental Models

**The lazy-runner model for partial dissociation**: strong acids sprint the whole track (100% reach the product line); weak acids jog partway and stop when the reverse reaction's pace matches their forward pace — that stopping point is the equilibrium. Ka is the "stopping-distance constant." A lower Ka means the runners stop sooner (less dissociation).

**The dilution-expands-the-field model for Ostwald's law**: imagine the equilibrium as runners on a fixed-size track (fixed Ka). Dilution enlarges the track — with more space between molecules, the reverse reaction (H⁺ + A⁻ → HA) becomes less likely (reactants collide less often). So more runners sprint further (α increases) until the new equilibrium. [H⁺] still decreases on dilution because the absolute number of H⁺ per volume falls, even as the fraction dissociated rises.

## Why Students Fail

1. **x is always C₀α for every acid type**: students re-derive x = √(Ka·C₀) without checking whether the 5% rule holds, and report a falsely high pH for concentrated or moderately strong acids (Ka ≥ 10⁻³).
2. **Dilution decreases α**: students reason "more water = more dilute = less H⁺ = less dissociation." Quantitatively: α = √(Ka/C₀) — as C₀ falls, α rises. Less [H⁺] overall, but the fraction dissociated is higher.
3. **Ka2 contribution must be included for polyprotic acids**: for H₂SO₄ in particular (Ka1 ≈ ∞, Ka2 = 0.012), students include only the first step and get [H⁺] too low. For H₂CO₃ and H₃PO₄, the approximation of using only Ka1 is valid; for H₂SO₄ it is not.
4. **Conjugate base Kb from pKa**: students confuse the relationship. For the conjugate pair HA/A⁻: Ka(HA) × Kb(A⁻) = Kw. At 298 K: pKa + pKb = 14. Students sometimes add Ka + Kb = Kw (wrong) instead of multiplying.

## Misconceptions

**MC-1 — Diluting a weak acid decreases α (degree of dissociation)** (Type 1, overgeneralization from "dilution decreases concentration of everything")
- *Mechanism*: students reason that dilution reduces [H⁺], which means the acid is less dissociated. The distinction between absolute concentration and fraction dissociated is missed.
- *Diagnostic probe*: "A 0.10 M solution of acetic acid has degree of dissociation α = 1.3%. What happens to α if the solution is diluted to 0.01 M?"
- *Characteristic phrase*: "Dilution reduces [H⁺] so α decreases."
- *Repair*: α = √(Ka/C₀). Diluting (lower C₀) increases α — more of the acid molecules dissociate as a fraction, even though the absolute [H⁺] (= C₀α) decreases. This is Le Chatelier: removing H₂O is adding it to the reactant side of the dissociation (HA + H₂O ⇌ ... in the Brønsted sense), shifting equilibrium toward dissociation. At infinite dilution α → 1 (complete dissociation) for ANY weak acid, no matter how weak.

**MC-2 — Ka and Kb of a conjugate pair add to give Kw** (Type 4, notation-induced: "K_a + K_b = K_w" looks analogous to "pH + pOH = 14")
- *Mechanism*: the correct relationship pKa + pKb = 14 has the same additive form as pH + pOH = 14, which tempts students to write Ka + Kb = Kw for the non-log version.
- *Diagnostic probe*: "Acetic acid has Ka = 1.8 × 10⁻⁵. Calculate Kb for acetate ion."
- *Characteristic phrase*: "Kb(CH₃COO⁻) = Kw − Ka = 10⁻¹⁴ − 1.8×10⁻⁵ (approximately −1.8×10⁻⁵)."
- *Repair*: Ka × Kb = Kw (multiplication, not addition). Kb = Kw/Ka = (1.0×10⁻¹⁴)/(1.8×10⁻⁵) = 5.6×10⁻¹⁰. The log version pKa + pKb = 14 has the additive form because log(Ka × Kb) = log Ka + log Kb = log Kw → pKa + pKb = 14. The original relationship is multiplicative.

**MC-3 — The 5% approximation is always valid** (Type 5, instruction-induced: most textbook examples use conditions where the approximation holds, so students never check)
- *Mechanism*: students learn the shortcut x = √(Ka·C₀) and apply it universally without verifying x/C₀ < 0.05.
- *Diagnostic probe*: "Calculate [H⁺] in 0.010 M chlorous acid (HClO₂), Ka = 1.1×10⁻²."
- *Characteristic phrase*: student applies x = √(1.1×10⁻² × 0.010) = √(1.1×10⁻⁴) = 0.0105 M, then pH = 1.98 (but x/C₀ = 105% — completely invalid)."
- *Repair*: always check: x/C₀ = 0.0105/0.010 = 105% >> 5%. The approximation fails completely; solve the quadratic. x² + 0.011x − (1.1×10⁻²)(0.010) = 0. x² + 0.011x − 1.1×10⁻⁴ = 0. x = [−0.011 + √(0.000121 + 0.00044)]/2 = [−0.011 + 0.0249]/2 ≈ 0.0069 M. pH = 2.16. The approximation error would have given a concentration exceeding the initial — a physically impossible result that flags the failure immediately.

## Analogies

**The fishing-net analogy for Ka**: Ka is the size of the holes in a fishing net for H⁺. Strong acids have enormous holes — every H⁺ falls through (full dissociation). Weak acids have tiny holes — most H⁺ are caught and held (partial dissociation). Ka quantifies hole size; smaller Ka = smaller holes = more H⁺ retained = less dissociation.

**The stepstair analogy for polyprotic Ka values**: each successive ionisation step is like climbing a step that's higher than the last (successively more negative ion repels the leaving H⁺ more). Ka2 is always smaller than Ka1 because it's harder to remove H⁺ from a doubly negative ion than from a singly negative one.

## Demonstrations

**Demonstration 1 — Comparing [H⁺] for a strong vs. weak acid at the same concentration**
- Measure the conductivity of 0.1 M HCl and 0.1 M acetic acid (CH₃COOH) using a simple conductivity meter or light-bulb apparatus. HCl lights the bulb brightly (high conductivity, full dissociation, high [H⁺]); acetic acid produces a much dimmer light (partial dissociation, lower [H⁺]). Students can then measure pH with an indicator or meter to quantify the difference. Connects Ka to an observable physical difference.

## Discovery Questions

1. "Calculate the pH of 0.050 M benzoic acid (Ka = 6.3 × 10⁻⁵). Check whether the 5% approximation is valid." (Targets: x = √(6.3×10⁻⁵ × 0.050) = √(3.15×10⁻⁶) = 1.77×10⁻³ M. Check: 1.77×10⁻³/0.050 = 3.5% < 5% → approximation valid. pH = −log(1.77×10⁻³) = 2.75.)
2. "A solution of NH₃ has Kb = 1.8 × 10⁻⁵. Calculate the pH of 0.10 M NH₃. (Note: Ka(NH₄⁺) × Kb(NH₃) = Kw.)" (Targets: x = √(1.8×10⁻⁵ × 0.10) = √(1.8×10⁻⁶) = 1.34×10⁻³ M = [OH⁻]. Check: 1.34% < 5%, valid. pOH = −log(1.34×10⁻³) = 2.87. pH = 14 − 2.87 = 11.13.)
3. "For phosphoric acid, Ka1 = 7.5×10⁻³ and Ka2 = 6.2×10⁻⁸. A 0.10 M H₃PO₄ solution is prepared. (a) Calculate [H⁺] using Ka1 only. (b) Estimate the contribution of Ka2 to [H⁺] and justify why Ka2 is negligible here." (Targets: (a) x = √(7.5×10⁻³ × 0.10) = √(7.5×10⁻⁴) = 0.0274 M [H⁺]. Check: 27.4% — NOT valid; solve quadratic. x² + 7.5×10⁻³x − 7.5×10⁻⁴ = 0. x = 0.024 M. pH = 1.62. (b) For the second step: HA⁻ ⇌ H⁺ + A²⁻, Ka2 = 6.2×10⁻⁸. The second ionisation of 0.024 M H₂PO₄⁻ gives x₂ = √(6.2×10⁻⁸ × 0.024) ≈ 3.9×10⁻⁵ M — negligible compared to 0.024 M. Ka2 << Ka1 → second step contributes < 0.2% of [H⁺].)

## Teaching Sequence

1. Review from chem.equil.acids-bases: Brønsted-Lowry definition; Ka and Kb; conjugate pairs; Ka×Kb=Kw.
2. Set up the ICE table for a general weak acid HA. Derive Ka expression. Introduce the 5% approximation and its validity check. Address MC-3.
3. Calculate pH of a weak acid (Discovery Question 1). Then pOH and pH of a weak base (Discovery Question 2). Address MC-2 (Ka×Kb=Kw, not Ka+Kb).
4. Ostwald's dilution law: derive α in terms of Ka and C₀. Show α increases on dilution. Address MC-1. Numerical example.
5. Polyprotic acids: stepwise Ka values; why each is smaller. Discovery Question 3. Show that only Ka1 typically matters.

## Tutor Actions

- If student says α decreases on dilution → MC-1 repair: α = √(Ka/C₀); lower C₀ → higher α. Le Chatelier: dilution shifts dissociation equilibrium right → more fraction dissociated.
- If student adds Ka + Kb = Kw → MC-2 repair: Ka × Kb = Kw (multiplicative). pKa + pKb = 14 is the log version; the original is a product.
- If student skips the 5% check → MC-3 repair: always compute x/C₀ first; if >5%, solve the quadratic. x > C₀ is physically impossible — that flag means the approximation has catastrophically failed.
- Advance when student can set up ICE, apply (or reject) the approximation, compute pH/pOH for weak acids and bases, and correctly handle a polyprotic Ka1-only approximation.

## Voice Teaching Notes

"Before any weak acid pH: ICE table — write I, C, E, fill it, write Ka = x²/(C₀ − x), then check 5%. Every time. Don't skip the check."

"Ka times Kb equals Kw. Not plus. Times. Write it as a fraction: Kb = Kw/Ka."

## Assessment Signals

**Mastery gate**:
1. Student correctly sets up ICE table and derives Ka = x²/(C₀ − x).
2. Student applies the 5% approximation correctly, including checking validity, and solves the quadratic when required.
3. Student correctly calculates pH of a weak acid and pOH/pH of a weak base.
4. Student correctly states that Ostwald's law predicts α increases on dilution.
5. Student correctly identifies that only Ka1 matters for pH of a typical polyprotic acid solution.

**FRAGILE signal**: student correctly computes pH numerically but states "diluting the acid will make it less dissociated" — no conceptual understanding of Ostwald's dilution law.

**MISCONCEIVING signal**: student writes Ka + Kb = Kw. Address MC-2 with the derivation (Ka × Kb = Kw from the two equilibrium expressions, whose product is Kw) before any numerical Kb problem.

## Tutor Recovery Strategy

If stuck:
1. For the 5% rule failing: "Compute x using the shortcut first. Then divide x by C₀. If the fraction > 0.05, the shortcut lied to you. Toss x = √(Ka·C₀) and solve x² + Ka·x − Ka·C₀ = 0 with the quadratic formula. Take the positive root."
2. For α on dilution: "Write α = √(Ka/C₀). Point at C₀. If C₀ goes DOWN, the whole fraction inside the root goes UP. So α goes UP. Yes, [H⁺] = C₀α — as C₀ falls, even though α rises, [H⁺] still falls overall. Two things moving in opposite directions; [H⁺] always falls on dilution, but α always rises."
3. For Ka×Kb: "Write the two equilibrium expressions: Ka = [H⁺][A⁻]/[HA], Kb = [HA][OH⁻]/[A⁻]. Multiply them together: Ka×Kb = [H⁺][OH⁻] = Kw. The [HA] and [A⁻] cancel. Multiplication, always."

## Memory Hooks

- **ICE table → Ka = x²/(C₀ − x). 5% check: x/C₀ < 0.05 → use shortcut; otherwise solve quadratic.**
- **α = √(Ka/C₀). Lower C₀ → higher α. Dilution increases fraction dissociated.**
- **Ka × Kb = Kw. pKa + pKb = 14 (at 298 K). Multiplicative, not additive.**
- **Polyprotic acids: Ka1 >> Ka2 >> Ka3. Only Ka1 typically determines [H⁺].**

## Transfer Connections

- **chem.equil.buffer**: buffer action (Henderson-Hasselbalch equation pH = pKa + log([A⁻]/[HA])) is directly derived from the Ka expression derived here — this node is the quantitative prerequisite for buffers.
- **chem.equil.acids-bases**: that node established the acid-base framework (Ka, Kb, pKa, conjugate pairs); this node applies it quantitatively via ICE tables, the 5% approximation, and Ostwald's dilution law.

## Cross-Subject Connections

- **Biology (blood pH regulation)**: carbonic acid (H₂CO₃/HCO₃⁻) and phosphate buffers maintain blood pH at 7.4. Ka values for carbonic acid (Ka1 = 4.3×10⁻⁷, Ka2 = 4.7×10⁻¹¹) directly determine the buffer's effective range — this node provides the quantitative basis for that biological equilibrium.
- **Environmental science (acid rain)**: SO₂ and NO₂ dissolve in rainwater to form H₂SO₃ and HNO₃. The extent of acidification depends on Ka values; this node explains quantitatively why even a small Ka produces a significantly depressed pH at typical atmospheric concentrations.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.equil.weak-acid`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.equil.weak-acid` as of 2026-07-23.

## Curriculum Feedback

The prerequisite structure (acids-bases before weak-acid) is correct — students need Ka/Kb and conjugate pairs before ICE tables. The unlock to chem.equil.buffer is the essential downstream application: nearly every biology/biochemistry context that uses acid-base chemistry actually uses buffer chemistry, so this node's mastery is load-bearing. The polyprotic acid content (Ka1 >> Ka2) is correctly placed here rather than in a separate node — it follows naturally from the ICE table framework and the Ka inequality is the only new conceptual layer.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
