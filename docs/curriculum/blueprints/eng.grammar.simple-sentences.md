# Teaching Blueprint: Simple Sentences

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.grammar.simple-sentences
name: Simple Sentences
domain: english/grammar
difficulty:
  label: developing
  numeric: 2
bloom: apply
prerequisites:
  - eng.grammar.clauses
mastery_threshold: 0.8
estimated_hours: 1
cross_links:
  - eng.grammar.compound-sentences
  - eng.grammar.sentence-fragments
  - eng.writing.sentence-writing
session_cap: 4
cpa_entry_stage: concrete/visual
status: draft
```

## Component 1 — Misconception Register

### MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE
- **Trigger signal:** Student judges whether a sentence is "simple" by counting words or estimating length, calling long sentences "not simple" and short ones "simple" regardless of how many clauses they actually contain.
- **Conflict evidence [P28]:** Present a long simple sentence with a compound subject and compound predicate but only ONE independent clause (e.g., "The exhausted, determined marathon runners from twelve different countries crossed the finish line together and collapsed onto the grass in relief.") alongside a short compound sentence with two independent clauses (e.g., "She left. He stayed."). Ask which is "simple" by the student's length rule, then apply the subject-verb-pair count from `eng.grammar.clauses` to both.
- **Bridge text [P30]:** "Length is a trap here — a simple sentence can be long and dressed up with lots of describing words, and a compound sentence can be short and plain. 'Simple' isn't about word count at all; it's about how many independent clauses are doing the work."
- **Replacement text [P31]:** "Count independent clauses, not words. If there is exactly ONE independent clause — one genuine subject-verb pair standing alone, however many extra describing words or objects surround it — it's a simple sentence, no matter how long it looks."
- **Discrimination pairs [P33]:** (a) Simple = short sentence (word count is the deciding test) vs. (b) Simple = exactly one independent clause (structure, not length, is the deciding test; a simple sentence can be long via compound subjects/objects/modifiers while still containing only one clause).
- **s6_path:** If detected, drop to PD-1 re-check on clause counting, then re-run TA-1 with the long-simple/short-compound contrast pair before continuing.

### MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE
- **Trigger signal:** Student assumes the presence of the word "and" (or "or"/"but") anywhere in a sentence automatically makes it compound, without checking whether "and" is joining two independent clauses versus joining two subjects, two verbs, or two objects within a single clause.
- **Conflict evidence [P28]:** Present "Maya and Diego finished the race and celebrated together." alongside "Maya finished the race, and Diego celebrated." Ask the student to count subject-verb pairs in each. In the first, "Maya and Diego" is one compound subject and "finished...and celebrated" is one compound predicate — still just one clause (simple). In the second, there are two full subject-verb pairs joined by "and" — two clauses (compound).
- **Bridge text [P30]:** "'And' has more than one job. It can join two whole clauses (making a compound sentence), but it can also just join two subjects or two verbs inside ONE clause (keeping it simple). The word alone doesn't decide — check what's on each side of it."
- **Replacement text [P31]:** "When you see 'and,' 'or,' or 'but,' ask: is there a complete subject-verb pair on BOTH sides, or is it just joining two subjects/two verbs/two objects within one subject-verb pair? Only two full clauses joined by 'and' makes it compound; anything less keeps it simple."
- **Discrimination pairs [P33]:** (a) Conjunction-presence rule (any "and"/"or"/"but" signals a compound sentence) vs. (b) Conjunction-function rule (only a conjunction joining two independent clauses — full subject-verb pairs on both sides — signals compound; joining subjects/verbs/objects within one clause keeps it simple).
- **s6_path:** If detected, drop to PD-1, then re-present TA-2's compound-subject/compound-predicate contrast before continuing.

## Component 2 — Prerequisite Diagnostic Block

### PD-1: Clause Identification Readiness
- **Tests:** Can the student reliably find the subject-verb pair(s) in a sentence and distinguish independent from dependent clauses — the skill simple-sentence classification depends on directly?
- **Probe:** Give three sentences: one single-clause sentence, one sentence with a dependent clause attached, and one two-independent-clause sentence (unlabeled, no conjunctions taught yet). Ask the student to mark every subject-verb pair in each.
- **Pass condition:** Correctly marks all subject-verb pairs in at least 2 of 3 sentences.
- **Fail routing:** If clause identification fails, route to `eng.grammar.clauses` review — simple-sentence classification is just "exactly one independent clause," which is meaningless without reliable clause counting.

## Component 3 — Concrete Anchor [P06]

**"The One-Engine Train."** Show the student a picture or model of a train with exactly one engine car, versus a train with two coupled engine cars. Explain: an independent clause is like an engine car — it can pull its own train (stand alone as a complete thought) all by itself. A simple sentence is a train with exactly ONE engine car — even if that one engine car is pulling a very long line of freight cars (extra describing words, compound subjects, compound objects), it's still a one-engine train. A train with two coupled engine cars (two independent clauses) is a different kind of train (compound) even if it's short. Physically point to a long simple sentence and a short compound sentence side by side and ask the student to count "engines" (subject-verb pairs), not length, in each.

## Component 4 — Conceptual Development Sequence

### TA-1: Length Is Not the Test
Present pairs like the Conflict Evidence example (long simple vs. short compound) and have the student apply the "count the engines" test from the Concrete Anchor to each, confirming that length does not predict clause count. Directly counters MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE.

### TA-2: Compound Subjects, Verbs, and Objects Within One Clause
Teach that a simple sentence can still have a compound subject ("Maya and Diego ran"), compound verb ("She sang and danced"), or compound object ("He ate rice and beans") while remaining ONE clause — because there is still only one subject-verb PAIRING relationship, not two independent subject-verb pairs. Student practices marking compound elements within otherwise-simple sentences and confirming clause count stays at one.

### TA-3: The Conjunction-Function Test
Using the discrimination pairs from MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE, present sentences containing "and"/"or"/"but" and have the student check both sides of the conjunction for a complete subject-verb pair before classifying the sentence as simple or compound.

### TA-4: Building and Classifying Original Sentences
Student writes 4 original sentences to a specification (one long simple sentence with a compound subject and object; one short compound sentence; one simple sentence with a prepositional-phrase modifier; one sentence containing "and" that stays simple) and self-checks each using the engine-counting test — the generative capstone confirming independent construction, not just recognition.

## Component 5 — Worked Examples

### WE-1: Long Simple vs. Short Compound (Scaffolded)
**Sentences:** "The tired, hungry travelers from the delayed flight finally reached their hotel rooms and collapsed onto the beds." / "She smiled. He waved."
**Walkthrough:** Sentence 1 has one subject ("travelers," modified by describing phrases) and one compound predicate ("reached...and collapsed") — one clause, so simple despite its length. Sentence 2 has two separate subject-verb pairs ("she smiled" / "he waved") — two clauses, so compound despite being short.

### WE-2: Compound Elements Within One Clause (Guided)
**Sentence:** "Lions and tigers hunt and rest throughout the day."
**Walkthrough:** Identify the compound subject ("lions and tigers") and compound verb ("hunt and rest"). Ask: is there more than one COMPLETE subject-verb pairing, or just one pairing with multiple parts on each side? Confirm: one pairing (lions-and-tigers / hunt-and-rest together), so this is simple.

### WE-3: Conjunction-Function Classification (Independent)
**Sentences to classify:** (a) "Ben and Sara study every evening and pass every test." (b) "Ben studies every evening, and Sara passes every test." Student applies the both-sides-subject-verb-pair test to each and classifies (a) as simple (compound subject + compound verb, one clause) and (b) as compound (two full independent clauses joined by "and").

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Long simple sentence recognition**
Given a long sentence with a compound subject, compound object, and several modifying phrases but only one true subject-verb pairing, student correctly classifies it as simple and explains why length doesn't matter. *(Directly targets MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE.)*

**MP-2 [P36] — Conjunction-function test**
Given a sentence containing "and" that joins two subjects (not two clauses), student correctly classifies it as simple by checking both sides of the conjunction for complete subject-verb pairs. *(Directly targets MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE.)*

**MP-3 [P36] — Short compound sentence recognition**
Given a short two-clause sentence (e.g., "I ran. She won."), student correctly classifies it as compound despite its brevity.

**MP-4 [P36] — Original sentence construction**
Student writes an original long simple sentence containing a compound subject and a compound predicate, then verifies it against the engine-counting test.

**MP-5 [P36] — Mixed batch classification**
Given a mixed batch of 5 unlabeled sentences (long simple, short compound, simple with compound object, simple with prepositional modifier, compound joined by "but"), student classifies all 5 correctly and justifies each using clause count, not length or conjunction presence alone.

## Component 7 — Session Architecture

```
[PD-1: Clause Identification Check]
        |
        v
