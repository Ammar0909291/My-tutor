# Teaching Blueprint: Inference in Reading

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.reading.inference-in-reading
name: Inference in Reading
domain: english/reading
difficulty:
  label: proficient
  numeric: 3
bloom: analyze
prerequisites:
  - eng.reading.main-idea-and-details
mastery_threshold: 0.75
estimated_hours: 3
cross_links:
  - eng.reading.predicting-and-confirming
  - eng.reading.authors-purpose-and-tone
  - eng.reading.close-reading
session_cap: 5
cpa_entry_stage: concrete/visual
status: draft
```

## Component 1 — Misconception Register

### MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE
- **Trigger signal:** Student produces an answer to "what can you infer?" that is plausible in the real world but is not actually supported by evidence in the specific text — essentially free-associating from prior knowledge rather than combining textual clues with prior knowledge.
- **Conflict evidence [P28]:** Give a short passage where a character "grabbed her coat, checked the sky, and slammed the door on her way out" with no mention of weather. Ask the student what can be inferred. If they answer something plausible but untethered (e.g., "she was late for work"), ask them to point to the specific textual evidence that supports that inference versus the evidence that actually supports a different, text-grounded inference ("it might rain" — checking the sky, grabbing a coat).
- **Bridge text [P30]:** "A good inference isn't just a plausible guess about life in general — it's a conclusion you can defend by pointing to specific clues IN THE TEXT plus something you already know, combined together. If you can't point to the textual evidence that led you there, it's not an inference from this text — it's a guess from somewhere else."
- **Replacement text [P31]:** "Before stating an inference, find the specific clue(s) in the text first, then ask what that clue plus your background knowledge logically suggests. Every inference should be traceable back to: 'The text said ___, and I know ___, so I can conclude ___.'"
- **Discrimination pairs [P33]:** (a) Free-association guessing (any real-world-plausible idea counts as an inference, regardless of textual support) vs. (b) Evidence-clue-plus-knowledge inference (a valid inference must be traceable to specific textual clues combined with background knowledge, in an explicit "text says X, I know Y, so Z" chain).
- **s6_path:** If detected, drop to PD-1 re-check, then re-run TA-1's clue-highlighting task before returning to inference-drawing.

### MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT
- **Trigger signal:** Student refuses to draw any conclusion beyond what is literally printed in the text, treating any interpretation as illegitimate "making things up" — the opposite failure from MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE, collapsing inference back into pure literal comprehension and refusing to synthesize.
- **Conflict evidence [P28]:** Present a passage stating only "Tom's hands shook as he opened the envelope. He read the letter twice before setting it down without a word." Ask what Tom might be feeling. If the student says "we can't know, it doesn't say," point out that the text never says Tom is a person at all in so many words either — readers routinely and legitimately combine explicit details (shaking hands, reading twice, silence) with background knowledge (these are physical signs of strong emotion) to reasonably conclude Tom is nervous or shocked, without the text ever using the word "nervous."
- **Bridge text [P30]:** "You're right that the text never says 'Tom felt nervous' — and that's exactly what makes this an inference instead of a literal fact. Authors deliberately show behavior and let readers connect it to feelings; that connecting step is a real, legitimate reading skill, not 'making things up,' as long as your conclusion is well-supported by the details actually given."
- **Replacement text [P31]:** "You don't need the text to state something in exact words to reasonably conclude it. If specific details point clearly toward a conclusion — the way shaking hands and reading something twice point toward strong emotion — drawing that conclusion is a real reading skill, not guessing, as long as you can name the details that support it."
- **Discrimination pairs [P33]:** (a) Literal-only stance (only what is printed word-for-word counts as "knowing"; anything else is illegitimate speculation) vs. (b) Evidence-supported inference stance (a conclusion not literally stated can still be legitimately "known" if specific textual details clearly and reasonably point to it).
- **s6_path:** If detected, drop to PD-1, then re-present the Concrete Anchor's detective framing, emphasizing that detectives routinely "know" things suspects never said aloud.

## Component 2 — Prerequisite Diagnostic Block

### PD-1: Main Idea and Detail-Synthesis Readiness
- **Tests:** Can the student synthesize multiple stated details into one unstated conclusion (the implied-main-idea skill) — the direct precursor to inference, which extends the same synthesis move from "what's this paragraph about" to "what does this evidence suggest beyond itself"?
- **Probe:** Give a short paragraph with an implied (not stated) main idea and ask the student to state it in their own words, then explain what clues led them there.
- **Pass condition:** Correctly states the implied main idea and names at least two supporting details used to reach it.
- **Fail routing:** If implied-main-idea synthesis fails, route to `eng.reading.main-idea-and-details` review — inference is this same synthesis skill applied to narrower, more specific conclusions.

## Component 3 — Concrete Anchor [P06]

**"The Detective's Notebook."** Present the student with a "case file" containing 4 physical clue cards from a short scenario (e.g., a wet umbrella by the door, muddy footprints leading to the kitchen, an empty mug on the counter, a coat missing from the hook) and a blank "conclusion" card. Ask the student to act as a detective: what happened, based on these clues plus what they already know about how people behave? Guide toward "someone came inside from the rain, went to make a hot drink, and left again." Explicitly connect: (1) the detective never saw the person walk in — that's the inference; (2) but the detective isn't guessing wildly either — every clue on the table supports the conclusion; (3) show the discrimination between a supported conclusion ("it's been raining and someone came inside") and an unsupported wild guess ("the person is left-handed") that no clue actually points to — directly seeding both misconceptions' fix at once.

## Component 4 — Conceptual Development Sequence

### TA-1: Highlighting Textual Clues
Present short passages and have the student physically underline or highlight every specific detail (not the whole passage) that could support an inference, before drawing any conclusion — building the habit of clue-identification as a distinct first step, directly countering MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE's ungrounded-guess pattern.

### TA-2: The "Text Says / I Know / So" Chain
Teach the explicit three-part inference sentence frame: "The text says ___, and I know ___, so I can infer ___." Student practices completing this frame for 4 short passages, making the clue-plus-knowledge combination visible and checkable.

### TA-3: Legitimate Inference vs. Wild Guess
Using the discrimination pairs from both misconceptions, present pairs of candidate conclusions for the same passage — one clue-supported, one either ungrounded (MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE) or an over-cautious refusal to conclude anything (MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT) — and have the student identify which is the legitimate inference and justify why, citing specific text evidence either present or absent.

### TA-4: Character Feeling and Motive Inference
Extend to inferring characters' unstated feelings and motives from actions and dialogue (as in the Conflict Evidence example), directly countering MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT's refusal to interpret behavior — reinforcing that behavior-to-feeling inference is a normal, expected reading move, not overreach.

### TA-5: Multi-Clue Synthesis Across a Longer Passage
Present a longer passage (2-3 paragraphs) with several inference opportunities requiring the student to combine clues from different parts of the text (not just one sentence) into a single well-supported conclusion, then independently generate one original inference with full "text says / I know / so" justification — the generative capstone.

## Component 5 — Worked Examples

### WE-1: Simple Clue-to-Inference (Scaffolded)
**Passage:** "Jenna's stomach growled loudly. She glanced at the clock — 11:55 — and started packing up her books."
**Walkthrough:** Clues: stomach growling, checking the clock near midday, packing up books. Frame: "The text says Jenna's stomach growled and she checked the clock near lunchtime, and I know people get hungry around midday and check the time before a break, so I can infer Jenna is getting ready for lunch."

### WE-2: Legitimate vs. Wild Guess (Guided)
**Passage:** "The coach blew the whistle twice and pointed to the bench. Marcus walked off the field with his head down, not looking at anyone."
**Candidate inferences to evaluate:** (a) "Marcus is probably being taken out of the game and isn't happy about it" (supported: whistle-to-bench signal, head down, avoiding eye contact) vs. (b) "Marcus has been playing badly all season" (unsupported: nothing in this passage indicates anything about his season-long performance).
**Walkthrough:** Confirm (a) is a legitimate inference traceable to specific clues; confirm (b) is an ungrounded guess with no textual support, even though it's a "plausible" idea about soccer players in general.

### WE-3: Multi-Clue Synthesis (Independent)
**Passage (2 paragraphs):** A family arrives at a campsite, unpacks in silence, and the youngest child keeps looking back toward the car; later, the parents exchange a look when the child asks "are we staying the whole week?"
**Walkthrough:** Student combines clues across both paragraphs (silence while unpacking, child looking back at the car, parents' exchanged look at the question) to infer something is emotionally unresolved for this family about the trip (e.g., possibly connected to leaving someone/something behind), using the full "text says / I know / so" frame and citing evidence from both paragraphs.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Reject ungrounded guess**
Given a passage and two candidate inferences (one clue-supported, one plausible-but-ungrounded), student identifies the ungrounded one and explains what evidence it lacks. *(Directly targets MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE.)*

**MP-2 [P36] — Draw a feeling/motive inference from behavior alone**
Given a short passage describing only actions and physical details (no stated emotions), student infers a character's feeling or motive and justifies it using the "text says / I know / so" frame. *(Directly targets MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT.)*

**MP-3 [P36] — Clue highlighting**
Given a new short passage, student underlines the specific clues that support a given inference and explains how each clue contributes.

**MP-4 [P36] — Multi-paragraph synthesis**
Given a 2-paragraph passage, student combines clues from both paragraphs into one well-supported inference.

**MP-5 [P36] — Independent inference generation**
Given a novel passage with no candidate inference provided, student generates an original inference from scratch and justifies it fully using the three-part frame, citing specific textual evidence.

## Component 7 — Session Architecture

```
[PD-1: Main Idea Synthesis Check]
        |
        v
