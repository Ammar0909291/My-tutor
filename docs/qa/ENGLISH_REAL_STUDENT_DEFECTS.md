# English Curriculum — Real-Student Simulation Defect Register

**Status: READ-ONLY AUDIT ARTIFACT. No production code, content, or configuration was
changed to produce this file.** It consolidates every defect discovered while driving
the real deployed app (`my-tutor-flame.vercel.app`) through English lessons with a
weak/intermediate-learner persona, across three separate simulation efforts:

1. **Task B** — `scripts/.../weakLearnerSim.ts`, Phase 1 (English), orders 1–10,
   ~106 turns (`phase1-english.log`).
2. **Task C** — the concept-by-concept English curriculum audit,
   `scripts/.../englishAudit.ts`, orders 11–216 (the full remainder of the English
   KG) across 19 batches (`audit-batch1.log` … `audit-batch19.log`), ~1650+ turns.
   This audit is now COMPLETE — every English concept (216 total) has been driven
   through the real-student simulation, either directly by this campaign or by the
   `ALREADY_TOUCHED` skip set covering concepts already validated by the separate
   ADULT-band campaign cited in item 3 below.
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
- **2026-09-12 — NOT FIXED, and NOT the tag pipeline.** Checked before assuming: the
  residual-tag sweep is not involved (it removes markup, never characters inside prose),
  and the missing items are IPA symbols and phoneme values, i.e. content the model had to
  produce. No sanitization step in `src/` strips non-ASCII from reply text. So the
  plausible cause is generation, not a render/strip stage — but that was NOT proven, and
  patching a stripper that is not implicated would be a speculative fix. Left open with
  the narrowed finding recorded.
- **Status:** NEW — not previously documented anywhere else in this repo found during
  this audit.
- **Severity:** P1 — makes MCQ options genuinely indistinguishable in several
  instances (a learner cannot select the "right" option because all four read
  identically), and breaks the core deliverable of a phonics lesson (the sounds
  themselves).
- **2026-09-12 (second pass) — NO NEW EVIDENCE; deliberately not re-opened.** The
  first pass had already ruled out the render/strip pipeline by inspection, which
  leaves generation — and a generation defect cannot be closed by a stripper, a
  detector, or a regex. Proving it needs the raw stored assistant message for one of
  the 30+ instances, checked for whether the IPA codepoints were ever present. That
  is the same technique that settled ENG-D04's residual this session and it would
  work here; it was not run, because the tag residual was a yes/no question about one
  string and this is a survey across 30+ turns in 14 concepts, which is its own task.
  Recorded as the concrete next step rather than left as "needs a trace".
- **Fix priority:** High — OPEN.
- **Fix category:** prompt (generation) — the render/sanitisation half is ruled out,
  not merely unprioritised.

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
- **2026-09-12 — FIXED (commit `3bb4cc4`, deployed).** Root cause was structural, not
  another missing exclusion: `genuineUnmappedAttempt` carried ONE positive term
  (`message.trim() !== ''`) and six negatives, so its DEFAULT answer to "is this an
  answer attempt?" was YES and every non-answer had to be excluded by name — which is
  why each prior round of exclusions was followed by a fresh false-positive class.
  Reproduced independently before changing anything: 9 of the 10 documented phrasings
  escape EVERY pre-existing exclusion, for two deliberate reasons in the classifiers
  (`detectLearnerQuestion` REQUIRES a `?`; `isBareAcknowledgement` matches the WHOLE
  message against a phrase list). `engagesPendingOptions` inverts the default —
  the lead-in may fire only on positive evidence the message reached for one of the
  REAL pending options. It never grades; `resolveMcqChoice` is untouched.
  PRODUCTION-VERIFIED on a disposable QA account (`eng.grammar.verbs`): all three
  tested documented phrasings served NO lead-in. **Recall is NOT live-verified** —
  that turn attached a new probe so it was not a re-offer; recall is pinned offline
  only. Guard: `src/tests/engMcqReofferFalsePositive.test.ts`.
- **Status (superseded):** the KNOWN/RECURRING line above is the pre-fix record and is
  kept as history. Current status: **FIXED**.
- **Severity:** P1 (per the original finding doc's own classification).
- **Fix priority:** High — DONE.
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
- **2026-09-12 — FIXED (commit `3bb4cc4`, deployed), in two halves.** (1) The false
  confirmation: `stripLeadingFalseConfirmation` already existed but was gated behind
  `genuineUnmappedAttempt`, which the Group-9 turn was not. It now runs on ANY ungraded
  re-offer — a re-offer means the same probe is still pending and NOTHING was graded, so
  the server has no verdict the model could be reporting. (2) The invented option
  content: `stripContradictingProseOptions` removes a lettered option run whose options
  are not the pending probe's, which is the Group-12 shape (four fabricated options
  beside a different real widget while the lead-in pointed at "the list below"). A
  FAITHFUL prose restatement of the real options is returned untouched, only option
  fragments are ever removed, and it never returns an empty reply.
- **Status (current):** **FIXED** — the KNOWN line above is kept as the pre-fix record.
- **Fix priority:** Critical — DONE.
- **Fix category:** code (same guard as ENG-D02).

---

### ENG-D04 — Internal scaffolding/control text leaked verbatim to the learner

- **Concept/lesson:** `eng.phonetics.minimal-pairs` (order 20, T1),
  `eng.phonetics.syllable-stress` (order 21, T1), `eng.phonetics.phonetic-transcription`
  (order 27, T1), `eng.grammar.word-order` (order 60, T5),
  `eng.writing.supporting-details` (order 113, T9 — **new, Checkpoint 8**).
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
  - **SECOND confirmed occurrence of the same tag family** (`eng.writing.
    supporting-details`, order 113, T9): the tutor's teaching text ends mid-thought
    with `"🎉 \n[!--ATTEMPT channel="verbal" representation="concrete-objec[...
    truncated by the log capture]"`. Different subject domain entirely (writing, not
    grammar/phonetics) — this rules out a concept-specific trigger and confirms the
    leak is a systematic gap in the teaching engine's tag-stripping, not an artifact
    of one concept's content.
- **Root cause:** UNCONFIRMED for the exact mechanism, but strongly suggestive: the
  "argued discovery step" phrasing matches this project's own Educational Brain
  concept-entry authoring field name, implying that field's text is being echoed by
  the model into learner-facing output instead of being consumed only as an internal
  instruction. The `<--ATTEMPT ...-->` tag is an unrendered internal directive of a
  kind (channel/representation/concreteness/scaffold/pacing parameters) not
  documented as learner-facing anywhere in this repo. Its recurrence across two
  unrelated subject domains (grammar and writing) indicates the stripping gap was in
  a shared code path, not concept-specific prompt content.
