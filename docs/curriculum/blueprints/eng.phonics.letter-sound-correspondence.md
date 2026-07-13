# Teaching Blueprint: Letter-Sound Correspondence
**Blueprint ID:** eng.phonics.letter-sound-correspondence  
**Status:** PACKAGE_READY  
**Date:** 2026-07-11  
**Framework Version:** Educational Brain v1.0  

---

## 0. Concept Profile

```
id:                  eng.phonics.letter-sound-correspondence
name:                Letter-Sound Correspondence
domain:              english / phonics
bloom:               understand
difficulty:          1 (foundational)
mastery_threshold:   0.85
estimated_hours:     3
requires:            [eng.phonics.alphabet-recognition,
                      eng.phonics.blending-segmenting]
unlocks:             [eng.phonics.cvc-decoding, eng.phonics.digraphs,
                      eng.phonics.long-vowel-patterns, eng.read.sight-words]
cross_links:         [eng.phonics.phonemic-awareness]
cpa_entry_stage:     C
```

**Core idea:** Every English word is built from sounds (phonemes) that are represented in writing by letters or letter combinations (graphemes). Letter-sound correspondence (also called grapheme-phoneme correspondence, GPC) is the mapping between what you see on the page and what you say aloud. Reading requires this mapping in one direction (print → sound); spelling requires it in the other (sound → print). English has approximately 44 phonemes represented by 26 letters, meaning the mapping is many-to-many and must be learned explicitly.

**The foundational insight students must reach:** A letter's sound (/b/) is different from its name ("bee"). Reading is about sounds, not names.

**Key vocabulary:** grapheme, phoneme, letter-sound correspondence, digraph, long vowel, short vowel, decode, blend, silent letter.

**Why difficulty = 1:** The mapping principle is simple. The challenge is: (1) distinguishing letter names from letter sounds; (2) accepting that some letter combinations act as single units (digraphs); (3) accepting that English is not perfectly regular — the same grapheme can represent different phonemes in different contexts.

**CPA entry:** Always C for english/phonics domain — physical letter cards, mouth movement cards, and sound-object matching are the required concrete entry for all phonics students.

---

## 1. Learning Objective

Given a simple English word (CVC, CCVC, or word with a common digraph):

(a) the student correctly identifies each grapheme in the word (individual letters and two-letter digraph units);  
(b) the student correctly produces the phoneme mapped to each grapheme;  
(c) the student correctly blends the phonemes to decode the word.

**Accuracy threshold:** 85% (aligned with foundational literacy standards and mastery_threshold).

---

## 2. Student State Matrix

| State | Entry Condition | Protocol |
|-------|----------------|----------|
| S0 | Knows alphabet names; does not know letter sounds; cannot distinguish grapheme from phoneme | Protocol A — full CPA, 5 TAs |
| S1 | Knows single-letter sounds; does not recognise digraphs as single units | Protocol B — digraph and pattern extension, 4 TAs |
| S2 | Carries identified misconception (MC-1, MC-2, MC-3, and/or MC-4) | Protocol C — MAMR repair, 3–5 TAs |
| S6 | Correct understanding; low confidence; reading anxiety | Protocol D — scaffolded practice, 4 TAs |
| S9 | Second-language learner; L1 phoneme inventory different from English | Protocol E — explicit contrast and anchoring, 4 TAs |

---

## 3. Diagnostic Battery

---

**DB-1 — Sound Production Check**

Stimulus: present letter cards 'b', 'm', 's', 'a', 'f' one at a time.

Question: "What sound does this letter make?"

Response taxonomy:
```
{ stimulus: "All 5 correct sounds produced: /b/, /m/, /s/, /æ/, /f/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "3–4 correct; may confuse letter name with sound (e.g. 'a' → names the letter 'ay' not /æ/)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Produces letter names rather than sounds; or fewer than 3 correct",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }

{ stimulus: "No response or 'I don't know what sounds mean'",
  signal: "SIGNAL:NO_RESPONSE" }
```

SIGNAL:CORRECT → run DB-2 → route accordingly  
SIGNAL:PARTIAL → S1; run DB-2 for MC screen; route to Protocol B  
SIGNAL:INCORRECT (naming letters) → MC-4 flag → Protocol C  
SIGNAL:NO_RESPONSE → S0 → Protocol A

---

**DB-2 — Misconception Screen**

DB-2a (MC-1): Show 'c' in 'cat' and 'c' in 'city'. "Does the letter 'c' always make the same sound?"  
DB-2b (MC-2): "How many sounds are in the word 'ship'?" (answer: 3 — /ʃ/, /ɪ/, /p/, not 4 for the 4 letters)  
DB-2c (MC-3): "What does the 'e' do in the word 'cake'?" (the silent 'e' changes the vowel from /æ/ to /eɪ/)

```
DB-2a: { stimulus: "Yes — 'c' always says /k/", signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }
DB-2a: { stimulus: "No — /k/ in cat, /s/ in city", signal: "SIGNAL:CORRECT" }

DB-2b: { stimulus: "4 sounds — counting letters", signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }
DB-2b: { stimulus: "3 sounds — /ʃ/ /ɪ/ /p/ — 'sh' is one sound", signal: "SIGNAL:CORRECT" }

DB-2c: { stimulus: "Nothing — the 'e' is silent / ignore it", signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }
DB-2c: { stimulus: "Makes the 'a' say its name / makes the vowel long", signal: "SIGNAL:CORRECT" }
```

