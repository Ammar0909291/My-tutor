# Introduction to Computational Linguistics — `eng.linguistics.computational-linguistics-intro`

## Identity

- **KG ID**: `eng.linguistics.computational-linguistics-intro`
- **Name**: Introduction to Computational Linguistics
- **Domain**: English / Linguistics
- **Difficulty**: research
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 3
- **Requires**: `eng.linguistics.corpus-linguistics-intro`, `eng.linguistics.syntax-theory-intro` — load-bearing: computational linguistics combines large-scale empirical pattern study with formal structural rules to explain how language technology actually works.
- **Unlocks**: none
- **Cross-links**: `eng.communication.digital-communication` — a genuinely distinct, practically-oriented concept about digital communication contexts; not anticipated here.
- **Blueprint**: `docs/curriculum/blueprints/eng.linguistics.computational-linguistics-intro.md`

## Learning Objective

The learner can:
1. Explain that most modern language technology processes language through statistical pattern-recognition, not through consciously understanding meaning the way a human does.
2. Explain why fluent, grammatically correct output does not guarantee factual accuracy, since fluency and accuracy measure genuinely different things.
3. Identify a specific type of language task that remains genuinely difficult for computational systems, particularly those requiring real-world knowledge.
4. Evaluate a new scenario describing a computational language system's output, assessing both the fluency/understanding distinction and genuine task-difficulty limitations.

## Core Understanding

Two corrections define this concept. First, **a computer producing fluent, grammatically correct language does not mean it understands the meaning the way a human does** — fluent output can be generated primarily through statistical pattern-matching learned from vast amounts of text, a genuinely different process from human meaning-comprehension, even when the OUTPUT looks indistinguishable; fluency is a measure of pattern-matching skill, a separate question from genuine comprehension or factual accuracy. Second, **computational language systems cannot handle every aspect of language equally well with no genuine limitations** — certain tasks (particularly those requiring real-world knowledge or common-sense reasoning to resolve ambiguity, like determining which of two possible referents a pronoun points to) remain genuinely difficult for pattern-matching alone, since resolving them requires actual knowledge about the world, not just linguistic pattern.

## Mental Models

**Beginner — "if it sounds fluent and grammatically correct, the computer must understand it, and computers should handle any language task equally well."**
The simulation: trust a fluent AI-generated response as automatically accurate because it reads naturally, and assume computational tools handle any language task with uniform reliability.
*Upgrade trigger*: the Blueprint's own conflict evidence — a grammatically flawless sentence containing a factual error, and the classic "trophy didn't fit in the suitcase" ambiguity requiring real-world size knowledge to resolve.
*Shelf-life warning*: "A tribute-band musician can mimic a song perfectly without having composed or understood it — fluency isn't understanding. And a skilled cook with memorized recipes can still struggle with a genuinely novel dish."

**Intermediate — "I can now separate fluency from accuracy and I'm starting to notice limitations, but I still assume any grammatically well-formed sentence is equally easy for a computer to interpret correctly."**
The simulation: correctly checks fluency against accuracy but doesn't yet distinguish which specific ambiguities require real-world knowledge versus which are resolvable by grammar alone.
*Upgrade trigger*: TA-3's direct real-world-knowledge-ambiguity identification practice, given sentences requiring outside knowledge versus grammar alone.
*Shelf-life warning*: "Ask specifically: can this be resolved by grammar or word patterns alone, or does it require actual knowledge about how the world works?"

**Advanced — "I evaluate whether fluency implies understanding and identify whether a task requires real-world knowledge beyond pattern-matching, all together in a new scenario."**
The simulation: integrates the fluency/understanding distinction and the genuine-limitation identification into one coherent evaluation of computational language claims. Matches TA-4.
*Upgrade trigger*: none within the current curriculum sequence — this concept is confirmed terminal.
*Shelf-life warning*: "This gives you the core toolkit for evaluating any computational language system's claims critically."

**Expert — "at fluency, separating pattern-matching from understanding and recognizing genuine limitations happens as an integrated part of ordinary critical engagement with language technology, without a separate deliberate checklist."**
Named to mark the arc; the explicit evaluate-classify-identify routine is a scaffold for a critical-evaluation habit that, at fluency, operates as an integrated part of technology literacy.

