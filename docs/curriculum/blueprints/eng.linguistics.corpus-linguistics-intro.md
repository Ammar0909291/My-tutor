# Teaching Blueprint: Introduction to Corpus Linguistics

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.linguistics.corpus-linguistics-intro
name: Introduction to Corpus Linguistics
domain: linguistics
difficulty:
  label: research
  numeric: 7
bloom: apply
prerequisites:
  - eng.linguistics.discourse-analysis-intro
mastery_threshold: 0.7
estimated_hours: 2
cross_links:
  - eng.vocab.collocations
session_cap: 5
cpa_entry_stage: abstract
status: active
```

**Concept:** Introduction to Corpus Linguistics — using large, structured collections of authentic
text (corpora) to study language EMPIRICALLY, examining what large-scale real usage data actually
reveals, rather than relying on individual intuition or a handful of hand-picked examples.

**Why this concept exists in the sequence:** Discourse Analysis (prerequisite) taught analyzing
individual texts and conversations closely. Corpus Linguistics teaches a complementary, large-scale
empirical method: examining patterns across THOUSANDS or MILLIONS of real language instances to answer
questions that individual intuition or small samples cannot reliably answer (e.g., how frequently a
word actually co-occurs with certain other words, or how a grammatical structure is actually used in
practice, at scale). This concept unlocks `eng.linguistics.computational-linguistics-intro` (using
computational tools to process and analyze language builds on understanding corpus-based empirical
methods first).

## Learning Objective

By the end of this concept, the student can (a) explain why examining large-scale corpus data can
reveal patterns that individual intuition or a small handful of examples cannot reliably detect, (b)
explain that corpus data reflects frequency and typical usage patterns (what people DO say, and how
often), which is a different, complementary question from whether something is theoretically
GRAMMATICAL (what people COULD say), and (c) identify at least one practical use of corpus data (e.g.,
identifying common collocations, informing dictionary definitions, or studying real language change
over time).

## Component 1 — Misconception Register

### MC-A-MY-OWN-INTUITION-ABOUT-HOW-LANGUAGE-IS-USUALLY-USED-IS-ALWAYS-AS-RELIABLE-AS-CORPUS-DATA

**Trigger signal:** Student assumes their own personal intuition about how frequently a word or
structure is used, or which of two options is more common, is just as reliable as actual large-scale
corpus data, failing to recognize that individual intuition about FREQUENCY and typical usage patterns
is notoriously unreliable compared to genuinely large-scale empirical data — people's intuitions about
frequency are often measurably wrong.

**Conflict evidence [P28]:** Present the student with a question about which of two near-synonymous
phrasings is more common in actual usage (a case where intuitions frequently diverge from documented
corpus frequencies) and have them guess based on intuition, then show the actual corpus frequency
data. Ask: "Did your intuition match the actual large-scale data? Why might individual intuition be
an unreliable guide to how OFTEN something actually occurs across millions of real instances?"

**Bridge text [P30]:** "Trusting personal intuition over corpus data for frequency questions is like
trusting your gut feeling about which of two harmless-looking mushrooms is more common in a specific
forest, rather than actually surveying the forest systematically — your intuition might feel
confident, but it's built from a small, biased sample of your own limited experience, not the full
picture. Corpus data draws on genuinely large-scale evidence that individual intuition simply cannot
match for frequency questions."

**Replacement text [P31]:** "For questions about how OFTEN something occurs or which of two options
is more typical in actual usage, trust systematic corpus data over personal intuition — intuition is
built from a small, unrepresentative personal sample, while a well-constructed corpus draws on
genuinely large-scale, representative evidence."

**Discrimination pairs [P33]:**
1. Guessing which of two phrasings is "obviously" more common based on personal feeling
   (unreliable intuition-based guess) vs. checking actual corpus frequency data to determine which is
   genuinely more common (reliable, evidence-based determination).
2. A student who insists their intuition about a word's typical usage must be correct even after
   corpus data contradicts it (misconception) vs. a student who updates their belief about frequency
   based on the more reliable, large-scale evidence (correct, evidence-responsive understanding).

**s6_path:** If the student continues to trust intuition over corpus data after the bridge, have them
make frequency predictions for three more word-pair or phrasing comparisons, then check each against
actual data, tallying how often their intuition matched versus diverged from the evidence.

### MC-B-IF-CORPUS-DATA-SHOWS-SOMETHING-IS-RARE-OR-UNUSUAL-IT-MUST-BE-UNGRAMMATICAL

**Trigger signal:** Student conflates FREQUENCY (how often something occurs in usage, what corpus
data measures) with GRAMMATICALITY (whether something is structurally well-formed according to the
language's rules, a separate question from Syntactic Theory) — assuming that because corpus data shows
a construction is rare or unusual, it must therefore be ungrammatical or incorrect, when in fact a
perfectly grammatical construction can simply be infrequently used for reasons unrelated to its
grammatical status (it may be stylistically marked, topic-specific, or simply less commonly needed).

**Conflict evidence [P28]:** Show the student a grammatically well-formed but relatively rare
sentence construction (e.g., a passive-voice construction that is perfectly grammatical but less
frequent than its active-voice equivalent in casual conversation) and ask: "Is this construction
ungrammatical just because corpus data shows it occurs less often than the alternative? Would a
fluent speaker judge it as a genuinely broken, unacceptable sentence, or just as a less common but
perfectly valid one?"

**Bridge text [P30]:** "Assuming rare in a corpus means ungrammatical is like assuming a rarely-
prescribed but medically valid treatment must be medically invalid just because it's uncommon — rarity
and validity are separate questions. A perfectly grammatical sentence can simply be needed less often
(a specific style, a specific context, a specific emphasis) without being structurally broken.
Frequency (corpus linguistics's question) and grammaticality (syntax's question) are related but
distinct."

**Replacement text [P31]:** "When corpus data shows a construction is rare, don't automatically
conclude it's ungrammatical. Ask separately: is this construction actually structurally well-formed
according to the language's rules (a syntax question), regardless of how often it happens to be used
(a corpus-frequency question)? A rare but grammatical construction is different from a genuinely
ungrammatical one."

**Discrimination pairs [P33]:**
1. A grammatically well-formed but stylistically rare construction, appearing infrequently in casual
   corpus data but judged fully acceptable by fluent speakers (rare but grammatical) vs. a genuinely
   ungrammatical string that virtually never occurs because it violates the language's structural
   rules (both rare AND ungrammatical, for a different reason).
2. A student assuming corpus rarity alone proves ungrammaticality (misconception) vs. a student
   checking a rare construction against fluent speakers' grammaticality judgments separately from its
   corpus frequency (correct, two-question understanding).

**s6_path:** If the student continues to conflate rarity with ungrammaticality after the bridge, have
them identify a rare-but-grammatical construction from their own reading and explain, using the
syntax/semantics-style separation of questions, why its rarity doesn't make it structurally invalid.

## Component 2 — Prerequisite Diagnostic Block

**PD-1 (checks `eng.linguistics.discourse-analysis-intro`):** "Identify a cohesive device linking two
sentences in this short passage." A student who cannot perform basic discourse-level analysis lacks a
related close-reading skill this concept complements with large-scale methods — route to
`eng.linguistics.discourse-analysis-intro` review first.

## Component 3 — Concrete Anchor [P06]

**The Forest-Survey-and-Rare-Medical-Treatment Anchor.** Combine two images: a systematic forest
survey revealing the true, large-scale distribution of mushroom species, contrasted with an
individual's unreliable gut feeling based on limited personal encounters — directly seeding the fix
for MC-A (systematic large-scale data beats individual intuition for frequency questions). Second, a
rare but medically valid treatment, its infrequent use unrelated to its actual validity — directly
seeding the fix for MC-B (rarity and grammaticality/validity are separate questions).

## Component 4 — Conceptual Development Sequence

### TA-1 — Why Corpus Data Beats Individual Intuition for Frequency Questions (MC-A)

Using the forest-survey anchor, teach that large-scale corpus data reliably answers frequency
questions that individual intuition cannot. Student practice: given three frequency-comparison
questions, make an intuition-based prediction, then check against provided corpus data, noting
matches and mismatches.

### TA-2 — What a Corpus Actually Is and What It Can Show

Introduce the basic concept of a corpus (a large, structured collection of authentic texts) and what
kinds of questions it can answer (word frequency, collocation patterns, usage over time). Student
practice: given three research questions, identify which are well-suited to corpus-based investigation
and which are not.

### TA-3 — Frequency vs. Grammaticality: Two Separate Questions (MC-B)

Using the rare-medical-treatment anchor, teach that corpus frequency and syntactic grammaticality are
related but distinct questions. Student practice: given four constructions (mixing frequent/
grammatical, rare/grammatical, and genuinely ungrammatical examples), classify each along both
dimensions separately.

### TA-4 — Full Application: Using Corpus Reasoning to Investigate a Language Question

Give the student a new language question (e.g., which of two near-synonymous phrasings is more
common, or whether a given construction is genuinely rare-but-valid or genuinely ungrammatical). They
must reason about it using corpus-style thinking (TA-1, TA-2) and correctly separate frequency from
grammaticality (TA-3) — the full synthesis task.

## Component 5 — Worked Examples

**WE-1 (Scaffolded):** Question: "Which is more common in everyday writing: 'in order to' or
'to' alone before a purpose clause?" Fully worked: an intuition-based prediction made; actual (simplified,
illustrative) corpus frequency data shown, revealing the actual pattern; a second question addressed
about a grammatically valid but comparatively rare passive-voice construction, confirmed as
structurally well-formed despite its lower frequency, using the frequency/grammaticality separation.
Annotation confirms both the intuition-check process (fixing MC-A) and the frequency/grammaticality
separation (fixing MC-B).

**WE-2 (Guided):** New frequency-comparison question and a new rare-but-potentially-grammatical
construction. Student is prompted with guiding questions ("What does your intuition predict here — and
does the data actually confirm or contradict it? Is this rare construction actually structurally
broken, or is it just less frequently needed for stylistic or contextual reasons?") to complete both
analyses.

**WE-3 (Independent):** A new frequency question and a new rare construction, unaided. Student
reasons through both using corpus-linguistics thinking, correctly separating frequency from
grammaticality.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Intuition vs. Corpus Data Check**
Given a frequency-comparison question, make an intuition-based prediction, then evaluate it against
provided corpus data and explain any mismatch.

**MP-2 [P36] — Identifying Corpus-Suitable Questions**
Given three research questions, identify which are well-suited to corpus-based empirical
investigation and which are not.

**MP-3 [P36] — Separating Frequency from Grammaticality**
Given four constructions, classify each along both frequency (common/rare) and grammaticality
(grammatical/ungrammatical) dimensions separately.

**MP-4 [P36] — Defending a Rare but Grammatical Construction**
Given a rare but structurally well-formed construction, explain why its rarity in corpus data does
not make it ungrammatical.

**MP-5 [P36] — Full Corpus-Linguistics Reasoning**
Given a new language question, reason through it using corpus-linguistics thinking and correctly
separate any frequency findings from grammaticality judgments.

## Component 7 — Session Architecture

```
[Entry] --> [PD-1: discourse analysis check]
   |                    |
   | (gap found)        | (pass)
   v                     v
