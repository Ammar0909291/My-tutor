# Teaching Blueprint — eng.phonetics.minimal-pairs

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonetics.minimal-pairs
name: Minimal Pairs
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

### MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS
- **Trigger signal:** Student labels any two similar-sounding or similar-looking words as a "minimal pair" regardless of how many phonemes actually differ (e.g., calls "cat" and "bad" a minimal pair, when they differ in TWO phonemes — the first and last sound — not one), diluting the precise definition.
- **Conflict evidence [P28]:** "You said 'cat' and 'bad' are a minimal pair. Let's transcribe both: /kæt/ and /bæd/. Line up the sounds — how many positions are actually different?"
- **Bridge text [P30]:** "A true minimal pair differs by EXACTLY ONE phoneme, in the same position, with every other sound identical — not just 'similar sounding' or 'a couple of sounds different.' The precision matters because minimal pairs are a diagnostic TOOL for isolating exactly one sound contrast at a time."
- **Replacement text [P31]:** "Before calling two words a minimal pair, transcribe both into IPA and check that exactly one sound position differs — if two or more differ, it's not a minimal pair."
- **Discrimination pairs [P33]:**
  - "cat" /kæt/ vs. "bat" /bæt/ (true minimal pair — differ only in the first sound) vs. "cat" /kæt/ vs. "bad" /bæd/ (differ in TWO positions — not a minimal pair).
  - "ship" /ʃɪp/ vs. "chip" /tʃɪp/ (true minimal pair — differ only in the first sound, /ʃ/ vs /tʃ/) vs. "ship" /ʃɪp/ vs. "chop" /tʃɒp/ (differ in two positions).
- **s6_path:** "It's tempting to call any two similar words a 'minimal pair' since they sound alike overall — but the strict one-sound-difference definition is what makes minimal pairs useful for testing a very specific contrast, so precision here really matters."

### MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE
- **Trigger signal:** Student judges minimal-pair status by counting LETTER differences in spelling rather than sound differences in pronunciation (e.g., assumes "night" and "knight" are NOT a minimal pair — or even the same word — because "knight" has an extra letter, when they are actually pronounced identically/homophonically; or assumes two words spelled very differently can't be a minimal pair even when they sound like one, e.g. "physics" vs. "fix-icks"-type constructed comparisons).
- **Conflict evidence [P28]:** "Look at 'night' and 'knight' — different number of letters, right? Now transcribe both into IPA using what you actually say. Are they actually different sounds, or the exact same?"
- **Bridge text [P30]:** "Minimal pairs are defined by SOUND (phonemes), not by spelling or letter count — English spelling is unreliable enough that some 'different-looking' words are pronounced identically (homophones, not a minimal pair, since there's zero sound difference), while some 'similar-looking' words have several sound differences hidden by similar spelling."
- **Replacement text [P31]:** "Always judge minimal-pair status from the IPA transcription (or careful listening), never from the spelled letters — transcribe first, then compare sound-by-sound."
- **Discrimination pairs [P33]:**
  - "night" /naɪt/ vs. "knight" /naɪt/ (identical pronunciation — a homophone pair, NOT a minimal pair, since there's no sound difference at all).
  - "though" /ðoʊ/ vs. "through" /θruː/ (very similar spelling, but actually differ in far more than one sound when transcribed — not a minimal pair despite the visual similarity).
- **s6_path:** "English spelling is a genuinely unreliable guide to sound, so this mix-up is very understandable — transcribing to IPA first, before judging, removes the guesswork."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — IPA transcription readiness**
Prompt: "Transcribe the word 'bat' into IPA."
- Pass: correctly produces /bæt/ (per `eng.phonetics.ipa-basics`).
- Fail → [P52]: brief IPA-basics refresher before proceeding. Persistent failure → route to eng.phonetics.ipa-basics for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The one-slot-swap game**

> Write out three IPA "slots" for a simple word, e.g., /_-æ-t/ for "cat" = /k/-/æ/-/t/. Physically swap only the first slot's symbol (k → b) to produce /b/-/æ/-/t/ = "bat," pointing out that only ONE slot changed. Then try swapping two slots at once (k→b AND t→d) to produce "bad," explicitly noting: "that's TWO changes, so it's not a minimal pair with 'cat.'" This anchors the "exactly one slot differs" definition as a physical, countable rule.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Identifying True Minimal Pairs [C]**

Present pairs of words, some true minimal pairs (cat/bat, ship/sheep, pen/pin) and some near-misses differing by 2+ sounds (cat/bad, ship/chop); student transcribes both into IPA and determines true/false minimal-pair status, directly targeting MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS.

**TA-2 — Minimal Pairs Despite Spelling Mismatch [C]**

Present pairs where spelling misleads (night/knight as a homophone non-pair; a genuine minimal pair with very different-looking spelling if available, e.g. "of"/"off" is NOT one but illustrates the trap — use genuinely available contrastive examples); student transcribes first, then judges, directly targeting MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE.

**TA-3 — Perception Training: Which Word Did You Hear? [C→P]**

Auditory-only task (no spelling shown): student hears one word from a minimal pair spoken aloud and identifies which of the two it was (e.g., hears /ʃɪp/ or /tʃɪp/, says "ship" or "chip"), building genuine perceptual discrimination, not just written analysis.

**TA-4 — Generating Minimal Pairs [P]**

Given one word, student generates a valid minimal-pair partner by changing exactly one phoneme (e.g., given "pen" /pɛn/, generate "pin" /pɪn/ by changing only the vowel, or "hen" /hɛn/ by changing only the first consonant).

**TA-5 — Minimal Pairs for a Specific Target Contrast [P]**

Given a specific phoneme contrast to test (e.g., /l/ vs. /r/, a classically difficult contrast for some L1 backgrounds), student identifies or generates a minimal pair that isolates exactly that contrast (light/right), connecting this concept to its diagnostic PURPOSE — testing perception/production of a specific sound distinction.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — true vs. false minimal pair)**

> "Is 'pen' and 'pin' a minimal pair? Is 'pen' and 'bat' a minimal pair?"

Target response: "pen"/"pin" — yes, true minimal pair (differ only in the vowel, /ɛ/ vs /ɪ/); "pen"/"bat" — no, differs in all three sounds.

**WE-2 (Foundational — spelling trap)**

> "Are 'night' and 'knight' a minimal pair?"

Target response: no — they are pronounced identically (/naɪt/ both), making them homophones, not a minimal pair (zero sound difference, not one).

**WE-3 (Intermediate — generating a pair)**

> "Give me a minimal pair for the word 'sip.'"

Target response: any valid one-phoneme change, e.g., "sit" (changing the final consonant), "zip" (changing the first consonant), or "sap" (changing the vowel).

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — True vs. false minimal pair, novel words**
"Is 'log' and 'dog' a minimal pair? Is 'log' and 'lot' a minimal pair?"
*Target:* "log"/"dog" — yes (differ only in the first consonant); "log"/"lot" — yes (differ only in the final consonant) — both true minimal pairs, correctly verified by transcription.

**MP-2 [P36] — Spelling trap, novel pair**
"Are 'route' and 'root' a minimal pair?" (Note: for many dialects, pronounced identically.)
*Target:* correctly identifies them as homophones in the relevant dialect (not a minimal pair), reasoning from pronunciation rather than the differing spelling.

**MP-3 [P36] — Auditory discrimination**
"[Say 'chip' or 'ship' aloud] Which word did you hear?"
*Target:* correctly identifies the word from sound alone.

**MP-4 [P36] — Generating a pair for a novel word**
"Give me a minimal pair for 'cot.'"
*Target:* any valid single-phoneme-change word, e.g., "cat," "cop," "hot."

**MP-5 [P36] — Explain the purpose of minimal pairs**
"In your own words: what is a minimal pair, and why are they useful for studying pronunciation?"
*Target:* states or demonstrates the one-phoneme-difference definition and explains they isolate a single sound contrast for targeted perception/production practice.

---

## Component 7 — Session Architecture

```
[P01] Session open — one-slot-swap game warm-up (cat → bat)
  ↓
[P41] PD-1 (IPA transcription readiness)
  ↓ PASS
[P06] Anchor: one-slot-swap game (one change = pair, two changes = not)
  ↓
TA-1: Identifying true minimal pairs [C]
  ↓
[P28] Conflict: loosely-similar words called minimal pairs → MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS (if triggered)
  ↓
TA-2: Minimal pairs despite spelling mismatch [C]
  ↓
[P28] Conflict: judging by spelling instead of sound → MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE (if triggered)
  ↓
TA-3: Perception training — which word did you hear? [C→P]
  ↓
TA-4: Generating minimal pairs [P]
  ↓
TA-5: Minimal pairs for a specific target contrast [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, generate a minimal pair for your own name's first sound."
[P68] Session close
[P85] Regulation tail — praise verifying via transcription over guessing from spelling
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on IPA basics, new to the minimal-pair concept specifically): dwell on TA-1's true/false sorting with the slot-swap anchor before moving to generation. S1 (already loosely understands "similar words" informally): explicitly tighten the definition via TA-1's precise one-slot check before building further, since a loose prior understanding needs correcting, not just supplementing. S6 (frustrated by the precision required): validate that this precision is intentional and purposeful (a diagnostic tool), not arbitrary pedantry. S9 (L1 lacks a specific English phoneme contrast, e.g. /l/-/r/ for many East Asian L1 backgrounds, /b/-/v/ for Spanish, /iː/-/ɪ/ for many L1s without a length/quality distinction): use TA-5 explicitly to target the learner's own known difficult contrast with dedicated minimal-pair practice — this is the concept's most direct practical application for this learner.

---

## Component 8 — Adaptive Flags

- **Precision is the point**: the strict one-phoneme-difference definition is not pedantry — it is what makes minimal pairs useful as a diagnostic tool; do not accept loosely-similar word pairs as satisfying mastery checks.
- **Transcribe before judging, always**: every minimal-pair judgment task should route through IPA transcription (or careful auditory attention) rather than visual spelling comparison — this is the standing habit this concept is built to instill.
- **Auditory-only practice is essential, not optional**: TA-3's no-spelling-shown task is necessary because real-world listening comprehension doesn't come with spelling — written-only practice would not fully build the intended skill.
- **Personalize to the learner's known difficult contrast**: for S9 learners, identify the specific phoneme contrast most relevant to their L1 background (per articulation-organs/consonant-sounds groundwork) and prioritize minimal-pair practice on exactly that contrast (TA-5) as the highest-value application of this concept.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonetics.minimal-pairs |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonetics.ipa-basics ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — developing |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS, MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (IPA transcription readiness) |
| V-10 | Concrete anchor present [P06] | PASS — one-slot-swap game |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonetics domain always concrete/auditory) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — precision requirement, transcribe-before-judging, auditory-only necessity, personalized-contrast targeting |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
