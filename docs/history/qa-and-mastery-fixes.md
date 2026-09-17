# QA Root-Cause Fixes & Physics Teachability Program (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Root-cause QA of the 3 reference lessons (2026-08-28, real-account, deployed)
- Task: fix the shared tutoring engine behind the three human-scored sessions (English Word
  Recognition 6/10, Physics Inelastic Collisions 3/10, Chemistry Resonance Structures 7/10) —
  root causes, not symptoms. A scripted-learner acceptance harness was built
  (`scripts/qa/referenceLessons.ts`) that drives the REAL deployed app through each session's
  exact acceptance scenarios (wrong answer, "got it" then wrong, repeated "I don't understand",
  "explain differently", explicit diagram request, repeated visual exposure) and turns each
  criterion into a machine-checkable assertion over `mastery`/`mcq`/`visualSpec`/`provider`, not
  prose. **The real account used was `suaibamr@gmail.com` (owner-supplied for this task); the QA
  harness has no `FORBIDDEN_ACCOUNTS` guard, so it used it. `scripts/math/certify.ts` still refuses
  that account by construction — unchanged.**
- Four root causes found and fixed in the shared engine, each enforced in code (a learner-facing
  rule stated only in the prompt has been measured ignored) with pinned tests:
  1. **Abandonment on "I don't understand"** (`conceptBudget.ts`, physics). Three confusion
     signals drove `consecutiveFailures` to the cap; `evaluateConceptBudget` returned
     `exhausted:failures`, the concept was folded needsReview, the lesson finalised (LESSON_COMPLETE
     with check=0/practice=0), and every later turn — including one with correct reasoning — served
     "on pause — you haven't mastered it." The `attempts`/`failures` early exits now do NOT fire
     while the learner has zero correct assessed answers and turns remain; the `turns` backstop (12)
     still guarantees termination. Live-verified: the lesson stayed alive across all turns, gave a
     genuinely different remediation, met the diagram request, and acknowledged the eventual correct
     reasoning.
  2. **Same visual attached every turn** (`resolveVisual.ts`, english). The served-figure path
     (APPROVED/GENERATED `serve()`) hardcoded `session.turns:0`; the route withholds a HELD figure
     by reading `turns===0`, so a served figure re-introduced itself every turn. `serve()` now
     advances the count when the active session already holds the same figure identity. Live-verified:
     the word-recognition figure now appears once (T1), holds silently, and re-shows only on the
     explicit "show me a diagram" request. English went 10 findings → **0**.
  3. **Content-free filler in front of a quiz** (`gateAssessment.ts`, physics+english). When the
     model's whole turn was an ungradeable question stripped alongside an authored MCQ, the fallback
     was "Let's stay with this idea for a moment." with a quiz beside it. When a tappable MCQ
     follows, the fallback now hands off to it ("Let me check your thinking with this.").
  4. **Phantom figure references** (`figureReference.ts`, chemistry). resonance has no faithful
     figure (retired binding) and generation can't produce one, so "draw it" carried no figure — yet
     the tutor said "The diagram shows nitrogen in the center…" and "Here you see a central nitrogen
     atom…". Added two shapes to `stripUnbackedFigureReferences`: `FIGURE_SUBJECT_CLAIM_RE` (figure
     noun in subject position + presentation verb) and `VISIBILITY_DEIXIS_RE` ("here you see…"/"as
     you can see…"), both no-figure-only, both measured safe (graph/plot excluded; idioms/general
     statements preserved; these phrases occur once in all of `src/`). Also strengthened the
     `repeats-previous-turn` remediation repair to demand a DIFFERENT everyday anchor ("change the
     strategy, not the wording").
- Full suite 486 files / 10,482 passed / 9 skipped; `npx tsc --noEmit` clean; `npm run build` clean.
  Commits `5448ad9` (batch 1) + `2847db0` (batch 2) on `main`, both deployed READY to
  `my-tutor-flame.vercel.app`.
- **Honest remaining gaps (reported, not faked):** (a) Chemistry cannot show an ACTUAL resonance
  diagram in production — the concept's figure binding is retired and generation is owner-env-gated;
  a real figure needs a human-reviewed promoted VISUAL asset or generation enablement (owner
  decision). The engine now declines honestly instead of narrating a phantom. (b) Physics can still
  emit the bare "Let's stay with this idea" hold when a learner restates a misconception and the
  concept has no gradeable probe at that band — a documented probe-coverage/misconception-detection
  content gap, not an engine bug. (c) A single combined 3-lesson live re-run of batch 2 was blocked
  by severe production model latency at session end; batch 1 was live-verified while the provider was
  healthy, and batch 2's deterministic strips were verified against the exact captured production
  strings plus the test suite (identical behaviour live or offline).


## Follow-up — "seed the probes so T8 can grade" → the real blocker was the affect budget (2026-08-29)
- Task framed as "seed the inelastic-collisions probes so T8 can grade." Investigation showed the
  premise was wrong: `phys.mech.collisions-inelastic` already has 4 ACTIVE gradeable MCQ probes at
  the correct band (`:high`), and the ADULT-vs-HIGH band gap is already handled by the matcher
  (`isHighAdultCompatible` → +15 → score 65 ≥ 65 threshold). Seeding more would have changed
  nothing.
- **Actual root cause, confirmed from production `[gate-eligibility]` logs (not inferred):** every
  GUIDE-phase 'ask' turn read `eligible:false, blockedBy:["arbitrationAllowsProbe","notClosingTurn"]`
  with all six other terms TRUE. The session EPISODE was in CLOSING, and it was CLOSING solely
  because `route.ts`'s recovery block synthesizes `{correctness:false}` on every recovery turn, so
  two "I don't understand" utterances spent the affect budget (2) → CORE→CLOSING. CLOSING denies
  AUTHORED_PROBE through both `turnArbitration`'s CLOSE suppression and `closingTurnWithholdsQuestion`,
  so no keyed probe ever attached, the model improvised UNKEYED prose comprehension questions, and
  their answers (T8) could not be graded. `sessionLifecycle.ts`'s own Phase E note had already
  flagged this as a deferred "separate product decision."
- **Fix (`c98ea7b`, the session-episode half of the earlier concept-budget fix):** the recovery
  block already tags its synthetic signal `confusion: true`; `applySignalToEpisode` now treats a
  distress signal as NOT a graded failure — it still advances OPENING→CORE (never freezes the
  episode) but does not spend the affect budget, so confusion alone can no longer force CLOSING. A
  real GRADED wrong answer (the `teachingSignal` path, `correctness:false` with no confusion flag)
  spends it exactly as before, so a genuine failure spiral still winds the session down, an explicit
  "I'm done" (`forceClosing`) still closes absolutely, and lesson one's budget of 1 is unchanged.
  Guarded by 5 new cases in `affectBudgetSpiral.test.ts`.
- **Live-verified on the deployed app (real account, `session cmtdp7zp4…`):** physics is now
  **0 findings** (was the T8 content-free hold). T8 "the final speed is the sum of the two speeds"
  now attaches an AUTHORED keyed probe (`assetId b4b3ab62-…`, `correctIndex 0`, lead-in "Let me
  check your thinking with this.") — gradeable — instead of "Let's stay with this idea for a moment."
  Structured probes now attach on T8/T9/T10/T11 (previously only T1), the lesson reached CHECK phase
  (previously stuck at GUIDE), and there was no abandonment and no degradation. The fix unblocked the
  entire assessment→mastery path for a confused-but-engaged learner, not just the one turn.
- Full suite 486 files / 10,487 passed / 9 skipped; `npx tsc --noEmit` clean; `npm run build` clean.


## Physics Teachability Program — 60-concept certification (2026-08-30)
- **Mission:** make physics (238 KG concepts) genuinely teachable end to end for a struggling,
  visually-dependent learner — not a coverage percentage, but: open any lesson, ask for a diagram,
  get one, be assessed with a real gradeable question, reach recorded mastery in a normal session.
  Full record, including every falsified hypothesis, in
  `docs/architecture/PHYSICS_TEACHABILITY_STATUS.md`. Source of truth for the subject is
  `scripts/physics/state.ts` (commit `8db692a`) — do not trust a number in this file over it.
- **Three of the program's own founding premises were wrong and were corrected before acting:**
  (1) the asset contract was ranked gap #1 but is **already closed** — all 262 (concept, band) pairs
  meet `assetContract.ts` v1, nothing to author or promote; (2) visual **generation is LIVE in
  production**, not pending — the note elsewhere in this file that the ADR 14 catalogue is empty is
  stale, physics holds ACTIVE serving content on 238/238 concepts; (3) the "1 of 30 reached mastery"
  headline that motivated the program was an arithmetic artefact of the QA harness's own 9-turn
  budget, not a product failure.
- **Certification run:** `strugglingLearnerHarness.ts physics`, all six difficulty tiers,
  `--count=60 --seed=2026`, deployed app, real QA account. 60/60 completed, 0 lesson drift,
  2 excluded as UNMEASURED (provider degraded) → **58 measured**. **46/58 (79%) showed a real
  visual**; **47/58 (81%) reached verified mastery** (`correctAtCheck>=1 && correctAtPractice>=2`).
  Mastery does not decay with difficulty — expert is the strongest tier at 13/13.
- **Four defects fixed and pushed, two in the instrument and two in the product:** the harness could
  not reach mastery at any quality (9-turn budget, `c846703`) and leaked sessions between concepts
  (`ec7d595`); a manner adverb was parsed as a topic, so "explain it slowly" spent eleven turns
  teaching the English word "slowly" (`86a5346`); and the concept-budget extension could not serve
  the learner it was written for (`65d1f28`). Verified mastery moved 42% → 73% on a fixed 12-concept
  sample across three comparable runs, before the 60-concept run measured 81%.
- **Fifth defect, found from the 60-concept transcripts and fixed here:** the authored explanation
  was reproduced **word-for-word by a later model turn in 37 of 57 sessions (65%)**, 56 of 584 model
  turns — landing worst as the reply to "can you show the picture again" and as the reply to a
  CORRECT answer, which reads as not having been heard. Cause: `buildTeachingMemoryBlock` gives every
  other already-used artefact an explicit "do NOT repeat" (analogies, demonstrations, visuals,
  probes, strategies) but never mentioned `explanationsServed`, which it had recorded all along. The
  missing line was added at the same authority as its five siblings; 4 regression cases in
  `teachingMemory.test.ts`. **Not yet re-measured against production** — the defect and its cause are
  measured, the improvement is not yet claimed.
- **`--resume` added to the harness.** A 60-concept run takes ~7 hours; the container restarted at
  concept 34 with all 34 transcripts still on disk and no way to use them. `--resume` skips concepts
  that recorded `ok:true` and still hold a transcript, and retries any that failed.
- **Honest gaps — NOT reported as met.** (a) **Quality averages ~6.0/10 against a >=7.5 bar** across
  12 transcripts read (4 random, 8 chosen because they failed, so the raw 5.8 mean is pessimistic).
  The floor criterion — nothing below 4/10 — IS met. (b) **5 sessions stall at GUIDE** with nothing
  graded. The symptom is localized (keyed probes attach on 9% of turns there vs 35% elsewhere) but
  the cause is NOT isolated; three plausible explanations were tested and falsified — the probe pool
  is NOT dry (`phys.opt.mirrors` holds 7 ACTIVE probes at the served band and used 1), QL-2 is
  already scoped so it cannot block permanently, and GUIDE attaches probes routinely (46%). That is
  the named next gap.
- Full suite green, `tsc --noEmit` clean.

- **Validation of the repetition fix (same seed, first 20 concepts, after `5c1d7c8` deployed):**
  sessions containing a verbatim repeat **65% → 31%** (Fisher exact two-tailed p = 0.084 — suggestive,
  not conclusive at n=17 vs n=16); per-turn rate barely moved (8.1% → 7.1%), so affected lessons
  repeat about as badly, there are just fewer of them. Verified mastery unchanged, 82% → 81%, which
  is the expected result for a quality fix. **The GUIDE stall is NOT fixed.** All three previously
  stalled concepts in this subset now reach TRANSFER, which looks like a cure and is not one: across
  the 15 concepts common to both runs, 3 went FAIL→PASS and 2 went PASS→FAIL, net +1 — the same
  per-concept churn already recorded between qa3/qa4/qa5 with no code change between them.
- **GUIDE stall narrowed from production `[gate-eligibility]` logs (not inferred).** The gate is NOT
  withholding probes at GUIDE: the only blocker ever recorded there is `phaseAllowsProbe:false`, and
  only on `show`/`teach` moves — every GUIDE turn whose move was `ask` was eligible. The move is not
  `ask`, and the log names what chose otherwise: CUE rule **`D4b-ANSWER-STUDENT-FIRST`** ("never drill
  past a question"). Good rule, no ceiling. Measured across the 58-session corpus: a help-request turn
  gets a keyed probe **21%** of the time vs **43%** otherwise, and the stalled sessions carry a median
  help-request fraction of 0.50 vs 0.31 for those that mastered. Reported as PARTIAL, not solved — the
  stalled sessions are also suppressed on their non-help turns (19% vs 43%), so D4b is a contributing
  mechanism, not the whole cause. **No change made to the CUE decision layer**: adding a ceiling to
  D4b is the plausible next step but would be hot-path surgery justified by a partial explanation.
- **Sixth defect fixed — a restart over an ABANDONED lesson attempt did not restart.** This is what
  the 60-run's unexplained 4-turn session was. `phys.mech.normal-force` closed on turn THREE having
  taught and graded nothing, its completion payload carrying `durationSeconds: 928967` — 10.7 days.
  `lesson-init` opened an attempt for `latest === null` or `COMPLETED && isReteach` and fell through
  to null for **IN_PROGRESS**, so `attemptIsFreshStart` stayed false and the transient state was never
  cleared: the fresh lesson inherited the abandoned attempt's ladder phase (turn one arrived at
  PRACTICE) and its spent concept budget. Right for `resume` — the file's own comment calls it "the
  ONE mode that never means start again" — and silently wrong for `restart`, whose lesson-opening
  prompt says "teach it from the beginning". An abandoned attempt is the COMMON case: a learner who
  walks away mid-lesson leaves an IN_PROGRESS row nothing ever completes, so a real learner returning
  after a break got a lesson that closed on its third turn. Rule extracted to a pure
  `lessonAttemptStartDecision(latest, mode)` with the missing case, plus `resetStartedAt` so the
  reused row's clock moves to now. `resume`/`next` untouched and pinned by test. **Six existing
  source-text guards** asserted the old inlined literals; each was moved to assert the same invariant
  against the pure function (behaviour, not a regex over route source), and the one guard whose
  invariant this deliberately narrows was rewritten with the reason rather than deleted.
- **Two quality measurements that did NOT justify a change**, recorded because measuring and then not
  acting is the point: ASCII-art fallback figures occur in **1 of 58 sessions (2%)** — a one-off; and
  "38% of correct answers move no mastery counter" is a real number with a wrong reading — 76 of
  those 94 are the ladder ADVANCING (`GUIDE>CHECK`, `DEMONSTRATE>GUIDE`), which is the documented
  design from `65d1f28`. The genuine residue is 18/245 (7%), of which **3 moved the learner
  backwards** on a correct answer. Too few to act on; named, not fixed.
- Full suite 493 files / 10,748 passed / 9 skipped; `tsc --noEmit` clean.
- **Seventh defect — the GUIDE stall's ROOT CAUSE, found and fixed.** Previously reported PARTIAL; it
  is now a located deadlock. Ruling out the innocent explanation first: the five stalled sessions'
  own phase mix predicted 23.6 keyed probes and they got 7, so phase mix does not explain it. The
  discriminator is a LATCH — splitting every session at its first wrong answer, the other 53 sessions
  go 17% → **55%** attachment (a wrong answer normally STARTS the assessment loop) while the stalled
  five go 14% → **0%**, zero across 21 turns. The switch is two reasonable behaviours composing:
  `route.ts` suppresses the mastery gate while a probe is pending and ungraded
  (`unansweredProbeOnScreen`) on the stated assumption that *"the widget keeps rendering it from
  `pendingMcq`"* — and `LessonScreen.tsx` does not: it sets `activeMcq` from `data.mcq` with a bare
  `else setActiveMcq(null)`, while the response carried only a probe attached THIS turn. So the server
  withholds every new probe believing one is displayed, the learner sees none, cannot answer what they
  cannot see, and never produces the grade that would release the gate. In `phys.opt.mirrors` the tutor
  asks "What led you to pick option B?" on a turn whose payload carries no mcq. Fixed with a shared
  `mcqToServe()` used by BOTH the response and the persisted snapshot — each half alone recreates one
  of the two defects, and an existing guard caught exactly that while the fix was being written. A
  probe graded this turn is deliberately not carried forward. **Not yet re-measured against
  production**; a run that would have straddled two builds was stopped and discarded rather than
  reported.
- Full suite 494 files / 10,754 passed / 9 skipped; `tsc --noEmit` clean.


## Explanation DRAFT queue — CTO decision, and the triage that followed (2026-08-30)
- **The question.** `/admin/knowledge-assets` showed `DRAFT 4755 / ACTIVE 1592` with an Approve button
  per row, and the owner asked what they were and whether they had to approve them. Answered from the
  database, not the previews.
- **What they are.** Two different things sharing a table. **ACTIVE 1,592, every one
  `HUMAN_CURATOR`, 683 concepts** — the deliberately authored seed assets, and the only ones ever
  served: `findBestExplanation` returns ACTIVE above a confidence threshold and nothing else.
  **DRAFT 4,762, every one `AI_AUTHORED`, 426 concepts** — `captureGeneratedExplanation` writes one
  after EVERY successful LLM turn. Drafts are inert by construction; the module's own header calls it
  "a safe no-op until curated". **No approval was ever required and nothing degrades while they sit.**
- **Why the queue could not work.** A DRAFT is whatever the tutor said on some turn, so most are
  turn-scoped by construction. Classified against production: **3,269 of 4,762 (69%) not reusable** —
  is-a-question 2,368, too-short 1,766, addresses-this-turn 364, praise-reply 249, ascii-figure 130,
  learner-name 61, session-discourse 9. Reading the CLEANEST slice (>=400 chars, no praise, no fence,
  not a question) showed roughly **1 in 6** genuinely reusable. A queue of 4,762 at that yield,
  growing ~600/day under test load, is not a workflow anyone can finish.
- **My own testing was most of the recent growth**, stated plainly: 1,817 of the 1,872 drafts captured
  in the preceding three days were physics, from this session's struggling-learner runs.
- **A false alarm I checked before raising.** 61 drafts contain the learner's name — the exact leak
  `validation.ts` documents as a measured incident. Dates say the gate WORKS: latest 2026-08-12, none
  in the last three days, **none ACTIVE**, and the 2 from the original incident already DEPRECATED.
  Historical residue, not a live leak.
- **DECISION (three parts).** (1) The review queue is abandoned as a human workflow — it will never be
  worked through and the value it unlocks (replacing an LLM call with stored text on some turns) does
  not justify the cost. (2) The backlog is auto-triaged, **never deleted**: the 3,269 not-reusable rows
  moved to DEPRECATED, a state the schema already has, reversible in one statement keyed on
  `deprecationReason LIKE 'triage 2026-08-30%'`. **Applied — DRAFT 4,762 → 1,494, ACTIVE untouched at
  1,592.** (3) Capture becomes selective and stops recording QA/harness traffic — the inflow half,
  which triage cannot reach. **NOT YET DONE:** it is server-side and the 60-concept certification run
  was in flight; it is the first thing after that lands.
- `scripts/assets/triageExplanationDrafts.ts` — the classifier, report-only by default, `--apply` to
  write, with each rule stating the failure mode it protects against. **There is no delete path in the
  file on purpose.**


## Physics + Chemistry ceiling broken — 79% -> 95% (2026-08-30/31, two sessions)

- **Scope narrowed by the owner 2026-08-31: chemistry and physics ONLY.** English and
  mathematics are recorded findings below, deliberately not worked.
- **Read `docs/architecture/PHYSICS_MASTERY_CEILING_ROOT_CAUSE.md` and
  `PHYSICS_REMEASUREMENT_2026-08-31.md` before touching this.** Run
  `npx tsx scripts/qa/rubricScore.ts <runDir> [<baselineDir>]` rather than trusting a number here.

### The root cause, and why it took so long to see
Mastery needs THREE graded correct answers (`correctAtCheck>=1` + `correctAtPractice>=2`) and a
spent probe is never re-asked. The asset contract supplied exactly THREE. **The required success
rate was therefore 1.00** — one wrong answer made mastery unreachable for anyone. Measured: 53 of
60 sessions served exactly 3 keyed probes; **45 of 46 mastered sessions answered every probe
correctly**; the 8 failures each got exactly one wrong. The 79% figure was close to measuring how
often a struggling learner goes three for three.

### Result of the re-measurement (same 60 concepts, same seed 2026)
**Verified mastery 44/56 -> 53/56 (79% -> 95%)**, against a prediction of ~91% recorded before the
run. Ten fixed, one regressed (`phys.em.self-inductance`, within the 2-3/run churn this programme
has measured with no code change). Six changes were in flight at once, so the mastery number
cannot attribute between them.

### Shipped this period
- **Probe depth 3 -> 5** (Session B): physics 261/261, chemistry 186/186 pairs. THE critical path.
- **G-2b** (`e5afa52`) — a clarification at GUIDE demoted the learner, and because
  `remediationCount` is cleared by a graded-correct answer, every request was forever "the first":
  GUIDE<->DEMONSTRATE cycled for whole lessons. Reproduced at 12 turns / 6 correct answers /
  check 0. The hold now protects against a DEMOTION rather than being scoped by phase — OBSERVE is
  untouched because `phaseDown` FLOORS at DEMONSTRATE there and would have stranded learners.
- **`answerConfirmation.ts`** (`a4d00c4`) — only 39% of server-graded-correct answers were
  acknowledged. Now enforced from `gradeMcqAnswer`'s verdict (server ground truth, never the
  model's self-report). **Measured live: 39% -> 65%.** Gate is 90%; not met.
- **`dontKnowCeiling.ts`** (`054473a`) — OWNER-REPORTED: four "I don't know"s produced a fifth
  question. Every piece of intended behaviour already existed and fired (detector, counter, and a
  RECOVERY block saying "Stop ALL questions this turn"); the model asked anyway. On the 2nd+
  consecutive don't-know the question is withheld, and when nothing teaching survives the server
  REVEALS the authored answer rather than shipping the content-free hold.
- **`figureReference.ts` embedded locator** (`eabbdc1`) — OWNER-REPORTED: "the histogram in the
  figure" claimed a figure that was not there. Two narrowings were caught by tests, not by reading.
- **`historyCompaction.ts`** (`4763760`) — **DID NOT WORK.** See below.
- **E1** (`86f58ee`) — a keyed probe may attach at DEMONSTRATE, gated on `mayAttachProbeBelowGuide`
  requiring FOUR available (one spent, three must survive). Enforced per concept at the SERVING
  site, so a bare-contract concept is unaffected. NOT yet measured live.
- **`rubricScore.ts`** — scores the seven ENFORCED blueprint criteria. **Its own header records
  that it DISAGREES with hand-scoring** (pressure-fluids 8/10 by hand, 2.9 here) because it
  measures assessment machinery, not teaching. Never quote its mean as quality.

### Enforced criteria, physics, measured
C2 95% · C3 70% · C4 25% · C5 65% · C7 50% · C8 95% · C9 96%. Chemistry C3 is 27%.

### Open, with the honest state
- **C7 — my fix failed and I said so.** An interim split suggested it worked (50% vs 14%, p=0.11);
  at full sample that vanished (50% vs 46%, **p=0.80**). Instrumentation established the retrieval
  cache is enriched among repeats (8 of 19 repeat turns vs a 25% base rate) but CANNOT be the
  mechanism — 11 of 19 repeats occur with the explanation absent from the prompt AND compaction
  active. A third channel exists and is unidentified.
- **C3 — Session B found there is NO WRITER for VISUAL assets** (`919ef2ef`): the seed script and
  bootstrap handle EXPLANATION and PROBE only. Authoring visual content today would produce
  content nothing can write — the same failure mode as mathematics's 31 unimported modules. The
  126 dark-but-drawable concepts need a warm pass (`sceneWarming.ts` + `warm-cohort.ts` exist,
  tested, **never run**); the 42 critic-declined need a writer first.
- **English and mathematics, recorded not worked**: english 214 of 216 pairs hold exactly TWO
  gradeable probes while the subject is LIVE (626 ACTIVE explanations) — no English lesson can
  close. Mathematics: 0 of 47 pairs at contract, and **31 mathematics asset modules on disk that
  the bootstrap imports NONE of** (corpus 846 probes, production ~100).
- **Measured and deliberately NOT fixed**: ASCII-art fallback (18% physics / 64% chemistry
  sessions — mastery runs 60% vs 83% in physics but 86% vs 50% in chemistry, opposite directions,
  no evidence stripping helps); the content-free hold (9 of 67 sessions, always the whole turn — a
  content-generation problem, not a text-repair one).


