# Teaching Blueprint: Compound Sentences

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.grammar.compound-sentences
name: Compound Sentences
domain: english/grammar
difficulty:
  label: proficient
  numeric: 3
bloom: apply
prerequisites:
  - eng.grammar.simple-sentences
  - eng.grammar.conjunctions
mastery_threshold: 0.75
estimated_hours: 2
cross_links:
  - eng.grammar.complex-sentences
  - eng.grammar.parallel-structure
  - eng.grammar.colons-semicolons-dashes
  - eng.grammar.run-on-sentences-and-comma-splices
session_cap: 5
cpa_entry_stage: concrete/visual
status: draft
```

## Component 1 — Misconception Register

### MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE
- **Trigger signal:** Student labels any sentence containing "and," "or," or "but" as compound, without checking whether the conjunction is joining two independent clauses (compound) versus joining two words or phrases within one clause — repeating the exact clause-vs-conjunction confusion from `eng.grammar.simple-sentences` at a new, more advanced level where three joining methods (conjunction, semicolon, conjunctive adverb) must now all be checked.
- **Conflict evidence [P28]:** Present "Ben and Sara studied hard and passed the exam." (simple: compound subject + compound verb, still one clause) beside "Ben studied hard, and Sara passed the exam." (compound: two full independent clauses joined by "and"). Ask the student to mark subject-verb pairs in each before classifying.
- **Bridge text [P30]:** "A compound sentence needs TWO complete independent clauses joined together — not just any sentence that happens to contain 'and.' Check both sides of the joining word: is there a full subject-verb pair on each side that could stand alone as its own sentence?"
- **Replacement text [P31]:** "Before calling a sentence compound, isolate what's on each side of the conjunction, semicolon, or conjunctive adverb. If both sides are complete, standalone sentences on their own, it's compound. If one side is missing its own subject or verb, it's still simple."
- **Discrimination pairs [P33]:** (a) Conjunction-presence rule (any joining word makes a sentence compound) vs. (b) Independent-clause-count rule (compound requires exactly two — or more — complete independent clauses joined together; a joining word alone proves nothing without checking both sides).
- **s6_path:** If detected, drop to PD-1 re-check on clause counting from `eng.grammar.simple-sentences`, then re-run TA-1's both-sides test before continuing.

### MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS
- **Trigger signal:** Student treats a semicolon and a comma as freely swappable when joining two independent clauses, either using a bare comma with no conjunction to join two full clauses (comma splice) or using a semicolon together with a coordinating conjunction ("; and") as if both were required together.
- **Conflict evidence [P28]:** Present three versions of the same two clauses: "The rain stopped, the sun came out." (comma splice — incorrect, a comma alone cannot join two independent clauses), "The rain stopped; the sun came out." (correct — semicolon alone joins them), and "The rain stopped, and the sun came out." (correct — comma PLUS coordinating conjunction together joins them). Ask which are grammatically complete joins and which is missing something.
- **Bridge text [P30]:** "A comma by itself is too weak to join two full independent clauses — that's called a comma splice, and it's a real error. You need either a semicolon ALONE, or a comma PLUS a coordinating conjunction (and/but/or/so/yet/for/nor) together. A semicolon never needs a conjunction added after it for this job — it's already strong enough by itself."
- **Replacement text [P31]:** "There are exactly three correct ways to join two independent clauses into one compound sentence: (1) comma + coordinating conjunction, (2) semicolon alone, (3) semicolon + conjunctive adverb + comma (e.g., '; however,'). A bare comma with no conjunction is never enough, and a semicolon never needs a conjunction added right after it."
- **Discrimination pairs [P33]:** (a) Comma-alone-is-sufficient / semicolon-needs-a-conjunction-too (both are treated as needing an added conjunction, or neither is seen as needing one) vs. (b) The three-method rule (comma+conjunction, semicolon alone, or semicolon+conjunctive-adverb+comma — each method complete and correct on its own, never mixed).
- **s6_path:** If detected, drop to PD-1, then re-present the Concrete Anchor's three-bridge framing before continuing to TA-3.

## Component 2 — Prerequisite Diagnostic Block

### PD-1: Simple-Sentence Clause-Counting Readiness
- **Tests:** Can the student reliably count independent clauses and distinguish a simple sentence (one clause, however long or compound-elemented) from a two-clause sentence — the exact skill this concept extends from two separate sentences into one joined sentence?
- **Probe:** Give two sentences: one long simple sentence with compound subject/verb, one sentence with two genuinely separate independent clauses (unpunctuated, no conjunction shown). Ask the student to mark all subject-verb pairs and state the clause count for each.
- **Pass condition:** Correctly identifies clause count in both sentences.
- **Fail routing:** If clause counting fails, route to `eng.grammar.simple-sentences` review — compound-sentence classification is entirely built on reliably counting independent clauses first.

### PD-2: Coordinating Conjunction Readiness
- **Tests:** Can the student name and recognize the seven coordinating conjunctions (FANBOYS: for, and, nor, but, or, yet, so)?
- **Probe:** Ask the student to list as many of the seven coordinating conjunctions as they can, then identify the conjunction in three sample sentences.
- **Pass condition:** Names at least 5 of 7 and correctly identifies conjunctions in all three samples.
- **Fail routing:** If conjunction recognition fails, route to `eng.grammar.conjunctions` review — the three joining methods for compound sentences all depend on knowing which words function as coordinating conjunctions.

## Component 3 — Concrete Anchor [P06]

**"The Three Bridges."** Show the student two "islands," each a card with one complete independent clause written on it (e.g., "The rain stopped" / "the sun came out"). Present three different physical "bridge" pieces that can connect the islands, each correctly built: (1) a bridge labeled with a comma-shaped joint PLUS a small flag reading one of the FANBOYS words — "comma + conjunction bridge"; (2) a bridge that is just one solid semicolon-shaped piece — "semicolon-alone bridge," strong enough on its own, no flag needed; (3) a bridge with a semicolon joint, a conjunctive-adverb flag ("however," "therefore," "moreover"), and a comma joint after it — the longer three-part bridge. Show a fourth, BROKEN bridge piece: a comma joint with NO flag at all, and demonstrate that it collapses (the two islands fall apart) — this is the comma splice, seeding MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS's fix directly. Emphasize: three real bridges connect two independent-clause islands; a comma alone is not one of them.

## Component 4 — Conceptual Development Sequence

### TA-1: Both-Sides Independent-Clause Check
Present sentences containing "and"/"or"/"but" and have the student check both sides for a complete, standalone subject-verb pair before classifying as simple or compound — directly extending PD-1's skill and countering MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE.

### TA-2: The Comma + Coordinating Conjunction Method
Teach Bridge 1 in depth: comma immediately before one of the seven FANBOYS words, with complete independent clauses on both sides. Student practices joining pairs of simple sentences using this method correctly.

### TA-3: The Semicolon-Alone and Semicolon + Conjunctive-Adverb Methods
Teach Bridges 2 and 3: a semicolon alone (no conjunction, no comma) correctly joins two closely related independent clauses; a semicolon followed by a conjunctive adverb ("however," "therefore," "moreover," "consequently") and a comma is the three-part version. Directly counters MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS by treating all three methods as structurally distinct and complete on their own.

### TA-4: Detecting and Fixing Comma Splices
Present sentences with the broken "bridge" (comma alone joining two independent clauses — a comma splice) and have the student identify the error and repair it using one of the three correct methods, reinforcing that a bare comma is never sufficient.

### TA-5: Choosing the Best Method and Constructing Original Compound Sentences
Given pairs of related simple sentences, student chooses the most appropriate joining method (considering relationship closeness/formality) and constructs an original compound sentence for each of the three methods — the generative capstone.

## Component 5 — Worked Examples

### WE-1: Both-Sides Check (Scaffolded)
**Sentences:** "The team practiced hard and won the championship." (simple — compound verb, one clause) / "The team practiced hard, and they won the championship." (compound — two full clauses joined by comma + "and")
**Walkthrough:** Mark subject-verb pairs in both. Sentence 1 has one subject ("the team") with a compound verb ("practiced...and won") — one clause, simple. Sentence 2 has two full subject-verb pairs ("the team practiced" / "they won") joined by comma + "and" — two clauses, compound.

### WE-2: Three Joining Methods (Guided)
**Base clauses:** "The museum was closing" / "we hurried through the last exhibit."
**Walkthrough:** Method 1: "The museum was closing, so we hurried through the last exhibit." Method 2: "The museum was closing; we hurried through the last exhibit." Method 3: "The museum was closing; therefore, we hurried through the last exhibit." Confirm all three are grammatically complete and correct, differing only in tone/formality, not correctness.

### WE-3: Comma Splice Detection and Repair (Independent)
**Sentence with error:** "The lights flickered, the power went out completely."
**Walkthrough:** Student identifies this as a comma splice (comma alone joining two independent clauses) and repairs it using any of the three methods, e.g., "The lights flickered, and the power went out completely." or "The lights flickered; the power went out completely."

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Reject conjunction-presence-only classification**
Given a simple sentence with a compound verb joined by "and" (not two independent clauses), student correctly classifies it as simple and explains the both-sides check. *(Directly targets MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE.)*

**MP-2 [P36] — Comma splice identification and repair**
Given a sentence with a comma splice, student identifies the error and repairs it using one of the three correct joining methods. *(Directly targets MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS.)*

**MP-3 [P36] — Three-method construction**
Given one pair of related simple sentences, student joins them correctly using all three methods (comma+conjunction, semicolon alone, semicolon+conjunctive adverb).

**MP-4 [P36] — Mixed-batch classification**
Given 5 unlabeled sentences (mix of simple-with-compound-elements, correctly joined compound via each method, and one comma splice), student classifies each correctly and identifies the comma splice specifically.

**MP-5 [P36] — Original construction with method justification**
Student writes two original compound sentences on a topic of their choice, using two different joining methods, and explains why each method suits the relationship between the two clauses.

## Component 7 — Session Architecture

```
[PD-1: Clause-Counting Check] --> [PD-2: Coordinating Conjunction Check]
        |
        v