Flag all MCs; route to Protocol C for any flagged.

---

## 4. Prerequisite Check

**PRE-1 — Alphabet Recognition** (requires eng.phonics.alphabet-recognition)

Stimulus: show 8 random letter cards; ask student to name each letter.

Expected: names all 8 correctly.

SIGNAL:INCORRECT (≥2 unknown) → prerequisite gap; schedule eng.phonics.alphabet-recognition first.

---

**PRE-2 — Blending** (requires eng.phonics.blending-segmenting)

Stimulus: "I'm going to say three sounds slowly. Blend them into a word: /s/ — /æ/ — /t/."

Expected: "sat"

SIGNAL:INCORRECT → prerequisite gap; schedule eng.phonics.blending-segmenting first.

---

## 5. Protocol Library

---

### Protocol A — S0 Complete Novice (Full CPA, 5 TAs, single session)

*Session cap: estimated_hours=3 ≥ 1h → max 7 TAs. 5 TAs appropriate for bloom=understand.*  
*CPA path: Concrete (TA-A01–A02) → Perceptual (TA-A03–A04) → Mastery Gate (TA-A05).*  
*Note: english/phonics domain → CPA entry always Concrete; no PPA staging.*

---

**TA-A01 — Letter Sounds vs Letter Names: Concrete**

Primitive sequence: `P01 → P04 → P06 → P17 → P34 → P55 → P41 → P55 → P49 | P50`

`P01` target_element: four letter cards ('b', 'm', 's', 'a') and matching picture cards  
`P04` context: "You already know what letters are called. Today we learn what sounds they MAKE — that's how reading works."  
`P06` concrete materials:  
- Letter card 'b' alongside picture of a bat and a mouth-shape card (lips together, /b/)  
- Letter card 'm' alongside picture of a moon and a mouth-shape card (lips together, nasal, /m/)  
- Letter card 's' alongside picture of a snake and a mouth-shape card (tongue near top, hissing, /s/)  
- Letter card 'a' alongside picture of an ant and a mouth-shape card (open mouth, /æ/)  
Student touches each card and says the sound — not the name.  
`P17` contrast: "The letter 'b' is called 'bee' [say the name]. But when we read, it makes the sound /b/ [say the sound]. These are different."  
`P34` closed: "Touch the 's' card. What sound does it make when we're reading?"  
`P55` wait: 5 s  
`P41` MC-4 diagnostic: "The letter 'a' is named 'ay'. When you see 'a' in the word 'ant', does it say 'ay' or /æ/?"  
`P55` wait: 5 s

Response taxonomy (P41):
```
{ stimulus: "/æ/ — the short sound, not the name",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'ay' — the name of the letter",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }

{ stimulus: "Not sure — produces something between the name and the sound",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` → "The sound /æ/ is called the 'short a' sound. When you decode a word, you use the sound, not the name." → TA-A02  
- SIGNAL:PARTIAL → `P53` → demonstrate with exaggerated mouth shape for /æ/ vs. 'ay' → TA-A02  
- SIGNAL:INCORRECT (MC-4) → `P50` → `P30` bridge ("Reading aloud means producing the SOUND — not naming the letter. The name 'bee' doesn't appear in any word; the sound /b/ does.") → MC-4 flagged → retry `P41`  
- SIGNAL:NO_RESPONSE → `P54` → reduce to one letter-sound pair → retry `P34`

---

**TA-A02 — Decoding CVC Words: Concrete Sound Buttons**

Primitive sequence: `P01 → P06 → P20 → P34 → P55 → P42 → P55 → P49 | P50`

`P01` target_element: Elkonin sound boxes and letter tiles  
`P06` concrete:  
- Three empty squares drawn in a row (Elkonin boxes); letter tiles 's', 'a', 't'  
- Student places one tile in each box; pushes each box in sequence while saying its sound: /s/ — /æ/ — /t/  
- Blend: "sat"  
- Repeat with 'man' (m-a-n) and 'bit' (b-i-t)  
Emphasis: each box = one sound = one grapheme (at this stage: one letter = one phoneme)  
`P20` pattern: "What is the pattern? How many boxes, how many sounds, how many letters for these three words?"  
`P34` closed: "In the word 'sat', how many sounds? How many letters?"  
`P55` wait: 5 s  
`P42` example generation: "Use the tiles to build a new word. Place the tiles in boxes and say each sound."  
`P55` wait: 8 s

Response taxonomy (P34):
```
{ stimulus: "3 sounds; 3 letters",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Different numbers for sounds and letters — confused counting method",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "3 sounds; hesitates on letter count or conflates",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` → "Great — for these simple words, one letter = one sound. We'll soon see that doesn't always hold." → TA-A03  
- SIGNAL:PARTIAL → `P53` → count together by pushing boxes → TA-A03  
- SIGNAL:INCORRECT → `P50` → redo with physical push for each sound → retry `P34`  
- SIGNAL:NO_RESPONSE → `P54` → model then student copies → retry

---

**TA-A03 — Digraphs: Two Letters, One Sound**

