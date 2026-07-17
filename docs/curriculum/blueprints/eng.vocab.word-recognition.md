# Teaching Blueprint — eng.vocab.word-recognition

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.vocab.word-recognition
name: Word Recognition
domain: english / vocab
difficulty:
  label: foundational
  number: 1
bloom: remember
prerequisites:
  - eng.phonics.decoding-fluency
mastery_threshold: 0.80
estimated_hours: 2
cross_links:
  - eng.phonics.sight-words
session_cap: 5 TAs
cpa_entry_stage: C (english/vocab domain → concrete/visual entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-DECODING-EQUALS-RECOGNIZING-MEANING
- **Trigger signal:** Student successfully decodes (sounds out/reads aloud) an unfamiliar written word correctly but treats the task as "done" without connecting it to a known spoken-vocabulary meaning — can pronounce the word accurately yet cannot say what it means or use it, revealing that decoding accuracy and word recognition (meaning access) are being conflated.
- **Conflict evidence [P28]:** "You read that word perfectly — nice decoding! Now tell me, what does it actually mean? Have you heard this word spoken before, in conversation?"
- **Bridge text [P30]:** "Decoding (sounding out the letters correctly) and word recognition (connecting the printed word to a meaning you already know from spoken vocabulary) are two different steps. Decoding gets you TO the word's pronunciation; recognition is realizing 'oh, I know this word — I've heard it spoken, and here's what it means.' A word can be decoded perfectly and still not be recognized if it's not yet part of your spoken vocabulary."
- **Replacement text [P31]:** "After decoding an unfamiliar-looking printed word, always check: do I already know this word from speech? If yes, that's word recognition; if I genuinely don't know it at all, decoding alone hasn't taught me its meaning."
- **Discrimination pairs [P33]:**
  - Decoding "cat" (a word already known from spoken vocabulary — recognition happens instantly) vs. decoding an unfamiliar technical term correctly but not knowing its meaning (decoding without recognition).
  - A student who decodes "dog" and immediately says "oh, dog, like my pet!" (true recognition) vs. a student who decodes "dog" correctly as a sound sequence but, in a hypothetical unfamiliar-word scenario, shows no meaning connection.
- **s6_path:** "It's easy to feel like sounding out a word correctly is the whole job, since that's the hard phonics work — but connecting the printed form to a meaning you already know from speaking and listening is a separate, equally important step."

### MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD
- **Trigger signal:** Student assumes that if a printed word doesn't look immediately familiar, they must not know it at all — giving up without decoding it — when in fact the word may already be part of their spoken vocabulary and would be instantly recognized once correctly decoded (e.g., a word spelled in an unfamiliar way, or simply not yet seen often in print, that the student already uses/understands in speech).
- **Conflict evidence [P28]:** "You said you don't know this word because it looked unfamiliar written down. Let's sound it out together... 'ap-ple.' Do you actually know that word now that you've heard it said?"
- **Bridge text [P30]:** "A printed word looking unfamiliar doesn't mean the WORD itself is unknown — it might just be a word you haven't seen written down very often yet, even though you already know it perfectly well from listening and speaking. Decoding it can 'unlock' a word you already have in your spoken vocabulary."
- **Replacement text [P31]:** "Before assuming an unfamiliar-looking printed word is completely unknown, decode it fully first — you may already recognize it as soon as you hear its sound."
- **Discrimination pairs [P33]:**
  - A word that looks unfamiliar in print but, once decoded, is instantly recognized as a known spoken word (e.g., "though" for a learner unfamiliar with this spelling but who says "though" often in speech) vs. a word that, even after correct decoding, remains genuinely unknown in meaning (a true vocabulary gap).
  - Giving up before decoding (assuming unfamiliarity = unknown) vs. decoding first, then checking for recognition.
- **s6_path:** "It's a reasonable first instinct to judge a word as unknown just from its unfamiliar printed appearance — but many words that look tricky in print turn out to be words you already know well once you actually sound them out."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Decoding fluency readiness**
Prompt: "Read this short sentence at a natural pace: 'The dog ran to the park.'"
- Pass: reads accurately, at an appropriate pace, with reasonable expression (per `eng.phonics.decoding-fluency`).
- Fail → [P52]: brief decoding-fluency refresher before proceeding. Persistent failure → route to eng.phonics.decoding-fluency for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The decode-then-recognize check**

> Present a printed word that looks unfamiliar to the student but is actually a common word they already use in speech (chosen individually per student, e.g., a slightly unusual spelling of a familiar word, or simply a word not yet seen much in print). Have the student decode it step-by-step. The moment the correct pronunciation emerges, pause and ask: "Do you know this word now that you've heard it?" — capturing the "aha, I DO know this!" moment as a concrete, memorable demonstration of decoding unlocking recognition.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Decode-Then-Check-for-Meaning Routine [C]**

Present a set of printed words (a mix of already-familiar-looking words and less-familiar-looking but known-in-speech words); student decodes each, then explicitly states whether they recognize the resulting spoken form and, if so, gives its meaning or uses it in a sentence.

**TA-2 — Instant Recognition of High-Frequency Words [C]**

Present very common words in print; student demonstrates instant (non-effortful) recognition, connecting printed form directly to meaning without conscious decoding effort — reinforcing that recognition becomes automatic with repeated successful decode-then-recognize experiences.

**TA-3 — Unfamiliar-Looking-But-Known Words [C→P]**

Present printed words that look unusual or unfamiliar (irregular spelling, uncommon letter patterns) but that are common in the student's spoken vocabulary; student decodes first before judging familiarity, directly targeting MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD.

**TA-4 — True Vocabulary Gaps vs. Recognition Gaps [P]**

Present a mixed set: some words that, once decoded, ARE recognized (recognition gap only, now closed), and some genuinely novel words that remain unknown even after correct decoding (true vocabulary gap); student sorts and explains which is which, directly targeting MC-DECODING-EQUALS-RECOGNIZING-MEANING by requiring the student to distinguish "I can pronounce it" from "I know what it means."

**TA-5 — Word Recognition in Connected Text [P]**

Student reads a short passage, flagging any word they can decode but do NOT recognize the meaning of (a genuine vocabulary gap, to be addressed by future vocabulary-building work), demonstrating the practical, ongoing application of distinguishing decoding from recognition during real reading.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — decode-then-check)**

