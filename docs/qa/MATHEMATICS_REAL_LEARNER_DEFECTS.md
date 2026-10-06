# Mathematics Real-Learner Defects

<!-- SUMMARY:START -->
## Summary (generated from the entries below; counts verified automatically)

- Total lessons in Mathematics curriculum (`/api/curriculum?subject=mathematics`): 908
- Total lessons studied (full lesson session driven, ≥3 turns): 526
- Total lessons covered (≥1 account): 526  (57.9 %)
- Total defects: 29
- P0: 0
- P1: 2
- P2: 20
- P3: 7
- Open: 29
- Fixed: 0
<!-- SUMMARY:END -->

## Scope

The complete Mathematics curriculum of the deployed app (`my-tutor-flame.vercel.app`), following the app's own lesson order
(`GET /api/curriculum?subject=mathematics`, 908 lessons), studied as a weak learner by ten owner-supplied test accounts working
**in parallel**. This is a **discovery log**: no application code, prompt, KG, EB, Blueprint, curriculum, grading, mastery,
schema or configuration was changed to produce it. Fixes are out of scope until requested.

Relation to other QA: `docs/qa/CHEMISTRY_REAL_LEARNER_DEFECTS.md` (`CHEM-*`) and `docs/qa/BIOLOGY_REAL_LEARNER_DEFECTS.md`
(`BIO-*`) use the same method; mechanisms shared with them are noted as "same as CHEM-/BIO-NNN" in the entries.
This file is the canonical Mathematics real-learner log and uses `MATH-NNN` IDs. No other Mathematics real-learner log existed
(`docs/qa/` held only Chemistry, English, Physics and Biology files).

## Learners and distribution

Ten test accounts (`test1`–`test10`, identified only as **Account 1–10**; credentials are never recorded). Each was enrolled in
Mathematics through the app's own `POST /api/subjects/enroll`. The 908 lessons were split into ten contiguous blocks, all
accounts running **simultaneously**:

| Account | Lesson orders |
|---|---|
| 1 | 1–91 |
| 2 | 92–182 |
| 3 | 183–273 |
| 4 | 274–364 |
| 5 | 365–455 |
| 6 | 456–546 |
| 7 | 547–637 |
| 8 | 638–728 |
| 9 | 729–819 |
| 10 | 820–908 |

Persona: lower-than-intermediate English, basic Mathematics, short messages, sometimes right, sometimes wrong (~28 % of card
answers deliberately wrong), sometimes confused; uses "explain simpler", "give me example", "give me example with numbers",
"i dont understand", "i dont understand this picture", "what is this?", "why?", "show me step by step", "too many words",
"next question please", "quiz me", "explain again", "ok", "continue". Never told Tutor Max it was QA.

## Method and limits (read before trusting any count)

- Driven through the app's own HTTP API (`/api/sessions`, `/api/learn/lesson-init`, `/api/learn/chat`) as the logged-in learner,
  one new session per lesson, with a scripted persona. Card answers are chosen with a picker built from the repo's own
  Mathematics probe corpus (`src/lib/teaching/assets/mathematics*.ts`) with a planned error rate; free-text answers quote taught
  content or say "i dont know". Entries are only things actually seen in a transcript or a served figure payload.
- Because answers are scripted, some tutor praise or drift after a scripted free-text answer is a persona artefact; entries say so.
- **Provider policy for this run (owner instruction):** use Groq only. When a reply came back degraded, or from a non-Groq LLM, the
  driver waited 10 s and re-sent the same message (up to 6 times); a non-Groq reply was never accepted as a teaching turn.
  This could not be enforced server-side from the client: the provider chain is server configuration. Every failed attempt is kept
  in the transcript and counted under MATH-006. The first part of the run (before the instruction) used a 25 s pause instead.
- **Visuals were checked in three ways:** (1) every served figure payload was validated with the repo's own `validateSceneSpec` /
  `parseVisualSpec`; (2) every unique figure was rendered with the app's own `VisualCard` / `VisualRenderer` / `SceneSpecFigure`
  in headless Chromium (local `next dev`, no database) and screenshotted; text outside its drawing box was counted automatically;
  (3) a sample of the screenshots was reviewed by eye and compared with the concept taught. Pixel-exact rendering on real devices
  and the production CDN was **not tested**.
- **The deployed app changed while this run was in progress** (other sessions fix Chemistry/Biology on the same `main`, and Vercel deploys
  every push). Production deployments seen during the run (UTC, from the Vercel API): `42b44da` live since 03:32 on 2026-10-06 (Chemistry
  fixes, already live when the Mathematics run started at about 07:41); `6f6ccaa` from 08:25 (includes the Biology fixes `c4a6afc`:
  cards, wording, promises, figures, budget close); later deployments carried documentation only. Each transcript records its start time;
  the register compares mechanism rates for lessons started before and after 08:27 (see "Deployment changes during the run"). The
  Chemistry/Biology fixes are subject-scoped, so they were not expected to change Mathematics, and the comparison below is what was measured.
- Systemic mechanisms (empathy openers, analogy loops, repeated cards, pauses, degraded replies, curriculum-goal dumps, wrong-concept
  figures, math-delimiter errors) are **linked automatically** from all transcripts by pattern; their occurrence lists are computed,
  not hand-picked. One-off content errors were found by reading each transcript; a regex check of simple "a op b = c" arithmetic
  statements found no wrong ones, so MATH-007/008 (algebra slips) come from reading only.
- Lessons were driven to natural completion, a "pause/needs-review" close, or a 30-turn cap.
- Terms: **studied** = a full lesson session driven; **observed** = seen in a transcript; **reproduced** = seen more than once;
  **systemic** = a mechanism across many lessons; **blocked** = could not proceed; **uncertain** = not established; **not tested**.
- Each lesson was driven once on one account. Deterministic content errors are assumed to repeat but a second-account
  reproduction was **not tested**; model-generated worked examples differ on every request, so MATH-007/008 may not repeat.
- The tutor addresses the learner by the account label ("test4", "test 10"); that is the account's display name, not counted as a defect.

## Severity key

P0 = learning completely blocked · P1 = seriously damages learning/trust · P2 = noticeable but non-blocking · P3 = minor/polish.


## Defects

### MATH-001 — Lessons end with "Let's pause … worth another look later" / "on pause — you haven't mastered it yet" while the learner is still answering, with mastery incomplete

- Severity: P1
- Category: Mastery/progress
- Date/time: 2026-10-06 07:46 UTC
- Account: Account 8
- Mathematics concept: `math.stats.hypothesis-testing`
- Lesson/order: #639
- Learner message: Type II error (card answer, 17th turn)
- Tutor response: "Let's pause Hypothesis Testing here for now. Worth another look later: Hypothesis Testing. Press \"Start next lesson\"…" — closing state "on pause — you haven't mastered it yet" (mastery phase DEMONSTRATE, 0 verified checks).
- Expected behaviour: A learner who is still engaged, or asks for help, is kept in the lesson until mastery is verified or they leave.
- Actual behaviour: The lesson is closed as needs-review in the middle of the lesson.
- Why it is a defect: The learner is ejected from a lesson they have not finished; same mechanism as CHEM-016 and BIO-002.
- Reproducibility: Seen on the first 10 finished Mathematics lessons; counted at the end of the run.
- Also observed (226 occurrences in 226 lessons): #2 (A1) t22; #6 (A1) t22; #7 (A1) t13; #8 (A1) t18; #9 (A1) t24; #14 (A1) t19; #15 (A1) t19; #20 (A1) t19; #21 (A1) t23; #26 (A1) t22; #27 (A1) t20; #31 (A1) t18; #32 (A1) t18; #39 (A1) t14; #40 (A1) t19; #41 (A1) t21; #46 (A1) t25; #48 (A1) t20; #49 (A1) t19; #50 (A1) t20; #51 (A1) t19; #53 (A1) t20; #55 (A1) t19; #59 (A1) t25; #63 (A1) t20; #65 (A1) t20; #66 (A1) t21; #67 (A1) t22; #820 (A10) t29; #821 (A10) t19; #824 (A10) t21; #825 (A10) t16; #826 (A10) t23; #831 (A10) t21; #833 (A10) t19; #836 (A10) t26; #837 (A10) t8; #842 (A10) t24; #843 (A10) t22; #848 (A10) t19; #853 (A10) t23; #857 (A10) t30; #858 (A10) t20; #859 (A10) t20; #860 (A10) t17; #863 (A10) t30; #92 (A2) t18; #93 (A2) t22; #98 (A2) t23; #103 (A2) t23; #105 (A2) t26; #113 (A2) t22; #114 (A2) t19; #115 (A2) t25; #117 (A2) t20; #119 (A2) t22; #120 (A2) t20; #121 (A2) t20; #124 (A2) t18; #125 (A2) t26; #126 (A2) t21; #127 (A2) t17; #128 (A2) t27; #132 (A2) t22; #135 (A2) t22; #136 (A2) t21; #137 (A2) t22; #139 (A2) t24; #141 (A2) t20; #143 (A2) t20; #146 (A2) t18; #183 (A3) t14; #192 (A3) t29; #196 (A3) t19; #198 (A3) t23; #200 (A3) t14; #203 (A3) t20; #206 (A3) t16; #207 (A3) t18; #215 (A3) t23; #218 (A3) t20; #220 (A3) t20; #221 (A3) t25; #223 (A3) t21; #224 (A3) t17; #226 (A3) t16; #228 (A3) t27; #230 (A3) t26; #232 (A3) t19; #234 (A3) t27; #235 (A3) t10; #237 (A3) t12; #238 (A3) t16; #240 (A3) t16; #241 (A3) t15; #276 (A4) t26; #277 (A4) t13; #278 (A4) t24; #280 (A4) t14; #281 (A4) t17; #282 (A4) t26; #283 (A4) t13; #285 (A4) t21; #292 (A4) t26; #295 (A4) t30; #296 (A4) t21; #297 (A4) t16; #300 (A4) t27; #302 (A4) t22; #303 (A4) t23; #307 (A4) t22; #309 (A4) t23; #313 (A4) t28; #314 (A4) t19; #317 (A4) t20; #318 (A4) t28; #325 (A4) t20; #326 (A4) t21; #327 (A4) t25; #328 (A4) t24; #331 (A4) t20; #332 (A4) t19; #368 (A5) t18; #369 (A5) t13; #370 (A5) t25; #377 (A5) t20; #379 (A5) t19; #380 (A5) t22; #381 (A5) t16; #382 (A5) t20; #385 (A5) t21; #386 (A5) t22; #388 (A5) t11; #390 (A5) t22; #395 (A5) t23; #397 (A5) t21; #399 (A5) t10; #402 (A5) t20; #403 (A5) t24; #409 (A5) t23; #457 (A6) t21; #459 (A6) t19; #462 (A6) t20; #463 (A6) t24; #464 (A6) t22; #468 (A6) t21; #469 (A6) t23; #471 (A6) t30; #472 (A6) t20; #473 (A6) t25; #474 (A6) t20; #475 (A6) t23; #476 (A6) t20; #479 (A6) t21; #486 (A6) t18; #489 (A6) t30; #491 (A6) t23; #492 (A6) t29; #493 (A6) t29; #494 (A6) t19; #495 (A6) t19; #548 (A7) t7; #549 (A7) t15; #552 (A7) t19; #553 (A7) t23; #554 (A7) t29; #557 (A7) t22; #559 (A7) t19; #560 (A7) t26; #561 (A7) t22; #563 (A7) t19; #566 (A7) t20; #567 (A7) t22; #568 (A7) t19; #569 (A7) t16; #573 (A7) t21; #575 (A7) t18; #577 (A7) t21; #579 (A7) t20; #584 (A7) t19; #587 (A7) t26; #589 (A7) t23; #590 (A7) t21; #591 (A7) t20; #592 (A7) t29; #593 (A7) t20; #639 (A8) t18; #642 (A8) t28; #650 (A8) t20; #651 (A8) t22; #653 (A8) t26; #654 (A8) t21; #655 (A8) t23; #656 (A8) t16; #661 (A8) t23; #664 (A8) t25; #666 (A8) t25; #669 (A8) t22; #680 (A8) t21; #681 (A8) t24; #683 (A8) t20; #684 (A8) t19; #733 (A9) t22; #734 (A9) t19; #735 (A9) t22; #736 (A9) t28; #737 (A9) t23; #739 (A9) t19; #740 (A9) t20; #741 (A9) t18; #742 (A9) t24; #743 (A9) t19; #746 (A9) t21; #747 (A9) t20; #749 (A9) t14; #750 (A9) t28; #751 (A9) t13; #755 (A9) t20; #757 (A9) t17; #759 (A9) t12; #761 (A9) t22; #763 (A9) t25; #767 (A9) t20; #768 (A9) t21; #770 (A9) t21; #774 (A9) t22
- Related defect: —
- Status: OPEN

### MATH-002 — A wrong card answer gets no verdict; the reply is a stock "I see where that idea is coming from… figure beside this message" and the next card

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-06 07:46 UTC
- Account: Account 8
- Mathematics concept: `math.stats.hypothesis-testing`
- Lesson/order: #639
- Learner message: It is the probability that the sample mean equals the population mean. (wrong option of a card on p-values)
- Tutor response: "I see where that idea is coming from. Take a look at the figure beside this message — it's a general illustration related to the topic. One to try. There's no rush."
- Expected behaviour: Say the answer is not right and explain why, using the learner's chosen option.
- Actual behaviour: No verdict and no explanation; a generic sentence plus a new card.
- Why it is a defect: The learner is never told they were wrong and gets no correction; same as BIO-016.
- Reproducibility: Seen in lesson 639 turn 15.
- Also observed (243 occurrences in 197 lessons): #94 (A2) t12/t9; #6 (A1) t9/t20; #1 (A1) t4; #4 (A1) t4; #5 (A1) t5; #9 (A1) t11; #10 (A1) t27; #11 (A1) t4; #12 (A1) t6/t13; #16 (A1) t4; #17 (A1) t3/t11; #18 (A1) t3; #19 (A1) t5; #21 (A1) t3/t14; #24 (A1) t4; #25 (A1) t4; #27 (A1) t9/t17; #32 (A1) t5; #33 (A1) t7; #34 (A1) t3; #37 (A1) t4; #42 (A1) t3; #44 (A1) t4; #45 (A1) t3; #46 (A1) t3; #48 (A1) t11; #50 (A1) t6/t10; #52 (A1) t18; #54 (A1) t16; #58 (A1) t5; #60 (A1) t3; #64 (A1) t5/t8/t14; #65 (A1) t12; #67 (A1) t12; #69 (A1) t4/t7; #820 (A10) t9; #821 (A10) t4/t7/t10/t13; #822 (A10) t16; #824 (A10) t6; #825 (A10) t4; #826 (A10) t3/t9; #828 (A10) t15; #831 (A10) t13; #833 (A10) t3/t16; #834 (A10) t4/t17; #836 (A10) t4; #840 (A10) t4; #842 (A10) t5; #843 (A10) t11; #848 (A10) t4/t8; #850 (A10) t5; #852 (A10) t6; #853 (A10) t3; #854 (A10) t4; #855 (A10) t7; #858 (A10) t3/t14; #861 (A10) t5; #862 (A10) t4; #863 (A10) t16; #93 (A2) t11; #102 (A2) t3; #106 (A2) t9; #107 (A2) t5; #114 (A2) t8; #117 (A2) t3; #118 (A2) t4/t11; #120 (A2) t5/t9; #121 (A2) t4; #125 (A2) t3/t7; #127 (A2) t9; #128 (A2) t4; #132 (A2) t4; #134 (A2) t4; #135 (A2) t8/t11; #136 (A2) t18; #138 (A2) t9; #142 (A2) t13; #184 (A3) t3; #187 (A3) t11/t16/t24; #189 (A3) t4/t14; #190 (A3) t10; #201 (A3) t5; #207 (A3) t8; #208 (A3) t17; #216 (A3) t4; #223 (A3) t18; #225 (A3) t17; #232 (A3) t16; #233 (A3) t7; #236 (A3) t4; #275 (A4) t3; #276 (A4) t5; #278 (A4) t5/t21; #280 (A4) t3; #282 (A4) t24; #288 (A4) t4; #290 (A4) t3; #294 (A4) t9; #295 (A4) t10; #296 (A4) t16; #301 (A4) t4; #314 (A4) t9; #317 (A4) t12; #318 (A4) t13/t17; #326 (A4) t11; #327 (A4) t9; #331 (A4) t16; #334 (A4) t4; #335 (A4) t3; #370 (A5) t12; #372 (A5) t5/t10; #374 (A5) t7; #375 (A5) t22; #382 (A5) t4; #385 (A5) t4; #387 (A5) t6; #393 (A5) t3/t6; #396 (A5) t15; #397 (A5) t13; #398 (A5) t5; #401 (A5) t15; #403 (A5) t22; #408 (A5) t7; #410 (A5) t5/t8; #456 (A6) t4; #458 (A6) t9; #459 (A6) t11; #462 (A6) t8; #464 (A6) t6; #468 (A6) t14; #469 (A6) t7; #471 (A6) t3; #473 (A6) t6; #474 (A6) t10; #475 (A6) t13/t16; #476 (A6) t5; #481 (A6) t15; #486 (A6) t3; #489 (A6) t3; #490 (A6) t6; #492 (A6) t10; #493 (A6) t17; #494 (A6) t3; #547 (A7) t4; #549 (A7) t3; #553 (A7) t5; #558 (A7) t8; #560 (A7) t7/t21; #561 (A7) t13; #563 (A7) t10; #571 (A7) t5; #573 (A7) t11/t13; #576 (A7) t3/t6; #577 (A7) t6; #579 (A7) t3; #580 (A7) t4; #581 (A7) t3; #582 (A7) t5; #583 (A7) t4; #584 (A7) t3/t12/t15; #586 (A7) t4; #592 (A7) t4/t15; #639 (A8) t15; #640 (A8) t4; #643 (A8) t12; #646 (A8) t6/t15; #648 (A8) t7/t15; #649 (A8) t17; #651 (A8) t14; #652 (A8) t11; #653 (A8) t15; #654 (A8) t3; #655 (A8) t9; #657 (A8) t3; #662 (A8) t3; #665 (A8) t3; #667 (A8) t7; #668 (A8) t19; #669 (A8) t3; #670 (A8) t12; #677 (A8) t17/t24; #680 (A8) t3/t15; #683 (A8) t15; #731 (A9) t10/t17; #733 (A9) t20; #738 (A9) t4; #743 (A9) t13; #745 (A9) t15; #750 (A9) t11; #753 (A9) t11; #755 (A9) t6; #756 (A9) t19; #757 (A9) t4; #761 (A9) t4/t7; #764 (A9) t17; #765 (A9) t4; #774 (A9) t3/t15
- Notes on occurrences: #94 t12: Correct card answer ("Because the ones digit of the top number is smaller…") answered with an addition story about 7 + 5 apples, no verdict · #6 t9: Card answer "Solve Math Problem" -> "the two equations you wrote for the garden" (the learner wrote nothing)
- Related defect: —
- Status: OPEN

### MATH-003 — The same card is shown again word for word within one lesson

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05
- Account: Account 6
- Mathematics concept: `math.abst.galois-correspondence`
- Lesson/order: #729
- Learner message: (card sequence)
- Tutor response: Card "Does the correspondence between intermediate fields and subgroups account for every intermediate field, or could some be missed?" shown at turn 6 and again at turn 11; "Does a larger intermediate field correspond to a larger or a smaller subgroup?" at turn 8 and again at turn 12.5 (options only re-ordered).
- Expected behaviour: Each card is asked once per lesson; a new probe is used for a re-check.
- Actual behaviour: The same question is repeated with shuffled options.
- Why it is a defect: A repeated card is answered from memory; it inflates correct counts and wastes learner time; same as BIO-018.
- Reproducibility: Seen in several of the first 10 lessons (92, 547, 729).
- Also observed (688 occurrences in 284 lessons): #1 (A1) t24.5; #3 (A1) t7/t8.5; #4 (A1) t21/t22.5; #7 (A1) t7/t8; #10 (A1) t17/t27; #16 (A1) t13/t14/t15.5; #17 (A1) t15/t16/t17.5; #21 (A1) t14; #22 (A1) t7/t8.5; #23 (A1) t9/t10.5; #24 (A1) t11.5; #25 (A1) t21; #26 (A1) t14/t15; #28 (A1) t13/t14.5; #29 (A1) t10/t11.5; #33 (A1) t28/t29/t30.5; #34 (A1) t25/t26.5; #36 (A1) t7/t8.5; #38 (A1) t10/t11.5; #39 (A1) t8/t9/t10; #40 (A1) t13/t14/t15; #41 (A1) t13/t14/t15/t16/t17; #43 (A1) t11/t12.5; #44 (A1) t15/t16.5; #45 (A1) t14/t15/t16.5; #46 (A1) t14/t20/t21/t22; #52 (A1) t23/t24/t25.5; #54 (A1) t21/t22.5; #56 (A1) t7/t8.5; #59 (A1) t18/t19; #60 (A1) t13/t14/t15/t16; #61 (A1) t8.5; #62 (A1) t9/t10.5; #64 (A1) t18/t19/t20.5; #66 (A1) t9/t10; #69 (A1) t11/t12/t13.5; #820 (A10) t26; #822 (A10) t21/t22.5; #825 (A10) t11/t12; #827 (A10) t21/t22/t23.5; #828 (A10) t20/t23/t24.5; #829 (A10) t24/t25/t26/t27.5; #830 (A10) t7/t8.5; #832 (A10) t13/t14.5; #834 (A10) t23/t24.5; #835 (A10) t26/t27/t28.5; #836 (A10) t22; #838 (A10) t17/t18/t26; #839 (A10) t15/t16/t17/t18; #840 (A10) t16.5; #842 (A10) t14/t15/t16; #843 (A10) t15/t16/t17/t18; #844 (A10) t12/t13; #846 (A10) t17/t18.5; #850 (A10) t13; #852 (A10) t10.5; #853 (A10) t17/t18/t19; #854 (A10) t22/t23.5; #856 (A10) t21/t22/t23/t24.5; #857 (A10) t30.5; #859 (A10) t15/t16; #860 (A10) t12/t13/t14; #862 (A10) t11/t12.5; #863 (A10) t26/t30.5; #864 (A10) t7; #92 (A2) t9/t10; #94 (A2) t27/t28; #96 (A2) t24/t25/t26.5; #97 (A2) t21/t24/t25/t26; #98 (A2) t18/t19; #100 (A2) t8.5; #102 (A2) t13/t14.5; #103 (A2) t20; #106 (A2) t26; #107 (A2) t29/t30.5; #108 (A2) t11/t12/t13/t14.5; #109 (A2) t25/t26/t27/t28; #110 (A2) t26/t27/t28/t29/t30.5; #111 (A2) t22/t29; #112 (A2) t19.5; #115 (A2) t17/t18/t19; #122 (A2) t14/t17/t18/t19/t20.5; #124 (A2) t11/t12/t13/t14; #125 (A2) t22/t23; #127 (A2) t13; #128 (A2) t19/t20/t21; #130 (A2) t7/t8.5; #131 (A2) t18.5; #132 (A2) t14/t15/t16/t17; #133 (A2) t8/t9.5; #134 (A2) t11/t12/t13; #138 (A2) t27; #139 (A2) t18/t19/t20; #142 (A2) t17/t18/t19/t20.5; #144 (A2) t19/t20/t21/t22/t23; #184 (A3) t22/t23/t24/t25.5; #185 (A3) t12.5; #187 (A3) t29/t30; #189 (A3) t26; #190 (A3) t19/t20/t21/t22.5; #192 (A3) t25; #193 (A3) t15/t16/t17; #200 (A3) t9/t10; #201 (A3) t13/t14.5; #202 (A3) t7/t8.5; #204 (A3) t19/t20/t21.5; #205 (A3) t9; #206 (A3) t7/t8; #208 (A3) t23/t24/t25.5; #210 (A3) t21/t22/t23.5; #211 (A3) t24/t25/t26/t27; #221 (A3) t15/t18/t19; #222 (A3) t7/t8/t9; #225 (A3) t21/t22/t23/t24; #226 (A3) t8/t9; #228 (A3) t21/t22/t23/t24; #229 (A3) t7/t11/t12; #230 (A3) t20/t21/t22/t23; #231 (A3) t26; #233 (A3) t27; #234 (A3) t20/t21/t22/t23; #235 (A3) t7; #237 (A3) t8; #238 (A3) t10/t11/t12; #240 (A3) t9; #242 (A3) t12/t13/t14; #244 (A3) t10/t11/t12/t13.5; #275 (A4) t10/t11.5; #276 (A4) t15/t19/t22/t23; #277 (A4) t7/t8; #279 (A4) t17.5; #280 (A4) t11/t12; #281 (A4) t11/t12/t13; #283 (A4) t9/t10; #284 (A4) t15/t16/t17/t18; #286 (A4) t15.5; #287 (A4) t14/t15.5; #288 (A4) t7/t18/t19/t20.5; #290 (A4) t24/t25/t26/t27.5; #291 (A4) t25/t26/t27.5; #292 (A4) t17/t18/t19; #293 (A4) t9/t10; #294 (A4) t25/t26/t30; #295 (A4) t24/t25; #297 (A4) t14; #298 (A4) t12.5; #299 (A4) t16/t17/t18.5; #304 (A4) t16/t17/t18.5; #306 (A4) t8/t9; #307 (A4) t22.5; #308 (A4) t10/t11/t12.5; #309 (A4) t14/t15/t16/t17; #313 (A4) t21/t22/t23/t24; #321 (A4) t17/t18/t19/t20.5; #322 (A4) t23/t24/t25/t26.5; #323 (A4) t7/t8.5; #324 (A4) t11/t12.5; #327 (A4) t25.5; #329 (A4) t11/t12.5; #333 (A4) t17/t20; #366 (A5) t8; #367 (A5) t18/t19/t20.5; #368 (A5) t8/t9/t12; #370 (A5) t19/t20/t21; #371 (A5) t10/t11; #373 (A5) t13/t14/t18/t23; #376 (A5) t8/t12/t13; #377 (A5) t10/t11/t12/t13; #381 (A5) t13/t14; #383 (A5) t13/t16/t19/t20.5; #384 (A5) t21/t22/t23/t24.5; #387 (A5) t13; #388 (A5) t8; #389 (A5) t18/t19.5; #390 (A5) t17/t22.5; #391 (A5) t15/t16/t21; #393 (A5) t12/t13.5; #394 (A5) t9.5; #395 (A5) t12/t13/t14/t15; #396 (A5) t19/t20/t21.5; #398 (A5) t17/t21/t22/t25/t26; #399 (A5) t7/t8; #401 (A5) t18/t19/t20/t21.5; #402 (A5) t13; #404 (A5) t22/t23.5; #405 (A5) t25/t26/t27/t28; #408 (A5) t13/t14/t15.5; #409 (A5) t15/t16/t17/t18; #410 (A5) t14.5; #412 (A5) t17.5; #457 (A6) t11/t12/t13/t14; #458 (A6) t16.5; #460 (A6) t21/t26/t27/t28/t29; #461 (A6) t7/t8.5; #465 (A6) t9.5; #466 (A6) t12/t13/t14/t15; #467 (A6) t16/t17.5; #469 (A6) t13/t14; #471 (A6) t25; #472 (A6) t10/t11/t14/t15; #473 (A6) t17/t18/t19/t20/t21; #477 (A6) t8.5; #478 (A6) t21/t22.5; #480 (A6) t14/t18/t19/t20; #481 (A6) t26/t27/t28.5; #485 (A6) t21.5; #486 (A6) t10/t11; #487 (A6) t17.5; #488 (A6) t7/t8.5; #489 (A6) t16/t21/t24/t25; #490 (A6) t14/t15/t16.5; #493 (A6) t21/t22/t23/t25; #496 (A6) t12/t16; #498 (A6) t13/t14/t15/t16.5; #547 (A7) t12/t13.5; #549 (A7) t10/t11; #550 (A7) t17; #553 (A7) t17/t18/t19; #554 (A7) t24; #556 (A7) t18.5; #562 (A7) t17/t18.5; #564 (A7) t22/t23/t24.5; #565 (A7) t8/t9.5; #568 (A7) t12/t19.5; #569 (A7) t12/t13; #571 (A7) t11/t12/t13; #572 (A7) t16/t17.5; #576 (A7) t17/t19/t20/t21/t22; #580 (A7) t11; #581 (A7) t11/t12/t13; #582 (A7) t12/t13; #585 (A7) t8; #586 (A7) t25/t26/t27/t28.5; #587 (A7) t22; #588 (A7) t15/t16/t17/t18.5; #642 (A8) t22/t23/t24/t25; #643 (A8) t22/t23/t24/t25.5; #647 (A8) t24/t30; #648 (A8) t21/t22.5; #649 (A8) t21/t25; #650 (A8) t12/t13/t14; #653 (A8) t20/t21/t22; #656 (A8) t7/t10/t11; #657 (A8) t12.5; #658 (A8) t17.5; #659 (A8) t7/t14/t15.5; #660 (A8) t8; #662 (A8) t16.5; #663 (A8) t14.5; #664 (A8) t16/t17/t18; #665 (A8) t11.5; #666 (A8) t14/t15/t16/t17; #667 (A8) t11.5; #668 (A8) t19; #670 (A8) t20.5; #672 (A8) t8/t9.5; #673 (A8) t8/t9.5; #675 (A8) t16/t17.5; #676 (A8) t13/t14; #678 (A8) t7/t8.5; #682 (A8) t18; #729 (A9) t11/t12.5; #730 (A9) t13/t14/t15.5; #731 (A9) t22/t23/t24.5; #732 (A9) t9/t10.5; #734 (A9) t10; #736 (A9) t18/t19/t20/t21; #741 (A9) t8/t12/t13; #744 (A9) t25/t26/t27; #745 (A9) t22/t23/t24; #746 (A9) t16/t17; #748 (A9) t7/t8; #749 (A9) t8/t9; #750 (A9) t22/t23/t24/t25; #752 (A9) t7/t8.5; #753 (A9) t15.5; #754 (A9) t27/t28/t29/t30; #758 (A9) t13/t14.5; #759 (A9) t7/t8; #762 (A9) t9; #764 (A9) t22/t23/t24.5; #765 (A9) t12.5; #771 (A9) t10/t11; #772 (A9) t7/t8.5
- Related defect: —
- Status: OPEN