- **2026-09-12 — TAG HALF FIXED AND REPRODUCED.** The `<--ATTEMPT …-->` leak is a
  MALFORMED COMMENT OPENER: `<--`, not `<!--`. Reproduced against the real module before
  changing it — `stripResidualMachineTags` returned it UNTOUCHED and `hasResidualMachineTag`
  reported it CLEAN, the same structural blindness this module had to the bracket shape
  before Phase 6 and to bare JSON before Phase 7; and `<--` is not a valid HTML comment, so
  nothing downstream hid it either. Three sites carried the `<!--` literal (the regex, the
  sweep's FAST PATH — which returned early even after the regex was widened — and the
  detector); all three now share ONE opener definition so they cannot drift again. The
  SHOUTED-name and terminator requirements are unchanged, so prose arrows are untouched
  (4 negative controls pinned). Guard: `src/tests/englishOpenDefects.test.ts`. The second
  instance recorded above (`eng.writing.supporting-details`, order 113) is additional
  production evidence for the SAME shared-code-path root cause this fix addresses.
- **2026-09-12 (second pass) — CORRECTION: the order-113 instance is NOT confirmed
  covered, and the earlier claim that it was is withdrawn.** The two instances do not
  share an opener. Order 60 leaked `<--ATTEMPT` (angle bracket) and is reproduced
  fixed. Order 113 is recorded in the capture as **`[!--ATTEMPT`** — a SQUARE bracket.
  Run against the real module: `stripResidualMachineTags` leaves `[!--ATTEMPT …-->`
  UNTOUCHED and `hasResidualMachineTag` reports it CLEAN (both terminated and
  truncated forms), because the comment sweep requires a leading `<` and the bracket
  sweep requires an uppercase letter immediately after `[`, so `[!--` satisfies
  neither. **Two readings remain open and this audit cannot separate them:** (a) the
  model emitted a third opener variant, which the fix genuinely does not cover; or
  (b) the `[` is the log capture's own rendering of `<` (the same line shows the text
  truncated mid-attribute, so the capture is demonstrably lossy). Resolving it needs
  the raw stored assistant message for that turn, not the audit log. Recorded as an
  open residual rather than closed, per this file's rule against marking anything
  fixed because a related defect was.
  **The "argued discovery step" half is NOT fixed** — that is model output echoing
  authoring-style prose, not a tag, and no stripper can tell it from teaching text.
- **2026-09-12 (third pass) — THE ORDER-113 RESIDUAL IS CLOSED, from the RAW
  STORED MESSAGE (commit `1926839`).** The second pass left two readings open and
  said resolving them needed the stored assistant message rather than the audit log.
  That message was read out of production. It ends, verbatim:
  `🎉 \n[!--ATTEMPT channel="verbal" representation="concrete-object" … -->]`.
  **The square bracket is real and persisted — reading (a) is confirmed and reading
  (b), a lossy-capture artifact, is eliminated.** The model wrapped a comment in
  square brackets rather than mistyping one delimiter; the terminator carries a
  trailing `]` too. Three opener variants are now measured from production: `<!--`
  (well-formed), `<--` (dropped `!`), `[!--` (bracket-wrapped). The sweep's opener
  admits `[` alongside `<` and its terminator an optional `]`, so the wrapper leaves
  no stray bracket behind. Blast radius unchanged: at least one dash after the opener
  is still mandatory, so a Markdown link (`[Chapter 2](…)`) and a citation (`[A]`)
  cannot match, and the SHOUTED-name and mandatory-terminator rules are untouched.
  Pinned against the verbatim stored string plus six negative controls in
  `src/tests/englishOpenDefects.test.ts`.
