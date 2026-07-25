# chem.coord.nomenclature — Naming Coordination Compounds

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.coord.nomenclature` |
| Domain | Coordination Chemistry |
| Requires | `chem.coord.werner` |
| Unlocks | `chem.coord.isomerism` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 3 |

## 1. Concept Spine

IUPAC coordination nomenclature requires listing ligands in strict ALPHABETICAL order (never by quantity), using the ligand's own base name for alphabetization while IGNORING multiplying prefixes (di-, tri-, tetra-) — [Co(NH₃)₄Cl₂]⁺ is correctly named tetraamminedichloridocobalt(III) because "ammine" (A) precedes "chlorido" (C) alphabetically, regardless of having 4 ammines versus 2 chlorides; the suffix "-ate" in coordination nomenclature specifically signals that the COMPLEX ITSELF carries overall negative charge (attached to the metal name/Latin root), never indicating oxygen content the way it does in simple oxyanion names like sulfate — hexacyanidoferrate(II) means [Fe(CN)₆]⁴⁻, an anionic complex, with "ferrate" simply being iron (ferrum) named as part of an anionic complex; and when a ligand's own name already contains a multiplying prefix or is otherwise complex (like "ethane-1,2-diamine," which already contains "di-" within "diamine"), the alternate multiplying prefixes BIS-, TRIS-, TETRAKIS- must be used instead of di-/tri-/tetra- to avoid genuine ambiguity — "diethylenediamine" would be dangerously ambiguous (readable as one ligand with a diethylene backbone), while "bis(ethane-1,2-diamine)" unambiguously specifies two separate ligands.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Naming [Co(NH₃)₄Cl₂]⁺ correctly as tetraamminedichloridocobalt(III), tracing the alphabetical ordering (ammine before chlorido) despite chloride having a smaller count.

**Representational**: A side-by-side comparison of "chromate" (CrO₄²⁻, a simple oxyanion) against "chromate(III)" in a coordination complex context (a differently-structured anionic complex), visually anchoring the context-dependent meaning of "-ate."

**Abstract**: The general alphabetization rule (by ligand base name, ignoring multiplying prefixes); the general bis-/tris-/tetrakis- rule for ligands whose own names already contain multiplying-prefix-like elements or are otherwise complex.

**Transfer**: Given an unfamiliar coordination compound, correctly naming it with ligands in true alphabetical order (ignoring quantity prefixes), correctly interpreting or assigning the "-ate" suffix specifically for anionic complexes, and correctly choosing between di-/tri-/tetra- and bis-/tris-/tetrakis- based on whether the ligand's own name would create ambiguity.

## 3. Why Beginners Fail

Students order ligands by quantity (listing the most numerous ligand first) rather than by strict alphabetical order of the ligand's base name, missing that IUPAC rules require true alphabetization (ignoring multiplying prefixes) regardless of how many of each ligand are present; they interpret the "-ate" suffix in coordination compound names as signaling oxygen content (by analogy with familiar oxyanion names like sulfate or nitrate), missing that in coordination nomenclature specifically, "-ate" signals that the COMPLEX AS A WHOLE is anionic, entirely independent of oxygen presence; and they combine a multiplying prefix directly with a ligand name that already contains a similar-looking prefix internally (like "diethylenediamine" for two ethylenediamine ligands), missing that this creates genuine ambiguity, requiring the bis-/tris-/tetrakis- alternate prefix system specifically to avoid confusion.

## 4. Misconception Library

### MC-1: List the most common ligand first, then the others
- **Probe**: "Name [Co(NH₃)₄Cl₂]⁺."
- **Characteristic phrase**: "list by how many there are."
- **Trigger (Type 5, instruction-induced)**: Without the specific alphabetization rule being sufficiently emphasized, students default to a plausible-seeming "list by prominence/quantity" ordering intuition.
- **Conflict evidence [P28]**: IUPAC rules require strict ALPHABETICAL order of ligand names, never ordering by quantity — for [Co(NH₃)₄Cl₂]⁺, the correct name is tetraamminedichloridocobalt(III), with "ammine" (starting with A) listed before "chlorido" (starting with C), specifically because "a" precedes "c" alphabetically, even though there are fewer chloride ligands (2) than ammine ligands (4) — quantity plays no role in ordering; the multiplying prefixes themselves (tetra-, di-) are explicitly IGNORED when determining alphabetical order — it's the underlying ligand name (ammine, chlorido) that gets alphabetized, not the prefixed form.
- **Bridge [P30]**: IUPAC naming conventions prioritize a consistent, unambiguous SYSTEMATIC ordering rule (alphabetical) over any quantity-based intuition, precisely so that any chemist can predict the correct ligand order without needing additional context about relative abundance.
- **Replacement [P31]**: Always order ligands alphabetically by their base name (ignoring multiplying prefixes), never by quantity present.
- **Discrimination pairs [P33]**: Correct: tetraamminedichloridocobalt(III) (ammine before chlorido, alphabetical) vs. incorrect: dichloridotetraamminecobalt(III) (chlorido before ammine, ordered by quantity or arbitrary preference).
- **S6 repair path**: Have the student alphabetize just the base ligand names (ammine, chlorido) first, ignoring quantities entirely, before adding any multiplying prefix.

### MC-2: The -ate suffix means the compound is an oxyanion like sulfate or nitrate
- **Probe**: "What does the suffix -ate mean in the name hexacyanidoferrate(II)?"
- **Characteristic phrase**: "-ate means it's an oxygen-containing anion."
- **Trigger (Type 3, language contamination)**: Students' prior exposure to "-ate" specifically in the context of common oxyanions (sulfate, nitrate, phosphate) leads them to generalize this suffix as inherently signaling oxygen content, rather than recognizing its distinct, context-dependent meaning in coordination nomenclature.
- **Conflict evidence [P28]**: In COORDINATION nomenclature specifically, "-ate" is added to the metal's name (or its Latin root) when the COMPLEX ITSELF carries overall negative charge — hexacyanidoferrate(II) genuinely means [Fe(CN)₆]⁴⁻, an anionic complex, where "ferrate" is simply iron (from the Latin "ferrum") named as part of an anionic complex — the suffix says NOTHING about oxygen content here, since the complex contains cyanide ligands, not oxygen at all; the same word root can carry genuinely different meanings depending on context — "chromate" in simple inorganic chemistry means CrO₄²⁻ (an oxyanion), while "chromate(III)" appearing within coordination-complex naming context refers to a differently-structured anionic COMPLEX, not necessarily containing oxygen.
- **Bridge [P30]**: The suffix "-ate" has a genuinely different, specific meaning within coordination nomenclature (signaling an anionic COMPLEX overall) compared to its meaning in simple oxyanion naming (historically tied to oxygen-containing anions) — the same suffix, applied in different naming SYSTEMS, carries different specific information, and context must always be checked.
- **Replacement [P31]**: In coordination nomenclature, "-ate" signals that the complex as a whole is anionic — it says nothing about oxygen content, unlike its use in simple oxyanion names.
- **Discrimination pairs [P33]**: "Chromate" as a simple oxyanion (CrO₄²⁻, oxygen-containing) vs. "-ate" within a coordination complex name like hexacyanidoferrate(II) ([Fe(CN)₆]⁴⁻, no oxygen, signaling only that the complex is anionic).
- **S6 repair path**: Present hexacyanidoferrate(II)'s actual structure explicitly, showing no oxygen present despite the "-ate" suffix, directly disproving the oxyanion-association assumption.

### MC-3: "di-ethylenediamine" means two ethylene groups within one ligand
- **Probe**: "Name [Ni(en)₂Cl₂]. Does the name include 'di-' or 'bis-'?"
- **Characteristic phrase**: "diethylenediamine."
- **Trigger (Type 4, notation-induced)**: Students apply the standard di-/tri-/tetra- multiplying prefix directly to "ethylenediamine," not recognizing that this ligand's own name already contains a similar-looking prefix element ("di-" within "diamine"), creating genuine notational ambiguity.
- **Conflict evidence [P28]**: "en" (ethylenediamine, or systematically ethane-1,2-diamine) is a single, complete ligand name that ALREADY contains "di-" as part of "diamine" (referring to its two amine groups, an intrinsic part of the ligand's own structure, not a multiplying prefix for ligand count); when TWO of this ligand are present (as in [Ni(en)₂Cl₂]), using "diethylenediamine" would be genuinely AMBIGUOUS — it could be misread as ONE ligand possessing a "diethylene" backbone rather than TWO separate ethylenediamine ligands; the unambiguous correct form is BIS(ethane-1,2-diamine), using the alternate multiplying prefix specifically because the ligand's own name already contains prefix-like elements.
- **Bridge [P30]**: The standard di-/tri-/tetra- prefixes are reserved for simple ligand names without their own internal multiplying-prefix-like elements — when a ligand's name already contains such elements (or is otherwise complex, e.g., containing parentheses or its own numerical indicators), the bis-/tris-/tetrakis- system exists SPECIFICALLY to avoid the genuine ambiguity that stacking standard prefixes would create.
- **Replacement [P31]**: Use bis-, tris-, tetrakis- (not di-, tri-, tetra-) specifically for ligands whose own names already contain a multiplying-prefix-like element or are otherwise complex — [Ni(en)₂Cl₂] is correctly named dichloridobis(ethane-1,2-diamine)nickel(II), never "diethylenediamine."
- **Discrimination pairs [P33]**: "diamminedichlorido..." (correct use of di- for simple ligand names like ammine, chlorido) vs. "bis(ethane-1,2-diamine)..." (correct use of bis- specifically because "ethylenediamine" already contains "di-" internally).
- **S6 repair path**: Present the genuine ambiguity of "diethylenediamine" directly (could be misread as one complex ligand), motivating the bis- alternative as a disambiguation tool.

## 5. Explanation Library

**Primary explanation**: IUPAC coordination nomenclature requires strict alphabetical ordering of ligands by their base name (never by quantity, and ignoring multiplying prefixes for alphabetization purposes), and uses "-ate" specifically to signal that the overall complex is anionic (attached to the metal name/Latin root), a meaning genuinely distinct from "-ate"'s use in simple oxyanion names.

**Secondary explanation (bis-/tris-/tetrakis-framing)**: When a ligand's own name already contains a multiplying-prefix-like element (such as "ethylenediamine" containing "di-" within "diamine") or is otherwise structurally complex, the alternate multiplying prefixes bis-, tris-, tetrakis- must be used instead of the standard di-, tri-, tetra- specifically to avoid genuine naming ambiguity that combining standard prefixes with such ligand names would create.

## 6. Analogy Library

- **Primary analogy**: A library's strict alphabetical shelving system, which files books by title regardless of how many copies of each book are in stock — a bestseller with 10 copies still gets shelved by its title's first letter, exactly like a rare book with only 1 copy, never given priority placement just because it's more numerous.
- **Breaking point**: The library-shelving analogy conveys the alphabetization-ignoring-quantity concept well but doesn't naturally capture the context-dependent "-ate" meaning or the bis-/tris-/tetrakis- disambiguation rule — those need the explicit context-comparison and ambiguity-avoidance arguments.
- **Anti-analogy**: Do NOT say "list the ligand with more copies first" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (alphabetical-ordering drill)**: Present several complexes with varying ligand quantities and have students name them, applying strict alphabetical ordering regardless of quantity each time.
- **Demonstration 2 (hexacyanidoferrate(II) structure check)**: Present the actual structure of [Fe(CN)₆]⁴⁻ explicitly, showing no oxygen present, directly disproving the "-ate means oxyanion" assumption.

## 8. Discovery Lesson

**Opening**: "[Co(NH₃)₄Cl₂]⁺ has 4 ammine ligands and only 2 chloride ligands. Should ammine be listed first because there are more of them?"

**Exploration**: Students apply the alphabetical rule directly (ammine before chlorido), discovering quantity plays no role in ordering.

**Synthesis**: Guide toward: IUPAC ligand ordering is strictly alphabetical by base name, never by quantity.

**Closure**: "If [Ni(en)₂Cl₂] has two ethylenediamine ligands, is 'diethylenediamine' the correct way to name that?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit alphabetical-ordering derivation for [Co(NH₃)₄Cl₂]⁺.
- **TA-2 (TELL)**: State the coordination-specific meaning of "-ate" explicitly, contrasted directly with its oxyanion meaning.
- **TA-3 (DO)**: Student names [Ni(en)₂Cl₂] correctly, using bis- rather than di- for the ethylenediamine ligands.
- **TA-4 (TEST-THINKING)**: Present MC-2's hexacyanidoferrate(II) probe and ask the student to justify the "-ate" meaning using the complex's actual structure.

## 10. Voice Teaching

Whenever ligands are ordered in a name, narrate "alphabetical by base name, ignore the prefix and the quantity" explicitly every time. Whenever "-ate" appears in a coordination compound name, ask "is this signaling an anionic complex, or could it be confused with an oxyanion?" to preempt the context confusion.

## 11. Assessment

**Mastery gate**: Student can (a) correctly order ligands alphabetically by base name, ignoring quantity and multiplying prefixes, (b) correctly interpret "-ate" as signaling an anionic complex, not oxygen content, (c) correctly choose bis-/tris-/tetrakis- over di-/tri-/tetra- for ligands with internally complex names.

- **FA-1**: "Name [Co(NH₃)₄Cl₂]⁺." — targets MC-1.
- **FA-2**: "What does the suffix -ate mean in hexacyanidoferrate(II)?" — targets MC-2.
- **FA-3**: "Name [Ni(en)₂Cl₂]. Does the name include 'di-' or 'bis-'?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students whose only prior exposure to "-ate" is through common oxyanion names.

**Delayed retrieval**: Re-probe MC-1's alphabetization rule and MC-3's bis-/tris- rule before `chem.coord.isomerism` requires fluent, correct naming to distinguish isomeric coordination compounds.

## 12. Recovery Notes

- **S3 (stuck)**: For the ordering confusion, have the student write out just the base ligand names first (stripped of prefixes and quantities), alphabetize those, then add prefixes back afterward.
- **S4 (frustrated)**: Normalize — quantity-based ordering is a very reasonable, intuitive default that many other naming systems genuinely do use, making its incorrectness here a legitimate, common surprise.
- **S6 (collision)**: Use the explicit hexacyanidoferrate(II) structure check for MC-2; use the ambiguity-demonstration for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why "diethylenediamine" would be a genuinely ambiguous, incorrect name.

## 13. Memory & Review

Tag as a procedural memory (alphabetical ligand ordering) plus two conceptual-correction memories (context-dependent "-ate" meaning; bis-/tris-/tetrakis- disambiguation rule). Schedule a spaced check at ~1 week and again before `chem.coord.isomerism`.

## 14. Transfer Map

Feeds directly into `chem.coord.isomerism` (correctly distinguishing coordination isomers requires fluent, unambiguous nomenclature established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
