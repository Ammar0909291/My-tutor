# chem.period.modern-periodic-law — The Modern Periodic Law

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.period.modern-periodic-law` |
| Domain | Periodic Table & Periodicity |
| Requires | `chem.period.classification`, `chem.atomic.electronic-config` |
| Unlocks | `chem.bond.metallic-bonding`, `chem.period.atomic-radius`, `chem.period.electron-affinity`, `chem.period.ionization-energy`, `chem.period.valency`, `chem.sblock.hydrogen` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

The modern periodic law states that the properties of elements are a periodic function of their atomic number (not atomic mass), organized into the long-form periodic table by periods (rows, sharing the same highest principal quantum number n) and groups (columns, sharing the same valence electron configuration pattern), further divided into s-, p-, d-, and f-blocks based on which subshell is being filled — with hydrogen's placement in Group 1 reflecting only its 1s¹ valence configuration, not a genuine chemical kinship with the alkali metals, whose characteristic reactive-metal chemistry hydrogen does not share.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Placing argon and potassium correctly in the modern table (Ar before K, despite Ar being heavier) using their atomic numbers (18 and 19) rather than their masses (≈40 and ≈39).

**Representational**: A blank long-form periodic table outline with s/p/d/f block regions shaded differently, to be filled in using electron configuration block-membership rules.

**Abstract**: The general principle — period number = highest n present; group/block membership = valence electron configuration pattern; d-block period n fills (n−1)d, not nd.

**Transfer**: Correctly placing an unfamiliar element in the modern table (period, group, block) purely from its electron configuration, and correctly evaluating whether hydrogen's Group 1 placement implies it shares alkali-metal chemistry.

## 3. Why Beginners Fail

Students, having learned Mendeleev's mass-based ordering first with only brief mention of Moseley's correction, continue treating atomic mass as the modern table's organizing principle; they overextend the correct "period number = n" rule from s/p blocks (where it holds) onto the d-block, incorrectly writing period 4's transition metals as filling 4d instead of the correct (n−1)d = 3d; and they infer from hydrogen's Group 1 position that it must share alkali-metal chemical behavior, when in fact hydrogen's non-metallic gaseous nature and much higher ionization energy set it clearly apart.

## 4. Misconception Library

### MC-1: Mendeleev's law (atomic mass) is the modern periodic law
- **Probe**: "Why is argon (Ar, Z=18, mass≈40) placed before potassium (K, Z=19, mass≈39) in the modern table?"
- **Characteristic phrase**: "The periodic table orders elements by increasing atomic mass."
- **Trigger (Type 5, instruction-induced)**: The historical narrative typically presents Mendeleev as the culminating figure, with Moseley's atomic-number correction mentioned only briefly and under-emphasized.
- **Conflict evidence [P28]**: Mendeleev's mass-based ordering forced him to swap several pairs against strict mass order (Ar/K, Te/I, Co/Ni) purely to preserve correct chemical groupings; Moseley later explained why — the fundamental organizing quantity is atomic number Z, and ordering strictly by Z places Ar (Z=18) correctly before K (Z=19) without any forced exception.
- **Bridge [P30]**: Mendeleev's table worked well because mass and atomic number happen to increase together for most elements — but the modern periodic law is explicitly defined in terms of atomic number, not mass, and the exception cases are exactly where this distinction becomes visible.
- **Replacement [P31]**: The modern periodic law states element properties are a periodic function of atomic number Z, not atomic mass.
- **Discrimination pairs [P33]**: Mass-based ordering (Mendeleev, requires forced exceptions like Ar/K) vs. atomic-number-based ordering (modern, no exceptions needed).
- **S6 repair path**: Present the Ar/K numeric comparison directly and ask which ordering avoids the forced exception.

### MC-2: The d-block fills the same n as the period number
- **Probe**: "Fe is in period 4, Group 8, d-block. What subshell are its d electrons in?"
- **Characteristic phrase**: "Fe has electrons in 4d because it's in period 4."
- **Trigger (Type 5, instruction-induced from the n = period rule for s/p blocks)**: Students correctly learn "period 2 fills n=2" for s/p-block elements and incorrectly extend the same rule directly to the d-block.
- **Conflict evidence [P28]**: d-block elements fill (n−1)d, not nd — period 4 fills 3d (plus 4s), period 5 fills 4d — because 4s has lower energy than 3d at the time of filling (Aufbau order: 4s before 3d); Fe's actual configuration is [Ar]3d⁶4s², placing its d electrons in 3d, not 4d.
- **Bridge [P30]**: The period-number-equals-n rule genuinely does hold for the highest-energy subshell being filled in s/p-block elements, but the d-block's filling pattern is offset by one because of the specific 4s-before-3d energy ordering established in `chem.atomic.electronic-config` — the rule that works for one block region doesn't transfer directly to another.
- **Replacement [P31]**: For d-block elements in period n, the d subshell being filled is (n−1)d, always offset by one from the period number.
- **Discrimination pairs [P33]**: s/p-block period 4 (fills n=4, i.e., 4s/4p) vs. d-block period 4 (fills (n−1)=3d, offset by one) — same period number, different filling rule by block.
- **S6 repair path**: Return to Fe's full configuration [Ar]3d⁶4s² and have the student identify which subshell number actually appears for the d electrons.

### MC-3: Hydrogen is an alkali metal
- **Probe**: "Is hydrogen an alkali metal? Justify your answer."
- **Characteristic phrase**: "Hydrogen is an alkali metal because it's in Group 1."
- **Trigger (Type 3, language contamination)**: Seeing hydrogen positioned in Group 1 alongside Li, Na, K leads students to apply the group's common chemical label ("alkali metal") to hydrogen automatically.
- **Conflict evidence [P28]**: Alkali metals (Li, Na, K, Rb, Cs, Fr) are soft, reactive metals that react vigorously with water; hydrogen is a non-metal gas at room temperature, also forms the H⁻ ion (a behavior shared with halogens, not alkali metals), and has an ionization energy (1312 kJ/mol) far higher than any alkali metal — chemically, hydrogen behaves unlike the rest of Group 1 in most respects.
- **Bridge [P30]**: Hydrogen's Group 1 placement reflects only its 1s¹ valence electron configuration (one valence electron, matching the alkali-metal pattern structurally) — this positional/configurational similarity does not imply matching chemical behavior, which depends on far more than valence electron count alone.
- **Replacement [P31]**: Hydrogen's periodic table position is a configurational convenience (1s¹), not a claim of shared chemistry with alkali metals — its actual chemistry (non-metallic, high ionization energy, forms both H⁺ and H⁻) is genuinely unique, and some periodic tables place it separately for exactly this reason.
- **Discrimination pairs [P33]**: Sodium (soft reactive metal, reacts vigorously with water, forms Na⁺ only) vs. hydrogen (non-metal gas, moderate reactivity, forms both H⁺ and H⁻).
- **S6 repair path**: Present the ionization-energy comparison and the H⁻ ion fact directly as concrete evidence hydrogen's chemistry diverges sharply from the alkali metals.

## 5. Explanation Library

**Primary explanation**: The modern periodic law states that element properties recur periodically as a function of atomic number. The long-form periodic table organizes elements into periods (rows, sharing the same highest principal quantum number n for their outermost electrons) and groups (columns, sharing the same valence electron configuration pattern), further divided into s-, p-, d-, and f-blocks by which subshell type is being filled — with the d-block's filling pattern offset by one period relative to its nominal period number, due to the 4s-before-3d (and analogous) energy ordering.

**Secondary explanation (hydrogen framing)**: Hydrogen sits in Group 1 purely because its single valence electron (1s¹) matches the alkali metals' one-valence-electron pattern structurally — but this positional placement doesn't extend to genuine chemical kinship, since hydrogen's actual reactivity, physical state, and ion-forming behavior (both H⁺ and H⁻) diverge sharply from true alkali-metal chemistry.

## 6. Analogy Library

- **Primary analogy**: A library organized by a strict cataloguing number (atomic number) rather than by book weight (atomic mass) — occasionally a heavier book (Ar) genuinely belongs before a lighter one (K) on the shelf, and only the cataloguing-number system gets this right every time.
- **Breaking point**: The library analogy conveys the mass-vs-number ordering principle well but doesn't naturally capture the d-block's (n−1) filling offset — that needs the explicit electron-configuration energy-ordering argument.
- **Anti-analogy**: Do NOT say "hydrogen is basically an alkali metal, just lighter" — this directly reinforces MC-3.

## 7. Demonstration Library

- **Demonstration 1 (block-region mapping)**: Give students a blank long-form periodic table outline and have them shade in the s/p/d/f block regions using only electron-configuration rules, discovering the d-block's (n−1) offset themselves by checking a specific element like Fe.
- **Demonstration 2 (hydrogen chemistry comparison table)**: Build a side-by-side comparison table of hydrogen vs. sodium across physical state, reactivity with water, ionization energy, and ion types formed, making the chemical divergence concrete.

## 8. Discovery Lesson

**Opening**: "Fe is in period 4. Do you think its d electrons are in the 4d or the 3d subshell?"

**Exploration**: Students write out Fe's full electron configuration from `chem.atomic.electronic-config` and identify which subshell number actually appears for its d electrons, discovering the offset directly.

**Synthesis**: Guide toward: the d-block's filling subshell is always one less than the period number, because of the specific 4s-before-3d energy ordering established previously.

**Closure**: "Given everything you now know about hydrogen's actual chemistry, does its Group 1 position mean it IS an alkali metal, or just that it's structurally placed near them?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the Ar/K atomic-number-vs-mass comparison as the direct anchor for the modern periodic law's definition.
- **TA-2 (TELL)**: State the d-block (n−1) offset rule explicitly, worked through for Fe's configuration.
- **TA-3 (DO)**: Student maps a given unfamiliar element to its period, group, and block using only its electron configuration.
- **TA-4 (TEST-THINKING)**: Present MC-3's probe and ask the student to argue for or against hydrogen's alkali-metal classification using the comparison table.

## 10. Voice Teaching

Whenever period number is discussed for a d-block element, immediately state the (n−1) offset aloud before naming any specific subshell, to preempt MC-2 rather than repair it afterward. When first introducing hydrogen's periodic table position, lead with "structurally placed, not chemically identical" before naming its group number, to preempt MC-3.

## 11. Assessment

**Mastery gate**: Student can (a) state the modern periodic law in terms of atomic number, not mass, (b) correctly identify a d-block element's actual filling subshell using the (n−1) rule, (c) correctly evaluate whether hydrogen's Group 1 position implies alkali-metal chemistry.

- **FA-1**: "Why is argon placed before potassium in the modern table despite being heavier?" — targets MC-1.
- **FA-2**: "Fe is in period 4, d-block. What subshell are its d electrons in?" — targets MC-2.
- **FA-3**: "Is hydrogen an alkali metal? Justify your answer." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students transferring the correct s/p-block period-number rule directly onto the d-block without adjustment.

**Delayed retrieval**: Re-probe MC-1's atomic-number ordering before `chem.period.ionization-energy`/`chem.period.atomic-radius` introduce periodic trends that are explicitly explained in terms of atomic number and effective nuclear charge, not mass.

## 12. Recovery Notes

- **S3 (stuck)**: For the d-block offset, return directly to Fe's written-out configuration and have the student read off the subshell number themselves rather than applying a rule from memory.
- **S4 (frustrated)**: Normalize — the s/p-block period-number rule genuinely does work perfectly for two of the four blocks, making the d-block exception a reasonable, common trap.
- **S6 (collision)**: Use the Ar/K numeric comparison for MC-1; use the hydrogen-vs-sodium comparison table for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why the d-block's period number doesn't directly match its filling subshell number.

## 13. Memory & Review

Tag as a definitional-correction memory (atomic number, not mass) plus a procedural-rule memory (block-to-subshell mapping) plus a conceptual-correction memory (hydrogen's unique chemistry). Schedule a spaced check at ~1 week and again before `chem.period.ionization-energy`.

## 14. Transfer Map

Feeds directly into `chem.period.atomic-radius`, `chem.period.electron-affinity`, `chem.period.ionization-energy`, `chem.period.valency` (all periodic-trend concepts assume fluent block/period/group mapping established here), `chem.bond.metallic-bonding` (block classification underlies metallic character trends), and `chem.sblock.hydrogen` (directly resolves and extends hydrogen's unique-placement discussion).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
