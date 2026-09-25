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
