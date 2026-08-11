# eng.communication.technical-writing

## Identity
- **KG ID**: `eng.communication.technical-writing`
- **Domain**: communication
- **Requires**: `eng.communication.academic-writing-advanced`
- **Unlocks**: `eng.communication.presentation-design`
- **Cross-links**: `eng.writing.expository-writing`
- **Difficulty**: advanced
- **Bloom level**: Create
- **Mastery threshold**: 0.75
- **Estimated hours**: 3

## Learning Objective
The learner will write step-by-step instructions a zero-knowledge reader can follow successfully, use precise and consistent terminology throughout a technical document, and anticipate and address at least one likely point of reader confusion or error.

## Core Understanding
Technical writing requires the OPPOSITE instinct from most other writing genres: rigid, unwavering terminological consistency rather than varied vocabulary, and explicit anticipation of failure points rather than describing only the ideal "happy path." Once a term names something (a component, a setting, a step), that exact term must be used every single time it's referenced again — switching between synonyms, which reads as sophisticated in a personal essay, creates dangerous ambiguity in technical instructions about whether different terms refer to the same or different things. Separately, instructions that only describe the successful sequence fail exactly the readers who need help most — good technical writing identifies specific, plausible points of confusion and writes guidance directly into the instructions at those points.

## Mental Models
- **Three-Named-Intersection-Map Anchor**: a map that labels the same intersection with three different names on three different signs leaves a navigator uncertain whether they're in the right place. Technical writing needs rigid, boring, unwavering consistency for every named part, tool, or step — the opposite of literary vocabulary variety.
- **Hiking-Trail-Fork Anchor**: a trail guide that only describes the correct route with zero mention of a common wrong-turn fork fails exactly the hikers who need help most. Good technical writing anticipates the SPECIFIC points where readers are likely to go wrong and addresses them directly.

## Why Students Fail
Learners who've been praised for vocabulary variety in prior writing (essays, narratives) transfer that instinct into technical writing without recognizing it's a register-specific skill with an opposite goal here — this is a register-transfer error, not a comprehension gap. Separately, writing only the happy path is a perspective-taking failure: it's easier to describe what you personally know how to do correctly than to imagine where a reader with zero prior knowledge would actually stumble.

## Misconceptions
- **MC-A (Type 6, analogy overextension from "vary vocabulary for interesting writing")**: "Technical writing should use varied vocabulary to avoid repetition, like other writing." Diagnostic: present instructions using three different terms for the same component ("the switch," "the toggle," "the control") against a version using one consistent term, and ask whether a first-time reader would know these refer to the same thing. Repair: three-named-intersection anchor — once something is named, use that exact term every time, resisting the instinct to vary vocabulary.
- **MC-B (Type 2, perceptual-intuition from only imagining one's own successful execution)**: "Technical writing only needs to describe what to do when everything goes right." Diagnostic: present happy-path-only assembly instructions against a version anticipating a common error (part inserted upside down) and ask which would help a reader who actually made that mistake. Repair: hiking-trail-fork anchor — after drafting, ask at which specific steps a reader is likely to get confused or make a mistake, and add guidance there.

## Analogies
- Three-named-intersection anchor (above) for terminological consistency.
- Hiking-trail-fork anchor (above) for anticipating error points.
- Anti-analogy: anticipating errors does not mean documenting every conceivable failure exhaustively — the goal is addressing the MOST LIKELY, plausible points of confusion specific to this process, not padding instructions with generic disclaimers.

## Demonstrations
- Highlight every unique component mentioned in a draft in one color, and every different word used to refer to it in a second color — any component with more than one highlighted term needs standardizing.
- Compare "insert part A into slot B" against "insert part A into slot B; if it doesn't slide in easily, check that the arrow is facing up" — ask what happens to a reader who inserted it upside down under each version.
- Full worked example: setting up an email spam filter, with a consistent term used throughout, zero-knowledge-assuming numbered steps, and one anticipated error point (grayed-out menu option, needing email verification first).

## Discovery Questions
- "If you'd never seen this device before, would you know 'the toggle' and 'the control' refer to the same part as 'the switch'?"
- "If you accidentally did the wrong thing at this step, would this instruction help you at all?"
- "What's one place a first-time user of this process might actually get confused, based on what you remember when you first learned it?"

## Teaching Sequence
1. Diagnostic: academic-writing revision-for-concision check and basic instruction-writing check.
2. Anchor: three-named-intersection and hiking-trail-fork framing together.
3. TA-1: identify and standardize inconsistent terminology in a draft (targets MC-A).
4. TA-2: break a dense process description into clear, zero-knowledge, numbered steps.
5. TA-3: identify a likely error point in happy-path-only instructions and write guidance for it (targets MC-B).
6. TA-4: full technical document — consistent terminology, zero-knowledge steps, one anticipated error point.

## Tutor Actions
- SHOW: three-different-terms vs. one-consistent-term instruction pair; happy-path-only vs. error-anticipating instruction pair.
- DO: learner literally attempts to follow their own instructions as a first-time user, flagging where they personally would get confused.
- TEST-THINKING: predict what a reader would do if a described step went wrong in a specific, plausible way.
- ORGANIZE: a highlight-and-standardize pass (one color per component, flag any component with 2+ highlighted terms).

## Voice Teaching Notes
Expect stronger initial resistance to MC-A from learners who've recently been praised for vocabulary variety elsewhere — explicitly frame this as a register-specific skill with an opposite goal, not a contradiction of prior good writing advice.

## Assessment Signals
- Probe: "This draft calls the same part three different names. Standardize it." An answer that "improves" the variety instead of collapsing it to one term signals MC-A.
- Probe: given happy-path-only instructions, "identify a likely error point." A vague answer ("something might go wrong") rather than a specific, plausible confusion point signals incomplete resolution of MC-B.
- Confident-wrong signature: fluent, well-organized instructions that read smoothly but never once anticipate a mistake — flag MC-B regardless of the prose's overall clarity.

## Tutor Recovery Strategy
If a learner's anticipated error points remain generic even after correction, have them draw on their own memory of confusion the first time THEY learned this specific process — personal recall is often the richest source of genuinely specific anticipatory guidance.

## Memory Hooks
"One name, every time" for terminological consistency; "the fork in the trail most hikers miss" for anticipating error points.

## Transfer Connections
Directly extends `eng.communication.academic-writing-advanced`; unlocks `eng.communication.presentation-design`, where this concept's precise verbal formulation becomes the basis for visual presentation. Cross-links to `eng.writing.expository-writing` as a related but distinct clarity-focused genre.

## Cross-Subject Connections
The terminological-consistency principle mirrors scientific and mathematical notation conventions (never switching symbols for the same quantity mid-derivation) — the same "one name, no exceptions" discipline that prevents ambiguity in any precise, procedural domain.

## Blueprint References
Full detail (Prerequisite Diagnostic Block, complete Worked Examples, Mastery Probe Set, Session Architecture, Adaptive Flags) at `docs/curriculum/blueprints/eng.communication.technical-writing.md` — reused by reference, not restated here.

## Runtime Asset References
No AssetIdentity rows seeded for this concept yet. Lesson content, visuals, and practice items are runtime/pipeline-generated per standing layer-ownership rules — not authored here.

## Curriculum Feedback
None — the single prerequisite, single unlock, and cross-link to `eng.writing.expository-writing` are clean and consistent with the Blueprint.

## Version History
- 2026-08-11: Initial authoring (Batch 29), English Educational Brain program, `main` branch.