### MATH-004 — "i dont know" is answered with a promise of a simpler step that never arrives ("Let’s make it simpler.") and the lesson drops back a phase

- Severity: P2
- Category: Adaptation
- Date/time: 2026-10-06 07:41 UTC
- Account: Account 10
- Mathematics concept: `math.meas.simple-function`
- Lesson/order: #820
- Learner message: i dont know
- Tutor response: "I hear you—it can be a bit confusing at first. Let’s make it simpler." (the whole reply; no simpler content follows; mastery phase CHECK -> GUIDE).
- Expected behaviour: A simpler re-explanation or a smaller question.
- Actual behaviour: Only the promise sentence.
- Why it is a defect: A struggling learner gets nothing to work with; same as BIO-011.
- Reproducibility: Seen in lesson 820 turn 12.
- Also observed (2 occurrences in 2 lessons): #820 (A10) t12; #826 (A10) t7
- Related defect: —
- Status: OPEN

### MATH-005 — "show me step by step" / "give me example" is answered with a new question instead of the steps or the example

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-06 07:41 UTC
- Account: Account 10
- Mathematics concept: `math.meas.simple-function`
- Lesson/order: #820
- Learner message: show me step by step
- Tutor response: "Which term in the expression \(4\cdot\mathbf 1_{[0,2)} + 1\cdot\mathbf 1_{[2,4)} + 0\cdot\mathbf 1_{[4,5]}\) corresponds to the interval \([2,4)\)?" Also lesson 651: "show me step by step" -> "Can you walk me through the steps you’d take to compute the regression coefficients…?"; "give me example with numbers" -> "Can you walk me through the reasoning behind that idea?"
- Expected behaviour: A numbered worked example, as in other lessons.
- Actual behaviour: A counter-question about a term.
- Why it is a defect: The learner asked to be shown, and is quizzed instead.
- Reproducibility: Seen in lesson 820 turn 11.
- Also observed (7 occurrences in 6 lessons): #820 (A10) t11; #97 (A2) t6; #284 (A4) t9; #391 (A5) t6; #651 (A8) t5/t9; #681 (A8) t6
- Related defect: —
- Status: OPEN

### MATH-006 — Degraded fallback replies ("Sorry — my answer didn't come through just now…") instead of an answer — the Groq call failed

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-06 07:47 UTC
- Account: Account 9
- Mathematics concept: `math.abst.group-inverse`
- Lesson/order: #730
- Learner message: give me example with numbers
- Tutor response: "Sorry — my answer didn't come through just now. Please send your message again in a moment; your progress is saved."
- Expected behaviour: The request is answered, or retried server-side.
- Actual behaviour: A canned apology; the learner must resend.
- Why it is a defect: Groq failed (provider=degraded) and nothing recovered it; the learner loses the turn. Counted per instance.
- Reproducibility: Seen repeatedly under 10-account load.
- Also observed (457 occurrences in 223 lessons): #5 (A1) t7; #7 (A1) t11/t12; #8 (A1) t16/t17; #9 (A1) t15/t18/t20; #12 (A1) t1; #19 (A1) t3; #20 (A1) t6; #26 (A1) t17; #27 (A1) t7; #28 (A1) t2; #31 (A1) t7; #33 (A1) t19/t24/t26; #34 (A1) t16; #52 (A1) t3; #54 (A1) t9/t12; #55 (A1) t12; #58 (A1) t1/t2; #59 (A1) t6/t7/t8; #63 (A1) t15; #821 (A10) t1; #822 (A10) t14/t18; #824 (A10) t3; #826 (A10) t11/t12/t19/t21; #827 (A10) t1/t10/t12; #828 (A10) t7/t10/t11; #829 (A10) t1; #831 (A10) t1; #834 (A10) t6; #837 (A10) t7; #838 (A10) t12/t13/t16/t24; #844 (A10) t5; #845 (A10) t2; #848 (A10) t6/t14; #849 (A10) t10; #851 (A10) t7; #852 (A10) t2; #853 (A10) t12; #855 (A10) t1/t12; #857 (A10) t17/t19/t25; #858 (A10) t12; #93 (A2) t5; #94 (A2) t30; #97 (A2) t21/t29; #98 (A2) t5/t6/t9/t10/t15; #99 (A2) t6/t7/t11/t13/t19/t20/t21/t22/t23; #101 (A2) t14; #103 (A2) t11/t13; #105 (A2) t2/t16/t19/t20/t21; #106 (A2) t16/t18/t29; #110 (A2) t12/t17; #111 (A2) t24; #112 (A2) t5/t13; #113 (A2) t6/t11/t14; #114 (A2) t14; #116 (A2) t3; #117 (A2) t7; #118 (A2) t19/t20; #121 (A2) t8; #128 (A2) t26; #131 (A2) t4; #135 (A2) t15/t16; #137 (A2) t13; #138 (A2) t1/t3/t11/t13; #139 (A2) t1/t4; #140 (A2) t6; #141 (A2) t13; #186 (A3) t5; #187 (A3) t1/t2/t13/t14/t17; #189 (A3) t11/t30; #191 (A3) t1/t3/t5; #192 (A3) t1/t7/t8/t12/t14/t15/t21/t25/t27/t28; #193 (A3) t2; #194 (A3) t18; #195 (A3) t5; #198 (A3) t10; #199 (A3) t4; #203 (A3) t3; #207 (A3) t16; #210 (A3) t1; #211 (A3) t5; #213 (A3) t2/t8; #215 (A3) t4/t17; #217 (A3) t8/t9; #218 (A3) t17; #228 (A3) t17; #231 (A3) t1/t2/t26; #233 (A3) t2/t5/t22/t26; #236 (A3) t2; #276 (A4) t25/t26; #277 (A4) t11; #278 (A4) t1/t3/t9/t22; #279 (A4) t3; #281 (A4) t7; #282 (A4) t1/t2/t6/t7/t14/t21; #283 (A4) t12; #284 (A4) t1; #285 (A4) t6/t8/t10/t19; #288 (A4) t2/t3; #292 (A4) t4/t11; #294 (A4) t16; #295 (A4) t1/t2/t27; #296 (A4) t14; #297 (A4) t5; #299 (A4) t1/t6/t13; #300 (A4) t7/t10/t13/t18/t22; #302 (A4) t9; #303 (A4) t13/t14/t21; #305 (A4) t1; #313 (A4) t11; #319 (A4) t7; #322 (A4) t6/t7/t9; #326 (A4) t1/t2/t14/t15; #327 (A4) t6/t7/t15/t21; #328 (A4) t6/t20/t22; #330 (A4) t6; #333 (A4) t2; #368 (A5) t16; #369 (A5) t2; #372 (A5) t17; #373 (A5) t17/t25; #375 (A5) t1/t4/t11/t14/t15/t17/t19; #376 (A5) t12; #380 (A5) t21; #381 (A5) t3/t6; #383 (A5) t11; #384 (A5) t14; #387 (A5) t8; #389 (A5) t4/t14; #390 (A5) t7/t8; #391 (A5) t1/t9/t14/t18; #396 (A5) t3; #398 (A5) t25; #402 (A5) t1/t16; #403 (A5) t9/t12/t14; #404 (A5) t2; #405 (A5) t3/t18; #460 (A6) t14/t19; #463 (A6) t2/t3/t8/t11/t12/t22; #464 (A6) t18/t21; #465 (A6) t2; #466 (A6) t11; #468 (A6) t2; #470 (A6) t19; #471 (A6) t5/t28; #474 (A6) t15/t16/t19; #475 (A6) t2; #476 (A6) t1; #478 (A6) t3; #480 (A6) t12/t17; #481 (A6) t10; #484 (A6) t2/t14/t17/t21; #485 (A6) t1; #486 (A6) t16; #489 (A6) t23/t28; #490 (A6) t7; #491 (A6) t17/t18/t21; #492 (A6) t2/t6/t7/t8/t16/t27; #493 (A6) t11/t27; #498 (A6) t3; #549 (A7) t5; #552 (A7) t6/t15; #554 (A7) t17/t27; #556 (A7) t2/t6/t10/t11; #557 (A7) t1/t14/t15; #558 (A7) t6/t10; #559 (A7) t7; #561 (A7) t5/t6/t11; #562 (A7) t5; #563 (A7) t1; #564 (A7) t9/t20; #567 (A7) t3/t8; #570 (A7) t3; #572 (A7) t1/t7; #573 (A7) t5; #576 (A7) t10/t12; #585 (A7) t1/t2; #589 (A7) t7/t14; #639 (A8) t9; #640 (A8) t2/t15; #642 (A8) t8/t11/t14/t18/t20; #643 (A8) t15; #646 (A8) t2/t13; #647 (A8) t4/t12/t13/t21; #648 (A8) t2/t8/t9/t10/t11/t12; #650 (A8) t6; #651 (A8) t10/t11; #653 (A8) t2/t8/t10; #658 (A8) t6; #659 (A8) t9; #661 (A8) t12/t14/t21; #663 (A8) t7/t11; #664 (A8) t8; #666 (A8) t22; #668 (A8) t16; #670 (A8) t4; #675 (A8) t1/t6; #676 (A8) t1/t2/t9; #730 (A9) t4/t7; #731 (A9) t15; #733 (A9) t9/t18; #735 (A9) t17; #736 (A9) t4/t14/t23; #737 (A9) t7/t11/t12/t15/t16/t17/t21; #738 (A9) t7/t13/t15/t18; #740 (A9) t3; #741 (A9) t17; #742 (A9) t3/t12; #743 (A9) t15; #744 (A9) t10; #745 (A9) t6/t28; #747 (A9) t9; #749 (A9) t13; #750 (A9) t8/t16; #751 (A9) t11; #753 (A9) t4/t5; #754 (A9) t6/t11/t20; #756 (A9) t6/t13/t17; #757 (A9) t8/t13; #761 (A9) t18; #763 (A9) t11/t14/t18; #764 (A9) t9; #767 (A9) t8/t18; #769 (A9) t1/t2
- Related defect: —
- Status: OPEN

### MATH-007 — Worked example solves 4x − 7 = 9 by "subtracting 7 from both sides" and gets 4x = 2, x = 0.5 (correct: add 7, 4x = 16, x = 4)

- Severity: P1
- Category: Mathematics correctness
- Date/time: 2026-10-06 07:47 UTC
- Account: Account 3
- Mathematics concept: `math.alg.linear-equation-1var`
- Lesson/order: #184
- Learner message: give me example
- Tutor response: "Let’s work with the equation 4x − 7 = 9 … 1. Subtract 7 from both sides … 4x − 7 − 7 = 9 − 7 → 4x = 2. 2. Divide both sides by 4 … x = 1/2. So the unique solution is x = 0.5."
- Expected behaviour: Add 7 to both sides: 4x = 16, x = 4.
- Actual behaviour: Wrong inverse operation and a wrong answer, presented as the worked example.
- Why it is a defect: The tutor teaches an incorrect procedure and a wrong result to a learner who asked for help; a weak learner will copy it.
- Reproducibility: Seen once in lesson 184 turn 14 (the model generates a fresh example each time; recurrence not tested).
- Related defect: —
- Status: OPEN

### MATH-008 — Word-problem story does not match its equation: "paid $20 with a $5 coupon applied" is modelled as 3x + 5 = 20 (a coupon reduces the cost)

- Severity: P2
- Category: Mathematics correctness
- Date/time: 2026-10-06 07:47 UTC
- Account: Account 3
- Mathematics concept: `math.alg.linear-equation-1var`
- Lesson/order: #184
- Learner message: give me example with numbers
- Tutor response: "Imagine you bought a set of 3 identical gadgets and paid a total of $20, but you also had a $5 coupon that you applied … equation 3x + 5 = 20 (the three gadgets cost 3x dollars, plus the $5 coupon, equals the $20 you paid)."
- Expected behaviour: A coupon is subtracted: 3x − 5 = 20 (x = 25/3), or a story where 5 is added (e.g. a delivery fee).
- Actual behaviour: The coupon is added to the cost.
- Why it is a defect: The example teaches that a discount adds money; the model of the situation is wrong.
- Reproducibility: Seen in lesson 184 turn 2.
- Related defect: —
- Status: OPEN

### MATH-009 — Lesson opens with a content-free fragment: "If not, please let me know what you’d like to focus on." + stock figure sentence

- Severity: P2
- Category: UX
- Date/time: 2026-10-06 08:04 UTC
- Account: Account 3
- Mathematics concept: `math.alg.inequality-1var`
- Lesson/order: #185
- Learner message: ok (lesson opened)
- Tutor response: "If not, please let me know what you’d like to focus on. Take a look at the figure beside this message — it's a general illustration related to the topic."
- Expected behaviour: An introduction to linear inequalities.
- Actual behaviour: A half-sentence that refers to a missing question, and no teaching.
- Why it is a defect: The first message of the lesson teaches nothing and is confusing for a new learner.
- Reproducibility: Seen in lesson 185 turn 1.
- Also observed (41 occurrences in 39 lessons): #732 (A9) t1; #278 (A4) t1; #279 (A1) t1; #8 (A1) t1; #23 (A1) t1; #56 (A1) t1; #820 (A10) t1; #822 (A10) t1; #843 (A10) t1; #97 (A2) t1; #137 (A2) t1; #141 (A2) t1; #142 (A2) t1; #143 (A2) t1; #185 (A3) t1; #227 (A3) t1; #235 (A3) t1; #238 (A3) t1; #279 (A4) t1; #281 (A4) t1; #283 (A4) t1; #313 (A4) t1; #327 (A4) t1; #329 (A4) t1; #462 (A6) t1; #470 (A6) t1; #484 (A6) t1; #647 (A8) t1; #735 (A9) t1; #751 (A9) t1; #763 (A9) t1; #771 (A9) t1; #53 (A1) t1; #850 (A10) t1; #851 (A10) t1; #212 (A3) t1; #232 (A3) t1; #488 (A6) t1; #761 (A9) t1
- Notes on occurrences: #732 t1: Opener is the single sentence "Consider the set of all rational numbers whose square is less than 2." — no teaching follows · #278 t1: Opener replaced by degraded apology · #279 t1: Opener is only "Take a look at the figure beside this message — it\x27s a general illustration related to the topic." · #8 t1: Opener "Now rewrite the same idea using mathematical language: m = 5 kg" — refers to an idea never introduced in this lesson
- Related defect: —
- Status: OPEN

### MATH-010 — 3D / measurement lessons are taught with a generic "Geometry Shapes" card showing a flat triangle, rectangle and circle

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-06 07:49 UTC
- Account: Account 4
- Mathematics concept: `math.geom.solid-3d`
- Lesson/order: #276
- Learner message: (lesson opened; figure shown with every turn)
- Tutor response: Figure "Geometry Shapes — Common 2D geometric shapes with labelled properties" (triangle "3 sides ∠A+∠B+∠C=180°", rectangle, circle with r). Same card for Surface Area (274), Volume (275), Three-Dimensional Solids (276), Platonic Solids (277). Tutor text in 274: "In the figure you can see a rectangle, which represents one face of a box".
- Expected behaviour: A figure of a box / prism / solid, or no figure.
- Actual behaviour: A 2D triangle/rectangle/circle card unrelated to solids, volume or Euler's formula.
- Why it is a defect: The learner is told to study a figure that does not show the concept; surface area, volume and polyhedra cannot be seen in it. Rendered with the app's own VisualCard (screenshot reviewed).
- Reproducibility: Every lesson that carries visual=geometry_shape.
- Also observed (65 occurrences in 64 lessons): #278 (A4) t16/t-; #287 (A7) t1; #236 (A3) t-; #237 (A3) t-; #238 (A3) t-; #239 (A3) t-; #240 (A3) t-; #241 (A3) t-; #242 (A3) t-; #243 (A3) t-; #244 (A3) t-; #274 (A4) t-; #275 (A4) t-; #276 (A4) t-; #277 (A4) t-; #279 (A4) t-; #280 (A4) t-; #282 (A4) t-; #283 (A4) t-; #284 (A4) t-; #285 (A4) t-; #286 (A4) t-; #287 (A4) t-; #288 (A4) t-; #289 (A4) t-; #290 (A4) t-; #292 (A4) t-; #293 (A4) t-; #294 (A4) t-; #295 (A4) t-; #296 (A4) t-; #297 (A4) t-; #298 (A4) t-; #299 (A4) t-; #300 (A4) t-; #301 (A4) t-; #302 (A4) t-; #303 (A4) t-; #304 (A4) t-; #305 (A4) t-; #306 (A4) t-; #307 (A4) t-; #308 (A4) t-; #309 (A4) t-; #310 (A4) t-; #311 (A4) t-; #312 (A4) t-; #313 (A4) t-; #314 (A4) t-; #315 (A4) t-; #316 (A4) t-; #317 (A4) t-; #318 (A4) t-; #319 (A4) t-; #320 (A4) t-; #321 (A4) t-; #322 (A4) t-; #323 (A4) t-; #324 (A4) t-; #325 (A4) t-; #326 (A4) t-; #327 (A4) t-; #328 (A4) t-; #329 (A4) t-
- Notes on occurrences: #278 t16: Lesson Coordinate Plane: "i dont understand this picture" is answered by describing triangle/square/rectangle/circle/pentagon/hexagon labels — the Geometry Shapes card is the only figure · #287 t1: Tutor: "among the shapes you see a stretched circle, the ellipse, sitting next to the square, triangle and regular circle" — the Geometry Shapes card in the lesson shows no ellipse (Ellipse lesson)
- Related defect: —
- Status: OPEN

### MATH-011 — A generic "Coordinate Plane" card with one point (2, 3) is attached to lessons that are not about plotting (equations, inequalities, statistics)

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-06 07:46 UTC
- Account: Account 8
- Mathematics concept: `math.stats.hypothesis-testing`
- Lesson/order: #639
- Learner message: (lesson opened; figure shown with every turn)
- Tutor response: Figure "Coordinate Plane — An x-y axis system for plotting points and lines" with a single red dot at (2, 3), for Solution Set (183), Linear Equation in One Variable (184), Linear Inequality (185), Confidence Interval for a Proportion (638), Hypothesis Testing (639), Test Statistic (640), p-value (641). Tutor in 184: "On the coordinate plane in front of you, the horizontal axis represents the variable x" for a one-variable equation; in 639: "Imagine the horizontal axis of the coordinate plane as a line of possible values for a test statistic".
- Expected behaviour: A figure that shows the concept (balance / number line with solution set / sampling distribution with tail area), or no figure.
- Actual behaviour: The same x-y grid with an unrelated dot.
- Why it is a defect: The picture cannot help understand the concept, and the tutor builds sentences around it to justify it.
- Reproducibility: Every lesson that carries visual=coordinate_plane.
- Also observed (88 occurrences in 87 lessons): #641 (A8) t1/t-; #183 (A3) t-; #185 (A3) t-; #186 (A3) t-; #188 (A3) t-; #190 (A3) t-; #191 (A3) t-; #192 (A3) t-; #193 (A3) t-; #194 (A3) t-; #195 (A3) t-; #196 (A3) t-; #197 (A3) t-; #198 (A3) t-; #199 (A3) t-; #200 (A3) t-; #201 (A3) t-; #202 (A3) t-; #203 (A3) t-; #204 (A3) t-; #205 (A3) t-; #206 (A3) t-; #207 (A3) t-; #208 (A3) t-; #209 (A3) t-; #214 (A3) t-; #219 (A3) t-; #220 (A3) t-; #221 (A3) t-; #222 (A3) t-; #228 (A3) t-; #230 (A3) t-; #231 (A3) t-; #232 (A3) t-; #233 (A3) t-; #234 (A3) t-; #235 (A3) t-; #380 (A5) t-; #381 (A5) t-; #382 (A5) t-; #383 (A5) t-; #384 (A5) t-; #385 (A5) t-; #386 (A5) t-; #387 (A5) t-; #388 (A5) t-; #389 (A5) t-; #390 (A5) t-; #391 (A5) t-; #392 (A5) t-; #393 (A5) t-; #394 (A5) t-; #396 (A5) t-; #400 (A5) t-; #401 (A5) t-; #402 (A5) t-; #403 (A5) t-; #404 (A5) t-; #405 (A5) t-; #406 (A5) t-; #407 (A5) t-; #409 (A5) t-; #410 (A5) t-; #411 (A5) t-; #412 (A5) t-; #638 (A8) t-; #639 (A8) t-; #640 (A8) t-; #642 (A8) t-; #643 (A8) t-; #644 (A8) t-; #645 (A8) t-; #646 (A8) t-; #647 (A8) t-; #648 (A8) t-; #649 (A8) t-; #651 (A8) t-; #652 (A8) t-; #653 (A8) t-; #654 (A8) t-; #655 (A8) t-; #656 (A8) t-; #657 (A8) t-; #658 (A8) t-; #660 (A8) t-; #661 (A8) t-; #774 (A9) t-
- Notes on occurrences: #641 t1: Tutor: "Imagine the coordinate-plane figure on your screen as a picture of the null-hypothesis distribution (the bell curve)…" — the figure is an x-y grid with one dot, no bell curve
- Related defect: —
- Status: OPEN

### MATH-012 — A generic number line from −5 to 5 with a dot at 0 is attached to lessons it does not explain (column addition, mental addition, Cauchy sequences)

