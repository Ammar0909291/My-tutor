# Teaching Blueprint — eng.phonics.sight-words

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonics.sight-words
name: High-Frequency Sight Words
domain: english / phonics
difficulty:
  label: foundational
  number: 1
bloom: remember
prerequisites:
  - eng.phonics.letter-sound-correspondence
mastery_threshold: 0.80
estimated_hours: 2
cross_links:
  - eng.vocab.word-recognition
session_cap: 5 TAs
cpa_entry_stage: C (english/phonics domain → concrete/visual entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL
- **Trigger signal:** Student refuses to attempt sounding out ANY sight word, treating the entire category as purely arbitrary shapes to memorize, even for sight words that are partially or fully phonetically regular (e.g., "and," "big," "can" — common but still phonetically decodable), and gives up immediately rather than attempting a partial decode.
- **Conflict evidence [P28]:** "You said sight words can never be sounded out. Let's try 'and' — can you sound out /æ/-/n/-/d/? Does that actually work for this one?"
- **Bridge text [P30]:** "'Sight word' means a word taught for instant, automatic recognition because of how common it is — NOT necessarily because it's unreadable by sounding out. Many sight words (and, big, can, get) are fully phonetically regular; only some (said, was, of, the) have genuinely irregular spelling-sound patterns that truly require memorization."
- **Replacement text [P31]:** "For any sight word, first try sounding it out — if that produces the correct word, treat it as a regular word you're building automatic recognition for; only fall back to pure memorization for the genuinely irregular ones."
- **Discrimination pairs [P33]:**
  - "and" (fully decodable: /æ/-/n/-/d/) vs. "was" (irregular: does not sound like /wæz/ read literally — actually /wʌz/, with the 'a' behaving unexpectedly).
  - "big" (fully decodable) vs. "the" (irregular vowel — schwa /ðə/ or /ðiː/, not a predictable single spelling-sound rule for a beginner).
- **s6_path:** "It's understandable to assume 'sight word' means 'unreadable' since that's true for some of them — but many are just common, regular words being taught for speed, not because they're actually irregular."

### MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH
- **Trigger signal:** Student "reads" a sight word by recognizing its overall visual shape/length/first letter alone (guessing from a partial glance) rather than processing all the letters, leading to errors on similar-looking or similar-length words (e.g., confusing "was"/"saw", "there"/"three", or "what"/"that").
- **Conflict evidence [P28]:** "You read this as 'was' — let's look letter by letter: w-a-s. Now look at this other word: s-a-w. Same letters, different order — is it the same word?"
- **Bridge text [P30]:** "Sight-word recognition needs to be fast, but it still has to process every letter, in order — glancing at just the shape, length, or first letter isn't enough, because many high-frequency words share those surface features while being different words entirely."
- **Replacement text [P31]:** "Even when reading a sight word quickly, make sure your eyes move across every letter in order — don't rely on shape or length alone."
- **Discrimination pairs [P33]:**
  - "was" vs. "saw" (same 3 letters, reversed — a classic sight-word reversal error).
  - "there" vs. "three" (similar length/shape, genuinely different letters and meaning).
- **s6_path:** "Reversal and shape-based confusions are extremely common at this stage because it feels efficient to just glance — we'll build the habit of a quick but complete letter-by-letter check, especially for words with a common 'twin'."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Basic letter-sound readiness**
Prompt: "What sound does 'a' make? What about 'n' and 'd'?"
- Pass: correctly produces the sounds needed to attempt decoding regular sight words (per `eng.phonics.letter-sound-correspondence`).
- Fail → [P52]: brief letter-sound-correspondence refresher before proceeding. Persistent failure → route to eng.phonics.letter-sound-correspondence for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The word-card flash-and-check**

> Present a sight word on a card, flashed briefly (1-2 seconds), then covered. Student attempts to say the word from the brief glimpse. Then reveal the card again and check letter-by-letter together, confirming or correcting. Repeat with a "twin" word (e.g., show "was," then show "saw") to explicitly demonstrate that fast recognition still requires attention to letter order. This anchors sight-word reading as fast-but-complete processing, not shape-guessing.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Regular Sight Word Decoding [C]**

Present phonetically regular high-frequency words (and, big, can, get, him, not); student sounds them out using known letter-sound correspondences, building the insight that most "sight words" are actually decodable, just common.

**TA-2 — Irregular Sight Word Introduction [C]**

Introduce a small set of genuinely irregular high-frequency words (said, was, of, the, they, one) as words requiring direct memorization; explicitly flag which specific letter(s) behave unexpectedly in each (e.g., in "said," the "ai" does not make its expected sound).

**TA-3 — Flash Recognition with Letter-Order Check [C→P]**

Using the Component 3 flash-and-check technique, student practices fast recognition of a mixed set of regular and irregular sight words, always confirming with a full letter-by-letter check.

**TA-4 — Twin-Word Discrimination [P]**

Present commonly confused sight-word pairs (was/saw, there/three, what/that, from/form); student discriminates each pair explicitly, directly targeting MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH.

**TA-5 — Sight Words in Connected Text [P]**

Present a short sentence or two containing several taught sight words embedded among decodable words; student reads fluently, applying instant recognition for sight words and decoding for the rest.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — regular sight word)**

