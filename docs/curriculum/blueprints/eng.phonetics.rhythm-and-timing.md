# Teaching Blueprint — eng.phonetics.rhythm-and-timing

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonetics.rhythm-and-timing
name: Rhythm and Timing
domain: english / phonetics
difficulty:
  label: proficient
  number: 3
bloom: analyze
prerequisites:
  - eng.phonetics.connected-speech
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonetics domain → concrete/kinesthetic entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-EACH-SYLLABLE-TAKES-EQUAL-TIME
- **Trigger signal:** Student assumes English rhythm works like some other languages' syllable-timed systems, where every syllable gets roughly equal duration — produces speech with mechanically even syllable spacing, ignoring that English compresses/stretches unstressed syllables to keep STRESSED syllables at roughly regular intervals instead.
- **Conflict evidence [P28]:** "Say 'The CAT sat on the MAT' evenly, giving every syllable the same length. Now listen to a natural speaker say it — are all the syllables the same length, or do the stressed ones (CAT, MAT) stand out with steady timing while the little words between them get squeezed?"
- **Bridge text [P30]:** "English is a STRESS-TIMED language: stressed syllables tend to recur at roughly EQUAL time intervals, regardless of how many unstressed syllables fall between them — the unstressed syllables get compressed or stretched to fit into that steady beat. This is different from syllable-timed languages (like Spanish or French), where each syllable gets roughly equal duration regardless of stress."
- **Replacement text [P31]:** "Listen for the STRESSED syllables landing at a steady, regular beat — expect the unstressed syllables between them to compress or stretch to fit, not to each take equal time."
- **Discrimination pairs [P33]:**
  - "The CAT sat on the MAT" (2 unstressed syllables between CAT and MAT) vs. "CATS sat on MATS" (0 unstressed syllables between) — in natural stress-timed English, the time from CAT-beat to MAT-beat stays roughly similar in both, even though the second has fewer total syllables to fit in.
  - Syllable-timed rhythm (every syllable equal length, common in French/Spanish) vs. stress-timed rhythm (stressed syllables equally spaced, unstressed syllables compressed).
- **s6_path:** "It's a very natural assumption that timing should be even syllable-by-syllable, especially if your first language works that way — English's stress-timed rhythm is a genuinely different system, and tuning your ear to the STRESSED-syllable beat, rather than syllable count, is the key adjustment."

