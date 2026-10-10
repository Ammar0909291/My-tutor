# Chemistry Real-Learner Defects

<!-- SUMMARY:START -->
## Summary (generated from the entries below; counts verified automatically)

- Total lessons in Chemistry curriculum (`/api/curriculum?subject=chemistry`): 186
- Total lessons studied (full lesson session driven, ≥3 turns): 186
- Total lessons covered (≥1 account): 186  (100.0 %)
- Total defects: 150
- P0: 0
- P1: 12
- P2: 85
- P3: 53
- Status (after the 2026-10-10 live re-drive; DEPLOYED = live, not yet production-verified; totals = 150 entries):
  - PARTIALLY FIXED: 76
  - FIXED: 40
  - PRODUCTION-VERIFIED: 20
  - DEPLOYED: 11
  - NOT REPRODUCED: 2
  - DEFERRED: 1
<!-- SUMMARY:END -->

**Fix pass (2026-10-05/06, batches A–F, commits dc88764 … dee8428):** each entry's **Status** / **Fix:** line names its commit, cause and evidence. Live re-check on production, disposable accounts deleted afterwards, `scripts/qa/chemDefectRedrive.ts` + `scripts/qa/sessionShareProbe.ts`:
- 3 concurrent lessons on one account, one tabId each (a3455f6): 3 sessions, each its own lesson, figure and cards (CHEM-148 browser shape isolated; the tab-less driver shape is an owner decision).
- P1 lessons #115, #151, #78, #97, #58, #40, #79, #153, #102, #6, #10 + 10 sample lessons (a3455f6, 273 turns, 0 degraded): 0 answer-key leaks, 0 pipe tables, 0 "covers:" lines, 0 closing-format openings, 0 presupposing questions after "ok"/a request, 21/21 "with numbers" and 21/21 "step by step" honoured; found three regressions in this pass's own work (trim undone by the analogy cap, model card on "too many words", reviewer capitals in corrections/cards), fixed in 9f5cf6f, 91dba1c, dee8428.
- 10 further sample lessons + re-check of #1, #31, #42, #58 (90cf2ce, 182 turns): 0 flags; "too many words" 0/14 over budget, 0/14 with a card; 14/14 numbers and steps honoured.
- Not verified live: production rendering of the four new curated figures; the dee8428 card-capitals change (tests only); the 9 "fixed in repo" probe rows, which need an owner-approved `scripts/assets/converge-probe-edits.ts --apply` run (slugs on each entry).
- Seen live, still open: #96 (chem.surface.adsorption) a picture question was answered "Could you describe what you see in it?" — the server held a figure state, so the no-figure answer did not apply; not root-caused.

## Production redrive 2026-10-06 (controlled load, deploy 05b7868)

One disposable account, one lesson at a time, one tab id per lesson, 2.5 s between turns
(scripts/qa/chemDefectRedrive.ts). Chemistry #151, 21, 165, 133, 64, 77, 42, 115, 79
(117 turns) + biology #21 + physics #134 (13 turns each). All accounts deleted.
Figure and visual decisions cross-checked against production runtime logs (VISUAL_TURN).

- CHEM-107/146: 1 degraded turn in 117 (#42, an answer tap got "didn't come through", no
  verdict); 0 cards swapped by a degraded reply. Not reproducible at controlled load.
- CHEM-061: "quiz me" got a card in 9/9 lessons. Separate finding: 9 of 143 turns offered
  a check "when you're ready" while a card was on screen (CHEM-021 mechanism) — fix e09efe5,
  committed and pushed, NOT DEPLOYED (Vercel: "Account is blocked").
- CHEM-149: figure served in 7/9 (log-verified); #165 and #64 get none — production reason
  "no-figure:critic-reject-cached" (no curated figure; generated one rejected and cached).
- CHEM-004: 16 of 35 distinct cards had 2 options (12 authored, 4 model-written).
- CHEM-048: about 13 of 35 distinct cards were model-written (no authored key).
- CHEM-033/017, BIO-018, PHYS-007: 0 answered cards shown again; no concept switch occurred,
  so the fixed path was not exercised (inconclusive).
