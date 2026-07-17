# Teaching Blueprint — eng.phonics.consonants

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonics.consonants
name: Consonant Sounds
domain: english / phonics
difficulty:
  label: foundational
  number: 1
bloom: understand
prerequisites:
  - eng.phonics.letter-sound-correspondence
mastery_threshold: 0.85
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonics domain → concrete/auditory entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS
- **Trigger signal:** Student assumes "c" and "g" each always represent one fixed sound (e.g., always /k/ for "c," always /g/ (hard) for "g"), and is confused or produces errors when reading words like "city," "cent," "gem," or "giant" where the sound shifts.
- **Conflict evidence [P28]:** "Say 'cat' — what sound does 'c' make? Now say 'city' — what sound does 'c' make there? Are they the same?"
- **Bridge text [P30]:** "The letters 'c' and 'g' each represent TWO different sounds depending on which letter comes right after them — usually a hard sound before a, o, u (cat, cot, cut) and a soft sound before e, i, y (city, cent, gem, giant). This is a real, learnable pattern, not randomness."
- **Replacement text [P31]:** "Before saying the sound for 'c' or 'g', check the very next letter — that tells you whether to use the hard or soft sound."
- **Discrimination pairs [P33]:**
  - "cat" (hard /k/, followed by 'a') vs. "cent" (soft /s/, followed by 'e').
  - "gum" (hard /g/, followed by 'u') vs. "gem" (soft /dʒ/, followed by 'e').
- **s6_path:** "This feels inconsistent at first, but it's actually a reliable pattern based on the letter that follows — once you know the rule, 'c' and 'g' become predictable instead of confusing."

### MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND
- **Trigger signal:** Student expects a strict one-letter-one-sound rule for all consonants and becomes confused by digraphs or silent letters within single-consonant-focused work (e.g., insists "wh" in "who" must make a /w/-then-/h/ sequence, or that the "k" in "knife" must be pronounced).
- **Conflict evidence [P28]:** "Say 'knife' out loud, naturally, the way you'd say it in a sentence. Do you actually hear a /k/ sound at the start, or does it start right on the /n/?"
- **Bridge text [P30]:** "Most single consonant letters do reliably represent one sound in isolation — but English also has silent letters and letter-combinations that don't follow the simple one-letter-one-sound pattern. Consonant sounds are the reliable foundation; letter-combination exceptions are learned separately, on top of this foundation."
- **Replacement text [P31]:** "Learn the reliable single-consonant sounds first and treat exceptions (silent letters, digraphs) as a separate, later layer — don't let the exceptions undermine confidence in the reliable core pattern."
- **Discrimination pairs [P33]:**
  - "nap" (n = reliably /n/) vs. "knife" (k is silent — an exception, not a broken rule).
  - "sit" (s = reliably /s/) vs. "island" (s is silent — an exception).
- **s6_path:** "It can feel like the rules keep breaking, but the core single-consonant-sound pattern IS reliable for the vast majority of words — silent letters are a smaller, separate list to learn on top, not proof the whole system is unpredictable."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Basic letter-sound readiness**
Prompt: "What sound does the letter 'b' make? What about 'm'?"
- Pass: correctly produces /b/ and /m/ (per `eng.phonics.letter-sound-correspondence`).
- Fail → [P52]: brief letter-sound-correspondence refresher before proceeding. Persistent failure → route to eng.phonics.letter-sound-correspondence for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The consonant sound wall**

> Present a set of picture cards, each showing an object whose name starts with a distinct consonant sound (ball, cat, dog, fish, goat...). Say each sound in isolation, student matches it to the correct picture by pointing, then names the object aloud, emphasizing the initial sound ("/b/... ball!"). This anchors each consonant sound to a concrete, memorable real-world referent before any hard/soft or exception rules are introduced.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Single Consonant Sound Production [C]**

Present each single-letter consonant (b, d, f, g, h, j, k, l, m, n, p, r, s, t, v, w, y, z — excluding c, x, q which need special handling) in isolation; student produces the correct sound for each.

**TA-2 — Consonants in Word-Initial Position [C]**

Present simple words; student isolates and produces the initial consonant sound correctly before reading/blending the whole word.

**TA-3 — Hard/Soft C and G Rule Discovery [C→P]**

Present word pairs contrasting hard and soft "c" (cat/cent) and hard and soft "g" (gum/gem). Guide the student to discover the vowel-following pattern (a/o/u → hard; e/i/y → soft) rather than stating the rule first.

**TA-4 — Applying the Hard/Soft Rule to Novel Words [P]**

Present new, unseen words with "c" or "g" (e.g., "cycle," "giant," "cot," "gap"); student predicts the correct sound before confirming, applying the rule from TA-3.

**TA-5 — Reliable-Core vs. Exception Sorting [P]**

