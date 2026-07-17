# Teaching Blueprint — eng.vocab.context-clues

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.vocab.context-clues
name: Context Clues
domain: english / vocab
difficulty:
  label: developing
  number: 2
bloom: apply
prerequisites:
  - eng.vocab.word-recognition
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/vocab domain → concrete/visual entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-GUESS-FROM-ONE-WORD-NEARBY
- **Trigger signal:** Student latches onto a single nearby word (often the most familiar or emotionally salient one) and guesses a meaning based on that alone, without weighing the WHOLE surrounding sentence/passage — e.g., in "The gregarious puppy bounded up to every visitor," guesses "gregarious" means "big" because "bounded" suggests physical energy, without integrating the full clue that it approaches EVERY visitor (suggesting sociability).
- **Conflict evidence [P28]:** "You guessed 'gregarious' means 'big' because of 'bounded.' But look at the WHOLE sentence — it says the puppy goes up to EVERY visitor. Does that detail fit better with 'big,' or with something about being friendly/sociable?"
- **Bridge text [P30]:** "Context clues come from the FULL surrounding sentence or passage, not just one nearby word — the most reliable inference weighs ALL the available clues together (what the word does, what happens around it, what contrast or example is given), not just whichever single word first catches your attention."
- **Replacement text [P31]:** "Before settling on a guessed meaning, scan the entire sentence (and nearby sentences if needed) for every relevant clue, not just the first word that stands out."
- **Discrimination pairs [P33]:**
  - "gregarious" guessed from "bounded" alone (partial, potentially misleading) vs. guessed from the full clue "bounded up to every visitor" (sociable/friendly — fuller, more accurate).
  - A single adjacent word suggesting one meaning vs. the full sentence's cumulative evidence pointing to a different, better-supported meaning.
- **s6_path:** "It's a natural shortcut to grab the first clue that stands out — but training yourself to scan the WHOLE context before committing to a guess produces much more reliable and accurate inferences."

### MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY
- **Trigger signal:** Student treats a context-clue-based inference as a guaranteed, fully certain definition rather than a reasonable hypothesis that may need refinement or confirmation (e.g., refuses to revise an initial guess even when later context in the same passage contradicts it, or treats a vague/general inference as if it were a precise dictionary definition).
- **Conflict evidence [P28]:** "You guessed 'morose' means 'tired' from the first sentence. But the next sentence says 'even after a full night's sleep, he stayed morose.' Does 'tired' still fit, or should we adjust our guess?"
- **Bridge text [P30]:** "Context clues give you a reasonable, often approximate, WORKING HYPOTHESIS about a word's meaning — not a guaranteed, precise, dictionary-perfect definition. Good readers stay open to revising their guess as more context appears, and recognize that a context-based inference might be a bit general or slightly off, needing confirmation (e.g., checking a dictionary) for full precision."
- **Replacement text [P31]:** "Treat a context-based meaning guess as a working hypothesis to test against further context, not a final, certain answer — be ready to revise it."
- **Discrimination pairs [P33]:**
  - An initial guess ("morose" = "tired") that gets revised when contradicted by later context ("even after sleep, still morose" → suggests something more like "gloomy/sullen," not sleep-related) vs. stubbornly keeping the first guess despite contradicting evidence.
  - A reasonably close but imprecise context-based guess (e.g., "unhappy" for "morose," missing the specific "sullen/gloomy" shade) vs. treating that approximate guess as fully precise without further checking.
- **s6_path:** "Once you've worked hard to figure out a guess, it feels natural to want to lock it in — but staying flexible and ready to adjust as you read further is actually a sign of strong, careful reading, not indecisiveness."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Word-recognition readiness**
Prompt: "Read this sentence and tell me which word, if any, you don't recognize the meaning of, even though you can pronounce it."
- Pass: correctly distinguishes decoding success from meaning recognition, identifying a genuine unfamiliar word (per `eng.vocab.word-recognition`).
- Fail → [P52]: brief word-recognition refresher before proceeding. Persistent failure → route to eng.vocab.word-recognition for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The detective's clue board**

> Present a sentence containing an unfamiliar word, written on a card. Around it, place several "clue cards" — each highlighting a different piece of surrounding evidence (a synonym given elsewhere in the sentence, a contrasting word like "but" signaling opposite meaning, an example listed after the word, a description of an action). Walk through gathering ALL the clue cards before making a final guess, like a detective assembling evidence before naming a suspect. This anchors context-clue inference as a multi-source evidence-gathering process, not a single-clue guess.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Synonym/Restatement Clues [C]**

Present sentences where the unfamiliar word's meaning is directly restated nearby (e.g., "Her loquacious, or extremely talkative, manner surprised everyone"); student identifies the restatement clue and derives the meaning.

**TA-2 — Contrast/Antonym Clues [C]**

Present sentences using a contrast signal word (but, however, unlike, in contrast to) that reveals meaning through opposition (e.g., "Unlike his gregarious brother, Tom was withdrawn and quiet"); student uses the contrast to infer meaning.

**TA-3 — Example/Illustration Clues [C→P]**

Present sentences where examples following the word reveal its category/meaning (e.g., "Many amphibians, such as frogs, toads, and salamanders, live both in water and on land"); student uses the examples to infer the general meaning.

**TA-4 — Whole-Sentence/Passage Integration [P]**

Present sentences requiring the student to weigh MULTIPLE clue types together across the full sentence (not just one obvious clue), directly targeting MC-GUESS-FROM-ONE-WORD-NEARBY by requiring integration of all available evidence.

**TA-5 — Hypothesis Testing and Revision Across a Passage [P]**

Present a short multi-sentence passage where an initial context-based guess must be revised as further sentences provide additional or contradicting clues; student produces an initial hypothesis, then revises it appropriately, directly targeting MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — restatement clue)**

