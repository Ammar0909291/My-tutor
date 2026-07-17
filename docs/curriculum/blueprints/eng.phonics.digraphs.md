# Teaching Blueprint — eng.phonics.digraphs

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonics.digraphs
name: Consonant and Vowel Digraphs
domain: english / phonics
difficulty:
  label: foundational
  number: 1
bloom: apply
prerequisites:
  - eng.phonics.consonant-blends
  - eng.phonics.short-vowels
mastery_threshold: 0.80
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonics domain → concrete/auditory entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-DIGRAPH-IS-A-BLEND
- **Trigger signal:** Student applies blend-style sounding-out to a digraph, trying to pronounce both letters separately (e.g., says "s" then "h" for "sh," or "t" then "h" for "th"), carrying over the consonant-blends strategy inappropriately.
- **Conflict evidence [P28]:** "You just tried to say 's' then 'h' separately for 'sh'. Say the word 'ship' the way you normally talk — is there really a full /s/ sound followed by a full /h/ sound, or is it one single sound the whole time?"
- **Bridge text [P30]:** "Digraphs are the opposite of blends: TWO letters that together make just ONE brand-new sound, not two sounds said in sequence. 'Sh' is not /s/+/h/ — it's a single sound, /ʃ/, that doesn't sound like either letter alone."
- **Replacement text [P31]:** "For a digraph, treat the two letters as ONE unit representing ONE sound — never try to sound out each letter separately."
- **Discrimination pairs [P33]:**
  - "sh" in "ship" (digraph, one sound /ʃ/) vs. "sp" in "spin" (blend, two sounds /s/+/p/).
  - "th" in "this" (digraph, one sound /ð/) vs. "tw" in "twin" (blend, two sounds /t/+/w/).
- **s6_path:** "It makes sense to try the blend strategy since it worked for two-consonant combinations before — digraphs look similar on the page but behave completely oppositely, so we'll practice spotting which is which."

### MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES
- **Trigger signal:** Student applies single-short-vowel sound expectations to vowel digraphs/teams (e.g., tries to sound "ai" in "rain" as a short /æ/ followed by a short vowel, or reads "ea" in "bread" the same way as "ea" in "bead"), not yet recognizing that vowel digraphs/teams have their OWN sound (often, but not always, the long sound of the first vowel) and can be inconsistent across different words.
- **Conflict evidence [P28]:** "Read 'rain' — what sound does the 'ai' make together? Now read 'said' — does 'ai' make the same sound there?"
- **Bridge text [P30]:** "A vowel digraph is two vowel letters working together to make ONE vowel sound — often following the pattern 'when two vowels go walking, the first one does the talking' (its long sound), like in 'rain' or 'boat.' But some vowel-team words are exceptions to this pattern (like 'said' or 'bread'), so vowel digraphs need more flexible checking than consonant digraphs, which are highly reliable."
- **Replacement text [P31]:** "For a vowel digraph, first try the long-first-vowel-sound pattern, but stay ready to adjust for known exception words — vowel teams are less perfectly reliable than consonant digraphs."
- **Discrimination pairs [P33]:**
  - "rain" (ai = long /eɪ/, follows the pattern) vs. "said" (ai = /ɛ/, an exception).
  - "boat" (oa = long /oʊ/, follows the pattern) vs. "bread" (ea = /ɛ/, does not follow the "long e" pattern that "bead" follows).
- **s6_path:** "Vowel teams are genuinely less consistent than consonant digraphs, which can feel unfair after consonant digraphs worked so reliably — we'll learn the common pattern as a strong first guess, while keeping a short list of known exceptions in mind."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Consonant blend readiness**
Prompt: "Say the sounds in 'stop' — how many separate consonant sounds are at the start?"
- Pass: correctly identifies /s/+/t/ as two separate sounds (per `eng.phonics.consonant-blends`).
- Fail → [P52]: brief consonant-blends refresher before proceeding. Persistent failure → route to eng.phonics.consonant-blends for reteaching.

**PD-2 [P41] — Short vowel readiness**
Prompt: "Read 'bed.' What's the vowel sound?"
- Pass: correctly produces short /ɛ/ (per `eng.phonics.short-vowels`).
- Fail → [P52]: brief short-vowels refresher before proceeding. Persistent failure → route to eng.phonics.short-vowels for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The merge-into-one demonstration**

> Write "s" and "h" on separate cards. Say each sound alone: /s/... /h/. Then slide the cards together, physically overlapping them, while producing the single merged sound /ʃ/ — emphasizing that the two letters "become" one new sound, unlike sliding two blend-cards together (where both original sounds remain audible). Contrast directly with a blend pair (e.g., "s" and "p" sliding together while both /s/ and /p/ remain audible) to make the blend/digraph distinction physically visible.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Consonant Digraph Sound Production [C]**

Present each common consonant digraph (sh, ch, th [voiced and voiceless], wh, ph, ck) in isolation; student produces the single corresponding sound for each.

**TA-2 — Consonant Digraphs in Words [C]**

Present simple words containing consonant digraphs (ship, chip, thin, this, when, phone); student reads them, correctly treating the digraph as one sound.

**TA-3 — Blend vs. Digraph Re-Discrimination [C→P]**

Present a mixed set of two-letter combinations from both categories (sh, sp, ch, cl, th, tr); student sorts into blend vs. digraph using the slow-sounding-out test, reinforcing and extending the discrimination first built in `eng.phonics.consonant-blends`, directly targeting MC-DIGRAPH-IS-A-BLEND.

**TA-4 — Vowel Digraph Introduction (Long-First-Vowel Pattern) [P]**

Introduce common vowel digraphs (ai, ay, ea, ee, oa, ow) via the "two vowels go walking" pattern; student reads a set of regular vowel-team words (rain, day, bead, tree, boat, snow) applying the long-first-vowel rule.

