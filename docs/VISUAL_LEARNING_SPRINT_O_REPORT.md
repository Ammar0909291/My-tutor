# Visual Learning Sprint O — Visual Learning Recommendations

**Goal**: Create Visual Learning Recommendations — turn Sprint N's detected
visual weaknesses into a small, typed, text-only recommendation list.
Recommendations only; no adaptive behavior, curriculum change, or
question-selection influence this sprint.

## 1. Recommendation architecture

```
VisualLearningProfile (Sprint N)
   -> detectVisualWeaknesses(profile)             (visualMasteryProfile.ts, Sprint N — unmodified)
   -> buildVisualLearningRecommendations(profile)  (visualMasteryRecommendations.ts, Sprint O — NEW)
   -> GET /api/visual-mastery/persist              now also returns { recommendations }
   -> VisualMasteryViewer (dev-only)                displays recommendations
```

`docs/VISUAL_RECOMMENDATION_AUDIT.md` (Task 1) extended Sprint N's audit to
recommendation systems, revision systems, and study tools (flashcards,
quiz/practice/assessment/mock generation and submission, revision notes).
Confirmed: none of them read visual-engagement data today; the only
XP-writing study tool (`flashcards/route.ts`) and the only
grading-writing tools (practice/assessment/mock submit routes) are
untouched by this sprint. The new recommendation module
(`src/lib/visuals/visualMasteryRecommendations.ts`) is a standalone file
that reads Sprint N's `detectVisualWeaknesses()` output — it does not
modify `visualMasteryProfile.ts`, and it is not called by, and does not
call into, any of the audited recommendation/revision/study-tool files.

## 2. Recommendation model

`VisualLearningRecommendation` (`src/lib/visuals/visualMasteryRecommendations.ts`):

```ts
interface VisualLearningRecommendation {
  visualType: VisualMasteryEngine
  reason: string          // e.g. "completion rate below 50% (25%, 2/8)"
  recommendation: string  // e.g. "Practice more process-flow activities"
}
```

`buildVisualLearningRecommendations(profile, thresholdPct = 50)` is a pure
function: it delegates weakness detection entirely to Sprint N's
`detectVisualWeaknesses()` (not reimplemented), then maps each weak entry
to a recommendation using a small per-visual-type text table
(`RECOMMENDATION_TEXT`), falling back to a generic
`"Practice more {visualType} activities"` string for any future engine.
Matches the brief's exact example shape
(`{ visualType: "process_flow", reason: "completion rate below 50%",
recommendation: "Practice more process-flow activities" }`). No Prisma
dependency, no writes, no scoring/grading semantics — `reason` and
`recommendation` are both plain descriptive strings, never persisted
anywhere and never fed into question generation, curriculum, or any
existing recommendation tier this sprint.

## 3. Demonstration results

Verified end-to-end against the local dev server and the seeded demo
account (`shot.student@mytutor-demo.local`), persisting a strong graph
session and a weak process-flow session, then reading back the extended
`GET /api/visual-mastery/persist` response:

```
POST graph         -> 200 {"saved":1}   (shown:20 interacted:20 completed:18)
POST process_flow  -> 200 {"saved":1}   (shown:8  interacted:3  completed:2)
GET  -> 200

Visual Learning Profile:
  graph         shown:20 interacted:20 completed:18  completionRatePct: 90
  process_flow  shown:8  interacted:3  completed:2    completionRatePct: 25

Weak Visual Areas:
  [{ visualType: "process_flow", shown: 8, completed: 2, completionRatePct: 25,
     recommendation: "Low completion on process_flow visuals (25%, 2/8) —
     consider revisiting process_flow-based practice." }]

Visual Learning Recommendations:
  [{ visualType: "process_flow",
     reason: "completion rate below 50% (25%, 2/8)",
     recommendation: "Practice more process-flow activities" }]
```

