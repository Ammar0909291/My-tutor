# Teaching Blueprint — eng.phonics.blending-segmenting

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonics.blending-segmenting
name: Blending and Segmenting
domain: english / phonics
difficulty:
  label: foundational
  number: 1
bloom: understand
prerequisites:
  - eng.phonics.phonemic-awareness
  - eng.phonics.rhyming
mastery_threshold: 0.80
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonics domain → concrete/auditory entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-BLENDING-IS-JUST-FAST-LETTERS
- **Trigger signal:** Student attempts to blend by naming letters quickly rather than producing continuous sounds (e.g., says "buh-ah-tuh" with hard stops between each letter-name, producing "buh-ah-tuh" instead of a smooth "bat"), and cannot merge the sounds into a recognizable word.
- **Conflict evidence [P28]:** "Listen to me say the letter names fast: 'buh... ah... tuh'. Does that sound like a real word? Now listen to me stretch and glide the actual SOUNDS together without stopping: 'bbbaaat' → 'bat'. Which one turned into a word you know?"
- **Bridge text [P30]:** "Blending means gliding sounds together smoothly, without a pause between them — not naming letters one at a time. Stopping between sounds (especially adding an extra 'uh' after stop sounds like b, t, k) breaks the word apart instead of joining it."
- **Replacement text [P31]:** "Stretch and glide each sound directly into the next one, with no pause and no added 'uh' sound, until they merge into a word."
- **Discrimination pairs [P33]:**
  - "b-a-t" blended smoothly → "bat" (correct) vs. "buh-ah-tuh" with stops (does not resolve to a real word).
  - "s-u-n" glided → "sun" vs. "suh-uh-nuh" stopped → unrecognizable.
- **s6_path:** "This trips up almost every beginner because letter NAMES (like 'buh' for B) are different from letter SOUNDS (a clipped /b/) — we'll practice stretching sounds together without stopping until it clicks."

### MC-SEGMENTING-STOPS-AT-SYLLABLES
- **Trigger signal:** Student segments a word only down to syllables, not individual phonemes (e.g., segments "cat" as one chunk, or segments "rabbit" as "rab-bit" and stops there, rather than continuing to /r/-/æ/-/b/-/ɪ/-/t/), treating syllable-level chunking as equivalent to full phonemic segmentation.
- **Conflict evidence [P28]:** "You split 'rabbit' into 'rab' and 'bit' — good, that's the syllables. Now can you break 'rab' down even further into its separate sounds? How many sounds are inside just that one chunk?"
- **Bridge text [P30]:** "Segmenting a word fully means breaking it all the way down to its smallest individual sounds (phonemes) — syllables are a bigger, in-between chunk, a useful first step but not the finish line."
- **Replacement text [P31]:** "After finding syllables, keep breaking each syllable down further into its individual sounds — check that no chunk can be split any smaller."
- **Discrimination pairs [P33]:**
  - "cat" segmented as one syllable/chunk (incomplete) vs. /k/-/æ/-/t/ (fully segmented, 3 phonemes).
  - "rabbit" segmented as "rab-bit" (syllables only) vs. /r/-/æ/-/b/-/ɪ/-/t/ (fully segmented, 5 phonemes).
- **s6_path:** "Syllables feel like a natural stopping point because they're easier to hear as chunks — we'll always double check by asking 'can this piece be broken down even smaller?'"

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Phonemic isolation readiness**
Prompt: "What is the first sound in 'sun'? What is the last sound?"
- Pass: correctly isolates /s/ and /n/ (per `eng.phonics.phonemic-awareness`).
- Fail → [P52]: brief phonemic-awareness refresher (sound isolation) before proceeding. Persistent failure → route to eng.phonics.phonemic-awareness for reteaching.

**PD-2 [P41] — Ending-sound comparison readiness**
Prompt: "Do 'cat' and 'hat' end with the same sound?"
- Pass: correctly confirms the shared ending sound (per `eng.phonics.rhyming`).
- Fail → [P52]: brief rhyming refresher before proceeding. Persistent failure → route to eng.phonics.rhyming for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The sound-chip slide**

> Place three counters/chips in a row, spaced apart. Say a simple word slowly, sliding a finger from one chip to the next as each sound is produced ("/k/... /æ/... /t/"), then sweep a finger quickly across all three chips while saying the blended word fast ("cat!"). Reverse the demonstration: say the whole word fast, then slide back through the chips saying each sound slowly. This anchors blending/segmenting as two directions of the same physical chip-sliding action.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Blending from Sounds to Word [C]**

Present isolated sounds slowly, sound by sound (e.g., "/m/... /a/... /p/"), student blends them into the whole word ("map"). Use the chip-slide from Component 3 as physical support for early attempts.

**TA-2 — Segmenting from Word to Sounds [C]**

Reverse direction: present a whole word, student breaks it into individual sounds, placing/pointing to one chip per sound. Confirm full segmentation (not just syllables) using the Component 1 check.

**TA-3 — Blending Without Chips [C→P]**

Repeat TA-1 without physical chips, purely auditory — sounds are presented orally with brief pauses, student blends mentally.

**TA-4 — Segmenting Without Chips [P]**

Repeat TA-2 without chips — student segments a spoken word into its sounds purely orally, saying each sound aloud in sequence.

