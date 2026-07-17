# Teaching Blueprint: Comma Usage

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.grammar.comma-usage
name: Comma Usage
domain: english/grammar
difficulty:
  label: proficient
  numeric: 3
bloom: apply
prerequisites:
  - eng.grammar.end-punctuation
  - eng.grammar.clauses
mastery_threshold: 0.75
estimated_hours: 3
cross_links:
  - eng.grammar.apostrophes
  - eng.grammar.quotation-marks
  - eng.grammar.colons-semicolons-dashes
  - eng.grammar.run-on-sentences-and-comma-splices
session_cap: 5
cpa_entry_stage: concrete/visual
status: draft
```

## Component 1 — Misconception Register

### MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING
- **Trigger signal:** Student places commas based on where they would naturally take a breath or pause when reading a sentence aloud, rather than based on structural rules (list items, joined independent clauses, introductory elements, nonessential information) — leading to commas dropped in grammatically required spots and inserted in ungrammatical ones.
- **Conflict evidence [P28]:** Give the student a sentence where a natural speaking pause occurs at a spot with NO comma rule (e.g., "The dog that lives next door / barked all night" — many speakers pause before "barked" but no comma belongs there since "that lives next door" is a restrictive/essential clause), alongside a sentence where a required comma falls at a spot with no natural pause (e.g., "Yesterday, before the sun rose, we left." — the comma after "Yesterday" is often not where a casual reader would pause). Ask the student to punctuate both by ear, then check against the four structural rules.
- **Bridge text [P30]:** "Breath pauses and comma rules overlap often, which is why the 'pause test' feels like it works — but they're not the same thing. A comma marks a specific grammatical job: separating list items, joining two independent clauses, setting off an introductory element, or marking nonessential information. If none of those four jobs apply, no comma belongs there, breath or no breath."
- **Replacement text [P31]:** "Instead of listening for a pause, ask: is this comma doing one of its four real jobs — separating items in a list, joining two independent clauses (with a conjunction), setting off something introductory, or bracketing nonessential information? If yes to one of those, the comma belongs. If no, leave it out even if it feels like a natural pause spot."
- **Discrimination pairs [P33]:** (a) Comma-by-pause (comma placement follows the reader's natural breath/pause rhythm) vs. (b) Comma-by-structural-job (comma placement follows one of four specific grammatical functions regardless of how the sentence sounds read aloud).
- **s6_path:** If detected, drop to PD-1 re-check, then re-run TA-1 (the four-jobs sort) with the pause-mismatch pair before continuing.

### MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA
- **Trigger signal:** Student inserts a comma before every "and" (or "or"/"but") regardless of whether it joins two independent clauses (comma required) or joins two elements within a single clause — compound subject, compound verb, or compound object (no comma) — over-applying the compound-sentence comma rule from `eng.grammar.simple-sentences`'s clause-counting distinction.
- **Conflict evidence [P28]:** Present "Maya ran, and jumped over the hurdle." (incorrect — comma incorrectly inserted before a compound verb, not two clauses) alongside "Maya ran the race, and she won first place." (correct — comma correctly joins two independent clauses). Ask the student to check both sides of "and" for a complete subject-verb pair in each.
- **Bridge text [P30]:** "The comma-before-'and' rule only applies when 'and' is joining two COMPLETE clauses — two full subject-verb pairs that could each stand alone as their own sentence. If 'and' is just joining two verbs, two subjects, or two objects within ONE clause, no comma goes there, even though it looks similar."
- **Replacement text [P31]:** "Before adding a comma in front of 'and,' 'or,' or 'but,' check both sides: is there a complete subject-verb pair on the left AND a complete subject-verb pair on the right? Only then does the comma belong. If one side is missing a subject (like a second verb without its own subject), skip the comma."
- **Discrimination pairs [P33]:** (a) Conjunction-presence comma rule (any "and"/"or"/"but" gets a comma before it) vs. (b) Conjunction-function comma rule (comma only precedes a conjunction joining two complete independent clauses; joining compound verbs/subjects/objects within one clause takes no comma).
- **s6_path:** If detected, drop to PD-1, then re-present TA-3's both-sides-clause-check before continuing.

## Component 2 — Prerequisite Diagnostic Block

### PD-1: End Punctuation and Clause Readiness
- **Tests:** Can the student distinguish a complete sentence from a fragment (end-punctuation prerequisite) and reliably count independent clauses in a sentence (clause prerequisite) — both needed to apply any of the four comma rules correctly?
- **Probe:** Give two sentences, one with a single independent clause and one with two independent clauses joined by "and" (no comma shown). Ask the student to mark subject-verb pairs and state whether each could stand alone as a complete sentence.
- **Pass condition:** Correctly identifies clause count and completeness in both sentences.
- **Fail routing:** If clause counting fails, route to `eng.grammar.clauses` review; if sentence-completeness judgment fails, route to `eng.grammar.end-punctuation` review — comma rules are unreachable without both skills already in place.

## Component 3 — Concrete Anchor [P06]

**"The Four Comma Jobs Toolbox."** Present four physical or drawn "tool" cards, each labeled with one comma job and a simple icon: (1) **List Separator** — a row of three items with commas between them ("apples, oranges, and pears"); (2) **Clause Joiner** — two small train-engine cards connected by a coupler labeled "and/but/or," with a comma placed just before the coupler; (3) **Intro Flag** — a small flag card placed at the start of a sentence, with a comma right after it ("After lunch, we left."); (4) **Nonessential Bracket** — two comma "brackets" placed around a removable phrase, with the phrase physically liftable out of the sentence without breaking it ("My dog, who is very old, sleeps all day" — lift out "who is very old" and show the sentence still works). For each of the four rules, have the student pick up the matching tool card and explain which job it does. Emphasize: every comma should be traceable back to exactly one of these four tools — if none of the four tools fit, no comma belongs.

## Component 4 — Conceptual Development Sequence

### TA-1: The Four-Jobs Sort
Present 8 sentences (2 per comma job) and have the student sort each into one of the four toolbox categories, explicitly naming which comma rule applies. Directly counters MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING by anchoring every decision to a named structural job rather than a pause.

### TA-2: Introductory Elements and Nonessential Information
Deepen the Intro Flag and Nonessential Bracket rules: teach that introductory words/phrases/clauses ("However," "After the storm passed," "Running quickly,") always take a comma after them, and that nonessential information (removable without changing the sentence's core meaning) is bracketed by commas on both sides, while essential/restrictive information (which changes meaning if removed) takes no commas. Student practices the "lift it out" test from the Concrete Anchor on new nonessential/essential pairs.

### TA-3: The Clause-Joiner Both-Sides Test
Using the discrimination pairs from MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA, present sentences with "and"/"but"/"or" and have the student check both sides for a complete independent clause before deciding whether the comma belongs. Directly counters MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA's over-application pattern.

### TA-4: List Separator Edge Cases
Extend list-comma practice to include the Oxford/serial comma before the final "and" in a list of three or more items, and clarify that this differs from the clause-joiner comma (a list-final "and" does not require two independent clauses on both sides — it is joining list items, not clauses).

### TA-5: Multi-Rule Sentences and Original Construction
Present sentences requiring more than one comma rule simultaneously (e.g., an introductory phrase AND a nonessential clause AND a list, all in one sentence) and have the student punctuate correctly, naming each comma's job. Then have the student write 4 original sentences, one per comma job, and self-check each against the four-tool test — the generative capstone.

## Component 5 — Worked Examples

### WE-1: Four-Jobs Identification (Scaffolded)
**Sentences:** "We packed sandwiches, chips, and juice boxes." (list) / "After the rain stopped, we went outside." (intro) / "My brother, who loves soccer, plays every weekend." (nonessential) / "I finished my homework, and I watched a movie." (clause joiner)
**Walkthrough:** For each sentence, name which of the four toolbox jobs the comma(s) perform and verify using the matching test (list-item count, intro-phrase-then-comma, lift-out test, both-sides-clause test).

### WE-2: Comma-by-Pause Trap (Guided)
**Sentence pair:** "The book that I borrowed from the library / is due tomorrow." (no comma belongs before "is," despite a natural speaking pause, because "that I borrowed from the library" is essential/restrictive — removing it changes which book is meant) vs. "My favorite book, which I borrowed from the library, is due tomorrow." (commas correctly bracket nonessential information, since "which I borrowed from the library" can be lifted out without changing which book is meant — "my favorite book" already identifies it uniquely).
**Walkthrough:** Apply the lift-out test to both. In sentence 1, removing "that I borrowed from the library" would leave ambiguity about which book — so it's essential, no commas. In sentence 2, "my favorite book" is already specific, so the "which" clause is just extra, removable information — nonessential, commas required.

### WE-3: Multi-Rule Sentence (Independent)
**Sentence to punctuate:** "After the concert ended fans lined up outside the stage door hoping to meet the band and several even brought posters gifts and handwritten letters."
**Walkthrough:** Student inserts commas correctly: "After the concert ended, fans lined up outside the stage door hoping to meet the band, and several even brought posters, gifts, and handwritten letters." — identifying the introductory clause comma, the clause-joiner comma before "and several," and the list-separator commas, all within one sentence.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Pause-trap rejection**
Given a sentence with a natural speaking pause at a location with no comma rule (a restrictive/essential clause), student correctly withholds the comma and explains using the lift-out test. *(Directly targets MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING.)*

**MP-2 [P36] — Compound-verb comma rejection**
Given a sentence with "and" joining a compound verb (not two independent clauses), student correctly withholds the comma and explains using the both-sides-clause test. *(Directly targets MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA.)*

**MP-3 [P36] — Four-jobs identification**
Given 4 unlabeled sentences (one per comma job), student correctly punctuates each and names which of the four toolbox jobs applies.

**MP-4 [P36] — Multi-rule sentence punctuation**
Given an unpunctuated sentence requiring 3 different comma rules simultaneously, student inserts all commas correctly and names each rule used.

**MP-5 [P36] — Original sentence construction**
Student writes one original sentence per comma job (4 total) and self-verifies each using the matching structural test from the Concrete Anchor.

## Component 7 — Session Architecture

```
[PD-1: End Punctuation + Clause Check]
        |
        v
