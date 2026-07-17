# Teaching Blueprint: Introduction to Morphology

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.linguistics.morphology-intro
name: Introduction to Morphology
domain: linguistics
difficulty:
  label: advanced
  numeric: 5
bloom: understand
prerequisites:
  - eng.linguistics.what-is-linguistics
  - eng.vocab.word-formation-processes
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 5
cpa_entry_stage: abstract
status: active
```

**Concept:** Introduction to Morphology — the study of word-internal structure, and the morpheme
(the smallest unit that carries meaning or grammatical function) as the fundamental unit of analysis,
distinct from the word itself or the syllable.

**Why this concept exists in the sequence:** What Is Linguistics? (prerequisite) establishes
linguistics's distinct subfields. Word Formation Processes (prerequisite) teaches informal recognition
of how words are built (compounding, affixation, blending). Introduction to Morphology teaches the
formal, systematic linguistic framework underlying that informal recognition: the morpheme as the
true minimal unit of meaning, distinguishing free morphemes (that can stand alone as words) from
bound morphemes (that must attach to something else), and distinguishing morphemes from syllables,
which are a purely phonological unit with no necessary connection to meaning. This concept unlocks
`eng.linguistics.syntax-theory-intro` (the systematic study of how words combine into sentences
builds on first understanding the internal structure of the words themselves).

## Learning Objective

By the end of this concept, the student can (a) break a word down into its constituent morphemes and
identify each as free or bound, (b) explain that a morpheme is defined by carrying meaning or
grammatical function, NOT by being a syllable, and correctly distinguish cases where morpheme
boundaries and syllable boundaries do not align, and (c) distinguish derivational morphemes (which
can change a word's part of speech or core meaning) from inflectional morphemes (which mark
grammatical information like tense or number without changing the word's core category).

## Component 1 — Misconception Register

### MC-A-A-MORPHEME-IS-THE-SAME-THING-AS-A-SYLLABLE

**Trigger signal:** Student assumes morphemes and syllables are the same kind of unit, breaking words
into syllables when asked to identify morphemes, or assuming every syllable must carry independent
meaning — e.g., breaking "banana" into three syllables and assuming each syllable must be a separate
morpheme, when in fact "banana" is a single morpheme (it cannot be broken into smaller meaningful
parts) despite having three syllables.

**Conflict evidence [P28]:** Show the student the word "banana" (three syllables, but ONE morpheme —
none of "ba," "na," or "na" carries independent meaning) alongside the word "cats" (one syllable, but
TWO morphemes — "cat" + the plural "-s," each carrying distinct meaning/function). Ask: "Does syllable
count match morpheme count in either of these words? What does this tell you about whether syllables
and morphemes are the same kind of unit?"

**Bridge text [P30]:** "A syllable is a unit of PRONUNCIATION (built around a vowel sound); a
morpheme is a unit of MEANING or grammatical function. These are like measuring a cake by 'number of
bites' versus 'number of distinct ingredients' — the two counts often don't match, because they're
measuring genuinely different things. 'Banana' takes three bites (syllables) but has one ingredient
(morpheme, since no smaller piece carries separable meaning); 'cats' takes one bite but has two
ingredients (the animal, and the plural marker)."

**Replacement text [P31]:** "Never assume a word's syllable count tells you its morpheme count. To
find morphemes, ask: can I break this word into smaller pieces that EACH carry their own meaning or
grammatical function? Count meaningful pieces, not spoken syllables."

**Discrimination pairs [P33]:**
1. "Banana" (three syllables, one morpheme — no smaller piece carries independent meaning) vs.
   "Cats" (one syllable, two morphemes — "cat" the animal, "-s" the plural marker).
2. A student assuming "elephant" (three syllables) must have three morphemes just because it has
   three syllables (misconception) vs. a student correctly identifying "elephant" as one single
   morpheme despite its syllable count, because no smaller piece of it carries independent meaning
   (correct understanding).

**s6_path:** If the student continues conflating syllables and morphemes after the bridge, have them
apply the "can I remove this piece and does removing it still make sense as changing the meaning in a
predictable way?" test directly to five words with mismatched syllable/morpheme counts, forcing the
meaning-based test rather than a syllable count.

### MC-B-ADDING-ANY-ENDING-TO-A-WORD-HAS-THE-SAME-KIND-OF-EFFECT-DERIVATIONAL-AND-INFLECTIONAL-ARE-THE-SAME

**Trigger signal:** Student treats all word-ending additions (suffixes) as functionally the same kind
of change, failing to distinguish derivational morphemes (which can change a word's part of speech or
create a new, related word — e.g., "-ness" turning the adjective "happy" into the noun "happiness")
from inflectional morphemes (which mark grammatical information like tense, number, or possession
without changing the word's core category — e.g., "-s" marking plural on "cats," still a noun).

**Conflict evidence [P28]:** Show the student two suffixed words: "happiness" (from "happy," an
adjective, now a noun — the suffix changed the PART OF SPEECH and created what feels like a related
but distinct word) and "walked" (from "walk," a verb, still a verb — the suffix only marks past TENSE,
the core word and its category are unchanged). Ask: "Does the suffix do the SAME kind of job in both
words, or something different?"

**Bridge text [P30]:** "Treating all suffixes as the same is like assuming renovating a house (adding
a new room, changing its fundamental function) and simply changing its house number (updating
information about it without changing the house itself) are the same kind of change — but one
transforms the building into something functionally new, while the other just adds grammatical
information. Derivational morphemes ('-ness') are renovations — they can create a new kind of word.
Inflectional morphemes ('-s' for plural, '-ed' for past tense) are more like the house number update —
they add grammatical information without changing the word's fundamental category."

**Replacement text [P31]:** "When you see a suffix, ask: does this CHANGE THE WORD'S PART OF SPEECH
or create what feels like a related-but-different word (derivational — like '-ness,' '-ly,' '-able')?
Or does it just mark grammatical information like tense, number, or possession while the word stays
the same basic type (inflectional — like '-s,' '-ed,' '-ing')? These are functionally different kinds
of morphemes."

**Discrimination pairs [P33]:**
1. "Happy" (adjective) + "-ness" = "happiness" (noun — the part of speech changed, a derivational
   morpheme) vs. "Walk" (verb) + "-ed" = "walked" (still a verb, just marking past tense — an
   inflectional morpheme).
2. A student treating "-ness" and "-s" (plural) as doing the same kind of job because both are
   suffixes (misconception) vs. a student correctly distinguishing that "-ness" changes the word's
   category while "-s" (plural) only adds grammatical information to an unchanged category (correct
   understanding).

**s6_path:** If the student continues to conflate the two suffix types after the bridge, have them
sort eight suffixed words into two columns — "part of speech changed" and "part of speech unchanged,
grammatical information added" — applying the direct test to each before any further discussion.

## Component 2 — Prerequisite Diagnostic Block

**PD-1 (checks `eng.linguistics.what-is-linguistics`):** "Is studying how words are built inside a
descriptive or a prescriptive activity?" A student who cannot answer correctly lacks the framing this
concept assumes — route to `eng.linguistics.what-is-linguistics` review first.

**PD-2 (checks `eng.vocab.word-formation-processes`):** "Identify the process used to form the word
'smog' (from 'smoke' and 'fog')." (blending) A student who cannot identify basic word-formation
processes lacks the foundation this concept formalizes — route to `eng.vocab.word-formation-
processes` review before Component 3.

## Component 3 — Concrete Anchor [P06]

**The Cake-Bites-and-Ingredients / House-Renovation-and-House-Number Anchor.** Combine two physical
demonstrations: first, a cake cut into a certain number of bite-sized pieces (syllables) alongside a
list of its distinct ingredients (morphemes) — showing the two counts don't have to match, directly
seeding the fix for MC-A. Second, a house being renovated with a new room added (fundamentally
changing its function) alongside the same house simply getting an updated house number (adding
information without changing its fundamental nature) — directly seeding the fix for MC-B, since
derivational and inflectional morphemes do genuinely different kinds of work.

## Component 4 — Conceptual Development Sequence

### TA-1 — The Morpheme as a Unit of Meaning, Not Sound (MC-A)

Using the cake anchor, teach the core distinction between syllables (pronunciation units) and
morphemes (meaning/function units). Student practice: given six words, count both syllables and
morphemes for each and identify where the counts diverge.

### TA-2 — Free vs. Bound Morphemes

Teach the distinction between free morphemes (can stand alone as a word, like "cat") and bound
morphemes (must attach to something else, like "-s" or "un-"). Student practice: given eight
morphemes extracted from words, classify each as free or bound.

### TA-3 — Derivational Morphemes

Teach derivational morphemes as those that can change a word's part of speech or create a new,
related word. Student practice: given five base words with a derivational suffix added, identify the
part-of-speech change (if any) and confirm the morpheme is derivational.

### TA-4 — Inflectional Morphemes (MC-B)

Using the house-renovation anchor, teach inflectional morphemes as those marking grammatical
information (tense, number, possession, comparison) without changing the word's core category.
Student practice: given five base words with an inflectional suffix added, confirm the part of speech
is unchanged and identify the specific grammatical information marked.

### TA-5 — Full Morphological Analysis

Give the student five new words with multiple morphemes each (e.g., "unhappiness," "reworked"). They
must break each into its constituent morphemes (TA-1), classify each as free or bound (TA-2), and
classify each affix as derivational or inflectional (TA-3, TA-4) — the full synthesis task.

## Component 5 — Worked Examples

**WE-1 (Scaffolded):** Word: "unhappiness." Fully worked: broken into morphemes "un-" + "happy" +
"-ness"; "happy" identified as free (can stand alone), "un-" and "-ness" identified as bound (cannot
stand alone); "un-" identified as derivational (changes meaning to the opposite, though keeps the
adjective category in this case — "unhappy" is still an adjective); "-ness" identified as
derivational (changes the adjective "unhappy" into the noun "unhappiness" — a part-of-speech
change). Annotation confirms the meaning-based morpheme count differs from the syllable count
(fixing MC-A) and correctly classifies each affix's functional type (fixing MC-B).

**WE-2 (Guided):** New word: "reworked." Student is prompted with guiding questions ("Break this into
its smallest meaningful pieces — how many morphemes, and does that match the syllable count? Which
pieces can stand alone as words, and which can't? Does '-ed' change the word's part of speech, or
just add grammatical information? What about 're-'?") to complete the full morphological breakdown.

**WE-3 (Independent):** A new multi-morpheme word, unaided. Student breaks it into morphemes,
classifies each as free or bound, and classifies each affix as derivational or inflectional.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Syllable vs. Morpheme Count**
Given three words, count both syllables and morphemes for each, identifying any words where the
counts diverge and explaining why.

**MP-2 [P36] — Free vs. Bound Classification**
Given six morphemes extracted from words, classify each as free or bound.

**MP-3 [P36] — Identifying Derivational Morphemes**
Given three words with a derivational suffix, identify the part-of-speech change (if any) and
confirm the morpheme is derivational.

**MP-4 [P36] — Identifying Inflectional Morphemes**
Given three words with an inflectional suffix, confirm the part of speech is unchanged and identify
the specific grammatical information marked.

**MP-5 [P36] — Full Morphological Breakdown**
Given a new multi-morpheme word, break it into its constituent morphemes, classify each as free or
bound, and classify each affix as derivational or inflectional.

## Component 7 — Session Architecture

```
[Entry] --> [PD-1: what-is-linguistics check] --> [PD-2: word-formation-processes check]
   |                                                        |
   | (gap found)                                            | (pass)
   v                                                         v
