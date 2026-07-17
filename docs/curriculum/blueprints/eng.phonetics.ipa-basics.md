# Teaching Blueprint — eng.phonetics.ipa-basics

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonetics.ipa-basics
name: IPA Basics for English
domain: english / phonetics
difficulty:
  label: developing
  number: 2
bloom: apply
prerequisites:
  - eng.phonetics.consonant-sounds
  - eng.phonetics.vowel-sounds
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonetics domain → concrete/visual-auditory entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS
- **Trigger signal:** Student reads IPA symbols using regular English letter-sound rules (e.g., reads /θ/ as "theta" or tries to sound it like the letter "o" with a line through it, or reads /ʃ/ as "s" followed by "h"), rather than treating each symbol as representing one single, specific phoneme already learned through place/manner/voicing classification.
- **Conflict evidence [P28]:** "You read /ʃ/ as if it were two letters, 's' then 'h'. But you already know this exact sound from consonant classification — what did we call the sound at the start of 'ship'? Is /ʃ/ a NEW sound, or a symbol for a sound you already know?"
- **Bridge text [P30]:** "Every IPA symbol stands for exactly ONE phoneme you've already learned to produce and classify — it's a one-symbol-one-sound NOTATION SYSTEM, unlike English spelling where letters can be ambiguous or combine unpredictably. Learning IPA means learning to recognize a new symbol for a sound you already know, not learning new sounds."
- **Replacement text [P31]:** "For any IPA symbol, first ask: which specific sound (already known from place/manner/voicing) does this single symbol represent — never try to sound out an IPA symbol using English letter-reading habits."
- **Discrimination pairs [P33]:**
  - "/ʃ/" (one symbol, one sound — the "sh" sound) vs. reading it as "s-h" (incorrect, applying English spelling habits).
  - "/θ/" (one symbol, the "th" sound in "think") vs. mistaking it for the Greek letter theta's name or a modified "o."
- **s6_path:** "IPA symbols can look intimidating or like a whole new alphabet to learn from scratch — but every single one just labels a sound you can already make and already classified by place/manner/voicing; the challenge is just matching a new symbol to already-known knowledge."

### MC-IPA-MATCHES-ENGLISH-SPELLING
- **Trigger signal:** Student assumes IPA transcription will mirror English spelling patterns (e.g., expects "knife" to transcribe with a symbol for silent "k," or expects every letter in the written word to have a corresponding IPA symbol), not yet grasping that IPA transcribes SOUNDS only, stripping away spelling entirely.
- **Conflict evidence [P28]:** "The word 'knife' has 5 letters. Let's transcribe what you actually SAY: /naɪf/ — how many symbols is that? Where did the 'k' letter go?"
- **Bridge text [P30]:** "IPA transcribes only the sounds you actually pronounce — it completely ignores spelling, silent letters, and any mismatch between letters and sounds. A word's IPA transcription can have a different number of symbols than the word has letters, in either direction."
- **Replacement text [P31]:** "When transcribing a word into IPA, say the word aloud first and transcribe only what you actually hear — never transcribe letter-by-letter from the spelling."
- **Discrimination pairs [P33]:**
  - "knife" (5 letters) → /naɪf/ (4 symbols — silent 'k' dropped, "i...e" becomes one diphthong symbol).
  - "fish" (4 letters) → /fɪʃ/ (3 symbols — "sh" digraph becomes one symbol /ʃ/).
- **s6_path:** "It's a natural assumption that a transcription should relate directly to spelling, since that's how we're used to reading and writing — but IPA is specifically designed to represent sound ALONE, which is exactly why it's useful for describing pronunciation independent of English's inconsistent spelling."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Consonant classification readiness**
Prompt: "What is the place, manner, and voicing of the sound at the start of 'ship'?"
- Pass: correctly classifies as voiceless post-alveolar fricative (per `eng.phonetics.consonant-sounds`).
- Fail → [P52]: brief consonant-sounds refresher before proceeding. Persistent failure → route to eng.phonetics.consonant-sounds for reteaching.

**PD-2 [P41] — Vowel classification readiness**
Prompt: "Describe the tongue position for the vowel in 'see.'"
- Pass: correctly describes high, front, unrounded (per `eng.phonetics.vowel-sounds`).
- Fail → [P52]: brief vowel-sounds refresher before proceeding. Persistent failure → route to eng.phonetics.vowel-sounds for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — Symbol-to-sound matching game**

> Present a set of IPA symbol cards (starting with symbols that closely resemble their corresponding letter: /p/, /t/, /k/, /m/, /s/) alongside picture cards. Student says the sound for each symbol (already known from prior classification work) and matches it to the picture whose name starts with that sound. Then introduce 2-3 "surprising" symbols that don't look like familiar letters (/ʃ/, /θ/, /ŋ/) using the same matching process, explicitly noting these are new SYMBOLS for already-known SOUNDS.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Familiar-Looking Symbol Recognition [C]**

Present IPA symbols that resemble their corresponding Latin letters (/p/, /b/, /t/, /d/, /k/, /g/, /m/, /n/, /f/, /v/, /s/, /z/, /l/, /r/, /h/, /w/, /j/); student produces the sound for each, building confidence before novel symbols.

**TA-2 — Novel Symbol Recognition [C]**

Introduce symbols with no direct Latin-letter resemblance (/ʃ/, /ʒ/, /tʃ/, /dʒ/, /θ/, /ð/, /ŋ/, /ɪ/, /iː/, /ʊ/, /uː/, /ɑː/, /æ/, /ʌ/, /ɒ/, /ɔː/, /ɜː/, /ə/, and common diphthongs /eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/); student produces the corresponding sound for each, directly targeting MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS.

**TA-3 — Transcribing Simple Regular Words [C→P]**

