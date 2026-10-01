# My Tutor — Runtime Architecture Map (as the code runs, 2026-09-24)

**What this is.** A map of the tutor as it actually executes in production today, read from
the code at `main` 627f352 and from production logs of real QA turns — not from design
intent. `EDUCATIONAL_BRAIN_BIBLE.md` is the design authority and remains so; where it and
the code disagree (it describes `route.ts` as 1,688 lines; it is 12,497), this file records
the code. Line numbers are anchors into `src/app/api/learn/chat/route.ts` at that commit and
will drift. **Descriptive only — no redesign is proposed here.**

---

## 1. Scale

| Area | Size |
|---|---|
| `src/app/api/learn/chat/route.ts` (the turn) | 12,497 lines · 1 handler · 317 dynamic imports · 121 `…Hoisted` locals · 72 `systemPrompt +=` sites · 5 `routeAI()` call sites |
| `src/components/learn/LessonScreen.tsx` (the client) | 6,423 lines |
| `src/lib/teaching/` | 552 files, ~252k lines (most of it authored content modules) |
| Prisma schema | 113 models (incl. 24 `Eb*` models of the dormant pipeline) |
| API routes | 67 |
| Tests | 717 files (~14.8k tests) |

## 2. The governing idea (and where it holds)

"Decisions are deterministic. Only the words are generated." — holds for **decisions**:
phase, move, probe, mastery, visual, who owns the turn are all computed by pure modules
before any model call, and many turns never reach a model. It does **not** hold for the
**words**: when the model renders, nothing verifies its claims against the facts it was
handed (figure contents, direction of a process, which option is correct). Output safety
is a chain of regex/predicate repairs plus a rule verifier that runs in log mode (§5).

## 3. One chat turn — `POST /api/learn/chat` → `handleChatTurn`

Order of execution (first import of each module, by line — the pipeline in source order):

