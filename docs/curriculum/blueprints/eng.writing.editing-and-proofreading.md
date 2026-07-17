# Teaching Blueprint: Editing and Proofreading

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.writing.editing-and-proofreading
name: Editing and Proofreading
domain: english/writing
difficulty:
  label: proficient
  numeric: 3
bloom: apply
prerequisites:
  - eng.writing.revising-for-content
mastery_threshold: 0.8
estimated_hours: 2
cross_links:
  - eng.writing.essay-structure
session_cap: 5
cpa_entry_stage: concrete/visual
status: draft
```

## Component 1 — Misconception Register

### MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS
- **Trigger signal:** Student proofreads by reading through their piece silently a single time at normal reading speed, assuming this reliably catches all remaining errors, without recognizing that the brain automatically "auto-corrects" familiar text while reading silently and quickly, meaning many errors (especially typos and small omissions) are genuinely easy to miss this way — multiple passes and different techniques (reading aloud, reading backward sentence-by-sentence, checking one error type at a time) catch errors a single silent read misses.
- **Conflict evidence [P28]:** Present a paragraph with 3 planted errors (a missing word, a repeated word, a homophone mix-up like "their/there") and have the student read it silently once at normal speed. Then have them read it aloud slowly. Compare how many errors were caught each way.
- **Bridge text [P30]:** "Your brain is very good at automatically 'filling in' or 'correcting' familiar text as you read silently and quickly — which is exactly why a single silent read-through misses so many small errors. Reading aloud slowly, reading backward sentence-by-sentence, or checking specifically for one error type at a time forces you to actually see each word rather than let your brain autocomplete it."
- **Replacement text [P31]:** "Don't rely on a single silent read-through to catch everything. Use multiple techniques: read aloud slowly, read sentences out of normal order (or backward) to disrupt the brain's autocomplete tendency, or do separate passes checking for just one error type at a time."
- **Discrimination pairs [P33]:** (a) Single-silent-read sufficiency (one normal-speed silent read-through reliably catches remaining errors) vs. (b) Multi-technique necessity (reliable proofreading requires multiple techniques — reading aloud, disrupted-order reading, single-error-type passes — since a normal silent read lets the brain auto-correct past real errors).
- **s6_path:** If detected, drop to PD-1 re-check, then re-run TA-1's multi-technique practice before continuing.

### MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR
- **Trigger signal:** Student relies entirely on automated spell-check/grammar-check tools to catch all errors, without recognizing these tools have significant blind spots — they cannot catch correctly-spelled wrong words (homophone errors like "their/there/they're," or wrong-but-valid word choices), and often miss context-dependent grammar issues or flag correct constructions as errors, meaning human proofreading is still necessary even after running these tools.
- **Conflict evidence [P28]:** Present a sentence with a homophone error ("Their going to the store.") and confirm that a spell-checker would NOT flag "Their" as misspelled, since it's a correctly-spelled word — just the wrong one for this context. Ask the student whether relying solely on spell-check would catch this error.
- **Bridge text [P30]:** "Spell-check and grammar-check tools are useful but genuinely limited — they check whether a word is spelled correctly, not whether it's the RIGHT word for the context. Homophone errors ('their/there/they're,' 'its/it's') are perfectly spelled but often wrong, and these tools frequently miss them entirely, or flag correct sentences as errors due to limited context understanding. Human proofreading remains necessary even after running these tools."
- **Replacement text [P31]:** "Use spell-check and grammar-check as a helpful first pass, not the final word. Always proofread yourself afterward, paying special attention to homophones and context-dependent word choices these tools commonly miss."
- **Discrimination pairs [P33]:** (a) Automated-tools-are-sufficient (spell-check/grammar-check tools catch all errors, making human proofreading redundant) vs. (b) Automated-tools-as-first-pass (these tools have real blind spots, especially homophones and context-dependent errors, requiring human proofreading afterward).
- **s6_path:** If detected, drop to PD-1, then re-present the Concrete Anchor's blind-spot-mirror framing before continuing to TA-3.

## Component 2 — Prerequisite Diagnostic Block

### PD-1: Revising-for-Content Readiness
- **Tests:** Can the student already distinguish content revision from surface-level correction — the boundary confirming editing/proofreading only begins once content is genuinely solid?
- **Probe:** Ask the student to explain the difference between revising and editing.
- **Pass condition:** Correctly distinguishes content-focus (revision) from surface-focus (editing).
- **Fail routing:** If the distinction is unclear, route to `eng.writing.revising-for-content` review — editing/proofreading assumes content revision has already been completed.

## Component 3 — Concrete Anchor [P06]

**"The Blind Spot Mirror and the Multi-Pass Flashlight."** Present a car's rearview mirror with a labeled "blind spot" area that the mirror simply cannot show, no matter how carefully you look at it — representing spell-check's blind spots (correctly-spelled wrong words) — directly seeding MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR's fix (you need to physically turn your head/do a manual check for the blind spot; the mirror alone isn't enough). Separately, present a single flashlight sweep across a dark room (catching some but not all details) versus 3 separate sweeps each looking for one specific thing (a sweep for shape, a sweep for texture, a sweep for color) — demonstrating that multiple targeted passes catch more than one general sweep, seeding MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS's fix.

## Component 4 — Conceptual Development Sequence

### TA-1: Multi-Technique Proofreading Practice
Present a paragraph with 4 planted errors and have the student proofread using 3 different techniques (silent read, read-aloud, backward sentence-order read), tracking how many errors each technique catches. Directly counters MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS.

### TA-2: Spell-Check's Blind Spots
Using the discrimination pairs from MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR, present a passage with homophone and context-dependent errors that a spell-checker would miss, and have the student identify these specifically, confirming spell-check alone is insufficient.

### TA-3: Single-Error-Type Passes
Teach the technique of doing separate proofreading passes, each focused on just one error type (e.g., one pass just for subject-verb agreement, one pass just for comma usage), and have the student apply this to a sample draft.

### TA-4: Common Error Pattern Recognition
Teach a checklist of commonly-missed error types (homophones, subject-verb agreement, comma splices, repeated words, missing words) and have the student proofread a passage systematically checking each pattern.

### TA-5: Full Proofreading of an Original Draft
Student proofreads their own or a provided near-final draft using multiple techniques (read-aloud, single-error-type passes) and the common-error checklist, correcting all found errors — the generative capstone.

## Component 5 — Worked Examples

### WE-1: Technique Comparison (Scaffolded)
**Passage with errors:** "The the students walked to they're classroom and sat down at there desks."
**Walkthrough:** A quick silent read may miss the repeated "the the" and the homophone errors ("they're"/"there" used incorrectly). Reading aloud slowly and checking word-by-word catches all three errors.

### WE-2: Spell-Check Blind Spot Identification (Guided)
**Passage:** "Its a beautiful day, and the dog wagged it's tail happily."
**Walkthrough:** Confirm a spell-checker would not flag either "Its" or "it's" as misspelled (both are valid spellings) — the student must recognize that "Its" should be "It's" (contraction of "it is") and "it's" should be "its" (possessive), a context-dependent error spell-check misses.

### WE-3: Full Systematic Proofreading (Independent)
**Task:** Student proofreads a near-final draft using the common-error checklist (homophones, subject-verb agreement, comma usage, repeated/missing words), doing at least 2 separate single-focus passes.
**Walkthrough:** Student identifies and corrects errors across multiple categories, demonstrating that systematic, multi-pass proofreading catches more than a single read-through.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Catch errors missed by a single silent read**
Given a passage, student demonstrates that reading aloud or using a disrupted-order technique catches errors a normal silent read missed. *(Directly targets MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS.)*

**MP-2 [P36] — Identify a spell-check blind spot**
Given a passage with a homophone or context-dependent error a spell-checker would miss, student identifies and corrects it. *(Directly targets MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR.)*

**MP-3 [P36] — Apply a single-error-type pass**
Given a draft, student performs a proofreading pass focused on just one error type and reports findings.

**MP-4 [P36] — Apply the common-error checklist**
Given a passage, student systematically checks for each common error type (homophones, subject-verb agreement, comma usage) and identifies any present.

**MP-5 [P36] — Full proofreading of an original draft**
Student proofreads a near-final draft using multiple techniques and the common-error checklist, correcting all found errors.

## Component 7 — Session Architecture

```
[PD-1: Revising-for-Content Readiness Check]
        |
        v
