# Teaching Blueprint — eng.phonetics.articulation-organs

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonetics.articulation-organs
name: Organs of Articulation
domain: english / phonetics
difficulty:
  label: developing
  number: 2
bloom: understand
prerequisites:
  - eng.phonetics.speech-sounds-overview
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonetics domain → concrete/kinesthetic entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-ONLY-TONGUE-MATTERS
- **Trigger signal:** Student attributes all speech-sound differences to "the tongue" alone, ignoring lips, teeth, vocal folds, and airflow (e.g., "you just move your tongue to make different sounds"), and cannot explain sounds like /m/ or /f/ that involve minimal tongue movement.
- **Conflict evidence [P28]:** "Say 'mmmm' — where is your tongue? (Resting, not doing much.) Now say 'ffff' — is your tongue doing the work, or is it your teeth and lip?"
- **Bridge text [P30]:** "Speech uses a whole system of articulators working together — lips, teeth, tongue, the roof of the mouth (palate), the throat, and the vocal folds — not just the tongue. Different sounds recruit different combinations."
- **Replacement text [P31]:** "For any sound, ask which articulators are actually involved — don't assume the tongue is always the answer."
- **Discrimination pairs [P33]:**
  - "/m/" (lips + nasal airflow, tongue passive) vs. "/t/" (tongue-tip + ridge behind teeth, lips passive).
  - "/f/" (lower lip + upper teeth) vs. "/θ/" as in "think" (tongue-tip + teeth) — both involve teeth, but different primary articulators.
- **s6_path:** "It's an easy assumption because the tongue does a lot of work in speech — but several very common sounds barely use it at all, so we'll go through each articulator's job one at a time."

### MC-VOICED-VOICELESS-IS-VOLUME
- **Trigger signal:** Student assumes "voiced" means louder or more forceful, and "voiceless" means quieter or whispered, rather than understanding voicing as vocal-fold vibration versus non-vibration, independent of loudness.
- **Conflict evidence [P28]:** "Whisper 'zzzz' as quietly as you can, but keep your hand on your throat. Do you still feel any buzzing? Now say 'ssss' loudly. Does it buzz just because it's loud?"
- **Bridge text [P30]:** "Voicing is about whether your vocal folds vibrate — a physical on/off switch — not about how loud or soft you say something. You can whisper a voiced sound (weak buzz) or shout a voiceless one (no buzz, however loud)."
- **Replacement text [P31]:** "Check voicing with the throat/vibration test, never by loudness."
- **Discrimination pairs [P33]:**
  - Quiet "zzzz" (still buzzes — voiced) vs. loud "ssss" (never buzzes, however loud — voiceless).
  - "/b/" whispered softly (weak but present buzz) vs. "/p/" shouted (no buzz regardless of volume).
- **s6_path:** "Volume and voicing feel like they should be connected, but they're actually two completely separate things — the throat-vibration check is the only reliable test."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Sound/letter distinction readiness**
Prompt: "Say the word 'flag' slowly, sound by sound. Now tell me: does English always spell each sound with exactly one letter?"
- Pass: segments the word correctly and confirms sound/letter mismatch is possible (per `eng.phonetics.speech-sounds-overview`).
- Fail → [P52]: brief refresher on the sound-vs-letter distinction and the voiced/voiceless "buzz test" before proceeding. Persistent failure → route to eng.phonetics.speech-sounds-overview for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The vocal-tract tour**

> Using a simple side-view diagram of the head (lips, teeth, tongue tip/blade/back, alveolar ridge, hard palate, soft palate/velum, throat/glottis), have the student touch each named location on their own face/mouth while producing a sound that uses it: lips for /p/, teeth+lip for /f/, tongue-tip+ridge for /t/, tongue-back+soft-palate for /k/, throat for a held vowel. This anchors each articulator as a physical, locatable body part with a felt function, not an abstract diagram label.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Articulator Identification [C]**

Using the vocal-tract diagram, student names and locates each major articulator (lips, teeth, tongue tip/back, alveolar ridge, palate, velum, vocal folds) by touching the corresponding spot on their own face/mouth.

**TA-2 — Place of Articulation Sorting [C]**

Present a set of consonant sounds (/p/, /t/, /k/, /f/, /s/, /m/) and ask the student to identify which articulator(s) are the primary "place" for each, using the felt-sensation method from Component 3.

**TA-3 — Voiced/Voiceless Throat Test [C→P]**

Using the buzz-test method, sort a list of consonant pairs that share place/manner but differ in voicing (e.g., /p/-/b/, /t/-/d/, /k/-/g/, /f/-/v/, /s/-/z/) into voiced vs. voiceless, explicitly testing at different volumes to break MC-VOICED-VOICELESS-IS-VOLUME.

**TA-4 — Manner of Articulation Introduction [P]**

Introduce the idea that sounds differ not just in WHERE they're made (place) but HOW airflow is shaped (manner) — stop (complete blockage, e.g., /p/,/t/,/k/) vs. fricative (narrow channel, friction, e.g., /f/,/s/) vs. nasal (air through the nose, e.g., /m/,/n/). Student classifies 4-5 sounds by manner.

**TA-5 — Full Sound Description [P]**

Student describes a given consonant sound using all three dimensions together (place + manner + voicing) — e.g., "/b/ is a voiced bilabial stop" (without requiring the formal labels if not yet taught, describing in plain terms is acceptable: "made with both lips, fully blocked then released, and it buzzes").

