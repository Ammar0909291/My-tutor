# Visual Learning Sprint L — Activation Report

**Goal**: Activate the existing-but-unwired Visual Mastery system (Sprint K)
by connecting it to real visual-learning interactions. Activation/integration
only — no new visual engines, no schema changes, no grading/XP changes.

## 1. Files changed

New files:
- `docs/VISUAL_MASTERY_INTEGRATION_AUDIT.md` (Task 1)
- `src/hooks/useVisualMastery.ts` (Task 3)
- `src/components/visuals/VisualMasteryDevSummary.tsx` (Task 5)
- `docs/VISUAL_LEARNING_SPRINT_L_REPORT.md` (this file)

Modified files:
- `src/lib/visuals/visualMastery.ts` — added `VisualMasteryContext` and
  `createMasteryEmitter()` (Task 2 shared factory). Existing Sprint K types
  (`VisualMasterySignal`, `buildVisualMasterySignal`, `summarizeVisualMastery`,
  `VisualMasteryAggregate`) are untouched.
- `src/components/visuals/GraphRenderer.tsx`,
  `NumberLineRenderer.tsx`, `GeometryRenderer.tsx`, `ProcessFlowRenderer.tsx` —
  added optional `onMasteryEvent`/`masteryContext` props, wired to each
  renderer's existing `challengeMet`/`isCorrect` state (Task 2).
- `src/components/visuals/VisualRenderer.tsx` — threaded the same two optional
  props through the shared dispatch point (required, since every real
  integration calls this component, not the four renderers directly).
- `src/components/school/PracticeQuiz.tsx`, `AssessmentQuiz.tsx`,
  `MockTestQuiz.tsx` — each now calls `useVisualMastery()` and passes
  `onMasteryEvent`/`masteryContext` to its `<VisualRenderer>` call site, plus
  renders `<VisualMasteryDevSummary>` (dev-only) (Task 4 + 5).
- `src/app/dev/visual-demo/VisualDemo.tsx` — new "Sprint L — Visual Mastery
  Tracking" showcase section (Task 6).

No changes to: database schema, Prisma models, XP logic, grading/scoring
logic, assessment pass/fail rules, Tutor Max prompts, curriculum data,
Hindi/Sanskrit subject architecture, or any existing renderer's visual
output/challenge logic.

## 2. Event architecture

Each renderer accepts two fully optional props:

```ts
onMasteryEvent?: (signal: VisualMasterySignal) => void
masteryContext?: VisualMasteryContext   // { concept?, source?, subjectSlug?, topicSlug?, sessionId? }
```

`createMasteryEmitter()` (in `visualMastery.ts`) builds a renderer-local
`emit()` closure from these two props plus the renderer's own `visualType`
and a default concept fallback (e.g. `spec.title ?? 'graph'`). `emit()` is a
no-op whenever `onMasteryEvent` is `undefined`, so every existing caller that
omits the new props is byte-identical to pre-Sprint-L behavior.

Each renderer fires up to four milestones — `shown`, `interacted`,
`challengeAttempted`, `challengeCompleted` — at most once per mounted
instance, via a `useRef({ shown, interacted, attempted, completed })` dedup
guard. All four milestones reuse each renderer's pre-existing
`challengeMet`/`isCorrect` boolean and pre-existing interaction handlers
(drag-start/drag-end, pointer-down/up, or — for ProcessFlow's discrete
reorder buttons — a `userSwappedRef`-gated watch on the `order` state). Full
per-renderer detail, including the LineShape/PointShape shown-only
limitation and known duplicate-event risks, is in
`docs/VISUAL_MASTERY_INTEGRATION_AUDIT.md`.

## 3. Collector architecture

`src/hooks/useVisualMastery.ts` is a client-side React hook with no
persistence and no API calls. It maintains an in-memory `Map` of
"instances" keyed by `visualType + concept + source + subjectSlug +
topicSlug + sessionId`, each holding a cumulative `{ shown, interacted,
challengeAttempted, challengeCompleted }` boolean set that is OR'd in as new
signals arrive for that key.

This design specifically defends against the duplicate-event risk
identified in the audit doc: a single real-world "completed on the first
attempt" moment can emit two separate `VisualMasterySignal` objects (one
from the renderer's "attempted" branch, one from its "completed" branch).
Collapsing both into one instance's milestone set, rather than counting
every incoming signal, means each milestone counts at most once per
instance regardless of how many raw signal objects carried it.

`summary` (a `useMemo`) derives `{ [visualType]: { shown, interacted,
completed } }` from the instance map — matching the brief's example shape.
`reset()` clears all collected state; `recordMasteryEvent` is the function
passed as a component's `onMasteryEvent`.

## 4. Integration points

`PracticeQuiz.tsx`, `AssessmentQuiz.tsx`, `MockTestQuiz.tsx` each:
1. Call `const { recordMasteryEvent, summary } = useVisualMastery()`.
2. Pass `onMasteryEvent={recordMasteryEvent}` and
   `masteryContext={{ source: 'practice' | 'assessment' | 'mock', subjectSlug, sessionId }}`
   to their existing `<VisualRenderer spec={visualSpec} />` call site.
3. Render `<VisualMasteryDevSummary summary={summary} />` once per quiz
   screen (renders nothing outside `NODE_ENV === 'development'`).