- **Status:** PARTIALLY FIXED. **The ENTIRE control-tag half is now FIXED** — all
  three production opener variants (`<!--`, `<--`, `[!--`) are stripped and pinned,
  the order-60 and order-113 instances both reproduced fixed. **ONE half remains
  OPEN:** the "argued discovery step" prose-echo (3 instances, orders 20/21/27) —
  model output, not a tag, and no stripper can tell it from teaching text; that is a
  prompt-level item. Counted as OPEN in the summary on the strength of that half
  alone, which is unambiguous.
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
- **2026-09-12 — INVESTIGATED, NOT REPRODUCED, NOT FIXED.** Ruled out by measurement
  rather than reasoning: the trigger message "ok starting, not sure about this topic" reads
  `wantsToStop:false`, `failureState:null`, `learnerRequest:null`, `detectAutonomyRequest:false`,
  `isBareAcknowledgement:false` — so it is NOT a stop/autonomy misread, which was the
  leading hypothesis. The observed reply is the closed-concept close script, which needs
  persisted session state (a prior attempt's ladder/budget) that cannot be reconstructed
  offline from the log. Phase 7L already fixed the ladder-carryover class. Left open rather
  than patched on a guess.
- **2026-09-12 (second pass) — NOT RE-OPENED; one cross-reference added.** The first
  pass measured the trigger message through every relevant detector and ruled out the
  stop/autonomy misread, leaving persisted session state as the remaining
  explanation — which cannot be reconstructed offline from a log and needs either the
  stored `contextSnapshot` for that session or a live reproduction. Neither was
  available this pass and no speculative patch was made.
  **Cross-reference, noted not claimed:** the concept here,
  `eng.phonics.print-concepts`, is also the sole subject of ENG-D15 — the one
  pre-reading node carrying closed-choice probes while its two siblings correctly
  carry none. Whether that mismatch reaches this behaviour is untested; they are
  recorded as co-located, not as one defect.
- **Status:** NEW — OPEN, cause UNCONFIRMED.
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
- **2026-09-12 — INVESTIGATED, NO RUNTIME MECHANISM FOUND, deliberately NOT patched
  (commit `77ac685`).** Ran the trigger through every real detector:
  `namedTopicUnknownTo`, `extractRequestedTopic` (both floors), `isExplicitTopicRequest`,
  `resolveRequestedConceptId` and `readTurnIntent` ALL return null/false for
  "hello, new topic for me". An excursion cannot open without a resolved concept id or
  a topic title, so no deterministic path acts on this message — the observed drift is
  model behaviour reading its own context, with nothing to narrow. Adding a regex to
  match the phrase is precisely the move that produced the ENG-D02 exclusion-list trap,
  so it was recorded rather than guessed at. Pinned by
  `src/tests/englishTopicDrift.test.ts`.
- **Status:** OPEN — RECURRING, and now also NOT-RUNTIME-ADDRESSABLE on current
  evidence (the pre-fix "extends ENGLISH_TOPIC_DRIFT_FINDING.md with a new trigger
  phrase" record above is kept as history). Any future fix is prompt-level, not
  detector-level.
- **Severity:** P2 — usually self-corrects within the same or next turn (the driver's
  next message typically returns to the actual lesson); does not appear to derail a
  whole lesson by itself (contrast ENG-D08).
- **Fix priority:** Medium.
- **Fix category:** prompt (re-categorised from code, 2026-09-12 — the detector layer
  was measured not to fire on this phrase at all).

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
- **2026-09-12 — EXPLICITLY NOT CLOSED by the topic-drift fixes of commit `77ac685`.**
  Stated because two sibling entries in this family (ENG-D09) WERE fixed that day and
  it would be easy to assume this one came with them. It did not, and the mechanisms
  differ: the ENG-D09 fix narrows what counts as a NAMED TOPIC in a learner request
  (`DISCOURSE_NOUNS`), and this episode has no such request — its own evidence above
  identifies the trigger as a bare "give me an example" landing on the ordinary
  English word *find*, with no topic named by the learner at any point. ENG-D07, the
  entry this one names as a possible contributing cause, was separately measured to
  have NO runtime mechanism at all, so it cannot supply one here either. Root cause
  remains UNCONFIRMED and this remains the most severe open drift instance.
- **2026-09-12 (second pass) — PROMPT FIX SHIPPED (commit `1926839`); the code half
  is REJECTED on this evidence, not deferred.** This entry's own fix category named
  both halves; only one of them is real.
  **Code half — rejected, with the argument in-repo.** Every real detector was
  re-measured against this episode's trigger and all return null: the learner named
  no topic, so there is no runtime signal to narrow. The remaining shape of a code
  fix would be a general "does this content relate to the lesson" check, and
  `topicDrift.ts`'s own header already argues why that is actively harmful here — it
  would strip exactly the zero-vocabulary-overlap everyday analogies this tutor is
  measured to be GOOD at. Adding a regex for the trigger phrase is the move that
  produced the ENG-D02 exclusion-list trap.
  **Prompt half — shipped, at the layer that owns it.** `buildConceptAnchorBlock`
  now states that an example, analogy or practice item must be an example OF the
  anchored concept, that a bare "give me an example" names no new topic, and that it
  is never a cue to switch subject or to a different sense of a word appearing in the
  model's own explanation — which is this episode exactly (the ordinary English word
  *find*, reread as the programming one). It cannot reintroduce the steer-back
  regression this block's history records: it constrains what an example is OF and
  says nothing about refusing or shortening a question, and the detour rule above it
  still runs first for a request that DOES name a topic. Pinned by 5 cases in
  `src/tests/conceptAnchor.test.ts`, one of which asserts the removed steer-back has
  not returned.
  **Still OPEN** — a prompt rule is a lever, not an invariant, and this repo has a
  long measured record of advisory rules being ignored. Closing it needs production
  evidence that the drift rate fell, which single-caller traffic cannot supply.
- **Fix priority:** Critical — STILL OPEN (prompt mitigation shipped, unverified).
- **Fix category:** prompt (SHIPPED 2026-09-12). The code half is **rejected** on
  measured evidence — see the second-pass note above — not merely unimplemented.

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
- **2026-09-12 — FIXED (commit `77ac685`, deployed). BOTH episode classes, and they
  did NOT share a root cause** — the source doc's own warning about that was correct,
  and each was investigated independently.
  - **Self-echo half** (`digraphs`, `print-concepts`) — the topic-request detector.
    Reproduced deterministically against the real `namedTopicUnknownTo`: "hello, what
    are we learning today" extracted the topic **"we learning today"** and "explain
    simple please, im a beginner" extracted **"simple please, im a beginner"** —
    verbatim the phrases the transcripts record being taught, so this is the root
    cause, not the lead it was filed as. Exactly ONE word held each phrase up
    (`today`, `beginner`), neither about any subject. Fixed inside `DISCOURSE_NOUNS`
    under the existing one-real-word-survives rule; every added word occurs in 0 of
    1,775 concept titles, and `learning` was deliberately NOT added (real vocabulary:
    "Machine Learning"). The request detector itself is untouched — the learner DID
    ask; what they named was not a subject.
  - **Cross-concept half** (`complex-sentences` → pronoun content) — NOT the detector.
    Every detector returns null on "please explain it another way". It is the
    weak-topic reinforcement advisory, whose suppression guard consults the RECOVERY
    rung of the arbitration ladder but not the LEARNER_REQUEST rung that also outranks
    TEACH. Measured: all four pre-existing suppression terms read false while
    `learnerRequest` read `explain_differently`, so the advisory stood and pulled
    already-taught `eng.grammar.pronouns` content into the lesson. One rung added.
  Guard: `src/tests/englishTopicDrift.test.ts`, including negative controls that an
  ordinary calm turn still leaves the advisory standing.
- **Status:** **FIXED** — both episode classes; the KNOWN line is kept as the pre-fix
  record. Does NOT close ENG-D08 or ENG-D22 (different mechanisms — see those entries).
- **Severity:** P1 (matches this file's classification for ENG-D08, the same defect
  family).
- **Fix priority:** High — DONE.
- **Fix category:** code (topic/excursion-request detector + weak-topic advisory
  suppression).

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
- **2026-09-12 — NOT INVESTIGATED THIS PASS; one inherited assumption withdrawn.**
  This entry's shape (the model announces a question and the response ends before it
  arrives) was not traced — no code fix was attempted and none is claimed. The one
  change is negative: ENG-D14's own note asserted that the runtime's honest
  ungradeable-question backstop "is exactly what produces ENG-D10's content-free
  hold". ENG-D14 is now resolved (0 of 333 English concept/band pairs are below
  contract), so that explanation no longer supports this entry, and it should not be
  carried forward as though it did. Cause remains UNCONFIRMED, and the generation-
  cutoff reading recorded above is untouched and still the leading one.
- **Fix priority:** Medium — OPEN, UNCONFIRMED.
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
- **2026-09-12 — FIXED, root cause located by inspection, deployed (commit
  `6c3be2b`, `dpl_BpCHMdRVT9m2tx13t5YU9vZmdRt1` READY).** The owner is
  `answerConfirmation.ts`, and the defect is an ASYMMETRY rather than a detector gap:
  `confirmCorrectAnswer` guarantees an acknowledgement on a server-graded CORRECT
  answer and returns the reply UNTOUCHED for `correct !== true`. Nothing anywhere
  guaranteed anything on a graded-WRONG one. New sibling
  `stateCorrectionForWrongAnswer` (`src/lib/teaching/wrongAnswerCorrection.ts`)
  prepends "Not quite — the answer is: X" under exactly the same authority and no
  more: it fires only on `mcqGradeHoisted.correct === false` — `gradeMcqAnswer`'s
  verdict against an authored, human-reviewed key, never a model self-report — and X
  is `options[correctIndex]` read off that same probe. Both halves are facts the
  server already holds; with no key it returns the text untouched rather than
  guessing. It skips a turn the model already handled, and skipping requires BOTH
  halves: the reply must state the answer was incorrect AND name the correct option
  (containment, else two DISCRIMINATING option words, so vocabulary shared between
  options cannot satisfy it). Half a correction is not a correction. One deliberate
  asymmetry with its sibling, recorded in the module: that one declines to stand
  alone on an empty reply because inventing praise fabricates a turn; this one may,
  because the verdict and the key are server-held fact and a blank screen after a
  wrong answer is the worse failure. Wired after the confirmation enforcer so it
  decorates the text that ships — **including the degraded-provider template (set far
  earlier in the route), which is where 2 of the 5 recorded instances were
  observed**, so the infra-correlated sub-case is covered by the same change. 25
  targeted tests in `src/tests/wrongAnswerCorrection.test.ts`.
