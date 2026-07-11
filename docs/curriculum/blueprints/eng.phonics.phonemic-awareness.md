# Teaching Blueprint: Phonemic Awareness
**Blueprint ID:** eng.phonics.phonemic-awareness  
**Status:** PACKAGE_READY  
**Date:** 2026-07-11  
**Framework Version:** Educational Brain v1.0  

---

## 0. Concept Profile

```
id:                  eng.phonics.phonemic-awareness
name:                Phonemic Awareness
domain:              english / phonics
bloom:               remember
difficulty:          1 (foundational)
mastery_threshold:   0.85
estimated_hours:     3
requires:            []
unlocks:             [eng.phonics.letter-sound-correspondence,
                      eng.phonics.blending-segmenting]
cross_links:         [eng.phonics.letter-sound-correspondence]
cpa_entry_stage:     C
```

**Core idea:** Phonemic awareness is the ability to hear, identify, and manipulate individual phonemes — the smallest units of sound in spoken language — without reference to print. A student with phonemic awareness can say that "cat" contains three phonemes (/k/ /æ/ /t/), can blend /d/ /ɒ/ /g/ into "dog", can delete /k/ from "cat" to produce "at", and can substitute /b/ for /k/ to produce "bat". No letters are involved at any point. Phonemic awareness is the auditory-oral precondition for learning letter-sound correspondence (phonics).

**The foundational insight students must reach:** Words are made of individual sounds (phonemes) that can be counted, isolated, blended, and rearranged — all without seeing any letters.

**Key vocabulary:** phoneme, phoneme isolation, phoneme blending, phoneme segmentation, phoneme deletion, phoneme substitution, syllable (as contrast), minimal pair.

**Why difficulty = 1:** The concept of a phoneme (smallest sound unit) is simple but requires a perceptual shift — students must stop hearing words as wholes and start hearing them as sequences of discrete sounds. Once the perceptual shift occurs, all six phoneme skills follow from the same principle.

**CPA entry:** Always C for english/phonics domain — physical tapping, clapping, Elkonin boxes, counters, and body-anchored movement are the required concrete entry for all phoneme work. No abstract notation (P08) appears in this blueprint.

**Scope boundary:** This blueprint is entirely oral. No letters appear in any protocol. Letter-sound correspondence (grapheme-phoneme mapping) is a downstream concept (eng.phonics.letter-sound-correspondence). A student who demonstrates phonemic awareness without any letter knowledge has fully mastered this concept.

---

## 1. Learning Objective

Given any spoken CVC or CCVC word:

(a) the student correctly isolates the initial, medial, and final phonemes;  
(b) the student correctly counts the phonemes (distinguishing phoneme-count from syllable-count);  
(c) the student correctly blends three or four spoken phonemes into the target word;  
(d) the student correctly segments a spoken word into its constituent phonemes in sequence;  
(e) the student correctly deletes a named phoneme and produces the resulting spoken word;  
(f) the student correctly substitutes a named phoneme and produces the resulting spoken word.

**Accuracy threshold:** 85% (aligned with mastery_threshold for foundational phonics).

---

## 2. Student State Matrix

| State | Entry Condition | Protocol |
|-------|----------------|----------|
| S0 | Cannot isolate initial phoneme; treats words as undivided sound units | Protocol A — full phoneme skills sequence, 5 TAs |
| S1 | Isolates initial phoneme correctly; cannot isolate medial/final; cannot segment fully | Protocol B — position extension and manipulation, 4 TAs |
| S2 | Carries identified misconception (MC-1, MC-2, MC-3, and/or MC-4) | Protocol C — MAMR repair, 3–5 TAs |
| S6 | Partial phoneme awareness; low confidence; refuses attempts without reassurance | Protocol D — scaffolded practice with gradual release, 4 TAs |
| S9 | Second-language learner; L1 phoneme inventory differs; substitutes or merges phonemes | Protocol E — explicit contrast and minimal pairs, 4 TAs |

---

## 3. Diagnostic Battery

---

**DB-1 — Phoneme Isolation (Initial)**

Stimulus: "Say just the very first sound in the word 'map'. Don't say the whole word — just the first sound."

Response taxonomy:
```
{ stimulus: "/m/ — any clear approximation of the initial phoneme",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "/m/ produced but student adds a vowel off-glide ('muh')",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Says 'em' (letter name), repeats whole word 'map', or gives syllable 'ma-'",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response or 'I don't know what a sound is'",
  signal: "SIGNAL:NO_RESPONSE" }
```

SIGNAL:CORRECT → run DB-2  
SIGNAL:PARTIAL → candidate for S1; run DB-2  
SIGNAL:INCORRECT → S0 → Protocol A  
SIGNAL:NO_RESPONSE → S0 → Protocol A

---

**DB-2 — Phoneme Counting**

Stimulus: "I'll say a word. Count how many individual sounds you hear — no letters, just sounds with your ears: 'fish'."

Expected: 3 (/f/ /ɪ/ /ʃ/)

Response taxonomy:
```
{ stimulus: "3",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "2 — two-unit split ('fi' + 'sh')",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "1 — treats the whole word as one unit (syllable confusion)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "4 — counting letters f-i-s-h",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }
```

SIGNAL:CORRECT → run DB-3  
SIGNAL:PARTIAL → run DB-3 for segmentation check  
SIGNAL:INCORRECT (MC-1) → Protocol C, prioritise MC-1 repair  
SIGNAL:INCORRECT (MC-2) → Protocol C, check MC-1 first per MAMR, then MC-2

---

**DB-3 — Phoneme Blending**

Stimulus: "I'll say sounds slowly, one at a time. Blend them into one word: /d/ … /ɒ/ … /g/."

