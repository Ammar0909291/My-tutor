# Visual Learning Sprint K — Analytics & Mastery Tracking Report

Introduces the *concept* of Visual Learning Analytics and Mastery Tracking:
a typed mastery-signal model and a documented (not built) emission
architecture. No new visual engines, no database changes, no curriculum
changes, no Tutor Max prompt changes, no AI changes. This sprint is
deliberately design/documentation-heavy, per the brief's repeated "document
architecture", "architecture review only", "no implementation" instructions
for Tasks 2 and 6.

## 1. Architecture

### 1.1 What already exists (Task 1 detail — full version in `docs/VISUAL_MASTERY_AUDIT.md`)

The mastery *computation* already exists, scattered across four renderers:

```
GraphRenderer       challengeMet = slopeOk && interceptOk
NumberLineRenderer  challengeMet = placeOk && relationOk && orderOk
GeometryRenderer    met = checks.every(c => c.ok)
ProcessFlowRenderer isCorrect = order.every((v, i) => v === i)
```

Every one of these is a live, correct, client-side boolean — and every one
of them is currently discarded the instant the component unmounts. No
callback prop exists on any of the four renderers to let a parent observe
it; no event is logged; no database row is written.

### 1.2 The proposed emission architecture (Task 2 — designed, not built)

The architecture below describes how a *future* sprint would expose these
already-correct booleans, without touching any existing rendering or
grading logic:

1. **Each renderer gains one new, fully optional prop**: `onMasteryEvent?:
   (event: VisualMasteryEvent) => void`. Optional means every existing
   caller (`VisualDemo.tsx`, `LessonScreen.tsx`, `PracticeQuiz.tsx`,
   `AssessmentQuiz.tsx`, `MockTestQuiz.tsx`) compiles and behaves exactly as
   today if it doesn't pass the prop — the same "purely additive opt-in"
   pattern Sprint F used for `interactive` and Sprint G used for
   `challenge`.
2. **Four event kinds, fired from existing state transitions already
   present in each renderer** (no new state, no new computation):
   - `shown` — fired once, on mount (every renderer already mounts once per
     spec; this is a `useEffect(() => onMasteryEvent?.({kind:'shown'}), [])`
     with no new logic).
   - `interacted` — fired the first time the renderer's *existing*
     drag/reorder handler runs (`onPointerDown`/`startHandleDrag` in
     Graph/NumberLine/Geometry; the ▲▼ reorder handler in ProcessFlow) —
     these handlers already exist and already run; the only change is one
     extra call inside them.
   - `challengeAttempted` — fired the first time the renderer's *existing*
     `challengeMet`/`isCorrect` boolean is computed with a present
     `challenge` (i.e. the first render after `interacted` where a
     challenge exists) — again, the computation already happens every
     render; this just reports that it happened.
   - `challengeCompleted` / `challengeFailed` — fired when that same
     existing boolean flips `true`/stays `false` at the point the student
     stops interacting (e.g. `onPointerUp`) — using the exact value the UI
     feedback line already displays today.
3. **One consumer-side hook, `useVisualMasteryCollector()`**, owned by
   whichever screen renders `<VisualRenderer>` (Learn's `LessonScreen.tsx`,
   the three School Mode quiz components) — buffers `VisualMasterySignal`s
   in memory and flushes them via a *new, additive* API route (not built
   this sprint) such as `POST /api/visual-mastery/log`. This callback-and-
   buffer pattern is structurally identical to the existing `ClientEvent`
   table's PWA-event flow (`prisma/schema.prisma`'s `ClientEventKind`
   enum) — Sprint K's design deliberately mirrors that precedent rather
   than inventing a new persistence shape.
4. **Crucially, nothing about Practice/Assessment/Mock's `submitAnswers()`
   or grading routes changes.** The mastery-event flush is a parallel,
   fire-and-forget POST, exactly like the existing achievement/streak
   checks already fired alongside grading (see `VISUAL_MASTERY_AUDIT.md`
   Section 3) — visual mastery logging would be one more independent
   side-effect, not a change to the scored payload.

