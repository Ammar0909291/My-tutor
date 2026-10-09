# English Real-Learner Defects

<!-- SUMMARY:START -->
## Summary (generated from the entries below; counts verified automatically)

- Total lessons in English curriculum (`/api/curriculum?subject=english`): 216
- Total lessons studied (full lesson session driven, ≥3 turns): 216
- Total lessons covered (≥1 account): 216  (100.0 %)
- Total defects: 17
- P0: 0
- P1: 1
- P2: 12
- P3: 4
- Status (2026-10-07 pass, 2350ff6; nothing in this pass is production-verified — Vercel deploys blocked; totals = 17 entries):
  - FIXED IN REPO: 10
  - PARTIALLY FIXED IN REPO: 6
  - NOT A DEFECT: 1
<!-- SUMMARY:END -->

## Scope

The complete English curriculum of the deployed app (`my-tutor-flame.vercel.app`), following the app's own lesson order
(`GET /api/curriculum?subject=english`, 216 lessons), studied as a weak learner by ten owner-supplied test accounts working
**in parallel**. This is a **discovery log**: no application code, prompt, KG, EB, Blueprint, curriculum, grading, mastery,
schema or configuration was changed to produce it. Fixes were requested on 2026-10-07 (owner: "fix English only"); each entry's Status/Fix line records the outcome. Separate-account production verification could not run: production still serves 05b7868, which predates every fix.

Relation to other QA: `docs/qa/CHEMISTRY_REAL_LEARNER_DEFECTS.md` (`CHEM-*`), `docs/qa/BIOLOGY_REAL_LEARNER_DEFECTS.md` (`BIO-*`)
and `docs/qa/MATHEMATICS_REAL_LEARNER_DEFECTS.md` (`MATH-*`) use the same method; mechanisms shared with them are noted in the entries.
`docs/qa/ENGLISH_REAL_STUDENT_DEFECTS.md` (`ENG-D##`) is an **earlier, separate single-account English audit**; it was left untouched and
is not merged here. This file is the canonical English real-learner log and uses `ENGL-NNN` IDs.

## Learners and distribution

Ten test accounts (`test1`–`test10`, identified only as **Account 1–10**; credentials are never recorded). Each was enrolled in
English through the app's own `POST /api/subjects/enroll`. The 216 lessons were split into ten contiguous blocks, all
accounts running **simultaneously**:

| Account | Lesson orders |
|---|---|
| 1 | 1–22 |
| 2 | 23–44 |
| 3 | 45–66 |
| 4 | 67–88 |
| 5 | 89–110 |
| 6 | 111–132 |
| 7 | 133–154 |
| 8 | 155–176 |
| 9 | 177–198 |
| 10 | 199–216 |

Persona: lower-than-intermediate English, basic subject knowledge, short messages, sometimes right, sometimes wrong (~28 % of card
answers deliberately wrong), sometimes confused; uses "explain simpler", "give me example", "give me example with numbers",
"i dont understand", "i dont understand this picture", "what is this?", "why?", "show me step by step", "too many words",
"next question please", "quiz me", "explain again", "ok", "continue". Never told Tutor Max it was QA.

## Method and limits (read before trusting any count)

- Driven through the app's own HTTP API (`/api/sessions`, `/api/learn/lesson-init`, `/api/learn/chat`) as the logged-in learner,
  one new session per lesson, with a scripted persona. Card answers are chosen with a picker built from the repo's own
  English probe corpus (`src/lib/teaching/assets/english*.ts`) with a planned error rate; free-text answers quote taught
  content or say "i dont know". Entries are only things actually seen in a transcript or a served figure payload.
- Because answers are scripted, some tutor praise or drift after a scripted free-text answer is a persona artefact; entries say so.
- **Provider policy for this run (owner instruction):** use Groq only. When a reply came back degraded, or from a non-Groq LLM, the
  driver waited 10 s and re-sent the same message (up to 6 times); a non-Groq reply was never accepted as a teaching turn.
  This could not be enforced server-side from the client: the provider chain is server configuration. Every failed attempt is kept
  in the transcript and counted under ENGL-002. The first part of the run (before the instruction) used a 25 s pause instead (not applicable to English, which ran entirely under the 10 s rule).
- **Visuals were checked in three ways:** (1) every served figure payload was validated with the repo's own `validateSceneSpec` /
  `parseVisualSpec`; (2) every unique figure was rendered with the app's own `VisualCard` / `VisualRenderer` / `SceneSpecFigure`
  in headless Chromium (local `next dev`, no database) and screenshotted; text outside its drawing box was counted automatically;
  (3) a sample of the screenshots was reviewed by eye and compared with the concept taught. Pixel-exact rendering on real devices
  and the production CDN was **not tested**.
- **Deployment during the run:** see "Deployment changes during the run" below (no code deployment inside the window).
- **Run interruptions (full disclosure).** The English run began after the Vercel pause (HTTP 402 `DEPLOYMENT_DISABLED`) and Supabase Disk-IO warning described in the Mathematics log had been handled. The driver stops itself on the first HTTP 402 and writes no failure records, and all 216 lessons completed in one pass with all 10 accounts in parallel, no halt. Because the Disk-IO warning had occurred earlier, English was driven with a rolling cap of 1,200 chat turns per hour. Account 10 holds only 18 lessons (199–216).
- Systemic mechanisms (empathy openers, analogy loops, repeated cards, pauses, degraded replies, curriculum-goal dumps, wrong-concept
  figures, orphan quotation marks) are **linked automatically** from all transcripts by pattern; their occurrence lists are computed,
  not hand-picked. One-off content errors were found by reading each transcript; a regex check of simple "a op b = c" arithmetic
  statements found no wrong ones, so no arithmetic/grammar-slip entries exist; a regex scan for simple grammar slips found only two hits, both legitimate.
- Lessons were driven to natural completion, a "pause/needs-review" close, or a 30-turn cap.
- Terms: **studied** = a full lesson session driven; **observed** = seen in a transcript; **reproduced** = seen more than once;
  **systemic** = a mechanism across many lessons; **blocked** = could not proceed; **uncertain** = not established; **not tested**.
- Each lesson was driven once on one account. Deterministic content errors are assumed to repeat but a second-account
  reproduction was **not tested**; model-generated replies differ on every request, so one-off wording defects may not repeat.
- The tutor addresses the learner by the account label ("test4", "test 10"); that is the account's display name, not counted as a defect.

## Severity key

P0 = learning completely blocked · P1 = seriously damages learning/trust · P2 = noticeable but non-blocking · P3 = minor/polish.


## Defects

### ENGL-001 — Lessons end with "Let's pause … worth another look later" while the learner is still answering, with mastery incomplete

- Severity: P1
- Category: Mastery/progress
- Date/time: 2026-10-07 03:16 UTC
- Account: Account 1
- English concept: `eng.phonics.print-concepts`
- Lesson/order: #1
- Learner message: continue (turn 22)
- Tutor response: "Let's pause Print Concepts here for now. Worth another look later: Print Concepts. Press \"Start next lesson\" whenever you're ready to carry on." (mastery phase CHECK, 0 verified checks).
- Expected behaviour: A learner who is still engaged stays in the lesson until mastery is verified or they leave.
- Actual behaviour: The lesson closes as needs-review mid-lesson.
- Why it is a defect: The learner is ejected from an unfinished lesson; same mechanism as CHEM-016, BIO-002 and MATH-001.
- Reproducibility: Seen in the first lessons; counted over all English lessons at the end.
- Also observed (73 occurrences in 73 lessons): #1 (A1) t22; #2 (A1) t24; #3 (A1) t24; #7 (A1) t15; #8 (A1) t14; #10 (A1) t29; #11 (A1) t21; #21 (A1) t20; #203 (A10) t25; #205 (A10) t25; #216 (A10) t18; #24 (A2) t16; #25 (A2) t20; #26 (A2) t22; #27 (A2) t17; #32 (A2) t15; #36 (A2) t20; #37 (A2) t27; #38 (A2) t22; #40 (A2) t22; #41 (A2) t20; #42 (A2) t21; #48 (A3) t22; #49 (A3) t20; #50 (A3) t25; #53 (A3) t17; #54 (A3) t23; #55 (A3) t23; #56 (A3) t22; #58 (A3) t21; #64 (A3) t20; #65 (A3) t21; #67 (A4) t19; #81 (A4) t21; #85 (A4) t23; #87 (A4) t24; #88 (A4) t23; #90 (A5) t25; #91 (A5) t23; #92 (A5) t17; #93 (A5) t24; #94 (A5) t18; #98 (A5) t28; #105 (A5) t29; #106 (A5) t24; #107 (A5) t22; #112 (A6) t22; #120 (A6) t24; #122 (A6) t19; #126 (A6) t19; #128 (A6) t17; #130 (A6) t19; #135 (A7) t28; #137 (A7) t19; #138 (A7) t24; #143 (A7) t28; #147 (A7) t19; #156 (A8) t29; #159 (A8) t25; #161 (A8) t19; #170 (A8) t19; #172 (A8) t22; #178 (A9) t24; #181 (A9) t23; #182 (A9) t14; #183 (A9) t22; #185 (A9) t18; #188 (A9) t21; #189 (A9) t29; #190 (A9) t21; #191 (A9) t22; #192 (A9) t29; #195 (A9) t20
- Related defect: —
- Status: FIXED IN REPO — awaiting deployment (Vercel blocked)
- Fix: Shared mechanism MATH-001, fixed in 532055e after this run's code version: the budget close waits one turn for a help request whatever budget reason fired, a bare "why?" counts, and a verdict graded on the closing turn stays above the close. Not changed: closes after "continue"/an answer at the end of the turn budget (12 + 6 turns, 3 teaching attempts) — owner policy. Test: src/tests/mathRealLearnerFixes.test.ts (MATH-001). Production-verified: no. **2026-10-07 pass (2350ff6):** Owner decision 2026-10-07 (stay until mastery): an engaged learner's turn allowance is the 30-turn ceiling (`conceptBudget.STAY_UNTIL_MASTERY`, `effectiveTurnBudget`; the 12 + 6 budget is kept as `legacyTurnBudget`). The attempts and consecutive-failures exits still move a struggling concept to review, and an explicit stop still ends the session. Test: src/tests/ownerDecisions20261007.test.ts. This covers the part not covered by 532055e: a close after "continue" or an answer while mastery is incomplete.

