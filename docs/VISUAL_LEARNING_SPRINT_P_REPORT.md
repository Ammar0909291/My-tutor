# Visual Learning Sprint P — Adaptive Visual Guidance

**Goal**: Connect visual intelligence to the learner experience — begin
showing learners (in the dev viewer only) what visual areas need
improvement, by turning Sprint N/O's profile, weaknesses, and
recommendations into plain-language guidance messages. No grading,
curriculum, XP, or Tutor Max prompt changes; no production UI.

## 1. Guidance architecture

```
EvidenceRecord (type: VISUAL, Sprint M)
   -> getVisualLearningProfile(userId)            (Sprint N, unmodified)
   -> detectVisualWeaknesses(profile)              (Sprint N, unmodified)
   -> buildVisualLearningRecommendations(profile)  (Sprint O, unmodified)
   -> generateVisualGuidance(profile, weaknesses,  (visualGuidance.ts, Sprint P — NEW)
        recommendations)
   -> GET /api/visual-mastery/persist              now also returns { guidance }
   -> VisualMasteryViewer (dev-only)                displays guidance
```

`docs/VISUAL_ADAPTIVE_EXPERIENCE_AUDIT.md` (Task 1) audited
`PracticeQuiz`, `AssessmentQuiz`, `MockTestQuiz`, and the revision system
(`spacedRevision.ts`) to find where adaptive visual guidance *could* be
shown safely in a future production rollout. All three quiz components
already have a stable, scoring-independent results-phase insertion point
(immediately after `persistVisualMasterySummary()` fires, between the
existing "Weak Areas"/chapter-breakdown card and the Learning Navigator
card) — but per the brief, no quiz component is modified this sprint;
Sprint P's actual code stays confined to a new pure module
(`src/lib/visuals/visualGuidance.ts`) and the existing dev-only viewer
and persist route, exactly mirroring the Sprint N/O pattern. None of
Sprints M–O's existing visual mastery modules
(`VisualMasterySignal`, `VisualLearningProfile`,
`detectVisualWeaknesses`, `buildVisualLearningRecommendations`,
`VisualMasteryViewer`'s existing sections, the persistence adapter) were
rebuilt or modified — `generateVisualGuidance()` reads their outputs only.

## 2. Guidance model

`VisualGuidance` (`src/lib/visuals/visualGuidance.ts`):

```ts
interface VisualGuidance {
  visualType: VisualMasteryEngine
  status: 'needs_improvement' | 'strong'
  message: string
}
```

`generateVisualGuidance(profile, weaknesses, recommendations)` is a pure
function — it never recomputes weakness detection or recommendations
itself (both are passed in from Sprint N/O's existing outputs, so
guidance can never drift from their thresholds):

- For each weak visual type (from `detectVisualWeaknesses()`), it looks
  for the student's strongest visual type (completion rate ≥ 75%, a
  separate "strength" threshold from the 50% weakness threshold) and
  builds a comparison sentence: `"You perform better with {strong} than
  {weak}. Consider reviewing more {weak}-based activities."` — matching
  the brief's exact example. If no strong type exists yet, it falls back
  to the existing recommendation text instead.
- For each strong visual type, it adds a `status: 'strong'` entry with a
  simple performance-affirming message.
- No scoring, no grading, no XP — every field is plain text or a status
  label; nothing is persisted, and nothing feeds into question
  generation, curriculum, or any existing recommendation tier.

## 3. Demonstration results

Verified end-to-end against the local dev server and the seeded demo
account (`shot.student@mytutor-demo.local`), persisting strong graph,
strong geometry, and weak process-flow sessions, then reading the
extended `GET /api/visual-mastery/persist` response:

```
POST graph         -> 200 {"saved":1}  (shown:16 interacted:16 completed:15)
POST geometry       -> 200 {"saved":1}  (shown:12 interacted:11 completed:10)
POST process_flow   -> 200 {"saved":1}  (shown:10 interacted:4  completed:2)
GET  -> 200

Visual Learning Profile:
  graph         completionRatePct: 94
  geometry      completionRatePct: 83
  process_flow  completionRatePct: 20

Weak Visual Areas:        [process_flow, 20%]
Visual Learning Recs:     [process_flow -> "Practice more process-flow activities"]

Visual Guidance:
  process_flow  needs_improvement
    "You perform better with graphs than process flows. Consider
     reviewing more process_flow-based activities."
  graph         strong
    "Strong performance with graphs (94% completion)."
  geometry      strong
    "Strong performance with geometry visuals (83% completion)."
```

