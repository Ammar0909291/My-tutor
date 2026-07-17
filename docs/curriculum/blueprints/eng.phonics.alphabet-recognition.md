# Teaching Blueprint — eng.phonics.alphabet-recognition

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonics.alphabet-recognition
name: Alphabet Recognition
domain: english / phonics
difficulty:
  label: foundational
  number: 1
bloom: remember
prerequisites:
  - eng.phonics.print-concepts
mastery_threshold: 0.90
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonics domain → concrete/visual entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-CASE-ARE-DIFFERENT-LETTERS
- **Trigger signal:** Student treats "A" and "a" as unrelated symbols — can name uppercase letters in sequence but fails to match the lowercase form, or insists "that's not the same letter" when shown both cases side by side.
- **Conflict evidence [P28]:** "Here is a big 'B' and a little 'b'. Do they make the same first sound when we say the alphabet? Watch — B... b... B... b. Same name, same sound, just written two ways — like how you can write your name in big letters or small letters and it's still your name."
- **Bridge text [P30]:** "Every letter has two 'costumes' — a big (capital) one and a small (lowercase) one — but underneath the costume it is the same letter with the same name and sound."
- **Replacement text [P31]:** "Check the letter's name/sound first, then notice which costume (case) it's wearing — don't treat case as a different letter."
- **Discrimination pairs [P33]:**
  - "B / b" (same letter, different case) vs. "b / d" (different letters, similar shape — genuinely different).
  - "A / a" (same letter) vs. "A / e" (different letters).
- **s6_path:** "It's easy to think capital and lowercase are separate letters because they can look so different (like 'A'/'a' vs. 'G'/'g') — we'll match them side by side until the pairs feel automatic."

### MC-SHAPE-CONFUSION-MIRROR-LETTERS
- **Trigger signal:** Student confuses visually similar/mirror-image letters — most commonly "b/d," "p/q," or "m/w" — naming one for the other, especially in isolation without word context.
- **Conflict evidence [P28]:** "Let's check with our hands: make a fist with your left hand and stick your thumb up — that's a 'b' shape (thumb-loop on the left). Now your right hand — that's a 'd' shape (loop on the right). Look at this letter: which hand does it match?"
- **Bridge text [P30]:** "'b' and 'd' are mirror images of each other — same curve and stick, just facing opposite directions. Your eyes have to check WHICH WAY the shape faces, not just what shape it is."
- **Replacement text [P31]:** "For mirror-letters, always check which direction the loop or tail points before naming the letter."
- **Discrimination pairs [P33]:**
  - "b / d" (mirror pair) vs. "b / h" (both have an ascender but are not mirror images — genuinely different shapes).
  - "p / q" (mirror pair) vs. "p / g" (both have descenders but different shapes).
- **s6_path:** "Almost every beginning reader mixes up b/d and p/q at first — it is one of the most common and expected confusions, not a sign of a problem, and it usually resolves with repeated, patient practice."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Print-concept readiness**
Prompt: "Show me the front of this book. Now point to where I should start reading."
- Pass: correctly identifies book orientation and left-to-right/top-to-bottom starting point (per `eng.phonics.print-concepts`).
- Fail → [P52]: brief print-concepts refresher (book handling, directionality) before proceeding to letter-naming work. Persistent failure → route to eng.phonics.print-concepts for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The letter hunt**

> Spread a set of large letter cards (mixed case, mixed order) face-up on the table. Say a letter name aloud ("Find the letter B"). Student physically picks up the matching card from the spread, holding both the uppercase and lowercase version up together and naming them aloud: "Big B, little b." Repeat with 5–6 letters, mixing familiar and unfamiliar ones.

This anchors the concept in physical selection and paired naming before any writing or word-context work.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Uppercase Naming [C]**

Present uppercase letters one at a time in randomized (non-alphabetical) order. Student names each aloud. Randomization prevents "reciting the alphabet song" from substituting for genuine recognition.

**TA-2 — Lowercase Naming [C]**

Repeat TA-1 with lowercase letters in randomized order, isolating lowercase recognition as its own skill (since many learners recognize uppercase faster).

**TA-3 — Case Matching [C→P]**

Present a shuffled mixed set of uppercase and lowercase cards. Student pairs each uppercase letter with its lowercase match, naming the pair aloud ("Big M, little m").

**TA-4 — Mirror-Letter Discrimination [P]**

Present b/d and p/q in controlled contrast (never introduce both members of a mirror pair for the first time in the same sitting — stagger initial teaching, then contrast once each is independently secure). Use the hand-shape trick from Component 1 as a standing reference, not a one-time explanation.

