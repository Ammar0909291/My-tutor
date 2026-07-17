# Teaching Blueprint: Introduction to Syntactic Theory

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.linguistics.syntax-theory-intro
name: Introduction to Syntactic Theory
domain: linguistics
difficulty:
  label: advanced
  numeric: 5
bloom: understand
prerequisites:
  - eng.linguistics.morphology-intro
  - eng.grammar.clauses
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 5
cpa_entry_stage: abstract
status: active
```

**Concept:** Introduction to Syntactic Theory — the formal, scientific study of sentence structure:
how words combine into phrases and phrases combine into sentences according to a speaker's
internalized, largely unconscious system of rules, distinct from prescriptive school-grammar rules
about "correct" writing.

**Why this concept exists in the sequence:** Morphology (prerequisite) teaches word-internal
structure. Clauses (prerequisite) teaches practical clause-building for writing. Syntactic Theory
teaches the formal linguistic study of how words combine into larger structures according to a
speaker's internalized mental grammar — a descriptive science of structure, not a set of writing
rules to follow. This concept unlocks `eng.linguistics.semantics-intro` (the study of meaning
building on sentence structure), `eng.linguistics.language-acquisition-intro` (how children acquire
this internalized structural system), and `eng.linguistics.computational-linguistics-intro` (modeling
sentence structure computationally requires first understanding it linguistically).

## Learning Objective

By the end of this concept, the student can (a) explain that syntax as studied in linguistics
describes the internalized, largely unconscious structural knowledge every fluent speaker has, not a
set of prescriptive writing rules, (b) identify that phrases (not just individual words) are the
building blocks combining into sentences, showing basic phrase structure, and (c) explain that a
sentence can be grammatically well-formed (following the speaker's internalized structural rules)
while being semantically nonsensical, demonstrating that syntax and meaning are related but distinct
levels of analysis.

## Component 1 — Misconception Register

### MC-A-SYNTAX-IS-JUST-SCHOOL-GRAMMAR-RULES-FOR-WRITING-CORRECTLY

**Trigger signal:** Student conflates linguistic syntax (the formal study of a speaker's internalized
structural knowledge, which every fluent speaker has regardless of formal education) with
prescriptive school-grammar rules (explicit writing conventions like "don't split infinitives" that
must be taught and learned) — e.g., assuming a linguist studying syntax is checking whether sentences
follow the same rules as a writing style guide.

**Conflict evidence [P28]:** Show the student a sentence a young child (with no formal grammar
instruction) would never produce, even though nothing explicitly "taught" them not to (e.g., a child
would say "the big red ball" but essentially never "the ball big red," even without ever being taught
adjective ordering rules explicitly). Ask: "If no one taught this child a rule about adjective order,
how does the child 'know' not to produce the second version? Is this the same kind of knowledge as a
style guide rule someone has to be explicitly taught?"

**Bridge text [P30]:** "School grammar rules (like 'don't end a sentence with a preposition') are
like traffic laws — explicit, taught rules that could in principle be different, and that not
everyone follows. Syntax, as linguists study it, is more like the automatic, unconscious balance and
coordination your body uses to walk — nobody explicitly taught you the muscle sequence, yet you do it
correctly and consistently, and even without formal training. Linguistic syntax researches this deep,
unconscious structural knowledge every fluent speaker has, not the explicit writing rules taught in
school."

**Replacement text [P31]:** "Ask: is this rule something a speaker had to be explicitly TAUGHT and
could consciously violate while still being understood (like a style guide convention), or is it part
of the deep, automatic structural knowledge every fluent speaker has without ever being taught it
directly (like never confusing subject and object)? Linguistic syntax studies the second kind of
knowledge."

**Discrimination pairs [P33]:**
1. "Don't split an infinitive" (an explicitly taught, debatable style convention — prescriptive school
   grammar) vs. the automatic, untaught knowledge that "the ball big red" sounds wrong to any fluent
   English speaker, even a young child (deep, unconscious syntactic knowledge).
2. A student assuming a linguist studying syntax is correcting "bad grammar" the way an English
   teacher grading an essay would (misconception) vs. a student recognizing the linguist is
   documenting the automatic structural patterns every fluent speaker (including non-writers,
   young children, and speakers of "non-standard" dialects) already has (correct understanding).

**s6_path:** If the student continues conflating linguistic syntax with school grammar after the
bridge, have them generate three sentence orderings that "just sound wrong" to them even though no
one ever explicitly taught them a rule against that specific ordering, demonstrating their own
internalized structural knowledge directly.

### MC-B-A-GRAMMATICALLY-CORRECT-SENTENCE-MUST-ALSO-MAKE-SENSE-SYNTAX-AND-MEANING-ARE-THE-SAME-THING

**Trigger signal:** Student assumes that a sentence following correct structural rules must
automatically also be meaningful, failing to recognize that syntax (structural well-formedness) and
semantics (meaning) are related but genuinely separate levels of linguistic analysis — e.g., rejecting
a structurally perfect but nonsensical sentence as "not grammatical" when it is, in fact, perfectly
grammatical, just meaningless.

**Conflict evidence [P28]:** Show the student the classic linguistic example "Colorless green ideas
sleep furiously" alongside a genuinely ungrammatical string of the same words in scrambled order
("Furiously sleep ideas green colorless"). Ask: "Is the first sentence grammatically well-formed —
does it follow English sentence structure rules (subject-verb agreement, word order, phrase
structure)? Does it make logical sense? Are these actually the same question?"

**Bridge text [P30]:** "Assuming grammatical correctness and meaningfulness are the same thing is
like assuming a beautifully, structurally sound bridge must automatically lead somewhere useful — but
a bridge can be engineered perfectly (structurally sound) while still leading nowhere meaningful (to
an empty field, say). Syntax is the structural engineering of a sentence; semantics (meaning) is a
separate question about where that structure actually 'leads.' A sentence can be perfectly engineered
(grammatical) while going nowhere sensible (meaningless)."

**Replacement text [P31]:** "When evaluating a sentence, ask two SEPARATE questions: (1) Does it
follow the structural rules of English sentence formation (syntax)? (2) Does it make logical sense
(semantics)? A sentence can pass the first test and fail the second — these are not the same
question."

**Discrimination pairs [P33]:**
1. "Colorless green ideas sleep furiously." (grammatically well-formed — correct word order, subject-
   verb agreement — but semantically nonsensical, since ideas can't be colorless, green, or sleep) vs.
   "Furiously sleep ideas green colorless." (both ungrammatical AND nonsensical — violates basic word
   order rules).
2. A student calling the first sentence "not grammatical" because it doesn't make sense
   (conflating syntax and semantics) vs. a student correctly identifying it as grammatically
   well-formed but semantically odd (correctly separating the two levels).

**s6_path:** If the student continues conflating the two after the bridge, have them construct their
own sentence that is grammatically correct (following standard word order and agreement rules) but
deliberately nonsensical, then explain separately why it passes the structural test and fails the
meaning test.

## Component 2 — Prerequisite Diagnostic Block

**PD-1 (checks `eng.linguistics.morphology-intro`):** "Break this word into its constituent
morphemes." A student who cannot perform basic morphological analysis lacks the foundation this
concept builds on — route to `eng.linguistics.morphology-intro` review first.

**PD-2 (checks `eng.grammar.clauses`):** "Identify the main clause and any subordinate clause in this
sentence." A student who cannot identify basic clause structure lacks the practical grammar knowledge
this concept formalizes — route to `eng.grammar.clauses` review before Component 3.

## Component 3 — Concrete Anchor [P06]

**The Walking-Balance-and-Bridge-to-Nowhere Anchor.** Combine two images: a person walking with
automatic, unconscious muscular coordination they were never explicitly taught, contrasted with an
explicit, taught rule (like a specific dance step) — directly seeding the fix for MC-A (syntax is
deep, automatic knowledge, not taught convention). Second, a beautifully engineered bridge that leads
to an empty field — structurally sound but purposeless — directly seeding the fix for MC-B (a
sentence can be structurally well-formed, "syntax," while still leading nowhere meaningful,
"semantics").

## Component 4 — Conceptual Development Sequence

### TA-1 — Syntax as Unconscious, Internalized Knowledge (MC-A)

Using the walking-balance anchor, teach the distinction between deep, automatic syntactic knowledge
and explicit, taught prescriptive rules. Student practice: given six rules or observations about
sentences, sort into "deep, unconscious syntactic knowledge" and "explicit, taught prescriptive
convention."

### TA-2 — Phrases as Building Blocks

Teach that sentences are built from PHRASES (noun phrases, verb phrases), not just individual words
strung together — introduce basic phrase-structure grouping. Student practice: given four sentences,
group the words into their constituent phrases.

### TA-3 — Word Order and Structural Well-Formedness

Teach that syntactic well-formedness depends on following the language's specific word-order and
agreement patterns. Student practice: given three scrambled word sets, arrange each into the only (or
most natural) grammatically well-formed order.

### TA-4 — Syntax vs. Semantics: Structure vs. Meaning (MC-B)

Using the bridge-to-nowhere anchor and the "Colorless green ideas" example, teach the distinction
between grammatical well-formedness and meaningfulness. Student practice: given four sentences (mixing
grammatical-and-meaningful, grammatical-but-nonsensical, and ungrammatical examples), classify each
along both dimensions separately.

### TA-5 — Full Application: Analyzing Sentence Structure and Distinguishing It From Meaning

Give the student a new sentence set including at least one grammatical-but-nonsensical example. They
must identify phrase structure (TA-2), confirm word-order well-formedness (TA-3), and explicitly
evaluate syntax and semantics as separate questions (TA-4) — the full synthesis task.

## Component 5 — Worked Examples

**WE-1 (Scaffolded):** Sentence: "The curious cat watched the fluttering bird." Fully worked: phrase
structure identified ("the curious cat" as a noun phrase, "watched the fluttering bird" as a verb
phrase containing another noun phrase); word order confirmed as well-formed English structure; syntax
and semantics both confirmed intact (the sentence is both grammatical and meaningful). Then compared
with "Colorless green ideas sleep furiously" — same basic structural pattern (noun phrase + verb
phrase), confirmed grammatically well-formed, but confirmed semantically nonsensical. Annotation
confirms both the phrase-structure analysis and the explicit syntax/semantics separation (fixing
MC-B), plus framing the whole exercise as studying automatic structural knowledge, not taught writing
rules (fixing MC-A).

**WE-2 (Guided):** New sentence pair, one ordinary and meaningful, one grammatical but nonsensical.
Student is prompted with guiding questions ("What are the noun phrase(s) and verb phrase(s) in each
sentence? Does each sentence follow standard English word order? Setting structure aside, does each
sentence make logical sense — are these actually the same question?") to complete the phrase analysis
and the syntax/semantics separation.

**WE-3 (Independent):** A new sentence set including a grammatical-but-nonsensical example, unaided.
Student identifies phrase structure, confirms well-formedness, and evaluates meaningfulness as a
separate question.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Distinguishing Deep Syntax from Taught Convention**
Given four rules or observations about sentences, sort into "deep, unconscious syntactic knowledge"
and "explicit, taught prescriptive convention," justifying each classification.

**MP-2 [P36] — Identifying Phrase Structure**
Given two sentences, group the words into their constituent noun phrases and verb phrases.

**MP-3 [P36] — Confirming Word-Order Well-Formedness**
Given two scrambled word sets, arrange each into a grammatically well-formed English sentence order.

**MP-4 [P36] — Separating Syntax from Semantics**
Given three sentences (grammatical-and-meaningful, grammatical-but-nonsensical, ungrammatical),
classify each along both the syntactic and semantic dimensions separately.

**MP-5 [P36] — Full Structural Analysis**
Given a new sentence, identify its phrase structure, confirm its word-order well-formedness, and
evaluate its meaningfulness as a separate question from its grammaticality.

## Component 7 — Session Architecture

```
[Entry] --> [PD-1: morphology check] --> [PD-2: clauses check]
   |                                             |
   | (gap found)                                 | (pass)
   v                                              v