[Route to prerequisite concept]              [Component 3: Cake-Bites / House-Renovation Anchor]
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
                    [Unlock: syntax-theory-intro]  [S6 remediation: meaning-test / sort-by-
                                                     function drills]
```

**Protocol routing paragraph:** On entry (S0), run PD-1 and PD-2; a gap in either prerequisite routes
back before Component 3. During Component 4 (S1, active instruction), MC-A typically surfaces during
TA-1 (before the syllable/morpheme distinction is settled) and MC-B during TA-4 (once both affix types
have been introduced and need distinguishing) — MC-A generally needs resolving before TA-2 onward can
proceed cleanly, since the whole morpheme-identification process depends on it. If either fires,
branch to the relevant s6_path drill before resuming. At the mastery probe stage (S9), route by
failure: MP-1 failure indicates residual MC-A; MP-2 failure alone indicates the free/bound
distinction (TA-2) needs review, distinct from either misconception; MP-3 failure alone indicates the
derivational-identification step (TA-3) specifically; MP-4 failure alone indicates residual MC-B;
MP-5 failure with MP-1 through MP-4 passing indicates an integration gap at full-word-analysis scale
— provide one more guided breakdown example before re-probing.

## Component 8 — Adaptive Flags

- If the student masters isolated free/bound and derivational/inflectional classification (MP-2
  through MP-4) but struggles to apply all steps together on a genuinely new word (MP-5), provide a
  structured checklist (break into morphemes, classify free/bound, classify each affix's function) as
  scaffolding before removing it.
- If the student's morpheme-breakdown attempts consistently default back to syllable counting under
  time pressure (a regression to MC-A even after apparent mastery), this suggests the meaning-based
  test needs more automatic, overlearned practice — provide additional quick-fire practice pairs with
  immediate feedback.
- If the student is multilingual and their other language(s) have richer inflectional systems than
  English (e.g., grammatical gender marking, more extensive case marking), leverage this as a
  powerful comparative example for TA-4, since English's relatively sparse inflectional morphology can
  make the category feel underdeveloped without cross-linguistic grounding.
- Students who struggled with `eng.vocab.word-formation-processes`'s informal recognition should be
  monitored closely here, since this concept requires the same recognition skill formalized under
  more precise terminology — if the informal skill was shaky, expect more repetition needed at TA-1.

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
| V-9 | Worked Examples use consistent break-classify-classify structure | PASS |
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
