# AI Learner-Intent Interpreter — controlled A/B experiment (2026-09-25)

Owner-requested, one-session experiment. **Not** a resumption of the deferred "four primitives"
work and not an architecture decision. Final status: **EXPERIMENT SHOWS PROMISING EVIDENCE**
(small, controlled sample — see Limitations).

## What exists in the code (deployed, inert for ordinary learners)
- `src/lib/teaching/learnerIntentInterpreter.ts` — closed intent contract
  `{kind, target, requestedAction, confidence}`, strict parser, 4 s timeout, admission
  (confidence ≥ 0.6, kind ∈ FOLLOW_UP/CORRECTION/REDIRECT/CLARIFY, arbitration owner ∈
  TEACH/LEARNER_QUESTION/LEARNER_REQUEST), sanitized `target` (prompt-injection boundary),
  advisory `LEARNER DIRECTION` block. No imports; performs no I/O.
- `src/lib/teaching/learnerIntentProviderCall.ts` — the one provider seam (keeps route.ts's pinned
  `routeAI(` call-site count unchanged; the call is NOT counted in `llmCallCount`).
- `src/app/api/learn/chat/route.ts` — runs only when the request carries
  `x-exp-intent-interpreter: 1` AND the account row has `modelOverrideAllowed = true` (the existing
  cert gate, same single DB read). Output reaches prompt text only: (a) the existing A.4
  "address the question first" line, (b) withholding the REAL_LIFE_EXAMPLE block text when the
  interpreter reads a concrete example of a named subject target, (c) the LEARNER DIRECTION block.
  Never arbitration, move/legality, grading, mastery, visuals, evidence or state.
- Tests: `src/tests/learnerIntentInterpreter.test.ts` (13; real route via the turn harness,
  including a hostile-interpreter A-vs-B authority-equivalence run through verified mastery).
- Runner: `scripts/qa/intentInterpreterAb.ts` (create / run / cleanup; disposable accounts).
- Commits: `4766ebd`, `887b970`, `4b021b8` (fast-forwarded to `main`, deployment
  `dpl_Dt7xqXX7D3moKx1yjPArtT1Xbbn7` READY).

## Run
6 benchmark scenarios × 2 reps × {A, B}; 4 disposable accounts (one per arm per rep, reused across
the 6 different concepts — register is rate-limited 5/15 min/IP); both arms pinned to Groq
(`x-cert-provider: groq`, which is why A accounts also carried the flag — isolation was instead
verified per turn: `intentExperiment` absent on all 72 A turns, present on all 60 B chat turns).
Identical fixed script per scenario (ok → follow-up → repeat/extension → MCQ-or-ok → ok).

## Results (follow-up turns, 24 per arm, judged by reading every transcript)
- Fully addressed: A 19, B 23. Partial: A 4 (Topos T2 ×2 answered with an everyday analogy;
  Dark Matter T2 ×2 omitted the "why is it hard for modified gravity" half), B 0.
  Not addressed: A 1 (Perturbation r2 T3), B 1 (Random graphs r1 T3).
- First request satisfied without the learner repeating it: A 8/12, B 12/12.
- Interpreter: 24/24 follow-ups admitted (22 FOLLOW_UP, 2 CORRECTION), 36/36 other turns
  `not_actionable`; 0 timeouts / errors / malformed. Latency p50 584 ms, p90 1095 ms, max 2365 ms.
  Turn latency p50 A 13.19 s, B 13.95 s.
- Content errors on follow-up turns: equal (Pericyclic: 2 in A, 2 in B — thermal 6π called
  conrotatory, ψ3/ψ4 node counts swapped). B also produced one phantom "picture above" reference.
- Authority: no verified mastery / completion in either arm; visual turns identical in all 12
  pairs; phases identical in 11/12 (the exception followed a model-generated MCQ that only A's
  output carried). DB: A had 4 PROBE_OUTCOME rows, B 0 — three of A's were typed follow-up
  requests graded against model-invented MCQs (`[mcq-grade] unauthored-key-not-certifying`,
  e.g. `chosen: 1, correct: true`), correctly withheld from mastery.