[Concrete Anchor: The Three Bridges]
        |
        v
[TA-1: Both-Sides Independent-Clause Check]
        |
        v
[TA-2: Comma + Coordinating Conjunction Method]
        |
        v
[TA-3: Semicolon Methods]
        |
        v
[TA-4: Detecting and Fixing Comma Splices]
        |
        v
[TA-5: Choosing Method + Original Construction]
        |
        v
[WE-1] --> [WE-2] --> [WE-3]
        |
        v
[MP-1 through MP-5]
```

**Protocol routing paragraph:** At session open (S0), confirm both PD-1 and PD-2 pass — compound-sentence work is unreachable without reliable clause counting and coordinating-conjunction recognition, both imported directly from prerequisite concepts. During instruction (S1), the two misconceptions target different error directions: MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE over-classifies sentences as compound (repeating the simple-sentences confusion at a harder level), while MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS under-punctuates joins (the comma splice) or over-punctuates them (semicolon + redundant conjunction) — both should be redirected to the Three Bridges anchor rather than corrected as isolated punctuation slips. If the student produces or accepts a comma splice during probes (S6), drop back to TA-3/TA-4's bridge-collapse demonstration before returning to mixed practice. At mastery-probe stage (S9), do not certify mastery unless MP-1 and MP-2 both pass independently — a student who can construct compound sentences correctly (MP-3) but cannot detect a comma splice (MP-2) has not yet learned the full boundary of correctness this concept requires.

## Component 8 — Adaptive Flags

- If the student over-classifies sentences as compound based on conjunction presence alone, weight remediation toward MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE's bridge text and re-run TA-1's both-sides check before returning to method instruction.
- If the student produces or misses comma splices, weight remediation toward MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS's bridge text and TA-4's detection-and-repair practice specifically.
- This concept is foundational for four direct downstream unlocks (`eng.grammar.complex-sentences`, `eng.grammar.parallel-structure`, `eng.grammar.colons-semicolons-dashes`, `eng.grammar.run-on-sentences-and-comma-splices`) — do not certify mastery without MP-2's comma-splice probe, since `eng.grammar.run-on-sentences-and-comma-splices` is built entirely on recognizing this exact error pattern.
- Reuse the "three bridges" framing explicitly when introducing `eng.grammar.colons-semicolons-dashes` — that concept adds a fourth and fifth joining/punctuation option to the same underlying "how do independent clauses connect" question.

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
| V-10 | Counterexample present where appropriate (comma splice) | PASS |
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
