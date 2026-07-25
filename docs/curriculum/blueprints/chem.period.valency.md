# chem.period.valency — Valency and Oxidation States

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.period.valency` |
| Domain | Periodic Table & Periodicity |
| Requires | `chem.period.modern-periodic-law` |
| Unlocks | `chem.redox.oxidation-state` |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

The group number gives the MAXIMUM possible valency for period 3+ elements, not a fixed valency — sulfur (Group 16) has valency 2 in H₂S (using its 2 ground-state unpaired electrons) but valency 6 in H₂SO₄ (using expanded valency, enabled by accessible 3d orbitals), while period 2 elements (like carbon in Group 14) genuinely cannot exceed a valency of 4, having no accessible d orbitals for expansion; this same period-2-vs-period-3+ distinction explains why PCl₅ exists (P, period 3, has accessible 3d orbitals) but NCl₅ cannot exist (N, period 2, has only 2s/2p orbitals, capping its maximum valency at 4, as in NH₄⁺'s dative bond); and oxidation state is a BOOKKEEPING CONVENTION, not a claim about literal electron loss — Mn's +7 oxidation state in KMnO₄ means "if all bonds were treated as fully ionic, 7 electrons would be formally assigned away from Mn," not that Mn has literally lost 7 real electrons (the real electron density around Mn remains substantial, since actual bonds are covalent, not fully ionic).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing sulfur's valency in H₂S (2, using ground-state unpaired electrons) against H₂SO₄ (6, using expanded valency via accessible 3d orbitals) — same element, genuinely different valencies in different compounds.

**Representational**: A period-2-vs-period-3 orbital-availability diagram, showing period 2's cap at n=2 orbitals (max 4 bonds) contrasted with period 3's additional accessible 3d orbitals (enabling expanded valency beyond 4).

**Abstract**: The general principle that group number sets a maximum valency ceiling for period 3+ elements (with actual valency varying by compound), while period 2 elements have a hard, non-negotiable cap at 4; the general principle that oxidation state is a formal accounting convention (assuming fully ionic bonding for counting purposes), never a literal description of actual electron loss.

**Transfer**: Given an unfamiliar element and compound, correctly determining its valency (not assuming it always equals the group number), correctly predicting whether an analogous compound (like a period-2 element's hypothetical expanded-valency compound) can actually exist, and correctly interpreting an assigned oxidation state as a formal convention, not a literal electron count.

## 3. Why Beginners Fail

Students learn "group number = valency" as an early simplifying shortcut and apply it universally to all compounds of an element, missing that this only gives the MAXIMUM possible valency for period 3+ elements — the ACTUAL valency in a specific compound depends on how many unpaired electrons (ground-state or expanded via d-orbital promotion) are actually used for bonding; they extend valid period-3+ expanded-valency examples (like PCl₅) directly onto period-2 elements in the same group (writing NCl₅ by analogy with PCl₅), missing that period 2 elements genuinely lack any accessible d orbitals, making valency expansion beyond 4 physically impossible for them; and they interpret oxidation state as a literal count of electrons actually lost by an atom, missing that it's a formal bookkeeping convention (assuming fully ionic bond-splitting for counting purposes) rather than a description of the atom's genuine electron density, which remains substantial even for high formal oxidation states.

## 4. Misconception Library

### MC-1: Valency of S is always 6 (or of Cl is always 7) because they are in Groups 16 and 17
- **Probe**: "What is the valency of S in H₂S? What is it in H₂SO₄? Explain."
- **Characteristic phrase**: "S is in Group 16, so its valency is 6 in all compounds."
- **Trigger (Type 5, instruction-induced)**: Early valency instruction uses "group number = valency" as a simplifying shortcut, and students internalize this as a universal, fixed value rather than a maximum-possible ceiling that varies by compound.
- **Conflict evidence [P28]**: Sulfur's valency in H₂S is genuinely 2 (S has 2 unpaired electrons in its ground-state configuration, forming exactly 2 bonds, one to each H); sulfur's valency in H₂SO₄ is genuinely 6 (S uses EXPANDED valency here, enabled specifically because sulfur is a period-3 element with accessible 3d orbitals allowing electron promotion) — the same element, sulfur, genuinely exhibits two different valencies in these two different compounds, directly contradicting a fixed "always 6" assumption.
- **Bridge [P30]**: The group number gives the MAXIMUM possible valency for period 3+ elements (which have accessible d orbitals enabling valency expansion) — but the ACTUAL valency in any specific compound depends on how many bonds are actually formed, which can be less than this maximum (using only ground-state unpaired electrons, as in H₂S) or up to the maximum (using expanded valency, as in H₂SO₄).
- **Replacement [P31]**: Group number gives the maximum possible valency for period 3+ elements — actual valency in a specific compound varies and must be determined from that compound's actual bonding, not assumed fixed at the group number.
- **Discrimination pairs [P33]**: S in H₂S (valency 2, ground-state unpaired electrons only) vs. S in H₂SO₄ (valency 6, expanded valency via accessible 3d orbitals) — same element, genuinely different valencies.
- **S6 repair path**: Present both compounds' actual bonding explicitly, having the student count the real number of bonds S forms in each.

### MC-2: N can form NCl₅ by analogy with PCl₅
- **Probe**: "PCl₅ is a stable compound. Can NCl₅ exist? Explain."
- **Characteristic phrase**: "NCl₅ can exist because N and P are in the same group and P can form PCl₅."
- **Trigger (Type 6, analogy overextension)**: Students correctly learn PCl₅ as a valid, stable compound and directly substitute N (same group, smaller period) by analogy, without checking whether N has the same orbital resources P has.
- **Conflict evidence [P28]**: Nitrogen is a period 2 element, with access only to n=2 orbitals (2s and 2p, holding a maximum of 8 electrons, corresponding to a maximum of 4 bonds) — there are NO 2d orbitals available for valency expansion; nitrogen's maximum valency is genuinely 4 (achieved in NH₄⁺, where nitrogen uses its lone pair for a dative/coordinate bond); phosphorus, by contrast, is period 3, with genuinely accessible 3d orbitals enabling the valency expansion that makes PCl₅ possible — NCl₅ does not and CANNOT exist, since nitrogen simply lacks the orbital resources phosphorus has.
- **Bridge [P30]**: Elements in the same group share the same VALENCE ELECTRON COUNT (and hence similar general chemistry), but they do NOT necessarily share the same ORBITAL RESOURCES AVAILABLE for bonding — period 2 elements are capped at n=2 orbitals with no d-orbital access, while period 3+ elements gain access to d orbitals, enabling genuine valency expansion beyond what period 2 congeners can achieve.
- **Replacement [P31]**: Period 2 elements (including N) cap at a maximum valency of 4, having no accessible d orbitals for expansion — valency-expansion analogies from period 3+ congeners (like P forming PCl₅) do NOT transfer to period 2 elements.
- **Discrimination pairs [P33]**: P (period 3, accessible 3d orbitals, forms PCl₅, valency 5) vs. N (period 2, no d orbitals, capped at valency 4, NCl₅ cannot exist) — same group, genuinely different orbital resources.
- **S6 repair path**: Present nitrogen's orbital diagram explicitly (2s, 2p only, no accessible 2d), directly explaining why the PCl₅ analogy fails for nitrogen.

### MC-3: Oxidation state = actual electron count on the atom
- **Probe**: "In KMnO₄, the oxidation state of Mn is +7. Does this mean Mn has lost 7 real electrons?"
- **Characteristic phrase**: "In KMnO₄, Mn has only 18 electrons left because it lost 7."
- **Trigger (Type 3, language contamination)**: The words "state" and "charge" evoke a literal, physical description, leading students to treat oxidation state as an actual, physically-real electron count rather than a formal accounting convention.
- **Conflict evidence [P28]**: Oxidation state is a BOOKKEEPING CONVENTION — electrons in a bond are formally assigned entirely to the more electronegative atom, purely for counting purposes; Mn's +7 oxidation state in KMnO₄ means "IF all the Mn-O bonds were treated as fully ionic (electrons entirely assigned to oxygen), Mn would formally lose 7 electrons" — but Mn has NOT literally lost 7 real electrons in any physical sense, since the actual bonds are substantially covalent, not fully ionic, and the genuine electron density around the Mn atom remains far greater than a literal "18 electrons remaining" count would suggest.
- **Bridge [P30]**: Oxidation state is a formalism useful for tracking electron-transfer bookkeeping in redox reactions (balancing equations, predicting reactivity trends), deliberately simplified by assuming fully ionic character even for genuinely covalent bonds — this simplification is a useful accounting TOOL, not a claim about the atom's actual, physical electron distribution.
- **Replacement [P31]**: Oxidation state is a formal accounting convention (assuming fully ionic bond-splitting for counting purposes), never a literal description of an atom's actual electron count or physical charge.
- **Discrimination pairs [P33]**: "Mn's oxidation state is +7" (correct — a formal bookkeeping assignment) vs. "Mn has literally lost 7 electrons, leaving 18" (incorrect — conflates the formal convention with physical reality).
- **S6 repair path**: Explicitly state the "if bonds were fully ionic" conditional framing before assigning any oxidation state, reinforcing the convention's hypothetical nature.

## 5. Explanation Library

**Primary explanation**: Valency for period 3+ elements has a MAXIMUM set by the group number (reflecting accessible d orbitals enabling valency expansion), but the ACTUAL valency in any specific compound depends on how many bonds are genuinely formed, which can be less than or up to that maximum — the same element can show genuinely different valencies in different compounds. Period 2 elements lack any accessible d orbitals, capping their maximum valency firmly at 4, meaning valency-expansion analogies from period 3+ congeners never transfer to period 2 elements.

**Secondary explanation (oxidation-state-as-convention framing)**: Oxidation state is a formal bookkeeping convention that assumes fully ionic bond-splitting (electrons formally assigned entirely to the more electronegative atom) purely for counting and redox-tracking purposes — it is never a literal description of an atom's actual, physical electron count or charge, since real bonds in most compounds retain substantial covalent character.

## 6. Analogy Library

- **Primary analogy**: A company's "maximum theoretical output capacity" (group-number-derived maximum valency) versus its ACTUAL production on any given day (actual compound-specific valency) — the maximum capacity sets an upper bound, but daily output genuinely varies depending on which resources are actually deployed.
- **Breaking point**: The production-capacity analogy conveys the maximum-vs-actual distinction well but doesn't naturally capture the period-2-vs-period-3-orbital-availability argument or the oxidation-state-as-bookkeeping-convention concept — those need the explicit orbital-diagram and formal-accounting arguments.
- **Anti-analogy**: Do NOT say "oxidation state tells you exactly how many electrons the atom has lost" — this directly reinforces MC-3.

## 7. Demonstration Library

- **Demonstration 1 (S valency comparison)**: Present H₂S and H₂SO₄'s actual bonding structures explicitly, having students count sulfur's real bonds in each to confirm the different valencies.
- **Demonstration 2 (N vs. P orbital-availability comparison)**: Present nitrogen's and phosphorus's orbital diagrams side by side, showing phosphorus's accessible 3d orbitals and nitrogen's absence of them, directly explaining why NCl₅ cannot exist.

## 8. Discovery Lesson

**Opening**: "Sulfur is in Group 16. Does that mean its valency is always 6, in every compound it forms?"

**Exploration**: Students examine H₂S and H₂SO₄'s actual bonding, discovering sulfur's valency genuinely differs (2 versus 6) between these two compounds.

**Synthesis**: Guide toward: group number sets a MAXIMUM possible valency for period 3+ elements, not a fixed, universal value.

**Closure**: "If phosphorus can form PCl₅, can nitrogen — same group, smaller — form NCl₅?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the H₂S-vs-H₂SO₄ sulfur valency comparison explicitly.
- **TA-2 (TELL)**: State the period-2-vs-period-3-orbital-availability principle explicitly, worked through with the N-vs-P comparison.
- **TA-3 (DO)**: Student predicts whether a new hypothetical expanded-valency compound is possible, using period/orbital-availability reasoning.
- **TA-4 (TEST-THINKING)**: Present MC-3's KMnO₄ probe and ask the student to explain oxidation state as a formal convention, not a literal electron count.

## 10. Voice Teaching

Whenever a valency is discussed, ask "is this the maximum possible, or the actual valency in this specific compound?" before assigning any number. Whenever oxidation state is assigned, state explicitly "this is a bookkeeping convention, assuming fully ionic bonds for counting purposes" before naming the value.

## 11. Assessment

**Mastery gate**: Student can (a) correctly determine actual (not maximum-assumed) valency from a compound's real bonding, (b) correctly predict whether an expanded-valency compound is possible using period/orbital-availability reasoning, (c) correctly interpret oxidation state as a formal convention, not literal electron count.

- **FA-1**: "What is the valency of S in H₂S? What is it in H₂SO₄?" — targets MC-1.
- **FA-2**: "Can NCl₅ exist? Explain." — targets MC-2.
- **FA-3**: "In KMnO₄, does Mn's +7 oxidation state mean it has lost 7 real electrons?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students who've just learned PCl₅ as a valid expanded-valency example.

**Delayed retrieval**: Re-probe MC-1's maximum-vs-actual valency distinction and MC-3's oxidation-state-convention principle before `chem.redox.oxidation-state` requires fluent, correct oxidation-state reasoning for redox balancing.

## 12. Recovery Notes

- **S3 (stuck)**: For the fixed-valency confusion, have the student count sulfur's actual bonds in H₂S and H₂SO₄ directly, rather than reasoning abstractly from the group number.
- **S4 (frustrated)**: Normalize — "group number = valency" genuinely is a useful, correct starting shortcut for many simple compounds, making its overextension a reasonable, common error.
- **S6 (collision)**: Use the explicit N-vs-P orbital-diagram comparison for MC-2; use the "if bonds were fully ionic" conditional framing for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why NCl₅ cannot exist despite PCl₅ being a stable, well-known compound.

## 13. Memory & Review

Tag as a conceptual-correction memory (maximum vs. actual valency; period-2 orbital cap; oxidation state as formal convention). Schedule a spaced check at ~1 week and again before `chem.redox.oxidation-state`.

## 14. Transfer Map

Feeds directly into `chem.redox.oxidation-state` (formal redox balancing and oxidation-state assignment directly apply the bookkeeping-convention understanding established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