> "'The ancient artifact was quite ephemeral, or short-lived, crumbling to dust within days.' What does 'ephemeral' mean?"

Target response: short-lived — directly restated in the sentence.

**WE-2 (Foundational — contrast clue)**

> "'Unlike her boisterous classmates, Maya was reserved and soft-spoken.' What does 'boisterous' likely mean?"

Target response: loud/rowdy/energetic — inferred from the contrast with "reserved and soft-spoken."

**WE-3 (Intermediate — hypothesis revision)**

> "'He seemed placid at first. But when the alarm went off, he leapt up shouting and pacing frantically.' What do you now think 'placid' means, and did your first guess need adjusting?"

Target response: revises understanding to mean "calm" — recognizing the CONTRAST between the initial calm state and the later frantic behavior sharpens/confirms the meaning as "calm," and articulates that the second sentence helped refine the first impression.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Restatement clue, novel sentence**
"'The garrulous shopkeeper, who never stopped talking, kept us there for an hour.' What does 'garrulous' mean?"
*Target:* talkative — correctly derived from the restatement.

**MP-2 [P36] — Contrast clue, novel sentence**
"'While his sister was frugal with her allowance, he was quite profligate.' What does 'profligate' likely mean?"
*Target:* wasteful/extravagant with money — correctly inferred from the contrast with "frugal."

**MP-3 [P36] — Example clue, novel sentence**
"'The museum housed many precious gemstones, including rubies, sapphires, and emeralds.' What category does 'gemstones' likely belong to?"
*Target:* precious stones/jewels — correctly inferred from the listed examples.

**MP-4 [P36] — Whole-sentence integration**
"'Despite the harsh winter, the resilient seedlings pushed through the frozen soil and bloomed.' What does 'resilient' mean, using all the clues in the sentence, not just one?"
*Target:* correctly integrates multiple clues (harsh winter as an obstacle, "despite," "pushed through," "bloomed" as the outcome) to infer something like "tough/able to recover/withstand difficulty," rather than relying on a single word.

**MP-5 [P36] — Explain the context-clues strategy and its limits**
"In your own words: how do you use context clues to figure out an unfamiliar word, and how sure can you be that your guess is exactly right?"
*Target:* states or demonstrates that context clues involve scanning the whole surrounding sentence/passage for multiple types of evidence (restatement, contrast, examples), and that the resulting guess is a reasonable working hypothesis that may need revision or confirmation, not a guaranteed precise definition.

---

## Component 7 — Session Architecture

```
[P01] Session open — detective's clue board warm-up (gather multiple clues)
  ↓
[P41] PD-1 (word-recognition readiness)
  ↓ PASS
[P06] Anchor: detective's clue board (multiple clue types before a final guess)
  ↓
TA-1: Synonym/restatement clues [C]
  ↓
TA-2: Contrast/antonym clues [C]
  ↓
TA-3: Example/illustration clues [C→P]
  ↓
TA-4: Whole-sentence/passage integration [P]
  ↓
[P28] Conflict: guessing from one nearby word alone → MC-GUESS-FROM-ONE-WORD-NEARBY (if triggered)
  ↓
TA-5: Hypothesis testing and revision across a passage [P]
  ↓
[P28] Conflict: treating a guess as fully certain → MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY (if triggered)
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find one unfamiliar word in something you read and use context clues to guess its meaning."
[P68] Session close
[P85] Regulation tail — praise gathering multiple clues and staying open to revision
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on word recognition, new to context-clue inference): dwell on TA-1's most explicit clue type (direct restatement) before introducing subtler contrast/example clues. S1 (already infers meanings intuitively but can't name the clue-type strategy used): use TA-1-3 to build explicit, transferable vocabulary for an already-present intuitive skill. S6 (frustrated by the inherent uncertainty of inference-based vocabulary learning, wanting a definitive answer): validate explicitly that a reasonable working hypothesis is a legitimate and valuable outcome, and that checking a dictionary afterward is a normal, complementary step, not an admission that the context-clue process failed. S9 (English learner whose broader vocabulary/syntax comprehension is still developing, making it harder to process the surrounding context itself): expect this concept to be harder when the SURROUNDING sentence also contains unfamiliar vocabulary/structures; consider simplifying surrounding context initially so the target word's context clues are genuinely accessible, rather than compounding two difficulties at once.

---

## Component 8 — Adaptive Flags

- **Whole-context integration over single-clue guessing**: every practice task beyond the earliest single-clue-type examples should require weighing multiple pieces of evidence together, directly countering the natural shortcut of grabbing the first salient word.
- **Hypothesis-and-revise framing, not guess-and-lock**: explicitly teach that context-based inferences are working hypotheses, modeling revision when later context provides better evidence — this is itself a valuable, transferable reading habit.
- **Clue-type vocabulary aids transfer**: naming the specific clue types (restatement, contrast, example) gives students a checklist to actively search for, rather than relying on passive/incidental inference alone.
- **Surrounding-context difficulty compounding for EL learners**: for S9 learners, ensure the context surrounding a target unfamiliar word is not itself full of additional unfamiliar vocabulary/complex syntax, which would confound context-clue practice with a broader comprehension challenge — scaffold the surrounding text's difficulty deliberately.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.vocab.context-clues |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.vocab.word-recognition ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — developing |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-GUESS-FROM-ONE-WORD-NEARBY, MC-CONTEXT-CLUES-ALWAYS-GIVE-CERTAINTY |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (word-recognition readiness) |
| V-10 | Concrete anchor present [P06] | PASS — detective's clue board |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/vocab domain always concrete/visual) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — whole-context integration, hypothesis-revise framing, clue-type vocabulary, EL surrounding-context scaffolding |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