### ENGL-002 — Degraded fallback replies ("Sorry — my answer didn't come through just now…", "I'm still getting my thoughts together on that one") instead of an answer — the Groq call failed

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-07 03:16 UTC
- Account: Account 1
- English concept: `eng.phonics.print-concepts`
- Lesson/order: #1
- Learner message: give me example
- Tutor response: "I'm still getting my thoughts together on that one — give me a moment and try again."
- Expected behaviour: The request is answered, or retried server-side.
- Actual behaviour: A canned apology; the learner must resend.
- Why it is a defect: Groq failed (provider=degraded) and nothing recovered it. Every failed attempt is counted; the driver re-sent after 10 s.
- Reproducibility: Counted automatically over all English transcripts.
- Also observed (230 occurrences in 101 lessons): #1 (A1) t4; #2 (A1) t2/t13/t22; #3 (A1) t1/t17/t22; #5 (A1) t1/t7; #10 (A1) t15; #11 (A1) t19; #13 (A1) t5; #14 (A1) t17/t18; #15 (A1) t25/t27/t29; #16 (A1) t4; #17 (A1) t1/t30; #200 (A10) t1/t6; #201 (A10) t1; #202 (A10) t9; #203 (A10) t13/t16/t19/t21/t24; #205 (A10) t1/t2/t3; #207 (A10) t8/t18/t20; #208 (A10) t18/t20; #209 (A10) t5; #210 (A10) t1/t2; #211 (A10) t1; #213 (A10) t5; #214 (A10) t3/t19; #215 (A10) t13; #26 (A2) t3/t16; #27 (A2) t14; #34 (A2) t1/t5/t11/t12; #36 (A2) t3/t9; #38 (A2) t2/t4/t8/t9; #39 (A2) t13/t15/t19/t27; #45 (A3) t16; #46 (A3) t2/t4/t9/t10/t12; #47 (A3) t3/t14/t15; #48 (A3) t2/t15; #49 (A3) t6/t7/t11/t13; #54 (A3) t17; #56 (A3) t8; #61 (A3) t3; #63 (A3) t1/t19; #67 (A4) t16; #69 (A4) t5/t6/t8; #70 (A4) t1/t2/t9; #71 (A4) t2/t3/t10; #72 (A4) t1/t6; #73 (A4) t5; #75 (A4) t6/t8; #80 (A4) t1; #81 (A4) t8/t14/t19; #85 (A4) t1; #86 (A4) t1; #87 (A4) t2/t13; #88 (A4) t2/t4/t18; #90 (A5) t3/t4/t6/t15/t18; #91 (A5) t5/t22; #92 (A5) t15; #93 (A5) t6/t20; #98 (A5) t2/t7/t8/t12/t16/t26; #99 (A5) t2; #101 (A5) t9; #102 (A5) t1/t2/t10/t11/t30; #103 (A5) t20/t23; #105 (A5) t11/t21; #106 (A5) t17/t19/t21; #107 (A5) t16; #111 (A6) t16/t20/t21/t22/t25; #112 (A6) t1/t7; #113 (A6) t3/t13/t15/t17/t20/t25/t27; #115 (A6) t15; #116 (A6) t10/t17; #117 (A6) t1/t7; #119 (A6) t2; #120 (A6) t6/t11/t15; #125 (A6) t6; #126 (A6) t18; #135 (A7) t9/t19/t25; #137 (A7) t15/t16; #139 (A7) t2/t3/t4; #140 (A7) t3/t8; #144 (A7) t2/t3; #145 (A7) t3; #148 (A7) t3/t6/t12/t14; #149 (A7) t1/t7; #152 (A7) t7; #156 (A8) t7/t19/t20/t23; #159 (A8) t5; #160 (A8) t12/t14; #164 (A8) t11/t14/t16/t20; #167 (A8) t1/t4/t5/t9/t27; #169 (A8) t3; #170 (A8) t17; #178 (A9) t5/t8/t11/t15; #179 (A9) t2; #181 (A9) t2/t19; #183 (A9) t13; #186 (A9) t7; #188 (A9) t9/t10/t12; #189 (A9) t1/t2/t3/t5/t13/t27; #192 (A9) t9/t27; #193 (A9) t9/t10; #194 (A9) t1/t6; #195 (A9) t16
- Related defect: —
- Status: PARTIALLY FIXED IN REPO — awaiting deployment (Vercel blocked) + OWNER ACTION (provider capacity)
- Fix: The Groq call failed (provider=degraded, 442 of 3,832 replies). Not a code path this pass can fix: provider quota/rate limits are Groq-console/GROQ_API_KEY configuration (CLAUDE.md, owner 2026-09-25). No code change. **2026-10-07 pass (2350ff6):** With every provider down, the concept's own authored explanation that the learner has not yet seen is served instead of the outage copy (chat: `findUnseenExplanationContent` in the all-providers-down branch, which then does not count as an outage turn; lesson-init: the authored explanation opens the lesson under its title). The outage copy remains only when no unseen authored explanation is left. Provider capacity itself (Gemini credits, OPENROUTER_API_KEY, Groq tier) is still an owner action. Test: src/tests/remainingDefectFixes20261007.test.ts.

### ENGL-003 — A card answer gets no verdict: the reply is a definition, an unrelated explanation or a stock line instead of right/wrong

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-07 03:23 UTC
- Account: Account 1
- English concept: `eng.phonics.phonemic-awareness`
- Lesson/order: #2
- Learner message: Manipulate phonemes: delete, add, or change sounds (card option)
- Tutor response: "The ability to identify and manipulate individual sounds (phonemes) in spoken words, independent of print." (a bare definition)
- Expected behaviour: Say whether the answer is right and why.
- Actual behaviour: No verdict; the learner cannot tell whether they were right.
- Why it is a defect: Same family as BIO-016 and MATH-002.
- Reproducibility: Counted automatically (reply to a card answer without any verdict wording).
- Also observed (80 occurrences in 67 lessons): #2 (A1) t15/t19/t21; #4 (A1) t4; #6 (A1) t7; #10 (A1) t17; #11 (A1) t4; #18 (A1) t3; #19 (A1) t4; #21 (A1) t3; #199 (A10) t15; #201 (A10) t7; #207 (A10) t4; #210 (A10) t12; #25 (A2) t8; #26 (A2) t7; #27 (A2) t4/t16; #31 (A2) t4; #33 (A2) t5; #34 (A2) t7; #42 (A2) t3; #45 (A3) t4/t14; #50 (A3) t4; #55 (A3) t5; #57 (A3) t3; #63 (A3) t13; #64 (A3) t4/t13; #65 (A3) t12; #68 (A4) t5; #83 (A4) t8; #84 (A4) t3; #89 (A5) t5; #90 (A5) t8; #94 (A5) t3; #98 (A5) t18; #99 (A5) t4; #100 (A5) t4/t10; #101 (A5) t4/t8; #103 (A5) t9; #105 (A5) t13/t17; #106 (A5) t4/t10; #107 (A5) t5; #110 (A5) t4; #111 (A6) t4/t12; #114 (A6) t8; #115 (A6) t12; #118 (A6) t3; #121 (A6) t22; #122 (A6) t9; #124 (A6) t5; #125 (A6) t3; #129 (A6) t4; #132 (A6) t4; #134 (A7) t4; #135 (A7) t4/t11/t13/t21; #138 (A7) t10; #140 (A7) t10; #144 (A7) t4; #150 (A7) t7; #153 (A7) t10; #157 (A8) t5; #164 (A8) t23; #166 (A8) t8; #172 (A8) t3; #177 (A9) t5; #181 (A9) t8; #185 (A9) t10; #188 (A9) t15; #190 (A9) t4
- Related defect: —
- Status: FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Two parts. (1) 532055e (MATH-002 residual): a regeneration that erased the server verdict gets it back. (2) 6ff5a40: several fallbacks that run AFTER that hygiene pass (question-delivery contract, withheld-question and figure fallbacks) replace the whole reply with the concept's KG description, erasing the restored verdict (#2 t15, production row: provider groq, DETECT_MISCONCEPTION). One final guard just before the reply ships now puts the authored-key verdict in front of any model-written reply on a graded turn that states none. Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-003 / ENGL-007). Production-verified: no.

### ENGL-004 — The same card is shown again word for word within one lesson

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-07 03:16 UTC
- Account: Account 10
- English concept: `eng.communication (lesson 199)`
- Lesson/order: #199
- Learner message: (card sequence)
- Tutor response: A card first asked at turn 2 is asked again at turn 18.5 with the same wording (options re-ordered).
- Expected behaviour: Each card is asked once per lesson; a re-check uses a new probe.
- Actual behaviour: Same question repeated.
- Why it is a defect: A repeated card is answered from memory and inflates correct counts; same as BIO-018 and MATH-003.
- Reproducibility: Counted automatically.
- Also observed (208 occurrences in 89 lessons): #5 (A1) t14/t15/t16; #7 (A1) t9/t10/t11; #12 (A1) t17/t18/t19/t20.5; #15 (A1) t22; #16 (A1) t12/t13.5; #18 (A1) t10.5; #21 (A1) t14/t15; #199 (A10) t18.5; #200 (A10) t15.5; #201 (A10) t12.5; #208 (A10) t28/t29.5; #209 (A10) t13/t14/t15.5; #210 (A10) t16/t17.5; #211 (A10) t18.5; #212 (A10) t24.5; #213 (A10) t16.5; #215 (A10) t18.5; #216 (A10) t9; #28 (A2) t20/t21/t22/t23/t24; #30 (A2) t10/t11.5; #32 (A2) t9/t10/t11; #34 (A2) t18/t19.5; #35 (A2) t23/t27; #36 (A2) t14/t15/t16; #37 (A2) t22/t25; #40 (A2) t15/t16/t17/t18; #47 (A3) t21/t22/t23/t24.5; #50 (A3) t20/t21/t25.5; #55 (A3) t18; #66 (A3) t15/t16/t17.5; #69 (A4) t21/t22/t23/t24/t25.5; #71 (A4) t17/t18/t19.5; #72 (A4) t10/t11/t12.5; #73 (A4) t16.5; #74 (A4) t11.5; #75 (A4) t18.5; #78 (A4) t16/t17/t18/t19.5; #79 (A4) t13/t14.5; #84 (A4) t10/t11/t12.5; #85 (A4) t18/t19/t20/t21; #91 (A5) t17/t18/t19; #94 (A5) t10/t11; #99 (A5) t11/t12; #100 (A5) t13.5; #101 (A5) t15/t16.5; #102 (A5) t26; #103 (A5) t26; #108 (A5) t10/t11/t12.5; #109 (A5) t13/t14.5; #113 (A6) t30; #115 (A6) t28/t29.5; #116 (A6) t24/t25/t26/t27; #117 (A6) t13/t14/t15.5; #118 (A6) t12.5; #119 (A6) t14.5; #123 (A6) t14.5; #126 (A6) t9/t10/t11; #127 (A6) t13.5; #138 (A7) t13/t14/t15/t16; #139 (A7) t12/t13; #140 (A7) t20/t21/t22/t23.5; #141 (A7) t16/t17/t18/t19/t20.5; #142 (A7) t17/t18/t19; #143 (A7) t14/t21/t22/t23/t24; #144 (A7) t7/t16/t17.5; #148 (A7) t27/t28.5; #149 (A7) t22/t23/t24.5; #151 (A7) t11/t12.5; #152 (A7) t14.5; #153 (A7) t18/t19.5; #154 (A7) t23/t24.5; #156 (A8) t16/t26; #157 (A8) t12/t13/t14.5; #160 (A8) t22/t23.5; #164 (A8) t29; #166 (A8) t13/t14.5; #167 (A8) t23/t29; #168 (A8) t13.5; #169 (A8) t18/t19.5; #170 (A8) t15; #171 (A8) t16.5; #174 (A8) t14/t15/t16/t17/t18; #175 (A8) t9/t10.5; #180 (A9) t12; #182 (A9) t9/t10/t11; #189 (A9) t22/t23/t24/t25; #192 (A9) t19/t20/t21/t22/t23; #193 (A9) t17/t18/t19/t20.5; #198 (A9) t21/t22/t23.5
- Related defect: —
- Status: NOT A DEFECT — owner-decided single re-ask (as MATH-003); cross-lesson part FIXED IN REPO (afa7322), awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Production evidence_events (PROBE_OUTCOME, 23:30–06:40 UTC, English): 1,081 card/session pairs graded once, 157 twice, 15 three or four times. All 15 of the 3–4× pairs are grades hours apart (e.g. 23:35, 02:48, 03:18) — the account's one shared session re-entered for the concurrency probes and later lessons, not a repeat inside one lesson attempt. Within a lesson no card was graded more than twice = the owner-decided single re-ask after the pool runs dry (teachingHistory.recordMcqOutcome option (c)). The answered-card return across a lesson switch is CHEM-033 (afa7322). No code change this pass.

