# Teaching Blueprint — eng.phonetics.syllable-stress

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonetics.syllable-stress
name: Word Stress
domain: english / phonetics
difficulty:
  label: developing
  number: 2
bloom: apply
prerequisites:
  - eng.phonetics.ipa-basics
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonetics domain → concrete/auditory entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-STRESS-IS-JUST-LOUDNESS
- **Trigger signal:** Student marks stress purely by shouting/increasing volume on a syllable, missing that stress is a combination of loudness, pitch change, vowel length, and vowel quality (unstressed syllables often reduce to schwa /ə/) — produces "stress" that sounds unnatural or robotic, or fails to correctly identify stress in recorded natural speech where volume alone doesn't reliably mark it.
- **Conflict evidence [P28]:** "Say 'banana' shouting the middle syllable as loud as you can: 'ba-NA-na'. Now say it the way a natural speaker would, just leaning into that syllable with pitch and length, not volume. Which one sounds like real English?"
- **Bridge text [P30]:** "Stress is a bundle of several cues working together — the stressed syllable is usually longer, has a pitch change, and keeps its full vowel quality, while unstressed syllables are shorter and often reduce to a weak, unclear /ə/ (schwa) sound. Pure loudness is only one small piece, and overusing it alone sounds unnatural."
- **Replacement text [P31]:** "Identify stress by checking length, pitch change, and vowel clarity together — not by volume alone."
- **Discrimination pairs [P33]:**
  - "banana" (stress on middle syllable via length/pitch/full vowel: /bəˈnænə/) vs. an unnatural all-loud rendition.
  - Comparing a stressed vowel that stays full quality (e.g., the 'a' in "PHOto") vs. an unstressed vowel reduced to schwa (the 'o' in "phoTO," /fəˈtoʊ/).
- **s6_path:** "Loudness is an intuitive first guess for 'emphasis,' since that's how emphasis often works in isolated word contexts — but natural English stress relies more on length, pitch, and vowel quality together, and we'll train the ear to notice all three."

### MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING
- **Trigger signal:** Student assumes stress placement can be reliably predicted just from a word's spelling/letters alone with no exceptions, or conversely assumes stress is entirely random and unpredictable, missing that (a) stress is NOT marked by any letter in English spelling (unlike some languages with written accent marks), and (b) stress placement, while genuinely variable, follows some patterns (e.g., many two-syllable nouns stress the first syllable, matching verbs often stress the second — the noun/verb stress shift, as in "REcord" (noun) vs. "reCORD" (verb)).
- **Conflict evidence [P28]:** "Look at the word 'record' — no accent marks, no special letters showing stress. Say 'I need to reCORD this' — where's the stress? Now say 'This is my REcord collection' — where's the stress now? Same spelling, same letters — what changed?"
- **Bridge text [P30]:** "English spelling never marks stress directly — you have to learn or listen for it. But it isn't random either: many two-syllable words shift their stress depending on whether they're used as a noun or a verb (REcord/reCORD, PREsent/preSENT), and there are other partial patterns to notice, even though the full system requires memorization/listening rather than a spelling rule."
- **Replacement text [P31]:** "Never expect spelling alone to show you stress — check listening/dictionary sources, and watch specifically for noun/verb stress-shift pairs, which are a real, learnable pattern."
- **Discrimination pairs [P33]:**
  - "REcord" (noun — stress on syllable 1) vs. "reCORD" (verb — stress on syllable 2) — identical spelling, different stress by grammatical role.
  - "haPPY" — a word with genuinely no alternate stress pattern (unlike record/present), showing not every word participates in the noun/verb shift.
- **s6_path:** "It's confusing that English doesn't write stress down at all — that really does mean you have to learn each word's stress by ear or from a dictionary — but the noun/verb shift pattern for words like 'record' and 'present' is a real, useful shortcut for a whole category of words."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — IPA transcription readiness**
Prompt: "Transcribe the word 'happy' into IPA."
- Pass: correctly produces /ˈhæpi/ or similar (per `eng.phonetics.ipa-basics`); note whether the stress mark is included, informally assessing baseline stress awareness.
- Fail → [P52]: brief IPA-basics refresher before proceeding. Persistent failure → route to eng.phonetics.ipa-basics for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The stress-clap-and-stretch**

> Say a two-syllable word slowly (e.g., "TAble"), clapping once per syllable but clapping the stressed syllable's clap LOUDER and holding the syllable slightly LONGER. Have the student echo, physically feeling the length/emphasis difference. Then repeat with the stress moved to the wrong syllable ("taBLE," unnaturally) so the student hears how wrong it sounds — anchoring stress as a real, felt, audible pattern rather than an abstract mark.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Two-Syllable Stress Identification [C]**

Present two-syllable words (table, happy, about, begin); student identifies which syllable is stressed by ear, using length/pitch/vowel-clarity cues rather than volume alone.

**TA-2 — Stress Marking in IPA Transcription [C]**

Student adds the primary stress mark (ˈ) to IPA transcriptions of words already practiced, connecting stress identification to the IPA notation system learned previously.

**TA-3 — Schwa Recognition in Unstressed Syllables [C→P]**

Present words where an unstressed syllable's vowel reduces to schwa (/ə/) (e.g., "about" /əˈbaʊt/, "banana" /bəˈnænə/); student identifies the reduced vowel, reinforcing that unstressed ≠ just "quieter" but often means "vowel quality changes," directly targeting MC-STRESS-IS-JUST-LOUDNESS.

**TA-4 — Noun/Verb Stress-Shift Pairs [P]**

