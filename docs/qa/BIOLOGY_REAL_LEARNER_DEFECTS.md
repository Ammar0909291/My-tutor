# Biology Real-Learner Defects

<!-- SUMMARY:START -->
## Summary (generated from the entries below; counts verified automatically)

- Total lessons in Biology curriculum (`/api/curriculum?subject=biology`): 199
- Total lessons studied (full lesson session driven, ≥3 turns): 199
- Total lessons covered (≥1 account): 199  (100.0 %)
- Total defects: 42
- P0: 0
- P1: 4
- P2: 22
- P3: 16
- Status (after the 2026-10-10 final closure campaign, cf79346/76c2edd; DEPLOYED = live, not yet production-verified; OPEN = not fixed; totals = 42 entries):
  - PARTIALLY FIXED: 22
  - FIXED: 13
  - DEPLOYED: 3
  - NOT REPRODUCED: 2
  - PRODUCTION-VERIFIED: 1
  - OPEN: 1
<!-- SUMMARY:END -->

**Fix pass (2026-10-06, commits c4a6afc, 62f7821; plus the shared chemistry fixes d5397b1/dee8428):** each entry's **Status** / **Fix:** line names its commit, cause and evidence. Live re-drive on production (6f6ccaa), two disposable accounts (deleted afterwards), one tabId per lesson, lessons #1, 3, 21, 22, 41, 61, 82, 101, 102, 120, 121, 141, 161, 181 — 14 lessons, 181 turns:
- 0 lessons paused on a help request (BIO-002), 0 "Wrong"/"Correct" options (007), 0 stray backslashes (014), 0 third-person feedback (015), 0 money-as-maths (039), 0 repeated stock captions (020), 0 meta-talk (001), 0 pipe tables (022).
- "with numbers" / "step by step": 12/14 and 12/14 honoured; 3 of the 4 misses were degraded turns, 1 a one-line step (#141) the single regeneration did not fix.
- 16/181 turns degraded (9 %) — provider capacity (BIO-008).
- Found live and fixed in 62f7821: #120 Applied Ecology still taught from the food chain (BIO-017).
- BIO-012/026 not reproduced with per-tab sessions (#3, #141).
- Not verified: production DB rows (Supabase connector unauthorised this session); browser rendering of the new figures.

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
- Load note: ten accounts ran at once; degraded replies (BIO-008) appeared from the start. The driver processes stopped twice
  part-way (91 lessons not started); those lessons were re-driven on their original accounts afterwards, so late lessons were
  taught at lower load than early ones.
- Data labels: when a log entry names an account and lesson, both were verified against the transcript file after logging
  (15 labels were corrected that way).

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
- Also observed (10 occurrences in 9 lessons): #61 (A4) t14; #121 (A7) t7; #142 (A8) t3; #16 (A1) t18; #41 (A3) t4; #42 (A3) t3; #93 (A5) t15; #128 (A7) t2; #176 (A9) t7
- Notes on occurrences: #61 t14: "why?" -> "I mentioned that we’d already covered the idea of homologous structures earlier, so I didn’t repeat the same explanation verbatim." · #121 t7: "why?" -> "Because the system is set up to avoid repeating the same explanation, we need to give you a fresh, simpler way to look at the idea." · #142 t3: "give me example" -> "I hear you’re wondering why I’m not just repeating the earlier explanation"
- Related defect: —
- Status: FIXED
- Fix: c4a6afc — sentences in which the tutor explains its own process ("the system is set up to avoid repeating…", "I wanted to first acknowledge…") are removed from model replies (reuseCaps.ts stripMetaTalk, logged [meta-talk-stripped]). Test: src/tests/bioRealLearnerFixes.test.ts.

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
- Also observed (142 occurrences in 137 lessons): #61 (A4) tt18/t18; #141 (A8) tt19/t19; #161 (A9) tt17/t17; #21 (A2) tt20/t20; #63 (A4) tt26/t25; #3 (A1) t16; #4 (A1) t23; #5 (A1) t20; #7 (A1) t16; #8 (A1) t21; #9 (A1) t13; #10 (A1) t21; #12 (A1) t16; #13 (A1) t20; #14 (A1) t14; #16 (A1) t29; #17 (A1) t19; #18 (A1) t20; #19 (A1) t23; #182 (A10) t26; #185 (A10) t21; #186 (A10) t19; #187 (A10) t24; #188 (A10) t22; #190 (A10) t20; #191 (A10) t19; #192 (A10) t8; #193 (A10) t13; #195 (A10) t19; #196 (A10) t21; #199 (A10) t18; #23 (A2) t15; #24 (A2) t19; #25 (A2) t23; #26 (A2) t21; #27 (A2) t18; #28 (A2) t22; #29 (A2) t14; #30 (A2) t24; #32 (A2) t21; #34 (A2) t27; #35 (A2) t16; #38 (A2) t12; #41 (A3) t19; #42 (A3) t23; #43 (A3) t22; #44 (A3) t22; #45 (A3) t26; #47 (A3) t24; #48 (A3) t19; #49 (A3) t23; #52 (A3) t19; #54 (A3) t19; #56 (A3) t20; #57 (A3) t18; #58 (A3) t13; #62 (A4) t20; #64 (A4) t21; #65 (A4) t23; #66 (A4) t16; #67 (A4) t16; #70 (A4) t12; #74 (A4) t16; #78 (A4) t19; #79 (A4) t21; #80 (A4) t26; #82 (A5) t17; #83 (A5) t20; #84 (A5) t25; #85 (A5) t23; #86 (A5) t26; #87 (A5) t19; #88 (A5) t18; #89 (A5) t18; #90 (A5) t19; #91 (A5) t19; #92 (A5) t17; #95 (A5) t12; #96 (A5) t16; #99 (A5) t24; #102 (A6) t27; #103 (A6) t23; #104 (A6) t21; #105 (A6) t23; #106 (A6) t14; #107 (A6) t20; #108 (A6) t24; #109 (A6) t24; #110 (A6) t26; #111 (A6) t19; #112 (A6) t15; #115 (A6) t19; #119 (A6) t19; #124 (A7) t20; #125 (A7) t22; #126 (A7) t20; #127 (A7) t22; #128 (A7) t21; #129 (A7) t24; #130 (A7) t17; #131 (A7) t20; #132 (A7) t26; #133 (A7) t22; #135 (A7) t15; #136 (A7) t24; #137 (A7) t24; #139 (A7) t15; #140 (A7) t17; #143 (A8) t21; #145 (A8) t17; #147 (A8) t22; #148 (A8) t12; #149 (A8) t18; #150 (A8) t23; #152 (A8) t16; #153 (A8) t24; #154 (A8) t9; #155 (A8) t25; #156 (A8) t19; #157 (A8) t21; #158 (A8) t29; #160 (A8) t19; #162 (A9) t21; #163 (A9) t21; #165 (A9) t22; #166 (A9) t22; #167 (A9) t19; #168 (A9) t16; #169 (A9) t18; #170 (A9) t19; #171 (A9) t18; #172 (A9) t24; #175 (A9) t20; #177 (A9) t19; #178 (A9) t15; #179 (A9) t20; #180 (A9) t21
- Notes on occurrences: #61 tt18: Paused on "explain again" (mastery CHECK, not verified) · #141 tt19: Paused on "continue" · #161 tt17: Paused on "explain simpler" · #21 tt20: Paused on "i dont understand this picture" · #63 tt26: Paused on "quiz me" after 25 turns
- Related defect: —
- Status: FIXED
- Fix: c4a6afc — the turn budget (12 + one 6-turn extension) is designed; the defect was the close firing ON the help-request turn, replacing the reply with "Let's pause …". When the budget is the only closing reason and the learner's message is a request (explain again/simpler, a picture question, quiz me, an adaptation ask), the request is answered and the close waits for a non-request turn; ABSOLUTE_TURN_CEILING (30) still ends it (conceptBudget.ts deferCloseForRequest, logged [budget-close-deferred]). Test: src/tests/bioRealLearnerFixes.test.ts. The 75 % needs-review rate itself also reflects the persona's ~20 turns per lesson vs the budget — the budget size is owner policy.

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
- Also observed (473 occurrences in 175 lessons): #101 (A6) tt5,t12/t5/t12/t14; #141 (A8) tt2,t5,t12,t18/t5/t12/t18; #121 (A7) tt9,t11/t9/t11; #21 (A2) tt12,t16,t17/t12/t16/t17; #1 (A1) t2/t7/t10; #2 (A1) t2/t6/t15/t18; #3 (A1) t11/t15; #4 (A1) t8/t12; #5 (A1) t3/t14; #6 (A1) t5; #7 (A1) t5/t9/t13; #8 (A1) t3/t9; #10 (A1) t9/t10/t17/t18; #12 (A1) t4; #13 (A1) t4/t6/t18; #14 (A1) t4/t13; #15 (A1) t4/t9/t10; #16 (A1) t16/t20; #17 (A1) t12/t15/t16; #18 (A1) t12/t15; #19 (A1) t10/t18; #20 (A1) t3/t11; #182 (A10) t5/t7/t18/t19/t25; #183 (A10) t6/t7; #185 (A10) t7/t14/t20; #186 (A10) t2/t8/t11/t14/t16; #187 (A10) t7/t9/t22; #188 (A10) t4/t5/t8/t10/t15; #189 (A10) t3/t6/t9/t22; #190 (A10) t12/t15; #191 (A10) t18; #193 (A10) t3/t5/t12; #195 (A10) t6/t8/t9/t13/t17; #196 (A10) t3/t4/t11/t13/t15; #197 (A10) t7/t15/t16; #198 (A10) t4/t5; #199 (A10) t9/t17; #22 (A2) t3; #23 (A2) t13; #24 (A2) t18; #25 (A2) t2/t3/t14; #26 (A2) t4/t7/t10/t11/t18; #27 (A2) t2/t5/t15; #28 (A2) t9/t21; #29 (A2) t12; #30 (A2) t3/t4/t10/t13/t17/t23; #31 (A2) t2/t8/t15/t17/t22; #32 (A2) t10; #33 (A2) t3/t12; #34 (A2) t10/t11/t14/t17/t22; #35 (A2) t3/t15; #37 (A2) t14/t16; #38 (A2) t2/t4/t5; #39 (A2) t10/t11/t14/t16/t21; #41 (A3) t17; #42 (A3) t3/t6/t16; #43 (A3) t2/t3/t9/t20; #44 (A3) t3/t4/t11/t19/t20; #45 (A3) t19/t25; #46 (A3) t4/t12/t13; #47 (A3) t4/t18; #48 (A3) t2/t5/t18; #49 (A3) t5/t18/t20; #50 (A3) t9; #52 (A3) t9/t10/t13/t17; #53 (A3) t6/t9/t10; #54 (A3) t2/t12/t17; #55 (A3) t4; #56 (A3) t3/t7/t18; #57 (A3) t3/t6; #58 (A3) t12; #59 (A3) t5/t7/t15/t18; #60 (A3) t8/t9/t10/t13; #61 (A4) t14; #62 (A4) t16; #63 (A4) t3/t7/t15/t17/t19; #64 (A4) t10/t11/t12; #65 (A4) t18/t19; #66 (A4) t13/t14; #67 (A4) t7; #69 (A4) t3/t4/t7; #71 (A4) t8; #72 (A4) t4/t6/t11/t22; #73 (A4) t3/t7/t10; #74 (A4) t9/t11; #75 (A4) t2/t3; #76 (A4) t2/t8/t12; #78 (A4) t17; #79 (A4) t5/t18/t19; #80 (A4) t12/t13/t14/t20; #81 (A5) t10; #82 (A5) t12; #84 (A5) t10/t12/t16; #85 (A5) t6/t7/t9/t17; #86 (A5) t2/t4/t8/t12/t22; #87 (A5) t7/t11; #88 (A5) t2/t3/t8/t9; #89 (A5) t2/t6; #90 (A5) t2/t4/t12; #91 (A5) t4/t8; #92 (A5) t12; #93 (A5) t3/t7/t13/t15/t17/t22; #94 (A5) t5/t9/t13; #95 (A5) t5; #96 (A5) t14; #98 (A5) t9; #99 (A5) t12/t21; #100 (A5) t8/t9/t11; #102 (A6) t18/t26; #103 (A6) t9/t12/t18; #104 (A6) t6/t13/t17/t18; #105 (A6) t15/t19/t22; #106 (A6) t11; #107 (A6) t6/t7/t15/t18; #108 (A6) t3/t10/t21; #109 (A6) t3/t4/t9/t14/t18/t23; #110 (A6) t3/t7/t19/t25; #111 (A6) t11/t12/t16; #112 (A6) t12; #113 (A6) t2/t3; #115 (A6) t8/t12/t15/t16/t18; #119 (A6) t7/t11/t15; #120 (A6) t3/t6; #123 (A7) t3; #124 (A7) t15; #125 (A7) t7/t8/t14/t21; #126 (A7) t6/t13/t16/t18; #127 (A7) t4/t5/t16/t18; #128 (A7) t2/t6/t19/t20; #129 (A7) t12/t19; #130 (A7) t15/t16; #131 (A7) t5/t16/t18; #132 (A7) t5/t15/t22; #133 (A7) t8/t9; #136 (A7) t14/t21/t23; #137 (A7) t9/t12/t23; #138 (A7) t5/t10/t11; #139 (A7) t10/t14; #140 (A7) t2/t7; #142 (A8) t2/t3/t6; #143 (A8) t7/t18; #144 (A8) t5/t7; #145 (A8) t3; #146 (A8) t6; #147 (A8) t4/t6/t8/t19; #149 (A8) t12; #150 (A8) t6/t7/t9/t10/t17; #151 (A8) t11; #152 (A8) t14; #153 (A8) t9/t10/t17; #155 (A8) t3/t21/t22; #156 (A8) t6/t13; #157 (A8) t3/t10/t12/t13/t16; #158 (A8) t2/t5/t6/t10/t22; #159 (A8) t6; #160 (A8) t2/t9/t10/t18; #161 (A9) t14; #162 (A9) t12/t13; #163 (A9) t4/t20; #164 (A9) t4/t14/t17; #165 (A9) t11/t21; #166 (A9) t2/t5/t9/t11; #167 (A9) t2/t4/t9/t18; #168 (A9) t15; #169 (A9) t7/t8; #170 (A9) t3/t18; #171 (A9) t8/t12/t16; #172 (A9) t10/t11/t13/t18; #173 (A9) t2/t8; #175 (A9) t16/t17; #176 (A9) t2/t7; #177 (A9) t3/t7/t10; #178 (A9) t2/t12; #179 (A9) t19; #180 (A9) t3/t4/t10/t16
- Notes on occurrences: #101 tt5,t12: "I hear you…" · #141 tt2,t5,t12,t18: "I hear you…" / "I’m sorry you’re feeling stuck"; 🌱 emoji · #121 tt9,t11: "I hear you…" · #21 tt12,t16,t17: "I hear you…"
- Related defect: —
- Status: FIXED
- Fix: d5397b1 (CHEM-041) — empathy openers need a voiced struggle and never repeat within four replies (reuseCaps.ts); the run predates the deploy. Test: src/tests/bioRealLearnerFixes.test.ts with the observed opener.

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
- Also observed (25 occurrences in 25 lessons): #61 (A4) t16; #101 (A6) tt3,t6,t12,t14; #141 (A8) tt1,t2,t5,t11,t12,t13,t15; #161 (A9) tt6,t12; #121 (A7) tt6,t9,t18; #81 (A5) tt2,t5,t9,t10; #21 (A2) tt4,t17,t18; #16 (A1) t-; #188 (A10) t-; #190 (A10) t-; #196 (A10) t-; #25 (A2) t-; #34 (A2) t-; #42 (A3) t-; #44 (A3) t-; #65 (A4) t-; #108 (A6) t-; #109 (A6) t-; #110 (A6) t-; #136 (A7) t-; #155 (A8) t-; #157 (A8) t-; #158 (A8) t-; #159 (A8) t-; #167 (A9) t-
- Notes on occurrences: #61 t16: family photo album analogy · #101 tt3,t6,t12,t14: delivery driver / truck / two courses / deck of cards analogies · #141 tt1,t2,t5,t11,t12,t13,t15: mailbox / billboard / restaurant / castle walls / front desk analogies · #161 tt6,t12: grocery list / highway analogies · #121 tt6,t9,t18: kitchen sink / bathtub-soap analogies · #81 tt2,t5,t9,t10: snowball / microphone-speaker / thermostat / rubber band analogies · #21 tt4,t17,t18: dough loaves / deck of cards / bread loaf analogies
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: d5397b1 (CHEM-039) — past two analogies in four replies, one regeneration without an analogy (kept only if it has none). Not guaranteed when the retry also uses one. **2026-10-07 pass (2350ff6):** The analogy cap is one analogy in the last four replies for every subject (was two outside mathematics); past it the reply is regenerated once without an analogy and kept only if it has none. Partial: a retry that still uses an analogy keeps the original. Test: src/tests/remainingDefectFixes20261007.test.ts.

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
- Also observed (120 occurrences in 117 lessons): #101 (A6) t13; #141 (A8) t9; #21 (A2) t13; #4 (A1) t13; #5 (A1) t5; #6 (A1) t11; #7 (A1) t7; #8 (A1) t6; #9 (A1) t6; #11 (A1) t7; #12 (A1) t3; #13 (A1) t8; #14 (A1) t9; #15 (A1) t14; #19 (A1) t7; #182 (A10) t13; #183 (A10) t12; #186 (A10) t4; #187 (A10) t12; #188 (A10) t18; #189 (A10) t5; #190 (A10) t16; #191 (A10) t9; #195 (A10) t7; #196 (A10) t5; #197 (A10) t17; #199 (A10) t12; #22 (A2) t6; #24 (A2) t10; #25 (A2) t6; #28 (A2) t13; #31 (A2) t9; #34 (A2) t13; #36 (A2) t10; #37 (A2) t5; #39 (A2) t15; #41 (A3) t8; #42 (A3) t9; #45 (A3) t10; #46 (A3) t8; #50 (A3) t10; #52 (A3) t16; #53 (A3) t7; #57 (A3) t10; #59 (A3) t8; #60 (A3) t17; #62 (A4) t19; #63 (A4) t12; #64 (A4) t14; #67 (A4) t10; #69 (A4) t11; #71 (A4) t11; #72 (A4) t18; #74 (A4) t10; #75 (A4) t5; #77 (A4) t11; #79 (A4) t8; #80 (A4) t9; #83 (A5) t11; #84 (A5) t17; #86 (A5) t5; #87 (A5) t8; #88 (A5) t11; #90 (A5) t10; #91 (A5) t10; #93 (A5) t23; #94 (A5) t6; #98 (A5) t10; #99 (A5) t14; #100 (A5) t10; #103 (A6) t13; #104 (A6) t20; #106 (A6) t5; #108 (A6) t19; #110 (A6) t4; #113 (A6) t4; #114 (A6) t9; #119 (A6) t18; #120 (A6) t7; #122 (A7) t8; #123 (A7) t15; #124 (A7) t3; #125 (A7) t12; #126 (A7) t10; #128 (A7) t7; #129 (A7) t15; #130 (A7) t4; #131 (A7) t12; #132 (A7) t16; #133 (A7) t6; #135 (A7) t6; #137 (A7) t5; #138 (A7) t13; #139 (A7) t6; #144 (A8) t9; #146 (A8) t9; #147 (A8) t14; #150 (A8) t18; #151 (A8) t9; #153 (A8) t8; #155 (A8) t11; #157 (A8) t6; #158 (A8) t3; #159 (A8) t5; #160 (A8) t4; #163 (A9) t19; #164 (A9) t6; #167 (A9) t14; #169 (A9) t12; #170 (A9) t7; #171 (A9) t13; #172 (A9) t7; #173 (A9) t10; #175 (A9) t18; #176 (A9) t12; #177 (A9) t14; #180 (A9) t8
- Notes on occurrences: #101 t13: raw authored paragraph on "ok" (flower structure…) · #141 t9: raw MHC paragraph on "next question please" · #21 t13: raw authored paragraph on "quiz me"
- Related defect: —
- Status: FIXED
- Fix: c4a6afc — on a turn with no card, promises with nothing after them ("I'll present the next question", "let me know when you'd like to move on", "let's see if you can pick out one") are removed; a reply that was only a promise gets the concept fallback (gateAssessment.ts enforceQuestionDeliveryContract). The raw-paragraph variants are CHEM-003's serve-time cleanup (d5397b1). Test: src/tests/bioRealLearnerFixes.test.ts.

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
- Also observed (19 occurrences in 17 lessons): #61 (A4) t17; #161 (A9) tt16; #121 (A7) t12; #1 (A1) t10; #13 (A1) t17; #183 (A10) t8; #185 (A10) t16; #24 (A2) t7; #43 (A3) t12; #49 (A3) t2; #59 (A3) t2; #62 (A4) t17; #79 (A4) t17; #123 (A7) t5; #137 (A7) t11; #149 (A8) t17; #169 (A9) t17
- Notes on occurrences: #61 t17: "ok" -> "let’s see if you can pick out one" with no card · #161 tt16: "next question please" -> a recap of the learner’s own typed line · #121 t12: "next question please" -> "I’ll have the next question ready… Just let me know when you’d like to move on"
- Related defect: —
- Status: PARTIALLY FIXED
- Fix: d5397b1/dee8428 (CHEM-003) — memory-served authored text loses ALL-CAPS emphasis and cross-unit pointers at serve time. Serving the authored explanation on "ok" is the Explanation Memory design; its density is content, not changed here.

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
- Also observed (84 occurrences in 53 lessons): #81 (A5) tt7,t12/t7/t12; #1 (A1) t11/t16; #9 (A1) t4/t8; #183 (A10) t13/t15; #186 (A10) t5/t17; #190 (A10) t17; #191 (A10) t4/t12; #193 (A10) t6; #194 (A10) t6; #197 (A10) t12/t19; #198 (A10) t15; #199 (A10) t13; #25 (A2) t10/t20; #26 (A2) t7; #27 (A2) t9/t11; #28 (A2) t3/t17; #29 (A2) t8; #30 (A2) t15/t20; #45 (A3) t4/t20; #46 (A3) t8; #47 (A3) t16/t21; #48 (A3) t10/t15; #57 (A3) t13; #59 (A3) t20; #80 (A4) t4/t9; #82 (A5) t8/t15; #84 (A5) t18; #85 (A5) t11; #86 (A5) t15; #93 (A5) t11/t24; #94 (A5) t15; #97 (A5) t4; #98 (A5) t4/t11; #99 (A5) t5/t14; #105 (A6) t13/t17; #106 (A6) t6/t8; #122 (A7) t4/t10; #133 (A7) t16; #134 (A7) t5; #135 (A7) t3/t8; #136 (A7) t8/t17; #143 (A8) t9; #144 (A8) t21; #156 (A8) t9/t11; #164 (A9) t19; #171 (A9) t6/t13; #172 (A9) t5/t20; #174 (A9) t8; #175 (A9) t3/t11; #176 (A9) t9/t16; #177 (A9) t14; #179 (A9) t12; #180 (A9) t8/t12
- Notes on occurrences: #81 tt7,t12: options "Not necessarily / Correct"
- Related defect: —
- Status: FIXED
- Fix: c4a6afc — the authored options were "Correct — …" / "Wrong — …"; the answer-head split served the bare verdict word. A verdict head is now served as "Yes, that is correct" / "No, that is wrong" ("Not necessarily" -> "Not always, it depends"), still short so the length cue stays removed (gateAssessment.ts plainVerdictHead). Test: src/tests/bioRealLearnerFixes.test.ts; probeOptionOrder.test.ts updated.

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
- Also observed (175 occurrences in 73 lessons): #23 (A2) tt2,t6/t2/t6/t12/t14; #84 (A5) t1/t11/t12/t18/t21/t22/t24; #186 (A10) t15/t16; #144 (A8) t19/t3/t8/t20; #27 (A2) t1; #105 (A6) t4/t7; #127 (A7) t1/t21; #147 (A8) t13/t20; #126 (A7) t12; #188 (A10) t6/t17; #1 (A1) t13; #2 (A1) t17; #4 (A1) t4/t16/t17/t18/t19/t20; #5 (A1) t19; #9 (A1) t12; #10 (A1) t8; #11 (A1) t4; #17 (A1) t18; #183 (A10) t3; #185 (A10) t3/t6/t18; #187 (A10) t4/t21/t23; #189 (A10) t7/t11/t14/t16/t21/t27; #190 (A10) t4/t10/t11; #191 (A10) t3/t8; #198 (A10) t6/t7; #24 (A2) t6/t7; #25 (A2) t18; #29 (A2) t6; #30 (A2) t1; #42 (A3) t22; #43 (A3) t12/t21; #44 (A3) t6/t21/t22; #45 (A3) t6/t9/t13/t24; #47 (A3) t10/t13; #49 (A3) t8; #50 (A3) t13; #62 (A4) t17/t18; #63 (A4) t16/t18/t24/t25; #64 (A4) t2/t6; #65 (A4) t3/t22; #67 (A4) t1; #71 (A4) t5; #72 (A4) t1; #83 (A5) t18; #85 (A5) t2/t4/t16/t18/t19; #86 (A5) t3/t13/t25; #87 (A5) t10/t11; #88 (A5) t4/t6/t7; #102 (A6) t14/t19/t24; #103 (A6) t5/t7/t20; #104 (A6) t1/t7; #108 (A6) t22; #109 (A6) t5/t7/t20; #110 (A6) t8/t13; #122 (A7) t7; #123 (A7) t2/t5/t10; #124 (A7) t2/t3/t10/t14; #125 (A7) t4/t10; #128 (A7) t10/t14; #129 (A7) t1/t2/t7/t23/t24; #143 (A8) t3/t15/t16; #145 (A8) t13; #146 (A8) t2; #148 (A8) t6/t11; #149 (A8) t14/t16; #162 (A9) t19/t20; #163 (A9) t3/t16; #164 (A9) t9; #165 (A9) t3/t4/t6/t16; #166 (A9) t21/t22; #168 (A9) t2/t4/t14; #169 (A9) t3; #170 (A9) t13
- Notes on occurrences: #23 tt2,t6: degraded replies on "show me step by step" and "give me example with numbers" · #84 t1: lesson opens with a degraded fallback reply · #186 t15: degraded reply on "show me step by step" with a stray figure line · #144 t19: degraded reply on "give me example with numbers" · #27 t1: lesson opens with a degraded fallback · #105 t4: degraded reply on "give me example with numbers" · #127 t1: lesson opens with a degraded fallback · #147 t13: degraded reply on "give me example"
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified + OWNER ACTION (provider capacity)
- Fix: Same as CHEM-107: provider capacity — Gemini 402 (credits depleted), no OpenRouter key, Groq burst limits under ten concurrent learners; bounded retry + honest copy shipped in 562c3c3. Owner: top up Gemini / add OPENROUTER_API_KEY / raise the Groq tier. **2026-10-07 pass (2350ff6):** With every provider down, the concept's own authored explanation that the learner has not yet seen is served instead of the outage copy (chat: `findUnseenExplanationContent` in the all-providers-down branch, which then does not count as an outage turn; lesson-init: the authored explanation opens the lesson under its title). The outage copy remains only when no unseen authored explanation is left. Provider capacity itself (Gemini credits, OPENROUTER_API_KEY, Groq tier) is still an owner action. Test: src/tests/remainingDefectFixes20261007.test.ts.

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
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-generated numbers in a worked example; the authored cytochrome c figures (0 and 45 differences) are defensible. Numeric verification (N1/N2/N3) is CLOSED — NOT READY FOR ENFORCEMENT (owner, 2026-10-04); not patched. **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

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
- Also observed (16 occurrences in 14 lessons): #141 (A8) t8; #22 (A2) t4; #2 (A1) tt4/t4; #3 (A1) t13; #195 (A10) t16; #61 (A4) t6; #76 (A4) t4; #84 (A5) t4; #89 (A5) t7; #102 (A6) t6; #109 (A6) t2; #132 (A7) t24; #133 (A7) t4; #168 (A9) t12
- Notes on occurrences: #141 t8: "quiz me" -> "MHC and Antigen Presentation covers: MHC class I (all nucleated cells…)…" · #22 t4: raw lesson-goal string as the reply to a card answer (#22 t4) · #2 tt4: card answer "Cellular organisation" -> reply is the raw lesson goal "Growth, reproduction, metabolism, … evolution as the defining properties…"
- Related defect: —
- Status: FIXED
- Fix: c4a6afc — the concept fallback served a KG syllabus phrase with a full stop ("Fossil record, comparative anatomy — …") verbatim; such a comma-list phrase is now framed "In this lesson on X we will look at …" (conceptFallback.ts); the "covers:" form was already fixed by 3ac46db (CHEM-064). Test: src/tests/bioRealLearnerFixes.test.ts.

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
- Also observed (9 occurrences in 9 lessons): #81 (A5) t1; #21 (A2) t9; #62 (A4) t1; #82 (A5) tt1,t10; #83 (A5) t1; #103 (A6) t1; #143 (A8) t1; #145 (A8) t1; #164 (A9) t1
- Notes on occurrences: #81 t1: "ok" -> only "What do you notice about…?" (first reply is a question) · #21 t9: "explain simpler" -> "How did you figure that each daughter cell would end up with 23 chromosomes?" (re-asks an old wrong answer) · #62 t1: "ok" -> only "What do you notice about that arrow?" · #82 tt1,t10: "ok" -> "What do you notice about this piece of information…?"; "show me step by step" -> "Sure, let’s walk through the figure together, focusing on one part at a time." and nothing else · #83 t1: "ok" -> only "What do you notice about this vasodilation response in the diagram?" · #103 t1: "ok" -> only "What do you notice about this arrow?" · #143 t1: "ok" -> only "What do you notice about how this label and its line are presented?" · #145 t1: "ok" -> only "What do you notice about this orange heading?"
- Related defect: —
- Status: PARTIALLY FIXED
- Fix: c4a6afc — "Let's make it easier with a quick choice." with no card and "let's walk through the figure together…" with nothing after are removed (same contract as BIO-005). The lone first-turn question after "ok" is CHEM-044/079 (ef772e6, d5397b1). Not covered: "How did you figure that…" after a card answer. Test: src/tests/bioRealLearnerFixes.test.ts.

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
- Also observed (4 occurrences in 4 lessons): #86 (A5) t19; #49 (A3) tex; #52 (A3) tex; #77 (A4) tnum
- Notes on occurrences: #86 t19: "show me step by step" -> "That’s right—when a muscle needs more force, it brings in progressively larger motor units. Please select the correct statement about…" (verdict on a prior card and a new card instead of steps) · #49 tex: "give me example" answered with "That’s correct — the ratio you identified is indeed 3 tall : 1 short" (verdict on an earlier answer) · #52 tex: "give me example" -> "That’s right — an affected father passes his single X‑linked recessive allele to every daughter…" (verdict on an earlier answer) · #77 tnum: "give me example with numbers" -> "That’s a common mix‑up—bone is living tissue…" (reply to an earlier card, not the request)
- Related defect: —
- Status: NOT REPRODUCED
- Fix: Live re-drive 2026-10-06 (6f6ccaa, disposable account, one tabId per lesson): in #141 every verdict matched its own card. The run that logged it drove each account's lessons without a tabId, which resumes one shared session (BIO-042); that shape is the likely source. Kept open until the owner decides BIO-042. Related fixes: 0b3b0fb (CHEM-035), d5397b1 (verdict first). **2026-10-07 pass (2350ff6):** Live re-drive 2026-10-06 with one tab id per lesson: every verdict matched its own card (see the earlier Fix line).

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
- Status: FIXED
- Fix: c4a6afc — a bare "what is this?" while a figure is held is read as a question about the figure, so the PHYS-021 contract (read the figure's labels, never ask the learner what they see) applies. Test: src/tests/bioRealLearnerFixes.test.ts (route wiring).

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
- Status: FIXED
- Fix: c4a6afc — a model card attribute with an escaped quote (a="… higher‑variance \"gamble\"") was cut at the \" and served with a trailing backslash; the value now keeps it as a plain quote (mcq.ts parseMcqTag). Test: src/tests/bioRealLearnerFixes.test.ts.

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
- Also observed (4 occurrences in 4 lessons): #102 (A6) t8; #2 (A1) t3; #3 (A1) t3; #143 (A8) tt8
- Notes on occurrences: #102 t8: "Follicular phase" for "which term appears in the menstrual cycle diagram?" -> a garden analogy, no verdict · #2 t3: card answer gets a raw goal string instead of a verdict · #3 t3: answer "Domain" -> "Now, looking at the hierarchy again: Quick check." with no verdict · #143 tt8: answer "Tumour necrosis factor (TNF)" -> "This question checks your understanding of…" no verdict
- Related defect: —
- Status: FIXED
- Fix: c4a6afc — a sentence starting "The learner …" / "The student's …" is rewritten to "You …" / "Your …" with the verb agreed, in the final reply and in the served assembled text (src/lib/text/secondPerson.ts). Test: src/tests/bioRealLearnerFixes.test.ts.

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
- Also observed (24 occurrences in 23 lessons): #1 (A1) t17; #9 (A1) t9; #10 (A1) t5; #12 (A1) t13; #15 (A1) t16; #20 (A1) t9; #181 (A10) t4; #37 (A2) t6; #45 (A3) t5/t21; #54 (A3) t10; #62 (A4) t14; #69 (A4) t13; #77 (A4) t7; #105 (A6) t17; #108 (A6) t16; #121 (A7) t20; #122 (A7) t5; #135 (A7) t9; #142 (A8) t14; #144 (A8) t22; #151 (A8) t15; #153 (A8) t11; #170 (A9) t11
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: d5397b1 (CHEM-028) — on an authored key the verdict leads. The observed card was model-written (figure labels as options); an unauthored key stays verdict-free by design — owner decision (same as CHEM-048/134). **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 70 distinct cards served in 31 lessons, all authored (stems found in the corpus); 0 replies with lettered A)/B)/C) options in 399 turns.

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
- Status: FIXED
- Fix: c4a6afc + 62f7821 — six ecology lessons taught from the generic 'bio.eco' food chain get curated Tier-0 figures from existing generators, labels from each EB entry: sulfur cycle, fragmentation and corridors, microbes in the cycles, exponential vs logistic, coupled predator–prey, and (found live 2026-10-06, #120) the four ecosystem-service categories. Test: src/tests/bioRealLearnerFixes.test.ts. Live re-drive of #121 on 6f6ccaa served a figure; production rendering of the new scenes not inspected in a browser.

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
- Also observed (233 occurrences in 142 lessons): #1 (A1) t16; #2 (A1) t18; #3 (A1) t6; #5 (A1) t10/t11; #6 (A1) t13; #7 (A1) t11; #8 (A1) t17; #9 (A1) t8/t9; #11 (A1) t9/t10; #12 (A1) t12/t13; #13 (A1) t14; #14 (A1) t11; #15 (A1) t16; #16 (A1) t20/t24/t25; #19 (A1) t19/t20; #20 (A1) t11/t12; #182 (A10) t21/t22; #183 (A10) t15; #186 (A10) t17; #187 (A10) t19; #189 (A10) t24/t28/t29; #191 (A10) t12/t15/t16; #193 (A10) t8/t9; #194 (A10) t8; #197 (A10) t18/t19; #198 (A10) t17; #21 (A2) t10/t13; #22 (A2) t11; #23 (A2) t9/t10; #24 (A2) t15; #25 (A2) t19/t20; #27 (A2) t11; #28 (A2) t17/t18; #29 (A2) t10; #30 (A2) t20; #31 (A2) t23/t24/t25; #32 (A2) t15/t16; #33 (A2) t15; #34 (A2) t19/t23/t24; #35 (A2) t10/t11; #36 (A2) t10/t11/t12; #37 (A2) t12/t16; #39 (A2) t23/t24; #40 (A2) t9; #41 (A3) t14; #43 (A3) t14/t15; #45 (A3) t20/t21; #46 (A3) t13; #47 (A3) t20/t21; #48 (A3) t15; #49 (A3) t15/t16; #50 (A3) t13/t14/t15; #51 (A3) t10/t11; #53 (A3) t14/t15/t16; #55 (A3) t16/t17/t18; #57 (A3) t15; #58 (A3) t9; #60 (A3) t18/t19; #61 (A4) t11; #62 (A4) t13; #63 (A4) t21/t25; #64 (A4) t17; #65 (A4) t14; #66 (A4) t10/t11; #67 (A4) t12; #70 (A4) t8; #71 (A4) t18; #72 (A4) t25; #73 (A4) t18/t19; #75 (A4) t12; #77 (A4) t11; #78 (A4) t14; #79 (A4) t13/t14; #80 (A4) t9/t10/t18; #81 (A5) t12; #82 (A5) t14/t15; #83 (A5) t13; #85 (A5) t13/t14; #86 (A5) t17/t20; #87 (A5) t15/t16; #88 (A5) t13/t14; #89 (A5) t13; #90 (A5) t16; #91 (A5) t12/t13; #92 (A5) t14/t15; #93 (A5) t24/t25; #94 (A5) t17; #96 (A5) t10/t11; #98 (A5) t11/t12; #99 (A5) t14/t18/t19; #100 (A5) t18/t19; #101 (A6) t16; #102 (A6) t11; #105 (A6) t16/t17; #106 (A6) t8; #107 (A6) t16; #108 (A6) t19; #112 (A6) t8/t9; #113 (A6) t7; #118 (A6) t11/t12; #120 (A6) t16/t17; #121 (A7) t19/t20; #122 (A7) t10; #123 (A7) t17; #124 (A7) t17; #125 (A7) t15/t16; #128 (A7) t12; #129 (A7) t21; #130 (A7) t9/t10; #132 (A7) t13/t16/t17; #135 (A7) t8; #136 (A7) t17/t18/t19; #137 (A7) t19/t20; #139 (A7) t11; #140 (A7) t14; #141 (A8) t16; #142 (A8) t13; #148 (A8) t9; #149 (A8) t8; #150 (A8) t20/t21; #151 (A8) t13/t14; #152 (A8) t6/t8; #153 (A8) t20/t21; #155 (A8) t17/t18/t19; #156 (A8) t11; #158 (A8) t25; #159 (A8) t18/t19; #160 (A8) t12/t15; #161 (A9) t9/t10; #162 (A9) t17; #163 (A9) t11/t12; #165 (A9) t13/t14; #166 (A9) t17/t18; #169 (A9) t14; #170 (A9) t11/t15; #171 (A9) t13/t14; #172 (A9) t20/t21; #173 (A9) t14; #175 (A9) t11/t12; #176 (A9) t16/t17; #178 (A9) t9; #180 (A9) t12/t13
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: 957978b + afa7322 — the cross-lesson mechanism was reproduced in production (chemistry, A → B → A in one tab; see CHEM-033) and fixed in afa7322; not deployed (Vercel 402). Separate observation on the original lesson (bio.cell.mitosis, 2026-10-06): one correctly answered card was shown again — production logs show it was answered at phase GUIDE (no mastery credit) after the concept's 3 authored probes were all used, which is the owner-decided single re-ask (teachingHistory.recordMcqOutcome, option (c)), not a ledger fault.

### BIO-019 — Most cards have only 2 options (Yes/No, True/False, two statements), so guessing succeeds 50 % of the time

- Severity: P2
- Category: Questions
- Date/time: 2026-10-05
- Account: Account 8
- Biology concept: `bio.immuno.mhc-antigen-presentation`
- Lesson/order: #141
- Learner message: (card answers)
- Tutor response: e.g. #141 t9 "No / Yes", t17 "Yes / No"; #101 t9 "Yes / No".
- Expected behaviour: Mostly 3–4 option cards for concept checks.
- Actual behaviour: Counted automatically at the end.
- Why it is a defect: Verified mastery on 2-option cards is weak evidence (CHEM-004 equivalent).
- Reproducibility: Percentages computed over all cards at the end.
- Also observed (290 occurrences in 190 lessons): #1 (A1) t11/t16; #2 (A1) t9/t10; #3 (A1) t4/t6; #5 (A1) t8; #6 (A1) t6/t13; #7 (A1) t9; #8 (A1) t6/t17; #9 (A1) t4/t8; #10 (A1) t4; #11 (A1) t7; #12 (A1) t4/t12; #13 (A1) t9; #14 (A1) t9; #15 (A1) t15; #16 (A1) t3/t20; #18 (A1) t8; #19 (A1) t15/t20; #20 (A1) t5/t11; #181 (A10) t3; #182 (A10) t19; #183 (A10) t13/t15; #184 (A10) t4; #186 (A10) t5/t17; #187 (A10) t14; #189 (A10) t11/t24; #190 (A10) t17; #191 (A10) t4/t12; #192 (A10) t3; #193 (A10) t6; #194 (A10) t6; #197 (A10) t12/t19; #198 (A10) t15; #199 (A10) t13; #21 (A2) t6/t13; #22 (A2) t10; #23 (A2) t4/t7/t9; #24 (A2) t10; #25 (A2) t10/t20; #26 (A2) t7; #27 (A2) t9/t11; #28 (A2) t3/t17; #29 (A2) t8; #30 (A2) t15/t20; #31 (A2) t13/t24; #32 (A2) t14; #33 (A2) t14; #34 (A2) t4/t8/t19/t24; #35 (A2) t8; #36 (A2) t4/t10; #37 (A2) t3/t12; #38 (A2) t7; #39 (A2) t22; #40 (A2) t7; #41 (A3) t11; #42 (A3) t13; #43 (A3) t6/t15; #45 (A3) t4/t20; #46 (A3) t8; #47 (A3) t16/t21; #48 (A3) t10/t15; #49 (A3) t11; #50 (A3) t10/t15; #51 (A3) t3/t10; #53 (A3) t7/t16; #54 (A3) t9; #55 (A3) t12/t18; #56 (A3) t11/t12; #57 (A3) t13; #58 (A3) t6; #59 (A3) t20; #60 (A3) t15/t19; #61 (A4) t8; #62 (A4) t6/t13; #63 (A4) t4/t21; #64 (A4) t8/t17; #65 (A4) t13; #66 (A4) t9/t11; #67 (A4) t10; #68 (A4) t3; #69 (A4) t12; #70 (A4) t4/t8; #71 (A4) t3/t18; #72 (A4) t19/t25; #73 (A4) t17; #74 (A4) t3; #75 (A4) t5/t12; #76 (A4) t10; #77 (A4) t4; #78 (A4) t3/t14; #79 (A4) t11; #80 (A4) t4/t9; #81 (A5) t7/t12; #82 (A5) t8/t15; #83 (A5) t6/t13; #84 (A5) t18; #85 (A5) t11; #86 (A5) t15; #87 (A5) t8/t15; #88 (A5) t4/t13; #89 (A5) t11; #90 (A5) t15; #91 (A5) t11/t13; #92 (A5) t6/t14; #93 (A5) t11/t24; #94 (A5) t15; #95 (A5) t7; #96 (A5) t4/t10; #97 (A5) t4; #98 (A5) t4/t11; #99 (A5) t5/t14; #100 (A5) t17; #101 (A6) t9/t16; #102 (A6) t8; #103 (A6) t15; #105 (A6) t13/t17; #106 (A6) t6/t8; #107 (A6) t15; #108 (A6) t3/t19; #109 (A6) t7; #110 (A6) t14; #111 (A6) t4; #112 (A6) t4/t8; #113 (A6) t4/t6; #114 (A6) t9; #115 (A6) t5; #116 (A6) t4; #117 (A6) t5; #118 (A6) t4/t11; #119 (A6) t9; #120 (A6) t10/t16; #121 (A7) t4/t19; #122 (A7) t4/t10; #123 (A7) t15; #124 (A7) t7/t17; #125 (A7) t12/t16; #126 (A7) t10; #127 (A7) t14; #128 (A7) t11; #129 (A7) t9/t21; #130 (A7) t4/t9; #131 (A7) t8; #132 (A7) t9/t16; #133 (A7) t16; #134 (A7) t5; #135 (A7) t3/t8; #136 (A7) t8/t17; #137 (A7) t14/t20; #138 (A7) t13; #139 (A7) t7; #140 (A7) t12; #141 (A8) t9/t16; #142 (A8) t8/t13; #143 (A8) t9; #144 (A8) t21; #145 (A8) t5; #146 (A8) t9; #147 (A8) t11; #148 (A8) t3/t9; #149 (A8) t3; #150 (A8) t4/t20; #151 (A8) t9/t14; #152 (A8) t3; #153 (A8) t10/t20; #154 (A8) t4; #155 (A8) t9/t17; #156 (A8) t9/t11; #157 (A8) t6; #158 (A8) t15/t25; #159 (A8) t8/t18; #160 (A8) t7/t12; #161 (A9) t3/t9; #162 (A9) t5/t17; #163 (A9) t6/t11; #164 (A9) t19; #165 (A9) t9/t14; #166 (A9) t13/t18; #167 (A9) t11; #168 (A9) t8; #169 (A9) t13; #170 (A9) t8/t15; #171 (A9) t6/t13; #172 (A9) t5/t20; #173 (A9) t6/t14; #174 (A9) t8; #175 (A9) t3/t11; #176 (A9) t9/t16; #177 (A9) t14; #178 (A9) t6; #179 (A9) t12; #180 (A9) t8/t12
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: Same as CHEM-004: the 2-option cards are authored true/false probes of the 3-probe contract; whether they may count toward mastery is policy. A model-written two-option "why" card is no longer served (d5397b1). **2026-10-07 pass (2350ff6):** Owner decision 2026-10-07 ("practice only", applied where reachable): a correct answer on a 2-option card moves the lesson on but banks no verified mastery credit when the concept holds at least 3 authored cards with 3+ options (`turnContract.certifiesMastery`, hoisted once as `certifiedForMastery`; the pool is read by `assets/probePool.ts`, one concept, take 60). Where fewer exist (measured 2026-10-07: every Biology, English and CS concept, 166 Physics, 152 Chemistry, 22 Mathematics) a 2-option card still counts, by the same decision, until more 3+-option cards are authored. Test: src/tests/ownerDecisions20261007.test.ts.

### BIO-020 — A stock caption sentence ("Take a look at the figure/process/comparison beside this message — it shows <lesson title>. Follow it step by step.") is appended to replies that are not about the figure, including degraded fallbacks

- Severity: P3
- Category: UX
- Date/time: 2026-10-05 18:28 UTC
- Account: Account 1
- Biology concept: `bio.found.classification-need`
- Lesson/order: #3
- Learner message: explain again / why? (various)
- Tutor response: #3 t8, t15: a full analogy about wardrobes ends with "Take a look at the figure beside this message — it shows …". Also appended to degraded fallbacks, e.g. #102 t26 and #84 t1: "Sorry — my answer didn't come through just now… Take a look at the process beside this message — it shows The Integumentary System. Follow it step by step."
- Expected behaviour: No caption unless a new figure is being shown, or a caption that describes it (compare CHEM-034 in the Chemistry log).
- Actual behaviour: The same boilerplate line is added after unrelated text.
- Why it is a defect: Generic placeholder text; confusing when the reply has just apologised for a failure.
- Reproducibility: Counted automatically from all transcripts (see occurrences).
- Also observed (111 occurrences in 88 lessons): #3 (A1) t8/t15; #4 (A1) t19; #10 (A1) t15; #12 (A1) t1/t8; #13 (A1) t8; #15 (A1) t8; #18 (A1) t8; #19 (A1) t15; #183 (A10) t8; #186 (A10) t15; #188 (A10) t1/t8/t15; #189 (A10) t8/t15; #190 (A10) t8; #191 (A10) t15; #195 (A10) t8; #22 (A2) t8; #25 (A2) t8/t15; #26 (A2) t15; #27 (A2) t1/t8; #30 (A2) t15; #31 (A2) t15; #33 (A2) t1; #37 (A2) t8; #39 (A2) t15/t22; #41 (A3) t8; #42 (A3) t22; #44 (A3) t22; #45 (A3) t15; #46 (A3) t8; #47 (A3) t8; #51 (A3) t8; #52 (A3) t15; #55 (A3) t8/t15; #59 (A3) t8; #61 (A4) t8; #64 (A4) t8/t15; #65 (A4) t22; #67 (A4) t1; #69 (A4) t8; #71 (A4) t1/t15; #74 (A4) t1/t15; #76 (A4) t8; #77 (A4) t8; #78 (A4) t8; #79 (A4) t1/t8; #83 (A5) t8/t15; #84 (A5) t1/t8/t13; #85 (A5) t21; #86 (A5) t15; #87 (A5) t8; #88 (A5) t7; #89 (A5) t8; #92 (A5) t8; #93 (A5) t15; #94 (A5) t8/t15; #102 (A6) t8/t26; #104 (A6) t1; #105 (A6) t21; #106 (A6) t1; #108 (A6) t15; #109 (A6) t15; #111 (A6) t8; #127 (A7) t1; #128 (A7) t1; #129 (A7) t1; #131 (A7) t15; #132 (A7) t1/t15; #133 (A7) t8; #136 (A7) t22; #137 (A7) t22; #140 (A7) t8; #143 (A8) t8; #144 (A8) t8; #147 (A8) t8/t15; #149 (A8) t8; #150 (A8) t8/t15; #153 (A8) t8; #154 (A8) t8; #156 (A8) t8; #159 (A8) t8/t15; #162 (A9) t8; #164 (A9) t1; #166 (A9) t15/t22; #169 (A9) t1; #170 (A9) t15; #172 (A9) t8; #175 (A9) t15; #176 (A9) t15
- Related defect: —
- Status: FIXED
- Fix: c4a6afc — the stock line is appended only when a figure is introduced this turn, and figures were re-attached later in the same lesson; a figure already shown in this lesson (rendered-reality log, per lesson since CHEM-130) is not announced again unless the learner asked to see a picture. Degraded turns carry no pointer since 562c3c3. Test: src/tests/bioRealLearnerFixes.test.ts; visualAcknowledgement.test.ts updated.

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
- Also observed (3 occurrences in 3 lessons): #103 (A6) t17; #45 (A3) t15; #187 (A10) t16
- Notes on occurrences: #103 t17: "show me step by step" in Fertilisation and Embryonic Development -> a menstrual-cycle calendar walk-through (follicular phase, ovulation) · #45 t15: "show me step by step" in Alternative Splicing -> transcription "zipper" explanation · #187 t16: "show me step by step" in Social Behaviour and Eusociality -> flowers attracting bees (a courtship/display analogy)
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Step-by-step requests answered with a neighbouring concept (mitosis in a meiosis lesson). The step-shape check (CHEM-015) enforces steps, not the topic; no deterministic topic check exists. **2026-10-07 pass (2350ff6):** The lesson's KG syllabus line is now in the chat and opening prompts with the rule to teach each part, in order, before asking about it and to promise nothing outside it (`lessonDriftGuard.lessonScopeRule`). Prompt-level, so not guaranteed. Test: src/tests/remainingDefectFixes20261007.test.ts. The drift guard does not catch a neighbouring concept (mitosis in a meiosis lesson) because the two share words.

### BIO-022 — Markdown pipe tables in tutor replies; the lesson renderer has no table support

- Severity: P3
- Category: UX
- Date/time: 2026-10-05
- Account: Account 5
- Biology concept: `bio.physio.exercise-physiology`
- Lesson/order: #82
- Learner message: give me example with numbers
- Tutor response: "| Adaptation (from the figure) | Measured change after 8 weeks | |------|------|…"
- Expected behaviour: Plain sentences or a list.
- Actual behaviour: Raw pipes and dashes appear in the lesson.
- Why it is a defect: Unreadable (CHEM-065 equivalent).
- Reproducibility: Counted at the end.
- Also observed (6 occurrences in 6 lessons): #82 (A5) t11; #84 (A5) t7; #186 (A10) t9; #108 (A6) tnum; #177 (A9) tnum; #179 (A9) tnum
- Notes on occurrences: #82 t11: pipe table in numbers example · #84 t7: pipe table in "give me example with numbers" · #186 t9: pipe table (peacock tail) · #108 tnum: pipe table · #177 tnum: pipe table (mammalian reproductive strategies) · #179 tnum: pipe table (crow experiment)
- Related defect: —
- Status: FIXED
- Fix: d5397b1 (CHEM-065) — markdown pipe tables are rewritten as plain lines in the final reply sweep. Test: src/tests/bioRealLearnerFixes.test.ts.

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
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Observed once (#102 t20–t23). The drift sentences match English-subject assets (stress-timed rhythm, "The cat chased the mouse"), suggesting a cross-subject lookup, but the request logs are past the billing window and the DB connector was unauthorised this session. Related: PHYS-001 knowledge-gap fix (253d90a). **2026-10-07 pass (2350ff6):** Lesson drift guard (`lessonDriftGuard.ts`): a reply to a continuation message ("ok", "next", "give me example", "maybe yes") that is at least 25 words and names none of the concept's anchor words (KG title + syllabus line) is regenerated once with the lesson stated; the retry is kept only if it is on the lesson. Partial: a retry that drifts again is not replaced, and a neighbouring concept that shares the lesson's words is not detected. Test: src/tests/remainingDefectFixes20261007.test.ts.

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
- Status: OPEN — grounded prose check deployed 2026-10-10 (cf79346), the error class is not caught in production
- Fix: The stickleback example is model-written (no authored text gives the female the red belly); no deterministic check of biology facts in model prose exists. **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision). **2026-10-10 final closure campaign:** a grounded prose check now runs on model-written English replies that make concrete-case claims (examples, analogies, "give me an example"): a second model returns per-sentence verdicts against the concept's KG line and ACTIVE authored explanations/probes; a correction is applied only when its quote is verbatim in those sources, a doubted unhedged uncovered claim is removed (groundedProseCheck.ts; tests in finalDefectClosure20261010.test.ts, route behaviour in finalDefectClosureRoute20261010.test.ts). No authored source mentions sticklebacks, so a correction is impossible by design. Production evidence 2026-10-10 on dpl_BV8uceAYfB4Pu99ahYcMcpAuQQTb (76c2edd; the alias later moved to dpl_Fa3c1weGTWstXRH9YbWPdGywWFym = 82e3e89, a QA-script-only commit, same app code), disposable qa-*@mytutor-qa.invalid accounts, all deleted (re-login refused): "give me example" on this concept produced a sandpiper example (API run) and a great crested grebe example (/learn page) — the stickleback error did not recur, but the grebe example's sign stimulus (an orange throat patch shown by the female) is unsupported by any source and the checker passed it. Not fixed; see LIVE_REDRIVE_2026-10-10.md finding C-1.

### BIO-025 — Classification example: "Kingdom Animalia – about 30 million described animal species"

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05
- Account: Account 1
- Biology concept: `bio.found.classification-need`
- Lesson/order: #3
- Learner message: give me example with numbers
- Tutor response: "Kingdom Animalia – about 30 million described animal species. Phylum Chordata – ~65 000 species with a notochord…"
- Expected behaviour: About 1.5–2 million described animal species (estimates of all species, described or not, reach ~8–30 million).
- Actual behaviour: An estimate of total species is presented as the described count.
- Why it is a defect: Wrong order of magnitude for a basic figure.
- Reproducibility: Observed once (#3 t14).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-generated number; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### BIO-026 — The reply grades the previous card, not the one just answered ("That’s right—species is the most specific rank" to an answer about beetle genera)

- Severity: P1
- Category: Lesson flow
- Date/time: 2026-10-05
- Account: Account 1
- Biology concept: `bio.found.classification-need`
- Lesson/order: #3
- Learner message: The same genus — very high sequence similarity plus occasional interbreeding (to the two-beetle card)
- Tutor response: "That’s right—species is the most specific rank, so it includes the fewest organisms." (this was the feedback for the earlier "most specific rank" card); the next card follows.
- Expected behaviour: Feedback about genus/species and shared ranks for the beetle question.
- Actual behaviour: Verdict text belongs to an earlier card.
- Why it is a defect: The learner is told something unrelated to what they answered (CHEM-035 equivalent).
- Reproducibility: Observed once (#3 t7).
- Related defect: —
- Status: NOT REPRODUCED
- Fix: Live re-drive 2026-10-06: in #3 the "most specific rank" card got its own verdict ("Not quite — the answer is: Species") and the next card was not graded with it. Shared-session driver shape suspected (BIO-042). Kept open until BIO-042 is decided. **2026-10-07 pass (2350ff6):** Live re-drive 2026-10-06 with one tab id per lesson: each card got its own verdict (see the earlier Fix line).

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
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-generated numbers; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

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
- Also observed (2 occurrences in 2 lessons): #47 (A3) tnum; #67 (A4) tnum
- Notes on occurrences: #47 tnum: invented effect sizes presented as facts ("insulin doubles PFK-1 activity, triples glycogen synthase… glucose-6-phosphatase to 50 %") · #67 tnum: "A few thousand years ago the fastest cheetahs ran about 90 km/h… rose to 110" (invented arms-race data)
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Invented data in model examples; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

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
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-generated magnitudes; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

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
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-generated number; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

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
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model arithmetic/magnitude errors; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

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
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model arithmetic/sign errors; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

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
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-written plant-respiration example with O₂/CO₂ swapped; no authored text carries it. **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

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
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-generated magnitudes (the oak/arbuscular slip is model prose; the authored mycorrhiza entry is correct); numeric verification is CLOSED. **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### BIO-035 — More worked-example errors: nitrogen fixation off by ~10³ (10⁸ cells × 10⁻⁹ mol/cell/h = 0.1 mol/h, not "1 mmol/day"), nodule mass 2 g for a 5 mm nodule, tripalmitin MW ignoring condensation (860 vs 807), phage P1 infecting Streptococcus pneumoniae

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 22:41 UTC
- Account: Account 5
- Biology concept: `bio.plant.mycorrhizae-plant-symbioses (also #32, #132)`
- Lesson/order: #92
- Learner message: give me example with numbers
- Tutor response: #92: "roughly 10⁸ rhizobium cells… ~1 × 10⁻⁹ mol N · cell⁻¹ · hour⁻¹… capacity to fix about 1 mmol of nitrogen per day (≈14 mg)"; second example: "a 5 mm‑diameter nodule that can house roughly 2 g wet mass". #32: "tripalmitin… Total ≈ 92 + 768 = 860 g mol⁻¹". #132: "bacteriophage P1 infecting a donor Streptococcus pneumoniae that carries… tetM".
- Expected behaviour: #92: 10⁸ × 10⁻⁹ = 0.1 mol/h; a 5 mm sphere is ≈ 0.07 mL (~0.07 g). #32: three condensations remove 3 H₂O: 92 + 768 − 54 = 806–807 g/mol. #132: P1 is an E. coli phage.
- Actual behaviour: Multiplications off by three orders of magnitude, an impossible mass, a missing water loss, and a wrong host organism.
- Why it is a defect: Numbers and organisms given as fact do not hold up.
- Reproducibility: Seen in #92, #32, #132.
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model arithmetic errors; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### BIO-036 — Action-potential repolarisation: "pulling the voltage down roughly 1 mV for every 0.5 mM K⁺ that leaves"

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 22:47 UTC
- Account: Account 4
- Biology concept: `bio.physio.nervous-system`
- Lesson/order: #75
- Learner message: give me example with numbers
- Tutor response: "…K⁺ channels open, K⁺ ions rush out… This outward flow reduces the interior’s positivity, pulling the voltage down roughly 1 mV for every 0.5 mM K⁺ that leaves…"
- Expected behaviour: Membrane potential change comes from a tiny charge movement (≈10⁻⁵ of the ions), with no measurable change in bulk K⁺ concentration; no mV-per-mM rule applies.
- Actual behaviour: An invented linear rule between bulk concentration loss and voltage.
- Why it is a defect: Teaches a wrong mechanism for the numbers asked for.
- Reproducibility: Observed once (#75 num).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-generated number; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### BIO-037 — Microbiome example credits Bacteroides with turning fibre into vitamin K₂ and butyrate

- Severity: P3
- Category: Biology correctness
- Date/time: 2026-10-05
- Account: Account 7
- Biology concept: `bio.micro.human-microbiome-detail`
- Lesson/order: #135
- Learner message: give me example (with numbers)
- Tutor response: "…gut bacteria, such as Bacteroides species, turn the fiber you eat into vitamin K₂." ; "Bacteroides fragilis convert dietary fibers into short‑chain fatty acids… butyrate, is produced at roughly 15 mmol per day (about 1.2 grams)."
- Expected behaviour: Bacteroides mainly make acetate and propionate (butyrate comes largely from Firmicutes such as Faecalibacterium); vitamin K₂ (menaquinone) is synthesised by bacteria but not from fibre fermentation.
- Actual behaviour: Two different microbial functions are merged and attributed to one genus.
- Why it is a defect: Oversimplified/incorrect attribution presented as the lesson example.
- Reproducibility: Observed once (#135 ex, num).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-written microbiome claim; no authored text credits Bacteroides with K₂/butyrate. **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### BIO-038 — Neutrophil "ingest and destroy roughly 10⁶ bacteria per hour" each; transcription example sequence contains in-frame stop codons from codon 3

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05
- Account: Account 7
- Biology concept: `bio.immuno.innate-adaptive-immunity (also #37)`
- Lesson/order: #137
- Learner message: give me example with numbers
- Tutor response: #137: "Each neutrophil can ingest and destroy roughly 10⁶ bacteria per hour, so the early clean-up phase can eliminate about 10⁸ bacteria within the first 2 hours". #37: a "coding" DNA template shown as ATG GCT TAA GCT GGT AAG CAG TAA GTC TGA TAA…
- Expected behaviour: A neutrophil phagocytoses on the order of 10–20 bacteria; an example coding sequence should not contain TAA/TGA in frame.
- Actual behaviour: Overstated by ~10⁵ and a sequence that cannot be translated past codon 2.
- Why it is a defect: Example numbers/sequences undermine the concept being taught.
- Reproducibility: Observed in #137 and #37.
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-generated numbers/sequence; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### BIO-039 — Dollar amounts are turned into math delimiters: "At a market price of \(200 per cubic metre… = 5 × 100 × 200 = **\)100 000 per year**"

- Severity: P3
- Category: UX
- Date/time: 2026-10-05 23:13 UTC
- Account: Account 6
- Biology concept: `bio.eco.applied-ecology-ecosystem-services`
- Lesson/order: #120
- Learner message: give me example with numbers
- Tutor response: "…At a market price of \(200 per cubic metre, the timber value is 5 × 100 × 200 = **\)100 000 per year**."
- Expected behaviour: "$200 per cubic metre … $100 000 per year".
- Actual behaviour: The dollar signs were replaced by the renderer's inline-math delimiters \( and \), so the text shows stray backslashes and may hide characters.
- Why it is a defect: Currency becomes unreadable in the one example about money.
- Reproducibility: Observed once (#120 num).
- Related defect: —
- Status: FIXED
- Fix: c4a6afc — the single-dollar maths converter (mathDelimiters.ts) read "$200 per cubic metre … = **$100 000" as one maths span. A closing "$" followed by a digit is a currency sign, and an amount-led span that runs on in prose is prose. Real inline maths still converts. Test: src/tests/bioRealLearnerFixes.test.ts.

### BIO-040 — Organism/magnitude slips: trout gill area "30 cm²" (hundreds–thousands of cm²), "Selasphorus rufus (ruby‑throated hummingbird)" (S. rufus is the rufous hummingbird), monotreme "21 days" gestation

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05
- Account: Account 4
- Biology concept: `bio.physio.comparative-animal-physiology (also #178, #177)`
- Lesson/order: #80
- Learner message: give me example with numbers
- Tutor response: #80: "A typical trout has about 30 cm² of total gill lamellar surface area… volume ≈ 0.1 cm³… 300 cm⁻¹". #178: "the Selasphorus rufus (ruby‑throated hummingbird)". #177: table "Monotremes… 21 days (egg incubation)… Marsupials 30 days".
- Expected behaviour: Fish gill lamellar area is on the order of 10²–10³ cm² per 100 g; ruby-throated hummingbird is Archilochus colubris; platypus eggs incubate ~10 days after ~3–4 weeks in utero.
- Actual behaviour: Wrong magnitude or wrong species/common-name pairing.
- Why it is a defect: Specific facts given as real data are incorrect.
- Reproducibility: Observed in #80, #178, #177.
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model-generated magnitudes/names; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### BIO-041 — Vaccine efficacy misread: "95 % effective → about 950 of 1,000 vaccinated people develop protective immunity"; lac repressor Kd given as 0.1 µM

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05
- Account: Account 7
- Biology concept: `bio.immuno.vaccination-immunisation (also #39)`
- Lesson/order: #139
- Learner message: give me example with numbers
- Tutor response: #139: "Suppose the mRNA vaccine is 95 % effective. If 1,000 people are vaccinated, we would expect about 950 of them to develop protective immunity, while roughly 50 might still [get infected]". #39: "The lac repressor (LacI) binds the operator with a dissociation constant Kd ≈ 0.1 µM".
- Expected behaviour: Efficacy 95 % means a 95 % lower risk of disease than in the unvaccinated group, not that 95 % of people become immune; LacI–operator Kd is ~10⁻¹³–10⁻¹² M.
- Actual behaviour: A common misconception about efficacy is taught as the worked example; the Kd is off by about 10⁶.
- Why it is a defect: Wrong interpretation of a public-health figure and a wrong constant.
- Reproducibility: Observed in #139 and #39.
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: Model misreading of efficacy and a Kd; numeric verification is CLOSED (owner, 2026-10-04). **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### BIO-042 — Three lessons open at once on one account: all three are taught the content and figure of one of them

- Severity: P1
- Category: Concurrency/session isolation
- Date/time: 2026-10-05 18:54 UTC
- Account: Account 1
- Biology concept: `bio.found.* (3, 5, 8) and bio.physio/plant (85, 87, 90)`
- Lesson/order: #5
- Learner message: ok / give me example / quiz me (sent to each of 3 sessions in parallel)
- Tutor response: Probe 1, account 1, orders 3 (Need for Classification), 5 (Binomial Nomenclature), 8 (Levels of Biological Organisation): all three sessions returned the figure "Levels of Biological Organisation" and taught molecules → organelles → cells → tissues; #3 t3 "a real‑world example—the human body—…each level of biological organisation"; #5 t3 "the human heart… Molecules – Organelles –…". Probe 2, account 5, orders 85 (The Lymphatic System), 87 (Photosynthesis), 90 (Mineral Nutrition in Plants): all three returned the figure "Macronutrients vs. Micronutrients" and taught nitrogen/iron deficiency; #85 t3 "a corn seedling growing in soil that is low in nitrogen".
- Expected behaviour: Each session teaches its own lesson and serves its own figure.
- Actual behaviour: Per-account lesson context is shared by simultaneously open sessions; the lessons not named like the winning one never get their own opening content (the lymphatic system was taught as plant mineral nutrition).
- Why it is a defect: A learner with two tabs or two devices is taught the wrong lesson while progress is recorded against the lesson named in the session (same defect as CHEM-148 in the Chemistry log).
- Reproducibility: Reproduced 2 of 2 same-account probes (accounts 1 and 5). Cross-account: 4 accounts (1, 6, 7, 9) opened lesson #30 simultaneously with unique marker words — no foreign marker in any reply (the tutor never echoed its own marker either: weak evidence of isolation, not proof).
- Related defect: —
- Status: DEPLOYED — server path production-verified; private-mode browser path unverified
- Fix: f685494, deployed in 05b7868. Production 2026-10-06: two tab ids → two sessions; reload → same session per tab. The private-mode window.name fallback could not be exercised from the sandbox browser (egress proxy failures). Needs one real private-window check.

## Systemic observations (counts computed from the transcripts)

Computed over the 199 lesson transcripts (4,101 learner turns; one reply each):

- Reply provider: groq 3,544 (86 %), memory/authored 326 (8 %), degraded fallback 231 (6 %). No Gemini turns appeared (Biology
  ran Groq-only; contrast the Chemistry run, where Gemini served 18 %).
- Cards (mcq) shown: 937; 2 options 290 (31 %), 3 options 116, 4 options 531 — noticeably better than Chemistry's 61 % 2-option cards.
- Lesson close: 199 of 199 closed; 50 as "mastered", 149 as "needs review" ("Let's pause … worth another look later") — 75 %
  of lessons ended on a pause (BIO-002).
- Lessons with a figure: 199 of 199 (every lesson served one; BIO-017 and BIO-021 record wrong-concept or untitled ones).
- Per account (lessons / learner turns / mastered / needs-review): A1 20/385/4/16 · A2 20/392/6/14 · A3 20/407/5/15 ·
  A4 20/380/6/14 · A5 20/397/6/14 · A6 20/377/6/14 · A7 20/406/5/15 · A8 20/400/4/16 · A9 20/401/3/17 · A10 19/357/5/14.
  (Accounts see different parts of the curriculum, so these are not a comparison between accounts.)

## Concurrency and isolation tests

- **Same account, three sessions at once** (accounts 1 and 5, 12 interleaved turns per session): in both probes the sessions
  were taught **one lesson's content and figure instead of their own** (**BIO-042**, P1; reproduced 2/2). Single sessions
  of the same lessons taught their own content in the main run.
- **Different accounts at once**: ten accounts ran different lessons simultaneously for the whole run, and four accounts (1, 6, 7, 9)
  opened the **same** lesson (#30) together with a unique marker word each ("Zorbax<N>Quill"). No marker or content from
  another account appeared in any reply. The tutor never echoed a learner's own marker either, so this is **weak evidence of
  isolation, not a proof**; progress records were not read from the database (not tested).
- Blocked: none persisted; no lesson was left unstudied.
- Cross-subject: **uncertain** — #102 drifted to music/English rhythm after the words "rhythm method" (BIO-023); the English
  subject's transcripts were not inspected, so context bleed from another subject is not established.

## Coverage by lesson

Result per account in brackets: turns driven, and how the lesson closed (mastered / needs-review = "Let's pause … worth another look later").
"figure none" means no figure channel was returned on any turn.

| # | concept | lesson | accounts (turns, result) | figure | defects referencing |
|---|---|---|---|---|---|
| 1 | `bio.found.what-is-biology` | What is Biology | A1 (18t, mastered) | yes | BIO-003, BIO-004, BIO-005, BIO-006, BIO-007, BIO-008, BIO-016, BIO-018, BIO-019 |
| 2 | `bio.found.characteristics-of-life` | Characteristics of Living Organisms | A1 (20t, needs-review) | yes | BIO-003, BIO-008, BIO-010, BIO-015, BIO-018, BIO-019 |
| 3 | `bio.found.classification-need` | Need for Classification | A1 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-010, BIO-015, BIO-018, BIO-019, BIO-020, BIO-025, BIO-026 |
| 4 | `bio.found.five-kingdom` | Five Kingdom Classification | A1 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-020 |
| 5 | `bio.found.binomial-nomenclature` | Binomial Nomenclature | A1 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-042 |
| 6 | `bio.found.viruses-viroids-lichens` | Viruses, Viroids and Lichens | A1 (15t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019 |
| 7 | `bio.found.microscopy-basics` | Microscopy and Laboratory Techniques | A1 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 8 | `bio.found.biomes-levels-of-organisation` | Levels of Biological Organisation | A1 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019, BIO-031 |
| 9 | `bio.found.scientific-method-in-biology` | The Scientific Method in Biology | A1 (14t, needs-review) | yes | BIO-002, BIO-005, BIO-007, BIO-008, BIO-016, BIO-018, BIO-019 |
| 10 | `bio.found.unifying-themes-in-biology` | Unifying Themes in Biology | A1 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-016, BIO-019, BIO-020 |
| 11 | `bio.cell.cell-theory` | Cell Theory | A1 (12t, needs-review) | yes | BIO-005, BIO-008, BIO-018, BIO-019 |
| 12 | `bio.cell.prokaryotic-cell` | Prokaryotic Cell Structure | A1 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-016, BIO-018, BIO-019, BIO-020 |
| 13 | `bio.cell.eukaryotic-cell` | Eukaryotic Cell Structure | A1 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-006, BIO-018, BIO-019, BIO-020 |
| 14 | `bio.cell.cell-membrane-transport` | Cell Membrane and Transport | A1 (15t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 15 | `bio.cell.nucleus-chromosomes` | Nucleus and Chromosomes | A1 (18t, mastered) | yes | BIO-003, BIO-005, BIO-016, BIO-018, BIO-019, BIO-020 |
| 16 | `bio.cell.mitochondria-energy` | Mitochondria and Energy Organelles | A1 (30t, needs-review) | yes | BIO-001, BIO-002, BIO-003, BIO-004, BIO-018, BIO-019 |
| 17 | `bio.cell.chloroplast-structure` | Chloroplast Structure | A1 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-008 |
| 18 | `bio.cell.endomembrane-system` | Endomembrane System | A1 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-019, BIO-020 |
| 19 | `bio.cell.cytoskeleton` | Cytoskeleton and Cell Motility | A1 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019, BIO-020 |
| 20 | `bio.cell.cell-cycle` | The Cell Cycle | A1 (14t, mastered) | yes | BIO-003, BIO-016, BIO-018, BIO-019 |
| 21 | `bio.cell.mitosis` | Mitosis | A2 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-011, BIO-018, BIO-019 |
| 22 | `bio.cell.meiosis` | Meiosis | A2 (13t, mastered) | yes | BIO-003, BIO-005, BIO-010, BIO-018, BIO-019, BIO-020, BIO-021 |
| 23 | `bio.cell.cell-signalling` | Cell Signalling | A2 (16t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-018, BIO-019 |
| 24 | `bio.cell.apoptosis` | Apoptosis and Programmed Cell Death | A2 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-006, BIO-008, BIO-018, BIO-019 |
| 25 | `bio.cell.anaerobic-respiration-fermentation` | Anaerobic Respiration and Fermentation | A2 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-007, BIO-008, BIO-018, BIO-019, BIO-020 |
| 26 | `bio.cell.cancer-biology-hallmarks` | Hallmarks of Cancer | A2 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-019, BIO-020 |
| 27 | `bio.cell.cell-adhesion-tissue-organization` | Cell Adhesion and Tissue Organisation | A2 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-018, BIO-019, BIO-020 |
| 28 | `bio.cell.cell-junctions-extracellular-matrix` | Cell Junctions and the Extracellular Matrix | A2 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019 |
| 29 | `bio.cell.cytoskeleton-motility` | Cytoskeletal Motility | A2 (15t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-018, BIO-019 |
| 30 | `bio.cell.membrane-transport-energetics` | Energetics of Membrane Transport | A2 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-018, BIO-019, BIO-020, BIO-032 |
| 31 | `bio.mol.biomolecule-types` | Types of Biomolecules | A2 (27t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019, BIO-020 |
| 32 | `bio.mol.carbohydrates-lipids` | Carbohydrates and Lipids | A2 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 33 | `bio.mol.proteins-structure` | Proteins and Protein Structure | A2 (17t, mastered) | yes | BIO-003, BIO-018, BIO-019, BIO-020 |
| 34 | `bio.mol.enzymes` | Enzymes and Enzyme Kinetics | A2 (28t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-018, BIO-019 |
| 35 | `bio.mol.nucleic-acid-structure` | Nucleic Acid Structure | A2 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 36 | `bio.mol.dna-replication` | DNA Replication | A2 (14t, mastered) | yes | BIO-005, BIO-018, BIO-019 |
| 37 | `bio.mol.transcription` | Transcription | A2 (18t, needs-review) | yes | BIO-003, BIO-005, BIO-016, BIO-018, BIO-019, BIO-020 |
| 38 | `bio.mol.translation-genetic-code` | Translation and the Genetic Code | A2 (13t, needs-review) | yes | BIO-002, BIO-003, BIO-019 |
| 39 | `bio.mol.gene-regulation` | Regulation of Gene Expression | A2 (26t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019, BIO-020 |
| 40 | `bio.mol.epigenetics` | Epigenetics and Chromatin Regulation | A2 (11t, mastered) | yes | BIO-018, BIO-019 |
| 41 | `bio.mol.noncoding-rna` | Non-coding RNA Biology | A3 (20t, needs-review) | yes | BIO-001, BIO-002, BIO-003, BIO-005, BIO-006, BIO-018, BIO-019, BIO-020 |
| 42 | `bio.mol.signal-transduction-pathways` | Core Signal Transduction Pathways | A3 (24t, needs-review) | yes | BIO-001, BIO-002, BIO-003, BIO-004, BIO-005, BIO-008, BIO-019, BIO-020 |
| 43 | `bio.mol.dna-damage-repair` | DNA Damage Response and Repair | A3 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-006, BIO-008, BIO-018, BIO-019 |
| 44 | `bio.mol.bioenergetics` | Bioenergetics and Thermodynamics of Life | A3 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-008, BIO-020 |
| 45 | `bio.mol.alternative-splicing-rna-diversity` | Alternative Splicing and RNA Diversity | A3 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-008, BIO-016, BIO-018, BIO-019, BIO-020, BIO-021, BIO-028 |
| 46 | `bio.mol.chromatin-structure-genome-organization` | Chromatin Structure and 3D Genome Organisation | A3 (15t, needs-review) | yes | BIO-003, BIO-005, BIO-007, BIO-018, BIO-019, BIO-020 |
| 47 | `bio.mol.metabolic-regulation-integration` | Metabolic Regulation and Integration | A3 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-018, BIO-019, BIO-020, BIO-028 |
| 48 | `bio.mol.protein-quality-control-autophagy` | Protein Quality Control and Autophagy | A3 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-018, BIO-019 |
| 49 | `bio.gen.mendelian-genetics` | Mendelian Genetics | A3 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-006, BIO-008, BIO-012, BIO-018, BIO-019 |
| 50 | `bio.gen.gene-interactions` | Gene Interactions and Extensions of Mendelism | A3 (17t, mastered) | yes | BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 51 | `bio.gen.chromosomal-theory-linkage` | Chromosomal Theory and Linkage | A3 (13t, mastered) | yes | BIO-018, BIO-019, BIO-020 |
| 52 | `bio.gen.pedigree-human-genetics` | Pedigree Analysis and Human Genetic Disorders | A3 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-012, BIO-020 |
| 53 | `bio.gen.mutations` | Mutations | A3 (18t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019 |
| 54 | `bio.gen.population-genetics` | Population Genetics | A3 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-016, BIO-019 |
| 55 | `bio.gen.genetic-engineering` | Genetic Engineering and Recombinant DNA | A3 (20t, mastered) | yes | BIO-003, BIO-018, BIO-019, BIO-020 |
| 56 | `bio.gen.transposable-elements` | Transposable Elements and Genome Organisation | A3 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-019 |
| 57 | `bio.gen.conservation-genetics` | Conservation Genetics | A3 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019 |
| 58 | `bio.gen.genetic-testing-counseling` | Genetic Testing and Counselling | A3 (14t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 59 | `bio.gen.quantitative-genetics-heritability` | Quantitative Genetics and Heritability | A3 (22t, needs-review) | yes | BIO-003, BIO-005, BIO-006, BIO-007, BIO-019, BIO-020 |
| 60 | `bio.evo.origin-of-life` | Origin of Life | A3 (21t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019 |
| 61 | `bio.evo.evidence-for-evolution` | Evidence for Evolution | A4 (19t, needs-review) | yes | BIO-001, BIO-002, BIO-003, BIO-004, BIO-006, BIO-009, BIO-010, BIO-018, BIO-019, BIO-020 |
| 62 | `bio.evo.natural-selection` | Natural Selection and Darwinism | A4 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-006, BIO-008, BIO-011, BIO-016, BIO-018, BIO-019 |
| 63 | `bio.evo.modern-synthesis-speciation` | Modern Synthesis and Speciation | A4 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 64 | `bio.evo.human-evolution` | Human Evolution | A4 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-020 |
| 65 | `bio.evo.molecular-evolution` | Molecular Evolution and Neutral Theory | A4 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-008, BIO-018, BIO-019, BIO-020 |
| 66 | `bio.evo.evo-devo` | Evolutionary Developmental Biology | A4 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 67 | `bio.evo.coevolution-species-interactions` | Coevolution and Species Interactions | A4 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-020, BIO-028 |
| 68 | `bio.evo.convergent-evolution-homoplasy` | Convergent Evolution and Homoplasy | A4 (7t, mastered) | yes | BIO-019 |
| 69 | `bio.evo.macroevolution-extinction` | Macroevolution and Mass Extinction | A4 (15t, mastered) | yes | BIO-003, BIO-005, BIO-016, BIO-019, BIO-020 |
| 70 | `bio.evo.phylogeography-biogeography` | Phylogeography and Historical Biogeography | A4 (13t, needs-review) | yes | BIO-002, BIO-018, BIO-019 |
| 71 | `bio.physio.digestive-system` | Human Digestive System | A4 (20t, mastered) | yes | BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-020 |
| 72 | `bio.physio.respiratory-system` | Human Respiratory System | A4 (27t, mastered) | yes | BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-034 |
| 73 | `bio.physio.circulatory-system` | Human Circulatory System | A4 (21t, mastered) | yes | BIO-003, BIO-018, BIO-019 |
| 74 | `bio.physio.excretory-system` | Excretory System and Osmoregulation | A4 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-019, BIO-020 |
| 75 | `bio.physio.nervous-system` | Nervous System and Neural Control | A4 (14t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019, BIO-036 |
| 76 | `bio.physio.endocrine-system` | Endocrine System | A4 (16t, needs-review) | yes | BIO-003, BIO-010, BIO-019, BIO-020 |
| 77 | `bio.physio.musculoskeletal-system` | Locomotion and Musculoskeletal System | A4 (13t, needs-review) | yes | BIO-005, BIO-012, BIO-016, BIO-018, BIO-019, BIO-020 |
| 78 | `bio.physio.immune-system-intro` | Immune System Overview | A4 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019, BIO-020 |
| 79 | `bio.physio.blood-physiology-hemostasis` | Blood Physiology and Haemostasis | A4 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-006, BIO-018, BIO-019, BIO-020 |
| 80 | `bio.physio.comparative-animal-physiology` | Comparative Animal Physiology | A4 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019, BIO-040 |
| 81 | `bio.physio.endocrine-disorders-feedback` | Endocrine Disorders and Feedback Pathology | A5 (14t, mastered) | yes | BIO-003, BIO-004, BIO-007, BIO-011, BIO-018, BIO-019 |
| 82 | `bio.physio.exercise-physiology` | Exercise Physiology | A5 (18t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-011, BIO-018, BIO-019, BIO-022 |
| 83 | `bio.physio.homeostasis-thermoregulation` | Homeostasis and Thermoregulation | A5 (21t, needs-review) | yes | BIO-002, BIO-005, BIO-008, BIO-011, BIO-018, BIO-019, BIO-020 |
| 84 | `bio.physio.integumentary-system` | The Integumentary System | A5 (29t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-008, BIO-010, BIO-019, BIO-020, BIO-022 |
| 85 | `bio.physio.lymphatic-system-detail` | The Lymphatic System | A5 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-018, BIO-019, BIO-020, BIO-027 |
| 86 | `bio.physio.muscle-physiology-energetics` | Muscle Physiology and Energetics | A5 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-008, BIO-012, BIO-018, BIO-019, BIO-020, BIO-029 |
| 87 | `bio.plant.photosynthesis` | Photosynthesis | A5 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-020 |
| 88 | `bio.plant.plant-respiration` | Respiration in Plants | A5 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-020, BIO-033 |
| 89 | `bio.plant.plant-water-relations` | Plant Water Relations | A5 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-010, BIO-018, BIO-019, BIO-020 |
| 90 | `bio.plant.mineral-nutrition` | Mineral Nutrition in Plants | A5 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 91 | `bio.plant.plant-growth-hormones` | Plant Growth and Hormones | A5 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 92 | `bio.plant.mycorrhizae-plant-symbioses` | Mycorrhizae and Root Symbioses | A5 (18t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019, BIO-020, BIO-035 |
| 93 | `bio.plant.phytochrome-photoperiodic-flowering` | Phytochrome and the Molecular Basis of Photoperiodic Flowering | A5 (27t, mastered) | yes | BIO-001, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019, BIO-020 |
| 94 | `bio.plant.plant-biotechnology-applications` | Plant Biotechnology Applications | A5 (19t, mastered) | yes | BIO-003, BIO-005, BIO-007, BIO-018, BIO-019, BIO-020 |
| 95 | `bio.plant.plant-defense-mechanisms` | Plant Defence Mechanisms | A5 (13t, needs-review) | yes | BIO-002, BIO-003, BIO-019 |
| 96 | `bio.plant.plant-stress-physiology` | Plant Stress Physiology | A5 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 97 | `bio.plant.plant-tissue-systems` | Plant Tissue Systems | A5 (8t, mastered) | yes | BIO-007, BIO-019 |
| 98 | `bio.plant.secondary-growth-anatomy` | Secondary Growth and Plant Anatomy | A5 (14t, mastered) | yes | BIO-003, BIO-005, BIO-007, BIO-018, BIO-019 |
| 99 | `bio.plant.seed-germination-dormancy` | Seed Germination and Dormancy | A5 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019 |
| 100 | `bio.repro.asexual-reproduction` | Asexual Reproduction | A5 (21t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019 |
| 101 | `bio.repro.sexual-reproduction-plants` | Sexual Reproduction in Flowering Plants | A6 (18t, mastered) | yes | BIO-003, BIO-004, BIO-005, BIO-011, BIO-018, BIO-019 |
| 102 | `bio.repro.human-reproductive-system` | Human Reproductive System | A6 (28t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-010, BIO-015, BIO-018, BIO-019, BIO-020, BIO-023 |
| 103 | `bio.repro.fertilisation-development` | Fertilisation and Embryonic Development | A6 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-011, BIO-019, BIO-021 |
| 104 | `bio.repro.reproductive-health` | Reproductive Health and Contraception | A6 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-020 |
| 105 | `bio.repro.animal-reproductive-strategies` | Comparative Animal Reproductive Strategies | A6 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-016, BIO-018, BIO-019, BIO-020 |
| 106 | `bio.repro.hormonal-regulation-reproduction-detail` | Hormonal Regulation of Reproduction | A6 (15t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019, BIO-020 |
| 107 | `bio.dev.gametogenesis-fertilisation-dev` | Fundamentals of Animal Development | A6 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 108 | `bio.dev.morphogenesis-differentiation` | Morphogenesis and Cell Differentiation | A6 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-008, BIO-016, BIO-018, BIO-019, BIO-020, BIO-022 |
| 109 | `bio.dev.stem-cells-regeneration` | Stem Cells and Regeneration | A6 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-008, BIO-010, BIO-019, BIO-020 |
| 110 | `bio.dev.aging-senescence-biology` | Biology of Ageing and Senescence | A6 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-008, BIO-019 |
| 111 | `bio.dev.organogenesis` | Organogenesis | A6 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-019, BIO-020 |
| 112 | `bio.dev.regeneration-biology` | Regeneration Biology | A6 (16t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 113 | `bio.eco.organism-environment` | Organisms and their Environment | A6 (9t, needs-review) | yes | BIO-003, BIO-005, BIO-018, BIO-019 |
| 114 | `bio.eco.population-ecology` | Population Ecology | A6 (13t, mastered) | yes | BIO-005, BIO-019 |
| 115 | `bio.eco.ecosystem-structure-function` | Ecosystem Structure and Function | A6 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-019 |
| 116 | `bio.eco.nutrient-cycling` | Nutrient Cycling and Succession | A6 (8t, mastered) | yes | BIO-019 |
| 117 | `bio.eco.biodiversity-conservation` | Biodiversity and Conservation | A6 (8t, mastered) | yes | BIO-019 |
| 118 | `bio.eco.environmental-issues` | Environmental Issues and Pollution | A6 (14t, mastered) | yes | BIO-018, BIO-019 |
| 119 | `bio.eco.community-ecology` | Community Ecology | A6 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-019 |
| 120 | `bio.eco.applied-ecology-ecosystem-services` | Applied Ecology and Ecosystem Services | A6 (19t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019, BIO-039 |
| 121 | `bio.eco.biogeochemistry-advanced` | Advanced Biogeochemical Cycling | A7 (22t, mastered) | yes | BIO-001, BIO-003, BIO-004, BIO-006, BIO-016, BIO-017, BIO-018, BIO-019 |
| 122 | `bio.eco.global-change-biology` | Global Change Biology | A7 (12t, mastered) | yes | BIO-005, BIO-007, BIO-008, BIO-016, BIO-018, BIO-019 |
| 123 | `bio.eco.landscape-conservation-ecology` | Landscape and Conservation Ecology | A7 (19t, mastered) | yes | BIO-003, BIO-005, BIO-006, BIO-008, BIO-017, BIO-018, BIO-019 |
| 124 | `bio.eco.microbial-ecology` | Microbial Ecology | A7 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-017, BIO-018, BIO-019 |
| 125 | `bio.eco.population-growth-models-quantitative` | Quantitative Models of Population Growth | A7 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-017, BIO-018, BIO-019 |
| 126 | `bio.eco.predator-prey-dynamics` | Predator-Prey Population Dynamics | A7 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-017, BIO-019 |
| 127 | `bio.micro.microbial-diversity` | Microbial Diversity | A7 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-019, BIO-020 |
| 128 | `bio.micro.microbial-growth-culture` | Microbial Growth and Culture Techniques | A7 (22t, needs-review) | yes | BIO-001, BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-020 |
| 129 | `bio.micro.microbes-in-human-welfare` | Microbes in Human Welfare | A7 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-020 |
| 130 | `bio.micro.pathogenic-microbes` | Pathogenic Microorganisms and Disease | A7 (18t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 131 | `bio.micro.viral-replication` | Viral Replication and Lifecycle | A7 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-019, BIO-020 |
| 132 | `bio.micro.horizontal-gene-transfer` | Horizontal Gene Transfer | A7 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-010, BIO-018, BIO-019, BIO-020 |
| 133 | `bio.micro.antimicrobial-resistance` | Antimicrobial Resistance | A7 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-010, BIO-019, BIO-020 |
| 134 | `bio.micro.archaea-extremophiles` | Archaea and Extremophiles | A7 (8t, mastered) | yes | BIO-007, BIO-019 |
| 135 | `bio.micro.human-microbiome-detail` | The Human Microbiome | A7 (16t, needs-review) | yes | BIO-002, BIO-005, BIO-007, BIO-016, BIO-018, BIO-019, BIO-037 |
| 136 | `bio.micro.microbial-metabolism-diversity` | Diversity of Microbial Metabolism | A7 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-007, BIO-018, BIO-019, BIO-020 |
| 137 | `bio.immuno.innate-adaptive-immunity` | Innate and Adaptive Immunity | A7 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-006, BIO-018, BIO-019, BIO-020, BIO-038 |
| 138 | `bio.immuno.antibody-structure-function` | Antibody Structure and Function | A7 (17t, mastered) | yes | BIO-003, BIO-005, BIO-019 |
| 139 | `bio.immuno.vaccination-immunisation` | Vaccination and Immunisation | A7 (16t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019, BIO-041 |
| 140 | `bio.immuno.immune-disorders` | Immune Disorders | A7 (18t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019, BIO-020 |
| 141 | `bio.immuno.mhc-antigen-presentation` | MHC and Antigen Presentation | A8 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-010, BIO-012, BIO-018, BIO-019 |
| 142 | `bio.immuno.cancer-immunology-immunotherapy` | Cancer Immunology and Immunotherapy | A8 (15t, mastered) | yes | BIO-001, BIO-003, BIO-016, BIO-018, BIO-019 |
| 143 | `bio.immuno.cytokines-immune-signaling` | Cytokines and Immune Cell Signalling | A8 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-008, BIO-011, BIO-015, BIO-019, BIO-020 |
| 144 | `bio.immuno.t-cell-development-tolerance` | T-Cell Development and Immune Tolerance | A8 (24t, needs-review) | yes | BIO-003, BIO-005, BIO-007, BIO-008, BIO-016, BIO-019, BIO-020 |
| 145 | `bio.biotech.biotech-principles` | Principles of Biotechnology | A8 (18t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-011, BIO-019 |
| 146 | `bio.biotech.biotech-process-applications` | Biotechnology Process Applications | A8 (13t, mastered) | yes | BIO-003, BIO-005, BIO-008, BIO-019 |
| 147 | `bio.biotech.genomics-proteomics` | Genomics and Proteomics | A8 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-019, BIO-020 |
| 148 | `bio.biotech.crispr-genome-editing` | CRISPR and Genome Editing | A8 (14t, needs-review) | yes | BIO-002, BIO-008, BIO-018, BIO-019 |
| 149 | `bio.biotech.agricultural-forensic-biotechnology` | Agricultural and Forensic Biotechnology | A8 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-006, BIO-008, BIO-018, BIO-019, BIO-020 |
| 150 | `bio.biotech.bioprocess-engineering` | Bioprocess Engineering | A8 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019, BIO-020 |
| 151 | `bio.biotech.gene-therapy-detail` | Gene Therapy | A8 (16t, mastered) | yes | BIO-003, BIO-005, BIO-016, BIO-018, BIO-019 |
| 152 | `bio.bioinfo.bioinformatics-intro` | Introduction to Bioinformatics | A8 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 153 | `bio.bioinfo.sequence-alignment` | Sequence Alignment | A8 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-016, BIO-018, BIO-019, BIO-020 |
| 154 | `bio.bioinfo.phylogenetics-computational` | Computational Phylogenetics | A8 (10t, needs-review) | yes | BIO-002, BIO-019, BIO-020 |
| 155 | `bio.bioinfo.structural-bioinformatics` | Structural Bioinformatics | A8 (26t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-018, BIO-019 |
| 156 | `bio.bioinfo.comparative-genomics` | Comparative Genomics | A8 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-018, BIO-019, BIO-020 |
| 157 | `bio.bioinfo.genome-sequencing-technologies` | Genome Sequencing Technologies | A8 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-019 |
| 158 | `bio.bioinfo.multiomics-statistical-genomics` | Multi-Omics and Statistical Genomics | A8 (30t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-018, BIO-019 |
| 159 | `bio.sys.systems-biology-intro` | Introduction to Systems Biology | A8 (21t, mastered) | yes | BIO-003, BIO-004, BIO-005, BIO-018, BIO-019, BIO-020 |
| 160 | `bio.sys.gene-regulatory-networks` | Gene Regulatory Networks | A8 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 161 | `bio.sys.metabolic-network-modelling` | Metabolic Network Modelling | A9 (18t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-006, BIO-013, BIO-018, BIO-019 |
| 162 | `bio.sys.synthetic-biology` | Synthetic Biology | A9 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-018, BIO-019, BIO-020 |
| 163 | `bio.sys.evolutionary-systems-biology` | Evolutionary Systems Biology | A9 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019 |
| 164 | `bio.sys.quantitative-systems-modeling` | Quantitative Modelling of Biological Systems | A9 (24t, needs-review) | yes | BIO-003, BIO-005, BIO-007, BIO-008, BIO-011, BIO-019, BIO-020 |
| 165 | `bio.div.three-domain-system` | Three Domain System | A9 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-018, BIO-019 |
| 166 | `bio.div.endosymbiotic-theory` | Endosymbiotic Theory | A9 (24t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-018, BIO-019, BIO-020 |
| 167 | `bio.div.protist-diversity` | Eukaryotic Supergroups and Protist Diversity | A9 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-019 |
| 168 | `bio.div.fungal-biology` | Fungal Biology | A9 (17t, needs-review) | yes | BIO-002, BIO-003, BIO-008, BIO-010, BIO-019 |
| 169 | `bio.div.plant-diversity-alternation-of-generations` | Plant Diversity and Alternation of Generations | A9 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-006, BIO-008, BIO-018, BIO-019, BIO-020 |
| 170 | `bio.div.cladistics-phylogenetic-thinking` | Cladistics and Phylogenetic Thinking | A9 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-016, BIO-018, BIO-019, BIO-020 |
| 171 | `bio.div.animal-body-plans-symmetry` | Animal Body Plans and Symmetry | A9 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019 |
| 172 | `bio.div.arthropod-diversity` | Arthropod Diversity | A9 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019, BIO-020 |
| 173 | `bio.div.chordate-vertebrate-diversity` | Chordate and Vertebrate Diversity Overview | A9 (16t, mastered) | yes | BIO-003, BIO-005, BIO-018, BIO-019 |
| 174 | `bio.div.echinoderm-deuterostome-diversity` | Echinoderms and Deuterostome Diversity | A9 (11t, mastered) | yes | BIO-007, BIO-019 |
| 175 | `bio.div.fish-amphibian-diversity` | Fish and Amphibian Diversity | A9 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019, BIO-020 |
| 176 | `bio.div.invertebrate-diversity-major-phyla` | Invertebrate Diversity: Major Phyla | A9 (19t, mastered) | yes | BIO-001, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019, BIO-020 |
| 177 | `bio.div.mammalian-diversity` | Mammalian Diversity | A9 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-019, BIO-022 |
| 178 | `bio.div.reptile-bird-diversity` | Reptile and Bird Diversity | A9 (16t, needs-review) | yes | BIO-002, BIO-003, BIO-018, BIO-019 |
| 179 | `bio.behav.animal-cognition` | Animal Cognition | A9 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-019, BIO-022 |
| 180 | `bio.behav.animal-communication` | Animal Communication | A9 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-018, BIO-019 |
| 181 | `bio.behav.foraging-behavior` | Foraging Behaviour | A10 (7t, mastered) | yes | BIO-014, BIO-015, BIO-016, BIO-019 |
| 182 | `bio.behav.human-behavioral-ecology-evolutionary-psych` | Human Behavioural Ecology and Evolutionary Psychology | A10 (27t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-018, BIO-019 |
| 183 | `bio.behav.innate-behavior-instinct` | Innate Behaviour and Instinct | A10 (17t, needs-review) | yes | BIO-003, BIO-005, BIO-006, BIO-007, BIO-008, BIO-018, BIO-019, BIO-020, BIO-024 |
| 184 | `bio.behav.kin-selection-altruism` | Kin Selection and Altruism | A10 (8t, mastered) | yes | BIO-019 |
| 185 | `bio.behav.learning-and-behavior` | Learning and Behaviour | A10 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-006, BIO-008 |
| 186 | `bio.behav.mating-systems-sexual-selection` | Mating Systems and Sexual Selection | A10 (21t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-008, BIO-018, BIO-019, BIO-020, BIO-022 |
| 187 | `bio.behav.social-behavior-eusociality` | Social Behaviour and Eusociality | A10 (25t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-021 |
| 188 | `bio.neuro.audition-vestibular-system` | Audition and the Vestibular System | A10 (23t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-008, BIO-020, BIO-030 |
| 189 | `bio.neuro.autonomic-stress-physiology` | Autonomic and Stress Physiology | A10 (30t, no-complete) | yes | BIO-003, BIO-005, BIO-008, BIO-018, BIO-019, BIO-020 |
| 190 | `bio.neuro.brain-regional-organization` | Regional Organisation of the Brain | A10 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005, BIO-007, BIO-008, BIO-019, BIO-020 |
| 191 | `bio.neuro.cognitive-neuroscience-consciousness` | Cognitive Neuroscience and Consciousness | A10 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-008, BIO-018, BIO-019, BIO-020 |
| 192 | `bio.neuro.learning-memory-neurobiology` | The Neurobiology of Learning and Memory | A10 (9t, needs-review) | yes | BIO-002, BIO-019 |
| 193 | `bio.neuro.neural-circuits-computation` | Neural Circuits and Computation | A10 (14t, needs-review) | yes | BIO-002, BIO-003, BIO-007, BIO-018, BIO-019 |
| 194 | `bio.neuro.neurodegenerative-disease` | Neurodegenerative Disease | A10 (10t, mastered) | yes | BIO-007, BIO-018, BIO-019 |
| 195 | `bio.neuro.neurodevelopment` | Neurodevelopment | A10 (20t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-010, BIO-020 |
| 196 | `bio.neuro.neurotransmitter-systems` | Neurotransmitter Systems | A10 (22t, needs-review) | yes | BIO-002, BIO-003, BIO-004, BIO-005 |
| 197 | `bio.neuro.sensory-transduction` | Sensory Transduction | A10 (21t, mastered) | yes | BIO-003, BIO-005, BIO-007, BIO-018, BIO-019 |
| 198 | `bio.neuro.sleep-circadian-biology` | Sleep and Circadian Biology | A10 (20t, mastered) | yes | BIO-003, BIO-007, BIO-008, BIO-018, BIO-019 |
| 199 | `bio.neuro.vision-visual-system` | The Visual System | A10 (19t, needs-review) | yes | BIO-002, BIO-003, BIO-005, BIO-007, BIO-019 |


## Not counted as defects

- Learning difficulty: advanced molecular/systems lessons were hard for a weak-English persona; that is not a defect.
- Persona artefacts: scripted quotations of taught text as "answers" were sometimes praised.
