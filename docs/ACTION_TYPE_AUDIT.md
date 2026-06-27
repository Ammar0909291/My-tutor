# Action Type Audit — `/api/learn/chat` response surface

Branch: `claude/my-tutor-foundation-KDSUO`. Audit date: 2026-06-27 (revised — supersedes the
original same-day version, written before this session's gap-closure work).
Scope: every distinct content-block "type" that the AI/route pipeline can produce in or
alongside `msg.content` (`src/app/api/learn/chat/route.ts`), and how each one is consumed
downstream.

There is **no single unified `ContentBlock` type**. Three independent JSON response fields
(`visual`, `visualSpec`, `sceneSpec`), a structured `inlinePractice` field, a structured
`hint` field, and four embedded-in-text tags coexist on one assistant message. Each is
catalogued below.

## Inventory

| # | Type / identifier | Origin (where it's produced) | JSON response field | Rendered in frontend? (file + component) | Weighted in `teachingOutputBias.ts`? | Covered by a test harness? |
|---|---|---|---|---|---|---|
| 1 | `visual` (`VisualType` tag, ~45 string values) | `detectVisual()` / `parseVisualTag()` — `src/lib/school/visuals/detectVisual.ts` | `visual` | Yes — `VisualCard` (consumed via `msg.visual` in `LessonScreen.tsx`) | **Yes** — `isOptionalVisualTag()` + `deriveOutputBias()` can `SUPPRESS_OPTIONAL` it (route.ts ~1293-1300) | `scripts/test-detect-visual.ts`, `scripts/test-parse-visual-tag.ts`, `scripts/test-teaching-output-bias.ts` |
| 2 | `visualSpec` (2D structured diagram: `graph`/`number_line`/`process_flow`/`geometry`) | `planVisualTeaching()` deterministic 2D planner — `src/lib/visuals/` | `visualSpec` | Yes — `VisualRenderer` | **Yes** — `isOptionalVisual(spec)` + `deriveOutputBias(strategy)` can `SUPPRESS_OPTIONAL` it (route.ts ~1277-1284) | `scripts/test-visualization-decision.ts`, `test-visualization-tiebreaker.ts`, `test-visual-concept-detector.ts`, `test-build-scenespec.ts` |
| 3 | `sceneSpec` — rule-based 3D scenes | `buildSceneSpec(cleanText)` rule-based path | `sceneSpec` | Yes — `SceneSpecRenderer` | **Yes** — `isRequiredSceneSpec()` makes the "always keep" policy explicit (route.ts ~1308-1315) | `scripts/test-scenespec-validator.ts`, `test-routed-scene-guards.ts`, `scripts/test-teaching-output-bias.ts` |
| 4 | `sceneSpec` — 15 parametric generators (`SceneGeneratorKind`) | `generateRoutedScene(cleanText)` via `sceneRouter.ts`, behind `ENABLE_PARAMETRIC_SCENE_GENERATION` | `sceneSpec` | Yes — `SceneSpecRenderer` (same renderer as #3) | **Yes** — same `isRequiredSceneSpec()` gate as #3 (it is bias-agnostic by source, not by generator kind) | Each of the 15 generators has its own dedicated `scripts/test-<name>.ts` harness (e.g. `test-civics-org-chart.ts`, `test-electric-circuit.ts`, 991+ assertions total) |
| 5 | `sceneSpec` — free-form AI scene generation | `generateSceneSpec(cleanText)`, behind same flag, last-resort fallback | `sceneSpec` | Yes — `SceneSpecRenderer` (same renderer as #3/#4) | **Yes** — same `isRequiredSceneSpec()` gate as #3/#4 | `scripts/test-generate-scenespec-flag.ts`, `scripts/test-scene-extraction-live.ts` (live-Groq, documented exception) |
| 6 | Inline practice MCQ (`InlinePracticeQuestion`) | `generateInlinePractice.ts`, injected when strategy is APPLICATION_FOCUS / stalemate | `inlinePractice` (structured field, not embedded text) | Yes — dedicated `InlinePracticePrompt` candy component (question/options/answer-capture/scoring) | **Yes** — `isOptionalInlinePractice()` + `deriveOutputBias()` can skip generating it when it only fired due to a stalemate (route.ts) | `scripts/test-inline-practice.ts`, `scripts/test-teaching-output-bias.ts` |
| 7 | `[ASSESSMENT_RESULT correctness=X reasoning=Y confidence=Z]` | Server emits per-instruction (route.ts ~1046-1060); parsed client-side via `parseAssessmentResultTag()` | none — embedded text tag, stripped client-side | Indirectly — triggers a call to `/api/assessment/evaluate`, which shows a result banner | **No** (not a visual/practice suppression candidate — pure scoring signal) | `scripts/test-parse-assistant-tags.ts` |
| 8 | `[MATH_ANSWER expected=X got=Y]` / `[CODE_ANSWER expected="" got=""]` | Embedded text tag, stripped client-side via `parseMathCodeAnswerTags()` | none | No — scoring signal only, forwarded to `/api/assessment/evaluate` as `mathChecks`/`codeChecks` | **No** (same rationale as #7) | `scripts/test-parse-assistant-tags.ts` |
| 9 | `[LESSON_COMPLETE]` | Embedded text control tag, parsed client-side via `parseLessonCompletionTag()` | none | No direct render — triggers `handleLessonComplete()` progress advance | **No** (not a suppression candidate — it's a completion signal, suppressing it would silently block lesson progress) | `scripts/test-parse-assistant-tags.ts` |
| 10 | `[WE:...]` worked-example progress tag | Parsed server-side via `parseWorkedExampleTag` (route.ts ~1125-1134), persisted to `contextSnapshot.currentWorkedExample` | none — never returned to client | No — server-only bookkeeping | **No** (server-only state, not a rendered/suppressible output) | `scripts/test-worked-example-tag.ts`, `scripts/test-worked-example-intent.ts` |
| 11 | `[HINT]...[/HINT]` | Embedded text tag the LLM emits when instructed; extracted/stripped via `parseHintTag()` (`hintTag.ts`) | `hint` (structured field, tag stripped from `content` before response) | Yes — tap-to-reveal `HintCard` candy component (lightbulb icon, collapsible) | **Yes** — `deriveHintBias()` gives `PREFERRED`/`SUPPRESSED`/`NEUTRAL` per strategy; route.ts discards the hint server-side if `SUPPRESSED`, even if the model disobeys the prompt instruction | `scripts/test-hint-action.ts` |

## Confirmed absent from this pipeline
Audio/TTS, flashcards, quizzes (standalone), images, and code-execution blocks are **not**
produced by `/api/learn/chat` at all — each lives in a wholly separate component/route
outside this response shape.

## Gaps — status as of this revision

**A) Types missing entirely (never generated by the pipeline)**
- None found within the existing `msg.content`/visual/sceneSpec/hint schema scope.
  (Audio, flashcards, quizzes, images, code-execution remain out-of-scope architecturally.)

**B) Types generated but not rendered with dedicated UI**
- **CLOSED.** #6 Inline practice MCQ now has a dedicated `InlinePracticePrompt` candy
  component with structured question/options/answer-capture/scoring, replacing the old
  bare-markdown rendering. (commit `a06ca43`)

**C) Types rendered but not bias-weighted in `teachingOutputBias.ts`**
- **CLOSED.** #1 `visual` (VisualType tag) is now inspected via `isOptionalVisualTag()` —
  a `SUPPRESS_OPTIONAL` strategy drops the LLM's own free-text visual tag, not just
  `VisualSpec` visuals.
- **CLOSED.** #3/#4/#5 `sceneSpec` (rule-based, parametric, free-form) are now inspected via
  `isRequiredSceneSpec()`. The policy is "always required" by deliberate, documented design
  (scenes only ever fire after the 2D pipeline + feature-flag gates already filtered out
  incidental cases), made explicit and auditable in the bias layer rather than left as a
  silent blind spot.

**D) Types not covered by any harness**
- **CLOSED.** #7/#8/#9 tag parsing/dispatch is now extracted into pure functions in
  `parseAssistantTags.ts` (actually imported and used by `LessonScreen.tsx`, not just
  defined alongside it) and covered by `scripts/test-parse-assistant-tags.ts` (32
  assertions).
- #1 and #6's underlying *generation/decision* logic harnesses (`test-parse-visual-tag.ts`,
  `test-inline-practice.ts`) were already adequate; both fields are now structured JSON
  (not raw text requiring a separate client-side parse step), so there is no remaining
  "client-side consumption" parsing gap to harness for either.

**E) New since the original audit — `[HINT]` action type**
- Added this session, not present in the original inventory: a new `[HINT]` control tag,
  `hintTag.ts` parser, `deriveHintBias()` strategy weighting, server-side `SUPPRESSED`
  enforcement, and a tap-to-reveal `HintCard` UI. Covered by `scripts/test-hint-action.ts`
  (19 assertions). See `HINT_BIAS` in `teachingOutputBias.ts` for the per-strategy mapping —
  this was built against an external task spec naming strategies (`SOCRATIC`, `SCAFFOLDED`,
  `DIRECT_INSTRUCTION`) that don't exist in `TeachingStrategyType`; the mapping onto the 7
  real strategy types is traceable to each strategy's `STRATEGY_ACTION_DIRECTIVE` text but
  has not been explicitly confirmed by a human reviewer.

## Status summary

All gaps (A/B/C/D) identified in the original audit are closed as of commit `2c868a7`. No
further action items remain from this audit; a fresh audit would be needed to surface any
new gaps introduced by future changes.