- **2026-09-12 — PRODUCTION-VERIFIED on a disposable QA account**
  (`qa-engd11-…@mytutor-qa.invalid`, session `cmtylukiy0004ie04auvsoowi`,
  `eng.grammar.nouns` order 50; account deleted afterwards, re-login confirmed
  blocked). The driver cannot know the key — `mcqForClient` strips `correctIndex` —
  so it taps options in rotation across successive probes and records what comes
  back. Four answers to served probes, and the two directions separated cleanly:
  - **Graded WRONG, T4:** *"Not quite — the answer is: Both — "patience" is an
    abstract noun (a quality/idea), just as real a noun as the concrete "team""*,
    followed by the model's own remediation.
  - **Graded WRONG, T7:** *"Not quite — the answer is: "Some advice" — advice is
    uncountable, so it takes "some", not "an"…"*.
  - **Graded CORRECT, T3 and T6:** *"That's right. …"* and *"You got it right! …"* —
    confirmed, and correctly given NO correction.
  **2 of 2 graded-wrong answers carried an explicit correction naming the right
  option; 2 of 2 graded-correct answers did not.** Instrument:
  `scripts/qa/engD11Verify.ts`.
- **Status:** FIXED (2026-09-12) — deployed and PRODUCTION-VERIFIED.
- **Severity:** P1 — a weak learner who answers wrong and gets no correction has no
  path to actually learn the correct answer; this directly undermines the
  platform's teaching function.