## Root causes found with trace evidence (pre-existing, affect both arms)
- `resolveRequestedConceptId` common-word collisions start excursions: physics
  "…every **term** is negative" → `math.alg.term` (production `[excursion]` target, and
  `[visual-v2]` served `registry:domain-default:math.alg:coordinate_plane` in a physics lesson);
  "…what **distribution**…" → `math.fnal.distributions` (generalized functions).
- `detectLearnerRequest`: "concrete non-Set example … like sheaves" and "Vaska's complex as an
  example" → `real_life_example` (everyday-analogy directive); "show me how Sh(X)…" → `diagram`.
- Typed follow-up requests are resolved to options of a pending model-invented MCQ and written as
  PROBE_OUTCOME evidence (non-certifying).

## Limitations
Small, controlled proof-of-concept sample; single provider; fixed script; within-arm accounts
reused across concepts (symmetric between arms); follow-up-turn judging is manual; the treatment
is interpretation + prompt-routing adaptation, not interpretation alone.

## Cleanup
All 10 disposable accounts deleted via `/api/user/delete-account` (re-login blocked; the app
tombstones rows with `isDeleted=true`); `modelOverrideAllowed` reset to false on the 4 experiment
tombstones. Production flag count back to its pre-experiment value (2, both pre-existing, untouched).
No real learner record was read for writing or modified.

## Follow-up — deterministic misread fixes (2026-09-25, NOT deployed; feature branch only)
Owner-scoped follow-up: fix the confirmed deterministic misreads, verify offline, stop before
production. Interpreter files unchanged.
- **E4 (`requestedConcept.ts`)**: an off-domain one-word KG title immediately preceded by a
  quantifier / interrogative determiner (`every, each, all, any, which, what, whichever,
  whatever`; not the definitional "what X is") is an instance of the lesson's own material, not a
  topic. Fixes "every term" → `math.alg.term` (physics) and "what distribution" →
  `math.fnal.distributions`. The visual resolver now receives the paused lesson as
  disambiguation context only (`resolveVisual.ts` → `resolveVisualTarget` → 4th param), so the
  algebra coordinate-plane card is no longer drawn on the unresolved-topic path.
  Corpus sweep (12 lessons × 209 one-word titles × 13 phrasings = 32,604 resolutions, pre-fix vs
  post-fix tree): 0 of 22,572 "must-not-change" phrasings changed; 2,435 of 10,032 determiner-shape
  phrasings changed, all to null.
- **Example form (`masteryGate.ts`)**: `requestedExampleForm` → `CONCRETE_EXAMPLE` directive unless
  real-life/everyday/application/analogy is asked; trigger and `real_life_example` kind unchanged.
- **"show me how/why/that/the derivation…" (`masteryGate.ts`)**: no longer a diagram request;
  medium nouns, visual verbs and "show me what it looks like" unchanged.
- **Typed non-answers (`mcq.ts`)**: `readsAsRequestToTutor` (request frames + existing
  `isClaimChallenge`) joins `looksLikeAQuestion` as a not-gradeable precondition in
  `resolveMcqChoice` and `engagesPendingOptions`; verbatim taps and labelled letters resolve first.
- Tests: `deterministicMisreadFixes.test.ts` (34, incl. route-level; two mutation checks confirm
  they fail without the fixes). Full suite 732 files / 15,445 passed / 0 failed; tsc, lint, build 0.
- Residuals (not changed): the unresolved-topic path now holds these follow-ups as a topic
  excursion on the LESSON'S OWN concept (previously a foreign concept excursion); "the/this term"
  still resolves cross-subject; "for example, …" inside an answer still reads as an example request.

## Rerun on the FIXED tutor (2026-09-25, production b143b3b0 = misread fixes + EGRESS-4)
Same runner, scenarios, wording, provider pin (groq) and 6×2 design; interpreter unchanged.
- First ask fully satisfied: A 10/12 (baseline 8/12), B 12/12 (baseline 12/12).
- Follow-ups F/P/X: A 18/4/2 (baseline 19/4/1), B 22/0/2 (baseline 23/0/1).
- Deterministic fixes confirmed live: Topos T2 formal Sh(X) in A (no everyday analogy); no
  `math.alg.term` / `math.fnal` target or figure; every typed follow-up with an MCQ pending
  `chosen: null`; every graded event was an option tap.