This is "document architecture... do not redesign existing flows" taken
literally: every step above reuses an existing state transition, an
existing optional-prop pattern, and an existing event-table precedent. No
component in the repository was changed to enable this design.

## 2. Mastery Model (Task 3)

`src/lib/visuals/visualMastery.ts` (new file, fully additive, not imported
by any existing file — confirmed via `git diff --stat` showing zero
modified files this sprint, only two new files):

```ts
export interface VisualMasterySignal {
  concept: string                      // e.g. "linear_equation", "fraction_placement"
  visualType: 'graph' | 'number_line' | 'geometry' | 'process_flow'
  shown: boolean
  interacted: boolean
  challengeAttempted: boolean
  challengeCompleted: boolean
  observedAt: string                   // ISO-8601
  source?: 'learn' | 'practice' | 'assessment' | 'mock'
  subjectSlug?: string
  topicSlug?: string
  sessionId?: string
}
```

Plus two pure helper functions: `buildVisualMasterySignal(input)` (a typed
constructor with sensible defaults) and `summarizeVisualMastery(signals[])`
(aggregates an array into per-engine `{shownCount, interactedCount,
challengeAttemptedCount, challengeCompletedCount, masteryRate}` — the shape
a future analytics dashboard would read). Both are pure, synchronous,
dependency-free functions — no Prisma, no fetch, no React — matching the
existing style of `teachingStrategy.ts`/`visualConceptDetector.ts`.

The model is intentionally a superset of the brief's example (`{concept,
visualType, challengeCompleted}`) — `shown`/`interacted`/`challengeAttempted`
were added because Task 2's architecture needs to distinguish "never
rendered" from "rendered but ignored" from "rendered, tried, failed" from
"rendered, tried, succeeded" (the brief's own four tracked events:
shown / interacted / completed / failed). The three example fields remain
present and required, unchanged in meaning.

## 3. Integration Opportunities (Task 4)

Reviewed how visual challenge success *could* contribute to Practice/
Assessment/Mock without changing grading:

- **Today**: `TopicProgress.masteryPct` is computed purely from text-answer
  correctness in `evaluatePracticeSession`/`evaluateChapterAssessment`/
  `evaluateMockTest`. A visual challenge result never enters this
  computation.
- **Proposed (not implemented)**: a `VisualMasterySignal` with `source:
  'practice'`/`'assessment'`/`'mock'` and a `sessionId` could be logged
  alongside (not instead of) the existing submission, then read later by a
  *separate*, additive aggregation step — e.g. a new `EvidenceRecord` with
  `type: 'PRACTICE'` and a `notes` JSON payload noting "visual challenge
  also completed for this topic" (the `EvidenceRecord.notes` field is
  already `Json` and already unused for this purpose — see
  `VISUAL_MASTERY_AUDIT.md` Section 4's "extensible fields" finding). This
  would let a future mastery-weighting algorithm treat "got the MCQ right
  AND solved the visual challenge" as stronger evidence than either alone,
  without changing what `submitAnswers()` scores or how `masteryPct` itself
  is calculated this sprint.
- **Why not now**: doing so would mean writing to `EvidenceRecord` (a
  database write) from a new code path, which Sprint K's "DO NOT MODIFY
  DATABASE" rule forbids even though no schema change would be required —
  any new *write*, not just a new *table*, is treated as out of scope this
  sprint. Documented as the clear next step, not attempted.

## 4. Universal-Learning Implications (Task 6 — architecture review only)

The `VisualMasterySignal` shape is already subject-agnostic — `concept` is
a free-text string, `visualType` is one of four generic engines, and
nothing in the type references math/science specifically. This means the
*signal model itself* needs no changes to extend to other domains; only
new *detection* (out of scope, same boundary Sprints I/J drew) would be
needed:

- **Finance**: a percentage/ratio number-line visual (Sprint J) already
  covers "what fraction of your salary is rent" style content — a
  `VisualMasterySignal{concept: 'budget_ratio', visualType: 'number_line'}`
  would need zero model changes, only a finance-specific detector rule
  (future, separate sprint).
- **Programming**: a process-flow diagram already fits "the order of
  operations in a sorting algorithm" or "steps of a binary search" — same
  engine, same signal shape, new `PROCESS_DEFINITIONS`-style content.
- **Medicine**: a process-flow diagram fits "stages of mitosis" or "the
  clotting cascade"; a number-line fits dosage-range or vital-sign-range
  comparisons — both already representable, signal model unchanged.
- **Engineering**: geometry (stress/load diagrams approximated as
  triangles/rectangles) and graph (linear relationships like Ohm's law,
  `V = IR`) already fit; the existing `graph` engine's `y=mx+b` detection
  is domain-blind by construction.
- **History**: the weakest fit — no existing engine naturally represents a
  timeline or causal chain the way `process_flow` represents a sequence of
  *stages* (a process_flow's steps are not date-anchored). A history
  "sequence of events" could technically reuse `process_flow` for ordering
  practice, but anything date/duration-based would still need a Timeline
  Engine — explicitly forbidden to build, in this sprint or implicitly
  signaled as future, separately-scoped work, consistent with every prior
  sprint's "Universal Learning's own detection rules remain future work"
  conclusion (Sprint I's audit, Sprint J's coverage audit).

**Overall conclusion**: the mastery *signal* and its aggregation logic are
already universal — they were designed not to assume mathematics. The
*detectors* that produce concepts in finance/programming/medicine/
engineering/history are the only future work, and that work is bounded by
the same "four engines only, no new engine types" constraint already in
force, except for history's timeline gap, which remains a genuinely open
question for whichever sprint is explicitly asked to address it.

## 5. Demonstrations (Task 7)

Ran the real `planVisualTeaching()` + new `buildVisualMasterySignal()` /
`summarizeVisualMastery()` functions together (via `npx tsx`), simulating
what a future renderer-level emitter would produce for one example per
engine:

```
Graph mastery:
  {"concept":"linear_equation","visualType":"graph","shown":true,"interacted":true,
   "challengeAttempted":true,"challengeCompleted":true,"observedAt":"...","source":"learn"}

