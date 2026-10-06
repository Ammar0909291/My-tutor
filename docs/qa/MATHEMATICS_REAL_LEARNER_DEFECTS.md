# Mathematics Real-Learner Defects

<!-- SUMMARY:START -->
## Summary (generated from the entries below; counts verified automatically)

- Total lessons in Mathematics curriculum (`/api/curriculum?subject=mathematics`): 908
- Total lessons studied (full lesson session driven, ≥3 turns): 93
- Total lessons covered (≥1 account): 93  (10.2 %)
- Total defects: 24
- P0: 0
- P1: 2
- P2: 17
- P3: 5
- Open: 24
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
- Also observed (42 occurrences in 42 lessons): #2 (A1) t22; #6 (A1) t22; #7 (A1) t13; #8 (A1) t18; #9 (A1) t24; #820 (A10) t29; #821 (A10) t19; #824 (A10) t21; #825 (A10) t16; #826 (A10) t23; #92 (A2) t18; #93 (A2) t22; #98 (A2) t23; #183 (A3) t14; #276 (A4) t26; #277 (A4) t13; #278 (A4) t24; #280 (A4) t14; #281 (A4) t17; #282 (A4) t26; #283 (A4) t13; #368 (A5) t18; #369 (A5) t13; #370 (A5) t25; #457 (A6) t21; #459 (A6) t19; #462 (A6) t20; #463 (A6) t24; #464 (A6) t22; #548 (A7) t7; #549 (A7) t15; #552 (A7) t19; #553 (A7) t23; #554 (A7) t29; #557 (A7) t22; #639 (A8) t18; #642 (A8) t28; #733 (A9) t22; #734 (A9) t19; #735 (A9) t22; #736 (A9) t28; #737 (A9) t23
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
- Also observed (54 occurrences in 39 lessons): #94 (A2) t12/t9; #6 (A1) t9/t20; #1 (A1) t4; #4 (A1) t4; #5 (A1) t5; #9 (A1) t11; #820 (A10) t9; #821 (A10) t4/t7/t10/t13; #822 (A10) t16; #824 (A10) t6; #825 (A10) t4; #826 (A10) t3/t9; #93 (A2) t11; #184 (A3) t3; #187 (A3) t11/t16/t24; #189 (A3) t4/t14; #190 (A3) t10; #275 (A4) t3; #276 (A4) t5; #278 (A4) t5/t21; #280 (A4) t3; #282 (A4) t24; #370 (A5) t12; #372 (A5) t5/t10; #374 (A5) t7; #456 (A6) t4; #458 (A6) t9; #459 (A6) t11; #462 (A6) t8; #464 (A6) t6; #547 (A7) t4; #549 (A7) t3; #553 (A7) t5; #639 (A8) t15; #640 (A8) t4; #643 (A8) t12; #646 (A8) t6/t15; #731 (A9) t10/t17; #733 (A9) t20
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
- Also observed (120 occurrences in 51 lessons): #1 (A1) t24.5; #3 (A1) t7/t8.5; #4 (A1) t21/t22.5; #7 (A1) t7/t8; #820 (A10) t26; #822 (A10) t21/t22.5; #825 (A10) t11/t12; #827 (A10) t21/t22/t23.5; #92 (A2) t9/t10; #94 (A2) t27/t28; #96 (A2) t24/t25/t26.5; #97 (A2) t21/t24/t25/t26; #98 (A2) t18/t19; #184 (A3) t22/t23/t24/t25.5; #185 (A3) t12.5; #187 (A3) t29/t30; #189 (A3) t26; #190 (A3) t19/t20/t21/t22.5; #275 (A4) t10/t11.5; #276 (A4) t15/t19/t22/t23; #277 (A4) t7/t8; #279 (A4) t17.5; #280 (A4) t11/t12; #281 (A4) t11/t12/t13; #283 (A4) t9/t10; #366 (A5) t8; #367 (A5) t18/t19/t20.5; #368 (A5) t8/t9/t12; #370 (A5) t19/t20/t21; #371 (A5) t10/t11; #373 (A5) t13/t14/t18/t23; #457 (A6) t11/t12/t13/t14; #458 (A6) t16.5; #460 (A6) t21/t26/t27/t28/t29; #461 (A6) t7/t8.5; #465 (A6) t9.5; #547 (A7) t12/t13.5; #549 (A7) t10/t11; #550 (A7) t17; #553 (A7) t17/t18/t19; #554 (A7) t24; #556 (A7) t18.5; #642 (A8) t22/t23/t24/t25; #643 (A8) t22/t23/t24/t25.5; #647 (A8) t24/t30; #729 (A9) t11/t12.5; #730 (A9) t13/t14/t15.5; #731 (A9) t22/t23/t24.5; #732 (A9) t9/t10.5; #734 (A9) t10; #736 (A9) t18/t19/t20/t21
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