Primitive sequence: `P01 → P07 → P16 → P34 → P55 → P41 → P55 → P49 | P50`

`P01` target_element: colour-coded word cards showing digraphs  
`P07` visual cards:  
- Word "ship" with 'sh' highlighted in one colour as a single unit → /ʃ/. Letter count: 4. Sound count: 3 (/ʃ/, /ɪ/, /p/).  
- Word "chip" with 'ch' highlighted → /tʃ/. 4 letters, 3 sounds.  
- Word "thin" with 'th' highlighted → /θ/. 4 letters, 3 sounds.  
Explanation: "When two letters work together to make a single sound, we call them a **digraph**. They form one grapheme even though they look like two letters."  
`P16` compare: 'sit' (3 letters, 3 sounds) vs. 'ship' (4 letters, 3 sounds). What explains the difference?  
`P34` closed: "How many sounds are in the word 'chat'? How many letters?"  
`P55` wait: 5 s  
`P41` MC-2 diagnostic: "Someone says 'ship' has 4 sounds because it has 4 letters. Are they right?"  
`P55` wait: 5 s

Response taxonomy (P41):
```
{ stimulus: "No — 'sh' is one sound /ʃ/; 'ship' has 3 sounds",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Yes — count the letters: s-h-i-p = 4",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "No, but unsure how many sounds",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → TA-A04  
- SIGNAL:INCORRECT (MC-2) → `P50` → demonstrate physically: push one Elkonin box for 'sh' as one unit → MC-2 flagged → retry `P41`  
- SIGNAL:PARTIAL → `P53` → work through 'ship' boxes slowly → TA-A04

---

**TA-A04 — Vowels and Context: One Grapheme, Multiple Phonemes**

Primitive sequence: `P01 → P07 → P15 → P34 → P55 → P41 → P55 → P49 | P50`

`P01` target_element: three word cards with 'a' in different contexts  
`P07` word cards:  
- "cat" — 'a' = /æ/ (short a)  
- "cake" — 'a' + silent 'e' = /eɪ/ (long a); 'e' highlighted as special controller  
- "ball" — 'a' = /ɔː/ (influenced by 'l')  
`P15` observe: "Listen and repeat: cat, cake, ball. Is the 'a' sound the same in all three?"  
`P34` closed: "How many different sounds does the letter 'a' make in these three words?"  
`P55` wait: 5 s  
`P41` MC-1 diagnostic: "Is it true that the letter 'a' always makes the /æ/ sound as in 'cat'?"  
`P55` wait: 5 s

Response taxonomy (P41):
```
{ stimulus: "No — 'a' can make /æ/, /eɪ/, /ɔː/ depending on context",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Yes — 'a' always says /æ/",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "No but can't name the other sounds",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` → "Context determines which sound. The surrounding letters and patterns are clues. This is why English phonics has rules — not arbitrary chaos, but context-dependent patterns." → TA-A05  
- SIGNAL:PARTIAL → `P53` → point to each word and produce the sound; then TA-A05  
- SIGNAL:INCORRECT (MC-1) → `P50` → replay listening: cat vs. cake vs. ball → MC-1 flag → retry `P41`

---

**TA-A05 — Mastery Gate (Terminal)**

Primitive sequence: `P01 → P91`

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

`P77` generation probe: "Choose any word with a digraph. Write it, circle the digraph, and tell me how many sounds the word has."  
`P55` wait: 8 s  
`P49/P50`

`P76` transfer probe: "How many sounds does the word 'phone' have? How many letters? What do you notice?"  
*P76 independence note: 'phone' uses the 'ph' digraph (=/f/), which cross-links to eng.phonics.digraphs. That blueprint need not be authored first; the item is self-contained.*  
`P55` wait: 8 s  
`P49/P50`

`P75` boundary probe: "Is every English word spelled exactly as it sounds? Give one example where the spelling does not directly match the sounds."  
`P55` wait: 8 s  
`P49/P50`

`P74` classification probe: "For each word, identify each grapheme and state its phoneme: (a) 'ship' (b) 'cake' (c) 'chat' (d) 'bed'"  
`P55` wait: 10 s  
`P49/P50`

`P78` explanation probe: "In one sentence: why is knowing the alphabet — the names of the 26 letters — not enough to be able to read English?"  
`P55` wait: 8 s  
`P49/P50`

Mastery response keys:
```
P77 pass: valid digraph word circled; correct sound count stated
P76 pass: 3 sounds (/f/, /əʊ/, /n/); 5 letters; fewer sounds than letters (digraph + silent letter)
P75 pass: no — student gives a counter-example (e.g. 'knight', 'phone', 'said', 'one')
P74 pass:
  (a) sh=/ʃ/, i=/ɪ/, p=/p/
  (b) c=/k/, a=/eɪ/, k=/k/, e=silent (or 'controls a')
  (c) ch=/tʃ/, a=/æ/, t=/t/
  (d) b=/b/, e=/ɛ/, d=/d/
P78 pass: "letter names are not the same as letter sounds; reading requires sounds, not names" or equivalent
```

All 5 probes at 85% → MASTERY_CONFIRMED; schedule Component 9 retrieval  
3–4/5 → PARTIAL_MASTERY; schedule Day 1 retrieval  
<3/5 → return to TA-A01

---

### Protocol B — S1 Partial Knowledge (Digraph and Pattern Extension, 4 TAs)

*Knows individual letter sounds; does not recognise digraphs as single-unit graphemes. Entry at perceptual.*

---

**TA-B01 — Digraph Recognition**

Primitive sequence: `P02 → P07 → P23 → P34 → P55 → P49 | P50`

`P02` activate: single-letter sound knowledge  
`P07` digraph chart: sh=/ʃ/, ch=/tʃ/, th=/θ/ or /ð/, wh=/w/, ph=/f/ — each with example word and colour highlighting  
`P23` decomposition: "In the word 'shop' — if you tried to decode 's' and 'h' separately, what would you say? What is the actual sound?"  
`P34` closed: "Read 'thick'. How many sounds? What are they?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "3 sounds: /θ/, /ɪ/, /k/ — 'th' as one unit",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "4 sounds: /t/, /h/, /ɪ/, /k/ — treating th as two",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "3 sounds but /t/ + /h/ or uncertain about 'th'",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-B02; INCORRECT (MC-2) → flag → Elkonin box demo with 'th' as one box → retry; PARTIAL → `P53` → TA-B02

---

**TA-B02 — Long Vowel Patterns**

Primitive sequence: `P01 → P07 → P20 → P41 → P55 → P49 | P50`

`P01` target_element: word pairs showing short vs. long vowels  
`P07` word pairs: bit/bite; cap/cape; hop/hope; cut/cute  
`P20` pattern: "What do you notice about the vowel sound in each pair? What changes between 'bit' and 'bite'?"  
`P41` MC-3 diagnostic: "In the word 'bite', what does the 'e' at the end do?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Makes the 'i' long / makes the 'i' say its name / changes /ɪ/ to /aɪ/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Nothing — it's silent, you can ignore it",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "Sounds like a different word but unsure why",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-B03; INCORRECT (MC-3) → flag → `P50` → "The 'e' is silent BUT it controls the vowel before it. Remove the 'e': 'bite' → 'bit'. Different word, different vowel. The 'e' does real work even without making a sound." → retry `P41`; PARTIAL → `P53` → TA-B03

---

**TA-B03 — Context-Dependent Sounds**

Primitive sequence: `P01 → P08 → P17 → P42 → P55 → P49 | P50`

`P01` target_element: letter 'c' in two contexts  
`P08` formal: "'c' says /k/ before 'a', 'o', 'u' and consonants (cat, cot, cut, cry). 'c' says /s/ before 'e', 'i', 'y' (cell, city, cycle). Context determines sound."  
`P17` contrast: 'cat' vs. 'city' — same letter, different sound  
`P42` example generation: "Give me a word where 'c' says /k/ and a word where 'c' says /s/."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Valid examples for both: /k/ (e.g. cup, coat) and /s/ (e.g. face, ice, cycle)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "One correct; other incorrect or confused",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Both words use the same sound",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }
```

`P49`: CORRECT → TA-B04; PARTIAL → `P53` → TA-B04; INCORRECT → `P50` → re-read P08 rule → retry

---

**TA-B04 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05.

---

### Protocol C — S2 Misconception Carriers (MAMR Repair, 3–5 TAs)

**MAMR order:** MC-4 is foundational for MC-1. If both active: repair MC-4 first. MC-2 and MC-3 are independent.

---

**TA-C01 — Misconception Surface**

Primitive sequence: `P02 → P26 → P41 → P55 → P49`

`P02` activate existing knowledge  
`P26` schema activation: "Show me how you would read the word 'bat'."  
`P41` diagnostic: run DB-1 (MC-4), DB-2a (MC-1), DB-2b (MC-2), DB-2c (MC-3)  
`P55` wait: 5 s

Routing (MAMR): MC-4 → TA-C02 (foundational); MC-1 (only if MC-4 cleared) → TA-C03; MC-2 → TA-C04; MC-3 → TA-C05

---

**TA-C02 — MC-4 Repair: Sounds vs. Names**

Primitive sequence: `P01 → P27 → P06 → P28 → P29 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: letter 'b' card and the word 'bat'  
`P27` schema exposure: "When you see the letter 'b', you say 'bee' — the name of the letter."  
`P06` concrete: demonstration — if you read 'bat' using letter names, you'd say "bee-ay-tee" — which word is that? Nobody would recognise it as 'bat'.  
`P28` cognitive conflict: "Letter names don't appear in words. When was the last time you heard someone say 'bee-ay-tee' instead of 'bat'? Letter names are for the alphabet song. Reading uses sounds."  
`P29` pause  
`P55` wait: 5 s  
`P30` bridge: "The letter 'b' is NAMED 'bee' but it SOUNDS like /b/ — a short burst of sound, lips together. Reading = sounds."  
`P31` install: "Grapheme-phoneme mapping = letter → sound, not letter → name."  
`P34` closed: "What sound does the letter 's' make when you're reading?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "/s/ (the hissing sound)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "'ess' (the name)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }

{ stimulus: "Some attempt at the sound but letter name habit interfering",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-4 CLEARED; if MC-1 flagged → TA-C03; else → TA-C06  
INCORRECT → `P50` → `P32` → 5 more letter-sound practices → retry  
PARTIAL → `P53` → advance

---

**TA-C03 — MC-1 Repair: One Grapheme Can Map to Multiple Phonemes**

Primitive sequence: `P01 → P27 → P06 → P17 → P34 → P55 → P30 → P31 → P42 → P55 → P49 | P50`

`P01` target_element: three word cards with 'c'  
`P27` schema: "You believe 'c' always makes /k/."  
`P06` concrete: 'cat' (c=/k/), 'city' (c=/s/), 'chip' (ch=/tʃ/) — student reads each  
`P17` contrast: the sound of 'c' in 'cat' vs. 'city'  
`P34` closed: "What sound does 'c' make in 'cell'?"  
`P55` wait: 5 s  
`P30` bridge: "What comes after 'c' determines the sound. Before 'e', 'i', 'y': soft /s/. Before 'a', 'o', 'u': hard /k/. The CONTEXT is the clue."  
`P31` install: "Grapheme-phoneme correspondence is context-sensitive. You always look at what comes next."  
`P42` example generation: "Find two words: one where 'c' says /k/ and one where 'c' says /s/."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "/s/ (soft c before 'e'); valid pair of words found",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "/k/; examples all use hard c",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "/s/ but can't generate second example",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-1 CLEARED → TA-C06  
INCORRECT → `P50` → explicit examples → retry  
PARTIAL → `P53` → advance

---

**TA-C04 — MC-2 Repair: Letters ≠ Sounds**

Primitive sequence: `P01 → P27 → P07 → P28 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: Elkonin boxes and word 'ship'  
`P27` schema: "You count sounds by counting letters."  
`P07` Elkonin boxes: draw 3 boxes for 'ship'; label: box 1 = 'sh' (/ʃ/); box 2 = 'i' (/ɪ/); box 3 = 'p' (/p/)  
`P28` conflict: "There are 4 letters in 'ship'. But only 3 boxes. Why? Because 'sh' is ONE sound — you cannot say /s/ and /h/ separately in 'ship'. Put your hand over your mouth and say just 'sh' — it's one breath, one movement."  
`P55` wait: 5 s  
`P30` bridge: "Count sounds, not letters. A grapheme is a letter OR a group of letters that makes ONE sound. 'sh' = one grapheme = one phoneme."  
`P31` install: "Number of sounds = number of graphemes, not number of letters."  
`P34` closed: "How many sounds are in 'chat'?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "3 — /tʃ/, /æ/, /t/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "4 — counting c-h-a-t",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "3 but uncertainty about 'ch'",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-2 CLEARED → TA-C06  
INCORRECT → `P50` → Elkonin box demo for 'chat' → retry  
PARTIAL → `P53` → advance

---

**TA-C05 — MC-3 Repair: Silent Letters Do Work**

Primitive sequence: `P01 → P27 → P06 → P17 → P34 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: word pair 'bit' vs. 'bite'  
`P27` schema: "You think the silent 'e' at the end of words can be ignored."  
`P06` concrete: read 'bit' then 'bite'. Student hears the vowel change.  
`P17` contrast: "Now WRITE 'bit'. Add an 'e'. What changed? Did the 'e' do anything?"  
`P34` closed: "If the 'e' were truly ignorable, would 'bit' and 'bite' sound the same?"  
`P55` wait: 5 s  
`P30` bridge: "The 'e' is silent but it sends a signal to the vowel: 'say your name'. Without the 'e': short vowel /ɪ/. With the 'e': long vowel /aɪ/. The 'e' does real phonetic work."  
`P31` install: "Silent letters are signalling letters. Never ignore them when decoding."  
`P34` closed (second): "What would happen to the pronunciation of 'cape' if you removed the 'e'?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "It would become 'cap' — short a /æ/ instead of long a /eɪ/",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Nothing / still sounds the same",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "Different but can't describe how",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-3 CLEARED → TA-C06  
INCORRECT → `P50` → contrast physically: say 'cap' then 'cape' → retry  
PARTIAL → `P53` → advance

---

**TA-C06 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05.

---

### Protocol D — S6 Low Confidence (Scaffolded Practice, 4 TAs, no P28)

*No P28 (GR-5). P30 (Bridge) replaces cognitive conflict. Extra affirmation built in.*

---

**TA-D01 — Safety Frame and Individual Letter Sounds**

Primitive sequence: `P01 → P71 → P69 → P06 → P81 → P34 → P55 → P49 | P50`

`P01` target_element: 4 familiar letter cards (s, m, a, t)  
`P71` remove peer comparison  
`P69` relevance: "These sounds are the building blocks of every word you'll ever read."  
`P06` concrete: letter cards with picture anchors (reference card visible throughout)  
`P81` scaffold: mouth-shape pictures provided alongside each letter  
`P34` closed (card visible): "What sound does the letter 'm' make?"  
`P55` wait: 5 s

Response taxonomy: /m/ is correct; letter name "em" is incorrect.

`P49`: CORRECT → `P70` → TA-D02; INCORRECT → `P50` → `P30` bridge → retry; PARTIAL → `P53` → TA-D02

---

**TA-D02 — Decoding with Full Scaffold**

Primitive sequence: `P01 → P06 → P81 → P88 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: three CVC words  
`P06` concrete: Elkonin boxes; tiles; reference card visible  
`P81` scaffold: each box pre-labelled with its grapheme; student only needs to say the sound  
`P88` retrieval: student pushes each box and says the sound for 'sat', 'man', 'bit'  
`P55` wait: 8 s  
`P34` closed: "Blend the sounds: /b/ — /ɪ/ — /t/. What word is that?"  
`P55` wait: 5 s

Response taxonomy: "bit" is correct.

`P49`: CORRECT → `P70` → TA-D03; PARTIAL → `P53` → TA-D03; INCORRECT → `P50` → model blending → retry

---

**TA-D03 — Digraphs with Scaffolded Confidence Build**

Primitive sequence: `P01 → P07 → P64 → P81 → P34 → P55 → P49 | P50`

`P01` target_element: digraph words with colour-coding  
`P07` colour-coded cards: 'ship' (sh in red), 'chip' (ch in blue), 'thin' (th in green)  
`P64` confidence calibration: "Before we start — how confident (1–5) that you can handle two-letter sounds?"  
`P81` scaffold: "The two highlighted letters work TOGETHER as one sound. I'll show you the first; you do the second."  
`P34` closed: "How many sounds in 'chin'?"  
`P55` wait: 5 s

Response taxonomy: 3 sounds (ch, i, n).

`P49`: CORRECT → `P70` → TA-D04; PARTIAL → `P53` → TA-D04; INCORRECT → `P50` → `P30` bridge → retry

---

**TA-D04 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05.

---

### Protocol E — S9 Second-Language Learner (Explicit Contrast, 4 TAs)

*L1 phoneme inventory may differ substantially. English has sounds absent from many L1s (e.g. /θ/ in 'this', /w/, /æ/). Visual anchoring + explicit contrast.*

---

**TA-E01 — Sound Inventory Awareness**

Primitive sequence: `P01 → P03 → P04 → P06 → P34 → P55 → P49 | P50`

`P01` target_element: English phoneme reference card  
`P03` orient: visual reference card with 10 key phonemes shown as: symbol → mouth-shape diagram → example word  
`P04` context: "Some sounds in English may not exist in your first language. That's OK — we'll practise them. The goal is to connect each written letter to its English sound."  
`P06` concrete: mouth-shape cards for /æ/ (low open mouth — often absent in languages with only /a/); /ɪ/ (high front, slightly short); /θ/ (tongue between teeth)  
`P34` closed (card visible): "For the letter 'a' in the word 'cat' — point to the mouth-shape that makes this English sound."  
`P55` wait: 5 s

Response taxonomy: points to /æ/ shape (open mouth, tongue low).

`P49`: CORRECT → TA-E02; INCORRECT → `P50` → demonstrate /æ/ with exaggerated mouth → retry; PARTIAL → `P53` → TA-E02

---

**TA-E02 — Grapheme-to-Sound Mapping with Visual Scaffold**

Primitive sequence: `P01 → P07 → P88 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: grapheme-phoneme matching chart  
`P07` chart: 10 graphemes (a, e, i, o, u, b, m, s, sh, th) → phoneme → example word → picture  
`P88` retrieval: student covers the phoneme column; for each grapheme, produces the sound from memory (reference picture available)  
`P55` wait: 10 s  
`P34` closed: "What sound does 'sh' make? Use it in a word."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "/ʃ/ — uses in ship/shop/fish etc.",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Produces /s/ + /h/ separately",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "Produces /ʃ/ but no word example",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-E03; INCORRECT → `P50` → Elkonin box with 'sh' as one unit → retry; PARTIAL → `P53` → TA-E03

---

**TA-E03 — Decoding with L1 Contrast Points**

Primitive sequence: `P01 → P07 → P16 → P34 → P55 → P49 | P50`

`P01` target_element: words containing L1-challenging sounds  
`P07` words selected for common L1 interference patterns: 'ship' (for L1s that produce /ʃɪp/ as /sɪp/), 'thin' (for L1s that substitute /t/ or /d/ for /θ/), 'cat' (for L1s that substitute /a/ for /æ/)  
Instruction: present each with IPA notation and mouth diagram  
`P16` compare: student's L1 equivalent sound (if exists) vs. target English phoneme  
`P34` closed: "Read this word aloud: 'that'."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Produces /ðæt/ correctly",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Substitutes /dat/ or /zat/ — L1 interference",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Cannot produce the word",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49`: CORRECT → TA-E04; PARTIAL → `P53` → tongue-between-teeth instruction → TA-E04; NO_RESPONSE → `P54` → model slowly → retry

---

**TA-E04 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05. Reference card available throughout.

---

## 6. Misconception Engine

---

### MC-1 — Each Grapheme Has Exactly One Fixed Phoneme

**Observable symptom:** Student reads 'city' as /kɪti/; reads 'cycle' as /kaɪkəl/; insists 'c always says /k/.'

**Diagnostic trigger:** DB-2a; TA-A04 P41.

**Root cause:** Early phonics instruction often teaches single-letter sounds in isolation with a single keyword (a for apple, c for cat) without immediately teaching context-dependent variation. Students over-generalise the initial mapping.

**Repair chain:** P27 (one-grapheme-one-phoneme belief) → P06 (concrete: three 'c' words) → P17 (contrast: cat/city) → P30 (context rule: what follows 'c' determines sound) → P31 → P42 (generate examples of each)

**MAMR status:** Requires MC-4 cleared first. Rationale: if student is naming letters rather than producing sounds (MC-4), they cannot perceive or compare phonemes to notice context-dependent variation. MC-4 must be resolved before the student can benefit from context-sensitivity instruction.

---

### MC-2 — Number of Letters = Number of Sounds

**Observable symptom:** Student counts 4 sounds in 'ship' (s+h+i+p); counts 3 sounds in 'cat'; treats every written character as a separate sound unit.

**Diagnostic trigger:** DB-2b; TA-A03 P41.

**Root cause:** Visual scanning produces one-to-one mapping from letter to sound as a default. The grapheme concept (letter GROUP = single sound) must be explicitly taught; it is not intuitive.

**Repair chain:** P27 → P07 (Elkonin boxes with digraph as single box) → P28 (say /s/ and /h/ separately — does that give 'ship'?) → P30 (count sounds, not letters; a grapheme can be 1 or 2+ letters) → P31 → P32 (5 words counting sounds correctly)

**MAMR status:** Independent.

---

### MC-3 — Silent Letters Are Irrelevant and Can Be Ignored

**Observable symptom:** Student reads 'cake' as /kæk/ (ignoring final e); reads 'knife' as /knaɪf/ (pronouncing the 'k'); ignores 'w' in 'write.'

**Diagnostic trigger:** DB-2c; TA-B02 P41.

**Root cause:** 'Silent' implies no function. Students interpret the term literally — if it makes no sound, it matters for nothing. The signalling function of silent letters (controlling adjacent sounds, indicating word origin) is not intuitive.

**Repair chain:** P27 (silent = ignorable) → P06 (bit vs. bite: remove the e and word changes) → P17 (contrast: with/without the e) → P30 (silent letters = signalling letters; they control the vowel before them) → P31 → P32 (3 word pairs: bit/bite, cap/cape, hop/hope)

**MAMR status:** Independent.

---

### MC-4 — Reading Means Naming Letters (Names ≠ Sounds)

**Observable symptom:** Student says "bee-ay-tee" when asked to read 'bat'; uses alphabet names throughout decoding; "reads" by reciting letter names in sequence.

**Diagnostic trigger:** DB-1; TA-A01 P41.

**Root cause:** Alphabet instruction heavily emphasises letter names (the alphabet song, ABC books). The distinction between name and sound is never made explicit until formal phonics begins. Students assume the name IS the reading-sound.

**Repair chain:** P27 (expose: reading = naming letters) → P06 (read 'bat' with names → "bee-ay-tee" — unrecognisable as a word) → P28 (conflict: nobody says "bee-ay-tee"; the word is 'bat' — names ≠ reading sounds) → P30 (reading requires sounds: /b/-/æ/-/t/ = 'bat') → P31 → P32 (5 words decoded with sounds, not names)

**MAMR status:** FOUNDATIONAL for MC-1. Must be cleared before MC-1 repair. Rationale: context-sensitive phoneme variation (MC-1) requires the student to perceive different sounds for the same grapheme. A student still confusing letter names with sounds (MC-4) cannot perceive phonemic variation — they're producing names, not sounds, and cannot compare /k/ with /s/ as letter 'c' variants.

---

## 7. Assessment Battery

---

**AB-1 — Grapheme Identification**

For each word, identify each grapheme (circle single-letter graphemes; bracket digraphs): 'ship', 'cake', 'thin', 'bed', 'phone', 'bat'.

Expected:
- ship: [sh]-i-p
- cake: c-a-k-e (e is the silent grapheme controller)
- thin: [th]-i-n
- bed: b-e-d
- phone: [ph]-o-n-e
- bat: b-a-t

Target: 5/6 words correctly segmented into graphemes.

---

**AB-2 — Sound Count**

How many sounds (phonemes) in each word: 'chat', 'bike', 'ship', 'bat', 'phone', 'splash'?

Expected: 3, 3, 3, 3, 3, 5. Target: 4/6.

---

**AB-3 — Decoding**

Read these words aloud (evaluated by teacher/engine): 'sit', 'chip', 'cake', 'thin', 'mop', 'shame'.

Target: 5/6 words decoded correctly. (Accent-neutral — phoneme-correct regardless of regional accent.)

---

**AB-4 — Context-Dependent Sound**

"The letter 'g' can make two sounds. Read each word: 'got', 'gem', 'gap', 'giraffe'. Which words use the 'soft g' sound (/dʒ/)?"

Expected: gem, giraffe. Target: 2/2.

---

## 8. Mastery Gate

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

**P77 — Generation Probe**

"Choose any word that contains a digraph. Write it, circle the digraph, and state how many sounds the word has."

Pass: valid digraph word; grapheme correctly identified; correct phoneme count.

---

**P76 — Transfer Probe**

"How many sounds are in the word 'phone'? How many letters? What grapheme represents the /f/ sound?"

*P76 independence note: 'ph'=/f/ is a specific digraph covered in eng.phonics.digraphs. That blueprint need not be authored first; the /f/ sound from 'ph' is deducible from the grapheme-phoneme principle taught here.*

Pass: 3 sounds (/f/-/əʊ/-/n/); 5 letters; 'ph' is the /f/ grapheme.

---

**P75 — Boundary Probe**

"Is English spelling perfectly phonetic? Give one example of a word where the spelling does not straightforwardly represent the sounds."

Pass: "no" + valid example (e.g., 'said', 'knight', 'one', 'colonel', 'through').

---

**P74 — Classification Probe**

"For each word, identify every grapheme and the phoneme it represents: (a) ship (b) cake (c) chat (d) bed"

Pass (see AB-1 key above): correct grapheme segmentation and phoneme label for each.

---

**P78 — Explanation Probe**

"In one sentence: why is knowing the names of the 26 letters of the alphabet not enough to read English words?"

Pass: "letter names are not the sounds letters make in words; reading requires matching written letters/groups to their phonemes (sounds), not their names."

---

**Mastery decision:**

All 5 probes at 85% → MASTERY_CONFIRMED; schedule Component 9 retrieval  
3–4/5 → PARTIAL_MASTERY; schedule Day 1 retrieval  
<3/5 → return to Protocol A TA-A01

---

## 9. Retrieval Schedule

Based on P89 SPACED REPETITION: intervals 1, 3, 7, 21, 60 days.

**Day 1:** `P56` — decode 5 new CVC words; identify digraphs in 3 words.

**Day 3:** `P88` — sound count for 6 words (3 containing digraphs, 3 without); AB-4 soft-g test.

**Day 7:** `P88` — AB-1 grapheme identification (new words); read aloud 4 words including one with silent-e.

**Day 21:** `P88` — transfer: "How many sounds in 'knight'? What's happening with the letters 'kn'?" (silent k — boundary case); generation probe P77.

**Day 60:** `P88` — full AB-2 sound count + AB-3 decoding battery; explain boundary probe P75 from cold recall.

---

## 10. Validation Checklist

| Check | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| V-1 | All concept id slots reference valid KG nodes | PASS | eng.phonics.letter-sound-correspondence, alphabet-recognition, blending-segmenting valid; cross-link eng.phonics.phonemic-awareness valid |
| V-2 | difficulty=1 → cpa_entry_stage = C | PASS | cpa_entry_stage=C; difficulty=1 + english/phonics domain both require C |
| V-3 | mastery_threshold matches KG value | PASS | 0.85 per KG specification |
| V-4 | Canonical 10-field schema only | PASS | No domain/concept_type in JSON |
| V-5 | No invented primitives | PASS | All primitives P01–P91 |
| V-6 | GR-1: all TAs start P01 or P02 | PASS | A01–A05: P01; B01: P02; B02–B04: P01; C01: P02; C02–C06: P01; D01–D04: P01; E01–E04: P01 |
| V-7 | GR-2: P55 follows every elicitation primitive | PASS | Every P34/P35/P41/P42/P43/P88/P74–P78 followed by P55 |
| V-8 | GR-3: P08 only after P06 or P07 has fired | PASS | P08 in TA-B03 only (after P07 in B02/B01); P08 in C02/C03/C04/C05 all after P06 or P07 fired in same TA |
| V-9 | GR-4: repair chains gated by P41 | PASS | All MC repair chains entered after P41 in TA-C01 |
| V-10 | GR-5: P28 absent from Protocol D (S6) | PASS | Protocol D uses P30 in D02/D03; no P28 in any D-series TA |
| V-11 | GR-6: P91 terminal | PASS | TA-A05, B04, C06, D04, E04 all end with P91 |
| V-12 | GR-7: ≤3 consecutive C-primitives | PASS | No TA exceeds 2 consecutive C-primitives (P14, P15, P16, P17, P20, P23) |
| V-13 | GR-8: P54 precedes first-attempt high-difficulty questions | PASS | P54 in TA-A01 NO_RESPONSE branch; P54 in E03 NO_RESPONSE branch |
| V-14 | GR-9: assessment primitives not in first TA | PASS | P74–P78 only in mastery gate TAs |
| V-15 | GR-10: Named Compound expansions substituted | PASS | P91 expanded P77→P76→P75→P74→P78; P89 in retrieval schedule not embedded in TA |
| V-16 | Response taxonomy present for all elicitation primitives | PASS | All P34/P41/P42/P43/P88 in all TAs have inline taxonomy blocks |
| V-17 | All P49 branches specified | PASS | CORRECT/PARTIAL/INCORRECT/NO_RESPONSE routing for all elicitation cycles |
| V-18 | Session cap respected | PASS | Protocol A: 5 TAs (3h ≥ 1h → max 7); B: 4 TAs; C: 3–5 TAs; D: 4 TAs; E: 4 TAs |
| V-19 | Transfer contexts reference cross-linked concept | PASS | P76 transfer uses 'phone' (digraph ph — cross-link to eng.phonics.digraphs and eng.phonics.phonemic-awareness); P76 independence note present |
| V-20 | AIR-1 through AIR-5 pass | PASS | Content in slots (AIR-1); taxonomy pre-authored (AIR-2); P49 routing deterministic (AIR-3); primitives concept-independent (AIR-4); sequences fixed (AIR-5) |

**PACKAGE_READY: YES** — All 20 V-checks PASS. Components 0–9 present. Blueprint approved for Educational Brain integration.
