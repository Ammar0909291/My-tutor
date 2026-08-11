# eng.composition.editing-for-style

## Identity
- **KG ID**: `eng.composition.editing-for-style`
- **Domain**: composition
- **Requires**: `eng.composition.style-voice-and-tone`, `eng.composition.academic-writing-conventions`
- **Unlocks**: (none — terminal node)
- **Cross-links**: none beyond KG requires/unlocks
- **Difficulty**: expert
- **Bloom level**: Evaluate
- **Mastery threshold**: 0.70
- **Estimated hours**: 2

## Learning Objective
The learner will distinguish editing for style from proofreading for correctness, identify and cut wordy/padding phrases without losing meaning, and replace vague wording with precise wording while preserving the draft's established voice.

## Core Understanding
Grammatical correctness and stylistic quality are independent axes — a sentence can be entirely error-free while still being wordy, vague, or flat, and editing for style is a SEPARATE PASS that a correctness check never performs. The core editing skill has two parts: cutting PADDING (words that add nothing) while never cutting real content, and replacing VAGUE wording with PRECISE wording. The critical discipline is that "shorter" is not automatically "better" — economy means removing what adds nothing while protecting what carries needed meaning; indiscriminately cutting words can destroy real information just as surely as leaving padding in place damages clarity.

## Mental Models
- **Chef's-Finish-Line Anchor**: a chef who declares a dish finished the moment no ingredient is spoiled, ignoring seasoning and presentation entirely, mistakes the floor for the ceiling. Correctness is the minimum floor; a technically correct sentence can still be bloated, vague, or inconsistent — editing for style is the separate pass that raises a merely-correct draft to an actually strong one.
- **Butcher's-Trim Anchor**: a butcher trimming meat by removing whatever is fastest to cut, regardless of whether it's fat or muscle, ends up with less but not necessarily better. Real stylistic editing removes padding (fat) while protecting precision (muscle) — the goal is economy, not mere shortness.

## Why Students Fail
Learners who've just cleared a grammar/correctness bar treat that bar as the finish line, because "no errors found" feels conclusive in a way that "could this be tighter" does not. Once taught to cut, learners often apply "shorter is better" as a blanket rule rather than a selective one, because distinguishing padding from necessary detail requires judging EACH word's function rather than applying a uniform length-reduction heuristic.

## Misconceptions
- **MC-A (Type 1, overgeneralization from "correct = finished")**: "If a sentence is grammatically correct, there is nothing left to edit." Diagnostic: present two grammatically flawless sentences with the same meaning ("Due to the fact that the weather conditions were of an unfavorable nature, the event was ultimately cancelled" vs. "Bad weather cancelled the event") and ask which communicates more effectively, and why the first isn't "wrong." Repair: chef's-finish-line anchor — correctness is the floor, not the ceiling; run a separate pass asking "is this the clearest, most economical way to say this?"
- **MC-B (Type 1, overgeneralization from "shorter is always better")**: "Cutting words always improves a sentence, regardless of what is cut." Diagnostic: present a correctly-cut sentence (padding removed, meaning preserved) beside an over-cut sentence that lost real information, and ask whether both cuts made the sentence "better," not just shorter. Repair: butcher's-trim anchor — before cutting, ask whether a word or phrase carries real meaning/nuance/specificity, or is pure padding; cut only the padding.

## Analogies
- Chef's-finish-line anchor (above) for correctness-vs-style as separate passes.
- Butcher's-trim anchor (above) for padding-vs-substance in cutting.
- Anti-analogy: editing for style is not "make the sentence sound more sophisticated" — the chef's-finish-line direction is toward CLARITY and ECONOMY, not toward complexity; a shorter, plainer sentence that says the same thing more clearly is the goal, not an elaborate rewrite.

