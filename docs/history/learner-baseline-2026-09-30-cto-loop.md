# Autonomous CTO loop — 10-session real-browser learner baseline (2026-09-30 / 2026-10-01)

Owner instruction: run a 10-session real-browser learner baseline (5 physics, 5 chemistry) on
the owner-supplied real account, cluster the defects, and fix every admitted cluster. Each fix
gets a failing-first regression test and its own commit. Closed systems stayed closed: GB+,
learnerMove.ts, ADR 16 simulation architecture, new simulations, the Physics Verifier, Durable
Learner State, KG/Blueprint/EB architecture. No production SQL write was used. No evidence,
mastery or progress was fabricated.

## Baseline

The sessions ran in Playwright Chromium against https://my-tutor-flame.vercel.app.

| Session | Concept | Device |
| --- | --- | --- |
| P1 | phys.mech.newtons-second-law | |
| P2 | phys.em.faradays-law | |
| P3 | phys.wave.pendulum | phone, simulation |
| P4 | phys.mech.collisions-inelastic | desktop, resume after more than 30 min |
| P5 | phys.therm.first-law | phone |
| C1 | chem.elect.galvanic-cell | |
| C2 | chem.equil.le-chatelier | phone resume |
| C3–C5 | chemistry | |

- 9 lessons reached verified mastery.
- 8 of those 9 were dismissed with the completion card's Close button.
- Per-session transcripts and ratings were kept in the session scratch area. They were not
  committed because they contain the real account's conversation. Only their findings are
  recorded here.

## Clusters admitted and fixed (one commit each)

