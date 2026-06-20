# Visual Learning Sprint Q Report — Visual Intelligence in the Real Learner Experience

Goal: move visual intelligence from developer-only tooling (Sprint P's
`VisualMasteryViewer`, dev-gated) into the real, production learner
experience — with no changes to grading, XP, curriculum, or Tutor Max
prompts.

## 1. Integration architecture

`VisualLearningInsights` (`src/components/visuals/VisualLearningInsights.tsx`)
is a self-contained, client-side React component:

- It fetches its own data from the existing, already-shipped
  `GET /api/visual-mastery/persist` route (Sprints M–P). It computes
  nothing new — it only re-derives a "strongest area" / "weakest area" /
  "suggestion" label set from the route's `profile`, `weaknesses`, and
  `recommendations` fields.
- It takes **no props**. It is not wired to any quiz component's
  `result`, `passed`, or `mastery` state — it cannot read scoring data
  even by accident, because nothing passes scoring data to it.
- It renders `null` while loading, on fetch error, or when
  `weaknesses.length === 0` (no synthesized "all good!" message).

It is wired into all three results screens (Task 1's audit, in
`docs/VISUAL_PRODUCTION_INTEGRATION_AUDIT.md`, identified the exact
insertion point in each):

| Component | Insertion point |
|---|---|
| `PracticeQuiz.tsx` | After the "Weak Areas" card, before the Navigator next-step card |
| `AssessmentQuiz.tsx` | After the "Weak Areas" card, before the Navigator-or-legacy-next-chapter ternary (outside/upstream of the `passed` branch) |
| `MockTestQuiz.tsx` | After the chapter-breakdown card, before the Navigator next-step card |

Each file received exactly two changes: one import line, one JSX line
(`<VisualLearningInsights />`). No existing state, prop, condition, or
scoring/grading logic in any of the three files was touched.

## 2. Learner insight model

The card surfaces three already-computed facts, unchanged from Sprints
N–O:

- **Strongest Area** — the visual type (Graphs / Number Lines /
  Geometry / Process Flows) with the highest `completionRatePct` in the
  learner's `VisualLearningProfile`, excluding the weakest type.
- **Needs Improvement** — the weakest entry from Sprint N's
  `detectVisualWeaknesses()` (already sorted weakest-first).
- **Suggestion** — the matching Sprint O recommendation text for that
  weak area, or a generic fallback if none exists yet.

No new thresholds, scoring rules, or detection logic were introduced.
The component is a presentation layer over Sprint N/O's existing
outputs.

## 3. Demonstration results

Using the demo account (`shot.student@mytutor-demo.local`), three
`EvidenceRecord(type: VISUAL)` rows were seeded directly (consistent
with every prior sprint's demo-data pattern) to produce a clear
strong/weak signal:

| Visual type | Shown | Completed | Completion rate |
|---|---|---|---|
| graph | 10 | 9 | 90% |
| geometry | 8 | 7 | 88% |
| process_flow | 10 | 1 | 10% |

A full NextAuth credentials login was performed against the running
dev server (`GET /api/auth/csrf` → `POST /api/auth/callback/credentials`
→ authenticated session cookie), then `GET /api/visual-mastery/persist`
— the exact same endpoint `VisualLearningInsights` calls — was hit
as the authenticated user. Response:

- `weaknesses[0]` → `process_flow`, 10% completion.
- `profile` strongest (excluding weakest) → `graph`, 90% completion.
- `recommendations[0].recommendation` → `"Practice more process-flow
  activities"`.

This is exactly the card `VisualLearningInsights` renders from this
data:

```
Strongest Area:      Graphs
Needs Improvement:   Process Flows
Suggestion:          Practice more process-flow activities.
```

This confirms the production data path end-to-end (seed → persisted
evidence → mastery profile → weakness detection → recommendation →
the exact text the new component displays), through the same API route
and computation pipeline the component uses in Practice, Assessment,
and Mock results screens alike — the component's logic does not branch
on which quiz type produced the underlying evidence, so one verified
data path validates all three integration points.

All seeded demo `EvidenceRecord` rows were deleted afterward; confirmed
zero `TopicProgress` rows were created for the demo topic slug, and zero
visual evidence rows remain for the demo user.

## 4. Safety validation

- **Grading**: no quiz component's `result` computation, scoring logic,
  or `/api/school/{practice,assessment,mock}/submit` routes were
  modified. `git diff --stat` for this sprint shows exactly 5 net lines
  added per quiz file (1 import + 1 blank/comment + 1 JSX line), none of
  which reference `result`, `passed`, `mastery`, or any scoring
  variable.
- **XP**: no XP-awarding code path was touched; `VisualLearningInsights`
  performs only a `GET` fetch, no writes.
- **Pass/fail**: in `AssessmentQuiz.tsx`, the new component is placed
  outside and upstream of the `passed ? ... : ...` branch, so it renders
  identically on pass or fail and cannot influence the pass/fail
  determination (which is computed earlier, from the submit response).
- **Curriculum / recommendations engine**: `visualMasteryProfile.ts`,
  `visualMasteryRecommendations.ts`, and `visualGuidance.ts` (Sprints
  N–P) were not modified this sprint — the new component is a read-only
  consumer of their existing outputs via the existing API route.
- **Tutor Max prompts**: untouched; no AI prompt files were read or
  modified in Sprint Q.
- `npx tsc --noEmit`: clean.
- `npm run build`: succeeds (see Validation section below).

## 5. Future roadmap (architecture review only — no implementation)

Future systems could build on today's read-only insight surface without
changing any current learning rule:

- **Adaptive practice ordering**: a future practice-session generator
  could *read* `weaknesses`/`recommendations` to bias which topics are
  offered next — additive prioritization, not a change to how mastery,
  XP, or grading are computed.
- **Coach awareness**: Tutor Max could be given the same
  `profile`/`weaknesses` data as additional read-only context for its
  responses, without any prompt change required this sprint (that would
  be a distinct, explicitly-scoped future sprint, per "DO NOT MODIFY
  TUTOR MAX PROMPTS").
- **Cross-subject aggregation**: today's profile is built from all
  `EvidenceRecord(type: VISUAL)` rows for a user; a future dashboard
  could group by subject without changing the underlying detection
  logic.
- **Notification surface**: the same `weakestArea`/`suggestion` payload
  this card renders could be reused for an email/push nudge, since it's
  already a small, stable, serializable shape.

All of these are additive consumers of the existing, already-built
pipeline (Sprints M–P) — none require new visual engines, new
intelligence, or changes to how a single quiz, lesson, or XP value is
graded.

## Validation

- `npx tsc --noEmit` — clean, zero errors.
- `npm run build` — succeeds; `/api/visual-mastery/persist` and all
  three quiz result routes build as expected, no new route added.
- Demo data: seeded and fully cleaned up; zero residual rows.
- Sprint B–P functionality: untouched — no files outside this sprint's
  three quiz components, the new component, and this sprint's two docs
  were modified.
