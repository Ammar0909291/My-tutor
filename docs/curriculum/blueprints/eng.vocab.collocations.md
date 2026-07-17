# Teaching Blueprint: Collocations

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.vocab.collocations
name: Collocations
domain: english/vocabulary
difficulty:
  label: proficient
  numeric: 3
bloom: apply
prerequisites:
  - eng.vocab.connotation-denotation
mastery_threshold: 0.75
estimated_hours: 2
cross_links:
  - eng.vocab.idioms
  - eng.vocab.phrasal-verbs
  - eng.linguistics.corpus-linguistics-intro
session_cap: 5
cpa_entry_stage: concrete/visual
status: draft
```

## Component 1 — Misconception Register

### MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE
- **Trigger signal:** Student substitutes any dictionary synonym into a fixed collocation and assumes the result is equally correct, since the substituted word means roughly the same thing (e.g., saying "do a decision" instead of "make a decision," or "strong tea" replaced with "powerful tea," reasoning that "powerful" and "strong" are synonyms so the swap should work fine).
- **Conflict evidence [P28]:** Present "make a decision" / "do a decision" and ask a native-speaker-intuition question: which one do English speakers actually say? Confirm "make" is correct even though "do" is a perfectly good verb and even shares some meaning overlap with "make" in other contexts (e.g., "do a favor" — where "do" IS correct, showing the pattern isn't about "do" being wrong in general, just wrong with "decision").
- **Bridge text [P30]:** "Synonyms match at the level of dictionary meaning, but collocations are about which specific words HABITUALLY pair together in real usage — a pattern built from how millions of speakers have actually talked, not from logical meaning-matching. 'Make' and 'do' can both mean roughly 'to perform an action,' but English speakers only pair 'make' with 'decision,' not 'do,' for no logical reason other than that's the pattern that stuck."
- **Replacement text [P31]:** "Don't assume a synonym swap works in a collocation just because the meanings are close. Collocations have to be learned as fixed pairings — through reading, listening, and exposure — not derived logically from synonym lists. When in doubt, notice which pairing you've actually heard or read before."
- **Discrimination pairs [P33]:** (a) Synonym-substitution logic (any word with a similar dictionary meaning can replace another in a set phrase) vs. (b) Fixed-pairing convention (collocations are specific word combinations that native usage has settled on, which must be learned as pairs rather than derived from synonym logic).
- **s6_path:** If detected, drop to PD-1 re-check, then re-run TA-1's paired-list exposure task before continuing.

### MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS
- **Trigger signal:** Student conflates collocations (literal, transparent word pairings like "heavy rain" or "make a decision," where the combined meaning is exactly what the individual words suggest) with idioms (non-literal expressions like "it's raining cats and dogs," where the combined meaning cannot be derived from the individual words at all) — treating both as the same category of "weird fixed phrases to memorize."
- **Conflict evidence [P28]:** Present "heavy rain" (collocation: literally means rain that is heavy/intense — the words mean exactly what they say, just habitually paired) alongside "it's raining cats and dogs" (idiom: doesn't literally involve animals falling from the sky at all — the phrase's meaning is entirely non-literal). Ask the student what "heavy rain" literally means versus what "raining cats and dogs" literally means.
- **Bridge text [P30]:** "Both collocations and idioms are 'fixed' word combinations, but they work completely differently. A collocation's meaning is fully transparent — you can understand 'heavy rain' by understanding each word normally, it's just that English happens to pair 'heavy' with 'rain' rather than, say, 'strong rain.' An idiom's meaning is hidden — you cannot figure out 'raining cats and dogs' from the individual words at all; you just have to know the whole expression."
- **Replacement text [P31]:** "Ask: can I understand this phrase's meaning just by understanding each word normally? If yes, it's a collocation — a habitual pairing with a transparent, literal meaning. If the combined meaning is a total surprise that the individual words don't predict, it's an idiom instead."
- **Discrimination pairs [P33]:** (a) Collocation-idiom conflation (any memorized fixed phrase counts as the same category) vs. (b) Transparency-based distinction (collocations are literal/transparent habitual pairings; idioms are non-literal expressions whose meaning can't be derived from their individual words — a meaningfully different linguistic category).
- **s6_path:** If detected, drop to PD-1, then re-present the Concrete Anchor's transparent-vs-locked-box framing before continuing to TA-3.

## Component 2 — Prerequisite Diagnostic Block

### PD-1: Connotation-Denotation Readiness
- **Tests:** Can the student distinguish subtle shading between near-synonyms — the same fine-grained word-choice sensitivity that noticing collocational restrictions (why one near-synonym pairs correctly and another doesn't) depends on?
- **Probe:** Give 2 near-synonym pairs (e.g., "big/large," "fast/quick") and ask the student to identify any subtle difference in typical usage or connotation between them.
- **Pass condition:** Identifies at least one reasonable usage or connotation distinction in one pair.
- **Fail routing:** If the student sees near-synonyms as fully interchangeable with no usage distinctions at all, route to `eng.vocab.connotation-denotation` review — collocational awareness requires the same fine word-choice sensitivity.

## Component 3 — Concrete Anchor [P06]

**"The Puzzle-Piece Pairing Board."** Present a physical or drawn board with word cards on the left (e.g., "make," "do," "take," "have") and outcome cards on the right ("a decision," "a favor," "a photo," "a shower"). Have the student physically connect each left card to its ONE correctly-fitting right card, discovering that "make" only clicks with "a decision," "do" only clicks with "a favor," etc. — even though several left-side words are near-synonyms for "perform an action." Explicitly frame this as a puzzle where piece SHAPES (not piece meanings) determine the fit — meaning alone doesn't predict which pieces connect; you learn the shapes by encountering them, directly seeding MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE's fix. Then introduce a "locked box" card labeled "raining cats and dogs" that cannot be opened/understood by looking at its individual word-pieces at all — contrasted with a "clear box" card labeled "heavy rain" where you CAN see through to the meaning by reading the individual words normally — seeding MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS's fix.

## Component 4 — Conceptual Development Sequence

### TA-1: Verb + Noun Collocation Exposure
Present common verb+noun collocations in groups (make: a decision, a mistake, an effort; do: a favor, homework, damage; take: a photo, a break, a risk; have: a shower, a look, a chat) and have the student practice matching, noticing that near-synonym verbs don't cross-substitute freely.

### TA-2: Adjective + Noun Collocations
Extend to adjective+noun pairs (heavy rain/traffic, strong coffee/opinion, deep sleep/thought) and have the student identify why a near-synonym substitution sounds "off" even when technically understandable (e.g., "powerful rain" is understandable but not the conventional pairing).

### TA-3: Collocation vs. Idiom Transparency Test
Using the discrimination pairs from MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS, present pairs of phrases (one collocation, one idiom) and have the student apply the transparency test: can you derive the meaning from the individual words? Sort each phrase into "collocation" or "idiom."

### TA-4: Detecting an "Off" Collocation in Writing
Present short passages containing one unconventional word pairing (e.g., "I did a mistake" instead of "made a mistake") and have the student identify and correct it, explaining why the substituted word doesn't fit even though its dictionary meaning is close.

### TA-5: Building a Personal Collocation Bank
Student selects 5 new words (nouns or verbs) and researches/generates 2-3 correct collocational pairings for each (using provided reference material or context clues from sample sentences), building an original small collocation reference set — the generative capstone that models real vocabulary-learning practice.

## Component 5 — Worked Examples

### WE-1: Verb+Noun Matching (Scaffolded)
**Pairs to match:** make/a decision, do/homework, take/a photo, have/a conversation.
**Walkthrough:** Confirm each verb only correctly pairs with its matched noun phrase, even though "make," "do," "take," and "have" all can loosely mean "to perform" in different contexts — the specific pairing is learned, not derived.

### WE-2: Collocation vs. Idiom Sort (Guided)
**Phrases:** "heavy traffic" (collocation — literally means traffic that is heavy/intense) / "hit the books" (idiom — doesn't literally involve hitting anything; means to study) / "strong coffee" (collocation — literally means coffee that is strong) / "spill the beans" (idiom — doesn't literally involve beans; means to reveal a secret).
**Walkthrough:** Apply the transparency test to each: "heavy traffic" and "strong coffee" pass (meaning derivable from individual words); "hit the books" and "spill the beans" fail (meaning is hidden, non-literal).

### WE-3: Detecting and Correcting an Off Collocation (Independent)
**Passage with error:** "She made a big effort to do her best on the exam, but she still made a mistake and did a bad grade."
**Walkthrough:** Student identifies "did a bad grade" as the unconventional pairing (conventional English says "got a bad grade" or "received a bad grade") and corrects it, while confirming "made a big effort," "do her best," and "made a mistake" are all correct conventional pairings.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Reject an incorrect synonym substitution**
Given a sentence with a synonym incorrectly substituted into a fixed collocation (e.g., "do a decision"), student identifies the error and supplies the correct conventional pairing. *(Directly targets MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE.)*

**MP-2 [P36] — Distinguish collocation from idiom**
Given 4 phrases (2 collocations, 2 idioms), student correctly sorts each using the transparency test and explains the distinguishing criterion. *(Directly targets MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS.)*

**MP-3 [P36] — Verb+noun collocation matching**
Given 4 verbs (make, do, take, have) and 8 noun phrases, student correctly matches each noun phrase to its one correct verb.

**MP-4 [P36] — Detect and correct an off collocation in context**
Given a short passage with one unconventional word pairing, student identifies and corrects it, explaining why the substitution sounds wrong despite being understandable.

**MP-5 [P36] — Build an original collocation set**
Given 3 new nouns, student generates a correct verb or adjective collocation for each, using provided context sentences to verify the pairing.

## Component 7 — Session Architecture

```
[PD-1: Connotation-Denotation Check]
        |
        v