Student transcribes simple, phonetically regular words (cat, dog, fish, mat) into IPA, checking their transcription reflects sounds, not spelling letter-count.

**TA-4 — Transcribing Words with Spelling-Sound Mismatch [P]**

Student transcribes words where spelling and sound diverge notably (knife, laugh, though, city), directly targeting MC-IPA-MATCHES-ENGLISH-SPELLING by requiring the student to transcribe only what is heard.

**TA-5 — Reading (Decoding) IPA Transcriptions [P]**

Reverse direction: student is given an IPA transcription (not the spelled word) and must say the word aloud, demonstrating that the skill works bidirectionally (encoding sound→symbol and decoding symbol→sound).

---

## Component 5 — Worked Examples

**WE-1 (Foundational — familiar symbol)**

> "What sound does the symbol /f/ represent?"

Target response: /f/ — the same sound as the start of "fish."

**WE-2 (Foundational — novel symbol)**

> "What sound does the symbol /ʒ/ represent?"

Target response: the voiced sound in the middle of "measure" or "vision."

**WE-3 (Intermediate — transcription with mismatch)**

> "Transcribe the word 'though' into IPA."

Target response: /ðoʊ/ (or /ðəʊ/ depending on dialect) — 5 letters, 2 symbols, since "th" is one sound and "ough" represents a single long-vowel/diphthong sound with no /g/, /h/, or separate vowel sounds.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Familiar symbol, novel context**
"What sound does /d/ represent?"
*Target:* the voiced alveolar stop, as in "dog."

**MP-2 [P36] — Novel symbol, novel context**
"What sound does /ŋ/ represent?"
*Target:* the velar nasal, as in the end of "sing."

**MP-3 [P36] — Transcription, regular word**
"Transcribe 'bed' into IPA."
*Target:* /bɛd/ — 3 letters, 3 symbols (matches here, but student should not assume this always holds).

**MP-4 [P36] — Transcription, spelling-sound mismatch**
"Transcribe 'laugh' into IPA."
*Target:* /læf/ — 6 letters, 3 symbols, correctly dropping the silent "gh" letters and representing the actual /f/ sound they produce.

**MP-5 [P36] — Decoding IPA back to a word**
"What word does /naɪt/ represent? (Note: could be more than one correct spelling.)"
*Target:* "night" or "knight" — both valid, since IPA represents sound only and cannot distinguish homophones by spelling; correctly recognizing this ambiguity is itself part of the target response.

---

## Component 7 — Session Architecture

```
[P01] Session open — symbol-to-sound matching game warm-up (familiar symbols)
  ↓
[P41] PD-1 (consonant classification readiness)
  ↓ PASS
[P41] PD-2 (vowel classification readiness)
  ↓ PASS
[P06] Anchor: symbol-to-sound matching game (familiar → novel symbols)
  ↓
TA-1: Familiar-looking symbol recognition [C]
  ↓
TA-2: Novel symbol recognition [C]
  ↓
[P28] Conflict: IPA symbols read via English letter habits → MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS (if triggered)
  ↓
TA-3: Transcribing simple regular words [C→P]
  ↓
TA-4: Transcribing words with spelling-sound mismatch [P]
  ↓
[P28] Conflict: transcription forced to match spelling → MC-IPA-MATCHES-ENGLISH-SPELLING (if triggered)
  ↓
TA-5: Reading (decoding) IPA transcriptions [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, transcribe your own name into IPA."
[P68] Session close
[P85] Regulation tail — praise transcribing by ear over transcribing by spelling
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on consonant/vowel classification, new to IPA notation specifically): move through TA-1 with the familiar-looking symbols first to build confidence in the "new symbol, known sound" framing before novel symbols. S1 (has some prior exposure to IPA, e.g. from a dictionary): assess for pre-existing MC-IPA-MATCHES-ENGLISH-SPELLING or partial/incorrect symbol knowledge before assuming a clean slate. S6 (overwhelmed by the number of new symbols, ~24+ consonants and ~20 vowel symbols/diphthongs): explicitly chunk by familiar-vs-novel-shape (TA-1 vs. TA-2) and introduce novel symbols in small batches (4-5 per session) rather than all at once. S9 (multilingual learner already familiar with IPA from language-learning resources, or from a different transcription tradition, e.g. Cyrillic-based phonetic notation): treat this as an asset — check for and build on existing transcription-system familiarity rather than assuming no prior exposure.

---

## Component 8 — Adaptive Flags

- **IPA labels known sounds, doesn't teach new ones**: this concept is fundamentally a NOTATION skill built entirely on the phoneme knowledge from consonant-sounds/vowel-sounds — frame every new symbol explicitly as "a name for a sound you already know," per Component 1's core distinction.
- **Transcribe by ear, never by spelling**: every transcription task should explicitly instruct the student to say the word aloud first and transcribe what is heard — this is the single most important standing habit for this concept.
- **Symbol introduction chunking**: introduce novel (non-Latin-resembling) symbols in small batches rather than the full IPA chart at once, to manage cognitive load (Component 8 S6 routing).
- **Prior IPA exposure as an asset**: for learners with prior dictionary-based or foreign-language IPA exposure, assess and build on existing knowledge rather than re-teaching from zero.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonetics.ipa-basics |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonetics.consonant-sounds ✓, eng.phonetics.vowel-sounds ✓ (both authored) |
| V-3 | difficulty label matches KG | PASS — developing |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS, MC-IPA-MATCHES-ENGLISH-SPELLING |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (consonant classification), PD-2 (vowel classification) |
| V-10 | Concrete anchor present [P06] | PASS — symbol-to-sound matching game |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonetics domain always concrete/visual-auditory) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — notation-not-new-sounds framing, transcribe-by-ear habit, symbol chunking, prior-exposure asset |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
