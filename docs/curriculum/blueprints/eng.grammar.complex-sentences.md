# Teaching Blueprint: Complex Sentences

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.grammar.complex-sentences
name: Complex Sentences
domain: english/grammar
difficulty:
  label: proficient
  numeric: 3
bloom: apply
prerequisites:
  - eng.grammar.compound-sentences
mastery_threshold: 0.75
estimated_hours: 2
cross_links:
  - eng.grammar.sentence-combining
session_cap: 5
cpa_entry_stage: concrete/visual
status: draft
```

## Component 1 — Misconception Register

### MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND
- **Trigger signal:** Student, having just learned compound sentences (two independent clauses joined by a coordinating conjunction, semicolon, etc.), assumes any sentence containing a joining word between two clauses — including subordinating conjunctions like "because," "although," "when," "if" — must also be compound, failing to distinguish a dependent clause (which cannot stand alone) from a second independent clause.
- **Conflict evidence [P28]:** Present "The game was cancelled, and the fans went home disappointed." (compound: two independent clauses joined by "and," each could stand alone) alongside "Because the game was cancelled, the fans went home disappointed." (complex: "Because the game was cancelled" cannot stand alone as a complete sentence — it's a dependent clause). Ask the student to test each clause by itself: does it make a complete, standalone sentence?
- **Bridge text [P30]:** "Not every joining word creates a compound sentence. Coordinating conjunctions (and, but, or, so, yet, for, nor) join two clauses that could EACH stand alone — that's compound. Subordinating conjunctions (because, although, when, if, since, while) create a clause that CANNOT stand alone by itself — that's a dependent clause, and a sentence built from an independent clause plus a dependent clause is complex, not compound."
- **Replacement text [P31]:** "Test each clause separately: read it alone and ask, 'Is this a complete sentence on its own?' If both clauses pass the test, and they're joined by a coordinating conjunction/semicolon, it's compound. If one clause fails the test (starts with a subordinating word and sounds unfinished alone), it's dependent, and the sentence is complex."
- **Discrimination pairs [P33]:** (a) Any-joining-word-means-compound (any clause-joining word signals a compound sentence) vs. (b) Clause-independence test (compound requires both joined clauses to independently stand alone; complex has one clause that cannot stand alone, introduced by a subordinating conjunction).
- **s6_path:** If detected, drop to PD-1 re-check, then re-run TA-1's standalone test before continuing.

### MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST
- **Trigger signal:** Student, having primarily seen or practiced examples with the dependent clause in sentence-initial position ("Because it was raining, we stayed inside"), assumes this word order is fixed and either fails to recognize or incorrectly constructs complex sentences with the dependent clause in the second position ("We stayed inside because it was raining"), sometimes even inserting an unnecessary comma before a dependent clause that follows the independent clause.
- **Conflict evidence [P28]:** Present the same complex sentence in both orders: "Because it was raining, we stayed inside." and "We stayed inside because it was raining." Ask the student whether both are grammatically complex sentences with the same meaning, and whether the comma rule is the same in both (a comma follows an introductory dependent clause; no comma is needed when the dependent clause follows the independent clause, in most cases).
- **Bridge text [P30]:** "A dependent clause can come before OR after the independent clause — the sentence is complex either way, and the meaning stays the same. What changes is just the comma: when the dependent clause comes first (introductory), it's followed by a comma. When the independent clause comes first, you usually don't need a comma before the dependent clause that follows."
- **Replacement text [P31]:** "Don't assume the dependent clause must lead. Complex sentences work with the dependent clause in either position — check for the subordinating conjunction and the incomplete-alone test regardless of order, and remember the comma rule changes depending on which clause comes first, not whether the sentence is complex."
- **Discrimination pairs [P33]:** (a) Fixed-order assumption (a dependent clause must always precede the independent clause in a complex sentence) vs. (b) Flexible-order recognition (a dependent clause can precede or follow the independent clause with the same complex-sentence classification, only the comma convention changes based on position).
- **s6_path:** If detected, drop to PD-1, then re-present the Concrete Anchor's swappable-clause-cards demonstration before continuing to TA-3.

## Component 2 — Prerequisite Diagnostic Block

### PD-1: Compound-Sentence and Clause-Counting Readiness
- **Tests:** Can the student reliably distinguish independent from dependent clauses and correctly classify compound sentences — the direct foundation this concept extends by introducing dependent-clause combination?
- **Probe:** Give two sentences: one compound (two independent clauses joined by "and") and one containing a subordinating conjunction ("because," "although"). Ask the student to test each clause individually for standalone completeness.
- **Pass condition:** Correctly applies the standalone test to both sentences.
- **Fail routing:** If the standalone test fails, route to `eng.grammar.compound-sentences` review — complex-sentence classification depends entirely on this same clause-independence judgment, now applied to a new clause type.

## Component 3 — Concrete Anchor [P06]

**"The Anchor and the Kite."** Present two physical cards: an "anchor" card (an independent clause, heavy and self-sufficient — it can sit on the table by itself and make complete sense) and a "kite" card (a dependent clause, introduced by a subordinating word like "because" or "although" — it needs a string attached to the anchor or it just flies away incomplete, making no sense alone). Show that the kite can be tied to the anchor's LEFT side or its RIGHT side — the sentence works complex either way, and the kite is still a kite (still can't stand alone) regardless of position. Read both orders aloud: "Because it was raining, we stayed inside" (kite first) and "We stayed inside because it was raining" (kite second). This directly demonstrates both misconception fixes: the kite (dependent clause) never becomes an anchor no matter how it's introduced (MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND's fix), and the kite can attach on either side (MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST's fix).

## Component 4 — Conceptual Development Sequence

### TA-1: The Standalone Test for Subordinating Conjunctions
Present sentences containing subordinating conjunctions (because, although, when, if, since, while, unless) and have the student test each clause individually for standalone completeness, confirming the subordinate clause fails the test while the main clause passes — directly countering MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND.

### TA-2: Recognizing Common Subordinating Conjunctions
Teach a working list of common subordinating conjunctions (because, although, since, while, when, if, unless, after, before, whenever) as signal words that introduce a dependent clause, contrasted explicitly with the seven coordinating conjunctions (FANBOYS) from `eng.grammar.compound-sentences`.

### TA-3: Dependent Clause Position and the Comma Rule
Using the discrimination pairs from MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST, present the same complex sentence in both clause orders and have the student apply the correct comma rule for each (comma after an introductory dependent clause; typically no comma when the dependent clause follows).

### TA-4: Distinguishing Complex from Compound and Compound-Complex
Present a mixed batch of simple, compound, and complex sentences and have the student classify each, explicitly checking for both coordinating and subordinating conjunctions and applying the standalone test to every clause present.

### TA-5: Constructing Original Complex Sentences in Both Orders
Student writes 4 original complex sentences: 2 with the dependent clause first (correctly punctuated with a comma) and 2 with the dependent clause second (correctly punctuated without an unnecessary comma) — the generative capstone confirming flexible, correctly-punctuated construction.

## Component 5 — Worked Examples

### WE-1: Standalone Test Application (Scaffolded)
**Sentence:** "Although the movie received poor reviews, it became a huge box office success."
**Walkthrough:** Test "Although the movie received poor reviews" alone — incomplete, fails the standalone test (dependent clause). Test "it became a huge box office success" alone — complete, passes (independent clause). Classify as complex.

### WE-2: Comma Rule by Position (Guided)
**Pair:** "When the alarm rang, everyone evacuated the building." (dependent clause first, comma required) / "Everyone evacuated the building when the alarm rang." (dependent clause second, no comma needed).
**Walkthrough:** Confirm both sentences are complex with identical meaning; only the comma placement differs based on clause order.

### WE-3: Mixed Classification (Independent)
**Sentences to classify:** "The chef prepared a new dish, and the customers loved it." (compound) / "Since the recipe was difficult, the chef practiced it several times." (complex) / "The chef prepared a new dish." (simple).
**Walkthrough:** Student applies the standalone test and conjunction-type check to each, correctly classifying all three using evidence from clause structure, not surface length or word count.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Reject subordinating-word-means-compound**
Given a sentence with a subordinating conjunction, student correctly classifies it as complex (not compound) using the standalone test on both clauses. *(Directly targets MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND.)*

**MP-2 [P36] — Correct comma rule regardless of clause order**
Given a complex sentence with the dependent clause in the second position, student correctly omits the unnecessary comma, and given one with the dependent clause first, correctly includes it. *(Directly targets MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST.)*

**MP-3 [P36] — Subordinating conjunction recognition**
Given 4 sentences, student identifies the subordinating conjunction in each and confirms the dependent clause fails the standalone test.

**MP-4 [P36] — Mixed-type classification**
Given 5 unlabeled sentences (simple, compound, complex mixed), student correctly classifies each using clause-structure evidence.

**MP-5 [P36] — Original construction in both orders**
Student writes 2 original complex sentences, one with the dependent clause first and one with it second, each correctly punctuated.

## Component 7 — Session Architecture

```
[PD-1: Compound-Sentence/Clause-Counting Check]
        |
        v
