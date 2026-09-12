# English Curriculum — Real-Student Simulation Defect Register

**Status: READ-ONLY AUDIT ARTIFACT. No production code, content, or configuration was
changed to produce this file.** It consolidates every defect discovered while driving
the real deployed app (`my-tutor-flame.vercel.app`) through English lessons with a
weak/intermediate-learner persona, across three separate simulation efforts:

1. **Task B** — `scripts/.../weakLearnerSim.ts`, Phase 1 (English), orders 1–10,
   ~106 turns (`phase1-english.log`).
2. **Task C** — the concept-by-concept English curriculum audit,
   `scripts/.../englishAudit.ts`, orders 11–105+ across 9 batches
   (`audit-batch1.log` … `audit-batch9.log`), ~900+ turns.
3. **Pre-existing documented findings** — three standalone investigation docs already
   in this repo, produced by earlier English-focused campaigns:
   `docs/architecture/ENGLISH_MCQ_REOFFER_FALSE_POSITIVE_FINDING.md`,
   `docs/architecture/ENGLISH_TOPIC_DRIFT_FINDING.md`,
   `docs/architecture/PHASE6_P1_ENGLISH_ASSET_CONTRACT.md`.

Findings are **deduplicated by mechanism**, not by raw occurrence — a defect class
observed 28 times is one entry with an instance count and representative evidence,
not 28 entries. IDs are stable (`ENG-D##`); do not renumber on future edits, append
instead.

**Note on provenance and confidence:** items 1–2 above were produced by direct
transcript analysis (this session and a background sub-agent applying the same
taxonomy) against exact logged evidence, quoted verbatim below. Item 3 is quoted from
existing, already-committed investigation docs. Where an earlier checkpoint report in
this project's conversation history recorded only aggregate counts (no itemized
evidence) for orders 11–60, those aggregates are **superseded by this file's direct
re-analysis** of the same underlying transcripts — the itemized findings below are the
authoritative record for that range.

---

## How to read an entry

- **ID** — stable identifier.
- **Concept/lesson** — affected concept id(s)/order(s); "multiple" if cross-cutting.
- **Evidence** — exact quoted transcript text (concept, order, turn cited).
- **Root cause** — stated only when actually traced to a mechanism; otherwise
  "UNCONFIRMED" — this file does not guess.
- **Status** — NEW (first reported here), KNOWN (already documented elsewhere in the
  repo, cited), or RECURRING (KNOWN and this audit adds new occurrences).
- **Severity** — P0 (mastery/evidence fabrication or a full correctness break) / P1
  (significant learner-facing correctness or trust break) / P2 (content-quality or UX
  degradation, correctness intact) / P3 (cosmetic/minor).
- **Fix priority** — Critical / High / Medium / Low.
- **Fix category** — code / content / visual / prompt / architecture / QA.

---

## Part 1 — Confirmed defects

### ENG-D01 — Phonetic/notation content silently dropped in phonics & phonetics lessons

- **Concept/lesson:** concentrated in `eng.phonics.*` and `eng.phonetics.*` (orders
  11, 12, 15, 17, 19, 20, 21, 26, 27, 29; plus `phase1-english.log` orders 2, 5, 9,
  10). Not observed outside phonics/phonetics concepts.
- **Evidence** (representative, of 30+ instances):
  - `eng.phonics.long-vowels-silent-e` (order 11): *"The wand represents the silent
    e, and when it reaches back to the A, it tells the A to say its long sound,, so
    "cape" sounds like instead of."* — double comma, and the actual sound values are
    missing entirely.
  - `eng.phonetics.ipa-basics` (order 19, T6): *"When you see, think of the single
    "sh" sound, not of "s" + "h"."* — the IPA symbol before "think of" is blank.
  - `eng.phonetics.accents-and-dialects` (order 26, T1): *"people say the word "aunt"
    like ****, and then a few streets over in the South, people say it like ****."*
  - `eng.phonics.phonemic-awareness` (`phase1-english.log`, T6): *"What is the first
    sound in the word "sun"?\nA) a short sound \nB) a short sound \nC) a short sound
    \nD) a long sound"* — all four MCQ options collapse to identical text with the
    distinguishing phoneme dropped, making the question unanswerable on its own merit.
  - `eng.phonics.blending-segmenting` (`phase1-english.log`, T8): *"Segmenting would be
    starting with the word "stop," then pulling out each sound in order: first, then,
    then, then, until no sound re[...]"* — broken triple-comma enumeration.
- **Root cause:** UNCONFIRMED. Strong correlation with content that requires
  reproducing IPA/phonetic symbols specifically (every instance is in a
  phonics/phonetics concept; zero instances in grammar/vocabulary/reading concepts).
  Consistent in shape with a symbol being generated then stripped or lost before
  render — plausibly a markdown-sanitization or special-character-handling step
  between model output and the client, but this was not traced to a specific module.
- **Status:** NEW — not previously documented anywhere else in this repo found during
  this audit.
- **Severity:** P1 — makes MCQ options genuinely indistinguishable in several
  instances (a learner cannot select the "right" option because all four read
  identically), and breaks the core deliverable of a phonics lesson (the sounds
  themselves).
- **Fix priority:** High.
- **Fix category:** code (render/sanitization pipeline) or prompt (if the model
  itself is failing to reproduce the symbols) — root cause needs a dedicated trace
  before either can be ruled in/out.

---

### ENG-D02 — MCQ re-offer disambiguation guard fires on non-answer messages

