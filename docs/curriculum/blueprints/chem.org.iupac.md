# chem.org.iupac — IUPAC Nomenclature

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.org.iupac` |
| Domain | Organic Chemistry |
| Requires | `chem.bond.covalent-bonding` |
| Unlocks | `chem.alc.alcohols`, `chem.hyd.alkanes`, `chem.org.isomerism`, `chem.org.purification`, `chem.org.spectroscopy` |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 3 |

## 1. Concept Spine

IUPAC nomenclature systematically names organic compounds by selecting a parent chain (which must include the highest-priority principal characteristic group present, taking precedence over simply choosing the longest chain), numbering that chain to give substituents/the principal group the lowest possible locants, placing each numerical locant immediately before the specific name element it modifies, alphabetizing substituent prefixes by their base name only (ignoring multiplying prefixes like di-/tri-/tetra-), and correctly matching characteristic-group suffixes to their exact structural meaning (e.g., -one specifically for ketones, distinct from -al for terminal aldehydes, even though both involve a C=O group).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Naming CH₃–CH₂–COOH with a propyl branch on C2 — discovering the "obvious" longest 6-carbon chain is actually the wrong parent chain, because it excludes the –COOH group.

**Representational**: A side-by-side comparison of two candidate parent chains for the same molecule — one longer but missing the principal group, one shorter but correctly including it — with the correct choice marked.

**Abstract**: The priority hierarchy — principal characteristic group inclusion first, then chain length, then lowest locants, then correct alphabetization (ignoring multiplying prefixes), then correct suffix-to-structure matching.

**Transfer**: Given an unfamiliar branched, multi-functional-group molecule, correctly applying the full priority hierarchy to construct its systematic IUPAC name from scratch.

## 3. Why Beginners Fail

Students default to "always pick the longest chain" as an absolute rule, missing that the parent chain must first and foremost include the principal characteristic group, even if that means selecting a shorter chain; they place numerical locants after the substituent name they modify (writing "methyl-2" instead of "2-methyl"), rather than immediately before it as IUPAC convention requires; they assume any "-one" suffix always signals a ketone, missing that a terminal C=O group is instead named with the "-al" (aldehyde) suffix, with "-one" reserved for non-terminal C=O positions; and they include multiplying prefixes (di-, tri-, tetra-) when alphabetizing substituents, rather than alphabetizing strictly by the substituent's base name alone.

## 4. Misconception Library

### MC-1: Always choose the longest carbon chain, regardless of functional groups
- **Probe**: Name the compound CH₃–CH₂–COOH with a –CH₂–CH₂–CH₃ branch on the C2 carbon.
- **Characteristic phrase**: "I chose the 6-carbon chain."
- **Trigger (Type 5, instruction-induced)**: The "longest chain = parent chain" rule is taught early and emphasized heavily for simple hydrocarbons, before functional-group priority rules are introduced, leading students to apply it as an absolute, standalone criterion.
- **Conflict evidence [P28]**: The parent chain MUST include the –COOH group (the principal characteristic group present in this molecule) — selecting the 6-carbon chain that excludes –COOH produces an incorrect name, since the compound's defining functional group (carboxylic acid) would go unnamed by the suffix entirely.
- **Bridge [P30]**: Chain length is only the tie-breaking criterion AMONG chains that already contain the principal characteristic group — it is never the first or sole criterion when a characteristic group is present.
- **Replacement [P31]**: Always select the parent chain that includes the principal characteristic group first; only among candidate chains that satisfy this does chain length become the deciding factor.
- **Discrimination pairs [P33]**: The 6-carbon chain (longer, but excludes –COOH, WRONG choice) vs. the correct shorter chain (includes –COOH, correct parent chain).
- **S6 repair path**: Have the student identify the principal characteristic group first, before considering chain length at all, then re-select the parent chain.

### MC-2: Locants are written after the substituent name (e.g., methyl-2 instead of 2-methyl)
- **Probe**: "Correct the name 'pentanone-3'."
- **Characteristic phrase**: "I put the number after the word."
- **Trigger (Type 4, notation-induced)**: Students likely transfer a "descriptor-then-number" pattern from other contexts (or simply mirror casual/informal chemical shorthand) rather than the specific IUPAC convention.
- **Conflict evidence [P28]**: Current IUPAC convention places the locant immediately BEFORE the specific part of the name it modifies — the correct forms are "2-methylpentane" (not "methylpentane-2") and "pentan-3-one" (not "pentanone-3"), with the locant directly preceding "methyl" and directly preceding "one" respectively.
- **Bridge [P30]**: The locant's placement signals exactly which part of the compound name it modifies — placing it immediately before that element removes any ambiguity about what's being numbered.
- **Replacement [P31]**: Always place a locant immediately before the specific name element (substituent or suffix) it numbers, never after.
- **Discrimination pairs [P33]**: "methyl-2pentane" / "pentanone-3" (incorrect, locant trailing) vs. "2-methylpentane" / "pentan-3-one" (correct, locant leading).
- **S6 repair path**: Have the student rewrite the incorrect name with the locant moved to immediately precede the element it modifies.

### MC-3: The suffix -one always means ketone
- **Probe**: "What is cyclohexanone's principal group?"
- **Characteristic phrase**: "any -one must be a ketone."
- **Trigger (Type 1, overgeneralization)**: Students correctly learn "-one" as the ketone suffix from ring and chain examples where it applies, and extend this association without checking the specific structural position of the C=O group (terminal vs. non-terminal).
- **Conflict evidence [P28]**: "-one" is genuinely the correct ketone suffix specifically when the C=O group is NOT at the chain terminus (as in cyclohexanone, where the answer "ketone" is correct) — but a terminal C=O group is named with the "-al" (aldehyde) suffix instead, meaning the suffix-to-structure mapping depends on WHERE the C=O sits, not merely on whether "-one" happens to appear.
- **Bridge [P30]**: "-one" and "-al" are two genuinely distinct suffixes distinguishing ketones from aldehydes based on the C=O group's position — the naive "-one always means ketone" rule happens to work in ring systems (where there's no true chain terminus in the same sense) but the real distinguishing rule is about terminal vs. non-terminal position, not the suffix letters alone.
- **Replacement [P31]**: A C=O group at a chain terminus is named with "-al" (aldehyde); a C=O group not at a terminus is named with "-one" (ketone) — check position, not merely which suffix looks familiar.
- **Discrimination pairs [P33]**: Cyclohexanone (non-terminal C=O within a ring, correctly a ketone, "-one" suffix) vs. a terminal-chain C=O (correctly an aldehyde, requiring "-al", not "-one").
- **S6 repair path**: Have the student locate the exact position of the C=O group in a given structure before assigning either suffix.

## 5. Explanation Library

**Primary explanation**: IUPAC names are built by first identifying the principal characteristic group present in a molecule, then selecting the parent chain that includes that group (chain length is only a tie-breaker among chains that already satisfy this), then numbering to give the lowest possible locants, and finally placing substituent names alphabetically (by base name only) with each locant positioned immediately before the specific name element it modifies.

**Secondary explanation (suffix-precision framing)**: Characteristic-group suffixes encode precise structural information — "-one" specifically denotes a non-terminal C=O (ketone), while "-al" specifically denotes a terminal C=O (aldehyde) — so correctly assigning a suffix requires checking the exact position of the functional group within the molecule's structure, not just pattern-matching a familiar-sounding suffix.

## 6. Analogy Library

- **Primary analogy**: A postal address where the most specific, defining piece of information (like a building's primary entrance) must be included in the route description even if a longer, more scenic route exists — the "parent chain" selection is about ensuring the defining feature (the principal characteristic group) is captured, not about maximizing route length for its own sake.
- **Breaking point**: The address analogy conveys the "must-include-the-defining-feature" priority well but doesn't naturally capture the locant-placement or suffix-precision rules — those need the explicit notational and structural-position rules.
- **Anti-analogy**: Do NOT say "just find the longest chain you can" as a first instruction — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (parent-chain selection contest)**: Present a branched molecule with a functional group off the "obvious" longest chain, having students compare the longest-chain candidate against the group-including candidate and justify which is correct.
- **Demonstration 2 (suffix-position sort)**: Present several C=O-containing structures with the carbonyl in different positions (terminal vs. non-terminal, chain vs. ring) and have students assign the correct suffix (-al vs. -one) based on position alone.

## 8. Discovery Lesson

**Opening**: "If a molecule has a 6-carbon chain and a shorter 3-carbon chain, but only the shorter chain contains its –COOH group, which chain is the parent chain?"

**Exploration**: Students attempt naming the molecule both ways, discovering the version excluding –COOH fails to properly represent the compound's defining functional group.

**Synthesis**: Guide toward: parent-chain selection prioritizes including the principal characteristic group over maximizing raw chain length.

**Closure**: "Now that you know cyclohexanone is a ketone, would every '-one'-suffixed name you encounter also be a ketone?" (Bridges to MC-3's position-based nuance.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the group-including-chain vs. longest-chain comparison for a specific branched carboxylic acid example.
- **TA-2 (TELL)**: State the locant-immediately-before-modified-element rule explicitly, worked through with a corrected example.
- **TA-3 (DO)**: Student names a new branched molecule, correctly selecting the parent chain and placing locants.
- **TA-4 (TEST-THINKING)**: Present MC-3's cyclohexanone probe and ask the student to justify the ketone assignment using C=O position, not suffix pattern-matching alone.

## 10. Voice Teaching

Whenever selecting a parent chain, verbally state "does this chain include the principal group?" as the very first check, before mentioning chain length at all. Whenever a locant is written, narrate its placement explicitly: "the number goes immediately before what it's numbering."

## 11. Assessment

**Mastery gate**: Student can (a) correctly select a parent chain that includes the principal characteristic group even when a longer excluding chain exists, (b) correctly place locants immediately before their modified element, (c) correctly distinguish -one (non-terminal, ketone) from -al (terminal, aldehyde) by structural position.

- **FA-1**: "Name CH₃–CH₂–COOH with a propyl branch on C2." — targets MC-1.
- **FA-2**: "Correct the name 'pentanone-3'." — targets MC-2.
- **FA-3**: "What is cyclohexanone's principal group?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've only practiced naming simple hydrocarbons without functional groups so far.

**Delayed retrieval**: Re-probe MC-1's parent-chain priority before `chem.org.isomerism` and `chem.alc.alcohols` require fluent, correct naming as a prerequisite skill.

## 12. Recovery Notes

- **S3 (stuck)**: For parent-chain confusion, have the student circle the principal characteristic group first, before drawing any candidate chain.
- **S4 (frustrated)**: Normalize — the longest-chain rule genuinely is correct and heavily practiced for simple hydrocarbons, making its overextension to functionalized molecules a very common, reasonable error.
- **S6 (collision)**: Use the corrected locant-placement rewrite for MC-2; use the C=O-position sorting exercise for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why chain length is only a secondary criterion in parent-chain selection.

## 13. Memory & Review

Tag as a procedural-priority memory (parent-chain selection hierarchy) plus a notational-convention memory (locant placement, alphabetization rules) plus a conceptual-correction memory (-one vs. -al position-based distinction). Schedule a spaced check at ~1 week and again before `chem.org.isomerism`.

## 14. Transfer Map

Feeds directly into `chem.alc.alcohols`, `chem.hyd.alkanes` (naming fluency is a direct prerequisite for all subsequent organic-family concepts), `chem.org.isomerism` (correct naming underlies distinguishing structural isomers), `chem.org.purification`, and `chem.org.spectroscopy` (correctly identified structures assumed throughout).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