| Stage | Lines (approx.) | What happens | Key modules |
|---|---|---|---|
| Load | 184–390 | auth, session, messages, snapshot, deadline budget | `sessionLifecycle`, `renderedRealityModel`, `kernel/verifier/history` |
| **Phase 1 read** | 389–470 | the learner's message read ONCE into a `TurnIntent` (`readTurnIntent`); ephemeral lesson-opening instructions are never read as learner intent | `masteryGate` detectors, `learnerMove` |
| Lesson identity | 470–1000 | which lesson/concept this session teaches (PCD-004), placement, levels, KG node, concept anchor | `sessionLessonPointer`, `lessonAttempt`, `knowledgeGraph`, `placement`, `conceptAnchor` |
| Advisory context | 960–1700 | legacy visual detection, misconception engine, teaching strategy, output bias, library concept resolver, lesson planner, visual session, excursion, tutor context, subject validator, blueprint loader, retrieval cache | `school/adaptive/*`, `excursion`, `blueprintLoader` |
| Teaching state | 1730–2560 | teaching sequence, `conversationState` (phase ladder), memory engine snapshot, action procedures, TAG + lesson composer, recovery guard, signals, first-lesson guard, placement verification, MCQ parse/grade of the pending question, prose-MCQ guard, attribution guard, lesson-attempt store, lesson completion, repetition guard, pending question | `conversationState`, `masteryGate`, `mcq`, `lessonAttemptStore` |
| Understanding | 2600–3100 | attempt-vector signal, requested concept, knowledge gap, requested topic, excursion telemetry, conversation reader, learner-move reading, spaced retrieval | `understanding/readers/*`, `learnerMove` |
| Pedagogy extras | 3230–3520 | math speech, granularity, objective model, narrative tracker, capability model, evidence-spine replay (hydration — see egress rules), kernel policy move | `capabilityModel`, `evidence-spine/replay` |
| **Visual decision** | 3519–3810 | V2 resolver decides the turn's figure (Tier −1 retirement → 0 scene → 1 card → 2 approved → 3 generated) and the tutor's visual contract | `visual/resolveVisual`, `visual/visualContract` |
| Brain runtime | 3810–4230 | brain runtime entry/shadow, progression integrity, history scope/compaction, kernel shadow + parity (flag-gated), EOS runtime flags | `teaching/runtime/*`, `kernel/*`, `eos-runtime` |
| **Serving sources** | 4324–5620 | (a) Explanation Memory: `assembleLesson()` builds an authored turn (explanation ± probe) unless first lesson / recovery / unresolved prose MCQ / already served; (b) gate probe: `gateAssessment` + `findBestProbe` + `gateAssessmentRenderer` produce an authored MCQ with lead-in at CHECK/PRACTICE; (c) remediation card for "I don't understand" | `teaching/assets`, `gateAssessment`, `masteryReachability`, `gateAssessmentRenderer`, `remediationCards` |
| **Dispatch** | 5146–5420 | CUE `understandStudentTurn` → `decisionEngine` → `planDispatch` → which executor serves the turn; plus `conversationDecision` | `understanding/*`, `conversationDecision` |
| Prompt assembly | throughout, 72 sites | directive, contract, strategy, language, remediation grounding, claim-challenge, etc. `turnArbitration` resolves which action OWNS the turn so prompt blocks stop fighting by position | `turnArbitration`, `strategyDirective`, `outputLanguage` |
| **Serve** | 5799–6140 | **priority: lesson-complete (from LessonAttempt, no model) → remediation card (`provider=memory`) → Explanation Memory (`provider=memory`) → gate renderer (`provider=gate`) → model (`routeAI`, primary call L6096)**. `turnContractShadow` compiled before the model call (shadow, read by nothing) | `ai/router` |
| **Post-generation** | 6140–10500 | tag parse (MCQ/SIGNAL/hint/visual), signal verification, degraded-mode template, learner-move telemetry, answerable-turn guard, hint tags, math delimiters, field-line/vision-direction guards, physics dimensional verifier (telemetry), answer confirmation, wrong-answer correction, don't-know ceiling, frustration, **kernel verifier rules** (up to 4 one-shot re-generations, L8309/8458/8588/8773 — see §5), stance enforcement, figure-reference strip, ASCII-diagram guard, topic drift, visual acknowledgement, scaffold headings, duplicated option letters, residual tag sweep, verbatim redaction | ~28 text writers |
| **Persist** | 10300–12300 | evidence events (append-only), topic-progress evidence, `turnProgress` (liveness counters), LessonAttempt, StudentProgress, spine events (`turnEmitter`), `LEARNER_STATE` (telemetry only), snapshot delta via `snapshotWrite` (sole writer, versioned), `VISUAL_TURN`, `turnDecision` provenance, `TURN_EVENT` telemetry | `evidence/evidenceEngine`, `turnProgress`, `db/snapshotWrite`, `turnTelemetry` |
| Respond | 12379 | `{ success, text, visual, visualSpec, sceneSpec, mcq, mastery, lessonComplete, hint, provider, llmCallCount, … }` | |

## 4. The deterministic authorities (who decides what)

| Authority | Decides | Nature |
|---|---|---|
| `conversationState` | teaching phase: OBSERVE → DEMONSTRATE → GUIDE → CHECK → PRACTICE → TRANSFER; next move teach/show/ask; length budget; failure moves down one phase | pure, state in `contextSnapshot.conversationState` |
| `questionLegality` | removes ASK when unanswerable (QL-1 no source taught, QL-2 non-answers end diagnosis, QL-3 learner directive) | subtractive only |
| `masteryGate` | the ONLY lesson-completion authority: ≥1 CHECK + ≥2 PRACTICE correct, **verified** counters; strips unauthorised `[LESSON_COMPLETE]` | pure |
| `gateAssessment` + `gateProbeContract` | at CHECK/PRACTICE the server, not the model, attaches an authored MCQ (the model declined to, 17× in the sweep) | server-owned |
| `signalVerification`, `answerableTurn`, `proseMcqGuard` | whether the model's `SIGNAL correctness` claim may count; flagged signals still move the phase but not the verified counters | pure |
| `turnArbitration` | which educational action owns the turn (`TURN_AUTHORITY_ORDER`) | pure, Phase 3 |
| `learnerMove` | a closed multi-label reading of what the learner did, composed from existing detectors (no regex of its own) | reading, not authority |
| `excursion` | two identities: `lessonConceptId` (owns progress) vs `targetConceptId` (owns teaching) for off-lesson questions | pure |
| `turnProgress` | three SYSTEM-inactivity counters (stagnant / probe-held / probe-starved) to break deadlocks | pure |
| CUE → decision engine → dispatcher (`src/lib/understanding`) | which existing executor serves the turn (memory, lesson-complete, LLM…) — **active by default** (`ENABLE_BRAIN_RUNTIME` only disables) | pure |
| Teaching Engine `decide()` (frozen) + TAG + Lesson Composer | concept-level teaching decision; in practice School-Mode-centred | pure |
| Visual resolver (`src/lib/teaching/visual`) | the turn's figure and why; single writer of the response's figure fields | see `docs/history/visualization-engine.md` |