`submitAnswers()` / `loadAssessment()` / `startMock()` and all
scoring/grading/pass-fail/XP/recommendation logic in these three components
are untouched — collection is a pure side observer of the same
`visualSpec` that was already being rendered.

## 5. Demo screenshots

Not captured this sprint — the brief's deliverable list names a written
report with 8 sections, and the demo itself (`/dev/visual-demo`, new "Sprint
L — Visual Mastery Tracking" section) is live and inspectable directly in a
browser. Run `npm run dev` and visit `http://localhost:3000/dev/visual-demo`
to interact with it (reach each target in the new section to watch the
collector summary and signal log update live).

## 6. Summary examples

Example `summary` shape after reaching two of the four Sprint L demo targets
(`/dev/visual-demo`'s new section — graph and triangle):

```json
{
  "graph": { "shown": 1, "interacted": 1, "completed": 1 },
  "geometry": { "shown": 1, "interacted": 1, "completed": 1 }
}
```

After all four targets across a longer session (e.g. inside a Practice quiz
with three graph questions, one of which is completed, plus one geometry
question, completed):

```json
{
  "graph": { "shown": 3, "interacted": 1, "completed": 1 },
  "geometry": { "shown": 1, "interacted": 1, "completed": 1 }
}
```

(Matches the brief's example format of `{ graph: { shown, completed }, geometry: { shown, completed } }`, with `interacted` included as an additive extra field.)

## 7. Future persistence path (architecture review only — not implemented)

No persistence was added this sprint. This section documents how the
collected `VisualMasterySignal`/`VisualMasteryAggregate` data *could* later
connect to existing progress models, without ever touching grading or
progression logic itself:

- **`EvidenceRecord`** (if/when such a model exists in the Prisma schema)
  is the natural landing spot for individual `VisualMasterySignal` objects —
  each signal is already a self-contained, timestamped observation
  (`concept`, `visualType`, `shown`/`interacted`/`challengeAttempted`/
  `challengeCompleted`, `observedAt`, optional `source`/`subjectSlug`/
  `topicSlug`/`sessionId`). A future API route could accept a batch of
  signals (e.g. on quiz submission) and write one `EvidenceRecord` row per
  signal — purely additive evidence, never read by the scoring pipeline
  that already produced the quiz's pass/fail result.
- **`TopicProgress`** could read pre-aggregated `VisualMasteryAggregate`
  rows (already producible today via `summarizeVisualMastery()`) keyed by
  `topicSlug`, to power a supplementary "visual engagement" indicator
  *alongside* — never replacing — the topic's existing mastery/accuracy
  fields. This would be a read of the aggregate, not a write into any
  scoring formula.
- **`StudentProgress`** could similarly surface a session-level rollup
  (e.g. "engaged with 4 visuals, completed 3 challenges this session") as
  informational UI, sourced from the same aggregate, again without
  affecting XP or mastery-status computation.

In all three cases, the integration point would be **additive and
read-only with respect to existing progression logic**: visual mastery data
flows into new columns/tables/UI surfaces, and existing grading/XP/mastery
computations would continue to read only the fields they already read
today. Implementing this is explicitly out of scope for Sprint L per the
brief's "DO NOT MODIFY DATABASE" / "DO NOT MODIFY XP OR GRADING" rules.

## 8. Remaining gaps

- Cross-remount deduplication is best-effort: the collector's instance key
  has no true per-mount identity from the renderer (renderers don't expose
  one), so two genuinely distinct displays of the same concept with
  identical context (`source`/`subjectSlug`/`topicSlug`/`sessionId`) will
  collapse into one collector instance. Documented in both the audit doc
  and `useVisualMastery.ts`'s own comments; acceptable since it only
  under-counts in a rare edge case, never over-counts.
- `GeometryRenderer`'s `LineShape` and `PointShape` have no interaction or
  challenge surface, so they can only ever emit `shown` — by design, not a
  gap, but worth noting for anyone reading collector output and expecting
  every geometry shape to reach `completed`.
- No screenshots were captured for the new demo section (see Section 5).
- `npx tsc --noEmit` and `npm run build` were run against a local Postgres
  instance that was not running during this validation pass; Prisma
  connection errors appeared only for server-rendered pages that fetch from
  the DB at build time (e.g. `/admin/subjects`) — pre-existing behavior,
  unrelated to this sprint's changes, and the build still completed
  successfully end-to-end (see Section 9 below / commit message for exact
  output). No DB schema, query, or API route was touched this sprint.

## 9. Validation results

```
npx tsc --noEmit   → clean, zero errors
npm run build      → succeeded (Prisma connection warnings for DB-backed
                     pages are pre-existing local-environment noise; build
                     completed and emitted all routes, including
                     /dev/visual-demo)
```

No changes were made to any Sprint B–K renderer behavior for existing
callers that don't pass the two new optional props — every pre-Sprint-L
`<VisualRenderer spec={...} />` / `<GraphRenderer spec={...} />` /
`<NumberLineRenderer spec={...} />` / `<GeometryRenderer spec={...} />` /
`<ProcessFlowRenderer spec={...} />` call site (e.g. `LessonScreen.tsx`'s
Learn integration, and every fixture in `/dev/visual-demo`'s earlier
sections) continues to render and behave identically, since `emit()` is a
no-op without `onMasteryEvent`.