**TA-5 — Vowel Digraph Exception Recognition [P]**

Present a small set of vowel-team exception words (said, bread, head, again) alongside regular ones; student identifies which follow the pattern and which don't, directly targeting MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES's underlying over-rigid expectation.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — consonant digraph sound)**

> "What single sound does 'ch' make?"

Target response: /tʃ/, as in "chip" — one sound, not "c" then "h."

**WE-2 (Foundational — vowel digraph, regular pattern)**

> "Read 'boat.' What's the vowel sound, and which letter is 'doing the talking'?"

Target response: long /oʊ/ — the first vowel ("o") gives its long sound.

**WE-3 (Intermediate — vowel digraph exception)**

> "Read 'bread.' Does the 'ea' follow the usual long-vowel pattern here?"

Target response: no — "bread" is an exception; "ea" makes the short /ɛ/ sound, not the expected long /iː/.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Consonant digraph, novel word**
"Read 'whale.' What sound does 'wh' make?"
*Target:* /w/ (or /ʍ/ in dialects that distinguish it) — one sound.

**MP-2 [P36] — Blend vs. digraph, novel pair**
"Is 'ph' in 'phone' a blend or a digraph? Is 'fl' in 'flag' a blend or a digraph?"
*Target:* "ph" is a digraph (one sound, /f/); "fl" is a blend (two sounds, /f/+/l/).

**MP-3 [P36] — Vowel digraph, regular pattern, novel word**
"Read 'tray.' What's the vowel sound?"
*Target:* long /eɪ/ — "ay" follows the long-first-vowel pattern.

**MP-4 [P36] — Vowel digraph exception, novel word**
"Read 'again.' Does the vowel team here follow the usual pattern?"
*Target:* identifies "ai" in "again" as an exception in many dialects (commonly /ɛ/ rather than the expected long /eɪ/), or correctly notes dialect variation — reasoning explicitly checked rather than blindly applying the rule.

**MP-5 [P36] — Explain digraphs vs. blends**
"In your own words: what's the difference between a digraph and a blend?"
*Target:* states or demonstrates that a digraph is two letters making one new sound, while a blend is two (or more) letters each keeping their own separate sound said in sequence.

---

## Component 7 — Session Architecture

```
[P01] Session open — merge-into-one demonstration (sh vs. sp contrast)
  ↓
[P41] PD-1 (consonant blend readiness)
  ↓ PASS
[P41] PD-2 (short vowel readiness)
  ↓ PASS
[P06] Anchor: merge-into-one demonstration (digraph vs. blend card-slide)
  ↓
TA-1: Consonant digraph sound production [C]
  ↓
[P28] Conflict: digraph sounded out as two letters → MC-DIGRAPH-IS-A-BLEND (if triggered)
  ↓
TA-2: Consonant digraphs in words [C]
  ↓
TA-3: Blend vs. digraph re-discrimination [C→P]
  ↓
TA-4: Vowel digraph introduction (long-first-vowel pattern) [P]
  ↓
TA-5: Vowel digraph exception recognition [P]
  ↓
[P28] Conflict: vowel digraph forced into a rigid rule → MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES (if triggered)
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find one word with a consonant digraph and one with a vowel digraph."
[P68] Session close
[P85] Regulation tail — praise checking whether one sound or two before reading
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on blends, new to digraphs): dwell on TA-1's isolated sound production and the merge-into-one demonstration before moving to words. S1 (confuses blends and digraphs from the start): spend extra time on TA-3's direct re-discrimination task, using the physical card-slide anchor repeatedly. S6 (frustrated that vowel digraphs are less reliable than consonant digraphs): explicitly validate this asymmetry — consonant digraphs are highly reliable, vowel digraphs need the "strong first guess, stay flexible" approach — rather than expecting uniform reliability across both categories. S9 (L1 lacks a distinction between certain digraph sounds and their blend "components," e.g. no /θ/,/ð/ distinction, or no /w/-/v/ distinction affecting "wh"): expect specific transfer-based substitution errors on particular digraphs; treat these as predictable L1-contrast effects requiring targeted discrimination practice.

---

## Component 8 — Adaptive Flags

- **Consonant digraphs are highly reliable; vowel digraphs are not**: explicitly teach this asymmetry — consonant digraphs (sh, ch, th, wh, ph) almost always produce their one expected sound, while vowel digraphs/teams require the "strong first guess" framing with known exceptions.
- **Physical merge-vs-slide contrast reinforces the core distinction**: reuse the Component 3 card technique whenever blend/digraph confusion resurfaces (MC-DIGRAPH-IS-A-BLEND is a very likely default given the immediately prior blends concept).
- **"Two vowels go walking" as a memorable, revisitable mnemonic**: teach this rhyme explicitly as the standing strategy for vowel digraphs, paired with an equally explicit acknowledgment of its exceptions.
- **L1 phoneme-contrast transfer for specific digraphs**: for S9 learners, anticipate specific digraph-sound substitution errors tied to known L1-English contrasts (e.g., a language without /θ/-/ð/ leading to substitution with /s/-/z/ or /t/-/d/ on "th" words) — treat as predictable, not general difficulty.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonics.digraphs |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonics.consonant-blends ✓, eng.phonics.short-vowels ✓ (both authored) |
| V-3 | difficulty label matches KG | PASS — foundational |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-DIGRAPH-IS-A-BLEND, MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (blend readiness), PD-2 (short vowel readiness) |
| V-10 | Concrete anchor present [P06] | PASS — merge-into-one demonstration |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonics domain always concrete/auditory) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — reliability asymmetry, merge-vs-slide reinforcement, mnemonic + exception framing, L1 contrast transfer |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
