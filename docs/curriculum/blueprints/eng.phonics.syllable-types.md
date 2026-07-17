# Teaching Blueprint — eng.phonics.syllable-types

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonics.syllable-types
name: Syllable Types
domain: english / phonics
difficulty:
  label: developing
  number: 2
bloom: apply
prerequisites:
  - eng.phonics.digraphs
  - eng.phonics.long-vowels-silent-e
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonics domain → concrete/visual entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE
- **Trigger signal:** Student treats longer, multisyllabic words as unreadable chunks to guess at wholesale (e.g., glances at "reptile" and guesses "repeat" or another visually similar word) rather than breaking the word into syllables and applying known single-syllable decoding patterns to each chunk.
- **Conflict evidence [P28]:** "You guessed 'repeat' for this word — let's split it into syllables instead: rep-tile. Do you recognize the pattern in 'rep' (closed syllable, short vowel)? What about 'tile' (silent-e syllable, long vowel)?"
- **Bridge text [P30]:** "A long word isn't a mystery to guess at — it's just a sequence of syllables, and EVERY syllable follows one of six reliable patterns you already partly know from single-syllable words. Break it apart, identify each syllable's TYPE, and decode each one using rules you already have."
- **Replacement text [P31]:** "For any multisyllabic word, divide it into syllables first, then decode syllable-by-syllable using the six syllable-type rules, rather than guessing from the whole word's shape."
- **Discrimination pairs [P33]:**
  - "reptile" split as rep-tile (closed + silent-e syllables, both decodable) vs. guessing "repeat" from a whole-word glance.
  - "napkin" split as nap-kin (two closed syllables) vs. an unfounded whole-word guess.
- **s6_path:** "Long words feel intimidating because they look like a lot at once — but breaking them into syllable-sized pieces, each following a pattern you already know, turns an overwhelming word into several small, familiar decoding tasks."

### MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN
- **Trigger signal:** Student applies a single learned syllable-type rule (usually closed-syllable/short-vowel, since it's taught earliest and most heavily drilled) to every syllable regardless of its actual structure — e.g., reads the open syllable "ba-" in "baby" with a short vowel sound (as if closed) instead of correctly using the long vowel sound that open syllables require.
- **Conflict evidence [P28]:** "You read 'ba' in 'baby' with a short vowel, like 'bat'. But does 'ba-by' have a consonant closing off that first syllable, the way 'bat' does? What's different about how the syllable ends?"
- **Bridge text [P30]:** "There are six different syllable TYPES, and each one signals a different vowel sound — closed syllables (ending in a consonant) get the short vowel, but OPEN syllables (ending in the vowel itself, nothing closing it off) get the LONG vowel instead, like 'ba' in 'baby' or 'go' in 'going'. You have to check which type a syllable actually is before assuming the rule."
- **Replacement text [P31]:** "Before applying a vowel-sound rule to any syllable, first identify which of the six syllable types it is — closed, open, silent-e, vowel-team, r-controlled, or consonant-le — since each type has its own vowel-sound rule."
- **Discrimination pairs [P33]:**
  - "nap-kin" (both closed syllables, short vowels) vs. "ba-by" (first syllable open, long vowel; second syllable is a special unstressed pattern).
  - "cat" (closed, short /æ/) vs. "cape" (silent-e, long /eɪ/) vs. "car" (r-controlled, neither short nor long — a distinct third vowel quality).
- **s6_path:** "It's natural to lean on the syllable type learned first and most thoroughly — but all six types are genuinely different from each other, and the skill here is checking type-by-type rather than assuming one rule covers everything."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Digraph readiness**
Prompt: "Read the word 'shape.' What sound does 'sh' make?"
- Pass: correctly identifies "sh" as one sound /ʃ/ (per `eng.phonics.digraphs`).
- Fail → [P52]: brief digraphs refresher before proceeding. Persistent failure → route to eng.phonics.digraphs for reteaching.

**PD-2 [P41] — Silent-e readiness**
Prompt: "Read 'cap' and 'cape.' What's different about the vowel sound?"
- Pass: correctly identifies the short/long vowel contrast (per `eng.phonics.long-vowels-silent-e`).
- Fail → [P52]: brief long-vowels/silent-e refresher before proceeding. Persistent failure → route to eng.phonics.long-vowels-silent-e for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The syllable-type sorting hats**

> Present six labeled "hat" cards, one per syllable type (Closed, Open, Silent-E, Vowel Team, R-Controlled, Consonant-le), each with a simple visual icon (e.g., a closed door for "closed," an open door for "open"). Present a set of single-syllable example words on cards (cat, go, cape, boat, car, table — using "-ble" from table as the consonant-le example). Student sorts each word-card under its matching hat, saying the vowel sound aloud as they sort. This anchors the six-type system as a concrete, physical sorting task before applying it to multisyllabic words.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Six Syllable Types in Single Syllables [C]**

Using the Component 3 sorting hats, student classifies a set of single-syllable words into the six types and correctly produces each vowel sound, building/reviewing the type-to-sound mapping (closed=short, open=long, silent-e=long, vowel-team=usually long, r-controlled=distinct r-colored vowel, consonant-le=unstressed schwa+consonant+l).

**TA-2 — Syllable Division in Two-Syllable Words [C]**

Present two-syllable words (napkin, baby, reptile, market); student divides each into syllables using standard division patterns (VC/CV for closed-closed like "nap-kin"; V/CV for open-first like "ba-by"), then identifies each syllable's type.

**TA-3 — Applying Type-Specific Vowel Rules [C→P]**

Student reads the divided syllables from TA-2 aloud, applying the correct vowel sound for each identified type, directly targeting MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN by requiring type-by-type checking rather than a single default rule.

**TA-4 — R-Controlled and Consonant-le Syllables [P]**

Introduce the two less-intuitive types in more depth: r-controlled syllables (car, her, bird, for, fur — where "r" changes the vowel to a distinct r-colored sound, neither short nor long) and consonant-le syllables (table, little, purple — an unstressed final syllable with a schwa-like vowel before consonant+le). Student reads words containing each type.

**TA-5 — Full Multisyllabic Word Decoding [P]**

Present unseen multisyllabic words (magnetic, fantastic, adventure); student divides into syllables, identifies each type, and reads the whole word fluently, directly targeting MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE by demonstrating the systematic approach works on genuinely novel words.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — single-syllable type identification)**