---

## Component 5 — Worked Examples

**WE-1 (Foundational — articulator identification)**

> "Say 'k'. Which part of your mouth does the work?"

Target response: back of the tongue against the soft palate (velum).

**WE-2 (Foundational — voiced/voiceless buzz test)**

> "Say 'v' then 'f', hand on your throat. Which one buzzes?"

Target response: "v" buzzes (voiced); "f" does not (voiceless) — same place/manner, differ only in voicing.

**WE-3 (Intermediate — full description)**

> "Describe how you make the sound /m/ using place, manner, and voicing."

Target response: lips together (place: bilabial), air goes through the nose (manner: nasal), throat buzzes (voicing: voiced).

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Articulator identification, novel sound**
"Say 'th' as in 'think'. Where is your tongue?"
*Target:* tongue-tip touching or near the upper teeth.

**MP-2 [P36] — Voiced/voiceless discrimination, novel pair**
"Is 's' in 'sip' voiced or voiceless? What about the 'z' sound in 'zip'?"
*Target:* "s" voiceless (no buzz); "z" voiced (buzz) — correctly tested, not guessed.

**MP-3 [P36] — Manner classification**
"Is '/n/' a stop, a fricative, or a nasal? How do you know?"
*Target:* nasal — air flows through the nose, no full oral blockage sustained as airflow output.

**MP-4 [P36] — Volume-independent voicing check**
"If I whisper the letter 'b' very quietly, is it still voiced?"
*Target:* correctly identifies that voicing is about vocal-fold vibration, not loudness — a whispered /b/ has a weak but real voicing quality distinct from /p/ even at low volume (or, depending on framework, recognizes true whispers can suppress voicing but that loudness alone never determines the answer).

**MP-5 [P36] — Explain the system**
"In your own words: what does 'place of articulation' mean, and why isn't the tongue the only thing that matters?"
*Target:* explains that place refers to WHERE in the vocal tract a sound is produced, and correctly names at least two non-tongue articulators (lips, teeth, vocal folds) as relevant to different sounds.

---

## Component 7 — Session Architecture

```
[P01] Session open — vocal-tract diagram introduced, quick touch-and-say warm-up
  ↓
[P41] PD-1 (sound/letter distinction readiness)
  ↓ PASS
[P06] Anchor: vocal-tract tour (touch each articulator while producing its sound)
  ↓
TA-1: Articulator identification [C]
  ↓
[P28] Conflict: tongue-only assumption → MC-ONLY-TONGUE-MATTERS (if triggered)
  ↓
TA-2: Place of articulation sorting [C]
  ↓
TA-3: Voiced/voiceless throat test [C→P]
  ↓
[P28] Conflict: voicing-as-volume assumption → MC-VOICED-VOICELESS-IS-VOLUME (if triggered)
  ↓
TA-4: Manner of articulation introduction [P]
  ↓
TA-5: Full sound description [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, pick a sound and tell me its place, manner, and voicing."
[P68] Session close
[P85] Regulation tail — praise systematic checking (touch/buzz-test) over guessing
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (no prior phonetics vocabulary): keep the diagram simple, focus on 4-5 high-contrast sounds (/p/,/t/,/k/,/m/,/s/) before expanding. S1 (already secure on sound/letter distinction from prior concept): move briskly through TA-1/TA-2, spend more time on TA-4/TA-5's fuller descriptions. S6 (anxious about "getting the anatomy words wrong"): explicitly permit plain-language description over formal terms ("both lips" is fine before "bilabial") until confidence builds. S9 (L1 has sounds not present in English, e.g. uvular/pharyngeal consonants, or lacks sounds English has, e.g. /θ/,/ð/): use this as a genuine teaching asset — ask the student to describe how an L1 sound is articulated, then contrast with the target English sound's place/manner/voicing, building the skill through comparison rather than treating the L1 sound system as irrelevant.

---

## Component 8 — Adaptive Flags

- **Physical, not just diagrammatic**: every articulator introduced must be paired with the student physically locating it on their own face/mouth and feeling the associated sound — a diagram alone does not anchor this concept.
- **Volume/voicing must be explicitly decoupled**: because MC-VOICED-VOICELESS-IS-VOLUME is a near-universal first assumption, the buzz-test (not a loudness test) should be modeled and repeated at multiple volumes deliberately.
- **Terminology can lag understanding**: plain-language description ("both lips," "the air goes through your nose") is an acceptable and often preferable intermediate step before requiring formal terms (bilabial, nasal) — do not gate mastery on vocabulary alone if the underlying physical understanding (Component 6 MP-5) is correct.
- **L1 sound-system contrast as an asset**: for multilingual learners, deliberately invite comparison to L1 sounds where relevant (Protocol S9) — this both validates the learner's existing linguistic knowledge and deepens the place/manner/voicing framework through contrast.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonetics.articulation-organs |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonetics.speech-sounds-overview ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — developing |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-ONLY-TONGUE-MATTERS, MC-VOICED-VOICELESS-IS-VOLUME |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (sound/letter distinction readiness) |
| V-10 | Concrete anchor present [P06] | PASS — vocal-tract tour |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonetics domain always concrete/kinesthetic) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — physical anchoring, voicing/volume decoupling, terminology lag tolerance, L1 contrast asset |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