Present a mixed set of words, some following the simple one-letter-one-sound pattern (nap, sit, top) and some containing a silent consonant (knife, island, write). Student sorts into "follows the reliable pattern" vs. "has an exception to learn separately," reinforcing that exceptions don't invalidate the core rule.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — single consonant sound)**

> "What sound does the letter 'd' make?"

Target response: /d/.

**WE-2 (Foundational — word-initial isolation)**

> "What is the first sound in 'fish'?"

Target response: /f/.

**WE-3 (Intermediate — hard/soft c rule application)**

> "Does 'c' in 'circle' make a hard or soft sound? Why?"

Target response: soft (/s/) — because "c" is followed by "i."

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Single consonant sound, novel letter**
"What sound does 'v' make?"
*Target:* /v/.

**MP-2 [P36] — Word-initial isolation, novel word**
"What is the first sound in 'goat'?"
*Target:* /g/ (hard, since followed by "o").

**MP-3 [P36] — Hard/soft g rule, novel word**
"Is the 'g' in 'giant' hard or soft? How do you know?"
*Target:* soft (/dʒ/) — because "g" is followed by "i."

**MP-4 [P36] — Reliable pattern vs. exception**
"Does the 'w' in 'write' make its usual sound? What's happening here?"
*Target:* correctly identifies the "w" as silent — an exception, not proof that "w" is generally unreliable elsewhere.

**MP-5 [P36] — Explain the hard/soft rule**
"In your own words: how do you decide whether 'c' or 'g' should be hard or soft?"
*Target:* states or demonstrates the rule — check the letter immediately following; a/o/u → hard, e/i/y → soft.

---

## Component 7 — Session Architecture

```
[P01] Session open — consonant sound wall warm-up (2-3 known sounds)
  ↓
[P41] PD-1 (basic letter-sound readiness)
  ↓ PASS
[P06] Anchor: consonant sound wall (picture-card matching)
  ↓
TA-1: Single consonant sound production [C]
  ↓
TA-2: Consonants in word-initial position [C]
  ↓
TA-3: Hard/soft c and g rule discovery [C→P]
  ↓
[P28] Conflict: c/g treated as single fixed sound → MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS (if triggered)
  ↓
TA-4: Applying the hard/soft rule to novel words [P]
  ↓
TA-5: Reliable-core vs. exception sorting [P]
  ↓
[P28] Conflict: rigid one-letter-one-sound expectation broken by exceptions → MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND (if triggered)
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find one word with a soft 'c' or soft 'g' sound."
[P68] Session close
[P85] Regulation tail — praise pattern-checking (looking at the next letter) over guessing
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 85%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (no prior consonant-sound instruction beyond basic letter-sound pairs): keep TA-1/TA-2 to a small, high-frequency subset before introducing hard/soft c/g. S1 (secure on basic consonants, struggles specifically with c/g): compress TA-1/TA-2, spend most of the session on TA-3/TA-4. S6 (frustrated that "the rules keep changing"): explicitly frame the hard/soft pattern as itself a reliable rule (not randomness) before teaching it — reducing the sense of arbitrary exceptions. S9 (L1 lacks certain English consonant sounds, e.g. no /θ/,/ð/,/r/-/l/ distinction, or no /v/-/w/ distinction): expect specific, predictable substitution errors tied to the learner's L1 phoneme inventory (already flagged conceptually in eng.phonetics.articulation-organs); treat these as transfer effects, not carelessness, and allow extra discrimination practice on the specific contrastive pair.

---

## Component 8 — Adaptive Flags

- **Hard/soft c and g is a rule, not an exception list**: frame this pattern explicitly as learnable and predictable (based on the following letter) rather than as a set of irregular exceptions to memorize — this directly counters MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS.
- **Silent letters are a separate later layer**: do not let a small number of true silent-letter exceptions (knife, island, write) undermine confidence in the otherwise highly reliable single-consonant-sound system — frame explicitly per Component 1's s6_path.
- **q and x deferred**: "q" (almost always paired with "u," /kw/) and "x" (usually /ks/, sometimes /z/ word-initially) are NOT covered as core single-consonant sounds in this concept — they involve blend/cluster behavior better addressed alongside consonant-blends content; do not introduce them here to avoid diluting the core 18-consonant focus.
- **L1 phoneme-inventory transfer**: for S9 learners, anticipate specific substitution patterns from known L1-English phoneme contrasts (building on eng.phonetics.articulation-organs) rather than treating all consonant errors as equally likely or random.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonics.consonants |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonics.letter-sound-correspondence ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — foundational |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.85 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS, MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (basic letter-sound readiness) |
| V-10 | Concrete anchor present [P06] | PASS — consonant sound wall |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonics domain always concrete/auditory) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — hard/soft rule framing, silent-letter layering, q/x deferral, L1 transfer anticipation |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