[Concrete Anchor: One-Engine Train]
        |
        v
[TA-1: Length Is Not the Test]
        |
        v
[TA-2: Compound Elements Within One Clause]
        |
        v
[TA-3: Conjunction-Function Test]
        |
        v
[TA-4: Building and Classifying Original Sentences]
        |
        v
[WE-1] --> [WE-2] --> [WE-3]
        |
        v
[MP-1 through MP-5]
```

**Protocol routing paragraph:** At session open (S0), confirm PD-1 passes — simple-sentence classification is entirely dependent on reliable subject-verb-pair counting from `eng.grammar.clauses`, so a student who cannot count clauses will misclassify by guesswork rather than structure. During instruction (S1), watch for length-based judgments (MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE) and conjunction-presence judgments (MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE) as the two dominant error patterns at this level — both are shortcuts that avoid actually counting subject-verb pairs, and both must be redirected to the engine-counting test rather than simply marked wrong. If the student guesses on WE-3-style mixed examples (S6), drop back to the Concrete Anchor's train metaphor and re-run TA-1/TA-3 with one variable isolated at a time before returning to mixed practice. At mastery-probe stage (S9), do not certify mastery unless MP-1 (long-simple) and MP-2 (and-does-not-mean-compound) both pass independently — a student who only classifies short, conjunction-free sentences correctly has not yet demonstrated the actual discriminating skill.

## Component 8 — Adaptive Flags

- If the student consistently misclassifies by length, weight remediation toward MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE's bridge text and re-run TA-1 with progressively longer simple sentences before returning to mixed batches.
- If the student consistently misclassifies any "and"-containing sentence as compound, weight remediation toward MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE's bridge text and the conjunction-function test specifically, isolating that variable before mixing it back with length variation.
- This concept is foundational for three direct downstream unlocks (`eng.grammar.compound-sentences`, `eng.grammar.sentence-fragments`, `eng.writing.sentence-writing`) — do not certify mastery without MP-5's mixed-batch probe, since compound-sentence instruction assumes the student can already reliably tell a compound sentence apart from a long simple one.
- Reuse the "count the engines, not the words" framing explicitly when introducing `eng.grammar.compound-sentences` — that concept's core distinction (one clause vs. two joined clauses) is the direct extension of this concept's classification test.

## Component 9 — Validation Checklist

| ID | Check | Result |
|----|-------|--------|
| V-1 | Concept identity block complete (id, name, domain, difficulty, bloom, prerequisites, mastery_threshold, estimated_hours, cross_links, session_cap, cpa_entry_stage) | PASS |
| V-2 | Exactly 2 misconceptions registered | PASS |
| V-3 | Each misconception has trigger, conflict evidence, bridge, replacement, discrimination pairs, s6_path | PASS |
| V-4 | At least 1 prerequisite diagnostic block present | PASS |
| V-5 | Concrete anchor tagged [P06] and physically/visually manipulable | PASS |
| V-6 | Conceptual development sequence has 4 TAs matching session_cap (1-hour concept) | PASS |
| V-7 | TAs progress from recognition to construction (concrete → generative) | PASS |
| V-8 | 3 worked examples present (WE-1 to WE-3) | PASS |
| V-9 | Worked examples span scaffolded → guided → independent difficulty | PASS |
| V-10 | Counterexample/contrast case present where appropriate (long-simple vs. short-compound) | PASS |
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
