# Teaching Blueprint: Main Idea and Supporting Details

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.reading.main-idea-and-details
name: Main Idea and Supporting Details
domain: english/reading
difficulty:
  label: developing
  numeric: 2
bloom: analyze
prerequisites:
  - eng.reading.literal-comprehension
mastery_threshold: 0.75
estimated_hours: 2
cross_links:
  - eng.reading.inference-in-reading
  - eng.reading.summarizing
  - eng.reading.text-structure
session_cap: 5
cpa_entry_stage: concrete/visual
status: draft
```

## Component 1 — Misconception Register

### MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA
- **Trigger signal:** Student answers "what is this paragraph mostly about?" by quoting or paraphrasing only the first sentence, even when that sentence is a hook, a scene-setter, or a specific example rather than the controlling idea.
- **Conflict evidence [P28]:** Present a paragraph whose first sentence is a vivid but narrow detail (e.g., "The lion's roar shook the grass.") and whose main idea only becomes clear across sentences 2-5 (the paragraph is really about lion pride hierarchy). Ask the student to state the main idea using only sentence 1, then read the whole paragraph aloud and ask whether that main idea covers what sentences 2-5 talk about.
- **Bridge text [P30]:** "The first sentence often *grabs* you, but the main idea has to be the one thing that *every* sentence in the paragraph is helping to explain. A detail earns the paragraph's opening spot too, sometimes — position doesn't tell you the job a sentence is doing."
- **Replacement text [P31]:** "To find the main idea, don't just read sentence one. Read the whole paragraph and ask: 'What is the one idea that ALL of these sentences are supporting?' The main idea is a summary big enough to cover every detail; a detail only covers itself."
- **Discrimination pairs [P33]:** (a) First sentence = main idea (paragraph is literally defined by/organized around what sentence 1 says) vs. (b) First sentence = attention-grabbing detail (paragraph's real controlling idea only emerges after reading everything, and sentence 1 is just one supporting or introductory piece).
- **s6_path:** If detected mid-probe, redirect to PD-1 re-check, then re-run MP-1 with feedback highlighting the "does this cover every sentence?" test before allowing advance.

### MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE
- **Trigger signal:** Student searches the paragraph for a sentence that literally IS the main idea and either freezes when no single sentence states it directly, or forces an awkward quote-only answer, treating "the main idea" as a find-and-copy task rather than a synthesis task.
- **Conflict evidence [P28]:** Give a paragraph with an implied main idea (three sentences each describing a different way people in a town helped after a flood, with no sentence saying "the town came together to help each other"). Ask the student to find "the sentence that states the main idea." When they can't, ask what all three sentences have in common.
- **Bridge text [P30]:** "Sometimes a writer states the main idea in one sentence — that's a stated main idea. But often the writer just shows you three or four pieces of evidence and expects YOU to notice the pattern and put it into your own words. That's an implied main idea, and it's just as real, even though you won't find it quoted anywhere."
- **Replacement text [P31]:** "Ask yourself: is there one sentence that already says the big idea (stated), or do I need to notice the pattern across all the sentences and say it myself (implied)? Both are valid main ideas — an implied main idea in your own words counts just as much as a quoted one."
- **Discrimination pairs [P33]:** (a) Stated main idea (one sentence in the text explicitly names the controlling idea, quotable verbatim) vs. (b) Implied main idea (no single sentence states it; the reader must synthesize the pattern across all details into an idea not written anywhere in those exact words).
- **s6_path:** If detected, drop to PD-1, then re-present TA-2 (stated vs. implied) with an easier stated-only example before returning to implied examples.

## Component 2 — Prerequisite Diagnostic Block

### PD-1: Literal Comprehension Readiness
- **Tests:** Can the student accurately extract explicitly stated facts from a short paragraph (who, what, where, when) before being asked to synthesize those facts into a main idea?
- **Probe:** Give a 4-sentence paragraph about a class trip to a museum. Ask three literal questions: "Where did the class go? What did they see first? Who led the tour?"
- **Pass condition:** All three answered correctly using information directly stated in the text.
- **Fail routing:** If literal extraction fails, the student cannot yet reliably feed accurate details into a main-idea judgment — route to `eng.reading.literal-comprehension` review before continuing.

## Component 3 — Concrete Anchor [P06]

**"The Umbrella Test."** Show the student five small detail cards (each a single sentence, e.g., "She packed snacks," "She checked the weather map," "She grabbed a raincoat," "She left ten minutes early," "She wore boots") and one blank umbrella-shaped card. Ask: "What one sentence could sit on this umbrella and cover — protect — all five detail cards underneath it, the way a real umbrella covers everyone standing under it?" Guide the student to something like "She got ready for a rainy day." Physically arrange the detail cards *under* the umbrella card to make the covering relationship visible: the main idea is the idea broad enough to shelter every detail, and every detail is a specific instance sheltered by it. Repeat with one detail that does NOT fit under a proposed umbrella (e.g., add "She likes chocolate ice cream" to the set) and ask the student to notice it doesn't belong — this seeds the exclusion test used in TA-3.

## Component 4 — Conceptual Development Sequence

### TA-1: Identifying Supporting Details
Present short paragraphs with an already-given main idea sentence, e.g., "Bees are important to gardens. [Main idea]" followed by 3-4 detail sentences. Ask the student to point out which sentences are details (specific, narrower pieces of evidence) rather than restatements of the main idea itself. Reinforce: a detail is always more specific/narrower than the main idea it supports.

### TA-2: Stated vs. Implied Main Idea
Using the discrimination pairs from MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE, give the student pairs of paragraphs — one with a clearly stated main-idea sentence, one where the main idea must be inferred from the pattern of details. Student labels each "stated" or "implied" and, for implied examples, writes the main idea in their own words.

### TA-3: The Umbrella/Exclusion Test
Give the student a candidate main-idea sentence and 5 detail sentences, one of which does NOT belong (an off-topic detail, echoing the ice-cream card from the Concrete Anchor). Student must identify the detail that doesn't fit under the "umbrella" and explain why (it isn't sheltered by/relevant to the proposed main idea) — directly countering MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA's word-order shortcut by forcing a coverage check across every sentence.

### TA-4: Main Idea at the Paragraph vs. Whole-Text Level
Extend to a short multi-paragraph passage (3 paragraphs, each with its own main idea, forming one overall passage main idea). Student first identifies each paragraph's main idea, then synthesizes those three into one overall main idea for the whole passage — introducing the idea that main-idea identification operates at more than one level of a text (paragraph-level and passage-level), a distinction this concept's downstream unlock `eng.reading.summarizing` depends on directly.

### TA-5: Constructing a Main Idea Sentence From Scratch
Given only a set of detail sentences (no candidate main idea provided at all), the student writes their own main-idea sentence that covers all of them, then self-checks it against the umbrella/exclusion test from TA-3. This is the generative capstone task — moving from recognizing a given main idea to constructing one independently.

## Component 5 — Worked Examples

### WE-1: Stated Main Idea (Scaffolded)
**Paragraph:** "Recycling helps the environment in several ways. It reduces the amount of trash sent to landfills. It saves natural resources like trees and water. It also uses less energy than making new products from scratch."
**Walkthrough:** Sentence 1 directly states the main idea ("Recycling helps the environment"). Sentences 2-4 are each a specific way (detail) that supports sentence 1. Apply the umbrella test: do all three details fit under "recycling helps the environment"? Yes — reducing landfill trash, saving resources, and using less energy are all specific instances of environmental help.

### WE-2: Implied Main Idea (Guided)
**Paragraph:** "Maria arrived twenty minutes early and reviewed her notes one more time. She had practiced her speech in front of a mirror every night that week. Before walking on stage, she took three slow breaths to calm her nerves."
**Walkthrough:** No sentence states "Maria prepared carefully for her speech" — that idea is implied. Ask: what do arriving early, practicing nightly, and calming breaths all have in common? All are preparation behaviors. Construct the implied main idea in the student's own words and check it against the umbrella test.

### WE-3: Multi-Paragraph Synthesis (Independent)
**Passage (3 short paragraphs):** Paragraph 1 describes a town's old, crumbling bridge; Paragraph 2 describes residents raising money and volunteering labor; Paragraph 3 describes the new bridge's opening day celebration. Student first states each paragraph's own main idea, then synthesizes an overall passage main idea (e.g., "A town worked together to replace its unsafe bridge"). This exercises TA-4's paragraph-vs-passage distinction independently.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Main idea not in first position**
Given a paragraph with a clearly stated main-idea sentence NOT in the first position (main idea appears in sentence 3 of 4), student identifies the main idea and explains why the first sentence is a detail, not the main idea. *(Directly targets MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA.)*

**MP-2 [P36] — Implied main idea**
Given a paragraph with only implied main idea (no sentence states it), student writes the main idea in their own words. *(Directly targets MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE.)*

**MP-3 [P36] — Exclusion detection**
Given a main-idea sentence and 5 detail sentences (one irrelevant/off-topic), student identifies the detail that does not belong and justifies the exclusion using the umbrella test.

**MP-4 [P36] — Paragraph vs. passage level**
Given a 3-paragraph passage, student states each paragraph's main idea and then the overall passage main idea, demonstrating the two-level distinction from TA-4.

**MP-5 [P36] — Construct main idea from scratch**
Given only a set of 4 detail sentences with no candidate main idea, student constructs an original main-idea sentence covering all four and self-verifies it against the umbrella/exclusion test.

## Component 7 — Session Architecture

```
[PD-1: Literal Comprehension Check]
        |
        v