### ENGL-005 — Canned empathy openers unrelated to what the learner wrote ("I hear you’re feeling stuck, so let’s…")

- Severity: P3
- Category: Adaptation
- Date/time: 2026-10-07 03:16 UTC
- Account: Account 1
- English concept: `eng.phonics.print-concepts`
- Lesson/order: #1
- Learner message: i dont understand
- Tutor response: "I hear you’re feeling stuck, so let’s look at the same picture again, step by step, a little slower."
- Expected behaviour: Respond to the actual request; use empathy only when a feeling was expressed.
- Actual behaviour: The same stock opener on many requests.
- Why it is a defect: Reads as scripted; same as BIO-003 and MATH-017.
- Reproducibility: Counted automatically.
- Also observed (228 occurrences in 136 lessons): #1 (A1) t2/t21; #2 (A1) t7/t16/t23; #3 (A1) t19; #5 (A1) t2; #8 (A1) t6/t13; #10 (A1) t6/t14/t23/t24; #11 (A1) t14; #13 (A1) t3; #14 (A1) t12; #15 (A1) t8; #17 (A1) t10; #21 (A1) t6; #199 (A10) t12; #200 (A10) t2; #202 (A10) t7/t16/t17/t18; #203 (A10) t15; #204 (A10) t4; #205 (A10) t24; #207 (A10) t9/t17; #208 (A10) t8/t17/t25; #210 (A10) t2/t10; #211 (A10) t3/t6/t12; #212 (A10) t2/t7/t16; #214 (A10) t7/t12; #215 (A10) t3; #216 (A10) t17; #25 (A2) t15; #26 (A2) t19; #27 (A2) t12; #28 (A2) t11; #29 (A2) t10/t17; #30 (A2) t2; #33 (A2) t8/t13; #35 (A2) t18; #36 (A2) t18; #37 (A2) t11/t16; #38 (A2) t19; #39 (A2) t16; #40 (A2) t21; #41 (A2) t11/t17; #42 (A2) t7/t8/t10; #45 (A3) t7/t9; #46 (A3) t10/t17; #47 (A3) t11; #48 (A3) t4/t20; #49 (A3) t6; #53 (A3) t10; #54 (A3) t21; #55 (A3) t20; #58 (A3) t9/t16/t20; #63 (A3) t3/t16; #64 (A3) t15/t19; #65 (A3) t3; #66 (A3) t9/t10; #67 (A4) t18; #68 (A4) t3; #69 (A4) t2; #70 (A4) t14/t15; #73 (A4) t2; #75 (A4) t11; #80 (A4) t4; #81 (A4) t13/t18/t20; #83 (A4) t2/t4; #85 (A4) t10; #87 (A4) t10; #89 (A5) t3; #90 (A5) t2/t14/t19/t24; #91 (A5) t2; #92 (A5) t8; #93 (A5) t2/t7/t18/t23; #94 (A5) t14; #98 (A5) t8/t22/t26; #102 (A5) t4/t17/t29; #105 (A5) t9/t20; #106 (A5) t2/t18; #107 (A5) t21; #109 (A5) t8; #111 (A6) t10/t23; #112 (A6) t12; #113 (A6) t8/t14/t23/t28; #114 (A6) t3; #115 (A6) t8/t16; #116 (A6) t8/t15; #119 (A6) t9; #120 (A6) t2/t23; #121 (A6) t11/t26; #122 (A6) t2/t3/t4; #123 (A6) t6; #124 (A6) t2; #127 (A6) t5; #130 (A6) t17; #135 (A7) t15/t23; #137 (A7) t8; #138 (A7) t8/t18/t22; #140 (A7) t2; #141 (A7) t12; #142 (A7) t4; #143 (A7) t4/t9/t17; #146 (A7) t9; #147 (A7) t2/t4; #148 (A7) t9/t18; #149 (A7) t3/t11/t13; #150 (A7) t4; #152 (A7) t3/t8; #153 (A7) t4; #154 (A7) t6/t19; #155 (A8) t3; #156 (A8) t20; #159 (A8) t2/t4/t23; #160 (A8) t9/t16; #161 (A8) t7/t13/t18; #163 (A8) t2/t7; #164 (A8) t13/t18/t24; #167 (A8) t26; #168 (A8) t11; #169 (A8) t2; #171 (A8) t3/t10; #172 (A8) t6/t18; #177 (A9) t8/t10; #178 (A9) t11/t19; #180 (A9) t3; #181 (A9) t18/t22; #183 (A9) t7; #185 (A9) t17; #187 (A9) t5; #188 (A9) t18; #189 (A9) t10/t28; #190 (A9) t16; #191 (A9) t19; #192 (A9) t10/t13/t28; #193 (A9) t7/t8/t10; #194 (A9) t2/t9; #195 (A9) t12; #196 (A9) t8/t10; #197 (A9) t10; #198 (A9) t8/t10/t11
- Related defect: —
- Status: FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Shared mechanism MATH-017 (532055e): the empathy cap is re-applied after the shape/picture regenerations, so a second stock opener within four replies is stripped. Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-005). Production-verified: no.

### ENGL-006 — "i dont know" / "i dont understand" is answered with empathy and then a bare list of options or nothing useful

- Severity: P2
- Category: Adaptation
- Date/time: 2026-10-07 03:21 UTC
- Account: Account 7
- English concept: `eng.reading (lesson 135)`
- Lesson/order: #135
- Learner message: i dont know
- Tutor response: "I hear you—it’s okay to feel stuck. A) A study published in a peer‑reviewed scientific journal B) A single personal story someone shared on social media…" (options pasted with no question or explanation).
- Expected behaviour: A simpler explanation or a smaller question.
- Actual behaviour: A feeling sentence plus loose option text.
- Why it is a defect: The struggling learner gets nothing to work with; same family as BIO-011 and MATH-016.
- Reproducibility: Counted automatically.
- Also observed (7 occurrences in 6 lessons): #208 (A10) t17/t25; #29 (A2) t10; #36 (A2) t18; #58 (A3) t9; #102 (A5) t17; #135 (A7) t15
- Related defect: —
- Status: FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Shared mechanism MATH-004/016 (532055e): on a help turn ("i dont know", "i dont understand") a comfort-only or option-dump reply is a stub and is replaced by an unseen authored explanation (else one regeneration kept only if it teaches). Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-006). Production-verified: no.

### ENGL-007 — The raw curriculum goal / description is returned as the tutor reply

- Severity: P2
- Category: UX
- Date/time: 2026-10-07 03:23 UTC
- Account: Account 1
- English concept: `eng.phonics.phonemic-awareness`
- Lesson/order: #2
- Learner message: Manipulate phonemes (card answer)
- Tutor response: "The ability to identify and manipulate individual sounds (phonemes) in spoken words, independent of print."
- Expected behaviour: A verdict on the learner's answer.
- Actual behaviour: The lesson-goal string from the curriculum, verbatim.
- Why it is a defect: Internal curriculum metadata shown as speech; same as BIO-010 and MATH-023.
- Reproducibility: Counted automatically.
- Also observed (14 occurrences in 12 lessons): #2 (A1) t15; #5 (A1) t4; #212 (A10) t4; #216 (A10) t16; #28 (A2) t12; #75 (A4) t7; #85 (A4) t4; #87 (A4) t22; #106 (A5) t14; #147 (A7) t15; #150 (A7) t5; #198 (A9) t15
- Related defect: —
- Status: FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Same root cause as ENGL-003 part (2): the KG description is the final fallback of several repairs; on a card-answer turn it shipped as the whole reply. Fixed by the final verdict guard in 6ff5a40 (the description may still follow the verdict when nothing else survived). Help turns: MATH-023 teaching floor (532055e). Test: src/tests/englishRealLearnerFixes.test.ts. Production-verified: no.

### ENGL-008 — "explain simpler / again / too many words" is answered with a new everyday analogy each time instead of simpler language

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-07 03:16 UTC
- Account: Account 1
- English concept: `eng.phonics.print-concepts`
- Lesson/order: #1
- Learner message: explain simpler / explain again
- Tutor response: Three analogy replies in one lesson (see occurrences).
- Expected behaviour: The same idea in simpler words with a concrete example.
- Actual behaviour: A new loosely related picture per request.
- Why it is a defect: The analogy replaces the teaching; same as BIO-004 and MATH-018.
- Reproducibility: Counted automatically (3+ analogy replies in one lesson).
- Also observed (30 occurrences in 30 lessons): #1 (A1) t-; #2 (A1) t-; #14 (A1) t-; #15 (A1) t-; #17 (A1) t-; #203 (A10) t-; #208 (A10) t-; #214 (A10) t-; #37 (A2) t-; #38 (A2) t-; #39 (A2) t-; #42 (A2) t-; #58 (A3) t-; #64 (A3) t-; #69 (A4) t-; #70 (A4) t-; #102 (A5) t-; #105 (A5) t-; #111 (A6) t-; #115 (A6) t-; #120 (A6) t-; #121 (A6) t-; #135 (A7) t-; #148 (A7) t-; #156 (A8) t-; #159 (A8) t-; #161 (A8) t-; #164 (A8) t-; #178 (A9) t-; #190 (A9) t-
- Related defect: —
- Status: PARTIALLY FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: MATH-018's analogy cap (532055e) applied to mathematics only (cap 1 in 4 replies); every other subject kept 2. 6ff5a40 applies cap 1 to english: a second analogy within four replies triggers one regeneration with no analogy, kept only if it complies. Partial: one analogy per four replies is still allowed, and a regeneration that fails is not shipped in place. Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-008). Production-verified: no.