- Severity: P3
- Category: Visuals
- Date/time: 2026-10-06 07:41 UTC
- Account: Account 2
- Mathematics concept: `math.arith.column-addition`
- Lesson/order: #92
- Learner message: (lesson opened; figure shown with every turn)
- Tutor response: Figure "Number Line — A horizontal line showing numbers and their positions relative to zero" (−5…5, dot at 0). Tutor in 93: "Imagine the number line on your screen. To add 8 + 7, start at 8 on the line…" but the line only runs −5…5 and 8 and 15 are not on it. Also attached to Cauchy Sequence (735), where the tutor builds the lesson on a_n = 1/n and the figure shows only −5…5 with a dot at 0.
- Expected behaviour: A number line covering the values used (0–20) or a column layout.
- Actual behaviour: A fixed −5…5 line.
- Why it is a defect: The tutor refers to points that are not on the figure.
- Reproducibility: Every lesson that carries visual=number_line.
- Also observed (44 occurrences in 44 lessons): #92 (A2) t-; #93 (A2) t-; #94 (A2) t-; #95 (A2) t-; #99 (A2) t-; #101 (A2) t-; #102 (A2) t-; #103 (A2) t-; #104 (A2) t-; #105 (A2) t-; #106 (A2) t-; #107 (A2) t-; #108 (A2) t-; #109 (A2) t-; #111 (A2) t-; #112 (A2) t-; #113 (A2) t-; #114 (A2) t-; #115 (A2) t-; #116 (A2) t-; #117 (A2) t-; #118 (A2) t-; #119 (A2) t-; #120 (A2) t-; #121 (A2) t-; #123 (A2) t-; #124 (A2) t-; #125 (A2) t-; #126 (A2) t-; #127 (A2) t-; #128 (A2) t-; #129 (A2) t-; #130 (A2) t-; #131 (A2) t-; #132 (A2) t-; #133 (A2) t-; #134 (A2) t-; #135 (A2) t-; #136 (A2) t-; #137 (A2) t-; #138 (A2) t-; #139 (A2) t-; #140 (A2) t-; #735 (A9) t-
- Related defect: —
- Status: OPEN

### MATH-013 — Process-flow figures draw the step number badge over the step title and the step note over the box edge, so text overlaps and is cut off

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-06 07:46 UTC
- Account: Account 6
- Mathematics concept: `math.de.ode-order`
- Lesson/order: #457
- Learner message: (lesson opened; figure shown with every turn)
- Tutor response: Figure "Determining the Order of a Differential Equation": the yellow badge covers the start of each step title and the grey note line sits on top of the title and runs past the box ("equation, e.g., y″ + 3y′ + 2y = 0, with all terms" cut). Also in 820 Simple Function ("Combine indicators with non-negative coefficients a_i." overlapped by the badge and box border) and the other process_flow figures.
- Expected behaviour: Title and note readable inside the box.
- Actual behaviour: Overlapping, clipped text.
- Why it is a defect: The learner cannot read the steps the tutor tells them to study. Rendered with the app's own VisualRenderer in Chromium (screenshot reviewed).
- Reproducibility: Every lesson that carries a visualSpec of type process_flow.
- Also observed (19 occurrences in 19 lessons): #1 (A1) t-; #2 (A1) t-; #3 (A1) t-; #4 (A1) t-; #6 (A1) t-; #820 (A10) t-; #821 (A10) t-; #822 (A10) t-; #145 (A2) t-; #456 (A6) t-; #457 (A6) t-; #458 (A6) t-; #460 (A6) t-; #547 (A7) t-; #548 (A7) t-; #662 (A8) t-; #663 (A8) t-; #664 (A8) t-; #665 (A8) t-
- Related defect: —
- Status: OPEN

### MATH-014 — Sequence/series graph plots the sum of terms for negative n (−10…10) and its x-axis label sits under the zoom buttons

- Severity: P3
- Category: Visuals
- Date/time: 2026-10-06 07:51 UTC
- Account: Account 5
- Mathematics concept: `math.seq.arithmetic-series`
- Lesson/order: #367
- Learner message: (lesson opened; figure shown with every turn)
- Tutor response: Figure "Sum of first n terms of AP (a₁=3, d=2)": a continuous parabola with S_n below zero for n < 0 and an x-axis label "Number of terms n (count)" partly hidden behind the +/−/reset buttons.
- Expected behaviour: Points for n = 1, 2, 3 … only; label fully visible.
- Actual behaviour: A continuous curve through negative "number of terms".
- Why it is a defect: A count of terms cannot be negative; it blurs the sequence-vs-function idea the lesson is teaching.
- Reproducibility: Seen in lesson 367.
- Related defect: —
- Status: OPEN

### MATH-015 — Math display delimiter is opened and never closed (\[ … without \]) so the rest of the reply renders as raw LaTeX / is swallowed

- Severity: P3
- Category: UX
- Date/time: 2026-10-06 07:50 UTC
- Account: Account 7
- Mathematics concept: `math.linalg.matrix-representation`
- Lesson/order: #549
- Learner message: show me step by step
- Tutor response: "…be defined by \[ T(x,y)=\bigl(2x+y,;x-y\bigr). 2. **Apply \(T\) to each basis vector…" — the first \[ has no \], and the next \[ … \] pair then nests inside it.
- Expected behaviour: Balanced \[ \] / \( \) delimiters.
- Actual behaviour: An unclosed display-math opener in the middle of a numbered list.
- Why it is a defect: The client renders KaTeX only for balanced delimiters; the list after the opener will show as broken math or raw backslash text.
- Reproducibility: Detected automatically by counting delimiters in every tutor reply; seen in 549 t14 and 457 t10.
- Also observed (28 occurrences in 27 lessons): #48 (A1) t13; #856 (A10) t10; #857 (A10) t18; #863 (A10) t3; #119 (A2) t3; #208 (A3) t19; #229 (A3) t11; #231 (A3) t12; #384 (A5) t11; #387 (A5) t6; #403 (A5) t4; #457 (A6) t10; #464 (A6) t14; #475 (A6) t21; #485 (A6) t17; #486 (A6) t17; #489 (A6) t6/t8; #493 (A6) t7; #549 (A7) t14; #554 (A7) t15; #557 (A7) t21; #559 (A7) t8; #591 (A7) t6; #592 (A7) t4; #654 (A8) t16; #750 (A9) t11; #761 (A9) t15
- Related defect: —
- Status: OPEN

### MATH-016 — "i dont understand" is answered with empathy only — no explanation, hint or question follows

- Severity: P2
- Category: Adaptation
- Date/time: 2026-10-06 08:14 UTC
- Account: Account 1
- Mathematics concept: `math.found.problem-solving-strategies`
- Lesson/order: #5
- Learner message: i dont understand
- Tutor response: "Okay — let's come at it differently. I hear that the idea of making sure every possible case is covered felt confusing, and recognizing that is already a solid first step. 🌱" (the whole reply).
- Expected behaviour: A simpler re-explanation or a smaller question.
- Actual behaviour: A feeling statement and an emoji.
- Why it is a defect: A struggling learner gets no help for the turn; same family as BIO-011 / CHEM canned empathy.
- Reproducibility: Seen in lesson 5 turn 2; counted automatically.
- Also observed (21 occurrences in 21 lessons): #4 (A1) t2; #5 (A1) t2; #19 (A1) t2; #63 (A1) t14; #820 (A10) t12; #822 (A10) t11; #826 (A10) t7; #113 (A2) t18; #114 (A2) t10; #117 (A2) t14; #128 (A2) t7; #141 (A2) t11; #207 (A3) t12; #208 (A3) t15; #276 (A4) t2; #410 (A5) t3; #589 (A7) t21; #638 (A8) t5; #662 (A8) t6; #677 (A8) t22; #763 (A9) t10
- Related defect: —
- Status: OPEN

### MATH-017 — Canned empathy openers that are unrelated to what the learner wrote ("I hear you’re feeling stuck…", "I hear you—it can feel overwhelming when there are a lot of words")

- Severity: P3
- Category: Adaptation
- Date/time: 2026-10-06 08:10 UTC
- Account: Account 4
- Mathematics concept: `math.geom.coordinate-plane`
- Lesson/order: #278
- Learner message: i dont understand this picture
- Tutor response: "I hear you’re feeling stuck, test4 — let’s walk through the picture together…" (also "I hear you—it can feel overwhelming when there are a lot of words" in reply to "i dont understand", and "I hear you’re frustrated" in reply to "why?").
- Expected behaviour: Respond to the actual question; use empathy only when the learner expressed a feeling.
- Actual behaviour: The same stock opener on many different requests, and the learner's account label ("test4") used as a name.
- Why it is a defect: Reads as scripted; same as BIO-003.
- Reproducibility: Counted automatically over all Mathematics replies.
- Also observed (712 occurrences in 386 lessons): #1 (A1) t2/t15/t16; #2 (A1) t15; #4 (A1) t2/t8; #5 (A1) t2; #6 (A1) t12/t21; #8 (A1) t6/t12; #9 (A1) t12/t14; #10 (A1) t13/t21; #12 (A1) t13; #13 (A1) t3/t5; #14 (A1) t12/t18; #15 (A1) t8; #19 (A1) t2; #20 (A1) t16; #21 (A1) t5/t17; #24 (A1) t6; #25 (A1) t10/t14/t16; #26 (A1) t6; #27 (A1) t14; #30 (A1) t4/t9; #31 (A1) t12/t14; #32 (A1) t8; #33 (A1) t4/t10/t16; #34 (A1) t11; #38 (A1) t2; #40 (A1) t17; #43 (A1) t2; #44 (A1) t6/t10; #45 (A1) t9; #46 (A1) t9/t16; #48 (A1) t2/t12; #49 (A1) t13; #50 (A1) t13; #51 (A1) t14; #52 (A1) t10/t14; #53 (A1) t8/t15; #54 (A1) t3/t4; #55 (A1) t10; #59 (A1) t10/t13; #62 (A1) t3; #63 (A1) t4/t14/t18; #64 (A1) t12; #65 (A1) t4/t9/t19; #66 (A1) t16; #67 (A1) t2/t20; #820 (A10) t3/t12/t20; #821 (A10) t16; #822 (A10) t2/t11; #824 (A10) t16; #825 (A10) t15; #826 (A10) t7/t13; #827 (A10) t2/t14; #828 (A10) t6; #829 (A10) t15; #831 (A10) t3/t8; #833 (A10) t6/t14/t18; #834 (A10) t11; #835 (A10) t4; #836 (A10) t6/t12; #838 (A10) t4/t21; #840 (A10) t6; #842 (A10) t9; #843 (A10) t8/t21; #846 (A10) t5/t13; #848 (A10) t11; #849 (A10) t6; #853 (A10) t10; #854 (A10) t6/t11; #855 (A10) t9/t17; #856 (A10) t8; #857 (A10) t3/t7/t16; #858 (A10) t6/t11/t14; #860 (A10) t4; #862 (A10) t2; #863 (A10) t9/t23/t24; #92 (A2) t2/t16; #93 (A2) t4/t9/t17; #94 (A2) t4; #96 (A2) t9/t18; #97 (A2) t2/t30; #98 (A2) t12/t22; #99 (A2) t2/t15/t20/t26; #101 (A2) t5/t13; #102 (A2) t9/t10; #103 (A2) t12; #105 (A2) t6/t11/t20; #106 (A2) t13/t19/t30; #107 (A2) t8/t15/t16/t21/t26; #109 (A2) t6/t11/t18/t23; #110 (A2) t10/t22; #111 (A2) t2/t10/t15/t21/t26/t27; #112 (A2) t6; #113 (A2) t18; #114 (A2) t10/t18; #115 (A2) t6/t21; #117 (A2) t8/t19; #118 (A2) t7; #119 (A2) t6/t11/t21; #120 (A2) t6/t15; #121 (A2) t13/t19; #122 (A2) t6; #123 (A2) t2/t7; #124 (A2) t16; #125 (A2) t5/t11/t21; #126 (A2) t13/t19; #127 (A2) t11/t16; #128 (A2) t7/t12/t24; #131 (A2) t14; #132 (A2) t19; #135 (A2) t5/t17; #136 (A2) t14; #137 (A2) t7/t18; #138 (A2) t17/t25/t30; #139 (A2) t14/t22; #141 (A2) t2/t4/t9; #142 (A2) t10; #144 (A2) t2/t3; #146 (A2) t16; #183 (A3) t3; #184 (A3) t12/t20; #185 (A3) t3; #187 (A3) t2/t14/t19/t27; #189 (A3) t12/t19/t24/t29; #190 (A3) t13; #192 (A3) t23/t28; #194 (A3) t12; #195 (A3) t3; #196 (A3) t11/t13/t16; #198 (A3) t11/t17/t21/t22; #199 (A3) t3; #201 (A3) t3; #203 (A3) t7/t17; #204 (A3) t8; #206 (A3) t15; #207 (A3) t12; #208 (A3) t6/t15/t21; #209 (A3) t3; #210 (A3) t6/t18; #211 (A3) t7/t16; #212 (A3) t3; #213 (A3) t19; #214 (A3) t2; #215 (A3) t8/t18; #216 (A3) t6; #217 (A3) t2/t14; #218 (A3) t10/t16; #219 (A3) t2; #220 (A3) t11/t19; #221 (A3) t4/t17/t22; #223 (A3) t3/t8/t20; #224 (A3) t13; #225 (A3) t7; #226 (A3) t2/t13; #228 (A3) t8/t10/t19; #230 (A3) t17; #231 (A3) t13/t25/t29/t30; #232 (A3) t10; #233 (A3) t11/t20/t25/t30; #234 (A3) t4/t18/t26; #240 (A3) t13; #241 (A3) t6; #274 (A4) t5/t7; #276 (A4) t2/t8; #277 (A4) t12; #278 (A4) t10/t11/t16; #279 (A4) t4/t12; #281 (A4) t16; #282 (A4) t2/t17; #283 (A4) t12; #284 (A4) t2; #285 (A4) t11/t20; #286 (A4) t6/t7; #287 (A4) t10; #288 (A4) t10; #289 (A4) t8; #290 (A4) t9/t14/t22; #291 (A4) t8/t14/t23; #292 (A4) t3/t22/t23; #293 (A4) t3; #294 (A4) t17/t28; #295 (A4) t19/t28/t29; #296 (A4) t8/t12/t20; #298 (A4) t4; #300 (A4) t9/t14; #302 (A4) t3/t16/t21; #303 (A4) t14; #304 (A4) t2; #307 (A4) t8/t14/t21; #308 (A4) t2; #309 (A4) t12/t21; #312 (A4) t6/t7; #313 (A4) t9/t17/t27; #314 (A4) t15; #316 (A4) t4; #317 (A4) t10/t19; #318 (A4) t11/t20/t27; #319 (A4) t10/t19; #320 (A4) t2/t3; #321 (A4) t5/t16; #322 (A4) t11/t19; #324 (A4) t4; #325 (A4) t8/t9/t15; #326 (A4) t2/t13/t20; #327 (A4) t5/t24; #328 (A4) t10/t18/t23; #329 (A4) t5; #330 (A4) t7/t15; #331 (A4) t8/t10; #332 (A4) t9/t10/t12; #333 (A4) t6; #334 (A4) t2; #335 (A4) t8; #367 (A5) t7/t15; #370 (A5) t3/t9; #371 (A5) t2; #372 (A5) t12; #373 (A5) t3/t26; #374 (A5) t12/t16; #375 (A5) t12; #377 (A5) t17/t18; #378 (A5) t3/t6; #379 (A5) t7/t14; #380 (A5) t4/t10/t17; #381 (A5) t7; #382 (A5) t17; #383 (A5) t4; #384 (A5) t7/t10/t20; #385 (A5) t10/t20; #386 (A5) t10/t12/t21; #388 (A5) t10; #389 (A5) t6/t9; #390 (A5) t2/t19; #394 (A5) t5; #395 (A5) t3/t18; #396 (A5) t2/t9; #397 (A5) t16; #398 (A5) t8/t24; #401 (A5) t7/t12/t17; #402 (A5) t7/t18; #403 (A5) t11/t23; #404 (A5) t8/t12/t20; #405 (A5) t11; #408 (A5) t2; #409 (A5) t9; #410 (A5) t10; #412 (A5) t2; #456 (A6) t2; #457 (A6) t18; #458 (A6) t6/t7; #459 (A6) t9/t16; #460 (A6) t2/t3/t23; #462 (A6) t2/t10; #463 (A6) t15/t22; #464 (A6) t4/t13/t20; #467 (A6) t4; #468 (A6) t18/t19; #469 (A6) t4/t16; #470 (A6) t6/t11/t12/t17; #471 (A6) t10/t13/t15; #472 (A6) t17; #473 (A6) t10/t16; #474 (A6) t7/t17; #475 (A6) t3/t19/t22; #476 (A6) t13; #477 (A6) t2; #478 (A6) t9; #479 (A6) t7/t15/t17/t20; #480 (A6) t6; #481 (A6) t2/t17; #483 (A6) t3; #484 (A6) t11/t21; #485 (A6) t9; #487 (A6) t3/t12; #489 (A6) t7/t14/t19; #491 (A6) t3/t13/t21; #492 (A6) t5/t12; #493 (A6) t8/t15; #494 (A6) t7/t8; #495 (A6) t8/t9/t14; #497 (A6) t2; #498 (A6) t4; #547 (A7) t2; #550 (A7) t16; #552 (A7) t7; #553 (A7) t8; #554 (A7) t11; #556 (A7) t7/t8; #557 (A7) t9; #558 (A7) t2/t11; #559 (A7) t12; #560 (A7) t10/t24; #561 (A7) t6/t15; #562 (A7) t3/t8; #563 (A7) t5/t6; #564 (A7) t6/t12/t14; #566 (A7) t16/t18/t19; #567 (A7) t4/t20; #568 (A7) t14; #569 (A7) t3; #572 (A7) t6; #573 (A7) t9/t16; #575 (A7) t3/t17; #577 (A7) t19; #578 (A7) t3/t4; #579 (A7) t6/t7/t12; #583 (A7) t14; #584 (A7) t10/t18; #586 (A7) t9/t24; #587 (A7) t2/t5/t25; #588 (A7) t3/t12; #589 (A7) t16/t21; #590 (A7) t2/t3/t15; #591 (A7) t12; #592 (A7) t9/t22; #593 (A7) t5/t16; #638 (A8) t5; #639 (A8) t6; #640 (A8) t7/t11/t19; #642 (A8) t3/t4; #643 (A8) t7; #645 (A8) t4/t7/t14/t16; #646 (A8) t7/t12/t19; #647 (A8) t7/t14/t27; #648 (A8) t11; #649 (A8) t10/t15/t23; #650 (A8) t5; #651 (A8) t8/t19; #652 (A8) t9; #653 (A8) t12/t17/t25; #654 (A8) t11/t20; #655 (A8) t4/t16/t19/t21; #656 (A8) t15; #657 (A8) t7; #658 (A8) t8; #661 (A8) t8/t18; #662 (A8) t6; #663 (A8) t3; #664 (A8) t9/t22; #666 (A8) t2/t4; #668 (A8) t13; #669 (A8) t12/t19; #670 (A8) t6; #674 (A8) t3; #675 (A8) t7; #677 (A8) t8/t10/t22; #680 (A8) t8/t9; #681 (A8) t5/t11/t23; #682 (A8) t11; #683 (A8) t10/t18/t19; #684 (A8) t4/t11; #685 (A8) t4; #729 (A9) t4; #730 (A9) t3; #731 (A9) t2/t3/t8; #733 (A9) t15; #735 (A9) t12; #736 (A9) t9/t15; #737 (A9) t12/t20; #738 (A9) t6/t14/t22; #739 (A9) t6/t14; #740 (A9) t11; #742 (A9) t11/t18; #743 (A9) t7/t18; #744 (A9) t2/t4/t15/t17/t18; #745 (A9) t13/t27; #746 (A9) t19; #747 (A9) t12/t16; #749 (A9) t11; #750 (A9) t6/t14/t15; #751 (A9) t12; #753 (A9) t2; #754 (A9) t15; #755 (A9) t11; #756 (A9) t2/t12/t16; #757 (A9) t14; #758 (A9) t3; #761 (A9) t12/t13/t20; #763 (A9) t10; #764 (A9) t10/t12; #765 (A9) t7; #767 (A9) t12/t17; #768 (A9) t2/t11; #769 (A9) t3; #770 (A9) t11/t14/t20; #771 (A9) t3/t4; #774 (A9) t8/t10/t11
- Related defect: —
- Status: OPEN

### MATH-018 — "explain simpler / again / too many words" is answered with a different everyday analogy each time (LEGO house, dinner party, road trip, pizza) instead of simpler maths

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-06 08:20 UTC
- Account: Account 1
- Mathematics concept: `math.found.mathematical-modeling`
- Lesson/order: #6
- Learner message: explain simpler / explain again / too many words / i dont understand
- Tutor response: Turn 5 "Think of making a LEGO house…", turn 11 "planning a simple dinner party", turn 12 "planning a weekend road trip", turn 13 "planning a road trip", turn 14 "like planning a road trip", turn 19 "prepare a quick dinner for two".
- Expected behaviour: Re-explain the same idea with simpler words and a concrete number example.
- Actual behaviour: A new, loosely related analogy per request; "what is this?" (turn 6) is answered with the LEGO analogy instead of describing the figure.
- Why it is a defect: The analogy replaces the maths; the learner never gets the simpler explanation; same as BIO-004.
- Reproducibility: Counted automatically (3+ analogy replies in one lesson).
- Also observed (136 occurrences in 136 lessons): #1 (A1) t-; #2 (A1) t-; #6 (A1) t-; #9 (A1) t-; #10 (A1) t-; #20 (A1) t-; #28 (A1) t-; #32 (A1) t-; #33 (A1) t-; #34 (A1) t-; #40 (A1) t-; #48 (A1) t-; #51 (A1) t-; #52 (A1) t-; #54 (A1) t-; #55 (A1) t-; #64 (A1) t-; #67 (A1) t-; #820 (A10) t-; #825 (A10) t-; #826 (A10) t-; #827 (A10) t-; #828 (A10) t-; #829 (A10) t-; #831 (A10) t-; #833 (A10) t-; #835 (A10) t-; #836 (A10) t-; #857 (A10) t-; #863 (A10) t-; #93 (A2) t-; #94 (A2) t-; #96 (A2) t-; #97 (A2) t-; #99 (A2) t-; #103 (A2) t-; #105 (A2) t-; #106 (A2) t-; #107 (A2) t-; #109 (A2) t-; #110 (A2) t-; #111 (A2) t-; #115 (A2) t-; #117 (A2) t-; #120 (A2) t-; #121 (A2) t-; #124 (A2) t-; #136 (A2) t-; #138 (A2) t-; #187 (A3) t-; #189 (A3) t-; #192 (A3) t-; #194 (A3) t-; #198 (A3) t-; #207 (A3) t-; #211 (A3) t-; #215 (A3) t-; #228 (A3) t-; #230 (A3) t-; #231 (A3) t-; #233 (A3) t-; #234 (A3) t-; #276 (A4) t-; #278 (A4) t-; #289 (A4) t-; #290 (A4) t-; #291 (A4) t-; #292 (A4) t-; #294 (A4) t-; #296 (A4) t-; #302 (A4) t-; #307 (A4) t-; #312 (A4) t-; #313 (A4) t-; #317 (A4) t-; #318 (A4) t-; #327 (A4) t-; #328 (A4) t-; #332 (A4) t-; #333 (A4) t-; #370 (A5) t-; #373 (A5) t-; #374 (A5) t-; #375 (A5) t-; #380 (A5) t-; #385 (A5) t-; #397 (A5) t-; #398 (A5) t-; #403 (A5) t-; #405 (A5) t-; #409 (A5) t-; #412 (A5) t-; #457 (A6) t-; #459 (A6) t-; #462 (A6) t-; #471 (A6) t-; #475 (A6) t-; #484 (A6) t-; #485 (A6) t-; #492 (A6) t-; #494 (A6) t-; #553 (A7) t-; #554 (A7) t-; #559 (A7) t-; #560 (A7) t-; #564 (A7) t-; #567 (A7) t-; #572 (A7) t-; #576 (A7) t-; #586 (A7) t-; #587 (A7) t-; #589 (A7) t-; #590 (A7) t-; #639 (A8) t-; #640 (A8) t-; #655 (A8) t-; #658 (A8) t-; #662 (A8) t-; #666 (A8) t-; #677 (A8) t-; #680 (A8) t-; #682 (A8) t-; #731 (A9) t-; #733 (A9) t-; #735 (A9) t-; #745 (A9) t-; #746 (A9) t-; #747 (A9) t-; #750 (A9) t-; #754 (A9) t-; #755 (A9) t-; #761 (A9) t-; #763 (A9) t-; #768 (A9) t-; #770 (A9) t-; #774 (A9) t-
- Related defect: —
- Status: OPEN

### MATH-019 — Tutor says "There is no picture in this lesson yet" in a lesson that does carry a figure

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-06 08:13 UTC
- Account: Account 6
- Mathematics concept: `math.de.ivp`
- Lesson/order: #460
- Learner message: i dont understand this picture
- Tutor response: "There is no picture in this lesson yet, so let me say it in words. I hear you’re feeling stuck… Think of an ordinary differential equation as a recipe for a cake." — the same lesson opened with the figure "Solving an Initial Value Problem (IVP)".
- Expected behaviour: Describe the figure that was shown, or re-show it.
- Actual behaviour: Denies the figure exists and substitutes a cake analogy.
- Why it is a defect: Contradicts what the learner sees and abandons the figure the lesson is built on.
- Reproducibility: Counted automatically (reply contains "no picture in this lesson" while the lesson has a figure turn).
- Also observed (3 occurrences in 3 lessons): #460 (A6) t24; #735 (A9) t21; #774 (A9) t9
- Related defect: —
- Status: OPEN