- **Fix priority:** High — DONE.
- **Fix category:** code (a graded-wrong answer now always carries an explicit
  correction, the degraded-provider fallback path included).

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
- **2026-09-12 — ROOT-CAUSE ATTRIBUTION WITHDRAWN, and no code fix made.** The
  mechanism above is stated as "when the authored probe pool is exhausted", and that
  is not what happened. `eng.vocab.synonyms-antonyms` — the concept this entry cites
  — holds several ACTIVE closed-choice probes at BOTH served bands in production
  (verified by direct query, see ENG-D14's resolution). The pool was not dry, so the
  shortfall cannot be the trigger and "the durable fix is closing the probe-pool
  shortfall" no longer follows.
  What remains true is that the model asked an untagged prose MCQ on a turn where
  the gate was not eligible. The EVIDENCE half of that is already closed
  deterministically and was re-verified, not assumed: `shouldSuppressSignalCorrectness`
  (via `hasProseMultipleChoice`) strips the model's self-reported correctness for
  exactly this shape, so nothing false is banked; and `buildProseMcqReplyDirective`
  already fires on the following turn telling the model to re-issue the question with
  the tag. The LEARNER-FACING half cannot be repaired by text surgery: this
  instance's reply IS a complete, well-formed question, and `proseMcqGuard.ts`'s
  documented policy — leave an imperfect question visible, because an imperfect
  question beats silence — is correct for it. Making the gate attach the authored
  probe instead is arbitration work, and the task's own high-risk list names
  arbitration; it is not justified by one instance with a now-disproven cause.
  **No speculative patch was applied.**
- **Fix priority:** Medium — mechanism re-opened, cause UNCONFIRMED again.
- **Fix category:** code (turn eligibility / gate attachment), NOT content — the
  content premise was measured and disproven.

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
- **2026-09-12 — NOT ACTIONABLE BY A RUNTIME FIX; visual-authoring owner.** Both
  instances are figures that are structurally valid and semantically poor: a linear
  `graph` standing in for pitch contour, and an ASCII vowel chart with an incoherent
  layout. Nothing in the visual pipeline can distinguish those from a good figure —
  the critic judges relevance and correctness, and a straight line genuinely is a
  relevant, technically correct depiction of "rising". Fixing it means authoring or
  binding better figures for these concepts, which is the visual-authoring track, and
  CLAUDE.md records that the VISUAL asset writer is itself an open gap. Left with the
  owner rather than patched.
- **Status:** NEW — OPEN.
- **Severity:** P2 — actively confusing rather than merely absent (worse than an
  honest "no visual available," better than a completely wrong figure).
- **Fix priority:** Medium.
- **Fix category:** visual authoring — **owner work**, no runtime defect identified.

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
- **2026-09-12 — RESOLVED. The quoted premise is STALE, and this was measured
  twice, independently, before saying so.** The `{"0": 2, "2": 214}` figure and the
  "216 / 216 below contract" line above are a snapshot from
  `PHASE6_P1_ENGLISH_ASSET_CONTRACT.md`; the corpus and the database have both moved
  since.
  - **Corpus** (`englishSeedAssets.ts` and siblings, counted from source): 333
    (concept, band) pairs, distribution `{"0": 2, "4": 95, "7": 119}` — 0 below
    contract.
  - **Production**, queried directly, counting exactly what the contract counts
    (ACTIVE `asset_identity` joined to `probe_assets` with >= 2 choices, i.e. genuine
    closed-choice items): **333 (concept, band) pairs, every one at 3 or 4 probes.
    Zero pairs below the contract of 3.**
  - The only two concepts with no closed-choice probes at all are
    `eng.phonics.letter-sound-correspondence` and `eng.phonics.phonemic-awareness` at
    the EARLY band — **both documented pre-reading ORAL entry nodes, which correctly
    have none.** That is the intended state, not a shortfall.
  So mastery is NOT structurally unreachable in English, and has not been for some
  time. The remedial content this entry asked for exists and is ACTIVE.
  **Consequence for other entries, stated because it invalidates a shared
  attribution:** ENG-D12 and ENG-D23 both name "the authored probe pool is
  exhausted" as their mechanism, and ENG-D10 leans on the same reasoning. That
  attribution is now disproven — spot-checked on the two concepts those entries
  actually cite, `eng.vocab.synonyms-antonyms` and
  `eng.reading.main-idea-and-details`, each of which holds several ACTIVE
  closed-choice probes at both served bands. Each of those entries needs tracing
  independently; see their own notes.
- **Status:** RESOLVED (2026-09-12) — closed on production measurement, not on a
  fix by this campaign. The source doc's snapshot is superseded.
- **Severity:** P1 (historical).
- **Fix priority:** — (done).
- **Fix category:** content — no longer outstanding.

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
- **2026-09-12 — RE-CONFIRMED AGAINST PRODUCTION, AND THE GAP HAS WIDENED, NOT
  CLOSED.** ENG-D14's snapshot turned out stale, so this entry's shared premise was
  re-measured rather than inherited. It holds, and the current numbers are worse than
  the ones quoted above:
  - `eng.phonics.print-concepts`, EARLY band: **4 ACTIVE closed-choice probes**
    (`checkpoint`, `mcq`, `misconception_probe`, `true_false` — every one with 2
    choices), plus 3 more at ADULT. The signature is no longer "mcq x1 +
    misconception_probe x1"; the corpus growth that resolved ENG-D14 added closed-
    choice items to this pre-reading node too.
  - `eng.phonics.letter-sound-correspondence`, EARLY: **1 ACTIVE `short_answer`, 0
    choices.**
  - `eng.phonics.phonemic-awareness`, EARLY: **1 ACTIVE `short_answer`, 0 choices.**
  So of the three pre-reading nodes, two are correctly oral-only and `print-concepts`
  is the sole outlier — which strengthens the original reading (a corpus/design
  disagreement) rather than weakening it.
  **Deliberately NOT changed by this campaign, and the reason is not caution for its
  own sake.** Deleting `print-concepts`'s closed-choice probes would take it to 0 and
  put it in exactly the state ENG-D14 describes as "mastery structurally
  unreachable"; the two oral siblings avoid that only because the gate is not
  expected to close on them. Which way this concept should go is a curriculum design
  decision with mastery consequences attached, and it belongs to the content owner.
  **Possibly related, noted not claimed:** ENG-D05 — the only turn-1 self-closing
  lesson in this register — is this same concept. Whether the oral/closed-choice
  mismatch reaches that behaviour is untested.
- **Status:** KNOWN, RE-CONFIRMED 2026-09-12 with worse numbers — OPEN, owner
  decision.
- **Severity:** P2.
- **Fix priority:** Medium.
- **Fix category:** content — **owner decision required**, not safely actionable by
  a runtime campaign (see above).

---

### ENG-D16 — Diagram/visual request silently ignored (no acknowledgment at all)

- **Concept/lesson:** `eng.grammar.compound-sentences` (order 67, T5, Checkpoint 6),
  `eng.literature.comparative-literature-intro` (order 186, Checkpoint 14 — **new**).
- **Evidence:**
  - `eng.grammar.compound-sentences`: learner asks *"can i see a visual"*; the reply
    is a brand-new gate MCQ (*"A question about Compound Sentences now — read it
    carefully first."*) with zero acknowledgment of the request — no apology, no
    substitute description. This contrasts with 8 other diagram requests observed in
    the same batch, all of which received at least an honest "I can't show a
    picture, but here's a description" response.
  - `eng.literature.comparative-literature-intro` (second instance): learner asks
    *"can i see a visual"*; the reply continues straight into unrelated prose (a
    hybrid fiction/poetry example) with zero acknowledgment of the request — no
    apology, no substitute, `VISUAL: none`. In the same batch, 3 other diagram
    requests spot-checked all received honest ASCII-diagram substitutes.
- **Root cause:** initially UNCONFIRMED (not investigated, read-only audit) —
  **now FOUND AND FIXED, 2026-09-12.** Not a race, as originally hypothesized. Both
  confirmed instances used the identical trigger phrase *"can i see a visual"*, which
  is the tell: `readTurnIntent('can i see a visual')` returned `learnerRequest: null`,
  so the arbitration ladder's LEARNER_REQUEST rung — which ALREADY suppresses
  `AUTHORED_PROBE` — never claimed the turn, and the gate attached a probe (or
  continued teaching) exactly as designed instead of acknowledging the request. Every
  sibling phrasing resolved ("can i see a diagram/picture/image/graph/chart"), and
  "show me a visual" only resolved via the object-less `SHOW_ME_RE`. Cause: bare
  `visual` is not in `VISUAL_MEDIUM_NOUNS`. Measured: 8 of 9 request frames for the
  bare noun failed. Fixed with request-frame-scoped alternatives — the SAME treatment
  `visually` already has — WITHOUT widening the shared `VISUAL_MEDIUM_NOUNS` list,
  which the module forbids and the visual target resolver depends on. 7 negative
  controls pinned ("i am a visual learner" must stay false). **Boundary respected:**
  `masteryGate.test.ts` pins `'visual'` and `'any visuals?'` as null; both still
  hold, so the `any <noun>` frame was deliberately not added. **Known residue,
  reported not fixed:** `MEDIUM_REQUEST_RE`'s own documentation lists "any visual
  for this?" as a case it catches, and it does not — that doc example and the test
  contradict each other, both predate this change, and resolving it is an owner
  call.
- **Status:** FIXED — 2 confirmed production instances (both the identical bare-
  `"visual"` trigger phrase), same root cause, same fix, both covered.
- **Severity:** P2 — a weak learner who explicitly asked for help gets no signal the
  request was even heard.
- **Fix priority:** Medium.
- **Fix category:** code.

---

### ENG-D17 — Hard mid-lesson failure: 504 FUNCTION_INVOCATION_TIMEOUT

- **Concept/lesson:** `eng.grammar.colons-semicolons-dashes` (order 89, T7,
  Checkpoint 6), `eng.literature.dramatic-structure` (order 178, T8, Checkpoint 12
  — **new**).
- **Evidence:**
  - `eng.grammar.colons-semicolons-dashes`: an ordinary, valid MCQ-answer submission
    returns a raw `ERROR: chat failed: 504 An error occurred with your deployment /
    FUNCTION_INVOCATION_TIMEOUT` — no graceful degraded response, the lesson simply
    ends there. The immediately preceding turn had already taken an abnormal 58.1
    seconds to respond (vs. a normal 12–25s), i.e. visible latency escalation
    immediately before the hard failure.
  - `eng.literature.dramatic-structure` (second instance): the same shape — a
    504 timeout on an ordinary "show me an example please" request, immediately
    following the topic-drift episode tracked as **ENG-D22** below (i.e. this
    lesson's transcript shows both defects back to back: drift into poetry content,
    then a hard timeout on the very next turn). Whether the two are causally linked
    is unknown (not investigated — read-only audit).
- **Root cause:** UNCONFIRMED (not investigated further — read-only audit), but the
  latency-escalation-then-hard-timeout shape is consistent with AI-provider
  capacity/latency issues already extensively documented elsewhere in this project's
  history.
- **Status:** RECURRING — 2 confirmed instances now (upgraded from NEW/1-instance).
- **Severity:** P1 — completely ends a lesson mid-progress with an unrecoverable raw
  error, worse than the graceful `[degraded]` fallback path used elsewhere.
- **2026-09-12 — CONFIRMED INFRASTRUCTURE, NOT A CODE DEFECT; no change made.** Both
  instances are a platform-level `FUNCTION_INVOCATION_TIMEOUT` — the request never
  returns, so no application code runs to degrade gracefully, and the existing
  `[degraded]` fallback (which DOES fire for provider failures, as ENG-D11's own
  evidence shows) is unreachable by construction once the invocation itself is
  killed. Raising the function timeout or lowering the in-request budget are both
  deployment-configuration decisions, and this environment cannot set Vercel
  configuration (a limitation already recorded in CLAUDE.md for the visual
  generation env vars). Owner work.
- **Fix priority:** High — OPEN, infrastructure owner.
- **Fix category:** architecture (timeout/latency budget) — no code defect
  identified; this is an infra-capacity symptom.

---

### ENG-D18 — Recurring session-create "Internal server error," MOSTLY (not exclusively) correlated with observed production DB unavailability

- **Concept/lesson:** not concept-specific — hit while attempting to open
  `eng.grammar.simple-sentences` (order 66), `eng.reading.literal-comprehension`
  (order 94, first attempt), a login attempt immediately before order 94's
  successful retry (Checkpoints 5–6), `eng.literature.literary-devices-overview`
  (order 168, Checkpoint 11), `eng.literature.prose-fiction` (order 179, Checkpoint
  12), and `eng.literature.literary-periods-survey` (order 184, Checkpoint 13 —
  **new, and see the refinement below**).
- **Evidence:**
  - 6 separate `Fatal: session create failed: {"success":false,"error":"Internal
    server error"}` events across ~175 concepts of audit traffic (roughly 1 per 29
    concepts).
  - 5 of the 6 are directly correlated with production health: `GET /api/health`
    was polled at (or immediately after) each occurrence and returned
    `{"status":"degraded","db":false,...}` (HTTP 503); on one occurrence an
    immediate retry also failed with `"login failed (302)"` (auth depends on the
    same DB). Re-polling ~1 minute later consistently showed full recovery
    (`"status":"ok","db":true"`).
  - **The 6th occurrence (order 184) did NOT correlate** — `/api/health` checked
    immediately afterward reported `{"status":"ok","db":true}`, a healthy database.
    This retry succeeded immediately without any recovery wait.
- **Root cause:** UNCONFIRMED in mechanism, but directly evidenced as a real,
  intermittent production reliability issue (not an audit-script artifact) —
  MOSTLY (5/6 instances) explained by database-availability windows of roughly
  30–90 seconds, self-recovering, observed across ~1650 turns of light,
  single-caller traffic. Consistent in shape with the connection-pool/DB-contention
  issues already extensively documented elsewhere in this project's history, though
  not independently confirmed to be the same root cause. **The 6th instance proves
  the DB-outage explanation is not exhaustive** — at least one occurrence has a
  different or additional cause that a live `/api/health` check does not surface.
- **Status:** RECURRING — now 6 confirmed instances (was reported as 3 in the first
  version of this file); the first occurrence (order 66) was initially classified
  as one-off transient noise after a single successful retry, then reclassified as
  a DB-outage-correlated pattern once more occurrences accumulated; now further
  refined to "mostly, not exclusively" DB-correlated.
- **Severity:** P1 — during these windows, no learner can log in, create a session,
  or continue a lesson at all.
- **2026-09-12 — THE INSTRUMENT IS BUILT; THE 6TH INSTANCE STILL CANNOT BE NAMED
  FROM EXISTING EVIDENCE (commit `1926839`).** The task asked for the uncorrelated
  instance to be investigated separately and for 500s not to be classified as DB
  failures without evidence. Reading the route showed WHY neither was possible:
  `/api/sessions` POST collapses every non-Zod failure into one opaque
  `"Internal server error"` with the raw error as the only record, so the response
  carries no discriminator and a `/api/health` poll after the fact is a second
  measurement of a different moment. The audit's "mostly, not exclusively, DB" was
  the honest limit of what could be known, and it still is for the six events already
  recorded — **they are historical and cannot be re-classified retroactively.**
  What changed is that the next one will name itself. `withRetry`'s own
  connection-error predicate (the codes P1001/P1002/P1008/P1017/P2024 and its message
  fragments) is lifted out UNCHANGED as `isDbConnectionError` and shared, so there is
  one definition rather than a second drifting copy; the catch now separates
  `db_unavailable` / `db_timeout` / `unknown`, writes a structured log line, and
  returns `kind` additively on the response so an audit driver can record it without
  polling. A slow database and an unreachable one were previously indistinguishable
  and are now different findings. Coarse on purpose — no message, no stack, no query.
  Retry behaviour is byte-for-byte unchanged; this is observability, not a fix for
  whatever the 6th instance was. 9 tests in
  `src/tests/sessionCreateFailureClassification.test.ts`, including negative controls
  for the failure class the 6th instance belongs to (a 500 while the database is
  demonstrably healthy).
- **Status:** RECURRING — 6 confirmed instances, 5 DB-correlated, 1 unexplained and
  now un-explainable from the existing record. OPEN.
- **Fix priority:** High — the capacity half is unchanged; the classification half
  is DONE.
- **Fix category:** architecture (database connection handling/capacity), plus the
  observability prerequisite shipped 2026-09-12 that makes the residual failure rate
  measurable at all.

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
- **2026-09-12 — ONE SUB-ITEM RELATED TO THE PROSE-OPTION FAMILY, none fixed.** The
  stray `"D) It becomes a sound"` fragment is the same class as ENG-D23 and
  `stripDanglingLeadingOption`'s truncation debris — a lettered option with no
  question attached — but it is neither shape those guards cover: it starts at "D",
  not "A", and it sits BEFORE a real `MCQ_STEM` rather than trailing the reply.
  Widening either guard to reach it would mean dropping the start-at-A anchor, which
  is the constraint keeping them off citations and enumerations, for a P3 with one
  instance. Not done. The other four items are model-output quality (truncated
  sentences, a stem that states its own answer, a dangling unused scenario) with no
  deterministic signature to key on.
- **Status:** NEW — OPEN.
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

### ENG-D21 — Visual-identity instability: the served diagram changes content within a single lesson

- **Concept/lesson:** `eng.listening.active-listening` (order 128, Checkpoint 10),
  `eng.writing.editing-for-style` (order 161, Checkpoint 11).
- **Evidence:**
  - `eng.listening.active-listening`: across 5 requests/re-displays in the same
    session, the served visual alternated between two genuinely different
    `process_flow` diagrams for the same concept — not just a title difference, the
    step content differs too. "Active Listening Steps": *"Use verbal cues to show
    attention"* / *"Reflect back key points to confirm understanding"* vs. "Active
    Listening Process": *"Use verbal acknowledgments (e.g., 'I see')"* / *"Paraphrase
    key points to confirm understanding"*. Pattern across the 5 occurrences: A, B, B,
    A, A — a toggle, not a one-time regeneration.
  - `eng.writing.editing-for-style`: the identically-titled "Editing for Style"
    figure toggles between two step-list variants — *"Read draft aloud"* / *"Highlight
    wordy passages"* vs. *"Read the draft thoroughly"* / *"Identify wordy or redundant
    passages"*.
- **Root cause:** UNCONFIRMED — not investigated (read-only audit). Both variants in
  both instances are individually reasonable, valid content for the concept, so this
  is not a correctness/misleading-content defect — but it contradicts this
  project's own documented visual-session design (hold one figure identity and
  reuse it across turns within a lesson, per the visual-engine sections of
  CLAUDE.md). A real learner would see the diagram's wording change between turns
  within the same lesson for no apparent reason.
- **Status:** NEW.
- **Severity:** P2 — a continuity/trust break, not a correctness break (both
  variants are individually accurate).
- **2026-09-12 — NARROWED BY PRODUCTION MEASUREMENT, NOT FIXED.** Two candidate
  explanations were checked directly against production and one is eliminated:
  - **Duplicate stored content — RULED OUT.** Neither concept has ANY ACTIVE
    `asset_identity` VISUAL row (`eng.listening.active-listening` has a single
    AI_AUTHORED **DRAFT** `concept_figure`; `editing-for-style` has none), so nothing
    was being picked from two approved figures.
  - **Duplicate cache rows — RULED OUT.** `visualization_cache` holds exactly ONE
    `scene:v1:fig:<conceptId>` row per concept (plus its one
    `scene:v1:verdict:` row). The cache key is per-concept and deterministic, so the
    cache cannot itself hold both variants at once.
  Therefore both variants were GENERATED, and only one survived in the cache — which
  moves the suspect from stored content to the generate/serve/cache-write path (a
  regeneration whose figure was served before or instead of the cached one). That is
  a real narrowing and it is as far as the evidence goes: the A,B,B,A,A toggle needs
  live traffic to reproduce, this environment has essentially none, and visual
  routing is one of the areas where a change on an unreproduced hypothesis is
  explicitly the wrong move. **No code change made.**
- **Fix priority:** Medium — STILL OPEN, cause narrowed but UNCONFIRMED.
- **Fix category:** code (visual-session identity/hold logic — specifically the
  generation/cache-write path, not asset selection).

---

### ENG-D22 — Topic drift into an adjacent English sub-domain (not just unrelated content)

- **Concept/lesson:** `eng.literature.dramatic-structure` (order 178, Checkpoint 12).
- **Evidence:** T0 opens correctly on drama (acts, scenes, tension/resolution —
  verified by reading the actual opening turn). By T7 the lesson has drifted
  entirely into POETRY content — rhyme scheme (ABAB), meter (iambic tetrameter vs.
  trimeter), a full example stanza table — none of which relates to dramatic
  structure. The drift is followed immediately by a hard production failure: T8
  ("show me an example please") returns a raw 504 timeout, ending the lesson (see
  **ENG-D17**'s second instance).
- **Root cause:** UNCONFIRMED — not investigated (read-only audit). This is a
  distinct episode class from the already-documented topic-drift family: **ENG-D07**
  is a misread of a specific opening phrase ("new topic for me"); **ENG-D08** drifts
  into a completely unrelated subject (Python programming); **ENG-D09** is
  self-referential text-echo. This instance drifts into a *related* English
  sub-domain (poetry, within the same Literature area as the lesson's own drama
  content) rather than an unrelated subject or the learner's own words — plausibly
  the same underlying topic/excursion-detection weakness manifesting differently
  when the adjacent domain shares vocabulary with the lesson (both drama and poetry
  are literary forms).
- **Status:** NEW — extends the topic-drift defect family with a new episode class.
- **Severity:** P1 — a real chunk of the lesson (T7 onward) teaches content entirely
  unrelated to the concept being assessed.
- **2026-09-12 — EXPLICITLY NOT CLOSED by commit `77ac685`.** ENG-D09's two mechanisms
  were fixed that day and this entry names the same detector family, so the
  non-closure is stated rather than left to inference. Neither fix reaches this
  episode: the self-echo fix narrows what counts as a named topic in a LEARNER
  REQUEST, and the transcript records no topic request at any point before the drift;
  the weak-topic-advisory fix suppresses an aside naming an already-taught weak topic,
  and the drifted content (poetry meter/rhyme) is not recorded as a prior weak topic
  for this learner. Root cause remains UNCONFIRMED. This is the family's only
  adjacent-sub-domain episode and is the strongest remaining evidence that a drift
  channel exists which none of the three 2026-09-12 fixes touches.
- **2026-09-12 (second pass) — SAME TRIGGER AS ENG-D08, SAME PROMPT FIX APPLIED
  (commit `1926839`), still OPEN.** This episode's own recorded trigger is
  "show me an example please" — a bare example request naming no topic, which is
  ENG-D08's trigger shape exactly, differing only in how far the model travelled
  (an adjacent sub-domain rather than another subject). The CONCEPT ANCHOR rule
  shipped for ENG-D08 governs it for the same reason and is pinned with this entry's
  own concept (`Dramatic Structure`) as a test case, so the rule is verified to carry
  the lesson title rather than being generic.
  The detector half is **rejected here on the same measured grounds** as ENG-D08: no
  topic was named, so nothing fires, and the general "does this content relate to the
  lesson" check that would be needed is the one `topicDrift.ts`'s header argues
  against — and this episode is the strongest case for that argument, since drama and
  poetry are adjacent enough that a vocabulary-overlap test would be close to a coin
  toss.
  **Still OPEN** for the same reason as ENG-D08: a prompt rule is a lever, not an
  invariant, and no production evidence yet shows the rate fell.
- **Fix priority:** High — STILL OPEN (prompt mitigation shipped, unverified).
- **Fix category:** prompt (SHIPPED 2026-09-12, shared with ENG-D08). The
  detector half is **rejected** on measured evidence, not unimplemented.

---

### ENG-D23 — Broken turn: bare answer choices served with no question, no MCQ tag, no acknowledgment of the prior answer

- **Concept/lesson:** `eng.reading.main-idea-and-details` (order 95, T8, Checkpoint
  7).
- **Evidence:** the entire turn body is: *"A) It is a sentence that appears exactly
  in the text \nB) It is a summary you create from the details \nC) It is a sentence
  that repeats the first sentence \nD) It is a question the author asks"* — no
  question stem, no `MCQ_STEM` tag, and no acknowledgment of the learner's previous
  (correct) answer at all. Raw, context-free, structurally ungradeable.
