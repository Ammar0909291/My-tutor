# chem.org.arrow-pushing — Electron Flow and Arrow Notation

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.org.arrow-pushing` |
| Domain | Organic Chemistry |
| Requires | `chem.org.mechanisms` |
| Unlocks | (none) |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 3 |

## 1. Concept Spine

A curved arrow's TAIL must start at a specific ELECTRON PAIR (a lone pair or a bond), NEVER at an atom's nucleus — in proton transfer from H₃O⁺ to NH₃, the arrow starts at the O–H σ-bond (not the O atom or H atom) and points to N, with the O–H bond's electron pair moving to form the new N–H bond; a single lone pair (two electrons) can support only ONE arrow in ONE step — drawing two arrows from the same lone pair simultaneously would require FOUR electrons from a pair that only has two, producing an impossible electron count (e.g., a 5-bond oxygen) — two bond-forming events from one atom's lone pairs require either two SEPARATE steps or two SEPARATE, distinct lone pairs; and a mechanism cannot be verified as correct merely by "looking right" from pattern-matching — explicit FORMAL CHARGE CHECKING at every intermediate is required, since an incorrect arrow (e.g., reversed direction) produces an impossible formal charge (like a neutral carbon becoming 5-valent) that visual pattern-matching alone will not catch.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Drawing the explicit proton-transfer arrow from H₃O⁺ to NH₃, anchoring the arrow tail precisely at the O–H σ-bond (never at the O or H nucleus itself), tracing the electron pair's movement to form the new N–H bond.

**Representational**: A side-by-side diagram showing a correctly-drawn single arrow from one lone pair (forming one bond) against an incorrect attempt to draw two arrows from that same lone pair (visually demonstrating the impossible electron-count consequence).

**Abstract**: The general principle that arrow tails must be anchored at electron sources (lone pairs or bonds), never at atomic nuclei; the general principle that one lone pair (two electrons) can support exactly one arrow (one bond-forming event) per step; the general principle that formal charge computation at every mechanistic intermediate is a required verification step, not optional "extra work" for advanced students only.

**Transfer**: Given an unfamiliar mechanism step, correctly anchoring every arrow tail at a genuine electron source (never an atom); given an unfamiliar multi-bond-forming step, correctly recognizing when two separate steps or two separate lone pairs are required rather than one lone pair supporting multiple arrows; given an unfamiliar drawn mechanism, correctly verifying its validity via explicit formal-charge computation at each intermediate.

## 3. Why Beginners Fail

Students, using everyday language like "send the electrons from carbon to oxygen," draw the arrow starting from the CARBON ATOM ITSELF (or from a specific nucleus), missing that the arrow must instead start at a SPECIFIC ELECTRON PAIR located on or associated with that atom (a lone pair or, in the proton-transfer case, the relevant bond) — the arrow tracks electron-pair movement specifically, not a generic "from this atom" starting point; students, observing that two new bonds are forming in a given mechanistic step and having a single lone pair available on the relevant atom, sometimes attempt to draw two separate arrows originating from that SAME lone pair to account for both new bonds, missing that a lone pair contains only TWO electrons total — one arrow (representing the movement of exactly one electron pair) fully consumes those two electrons, leaving nothing for a second simultaneous arrow from the same source, and attempting this would produce an impossible electron count around the atom (like a 5-bond oxygen); and students, especially those taught to draw mechanisms primarily by pattern-matching against memorized examples, develop a false confidence that a mechanism's correctness can be judged simply by whether it "looks right" (resembles familiar patterns), missing that this visual/pattern-based judgment can be fooled by subtle errors (like a reversed arrow direction at one step) that nonetheless produce a chemically impossible result — explicit formal-charge computation at each intermediate is the reliable verification method that catches such errors, which visual inspection alone misses.

## 4. Misconception Library

### MC-1: The arrow starts at the atom, not at the electrons
- **Probe**: "In the proton transfer from H₃O⁺ to NH₃, draw the arrow. Where exactly does it start?"
- **Characteristic phrase**: student draws arrow from the H nucleus or from the O nucleus.
- **Trigger (Type 3, language contamination)**: In everyday language, "send the electrons from carbon to oxygen" = arrow starts at the carbon; but the arrow must start at a specific ELECTRON PAIR on that carbon, which may be a lone pair or a bond, not the nucleus itself.
- **Conflict evidence [P28]**: The arrow starts at the O–H BOND (the σ-bond between O and H); the head points to N; the electron pair of the O–H bond moves to form the new N–H bond. The tail is the O–H σ-bond, not the O atom or the H atom.
- **Bridge [P30]**: Curved arrows in mechanism notation specifically and exclusively track the movement of ELECTRON PAIRS — since an atom's nucleus itself never physically "moves" as electrons rearrange during bond-breaking/forming, anchoring an arrow's tail at a nucleus is a category error; the tail must instead be placed precisely at whatever specific electron pair (a lone pair, or the electron pair constituting an existing bond) is the actual source of the electrons being redistributed in that mechanistic step.
- **Replacement [P31]**: Always anchor a curved arrow's tail at a specific electron pair (a lone pair or an existing bond), never at an atom's nucleus — identify the exact electron source before drawing any arrow.
- **Discrimination pairs [P33]**: Correct arrow tail at the O–H σ-bond (a genuine electron-pair source) vs. incorrect arrow tail at the O or H nucleus (not a valid electron source, a category error).
- **S6 repair path**: Present the explicit proton-transfer mechanism, having the student identify and label the specific electron-pair source before drawing the arrow.

### MC-2: You can draw two arrows from the same lone pair in the same step
- **Probe**: "Can an oxygen atom use its lone pair to simultaneously attack two electrophiles in one step?"
- **Characteristic phrase**: student draws two arrows from the same lone pair on oxygen.
- **Trigger (Type 1, overgeneralization)**: Students see two bonds forming and try to draw two arrows originating from the same source; but a lone pair is ONE electron pair — it can only form ONE bond in one step.
- **Conflict evidence [P28]**: A lone pair is two electrons; one arrow uses all two electrons; there are no electrons left for a second simultaneous arrow from the same pair. This would give oxygen a 5-bond count — impossible. Two bond-forming events require two SEPARATE steps or two SEPARATE lone pairs.
- **Bridge [P30]**: A curved arrow represents the complete transfer of a SPECIFIC pair of two electrons — since a lone pair by definition contains exactly two electrons, drawing one arrow from it fully accounts for and exhausts those electrons, leaving mathematically zero electrons remaining at that source for any additional, simultaneous arrow; any attempt to draw a second arrow from the identical source in the identical step would require electrons that simply do not exist there, producing an impossible (over-bonded) atom.
- **Replacement [P31]**: One lone pair (two electrons) can support exactly one arrow (one bond-forming event) per mechanistic step — two simultaneous bond-forming events from the same atom require either two separate steps or two genuinely distinct lone pairs.
- **Discrimination pairs [P33]**: One arrow from one lone pair (valid, forms one new bond, correct electron count) vs. two arrows from the same lone pair (invalid, would require four electrons from a two-electron source, impossible over-bonded result).
- **S6 repair path**: Present the explicit electron-count consequence of the invalid two-arrows-from-one-pair attempt, deriving the impossible 5-bond oxygen result.

### MC-3: A correct mechanism doesn't need formal charge checking — I can tell if it's right by looking
- **Probe**: "Draw the mechanism for the addition of HCN to acetaldehyde. Now calculate formal charges at each intermediate."
- **Characteristic phrase**: "I know it's right because it looks right" / "I'll check if the teacher says it's wrong."
- **Trigger (Type 5, instruction-induced)**: Students who are taught to draw mechanisms by pattern-matching from examples develop false confidence; formal charge checking is perceived as "extra work" that "good students don't need."
- **Conflict evidence [P28]**: A plausible-looking but incorrect mechanism (e.g., with the arrow direction reversed at one step) is presented; the student is asked to calculate formal charges — an incorrect arrow will always create an impossible charge (e.g., a neutral carbon becoming 5-valent). Formal charges catch errors that "looking right" misses.
- **Bridge [P30]**: Visual pattern-matching (judging a mechanism by whether its overall appearance resembles familiar, previously-seen examples) is a surface-level heuristic that can be fooled by subtle structural errors — a single reversed arrow, for instance, can produce a diagram that still "looks" superficially similar to a correct mechanism while actually violating basic valence/charge-balance rules at a specific atom; formal charge computation is a rigorous, mechanical CHECK that directly verifies each atom's electron count and charge at every step, catching precisely these subtle errors that visual inspection alone cannot reliably detect.
- **Replacement [P31]**: Always verify a drawn mechanism via explicit formal-charge computation at each intermediate — never rely on visual "looks right" pattern-matching alone, since subtle arrow errors can produce impossible charges that only explicit checking catches.
- **Discrimination pairs [P33]**: A mechanism that "looks right" but has a reversed arrow (producing an impossible formal charge upon checking, genuinely incorrect) vs. a mechanism verified via explicit formal-charge computation at every step (confirmed genuinely correct).
- **S6 repair path**: Present a deliberately plausible-looking but subtly incorrect mechanism, having the student compute formal charges to discover the hidden error.

## 5. Explanation Library

**Primary explanation**: Curved arrows specifically track electron-pair movement — their tails must always be anchored at a genuine electron source (a lone pair or an existing bond), never at an atomic nucleus, since nuclei themselves do not move during electron redistribution. A single lone pair (exactly two electrons) can support exactly one arrow per mechanistic step — attempting to draw two arrows from the same lone pair would require nonexistent electrons, producing an impossible over-bonded atom.

**Secondary explanation (formal charge verification is essential, not optional)**: A mechanism's correctness cannot be reliably judged by visual pattern-matching alone, since subtle errors (like a reversed arrow) can produce a diagram that superficially resembles a correct mechanism while actually violating valence/charge rules — explicit formal-charge computation at every intermediate is the rigorous, reliable verification method that catches such errors.

## 6. Analogy Library

- **Primary analogy**: A relay baton (an electron pair) that can only be handed to ONE next runner at a time — you cannot split a single baton's handoff into two simultaneous handoffs to two different runners, exactly as one lone pair cannot support two simultaneous arrows.
- **Breaking point**: The relay-baton analogy conveys the one-arrow-per-lone-pair limit well but doesn't naturally capture the arrow-tail-at-electron-source-not-nucleus principle (MC-1) or the formal-charge-verification necessity (MC-3) — those need the explicit electron-source identification and the deliberately-flawed-mechanism-checking exercise.
- **Anti-analogy**: Do NOT say "the arrow just shows which atom sends electrons to which atom" — this directly reinforces MC-1 by implying atom-to-atom (rather than electron-pair-to-new-bond) arrow anchoring.

## 7. Demonstration Library

- **Demonstration 1 (explicit electron-source identification for proton transfer)**: Present the explicit H₃O⁺-to-NH₃ mechanism, having the student identify and label the O–H bond as the electron source before drawing the arrow.
- **Demonstration 2 (impossible electron-count consequence of two arrows from one lone pair)**: Present the explicit (invalid) two-arrow attempt, deriving the impossible 5-bond oxygen result.
- **Demonstration 3 (deliberately flawed mechanism with formal-charge-check exercise)**: Present a plausible-looking but subtly incorrect mechanism, having the student compute formal charges to discover the hidden error.

## 8. Discovery Lesson

**Opening**: "In the proton transfer from H₃O⁺ to NH₃, does the arrow start at the oxygen atom itself?"

**Exploration**: Students trace the specific electron-pair source (the O–H bond), discovering the arrow must anchor there, not at the nucleus.

**Synthesis**: Guide toward: arrows track electron-pair movement, always anchored at a genuine electron source, never at an atom's nucleus directly.

**Closure**: "Can you tell if a mechanism is correct just by looking at it, or do you need to check something else?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit electron-source identification for the H₃O⁺-to-NH₃ proton transfer.
- **TA-2 (TELL)**: State the one-arrow-per-lone-pair limit explicitly, anchored to the impossible-electron-count demonstration.
- **TA-3 (DO)**: Student computes formal charges at each intermediate of an unfamiliar drawn mechanism to verify correctness.
- **TA-4 (TEST-THINKING)**: Present the deliberately flawed mechanism and ask the student to locate the error via formal-charge checking.

## 10. Voice Teaching

Whenever an arrow is drawn, narrate "anchor the tail at a genuine electron pair — lone pair or bond, never a nucleus." Whenever a mechanism is completed, state "always verify with formal charges — never trust 'looks right' alone" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly anchor every arrow tail at a genuine electron source, (b) correctly recognize the one-arrow-per-lone-pair limit, (c) correctly verify a mechanism's validity via explicit formal-charge computation.

- **FA-1**: "In the proton transfer from H₃O⁺ to NH₃, draw the arrow. Where exactly does it start?" — targets MC-1.
- **FA-2**: "Can an oxygen atom use its lone pair to simultaneously attack two electrophiles in one step?" — targets MC-2.
- **FA-3**: "Draw the mechanism for the addition of HCN to acetaldehyde. Now calculate formal charges at each intermediate." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students newly introduced to arrow-pushing who default to an everyday "arrow from this atom" interpretation.

**Delayed retrieval**: Re-probe MC-1's electron-source-anchoring principle and MC-3's formal-charge-verification requirement as foundational knowledge for all subsequent organic mechanism-drawing across every reaction type.

## 12. Recovery Notes

- **S3 (stuck)**: For the atom-vs-electron-source confusion, have the student explicitly identify and label the specific lone pair or bond before drawing any arrow.
- **S4 (frustrated)**: Normalize — anchoring arrows at atoms rather than electron pairs is genuinely common on first exposure, since everyday "send electrons from X to Y" language invites this error.
- **S6 (collision)**: Use the explicit impossible-electron-count demonstration for MC-2; use the deliberately flawed mechanism for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why formal-charge checking is necessary even when a mechanism "looks right."

## 13. Memory & Review

Tag as two procedural memories (electron-source-anchored arrow drawing; one-arrow-per-lone-pair limit) plus one conceptual-correction memory (formal-charge verification as a required, non-optional step). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates mechanism reasoning built across `chem.org.mechanisms`, forming the capstone, universally-applicable arrow-notation skill underlying all subsequent organic reaction mechanism drawing.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