> "What syllable type is 'go'? What vowel sound does it have?"

Target response: open syllable (ends in the vowel, no closing consonant); long vowel sound /oʊ/.

**WE-2 (Foundational — two-syllable division and typing)**

> "Divide 'napkin' into syllables. What type is each one?"

Target response: "nap-kin" — both closed syllables (each ends in a consonant), both short vowels.

**WE-3 (Intermediate — mixed types in one word)**

> "Divide 'reptile' into syllables and read it, identifying each syllable's type."

Target response: "rep-tile" — "rep" is closed (short /ɛ/); "tile" is silent-e (long /aɪ/) — read as "REP-tile."

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Single-syllable type identification, novel word**
"What syllable type is 'car'? What's special about its vowel sound?"
*Target:* r-controlled — the vowel is neither short nor long but takes on a distinct r-colored quality.

**MP-2 [P36] — Two-syllable division, novel word**
"Divide 'market' into syllables and identify each type."
*Target:* "mar-ket" — "mar" is r-controlled; "ket" is closed (short /ɛ/).

**MP-3 [P36] — Consonant-le syllable, novel word**
"Divide 'purple' into syllables. What's the second syllable's type?"
*Target:* "pur-ple" — second syllable is consonant-le (unstressed, schwa-like vowel before "ple").

**MP-4 [P36] — Full multisyllabic decoding, novel word**
"Divide and read 'magnetic.'"
*Target:* "mag-net-ic" — correctly divided and read, applying closed-syllable short vowels to each part (with appropriate stress on the correct syllable).

**MP-5 [P36] — Explain the six-type system**
"In your own words: why does it help to know there are six different syllable types, instead of just one rule for all syllables?"
<br>*Target:* states or demonstrates that different syllable structures (closed, open, silent-e, vowel-team, r-controlled, consonant-le) produce different, predictable vowel sounds, so checking the TYPE first lets you decode any syllable correctly, including in words you've never seen before.

---

## Component 7 — Session Architecture

```
[P01] Session open — syllable-type sorting hats warm-up (single syllables)
  ↓
[P41] PD-1 (digraph readiness)
  ↓ PASS
[P41] PD-2 (silent-e readiness)
  ↓ PASS
[P06] Anchor: syllable-type sorting hats (6 types, single-syllable words)
  ↓
TA-1: Six syllable types in single syllables [C]
  ↓
TA-2: Syllable division in two-syllable words [C]
  ↓
TA-3: Applying type-specific vowel rules [C→P]
  ↓
[P28] Conflict: one rule over-applied to all types → MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN (if triggered)
  ↓
TA-4: R-controlled and consonant-le syllables [P]
  ↓
TA-5: Full multisyllabic word decoding [P]
  ↓
[P28] Conflict: whole-word guessing instead of syllable-by-syllable decoding → MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE (if triggered)
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find one multisyllabic word and divide it into its syllable types."
[P68] Session close
[P85] Regulation tail — praise dividing and checking type-by-type over whole-word guessing
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on digraphs/silent-e, new to the six-type framework): move through TA-1 methodically, one type at a time, before combining into two-syllable words. S1 (already divides words into syllables intuitively but doesn't yet apply type-specific rules): compress TA-1/TA-2, spend most time on TA-3/TA-4's rule application. S6 (overwhelmed by six categories after previously only needing one or two rules): explicitly acknowledge the jump in complexity and use the physical sorting-hats anchor repeatedly as a concrete anchor to return to. S9 (L1 orthography has no syllable-type-dependent vowel system, e.g. most phonetic/syllabic-writing L1s): treat this entire six-type framework as a genuinely new organizing principle for decoding, not an extension of an existing intuition — allow extra repetition especially for the two least-intuitive types (r-controlled, consonant-le).

---

## Component 8 — Adaptive Flags

- **Syllabify before decoding**: for any multisyllabic word, the standing procedure is: divide into syllables FIRST, identify each syllable's type SECOND, then decode — never attempt whole-word pattern-guessing, which directly targets MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE.
- **Six types, six distinct rules — check, don't default**: build the explicit habit of checking syllable structure before applying any vowel-sound rule, since the closed-syllable/short-vowel rule (taught earliest) is the most common over-generalization target.
- **R-controlled and consonant-le need dedicated, separate attention**: these two types are the least intuitive and most often under-taught relative to the other four; TA-4 exists specifically to give them proportionate dedicated practice.
- **Novel-word generalization is the actual mastery bar**: Component 6's MP-4/MP-5 explicitly require applying the system to a genuinely unseen word — session design must include at least one truly novel multisyllabic word before mastery is claimed.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonics.syllable-types |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonics.digraphs ✓, eng.phonics.long-vowels-silent-e ✓ (both authored) |
| V-3 | difficulty label matches KG | PASS — developing |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE, MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (digraph readiness), PD-2 (silent-e readiness) |
| V-10 | Concrete anchor present [P06] | PASS — syllable-type sorting hats |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonics domain always concrete/visual) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — syllabify-before-decode, check-don't-default, r-controlled/consonant-le emphasis, novel-word generalization bar |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
