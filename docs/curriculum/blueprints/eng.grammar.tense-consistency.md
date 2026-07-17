# Teaching Blueprint — eng.grammar.tense-consistency

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.grammar.tense-consistency
name: Tense Consistency
domain: english / grammar
difficulty:
  label: proficient
  number: 3
bloom: analyze
prerequisites:
  - eng.grammar.past-tenses
  - eng.grammar.future-tenses
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/grammar domain → concrete/visual entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY
- **Trigger signal:** Student assumes every single verb in a passage must be in the EXACT same tense, treating any tense shift as automatically an error — missing that MOTIVATED tense shifts (genuinely reflecting different times being discussed) are correct and necessary, while only UNMOTIVATED shifts (arbitrary switching without a real time-reference reason) are actual errors (e.g., "She walked to the store because she needs milk" incorrectly shifts to present "needs" without reason, but "She walked to the store yesterday; tomorrow she will walk to the gym" correctly uses different tenses because the events genuinely occur at different times).
- **Conflict evidence [P28]:** "You said every verb in a passage must be the exact same tense. But if a passage describes something that happened yesterday AND something that will happen tomorrow, should both actions use the identical tense, or does the change in actual TIME justify a tense change?"
- **Bridge text [P30]:** "Tense consistency doesn't mean using ONE tense throughout — it means using tenses that logically and CONSISTENTLY reflect the actual TIME relationships of what's being described. A MOTIVATED shift (genuinely describing a different time) is correct: 'She walked to the store yesterday; tomorrow she will visit the gym.' An UNMOTIVATED shift (switching tense without any real change in time reference) is the actual error: 'She walked to the store because she needs milk' — both actions are happening in the same time-frame, so both should be past tense."
- **Replacement text [P31]:** "Check whether a tense shift reflects an actual change in the TIME being described (motivated, correct) or is an arbitrary switch within the same time-frame (unmotivated, an error)."
- **Discrimination pairs [P33]:**
  - "She walked to the store yesterday; tomorrow she will visit the gym" (motivated shift — genuinely different times) vs. "She walked to the store because she needs milk" (unmotivated shift — both actions are in the same past time-frame, "needs" should be "needed").
  - A narrative correctly using past tense throughout for past events, with present tense reserved only for a stated general truth ("She walked to school, since exercise is good for health") — here, "is" correctly stays present because it's a timeless general fact, not a shift error.
- **s6_path:** "It's a reasonable simplification to think 'consistency' means 'always the same word form' — but the real rule is about consistently reflecting actual TIME relationships, which sometimes requires different tenses and sometimes requires staying in one tense, depending on what's actually being described."

### MC-NARRATIVE-TENSE-CANT-BE-PRESENT
- **Trigger signal:** Student assumes narratives (stories, accounts of events) must always be told in PAST tense, treating present-tense narration (historical present) as automatically incorrect, missing that present tense is a legitimate, deliberate stylistic choice for narrating events vividly as if happening now (common in storytelling, sports commentary, and some literary styles) — as long as it's used CONSISTENTLY throughout the relevant stretch, not mixed arbitrarily with past tense.
- **Conflict evidence [P28]:** "You said stories must always be past tense. Have you ever heard someone tell a story like 'So I walk into the room, and everyone looks at me...'? Is that grammatically wrong, or is it a stylistic choice some storytellers and writers use deliberately?"
- **Bridge text [P30]:** "While past tense is the most common narrative choice, present tense ('historical present') is a legitimate, deliberate stylistic option for narrating past or fictional events vividly, as if unfolding in real time — used in storytelling, sports commentary, and some literary fiction. The key requirement is CONSISTENCY: if you choose present-tense narration, sustain it throughout the relevant passage rather than randomly mixing it with past tense."
- **Replacement text [P31]:** "Recognize present-tense narration as a valid stylistic choice, not an automatic error — the requirement is consistent use within a passage, not that all narratives must be past tense."
- **Discrimination pairs [P33]:**
  - "So I walk into the room, and everyone stares at me" (consistent historical present, a valid stylistic narrative choice) vs. "I walked into the room, and everyone stares at me" (inconsistent mixing — a genuine error, since it randomly switches mid-narration without a time-reference reason).
  - Sports commentary: "He shoots, he scores!" (consistent present-tense narration of an ongoing event) — a standard, accepted convention.