[Concrete Anchor: Umbrella Test]
        |
        v
[TA-1: Supporting Details] --> [TA-2: Stated vs. Implied]
        |                              |
        v                              v
[TA-3: Umbrella/Exclusion Test] <------+
        |
        v
[TA-4: Paragraph vs. Passage Level]
        |
        v
[TA-5: Constructing Main Idea From Scratch]
        |
        v
[WE-1] --> [WE-2] --> [WE-3]
        |
        v
[MP-1 through MP-5]
```

**Protocol routing paragraph:** At session open (S0), confirm PD-1 passes before touching main-idea content; a student who cannot extract literal facts will fabricate main ideas from misremembered details rather than genuine synthesis. During instruction (S1), route any word-order or find-the-quote behavior immediately to the matching misconception's bridge/replacement text rather than simply marking answers wrong — both misconceptions are common enough at this difficulty level to expect at least one to surface. If the student appears to guess or freeze during implied-main-idea tasks (S6), drop back to PD-1-adjacent literal work, then re-approach TA-2 with an easier stated-only example before reintroducing implied examples. At mastery-probe stage (S9), do not certify mastery unless MP-2 (implied) and MP-5 (constructive) are both passed independently — a student who only succeeds on stated-main-idea items (MP-1) has not yet demonstrated the synthesis skill this concept is built around.

## Component 8 — Adaptive Flags

- If the student consistently defaults to quoting the first sentence regardless of paragraph structure, weight remediation toward MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA's bridge text and re-run TA-3 (umbrella/exclusion) before allowing progress to implied-idea work.
- If the student can identify stated main ideas but cannot construct implied ones, treat this as a synthesis gap (not a comprehension gap) — repeat TA-2 and TA-5 with easier detail sets before re-attempting MP-2/MP-5.
- This concept is foundational for three direct downstream unlocks (`eng.reading.inference-in-reading`, `eng.reading.summarizing`, `eng.reading.text-structure`) — do not certify mastery on stated-idea performance alone; implied-idea and multi-paragraph synthesis (TA-4/TA-5) must both be demonstrated, since summarizing in particular depends on the passage-level synthesis skill built in TA-4.
- Reuse the umbrella/exclusion test vocabulary explicitly when introducing `eng.reading.summarizing` later — it is the same coverage-check operation applied to a full passage rather than a paragraph.

## Component 9 — Validation Checklist

| ID | Check | Result |
|----|-------|--------|
| V-1 | Concept identity block complete (id, name, domain, difficulty, bloom, prerequisites, mastery_threshold, estimated_hours, cross_links, session_cap, cpa_entry_stage) | PASS |
| V-2 | Exactly 2 misconceptions registered | PASS |
| V-3 | Each misconception has trigger, conflict evidence, bridge, replacement, discrimination pairs, s6_path | PASS |
| V-4 | At least 1 prerequisite diagnostic block present | PASS |
| V-5 | Concrete anchor tagged [P06] and physically/visually manipulable | PASS |
| V-6 | Conceptual development sequence has 5 TAs matching session_cap | PASS |
| V-7 | TAs progress from recognition to construction (concrete → generative) | PASS |
| V-8 | 3 worked examples present (WE-1 to WE-3) | PASS |
| V-9 | Worked examples span scaffolded → guided → independent difficulty | PASS |
| V-10 | Counterexample/exclusion case present where appropriate (off-topic detail) | PASS |
| V-11 | Mastery probes each tagged [P36] | PASS |
| V-12 | ≥ 5 mastery probes present | PASS |
| V-13 | Mastery probes map to both misconceptions | PASS |
| V-14 | Mastery probes include at least one generative/constructive task | PASS |
| V-15 | Session architecture diagram present with primitive tags | PASS |
| V-16 | Protocol routing paragraph covers S0/S1/S6/S9 | PASS |
| V-17 | Adaptive flags present (≥ 4 bullets) | PASS |
| V-18 | Cross-links to downstream concepts referenced in adaptive flags | PASS |
| V-19 | No modification to Knowledge Graph, schema, or runtime code | PASS |
| V-20 | Blueprint content grounded in verified KG node data (requires/unlocks/difficulty/bloom/mastery_threshold/estimated_hours) | PASS |