### MATH-020 — "next question please" is answered with "Sure thing! Whenever you’re ready for the next question, just let me know" — no question is given

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-06 08:08 UTC
- Account: Account 7
- Mathematics concept: `math.linalg.eigenspace`
- Lesson/order: #552
- Learner message: next question please
- Tutor response: "Sure thing! Whenever you’re ready for the next question, just let me know and I’ll send it your way."
- Expected behaviour: The next question.
- Actual behaviour: A promise to send one; the learner has already asked.
- Why it is a defect: The learner must ask twice; same as BIO-005.
- Reproducibility: Seen in lesson 552 turn 13; counted automatically.
- Also observed (23 occurrences in 22 lessons): #7 (A1) t11; #34 (A1) t16; #55 (A1) t15; #59 (A1) t8; #117 (A2) t9; #143 (A2) t18; #206 (A3) t14; #218 (A3) t17; #300 (A4) t11; #313 (A4) t11; #328 (A4) t11; #484 (A6) t14; #486 (A6) t17; #552 (A7) t13; #557 (A7) t15; #583 (A7) t16; #661 (A8) t14; #666 (A8) t22; #738 (A9) t16; #742 (A9) t12; #749 (A9) t12; #761 (A9) t19
- Related defect: —
- Status: OPEN

### MATH-021 — "why?" is answered with an explanation of the tutor's own behaviour ("I asked for the next question so we can check…") instead of the maths

- Severity: P3
- Category: Teaching
- Date/time: 2026-10-06 08:08 UTC
- Account: Account 7
- Mathematics concept: `math.linalg.eigenspace`
- Lesson/order: #552
- Learner message: why?
- Tutor response: "I asked for the next question so we can check whether the idea of an eigenspace … is clear to you. Question: Consider the matrix A = …"
- Expected behaviour: Explain why the mathematical statement holds.
- Actual behaviour: A justification of the tutor's previous action.
- Why it is a defect: The learner asked about the idea, not about the tutor; same as BIO-001.
- Reproducibility: Counted automatically.
- Also observed (7 occurrences in 7 lessons): #1 (A1) t15; #35 (A1) t2; #38 (A1) t4; #58 (A1) t2; #284 (A4) t5; #552 (A7) t14; #583 (A7) t8
- Related defect: —
- Status: OPEN

### MATH-022 — Reply is a garbled fragment of LaTeX instead of an answer

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-06 08:48 UTC
- Account: Account 6
- Mathematics concept: `math.de.linear-first-order`
- Lesson/order: #464
- Learner message: AFTER INTEGRATING, Y MUST BE ISOLATED BY DIVIDING BY MU — NEVER (a quoted taught sentence typed as the answer)
- Tutor response: "=\mu Q(x)\)?" (the whole reply)
- Expected behaviour: A verdict on the answer and the next step.
- Actual behaviour: A broken half-formula ending in a question mark.
- Why it is a defect: The reply cannot be read, gives no feedback, and looks like a crash in the response pipeline.
- Reproducibility: Seen in lesson 464 turn 14.
- Also observed (4 occurrences in 4 lessons): #666 (A8) t12; #328 (A4) t11; #464 (A6) t14; #486 (A6) t17
- Notes on occurrences: #666 t12: Reply to "give me example with numbers" begins with a leftover formula fragment: "= 5040). Now let’s see combinatorics in action…"
- Related defect: —
- Status: OPEN

### MATH-023 — The raw curriculum goal is returned as the tutor reply ("In this lesson on Comparison Test we will look at if 0 ≤ aₙ ≤ bₙ and Σbₙ converges…")

- Severity: P2
- Category: UX
- Date/time: 2026-10-06 08:32 UTC
- Account: Account 5
- Mathematics concept: `math.seq.comparison-test`
- Lesson/order: #372
- Learner message: Σaₙ also diverges (typed answer to a card)
- Tutor response: "In this lesson on Comparison Test we will look at if 0 ≤ aₙ ≤ bₙ and Σbₙ converges, then Σaₙ converges and if aₙ ≥ bₙ ≥ 0 and Σbₙ diverges, then Σaₙ diverges."
- Expected behaviour: A verdict on the learner's statement.
- Actual behaviour: The lesson-goal string from the curriculum, verbatim.
- Why it is a defect: Same as BIO-010: internal curriculum metadata shown as speech; the learner's answer is ignored.
- Reproducibility: Seen in lesson 372 turn 10; counted automatically.
- Also observed (94 occurrences in 79 lessons): #12 (A1) t10; #15 (A1) t6; #17 (A1) t9; #31 (A1) t13; #55 (A1) t15; #65 (A1) t12; #67 (A1) t15; #826 (A10) t20; #829 (A10) t2; #833 (A10) t16; #836 (A10) t4; #838 (A10) t25; #859 (A10) t5; #97 (A2) t9; #99 (A2) t28; #109 (A2) t16; #112 (A2) t4; #117 (A2) t9; #125 (A2) t12; #135 (A2) t16; #137 (A2) t11; #139 (A2) t6; #143 (A2) t8; #187 (A3) t16; #192 (A3) t8/t15; #198 (A3) t13; #204 (A3) t10; #215 (A3) t14; #223 (A3) t11; #232 (A3) t12; #282 (A4) t24; #285 (A4) t14; #288 (A4) t11; #298 (A4) t6; #300 (A4) t11; #303 (A4) t5/t18; #317 (A4) t8; #318 (A4) t13; #322 (A4) t7; #325 (A4) t17; #326 (A4) t19; #328 (A4) t15; #331 (A4) t9; #370 (A5) t8; #372 (A5) t10; #385 (A5) t12; #403 (A5) t22; #463 (A6) t3/t13; #469 (A6) t20; #481 (A6) t19; #486 (A6) t14; #489 (A6) t18; #490 (A6) t6; #491 (A6) t22; #492 (A6) t14; #494 (A6) t9; #569 (A7) t4; #573 (A7) t11; #575 (A7) t8; #577 (A7) t13; #586 (A7) t8; #593 (A7) t8; #645 (A8) t6; #646 (A8) t15; #647 (A8) t20; #648 (A8) t1; #650 (A8) t17; #653 (A8) t3; #654 (A8) t17; #664 (A8) t24; #670 (A8) t12; #734 (A9) t17; #737 (A9) t18; #738 (A9) t16; #745 (A9) t21; #746 (A9) t1/t2; #761 (A9) t19; #767 (A9) t2; #774 (A9) t19
- Related defect: —
- Status: OPEN

### MATH-024 — Reply opens with the tutor's own instruction to itself ("making sure we keep the integrating factor free of any extra constant and finish by dividing by μ")

- Severity: P2
- Category: UX
- Date/time: 2026-10-06 08:48 UTC
- Account: Account 6
- Mathematics concept: `math.de.linear-first-order`
- Lesson/order: #464
- Learner message: e^(x²) (card answer)
- Tutor response: "Let’s solve a concrete linear first‑order ODE step‑by‑step, making sure we keep the integrating factor free of any extra constant and finish by dividing by μ."
- Expected behaviour: A neutral lead-in to the worked example.
- Actual behaviour: A sentence that reads as the prompt/misconception note the example was generated from.
- Why it is a defect: Leaks the generation brief into the learner's screen; the learner cannot tell why the tutor is "making sure" of anything.
- Reproducibility: Seen in lesson 464 turn 6.
- Related defect: —
- Status: OPEN

### MATH-025 — Tutor describes things "you can see" in the figure that the figure does not contain (a cloud of dots, an ellipse)

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-06 09:19 UTC
- Account: Account 8
- Mathematics concept: `math.stats.linear-regression`
- Lesson/order: #650
- Learner message: (lesson opened)
- Tutor response: "On the coordinate‑plane figure you can see a cloud of dots scattered across the grid. Most of the points seem to rise as you move from left to right…" — the figure served is the generic Coordinate Plane card with a single dot at (2, 3). In Ellipse (287): "among the shapes you see a stretched circle, the ellipse, sitting next to the square, triangle and regular circle" — the Geometry Shapes card has no ellipse.
- Expected behaviour: Describe only what is drawn, or serve a scatter plot / ellipse.
- Actual behaviour: The tutor narrates an imaginary picture.
- Why it is a defect: The learner looks for the dots, cannot find them and concludes they are the problem; trust in the "figure beside this message" is lost.
- Reproducibility: Seen in lessons 650 and 287 (screenshots of the served figure reviewed).
- Also observed (5 occurrences in 5 lessons): #393 (A4) t1; #396 (A5) t1; #398 (A5) t1; #641 (A8) t1; #650 (A8) t1
- Notes on occurrences: #393 t1: Tutor: "Imagine you’re looking at the coordinate‑plane picture on your screen. The wavy curve is the graph of sin…" — the served figure is the generic grid with one dot (no wave) · #396 t1: Tutor: "On the coordinate-plane figure you can see a smooth curve that starts very low on the left…" — the figure is the generic grid with one dot · #398 t1: Tutor: "you can see the sine curve starting at the origin and rising…" — same generic grid, no curve
- Related defect: —
- Status: OPEN

### MATH-026 — A help request is answered with a verdict on the previous card ("Correct – …", "The negative sign shows…") glued in front of the answer, and sometimes steps for a different topic

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-06 10:03 UTC
- Account: Account 7
- Mathematics concept: `math.linalg.svd`
- Lesson/order: #566
- Learner message: show me step by step
- Tutor response: "Correct – the Σ matrix for a 5 × 3 A is indeed 5 × 3. 1. Start with a real symmetric matrix A … 7. The statement A = QDQᵀ is the spectral theorem…" (the lesson is Singular Value Decomposition). Also 472: "The negative sign shows the determinant isn’t zero, so the two functions are linearly independent… Let’s walk through the steps for a new pair of solutions".
- Expected behaviour: Numbered steps for SVD (or for the asked example), without a stray verdict.
- Actual behaviour: A leftover verdict sentence about an earlier card and the steps of the spectral theorem.
- Why it is a defect: The learner asked for steps; the reply starts by praising something they did not just do and then teaches a neighbouring topic; same family as BIO-026 (reply answers the previous card).
- Reproducibility: Seen in 566 turn 15 and 472 turn 13; counted automatically (help request answered with a verdict opener).
- Also observed (5 occurrences in 4 lessons): #10 (A1) t9; #472 (A6) t8/t13; #550 (A7) t8; #566 (A7) t15
- Related defect: —
- Status: OPEN

### MATH-027 — Reply to a help request is a cut-off stub ("Sure!", "Imagine you have a row of") with no content

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-06 10:49 UTC
- Account: Account 4
- Mathematics concept: `math.geom.vectors-3d`
- Lesson/order: #297
- Learner message: give me example with numbers
- Tutor response: "Sure!" (the whole reply). Also lesson 379, "explain simpler" -> "Imagine you have a row of" (the reply ends there).
- Expected behaviour: The example.
- Actual behaviour: A one-word acknowledgement / a sentence that stops mid-way.
- Why it is a defect: The learner asked for help and got nothing; looks like a truncated model response served as final.
- Reproducibility: Seen in 297 turn 12 and 379 turn 6; counted automatically (groq reply under 40 characters to a help request).
- Also observed (2 occurrences in 2 lessons): #297 (A4) t12; #379 (A5) t6
- Related defect: —
- Status: OPEN

### MATH-028 — Tutor addresses the learner by the account login label ("test4", "test 10") and once by a name that matches no account ("test0")

- Severity: P3
- Category: UX
- Date/time: 2026-10-06 14:56 UTC
- Account: Account 9
- Mathematics concept: `math.cx.complex-integration`
- Lesson/order: #767
- Learner message: ok (lesson opened)
- Tutor response: "Got it, test0—let’s move forward. The complex line integral of a function f along a piecewise C¹ curve C is…" (the account is test9).
- Expected behaviour: No name, or the learner's real display name.
- Actual behaviour: A username-style label, sometimes wrong.
- Why it is a defect: Reads as a system artefact; for real learners a profile name that is an email prefix or placeholder would be shown the same way.
- Reproducibility: Counted automatically: replies containing "test<N>" used as a name.
- Also observed (29 occurrences in 28 lessons): #2 (A1) t1; #4 (A1) t19; #46 (A1) t19; #822 (A10) t19; #843 (A10) t8; #863 (A10) t12; #97 (A2) t30; #107 (A2) t27; #110 (A2) t19/t23; #118 (A2) t7; #125 (A2) t22; #190 (A3) t14; #204 (A3) t18; #225 (A3) t20; #278 (A4) t16; #296 (A4) t20; #318 (A4) t27; #321 (A4) t11; #328 (A4) t18; #367 (A5) t16; #384 (A5) t21; #459 (A6) t14; #566 (A7) t1; #583 (A7) t16; #649 (A8) t15; #657 (A8) t1; #658 (A8) t14; #767 (A9) t1
- Related defect: —
- Status: OPEN

### MATH-029 — Percentage Grid figure shows a fixed 65 % while the tutor narrates a different example (35 of 100 squares)

- Severity: P3
- Category: Visuals
- Date/time: 2026-10-06 12:25 UTC
- Account: Account 2
- Mathematics concept: `math.arith.percentages`
- Lesson/order: #122
- Learner message: give me example with numbers
- Tutor response: "Look at the 10 × 10 grid on your screen. If 35 of the 100 little squares are shaded…" — the served Percentage Grid card shows 65 squares shaded and the caption "65 % = 65 out of 100".
- Expected behaviour: The figure and the narrated example agree (or the tutor quotes the 65 % shown).
- Actual behaviour: The learner is told to look at 35 but sees 65.
- Why it is a defect: A weak learner will try to find 35 shaded squares and conclude they have misread the figure.
- Reproducibility: Seen in lesson 122 (screenshot of the served card reviewed); the card values are fixed, so any other narrated percentage would also disagree.
- Related defect: —
- Status: OPEN

## Systemic observations (counts computed from the transcripts)

Computed over 526 lesson transcripts (9518 learner turns, one reply each; degraded retries included as separate replies):

- Reply provider: groq 8192 (86 %), memory 336 (4 %), degraded 698 (7 %), gate 292 (3 %).
- Cards (mcq) shown: 3238; options per card: 2 options 144, 3 options 1763, 4 options 1331.
- Lesson close: 221 closed as "mastered", 291 as "needs review" (57 % of closed lessons ended on a pause, MATH-001).
- Lessons with a figure: 251 of 526; with no figure on any turn: 275.
- Per account (lessons / learner turns / mastered / needs-review): A1 69/1215/32/37 · A2 56/1173/20/30 · A3 62/1138/27/31 · A4 62/1185/29/32 · A5 48/889/20/28 · A6 43/880/18/25 · A7 47/894/16/31 · A8 48/893/22/25 · A9 46/882/15/29 · A10 45/881/22/23.


## Concurrency and isolation tests

_Not yet run — scheduled after the main run (same-account parallel sessions, cross-account marker test)._

## Deployment changes during the run

Lessons started before 08:27 UTC on 2026-10-06 (deployment `42b44da`): 62; started after (deployment `6f6ccaa`, Biology fixes live): 464. Share of lessons in each group in which each automatically-linked mechanism occurred:

| defect | before | after |
|---|---|---|
| MATH-001 | 44 % | 43 % |
| MATH-002 | 45 % | 36 % |
| MATH-003 | 58 % | 53 % |
| MATH-004 | 2 % | 0 % |
| MATH-005 | 2 % | 1 % |
| MATH-006 | 42 % | 42 % |
| MATH-007 | 0 % | 0 % |
| MATH-008 | 0 % | 0 % |
| MATH-009 | 11 % | 7 % |
| MATH-010 | 11 % | 12 % |
| MATH-011 | 16 % | 17 % |
| MATH-012 | 8 % | 8 % |
| MATH-013 | 23 % | 1 % |
| MATH-014 | 0 % | 0 % |
| MATH-015 | 5 % | 5 % |
| MATH-016 | 10 % | 3 % |
| MATH-017 | 71 % | 74 % |
| MATH-018 | 32 % | 25 % |
| MATH-019 | 3 % | 0 % |
| MATH-020 | 2 % | 5 % |
| MATH-021 | 3 % | 1 % |
| MATH-022 | 0 % | 1 % |
| MATH-023 | 5 % | 16 % |
| MATH-024 | 0 % | 0 % |
| MATH-025 | 2 % | 1 % |
| MATH-026 | 2 % | 1 % |
| MATH-027 | 0 % | 0 % |
| MATH-028 | 10 % | 5 % |
| MATH-029 | 0 % | 0 % |

The two groups cover different parts of the curriculum (lessons are split by account block), so a difference is not by itself evidence that a fix worked or failed; visual-type rows differ mainly because of lesson type. No Mathematics mechanism changed in a way that points at the Biology fixes.


## Coverage by lesson

Result per account in brackets: turns driven, and how the lesson closed (mastered / needs-review = "Let's pause … worth another look later").
"figure none" means no figure channel was returned on any turn.

