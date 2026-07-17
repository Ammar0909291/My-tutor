# Teaching Blueprint: Introduction to Semantics

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.linguistics.semantics-intro
name: Introduction to Semantics
domain: linguistics
difficulty:
  label: advanced
  numeric: 5
bloom: understand
prerequisites:
  - eng.linguistics.syntax-theory-intro
mastery_threshold: 0.75
estimated_hours: 3
cross_links:
  - eng.grammar.conditionals
session_cap: 5
cpa_entry_stage: abstract
status: active
```

**Concept:** Introduction to Semantics — the formal study of linguistic MEANING at the word level
(what individual words mean and how their meanings relate to each other) and the sentence level (how
word meanings combine to produce sentence meaning), distinct from syntax's focus on structure alone.

**Why this concept exists in the sequence:** Syntactic Theory (prerequisite) established that a
sentence can be structurally well-formed while being meaningless, explicitly separating structure from
meaning. Semantics teaches the formal study of that separated meaning dimension directly: how words
relate to each other in meaning (synonymy, antonymy, hyponymy) and how sentence meaning is built
compositionally from word meanings and structure together. This concept unlocks
`eng.linguistics.pragmatics-intro` (meaning in actual context and use builds on first understanding
literal, context-independent sentence meaning) and `eng.linguistics.translation-studies-intro`
(translating meaning across languages requires a formal understanding of what "meaning" itself
consists of).

## Learning Objective

By the end of this concept, the student can (a) identify semantic relationships between words
(synonymy, antonymy, hyponymy/category membership) using formal tests, (b) explain that sentence
meaning is compositional — built systematically from the meanings of its parts and how they combine —
using the classic ambiguous-sentence example to show that changing how parts combine (not just which
words are used) changes the resulting meaning, and (c) distinguish between a sentence's literal,
context-independent semantic meaning and how it might be USED or interpreted in an actual context (a
preview of the semantics/pragmatics boundary).

## Component 1 — Misconception Register

### MC-A-WORD-MEANING-IS-A-SIMPLE-ONE-TO-ONE-LABEL-WITH-NO-INTERNAL-STRUCTURE-OR-RELATIONSHIPS

**Trigger signal:** Student treats each word's meaning as an isolated, unstructured label with no
systematic relationship to other words' meanings, failing to recognize formal semantic relationships
like hyponymy (a word being a specific type of a more general category, e.g., "robin" is a hyponym of
"bird") or the systematic, testable nature of synonymy and antonymy.

**Conflict evidence [P28]:** Show the student the word "robin" and ask what larger category it
belongs to, then ask if "robin" and "bird" mean "the same thing" or if one is a specific TYPE of the
other, with a systematic, testable relationship ("a robin is a bird" is always true; "a bird is a
robin" is not always true). Ask: "Is this a random fact about these two words, or does this same
'X is a type of Y, but not vice versa' pattern apply systematically to lots of other word pairs
(rose/flower, oak/tree)?"

**Bridge text [P30]:** "Treating word meanings as isolated, unrelated labels is like assuming a
library's books are just scattered randomly with no organizing system — but words, like books, have
systematic organizational relationships (broader categories and specific types within them, opposites,
synonyms) that can be tested and verified, not just intuited randomly."

**Replacement text [P31]:** "When examining a word's meaning, ask: does this word have a broader
category it belongs to (hyponymy — testable with 'an X is always a Y, but a Y is not always an X'), a
near-synonym, or an opposite? These are systematic, testable semantic relationships, not just
isolated facts about individual words."

**Discrimination pairs [P33]:**
1. Treating "robin" and "bird" as two unrelated, separate labels (no structural relationship
   recognized) vs. recognizing "robin" as a hyponym of "bird," testable via "a robin is always a
   bird, but a bird is not always a robin" (systematic relationship recognized).
2. A student who cannot generate the category a specific word belongs to when asked (no relational
   thinking) vs. a student who can identify the hyponymy test and apply it to new word pairs
   (correct, systematic understanding).

**s6_path:** If the student continues treating word meanings as isolated after the bridge, have them
apply the "an X is always a Y, but not vice versa" test to five new word pairs, confirming or denying
a hyponymy relationship for each.

### MC-B-SENTENCE-MEANING-IS-JUST-THE-SUM-OF-INDIVIDUAL-WORD-MEANINGS-IN-ANY-ORDER

**Trigger signal:** Student assumes sentence meaning is simply the accumulation of individual word
meanings regardless of how those words are structurally combined, failing to recognize that HOW words
combine (structural ambiguity, scope, grouping) can produce genuinely different sentence meanings from
the exact same set of words — e.g., not recognizing that "I saw the man with the telescope" has two
genuinely different meanings depending on how its parts are grouped (did I use the telescope to see
him, or did he have the telescope?).

**Conflict evidence [P28]:** Show the student the classic ambiguous sentence "I saw the man with the
telescope" and ask them to identify the two different possible meanings. Then ask: "Do these two
meanings come from different WORDS being used, or from the exact same words being GROUPED differently
in the underlying structure?" Guide the student to see that the word meanings themselves haven't
changed — what's changed is how they combine structurally.

**Bridge text [P30]:** "Assuming sentence meaning is just the sum of word meanings, regardless of
order or grouping, is like assuming a recipe's outcome depends only on WHICH ingredients are used,
never on how they're combined or in what sequence — but the same ingredients combined differently
(mixed together first versus added in stages) produce genuinely different dishes. Sentence meaning is
'compositional' — built from word meanings AND the specific way they're structurally combined; change
the combination, and the meaning can change even with identical words."

**Replacement text [P31]:** "When you encounter a sentence with more than one possible meaning, ask:
are the different meanings coming from different possible groupings or scope relationships among the
SAME words (structural ambiguity), rather than assuming meaning is a fixed sum unaffected by how parts
combine?"

**Discrimination pairs [P33]:**
1. Assuming "I saw the man with the telescope" has only one possible meaning because "the words mean
   what they mean" (missing structural ambiguity) vs. correctly identifying the two distinct meanings
   arising from two different structural groupings of the identical words (correct compositional
   understanding).
2. A student unable to explain WHY a sentence is ambiguous beyond "it just sounds like it could mean
   two things" (surface-level recognition without structural explanation) vs. a student who can
   identify the specific structural grouping difference underlying the ambiguity (deeper,
   compositional understanding).

**s6_path:** If the student continues to view sentence meaning as order/structure-independent after
the bridge, give them the same set of words rearranged into two genuinely different sentences (not
just re-punctuated) and have them confirm the meanings differ, then return to the single ambiguous
sentence and identify the TWO different underlying groupings producing its two meanings without any
word changes at all.

## Component 2 — Prerequisite Diagnostic Block

**PD-1 (checks `eng.linguistics.syntax-theory-intro`):** "Is this sentence grammatically well-formed,
semantically meaningful, both, or neither: 'Colorless green ideas sleep furiously'?" A student who
cannot separate these two questions lacks the foundational distinction this concept builds on —
route to `eng.linguistics.syntax-theory-intro` review first.

## Component 3 — Concrete Anchor [P06]

**The Library-Organization-and-Recipe-Combination Anchor.** Combine two images: a well-organized
library with books grouped into systematic categories and subcategories, versus a randomly scattered
pile — directly seeding the fix for MC-A (word meanings have systematic, testable structural
relationships, not isolated labels). Second, the same ingredients combined in two different orders or
groupings producing two different dishes — directly seeding the fix for MC-B (sentence meaning is
compositional, built from both word meanings AND their structural combination).

## Component 4 — Conceptual Development Sequence

### TA-1 — Hyponymy: Category Relationships Between Words (MC-A)

Using the library-organization anchor, teach the hyponymy test ("an X is always a Y, but a Y is not
always an X"). Student practice: given six word pairs, apply the test to confirm or deny a hyponymy
relationship.

### TA-2 — Synonymy and Antonymy as Systematic Relationships

Extend TA-1 to synonymy (near-identical meaning) and antonymy (opposite meaning) as similarly
systematic, testable relationships. Student practice: given eight word pairs, classify each as
synonym, antonym, hyponym-hypernym, or unrelated.

### TA-3 — Compositional Meaning and Structural Ambiguity (MC-B)

Using the recipe-combination anchor and the classic ambiguous sentence, teach that sentence meaning
is built from word meanings AND their structural combination, and that structural ambiguity produces
genuinely different meanings from identical words. Student practice: given three structurally
ambiguous sentences, identify both possible meanings for each and explain the underlying structural
difference.

### TA-4 — Literal Meaning vs. Contextual Use (Preview of Pragmatics)

Introduce the distinction between a sentence's literal, context-independent semantic meaning and how
it might be interpreted or used in an actual conversational context (without fully developing
pragmatics, which is the next concept). Student practice: given a sentence with a clear literal
meaning that could nonetheless be used non-literally in context (e.g., "Can you pass the salt?" as a
request, not a literal question about ability), identify the literal semantic meaning separately from
the likely contextual use.

### TA-5 — Full Application: Analyzing Word and Sentence Meaning Together

Give the student a new short text. They must identify at least one hyponymy or synonymy/antonymy
relationship among its words (TA-1, TA-2), identify or construct a structurally ambiguous sentence
and explain its two meanings (TA-3), and distinguish a sentence's literal meaning from a likely
contextual interpretation (TA-4) — the full synthesis task.

## Component 5 — Worked Examples

**WE-1 (Scaffolded):** Text containing the words "puppy" and "dog," and the ambiguous sentence
"Visiting relatives can be annoying." Fully worked: "puppy" identified as a hyponym of "dog" (a puppy
is always a dog, but a dog is not always a puppy); "Visiting relatives can be annoying" identified as
structurally ambiguous (does "visiting" describe the relatives who are visiting, or the act of
visiting relatives?) with both structural groupings explained; literal vs. contextual use discussed
for a separate example sentence. Annotation confirms both the systematic word-relationship analysis
(fixing MC-A) and the structural-ambiguity explanation (fixing MC-B).

**WE-2 (Guided):** New text with a different hyponymy pair and a different ambiguous sentence.
Student is prompted with guiding questions ("Is one of these words always an example of the other,
but not vice versa? This sentence seems to have two meanings — are they coming from different word
choices, or from the same words grouped differently?") to complete the analysis.

**WE-3 (Independent):** A new short text, unaided. Student identifies a word-meaning relationship,
analyzes a structurally ambiguous sentence, and distinguishes literal from contextual meaning.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Applying the Hyponymy Test**
Given four word pairs, apply the "always an X, not always a Y" test to confirm or deny a hyponymy
relationship for each.

**MP-2 [P36] — Classifying Word-Meaning Relationships**
Given six word pairs, classify each as synonym, antonym, hyponym-hypernym, or unrelated.

**MP-3 [P36] — Explaining Structural Ambiguity**
Given a structurally ambiguous sentence, identify both possible meanings and explain the underlying
structural grouping difference producing each.

**MP-4 [P36] — Separating Literal Meaning from Contextual Use**
Given a sentence that could be interpreted non-literally in context, state its literal semantic
meaning and its likely contextual interpretation as two separate things.

**MP-5 [P36] — Full Semantic Analysis**
Given a new short text, identify a word-meaning relationship, analyze a structurally ambiguous
sentence, and distinguish literal from contextual meaning for at least one sentence.

## Component 7 — Session Architecture

```
[Entry] --> [PD-1: syntax theory check]
   |                    |
   | (gap found)        | (pass)
   v                     v