> "Decode this word: 'jum-ping.' Do you know this word?"

Target response: "jumping" — decodes correctly, then confirms recognition ("yes, like when you jump").

**WE-2 (Foundational — instant recognition)**

> "What word is this? [shows 'the']"

Target response: instantly says "the" without visibly sounding it out — automatic recognition.

**WE-3 (Intermediate — unfamiliar-looking but known)**

> "This word might look tricky: 'w-a-t-c-h.' Decode it and tell me if you know it."

Target response: decodes to "watch," then recognizes it as a known word (a thing you wear, or what you do with your eyes) despite the unfamiliar letter combination "atch."

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Decode-then-check, novel word**
"Decode 'run-ning.' Do you recognize this word? What does it mean?"
*Target:* decodes to "running," confirms recognition, and correctly states or demonstrates its meaning.

**MP-2 [P36] — Instant recognition, novel high-frequency word**
"What word is this? [shows 'was']"
*Target:* instant recognition without effortful sounding-out.

**MP-3 [P36] — Unfamiliar-looking but known word**
"Decode 'though.' Do you know this word once you hear it said?"
*Target:* decodes correctly (/ðoʊ/) and confirms recognition as a known spoken word, despite its unusual spelling.

**MP-4 [P36] — True vocabulary gap identification**
"Decode this word: [a genuinely unfamiliar, low-frequency word for this learner]. Do you know what it means?"
*Target:* correctly decodes the word but honestly reports not knowing its meaning — correctly distinguishing decoding success from recognition/vocabulary gap, rather than falsely claiming to "know" the word.