## Why Students Fail

The dominant mechanism is that **fluency is the most immediately perceptible signal of quality in language**, and it's the same signal humans use to judge a HUMAN speaker's competence, so it gets overgeneralized as a reliable signal of a computational system's genuine comprehension too, even though the underlying mechanism generating that fluency is entirely different.

The second mechanism is that **the genuinely impressive breadth of tasks language technology handles well creates an availability bias toward assuming uniform competence**, since the failures (specific ambiguities requiring real-world knowledge) are less salient and less frequently encountered than the many successes.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-A-A-COMPUTER-PRODUCING-FLUENT-GRAMMATICALLY-CORRECT-LANGUAGE-MUST-UNDERSTAND-THE-MEANING-THE-WAY-A-HUMAN-DOES
*(Blueprint Component 1, first entry.)*
- **Birth type**: Type 2 (perceptual intuition), from fluency being the same perceptible signal humans use to judge human comprehension, overgeneralized to a computational system whose underlying process is entirely different.
- **Teaching consequence**: the repair must **show fluent output containing a factual error directly**, since the fluency/accuracy separation is far more convincing demonstrated through a concrete failure than asserted abstractly.
- **Verification of death**: given a fluent computational output example, the learner explains why its grammatical fluency does not guarantee genuine understanding or verified accuracy.

### MC-B-COMPUTATIONAL-LANGUAGE-SYSTEMS-CAN-HANDLE-EVERY-ASPECT-OF-LANGUAGE-EQUALLY-WELL-WITH-NO-GENUINE-LIMITATIONS
*(Blueprint Component 1, second entry.)*
- **Birth type**: Type 1 (overgeneralization), of language technology's genuinely broad success across many tasks, extended into assuming uniform competence across every task including those requiring real-world knowledge.
- **Teaching consequence**: the repair requires **a classic ambiguous sentence requiring real-world knowledge to resolve**, since the specific-limitation is far more convincing demonstrated through a concrete unresolvable-by-grammar-alone case than asserted abstractly.
- **Verification of death**: given three sentences, the learner identifies which require real-world or common-sense knowledge, not just grammatical pattern, to resolve an ambiguity.

## Analogies

**Best — the Tribute-Band-Musician and Skilled-Cook-with-a-Novel-Dish Anchor** (Blueprint Component 3): a tribute-band musician perfectly mimicking a song note-for-note without having composed or deeply understood its original meaning — directly seeding the fix for MC-A. A skilled cook who has memorized thousands of recipes but struggles to diagnose an entirely novel dish's problem — directly seeding the fix for MC-B.
*Breaking point*: a tribute musician and a memorizing cook are both still humans with general cognitive flexibility beyond their specific skill, while a computational system's limitations are more structural and consistent — a difference in DEGREE and KIND of limitation the human analogies don't fully capture.

**Alternative — a very well-trained parrot repeating phrases in context.** A parrot can learn to say "I'm hungry" in a context associated with food with impressive apparent appropriateness, without understanding hunger as a concept — the appropriate-sounding output doesn't require the underlying comprehension.
*Breaking point*: a parrot's repertoire is far more limited and its "contexts" far simpler than the vast range of fluent, contextually appropriate language a modern computational system can produce, making the gap between surface performance and understanding much less obviously wide than in the parrot case.

**Visual anchor — the Tribute-Band-Musician and Skilled-Cook-with-a-Novel-Dish Anchor**, as the primary teaching metaphor and working instrument.

### ANTI-ANALOGIES (do not use)

- **"If it sounds right, it must be right."** Directly installs the fluency-equals-understanding misconception as a stated definition.
- **"Computers can do anything with language now."** Directly installs the no-genuine-limitations misconception as a stated definition.

## Demonstrations

Prediction first in every case.

1. **The Tribute-Band-Musician and Skilled-Cook-with-a-Novel-Dish Anchor (learner activity).** Blueprint Component 3 — full script there. *Predict first*: "Does perfectly mimicking a song mean you composed and understood it?"
2. **The fluent-but-flawed collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence for the first misconception. *Predict first*: "Does this grammatically perfect sentence guarantee its factual content is accurate?"
3. **The trophy/suitcase collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence for the second misconception. *Predict first*: "Can grammar alone resolve which object 'it' refers to here, or does it need real-world knowledge?"