- **Concept/lesson:** widespread across nearly every concept audited; not concept-
  specific. Confirmed in `eng.phonics.sight-words`, `eng.phonics.syllable-types`,
  `eng.phonics.decoding-fluency`, `eng.phonetics.consonant-sounds`,
  `eng.phonetics.intonation-patterns`, `eng.phonetics.prosody`,
  `eng.vocab.context-clues`, `eng.vocab.idioms`, `eng.grammar.nouns`,
  `eng.grammar.adjectives`, `eng.grammar.conjunctions`,
  `eng.grammar.articles-and-determiners`, `eng.reading.skimming-and-scanning`,
  `eng.grammar.compound-sentences`, `eng.grammar.tense-consistency`, plus the ~28
  occurrences already logged in `ENGLISH_MCQ_REOFFER_FALSE_POSITIVE_FINDING.md`
  (Groups 3–12 of a separate campaign).
- **Evidence** (representative, of 47+ combined instances across all sources):
  - `eng.vocab.context-clues` (order 30, T7): learner sends the **full, exact text of
    the correct option, verbatim** — `"A) No — this new context contradicts "unsure";
    the guess should be revised toward "firm/unyielding" — a context-clue guess is a
    working hypothesis, not a locked-in answer"` — and still receives: *"I couldn't
    tell which option your answer matched — tap the choice you mean from the list
    below."*
  - `eng.phonics.blending-segmenting` (`phase1-english.log`, T7): learner directly
    quotes option 2's text (`"is it saying the letter names quickly: 'see... ay...
    tee'"`) and still gets the disambiguation lead-in.
  - Documented in `ENGLISH_MCQ_REOFFER_FALSE_POSITIVE_FINDING.md`: fires on genuine
    follow-up questions without a trailing `?` ("wait, what about words like 'is' or
    'seems'"), meta-commentary about a past answer ("I think I picked the wrong one,
    let me think again"), and elaborated acknowledgements ("thanks that helped").
- **Root cause:** documented — the Option-A/I1 guard (`route.ts` ~L8918, commit
  `00e53ac1`, narrowed by I4 at `3940daa9`) misclassifies these message shapes as
  genuine-but-ungradeable answer attempts. `detectLearnerQuestion` misses implicit
  questions without `?`; `isBareAcknowledgement`'s pattern doesn't cover elaborated
  acknowledgements or meta-commentary about a prior answer; and — newly confirmed by
  this audit — it also misfires when the learner's message contains the option text
  verbatim, which should be the easiest case to grade correctly.
- **Status:** KNOWN/RECURRING — see `docs/architecture/ENGLISH_MCQ_REOFFER_FALSE_POSITIVE_FINDING.md`
  for the original finding and its own recurrence log (28 disambiguation + 2
  false-confirmation occurrences across Groups 3–12 of a separate campaign); this
  audit independently reproduces the same mechanism 19+ more times across a
  different set of concepts (orders 11–105), confirming it is not scoped to any
  particular batch of content.
- **Severity:** P1 (per the original finding doc's own classification).
- **Fix priority:** High.
- **Fix category:** code (`route.ts` Option-A guard, `detectLearnerQuestion`,
  `isBareAcknowledgement`).

---

### ENG-D03 — Same guard fabricates false confirmation / invents MCQ option content

- **Concept/lesson:** `eng.grammar.past-tenses`, `eng.writing.topic-sentences`,
  `eng.literature.point-of-view` (all from the pre-existing campaign report; not
  independently reproduced in this audit's own batches, but the underlying mechanism
  is ENG-D02, confirmed extensively above).
- **Evidence** (quoted from `ENGLISH_MCQ_REOFFER_FALSE_POSITIVE_FINDING.md`):
  - A reply **opens with "That's right."** in response to `"i dont understand
    irregular verbs, can you explain"` — a message that made no answer attempt at
    all.
  - A reply invents a plausible-looking MCQ option that does not exist in the actual
    pending probe: *"That's right. A) 'Dogs are popular pets.' Let me know which one
    you pick."* — "Dogs are popular pets" is traced to leaked earlier scaffolding
    prose, not the served MCQ.
  - A third variant fabricates **four full lettered options** ("A) First person B)
    Second person C) Third person limited D) Third person omniscient") that don't
    match the two real options of the actual pending MCQ.
- **Root cause:** documented — same misclassified-turn-intent mechanism as ENG-D02,
  landing on the false-confirmation branch instead of the disambiguation branch, with
  the model drawing on stale prompt context (an earlier analogy, an earlier question)
  rather than the actual `pendingMcq` state when constructing the fabricated content.
- **Status:** KNOWN — `ENGLISH_MCQ_REOFFER_FALSE_POSITIVE_FINDING.md`, "more serious
  variant" and "Group 9/12 update" sections.
- **Severity:** P1 — worse than ENG-D02: it actively tells the learner they were
  correct when they made no attempt, and separately fabricates content not present
  in the real probe. (Does not fabricate recorded mastery evidence — `check`/
  `practice` counters were confirmed to stay at 0 through these turns — which is why
  this is classified P1 rather than P0 under this file's severity convention.)
- **Fix priority:** Critical.
- **Fix category:** code (same guard as ENG-D02).

---

### ENG-D04 — Internal scaffolding/control text leaked verbatim to the learner

- **Concept/lesson:** `eng.phonetics.minimal-pairs` (order 20, T1),
  `eng.phonetics.syllable-stress` (order 21, T1), `eng.phonetics.phonetic-transcription`
  (order 27, T1), `eng.grammar.word-order` (order 60, T5).
- **Evidence:**
  - Three near-identical leaks of what reads as an internal pedagogy-authoring
    decision: *"A brief, argued discovery step suits the precise definition itself;
    direct instruction is correct for its diagnostic PURPOSE."* (order 20) and *"A
    brief, argued discovery step suits both misconceptions; the formal IPA
    stress-marking convention itself is correctly direct instruction."* (order 21)
    and a third near-identical recurrence at order 27. This phrasing matches this
    project's own Educational Brain authoring language for the "discovery lesson (or
    argued direct-instruction call)" field in concept entries — content meant to
    guide internal lesson-planning, not to be spoken to the learner.
  - A **raw internal directive tag**, fully unrendered, output as the entire
    beginning of a turn: `<--ATTEMPT channel="verbal" representation="diagram"
    concreteness="iconic" entry="definition-first" granularity="whole"
    agency="tutor-does" scaffold="2" hint="H0" difficulty="2" paceRate="2"
    paceDensity="2" paceWait="1" loadBudget="2" loadDecomposition="whole"
    interleaving="blocked"-->` (`eng.grammar.word-order`, order 60, T5) — this is
    almost certainly an internal pacing/teaching-control micro-directive format that
    should never reach a chat response.
- **Root cause:** UNCONFIRMED for the exact mechanism, but strongly suggestive: the
  "argued discovery step" phrasing matches this project's own Educational Brain
  concept-entry authoring field name, implying that field's text is being echoed by
  the model into learner-facing output instead of being consumed only as an internal
  instruction. The `<--ATTEMPT ...-->` tag is an unrendered internal directive of a
  kind (channel/representation/concreteness/scaffold/pacing parameters) not
  documented as learner-facing anywhere in this repo.
- **Status:** NEW — not previously documented.
- **Severity:** P1 — this is a genuine breach of the prompt/learner-output boundary:
  real students saw raw internal authoring/control text. Does not fabricate mastery
  evidence, so not P0 under this file's convention, but it is a serious trust and
  polish defect and the most severe *content-leak* class found in this audit.
- **Fix priority:** Critical.
- **Fix category:** prompt (stop echoing internal field text) and code (ensure any
  internal directive tag is always stripped/parsed before the reply reaches the
  client, the same way `<!--SIGNAL-->`/`<!--MCQ-->` tags are handled elsewhere in
  this codebase).

---

### ENG-D05 — Fresh lesson closes itself on turn 1 with zero teaching delivered

- **Concept/lesson:** `eng.phonics.print-concepts` (`phase1-english.log`, order 1).
- **Evidence:** the learner's very first substantive message, `"ok starting, not sure
  about this topic"` (an ordinary opening remark, not a stop request), receives:
  *"Print Concepts is on pause — you haven't mastered it yet. Worth another look
  later: Print Concepts. Press "Start next lesson" whenever you're ready to carry
  on."* with `[T1, 13475ms] phase=OBSERVE check=0 practice=0 verified=false
  lessonComplete=true` — the lesson ends on turn 1, before any teaching, question, or
  check has occurred.
- **Root cause:** UNCONFIRMED. Cannot be affect-budget exhaustion (no prior wrong
  answers exist at turn 1) — this is a distinct trigger from the T12 "pause" pattern
  in OBS-01 below, which plausibly is budget-driven. Worth checking whether
  `eng.phonics.print-concepts` specifically (a documented pre-reading, voice-required
  entry node — see ENG-D15) has a first-lesson-guard interaction that misfires this
  early.
- **Status:** NEW.
- **Severity:** P1 — a real learner's very first contact with this lesson is a
  "come back later" message with nothing taught.
- **Fix priority:** High.
- **Fix category:** code (first-lesson/session-open logic for this concept).

---

### ENG-D06 — Lesson marked verified/complete with check=0 and practice=0 recorded

- **Concept/lesson:** `eng.grammar.verbs` (order 52, T8), `eng.grammar.word-order`
  (order 60, T10), `eng.phonics.consonants` (`phase1-english.log`, order 7, T9).
- **Evidence:**
  - `eng.grammar.verbs`: `LESSON_COMPLETE_OBJECT: {"complete":true,"lessonKey":
    "lesson:52","lessonTitle":"Verbs",...,"mastered":["eng.grammar.verbs"],...,
    "fullyMastered":true}` alongside `[T8,...] phase=TRANSFER check=0 practice=0
    verified=true lessonComplete=true`.
  - `eng.grammar.word-order`: identical shape — `verified=true lessonComplete=true`
    with `check=0 practice=0`.
  - `eng.phonics.consonants`: `"That's Consonant Sounds finished — nice work. You
    mastered: Consonant Sounds."` with the same `check=0 practice=0 verified=true`
    signature.
- **Root cause:** UNCONFIRMED, and this is stated deliberately rather than guessed.
  This project's own architecture (documented extensively elsewhere in this repo)
  requires `correctAtCheck>=1` and `correctAtPractice>=2` for mastery, with those
  counters distinct from — and not always equal to — the turn-summary `check`/
  `practice` fields this audit's driver script parsed and logged. It is not yet known
  whether this is (a) a genuine gap between recorded evidence and the certified
  result, or (b) a display/parsing artifact of what this audit's own scripts printed
  (i.e., the printed `check`/`practice` fields may not be the same counters the
  mastery gate actually reads). **This was not independently verified against the
  database** — per this audit's standing egress-minimization instruction, no
  additional Supabase queries were run to confirm which explanation is correct.
- **RESOLVED 2026-09-12 — BENIGN, explanation (b) CONFIRMED. Not a mastery defect.**
  Decided from the repository with no DB query, which the "verification first"
  instruction above turns out to have been satisfiable all along:
  - `MasterySummary` (`src/lib/teaching/masteryGate.ts`) exposes **`checkCorrect`**
    and **`practiceCorrect`**. The driver `display()` reads
    `m?.correctAtCheck ?? 0` — a field the payload has never carried — so
    `undefined ?? 0` printed **0 on every turn of every run**, whatever the real
    evidence. `verified` was read from the real field. The logged line was
    structurally `check=0 practice=0 verified=<truth>`, so the 0/0 measured
    nothing at all, and all three sightings came through that same `display()`
    (which is why "two different driver scripts" agreed). **19 QA drivers in
    `scripts/qa/` carried this; all corrected in the same commit** — a
    known-broken instrument left in place guarantees the false P0 recurs.
  - Separately, explanation (a) is ruled out structurally, not assumed:
    `verifiedCorrectAtX <= correctAtX` holds on every real fold path (one
    increment site per pair, the verified increment nested inside the same
    branch as the unconditional plain one), and BOTH roads through
    `masteryVerifiedStrict` — the verified-counter road and the legacy fallback
    — independently require the plain counters to reach 1/2. Proved by DRIVING
    the real fold over 49,152 states in
    `src/tests/masteryCounterInvariant.test.ts`, which also asserts that
    `buildMasterySummary` reads the verdict and the printed counters from the
    same state, so they cannot disagree.
  - Nothing was weakened: `masteryVerifiedStrict` and its anti-laundering
    safeguards are untouched, and no counter bookkeeping was changed.
  - Residual, reported not patched: `readConversationState` restores a stored
    ladder with a raw spread and does not re-establish the invariant at the
    boundary — it is a property of the writer. Unreachable in practice (only the
    fold writes that snapshot) and left alone rather than adding a clamp to a
    mastery-authority path for a state nothing can produce.
- **Status:** CLOSED — BENIGN (instrument defect; product behaviour correct).
- **Severity:** ~~**P0 if confirmed**~~ — not confirmed; see above. Original text kept: **P0 if confirmed** — a mastery claim without recorded evidence would
  be the single most serious class of defect this platform can have, directly
  contradicting the verified-evidence architecture this project treats as its core
  differentiator. Recorded as P0 here specifically because the *possibility* of false
  certification, observed 3 times independently across two different driver scripts,
  warrants top-severity triage attention even before root cause is confirmed.
- **Fix priority:** Critical (verification first, fix only if confirmed).
- **Fix category:** QA (direct DB verification of `conversationState.correctAtCheck`/
  `correctAtPractice` for the three affected sessions is the necessary next step
  before this can be triaged as code or classified as a non-issue).

---

### ENG-D07 — "New topic for me" misread as a request to change topics

- **Concept/lesson:** `eng.phonics.syllable-types` (order 13),
  `eng.vocab.synonyms-antonyms` (order 31), `eng.vocab.word-formation-processes`
  (order 37), `eng.grammar.nouns` (order 50), `eng.reading.genre-recognition`
  (order 100).
- **Evidence:** learner's opening message `"hello, new topic for me"` (meaning "this
  subject is new to me") consistently receives a reply treating it as a request for a
  *different* topic: *"Sure thing! What new topic would you like to dive into
  today?"* / *"Hello! What new topic would you like to explore today?"* / *"So you're
  saying you'd like to explore a new topic — is that right?"*
- **Root cause:** UNCONFIRMED, but plausibly the same class of detector already
  documented in `ENGLISH_TOPIC_DRIFT_FINDING.md`'s "Lead, not a diagnosis" section —
  a topic-request/excursion detector reading an ordinary learner remark as a topic-
  scoping instruction. That doc traces a related but different trigger phrase
  ("what are we learning today"); this is additional evidence the same detector
  family is over-broad, with a new, distinct trigger phrase.
- **Status:** RECURRING — extends `docs/architecture/ENGLISH_TOPIC_DRIFT_FINDING.md`
  with a new, previously-undocumented trigger phrase.
- **Severity:** P2 — usually self-corrects within the same or next turn (the driver's
  next message typically returns to the actual lesson); does not appear to derail a
  whole lesson by itself (contrast ENG-D08).
- **Fix priority:** Medium.
- **Fix category:** code (topic/excursion-request detector).

---

### ENG-D08 — Severe topic-drift: full lesson hijacked into unrelated, factually wrong Python programming content

- **Concept/lesson:** `eng.vocab.word-formation-processes` (order 37), turns T6–T10
  (5 consecutive turns).
- **Evidence:** the lesson (derivation, compounding, conversion, blending, clipping)
  is entirely abandoned starting T6 and replaced with a Python tutorial about the
  `find` function/method — including an example that is **itself factually
  incorrect Python** (`numbers.find(4)` on a Python list; Python lists do not have a
  `.find()` method — that would raise `AttributeError`, only strings have `.find()`):
  - T6: *"Sure! Let's look at the word **find** as it's used in programming and
    everyday searching. ... You have a list: `[7, 3, 9, 4, 1]`. You want to **find**
    the number `4`."*
  - T7: ```python\nnumbers = [7, 3, 9, 4, 1]\nindex_of_four = numbers.find(4)```
  - T8–T10: continues the detective/search analogy and a second incorrect example
    (`people.find("Charlie")` on a list of names).
  No content about word-formation processes appears in any of these 5 turns; the
  transcript's own T7 driver message asked for "an example," which appears to have
  been the trigger that pulled the model into an unrelated domain.
- **Root cause:** UNCONFIRMED — plausibly compounded by the same class of detector
  named in ENG-D07 (the T1 "new topic for me" misread may have partially unmoored
  the session from its actual concept before the "example" request in T6/T7 landed
  on an unrelated interpretation of the word "find").
- **Status:** NEW — the single most severe topic-drift instance found in this audit;
  not a variant previously documented in `ENGLISH_TOPIC_DRIFT_FINDING.md`.
- **Severity:** P1 — half a lesson spent teaching content entirely unrelated to the
  concept, including content that is itself wrong. Not P0 because no mastery
  evidence was fabricated (the learner was simply never assessed on the real
  concept during this window).
- **Fix priority:** Critical.
- **Fix category:** code (topic/excursion-request detector) and prompt (grounding
  "give me an example" requests to the concept actually being taught).

---

### ENG-D09 — Tutor teaches the learner's own message text back as if it were content

- **Concept/lesson:** `eng.phonics.digraphs`, `eng.phonics.print-concepts`,
  `eng.grammar.complex-sentences` (all from the pre-existing finding doc; not
  independently reproduced in this audit's own new batches, though ENG-D07/ENG-D08
  above show closely related failure modes in the same detector family).
- **Evidence** (quoted from `ENGLISH_TOPIC_DRIFT_FINDING.md`):
  - `eng.phonics.digraphs`, T2: learner asks a genuine on-topic question; reply
    ignores it and instead explains the phrase *"we learning today"*, echoed
    verbatim from the learner's own earlier message, as if it were a concept about
    group-learning dynamics. Persists 5 turns before self-correcting.
  - `eng.phonics.print-concepts`, T3: learner says "i dont know"; reply explains the
    learner's own earlier phrase *"explain simple please, im a beginner"* as a
    4-step meta-lesson on how to give a simple explanation.
  - `eng.grammar.complex-sentences`: a second, distinct episode class — the learner
    asks to have the lesson's actual topic re-explained, and instead receives 2 full
    turns teaching **pronoun forms** (`eng.grammar.pronouns` content — a different
    concept entirely), described in the source doc as a possible cross-concept
    content leak rather than text-echoing.
- **Root cause:** documented as a lead, not a confirmed diagnosis, in the source doc
  — plausibly the same topic/excursion-request detector family implicated in
  ENG-D07/ENG-D08, over-reading a first-person/meta phrase as a lesson-scoping
  instruction.
- **Status:** KNOWN — `docs/architecture/ENGLISH_TOPIC_DRIFT_FINDING.md`.
- **Severity:** P1 (matches this file's classification for ENG-D08, the same defect
  family).
- **Fix priority:** High.
- **Fix category:** code (topic/excursion-request detector).

---

### ENG-D10 — Promised question/content never delivered (truncated turn)

- **Concept/lesson:** `eng.phonetics.prosody` (order 28, T10),
  `eng.vocab.word-formation-processes` (order 37, T7),
  `eng.vocab.phrasal-verbs` (order 43, T7),
  `eng.vocab.thesaurus-and-dictionary-skills` (order 47, T10),
  `eng.grammar.adjectives` (order 53, T10), `eng.grammar.conjunctions` (order 56,
  T10).
- **Evidence:**
  - *"That's right. First, I'm going to give you three short sentences. \nNext, I'd
    like you to"* — cuts off mid-sentence, no MCQ, no further content.
  - *"That's right. Let's test your understanding with a quick choice."* (recurs
    verbatim at two different concepts) — no MCQ_STEM follows in either case.
  - *"...The best fit for a lively, informal description of a crowd is **thrilled**
    or **pumped**... \n\n**Quick check**"* — announces a check, delivers nothing.
- **Root cause:** UNCONFIRMED — consistent in shape with a generation cutoff (the
  model announces it is about to ask something and the response ends before the
  question is actually produced), but not traced to a specific truncation point.
- **Status:** NEW.
- **Severity:** P2 — the learner isn't misled about correctness, but the lesson
  stalls with an unfulfilled promise, and this recurs across 6 different concepts.
- **Fix priority:** Medium.
- **Fix category:** code (generation/response-completion handling).

---

### ENG-D11 — Wrong answer receives no corrective feedback

- **Concept/lesson:** `eng.grammar.roots-and-origins` (order 36, T5),
  `eng.grammar.interjections` (order 57, T6, under provider degradation),
  `eng.grammar.apostrophes` (order 87, T5, under provider degradation, this audit's
  own Checkpoint 6), `eng.reading.genre-recognition` (order 100, T7),
  `eng.vocab.thesaurus-and-dictionary-skills` (order 47, T5).
- **Evidence:**
  - `eng.grammar.roots-and-origins`: wrong tap → *"I thought you were picking
    biography as the word that uses the 'scrib/script' root. Is that right?"* — no
    correctness statement, just restates the choice as a question.
  - `eng.grammar.interjections`: wrong tap → `Tutor [degraded]:` *"Let's take one
    small step together. I'll walk through it with you and pause whenever it
    helps.\n\nWe can continue from here whenever you're ready."* — pure generic
    filler, zero corrective feedback, turn took 36.9s (abnormal latency).
  - `eng.grammar.apostrophes` (this audit's Checkpoint 6): wrong tap → identical
    `[degraded]` generic-filler pattern, 35.5s latency, then the very next turn moves
    to a brand-new unrelated MCQ with the wrong answer never addressed.
  - `eng.reading.genre-recognition`: wrong tap → *"Here is your next question."* —
    zero correctness feedback, moves straight to the next MCQ.
- **Root cause:** partially traced — 2 of the 5 instances are directly correlated
  with `[degraded]` AI-provider responses (a known, extensively-documented
  infrastructure/capacity issue in this project's history); the other 3 occur under
  a normal (non-degraded) provider and are UNCONFIRMED as to mechanism.
- **Status:** RECURRING — the degraded-provider sub-case is a new manifestation of
  a documented infra issue; the normal-provider sub-case is NEW.
  correctness-confirmation-under-99% rate).
- **Severity:** P1 — a weak learner who answers wrong and gets no correction has no
  path to actually learn the correct answer; this directly undermines the
  platform's teaching function.
- **Fix priority:** High.
- **Fix category:** code (ensure a graded-wrong answer always carries an explicit
  correction, including on the degraded-provider fallback path).

---

### ENG-D12 — Model serves its own ungraded prose MCQ when the authored probe pool is exhausted

- **Concept/lesson:** `eng.vocab.synonyms-antonyms` (order 31, T5).
- **Evidence:** a full A/B/C/D question is served as plain prose with no `MCQ_STEM`
  tag: *"Which pair of words are true synonyms... A) Happy – joyful \nB) Quick –
  slow \nC) Hot – cold \nD) Tall – short"* — never structurally attached, never
  answered by the learner (who asks for a diagram instead at the next turn), and
  silently dropped.
