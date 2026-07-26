# chem.carb.spectro — Spectroscopic ID of Carbonyls

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.carb.spectro` |
| Domain | Carbonyl Compounds |
| Requires | `chem.org.spectroscopy`, `chem.carb.ketones` |
| Unlocks | (none) |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

The carbonyl C=O stretch is NOT a single fixed IR frequency (~1715 cm-1) that beginners memorize and apply universally — its exact position SHIFTS predictably (roughly 1650-1850 cm-1) with conjugation (lowers frequency, e.g., conjugated enones ~1670-1680 cm-1), ring strain (raises frequency, e.g., cyclobutanone ~1775 cm-1, cyclopropanone even higher), and electronegative substituents (raises frequency, e.g., esters ~1735-1750 cm-1, acid chlorides ~1800 cm-1) — treating "carbonyl = ~1715 cm-1, always" ignores that the specific shifted value is itself diagnostic information identifying WHICH type of carbonyl compound is present; and the McLafferty rearrangement in mass spectrometry is NOT a simple bond-cleavage fragmentation — it is a SIX-MEMBERED-RING TRANSITION STATE process requiring a gamma-hydrogen (a hydrogen on the carbon three atoms away from the carbonyl carbon) to transfer to the carbonyl oxygen via this cyclic transition state, with simultaneous C(alpha)-C(beta) bond cleavage — a carbonyl compound lacking any gamma-hydrogen (e.g., one with a quaternary carbon at the gamma position, or too short a chain) CANNOT undergo McLafferty rearrangement at all, regardless of how favorable simple alpha-cleavage might be.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing the IR C=O stretch of cyclohexanone (~1715 cm-1, unstrained, unconjugated ketone) against cyclobutanone (~1775 cm-1, elevated due to ring strain) against methyl vinyl ketone (~1675 cm-1, lowered due to conjugation with the alkene) — three different carbonyl environments giving three diagnostically distinct frequencies.

**Representational**: A six-membered-ring transition-state diagram for the McLafferty rearrangement, showing the gamma-hydrogen migrating to the carbonyl oxygen while the C(alpha)-C(beta) bond breaks, releasing a neutral alkene and forming an enol radical cation.

**Abstract**: The general principle that C=O stretch frequency is a diagnostic variable, shifted predictably by conjugation (lowers), ring strain (raises), and electronegative substituents (raises), rather than a single fixed value; and the general principle that McLafferty rearrangement requires a gamma-hydrogen positioned for a six-membered cyclic transition state, and is structurally impossible without one.

**Transfer**: Given an unfamiliar carbonyl compound's IR spectrum, correctly using the specific C=O frequency (not just "is a carbonyl present") to identify structural features like conjugation, ring strain, or heteroatom substitution; given an unfamiliar carbonyl compound's structure, correctly determining whether McLafferty rearrangement is even possible based on gamma-hydrogen availability.

## 3. Why Beginners Fail

Students, first learning that "carbonyl compounds show a strong C=O stretch around 1715 cm-1," often memorize this single number as THE signature of any carbonyl, missing that the position shifts systematically and diagnostically with structural features — conjugation with an adjacent pi system lowers the frequency (the C=O bond order decreases as it shares double-bond character with the conjugated system), ring strain in small rings raises the frequency (increased s-character in the ring's C-C(=O)-C bond strengthens the C=O bond), and electronegative substituents (as in esters or acid chlorides) raise the frequency (inductive withdrawal reduces electron donation from the adjacent oxygen/halogen lone pair into the carbonyl, strengthening the C=O bond) — so relying on a single fixed number discards genuinely diagnostic structural information; and students, learning the McLafferty rearrangement as "a way carbonyl compounds fragment in mass spec," sometimes apply it as if it always happens to any carbonyl compound, missing the strict structural REQUIREMENT for a gamma-hydrogen (positioned exactly three atoms from the carbonyl carbon) to participate in the specific six-membered cyclic transition state — a compound genuinely lacking any accessible gamma-hydrogen cannot undergo this rearrangement, no matter how it's drawn or how favorable the resulting fragments might otherwise seem.

## 4. Misconception Library

### MC-1: The carbonyl C=O IR stretch is always at a fixed ~1715 cm-1
- **Probe**: "Cyclohexanone shows a C=O stretch around 1715 cm-1. Would you expect cyclobutanone's C=O stretch to appear at essentially the same frequency?"
- **Characteristic phrase**: "All carbonyls show their C=O stretch around 1715 cm-1."
- **Trigger (Type 1, overgeneralization from a single representative example)**: Students memorize one textbook value for "the carbonyl stretch" and apply it universally without checking for conjugation, ring strain, or substituent effects.
- **Conflict evidence [P28]**: Cyclobutanone's C=O stretch appears at a notably HIGHER frequency (~1775 cm-1) than cyclohexanone's (~1715 cm-1), because the four-membered ring's strain forces more s-character into the ring C-C(=O)-C bonds, which correspondingly strengthens (raises the force constant of) the C=O bond. Conversely, a conjugated enone like methyl vinyl ketone shows its C=O stretch at a notably LOWER frequency (~1675 cm-1), because conjugation with the adjacent alkene delocalizes some double-bond character away from the C=O bond, weakening it. The exact frequency is diagnostic, not a fixed universal constant.
- **Bridge [P30]**: The C=O stretching frequency directly reflects the C=O bond's force constant (effectively its bond strength/order), which is systematically modulated by ring strain (raises it, via s-character changes), conjugation (lowers it, via delocalization), and electronegative substituents (raises it, via reduced lone-pair donation into the carbonyl) — treating the frequency as fixed discards this rich diagnostic structural information.
- **Replacement [P31]**: The carbonyl C=O stretch shifts systematically with structure — conjugation lowers it, ring strain raises it, electronegative substituents raise it — the specific value, not a fixed universal number, is diagnostic of the carbonyl's structural environment.
- **Discrimination pairs [P33]**: Cyclobutanone (~1775 cm-1, ring-strain-raised) vs. cyclohexanone (~1715 cm-1, unstrained baseline) vs. methyl vinyl ketone (~1675 cm-1, conjugation-lowered).
- **S6 repair path**: Present the explicit three-compound frequency comparison, deriving the shift direction from each structural feature (ring strain, conjugation).

### MC-2: McLafferty rearrangement occurs for any carbonyl compound in mass spec
- **Probe**: "Does every carbonyl compound undergo McLafferty rearrangement in its mass spectrum, or does it depend on the compound's structure?"
- **Characteristic phrase**: "McLafferty rearrangement is just how carbonyl compounds fragment in mass spec, so it should happen for any of them."
- **Trigger (Type 1, overgeneralization treating a named fragmentation as universally applicable to a compound class)**: Students treat McLafferty rearrangement as a generic property of "carbonyl compounds" rather than a mechanism with a strict structural prerequisite.
- **Conflict evidence [P28]**: McLafferty rearrangement specifically requires a gamma-hydrogen — a hydrogen atom on the carbon three positions away from the carbonyl carbon — positioned so that a SIX-MEMBERED cyclic transition state can form, transferring that gamma-hydrogen to the carbonyl oxygen while the C(alpha)-C(beta) bond simultaneously cleaves, releasing a neutral alkene and forming an enol radical cation. A carbonyl compound that genuinely lacks any gamma-hydrogen (for example, one with a quaternary carbon at the gamma position, or a chain too short to reach a gamma carbon at all) CANNOT undergo this specific rearrangement — it would instead fragment via other pathways (like simple alpha-cleavage) exclusively.
- **Bridge [P30]**: McLafferty rearrangement is not a generic "carbonyl fragmentation" — it is one SPECIFIC mechanism among several possible carbonyl fragmentation pathways, gated by a precise geometric/structural requirement (an accessible gamma-hydrogen enabling the six-membered transition state) — compounds failing this requirement simply do not have this pathway available, regardless of being carbonyl compounds.
- **Replacement [P31]**: McLafferty rearrangement requires an accessible gamma-hydrogen for its six-membered cyclic transition state — a carbonyl compound lacking a gamma-hydrogen cannot undergo this rearrangement, even though it may still fragment via other pathways like alpha-cleavage.
- **Discrimination pairs [P33]**: A ketone with an accessible gamma-hydrogen (undergoes McLafferty rearrangement, six-membered TS) vs. a ketone with no gamma-hydrogen available, e.g., due to a quaternary gamma-carbon (McLafferty rearrangement structurally impossible, fragments via alpha-cleavage instead).
- **S6 repair path**: Present the explicit six-membered transition-state diagram alongside a counter-example lacking a gamma-hydrogen, deriving the structural requirement.

## 5. Explanation Library

**Primary explanation**: The carbonyl C=O IR stretch frequency reflects the C=O bond's force constant, which shifts systematically with structure — conjugation lowers the frequency (delocalizes double-bond character away from C=O), ring strain raises it (increased s-character strengthens the bond), and electronegative substituents raise it (reduced lone-pair donation into the carbonyl) — the specific shifted value is itself diagnostic, not noise around a fixed number.

**Secondary explanation (McLafferty rearrangement's structural requirement)**: McLafferty rearrangement proceeds through a six-membered cyclic transition state requiring a gamma-hydrogen to transfer to the carbonyl oxygen as the C(alpha)-C(beta) bond cleaves — a carbonyl compound without an accessible gamma-hydrogen cannot undergo this specific rearrangement, regardless of being a carbonyl compound in general.

## 6. Analogy Library

- **Primary analogy**: A tuning fork's pitch (the C=O stretch frequency) that shifts measurably depending on subtle changes to its material or shape (conjugation, ring strain, substituents) — the "note" it plays is itself informative about what changed, not just confirmation that "a tuning fork was struck."
- **Breaking point**: The tuning-fork analogy conveys the diagnostic-shift concept for IR (MC-1) well but doesn't naturally capture the strict geometric gamma-hydrogen requirement for McLafferty rearrangement (MC-2) — that needs the explicit six-membered transition-state diagram.
- **Anti-analogy**: Do NOT say "all ketones show their carbonyl peak in the same place around 1715" — this directly reinforces MC-1 by discarding the diagnostic shift information.

## 7. Demonstration Library

- **Demonstration 1 (three-compound C=O frequency comparison)**: Present the explicit cyclobutanone/cyclohexanone/methyl-vinyl-ketone frequency comparison, deriving the shift direction from each structural feature.
- **Demonstration 2 (six-membered McLafferty transition-state diagram with a gamma-hydrogen-free counter-example)**: Present the explicit mechanism alongside a compound lacking a gamma-hydrogen, deriving the structural requirement.

## 8. Discovery Lesson

**Opening**: "Cyclohexanone shows a C=O stretch around 1715 cm-1. Would you expect cyclobutanone's C=O stretch to appear at essentially the same frequency?"

**Exploration**: Students examine the three-compound frequency comparison, discovering the systematic structural shifts.

**Synthesis**: Guide toward: the specific C=O frequency is diagnostic of conjugation, ring strain, and substituents, not a fixed universal number.

**Closure**: "Does every carbonyl compound undergo McLafferty rearrangement in its mass spectrum, or does it depend on the compound's structure?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit three-compound C=O frequency comparison (ring-strained, baseline, conjugated).
- **TA-2 (TELL)**: State the gamma-hydrogen requirement for McLafferty rearrangement explicitly, anchored to the six-membered transition-state diagram.
- **TA-3 (DO)**: Student predicts the qualitative C=O stretch shift direction for an unfamiliar carbonyl compound given its structural features, and determines whether McLafferty rearrangement is possible for an unfamiliar structure.
- **TA-4 (TEST-THINKING)**: Present the MC-2 probe and ask the student to justify why a compound lacking a gamma-hydrogen cannot undergo McLafferty rearrangement.

## 10. Voice Teaching

Whenever a carbonyl IR stretch is analyzed, narrate "check for conjugation, ring strain, or electronegative substituents — the exact frequency tells you which." Whenever McLafferty rearrangement is considered, state "check for a gamma-hydrogen first — no gamma-hydrogen means no McLafferty" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly predict the direction of C=O stretch frequency shift from conjugation/ring-strain/substituent effects, (b) correctly determine whether McLafferty rearrangement is structurally possible for a given carbonyl compound.

- **FA-1**: "Cyclohexanone shows a C=O stretch around 1715 cm-1. Would you expect cyclobutanone's C=O stretch to appear at essentially the same frequency?" — targets MC-1.
- **FA-2**: "Does every carbonyl compound undergo McLafferty rearrangement in its mass spectrum, or does it depend on the compound's structure?" — targets MC-2.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-2 among students who have only seen McLafferty rearrangement examples with an obvious gamma-hydrogen present and never a counter-example lacking one.

**Delayed retrieval**: Re-probe MC-1's diagnostic-shift reasoning and MC-2's gamma-hydrogen requirement as foundational knowledge for subsequent structure-elucidation applications combining IR, NMR, and mass spectrometry.

## 12. Recovery Notes

- **S3 (stuck)**: For the fixed-frequency confusion, have the student explicitly identify any conjugation, ring strain, or electronegative substituents present before predicting a C=O stretch frequency.
- **S4 (frustrated)**: Normalize — memorizing a single "carbonyl frequency" number is a genuinely common first-exposure simplification, since one representative value is often taught first.
- **S6 (collision)**: Use the explicit six-membered transition-state diagram with a gamma-hydrogen-free counter-example for MC-2.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a quaternary carbon at the gamma position blocks McLafferty rearrangement.

## 13. Memory & Review

Tag as two conceptual-correction memories (diagnostic C=O frequency shifts; gamma-hydrogen requirement for McLafferty rearrangement). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates general spectroscopy reasoning (`chem.org.spectroscopy`) and ketone reasoning (`chem.carb.ketones`), forming a capstone application to structure-elucidation contexts combining IR, NMR, and mass spectrometry.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
