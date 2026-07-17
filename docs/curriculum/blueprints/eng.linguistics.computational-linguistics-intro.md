# Teaching Blueprint: Introduction to Computational Linguistics

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.linguistics.computational-linguistics-intro
name: Introduction to Computational Linguistics
domain: linguistics
difficulty:
  label: research
  numeric: 7
bloom: apply
prerequisites:
  - eng.linguistics.corpus-linguistics-intro
  - eng.linguistics.syntax-theory-intro
mastery_threshold: 0.7
estimated_hours: 3
cross_links:
  - eng.communication.digital-communication
session_cap: 5
cpa_entry_stage: abstract
status: active
```

**Concept:** Introduction to Computational Linguistics — a survey of computational and statistical
approaches to processing and modeling human language, including how modern language technology
(from spell-checkers to large language models) actually works at a conceptual level, and the genuine
limits of what statistical pattern-matching can and cannot capture about language.

**Why this concept exists in the sequence:** Corpus Linguistics (prerequisite) taught large-scale
empirical study of authentic language data. Syntactic Theory (prerequisite) taught the formal
structural rules underlying sentences. Computational Linguistics teaches how these combine in
practice: computers process language largely through STATISTICAL PATTERNS learned from huge corpora
(not by consciously "understanding" meaning the way a human does), which explains both the genuine
power and the genuine limits of language technology. This concept has no further downstream unlocks
in the current curriculum, completing the linguistics sequence's technological/computational branch.

## Learning Objective

By the end of this concept, the student can (a) explain that most modern language technology
processes language through statistical pattern-recognition learned from large corpora, not through
consciously understanding meaning the way a human speaker does, (b) explain why a language model
producing fluent, grammatically correct output does not guarantee the output is factually accurate,
since fluency and accuracy are measuring genuinely different things, and (c) identify at least one
specific type of language task that remains genuinely difficult for computational systems (e.g.,
resolving certain ambiguities requiring real-world knowledge or context beyond the text itself).

## Component 1 — Misconception Register

### MC-A-A-COMPUTER-PRODUCING-FLUENT-GRAMMATICALLY-CORRECT-LANGUAGE-MUST-UNDERSTAND-THE-MEANING-THE-WAY-A-HUMAN-DOES

**Trigger signal:** Student assumes that because a computational language system produces fluent,
grammatically well-formed output, it must be consciously "understanding" the meaning of what it's
producing in the same way a human speaker does, failing to recognize that fluent output can be
generated primarily through statistical pattern-matching learned from vast amounts of text, which is a
genuinely different process from human meaning-comprehension, even when the OUTPUT looks
indistinguishable.

**Conflict evidence [P28]:** Present the student with an example where a computational language
system produces a fluent, grammatically perfect sentence containing a factual error or a subtle
logical inconsistency that a genuinely understanding human speaker would likely catch. Ask: "Does
producing fluent, correct-SOUNDING language guarantee that the underlying process 'understands' the
content the way a human would? What does this factual error suggest about what the system is actually
doing?"

**Bridge text [P30]:** "Assuming fluent output means genuine understanding is like assuming a very
skilled tribute-band musician who perfectly mimics a famous song note-for-note must have personally
composed and deeply understood the emotional meaning behind the original piece — the SURFACE
performance can be indistinguishable, but the underlying process (learned mimicry of patterns versus
original creative understanding) is genuinely different. Language technology can produce fluent,
pattern-matched output without the underlying process being equivalent to human comprehension."

**Replacement text [P31]:** "Don't assume fluent, grammatically correct output from a language
technology system means it 'understands' content the way a human does. Recognize that fluency is a
measure of PATTERN-MATCHING SKILL, which is a separate question from genuine comprehension or factual
accuracy."

**Discrimination pairs [P33]:**
1. A computational system producing a grammatically flawless sentence that contains a subtle factual
   error (fluent but not necessarily accurate, revealing pattern-matching rather than verified
   understanding) vs. assuming any fluent output must be accurate because it "sounds like" it
   understands (the misconception).
2. A student who treats a fluent AI-generated response as automatically trustworthy because it reads
   naturally (misconception) vs. a student who recognizes fluency and accuracy as separate questions
   requiring separate verification (correct, critical understanding).

**s6_path:** If the student continues to equate fluency with genuine understanding after the bridge,
give them two more examples of fluent but factually flawed computational output and have them
articulate specifically what about the output reveals pattern-matching rather than verified,
fact-checked comprehension.

### MC-B-COMPUTATIONAL-LANGUAGE-SYSTEMS-CAN-HANDLE-EVERY-ASPECT-OF-LANGUAGE-EQUALLY-WELL-WITH-NO-GENUINE-LIMITATIONS

**Trigger signal:** Student assumes computational language systems can handle all aspects of language
processing equally well and with no genuine, persistent limitations, failing to recognize that certain
language tasks remain genuinely difficult for computational systems — particularly those requiring
real-world knowledge, common-sense reasoning, or context beyond the immediate text to resolve
ambiguity (e.g., understanding which of two possible referents a pronoun points to, when this
genuinely requires knowledge about the world, not just linguistic pattern).

**Conflict evidence [P28]:** Present the student with a classic ambiguous sentence requiring real-
world knowledge to resolve correctly (e.g., "The trophy didn't fit in the suitcase because it was too
big" — resolving whether "it" refers to the trophy or the suitcase requires knowing which one would
typically need to fit inside the other, a fact about the world, not purely a grammatical clue). Ask:
"Can this ambiguity be resolved by grammar or word patterns ALONE, or does resolving it require actual
knowledge about how trophies and suitcases typically relate in size?"

**Bridge text [P30]:** "Assuming computational systems handle all language tasks equally well is like
assuming a highly skilled cook who has memorized thousands of recipes precisely can automatically
diagnose why a completely novel, never-before-seen dish tastes off — pattern-matching from vast
experience is powerful, but tasks requiring genuine real-world reasoning beyond the learned patterns
remain a different, often much harder, challenge. Certain ambiguities in language genuinely require
real-world knowledge that pure statistical pattern-matching struggles to capture reliably."

**Replacement text [P31]:** "Recognize that computational language systems have genuine limitations,
particularly for tasks requiring real-world or common-sense knowledge beyond linguistic pattern (like
resolving certain pronoun ambiguities). Don't assume uniform, equally strong performance across every
kind of language task."

**Discrimination pairs [P33]:**
1. "The trophy didn't fit in the suitcase because it was too big." (an ambiguity requiring real-world
   knowledge about typical size relationships between trophies and suitcases, genuinely difficult for
   pattern-matching alone) vs. a straightforward grammatical task like identifying the subject of a
   simple sentence (well-handled by pattern-based systems, no special real-world knowledge required).
2. A student who assumes computational language tools are equally reliable for all language tasks
   (misconception) vs. a student who recognizes some tasks (common-sense ambiguity resolution) as
   genuinely harder than others for these systems (correct, nuanced understanding).

**s6_path:** If the student continues to assume uniform competence after the bridge, give them two
more examples of ambiguous sentences requiring real-world knowledge to resolve, and have them
articulate specifically why grammatical pattern alone is insufficient to resolve each one.

## Component 2 — Prerequisite Diagnostic Block

**PD-1 (checks `eng.linguistics.corpus-linguistics-intro`):** "Explain why large-scale corpus data can
answer frequency questions that individual intuition cannot." A student who cannot answer correctly
lacks the empirical, large-scale-pattern foundation this concept builds on — route to
`eng.linguistics.corpus-linguistics-intro` review first.

**PD-2 (checks `eng.linguistics.syntax-theory-intro`):** "Explain the difference between a sentence
being grammatically well-formed and being semantically meaningful." A student who cannot make this
distinction lacks the structural foundation this concept's computational-processing discussion assumes
— route to `eng.linguistics.syntax-theory-intro` review before Component 3.

## Component 3 — Concrete Anchor [P06]

**The Tribute-Band-Musician and Skilled-Cook-with-a-Novel-Dish Anchor.** Combine two images: a
tribute-band musician perfectly mimicking a song note-for-note without having personally composed or
deeply understood its original emotional meaning — directly seeding the fix for MC-A (fluent
output doesn't guarantee genuine understanding). Second, a skilled cook who has memorized thousands of
recipes but struggles to diagnose an entirely novel dish's problem — directly seeding the fix for
MC-B (pattern-matching from vast experience has genuine limits for tasks requiring reasoning beyond
learned patterns).

## Component 4 — Conceptual Development Sequence

### TA-1 — Statistical Pattern-Matching vs. Human Understanding (MC-A)

Using the tribute-band-musician anchor, teach that computational language processing largely works
through statistical pattern-matching learned from corpora, a genuinely different process from human
meaning-comprehension. Student practice: given three computational output examples (some fluent-and-
accurate, some fluent-but-flawed), identify which reveal pattern-matching without guaranteed
verification.

### TA-2 — Fluency and Accuracy Are Separate Questions

Extend TA-1: teach explicitly that grammatical fluency and factual accuracy are separate dimensions of
evaluation. Student practice: given four outputs varying independently in fluency and accuracy,
classify each along both dimensions separately.

### TA-3 — Genuine Limitations: Tasks Requiring Real-World Knowledge (MC-B)

Using the skilled-cook anchor, teach that certain language tasks (ambiguity resolution requiring
common-sense/real-world knowledge) remain genuinely difficult for computational pattern-matching.
Student practice: given three ambiguous sentences, identify which require real-world knowledge to
resolve versus which can be resolved by grammatical pattern alone.

### TA-4 — Full Application: Evaluating Computational Language Processing Claims

Give the student a new scenario describing a computational language system's output and performance
claims. They must evaluate whether fluency implies genuine understanding (TA-1, TA-2) and identify
whether the task described falls into a genuinely difficult category requiring real-world knowledge
(TA-3) — the full synthesis task.

## Component 5 — Worked Examples

**WE-1 (Scaffolded):** Example: a computational system produces a grammatically flawless paragraph
that includes a subtle factual inconsistency (a claimed statistic that doesn't match a stated
source). Fully worked: fluency and accuracy evaluated separately, with the output classified as fluent
but not necessarily accurate; this is explained as evidence of pattern-matching that produces
plausible-sounding text without independent fact verification, not genuine understanding. A second
example — the classic ambiguous "trophy/suitcase" sentence — is analyzed, identifying that resolving
the pronoun reference requires real-world size-relationship knowledge beyond pure grammatical pattern.
Annotation confirms both the fluency/accuracy separation (fixing MC-A) and the genuine-limitation
identification (fixing MC-B).

**WE-2 (Guided):** New computational output example with a subtle inconsistency, and a new ambiguous
sentence requiring real-world knowledge. Student is prompted with guiding questions ("Is this output
fluent? Is it necessarily accurate — how would you check? Does resolving this sentence's ambiguity
require just grammar, or does it need outside knowledge about how the world typically works?") to
complete the evaluation.

**WE-3 (Independent):** A new computational output example and a new ambiguous sentence, unaided.
Student evaluates fluency versus accuracy and identifies whether the ambiguity requires real-world
knowledge to resolve.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Distinguishing Fluency from Understanding**
Given a fluent computational output example, explain why its grammatical fluency does not guarantee
genuine understanding or verified accuracy.

**MP-2 [P36] — Separating Fluency and Accuracy**
Given three outputs varying independently in fluency and accuracy, classify each along both
dimensions separately.

**MP-3 [P36] — Identifying Real-World-Knowledge Ambiguities**
Given three sentences, identify which require real-world or common-sense knowledge (not just
grammatical pattern) to resolve an ambiguity.

**MP-4 [P36] — Explaining Why Pattern-Matching Struggles with Certain Tasks**
Given an identified real-world-knowledge ambiguity, explain specifically why grammatical pattern
alone is insufficient to resolve it.

**MP-5 [P36] — Full Computational Language Evaluation**
Given a new scenario describing a computational language system's output and a task it performs,
evaluate whether fluency implies understanding and identify whether the task requires real-world
knowledge beyond pattern-matching.

## Component 7 — Session Architecture

```
[Entry] --> [PD-1: corpus linguistics check] --> [PD-2: syntax theory check]
   |                                                      |
   | (gap found)                                          | (pass)
   v                                                       v
