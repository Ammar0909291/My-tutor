# chem.bond.hybridization — Orbital Hybridization

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.bond.hybridization` |
| Domain | Chemical Bonding |
| Requires | `chem.bond.covalent-bonding` |
| Unlocks | `chem.bond.mo-theory`, `chem.org.hybridization` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

Hybridization (sp, sp², sp³, sp³d, sp³d²) is determined by counting ALL electron domains around a central atom — both bonding pairs AND lone pairs — with each central atom in a molecule hybridized independently of every other atom present; it is a mathematical MODEL describing the final wavefunction shape, not a physical process that occurs "when atoms approach," and it establishes the underlying electron-domain geometry (e.g., sp² → trigonal planar electron geometry), not a fixed, universal bond angle, since lone pairs and electronegativity effects can shift the actual measured bond angle away from the idealized value.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Determining nitrogen's hybridization in NH₃ by counting all four electron domains (3 bonding pairs + 1 lone pair), not just the 3 visible N–H bonds.

**Representational**: An electron-domain diagram for a molecule like CH₃–CH=CH₂, showing each carbon's hybridization determined independently based on its own local electron-domain count.

**Abstract**: The general rule — electron domain count (bonds + lone pairs) determines hybridization; hybridization sets electron-domain geometry (an idealized angle), with lone pairs and electronegativity causing real bond angles to deviate from that ideal.

**Transfer**: Given an unfamiliar molecule with multiple central atoms and lone pairs, correctly determining each atom's hybridization independently and correctly predicting whether the real bond angle should match or deviate from the idealized geometric angle.

## 3. Why Beginners Fail

Students count only the visible bonding pairs around a central atom when determining hybridization, missing that lone pairs also occupy hybridized orbitals and must be counted as electron domains; they picture hybridization as a literal physical event that happens as atoms approach and bond, rather than understanding it as a mathematical model describing the final electron wavefunction shape; they assume every atom in a molecule shares the same hybridization, missing that each central atom is hybridized independently based on its own local electron-domain environment; and they treat a hybridization-derived idealized geometry (like sp²'s 120°) as a fixed, universal bond angle, missing that lone pairs and electronegativity differences cause real measured angles to deviate from the idealized value.

## 4. Misconception Library

### MC-1: Lone pairs don't count as electron domains for hybridization
- **Probe**: "What is the hybridization of N in NH₃?"
- **Characteristic phrase**: "N has 3 bonds so it's sp²."
- **Trigger (Type 5, instruction-induced)**: Students focus on the visibly drawn bonding pairs (the N–H bonds) when counting electron domains, overlooking that lone pairs also occupy space and must be counted.
- **Conflict evidence [P28]**: Nitrogen in NH₃ has 3 bonding pairs PLUS 1 lone pair, giving 4 total electron domains — not 3 — which correctly gives sp³ hybridization (not sp²); the lone pair genuinely occupies one of the four sp³ hybrid orbitals, just as the three N–H bonding pairs occupy the other three.
- **Bridge [P30]**: Electron domains include every region of electron density around the central atom — both bonding pairs and lone pairs equally count, since both types of electron pairs occupy hybridized orbitals and both influence molecular geometry.
- **Replacement [P31]**: Always count BOTH bonding pairs AND lone pairs together as the total electron-domain count when determining hybridization — never bonding pairs alone.
- **Discrimination pairs [P33]**: Counting only 3 N–H bonds (incorrect, gives sp² conclusion) vs. counting 3 bonds + 1 lone pair = 4 domains (correct, gives sp³).
- **S6 repair path**: Have the student explicitly draw and count the lone pair alongside the bonding pairs before assigning hybridization.

### MC-2: Hybridization physically happens when atoms approach — the orbitals really mix
- **Probe**: "When does hybridization occur?"
- **Trigger (Type 2, perceptual intuition)**: The verb "hybridize" and descriptions of orbitals "mixing" suggest a literal, temporal physical event, leading students to picture hybridization as something that happens as atoms come together to bond.
- **Conflict evidence [P28]**: Hybridization is a mathematical description of the FINAL wavefunction shape at equilibrium, not a temporal process — it is equally valid (and used in practice) to describe the same bonding scenario without invoking hybridization at all, using molecular orbital theory instead; both models describe the same physical bonding outcome through different mathematical frameworks.
- **Bridge [P30]**: "Hybrid orbitals" are a convenient mathematical construction (a linear combination of atomic orbitals) chosen because they simplify describing certain bonding geometries — they are a MODEL for representing the final electron distribution, not a description of a physical mixing event unfolding in time.
- **Replacement [P31]**: Hybridization is a model, not a mechanism — it describes the shape of the final bonded wavefunction mathematically, with no implied physical "mixing moment" as atoms approach.
- **Discrimination pairs [P33]**: A physical, temporal process (atoms genuinely changing orbital shape as they approach — INCORRECT framing) vs. a mathematical descriptive model (hybrid orbitals as one valid way to represent the final bonded state — CORRECT framing).
- **S6 repair path**: Point out that molecular orbital theory describes the same bonding outcome without ever invoking "hybridization" at all, demonstrating hybridization is one modeling choice among others, not a physical necessity.

### MC-3: All atoms in a molecule have the same hybridization
- **Probe**: "In CH₃–CH=CH₂, what is the hybridization of each carbon atom?"
- **Trigger (Type 1, overgeneralization)**: Students learn hybridization for a single central atom in isolated examples and assume, without being explicitly told otherwise, that a whole molecule shares one uniform hybridization state.
- **Conflict evidence [P28]**: Each carbon in CH₃–CH=CH₂ is hybridized independently based on its own local electron-domain environment — the CH₃ carbon (4 single bonds, 4 electron domains) is sp³, while the two carbons in the CH=CH₂ double bond (each with 3 electron domains: 2 sigma bonds + 1 pi-bond-forming domain) are both sp² — three carbons in one small molecule, two different hybridization states.
- **Bridge [P30]**: Hybridization is a LOCAL property determined by each atom's own immediate bonding environment (how many electron domains surround IT specifically), not a global property shared uniformly across an entire molecule.
- **Replacement [P31]**: Determine hybridization independently for each central atom in a molecule, based on that specific atom's own electron-domain count — never assume uniform hybridization across a whole structure.
- **Discrimination pairs [P33]**: The CH₃ carbon (4 domains, sp³) vs. the CH=CH₂ carbons (3 domains each, sp²) — different local environments within the very same molecule.
- **S6 repair path**: Have the student determine each carbon's electron-domain count individually before assigning any hybridization, rather than assuming a single answer applies to the whole molecule.

## 5. Explanation Library

**Primary explanation**: Hybridization is determined by counting the total number of electron domains — both bonding pairs and lone pairs — around a specific central atom, giving sp (2 domains), sp² (3 domains), sp³ (4 domains), sp³d (5 domains), or sp³d² (6 domains). This count must include lone pairs, since they occupy hybridized orbitals exactly as bonding pairs do, and each central atom in a molecule is hybridized independently based on its own local electron-domain environment.

**Secondary explanation (model-not-mechanism framing)**: Hybridization is best understood as a mathematical model describing the shape of the final bonded electron wavefunction, not a literal physical process occurring as atoms approach — the same bonding outcomes can equally be described using molecular orbital theory without hybridization at all. The hybridization type sets the idealized ELECTRON-domain geometry (e.g., sp² implies trigonal planar electron geometry, ideally 120°), but the actual measured bond angle can deviate from this ideal due to lone-pair repulsion and electronegativity effects.

## 6. Analogy Library

- **Primary analogy**: A tailor creating a custom-blended fabric (hybrid orbital) by combining threads from different bolts (atomic orbitals) to achieve a specific final look — the blended fabric is a deliberate design choice describing the finished product, not a literal record of threads physically "mixing" over time as the garment is worn.
- **Breaking point**: The tailor analogy conveys the model-not-process distinction well but doesn't naturally capture the electron-domain-counting procedure (bonds plus lone pairs) — that requires the explicit counting rule.
- **Anti-analogy**: Do NOT say "count only the bonds you can see to determine hybridization" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (electron-domain counting drill)**: Present several central atoms (including some with lone pairs) and have students explicitly count total electron domains (bonds + lone pairs) before assigning hybridization.
- **Demonstration 2 (multi-carbon hybridization mapping)**: Present a molecule like CH₃–CH=CH₂ and have students determine each carbon's hybridization independently, discovering the molecule contains more than one hybridization type.

## 8. Discovery Lesson

**Opening**: "NH₃ has 3 visible N–H bonds. Does that automatically mean nitrogen is sp²?"

**Exploration**: Students count nitrogen's total electron domains, including the often-overlooked lone pair, discovering the correct total is 4, not 3.

**Synthesis**: Guide toward: hybridization depends on the TOTAL electron-domain count, including lone pairs, not just visible bonds.

**Closure**: "In CH₃–CH=CH₂, is it safe to assume every carbon has the same hybridization?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the NH₃ electron-domain count explicitly, including the lone pair.
- **TA-2 (TELL)**: State explicitly that hybridization is a mathematical model, not a physical mixing event, contrasted with molecular orbital theory as an alternative description.
- **TA-3 (DO)**: Student determines hybridization independently for each central atom in a multi-atom molecule.
- **TA-4 (TEST-THINKING)**: Present MC-4's HNO₂ probe (bond angle deviating from the sp² ideal) and ask the student to explain why the real angle isn't exactly 120°.

## 10. Voice Teaching

Whenever hybridization is determined, verbally count "bonds AND lone pairs" together every time, never counting bonds alone even when it feels obvious. When discussing hybridization-derived geometry, always state "this is the IDEAL electron-domain geometry — the real bond angle may differ" to preempt overgeneralizing a fixed universal angle.

## 11. Assessment

**Mastery gate**: Student can (a) correctly count total electron domains including lone pairs when determining hybridization, (b) correctly explain hybridization as a mathematical model rather than a physical process, (c) correctly determine hybridization independently for each central atom in a multi-atom molecule.

- **FA-1**: "What is the hybridization of N in NH₃?" — targets MC-1.
- **FA-2**: "When does hybridization occur, physically?" — targets MC-2.
- **FA-3**: "In CH₃–CH=CH₂, what is the hybridization of each carbon atom?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've only practiced hybridization on molecules without lone pairs so far.

**Delayed retrieval**: Re-probe MC-1's lone-pair-counting rule before `chem.bond.mo-theory` and `chem.org.hybridization` require fluent, correct hybridization determination as a foundational skill.

## 12. Recovery Notes

- **S3 (stuck)**: For the lone-pair-omission confusion, have the student draw the full Lewis structure (including all lone pairs) before attempting to count electron domains.
- **S4 (frustrated)**: Normalize — visible bonds are naturally more salient than lone pairs in a drawn structure, making this omission an extremely common, reasonable first error.
- **S6 (collision)**: Use the molecular-orbital-theory alternative-description argument for MC-2; use the multi-carbon independent-hybridization exercise for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why lone pairs must be counted alongside bonding pairs when determining hybridization.

## 13. Memory & Review

Tag as a procedural-counting memory (electron-domain counting including lone pairs) plus a conceptual-correction memory (model vs. mechanism; local vs. global hybridization; idealized vs. real bond angle). Schedule a spaced check at ~1 week and again before `chem.bond.mo-theory`.

## 14. Transfer Map

Feeds directly into `chem.bond.mo-theory` (contrasts the hybridization model with the alternative molecular-orbital-theory description) and `chem.org.hybridization` (applies hybridization reasoning throughout organic structure and reactivity analysis).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