Present the classic stress-shift word set (record, present, object, produce, permit — each used as both noun and verb); student produces the correct stress for each grammatical role and observes the pattern, directly targeting MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING.

**TA-5 — Stress Identification in Longer/Novel Words [P]**

Present three-or-more-syllable words (photograph, photography, photographic — deliberately chosen to show how stress SHIFTS as suffixes are added) or other unseen multisyllabic words; student identifies primary stress by ear/pattern-application.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — stress identification)**

> "Say 'begin.' Which syllable is stressed?"

Target response: second syllable — "beGIN."

**WE-2 (Foundational — schwa in unstressed syllable)**

> "Say 'banana' and tell me what the unstressed vowels sound like."

Target response: the first and third syllables reduce to schwa /ə/; only the stressed middle syllable keeps a full, clear vowel.

**WE-3 (Intermediate — noun/verb shift)**

> "Say the sentence 'I want to PREsent you with a preSENT.' What's different about the stress in the two uses of 'present'?"

Target response: "PREsent" (noun, gift) stresses the first syllable; "preSENT" (verb, to give) stresses the second syllable.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Stress identification, novel word**
"Say 'computer.' Which syllable is stressed?"
*Target:* second syllable — "comPUter."

**MP-2 [P36] — Stress marking in transcription**
"Transcribe 'again' into IPA, marking the stress."
*Target:* /əˈɡɛn/ — stress mark before the second syllable.

**MP-3 [P36] — Schwa identification**
"Say 'sofa.' Which syllable is unstressed, and what does its vowel sound like?"
*Target:* second syllable is unstressed, reducing to schwa /ə/ — /ˈsoʊfə/.

**MP-4 [P36] — Noun/verb stress shift, novel pair**
"Say 'object' as a noun (a thing) and as a verb (to disagree). What's different?"
*Target:* "OBject" (noun) stresses the first syllable; "obJECT" (verb) stresses the second syllable.

**MP-5 [P36] — Explain the stress system**
"In your own words: how do you figure out which syllable is stressed in an English word, since spelling doesn't show it?"
*Target:* states or demonstrates that stress must be learned by ear/reference rather than read from spelling, that it involves length/pitch/vowel-quality (not just volume), and that some words (noun/verb pairs) shift predictably.

---

## Component 7 — Session Architecture

```
[P01] Session open — stress-clap-and-stretch warm-up (correct vs. wrong stress placement)
  ↓
[P41] PD-1 (IPA transcription readiness)
  ↓ PASS
[P06] Anchor: stress-clap-and-stretch (feel the length/loudness/pitch bundle)
  ↓
TA-1: Two-syllable stress identification [C]
  ↓
TA-2: Stress marking in IPA transcription [C]
  ↓
TA-3: Schwa recognition in unstressed syllables [C→P]
  ↓
[P28] Conflict: stress judged by loudness alone → MC-STRESS-IS-JUST-LOUDNESS (if triggered)
  ↓
TA-4: Noun/verb stress-shift pairs [P]
  ↓
[P28] Conflict: stress assumed spelling-fixed or fully random → MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING (if triggered)
  ↓
TA-5: Stress identification in longer/novel words [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find one noun/verb word pair with a stress shift, like 'record'."
[P68] Session close
[P85] Regulation tail — praise noticing length/pitch/vowel-clarity over just volume
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on IPA, new to stress specifically): dwell on TA-1's two-syllable identification with the clap-and-stretch anchor before introducing IPA stress-marking. S1 (marks stress by volume only, from informal prior exposure): dwell on TA-3's schwa work to broaden the cue set beyond loudness. S6 (frustrated that stress isn't written down anywhere): validate this explicitly as a genuine, sometimes-frustrating feature of English (Component 1 s6_path) rather than something the learner is failing to notice. S9 (L1 has fixed word-stress rules, e.g. French final-syllable stress, or is a syllable-timed rather than stress-timed language, e.g. Spanish, or uses lexical tone instead of stress, e.g. Mandarin): expect specific, predictable difficulty — French-background learners often default to final-syllable stress on English words; tonal-language speakers may need extra explicit contrast between English stress (length/pitch/loudness bundle) and their L1's tone (pitch-contour-as-meaning) to avoid conflating the two systems.

---

## Component 8 — Adaptive Flags

- **Stress is a multi-cue bundle, not pure volume**: explicitly teach length + pitch + vowel-quality together as the real signal, directly countering the likely default MC-STRESS-IS-JUST-LOUDNESS assumption.
- **Schwa reduction is the clearest teachable marker of "unstressed"**: use TA-3's schwa recognition as the single most reliable, concrete signal students can learn to listen for, since it's easier to detect than subtle pitch/length differences alone.
- **Noun/verb stress-shift as a genuine, bounded pattern**: teach the record/present/object-style shift explicitly as a real pattern (not every word participates, but it's common enough and useful enough to name directly) — this gives students one concrete foothold in an otherwise largely unpredictable system.
- **L1-specific stress/tone transfer**: for S9 learners, anticipate concrete transfer patterns from the learner's L1 prosodic system (fixed-stress languages defaulting to one position; tonal languages potentially conflating tone and stress) and address explicitly rather than treating all stress errors as equally likely.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonetics.syllable-stress |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonetics.ipa-basics ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — developing |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-STRESS-IS-JUST-LOUDNESS, MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (IPA transcription readiness) |
| V-10 | Concrete anchor present [P06] | PASS — stress-clap-and-stretch |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonetics domain always concrete/auditory) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — multi-cue bundle framing, schwa-as-marker, noun/verb pattern, L1 stress/tone transfer |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