- Residual B advantage, 4 turns: Dark Matter T2 modified-gravity half (A 0/2, B 2/2, same as
  baseline) and Vaska T3 explicit confirmation of the correction (A implicit 2/2, B explicit 2/2).
  Content errors on follow-ups: A 2, B 0.
- NEW failure exposed in BOTH arms: Topos T3 (an imperative follow-up, no '?') is pre-empted by
  the authored-probe gate ("One to try, on Topos.", llmCallCount 0). Before the fix, the diagram
  misread made it a LEARNER_REQUEST, which suppressed the probe. Root cause: arbitration's
  LEARNER_QUESTION rung reads only `detectLearnerQuestion` ('?' + WH-word). The interpreter
  cannot help because the model is never called.
- Interpreter: 24/24 follow-ups admitted, 36/36 others not_actionable, p50 588 ms, 0 errors.
  Turn p50 A 13.27 s, B 13.55 s. Visual turns equal 12/12, phases equal 11/12 (the one
  difference follows a legitimately graded option tap). No verified mastery; isolation 72/72 + 60/60.

## Rerun #3 — after the quiz-gate rung fix (2026-09-26, production bf726589)
Rung fix: LEARNER_QUESTION's claim also reads `readsAsRequestToTutor`, so an imperative follow-up
is answered before the authored-probe gate (`requestBeforeProbeGate.test.ts`, mutation-checked).
Same 6×2 A/B, same runner, wording and provider pin; interpreter unchanged.
- Follow-ups fully addressed: A 24/24, B 24/24 (strict substance check: 0 misses in either arm).
  First ask: A 12/12, B 12/12. Topos T3 now answered by the model in all 4 runs (Ω + topos
  axioms; no gate line).
- The previous B-only advantages did not reproduce: Dark Matter modified-gravity half A 2/2, B 2/2;
  Vaska explicit acknowledgement A 1/2, B 1/2.
- Factual errors on follow-ups: A 1 (Pericyclic r1 T2: rule inverted, thermal hexatriene called
  conrotatory), B 0.
- Interpreter: 25 ok / 35 not_actionable, including ONE false positive (an option tap classified as
  CORRECTION 0.86 and injected; grading unaffected — the tap was graded deterministically).
  p50 471 ms. Turn p50 A 12.99 s, B 14.08 s (+1.1 s); p90 A 17.1 s, B 19.8 s.
- Authority: every graded event was an option tap; typed follow-ups with an MCQ pending were
  `chosen: null`; no mastery, no completion. One A PROBE_OUTCOME fail (perturbation) with no MCQ
  shown — pre-existing model-SIGNAL path, origin not verified (truncated log window).
- Conclusion: with the deterministic fixes, the interpreter adds no measurable follow-up benefit on
  this benchmark, while costing about 1 s per turn at the median and one misclassification.

## FINAL STATUS (2026-09-26): ABANDONED FOR PRODUCTION / DETERMINISTIC PATH RETAINED
Final benchmark (12 paired scenarios, one provider, fixed wording/script — not a general proof):
A 12/12 first ask, 24/24 follow-ups; B 12/12 first ask, 24/24 follow-ups; B +1.1 s median latency;
1 interpreter false positive; factual slips A 1 vs B 0 (too small a sample to conclude).
Progression of the deterministic path as fixes landed: A first ask 8/12 → 10/12 → 12/12.
Decision: deterministic path retained; interpreter not promoted, and REMOVED from the codebase
(route wiring, `learnerIntentInterpreter.ts`, `learnerIntentProviderCall.ts`, its test file and
`scripts/qa/intentInterpreterAb.ts`). Recoverable from git history (4766ebd..df64d7ef) if ever
needed. The deterministic fixes the experiment surfaced are kept and independently tested:
E4 resolver, CONCRETE_EXAMPLE form, "show me how/why" ≠ diagram, typed non-answer not graded,
visual disambiguation context, request-to-tutor priority over the probe gate, EGRESS-4.
The generic turn-harness support for request headers / `modelOverrideAllowed` is kept (test-only).
The A/B experiment is CLOSED.

