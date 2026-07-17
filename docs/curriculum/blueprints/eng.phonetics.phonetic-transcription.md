# Teaching Blueprint — eng.phonetics.phonetic-transcription

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonetics.phonetic-transcription
name: Phonetic Transcription
domain: english / phonetics
difficulty:
  label: proficient
  number: 3
bloom: apply
prerequisites:
  - eng.phonetics.ipa-basics
  - eng.phonetics.minimal-pairs
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonetics domain → concrete/auditory entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS
- **Trigger signal:** Student attempts to transcribe by substituting one IPA symbol per WRITTEN LETTER (treating transcription as a letter-to-symbol lookup), rather than transcribing the actual SOUNDS produced, leading to systematic errors on silent letters, digraphs, and letter-sound mismatches (e.g., transcribing "know" letter-by-letter as if k-n-o-w each need a symbol).
- **Conflict evidence [P28]:** "You transcribed 'know' with a symbol for every letter, including the 'k'. Say the word out loud, naturally — do you actually pronounce a /k/ sound at the start?"
- **Bridge text [P30]:** "Transcription represents SOUNDS, not letters — the number of IPA symbols in a transcription depends entirely on how many sounds are actually spoken, which is frequently different from the letter count. Say the word first, identify each sound, THEN write the matching symbol for each — never map letter-by-letter."
- **Replacement text [P31]:** "Always say the word aloud first, segment it into its actual spoken sounds, and only then assign one IPA symbol per sound — treat the spelling as irrelevant to this process."
- **Discrimination pairs [P33]:**
  - "know" (4 letters) → /noʊ/ (2 symbols — the silent 'k' and the 'w' produce no separate sounds of their own).
  - "sing" (4 letters) → /sɪŋ/ (3 symbols — 'ng' is one sound /ŋ/, not two).
- **s6_path:** "It feels natural to map letters one-to-one since that's how spelling works — but transcription is specifically designed to capture sound, stripping away exactly this kind of letter-based assumption, which is what makes it a genuinely useful and different skill from spelling."

### MC-ONE-CORRECT-TRANSCRIPTION-EXISTS
- **Trigger signal:** Student assumes every word has exactly one single "correct" transcription that a teacher/textbook will confirm, becoming distressed or resistant when told that dialect variation produces multiple valid transcriptions for the same word (e.g., insists their transcription of "dance" or "bath" must be "wrong" because it differs from a textbook's Received Pronunciation transcription, when it may simply reflect a different valid dialect).
- **Conflict evidence [P28]:** "Your transcription of 'dance' uses /æ/, and the textbook shows /ɑː/. Are you actually saying the word wrong, or could this be because you (or the textbook) are using a different English dialect?"
- **Bridge text [P30]:** "Phonetic transcription always reflects a SPECIFIC accent/dialect (often labeled, e.g., 'General American' or 'Received Pronunciation') — there is no single universally correct transcription for every English speaker, since real pronunciation genuinely varies by dialect. A transcription is correct if it accurately represents how a real speaker of a specified variety actually says the word."
- **Replacement text [P31]:** "When transcribing, be clear about which dialect/accent you're representing, and expect legitimate differences from other dialects' transcriptions rather than treating any difference as an error."
- **Discrimination pairs [P33]:**
  - "dance" — General American /dæns/ vs. Received Pronunciation /dɑːns/ — both correct for their respective dialects.
  - "butter" — General American with a flap /ɾ/ vs. Received Pronunciation with a clearer /t/ — both valid.
- **s6_path:** "It's very reasonable to want one clear 'right answer,' especially when learning a new skill — but transcription is inherently dialect-specific, and recognizing that different transcriptions can BOTH be correct (for different accents) is actually part of what this skill is meant to teach."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — IPA symbol readiness**
Prompt: "What sound does the symbol /ʃ/ represent? What about /iː/?"
- Pass: correctly identifies both sounds (per `eng.phonetics.ipa-basics`).
- Fail → [P52]: brief IPA-basics refresher before proceeding. Persistent failure → route to eng.phonetics.ipa-basics for reteaching.

**PD-2 [P41] — Minimal-pair precision readiness**
Prompt: "Are 'ship' and 'sheep' a minimal pair? Transcribe both."
- Pass: correctly transcribes /ʃɪp/ and /ʃiːp/, confirming precise one-phoneme-difference discrimination (per `eng.phonetics.minimal-pairs`).
- Fail → [P52]: brief minimal-pairs refresher before proceeding. Persistent failure → route to eng.phonetics.minimal-pairs for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — Say it, segment it, symbol it**

> Present a simple, regular word (e.g., "cat"). Walk through a strict three-step process aloud: (1) SAY the word naturally; (2) SEGMENT it into its actual spoken sounds by stretching it slowly (/k/.../æ/.../t/); (3) SYMBOL each segmented sound with its matching IPA character, writing them down in sequence: /kæt/. Repeat with a word containing a silent letter (e.g., "knee") to show the process still works — segmenting reveals only 2 sounds (/n/, /iː/) despite 4 letters. This anchors the process as a repeatable three-step method, not a lookup.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Transcribing Regular Words (Say-Segment-Symbol) [C]**

Student applies the Component 3 three-step process to a set of phonetically regular words (cat, dog, fish, jump), producing correct transcriptions.

**TA-2 — Transcribing Words with Silent Letters or Digraphs [C]**

Student applies the same process to words with silent letters or digraphs (knee, sign, ship, thin), directly targeting MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS by requiring genuine sound-segmentation rather than letter-mapping.

**TA-3 — Transcribing with Stress Marking [C→P]**

Student transcribes multisyllabic words, correctly including the primary stress mark (ˈ), integrating the word-stress skill from the prerequisite chain into full transcriptions.

**TA-4 — Dialect Variation in Transcription [P]**

Present a set of words with well-known dialect-dependent pronunciation differences (dance, bath, butter, schedule); student transcribes according to a specified dialect and explicitly compares with an alternate valid dialect's transcription, directly targeting MC-ONE-CORRECT-TRANSCRIPTION-EXISTS.

**TA-5 — Transcribing Connected Speech (Short Phrases) [P]**

Student transcribes a short, natural phrase (e.g., "what's up," "I don't know"), applying sentence-stress and reduction knowledge (from prerequisite concepts) to represent how the phrase is actually spoken in connected, natural speech, not word-by-word in isolation.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — regular word transcription)**

