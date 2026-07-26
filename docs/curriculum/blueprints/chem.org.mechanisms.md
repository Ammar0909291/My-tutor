# chem.org.mechanisms — Organic Reaction Mechanisms

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.org.mechanisms` |
| Domain | Organic Chemistry |
| Requires | `chem.org.reactive-intermediates` |
| Unlocks | `chem.carb.aldehydes`, `chem.hyd.alkenes`, `chem.nitro.amines`, `chem.org.arrow-pushing`, `chem.org.pericyclic` |
| Difficulty | proficient |
| Bloom Level | analyze |
| Mastery Threshold | 0.8 |
| Estimated Hours | 5 |

## 1. Concept Spine

A curved arrow always shows the movement of an ELECTRON PAIR, never the movement of an atom — in SN2, the nucleophile's arrow starts at its lone pair and points TO the carbon (electrons attacking), while the leaving-group arrow starts at the C–X bond and points TO X (electrons departing with the leaving group), so the arrows describe electron flow, which is frequently in a different direction from where atoms appear to "go"; radical mechanisms require single-barbed FISH-HOOK arrows (moving one electron at a time), never the double-headed arrows of ionic mechanisms (which move electron PAIRS), because a radical step genuinely breaks/forms bonds one electron at a time; and pericyclic reactions (e.g., Diels-Alder) are CONCERTED — all bonds break and form SIMULTANEOUSLY in a single cyclic transition state with no ionic or radical intermediate ever forming, driven by orbital overlap (HOMO-LUMO interaction) rather than by any catalyst or charged species.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Drawing the explicit SN2 arrow-pushing for Br⁻ + CH₃Br, tracing exactly where each arrow starts (a lone pair or a bond) and ends (a new bond or a departing atom), never at an atom itself.

**Representational**: A side-by-side comparison of a double-headed ionic arrow (electron pair) against a single-barbed fish-hook arrow (one electron), used on the same radical propagation step to show the mismatch when a double-headed arrow is mistakenly applied.

**Abstract**: The general principle that curved arrows encode electron-pair (or single-electron, for radicals) movement, never atom movement; the general concerted-vs-stepwise distinction, with pericyclic reactions as the canonical no-intermediate, concerted case.

**Transfer**: Given an unfamiliar reaction (ionic, radical, or pericyclic), correctly drawing arrows that track electron movement (double-headed for pairs, fish-hook for single electrons) and correctly identifying whether the mechanism proceeds through a discrete ionic/radical intermediate or a single concerted transition state.

## 3. Why Beginners Fail

Students interpret curved arrows as showing where an ATOM physically moves (following an everyday sense of "arrow = direction of travel of an object"), missing that arrows specifically track ELECTRON-PAIR movement, which is frequently opposite to or independent of where the associated atom ends up (e.g., the nucleophile's arrow starts at its own lone pair and points toward carbon, not "toward" the leaving group); they apply the same double-headed arrow notation learned from ionic mechanisms directly to radical mechanisms without adjusting for the fact that a radical step moves only ONE electron at a time, missing that only a single-barbed fish-hook arrow is valid for such single-electron transfers; and they assume all organic reactions must proceed through some catalyst or ionic/radical intermediate (over-generalizing from their experience with SN1/SN2/radical mechanisms), missing that pericyclic reactions are genuinely concerted — all bond-breaking and bond-forming happens in one simultaneous step via a cyclic transition state, with no point at which an ion or radical intermediate actually exists.

## 4. Misconception Library

### MC-1: The curved arrow shows where the atom moves
- **Probe**: "In the reaction of Br⁻ with CH₃Br, draw the curved arrows. Where does the Br⁻ arrow start?"
- **Characteristic phrase**: "I draw the arrow from the carbon to the bromine because the bromide leaves" / "the arrow shows where the molecule goes."
- **Trigger (Type 3, language contamination)**: "Arrow" in everyday language means direction of movement of an object; here it means direction of electron-pair movement, which is often opposite to the atom's apparent movement.
- **Conflict evidence [P28]**: Arrows show ELECTRONS moving, not atoms. In SN2, the arrow starts at the lone pair of the incoming nucleophile (Br⁻) and goes TO the carbon. The leaving group's arrow goes FROM the C–Br bond TO the Br (the electrons follow the leaving group OUT) — drawing the arrow "from carbon to bromine" as if it depicts bromide physically departing gets the electron-pair direction backward for the incoming nucleophile's step.
- **Bridge [P30]**: Every curved arrow must be anchored at a source of electron density (a lone pair or an existing bond) and point to where those electrons end up (a new bond or a departing atom/ion) — never anchored at an atom's starting position with the intent of showing that atom's physical trajectory.
- **Replacement [P31]**: Always ask "where do the electrons start (lone pair/bond) and where do they end up (new bond/departing species)?" before drawing any arrow — never reason from "where does the atom go?"
- **Discrimination pairs [P33]**: Correct nucleophile arrow (lone pair on Br⁻ → new C–Br bond) vs. incorrect atom-motion arrow (implying Br⁻ itself "moves toward" carbon along the arrow's path, missing the electron-pair anchoring).
- **S6 repair path**: Walk through the SN2 arrow-pushing step by step, explicitly naming the electron source and destination for each arrow before drawing it.

### MC-2: Radical mechanisms use the same double-headed arrows as ionic mechanisms
- **Probe**: "Draw the propagation step of chlorine radical abstracting H from methane."
- **Characteristic phrase**: student draws a normal double-headed arrow from H to Cl•.
- **Trigger (Type 5, instruction-induced)**: Students learn curved arrows in ionic context first; when radicals appear, they apply the same notation without adjusting for single-electron steps.
- **Conflict evidence [P28]**: A radical has ONE unpaired electron; it can only move ONE electron at a time, so only a fish-hook arrow (single barb) is valid — a double-headed arrow incorrectly implies a full electron PAIR is moving, which is not what happens in a homolytic, single-electron radical step.
- **Bridge [P30]**: Arrow notation must match the actual number of electrons moving in that specific step — double-headed arrows are reserved for electron-PAIR movement (heterolytic, ionic mechanisms), while fish-hook (single-barbed) arrows are reserved for single-electron movement (homolytic, radical mechanisms); the two notations are not interchangeable.
- **Replacement [P31]**: Use fish-hook (single-barbed) arrows exclusively for radical/homolytic steps, and double-headed arrows exclusively for ionic/heterolytic (electron-pair) steps — never mix the two notations.
- **Discrimination pairs [P33]**: Chlorine radical H-abstraction (fish-hook arrows, one electron each) vs. an SN2 step (double-headed arrows, electron pairs) — same "arrow" concept, genuinely different electron count per arrow.
- **S6 repair path**: Show the fish-hook arrow explicitly alongside the double-headed arrow for the same bond, contrasting one-electron vs. two-electron movement.

### MC-3: Pericyclic reactions must have a catalyst or ionic intermediate
- **Probe**: "What ionic intermediate forms in the Diels-Alder reaction?"
- **Characteristic phrase**: "there must be a carbocation somewhere" / "it needs a Lewis acid."
- **Trigger (Type 1, overgeneralization)**: Students overgeneralize from their experience of reactions needing initiation (radical chain reactions) or a discrete intermediate (SN1/SN2); pericyclic reactions are concerted and need neither catalyst nor ionic intermediate — they violate this expected pattern.
- **Conflict evidence [P28]**: The Diels-Alder transition state is a six-membered cyclic electron loop in which ALL bonds break and form SIMULTANEOUSLY; there is no point at which you have an ion or radical. The driving force is orbital overlap (HOMO of diene with LUMO of dienophile), not any catalyst or Lewis acid requirement.
- **Bridge [P30]**: "Concerted" specifically means all bond reorganization happens in one single transition state with no discrete intermediate ever formed — this is mechanistically distinct from stepwise ionic (SN1) or radical (chain) mechanisms, which genuinely do pass through separate intermediate species with their own finite lifetimes.
- **Replacement [P31]**: Pericyclic reactions proceed through a single concerted transition state with no ionic or radical intermediate and no required catalyst — never assume every organic reaction needs an intermediate or catalytic activation.
- **Discrimination pairs [P33]**: Diels-Alder (concerted, cyclic transition state, no intermediate, no catalyst required) vs. SN1 (stepwise, discrete carbocation intermediate with measurable lifetime).
- **S6 repair path**: Draw the full cyclic transition state explicitly, pointing out that no single point along the reaction coordinate corresponds to an isolable ionic or radical species.

## 5. Explanation Library

**Primary explanation**: Curved arrows are a bookkeeping notation for electron movement, not atom movement — a double-headed arrow tracks an electron PAIR (ionic/heterolytic mechanisms), while a fish-hook (single-barbed) arrow tracks a single electron (radical/homolytic mechanisms), and the two notations must never be interchanged. Every arrow must be anchored at an actual electron source (lone pair or bond) and terminate at an actual electron destination (new bond or departing species).

**Secondary explanation (concerted vs. stepwise mechanisms)**: Not every organic reaction proceeds through a discrete ionic or radical intermediate — pericyclic reactions like the Diels-Alder cycloaddition are genuinely concerted, with all bonds breaking and forming simultaneously in a single cyclic transition state driven by orbital overlap, requiring neither a catalyst nor any ionic/radical intermediate at any point.

## 6. Analogy Library

- **Primary analogy**: A relay race baton pass (electron pair, double-headed arrow) vs. a single runner handing off one shoe at a time (single electron, fish-hook arrow) — the notation must match how many "objects" (electrons) are actually being transferred in that step.
- **Breaking point**: The relay-race analogy conveys the electron-count distinction well but doesn't naturally capture the atom-vs-electron confusion (MC-1) or the concerted-mechanism concept (MC-3) — those need the explicit lone-pair/bond anchoring argument and the cyclic transition-state diagram.
- **Anti-analogy**: Do NOT say "the arrow shows the leaving group walking away" — this directly reinforces MC-1 by framing the arrow as atom motion rather than electron-pair motion.

## 7. Demonstration Library

- **Demonstration 1 (SN2 arrow-pushing with explicit electron anchoring)**: Draw the SN2 arrows for Br⁻+CH₃Br step by step, naming the electron source and destination for each arrow before drawing it.
- **Demonstration 2 (fish-hook vs. double-headed contrast)**: Present the chlorine radical H-abstraction step with fish-hook arrows alongside an ionic step with double-headed arrows on the same bond type, isolating the electron-count distinction.
- **Demonstration 3 (Diels-Alder concerted transition state)**: Draw the full six-membered cyclic transition state explicitly, pointing out the absence of any isolable ionic or radical intermediate.

## 8. Discovery Lesson

**Opening**: "When Br⁻ attacks CH₃Br, does the curved arrow show bromide physically moving, or something else?"

**Exploration**: Students trace where each arrow actually starts (a lone pair) and ends (a new bond), discovering arrows encode electron movement, not atom movement.

**Synthesis**: Guide toward: every arrow is anchored at an electron source and terminates at an electron destination — atom position is a consequence, not what the arrow itself depicts.

**Closure**: "Does the Diels-Alder reaction need a catalyst or an ionic intermediate, like SN1 does?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit SN2 arrow-pushing with electron-source/destination naming at each step.
- **TA-2 (TELL)**: State the fish-hook-vs-double-headed arrow rule explicitly, anchored to electron count per step.
- **TA-3 (DO)**: Student draws arrows for an unfamiliar radical propagation step, choosing correct fish-hook notation.
- **TA-4 (TEST-THINKING)**: Present the Diels-Alder probe and ask the student to justify the absence of any ionic intermediate from the concerted mechanism.

## 10. Voice Teaching

Whenever a curved arrow is drawn, narrate "electrons move, not atoms — name the source and destination first." Whenever a radical step appears, state "one electron, one fish-hook — never a double-headed arrow" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly draw ionic mechanism arrows anchored at genuine electron sources/destinations, (b) correctly use fish-hook notation for radical steps, (c) correctly identify pericyclic reactions as concerted with no intermediate.

- **FA-1**: "Draw the curved arrows for Br⁻ attacking CH₃Br, and explain where each arrow starts and ends." — targets MC-1.
- **FA-2**: "Draw the propagation step of chlorine radical abstracting H from methane." — targets MC-2.
- **FA-3**: "What ionic intermediate forms in the Diels-Alder reaction?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students newly introduced to arrow-pushing who default to an everyday "arrow = motion" interpretation.

**Delayed retrieval**: Re-probe MC-1's electron-anchoring rule and MC-3's concerted-mechanism distinction before `chem.org.arrow-pushing` requires fluent, independent mechanism drawing across mechanism types.

## 12. Recovery Notes

- **S3 (stuck)**: For the atom-vs-electron confusion, have the student explicitly name the electron source (lone pair or bond) before drawing any arrow, never starting from "where does the atom go."
- **S4 (frustrated)**: Normalize — the atom-vs-electron arrow confusion is genuinely common on first exposure to organic mechanisms, since everyday arrow usage means object motion.
- **S6 (collision)**: Use the fish-hook/double-headed contrast for MC-2; use the explicit cyclic transition-state diagram for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why the Diels-Alder reaction needs no catalyst or ionic intermediate.

## 13. Memory & Review

Tag as a procedural memory (electron-source/destination arrow drawing; fish-hook vs. double-headed notation) plus one conceptual-correction memory (concerted vs. stepwise mechanisms). Schedule a spaced check at ~1 week and again before `chem.org.arrow-pushing`.

## 14. Transfer Map

Feeds directly into `chem.org.arrow-pushing` (fluent, correct arrow notation is the direct prerequisite skill), `chem.carb.aldehydes`, `chem.hyd.alkenes`, `chem.nitro.amines` (mechanism-based reasoning recurs across all these functional-group reaction chapters), and `chem.org.pericyclic` (extends the concerted-mechanism concept established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
