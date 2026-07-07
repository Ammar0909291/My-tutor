# Visual Adaptive Experience Audit — Sprint P, Task 1

Audit of `PracticeQuiz`, `AssessmentQuiz`, `MockTestQuiz`, the revision
system, and the visual recommendation pipeline, to determine where
learner-facing visual guidance *could* safely be shown in the future,
without touching scoring/grading/XP/pass-fail logic this sprint. Per the
brief, Sprint P's actual integration (Task 4) is dev-viewer-only — this
audit identifies future production insertion points for documentation
purposes (Task 5/7), it does not implement them.

## 1. PracticeQuiz.tsx

- Results phase: `phase === 'results' && result` (~line 350).
  `persistVisualMasterySummary()` already fires at line 88, immediately
  after `setPhase('results')`, fire-and-forget — upstream of and
  unrelated to the results JSX.
- Existing results UI is already sectioned: score card → stats grid →
  "Weak Areas" card (mistake-based) → Learning Navigator's next-step card
  → answer review → action buttons.
- **Safe future insertion point**: a new card between the existing
  "Weak Areas" card and the Navigator card — visually adjacent to, but a
  structurally separate component from, the mistake-based weak-areas
  list. Already imports from `src/lib/visuals` (`planVisualTeaching`,
  `VisualRenderer`, `useVisualMastery`, `persistVisualMasterySummary`),
  so a guidance import would be consistent with existing conventions.

## 2. AssessmentQuiz.tsx

- Results phase: `phase === 'results' && result` (~line 344).
  `persistVisualMasterySummary()` fires at line 92, same pattern as
  Practice — strictly after pass/fail and score are already computed and
  set.
- Same results structure as Practice, plus pass/fail status in the score
  card.
- **Safe future insertion point**: same — between the "Weak Areas" card
  and the Navigator/next-chapter block. Never touches the pass/fail
  status or score card itself.

## 3. MockTestQuiz.tsx

- Results phase: `phase === 'results' && result` (~line 340).
  `persistVisualMasterySummary()` fires at line 114, same fire-and-forget
  pattern, after exam-readiness recompute.
- Results structure: score card → strong/weak topics grid → chapter
  breakdown → Navigator card → answer review → CTAs.
- **Safe future insertion point**: between the chapter-breakdown card and
  the Navigator card — isolated from scoring, timing, and exam-readiness
  computation.

## 4. Revision systems

- `src/lib/school/adaptive/spacedRevision.ts` — `getDueRevisions()` is
  read-only (reads `TopicProgress`). `advanceRevision()` is the only
  write, touching only `revisionCount`/`lastRevisionAt`/`status` — never
  read or written by anything visual-mastery-related, this sprint or
  prior ones.
- **Safe future insertion point**: a revision-planning surface could read
  guidance output alongside `getDueRevisions()`'s list (two independent
  reads merged client-side or in a presentation layer), never inside
  `spacedRevision.ts` itself.

## 5. Visual recommendation pipeline

- `GET /api/visual-mastery/persist` already returns
  `{ records, profile, weaknesses, recommendations }` (Sprints M–O). No
  grading/scoring/XP data is read by this route.
- **Safe contribution point for Sprint P**: a new `generateVisualGuidance()`
  helper (Task 3) can consume this same `profile`/`weaknesses`/
  `recommendations` data and produce learner-facing text, extending the
  same route's response additively (one more field), exactly as
  Sprint O added `recommendations` onto Sprint N's `profile`/`weaknesses`.

## Conclusion

All three quiz components already have a stable, scoring-independent
results-phase insertion point, and the revision system has zero overlap
with visual-mastery data. Sprint P's actual code changes (per Task 4)
stay confined to the dev-only `VisualMasteryViewer` and the existing
`GET /api/visual-mastery/persist` route — no quiz component is modified
this sprint. The insertion points identified above are documented for a
*future* sprint's production rollout (Task 5/7), not built now.
