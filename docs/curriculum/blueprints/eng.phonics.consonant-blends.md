# Teaching Blueprint — eng.phonics.consonant-blends

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonics.consonant-blends
name: Consonant Blends
domain: english / phonics
difficulty:
  label: foundational
  number: 1
bloom: apply
prerequisites:
  - eng.phonics.consonants
mastery_threshold: 0.80
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonics domain → concrete/auditory entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-BLEND-IS-ONE-FUSED-SOUND
- **Trigger signal:** Student treats a consonant blend as a single new sound rather than two-or-three distinct sounds said in quick sequence (e.g., drops one consonant when reading "stop" as "top," or "black" as "bak"), effectively merging or deleting a member of the blend.
- **Conflict evidence [P28]:** "Say 'stop' very slowly, stretching the beginning: /s/... /t/... /ɒ/... /p/. Do you hear TWO separate consonant sounds at the start, or just one?"
- **Bridge text [P30]:** "A consonant blend is two or three separate consonant sounds said right next to each other, each one still fully pronounced — unlike a digraph (like 'sh'), where two letters make ONE new sound, a blend keeps every sound in it."
- **Replacement text [P31]:** "For any blend, say each consonant sound separately and slowly first, then speed them up without dropping any — never skip a sound in the cluster."
- **Discrimination pairs [P33]:**
  - "stop" (blend: /s/+/t/, both pronounced) vs. "top" (single consonant — a genuinely different, shorter word, showing what's lost if /s/ is dropped).
  - "black" (blend: /b/+/l/) vs. "sh" in "ship" (digraph — one new sound /ʃ/, not two).
- **s6_path:** "It's easy to accidentally drop one sound from a blend because saying two consonants quickly in a row is a genuinely harder motor task than a single consonant — we'll slow down and isolate each sound before blending them at speed."

### MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING
- **Trigger signal:** Student confuses blends (bl, st, spr — multiple sounds, each pronounced) with digraphs (sh, ch, th — two letters, one new sound), applying the wrong strategy to one or the other (e.g., trying to pronounce "sh" as /s/+/h/, or trying to split "st" into a single new sound).
- **Conflict evidence [P28]:** "Say 'st' in 'stop' slowly — do you hear two different sounds, /s/ then /t/? Now say 'sh' in 'ship' slowly — do you hear an /s/ sound followed by an /h/ sound, or just ONE sound the whole time?"
- **Bridge text [P30]:** "Blends keep all their individual sounds (st = /s/+/t/, two sounds). Digraphs merge into one brand-new sound that isn't just the two letters said in sequence (sh = /ʃ/, one sound, not /s/+/h/). They look similar on the page — two consonant letters together — but behave completely differently when spoken."
- **Replacement text [P31]:** "Test any two-consonant letter combination by saying it slowly: if you hear two separate sounds, it's a blend; if you hear one new sound, it's a digraph."
- **Discrimination pairs [P33]:**
  - "bl" in "black" (blend, 2 sounds: /b/+/l/) vs. "ch" in "chip" (digraph, 1 sound: /tʃ/).
  - "sk" in "skip" (blend, 2 sounds: /s/+/k/) vs. "th" in "thin" (digraph, 1 sound: /θ/).
- **s6_path:** "Blends and digraphs look alike on paper — both are two consonant letters together — so this mix-up is extremely common; the slow-sounding-out test is the reliable way to tell them apart every time."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Single consonant sound readiness**
Prompt: "What sound does 's' make? What sound does 't' make?"
- Pass: correctly produces /s/ and /t/ in isolation (per `eng.phonics.consonants`).
- Fail → [P52]: brief consonants refresher before proceeding. Persistent failure → route to eng.phonics.consonants for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The two-beat clap**

> Say a blend slowly, clapping once per consonant sound: "/s/ (clap) /t/ (clap) op" for "stop." Have the student echo with their own claps. Then speed up the two claps until they merge into a fast, fluid blend while still being two distinct articulatory gestures. This anchors the blend as a physically countable two (or three)-beat event, not a single unit.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Blend Sound-Counting [C]**

Present a set of blend-initial words (stop, black, frog, spin); student claps/counts the number of distinct consonant sounds at the start before reading the whole word.

**TA-2 — Slow-to-Fast Blending [C]**

Using the Component 3 clap technique, student practices saying each blend slowly (isolated sounds) then progressively faster until it merges into fluent speech, for a set of initial blends (bl, cr, st, sp, tr).

**TA-3 — Blend vs. Digraph Sorting [C→P]**

Present a mixed set of two-letter consonant combinations (bl, sh, st, ch, sp, th); student sorts into "blend" (2+ sounds) vs. "digraph" (1 new sound) using the slow-sounding-out test, directly targeting MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING.

**TA-4 — Final (Ending) Blends [P]**

Extend to word-FINAL blends (desk, jump, hand, list) — student identifies and correctly pronounces both consonant sounds at the end of the word without dropping one, addressing a common site for MC-BLEND-IS-ONE-FUSED-SOUND to resurface (ending sounds are frequently under-articulated in natural speech).

**TA-5 — Reading Novel Blend Words [P]**

Present unseen words containing blends (both initial and final); student reads them correctly, applying sound-counting and slow-to-fast blending strategies independently.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — sound-counting)**

