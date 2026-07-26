# chem.equil.hydrolysis — Salt Hydrolysis

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.equil.hydrolysis` |
| Domain | Chemical Equilibrium |
| Requires | `chem.equil.weak-acid` |
| Unlocks | (none) |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Hydrolysis is NOT the same as dissolving — dissolving (dissociation into ions, e.g., NaCl→Na⁺+Cl⁻) is a distinct process from hydrolysis (a specific ion REACTING with water to change [H⁺] or [OH⁻]) — NaCl dissolves without hydrolysis (neutral solution), while CH₃COONa both dissolves AND its acetate ion hydrolyzes; NOT all salts make solutions acidic — a salt's solution pH depends on the relative strengths of its PARENT acid and base (weak-acid/strong-base salts give basic solutions, strong-acid/weak-base salts give acidic solutions, strong-acid/strong-base salts give neutral solutions), so "salts are acidic" is a false blanket generalization; the hydrolysis constant Kh relates to Ka via Kh=Kw/Ka (NEVER Kh=Ka+Kb or Ka/Kb) — this follows directly from the conjugate acid-base pair relationship Ka×Kb=Kw; and NH₄Cl is genuinely ACIDIC (not basic, despite containing the "base" ammonia's conjugate), because NH₄⁺ is the CONJUGATE ACID of the weak base NH�3, and it is NH₄⁺ (not Cl⁻, which doesn't hydrolyze, being from strong acid HCl) that hydrolyzes to produce H₃O⁺.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing NaCl dissolving in water (dissociation only, neutral solution) against CH₃COONa dissolving in water (dissociation PLUS acetate-ion hydrolysis, basic solution), making the dissolving-vs-hydrolysis distinction concrete.

**Representational**: A four-quadrant salt-classification table (weak-acid/strong-base=basic; strong-acid/weak-base=acidic; strong-acid/strong-base=neutral; weak-acid/weak-base=depends on relative Ka/Kb), with example salts populated in each quadrant.

**Abstract**: The general principle that hydrolysis is a distinct chemical reaction (ion+water) from mere dissociation; the general conjugate-pair relationship Ka×Kb=Kw underlying Kh=Kw/Ka; the general principle that a salt's acidity/basicity depends on tracing each ion back to its PARENT acid or base strength.

**Transfer**: Given an unfamiliar salt, correctly distinguishing dissolving from hydrolysis, correctly predicting solution pH (acidic/basic/neutral) from parent acid/base strengths, correctly computing Kh from Ka via Kh=Kw/Ka, and correctly identifying which ion (cation or anion) is responsible for a salt's observed acidity/basicity.

## 3. Why Beginners Fail

Students associate "hydrolysis" loosely with "a salt dissolving and separating into ions in water" (an everyday sense of "splitting apart"), missing that hydrolysis specifically refers to an ION REACTING with water molecules to shift [H⁺] or [OH⁻] — a chemically distinct process from simple dissociation, which many salts (like NaCl) undergo without any accompanying hydrolysis; students overgeneralize from encountering some acidic salt examples (or from the everyday connotation that "salt" and "acid" are loosely associated) to conclude ALL salts produce acidic solutions, missing that a salt's actual solution pH depends entirely on tracing each constituent ion back to its PARENT acid or base and comparing their relative strengths — salts can be acidic, neutral, or basic depending on this parentage; students, when deriving the hydrolysis constant Kh, incorrectly ADD or DIVIDE Ka and Kb (perhaps by loose analogy to combining related equilibrium constants in other contexts) rather than applying the specific conjugate-pair relationship, missing that Kh=Kw/Ka follows directly and specifically from Ka×Kb=Kw for any genuine conjugate acid-base pair; and students see NH₄Cl and, recognizing NH₃ as a familiar weak base, incorrectly attribute NH₃'s basic character directly to the salt NH₄Cl, missing that the actual hydrolyzing species is NH₄⁺ — the CONJUGATE ACID of NH₃, not NH₃ itself — and conjugate acids of weak bases are acidic, not basic, upon hydrolysis.

## 4. Misconception Library

### MC-1: Hydrolysis means the salt reacts with water and splits apart into its ions (dissolves)
- **Probe**: "What is the difference between dissolving NaCl in water and CH₃COONa undergoing hydrolysis?"
- **Characteristic phrase**: "hydrolysis is just dissolving."
- **Trigger (Type 3, language contamination)**: "Hydrolysis" superficially sounds like it could describe any water-mediated dissolution process, and its specific chemical meaning (ion+water reaction shifting [H⁺]/[OH⁻]) is not obvious from the word alone.
- **Conflict evidence [P28]**: Dissolving (dissociation into ions) and hydrolysis (reaction of an ion with water, changing [H⁺] or [OH⁻]) are two distinct processes; NaCl dissolves without hydrolysis (neutral solution); CH₃COONa dissolves AND the CH₃COO⁻ ion reacts with water.
- **Bridge [P30]**: Dissociation (a salt separating into its constituent ions upon dissolving) is a physical/ionic process that occurs for essentially all soluble ionic salts — hydrolysis is a SEPARATE, subsequent CHEMICAL reaction that only occurs when one of those ions is itself a conjugate acid or base strong enough to react appreciably with water; NaCl's ions (Na⁺, Cl⁻) are both conjugates of a strong base/acid and do not hydrolyze, while CH₃COO⁻ (conjugate of the weak acid acetic acid) does.
- **Replacement [P31]**: Distinguish dissolving (dissociation into ions, occurs for essentially all soluble salts) from hydrolysis (a specific ion reacting with water to shift pH, occurs only for ions that are conjugates of weak acids/bases) — never treat them as the same process.
- **Discrimination pairs [P33]**: NaCl (dissolves, no hydrolysis, neutral solution) vs. CH₃COONa (dissolves AND hydrolyzes via CH₃COO⁻, basic solution).
- **S6 repair path**: Present both salts side by side, tracing which ions are conjugates of strong vs. weak parent acids/bases to predict hydrolysis occurrence.

### MC-2: All salts make the solution acidic
- **Probe**: "What is the pH of 0.1 M KNO₃? Of 0.1 M Na₂CO₃?"
- **Characteristic phrase**: "salts are acidic."
- **Trigger (Type 1, overgeneralization)**: Overgeneralization, possibly from encountering acidic salt examples first, or from a loose everyday association between "salt" and acidity/reactivity.
- **Conflict evidence [P28]**: Salts can give acidic, neutral, or basic solutions depending on the parent acid and base; the phrase "acid salt" is misleading — it refers to a salt with an acidic cation, not all salts.
- **Bridge [P30]**: Whether a salt's solution is acidic, neutral, or basic is determined entirely by tracing EACH constituent ion back to its own PARENT acid or base and assessing whether that parent was strong or weak — a salt formed from a strong acid and strong base (like KNO₃, from HNO₃ and KOH) has neither ion hydrolyzing, giving a neutral solution, while a salt like Na₂CO₃ (from the weak acid H₂CO₃ and strong base NaOH) has its carbonate ion hydrolyzing to give a basic solution.
- **Replacement [P31]**: A salt's solution pH depends on the relative strengths of its parent acid and base (weak-acid/strong-base→basic; strong-acid/weak-base→acidic; strong-acid/strong-base→neutral) — never assume salts are universally acidic.
- **Discrimination pairs [P33]**: KNO₃ (strong-acid/strong-base parentage, neutral) vs. Na₂CO₃ (weak-acid/strong-base parentage, basic) — both salts, opposite pH outcomes.
- **S6 repair path**: Present the four-quadrant salt-classification table, having the student trace each salt's ions back to their parent acid/base strength.

### MC-3: Kh = Ka + Kb (or Ka/Kb) rather than Kh = Kw/Ka
- **Probe**: "What is the hydrolysis constant for the acetate ion if Ka = 1.8 × 10⁻⁵?"
- **Characteristic phrase**: "Ka and Kb add up."
- **Trigger (Type 4, notation-induced)**: Students may pattern-match Kh's derivation onto other equilibrium-constant combination rules (addition or division) without deriving it from the specific conjugate-pair relationship.
- **Conflict evidence [P28]**: For any conjugate acid-base pair, Ka×Kb=Kw (established in weak-acid entry); taking Kh=Kw/Ka is a direct consequence of the conjugate pair relationship.
- **Bridge [P30]**: The hydrolysis constant Kh IS, by definition, the Kb of the hydrolyzing conjugate base (e.g., acetate's hydrolysis equilibrium is identical in form to any weak base's Kb equilibrium) — since Ka(of the parent acid)×Kb(of the conjugate base)=Kw is the established conjugate-pair relationship, substituting Kh in place of Kb directly gives Kh=Kw/Ka, not any additive or divisive combination.
- **Replacement [P31]**: Always derive Kh=Kw/Ka from the conjugate-pair relationship Ka×Kb=Kw — never use Kh=Ka+Kb or Ka/Kb.
- **Discrimination pairs [P33]**: Correct Kh=Kw/Ka=10⁻¹⁴/1.8×10⁻⁵≈5.6×10⁻¹⁰ (derived from the conjugate-pair relationship) vs. an incorrect additive/divisive combination (not grounded in any valid equilibrium relationship).
- **S6 repair path**: Walk through the explicit Ka×Kb=Kw derivation, substituting Kh for Kb to arrive at Kh=Kw/Ka.

### MC-4: NH₄Cl is basic because NH₃ is a base
- **Probe**: "Which ion in NH₄Cl undergoes hydrolysis, and does it produce H₃O⁺ or OH⁻?"
- **Characteristic phrase**: (implicit, from attributing NH₃'s base character directly to the salt).
- **Trigger (Type 5, instruction-induced)**: Students associate NH₃'s well-known base character directly with any nitrogen-containing salt derived from it, without tracing the specific hydrolyzing species.
- **Conflict evidence [P28]**: NH₄Cl produces NH₄⁺ and Cl⁻; Cl⁻ does not hydrolyse (from strong acid HCl); NH₄⁺ is the conjugate ACID of NH₃ (weak base) and hydrolyses to give H₃O⁺→acidic solution; the confusion arises from attributing the base character of NH₃ to the cation NH₄⁺ without recognising that NH₄⁺ is the acid in the conjugate pair.
- **Bridge [P30]**: A conjugate ACID (like NH₄⁺, formed when the base NH₃ accepts a proton) has the OPPOSITE acid-base character from its parent base — NH₃'s basicity does not transfer to NH₄⁺; rather, NH₄⁺ specifically hydrolyzes as an ACID (donating a proton back to water), making the resulting solution acidic, precisely because NH₄⁺ occupies the acid role in its own conjugate pair with NH₃.
- **Replacement [P31]**: Always identify the SPECIFIC hydrolyzing ion and its role (conjugate acid or conjugate base) — never attribute a parent base's character directly to its conjugate acid cation.
- **Discrimination pairs [P33]**: NH₃ (the parent weak base, itself basic) vs. NH₄⁺ (its conjugate acid, hydrolyzes to give an acidic solution) — opposite acid-base character between a base and its own conjugate acid.
- **S6 repair path**: Present the explicit conjugate-pair identification for NH₃/NH₄⁺, deriving NH₄⁺'s acidic hydrolysis behavior from its role as the conjugate acid.

## 5. Explanation Library

**Primary explanation**: Hydrolysis is a distinct chemical process (an ion reacting with water to shift [H⁺] or [OH⁻]) from simple dissociation (a salt separating into ions) — only ions that are conjugates of weak acids or bases hydrolyze appreciably. A salt's overall solution pH is determined by tracing each constituent ion back to its parent acid/base strength: weak-acid/strong-base salts give basic solutions, strong-acid/weak-base salts give acidic solutions, and strong-acid/strong-base salts give neutral solutions — salts are never universally acidic.

**Secondary explanation (Kh derivation and conjugate-acid hydrolysis)**: The hydrolysis constant Kh is derived directly from the conjugate acid-base pair relationship Ka×Kb=Kw, giving Kh=Kw/Ka — never an additive or divisive combination. A conjugate acid (like NH₄⁺) has the opposite acid-base character from its parent base (NH₃); NH₄⁺ hydrolyzes as an acid, producing an acidic solution, despite NH₃ itself being a familiar weak base.

## 6. Analogy Library

- **Primary analogy**: A family tree where a "base" parent (NH₃) has an "acid" child (NH₄⁺, formed by accepting a proton) — the child's role (acid) is opposite the parent's (base), just as a conjugate acid's hydrolysis behavior is opposite its parent base's character.
- **Breaking point**: The family-tree analogy conveys the conjugate-role-reversal concept well but doesn't naturally capture the dissolving-vs-hydrolysis distinction (MC-1) or the four-way salt-classification (MC-2) — those need the explicit process comparison and the classification table.
- **Anti-analogy**: Do NOT say "any salt containing a base's fragment inherits that base's character" — this directly reinforces MC-4 by ignoring the conjugate-role reversal.

## 7. Demonstration Library

- **Demonstration 1 (NaCl-vs-CH₃COONa dissolving/hydrolysis comparison)**: Present both salts side by side, tracing dissociation and hydrolysis occurrence for each.
- **Demonstration 2 (four-quadrant salt-classification table)**: Present the full parent-acid/parent-base classification table with example salts in each quadrant.
- **Demonstration 3 (Kh=Kw/Ka derivation from the conjugate-pair relationship)**: Derive Kh explicitly from Ka×Kb=Kw, substituting Kh for Kb.

## 8. Discovery Lesson

**Opening**: "Is dissolving NaCl in water the same process as CH₃COONa's acetate ion reacting with water?"

**Exploration**: Students trace both processes explicitly, discovering hydrolysis is a distinct chemical reaction, not mere dissociation.

**Synthesis**: Guide toward: hydrolysis requires a specific ion (conjugate of a weak acid/base) reacting with water — not all dissolved ions hydrolyze.

**Closure**: "Is NH₄Cl basic, since NH₃ is a well-known weak base?" (Directly resolves MC-4.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit NaCl-vs-CH₃COONa dissolving/hydrolysis comparison.
- **TA-2 (TELL)**: State the four-way salt-classification rule explicitly, anchored to the classification table.
- **TA-3 (DO)**: Student derives Kh for an unfamiliar conjugate base from its parent acid's Ka.
- **TA-4 (TEST-THINKING)**: Present the NH₄Cl probe and ask the student to justify its acidity from NH₄⁺'s conjugate-acid role.

## 10. Voice Teaching

Whenever hydrolysis is discussed, narrate "dissolving and hydrolysis are different — check if the ion actually reacts with water." Whenever a salt's pH is predicted, state "trace each ion back to its parent acid or base strength" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly distinguish dissolving from hydrolysis, (b) correctly predict salt solution pH from parent acid/base strengths, (c) correctly derive Kh=Kw/Ka and correctly identify the hydrolyzing ion's conjugate role.

- **FA-1**: "What is the difference between dissolving NaCl and CH₃COONa undergoing hydrolysis?" — targets MC-1.
- **FA-2**: "What is the pH of 0.1 M KNO₃? Of 0.1 M Na₂CO₃?" — targets MC-2.
- **FA-3**: "What is the hydrolysis constant for the acetate ion if Ka = 1.8 × 10⁻⁵?" — targets MC-3.
- **FA-4**: "Which ion in NH₄Cl undergoes hydrolysis, and does it produce H₃O⁺ or OH⁻?" — targets MC-4.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-4 among students who strongly associate NH₃'s basicity with any related nitrogen-containing salt.

**Delayed retrieval**: Re-probe MC-2's salt-classification rule and MC-4's conjugate-role reversal as foundational knowledge for subsequent titration and analytical chemistry applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the dissolving/hydrolysis confusion, have the student explicitly check whether an ion reacts with water (changing pH) before calling it hydrolysis.
- **S4 (frustrated)**: Normalize — conflating dissolving with hydrolysis and misattributing conjugate-acid character are both genuinely common on first exposure.
- **S6 (collision)**: Use the explicit Kh=Kw/Ka derivation for MC-3; use the conjugate-pair role-reversal argument for MC-4.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why NH₄Cl is acidic despite NH₃ being a base.

## 13. Memory & Review

Tag as two conceptual-correction memories (dissolving-vs-hydrolysis distinction; conjugate-role reversal for NH₄⁺) plus two procedural memories (four-way salt-classification; Kh=Kw/Ka derivation). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates weak-acid equilibrium reasoning built across `chem.equil.weak-acid`, forming a capstone application to titration and analytical pH-prediction contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