**TA-5 — Sound Manipulation (Add/Delete) [P]**

Introduce a light manipulation task building on blending/segmenting: "Say 'cat'. Now say it without the /k/." (Target: "at.") Or: "Say 'an'. Now add /m/ to the front." (Target: "man.") This bridges directly toward decoding/spelling work.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — blending)**

> "I'll say the sounds slowly: /f/... /i/... /sh/. Blend them into a word."

Target response: "fish."

**WE-2 (Foundational — segmenting)**

> "Say 'dog' and break it into its separate sounds."

Target response: /d/-/ɒ/-/g/ (3 sounds — not left at the whole-word or syllable level).

**WE-3 (Intermediate — sound deletion)**

> "Say 'stop'. Now say it without the /s/ sound."

Target response: "top."

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Blending, novel set**
"Blend these sounds: /b/... /i/... /g/."
*Target:* "big" — produced with a smooth glide, not stopped letter-names.

**MP-2 [P36] — Segmenting, novel word**
"Segment 'frog' into its individual sounds."
*Target:* /f/-/r/-/ɒ/-/g/ (4 phonemes — checks that segmentation does not stop at a syllable/blend-cluster level for the "fr" blend).

**MP-3 [P36] — Blending without chips (auditory only)**
"Just by listening, blend: /ʃ/... /ɛ/... /l/... /f/."
*Target:* "shelf" — performed with no physical support.

**MP-4 [P36] — Sound manipulation**
"Say 'plane'. Now say it without the /p/ sound."
*Target:* "lane."

**MP-5 [P36] — Explain the relationship**
"In your own words: how are blending and segmenting related to each other?"
*Target:* states or demonstrates that they are opposite/reverse processes — blending joins separate sounds into a word, segmenting breaks a word apart into its separate sounds.

---

## Component 7 — Session Architecture

```
[P01] Session open — chip-slide demonstration (blend forward, segment backward)
  ↓
[P41] PD-1 (phonemic isolation readiness)
  ↓ PASS
[P41] PD-2 (ending-sound comparison readiness)
  ↓ PASS
[P06] Anchor: sound-chip slide (both directions)
  ↓
TA-1: Blending from sounds to word [C]
  ↓
[P28] Conflict: letter-name stops instead of gliding → MC-BLENDING-IS-JUST-FAST-LETTERS (if triggered)
  ↓
TA-2: Segmenting from word to sounds [C]
  ↓
[P28] Conflict: stopping at syllable level → MC-SEGMENTING-STOPS-AT-SYLLABLES (if triggered)
  ↓
TA-3: Blending without chips [C→P]
  ↓
TA-4: Segmenting without chips [P]
  ↓
TA-5: Sound manipulation (add/delete) [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, segment your own name into its separate sounds."
[P68] Session close
[P85] Regulation tail — praise smooth gliding and full (not partial) segmentation
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (no prior blending/segmenting exposure): keep chips physically present through TA-1/TA-2, use only 2-3-sound words (CVC) before longer words. S1 (segments syllables confidently but not phonemes): dwell on TA-2's full-segmentation check, explicitly contrasting syllable-chunking against phoneme-level segmenting. S6 (frustrated by choppy blending attempts): model gliding slowly and exaggeratedly several times before asking the student to try, and explicitly normalize the letter-name-vs-sound confusion as universal at this stage. S9 (L1 has different permissible consonant clusters, e.g. no word-initial /st-/ or /-mp/ endings): expect blending/segmenting of English consonant clusters to be harder than single-phoneme words for this learner — introduce cluster words gradually after single-phoneme CVC words are secure, not simultaneously.

---

## Component 8 — Adaptive Flags

- **Letter names vs. letter sounds must be explicit**: because most alphabet instruction teaches letter NAMES first, blending instruction must explicitly redirect students to use clipped SOUNDS (not "buh," "cuh," "tuh" with a trailing vowel) — this is the single most common blocking error.
- **Full segmentation, not syllable segmentation**: always verify segmentation reaches the phoneme level, not just the syllable level, using the Component 1 discrimination check as a standing routine, not a one-time correction.
- **Chips/manipulatives are a scaffold, not the goal**: TA-3/TA-4 explicitly remove physical supports — mastery (Component 6 probes) is defined as achievable without them; continued dependence on chips at mastery-check time signals the skill is not yet internalized.
- **Consonant-cluster difficulty for L1-transfer learners**: for S9 learners whose L1 restricts consonant clusters, sequence CVC (single consonant) words before consonant-blend words (e.g., "stop," "desk") to avoid conflating a phonotactic-transfer difficulty with a blending/segmenting skill deficit.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonics.blending-segmenting |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonics.phonemic-awareness ✓, eng.phonics.rhyming ✓ (both authored) |
| V-3 | difficulty label matches KG | PASS — foundational |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-BLENDING-IS-JUST-FAST-LETTERS, MC-SEGMENTING-STOPS-AT-SYLLABLES |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (phonemic isolation), PD-2 (ending-sound comparison) |
| V-10 | Concrete anchor present [P06] | PASS — sound-chip slide |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonics domain always concrete/auditory) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — letter-name/sound distinction, full-segmentation check, scaffold-fading, cluster-difficulty sequencing |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