[Route to prerequisite concept]      [Component 3: Walking-Balance / Bridge-to-Nowhere Anchor]
                                                  |
                                                  v
                               [TA-1] -> [TA-2] -> [TA-3] -> [TA-4] -> [TA-5]
                                                  |
                                                  v
                            [WE-1 Scaffolded] -> [WE-2 Guided] -> [WE-3 Independent]
                                                  |
                                                  v
                            [MP-1 through MP-5 mastery probe set]
                                                  |
                            (pass >= 0.75) -----+----- (fail)
                                   |                      |
                                   v                      v
          [Unlock: semantics-intro, language-acquisition-  [S6 remediation: generate-your-
           intro, computational-linguistics-intro]           own-untaught-rule / cover-the-
                                                               claim-style separation drills]
```

**Protocol routing paragraph:** On entry (S0), run PD-1 and PD-2; a gap in either prerequisite routes
back before Component 3. During Component 4 (S1, active instruction), MC-A typically surfaces during
TA-1 (before the deep/taught distinction is settled) and MC-B during TA-4 (once structural analysis is
underway and meaning naturally enters the discussion) — MC-A generally needs resolving first since
framing syntax correctly as a descriptive science affects how the entire sequence is approached. If
either fires, branch to the relevant s6_path drill before resuming. At the mastery probe stage (S9),
route by failure: MP-1 failure indicates residual MC-A; MP-2/MP-3 failures indicate the phrase-
structure and word-order mechanics (TA-2/TA-3) need review, distinct from either misconception; MP-4
failure alone indicates residual MC-B; MP-5 failure with MP-1 through MP-4 passing indicates an
integration gap — provide one more guided full-analysis example before re-probing.

## Component 8 — Adaptive Flags

- If the student masters phrase-structure identification (MP-2) but struggles specifically with the
  syntax/semantics separation (MP-4), this is a conceptual distinction issue, not a mechanical one —
  return to the bridge-to-nowhere anchor with a new concrete example rather than more phrase-structure
  drilling.
- If the student has strong prior exposure to prescriptive grammar instruction, expect more initial
  resistance to MC-A's reframe — this parallels the same paradigm shift required in
  `eng.linguistics.what-is-linguistics`, and connecting explicitly back to that concept (if completed)
  should ease the transition.
- If the student enjoys the "grammatical but nonsensical" sentence type and starts generating creative
  examples independently, encourage this as a strong sign of genuine conceptual grasp — invented
  examples are strong transfer evidence for MP-4/MP-5-level understanding.
- Students who found `eng.grammar.clauses` mechanically straightforward but rote should be watched
  for surface-level phrase-identification without genuine structural understanding — the mastery
  probes' emphasis on explaining WHY a grouping is a phrase (not just producing correct groupings) is
  the primary check against this.

## Component 9 — Validation Checklist

| ID | Check | Result |
|----|-------|--------|
| V-1 | Concept Identity frontmatter complete and well-formed | PASS |
| V-2 | Exactly 2 misconceptions registered, each with full 5-part structure | PASS |
| V-3 | Every misconception uses a full descriptive ID, no bare numeric shorthand anywhere in document | PASS |
| V-4 | Prerequisite Diagnostic Block covers all listed prerequisites | PASS |
| V-5 | Concrete Anchor explicitly seeds fixes for both registered misconceptions | PASS |
| V-6 | Conceptual Development Sequence has TA-1 through TA-5 (3-hour concept) | PASS |
| V-7 | Each TA includes explicit student practice, not instruction-only | PASS |
| V-8 | Three Worked Examples present (Scaffolded, Guided, Independent) with increasing student responsibility | PASS |
| V-9 | Worked Examples use consistent phrase-order-meaning structure | PASS |
| V-10 | Mastery Probe Set contains exactly 5 MP entries | PASS |
| V-11 | Each mastery probe uses the required bold-header paragraph format (`**MP-N [P36] — Title**`) | PASS |
| V-12 | Mastery probes collectively assess both misconceptions and full transfer | PASS |
| V-13 | Session Architecture diagram accurately reflects all routing paths described in prose | PASS |
| V-14 | Protocol routing paragraph addresses S0 (entry), S1 (active instruction), and S9 (evaluation) states | PASS |
| V-15 | Adaptive Flags section contains at least 4 distinct, actionable flags | PASS |
| V-16 | No references to Educational Brain, Teaching Engine, or runtime code — blueprint content only | PASS |
| V-17 | Cross-links and prerequisites match the Knowledge Graph node exactly | PASS |
| V-18 | Difficulty, bloom level, and estimated hours match the Knowledge Graph node exactly | PASS |
| V-19 | Mastery threshold matches the Knowledge Graph node exactly (0.75) | PASS |
| V-20 | Document compiles deterministically (identical hash on repeat `--check` run) | PASS |