- **Root cause:** UNCONFIRMED, but closely related to **ENG-D12** (the model serving
  its own ungraded prose MCQ when the authored probe pool is exhausted) — this is a
  more severe variant of that same fallback path: not only untagged/ungradeable, but
  missing the question stem entirely and skipping the correctness acknowledgment a
  learner would expect after answering the previous item.
- **Status:** NEW.
- **Severity:** P1 — worse than ENG-D12: a learner sees only four unexplained
  answer choices with zero context, and their previous correct answer goes
  unacknowledged.
- **2026-09-12 — INVESTIGATED; ROOT-CAUSE ATTRIBUTION WITHDRAWN; NO SAFE CODE FIX,
  reported rather than patched.** This entry inherits ENG-D12's "probe pool
  exhausted" reading, and that is disproven: `eng.reading.main-idea-and-details`
  holds several ACTIVE closed-choice probes at both served bands in production
  (direct query, see ENG-D14).
  Traced through the existing guards, which do cover the two neighbouring shapes and
  genuinely do not cover this one: `hasProseMultipleChoice` DETECTS four line-anchored
  options and its documented policy leaves them visible;
  `stripDanglingLeadingOption` handles the opposite case (a single truncated option)
  and deliberately refuses to touch a 2-4 option run; `stripContradictingProseOptions`
  needs a pending probe, and none was pending here. So an option run with NO question
  stem falls between all three — and the "an imperfect question beats silence"
  justification does not extend to it, because a list with no question is not an
  imperfect question.
  **A strip was designed and then not shipped, for a reason that is the finding:**
  the whole turn body IS the option run, so stripping it yields an empty reply, and
  the existing post-strip backstop only rescues a turn when a probe is actually
  served — which is exactly what is missing here. A repair that fires on neither
  documented instance would be a speculative patch of the kind this campaign was told
  not to make. Recovering this turn means having the gate attach the real authored
  probe, which is arbitration work and needs more than one instance.
  The missing acknowledgment of the prior correct answer has the same origin: that
  answer was to an untagged prose MCQ, so the server never graded it, so
  `confirmCorrectAnswer` (which fires on the server grade) correctly said nothing.
  It is ENG-D12 one turn earlier, not a second defect.