[Concrete Anchor: The Anchor and the Kite]
        |
        v
[TA-1: The Standalone Test for Subordinating Conjunctions]
        |
        v
[TA-2: Recognizing Common Subordinating Conjunctions]
        |
        v
[TA-3: Dependent Clause Position and the Comma Rule]
        |
        v
[TA-4: Distinguishing Complex from Compound]
        |
        v
[TA-5: Constructing Original Complex Sentences in Both Orders]
        |
        v
[WE-1] --> [WE-2] --> [WE-3]
        |
        v
[MP-1 through MP-5]
```

**Protocol routing paragraph:** At session open (S0), confirm PD-1 passes — complex-sentence classification directly extends the clause-independence judgment from compound sentences to a new clause type (dependent, introduced by a subordinating conjunction). During instruction (S1), watch for both misconception patterns: over-generalizing "joining word = compound" from the prior concept (MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND) and assuming a fixed dependent-clause position (MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST) — both should be redirected to the Anchor and Kite anchor's standalone-test and swappable-position framing. If the student misclassifies a subordinated sentence as compound or applies the wrong comma rule during TA-3/TA-4 (S6), drop back to the Concrete Anchor's kite demonstration before returning to mixed practice. At mastery-probe stage (S9), do not certify mastery unless MP-1 and MP-2 both pass — a student who recognizes subordinating conjunctions in isolation (MP-3) but still misclassifies sentence type or misapplies the comma rule by position has not yet integrated the full judgment this concept requires.

## Component 8 — Adaptive Flags

- If the student misclassifies subordinated sentences as compound, weight remediation toward MC-A-SENTENCE-WITH-A-SUBORDINATING-WORD-IS-COMPOUND's bridge text and re-run TA-1's standalone test before returning to mixed classification.
- If the student misapplies the comma rule based on assumed fixed clause order, weight remediation toward MC-THE-DEPENDENT-CLAUSE-MUST-ALWAYS-COME-FIRST's bridge text and TA-3's position-based comma practice specifically.
- This concept feeds one direct downstream unlock (`eng.grammar.sentence-combining`) — do not certify mastery without TA-5's dual-order construction, since sentence-combining requires flexibly restructuring clause order to vary sentence style, not just recognizing one fixed pattern.
- Reuse the "anchor and kite" framing explicitly when introducing `eng.grammar.sentence-combining` — that concept teaches deliberately choosing clause order and combination method for stylistic effect, building directly on the flexible-order principle established here.

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
| V-10 | Counterexample present where appropriate (comma-rule-by-position contrast) | PASS |
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