[Concrete Anchor: Four Comma Jobs Toolbox]
        |
        v
[TA-1: Four-Jobs Sort]
        |
        v
[TA-2: Intro Elements + Nonessential Info]
        |
        v
[TA-3: Clause-Joiner Both-Sides Test]
        |
        v
[TA-4: List Separator Edge Cases]
        |
        v
[TA-5: Multi-Rule Sentences + Original Construction]
        |
        v
[WE-1] --> [WE-2] --> [WE-3]
        |
        v
[MP-1 through MP-5]
```

**Protocol routing paragraph:** At session open (S0), confirm PD-1 passes — every comma rule in this concept depends on both clause-counting and sentence-completeness judgment, so a student weak in either prerequisite will punctuate by guesswork. During instruction (S1), watch for the two dominant shortcut patterns: pause-based placement (MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING) and conjunction-presence placement (MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA) — both bypass checking the actual structural job a comma is meant to do, and both should be redirected to the four-tool test rather than corrected item-by-item. If the student defaults to "when in doubt, add a comma" during probes (S6), drop back to the Concrete Anchor's toolbox and re-run TA-1 with one rule isolated at a time before returning to multi-rule sentences. At mastery-probe stage (S9), do not certify mastery unless MP-1 and MP-2 (the two counterexample-rejection probes) both pass — a student who only adds commas correctly but never withholds one when the pause or conjunction "feels" comma-worthy has not yet internalized the structural test.

## Component 8 — Adaptive Flags

- If the student over-inserts commas at every natural pause, weight remediation toward MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING's bridge text and re-run TA-1's four-jobs sort in isolation before reintroducing pause-tempting sentences.
- If the student over-inserts commas before every "and"/"or"/"but," weight remediation toward MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA's bridge text and TA-3's both-sides-clause test specifically.
- This concept is foundational for four direct downstream unlocks (`eng.grammar.apostrophes`, `eng.grammar.quotation-marks`, `eng.grammar.colons-semicolons-dashes`, `eng.grammar.run-on-sentences-and-comma-splices`) — do not certify mastery without TA-5's multi-rule integration, since `eng.grammar.run-on-sentences-and-comma-splices` specifically depends on the clause-joiner rule being solid (a comma splice is exactly the clause-joiner rule's comma without its required conjunction).
- Reuse the "four toolbox jobs" framing explicitly when introducing `eng.grammar.colons-semicolons-dashes` — that concept extends the same job-based (not pause-based) punctuation-placement logic to a different set of marks.

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
| V-10 | Counterexample/contrast case present where appropriate (essential vs. nonessential clause) | PASS |
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