Correctness verified: graph (94%) and geometry (83%) were both correctly
classified `strong` (≥75% threshold) and excluded from weaknesses;
process_flow (20%) was correctly flagged `needs_improvement`, and its
guidance message correctly named the *strongest* available type (graph,
94%, the highest of the two strong types) rather than geometry — matching
the brief's "Graph strong, Geometry strong, Process Flow weak" scenario
exactly. Confirmed zero new `TopicProgress` rows for the three demo topic
slugs used. Demo `EvidenceRecord` rows were deleted after verification;
no demo data was left behind.

## 4. Future adaptive opportunities (Task 5 + Task 7 — review only, not implemented)

- **Revision planning** (`spacedRevision.ts`): guidance messages could
  annotate `getDueRevisions()`'s results in a future presentation layer —
  e.g. surfacing "this due topic also needs process-flow review" — as a
  read-only merge of two independent lists, never inside
  `advanceRevision()` or the interval schedule.
- **Study recommendations**: a future dashboard widget could read
  `guidance` directly and link into the relevant visual practice flow —
  the audit (Task 1) already identified the exact JSX insertion point in
  each quiz component's results phase, between the existing weak-areas
  card and the Learning Navigator card, for whenever that rollout happens.
- **Visual remediation**: a future "remediation" surface could group a
  student's `needs_improvement` guidance entries into a dedicated
  practice queue, prioritized by `completionRatePct` (lowest first,
  already the sort order `detectVisualWeaknesses()` produces).
- **Adaptive practice** (mock test engine's existing
  weak/average/strong question mix): could eventually blend
  `VisualGuidance` status into its selection weighting alongside
  `MistakeRecord`-based weak-topic detection — not wired in this sprint;
  guidance remains informational text only.
- **Teaching Strategy Engine** (`planVisualTeaching()`, Sprint I): could
  prefer a strong visual type over a weak one for a given concept when
  both could render it, using `guidance`'s strong/weak labels as a future
  bias signal — a read of historical performance, not a change to how any
  visual renders today.

All of the above are described as *possible future reads* of `guidance`
output — none are implemented this sprint, per the brief's "No
implementation" instructions for Tasks 5 and 7.

## 5. Remaining gaps

- The 75% "strong" threshold (`VISUAL_STRENGTH_THRESHOLD_PCT`) is a new,
  independent constant from Sprint N's 50% "weak" threshold — a visual
  type between 50–74% is neither flagged weak nor labeled strong; this is
  intentional (avoids over-claiming strength on mediocre data) but worth
  noting as a documented gap rather than an oversight.
- `generateVisualGuidance()` picks a single "strongest" comparison type
  per weak entry — a student weak in two types only ever compares each
  against the single best type, never against each other.
- Inherits Sprint N's lack of time-windowing (whole-history aggregation),
  so guidance can reference performance from old sessions as if current.
- As with Sprints M–O, `GET /api/visual-mastery/persist` remains a normal
  authenticated route, not itself environment-gated — only
  `VisualMasteryViewer` and `/dev/visual-demo` hide the data from end
  users.
- No screenshots were captured of the extended viewer's new "Learner
  Guidance" section (same gap noted in every prior sprint's report).

## Validation results

```
npx tsc --noEmit   -> clean, zero errors
npm run build      -> succeeded, exit code 0; all pages generated;
                      /api/visual-mastery/persist present in the route list.
```

Sprint B–O functionality unchanged: no edits to any renderer, collector,
persistence adapter, quiz component, or any of Sprint N/O's existing
visual mastery modules (`visualMasteryProfile.ts`,
`visualMasteryRecommendations.ts`) this sprint — `generateVisualGuidance()`
lives in its own new file and only imports their existing exported types
and functions. The only modified existing files are
`src/app/api/visual-mastery/persist/route.ts` (GET handler gains one
additive response field, `guidance` — POST handler and
`records`/`profile`/`weaknesses`/`recommendations` fields unchanged) and
`src/components/visuals/VisualMasteryViewer.tsx` (one new dev-only
display section added; existing sections unchanged). All audited quiz
components (`PracticeQuiz.tsx`, `AssessmentQuiz.tsx`, `MockTestQuiz.tsx`)
and the revision system (`spacedRevision.ts`) were not modified.
`TopicProgress`, `StudentProgress`, XP, pass/fail rules, curriculum, and
Tutor Max prompts were not read or written by any new Sprint P code —
confirmed directly during the Section 3 demonstration (zero new
`TopicProgress` rows from the verification POSTs).