### ENGL-009 — Lesson opens with a content-free fragment or a line that assumes context never given ("That’s exactly right…", "Imagine hearing the short sentence…" with nothing following)

- Severity: P2
- Category: UX
- Date/time: 2026-10-07 03:16 UTC
- Account: Account 2
- English concept: `eng.phonetics.connected-speech`
- Lesson/order: #24
- Learner message: ok (lesson opened)
- Tutor response: "Imagine hearing the short sentence “I want to go” spoken quickly in a casual conversation. Most native speakers blend the words so it sounds like “I wanna go.”" (a one-sentence opener with no teaching after it).
- Expected behaviour: An introduction to the concept.
- Actual behaviour: A half-lesson or praise for an answer that was never given.
- Why it is a defect: The first message of the lesson teaches too little; same as MATH-009.
- Reproducibility: Counted automatically (openers under 170 characters or opening with a verdict).
- Also observed (16 occurrences in 16 lessons): #16 (A1) t1; #18 (A1) t1; #20 (A1) t1; #24 (A2) t1; #35 (A2) t1; #64 (A3) t1; #89 (A5) t1; #105 (A5) t1; #111 (A6) t1; #124 (A6) t1; #132 (A6) t1; #133 (A7) t1; #138 (A7) t1; #154 (A7) t1; #168 (A8) t1; #158 (A8) t1
- Related defect: —
- Status: PARTIALLY FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Shared MATH-009 (532055e): the lesson's first "ok" is owed the lesson — a stub, an orphan "If not, …" opener or a lone figure pointer is replaced by authored teaching. Not covered: a 20–30-word opener that does teach a little ("Imagine hearing … 'I wanna go'.") is not a stub by the floor's rule. Production-verified: no.

### ENGL-010 — "show me step by step" / "give me example" is answered with a new question instead of the steps or the example

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-07 03:34 UTC
- Account: Account 4
- English concept: `eng.grammar (lesson 70)`
- Lesson/order: #70
- Learner message: give me example
- Tutor response: "She walks to school every morning. What do you notice about the verb in this sentence?"
- Expected behaviour: A worked example.
- Actual behaviour: A question back to the learner.
- Why it is a defect: The learner asked to be shown and is quizzed; same as MATH-005.
- Reproducibility: Counted automatically.
- Also observed (3 occurrences in 3 lessons): #35 (A2) t22; #70 (A4) t2; #112 (A6) t2
- Related defect: —
- Status: PARTIALLY FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Shared MATH-005 (532055e): a reply that is nothing but a counter-question is a stub on a help turn and is replaced by an authored worked example (preferred for "step by step"/"example"). Not covered: #70's shape — one example sentence followed by a question — is not a stub. Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-010). Production-verified: no.

### ENGL-011 — Tutor addresses the learner by the account login label ("test", "test10")

- Severity: P3
- Category: UX
- Date/time: 2026-10-07 03:32 UTC
- Account: Account 10
- English concept: `eng.communication (lesson 202)`
- Lesson/order: #202
- Learner message: ok (lesson opened)
- Tutor response: "Got it, test10 — you see that a good tra…"; also "Got it, test — let’s see phonemic awareness in action." (lesson 2).
- Expected behaviour: No name, or the real display name.
- Actual behaviour: A username-style label, sometimes truncated.
- Why it is a defect: Reads as a system artefact; same as MATH-028.
- Reproducibility: Counted automatically.
- Also observed (8 occurrences in 8 lessons): #11 (A1) t16; #202 (A10) t2; #205 (A10) t24; #209 (A10) t1; #47 (A3) t17; #120 (A6) t8; #135 (A7) t1; #141 (A7) t1
- Related defect: —
- Status: FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Shared MATH-028 (532055e): a handle-like display name ("test", "test10", digits, @ _ .) is never given to the tutor as a name. Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-011). Production-verified: no.

### ENGL-012 — Quoted example text is missing from replies, leaving orphan quotation marks ("” – they look for clues…", "1.” 2. Sam…")

- Severity: P2
- Category: UX
- Date/time: 2026-10-07 04:18 UTC
- Account: Account 9
- English concept: `eng.literature.literary-criticism-intro`
- Lesson/order: #185
- Learner message: ok (lesson opened)
- Tutor response: "Imagine three experts standing in front of the same poem: a historian, a formalist, and a reader‑response scholar. ” – they look for clues about the era… ” – they focus only on the words… ” – they connect their feelings…" — the experts' quoted statements are gone. Also lesson 138 turn 10: "Here’s Conversation A… 1.” 2. Sam (Turn 2)…" (the first line is gone) and lesson 92 turn 15 starting with a lone ”.
- Expected behaviour: The quoted sentences are shown.
- Actual behaviour: The text inside quotation marks was dropped, leaving fragments that read as broken sentences.
- Why it is a defect: The learner sees an unfinished example in an English lesson about reading text; the part the tutor says to "listen to" is missing.
- Reproducibility: Counted automatically (orphan quotation marks in replies).
- Also observed (5 occurrences in 5 lessons): #3 (A1) t16; #215 (A10) t6; #63 (A3) t11; #92 (A5) t15; #138 (A7) t10
- Related defect: —
- Status: FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Root cause reproduced locally from the production row of #185: confirmBackRepair.dropQuestionSentences (the no-question repair beside a card) split sentences on every "?", including one inside a quoted example (“What was happening when this was written?”), and dropped the text from the sentence start to that "?", leaving the closing ” — exactly "” – they look for clues…" and "1.” 2. Sam…". 6ff5a40 masks quoted spans on one line before the split; questions to the learner still go. Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-012). Production-verified: no.

### ENGL-013 — Tutor says "There is no picture in this lesson yet" although the lesson does carry a figure

- Severity: P2
- Category: Visual
- Date/time: 2026-10-07 04:34 UTC
- Account: Account 1
- English concept: `eng.phonics.silent-e`
- Lesson/order: #11
- Learner message: i dont understand this picture
- Tutor response: "There is no picture in this lesson yet, so let me say it in words. I hear you—it can feel confusing…"
- Expected behaviour: The tutor refers to the figure the learner is looking at.
- Actual behaviour: The tutor denies that a picture exists; the lesson transcript shows a figure was delivered in the same lesson.
- Why it is a defect: A weak-English learner who points at the figure is told it is not there; they cannot ask again in better words.
- Reproducibility: Counted automatically (13 turns across lessons).
- Also observed (13 occurrences in 6 lessons): #11 (A1) t20; #14 (A1) t18; #15 (A1) t2/t20/t26; #102 (A5) t19/t24/t30; #116 (A6) t19; #121 (A6) t20/t27
- Related defect: —
- Status: FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Shared MATH-019 (532055e): the "no picture in this lesson yet" rewrite now checks the rendered-reality log, so a figure already shown for the concept is never denied. Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-013). Production-verified: no.

### ENGL-014 — Asked "why?", the tutor explains its own internal instruction ("that placeholder was just a reminder to avoid repeating the exact same explanation") instead of the lesson

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-07 05:49 UTC
- Account: Account 7
- English concept: `eng.rhetoric (lesson 152)`
- Lesson/order: #152
- Learner message: why?
- Tutor response: "I’m sorry for the confusion—that placeholder was just a reminder to avoid repeating the exact same explanation we’ve already covered. Let’s try a fresh approach…"
- Expected behaviour: A reason about the lesson content.
- Actual behaviour: The tutor leaks prompt/system wording and apologises for a "placeholder" the learner never saw.
- Why it is a defect: Exposes internal mechanics and answers a question the learner did not ask.
- Reproducibility: Seen once (lesson 152 turn 8); not reproduced.
- Also observed (1 occurrence in 1 lesson): #152 (A7) t8
- Related defect: —
- Status: FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: The meta-talk stripper (reuseCaps.stripMetaTalk, BIO-001/MATH-021) did not know "that placeholder was …" or "the exact same explanation". 6ff5a40 adds both shapes; the sentence goes, the teaching stays. Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-014). Production-verified: no.

### ENGL-015 — "next question please" is answered with a scene description, not a question

- Severity: P3
- Category: Lesson flow
- Date/time: 2026-10-07 03:31 UTC
- Account: Account 1
- English concept: `eng.phonics (lesson 3)`
- Lesson/order: #3
- Learner message: next question please
- Tutor response: "Imagine a tabletop spread with two letter cards placed side‑by‑side: a big, bold “M”…"
- Expected behaviour: A question or card.
- Actual behaviour: A one-sentence setup with no question; the learner has to ask again.
- Why it is a defect: Wastes a turn for a learner who is struggling to phrase requests.
- Reproducibility: 7 instances counted automatically.
- Also observed (7 occurrences in 7 lessons): #3 (A1) t2; #11 (A1) t16; #208 (A10) t18; #69 (A4) t5; #90 (A5) t17; #126 (A6) t17; #195 (A9) t8
- Related defect: —
- Status: PARTIALLY FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Shared MATH-020 (532055e): "next question please" is a practice request, and a stub reply on it is replaced by authored teaching. Not covered: a one-sentence scene setup of ≥12 words is not a stub, and no card is forced. Production-verified: no.

### ENGL-016 — Process-flow figures: step text spills over the number badge and past the box edges; some badges are empty with the number outside the circle