### MC-RHYTHM-IS-THE-SAME-AS-STRESS
- **Trigger signal:** Student conflates "rhythm" (the timing/pacing pattern across an utterance) with "stress" (which specific syllables are emphasized) as if they were the same concept, unable to describe rhythm as a distinct TEMPORAL phenomenon (the regular beat/interval pattern) built on top of, but not identical to, the stress pattern.
- **Conflict evidence [P28]:** "You correctly identified which syllables are stressed in this sentence. But now — say it and clap on each stressed syllable. Are the claps evenly spaced in TIME, or unevenly spaced? That timing pattern is rhythm — is that the same thing as just knowing which syllables are stressed?"
- **Bridge text [P30]:** "Stress tells you WHICH syllables are emphasized. Rhythm is about the TIMING pattern this creates across the whole utterance — specifically, how stressed syllables recur at roughly regular intervals. You need to know stress first, but rhythm is the additional temporal/timing layer built on top of it."
- **Replacement text [P31]:** "Treat stress (which syllables) and rhythm (the timing pattern between stressed syllables) as two related but distinct things to identify separately."
- **Discrimination pairs [P33]:**
  - Correctly naming stressed syllables in a sentence (stress identification) vs. tapping out the actual timing pattern of those stresses (rhythm).
  - Two sentences with the same stressed words but different numbers of unstressed syllables between them, both still fitting a similar regular beat (illustrating rhythm's temporal-compression mechanism, distinct from stress placement alone).
- **s6_path:** "Stress and rhythm are closely related, so it's easy to treat them as one thing — but separating 'which syllables are stressed' from 'how the timing works between those stresses' is exactly the distinction this concept is built to teach."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Connected-speech readiness**
Prompt: "What does 'going to' often reduce to in casual speech?"
- Pass: correctly identifies "gonna" as a natural reduction (per `eng.phonetics.connected-speech`).
- Fail → [P52]: brief connected-speech refresher before proceeding. Persistent failure → route to eng.phonetics.connected-speech for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The metronome beat walk**

> Set a steady, even beat (clapping, a metronome, or footsteps at a fixed tempo). Say a sentence with the STRESSED syllables landing exactly on each beat, letting the unstressed syllables squeeze in between beats as needed (e.g., "The CAT | sat on the MAT" — CAT and MAT land on beats, "sat on the" compresses into the gap). Repeat with a sentence that has more or fewer unstressed syllables between stresses, showing the beat stays steady regardless. This anchors stress-timed rhythm as a physically felt, regular pulse.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Identifying the Stressed-Syllable Beat [C]**

Using the Component 3 metronome technique, student identifies and claps/taps the stressed syllables in a sentence, feeling them land at roughly regular intervals.

**TA-2 — Compression of Unstressed Syllables [C]**

Present sentence pairs with the same stressed words but a varying number of unstressed syllables between them (e.g., "cats SLEPT" vs. "the CATS have SLEPT"); student observes/produces that the time between stressed beats stays roughly similar despite more syllables needing to fit in, directly targeting MC-EACH-SYLLABLE-TAKES-EQUAL-TIME.

**TA-3 — Stress vs. Rhythm Distinction [C→P]**

Student first identifies stress placement in a sentence (a static, one-time judgment), then separately taps/describes the TIMING pattern (a dynamic, temporal judgment) across the same sentence, directly targeting MC-RHYTHM-IS-THE-SAME-AS-STRESS by requiring both tasks explicitly.

**TA-4 — Stress-Timed vs. Syllable-Timed Contrast [P]**

Present a brief comparison (e.g., a modeled English stress-timed rendition vs. a modeled or described syllable-timed rendition of similar content) so the student can directly contrast the two rhythmic systems and articulate the difference.

**TA-5 — Producing Natural Rhythm in Extended Speech [P]**

Student reads or produces a longer sentence/short passage, applying stress-timed rhythm — landing stressed syllables at a natural, roughly regular pace while compressing unstressed syllables — demonstrating integrated production rather than isolated pattern recognition.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — stressed-syllable beat)**

> "Say 'The DOG ran FAST' and clap on the stressed syllables."

Target response: claps on DOG and FAST, roughly evenly spaced in time.

**WE-2 (Foundational — compression)**

> "Compare 'DOGS ran' and 'the DOGS have been RUNning' — does the time between stressed beats change much?"

Target response: recognizes the interval between stressed beats stays relatively similar despite very different numbers of unstressed syllables, because the unstressed syllables compress to fit.

**WE-3 (Intermediate — stress vs. rhythm distinction)**

> "First, tell me which syllables are stressed in this sentence. Now, tap out the actual timing you'd use when saying it."

Target response: correctly completes both as separate, related tasks — naming stress, then producing/describing the temporal rhythm pattern.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Stressed-syllable beat, novel sentence**
"Say '[novel sentence]' and clap on the stressed syllables."
*Target:* correctly identifies and claps the stressed syllables at a roughly regular interval.

**MP-2 [P36] — Compression, novel pair**
"Compare '[short stress pattern]' and '[same stress pattern with more unstressed syllables added]' — does the stressed-beat timing change much?"
*Target:* correctly recognizes the compression mechanism keeps stressed-beat timing relatively steady.

**MP-3 [P36] — Stress vs. rhythm distinction, novel example**
"Identify the stress pattern of this sentence, then separately describe its rhythm."
*Target:* completes both tasks distinctly, correctly treating them as related but different.