> "Sound out and read the word 'big.'"

Target response: /b/-/ɪ/-/g/ → "big," decoded successfully like any regular word.

**WE-2 (Foundational — irregular sight word)**

> "This word is 'said' — notice the 'ai' doesn't make its usual sound here. Read it with me: 'said.'"

Target response: student repeats "said" correctly, acknowledging it must be memorized rather than sounded out literally.

**WE-3 (Intermediate — twin-word discrimination)**

> "Here are two words: 'was' and 'saw.' Read each one, checking the letters carefully."

Target response: correctly reads both, distinguishing them by letter order rather than shape.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Regular sight word, novel word**
"Read the word 'not.'"
*Target:* decodes and reads correctly using regular letter-sound correspondences.

**MP-2 [P36] — Irregular sight word, novel word**
"Read the word 'of.' Is this word fully regular, or does something behave unexpectedly?"
*Target:* reads "of" correctly (/ʌv/, not the expected /ɒf/) and identifies that the "f" sound is unexpectedly voiced — an irregularity requiring memorization.

**MP-3 [P36] — Flash recognition speed**
"[Flash 'they' briefly] What word was that?"
*Target:* correctly identifies "they" from a brief exposure, confirmed by a full letter check afterward.

**MP-4 [P36] — Twin-word discrimination, novel pair**
"Read these two words carefully: 'what' and 'that.'"
*Target:* correctly distinguishes both, citing the different initial letters (wh- vs. th-) rather than guessing from overall shape.

**MP-5 [P36] — Explain the sight-word category**
"In your own words: what makes a word a 'sight word,' and does that mean it can never be sounded out?"
*Target:* explains that sight words are taught for fast, common-word recognition, and correctly states that many are actually phonetically regular — only some are truly irregular and need pure memorization.

---

## Component 7 — Session Architecture

```
[P01] Session open — flash-and-check warm-up on a known regular sight word
  ↓
[P41] PD-1 (basic letter-sound readiness)
  ↓ PASS
[P06] Anchor: word-card flash-and-check (including a twin-word demo)
  ↓
TA-1: Regular sight word decoding [C]
  ↓
[P28] Conflict: refusal to attempt decoding any sight word → MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL (if triggered)
  ↓
TA-2: Irregular sight word introduction [C]
  ↓
TA-3: Flash recognition with letter-order check [C→P]
  ↓
[P28] Conflict: shape-guessing instead of full letter processing → MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH (if triggered)
  ↓
TA-4: Twin-word discrimination [P]
  ↓
TA-5: Sight words in connected text [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find one sight word in a book and check if it's regular or irregular."
[P68] Session close
[P85] Regulation tail — praise attempting to decode before assuming a word must be memorized
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (no prior sight-word instruction): start exclusively with regular sight words (TA-1) to build the "many are decodable" insight before introducing any irregular words. S1 (has memorized some sight words by rote without decoding attempts): explicitly revisit already-known words through TA-1's decoding lens to build the habit of attempting sound-out first. S6 (frustrated by irregular words breaking expectations right after learning phonics rules): validate explicitly that only a small subset are truly irregular, and that this is a normal, bounded feature of English, not a sign phonics "doesn't work." S9 (L1 literacy relies on a non-alphabetic or highly regular alphabetic system, e.g. a syllabary or a shallow orthography): expect the very concept of "irregular high-frequency words requiring memorization independent of sound" to be less intuitive; allow extra explicit framing of why this category exists in English specifically.

---

## Component 8 — Adaptive Flags

- **"Sight word" ≠ "unreadable"**: explicitly teach that the sight-word category is about frequency and automaticity, not universal irregularity — most taught sight words are phonetically regular and should be approached with decoding first.
- **Irregular subset is small and identifiable**: flag exactly which letter(s) in each irregular sight word behave unexpectedly (Component 4 TA-2) rather than presenting the whole word as an undifferentiated blob to memorize — this preserves as much phonics-based processing as possible even within irregular words.
- **Twin-word pairs deserve explicit, paired practice**: commonly confused high-frequency word pairs (was/saw, there/three, what/that) should be taught in deliberate side-by-side contrast (TA-4), not left to incidental exposure.
- **Cross-link to word-recognition**: this concept is cross-linked to `eng.vocab.word-recognition` — sight-word automaticity is the phonics-side foundation that vocabulary-level word recognition builds on; do not duplicate broader vocabulary-acquisition content here.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonics.sight-words |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonics.letter-sound-correspondence ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — foundational |
| V-4 | bloom level matches KG | PASS — remember |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL, MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (basic letter-sound readiness) |
| V-10 | Concrete anchor present [P06] | PASS — word-card flash-and-check |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonics domain always concrete/visual) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — sight-word/decodability distinction, irregular-letter flagging, twin-word contrast, cross-link boundary with word-recognition |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
