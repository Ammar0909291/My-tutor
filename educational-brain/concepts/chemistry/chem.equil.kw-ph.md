# Water Equilibrium and pH — `chem.equil.kw-ph`

## Identity

- **KG ID**: chem.equil.kw-ph
- **Subject**: Chemistry
- **Domain**: Chemical Equilibrium (chem.equil)
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.equil.concept, chem.found.concentration
- **Unlocks**: chem.equil.acids-bases
- **Cross-links**: none

## Learning Objective

Students can write the Kw expression and state its value at 298 K; calculate [H⁺] and [OH⁻] from Kw; define pH and pOH and apply the relationship pH + pOH = 14 at 298 K; calculate pH for strong acid and strong base solutions; identify neutrality, acidity, and basicity from pH; and recognise that neutrality means [H⁺] = [OH⁻], not pH = 7 at all temperatures.

## Core Understanding

**Autoionisation of water**:
H₂O(l) ⇌ H⁺(aq) + OH⁻(aq)

Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 298 K (25°C)

Water is excluded from Kw (pure liquid, activity = 1). Kw is temperature-dependent — it increases with temperature (water autoionises more at higher T). At 37°C (body temperature), Kw ≈ 2.4 × 10⁻¹⁴, giving a neutral pH of about 6.8, not 7.

**pH and pOH definitions**:
pH = −log₁₀[H⁺]
pOH = −log₁₀[OH⁻]
At 298 K: pH + pOH = −log(Kw) = −log(10⁻¹⁴) = 14

