# chem.coord.bonding — Bonding in Complexes

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.coord.bonding` |
| Domain | Coordination Chemistry |
| Requires | `chem.coord.cft`, `chem.bond.mo-theory` |
| Unlocks | (none) |
| Difficulty | advanced |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

d²sp³ and sp³d² hybridization are NOT equivalent despite both producing six hybrid orbitals — d²sp³ uses the INNER (n−1)d orbitals (e.g., 3d in a first-row complex), while sp³d² uses the OUTER nd orbitals (4d in the same row) — these are genuinely DIFFERENT orbitals with different energies/radial extents, and inner-orbital (d²sp³) complexes are typically low-spin (stronger overlap, stronger Δ) while outer-orbital (sp³d²) complexes are typically high-spin; π-donor ligands are WEAK-field, not strong-field, despite "donating more electron density" sounding like it should strengthen the field — π-donation raises t₂g energy (donating INTO the metal's t₂g-based orbitals), DECREASING Δ, while π-ACCEPTOR ligands (back-donation FROM metal to ligand) LOWER t₂g energy, INCREASING Δ — the DIRECTION of donation (to vs. from the metal), not the sheer amount of electron density involved, determines the effect on Δ; and MO theory superseding VBT in scope/accuracy does NOT mean VBT should never be used — VBT correctly and simply predicts geometry and magnetic behavior (d²sp³→octahedral, diamagnetic; sp³→tetrahedral, paramagnetic) for many cases, retaining genuine pedagogical and predictive value for these specific questions, even though MO/LFT is required for spectroscopy, bond energies, π-effects, and quantitative Δ.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing d²sp³ (using 3d orbitals, inner, low-spin) against sp³d² (using 4d orbitals, outer, high-spin) explicitly for two first-row complexes, tracking which specific d-orbital shell is involved in each notation.

**Representational**: A t₂g/e_g energy-level diagram showing π-donor ligand interaction RAISING t₂g (Δ shrinks) alongside a π-acceptor ligand interaction LOWERING t₂g (Δ grows), both drawn from the same starting energy level for direct comparison.

**Abstract**: The general principle that hybridization notation order (d²sp³ vs. sp³d²) encodes genuinely different physical orbitals, not merely different labels for the same set; the general principle that a ligand's field strength depends on the DIRECTION of metal-ligand electron donation, not the magnitude alone; the general principle that competing bonding theories (VBT vs. MO/LFT) can each retain genuine validity for the specific questions they were designed to answer.

**Transfer**: Given an unfamiliar octahedral complex, correctly distinguishing inner vs. outer orbital hybridization from the notation and predicting spin state accordingly; given an unfamiliar ligand, correctly predicting its effect on Δ from whether it is a π-donor or π-acceptor; given an unfamiliar bonding question, correctly selecting VBT or MO/LFT as the appropriate model for that specific question.

## 3. Why Beginners Fail

Students see that both d²sp³ and sp³d² produce six hybrid orbitals (matching octahedral geometry) and treat the two notations as interchangeable relabelings of the same physical orbital set, missing that the SPECIFIC d orbitals involved genuinely differ (inner (n−1)d for d²sp³ vs. outer nd for sp³d²), with real physical consequences (different energies, different overlap strength, different resulting spin states — low-spin for inner, high-spin for outer); students reason that since π-donor ligands "donate more electron density" to the metal, and generally in chemistry "more interaction" correlates with "stronger effect," they conclude π-donors must create a stronger ligand field, missing that the specific DIRECTION of this donation (into the metal's t₂g-based orbitals) actually RAISES t₂g energy, shrinking rather than growing Δ — the opposite effect from π-acceptor ligands, whose back-donation FROM the metal lowers t₂g and increases Δ; and students, upon learning that MO theory offers a more complete, quantitatively accurate description of bonding than VBT, conclude that VBT must therefore be simply "wrong" and should be abandoned entirely, missing that VBT remains genuinely useful and correctly predictive for the SPECIFIC questions of geometry and magnetic behavior, even though it lacks the scope to address spectroscopy, bond energies, or quantitative Δ — different theories can retain validity for the specific domains they were designed to model.

## 4. Misconception Library

### MC-1: d²sp³ hybridization means two d orbitals + one s + three p = six hybrid orbitals, which is the same as sp³d² — so inner and outer orbital complexes are equivalent
- **Probe**: "Which d orbitals are used in d²sp³ vs. sp³d²?"
- **Characteristic phrase**: "same six orbitals, just written differently."
- **Trigger (Type 4, notation-induced)**: The identical orbital COUNT (six total, matching octahedral geometry) in both notations obscures the genuinely different SPECIFIC orbitals involved.
- **Conflict evidence [P28]**: d²sp³ uses the (n−1)d inner d orbitals (e.g. 3d² in a first-row complex), while sp³d² uses the outer nd orbitals (4d² in the same row). These are DIFFERENT orbitals with different energies and radial extents. Inner orbital complexes are typically low-spin (stronger metal–ligand overlap, stronger Δ), while outer orbital complexes are high-spin. The notation order matters.
- **Bridge [P30]**: The hybridization NOTATION's letter-order (d²sp³ vs. sp³d²) is not arbitrary stylistic variation — it specifically encodes WHICH shell's d orbitals participate (inner (n−1)d, written first, vs. outer nd, written last) — a genuine physical distinction with real energetic and magnetic consequences, since inner d orbitals overlap more strongly with ligand orbitals (stronger field, low-spin) while outer d orbitals overlap more weakly (weaker field, high-spin).
- **Replacement [P31]**: Always check whether the hybridization notation specifies inner (n−1)d (d²sp³, typically low-spin) or outer nd (sp³d², typically high-spin) orbitals — never treat the two notations as interchangeable just because they produce the same orbital count.
- **Discrimination pairs [P33]**: d²sp³ (inner 3d orbitals, stronger overlap, low-spin) vs. sp³d² (outer 4d orbitals, weaker overlap, high-spin) — same total orbital count, genuinely different physical orbitals and magnetic consequences.
- **S6 repair path**: Present the explicit orbital-shell diagram for both notations, tracking which specific d-orbital shell (inner vs. outer) is involved in each.

### MC-2: π-donor ligands are strong-field because they donate more electron density to the metal
- **Probe**: "If a ligand donates electron density into the t₂g orbital, does the energy of t₂g go up or down? And what happens to Δ?"
- **Characteristic phrase**: "more donation = stronger field."
- **Trigger (Type 5, instruction-induced)**: "More electron donation" is a phrase that intuitively suggests "stronger interaction," without specifying the direction of that donation's energetic effect.
- **Conflict evidence [P28]**: π-DONORS fill filled t₂g-based MOs with electron density from ligand π orbitals→interaction raises the energy of the metal t₂g→Δ DECREASES (t₂g and e_g get closer). More donation from a π-donor WEAKENS the field. π-ACCEPTORS lower t₂g by back-donation→Δ INCREASES. The direction of the interaction (who gives to whom) determines the effect on Δ, not the amount of electron density alone.
- **Bridge [P30]**: The magnitude of Δ (the energy gap between t₂g and e_g) depends specifically on how the t₂g energy level is shifted by ligand interaction — and this shift's DIRECTION depends on whether the ligand is DONATING electron density INTO the metal's t₂g orbitals (raising t₂g, shrinking Δ) or ACCEPTING electron density FROM the metal via back-donation (lowering t₂g, growing Δ); "more donation" in the π-donor case specifically means MORE electron density raising t₂g further, which WEAKENS (not strengthens) the field.
- **Replacement [P31]**: π-donor ligands weaken the field (raise t₂g, decrease Δ); π-acceptor ligands strengthen the field (lower t₂g via back-donation, increase Δ) — always identify the DIRECTION of π-interaction, never assume "more donation" implies a stronger field.
- **Discrimination pairs [P33]**: π-donor ligand (e.g., halides, donates into t₂g, raises t₂g, Δ decreases, weak-field) vs. π-acceptor ligand (e.g., CO, back-donation from metal, lowers t₂g, Δ increases, strong-field).
- **S6 repair path**: Present the explicit t₂g energy-level shift diagram for both π-donor and π-acceptor cases, deriving the opposite Δ consequences from the interaction direction.

### MC-3: MO theory proves that VBT is wrong — so VBT should not be used at all
- **Probe**: "For which questions is VBT still the simplest useful model?"
- **Characteristic phrase**: "VBT is outdated and wrong."
- **Trigger (Type 6, analogy overextension)**: A more comprehensive, quantitatively accurate theory (MO) is assumed to entirely invalidate a simpler predecessor theory (VBT), rather than the two theories retaining separate domains of usefulness.
- **Conflict evidence [P28]**: VBT correctly predicts GEOMETRY and MAGNETIC BEHAVIOUR in many cases (d²sp³→octahedral, diamagnetic; sp³→tetrahedral, paramagnetic) from hybridization, and it does so in a conceptually simple way that matches qualitative experimental observations. VBT is LIMITED but not wrong for what it claims. MO/LFT is needed for spectroscopy, bond energies, π-effects, and quantitative Δ. Different theories serve different questions; VBT retains pedagogical value as an entry point.
- **Bridge [P30]**: A scientific model's "correctness" should be assessed relative to the SPECIFIC predictions it makes, not treated as a single all-or-nothing verdict — VBT makes specific, testable claims about geometry and magnetic behavior that are genuinely correct for many complexes, even though it makes no claims (and is therefore neither right nor wrong) about spectroscopic transitions or quantitative Δ values, which require the more detailed MO/LFT framework to address.
- **Replacement [P31]**: VBT remains valid and useful specifically for predicting geometry and magnetic behavior — MO/LFT is required for spectroscopy, bond energies, and quantitative Δ — never dismiss VBT as simply "wrong" because a more comprehensive theory exists.
- **Discrimination pairs [P33]**: VBT's domain (geometry, magnetic behavior, correctly predictive) vs. MO/LFT's domain (spectroscopy, quantitative Δ, bond energies, requiring the more detailed framework) — genuinely different questions, each theory valid within its own scope.
- **S6 repair path**: Present specific examples of questions VBT correctly answers (geometry/magnetism) alongside questions it cannot address (spectroscopy), clarifying the scope-limited nature of "correctness."

## 5. Explanation Library

**Primary explanation**: Coordination-complex hybridization notation (d²sp³ vs. sp³d²) encodes a genuine physical distinction — which specific d-orbital shell (inner (n−1)d vs. outer nd) participates in bonding — with real consequences for orbital overlap strength and resulting spin state (low-spin for inner, high-spin for outer). A ligand's effect on the crystal field splitting Δ depends on the DIRECTION of π-interaction: π-donors raise t₂g energy (shrinking Δ, weak-field), while π-acceptors lower t₂g energy via back-donation (growing Δ, strong-field) — the sheer amount of electron density involved does not by itself determine field strength.

**Secondary explanation (scope-limited validity of competing bonding theories)**: VBT and MO/LFT are not simply "right" or "wrong" relative to each other — each theory retains genuine validity within its own specific domain, with VBT correctly predicting geometry and magnetic behavior via hybridization, while MO/LFT is required for spectroscopy, bond energies, π-effects, and quantitative Δ values that VBT was never designed to address.

## 6. Analogy Library

- **Primary analogy**: Two different floors of the same building (inner (n−1)d vs. outer nd orbitals) that happen to have the same number of rooms (six hybrid orbitals) but are structurally, energetically distinct locations — visiting "a floor with six rooms" doesn't specify which floor, exactly as "six hybrid orbitals" doesn't specify inner or outer.
- **Breaking point**: The building-floor analogy conveys the inner-vs-outer orbital distinction well but doesn't naturally capture the direction-dependent π-donor/acceptor effect on Δ (MC-2) or the scope-limited theory-validity concept (MC-3) — those need the explicit t₂g energy-shift diagram and the specific-question comparison.
- **Anti-analogy**: Do NOT say "more ligand-to-metal donation always means a stronger bond/field" — this directly reinforces MC-2 by ignoring the direction-dependence of the field-strength consequence.

## 7. Demonstration Library

- **Demonstration 1 (inner-vs-outer orbital-shell diagram for d²sp³/sp³d²)**: Present the explicit orbital-shell diagram, tracking which specific d-orbital shell each notation involves.
- **Demonstration 2 (t₂g energy-shift diagram for π-donor vs. π-acceptor)**: Present both interaction diagrams explicitly, deriving the opposite Δ consequences from donation direction.
- **Demonstration 3 (VBT-vs-MO/LFT scope comparison)**: Present specific example questions each theory correctly answers, clarifying their respective domains of validity.

## 8. Discovery Lesson

**Opening**: "d²sp³ and sp³d² both give six hybrid orbitals. Are they the same thing?"

**Exploration**: Students examine the specific d-orbital shells involved in each notation, discovering genuinely different physical orbitals with different spin-state consequences.

**Synthesis**: Guide toward: hybridization notation order encodes a real physical distinction (inner vs. outer orbitals), not arbitrary labeling.

**Closure**: "If a ligand donates more electron density to the metal, does that make the field stronger?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit inner-vs-outer orbital-shell diagram for d²sp³/sp³d².
- **TA-2 (TELL)**: State the direction-dependent π-donor/acceptor effect on Δ explicitly, anchored to the t₂g energy-shift diagram.
- **TA-3 (DO)**: Student classifies an unfamiliar ligand as π-donor or π-acceptor and predicts its effect on Δ.
- **TA-4 (TEST-THINKING)**: Present the VBT-vs-MO/LFT probe and ask the student to justify VBT's continued usefulness for specific questions.

## 10. Voice Teaching

Whenever hybridization notation is used, narrate "check inner vs. outer d orbitals — the order matters, not just the count." Whenever a ligand's field strength is assessed, state "check the direction of π-interaction, not just the amount of donation" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly distinguish inner (d²sp³) from outer (sp³d²) orbital hybridization and predict resulting spin state, (b) correctly predict a ligand's effect on Δ from π-donor/acceptor character, (c) correctly identify the appropriate scope for VBT vs. MO/LFT.

- **FA-1**: "Which d orbitals are used in d²sp³ vs. sp³d²?" — targets MC-1.
- **FA-2**: "If a ligand donates electron density into the t₂g orbital, does the energy of t₂g go up or down? And what happens to Δ?" — targets MC-2.
- **FA-3**: "For which questions is VBT still the simplest useful model?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-2 among students who default to a general "more interaction = stronger effect" heuristic without checking interaction direction.

**Delayed retrieval**: Re-probe MC-1's inner-vs-outer orbital distinction and MC-2's direction-dependent field-strength reasoning as foundational knowledge for subsequent spectroscopy and advanced coordination-chemistry applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the d²sp³/sp³d² confusion, have the student explicitly identify which specific d-orbital shell is involved before concluding equivalence.
- **S4 (frustrated)**: Normalize — assuming matching orbital counts implies equivalent notations is genuinely common on first exposure, since the numerical count is the most visible feature.
- **S6 (collision)**: Use the explicit t₂g energy-shift diagram for MC-2; use the specific-question comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why π-donor ligands weaken rather than strengthen the crystal field.

## 13. Memory & Review

Tag as three conceptual-correction memories (inner-vs-outer orbital hybridization distinction; direction-dependent π-donor/acceptor field effect; scope-limited theory validity). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates crystal-field and molecular-orbital-theory reasoning built across `chem.coord.cft` and `chem.bond.mo-theory`, forming a capstone application to advanced coordination chemistry and spectroscopy contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
