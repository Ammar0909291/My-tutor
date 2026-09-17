# Defect Investigations — I-series, C5/C7, Liveness Programme (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## E1 verification run — PAUSED at 5/60 (2026-08-31)

Session A handed over the whole physics/chemistry programme and its E1 run
(keyed probes attachable at DEMONSTRATE, `86f58ee`) is still UNMEASURED. I
restarted it, reached 5/60, and **paused it for the egress incident** — it was
the largest discretionary production load. Transcripts are preserved;
`--resume` continues at concept 6. **Do not restart it until the new egress rate
is confirmed under quota.**

Two things established about that run before it paused, both worth keeping:
- **E1 has no internal control group.** Its gate needs FOUR available probes and
  all 261 physics pairs are at >= 4, so it fires everywhere. The comparison must
  be against the previous sweep, whose transcripts died with Session A's
  container. The result can show C4 moved; it cannot isolate E1.
- **C5's residue is probably not detector width.** Session A proposed widening
  the confirmation detector. The two copies (`CONFIRMS_CORRECT` enforcing,
  `CONFIRMS` in rubricScore measuring) are character-identical, so that is not
  the gap. Prediction recorded in `docs/architecture/C5_CONFIRMATION_RESIDUE.md`:
  the unconfirmed turns are ones the SERVER never graded, which is the
  `pendingMcq` seam, not a regex. Widening would hide it. Pinned by
  `confirmationDetectorParity.test.ts`.