| Cluster | Defect (evidence) | Fix | Commit |
| --- | --- | --- | --- |
| CL-1 | The one-question cut left the stub "Let me check your thinking with this." on a wrong answer (P4, C1, C2). | Regenerate the stub through repairStubReply. The repair knows a question card follows. | 9e16ff7f |
| CL-2 | vAffirm rejected a correct confirmation of an answer the server graded CORRECT against the authored key. The tutor then said the wrong option was right (C2). | The affirm guard stands down when the authored key graded the answer correct. | 2f65fdc1 |
| CL-3 | Close on a fully mastered lesson recorded nothing: completedLessons stayed `[]`, roadmap 0% (8 of 9 lessons). | Close PATCHes progress with `advance:false`. The lesson is appended once, with first-completion XP. currentLesson, the selection and the session pointer stay put. | 8b666e7b |
| CL-4 (R1) | A new tab resumed another lesson's session: pendulum chat under the "Inelastic Collisions" header (P1, P5). | chooseResumableSession takes over a released session only if its lesson pointer is the selected lesson. | d1e46ae4 |
| CL-8 | The tutor guessed figure colours: "blue line = v–t graph" (it is green) in P1; "red curve = EMF" (red is flux) in P2. | Colours are read off the drawn objects and listed per part. Each unlabelled shape is tied to its stage. | fdb93a5c |
| CL-10 | The beginner budget (maxControls 2) cut the pendulum mass control that the heavier-bob prediction needs (P3). | controlsFor() always adds the variables the kind's own predictions vary. | 07a9f44d |
| CL-13 | Answer heads "Yes" / "Yes here" made the Cu/Ag item unanswerable (C1). | The head split is refused when heads differ only by hedge words. This changes exactly 1 of 7,414 corpus items. | c088361e |
| CL-9 | Simulation spoilers (P3): the lesson-init opening; a quiz tap containing a digit, which read as a measurement; "square‑root" written with U+2011. | The backstop now also runs on lesson-init. A graded quiz frees only its own topic. Hyphens and NBSP are normalised for matching. | 97dc1dd4 |
| CL-15 | "quiz me" that closed a side-question detour got no quiz: the gate read the closing turn as still in the excursion (P4). | The `closed-wants-practice` transition no longer blocks the gate. | ff358cf3 |
| CL-12 | The generated graph `-5000*(1/x)+10` opened on −5…5 with nothing drawn. The tutor then described "the curve you see" four times (C2). | One shared opening view (graphView.ts). validateGeneratedFigure refuses a graph whose curve fills less than 5% of the view. | d903f910 |
| RC-C | Lesson-one deadlock. One graded miss caused a spiral close. Reopening needs an authored correct answer, but CLOSING withheld every authored question. | In a spiral close only, an explicit practice request lets the gate serve one authored probe. A correct answer takes the existing reopen. An explicit close stays absolute. | fda2f132 |
| (test) | An ordering pin searched for vAffirm's old declaration line. | It now locates the call instead. | f399324f |
| CL-8b | Found LIVE after deploy: the colour was right but its meaning was guessed ("the green marked point marks the block"; it is the current-velocity point). | An unlabelled coloured shape is named by its descriptive generator id. | d54b49ef |
| CL-17 | Found LIVE after deploy: leaving a re-entered MASTERED lesson recorded it SKIPPED (Newton's Second Law, 21:17:06). | topic-progress `skip` keeps COMPLETED, MASTERED and REVISION. | 246bae14 |
| CL-19 | Found LIVE: the completion card read "Mastered: phys.mech.newtons-third-law" (a raw id). | The payload carries masteredTitles/needsReviewTitles; the card shows those. | 877ed832 |
| CL-18 | Found LIVE (mole concept): chemistry distractors were served with their error written on them. | Per-option answer heads extended to chemistry: 200 of 931 items change; the length cue drops 418 → 368. | 6d67157f |
| CL-20 | Found LIVE: a server-graded correct tap got "I understand that you're saying … Is that right?" (the OBSERVATION REPAIR block was in the prompt). | The repair block never fires on a graded turn. | 964ae368 |
| CL-21 | Found LIVE: the H₂/O₂ item's key head said "2g of H₂ contains more" while its working said "equal". | Seed corrected. The production row needs the owner (see below). | b65684e5 |
| CL-22 | Found LIVE: a mastered, closed lesson reloaded into a fresh session got the OPENING protocol, and "is this lesson done?" was answered "not quite yet". | The opening block is skipped on a completed lesson. A status question is not new intent, so the close answers it. | e4727f09, 669db565 |
| CL-23 | Found LIVE (friction): "friction is bigger when the surface area is bigger, right?" put the maths geometry-shapes card on screen (math.geom.surface-area) with no excursion open. The tutor then described arrows that were not drawn. | A cross-subject learner-request target is honoured only when an excursion is actually open. | 47df5e22 |
| CL-1b | Found LIVE (stoichiometry): the CL-1 repair fired on "quiz me". It invented "the thermite problem I gave earlier" and asked a second question beside the card. | The repair skips practice requests. A repair that asks a question while a card follows is discarded. Verified live: "quiz me" now gets a clean hand-off plus the quiz. | de205b61 |
| CL-24 | Found LIVE (stoichiometry): "give me another problem" at DEMONSTRATE had its probe declined by the surplus rule, and D1 then served a stored essay with no question. | A practice request with no authored quiz attached is never memory-served. | 92c3e8a8 |
| CL-16 | Found LIVE (concentration): a correct "No" to the NaOH item got feedback about the previous ppm question (the one-turn-late attribution from the baseline). | On a graded turn the main prompt ends with the answered question and its grade. | 5ba7e62a |
| CL-25 | Found LIVE: "Let me know when you'd like another practice problem" appeared while the next quiz was already attached (concentration, stoichiometry). | A closing deferred-practice offer is dropped when a card is attached. | 97ab3b6d |
| CL-26 | Found LIVE (tension): "ok another one" matched no practice pattern and got a stored explanation with no question. | A whole-message pattern now reads "another one", "next one" and "give me another one". | e16a9ef9 |

## Recorded, not fixed (owner decision or out of scope)

- **CL-5 — re-asking a revealed item; CL-14 — mastery reached from 2-option items only.**
  Mastery-evidence policy (RC-E). This is a G1/G2 owner gate.
- **CL-6 — liveness release dropped a pending item after 2 help turns.** Release policy;
  owner decision.
- **CL-7 — factual slips in feedback.** Examples: "same net force" (P1); a Faraday formula
  without N (P2); a wrong worked answer after a resume (P4). The Physics Verifier is deferred.
- **CL-11 — LaTeX / `\ce` rendered raw.** Two sessions (S2).
- **CL-16 — a grade attributed one turn late.** Fixed in 5ba7e62a (see table).
- **Other observations:**
  - Language stays too hard after an explicit "simple words" request.
  - Two questions in one turn.
  - Daniell figure label overlap.
  - Header lags the resumed lesson on a same-tab resume (P4).
  - ChunkLoadError after a deploy (environment).
  - Prisma P1008 timeouts.
  - The curated pendulum remediation card states that amplitude has no effect (content).
  - Found in the re-test:
    - mole concept: "a mole of sand would cover the Earth many times over" (wrong order of
      magnitude);
    - "12 g of C-12 is exactly one mole" (the pre-2019 SI definition);
    - "find the mass by dividing by the molar mass" (should be multiplying);
    - the answer is printed above the item that asks it (rocket item, atomic vs molar mass);
    - an item was re-served after being answered;
    - "Mastered" showed an id until CL-19.

## Verification (production, real browser unless stated)

- **CI:** validate.yml passed on fda2f132 (run 36925371254). The Vercel production deploys
  dpl_C9bjEWHYCJDMj1qrPzSncjBYqyQM (fda2f132) and dpl_D6kcwZjsnKnYD6Sb9Uz8ENgsikan (246bae14)
  were READY.

### CL-8 — figure colours (Newton figure, phone)

- **Before:** "the blue line is the velocity-time graph" (false).
- **After:** the tutor said no blue line is drawn at t = 0, which is true. It described the grey
  track and the red F arrow correctly.
- **Residual:** "the green point marks the block". This was fixed in CL-8b, which is not yet
  re-verified live.
- **Newton's Third Law figure:** the blue "force on B by A" and red "force on A by B" match the
  generator.

### CL-10 — pendulum controls (phone, same beginner account as P3)

L, Swing angle and m (kg) are all rendered. P3 showed only L and Swing angle.

### CL-4 / R1 — new-tab resume

- **Setup:** the phone tab was live on Simple Pendulum. A new desktop tab opened
  /learn?subject=physics.
- **Result:** /api/sessions returned 201 (a new session). Header and chat were both Simple
  Pendulum.

### CL-3 — Close records a mastered lesson

| Subject | Lesson | Time | completedLessons after Close | Selection |
| --- | --- | --- | --- | --- |
| Physics | Newton's Third Law, mastered (5 authored quizzes) | 8 min | `[146, 20]` (lesson 20 added) | unchanged |
| Chemistry | Mole Concept, mastered | 7 min | `[6]` (was `[]`) | unchanged |

### CL-17 — skip never demotes mastery

- Leaving Simple Pendulum (MASTERED) on 246bae14 kept it MASTERED. The skip PATCH ran: updatedAt
  21:25:00.
- **Damage before the fix, not repaired:** at 21:17, Newton's Second Law went MASTERED → SKIPPED
  (masteryPct 100). Repairing it needs a production write, which is an owner decision.

### RC-C — lesson-one spiral close (`scripts/qa/spiralCloseLive.ts`, disposable accounts, deleted)

- **What ran:** "quiz me" after a graded miss served an authored quiz. A correct answer moved the
  ladder to CHECK.
- **What it could not show:** the production episode read straight after the miss was
  `{phase: CORE, visibleFailures: 0}`. One wrong TAP did not spend the affect budget live, so this
  run never reached a spiral close.
- **Status:** the fix is verified by its harness state-walk only. The live trigger observed in
  production (nine refusals) needs the typed-answer path. That is still to be re-driven.

### Re-test on unused concepts (real account, after the fixes)

| Lesson | Device | Time to mastery | Quizzes | Notes |
| --- | --- | --- | --- | --- |
| phys.mech.newtons-third-law | desktop | 8 min | 5 authored, all right | Colours described correctly. |
| chem.found.mole-concept | phone | 7 min | — | Found CL-18/20/21/22. |
| chem.found.stoichiometry | phone | not finished | — | Found CL-1b and CL-24. |
| chem.found.concentration | phone | 7 min | — | Found CL-16. Close recorded: chemistry `[6, 8]`. |
| phys.mech.tension | desktop | 13 min | 7 | CL-16 verified live: three graded taps in a row, each answered about its own question. The wrong answer (17.2 N) was corrected with T − mg = ma. Found CL-26. Close recorded `[…, 23]`. |
| phys.mech.friction | desktop | 16 min | 6 authored | Found CL-23. The deliberate miss (40 N vs 20 N static friction) was corrected with its reason and the misconception named. |

CL-23 was verified live on 5c8d576e. The same "surface area" phrase in the Normal Force lesson
served the physics force-diagram card.

After each Close the lesson landed in completedLessons. Physics now reads `[146, 20, 22]` and
chemistry `[6]`.

## Owner actions needed

1. **Correct the production H₂/O₂ probe row.** The session's write was refused by the permission
   layer.
   - Asset: `a68e70ae-8012-494a-bbf9-73a9e11b8ddb`.
   - Change: set `choices[0].text` to the corrected seed text in `chemistrySeedAssets.ts`.
   - Old value, for reversal: `2g of H₂ contains more — that's 1 mol (6.022×10²³ molecules) vs.
     32g O₂ which is also 1 mol; they're EQUAL`.
   - The production row also differs from the seed on the third choice's misconceptionId (MC3 vs
     MC1). That is RC-D drift.