## Post-closure — remaining known issues (2026-09-26, deterministic only)
Owner: "fix the remaining known issues". No interpreter code reintroduced.
- **#1 unresolved-topic detour on follow-ups** (`route.ts`): `namedTopicUnknownTo`'s taught text now
  also includes the tutor's last two replies (SIGNAL/HTML comments stripped, 4 000 chars each), so a
  follow-up that reuses words the tutor just taught no longer opens a detour; an unmentioned topic
  still does.
- **#2 "the/this term" cross-subject** (`requestedConcept.ts`, E4b): demonstratives
  this/that/these/those join E4's determiners; "the" counts only when followed by a subject
  predicate (is/are/has/does/can/…) AND further words. Sweep vs e6600ce3, 50,160 lookups: 0 of
  32,604 must-not-change phrasings changed ("teach me the W", "what the W is", "explain the W
  please", …); 2,413 target phrasings changed, all to null.
- **#3 "for example, …" inside an answer** (`masteryGate.ts`): `withoutExampleDiscourseMarker`
  strips "for example / for instance / e.g." before `EXAMPLE_RE` unless the marker ends the message
  ("for example?", "like what, for example?" still requests).
- **#5 model SIGNAL on a request turn** (`route.ts`): the learner-question guard at the signal seam
  also admits `readsAsRequestToTutor`, so a request/claim-challenge with no '?' drops the model's
  correctness (never fabricates); a typed answer keeps its signal.
- **#4 model factual slips: NOT fixed.** Needs a content verifier (the Deterministic Physics
  Verifier primitive), explicitly deferred in CLAUDE.md.
- Tests: `remainingMisreadFixes.test.ts` (15; route-level fixes mutation-checked).

## Live QA of the above + final follow-up cleanup (2026-09-26)
Live QA on production d2139f25 (one disposable account, deleted, re-login blocked): #1, #2, #3
confirmed from `[excursion]`/`[arbitration]`/`helpRequestKind` logs; #5 not triggered (the model
emitted no SIGNAL tag on the request turn; 0 PROBE_OUTCOME rows) — offline-validated only.
- **Issue A — a relieved probe replaced the answer (FIXED).** "show why the term is negative"
  (third question-owned turn): arbitration owner LEARNER_QUESTION denied AUTHORED_PROBE, then
  probe-starvation relief (`probeStarvedTurnsBefore: 2`) re-allowed it — as designed. The answer
  was lost at composition: `renderGateLeadIn` refused only explicit requests
  (`learnerMadeARequest`), so it served the canned lead-in (`provider=gate`, no model call); and
  had the model been called, `buildGateAssessmentBlock` said "LEAD-IN ONLY … do NOT work a new
  example". Fix: on a relieved turn the lead-in renderer refuses and the block asks the model to
  answer first, then bridge (`answerLearnerFirst`). Relief policy, probe selection, grading
  unchanged. Tests: `relievedProbeAnswersLearnerFirst.test.ts` (both halves mutation-checked).
  `pcd007AssessmentLifecycle`'s "answer untouched" test had passed only because its third turn was
  an example request.
- **Issue B — "why is that term zero?" answered as "So you're saying … have I got that right?"
  (NOT FIXED — model prose).** Trace: owner TEACH because an authored probe was pending
  (`genuineQuestionActive` excludes pending-MCQ turns) — but that rung only denies AUTHORED_PROBE,
  already blocked by `noUnansweredProbeOnScreen`, so no prompt difference. The prompt carried
  "STUDENT QUESTION DETECTED … Address their specific question FIRST" (reads
  `detectLearnerQuestion` directly) and no restate/confirm instruction (reproduced in the turn
  harness). `stripFabricatedAttribution` correctly did not fire ("zero" is shared). This is the
  mirror class `attributionGuard.ts` documents as having no deterministic lever; left unchanged.
- Observed, out of scope: "show why that happens step by step" opens an unresolved-topic
  excursion titled "why that happens step by step" (turn harness).