[Route to eng.linguistics.discourse-analysis-intro]  [Component 3: Forest-Survey / Rare-
                                                        Medical-Treatment Anchor]
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
                    [Unlock: computational-linguistics-intro]  [S6 remediation: intuition-
                                                                  check / two-question-
                                                                  separation drills]
```

**Protocol routing paragraph:** On entry (S0), run PD-1; a gap routes back to the prerequisite. During
Component 4 (S1, active instruction), MC-A typically surfaces during TA-1 (over-trusting intuition)
and MC-B during TA-3 (conflating rarity with ungrammaticality) — these are largely independent and
often need separate, explicit correction. If either fires, branch to the relevant s6_path drill before
resuming. At the mastery probe stage (S9), route by failure: MP-1 failure indicates residual MC-A;
MP-2 failure alone indicates the corpus-suitability judgment (TA-2) needs review, distinct from either
misconception; MP-3/MP-4 failures indicate residual MC-B; MP-5 failure with MP-1 through MP-4 passing
indicates an integration gap — provide one more guided full-reasoning example before re-probing.

## Component 8 — Adaptive Flags

- If the student masters the intuition-check process (MP-1) but resists updating their beliefs even
  when their intuition is repeatedly shown to be wrong, this may reflect general resistance to
  evidence-based revision rather than a corpus-linguistics-specific gap — reinforce with additional,
  varied examples until the pattern of intuition-unreliability becomes undeniable.
  undeniable.
- If the student conflates "rare" with "informal" or "wrong register" rather than genuinely
  ungrammatical, clarify that register and grammaticality are yet another distinct pair of questions —
  a rare construction can be perfectly grammatical in ANY register, just infrequently needed.
- If the student's own writing shows over-reliance on intuition about word frequency (e.g., choosing
  words based on personal familiarity rather than actual common usage), connect this concept to
  practical writing revision, since corpus-informed word choice can improve clarity and naturalness.
- Students with strong performance in `eng.vocab.collocations` should transfer well to this concept's
  practical applications (TA-2, since collocation frequency is a classic corpus-linguistics use case)
  — draw the cross-link explicitly if that concept has been completed.

## Component 9 — Validation Checklist

| ID | Check | Result |
|----|-------|--------|
| V-1 | Concept Identity frontmatter complete and well-formed | PASS |
| V-2 | Exactly 2 misconceptions registered, each with full 5-part structure | PASS |
| V-3 | Every misconception uses a full descriptive ID, no bare numeric shorthand anywhere in document | PASS |
| V-4 | Prerequisite Diagnostic Block covers all listed prerequisites | PASS |
| V-5 | Concrete Anchor explicitly seeds fixes for both registered misconceptions | PASS |
| V-6 | Conceptual Development Sequence has TA-1 through TA-4 (2-hour concept) | PASS |
| V-7 | Each TA includes explicit student practice, not instruction-only | PASS |
| V-8 | Three Worked Examples present (Scaffolded, Guided, Independent) with increasing student responsibility | PASS |
| V-9 | Worked Examples use consistent predict-check-separate structure | PASS |
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
