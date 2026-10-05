# Biology Real-Learner Defects

<!-- SUMMARY:START -->
## Summary (generated from the entries below; counts verified automatically)

- Total lessons in Biology curriculum (`/api/curriculum?subject=biology`): 199
- Total lessons studied (full lesson session driven, ≥3 turns): 108
- Total lessons covered (≥1 account): 108  (54.3 %)
- Total defects: 34
- P0: 0
- P1: 3
- P2: 21
- P3: 10
- Open: 34
- Fixed: 0
<!-- SUMMARY:END -->

## Scope

The complete Biology curriculum of the deployed app (`my-tutor-flame.vercel.app`), following the app's own lesson order
(`GET /api/curriculum?subject=biology`, 199 lessons), studied as a weak learner by ten owner-supplied test accounts working
**in parallel**. This is a **discovery log**: no application code, prompt, KG, EB, Blueprint, GB+, curriculum, grading,
mastery, schema or configuration was changed to produce it. Fixes are out of scope until requested.

Relation to other QA: `docs/architecture/BIOLOGY_READINESS_AUDIT.md` (asset/readiness audit, 2026-09-20) and
`docs/qa/CHEMISTRY_REAL_LEARNER_DEFECTS.md` (same method, `CHEM-*`, whose mechanisms are called "CHEM-NNN equivalent" below).
This file is the canonical Biology real-learner log and uses `BIO-NNN` IDs. No other Biology real-learner log existed.

## Learners and distribution

Ten test accounts (`test1`–`test10`, identified only as **Account 1–10**; credentials are never recorded). All ten were
already onboarded; each was enrolled in Biology through the app's own `POST /api/subjects/enroll`. The 199 lessons were split
into ten contiguous blocks, all accounts running **simultaneously**:

| Account | Lesson orders |
|---|---|
| 1 | 1–20 |
| 2 | 21–40 |
| 3 | 41–60 |
| 4 | 61–80 |
| 5 | 81–100 |
| 6 | 101–120 |
| 7 | 121–140 |
| 8 | 141–160 |
| 9 | 161–180 |
| 10 | 181–199 |

Persona: lower-than-intermediate English, basic Biology, short messages, sometimes right, sometimes wrong (~28 % of card answers
deliberately wrong), sometimes confused; uses "explain simpler", "give me example", "give me example with numbers",
"i dont understand", "i dont understand this picture", "what is this?", "why?", "show me step by step", "too many words",
"next question please", "quiz me", "explain again", "ok", "continue". Never told Tutor Max it was QA.

## Method and limits (read before trusting any count)

- Driven through the app's own HTTP API (`/api/sessions`, `/api/learn/lesson-init`, `/api/learn/chat`) as the logged-in learner,
  one new session per lesson, with a scripted persona (card answers chosen with the repo's Biology answer picker and a planned
  error rate; free-text answers quoted from taught content or "i dont know"). Entries are only things actually seen in a
  transcript or a served figure payload.
- Because answers are scripted, some tutor praise or drift after a scripted free-text answer is a persona artefact; entries say so.
- Systemic mechanisms (empathy openers, analogy loops, repeated cards, 2-option cards, pauses, degraded replies, raw dumps,
  pipe tables, picture requests with no figure) are **linked automatically** from all transcripts by pattern; their occurrence
  lists are computed, not hand-picked. One-off content errors were found by reading each transcript.
- Lessons were driven to natural completion, a "pause/needs-review" close, or a 30-turn cap.
- Terms: **studied** = a full lesson session driven; **observed** = seen in a transcript; **reproduced** = seen more than once;
  **systemic** = a mechanism across many lessons; **blocked** = could not proceed; **uncertain** = not established; **not tested**.
- Each lesson was driven once on one account. Deterministic content errors are assumed to repeat but a second-account
  reproduction was **not tested**.
- Load note: ten accounts ran at once; degraded replies (BIO-008) appeared from the start.

## Severity key

P0 = learning completely blocked · P1 = seriously damages learning/trust · P2 = noticeable but non-blocking · P3 = minor/polish.

Categories: Teaching · Adaptation · Lesson flow · Biology correctness · Numerical/factual · Visuals · Questions · UX ·
Mastery/progress · Concurrency/session isolation.

## Defects

### BIO-001 — "why?" is answered with an explanation of the tutor's own behaviour ("I wanted to first acknowledge how you're feeling…")