> "Transcribe 'jump' into IPA."

Target response: /dʒʌmp/.

**WE-2 (Foundational — silent letter)**

> "Transcribe 'sign' into IPA."

Target response: /saɪn/ — 4 letters, 3 symbols; the "g" is silent.

**WE-3 (Intermediate — dialect awareness)**

> "Transcribe 'bath' as you would say it, and note which dialect that likely represents."

Target response: either /bæθ/ (General American) or /bɑːθ/ (Received Pronunciation), correctly identified as dialect-specific, with an acknowledgment that both are valid transcriptions for their respective varieties.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Regular word, novel word**
"Transcribe 'branch' into IPA."
*Target:* /bræntʃ/ (or /brɑːntʃ/ depending on dialect).

**MP-2 [P36] — Silent letter/digraph, novel word**
"Transcribe 'write' into IPA."
*Target:* /raɪt/ — the "w" is silent, correctly omitted.

**MP-3 [P36] — Stress marking**
"Transcribe 'important,' including stress."
*Target:* /ɪmˈpɔːrtənt/ (or regionally appropriate variant) — stress mark correctly placed on the second syllable.

**MP-4 [P36] — Dialect variation recognition**
"Here are two transcriptions of 'dance': /dæns/ and /dɑːns/. Are both potentially correct? Why?"
*Target:* correctly identifies both as valid, reflecting different dialects (General American vs. Received Pronunciation), rather than declaring one wrong.

**MP-5 [P36] — Explain the transcription process**
"In your own words: what are the steps for transcribing a word into IPA, and why doesn't spelling determine the answer?"
*Target:* states or demonstrates the say-segment-symbol process, and explains that transcription represents actual sounds (which can diverge from spelling and vary by dialect), not a fixed letter-to-symbol mapping.

---

## Component 7 — Session Architecture

```
[P01] Session open — say-segment-symbol demonstration on a known word
  ↓
[P41] PD-1 (IPA symbol readiness)
  ↓ PASS
[P41] PD-2 (minimal-pair precision readiness)
  ↓ PASS
[P06] Anchor: say-segment-symbol process (regular word + silent-letter word)
  ↓
TA-1: Transcribing regular words [C]
  ↓
TA-2: Transcribing words with silent letters or digraphs [C]
  ↓
[P28] Conflict: letter-to-symbol substitution → MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS (if triggered)
  ↓
TA-3: Transcribing with stress marking [C→P]
  ↓
TA-4: Dialect variation in transcription [P]
  ↓
[P28] Conflict: single-correct-answer expectation → MC-ONE-CORRECT-TRANSCRIPTION-EXISTS (if triggered)
  ↓
TA-5: Transcribing connected speech (short phrases) [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, transcribe one sentence you say every day."
[P68] Session close
[P85] Regulation tail — praise transcribing by ear over transcribing by spelling
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on IPA basics and minimal pairs, new to full transcription practice): move through TA-1/TA-2 with the say-segment-symbol process modeled explicitly and repeatedly before introducing stress marking. S1 (transcribes individual sounds well but struggles integrating stress): compress TA-1/TA-2, focus on TA-3's stress-integration work. S6 (anxious about "getting it wrong" given the precision required): explicitly introduce the dialect-variation concept (TA-4) early enough to reduce anxiety about a single "correct" answer, reframing transcription as descriptive rather than a strict right/wrong test. S9 (speaks a non-standard or regional English variety, or a non-native variety with systematic, legitimate differences from textbook RP/GA models): explicitly validate the learner's own natural pronunciation as a legitimate transcription target in its own right, using TA-4's dialect-awareness framing to prevent the learner from feeling their own speech is "incorrect" relative to a textbook standard.

---

## Component 8 — Adaptive Flags

- **Say-segment-symbol as the invariant process**: every transcription task should follow this explicit three-step order — never allow a shortcut straight from spelling to symbols.
- **Silent letters and digraphs are the most common bug ground**: TA-2 and MP-2 exist specifically because letter-based substitution errors concentrate on these cases; give them proportionate practice time.
- **Dialect awareness should be introduced before it becomes a source of anxiety**: sequence TA-4 early enough (right after basic regular-word transcription is secure) that dialect variation is framed as an interesting, expected feature of the skill rather than a confusing contradiction discovered later.
- **Validate the learner's own dialect/accent as legitimate**: for S9 learners with non-standard or non-native English varieties, this concept is an opportunity to affirm that their own natural pronunciation is a valid transcription target, not a deviation from a single "correct" model.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonetics.phonetic-transcription |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonetics.ipa-basics ✓, eng.phonetics.minimal-pairs ✓ (both authored) |
| V-3 | difficulty label matches KG | PASS — proficient |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS, MC-ONE-CORRECT-TRANSCRIPTION-EXISTS |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (IPA symbol readiness), PD-2 (minimal-pair precision readiness) |
| V-10 | Concrete anchor present [P06] | PASS — say-segment-symbol process |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonetics domain always concrete/auditory) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — invariant process, silent-letter bug ground, early dialect framing, own-dialect validation |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