- **Live QA after the fix (production 7dd33cda, one disposable account, deleted, re-login blocked):**
  A "show why the term is negative" and B "Give me the second-order energy correction…" both ran
  on relieved turns (`probeStarvationRelieved: true`, `probeStarvedTurnsBefore: 2`) and were
  answered by the model (`RESPONSE provider=groq`) with the authored probe attached beneath.
  C "why is that term zero?" (quiz pending, owner TEACH) again drew "So you're wondering whether
  … vanishes — have I got that right?"; the premise was false (the prior reply showed the terms
  are negative), so it reads as a clarification; unchanged. D opened the unresolved-topic detour;
  E → `real_life_example`; F → owner TEACH, no request, treated as an answer.
  DB: one unverified model-SIGNAL PROBE_OUTCOME pass (case F, a genuine typed answer,
  `serverGraded: false`, verified counters 0) and one MISCONCEPTION_DETECTED whose text is the
  learner's question (case C; correctness was dropped, the misconception phrase is not — the
  guard drops only correctness by design). The latter is a remaining, unfixed observation.
- **Misconception row on question turns (FIXED, 2026-09-26).** The learner-question guard at the
  signal seam now drops the SIGNAL `phrase` together with `correctness`, and also fires when the
  model sent a phrase without correctness. Basis: the SIGNAL contract (`signals.ts`) says a
  question/non-answer carries no tag at all. `confusion`/`confidence` still survive; typed answers
  keep their phrase. Consequence: such turns also stop setting `misconceptionDetectedThisLesson`.
  Tests: `remainingMisreadFixes.test.ts` §5b (question + correctness + phrase, phrase-only,
  request without '?', typed-answer control), both halves mutation-checked.
  Live (production ec976462, one disposable account, deleted, re-login blocked): 0
  MISCONCEPTION_DETECTED and 0 PROBE_OUTCOME rows; the one question turn that carried a SIGNAL
  ("show why the term is negative") was stripped (`[learner-asked-question]`). "why is that term
  zero?" was answered directly this run. The typed-answer control drew no SIGNAL from the model,
  so the keep-phrase path was verified offline only.
  Observed (not fixed): on that relieved turn the model was called (answer-first block) but wrote
  only a clarifying mirror ("So you'd like me to demonstrate why … correct? Could you confirm…");
  the existing stray-question-beside-MCQ withhold removed it, leaving the handoff line "Let me
  check your thinking with this." plus the probe. No deterministic step replaced an answer — the
  model did not write one.
- **Relieved turn answered with a clarifying question (FIXED, 2026-09-26).** When relief fires
  and the model's reply is ONLY a question (`replyIsOnlyAQuestion`: the withhold's own
  `cutBackToTeaching` + `salvageNonQuestionSentences` leave nothing), the relieved probe steps
  aside for that turn (`mcqHoisted = null`, `[gate-assessment] relieved-probe-yielded-to-
  clarification`) and the withhold leaves the clarification on screen (its existing
  `learnerAskedDirectQuestion` branch, now also set by the yield so a no-'?' request qualifies).
  The probe is not spent (the ledger records only grades/releases) and the starvation counter keeps
  climbing, so relief fires on the next question-owned turn. An answer with a stray question
  still carries the probe. Pure confirm-tails ("have I got that right?") are not answerable
  questions to either reading, so they were never stripped and are not affected. Tests:
  `relievedProbeAnswersLearnerFirst.test.ts` (clarification with '?', without '?', stray-question
  control, helper table); both halves mutation-checked.
  Live (production 87f1f98c, one disposable account, two identical perturbation sessions, deleted,
  re-login blocked): run 2's "show why the term is negative" was relieved (`probeStarvedTurnsBefore
  2`) and answered in full by the model with the probe beneath (answer-first path). Run 1's same
  turn was NOT relieved (move 'teach' → `phaseAllowsProbe: false`, by design); the model's
  confirm-tail mirror was shown unchanged (a confirm tail is never stripped). The yield path itself
  did not trigger live (it needs relief AND a reply the withhold would delete) — offline-validated.