## Demonstrations
- Side-by-side: a grammatically flawless but padded sentence vs. its tightened equivalent, asking why the first "isn't wrong" but is still weaker.
- A correctly-cut sentence (padding removed, meaning intact) beside an over-cut sentence (real information destroyed) on the same content.
- A paragraph with three padded sentences and two vague phrases, revised step by step: padding cut, vague phrases sharpened, voice consistency confirmed.

## Discovery Questions
- "Is this sentence grammatically wrong anywhere? Then why does the tightened version communicate so much more effectively?"
- "Does this word or phrase carry real meaning your reader needs, or is it pure padding?"
- "Did this cut make the sentence shorter — did it also throw away information the reader needed?"

## Teaching Sequence
1. Diagnostic: voice/tone consistency check and academic-register check (both prerequisites).
2. Anchor: chef's-finish-line and butcher's-trim framing together.
3. TA-1: explain why a grammatically flawless sentence can still be stylistically weak (targets MC-A).
4. TA-2: identify padding vs. real content, cutting only padding (targets MC-B).
5. TA-3: replace vague wording ("a lot of," "things," "very") with precise alternatives.
6. TA-4: full paragraph edit — cut padding, sharpen vague wording, confirm voice consistency.

## Tutor Actions
- SHOW: correct-but-bloated vs. correct-and-tight sentence pair; correctly-cut vs. over-cut sentence pair.
- DO: learner cuts padding from a provided sentence, marking exactly which words were removed and why.
- TEST-THINKING: predict what information would be lost if a candidate phrase were cut.
- ORGANIZE: a starter list of common padding patterns ("due to the fact that," "in order to," "it is important to note that") as a scanning aid.

## Voice Teaching Notes
If a learner correctly identifies padding on provided sentences but over-cuts their own original draft, this is a common transfer gap (recognition vs. production) — provide a mandatory "does this word carry real meaning?" checklist step before any cut on their own writing.

## Assessment Signals
- Probe: "Explain why this grammatically correct sentence still needs editing." A response that can't articulate anything beyond "it's fine" signals residual MC-A.
- Probe: given an over-cut sentence, "identify what meaning was lost." Inability to name the lost information (or insisting nothing was lost) signals MC-B.
- Confident-wrong signature: an aggressively shortened sentence presented as "improved" that has quietly dropped a quantity, qualifier, or specific detail — flag MC-B regardless of how fluent the shortened version reads.

## Tutor Recovery Strategy
If a learner's vague-wording replacements drift into an inconsistent voice (fixing precision but breaking register), push for an explicit re-read of the paragraph's established voice immediately after each precision edit — this is a sequencing fix, not a re-teach of either misconception.

## Memory Hooks
"Correctness is the floor, not the ceiling" for MC-A; "cut the fat, keep the muscle" for MC-B.

## Transfer Connections
Directly extends `eng.composition.style-voice-and-tone` and `eng.composition.academic-writing-conventions`; this is a terminal node in the current curriculum sequence. Learners strong in `eng.composition.style-voice-and-tone`'s voice-consistency work should transfer readily to preserving voice during style edits.

## Cross-Subject Connections
The padding-vs-substance distinction mirrors code review's "does this line do work, or is it dead weight" question, and mirrors any editing discipline (photo cropping, video editing) where removing content improves the result only when what's removed truly adds nothing.

## Blueprint References
Full detail (Prerequisite Diagnostic Block, complete Worked Examples, Mastery Probe Set, Session Architecture, Adaptive Flags) at `docs/curriculum/blueprints/eng.composition.editing-for-style.md` — reused by reference, not restated here.

## Runtime Asset References
No AssetIdentity rows seeded for this concept yet. Lesson content, visuals, and practice items are runtime/pipeline-generated per standing layer-ownership rules — not authored here.

## Curriculum Feedback
None — this is a terminal node in the KG (no `unlocks`), consistent with its dual-prerequisite Blueprint and its role as a revision-discipline capstone on both style and academic register.

## Version History
- 2026-08-11: Initial authoring (Batch 28), English Educational Brain program, `main` branch.
