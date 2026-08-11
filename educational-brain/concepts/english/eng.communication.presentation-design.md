# eng.communication.presentation-design

## Identity
- **KG ID**: `eng.communication.presentation-design`
- **Domain**: communication
- **Requires**: `eng.speaking.presentation-skills`, `eng.communication.technical-writing`
- **Unlocks**: (none — terminal node)
- **Cross-links**: none beyond KG requires/unlocks
- **Difficulty**: advanced
- **Bloom level**: Create
- **Mastery threshold**: 0.75
- **Estimated hours**: 2

## Learning Objective
The learner will design slides that support spoken content rather than duplicating it word-for-word, apply a one-main-idea-per-slide principle, and choose visual elements that clarify the spoken point rather than merely decorate the slide.

## Core Understanding
Designing visual materials meant to be seen WHILE someone is speaking is a fundamentally different design problem than a standalone document — a slide that tries to say everything competes with the speaker instead of supporting them, because an audience cannot simultaneously read a dense slide and listen to spoken words; one activity wins, and it's usually reading, so the spoken words go unheard. A strong slide is reduced to a small number of key words, phrases, or visuals that REINFORCE the spoken point, never duplicating the full script. Separately, every visual element (a diagram, image, chart) should be chosen because it CLARIFIES the specific point being made on that slide — not because it looks professional or fills space; a decorative, thematically unrelated image adds no meaning and can distract from a diagram that actually would help.

## Mental Models
- **Book-While-Storytelling Anchor**: handing someone a book to read at the exact moment you're telling them a story out loud forces them to choose between reading and listening — usually the book wins, so the spoken words go unheard. A strong slide supports the spoken word instead of duplicating it, so the audience can do both at once.
- **Unrelated-Painting Anchor**: hanging an unrelated decorative painting on a whiteboard being used to explain a math problem might look nicer, but does nothing to help anyone understand the problem, and can distract from the diagram that actually would help.

## Why Students Fail
Learners transferring habits from written documents (where completeness and full sentences are valued) default to packing slides with the full spoken script, because that feels thorough rather than incomplete. Separately, "professional-looking" slides in learners' prior experience often had decorative visual elements, so adding a visual becomes a default habit disconnected from whether it actually clarifies anything.

## Misconceptions
- **MC-A (Type 5, instruction-induced from written-document completeness habits)**: "A good slide contains the full text of what the speaker will say." Diagnostic: present a slide dense with full sentences duplicating the entire spoken script against one with a single short phrase and one supporting image, and ask which lets the audience read and listen simultaneously without choosing one over the other. Repair: book-while-storytelling anchor — reduce slides to key words/phrases/visuals that support the speech, never duplicating the full script.
- **MC-B (Type 1, overgeneralization from "slides need visual elements to look professional")**: "Every slide needs decorative visual elements to look professional." Diagnostic: present a decorative, thematically unrelated stock image against a simple diagram directly illustrating the point being described aloud, and ask which actually helps the audience understand the specific point. Repair: unrelated-painting anchor — before adding any visual, ask whether it clarifies the specific point being made, or is just filling space.

## Analogies
- Book-while-storytelling anchor (above) for support-not-duplicate.
- Unrelated-painting anchor (above) for clarify-not-decorate.
- Anti-analogy: this is not "slides should have no text or visuals at all" — a well-chosen visual and a short supporting phrase are both valuable; the discipline is choosing them for function (support, clarify), not omitting them entirely.

## Demonstrations
- Reduce a text-heavy slide (full sentences duplicating a spoken script) to a short phrase plus a supporting visual, then verify the original content can still be delivered aloud, unaided by the slide.
- Split a slide crowded with three unrelated points into three single-idea slides.
- Compare a decorative stock image against a simple bar chart on the same slide, asking which helps explain the specific point.

## Discovery Questions
- "If someone read only this slide with no speaker present, would they get everything — or does it need the speech to make full sense?"
- "Does this visual element help explain the specific point on this slide, or is it just there to fill space?"
- "Are you reading the slide, listening to the speaker, or trying (and failing) to do both at once?"

## Teaching Sequence
1. Diagnostic: presentation-delivery technique check and technical-writing summary check.
2. Anchor: book-while-storytelling and unrelated-painting framing together.
3. TA-1: reduce a text-heavy slide to a short supporting phrase plus visual (targets MC-A).
4. TA-2: split a multi-idea slide into single-idea slides.
5. TA-3: evaluate candidate visuals by whether they clarify the specific spoken point (targets MC-B).
6. TA-4: full slide set design — one idea per slide, minimal supporting text, only clarifying visuals.

## Tutor Actions
- SHOW: text-heavy vs. reduced-phrase-plus-visual slide pair; decorative vs. clarifying visual pair.
- DO: reduce a text-heavy slide to five words or fewer, then explain aloud everything the original sentences said, unaided.
- TEST-THINKING: for a candidate visual, state specifically what point it clarifies, or explain why it should be removed.
- ORGANIZE: a one-slide-per-bullet-point starter template for splitting multi-idea slides.

## Voice Teaching Notes
If a learner correctly reduces text on provided slides but reverts to dense slides when designing their own original set, treat this as a common transfer gap (recognition vs. production) — a mandatory word-count cap per slide as scaffolding often resolves it faster than re-teaching the principle.

## Assessment Signals
- Probe: "Reduce this slide duplicating the full script to a short phrase plus visual." A response that keeps full sentences (even if trimmed) signals residual MC-A.
- Probe: given two candidate visuals for the same slide, "identify which is decorative and which clarifies." An inability to distinguish, or defending the decorative one on appearance grounds, signals MC-B.
- Confident-wrong signature: a visually polished, professional-looking slide deck where several visuals add no connection to the spoken content — flag MC-B regardless of the deck's overall aesthetic quality.

## Tutor Recovery Strategy
If a learner's text reduction is strong but visual choices remain decorative, require an explicit written justification ("this visual clarifies ___") for every visual element before it's allowed onto a slide — this converts an implicit habit into an explicit, checkable step.

## Memory Hooks
"Don't hand them a book while you're telling the story" for support-not-duplicate; "an unrelated painting on the math whiteboard" for clarify-not-decorate.

## Transfer Connections
Directly extends `eng.speaking.presentation-skills` and `eng.communication.technical-writing`; this is a terminal node in the current curriculum sequence. Learners strong in `eng.communication.technical-writing`'s concision work should transfer readily to slide text reduction.

## Cross-Subject Connections
The support-not-duplicate principle mirrors any multimedia-learning design norm (e.g., a lab diagram that reinforces, rather than repeats, a verbal explanation) — visual and verbal channels should divide labor, not compete for the same attention.

## Blueprint References
Full detail (Prerequisite Diagnostic Block, complete Worked Examples, Mastery Probe Set, Session Architecture, Adaptive Flags) at `docs/curriculum/blueprints/eng.communication.presentation-design.md` — reused by reference, not restated here.

## Runtime Asset References
No AssetIdentity rows seeded for this concept yet. Lesson content, visuals, and practice items are runtime/pipeline-generated per standing layer-ownership rules — not authored here.

## Curriculum Feedback
None — this is a terminal node in the KG (no `unlocks`), consistent with its dual-prerequisite Blueprint extending both spoken delivery and technical-writing concision.

## Version History
- 2026-08-11: Initial authoring (Batch 30), English Educational Brain program, `main` branch.
