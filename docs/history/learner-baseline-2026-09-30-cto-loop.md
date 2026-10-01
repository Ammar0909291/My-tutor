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

## Recorded, not fixed (owner decision or out of scope)

- **CL-5 — re-asking a revealed item; CL-14 — mastery reached from 2-option items only.**
  Mastery-evidence policy (RC-E). This is a G1/G2 owner gate.
- **CL-6 — liveness release dropped a pending item after 2 help turns.** Release policy;
  owner decision.
- **CL-7 — factual slips in feedback.** Examples: "same net force" (P1); a Faraday formula
  without N (P2); a wrong worked answer after a resume (P4). The Physics Verifier is deferred.
- **CL-11 — LaTeX / `\ce` rendered raw.** Two sessions (S2).
- **CL-16 — a grade attributed one turn late.** Attribution task.
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
