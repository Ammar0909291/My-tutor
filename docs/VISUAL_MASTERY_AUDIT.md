# Visual Mastery Audit — Sprint K, Task 1

Audits `VisualSpec`, `TeachingStrategy`, and the Practice/Assessment
integration sites to determine exactly where a mastery *signal* already
exists today, and exactly where it stops — i.e. where Sprint K's new
`VisualMasterySignal` model would need to begin. Read-only audit; no code
referenced here was changed as part of this task.

## 1. VisualSpec (`src/lib/visuals/visualSpec.ts`)

Every spec type (`graph`, `number_line`, `geometry`, `process_flow`) already
carries two optional, purely-presentational fields:

- `interactive?: boolean` — opt-in drag/reorder interaction (Sprint F).
- `challenge?: {...}` — an opt-in, type-specific set of target values
  (Sprint G): `targetSlope`/`targetIntercept` (graph), `targetValue`/
  `targetRelation`/`order` (number_line), `targetArea`/`targetPerimeter`/
  `targetAngle`/`targetRadius` (geometry); `process_flow`'s challenge is an
  empty object whose mere *presence* turns on reorder-success checking.

**What this gives us**: a `VisualSpec` already states *whether a mastery
check is possible* (`challenge` present) and *what the correct target is*
(the challenge's own fields). This is the entire "ground truth" half of a
mastery signal — already shipped since Sprint G, unchanged by Sprints H/I/J.

**What this does NOT give us**: any record of what the student *did*. The
schema is a pure, stateless description of the visual to render — it is
never mutated by interaction and is never sent anywhere after being
rendered. There is no field for "was this met", "how many attempts", or
"when".

## 2. TeachingStrategy (`src/lib/visuals/teachingStrategy.ts`)

`selectTeachingStrategy()` decides, per concept, whether `assessment` should
be `true` (graph: always; geometry: only with a task keyword; process_flow:
always; number_line: never, by design — see Sprint H's documented
"no safe target to grade" rationale). `deriveChallenge()` then computes the
challenge's target values from the spec's own (already-correct) numbers.

**What this gives us**: a clean, deterministic, server-callable decision of
*which* visuals are mastery-checkable at all, computed once per piece of
content, with no AI/LLM involvement — exactly the granularity a
`VisualMasterySignal.concept`/`visualType` pair needs to be tagged against.

**What this does NOT give us**: `planVisualTeaching()` returns a `TeachingPlan
{ strategy, spec }` and nothing else — no event is emitted, no callback is
invoked, no result is persisted. The "did the student meet the challenge"
question is answered entirely inside the renderer component (see Section 4
below) and never travels back through `teachingStrategy.ts` at all.

## 3. Practice Integration (`PracticeQuiz.tsx`) and Assessment Integration (`AssessmentQuiz.tsx`, `MockTestQuiz.tsx`)

All three components (Sprint I) compute `const visualSpec =
planVisualTeaching(q.question).spec` and render `<VisualRenderer spec=
{visualSpec} />` directly under the question text, as a **self-contained,
read-only UI element**. Confirmed again this sprint:

- `submitAnswers()` in all three components reads only the `answers` state
  (the student's MCQ/true-false/short-answer responses) — it has no
  reference to `visualSpec` at all.
- The API routes those components POST to (`/api/school/practice/submit`,
  `/api/school/assessment/submit`, `/api/school/mock/submit`) accept `{
  sessionId, answers[] }` and write `TopicProgress.masteryPct`/`status`,
  `MistakeRecord`, and (assessment) `StudentProgress` — entirely from the
  text-answer grading pipeline. None of these writes know a visual was even
  on screen.

**What this gives us**: confirmation that today's visual rendering is
*completely* decoupled from grading — exactly as designed in Sprint I, and
exactly why a new mastery-tracking layer can be purely additive without
touching `submitAnswers()` or any submit route's grading logic.

**What this does NOT give us**: any path, today, for "the student dragged
the graph's slope handle to the right value" to ever reach a database row,
a score, or a topic-mastery percentage. That signal is generated and then
immediately discarded the moment the component unmounts or the student
moves to the next question.

## 4. Where the Existing "Mastery" Signal Actually Lives Today

Two pre-existing, unrelated mastery systems were found, both entirely
text-answer-driven:

- **`TopicProgress`** (Prisma model) — `status` (NOT_STARTED / IN_PROGRESS /
  COMPLETED / MASTERED / SKIPPED / REVISION), `masteryPct` (0–100),
  `attempts`, `lastScore`. Upserted by Practice/Assessment submit routes,
  per knowledge-graph node, from the MCQ/short-answer score only.
- **`RetentionMetric`** (Prisma model) — `masteryScore`, `confidenceScore`,
  `decayScore`, `reviewCount`, used for spaced-repetition scheduling
  (`src/lib/coach/coachInsights.ts`), again text-answer-driven.

Inside the visual stack itself, the closest thing to a "mastery signal" is
the renderer-local `challengeMet` boolean, computed independently inside
each of the four renderers:

| Renderer | Where `challengeMet`/equivalent is computed | Persisted? | Exposed to a parent component? |
|---|---|---|---|
| `GraphRenderer.tsx` | `challengeMet = slopeOk && interceptOk` (local `useMemo`/inline check against live `model` state) | No | No — no callback prop exists |
| `NumberLineRenderer.tsx` | `challengeMet = placeOk && relationOk && orderOk` (inline check against live `points` state) | No | No |
| `GeometryRenderer.tsx` | Per-shape `ok` boolean fed into a shared `<ChallengeFeedback checks={...} />`, `met = checks.every(c => c.ok)` | No | No |
| `ProcessFlowRenderer.tsx` | `isCorrect = order.every((v, i) => v === i)` | No | No |

**Conclusion**: every one of the four renderers already computes the exact
boolean a `VisualMasterySignal.challengeCompleted` field needs — that
computation is correct, live, and battle-tested since Sprint G. The entire
gap is that the boolean dies inside the component. No renderer exposes a
callback prop today; adding one (Task 2's job, deliberately *designed but
not built* per the brief's "do not redesign existing flows" instruction) is
the only structural change a future sprint would need.

## 5. Summary: What Already Exists vs. What Sprint K Must Add

| Piece | Status |
|---|---|
| Ground truth ("what counts as success") | **Already exists** — `VisualSpec.challenge`'s target fields, since Sprint G |
| Decision of which visuals are checkable | **Already exists** — `TeachingStrategy.assessment`, since Sprint H |
| Live computation of "was it met" | **Already exists, but trapped client-side** — each renderer's local `challengeMet`/`isCorrect` |
| A typed signal describing concept + visual type + outcome | **Does not exist — Sprint K Task 3's job** |
| Any way for that signal to leave the renderer | **Does not exist — Sprint K Task 2 designs this, does not build it** |
| Any persistence/DB table for it | **Does not exist, and explicitly out of scope this sprint** |
| Any connection to existing `TopicProgress`/`RetentionMetric` mastery | **Does not exist — Sprint K Task 4 documents how it *could* connect, without changing grading** |