Number line mastery (no challenge by design — Sprint H):
  {"concept":"fraction_placement","visualType":"number_line","shown":true,"interacted":true,
   "challengeAttempted":false,"challengeCompleted":false,"observedAt":"...","source":"practice",
   "subjectSlug":"mathematics","topicSlug":"fractions"}

Geometry mastery (challenge attempted, not met):
  {"concept":"triangle_area","visualType":"geometry","shown":true,"interacted":true,
   "challengeAttempted":true,"challengeCompleted":false,"observedAt":"...","source":"assessment",
   "subjectSlug":"mathematics","topicSlug":"geometry"}

Process-flow mastery (reorder challenge met):
  {"concept":"photosynthesis","visualType":"process_flow","shown":true,"interacted":true,
   "challengeAttempted":true,"challengeCompleted":true,"observedAt":"...","source":"mock"}

Aggregate summary (summarizeVisualMastery() over all four):
  graph:        masteryRate = 1   (1/1 challenges completed)
  number_line:  masteryRate = null (0 challenges attempted — expected, by design)
  geometry:     masteryRate = 0   (0/1 challenges completed)
  process_flow: masteryRate = 1   (1/1 challenges completed)
```

This confirms the model and its aggregation correctly distinguish "no
challenge exists for this engine" (`null` rate) from "a challenge existed
and was failed" (`0` rate) from "a challenge existed and was met" (`1`
rate) — exactly the three states Task 4/5's mastery-opportunity analysis
below depends on.

## 6. Coverage Effectiveness Review (Task 5)

| Engine | Strengths | Weaknesses | Mastery opportunities |
|---|---|---|---|
| **Graph** | Live, continuous drag feedback against a real numeric target (slope/intercept); challenge is "on" for every equation, linear or not | Non-linear equations get `assessment: true` but an empty challenge (no live model extraction beyond linear) — a real gap already documented since Sprint H | Highest-value target for mastery tracking: a single graph mastery signal already carries two independent sub-skills (slope identification, intercept identification) — could be split into two signals per attempt in a future sprint |
| **Number Line** | Renders cleanly for fractions/percentages/ratios/probability/statistics (Sprint J) as well as integers; dragging is always safe | Assessment is off by design for every number_line concept (Sprint H's "no safe target to grade" call) — so today it can produce `shown`/`interacted` signals but never a `challengeCompleted` one | The single biggest mastery-tracking gap of the four engines: revisiting Sprint H's no-assessment decision (e.g. fraction *comparison*, where the correct relation between two known fraction values IS unambiguously derivable) is the clearest next win, flagged here as a finding, not actioned this sprint |
| **Geometry** | Per-shape challenge with a real formula-derived target (area/perimeter/angle/radius); gating on task keywords avoids grading a passing mention | Targets are derived from the same numbers already shown (auto-derived challenge "starts already met" — Sprint G/H's documented limitation, unchanged through I/J) — a mastery signal captured at first-render would show false success | Mastery signals should be captured at *interaction end* (`onPointerUp`), not at mount, specifically to avoid the "already met" false positive — already reflected in Task 2's proposed architecture (`challengeCompleted` fires on interaction-end, not on `shown`) |
| **Process Flow** | Every process has a built-in, unambiguous mastery check (correct order) with no derived-target ambiguity at all | Fixed `PROCESS_DEFINITIONS` list (10 processes) caps how many distinct "concepts" can ever generate a process-flow mastery signal | Cleanest mastery signal of the four (binary, no false-"already met" issue) — best candidate for a first real pilot of the Task 2 architecture if/when a future sprint builds it |

## Remaining Gaps

- The Task 2 emission architecture (renderer callback props, the collector
  hook, the log API route) is **designed, not built** — per the brief.
- No persistence layer for `VisualMasterySignal` exists or was created —
  per the brief's "DO NOT MODIFY DATABASE" rule, even an additive new table
  was out of scope.
- No connection from a logged `VisualMasterySignal` to `TopicProgress`/
  `RetentionMetric`/`EvidenceRecord` exists yet — Task 4 documents the
  shape of that connection (`EvidenceRecord.notes`) without implementing it.
- Number Line's complete lack of a `challengeCompleted: true` path (Sprint
  H's no-assessment decision) means three of Sprint J's six new concepts
  (fractions, percentages, probability — all number_line) can currently
  only ever produce `challengeAttempted: false` signals; only ratios and
  statistics share that same limitation by extension. This is the most
  actionable concrete gap surfaced by this sprint's review.
- History (and, more broadly, any subject needing date/duration-anchored
  sequencing) has no natural home in any of the four existing engines —
  confirmed again in Task 6, consistent with every prior sprint's
  conclusion that a Timeline Engine is genuinely separate, scoped work.

## Regression Verification (Task 8)

- `npx tsc --noEmit` → clean, no errors.
- `npm run build` → succeeded (`prisma generate && next build`); every route's
  bundle size is byte-identical to the Sprint J build — confirming the two
  new files (`docs/VISUAL_MASTERY_AUDIT.md`, `src/lib/visuals/
  visualMastery.ts`) are not imported by any existing component or route.
- `git diff --stat` / `git status --short` confirm **zero existing files
  were modified** this sprint — only two new files were added. Sprint B–J's
  renderers, schemas, detectors, teaching strategy, and Practice/Assessment/
  Mock/Learn integrations are byte-for-byte unchanged.
- Re-ran `planVisualTeaching()` (via `npx tsx`) against the same example
  strings used in Sprint J's report (linear graph, fractions, geometry,
  photosynthesis) — output identical to the Sprint J report, confirming no
  detector/builder/strategy regression.
- No database, curriculum, or Tutor Max prompt was modified. No AI/LLM
  logic was touched.