- **s6_path:** "Since most stories and school writing default to past tense, it's a very reasonable assumption that this is the ONLY correct choice — but present-tense narration is a real, valid stylistic option, as long as it's applied consistently rather than mixed randomly."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Past-tenses readiness**
Prompt: "What's the past tense of 'go'? What's the past continuous of 'walk'?"
- Pass: correctly produces "went" and "was/were walking" (per `eng.grammar.past-tenses`).
- Fail → [P52]: brief past-tenses refresher before proceeding. Persistent failure → route to eng.grammar.past-tenses for reteaching.

**PD-2 [P41] — Future-tenses readiness**
Prompt: "How do you express a planned future action using 'going to'?"
- Pass: correctly produces a "going to" future form (per `eng.grammar.future-tenses`).
- Fail → [P52]: brief future-tenses refresher before proceeding. Persistent failure → route to eng.grammar.future-tenses for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The timeline-check proofread**

> Present a short passage with a tense inconsistency error (e.g., "She opened the door and sees a cat"). Draw a simple timeline and plot each verb's action on it, asking: "Do these two actions happen at the same real-world time, or different times?" Since both actions are clearly simultaneous/sequential in the same past scene, the timeline reveals the tense shift as unmotivated (an error). Repeat with a genuinely motivated shift (a past action followed by a stated future plan) to show the contrast.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Detecting Unmotivated Tense Shifts [C]**

Present short passages with unmotivated tense shifts (mid-scene switches with no time-reference justification); student identifies and corrects the error, directly targeting MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY by first confirming they understand WHY it's wrong (unmotivated, not just "different").

**TA-2 — Identifying Motivated (Correct) Tense Shifts [C]**

Present passages with genuinely motivated tense shifts (a passage correctly moving between past narration and a future plan, or timeless present-tense general truths within a past narrative); student confirms these shifts are correct because they reflect real time-reference changes.

**TA-3 — Historical Present as a Valid Stylistic Choice [C→P]**

Present examples of consistent historical-present narration (storytelling, sports commentary); student recognizes this as a legitimate stylistic option, directly targeting MC-NARRATIVE-TENSE-CANT-BE-PRESENT.

**TA-4 — Detecting Inconsistent Historical-Present Mixing [P]**

Present passages that inconsistently mix historical present with past tense mid-narration (a genuine error); student identifies and corrects these to maintain one consistent choice throughout the relevant stretch.

**TA-5 — Full-Passage Tense-Consistency Proofreading [P]**

Student proofreads a longer, mixed passage containing both motivated shifts (correct) and unmotivated shifts (errors), applying the timeline-check technique to distinguish and correct only the genuine errors.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — unmotivated shift)**

> "Find and fix the tense error: 'He picked up the phone and calls his mother.'"

Target response: "He picked up the phone and called his mother" — both actions are in the same past scene, so "calls" should be "called."

**WE-2 (Foundational — motivated shift)**

> "Is there an error here? 'She graduated last year; next year she will start medical school.'"

Target response: no error — the tense shift correctly reflects two genuinely different times (past graduation, future medical school).

**WE-3 (Intermediate — historical present consistency)**

> "Is this passage consistent? 'So I walk into the room, and everyone stares at me. I felt so embarrassed.'"

Target response: not fully consistent — "walk" and "stares" are historical present, but "felt" incorrectly shifts to past mid-narration; should be "feel" to maintain the present-tense narrative choice.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Unmotivated shift, novel example**
"Find and fix: 'They finished dinner and watch a movie.'"
*Target:* "They finished dinner and watched a movie" — same past time-frame, "watch" should be "watched."

**MP-2 [P36] — Motivated shift, novel example**
"Is there an error here? 'I studied hard all semester; tomorrow I will take the final exam.'"
*Target:* no error — genuinely different times (past studying, future exam) justify the tense shift.

**MP-3 [P36] — Historical present recognition, novel example**
"Is 'The ball flies through the air, and the crowd goes wild' grammatically wrong because it's not past tense?"
*Target:* no — this is valid historical-present narration (e.g., sports commentary style), a legitimate stylistic choice, not an error.