**Neutral, acidic, basic conditions at 298 K**:
- Neutral: [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M → pH = 7
- Acidic: [H⁺] > [OH⁻] → pH < 7
- Basic: [H⁺] < [OH⁻] → pH > 7

At temperatures other than 298 K, neutrality is still [H⁺] = [OH⁻], but this does NOT correspond to pH = 7.

**Strong acids and bases**:
Strong acids (HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄ — first proton) dissociate COMPLETELY:
HCl → H⁺ + Cl⁻ (not ⇌, but →)
[H⁺] = [acid] (for monoprotic strong acids)

Strong bases (NaOH, KOH, Ba(OH)₂) dissociate completely:
NaOH → Na⁺ + OH⁻
[OH⁻] = [base] (for mono-basic strong bases); then [H⁺] = Kw/[OH⁻]

**pH calculations**:
- Given [H⁺]: pH = −log[H⁺]
- Given [OH⁻]: pOH = −log[OH⁻]; pH = 14 − pOH (at 298 K)
- Given [strong acid]: [H⁺] = [acid]; pH = −log[acid]
- Given [strong base]: [OH⁻] = [base]; pH = 14 + log[base] (at 298 K)

Note: the contribution of water's autoionisation to [H⁺] is negligible for [acid] or [base] >> 10⁻⁷ M, which is almost all practical cases.

**Finding [H⁺] from pH**: [H⁺] = 10^(−pH) (antilog operation, not division by pH).

## Mental Models

**The see-saw model for Kw**: [H⁺] and [OH⁻] are on a see-saw balanced at [H⁺][OH⁻] = 10⁻¹⁴. Push [H⁺] up (add acid) and [OH⁻] must fall. Push [OH⁻] up (add base) and [H⁺] must fall. The product is always 10⁻¹⁴ at 298 K — the see-saw always balances.

**The negative-log compression model**: pH compresses a 14-order-of-magnitude range ([H⁺] from ~10 M to ~10⁻¹⁴ M) onto a scale of roughly −1 to 14. Each unit change in pH = a tenfold change in [H⁺]. pH 3 is 10× more acidic than pH 4, and 100× more acidic than pH 5. The log scale is not intuitive and must be explicitly named.

## Why Students Fail

1. **pH = 7 means neutral in all conditions**: the most common error. At any temperature other than 25°C, the neutral pH is not 7. This also leads to errors in body-fluid pH problems.
2. **Strong acid concentration equals [H⁺] but students still write an equilibrium**: students write HCl ⇌ H⁺ + Cl⁻ with an equilibrium constant, not recognising that "strong" means complete dissociation.
3. **pH + pOH = 14 at all temperatures**: this equality holds only at 298 K. At 37°C, pH + pOH = pKw ≈ 13.62.
4. **Calculating [H⁺] from pH by dividing 10 by pH or doing 10 × pH**: students don't correctly apply the antilog: [H⁺] = 10^(−pH).

## Misconceptions

**MC-1 — pH = 7 always means neutral** (Type 1, overgeneralization from the 298 K special case)
- *Mechanism*: students learn "pH 7 = neutral" in the 25°C context and apply it universally; body temperature problems (37°C) expose this error.
- *Diagnostic probe*: "At 37°C, Kw = 2.4 × 10⁻¹⁴. What is the neutral pH at body temperature?"
- *Characteristic phrase*: "Neutral always means pH = 7."
- *Repair*: neutral means [H⁺] = [OH⁻]. From Kw = [H⁺]² at neutrality: [H⁺] = √(2.4 × 10⁻¹⁴) = 1.55 × 10⁻⁷ M; pH = −log(1.55 × 10⁻⁷) = 6.81. At 37°C, neutral pH is 6.81, not 7. A blood pH of 7.4 is basic relative to neutral body temperature — not acidic, not even "slightly basic from a pH = 7 reference" as some texts imply.

**MC-2 — Strong acid pH uses partial dissociation** (Type 5, instruction-induced: students treat all acids as weak by default)
- *Mechanism*: students see the ⇌ symbol and assume every acid dissociation is partial; they write K expressions for HCl.
- *Diagnostic probe*: "Calculate the pH of 0.050 M HCl."
- *Characteristic phrase*: "Let x = [H⁺]. HCl ⇌ H⁺ + Cl⁻. K_a = x²/(0.050 − x). Solve for x."
- *Repair*: HCl is a strong acid — complete dissociation. [H⁺] = 0.050 M directly. pH = −log(0.050) = 1.30. No equilibrium calculation needed. The distinction: strong acid → use [H⁺] = [acid]; weak acid → ICE table with Ka. Memorise the 6 common strong acids.

**MC-3 — [H⁺] from pH by arithmetic, not antilog** (Type 4, notation-induced)
- *Mechanism*: students see pH = −log[H⁺] and try to "undo" it arithmetically (10/pH, or 10 − pH) instead of applying the antilog.
- *Diagnostic probe*: "The pH of a solution is 3.40. Calculate [H⁺]."
- *Characteristic phrase*: "[H⁺] = 10 − 3.40 = 6.60" or "[H⁺] = 10/3.40."
- *Repair*: pH = −log[H⁺] means log[H⁺] = −pH. To undo a log, take the antilog (10^x): [H⁺] = 10^(−pH). For pH = 3.40: [H⁺] = 10^(−3.40) = 3.98 × 10⁻⁴ M. Key: the operation that undoes log is 10^, not subtraction or division.

## Analogies

**The Richter-scale analogy for pH**: the Richter scale for earthquakes works the same way as pH — base-10 logarithm, each unit represents a tenfold difference. An earthquake of magnitude 6 is 10× stronger than magnitude 5. Similarly, pH 3 solution is 10× more acidic (10× higher [H⁺]) than pH 4. The log scale compresses huge ranges into small numbers; "only one unit difference" masks a factor of 10.

**The see-saw for Kw** (see Mental Models above): the product is fixed; raising one side necessarily lowers the other.

## Demonstrations

**Demonstration 1 — pH meter measurements across a concentration series**
- Measure pH of 1.0 M, 0.10 M, 0.010 M, 0.0010 M HCl solutions. Expected pH values: 0, 1, 2, 3. Students observe the log relationship directly — each 10-fold dilution raises pH by exactly 1 unit. This anchors the logarithmic compression model concretely before any calculation.

## Discovery Questions

1. "Calculate [H⁺] and [OH⁻] in a 0.025 M NaOH solution at 298 K. What is the pH?" (Targets: NaOH is a strong base, complete dissociation: [OH⁻] = 0.025 M. [H⁺] = Kw/[OH⁻] = 1.0 × 10⁻¹⁴ / 0.025 = 4.0 × 10⁻¹³ M. pH = −log(4.0 × 10⁻¹³) = 12.40. Alternatively: pOH = −log(0.025) = 1.60; pH = 14 − 1.60 = 12.40.)
2. "A solution has pH = 5.25. Calculate [H⁺] and determine whether the solution is acidic, basic, or neutral." (Targets: [H⁺] = 10^(−5.25) = 5.62 × 10⁻⁶ M. pH < 7 → acidic. [OH⁻] = Kw/[H⁺] = 1.0 × 10⁻¹⁴ / 5.62 × 10⁻⁶ = 1.78 × 10⁻⁹ M. [H⁺] > [OH⁻] confirms acidic.)
3. "At 60°C, Kw = 9.6 × 10⁻¹⁴. (a) What is the neutral pH at 60°C? (b) Is a solution with pH = 7.0 at 60°C acidic, basic, or neutral?" (Targets: (a) neutral [H⁺] = √(9.6 × 10⁻¹⁴) = 3.10 × 10⁻⁷ M; pH = 6.51. (b) pH = 7.0 > 6.51 (the neutral value) → the solution is BASIC at 60°C, even though pH > 7.)

## Teaching Sequence

1. Review from chem.equil.concept: Kc expression; why pure liquids excluded. Review concentration units from chem.found.concentration.
2. Autoionisation of water: write the equilibrium; derive Kw = [H⁺][OH⁻] = 10⁻¹⁴. Emphasise H₂O excluded.
3. Define pH = −log[H⁺]; compute for [H⁺] = 10⁻⁷, 10⁻³, 10⁻¹¹. Connect to neutral/acid/base at 298 K. Discuss the tenfold-per-unit rule.
4. pOH = −log[OH⁻]; derive pH + pOH = 14. Work Discovery Question 1.
5. Strong acids/bases — complete dissociation. Address MC-2. Calculate pH of HCl and NaOH solutions directly.
6. Address MC-3 — antilog operation: [H⁺] = 10^(−pH). Work Discovery Question 2.
7. Temperature dependence: Kw changes → neutral pH changes. Address MC-1. Work Discovery Question 3.

## Tutor Actions

- If student says pH = 7 is always neutral → MC-1 repair: neutral = [H⁺] = [OH⁻]; show Kw at 37°C/60°C gives neutral pH ≠ 7.
- If student writes Ka expression for HCl → MC-2 repair: HCl is strong → complete dissociation → [H⁺] = [HCl]₀ directly.
- If student computes [H⁺] by subtraction or division from pH → MC-3 repair: inverse of log is 10^; [H⁺] = 10^(−pH); work the antilog step explicitly.
- Advance when student can calculate pH for both strong acids and bases, correctly compute [H⁺] from pH, and state that neutrality is [H⁺] = [OH⁻] (not pH = 7).

## Voice Teaching Notes

"pH = −log[H⁺]. To go back: [H⁺] = ten to the negative pH. Say it: ten to the negative pH. Not ten minus pH. Not ten divided by pH." The explicit verbal formula prevents MC-3.

For temperature dependence: "Neutral means equal, not seven. Equal concentrations of H⁺ and OH⁻. Seven is just what that happens to be at 25 degrees."

## Assessment Signals

**Mastery gate**:
1. Student correctly writes Kw = [H⁺][OH⁻] = 10⁻¹⁴ and knows H₂O is excluded.
2. Student correctly calculates pH and pOH for strong acid/base solutions.
3. Student correctly applies [H⁺] = 10^(−pH) to recover concentration from pH.
4. Student correctly identifies neutral pH at non-standard temperatures using Kw.

**FRAGILE signal**: student can perform pH calculations but explains neutrality as "pH = 7" with no reference to [H⁺] = [OH⁻] — the definition is absent, only the special case memorised.

**MISCONCEIVING signal**: student writes HCl ⇌ H⁺ + Cl⁻ with Ka. Address MC-2 immediately with the strong acid list before any acid/base calculation.

## Tutor Recovery Strategy

If stuck:
1. For Kw: "Water ionises: H₂O → H⁺ + OH⁻. The equilibrium constant includes only (aq) species. Kw = [H⁺][OH⁻]. Measure shows Kw = 10⁻¹⁴ at 25°C. At 25°C for pure water: [H⁺] = [OH⁻] = √(10⁻¹⁴) = 10⁻⁷ M. pH = 7."
2. For antilog: "log(x) = −3.40. Raise 10 to both sides: 10^(log x) = 10^(−3.40). But 10^(log x) = x. So x = 10^(−3.40). On a calculator: type 10, press the x^y key, type −3.40, press enter."
3. For strong acids: "The six strong acids: HCl, HBr, HI, HNO₃, H₂SO₄ (first H only), HClO₄. For these: one arrow, not equilibrium arrows. If the acid is in this list, [H⁺] = [acid]. If not in this list, you need Ka."

## Memory Hooks

- **Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 298 K. Neutral: [H⁺] = [OH⁻] = 10⁻⁷ M → pH = 7 (at 298 K ONLY).**
- **pH = −log[H⁺]. [H⁺] = 10^(−pH). pOH = −log[OH⁻]. pH + pOH = 14 (at 298 K).**
- **Strong acids/bases: COMPLETE dissociation. [H⁺] = [acid]. [OH⁻] = [base]. No Ka/Kb needed.**
- **Neutral ≠ pH 7 at all temperatures. Neutral = [H⁺] = [OH⁻] always.**

## Transfer Connections

- **chem.equil.acids-bases**: this node supplies the Kw foundation and the pH calculation mechanics that acid/base equilibria extend — weak acids require Ka ICE tables, but the pH definition and the [H⁺]/[OH⁻] relationship from Kw are unchanged.
- **chem.equil.kc-kp**: Kw is Kc for the autoionisation of water; the same rules (exclude pure liquid, activity = 1) that apply to all Kc expressions apply here — Kw is not a special case, it's an application of the general equilibrium constant framework.

## Cross-Subject Connections

- **Biology (biochemistry)**: enzyme activity is exquisitely pH-dependent; Km and Vmax shift with pH because catalytic residues have specific protonation states. Kw and the Henderson-Hasselbalch equation (ΔpH = pKa + log([A⁻]/[HA])) underlie buffer design in all living systems.
- **Environmental science (acid rain)**: CO₂ dissolved in rainwater forms carbonic acid (H₂CO₃), lowering pH below 7. Normal rainfall pH ≈ 5.6 (not 7) because of dissolved CO₂. Acid rain is additionally lowered by SO₂ and NO_x emissions. All quantified using the same pH framework from this node.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.equil.kw-ph`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.equil.kw-ph` as of 2026-07-23.

## Curriculum Feedback

The choice to pair Kw with pH in one node is appropriate — Kw IS the pH's foundation, and separating them would require re-deriving Kw in a pH node anyway. The prerequisite of chem.found.concentration is correct and necessary — students who cannot reliably compute molar concentrations will fail ICE table work for weak acids downstream. The temperature-dependence content (neutral pH ≠ 7 at non-298 K) is often omitted from introductory courses and is specifically required here because it is the single most consequential conceptual error students carry into biochemistry and environmental chemistry — its inclusion at this foundational node is correct.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