**MP-4 [P36] — Stress-timed vs. syllable-timed contrast**
"In your own words: how is English's rhythm different from a syllable-timed language?"
*Target:* correctly explains that English keeps stressed syllables at roughly regular intervals (compressing unstressed syllables), while syllable-timed languages give each syllable roughly equal duration.

**MP-5 [P36] — Producing natural rhythm, novel passage**
"Read this short passage aloud with natural English rhythm."
*Target:* produces speech with stressed syllables landing at a natural, roughly regular pace and unstressed syllables appropriately compressed.

---

## Component 7 — Session Architecture

```
[P01] Session open — metronome beat walk warm-up
  ↓
[P41] PD-1 (connected-speech readiness)
  ↓ PASS
[P06] Anchor: metronome beat walk (stressed syllables on the beat)
  ↓
TA-1: Identifying the stressed-syllable beat [C]
  ↓
TA-2: Compression of unstressed syllables [C]
  ↓
[P28] Conflict: equal-duration-per-syllable assumption → MC-EACH-SYLLABLE-TAKES-EQUAL-TIME (if triggered)
  ↓
TA-3: Stress vs. rhythm distinction [C→P]
  ↓
[P28] Conflict: rhythm and stress treated as identical → MC-RHYTHM-IS-THE-SAME-AS-STRESS (if triggered)
  ↓
TA-4: Stress-timed vs. syllable-timed contrast [P]
  ↓
TA-5: Producing natural rhythm in extended speech [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, clap the stressed-syllable beat in one sentence you say often."
[P68] Session close
[P85] Regulation tail — praise feeling the steady beat over even syllable-by-syllable timing
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on connected speech, new to rhythm specifically): dwell on TA-1's beat-clapping with very simple, short sentences before introducing the compression concept. S1 (already speaks with natural rhythm but lacks analytical vocabulary): use TA-3's explicit stress/rhythm separation to build metalinguistic awareness of an already-present production skill. S6 (frustrated that rhythm feels harder to consciously control than word choice or grammar): validate that rhythm genuinely is a more subtle, physically-felt skill, and that the metronome/clapping technique is a legitimate, effective scaffold, not a childish exercise. S9 (L1 is syllable-timed, e.g. Spanish, French, Mandarin, Japanese — a very common and significant transfer challenge): expect this concept to require substantially more deliberate practice than for stress-timed-L1 speakers (e.g., some Germanic languages); treat the syllable-timed default as the learner's natural starting point requiring genuine retraining, not a simple correction, and prioritize physical/rhythmic anchoring techniques (clapping, metronome) heavily.

---

## Component 8 — Adaptive Flags

- **Stress-timed vs. syllable-timed is a genuine cross-linguistic difference, not a minor detail**: frame this explicitly, since it is one of the most impactful sources of a "foreign accent" perception and one of the hardest rhythmic patterns to acquire for syllable-timed-L1 speakers.
- **Physical/kinesthetic anchoring is essential, not optional**: rhythm is fundamentally a temporal, felt phenomenon — clapping, tapping, or metronome-based practice should be the standing default technique, not a one-time novelty.
- **Stress and rhythm are sequenced, not conflated**: always have students identify stress first, then separately address timing/rhythm, reinforcing the two are related but distinct skills.
- **Syllable-timed L1 background requires the most sustained practice budget of any adaptive flag in this blueprint**: for S9 learners from syllable-timed L1s, this concept may need significantly more repeated exposure and practice sessions than the standard session_cap suggests — treat slow progress as expected, not a sign of a different problem.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonetics.rhythm-and-timing |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonetics.connected-speech ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — proficient |
| V-4 | bloom level matches KG | PASS — analyze |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-EACH-SYLLABLE-TAKES-EQUAL-TIME, MC-RHYTHM-IS-THE-SAME-AS-STRESS |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (connected-speech readiness) |
| V-10 | Concrete anchor present [P06] | PASS — metronome beat walk |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonetics domain always concrete/kinesthetic) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — cross-linguistic significance, kinesthetic anchoring, stress/rhythm sequencing, syllable-timed-L1 practice budget |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