- CHEM-148/BIO-042: the private-mode browser path could not be driven from the sandbox
  (egress proxy blocked the browser's script loads).
- Harness fix (94961cc): a figure sent as its type string (3-D card figures) had been
  reported as "no figure"; two "pretends to see a picture" flags were false positives.

## Scope

The complete Chemistry curriculum of the deployed app (`my-tutor-flame.vercel.app`), following the app's own lesson order
(`GET /api/curriculum?subject=chemistry`), studied as a weak learner by ten owner-supplied test accounts working **in parallel**.
This is a **discovery log**: no application code, prompt, KG, EB, Blueprint, GB+, curriculum, grading, mastery, schema or
configuration was changed to produce it. Fixes are out of scope until requested.

Relation to earlier QA: `docs/qa/PHYSICS_CHEMISTRY_REAL_STUDENT_DEFECTS.md` (`PCD-*`, 2026-09-11/12) and
`docs/qa/PHYSICS_CHEMISTRY_MASTER_DEFECT_BACKLOG.md` are an earlier compiled audit; this file is the canonical **current**
Chemistry log and uses `CHEM-NNN` IDs. No other file named `*CHEMISTRY_REAL_LEARNER*` existed before this one. Where a
finding matches an earlier `PCD-*` entry it says **Related: PCD-NNN** instead of opening a competing record.

## Learners and distribution

Ten test accounts (`test1`–`test10`, identified below only as **Account 1–10**; credentials are never recorded). All ten were
fresh (0 Chemistry progress, onboarded to Chemistry via the app's own `/api/onboarding`). The 186 lessons were split into
ten contiguous blocks, one block per account, all accounts running **simultaneously**:

| Account | Lesson orders |
|---|---|
| 1 | 1–19 |
| 2 | 20–38 |
| 3 | 39–57 |
| 4 | 58–76 |
| 5 | 77–95 |
| 6 | 96–114 |
| 7 | 115–132 |
| 8 | 133–150 |
| 9 | 151–168 |
| 10 | 169–186 |

(Account 9's display name inside the app is "test0".) Persona: lower-than-intermediate English, basic Chemistry, short messages,
sometimes right, sometimes wrong (~28 % of card answers deliberately wrong), sometimes confused; uses the requests
"explain simpler", "give me example", "give me example with numbers", "i dont understand", "i dont understand this picture",
"what is this?", "why?", "show me step by step", "too many words", "next question please", "quiz me", "explain again", "ok",
"continue". Never told Tutor Max it was QA.

## Method and limits (read before trusting any count)

- Driven through the app's own HTTP API (`/api/sessions`, `/api/learn/lesson-init`, `/api/learn/chat`) as the logged-in
  learner, one new session per lesson, with a scripted persona (card answers chosen from the repo's authored probe key with a
  planned error rate; free-text answers quoted from taught content or "i dont know"). Every transcript was then read by a
  human-equivalent reviewer; entries below are only things actually observed in a transcript or in a served figure payload.
- Because answers are scripted, some tutor praise for a non-answer is a persona artefact; where that matters the entry says so.
- Lessons were driven to natural completion, a "pause/needs-review" close, or a 30-turn cap. Turn counts include my
  "learner" turns only.
- A real browser (Chromium via the egress proxy CA) was used for a **small** UI sample (login, dashboard at 390×844, subject
  switcher). In-lesson UI controls (Predict / Practice / Test me, simulation sliders) were **not** exercised: figures were assessed
  from the payload the lesson sent. UI-derived claims say so.
- Terms: **studied** = a full lesson session was driven; **observed** = seen in a transcript; **reproduced** = seen more than once
  / on more than one account; **systemic** = a mechanism seen across many lessons; **blocked** = could not proceed; **uncertain** = not
  established; **not tested** = no session.
- Load note: all ten accounts ran at once. From ~15:05 UTC the app began returning "degraded" fallback replies (CHEM-107).
  The run was stopped when that appeared and resumed with think-time and a back-off; lessons with ≥3 degraded turns were
  discarded from coverage and re-driven (orders 10, 28, 45, 106, 107, 158, 159, 177; the re-run transcripts are the ones
  counted). The driver processes also stopped once, part-way (19 lessons not started: 34–38, 55–57, 74–76, 95, 148–150, 167, 168,
  185, 186); those were re-driven on their original accounts afterwards, at lower load, and closed more often as "mastered"
  (see the Coverage table). Results from the lower-load period are therefore not strictly comparable with the first period.
- Each lesson was driven **once** on **one** account. Deterministic content errors (authored keys, worked examples) are assumed
  to repeat, but a second-account reproduction of them was **not tested**. Only the concurrency probes (below) and the
  recurrence of mechanisms across lessons give "reproduced".
- Account 9's display name inside the app is "test0"; replies using "test0" are not a defect.

## Severity key

P0 = learning completely blocked · P1 = seriously damages learning/trust · P2 = noticeable but non-blocking · P3 = minor/polish.

Categories: Teaching · Adaptation · Lesson flow · Chemistry correctness · Numerical/factual · Visuals · Questions · UX ·
Mastery/progress · Concurrency/session isolation.

## Defects

### CHEM-001 — "too many words" is answered with a quiz card or a longer reply, never a shorter explanation

- Severity: P2
- Category: Adaptation
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 6
- Chemistry concept: `chem.surface.adsorption`
- Lesson/order: #96
- Learner message: too many words
- Tutor response: (gate) "Quick check. Think it through before you choose." + a 2-option MCQ about silica gel.
- Expected behaviour: A shorter, simpler restatement of what was just taught.
- Actual behaviour: The learner's complaint is not acted on: the reply is a quiz card (#96 t3, #133 t2) or a LONGER wall of text plus a new card (#39 t5). Never shorter.
- Why it is a defect: The learner asked for less text and received a test or more text; the adaptation request is silently ignored.
- Reproducibility: Reproduced on 3 accounts in 3 lessons (#39, #96, #133) in the first run.
- Also observed (101 occurrences in 89 lessons): #39 (A3) t5; #133 (A8) t2; #97 (A6) t6; #116 (A7) t7; #20 (A2) t14; #58 (A4) t2; #134 (A8) t4; #40 (A3) t18; #3 (A1) t11; #135 (A8) t3; #171 (A10) t13; #181 (A10) tt10/t10; #184 (A10) t15; #4 (A1) t4; #6 (A1) t5; #7 (A1) t12; #11 (A1) t2; #12 (A1) t6; #13 (A1) t3; #17 (A1) t3; #170 (A10) t2; #175 (A10) t12; #176 (A10) t12; #177 (A10) t10; #179 (A10) t2; #180 (A10) t11; #183 (A10) t18; #23 (A2) t3; #24 (A2) t7; #27 (A2) t2; #28 (A2) t2; #29 (A2) t5; #30 (A2) t7; #31 (A2) t2; #32 (A2) t7; #33 (A2) t5; #35 (A2) t8; #37 (A2) t3; #38 (A2) t2; #41 (A3) t18; #49 (A3) t9; #51 (A3) t9; #53 (A3) t13; #54 (A3) t2; #55 (A3) t11; #57 (A3) t17; #64 (A4) t6; #65 (A4) t19; #66 (A4) t8; #67 (A4) t4; #69 (A4) t6; #70 (A4) t10; #72 (A4) t19; #73 (A4) t10; #74 (A4) t14; #75 (A4) t16; #79 (A5) t14; #80 (A5) t9; #81 (A5) t13; #82 (A5) t8; #83 (A5) t3; #84 (A5) t2; #87 (A5) t2; #88 (A5) t2; #89 (A5) t7; #90 (A5) t7; #91 (A5) t6; #93 (A5) t13; #96 (A6) t3; #99 (A6) t10; #106 (A6) t15; #108 (A6) t2; #110 (A6) t7; #111 (A6) t2; #112 (A6) t6; #113 (A6) t3; #125 (A7) t14; #127 (A7) t3; #131 (A7) t5; #136 (A8) t19; #137 (A8) t17; #141 (A8) t8; #145 (A8) t13; #147 (A8) t9; #149 (A8) t8; #155 (A9) t11; #159 (A9) t15; #161 (A9) t15; #164 (A9) t12
- Notes on occurrences: #39 t5: reply longer than the previous turn + new MCQ; also misattributes the learner's earlier wrong answer ("I hear you saying helium atoms are heavier") · #133 t2: gate card · #97 t6: gate card · #116 t7: gate card whose stem+options are ~60 words (more text, not less) · #20 t14: "let's keep it very short" then a card re-asking an already-answered question · #58 t2: gate card ("Let's see how Equilibrium Concept is sitting") · #134 t4: gate card · #40 t18: gate card
- Related defect: —
- Status: FIXED
- Fix: d5397b1 + 9f5cf6f + 91dba1c — "too many words" takes the explain-again rung (no authored card), the reply is trimmed to whole sentences within min(60 words, 60 % of the previous reply), the analogy/empathy caps run BEFORE the trim (on a3455f6 the analogy regeneration had undone it: 1,361 → 117 → 798 chars), and a model-written card is held back. Tests: src/tests/chemBatchDAdaptation.test.ts, src/tests/chemBatchEVisuals.test.ts. Live re-check on 90cf2ce (14 lessons): 0/14 replies over budget, 0/14 with a card (before the follow-ups, on a3455f6: 9/21 long, 8/21 with a card).

### CHEM-002 — After a lesson is complete, the next message gets "You've already finished" AND a new quiz card

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 8
- Chemistry concept: `chem.org.aromaticity`
- Lesson/order: #133
- Learner message: ok (sent after "That's Aromaticity finished — nice work")
- Tutor response: "You've already finished Aromaticity. You mastered: Aromaticity. Press 'Start next lesson'…" + MCQ "Cyclobutadiene has a ring with alternating double bonds… Is cyclobutadiene aromatic?"
- Expected behaviour: Only the completion/next-lesson message; no new question for a finished lesson.
- Actual behaviour: A fresh MCQ card is attached to the "already finished" message (same pattern in every completed lesson observed: #1, #39, #77, #96, #115, #133, #169, #170).
- Why it is a defect: Contradictory: tells the learner the lesson is finished while presenting an unanswered quiz card for it; card text may even re-ask a question already answered.
- Reproducibility: Reproduced in every completed lesson observed so far (systemic).
- Also observed (110 occurrences in 95 lessons): #1 (A1) tafter-complete/t15.5; #39 (A3) tafter-complete/t9.5; #77 (A5) tafter-complete/t13.5; #96 (A6) tafter-complete/t11.5; #115 (A7) tafter-complete/t11.5; #2 (A1) tafter-complete/t8.5; #78 (A5) tafter-complete/t6.5; #97 (A6) tafter-complete/t9.5; #116 (A7) tafter-complete/t10.5; #169 (A10) tafter-complete/t6.5; #170 (A10) tafter-complete/t6.5; #133 (A8) tafter-complete/t6.5; #58 (A4) tafter-complete; #134 (A8) tafter-complete/t17.5; #98 (A6) tafter-complete/t6.5; #135 (A8) tafter-complete/t7.5; #3 (A1) t18.5; #4 (A1) t16.5; #5 (A1) t13.5; #6 (A1) t12.5; #8 (A1) t11.5; #9 (A1) t7.5; #10 (A1) t9.5; #11 (A1) t13.5; #16 (A1) t8.5; #17 (A1) t14.5; #18 (A1) t8.5; #19 (A1) t7.5; #171 (A10) t25.5; #173 (A10) t11.5; #174 (A10) t6.5; #175 (A10) t18.5; #176 (A10) t17.5; #180 (A10) t20.5; #182 (A10) t21.5; #184 (A10) t25.5; #185 (A10) t9.5; #186 (A10) t9.5; #20 (A2) t18.5; #22 (A2) t12.5; #24 (A2) t12.5; #25 (A2) t6.5; #26 (A2) t10.5; #28 (A2) t22.5; #32 (A2) t20.5; #33 (A2) t23.5; #34 (A2) t7.5; #36 (A2) t13.5; #43 (A3) t17.5; #52 (A3) t6.5; #53 (A3) t18.5; #54 (A3) t8.5; #55 (A3) t20.5; #64 (A4) t19.5; #67 (A4) t9.5; #73 (A4) t17.5; #75 (A4) t20.5; #76 (A4) t7.5; #80 (A5) t14.5; #82 (A5) t16.5; #83 (A5) t13.5; #84 (A5) t20.5; #85 (A5) t7.5; #91 (A5) t18.5; #92 (A5) t6.5; #94 (A5) t15.5; #95 (A5) t6.5; #100 (A6) t8.5; #101 (A6) t23.5; #104 (A6) t20.5; #105 (A6) t10.5; #109 (A6) t17.5; #111 (A6) t17.5; #112 (A6) t10.5; #114 (A6) t12.5; #119 (A7) t17.5; #120 (A7) t9.5; #124 (A7) t7.5; #126 (A7) t6.5; #128 (A7) t7.5; #129 (A7) t8.5; #136 (A8) t24.5; #138 (A8) t19.5; #139 (A8) t19.5; #142 (A8) t13.5; #146 (A8) t19.5; #148 (A8) t11.5; #149 (A8) t18.5; #153 (A9) t6.5; #157 (A9) t11.5; #158 (A9) t7.5; #163 (A9) t8.5; #165 (A9) t16.5; #167 (A9) t7.5; #168 (A9) t9.5
- Notes on occurrences: #1 tafter-complete: card attached to already-finished message · #39 tafter-complete: card attached to already-finished message · #77 tafter-complete: card attached to already-finished message · #96 tafter-complete: card attached to already-finished message · #115 tafter-complete: card attached to already-finished message · #58 tafter-complete: paused lesson: "on pause" message (no card here)
- Related defect: —
- Status: FIXED
- Fix: 5fad26c — the gate still picked a probe on the "already finished" turn, and it was attached under the close. The close is now the whole turn (route: serveLessonComplete withholds the card). Test: src/tests/chemOpenDefectsBatchG.test.ts.

### CHEM-003 — "memory" turns dump the raw authored explanation as the tutor reply (wall of text, ALL-CAPS, references to units "covered earlier")

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.phenols`
- Lesson/order: #151
- Learner message: ok
- Tutor response: (memory) "Phenol (-OH directly attached to a benzene ring) LOOKS like an alcohol but behaves dramatically differently, because the oxygen's lone pair can DELOCALIZE … (resonance, connecting directly to the electronic effects concept covered earlier) … STRONGER ACID … ORTHO/PARA-DIRECTING …" (~200 words, one paragraph) + MCQ
- Expected behaviour: Learner-level, paced explanation in the tutor voice; no references to lessons the learner has not seen.
- Actual behaviour: A single dense paragraph of internal-style notes with ALL-CAPS emphasis, jargon, and cross-references ("covered earlier", "atmosphere chemistry unit", "arenes reactivity concept") then a quiz card.
- Why it is a defect: Not adapted to a weak-English learner, reads as an internal note, cites nonexistent prior lessons, and tests material in the same breath.
- Reproducibility: Reproduced in #39 t3, #77 t5, #115 t8, #151 t6 (4 accounts) — systemic.
- Also observed (130 occurrences in 92 lessons): #39 (A3) t3; #77 (A5) t5; #115 (A7) t8; #20 (A2) t8; #40 (A3) t12; #79 (A5) t7; #117 (A7) t14; #171 (A10) t8; #88 (A5) t10; #109 (A6) t4; #128 (A7) t3; #49 (A3) t15; #89 (A5) t12; #181 (A10) t6; #31 (A2) t22; #50 (A3) t10; #111 (A6) t7; #90 (A5) t15; #15 (A1) t14; #71 (A4) t12; #131 (A7) t3; #144 (A8) t9; #182 (A10) t4; #164 (A9) t16; #32 (A2) t10; #146 (A8) t8; #183 (A10) t3; #33 (A2) t17; #53 (A3) t7; #73 (A4) t3; #93 (A5) t3; #184 (A10) t8; #166 (A9) t4; #165 (A9) t8; #34 (A2) t3; #148 (A8) t6; #35 (A2) t10; #74 (A4) t9; #36 (A2) t10; #149 (A8) t15; #150 (A8) t7; #37 (A2) t5; #57 (A3) t14; #3 (A1) t15; #4 (A1) t8; #7 (A1) t7; #11 (A1) t10; #12 (A1) t3; #13 (A1) t4; #17 (A1) t11; #172 (A10) t17; #173 (A10) t8; #176 (A10) t14; #177 (A10) t14; #179 (A10) t4; #180 (A10) t8; #22 (A2) t9; #24 (A2) t5; #26 (A2) t7; #30 (A2) t6; #41 (A3) t5; #42 (A3) t5; #61 (A4) t14; #62 (A4) t8; #63 (A4) t11; #64 (A4) t11; #65 (A4) t11; #66 (A4) t9; #67 (A4) t4; #80 (A5) t11; #81 (A5) t9; #83 (A5) t8; #87 (A5) t7; #102 (A6) t12; #104 (A6) t19; #105 (A6) t7; #106 (A6) t9; #107 (A6) t10; #118 (A7) t13; #119 (A7) t14; #136 (A8) t9; #137 (A8) t11; #139 (A8) t7; #141 (A8) t6; #142 (A8) t9; #143 (A8) t8; #151 (A9) t6; #152 (A9) t17; #155 (A9) t12; #156 (A9) t7; #157 (A9) t8; #160 (A9) t6
- Notes on occurrences: #39 t3: ALL-CAPS dump on "quiz me": Graham's law, empirical/molecular formula, uranium enrichment in one block · #77 t5: ALL-CAPS dump incl. "EMF arises…" on "quiz me" · #115 t8: dump says "OZONE… covered earlier in the atmosphere chemistry unit" · #20 t8: ALL-CAPS Moseley/periods/groups/blocks dump on "quiz me" · #40 t12: memory dump on "ok" · #79 t7: ALL-CAPS dump ("FARADAY'S LAWS quan…") on "next question please" · #117 t14: ALL-CAPS dump on "ok" · #171 t8: ALL-CAPS dump: "connecting to the diols/polyols concept covered earlier… (carboxylic acids, covered earlier)"
- Related defect: —
- Status: FIXED
- Fix: d5397b1 — memory-served authored text (both serve paths) passes through authoredProseForLearner.ts at serve time: ALL-CAPS emphasis is lowered (acronyms, formulas, names and Roman numerals kept) and "covered earlier" / "connecting to the X concept" pointers are removed. Serve-time because the bootstrap is create-only (77 such pointers in chemistrySeedAssets.ts). Test on the real phenol asset: src/tests/chemBatchDTextShape.test.ts. Verified by test only.

### CHEM-004 — Mastery is verified on 2-option (yes/no, true/false) cards that can be passed by guessing

- Severity: P2
- Category: Mastery/progress
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 7
- Chemistry concept: `chem.pblock.group16`
- Lesson/order: #115
- Learner message: No / No / No (to three consecutive yes/no cards)
- Tutor response: Verified mastery (TRANSFER, verified=true, "You mastered: Group 16 — Oxygen Family") after cards: "Is the bleaching equally permanent? No/Yes", "…water molecules small and pack tightly? Yes/No", "Can oxygen form OF6? Yes/No".
- Expected behaviour: Mastery evidence that cannot be obtained by chance (≥3–4 options or constructed answers).
- Actual behaviour: All three mastery-counting cards were binary; a random guesser passes with probability 1/8. Same shape in #1 (2 of 3), #96 (2 of 3), #133 (t6 2-option), #77 (4 of 6).
- Why it is a defect: "Mastered" is shown to the learner on evidence that is largely chance, so mastery does not reflect understanding.
- Reproducibility: Systemic: most lessons end on 2-option cards.
- Also observed (147 occurrences in 140 lessons): #1 (A1) tt13-14/t-; #96 (A6) tt9-11/t-; #133 (A8) tt6/t-; #98 (A6) tt3-t6; #40 (A3) tt17,t23; #49 (A3) tt15/t-; #129 (A7) tt2,t5,t6/t-; #53 (A3) tt2,t14/t-; #106 (A6) tt7,t10,t14/t-; #5 (A1) t-; #6 (A1) t-; #8 (A1) t-; #9 (A1) t-; #11 (A1) t-; #12 (A1) t-; #15 (A1) t-; #16 (A1) t-; #17 (A1) t-; #18 (A1) t-; #169 (A10) t-; #171 (A10) t-; #172 (A10) t-; #174 (A10) t-; #181 (A10) t-; #184 (A10) t-; #185 (A10) t-; #20 (A2) t-; #21 (A2) t-; #22 (A2) t-; #23 (A2) t-; #24 (A2) t-; #25 (A2) t-; #26 (A2) t-; #27 (A2) t-; #28 (A2) t-; #29 (A2) t-; #30 (A2) t-; #31 (A2) t-; #32 (A2) t-; #33 (A2) t-; #34 (A2) t-; #35 (A2) t-; #36 (A2) t-; #38 (A2) t-; #41 (A3) t-; #43 (A3) t-; #44 (A3) t-; #45 (A3) t-; #46 (A3) t-; #47 (A3) t-; #48 (A3) t-; #51 (A3) t-; #52 (A3) t-; #54 (A3) t-; #55 (A3) t-; #56 (A3) t-; #57 (A3) t-; #59 (A4) t-; #61 (A4) t-; #62 (A4) t-; #63 (A4) t-; #64 (A4) t-; #65 (A4) t-; #66 (A4) t-; #67 (A4) t-; #68 (A4) t-; #69 (A4) t-; #70 (A4) t-; #73 (A4) t-; #74 (A4) t-; #75 (A4) t-; #76 (A4) t-; #77 (A5) t-; #78 (A5) t-; #79 (A5) t-; #80 (A5) t-; #81 (A5) t-; #82 (A5) t-; #83 (A5) t-; #84 (A5) t-; #85 (A5) t-; #86 (A5) t-; #89 (A5) t-; #90 (A5) t-; #91 (A5) t-; #93 (A5) t-; #94 (A5) t-; #95 (A5) t-; #100 (A6) t-; #101 (A6) t-; #102 (A6) t-; #103 (A6) t-; #104 (A6) t-; #105 (A6) t-; #107 (A6) t-; #108 (A6) t-; #109 (A6) t-; #110 (A6) t-; #111 (A6) t-; #112 (A6) t-; #114 (A6) t-; #115 (A7) t-; #116 (A7) t-; #117 (A7) t-; #118 (A7) t-; #120 (A7) t-; #121 (A7) t-; #124 (A7) t-; #125 (A7) t-; #126 (A7) t-; #127 (A7) t-; #128 (A7) t-; #130 (A7) t-; #131 (A7) t-; #132 (A7) t-; #134 (A8) t-; #136 (A8) t-; #137 (A8) t-; #139 (A8) t-; #140 (A8) t-; #141 (A8) t-; #142 (A8) t-; #143 (A8) t-; #145 (A8) t-; #147 (A8) t-; #148 (A8) t-; #149 (A8) t-; #150 (A8) t-; #151 (A9) t-; #152 (A9) t-; #153 (A9) t-; #154 (A9) t-; #156 (A9) t-; #157 (A9) t-; #159 (A9) t-; #160 (A9) t-; #162 (A9) t-; #163 (A9) t-; #164 (A9) t-; #165 (A9) t-
- Notes on occurrences: #1 tt13-14: 2 of 3 counted cards are 2-option · #96 tt9-11: two of three counted cards 2-option, one with an absurd distractor ("This is impossible") · #133 tt6: 2-option card closes the lesson · #98 tt3-t6: 3 of 4 counted cards are trivial or binary · #40 tt17,t23: 2-option "He or NH₃? Why?" card whose options give no "why" · #49 tt15: "Is heat (q) a state function or a path function? Justify." as a 2-option card; options contain no justification · #129 tt2,t5,t6: four of five cards are 2-option; mastery reached at t8 · #53 tt2,t14: options "Incorrect / Correct" on a claim card (no Yes/No or True/False wording)
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: d5397b1 — production redrive 2026-10-06: 16 of 35 distinct cards served had 2 options; 12 of those 16 are authored probes (true/false and yes/no items of the 3-probe contract), 4 model-written. Whether a 2-option card may count toward mastery is an OWNER DECISION (also BIO-019); not changed. **2026-10-07 pass (2350ff6):** Owner decision 2026-10-07 ("practice only", applied where reachable): a correct answer on a 2-option card moves the lesson on but banks no verified mastery credit when the concept holds at least 3 authored cards with 3+ options (`turnContract.certifiesMastery`, hoisted once as `certifiedForMastery`; the pool is read by `assets/probePool.ts`, one concept, take 60). Where fewer exist (measured 2026-10-07: every Biology, English and CS concept, 166 Physics, 152 Chemistry, 22 Mathematics) a 2-option card still counts, by the same decision, until more 3+-option cards are authored. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-005 — Cards test facts/terms that the lesson has not yet taught

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 6
- Chemistry concept: `chem.surface.adsorption`
- Lesson/order: #96
- Learner message: ok
- Tutor response: (gate) "Physisorption releases roughly 20 kJ/mol and chemisorption roughly 200 kJ/mol. Roughly how many times stronger is chemisorption?" — later cards ask about chemisorption activation energy and multilayer build-up.
- Expected behaviour: Energies, activation energy and monolayer/multilayer behaviour taught before they are tested.
- Actual behaviour: The transcript taught only the adsorption/absorption distinction (silica gel, sponge); physisorption/chemisorption energies, activation energy, multilayer and entropy/enthalpy conditions were never explained before being tested.
- Why it is a defect: Questions the learner could not have learned from the lesson; wrong answers then say "Not quite — the answer is…" which is test-before-teach.
- Reproducibility: Seen in #96, #1 ("homogeneous mixture" never taught), #115 (bleaching, H-bonding, expanded octet), #39 (Graham's law card served the same message as the first explanation).
- Also observed (10 occurrences in 10 lessons): #1 (A1) tt14; #115 (A7) tt9-11; #39 (A3) tt3; #169 (A10) tt2-t6; #170 (A10) tafter-complete; #116 (A7) tt1-t3; #58 (A4) tt1,t11; #135 (A8) tt4-t7; #136 (A8) tt3-t24; #17 (A1) tt4
- Notes on occurrences: #1 tt14: "Homogeneous mixture" option appears; term not taught · #115 tt9-11: SO2 vs Cl2 bleaching, hydrogen bonding in H2O vs H2S, OF6 expanded octet never taught in the transcript · #39 tt3: Graham's-law card in the same message that first introduces Graham's law · #169 tt2-t6: peptide-bond counting, covalent vs non-covalent forces, denaturation and ribonuclease card all asked after only a picture-description turn · #170 tafter-complete: DNA vs RNA question asked though the lesson only covered replication base pairing · #116 tt1-t3: displacement-series and HF/oxidising-power questions asked after a 2-sentence "F2 has a weak bond" turn · #58 tt1,t11: first reply after "ok" is a Q-vs-K calculation problem; later card needs ΔG°=-RT lnK, neither taught · #135 tt4-t7: endo/exo kinetic vs thermodynamic control and Woodward–Hoffmann suprafacial/antarafacial rules asked after only a figure walkthrough; lesson mastered in 7 turns
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Card selection prefers cards whose stem and key words the learner has already met in this lesson (`teachingActionRepository.preferTaughtProbes`, at least half the content words, and any quantity in the key must already have been stated); when none qualifies every card stays available. Heuristic, so partial. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-006 — Lesson "Group 16 — Oxygen Family" teaches only the Contact Process; the lesson content is never taught but is tested and marked mastered

- Severity: P1
- Category: Lesson flow
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 7
- Chemistry concept: `chem.pblock.group16`
- Lesson/order: #115
- Learner message: ok
- Tutor response: (figure: "Contact Process for Sulfuric Acid") "Imagine a small pile of bright yellow sulfur crystals tossed into a roaring campfire… Contact Process… S → SO₂ → SO₃ → H₂SO₄"
- Expected behaviour: Group 16 members, ns²np⁴, trends down the group, why oxygen differs from S/Se/Te.
- Actual behaviour: The only visual and the first explanation are the industrial Contact Process. Group trends, O vs S bonding, H2O vs H2S boiling points, SO2/Cl2 bleaching, SF6 vs OF6 appear only as quiz cards and one memory dump. Lesson ends "mastered".
- Why it is a defect: The visual/teaching does not correspond to the lesson concept; mastery is awarded on untaught content.
- Reproducibility: Observed once (account 7 #115). Not yet re-run on another account.
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: 5e53430 — the only figure was a cached, model-generated "Contact Process" flow (not in the repo), and the teaching followed it. A curated Tier-0 figure (existing buildStatisticsBarChartScene: Group 16 hydride boiling points, water the outlier) now outranks generation for chem.pblock.group16. Verified by test (src/tests/chem006Group16Figure.test.ts). That the model's teaching then covers the group trends is model behaviour and has not been re-checked live. **2026-10-07 pass (2350ff6):** The lesson's KG syllabus line is now in the chat and opening prompts with the rule to teach each part, in order, before asking about it and to promise nothing outside it (`lessonDriftGuard.lessonScopeRule`). Prompt-level, so not guaranteed. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-007 — Worked example claims 0.059 V "is exactly" the figure's +0.089 V (explained away as rounding)

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.concentration-cell`
- Lesson/order: #77
- Learner message: give me example
- Tutor response: "…E = 0.0296 × 2 = 0.0592 V. So the cell potential is +0.059 V, exactly what the green label 'Ecell = +0.089 V…' on the figure is indicating (the small difference is due to rounding and temperature)."
- Expected behaviour: Either state the concentrations the figure uses (0.089 V ⇒ ratio ≈1000:1) or say the example is different.
- Actual behaviour: 0.0592 V vs 0.089 V is a 50 % difference, not rounding. The figure's ΔG (-17.17 kJ/mol) and E correspond to a 1000:1 ratio, not the 100:1 ratio of the example (0.01 M vs 1 M).
- Why it is a defect: Objectively false statement that the two numbers agree; confuses a learner checking the tutor's sum against the picture.
- Reproducibility: Observed once (#77); prompted by "give me example".
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-008 — Tutor describes figure content the figure does not show (concentrations / "larger EMF value" shows which side is richer); opening says Zn–Zn cell but figure is Cu–Cu

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.concentration-cell`
- Lesson/order: #77
- Learner message: show me step by step
- Tutor response: "the solution on the right is more concentrated than the one on the left (the figure shows this by the larger EMF value)."
- Expected behaviour: Statements about the picture that can be checked on the picture.
- Actual behaviour: The figure carries one EMF number and no concentrations; one value cannot indicate which half-cell is richer. The opening scenario is a zinc–zinc cell but the figure is a copper concentration cell.
- Why it is a defect: Visual-to-text mismatch; learner told to read something that is not there.
- Reproducibility: Observed once (#77).
- Related defect: —
- Status: DEFERRED
- Fix: **2026-10-07 pass (2350ff6):** The pointer now names the figure actually drawn ("Copper Concentration Cell"), but what a reply CLAIMS the figure shows ("the larger EMF value shows which side is richer") is model narration; no deterministic check compares a reply's claims with a figure's contents. Needs its own design (narration grounded in the figure's semantics).

### CHEM-009 — Wrong mass ratio: "oxygen to hydrogen is about 8.9:1" for water (≈7.9:1, ≈8:1) — contradicts the lesson's own 8 g : 1 g

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 1
- Chemistry concept: `chem.found.matter`
- Lesson/order: #1
- Learner message: 88.8% (card answer)
- Tutor response: "For water, the mass ratio of oxygen to hydrogen is always about 8.9:1, giving 88.8% oxygen by mass."
- Expected behaviour: 88.8 % O and 11.2 % H ⇒ O:H ≈ 7.9:1 (≈8:1, as the tutor itself said at t5).
- Actual behaviour: 8.9:1 stated (88.8/10 mis-division).
- Why it is a defect: Numerical error in feedback of a numeric card, contradicting an earlier turn in the same lesson.
- Reproducibility: Observed once (#1 t13).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-010 — Baked cake presented as a "compound"; ingredient list mismatches (flour/sugar/cocoa → "flour or eggs")

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 1
- Chemistry concept: `chem.found.matter`
- Lesson/order: #1
- Learner message: explain again
- Tutor response: "…once you bake them into a cake, the ingredients chemically combine into something entirely new… you can no longer separate them back into raw flour or eggs by physical means — that is a compound."
- Expected behaviour: An analogy that does not mislabel a complex mixture as a compound.
- Actual behaviour: A cake is a heterogeneous mixture of many compounds (some chemically changed); it is not a compound. Teaches the wrong sorting rule in the very lesson on element/compound/mixture. "eggs" were never in the ingredient list.
- Why it is a defect: Objectively wrong classification, in a foundations lesson.
- Reproducibility: Observed once (#1 t6).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-011 — "10 g oxygen + 1 g hydrogen mixed… the extra 2 grams of oxygen floats around freely" — conflates an unreacted mixture with a reacted one

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 1
- Chemistry concept: `chem.found.matter`
- Lesson/order: #1
- Learner message: give me example with numbers
- Tutor response: "…imagine you take 10 grams of oxygen and 1 gram of hydrogen and mix them together in a container without reacting them. You simply have a mixture where the extra 2 grams of oxygen floats around freely because a mixture's composition is flexible…"
- Expected behaviour: If nothing reacts there is no "extra" 2 g; all 11 g are simply a mixture. (Excess oxygen arises only after reaction.)
- Actual behaviour: Muddled example that blends mixture vs compound-forming reaction.
- Why it is a defect: The numbers example confuses the very distinction being taught.
- Reproducibility: Observed once (#1 t5).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-012 — Contradiction in one lesson: brass "pulled apart with a chemical process (adding acid)" vs "separated without a chemical reaction"

- Severity: P3
- Category: Teaching
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 1
- Chemistry concept: `chem.found.matter`
- Lesson/order: #1
- Learner message: ok / Homogeneous mixture
- Tutor response: t1: "use a chemical process (like adding acid) to pull the zinc out, showing the rod is… a mixture". t15: "…can be separated without a chemical reaction."
- Expected behaviour: A consistent account: mixtures are separable by physical means.
- Actual behaviour: The first explanation uses a chemical separation as evidence of a mixture; the closing feedback says no chemical reaction is needed.
- Why it is a defect: Self-contradiction; the t1 logic does not show "mixture".
- Reproducibility: Observed once (#1).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-013 — Nature of Matter figure draws "compound" and "mixture" the same way (two touching spheres each)

- Severity: P3
- Category: Visuals
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 1
- Chemistry concept: `chem.found.matter`
- Lesson/order: #1
- Learner message: (figure served on t1)
- Tutor response: sceneSpec: compound = green+red particles at x=3 and x=3.5 (radius 0.5); mixture = purple+orange at x=5 and x=5.5 (radius 0.5).
- Expected behaviour: Visibly different representation (bonded unit vs separate, intermixed particles).
- Actual behaviour: Both are two overlapping spheres; only colour differs, so the picture cannot show "bonded vs just mixed". Tutor later says the mixture box shows "markers mixed together".
- Why it is a defect: Visual does not carry the distinction the lesson is about. (Judged from the scene payload; not viewed in a browser.)
- Reproducibility: Observed in the payload of #1.
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** chem.found.matter now owns a curated figure — three columns, Element / Compound / Mixture, worded from the EB entry — so the live-generated two-spheres scene is no longer reached (`conceptSceneParams.ts`). Test: src/tests/remainingDefectFixes20261007.test.ts. **Live re-drive 2026-10-10:** chem.found.matter served the curated "Elements, Compounds and Mixtures" figure.

### CHEM-014 — Sulfur dioxide called "a yellow gas" (SO₂ is colourless — tutor said "colourless" two turns earlier)

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 7
- Chemistry concept: `chem.pblock.group16`
- Lesson/order: #115
- Learner message: what is this?
- Tutor response: "Burn sulfur to produce sulfur dioxide (SO₂) – a yellow gas released when elemental sulfur reacts with oxygen."
- Expected behaviour: SO₂: colourless, pungent gas (sulfur is the yellow solid).
- Actual behaviour: Colour of the solid attributed to the gas; t2 says "colourless gas".
- Why it is a defect: Factual error and internal contradiction.
- Reproducibility: Observed once (#115).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-015 — "give me example with numbers" / "show me step by step" answered without numbers / without steps

- Severity: P2
- Category: Adaptation
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 7
- Chemistry concept: `chem.pblock.group16`
- Lesson/order: #115
- Learner message: give me example with numbers
- Tutor response: "This is genuinely tricky — let me try a completely different angle. Think of making… a piece of furniture: you cannot just snap wood into a finished table in one go…"
- Expected behaviour: A numeric example (e.g. moles/masses in the Contact Process).
- Actual behaviour: No numbers; generic analogy. (#96 t5: "show me step by step" returned three plain sentences, no steps.)
- Why it is a defect: Request not honoured.
- Reproducibility: Seen in #115 t7 and #96 t5.
- Also observed (55 occurrences in 46 lessons): #96 (A6) t5/t6; #20 (A2) t11; #58 (A4) t13; #171 (A10) t17; #88 (A5) tt7; #163 (A9) t2; #181 (A10) t10; #183 (A10) t10; #21 (A2) t2; #23 (A2) t2; #28 (A2) t5/t12; #29 (A2) t5; #30 (A2) t10; #33 (A2) t9/t10; #35 (A2) t17; #37 (A2) t2; #41 (A3) t4; #42 (A3) t2; #43 (A3) t9; #44 (A3) t7; #46 (A3) t3/t11; #47 (A3) t8; #49 (A3) t8; #55 (A3) t16; #64 (A4) t16; #65 (A4) t11; #69 (A4) t9; #81 (A5) t7; #82 (A5) t10; #99 (A6) t9; #102 (A6) t6; #108 (A6) t8; #113 (A6) t14; #114 (A6) t2; #115 (A7) t7; #118 (A7) t9; #119 (A7) t13; #122 (A7) t14; #138 (A8) t17; #139 (A8) t10; #141 (A8) t2; #152 (A9) t10; #154 (A9) t10; #160 (A9) t15; #162 (A9) t10; #164 (A9) t5
- Notes on occurrences: #96 t5: step-by-step request answered in 3 unnumbered sentences · #20 t11: "show me step by step" -> "How did you decide that elements in the same row … should have very similar chemical behavior?" (a Socratic question about a card answer from 5 turns earlier) · #58 t13: "give me example with numbers" -> ΔG° = -RT ln K with K=10, no numeric result given ("a negative number of kilojoules per mole") · #171 t17: "give me example with numbers" -> three-pronged anchor analogy, no numbers · #88 tt7: "example with numbers" answered with a Pt hydrogenation example; numeric content present (partial) · #163 t2: "give me example with numbers" -> kitchen-sponge analogy (the table with numbers follows later in the same reply)
- Related defect: —
- Status: FIXED
- Fix: d5397b1 — a reply to "with numbers" with fewer than two numbers, or to "step by step" with fewer than two step lines, gets one regeneration with the shape stated, kept only if it complies (adaptationRequest.ts, logged [adaptation-check]). Test: src/tests/chemBatchDAdaptation.test.ts. Live re-check 2026-10-05/06 (disposable accounts, 35 lessons): 35/35 "with numbers" and 35/35 "step by step" replies had the asked-for shape; production logged the repairs (e.g. steps 93 → 875 chars).

### CHEM-016 — Three correct card answers earned no mastery credit (counters stayed 0/0) and the lesson ended as "paused" after one "i dont know"

- Severity: P1
- Category: Mastery/progress
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.phenols`
- Lesson/order: #151
- Learner message: i dont know (to the open question "which plants in this garden receive the most water?")
- Tutor response: "Let's pause Phenols here for now. Worth another look later: Phenols." (lessonComplete.complete=true, mastered=[], needsReview=["chem.alc.phenols"])
- Expected behaviour: Correct answers at t4, t8, t13 credited; a single "i dont know" gets a hint, not an end-of-lesson.
- Actual behaviour: mastery.checkCorrect/practiceCorrect stayed 0 through 17 turns despite 3 correct card answers (t4, t8, t13); lesson closed on the first "i dont know" at t17, marked needs-review.
- Why it is a defect: Progress does not reflect learner performance; a weak learner is ejected from the lesson.
- Reproducibility: Observed once (#151); counters reset pattern worth re-checking on other accounts.
- Also observed (155 occurrences in 100 lessons): #58 (A4) tt15/t15; #152 (A9) tt27/t27; #171 (A10) tt25/t25; #155 (A9) tt30/t30; #123 (A7) tt8/t8; #156 (A9) tt11/t11; #68 (A4) tt14/t14; #88 (A5) tt22/t22; #109 (A6) tt17/t17; #143 (A8) tt16/t16; #127 (A7) tt18/t18; #161 (A9) tt22/t22; #180 (A10) tt20/t20; #30 (A2) tt25/t25; #49 (A3) tt17/t17; #89 (A5) tt21/t21; #110 (A6) tt19/t19; #181 (A10) tt16/t16; #162 (A9) tt15/t15; #70 (A4) tt14/t14; #31 (A2) tt30/t30; #14 (A1) tt19/t19; #50 (A3) tt20/t20; #130 (A7) tt18/t18; #111 (A6) tt17/t17; #90 (A5) tt23/t23; #15 (A1) tt20/t20; #71 (A4) tt21/t21; #131 (A7) tt16/t16; #144 (A8) tt25/t25; #145 (A8) tt15/t15; #182 (A10) tt21/t21; #132 (A7) tt9.5/t9; #91 (A5) tt18/t18; #164 (A9) tt20/t20; #51 (A3) tt17/t17; #32 (A2) tt20/t20; #113 (A6) tt20/t20; #146 (A8) tt19/t19; #183 (A10) tt24/t24; #72 (A4) tt21/t21; #73 (A4) tt17/t17; #93 (A5) tt19/t19; #184 (A10) tt25.5/t25; #166 (A9) tt9.5/t9; #147 (A8) tt20/t20; #35 (A2) tt18/t18; #56 (A3) tt25/t25; #75 (A4) tt20/t20; #149 (A8) tt18.5/t18; #37 (A2) tt16/t16; #38 (A2) tt9/t9; #57 (A3) tt21.5/t21; #159 (A9) tt16.5/t16; #107 (A6) tt20/t20; #7 (A1) t19; #12 (A1) t21; #13 (A1) t17; #172 (A10) t26; #177 (A10) t21; #178 (A10) t10; #179 (A10) t20; #21 (A2) t17; #23 (A2) t16; #27 (A2) t14; #28 (A2) t22; #29 (A2) t19; #41 (A3) t24; #42 (A3) t18; #45 (A3) t9; #46 (A3) t26; #47 (A3) t11; #48 (A3) t12; #60 (A4) t13; #61 (A4) t24; #62 (A4) t16; #63 (A4) t18; #64 (A4) t19; #65 (A4) t25; #66 (A4) t19; #81 (A5) t17; #84 (A5) t20; #87 (A5) t29; #99 (A6) t19; #102 (A6) t19; #103 (A6) t14; #104 (A6) t20; #106 (A6) t20; #108 (A6) t17; #118 (A7) t18; #121 (A7) t19; #122 (A7) t22; #125 (A7) t25; #136 (A8) t24; #137 (A8) t25; #138 (A8) t19; #141 (A8) t28; #151 (A9) t17; #154 (A9) t19; #160 (A9) t17
- Notes on occurrences: #58 tt15: third-person: counters c=0 p=0 throughout 15 turns despite right answers at t4 and t8; "i dont understand" at t15 ends the lesson "Let's pause Equilibrium Concept here for now" (needsReview) · #152 tt27: counters 0/0 for 27 turns despite correct card answers at t12, t18, t23; lesson ended "Let's pause Ethers here for now" in reply to "continue" · #171 tt25: paused right after a CORRECT answer at c1/p1: "Correct — well done… Let's pause Lipids here for now" (needsReview) after 25 turns · #155 tt30: counters c0/p0 for 30 turns despite right answers at t6, t13, t18; lesson paused on "i dont understand this picture" · #123 tt8: paused after 8 turns right after three consecutive wrong answers (t6, t7, t8) — "Not quite" and pause in the same message · #156 tt11: paused after three consecutive wrong answers (t9, t10, t11) at c1/p0 · #68 tt14: Paused after "why?" with CHECK phase after several correct answers · #88 tt22: Paused at c0p0 after "continue"
- Related defect: —
- Status: FIXED
- Fix: d35122c — production rows (read-only): right/wrong alternation at GUIDE; each right answer moved GUIDE→CHECK without credit (by design) and the next miss dropped it back, so at the 12-turn budget the phase was GUIDE and the 6-turn extension was refused. Two or more correct answers at GUIDE without two misses in a row now qualify (conceptBudget.ts qualifiesForBudgetExtension). The extension buys turns only; counters still move only on CHECK/PRACTICE credit. Test: src/tests/conceptBudgetExtension.test.ts. Verified by test only.

### CHEM-017 — Same question and same explanation repeated within one lesson (phenol EAS card asked twice; pKa 10-vs-16 point restated 5 times)

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.phenols`
- Lesson/order: #151
- Learner message: Yes (wrong, then re-asked)
- Tutor response: t2 card "Phenol undergoes electrophilic substitution far more readily than benzene because the –OH group ______ the ring." is served again verbatim at t12 (options shuffled).
- Expected behaviour: A new question or a different angle.
- Actual behaviour: Exact repeat; pKa/million-times point reappears in t1, t9, t10, t11, t15. Also seen: #77 t13 repeats the t5 card, #1/#39/#77 after-complete cards repeat earlier questions.
- Why it is a defect: Excessive repetition; learner receives the same card/explanation instead of progress.
- Reproducibility: Seen in #151, #77, #39.
- Also observed (3 occurrences in 3 lessons): #2 (A1) tt2/t7; #116 (A7) tt2/t10; #20 (A2) tt14-t18
- Notes on occurrences: #2 tt2/t7: same card twice, the repeat is the final mastery card · #116 tt2/t10: "Can iodine (I₂) displace chlorine from NaCl?" asked twice, last card of lesson; after-complete card repeats the HF card · #20 tt14-t18: every card repeated
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: 957978b + afa7322 — same mechanism as CHEM-033, reproduced in production on the same lesson (chem.alc.phenols, A → B → A in one tab). Not deployed (Vercel 402); production re-test pending.

### CHEM-018 — Wrong-answer feedback talks about the student in the third person ("The learner assumed…")

- Severity: P3
- Category: Teaching
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.concentration-cell`
- Lesson/order: #77
- Learner message: Yes
- Tutor response: "Not quite — the answer is: No — … The learner assumed that a zero standard potential forces the cell voltage to be zero."
- Expected behaviour: Second person ("You assumed…").
- Actual behaviour: Internal, third-person phrasing leaked into learner-facing feedback.
- Why it is a defect: Reads as an internal note and is slightly alienating.
- Reproducibility: Observed once (#77 t10).
- Also observed (7 occurrences in 6 lessons): #97 (A6) t4; #7 (A1) t3; #53 (A3) t3; #54 (A3) t4; #77 (A5) t10; #156 (A9) t9
- Notes on occurrences: #97 t4: "The learner identified the correct terminology…"
- Related defect: —
- Status: FIXED
- Fix: c4a6afc (BIO-015) — a sentence that starts "The learner/The student" is rewritten to the second person ("You assumed…"), on the served text and the assembled graded text. The observed #77 sentence verified in src/tests/chemOpenDefectsBatchG.test.ts.

### CHEM-019 — "explain simpler" answered with leftover "That's right —" as if the learner had just answered

- Severity: P3
- Category: Adaptation
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.phenols`
- Lesson/order: #151
- Learner message: explain simpler
- Tutor response: "That's right — the –OH group in phenol pushes some of its lone‑pair electrons into the aromatic ring. Think of the benzene ring as a round table with five seats…"
- Expected behaviour: No verdict (nothing to grade); also a six-carbon ring has six seats.
- Actual behaviour: Stale praise prefix; analogy with "five seats" for a 6-carbon ring.
- Why it is a defect: Confusing feedback and a small analogy error.
- Reproducibility: Observed once (#151 t14).
- Related defect: —
- Status: FIXED
- Fix: d5397b1 (CHEM-075) — "explain simpler" reads as a request (readsAsRequestToTutor), and on an ungraded request turn the opening "That's right —" sentence is stripped. Verified on the #151 text in src/tests/chemOpenDefectsBatchG.test.ts. The "five seats" analogy slip is model prose and is not checked.

### CHEM-020 — Reply promises a "quick check — pick the statement…" but no card is attached

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.phenols`
- Lesson/order: #151
- Learner message: too many words
- Tutor response: "Here's a quick check—pick the statement that best explains why phenol is a stronger acid than ethanol." (no options, no card)
- Expected behaviour: A card with options, or a shorter explanation.
- Actual behaviour: Prompt without options; next turn ("ok") jumps to a different question (Br₂ water), dropping the check.
- Why it is a defect: Broken flow; the learner cannot answer what was asked.
- Reproducibility: Observed once (#151 t5).
- Also observed (1 occurrence in 1 lesson): #122 (A7) t12
- Notes on occurrences: #122 t12: "I hear you—it’s okay to feel stuck. Let’s simplify things with a quick choice." — no choice/card follows
- Related defect: —
- Status: FIXED
- Fix: 5fad26c — "Here's a quick check—pick the statement…" with no card is an undelivered check; it is removed (the concept fallback teaches when nothing else is left). gateAssessment.ts INSTRUCTS_A_CHOICE. Test: src/tests/chemOpenDefectsBatchG.test.ts.

### CHEM-021 — Reply asks the learner what to do next while a quiz card is attached ("let me know what you'd like to do next")

- Severity: P3
- Category: Lesson flow
- Date/time: 2026-10-05 14:35 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.concentration-cell`
- Lesson/order: #77
- Learner message: ok
- Tutor response: "Whenever you're ready, we can try a short practice problem… or we can move on to the next idea. Let me know what you'd like to do next." + MCQ "True or false…"
- Expected behaviour: Either a choice or a card.
- Actual behaviour: Both at once.
- Why it is a defect: Mixed signals.
- Reproducibility: Observed once (#77 t8).
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: 5fad26c, e09efe5 — production redrive 2026-10-06 found the same mechanism in other wording beside an attached card in 9 of 143 turns ("When you feel ready, just let me know and we'll move on to a short multiple‑choice quiz", "…I'll give you the first question", "Let's pause the quiz…"), and showed the drop never ran when the card was a held one re-offered under the reply. e09efe5 widens the phrase set and runs the same drop on the card actually served. Test: src/tests/redriveDeferralBesideCard.test.ts. NOT DEPLOYED: Vercel refused the build for e09efe5 ("Account is blocked", Fluid Active CPU); production still serves 05b7868, so the production re-test is pending.

### CHEM-022 — Figure served for a lesson belongs to a different (adjacent/downstream) concept than the lesson being taught

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-05 14:37 UTC
- Account: Account 10
- Chemistry concept: `chem.bio.nucleic-acids`
- Lesson/order: #170
- Learner message: ok (first turn)
- Tutor response: (figure: "DNA Replication Steps") "Look at the step box labelled 'Base pairing with free nucleotides' in the diagram on your screen. This step shows how each strand of the unzipped DNA acts as a template…"
- Expected behaviour: A nucleotide / DNA-vs-RNA structure figure matching the lesson "Nucleic Acids".
- Actual behaviour: The only figure is a DNA-replication flow chart. The tutor then teaches replication steps instead of nucleotide structure and the DNA/RNA difference; nucleotide parts (sugar/phosphate/base) from the opening are never revisited.
- Why it is a defect: Visual does not match the lesson concept; the lesson drifts to the figure's topic, and an after-lesson card asks "Do DNA and RNA differ only in having T instead of U?" which was not taught.
- Reproducibility: Seen on #170 and #115 (Contact Process figure for Group 16) — 2 accounts.
- Also observed (7 occurrences in 7 lessons): #115 (A7) tt1; #151 (A9) tt1; #20 (A2) tt1/t8; #79 (A5) tt1; #14 (A1) t16; #52 (A3) tt1; #92 (A5) t1
- Notes on occurrences: #115 tt1: Contact Process figure for "Group 16 — Oxygen Family" (see CHEM-006) · #151 tt1: Cumene-process flowchart for "Phenols" (weaker: related but not the lesson's acid/EAS content) · #20 tt1/t8: "Periodic Trends: Na vs Cl" figure for the modern-periodic-law lesson · #79 tt1: "Electrolysis of Molten NaCl" for "Electrolysis and Faraday's Laws": no charge/mass/Faraday element; the quantitative lesson content is not pictured · #14 t16: "quiz me" -> "Take a look at the figure beside this message — it's a general illustration related to the topic" (generic Bohr-shell figure for Quantum Numbers) · #52 tt1: "Born–Haber Cycle: Formation of NaCl" figure for chem.thermo.bond-enthalpy · #92 t1: degraded opener: "Take a look at the figure beside this message — it’s a general illustration related to the topic."
- Related defect: —
- Status: PARTIALLY FIXED
- Fix: 440b55c — chem.bio.nucleic-acids now has a curated DNA/RNA comparison figure (three differences, A–T/G–C pairing; from the EB entry) instead of the replication flow. Not fixed: the other occurrences (#20 Na vs Cl trends for modern periodic law, #79, #151). Test: src/tests/chemBatchEVisuals.test.ts.

### CHEM-023 — Answer options carry explanatory parentheticals / extra reasoning that give away the correct option

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:37 UTC
- Account: Account 10
- Chemistry concept: `chem.bio.nucleic-acids`
- Lesson/order: #170
- Learner message: 5'-GGGCAT-3' (complement antiparallel: A pairs T, T pairs A, G pairs C)
- Tutor response: MCQ options: "5'-GGGCAT-3' (complement antiparallel: A pairs T, T pairs A, G pairs C)" / "5'-TACGGG-3' (complement written in same direction)" / "5'-ATGCCC-3' (identical sequence)"
- Expected behaviour: Plain sequences as options; reasoning not embedded in the choice.
- Actual behaviour: Each option carries its own rationale, and the right one states the rule needed to solve it. Same on #170 t5 ("Hydrogen bonds (A–T: 2, G–C: 3)" is the only option with detail; the stem also asks "…and why is this important for replication?" but no option answers "why").
- Why it is a defect: Option text gives the answer away and the stem asks something the options do not answer.
- Reproducibility: Seen on #170 (2 cards), #39 t3 (correct option 3× longer, with the explanation inside), #151 t3 (correct option is a full explanatory sentence vs. "This must be an error").
- Also observed (9 occurrences in 8 lessons): #39 (A3) t3; #151 (A9) tt3; #2 (A1) tt4; #97 (A6) tt9; #116 (A7) tt7; #79 (A5) tt14; #117 (A7) tt14; #152 (A9) tt11/tt4
- Notes on occurrences: #39 t3: correct option is the only long explanatory one · #151 tt3: distractor "This must be an error" vs full-sentence correct option · #2 tt4: correct option is a ~60-word paragraph vs. "It cannot have evaporated" · #97 tt9: closing card: "Nothing in the sugar solution, but a bright visible path through the milk" vs "The same in both" · #116 tt7: correct option 50+ words vs distractor "This must be an error" · #79 tt14: correct option contains the full reasoning "(doubling current AND doubling time both double the total charge Q=It, so charge quadruples overall)" · #117 tt14: Bartlett card: correct option is a full sentence vs distractor "This must have been a measurement error, since noble gases are proven to be completely and permanently unreactive under all conditions" · #152 tt11: distractor "This must be an error"
- Related defect: —
- Status: FIXED — production row converged 2026-10-10 (read-back verified)
- Fix: **2026-10-07 pass (2350ff6):** Authored card corrected in the repo (`src/lib/teaching/assets/chemistrySeedAssets.ts`). The production row is not yet updated: the asset bootstrap is create-only, so the edit reaches production only through an owner-approved convergence write (`scripts/assets/converge-probe-edits.ts --apply`, backup first, precedent docs/qa/backups/probe-converge-2026-10-06.json). The options are plain sequences with no explanatory parentheticals. **2026-10-10:** converged to production (owner-approved write; the 7 production rows matched the old corpus exactly before the write; read-back after the write matches the corpus 7/7 on stem, choices and key; backup docs/qa/backups/probe-converge-2026-10-10.json).

### CHEM-024 — First reply after "ok" presupposes a learner attempt that never happened; lesson then teaches nothing and is marked mastered from cards alone

- Severity: P1
- Category: Lesson flow
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.conductance`
- Lesson/order: #78
- Learner message: ok
- Tutor response: "Can you walk me through how you thought you could calculate the limiting molar conductivity of acetic acid?"
- Expected behaviour: The first teaching turn explains conductivity κ and molar conductivity Λm (the lesson goal).
- Actual behaviour: The learner has done no calculation; the reply refers to a non-existent attempt and teaches nothing. No explanation of κ, Λm, Kohlrausch's law or dilution is ever given — they appear only as card feedback. Lesson ends "You mastered: Electrolytic Conductance" after 6 turns.
- Why it is a defect: Learner is asked to justify something they never did, receives zero instruction, and is told they mastered the lesson.
- Reproducibility: Observed once (#78, account 5); earlier lessons #1, #2 taught normally.
- Related defect: —
- Status: PARTIALLY FIXED
- Fix: ef772e6 — the first-turn question about an attempt never made ("walk me through how you thought…") is dropped by the same QL1 guard as CHEM-044 (test: src/tests/chem044UntaughtProblem.test.ts). Not fixed: that a lesson can then be marked mastered from cards alone without the κ/Λm/Kohlrausch explanation being given — the mastery rule is unchanged.

### CHEM-025 — Opening scenario states false observations: salty water "turns slightly cloudy" and a spoon wired to a battery makes "a faint glow in a nearby LED"

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.conductance`
- Lesson/order: #78
- Learner message: (lesson opening)
- Tutor response: "Imagine a metal spoon dropped into a glass of plain water… Now picture the same spoon in a glass of salty water. The water turns slightly cloudy, and if you connect the spoon to a tiny battery, a faint glow appears in a nearby LED." + "what do you notice about the water's appearance or behavior that hints at a difference in electrical conductance?"
- Expected behaviour: Salt dissolves to a clear solution; conductance is shown by a meter/bulb in a circuit, not by appearance.
- Actual behaviour: NaCl(aq) is clear, not cloudy; a lone spoon + battery + LED is not a described circuit; the closing question asks what appearance "hints at" conductance — appearance does not.
- Why it is a defect: Invented, false lab observation used as the learner's anchor example.
- Reproducibility: Observed once (#78).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-026 — Garbled card stem: "the average separation of the particles ______ and the hold the forces between them have ______"

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 1
- Chemistry concept: `chem.found.states-of-matter`
- Lesson/order: #2
- Learner message: increases … weakens
- Tutor response: MCQ: "Going from solid to liquid to gas, the average separation of the particles ______ and the hold the forces between them have ______."
- Expected behaviour: "…and the forces between them ______."
- Actual behaviour: Ungrammatical stem ("the hold the forces between them have"); card is asked twice (t2 and t7) and used as the last mastery card.
- Why it is a defect: Confusing wording for a low-English learner, repeated.
- Reproducibility: Observed once (#2, two occurrences).
- Related defect: —
- Status: FIXED
- Fix: Converged 2026-10-06 — the garbled stem ("the hold the forces between them have ______") was already corrected in the repo; production now serves "the hold of the forces between them ______" (chem.found.states-of-matter:fill_blank:en:high:foundational). Backup: docs/qa/backups/probe-converge-2026-10-06-b.json.

### CHEM-027 — Completion summary ("🎉 Excellent work! … What you mastered … What's coming") is shown at lesson start or mid-lesson, before the topic is mastered

- Severity: P1
- Category: Lesson flow
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 6
- Chemistry concept: `chem.surface.colloids`
- Lesson/order: #97
- Learner message: (lesson-init, then "ok")
- Tutor response: "🎉 Excellent work! You've successfully navigated the basics of surface chemistry. ✓ What you mastered — you can now define a colloid by its particle size range, explain the Tyndall effect… ✓ Common mistakes… ✓ What's coming — the next lesson unlocks how liquid-liquid colloidal systems form…"
- Expected behaviour: A lesson introduction (goal, hook, first question).
- Actual behaviour: The opening message is a lesson-COMPLETE celebration listing what the learner "mastered" for a lesson they have not started. Both observed openings came from provider=gemini.
- Why it is a defect: Tells the learner they already mastered the topic; breaks the lesson flow and trust in mastery claims.
- Reproducibility: Seen in #97 (account 6) and #116 (account 7), both second lesson of the account, both gemini at open. Groq openings in the same run were normal.
- Also observed (13 occurrences in 7 lessons): #116 (A7) t0; #152 (A9) t10; #171 (A10) t0; #6 (A1) t9; #176 (A10) t0; #23 (A2) t15; #97 (A6) t0
- Notes on occurrences: #116 t0: "🎉 Excellent work! You've successfully navigated the core chemistry of Group 17 halogens… What's coming — transition metals" · #152 t10: MID-LESSON at t10 (reply to "show me step by step"): "🎉 Fantastic work today, test0! ✓ Common mistakes — the 1–2 most frequent errors…" while mastery counters are 0/0 · #171 t0: opening "🎉 Excellent work, test10! You've successfully navigated the chemistry of lipids… ✓ What you mastered…" (provider gemini at open) · #6 t9: mid-lesson "✓ What you mastered — …" fragment appended to a card-answer reply at t9 (lesson mastered only at t12) · #176 t0: opening celebrates the PREVIOUS lesson (#175: "you can now explain condensation polymerization, calculate repeat-unit masses… degree of polymerization") and says "this next lesson unlocks… proteins and carbohydrates"
- Related defect: —
- Status: FIXED
- Fix: 3ac46db — lesson-init checked only the sentence-level completion claim; the "✓ What you mastered / ✓ What's coming" format passes it. The opening is now checked by section labels (rendersLessonClosingFormat) and replaced with the curriculum concept opening. Test: src/tests/chem027OpeningIsNotAClose.test.ts. Verified by test only.

### CHEM-028 — Wrong card answer gets no verdict: reply is a lecture on a new example plus the next card, without saying "not quite"

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 6
- Chemistry concept: `chem.surface.colloids`
- Lesson/order: #97
- Learner message: A sugar solution (0.5 M) (to "Which mixture shows a visible Tyndall beam?")
- Tutor response: "A 0.5 M sugar (sucrose) solution is a true solution… In contrast, a gold sol containing particles of roughly 20 nm at 1 × 10⁻⁶ M will show a vivid Tyndall beam… Both mixtures are homogeneous to the naked eye…" + a new MCQ
- Expected behaviour: A clear "Not quite — milk is the colloid" with the reason, as other wrong answers get.
- Actual behaviour: No acknowledgement that the answer was wrong; introduces an unrelated gold-sol example and moves on; counters stay 0/0.
- Why it is a defect: Learner cannot tell whether they were right; inconsistent with the "Not quite — the answer is…" feedback used elsewhere.
- Reproducibility: Observed once (#97 t3).
- Also observed (108 occurrences in 72 lessons): #20 (A2) t4; #58 (A4) t7/t5; #3 (A1) t5; #171 (A10) t3; #143 (A8) t4; #161 (A9) tt3, t10/t3/t10; #180 (A10) t4; #30 (A2) t15; #70 (A4) t3; #130 (A7) tt6, t9/t6/t9; #71 (A4) tt3, t18/t3/t18; #72 (A4) t11; #167 (A9) t4; #185 (A10) t4; #35 (A2) t4; #55 (A3) tt5, t9/t5/t9; #37 (A2) t10/t14; #5 (A1) t5; #6 (A1) t9; #8 (A1) t8; #11 (A1) t5; #12 (A1) t12; #14 (A1) t5; #19 (A1) t4; #172 (A10) t4; #175 (A10) t15; #176 (A10) t8; #179 (A10) t9; #182 (A10) t21; #184 (A10) t4; #186 (A10) t3; #22 (A2) t5; #50 (A3) t4; #56 (A3) t12; #59 (A4) t5; #62 (A4) t14; #65 (A4) t8/t23; #68 (A4) t3; #73 (A4) t13; #75 (A4) t4; #79 (A5) t3; #80 (A5) t5; #81 (A5) t12/t16; #82 (A5) t6; #84 (A5) t8; #85 (A5) t4; #89 (A5) t10; #91 (A5) t15; #92 (A5) t3; #94 (A5) t3/t7/t8; #97 (A6) t3; #99 (A6) t5; #102 (A6) t3/t7; #107 (A6) t3; #111 (A6) t17; #114 (A6) t8; #117 (A7) t5; #118 (A7) t5; #119 (A7) t4/t7; #121 (A7) t4; #123 (A7) t4; #125 (A7) t6; #138 (A8) t3/t8/t10; #139 (A8) t3; #142 (A8) t4; #144 (A8) t16; #149 (A8) t3/t12; #152 (A9) t5; #155 (A9) t4; #164 (A9) t8; #165 (A9) t4; #168 (A9) t6
- Notes on occurrences: #20 t4: correct answer to "Which element comes first?" gets no verdict, only unrelated text + raw markup (CHEM-032) + next card · #58 t7: wrong answer: 90-word paragraph, no "Not quite", then new card · #3 t5: wrong answer ("mixed nuts") -> "How did you decide that a bowl of mixed nuts is a homogeneous mixture?" (no verdict); "that was actually a trick option I put in there!" at t7 · #171 t3: wrong answer to "Which label indicates the site of the ester bonds…?" -> only "You selected “Saturated fatty acid” as the label for the ester-bond site." + next card · #143 t4: "Haloarene" for "What type of haloalkane is CH₃CH₂CH₂Cl?" gets no verdict; reply is a haloarene lecture · #161 tt3, t10: answer picked on stilbene / styrene card gets no verdict; tutor re-explains the Wittig reaction · #180 t4: "Deposition and Acid Rain Formation" for "Which step creates ozone?" gets no verdict; reply is an acid-rain story · #30 t15: "Spherical" on "Which shape best describes an s orbital?" -> "Great, you mentioned spherical" + probing question; no verdict
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: d5397b1 — on an authored key the verdict now leads: a correction or confirmation that only appeared later gets "Not quite." or the confirmation in front (wrongAnswerCorrection.ts, answerConfirmation.ts). Not fixed: the observed cards (Tyndall beam, "Which element comes first?") are model-written; an unauthored key stays verdict-free by design, an owner decision. Test: src/tests/chemVerdictFirst.test.ts. **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 70 distinct cards served in 31 lessons, all authored (stems found in the corpus); 0 replies with lettered A)/B)/C) options in 399 turns.

### CHEM-029 — Card has two defensible answers: "Which mixture shows a visible Tyndall beam?" lists a sand suspension (~5 µm) as a distractor

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 6
- Chemistry concept: `chem.surface.colloids`
- Lesson/order: #97
- Learner message: A sugar solution (0.5 M)
- Tutor response: MCQ options: sugar solution (0.5 M) / Milk (fat globules ~0.5 µm) / A suspension of sand particles (~5 µm) / Pure water
- Expected behaviour: Distractors that are unambiguously wrong.
- Actual behaviour: A turbid sand suspension also scatters a light beam visibly; the lesson never states that suspensions do not show a Tyndall beam.
- Why it is a defect: Not a fair question for a learner who reasons correctly.
- Reproducibility: Observed once (#97).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 70 distinct cards served in 31 lessons, all authored (stems found in the corpus); 0 replies with lettered A)/B)/C) options in 399 turns.

### CHEM-030 — Contradictory trend explanation in one lesson: "smaller atoms catch an electron more easily" vs a card stating chlorine has a more negative electron affinity than fluorine

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 7
- Chemistry concept: `chem.pblock.group17`
- Lesson/order: #116
- Learner message: explain simpler
- Tutor response: t6: "smaller atoms catch an incoming electron much more easily… easier catching means higher reactivity — which is why reactivity drops as you go down the group." vs t9 card: "Chlorine has a MORE negative electron affinity than fluorine."
- Expected behaviour: An explanation that survives the F/Cl electron-affinity exception that the lesson itself asks about.
- Actual behaviour: The simplification is false for F vs Cl and is contradicted three turns later by the lesson's own card.
- Why it is a defect: Simplified explanation teaches a rule the next question refutes.
- Reproducibility: Observed once (#116).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-031 — First reply after "ok" confirms an answer the learner never gave ("that's correct — iron fills the 3d subshell…") and previews a later quiz item

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 2
- Chemistry concept: `chem.period.modern-periodic-law`
- Lesson/order: #20
- Learner message: ok
- Tutor response: "test2, that's correct—iron fills the 3d subshell, which is an n minus 1 shell compared to its period number 4. Let's look at how the periodic table is organized into blocks… Take a look at the figure beside this message — it's a general illustration related to the topic."
- Expected behaviour: Teach the modern periodic law / table structure that the opening promised.
- Actual behaviour: The reply praises a non-existent answer about iron/3d (the question appears as a card at t5) and jumps to s/p/d/f blocks; the opening's question about atomic numbers 11 and 19 is dropped.
- Why it is a defect: Feedback to something the learner did not say; confusing for a weak learner; content out of order.
- Reproducibility: Observed once (#20 t1); similar "reply to a question that was never asked" pattern at #78 t1 (CHEM-024) and #20 t11.
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** A plain acknowledgement ("ok", "next", "got it") now counts as a turn that graded nothing, so a leading verdict is dropped — also one behind the learner's name ("test2, that's correct—…") (`replyHygiene.isPlainAcknowledgement`, `dropVerdictOnUngradedRequest`). "yes"/"sure" are left alone: they can answer a yes/no question. Test: src/tests/remainingDefectFixes20261007.test.ts. **Live re-drive 2026-10-10:** 0 verdicts on a plain "ok" in 31 lessons.

### CHEM-032 — Raw internal answer-key markup shown to the learner: <!" a="s-block" b="p-block" c="d-block" d="f-block" correct="B"-->

- Severity: P2
- Category: UX
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 2
- Chemistry concept: `chem.period.modern-periodic-law`
- Lesson/order: #20
- Learner message: The element with atomic number 18 (correct card answer)
- Tutor response: "Let's look at how the periodic table is organized into blocks… chlorine (Cl) fills the p-block on the right side of the table.
<!\" a=\"s-block\" b=\"p-block\" c=\"d-block\" d=\"f-block\" correct=\"B\"-->" + the next MCQ
- Expected behaviour: Clean learner text; no authoring/answer-key markup; and a verdict ("That's right") for the correct answer.
- Actual behaviour: A malformed HTML-comment fragment containing an internal answer key (correct="B") is part of the visible reply; the correct answer to the previous card gets no verdict, just an unrelated blocks explanation.
- Why it is a defect: Internal markup and answer key leaked into learner-facing text; the right answer is not acknowledged.
- Reproducibility: Observed once (#20 t4).
- Related defect: —
- Status: FIXED
- Fix: 72abee7 (PHYS-023) — the same orphaned-answer-key shape after prose: the key is removed and the prose kept. Pinned in src/tests/chemBatchDTextShape.test.ts. The missing verdict on that turn is CHEM-028.

### CHEM-033 — Mastery is verified by re-asking cards whose correct answers the tutor revealed a few turns earlier

- Severity: P2
- Category: Mastery/progress
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 2
- Chemistry concept: `chem.period.modern-periodic-law`
- Lesson/order: #20
- Learner message: atomic numbers / 3d / Group 1 … / valence electrons (second time round)
- Tutor response: Cards at t4, t5, t8, t10 are each served again at t14, t15, t16, t17 (same stems, options shuffled); mastery counters rise only on the second round; lesson ends "You mastered".
- Expected behaviour: Mastery checks that need transfer to a new situation, not recall of an answer shown in feedback a minute ago ("Not quite — the answer is: atomic numbers").
- Actual behaviour: In #20 every distinct card is asked twice; after a wrong first attempt the correct text was displayed in the feedback, and the repeat is credited as mastery evidence. Same shape: #2 (t2/t7), #77 (t5/t13), #116 (t2/t10), #151 (t2/t12).
- Why it is a defect: "Mastered" can be earned by echoing the answer just shown; mastery does not reflect understanding.
- Reproducibility: Reproduced in 5 lessons on 5 accounts (systemic).
- Also observed (137 occurrences in 105 lessons): #2 (A1) tt2/t7/t-; #77 (A5) tt5/t13/t-; #116 (A7) tt2/t10/t-; #151 (A9) tt2/t12/t-; #134 (A8) tt4/t17/t-; #40 (A3) tt3/t19, t12/t20, t13/t21, t17/t23/t-; #3 (A1) tt2/t18/t-; #59 (A4) tt7/t10, t9/t11-12/t-; #79 (A5) tt4/t16, t5/t17-18, t8/t19, t9/t20, t14/t20-21/t-; #117 (A7) tt3/t16, t4?, t3-t19/t-; #171 (A10) tt4/t20, t5/t21, t8/t23, t14/t24, t15/t25/t-; #143 (A8) tt4/t13, t5/t14, t8/t15/t-; #30 (A2) tt3/t21, t4/t22, t8/t23/t-; #69 (A4) tt7/t14, t8/t15, t13/t16/t-; #89 (A5) tt12/t18/t-; #162 (A9) tt3/t8, t5/t11, t6/t12/t-; #31 (A2) tt3/t23, t4/t24, t7/t28, t6/t27/t-; #50 (A3) tt14/t15/t-; #90 (A5) tt7/t13, t8/t16, t9/t17/t-; #15 (A1) tt5/t18, t8/t19, t4/t16/t-; #131 (A7) tt3/t9, t4/t10/t-; #144 (A8) tt2/t22, t3/t23/t-; #145 (A8) tt9/t14, t10/t15/t-; #182 (A10) tt5/t14, t8/t18, t10/t19/t-; #132 (A7) tt3/t8, t5/t9/t-; #51 (A3) tt3/t11, t4/t12, t7/t13, t8/t14/t-; #183 (A10) tt4/t16, t5/t17, t15/t19/t-; #94 (A5) tt4/t14, t5/t15, t10/t13/t-; #165 (A9) tt5/t15, t9/t16, t4/t14/t-; #74 (A4) tt3/t15, t4/t16, t5/t17/t-; #149 (A8) tt3/t18, t4/t18/t-; #57 (A3) tt5/t20, t5/t21/t-; #4 (A1) t-; #7 (A1) t-; #11 (A1) t-; #13 (A1) t-; #14 (A1) t-; #17 (A1) t-; #18 (A1) t-; #172 (A10) t-; #173 (A10) t-; #175 (A10) t-; #176 (A10) t-; #177 (A10) t-; #178 (A10) t-; #179 (A10) t-; #180 (A10) t-; #184 (A10) t-; #186 (A10) t-; #20 (A2) t-; #21 (A2) t-; #23 (A2) t-; #27 (A2) t-; #28 (A2) t-; #29 (A2) t-; #33 (A2) t-; #35 (A2) t-; #36 (A2) t-; #41 (A3) t-; #43 (A3) t-; #44 (A3) t-; #45 (A3) t-; #46 (A3) t-; #48 (A3) t-; #53 (A3) t-; #54 (A3) t-; #55 (A3) t-; #56 (A3) t-; #60 (A4) t-; #61 (A4) t-; #63 (A4) t-; #65 (A4) t-; #66 (A4) t-; #67 (A4) t-; #68 (A4) t-; #70 (A4) t-; #80 (A5) t-; #82 (A5) t-; #83 (A5) t-; #86 (A5) t-; #87 (A5) t-; #88 (A5) t-; #100 (A6) t-; #101 (A6) t-; #102 (A6) t-; #103 (A6) t-; #106 (A6) t-; #119 (A7) t-; #120 (A7) t-; #125 (A7) t-; #129 (A7) t-; #136 (A8) t-; #137 (A8) t-; #139 (A8) t-; #140 (A8) t-; #141 (A8) t-; #142 (A8) t-; #148 (A8) t-; #150 (A8) t-; #152 (A9) t-; #155 (A9) t-; #156 (A9) t-; #159 (A9) t-; #160 (A9) t-; #161 (A9) t-
- Notes on occurrences: #134 tt4/t17: final mastery card is the t4 card verbatim; after-complete card is the t6 card · #40 tt3/t19, t12/t20, t13/t21, t17/t23: every card repeated; mastery completes on the repeats · #3 tt2/t18: final mastery card is the t2 card · #59 tt7/t10, t9/t11-12: cards repeated · #79 tt4/t16, t5/t17-18, t8/t19, t9/t20, t14/t20-21: every card repeated · #117 tt3/t16, t4?, t3-t19: full-shell, neon-sign and applications cards all repeated; mastery on the repeats · #171 tt4/t20, t5/t21, t8/t23, t14/t24, t15/t25: cards repeated · #143 tt4/t13, t5/t14, t8/t15: cards repeated verbatim
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: 957978b + afa7322. Production 2026-10-06 (disposable account, deploy 05b7868): REPRODUCED through the real client path — lesson A chem.alc.phenols (mode next) → lesson B chem.alc.ethers in the same tab (mode next) → back to A (mode resume): the answered EAS card was served again with unused authored probes still in the pool. Stored state confirmed the cause: opening B was a fresh attempt and lesson-init's new-attempt clear nulled the whole teaching history, so A's ledger was gone before the return (957978b's per-concept archive only survives switches inside one attempt). afa7322 makes lesson-init carry the OTHER concepts' ledgers across a fresh attempt (teachingHistoryForNewAttempt); a restart of A still starts A clean. Test: src/tests/ledgerSurvivesLessonSwitch.test.ts. NOT DEPLOYED: Vercel API 402 'Your Team exceeded our fair use limits and has been blocked'; production re-test pending. (An in-lesson excursion does not switch the ledger concept, so it is not this path.)

### CHEM-034 — Figure caption is a generic placeholder ("it's a general illustration related to the topic") and the figure ("Periodic Trends: Na vs Cl") does not match the lesson "Modern Periodic Law and Table"

- Severity: P3
- Category: Visuals
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 2
- Chemistry concept: `chem.period.modern-periodic-law`
- Lesson/order: #20
- Learner message: ok / quiz me
- Tutor response: "Take a look at the figure beside this message — it's a general illustration related to the topic." (t1 and t8)
- Expected behaviour: A figure of the periodic table organised by atomic number/blocks, described specifically.
- Actual behaviour: Figure titled "Periodic Trends: Na vs Cl"; the tutor itself calls it "general"; later says "sodium, marked in blue as `Na (period 3, group 1)`" with raw backticks.
- Why it is a defect: Visual and its description are not tied to the lesson concept; filler text.
- Reproducibility: Observed twice in #20.
- Also observed (22 occurrences in 18 lessons): #40 (A3) tt16/t16; #59 (A4) tt5/t5; #11 (A1) t1/t6; #14 (A1) t16; #177 (A10) t4; #183 (A10) t1; #20 (A2) t1/t8; #21 (A2) t15; #22 (A2) t8; #23 (A2) t15; #29 (A2) t1; #32 (A2) t1; #51 (A3) t15; #60 (A4) t3; #90 (A5) t15; #91 (A5) t13; #92 (A5) t1; #166 (A9) t1
- Notes on occurrences: #40 tt16: "Take a look at the labelled figure beside this message — it shows Gas Laws." · #59 tt5: "…the labelled figure beside this message — it shows Equilibrium Constants Kc and Kp. Study it while I explain." (generic caption; figure title is "Calculating Kc, Kp and Using ICE Tables")
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** A domain figure is introduced as "it shows {figure title}, background for this topic rather than a picture of it" when it has a title; the bare "general illustration" sentence remains only for an untitled figure. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 0 "general illustration" captions in 31 lessons.

### CHEM-035 — The learner's current card answer is not graded: the reply addresses an earlier answer ("I see you chose \"No\"…") instead

- Severity: P1
- Category: Lesson flow
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.concept`
- Lesson/order: #58
- Learner message: The concentrations of all species remain unchanged. (answer to "Which of the following is NOT an observable characteristic…")
- Tutor response: "I see you chose “No.” Could you walk me through how you decided that a mixture with 95 % reactants and 5 % products isn't at equilibrium?"
- Expected behaviour: Verdict + feedback on the card just answered.
- Actual behaviour: The reply talks about the answer given two cards earlier ("No" to the 95 %/5 % card); the answer to the current card gets no feedback at all. The next learner message is then treated as a reply to that stale question.
- Why it is a defect: The learner's actual answer is ignored and a stale answer is replayed back to them.
- Reproducibility: Observed once (#58 t5).
- Also observed (4 occurrences in 4 lessons): #152 (A9) t6; #161 (A9) t13; #33 (A2) tt9, t10; #38 (A2) t7
- Notes on occurrences: #152 t6: verdict "That's right – the Williamson ether synthesis needs a primary alkyl halide" arrives a turn late, in reply to "too many words" · #161 t13: "next question please" answered with "That’s right – the secondary carbon… migrates" (stale previous answer) · #33 tt9, t10: "show me step by step" and "give me example with numbers" answered with "That’s right—because the electrons are free to move…" (verdict on an earlier answer) · #38 t7: "give me example with numbers" answered "Great – you’re right that when the pressure is doubled the volume halves" (verdict on previous card)
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: 0b3b0fb — the reproduced shape (#58: a tap on a model-written, unkeyed card answered "I see you chose “No.”…" about a card two turns earlier) now gets the neutral assembled reply (neutralAssembly.ts misattributesChoice, logged liveMisattributes). Not fixed: the four "late verdict" occurrences where the model repeats a verdict on the previous answer in reply to "too many words". Test: src/tests/chem035StaleAnswer.test.ts. **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 70 distinct cards served in 31 lessons, all authored (stems found in the corpus); 0 replies with lettered A)/B)/C) options in 399 turns.

### CHEM-036 — Learner says "i dont understand this picture" in a lesson that has no figure and the tutor plays along ("We'll circle back to the picture in a moment")

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.concept`
- Lesson/order: #58
- Learner message: i dont understand this picture
- Tutor response: "I hear you—it can be confusing when the picture seems to say “nothing is happening” while the chemistry is actually busy… We'll circle back to the picture in a moment…"
- Expected behaviour: Say honestly that there is no picture on screen (or show one).
- Actual behaviour: No figure was served in the entire lesson; the tutor invents a picture and promises to return to it, then never does.
- Why it is a defect: Misleads the learner about what is on screen.
- Reproducibility: Observed in #58; #96 t7 (also no figure) answered without admitting there is no picture.
- Also observed (96 occurrences in 48 lessons): #134 (A8) t8; #59 (A4) t2; #117 (A7) t7; #68 (A4) t13; #109 (A6) t3; #143 (A8) t2; #110 (A6) t18/t12; #31 (A2) tt15,t21,t30/t15/t21/t26/t30; #130 (A7) tt13,t14,t18/t13/t18; #15 (A1) t2; #71 (A4) t6/t17/t21; #164 (A9) tt11,t16,t20/t11/t16/t20; #146 (A8) t2/t18; #73 (A4) t8; #114 (A6) t5; #147 (A8) tt11,t20/t11/t20; #181 (A10) t14/t16; #183 (A10) t2/t21; #30 (A2) t9; #32 (A2) t12/t19; #34 (A2) t2; #40 (A3) t10; #41 (A3) t10/t24; #42 (A3) t10/t16; #55 (A3) t6; #58 (A4) t10; #61 (A4) t6/t22; #62 (A4) t11; #63 (A4) t10; #64 (A4) t3/t17; #65 (A4) t19/t20/t24; #81 (A5) t5; #93 (A5) t6/t18; #96 (A6) t7; #99 (A6) t3/t19; #108 (A6) t13/t15; #112 (A6) t4; #113 (A6) t9/t15; #118 (A7) t14; #121 (A7) t16/t18; #125 (A7) t19/t21/t25; #127 (A7) t2/t15/t18; #136 (A8) t6/t21; #137 (A8) t9/t23; #154 (A9) t11/t19; #159 (A9) t5; #161 (A9) t2; #168 (A9) t2
- Notes on occurrences: #134 t8: "i dont understand this picture" — no figure in the lesson; tutor answers with a baton analogy and never says there is no picture · #59 t2: "i dont understand this picture" at t2 although the first figure appears only at t5; tutor replies with a recipe analogy · #117 t7: "i dont understand this picture" — lesson has no figure; tutor answers with a landlord/deposit analogy · #68 t13: picture asked, no figure on lesson · #109 t3: "i dont understand this picture" answered with a balloon analogy before any figure was shown (figure first appeared t11) · #143 t2: picture asked, no figure; "let's set it aside" + toy-car analogy · #110 t18: picture asked, no figure on lesson · #31 tt15,t21,t30: "i dont understand this picture" three times, no figure on lesson
- Related defect: —
- Status: FIXED
- Fix: 440b55c — when the learner asks about the figure and none is on screen, sentences treating "the picture" as present are removed and the reply opens "There is no picture in this lesson yet, so let me say it in words." (figureReference.ts answerFigureQuestionWithoutFigure). The PHYS-021 prompt rule (5b53ec8) shipped at 17:48 UTC, after this run. Test: src/tests/chemBatchEVisuals.test.ts. Verified by test only.

### CHEM-037 — ΔG° for K = 4.2×10⁶ stated as "−37 kJ/mol" (−RT ln K at 298 K = −37.8 kJ/mol)

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.concept`
- Lesson/order: #58
- Learner message: Yes (wrong)
- Tutor response: "No — ΔG° is −37 kJ/mol here…"
- Expected behaviour: ≈ −38 kJ/mol (8.314×298×ln(4.2×10⁶)/1000 = 37.8).
- Actual behaviour: Truncated to −37.
- Why it is a defect: Small numeric inaccuracy in a worked value.
- Reproducibility: Observed once (#58).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-038 — Step-by-step answer switches example silently ("the same example we've been using (A ⇌ B)" when the lesson used A + B ⇌ C)

- Severity: P3
- Category: Teaching
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.concept`
- Lesson/order: #58
- Learner message: show me step by step
- Tutor response: "…keeping the same example we've been using (the reversible reaction A ⇌ B)."
- Expected behaviour: Use the A + B ⇌ C, K = 16 example from the first teaching turn.
- Actual behaviour: Refers to an example that was never used.
- Why it is a defect: Inconsistent running example; confusing for a weak learner.
- Reproducibility: Observed once (#58 t9).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-039 — Curved-arrow explanation is wrong: "when a water molecule takes a hydrogen ion, the arrow's tail starts on the oxygen–hydrogen bond… pointing toward the hydrogen atom receiving them"

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 8
- Chemistry concept: `chem.org.arrow-pushing`
- Lesson/order: #134
- Learner message: i dont understand
- Tutor response: "For example, when a water molecule takes a hydrogen ion, the arrow's tail starts right on the oxygen-hydrogen bond (the electron pair being shared), and the arrowhead points directly toward the hydrogen atom receiving them."
- Expected behaviour: Water accepting H⁺: the arrow starts on an oxygen LONE PAIR and points to H⁺ (forming a new O–H bond). A shared O–H bond is not the source.
- Actual behaviour: Source is placed on an existing O–H bond; the arrowhead "toward the hydrogen atom receiving them" confuses source and sink and contradicts the lesson's own rule that arrows start at a lone pair/bond that donates.
- Why it is a defect: Objectively wrong mechanism example in the lesson on arrow notation.
- Reproducibility: Observed once (#134 t2).
- Also observed (131 occurrences in 90 lessons): #40 (A3) tt8-t11/t-; #117 (A7) tt7-t13/t-; #152 (A9) tt9,t13,t14,t19,t20,t24,t26/t-; #171 (A10) tt10-t13,t22/t-; #88 (A5) tt4,t6,t9,t14,t15/t-; #109 (A6) tt3,t8,t10,t12,t15/t-; #127 (A7) tt8,t11,t13/t-; #161 (A9) tt6,t12; #180 (A10) tt2,t13,t18/t-; #30 (A2) tt5,t10,t11,t13,t17/t-; #49 (A3) tt6,t7; #89 (A5) tt8,t11,t20/t-; #110 (A6) tt5,t9,t16,t18/t-; #181 (A10) tt5,t8,t13,t14/t-; #70 (A4) tt9,t12; #31 (A2) tt8,t11,t15,t19,t21,t25,t29/t-; #14 (A1) tt6,t9,t11,t13,t18/t-; #50 (A3) tt4,t7,t9,t12,t19/t-; #130 (A7) tt6,t7,t13,t14,t16/t-; #112 (A6) tt4,t5; #90 (A5) tt2,t3,t6,t18,t22/t-; #71 (A4) tt6,t7,t9,t11,t15,t20/t-; #144 (A8) tt5,t8,t11,t14,t18,t24/t-; #182 (A10) tt3,t6,t16,t20/t-; #91 (A5) tt6,t9,t10,t13,t17/t-; #164 (A9) tt2,t4,t7,t10,t11,t13,t15,t19/t-; #32 (A2) tt2,t8,t12,t16,t18/t-; #113 (A6) tt6,t7,t8,t9,t12,t19/t-; #146 (A8) tt2,t14,t15,t16,t17/t-; #183 (A10) tt2,t7,t8,t20,t21/t-; #72 (A4) tt2,t6,t7,t9,t18,t20/t-; #33 (A2) tt3,t4,t15,t16,t19/t-; #53 (A3) tt6,t9,t10/t-; #93 (A5) tt1,t6,t7,t11,t17,t18/t-; #114 (A6) tt5,t6,t7/t-; #184 (A10) tt7,t10,t12,t13,t14,t20/t-; #147 (A8) tt6,t7,t8,t9,t10,t11,t18,t19/t-; #35 (A2) tt2,t4,t7,t16/t-; #55 (A3) tt6,t7,t11,t15,t16/t-; #74 (A4) tt6,t8,t12/t-; #168 (A9) tt3; #56 (A3) tt5,t8,t22,t23/t-; #75 (A4) tt7,t10,t11,t15,t18/t-; #149 (A8) tt6,t7,t8,t10,t13/t-; #150 (A8) tt6; #37 (A2) tt8,t12; #57 (A3) tt3,t7,t10,t13/t-; #107 (A6) tt6,t7,t8,t9,t15,t17/t-; #159 (A9) tt5,t13; #1 (A1) t-; #5 (A1) t-; #12 (A1) t-; #15 (A1) t-; #172 (A10) t-; #176 (A10) t-; #177 (A10) t-; #179 (A10) t-; #21 (A2) t-; #28 (A2) t-; #29 (A2) t-; #41 (A3) t-; #42 (A3) t-; #43 (A3) t-; #46 (A3) t-; #61 (A4) t-; #62 (A4) t-; #63 (A4) t-; #64 (A4) t-; #65 (A4) t-; #68 (A4) t-; #73 (A4) t-; #81 (A5) t-; #84 (A5) t-; #87 (A5) t-; #99 (A6) t-; #101 (A6) t-; #104 (A6) t-; #106 (A6) t-; #118 (A7) t-; #121 (A7) t-; #122 (A7) t-; #125 (A7) t-; #134 (A8) t-; #136 (A8) t-; #137 (A8) t-; #139 (A8) t-; #141 (A8) t-; #151 (A9) t-; #154 (A9) t-; #155 (A9) t-
- Notes on occurrences: #40 tt8-t11: subway car / dance floor / elevator / packed room analogies (4 near-identical crowd analogies) for "explain simpler/again/i dont understand" · #117 tt7-t13: landlord deposit / bank vault / vault door / house with deadbolt / purse of coins — five metaphors for the same ionisation-energy point · #152 tt9,t13,t14,t19,t20,t24,t26: electronics room, holding hands, winter mitten, Lego house, Lego bridge, river bridge, sandwich · #171 tt10-t13,t22: three-pronged plug / fork with fruit / butter with chocolate sticks / rope knots / fork with skewers — five analogies for saponification; tutor itself says "it can feel confusing when the same idea is presented a few times" · #88 tt4,t6,t9,t14,t15: ramp / revolving door / city street / shuttle bus analogies repeated · #109 tt3,t8,t10,t12,t15: helium balloon / magnet / parking garage analogies; balloon analogy internally incoherent ("short arm so the knot is tighter") · #127 tt8,t11,t13: chain-of-people passing a ball analogy repeated three times · #161 tt6,t12: garden-ditch bridge / relay-race baton analogies
- Related defect: —
- Status: PARTIALLY FIXED
- Fix: d5397b1 — analogy reuse (four crowd analogies in #40, five metaphors in #117): past two analogies in the last four replies, one regeneration without an analogy, kept only if it has none (reuseCaps.ts, logged [analogy-cap]). Not fixed: the wrong curved-arrow statement in the title is model output; no deterministic check of it exists. Test: src/tests/chemBatchDReuseAndProbing.test.ts.

### CHEM-040 — "i dont understand / why? / explain simpler" are answered with yet another analogy and no new chemistry; the same relay/baton analogy recurs 4 times and no real mechanism appears until turn 14

- Severity: P2
- Category: Adaptation
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 8
- Chemistry concept: `chem.org.arrow-pushing`
- Lesson/order: #134
- Learner message: i dont understand / why? / i dont understand this picture / ok
- Tutor response: t2 relay-race baton; t3 game of catch/baseball; t8 relay baton again; t9 relay-runner hand-off again; t7 courier; t12 garden hose.
- Expected behaviour: A different, concrete chemical illustration (a real arrow on a real species) when the learner is lost.
- Actual behaviour: Eight consecutive adaptation turns contain analogies only; the first concrete mechanism (CH₃Br + OH⁻) arrives only after "give me example" at t14.
- Why it is a defect: Learner re-asks without receiving new content; the tutor loops on non-chemical metaphors.
- Reproducibility: Observed in #134; milder versions in #1 (beads/cake/kitchen drawer), #115 (cake/furniture), #116 (game of catch).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** The analogy cap is one analogy in the last four replies for every subject (was two outside mathematics); past it the reply is regenerated once without an analogy and kept only if it has none. Partial: a retry that still uses an analogy keeps the original. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-041 — Canned empathy openers unrelated to the learner message ("this is genuinely tricky, so let's slow down" as the reply to "ok" / to a request for numbers)

- Severity: P3
- Category: Adaptation
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 8
- Chemistry concept: `chem.org.arrow-pushing`
- Lesson/order: #134
- Learner message: ok
- Tutor response: "test8, this is genuinely tricky, so let's slow right down and look at it from a fresh angle."
- Expected behaviour: Continue the lesson; "ok" signals no difficulty.
- Actual behaviour: Learner who just said "ok" is told it is "genuinely tricky" and given another analogy. Same opener returned for "give me example with numbers" (#58 t13, #115 t7) and "maybe yes?" (#20 t12).
- Why it is a defect: Template phrases triggered regardless of what the learner said; patronising and off-target.
- Reproducibility: Reproduced on 4 accounts (#134, #58, #115, #20).
- Also observed (42 occurrences in 36 lessons): #58 (A4) t13; #115 (A7) t7; #20 (A2) t12; #40 (A3) t5; #180 (A10) tt2,t11,t16,t18; #128 (A7) t2; #69 (A4) tt2,t5; #110 (A6) tt5,t7,t8,t9,t18; #181 (A10) tt5,t8,t14; #111 (A6) tt12,t14,t15; #112 (A6) tt2,t3; #182 (A10) tt2,t3,t6,t7; #113 (A6) tt2,t7,t9,t12,t15; #53 (A3) tt6,t9,t10; #73 (A4) tt2,t7,t8; #94 (A5) tt11,t12; #166 (A9) t3; #35 (A2) tt2,t16; #75 (A4) tt2,t11,t15,t16; #149 (A8) tt7,t8,t10; #38 (A2) t8; #57 (A3) tt3,t7,t10; #3 (A1) t9; #172 (A10) t8; #61 (A4) t7; #62 (A4) t13; #64 (A4) t5/t18; #84 (A5) t16; #101 (A6) t6; #104 (A6) t10/t13; #118 (A7) t15/t16; #122 (A7) t9/t13; #134 (A8) t9; #138 (A8) t13; #154 (A9) t14; #155 (A9) t17
- Notes on occurrences: #58 t13: "This is genuinely tricky, test4, and it's completely normal to want to see how the math actually works" to "give me example with numbers" · #40 t5: "test3, I hear you — let's break it down into a tiny, simple piece" to "why?"; same opener on t8, t10, t11 · #180 tt2,t11,t16,t18: "I hear you—it can feel overwhelming…" opener · #128 t2: "I hear you—it’s frustrating when something feels like a wall" on "why?" · #69 tt2,t5: "I hear you’re still feeling stuck…" on "explain again"/"i dont understand" · #110 tt5,t7,t8,t9,t18: "I hear you—…" openers · #181 tt5,t8,t14: "I hear you—…" openers · #111 tt12,t14,t15: "I hear you—…" openers
- Related defect: —
- Status: FIXED
- Fix: d5397b1 — an empathy opener ("this is genuinely tricky…", "I hear you…") is dropped unless the learner voiced a struggle this turn and none of the last four replies opened with one (reuseCaps.ts, logged [empathy-opener-cap]). Cause: the acknowledgement context turns to "confusion" after two misses whatever the learner says next. Test: src/tests/chemBatchDReuseAndProbing.test.ts. Verified by test only.

### CHEM-042 — Lesson title/opening promises content that is never taught or tested ("Emulsions and Gels" — gels never covered)

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-05 14:43 UTC
- Account: Account 6
- Chemistry concept: `chem.surface.emulsions`
- Lesson/order: #98
- Learner message: ok
- Tutor response: Opening: "explore mixtures where tiny droplets of one liquid are dispersed in another (emulsions) and where a liquid is trapped in a solid‑like network (gels). By the end you'll be able to describe how they form, name the key parts, and predict how they behave." Lesson then covers emulsions only and is marked mastered.
- Expected behaviour: Gels (liquid trapped in a network, examples, sol–gel) taught and checked, or the title/promise limited to emulsions.
- Actual behaviour: No sentence about gels after the opening; none of the 4 mastery cards or the after-complete card concern gels.
- Why it is a defect: Learner is told they mastered "Emulsions and Gels" while half the lesson was never delivered.
- Reproducibility: Observed once (#98).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** The lesson's KG syllabus line is now in the chat and opening prompts with the rule to teach each part, in order, before asking about it and to promise nothing outside it (`lessonDriftGuard.lessonScopeRule`). Prompt-level, so not guaranteed. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-043 — Card stem gives the answer away ("Mayonnaise is an oil-in-water emulsion. Which liquid is the dispersed phase…?")

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:43 UTC
- Account: Account 6
- Chemistry concept: `chem.surface.emulsions`
- Lesson/order: #98
- Learner message: Oil dispersed, water continuous
- Tutor response: MCQ: "Mayonnaise is an oil-in-water emulsion. Which liquid is the dispersed phase and which is the continuous one?"
- Expected behaviour: A stem that does not contain the information needed to answer.
- Actual behaviour: "Oil-in-water" already tells which phase is dispersed; the card counts toward mastery.
- Why it is a defect: Trivial item inflates mastery evidence. Similar: #1 t14 ("Oxygen gas is written O₂. Is one particle … the same thing as one oxygen ELEMENT?").
- Reproducibility: Observed in #98 and #1.
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Authored card corrected in the repo (`src/lib/teaching/assets/chemistryDepthSeedAssets.ts`). The production row is not yet updated: the asset bootstrap is create-only, so the edit reaches production only through an owner-approved convergence write (`scripts/assets/converge-probe-edits.ts --apply`, backup first, precedent docs/qa/backups/probe-converge-2026-10-06.json). The mayonnaise stem asks for the emulsion type instead of stating it. **2026-10-10:** converged to production (owner-approved write; the 7 production rows matched the old corpus exactly before the write; read-back after the write matches the corpus 7/7 on stem, choices and key; backup docs/qa/backups/probe-converge-2026-10-10.json). **Live re-drive 2026-10-10:** the corrected card was served in production with the new text.

### CHEM-044 — First teaching reply after "ok" is an untaught multi-part calculation problem / a question about an attempt the learner never made

- Severity: P1
- Category: Lesson flow
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 3
- Chemistry concept: `chem.state.real-gases`
- Lesson/order: #40
- Learner message: ok
- Tutor response: "Imagine you have a sealed 1.00 L container holding exactly 1.00 mol of CO₂ at 400 K. Using the ideal-gas law, what pressure would you predict? Now apply the van der Waals equation with a = 3.59 … b = 0.0427 … Finally, explain why the two pressures differ and which way the van der Waals result moves."
- Expected behaviour: A short explanation of why real gases deviate and what a and b mean, before any calculation.
- Actual behaviour: A three-part homework problem with constants the learner has not met, as the very first teaching turn. Same shape: #58 t1 ("Calculate the reaction quotient Q… which way will it shift?"), #78 t1 ("walk me through how you thought you could calculate…").
- Why it is a defect: No scaffolding for a weak learner; the lesson starts with a test of untaught material.
- Reproducibility: Reproduced in 3 lessons on 3 accounts (#40, #58, #78).
- Also observed (12 occurrences in 12 lessons): #58 (A4) t1; #78 (A5) t1; #81 (A5) t1; #62 (A4) t1; #7 (A1) t1; #109 (A6) t1; #31 (A2) t1; #112 (A6) t1; #183 (A10) t1; #114 (A6) t2; #55 (A3) t1; #74 (A4) t1
- Notes on occurrences: #58 t1: Q for A + B ⇌ C, K = 16 asked before Q is taught · #78 t1: "walk me through how you thought you could calculate the limiting molar conductivity of acetic acid?" · #81 t1: first reply asks about "the copper pipe, the steel tank, and the steel fitting immersed in hard water" — a scenario never introduced (opening was about a bike chain) · #62 t1: first reply: "Imagine a beaker of water that contains the phosphate ion HPO₄²⁻… it can donate or accept a proton" (amphiprotic species) before acid/base is defined · #7 t1: first reply: "move straight into the calculation… Balance the chemical equation … thermite" · #109 t1: Reply to "ok" is an unprompted task: assign oxidation states in two Na₂O₂ reactions (not yet taught) · #31 t1: "ok" -> unprompted task: draw Lewis/VSEPR for SF₄ and decide polarity · #112 t1: "ok" -> unprompted BF₃/NF₃ question
- Related defect: —
- Status: FIXED
- Fix: ef772e6 — on turn 1 the question-legality kernel blocked every question (QL1_NO_ANSWERABLE_SOURCE) yet the reply to "ok" set an untaught problem. On such a turn (no card, no learner question) sentences that ask or demand work are dropped (confirmBackRepair.ts dropUntaughtWorkDemands) and the teaching kept; if no teaching remains, the existing one-shot regeneration runs and allows no question. Logged [ql1-work-demand]. Test: src/tests/chem044UntaughtProblem.test.ts. Verified by test only.

### CHEM-045 — Worked van der Waals example uses V = 0.020 L < b = 0.0427 L/mol, so the calculation is abandoned mid-way (negative denominator) and the closing question cannot be answered

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 3
- Chemistry concept: `chem.state.real-gases`
- Lesson/order: #40
- Learner message: give me example
- Tutor response: "…1 mol compressed to 0.02 L… P = RT/(Vm − b) − a/Vm² = (0.0821)(300)/(0.020 − 0.0427) − 3.59/(0.020)² … the denominator becomes negative, which tells us… the gas would condense (the model breaks down)." then "What do you notice about how the pressure predicted by the ideal-gas law compares to the van der Waals prediction?"
- Expected behaviour: A worked example with V > b that yields a vdW pressure to compare with the ideal value.
- Actual behaviour: No vdW pressure is ever computed; the tutor chose conditions outside the equation's domain, and then asks the learner to compare two pressures when only one exists. It also says pressure is pushed "above the ideal value (or even causing condensation)".
- Why it is a defect: The requested example fails to demonstrate the topic; the question is unanswerable.
- Reproducibility: Observed once (#40 t6).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-046 — Figure for "Real Gases and van der Waals Equation" is the ideal-gas Boyle's-law curve P = 10/x, introduced as "it shows Gas Laws"

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 3
- Chemistry concept: `chem.state.real-gases`
- Lesson/order: #40
- Learner message: give me example with numbers
- Tutor response: "Take a look at the labelled figure beside this message — it shows Gas Laws. Study it while I explain." (visualSpec: graph, equation "10 / x", title "Boyle's Law: Pressure vs Volume"); an earlier figure is also titled "Boyle's Law: Pressure vs Volume".
- Expected behaviour: A real-vs-ideal gas picture (Z vs P, or P–V isotherm with vdW loop).
- Actual behaviour: An ideal-gas hyperbola with no real-gas feature, the opposite of the concept being taught.
- Why it is a defect: Visual does not match the lesson concept and would reinforce ideal behaviour.
- Reproducibility: Observed on #40 (two figures with the same title).
- Related defect: —
- Status: FIXED
- Fix: 440b55c — chem.state.real-gases now has a curated Tier-0 figure (ideal Z = 1, Z < 1 at moderate P, Z > 1 at high P, the van der Waals corrections; from the EB entry) that outranks the generated Boyle hyperbola. Test: src/tests/chemBatchEVisuals.test.ts. Rendering in production not checked.

### CHEM-047 — Lesson title/opening misspells the central term: "the van Waals equation"

- Severity: P3
- Category: Teaching
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 3
- Chemistry concept: `chem.state.real-gases`
- Lesson/order: #40
- Learner message: (lesson opening)
- Tutor response: "**Real Gases and the van Waals Equation** – In this lesson we'll see why real gases don't always follow the ideal-gas law and learn the van Waals equation…"
- Expected behaviour: van der Waals.
- Actual behaviour: "van Waals" (the lesson title elsewhere says "van der Waals").
- Why it is a defect: Misspelt scientist name in the opening of a lesson.
- Reproducibility: Observed once (#40).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** A word of the lesson's own KG title dropped from the reply ("van Waals" for "van der Waals") is put back, in lesson openings and chat replies (`replyHygiene.restoreTitleWords`). Test: src/tests/remainingDefectFixes20261007.test.ts. **Live re-drive 2026-10-10:** chem.state.real-gases wrote "van der Waals"; 0 occurrences of "van Waals".

### CHEM-048 — Wrong answer ("Na⁺ is oxidised at the anode") is never corrected; the reply instead describes an aqueous chloralkali cell "on your screen" while the screen shows molten NaCl

- Severity: P1
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:43 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.electrolysis`
- Lesson/order: #79
- Learner message: Na⁺ (to "In the molten-NaCl cell, which species is oxidized at the anode?")
- Tutor response: "test5, when you look at the chloralkali cell on your screen where an aqueous solution of sodium chloride is being electrolysed, notice how both the dissolved sodium ions and water molecules are present at the cathode, but only the water molecules get reduced…" + next card (Faraday's second law, AlCl₃/AgNO₃).
- Expected behaviour: "Not quite — chloride ions are oxidised at the anode (Cl⁻ → Cl₂)"; description of the molten-NaCl figure that is actually on screen.
- Actual behaviour: No correction; the learner is left thinking sodium ions are oxidised. The reply is about the cathode of an aqueous cell, a different cell from the molten-NaCl figure (title "Electrolysis of Molten NaCl").
- Why it is a defect: A wrong chemistry answer on a basic oxidation/reduction point goes uncorrected and the text contradicts the figure.
- Reproducibility: Observed once (#79 t3); the no-verdict pattern is CHEM-028.
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: Production redrive 2026-10-06: about 13 of 35 distinct cards were model-written (no authored key; several are figure-label cards). Whether unkeyed AI-written cards are graded is an OWNER DECISION (also PHYS-020); not changed. **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 70 distinct cards served in 31 lessons, all authored (stems found in the corpus); 0 replies with lettered A)/B)/C) options in 399 turns.

### CHEM-049 — "Show me step by step" for the 193 000 C answer silently changes the problem from 1 mol Cu (n = 2) to 2 mol Na (n = 1)

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 14:43 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.electrolysis`
- Lesson/order: #79
- Learner message: show me step by step
- Tutor response: "Let's walk through the calculation that gives 193 000 coulombs using the molten-NaCl electrolytic cell… Na⁺ + e⁻ → Na … if we want to produce two moles of sodium… Q = 2 × 96 485 ≈ 193 000 C."
- Expected behaviour: Steps for the card in question: Cu²⁺ + 2e⁻ → Cu, 1 mol Cu needs 2 mol e⁻ → 2 × 96 500 C.
- Actual behaviour: The earlier card asked about ONE mole of copper; the "step by step" answer re-derives the same number for TWO moles of sodium, so a learner following the steps cannot reconcile them with the card they answered.
- Why it is a defect: Explanation does not correspond to the question it claims to explain.
- Reproducibility: Observed once (#79 t11).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-050 — Xenon difluoride described as "a pale-yellow solid" made with "a few drops of liquid fluorine" in a warmed ampoule

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:44 UTC
- Account: Account 7
- Chemistry concept: `chem.pblock.group18`
- Lesson/order: #117
- Learner message: ok
- Tutor response: "Imagine a glass ampoule that contains a small amount of xenon gas and a few drops of liquid fluorine. When the ampoule is gently warmed, the fluorine reacts with the xenon to form a pale‑yellow solid, xenon difluoride (XeF₂)…"
- Expected behaviour: XeF₂ is a colourless crystalline solid; it is made from Xe + F₂ gas (heat/UV), not from drops of liquid fluorine at mild warmth.
- Actual behaviour: Wrong colour and an unrealistic preparation for the lesson's first example.
- Why it is a defect: Objective factual error in the opening demonstration of the lesson.
- Reproducibility: Observed once (#117).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-051 — Two different reasons for noble-gas inertness are presented as if one contradicts the other ("…rather than a simple rule about having eight electrons")

- Severity: P3
- Category: Teaching
- Date/time: 2026-10-05 14:44 UTC
- Account: Account 7
- Chemistry concept: `chem.pblock.group18`
- Lesson/order: #117
- Learner message: They have extremely high first ionisation energies… (card answer)
- Tutor response: t3: "unreactive because they already have a complete outer electron shell"; t5: "…extremely high first ionization energies, which is the true reason they remain unreactive… rather than a simple rule about having eight electrons"; t16 card again: "unreactive because each atom has a full outer shell".
- Expected behaviour: One consistent explanation (full shell → very high ionisation energy → unreactive).
- Actual behaviour: The tutor calls the full-shell rule "simple" and not the "true reason", then re-asks the full-shell card and counts it.
- Why it is a defect: Mixed messages about the key idea of the lesson.
- Reproducibility: Observed once (#117).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-052 — Card's correct option says (E,E)-hexa-2,4-diene is "locked in s-trans and cannot achieve the required geometry"; the tutor's own feedback says it "must rotate to adopt s-cis"

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:46 UTC
- Account: Account 8
- Chemistry concept: `chem.org.pericyclic`
- Lesson/order: #135
- Learner message: Cyclopentadiene is locked in the s-cis conformation; (E,E)-hexa-2,4-diene is locked in s-trans and cannot achieve the required geometry
- Tutor response: MCQ marked right, then: "(E,E)-hexa-2,4-diene prefers the s-trans geometry and must rotate to adopt s-cis, which is energetically unfavorable… Linear dienes can rotate around single bonds to reach s-cis".
- Expected behaviour: An acyclic diene is not locked: it can rotate about the C2–C3 single bond; it reacts less readily because s-cis is higher in energy.
- Actual behaviour: The authored "correct" option contains a false claim ("locked… cannot"), contradicted by the explanation shown right after.
- Why it is a defect: The right answer states something untrue and is contradicted in the same turn.
- Reproducibility: Observed once (#135 t3/t4).
- Related defect: —
- Status: FIXED — production row converged 2026-10-10 (read-back verified)
- Fix: **2026-10-07 pass (2350ff6):** Authored card corrected in the repo (`src/lib/teaching/assets/chemistrySeedAssets.ts`). The production row is not yet updated: the asset bootstrap is create-only, so the edit reaches production only through an owner-approved convergence write (`scripts/assets/converge-probe-edits.ts --apply`, backup first, precedent docs/qa/backups/probe-converge-2026-10-06.json). The correct option no longer says the (E,E)-diene is "locked" in s-trans. **2026-10-10:** converged to production (owner-approved write; the 7 production rows matched the old corpus exactly before the write; read-back after the write matches the corpus 7/7 on stem, choices and key; backup docs/qa/backups/probe-converge-2026-10-10.json).

### CHEM-053 — Unbalanced equation in the Williamson worked example: "C₆H₅OH + 2 Na → C₆H₅ONa + H₂↑"

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.ethers`
- Lesson/order: #152
- Learner message: ok
- Tutor response: "3. Make the phenoxide by deprotonating phenol with sodium metal: C₆H₅OH + 2 Na → C₆H₅ONa + H₂↑."
- Expected behaviour: 2 C₆H₅OH + 2 Na → 2 C₆H₅ONa + H₂.
- Actual behaviour: Na (2 vs 1) and H (6 vs 7... on the left 6 H, on the right 5 + 2) are unbalanced.
- Why it is a defect: Objectively unbalanced equation shown as a worked step.
- Reproducibility: Observed once (#152 t2).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-054 — Stoichiometry error: "0.050 mol of sodium reacts with 0.050 mol of ethanol → … and 0.050 mol of H₂ gas" (should be 0.025 mol)

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.ethers`
- Lesson/order: #152
- Learner message: give me example with numbers
- Tutor response: "* 0.050 mol of sodium metal reacts with 0.050 mol of ethanol (CH₃CH₂OH) → 0.050 mol of sodium ethoxide (CH₃CH₂ONa) and 0.050 mol of H₂ gas."
- Expected behaviour: 2 Na + 2 EtOH → 2 NaOEt + H₂: 0.050 mol Na gives 0.025 mol H₂.
- Actual behaviour: H₂ amount doubled.
- Why it is a defect: The requested numeric example contains a mole-ratio error.
- Reproducibility: Observed once (#152 t8).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-055 — "i dont understand this picture" is answered with an unrelated analogy and sometimes by abandoning the picture ("let's put the picture aside completely")

- Severity: P2
- Category: Adaptation
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.ethers`
- Lesson/order: #152
- Learner message: i dont understand this picture
- Tutor response: t20: "Think of building a simple Lego bridge across a gap…"; t26: "let's put the picture aside completely. Think of building an ether like assembling a sandwich…"
- Expected behaviour: Walk through the labelled boxes of the figure actually on screen ("Williamson synthesis…", "Cleavage with HX…", "Epoxide ring opening…").
- Actual behaviour: The picture complaint produces a metaphor (Lego, sandwich); the labelled boxes are not explained, though the figure was served at t1.
- Why it is a defect: The learner's specific request about the visual is not honoured.
- Reproducibility: Observed #152 (t20, t26), #134 t8, #40 t10 ("step away from the equations").
- Also observed (2 occurrences in 2 lessons): #134 (A8) t8; #40 (A3) t10
- Notes on occurrences: #134 t8: baton analogy · #40 t10: elevator analogy, "step back from equations"
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** The analogy cap is one analogy in the last four replies for every subject (was two outside mathematics); past it the reply is regenerated once without an analogy and kept only if it has none. Partial: a retry that still uses an analogy keeps the original. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-056 — Ambiguous figure-label card: "Which label indicates the site of the ester bonds that are broken in saponification?" with options Glycerol backbone / Saturated fatty acid / Unsaturated fatty acid / Vitamin D

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 10
- Chemistry concept: `chem.bio.lipids`
- Lesson/order: #171
- Learner message: Saturated fatty acid
- Tutor response: MCQ about the triglyceride figure.
- Expected behaviour: A question with one defensible answer (the ester linkage joins glycerol O to the acyl C=O).
- Actual behaviour: The ester bonds lie between glycerol and the fatty-acid chains; both "Glycerol backbone" and the fatty acids are defensible, and the labels are not the bond sites.
- Why it is a defect: Learner cannot tell which label is meant.
- Reproducibility: Observed once (#171 t2).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 70 distinct cards served in 31 lessons, all authored (stems found in the corpus); 0 replies with lettered A)/B)/C) options in 399 turns.

### CHEM-057 — Analogy teaches a wrong picture of saponification: hydroxide is "a strong cleaning soap" and the triglyceride "melts in hot water" like butter with chocolate sticks

- Severity: P3
- Category: Teaching
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 10
- Chemistry concept: `chem.bio.lipids`
- Lesson/order: #171
- Learner message: i dont understand
- Tutor response: "Imagine you have a block of butter (the triglyceride) that's solid and holds three sticks of chocolate (the fatty-acid chains) together with waxy glue (the ester bonds). When you melt the butter in hot water and add a strong cleaning soap (the hydroxide…)"
- Expected behaviour: An analogy that does not describe the reagent (NaOH) as a soap — soap is the PRODUCT of this reaction.
- Actual behaviour: Confuses reagent and product in the explanation of saponification.
- Why it is a defect: Misleading analogy for the central reaction.
- Reproducibility: Observed once (#171 t12).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-058 — Aluminium's ionisation-energy dip is explained as removing an electron from a "half-filled p subshell" (3p¹ is not half-filled)

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:50 UTC
- Account: Account 2
- Chemistry concept: `chem.period.ionization-energy`
- Lesson/order: #22
- Learner message: A general increase, with small dips at aluminium and at sulfur
- Tutor response: "The dip at aluminium occurs because removing an electron from a 3p¹ configuration breaks a half‑filled p subshell, which is relatively stable."
- Expected behaviour: Al (3p¹) is lower than Mg because the 3p electron is higher in energy and better shielded than a 3s electron; half-filled stability applies to p³ (N, P).
- Actual behaviour: 3p¹ called half-filled; wrong reason for the Al dip.
- Why it is a defect: Objectively wrong explanation shown after a correct answer.
- Reproducibility: Observed once (#22 t7).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-059 — Sodium IE₂ given as 10 000 kJ/mol ("nearly 20 times" IE₁); real value ≈ 4 560 kJ/mol (≈ 9×); the lesson's own dump says "about 10×"

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 14:50 UTC
- Account: Account 2
- Chemistry concept: `chem.period.ionization-energy`
- Lesson/order: #22
- Learner message: After losing its single 3s valence electron, the next electron must come from the stable, full n=2 shell
- Tutor response: MCQ: "Sodium's IE₂ (10,000 kJ/mol) is dramatically larger than IE₁ (496 kJ/mol) — nearly 20 times bigger." Previous turn: "sodium's IE₂ is about 10× IE₁".
- Expected behaviour: IE₂(Na) ≈ 4 562 kJ/mol, ≈ 9× IE₁.
- Actual behaviour: A wrong constant (10 000) and two inconsistent ratios (≈20× vs ≈10×) in consecutive turns.
- Why it is a defect: Incorrect data in a numerical card, contradicting the preceding explanation.
- Reproducibility: Observed once (#22 t9/t10).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-060 — Three reusable generic 3-D fallback figures (three_electron_shells, three_atomic_structure, three_bond_formation) are served for many different lessons; they cannot show the trend/concept taught (e.g. Atomic and Ionic Radius, Ionization Energy, Electron Affinity, Valency, Electromagnetic Radiation)

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-05 14:50 UTC
- Account: Account 2
- Chemistry concept: `chem.period.ionization-energy`
- Lesson/order: #22
- Learner message: ok
- Tutor response: "Look at the three‑electron‑shell model on your screen: the nucleus sits at the centre, surrounded by the K, L and M shells…" (visual: "three_electron_shells"; same figure id in #21 and #22)
- Expected behaviour: A figure showing the trend (radius vs period/group, IE vs Z, ion vs atom sizes).
- Actual behaviour: One unlabeled single-atom shell diagram is reused; tutor repeatedly says "the figure beside this message — it's a general illustration related to the topic".
- Why it is a defect: Visual does not illustrate the lesson concepts (radius of ions; successive ionisation energies).
- Reproducibility: Observed on 2 lessons (#21, #22).
- Also observed (10 occurrences in 10 lessons): #21 (A2) tt1,t15; #23 (A2) tt1; #25 (A2) tt1; #11 (A1) tt1; #9 (A1) tt1; #10 (A1) tt1; #12 (A1) tfigure; #17 (A1) tt1,t2; #19 (A1) tt1; #94 (A5) t1
- Notes on occurrences: #21 tt1,t15: three_electron_shells in "Atomic and Ionic Radius" · #23 tt1: three_electron_shells for Electron Affinity and Electronegativity (no trend shown) · #25 tt1: three_electron_shells for Valency and Oxidation State · #11 tt1: three_atomic_structure (3-D atom model) for Electromagnetic Radiation; tutor: In the 3-D atom model on your screen, picture an electron… · #9 tt1: three_atomic_structure for Atomic Theory · #10 tt1: three_atomic_structure for Subatomic Particles · #12 tfigure: generic 3-D atom model used for Atomic Spectra (tutor: "Take a look at the 3-D atom model on your screen…") · #17 tt1,t2: generic 3-D atomic-shell figure for Photoelectric Effect; "Step 1 – Light arrives… striking the outermost shell"
- Related defect: —
- Status: PARTIALLY FIXED
- Fix: 440b55c — chem.period.ionization-energy now has a period-3 first-ionisation-energy bar chart (Na, Mg, Al, P, S from the EB entry; Si, Cl, Ar standard reference values). Not fixed: atomic radius, electron affinity, valency and electromagnetic radiation still fall back to the generic shell figures. Test: src/tests/chemBatchEVisuals.test.ts.

### CHEM-061 — "quiz me" answered with praise + a generic figure caption but no question or card

- Severity: P3
- Category: Lesson flow
- Date/time: 2026-10-05 14:46 UTC
- Account: Account 2
- Chemistry concept: `chem.period.atomic-radius`
- Lesson/order: #21
- Learner message: quiz me
- Tutor response: "You've built a solid foundation on how atomic and ionic radii behave. Let's see if you can apply that reasoning. Take a look at the figure beside this message — it's a general illustration related to the topic."
- Expected behaviour: A quiz question.
- Actual behaviour: Promises a test ("Let's see if you can apply that reasoning") then shows a figure and no question.
- Why it is a defect: Request for a quiz not honoured; dead-end turn.
- Reproducibility: Observed once (#21 t15).
- Also observed (4 occurrences in 3 lessons): #99 (A6) t18; #7 (A1) t17; #27 (A2) t11/t14
- Notes on occurrences: #99 t18: "quiz me" answered with a prose recap, no card · #7 t17: reply to a learner message: "You\x27ve built a solid understanding of using mole ratios, so let\x27s test the reasoning behind it." — no question follows · #27 t11: "next question please" -> "…let’s apply what you’ve learned to decide which description fits the molecule you just built." (no question) · #27 t14: "quiz me" -> "Let\x27s pause Covalent Bonding here for now" at c3/p1 (needs p2)
- Related defect: —
- Status: PARTIALLY FIXED
- Fix: 5fad26c, e09efe5 — production redrive 2026-10-06: "quiz me" got a card in 9 of 9 lessons (0 quiz-me turns without a card); one reply (#79) said "Let's pause the quiz… when you feel ready… a short multiple‑choice quiz" beside the card — fix e09efe5 is in the repo but NOT deployed (Vercel account blocked; see CHEM-021). Kept PARTIALLY FIXED: a quiz-me turn still depends on a card being available. **2026-10-07 pass (2350ff6):** With only authored cards served, "quiz me" when every authored card has been used is told so ("You have answered every practice question I have on …") instead of being promised a question.

### CHEM-062 — Lead–acid anode half-reaction is wrong/unbalanced: "Pb(s) → PbSO₄(s) + 2e⁻ + SO₄²⁻"

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:48 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.batteries`
- Lesson/order: #80
- Learner message: ok
- Tutor response: "At the negative plate (the anode) metallic lead (Pb) loses electrons: Pb (s) → PbSO₄ (s) + 2e⁻ + SO₄²⁻"
- Expected behaviour: Pb(s) + SO₄²⁻(aq) → PbSO₄(s) + 2e⁻ (sulfate on the reactant side).
- Actual behaviour: Sulfate shown as a product, so charge and atoms do not balance (0 on the left, −4 on the right); the cathode equation in the same reply is correct.
- Why it is a defect: Objectively wrong half-equation in a worked explanation.
- Reproducibility: Observed once (#80 t8).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-063 — Reply about the lead–acid battery ends "Take a look at the labelled figure beside this message — it shows Batteries and Fuel Cells. Follow it step by step." but the figure is the zinc–carbon dry cell

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-05 14:48 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.batteries`
- Lesson/order: #80
- Learner message: ok
- Tutor response: (lead–acid plates, PbO₂, H₂SO₄ explained) "Take a look at the labelled figure beside this message — it shows Batteries and Fuel Cells. Follow it step by step."
- Expected behaviour: A lead–acid figure, or no instruction to follow a figure that does not show it.
- Actual behaviour: The only figure of the lesson shows the Zn–MnO₂ dry cell; the learner is told to follow it "step by step" while reading about Pb/PbO₂ plates.
- Why it is a defect: Text and figure disagree; generic caption names the lesson, not the picture.
- Reproducibility: Observed once (#80 t8).
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** The figure pointer names the figure's own title ("it shows Zinc–Carbon Dry Cell …"), not the lesson title (`visualAcknowledgement.figureTitleOf`). Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-064 — Raw curriculum metadata is returned as the tutor reply: "Surfactants and Micelles covers: Gibbs adsorption (qualitative); critical micelle concentration; detergency mechanism."

- Severity: P2
- Category: UX
- Date/time: 2026-10-05 14:45 UTC
- Account: Account 6
- Chemistry concept: `chem.surface.surfactants`
- Lesson/order: #99
- Learner message: show me step by step
- Tutor response: "Surfactants and Micelles covers: Gibbs adsorption (qualitative); critical micelle concentration; detergency mechanism."
- Expected behaviour: A step-by-step explanation of micelle formation / detergency.
- Actual behaviour: The lesson's syllabus line (internal lesson goal) is the entire reply; no steps.
- Why it is a defect: Internal curriculum text shown as a tutor answer; request ignored.
- Reproducibility: Observed once (#99 t9); searched all transcripts so far — no other occurrence.
- Also observed (16 occurrences in 16 lessons): #175 (A10) t10; #10 (A1) t19; #65 (A4) t23; #160 (A9) t1; #127 (A7) t14; #30 (A2) t14; #89 (A5) t10; #110 (A6) t6; #162 (A9) t10; #31 (A2) t16; #144 (A8) t13; #91 (A5) t5; #146 (A8) t6; #93 (A5) t12; #147 (A8) t17; #56 (A3) t24
- Notes on occurrences: #175 t10: reply to "ok": "Condensation Polymerization covers: Step-growth; loss of small molecule; nylon-6, nylon-6,6, Dacron (PET), Bakelite, melamine-formaldehyde." · #10 t19: degraded fallback: "Subatomic Particles covers: Properties of proton…" — the raw syllabus line is one of the degraded-mode texts, not only a model reply · #65 t23: reply to a card answer (CH₃COONH₄) = "Salt Hydrolysis covers: Hydrolysis of salts from weak acid/strong base, strong acid/weak base, both weak; pH calculation." (provider groq, so not only degraded mode) · #160 t1: FIRST teaching reply after "ok" is only: "Carboxylic Acid Derivatives covers: Acyl chlorides, anhydrides, esters, amides; reactivity order; nucleophilic acyl substitution; saponification." (provider groq) · #127 t14: "quiz me" -> "Inductive and Mesomeric Effects covers: …" · #30 t14: "give me example with numbers" -> "Molecular Orbital Theory covers: LCAO; …" · #89 t10: third answer on the "Which step directly requires a photon?" card -> "Photochemical Reactions covers: …" · #110 t6: "quiz me" -> "Alkaline Earth Metals covers: Properties; diagonal relationship Be–Al; …"
- Related defect: —
- Status: FIXED
- Fix: 3ac46db — the concept fallback (conceptFallback.ts) rendered "X covers: a; b; c."; a syllabus list is now one sentence, "In this lesson on X we will look at a, b and c." Tests: src/tests/chem027OpeningIsNotAClose.test.ts, src/tests/learnerPilotFindings.test.ts. Verified by test only.

### CHEM-065 — Markdown tables in tutor replies (pipes and \|---\| rows) — the lesson renderer has no table support, so they would show as raw text

- Severity: P3
- Category: UX
- Date/time: 2026-10-05 14:50 UTC
- Account: Account 2
- Chemistry concept: `chem.period.ionization-energy`
- Lesson/order: #22
- Learner message: give me example with numbers
- Tutor response: "| Element | Symbol | First ionization energy (kJ mol⁻¹) |\n|---------|--------|-----------------------------------|\n| Sodium | Na | 496 |\n| Magnesium| Mg | 738 |"
- Expected behaviour: A rendered table or a plain list.
- Actual behaviour: Pipe/dash table markup in the reply text. LessonScreen.tsx (renderMarkdown) handles code blocks, quotes, headings, lists and paragraphs only. Judged from the renderer source, not seen in a browser.
- Why it is a defect: Raw markup visible to the learner.
- Reproducibility: Seen in 3 replies: #22 t8, #117 t6, #118 t4.
- Also observed (10 occurrences in 10 lessons): #117 (A7) t6; #118 (A7) t4; #63 (A4) t9; #139 (A8) t3; #160 (A9) t5; #127 (A7) t9; #70 (A4) t2; #163 (A9) tt2,t4; #32 (A2) t13; #35 (A2) t3
- Notes on occurrences: #117 t6: table of IE values · #118 t4: table · #63 t9: ICE table as markdown pipes · #139 t3: "Numbers you can remember" table in markdown pipes · #160 t5: rate-constant table in markdown pipes · #127 t9: pipe table in "example with numbers" reply · #70 t2: caret/brace notation in a card (see CHEM-129) · #163 tt2,t4: pipe tables in two replies
- Related defect: —
- Status: FIXED
- Fix: d5397b1 — markdown pipe tables are rewritten as plain lines ("Sodium · Na · 496") in the final reply sweep (src/lib/text/plainNotation.ts). Test: src/tests/chemBatchDTextShape.test.ts. Verified by test only.

### CHEM-066 — Single-dollar math "$0.450$" is emitted; the renderer only converts \(…\), \[…\] and $$…$$, so the dollar signs would show literally

- Severity: P3
- Category: UX
- Date/time: 2026-10-05 14:49 UTC
- Account: Account 1
- Chemistry concept: `chem.found.measurement`
- Lesson/order: #4
- Learner message: give me example
- Tutor response: "…the display shows something like $0.450$ kilograms. That number $0.450$ has two essential parts…"
- Expected behaviour: Plain "0.450 kg" or \(0.450\).
- Actual behaviour: $…$ delimiters in text; LessonScreen.tsx DISPLAY_MATH_RE / INLINE_MATH_OR_PLACEHOLDER_RE do not match single dollars. Judged from source, not from a browser.
- Why it is a defect: Looks like broken markup / a price to the learner.
- Reproducibility: Observed once in 40 transcripts (#4 t3).
- Related defect: —
- Status: FIXED
- Fix: 5fad26c — a bare number held between two dollars ("$0.450$") is shown as the plain number; money ("$5 and $10") and real maths ("$v_0$") unchanged (mathDelimiters.ts). Test: src/tests/chemOpenDefectsBatchG.test.ts.

### CHEM-067 — MCQ stem says "Show your unit-cancellation steps" but the card is a pick-one question whose correct option already contains the working

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:49 UTC
- Account: Account 1
- Chemistry concept: `chem.found.measurement`
- Lesson/order: #4
- Learner message: 25,000 mg (0.025 kg × 1000 g/kg × 1000 mg/g)
- Tutor response: "Convert 0.025 kg to milligrams. Show your unit-cancellation steps." options: "25 mg (just move the decimal three places)" / "25,000 mg (0.025 kg × 1000 g/kg × 1000 mg/g)"
- Expected behaviour: A stem that matches the answer format; options without the full working.
- Actual behaviour: Impossible to "show steps" in a tap card; the right option includes the steps and the distractor "just move the decimal" flags itself as the lazy answer. The card is also a 2-option mastery card, asked twice (t8, t15).
- Why it is a defect: Question/format mismatch and answer leakage.
- Reproducibility: Observed once (#4).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Authored card corrected in the repo (`src/lib/teaching/assets/chemistrySeedAssets.ts`). The production row is not yet updated: the asset bootstrap is create-only, so the edit reaches production only through an owner-approved convergence write (`scripts/assets/converge-probe-edits.ts --apply`, backup first, precedent docs/qa/backups/probe-converge-2026-10-06.json). Stem "Convert 0.025 kg to milligrams." with 25,000 / 25 / 2,500 mg. **2026-10-10:** converged to production (owner-approved write; the 7 production rows matched the old corpus exactly before the write; read-back after the write matches the corpus 7/7 on stem, choices and key; backup docs/qa/backups/probe-converge-2026-10-10.json). **Live re-drive 2026-10-10:** the corrected card was served in production with the new text.

### CHEM-068 — Ethanol vapour pressure at 20 °C given as 44 kPa (actual ≈ 5.9 kPa)

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 14:48 UTC
- Account: Account 3
- Chemistry concept: `chem.state.liquids`
- Lesson/order: #41
- Learner message: give me example with numbers
- Tutor response: "Ethanol (the alcohol in hand sanitizers) has a vapour pressure of forty-four kilopascals at twenty degrees Celsius, while water has a vapour pressure of only two point three kilopascals at that same temperature."
- Expected behaviour: Ethanol ≈ 5.9 kPa at 20 °C (water ≈ 2.3 kPa).
- Actual behaviour: About 7× too high; ethanol would be nearly at boiling at 44 kPa.
- Why it is a defect: Wrong constant in the numeric example the learner asked for.
- Reproducibility: Observed once (#41 t9).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-069 — Worked N₂O₄ ⇌ 2NO₂ example stops before the point ([N₂O₄] raised to 0.80 M) and is followed by a temperature-dependence van't Hoff graph ("Study it while I explain")

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 14:49 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.le-chatelier`
- Lesson/order: #60
- Learner message: give me example with numbers
- Tutor response: "…K_c = 1.44/0.40 = 3.60. Now, suppose we suddenly inject more N₂O₄… raising its concentration to 0.80 M while keeping everything else constant. Take a look at the labelled figure beside this message — it shows Le Chatelier's Principle. Study it while I explain." (figure: graph y = −5x + 2, "Temperature effect on equilibrium constant (van't Hoff plot)", ln K vs 1/T)
- Expected behaviour: Complete the example: Q = 1.2²/0.80 = 1.8 < K = 3.6, so the system shifts toward NO₂ until Q = K; figure showing a concentration disturbance.
- Actual behaviour: The reply ends without Q or the direction of shift; the attached figure is an unrelated temperature plot with arbitrary line y = −5x + 2 and no numbers on the axes.
- Why it is a defect: The numeric example the learner asked for is left unfinished and its picture does not match it.
- Reproducibility: Observed once (#60 t3).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-070 — Stem asks "increase or decrease K?" but the card offers only "Decrease K" and "K is unaffected by temperature"

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:49 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.le-chatelier`
- Lesson/order: #60
- Learner message: K is unaffected by temperature
- Tutor response: MCQ: "For an exothermic reaction A ⇌ B + heat, does raising the temperature increase or decrease K?" [0] Decrease K [1] K is unaffected by temperature
- Expected behaviour: Options Increase / Decrease / Unaffected.
- Actual behaviour: "Increase" is missing, so the card is a 50/50 on a point the stem frames as a choice between increase and decrease; used as a mastery card (asked twice).
- Why it is a defect: Stem/option mismatch; guessable.
- Reproducibility: Observed once (#60 t7, t10).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Authored card corrected in the repo (`src/lib/teaching/assets/chemistrySeedAssets.ts`). The production row is not yet updated: the asset bootstrap is create-only, so the edit reaches production only through an owner-approved convergence write (`scripts/assets/converge-probe-edits.ts --apply`, backup first, precedent docs/qa/backups/probe-converge-2026-10-06.json). Options are Decrease / Increase / Unaffected, matching the stem. **2026-10-10:** converged to production (owner-approved write; the 7 production rows matched the old corpus exactly before the write; read-back after the write matches the corpus 7/7 on stem, choices and key; backup docs/qa/backups/probe-converge-2026-10-10.json). **Live re-drive 2026-10-10:** the corrected card was served in production with the new text.

### CHEM-071 — Names duplicated in parentheses ("silicon tetrachloride (silicon tetrachloride)", "hydrogen chloride (hydrogen chloride)")

- Severity: P3
- Category: UX
- Date/time: 2026-10-05 14:49 UTC
- Account: Account 7
- Chemistry concept: `chem.pblock.trends`
- Lesson/order: #118
- Learner message: ok
- Tutor response: "Imagine taking a flask of clear, colourless silicon tetrachloride (silicon tetrachloride) and exposing it briefly to the moist air… smelling sharply of hydrogen chloride (hydrogen chloride) gas…"
- Expected behaviour: A name once, or a formula in the parenthesis (SiCl₄, HCl).
- Actual behaviour: A text-to-speech/pronunciation gloss template repeats the name instead of giving the formula.
- Why it is a defect: Looks like a glitch; confusing for the learner.
- Reproducibility: Observed once (#118 t1).
- Related defect: —
- Status: FIXED
- Fix: 5fad26c — a parenthesis that repeats the words before it ("silicon tetrachloride (silicon tetrachloride)") is removed in plainNotation; a formula gloss "(SiCl₄)" is kept. Test: src/tests/chemOpenDefectsBatchG.test.ts.

### CHEM-072 — Malformed 2-option card: "NaCl just dissolves in water. Why does SiCl4 fume and hydrolyse violently instead?" — options "Because NaCl is IONIC" / "It does not"

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:49 UTC
- Account: Account 7
- Chemistry concept: `chem.pblock.trends`
- Lesson/order: #118
- Learner message: It does not
- Tutor response: MCQ (served on "quiz me")
- Expected behaviour: Options that are explanations of the SiCl₄ behaviour.
- Actual behaviour: "It does not" is not an answer to a "why" question and the correct option explains NaCl, not SiCl₄.
- Why it is a defect: The learner who picked the only grammatical-looking alternative is told "Not quite" and the lesson is then paused.
- Reproducibility: Observed once (#118 t17).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Authored card corrected in the repo (`src/lib/teaching/assets/chemistrySeedAssets.ts`). The production row is not yet updated: the asset bootstrap is create-only, so the edit reaches production only through an owner-approved convergence write (`scripts/assets/converge-probe-edits.ts --apply`, backup first, precedent docs/qa/backups/probe-converge-2026-10-06.json). New stem with three explained options. **2026-10-10:** converged to production (owner-approved write; the 7 production rows matched the old corpus exactly before the write; read-back after the write matches the corpus 7/7 on stem, choices and key; backup docs/qa/backups/probe-converge-2026-10-10.json). **Live re-drive 2026-10-10:** the corrected card was served in production with the new text.

### CHEM-073 — Lesson "Trends Across p-Block" opens with SiCl₄ hydrolysis and never teaches radius / ionisation energy / electronegativity trends before testing them

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 14:49 UTC
- Account: Account 7
- Chemistry concept: `chem.pblock.trends`
- Lesson/order: #118
- Learner message: ok
- Tutor response: First teaching reply: "Imagine taking a flask of clear, colourless silicon tetrachloride… thick white fumes…" The opening promised "predict the direction of trends such as atomic size, ionization energy, electronegativity".
- Expected behaviour: Teach the across-period / down-group trends first.
- Actual behaviour: The trends card ("Moving left to right across a period, atomic radius ___ and electronegativity ___") appears at t5 with no preceding explanation; the rest of the session is hydrolysis and diagonal relationships.
- Why it is a defect: Lesson goal and delivered content diverge; mastery impossible for a learner who follows the tutor.
- Reproducibility: Observed once (#118).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Lesson drift guard (`lessonDriftGuard.ts`): a reply to a continuation message ("ok", "next", "give me example", "maybe yes") that is at least 25 words and names none of the concept's anchor words (KG title + syllabus line) is regenerated once with the lesson stated; the retry is kept only if it is on the lesson. Partial: a retry that drifts again is not replaced, and a neighbouring concept that shares the lesson's words is not detected. Test: src/tests/remainingDefectFixes20261007.test.ts. The lesson's KG syllabus line is now in the chat and opening prompts with the rule to teach each part, in order, before asking about it and to promise nothing outside it (`lessonDriftGuard.lessonScopeRule`). Prompt-level, so not guaranteed. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-074 — Bromine selectivity quoted as "secondary vs primary hydrogen about 1600 to 1" for propane (≈ 82:1; 1600:1 is tertiary vs primary)

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 14:48 UTC
- Account: Account 8
- Chemistry concept: `chem.hyd.alkanes`
- Lesson/order: #136
- Learner message: give me example with numbers
- Tutor response: "…When bromine reacts… its relative rate of attacking a secondary hydrogen versus a primary hydrogen is about 1600 to 1! …" (example molecule: propane, which has no tertiary hydrogens)
- Expected behaviour: Br: 1° : 2° : 3° ≈ 1 : 82 : 1640 per H; Cl: 1 : 3.8 : 5.
- Actual behaviour: The tertiary:primary ratio is attributed to secondary:primary; chlorine's "4 to 1" is right, so the contrast is exaggerated 20×.
- Why it is a defect: Wrong constant presented as the key number of the example.
- Reproducibility: Observed once (#136 t17).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-075 — Tutor affirms an off-topic or non-answer as correct ("That's correct—…", "Great, you've captured the key idea", "Exactly—…")

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-05 14:48 UTC
- Account: Account 8
- Chemistry concept: `chem.hyd.alkanes`
- Lesson/order: #136
- Learner message: Alkanes (general formula CₙH₂ₙ₊₂) are SATURATED hydrocarbons — every carbon is sp³ (reply to "what do you notice about how the number of hydrogen atoms changes from four to five carbons?")
- Tutor response: "That’s correct—alkanes are saturated hydrocarbons with the formula CₙH₂ₙ₊₂, and each carbon atom is sp³‑hybridised…"
- Expected behaviour: Notice the learner did not answer the question asked (H count 10 → 12) and re-ask it.
- Actual behaviour: The question about the H count is never resolved; a sentence that does not answer it is praised. Same in #58 t6 ("Great, you've captured the key idea" to a radiotracer sentence while the open question was about a 95 %/5 % mixture) and #169 t2 ("Exactly—myoglobin is a single polypeptide chain…") to an unfinished fragment.
- Why it is a defect: Praise for non-answers means the tutor does not check what the learner actually said; a weak learner is told they are right.
- Reproducibility: Reproduced on 3 accounts (#136, #58, #169). Note: the learner text in these turns was produced by the test persona quoting taught content; the defect is the unconditional praise.
- Also observed (4 occurrences in 4 lessons): #58 (A4) t6; #169 (A10) t2; #81 (A5) t2; #51 (A3) tt5, t6
- Notes on occurrences: #81 t2: "you've hit on the exact mechanism behind sacrificial protection" to an unrelated test-persona sentence; same at t8 ("That is spot on") · #51 tt5, t6: "That calculation is spot‑on – the numbers line up correctly" in reply to "give me example"; "Great, you’ve followed the calculations so far" on "ok" — no calculation was made by the learner
- Related defect: —
- Status: PARTIALLY FIXED
- Fix: d5397b1 — on an ungraded turn whose message is an acknowledgement or a request ("ok", "give me example"), an opening affirmation is stripped (logged [non-answer-praise-stripped]). Not fixed: a free-text sentence praised as correct when it does not answer the open question — free text is not graded. Test: src/tests/chemBatchDTextShape.test.ts. **2026-10-07 pass (2350ff6):** Extended: "ok"/"next"/"got it" now count as turns that graded nothing, so an opening affirmation on them is dropped too, including one behind the learner's name (see CHEM-031).

### CHEM-076 — Wrong answer marked correct: OsO₄ dihydroxylation of cis-but-2-ene is said to give the (2R,3R)/(2S,3S) pair; it gives the MESO diol

- Severity: P1
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:49 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.diols`
- Lesson/order: #153
- Learner message: The (2R,3R) and (2S,3S) pair
- Tutor response: "Yes, exactly right. … Osmium tetroxide causes a syn-addition of two hydroxyl groups to the same face of the alkene, creating the (2R,3R) and (2S,3S) pair from cis-but-2-ene." (card option text: "…Anti addition, like Br₂, is what would have produced the meso diol")
- Expected behaviour: Syn addition to a cis (Z) alkene gives meso-butane-2,3-diol; the (R,R)/(S,S) racemate comes from the TRANS alkene with OsO₄ (or from anti addition to the cis alkene).
- Actual behaviour: The card's authored key is inverted: it marks the racemic pair correct, and marks "Meso" wrong while explaining it with the incorrect claim that syn addition cannot give meso. The learner is told they are "exactly right" and mastery is awarded on this card (final mastery card of the lesson).
- Why it is a defect: Objectively wrong stereochemistry taught and rewarded on a P1 assessment item; a learner who knows the correct answer is marked wrong. Source of the item: src/lib/teaching/assets/chemistrySeedAssets.ts ~L16851 (isCorrect: true on the (R,R)/(S,S) choice).
- Reproducibility: Observed once in the learner flow (#153 t5–t6); the key is static, so every learner who reaches the card gets the same result.
- Also observed (1 occurrence in 1 lesson): #137 (A8) tt14-t21
- Notes on occurrences: #137 tt14-t21: Corroborating contradiction: lesson #137 (account 8) correctly teaches that anti addition of Br₂ to cis-but-2-ene gives the racemic (d,l) pair, the opposite of the #153 card text "Anti addition, like Br₂, is what would have produced the meso diol"
- Related defect: —
- Status: FIXED
- Fix: 9160c3d — the authored key said OsO₄ on cis-but-2-ene gives the (R,R)/(S,S) pair; syn addition to a cis alkene gives the meso diol. Probe (chem.alc.diols:step_check:en:high) and the EB intervention line corrected. Test: src/tests/chemWrongKeys.test.ts. Production still serves the old key (read-only SQL, version 1, ACTIVE; the bootstrap is create-only) until scripts/assets/converge-probe-edits.ts --apply is run with owner approval. Converged to production 2026-10-06 (owner-approved write; read-back verified; backup docs/qa/backups/probe-converge-2026-10-06.json).

### CHEM-077 — Methoxide opening of propylene oxide: attack at the "less-hindered terminal CH₂" is said to give "2-methoxy-1-propanol" (it gives 1-methoxy-2-propanol); invented rate constant k ≈ 1×10⁴ M⁻¹ s⁻¹

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:50 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.epoxides`
- Lesson/order: #154
- Learner message: give me example with numbers
- Tutor response: "…the methoxide attacks the less‑hindered carbon (the terminal CH₂)… and gives 2‑methoxy‑1‑propanol. … the observed second‑order rate constant is about k ≈ 1 × 10⁴ M⁻¹ s⁻¹…" (the epoxide is drawn "CH₂‑CH‑CH₂ with an oxygen forming the triangle")
- Expected behaviour: Attack at CH₂ puts OMe on C1 and OH on C2: 1-methoxypropan-2-ol; propylene oxide is CH₃–CH(O)CH₂. Typical k for alkoxide opening at 25 °C is of order 10⁻⁴–10⁻³ M⁻¹ s⁻¹.
- Actual behaviour: Product name contradicts the stated regiochemistry; skeleton drawn with three CH₂/CH units and no CH₃; rate constant unsupported and ~8 orders of magnitude too large.
- Why it is a defect: Wrong regiochemistry label, wrong structure and a fabricated constant in the numeric example.
- Reproducibility: Observed once (#154 t7).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-078 — Reply consists only of a canned opener — "test0, this is genuinely tricky — let me try a completely different angle." — with no explanation after it

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 14:50 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.epoxides`
- Lesson/order: #154
- Learner message: ok
- Tutor response: "test0, this is genuinely tricky — let me try a completely different angle."
- Expected behaviour: The different-angle explanation.
- Actual behaviour: The reply stops after the opener (provider gemini, 14 s); next turn is another analogy.
- Why it is a defect: Dead-end message; learner is told it is "tricky" after saying "ok".
- Reproducibility: Observed once (#154 t14).
- Related defect: —
- Status: FIXED
- Fix: 5fad26c — "…let me try a completely different angle." with nothing after it is an undelivered promise; a reply that is only that line gets the concept fallback instead of a dead end. Test: src/tests/chemOpenDefectsBatchG.test.ts.

### CHEM-079 — "show me step by step" / "ok" answered with a lone probing question that presupposes something the learner never said ("How did you decide…", "Can you walk me through how you thought…")

- Severity: P2
- Category: Adaptation
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 2
- Chemistry concept: `chem.period.modern-periodic-law`
- Lesson/order: #20
- Learner message: show me step by step
- Tutor response: "How did you decide that elements in the same row of the table should have very similar chemical behavior?"
- Expected behaviour: The requested steps.
- Actual behaviour: A single Socratic question about a belief the learner did not state in this turn (it refers to a wrong card answer 5 turns earlier or to nothing at all).
- Why it is a defect: The learner asks for help and receives an unanswerable question.
- Reproducibility: Reproduced on 4 accounts: #20 t11, #78 t1, #81 t7 ("What do you notice about a piece of iron…"), #3 t5 / #58 t5 (as the reply to a wrong card answer).
- Also observed (25 occurrences in 25 lessons): #78 (A5) t1; #81 (A5) t7; #3 (A1) t5; #58 (A4) t5; #86 (A5) t1; #107 (A6) t13; #180 (A10) t16; #30 (A2) t24; #49 (A3) t13; #110 (A6) t1; #111 (A6) t15; #163 (A9) t3; #91 (A5) tt11,t12; #113 (A6) tt2,t10; #183 (A10) t10; #72 (A4) tt13,t14; #93 (A5) t16; #114 (A6) t4; #184 (A10) t21; #166 (A9) t1; #55 (A3) t5; #168 (A9) t4; #36 (A2) t6; #75 (A4) t8; #38 (A2) t8
- Notes on occurrences: #78 t1: "Can you walk me through how you thought you could calculate the limiting molar conductivity of acetic acid?" (reply to "ok") · #81 t7: "What do you notice about a piece of iron when you put it in salty water versus plain fresh water?" (reply to "show me step by step") · #3 t5: "How did you decide that a bowl of mixed nuts is a homogeneous mixture?" (reply to a wrong card answer, no verdict) · #58 t5: "I see you chose “No.” Could you walk me through how you decided…" (reply to a different card) · #86 t1: "How did you decide that using T = 25 °C was fine? Walk me through the steps you took to reach “nothing is wrong.”" (reply to "ok") · #107 t13: "what is this?" -> "Are you wondering why Mg²⁺ can’t serve as the light‑absorbing part… or do you want a quick definition of…?" (clarifying question instead of describing the picture) · #180 t16: "why?" -> "what do you notice is being released there?" alone · #30 t24: "explain simpler" -> "You mentioned it might be an experimental error—can you walk me through the reasoning…?" (no simpler explanation)
- Related defect: —
- Status: PARTIALLY FIXED
- Fix: d5397b1 — after "ok" or a request, with nothing graded, question sentences that presuppose a learner attempt ("How did you decide…?", "walk me through how you thought…") are removed; an emptied reply gets the one no-question regeneration (confirmBackRepair.ts dropPresupposedAttemptQuestions, logged [presupposed-attempt]). "show me step by step" also gets the CHEM-015 shape check. Not covered: the same question after a card answer (#3 t5). Test: src/tests/chemBatchDReuseAndProbing.test.ts.

### CHEM-080 — Wrong-answer feedback discusses a different scenario than the card (galvanised nail card → explanation about a tin-plated can)

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 14:52 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.corrosion`
- Lesson/order: #81
- Learner message: Tin (Sn) (to "Which metal acts as the anode for the galvanized iron nail in salty water?")
- Tutor response: "This is genuinely tricky, test5, so let's slow down and look at why tin behaves differently than you might expect. When you scratch a tin-coated iron can, the tin actually makes the iron underneath corrode faster…"
- Expected behaviour: "Not quite — a galvanised nail is zinc-coated: zinc (E° −0.76 V) is the anode, so tin is not involved."
- Actual behaviour: The reply explains tin-plating; the learner is never told zinc is the answer or why tin does not apply. (Verdict wording absent too.)
- Why it is a defect: Feedback is not about the question that was asked; the right answer is never stated.
- Reproducibility: Observed once (#81 t16).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 70 distinct cards served in 31 lessons, all authored (stems found in the corpus); 0 replies with lettered A)/B)/C) options in 399 turns.

### CHEM-081 — Debatable item: "True or false: 'cathodic protection' is so called because it protects the cathode of the corrosion cell" — keyed False

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:52 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.corrosion`
- Lesson/order: #81
- Learner message: False
- Tutor response: "That's right. Cathodic protection works by forcing the protected metal to become the cathode of the corrosion cell."
- Expected behaviour: An unambiguous statement.
- Actual behaviour: The protected structure IS the cathode, so "it protects the cathode" is arguably true; the key marks it False on a wording technicality and then explains with the sentence that makes it true.
- Why it is a defect: Reasoning learner could be penalised; feedback self-contradicts.
- Reproducibility: Observed once (#81 t16–t17).
- Also observed (2 occurrences in 2 lessons): #84 (A5) t8; #65 (A4) t4
- Notes on occurrences: #84 t8: wrong answer "3" to "if the concentration is 3 mol/L, what is the rate?" -> reply discusses 2 mol/L ("the vertical rate is 4, because 2 squared is 4"); the right answer (9) is never given · #65 t4: wrong answer "Neither ion" to "Which ion in sodium acetate will undergo hydrolysis?" -> "Exactly—when you dissolve table salt (NaCl)… neither the sodium ion nor the chloride ion reacts"; acetate is never named as the answer
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Authored card corrected in the repo (`src/lib/teaching/assets/chemistrySeedAssets.ts`). The production row is not yet updated: the asset bootstrap is create-only, so the edit reaches production only through an owner-approved convergence write (`scripts/assets/converge-probe-edits.ts --apply`, backup first, precedent docs/qa/backups/probe-converge-2026-10-06.json). One unambiguous true statement about which electrode the protected steel becomes. **2026-10-10:** converged to production (owner-approved write; the 7 production rows matched the old corpus exactly before the write; read-back after the write matches the corpus 7/7 on stem, choices and key; backup docs/qa/backups/probe-converge-2026-10-10.json). **Live re-drive 2026-10-10:** the corrected card was served in production with the new text.

### CHEM-082 — Figure labels are quoted/cut mid-phrase in tutor text and card options ("Check for trapped zeros between", "Determine trailing zeros based on", "Identify mixture type (homogeneous or", "Williamson synthesis: alkyl halide +")

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:53 UTC
- Account: Account 1
- Chemistry concept: `chem.found.significant-figures`
- Lesson/order: #5
- Learner message: Evaluate leading zeros as never
- Tutor response: MCQ "Which step of the figure tells you how to count the non-zero digits in a measurement?" options: "Identify all non‑zero digits" / "Check for trapped zeros between" / "Evaluate leading zeros as never" / "Determine trailing zeros based on"
- Expected behaviour: Full step labels as in the figure ("Check for trapped zeros between non-zero digits", "Evaluate leading zeros as never significant", "Determine trailing zeros based on decimal presence").
- Actual behaviour: The served figure payload has the full titles; the card options and tutor quotations cut them at ~32–35 characters, mid-phrase. The card itself tests figure-reading, not chemistry.
- Why it is a defect: Truncated text reads as broken; the card is also an easy label-matching item that counts toward mastery.
- Reproducibility: Seen in #5, #3 t6 ("Identify mixture type (homogeneous or"), #99/#152 ("Williamson synthesis: alkyl halide +", "Cleavage with HX: ether + HX → alkyl"), #20.
- Also observed (3 occurrences in 3 lessons): #3 (A1) tt6-t9; #152 (A9) tt1,t15; #138 (A8) tt7
- Notes on occurrences: #3 tt6-t9: "Identify mixture type (homogeneous or" quoted several times · #152 tt1,t15: "Williamson synthesis: alkyl halide +", "Cleavage with HX: ether + HX → alkyl" · #138 tt7: card options "Preparation of Alkynes via" / "Acidic Character: Protonation of the" (truncated figure labels)
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 on 864e3fd (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Cause: `conceptText.extractSteps` clamped every process step to 60 characters ("Check for trapped zeros between"). Steps are now kept whole up to 140; a step longer than a box title gets a short title with an ellipsis and its full wording in the box note (`archetypes.processFlow`). The figure-label card options came from model-written cards, which are no longer served (owner decision 2026-10-07). Test: src/tests/remainingDefectFixes20261007.test.ts. **Live re-drive 2026-10-10:** the approved sig-figs figure stores the full labels; visualSemantics.ts cut each label to 40 characters when describing the figure to the tutor, which read out "Check for trapped zeros between". Labels are now described whole (60); a label that genuinely stops mid-phrase is refused on every re-validating tier (truncated-step-label). Test: remainingDefectFixes20261007.test.ts.

### CHEM-083 — Process-flow figure used for a list of unrelated reactions ("Key Reactions Involving Ethers"): arrows imply a sequence Williamson → cleavage → epoxide opening → "diethyl ether as common solvent"

- Severity: P3
- Category: Visuals
- Date/time: 2026-10-05 14:41 UTC
- Account: Account 9
- Chemistry concept: `chem.alc.ethers`
- Lesson/order: #152
- Learner message: ok
- Tutor response: (visualSpec process_flow, steps: "Williamson synthesis: alkyl halide + alkoxide → ether", "Cleavage with HX: ether + HX → alkyl halide + alcohol", "Epoxide ring opening: epoxide + base → diol", "Diethyl ether as common solvent")
- Expected behaviour: A summary/concept map, or separate reaction schemes.
- Actual behaviour: A linear process-flow that reads as one multi-step process; the 4th box is not a step.
- Why it is a defect: Figure form misrepresents the content (sequence where there is none).
- Reproducibility: Observed on #152.
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** The figure critic rejects a process_flow whose title names a catalogue ("Key Reactions", "Types of", "Uses of" …) and not a process, or whose boxes are mostly self-contained reactions under a non-sequence title (`figureCritic.processFlowIsAList`); a rejected figure is not shown. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-084 — Manganese(II) oxide MnO described as "pale pink" (MnO is green; pale pink is the colour of Mn²⁺ salts/solutions)

- Severity: P3
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:53 UTC
- Account: Account 7
- Chemistry concept: `chem.dblock.general`
- Lesson/order: #119
- Learner message: give me example
- Tutor response: "Manganese(II) oxide, MnO, where manganese is in the +2 oxidation state and the solid looks pale pink."
- Expected behaviour: MnO is a green (grey-green) solid.
- Actual behaviour: Wrong colour for the oxide used to illustrate "colour changes with oxidation state".
- Why it is a defect: Factual error in the colour example of the lesson.
- Reproducibility: Observed once (#119 t3).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-085 — Phase-diagram lines described wrongly ("sloping line from bottom-right up toward top-left separates solid from gas") and CO₂ "raise the pressure to 5.11 atm … we reach the triple point" at −78.5 °C

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:54 UTC
- Account: Account 3
- Chemistry concept: `chem.state.phase-diagram`
- Lesson/order: #42
- Learner message: ok / give me example with numbers
- Tutor response: t1: "The lower‑left curve separates solid from liquid, the upper‑right curve separates liquid from gas, and the sloping line that runs from the bottom‑right up toward the top‑left separates solid from gas." t2: "At −78.5 °C and 1 atm, dry ice turns straight into a gas… If we raise that pressure up to 5.11 atmospheres, we reach… the triple point."
- Expected behaviour: The sublimation (solid–gas) curve rises left-to-right from the bottom-left to the triple point; CO₂'s triple point is 5.11 atm AND −56.6 °C, not −78.5 °C.
- Actual behaviour: Wrong slope/placement for the solid–gas line; at −78.5 °C and 5.11 atm CO₂ is still solid, so raising pressure alone does not reach the triple point.
- Why it is a defect: Two objectively wrong statements in the lesson's only explanations of the diagram and its numeric example.
- Reproducibility: Observed once (#42 t1, t2).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-086 — The "Phase Diagrams" lesson serves no figure at all, although the learner asks about "this picture" four times (earlier audit PCD-027 found a wrong-domain plot for the same concept)

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-05 14:54 UTC
- Account: Account 3
- Chemistry concept: `chem.state.phase-diagram`
- Lesson/order: #42
- Learner message: i dont understand this picture
- Tutor response: t10/t16: treasure-map and mountain-trail analogies ("Think of a treasure map where the axes are temperature going across and pressure going up…")
- Expected behaviour: A labelled phase diagram (triple point, critical point, solid/liquid/gas regions).
- Actual behaviour: No figure channel (visual / visualSpec / sceneSpec / dynamic code) was returned on any of the 18 turns; the tutor describes an imaginary sheet of paper instead.
- Why it is a defect: The one lesson that is entirely about reading a diagram has no diagram.
- Reproducibility: Observed once (#42). Related: PCD-027 (docs/qa/PHYSICS_CHEMISTRY_REAL_STUDENT_DEFECTS.md).
- Related defect: —
- Status: FIXED
- Fix: 440b55c — chem.state.phase-diagram now has a curated Tier-0 figure (existing buildCellComparisonScene: regions, boundary curves, triple point, critical point; values from the EB entry). Test: src/tests/chemBatchEVisuals.test.ts. Rendering in production not checked.

### CHEM-087 — Lesson drifts into the previous lesson's topic: in "Phase Diagrams" the tutor pauses to teach liquid surface tension/vapour pressure (the topic of lesson #41 completed minutes earlier on the same account)

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 14:54 UTC
- Account: Account 3
- Chemistry concept: `chem.state.phase-diagram`
- Lesson/order: #42
- Learner message: ok
- Tutor response: "Got it—let’s pause the phase‑diagram discussion and look at a key property of liquids that will help later. Imagine a drop of water resting on a clean glass surface… surface tension…" (continues for t12–t14: liquid state, evaporation, vapour pressure)
- Expected behaviour: Continue with phase diagrams (triple point, critical point, water's anomaly).
- Actual behaviour: Four turns re-teach the content of #41 "Liquid State Properties"; only 2 phase-diagram cards are ever served.
- Why it is a defect: Possible carry-over of the previous lesson on the same account into a new session; the learner who said "ok" is pulled off the topic. (Cause not established — could be tutor planning, could be session carry-over.)
- Reproducibility: Observed once (#42 t11–t14); #41 and #42 were both account 3, run back to back.
- Related defect: —
- Status: NOT REPRODUCED
- Fix: **2026-10-07 pass (2350ff6):** Same shape as CHEM-148 / BIO-042: the run that logged it drove several lessons in one session without a tab id; with one tab id per lesson (f685494, verified in production 2026-10-06) the lesson-scoped ledgers kept each lesson on its own concept. The drift guard (this pass) also covers a continuation turn that names nothing of the lesson.

### CHEM-088 — "The triple point of water … defines the kelvin scale" (outdated since the 2019 SI redefinition; the kelvin is now defined via the Boltzmann constant)

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 14:54 UTC
- Account: Account 3
- Chemistry concept: `chem.state.phase-diagram`
- Lesson/order: #42
- Learner message: A single, precisely-defined temperature-pressure coordinate (card answer)
- Tutor response: "For water it is precisely 0.01 °C and 611.657 Pa. This exact point defines the kelvin scale."
- Expected behaviour: "…it was used to define the kelvin until 2019".
- Actual behaviour: Stated in the present tense as current fact.
- Why it is a defect: Out-of-date factual claim.
- Reproducibility: Observed once (#42 t7).
- Related defect: —
- Status: FIXED
- Fix: 7476752 — the seed option and the EB entry said the triple point defines the kelvin; both now say it did until the 2019 SI redefinition (chem.state.phase-diagram:misconception_probe:en:high). The observed sentence was model output drawing on that claim. Test: src/tests/chemBatchFContent.test.ts. Converged to production 2026-10-06 (owner-approved write; read-back verified; backup docs/qa/backups/probe-converge-2026-10-06.json).

### CHEM-089 — Orders of magnitude misstated for water ionisation: "one hundred-millionth of a mole" for 1×10⁻⁷ M, and "two out of every ten million molecules" ionised (≈ 2 in a billion)

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 14:53 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.kw-ph`
- Lesson/order: #61
- Learner message: i dont understand / give me example
- Tutor response: t2: "…about one hundred‑millionth of a mole of each ion in every litre, giving a concentration of 1 × 10⁻⁷ M". t7: "…two out of every ten million molecules naturally break apart into a hydrogen ion and a hydroxide ion… like 0.0000001 moles per litre".
- Expected behaviour: 1×10⁻⁷ is one ten-millionth; [H⁺]/[H₂O] = 10⁻⁷/55.5 ≈ 1.8×10⁻⁹, i.e. about 2 molecules in every billion.
- Actual behaviour: The verbal magnitude is wrong in t2 (10⁻⁸) and the "molecules" statistic in t7 is ~200× too large; both are given beside the correct 10⁻⁷ M figure.
- Why it is a defect: Learner is taught wrong magnitudes in the lesson's core fact; the two replies also disagree with each other.
- Reproducibility: Observed twice in one lesson (#61 t2, t7).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-090 — Atomic radii for Na and Cl change between two replies of the same lesson (Na 223 pm / Cl 79 pm vs Na 186 pm / Cl 99 pm) without saying which convention is used

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 14:56 UTC
- Account: Account 2
- Chemistry concept: `chem.period.periodic-properties`
- Lesson/order: #24
- Learner message: give me example with numbers / why?
- Tutor response: t2: "Sodium has an atomic radius of about two hundred and twenty-three picometres, while chlorine is much smaller at about seventy-nine picometres". t3: "For sodium… about one hundred eighty-six picometres… chlorine… about ninety-nine picometres."
- Expected behaviour: One consistent data set (e.g. metallic/covalent radii) or an explicit note that radii depend on the definition.
- Actual behaviour: Two different radii for the same atoms two turns apart; a later card quotes Na 186 pm / Na⁺ 102 pm / Cl 99 pm / Cl⁻ 181 pm (and lessons #21/#22 use 186/99).
- Why it is a defect: The learner who asks for numbers twice gets two sets; no way to know which is right.
- Reproducibility: Observed once (#24 t2/t3), consistent with #21 and the #24 cards.
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-091 — Stale answer key still live in production: "2g of H₂ contains more" is accepted as correct for "Which contains more molecules: 2 g H₂ or 32 g O₂?" while the feedback says they contain the same number

- Severity: P1
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:57 UTC
- Account: Account 1
- Chemistry concept: `chem.found.mole-concept`
- Lesson/order: #6
- Learner message: 2g of H₂ contains more
- Tutor response: "Yes, exactly right. Both samples are one mole, so they contain the same number of molecules. 2 g of H₂ is 1 mol, and 32 g of O₂ is also 1 mol. Your choice matches this reasoning." (card options served: "32g of O₂" / "2g of H₂" / "2g of H₂ contains more"; lesson then marked mastered)
- Expected behaviour: The key is the equal-number option ("They contain the same number — 2g of H₂ is 1 mol…"); "2g of H₂ contains more" is wrong.
- Actual behaviour: Production still serves the pre-2026-10-01 version of the item (the repo's chemistrySeedAssets.ts comment says the head "said the opposite of its own working and was served as the key (live, 2026-10-01)" and was corrected). The wrong option is credited as correct; the same turn's explanation contradicts it. This is the lesson's deciding mastery card (c1/p2 → TRANSFER verified).
- Why it is a defect: A false chemical statement is marked right and mastery is awarded on it; the repo fix has not converged to the served assets (the bootstrap is create-only, so content edits do not reach production by themselves).
- Reproducibility: Deterministic for every learner who is served this card. Detected by diffing the served card options against the current repo probe (scratch check; only this item and 2 cosmetic wording diffs among the cards compared so far).
- Also observed (1 occurrence in 1 lesson): #6 (A1) t9
- Notes on occurrences: #6 t9: mid-lesson "✓ What you mastered — you can now explain why we use the mole as a counting bridge…" appended to a card-answer reply at t9
- Related defect: —
- Status: FIXED
- Fix: 9160c3d — the repo item (chem.found.mole-concept:mcq:en:high) was already corrected, but production still serves the old key (read-only SQL, version 1, ACTIVE): the bootstrap is create-only. scripts/assets/converge-probe-edits.ts reports drift read-only; --apply updates only named slugs after writing a JSON backup; --restore undoes it. Not run against production — needs owner approval. Converged to production 2026-10-06 (owner-approved write; read-back verified; backup docs/qa/backups/probe-converge-2026-10-06.json).

### CHEM-092 — Garbled electrode label in the Copper Electroplating figure: "Cu (pure, impure at cathode) (anode)"; one copper figure stands for the whole "Industrial Electrolysis" lesson (chloralkali, Hall–Héroult, Down's cell)

- Severity: P3
- Category: Visuals
- Date/time: 2026-10-05 14:57 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.industrial`
- Lesson/order: #82
- Learner message: ok / next question please
- Tutor response: sceneSpec labels: "Cu (pure, impure at cathode) (anode)" / "object to be plated (cathode)" / "Cu2+ in solution" (twice); tutor reads it out: "from the red `Cu (pure, impure at cathode) (anode)` to the blue `object to be plated (cathode)`".
- Expected behaviour: "Cu (anode)" for plating (or "impure Cu anode / pure Cu cathode" for refining) and a figure matching the processes asked about.
- Actual behaviour: The label mixes the refining description with the plating cell; the only figure of the lesson is a copper electroplating cell while the cards are about Hall–Héroult cryolite/carbon anodes, aluminium recycling and chloralkali vs Down's cells.
- Why it is a defect: Label is unreadable chemistry; the figure does not support most of the lesson.
- Reproducibility: Observed once (#82).
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** The plating anode is labelled "Cu" (`conceptSceneParams.ts`, chem.elect.industrial). Electroplating is one of the four processes in the concept's KG line, so the plating cell stays the concept figure; the pointer now names it. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-093 — Learner name glued to the previous word: "…how electroplating workstest5!"

- Severity: P3
- Category: UX
- Date/time: 2026-10-05 14:57 UTC
- Account: Account 5
- Chemistry concept: `chem.elect.industrial`
- Lesson/order: #82
- Learner message: why?
- Tutor response: "That \"why\" gets straight to the heart of how electroplating workstest5! Think of it like a magnet and metal filings…"
- Expected behaviour: "…how electroplating works, test5!"
- Actual behaviour: Name inserted without a separator.
- Why it is a defect: Typo-level glitch in generated text; seen once in 59 lessons.
- Reproducibility: Observed once (#82 t7).
- Related defect: —
- Status: FIXED
- Fix: 5fad26c — the learner's name glued to the word before it ("workstest5!") is separated ("works, test5!"), only for a name of 3+ characters that is capitalised or carries a digit, right before punctuation (secondPerson.ts separateGluedName). Test: src/tests/chemOpenDefectsBatchG.test.ts.

### CHEM-094 — Opening example says a copper wire dipped in water "reacts with the water and the surface dissolves, turning the liquid a vivid blue"

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:57 UTC
- Account: Account 7
- Chemistry concept: `chem.dblock.first-row`
- Lesson/order: #120
- Learner message: ok
- Tutor response: "When you dip a small piece of that wire into water, the metal doesn’t stay copper‑metal for long – it reacts with the water and the surface dissolves, turning the surrounding liquid a vivid blue. That blue color tells us that copper ions (Cu²⁺) are now floating in the solution."
- Expected behaviour: Copper does not react with water; blue Cu²⁺(aq) comes from dissolving a copper salt (or from oxidising copper with an oxidising acid).
- Actual behaviour: False reaction used as the lesson's very first example of coloured ions.
- Why it is a defect: Objectively wrong demonstration; also the same reply says a statue "stays bright red-orange" under Cu₂O (copper statues weather to green patina).
- Reproducibility: Observed once (#120 t1).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-095 — Introductory "Ionic Bonding" lesson is taught from a five-box Born–Haber "cycle" figure (sublimation, dissociation, ionisation, electron affinity, lattice formation) before the learner has met the ionic bond; the "cycle" is a linear process-flow with no ΔH values

- Severity: P3
- Category: Visuals
- Date/time: 2026-10-05 15:01 UTC
- Account: Account 2
- Chemistry concept: `chem.bond.ionic-bonding`
- Lesson/order: #26
- Learner message: ok / show me step by step
- Tutor response: "Looking at the Born-Haber cycle diagram on your screen, notice how the steps flow from left to right… ionization energy… electron affinity… Lattice formation"; t2: "…a bottle of chlorine ₂ gas" (the "Cl" of Cl₂ is missing, a narrow no-break space precedes the subscript)
- Expected behaviour: A simple picture of electron transfer and ion lattice first; Born–Haber later.
- Actual behaviour: A weak learner is walked through five energy terms in the first two turns; the text also contains the garbled "chlorine ₂ gas".
- Why it is a defect: Level jump and a typographic glitch; the visual does not match the introductory concept.
- Reproducibility: Observed once (#26).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** chem.bond.ionic-bonding now owns a curated electron-transfer figure (Na 2,8,1 → electron transferred → Na⁺ / Cl⁻ → opposite charges attract), so the live-generated Born–Haber flow is no longer reached; the concept left the retired-figure register (`retired.ts`, 15 → 14 rows). Test: src/tests/remainingDefectFixes20261007.test.ts. **Live re-drive 2026-10-10:** chem.bond.ionic-bonding served "Ionic Bonding: One Electron Moves from Na to Cl".

### CHEM-096 — Wrong answer marked correct: in [Co(NH₃)₄Cl₂]⁺ "chlorido" is said to be written before "ammine" ("alphabetical order")

- Severity: P1
- Category: Chemistry correctness
- Date/time: 2026-10-05 14:58 UTC
- Account: Account 6
- Chemistry concept: `chem.coord.nomenclature`
- Lesson/order: #102
- Learner message: chlorido
- Tutor response: "That's right. Ligand names are listed alphabetically, and chlorido precedes ammine… For example, [Co(NH3)4Cl2]+ is written as chloridoammine."
- Expected behaviour: ammine (a) precedes chlorido (c): tetraamminedichloridocobalt(III). The lesson's own card at t6 uses exactly that name.
- Actual behaviour: The authored key (chemistrySeedAssets.ts ~L11004: "chlorido — … (chlorido before ammine)" isCorrect: true; "ammine" isCorrect: false) inverts the alphabetical rule, and the feedback invents the name "chloridoammine". A learner who answers "ammine" is told "Not quite".
- Why it is a defect: The core naming rule of the lesson is taught backwards and rewarded; contradicted within the same lesson by the "tetraamminedichloridocobalt(III)" card.
- Reproducibility: Static key — occurs for every learner served this card (served in #102 t12 on account 6).
- Related defect: —
- Status: FIXED
- Fix: 9160c3d — the key said chlorido is written before ammine; alphabetical order gives tetraamminedichloridocobalt(III) (a before c). Probe chem.coord.nomenclature:checkpoint:en:undergraduate corrected; the EB entry was already right. Test: src/tests/chemWrongKeys.test.ts. Production still serves the old key until the owner-approved convergence run. Converged to production 2026-10-06 (owner-approved write; read-back verified; backup docs/qa/backups/probe-converge-2026-10-06.json).

### CHEM-097 — Chromate/dichromate worked example uses K ≈ 10³ (real value ≈ 10¹⁴), producing only 10⁻³ M dichromate at pH 2 — contradicting the lesson's "acid turns yellow chromate orange"

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 15:00 UTC
- Account: Account 7
- Chemistry concept: `chem.dblock.oxo-species`
- Lesson/order: #121
- Learner message: give me example with numbers
- Tutor response: "2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O has an equilibrium constant K ≈ 10³ (the acid‑driven direction is strongly favoured)… [Cr₂O₇²⁻] = 10³ × (0.10)² × (10⁻²)² = 10⁻³ M."
- Expected behaviour: K ≈ 10¹⁴ at 25 °C; at pH 2 with 0.10 M chromate the mixture is mostly dichromate (orange).
- Actual behaviour: With the quoted K the calculation shows only ~1 % conversion at pH 2 — i.e. the solution would stay yellow — while the same reply calls the acid direction "strongly favoured" and the earlier card says acid turns it orange.
- Why it is a defect: A wrong constant makes the numeric example contradict the lesson's main observation.
- Reproducibility: Observed once (#121 t15).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-098 — Small factual slips in one lesson: "white crystals of potassium permanganate", "the two oxygens give a total of −14" (Cr₂O₇²⁻ has seven), "a manganese atom (element 7)"

- Severity: P3
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:00 UTC
- Account: Account 7
- Chemistry concept: `chem.dblock.oxo-species`
- Lesson/order: #121
- Learner message: give me example / (card answer +6) / too many words
- Tutor response: t3: "Imagine you place a few white crystals of potassium permanganate (KMnO₄)…"; t6: "The two oxygens give a total of -14, and the overall charge is -2…"; t17: "Imagine a manganese atom (element 7)…"
- Expected behaviour: KMnO₄ crystals are dark purple; seven O atoms (−14); manganese is element 25 (group 7).
- Actual behaviour: Three wrong statements in three replies of one lesson.
- Why it is a defect: Objective errors, individually minor.
- Reproducibility: Observed once (#121).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-099 — Alkyne worked examples misname compounds: "1-butyne (CH₃–C≡CH)" (that is propyne), "2-methyl-1-butyne (CH₃–C≡C–CH₃)" (2-butyne), "2-pentanone (CH₃–CO–CH₂–CH₃)" (butan-2-one), and NH₃ called "the ammonium ion" (pKa 38 vs 25)

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:00 UTC
- Account: Account 8
- Chemistry concept: `chem.hyd.alkynes`
- Lesson/order: #138
- Learner message: give me example with numbers / give me example
- Tutor response: t2: "Take 1‑butyne (CH₃‑C≡CH)… + CH₃I → CH₃‑C≡C‑CH₃, the product is but‑2‑yne… Because the alkyne's hydrogen is more acidic (lower pKa) than the ammonium ion…". t7: "…forming 2‑methyl‑1‑butyne (CH₃‑C≡C‑CH₃)… the ketone 2‑pentanone (CH₃‑CO‑CH₂‑CH₃)."
- Expected behaviour: 1-Butyne is HC≡C–CH₂CH₃; CH₃C≡CCH₃ is but-2-yne; CH₃COCH₂CH₃ is butan-2-one; NH₃ (pKa ≈ 38) is the conjugate acid of NH₂⁻, not "the ammonium ion" (NH₄⁺, pKa ≈ 9).
- Actual behaviour: Four naming/species errors in two replies; the t2 worked product (but-2-yne) is also the option the lesson's own card marks wrong for "1-butyne + NaNH₂, then CH₃I" (key: pent-2-yne).
- Why it is a defect: The learner who follows the worked example reaches a different answer than the lesson's card; names and formulae do not match.
- Reproducibility: Observed once (#138 t2, t7).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-100 — Dashboard is clipped on the right at phone width (390×844): stat chips, hero banner, goal card and the subject-progress "0%" labels extend ~27 px past the viewport

- Severity: P2
- Category: UX
- Date/time: 2026-10-05
- Account: Account 2
- Chemistry concept: `(dashboard, Chemistry learner)`
- Lesson/order: #28
- Learner message: (opened /dashboard after login in a 390×844 browser)
- Tutor response: n/a (UI). DOM measurement: DIV.dashboard_topbar / dashboard_top-stats / dashboard_hero-banner / goal-card right edge = 417 px while window.innerWidth = 390; documentElement.scrollWidth = 390 (so the overflow is clipped, not scrollable).
- Expected behaviour: All dashboard content fits inside the 390 px viewport (16 px gutters).
- Actual behaviour: The ❤ stat chip, the hero banner artwork, "view all" links and the right-hand progress percentages are cut off in the screenshot.
- Why it is a defect: Mobile layout defect on the first screen a learner sees; hides progress values.
- Reproducibility: Reproduced on accounts 1 and 2 (same layout). Desktop width not checked.
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Dashboard grid: `grid-template-columns: minmax(0, 1fr)` and `min-width: 0` on its children at ≤900 px (a plain 1fr track grew to its widest child, 417 px), plus a ≤480 px block (16 px gutters, wrapping stat chips, smaller hero padding and mascot) in `dashboard.module.css`. Not measured in a browser in this pass. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-101 — Lesson opens with a content-free "degraded" placeholder: "Let's take one small step together. I'll walk through it with you and pause whenever it helps."

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 15:04 UTC
- Account: Account 3
- Chemistry concept: `chem.sol.solubility`
- Lesson/order: #44
- Learner message: (lesson-init)
- Tutor response: (provider "degraded") "Let's take one small step together. I'll walk through it with you and pause whenever it helps. We can continue from here whenever you're ready."
- Expected behaviour: A lesson introduction naming Solubility and Henry's Law with a first question, or a visible error/retry.
- Actual behaviour: Generic filler with no topic, no goal, no question. The next turn ("ok") recovered normally.
- Why it is a defect: Learner opens a lesson and receives nothing about it; happened during 10-account concurrent load (one provider fallback).
- Reproducibility: Observed once in ~75 lesson openings (#44). A second "degraded" provider value appeared mid-lesson at #175 t4 with normal text.
- Also observed (6 occurrences in 6 lessons): #122 (A7) t7; #28 (A2) t0; #44 (A3) t0; #45 (A3) t0; #124 (A7) t0; #146 (A8) t0
- Notes on occurrences: #122 t7: mid-lesson degraded placeholder as reply to "i dont know": "Let\x27s take one small step together. I\x27ll walk through it with you and pause whenever it helps."
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** With every provider down, the concept's own authored explanation that the learner has not yet seen is served instead of the outage copy (chat: `findUnseenExplanationContent` in the all-providers-down branch, which then does not count as an outage turn; lesson-init: the authored explanation opens the lesson under its title). The outage copy remains only when no unseen authored explanation is left. Provider capacity itself (Gemini credits, OPENROUTER_API_KEY, Groq tier) is still an owner action. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-102 — Tutor says goodbye mid-lesson with an invented session limit ("Since our session time is wrapping up, let's pause here… See you next time!") and then continues the lesson

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 15:08 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.buffer`
- Lesson/order: #64
- Learner message: show me step by step
- Tutor response: t16: "This is genuinely tricky, test4 — you've put in a huge effort… Since our session time is wrapping up, let's pause here so you can take a well-earned break… Next time, we'll pick right back up… See you next time!" t18 (reply to "continue"): "…rest up, and I'll see you next time!" — in between, t17 carries on with a sponge analogy.
- Expected behaviour: The requested steps; no invented session end.
- Actual behaviour: Two farewells at turns 16 and 18 (provider gemini); no session limit exists in the product; the lesson is formally paused only at t19.
- Why it is a defect: Misleading and contradictory (says the session is over, then keeps teaching); the learner asked for steps and got none.
- Reproducibility: Observed once (#64, account 4); searched all 77 transcripts for the phrases — no other occurrence.
- Also observed (1 occurrence in 1 lesson): #122 (A7) t17
- Notes on occurrences: #122 t17: "you\x27ve hit a frustrating wall… let\x27s close this topic for today and give your brain a fresh start. Next up, we will dive into a brand-new…" (reply to "explain again"); lesson continues t18–t22
- Related defect: —
- Status: FIXED
- Fix: 5fad26c — on a turn that does not complete the lesson, invented session-end sentences ("our session time is wrapping up", "see you next time") are removed with the meta-talk sweep (reuseCaps.ts). Test: src/tests/chemOpenDefectsBatchG.test.ts.

### CHEM-103 — A wrong card answer that was just corrected ("rate = k[A][B]") is later praised as "exactly the correct form… a solid start"

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:05 UTC
- Account: Account 5
- Chemistry concept: `chem.kinet.rate-law`
- Lesson/order: #84
- Learner message: why?
- Tutor response: "I hear you—let’s take a moment. You’ve already written the basic rate‑law expression `rate = k[A][B]`, which is exactly the correct form for a reaction that is first order in each reactant. That’s a solid start!"
- Expected behaviour: An answer to "why?" about the exponents; no praise of the answer marked wrong two turns earlier.
- Actual behaviour: At t9 the same expression was marked "Not quite — the answer is: rate = k[A]²[B]¹"; at t11 it is called correct and the learner is told they have a solid start.
- Why it is a defect: Contradictory feedback on the lesson's key skill (reading orders from data); the "why?" is not answered.
- Reproducibility: Observed once (#84 t9 → t11).
- Related defect: —
- Status: DEPLOYED — live on production since 2026-10-09 (deploy of a9ef53d, READY, aliased my-tutor-flame.vercel.app); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** A sentence that quotes an answer the server marked "Not quite" earlier in the same lesson and praises it is dropped, with a following bare praise sentence ("That's a solid start!") (`replyHygiene.dropPraiseOfCorrectedAnswer`, wrong answers read from this lesson's messages). Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-104 — "1 mol of concentrated HNO₃ (≈ 68 g)" — molar mass of HNO₃ is 63 g/mol (68 % is the acid strength)

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 15:06 UTC
- Account: Account 8
- Chemistry concept: `chem.hyd.arenes`
- Lesson/order: #139
- Learner message: (card answer) A reactive electrophile like a carbocation or nitronium ion
- Tutor response: "When 1 mol of concentrated HNO₃ (≈ 68 g) is mixed with excess concentrated H₂SO₄…"
- Expected behaviour: ≈ 63 g per mole of HNO₃ (not 68).
- Actual behaviour: Wrong mass in a "see the numbers" nitration walk-through (benzene 78 g and nitrobenzene 123 g/mol are right).
- Why it is a defect: Small but objective numeric error.
- Reproducibility: Observed once (#139 t3).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-105 — Acetone enol content given as "about 0.001 %" ("one in a hundred thousand molecules"); the real value is ~10⁻⁶ % or less (K_enol ≈ 10⁻⁸)

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 15:07 UTC
- Account: Account 9
- Chemistry concept: `chem.carb.ketones`
- Lesson/order: #157
- Learner message: give me example with numbers
- Tutor response: "…about 99.999% of the molecules sit in the \"Ketone\" form, while only about 0.001% sit in the \"Enol\" form. That means for every one hundred thousand molecules in the flask… just one is an enol."
- Expected behaviour: Enol fraction of liquid acetone ≈ 10⁻⁶ % to 10⁻⁸ (one in ~10⁸).
- Actual behaviour: Overstated by ~3 orders of magnitude.
- Why it is a defect: Wrong key number in the only numeric example of tautomerism.
- Reproducibility: Observed once (#157 t7).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-106 — A 10-glucose amylose fragment is said to weigh "10 × 180 = 1800 g/mol" (condensation loses 9 H₂O: ≈ 1638 g/mol) — the opposite of what the preceding lesson teaches

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 15:06 UTC
- Account: Account 10
- Chemistry concept: `chem.poly.natural`
- Lesson/order: #176
- Learner message: give me example with numbers
- Tutor response: "Imagine a short piece of amylose… 10 glucose units. Each glucose has a molar mass of 180 g mol⁻¹, so the whole fragment weighs 10 × 180 g mol⁻¹ = 1800 g mol⁻¹."
- Expected behaviour: 10 × 180 − 9 × 18 = 1638 g/mol (a condensation polymer weighs less than the sum of its monomers).
- Actual behaviour: The loss of water at each glycosidic link is ignored, although lesson #175 (same account, previous lesson) is entirely about subtracting the eliminated small molecule.
- Why it is a defect: Wrong result and a contradiction of the lesson taught immediately before; the same reply ends with an unrelated vulcanisation example and a card.
- Reproducibility: Observed once (#176 t7).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-107 — Under ten concurrent learners the tutor falls back to canned "degraded" replies for long stretches (up to 8 consecutive turns): learning is blocked, mastery counters freeze, and the fallback texts are generic or raw

- Severity: P1
- Category: Concurrency/session isolation
- Date/time: 2026-10-05
- Account: Account 1
- Chemistry concept: `chem.atomic.subatomic-particles`
- Lesson/order: #10
- Learner message: show me step by step / give me example / why? / give me example with numbers / i dont understand this picture / continue
- Tutor response: (provider "degraded") "I'm still getting my thoughts together on that one — give me a moment and try again." · "Something on my side isn't responding right now, so I can't teach this properly yet. This isn't anything you did. Please try again in a moment — your progress is saved." · "Let's take one small step together. I'll walk through it with you and pause whenever it helps. We can continue from here whenever you're ready." · "Which part of this would you like me to explain more — the idea itself, a worked example, or where it is used?" · "Subatomic Particles covers: Properties of proton, neutron and electron; atomic number, mass number; isotopes, isobars, isotones."
- Expected behaviour: Normal tutoring (or one honest outage message) when ten learners use the app at once.
- Actual behaviour: Between ~15:05 and ~15:19 UTC (≈25 min after all ten accounts began driving lessons in parallel, ~1 turn per 5–10 s per account) the share of "degraded" turns rose from isolated cases to 19/31 turns in #10, 16/31 in #177, 9/31 in #28, 8/31 in #45; max 8 consecutive degraded turns (#177). After the load was stopped for ~3 min a single session was served by groq normally. The five fallback texts above reached the learner; one is the raw curriculum goal line ("… covers: …").
- Why it is a defect: A small concurrent load (10 accounts) is enough to push every provider in the chain into fallback; the fallback content is a placeholder that neither teaches nor reports an error consistently, and the lesson keeps counting turns. (Cause not established — provider rate limit/spend limit are candidates; no server logs were read.)
- Reproducibility: Reproduced in 5 lessons on 5 accounts in the same 15-minute window; not reproducible with one account after a pause. The run was stopped when the pattern appeared (no further hammering) and resumed with a 25 s back-off and per-turn think-time.
- Also observed (112 occurrences in 71 lessons): #177 (A10) tt?/t-; #28 (A2) tt?/t-; #45 (A3) tt?/tmultiple/t-; #158 (A9) tt?/t-; #68 (A4) tt1,t5,t6,t7/t-; #88 (A5) tt2,t3,t10,t12,t14/t-; #109 (A6) tt1,t2,t7,t9,t12,t13/t-; #127 (A7) tt8,t13,t15,t17,t18/t-; #143 (A8) tt1,t5,t10,t12,t13/t-; #161 (A9) tt2,t4,t16,t21/t-; #180 (A10) tt13,t19/t-; #30 (A2) tt4,t6,t10,t14,t15,t20,t22/t-; #69 (A4) tt3,t7,t9,t11/t-; #49 (A3) tt8,t9,t10/t-; #89 (A5) tt7,t10,t17,t19,t21/t-; #110 (A6) tt1,t4,t12,t16/t-; #181 (A10) tt10,t13/t-; #162 (A9) tt6,t15/t-; #70 (A4) tt4,t7,t8,t11/t-; #31 (A2) tt1,t7,t12,t24,t26,t28/t-; #14 (A1) tt3,t5,t7,t9,t12,t14,t17,t18/t-; #50 (A3) tt11,t13,t14,t16/t-; #130 (A7) tt16,t18/t-; #15 (A1) tt9,t11,t15,t17,t18,t19/t-; #71 (A4) tt1,t4,t8,t17/t-; #131 (A7) tt9,t10/t-; #144 (A8) tt4,t14,t23,t24/t-; #182 (A10) tt9,t10,t11/t-; #91 (A5) tt7,t9,t10/t-; #164 (A9) tt5,t15,t16/t-; #51 (A3) tt3,t7,t13,t14,t16,t17/t-; #32 (A2) tt1,t6,t11,t13,t17,t19/t-; #16 (A1) tt3/t-; #113 (A6) tt4,t14/t-; #146 (A8) tt11,t16,t18/t-; #183 (A10) tt1,t10,t16/t-; #17 (A1) tt2,t10/t-; #33 (A2) tt4/t-; #184 (A10) tt12/t-; #165 (A9) tt4,t14/t-; #11 (A1) t-; #12 (A1) t-; #13 (A1) t-; #175 (A10) t-; #178 (A10) t-; #179 (A10) t-; #29 (A2) t-; #44 (A3) t-; #46 (A3) t-; #47 (A3) t-; #48 (A3) t-; #53 (A3) t-; #65 (A4) t-; #66 (A4) t-; #67 (A4) t-; #72 (A4) t-; #87 (A5) t-; #90 (A5) t-; #92 (A5) t-; #108 (A6) t-; #111 (A6) t-; #122 (A7) t-; #123 (A7) t-; #124 (A7) t-; #125 (A7) t-; #140 (A8) t-; #141 (A8) t-; #142 (A8) t-; #147 (A8) t-; #150 (A8) t-; #160 (A9) t-
- Notes on occurrences: #177 tt?: 16 of 31 turns degraded, longest streak 8 · #28 tt?: 9 of 31 turns degraded, longest streak 6 · #45 tt?: 8 of 31 turns degraded · #158 tt?: 3 degraded turns · #45 tmultiple: degraded open + 4 degraded turns; the final degraded replies ("Let me ask you something concrete…", "I\x27m still getting my thoughts together…") are followed by "Let\x27s pause Vapour Pressure of Solutions here for now" — lesson marked needs-review although the learner was at c1/p1 · #68 tt1,t5,t6,t7: degraded fallback replies · #88 tt2,t3,t10,t12,t14: degraded fallback replies; t14 "what's one thing you notice or find surprising" on "give me example" · #109 tt1,t2,t7,t9,t12,t13: degraded fallback replies incl. raw "covers:" line (t9) and "what's one thing you notice" (t2)
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified + OWNER ACTION (provider capacity)
- Fix: No code cause beyond 562c3c3. Production 2026-10-06 targeted probes: 6 degraded live replies in 36 turns while another session was running a Mathematics QA campaign on the same production deployment; graded answers still received their verdict. OPENROUTER_API_KEY missing (health endpoint). Owner: provider keys/credits and concurrent QA load. **2026-10-07 pass (2350ff6):** With every provider down, the concept's own authored explanation that the learner has not yet seen is served instead of the outage copy (chat: `findUnseenExplanationContent` in the all-providers-down branch, which then does not count as an outage turn; lesson-init: the authored explanation opens the lesson under its title). The outage copy remains only when no unseen authored explanation is left. Provider capacity itself (Gemini credits, OPENROUTER_API_KEY, Groq tier) is still an owner action. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-108 — Newman-projection item keyed "Four" for "how many bonds does the FRONT carbon show?" while the explanation says only three are drawn (the C–C bond "is not drawn")

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:22 UTC
- Account: Account 8
- Chemistry concept: `chem.hyd.conformations`
- Lesson/order: #140
- Learner message: Four
- Tutor response: "That's right. The front carbon is shown with three C-H bonds and the C-C bond lies along the line of sight, so it is not drawn as a separate line. Thus only four bonds appear on the front carbon… represented by the central dot and is not drawn as a line."
- Expected behaviour: A Newman projection SHOWS three bonds on the front carbon (the fourth, C–C, is end-on); the item should ask how many bonds the carbon has (four) or accept three as the drawn count; "central dot" is also not Newman notation (the circle is the rear carbon).
- Actual behaviour: Key "Four — three C-H… plus the C-C… which is not drawn" (chemistrySeedAssets.ts ~L13508); the feedback says both "three drawn" and "four appear". The same card is the first and last card of the lesson (asked twice) and the lesson has no figure.
- Why it is a defect: Question wording and key contradict each other; a learner who counts what a Newman projection shows (three) is marked wrong.
- Reproducibility: Static item; observed once (#140 t2–t8).
- Related defect: —
- Status: FIXED
- Fix: 7476752 — the stem now asks for the total bonds on the front carbon, counting the C–C bond not drawn, so "Four" matches the explanation (chem.hyd.conformations:step_check:en:undergraduate). Test: src/tests/chemBatchFContent.test.ts. Converged to production 2026-10-06 (owner-approved write; read-back verified; backup docs/qa/backups/probe-converge-2026-10-06.json).

### CHEM-109 — Ill-posed figure card: "In the cisplatin figure, which two ligands are adjacent to each other?" (options: two NH₃ / two Cl / one NH₃ and one Cl / none) — in a cis square-planar complex every pair of neighbours is adjacent

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 15:27 UTC
- Account: Account 6
- Chemistry concept: `chem.coord.applications`
- Lesson/order: #107
- Learner message: Two Cl ligands
- Tutor response: MCQ about the cisplatin figure; the reply to the wrong pick is "The question asks you to picture the square arrangement of the ligands around the metal center. You need to see which groups are next to each other…" (no verdict, no answer).
- Expected behaviour: A question with a single correct answer (e.g. "are the two NH₃ ligands cis or trans?").
- Actual behaviour: Two NH₃ are adjacent, two Cl are adjacent and each NH₃ is adjacent to a Cl; the card has no unique key and the feedback does not say which option was intended.
- Why it is a defect: Learner cannot know what is being asked; counts toward mastery.
- Reproducibility: Observed once (#107 t2–t3).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 70 distinct cards served in 31 lessons, all authored (stems found in the corpus); 0 replies with lettered A)/B)/C) options in 399 turns.

### CHEM-110 — Ozone pre-equilibrium example is internally wrong: O₂ ⇌ 2 O called "bimolecular" with K = k₁/k₋₁ in M⁻¹ (K = [O]²/[O₂] has units M); no overall equation; rate-constant units do not match

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:27 UTC
- Account: Account 5
- Chemistry concept: `chem.kinet.mechanism`
- Lesson/order: #87
- Learner message: give me example
- Tutor response: "Fast pre‑equilibrium: O₂ ⇌ 2 O (k₁ = 1.0 × 10⁶ M⁻¹ s⁻¹, k₋₁ = 1.0 × 10³ s⁻¹) This step is bimolecular (two O₂ molecules collide and split into two O atoms). Its equilibrium constant is K_eq = k₁/k₋₁ = 1.0 × 10³ M⁻¹… rate = k₂√K_eq [O₂]^{3/2}≈1.6×10⁴ [O₂]^{3/2} M s⁻¹"
- Expected behaviour: O₂ ⇌ 2O is unimolecular forward (O₂ → 2O) and bimolecular reverse (2O → O₂); K = [O]²/[O₂] in mol L⁻¹; k₁ in s⁻¹, k₋₁ in M⁻¹ s⁻¹; state the overall 3 O₂ → 2 O₃.
- Actual behaviour: Molecularity, equilibrium-constant units and rate-constant units are inconsistent in the same worked example given for "give me example".
- Why it is a defect: A weak learner copying the units-checked derivation would learn wrong molecularity and unit analysis in a lesson about exactly those ideas.
- Reproducibility: Observed once (#87 t13).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-111 — Gasoline fraction (C₅–C₁₂) said to boil "roughly between 25 °C and 75 °C"; real range ≈ 40–200 °C

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 15:28 UTC
- Account: Account 8
- Chemistry concept: `chem.hyd.petroleum`
- Lesson/order: #141
- Learner message: give me example
- Tutor response: "…the gasoline (petrol) fraction consists of hydrocarbons with about C₅–C₁₂ and boils roughly between 25 °C and 75 °C. As the rising vapor cools to around 60 °C, the gasoline molecules… condense" (and "a tray… about 70 °C… gasoline" in the numbers reply; column top given as 20–30 °C)
- Expected behaviour: Gasoline ≈ 40–200 °C; column temperature profile ~350 °C at the base to ~100–150 °C at the top.
- Actual behaviour: Boiling range and tray temperatures too low.
- Why it is a defect: Numbers presented as a realistic refinery example are off by a factor of 2–3.
- Reproducibility: Observed twice in one lesson (#141 t4, t5).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-112 — Card keyed against the chemically correct choice: "Which has HIGHER molar solubility?" — answer "Salt B" is marked wrong; the keyed option is "Cannot assume from Ksp alone", whose own working concludes Salt B is far more soluble

- Severity: P2
- Category: Questions
- Date/time: 2026-10-05 15:35 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.solubility`
- Lesson/order: #66
- Learner message: (options served) "Salt B, simply because it has the larger numerical Ksp value" / "Cannot assume from Ksp alone"
- Tutor response: Served options (truncated): [0] Salt B, simply because it has the larger numerical Ksp value  [1] Cannot assume from Ksp alone. Key text (chemistrySeedAssets.ts ~L6508): "Cannot assume from Ksp alone — must calculate: Salt A: s≈10⁻⁵ M; Salt B: s=(Ksp/4)^(1/3)≈10⁻³ M. Salt B is actually far MORE soluble…" isCorrect: true; "Salt B, simply because…" isCorrect: false.
- Expected behaviour: A question whose key answers it (Salt B, because 1:2 stoichiometry gives s = (Ksp/4)^(1/3) ≈ 10⁻³ M), or options "Salt A / Salt B" with the reasoning separate.
- Actual behaviour: The stem asks which salt is more soluble; the right chemical answer (Salt B) is the option marked wrong, and the keyed option is a non-answer ("Cannot assume") that is shown to the learner without its explanation.
- Why it is a defect: Learners who compute correctly are penalised; learners who pick the non-answer are rewarded without learning the number.
- Reproducibility: Static item; observed once (#66 t9).
- Related defect: —
- Status: FIXED
- Fix: 7476752 — "Which has HIGHER molar solubility?" keyed "Cannot assume" while its own working found Salt B; the card now asks whether Ksp alone decides and keys "No — calculate s" (Salt B ≈ 100× more soluble) (chem.equil.solubility:mcq:en:high). Test: src/tests/chemBatchFContent.test.ts. Converged to production 2026-10-06 (owner-approved write; read-back verified; backup docs/qa/backups/probe-converge-2026-10-06.json).

### CHEM-113 — Hydrogen combustion energy miscalculated: "−571 kJ… per gram ≈ 286 kJ/g… 286 MJ/kg (≈ 142 MJ/kg)… a 1 g pellet gives 286 kJ — enough to heat 70 g of water by 40 °C"

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 15:36 UTC
- Account: Account 6
- Chemistry concept: `chem.sblock.hydrogen`
- Lesson/order: #108
- Learner message: give me example with numbers
- Tutor response: "2 H₂ + O₂ → 2 H₂O, ΔH ≈ −571 kJ for the two-mole batch. Since one mole of H₂ weighs 2 g, the energy per gram ≈ 571/2 = 286 kJ g⁻¹ or about 286 MJ kg⁻¹ (≈ 142 MJ per kilogram…) … 1-gram pellet → roughly 286 kJ — enough to raise the temperature of 70 g of water by 40 °C!"
- Expected behaviour: 2 mol H₂ = 4 g → 571/4 ≈ 143 kJ g⁻¹ ≈ 143 MJ kg⁻¹; 143 kJ would heat 70 g of water by ~490 °C (40 °C needs ≈ 11.7 kJ).
- Actual behaviour: Used 2 g for two moles (factor 2 error), gave two different per-kg figures in one sentence (286 and 142 MJ/kg), and the final heating claim is off by a factor of ~40.
- Why it is a defect: The headline numeric example of the lesson is wrong in three ways and self-contradictory.
- Reproducibility: Observed once (#108 t11).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-114 — Invented "second-order rate constants for reaction with H₂O" for acyl derivatives (1×10³ … 1×10⁻⁶ M⁻¹ s⁻¹, i.e. 10⁹ span) while the lesson's own card says the span is "something like 10¹³"

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 15:39 UTC
- Account: Account 9
- Chemistry concept: `chem.carb.derivatives`
- Lesson/order: #160
- Learner message: give me example with numbers
- Tutor response: "| Acetyl chloride | Cl⁻ | ≈ 1 × 10³ | Acetic anhydride | ≈ 1 × 10⁰ | Ethyl acetate | ≈ 1 × 10⁻³ | Acetamide | ≈ 1 × 10⁻⁶ |" (markdown table of rate constants M⁻¹ s⁻¹ with H₂O)
- Expected behaviour: Either literature values (neutral hydrolysis is first order in water; amide hydrolysis in neutral water is ~10⁻¹⁰ s⁻¹ or slower) or no invented constants; consistency with the card (≈10¹³).
- Actual behaviour: Round-number constants without source; a nine-order span presented as the numeric illustration of a thirteen-order span; shown as a raw markdown table.
- Why it is a defect: Fabricated-looking data the learner cannot check; inconsistent with the lesson's own card.
- Reproducibility: Observed once (#160 t5).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-115 — Titration opener says phenolphthalein turns pink at the half-equivalence point (pH ≈ 4.75) and that acid + conjugate base are already a buffer before any NaOH is added

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:47 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.titration`
- Lesson/order: #68
- Learner message: ok
- Tutor response: "…the solution in the flask stays colourless at first because the acid and its conjugate base (acetate) form a buffer… When about half of the acid has been neutralised, the mixture turns faint pink‑purple, marking the half‑equivalence point where [CH₃COO⁻] = [CH₃COOH] and the pH equals the acid’s pKa."
- Expected behaviour: Phenolphthalein stays colourless until pH ≈ 8.2, i.e. only near the equivalence point; no acetate is present before NaOH is added.
- Actual behaviour: The first teaching reply tells a weak learner the indicator changes colour at pH ≈ 4.75 and that a buffer exists from the start.
- Why it is a defect: Directly contradicts the lesson's own later statement (phenolphthalein range 8.2–10) and builds the endpoint/half-equivalence confusion the lesson is meant to remove.
- Reproducibility: Observed once (#68 t1).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-116 — Equivalence-point pH of 0.1 M acetic acid + 0.1 M NaOH given as "around 9.3" and as the card's top option, while the same lesson later computes 8.7

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 15:47 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.titration`
- Lesson/order: #68
- Learner message: explain simpler
- Tutor response: t2: "the pH is above 7 (around 9.3 for 0.1 M solutions)" and a card "What is the pH at the equivalence point…?" with options "≈ 9.3 (basic) / ≈ 7.0 / ≈ 5.5 / ≈ 10.0"; t11/t12 later: "…the resulting pH is about 8.7".
- Expected behaviour: One consistent value (≈ 8.7: [CH₃COO⁻] = 0.05 M, Kb = 5.6×10⁻¹⁰, pOH ≈ 5.3).
- Actual behaviour: Two different values in one lesson; the card offers no option equal to the lesson's own worked answer (8.7). A learner who computes it correctly has no matching choice.
- Why it is a defect: Numerical contradiction within a lesson; the card cannot be answered by correct calculation.
- Reproducibility: Observed once (#68 t2 vs t11/t12).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. The "≈ 9.3" number in the reply itself is covered by the check pass only: Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-117 — "I dont understand this picture" on a lesson with no figure gets a bathtub/drain analogy that is chemically backwards

- Severity: P3
- Category: Teaching
- Date/time: 2026-10-05 15:47 UTC
- Account: Account 4
- Chemistry concept: `chem.equil.titration`
- Lesson/order: #68
- Learner message: i dont understand this picture
- Tutor response: "Think of a bathtub that’s being filled with water (the acid) while a drain (the base) is opened… the drain itself lets a little extra water flow back into the tub, making the level a bit higher than the neutral mark…"
- Expected behaviour: Say there is no picture on screen and offer a titration-curve description.
- Actual behaviour: No picture was ever shown on this lesson; the tutor replies as if one exists and invents an analogy in which the base is a drain and "water flows back into the tub".
- Why it is a defect: Plays along with a non-existent figure and gives a misleading analogy for acid–base neutralisation.
- Reproducibility: Observed once (#68 t13).
- Related defect: —
- Status: FIXED
- Fix: 440b55c — same no-figure answer as CHEM-036. The backwards bathtub analogy itself is model output and is not checked. Test: src/tests/chemBatchEVisuals.test.ts.

### CHEM-118 — "Too many words" simplification of the alkali-metal/water reaction invents hydride (H⁻) formation

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:45 UTC
- Account: Account 6
- Chemistry concept: `chem.sblock.alkali`
- Lesson/order: #109
- Learner message: too many words
- Tutor response: "2. Water’s response – The water molecule accepts that electron. One hydrogen atom grabs the extra electron, turning into a hydride (H⁻), while the remaining part of the water becomes a hydroxide ion (OH⁻). 3. … two H⁻ ions combine to make hydrogen gas (H₂)."
- Expected behaviour: Electrons reduce H₂O (or H⁺) to H₂ gas and OH⁻; no free hydride ions are formed. Two H⁻ cannot "combine" to make H₂ without being oxidised.
- Actual behaviour: A mechanistically wrong three-step story is given as "the whole reaction".
- Why it is a defect: Teaches a false mechanism to a learner who asked for a shorter version; it also conflicts with the balanced equation shown earlier in the same lesson.
- Reproducibility: Observed once (#109 t14).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-119 — Wittig opener and example: methylenetriphenylphosphorane (or "Ph₃P=CHCH₃ from methyltriphenylphosphonium bromide") + benzaldehyde is said to give trans-stilbene

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:46 UTC
- Account: Account 9
- Chemistry concept: `chem.carb.named-reactions`
- Lesson/order: #161
- Learner message: ok / give me example
- Tutor response: t1: "…methyltriphenylphosphonium bromide with a strong base… benzaldehyde… delivering the alkene product, here trans‑stilbene". t2: "ylide made from methyltriphenylphosphonium bromide… we get the ylide Ph₃P=CHCH₃… The product is trans‑stilbene (C₆H₅‑CH=CH‑C₆H₅)." Card t2: "Which of the following best describes the major product of this Wittig reaction?" with "trans-Stilbene" among the options.
- Expected behaviour: Ph₃P=CH₂ + PhCHO gives styrene (C₆H₅CH=CH₂); Ph₃P=CHCH₃ would give 1-phenylpropene; trans-stilbene needs a benzylic ylide (Ph₃P=CHPh).
- Actual behaviour: Reagent and product are mismatched in the first reply, again in the worked example (a CH₃CH= ylide cannot yield stilbene), and the same wrong product is then used as a card option; the later t9 example (same reagents) gives styrene, so the lesson contradicts itself.
- Why it is a defect: The lesson's headline example teaches an impossible transformation and then contradicts itself.
- Reproducibility: Observed once (#161 t1, t2, t3).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-120 — Card treats "(E)-styrene" as the correct product and "a mixture of (E)- and (Z)-styrene" as a distractor, but styrene has no E/Z isomers; example also claims a "(E)-styrene" isolated yield

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 15:46 UTC
- Account: Account 9
- Chemistry concept: `chem.carb.named-reactions`
- Lesson/order: #161
- Learner message: give me example with numbers
- Tutor response: "…you isolate (E)‑styrene (C₆H₅‑CH=CH₂) in an 85 % isolated yield." Card t9 options: "(E)-Styrene (C6H5‑CH=CH2) / A mixture of (E)- and (Z)-styrene / 1‑Phenyl‑ethanol (C6H5‑CH2‑CH2OH) / Benzyl chloride (C6H5‑CH2Cl)".
- Expected behaviour: Styrene (no stereodescriptor); a stereo-distractor that does not exist should not be offered. "1-Phenylethanol" is also drawn as C₆H₅‑CH₂‑CH₂OH, which is 2-phenylethanol.
- Actual behaviour: Meaningless stereodescriptor on a terminal alkene, a non-existent isomer mixture as a distractor, and a name/formula mismatch in another option.
- Why it is a defect: Teaches wrong nomenclature; a careful learner cannot reason to the "right" option.
- Reproducibility: Observed once (#161 t9, t10).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 70 distinct cards served in 31 lessons, all authored (stems found in the corpus); 0 replies with lettered A)/B)/C) options in 399 turns.

### CHEM-121 — O₂ worked example uses "ten valence electrons (five from each O)" and fills the N₂ configuration, giving bond order 3 for O₂; the same lesson elsewhere says O₂ has bond order 2 and two unpaired π* electrons

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:46 UTC
- Account: Account 2
- Chemistry concept: `chem.bond.mo-theory`
- Lesson/order: #30
- Learner message: give me example
- Tutor response: "Now place the ten valence electrons (five from each O) into the molecular orbitals… σ 2s² σ* 2s² σ 2p (bonding)² π 2p (bonding)⁴ π* 2p (antibonding)² σ* 2p⁰ … ½ (8 – 2) = 3. This predicts a strong bond…" (Later, t8: "bond order of O₂ (2)"; card t19: O₂ with 10 bonding / 6 antibonding electrons has bond order 2; card t7: O₂ has two unpaired π* electrons.)
- Expected behaviour: Oxygen has 6 valence electrons; O₂ has 12 → σ2s² σ*2s² σ2p² π2p⁴ π*2p² (two unpaired), bond order 2.
- Actual behaviour: Wrong electron count, a 10-electron (N₂-like) filling presented as O₂, bond order 3, and no unpaired electrons mentioned, contradicting the lesson's own paramagnetism card.
- Why it is a defect: The requested worked example for the lesson's flagship molecule is wrong and contradicts other lesson content.
- Reproducibility: Observed once (#30 t12).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-122 — Wrong-answer verdict reads "Not quite — the answer is: Not quite — …" (the authored explanation is inserted where the correct option should be)

- Severity: P3
- Category: UX
- Date/time: 2026-10-05 15:46 UTC
- Account: Account 2
- Chemistry concept: `chem.bond.mo-theory`
- Lesson/order: #30
- Learner message: Yes (to "Does equal bond order mean equal bond length and equal stability?")
- Tutor response: "Not quite — the answer is: Not quite — bond order predicts the TREND within a series, not identity across different molecules. N₂ and NO⁺ are isoelectronic…" (identical on the t21 repeat of the card)
- Expected behaviour: "Not quite — the answer is: Not quite" (option text), followed by the explanation, or just the explanation.
- Actual behaviour: The correct option text and the explanation are fused, so the sentence names no clear answer and repeats "Not quite".
- Why it is a defect: Confusing, hard-to-read feedback for a weak-English learner.
- Reproducibility: Observed twice in #30 (t3, t21); only one lesson seen so far.
- Related defect: —
- Status: FIXED
- Fix: 7476752 — the correct option began "Not quite —", so the verdict read "Not quite — the answer is: Not quite —"; now "No —" (chem.bond.mo-theory:checkpoint:en:undergraduate), and no correct option in the chemistry corpus starts with "Not quite". Test: src/tests/chemBatchFContent.test.ts. Converged to production 2026-10-06 (owner-approved write; read-back verified; backup docs/qa/backups/probe-converge-2026-10-06.json).

### CHEM-123 — Oxidation-state opener says Mn in KMnO₄ "will gain seven electrons when it is reduced"

- Severity: P3
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:53 UTC
- Account: Account 4
- Chemistry concept: `chem.redox.oxidation-state`
- Lesson/order: #69
- Learner message: ok
- Tutor response: "…manganese must carry a +7 oxidation state… it simply tells us that, in any reaction where KMnO₄ participates, manganese will gain seven electrons when it is reduced."
- Expected behaviour: Mn(VII) is reduced to Mn²⁺ (5 e⁻, acidic), MnO₂ (3 e⁻, neutral) or MnO₄²⁻ (1 e⁻); never by 7 e⁻ to Mn(0). An oxidation state is not a count of electrons that will be gained.
- Actual behaviour: Equates the oxidation number with the number of electrons gained "in any reaction".
- Why it is a defect: Reinforces the misconception that oxidation state = electrons transferred, in the lesson that is meant to remove it.
- Reproducibility: Observed once (#69 t1).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-124 — Worked ozone example: 6.0×10²⁸ O₃ molecules is converted to "1.2×10⁶ g (1.2 tonnes)"; correct mass is ≈ 4.8×10⁶ g

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 15:54 UTC
- Account: Account 10
- Chemistry concept: `chem.env.ozone`
- Lesson/order: #181
- Learner message: give me example with numbers
- Tutor response: "…6.02 × 10²³ × 10⁵ ≈ 6.0 × 10²⁸ O₃ molecules. In mass terms, that corresponds to roughly 1.2 × 10⁶ grams (about 1.2 tonnes) of ozone removed…"
- Expected behaviour: 6.0×10²⁸ molecules ÷ 6.02×10²³ mol⁻¹ × 48 g mol⁻¹ ≈ 4.8×10⁶ g (≈ 4.8 tonnes).
- Actual behaviour: The stated mass is a factor of 4 too small; the multiplication to 6.0×10²⁸ molecules is right, the conversion to mass is not.
- Why it is a defect: The one numeric result the learner asked for is wrong; a learner who checks it will fail to reproduce it.
- Reproducibility: Observed once (#181 t9).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-125 — BaSO₄ low solubility explained by "a much stronger lattice energy" for the larger Ba²⁺; lattice energy actually decreases down the group

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:53 UTC
- Account: Account 6
- Chemistry concept: `chem.sblock.alkaline-earth`
- Lesson/order: #110
- Learner message: give me example with numbers
- Tutor response: "…The dramatically lower Ksp for BaSO₄ shows that sulphate solubility decreases down the group, because the larger Ba²⁺ ion leads to a much stronger lattice energy that outweighs the hydration gain."
- Expected behaviour: Lattice energy falls with larger cations; sulphate solubility drops because hydration energy falls faster than lattice energy with increasing cation size.
- Actual behaviour: States the opposite trend for lattice energy (larger ion → stronger lattice).
- Why it is a defect: Teaches a false trend in the same breath as the correct solubility trend.
- Reproducibility: Observed once (#110 t11).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-126 — Ca + 2H₂O → Ca(OH)₂ + H₂ given as "about −65 kJ mol⁻¹"; real value ≈ −413 kJ mol⁻¹

- Severity: P2
- Category: Numerical/factual
- Date/time: 2026-10-05 15:53 UTC
- Account: Account 6
- Chemistry concept: `chem.sblock.alkaline-earth`
- Lesson/order: #110
- Learner message: give me example with numbers
- Tutor response: "The reaction releases about ‑65 kJ mol⁻¹ (exothermic)…"
- Expected behaviour: ΔH ≈ −414 kJ mol⁻¹ (ΔfH°: Ca(OH)₂(s) −986, H₂O(l) −286).
- Actual behaviour: About six times too small.
- Why it is a defect: Wrong thermochemical number in a numbers-requested example.
- Reproducibility: Observed once (#110 t11).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-127 — Calcium said to lose its "two outer 2s electrons" (it is 4s), contradicting the same lesson's "[Ar] 4s²"

- Severity: P3
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:53 UTC
- Account: Account 6
- Chemistry concept: `chem.sblock.alkaline-earth`
- Lesson/order: #110
- Learner message: give me example
- Tutor response: "…the metal gives up its two outer 2s electrons and forms calcium ions (Ca²⁺)."
- Expected behaviour: 4s electrons (as stated at t11).
- Actual behaviour: Wrong shell number; also "the electrons… reduce the hydrogen atoms of water" (reduces H⁺/H₂O, not atoms).
- Why it is a defect: Internal contradiction on a basic configuration.
- Reproducibility: Observed once (#110 t13).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-128 — Cyclobutanone ¹H NMR described as one CH₂ signal plus "a separate singlet for the carbonyl-adjacent proton"

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 15:56 UTC
- Account: Account 9
- Chemistry concept: `chem.carb.spectro`
- Lesson/order: #162
- Learner message: give me example
- Tutor response: "In the ¹H NMR, the two pairs of methylene protons on the ring are equivalent, giving a single signal for the CH₂ groups (about 2 ppm) and a separate singlet for the carbonyl‑adjacent proton (if any)."
- Expected behaviour: Cyclobutanone has two CH₂ environments: α-CH₂ (≈ 3.0 ppm, triplet) and β-CH₂ (≈ 2.0 ppm, quintet); there is no carbonyl-adjacent CH proton (the α-carbons are CH₂).
- Actual behaviour: The α and β methylene groups are called equivalent, and a non-existent "carbonyl-adjacent proton" singlet is added.
- Why it is a defect: The learner asked for an example of reading NMR; the example gives a wrong spectrum for a molecule whose structure was just stated.
- Reproducibility: Observed once (#162 t9).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-129 — Answer cards show raw markup for ions and subscripts (Fe^{2+}, MnO_4^-, Q_sp, K_n, Δn_gas) that the lesson renderer does not typeset

- Severity: P3
- Category: UX
- Date/time: 2026-10-05 15:59 UTC
- Account: Account 4
- Chemistry concept: `chem.redox.balancing`
- Lesson/order: #70
- Learner message: give me example
- Tutor response: Card: "Which species is being oxidized in the half‑reaction Fe^{2+} → Fe^{3+}?" with options "Fe^{2+} / Fe^{3+} / MnO_4^- / Mn^{2+}".
- Expected behaviour: Fe²⁺ / Fe³⁺ / MnO₄⁻ / Mn²⁺ (Unicode, as most other cards use) or math rendered through the supported \( \) delimiters.
- Actual behaviour: LaTeX-style carets and braces appear as literal text in the question and the clickable options.
- Why it is a defect: Hard to read for a weak-English learner; the same card family elsewhere uses Unicode, so the style is inconsistent.
- Reproducibility: Observed on #70 (t2); lesser forms (Q_sp, K_n, Δn_gas) on #66 t3/t13, #106 t6, #50 t10.
- Related defect: —
- Status: FIXED
- Fix: d5397b1 — caret/brace notation outside math and code is typeset as Unicode (Fe^{2+} → Fe²⁺, MnO_4^- → MnO₄⁻, Q_sp → Qₛₚ) in the final reply sweep and in a model-written card before it is persisted, so taps still grade. Test: src/tests/chemBatchDTextShape.test.ts. Verified by test only.

### CHEM-130 — "I dont understand this picture" on a lesson with no figure is answered about the Wilkinson's-catalyst figure from a different, earlier lesson session of the same account

- Severity: P2
- Category: Concurrency/session isolation
- Date/time: 2026-10-05 15:59 UTC
- Account: Account 7
- Chemistry concept: `chem.org.purification`
- Lesson/order: #130
- Learner message: i dont understand this picture
- Tutor response: #130 t13: "I hear you — that image can feel a bit overwhelming. Let’s think of the Wilkinson’s catalyst like a reusable kitchen sponge… In the hydrogenation cycle, the catalyst (the “sponge”)…". Same on #125 (Carbon Hybridization) t19: "Let’s think of Wilkinson’s catalyst as a “hydrogen‑adding kitchen robot”…". Neither lesson had a figure; the Wilkinson figure was served in lesson #123 (Organometallic Chemistry) of the same account (session started 15:11 UTC; #125 at 15:26; #130 at 15:59).
- Expected behaviour: Say there is no picture in this lesson (or describe this lesson's own material). Content from an earlier lesson/session should not be treated as the current screen.
- Actual behaviour: The reply explains a hydrogenation-cycle diagram that is not on screen and not part of the lesson.
- Why it is a defect: The tutor's idea of "the picture" is carried across lessons/sessions; this is stale context leaking between sessions of one account. Found by scanning all 126 transcripts for other-lesson figure titles in "picture" replies: only these two hits (both account 7, both the #123 figure). No cross-account hit.
- Reproducibility: Observed twice (account 7: #125 t19, #130 t13). Not tested on other accounts beyond the transcript scan.
- Related defect: —
- Status: FIXED
- Fix: dc88764 — lesson-init cleared visualSession but not renderedRealityLog, whose last entry the prompt presents as "what the learner's screen shows"; the log is now cleared on lesson open (clearRenderedRealityForLessonOpen). Test: src/tests/chem148SessionIsolation.test.ts. Verified by test only.

### CHEM-131 — Water-density opener says the ice lattice forms as water cools from 4 °C toward 0 °C and "collapses" on warming from 0 to 4 °C

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 16:02 UTC
- Account: Account 6
- Chemistry concept: `chem.sblock.water`
- Lesson/order: #111
- Learner message: ok
- Tutor response: "As the temperature drops from about 4 °C toward 0 °C, the water molecules begin to arrange themselves into a regular hexagonal pattern held together by four hydrogen bonds per molecule. In this ice lattice… When the temperature rises from 0 °C to about 4 °C, the hydrogen‑bond network slightly collapses…"
- Expected behaviour: Liquid water between 4 °C and 0 °C is not an ice lattice; the lattice appears on freezing at 0 °C. The 0→4 °C density increase is a property of liquid water (collapse of ice-like clusters), not of ice.
- Actual behaviour: Treats the 4→0 °C liquid range as the formation of the ice lattice and conflates it with the density maximum.
- Why it is a defect: The first teaching reply of the lesson blurs the two points the lesson exists to separate (freezing at 0 °C; density maximum at 4 °C).
- Reproducibility: Observed once (#111 t1).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-132 — Boron-family opener asks why "BF₃ forms a stable adduct with NF₃" (a poor Lewis base) and says B and N have "similar electronegativities"

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 16:08 UTC
- Account: Account 6
- Chemistry concept: `chem.pblock.group13`
- Lesson/order: #112
- Learner message: ok
- Tutor response: "Imagine a sealed tube filled with boron trifluoride (BF₃)… nitrogen trifluoride (NF₃)… Why does BF₃ form a stable adduct with NF₃ even though nitrogen and boron are in the same period and have similar electronegativities? Which species acts as the Lewis acid and which as the Lewis base?"
- Expected behaviour: NF₃ is essentially non-basic (electron-poor N lone pair) and does not form a stable adduct with BF₃ (NH₃ does); B (2.04) and N (3.04) differ a lot in electronegativity.
- Actual behaviour: The first reply is an unprompted question built on a false premise and a false electronegativity claim.
- Why it is a defect: A weak learner cannot answer a question whose premise is wrong; it also contradicts the lesson's own later BF₃·NH₃ card.
- Reproducibility: Observed once (#112 t1).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-133 — "Crystal Systems" lesson drifts: replies to "ok" and "next question please" teach metallic bonding, and the seven crystal systems are barely taught

- Severity: P3
- Category: Lesson flow
- Date/time: 2026-10-05 16:01 UTC
- Account: Account 5
- Chemistry concept: `chem.solid.crystal-systems`
- Lesson/order: #90
- Learner message: ok / next question please
- Tutor response: t20 "ok": "Metallic bonding is the attraction that holds metal atoms together in a solid… sea of electrons…". t21 "next question please": "Think of a simple metal spoon you use every day…". Turns t1–t19 are almost entirely FCC atoms-per-cell counting; the named systems (triclinic, monoclinic, orthorhombic …) occur only in passing.
- Expected behaviour: Stay on the lesson objective ("tell which of the seven crystal systems a crystal belongs to"); metallic bonding belongs to a later lesson.
- Actual behaviour: The first reply is a figure walk-through of an FCC cell, and two later "continue"-type messages move to a different topic.
- Why it is a defect: Lesson objective in the opener ("seven basic crystal systems") is not what is taught or quizzed.
- Reproducibility: Observed once (#90).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Lesson drift guard (`lessonDriftGuard.ts`): a reply to a continuation message ("ok", "next", "give me example", "maybe yes") that is at least 25 words and names none of the concept's anchor words (KG title + syllabus line) is regenerated once with the lesson stated; the retry is kept only if it is on the lesson. Partial: a retry that drifts again is not replaced, and a neighbouring concept that shares the lesson's words is not detected. Test: src/tests/remainingDefectFixes20261007.test.ts.

### CHEM-134 — Wrong answer to "which species’ concentration appears in the SN1 rate law?" is praised as "a solid observation" and never corrected

- Severity: P2
- Category: Teaching
- Date/time: 2026-10-05 15:54 UTC
- Account: Account 8
- Chemistry concept: `chem.hal.sn1`
- Lesson/order: #144
- Learner message: Chloride ion (the leaving group)
- Tutor response: Card: "In this SN1 reaction, which species’ concentration appears in the rate law?" (options: water / chloride ion / tert-butyl chloride / tert-butyl carbocation). Reply: "That’s a solid observation—you’ve picked out the chloride ion as the leaving group in the SN1 pathway. When the C–Cl bond breaks, the carbon temporarily becomes a carbocation…" then the next card.
- Expected behaviour: Not quite — the rate law contains [tert-butyl chloride] only (the example just worked says rate = k[t-BuCl]).
- Actual behaviour: The incorrect option is affirmed; the correct species is never named. Mastery counters stay at 0/0.
- Why it is a defect: A wrong answer is rewarded and the misconception (leaving group concentration in the rate law) is left standing.
- Reproducibility: Observed once (#144 t16). Related: CHEM-075 (non-answers affirmed), CHEM-028 (no verdict).
- Related defect: —
- Status: PRODUCTION-VERIFIED — live re-drive 2026-10-10 (docs/qa/LIVE_REDRIVE_2026-10-10.md)
- Fix: d5397b1 — the false praise ("That's a solid observation—you've picked out the chloride ion") is stripped on an unauthored-key grade (answerConfirmation.ts UNBACKED_PRAISE). Not fixed: the card was model-written, so its key is unverified and, by design, no verdict or correct answer is stated (route.ts correctForConfirmation). Stating verdicts from model-invented keys is an owner decision. Test: src/tests/chemBatchDTextShape.test.ts. **2026-10-07 pass (2350ff6):** Only authored cards are asked (owner decision 2026-10-07): a model-written card is never served (`decideModelProbe` with `authoredCardsOnly: AUTHORED_CARDS_ONLY`), the prompt forbids writing cards or lettered options (`mcq.AUTHORED_ONLY_INSTRUCTION`), and an A)/B)/C) question written into prose is removed with the question that introduced it (`proseMcqGuard.stripProseMultipleChoice`). Every card a learner can answer carries a reviewed key and gets a verdict. Test: src/tests/ownerDecisions20261007.test.ts. **Live re-drive 2026-10-10:** 70 distinct cards served in 31 lessons, all authored (stems found in the corpus); 0 replies with lettered A)/B)/C) options in 399 turns.

### CHEM-135 — Iodoform explanation says primary alcohols "such as ethanol" give the test; only ethanol (not primary alcohols in general) does

- Severity: P3
- Category: Chemistry correctness
- Date/time: 2026-10-05 16:06 UTC
- Account: Account 7
- Chemistry concept: `chem.org.qualitative-analysis`
- Lesson/order: #131
- Learner message: a methyl ketone, or a CH₃CH(OH)– group that can be oxidised to one
- Tutor response: t9 reply: "…Beyond methyl ketones, primary alcohols such as ethanol also give a positive iodoform test because they are first oxidized to acet[aldehyde]…" while the card just answered lists "any primary alcohol" as a wrong option.
- Expected behaviour: Ethanol is the only primary alcohol that gives a positive iodoform test (propan-1-ol, methanol do not — as the lesson itself says earlier).
- Actual behaviour: Over-generalises to "primary alcohols", contradicting the card's own key.
- Why it is a defect: Undermines the correct answer the learner just chose.
- Reproducibility: Observed once (#131 t9).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-136 — Amine basicity example gives pKb 3.4 / 3.1 / 2.9 for CH₃NH₂ / (CH₃)₂NH / (CH₃)₃N and concludes "primary < secondary < tertiary" in basicity

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 16:02 UTC
- Account: Account 9
- Chemistry concept: `chem.carb.amines`
- Lesson/order: #163
- Learner message: give me example with numbers / maybe yes?
- Tutor response: t2 and t4 tables: "Methylamine pKb 3.4; Dimethylamine 3.1; Trimethylamine 2.9 … the tertiary amine has the smallest pKb, so it is the strongest base, followed by the secondary and then the primary amine… the basicity trend primary < secondary < tertiary." (t2 also prints the scale name as "pK₆₅ (pKb)".)
- Expected behaviour: Aqueous pKb: CH₃NH₂ 3.36, (CH₃)₂NH 3.27, (CH₃)₃N 4.19; trimethylamine is the weakest of the three in water (solvation of the ammonium ion), which the lesson's own later card states ("bulky tertiary amine's cation is harder to solvate").
- Actual behaviour: Trimethylamine value is invented (2.9) and the ordering is reversed for the tertiary amine; the same lesson later teaches the opposite.
- Why it is a defect: A wrong number table and wrong trend in the example the learner asked for; contradicts the lesson's own card.
- Reproducibility: Observed twice in #163 (t2, t4).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-137 — Eutrophication example: BOD 12 mg/L is said to lower 8 mg/L dissolved oxygen "to roughly 3 mg/L"

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 16:01 UTC
- Account: Account 10
- Chemistry concept: `chem.env.water-soil`
- Lesson/order: #182
- Learner message: give me example with numbers
- Tutor response: "…pushes the Biochemical Oxygen Demand (BOD) up to 12 mg L⁻¹. Because the lake’s water originally held about 8 mg L⁻¹ of dissolved oxygen, the high BOD draws the oxygen level down to roughly 3 mg L⁻¹…" then asks why the drop is so dramatic.
- Expected behaviour: 12 mg/L demand exceeds the 8 mg/L supply, so oxygen would be exhausted (≈ 0 mg/L, anoxia), or the figures should be chosen so the arithmetic closes (e.g. BOD 5 mg/L → 3 mg/L).
- Actual behaviour: The numbers do not combine to the stated result.
- Why it is a defect: The worked example's arithmetic is inconsistent, in a lesson whose goal is to teach the BOD/dissolved-oxygen relationship.
- Reproducibility: Observed once (#182 t12).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-138 — NMR feedback says "A CH₃ gives three signals while an OH gives one, so the CH₃ peak is larger"; also equates peak height with integration

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 16:12 UTC
- Account: Account 7
- Chemistry concept: `chem.org.spectroscopy`
- Lesson/order: #132
- Learner message: Yes (to a card on whether a taller CH₃ peak means that group is more important/reactive)
- Tutor response: "Not quite — the answer is: No — NMR peak intensity (integration) is proportional to the NUMBER of equivalent hydrogens… The peak height shows how many equivalent hydrogens are present, not how reactive they are. A CH₃ gives three signals while an OH gives one, so the CH₃ peak is larger." (t9: "The taller CH₃ peak reflects three equivalent protons…")
- Expected behaviour: A CH₃ group gives ONE signal whose integral corresponds to 3 H; integration (area), not height, is proportional to the number of H.
- Actual behaviour: Says CH₃ "gives three signals" and conflates height with integration, in the corrective explanation itself.
- Why it is a defect: The correction teaches a false statement about the very quantity the card tests.
- Reproducibility: Observed twice (#132 t5, t9).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-139 — Yes/No card offers "Correct" as an option: "Does it therefore have no intermolecular forces? — Correct / No"

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 16:10 UTC
- Account: Account 2
- Chemistry concept: `chem.bond.intermolecular`
- Lesson/order: #32
- Learner message: Correct
- Tutor response: Card: "Hexane is a non-polar hydrocarbon with no dipole and no hydrogen bonding. Does it therefore have no intermolecular forces?" Options: "Correct" / "No".
- Expected behaviour: Parallel options ("Yes, none" / "No, it still has London dispersion forces").
- Actual behaviour: "Correct" does not answer the question asked; a weak-English learner can read it as agreeing with the statement either way. The learner who chose "Correct" got "Not quite — the answer is: No — it has LONDON DISPERSION forces…".
- Why it is a defect: Ambiguous option wording on a graded card.
- Reproducibility: Observed once (#32 t4–t5).
- Related defect: —
- Status: FIXED
- Fix: 7476752 — the yes/no card's wrong option read "Correct —"; now "Yes —" (slug chem.bond.intermolecular:step_check:en:high). Test: src/tests/chemBatchEVisuals.test.ts. Production keeps the old text until the owner-approved convergence run. Converged to production 2026-10-06 (owner-approved write; read-back verified; backup docs/qa/backups/probe-converge-2026-10-06.json).

### CHEM-140 — Intermolecular-force numbers differ inside one lesson: HCl dipole–dipole "~10 kJ/mol" in the table vs "roughly 5 kJ/mol" in the next explanation; N₂ dispersion "~5 kJ/mol"

- Severity: P3
- Category: Numerical/factual
- Date/time: 2026-10-05 16:10 UTC
- Account: Account 2
- Chemistry concept: `chem.bond.intermolecular`
- Lesson/order: #32
- Learner message: give me example with numbers
- Tutor response: t13 table: "N₂ London dispersion ~5 kJ mol⁻¹; HCl dipole‑dipole ~10 kJ mol⁻¹; H₂O hydrogen bond ~20 kJ mol⁻¹". Later reply (t14): "a dipole‑dipole attraction between polar molecules such as HCl is roughly 5 kJ mol⁻¹".
- Expected behaviour: One consistent set; typical values are ≈ 1 kJ/mol for N₂ dispersion and ≈ 2–3 kJ/mol for HCl dipole–dipole.
- Actual behaviour: HCl is given as 10 and 5 kJ/mol in two replies; N₂ dispersion is overstated.
- Why it is a defect: Numbers the learner asked for are inconsistent and partly wrong.
- Reproducibility: Observed once (#32 t13, t14).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts.

### CHEM-141 — Bond Enthalpy lesson walks through a Born–Haber cycle and calls sublimation and ionisation "bond-breaking" processes

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 16:17 UTC
- Account: Account 3
- Chemistry concept: `chem.thermo.bond-enthalpy`
- Lesson/order: #52
- Learner message: ok / show me step by step
- Tutor response: t1: "Let’s walk through the Born–Haber cycle that you see on the screen…" (figure "Born–Haber Cycle: Formation of NaCl"). t3: "Sublimation… This is a bond‑breaking process… Ionization… Again we are breaking a bond (removing an electron), so we add another positive term."
- Expected behaviour: Bond enthalpy lesson should use a bond-energy figure (e.g. reaction enthalpy from bonds broken/formed). Ionisation (electron removal) is not a bond-breaking step; sublimation breaks metallic bonding.
- Actual behaviour: The figure belongs to the lattice-enthalpy concept; the tutor then forces it into the bond-enthalpy frame with an incorrect description of ionisation.
- Why it is a defect: Wrong-concept figure plus a false statement about ionisation.
- Reproducibility: Observed once (#52 t1–t3). Figure part is another instance of CHEM-022.
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-142 — E2 elimination examples: acyclic haloalkane in a "chair-like conformation"; Hofmann product named "1-methyl-1-butene"; 3-methyl-1-butene called the Zaitsev product with a C2=C3 double bond

- Severity: P2
- Category: Chemistry correctness
- Date/time: 2026-10-05 16:10 UTC
- Account: Account 8
- Chemistry concept: `chem.hal.elimination`
- Lesson/order: #146
- Learner message: ok / show me step by step
- Tutor response: t1: "Imagine a molecule of 2‑bromo‑2‑methylbutane. In the most stable chair‑like conformation… with a bulky base… the less substituted (Hofmann) alkene, 1‑methyl‑1‑butene." t3: "Take 2‑bromo‑3‑methylbutane… In a chair‑like view… The result is 3‑methyl‑1‑butene, an alkene where the double bond lies between carbons 2 and 3. The more substituted alkene… is the major product, illustrating Zaitsev’s rule."
- Expected behaviour: Chair conformations apply to cyclohexanes; the Hofmann product from 2-bromo-2-methylbutane is 2-methyl-1-butene (as t5 itself says); 2-bromo-3-methylbutane gives 2-methyl-2-butene (Zaitsev, major with ethoxide) and 3-methyl-1-butene (Hofmann, C1=C2).
- Actual behaviour: Three separate mistakes in the first two teaching replies; the name and double-bond position given for 3-methyl-1-butene are inconsistent and it is mislabelled Zaitsev.
- Why it is a defect: The lesson's central rule (Zaitsev vs Hofmann) is illustrated with wrong products and names.
- Reproducibility: Observed in #146 t1 and t3 (one session).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-143 — Reply to "continue" is a raw malformed HTML comment containing card options and the answer key: <!" a="Filter precipitate" … correct="A"-->

- Severity: P2
- Category: UX
- Date/time: 2026-10-05 16:09 UTC
- Account: Account 10
- Chemistry concept: `chem.anal.gravimetric`
- Lesson/order: #183
- Learner message: continue
- Tutor response: The entire tutor text is: <!" a="Filter precipitate" b="Wash precipitate" c="Dry/ignite to constant mass" d="Dissolve sample in solvent" correct="A"--> (no mcq object; provider groq; diag memoryFallbackReason "already_served"). The next message, "quiz me", gets only "Sure, let’s check your understanding of the sequence shown in the gravimetric‑analysis flow diagram." with no card.
- Expected behaviour: A normal explanation or a rendered multiple-choice card; hidden card markup and the correct key must never be shown.
- Actual behaviour: The learner sees raw option markup that names the correct letter; the follow-up "quiz me" produces an announcement of a check that never appears.
- Why it is a defect: A generated card failed to parse and its source markup was shown as the reply: it exposes the answer key and leaves the learner with nothing to answer.
- Reproducibility: Observed once in the whole run (#183 t22–t23); a corpus-wide search for `correct="` found no other occurrence.
- Related defect: —
- Status: FIXED
- Fix: 72abee7 (PHYS-023, 2026-10-05 16:19 UTC, after this run's observation) — the orphaned answer-key backstop in residualTagSweep.ts removes the exact observed reply; pinned in src/tests/chemBatchDTextShape.test.ts. The follow-up "quiz me" announcing a card that never came is not separately reproduced.

### CHEM-144 — Feedback refers to the learner in the third person ("The learner correctly noted…", "the student's explanation is incorrect")

- Severity: P3
- Category: UX
- Date/time: 2026-10-05 16:19 UTC
- Account: Account 3
- Chemistry concept: `chem.thermo.entropy`
- Lesson/order: #53
- Learner message: Incorrect (to a True/False-style card)
- Tutor response: "That's right. The learner correctly noted that the claim is false because organisms are open systems…" Similar: #54 t4 "The learner correctly noted that the temperature is not 0.4 K…"; #7 t3, #77 t10, #97 t4, #156 t9 ("The learner assumed…"); #52 t5 "This is why the student's explanation is incorrect."
- Expected behaviour: Second person ("You noted…") as in most other feedback.
- Actual behaviour: Feedback written as if for a teacher reading about someone else.
- Why it is a defect: Distancing, confusing wording for a weak-English learner; shows the reply was written for a different audience.
- Reproducibility: Seen in 7 replies across 7 lessons (accounts 1, 3, 3, 3, 5, 6, 9).
- Related defect: —
- Status: FIXED
- Fix: c4a6afc (BIO-015) + 5fad26c — sentence-start "The learner correctly noted" → "You correctly noted"; mid-sentence "the student's explanation/answer/…" → "your explanation" (secondPerson.ts). Test: src/tests/chemOpenDefectsBatchG.test.ts.

### CHEM-145 — P₄ described as having "four identical single bonds"; the tetrahedron has six P–P bonds (the lesson's own later reply and card say six)

- Severity: P3
- Category: Chemistry correctness
- Date/time: 2026-10-05 16:19 UTC
- Account: Account 6
- Chemistry concept: `chem.pblock.group15`
- Lesson/order: #114
- Learner message: ok
- Tutor response: "Each corner is linked to the other three by a single P–P bond, so the molecule has four identical single bonds and bond angles of about 60°."
- Expected behaviour: Six P–P single bonds, 60° angles (as t9 and the closing card "Six bonds, 60°" state).
- Actual behaviour: Four bonds stated in the first teaching reply.
- Why it is a defect: First explanation contradicts the lesson's own key; also the same reply mixes in the Haber process before it is taught.
- Reproducibility: Observed once (#114 t1).
- Related defect: —
- Status: PARTIALLY FIXED — DEPLOYED 2026-10-09 (a9ef53d); not production-verified
- Fix: **2026-10-07 pass (2350ff6):** Check pass (owner decision 2026-10-07, `factCheckPass.ts`): a reply or lesson opening that carries numbers, equations or a worked example is recomputed by a second model call and replaced only by a corrected copy of itself (the copy must keep at least 60 % of the original's words, any failure keeps the original); `WORKED_EXAMPLE_RULES` are in the chat and opening prompts. Lowers the rate, does not guarantee it: the checker is itself a model, and a reply with no number, equation or worked example is not checked. Test: src/tests/ownerDecisions20261007.test.ts. This item is mainly a plain-prose claim, so it is checked only when the same reply also carries numbers, equations or a worked example; otherwise it remains model output (scope of the owner decision).

### CHEM-146 — A degraded reply swaps the card under the learner; the next answer then matches no option ("I couldn’t tell which option your answer matched — tap the choice you mean… Got it — you’re saying…")

- Severity: P2
- Category: Lesson flow
- Date/time: 2026-10-05 16:15 UTC
- Account: Account 9
- Chemistry concept: `chem.nitro.nitro-compounds`
- Lesson/order: #165
- Learner message: Para to the first nitro group (t3), then Meta to the first nitro group (t4)
- Tutor response: t3 card: "…second nitro group goes… Ortho / Meta / Para / Randomly". Reply to the t3 answer is a degraded "Let’s take one small step together…" with a DIFFERENT card attached (options "The second NO₂ group goes ortho or para… / …goes meta… and harsher conditions"). Learner then answers "Meta to the first nitro group" (the t3 option); reply: "I couldn’t tell which option your answer matched — tap the choice you mean from the list below. Got it — you’re saying the second nitro group ends up meta to the first one."
- Expected behaviour: A verdict on the first answer; the card on screen should not change without being answered.
- Actual behaviour: The first answer gets no verdict and the card is replaced; the second answer is unmatched, and the reply both asks to re-tap and says "Got it".
- Why it is a defect: Contradictory feedback and an unanswered question; the learner cannot tell what was graded.
- Reproducibility: Observed once (#165 t3–t4).
- Related defect: —
- Status: NOT REPRODUCED
- Fix: Production 2026-10-06 (targeted probes, 3 subjects): in every degraded live reply to a graded answer (5 observed), the learner still received the server's verdict and the correct answer — the graded-turn assembler serves the verdict even when the live model reply fails — and no card was swapped. The earlier case (#42, 2026-10-06 redrive: an answer tap got only "didn't come through") was not reproduced and its logs had expired (1-hour retention), so its cause (likely the 8 s assembler wait timing out) is not established. Not patched without evidence. **2026-10-07 pass (2350ff6):** Not reproduced: in every degraded live reply to a graded answer observed on 2026-10-06 (5) the learner got the server's verdict and no card was swapped; with only authored cards served (owner decision 2026-10-07) the reply's card is always a reviewed one. No code change without a reproduction.

### CHEM-147 — Card key and feedback say lead has "three stable isotopes" (206, 207, 208); lead has four (also 204)

- Severity: P3
- Category: Chemistry correctness
- Date/time: 2026-10-05 17:36 UTC
- Account: Account 10
- Chemistry concept: `chem.anal.spectroscopy`
- Lesson/order: #186
- Learner message: The three stable ISOTOPES of lead, each resolved at its own precise mass
- Tutor response: Card: ICP-MS of lead shows three peaks — "Three readings of lead's atomic mass… / The three stable ISOTOPES of lead…". Feedback: "Lead has three stable isotopes at masses 206, 207 and 208, which appear as distinct peaks."
- Expected behaviour: Natural lead has four stable isotopes (204, 206, 207, 208; 204 ≈ 1.4 %); the card should say "three main peaks" or list four.
- Actual behaviour: States a wrong isotope count as fact in the correct-answer key.
- Why it is a defect: A factual error in the authored key that the learner is rewarded for repeating.
- Reproducibility: Observed once (#186 t4–t5).
- Related defect: —
- Status: FIXED
- Fix: 7476752 — lead has four stable isotopes (²⁰⁴Pb too): seed (chem.anal.spectroscopy:checkpoint:en:undergraduate) and EB entry corrected. docs/curriculum/blueprints/chem.anal.spectroscopy.md (curriculum data) still says three — left for the curriculum owner. Test: src/tests/chemBatchFContent.test.ts. Converged to production 2026-10-06 (owner-approved write; read-back verified; backup docs/qa/backups/probe-converge-2026-10-06.json).

### CHEM-148 — Three lessons open at once on one account: lessons 5 and 8 are taught with lesson 3's content, figure and "covers:" line

- Severity: P1
- Category: Concurrency/session isolation
- Date/time: 2026-10-05 14:53 UTC
- Account: Account 1
- Chemistry concept: `chem.found.* (3,5,8) and chem.period.* (20,22,25)`
- Lesson/order: #5
- Learner message: ok / give me example / quiz me (sent to each of 3 sessions in parallel)
- Tutor response: Sessions opened together on account 1: #3 Pure Substances and Mixtures, #5 Significant Figures and Error Analysis, #8 Concentration Units; 12 interleaved turns each. In #5: t1 "Great, let’s jump straight into a concrete example that walks through the four steps shown in the diagram… homogeneous mixture of table‑salt…"; t3 "a bowl… gritty mixture of sand + table‑salt + water… filtration"; t9 (quiz me) "Pure Substances and Mixtures covers: Elements and compounds as pure substances; homogeneous and heterogeneous mixtures; separation techniques." In #8: t1 "Thanks for the quick “ok”, test1. Let’s move straight to a concrete demonstration using the flow‑chart you’re seeing… sand and table salt". All three sessions carried the figure "Separating a Mixture into Pure Substances" (the figure of lesson #3).
- Expected behaviour: Each session teaches its own lesson (the solo run of #5 on the same account opened with "identifying non-zero digits, … trailing zeros").
- Actual behaviour: Lessons 5 and 8 inherit lesson 3's teaching content, figure and curriculum line; their own topics (significant figures, concentration) are not taught in the first turns.
- Why it is a defect: Per-account lesson context is shared across simultaneously open sessions, so a learner with two tabs (or a phone and a laptop) is taught the wrong lesson while progress is recorded against the one named in the session.
- Reproducibility: Reproduced in 2 of 2 same-account probes: account 1 (orders 3, 5, 8: #5 and #8 taught #3 content) and account 5 (orders 20 Modern Periodic Law, 22 Ionization Energy, 25 Valency and Oxidation State: #20 and #22 taught #25 content — valency, sulfur [Ne]3s²3p⁴, "Valency and Oxidation State covers: …"; #22 t9 and #25 t9 were also a deferral and a degraded message). The lesson that supplies the content differs between probes, so the lead session is not simply the first or last. Not observed across accounts: 4 accounts running lesson #30 simultaneously with unique marker words showed no foreign marker in any reply (the tutor never echoed its own marker either, so this is weak evidence of isolation, not proof).
- Related defect: —
- Status: DEPLOYED — server path production-verified; private-mode browser path unverified
- Fix: f685494 (+ dc88764), deployed in 05b7868. Production 2026-10-06 (crossSessionProbe part B): two tab ids → two separate sessions; a reload with the same tab id resumed the same session for each tab; each tab taught its own lesson (atomic radius / concentration cell). The private-mode client fallback (window.name) could not be exercised: the sandbox browser's traffic through the egress proxy fails intermittently (ERR_TOO_MANY_RETRIES, 502), so the page never reached the session request. Needs one real private-window check with two tabs.

### CHEM-149 — Systemic: 74 of 186 observed lessons (40 %) never serve a figure, including diagram-dependent topics (phase diagrams, mechanisms, titration, electron-pushing, molecular shapes)

- Severity: P2
- Category: Visuals
- Date/time: 2026-10-05 14:54 UTC
- Account: Account 3
- Chemistry concept: `many (see list)`
- Lesson/order: #42
- Learner message: i dont understand this picture / what is this? (asked in these lessons)
- Tutor response: Lessons with no figure on any turn (orders): 31, 32, 41, 42, 43, 45, 48, 53, 54, 55, 58, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 73, 78, 81, 83, 85, 86, 93, 96, 97, 98, 99, 100, 108, 110, 111, 112, 113, 114, 116, 117, 118, 119, 120, 121, 124, 125, 126, 127, 128, 129, 130, 131, 132, 134, 136, 137, 140, 143, 146, 147, 150, 153, 154, 156, 159, 162, 164, 165, 168, 173, 181, 183 (74 lessons; see the Coverage table).
- Expected behaviour: A concept-appropriate figure (or an honest "there is no picture for this lesson") for topics a learner cannot picture from text: phase diagram (#42), titration/pH curves (#68, #73), mechanism arrows (#127, #129, #143–#147), molecular shapes (#31), MO/orbital pictures.
- Actual behaviour: No figure is served; when the learner asks about "the picture" the tutor invents one (see CHEM-036, CHEM-117, CHEM-130).
- Why it is a defect: A visual subject taught without a visual in 40 % of lessons; the learner who asks for the picture is answered with analogies about a figure that does not exist.
- Reproducibility: Observed on each of the 74 lessons (one observation each). Absence was judged over the full lesson, including turns where the learner asked about the picture.
- Related defect: —
- Status: PARTIALLY FIXED
- Fix: 440b55c — production redrive 2026-10-06 (log-verified): figure served in 7 of 9 re-driven lessons (incl. #21 and the earlier no-figure #42). No figure for #165 chem.nitro.nitro-compounds and #64 chem.equil.buffer: production VISUAL_TURN reason "no-figure:critic-reject-cached" — no curated (Tier 0/1) figure, and the generated one was rejected by the figure critic and the rejection cached. Fix is per-concept figure authoring (content), not a code mechanism; remaining cluster, not patched individually.

### CHEM-150 — Served card/answer wording differs from the authored repo wording in 12 lessons (13 cards): production corpus has not converged with the repository

- Severity: P3
- Category: Questions
- Date/time: 2026-10-05 14:57 UTC
- Account: Account 1
- Chemistry concept: `orders 6, 7, 14, 15, 16, 56, 57, 65, 69, 82, 130, 132`
- Lesson/order: #6
- Learner message: (card options as served)
- Tutor response: Diff of served card options against `chemistrySeedAssets.ts` probes (same stem, similarity ≥ 0.8): e.g. #6 "2g of H₂ contains more" is served (the authored key was changed — see CHEM-091); #15 served "One. The count is n − l − 1 … It is n − 1 only when l = 0…" vs repo "The n − 1 rule only applies…"; #130 served "…is comparatively non-polar, so a polar compound sticks to the plate and travels a short distance…" vs repo "…so a polar compound sticks and travels less far…".
- Expected behaviour: Served text equals the current authored text (or the repo documents why not).
- Actual behaviour: 12 of the 12 mismatching lessons show older/longer wording; only #6 is a content difference (wrong key). The rest are wording differences with the same keys (as far as seen).
- Why it is a defect: Edits to authored content do not reach production by themselves (create-only bootstrap, as noted in CLAUDE.md); the one content difference (#6) is a wrong key still live.
- Reproducibility: Checked automatically on all cards observed in 182 lessons; only cards whose stems matched an authored probe were compared, so the true number may be higher.
- Related defect: —
- Status: FIXED
- Fix: Converged 2026-10-06 (owner-approved production write). Read-only drift check of every ACTIVE probe in chemistry, physics and biology against the corpus (hash comparison, no row content pulled): 10 rows converged first (backup docs/qa/backups/probe-converge-2026-10-06.json), then 55 more (52 chemistry, 2 physics, 1 biology; backup docs/qa/backups/probe-converge-2026-10-06-b.json). Re-check: 55/55 match; no answer key moved to a different option. Undo: npx tsx scripts/assets/converge-probe-edits.ts --restore <backup>.

## Systemic observations (counts computed from the transcripts)

Computed over the 186 lesson transcripts (3,425 learner turns; one reply each):

- Reply provider: groq 2,138 (62 %), gemini 602 (18 %), memory/authored 287 (8 %), gate 106 (3 %), degraded fallback 292 (9 %).
  Gemini serves about one reply in five although Groq is the documented primary: **cause uncertain** (fallback on rate limit
  is the likely mechanism; no server logs were available — Vercel log queries timed out). Gemini-opened lessons are where the
  "celebration at lesson open" replies (CHEM-027) mostly occur.
- Cards (mcq) shown: 1,143; 2 options 701 (61 %), 3 options 77, 4 options 365 (CHEM-004).
- Lesson close: 186 of 186 closed; 86 as "mastered" (verified), 100 as "needs review" ("Let's pause … worth another look
  later"), many with mastery counters still 0/0 (CHEM-016).
- Lessons with a figure: 112; with no figure on any turn: 74 (CHEM-149).
- Per account (lessons / learner turns / mastered / needs-review): A1 19/293/14/5 · A2 19/351/8/11 · A3 19/353/8/11 ·
  A4 19/353/5/14 · A5 19/331/11/8 · A6 19/322/8/11 · A7 18/284/9/9 · A8 18/337/8/10 · A9 18/293/7/11 · A10 18/322/8/10.
  (Accounts differ in lesson difficulty — blocks of the curriculum — so these are not a comparison between accounts.)

## Concurrency and isolation tests

- **Same account, three sessions at once** (accounts 1 and 5, 12 interleaved turns per session): in both probes two of the three
  sessions were taught the **third lesson's content, figure and curriculum line** instead of their own (**CHEM-148**, P1;
  reproduced 2/2). A lone session of the same lesson on the same account taught its own content.
- **Same account, sequential sessions**: a later lesson answered "i dont understand this picture" about the figure of an earlier
  lesson of the same account on two occasions (**CHEM-130**, P2). A scan of all 186 transcripts for figure titles of other
  lessons in "picture" replies found only these two.
- **Different accounts at once**: ten accounts ran different lessons simultaneously for the whole run, and four accounts
  opened the **same** lesson (#30) at the same time with a unique marker word each ("Zorbax<N>Quill"). No marker or lesson
  content from another account appeared in any reply. The tutor never echoed a learner's own marker either, so this is
  **weak evidence of isolation, not a proof**; progress records were not read from the database.
- Account name checks: every reply that used a name used the right account's name (account 9: "test0").
- Blocked: **none** persisted. Eight first attempts stopped on ≥3 consecutive degraded replies (load); all eight lessons were
  completed on a re-run.

## Coverage by lesson

Result per account in brackets: turns driven, and how the lesson closed (mastered / needs-review = "Let's pause … worth another look later").
"figure none" means no figure channel (visual / visualSpec / sceneSpec / dynamic code) was returned on any turn.

| # | concept | lesson | accounts (turns, result) | figure | defects referencing |
|---|---|---|---|---|---|
| 1 | `chem.found.matter` | Nature of Matter | A1 (16t, mastered) | yes | CHEM-002, CHEM-004, CHEM-005, CHEM-009, CHEM-010, CHEM-011, CHEM-012, CHEM-013, CHEM-039 |
| 2 | `chem.found.states-of-matter` | States of Matter | A1 (9t, mastered) | yes | CHEM-002, CHEM-017, CHEM-023, CHEM-026, CHEM-033 |
| 3 | `chem.found.pure-substances` | Pure Substances and Mixtures | A1 (19t, mastered) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-028, CHEM-033, CHEM-041, CHEM-079, CHEM-082 |
| 4 | `chem.found.measurement` | Physical Quantities and SI Units | A1 (17t, mastered) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-033, CHEM-066, CHEM-067 |
| 5 | `chem.found.significant-figures` | Significant Figures and Error Analysis | A1 (14t, mastered) | yes | CHEM-002, CHEM-004, CHEM-028, CHEM-039, CHEM-082, CHEM-148 |
| 6 | `chem.found.mole-concept` | Mole Concept and Avogadro's Number | A1 (13t, mastered) | yes | CHEM-001, CHEM-002, CHEM-004, CHEM-027, CHEM-028, CHEM-091, CHEM-150 |
| 7 | `chem.found.stoichiometry` | Stoichiometry | A1 (20t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-016, CHEM-018, CHEM-033, CHEM-044, CHEM-061 |
| 8 | `chem.found.concentration` | Concentration Units | A1 (12t, mastered) | yes | CHEM-002, CHEM-004, CHEM-028 |
| 9 | `chem.atomic.atomic-theory` | Atomic Theory | A1 (8t, mastered) | yes | CHEM-002, CHEM-004, CHEM-060 |
| 10 | `chem.atomic.subatomic-particles` | Subatomic Particles | A1 (10t, mastered) | yes | CHEM-002, CHEM-060, CHEM-064, CHEM-107 |
| 11 | `chem.atomic.electromagnetic-radiation` | Electromagnetic Radiation | A1 (16t, mastered) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-028, CHEM-033, CHEM-034, CHEM-060, CHEM-107 |
| 12 | `chem.atomic.atomic-spectra` | Atomic Spectra | A1 (24t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-016, CHEM-028, CHEM-039, CHEM-060, CHEM-107 |
| 13 | `chem.atomic.bohr-model` | Bohr Model of the Atom | A1 (22t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-016, CHEM-033, CHEM-107 |
| 14 | `chem.atomic.quantum-numbers` | Quantum Numbers | A1 (27t, needs-review) | yes | CHEM-016, CHEM-022, CHEM-028, CHEM-033, CHEM-034, CHEM-039, CHEM-107 |
| 15 | `chem.atomic.orbitals` | Atomic Orbitals | A1 (22t, needs-review) | yes | CHEM-003, CHEM-004, CHEM-016, CHEM-033, CHEM-036, CHEM-039, CHEM-107 |
| 16 | `chem.atomic.electronic-config` | Electronic Configuration | A1 (10t, mastered) | yes | CHEM-002, CHEM-004, CHEM-107 |
| 17 | `chem.atomic.photoelectric-effect` | Photoelectric Effect and Dual Nature | A1 (17t, mastered) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-005, CHEM-033, CHEM-060, CHEM-107 |
| 18 | `chem.atomic.quantum-mech-model` | Quantum Mechanical Model | A1 (9t, mastered) | yes | CHEM-002, CHEM-004, CHEM-033 |
| 19 | `chem.period.classification` | Early Classification of Elements | A1 (8t, mastered) | yes | CHEM-002, CHEM-028, CHEM-060 |
| 20 | `chem.period.modern-periodic-law` | Modern Periodic Law and Table | A2 (19t, mastered) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-015, CHEM-017, CHEM-022, CHEM-028, CHEM-031, CHEM-032, CHEM-033, CHEM-034, CHEM-041, CHEM-079 |
| 21 | `chem.period.atomic-radius` | Atomic and Ionic Radius | A2 (18t, needs-review) | yes | CHEM-004, CHEM-015, CHEM-016, CHEM-033, CHEM-034, CHEM-039, CHEM-060, CHEM-061 |
| 22 | `chem.period.ionization-energy` | Ionization Energy | A2 (13t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-028, CHEM-034, CHEM-058, CHEM-059, CHEM-060, CHEM-065 |
| 23 | `chem.period.electron-affinity` | Electron Affinity and Electronegativity | A2 (17t, needs-review) | yes | CHEM-001, CHEM-004, CHEM-015, CHEM-016, CHEM-027, CHEM-033, CHEM-034, CHEM-060 |
| 24 | `chem.period.periodic-properties` | Periodic Trends Overview | A2 (13t, mastered) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-090 |
| 25 | `chem.period.valency` | Valency and Oxidation State | A2 (7t, mastered) | yes | CHEM-002, CHEM-004, CHEM-060 |
| 26 | `chem.bond.ionic-bonding` | Ionic Bonding | A2 (11t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-095 |
| 27 | `chem.bond.covalent-bonding` | Covalent Bonding | A2 (15t, needs-review) | yes | CHEM-001, CHEM-004, CHEM-016, CHEM-033, CHEM-061 |
| 28 | `chem.bond.vsepr` | VSEPR Theory | A2 (29t, needs-review) | yes | CHEM-001, CHEM-002, CHEM-004, CHEM-015, CHEM-016, CHEM-033, CHEM-039, CHEM-100, CHEM-101, CHEM-107 |
| 29 | `chem.bond.hybridization` | Hybridization | A2 (28t, needs-review) | yes | CHEM-001, CHEM-004, CHEM-015, CHEM-016, CHEM-033, CHEM-034, CHEM-039, CHEM-107 |
| 30 | `chem.bond.mo-theory` | Molecular Orbital Theory | A2 (29t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-028, CHEM-033, CHEM-036, CHEM-039, CHEM-064, CHEM-079, CHEM-107, CHEM-121, CHEM-122 |
| 31 | `chem.bond.polar-molecules` | Polarity and Dipole Moment | A2 (35t, needs-review) | none | CHEM-001, CHEM-003, CHEM-004, CHEM-016, CHEM-033, CHEM-036, CHEM-039, CHEM-044, CHEM-064, CHEM-107 |
| 32 | `chem.bond.intermolecular` | Intermolecular Forces | A2 (24t, needs-review) | none | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-016, CHEM-034, CHEM-036, CHEM-039, CHEM-065, CHEM-107, CHEM-139, CHEM-140 |
| 33 | `chem.bond.metallic-bonding` | Metallic Bonding | A2 (25t, mastered) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-015, CHEM-033, CHEM-035, CHEM-039, CHEM-107 |
| 34 | `chem.bond.resonance` | Resonance Structures | A2 (8t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-036 |
| 35 | `chem.bond.bond-parameters` | Bond Parameters | A2 (19t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-041, CHEM-065 |
| 36 | `chem.bond.coordinate-bond` | Coordinate and Dative Bonding | A2 (14t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-033, CHEM-079 |
| 37 | `chem.state.kinetic-theory` | Kinetic Molecular Theory of Gases | A2 (17t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-015, CHEM-016, CHEM-028, CHEM-039 |
| 38 | `chem.state.gas-laws` | Gas Laws | A2 (10t, needs-review) | yes | CHEM-001, CHEM-004, CHEM-016, CHEM-035, CHEM-041, CHEM-079 |
| 39 | `chem.state.molar-mass-gas` | Molar Mass from Gas Data | A3 (10t, mastered) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-005, CHEM-023 |
| 40 | `chem.state.real-gases` | Real Gases and van der Waals Equation | A3 (24t, mastered) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-033, CHEM-034, CHEM-036, CHEM-039, CHEM-041, CHEM-044, CHEM-045, CHEM-046, CHEM-047, CHEM-055 |
| 41 | `chem.state.liquids` | Liquid State Properties | A3 (25t, needs-review) | none | CHEM-001, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-033, CHEM-036, CHEM-039, CHEM-068 |
| 42 | `chem.state.phase-diagram` | Phase Diagrams | A3 (19t, needs-review) | none | CHEM-003, CHEM-015, CHEM-016, CHEM-036, CHEM-039, CHEM-085, CHEM-086, CHEM-087, CHEM-088, CHEM-149 |
| 43 | `chem.sol.types` | Types of Solutions | A3 (18t, mastered) | none | CHEM-002, CHEM-004, CHEM-015, CHEM-033, CHEM-039 |
| 44 | `chem.sol.solubility` | Solubility and Henry's Law | A3 (14t, mastered) | yes | CHEM-004, CHEM-015, CHEM-033, CHEM-101, CHEM-107 |
| 45 | `chem.sol.vapour-pressure` | Vapour Pressure of Solutions | A3 (13t, needs-review) | none | CHEM-004, CHEM-016, CHEM-033, CHEM-101, CHEM-107 |
| 46 | `chem.sol.colligative` | Colligative Properties | A3 (33t, needs-review) | yes | CHEM-004, CHEM-015, CHEM-016, CHEM-033, CHEM-039, CHEM-107 |
| 47 | `chem.sol.osmosis` | Osmosis and Osmotic Pressure | A3 (14t, needs-review) | yes | CHEM-004, CHEM-015, CHEM-016, CHEM-107 |
| 48 | `chem.sol.activity` | Activity and Non-ideal Solutions | A3 (13t, needs-review) | none | CHEM-004, CHEM-016, CHEM-033, CHEM-107 |
| 49 | `chem.thermo.system` | System, Surroundings and State Functions | A3 (21t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-039, CHEM-079, CHEM-107 |
| 50 | `chem.thermo.first-law` | First Law of Thermodynamics | A3 (25t, needs-review) | yes | CHEM-003, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-107 |
| 51 | `chem.thermo.enthalpy` | Enthalpy and Hess's Law | A3 (20t, needs-review) | yes | CHEM-001, CHEM-004, CHEM-016, CHEM-033, CHEM-034, CHEM-075, CHEM-107 |
| 52 | `chem.thermo.bond-enthalpy` | Bond Enthalpy | A3 (7t, mastered) | yes | CHEM-002, CHEM-004, CHEM-022, CHEM-141 |
| 53 | `chem.thermo.entropy` | Entropy and Second Law | A3 (19t, mastered) | none | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-018, CHEM-033, CHEM-039, CHEM-041, CHEM-107, CHEM-144 |
| 54 | `chem.thermo.gibbs` | Gibbs Free Energy and Spontaneity | A3 (9t, mastered) | none | CHEM-001, CHEM-002, CHEM-004, CHEM-018, CHEM-033 |
| 55 | `chem.thermo.third-law` | Third Law and Absolute Entropy | A3 (21t, mastered) | none | CHEM-001, CHEM-002, CHEM-004, CHEM-015, CHEM-028, CHEM-033, CHEM-036, CHEM-039, CHEM-044, CHEM-079 |
| 56 | `chem.thermo.heat-capacities` | Heat Capacities of Gases | A3 (26t, needs-review) | yes | CHEM-004, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-064 |
| 57 | `chem.thermo.cell-thermo` | Electrochemical Thermodynamics | A3 (22t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-016, CHEM-033, CHEM-039, CHEM-041 |
| 58 | `chem.equil.concept` | Equilibrium Concept | A4 (16t, needs-review) | none | CHEM-001, CHEM-002, CHEM-005, CHEM-015, CHEM-016, CHEM-028, CHEM-035, CHEM-036, CHEM-037, CHEM-038, CHEM-041, CHEM-044, CHEM-075, CHEM-079 |
| 59 | `chem.equil.kc-kp` | Equilibrium Constants Kc and Kp | A4 (13t, mastered) | yes | CHEM-004, CHEM-028, CHEM-033, CHEM-034, CHEM-036 |
| 60 | `chem.equil.le-chatelier` | Le Chatelier's Principle | A4 (14t, needs-review) | yes | CHEM-016, CHEM-033, CHEM-034, CHEM-069, CHEM-070 |
| 61 | `chem.equil.kw-ph` | Water Ionization and pH | A4 (25t, needs-review) | none | CHEM-003, CHEM-004, CHEM-016, CHEM-033, CHEM-036, CHEM-039, CHEM-041, CHEM-089 |
| 62 | `chem.equil.acids-bases` | Acid–Base Theories | A4 (17t, needs-review) | none | CHEM-003, CHEM-004, CHEM-016, CHEM-028, CHEM-036, CHEM-039, CHEM-041, CHEM-044 |
| 63 | `chem.equil.weak-acid` | Weak Acid and Base Equilibria | A4 (19t, needs-review) | none | CHEM-003, CHEM-004, CHEM-016, CHEM-033, CHEM-036, CHEM-039, CHEM-065 |
| 64 | `chem.equil.buffer` | Buffer Solutions | A4 (20t, needs-review) | none | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-036, CHEM-039, CHEM-041, CHEM-102 |
| 65 | `chem.equil.hydrolysis` | Salt Hydrolysis | A4 (31t, needs-review) | none | CHEM-001, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-028, CHEM-033, CHEM-036, CHEM-039, CHEM-064, CHEM-081, CHEM-107 |
| 66 | `chem.equil.solubility` | Solubility Equilibria | A4 (22t, needs-review) | none | CHEM-001, CHEM-003, CHEM-004, CHEM-016, CHEM-033, CHEM-107, CHEM-112 |
| 67 | `chem.equil.complex-equil` | Complex Ion Equilibria | A4 (12t, mastered) | none | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-033, CHEM-107 |
| 68 | `chem.equil.titration` | Acid–Base Titrations | A4 (16t, needs-review) | none | CHEM-004, CHEM-016, CHEM-028, CHEM-033, CHEM-036, CHEM-039, CHEM-107, CHEM-115, CHEM-116, CHEM-117 |
| 69 | `chem.redox.oxidation-state` | Oxidation State | A4 (19t, mastered) | none | CHEM-001, CHEM-004, CHEM-015, CHEM-033, CHEM-041, CHEM-107, CHEM-123 |
| 70 | `chem.redox.balancing` | Balancing Redox Equations | A4 (15t, needs-review) | none | CHEM-001, CHEM-004, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-065, CHEM-107, CHEM-129 |
| 71 | `chem.redox.disproportionation` | Disproportionation | A4 (25t, needs-review) | none | CHEM-003, CHEM-016, CHEM-028, CHEM-036, CHEM-039, CHEM-107 |
| 72 | `chem.redox.activity-series` | Electrochemical Activity Series | A4 (22t, needs-review) | yes | CHEM-001, CHEM-016, CHEM-028, CHEM-039, CHEM-079, CHEM-107 |
| 73 | `chem.redox.titrations` | Redox Titrations | A4 (18t, needs-review) | none | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-016, CHEM-028, CHEM-036, CHEM-039, CHEM-041 |
| 74 | `chem.elect.galvanic-cell` | Galvanic Cell | A4 (20t, mastered) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-033, CHEM-039, CHEM-044 |
| 75 | `chem.elect.standard-electrode` | Standard Electrode Potential | A4 (21t, needs-review) | yes | CHEM-001, CHEM-002, CHEM-004, CHEM-016, CHEM-028, CHEM-039, CHEM-041, CHEM-079 |
| 76 | `chem.elect.nernst` | Nernst Equation | A4 (8t, mastered) | yes | CHEM-002, CHEM-004 |
| 77 | `chem.elect.concentration-cell` | Concentration Cells | A5 (14t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-007, CHEM-008, CHEM-018, CHEM-021, CHEM-033 |
| 78 | `chem.elect.conductance` | Electrolytic Conductance | A5 (7t, mastered) | none | CHEM-002, CHEM-004, CHEM-024, CHEM-025, CHEM-044, CHEM-079 |
| 79 | `chem.elect.electrolysis` | Electrolysis and Faraday's Laws | A5 (22t, mastered) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-022, CHEM-023, CHEM-028, CHEM-033, CHEM-048, CHEM-049 |
| 80 | `chem.elect.batteries` | Batteries and Fuel Cells | A5 (15t, mastered) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-028, CHEM-033, CHEM-062, CHEM-063 |
| 81 | `chem.elect.corrosion` | Corrosion | A5 (18t, needs-review) | none | CHEM-001, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-028, CHEM-036, CHEM-039, CHEM-044, CHEM-075, CHEM-079, CHEM-080, CHEM-081 |
| 82 | `chem.elect.industrial` | Industrial Electrolysis | A5 (17t, mastered) | yes | CHEM-001, CHEM-002, CHEM-004, CHEM-015, CHEM-028, CHEM-033, CHEM-092, CHEM-093 |
| 83 | `chem.kinet.rate` | Rate of Reaction | A5 (14t, mastered) | none | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-033 |
| 84 | `chem.kinet.rate-law` | Rate Law and Order | A5 (21t, needs-review) | yes | CHEM-001, CHEM-002, CHEM-004, CHEM-016, CHEM-028, CHEM-039, CHEM-041, CHEM-081, CHEM-103 |
| 85 | `chem.kinet.integrated-rate` | Integrated Rate Laws | A5 (8t, mastered) | none | CHEM-002, CHEM-004, CHEM-028 |
| 86 | `chem.kinet.arrhenius` | Arrhenius Equation | A5 (13t, mastered) | none | CHEM-004, CHEM-033, CHEM-079 |
| 87 | `chem.kinet.mechanism` | Reaction Mechanisms | A5 (33t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-016, CHEM-033, CHEM-039, CHEM-107, CHEM-110 |
| 88 | `chem.kinet.catalysis` | Catalysis | A5 (26t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-015, CHEM-016, CHEM-033, CHEM-039, CHEM-107 |
| 89 | `chem.kinet.photochemistry` | Photochemical Reactions | A5 (27t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-064, CHEM-107 |
| 90 | `chem.solid.crystal-systems` | Crystal Systems | A5 (24t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-016, CHEM-033, CHEM-034, CHEM-039, CHEM-107, CHEM-133 |
| 91 | `chem.solid.packing` | Close Packing and Efficiency | A5 (21t, needs-review) | yes | CHEM-001, CHEM-002, CHEM-004, CHEM-016, CHEM-028, CHEM-034, CHEM-039, CHEM-064, CHEM-079, CHEM-107 |
| 92 | `chem.solid.ionic-solids` | Ionic Crystal Structures | A5 (8t, mastered) | yes | CHEM-002, CHEM-022, CHEM-028, CHEM-034, CHEM-107 |
| 93 | `chem.solid.defects` | Crystal Defects | A5 (20t, needs-review) | none | CHEM-001, CHEM-003, CHEM-004, CHEM-016, CHEM-036, CHEM-039, CHEM-064, CHEM-079 |
| 94 | `chem.solid.properties` | Electrical and Magnetic Properties | A5 (16t, mastered) | yes | CHEM-002, CHEM-004, CHEM-028, CHEM-033, CHEM-041, CHEM-060 |
| 95 | `chem.solid.amorphous` | Amorphous Solids | A5 (7t, mastered) | yes | CHEM-002, CHEM-004 |
| 96 | `chem.surface.adsorption` | Adsorption | A6 (12t, mastered) | none | CHEM-001, CHEM-002, CHEM-004, CHEM-005, CHEM-015, CHEM-036 |
| 97 | `chem.surface.colloids` | Colloids | A6 (10t, mastered) | none | CHEM-001, CHEM-002, CHEM-018, CHEM-023, CHEM-027, CHEM-028, CHEM-029 |
| 98 | `chem.surface.emulsions` | Emulsions and Gels | A6 (7t, mastered) | none | CHEM-002, CHEM-004, CHEM-042, CHEM-043 |
| 99 | `chem.surface.surfactants` | Surfactants and Micelles | A6 (20t, needs-review) | none | CHEM-001, CHEM-015, CHEM-016, CHEM-028, CHEM-036, CHEM-039, CHEM-061, CHEM-064 |
| 100 | `chem.surface.heterogeneous-cat` | Mechanism of Heterogeneous Catalysis | A6 (9t, mastered) | none | CHEM-002, CHEM-004, CHEM-033 |
| 101 | `chem.coord.werner` | Werner's Theory | A6 (24t, mastered) | yes | CHEM-002, CHEM-004, CHEM-033, CHEM-039, CHEM-041 |
| 102 | `chem.coord.nomenclature` | Nomenclature of Complexes | A6 (20t, needs-review) | yes | CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-028, CHEM-033, CHEM-096 |
| 103 | `chem.coord.isomerism` | Isomerism in Complexes | A6 (15t, needs-review) | yes | CHEM-004, CHEM-016, CHEM-033 |
| 104 | `chem.coord.cft` | Crystal Field Theory | A6 (21t, needs-review) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-016, CHEM-039, CHEM-041 |
| 105 | `chem.coord.bonding` | Bonding in Complexes | A6 (11t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004 |
| 106 | `chem.coord.stability` | Stability Constants | A6 (21t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-016, CHEM-033, CHEM-039 |
| 107 | `chem.coord.applications` | Applications of Coordination Chemistry | A6 (21t, needs-review) | yes | CHEM-003, CHEM-004, CHEM-016, CHEM-028, CHEM-039, CHEM-079, CHEM-109 |
| 108 | `chem.sblock.hydrogen` | Hydrogen | A6 (22t, needs-review) | none | CHEM-001, CHEM-004, CHEM-015, CHEM-016, CHEM-036, CHEM-107, CHEM-113 |
| 109 | `chem.sblock.alkali` | Alkali Metals | A6 (22t, needs-review) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-016, CHEM-036, CHEM-039, CHEM-044, CHEM-107, CHEM-118 |
| 110 | `chem.sblock.alkaline-earth` | Alkaline Earth Metals | A6 (23t, needs-review) | none | CHEM-001, CHEM-004, CHEM-016, CHEM-036, CHEM-039, CHEM-041, CHEM-064, CHEM-079, CHEM-107, CHEM-125, CHEM-126, CHEM-127 |
| 111 | `chem.sblock.water` | Chemistry of Water | A6 (18t, needs-review) | none | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-016, CHEM-028, CHEM-041, CHEM-079, CHEM-107, CHEM-131 |
| 112 | `chem.pblock.group13` | Group 13 — Boron Family | A6 (11t, mastered) | none | CHEM-001, CHEM-002, CHEM-004, CHEM-036, CHEM-039, CHEM-041, CHEM-044, CHEM-132 |
| 113 | `chem.pblock.group14` | Group 14 — Carbon Family | A6 (22t, needs-review) | none | CHEM-001, CHEM-015, CHEM-016, CHEM-036, CHEM-039, CHEM-041, CHEM-079, CHEM-107 |
| 114 | `chem.pblock.group15` | Group 15 — Nitrogen Family | A6 (13t, mastered) | none | CHEM-002, CHEM-004, CHEM-015, CHEM-028, CHEM-036, CHEM-039, CHEM-044, CHEM-079, CHEM-145 |
| 115 | `chem.pblock.group16` | Group 16 — Oxygen Family | A7 (12t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-005, CHEM-006, CHEM-014, CHEM-015, CHEM-022, CHEM-041 |
| 116 | `chem.pblock.group17` | Group 17 — Halogens | A7 (11t, mastered) | none | CHEM-001, CHEM-002, CHEM-004, CHEM-005, CHEM-017, CHEM-023, CHEM-027, CHEM-030, CHEM-033 |
| 117 | `chem.pblock.group18` | Group 18 — Noble Gases | A7 (20t, mastered) | none | CHEM-003, CHEM-004, CHEM-023, CHEM-028, CHEM-033, CHEM-036, CHEM-039, CHEM-050, CHEM-051, CHEM-065 |
| 118 | `chem.pblock.trends` | Trends Across p-Block | A7 (19t, needs-review) | none | CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-028, CHEM-036, CHEM-039, CHEM-041, CHEM-065, CHEM-071, CHEM-072, CHEM-073 |
| 119 | `chem.dblock.general` | Transition Metals — General Properties | A7 (18t, mastered) | none | CHEM-002, CHEM-003, CHEM-015, CHEM-028, CHEM-033, CHEM-084 |
| 120 | `chem.dblock.first-row` | First-Row Transition Metals | A7 (10t, mastered) | none | CHEM-002, CHEM-004, CHEM-033, CHEM-094 |
| 121 | `chem.dblock.oxo-species` | Oxides and Oxyanions of Transition Metals | A7 (20t, needs-review) | none | CHEM-004, CHEM-016, CHEM-028, CHEM-036, CHEM-039, CHEM-097, CHEM-098 |
| 122 | `chem.dblock.lanthanides` | Lanthanides and Actinides | A7 (23t, needs-review) | yes | CHEM-015, CHEM-016, CHEM-020, CHEM-039, CHEM-041, CHEM-101, CHEM-102, CHEM-107 |
| 123 | `chem.dblock.organometallics` | Organometallic Chemistry | A7 (9t, needs-review) | yes | CHEM-016, CHEM-028, CHEM-107 |
| 124 | `chem.org.iupac` | IUPAC Nomenclature | A7 (9t, mastered) | none | CHEM-002, CHEM-004, CHEM-101, CHEM-107 |
| 125 | `chem.org.hybridization` | Carbon Hybridization | A7 (36t, needs-review) | none | CHEM-001, CHEM-004, CHEM-016, CHEM-028, CHEM-033, CHEM-036, CHEM-039, CHEM-107 |
| 126 | `chem.org.isomerism` | Structural and Stereoisomerism | A7 (7t, mastered) | none | CHEM-002, CHEM-004 |
| 127 | `chem.org.electronic-effects` | Inductive and Mesomeric Effects | A7 (25t, needs-review) | none | CHEM-001, CHEM-004, CHEM-016, CHEM-036, CHEM-039, CHEM-064, CHEM-065, CHEM-107 |
| 128 | `chem.org.reactive-intermediates` | Reactive Intermediates | A7 (8t, mastered) | none | CHEM-002, CHEM-003, CHEM-004, CHEM-041 |
| 129 | `chem.org.mechanisms` | Organic Reaction Mechanisms | A7 (9t, mastered) | none | CHEM-002, CHEM-004, CHEM-033 |
| 130 | `chem.org.purification` | Purification Techniques | A7 (21t, needs-review) | none | CHEM-004, CHEM-016, CHEM-028, CHEM-036, CHEM-039, CHEM-107, CHEM-130 |
| 131 | `chem.org.qualitative-analysis` | Qualitative Organic Analysis | A7 (17t, needs-review) | none | CHEM-001, CHEM-003, CHEM-004, CHEM-016, CHEM-033, CHEM-107, CHEM-135 |
| 132 | `chem.org.spectroscopy` | Introduction to Spectroscopy | A7 (10t, needs-review) | none | CHEM-004, CHEM-016, CHEM-033, CHEM-138 |
| 133 | `chem.org.aromaticity` | Aromaticity | A8 (7t, mastered) | yes | CHEM-001, CHEM-002, CHEM-004 |
| 134 | `chem.org.arrow-pushing` | Electron Flow and Arrow Notation | A8 (18t, mastered) | none | CHEM-001, CHEM-002, CHEM-004, CHEM-033, CHEM-036, CHEM-039, CHEM-040, CHEM-041, CHEM-055 |
| 135 | `chem.org.pericyclic` | Pericyclic Reactions | A8 (8t, mastered) | yes | CHEM-001, CHEM-002, CHEM-005, CHEM-052 |
| 136 | `chem.hyd.alkanes` | Alkanes | A8 (25t, needs-review) | none | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-005, CHEM-016, CHEM-033, CHEM-036, CHEM-039, CHEM-074, CHEM-075 |
| 137 | `chem.hyd.alkenes` | Alkenes | A8 (26t, needs-review) | none | CHEM-001, CHEM-003, CHEM-004, CHEM-016, CHEM-033, CHEM-036, CHEM-039, CHEM-076 |
| 138 | `chem.hyd.alkynes` | Alkynes | A8 (20t, needs-review) | yes | CHEM-002, CHEM-015, CHEM-016, CHEM-028, CHEM-041, CHEM-082, CHEM-099 |
| 139 | `chem.hyd.arenes` | Benzene and Arenes | A8 (20t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-015, CHEM-028, CHEM-033, CHEM-039, CHEM-065, CHEM-104 |
| 140 | `chem.hyd.conformations` | Conformational Analysis | A8 (11t, mastered) | none | CHEM-004, CHEM-033, CHEM-107, CHEM-108 |
| 141 | `chem.hyd.petroleum` | Petroleum Refining | A8 (35t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-033, CHEM-039, CHEM-107, CHEM-111 |
| 142 | `chem.hyd.polycyclic` | Polycyclic and Heterocyclic Systems | A8 (14t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-028, CHEM-033, CHEM-107 |
| 143 | `chem.hal.introduction` | Haloalkanes and Haloarenes | A8 (19t, needs-review) | none | CHEM-003, CHEM-004, CHEM-016, CHEM-028, CHEM-033, CHEM-036, CHEM-107 |
| 144 | `chem.hal.sn1` | SN1 Mechanism | A8 (28t, needs-review) | yes | CHEM-003, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-064, CHEM-107, CHEM-134 |
| 145 | `chem.hal.sn2` | SN2 Mechanism | A8 (16t, needs-review) | yes | CHEM-001, CHEM-004, CHEM-016, CHEM-033 |
| 146 | `chem.hal.elimination` | Elimination Reactions | A8 (23t, needs-review) | none | CHEM-002, CHEM-003, CHEM-016, CHEM-036, CHEM-039, CHEM-064, CHEM-101, CHEM-107, CHEM-142 |
| 147 | `chem.hal.haloarenes` | Haloarenes | A8 (22t, needs-review) | none | CHEM-001, CHEM-004, CHEM-016, CHEM-036, CHEM-039, CHEM-064, CHEM-107 |
| 148 | `chem.hal.grignard` | Grignard and Organolithium Reagents | A8 (12t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-033 |
| 149 | `chem.hal.cfcs` | Polyhalogen Compounds and CFCs | A8 (19t, needs-review) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-041 |
| 150 | `chem.alc.alcohols` | Alcohols | A8 (14t, mastered) | none | CHEM-003, CHEM-004, CHEM-033, CHEM-039, CHEM-107 |
| 151 | `chem.alc.phenols` | Phenols | A9 (18t, needs-review) | yes | CHEM-003, CHEM-004, CHEM-016, CHEM-017, CHEM-019, CHEM-020, CHEM-022, CHEM-023, CHEM-033, CHEM-039 |
| 152 | `chem.alc.ethers` | Ethers | A9 (28t, needs-review) | yes | CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-023, CHEM-027, CHEM-028, CHEM-033, CHEM-035, CHEM-039, CHEM-053, CHEM-054, CHEM-055, CHEM-082, CHEM-083 |
| 153 | `chem.alc.diols` | Diols and Polyols | A9 (7t, mastered) | none | CHEM-002, CHEM-004, CHEM-076 |
| 154 | `chem.alc.epoxides` | Epoxides | A9 (20t, needs-review) | none | CHEM-004, CHEM-015, CHEM-016, CHEM-036, CHEM-039, CHEM-041, CHEM-077, CHEM-078 |
| 155 | `chem.alc.protection` | Protecting Group Strategy | A9 (31t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-041 |
| 156 | `chem.carb.aldehydes` | Aldehydes | A9 (12t, needs-review) | none | CHEM-003, CHEM-004, CHEM-016, CHEM-018, CHEM-033 |
| 157 | `chem.carb.ketones` | Ketones | A9 (12t, mastered) | yes | CHEM-002, CHEM-003, CHEM-004, CHEM-105 |
| 158 | `chem.carb.alpha-reactions` | Alpha-Carbon Reactions | A9 (9t, mastered) | yes | CHEM-002, CHEM-107 |
| 159 | `chem.carb.carboxylic` | Carboxylic Acids | A9 (17t, needs-review) | none | CHEM-001, CHEM-004, CHEM-016, CHEM-033, CHEM-036, CHEM-039 |
| 160 | `chem.carb.derivatives` | Carboxylic Acid Derivatives | A9 (18t, needs-review) | yes | CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-033, CHEM-064, CHEM-065, CHEM-107, CHEM-114 |
| 161 | `chem.carb.named-reactions` | Named Carbonyl Reactions | A9 (26t, needs-review) | yes | CHEM-001, CHEM-016, CHEM-028, CHEM-033, CHEM-035, CHEM-036, CHEM-039, CHEM-107, CHEM-119, CHEM-120 |
| 162 | `chem.carb.spectro` | Spectroscopic ID of Carbonyls | A9 (17t, needs-review) | none | CHEM-004, CHEM-015, CHEM-016, CHEM-033, CHEM-064, CHEM-107, CHEM-128 |
| 163 | `chem.nitro.amines` | Amines | A9 (9t, mastered) | yes | CHEM-002, CHEM-004, CHEM-015, CHEM-065, CHEM-079, CHEM-136 |
| 164 | `chem.nitro.diazonium` | Diazonium Salts | A9 (23t, needs-review) | none | CHEM-001, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-028, CHEM-036, CHEM-039, CHEM-107 |
| 165 | `chem.nitro.nitro-compounds` | Nitro Compounds | A9 (18t, mastered) | none | CHEM-002, CHEM-003, CHEM-004, CHEM-028, CHEM-033, CHEM-107, CHEM-146 |
| 166 | `chem.nitro.heterocycles` | Nitrogen Heterocycles | A9 (10t, needs-review) | yes | CHEM-003, CHEM-016, CHEM-034, CHEM-041, CHEM-079 |
| 167 | `chem.nitro.amino-acids` | Amino Acids | A9 (8t, mastered) | yes | CHEM-002, CHEM-028 |
| 168 | `chem.bio.carbohydrates` | Carbohydrates | A9 (10t, mastered) | none | CHEM-002, CHEM-028, CHEM-036, CHEM-039, CHEM-079 |
| 169 | `chem.bio.proteins` | Proteins | A10 (7t, mastered) | yes | CHEM-002, CHEM-004, CHEM-005, CHEM-075 |
| 170 | `chem.bio.nucleic-acids` | Nucleic Acids | A10 (7t, mastered) | yes | CHEM-001, CHEM-002, CHEM-005, CHEM-022, CHEM-023 |
| 171 | `chem.bio.lipids` | Lipids | A10 (26t, needs-review) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-027, CHEM-028, CHEM-033, CHEM-039, CHEM-056, CHEM-057 |
| 172 | `chem.bio.vitamins` | Vitamins and Hormones | A10 (27t, needs-review) | yes | CHEM-003, CHEM-004, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-041 |
| 173 | `chem.bio.enzyme-kinetics` | Enzyme Kinetics | A10 (12t, mastered) | none | CHEM-002, CHEM-003, CHEM-033 |
| 174 | `chem.poly.addition` | Addition Polymerization | A10 (7t, mastered) | yes | CHEM-002, CHEM-004 |
| 175 | `chem.poly.condensation` | Condensation Polymerization | A10 (19t, mastered) | yes | CHEM-001, CHEM-002, CHEM-028, CHEM-033, CHEM-064, CHEM-107 |
| 176 | `chem.poly.natural` | Natural Polymers | A10 (18t, mastered) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-027, CHEM-028, CHEM-033, CHEM-039, CHEM-106 |
| 177 | `chem.poly.properties` | Polymer Properties | A10 (24t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-016, CHEM-033, CHEM-034, CHEM-039, CHEM-107 |
| 178 | `chem.poly.biodegradable` | Biodegradable and Functional Polymers | A10 (11t, needs-review) | yes | CHEM-016, CHEM-033, CHEM-107 |
| 179 | `chem.env.atmosphere` | Atmosphere and Composition | A10 (26t, needs-review) | yes | CHEM-001, CHEM-003, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-107 |
| 180 | `chem.env.air-pollution` | Air Pollution | A10 (23t, needs-review) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-041, CHEM-079, CHEM-107 |
| 181 | `chem.env.ozone` | Ozone Depletion | A10 (19t, needs-review) | none | CHEM-001, CHEM-003, CHEM-004, CHEM-015, CHEM-016, CHEM-036, CHEM-039, CHEM-041, CHEM-107, CHEM-124 |
| 182 | `chem.env.water-soil` | Water and Soil Pollution | A10 (22t, needs-review) | yes | CHEM-002, CHEM-003, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-041, CHEM-107, CHEM-137 |
| 183 | `chem.anal.gravimetric` | Gravimetric Analysis | A10 (27t, needs-review) | none | CHEM-001, CHEM-003, CHEM-015, CHEM-016, CHEM-033, CHEM-034, CHEM-036, CHEM-039, CHEM-044, CHEM-079, CHEM-107, CHEM-143 |
| 184 | `chem.anal.volumetric` | Volumetric Analysis | A10 (27t, needs-review) | yes | CHEM-001, CHEM-002, CHEM-003, CHEM-004, CHEM-016, CHEM-028, CHEM-033, CHEM-039, CHEM-079, CHEM-107 |
| 185 | `chem.anal.chromatography` | Chromatography | A10 (10t, mastered) | yes | CHEM-002, CHEM-004, CHEM-028 |
| 186 | `chem.anal.spectroscopy` | Spectroscopic Methods | A10 (10t, mastered) | yes | CHEM-002, CHEM-028, CHEM-033, CHEM-147 |


## Not counted as defects (recorded so they are not re-reported)

- Learning difficulty: advanced organic/coordination/kinetics lessons were hard for a weak-English persona; that is not a defect.
- Persona artefacts: scripted quotations of taught text as "answers" were sometimes praised (CHEM-075 records only the praise).
- Account 9's greeting "test0" is the account's own display name inside the app (dashboard shows "test0"), not a model error.
- Hint-style replies instead of a verdict on a wrong card answer are recorded as CHEM-028; they are not counted again per lesson.
- Dashboard "Chemistry 0 %" / XP 0 / streak 0 after lessons driven through the API: **uncertain** — client-side events that normally award XP are not fired by an API driver.
- `/learn` opening on English for a Chemistry-only learner: **uncertain** (fresh browser profile; dashboard "Jump back in" correctly named the next Chemistry lesson).