- **Fix priority:** High — STILL OPEN, cause UNCONFIRMED.
- **Fix category:** code (gate attachment / turn eligibility — same owner as
  ENG-D12). NOT content: that premise was measured and disproven.

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

**Updated 2026-09-12 after the open-defect remediation pass** (commits `6c3be2b`,
`1926839`). The previous revision's counts are superseded; the entries themselves
carry their own dated evidence.

| Severity (OPEN only) | Count |
|---|---|
| P0 | 0 |
| P1 | 8 (ENG-D01, D04, D05, D08, D17, D18, D22, D23) |
| P2 | 6 (ENG-D07, D10, D12, D13, D15, D21) |
| P3 | 1 (ENG-D19) |
| **Total confirmed OPEN defects** | **15** |

Two entries left the open list this pass, for different reasons:
**ENG-D11 → FIXED and production-verified** (a real code defect, located and closed) and
**ENG-D14 → RESOLVED** (its premise was stale; production measurement shows the
shortfall no longer exists). ENG-D23 keeps its own row even though its mechanism is
now understood as ENG-D12 one turn earlier — entries are deduplicated by mechanism
only once a mechanism is CONFIRMED, and neither of these two has one.

| Closed | Count |
|---|---|
| Fixed, reproduced first, deployed | 5 (ENG-D02, D03, D09, D11, D16) — ENG-D02 and ENG-D11 additionally production-verified |
| Closed — benign (instrument defect, not a product defect) | 1 (ENG-D06) |
| Resolved on measurement (premise stale, no fix needed) | 1 (ENG-D14) |
| Resolved (pre-existing, separate campaign) | 1 (ENG-D20) |
| **Total closed** | **8** |
| **Total unique confirmed defects found (open + closed)** | **23** |
| Observations (not confirmed as defects) | 5 (OBS-01 … OBS-05) |