[Concrete Anchor: The Blind Spot Mirror / Multi-Pass Flashlight]
        |
        v
[TA-1: Multi-Technique Proofreading Practice]
        |
        v
[TA-2: Spell-Check's Blind Spots]
        |
        v
[TA-3: Single-Error-Type Passes]
        |
        v
[TA-4: Common Error Pattern Recognition]
        |
        v
[TA-5: Full Proofreading of an Original Draft]
        |
        v
[WE-1] --> [WE-2] --> [WE-3]
        |
        v
[MP-1 through MP-5]
```

**Protocol routing paragraph:** At session open (S0), confirm PD-1 passes — editing/proofreading assumes content revision is already complete, so a student who hasn't yet distinguished revision from editing may prematurely proofread unstable content. During instruction (S1), watch for both misconception patterns: trusting a single silent read (MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS) and over-relying on automated tools (MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR) both underestimate how easily errors slip past insufficient proofreading methods — redirect both to the Blind Spot Mirror/Multi-Pass Flashlight anchor. If the student misses errors using only one technique or trusts spell-check blindly during TA-1/TA-2 (S6), drop back to the Concrete Anchor's demonstrations before returning to independent proofreading. At mastery-probe stage (S9), do not certify mastery unless MP-1 and MP-2 both pass — a student who applies systematic checklists well (MP-3/MP-4) but still relies on a single read or trusts spell-check fully has not learned the core proofreading discipline this concept requires.

## Component 8 — Adaptive Flags

- If the student relies on a single silent read-through, weight remediation toward MC-PROOFREADING-BY-READING-SILENTLY-ONCE-CATCHES-ALL-ERRORS's bridge text and re-run TA-1's multi-technique practice before returning to independent proofreading.
- If the student over-trusts automated spell/grammar-check tools, weight remediation toward MC-SPELL-CHECK-AND-GRAMMAR-CHECK-TOOLS-CATCH-EVERY-ERROR's bridge text and TA-2's blind-spot-identification practice specifically.
- This concept feeds one direct downstream unlock (`eng.writing.essay-structure`) — do not certify mastery without TA-5's full proofreading of an original draft, since essay structure assumes the student can already produce a clean, error-free piece as the final step of the writing process.
- Reuse the "blind spot mirror" framing explicitly when introducing `eng.writing.essay-structure` — that concept's final polish stage depends on the same proofreading discipline established here.

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
| V-10 | Counterexample present where appropriate (spell-check blind spot) | PASS |
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