**TA-5 — Alphabetic Sequence Recall [P]**

Student recites the alphabet in order, then identifies "what comes before/after" a given letter without reciting from the start (e.g., "What letter comes right after M?") — testing sequence knowledge independent of full recitation.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — uppercase naming)**

> "What letter is this? [shows 'R']"

Target response: "R."

**WE-2 (Foundational — case matching)**

> "Find the little letter that matches this big letter. [shows 'T']"

Target response: picks "t," names both: "Big T, little t."

**WE-3 (Intermediate — mirror-letter check)**

> "Is this a 'b' or a 'd'? [shows 'd']"

Target response: "d" — justifies using the hand-shape or loop-direction check, not a guess.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Uppercase naming, novel order**
"Name these letters: F, K, X, R, N." (randomized, not alphabetical)
*Target:* correctly names all 5 without reciting the alphabet from A.

**MP-2 [P36] — Lowercase naming, novel order**
"Name these letters: q, e, s, j, v."
*Target:* correctly names all 5.

**MP-3 [P36] — Case matching**
"Match each capital letter to its lowercase partner: H, G, W" (lowercase set shuffled separately: w, h, g).
*Target:* all 3 pairs matched correctly.

**MP-4 [P36] — Mirror-letter discrimination**
"Which of these is 'd' and which is 'b'? [shows both, shuffled position]"
*Target:* correctly identifies both without reversal, using a self-check strategy if needed.

**MP-5 [P36] — Sequence knowledge**
"What letter comes right after 'M' in the alphabet? What comes right before 'S'?"
*Target:* "N" and "R" — answered without reciting the full alphabet aloud from the start.

---

## Component 7 — Session Architecture

```
[P01] Session open — spread letter cards, brief warm-up naming 2-3 known letters
  ↓
[P41] PD-1 (print-concept readiness)
  ↓ PASS
[P06] Anchor: letter hunt (physical card selection + paired naming)
  ↓
TA-1: Uppercase naming [C]
  ↓
TA-2: Lowercase naming [C]
  ↓
TA-3: Case matching [C→P]
  ↓
[P28] Conflict: case-treated-as-different-letters → MC-CASE-ARE-DIFFERENT-LETTERS (if triggered)
  ↓
TA-4: Mirror-letter discrimination [P]
  ↓
[P28] Conflict: b/d, p/q reversal → MC-SHAPE-CONFUSION-MIRROR-LETTERS (if triggered)
  ↓
TA-5: Alphabetic sequence recall [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find 3 letters from your own name and tell me their names."
[P68] Session close
[P85] Regulation tail — praise careful checking, especially on mirror letters
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 90%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (no letter knowledge yet): dwell heavily on TA-1/TA-2 with high-frequency letters (from the student's own name) before full-set work. S1 (knows some letters, inconsistent): compress TA-1/TA-2, focus session time on TA-3/TA-4. S6 (frustrated by repeated b/d reversals): explicitly normalize the confusion up front — "almost every young reader mixes these up, it's not a mistake, it just needs more practice" — before TA-4 begins, and slow the pace. S9 (L1 uses a non-Latin script or different letter-case system): treat the entire Latin alphabet as novel content, not "the same letters transliterated" — extra repetition on shape formation, no assumption of transfer.

---

## Component 8 — Adaptive Flags

- **Mirror-letter confusion is developmentally normal**: b/d and p/q reversals are expected at this stage and must never be treated as a "wrong answer" in a way that produces shame — frame explicitly as a normal, temporary, resolvable confusion (Component 1 s6_path).
- **Randomize presentation order**: always test letter naming out of alphabetical sequence at least once per session — reciting the alphabet song is a different (and much easier) skill than true on-sight recognition, and the two must not be conflated when judging mastery.
- **Own-name letters as motivational anchor**: letters from the student's own name are typically the fastest-learned and make an effective, personally meaningful starting subset for S0 learners.
- **Non-Latin-script transfer caution**: for S9 learners whose L1 does not use the Latin alphabet, do not assume any shape/sound transfer — treat every letter as newly introduced content requiring full formation practice.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonics.alphabet-recognition |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonics.print-concepts ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — foundational |
| V-4 | bloom level matches KG | PASS — remember |
| V-5 | mastery_threshold matches KG | PASS — 0.90 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-CASE-ARE-DIFFERENT-LETTERS, MC-SHAPE-CONFUSION-MIRROR-LETTERS |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (print-concept readiness) |
| V-10 | Concrete anchor present [P06] | PASS — letter hunt |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonics domain always concrete/visual) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — mirror-letter normalization, randomized order, own-name anchor, script-transfer caution |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
