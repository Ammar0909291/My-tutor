# Teaching Blueprint: Introduction to Phonology

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.linguistics.phonology-intro
name: Introduction to Phonology
domain: linguistics
difficulty:
  label: advanced
  numeric: 5
bloom: understand
prerequisites:
  - eng.linguistics.what-is-linguistics
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 5
cpa_entry_stage: abstract
status: active
```

**Concept:** Introduction to Phonology — the study of the ABSTRACT sound SYSTEM of a language (which
sound distinctions matter for meaning, and what patterns govern how sounds combine), distinct from
phonetics, which studies the physical, measurable properties of sounds themselves.

**Why this concept exists in the sequence:** What Is Linguistics? (prerequisite) establishes
linguistics as a descriptive science with distinct subfields. Introduction to Phonology teaches the
first of these in depth: the ABSTRACT, mental sound system a language user has internalized — which
physical sound differences actually change meaning (phonemic) versus which are just automatic
variations of "the same" sound in the speaker's mind (allophonic) — as opposed to phonetics, which
simply measures and describes the physical sounds themselves regardless of which ones matter for
meaning in a given language. This concept unlocks `eng.linguistics.historical-linguistics-intro`
(sound systems change systematically over time, which requires first understanding the system) and
`eng.linguistics.language-acquisition-intro` (children acquiring a language must learn precisely
which sound distinctions matter in their language, a phonological, not merely phonetic, task).

## Learning Objective

By the end of this concept, the student can (a) explain the difference between phonetics (the
physical study of sound production and acoustic properties) and phonology (the abstract study of
which sound distinctions are meaningful within a specific language's system), (b) identify a minimal
pair (two words differing by one sound that changes meaning) to demonstrate that a specific sound
distinction is phonemic in English, and (c) explain that a sound distinction can be meaningful
(phonemic) in one language while being a non-meaningful variant (allophonic) of the same sound in
another language, showing that phonological systems are language-specific, not universal.

## Component 1 — Misconception Register

### MC-A-PHONOLOGY-AND-PHONETICS-ARE-THE-SAME-THING

**Trigger signal:** Student uses "phonetics" and "phonology" interchangeably, failing to distinguish
between studying the physical, measurable properties of speech sounds (phonetics) and studying which
sound distinctions are functionally meaningful within a particular language's abstract system
(phonology) — e.g., describing a phonological question ("does this sound distinction change
meaning in English?") using purely phonetic language ("how is this sound physically produced?").

**Conflict evidence [P28]:** Show the student two genuinely different questions about the same pair
of sounds (the aspirated "p" in "pin" versus the unaspirated "p" in "spin"): a phonetic question
("Exactly how is air released differently when producing each of these two p-sounds?") and a
phonological question ("Do English speakers treat these two p-sounds as the 'same' sound or different
sounds — does swapping one for the other change a word's meaning?"). Ask: "Are these actually asking
the same thing, or two different kinds of questions about the same two sounds?"

**Bridge text [P30]:** "Phonetics and phonology are like the difference between measuring the exact
wavelength of a color of light (a physical property) and asking which colors your language's basic
color-word vocabulary actually treats as 'different colors' versus shades of 'the same' color (a
psychological/systemic question). Phonetics measures the physical sound; phonology asks which sound
differences the SPEAKERS' mental system treats as meaningfully different."

**Replacement text [P31]:** "Before answering a sound-related question, ask: is this asking HOW a
sound is physically produced or perceived (phonetics), or is it asking WHETHER a sound difference
changes meaning within a specific language's system (phonology)? These are related but genuinely
different questions."

**Discrimination pairs [P33]:**
1. "How is the 't' sound in 'top' physically different from the 't' sound in 'stop'?" (a phonetic
   question, about physical production) vs. "Do English speakers treat these two 't' sounds as
   different sounds that change meaning, or as the same sound?" (a phonological question, about the
   abstract system).
2. A student describing tongue position and airflow to answer a question about whether a sound
   distinction is meaningful (using phonetic tools for a phonological question, missing the actual
   answer) vs. a student testing whether swapping the two sounds changes a word's meaning to answer
   the same question (using the correct phonological test).

**s6_path:** If the student continues conflating the two after the bridge, have them sort five
example questions about sounds into "phonetic" (about physical properties) and "phonological" (about
whether a distinction changes meaning in the system), checking each against the "does swapping
change the meaning?" test.

### MC-B-IF-TWO-SOUNDS-ARE-PHYSICALLY-DIFFERENT-THEY-MUST-BE-DIFFERENT-PHONEMES-IN-EVERY-LANGUAGE

**Trigger signal:** Student assumes that if two sounds are physically, measurably different (as
phonetics would show), they must automatically be treated as different, meaningful phonemes in every
language — failing to recognize that whether a physical sound distinction matters for meaning is
specific to each language's system, and the same physical distinction can be phonemic in one
language while being a non-meaningful variant of one sound in another.

**Conflict evidence [P28]:** Show the student the aspirated versus unaspirated "p" example again: in
English, these are physically different sounds, but swapping them never changes a word's meaning (a
speaker perceives both as "the same sound," an allophonic variation) — while in a language like Thai
or Hindi, this exact same physical distinction DOES change word meaning (it is phonemic). Ask: "Is
the physical difference between these two sounds present in both languages? Does it matter for
meaning in both?"

**Bridge text [P30]:** "Assuming a physical sound difference must always be meaningful everywhere is
like assuming that because two shades of a color are physically, measurably different wavelengths,
every language's color vocabulary must have separate words for them — but some languages lump those
shades under one color word while others distinguish them. Whether a PHYSICAL difference counts as a
MEANINGFUL difference is decided by each language's own system, not by physics alone."

**Replacement text [P31]:** "A physical sound difference existing (phonetics) does not automatically
mean it's meaningful in a given language (phonology). Always check: does a specific language's
speakers actually use this distinction to change word meaning? The same physical distinction can be
phonemic in one language and merely allophonic (non-meaningful variation) in another."

**Discrimination pairs [P33]:**
1. Aspirated versus unaspirated "p" in English (physically different, but non-meaningful — an
   allophonic variation English speakers don't consciously notice) vs. the same aspirated/unaspirated
   distinction in Thai (physically identical difference, but phonemic — it changes word meaning).
2. A student assuming any measurable sound difference must be a "different phoneme" universally
   (physics-determines-meaning assumption) vs. a student correctly recognizing that meaningfulness is
   determined by each language's own system, which must be checked language-by-language (correct
   understanding).

**s6_path:** If the student continues assuming physical difference always equals phonemic
difference after the bridge, have them examine a minimal pair test in English for a sound
distinction that IS phonemic (e.g., "bit" vs. "bat"), then examine the aspirated/unaspirated "p" pair
that is NOT phonemic in English despite being physically real, explicitly contrasting what the
minimal pair test reveals in each case.

## Component 2 — Prerequisite Diagnostic Block

**PD-1 (checks `eng.linguistics.what-is-linguistics`):** "Is the following activity descriptive or
prescriptive: a researcher documenting how a dialect's speakers pronounce a specific sound?" A
student who cannot make this basic distinction lacks the foundational framing this concept assumes —
route to `eng.linguistics.what-is-linguistics` review first.

**PD-2 (checks basic sound-awareness, informal pre-check):** "Do the words 'bat' and 'bit' sound
exactly the same, or different? What single sound changes between them?" A student who cannot
identify this basic sound distinction needs a brief primer before Component 3.

## Component 3 — Concrete Anchor [P06]

**The Color-Wavelength-and-Color-Word Anchor.** Present a strip of color gradients (e.g., different
shades of blue and green near the boundary) alongside the fact that different languages divide this
same physical spectrum into different numbers of "basic color words" — some languages have one word
covering a physical range that another language splits into two distinct color words. Ask: "Is the
physical light wavelength different between languages? Is which distinctions COUNT as meaningfully
different colors the same across languages?" This directly seeds fixes for both misconceptions: it
shows that physical measurement (phonetics/wavelength) and system-level meaningfulness (phonology/
color-word boundaries) are related but distinct questions (fixing MC-A), and that the same physical
reality can be treated as meaningfully different or not, depending on the specific system
(language) being asked about (fixing MC-B).

## Component 4 — Conceptual Development Sequence

### TA-1 — Phonetics vs. Phonology: Two Different Questions (MC-A)

Using the color-wavelength anchor, teach the core distinction between phonetics (physical study) and
phonology (system-level, meaning-based study). Student practice: given six questions about sounds,
sort into "phonetic" and "phonological."

### TA-2 — The Minimal Pair Test

Teach the minimal pair test as the primary tool for determining whether a sound distinction is
phonemic in a given language: find two words differing by exactly one sound, and check whether that
single difference changes meaning. Student practice: given four word pairs, identify which are
genuine minimal pairs demonstrating a phonemic distinction in English.

### TA-3 — The Same Physical Distinction Can Be Phonemic or Not, Depending on the Language (MC-B)

Using the aspirated/unaspirated "p" cross-linguistic comparison, teach that phonemic status is
language-specific, not determined by physical difference alone. Student practice: given a physical
sound distinction and data from two languages (one where it's phonemic, one where it's not), apply
the minimal pair test to each language separately and explain the difference in outcome.

### TA-4 — Full Application: Analyzing a New Sound Distinction

Give the student a new pair of physically distinct sounds and word data from English and one other
language. They must determine, using the minimal pair test, whether the distinction is phonemic in
each language, and explain the phonetic/phonological distinction underlying the analysis — the full
synthesis task.

### TA-5 — Allophones as Predictable Variants Within One Phoneme

Extend the concept: when a physical sound difference is NOT phonemic in a language (as with English
aspirated/unaspirated "p"), the two physical variants are called "allophones" of one phoneme, and
their distribution is often predictable (e.g., aspirated "p" only at the start of a stressed syllable).
Student practice: given data on where each variant of a non-phonemic distinction occurs, identify the
predictable pattern governing their distribution.

## Component 5 — Worked Examples

**WE-1 (Scaffolded):** Sound pair: /b/ vs. /p/ in English. Fully worked: minimal pair identified
("bat" vs. "pat" — swapping the single sound changes the word's meaning); classified as phonemic in
English; contrasted with the aspirated/unaspirated "p" pair, which is physically real but does NOT
form a meaning-changing minimal pair in English (there's no English word pair that differs only by
this feature and means something different), classified as allophonic. Annotation confirms the
phonetic/phonological distinction (fixing MC-A) and the language-specific nature of phonemic status
(fixing MC-B, foreshadowing the cross-linguistic comparison).

**WE-2 (Guided):** New sound pair (the English "l" sounds in "light" versus "full" — physically
different, called "light l" and "dark l"). Student is prompted with guiding questions ("Can you find
an English minimal pair where swapping just this sound changes meaning? If not, are these two
physically different sounds still both real, physically measurable sounds — what does that tell you
about the phonetic/phonological distinction?") to classify the pair as allophonic in English.

**WE-3 (Independent):** A new sound pair with data from English and one other language provided,
unaided. Student applies the minimal pair test to both languages and explains any difference in
phonemic status between them.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Phonetic vs. Phonological Questions**
Given four questions about sounds, sort into "phonetic" (about physical properties) and
"phonological" (about whether a distinction is meaningful), justifying each classification.

**MP-2 [P36] — Applying the Minimal Pair Test**
Given three word pairs, identify which are genuine minimal pairs demonstrating a phonemic distinction
in English and which are not.

**MP-3 [P36] — Cross-Linguistic Phonemic Status**
Given a physical sound distinction and word data from two languages, determine whether the
distinction is phonemic in each language separately, using the minimal pair test.

**MP-4 [P36] — Identifying Allophones**
Given data showing a non-phonemic sound distinction's distribution in English, identify the
predictable pattern governing where each variant occurs.

**MP-5 [P36] — Full Independent Analysis**
Given a new sound pair with data from English and one other language, apply the minimal pair test to
both, determine each language's phonemic status for the distinction, and explain the underlying
phonetic/phonological distinction.

## Component 7 — Session Architecture

```
[Entry] --> [PD-1: what-is-linguistics check] --> [PD-2: basic sound-awareness check]
   |                                                        |
   | (gap found)                                            | (pass)
   v                                                         v