- **Root cause:** documented mechanism (this project's own architecture: when the
  authored probe pool is exhausted, the model is deliberately allowed to serve its
  own invented, advisory `<!--MCQ-->` rather than go silent — tracked elsewhere in
  this repo via the `unauthoredKeyGrades` counter). This instance is a plain-prose
  variant without even the `<!--MCQ-->` tag, making it fully unstructured and
  ungradeable. Directly connects to **ENG-D14** below: `eng.vocab.synonyms-antonyms`
  is one of the 214 concepts confirmed short an authored probe, which is exactly the
  condition that triggers this fallback path.
- **Status:** KNOWN mechanism, NEW specific instance/variant (plain prose, no tag at
  all).
- **Severity:** P2 — does not fabricate a false grade (nothing was graded at all),
  but wastes a turn on an unanswerable, un-tracked question for a struggling learner.
- **Fix priority:** Medium (the durable fix is closing the probe-pool shortfall —
  see ENG-D14 — not patching this fallback path itself).
- **Fix category:** content (root fix); code (if the plain-prose-no-tag variant is
  itself an additional gap beyond the already-known `<!--MCQ-->` fallback).

---

### ENG-D13 — Misleading or garbled visuals on phonetics concepts

- **Concept/lesson:** `eng.phonetics.intonation-patterns` (order 23, T4),
  `eng.phonetics.vowel-sounds` (order 18, T3).