[Concrete Anchor: The Puzzle-Piece Pairing Board]
        |
        v
[TA-1: Verb + Noun Collocation Exposure]
        |
        v
[TA-2: Adjective + Noun Collocations]
        |
        v
[TA-3: Collocation vs. Idiom Transparency Test]
        |
        v
[TA-4: Detecting an "Off" Collocation in Writing]
        |
        v
[TA-5: Building a Personal Collocation Bank]
        |
        v
[WE-1] --> [WE-2] --> [WE-3]
        |
        v
[MP-1 through MP-5]
```

**Protocol routing paragraph:** At session open (S0), confirm PD-1 passes — collocational judgment is a specific application of the same fine-grained word-choice sensitivity built in connotation-denotation work, now applied to which words habitually co-occur rather than which carry which emotional shading. During instruction (S1), watch for both misconception patterns: synonym-substitution logic (MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE) and collocation-idiom conflation (MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS) both stem from treating fixed phrases as governed by meaning-logic rather than usage convention — redirect both to the Puzzle-Piece Pairing Board's shape-not-meaning framing. If the student defaults to synonym logic during TA-1/TA-2 (S6), drop back to the Concrete Anchor and re-run with a very small, clear pairing set before returning to broader practice. At mastery-probe stage (S9), do not certify mastery unless MP-1 and MP-2 both pass — a student who matches known collocations correctly (MP-3) but still substitutes synonyms freely or confuses collocations with idioms has not yet internalized the usage-convention principle this concept is built on.

## Component 8 — Adaptive Flags

- If the student substitutes synonyms into fixed pairings, weight remediation toward MC-IF-A-SYNONYM-FITS-THE-DEFINITION-IT-FITS-THE-PHRASE's bridge text and re-run TA-1's verb+noun exposure practice with a narrower, more repetitive pairing set.
- If the student conflates collocations with idioms, weight remediation toward MC-COLLOCATIONS-ARE-JUST-A-FANCY-NAME-FOR-IDIOMS's bridge text and TA-3's transparency-test practice specifically.
- This concept feeds two direct downstream unlocks (`eng.vocab.idioms`, `eng.vocab.phrasal-verbs`) plus a cross-link to `eng.linguistics.corpus-linguistics-intro` — do not certify mastery without TA-3's collocation/idiom distinction, since `eng.vocab.idioms` depends on the student already understanding what makes a phrase NON-collocational (i.e., non-transparent) in the first place.
- Reuse the "puzzle-piece, not meaning-match" framing explicitly when introducing `eng.vocab.phrasal-verbs` — phrasal verb particles ("give up," "look into") are collocational pairings of a similar fixed, usage-based, non-logically-derivable kind.

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
| V-10 | Counterexample present where appropriate (idiom contrast; off-collocation) | PASS |
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