2. **Decide whether to restore** `topic_progress` `phys.mech.newtons-second-law` for user
   `cmuoh41hs0005jm04eiscsi00` from SKIPPED to MASTERED. CL-17 destroyed it; the evidence
   events still show the mastery.
3. **Policy decisions** on the "Recorded, not fixed" list above (RC-E mastery evidence and others).

## Cycle 3 — historical evidence register (2026-10-02)

Sources searched for each recurring-looking problem, in this order:
1. docs/history/*.md
2. `git log --grep` and `git log -S`, with the commit bodies and diffs read
3. src/tests regression files
4. Vercel and CI records

Where nothing was found, the register says **HISTORICAL STATUS = UNKNOWN**. No earlier fix is
claimed to have worked or failed without evidence. Note that several `git log -S` lookups resolve
to b7a9c716 (2026-09-28). That commit carries most of the tree, so it is only a lower bound for
when a mechanism appeared.

Fix class:
- **A** — a new mechanism.
- **B** — a re-implementation or extension of a known fix.
- **C** — a symptom-level patch whose durability is uncertain.

### R1. Stub reply "Let me check your thinking with this." (CL-1, CL-1b)

- **Previous fix:** f0c149ef (2026-09-30) added `repairStubReply`. It covered the confirm-back
  and repeat-guard stubs only.
  - Production-verified then: UNKNOWN.
- **Regression tests:**
  - `confirmBackRepair*` tests.
  - `gateContractStubRepair.test.ts` (this cycle).
- **This cycle:**
  - 9e16ff7f extended the repair to the gate-contract cut (class B).
  - That extension regressed live on "quiz me": an invented "thermite problem I gave earlier" plus
    a second question.
  - de205b61 fixed it (class A: never on a practice request, and a repair that asks a question
    beside a card is discarded). Verified live 2026-10-02 (concentration lesson).
- **Mechanism remaining:** the gate-contract cut still produces stubs on other turns. They are
  repaired, but each repair depends on the model obeying the appendix.

### R2. Feedback attributed to the previous question (CL-16)

- **Previous occurrences:** the 2026-09-30 baseline only. Nothing found in docs/history or git.
  HISTORICAL STATUS = UNKNOWN before that.
- **Fix:** 5ba7e62a restates the graded question as the prompt's last line.
  - Class C: prompt-only, so durability is uncertain.
  - The verdict block already named the right question earlier in the prompt, and the model still
    drifted. So this is advisory, not enforced.
- **Live:** V8 (tension) had 3 graded taps, each answered about its own question.
  - One session is not conclusive.
  - No post-generation check exists yet.

### R3. A practice request answered with no question (CL-24, CL-26; also CL-15 and RC-C)

- **Previous fixes:**
  - b7a9c716 or earlier: "next question" / "check me" patterns.
  - `practiceRequestKeepsHeldQuiz.test.ts` and `firstLessonPracticeRequest.test.ts` (2026-09-28).
  - Phase 7H/7M (wantsPractice).
  - Production-verified then: UNKNOWN.
- **This cycle — three distinct mechanisms:**
  - **CL-15:** an excursion close. Class A.
  - **CL-24:** memory serve on a practice turn whose probe the surplus rule declined. Class A,
    92c3e8a8.
  - **CL-26:** the phrase "ok another one". Class C, e16a9ef9; verified live 2026-10-02.
- **Mechanism remaining:** practice intent is a phrase list. It has needed extension at least
  three times (b7a9c716, Phase 7M-A, e16a9ef9) and will need it again.

### R4. An answered item re-served

- **Previous fixes:**
  - D1 ledger fix (2026-08-26, `defect-investigations-i-series.md`).
  - 3149453b (2026-09-13): pendingMcq rederiver.
- **Current mechanism, from the live ledger** (session cmuq1ls9c…, read-only):
  - the first-answered direction item sits in `mcqReasked`;
  - correct GUIDE-phase answers are listed in `mcqMissed`.
- **Cause:** `recordMcqOutcome(gradedWithoutCredit)` — a correct answer in a phase that banks no
  credit is re-askable once. This was an owner decision, "option (c)", on 2026-09-27.
- **Verdict:** not a defect, and not fixed. Any change is an RC-E owner decision.
- **Production size of this for the owner** (read-only, `evidence_events`, last 7 days):
  - 100 of 1,043 concept-sessions with authored PROBE_OUTCOMEs (9.6%) graded the same authored
    asset more than once.
  - The average was 3.73 distinct probes per concept-session.
  - V9 (States of Matter, 2026-10-02): all 3 completing credits were re-asks.

### R5. A completed lesson treated as unfinished (CL-22)

- **Previous fixes:**
  - 51a4cae8 (2026-08-22): "did I pass?" is routed TO the model when the learner also signals
    confusion.
  - 8b66d2a8 (2026-09-07): the completion card is re-served.
  - Phase 7M-A: a practice request after completion.
- **This cycle:**
  - e4727f09: the opening block is skipped on a completed lesson. Class A.
  - 669db565 and 9b33ba0b: "is this lesson done?" counts as a status question, not new intent.
    Class C: phrase pattern.
- **Check against 51a4cae8:** "wait did i pass? i dont think i understand it" still routes to the
  model. Its tests still pass, so the two rules do not conflict.
- **Live:** verified 2026-10-01 22:36.

### R6. Figure colours (CL-8, CL-8b)

- **Previous:** `figureFidelity.ts` (by b7a9c716). It checks only that a colour word names a
  colour the scene HAS. It could not catch blue/green swapped between parts.
- **This cycle:** fdb93a5c and d54b49ef give the model the colour-to-part mapping. Class A.
- **Live:** verified 2026-10-01 (Newton, Newton's Third Law, Tension).

### R7. Simulation spoilers (CL-9)

- **Previous fixes:** 7c88b52e, 47ce04e0 (2026-09-29), b1033a88 (2026-09-30).
- **This cycle:** 97dc1dd4.
  - The lesson-init channel and the quiz-tap exemption are new channels, class A.
  - Hyphen normalisation is class C.
- **Live:** the opening on the pendulum is not re-verified after this fix (UNKNOWN).

### R8. Answer-head giveaways (CL-13, CL-18) and option-length cues (CL-14)

- **Previous fixes:**
  - e3456161 (2026-09-30): all-or-nothing heads.
  - 76916f3b (2026-09-30): physics per-option heads.
- **This cycle:**
  - c088361e: head-collision guard, class A.
  - 6d67157f: chemistry scope, class B (extension).
- **Mechanism remaining:** items whose working is not after a spaced dash are not split. These
  are parentheses ("0.1 mol (M = mol/L …)") and full-paragraph options (the puddle item,
  2026-10-02). Content or policy; recorded only.

### R9. Confirm-back on a graded tap (CL-20)

- **Previous:** b7a9c716 (2026-09-28), "strip 'you selected … is that right?'" — a symptom strip.
- **This cycle:** 964ae368 stops the OBSERVATION REPAIR block on graded turns. That block is the
  prompt source of the mirror. Class A.
- **Live:** not re-observed since; UNKNOWN.

### R10. Raw LaTeX / `\cdotp` / `\ce` (CL-11)

- **Previous:** Physics Verifier batches (ec42ca39 and others) touch LaTeX detection. They do not
  touch rendering.
- **This cycle:** recorded, not fixed. HISTORICAL STATUS of a rendering fix: UNKNOWN.