Strong `graph` performance (90%) correctly produced **no** recommendation;
weak `process_flow` performance (25%) correctly produced exactly one,
matching the brief's strong-graph/weak-process-flow demonstration
requirement. Confirmed zero new `TopicProgress` rows for the two demo
topic slugs used — the recommendation layer is fully isolated from
grading tables. Demo `EvidenceRecord` rows were deleted after
verification; no demo data was left behind.

## 4. Adaptive-learning opportunities (Task 5 + Task 7 — review only, not implemented)

- **Revision planning** (`src/lib/school/adaptive/spacedRevision.ts`):
  `buildVisualLearningRecommendations()`'s output could one day annotate
  `getDueRevisions()`'s results — e.g. "this due topic also has a
  process-flow recommendation" — as a read-only enrichment, never by
  writing to `advanceRevision()`'s fields or the interval schedule.
- **Study sessions / weak-area review**: a future "visual practice"
  surface could read the recommendation list directly and offer a
  one-click link into that visual type's practice flow — purely a UI
  affordance over existing data, no new grading or scoring path.
- **Adaptive practice** (mock test engine's existing weak/average/strong
  question mixing in `mockTestEngine.ts`): a future sprint could blend
  `VisualLearningRecommendation` into the question-selection mix alongside
  the existing `MistakeRecord`-based weak-topic weighting — but this
  sprint deliberately does not wire that in; recommendations remain
  informational text only.
- **Teaching Strategy Engine** (`planVisualTeaching()`, Sprint I): could
  eventually prefer a different visual type for a concept when the
  student's recommendation list flags their current default type as weak
  — a read of historical recommendation data biasing a future teaching
  choice, not a change to how any visual renders or grades today.
- **Recommendation ordering** (`getTopRecommendation()`'s 8-tier order):
  the recommendation list could become a low-priority 9th tier, never
  reordering or replacing the existing 8, exactly mirroring the pattern
  already documented for Sprint N's weakness list.

All of the above are described as *possible future reads* of
`VisualLearningRecommendation` output — none are implemented this sprint,
per the brief's "No implementation" instructions for Tasks 5 and 7.

## 5. Remaining gaps

- Recommendation text (`RECOMMENDATION_TEXT`) is a small static table keyed
  by the four existing visual engines — a future engine would need a new
  entry, though the generic fallback string already covers that case
  safely.
- The 50% weakness threshold and its resulting recommendations inherit
  Sprint N's lack of time-windowing (whole-history aggregation, not
  recency-weighted) — a topic struggled with months ago still triggers a
  recommendation today.
- As with Sprints M and N, `GET /api/visual-mastery/persist` remains a
  normal authenticated route, not itself environment-gated — only
  `VisualMasteryViewer` and `/dev/visual-demo` hide the data from end
  users.
- No screenshots were captured of the extended viewer's new
  "Recommendations" section (same gap noted in Sprints L, M, and N).

## Validation results

```
npx tsc --noEmit   -> clean, zero errors
npm run build      -> succeeded, exit code 0; all pages generated;
                      /api/visual-mastery/persist present in the route list.
```

Sprint B–N functionality unchanged: no edits to any renderer, collector,
persistence adapter, quiz component, or Sprint N's
`visualMasteryProfile.ts` this sprint. The only modified existing files
are `src/app/api/visual-mastery/persist/route.ts` (GET handler gains one
additive response field, `recommendations`, computed from the
already-built profile — POST handler and `records`/`profile`/`weaknesses`
fields unchanged) and `src/components/visuals/VisualMasteryViewer.tsx`
(one new dev-only display section added; existing sections unchanged).
All audited recommendation, revision, and study-tool files
(`learningNavigator.ts`, `learningOrchestrator.ts`, `spacedRevision.ts`,
`revisionNotes.ts`, `flashcards/route.ts`, chapter
practice/assessment/mock generation and submission routes,
`final-assessment/generate/route.ts`) were not modified. `TopicProgress`,
`StudentProgress`, `Flashcard`, XP, pass/fail rules, and Tutor Max
prompts were not read or written by any new Sprint O code — confirmed
directly during the Section 3 demonstration (zero new `TopicProgress`
rows from the verification POSTs).