- **Evidence:**
  - `eng.phonetics.intonation-patterns`: a generic `{"type":"graph","equation":
    "0.5x + 200",...}` linear graph is served to depict "rising pitch intonation" —
    implies a literal linear pitch-vs-time relationship, not how intonation curves
    actually behave.
  - `eng.phonetics.vowel-sounds`: an ASCII vowel-space chart with an internally
    inconsistent layout (two "Front (unrounded)" entries both under "High", "Low"
    placed at the arrow's terminus rather than as an axis label) — confusing rather
    than clarifying for a vowel trapezoid.
- **Root cause:** UNCONFIRMED.
- **Status:** NEW.
- **Severity:** P2 — actively confusing rather than merely absent (worse than an
  honest "no visual available," better than a completely wrong figure).
- **Fix priority:** Medium.
- **Fix category:** visual.

---

### ENG-D14 — 214 of 216 English concepts are short one authored closed-choice probe; mastery is structurally unreachable

- **Concept/lesson:** 214 of 216 English KG concepts (all except the 2 named below).
- **Evidence:** quoted from `docs/architecture/PHASE6_P1_ENGLISH_ASSET_CONTRACT.md`:
  ```
  english KG concepts: 216      with any authored asset: 216
  closed-choice probes per concept -> concepts:  { "0": 2, "2": 214 }
  concepts BELOW contract: 216 / 216
  ```
  The asset contract requires >=3 closed-choice probes per concept (derived directly
  from the mastery gate: `correctAtCheck>=1` + `correctAtPractice>=2` = 3, and a
  spent probe is never re-asked). 214 concepts hold exactly 2 (`mcq x1 +
  misconception_probe x1`, identical template signature across all 214 — evidence
  of a generator template gap, not 214 independent authoring decisions).
- **Root cause:** CONFIRMED, fully traced in the source doc — a content/asset
  authoring gap, not a runtime defect. The doc explicitly verifies the runtime
  handles the shortfall correctly (withholds ungradeable questions, never fabricates
  a grade) — the runtime's own honest backstop is exactly what produces ENG-D10's
  "content-free hold" and ENG-D12's ungraded-prose-MCQ symptoms elsewhere in this
  file. This is very likely the underlying cause of most "concept never reached
  mastery" observations throughout the rest of this audit.
- **Status:** KNOWN — `docs/architecture/PHASE6_P1_ENGLISH_ASSET_CONTRACT.md`,
  "CONFIRMED CONTENT/ASSET DEFECT — OWNER REQUIRED."
- **Severity:** P1.
- **Fix priority:** Critical (root cause of multiple other entries in this file).
- **Fix category:** content (author one additional closed-choice probe per
  concept, matching the existing modality).

---

### ENG-D15 — `eng.phonics.print-concepts` carries standard MCQ probes despite being a pre-reading, voice-only entry node

- **Concept/lesson:** `eng.phonics.print-concepts`.
- **Evidence:** quoted from `PHASE6_P1_ENGLISH_ASSET_CONTRACT.md`: this concept is
  documented as a pre-reading entry node ("both entry nodes are pre-reading") yet
  carries the standard `mcq x1 + misconception_probe x1` signature — a pre-reading
  learner cannot read MCQ options. Meanwhile the *other* pre-reading node
  (`letter-sound-correspondence`) correctly has no closed-choice probes at all.
- **Root cause:** CONFIRMED — a corpus/design disagreement, reported directly in the
  source doc.
- **Status:** KNOWN — same source doc as ENG-D14.
- **Severity:** P2.
- **Fix priority:** Medium.
- **Fix category:** content.

---

### ENG-D16 — Diagram/visual request silently ignored (no acknowledgment at all)

- **Concept/lesson:** `eng.grammar.compound-sentences` (order 67, T5, this audit's
  own Checkpoint 6).
- **Evidence:** learner asks *"can i see a visual"*; the reply is a brand-new gate
  MCQ (*"A question about Compound Sentences now — read it carefully first."*) with
  zero acknowledgment of the request — no apology, no substitute description. This
  contrasts with 8 other diagram requests observed in the same batch, all of which
  received at least an honest "I can't show a picture, but here's a description"
  response.
- **Root cause:** UNCONFIRMED — not investigated (read-only audit); plausibly a race
  between the visual-resolution path and gate-question attachment on that specific
  turn.
- **Status:** NEW.
- **Severity:** P2 — a weak learner who explicitly asked for help gets no signal the
  request was even heard.
- **Fix priority:** Medium.
- **Fix category:** code.

---

### ENG-D17 — Hard mid-lesson failure: 504 FUNCTION_INVOCATION_TIMEOUT

- **Concept/lesson:** `eng.grammar.colons-semicolons-dashes` (order 89, T7, this
  audit's own Checkpoint 6).
- **Evidence:** an ordinary, valid MCQ-answer submission returns a raw
  `ERROR: chat failed: 504 An error occurred with your deployment /
  FUNCTION_INVOCATION_TIMEOUT` — no graceful degraded response, the lesson simply
  ends there. The immediately preceding turn had already taken an abnormal 58.1
  seconds to respond (vs. a normal 12–25s), i.e. visible latency escalation
  immediately before the hard failure.
- **Root cause:** UNCONFIRMED (not investigated further — read-only audit), but the
  latency-escalation-then-hard-timeout shape is consistent with AI-provider
  capacity/latency issues already extensively documented elsewhere in this project's
  history.
- **Status:** NEW.
- **Severity:** P1 — completely ends a lesson mid-progress with an unrecoverable raw
  error, worse than the graceful `[degraded]` fallback path used elsewhere.
- **Fix priority:** High.
- **Fix category:** architecture (timeout/latency budget) — no code defect
  identified; this is an infra-capacity symptom.

---

### ENG-D18 — Recurring session-create "Internal server error," correlated with observed production DB unavailability

- **Concept/lesson:** not concept-specific — hit while attempting to open
  `eng.grammar.simple-sentences` (order 66), `eng.reading.literal-comprehension`
  (order 94, first attempt), and a login attempt immediately before order 94's
  successful retry (all this audit's own Checkpoints 5–6).
- **Evidence:**
  - 3 separate `Fatal: session create failed: {"success":false,"error":"Internal
    server error"}` events across ~85 concepts of audit traffic.
  - Directly correlated with production health: `GET /api/health` was polled at the
    moment of the third occurrence and returned `{"status":"degraded","db":false,
    ...}` (HTTP 503); an immediate retry also failed with `"login failed (302)"`
    (auth depends on the same DB). Re-polling ~1 minute later both times showed full
    recovery (`"status":"ok","db":true`).
- **Root cause:** UNCONFIRMED in mechanism, but directly evidenced as a real,
  intermittent production database-availability issue (not an audit-script
  artifact) — outage windows of roughly 30–90 seconds, self-recovering, observed 3
  times across ~7 hours of light, single-caller traffic (~1 outage per ~2 hours in
  this sample). Consistent in shape with the connection-pool/DB-contention issues
  already extensively documented elsewhere in this project's history, though not
  independently confirmed to be the same root cause.
- **Status:** RECURRING — the first occurrence (order 66) was initially classified
  as one-off transient noise after a single successful retry; this file supersedes
  that classification with the fuller pattern once 2 more occurrences were observed
  and directly correlated with a live health-check.
- **Severity:** P1 — during these windows, no learner can log in, create a session,
  or continue a lesson at all.
- **Fix priority:** High.
- **Fix category:** architecture (database connection handling/capacity).

---

### ENG-D19 — Miscellaneous content-construction defects

- **Concept/lesson:** `eng.phonetics.connected-speech` (order 24, T4),
  `eng.grammar.word-classes-overview` (order 49, T1),
  `eng.grammar.adverbs` (order 54, T1),
  `eng.reading.predicting-and-confirming` (order 98, T5),
  `eng.reading.critical-reading` (order 105, T5).
- **Evidence:**
  - A stray, out-of-place fragment `"D) It becomes a sound"` appears immediately
    before the actual `MCQ_STEM` block, and the correct answer was already stated
    verbatim in the teaching text immediately preceding a "check" question asking
    the same fact.
  - Two instances of grammatically broken/truncated sentences: *"The word **run**
    can mean a verb or a noun. \n**Is doing the same job in**?"* and *"The sentence
    reads: "She drinks tea slowly." \nIs an adverb since it ends in?"*
  - An `MCQ_STEM` that states the answer as fact rather than posing a question:
    *"After the first paragraph says the new panels are expensive, the reader should
    revise the prediction."*
  - A new drug-study scenario is introduced in teaching prose, then an unrelated
    prior MCQ is re-served verbatim, leaving the new scenario dangling/unused.
- **Root cause:** UNCONFIRMED.
- **Status:** NEW.
- **Severity:** P3 — content-quality rough edges; none block grading or mislead on
  correctness.
- **Fix priority:** Low.
- **Fix category:** content/prompt.

---

### ENG-D20 — [RESOLVED] Same visual re-served every turn (English Word Recognition reference lesson)

- **Concept/lesson:** English Word Recognition reference lesson (production
  reference-lesson QA set, not part of the KG-order-based audit above).
- **Evidence/root cause:** `resolveVisual.ts`'s served-figure path hardcoded
  `session.turns:0`, so a served figure re-introduced itself on every turn instead
  of holding silently after the first display.
- **Status:** KNOWN, **FIXED** — CLAUDE.md's "Root-cause QA of the 3 reference
  lessons" (2026-08-28), commits `5448ad9`/`2847db0`. Live-verified post-fix: the
  figure now appears once and holds silently, re-showing only on an explicit new
  request. This finding set went from 10 findings to 0 after the fix. Included here
  only for a complete audit trail — no further action needed.
- **Severity:** N/A (resolved).
- **Fix priority:** N/A (resolved).
- **Fix category:** N/A (resolved).

---

## Part 2 — Observations / not confirmed as defects / false positives

### OBS-01 — Lesson "pauses" at the driver's turn cap after repeated struggle

- **Concept/lesson:** `eng.phonics.alphabet-recognition`, `eng.phonics.rhyming`,
  `eng.phonics.letter-sound-correspondence`, `eng.phonics.short-vowels`,
  `eng.phonics.consonant-blends` — all `phase1-english.log`, all at T12 (the
  driver's own turn cap for that script).
- **Why flagged, then not confirmed:** each closes with *"Let's pause X here for
  now... Press 'Start next lesson' whenever you're ready to carry on"* in response
  to an ordinary message (e.g. "wait", "yes ok", "example please") that is not
  literally a stop request. However, this project's own documented architecture
  (Session Boundaries / affect-budget CLOSING design, described at length elsewhere
  in this repo) has CLOSING trigger on accumulated struggle/budget exhaustion, not
  on the literal content of the final message — a scripted wrap-up that doesn't
  reference the last utterance is consistent with that design, not necessarily a
  bug. All 5 instances land at exactly this driver's own T12 cap, which is
  consistent with budget exhaustion having accumulated by then from earlier wrong
  answers in the same session, not with a misread of the T12 message itself.
- **Disposition:** NOT CONFIRMED as a defect. Distinguished from **ENG-D05** above
  (the `print-concepts` T1 case), which cannot be budget-driven since no prior
  wrong answers exist at turn 1 — that one stayed a confirmed defect. Flagged here
  for a future session to verify against the actual affect-budget/CLOSING logs for
  these five sessions before any action is taken.

### OBS-02 — Uneven visual-asset coverage across grammar/tense concepts

- **Observation:** 9 explicit diagram/visual requests across `eng.grammar.*`
  sentence-structure and tense concepts (orders 66–89, this audit's own Checkpoint
  6) all returned `VISUAL: none`, vs. 2 clean real visuals served for
  `eng.grammar.question-formation`/`eng.grammar.negation` in the immediately
  preceding batch of concepts.
- **Disposition:** NOT a confirmed defect by itself — consistent with this
  project's documented "uncurated concept" visual architecture (some concepts
  simply have no visual binding yet). Recorded as a data point, not a bug; the
  8-of-9 honest "I can't show a picture, but here's a description" handling in
  these same turns is the expected, correct fallback behavior. (The 1-of-9 silent
  case is tracked separately as the confirmed **ENG-D16**.)

### OBS-03 — MCQ re-offer guard firing correctly

- **Observation:** 2 instances observed in this audit (Checkpoints 5–6) where the
  disambiguation lead-in fired on genuinely ambiguous learner input ("can you
  clarify that" mid-MCQ, "im not sure") and correctly re-offered the pending probe
  with a clear lead-in.
- **Disposition:** NOT a defect — correct behavior of the same mechanism whose
  false-positive failure mode is tracked as ENG-D02/ENG-D03. Recorded to make clear
  the guard is not universally broken, only over-broad in specific message shapes.

### OBS-04 — Generic AI-provider degradation events

- **Observation:** `Tutor [degraded]:` responses were observed multiple times
  across this audit, generally correlated with abnormally high turn latency
  (35–59 seconds vs. a normal 12–25s).
- **Disposition:** NOT itself a new code defect — an extensively documented,
  known AI-provider capacity/infrastructure issue elsewhere in this project's
  history. Only the *consequence* of losing corrective feedback on a wrong answer
  during such an event is tracked as a confirmed defect (ENG-D11); the degradation
  event itself is an infra symptom, not a fix target for this codebase.

### OBS-05 — Order-66 session-create failure, initially classified transient

- **Observation:** the first occurrence of the "Internal server error" pattern
  (order 66) was initially classified as a one-off transient failure after a single
  immediate retry succeeded.
- **Disposition:** SUPERSEDED — 2 further occurrences with direct health-endpoint
  correlation reclassified this into the confirmed, recurring **ENG-D18**. Recorded
  here only for audit-trail completeness (to show the classification changed as
  more evidence accumulated, not to double-count it).

---

## Summary

| Severity | Count |
|---|---|
| P0 | 0 (ENG-D06 CLOSED 2026-09-12 — BENIGN, instrument defect, not a mastery defect) |
| P1 | 11 (ENG-D01, D02, D03, D04, D05, D08, D09, D11, D14, D17, D18) |
| P2 | 6 (ENG-D07, D10, D12, D13, D15, D16) |
| P3 | 1 (ENG-D19) |
| Resolved | 1 (ENG-D20) |
| **Total unique confirmed defects** | **20** |
| Observations (not confirmed as defects) | 5 (OBS-01 … OBS-05) |

Fix-category breakdown of the 20 confirmed defects: 10 code, 5 content, 2
architecture, 2 prompt, 1 visual, 1 QA (some entries span two categories and are
counted under their primary one above).