- Severity: P2
- Category: Visual
- Date/time: 2026-10-07 03:16 UTC
- Account: Account 1
- English concept: `eng.phonics.print-concepts`
- Lesson/order: #1
- Learner message: (figure delivered with the lesson)
- Tutor response: Print Directionality Process: step text "Begin at the top left corner of the page." overlaps badge "1"; steps 3 and 5 run beyond the box. Blending/Segmenting: circles empty, digits "1 2 3" outside the boxes.
- Expected behaviour: Text inside the box; number inside the badge.
- Actual behaviour: Overlapping and misplaced text/numbers (screenshots fig0000, fig0003).
- Why it is a defect: The figure meant to help a weak reader is itself hard to read.
- Reproducibility: Rendered in a local harness from captured payloads; 49 lessons carry process_flow figures; 2 screenshotted (same pattern). Others not screenshotted.
- Also observed (49 occurrences in 49 lessons): #1 (A1) t-; #2 (A1) t-; #4 (A1) t-; #5 (A1) t-; #11 (A1) t-; #14 (A1) t-; #15 (A1) t-; #203 (A10) t-; #204 (A10) t-; #205 (A10) t-; #206 (A10) t-; #207 (A10) t-; #208 (A10) t-; #209 (A10) t-; #210 (A10) t-; #46 (A3) t-; #47 (A3) t-; #69 (A4) t-; #72 (A4) t-; #73 (A4) t-; #90 (A5) t-; #93 (A5) t-; #94 (A5) t-; #95 (A5) t-; #96 (A5) t-; #97 (A5) t-; #98 (A5) t-; #102 (A5) t-; #111 (A6) t-; #113 (A6) t-; #114 (A6) t-; #115 (A6) t-; #116 (A6) t-; #117 (A6) t-; #118 (A6) t-; #120 (A6) t-; #121 (A6) t-; #133 (A7) t-; #134 (A7) t-; #135 (A7) t-; #155 (A8) t-; #156 (A8) t-; #157 (A8) t-; #158 (A8) t-; #160 (A8) t-; #161 (A8) t-; #163 (A8) t-; #164 (A8) t-; #178 (A9) t-
- Related defect: MATH-013 (Mathematics, same renderer)
- Status: FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Same renderer as MATH-013, fixed in 532055e (text wraps right of the badge, the box grows). Rendered locally (react-dom server render of the app's ProcessFlowRenderer + headless Chromium at 1280 px and 390 px) with the two production payloads (visualization_cache rows for eng.phonics.print-concepts and eng.phonics.blending-segmenting): 0 text over a badge, 0 text past the box, 0 digits outside a badge, 0 empty badges. Limit: static render at the default 360 px figure width, not the live client. Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-016). Production-verified: no.

### ENGL-017 — Scene figures are sparse and use dark label colours on a dark background (Semantic Fields, Descriptive Writing, Setting and Atmosphere, Translation Studies); intonation graph shows an unlabelled parabola on a -10..10 axis

- Severity: P3
- Category: Visual
- Date/time: 2026-10-05
- Account: Account 6
- English concept: `eng.vocab.semantic-fields`
- Lesson/order: #48
- Learner message: (figure delivered with the lesson)
- Tutor response: Semantic Fields: blue "Weather Field" and its words almost invisible; Setting and Atmosphere: one purple sphere with three tiny labels; Intonation: Pitch/Time axes from -10 to 10, curve goes below zero, "Time (s)" label under the zoom buttons.
- Expected behaviour: Readable labels and a figure that shows the concept.
- Actual behaviour: Low contrast, near-empty scenes, meaningless axis range (screenshots fig0007, 0010, 0026, 0043, 0045).
- Why it is a defect: Weak readers cannot read the labels, and the picture adds little.
- Reproducibility: Rendered locally from captured payloads; 4 sceneSpec + 1 graph screenshotted; others not tested.
- Also observed (5 occurrences in 5 lessons): #23 (A2) t3; #48 (A3) t1; #116 (A6) t5; #165 (A8) t3; #202 (A10) t1
- Notes on occurrences: #23 t3: intonation (screenshot) · #48 t1: semantic (screenshot) · #116 t5: descriptive (screenshot) · #165 t3: setting (screenshot) · #202 t1: translation (screenshot)
- Related defect: —
- Status: PARTIALLY FIXED IN REPO — awaiting deployment (Vercel has built nothing since 05b7868, 2026-10-06 10:08 UTC; pushes of afa7322, 532055e and 6ff5a40 started no build)
- Fix: Production payload (visualization_cache scene:v1:fig:eng.vocab.semantic-fields) colours labels with CSS names "red"/"blue", which themeColor passes through: #0000ff on the #243329 board is ~1.6:1. 6ff5a40: SceneLabel (the one leaf every scene label uses) lifts label text to ≥4.5:1 against the figure surface in both themes; mesh colours unchanged. Intonation: the cached "0.5x + 200" pitch graph is now refused as nothing-drawable by the existing check; a generated graph with a time x-axis and no domain opens on 0…10 (visualEngine), and the axis-name/zoom overlap was fixed in 532055e (MATH-014). Not fixed: sparse scenes (one sphere, three labels) are model content — no change. Contrast checked numerically, not by a WebGL screenshot. Test: src/tests/englishRealLearnerFixes.test.ts (ENGL-017). Production-verified: no.

## Systemic observations (counts computed from the transcripts)

Computed over 216 lesson transcripts (3832 learner turns, one reply each; degraded retries included as separate replies):

- Reply provider: groq 3069 (80 %), degraded 442 (12 %), memory 122 (3 %), gate 196 (5 %), gemini 3 (0 %).
- Cards (mcq) shown: 1520; options per card: 2 options 1402, 3 options 11, 4 options 107.
- Lesson close: 113 closed as "mastered", 96 as "needs review" (46 % of closed lessons ended on a pause, ENGL-001).
- Lessons with a figure: 53 of 216; with no figure on any turn: 163.
- Per account (lessons / learner turns / mastered / needs-review): A1 22/407/10/10 · A2 22/436/7/14 · A3 22/393/9/13 · A4 22/372/15/7 · A5 22/419/10/11 · A6 22/419/13/8 · A7 22/417/14/8 · A8 22/393/14/6 · A9 22/427/10/12 · A10 18/358/11/7.


## Concurrency and isolation tests

Both probes were run once, at low load, with account passwords supplied only as an environment variable.

- **T1 same account, three sessions at once** (Account 4, lessons 70 Present Tenses, 75 Conditional Sentences, 80 Subject-Verb Agreement, 12 interleaved turns each, 0 request errors). Each session opened on its own lesson and stayed on it. Lesson 70 replies touched subject-verb agreement in 8 turns and lesson 75 in 6, but agreement is part of teaching present tenses and conditionals, so this is **not** evidence of cross-teaching. No clear cross-session mixing observed (the Mathematics probe, MATH-030, did show it; English was tried once and is **uncertain**, not cleared).
- **T2 cross-account marker test** (lesson 30 opened on Accounts 1–5 simultaneously; each injected a unique word `ZorbaxNQuill` once): 0 of the markers appeared in another account's replies; each reply used only its own account's marker. 0 request errors. Not tested beyond 5 accounts and one lesson.


## Figures reviewed (what the visual pass found)

Every served figure payload (75 across the 216 lessons: 50 visualSpec, 4 sceneSpec, plus card-type figures) passed the repo's own validators (0 invalid). 54 distinct cases were extracted; 9 of them were rendered with the app's own components in headless Chromium and screenshotted: four process-flows, one intonation graph, four scene figures. **Process-flow figures** (49 lessons carry one) showed text spilling over the number badge and past the box (fig0000) or empty badges with digits outside the boxes (fig0003) — ENGL-016. **Scene figures and the intonation graph** are sparse with dark labels on a dark background — ENGL-017. **Judged acceptable:** the Descriptive Writing sensory-axes scene (labels mostly readable apart from dark Smell/Taste text) and the Translation Studies chain (readable but minimal). The remaining ~45 figure cases were validated but **not screenshotted**; WebGL animation, touch behaviour and real devices were **not tested**. The tutor also sometimes denied a figure existed (ENGL-013).

## Deployment changes during the run

All 216 English transcripts were started between 2026-10-06 23:32 UTC and 2026-10-07 06:28 UTC. No application deployment other than documentation commits was made in that window (latest code commit before the run: `afa7322`/`6d4aca9`, 2026-10-06 15:03–15:36 UTC, already live at the start), so no before/after comparison is possible or needed: the whole run saw one code version. Whether that version was actually the live one was **not independently verified through the Vercel API** in this session.


## Coverage by lesson

Result per account in brackets: turns driven, and how the lesson closed (mastered / needs-review = "Let's pause … worth another look later").
"figure none" means no figure channel was returned on any turn.

| # | concept | lesson | accounts (turns, result) | figure | defects referencing |
|---|---|---|---|---|---|
| 1 | `eng.phonics.print-concepts` | Print Concepts | A1 (23t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-005, ENGL-008, ENGL-016 |
| 2 | `eng.phonics.phonemic-awareness` | Phonemic Awareness | A1 (25t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-003, ENGL-005, ENGL-007, ENGL-008, ENGL-016 |
| 3 | `eng.phonics.alphabet-recognition` | Alphabet Recognition | A1 (25t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005, ENGL-012, ENGL-015 |
| 4 | `eng.phonics.rhyming` | Rhyming | A1 (11t, needs-review) | yes | ENGL-003, ENGL-016 |
| 5 | `eng.phonics.blending-segmenting` | Blending and Segmenting | A1 (18t, mastered) | yes | ENGL-002, ENGL-004, ENGL-005, ENGL-007, ENGL-016 |
| 6 | `eng.phonics.letter-sound-correspondence` | Letter-Sound Correspondence | A1 (11t, mastered) | none | ENGL-003 |
| 7 | `eng.phonics.consonants` | Consonant Sounds | A1 (16t, needs-review) | none | ENGL-001, ENGL-004 |
| 8 | `eng.phonics.short-vowels` | Short Vowel Sounds | A1 (15t, needs-review) | none | ENGL-001, ENGL-005 |
| 9 | `eng.phonics.consonant-blends` | Consonant Blends | A1 (12t, mastered) | none | — |
| 10 | `eng.phonics.digraphs` | Consonant and Vowel Digraphs | A1 (30t, needs-review) | none | ENGL-001, ENGL-002, ENGL-003, ENGL-005 |
| 11 | `eng.phonics.long-vowels-silent-e` | Long Vowels and Silent E | A1 (22t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-003, ENGL-005, ENGL-011, ENGL-013, ENGL-015, ENGL-016 |
| 12 | `eng.phonics.sight-words` | High-Frequency Sight Words | A1 (21t, mastered) | none | ENGL-004 |
| 13 | `eng.phonics.syllable-types` | Syllable Types | A1 (11t, mastered) | none | ENGL-002, ENGL-005 |
| 14 | `eng.phonics.decoding-fluency` | Decoding Fluency | A1 (24t, needs-review) | yes | ENGL-002, ENGL-005, ENGL-008, ENGL-013, ENGL-016 |
| 15 | `eng.phonetics.speech-sounds-overview` | Overview of Speech Sounds | A1 (30t, no-complete) | yes | ENGL-002, ENGL-004, ENGL-005, ENGL-008, ENGL-013, ENGL-016 |
| 16 | `eng.phonetics.articulation-organs` | Organs of Articulation | A1 (14t, mastered) | none | ENGL-002, ENGL-004, ENGL-009 |
| 17 | `eng.phonetics.consonant-sounds` | Consonant Phoneme Classification | A1 (30t, no-complete) | none | ENGL-002, ENGL-005, ENGL-008 |
| 18 | `eng.phonetics.vowel-sounds` | Vowel Phoneme Classification | A1 (11t, mastered) | none | ENGL-003, ENGL-004, ENGL-009 |
| 19 | `eng.phonetics.ipa-basics` | IPA Basics for English | A1 (13t, mastered) | none | ENGL-003 |
| 20 | `eng.phonetics.minimal-pairs` | Minimal Pairs | A1 (15t, mastered) | none | ENGL-009 |
| 21 | `eng.phonetics.syllable-stress` | Word Stress | A1 (21t, needs-review) | none | ENGL-001, ENGL-003, ENGL-004, ENGL-005 |
| 22 | `eng.phonetics.sentence-stress` | Sentence Stress | A1 (9t, mastered) | none | — |
| 23 | `eng.phonetics.intonation-patterns` | Intonation Patterns | A2 (13t, mastered) | yes | ENGL-017 |
| 24 | `eng.phonetics.connected-speech` | Connected Speech | A2 (17t, needs-review) | none | ENGL-001, ENGL-009 |
| 25 | `eng.phonetics.rhythm-and-timing` | Rhythm and Timing | A2 (21t, needs-review) | none | ENGL-001, ENGL-003, ENGL-005 |
| 26 | `eng.phonetics.accents-and-dialects` | Accents and Dialects | A2 (23t, needs-review) | none | ENGL-001, ENGL-002, ENGL-003, ENGL-005 |
| 27 | `eng.phonetics.phonetic-transcription` | Phonetic Transcription | A2 (18t, needs-review) | none | ENGL-001, ENGL-002, ENGL-003, ENGL-005 |
| 28 | `eng.phonetics.prosody` | Prosody | A2 (26t, needs-review) | none | ENGL-004, ENGL-005, ENGL-007 |
| 29 | `eng.vocab.word-recognition` | Word Recognition | A2 (27t, needs-review) | none | ENGL-005, ENGL-006 |
| 30 | `eng.vocab.context-clues` | Context Clues | A2 (12t, mastered) | none | ENGL-004, ENGL-005 |
| 31 | `eng.vocab.synonyms-antonyms` | Synonyms and Antonyms | A2 (11t, mastered) | none | ENGL-003 |
| 32 | `eng.vocab.word-families` | Word Families | A2 (16t, needs-review) | none | ENGL-001, ENGL-004 |
| 33 | `eng.vocab.compound-words` | Compound Words | A2 (18t, mastered) | none | ENGL-003, ENGL-005 |
| 34 | `eng.vocab.prefixes` | Prefixes | A2 (21t, mastered) | none | ENGL-002, ENGL-003, ENGL-004 |
| 35 | `eng.vocab.suffixes` | Suffixes | A2 (29t, needs-review) | none | ENGL-004, ENGL-005, ENGL-009, ENGL-010 |
| 36 | `eng.vocab.roots-and-origins` | Greek and Latin Roots | A2 (21t, needs-review) | none | ENGL-001, ENGL-002, ENGL-004, ENGL-005, ENGL-006 |
| 37 | `eng.vocab.word-formation-processes` | Word Formation Processes | A2 (28t, needs-review) | none | ENGL-001, ENGL-004, ENGL-005, ENGL-008 |
| 38 | `eng.vocab.homonyms-homophones` | Homonyms and Homophones | A2 (24t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005, ENGL-008 |
| 39 | `eng.vocab.multiple-meaning-words` | Multiple-Meaning Words | A2 (30t, no-complete) | none | ENGL-002, ENGL-005, ENGL-008 |
| 40 | `eng.vocab.connotation-denotation` | Connotation and Denotation | A2 (23t, needs-review) | none | ENGL-001, ENGL-004, ENGL-005 |
| 41 | `eng.vocab.collocations` | Collocations | A2 (21t, needs-review) | none | ENGL-001, ENGL-005 |
| 42 | `eng.vocab.idioms` | Idioms | A2 (22t, needs-review) | none | ENGL-001, ENGL-003, ENGL-005, ENGL-008 |
| 43 | `eng.vocab.phrasal-verbs` | Phrasal Verbs | A2 (7t, mastered) | none | — |
| 44 | `eng.vocab.register-and-formality` | Register and Formality | A2 (8t, mastered) | none | — |
| 45 | `eng.vocab.academic-vocabulary` | Academic Vocabulary | A3 (20t, needs-review) | none | ENGL-002, ENGL-003, ENGL-005 |
| 46 | `eng.vocab.etymology` | Etymology | A3 (24t, needs-review) | yes | ENGL-002, ENGL-005, ENGL-016 |
| 47 | `eng.vocab.thesaurus-and-dictionary-skills` | Thesaurus and Dictionary Skills | A3 (26t, mastered) | yes | ENGL-002, ENGL-004, ENGL-005, ENGL-011, ENGL-016 |
| 48 | `eng.vocab.semantic-fields` | Semantic Fields | A3 (23t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-005, ENGL-017 |
| 49 | `eng.grammar.word-classes-overview` | Overview of Word Classes | A3 (22t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005 |
| 50 | `eng.grammar.nouns` | Nouns | A3 (26t, needs-review) | none | ENGL-001, ENGL-003, ENGL-004 |
| 51 | `eng.grammar.pronouns` | Pronouns | A3 (9t, mastered) | none | — |
| 52 | `eng.grammar.verbs` | Verbs | A3 (7t, mastered) | none | — |
| 53 | `eng.grammar.adjectives` | Adjectives | A3 (18t, needs-review) | none | ENGL-001, ENGL-005 |
| 54 | `eng.grammar.adverbs` | Adverbs | A3 (24t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005 |
| 55 | `eng.grammar.prepositions` | Prepositions | A3 (24t, needs-review) | none | ENGL-001, ENGL-003, ENGL-004, ENGL-005 |
| 56 | `eng.grammar.conjunctions` | Conjunctions | A3 (23t, needs-review) | none | ENGL-001, ENGL-002 |
| 57 | `eng.grammar.interjections` | Interjections | A3 (7t, mastered) | none | ENGL-003 |
| 58 | `eng.grammar.articles-and-determiners` | Articles and Determiners | A3 (22t, needs-review) | none | ENGL-001, ENGL-005, ENGL-006, ENGL-008 |
| 59 | `eng.grammar.subject-and-predicate` | Subject and Predicate | A3 (7t, mastered) | none | — |
| 60 | `eng.grammar.word-order` | Basic Word Order | A3 (9t, mastered) | none | — |
| 61 | `eng.grammar.sentence-types-by-function` | Sentence Types by Function | A3 (11t, mastered) | none | ENGL-002 |
| 62 | `eng.grammar.question-formation` | Question Formation | A3 (8t, mastered) | none | — |
| 63 | `eng.grammar.negation` | Negation | A3 (22t, needs-review) | none | ENGL-002, ENGL-003, ENGL-005, ENGL-012 |
| 64 | `eng.grammar.phrases` | Phrases | A3 (21t, needs-review) | none | ENGL-001, ENGL-003, ENGL-005, ENGL-008, ENGL-009 |
| 65 | `eng.grammar.clauses` | Independent and Dependent Clauses | A3 (22t, needs-review) | none | ENGL-001, ENGL-003, ENGL-005 |
| 66 | `eng.grammar.simple-sentences` | Simple Sentences | A3 (18t, mastered) | none | ENGL-004, ENGL-005 |
| 67 | `eng.grammar.compound-sentences` | Compound Sentences | A4 (20t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005 |
| 68 | `eng.grammar.complex-sentences` | Complex Sentences | A4 (10t, mastered) | none | ENGL-003, ENGL-005 |
| 69 | `eng.grammar.sentence-combining` | Sentence Combining | A4 (27t, mastered) | yes | ENGL-002, ENGL-004, ENGL-005, ENGL-008, ENGL-015, ENGL-016 |
| 70 | `eng.grammar.present-tenses` | Present Tenses | A4 (26t, needs-review) | none | ENGL-002, ENGL-005, ENGL-008, ENGL-010 |
| 71 | `eng.grammar.past-tenses` | Past Tenses | A4 (21t, mastered) | none | ENGL-002, ENGL-004 |
| 72 | `eng.grammar.future-tenses` | Future Tenses | A4 (14t, mastered) | yes | ENGL-002, ENGL-004, ENGL-016 |
| 73 | `eng.grammar.tense-consistency` | Tense Consistency | A4 (18t, mastered) | yes | ENGL-002, ENGL-004, ENGL-005, ENGL-016 |
| 74 | `eng.grammar.modals` | Modal Verbs | A4 (12t, mastered) | none | ENGL-004 |
| 75 | `eng.grammar.conditionals` | Conditional Sentences | A4 (19t, mastered) | none | ENGL-002, ENGL-004, ENGL-005, ENGL-007 |
| 76 | `eng.grammar.active-and-passive-voice` | Active and Passive Voice | A4 (8t, mastered) | none | — |
| 77 | `eng.grammar.direct-and-indirect-speech` | Direct and Indirect Speech | A4 (8t, mastered) | none | — |
| 78 | `eng.grammar.gerunds-and-infinitives` | Gerunds and Infinitives | A4 (20t, mastered) | none | ENGL-004 |
| 79 | `eng.grammar.participles-and-participial-phrases` | Participles and Participial Phrases | A4 (15t, mastered) | none | ENGL-004 |
| 80 | `eng.grammar.subject-verb-agreement` | Subject-Verb Agreement | A4 (10t, mastered) | none | ENGL-002, ENGL-005 |
| 81 | `eng.grammar.pronoun-antecedent-agreement` | Pronoun-Antecedent Agreement | A4 (22t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005 |
| 82 | `eng.grammar.comparatives-and-superlatives` | Comparatives and Superlatives | A4 (10t, mastered) | none | — |
| 83 | `eng.grammar.parallel-structure` | Parallel Structure | A4 (16t, needs-review) | none | ENGL-003, ENGL-005 |
| 84 | `eng.grammar.capitalization-rules` | Capitalization Rules | A4 (13t, mastered) | none | ENGL-003, ENGL-004 |
| 85 | `eng.grammar.end-punctuation` | End Punctuation | A4 (24t, needs-review) | none | ENGL-001, ENGL-002, ENGL-004, ENGL-005, ENGL-007 |
| 86 | `eng.grammar.comma-usage` | Comma Usage | A4 (10t, mastered) | none | ENGL-002 |
| 87 | `eng.grammar.apostrophes` | Apostrophes | A4 (25t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005, ENGL-007 |
| 88 | `eng.grammar.quotation-marks` | Quotation Marks | A4 (24t, needs-review) | none | ENGL-001, ENGL-002 |
| 89 | `eng.grammar.colons-semicolons-dashes` | Colons, Semicolons, and Dashes | A5 (17t, mastered) | none | ENGL-003, ENGL-005, ENGL-009 |
| 90 | `eng.grammar.sentence-fragments` | Sentence Fragments | A5 (27t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-003, ENGL-005, ENGL-015, ENGL-016 |
| 91 | `eng.grammar.run-on-sentences-and-comma-splices` | Run-On Sentences and Comma Splices | A5 (24t, needs-review) | none | ENGL-001, ENGL-002, ENGL-004, ENGL-005 |
| 92 | `eng.reading.print-to-meaning` | From Print to Meaning | A5 (19t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005, ENGL-012 |
| 93 | `eng.reading.reading-fluency` | Reading Fluency | A5 (25t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-005, ENGL-016 |
| 94 | `eng.reading.literal-comprehension` | Literal Comprehension | A5 (19t, needs-review) | yes | ENGL-001, ENGL-003, ENGL-004, ENGL-005, ENGL-016 |
| 95 | `eng.reading.main-idea-and-details` | Main Idea and Supporting Details | A5 (7t, mastered) | yes | ENGL-016 |
| 96 | `eng.reading.inference-in-reading` | Inference in Reading | A5 (14t, mastered) | yes | ENGL-016 |
| 97 | `eng.reading.summarizing` | Summarizing | A5 (7t, mastered) | yes | ENGL-016 |
| 98 | `eng.reading.predicting-and-confirming` | Predicting and Confirming | A5 (31t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-003, ENGL-005, ENGL-016 |
| 99 | `eng.reading.text-structure` | Text Structure | A5 (14t, mastered) | none | ENGL-002, ENGL-003, ENGL-004 |
| 100 | `eng.reading.genre-recognition` | Genre Recognition | A5 (14t, mastered) | none | ENGL-003, ENGL-004 |
| 101 | `eng.reading.authors-purpose-and-tone` | Author's Purpose and Tone | A5 (17t, mastered) | none | ENGL-002, ENGL-003, ENGL-004 |
| 102 | `eng.reading.compare-and-contrast-texts` | Comparing and Contrasting Texts | A5 (32t, no-complete) | yes | ENGL-002, ENGL-004, ENGL-005, ENGL-006, ENGL-008, ENGL-013, ENGL-016 |
| 103 | `eng.reading.skimming-and-scanning` | Skimming and Scanning | A5 (28t, needs-review) | none | ENGL-002, ENGL-003, ENGL-004 |
| 104 | `eng.reading.close-reading` | Close Reading | A5 (7t, mastered) | none | — |
| 105 | `eng.reading.critical-reading` | Critical Reading | A5 (30t, needs-review) | none | ENGL-001, ENGL-002, ENGL-003, ENGL-005, ENGL-008, ENGL-009 |
| 106 | `eng.reading.evaluating-sources` | Evaluating Sources | A5 (25t, needs-review) | none | ENGL-001, ENGL-002, ENGL-003, ENGL-005, ENGL-007 |
| 107 | `eng.reading.reading-across-genres` | Reading Across Genres | A5 (23t, needs-review) | none | ENGL-001, ENGL-002, ENGL-003, ENGL-005 |
| 108 | `eng.writing.handwriting-and-formation` | Handwriting and Letter Formation | A5 (13t, needs-review) | none | ENGL-004 |
| 109 | `eng.writing.spelling-strategies` | Spelling Strategies | A5 (15t, mastered) | none | ENGL-004, ENGL-005 |
| 110 | `eng.writing.sentence-writing` | Sentence Writing | A5 (11t, mastered) | none | ENGL-003 |
| 111 | `eng.writing.paragraph-structure` | Paragraph Structure | A6 (32t, needs-review) | yes | ENGL-002, ENGL-003, ENGL-005, ENGL-008, ENGL-009, ENGL-016 |
| 112 | `eng.writing.topic-sentences` | Topic Sentences | A6 (23t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005, ENGL-010 |
| 113 | `eng.writing.supporting-details` | Supporting Details | A6 (31t, no-complete) | yes | ENGL-002, ENGL-004, ENGL-005, ENGL-016 |
| 114 | `eng.writing.transitions-and-cohesion` | Transitions and Cohesion | A6 (15t, mastered) | yes | ENGL-003, ENGL-005, ENGL-016 |
| 115 | `eng.writing.narrative-writing` | Narrative Writing | A6 (30t, mastered) | yes | ENGL-002, ENGL-003, ENGL-004, ENGL-005, ENGL-008, ENGL-016 |
| 116 | `eng.writing.descriptive-writing` | Descriptive Writing | A6 (29t, mastered) | yes | ENGL-002, ENGL-004, ENGL-005, ENGL-013, ENGL-016, ENGL-017 |
| 117 | `eng.writing.expository-writing` | Expository Writing | A6 (16t, mastered) | yes | ENGL-002, ENGL-004, ENGL-016 |
| 118 | `eng.writing.persuasive-writing-basics` | Persuasive Writing Basics | A6 (13t, mastered) | yes | ENGL-003, ENGL-004, ENGL-016 |
| 119 | `eng.writing.the-writing-process` | The Writing Process | A6 (15t, mastered) | none | ENGL-002, ENGL-004, ENGL-005 |
| 120 | `eng.writing.outlining-and-planning` | Outlining and Planning | A6 (25t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-005, ENGL-008, ENGL-011, ENGL-016 |
| 121 | `eng.writing.drafting` | Drafting | A6 (31t, needs-review) | yes | ENGL-003, ENGL-005, ENGL-008, ENGL-013, ENGL-016 |
| 122 | `eng.writing.revising-for-content` | Revising for Content | A6 (20t, needs-review) | none | ENGL-001, ENGL-003, ENGL-005 |
| 123 | `eng.writing.editing-and-proofreading` | Editing and Proofreading | A6 (15t, mastered) | none | ENGL-004, ENGL-005 |
| 124 | `eng.writing.essay-structure` | Essay Structure | A6 (12t, mastered) | none | ENGL-003, ENGL-005, ENGL-009 |
| 125 | `eng.writing.thesis-statements` | Thesis Statements | A6 (11t, mastered) | none | ENGL-002, ENGL-003 |
| 126 | `eng.writing.citations-and-referencing` | Citations and Referencing | A6 (20t, needs-review) | none | ENGL-001, ENGL-002, ENGL-004, ENGL-015 |
| 127 | `eng.writing.creative-writing-forms` | Creative Writing Forms | A6 (14t, mastered) | none | ENGL-004, ENGL-005 |
| 128 | `eng.listening.active-listening` | Active Listening | A6 (18t, needs-review) | none | ENGL-001 |
| 129 | `eng.listening.listening-for-gist` | Listening for Gist | A6 (10t, mastered) | none | ENGL-003 |
| 130 | `eng.listening.listening-for-detail` | Listening for Detail | A6 (20t, needs-review) | none | ENGL-001, ENGL-005 |
| 131 | `eng.listening.distinguishing-sounds-in-speech` | Distinguishing Sounds in Speech | A6 (10t, mastered) | none | — |
| 132 | `eng.listening.following-instructions` | Following Spoken Instructions | A6 (9t, mastered) | none | ENGL-003, ENGL-009 |
| 133 | `eng.listening.note-taking-while-listening` | Note-Taking While Listening | A7 (7t, mastered) | yes | ENGL-009, ENGL-016 |
| 134 | `eng.listening.listening-comprehension-strategies` | Listening Comprehension Strategies | A7 (8t, mastered) | yes | ENGL-003, ENGL-016 |
| 135 | `eng.listening.critical-listening` | Critical Listening | A7 (29t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-003, ENGL-005, ENGL-006, ENGL-008, ENGL-011, ENGL-016 |
| 136 | `eng.speaking.oral-fluency` | Oral Fluency | A7 (9t, mastered) | none | — |
| 137 | `eng.speaking.pronunciation-in-conversation` | Pronunciation in Conversation | A7 (21t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005 |
| 138 | `eng.speaking.conversation-skills` | Conversation Skills | A7 (25t, needs-review) | none | ENGL-001, ENGL-003, ENGL-004, ENGL-005, ENGL-009, ENGL-012 |
| 139 | `eng.speaking.asking-and-answering-questions` | Asking and Answering Questions | A7 (16t, needs-review) | none | ENGL-002, ENGL-004 |
| 140 | `eng.speaking.storytelling-orally` | Oral Storytelling | A7 (25t, mastered) | none | ENGL-002, ENGL-003, ENGL-004, ENGL-005 |
| 141 | `eng.speaking.discussion-skills` | Discussion Skills | A7 (21t, mastered) | none | ENGL-004, ENGL-005, ENGL-011 |
| 142 | `eng.speaking.public-speaking-basics` | Public Speaking Basics | A7 (21t, needs-review) | none | ENGL-004, ENGL-005 |
| 143 | `eng.speaking.presentation-skills` | Presentation Skills | A7 (29t, needs-review) | none | ENGL-001, ENGL-004, ENGL-005 |
| 144 | `eng.speaking.debate-skills` | Debate Skills | A7 (20t, mastered) | none | ENGL-002, ENGL-003, ENGL-004 |
| 145 | `eng.speaking.non-verbal-communication` | Non-Verbal Communication | A7 (9t, mastered) | none | ENGL-002 |
| 146 | `eng.composition.audience-and-purpose` | Audience and Purpose | A7 (15t, mastered) | none | ENGL-005 |
| 147 | `eng.composition.claim-evidence-reasoning` | Claim, Evidence, and Reasoning | A7 (20t, needs-review) | none | ENGL-001, ENGL-005, ENGL-007 |
| 148 | `eng.composition.argumentation-basics` | Argumentation Basics | A7 (30t, mastered) | none | ENGL-002, ENGL-004, ENGL-005, ENGL-008 |
| 149 | `eng.composition.counterargument-and-rebuttal` | Counterargument and Rebuttal | A7 (25t, mastered) | none | ENGL-002, ENGL-004, ENGL-005 |
| 150 | `eng.composition.logical-fallacies` | Logical Fallacies | A7 (13t, mastered) | none | ENGL-003, ENGL-005, ENGL-007 |
| 151 | `eng.composition.rhetorical-appeals` | Rhetorical Appeals: Ethos, Pathos, Logos | A7 (13t, mastered) | none | ENGL-004 |
| 152 | `eng.composition.rhetorical-devices` | Rhetorical Devices | A7 (16t, mastered) | none | ENGL-002, ENGL-004, ENGL-005, ENGL-014 |
| 153 | `eng.composition.figurative-language-in-composition` | Figurative Language in Composition | A7 (20t, mastered) | none | ENGL-003, ENGL-004, ENGL-005 |
| 154 | `eng.composition.style-voice-and-tone` | Style, Voice, and Tone | A7 (25t, needs-review) | none | ENGL-004, ENGL-005, ENGL-009 |
| 155 | `eng.composition.persuasive-techniques` | Advanced Persuasive Techniques | A8 (12t, mastered) | yes | ENGL-005, ENGL-016 |
| 156 | `eng.composition.rhetorical-analysis` | Rhetorical Analysis | A8 (31t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-004, ENGL-005, ENGL-008, ENGL-016 |
| 157 | `eng.composition.comparative-essay-writing` | Comparative Essay Writing | A8 (15t, mastered) | yes | ENGL-003, ENGL-004, ENGL-016 |
| 158 | `eng.composition.research-paper-writing` | Research Paper Writing | A8 (9t, mastered) | yes | ENGL-009, ENGL-016 |
| 159 | `eng.composition.academic-writing-conventions` | Academic Writing Conventions | A8 (26t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005, ENGL-008 |
| 160 | `eng.composition.plagiarism-and-citation-ethics` | Plagiarism and Citation Ethics | A8 (24t, mastered) | yes | ENGL-002, ENGL-004, ENGL-005, ENGL-016 |
| 161 | `eng.composition.editing-for-style` | Editing for Style | A8 (20t, needs-review) | yes | ENGL-001, ENGL-005, ENGL-008, ENGL-016 |
| 162 | `eng.literature.narrative-elements` | Narrative Elements | A8 (12t, mastered) | none | — |
| 163 | `eng.literature.plot-structure` | Plot Structure | A8 (18t, mastered) | yes | ENGL-005, ENGL-016 |
| 164 | `eng.literature.character-development` | Character Development | A8 (30t, no-complete) | yes | ENGL-002, ENGL-003, ENGL-004, ENGL-005, ENGL-008, ENGL-016 |
| 165 | `eng.literature.setting-and-atmosphere` | Setting and Atmosphere | A8 (9t, mastered) | yes | ENGL-017 |
| 166 | `eng.literature.point-of-view` | Point of View | A8 (15t, mastered) | none | ENGL-003, ENGL-004 |
| 167 | `eng.literature.theme-and-message` | Theme and Message | A8 (31t, no-complete) | none | ENGL-002, ENGL-004, ENGL-005 |
| 168 | `eng.literature.literary-devices-overview` | Overview of Literary Devices | A8 (14t, needs-review) | none | ENGL-004, ENGL-005, ENGL-009 |
| 169 | `eng.literature.metaphor-and-simile` | Metaphor and Simile | A8 (20t, mastered) | none | ENGL-002, ENGL-004, ENGL-005 |
| 170 | `eng.literature.symbolism` | Symbolism | A8 (20t, needs-review) | none | ENGL-001, ENGL-002, ENGL-004 |
| 171 | `eng.literature.irony` | Irony | A8 (17t, mastered) | none | ENGL-004, ENGL-005 |
| 172 | `eng.literature.foreshadowing-and-suspense` | Foreshadowing and Suspense | A8 (23t, needs-review) | none | ENGL-001, ENGL-003, ENGL-005 |
| 173 | `eng.literature.imagery` | Imagery | A8 (7t, mastered) | none | — |
| 174 | `eng.literature.poetry-basics` | Poetry Basics | A8 (20t, mastered) | none | ENGL-004 |
| 175 | `eng.literature.poetic-forms` | Poetic Forms | A8 (11t, mastered) | none | ENGL-004 |
| 176 | `eng.literature.meter-and-rhyme` | Meter and Rhyme | A8 (9t, mastered) | none | — |
| 177 | `eng.literature.drama-basics` | Drama Basics | A9 (18t, mastered) | none | ENGL-003, ENGL-005 |
| 178 | `eng.literature.dramatic-structure` | Dramatic Structure | A9 (27t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-005, ENGL-008, ENGL-016 |
| 179 | `eng.literature.prose-fiction` | Prose Fiction | A9 (8t, mastered) | none | ENGL-002 |
| 180 | `eng.literature.prose-nonfiction` | Prose Nonfiction | A9 (14t, mastered) | none | ENGL-004, ENGL-005 |
| 181 | `eng.literature.short-story-study` | Short Story Study | A9 (24t, needs-review) | none | ENGL-001, ENGL-002, ENGL-003, ENGL-005 |
| 182 | `eng.literature.novel-study` | Novel Study | A9 (15t, needs-review) | none | ENGL-001, ENGL-004 |
| 183 | `eng.literature.literary-genres-overview` | Overview of Literary Genres | A9 (23t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005 |
| 184 | `eng.literature.literary-periods-survey` | Survey of Literary Periods | A9 (7t, mastered) | none | — |
| 185 | `eng.literature.literary-criticism-intro` | Introduction to Literary Criticism | A9 (19t, needs-review) | none | ENGL-001, ENGL-003, ENGL-005, ENGL-012 |
| 186 | `eng.literature.comparative-literature-intro` | Introduction to Comparative Literature | A9 (12t, mastered) | none | ENGL-002 |
| 187 | `eng.linguistics.what-is-linguistics` | What Is Linguistics? | A9 (10t, mastered) | none | ENGL-005 |
| 188 | `eng.linguistics.phonology-intro` | Introduction to Phonology | A9 (23t, needs-review) | none | ENGL-001, ENGL-002, ENGL-003, ENGL-005 |
| 189 | `eng.linguistics.morphology-intro` | Introduction to Morphology | A9 (31t, needs-review) | none | ENGL-001, ENGL-002, ENGL-004, ENGL-005 |
| 190 | `eng.linguistics.syntax-theory-intro` | Introduction to Syntactic Theory | A9 (22t, needs-review) | none | ENGL-001, ENGL-003, ENGL-005, ENGL-008 |
| 191 | `eng.linguistics.semantics-intro` | Introduction to Semantics | A9 (23t, needs-review) | none | ENGL-001, ENGL-005 |
| 192 | `eng.linguistics.pragmatics-intro` | Introduction to Pragmatics | A9 (30t, needs-review) | none | ENGL-001, ENGL-002, ENGL-004, ENGL-005 |
| 193 | `eng.linguistics.discourse-analysis-intro` | Introduction to Discourse Analysis | A9 (22t, mastered) | none | ENGL-002, ENGL-004, ENGL-005 |
| 194 | `eng.linguistics.sociolinguistics-intro` | Introduction to Sociolinguistics | A9 (16t, mastered) | none | ENGL-002, ENGL-005 |
| 195 | `eng.linguistics.historical-linguistics-intro` | Introduction to Historical Linguistics | A9 (21t, needs-review) | none | ENGL-001, ENGL-002, ENGL-005, ENGL-015 |
| 196 | `eng.linguistics.language-families` | Language Families | A9 (19t, needs-review) | none | ENGL-005 |
| 197 | `eng.linguistics.language-acquisition-intro` | Introduction to Language Acquisition | A9 (19t, mastered) | none | ENGL-005 |
| 198 | `eng.linguistics.psycholinguistics-intro` | Introduction to Psycholinguistics | A9 (24t, mastered) | none | ENGL-004, ENGL-005, ENGL-007 |
| 199 | `eng.linguistics.applied-linguistics-intro` | Introduction to Applied Linguistics | A10 (19t, mastered) | none | ENGL-003, ENGL-004, ENGL-005 |
| 200 | `eng.linguistics.dialectology` | Dialectology | A10 (16t, mastered) | none | ENGL-002, ENGL-004, ENGL-005 |
| 201 | `eng.linguistics.bilingualism-and-multilingualism` | Bilingualism and Multilingualism | A10 (13t, mastered) | none | ENGL-002, ENGL-003, ENGL-004 |
| 202 | `eng.linguistics.translation-studies-intro` | Introduction to Translation Studies | A10 (26t, needs-review) | yes | ENGL-002, ENGL-005, ENGL-011, ENGL-017 |
| 203 | `eng.linguistics.corpus-linguistics-intro` | Introduction to Corpus Linguistics | A10 (26t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-005, ENGL-008, ENGL-016 |
| 204 | `eng.linguistics.computational-linguistics-intro` | Introduction to Computational Linguistics | A10 (9t, mastered) | yes | ENGL-005, ENGL-016 |
| 205 | `eng.communication.academic-writing-advanced` | Advanced Academic Writing | A10 (27t, needs-review) | yes | ENGL-001, ENGL-002, ENGL-005, ENGL-011, ENGL-016 |
| 206 | `eng.communication.research-methodology-writing` | Writing Research Methodology | A10 (7t, mastered) | yes | ENGL-016 |
| 207 | `eng.communication.technical-writing` | Technical Writing | A10 (25t, needs-review) | yes | ENGL-002, ENGL-003, ENGL-005, ENGL-016 |
| 208 | `eng.communication.business-writing` | Business Writing | A10 (30t, needs-review) | yes | ENGL-002, ENGL-004, ENGL-005, ENGL-006, ENGL-008, ENGL-015, ENGL-016 |
| 209 | `eng.communication.media-literacy` | Media Literacy | A10 (18t, mastered) | yes | ENGL-002, ENGL-004, ENGL-011, ENGL-016 |
| 210 | `eng.communication.digital-communication` | Digital Communication | A10 (19t, mastered) | yes | ENGL-002, ENGL-003, ENGL-004, ENGL-005, ENGL-016 |
| 211 | `eng.communication.discourse-markers-advanced` | Advanced Discourse Markers | A10 (19t, mastered) | none | ENGL-002, ENGL-004, ENGL-005 |
| 212 | `eng.communication.cross-cultural-communication` | Cross-Cultural Communication | A10 (25t, mastered) | none | ENGL-004, ENGL-005, ENGL-007 |
| 213 | `eng.communication.professional-communication` | Professional Communication | A10 (17t, mastered) | none | ENGL-002, ENGL-004 |
| 214 | `eng.communication.negotiation-language` | Negotiation Language | A10 (24t, needs-review) | none | ENGL-002, ENGL-005, ENGL-008 |
| 215 | `eng.communication.presentation-design` | Presentation Design | A10 (19t, mastered) | none | ENGL-002, ENGL-004, ENGL-005, ENGL-012 |
| 216 | `eng.communication.editing-for-publication` | Editing for Publication | A10 (19t, needs-review) | none | ENGL-001, ENGL-004, ENGL-005, ENGL-007 |


## Not counted as defects

- Learning difficulty: advanced linguistics/literature lessons were hard for a weak-English persona; that is not a defect.
- Persona artefacts: scripted quotations of taught text as "answers" (including upper-case quotes) were sometimes praised.
- Replies that start a correction without the stock "Not quite/That's right" words but still say the answer was wrong or right.