**MP-5 [P36] — Explain the decoding/recognition distinction**
"In your own words: what's the difference between being able to sound out a word and actually recognizing/knowing it?"
*Target:* states or demonstrates that decoding produces a pronunciation, while recognition means connecting that pronunciation to a meaning already known from spoken vocabulary — and that these can succeed or fail independently of each other.

---

## Component 7 — Session Architecture

```
[P01] Session open — decode-then-recognize check warm-up on a personally-relevant word
  ↓
[P41] PD-1 (decoding fluency readiness)
  ↓ PASS
[P06] Anchor: decode-then-recognize check (the "aha, I know this!" moment)
  ↓
TA-1: Decode-then-check-for-meaning routine [C]
  ↓
[P28] Conflict: decoding success treated as sufficient → MC-DECODING-EQUALS-RECOGNIZING-MEANING (if triggered)
  ↓
TA-2: Instant recognition of high-frequency words [C]
  ↓
TA-3: Unfamiliar-looking-but-known words [C→P]
  ↓
[P28] Conflict: unfamiliar appearance assumed to mean unknown word → MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD (if triggered)
  ↓
TA-4: True vocabulary gaps vs. recognition gaps [P]
  ↓
TA-5: Word recognition in connected text [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find one word you can decode but need to check if you truly know its meaning."
[P68] Session close
[P85] Regulation tail — praise honestly distinguishing "I can say it" from "I know it"
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on decoding fluency, new to the recognition distinction): dwell on TA-1's explicit decode-then-check routine with words definitely already in the student's spoken vocabulary before introducing genuinely unfamiliar words. S1 (decodes fluently and assumes fluency alone constitutes full literacy): use TA-4 explicitly to surface the recognition/vocabulary-gap distinction as a new, useful metacognitive lens on an already-strong skill. S6 (frustrated or embarrassed by discovering vocabulary gaps): reframe explicitly — finding a decoding-success-but-meaning-gap word is valuable diagnostic information, not a failure, since it identifies exactly where future vocabulary work should focus. S9 (English learner whose spoken vocabulary is still developing, so many decoded words may be genuinely unknown rather than a recognition gap): expect a higher proportion of true vocabulary gaps (TA-4) than recognition gaps for this learner, and frame this honestly as a normal stage of vocabulary growth rather than a decoding problem.

---

## Component 8 — Adaptive Flags

- **Decoding and recognition are genuinely separable skills**: this concept's core purpose is teaching students to notice the difference — never let a decoding success alone stand in for "the word is known."
- **The decode-first, judge-familiarity-second order matters**: explicitly counter the instinct to judge a word "unknown" from its printed appearance alone before actually attempting to decode it.
- **Vocabulary gaps discovered here are valuable data, not failures**: frame TA-4's true-vocabulary-gap identification as diagnostic and useful — flagging words for future vocabulary instruction — rather than a deficiency to feel bad about.
- **Higher true-vocabulary-gap rate expected for English learners**: for S9 learners with a still-developing spoken English vocabulary, anticipate more words falling into the "decoded but genuinely unknown" category rather than the "recognition gap, now closed" category — this is a normal, expected pattern reflecting vocabulary size rather than a decoding or recognition-skill deficiency.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.vocab.word-recognition |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonics.decoding-fluency ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — foundational |
| V-4 | bloom level matches KG | PASS — remember |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-DECODING-EQUALS-RECOGNIZING-MEANING, MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (decoding fluency readiness) |
| V-10 | Concrete anchor present [P06] | PASS — decode-then-recognize check |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/vocab domain always concrete/visual) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — decoding/recognition separability, decode-first ordering, gap-as-data framing, EL vocabulary-gap expectation |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