[Route to eng.linguistics.syntax-theory-intro]  [Component 3: Library-Organization /
                                                  Recipe-Combination Anchor]
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
                [Unlock: pragmatics-intro,           [S6 remediation: hyponymy-test /
                 translation-studies-intro]            regroup-the-same-words drills]
```

**Protocol routing paragraph:** On entry (S0), run PD-1; a gap routes back to the prerequisite.
During Component 4 (S1, active instruction), MC-A typically surfaces during TA-1/TA-2 (isolated word-
meaning view) and MC-B during TA-3 (order/structure-independent sentence meaning view) — these are
largely independent and often need separate, explicit correction. If either fires, branch to the
relevant s6_path drill before resuming. At the mastery probe stage (S9), route by failure: MP-1/MP-2
failures indicate residual MC-A; MP-3 failure alone indicates residual MC-B; MP-4 failure alone
indicates the literal/contextual distinction (TA-4) needs review, distinct from either misconception;
MP-5 failure with MP-1 through MP-4 passing indicates an integration gap — provide one more guided
full-analysis example before re-probing.

## Component 8 — Adaptive Flags

- If the student masters isolated hyponymy/synonymy classification (MP-1, MP-2) but struggles to
  explain structural ambiguity (MP-3), this indicates the compositional-meaning insight needs more
  concrete grouping exercises (e.g., physically bracketing which words group together under each
  reading) rather than more word-relationship drilling.
- If the student conflates the literal/contextual distinction (TA-4) with simple politeness or
  sarcasm recognition, clarify that this is a preview of a much broader systematic distinction
  (semantics vs. pragmatics) that the next concept will develop fully — not required to master deeply
  here, just to recognize as a real, separate question.
- If the student's cross-link to `eng.grammar.conditionals` surfaces naturally (e.g., recognizing
  that conditional sentences' meaning also depends heavily on structural scope), acknowledge and
  reinforce this connection explicitly rather than treating it as a tangent.
- Students with strong performance in `eng.linguistics.syntax-theory-intro`'s syntax/semantics
  separation should transfer that distinction readily to TA-3's structural-ambiguity work; if this
  transfer doesn't occur, revisit whether that prior distinction was genuinely internalized.

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
| V-9 | Worked Examples use consistent relationship-ambiguity-context structure | PASS |
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