Response taxonomy:
```
{ stimulus: "'dog'",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Plausible blend with one phoneme mispronounced (e.g. 'dob')",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Repeats phonemes separately without joining; or tries to spell",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

SIGNAL:CORRECT → run DB-4  
SIGNAL:INCORRECT or NO_RESPONSE → S0 → Protocol A

---

**DB-4 — Phoneme Segmentation**

Stimulus: "Now the opposite. Say the word 'pen' stretched out — say each separate sound in order."

Response taxonomy:
```
{ stimulus: "/p/ /e/ /n/ — in order, with brief pause between each",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Gives correct phonemes but wrong order or misses one",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Spells 'p-e-n', gives syllables, or repeats 'pen' without segmenting",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

SIGNAL:CORRECT → DB-4 medial follow-up (below)  
SIGNAL:INCORRECT + DB-3 CORRECT → MISCONCEPTION:MC-4 signal → Protocol C, MC-4 repair  
SIGNAL:NO_RESPONSE → S0 → Protocol A

**DB-4 medial follow-up (S1 candidates only):**  
Stimulus: "What is the middle sound in 'bit'?"  
Expected: /ɪ/  
Correct → S1 confirmed → Protocol B  
Incorrect → S1 confirmed (initial phoneme only) → Protocol B

---

## 4. Prerequisite Check

**requires: []** — Phonemic awareness is the most foundational phonics concept in this KG. No curriculum prerequisite exists.

**Attentional baseline (non-curriculum):** If a student cannot attend to spoken words for ≥5 continuous seconds during DB-1, pause and address attention before beginning. This is a clinical observation, not a curriculum gate.

**Note on sequencing:** This blueprint is upstream of eng.phonics.letter-sound-correspondence. A student who begins here without prior phonics instruction is in the correct place. Letter knowledge (alphabet names) is helpful but not required — this entire blueprint is oral.

---

## 5. Protocol Library

---

### Protocol A — S0 Complete Novice (5 TAs, single session)

*Session cap: estimated_hours=3 ≥ 1h → max 7 TAs. 5 TAs appropriate for bloom=remember and first phoneme exposure.*  
*CPA path: Concrete throughout (english/phonics domain — no P/A progression).*

---

**TA-A01 — What Is a Phoneme? (Concrete Tapping)**

Primitive sequence: `P01 → P04 → P06 → P41 → P55 → P49 | P50 | P52 | P54 → P34 → P55 → P49 | P50 | P52`

`P01` target_element: teacher models phoneme tapping with concrete words  
"Listen. I'll say a word in slow motion: /s/ … /ʌ/ … /n/. That word is 'sun'. The three separate sounds — /s/, /ʌ/, /n/ — are called phonemes. Every spoken word is built from phonemes."

`P04` context: "Today we practise hearing phonemes — the individual sounds inside spoken words. No letters, no reading. Just listening and speaking."

`P06` concrete_materials: tap one finger on the desk for each phoneme  
"Watch: 'sun' — /s/ [tap] /ʌ/ [tap] /n/ [tap]. Three taps. Three phonemes. I'll do 'hat' too: /h/ [tap] /æ/ [tap] /t/ [tap]. Three phonemes."

`P41` diagnostic_question: "Your turn. Say 'dog' in slow motion and tap once for each phoneme you hear. How many taps?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "3 taps — /d/ /ɒ/ /g/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "3 taps but one phoneme labelled incorrectly (e.g. long /o/ instead of /ɒ/)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "1 tap (whole word as one unit) or 2 taps (syllable split)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "No attempt or 'I don't know what a sound is'",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Three taps — three phonemes: /d/, /ɒ/, /g/. You're hearing the sounds."  
`P50` INCORRECT: "A phoneme is one single sound. Let's count together: /d/–tap–/ɒ/–tap–/g/–tap. Three separate sounds — three taps. Try with 'bus'."  
`P52` PARTIAL: "The sounds are /d/ /ɒ/ /g/ — short 'o' as in 'hot'. Good tapping — keep that method." → proceed  
`P54` NO_RESPONSE → `P35`: "How many times did my finger tap when I said 'sun' slowly?" → `P55` → proceed

`P34` closed: "How many phonemes in the word 'sun'?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "3",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "2 or 4",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "1 (whole word) or names letters",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Exactly — /s/ /ʌ/ /n/: three phonemes."  
`P50` INCORRECT or NO_RESPONSE: "Say each sound with me: /s/–tap–/ʌ/–tap–/n/–tap. Three taps: three phonemes."  
`P52` PARTIAL: "Close — tap each one: /s/ /ʌ/ /n/. Three sounds."

---

**TA-A02 — Phoneme Segmentation with Elkonin Boxes**

Primitive sequence: `P02 → P06 → P34 → P55 → P49 | P50 | P52 | P54 → P34 → P55 → P49 | P50 | P52 → P42 → P55 → P49 | P50 | P53`

`P02` activate: "You counted phonemes by tapping. Now we use boxes to hold each phoneme."

`P06` concrete_materials: Elkonin sound boxes — connected squares, one per phoneme  
"Watch: I say 'cat' and slide one counter into each box: /k/ → box 1, /æ/ → box 2, /t/ → box 3. Three phonemes — three boxes. Each box holds exactly one phoneme."

`P34` closed: "Slide a counter for each sound in 'mat'. How many boxes?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "3 boxes — /m/ /æ/ /t/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Slides 3 counters but one is placed for a syllable chunk not a phoneme",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "1 box (whole word) or 2 boxes (syllable split 'ma' + 't')",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Three boxes — /m/, /æ/, /t/. One phoneme per box."  
`P50` INCORRECT: "A phoneme is smaller than a syllable. 'Mat' has one syllable but three phonemes. Say each sound and slide a counter: /m/–slide–/æ/–slide–/t/–slide." → retry  
`P52` PARTIAL: "Good count — make sure each counter slides in on exactly one sound." → proceed  
`P54` NO_RESPONSE: "Let's do it together — say each sound and I'll slide with you." → model → retry

`P34` second: "Now 'ship'. Push one counter per sound. How many?"  
(Note: 'ship' = /ʃ/ /ɪ/ /p/ — 3 phonemes; 4 letters.)  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "3 — /ʃ/ /ɪ/ /p/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "3 but treats 'sh' as two separate sounds",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "4 — counting letters s-h-i-p",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Three — /ʃ/ /ɪ/ /p/. Even though 'ship' has four letters, it has only three phonemes."  
`P50` INCORRECT (MC-2): "We're counting sounds we hear, not letters we see. Say 'ship' slowly and listen: /ʃ/ /ɪ/ /p/ — three sounds. [MC-2 logged; MAMR requires MC-1 cleared first before repair — log and continue.]"  
`P52` PARTIAL: "'sh' together is one sound: /ʃ/. One counter for those two letters." → proceed  
`P54` NO_RESPONSE: "Say 'ship' aloud slowly — count each sound as it comes out." → retry

`P42` example_generation: "Give me a word with exactly two phonemes."  
(e.g., 'at' /æ//t/, 'is' /ɪ//z/, 'up' /ʌ//p/, 'oh' /əʊ/)  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Valid two-phoneme word (at, is, up, oh, in, it…)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Three-phoneme word given (e.g. 'cat')",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Names a letter or gives a word with 4+ phonemes",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Yes — two phonemes."  
`P50` INCORRECT: "A word like 'at' — /æ/ and /t/ — has two phonemes. Try again."  
`P53` PARTIAL: "That word has three phonemes — can you think of a shorter one?" → retry  
`P54` NO_RESPONSE: "Think of a very short word — one vowel and one other sound." → retry

---

**TA-A03 — Phoneme Identification and Blending**

Primitive sequence: `P02 → P16 → P34 → P55 → P49 | P50 | P52 | P54 → P14 → P34 → P55 → P49 | P50 | P52 | P54`

`P02` activate: "You can segment words. Now: identify a shared phoneme across words, and blend phonemes into a word."

`P16` comparison: "Listen to three words: 'bat' … 'bus' … 'big'. Different endings, different middles. What phoneme appears at the start of all three?"

`P34` closed: "What sound begins 'bat', 'bus', and 'big'?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "/b/ — any clear approximation",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Says 'b' (letter name) or 'bee'",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Names a different phoneme or says 'they start the same' without producing the sound",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "/b/ — that phoneme lives at the start of all three."  
`P50` INCORRECT: "'Bat', 'bus', 'big' — all begin with /b/ — feel your lips pop together."  
`P52` PARTIAL: "/b/ is the sound; 'b' is the letter name. The sound is /b/ — lips together, then pop."  
`P54` NO_RESPONSE → `P35`: "What does your mouth do at the very start of 'bat'?" → `P55` → proceed

`P14` prediction: "I'll say sounds one at a time. Blend them into one word: /p/ … /ɪ/ … /g/."  
`P34` closed: "What word do /p/ /ɪ/ /g/ make when blended?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "'pig'",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Plausible blend with one phoneme wrong (e.g. 'peg')",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Repeats phonemes separately without blending; or tries to spell",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Exactly — /p/ /ɪ/ /g/ blend into 'pig'."  
`P50` INCORRECT: "Say the sounds faster and faster until they join: /p/–/ɪ/–/g/ … /p-ɪ-g/ … 'pig'."  
`P52` PARTIAL: "/ɪ/ is the short 'i' as in 'bit'. 'Pig' not 'peg'."  
`P54` NO_RESPONSE: "Any guess is fine. What word could /p/ /ɪ/ /g/ be?" → `P55`

---

**TA-A04 — Phoneme Manipulation: Deletion and Substitution**

Primitive sequence: `P02 → P92 → P34 → P55 → P49 | P50 | P52 | P54 → P34 → P55 → P49 | P50 | P52 → P54 → P59 → P55 → P49 | P52 | P53`

`P02` activate: "You can blend and segment. Now watch what happens when we move a phoneme."

`P92` thought_experiment: "Say 'cat' slowly. Imagine you snip off the /k/ at the very start. What sound is left?"

`P34` closed: "Say 'cat' without the first sound /k/."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "'at'",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'/æ/' alone — only the vowel, missing /t/",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "'hat' or 'bat' — substituted instead of deleted",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "'At' — you removed /k/ and the word changed. Phonemes are the building blocks."  
`P50` INCORRECT: "Segment: /k/ /æ/ /t/. Remove the first one — /k/ disappears. What's left? /æ/ /t/ — say those: 'at'."  
`P52` PARTIAL: "Almost — 'at' not just '/æ/'. Both /æ/ and /t/ stay: 'at'."  
`P54` NO_RESPONSE → `P35`: "Try saying the word without making the /k/ sound at all. What comes out?" → `P55` → `P52`

`P34` closed: "Now change the /k/ in 'cat' to /b/. What new word?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "'bat'",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'bat' with wrong vowel (e.g. 'bit') — substitution direction correct",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "'cat' unchanged or a completely unrelated word",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Exactly — swap /k/ for /b/ and 'cat' becomes 'bat'. Middle and final phonemes stay."  
`P50` INCORRECT: "Keep /æ/ and /t/, replace only the first sound: /b/ instead of /k/ → 'bat'."  
`P52` PARTIAL: "The vowel is /æ/ as in 'cat', so /b/ + /æ/ + /t/ = 'bat'."  
`P54` NO_RESPONSE: "Start 'cat' with /b/ instead of /k/. What word?" → `P55`

`P54` productive_struggle: "Next I'll ask you to explain. A rough attempt is exactly what I want."

`P59` self_explanation: "In your own words — what is a phoneme?"  
`P55` wait: 10 s

Response taxonomy:
```
{ stimulus: "Explains 'a single sound in a word' or accurate paraphrase",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Vague but oral ('a part of a word you say')",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Letter-based ('a letter') or 'a syllable'",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Exactly — the smallest individual sound in a spoken word."  
`P52` INCORRECT: "A phoneme is a sound, not a letter or syllable. You hear phonemes; you see letters. Try again."  
`P53` PARTIAL: "What makes a phoneme smaller than a syllable? Add that to your answer."  
`P54` NO_RESPONSE → `P35`: "What's the difference between the word 'cat' and the sounds /k/ /æ/ /t/?" → `P55`

---

**TA-A05 — Mastery Gate (P91 Terminal)**

Primitive sequence: `P02 → P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78 → P55`

`P02` activate: "Five check questions. Speak all answers aloud — no writing."

`P77` generation_probe: "Give me three words that end with the phoneme /t/."  
`P55` wait: 10 s

Response taxonomy:
```
{ stimulus: "Three valid words ending in /t/ (cat, sit, but, hot, mat, put…)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "One or two valid words ending in /t/",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Zero valid words or words ending in a different phoneme",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P76` transfer_probe: "I'll say a made-up word you've never heard. Segment it into phonemes: 'bim'."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "/b/ /ɪ/ /m/ — three phonemes listed",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Correct count (3) but incorrect phoneme labels",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Wrong count (1, 2, or 4) or refuses because word is unfamiliar",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

*P76 independence note: 'bim' is a nonsense word. No cross-linked blueprint (eng.phonics.letter-sound-correspondence) needs to be authored first. The item tests phoneme segmentation in isolation from vocabulary and print knowledge — fully self-contained.*

`P75` boundary_probe: "True or false: the word 'street' has 4 phonemes."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "False — it has 5: /s/ /t/ /r/ /iː/ /t/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "False (correct verdict) but wrong count or no explanation",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "True — accepts 4",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P74` classification_probe: "I'll describe a sound change: 'cat' → 'at'. Was that phoneme deletion or phoneme substitution?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Deletion (or 'removed', 'took away', 'snipped off')",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'Changed' or 'modified' — correct direction but imprecise label",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Substitution — confused deletion with replacement",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P78` explanation_probe: "In one sentence: explain the difference between a phoneme and a syllable."  
`P55` wait: 10 s

Response taxonomy:
```
{ stimulus: "Captures: phoneme = one sound; syllable = chunk/beat; one syllable can contain multiple phonemes",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Partially correct — e.g. 'a phoneme is smaller' without explaining why",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Conflates the two; says they are the same; or gives a letter-based answer",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

**Mastery decision:**  
5 CORRECT (≥85%) → MASTERY_CONFIRMED; schedule Component 9 retrieval  
4 CORRECT or 3 CORRECT + 2 PARTIAL → `P68`: "Which question felt shakiest?" → targeted re-practice → re-gate  
≤3 CORRECT → `P64` + route to weakest TA for re-practice → full re-gate

---

### Protocol B — S1 Procedural Carrier (4 TAs)

*Entry condition: DB-1 CORRECT; DB-4 medial follow-up incorrect or full segmentation weak.*  
*Goal: Extend initial phoneme isolation to medial/final coverage and full manipulation.*

---

**TA-B01 — Medial Vowel Isolation**

Primitive sequence: `P01 → P16 → P34 → P55 → P49 | P50 | P52 | P54 → P34 → P55 → P49 | P50 | P52`

`P01` target_element: minimal word pairs differing only in medial vowel  
"You can already hear the first sound. Today we listen for the middle sound — the vowel inside the word."

`P16` comparison: "Listen to 'cat' and 'cut'. First sound: same — /k/. Last sound: same — /t/. Middle sound: /æ/ in 'cat', /ʌ/ in 'cut'. That middle phoneme changes the meaning."

`P34` closed: "What is the middle sound in 'bit'?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "/ɪ/ — short i as in 'itch'",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Produces a vowel phoneme but wrong one (/e/ or /æ/)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Says 'i' (letter name) or repeats whole word",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "/ɪ/ — the vowel phoneme in 'bit'."  
`P50` INCORRECT: "Say 'bit' slowly: /b/ … /ɪ/ … /t/. The middle sound is sandwiched between /b/ and /t/ — it's /ɪ/."  
`P52` PARTIAL: "The short 'i' sound is /ɪ/ — as in 'itch', not 'eye'. Feel the short vowel." → proceed  
`P54` NO_RESPONSE → `P35`: "What vowel sound is caught between the /b/ and /t/ in 'bit'?" → `P55`

`P34` second: "Middle sound in 'hop'?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "/ɒ/ — short o",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "A vowel phoneme but wrong one (e.g. /ʌ/)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Names letter 'o' or repeats whole word",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "/ɒ/ — the vowel in 'hop'."  
`P50` INCORRECT: "Tap: /h/–/ɒ/–/p/ — the middle tap is /ɒ/."  
`P52` PARTIAL: "Short o is /ɒ/ as in 'hot'." → proceed  
`P54` NO_RESPONSE → `P35`: "Try tapping three times for 'hop' — what sound goes in the middle?" → `P55`

---

**TA-B02 — Final Phoneme Isolation and Full Segmentation**

Primitive sequence: `P02 → P34 → P55 → P49 | P50 | P52 | P54 → P06 → P34 → P55 → P49 | P50 | P52`

`P02` activate: "First sound, middle sound — now the last phoneme in the word."

`P34` closed: "What is the last sound in 'bus'?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "/s/ or near-voiceless approximation",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "/z/ — voiced cognate, close approximation",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Says letter 's' or repeats whole word",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "/s/ — the final phoneme in 'bus'."  
`P50` INCORRECT: "Say 'bus' slowly: /b/ /ʌ/ /s/ — the last sound that ends the word is /s/."  
`P52` PARTIAL (/z/): "Close — /s/ is unvoiced. Good phoneme awareness." → proceed  
`P54` NO_RESPONSE: "Stretch out 'bus' and stop at the very last sound." → `P55` → proceed

`P06` concrete: "Full segmentation now. Say 'jump' with one tap per phoneme."  
[Expected: /dʒ/ /ʌ/ /m/ /p/ — 4 phonemes]  
"Model: 'jump' — /dʒ/–tap–/ʌ/–tap–/m/–tap–/p/–tap — four phonemes."

`P34` closed: "How many phonemes in 'jump'?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "4 — /dʒ/ /ʌ/ /m/ /p/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "3 or 5 — miscounting the affricate /dʒ/ or final cluster",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "1 or 2 — major undercounting",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Four phonemes — /dʒ/ counts as one, even though it feels like two."  
`P50` INCORRECT: "Tap with me: /dʒ/–tap–/ʌ/–tap–/m/–tap–/p/–tap. Count your taps."  
`P52` PARTIAL: "/dʒ/ is one phoneme — a single sound from tongue and throat together." → proceed  
`P54` NO_RESPONSE → `P35`: "Say 'jump' as slowly as you can — tap for every separate sound." → `P55`

---

**TA-B03 — Phoneme Manipulation: CCVC Words**

Primitive sequence: `P02 → P34 → P55 → P49 | P50 | P52 | P54 → P34 → P55 → P49 | P50 | P52 → P54 → P45 → P55 → P49 | P50 | P53`

`P02` activate: "You can segment CVC words. Now manipulation on longer words."

`P34` closed: "Say 'flat' without the /l/."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "'fat' (/f/ /æ/ /t/)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Partial deletion — says 'fla-' without completing",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "'lat' (deleted /f/ instead) or 'flat' unchanged",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "'Flat' without /l/ is 'fat'. /f/ stays; /l/ removed; /æ/ /t/ stay."  
`P50` INCORRECT: "Segment: /f/ /l/ /æ/ /t/. The /l/ is the second sound. Remove it — /f/ stays, /l/ goes, /æ/ /t/ stay: 'fat'."  
`P52` PARTIAL: "You need to remove /l/ completely and keep the rest: 'fat'." → retry  
`P54` NO_RESPONSE: "Say each sound in 'flat' and find /l/ — then say the word without it." → `P55`

`P34` closed: "Change /f/ in 'flat' to /s/. What word?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "'slat'",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'slat' with wrong vowel or final consonant",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "'flat' unchanged or completely different word",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "'Slat' — /f/ replaced by /s/, everything else stays."  
`P50` INCORRECT: "Keep /l/ /æ/ /t/ exactly. Only the first sound changes from /f/ to /s/: 's'+'lat' = 'slat'."  
`P52` PARTIAL: "Check each phoneme: /s/ /l/ /æ/ /t/ = 'slat'." → proceed  
`P54` NO_RESPONSE: "'Flat' starting with /s/ instead of /f/. What word?" → `P55`

`P54` productive_struggle: "Next: invent your own puzzle. Creativity counts — anything goes."

`P45` problem_construction: "Create a phoneme substitution puzzle for me. Start with a real word, swap one phoneme, and tell me the new word."  
`P55` wait: 10 s

Response taxonomy:
```
{ stimulus: "Valid substitution with correct source word and correct resulting word",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Valid attempt but resulting word is unclear or non-standard",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Letter-based change ('change the letter a to b') — not phoneme-level",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "[Echo back the puzzle.] That's phoneme substitution."  
`P50` INCORRECT: "We're working with sounds, not letters. Try again with phonemes."  
`P53` PARTIAL: "Let's verify each phoneme in your new word to confirm it works." → `P55`  
`P54` NO_RESPONSE: "Start with 'cat'. Change one sound — any sound. What do you get?" → `P55`

---

**TA-B04 — Mastery Gate (P91 Terminal)**

Primitive sequence: `P02 → P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78 → P55`

`P02 → P91` — same five-probe sequence as TA-A05. Scored identically. Mastery decision identical.

---

### Protocol C — S2 Misconception Carrier (3–5 TAs)

*MAMR order: MC-1 foundational for MC-2 — repair MC-1 first. MC-3 and MC-4 are independent.*

---

**TA-C01 — MC-1 Repair: Phonemes ≠ Syllables**

*Entry: MISCONCEPTION:MC-1 signal from DB-2 or P41 in Protocol A.*

Primitive sequence: `P02 → P26 → P28 → P29 → P30 → P31 → P34 → P55 → P49 | P50 | P52 → P32`

`P02` activate: "Let's look carefully at something that gets confused."

`P26` schema_activation: "You said 'butter' has two sounds. Walk me through how you counted."

`P28` cognitive_conflict: "Watch — I clap for each syllable: 'but-ter' — CLAP–CLAP. Two claps. Now I tap for each phoneme: /b/–/ʌ/–/t/–/ə/–/r/ — five taps. Two claps, five taps. Both from the same word. How can one word have two of one thing and five of another?"

`P29` conflict_resolution_pause: "Here's the key: a syllable is a rhythmic chunk — a beat you clap to music. A phoneme is one tiny single sound — the smallest piece. They are different things and are counted differently."

`P30` bridge_construction: "The syllable 'but' contains three phonemes: /b/ /ʌ/ /t/. The syllable 'ter' contains two: /t/ /ə/. Five phonemes inside two syllables."

`P31` schema_replacement: "From now on: phoneme = one sound (tap). Syllable = rhythmic beat (clap). Same word, different ways of counting."

`P34` closed: "How many phonemes in 'open'? Count sounds one tap each — not syllables."  
[Expected: 4 — /əʊ/ /p/ /ə/ /n/]  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "4 phonemes",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "3 — miscounting one phoneme",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "2 — still counting syllables ('o-pen')",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Four phonemes in two syllables — different counts, same word."  
`P50` INCORRECT: "Still two — that's the syllable count. Phonemes: /əʊ/ /p/ /ə/ /n/ — tap each: four taps." → retry  
`P52` PARTIAL: "Almost — tap: /əʊ/–/p/–/ə/–/n/ — four." → proceed  
`P54` NO_RESPONSE: "Tap with me: /əʊ/–/p/–/ə/–/n/. Count taps." → `P55` → proceed

`P32` schema_consolidation: "Say 'happy' — how many claps (syllables)? How many taps (phonemes)?"  
[Expected: 2 claps; 4 taps: /h/ /æ/ /p/ /i/]  
→ Both correct → MC-1 resolved; route to MC-2 check if flagged, else TA-C05.  
→ Either incorrect → repeat P30–P31 with a new word pair before proceeding.

---

**TA-C02 — MC-2 Repair: Phoneme Count ≠ Letter Count**

*Pre-condition: MC-1 resolved per MAMR.*  
*Entry: MISCONCEPTION:MC-2 signal from DB-2 or TA-A02 response taxonomy.*

Primitive sequence: `P02 → P26 → P28 → P29 → P30 → P31 → P34 → P55 → P49 | P50 | P52 → P32`

`P02` activate: "Now we look at sounds versus letters — they don't always match."

`P26` schema_activation: "You said 'ship' has four sounds. Tell me which four you heard."

`P28` cognitive_conflict: "Here is the word 'ship' written: s-h-i-p. Four letters. Now cover it. Say 'ship' aloud. How many sounds came out? /ʃ/ — one … /ɪ/ — two … /p/ — three. Three sounds from four letters."

`P29` conflict_resolution_pause: "The letters 's' and 'h' work together to make one sound: /ʃ/. Two letters — one phoneme. Sometimes two (or more) letters combine to represent a single phoneme. So 'ship' has four letters but only three phonemes."

`P30` bridge_construction: "Phonemes live in spoken words. Letters live on paper. Always count what you hear, not what you see."

`P31` schema_replacement: "New rule: count sounds in your ears — not letters on the page."

`P34` closed: "Without looking at any letters — how many phonemes in 'chat'?"  
[Expected: 3 — /tʃ/ /æ/ /t/]  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "3 — /tʃ/ /æ/ /t/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "3 but unsure whether /tʃ/ is one or two sounds",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "4 — counting letters c-h-a-t",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Three phonemes — /tʃ/ counts as one, even though 'ch' is two letters."  
`P50` INCORRECT: "Don't look at letters. Say 'chat' and listen: /tʃ/–/æ/–/t/ — three sounds." → retry  
`P52` PARTIAL: "/tʃ/ is one phoneme — the 'ch' sound. You're on the right track." → proceed  
`P54` NO_RESPONSE: "Say 'chat' aloud and tap once per sound you actually make." → `P55` → proceed

`P32` schema_consolidation: "How many phonemes in 'phone'?" [3: /f/ /əʊ/ /n/ — 5 letters, 3 phonemes]  
→ 3 → MC-2 resolved; route to MC-3 check if flagged, else TA-C05.  
→ 5 → repeat P30: "Letter count ≠ phoneme count. Say it, hear it, count it." → retry.

---

**TA-C03 — MC-3 Repair: Medial and Final Phonemes Are Salient**

*Entry: MISCONCEPTION:MC-3 signal — correct initial isolation; fails medial/final position.*

Primitive sequence: `P02 → P26 → P33 → P16 → P34 → P55 → P49 | P50 | P52 | P54 → P34 → P55 → P49 | P50 | P52 → P32`

`P02` activate: "You hear the first sound well. Let's extend that to every position in the word."

`P26` schema_activation: "When I asked for the middle sound in 'bit', you weren't sure. What happens when you listen past the first sound?"

`P33` discrimination_training: "Three words that share the same last phoneme: 'cat' … 'bat' … 'mat'. First sounds differ — /k/, /b/, /m/. But listen to the end: 'cat'–/t/ … 'bat'–/t/ … 'mat'–/t/. The final phoneme /t/ is identical across all three. Every position holds a distinct phoneme."

`P16` comparison: "Compare 'bit' and 'bat'. First sounds: same — /b/. Last sounds: same — /t/. Only the middle phoneme differs: /ɪ/ in 'bit', /æ/ in 'bat'. That middle phoneme changed the meaning."

`P34` closed: "Middle phoneme of 'hop'?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "/ɒ/ — short o",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "A vowel phoneme but wrong one",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Says initial /h/ or whole word 'hop'",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "/ɒ/ — the vowel in 'hop'."  
`P50` INCORRECT: "'Hop' → /h/ /ɒ/ /p/ — what's sandwiched between /h/ and /p/?"  
`P52` PARTIAL: "The vowel is /ɒ/ — short as in 'hot'. You're hearing the middle position." → proceed  
`P54` NO_RESPONSE → `P35`: "Tap: /h/–/ɒ/–/p/. The middle tap — what sound is it?" → `P55`

`P34` closed: "Final phoneme of 'drum'?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "/m/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "/ʌm/ — vowel + final, cannot isolate final alone",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Says /d/ (initial) or repeats 'drum'",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "/m/ — the last phoneme of 'drum'."  
`P50` INCORRECT: "Segment: /d/ /r/ /ʌ/ /m/ — the final sound is /m/."  
`P52` PARTIAL: "Isolate just /m/ — the last tap." → proceed  
`P54` NO_RESPONSE: "Say 'drum' and cut off the last sound. Name it." → `P55`

`P32` schema_consolidation: "Phonemes live at the start, middle, and end of words. All positions carry meaning."  
→ Route to MC-4 check if flagged, else TA-C05.

---

**TA-C04 — MC-4 Repair: Blending and Segmenting Are Different Skills**

*Entry: MISCONCEPTION:MC-4 signal — DB-3 CORRECT and DB-4 INCORRECT (or vice versa).*

Primitive sequence: `P02 → P26 → P17 → P06 → P34 → P55 → P49 | P50 | P52 | P54 → P32`

`P02` activate: "You blend well. Now the opposite direction — segmenting."

`P26` schema_activation: "You blended /d/ /ɒ/ /g/ into 'dog'. When I asked you to segment 'pen', what happened?"

`P17` contrast: "Blending: I give you phonemes → you combine them into a word. Segmenting: I give you a word → you pull it apart into phonemes. Same raw material — opposite directions. These are two distinct skills."

`P06` concrete: "Elkonin boxes: I reveal counters one at a time — you say the phoneme — then blend. [Demonstrate: reveal counter 1 → /k/; counter 2 → /æ/; counter 3 → /t/ → 'cat'.]  
Now the reverse: I say 'cat' — you slide one counter per phoneme into the boxes."  
Student segments 'cat' with counters: /k/–slide–/æ/–slide–/t/–slide.

`P34` closed: "Segment 'dog' — how many phonemes and what are they?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "/d/ /ɒ/ /g/ — three phonemes in order",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Correct count but wrong phoneme order",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Blends instead — says 'dog' as a whole rather than segmenting",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "/d/ /ɒ/ /g/ — three phonemes in sequence. Segmentation done."  
`P50` INCORRECT: "You said the word — that's blending. Now separate 'dog' into its sounds one by one." → retry with counters  
`P52` PARTIAL: "Good count — say them in order from beginning to end." → proceed  
`P54` NO_RESPONSE: "Tap once per sound in 'dog' and say the sound as you tap." → `P55` → proceed

`P32` schema_consolidation: "Blending and segmenting are two different skills. You now have both."  
→ Route to TA-C05.

---

**TA-C05 — Post-Repair Mastery Gate (P91 Terminal)**

Primitive sequence: `P02 → P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78 → P55`

`P02 → P91` — same five-probe sequence as TA-A05. Scored identically.

---

### Protocol D — S6 Low Confidence (4 TAs)

*Entry: Student has phoneme awareness but refuses attempts without reassurance; frequent "I don't know" before trying.*  
*GR-5: No P28 in any Protocol D TA.*

---

**TA-D01 — Choral Tapping (Scaffolded)**

Primitive sequence: `P01 → P70 → P81 → P06 → P34 → P55 → P49 | P50 | P52 → P82`

`P01` target_element: physical tapping with teacher  
"We'll tap phonemes together. No wrong answers at this stage — just follow along."

`P70` competence_evidence: "You already know how to hear sounds — you've been doing it since you learned to talk. We're just practising noticing them consciously."

`P81` scaffolding: Teacher and student tap together in unison: "sun" — /s/–tap–/ʌ/–tap–/n/–tap. Repeat twice.

`P06` concrete: "Now you tap — I'll mouth the sounds silently with you." Student taps 'mat' with teacher mouthing silently.

`P34` closed: "How many taps for 'mat'?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "3",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "2 or 4 — close attempt",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "1 or refuses to answer",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Three — you heard all three phonemes. Your ear is working."  
`P50` INCORRECT: "I counted three too: /m/ /æ/ /t/. Let's try 'hot' together." → retry  
`P52` PARTIAL: "The three sounds are /m/ /æ/ /t/. Almost." → proceed  
`P54` NO_RESPONSE: "Any count is fine — just guess. How many times did we tap for 'sun'?" → `P55`

`P82` fading: Next word ('hot') — teacher provides no mouthing. Student taps alone. Offer brief encouragement: "You've got this."

---

**TA-D02 — Independent Isolation with Confidence Check**

Primitive sequence: `P02 → P54 → P34 → P55 → P49 | P50 | P52 → P64 → P35 → P55 → P49 | P52 | P53`

`P02` activate: "You can tap with support. Now you isolate phonemes on your own."

`P54` productive_struggle: "It's completely fine to be unsure. Say what you think the phoneme is, even if it's a guess. Guessing is part of learning."

`P34` closed: "First phoneme of 'green'?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "/g/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'/gr/' — two phonemes treated as one unit",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Letter name 'g' or repeats whole word",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt even after P54",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "/g/ — the first phoneme of 'green'."  
`P50` INCORRECT: "The first sound in 'green' is /g/ — just the very first one."  
`P52` PARTIAL: "Two phonemes: /g/ then /r/ separately. The very first one is /g/."  
`P54` NO_RESPONSE → `P35`: "What does your mouth do at the very start of 'green'? Any guess." → `P55`

`P64` confidence_calibration: "On a scale of 1–3, how sure were you about that answer?"

`P35` open: "What strategy would help you feel more confident hearing phonemes?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Names a concrete strategy — slow speech, tapping, listening eyes-closed",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Vague — 'practise more'",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Says nothing can help or 'I'm just bad at it'",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Great strategy — use it from now on."  
`P52` INCORRECT: "Phonemic awareness is a skill that improves with practice. Try: say the word very slowly and tap each sound."  
`P53` PARTIAL: "For example — say the word in slow motion and tap once per sound. Would that help?" → proceed  
`P54` NO_RESPONSE → `P35`: "Let's try slow speech. Say 'green' very slowly — what's the very first sound?" → `P55`

---

**TA-D03 — Phoneme Manipulation with Gradual Release**

Primitive sequence: `P02 → P81 → P34 → P55 → P49 | P50 | P52 | P54 → P82 → P34 → P55 → P49 | P50 | P52 → P68`

`P02` activate: "Phoneme deletion — first with support, then on your own."

`P81` scaffolding: "Say 'sand'. I'll segment with you: /s/ /æ/ /n/ /d/. Remove /s/ — what's left: /æ/ /n/ /d/ — say those: 'and'. You just deleted a phoneme. We did it together."

`P34` closed: "Now you try: say 'milk' without the /m/."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "'ilk'",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'ilk' with extra breath or softened — correct intent",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "'silk' — substituted /m/ with /s/; or 'milk' unchanged",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "'Ilk' — /m/ removed."  
`P50` INCORRECT: "Segment: /m/ /ɪ/ /l/ /k/. Take away /m/ only — don't replace it. /ɪ/ /l/ /k/ → 'ilk'."  
`P52` PARTIAL: "'Ilk' is the target. Very close." → proceed  
`P54` NO_RESPONSE: "Say 'milk' and stop yourself from making the /m/ sound. What comes out?" → `P55`

`P82` fading: "Now without me segmenting first."

`P34` closed: "Say 'best' without the /b/."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "'est'",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'/e/ /s/ /t/' — segmented not blended, but correct phonemes",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "'nest' or 'vest' — substituted; or 'best' unchanged",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "'Est' — /b/ removed independently."  
`P50` INCORRECT: "Remove /b/ only — /e/ /s/ /t/ stay: 'est'."  
`P52` PARTIAL: "Blend those sounds together: 'est'." → proceed  
`P54` NO_RESPONSE: "Start saying 'best' but don't make the /b/. What's left?" → `P55`

`P68` mastery_self_declaration: "Do you feel you can hear and move phonemes in words?"  
→ "Yes" → route to retrieval schedule.  
→ "Not yet" → identify shakiest skill; one targeted re-practice round.

---

**TA-D04 — Mastery Gate (P91 Terminal)**

Primitive sequence: `P02 → P70 → P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78 → P55`

`P70` before first probe: "You've been getting these right. Trust your ear."

Same five-probe sequence and scoring as TA-A05.

---

### Protocol E — S9 Second-Language Learner (4 TAs)

*Entry: L1 phoneme inventory differs from English; student substitutes or merges English phonemes.*  
*Focus: Contrastive articulatory awareness, minimal pair discrimination, counting despite phoneme unfamiliarity.*

---

**TA-E01 — L1 vs L2 Phoneme Inventory Contrast**

Primitive sequence: `P01 → P04 → P95 → P06 → P34 → P55 → P49 | P50 | P52 | P54`

`P01` target_element: spoken phoneme demonstration with visible articulation  
"Every language has its own set of phonemes. English has approximately 44. Your first language may have a different set."

`P04` context: "Some English phonemes may feel unfamiliar. That is expected — it means they are not in your first language's inventory. It does not mean you cannot learn them."

`P95` interpretive_frame: "When a phoneme feels strange or difficult, that is useful data — it marks an English phoneme your ear needs extra practice to distinguish. We use that information to focus our practice."

`P06` concrete_articulatory: Demonstrate with visible mouth position:  
"/θ/ (as in 'think'): tongue tip between front teeth, push air out. Not /t/, not /s/ — /θ/."  
"/ɪ/ (as in 'bit'): short, quick — not the long /iː/ of 'beat'."

`P34` closed: "Say the first phoneme of 'think'."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "/θ/ — any approximation with tongue between teeth",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "/θ/ attempt without clear dental contact",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "/t/, /d/, /s/, or /f/ — L1 substitution",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "/θ/ — you produced the English phoneme."  
`P50` INCORRECT: "For /θ/: tongue tip between front teeth, then push air. Try: /θ/."  
`P52` PARTIAL: "Good attempt — feel the tongue contacting teeth. A little more dental contact." → proceed  
`P54` NO_RESPONSE: "What happens when you put your tongue between your teeth and breathe out?" → `P55`

---

**TA-E02 — Minimal Pair Discrimination**

Primitive sequence: `P02 → P17 → P34 → P55 → P49 | P50 | P52 | P54 → P34 → P55 → P49 | P50 | P52`

`P02` activate: "Now we'll hear two similar phonemes and discriminate between them."

`P17` contrast: "Minimal pair: 'ship' … 'sip'. These two words differ in one phoneme — the first. 'Ship' begins /ʃ/ (lips rounded, tongue up). 'Sip' begins /s/ (lips apart, tongue near teeth). One phoneme — two completely different words."

`P34` closed: "Which word begins with /ʃ/: 'sheep' or 'seep'?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "'sheep'",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Hesitates but self-corrects to 'sheep'",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "'seep' — phoneme confusion",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "'Sheep' — /ʃ/ at the start."  
`P50` INCORRECT: "'Sheep' begins /ʃ/ — lips slightly rounded. 'Seep' begins /s/ — lips apart. Listen again and point."  
`P52` PARTIAL: "Good — trust that correction." → proceed  
`P54` NO_RESPONSE: "Say both aloud: 'sheep' … 'seep'. Which feels different in your mouth?" → `P55`

`P34` closed (production): "Say the word from that pair that begins with /s/."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "'seep' with /s/ clearly distinct from /ʃ/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'seep' with ambiguous /s/–/ʃ/ boundary",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "'sheep' — wrong word",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No attempt",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "/s/ — you discriminated the two phonemes."  
`P50` INCORRECT: "The /s/ word is 'seep' — tongue near top teeth, lips apart."  
`P52` PARTIAL: "Keep tongue closer to teeth for a cleaner /s/." → proceed  
`P54` NO_RESPONSE: "The /s/ word is 'seep'. Say it: 'seep'." → `P55`

---

**TA-E03 — Phoneme Segmentation with L1-Interference Words**

Primitive sequence: `P02 → P06 → P34 → P55 → P49 | P50 | P52 | P54 → P34 → P55 → P49 | P50 | P52`

`P02` activate: "Even if a phoneme is difficult to produce, you can still count and segment it."

`P06` concrete: "Tap for phonemes — even unfamiliar ones count as one tap."  
Model: "think" → /θ/–tap–/ɪ/–tap–/ŋ/–tap–/k/–tap → four phonemes.

`P34` closed: "How many phonemes in 'think'?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "4 — /θ/ /ɪ/ /ŋ/ /k/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "3 — undercount; likely merges /ŋ/ /k/ or misses /θ/",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "2 or fewer",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Four phonemes — including /θ/. You can count a phoneme even if it feels unusual."  
`P50` INCORRECT: "Tap with me: /θ/–/ɪ/–/ŋ/–/k/ — four taps. Even if /θ/ is new, it's one phoneme."  
`P52` PARTIAL: "Almost — all four need a tap. Which did you miss?" → proceed  
`P54` NO_RESPONSE: "Say 'think' very slowly and tap each separate sound." → `P55`

`P34` closed: "How many phonemes in 'three'?"  
[/θ/ /r/ /iː/ = 3]  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "3",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "2 — merging /θ/ /r/ into one",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "4 or more — letter counting",
  signal: "SIGNAL:INCORRECT" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` CORRECT: "Three — /θ/ /r/ /iː/."  
`P50` INCORRECT: "Three phonemes: /θ/–tap–/r/–tap–/iː/–tap."  
`P52` PARTIAL: "/θ/ and /r/ are separate phonemes — two taps for two sounds." → proceed  
`P54` NO_RESPONSE: "Tap with me for 'three'." → model → retry

---

**TA-E04 — Mastery Gate (P91 Terminal)**

Primitive sequence: `P02 → P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78 → P55`

`P02 → P91` — same five-probe sequence as TA-A05.

*Scoring note for S9:* Phoneme production approximations consistent with L1 transfer (e.g. /θ/ → /t/) are not penalised if the student showed correct discrimination in TA-E02 and correct phoneme counting throughout. Phoneme awareness errors (wrong count, wrong position) are scored as standard.

---

## 6. Misconception Engine

---

### MC-1 — Phonemes Equal Syllables

**Observable symptom:** Student claps or taps once per syllable beat when asked to count phonemes; says 'butter' has 2 sounds; says 'happy' has 2 sounds; cannot count more phonemes than syllables in any word.

**Diagnostic trigger:** DB-2 answer = syllable count for a word where syllable-count ≠ phoneme-count; P41 in TA-A01 returns 1 tap for a CVC word.

**Root cause:** Students first learn to clap syllable beats in songs and rhymes. Rhythmic syllable chunking is robust and fires automatically when any counting task involving spoken words is presented. The phoneme concept is less perceptually salient than the syllable for most early learners.

**Repair chain:** TA-C01 — P02→P26→P28→P29→P30→P31→P34→P55→P49|P50→P32

**MAMR status:** Foundational for MC-2. A student who cannot distinguish phonemes from syllables is counting in wrong units entirely. MC-1 must be resolved before MC-2 repair is attempted.

**Resolution signal:** Student correctly counts phonemes (not syllables) in two consecutive novel words from different syllable categories.

---

### MC-2 — Phoneme Count Equals Letter Count

**Observable symptom:** Student reports 4 phonemes for "ship" (counting s-h-i-p); 5 phonemes for "phone" (counting p-h-o-n-e); uses letter-counting as default for any phoneme-counting task.

**Diagnostic trigger:** DB-2 answer = 4 for 'fish'; TA-A02 response taxonomy 4-box response for 'ship'.

**Root cause:** Students who know the alphabet apply letter-by-letter counting as a default. The concept that two or more letters can represent one phoneme requires explicit instruction; it is not intuitive from alphabet knowledge alone.

**Repair chain:** TA-C02 — P02→P26→P28→P29→P30→P31→P34→P55→P49|P50→P32 (pre-condition: MC-1 resolved)

**MAMR status:** Dependent on MC-1. Cannot repair before MC-1 is resolved — a student using the wrong counting unit (syllables) cannot benefit from instruction about letters vs. phonemes.

**Resolution signal:** Student correctly counts phonemes (not letters) for a digraph-containing word not used during the repair TA.

---

### MC-3 — Only Initial Phonemes Are Salient

**Observable symptom:** Student correctly identifies the first phoneme of any word but says "I don't know" or repeats the whole word when asked for the medial or final phoneme.

**Diagnostic trigger:** DB-1 CORRECT; DB-4 medial follow-up incorrect; P34 for medial position in TA-B01 incorrect.

**Root cause:** The onset (initial consonant) is the most perceptually prominent position in English CVC words. Instructional emphasis on "what letter does the word START with?" creates an asymmetry where initial position is treated as the only phonemically relevant position.

**Repair chain:** TA-C03 — P02→P26→P33→P16→P34→P55→P49|P50→P34→P55→P49|P50→P32

**MAMR status:** Independent of MC-1 and MC-2.

**Resolution signal:** Student correctly isolates medial and final phonemes in two consecutive novel CVC words.

---

### MC-4 — Blending and Segmenting Are the Same Cognitive Skill

**Observable symptom:** Student blends successfully (DB-3 CORRECT) but cannot segment (DB-4 INCORRECT), or vice versa — and is surprised or confused when asked to reverse direction, believing both tasks are identical.

**Diagnostic trigger:** DB-3 CORRECT + DB-4 INCORRECT (phoneme-to-word direction works; word-to-phoneme fails).

**Root cause:** Both tasks involve phonemes and words, masking their directional difference. Blending is practised earlier and more frequently in typical instruction; segmentation is rarer and therefore not independently proceduralised.

**Repair chain:** TA-C04 — P02→P26→P17→P06→P34→P55→P49|P50→P32

**MAMR status:** Independent of MC-1, MC-2, and MC-3.

**Resolution signal:** Student successfully segments a word they had just blended, and blends a phoneme sequence they had just identified from a segmented word.

---

## 7. Assessment Battery

---

**AB-1 — Phoneme Segmentation**

"Segment each word into phonemes — say each sound separately in order:  
(a) 'frog'   (b) 'chest'   (c) 'splash'"

Expected:  
(a) /f/ /r/ /ɒ/ /g/ — 4 phonemes  
(b) /tʃ/ /e/ /s/ /t/ — 4 phonemes  
(c) /s/ /p/ /l/ /æ/ /ʃ/ — 5 phonemes  

Target: 2/3 words fully correct.

---

**AB-2 — Phoneme Blending**

"I'll say sounds one at a time. Blend them into a word:  
(a) /w/ /ɪ/ /ʃ/   (b) /tʃ/ /ɪ/ /p/   (c) /s/ /t/ /r/ /ʌ/ /k/"

Expected: (a) 'wish'; (b) 'chip'; (c) 'struck'  
Target: 2/3 words correctly blended.

---

**AB-3 — Phoneme Manipulation**

"(a) Say 'blend' without the /l/.  
(b) Change /f/ in 'flat' to /s/. What word?"

Expected: (a) 'bend'; (b) 'slat'  
Target: 2/2 correct.

---

**AB-4 — Phoneme Counting**

"How many phonemes in each word: (a) 'scratch'; (b) 'throne'; (c) 'ox'?"

Expected:  
(a) /s/ /k/ /r/ /æ/ /tʃ/ = 5  
(b) /θ/ /r/ /əʊ/ /n/ = 4  
(c) /ɒ/ /k/ /s/ = 3  

Target: 2/3 correct.

---

## 8. Mastery Gate

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

---

**P77 — Generation Probe**

"Give me three words that end with the phoneme /n/."

Pass: any three valid words ending in /n/ (sun, man, bin, ten, run, can…). Accent-neutral.  
3 correct → PASS; 1–2 → PARTIAL; 0 → FAIL.

---

**P76 — Transfer Probe**

"I'll say a made-up word you've never heard before. Segment it into phonemes: 'zup'."

Expected: /z/ /ʌ/ /p/ — 3 phonemes.

*P76 independence note: 'zup' is a nonsense word. No cross-linked blueprint needs to be authored first. The item tests phoneme segmentation in isolation from vocabulary knowledge and from print — fully self-contained.*

/z/ /ʌ/ /p/ with count = 3 → PASS; correct count without phoneme list → PARTIAL; wrong count → FAIL.

---

**P75 — Boundary Probe**

"How many phonemes does 'string' have? It's a tricky cluster."

Expected: 5 — /s/ /t/ /r/ /ɪ/ /ŋ/.

5 → PASS; 4 (common — collapses /str/ cluster) → PARTIAL; 3 or fewer or 6+ → FAIL.

---

**P74 — Classification Probe**

"I'll describe a change: 'cat' → 'bat'. Phoneme deletion or phoneme substitution?"

Expected: substitution (/k/ replaced by /b/).

"substitution" (or "replaced", "swapped") → PASS; "changed" (vague but correct direction) → PARTIAL; "deletion" → FAIL.

---

**P78 — Explanation Probe**

"Why can two words with the same number of letters have different phoneme counts?"

Expected: reference to digraphs or the principle that letter combinations can represent one phoneme (e.g., "'sh' is two letters but one sound, /ʃ/").

Names digraph principle or gives valid example → PASS; says "it depends" without mechanism → PARTIAL; "they can't" or letter-count reasoning → FAIL.

---

**Mastery decision:**  
All 5 PASS (≥85%) → MASTERY_CONFIRMED; schedule Component 9 retrieval  
4/5 PASS or 3 PASS + 2 PARTIAL → `P68` + targeted re-practice → re-gate  
≤3 PASS → `P64` + route to weakest protocol element → full re-gate

---

## 9. Retrieval Schedule

Based on spaced repetition: intervals 1, 3, 7, 21, 60 days.

**Day 1:** `P56` — segment 5 new CVC and CCVC words; count phonemes correctly; identify initial, medial, and final phonemes for each.

**Day 3:** `P88` — blend: 4 phoneme sequences given one at a time; student blends into spoken words (include at least 2 sequences with 4+ phonemes).

**Day 7:** `P88` — manipulation: (a) 3 phoneme deletions; (b) 3 phoneme substitutions; use CCVC words to increase challenge.

**Day 21:** `P88` — phoneme count for 6 words including 2 with consonant clusters (scratch, throne); explain in one sentence why phoneme count ≠ letter count.

**Day 60:** `P88` — cold recall: full AB-3 and AB-4 battery; cold recall of P75 boundary probe: "How many phonemes in 'string'?"; explain phoneme vs. syllable distinction from memory with one novel example.

---

## 10. Validation Checklist

| Check | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| V-1 | All concept id slots reference valid KG nodes | PASS | eng.phonics.phonemic-awareness valid; cross-link eng.phonics.letter-sound-correspondence valid; unlocks eng.phonics.letter-sound-correspondence and eng.phonics.blending-segmenting valid |
| V-2 | difficulty=1 → cpa_entry_stage = C | PASS | cpa_entry_stage=C; difficulty=1 + english/phonics domain both require C |
| V-3 | mastery_threshold matches KG value | PASS | 0.85 per KG specification for foundational phonics |
| V-4 | Canonical 10-field schema only | PASS | No domain/concept_type in Concept Profile |
| V-5 | No invented primitives | PASS | All primitives from P01–P95 library: P01, P02, P04, P06, P14, P16, P17, P26, P28, P29, P30, P31, P32, P33, P34, P35, P41, P42, P45, P49, P50, P52, P53, P54, P55, P56, P59, P64, P68, P70, P74, P75, P76, P77, P78, P81, P82, P88, P91, P92, P95 — all valid |
| V-6 | GR-1: all TAs start P01 or P02 | PASS | A01(P01), A02–A05(P02); B01(P01), B02–B04(P02); C01–C05(P02); D01(P01), D02–D04(P02); E01(P01), E02–E04(P02) |
| V-7 | GR-2: P55 follows every elicitation primitive | PASS | Every P34/P35/P41/P42/P45/P59/P74–P78 in all TAs followed by P55 |
| V-8 | GR-3: P08 only after P06 or P07 has fired | PASS | P08 not used anywhere — phonemic awareness is entirely oral; no abstract notation required |
| V-9 | GR-4: repair chains gated by P41 or P64 misconception signal | PASS | All MC repair TAs (C01–C04) entered only after diagnostic signals from DB-2, DB-4, or P41 in earlier TAs; P26 never fires without prior misconception detection |
| V-10 | GR-5: P28 absent from Protocol D (S6) | PASS | Protocol D (TA-D01 through TA-D04): no P28 appears in any TA |
| V-11 | GR-6: P91 terminal | PASS | TA-A05, B04, C05, D04, E04: all end with P78 (P91 expansion terminal element) |
| V-12 | GR-7: ≤3 consecutive C-primitives | PASS | Max 1–2 consecutive C-primitives in any TA: P92→P34(E) in A04; P16→P34(E) in B01/C03; P17→P34(E) in C04/E02 |
| V-13 | GR-8: P54 precedes first-attempt high-difficulty questions | PASS | P54 precedes P59 (self-explanation) in TA-A04; P54 precedes P35 (open strategy question) in TA-D02; P54 precedes P45 (problem construction) in TA-B03 |
| V-14 | GR-9: assessment primitives not in first TA | PASS | P74–P78 appear only in mastery gate TAs (A05, B04, C05, D04, E04); first TAs of each protocol use P41 (diagnostic E-Elicitation) only |
| V-15 | GR-10: Named Compound expansions substituted | PASS | P91 fully expanded to P77→P76→P75→P74→P78 in every mastery gate TA sequence; no unexpanded compound notation in TA sequences |
| V-16 | Response taxonomy present for all elicitation primitives | PASS | All P34/P35/P41/P42/P45/P59/P74–P78 have inline four-signal response taxonomy blocks in every TA |
| V-17 | All P49 branches specified | PASS | CORRECT/PARTIAL/INCORRECT/NO_RESPONSE routing specified for all elicitation cycles in every TA |
| V-18 | Session cap respected | PASS | Protocol A: 5 TAs (3h ≥ 1h → max 7); B: 4 TAs; C: 3–5 TAs; D: 4 TAs; E: 4 TAs — all within cap |
| V-19 | Transfer contexts reference cross-linked concept | PASS | P76 probes use nonsense words ('bim', 'zup') — self-contained; P76 independence notes present for both; cross-link eng.phonics.letter-sound-correspondence documented in Concept Profile |
| V-20 | AIR-1 through AIR-5 pass | PASS | Words/phonemes/minimal pairs named in pre-specified slots (AIR-1); response taxonomies pre-authored (AIR-2); P49 routing deterministic (AIR-3); primitives concept-independent (AIR-4); TA sequences fixed at authoring (AIR-5) |

**PACKAGE_READY: YES** — All 20 V-checks PASS. Components 0–9 present. Blueprint approved for Educational Brain integration.