## 5. Output checking — what exists

1. **Deterministic repairs (always on)** — ~28 writers can rewrite the text after
   generation (phantom-figure strip, ASCII diagram guard, option-promise drop, empty-hold
   fallback, verbatim redaction, stance enforcement, …). Each targets a measured phrasing.
2. **Kernel verifier (`src/lib/kernel/verifier`)** — 20+ rules (V-Q1/Q2 question budget,
   V-STAGE, vocabulary, length, V-REC, V-CLOSE, duplicates, oscillation, V-AFFIRM,
   V-CHALLENGE, …). The affirmation/challenge floors and QL-1 can regenerate once, then
   fall back to a template. The full gate runs under `ENABLE_OUTPUT_VERIFIER`; **production
   logs show `verifierMode: 'log'`** — violations recorded, draft delivered unchanged.
3. **Physics dimensional verifier** — present and wired as telemetry (`PHYSICS_DIM=` logs,
   `gate: 'no-binding'` for concepts without bindings); not a correctness gate.
4. **Not present:** a check of the model's words against the turn's own facts (the figure
   contract's element list, the authored answer key, the concept's authored direction of a
   process). This is the gap behind the 2026-09-24 QA findings ("orange block", "toward the
   fork", "Follow the arrow…" on a no-figure turn).

## 6. State — where a learner's truth lives

| Store | Holds | Writer(s) |
|---|---|---|
| `LearnSession.contextSnapshot` (JSON) | per-session runtime state: `conversationState`, `lastSignal`, `visualSession`, `excursion`, `turnHistory`, `teachingHistory`, `questionLedger`, `narrativeState`, `lessonStageProgress`, `renderedRealityLog`, `currentConceptNodeId`, `visualGenerationCount`, placement/episode/failure counters, … (~40 keys) | **`db/snapshotWrite` only** (versioned delta, lost-update safe) |
| `Message` | transcript | chat route, lesson-init (assistant only), sessions APIs |
| `TopicProgress` | per-concept status + mastery % | route (`topicProgressEvidence`) and 4 other APIs (practice, assessment, curriculum progress, topic-progress) |
| `StudentProgress` | current lesson pointer, completed lessons | chat route, lesson-init, curriculum progress |
| `LessonAttempt` | per-lesson attempt outcome; lesson-complete serving reads it | `lessonAttemptStore` |
| `EvidenceEvent` | append-only evidence (ASSET_SHOWN, PROBE_OUTCOME, MISCONCEPTION_DETECTED, …) | `evidence/evidenceEngine.appendEvidenceEvent`, from the route's close block, fire-and-forget |
| `SpineEvent` | typed evidence spine (capabilities) | `evidence-spine/writer` via `turnEmitter` |
| `RetentionMetric`, `ReviewSchedule` | memory engine | `memory/update-pipeline` |
| `AssetIdentity` + `Explanation/Probe/VisualAsset` | the servable content catalogue | cold-start bootstrap (`src/instrumentation.ts`) + visual review/generation |
| `ConceptMasteryRecord`, `ActiveMisconception` | durable per-concept state | **zero writers** (deferred primitive; `conceptMasteryRecord.ts` is Batch 0, telemetry only) |
| `Eb*` (24 tables) | dormant Educational Brain pipeline | `educationalBrain/persistStage` only when enabled |

## 7. Content

Authored in git as seed modules under `src/lib/teaching/assets/` (explanations + ≥3
gradeable probes per concept/band = "the contract"), written to production at cold start by
`src/instrumentation.ts`, which hand-imports each module; `seedCorpusCoverageRatchet.test.ts`
keeps that list in step with the standalone seed script (the §10.1 fix, realised as a
ratchet rather than one declaration). Readiness is REPORTED (`scripts/assets/contract-audit.ts`,
`masteryReachability`) and never used as an admission gate. Remediation cards are
LLM-drafted and served only when ACTIVE and human-signed.

## 8. The other entry points

- **`/api/learn/lesson-init`** (877 lines) — every lesson's opening message. Deliberately
  minimal: one `routeAI` call (plus one retry) with its own small prompt, a subset of
  guards (figure reference, stance, scaffold headings, repetition, physics dimensions,
  field-line/vision direction), saves only the assistant message. **No visual decision, no
  gate, no verifier, no Explanation Memory.** The first figure of a lesson therefore always
  arrives on the first chat turn, not the opening.
- **Client** `LessonScreen.tsx` reads `text, mastery, lessonComplete, mcq, visual/visualSpec/
  sceneSpec, dynamicVisualizationCode, hint, restoredVisual, provider, llmCallCount`.
- **AI router** `src/lib/ai/router.ts`: `chainKeyForLanguage()` is the only selector;
  `ru` → Yandex→Gemini→OpenRouter→Groq, else Groq (`openai/gpt-oss-120b`)→Gemini→OpenRouter.
- Other learning APIs (practice, assessment, curriculum progress, topic-progress) write
  `TopicProgress` independently of the chat turn.

## 9. Production flag state (observed in logs, 2026-09-24)

| Flag / system | State |
|---|---|
| Brain runtime (CUE dispatch) | **ACTIVE** (`mode=ACTIVE`) |
| Explanation Memory | on (default) |
| Output verifier (K5) | on, **log mode** |
| EOS kernel pipeline (`ENABLE_KERNEL_PIPELINE`) | no kernel lines in logs → off |
| Policy packs | no lines → off |
| Educational Brain pipeline (`educationalBrain/*`) | dormant |
| Visual generation (Tier 3) | on, budgeted, critic-gated |

## 10. Parallel systems that exist in code (and their status)

1. `route.ts` — owns every turn.
2. EOS Kernel (`src/lib/kernel`, 47 files) — 15-stage typed pipeline meant to strangle
   `route.ts`; shadow-capable, off.
3. EOS runtime flags/gates (`src/lib/eos-runtime`) — verifier on in log mode.
4. Educational Brain decision pipeline (`src/lib/educationalBrain`, `Eb*` tables) — dormant.
5. Typed Turn Contract — compiled in shadow before the model call, read by nothing.
6. Evidence spine — live (capabilities), hydrated per session.

## 11. Structural facts worth knowing before changing anything

- Decisions are made in source order across one 12.5k-line function; ~28 writers can
  rewrite the learner-visible text after generation; the route's own `turnDecision` module
  exists precisely because nothing else records what a turn meant.
- Two grading channels: server-graded authored MCQs (trustworthy) and the model's own
  `SIGNAL` tag (verified/unverified split); only verified counters complete a lesson.
- `TopicProgress` has five writer modules (the chat turn plus four other APIs).
- The lesson opening is a separate, lighter pipeline (§8).
- Durable cross-session per-concept learner state does not exist beyond `TopicProgress`,
  `LessonAttempt` and evidence rows; within a session, truth is the snapshot.
- Governance: CLAUDE.md — the adopted plan's stop condition is reached; the four
  primitives' remaining two (physics verifier, durable learner state) are deferred; any new
  teaching-decision capability needs G1/G2 owner approval; no parallel pipelines.