ENG-D04 is counted ONCE, under P1 open, though it is now mostly fixed: **all three
production control-tag opener variants (`<!--`, `<--`, `[!--`) are stripped and
pinned**, the order-113 residual closed from the raw stored message. Only the
"argued discovery step" prose-echo half remains open. See its entry.

**Mitigated but deliberately still OPEN (2026-09-12):** ENG-D08 and ENG-D22 each
received a CONCEPT ANCHOR prompt rule grounding bare example requests to the
anchored concept, and ENG-D18 received the failure classification that makes its
unexplained instance diagnosable next time. None of the three is counted as closed:
a prompt rule is a lever rather than an invariant, and observability is not a fix.

### Open defects by owning discipline

Deliberately kept separate — these need different people and different evidence,
and collapsing them has previously made this register's counts read as one
backlog when they are four.

| Discipline | Count | Entries |
|---|---|---|
| Runtime / teaching-engine code | 4 | ENG-D05, D10, D12, D23 |
| Prompt / model-output behaviour | 6 | ENG-D01, D04, D07, D08, D19, D22 |
| Infrastructure (DB, timeouts) | 2 | ENG-D17, D18 |
| Content authoring (owner decision) | 1 | ENG-D15 |
| Visual (authoring + session identity) | 2 | ENG-D13, D21 |

Movements since the previous revision, each on its entry's own evidence:
ENG-D11 closed (was runtime); ENG-D14 resolved (was content); ENG-D12 and ENG-D23
moved content → runtime once the probe-pool premise was disproven; ENG-D08 and
ENG-D22 moved runtime → prompt once their detector halves were measured and
rejected; ENG-D19 moved content/prompt → prompt; ENG-D21 stays code but is now
scoped to the visual generate/cache-write path rather than asset selection.

Three re-categorisations were made on 2026-09-12 evidence, not on judgement:
**ENG-D07** moved code → prompt (every detector was measured not to fire on its
trigger phrase, so there is no detector to narrow); **ENG-D01** moved
"code or prompt, undetermined" → prompt (the residual-tag pipeline was ruled out
by inspection — it removes markup, never characters inside prose, and no
sanitiser in `src/` strips non-ASCII — leaving generation as the remaining
hypothesis, still unproven); and **ENG-D12** moved content → code, reversing its
earlier placement. That last one matters most: ENG-D12 and ENG-D23 were both
attributed to ENG-D14's probe-pool shortfall, and that shortfall **no longer
exists** — production holds 3 or 4 ACTIVE closed-choice probes for every one of 333
English (concept, band) pairs, spot-checked on the exact concepts those two entries
cite. Neither can be explained by content any more, and neither has a confirmed
cause now.

**ENG-D08 and ENG-D22 remain under prompt**, with their code halves recorded as
REJECTED rather than pending: no topic is named in either episode, so no detector
fires, and the general topic-relevance check that would be required is the one
`topicDrift.ts`'s own header argues would strip the zero-vocabulary-overlap
analogies this tutor is measured to be good at.

**Coverage note:** this register was compiled while the audit was still roughly
halfway through the English KG (through order ~105). The audit has since run to
completion — all 216 English concepts have been driven through the real-student
simulation (orders 11–216 by this campaign, orders 1–10 by the earlier Task B
simulation, plus the pre-existing `ALREADY_TOUCHED` skip set covering concepts
already validated by the ADULT-band campaign). The entries above reflect every
defect class found through the full campaign; instance lists for multi-occurrence
entries (ENG-D02, D04, D17, D18) are representative, not necessarily exhaustive
of every single occurrence logged across all 19 batches.

**Merge note (2026-09-12):** this file was updated concurrently by two sessions —
this campaign's completion pass (adding ENG-D21/D22/D23 and extending D04/D16/D17/
D18 with new instances) and a separate fix session that closed ENG-D06 as benign
and fixed ENG-D04's tag half and ENG-D16 in full. That pass flagged a discrepancy
rather than resolving it: a summary row claimed ENG-D02, D03, D08, D09 fixed and
ENG-D07 as having no runtime mechanism, while `git show fcd2a4c` showed none of
those five entry sections touched — so it left all five OPEN and asked a future
session to verify them to the same reproduce-first standard.

**Resolved (2026-09-12, second pass) — that verification was done, per entry, and
the five did NOT all land the same way.** The flag was right to be raised and its
premise was incomplete: the work was real but lived in EARLIER commits
(`3bb4cc4` for ENG-D02/D03, `77ac685` for the topic-drift family), not in
`fcd2a4c`, which is why a diff of that one commit could not find it. Each entry now
carries its own evidence:
- **ENG-D02, ENG-D03 → FIXED** (`3bb4cc4`), root cause reproduced before the change,
  ENG-D02 additionally production-verified on a disposable QA account.
- **ENG-D09 → FIXED** (`77ac685`), both of its episode classes, which were confirmed
  to have two genuinely different root causes.
- **ENG-D07 → still OPEN**, but re-categorised: measured to have no runtime
  mechanism at all, so it is a prompt-level item, not a detector one.
- **ENG-D08 → still OPEN, explicitly NOT closed** by the ENG-D09 fixes. Its trigger
  is a bare "give me an example" with no topic named, which neither fix reaches.
  Marking it fixed because a sibling in its family was would have been exactly the
  error this register warns against, and the same reasoning is recorded on ENG-D22.