[Concrete Anchor: The Detective's Notebook]
        |
        v
[TA-1: Highlighting Textual Clues]
        |
        v
[TA-2: The "Text Says / I Know / So" Chain]
        |
        v
[TA-3: Legitimate Inference vs. Wild Guess]
        |
        v
[TA-4: Character Feeling and Motive Inference]
        |
        v
[TA-5: Multi-Clue Synthesis Across a Longer Passage]
        |
        v
[WE-1] --> [WE-2] --> [WE-3]
        |
        v
[MP-1 through MP-5]
```

**Protocol routing paragraph:** At session open (S0), confirm PD-1 passes — inference is the same clue-synthesis move as implied-main-idea detection, applied more narrowly and to a wider range of conclusion types, so a student weak in that synthesis skill will either guess wildly or refuse to conclude anything. During instruction (S1), watch for which direction the student errs: MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE (guessing beyond the evidence) and MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT (refusing to conclude anything beyond literal text) are opposite failures of the same missing skill — combining explicit clues with background knowledge in a checkable chain — and both should be redirected to the "text says / I know / so" frame rather than simply marked wrong. If the student freezes or free-associates during TA-3's discrimination task (S6), drop back to the Detective's Notebook anchor and re-run TA-2's sentence-frame practice with a single, very clear clue set before returning to ambiguous passages. At mastery-probe stage (S9), do not certify mastery unless MP-1 (rejecting ungrounded guesses) and MP-2 (drawing a legitimate unstated conclusion) both pass — a student who passes only one demonstrates only half of the required judgment.

## Component 8 — Adaptive Flags

- If the student produces plausible-but-untethered answers, weight remediation toward MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE's bridge text and re-run TA-1/TA-2 (clue-highlighting and sentence-frame) before returning to open-ended inference tasks.
- If the student refuses to draw any conclusion not explicitly stated, weight remediation toward MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT's bridge text and TA-4's behavior-to-feeling practice, emphasizing that this is a normal, expected reading move rather than overreach.
- This concept is foundational for three direct downstream unlocks (`eng.reading.predicting-and-confirming`, `eng.reading.authors-purpose-and-tone`, `eng.reading.close-reading`) — do not certify mastery without TA-5's multi-clue, multi-paragraph synthesis, since all three downstream concepts require combining evidence across more than a single sentence.
- Reuse the "text says / I know / so" frame explicitly when introducing `eng.reading.authors-purpose-and-tone` — that concept's tone/purpose judgments are inference conclusions about the author rather than about a character, using the identical evidence-plus-knowledge reasoning chain.

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
| V-10 | Counterexample case present where appropriate (ungrounded guess vs. legitimate inference) | PASS |
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