[Route to eng.linguistics.what-is-linguistics]    [Component 3: Color-Wavelength Anchor]
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
                  [Unlock: historical-linguistics-intro,  [S6 remediation: sort-the-question
                   language-acquisition-intro]              / minimal-pair-test drills]
```

**Protocol routing paragraph:** On entry (S0), run PD-1 and PD-2; a what-is-linguistics gap routes
back to that prerequisite, a sound-awareness gap gets a brief primer. During Component 4 (S1, active
instruction), MC-A typically surfaces during TA-1 (conflating the two subdisciplines) and MC-B during
TA-3 (assuming universal phonemic status) — MC-A generally needs resolving first since the minimal
pair test (TA-2) only makes sense once the phonetic/phonological distinction is clear. If either
fires, branch to the relevant s6_path drill before resuming. At the mastery probe stage (S9), route by
failure: MP-1 failure indicates residual MC-A; MP-2 failure alone indicates the minimal-pair
mechanics (TA-2) needs review, distinct from either misconception; MP-3 failure alone indicates
residual MC-B; MP-4 failure alone indicates the allophone-distribution extension (TA-5); MP-5 failure
with MP-1 through MP-4 passing indicates an integration gap — provide one more guided cross-
linguistic example before re-probing.

## Component 8 — Adaptive Flags

- If the student can apply the minimal pair test correctly within English (MP-2) but struggles with
  the cross-linguistic comparison (MP-3, MP-5), this indicates the language-specificity insight
  (MC-B) needs more concrete cross-linguistic examples before independent application.
- If the student is multilingual and already has intuitive awareness that sound distinctions differ
  across their own languages, leverage this directly as a powerful, personally-grounded example for
  TA-3 rather than relying solely on the provided cross-linguistic data.
- If the student conflates "allophone" with "mistake" or "wrong pronunciation" (treating the
  non-phonemic variant as an error), connect back to `eng.linguistics.what-is-linguistics`'s
  descriptive, non-judgmental stance — allophonic variation is a normal, systematic feature of every
  language's sound system, not an error.
- Students with strong prior phonetic transcription skills (from earlier phonetics concepts) should
  transfer that precision readily to identifying the physical sounds in TA-1/TA-2; if minimal pairs
  are hard to generate, provide a bank of candidate word pairs to test rather than requiring the
  student to invent them from scratch.

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
| V-9 | Worked Examples use consistent identify-test-classify structure | PASS |
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