## Discovery Questions

Well suited to **guided discovery**, since both facts are directly checkable by testing candidate outputs for accuracy separately from fluency, and testing candidate ambiguities for grammar-alone resolvability.

1. **Need**: "If a sentence sounds completely fluent and correct, does that guarantee everything it says is true?"
2. **Playground**: the learner freely evaluates two computational outputs for fluency before being told the official fluency/accuracy separation test.
3. **Invention**: "Can you think of a sentence where knowing what the words mean grammatically isn't enough — you need to know something about the real world to understand it?"
4. **Collision**: present the trophy/suitcase sentence and ask whether grammar alone can resolve its ambiguity.
5. **Formalization**: name the two structural facts — fluency doesn't guarantee understanding or accuracy, and certain tasks genuinely require real-world knowledge beyond pattern-matching — from the learner's own testing.
6. **Compression**: "Fluency isn't accuracy; some tasks need real-world knowledge, not just pattern."

## Teaching Sequence

- **Statistical pattern-matching versus human understanding (TA-1) comes first**, directly confronting the first misconception before the fluency/accuracy distinction is formalized.
- **Fluency and accuracy as separate questions (TA-2) comes second**, extending TA-1 into an explicit, practiced classification skill.
- **Genuine limitations: tasks requiring real-world knowledge (TA-3) comes third**, directly confronting the second misconception once the fluency/accuracy distinction is established.
- **Full application to evaluating computational language claims (TA-4) comes last**, the generative capstone integrating both misconception fixes — matching this program's established sequencing principle of reserving the most integrative task for the culminating stage.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (the overcorrection-recalibration flag against blanket dismissal of computational tools, and this concept's confirmed terminal status with no further unlocks).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Demonstration** (SHOW) — the Tribute-Band-Musician / Skilled-Cook anchor and both collision scenarios.
2. **Worked Example** (SHOW) — WE-1's fully-worked evaluate-classify-identify sequence.
3. **Error Analysis** (TEST-THINKING) — both collisions are guided error analysis against a plausible-but-incorrect fluency-equals-understanding or uniform-competence assumption.
4. **Practice/Application** (DO) — TA-2's fluency/accuracy classification and TA-4's full application.

**Does not fit**: **Game** — the careful, evidence-based critical evaluation this concept requires could be undermined by speed-pressured competition. **Matching** — while TA-3's ambiguity-sorting has a classification flavor, the full task (evaluate and explain) is better served by direct evaluative practice.

## Voice Teaching Notes

Core evidence is **the learner's stated reasoning for separating fluency from accuracy, and for identifying why a specific ambiguity requires real-world knowledge**, since a correct-looking classification with no stated reasoning cannot be distinguished from a lucky guess.

What the ideal tutor perceives:

- **A stated fluency-versus-accuracy check** ("this reads well, but is it actually verified as true?") applied to a new computational output — the direct behavioral signature of the fluency/understanding-separation fix taking hold.
- **Voluntary identification of a real-world-knowledge requirement** in a new ambiguous sentence, distinct from a purely grammatical ambiguity — direct evidence the genuine-limitation fix is internalized.
- **Trusting a fluent AI-generated response as automatically accurate with no independent verification** — the direct behavioral signature of MC-A still active.

**Load-bearing sentence, delivered slowly**: *"Fluency isn't accuracy — and some tasks genuinely need real-world knowledge, not just pattern."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads:

- **Distinguishing fluency from understanding (MP-1) and separating fluency and accuracy (MP-2).** Per the Blueprint's S9 routing, MP-1/MP-2 failures indicate residual MC-A.
- **Identifying real-world-knowledge ambiguities (MP-3) and explaining why pattern-matching struggles with certain tasks (MP-4).** MP-3/MP-4 failures indicate residual MC-B.
- **Full computational language evaluation (MP-5).** The synthesis item; listen for both the fluency/accuracy separation and genuine-limitation identification applied together, since MP-5 failure with MP-1 through MP-4 passing indicates an integration gap requiring one more guided full-evaluation example.