| # | concept | lesson | accounts (turns, result) | figure | defects referencing |
|---|---|---|---|---|---|
| 1 | `math.found.mathematical-thinking` | Mathematical Thinking | A1 (25t, mastered) | yes | MATH-002, MATH-003, MATH-013, MATH-017, MATH-018, MATH-021 |
| 2 | `math.found.abstraction` | Abstraction | A1 (23t, needs-review) | yes | MATH-001, MATH-013, MATH-017, MATH-018, MATH-028 |
| 3 | `math.found.pattern-recognition` | Pattern Recognition | A1 (9t, mastered) | yes | MATH-003, MATH-013 |
| 4 | `math.found.problem-solving` | Mathematical Problem Solving | A1 (23t, mastered) | yes | MATH-002, MATH-003, MATH-013, MATH-016, MATH-017, MATH-028 |
| 5 | `math.found.problem-solving-strategies` | Problem-Solving Strategies | A1 (13t, mastered) | none | MATH-002, MATH-006, MATH-016, MATH-017 |
| 6 | `math.found.mathematical-modeling` | Mathematical Modeling | A1 (23t, needs-review) | yes | MATH-001, MATH-002, MATH-013, MATH-017, MATH-018 |
| 7 | `math.found.generalization` | Generalization | A1 (15t, needs-review) | none | MATH-001, MATH-003, MATH-006, MATH-020 |
| 8 | `math.found.mathematical-language` | Mathematical Language | A1 (21t, needs-review) | none | MATH-001, MATH-006, MATH-009, MATH-017 |
| 9 | `math.found.mathematical-notation` | Mathematical Notation | A1 (25t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017, MATH-018 |
| 10 | `math.found.variable` | Variable | A1 (29t, needs-review) | none | MATH-002, MATH-003, MATH-017, MATH-018, MATH-026 |
| 11 | `math.found.mathematical-symbols` | Mathematical Symbols | A1 (10t, needs-review) | none | MATH-002 |
| 12 | `math.found.reading-mathematics` | Reading Mathematics | A1 (24t, needs-review) | none | MATH-002, MATH-006, MATH-017, MATH-023 |
| 13 | `math.found.logic` | Mathematical Logic | A1 (11t, mastered) | none | MATH-017 |
| 14 | `math.found.proposition` | Proposition | A1 (20t, needs-review) | none | MATH-001, MATH-017 |
| 15 | `math.found.logical-connectives` | Logical Connectives | A1 (20t, needs-review) | none | MATH-001, MATH-017, MATH-023 |
| 16 | `math.found.truth-table` | Truth Table | A1 (16t, mastered) | none | MATH-002, MATH-003 |
| 17 | `math.found.predicate-logic` | Predicate Logic | A1 (18t, mastered) | none | MATH-002, MATH-003, MATH-023 |
| 18 | `math.found.predicate` | Predicate | A1 (10t, mastered) | none | MATH-002 |
| 19 | `math.found.quantifiers` | Quantifiers | A1 (11t, mastered) | none | MATH-002, MATH-006, MATH-016, MATH-017 |
| 20 | `math.found.logical-equivalence` | Logical Equivalence | A1 (20t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-018 |
| 21 | `math.found.rules-of-inference` | Rules of Inference | A1 (24t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017 |
| 22 | `math.found.proof` | Mathematical Proof | A1 (9t, mastered) | none | MATH-003 |
| 23 | `math.found.direct-proof` | Direct Proof | A1 (11t, mastered) | none | MATH-003, MATH-009 |
| 24 | `math.found.proof-by-contradiction` | Proof by Contradiction | A1 (12t, mastered) | none | MATH-002, MATH-003, MATH-017 |
| 25 | `math.found.proof-by-contrapositive` | Proof by Contrapositive | A1 (23t, needs-review) | none | MATH-002, MATH-003, MATH-017 |
| 26 | `math.found.proof-by-induction` | Mathematical Induction | A1 (23t, needs-review) | none | MATH-001, MATH-003, MATH-006, MATH-017 |
| 27 | `math.found.strong-induction` | Strong Induction | A1 (21t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 28 | `math.found.well-ordering-principle` | Well-Ordering Principle | A1 (15t, mastered) | none | MATH-003, MATH-006, MATH-018 |
| 29 | `math.found.proof-by-cases` | Proof by Cases | A1 (12t, mastered) | none | MATH-003 |
| 30 | `math.found.existence-proof` | Existence Proof | A1 (15t, mastered) | none | MATH-017 |
| 31 | `math.found.uniqueness-proof` | Uniqueness Proof | A1 (19t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-023 |
| 32 | `math.found.writing-mathematics` | Writing Mathematics | A1 (19t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-018 |
| 33 | `math.found.axiom` | Axiom | A1 (31t, needs-review) | none | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018 |
| 34 | `math.found.theorem` | Theorem | A1 (27t, needs-review) | none | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018, MATH-020 |
| 35 | `math.found.lemma` | Lemma | A1 (8t, mastered) | none | MATH-021 |
| 36 | `math.found.corollary` | Corollary | A1 (9t, mastered) | none | MATH-003 |
| 37 | `math.found.conjecture` | Conjecture | A1 (13t, mastered) | none | MATH-002 |
| 38 | `math.found.definition` | Mathematical Definition | A1 (12t, mastered) | none | MATH-003, MATH-017, MATH-021 |
| 39 | `math.found.axiomatic-system` | Axiomatic System | A1 (15t, needs-review) | none | MATH-001, MATH-003 |
| 40 | `math.found.set-theory` | Set Theory | A1 (20t, needs-review) | none | MATH-001, MATH-003, MATH-017, MATH-018 |
| 41 | `math.found.set` | Set | A1 (22t, needs-review) | none | MATH-001, MATH-003 |
| 42 | `math.found.set-membership` | Set Membership | A1 (11t, needs-review) | none | MATH-002 |
| 43 | `math.found.empty-set` | Empty Set | A1 (13t, mastered) | none | MATH-003, MATH-017 |
| 44 | `math.found.set-builder-notation` | Set-Builder Notation | A1 (17t, needs-review) | none | MATH-002, MATH-003, MATH-017 |
| 45 | `math.found.subset` | Subset | A1 (17t, mastered) | none | MATH-002, MATH-003, MATH-017 |
| 46 | `math.found.proper-subset` | Proper Subset | A1 (26t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017, MATH-028 |
| 47 | `math.found.set-equality` | Set Equality | A1 (7t, mastered) | none | — |
| 48 | `math.found.set-operations` | Set Operations | A1 (21t, needs-review) | none | MATH-001, MATH-002, MATH-015, MATH-017, MATH-018 |
| 49 | `math.found.union` | Union | A1 (20t, needs-review) | none | MATH-001, MATH-017 |
| 50 | `math.found.intersection` | Intersection | A1 (21t, needs-review) | none | MATH-001, MATH-002, MATH-017 |
| 51 | `math.found.set-difference` | Set Difference | A1 (20t, needs-review) | none | MATH-001, MATH-017, MATH-018 |
| 52 | `math.found.complement` | Set Complement | A1 (26t, mastered) | none | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018 |
| 53 | `math.found.venn-diagram` | Venn Diagram | A1 (21t, needs-review) | none | MATH-001, MATH-009, MATH-017 |
| 54 | `math.found.power-set` | Power Set | A1 (25t, mastered) | none | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018 |
| 55 | `math.found.cartesian-product` | Cartesian Product | A1 (20t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-018, MATH-020, MATH-023 |
| 56 | `math.found.ordered-pair` | Ordered Pair | A1 (9t, mastered) | none | MATH-003, MATH-009 |
| 57 | `math.found.relation` | Relation | A1 (7t, mastered) | none | — |
| 58 | `math.found.reflexive-relation` | Reflexive Relation | A1 (11t, mastered) | none | MATH-002, MATH-006, MATH-021 |
| 59 | `math.found.symmetric-relation` | Symmetric Relation | A1 (29t, needs-review) | none | MATH-001, MATH-003, MATH-006, MATH-017, MATH-020 |
| 60 | `math.found.transitive-relation` | Transitive Relation | A1 (18t, needs-review) | none | MATH-002, MATH-003 |
| 61 | `math.found.equivalence-relation` | Equivalence Relation | A1 (9t, mastered) | none | MATH-003 |
| 62 | `math.found.equivalence-class` | Equivalence Class | A1 (11t, mastered) | none | MATH-003, MATH-017 |
| 63 | `math.found.partition` | Partition | A1 (21t, needs-review) | none | MATH-001, MATH-006, MATH-016, MATH-017 |
| 64 | `math.found.partial-order` | Partial Order | A1 (21t, mastered) | none | MATH-002, MATH-003, MATH-017, MATH-018 |
| 65 | `math.found.total-order` | Total Order | A1 (21t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-023 |
| 66 | `math.found.hasse-diagram` | Hasse Diagram | A1 (22t, needs-review) | none | MATH-001, MATH-003, MATH-017 |
| 67 | `math.found.function-set-theoretic` | Function (Set-Theoretic) | A1 (23t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-018, MATH-023 |
| 68 | `math.found.cardinality` | Cardinality | A1 (8t, mastered) | none | — |
| 69 | `math.found.finite-set` | Finite Set | A1 (14t, mastered) | none | MATH-002, MATH-003 |
| 70 | `math.found.countable-set` | Countable Set | **not covered** | — | — |
| 71 | `math.found.uncountable-set` | Uncountable Set | **not covered** | — | — |
| 72 | `math.found.set-theory-axiomatic` | Axiomatic Set Theory | **not covered** | — | — |
| 73 | `math.found.ordinal-number` | Ordinal Number | **not covered** | — | — |
| 74 | `math.found.cardinal-arithmetic` | Cardinal Arithmetic | **not covered** | — | — |
| 75 | `math.found.inductive-reasoning` | Inductive Reasoning | **not covered** | — | — |
| 76 | `math.found.deductive-reasoning` | Deductive Reasoning | **not covered** | — | — |
| 77 | `math.found.natural-numbers` | Natural Numbers | **not covered** | — | — |
| 78 | `math.found.integers` | Integers | **not covered** | — | — |
| 79 | `math.found.rational-numbers` | Rational Numbers | **not covered** | — | — |
| 80 | `math.found.irrational-numbers` | Irrational Numbers | **not covered** | — | — |
| 81 | `math.found.real-numbers` | Real Numbers | **not covered** | — | — |
| 82 | `math.found.complex-numbers` | Complex Numbers | **not covered** | — | — |
| 83 | `math.arith.counting` | Counting | **not covered** | — | — |
| 84 | `math.arith.counting-sequence` | Counting Sequence | **not covered** | — | — |
| 85 | `math.arith.subitizing` | Subitizing | **not covered** | — | — |
| 86 | `math.arith.place-value` | Place Value | **not covered** | — | — |
| 87 | `math.arith.ones-tens-hundreds` | Ones, Tens, Hundreds | **not covered** | — | — |
| 88 | `math.arith.expanded-form` | Expanded Form | **not covered** | — | — |
| 89 | `math.arith.number-base` | Number Base | **not covered** | — | — |
| 90 | `math.arith.addition` | Addition | **not covered** | — | — |
| 91 | `math.arith.carrying` | Carrying (Regrouping) | **not covered** | — | — |
| 92 | `math.arith.column-addition` | Column Addition | A2 (19t, needs-review) | yes | MATH-001, MATH-003, MATH-012, MATH-017 |
| 93 | `math.arith.mental-addition` | Mental Addition | A2 (23t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-012, MATH-017, MATH-018 |
| 94 | `math.arith.subtraction` | Subtraction | A2 (30t, no-complete) | yes | MATH-002, MATH-003, MATH-006, MATH-012, MATH-017, MATH-018 |
| 95 | `math.arith.borrowing` | Borrowing (Regrouping in Subtraction) | A2 (7t, mastered) | yes | MATH-012 |
| 96 | `math.arith.negative-numbers` | Negative Numbers | A2 (27t, mastered) | yes | MATH-003, MATH-017, MATH-018 |
| 97 | `math.arith.number-line` | Number Line | A2 (30t, no-complete) | yes | MATH-003, MATH-005, MATH-006, MATH-009, MATH-017, MATH-018, MATH-023, MATH-028 |
| 98 | `math.arith.ordering` | Ordering Numbers | A2 (27t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-017 |
| 99 | `math.arith.absolute-value` | Absolute Value | A2 (34t, no-complete) | yes | MATH-006, MATH-012, MATH-017, MATH-018, MATH-023 |
| 100 | `math.arith.integer-arithmetic` | Integer Arithmetic | A2 (9t, mastered) | yes | MATH-003 |
| 101 | `math.arith.multiplication` | Multiplication | A2 (20t, mastered) | yes | MATH-006, MATH-012, MATH-017 |
| 102 | `math.arith.multiplication-table` | Multiplication Table | A2 (15t, mastered) | yes | MATH-002, MATH-003, MATH-012, MATH-017 |
| 103 | `math.arith.long-multiplication` | Long Multiplication | A2 (24t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-012, MATH-017, MATH-018 |
| 104 | `math.arith.mental-multiplication` | Mental Multiplication | A2 (7t, mastered) | yes | MATH-012 |
| 105 | `math.arith.division` | Division | A2 (28t, needs-review) | yes | MATH-001, MATH-006, MATH-012, MATH-017, MATH-018 |
| 106 | `math.arith.long-division` | Long Division | A2 (30t, no-complete) | yes | MATH-002, MATH-003, MATH-006, MATH-012, MATH-017, MATH-018 |
| 107 | `math.arith.remainder` | Remainder | A2 (31t, mastered) | yes | MATH-002, MATH-003, MATH-012, MATH-017, MATH-018, MATH-028 |
| 108 | `math.arith.divisor-dividend` | Divisor and Dividend | A2 (15t, mastered) | yes | MATH-003, MATH-012 |
| 109 | `math.arith.order-of-operations` | Order of Operations | A2 (30t, no-complete) | yes | MATH-003, MATH-012, MATH-017, MATH-018, MATH-023 |
| 110 | `math.arith.fractions` | Fractions | A2 (31t, needs-review) | yes | MATH-003, MATH-006, MATH-017, MATH-018, MATH-028 |
| 111 | `math.arith.fraction-equivalence` | Equivalent Fractions | A2 (31t, needs-review) | yes | MATH-003, MATH-006, MATH-012, MATH-017, MATH-018 |
| 112 | `math.arith.fraction-simplification` | Fraction Simplification | A2 (20t, mastered) | yes | MATH-003, MATH-006, MATH-012, MATH-017, MATH-023 |
| 113 | `math.arith.fraction-addition` | Addition and Subtraction of Fractions | A2 (23t, needs-review) | yes | MATH-001, MATH-006, MATH-012, MATH-016, MATH-017 |
| 114 | `math.arith.fraction-multiplication` | Multiplication and Division of Fractions | A2 (20t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-012, MATH-016, MATH-017 |
| 115 | `math.arith.fraction-reciprocal` | Reciprocal | A2 (26t, needs-review) | yes | MATH-001, MATH-003, MATH-012, MATH-017, MATH-018 |
| 116 | `math.arith.mixed-numbers` | Mixed Numbers | A2 (11t, mastered) | yes | MATH-006, MATH-012 |
| 117 | `math.arith.improper-fractions` | Improper Fractions | A2 (21t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-012, MATH-016, MATH-017, MATH-018, MATH-020, MATH-023 |
| 118 | `math.arith.decimals` | Decimals | A2 (24t, needs-review) | yes | MATH-002, MATH-006, MATH-012, MATH-017, MATH-028 |
| 119 | `math.arith.decimal-operations` | Decimal Operations | A2 (23t, needs-review) | yes | MATH-001, MATH-012, MATH-015, MATH-017 |
| 120 | `math.arith.terminating-decimals` | Terminating Decimals | A2 (21t, needs-review) | yes | MATH-001, MATH-002, MATH-012, MATH-017, MATH-018 |
| 121 | `math.arith.repeating-decimals` | Repeating Decimals | A2 (21t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-012, MATH-017, MATH-018 |
| 122 | `math.arith.percentages` | Percentages | A2 (21t, mastered) | yes | MATH-003, MATH-017, MATH-029 |
| 123 | `math.arith.percentage-calculations` | Percentage Calculations | A2 (14t, mastered) | yes | MATH-012, MATH-017 |
| 124 | `math.arith.percentage-change` | Percentage Change | A2 (19t, needs-review) | yes | MATH-001, MATH-003, MATH-012, MATH-017, MATH-018 |
| 125 | `math.arith.ratios` | Ratio | A2 (27t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-012, MATH-017, MATH-023, MATH-028 |
| 126 | `math.arith.proportion` | Proportion | A2 (22t, needs-review) | yes | MATH-001, MATH-012, MATH-017 |
| 127 | `math.arith.unit-rate` | Unit Rate | A2 (18t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-012, MATH-017 |
| 128 | `math.arith.direct-variation` | Direct Variation | A2 (28t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-006, MATH-012, MATH-016, MATH-017 |
| 129 | `math.arith.inverse-variation` | Inverse Variation | A2 (7t, mastered) | yes | MATH-012 |
| 130 | `math.arith.rounding` | Rounding | A2 (9t, mastered) | yes | MATH-003, MATH-012 |
| 131 | `math.arith.estimation` | Estimation | A2 (19t, mastered) | yes | MATH-003, MATH-006, MATH-012, MATH-017 |
| 132 | `math.arith.significant-figures` | Significant Figures | A2 (23t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-012, MATH-017 |
| 133 | `math.arith.exponentiation` | Exponentiation | A2 (10t, mastered) | yes | MATH-003, MATH-012 |
| 134 | `math.arith.exponent-rules` | Exponent Rules | A2 (15t, mastered) | yes | MATH-002, MATH-003, MATH-012 |
| 135 | `math.arith.square-numbers` | Perfect Squares | A2 (25t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-012, MATH-017, MATH-023 |
| 136 | `math.arith.cube-numbers` | Perfect Cubes | A2 (22t, needs-review) | yes | MATH-001, MATH-002, MATH-012, MATH-017, MATH-018 |
| 137 | `math.arith.square-roots` | Square Roots | A2 (23t, needs-review) | yes | MATH-001, MATH-006, MATH-009, MATH-012, MATH-017, MATH-023 |
| 138 | `math.arith.irrational-roots` | Irrational Square Roots | A2 (30t, no-complete) | yes | MATH-002, MATH-003, MATH-006, MATH-012, MATH-017, MATH-018 |
| 139 | `math.arith.scientific-notation` | Scientific Notation | A2 (25t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-012, MATH-017, MATH-023 |
| 140 | `math.arith.mental-arithmetic` | Mental Arithmetic | A2 (14t, mastered) | yes | MATH-006, MATH-012 |
| 141 | `math.nt.divisibility` | Divisibility | A2 (21t, needs-review) | none | MATH-001, MATH-006, MATH-009, MATH-016, MATH-017 |
| 142 | `math.nt.divisibility-rules` | Divisibility Rules | A2 (21t, needs-review) | none | MATH-002, MATH-003, MATH-009, MATH-017 |
| 143 | `math.nt.prime-number` | Prime Number | A2 (21t, needs-review) | yes | MATH-001, MATH-009, MATH-020, MATH-023 |
| 144 | `math.nt.composite-number` | Composite Number | A2 (25t, needs-review) | yes | MATH-003, MATH-017 |
| 145 | `math.nt.sieve-of-eratosthenes` | Sieve of Eratosthenes | A2 (10t, mastered) | yes | MATH-013 |
| 146 | `math.nt.prime-factorization` | Prime Factorization | A2 (19t, needs-review) | none | MATH-001, MATH-017 |
| 147 | `math.nt.fundamental-theorem-arithmetic` | Fundamental Theorem of Arithmetic | A2 (7t, mastered) | none | — |
| 148 | `math.nt.gcd` | Greatest Common Divisor | **not covered** | — | — |
| 149 | `math.nt.euclidean-algorithm` | Euclidean Algorithm | **not covered** | — | — |
| 150 | `math.nt.extended-euclidean-algorithm` | Extended Euclidean Algorithm | **not covered** | — | — |
| 151 | `math.nt.bezout-identity` | Bézout's Identity | **not covered** | — | — |
| 152 | `math.nt.lcm` | Least Common Multiple | **not covered** | — | — |
| 153 | `math.nt.division-algorithm` | Division Algorithm | **not covered** | — | — |
| 154 | `math.nt.modular-arithmetic` | Modular Arithmetic | **not covered** | — | — |
| 155 | `math.nt.congruence` | Congruence | **not covered** | — | — |
| 156 | `math.nt.residue-classes` | Residue Classes | **not covered** | — | — |
| 157 | `math.nt.modular-inverse` | Modular Inverse | **not covered** | — | — |
| 158 | `math.nt.chinese-remainder-theorem` | Chinese Remainder Theorem | **not covered** | — | — |
| 159 | `math.nt.fermats-little-theorem` | Fermat's Little Theorem | **not covered** | — | — |
| 160 | `math.nt.eulers-theorem` | Euler's Theorem | **not covered** | — | — |
| 161 | `math.nt.eulers-totient` | Euler's Totient Function | **not covered** | — | — |
| 162 | `math.nt.primality-testing` | Primality Testing | **not covered** | — | — |
| 163 | `math.nt.linear-diophantine` | Linear Diophantine Equations | **not covered** | — | — |
| 164 | `math.nt.general-diophantine` | Diophantine Equations | **not covered** | — | — |
| 165 | `math.nt.pythagorean-triples` | Pythagorean Triples | **not covered** | — | — |
| 166 | `math.nt.pells-equation` | Pell's Equation | **not covered** | — | — |
| 167 | `math.nt.rsa-basics` | RSA Cryptography (Number-Theoretic Basis) | **not covered** | — | — |
| 168 | `math.nt.induction-applications` | Induction in Number Theory | **not covered** | — | — |
| 169 | `math.nt.prime-distribution` | Distribution of Primes | **not covered** | — | — |
| 170 | `math.nt.prime-number-theorem` | Prime Number Theorem | **not covered** | — | — |
| 171 | `math.nt.riemann-hypothesis` | Riemann Hypothesis | **not covered** | — | — |
| 172 | `math.nt.continued-fractions` | Continued Fractions | **not covered** | — | — |
| 173 | `math.nt.algebraic-number-theory` | Algebraic Number Theory | **not covered** | — | — |
| 174 | `math.nt.algebraic-integers` | Algebraic Integers | **not covered** | — | — |
| 175 | `math.nt.number-fields` | Number Fields | **not covered** | — | — |
| 176 | `math.nt.analytic-number-theory` | Analytic Number Theory | **not covered** | — | — |
| 177 | `math.alg.expression` | Algebraic Expression | **not covered** | — | — |
| 178 | `math.alg.term` | Term | **not covered** | — | — |
| 179 | `math.alg.coefficient` | Coefficient | **not covered** | — | — |
| 180 | `math.alg.like-terms` | Like Terms | **not covered** | — | — |
| 181 | `math.alg.simplification` | Algebraic Simplification | **not covered** | — | — |
| 182 | `math.alg.equation` | Equation | **not covered** | — | — |
| 183 | `math.alg.solution-set` | Solution Set | A3 (15t, needs-review) | yes | MATH-001, MATH-011, MATH-017 |
| 184 | `math.alg.linear-equation-1var` | Linear Equation in One Variable | A3 (26t, needs-review) | yes | MATH-002, MATH-003, MATH-007, MATH-008, MATH-017 |
| 185 | `math.alg.inequality-1var` | Linear Inequality in One Variable | A3 (13t, mastered) | yes | MATH-003, MATH-009, MATH-011, MATH-017 |
| 186 | `math.alg.absolute-value-equations` | Absolute Value Equations and Inequalities | A3 (10t, mastered) | yes | MATH-006, MATH-011 |
| 187 | `math.alg.linear-equation-2var` | Linear Equation in Two Variables | A3 (32t, no-complete) | yes | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018, MATH-023 |
| 188 | `math.alg.inequality-2var` | Linear Inequality in Two Variables | A3 (7t, mastered) | yes | MATH-011 |
| 189 | `math.alg.system-linear-equations` | Systems of Linear Equations | A3 (30t, no-complete) | yes | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018 |
| 190 | `math.alg.substitution-method` | Substitution Method | A3 (23t, mastered) | yes | MATH-002, MATH-003, MATH-011, MATH-017, MATH-028 |
| 191 | `math.alg.elimination-method` | Elimination Method | A3 (11t, mastered) | yes | MATH-006, MATH-011 |
| 192 | `math.alg.system-3var` | Systems of 3 Equations in 3 Variables | A3 (34t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-011, MATH-017, MATH-018, MATH-023 |
| 193 | `math.alg.polynomial` | Polynomial | A3 (19t, needs-review) | yes | MATH-003, MATH-006, MATH-011 |
| 194 | `math.alg.degree` | Degree of a Polynomial | A3 (22t, needs-review) | yes | MATH-006, MATH-011, MATH-017, MATH-018 |
| 195 | `math.alg.polynomial-operations` | Polynomial Operations | A3 (12t, needs-review) | yes | MATH-006, MATH-011, MATH-017 |
| 196 | `math.alg.polynomial-division` | Polynomial Division | A3 (20t, needs-review) | yes | MATH-001, MATH-011, MATH-017 |
| 197 | `math.alg.remainder-theorem` | Remainder Theorem | A3 (8t, mastered) | yes | MATH-011 |
| 198 | `math.alg.factor-theorem` | Factor Theorem | A3 (24t, needs-review) | yes | MATH-001, MATH-006, MATH-011, MATH-017, MATH-018, MATH-023 |
| 199 | `math.alg.factoring` | Factoring Polynomials | A3 (14t, mastered) | yes | MATH-006, MATH-011, MATH-017 |
| 200 | `math.alg.factoring-gcf` | Factoring out the GCF | A3 (15t, needs-review) | yes | MATH-001, MATH-003, MATH-011 |
| 201 | `math.alg.factoring-trinomials` | Factoring Trinomials | A3 (15t, mastered) | yes | MATH-002, MATH-003, MATH-011, MATH-017 |
| 202 | `math.alg.factoring-special` | Special Factoring Patterns | A3 (9t, mastered) | yes | MATH-003, MATH-011 |
| 203 | `math.alg.quadratic-equation` | Quadratic Equation | A3 (21t, needs-review) | yes | MATH-001, MATH-006, MATH-011, MATH-017 |
| 204 | `math.alg.completing-the-square` | Completing the Square | A3 (22t, mastered) | yes | MATH-003, MATH-011, MATH-017, MATH-023, MATH-028 |
| 205 | `math.alg.quadratic-formula` | Quadratic Formula | A3 (11t, mastered) | yes | MATH-003, MATH-011 |
| 206 | `math.alg.discriminant` | Discriminant | A3 (17t, needs-review) | yes | MATH-001, MATH-003, MATH-011, MATH-017, MATH-020 |
| 207 | `math.alg.polynomial-roots` | Polynomial Roots (Real and Complex) | A3 (19t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-011, MATH-016, MATH-017, MATH-018 |
| 208 | `math.alg.rational-root-theorem` | Rational Root Theorem | A3 (26t, mastered) | yes | MATH-002, MATH-003, MATH-011, MATH-015, MATH-016, MATH-017 |
| 209 | `math.alg.fundamental-theorem-algebra` | Fundamental Theorem of Algebra | A3 (13t, needs-review) | yes | MATH-011, MATH-017 |
| 210 | `math.alg.complex-polynomial-roots` | Complex Roots of Polynomials | A3 (24t, mastered) | yes | MATH-003, MATH-006, MATH-017 |
| 211 | `math.alg.rational-expressions` | Rational Expressions | A3 (29t, mastered) | yes | MATH-003, MATH-006, MATH-017, MATH-018 |
| 212 | `math.alg.rational-expressions-addition` | Addition of Rational Expressions | A3 (9t, mastered) | yes | MATH-009, MATH-017 |
| 213 | `math.alg.rational-expressions-multiplication` | Multiplication of Rational Expressions | A3 (23t, needs-review) | yes | MATH-006, MATH-017 |
| 214 | `math.alg.rational-equations` | Rational Equations | A3 (8t, mastered) | yes | MATH-011, MATH-017 |
| 215 | `math.alg.exponent-rules` | Exponent Rules (Algebraic) | A3 (24t, needs-review) | yes | MATH-001, MATH-006, MATH-017, MATH-018, MATH-023 |
| 216 | `math.alg.zero-exponent` | Zero Exponent | A3 (13t, mastered) | yes | MATH-002, MATH-017 |
| 217 | `math.alg.negative-exponent` | Negative Exponent | A3 (23t, needs-review) | yes | MATH-006, MATH-017 |
| 218 | `math.alg.fractional-exponent` | Fractional Exponent | A3 (21t, needs-review) | yes | MATH-001, MATH-006, MATH-017, MATH-020 |
| 219 | `math.alg.radicals` | Radical Expressions | A3 (11t, mastered) | yes | MATH-011, MATH-017 |
| 220 | `math.alg.simplifying-radicals` | Simplifying Radical Expressions | A3 (21t, needs-review) | yes | MATH-001, MATH-011, MATH-017 |
| 221 | `math.alg.rationalizing-denominators` | Rationalizing the Denominator | A3 (26t, needs-review) | yes | MATH-001, MATH-003, MATH-011, MATH-017 |
| 222 | `math.alg.radical-equations` | Radical Equations | A3 (11t, mastered) | yes | MATH-003, MATH-011 |
| 223 | `math.alg.exponential-function` | Exponential Function | A3 (22t, needs-review) | yes | MATH-001, MATH-002, MATH-017, MATH-023 |
| 224 | `math.alg.exponential-equations` | Exponential Equations | A3 (18t, needs-review) | yes | MATH-001, MATH-017 |
| 225 | `math.alg.logarithm` | Logarithm | A3 (26t, mastered) | yes | MATH-002, MATH-003, MATH-017, MATH-028 |
| 226 | `math.alg.logarithm-properties` | Logarithm Properties | A3 (17t, needs-review) | yes | MATH-001, MATH-003, MATH-017 |
| 227 | `math.alg.natural-logarithm` | Natural Logarithm | A3 (7t, mastered) | yes | MATH-009 |
| 228 | `math.alg.change-of-base` | Change of Base Formula | A3 (28t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-011, MATH-017, MATH-018 |
| 229 | `math.alg.logarithmic-equations` | Logarithmic Equations | A3 (14t, mastered) | yes | MATH-003, MATH-015 |
| 230 | `math.alg.inequality` | Inequality | A3 (27t, needs-review) | yes | MATH-001, MATH-003, MATH-011, MATH-017, MATH-018 |
| 231 | `math.alg.polynomial-inequality` | Polynomial Inequality | A3 (32t, no-complete) | yes | MATH-003, MATH-006, MATH-011, MATH-015, MATH-017, MATH-018 |
| 232 | `math.alg.rational-inequality` | Rational Inequality | A3 (20t, needs-review) | yes | MATH-001, MATH-002, MATH-009, MATH-011, MATH-017, MATH-023 |
| 233 | `math.alg.binomial-theorem` | Binomial Theorem | A3 (31t, no-complete) | yes | MATH-002, MATH-003, MATH-006, MATH-011, MATH-017, MATH-018 |
| 234 | `math.alg.pascals-triangle` | Pascal's Triangle | A3 (28t, needs-review) | yes | MATH-001, MATH-003, MATH-011, MATH-017, MATH-018 |
| 235 | `math.alg.vietas-formulas` | Vieta's Formulas | A3 (11t, needs-review) | yes | MATH-001, MATH-003, MATH-009, MATH-011 |
| 236 | `math.geom.point` | Point | A3 (9t, mastered) | yes | MATH-002, MATH-006, MATH-010 |
| 237 | `math.geom.line` | Line | A3 (13t, needs-review) | yes | MATH-001, MATH-003, MATH-010 |
| 238 | `math.geom.line-segment` | Line Segment | A3 (17t, needs-review) | yes | MATH-001, MATH-003, MATH-009, MATH-010 |
| 239 | `math.geom.ray` | Ray | A3 (13t, mastered) | yes | MATH-010 |
| 240 | `math.geom.plane` | Plane | A3 (17t, needs-review) | yes | MATH-001, MATH-003, MATH-010, MATH-017 |
| 241 | `math.geom.angle` | Angle | A3 (16t, needs-review) | yes | MATH-001, MATH-010, MATH-017 |
| 242 | `math.geom.angle-types` | Types of Angles | A3 (16t, mastered) | yes | MATH-003, MATH-010 |
| 243 | `math.geom.angle-measurement` | Angle Measurement | A3 (11t, mastered) | yes | MATH-010 |
| 244 | `math.geom.angle-pairs` | Angle Pairs | A3 (14t, mastered) | yes | MATH-003, MATH-010 |
| 245 | `math.geom.parallel-lines` | Parallel Lines | **not covered** | — | — |
| 246 | `math.geom.perpendicular-lines` | Perpendicular Lines | **not covered** | — | — |
| 247 | `math.geom.triangle` | Triangle | **not covered** | — | — |
| 248 | `math.geom.triangle-types` | Types of Triangles | **not covered** | — | — |
| 249 | `math.geom.triangle-angle-sum` | Triangle Angle Sum Theorem | **not covered** | — | — |
| 250 | `math.geom.right-triangle` | Right Triangle | **not covered** | — | — |
| 251 | `math.geom.pythagorean-theorem` | Pythagorean Theorem | **not covered** | — | — |
| 252 | `math.geom.pythagorean-converse` | Converse of the Pythagorean Theorem | **not covered** | — | — |
| 253 | `math.geom.congruent-triangles` | Congruent Triangles | **not covered** | — | — |
| 254 | `math.geom.similar-triangles` | Similar Triangles | **not covered** | — | — |
| 255 | `math.geom.triangle-centers` | Triangle Centers | **not covered** | — | — |
| 256 | `math.geom.area-triangle` | Area of a Triangle | **not covered** | — | — |
| 257 | `math.geom.polygon` | Polygon | **not covered** | — | — |
| 258 | `math.geom.polygon-angle-sum` | Polygon Angle Sum | **not covered** | — | — |
| 259 | `math.geom.quadrilateral` | Quadrilateral | **not covered** | — | — |
| 260 | `math.geom.parallelogram` | Parallelogram | **not covered** | — | — |
| 261 | `math.geom.trapezoid` | Trapezoid | **not covered** | — | — |
| 262 | `math.geom.regular-polygon` | Regular Polygon | **not covered** | — | — |
| 263 | `math.geom.area-polygon` | Area of Polygons | **not covered** | — | — |
| 264 | `math.geom.area` | Area | **not covered** | — | — |
| 265 | `math.geom.perimeter` | Perimeter | **not covered** | — | — |
| 266 | `math.geom.circle` | Circle | **not covered** | — | — |
| 267 | `math.geom.circle-parts` | Parts of a Circle | **not covered** | — | — |
| 268 | `math.geom.circle-circumference` | Circumference of a Circle | **not covered** | — | — |
| 269 | `math.geom.circle-area` | Area of a Circle | **not covered** | — | — |
| 270 | `math.geom.circle-theorems` | Circle Theorems | **not covered** | — | — |
| 271 | `math.geom.circle-equation` | Equation of a Circle | **not covered** | — | — |
| 272 | `math.geom.geometric-proof` | Geometric Proof | **not covered** | — | — |
| 273 | `math.geom.length` | Length | **not covered** | — | — |
| 274 | `math.geom.surface-area` | Surface Area | A4 (11t, needs-review) | yes | MATH-010, MATH-017 |
| 275 | `math.geom.volume` | Volume | A4 (12t, mastered) | yes | MATH-002, MATH-003, MATH-010 |
| 276 | `math.geom.solid-3d` | Three-Dimensional Solids | A4 (28t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-006, MATH-010, MATH-016, MATH-017, MATH-018 |
| 277 | `math.geom.platonic-solids` | Platonic Solids | A4 (14t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-010, MATH-017 |
| 278 | `math.geom.coordinate-plane` | Coordinate Plane | A4 (25t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-009, MATH-010, MATH-017, MATH-018, MATH-028 |
| 279 | `math.geom.x-y-coordinates` | Cartesian Coordinates | A4 (18t, mastered) | yes | MATH-003, MATH-006, MATH-009, MATH-010, MATH-017 |
| 280 | `math.geom.quadrants` | Quadrants | A4 (15t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-010 |
| 281 | `math.geom.distance-formula` | Distance Formula | A4 (18t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-009, MATH-017 |
| 282 | `math.geom.midpoint-formula` | Midpoint Formula | A4 (30t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-010, MATH-017, MATH-023 |
| 283 | `math.geom.slope` | Slope | A4 (15t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-009, MATH-010, MATH-017 |
| 284 | `math.geom.line-equation` | Equations of Lines | A4 (20t, mastered) | yes | MATH-003, MATH-005, MATH-006, MATH-010, MATH-017, MATH-021 |
| 285 | `math.geom.conic-sections` | Conic Sections | A4 (22t, needs-review) | yes | MATH-001, MATH-006, MATH-010, MATH-017, MATH-023 |
| 286 | `math.geom.parabola` | Parabola | A4 (16t, mastered) | yes | MATH-003, MATH-010, MATH-017 |
| 287 | `math.geom.ellipse` | Ellipse | A4 (16t, mastered) | yes | MATH-003, MATH-010, MATH-017 |
| 288 | `math.geom.hyperbola` | Hyperbola | A4 (22t, mastered) | yes | MATH-002, MATH-003, MATH-006, MATH-010, MATH-017, MATH-023 |
| 289 | `math.geom.polar-coordinates` | Polar Coordinates | A4 (16t, mastered) | yes | MATH-010, MATH-017, MATH-018 |
| 290 | `math.geom.polar-curves` | Polar Curves | A4 (28t, needs-review) | yes | MATH-002, MATH-003, MATH-010, MATH-017, MATH-018 |
| 291 | `math.geom.transformations` | Geometric Transformations | A4 (28t, mastered) | yes | MATH-003, MATH-017, MATH-018 |
| 292 | `math.geom.translation` | Translation | A4 (27t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-010, MATH-017, MATH-018 |
| 293 | `math.geom.rotation` | Rotation | A4 (12t, mastered) | yes | MATH-003, MATH-010, MATH-017 |
| 294 | `math.geom.reflection` | Reflection | A4 (30t, no-complete) | yes | MATH-002, MATH-003, MATH-006, MATH-010, MATH-017, MATH-018 |
| 295 | `math.geom.dilation` | Dilation | A4 (32t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-006, MATH-010, MATH-017 |
| 296 | `math.geom.vectors-2d` | Vectors in 2D | A4 (22t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-010, MATH-017, MATH-018, MATH-028 |
| 297 | `math.geom.vectors-3d` | Vectors in 3D | A4 (17t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-010, MATH-027 |
| 298 | `math.geom.dot-product` | Dot Product | A4 (13t, mastered) | yes | MATH-003, MATH-010, MATH-017, MATH-023 |
| 299 | `math.geom.cross-product` | Cross Product | A4 (19t, mastered) | yes | MATH-003, MATH-006, MATH-010 |
| 300 | `math.geom.differential-geometry-curves` | Curves in Space | A4 (28t, needs-review) | yes | MATH-001, MATH-006, MATH-010, MATH-017, MATH-020, MATH-023 |
| 301 | `math.geom.curvature` | Curvature | A4 (11t, mastered) | yes | MATH-002, MATH-010 |
| 302 | `math.geom.frenet-serret` | Frenet-Serret Formulas | A4 (23t, needs-review) | yes | MATH-001, MATH-006, MATH-010, MATH-017, MATH-018 |
| 303 | `math.geom.differential-geometry-surfaces` | Differential Geometry of Surfaces | A4 (25t, needs-review) | yes | MATH-001, MATH-006, MATH-010, MATH-017, MATH-023 |
| 304 | `math.geom.geometric-constructions` | Geometric Constructions | A4 (19t, mastered) | yes | MATH-003, MATH-010, MATH-017 |
| 305 | `math.trig.angle-measure` | Angle Measure | A4 (9t, mastered) | yes | MATH-006, MATH-010 |
| 306 | `math.trig.degree-radian-conversion` | Degree-Radian Conversion | A4 (11t, mastered) | yes | MATH-003, MATH-010 |
| 307 | `math.trig.right-triangle-trig` | Right-Triangle Trigonometry | A4 (23t, needs-review) | yes | MATH-001, MATH-003, MATH-010, MATH-017, MATH-018 |
| 308 | `math.trig.basic-ratios` | Six Trigonometric Ratios | A4 (13t, mastered) | yes | MATH-003, MATH-010, MATH-017 |
| 309 | `math.trig.special-angles` | Trigonometric Values at Special Angles | A4 (24t, needs-review) | yes | MATH-001, MATH-003, MATH-010, MATH-017 |
| 310 | `math.trig.unit-circle` | Unit Circle | A4 (8t, mastered) | yes | MATH-010 |
| 311 | `math.trig.reference-angles` | Reference Angles | A4 (7t, mastered) | yes | MATH-010 |
| 312 | `math.trig.trig-functions` | Trigonometric Functions | A4 (20t, needs-review) | yes | MATH-010, MATH-017, MATH-018 |
| 313 | `math.trig.amplitude-period-phase` | Amplitude, Period, Phase Shift | A4 (29t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-009, MATH-010, MATH-017, MATH-018, MATH-020 |
| 314 | `math.trig.trig-graphs` | Graphs of Trigonometric Functions | A4 (20t, needs-review) | yes | MATH-001, MATH-002, MATH-010, MATH-017 |
| 315 | `math.trig.trig-identities` | Trigonometric Identities | A4 (7t, mastered) | yes | MATH-010 |
| 316 | `math.trig.pythagorean-identities` | Pythagorean Identities | A4 (10t, mastered) | yes | MATH-010, MATH-017 |
| 317 | `math.trig.reciprocal-identities` | Reciprocal Identities | A4 (21t, needs-review) | yes | MATH-001, MATH-002, MATH-010, MATH-017, MATH-018, MATH-023 |
| 318 | `math.trig.sum-difference-formulas` | Sum and Difference Formulas | A4 (29t, needs-review) | yes | MATH-001, MATH-002, MATH-010, MATH-017, MATH-018, MATH-023, MATH-028 |
| 319 | `math.trig.double-angle-formulas` | Double Angle Formulas | A4 (22t, needs-review) | yes | MATH-006, MATH-010, MATH-017 |
| 320 | `math.trig.half-angle-formulas` | Half Angle Formulas | A4 (9t, mastered) | yes | MATH-010, MATH-017 |
| 321 | `math.trig.product-to-sum` | Product-to-Sum and Sum-to-Product Formulas | A4 (21t, mastered) | yes | MATH-003, MATH-010, MATH-017, MATH-028 |
| 322 | `math.trig.inverse-trig` | Inverse Trigonometric Functions | A4 (29t, mastered) | yes | MATH-003, MATH-006, MATH-010, MATH-017, MATH-023 |
| 323 | `math.trig.trig-equations` | Trigonometric Equations | A4 (9t, mastered) | yes | MATH-003, MATH-010 |
| 324 | `math.trig.law-of-sines` | Law of Sines | A4 (13t, mastered) | yes | MATH-003, MATH-010, MATH-017 |
| 325 | `math.trig.law-of-cosines` | Law of Cosines | A4 (21t, needs-review) | yes | MATH-001, MATH-010, MATH-017, MATH-023 |
| 326 | `math.trig.polar-form-complex` | Polar Form of Complex Numbers | A4 (24t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-010, MATH-017, MATH-023 |
| 327 | `math.trig.de-moivres-theorem` | De Moivre's Theorem | A4 (27t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-006, MATH-009, MATH-010, MATH-017, MATH-018 |
| 328 | `math.trig.eulers-formula` | Euler's Formula | A4 (25t, needs-review) | yes | MATH-001, MATH-006, MATH-010, MATH-017, MATH-018, MATH-020, MATH-022, MATH-023, MATH-028 |
| 329 | `math.trig.hyperbolic-functions` | Hyperbolic Functions | A4 (13t, mastered) | yes | MATH-003, MATH-009, MATH-010, MATH-017 |
| 330 | `math.func.function-concept` | Function | A4 (23t, needs-review) | yes | MATH-006, MATH-017 |
| 331 | `math.func.domain-range` | Domain and Range | A4 (21t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-023 |
| 332 | `math.func.function-notation` | Function Notation | A4 (20t, needs-review) | none | MATH-001, MATH-017, MATH-018 |
| 333 | `math.func.graph-of-function` | Graph of a Function | A4 (22t, mastered) | yes | MATH-003, MATH-006, MATH-017, MATH-018 |
| 334 | `math.func.real-valued-function` | Real-Valued Function | A4 (11t, mastered) | none | MATH-002, MATH-017 |
| 335 | `math.func.zero-of-function` | Zero of a Function | A4 (12t, mastered) | none | MATH-002, MATH-017 |
| 336 | `math.func.injectivity` | Injective (One-to-One) Function | **not covered** | — | — |
| 337 | `math.func.surjectivity` | Surjective (Onto) Function | **not covered** | — | — |
| 338 | `math.func.bijection` | Bijective Function | **not covered** | — | — |
| 339 | `math.func.inverse-functions` | Inverse Functions | **not covered** | — | — |
| 340 | `math.func.composition` | Composition of Functions | **not covered** | — | — |
| 341 | `math.func.even-odd-functions` | Even and Odd Functions | **not covered** | — | — |
| 342 | `math.func.transformations-functions` | Transformations of Functions | **not covered** | — | — |
| 343 | `math.func.periodic-function` | Periodic Function | **not covered** | — | — |
| 344 | `math.func.linear-function` | Linear Function | **not covered** | — | — |
| 345 | `math.func.quadratic-function` | Quadratic Function | **not covered** | — | — |
| 346 | `math.func.vertex-form` | Vertex Form of a Quadratic | **not covered** | — | — |
| 347 | `math.func.polynomial-function` | Polynomial Function | **not covered** | — | — |
| 348 | `math.func.end-behavior` | End Behavior | **not covered** | — | — |
| 349 | `math.func.rational-root` | Real Roots of Polynomials | **not covered** | — | — |
| 350 | `math.func.rational-function` | Rational Function | **not covered** | — | — |
| 351 | `math.func.vertical-asymptote` | Vertical Asymptote | **not covered** | — | — |
| 352 | `math.func.horizontal-asymptote` | Horizontal Asymptote | **not covered** | — | — |
| 353 | `math.func.exponential-function` | Exponential Function | **not covered** | — | — |
| 354 | `math.func.logarithmic-function` | Logarithmic Function | **not covered** | — | — |
| 355 | `math.func.piecewise-function` | Piecewise-Defined Function | **not covered** | — | — |
| 356 | `math.func.step-function` | Step Function | **not covered** | — | — |
| 357 | `math.func.monotonic-function` | Monotonic Function | **not covered** | — | — |
| 358 | `math.func.function-operations` | Operations on Functions | **not covered** | — | — |
| 359 | `math.seq.sequence` | Sequence | **not covered** | — | — |
| 360 | `math.seq.arithmetic-sequence` | Arithmetic Sequence | **not covered** | — | — |
| 361 | `math.seq.geometric-sequence` | Geometric Sequence | **not covered** | — | — |
| 362 | `math.seq.recursive-sequences` | Recursive Sequences | **not covered** | — | — |
| 363 | `math.seq.convergent` | Convergent Sequence | **not covered** | — | — |
| 364 | `math.seq.divergent-sequence` | Divergent Sequence | **not covered** | — | — |
| 365 | `math.seq.series` | Series | A5 (12t, needs-review) | none | — |
| 366 | `math.seq.partial-sums` | Partial Sums | A5 (10t, mastered) | none | MATH-003 |
| 367 | `math.seq.arithmetic-series` | Arithmetic Series | A5 (21t, mastered) | yes | MATH-003, MATH-014, MATH-017, MATH-028 |
| 368 | `math.seq.geometric-series` | Geometric Series | A5 (19t, needs-review) | none | MATH-001, MATH-003, MATH-006 |
| 369 | `math.seq.infinite-geometric-series` | Infinite Geometric Series | A5 (14t, needs-review) | none | MATH-001, MATH-006 |
| 370 | `math.seq.series-convergence` | Convergence of Series | A5 (26t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017, MATH-018, MATH-023 |
| 371 | `math.seq.divergence-test` | Divergence Test (nth Term Test) | A5 (13t, mastered) | none | MATH-003, MATH-017 |
| 372 | `math.seq.comparison-test` | Comparison Test | A5 (20t, needs-review) | none | MATH-002, MATH-006, MATH-017, MATH-023 |
| 373 | `math.seq.ratio-test` | Ratio Test | A5 (28t, needs-review) | none | MATH-003, MATH-006, MATH-017, MATH-018 |
| 374 | `math.seq.root-test` | Root Test | A5 (20t, needs-review) | none | MATH-002, MATH-017, MATH-018 |
| 375 | `math.seq.integral-test` | Integral Test | A5 (25t, needs-review) | none | MATH-002, MATH-006, MATH-017, MATH-018 |
| 376 | `math.seq.alternating-series` | Alternating Series | A5 (15t, needs-review) | none | MATH-003, MATH-006 |
| 377 | `math.seq.absolute-convergence` | Absolute and Conditional Convergence | A5 (21t, needs-review) | none | MATH-001, MATH-003, MATH-017 |
| 378 | `math.seq.harmonic-series` | Harmonic Series | A5 (14t, mastered) | none | MATH-017 |
| 379 | `math.seq.telescoping-series` | Telescoping Series | A5 (20t, needs-review) | none | MATH-001, MATH-017, MATH-027 |
| 380 | `math.calc.limits` | Limit of a Function | A5 (23t, needs-review) | yes | MATH-001, MATH-006, MATH-011, MATH-017, MATH-018 |
| 381 | `math.calc.limit-laws` | Limit Laws | A5 (17t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-011, MATH-017 |
| 382 | `math.calc.one-sided-limits` | One-Sided Limits | A5 (21t, needs-review) | yes | MATH-001, MATH-002, MATH-011, MATH-017 |
| 383 | `math.calc.limits-at-infinity` | Limits at Infinity | A5 (21t, needs-review) | yes | MATH-003, MATH-006, MATH-011, MATH-017 |
| 384 | `math.calc.squeeze-theorem` | Squeeze Theorem | A5 (25t, mastered) | yes | MATH-003, MATH-006, MATH-011, MATH-015, MATH-017, MATH-028 |
| 385 | `math.calc.continuity` | Continuity | A5 (22t, needs-review) | yes | MATH-001, MATH-002, MATH-011, MATH-017, MATH-018, MATH-023 |
| 386 | `math.calc.continuity-types` | Types of Discontinuity | A5 (23t, needs-review) | yes | MATH-001, MATH-011, MATH-017 |
| 387 | `math.calc.ivt` | Intermediate Value Theorem | A5 (15t, mastered) | yes | MATH-002, MATH-003, MATH-006, MATH-011, MATH-015 |
| 388 | `math.calc.derivative-intro` | Slope of Tangent and Rate of Change | A5 (12t, needs-review) | yes | MATH-001, MATH-003, MATH-011, MATH-017 |
| 389 | `math.calc.derivative-definition` | Derivative (Definition) | A5 (20t, mastered) | yes | MATH-003, MATH-006, MATH-011, MATH-017 |
| 390 | `math.calc.differentiability` | Differentiability | A5 (24t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-011, MATH-017 |
| 391 | `math.calc.derivative-rules` | Basic Differentiation Rules | A5 (23t, needs-review) | yes | MATH-003, MATH-005, MATH-006, MATH-011 |
| 392 | `math.calc.product-rule` | Product Rule | A5 (8t, mastered) | yes | MATH-011 |
| 393 | `math.calc.quotient-rule` | Quotient Rule | A5 (14t, mastered) | yes | MATH-002, MATH-003, MATH-011, MATH-025 |
| 394 | `math.calc.chain-rule` | Chain Rule | A5 (10t, mastered) | yes | MATH-003, MATH-011, MATH-017 |
| 395 | `math.calc.derivative-exponential` | Derivative of Exponential Functions | A5 (24t, needs-review) | yes | MATH-001, MATH-003, MATH-017 |
| 396 | `math.calc.derivative-ln` | Derivative of Logarithmic Functions | A5 (22t, mastered) | yes | MATH-002, MATH-003, MATH-006, MATH-011, MATH-017, MATH-025 |
| 397 | `math.calc.logarithmic-differentiation` | Logarithmic Differentiation | A5 (22t, needs-review) | yes | MATH-001, MATH-002, MATH-017, MATH-018 |
| 398 | `math.calc.derivative-trig` | Derivatives of Trigonometric Functions | A5 (28t, needs-review) | yes | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018, MATH-025 |
| 399 | `math.calc.derivative-inverse-trig` | Derivatives of Inverse Trig Functions | A5 (11t, needs-review) | yes | MATH-001, MATH-003 |
| 400 | `math.calc.hyperbolic-derivatives` | Derivatives of Hyperbolic Functions | A5 (7t, mastered) | yes | MATH-011 |
| 401 | `math.calc.implicit-differentiation` | Implicit Differentiation | A5 (22t, mastered) | yes | MATH-002, MATH-003, MATH-011, MATH-017 |
| 402 | `math.calc.higher-order-derivatives` | Higher-Order Derivatives | A5 (21t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-011, MATH-017 |
| 403 | `math.calc.related-rates` | Related Rates | A5 (25t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-011, MATH-015, MATH-017, MATH-018, MATH-023 |
| 404 | `math.calc.lhopitals-rule` | L'Hôpital's Rule | A5 (24t, mastered) | yes | MATH-003, MATH-006, MATH-011, MATH-017 |
| 405 | `math.calc.mean-value-theorem` | Mean Value Theorem | A5 (30t, needs-review) | yes | MATH-003, MATH-006, MATH-011, MATH-017, MATH-018 |
| 406 | `math.calc.rolles-theorem` | Rolle's Theorem | A5 (10t, mastered) | yes | MATH-011 |
| 407 | `math.calc.increasing-decreasing` | Increasing and Decreasing Functions | A5 (7t, mastered) | yes | MATH-011 |
| 408 | `math.calc.critical-points` | Critical Points | A5 (16t, mastered) | yes | MATH-002, MATH-003, MATH-017 |
| 409 | `math.calc.local-extrema` | Local Extrema | A5 (24t, needs-review) | yes | MATH-001, MATH-003, MATH-011, MATH-017, MATH-018 |
| 410 | `math.calc.concavity` | Concavity and Inflection Points | A5 (15t, mastered) | yes | MATH-002, MATH-003, MATH-011, MATH-016, MATH-017 |
| 411 | `math.calc.optimization` | Optimization (Calculus) | A5 (7t, mastered) | yes | MATH-011 |
| 412 | `math.calc.curve-sketching` | Curve Sketching | A5 (18t, mastered) | yes | MATH-003, MATH-011, MATH-017, MATH-018 |
| 413 | `math.calc.linearization` | Linearization and Differentials | **not covered** | — | — |
| 414 | `math.calc.antiderivatives` | Antiderivatives | **not covered** | — | — |
| 415 | `math.calc.riemann-sums` | Riemann Sums | **not covered** | — | — |
| 416 | `math.calc.definite-integral` | Definite Integral | **not covered** | — | — |
| 417 | `math.calc.ftc-part1` | Fundamental Theorem of Calculus Part 1 | **not covered** | — | — |
| 418 | `math.calc.ftc-part2` | Fundamental Theorem of Calculus Part 2 | **not covered** | — | — |
| 419 | `math.calc.u-substitution` | Integration by Substitution | **not covered** | — | — |
| 420 | `math.calc.integration-by-parts` | Integration by Parts | **not covered** | — | — |
| 421 | `math.calc.trig-integrals` | Trigonometric Integrals | **not covered** | — | — |
| 422 | `math.calc.trig-substitution` | Trigonometric Substitution | **not covered** | — | — |
| 423 | `math.calc.partial-fractions` | Partial Fraction Decomposition | **not covered** | — | — |
| 424 | `math.calc.reduction-formulas` | Reduction Formulas | **not covered** | — | — |
| 425 | `math.calc.improper-integrals` | Improper Integrals | **not covered** | — | — |
| 426 | `math.calc.integral-area` | Area by Integration | **not covered** | — | — |
| 427 | `math.calc.volume-revolution` | Volumes of Revolution | **not covered** | — | — |
| 428 | `math.calc.arc-length` | Arc Length | **not covered** | — | — |
| 429 | `math.calc.surface-area-integral` | Surface Area of Revolution | **not covered** | — | — |
| 430 | `math.calc.power-series` | Power Series | **not covered** | — | — |
| 431 | `math.calc.radius-of-convergence` | Radius of Convergence | **not covered** | — | — |
| 432 | `math.calc.taylor-series` | Taylor Series | **not covered** | — | — |
| 433 | `math.calc.maclaurin-series` | Maclaurin Series | **not covered** | — | — |
| 434 | `math.calc.taylor-remainder` | Taylor Remainder and Error Bound | **not covered** | — | — |
| 435 | `math.calc.parametric-curves` | Parametric Equations and Curves | **not covered** | — | — |
| 436 | `math.calc.parametric-calculus` | Calculus of Parametric Curves | **not covered** | — | — |
| 437 | `math.calc.multivariable-intro` | Introduction to Multivariable Calculus | **not covered** | — | — |
| 438 | `math.calc.partial-derivatives` | Partial Derivatives | **not covered** | — | — |
| 439 | `math.calc.gradient` | Gradient | **not covered** | — | — |
| 440 | `math.calc.directional-derivative` | Directional Derivative | **not covered** | — | — |
| 441 | `math.calc.chain-rule-multivariable` | Multivariable Chain Rule | **not covered** | — | — |
| 442 | `math.calc.multivariable-extrema` | Multivariable Extrema | **not covered** | — | — |
| 443 | `math.calc.multiple-integrals` | Multiple Integrals | **not covered** | — | — |
| 444 | `math.calc.double-integrals` | Double Integrals | **not covered** | — | — |
| 445 | `math.calc.triple-integrals` | Triple Integrals | **not covered** | — | — |
| 446 | `math.calc.change-of-variables` | Change of Variables (Jacobian) | **not covered** | — | — |
| 447 | `math.calc.line-integrals` | Line Integrals | **not covered** | — | — |
| 448 | `math.calc.surface-integrals` | Surface Integrals | **not covered** | — | — |
| 449 | `math.calc.vector-fields` | Vector Fields | **not covered** | — | — |
| 450 | `math.calc.curl-divergence` | Curl and Divergence | **not covered** | — | — |
| 451 | `math.calc.greens-theorem` | Green's Theorem | **not covered** | — | — |
| 452 | `math.calc.stokes-theorem` | Stokes' Theorem | **not covered** | — | — |
| 453 | `math.calc.divergence-theorem` | Divergence Theorem | **not covered** | — | — |
| 454 | `math.calc.fourier-series-intro` | Fourier Series (Introduction) | **not covered** | — | — |
| 455 | `math.calc.sequence-limits` | Limits of Sequences (Calculus) | **not covered** | — | — |
| 456 | `math.de.ode` | Ordinary Differential Equation | A6 (11t, mastered) | yes | MATH-002, MATH-013, MATH-017 |
| 457 | `math.de.ode-order` | Order of a Differential Equation | A6 (22t, needs-review) | yes | MATH-001, MATH-003, MATH-013, MATH-015, MATH-017, MATH-018 |
| 458 | `math.de.ode-linearity` | Linearity of Differential Equations | A6 (17t, mastered) | yes | MATH-002, MATH-003, MATH-013, MATH-017 |
| 459 | `math.de.solution-types` | Types of Solutions | A6 (20t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-018, MATH-028 |
| 460 | `math.de.ivp` | Initial Value Problem | A6 (31t, mastered) | yes | MATH-003, MATH-006, MATH-013, MATH-017, MATH-019 |
| 461 | `math.de.existence-uniqueness` | Existence and Uniqueness Theorem | A6 (9t, mastered) | none | MATH-003 |
| 462 | `math.de.first-order-ode` | First-Order ODE | A6 (21t, needs-review) | none | MATH-001, MATH-002, MATH-009, MATH-017, MATH-018 |
| 463 | `math.de.separable` | Separable Differential Equation | A6 (29t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-023 |
| 464 | `math.de.linear-first-order` | Linear First-Order ODE | A6 (23t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-015, MATH-017, MATH-022, MATH-024 |
| 465 | `math.de.exact-ode` | Exact Differential Equation | A6 (10t, mastered) | none | MATH-003, MATH-006 |
| 466 | `math.de.bernoulli` | Bernoulli Equation | A6 (17t, needs-review) | none | MATH-003, MATH-006 |
| 467 | `math.de.homogeneous-ode` | Homogeneous First-Order ODE | A6 (18t, mastered) | none | MATH-003, MATH-017 |
| 468 | `math.de.slope-field` | Slope Field | A6 (22t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 469 | `math.de.euler-method` | Euler's Method | A6 (24t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017, MATH-023 |
| 470 | `math.de.second-order-ode` | Second-Order ODE | A6 (21t, needs-review) | none | MATH-006, MATH-009, MATH-017 |
| 471 | `math.de.second-order-linear` | Second-Order Linear ODE | A6 (31t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-006, MATH-017, MATH-018 |
| 472 | `math.de.second-order-homogeneous` | Homogeneous Second-Order Linear ODE | A6 (21t, needs-review) | none | MATH-001, MATH-003, MATH-017, MATH-026 |
| 473 | `math.de.wronskian` | Wronskian | A6 (26t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017 |
| 474 | `math.de.char-equation` | Characteristic Equation | A6 (22t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 475 | `math.de.undetermined-coefficients` | Method of Undetermined Coefficients | A6 (24t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-015, MATH-017, MATH-018 |
| 476 | `math.de.variation-of-parameters` | Variation of Parameters | A6 (21t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 477 | `math.de.harmonic-oscillator` | Harmonic Oscillator | A6 (9t, mastered) | none | MATH-003, MATH-017 |
| 478 | `math.de.resonance` | Resonance | A6 (23t, mastered) | none | MATH-003, MATH-006, MATH-017 |
| 479 | `math.de.higher-order-ode` | Higher-Order Linear ODE | A6 (22t, needs-review) | none | MATH-001, MATH-017 |
| 480 | `math.de.laplace-transform` | Laplace Transform | A6 (22t, mastered) | none | MATH-003, MATH-006, MATH-017 |
| 481 | `math.de.laplace-properties` | Laplace Transform Properties | A6 (29t, mastered) | none | MATH-002, MATH-003, MATH-006, MATH-017, MATH-023 |
| 482 | `math.de.inverse-laplace` | Inverse Laplace Transform | A6 (10t, mastered) | none | — |
| 483 | `math.de.laplace-ode` | Solving ODEs with Laplace Transform | A6 (11t, mastered) | none | MATH-017 |
| 484 | `math.de.convolution-theorem` | Convolution Theorem (Laplace) | A6 (27t, needs-review) | none | MATH-006, MATH-009, MATH-017, MATH-018, MATH-020 |
| 485 | `math.de.systems-ode` | Systems of ODEs | A6 (22t, mastered) | none | MATH-003, MATH-006, MATH-015, MATH-017, MATH-018 |
| 486 | `math.de.systems-matrix-method` | Matrix Method for Linear Systems | A6 (19t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-006, MATH-015, MATH-020, MATH-022, MATH-023 |
| 487 | `math.de.phase-plane` | Phase Plane Analysis | A6 (18t, mastered) | none | MATH-003, MATH-017 |
| 488 | `math.de.stability-analysis` | Stability Analysis | A6 (9t, mastered) | none | MATH-003, MATH-009 |
| 489 | `math.de.series-solution` | Series Solution of ODEs | A6 (31t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-006, MATH-015, MATH-017, MATH-023 |
| 490 | `math.de.frobenius-method` | Frobenius Method | A6 (17t, mastered) | none | MATH-002, MATH-003, MATH-006, MATH-023 |
| 491 | `math.de.bessel-equation` | Bessel's Equation | A6 (26t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-023 |
| 492 | `math.de.legendre-equation` | Legendre's Equation | A6 (31t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017, MATH-018, MATH-023 |
| 493 | `math.de.sturm-liouville` | Sturm-Liouville Theory | A6 (30t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-006, MATH-015, MATH-017 |
| 494 | `math.de.eigenfunction-expansion` | Eigenfunction Expansion | A6 (20t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-018, MATH-023 |
| 495 | `math.de.bvp` | Boundary Value Problem | A6 (20t, needs-review) | none | MATH-001, MATH-017 |
| 496 | `math.de.fourier-series` | Fourier Series | A6 (18t, needs-review) | none | MATH-003 |
| 497 | `math.de.fourier-convergence` | Convergence of Fourier Series | A6 (9t, mastered) | none | MATH-017 |
| 498 | `math.de.fourier-sine-cosine` | Fourier Sine and Cosine Series | A6 (17t, mastered) | none | MATH-003, MATH-006, MATH-017 |
| 499 | `math.de.fourier-transform` | Fourier Transform | **not covered** | — | — |
| 500 | `math.de.pde` | Partial Differential Equation | **not covered** | — | — |
| 501 | `math.de.pde-classification` | Classification of Second-Order PDEs | **not covered** | — | — |
| 502 | `math.de.separation-of-variables-pde` | Separation of Variables (PDE) | **not covered** | — | — |
| 503 | `math.de.heat-equation` | Heat Equation | **not covered** | — | — |
| 504 | `math.de.wave-equation` | Wave Equation | **not covered** | — | — |
| 505 | `math.de.laplace-equation` | Laplace's Equation | **not covered** | — | — |
| 506 | `math.de.harmonic-functions` | Harmonic Functions | **not covered** | — | — |
| 507 | `math.de.poisson-equation` | Poisson's Equation | **not covered** | — | — |
| 508 | `math.de.greens-function` | Green's Function | **not covered** | — | — |
| 509 | `math.de.nonlinear-ode` | Nonlinear ODE | **not covered** | — | — |
| 510 | `math.de.bifurcation` | Bifurcation Theory | **not covered** | — | — |
| 511 | `math.de.chaos` | Chaotic Dynamics | **not covered** | — | — |
| 512 | `math.linalg.vector` | Vector | **not covered** | — | — |
| 513 | `math.linalg.vector-addition` | Vector Addition | **not covered** | — | — |
| 514 | `math.linalg.scalar-multiplication` | Scalar Multiplication | **not covered** | — | — |
| 515 | `math.linalg.dot-product` | Dot Product | **not covered** | — | — |
| 516 | `math.linalg.norm` | Vector Norm | **not covered** | — | — |
| 517 | `math.linalg.unit-vector` | Unit Vector | **not covered** | — | — |
| 518 | `math.linalg.orthogonality` | Orthogonality | **not covered** | — | — |
| 519 | `math.linalg.cross-product` | Cross Product | **not covered** | — | — |
| 520 | `math.linalg.matrix` | Matrix | **not covered** | — | — |
| 521 | `math.linalg.matrix-addition` | Matrix Addition | **not covered** | — | — |
| 522 | `math.linalg.matrix-multiplication` | Matrix Multiplication | **not covered** | — | — |
| 523 | `math.linalg.matrix-transpose` | Matrix Transpose | **not covered** | — | — |
| 524 | `math.linalg.symmetric-matrix` | Symmetric Matrix | **not covered** | — | — |
| 525 | `math.linalg.linear-system` | System of Linear Equations | **not covered** | — | — |
| 526 | `math.linalg.augmented-matrix` | Augmented Matrix | **not covered** | — | — |
| 527 | `math.linalg.row-reduction` | Row Reduction | **not covered** | — | — |
| 528 | `math.linalg.row-echelon` | Row Echelon Form | **not covered** | — | — |
| 529 | `math.linalg.rank` | Rank | **not covered** | — | — |
| 530 | `math.linalg.matrix-inverse` | Matrix Inverse | **not covered** | — | — |
| 531 | `math.linalg.determinant` | Determinant | **not covered** | — | — |
| 532 | `math.linalg.cofactor-expansion` | Cofactor Expansion | **not covered** | — | — |
| 533 | `math.linalg.det-properties` | Properties of Determinants | **not covered** | — | — |
| 534 | `math.linalg.cramer-rule` | Cramer's Rule | **not covered** | — | — |
| 535 | `math.linalg.lu-factorization` | LU Factorization | **not covered** | — | — |
| 536 | `math.linalg.vector-space` | Vector Space | **not covered** | — | — |
| 537 | `math.linalg.subspace` | Subspace | **not covered** | — | — |
| 538 | `math.linalg.span` | Span | **not covered** | — | — |
| 539 | `math.linalg.linear-independence` | Linear Independence | **not covered** | — | — |
| 540 | `math.linalg.basis` | Basis | **not covered** | — | — |
| 541 | `math.linalg.dimension` | Dimension | **not covered** | — | — |
| 542 | `math.linalg.coordinates` | Coordinates | **not covered** | — | — |
| 543 | `math.linalg.change-of-basis` | Change of Basis | **not covered** | — | — |
| 544 | `math.linalg.null-space` | Null Space | **not covered** | — | — |
| 545 | `math.linalg.column-space` | Column Space | **not covered** | — | — |
| 546 | `math.linalg.rank-nullity` | Rank-Nullity Theorem | **not covered** | — | — |
| 547 | `math.linalg.linear-map` | Linear Map | A7 (14t, mastered) | yes | MATH-002, MATH-003, MATH-013, MATH-017 |
| 548 | `math.linalg.kernel-image` | Kernel and Image of Linear Map | A7 (8t, needs-review) | yes | MATH-001, MATH-013 |
| 549 | `math.linalg.matrix-representation` | Matrix Representation of Linear Map | A7 (16t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-006, MATH-015 |
| 550 | `math.linalg.eigenvalues` | Eigenvalues and Eigenvectors | A7 (19t, needs-review) | none | MATH-003, MATH-017, MATH-026 |
| 551 | `math.linalg.characteristic-polynomial` | Characteristic Polynomial | A7 (10t, mastered) | none | — |
| 552 | `math.linalg.eigenspace` | Eigenspace | A7 (20t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-020, MATH-021 |
| 553 | `math.linalg.diagonalization` | Diagonalization | A7 (24t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017, MATH-018 |
| 554 | `math.linalg.matrix-exponential` | Matrix Exponential | A7 (30t, needs-review) | none | MATH-001, MATH-003, MATH-006, MATH-015, MATH-017, MATH-018 |
| 555 | `math.linalg.jordan-form` | Jordan Normal Form | A7 (8t, mastered) | none | — |
| 556 | `math.linalg.spectral-theorem` | Spectral Theorem | A7 (21t, mastered) | none | MATH-003, MATH-006, MATH-017 |
| 557 | `math.linalg.positive-definite` | Positive Definite Matrix | A7 (24t, needs-review) | none | MATH-001, MATH-006, MATH-015, MATH-017, MATH-020 |
| 558 | `math.linalg.cholesky` | Cholesky Decomposition | A7 (17t, mastered) | none | MATH-002, MATH-006, MATH-017 |
| 559 | `math.linalg.inner-product` | Inner Product | A7 (20t, needs-review) | none | MATH-001, MATH-006, MATH-015, MATH-017, MATH-018 |
| 560 | `math.linalg.inner-product-space` | Inner Product Space | A7 (27t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-018 |
| 561 | `math.linalg.orthogonal-basis` | Orthogonal and Orthonormal Basis | A7 (24t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 562 | `math.linalg.gram-schmidt` | Gram-Schmidt Process | A7 (19t, mastered) | none | MATH-003, MATH-006, MATH-017 |
| 563 | `math.linalg.projection` | Orthogonal Projection | A7 (20t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 564 | `math.linalg.least-squares` | Least Squares | A7 (25t, mastered) | none | MATH-003, MATH-006, MATH-017, MATH-018 |
| 565 | `math.linalg.qr-factorization` | QR Factorization | A7 (10t, mastered) | none | MATH-003 |
| 566 | `math.linalg.svd` | Singular Value Decomposition | A7 (21t, needs-review) | none | MATH-001, MATH-017, MATH-026, MATH-028 |
| 567 | `math.linalg.singular-values` | Singular Values | A7 (23t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-018 |
| 568 | `math.linalg.pseudoinverse` | Moore-Penrose Pseudoinverse | A7 (20t, needs-review) | none | MATH-001, MATH-003, MATH-017 |
| 569 | `math.linalg.tensor` | Tensor | A7 (17t, needs-review) | none | MATH-001, MATH-003, MATH-017, MATH-023 |
| 570 | `math.linalg.dual-space` | Dual Space | A7 (9t, mastered) | none | MATH-006 |
| 571 | `math.linalg.distance` | Distance in Vector Spaces | A7 (15t, needs-review) | none | MATH-002, MATH-003 |
| 572 | `math.linalg.angle-vectors` | Angle Between Vectors | A7 (18t, mastered) | none | MATH-003, MATH-006, MATH-017, MATH-018 |
| 573 | `math.prob.sample-space` | Sample Space | A7 (22t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017, MATH-023 |
| 574 | `math.prob.event` | Event | A7 (9t, mastered) | none | — |
| 575 | `math.prob.probability-measure` | Probability Measure | A7 (19t, needs-review) | none | MATH-001, MATH-017, MATH-023 |
| 576 | `math.prob.probability-axioms` | Axioms of Probability | A7 (24t, needs-review) | none | MATH-002, MATH-003, MATH-006, MATH-018 |
| 577 | `math.prob.classical-probability` | Classical Probability | A7 (22t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-023 |
| 578 | `math.prob.combinatorial-probability` | Combinatorial Probability | A7 (10t, mastered) | none | MATH-017 |
| 579 | `math.prob.conditional-probability` | Conditional Probability | A7 (21t, needs-review) | none | MATH-001, MATH-002, MATH-017 |
| 580 | `math.prob.total-probability` | Law of Total Probability | A7 (13t, needs-review) | none | MATH-002, MATH-003 |
| 581 | `math.prob.bayes-theorem` | Bayes' Theorem | A7 (15t, mastered) | none | MATH-002, MATH-003 |
| 582 | `math.prob.independence` | Independence | A7 (15t, needs-review) | none | MATH-002, MATH-003 |
| 583 | `math.prob.bayesian-inference` | Bayesian Inference | A7 (21t, needs-review) | none | MATH-002, MATH-017, MATH-020, MATH-021, MATH-028 |
| 584 | `math.prob.random-variable` | Random Variable | A7 (20t, needs-review) | none | MATH-001, MATH-002, MATH-017 |
| 585 | `math.prob.discrete-rv` | Discrete Random Variable | A7 (11t, mastered) | none | MATH-003, MATH-006 |
| 586 | `math.prob.continuous-rv` | Continuous Random Variable | A7 (29t, mastered) | none | MATH-002, MATH-003, MATH-017, MATH-018, MATH-023 |
| 587 | `math.prob.pmf` | Probability Mass Function | A7 (27t, needs-review) | none | MATH-001, MATH-003, MATH-017, MATH-018 |
| 588 | `math.prob.pdf` | Probability Density Function | A7 (19t, mastered) | none | MATH-003, MATH-017 |
| 589 | `math.prob.cdf` | Cumulative Distribution Function | A7 (24t, needs-review) | none | MATH-001, MATH-006, MATH-016, MATH-017, MATH-018 |
| 590 | `math.prob.quantile` | Quantile | A7 (22t, needs-review) | none | MATH-001, MATH-017, MATH-018 |
| 591 | `math.prob.distribution` | Probability Distribution | A7 (21t, needs-review) | none | MATH-001, MATH-015, MATH-017 |
| 592 | `math.prob.discrete-distributions` | Discrete Distributions | A7 (30t, needs-review) | none | MATH-001, MATH-002, MATH-015, MATH-017 |
| 593 | `math.prob.continuous-distributions` | Continuous Distributions | A7 (21t, needs-review) | none | MATH-001, MATH-017, MATH-023 |
| 594 | `math.prob.normal-distribution` | Normal Distribution | **not covered** | — | — |
| 595 | `math.prob.standard-normal` | Standard Normal Distribution | **not covered** | — | — |
| 596 | `math.prob.expected-value` | Expected Value | **not covered** | — | — |
| 597 | `math.prob.linearity-expectation` | Linearity of Expectation | **not covered** | — | — |
| 598 | `math.prob.law-of-unconscious` | Law of the Unconscious Statistician | **not covered** | — | — |
| 599 | `math.prob.variance` | Variance | **not covered** | — | — |
| 600 | `math.prob.standard-deviation` | Standard Deviation | **not covered** | — | — |
| 601 | `math.prob.moments` | Moments | **not covered** | — | — |
| 602 | `math.prob.mgf` | Moment Generating Function | **not covered** | — | — |
| 603 | `math.prob.characteristic-function` | Characteristic Function | **not covered** | — | — |
| 604 | `math.prob.covariance` | Covariance | **not covered** | — | — |
| 605 | `math.prob.correlation` | Correlation | **not covered** | — | — |
| 606 | `math.prob.joint-distribution` | Joint Distribution | **not covered** | — | — |
| 607 | `math.prob.marginal-distribution` | Marginal Distribution | **not covered** | — | — |
| 608 | `math.prob.conditional-distribution` | Conditional Distribution | **not covered** | — | — |
| 609 | `math.prob.conditional-expectation` | Conditional Expectation | **not covered** | — | — |
| 610 | `math.prob.chebyshev` | Chebyshev's Inequality | **not covered** | — | — |
| 611 | `math.prob.markov-inequality` | Markov's Inequality | **not covered** | — | — |
| 612 | `math.prob.lln` | Law of Large Numbers | **not covered** | — | — |
| 613 | `math.prob.clt` | Central Limit Theorem | **not covered** | — | — |
| 614 | `math.prob.convergence-types` | Modes of Convergence | **not covered** | — | — |
| 615 | `math.prob.generating-function` | Probability Generating Function | **not covered** | — | — |
| 616 | `math.prob.markov-chain` | Markov Chain | **not covered** | — | — |
| 617 | `math.prob.transition-matrix` | Transition Matrix | **not covered** | — | — |
| 618 | `math.prob.stationary-distribution` | Stationary Distribution | **not covered** | — | — |
| 619 | `math.prob.ergodicity` | Ergodic Theorem (Markov Chains) | **not covered** | — | — |
| 620 | `math.prob.martingale` | Martingale | **not covered** | — | — |
| 621 | `math.prob.poisson-process` | Poisson Process | **not covered** | — | — |
| 622 | `math.stats.population-sample` | Population and Sample | **not covered** | — | — |
| 623 | `math.stats.descriptive-statistics` | Descriptive Statistics | **not covered** | — | — |
| 624 | `math.stats.measures-of-center` | Measures of Center | **not covered** | — | — |
| 625 | `math.stats.measures-of-spread` | Measures of Spread | **not covered** | — | — |
| 626 | `math.stats.percentile` | Percentile | **not covered** | — | — |
| 627 | `math.stats.data-visualization` | Data Visualization | **not covered** | — | — |
| 628 | `math.stats.sampling` | Sampling Methods | **not covered** | — | — |
| 629 | `math.stats.sampling-distribution` | Sampling Distribution | **not covered** | — | — |
| 630 | `math.stats.standard-error` | Standard Error | **not covered** | — | — |
| 631 | `math.stats.estimator` | Estimator | **not covered** | — | — |
| 632 | `math.stats.bias-variance` | Bias-Variance Tradeoff | **not covered** | — | — |
| 633 | `math.stats.consistency` | Consistency of Estimators | **not covered** | — | — |
| 634 | `math.stats.mle` | Maximum Likelihood Estimation | **not covered** | — | — |
| 635 | `math.stats.method-of-moments` | Method of Moments | **not covered** | — | — |
| 636 | `math.stats.confidence-interval` | Confidence Interval | **not covered** | — | — |
| 637 | `math.stats.ci-mean` | Confidence Interval for a Mean | **not covered** | — | — |
| 638 | `math.stats.ci-proportion` | Confidence Interval for a Proportion | A8 (12t, mastered) | yes | MATH-011, MATH-016, MATH-017 |
| 639 | `math.stats.hypothesis-testing` | Hypothesis Testing | A8 (19t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-011, MATH-017, MATH-018 |
| 640 | `math.stats.test-statistic` | Test Statistic | A8 (22t, needs-review) | yes | MATH-002, MATH-006, MATH-011, MATH-017, MATH-018 |
| 641 | `math.stats.p-value` | p-value | A8 (7t, mastered) | yes | MATH-011, MATH-025 |
| 642 | `math.stats.type-errors` | Type I and Type II Errors | A8 (29t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-011, MATH-017 |
| 643 | `math.stats.power` | Power of a Test | A8 (26t, mastered) | yes | MATH-002, MATH-003, MATH-006, MATH-011, MATH-017 |
| 644 | `math.stats.z-test` | z-Test | A8 (8t, mastered) | yes | MATH-011 |
| 645 | `math.stats.t-test` | t-Test | A8 (21t, needs-review) | yes | MATH-011, MATH-017, MATH-023 |
| 646 | `math.stats.chi-squared-test` | Chi-Squared Test | A8 (21t, needs-review) | yes | MATH-002, MATH-006, MATH-011, MATH-017, MATH-023 |
| 647 | `math.stats.anova` | Analysis of Variance | A8 (31t, no-complete) | yes | MATH-003, MATH-006, MATH-009, MATH-011, MATH-017, MATH-023 |
| 648 | `math.stats.two-way-anova` | Two-Way ANOVA | A8 (25t, mastered) | yes | MATH-002, MATH-003, MATH-006, MATH-011, MATH-017, MATH-023 |
| 649 | `math.stats.correlation` | Sample Correlation | A8 (27t, needs-review) | yes | MATH-002, MATH-003, MATH-011, MATH-017, MATH-028 |
| 650 | `math.stats.linear-regression` | Simple Linear Regression | A8 (21t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-017, MATH-023, MATH-025 |
| 651 | `math.stats.multiple-regression` | Multiple Linear Regression | A8 (24t, needs-review) | yes | MATH-001, MATH-002, MATH-005, MATH-006, MATH-011, MATH-017 |
| 652 | `math.stats.covariance-matrix` | Covariance Matrix | A8 (18t, mastered) | yes | MATH-002, MATH-011, MATH-017 |
| 653 | `math.stats.normal-distribution` | Normal Distribution (Statistics) | A8 (28t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-006, MATH-011, MATH-017, MATH-023 |
| 654 | `math.stats.normal-approximation` | Normal Approximation | A8 (22t, needs-review) | yes | MATH-001, MATH-002, MATH-011, MATH-015, MATH-017, MATH-023 |
| 655 | `math.stats.nonparametric` | Nonparametric Tests | A8 (24t, needs-review) | yes | MATH-001, MATH-002, MATH-011, MATH-017, MATH-018 |
| 656 | `math.stats.bayesian-inference` | Bayesian Statistics | A8 (17t, needs-review) | yes | MATH-001, MATH-003, MATH-011, MATH-017 |
| 657 | `math.stats.conjugate-prior` | Conjugate Prior | A8 (13t, mastered) | yes | MATH-002, MATH-003, MATH-011, MATH-017, MATH-028 |
| 658 | `math.stats.credible-interval` | Credible Interval | A8 (18t, mastered) | yes | MATH-003, MATH-006, MATH-011, MATH-017, MATH-018, MATH-028 |
| 659 | `math.stats.experimental-design` | Experimental Design | A8 (16t, needs-review) | yes | MATH-003, MATH-006 |
| 660 | `math.stats.sufficient-statistic` | Sufficient Statistic | A8 (10t, needs-review) | yes | MATH-003, MATH-011 |
| 661 | `math.stats.rao-blackwell` | Rao-Blackwell Theorem | A8 (24t, needs-review) | yes | MATH-001, MATH-006, MATH-011, MATH-017, MATH-020 |
| 662 | `math.disc.counting-principles` | Counting Principles | A8 (17t, mastered) | yes | MATH-002, MATH-003, MATH-013, MATH-016, MATH-017, MATH-018 |
| 663 | `math.disc.permutations` | Permutations | A8 (15t, mastered) | yes | MATH-003, MATH-006, MATH-013, MATH-017 |
| 664 | `math.disc.combinations` | Combinations | A8 (26t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-013, MATH-017, MATH-023 |
| 665 | `math.disc.binomial-theorem` | Binomial Theorem | A8 (12t, mastered) | yes | MATH-002, MATH-003, MATH-013 |
| 666 | `math.disc.combinatorics` | Combinatorics | A8 (26t, needs-review) | none | MATH-001, MATH-003, MATH-006, MATH-017, MATH-018, MATH-020, MATH-022 |
| 667 | `math.disc.stars-bars` | Stars and Bars | A8 (12t, mastered) | none | MATH-002, MATH-003 |
| 668 | `math.disc.pigeonhole` | Pigeonhole Principle | A8 (21t, needs-review) | none | MATH-002, MATH-003, MATH-006, MATH-017 |
| 669 | `math.disc.inclusion-exclusion` | Inclusion-Exclusion Principle | A8 (23t, needs-review) | none | MATH-001, MATH-002, MATH-017 |
| 670 | `math.disc.derangements` | Derangements | A8 (21t, mastered) | none | MATH-002, MATH-003, MATH-006, MATH-017, MATH-023 |
| 671 | `math.disc.recurrence-relation` | Recurrence Relation | A8 (7t, mastered) | none | — |
| 672 | `math.disc.linear-recurrence` | Linear Recurrence | A8 (10t, mastered) | none | MATH-003 |
| 673 | `math.disc.divide-conquer-recurrence` | Divide-and-Conquer Recurrence | A8 (10t, mastered) | none | MATH-003 |
| 674 | `math.disc.generating-functions` | Generating Functions | A8 (12t, mastered) | none | MATH-017 |
| 675 | `math.disc.ogf` | Ordinary Generating Function | A8 (18t, mastered) | none | MATH-003, MATH-006, MATH-017 |
| 676 | `math.disc.egf` | Exponential Generating Function | A8 (17t, needs-review) | none | MATH-003, MATH-006 |
| 677 | `math.disc.graph` | Graph | A8 (27t, needs-review) | none | MATH-002, MATH-016, MATH-017, MATH-018 |
| 678 | `math.disc.graph-types` | Types of Graphs | A8 (9t, mastered) | none | MATH-003 |
| 679 | `math.disc.graph-representation` | Graph Representation | A8 (7t, mastered) | none | — |
| 680 | `math.disc.graph-connectivity` | Graph Connectivity | A8 (22t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-018 |
| 681 | `math.disc.euler-hamiltonian` | Euler and Hamiltonian Paths | A8 (25t, needs-review) | none | MATH-001, MATH-005, MATH-017 |
| 682 | `math.disc.graph-trees` | Trees | A8 (20t, mastered) | none | MATH-003, MATH-017, MATH-018 |
| 683 | `math.disc.spanning-tree` | Spanning Tree | A8 (21t, needs-review) | none | MATH-001, MATH-002, MATH-017 |
| 684 | `math.disc.graph-coloring` | Graph Coloring | A8 (20t, needs-review) | none | MATH-001, MATH-017 |
| 685 | `math.disc.planar-graph` | Planar Graph | A8 (12t, mastered) | none | MATH-017 |
| 686 | `math.disc.propositional-logic` | Propositional Logic | **not covered** | — | — |
| 687 | `math.disc.boolean-circuits` | Boolean Circuits and Logic Gates | **not covered** | — | — |
| 688 | `math.disc.predicate-logic-disc` | Predicate Logic and Proof Methods | **not covered** | — | — |
| 689 | `math.disc.asymptotic-notation` | Asymptotic Notation | **not covered** | — | — |
| 690 | `math.disc.algorithm-complexity` | Algorithm Complexity | **not covered** | — | — |
| 691 | `math.disc.complexity-classes` | Complexity Classes | **not covered** | — | — |
| 692 | `math.disc.catalan-numbers` | Catalan Numbers | **not covered** | — | — |
| 693 | `math.disc.stirling-numbers` | Stirling Numbers | **not covered** | — | — |
| 694 | `math.abst.algebraic-structure` | Algebraic Structure | **not covered** | — | — |
| 695 | `math.abst.binary-operation` | Binary Operation | **not covered** | — | — |
| 696 | `math.abst.group-theory` | Group | **not covered** | — | — |
| 697 | `math.abst.group-operation` | Group Operation Examples | **not covered** | — | — |
| 698 | `math.abst.subgroup` | Subgroup | **not covered** | — | — |
| 699 | `math.abst.cyclic-group` | Cyclic Group | **not covered** | — | — |
| 700 | `math.abst.group-order` | Order of Group and Elements | **not covered** | — | — |
| 701 | `math.abst.coset` | Coset | **not covered** | — | — |
| 702 | `math.abst.lagrange-theorem` | Lagrange's Theorem | **not covered** | — | — |
| 703 | `math.abst.normal-subgroup` | Normal Subgroup | **not covered** | — | — |
| 704 | `math.abst.quotient-group` | Quotient Group | **not covered** | — | — |
| 705 | `math.abst.group-homomorphism` | Group Homomorphism | **not covered** | — | — |
| 706 | `math.abst.group-isomorphism` | Group Isomorphism | **not covered** | — | — |
| 707 | `math.abst.first-isomorphism-theorem` | First Isomorphism Theorem | **not covered** | — | — |
| 708 | `math.abst.second-isomorphism-theorem` | Second and Third Isomorphism Theorems | **not covered** | — | — |
| 709 | `math.abst.group-action` | Group Action | **not covered** | — | — |
| 710 | `math.abst.burnside-lemma` | Burnside's Lemma | **not covered** | — | — |
| 711 | `math.abst.sylow-theorems` | Sylow Theorems | **not covered** | — | — |
| 712 | `math.abst.symmetric-group` | Symmetric Group | **not covered** | — | — |
| 713 | `math.abst.alternating-group` | Alternating Group | **not covered** | — | — |
| 714 | `math.abst.ring-theory` | Ring | **not covered** | — | — |
| 715 | `math.abst.ideal` | Ideal | **not covered** | — | — |
| 716 | `math.abst.quotient-ring` | Quotient Ring | **not covered** | — | — |
| 717 | `math.abst.prime-ideal` | Prime and Maximal Ideals | **not covered** | — | — |
| 718 | `math.abst.ring-homomorphism` | Ring Homomorphism | **not covered** | — | — |
| 719 | `math.abst.polynomial-ring` | Polynomial Ring | **not covered** | — | — |
| 720 | `math.abst.euclidean-domain` | Euclidean Domain | **not covered** | — | — |
| 721 | `math.abst.pid` | Principal Ideal Domain | **not covered** | — | — |
| 722 | `math.abst.ufd` | Unique Factorization Domain | **not covered** | — | — |
| 723 | `math.abst.field` | Field | **not covered** | — | — |
| 724 | `math.abst.field-extension` | Field Extension | **not covered** | — | — |
| 725 | `math.abst.algebraic-extension` | Algebraic Extension | **not covered** | — | — |
| 726 | `math.abst.finite-field` | Finite Field | **not covered** | — | — |
| 727 | `math.abst.galois-theory` | Galois Theory | **not covered** | — | — |
| 728 | `math.abst.galois-group` | Galois Group | **not covered** | — | — |
| 729 | `math.abst.galois-correspondence` | Fundamental Theorem of Galois Theory | A9 (13t, mastered) | none | MATH-003, MATH-017 |
| 730 | `math.abst.group-inverse` | Group Inverse | A9 (16t, mastered) | none | MATH-003, MATH-006, MATH-017 |
| 731 | `math.real.completeness` | Completeness of ℝ | A9 (25t, mastered) | none | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018 |
| 732 | `math.real.sup-inf` | Supremum and Infimum | A9 (11t, mastered) | none | MATH-003, MATH-009 |
| 733 | `math.real.archimedean` | Archimedean Property | A9 (23t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017, MATH-018 |
| 734 | `math.real.convergence-sequences` | Convergence of Sequences | A9 (20t, needs-review) | none | MATH-001, MATH-003, MATH-023 |
| 735 | `math.real.cauchy-sequence` | Cauchy Sequence | A9 (23t, needs-review) | yes | MATH-001, MATH-006, MATH-009, MATH-012, MATH-017, MATH-018, MATH-019 |
| 736 | `math.real.series-rigorous` | Series (Rigorous) | A9 (30t, needs-review) | none | MATH-001, MATH-003, MATH-006, MATH-017 |
| 737 | `math.real.absolute-convergence` | Absolute Convergence | A9 (26t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-023 |
| 738 | `math.real.metric-space` | Metric Space | A9 (26t, needs-review) | none | MATH-002, MATH-006, MATH-017, MATH-020, MATH-023 |
| 739 | `math.real.open-sets` | Open and Closed Sets | A9 (20t, needs-review) | none | MATH-001, MATH-017 |
| 740 | `math.real.completeness-metric` | Completeness of Metric Spaces | A9 (21t, needs-review) | none | MATH-001, MATH-006, MATH-017 |
| 741 | `math.real.compactness` | Compactness | A9 (19t, needs-review) | none | MATH-001, MATH-003, MATH-006 |
| 742 | `math.real.connectedness` | Connectedness | A9 (25t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-020 |
| 743 | `math.real.continuity-rigorous` | Continuity (ε-δ) | A9 (21t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 744 | `math.real.uniform-continuity` | Uniform Continuity | A9 (29t, needs-review) | none | MATH-003, MATH-006, MATH-017 |
| 745 | `math.real.lipschitz-continuity` | Lipschitz Continuity | A9 (30t, no-complete) | none | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018, MATH-023 |
| 746 | `math.real.extreme-value-theorem` | Extreme Value Theorem | A9 (22t, needs-review) | none | MATH-001, MATH-003, MATH-017, MATH-018, MATH-023 |
| 747 | `math.real.ivt` | Intermediate Value Theorem (Rigorous) | A9 (21t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-018 |
| 748 | `math.real.differentiability-rigorous` | Differentiability (Rigorous) | A9 (10t, mastered) | none | MATH-003 |
| 749 | `math.real.mvt` | Mean Value Theorem (Rigorous) | A9 (15t, needs-review) | none | MATH-001, MATH-003, MATH-006, MATH-017, MATH-020 |
| 750 | `math.real.taylor-rigorous` | Taylor's Theorem (Rigorous) | A9 (29t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-006, MATH-015, MATH-017, MATH-018 |
| 751 | `math.real.riemann-integral` | Riemann Integral (Rigorous) | A9 (14t, needs-review) | none | MATH-001, MATH-006, MATH-009, MATH-017 |
| 752 | `math.real.riemann-integrability` | Riemann Integrability | A9 (9t, mastered) | none | MATH-003 |
| 753 | `math.real.ftc-rigorous` | Fundamental Theorem of Calculus (Rigorous) | A9 (17t, mastered) | none | MATH-002, MATH-003, MATH-006, MATH-017 |
| 754 | `math.real.uniform-convergence` | Uniform Convergence | A9 (30t, no-complete) | none | MATH-003, MATH-006, MATH-017, MATH-018 |
| 755 | `math.real.pointwise-convergence` | Pointwise Convergence | A9 (21t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-018 |
| 756 | `math.real.weierstrass-approximation` | Weierstrass Approximation Theorem | A9 (22t, needs-review) | none | MATH-002, MATH-006, MATH-017 |
| 757 | `math.real.fixed-point-theorem` | Banach Fixed-Point Theorem | A9 (18t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 758 | `math.real.baire-category` | Baire Category Theorem | A9 (15t, mastered) | none | MATH-003, MATH-017 |
| 759 | `math.real.implicit-function-theorem` | Implicit Function Theorem | A9 (13t, needs-review) | none | MATH-001, MATH-003 |
| 760 | `math.real.inverse-function-theorem` | Inverse Function Theorem | A9 (7t, mastered) | none | — |
| 761 | `math.cx.complex-numbers-analysis` | Complex Numbers (Analysis) | A9 (23t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-009, MATH-015, MATH-017, MATH-018, MATH-020, MATH-023 |
| 762 | `math.cx.complex-function` | Complex-Valued Function | A9 (11t, needs-review) | none | MATH-003 |
| 763 | `math.cx.cauchy-riemann` | Cauchy-Riemann Equations | A9 (26t, needs-review) | none | MATH-001, MATH-006, MATH-009, MATH-016, MATH-017, MATH-018 |
| 764 | `math.cx.analytic-functions` | Analytic (Holomorphic) Functions | A9 (25t, mastered) | none | MATH-002, MATH-003, MATH-006, MATH-017 |
| 765 | `math.cx.harmonic-functions` | Harmonic Functions (Complex Analysis) | A9 (13t, mastered) | none | MATH-002, MATH-003, MATH-017 |
| 766 | `math.cx.power-series-cx` | Power Series in ℂ | A9 (7t, mastered) | none | — |
| 767 | `math.cx.complex-integration` | Complex Line Integral | A9 (21t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-023, MATH-028 |
| 768 | `math.cx.cauchy-theorem` | Cauchy's Theorem | A9 (22t, needs-review) | none | MATH-001, MATH-017, MATH-018 |
| 769 | `math.cx.cauchy-goursat` | Cauchy-Goursat Theorem | A9 (15t, mastered) | none | MATH-006, MATH-017 |
| 770 | `math.cx.cauchy-integral-formula` | Cauchy Integral Formula | A9 (22t, needs-review) | none | MATH-001, MATH-017, MATH-018 |
| 771 | `math.cx.higher-derivatives` | Derivatives of Holomorphic Functions | A9 (13t, needs-review) | none | MATH-003, MATH-009, MATH-017 |
| 772 | `math.cx.morera-theorem` | Morera's Theorem | A9 (9t, mastered) | none | MATH-003 |
| 773 | `math.cx.liouville-theorem` | Liouville's Theorem | A9 (11t, mastered) | none | — |
| 774 | `math.cx.fundamental-theorem-algebra` | Fundamental Theorem of Algebra (Complex Analysis) | A9 (23t, needs-review) | yes | MATH-001, MATH-002, MATH-011, MATH-017, MATH-018, MATH-019, MATH-023 |
| 775 | `math.cx.identity-theorem` | Identity Theorem | **not covered** | — | — |
| 776 | `math.cx.analytic-continuation` | Analytic Continuation | **not covered** | — | — |
| 777 | `math.cx.singularities` | Singularities | **not covered** | — | — |
| 778 | `math.cx.poles` | Poles and Meromorphic Functions | **not covered** | — | — |
| 779 | `math.cx.essential-singularity` | Essential Singularity | **not covered** | — | — |
| 780 | `math.cx.laurent-series` | Laurent Series | **not covered** | — | — |
| 781 | `math.cx.residue` | Residue | **not covered** | — | — |
| 782 | `math.cx.residue-theorem` | Residue Theorem | **not covered** | — | — |
| 783 | `math.cx.real-integral-residues` | Evaluating Real Integrals via Residues | **not covered** | — | — |
| 784 | `math.cx.maximum-modulus` | Maximum Modulus Principle | **not covered** | — | — |
| 785 | `math.cx.conformal-mapping` | Conformal Mapping | **not covered** | — | — |
| 786 | `math.cx.mobius-transformation` | Möbius Transformation | **not covered** | — | — |
| 787 | `math.cx.riemann-mapping` | Riemann Mapping Theorem | **not covered** | — | — |
| 788 | `math.cx.argument-principle` | Argument Principle | **not covered** | — | — |
| 789 | `math.cx.rouche-theorem` | Rouché's Theorem | **not covered** | — | — |
| 790 | `math.cx.riemann-surface` | Riemann Surface | **not covered** | — | — |
| 791 | `math.cx.riemann-zeta` | Riemann Zeta Function | **not covered** | — | — |
| 792 | `math.top.topological-space` | Topological Space | **not covered** | — | — |
| 793 | `math.top.open-sets` | Open and Closed Sets (Topology) | **not covered** | — | — |
| 794 | `math.top.interior-closure` | Interior, Closure, and Boundary | **not covered** | — | — |
| 795 | `math.top.basis` | Basis for a Topology | **not covered** | — | — |
| 796 | `math.top.continuity-top` | Continuity (Topology) | **not covered** | — | — |
| 797 | `math.top.homeomorphism` | Homeomorphism | **not covered** | — | — |
| 798 | `math.top.compactness` | Compactness (Topology) | **not covered** | — | — |
| 799 | `math.top.tychonoff` | Tychonoff's Theorem | **not covered** | — | — |
| 800 | `math.top.connectedness` | Connectedness (Topology) | **not covered** | — | — |
| 801 | `math.top.separation-axioms` | Separation Axioms | **not covered** | — | — |
| 802 | `math.top.quotient-space` | Quotient Space | **not covered** | — | — |
| 803 | `math.top.product-space` | Product Topology | **not covered** | — | — |
| 804 | `math.top.homotopy` | Homotopy | **not covered** | — | — |
| 805 | `math.top.homotopy-equivalence` | Homotopy Equivalence | **not covered** | — | — |
| 806 | `math.top.fundamental-group` | Fundamental Group | **not covered** | — | — |
| 807 | `math.top.van-kampen` | Seifert-van Kampen Theorem | **not covered** | — | — |
| 808 | `math.top.covering-space` | Covering Space | **not covered** | — | — |
| 809 | `math.top.simplicial-complex` | Simplicial Complex | **not covered** | — | — |
| 810 | `math.top.homology` | Homology | **not covered** | — | — |
| 811 | `math.top.euler-characteristic` | Euler Characteristic | **not covered** | — | — |
| 812 | `math.top.cohomology` | Cohomology | **not covered** | — | — |
| 813 | `math.top.manifold` | Topological Manifold | **not covered** | — | — |
| 814 | `math.top.smooth-manifold` | Smooth Manifold | **not covered** | — | — |
| 815 | `math.meas.sigma-algebra` | σ-Algebra | **not covered** | — | — |
| 816 | `math.meas.measure` | Measure | **not covered** | — | — |
| 817 | `math.meas.lebesgue-measure` | Lebesgue Measure | **not covered** | — | — |
| 818 | `math.meas.measure-zero` | Measure Zero | **not covered** | — | — |
| 819 | `math.meas.measurable-function` | Measurable Function | **not covered** | — | — |
| 820 | `math.meas.simple-function` | Simple Function | A10 (30t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-004, MATH-005, MATH-009, MATH-013, MATH-016, MATH-017, MATH-018 |
| 821 | `math.meas.lebesgue-integral` | Lebesgue Integral | A10 (20t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-013, MATH-017 |
| 822 | `math.meas.convergence-theorems` | Convergence Theorems | A10 (25t, mastered) | yes | MATH-002, MATH-003, MATH-006, MATH-009, MATH-013, MATH-016, MATH-017, MATH-028 |
| 823 | `math.meas.lp-space` | Lᵖ Spaces | A10 (7t, mastered) | none | — |
| 824 | `math.meas.l2-space` | L² Space | A10 (22t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 825 | `math.meas.product-measure` | Product Measure and Fubini's Theorem | A10 (17t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017, MATH-018 |
| 826 | `math.meas.radon-nikodym` | Radon-Nikodym Theorem | A10 (26t, needs-review) | none | MATH-001, MATH-002, MATH-004, MATH-006, MATH-016, MATH-017, MATH-018, MATH-023 |
| 827 | `math.meas.abstract-measure-spaces` | Abstract Measure Spaces | A10 (24t, mastered) | none | MATH-003, MATH-006, MATH-017, MATH-018 |
| 828 | `math.fnal.normed-space` | Normed Space | A10 (27t, needs-review) | none | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018 |
| 829 | `math.fnal.completeness` | Completeness | A10 (28t, mastered) | none | MATH-003, MATH-006, MATH-017, MATH-018, MATH-023 |
| 830 | `math.fnal.banach-space` | Banach Space | A10 (9t, mastered) | none | MATH-003 |
| 831 | `math.fnal.hilbert-space` | Hilbert Space | A10 (22t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017, MATH-018 |
| 832 | `math.fnal.bounded-operator` | Bounded Linear Operator | A10 (15t, mastered) | none | MATH-003 |
| 833 | `math.fnal.dual-space-functional` | Dual Space | A10 (20t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-018, MATH-023 |
| 834 | `math.fnal.hahn-banach` | Hahn-Banach Theorem | A10 (25t, mastered) | none | MATH-002, MATH-003, MATH-006, MATH-017 |
| 835 | `math.fnal.open-mapping-theorem` | Open Mapping Theorem | A10 (29t, needs-review) | none | MATH-003, MATH-017, MATH-018 |
| 836 | `math.fnal.closed-graph-theorem` | Closed Graph Theorem | A10 (27t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017, MATH-018, MATH-023 |
| 837 | `math.fnal.uniform-boundedness` | Uniform Boundedness Principle | A10 (10t, needs-review) | none | MATH-001, MATH-006 |
| 838 | `math.fnal.riesz-representation` | Riesz Representation Theorem | A10 (29t, needs-review) | none | MATH-003, MATH-006, MATH-017, MATH-023 |
| 839 | `math.fnal.spectral-theory` | Spectral Theory | A10 (20t, mastered) | none | MATH-003 |
| 840 | `math.fnal.compact-operator-spectrum` | Compact Operators | A10 (17t, mastered) | none | MATH-002, MATH-003, MATH-017 |
| 841 | `math.fnal.fourier-transform` | Fourier Transform (Functional Analysis) | A10 (7t, mastered) | none | — |
| 842 | `math.fnal.distributions` | Distributions | A10 (25t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017 |
| 843 | `math.fnal.special-functions` | Special Functions | A10 (23t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-009, MATH-017, MATH-028 |
| 844 | `math.fnal.dense-subspace` | Dense Subspaces and Approximation | A10 (15t, mastered) | none | MATH-003, MATH-006 |
| 845 | `math.fnal.convolution` | Convolution | A10 (8t, mastered) | none | MATH-006 |
| 846 | `math.num.floating-point` | Floating-Point Arithmetic | A10 (19t, mastered) | none | MATH-003, MATH-017 |
| 847 | `math.num.error-analysis` | Error Analysis | A10 (10t, mastered) | none | — |
| 848 | `math.num.root-finding` | Root-Finding Methods | A10 (20t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 849 | `math.num.newtons-method` | Newton's Method | A10 (18t, mastered) | none | MATH-006, MATH-017 |
| 850 | `math.num.interpolation` | Polynomial Interpolation | A10 (15t, mastered) | none | MATH-002, MATH-003, MATH-009 |
| 851 | `math.num.splines` | Spline Interpolation | A10 (12t, mastered) | none | MATH-006, MATH-009 |
| 852 | `math.num.numerical-differentiation` | Numerical Differentiation | A10 (11t, mastered) | none | MATH-002, MATH-003, MATH-006 |
| 853 | `math.num.numerical-integration` | Numerical Integration | A10 (24t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-006, MATH-017 |
| 854 | `math.num.lu-factorization` | LU Factorization (Numerical) | A10 (24t, mastered) | none | MATH-002, MATH-003, MATH-017 |
| 855 | `math.num.cholesky` | Cholesky Factorization (Numerical) | A10 (21t, needs-review) | none | MATH-002, MATH-006, MATH-017 |
| 856 | `math.num.iterative-linear` | Iterative Methods for Linear Systems | A10 (25t, mastered) | none | MATH-003, MATH-015, MATH-017 |
| 857 | `math.num.qr-algorithm` | QR Algorithm | A10 (31t, needs-review) | none | MATH-001, MATH-003, MATH-006, MATH-015, MATH-017, MATH-018 |
| 858 | `math.num.svd` | SVD (Numerical) | A10 (21t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 859 | `math.num.euler-method` | Euler's Method (Numerical ODE) | A10 (21t, needs-review) | none | MATH-001, MATH-003, MATH-023 |
| 860 | `math.num.runge-kutta` | Runge-Kutta Methods | A10 (18t, needs-review) | none | MATH-001, MATH-003, MATH-017 |
| 861 | `math.num.stiff-ode` | Stiff ODEs and Implicit Methods | A10 (11t, mastered) | none | MATH-002 |
| 862 | `math.opt.unconstrained-optimization` | Unconstrained Optimization | A10 (13t, mastered) | none | MATH-002, MATH-003, MATH-017 |
| 863 | `math.opt.convex-function` | Convex Function | A10 (31t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-015, MATH-017, MATH-018, MATH-028 |
| 864 | `math.opt.convex-set` | Convex Set | A10 (9t, needs-review) | none | MATH-003 |
| 865 | `math.opt.convex-optimization` | Convex Optimization | **not covered** | — | — |
| 866 | `math.opt.linear-programming` | Linear Programming | **not covered** | — | — |
| 867 | `math.opt.quadratic-programming` | Quadratic Programming | **not covered** | — | — |
| 868 | `math.opt.semidefinite-programming` | Semidefinite Programming | **not covered** | — | — |
| 869 | `math.opt.duality` | Duality Theory | **not covered** | — | — |
| 870 | `math.opt.kkt` | KKT Conditions | **not covered** | — | — |
| 871 | `math.opt.lagrange-multipliers` | Lagrange Multipliers | **not covered** | — | — |
| 872 | `math.opt.gradient-methods` | Gradient Descent | **not covered** | — | — |
| 873 | `math.opt.stochastic-gradient` | Stochastic Gradient Descent | **not covered** | — | — |
| 874 | `math.opt.newton-optimization` | Newton's Method for Optimization | **not covered** | — | — |
| 875 | `math.opt.pca` | Principal Component Analysis | **not covered** | — | — |
| 876 | `math.opt.integer-programming` | Integer Programming | **not covered** | — | — |
| 877 | `math.opt.dynamic-programming` | Dynamic Programming | **not covered** | — | — |
| 878 | `math.graph.graph` | Graph | **not covered** | — | — |
| 879 | `math.graph.graph-invariants` | Graph Invariants | **not covered** | — | — |
| 880 | `math.graph.graph-operations` | Graph Operations | **not covered** | — | — |
| 881 | `math.graph.connectivity` | Connectivity | **not covered** | — | — |
| 882 | `math.graph.tree` | Tree | **not covered** | — | — |
| 883 | `math.graph.minimum-spanning-tree` | Minimum Spanning Tree | **not covered** | — | — |
| 884 | `math.graph.shortest-path` | Shortest Path Algorithms | **not covered** | — | — |
| 885 | `math.graph.maximum-flow` | Maximum Flow | **not covered** | — | — |
| 886 | `math.graph.matching` | Matching | **not covered** | — | — |
| 887 | `math.graph.eulerian-circuit` | Eulerian Circuit | **not covered** | — | — |
| 888 | `math.graph.hamiltonian-cycle` | Hamiltonian Cycle | **not covered** | — | — |
| 889 | `math.graph.graph-coloring` | Graph Coloring | **not covered** | — | — |
| 890 | `math.graph.algebraic-graph-theory` | Algebraic Graph Theory | **not covered** | — | — |
| 891 | `math.graph.ramsey-theory` | Ramsey Theory | **not covered** | — | — |
| 892 | `math.graph.extremal-graph-theory` | Extremal Graph Theory | **not covered** | — | — |
| 893 | `math.graph.random-graph` | Random Graphs | **not covered** | — | — |
| 894 | `math.cat.category` | Category | **not covered** | — | — |
| 895 | `math.cat.morphism-types` | Types of Morphisms | **not covered** | — | — |
| 896 | `math.cat.functor` | Functor | **not covered** | — | — |
| 897 | `math.cat.natural-transformation` | Natural Transformation | **not covered** | — | — |
| 898 | `math.cat.functor-category` | Functor Category | **not covered** | — | — |
| 899 | `math.cat.yoneda-lemma` | Yoneda Lemma | **not covered** | — | — |
| 900 | `math.cat.representable-functor` | Representable Functor | **not covered** | — | — |
| 901 | `math.cat.limits` | Limits and Colimits | **not covered** | — | — |
| 902 | `math.cat.equalizer` | Equalizer and Coequalizer | **not covered** | — | — |
| 903 | `math.cat.pullback` | Pullback and Pushout | **not covered** | — | — |
| 904 | `math.cat.adjunction` | Adjunction | **not covered** | — | — |
| 905 | `math.cat.monad` | Monad | **not covered** | — | — |
| 906 | `math.cat.tensor-product` | Tensor Product (Categorical) | **not covered** | — | — |
| 907 | `math.cat.topos` | Topos | **not covered** | — | — |
| 908 | `math.cat.higher-category` | Higher Category Theory | **not covered** | — | — |


## Not counted as defects

- Learning difficulty: advanced analysis/algebra lessons were hard for a weak-English persona; that is not a defect.
- Persona artefacts: scripted quotations of taught text as "answers" (including upper-case quotes) were sometimes praised.
- Replies that start a correction without the stock "Not quite/That's right" words but still say the answer was wrong or right.