**MP-4 [P36] — Inconsistent historical-present mixing, novel example**
"Find and fix: 'He opens the door slowly. Then he saw the surprise party.'"
*Target:* "Then he sees the surprise party" — maintaining the established historical-present narration, rather than shifting to past mid-passage.

**MP-5 [P36] — Explain tense consistency**
"In your own words: does tense consistency mean using only one tense throughout a passage, and can a story ever be told in present tense?"
*Target:* states or demonstrates that tense consistency means using tenses that logically match actual time relationships (motivated shifts are correct, unmotivated shifts are errors), and that present-tense (historical present) narration is a valid stylistic choice as long as it's applied consistently.

---

## Component 7 — Session Architecture

```
[P01] Session open — timeline-check proofread warm-up (unmotivated error example)
  ↓
[P41] PD-1 (past-tenses readiness)
  ↓ PASS
[P41] PD-2 (future-tenses readiness)
  ↓ PASS
[P06] Anchor: timeline-check proofread (motivated vs. unmotivated shift contrast)
  ↓
TA-1: Detecting unmotivated tense shifts [C]
  ↓
[P28] Conflict: any tense shift assumed to be an error → MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY (if triggered)
  ↓
TA-2: Identifying motivated (correct) tense shifts [C]
  ↓
TA-3: Historical present as a valid stylistic choice [C→P]
  ↓
[P28] Conflict: narratives assumed to require past tense always → MC-NARRATIVE-TENSE-CANT-BE-PRESENT (if triggered)
  ↓
TA-4: Detecting inconsistent historical-present mixing [P]
  ↓
TA-5: Full-passage tense-consistency proofreading [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, proofread one paragraph you've written for tense consistency."
[P68] Session close
[P85] Regulation tail — praise checking for motivated vs. unmotivated shifts over assuming all shifts are errors
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on past/future tenses, new to consistency analysis specifically): dwell on TA-1's clearest unmotivated-shift errors before introducing the more nuanced motivated-shift and historical-present concepts. S1 (already writes with generally consistent tense but occasionally slips on longer passages): focus on TA-5's full-passage proofreading, since sustained consistency across longer text is where errors typically emerge. S6 (frustrated by needing to judge "motivated vs. unmotivated" rather than applying a simple fixed rule): validate that the timeline-check technique makes this judgment concrete and checkable, not a vague intuition call. S9 (L1 has different or looser tense-consistency conventions, or doesn't require the same past/present narrative distinctions): expect this concept to require dedicated, explicit practice, since tense-consistency proofreading is an analytical, metalinguistic skill built on top of already-challenging tense-formation knowledge.

---

## Component 8 — Adaptive Flags

- **Motivated vs. unmotivated is the central analytical distinction**: every consistency-checking task should require this judgment, not a surface-level "are the words identical" check — this is the concept's core cognitive skill (bloom level: analyze).
- **Timeline-check technique makes the judgment concrete**: reuse the Component 3 timeline-plotting technique whenever tense-consistency confusion arises, since it converts an abstract judgment into a visual, checkable process.
- **Historical present is a legitimate, teachable stylistic register, not a default error**: explicitly validate this narrative choice while still requiring internal consistency once chosen.
- **This is fundamentally a proofreading/analytical skill built on prior tense-formation mastery**: for S9 learners, ensure past/future tense FORMATION (the prerequisites) is genuinely secure before layering this analytical consistency-checking skill on top, since it depends heavily on fluent tense production as a foundation.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.grammar.tense-consistency |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.grammar.past-tenses ✓, eng.grammar.future-tenses ✓ (both authored) |
| V-3 | difficulty label matches KG | PASS — proficient |
| V-4 | bloom level matches KG | PASS — analyze |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY, MC-NARRATIVE-TENSE-CANT-BE-PRESENT |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (past-tenses readiness), PD-2 (future-tenses readiness) |
| V-10 | Concrete anchor present [P06] | PASS — timeline-check proofread |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/grammar domain always concrete/visual) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — motivated/unmotivated analytical framing, timeline-check technique, historical-present legitimacy, formation-before-consistency sequencing |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
