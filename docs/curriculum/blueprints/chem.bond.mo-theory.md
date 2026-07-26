# chem.bond.mo-theory — Molecular Orbital Theory

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.bond.mo-theory` |
| Domain | Chemical Bonding |
| Requires | `chem.atomic.orbitals`, `chem.bond.hybridization` |
| Unlocks | `chem.coord.bonding` |
| Difficulty | advanced |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 5 |

## 1. Concept Spine

Molecular orbital theory computes bond order as ½(bonding electrons − antibonding electrons), and antibonding electrons genuinely CANCEL bonding electrons' stabilization (a bond order of exactly zero means the molecule simply does NOT form, as with He₂, not a "neutral, still-existing" molecule); MO theory correctly predicts O₂'s paramagnetism (2 unpaired electrons in degenerate π*2p orbitals, filled per Hund's rule) where simple Lewis-structure double-bond drawings incorrectly suggest all electrons are paired — the most famous case where Lewis theory and experiment disagree, with MO theory winning; and bond order predicts bond STRENGTH and bond LENGTH specifically, not overall chemical stability or reactivity in every context — comparing bond orders (like N₂'s 3 versus O₂'s 2) is only straightforward for isoelectronic species, and even a genuinely stronger bond (N₂'s) reflects kinetic inertness in one specific sense, not a universal "more stable in all contexts" claim.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Computing He₂'s bond order (½(2−2)=0) directly from its electron configuration, connecting this zero result to the experimental fact that He₂ simply doesn't exist as a stable molecule.

**Representational**: An MO energy-level diagram for O₂, explicitly showing the two degenerate π*2p orbitals each singly occupied (per Hund's rule), visually explaining paramagnetism that a simple Lewis structure cannot show.

**Abstract**: The general bond-order formula (½(bonding−antibonding)) and its direct connection to both bond strength/length AND to whether a molecule is stable enough to exist at all (BO=0 means no molecule forms).

**Transfer**: Given an unfamiliar diatomic species' electron configuration, correctly computing bond order, correctly predicting magnetic behavior (paramagnetic if unpaired electrons exist in degenerate orbitals), and correctly reasoning about what bond order does and doesn't predict about overall chemical behavior.

## 3. Why Beginners Fail

Students assume filling both a bonding and its corresponding antibonding orbital equally has "no net effect," treating the two as canceling out into some kind of neutral, still-viable bonding situation, missing that a bond order of exactly zero means the molecule genuinely fails to form at all, with zero net stabilization relative to separated atoms; they trust the Lewis-structure double-bond picture of O₂ (implying all electrons paired) over what MO theory actually predicts, missing that Lewis structures cannot represent degenerate orbitals correctly, and that O₂'s real, experimentally-observed paramagnetism directly confirms MO theory's prediction of 2 unpaired electrons over the Lewis structure's incorrect all-paired implication; and they assume a higher bond order automatically means "more stable in every sense," missing that bond order specifically predicts bond strength and length, not overall chemical reactivity or stability in every possible context.

## 4. Misconception Library

### MC-1: Antibonding orbitals cancel bonding orbitals, so filling them both has no net effect on the molecule
- **Probe**: "If σ1s has 2 electrons and σ*1s also has 2 electrons, what is the bond order and does the molecule exist?"
- **Characteristic phrase**: "bonding and antibonding just cancel."
- **Trigger (Type 6, analogy overextension)**: Students correctly learn that antibonding electrons subtract from bonding electrons in the bond-order formula, and overextend this "cancellation" language into imagining the molecule persists in some kind of neutral, unaffected state, rather than recognizing the cancellation eliminates the molecule's entire reason to exist.
- **Conflict evidence [P28]**: For He₂ with σ1s²σ*1s², bond order=½(2−2)=0 — He₂ genuinely does NOT exist as a stable molecule; antibonding electrons DO cancel the stabilizing effect of bonding electrons, and a bond order of exactly zero means there is NO net stabilization energy relative to the two separated helium atoms, so the "molecule" simply never forms in any meaningful sense.
- **Bridge [P30]**: "Cancellation" in the bond-order formula isn't a neutral, inconsequential outcome — it directly represents the physical reality that the stabilizing and destabilizing contributions have exactly balanced out, leaving no net energetic reason for the atoms to remain bonded together at all.
- **Replacement [P31]**: A bond order of zero means the molecule does not form — antibonding electrons genuinely eliminate the stabilization bonding electrons would otherwise provide, not merely "balance" into a still-viable, neutral molecular state.
- **Discrimination pairs [P33]**: H₂ (σ1s², bond order=1, genuinely stable and exists) vs. He₂ (σ1s²σ*1s², bond order=0, genuinely does NOT exist as a stable molecule).
- **S6 repair path**: Compute He₂'s bond order explicitly and connect the zero result directly to the experimental non-existence of stable He₂ molecules.

### MC-2: O₂ should be diamagnetic because the Lewis structure shows a double bond with all paired electrons
- **Probe**: "Liquid oxygen is attracted to a magnet. What does that tell you about electron pairing in O₂?"
- **Characteristic phrase**: "the double bond has 4 paired electrons."
- **Trigger (Type 5, instruction-induced)**: Students trust the simplified Lewis-structure double-bond picture of O₂ (which shows all electrons as paired within bonding pairs) as a complete, accurate description, without recognizing this simplified drawing cannot correctly represent degenerate molecular orbitals.
- **Conflict evidence [P28]**: Liquid oxygen is experimentally attracted to a magnet, meaning it is PARAMAGNETIC — requiring genuinely UNPAIRED electrons; MO theory correctly predicts this, since O₂'s two π*2p molecular orbitals are exactly EQUAL in energy (degenerate), and Hund's rule fills each with one electron rather than pairing them in just one orbital, producing 2 unpaired electrons and paramagnetism — a prediction the simplified Lewis structure (which draws a plain double bond with all electrons implicitly paired) simply cannot make, since Lewis structures have no mechanism for representing degenerate orbitals at all.
- **Bridge [P30]**: Lewis structures are a simplified bookkeeping tool for counting bonds and lone pairs, adequate for many purposes, but genuinely unable to represent the degenerate-orbital electron distributions that molecular orbital theory captures — this is the single most famous case where the two theories give different predictions and experiment (paramagnetism) directly confirms MO theory over the simpler Lewis picture.
- **Replacement [P31]**: O₂ is genuinely paramagnetic, with 2 unpaired electrons in its degenerate π*2p orbitals, correctly predicted by MO theory but missed entirely by the simplified Lewis double-bond structure.
- **Discrimination pairs [P33]**: The Lewis structure's implicit "all paired" picture (predicts diamagnetic, WRONG) vs. MO theory's degenerate-orbital analysis (predicts paramagnetic with 2 unpaired electrons, CORRECT, confirmed experimentally).
- **S6 repair path**: Present the full MO diagram for O₂ explicitly, showing the two degenerate π*2p orbitals each singly filled per Hund's rule, connecting this directly to the observed magnetic attraction.

### MC-3: Higher bond order always means shorter bond length and the molecule is more stable overall
- **Probe**: "N₂ has BO = 3 and O₂ has BO = 2. Is N₂ definitely more stable than O₂ in all chemical contexts?"
- **Characteristic phrase**: "BO 3 is always better than BO 2."
- **Trigger (Type 1, overgeneralization)**: Students correctly learn bond order predicts bond strength and length reliably, and extend this into a broader, unqualified claim about overall chemical "stability," a much vaguer and context-dependent property that bond order alone doesn't fully capture.
- **Conflict evidence [P28]**: Bond order genuinely predicts bond STRENGTH (energy per bond) and bond LENGTH reliably — N₂'s triple bond IS stronger and shorter than O₂'s double bond — but "more stable" is a much broader claim depending on context; N₂ being kinetically INERT (its strong triple bond is very hard to break, a KINETIC statement about reaction rate) is a genuinely different claim from a general "more stable in every chemical sense" assertion, and both N₂ and O₂ are perfectly stable, viable diatomic molecules in their own right — bond order comparison being meaningful is ALSO specifically limited to isoelectronic species (same total electron count), not a universally valid direct comparison across any two molecules.
- **Bridge [P30]**: Bond order is a precise, well-defined predictor of two specific quantitative properties (bond strength and bond length) — extending it into a vague, unqualified "more stable overall" claim conflates a specific, measurable prediction with a much broader and context-dependent notion of chemical stability/reactivity.
- **Replacement [P31]**: Bond order reliably predicts bond strength and bond length (and is directly comparable primarily among isoelectronic species) — it does not, by itself, predict overall chemical reactivity or "stability" in every possible sense.
- **Discrimination pairs [P33]**: "N₂ has a stronger, shorter bond than O₂" (a specific, correct bond-order-based claim) vs. "N₂ is more stable than O₂ in every chemical context" (an overgeneralized, imprecise claim that bond order alone cannot fully justify).
- **S6 repair path**: Separate the specific claim (bond strength/length comparison, valid) from the broad claim (overall stability in all contexts, not directly supported by bond order alone) explicitly.

## 5. Explanation Library

**Primary explanation**: Molecular orbital theory computes bond order as ½(bonding electrons − antibonding electrons) — antibonding electrons genuinely cancel the stabilizing effect of bonding electrons, so a bond order of exactly zero (as in He₂) means the molecule has no net stabilization relative to separated atoms and simply does not form, not merely a "neutral" outcome.

**Secondary explanation (degenerate-orbital and bond-order-scope framing)**: MO theory can represent degenerate orbitals (orbitals of exactly equal energy) in a way simplified Lewis structures cannot — this is exactly why MO theory correctly predicts O₂'s genuine paramagnetism (2 unpaired electrons in degenerate π*2p orbitals, filled per Hund's rule), directly contradicting the Lewis structure's implicit all-paired-electrons picture, and experimentally confirmed by O₂'s real attraction to a magnet. Bond order reliably predicts bond strength and length specifically — extending this prediction into a broader, unqualified claim about overall chemical stability or reactivity goes beyond what bond order alone can support.

## 6. Analogy Library

- **Primary analogy**: A tug-of-war where the "bonding team" and "antibonding team" pull with exactly equal force (He₂'s equal bonding/antibonding electron count) — the rope (the potential bond) genuinely doesn't move at all, meaning there's no actual connection holding the two sides together, not a "peaceful truce" where a bond still somehow exists.
- **Breaking point**: The tug-of-war analogy conveys the cancellation-means-no-bond concept well but doesn't naturally capture the degenerate-orbital paramagnetism argument or the bond-order-scope limitation — those need the explicit MO-diagram and context-dependent-stability arguments.
- **Anti-analogy**: Do NOT say "bonding and antibonding electrons cancel into a neutral, still-existing molecule" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (He₂ bond-order computation)**: Compute He₂'s bond order explicitly from its electron configuration, connecting the zero result directly to He₂'s well-documented non-existence as a stable molecule.
- **Demonstration 2 (O₂ MO diagram construction)**: Build O₂'s full MO diagram explicitly, filling the degenerate π*2p orbitals per Hund's rule, connecting the resulting 2 unpaired electrons directly to observed paramagnetism.

## 8. Discovery Lesson

**Opening**: "If a molecule has 2 bonding electrons and 2 antibonding electrons, does it simply 'balance out' into a normal, existing molecule?"

**Exploration**: Students compute He₂'s bond order explicitly, discovering it equals zero, and connect this to He₂'s actual, well-documented non-existence.

**Synthesis**: Guide toward: a bond order of zero means no net stabilization exists — the molecule genuinely fails to form, not merely reaches some neutral equilibrium.

**Closure**: "The Lewis structure for O₂ shows a double bond with all electrons paired. Does liquid oxygen's attraction to a magnet agree with that picture?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the He₂ bond-order computation explicitly, connecting zero bond order to non-existence.
- **TA-2 (TELL)**: State explicitly that Lewis structures cannot represent degenerate orbitals, immediately followed by the O₂ MO diagram showing unpaired electrons.
- **TA-3 (DO)**: Student computes bond order for a new diatomic species and predicts its magnetic behavior from the resulting electron configuration.
- **TA-4 (TEST-THINKING)**: Present MC-3's N₂-vs-O₂ probe and ask the student to distinguish the specific bond-strength claim from the broader stability claim.

## 10. Voice Teaching

Whenever bond order is computed as zero, state explicitly "this means the molecule doesn't form at all" rather than describing it as any kind of neutral outcome. Whenever O₂'s bonding is discussed, always mention its paramagnetism as the definitive experimental test distinguishing MO theory's correct prediction from the Lewis structure's incorrect one.

## 11. Assessment

**Mastery gate**: Student can (a) correctly interpret a bond order of zero as meaning the molecule does not form, (b) correctly predict O₂'s paramagnetism from its MO diagram, recognizing where Lewis structures fail, (c) correctly distinguish bond order's specific predictions (strength, length) from broader, unsupported claims about overall stability.

- **FA-1**: "If σ1s has 2 electrons and σ*1s also has 2 electrons, what is the bond order and does the molecule exist?" — targets MC-1.
- **FA-2**: "Liquid oxygen is attracted to a magnet. What does that tell you about electron pairing in O₂?" — targets MC-2.
- **FA-3**: "N₂ has BO=3 and O₂ has BO=2. Is N₂ definitely more stable than O₂ in all chemical contexts?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students who've only worked with Lewis structures and haven't yet been shown MO theory's degenerate-orbital treatment.

**Delayed retrieval**: Re-probe MC-1's bond-order-zero interpretation and MC-2's degenerate-orbital reasoning before `chem.coord.bonding` requires fluent MO-theory-style reasoning for coordination complex bonding.

## 12. Recovery Notes

- **S3 (stuck)**: For the cancellation confusion, connect the zero-bond-order result directly to the experimental fact of He₂'s non-existence, rather than reasoning abstractly about "cancellation."
- **S4 (frustrated)**: Normalize — trusting the simplified, familiar Lewis structure over the more abstract MO diagram is a very reasonable default, making the O₂ paramagnetism surprise a genuinely famous, well-known point of confusion even among advanced students.
- **S6 (collision)**: Use the explicit O₂ MO diagram for MC-2; use the specific-vs-broad-claim separation exercise for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why Lewis structures cannot correctly predict O₂'s magnetic behavior.

## 13. Memory & Review

Tag as a conceptual-correction memory (bond order zero means no molecule) plus a landmark theory-comparison memory (O₂ paramagnetism, MO theory vs. Lewis structures) plus a scope-limitation memory (bond order predicts strength/length, not blanket stability). Schedule a spaced check at ~1 week and again before `chem.coord.bonding`.

## 14. Transfer Map

Feeds directly into `chem.coord.bonding` (coordination complex bonding theory builds directly on MO-theory-style reasoning about orbital interactions established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