[Route to prerequisite concept]           [Component 3: Tribute-Band-Musician / Skilled-Cook
                                            Anchor]
                                                           |
                                                           v
                                       [TA-1] -> [TA-2] -> [TA-3] -> [TA-4]
                                                           |
                                                           v
                                 [WE-1 Scaffolded] -> [WE-2 Guided] -> [WE-3 Independent]
                                                           |
                                                           v
                                 [MP-1 through MP-5 mastery probe set]
                                                           |
                                 (pass >= 0.70) -----+----- (fail)
                                        |                      |
                                        v                      v
                [No further unlocks —  [S6 remediation: fluency-vs-accuracy-sort /
                 terminal in current      real-world-knowledge-test drills]
                 curriculum sequence]
```

**Protocol routing paragraph:** On entry (S0), run PD-1 and PD-2; a gap in either prerequisite routes
back before Component 3. During Component 4 (S1, active instruction), MC-A typically surfaces during
TA-1/TA-2 (equating fluency with understanding) and MC-B during TA-3 (assuming uniform computational
competence) — these are largely independent and often need separate, explicit correction. If either
fires, branch to the relevant s6_path drill before resuming. At the mastery probe stage (S9), route by
failure: MP-1/MP-2 failures indicate residual MC-A; MP-3/MP-4 failures indicate residual MC-B; MP-5
failure with MP-1 through MP-4 passing indicates an integration gap — provide one more guided full-
evaluation example before re-probing.

## Component 8 — Adaptive Flags

- If the student has direct personal experience using AI language tools (chatbots, writing
  assistants), connect this concept explicitly to that experience — asking them to recall a time a
  tool produced fluent but factually questionable output can ground the abstract distinction
  concretely.
- If the student overcorrects into dismissing computational language tools as entirely unreliable or
  "fake understanding" across the board, recalibrate: pattern-matching from vast data is a genuinely
  powerful and useful capability for many tasks — the point is knowing WHICH tasks it handles well
  versus which remain genuinely difficult, not blanket dismissal.
- If the student's real-world-knowledge-ambiguity identification (MP-3) is inconsistent, provide
  additional contrasting pairs (one resolvable by grammar alone, one requiring real-world knowledge)
  until the distinction becomes reliable.
- Students with strong interest in technology or computer science may want to explore further how
  these systems are actually trained (on large corpora, connecting explicitly to
  `eng.linguistics.corpus-linguistics-intro`) — encourage this connection as a natural extension of
  interest, though further technical depth is beyond this concept's scope.

## Component 9 — Validation Checklist

| ID | Check | Result |
|----|-------|--------|
| V-1 | Concept Identity frontmatter complete and well-formed | PASS |
| V-2 | Exactly 2 misconceptions registered, each with full 5-part structure | PASS |
| V-3 | Every misconception uses a full descriptive ID, no bare numeric shorthand anywhere in document | PASS |
| V-4 | Prerequisite Diagnostic Block covers all listed prerequisites | PASS |
| V-5 | Concrete Anchor explicitly seeds fixes for both registered misconceptions | PASS |
| V-6 | Conceptual Development Sequence has TA-1 through TA-4 (3-hour concept) | PASS |
| V-7 | Each TA includes explicit student practice, not instruction-only | PASS |
| V-8 | Three Worked Examples present (Scaffolded, Guided, Independent) with increasing student responsibility | PASS |
| V-9 | Worked Examples use consistent evaluate-classify-identify structure | PASS |
| V-10 | Mastery Probe Set contains exactly 5 MP entries | PASS |
| V-11 | Each mastery probe uses the required bold-header paragraph format (`**MP-N [P36] — Title**`) | PASS |
| V-12 | Mastery probes collectively assess both misconceptions and full transfer | PASS |
| V-13 | Session Architecture diagram accurately reflects all routing paths described in prose | PASS |
| V-14 | Protocol routing paragraph addresses S0 (entry), S1 (active instruction), and S9 (evaluation) states | PASS |
| V-15 | Adaptive Flags section contains at least 4 distinct, actionable flags | PASS |
| V-16 | No references to Educational Brain, Teaching Engine, or runtime code — blueprint content only | PASS |
| V-17 | Cross-links and prerequisites match the Knowledge Graph node exactly | PASS |
| V-18 | Difficulty, bloom level, and estimated hours match the Knowledge Graph node exactly | PASS |
| V-19 | Mastery threshold matches the Knowledge Graph node exactly (0.70) | PASS |
| V-20 | Document compiles deterministically (identical hash on repeat `--check` run) | PASS |