**Mastery certification trigger**: a correct explanation of why fluency doesn't guarantee understanding; a correct fluency/accuracy classification across four outputs; a correct identification of real-world-knowledge ambiguities across three sentences; a correct explanation of why grammar alone is insufficient for a given ambiguity; a full new-scenario evaluation of a computational system's claims.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"But it sounds so natural, it has to be right"** — take this as an accurate observation about surface quality, not a mistake; respond by adding the stricter test: "It does read naturally, that's true — but does that guarantee the facts in it are actually verified and accurate?"
- **"I thought AI could handle any language question now"** — a genuine, reasonable impression given how broadly capable these systems seem; respond by naming the additional layer: "It handles a huge range of tasks well, yes — but does resolving THIS specific ambiguity require just grammar, or does it need real knowledge about how the world works?"
- **Smaller question to shrink to**: from a full computational-language evaluation down to **classifying one single output as fluent-and-accurate versus fluent-but-flawed, with the real-world-knowledge task set aside.** Isolates the most basic fluency/accuracy separation before returning to fuller tasks.
- **Never shrink to "just trust whatever sounds fluent."** This directly licenses the fluency-equals-understanding pattern, undermining the critical-evaluation discipline this concept specifically builds.

## Memory Hooks

- **Concept type**: applied critical-evaluation skill (fluency/accuracy separation, genuine-limitation identification) requiring a transferable technology-literacy habit rather than exhaustive recall.
- **Review form**: spaced items always mixing fluency/accuracy-classification tasks with real-world-knowledge-ambiguity tasks, since the Blueprint's own dual-pass gate treats these as separately diagnosable.
- **Interleaving partners**: none within the current curriculum sequence, since this concept is confirmed terminal; `eng.communication.digital-communication` remains a cross-link, not a sequential interleaving partner.

## Transfer Connections

- **Near**: none within the current curriculum sequence — confirmed terminal.
- **Real-world**: evaluating an AI chatbot's or writing assistant's output critically before trusting factual claims, and recognizing when a task (interpreting a genuinely ambiguous instruction, a nuanced social situation) may exceed what a language-technology tool can reliably handle.
- **Expert transfer**: the durable skill is **separating a surface performance quality from an underlying capability claim, and mapping specific limitations rather than assuming uniform competence** — the same discipline used broadly in evaluating any impressive-seeming technology's actual, bounded capabilities versus its apparent, unbounded-seeming performance.

## Cross-Subject Connections

The KG records one `cross_links` entry, already addressed under Transfer Connections above per the established cross-link boundary-respecting practice.

- **No genuine mechanism-level connection to mathematics, physics, chemistry, or biology.** Stated explicitly, following established practice.
- **A genuine, general connection to the surface-performance-versus-underlying-capability distinction** used broadly in evaluating any AI or automated system — a transferable reasoning principle, not a KG-encodable subject-matter link given this curriculum's current domain structure.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.linguistics.computational-linguistics-intro.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' full 5-part structure. This entry adds birth-type classification and teaching consequences.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and PD-2 against both prerequisites.
- **Component 3 — Concrete Anchor**: the Tribute-Band-Musician and Skilled-Cook-with-a-Novel-Dish script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-4 (3-hour concept).
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9), adaptive flags.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-11. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **This concept is confirmed terminal**, with no further unlocks, consistent with the Blueprint's own session architecture; the single cross-link (`eng.communication.digital-communication`) is genuine and correctly scoped as a related-but-distinct practical concept.
- **The Blueprint's `status: active` field (Component 0) confirms this Blueprint has already cleared production status.**
- **This concept, discussing how language technology (including systems like the one delivering this very lesson) actually works, carries a genuinely reflexive dimension** — worth flagging for future runtime tuning as a natural point where a learner might ask the tutor itself about its own nature, which the tutor should handle honestly per this concept's own fluency-versus-understanding distinction.

## Version History

- v1.0 (2026-08-11): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type (Type 2 perceptual intuition; Type 1 overgeneralization).