### MATH-005 — "show me step by step" is answered with a new question instead of steps

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-06 07:41 UTC
- Account: Account 10
- Mathematics concept: `math.meas.simple-function`
- Lesson/order: #820
- Learner message: show me step by step
- Tutor response: "Which term in the expression \(4\cdot\mathbf 1_{[0,2)} + 1\cdot\mathbf 1_{[2,4)} + 0\cdot\mathbf 1_{[4,5]}\) corresponds to the interval \([2,4)\)?"
- Expected behaviour: A numbered worked example, as in other lessons.
- Actual behaviour: A counter-question about a term.
- Why it is a defect: The learner asked to be shown, and is quizzed instead.
- Reproducibility: Seen in lesson 820 turn 11.
- Also observed (2 occurrences in 2 lessons): #820 (A10) t11; #97 (A2) t6
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
- Also observed (120 occurrences in 49 lessons): #5 (A1) t7; #7 (A1) t11/t12; #8 (A1) t16/t17; #9 (A1) t15/t18/t20; #821 (A10) t1; #822 (A10) t14/t18; #824 (A10) t3; #826 (A10) t11/t12/t19/t21; #827 (A10) t1/t10/t12; #93 (A2) t5; #94 (A2) t30; #97 (A2) t21/t29; #98 (A2) t5/t6/t9/t10/t15; #186 (A3) t5; #187 (A3) t1/t2/t13/t14/t17; #189 (A3) t11/t30; #191 (A3) t1/t3/t5; #276 (A4) t25/t26; #277 (A4) t11; #278 (A4) t1/t3/t9/t22; #279 (A4) t3; #281 (A4) t7; #282 (A4) t1/t2/t6/t7/t14/t21; #283 (A4) t12; #368 (A5) t16; #369 (A5) t2; #372 (A5) t17; #373 (A5) t17/t25; #460 (A6) t14/t19; #463 (A6) t2/t3/t8/t11/t12/t22; #464 (A6) t18/t21; #465 (A6) t2; #549 (A7) t5; #552 (A7) t6/t15; #554 (A7) t17/t27; #556 (A7) t2/t6/t10/t11; #557 (A7) t1/t14/t15; #639 (A8) t9; #640 (A8) t2/t15; #642 (A8) t8/t11/t14/t18/t20; #643 (A8) t15; #646 (A8) t2/t13; #647 (A8) t4/t12/t13/t21; #730 (A9) t4/t7; #731 (A9) t15; #733 (A9) t9/t18; #735 (A9) t17; #736 (A9) t4/t14/t23; #737 (A9) t7/t11/t12/t15/t16/t17/t21
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
- Also observed (15 occurrences in 14 lessons): #732 (A9) t1; #278 (A4) t1; #279 (A1) t1; #8 (A1) t1; #820 (A10) t1; #822 (A10) t1; #97 (A2) t1; #185 (A3) t1; #279 (A4) t1; #281 (A4) t1; #283 (A4) t1; #462 (A6) t1; #647 (A8) t1; #735 (A9) t1
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
- Also observed (10 occurrences in 9 lessons): #278 (A4) t16/t-; #274 (A4) t-; #275 (A4) t-; #276 (A4) t-; #277 (A4) t-; #279 (A4) t-; #280 (A4) t-; #282 (A4) t-; #283 (A4) t-
- Notes on occurrences: #278 t16: Lesson Coordinate Plane: "i dont understand this picture" is answered by describing triangle/square/rectangle/circle/pentagon/hexagon labels — the Geometry Shapes card is the only figure
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
- Also observed (17 occurrences in 16 lessons): #641 (A8) t1/t-; #183 (A3) t-; #185 (A3) t-; #186 (A3) t-; #188 (A3) t-; #190 (A3) t-; #191 (A3) t-; #638 (A8) t-; #639 (A8) t-; #640 (A8) t-; #642 (A8) t-; #643 (A8) t-; #644 (A8) t-; #645 (A8) t-; #646 (A8) t-; #647 (A8) t-
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
- Also observed (5 occurrences in 5 lessons): #92 (A2) t-; #93 (A2) t-; #94 (A2) t-; #95 (A2) t-; #735 (A9) t-
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
- Also observed (14 occurrences in 14 lessons): #1 (A1) t-; #2 (A1) t-; #3 (A1) t-; #4 (A1) t-; #6 (A1) t-; #820 (A10) t-; #821 (A10) t-; #822 (A10) t-; #456 (A6) t-; #457 (A6) t-; #458 (A6) t-; #460 (A6) t-; #547 (A7) t-; #548 (A7) t-
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
- Also observed (5 occurrences in 5 lessons): #457 (A6) t10; #464 (A6) t14; #549 (A7) t14; #554 (A7) t15; #557 (A7) t21
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
- Also observed (7 occurrences in 7 lessons): #4 (A1) t2; #5 (A1) t2; #820 (A10) t12; #822 (A10) t11; #826 (A10) t7; #276 (A4) t2; #638 (A8) t5
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
- Also observed (127 occurrences in 70 lessons): #1 (A1) t2/t15/t16; #2 (A1) t15; #4 (A1) t2/t8; #5 (A1) t2; #6 (A1) t12/t21; #8 (A1) t6/t12; #9 (A1) t12/t14; #820 (A10) t3/t12/t20; #821 (A10) t16; #822 (A10) t2/t11; #824 (A10) t16; #825 (A10) t15; #826 (A10) t7/t13; #827 (A10) t2/t14; #92 (A2) t2/t16; #93 (A2) t4/t9/t17; #94 (A2) t4; #96 (A2) t9/t18; #97 (A2) t2/t30; #98 (A2) t12/t22; #183 (A3) t3; #184 (A3) t12/t20; #185 (A3) t3; #187 (A3) t2/t14/t19/t27; #189 (A3) t12/t19/t24/t29; #190 (A3) t13; #274 (A4) t5/t7; #276 (A4) t2/t8; #277 (A4) t12; #278 (A4) t10/t11/t16; #279 (A4) t4/t12; #281 (A4) t16; #282 (A4) t2/t17; #283 (A4) t12; #367 (A5) t7/t15; #370 (A5) t3/t9; #371 (A5) t2; #372 (A5) t12; #373 (A5) t3/t26; #374 (A5) t12/t16; #456 (A6) t2; #457 (A6) t18; #458 (A6) t6/t7; #459 (A6) t9/t16; #460 (A6) t2/t3/t23; #462 (A6) t2/t10; #463 (A6) t15/t22; #464 (A6) t4/t13/t20; #547 (A7) t2; #550 (A7) t16; #552 (A7) t7; #553 (A7) t8; #554 (A7) t11; #556 (A7) t7/t8; #557 (A7) t9; #638 (A8) t5; #639 (A8) t6; #640 (A8) t7/t11/t19; #642 (A8) t3/t4; #643 (A8) t7; #645 (A8) t4/t7/t14/t16; #646 (A8) t7/t12/t19; #647 (A8) t7/t14/t27; #729 (A9) t4; #730 (A9) t3; #731 (A9) t2/t3/t8; #733 (A9) t15; #735 (A9) t12; #736 (A9) t9/t15; #737 (A9) t12/t20
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
- Also observed (29 occurrences in 29 lessons): #1 (A1) t-; #2 (A1) t-; #6 (A1) t-; #9 (A1) t-; #820 (A10) t-; #825 (A10) t-; #826 (A10) t-; #827 (A10) t-; #93 (A2) t-; #94 (A2) t-; #96 (A2) t-; #97 (A2) t-; #187 (A3) t-; #189 (A3) t-; #276 (A4) t-; #278 (A4) t-; #370 (A5) t-; #373 (A5) t-; #374 (A5) t-; #457 (A6) t-; #459 (A6) t-; #462 (A6) t-; #553 (A7) t-; #554 (A7) t-; #639 (A8) t-; #640 (A8) t-; #731 (A9) t-; #733 (A9) t-; #735 (A9) t-
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
- Also observed (2 occurrences in 2 lessons): #460 (A6) t24; #735 (A9) t21
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
- Also observed (3 occurrences in 3 lessons): #7 (A1) t11; #552 (A7) t13; #557 (A7) t15
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
- Also observed (2 occurrences in 2 lessons): #1 (A1) t15; #552 (A7) t14
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
- Also observed (1 occurrence in 1 lesson): #464 (A6) t14
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
- Also observed (4 occurrences in 4 lessons): #370 (A5) t8; #372 (A5) t10; #463 (A6) t13; #734 (A9) t17
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

## Systemic observations (counts computed from the transcripts)

Computed over 93 lesson transcripts (1729 learner turns, one reply each; degraded retries included as separate replies):

- Reply provider: groq 1445 (84 %), memory 56 (3 %), degraded 181 (10 %), gate 47 (3 %).
- Cards (mcq) shown: 584; options per card: 2 options 23, 3 options 319, 4 options 242.
- Lesson close: 36 closed as "mastered", 52 as "needs review" (59 % of closed lessons ended on a pause, MATH-001).
- Lessons with a figure: 52 of 93; with no figure on any turn: 41.
- Per account (lessons / learner turns / mastered / needs-review): A1 9/177/4/5 · A2 7/163/2/3 · A3 9/167/5/2 · A4 10/186/2/8 · A5 10/183/3/7 · A6 10/193/5/5 · A7 11/194/4/7 · A8 10/196/4/5 · A9 9/187/4/5 · A10 8/171/3/5.


## Concurrency and isolation tests

_Not yet run — scheduled after the main run (same-account parallel sessions, cross-account marker test)._

## Coverage by lesson

Result per account in brackets: turns driven, and how the lesson closed (mastered / needs-review = "Let's pause … worth another look later").
"figure none" means no figure channel was returned on any turn.