## I1 — non-silent MCQ re-offer for an ungradeable typed answer (2026-09-02, commit `00e53ac1`)
- **The investigation first, because the reported symptom was mostly an artifact.** A prior
  real-account study logged "phys.particle.gauge-bosons stuck at OBSERVE after ~5 correct answers,
  identical MCQ re-offered" (the "I1" note). Investigated live on the real account
  (`suaibamr@gmail.com`, my-tutor-flame) driving gauge-bosons (#230) to completion and
  phys.qm.angular-momentum-addition (#190) through OBSERVE→CHECK, plus a full source trace.
  **The progression stall did NOT reproduce as a product defect:** gauge-bosons reaches VERIFIED
  mastery in 8 turns via the normal flow (OBSERVE→DEMONSTRATE→GUIDE→CHECK→PRACTICE→TRANSFER,
  verified=true, check=1, practice=2, LESSON_COMPLETE) when the served keyed MCQs are TAPPED.
  Cleared, each checked not assumed: probe availability (gauge-bosons has 5 authored gradeable
  HIGH-band probes — 3 in `authoredSeedAssets.ts`, 2 in `physicsDepthSeedAssets.ts`; angular-momentum
  comparable), the OBSERVE→CHECK transitions, `pendingMcq`, server-side withholding, and mastery
  authority all functioned. The "stuck at OBSERVE" was substantially a MEASUREMENT ARTIFACT of the
  earlier study driving with free-text answers rather than tapping the option buttons — a real UI
  learner taps.
- **The one genuine, real-learner-reachable residue (the first divergence where valid evidence
  stops contributing):** the chat textarea is NOT disabled while an MCQ is on screen
  (`LessonScreen.tsx` ~L5645, `disabled={isStreaming || !sessionId}`), so a learner — especially a
  weak-English one — can TYPE an answer instead of tapping. When that text does not confidently map
  to an option, `resolveMcqChoice` returns null (DELIBERATELY — a false grade writes permanent false
  evidence, the Phase 7P class), so `gradeMcqAnswer`→`mcqGradeHoisted` stays null, no gate credit
  accrues, and the identical keyed MCQ RE-OFFERS with no sign the attempt was seen. First failing
  owner: the answer-ingestion / re-offer seam — NOT the conversationState ladder, masteryGate, or
  probe content. Reproduced live at gauge-bosons T3→T4 and angular-momentum T2→T3.
- **Option A (the smallest SAFE fix — does NOT touch grading).** Loosening `resolveMcqChoice`
  reintroduces false grades; disabling the textarea while an MCQ is pending breaks the supported
  "ok i think A, but sir explain…" answer-plus-question flow the grader was hardened for. Both
  rejected. Instead: `MCQ_REOFFER_DISAMBIGUATION` (new shared constant in `mcq.ts`, single source of
  truth) is prepended by a guard in `route.ts` — placed immediately before the empty-with-probe
  backstop (same pre-PHASE-0 discipline) — ONLY when a pending keyed probe is being re-offered
  (`mcqToServe` returns the carried-forward pending: served && `mcqHoisted===null` && `mcqGradeHoisted===null`)
  AND the message was a genuine answer attempt: not a bare acknowledgement (`isBareAckHoisted`), not a
  practice request (`turnIntent.wantsPractice`), not a question (`detectLearnerQuestion`). It preserves
  any model teaching text, stands alone if the text was stripped empty, is idempotent, never
  fabricates a probe, and claims nothing about correctness. The answer stays UNGRADED by design.
- **Regression test** `src/tests/mcqReoffer.test.ts` (13 assertions) mirrors the guard against the
  REAL `mcqToServe`/`gradeMcqAnswer`/`readTurnIntent`/`isBareAcknowledgement`/`detectLearnerQuestion`/
  shared constant, plus route-source wiring pins. Covers: genuine attempt → lead-in prepended, model
  text preserved; empty text → lead-in alone; idempotent; bare-ack / practice / question / empty →
  untouched; graded answer (correct OR wrong tap) → probe consumed, no re-offer; fresh attach this
  turn → not a re-offer; no probe → untouched.
- **LIVE-VERIFIED on the deployed app** (real account, gauge-bosons): a persistent driver drove until
  a keyed MCQ attached ("Which gauge boson mediates the strong force?"), then injected an ungradeable
  typed answer with an OFFLINE pre-check proving it maps to no option and is guard-eligible — the
  response prepended "I couldn't tell which option your answer matched — tap the choice you mean from
  the list below." to the model's follow-up, MCQ re-offered. The FIRST live run (~2 min post-push) had
  shown the old silent re-offer ("What do you pick? A, B, C, or D?") because it hit pre-fix
  `768dfe3c` before Vercel finished building — an incidental clean before/after.
- Offline: new test 13/13; 112 route-source test files 1930 passed / 4 skipped; `npx tsc --noEmit`
  clean; `npm run build` clean (middleware 79.7 kB, unchanged). No account/DB mutation; temporary
  verification driver deleted after use.
- **I2 and I3 investigated the same way (2026-09-02) — NEITHER warranted a fix.**
  - **I2 ("identical MCQ re-offered before advancing")** is NOT a distinct defect — it is the same
    seam as I1 and intended behavior. `writePendingQuestion(mcqToServe(mcqHoisted, pendingMcqHoisted,
    mcqGradeHoisted))` carries the SAME probe forward ONLY on a turn that attached nothing new and
    graded nothing (the "seventh defect" fix, so the client can't blank an on-screen probe). Verified
    offline against the real modules: ungraded → re-offers same; graded → cleared to null (no
    re-offer); fresh attach → replaced. The one case Option A would NOT cover — a SPENT probe being
    re-served — is independently guarded: `teachingActionRepository.ts` filters by `excludeProbeStem`,
    wired at `route.ts:4185` to `hasAskedMcq(...)`, so the gate never re-selects an already-asked
    probe ("guarantees a FRESH probe every time"). Live evidence from the I1 run: 5 keyed probes
    across the tapped mastery flow, all DISTINCT. So the only real residue is the ungradeable-typed-
    answer re-offer = I1, already made non-silent by Option A. No code change.
  - **I3 ("premature next-lesson preview prose")** was already FIXED at commit `768dfe3c`
    ("fix(stance): strip a premature next-lesson preview before mastery"), which is in the deployed
    history (main descends from it). `stanceEnforcement.ts`'s `COMPLETION_CLAIM_RE` includes the
    `next we (explore|cover|study|examine|tackle|dive into|move on to|turn to)` family; `enforceStance`
    strips it iff `!masteryVerifiedStrict(state)`. Verified offline with the real `enforceStance`:
    UNEARNED state strips "Next we explore…"/"Wigner" and keeps the praise; EARNED state KEEPS the
    same preview (not a "can never finish" regression). Pinned by `completionClaimInProse.test.ts`
    (QM_PREMATURE_CLOSE block). Deliberately NOT broadened to other phrasings ("up next:", "coming
    up:") — no evidence of them, and broadening risks stripping the legitimate motivational "What's
    coming" recap the fix preserves. No code change.


## I4 — GUIDE-phase stall: NOT a dead-end (intentional + recoverable), one Option-A regression fixed (2026-09-02, commit `3940daa9`)
- **VERDICT: no genuine GUIDE dead-end for a real learner.** Reproduced live on the real account
  (`suaibamr@gmail.com`) on two concepts. The historical "stalled at GUIDE, 0/21 probe attachment"
  was the pre-`mcqToServe` client-blank deadlock (probe attached server-side, client blanked it,
  learner couldn't answer) — already fixed and re-confirmed here.
- **How GUIDE works, traced in source:** at GUIDE the move is `'ask'` iff
  `teachSegmentsSinceQuestion >= 2 || practiceRequested` (`conversationState.ts:1526`), and
  `phaseAllowsProbe` needs `move==='ask'` (`route.ts:4050`). A learner question/help turn (CUE rule
  D4b-ANSWER-STUDENT-FIRST) makes the move `'teach'` (answer the student), suppressing the FRESH
  probe THAT turn — but the pending probe is carried forward by `mcqToServe` (never lost), and the
  alternation counter keeps climbing (a rhetorical `?` on a teach turn does NOT reset it, 7N fix),
  so `'ask'` is always reached again. D4b is therefore a RECOVERABLE one-turn hold, not a dead-end.
- **Reproduced (real account):** (a) gauge-bosons — a genuine confusion request injected at GUIDE
  with a probe pending → phase HELD at GUIDE (no demotion, G-2b), the tutor answered with a simpler
  analogy (D4b), the same probe re-offered; the next correct tap moved GUIDE→CHECK and the lesson
  COMPLETED with verified mastery in 8 turns despite the detour. (b) angular-momentum-addition —
  THREE consecutive confusion requests at GUIDE → probe never lost, phase demoted only to the
  DEMONSTRATE floor, **CLOSING was NOT triggered** (the `c98ea7b` fix holds: confusion does not
  spend the affect budget), and a correct answer recovered DEMONSTRATE→GUIDE and served a fresh
  probe. Classified against the task's A–G ladder: the "stall" is (G) resolved / (A) intentional D4b
  behavior — NOT B/C/E. `mcqToServe` held the pending probe correctly on every confusion turn.
- **One real regression FOUND by the stress test and FIXED** (in Option A / I1, not the ladder): a
  CONFUSION/DISTRESS signal ("sorry i dont understand this at all", "i am lost") or a help request
  ("explain differently", "show me a diagram") carries no `?`, so `detectLearnerQuestion` misses it
  and it is not a bare acknowledgement — so Option A's genuine-answer-attempt guard fired the
  "I couldn't tell which option your answer matched — tap the choice you mean" lead-in AT a confused
  learner while the tutor was re-teaching (a false claim: they made no answer attempt). Fixed by
  narrowing the genuine-attempt gate with the SAME per-turn intent the route already computes: also
  require `turnIntent.failureState === null && turnIntent.learnerRequest === null`. Measured: a
  genuine ungradeable attempt has BOTH null; every distress/help phrase has at least one non-null.
  Grading and the disambiguation string are unchanged. `mcqReoffer.test.ts` extended (18 assertions:
  distress/help cases + fixture-validity + route wiring). LIVE-VERIFIED on the deployed app:
  confusion → re-teaching with NO lead-in; genuine ungradeable answer → lead-in still shown (the
  first live run showed the pre-fix behavior — deploy lag, same as I1).
- Offline: mcqReoffer 18/18; 112 route-source test files 1934 passed / 4 skipped; `npx tsc --noEmit`
  clean; `npm run build` clean. NOT changed (per the task's safety rules): `resolveMcqChoice` not
  loosened, textarea not disabled, no prompt instructions, no hot-path ceiling, mastery authority
  untouched, EB/curriculum/KG/Visual Resolver untouched.
- **Remaining uncertainty:** two concepts / a handful of injected confusion turns — enough to show
  the dead-end does not occur and recovery works, not a statistical reliability proof across all 238
  concepts. The measured 60-run "5 sessions stalled at GUIDE" figure predates the `mcqToServe` and
  `c98ea7b` fixes and was not re-run at scale here (provider-capacity-bound; that ceiling is the
  open infra item, not a product defect).


## #1 — correct-answer confirmation rate: MEASUREMENT ARTIFACT, enforcer works (2026-09-02, no code change)
- **VERDICT: no product defect.** The confirmation ENFORCER (`answerConfirmation.confirmCorrectAnswer`,
  wired at `route.ts:5824`) fires on `mcqGradeHoisted?.correct === true` — the server's grade against
  an authored key, not the model's self-report — and code-guarantees a confirmation on every
  server-graded-correct INTERMEDIATE turn (it PREPENDS one of "That's right." / "Correct — well done."
  / "Yes, exactly right." unless the reply already matches `CONFIRMS_CORRECT`). Live evidence from the
  I1/I4 runs: intermediate graded-correct answers were confirmed ("Great—yes…", "You're right—photon
  first…", "That's right.", "Exactly—quarks…").
- **The "65%" is a scorer artifact, and the P0 fix made it worse (unmeasurable).** `rubricScore.ts`
  scores C5 over a DIFFERENT denominator than the enforcer: `answeredOption(prev, sent)` requires
  `prev.mcq.correctIndex` in the payload and counts any option-text match — not a server grade. The
  P0 fix (this session, `mcqForClient` strips `correctIndex` from the payload) means `answeredOption`
  now returns null for every turn, so post-P0 `rubricScore` can no longer compute C5 at all
  (denominator 0). The 65% was measured 2026-08-30/31 on PRE-P0 transcripts; it is stale, and its
  denominator never matched the enforcer's (a transcript cannot carry `mcqGradeHoisted`). The prior
  `docs/architecture/C5_CONFIRMATION_RESIDUE.md` already argued widening the detector would be
  measurement tampering — confirmed.
- **The one identified real contributor is the COMPLETION turn, and it is intentional, not a defect.**
  On the turn a lesson completes, `route.ts:8322` deterministically REPLACES the reply with
  `buildLessonCloseText` ("That's <concept> finished — nice work. You mastered <concept>") — which runs
  AFTER the enforcer (5824), so it discards the enforcer's confirmation. That close is a stronger,
  complete success acknowledgement that deliberately solicits nothing further (a tappable question would
  re-open a finished lesson). It just doesn't match the `CONFIRMS_CORRECT` regex, so a transcript scorer
  counts it as a "miss" — a detector limitation, not a learner-facing problem. Prepending "That's right."
  to it would read oddly; left unchanged deliberately.
- **NO code change** (per reproduce-first / no-speculative-patching): the product behaviour is correct,
  and the scorer's limitation is fundamental (a replayed transcript has no server-grade signal), so
  widening `CONFIRMS`/`CONFIRMS_CORRECT` would tamper with the metric without helping a learner.
- **Remaining uncertainty:** the live rate measurement was INCONCLUSIVE (0/0 — the model served prose
  rather than tappable keyed MCQs that session, the same MCQ-attachment non-determinism seen in I1/I4).
  The verdict rests on the code trace + the I1/I4 captured replies + one earlier run that showed the
  completion turn unconfirmed. **Recommended next action if a live C5 rate is wanted:** add one
  telemetry line at the enforcer site (`[c5] servedGradedCorrect confirmed=<bool>`) and read it from
  production logs — that measures the enforcer's own denominator directly, which no transcript scorer
  can. Optional instrumentation, not a defect fix.


## Excursion R1-R4 — an excursion no longer silently disables assessment (2026-09-02, `98939a0`)

**Read `docs/architecture/EXCURSION_GATE_OWNERSHIP_PROPOSAL.md` (rev 4, APPROVED
AND SHIPPED) before touching `excursion.ts` or `withholdUngradedGateQuestion`.**

**The defect, measured on the deployed app.** While an excursion is active,
`gateTerms.notExcursion` blocks every authored probe AND `turnCountsForLesson`
freezes the lesson ladder. Two lessons died on it in one sitting, both in
subjects at 100% asset contract: `phys.mech.newtons-second-law` (detour opened
on turn 5, ran to the end, three content-free holds) and `chem.atomic.bohr-model`
— where the detour opened on an UNRESOLVED TITLE, `'emission lines work'`, which
is the lesson's OWN subject matter. Bohr blocked all 5 authored probes for 7
turns; every question was model-authored and `unauthored-key-not-certifying`, so
correct answers banked nothing. The variance between an 8/10 and a 3/10 lesson
was not model variance — it was whether the learner happened to name a topic.

**Shipped (six lines of behaviour across four files):**
- **R1.1** `closed-on-lesson` hoisted above the `looksLikeAnswer` hold and out of
  the request-shaped branch. Naming the lesson's own concept now ends a detour
  from ANY sentence shape. Production had logged
  `requested:'phys.mech.newtons-second-law'` with `transition:'continued'`.
- **R1.2** `closed-wants-practice` un-scoped from `openedAsKnowledgeGap`. A
  request to be assessed ends any detour, however it began.
  `knowledgeGapExcursionCloses.test.ts`'s two cases that pinned the old scoping
  are updated in place with the supersession recorded, not deleted.
- **R2** `MAX_EXCURSION_TURNS` 40 → **6** (`visual/session.ts`, read by BOTH the
  teaching excursion and the visual session). A safety bound, not a
  classification: it caps the blast radius of defects in this seam including
  ones not yet found. Every existing test referenced the symbol, not the literal.
- **R3** a self-excursion never opens — `requestedConceptId === lessonConceptId`,
  **exact identity only**. The fuzzy sub-topic containment variant was
  deliberately NOT implemented (a shape test standing in for a semantic
  judgement); it is held pending measurement, and R3 therefore does NOT close
  the Bohr unresolved-title case — R1.2 and R2 do.
- **R4** `withholdUngradedGateQuestion` gained `gateBlockedByExcursion`
  (optional, default false). When the gate was blocked before the selector ran,
  a question is no longer stripped on the false premise that the pool was dry.
  **OWNER-RULED SCOPE: `notExcursion` ONLY.** Probe STARVATION still withholds —
  that is the function's purpose and `englishAssetContractP1.test.ts` pins it as
  correct; the remedy for starvation is content (english 0/216 at contract), not
  runtime. `gateRefusedOnPolicy` must NEVER be used here: it is true for
  `notClosingTurn` and `arbitrationAllowsProbe` too, and would ship a question on
  a closing turn.

**PERMANENTLY WITHDRAWN — do not revive:** the RETARGET DESIGN (attach a probe
from the excursion target's pool). The fold is a no-op while an excursion is
active (`route.ts` ~L6836, "paused means paused"), so an attached probe banks
nothing while `recordMcqAsked` spends it permanently — a reviewed probe
destroyed for zero evidence, and missing when that concept is later taught. Also
violates `certify.ts` D1 (taught before quizzed). Reviving it requires first
making something a consumer of detour-turn evidence.

**Production-verified** (real account, `dpl_2NJMD6m8…`, SHA `98939a08`): no
detour on a self-named lesson concept; genuine excursions still open;
`closed-turn-limit` at 6 with target AND figure returned to the lesson;
`closed-satisfied` on a finish request with arbitration `owner:'CLOSE'`;
`closed-wants-practice` on a topic-opened detour; and the previously-unfinishable
Newton's-Second-Law lesson reached `check:1 practice:2 → verified:true, COMPLETE`.
**Zero content-free holds**; the two withholds that fired were on non-excursion
turns and kept their teaching (230→193, 255→203 chars).
**R1.1's own answer-shaped close was added 2026-09-03** (`dpl_9MGjvcXAwR96uNie3SEY97D8BceC`,
session `cmtky68dm0009l204a7c210s7`): a detour open on `phys.mech.kinetic-energy`, then the
statement "So linear momentum is just mass times velocity, and it is a vector." →
`requested:'phys.mech.momentum'`, `transition:'closed-on-lesson'`, and the NEXT turn read
`notExcursion:true`. Three earlier attempts were discarded, not reported: a concurrent
session was driving the same account, and `StudentProgress.activeLessonSlug` is per-USER,
so the lesson pointer moved mid-run and the detour closed as `closed-lesson-changed`
instead. **Do not verify excursion behaviour on an account another session is driving.**

**Outstanding, not fixed:** (a) ~~prevalence is still UNMEASURED~~ — the
INSTRUMENT is now built (see the next section); the NUMBER is still unmeasured,
because this app has essentially no organic learner traffic. (b) Pre-existing and
untouched: `[mcq-reoffer-disambiguation]` fires on "I am done for today" — the
Option-A guard (`route.ts` ~L8918, `00e53ac`) excludes acks/practice/questions/
distress/requests but not `wantsToStop`; possibly more reachable now that probes
attach more often.


## #3 — C7 verbatim explanation re-serve: ROOT CAUSE FOUND & FIXED (2026-09-02, commit `d0e94074`)
- **VERDICT: BUG FOUND, root cause PROVEN (a code fact), fixed.** This closes the "third channel
  the C5/C7 residue note could not identify." It is NOT an LLM echo — it is a deterministic MEMORY
  RE-SERVE.
- **Reproduced live** (deployed app, real account, `phys.mech.newtons-first-law`): the authored
  explanation asset `c9d6427a` was served BYTE-IDENTICALLY on three turns of one session, all
  `provider=memory`. Intermittent — ~1 in 8 runs on that concept (0 repeats across 9 other concepts
  and 7 later diag-live runs of the same concept).
- **Method** — the reproduce-first path the codebase itself endorses: a temporary in-payload
  diagnostic (`explnDiag`, commit `55ee41d9`, since removed) captured, at the `hasServedExplanation`
  guard site, the concept id / whether history was present / the `explanationsServed` list / this
  turn's asset id / whether the guard fired. It proved the guard LOGIC is correct — it fires when the
  ledger holds the id — so the failure was that the ledger was intermittently EMPTY on a re-serve
  turn, not a logic bug, not an asset-id mismatch, not a null history.
- **First failing owner (proven by inspection):** the ISS-13 teachingHistory rederiver in `route.ts`
  (the `snapshotRederivers.push` after the primary fold). The primary fold records FOUR accumulative
  fields after `updateTeachingHistory` — served explanation (asset + remediation card), asked MCQ,
  confidence. `writeSnapshotDelta` uses optimistic concurrency: on a version conflict it DISCARDS the
  delta and re-runs the rederivers against the fresh row. The rederiver re-applied only
  `strategiesUsed`/`explanationCount`/`frustration`/`mastery` — its OWN comment admitted "five of the
  seven accumulative fields." So on a concurrent write, the just-served explanation's id never
  reached `explanationsServed`, the next turn's guard saw an empty ledger, and the same explanation
  re-served verbatim. The intermittency is exactly "only when the write conflicts." The identical
  mechanism dropped `mcqAsked` (a spent probe could be re-asked) and lost a confidence reading on the
  same conflicts.
- **Fix:** the rederiver now re-applies `recordExplanationServed` (asset + card), `recordMcqAsked`
  and `recordConfidence` onto the concurrently-updated base, under the SAME conditions as the primary
  fold (captured so the closure re-runs them). It REPLACES the primary delta (never both), so each
  runs exactly once; the first two no-op on a duplicate. No new state, no schema change; the prior
  advisory "do NOT repeat" prompt line and the `hasServedExplanation` guard are unchanged (the guard
  was never the bug). Guarded by `src/tests/teachingHistoryRederiver.test.ts` (behavioral, real
  teachingHistory functions — buggy rederiver loses the id, fixed keeps it — plus route wiring).
- Offline: new test 7/7; 115 route-source+teachingHistory test files 2028 passed / 4 skipped; `npx
  tsc --noEmit` clean; `npm run build` clean.
- **Live re-verification is impractical to force and was NOT claimed:** the defect fires only on a
  snapshot version conflict, which sequential client requests cannot reliably trigger, and the base
  repeat rate (~1/8) makes a "0 repeats" run inconclusive either way. The fix rests on the proven
  code-level root cause + the behavioral regression test, not a live before/after (which the
  intermittency does not admit). The prior fifth-defect prompt line (65%→31%) and this rederiver fix
  are complementary: the prompt line reduces LLM-echo repeats, this closes the deterministic
  conflict-driven memory re-serve.


## Liveness programme — the runtime can no longer refuse forever (2026-09-07)

**Read `src/tests/livenessEndToEnd.test.ts` and `src/tests/reachabilityProof.test.ts`
before touching the assessment gate, `pendingMcq`, or `diagnosticProducedNothing`.**
They are the before/after record, not decoration.

### The diagnosis, and what it was NOT
Two chemistry P0s (galvanic-cell stalled at CHECK with 5 ACTIVE probes unused;
weak-acid stuck at OBSERVE producing prose questions) were investigated as fresh
incidents. The AUTHORITY model was found SOUND and was not changed: `verified =
evidence.serverGraded === true`, `decideModelProbe`, the suppression layer and
`mcqForClient` already make it impossible for the LLM to manufacture mastery.
Explicitly ruled out: missing authored content (chemistry is 186/186 at contract),
the plain-vs-verified counter split (correct, keep), R82/R83, and "better prompting".

**The real weakness: NO LIVENESS PROPERTY ANYWHERE.** Every guard answers "MAY
this happen?"; nothing asked "HAS anything happened?", so individually-correct
refusals compose into absorbing states. This repo had already hand-fixed the same
shape three times (QL-2 scoping, QL-5 scoping, conceptBudget) — each time locally.

### Why it was never caught: no test had ever executed the route
Measured: `grep -rln "from '@/app/api/learn/chat/route'" src/tests` returned ZERO.
Every "…RouteWiring"/"replay"/"integration" file asserts a regex over route SOURCE
or re-chains the same pure functions by hand. Guards are tested; their COMPOSITION
is not — and that is where both defects lived. `src/tests/support/turnHarness.ts`
now executes the real `POST` with four I/O seams stubbed (auth, prisma via a
Proxy with per-method defaults + 6 real models, a SCRIPTED model so adversarial
output is a test INPUT, rate limiting). Acceptance: a tapping learner reaches
`verified:true, check 1, practice 2` through the real route.

### L1 — PROVEN, then CLOSED (this was P0 A)
`resolveMcqChoice` correctly refuses to guess; measured, **10 of 12
substantively-correct phrasings for a galvanic-cell probe are ungradeable,
including the bare correct answer "the anode"** (the longer sentence containing
it grades fine). So a learner who TYPES produces no grade → `pendingMcq` survives
→ `noUnansweredProbeOnScreen` shuts the gate → the same question is re-served
forever with 4 reviewed probes unused. Reproduced end-to-end: 8 correct answers,
1 question, `correctAtCheck` 0.
**Rung 1** (`turnProgress.ts` + route) releases a probe held ungraded for 2 turns.
It grades nothing, moves no counter, changes no phase. Q1→Q2→Q3.
Two things the tests forced: (a) rung 1 driven by the general stagnation counter
NEVER FIRED, because a model teaching new text every turn answers "did anything
happen" yes forever — the stuck dimension needed its own narrow counter
(`probeHeldTurns`); (b) releasing without SPENDING re-served the identical probe,
because `recordMcqAsked` fires on the GRADE, and its comment names the very
invariant rung 1 removes. Spent now, through the same single writer.

### L2 — REFUTED as stated, and the real residue
End-to-end, OBSERVE holds ~4 turns then ESCAPES (the route supplies move='ask'
often enough). A bounded delay, not a deadlock — recorded, not quietly dropped.
Separately measured: **the prose channel's SAFETY half is already closed** —
`withholdUngradedGateQuestion` + `shouldSuppressSignalCorrectness` strip a prose
MCQ and drop the model's correctness claim on every turn, banking nothing false.
So no prose stripping was added. What remained was liveness, and the gap was in
the new code: `distinctTeachingDelivered` was wired to "text non-empty", so a
tutor repeating ONE sentence forever reported `stagnantTurns 0`. Now wired to
`wouldRepeatPreviousTurn` (the remediation floor's own predicate).

### What shipped
- `src/lib/teaching/turnProgress.ts` — pure, ZERO imports. Four constraints
  asserted STRUCTURALLY against its own source: owns only counters of system
  inactivity, never names a phase, writes nothing, cannot grade/advance/discard.
- Rung 1 release · Rung 2 (`diagnosticStalled`, one optional TurnEvidence
  boolean consumed by the EXISTING `diagnosticProducedNothing` predicate — the
  supervisor never assigns a phase) · Rung 3 = `[turn-progress] unservable`, a
  NAMED failure; deliberately NOT a canned learner sentence (assembleLesson has
  already run; writing one there would be inventing pedagogy).
- `turnTelemetry.ts` — `TURN_EVENT`, one ~300-byte log line per turn, no DB
  write (5 GB egress quota). **`foldLegalityMetrics` is finally called**: before
  this, `askViolations` — which questionLegality documents as "the single most
  diagnostic number the teaching runtime produces" — had ZERO callers in src/app.

### Discipline notes for future sessions
- ~10 pre-existing guards had to be touched. NONE deleted: each keeps its
  original assertion verbatim in a dated comment and asserts the same invariant
  against the new shape. `remediationFactuality` test 8 and this programme's own
  diagnosis pins were INVERTED the same way.
- Two pre-existing guards caught real bugs in this work: `gateAssessmentRouteWiring`
  found rung 1's first draft persisting null while the response still carried the
  question (a served-but-unpersisted probe); `replayDrift` caught the new evidence
  field, which was REPLAYED rather than excused because a transcript genuinely
  carries the facts.
- The design-time invariant ("no legitimate non-terminal state may depend forever
  on an event the runtime has made impossible to produce") is a THEOREM checked by
  `reachabilityProof.test.ts`, parameterised by MOVE SET. It is NOT decidable at
  runtime; the runtime carries the weaker, honest proxy "nothing happened for N
  turns".