> "How many separate consonant sounds are at the start of 'frog'?"

Target response: two — /f/ and /r/.

**WE-2 (Foundational — slow-to-fast blending)**

> "Say the sounds in 'spin' slowly, then blend them into the word."

Target response: /s/... /p/... /ɪ/... /n/ → "spin," with both /s/ and /p/ retained.

**WE-3 (Intermediate — blend vs. digraph)**

> "Is 'cl' in 'clap' a blend or a digraph? What about 'ch' in 'chip'?"

Target response: "cl" is a blend (two sounds: /k/+/l/); "ch" is a digraph (one sound: /tʃ/).

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Sound-counting, novel word**
"How many separate consonant sounds are at the start of 'brave'?"
*Target:* two — /b/ and /r/.

**MP-2 [P36] — Reading with correct blend articulation**
"Read the word 'plant' — say every sound, including the ending."
*Target:* correctly produces /p/-/l/-/æ/-/n/-/t/, retaining both the initial blend (pl) and final blend (nt) without dropping either member.

**MP-3 [P36] — Blend vs. digraph, novel pair**
"Is 'gl' in 'glow' a blend or a digraph? Is 'wh' in 'whale' a blend or a digraph?"
*Target:* "gl" is a blend (two sounds); "wh" is a digraph (one sound, /w/ or /ʍ/ depending on dialect).

**MP-4 [P36] — Final blend, novel word**
"Read 'desk' and tell me how many sounds are at the very end."
*Target:* two — /s/ and /k/, both pronounced.

**MP-5 [P36] — Explain the difference**
"In your own words: how do you tell a blend apart from a digraph?"
*Target:* states or demonstrates: say it slowly — a blend has multiple separate sounds still audible, a digraph merges into one new single sound.

---

## Component 7 — Session Architecture

```
[P01] Session open — two-beat clap warm-up on a known blend
  ↓
[P41] PD-1 (single consonant sound readiness)
  ↓ PASS
[P06] Anchor: two-beat clap (slow → fast blending)
  ↓
TA-1: Blend sound-counting [C]
  ↓
[P28] Conflict: dropped/merged consonant → MC-BLEND-IS-ONE-FUSED-SOUND (if triggered)
  ↓
TA-2: Slow-to-fast blending [C]
  ↓
TA-3: Blend vs. digraph sorting [C→P]
  ↓
[P28] Conflict: blend/digraph confusion → MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING (if triggered)
  ↓
TA-4: Final (ending) blends [P]
  ↓
TA-5: Reading novel blend words [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find one word that starts with a blend and one that ends with a blend."
[P68] Session close
[P85] Regulation tail — praise slow, careful sounding-out over rushed guessing
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on single consonants, new to blends): keep to 2-consonant initial blends (bl, st, sp) before introducing 3-consonant blends (str, spl) or final blends. S1 (reads blends but drops sounds under speed): dwell on TA-2's slow-to-fast progression, deliberately slowing back down whenever a sound is dropped. S6 (frustrated by the extra motor difficulty of consonant clusters): explicitly validate that saying two consonants in a row is a genuinely harder physical task than a single consonant, and that slowing down is a legitimate strategy, not a failure. S9 (L1 phonotactics restrict consonant clusters, e.g. no word-initial /st-/, /sp-/, or no word-final clusters at all — common in several Asian and African language families): expect this concept to be substantially harder than for L1-cluster-permitting learners; explicitly allow more repetition, and treat vowel-insertion errors (e.g., "sitop" for "stop") as a predictable L1-transfer pattern requiring targeted practice, not carelessness.

---

## Component 8 — Adaptive Flags

- **Slow-to-fast is the core teaching technique**: always teach a new blend by first isolating each consonant sound slowly, then progressively speeding up — never introduce a blend at full natural speed first.
- **Final blends are a common regression site**: word-final blends (desk, jump, list) are more prone to sound-dropping in natural speech than initial blends and deserve explicit, separate practice (TA-4), not an assumption that initial-blend mastery transfers automatically.
- **Blend vs. digraph confusion is expected, not unusual**: because both categories look like "two consonant letters together" in print, assume this confusion by default and always teach the slow-sounding-out test as the standing discrimination method.
- **L1 phonotactic-cluster transfer difficulty**: for S9 learners whose L1 restricts consonant clusters, budget significantly more practice time and expect specific, predictable error patterns (vowel insertion, consonant deletion) — this is a transfer effect, not a general aptitude issue.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonics.consonant-blends |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonics.consonants ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — foundational |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-BLEND-IS-ONE-FUSED-SOUND, MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (single consonant sound readiness) |
| V-10 | Concrete anchor present [P06] | PASS — two-beat clap |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonics domain always concrete/auditory) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — slow-to-fast technique, final-blend regression risk, blend/digraph default confusion, L1 phonotactic difficulty |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