| # | concept | lesson | accounts (turns, result) | figure | defects referencing |
|---|---|---|---|---|---|
| 1 | `math.found.mathematical-thinking` | Mathematical Thinking | A1 (25t, mastered) | yes | MATH-002, MATH-003, MATH-013, MATH-017, MATH-018, MATH-021 |
| 2 | `math.found.abstraction` | Abstraction | A1 (23t, needs-review) | yes | MATH-001, MATH-013, MATH-017, MATH-018 |
| 3 | `math.found.pattern-recognition` | Pattern Recognition | A1 (9t, mastered) | yes | MATH-003, MATH-013 |
| 4 | `math.found.problem-solving` | Mathematical Problem Solving | A1 (23t, mastered) | yes | MATH-002, MATH-003, MATH-013, MATH-016, MATH-017 |
| 5 | `math.found.problem-solving-strategies` | Problem-Solving Strategies | A1 (13t, mastered) | none | MATH-002, MATH-006, MATH-016, MATH-017 |
| 6 | `math.found.mathematical-modeling` | Mathematical Modeling | A1 (23t, needs-review) | yes | MATH-001, MATH-002, MATH-013, MATH-017, MATH-018 |
| 7 | `math.found.generalization` | Generalization | A1 (15t, needs-review) | none | MATH-001, MATH-003, MATH-006, MATH-020 |
| 8 | `math.found.mathematical-language` | Mathematical Language | A1 (21t, needs-review) | none | MATH-001, MATH-006, MATH-009, MATH-017 |
| 9 | `math.found.mathematical-notation` | Mathematical Notation | A1 (25t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017, MATH-018 |
| 10 | `math.found.variable` | Variable | **not covered** | — | — |
| 11 | `math.found.mathematical-symbols` | Mathematical Symbols | **not covered** | — | — |
| 12 | `math.found.reading-mathematics` | Reading Mathematics | **not covered** | — | — |
| 13 | `math.found.logic` | Mathematical Logic | **not covered** | — | — |
| 14 | `math.found.proposition` | Proposition | **not covered** | — | — |
| 15 | `math.found.logical-connectives` | Logical Connectives | **not covered** | — | — |
| 16 | `math.found.truth-table` | Truth Table | **not covered** | — | — |
| 17 | `math.found.predicate-logic` | Predicate Logic | **not covered** | — | — |
| 18 | `math.found.predicate` | Predicate | **not covered** | — | — |
| 19 | `math.found.quantifiers` | Quantifiers | **not covered** | — | — |
| 20 | `math.found.logical-equivalence` | Logical Equivalence | **not covered** | — | — |
| 21 | `math.found.rules-of-inference` | Rules of Inference | **not covered** | — | — |
| 22 | `math.found.proof` | Mathematical Proof | **not covered** | — | — |
| 23 | `math.found.direct-proof` | Direct Proof | **not covered** | — | — |
| 24 | `math.found.proof-by-contradiction` | Proof by Contradiction | **not covered** | — | — |
| 25 | `math.found.proof-by-contrapositive` | Proof by Contrapositive | **not covered** | — | — |
| 26 | `math.found.proof-by-induction` | Mathematical Induction | **not covered** | — | — |
| 27 | `math.found.strong-induction` | Strong Induction | **not covered** | — | — |
| 28 | `math.found.well-ordering-principle` | Well-Ordering Principle | **not covered** | — | — |
| 29 | `math.found.proof-by-cases` | Proof by Cases | **not covered** | — | — |
| 30 | `math.found.existence-proof` | Existence Proof | **not covered** | — | — |
| 31 | `math.found.uniqueness-proof` | Uniqueness Proof | **not covered** | — | — |
| 32 | `math.found.writing-mathematics` | Writing Mathematics | **not covered** | — | — |
| 33 | `math.found.axiom` | Axiom | **not covered** | — | — |
| 34 | `math.found.theorem` | Theorem | **not covered** | — | — |
| 35 | `math.found.lemma` | Lemma | **not covered** | — | — |
| 36 | `math.found.corollary` | Corollary | **not covered** | — | — |
| 37 | `math.found.conjecture` | Conjecture | **not covered** | — | — |
| 38 | `math.found.definition` | Mathematical Definition | **not covered** | — | — |
| 39 | `math.found.axiomatic-system` | Axiomatic System | **not covered** | — | — |
| 40 | `math.found.set-theory` | Set Theory | **not covered** | — | — |
| 41 | `math.found.set` | Set | **not covered** | — | — |
| 42 | `math.found.set-membership` | Set Membership | **not covered** | — | — |
| 43 | `math.found.empty-set` | Empty Set | **not covered** | — | — |
| 44 | `math.found.set-builder-notation` | Set-Builder Notation | **not covered** | — | — |
| 45 | `math.found.subset` | Subset | **not covered** | — | — |
| 46 | `math.found.proper-subset` | Proper Subset | **not covered** | — | — |
| 47 | `math.found.set-equality` | Set Equality | **not covered** | — | — |
| 48 | `math.found.set-operations` | Set Operations | **not covered** | — | — |
| 49 | `math.found.union` | Union | **not covered** | — | — |
| 50 | `math.found.intersection` | Intersection | **not covered** | — | — |
| 51 | `math.found.set-difference` | Set Difference | **not covered** | — | — |
| 52 | `math.found.complement` | Set Complement | **not covered** | — | — |
| 53 | `math.found.venn-diagram` | Venn Diagram | **not covered** | — | — |
| 54 | `math.found.power-set` | Power Set | **not covered** | — | — |
| 55 | `math.found.cartesian-product` | Cartesian Product | **not covered** | — | — |
| 56 | `math.found.ordered-pair` | Ordered Pair | **not covered** | — | — |
| 57 | `math.found.relation` | Relation | **not covered** | — | — |
| 58 | `math.found.reflexive-relation` | Reflexive Relation | **not covered** | — | — |
| 59 | `math.found.symmetric-relation` | Symmetric Relation | **not covered** | — | — |
| 60 | `math.found.transitive-relation` | Transitive Relation | **not covered** | — | — |
| 61 | `math.found.equivalence-relation` | Equivalence Relation | **not covered** | — | — |
| 62 | `math.found.equivalence-class` | Equivalence Class | **not covered** | — | — |
| 63 | `math.found.partition` | Partition | **not covered** | — | — |
| 64 | `math.found.partial-order` | Partial Order | **not covered** | — | — |
| 65 | `math.found.total-order` | Total Order | **not covered** | — | — |
| 66 | `math.found.hasse-diagram` | Hasse Diagram | **not covered** | — | — |
| 67 | `math.found.function-set-theoretic` | Function (Set-Theoretic) | **not covered** | — | — |
| 68 | `math.found.cardinality` | Cardinality | **not covered** | — | — |
| 69 | `math.found.finite-set` | Finite Set | **not covered** | — | — |
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
| 97 | `math.arith.number-line` | Number Line | A2 (30t, no-complete) | yes | MATH-003, MATH-005, MATH-006, MATH-009, MATH-017, MATH-018 |
| 98 | `math.arith.ordering` | Ordering Numbers | A2 (27t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-017 |
| 99 | `math.arith.absolute-value` | Absolute Value | **not covered** | — | — |
| 100 | `math.arith.integer-arithmetic` | Integer Arithmetic | **not covered** | — | — |
| 101 | `math.arith.multiplication` | Multiplication | **not covered** | — | — |
| 102 | `math.arith.multiplication-table` | Multiplication Table | **not covered** | — | — |
| 103 | `math.arith.long-multiplication` | Long Multiplication | **not covered** | — | — |
| 104 | `math.arith.mental-multiplication` | Mental Multiplication | **not covered** | — | — |
| 105 | `math.arith.division` | Division | **not covered** | — | — |
| 106 | `math.arith.long-division` | Long Division | **not covered** | — | — |
| 107 | `math.arith.remainder` | Remainder | **not covered** | — | — |
| 108 | `math.arith.divisor-dividend` | Divisor and Dividend | **not covered** | — | — |
| 109 | `math.arith.order-of-operations` | Order of Operations | **not covered** | — | — |
| 110 | `math.arith.fractions` | Fractions | **not covered** | — | — |
| 111 | `math.arith.fraction-equivalence` | Equivalent Fractions | **not covered** | — | — |
| 112 | `math.arith.fraction-simplification` | Fraction Simplification | **not covered** | — | — |
| 113 | `math.arith.fraction-addition` | Addition and Subtraction of Fractions | **not covered** | — | — |
| 114 | `math.arith.fraction-multiplication` | Multiplication and Division of Fractions | **not covered** | — | — |
| 115 | `math.arith.fraction-reciprocal` | Reciprocal | **not covered** | — | — |
| 116 | `math.arith.mixed-numbers` | Mixed Numbers | **not covered** | — | — |
| 117 | `math.arith.improper-fractions` | Improper Fractions | **not covered** | — | — |
| 118 | `math.arith.decimals` | Decimals | **not covered** | — | — |
| 119 | `math.arith.decimal-operations` | Decimal Operations | **not covered** | — | — |
| 120 | `math.arith.terminating-decimals` | Terminating Decimals | **not covered** | — | — |
| 121 | `math.arith.repeating-decimals` | Repeating Decimals | **not covered** | — | — |
| 122 | `math.arith.percentages` | Percentages | **not covered** | — | — |
| 123 | `math.arith.percentage-calculations` | Percentage Calculations | **not covered** | — | — |
| 124 | `math.arith.percentage-change` | Percentage Change | **not covered** | — | — |
| 125 | `math.arith.ratios` | Ratio | **not covered** | — | — |
| 126 | `math.arith.proportion` | Proportion | **not covered** | — | — |
| 127 | `math.arith.unit-rate` | Unit Rate | **not covered** | — | — |
| 128 | `math.arith.direct-variation` | Direct Variation | **not covered** | — | — |
| 129 | `math.arith.inverse-variation` | Inverse Variation | **not covered** | — | — |
| 130 | `math.arith.rounding` | Rounding | **not covered** | — | — |
| 131 | `math.arith.estimation` | Estimation | **not covered** | — | — |
| 132 | `math.arith.significant-figures` | Significant Figures | **not covered** | — | — |
| 133 | `math.arith.exponentiation` | Exponentiation | **not covered** | — | — |
| 134 | `math.arith.exponent-rules` | Exponent Rules | **not covered** | — | — |
| 135 | `math.arith.square-numbers` | Perfect Squares | **not covered** | — | — |
| 136 | `math.arith.cube-numbers` | Perfect Cubes | **not covered** | — | — |
| 137 | `math.arith.square-roots` | Square Roots | **not covered** | — | — |
| 138 | `math.arith.irrational-roots` | Irrational Square Roots | **not covered** | — | — |
| 139 | `math.arith.scientific-notation` | Scientific Notation | **not covered** | — | — |
| 140 | `math.arith.mental-arithmetic` | Mental Arithmetic | **not covered** | — | — |
| 141 | `math.nt.divisibility` | Divisibility | **not covered** | — | — |
| 142 | `math.nt.divisibility-rules` | Divisibility Rules | **not covered** | — | — |
| 143 | `math.nt.prime-number` | Prime Number | **not covered** | — | — |
| 144 | `math.nt.composite-number` | Composite Number | **not covered** | — | — |
| 145 | `math.nt.sieve-of-eratosthenes` | Sieve of Eratosthenes | **not covered** | — | — |
| 146 | `math.nt.prime-factorization` | Prime Factorization | **not covered** | — | — |
| 147 | `math.nt.fundamental-theorem-arithmetic` | Fundamental Theorem of Arithmetic | **not covered** | — | — |
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
| 187 | `math.alg.linear-equation-2var` | Linear Equation in Two Variables | A3 (32t, no-complete) | yes | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018 |
| 188 | `math.alg.inequality-2var` | Linear Inequality in Two Variables | A3 (7t, mastered) | yes | MATH-011 |
| 189 | `math.alg.system-linear-equations` | Systems of Linear Equations | A3 (30t, no-complete) | yes | MATH-002, MATH-003, MATH-006, MATH-017, MATH-018 |
| 190 | `math.alg.substitution-method` | Substitution Method | A3 (23t, mastered) | yes | MATH-002, MATH-003, MATH-011, MATH-017 |
| 191 | `math.alg.elimination-method` | Elimination Method | A3 (11t, mastered) | yes | MATH-006, MATH-011 |
| 192 | `math.alg.system-3var` | Systems of 3 Equations in 3 Variables | **not covered** | — | — |
| 193 | `math.alg.polynomial` | Polynomial | **not covered** | — | — |
| 194 | `math.alg.degree` | Degree of a Polynomial | **not covered** | — | — |
| 195 | `math.alg.polynomial-operations` | Polynomial Operations | **not covered** | — | — |
| 196 | `math.alg.polynomial-division` | Polynomial Division | **not covered** | — | — |
| 197 | `math.alg.remainder-theorem` | Remainder Theorem | **not covered** | — | — |
| 198 | `math.alg.factor-theorem` | Factor Theorem | **not covered** | — | — |
| 199 | `math.alg.factoring` | Factoring Polynomials | **not covered** | — | — |
| 200 | `math.alg.factoring-gcf` | Factoring out the GCF | **not covered** | — | — |
| 201 | `math.alg.factoring-trinomials` | Factoring Trinomials | **not covered** | — | — |
| 202 | `math.alg.factoring-special` | Special Factoring Patterns | **not covered** | — | — |
| 203 | `math.alg.quadratic-equation` | Quadratic Equation | **not covered** | — | — |
| 204 | `math.alg.completing-the-square` | Completing the Square | **not covered** | — | — |
| 205 | `math.alg.quadratic-formula` | Quadratic Formula | **not covered** | — | — |
| 206 | `math.alg.discriminant` | Discriminant | **not covered** | — | — |
| 207 | `math.alg.polynomial-roots` | Polynomial Roots (Real and Complex) | **not covered** | — | — |
| 208 | `math.alg.rational-root-theorem` | Rational Root Theorem | **not covered** | — | — |
| 209 | `math.alg.fundamental-theorem-algebra` | Fundamental Theorem of Algebra | **not covered** | — | — |
| 210 | `math.alg.complex-polynomial-roots` | Complex Roots of Polynomials | **not covered** | — | — |
| 211 | `math.alg.rational-expressions` | Rational Expressions | **not covered** | — | — |
| 212 | `math.alg.rational-expressions-addition` | Addition of Rational Expressions | **not covered** | — | — |
| 213 | `math.alg.rational-expressions-multiplication` | Multiplication of Rational Expressions | **not covered** | — | — |
| 214 | `math.alg.rational-equations` | Rational Equations | **not covered** | — | — |
| 215 | `math.alg.exponent-rules` | Exponent Rules (Algebraic) | **not covered** | — | — |
| 216 | `math.alg.zero-exponent` | Zero Exponent | **not covered** | — | — |
| 217 | `math.alg.negative-exponent` | Negative Exponent | **not covered** | — | — |
| 218 | `math.alg.fractional-exponent` | Fractional Exponent | **not covered** | — | — |
| 219 | `math.alg.radicals` | Radical Expressions | **not covered** | — | — |
| 220 | `math.alg.simplifying-radicals` | Simplifying Radical Expressions | **not covered** | — | — |
| 221 | `math.alg.rationalizing-denominators` | Rationalizing the Denominator | **not covered** | — | — |
| 222 | `math.alg.radical-equations` | Radical Equations | **not covered** | — | — |
| 223 | `math.alg.exponential-function` | Exponential Function | **not covered** | — | — |
| 224 | `math.alg.exponential-equations` | Exponential Equations | **not covered** | — | — |
| 225 | `math.alg.logarithm` | Logarithm | **not covered** | — | — |
| 226 | `math.alg.logarithm-properties` | Logarithm Properties | **not covered** | — | — |
| 227 | `math.alg.natural-logarithm` | Natural Logarithm | **not covered** | — | — |
| 228 | `math.alg.change-of-base` | Change of Base Formula | **not covered** | — | — |
| 229 | `math.alg.logarithmic-equations` | Logarithmic Equations | **not covered** | — | — |
| 230 | `math.alg.inequality` | Inequality | **not covered** | — | — |
| 231 | `math.alg.polynomial-inequality` | Polynomial Inequality | **not covered** | — | — |
| 232 | `math.alg.rational-inequality` | Rational Inequality | **not covered** | — | — |
| 233 | `math.alg.binomial-theorem` | Binomial Theorem | **not covered** | — | — |
| 234 | `math.alg.pascals-triangle` | Pascal's Triangle | **not covered** | — | — |
| 235 | `math.alg.vietas-formulas` | Vieta's Formulas | **not covered** | — | — |
| 236 | `math.geom.point` | Point | **not covered** | — | — |
| 237 | `math.geom.line` | Line | **not covered** | — | — |
| 238 | `math.geom.line-segment` | Line Segment | **not covered** | — | — |
| 239 | `math.geom.ray` | Ray | **not covered** | — | — |
| 240 | `math.geom.plane` | Plane | **not covered** | — | — |
| 241 | `math.geom.angle` | Angle | **not covered** | — | — |
| 242 | `math.geom.angle-types` | Types of Angles | **not covered** | — | — |
| 243 | `math.geom.angle-measurement` | Angle Measurement | **not covered** | — | — |
| 244 | `math.geom.angle-pairs` | Angle Pairs | **not covered** | — | — |
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
| 278 | `math.geom.coordinate-plane` | Coordinate Plane | A4 (25t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-009, MATH-010, MATH-017, MATH-018 |
| 279 | `math.geom.x-y-coordinates` | Cartesian Coordinates | A4 (18t, mastered) | yes | MATH-003, MATH-006, MATH-009, MATH-010, MATH-017 |
| 280 | `math.geom.quadrants` | Quadrants | A4 (15t, needs-review) | yes | MATH-001, MATH-002, MATH-003, MATH-010 |
| 281 | `math.geom.distance-formula` | Distance Formula | A4 (18t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-009, MATH-017 |
| 282 | `math.geom.midpoint-formula` | Midpoint Formula | A4 (30t, needs-review) | yes | MATH-001, MATH-002, MATH-006, MATH-010, MATH-017 |
| 283 | `math.geom.slope` | Slope | A4 (15t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-009, MATH-010, MATH-017 |
| 284 | `math.geom.line-equation` | Equations of Lines | **not covered** | — | — |
| 285 | `math.geom.conic-sections` | Conic Sections | **not covered** | — | — |
| 286 | `math.geom.parabola` | Parabola | **not covered** | — | — |
| 287 | `math.geom.ellipse` | Ellipse | **not covered** | — | — |
| 288 | `math.geom.hyperbola` | Hyperbola | **not covered** | — | — |
| 289 | `math.geom.polar-coordinates` | Polar Coordinates | **not covered** | — | — |
| 290 | `math.geom.polar-curves` | Polar Curves | **not covered** | — | — |
| 291 | `math.geom.transformations` | Geometric Transformations | **not covered** | — | — |
| 292 | `math.geom.translation` | Translation | **not covered** | — | — |
| 293 | `math.geom.rotation` | Rotation | **not covered** | — | — |
| 294 | `math.geom.reflection` | Reflection | **not covered** | — | — |
| 295 | `math.geom.dilation` | Dilation | **not covered** | — | — |
| 296 | `math.geom.vectors-2d` | Vectors in 2D | **not covered** | — | — |
| 297 | `math.geom.vectors-3d` | Vectors in 3D | **not covered** | — | — |
| 298 | `math.geom.dot-product` | Dot Product | **not covered** | — | — |
| 299 | `math.geom.cross-product` | Cross Product | **not covered** | — | — |
| 300 | `math.geom.differential-geometry-curves` | Curves in Space | **not covered** | — | — |
| 301 | `math.geom.curvature` | Curvature | **not covered** | — | — |
| 302 | `math.geom.frenet-serret` | Frenet-Serret Formulas | **not covered** | — | — |
| 303 | `math.geom.differential-geometry-surfaces` | Differential Geometry of Surfaces | **not covered** | — | — |
| 304 | `math.geom.geometric-constructions` | Geometric Constructions | **not covered** | — | — |
| 305 | `math.trig.angle-measure` | Angle Measure | **not covered** | — | — |
| 306 | `math.trig.degree-radian-conversion` | Degree-Radian Conversion | **not covered** | — | — |
| 307 | `math.trig.right-triangle-trig` | Right-Triangle Trigonometry | **not covered** | — | — |
| 308 | `math.trig.basic-ratios` | Six Trigonometric Ratios | **not covered** | — | — |
| 309 | `math.trig.special-angles` | Trigonometric Values at Special Angles | **not covered** | — | — |
| 310 | `math.trig.unit-circle` | Unit Circle | **not covered** | — | — |
| 311 | `math.trig.reference-angles` | Reference Angles | **not covered** | — | — |
| 312 | `math.trig.trig-functions` | Trigonometric Functions | **not covered** | — | — |
| 313 | `math.trig.amplitude-period-phase` | Amplitude, Period, Phase Shift | **not covered** | — | — |
| 314 | `math.trig.trig-graphs` | Graphs of Trigonometric Functions | **not covered** | — | — |
| 315 | `math.trig.trig-identities` | Trigonometric Identities | **not covered** | — | — |
| 316 | `math.trig.pythagorean-identities` | Pythagorean Identities | **not covered** | — | — |
| 317 | `math.trig.reciprocal-identities` | Reciprocal Identities | **not covered** | — | — |
| 318 | `math.trig.sum-difference-formulas` | Sum and Difference Formulas | **not covered** | — | — |
| 319 | `math.trig.double-angle-formulas` | Double Angle Formulas | **not covered** | — | — |
| 320 | `math.trig.half-angle-formulas` | Half Angle Formulas | **not covered** | — | — |
| 321 | `math.trig.product-to-sum` | Product-to-Sum and Sum-to-Product Formulas | **not covered** | — | — |
| 322 | `math.trig.inverse-trig` | Inverse Trigonometric Functions | **not covered** | — | — |
| 323 | `math.trig.trig-equations` | Trigonometric Equations | **not covered** | — | — |
| 324 | `math.trig.law-of-sines` | Law of Sines | **not covered** | — | — |
| 325 | `math.trig.law-of-cosines` | Law of Cosines | **not covered** | — | — |
| 326 | `math.trig.polar-form-complex` | Polar Form of Complex Numbers | **not covered** | — | — |
| 327 | `math.trig.de-moivres-theorem` | De Moivre's Theorem | **not covered** | — | — |
| 328 | `math.trig.eulers-formula` | Euler's Formula | **not covered** | — | — |
| 329 | `math.trig.hyperbolic-functions` | Hyperbolic Functions | **not covered** | — | — |
| 330 | `math.func.function-concept` | Function | **not covered** | — | — |
| 331 | `math.func.domain-range` | Domain and Range | **not covered** | — | — |
| 332 | `math.func.function-notation` | Function Notation | **not covered** | — | — |
| 333 | `math.func.graph-of-function` | Graph of a Function | **not covered** | — | — |
| 334 | `math.func.real-valued-function` | Real-Valued Function | **not covered** | — | — |
| 335 | `math.func.zero-of-function` | Zero of a Function | **not covered** | — | — |
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
| 367 | `math.seq.arithmetic-series` | Arithmetic Series | A5 (21t, mastered) | yes | MATH-003, MATH-014, MATH-017 |
| 368 | `math.seq.geometric-series` | Geometric Series | A5 (19t, needs-review) | none | MATH-001, MATH-003, MATH-006 |
| 369 | `math.seq.infinite-geometric-series` | Infinite Geometric Series | A5 (14t, needs-review) | none | MATH-001, MATH-006 |
| 370 | `math.seq.series-convergence` | Convergence of Series | A5 (26t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017, MATH-018, MATH-023 |
| 371 | `math.seq.divergence-test` | Divergence Test (nth Term Test) | A5 (13t, mastered) | none | MATH-003, MATH-017 |
| 372 | `math.seq.comparison-test` | Comparison Test | A5 (20t, needs-review) | none | MATH-002, MATH-006, MATH-017, MATH-023 |
| 373 | `math.seq.ratio-test` | Ratio Test | A5 (28t, needs-review) | none | MATH-003, MATH-006, MATH-017, MATH-018 |
| 374 | `math.seq.root-test` | Root Test | A5 (20t, needs-review) | none | MATH-002, MATH-017, MATH-018 |
| 375 | `math.seq.integral-test` | Integral Test | **not covered** | — | — |
| 376 | `math.seq.alternating-series` | Alternating Series | **not covered** | — | — |
| 377 | `math.seq.absolute-convergence` | Absolute and Conditional Convergence | **not covered** | — | — |
| 378 | `math.seq.harmonic-series` | Harmonic Series | **not covered** | — | — |
| 379 | `math.seq.telescoping-series` | Telescoping Series | **not covered** | — | — |
| 380 | `math.calc.limits` | Limit of a Function | **not covered** | — | — |
| 381 | `math.calc.limit-laws` | Limit Laws | **not covered** | — | — |
| 382 | `math.calc.one-sided-limits` | One-Sided Limits | **not covered** | — | — |
| 383 | `math.calc.limits-at-infinity` | Limits at Infinity | **not covered** | — | — |
| 384 | `math.calc.squeeze-theorem` | Squeeze Theorem | **not covered** | — | — |
| 385 | `math.calc.continuity` | Continuity | **not covered** | — | — |
| 386 | `math.calc.continuity-types` | Types of Discontinuity | **not covered** | — | — |
| 387 | `math.calc.ivt` | Intermediate Value Theorem | **not covered** | — | — |
| 388 | `math.calc.derivative-intro` | Slope of Tangent and Rate of Change | **not covered** | — | — |
| 389 | `math.calc.derivative-definition` | Derivative (Definition) | **not covered** | — | — |
| 390 | `math.calc.differentiability` | Differentiability | **not covered** | — | — |
| 391 | `math.calc.derivative-rules` | Basic Differentiation Rules | **not covered** | — | — |
| 392 | `math.calc.product-rule` | Product Rule | **not covered** | — | — |
| 393 | `math.calc.quotient-rule` | Quotient Rule | **not covered** | — | — |
| 394 | `math.calc.chain-rule` | Chain Rule | **not covered** | — | — |
| 395 | `math.calc.derivative-exponential` | Derivative of Exponential Functions | **not covered** | — | — |
| 396 | `math.calc.derivative-ln` | Derivative of Logarithmic Functions | **not covered** | — | — |
| 397 | `math.calc.logarithmic-differentiation` | Logarithmic Differentiation | **not covered** | — | — |
| 398 | `math.calc.derivative-trig` | Derivatives of Trigonometric Functions | **not covered** | — | — |
| 399 | `math.calc.derivative-inverse-trig` | Derivatives of Inverse Trig Functions | **not covered** | — | — |
| 400 | `math.calc.hyperbolic-derivatives` | Derivatives of Hyperbolic Functions | **not covered** | — | — |
| 401 | `math.calc.implicit-differentiation` | Implicit Differentiation | **not covered** | — | — |
| 402 | `math.calc.higher-order-derivatives` | Higher-Order Derivatives | **not covered** | — | — |
| 403 | `math.calc.related-rates` | Related Rates | **not covered** | — | — |
| 404 | `math.calc.lhopitals-rule` | L'Hôpital's Rule | **not covered** | — | — |
| 405 | `math.calc.mean-value-theorem` | Mean Value Theorem | **not covered** | — | — |
| 406 | `math.calc.rolles-theorem` | Rolle's Theorem | **not covered** | — | — |
| 407 | `math.calc.increasing-decreasing` | Increasing and Decreasing Functions | **not covered** | — | — |
| 408 | `math.calc.critical-points` | Critical Points | **not covered** | — | — |
| 409 | `math.calc.local-extrema` | Local Extrema | **not covered** | — | — |
| 410 | `math.calc.concavity` | Concavity and Inflection Points | **not covered** | — | — |
| 411 | `math.calc.optimization` | Optimization (Calculus) | **not covered** | — | — |
| 412 | `math.calc.curve-sketching` | Curve Sketching | **not covered** | — | — |
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
| 459 | `math.de.solution-types` | Types of Solutions | A6 (20t, needs-review) | none | MATH-001, MATH-002, MATH-017, MATH-018 |
| 460 | `math.de.ivp` | Initial Value Problem | A6 (31t, mastered) | yes | MATH-003, MATH-006, MATH-013, MATH-017, MATH-019 |
| 461 | `math.de.existence-uniqueness` | Existence and Uniqueness Theorem | A6 (9t, mastered) | none | MATH-003 |
| 462 | `math.de.first-order-ode` | First-Order ODE | A6 (21t, needs-review) | none | MATH-001, MATH-002, MATH-009, MATH-017, MATH-018 |
| 463 | `math.de.separable` | Separable Differential Equation | A6 (29t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-023 |
| 464 | `math.de.linear-first-order` | Linear First-Order ODE | A6 (23t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-015, MATH-017, MATH-022, MATH-024 |
| 465 | `math.de.exact-ode` | Exact Differential Equation | A6 (10t, mastered) | none | MATH-003, MATH-006 |
| 466 | `math.de.bernoulli` | Bernoulli Equation | **not covered** | — | — |
| 467 | `math.de.homogeneous-ode` | Homogeneous First-Order ODE | **not covered** | — | — |
| 468 | `math.de.slope-field` | Slope Field | **not covered** | — | — |
| 469 | `math.de.euler-method` | Euler's Method | **not covered** | — | — |
| 470 | `math.de.second-order-ode` | Second-Order ODE | **not covered** | — | — |
| 471 | `math.de.second-order-linear` | Second-Order Linear ODE | **not covered** | — | — |
| 472 | `math.de.second-order-homogeneous` | Homogeneous Second-Order Linear ODE | **not covered** | — | — |
| 473 | `math.de.wronskian` | Wronskian | **not covered** | — | — |
| 474 | `math.de.char-equation` | Characteristic Equation | **not covered** | — | — |
| 475 | `math.de.undetermined-coefficients` | Method of Undetermined Coefficients | **not covered** | — | — |
| 476 | `math.de.variation-of-parameters` | Variation of Parameters | **not covered** | — | — |
| 477 | `math.de.harmonic-oscillator` | Harmonic Oscillator | **not covered** | — | — |
| 478 | `math.de.resonance` | Resonance | **not covered** | — | — |
| 479 | `math.de.higher-order-ode` | Higher-Order Linear ODE | **not covered** | — | — |
| 480 | `math.de.laplace-transform` | Laplace Transform | **not covered** | — | — |
| 481 | `math.de.laplace-properties` | Laplace Transform Properties | **not covered** | — | — |
| 482 | `math.de.inverse-laplace` | Inverse Laplace Transform | **not covered** | — | — |
| 483 | `math.de.laplace-ode` | Solving ODEs with Laplace Transform | **not covered** | — | — |
| 484 | `math.de.convolution-theorem` | Convolution Theorem (Laplace) | **not covered** | — | — |
| 485 | `math.de.systems-ode` | Systems of ODEs | **not covered** | — | — |
| 486 | `math.de.systems-matrix-method` | Matrix Method for Linear Systems | **not covered** | — | — |
| 487 | `math.de.phase-plane` | Phase Plane Analysis | **not covered** | — | — |
| 488 | `math.de.stability-analysis` | Stability Analysis | **not covered** | — | — |
| 489 | `math.de.series-solution` | Series Solution of ODEs | **not covered** | — | — |
| 490 | `math.de.frobenius-method` | Frobenius Method | **not covered** | — | — |
| 491 | `math.de.bessel-equation` | Bessel's Equation | **not covered** | — | — |
| 492 | `math.de.legendre-equation` | Legendre's Equation | **not covered** | — | — |
| 493 | `math.de.sturm-liouville` | Sturm-Liouville Theory | **not covered** | — | — |
| 494 | `math.de.eigenfunction-expansion` | Eigenfunction Expansion | **not covered** | — | — |
| 495 | `math.de.bvp` | Boundary Value Problem | **not covered** | — | — |
| 496 | `math.de.fourier-series` | Fourier Series | **not covered** | — | — |
| 497 | `math.de.fourier-convergence` | Convergence of Fourier Series | **not covered** | — | — |
| 498 | `math.de.fourier-sine-cosine` | Fourier Sine and Cosine Series | **not covered** | — | — |
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
| 550 | `math.linalg.eigenvalues` | Eigenvalues and Eigenvectors | A7 (19t, needs-review) | none | MATH-003, MATH-017 |
| 551 | `math.linalg.characteristic-polynomial` | Characteristic Polynomial | A7 (10t, mastered) | none | — |
| 552 | `math.linalg.eigenspace` | Eigenspace | A7 (20t, needs-review) | none | MATH-001, MATH-006, MATH-017, MATH-020, MATH-021 |
| 553 | `math.linalg.diagonalization` | Diagonalization | A7 (24t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017, MATH-018 |
| 554 | `math.linalg.matrix-exponential` | Matrix Exponential | A7 (30t, needs-review) | none | MATH-001, MATH-003, MATH-006, MATH-015, MATH-017, MATH-018 |
| 555 | `math.linalg.jordan-form` | Jordan Normal Form | A7 (8t, mastered) | none | — |
| 556 | `math.linalg.spectral-theorem` | Spectral Theorem | A7 (21t, mastered) | none | MATH-003, MATH-006, MATH-017 |
| 557 | `math.linalg.positive-definite` | Positive Definite Matrix | A7 (24t, needs-review) | none | MATH-001, MATH-006, MATH-015, MATH-017, MATH-020 |
| 558 | `math.linalg.cholesky` | Cholesky Decomposition | **not covered** | — | — |
| 559 | `math.linalg.inner-product` | Inner Product | **not covered** | — | — |
| 560 | `math.linalg.inner-product-space` | Inner Product Space | **not covered** | — | — |
| 561 | `math.linalg.orthogonal-basis` | Orthogonal and Orthonormal Basis | **not covered** | — | — |
| 562 | `math.linalg.gram-schmidt` | Gram-Schmidt Process | **not covered** | — | — |
| 563 | `math.linalg.projection` | Orthogonal Projection | **not covered** | — | — |
| 564 | `math.linalg.least-squares` | Least Squares | **not covered** | — | — |
| 565 | `math.linalg.qr-factorization` | QR Factorization | **not covered** | — | — |
| 566 | `math.linalg.svd` | Singular Value Decomposition | **not covered** | — | — |
| 567 | `math.linalg.singular-values` | Singular Values | **not covered** | — | — |
| 568 | `math.linalg.pseudoinverse` | Moore-Penrose Pseudoinverse | **not covered** | — | — |
| 569 | `math.linalg.tensor` | Tensor | **not covered** | — | — |
| 570 | `math.linalg.dual-space` | Dual Space | **not covered** | — | — |
| 571 | `math.linalg.distance` | Distance in Vector Spaces | **not covered** | — | — |
| 572 | `math.linalg.angle-vectors` | Angle Between Vectors | **not covered** | — | — |
| 573 | `math.prob.sample-space` | Sample Space | **not covered** | — | — |
| 574 | `math.prob.event` | Event | **not covered** | — | — |
| 575 | `math.prob.probability-measure` | Probability Measure | **not covered** | — | — |
| 576 | `math.prob.probability-axioms` | Axioms of Probability | **not covered** | — | — |
| 577 | `math.prob.classical-probability` | Classical Probability | **not covered** | — | — |
| 578 | `math.prob.combinatorial-probability` | Combinatorial Probability | **not covered** | — | — |
| 579 | `math.prob.conditional-probability` | Conditional Probability | **not covered** | — | — |
| 580 | `math.prob.total-probability` | Law of Total Probability | **not covered** | — | — |
| 581 | `math.prob.bayes-theorem` | Bayes' Theorem | **not covered** | — | — |
| 582 | `math.prob.independence` | Independence | **not covered** | — | — |
| 583 | `math.prob.bayesian-inference` | Bayesian Inference | **not covered** | — | — |
| 584 | `math.prob.random-variable` | Random Variable | **not covered** | — | — |
| 585 | `math.prob.discrete-rv` | Discrete Random Variable | **not covered** | — | — |
| 586 | `math.prob.continuous-rv` | Continuous Random Variable | **not covered** | — | — |
| 587 | `math.prob.pmf` | Probability Mass Function | **not covered** | — | — |
| 588 | `math.prob.pdf` | Probability Density Function | **not covered** | — | — |
| 589 | `math.prob.cdf` | Cumulative Distribution Function | **not covered** | — | — |
| 590 | `math.prob.quantile` | Quantile | **not covered** | — | — |
| 591 | `math.prob.distribution` | Probability Distribution | **not covered** | — | — |
| 592 | `math.prob.discrete-distributions` | Discrete Distributions | **not covered** | — | — |
| 593 | `math.prob.continuous-distributions` | Continuous Distributions | **not covered** | — | — |
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
| 641 | `math.stats.p-value` | p-value | A8 (7t, mastered) | yes | MATH-011 |
| 642 | `math.stats.type-errors` | Type I and Type II Errors | A8 (29t, needs-review) | yes | MATH-001, MATH-003, MATH-006, MATH-011, MATH-017 |
| 643 | `math.stats.power` | Power of a Test | A8 (26t, mastered) | yes | MATH-002, MATH-003, MATH-006, MATH-011, MATH-017 |
| 644 | `math.stats.z-test` | z-Test | A8 (8t, mastered) | yes | MATH-011 |
| 645 | `math.stats.t-test` | t-Test | A8 (21t, needs-review) | yes | MATH-011, MATH-017 |
| 646 | `math.stats.chi-squared-test` | Chi-Squared Test | A8 (21t, needs-review) | yes | MATH-002, MATH-006, MATH-011, MATH-017 |
| 647 | `math.stats.anova` | Analysis of Variance | A8 (31t, no-complete) | yes | MATH-003, MATH-006, MATH-009, MATH-011, MATH-017 |
| 648 | `math.stats.two-way-anova` | Two-Way ANOVA | **not covered** | — | — |
| 649 | `math.stats.correlation` | Sample Correlation | **not covered** | — | — |
| 650 | `math.stats.linear-regression` | Simple Linear Regression | **not covered** | — | — |
| 651 | `math.stats.multiple-regression` | Multiple Linear Regression | **not covered** | — | — |
| 652 | `math.stats.covariance-matrix` | Covariance Matrix | **not covered** | — | — |
| 653 | `math.stats.normal-distribution` | Normal Distribution (Statistics) | **not covered** | — | — |
| 654 | `math.stats.normal-approximation` | Normal Approximation | **not covered** | — | — |
| 655 | `math.stats.nonparametric` | Nonparametric Tests | **not covered** | — | — |
| 656 | `math.stats.bayesian-inference` | Bayesian Statistics | **not covered** | — | — |
| 657 | `math.stats.conjugate-prior` | Conjugate Prior | **not covered** | — | — |
| 658 | `math.stats.credible-interval` | Credible Interval | **not covered** | — | — |
| 659 | `math.stats.experimental-design` | Experimental Design | **not covered** | — | — |
| 660 | `math.stats.sufficient-statistic` | Sufficient Statistic | **not covered** | — | — |
| 661 | `math.stats.rao-blackwell` | Rao-Blackwell Theorem | **not covered** | — | — |
| 662 | `math.disc.counting-principles` | Counting Principles | **not covered** | — | — |
| 663 | `math.disc.permutations` | Permutations | **not covered** | — | — |
| 664 | `math.disc.combinations` | Combinations | **not covered** | — | — |
| 665 | `math.disc.binomial-theorem` | Binomial Theorem | **not covered** | — | — |
| 666 | `math.disc.combinatorics` | Combinatorics | **not covered** | — | — |
| 667 | `math.disc.stars-bars` | Stars and Bars | **not covered** | — | — |
| 668 | `math.disc.pigeonhole` | Pigeonhole Principle | **not covered** | — | — |
| 669 | `math.disc.inclusion-exclusion` | Inclusion-Exclusion Principle | **not covered** | — | — |
| 670 | `math.disc.derangements` | Derangements | **not covered** | — | — |
| 671 | `math.disc.recurrence-relation` | Recurrence Relation | **not covered** | — | — |
| 672 | `math.disc.linear-recurrence` | Linear Recurrence | **not covered** | — | — |
| 673 | `math.disc.divide-conquer-recurrence` | Divide-and-Conquer Recurrence | **not covered** | — | — |
| 674 | `math.disc.generating-functions` | Generating Functions | **not covered** | — | — |
| 675 | `math.disc.ogf` | Ordinary Generating Function | **not covered** | — | — |
| 676 | `math.disc.egf` | Exponential Generating Function | **not covered** | — | — |
| 677 | `math.disc.graph` | Graph | **not covered** | — | — |
| 678 | `math.disc.graph-types` | Types of Graphs | **not covered** | — | — |
| 679 | `math.disc.graph-representation` | Graph Representation | **not covered** | — | — |
| 680 | `math.disc.graph-connectivity` | Graph Connectivity | **not covered** | — | — |
| 681 | `math.disc.euler-hamiltonian` | Euler and Hamiltonian Paths | **not covered** | — | — |
| 682 | `math.disc.graph-trees` | Trees | **not covered** | — | — |
| 683 | `math.disc.spanning-tree` | Spanning Tree | **not covered** | — | — |
| 684 | `math.disc.graph-coloring` | Graph Coloring | **not covered** | — | — |
| 685 | `math.disc.planar-graph` | Planar Graph | **not covered** | — | — |
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
| 737 | `math.real.absolute-convergence` | Absolute Convergence | A9 (26t, needs-review) | none | MATH-001, MATH-006, MATH-017 |
| 738 | `math.real.metric-space` | Metric Space | **not covered** | — | — |
| 739 | `math.real.open-sets` | Open and Closed Sets | **not covered** | — | — |
| 740 | `math.real.completeness-metric` | Completeness of Metric Spaces | **not covered** | — | — |
| 741 | `math.real.compactness` | Compactness | **not covered** | — | — |
| 742 | `math.real.connectedness` | Connectedness | **not covered** | — | — |
| 743 | `math.real.continuity-rigorous` | Continuity (ε-δ) | **not covered** | — | — |
| 744 | `math.real.uniform-continuity` | Uniform Continuity | **not covered** | — | — |
| 745 | `math.real.lipschitz-continuity` | Lipschitz Continuity | **not covered** | — | — |
| 746 | `math.real.extreme-value-theorem` | Extreme Value Theorem | **not covered** | — | — |
| 747 | `math.real.ivt` | Intermediate Value Theorem (Rigorous) | **not covered** | — | — |
| 748 | `math.real.differentiability-rigorous` | Differentiability (Rigorous) | **not covered** | — | — |
| 749 | `math.real.mvt` | Mean Value Theorem (Rigorous) | **not covered** | — | — |
| 750 | `math.real.taylor-rigorous` | Taylor's Theorem (Rigorous) | **not covered** | — | — |
| 751 | `math.real.riemann-integral` | Riemann Integral (Rigorous) | **not covered** | — | — |
| 752 | `math.real.riemann-integrability` | Riemann Integrability | **not covered** | — | — |
| 753 | `math.real.ftc-rigorous` | Fundamental Theorem of Calculus (Rigorous) | **not covered** | — | — |
| 754 | `math.real.uniform-convergence` | Uniform Convergence | **not covered** | — | — |
| 755 | `math.real.pointwise-convergence` | Pointwise Convergence | **not covered** | — | — |
| 756 | `math.real.weierstrass-approximation` | Weierstrass Approximation Theorem | **not covered** | — | — |
| 757 | `math.real.fixed-point-theorem` | Banach Fixed-Point Theorem | **not covered** | — | — |
| 758 | `math.real.baire-category` | Baire Category Theorem | **not covered** | — | — |
| 759 | `math.real.implicit-function-theorem` | Implicit Function Theorem | **not covered** | — | — |
| 760 | `math.real.inverse-function-theorem` | Inverse Function Theorem | **not covered** | — | — |
| 761 | `math.cx.complex-numbers-analysis` | Complex Numbers (Analysis) | **not covered** | — | — |
| 762 | `math.cx.complex-function` | Complex-Valued Function | **not covered** | — | — |
| 763 | `math.cx.cauchy-riemann` | Cauchy-Riemann Equations | **not covered** | — | — |
| 764 | `math.cx.analytic-functions` | Analytic (Holomorphic) Functions | **not covered** | — | — |
| 765 | `math.cx.harmonic-functions` | Harmonic Functions (Complex Analysis) | **not covered** | — | — |
| 766 | `math.cx.power-series-cx` | Power Series in ℂ | **not covered** | — | — |
| 767 | `math.cx.complex-integration` | Complex Line Integral | **not covered** | — | — |
| 768 | `math.cx.cauchy-theorem` | Cauchy's Theorem | **not covered** | — | — |
| 769 | `math.cx.cauchy-goursat` | Cauchy-Goursat Theorem | **not covered** | — | — |
| 770 | `math.cx.cauchy-integral-formula` | Cauchy Integral Formula | **not covered** | — | — |
| 771 | `math.cx.higher-derivatives` | Derivatives of Holomorphic Functions | **not covered** | — | — |
| 772 | `math.cx.morera-theorem` | Morera's Theorem | **not covered** | — | — |
| 773 | `math.cx.liouville-theorem` | Liouville's Theorem | **not covered** | — | — |
| 774 | `math.cx.fundamental-theorem-algebra` | Fundamental Theorem of Algebra (Complex Analysis) | **not covered** | — | — |
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
| 822 | `math.meas.convergence-theorems` | Convergence Theorems | A10 (25t, mastered) | yes | MATH-002, MATH-003, MATH-006, MATH-009, MATH-013, MATH-016, MATH-017 |
| 823 | `math.meas.lp-space` | Lᵖ Spaces | A10 (7t, mastered) | none | — |
| 824 | `math.meas.l2-space` | L² Space | A10 (22t, needs-review) | none | MATH-001, MATH-002, MATH-006, MATH-017 |
| 825 | `math.meas.product-measure` | Product Measure and Fubini's Theorem | A10 (17t, needs-review) | none | MATH-001, MATH-002, MATH-003, MATH-017, MATH-018 |
| 826 | `math.meas.radon-nikodym` | Radon-Nikodym Theorem | A10 (26t, needs-review) | none | MATH-001, MATH-002, MATH-004, MATH-006, MATH-016, MATH-017, MATH-018 |
| 827 | `math.meas.abstract-measure-spaces` | Abstract Measure Spaces | A10 (24t, mastered) | none | MATH-003, MATH-006, MATH-017, MATH-018 |
| 828 | `math.fnal.normed-space` | Normed Space | **not covered** | — | — |
| 829 | `math.fnal.completeness` | Completeness | **not covered** | — | — |
| 830 | `math.fnal.banach-space` | Banach Space | **not covered** | — | — |
| 831 | `math.fnal.hilbert-space` | Hilbert Space | **not covered** | — | — |
| 832 | `math.fnal.bounded-operator` | Bounded Linear Operator | **not covered** | — | — |
| 833 | `math.fnal.dual-space-functional` | Dual Space | **not covered** | — | — |
| 834 | `math.fnal.hahn-banach` | Hahn-Banach Theorem | **not covered** | — | — |
| 835 | `math.fnal.open-mapping-theorem` | Open Mapping Theorem | **not covered** | — | — |
| 836 | `math.fnal.closed-graph-theorem` | Closed Graph Theorem | **not covered** | — | — |
| 837 | `math.fnal.uniform-boundedness` | Uniform Boundedness Principle | **not covered** | — | — |
| 838 | `math.fnal.riesz-representation` | Riesz Representation Theorem | **not covered** | — | — |
| 839 | `math.fnal.spectral-theory` | Spectral Theory | **not covered** | — | — |
| 840 | `math.fnal.compact-operator-spectrum` | Compact Operators | **not covered** | — | — |
| 841 | `math.fnal.fourier-transform` | Fourier Transform (Functional Analysis) | **not covered** | — | — |
| 842 | `math.fnal.distributions` | Distributions | **not covered** | — | — |
| 843 | `math.fnal.special-functions` | Special Functions | **not covered** | — | — |
| 844 | `math.fnal.dense-subspace` | Dense Subspaces and Approximation | **not covered** | — | — |
| 845 | `math.fnal.convolution` | Convolution | **not covered** | — | — |
| 846 | `math.num.floating-point` | Floating-Point Arithmetic | **not covered** | — | — |
| 847 | `math.num.error-analysis` | Error Analysis | **not covered** | — | — |
| 848 | `math.num.root-finding` | Root-Finding Methods | **not covered** | — | — |
| 849 | `math.num.newtons-method` | Newton's Method | **not covered** | — | — |
| 850 | `math.num.interpolation` | Polynomial Interpolation | **not covered** | — | — |
| 851 | `math.num.splines` | Spline Interpolation | **not covered** | — | — |
| 852 | `math.num.numerical-differentiation` | Numerical Differentiation | **not covered** | — | — |
| 853 | `math.num.numerical-integration` | Numerical Integration | **not covered** | — | — |
| 854 | `math.num.lu-factorization` | LU Factorization (Numerical) | **not covered** | — | — |
| 855 | `math.num.cholesky` | Cholesky Factorization (Numerical) | **not covered** | — | — |
| 856 | `math.num.iterative-linear` | Iterative Methods for Linear Systems | **not covered** | — | — |
| 857 | `math.num.qr-algorithm` | QR Algorithm | **not covered** | — | — |
| 858 | `math.num.svd` | SVD (Numerical) | **not covered** | — | — |
| 859 | `math.num.euler-method` | Euler's Method (Numerical ODE) | **not covered** | — | — |
| 860 | `math.num.runge-kutta` | Runge-Kutta Methods | **not covered** | — | — |
| 861 | `math.num.stiff-ode` | Stiff ODEs and Implicit Methods | **not covered** | — | — |
| 862 | `math.opt.unconstrained-optimization` | Unconstrained Optimization | **not covered** | — | — |
| 863 | `math.opt.convex-function` | Convex Function | **not covered** | — | — |
| 864 | `math.opt.convex-set` | Convex Set | **not covered** | — | — |
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