- Severity: P3
- Category: Teaching
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 3
- Biology concept: `bio.mol.noncoding-rna`
- Lesson/order: #41
- Learner message: why?
- Tutor response: "I understand you’re wondering why I haven’t given an example yet—because I wanted to first acknowledge how you’re feeling and make sure the basic idea is clear before adding more details. Okay — let’s come at it differently…"
- Expected behaviour: A reason in biology for the point being taught (why miRNAs reduce protein output).
- Actual behaviour: The reply explains the tutor's ordering of its answers, and misreads "why?" as a complaint about a missing example.
- Why it is a defect: Confusing and off-topic for a weak-English learner asking for a reason.
- Reproducibility: Observed once (#41 t4).
- Also observed (7 occurrences in 6 lessons): #61 (A4) t14; #121 (A7) t7; #142 (A8) t3; #41 (A3) t4; #42 (A3) t3; #128 (A7) t2
- Notes on occurrences: #61 t14: "why?" -> "I mentioned that we’d already covered the idea of homologous structures earlier, so I didn’t repeat the same explanation verbatim." · #121 t7: "why?" -> "Because the system is set up to avoid repeating the same explanation, we need to give you a fresh, simpler way to look at the idea." · #142 t3: "give me example" -> "I hear you’re wondering why I’m not just repeating the earlier explanation"
- Related defect: —
- Status: OPEN

### BIO-002 — Lessons end with "Let's pause … worth another look later" on a plain help request, with mastery incomplete

- Severity: P1
- Category: Mastery/progress
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 3
- Biology concept: `bio.mol.noncoding-rna`
- Lesson/order: #41
- Learner message: explain again
- Tutor response: "Let's pause Non-coding RNA Biology here for now. Worth another look later… Press \"Start next lesson\"" (after 3 correct card answers and 1 wrong; closing reply "ok" -> "on pause — you haven't mastered it yet").
- Expected behaviour: Re-explain; a request for help should never end the lesson.
- Actual behaviour: The lesson closes as needs-review on the request.
- Why it is a defect: The learner is ejected when asking for help; same mechanism as CHEM-016 in Chemistry.
- Reproducibility: Seen in the first 8 Biology lessons; counted at the end of the run.
- Also observed (87 occurrences in 83 lessons): #61 (A4) tt18/t18; #141 (A8) tt19/t19; #161 (A9) tt17/t17; #21 (A2) tt20/t20; #63 (A3) tt26; #3 (A1) t16; #4 (A1) t23; #5 (A1) t20; #7 (A1) t16; #8 (A1) t21; #9 (A1) t13; #10 (A1) t21; #12 (A1) t16; #182 (A10) t26; #185 (A10) t21; #186 (A10) t19; #187 (A10) t24; #188 (A10) t22; #190 (A10) t20; #191 (A10) t19; #23 (A2) t15; #24 (A2) t19; #25 (A2) t23; #26 (A2) t21; #27 (A2) t18; #28 (A2) t22; #29 (A2) t14; #30 (A2) t24; #41 (A3) t19; #42 (A3) t23; #43 (A3) t22; #44 (A3) t22; #45 (A3) t26; #47 (A3) t24; #48 (A3) t19; #49 (A3) t23; #62 (A4) t20; #63 (A4) t25; #64 (A4) t21; #65 (A4) t23; #66 (A4) t16; #67 (A4) t16; #70 (A4) t12; #82 (A5) t17; #83 (A5) t20; #84 (A5) t25; #85 (A5) t23; #86 (A5) t26; #87 (A5) t19; #88 (A5) t18; #89 (A5) t18; #90 (A5) t19; #102 (A6) t27; #103 (A6) t23; #104 (A6) t21; #105 (A6) t23; #106 (A6) t14; #107 (A6) t20; #108 (A6) t24; #109 (A6) t24; #110 (A6) t26; #124 (A7) t20; #125 (A7) t22; #126 (A7) t20; #127 (A7) t22; #128 (A7) t21; #129 (A7) t24; #130 (A7) t17; #131 (A7) t20; #143 (A8) t21; #145 (A8) t17; #147 (A8) t22; #148 (A8) t12; #149 (A8) t18; #150 (A8) t23; #162 (A9) t21; #163 (A9) t21; #165 (A9) t22; #166 (A9) t22; #167 (A9) t19; #168 (A9) t16; #169 (A9) t18; #170 (A9) t19
- Notes on occurrences: #61 tt18: Paused on "explain again" (mastery CHECK, not verified) · #141 tt19: Paused on "continue" · #161 tt17: Paused on "explain simpler" · #21 tt20: Paused on "i dont understand this picture" · #63 tt26: Paused on "quiz me" after 25 turns
- Related defect: —
- Status: OPEN

### BIO-003 — Canned empathy openers unrelated to the message ("I hear you’re feeling stuck, so let’s…")

- Severity: P3
- Category: Adaptation
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 1
- Biology concept: `bio.found.what-is-biology`
- Lesson/order: #1
- Learner message: i dont understand
- Tutor response: "I hear you’re feeling stuck, so let’s look at the picture again, a little more slowly."
- Expected behaviour: Answer the request directly.
- Actual behaviour: The same empathy opener is attached to most "i dont understand / explain again / why?" replies.
- Why it is a defect: Repetitive filler; no adaptation.
- Reproducibility: Seen in every lesson read so far.
- Also observed (270 occurrences in 99 lessons): #101 (A6) tt5,t12/t5/t12/t14; #141 (A8) tt2,t5,t12,t18/t5/t12/t18; #121 (A7) tt9,t11/t9/t11; #21 (A2) tt12,t16,t17/t12/t16/t17; #1 (A1) t2/t7/t10; #2 (A1) t2/t6/t15/t18; #3 (A1) t11/t15; #4 (A1) t8/t12; #5 (A1) t3/t14; #6 (A1) t5; #7 (A1) t5/t9/t13; #8 (A1) t3/t9; #10 (A1) t9/t10/t17/t18; #12 (A1) t4; #182 (A10) t5/t7/t18/t19/t25; #183 (A10) t6/t7; #185 (A10) t7/t14/t20; #186 (A10) t2/t8/t11/t14/t16; #187 (A10) t7/t9/t22; #188 (A10) t4/t5/t8/t10/t15; #189 (A10) t3/t6/t9/t22; #190 (A10) t12/t15; #191 (A10) t18; #22 (A2) t3; #23 (A2) t13; #24 (A2) t18; #25 (A2) t2/t3/t14; #26 (A2) t4/t7/t10/t11/t18; #27 (A2) t2/t5/t15; #28 (A2) t9/t21; #29 (A2) t12; #30 (A2) t3/t4/t10/t13/t17/t23; #31 (A2) t2/t8/t15/t17/t22; #41 (A3) t17; #42 (A3) t3/t6/t16; #43 (A3) t2/t3/t9/t20; #44 (A3) t3/t4/t11/t19/t20; #45 (A3) t19/t25; #46 (A3) t4/t12/t13; #47 (A3) t4/t18; #48 (A3) t2/t5/t18; #49 (A3) t5/t18/t20; #50 (A3) t9; #61 (A4) t14; #62 (A4) t16; #63 (A4) t3/t7/t15/t17/t19; #64 (A4) t10/t11/t12; #65 (A4) t18/t19; #66 (A4) t13/t14; #67 (A4) t7; #69 (A4) t3/t4/t7; #71 (A4) t8; #72 (A4) t4/t6/t11/t22; #81 (A5) t10; #82 (A5) t12; #84 (A5) t10/t12/t16; #85 (A5) t6/t7/t9/t17; #86 (A5) t2/t4/t8/t12/t22; #87 (A5) t7/t11; #88 (A5) t2/t3/t8/t9; #89 (A5) t2/t6; #90 (A5) t2/t4/t12; #102 (A6) t18/t26; #103 (A6) t9/t12/t18; #104 (A6) t6/t13/t17/t18; #105 (A6) t15/t19/t22; #106 (A6) t11; #107 (A6) t6/t7/t15/t18; #108 (A6) t3/t10/t21; #109 (A6) t3/t4/t9/t14/t18/t23; #110 (A6) t3/t7/t19/t25; #123 (A7) t3; #124 (A7) t15; #125 (A7) t7/t8/t14/t21; #126 (A7) t6/t13/t16/t18; #127 (A7) t4/t5/t16/t18; #128 (A7) t2/t6/t19/t20; #129 (A7) t12/t19; #130 (A7) t15/t16; #131 (A7) t5/t16/t18; #142 (A8) t2/t3/t6; #143 (A8) t7/t18; #144 (A8) t5/t7; #145 (A8) t3; #146 (A8) t6; #147 (A8) t4/t6/t8/t19; #149 (A8) t12; #150 (A8) t6/t7/t9/t10/t17; #151 (A8) t11; #161 (A9) t14; #162 (A9) t12/t13; #163 (A9) t4/t20; #164 (A9) t4/t14/t17; #165 (A9) t11/t21; #166 (A9) t2/t5/t9/t11; #167 (A9) t2/t4/t9/t18; #168 (A9) t15; #169 (A9) t7/t8; #170 (A9) t3/t18
- Notes on occurrences: #101 tt5,t12: "I hear you…" · #141 tt2,t5,t12,t18: "I hear you…" / "I’m sorry you’re feeling stuck"; 🌱 emoji · #121 tt9,t11: "I hear you…" · #21 tt12,t16,t17: "I hear you…"
- Related defect: —
- Status: OPEN

### BIO-004 — The same analogy is reused for "explain simpler/again" (pizza, kitchen, post-it, library…)

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 1
- Biology concept: `bio.found.what-is-biology`
- Lesson/order: #1
- Learner message: explain again / explain simpler
- Tutor response: #1 t7 "central hub of a kitchen", t9 "big, round pizza"; #41 t9 "post-it note… chef", t16 "office building / sticky note", t17 "library shelf".
- Expected behaviour: A different, simpler explanation each time; not a new analogy that reuses the same structure.
- Actual behaviour: Analogy loops with near-identical structure.
- Why it is a defect: A learner who did not understand receives the same idea repeated.
- Reproducibility: Seen in every lesson read so far.
- Also observed (17 occurrences in 17 lessons): #61 (A4) t16; #101 (A6) tt3,t6,t12,t14; #141 (A8) tt1,t2,t5,t11,t12,t13,t15; #161 (A9) tt6,t12; #121 (A7) tt6,t9,t18; #81 (A5) tt2,t5,t9,t10; #21 (A2) tt4,t17,t18; #188 (A10) t-; #190 (A10) t-; #25 (A2) t-; #42 (A3) t-; #44 (A3) t-; #65 (A4) t-; #108 (A6) t-; #109 (A6) t-; #110 (A6) t-; #167 (A9) t-
- Notes on occurrences: #61 t16: family photo album analogy · #101 tt3,t6,t12,t14: delivery driver / truck / two courses / deck of cards analogies · #141 tt1,t2,t5,t11,t12,t13,t15: mailbox / billboard / restaurant / castle walls / front desk analogies · #161 tt6,t12: grocery list / highway analogies · #121 tt6,t9,t18: kitchen sink / bathtub-soap analogies · #81 tt2,t5,t9,t10: snowball / microphone-speaker / thermostat / rubber band analogies · #21 tt4,t17,t18: dough loaves / deck of cards / bread loaf analogies
- Related defect: —
- Status: OPEN

### BIO-005 — "next question please" / "ok" gets a content-free reply or a different topic instead of a question

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 1
- Biology concept: `bio.found.what-is-biology`
- Lesson/order: #1
- Learner message: next question please
- Tutor response: #1 t10: "I hear you’re ready to move forward. When you feel set, just let me know and I’ll present the next question for you." #41 t18: a transcription "master cookbook" explanation in a non-coding RNA lesson.
- Expected behaviour: The next question card.
- Actual behaviour: A promise of a question, or an unrelated topic.
- Why it is a defect: The learner asked for the next step and got none.
- Reproducibility: Seen in #1 and #41.
- Also observed (69 occurrences in 66 lessons): #101 (A6) t13; #141 (A8) t9; #21 (A2) t13; #4 (A1) t13; #5 (A1) t5; #6 (A1) t11; #7 (A1) t7; #8 (A1) t6; #9 (A1) t6; #11 (A1) t7; #12 (A1) t3; #182 (A10) t13; #183 (A10) t12; #186 (A10) t4; #187 (A10) t12; #188 (A10) t18; #189 (A10) t5; #190 (A10) t16; #191 (A10) t9; #22 (A2) t6; #24 (A2) t10; #25 (A2) t6; #28 (A2) t13; #31 (A2) t9; #41 (A3) t8; #42 (A3) t9; #45 (A3) t10; #46 (A3) t8; #50 (A3) t10; #62 (A4) t19; #63 (A4) t12; #64 (A4) t14; #67 (A4) t10; #69 (A4) t11; #71 (A4) t11; #72 (A4) t18; #83 (A5) t11; #84 (A5) t17; #86 (A5) t5; #87 (A5) t8; #88 (A5) t11; #90 (A5) t10; #103 (A6) t13; #104 (A6) t20; #106 (A6) t5; #108 (A6) t19; #110 (A6) t4; #122 (A7) t8; #123 (A7) t15; #124 (A7) t3; #125 (A7) t12; #126 (A7) t10; #128 (A7) t7; #129 (A7) t15; #130 (A7) t4; #131 (A7) t12; #144 (A8) t9; #146 (A8) t9; #147 (A8) t14; #150 (A8) t18; #151 (A8) t9; #163 (A9) t19; #164 (A9) t6; #167 (A9) t14; #169 (A9) t12; #170 (A9) t7
- Notes on occurrences: #101 t13: raw authored paragraph on "ok" (flower structure…) · #141 t9: raw MHC paragraph on "next question please" · #21 t13: raw authored paragraph on "quiz me"
- Related defect: —
- Status: OPEN

### BIO-006 — Raw authored explanation dumped as the reply ("memory" provider) on "ok"

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 3
- Biology concept: `bio.mol.noncoding-rna`
- Lesson/order: #41
- Learner message: ok
- Tutor response: "Non-coding RNAs (ncRNAs) are transcribed from DNA but not translated into protein — yet they perform critical regulatory and structural functions. Key classes: rRNA…" (provider memory, long paragraph).
- Expected behaviour: A short, level-appropriate step.
- Actual behaviour: A dense multi-class paragraph.
- Why it is a defect: Wall of text for a weak-English learner (CHEM-003 equivalent).
- Reproducibility: Seen in #41 t8; count at end.
- Also observed (15 occurrences in 13 lessons): #61 (A4) t17; #161 (A9) tt16; #121 (A7) t12; #1 (A1) t10; #183 (A10) t8; #185 (A10) t16; #24 (A2) t7; #43 (A3) t12; #49 (A3) t2; #62 (A4) t17; #123 (A7) t5; #149 (A8) t17; #169 (A9) t17
- Notes on occurrences: #61 t17: "ok" -> "let’s see if you can pick out one" with no card · #161 tt16: "next question please" -> a recap of the learner’s own typed line · #121 t12: "next question please" -> "I’ll have the next question ready… Just let me know when you’d like to move on"
- Related defect: —
- Status: OPEN

### BIO-007 — Claim cards with options "Wrong" / "Correct"

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 1
- Biology concept: `bio.found.what-is-biology`
- Lesson/order: #1
- Learner message: quiz me
- Tutor response: Card options ["Wrong","Correct"] / ["Correct","Wrong"] on a "student says biology is only memorising names" claim; the learner answering "Wrong" is told "That's right. You chose the correct option…".
- Expected behaviour: Plain options ("Yes, true" / "No, false").
- Actual behaviour: "Wrong"/"Correct" are ambiguous labels for a weak-English reader.
- Why it is a defect: Same ambiguity recorded as CHEM-140 in Chemistry.
- Reproducibility: Seen in #1 (twice).
- Also observed (45 occurrences in 27 lessons): #81 (A5) tt7,t12/t7/t12; #1 (A1) t11/t16; #9 (A1) t4/t8; #183 (A10) t13/t15; #186 (A10) t5/t17; #190 (A10) t17; #191 (A10) t4/t12; #25 (A2) t10/t20; #26 (A2) t7; #27 (A2) t9/t11; #28 (A2) t3/t17; #29 (A2) t8; #30 (A2) t15/t20; #45 (A3) t4/t20; #46 (A3) t8; #47 (A3) t16/t21; #48 (A3) t10/t15; #82 (A5) t8/t15; #84 (A5) t18; #85 (A5) t11; #86 (A5) t15; #105 (A6) t13/t17; #106 (A6) t6/t8; #122 (A7) t4/t10; #143 (A8) t9; #144 (A8) t21; #164 (A9) t19
- Notes on occurrences: #81 tt7,t12: options "Not necessarily / Correct"
- Related defect: —
- Status: OPEN

### BIO-008 — Degraded fallback replies ("Sorry — my answer didn't come through just now…") under ten concurrent learners

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 1
- Biology concept: `bio.found.what-is-biology`
- Lesson/order: #1
- Learner message: explain simpler
- Tutor response: "Sorry — my answer didn't come through just now. Please send your message again in a moment; your progress is saved."
- Expected behaviour: A teaching reply.
- Actual behaviour: Fallback text instead of an answer.
- Why it is a defect: Load-related loss of answers; cause uncertain.
- Reproducibility: Count at end.
- Also observed (172 occurrences in 71 lessons): #23 (A2) tt2,t6/t2/t6/t12/t14; #84 (A5) t1/t11/t12/t18/t21/t22/t24; #186 (A10) t15/t16; #144 (A8) t19/t3/t8/t20; #27 (A2) t1; #105 (A6) t4/t7; #127 (A7) t1/t21; #147 (A8) t13/t20; #126 (A7) t12; #188 (A10) t6/t17; #1 (A1) t13; #2 (A1) t17; #4 (A1) t4/t16/t17/t18/t19/t20; #5 (A1) t19; #9 (A1) t12; #10 (A1) t8; #11 (A1) t4; #183 (A10) t3; #185 (A10) t3/t6/t18; #187 (A10) t4/t21/t23; #189 (A10) t7/t11/t14/t16/t21/t27; #190 (A10) t4/t10/t11; #191 (A10) t3/t8; #24 (A2) t6/t7; #25 (A2) t18; #29 (A2) t6; #30 (A2) t1; #42 (A3) t22; #43 (A3) t12/t21; #44 (A3) t6/t21/t22; #45 (A3) t6/t9/t13/t24; #47 (A3) t10/t13; #49 (A3) t8; #50 (A3) t13; #62 (A4) t17/t18; #63 (A4) t16/t18/t24/t25; #64 (A4) t2/t6; #65 (A4) t3/t22; #67 (A4) t1; #71 (A4) t5; #72 (A4) t1; #83 (A5) t18; #85 (A5) t2/t4/t16/t18/t19; #86 (A5) t3/t13/t25; #87 (A5) t10/t11; #88 (A5) t4/t6/t7; #102 (A6) t14/t19/t24; #103 (A6) t5/t7/t20; #104 (A6) t1/t7; #108 (A6) t22; #109 (A6) t5/t7/t20; #110 (A6) t8/t13; #122 (A7) t7; #123 (A7) t2/t5/t10; #124 (A7) t2/t3/t10/t14; #125 (A7) t4/t10; #128 (A7) t10/t14; #129 (A7) t1/t2/t7/t23/t24; #143 (A8) t3/t15/t16; #145 (A8) t13; #146 (A8) t2; #148 (A8) t6/t11; #149 (A8) t14/t16; #162 (A9) t19/t20; #163 (A9) t3/t16; #164 (A9) t9; #165 (A9) t3/t4/t6/t16; #166 (A9) t21/t22; #168 (A9) t2/t4/t14; #169 (A9) t3; #170 (A9) t13
- Notes on occurrences: #23 tt2,t6: degraded replies on "show me step by step" and "give me example with numbers" · #84 t1: lesson opens with a degraded fallback reply · #186 t15: degraded reply on "show me step by step" with a stray figure line · #144 t19: degraded reply on "give me example with numbers" · #27 t1: lesson opens with a degraded fallback · #105 t4: degraded reply on "give me example with numbers" · #127 t1: lesson opens with a degraded fallback · #147 t13: degraded reply on "give me example"
- Related defect: —
- Status: OPEN

### BIO-009 — Cytochrome c example: protein length and difference counts are inconsistent between replies and wrong (100 vs 154 residues; human–mouse 5; human–yeast 30 vs 45)

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 4
- Biology concept: `bio.evo.evidence-for-evolution`
- Lesson/order: #61
- Learner message: give me example with numbers / show me step by step
- Tutor response: t13: "Cytochrome c has 100 amino-acid positions… Human↔Mouse 5 differences, Human↔Yeast 30 differences → 95 % / 70 % similarity". t15: "Human cytochrome c has 154 amino acids… 5 differences out of 154 (3 %)… yeast 45 differences (≈29 %)". (45/154 is 29 %.)
- Expected behaviour: Human cytochrome c is 104 residues; human vs yeast differs at roughly 40+ positions, human vs mouse at about 10 (or state clearly that numbers are illustrative and keep them consistent).
- Actual behaviour: Two different protein lengths (100 and 154) and two yeast counts (30, 45) within one lesson, presented as real data.
- Why it is a defect: Invented numbers presented as "real" and inconsistent across replies.
- Reproducibility: Observed once (#61 t13 vs t15).
- Related defect: —
- Status: OPEN

### BIO-010 — Raw curriculum goal returned as the tutor reply ("Fossil record, comparative anatomy — homologous and analogous structures, embryology, biogeography…")

- Severity: P2
- Category: UX
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 4
- Biology concept: `bio.evo.evidence-for-evolution`
- Lesson/order: #61
- Learner message: i dont know
- Tutor response: "Fossil record, comparative anatomy — homologous and analogous structures, embryology, biogeography and molecular evidence supporting common descent."
- Expected behaviour: A small step or a question.
- Actual behaviour: The lesson-goal string from the curriculum is shown as the whole reply.
- Why it is a defect: Raw metadata, no teaching (same as CHEM-064).
- Reproducibility: Observed once (#61 t6); count at end.
- Also observed (12 occurrences in 11 lessons): #141 (A8) t8; #22 (A2) t4; #2 (A2) tt4; #2 (A1) t4; #3 (A1) t13; #61 (A4) t6; #84 (A5) t4; #89 (A5) t7; #102 (A6) t6; #109 (A6) t2; #168 (A9) t12
- Notes on occurrences: #141 t8: "quiz me" -> "MHC and Antigen Presentation covers: MHC class I (all nucleated cells…)…" · #22 t4: raw lesson-goal string as the reply to a card answer (#22 t4) · #2 tt4: card answer "Cellular organisation" -> reply is the raw lesson goal "Growth, reproduction, metabolism, … evolution as the defining properties…"
- Related defect: —
- Status: OPEN

### BIO-011 — "i dont know" answered with a promise of a step that never appears ("Let’s make it easier with a quick choice.")

- Severity: P2
- Category: Adaptation
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 6
- Biology concept: `bio.repro.sexual-reproduction-plants`
- Lesson/order: #101
- Learner message: i dont know
- Tutor response: "I hear you—it’s okay to feel stuck. Let’s make it easier with a quick choice." (no choice, no card)
- Expected behaviour: The simpler step or the card itself.
- Actual behaviour: Empty lead-in.
- Why it is a defect: The learner who is stuck gets no help.
- Reproducibility: Observed once (#101 t5); count at end.
- Also observed (9 occurrences in 9 lessons): #81 (A5) t1; #21 (A2) t9; #62 (A3) t1; #82 (A5) tt1,t10; #83 (A5) t1; #103 (A6) t1; #143 (A8) t1; #145 (A8) t1; #164 (A9) t1
- Notes on occurrences: #81 t1: "ok" -> only "What do you notice about…?" (first reply is a question) · #21 t9: "explain simpler" -> "How did you figure that each daughter cell would end up with 23 chromosomes?" (re-asks an old wrong answer) · #62 t1: "ok" -> only "What do you notice about that arrow?" · #82 tt1,t10: "ok" -> "What do you notice about this piece of information…?"; "show me step by step" -> "Sure, let’s walk through the figure together, focusing on one part at a time." and nothing else · #83 t1: "ok" -> only "What do you notice about this vasodilation response in the diagram?" · #103 t1: "ok" -> only "What do you notice about this arrow?" · #143 t1: "ok" -> only "What do you notice about how this label and its line are presented?" · #145 t1: "ok" -> only "What do you notice about this orange heading?"
- Related defect: —
- Status: OPEN

### BIO-012 — "why?" answered about a card that has not been shown ("The rejection occurs because the recipient’s T cells recognize the donor’s MHC…") — reply addresses a question the learner never saw

- Severity: P1
- Category: Lesson flow
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 8
- Biology concept: `bio.immuno.mhc-antigen-presentation`
- Lesson/order: #141
- Learner message: why?
- Tutor response: "The rejection occurs because the recipient’s T cells recognize the donor’s MHC molecules as “non‑self”… not simply because the body over‑reacts in a gen[eral way]" (turn 4; no transplant question had been asked; the first transplant card appears at t13).
- Expected behaviour: A reason for the point being taught (why MHC class I presents internal peptides).
- Actual behaviour: A verdict-style explanation for a different question; looks like a reply to a card from elsewhere.
- Why it is a defect: Same mechanism as CHEM-035: the reply is written for a card the learner did not get.
- Reproducibility: Observed once (#141 t4); count at end.
- Also observed (2 occurrences in 2 lessons): #86 (A5) t19; #49 (A3) tex
- Notes on occurrences: #86 t19: "show me step by step" -> "That’s right—when a muscle needs more force, it brings in progressively larger motor units. Please select the correct statement about…" (verdict on a prior card and a new card instead of steps) · #49 tex: "give me example" answered with "That’s correct — the ratio you identified is indeed 3 tall : 1 short" (verdict on an earlier answer)
- Related defect: —
- Status: OPEN

### BIO-013 — "what is this?" answered with a counter-question instead of a description ("Do you mean the FBA box or the Kinetic models box?")

- Severity: P3
- Category: Adaptation
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 9
- Biology concept: `bio.sys.metabolic-network-modelling`
- Lesson/order: #161
- Learner message: what is this?
- Tutor response: "Do you mean the Flux Balance Analysis (FBA) box at the top left, or the Kinetic models box at the top right?"
- Expected behaviour: Describe the figure on screen.
- Actual behaviour: The weak learner is asked to disambiguate.
- Why it is a defect: A learner who asks "what is this?" cannot be expected to name a box.
- Reproducibility: Observed once (#161 t2).
- Related defect: —
- Status: OPEN

### BIO-014 — Card option text is cut mid-phrase and ends in a stray backslash ("Risk‑prone: prefers the higher‑variance \")

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 10
- Biology concept: `bio.behav.foraging-behavior`
- Lesson/order: #181
- Learner message: Risk‑prone: prefers the higher‑variance \
- Tutor response: Card options: "Secure energy state / Risk‑averse: prefers a predictable, lower‑variance food / Desperate energy state / Risk‑prone: prefers the higher‑variance \"".
- Expected behaviour: Complete label text.
- Actual behaviour: Figure-label option is truncated and carries an escape character.
- Why it is a defect: Looks broken to the learner (same family as CHEM-082).
- Reproducibility: Observed once (#181 t2).
- Related defect: —
- Status: OPEN

### BIO-015 — Feedback refers to the learner in the third person ("The learner correctly recognized…", "The student’s claim is inaccurate")

- Severity: P3
- Category: UX
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 10
- Biology concept: `bio.behav.foraging-behavior`
- Lesson/order: #181
- Learner message: No
- Tutor response: #181 t4: "That's right. The learner correctly recognized that risk preference is not a fixed trait…"; #1 t17: "The student’s claim is inaccurate…".
- Expected behaviour: Second person.
- Actual behaviour: Written as if about someone else.
- Why it is a defect: Distancing wording (CHEM-144 equivalent).
- Reproducibility: Seen in #1 and #181.
- Also observed (4 occurrences in 4 lessons): #102 (A6) t8; #2 (A2) t3; #3 (A3) t3; #143 (A8) tt8
- Notes on occurrences: #102 t8: "Follicular phase" for "which term appears in the menstrual cycle diagram?" -> a garden analogy, no verdict · #2 t3: card answer gets a raw goal string instead of a verdict · #3 t3: answer "Domain" -> "Now, looking at the hierarchy again: Quick check." with no verdict · #143 tt8: answer "Tumour necrosis factor (TNF)" -> "This question checks your understanding of…" no verdict
- Related defect: —
- Status: OPEN

### BIO-016 — Wrong card answer gets no verdict; the reply describes the picked option as if it were the answer

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 10
- Biology concept: `bio.behav.foraging-behavior`
- Lesson/order: #181
- Learner message: Risk‑prone: prefers the higher‑variance \ (picked for "which describes a desperate energy state?")
- Tutor response: "The “Risk‑prone: prefers the higher‑variance gamble” label in the top‑right corner shows an animal in a desperate energy state… Now we’ll see how the marginal value theorem…"
- Expected behaviour: An explicit right/wrong verdict.
- Actual behaviour: A neutral description and a move to the next topic.
- Why it is a defect: The learner cannot tell if they were right (CHEM-028 equivalent).
- Reproducibility: Seen in #181 t3 and #161 t3.
- Also observed (17 occurrences in 16 lessons): #1 (A1) t17; #9 (A1) t9; #10 (A1) t5; #12 (A1) t13; #181 (A10) t4; #45 (A3) t5/t21; #62 (A4) t14; #69 (A4) t13; #105 (A6) t17; #108 (A6) t16; #121 (A7) t20; #122 (A7) t5; #142 (A8) t14; #144 (A8) t22; #151 (A8) t15; #170 (A9) t11
- Related defect: —
- Status: OPEN

### BIO-017 — "Advanced Biogeochemical Cycling" is taught from an untitled food-chain figure (producers → herbivores → carnivores); the sulfur/nitrogen cycle is forced onto it

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 7
- Biology concept: `bio.eco.biogeochemistry-advanced`
- Lesson/order: #121
- Learner message: ok / i dont understand this picture
- Tutor response: t1: "In the food‑chain picture on your screen, this is the first step: the producer (the plant) now contains sulfur…". t17: "The first part of the line is labeled “producers.”…" The only figure returned has no title (label "figure").
- Expected behaviour: A cycle diagram (sulfur/nitrogen/phosphorus reservoirs and fluxes).
- Actual behaviour: A generic food-chain picture serves as the lesson figure; replies about the cycle are anchored to it.
- Why it is a defect: Figure does not show the concept being taught; the learner's "picture" questions get answers about producers/herbivores.
- Reproducibility: Observed once (#121 t1, t8–t11, t17).
- Also observed (4 occurrences in 4 lessons): #123 (A7) tt1,t6; #124 (A7) tt1,t14; #125 (A7) tt1,t3,t9,t11; #126 (A7) tt1,t8,t14
- Notes on occurrences: #123 tt1,t6: untitled food-chain figure for Landscape and Conservation Ecology; t6 "picture the food‑chain line you see on the screen" · #124 tt1,t14: untitled food-chain figure for Microbial Ecology; t14 "keeping the food‑chain picture in mind (the line of boxes… from producer to consumer)" · #125 tt1,t3,t9,t11: untitled food-chain figure for Quantitative Models of Population Growth; replies say "the food‑chain picture you see" · #126 tt1,t8,t14: untitled food-chain figure for Predator-Prey Dynamics ("the food‑chain picture… plant → rabbit → fox")
- Related defect: —
- Status: OPEN

### BIO-018 — The same card is shown again word for word within one lesson, and mastery completes on the repeats

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 2
- Biology concept: `bio.cell.mitosis`
- Lesson/order: #21
- Learner message: (card answers)
- Tutor response: #21: "How many chromosomes in each daughter cell? 46 / 23" at t6 and again at t13; "Which stage… Anaphase" at t4 and t10.
- Expected behaviour: Each check is a different question or a different angle.
- Actual behaviour: Verbatim repeats (options sometimes reordered).
- Why it is a defect: Mastery can be reached by remembering an answer already given (CHEM-033 equivalent).
- Reproducibility: Counted automatically over all lessons at the end.
- Also observed (120 occurrences in 80 lessons): #1 (A1) t16; #2 (A1) t18; #3 (A1) t6; #5 (A1) t10/t11; #6 (A1) t13; #7 (A1) t11; #8 (A1) t17; #9 (A1) t8/t9; #11 (A1) t9/t10; #12 (A1) t12/t13; #182 (A10) t21/t22; #183 (A10) t15; #186 (A10) t17; #187 (A10) t19; #189 (A10) t24/t28/t29; #191 (A10) t12/t15/t16; #21 (A2) t10/t13; #22 (A2) t11; #23 (A2) t9/t10; #24 (A2) t15; #25 (A2) t19/t20; #27 (A2) t11; #28 (A2) t17/t18; #29 (A2) t10; #30 (A2) t20; #31 (A2) t23/t24/t25; #41 (A3) t14; #43 (A3) t14/t15; #45 (A3) t20/t21; #46 (A3) t13; #47 (A3) t20/t21; #48 (A3) t15; #49 (A3) t15/t16; #50 (A3) t13/t14/t15; #61 (A4) t11; #62 (A4) t13; #63 (A4) t21/t25; #64 (A4) t17; #65 (A4) t14; #66 (A4) t10/t11; #67 (A4) t12; #70 (A4) t8; #71 (A4) t18; #72 (A4) t25; #81 (A5) t12; #82 (A5) t14/t15; #83 (A5) t13; #85 (A5) t13/t14; #86 (A5) t17/t20; #87 (A5) t15/t16; #88 (A5) t13/t14; #89 (A5) t13; #90 (A5) t16; #101 (A6) t16; #102 (A6) t11; #105 (A6) t16/t17; #106 (A6) t8; #107 (A6) t16; #108 (A6) t19; #121 (A7) t19/t20; #122 (A7) t10; #123 (A7) t17; #124 (A7) t17; #125 (A7) t15/t16; #128 (A7) t12; #129 (A7) t21; #130 (A7) t9/t10; #141 (A8) t16; #142 (A8) t13; #148 (A8) t9; #149 (A8) t8; #150 (A8) t20/t21; #151 (A8) t13/t14; #161 (A9) t9/t10; #162 (A9) t17; #163 (A9) t11/t12; #165 (A9) t13/t14; #166 (A9) t17/t18; #169 (A9) t14; #170 (A9) t11/t15
- Related defect: —
- Status: OPEN

### BIO-019 — Most cards have only 2 options (Yes/No, True/False, two statements), so guessing succeeds 50 % of the time

- Severity: P2
- Category: Questions
- Date/time: 2026-10-05
- Account: Account 5
- Biology concept: `bio.immuno.mhc-antigen-presentation`
- Lesson/order: #141
- Learner message: (card answers)
- Tutor response: e.g. #141 t9 "No / Yes", t17 "Yes / No"; #101 t9 "Yes / No".
- Expected behaviour: Mostly 3–4 option cards for concept checks.
- Actual behaviour: Counted automatically at the end.
- Why it is a defect: Verified mastery on 2-option cards is weak evidence (CHEM-004 equivalent).
- Reproducibility: Percentages computed over all cards at the end.
- Also observed (160 occurrences in 103 lessons): #1 (A1) t11/t16; #2 (A1) t9/t10; #3 (A1) t4/t6; #5 (A1) t8; #6 (A1) t6/t13; #7 (A1) t9; #8 (A1) t6/t17; #9 (A1) t4/t8; #10 (A1) t4; #11 (A1) t7; #12 (A1) t4/t12; #181 (A10) t3; #182 (A10) t19; #183 (A10) t13/t15; #184 (A10) t4; #186 (A10) t5/t17; #187 (A10) t14; #189 (A10) t11/t24; #190 (A10) t17; #191 (A10) t4/t12; #21 (A2) t6/t13; #22 (A2) t10; #23 (A2) t4/t7/t9; #24 (A2) t10; #25 (A2) t10/t20; #26 (A2) t7; #27 (A2) t9/t11; #28 (A2) t3/t17; #29 (A2) t8; #30 (A2) t15/t20; #31 (A2) t13/t24; #41 (A3) t11; #42 (A3) t13; #43 (A3) t6/t15; #45 (A3) t4/t20; #46 (A3) t8; #47 (A3) t16/t21; #48 (A3) t10/t15; #49 (A3) t11; #50 (A3) t10/t15; #61 (A4) t8; #62 (A4) t6/t13; #63 (A4) t4/t21; #64 (A4) t8/t17; #65 (A4) t13; #66 (A4) t9/t11; #67 (A4) t10; #68 (A4) t3; #69 (A4) t12; #70 (A4) t4/t8; #71 (A4) t3/t18; #72 (A4) t19/t25; #81 (A5) t7/t12; #82 (A5) t8/t15; #83 (A5) t6/t13; #84 (A5) t18; #85 (A5) t11; #86 (A5) t15; #87 (A5) t8/t15; #88 (A5) t4/t13; #89 (A5) t11; #90 (A5) t15; #101 (A6) t9/t16; #102 (A6) t8; #103 (A6) t15; #105 (A6) t13/t17; #106 (A6) t6/t8; #107 (A6) t15; #108 (A6) t3/t19; #109 (A6) t7; #110 (A6) t14; #121 (A7) t4/t19; #122 (A7) t4/t10; #123 (A7) t15; #124 (A7) t7/t17; #125 (A7) t12/t16; #126 (A7) t10; #127 (A7) t14; #128 (A7) t11; #129 (A7) t9/t21; #130 (A7) t4/t9; #131 (A7) t8; #141 (A8) t9/t16; #142 (A8) t8/t13; #143 (A8) t9; #144 (A8) t21; #145 (A8) t5; #146 (A8) t9; #147 (A8) t11; #148 (A8) t3/t9; #149 (A8) t3; #150 (A8) t4/t20; #151 (A8) t9/t14; #161 (A9) t3/t9; #162 (A9) t5/t17; #163 (A9) t6/t11; #164 (A9) t19; #165 (A9) t9/t14; #166 (A9) t13/t18; #167 (A9) t11; #168 (A9) t8; #169 (A9) t13; #170 (A9) t8/t15
- Related defect: —
- Status: OPEN

### BIO-020 — "i dont understand this picture" / "what is this?" asked on a lesson that has no figure; the tutor invents a picture

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 1
- Biology concept: `(many)`
- Lesson/order: #1
- Learner message: i dont understand this picture
- Tutor response: Counted automatically: picture requests sent before any figure was served in that lesson.
- Expected behaviour: Say there is no picture, or show one.
- Actual behaviour: The reply describes a picture that is not on screen or answers with an analogy.
- Why it is a defect: CHEM-036 equivalent.
- Reproducibility: Counted at the end.
- Related defect: —
- Status: OPEN

### BIO-021 — A request is answered with a different lesson's concept (step-by-step in a Meiosis lesson walks through mitosis)

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 18:34 UTC
- Account: Account 2
- Biology concept: `bio.cell.meiosis`
- Lesson/order: #22
- Learner message: show me step by step
- Tutor response: "Let’s walk through the main steps of **mitosis**, the cell‑division process that makes two genetically identical daughter cells. First, think of a copy machine…" (lesson title: Meiosis; figure: "Cell Division: Meiosis").
- Expected behaviour: The meiosis steps shown in the figure.
- Actual behaviour: Mitosis steps with a copy-machine analogy.
- Why it is a defect: Teaches the wrong process in the lesson meant to contrast it.
- Reproducibility: Observed once (#22 t8).
- Also observed (3 occurrences in 3 lessons): #103 (A6) t17; #45 (A3) t15; #187 (A9) t16
- Notes on occurrences: #103 t17: "show me step by step" in Fertilisation and Embryonic Development -> a menstrual-cycle calendar walk-through (follicular phase, ovulation) · #45 t15: "show me step by step" in Alternative Splicing -> transcription "zipper" explanation · #187 t16: "show me step by step" in Social Behaviour and Eusociality -> flowers attracting bees (a courtship/display analogy)
- Related defect: —
- Status: OPEN

### BIO-022 — Markdown pipe tables in tutor replies; the lesson renderer has no table support

- Severity: P3
- Category: UX
- Date/time: 2026-10-05
- Account: Account 10
- Biology concept: `bio.physio.exercise-physiology`
- Lesson/order: #82
- Learner message: give me example with numbers
- Tutor response: "| Adaptation (from the figure) | Measured change after 8 weeks | |------|------|…"
- Expected behaviour: Plain sentences or a list.
- Actual behaviour: Raw pipes and dashes appear in the lesson.
- Why it is a defect: Unreadable (CHEM-065 equivalent).
- Reproducibility: Counted at the end.
- Also observed (4 occurrences in 4 lessons): #82 (A5) t11; #84 (A5) t7; #186 (A10) t9; #108 (A5) tnum
- Notes on occurrences: #82 t11: pipe table in numbers example · #84 t7: pipe table in "give me example with numbers" · #186 t9: pipe table (peacock tail) · #108 tnum: pipe table
- Related defect: —
- Status: OPEN

### BIO-023 — Human Reproductive System lesson drifts into musical/speech rhythm (tempo, meter, English stress-timed "The cat chased the mouse") after the words "rhythm method"

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 18:33 UTC
- Account: Account 6
- Biology concept: `bio.repro.human-reproductive-system`
- Lesson/order: #102
- Learner message: maybe yes? / give me example
- Tutor response: t21: "Let’s focus on the core of rhythm and timing: it’s the pattern of beats that organizes music in time. The tempo… meter…". t22 (to "give me example"): "Imagine you’re listening to the sentence “The cat chased the mouse.” In English stress‑timed rhythm, the beats fall on the stressed syllables…". t20 (to "too many words"): "It sounds like you felt my previous question used too many words—did I understand that correctly?"
- Expected behaviour: Stay on the menstrual cycle / calendar (rhythm) method of contraception.
- Actual behaviour: The homonym "rhythm" pulls the tutor into music and English phonetics; the lesson was later paused at needs-review.
- Why it is a defect: Off-topic teaching in a Biology lesson; possible context bleed from the English subject on the same account (uncertain: the English transcript was not inspected). The trigger text came from a scripted free-text answer quoting the card option "calendar-only rhythm methods".
- Reproducibility: Observed once (#102 t20–t23).
- Related defect: —
- Status: OPEN

### BIO-024 — Stickleback fixed-action-pattern example: the sign stimulus is "the bright red belly of a receptive female"

- Severity: P3
- Category: Biology correctness
- Date/time: 2026-10-05 18:38 UTC
- Account: Account 10
- Biology concept: `bio.behav.innate-behavior-instinct`
- Lesson/order: #183
- Learner message: give me example
- Tutor response: "Male three‑spined stickleback fish: 1. Sign stimulus – the male spots the bright red belly of a receptive female (the trigger)…"
- Expected behaviour: Courtship is released by the swollen (gravid) belly of a female; the red belly is the male's own nuptial colour and the sign stimulus for rival males' aggression (Tinbergen).
- Actual behaviour: Red belly assigned to the female.
- Why it is a defect: Misstates the textbook sign-stimulus example the lesson is built on.
- Reproducibility: Observed once (#183 t11).
- Related defect: —
- Status: OPEN

### BIO-025 — Classification example: "Kingdom Animalia – about 30 million described animal species"

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05
- Account: Account 3
- Biology concept: `bio.found.classification-need`
- Lesson/order: #3
- Learner message: give me example with numbers
- Tutor response: "Kingdom Animalia – about 30 million described animal species. Phylum Chordata – ~65 000 species with a notochord…"
- Expected behaviour: About 1.5–2 million described animal species (estimates of all species, described or not, reach ~8–30 million).
- Actual behaviour: An estimate of total species is presented as the described count.
- Why it is a defect: Wrong order of magnitude for a basic figure.
- Reproducibility: Observed once (#3 t14).
- Related defect: —
- Status: OPEN

### BIO-026 — The reply grades the previous card, not the one just answered ("That’s right—species is the most specific rank" to an answer about beetle genera)

- Severity: P1
- Category: Lesson flow
- Date/time: 2026-10-05
- Account: Account 3
- Biology concept: `bio.found.classification-need`
- Lesson/order: #3
- Learner message: The same genus — very high sequence similarity plus occasional interbreeding (to the two-beetle card)
- Tutor response: "That’s right—species is the most specific rank, so it includes the fewest organisms." (this was the feedback for the earlier "most specific rank" card); the next card follows.
- Expected behaviour: Feedback about genus/species and shared ranks for the beetle question.
- Actual behaviour: Verdict text belongs to an earlier card.
- Why it is a defect: The learner is told something unrelated to what they answered (CHEM-035 equivalent).
- Reproducibility: Observed once (#3 t7).
- Related defect: —
- Status: OPEN

### BIO-027 — Lymphatic example: "1.5 litres of interstitial fluid leak out of capillaries every hour… lymphatics return 1.4 litres"

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 18:54 UTC
- Account: Account 5
- Biology concept: `bio.physio.lymphatic-system-detail`
- Lesson/order: #85
- Learner message: give me example with numbers
- Tutor response: "≈ 1.5 litres of interstitial fluid leak out of capillaries into the tissue space every hour. The nearby lymphatic vessels pick up most of that fluid and return ≈ 1.4 litres to the bloodstream, leaving only 0.1 litre to accumulate."
- Expected behaviour: Lymph flow is about 2–4 litres per day (≈ 0.1–0.17 L/h); net filtration to the interstitium is a few litres per day.
- Actual behaviour: Hourly figures are about ten times too large (≈ 36 L/day returned).
- Why it is a defect: Order-of-magnitude error in the one number the learner asked for.
- Reproducibility: Observed once (#85 t10).
- Related defect: —
- Status: OPEN

### BIO-028 — Invented data presented as real gene/experiment facts in "example with numbers" (BLNK four-exon sizes; eyeless enhancer stripe 0.8→0.6 mm; dN/dS = 20/4 = 5)

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 18:55 UTC
- Account: Account 3
- Biology concept: `bio.mol.alternative-splicing-rna-diversity (also #65, #66)`
- Lesson/order: #45
- Learner message: give me example with numbers
- Tutor response: #45 t12: "the human B‑cell linker protein (BLNK). Its DNA contains four exons… Exon 1 = 120 nt, Exon 2 = 150 nt…" (BLNK has ~19 exons; sizes made up). #66 t6: "the eye‑development gene eyeless… an enhancer that drives expression in a stripe 0.8 mm wide… a single‑base‑pair mutation narrows the stripe to 0.6 mm… eye surface area from 800 µm² to 600 µm²" (not a documented experiment). #65 t17: "20 nonsynonymous vs 4 synonymous differences → dN/dS = 20/4 = 5".
- Expected behaviour: Clearly labelled hypothetical numbers, or real published values; dN/dS must be normalised by the number of nonsynonymous and synonymous sites.
- Actual behaviour: Fabricated specifics are introduced with "a real gene that scientists often study" / "experimentally".
- Why it is a defect: A learner is told made-up numbers are real results; dN/dS is shown as a raw count ratio.
- Reproducibility: Seen in #45, #65, #66 (three lessons).
- Also observed (2 occurrences in 2 lessons): #47 (A3) tnum; #67 (A9) tnum
- Notes on occurrences: #47 tnum: invented effect sizes presented as facts ("insulin doubles PFK-1 activity, triples glycogen synthase… glucose-6-phosphatase to 50 %") · #67 tnum: "A few thousand years ago the fastest cheetahs ran about 90 km/h… rose to 110" (invented arms-race data)
- Related defect: —
- Status: OPEN

### BIO-029 — Textbook quantities wrong by an order of magnitude in worked examples (phosphocreatine 0.5 mol/kg of muscle; hen egg yolk "about 10 % of the weight")

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 19:02 UTC
- Account: Account 5
- Biology concept: `bio.physio.muscle-physiology-energetics (also #105)`
- Lesson/order: #86
- Learner message: give me example with numbers
- Tutor response: #86 t14: "the muscle stores about 0.5 mol of phosphocreatine per kilogram of muscle… 5 kg of leg muscle → 2.5 mol". #105 t5: "Each egg weighs roughly 50 g, and the yolk… makes up about 10 % of that weight."
- Expected behaviour: Muscle phosphocreatine is ≈ 0.03 mol/kg wet weight (so ~0.15 mol in 5 kg); a hen's yolk is ≈ 30 % of egg mass.
- Actual behaviour: Muscle store overstated about 15×; yolk fraction one third of the true value.
- Why it is a defect: Wrong magnitudes taught as facts.
- Reproducibility: Observed in #86 and #105.
- Related defect: —
- Status: OPEN

### BIO-030 — Audition example: a 1 kHz tone at 80 dB SPL is said to have a pressure variation of "about 0.02 Pa"

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 19:06 UTC
- Account: Account 10
- Biology concept: `bio.neuro.audition-vestibular-system`
- Lesson/order: #188
- Learner message: give me example with numbers
- Tutor response: "Imagine a pure 1 kHz tone played at 80 dB SPL… the pressure variation of the wave is about 0.02 Pa. This pressure pushes the eardrum, causing it to move roughly 0.1 µm."
- Expected behaviour: 80 dB SPL = 20 µPa × 10⁴ = 0.2 Pa (0.02 Pa is 60 dB SPL).
- Actual behaviour: Ten times too small for the stated level.
- Why it is a defect: The level and the pressure do not match.
- Reproducibility: Observed once (#188 t7).
- Related defect: —
- Status: OPEN

### BIO-031 — Arithmetic and magnitude errors inside worked "example with numbers" replies (mitochondria per cell, heart volume, degradation time, extinction rates)

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 19:10 UTC
- Account: Account 1
- Biology concept: `bio.found.levels-organisation (also #48, #69)`
- Lesson/order: #8
- Learner message: give me example with numbers
- Tutor response: #8 t?: "A typical skeletal‑muscle cell holds about 2 × 10⁹ mitochondria… The human heart (≈300 g) is composed of ~10⁶ cm³ of muscle". #48: "10 000 proteins × 300 residues ÷ 2 000 per second ≈ 150 seconds… roughly 5 minutes" (the product is 1 500 s = 25 min). #69: "1 book per million years for every 1 million books — that’s a 0.0001 % loss each year" (= 10⁻¹² per year, not 10⁻⁶); "75 % of its books in 0.1 million years — a loss rate of 750 books per million years" (7.5 million per Myr for a million-book library); and the figure's "punctuated equilibrium" side is equated with mass-extinction pulses.
- Expected behaviour: Consistent arithmetic and realistic magnitudes (a muscle fibre has ~10³–10⁴ mitochondria; a 300 g heart is ~300 cm³; punctuated equilibrium concerns speciation tempo, not extinction events).
- Actual behaviour: Several figures in one reply do not follow from each other or are off by orders of magnitude.
- Why it is a defect: Numbers the learner asked for are wrong or self-contradictory.
- Reproducibility: Observed in #8, #48, #69 (three lessons).
- Related defect: —
- Status: OPEN

### BIO-032 — Worked numbers that do not compute or contradict basic biology: K⁺ ΔG (−7.5 kJ/mol claimed; correct arithmetic gives −15.5 with the sign used, and −2 kJ/mol with the correct electrical sign), 75 %/67 % trophic transfer, fibroblast speed 12 µm/min

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 19:22 UTC
- Account: Account 2
- Biology concept: `bio.cell.membrane-transport-energetics (also #10, #29)`
- Lesson/order: #30
- Learner message: give me example with numbers
- Tutor response: #30 t?: "ΔG = 2.58 ln(5/150) + (1)(96.5)(−0.07) ≈ −7.5 kJ mol⁻¹" (inside 150 mM, outside 5 mM, −70 mV inside; K⁺ moving out). #10: "Sunlight ≈ 1 000 J; algae 200 J; zooplankton obtain roughly 150 J of that; small fish gain about 100 J; the remaining 50 J are lost as heat at each step". #29: "fibroblast extends a lamellipodium at 0.2 µm s⁻¹ (= 12 µm/min)… actin polymerizes at roughly 1 µm min⁻¹… the cell moves about 12 µm in one minute".
- Expected behaviour: #30: 2.58 × ln(5/150) = −8.8, and the electrical term for K⁺ leaving a cell with inside-negative potential is +6.8, so ΔG ≈ −2 kJ/mol. #10: about 10 % transfer between trophic levels (e.g. 200 → 20 → 2 J). #29: fibroblasts crawl ~0.5 µm/min; 1 µm/min polymerization cannot give 12 µm/min.
- Actual behaviour: Arithmetic and sign errors (#30), 75 % and 67 % transfer efficiencies with an unexplained "remaining 50 J" (#10), and internally inconsistent speeds (#29).
- Why it is a defect: The learner who asked for numbers gets numbers that contradict the principle being taught (the 10 % rule, ΔG sign conventions).
- Reproducibility: Observed in #10, #29, #30 (three lessons).
- Related defect: —
- Status: OPEN

### BIO-033 — Plant respiration example: mitochondria "consuming 3 µmol CO₂ and releasing the same amount of O₂" (respiration consumes O₂ and releases CO₂)

- Severity: P2
- Category: Biology correctness
- Date/time: 2026-10-05 19:17 UTC
- Account: Account 5
- Biology concept: `bio.plant.plant-respiration`
- Lesson/order: #88
- Learner message: give me example with numbers
- Tutor response: "…its mitochondria keep respiring, consuming 3 µmol CO₂ and releasing the same amount of O₂. The net effect is a 7 µmol CO₂ uptake (10 – 3) and a 7 µmol O₂ release…"
- Expected behaviour: Respiration consumes O₂ and releases CO₂; net CO₂ uptake = gross uptake − respiratory release.
- Actual behaviour: The gases are reversed for respiration.
- Why it is a defect: Reverses the core reaction of the lesson in the worked example.
- Reproducibility: Observed once (#88 num).
- Related defect: —
- Status: OPEN

### BIO-034 — Smaller factual/magnitude errors in examples: lung pressure drop 760→750 mmHg for a 2.5→3.0 L volume change; xylem tension "−0.1 MPa per metre"; an oak tree given arbuscular (Glomus) mycorrhiza; "about 20 billion neurons fire" in the frontal lobe

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 19:30 UTC
- Account: Account 4
- Biology concept: `bio.physio.respiratory-system (also #89, #168, #190)`
- Lesson/order: #72
- Learner message: give me example (with numbers)
- Tutor response: #72: "thoracic volume rising from 2.5 L to 3.0 L… pressure inside drops from 760 mm Hg to about 750 mm Hg". #89: "tension of roughly –0.1 MPa for each metre of water column". #168: "a forest oak tree whose roots are wrapped by… Glomus intraradices… forms an arbuscule". #190: "Frontal lobe… about 20 billion neurons fire".
- Expected behaviour: #72: real intrapulmonary pressure falls only 1–3 mmHg in quiet breathing (Boyle on these volumes would predict ~127 mmHg). #89: hydrostatic gradient is ≈ 0.01 MPa/m. #168: oaks form ectomycorrhiza, not arbuscular mycorrhiza. #190: the whole human cortex has ~16 billion neurons.
- Actual behaviour: Each example contains a wrong magnitude or association.
- Why it is a defect: Wrong numbers or associations taught as facts.
- Reproducibility: Seen in four lessons (one each).
- Related defect: —
- Status: OPEN

## Coverage by lesson

Result per account in brackets: turns driven, and how the lesson closed (mastered / needs-review = "Let's pause … worth another look later").
"figure none" means no figure channel was returned on any turn.

| # | concept | lesson | accounts (turns, result) | figure | defects referencing |
|---|---|---|---|---|---|
| 1 | `bio.found.what-is-biology` | What is Biology | A1 (18t, mastered) | yes | BIO-003, BIO-004, BIO-005, BIO-006, BIO-007, BIO-008, BIO-016, BIO-018, BIO-019, BIO-020 |
| 2 | `bio.found.characteristics-of-life` | Characteristics of Living Organisms | A1 (20t, needs-review) | yes | BIO-003, BIO-008, BIO-010, BIO-015, BIO-018, BIO-019 |
| 3 | `bio.found.classification-need` | Need for Classification | A1 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-010, BIO-015, BIO-018, BIO-019, BIO-025, BIO-026 |
| 4 | `bio.found.five-kingdom` | Five Kingdom Classification | A1 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008 |
| 5 | `bio.found.binomial-nomenclature` | Binomial Nomenclature | A1 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 6 | `bio.found.viruses-viroids-lichens` | Viruses, Viroids and Lichens | A1 (15t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019 |
| 7 | `bio.found.microscopy-basics` | Microscopy and Laboratory Techniques | A1 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 8 | `bio.found.biomes-levels-of-organisation` | Levels of Biological Organisation | A1 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019, BIO-031 |
| 9 | `bio.found.scientific-method-in-biology` | The Scientific Method in Biology | A1 (14t, needs-review) | yes | BIO-002, BIO-005, BIO-007, BIO-008, BIO-016, BIO-018, BIO-019 |
| 10 | `bio.found.unifying-themes-in-biology` | Unifying Themes in Biology | A1 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-016, BIO-019 |
| 11 | `bio.cell.cell-theory` | Cell Theory | A1 (12t, needs-review) | yes | BIO-005, BIO-008, BIO-018, BIO-019 |
| 12 | `bio.cell.prokaryotic-cell` | Prokaryotic Cell Structure | A1 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-016, BIO-018, BIO-019 |
| 13 | `bio.cell.eukaryotic-cell` | Eukaryotic Cell Structure | **not covered** | — | — |
| 14 | `bio.cell.cell-membrane-transport` | Cell Membrane and Transport | **not covered** | — | — |
| 15 | `bio.cell.nucleus-chromosomes` | Nucleus and Chromosomes | **not covered** | — | — |
| 16 | `bio.cell.mitochondria-energy` | Mitochondria and Energy Organelles | **not covered** | — | — |
| 17 | `bio.cell.chloroplast-structure` | Chloroplast Structure | **not covered** | — | — |
| 18 | `bio.cell.endomembrane-system` | Endomembrane System | **not covered** | — | — |
| 19 | `bio.cell.cytoskeleton` | Cytoskeleton and Cell Motility | **not covered** | — | — |
| 20 | `bio.cell.cell-cycle` | The Cell Cycle | **not covered** | — | — |
| 21 | `bio.cell.mitosis` | Mitosis | A2 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-011, BIO-018, BIO-019 |
| 22 | `bio.cell.meiosis` | Meiosis | A2 (13t, mastered) | yes | BIO-003, BIO-005, BIO-010, BIO-018, BIO-019, BIO-021 |
| 23 | `bio.cell.cell-signalling` | Cell Signalling | A2 (16t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-018, BIO-019 |
| 24 | `bio.cell.apoptosis` | Apoptosis and Programmed Cell Death | A2 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-006, BIO-008, BIO-018, BIO-019 |
| 25 | `bio.cell.anaerobic-respiration-fermentation` | Anaerobic Respiration and Fermentation | A2 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-007, BIO-008, BIO-018, BIO-019 |
| 26 | `bio.cell.cancer-biology-hallmarks` | Hallmarks of Cancer | A2 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-019 |
| 27 | `bio.cell.cell-adhesion-tissue-organization` | Cell Adhesion and Tissue Organisation | A2 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-018, BIO-019 |
| 28 | `bio.cell.cell-junctions-extracellular-matrix` | Cell Junctions and the Extracellular Matrix | A2 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019 |
| 29 | `bio.cell.cytoskeleton-motility` | Cytoskeletal Motility | A2 (15t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-018, BIO-019 |
| 30 | `bio.cell.membrane-transport-energetics` | Energetics of Membrane Transport | A2 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-018, BIO-019, BIO-032 |
| 31 | `bio.mol.biomolecule-types` | Types of Biomolecules | A2 (27t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019 |
| 32 | `bio.mol.carbohydrates-lipids` | Carbohydrates and Lipids | **not covered** | — | — |
| 33 | `bio.mol.proteins-structure` | Proteins and Protein Structure | **not covered** | — | — |
| 34 | `bio.mol.enzymes` | Enzymes and Enzyme Kinetics | **not covered** | — | — |
| 35 | `bio.mol.nucleic-acid-structure` | Nucleic Acid Structure | **not covered** | — | — |
| 36 | `bio.mol.dna-replication` | DNA Replication | **not covered** | — | — |
| 37 | `bio.mol.transcription` | Transcription | **not covered** | — | — |
| 38 | `bio.mol.translation-genetic-code` | Translation and the Genetic Code | **not covered** | — | — |
| 39 | `bio.mol.gene-regulation` | Regulation of Gene Expression | **not covered** | — | — |
| 40 | `bio.mol.epigenetics` | Epigenetics and Chromatin Regulation | **not covered** | — | — |
| 41 | `bio.mol.noncoding-rna` | Non-coding RNA Biology | A3 (20t, needs-review) | yes | BIO-001, BIO-002, BIO-003, BIO-005, BIO-006, BIO-018, BIO-019 |
| 42 | `bio.mol.signal-transduction-pathways` | Core Signal Transduction Pathways | A3 (24t, needs-review) | yes | BIO-001, BIO-002, BIO-003, BIO-004, BIO-005, BIO-008, BIO-019 |
| 43 | `bio.mol.dna-damage-repair` | DNA Damage Response and Repair | A3 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-006, BIO-008, BIO-018, BIO-019 |
| 44 | `bio.mol.bioenergetics` | Bioenergetics and Thermodynamics of Life | A3 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-008 |
| 45 | `bio.mol.alternative-splicing-rna-diversity` | Alternative Splicing and RNA Diversity | A3 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-008, BIO-016, BIO-018, BIO-019, BIO-021, BIO-028 |
| 46 | `bio.mol.chromatin-structure-genome-organization` | Chromatin Structure and 3D Genome Organisation | A3 (15t, needs-review) | yes | BIO-003, BIO-005, BIO-007, BIO-018, BIO-019 |
| 47 | `bio.mol.metabolic-regulation-integration` | Metabolic Regulation and Integration | A3 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-018, BIO-019, BIO-028 |
| 48 | `bio.mol.protein-quality-control-autophagy` | Protein Quality Control and Autophagy | A3 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-018, BIO-019 |
| 49 | `bio.gen.mendelian-genetics` | Mendelian Genetics | A3 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-006, BIO-008, BIO-012, BIO-018, BIO-019 |
| 50 | `bio.gen.gene-interactions` | Gene Interactions and Extensions of Mendelism | A3 (17t, mastered) | yes | BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 51 | `bio.gen.chromosomal-theory-linkage` | Chromosomal Theory and Linkage | **not covered** | — | — |
| 52 | `bio.gen.pedigree-human-genetics` | Pedigree Analysis and Human Genetic Disorders | **not covered** | — | — |
| 53 | `bio.gen.mutations` | Mutations | **not covered** | — | — |
| 54 | `bio.gen.population-genetics` | Population Genetics | **not covered** | — | — |
| 55 | `bio.gen.genetic-engineering` | Genetic Engineering and Recombinant DNA | **not covered** | — | — |
| 56 | `bio.gen.transposable-elements` | Transposable Elements and Genome Organisation | **not covered** | — | — |
| 57 | `bio.gen.conservation-genetics` | Conservation Genetics | **not covered** | — | — |
| 58 | `bio.gen.genetic-testing-counseling` | Genetic Testing and Counselling | **not covered** | — | — |
| 59 | `bio.gen.quantitative-genetics-heritability` | Quantitative Genetics and Heritability | **not covered** | — | — |
| 60 | `bio.evo.origin-of-life` | Origin of Life | **not covered** | — | — |
| 61 | `bio.evo.evidence-for-evolution` | Evidence for Evolution | A4 (19t, needs-review) | yes | BIO-001, BIO-002, BIO-003, BIO-004, BIO-006, BIO-009, BIO-010, BIO-018, BIO-019 |
| 62 | `bio.evo.natural-selection` | Natural Selection and Darwinism | A4 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-006, BIO-008, BIO-011, BIO-016, BIO-018, BIO-019 |
| 63 | `bio.evo.modern-synthesis-speciation` | Modern Synthesis and Speciation | A4 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 64 | `bio.evo.human-evolution` | Human Evolution | A4 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 65 | `bio.evo.molecular-evolution` | Molecular Evolution and Neutral Theory | A4 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-008, BIO-018, BIO-019 |
| 66 | `bio.evo.evo-devo` | Evolutionary Developmental Biology | A4 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 67 | `bio.evo.coevolution-species-interactions` | Coevolution and Species Interactions | A4 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-028 |
| 68 | `bio.evo.convergent-evolution-homoplasy` | Convergent Evolution and Homoplasy | A4 (7t, mastered) | yes | BIO-019 |
| 69 | `bio.evo.macroevolution-extinction` | Macroevolution and Mass Extinction | A4 (15t, mastered) | yes | BIO-003, BIO-005, BIO-016, BIO-019 |
| 70 | `bio.evo.phylogeography-biogeography` | Phylogeography and Historical Biogeography | A4 (13t, needs-review) | yes | BIO-002, BIO-018, BIO-019 |
| 71 | `bio.physio.digestive-system` | Human Digestive System | A4 (20t, mastered) | yes | BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 72 | `bio.physio.respiratory-system` | Human Respiratory System | A4 (27t, mastered) | yes | BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-034 |
| 73 | `bio.physio.circulatory-system` | Human Circulatory System | **not covered** | — | — |
| 74 | `bio.physio.excretory-system` | Excretory System and Osmoregulation | **not covered** | — | — |
| 75 | `bio.physio.nervous-system` | Nervous System and Neural Control | **not covered** | — | — |
| 76 | `bio.physio.endocrine-system` | Endocrine System | **not covered** | — | — |
| 77 | `bio.physio.musculoskeletal-system` | Locomotion and Musculoskeletal System | **not covered** | — | — |
| 78 | `bio.physio.immune-system-intro` | Immune System Overview | **not covered** | — | — |
| 79 | `bio.physio.blood-physiology-hemostasis` | Blood Physiology and Haemostasis | **not covered** | — | — |
| 80 | `bio.physio.comparative-animal-physiology` | Comparative Animal Physiology | **not covered** | — | — |
| 81 | `bio.physio.endocrine-disorders-feedback` | Endocrine Disorders and Feedback Pathology | A5 (14t, mastered) | yes | BIO-003, BIO-004, BIO-007, BIO-011, BIO-018, BIO-019 |
| 82 | `bio.physio.exercise-physiology` | Exercise Physiology | A5 (18t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-011, BIO-018, BIO-019, BIO-022 |
| 83 | `bio.physio.homeostasis-thermoregulation` | Homeostasis and Thermoregulation | A5 (21t, needs-review) | yes | BIO-002, BIO-005, BIO-008, BIO-011, BIO-018, BIO-019 |
| 84 | `bio.physio.integumentary-system` | The Integumentary System | A5 (29t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-008, BIO-010, BIO-019, BIO-022 |
| 85 | `bio.physio.lymphatic-system-detail` | The Lymphatic System | A5 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-018, BIO-019, BIO-027 |
| 86 | `bio.physio.muscle-physiology-energetics` | Muscle Physiology and Energetics | A5 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-008, BIO-012, BIO-018, BIO-019, BIO-029 |
| 87 | `bio.plant.photosynthesis` | Photosynthesis | A5 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 88 | `bio.plant.plant-respiration` | Respiration in Plants | A5 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-033 |
| 89 | `bio.plant.plant-water-relations` | Plant Water Relations | A5 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-010, BIO-018, BIO-019 |
| 90 | `bio.plant.mineral-nutrition` | Mineral Nutrition in Plants | A5 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 91 | `bio.plant.plant-growth-hormones` | Plant Growth and Hormones | **not covered** | — | — |
| 92 | `bio.plant.mycorrhizae-plant-symbioses` | Mycorrhizae and Root Symbioses | **not covered** | — | — |
| 93 | `bio.plant.phytochrome-photoperiodic-flowering` | Phytochrome and the Molecular Basis of Photoperiodic Flowering | **not covered** | — | — |
| 94 | `bio.plant.plant-biotechnology-applications` | Plant Biotechnology Applications | **not covered** | — | — |
| 95 | `bio.plant.plant-defense-mechanisms` | Plant Defence Mechanisms | **not covered** | — | — |
| 96 | `bio.plant.plant-stress-physiology` | Plant Stress Physiology | **not covered** | — | — |
| 97 | `bio.plant.plant-tissue-systems` | Plant Tissue Systems | **not covered** | — | — |
| 98 | `bio.plant.secondary-growth-anatomy` | Secondary Growth and Plant Anatomy | **not covered** | — | — |
| 99 | `bio.plant.seed-germination-dormancy` | Seed Germination and Dormancy | **not covered** | — | — |
| 100 | `bio.repro.asexual-reproduction` | Asexual Reproduction | **not covered** | — | — |
| 101 | `bio.repro.sexual-reproduction-plants` | Sexual Reproduction in Flowering Plants | A6 (18t, mastered) | yes | BIO-003, BIO-004, BIO-005, BIO-011, BIO-018, BIO-019 |
| 102 | `bio.repro.human-reproductive-system` | Human Reproductive System | A6 (28t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-010, BIO-015, BIO-018, BIO-019, BIO-023 |
| 103 | `bio.repro.fertilisation-development` | Fertilisation and Embryonic Development | A6 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-011, BIO-019, BIO-021 |
| 104 | `bio.repro.reproductive-health` | Reproductive Health and Contraception | A6 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008 |
| 105 | `bio.repro.animal-reproductive-strategies` | Comparative Animal Reproductive Strategies | A6 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-016, BIO-018, BIO-019 |
| 106 | `bio.repro.hormonal-regulation-reproduction-detail` | Hormonal Regulation of Reproduction | A6 (15t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019 |
| 107 | `bio.dev.gametogenesis-fertilisation-dev` | Fundamentals of Animal Development | A6 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 108 | `bio.dev.morphogenesis-differentiation` | Morphogenesis and Cell Differentiation | A6 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-008, BIO-016, BIO-018, BIO-019, BIO-022 |
| 109 | `bio.dev.stem-cells-regeneration` | Stem Cells and Regeneration | A6 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-008, BIO-010, BIO-019 |
| 110 | `bio.dev.aging-senescence-biology` | Biology of Ageing and Senescence | A6 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-008, BIO-019 |
| 111 | `bio.dev.organogenesis` | Organogenesis | **not covered** | — | — |
| 112 | `bio.dev.regeneration-biology` | Regeneration Biology | **not covered** | — | — |
| 113 | `bio.eco.organism-environment` | Organisms and their Environment | **not covered** | — | — |
| 114 | `bio.eco.population-ecology` | Population Ecology | **not covered** | — | — |
| 115 | `bio.eco.ecosystem-structure-function` | Ecosystem Structure and Function | **not covered** | — | — |
| 116 | `bio.eco.nutrient-cycling` | Nutrient Cycling and Succession | **not covered** | — | — |
| 117 | `bio.eco.biodiversity-conservation` | Biodiversity and Conservation | **not covered** | — | — |
| 118 | `bio.eco.environmental-issues` | Environmental Issues and Pollution | **not covered** | — | — |
| 119 | `bio.eco.community-ecology` | Community Ecology | **not covered** | — | — |
| 120 | `bio.eco.applied-ecology-ecosystem-services` | Applied Ecology and Ecosystem Services | **not covered** | — | — |
| 121 | `bio.eco.biogeochemistry-advanced` | Advanced Biogeochemical Cycling | A7 (22t, mastered) | yes | BIO-001, BIO-003, BIO-004, BIO-006, BIO-016, BIO-017, BIO-018, BIO-019 |
| 122 | `bio.eco.global-change-biology` | Global Change Biology | A7 (12t, mastered) | yes | BIO-005, BIO-007, BIO-008, BIO-016, BIO-018, BIO-019 |
| 123 | `bio.eco.landscape-conservation-ecology` | Landscape and Conservation Ecology | A7 (19t, mastered) | yes | BIO-003, BIO-005, BIO-006, BIO-008, BIO-017, BIO-018, BIO-019 |
| 124 | `bio.eco.microbial-ecology` | Microbial Ecology | A7 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-017, BIO-018, BIO-019 |
| 125 | `bio.eco.population-growth-models-quantitative` | Quantitative Models of Population Growth | A7 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-017, BIO-018, BIO-019 |
| 126 | `bio.eco.predator-prey-dynamics` | Predator-Prey Population Dynamics | A7 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-017, BIO-019 |
| 127 | `bio.micro.microbial-diversity` | Microbial Diversity | A7 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-019 |
| 128 | `bio.micro.microbial-growth-culture` | Microbial Growth and Culture Techniques | A7 (22t, needs-review) | yes | BIO-001, BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 129 | `bio.micro.microbes-in-human-welfare` | Microbes in Human Welfare | A7 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 130 | `bio.micro.pathogenic-microbes` | Pathogenic Microorganisms and Disease | A7 (18t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 131 | `bio.micro.viral-replication` | Viral Replication and Lifecycle | A7 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-019 |
| 132 | `bio.micro.horizontal-gene-transfer` | Horizontal Gene Transfer | **not covered** | — | — |
| 133 | `bio.micro.antimicrobial-resistance` | Antimicrobial Resistance | **not covered** | — | — |
| 134 | `bio.micro.archaea-extremophiles` | Archaea and Extremophiles | **not covered** | — | — |
| 135 | `bio.micro.human-microbiome-detail` | The Human Microbiome | **not covered** | — | — |
| 136 | `bio.micro.microbial-metabolism-diversity` | Diversity of Microbial Metabolism | **not covered** | — | — |
| 137 | `bio.immuno.innate-adaptive-immunity` | Innate and Adaptive Immunity | **not covered** | — | — |
| 138 | `bio.immuno.antibody-structure-function` | Antibody Structure and Function | **not covered** | — | — |
| 139 | `bio.immuno.vaccination-immunisation` | Vaccination and Immunisation | **not covered** | — | — |
| 140 | `bio.immuno.immune-disorders` | Immune Disorders | **not covered** | — | — |
| 141 | `bio.immuno.mhc-antigen-presentation` | MHC and Antigen Presentation | A8 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-010, BIO-012, BIO-018, BIO-019 |
| 142 | `bio.immuno.cancer-immunology-immunotherapy` | Cancer Immunology and Immunotherapy | A8 (15t, mastered) | yes | BIO-001, BIO-003, BIO-016, BIO-018, BIO-019 |
| 143 | `bio.immuno.cytokines-immune-signaling` | Cytokines and Immune Cell Signalling | A8 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-011, BIO-015, BIO-019 |
| 144 | `bio.immuno.t-cell-development-tolerance` | T-Cell Development and Immune Tolerance | A8 (24t, needs-review) | yes | BIO-003, BIO-005, BIO-007, BIO-008, BIO-016, BIO-019 |
| 145 | `bio.biotech.biotech-principles` | Principles of Biotechnology | A8 (18t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-011, BIO-019 |
| 146 | `bio.biotech.biotech-process-applications` | Biotechnology Process Applications | A8 (13t, mastered) | yes | BIO-003, BIO-005, BIO-008, BIO-019 |
| 147 | `bio.biotech.genomics-proteomics` | Genomics and Proteomics | A8 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-019 |
| 148 | `bio.biotech.crispr-genome-editing` | CRISPR and Genome Editing | A8 (14t, needs-review) | yes | BIO-002, BIO-008, BIO-018, BIO-019 |
| 149 | `bio.biotech.agricultural-forensic-biotechnology` | Agricultural and Forensic Biotechnology | A8 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-006, BIO-008, BIO-018, BIO-019 |
| 150 | `bio.biotech.bioprocess-engineering` | Bioprocess Engineering | A8 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 151 | `bio.biotech.gene-therapy-detail` | Gene Therapy | A8 (16t, mastered) | yes | BIO-003, BIO-005, BIO-016, BIO-018, BIO-019 |
| 152 | `bio.bioinfo.bioinformatics-intro` | Introduction to Bioinformatics | **not covered** | — | — |
| 153 | `bio.bioinfo.sequence-alignment` | Sequence Alignment | **not covered** | — | — |
| 154 | `bio.bioinfo.phylogenetics-computational` | Computational Phylogenetics | **not covered** | — | — |
| 155 | `bio.bioinfo.structural-bioinformatics` | Structural Bioinformatics | **not covered** | — | — |
| 156 | `bio.bioinfo.comparative-genomics` | Comparative Genomics | **not covered** | — | — |
| 157 | `bio.bioinfo.genome-sequencing-technologies` | Genome Sequencing Technologies | **not covered** | — | — |
| 158 | `bio.bioinfo.multiomics-statistical-genomics` | Multi-Omics and Statistical Genomics | **not covered** | — | — |
| 159 | `bio.sys.systems-biology-intro` | Introduction to Systems Biology | **not covered** | — | — |
| 160 | `bio.sys.gene-regulatory-networks` | Gene Regulatory Networks | **not covered** | — | — |
| 161 | `bio.sys.metabolic-network-modelling` | Metabolic Network Modelling | A9 (18t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-006, BIO-013, BIO-018, BIO-019 |
| 162 | `bio.sys.synthetic-biology` | Synthetic Biology | A9 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-018, BIO-019 |
| 163 | `bio.sys.evolutionary-systems-biology` | Evolutionary Systems Biology | A9 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 164 | `bio.sys.quantitative-systems-modeling` | Quantitative Modelling of Biological Systems | A9 (24t, needs-review) | yes | BIO-003, BIO-005, BIO-007, BIO-008, BIO-011, BIO-019 |
| 165 | `bio.div.three-domain-system` | Three Domain System | A9 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-018, BIO-019 |
| 166 | `bio.div.endosymbiotic-theory` | Endosymbiotic Theory | A9 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-018, BIO-019 |
| 167 | `bio.div.protist-diversity` | Eukaryotic Supergroups and Protist Diversity | A9 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-019 |
| 168 | `bio.div.fungal-biology` | Fungal Biology | A9 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-010, BIO-019 |
| 169 | `bio.div.plant-diversity-alternation-of-generations` | Plant Diversity and Alternation of Generations | A9 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-006, BIO-008, BIO-018, BIO-019 |
| 170 | `bio.div.cladistics-phylogenetic-thinking` | Cladistics and Phylogenetic Thinking | A9 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-016, BIO-018, BIO-019 |
| 171 | `bio.div.animal-body-plans-symmetry` | Animal Body Plans and Symmetry | **not covered** | — | — |
| 172 | `bio.div.arthropod-diversity` | Arthropod Diversity | **not covered** | — | — |
| 173 | `bio.div.chordate-vertebrate-diversity` | Chordate and Vertebrate Diversity Overview | **not covered** | — | — |
| 174 | `bio.div.echinoderm-deuterostome-diversity` | Echinoderms and Deuterostome Diversity | **not covered** | — | — |
| 175 | `bio.div.fish-amphibian-diversity` | Fish and Amphibian Diversity | **not covered** | — | — |
| 176 | `bio.div.invertebrate-diversity-major-phyla` | Invertebrate Diversity: Major Phyla | **not covered** | — | — |
| 177 | `bio.div.mammalian-diversity` | Mammalian Diversity | **not covered** | — | — |
| 178 | `bio.div.reptile-bird-diversity` | Reptile and Bird Diversity | **not covered** | — | — |
| 179 | `bio.behav.animal-cognition` | Animal Cognition | **not covered** | — | — |
| 180 | `bio.behav.animal-communication` | Animal Communication | **not covered** | — | — |
| 181 | `bio.behav.foraging-behavior` | Foraging Behaviour | A10 (7t, mastered) | yes | BIO-014, BIO-015, BIO-016, BIO-019 |
| 182 | `bio.behav.human-behavioral-ecology-evolutionary-psych` | Human Behavioural Ecology and Evolutionary Psychology | A10 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 183 | `bio.behav.innate-behavior-instinct` | Innate Behaviour and Instinct | A10 (17t, needs-review) | yes | BIO-003, BIO-005, BIO-006, BIO-007, BIO-008, BIO-018, BIO-019, BIO-024 |
| 184 | `bio.behav.kin-selection-altruism` | Kin Selection and Altruism | A10 (8t, mastered) | yes | BIO-019 |
| 185 | `bio.behav.learning-and-behavior` | Learning and Behaviour | A10 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-006, BIO-008 |
| 186 | `bio.behav.mating-systems-sexual-selection` | Mating Systems and Sexual Selection | A10 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-008, BIO-018, BIO-019, BIO-022 |
| 187 | `bio.behav.social-behavior-eusociality` | Social Behaviour and Eusociality | A10 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-021 |
| 188 | `bio.neuro.audition-vestibular-system` | Audition and the Vestibular System | A10 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-008, BIO-030 |
| 189 | `bio.neuro.autonomic-stress-physiology` | Autonomic and Stress Physiology | A10 (30t, no-complete) | yes | BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 190 | `bio.neuro.brain-regional-organization` | Regional Organisation of the Brain | A10 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-007, BIO-008, BIO-019 |
| 191 | `bio.neuro.cognitive-neuroscience-consciousness` | Cognitive Neuroscience and Consciousness | A10 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-008, BIO-018, BIO-019 |
| 192 | `bio.neuro.learning-memory-neurobiology` | The Neurobiology of Learning and Memory | **not covered** | — | — |
| 193 | `bio.neuro.neural-circuits-computation` | Neural Circuits and Computation | **not covered** | — | — |
| 194 | `bio.neuro.neurodegenerative-disease` | Neurodegenerative Disease | **not covered** | — | — |
| 195 | `bio.neuro.neurodevelopment` | Neurodevelopment | **not covered** | — | — |
| 196 | `bio.neuro.neurotransmitter-systems` | Neurotransmitter Systems | **not covered** | — | — |
| 197 | `bio.neuro.sensory-transduction` | Sensory Transduction | **not covered** | — | — |
| 198 | `bio.neuro.sleep-circadian-biology` | Sleep and Circadian Biology | **not covered** | — | — |
| 199 | `bio.neuro.vision-visual-system` | The Visual System | **not covered** | — | — |


## Not counted as defects

- Learning difficulty: advanced molecular/systems lessons were hard for a weak-English persona; that is not a defect.
- Persona artefacts: scripted quotations of taught text as "answers" were sometimes praised.
