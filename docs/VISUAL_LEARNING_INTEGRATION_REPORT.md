# Visual Learning Sprint I — Production Integration Report

## 1. Current Visual Coverage

The visual stack supports exactly four engines, unchanged since Sprint B–G: `graph`, `number_line`, `geometry` (triangle/rectangle/circle/angle), `process_flow`. Detection (`src/lib/visuals/visualConceptDetector.ts`) is deterministic regex/keyword matching over plain text — no new keywords or rules were added this sprint.

### Math

| Topic | Coverage | Detail |
|---|---|---|
| Equations (`y = mx + b`, linear) | **Covered** | `graph` engine, live slope/intercept model, full assessment |
| Equations (non-linear, e.g. quadratic) | **Partially covered** | `graph` engine renders/pans/zooms; assessment intent is on (Sprint H) but no live numeric grading — known, documented limitation |
| Geometry (triangle/rectangle/circle/angle with stated dimensions) | **Covered** | `geometry` engine, full interaction + task-keyword-gated assessment |
| Coordinates / plotting a point | **Partially covered** | A bare coordinate pair with no equation does not trigger `detectVisualConcept()` at all — only equations and named shapes are detected; a future detector rule (not built this sprint) would be needed for "plot the point (3, 4)" style text |
| Integers / number-line comparisons | **Covered** | `number_line` engine, interaction on, assessment intentionally off (Sprint H policy — no safe way to disambiguate a target value from an illustrative one) |

### Science

| Topic | Coverage | Detail |
|---|---|---|
| Photosynthesis | **Covered** | `process_flow`, fixed 5-step definition |
| Digestion | **Covered** | `process_flow`, fixed 5-step definition |
| Respiration | **Covered** | `process_flow`, fixed step definition (`PROCESS_DEFINITIONS` in `visualConceptDetector.ts`) |
| Ecosystems (food chain / energy flow) | **Covered** | `process_flow` — two distinct definitions ("Food Chain", "Energy Flow in an Ecosystem") |
| Water cycle | **Covered** | `process_flow`, fixed 4-step definition (evaporation/condensation/precipitation/collection) |
| Other fixed cycles (rock cycle, carbon cycle, states-of-matter changes, chemical reactions) | **Covered** | Same `PROCESS_DEFINITIONS` mechanism, already shipped pre-Sprint-I |
| Any process not in the fixed `PROCESS_DEFINITIONS` list (e.g. nitrogen cycle, mitosis, a novel/uncommon process the tutor describes) | **Not covered** | The list is fixed and curriculum-authored; a process not on it produces no visual at all, even if the tutor's prose clearly describes a sequence — this is the detector's known boundary, not a bug |

**Net assessment**: coverage is strong wherever a concept maps onto one of the four existing engines and matches an existing regex/keyword/fixed-definition; it is absent for anything outside that intersection (bare coordinates, non-fixed processes, any subject area with no equation/shape/number-line/named-process at all — e.g. most of history, language, literature).

## 2. Integration Status

| Surface | Status | How |
|---|---|---|
| **Learn** | Integrated (since Sprint H) | `planVisualTeaching(cleanText).spec` in `src/app/api/learn/chat/route.ts`, rendered via `<VisualRenderer>` in `LessonScreen.tsx`. Re-verified this sprint — no changes needed (Task 2). |
| **School Practice** | **Newly integrated this sprint** | `planVisualTeaching(q.question).spec` computed client-side in `PracticeQuiz.tsx`, rendered under the question text. Zero API/grading changes. |
| **School Assessment** | **Newly integrated this sprint** | Identical pattern in `AssessmentQuiz.tsx`. |
| **School Mock Tests** | **Newly integrated this sprint** | Identical pattern in `MockTestQuiz.tsx`. |
| **Tutor Max / Coach** | Not integrated | By design — Coach is a lightweight planning chat distinct from a tutored Learn lesson; not named in this sprint's task list. Same wiring pattern would apply if a future sprint asks for it. |
| **Revision Notes** | Not integrated | Architecturally possible (same pure functions, same safety profile) but the notes payload is a multi-field structured object, not a single string — deciding which field(s) to scan is a product question left undecided this sprint, not implemented. |

Full detail and file:line citations: `docs/VISUAL_INTEGRATION_AUDIT.md` (Task 1).

### Task 3/4 findings in one line

Graph/number-line/geometry/process-flow challenges **can** appear inside Practice, Assessment, and Mock Test sessions using the existing architecture exactly as-is — no grading-system changes were needed because the visual spec (including its optional `challenge`) is computed and rendered as a self-contained, read-only UI element that the existing `submitAnswers()` flows never read from or write to. The MCQ/true-false/short-answer answer the student submits for scoring is completely independent of whatever the visual's own internal `challengeMet` state shows.

## 3. Production Readiness

**Yes — a real student can encounter visual learning today, in four places:**

1. **Learn** — any tutor response containing a recognizable equation, integer comparison, dimensioned shape, or one of the ten fixed science processes shows a visual under that message, interactive where safe, graded where a deterministic target exists. (Since Sprint H.)
2. **Chapter Practice** — any AI-generated practice question whose text matches the same patterns now shows the same visual under the question, before the student answers. (New this sprint.)
3. **Chapter Assessment** — identical, for assessment questions. (New this sprint.)
4. **Mock Tests** — identical, for mock-test questions, alongside the existing countdown timer. (New this sprint.)

**Limitations a student would notice:**

- Coverage depends entirely on the AI happening to phrase a question in a form the regex/keyword detector recognizes (e.g. the compact `y = mx + b` form for a gradable graph challenge) — an AI-generated question that states the same math concept in different prose may not trigger a visual at all. This is inherent to deterministic detection and was true before this sprint too.
- A quadratic (or any non-linear) graph question shows an interactive graph but no live grading feedback — assessment is "on" at the strategy level with no numeric target, by design (Sprint H), so a sharp student might wonder why dragging shows nothing.
- Auto-derived challenge targets (graph slope/intercept, geometry area/perimeter) are computed from the same numbers already in the spec, so a challenge can read as "already met" before any interaction — a known limitation carried over unchanged from Sprint G/H.
- Revision Notes and Coach never show a visual, even when their text plainly contains a graphable equation or a named process — those two surfaces are simply not wired up yet.

## 4. Gaps Remaining

- No visual integration in Coach/Tutor Max chat (architecturally trivial to add — same one-line pattern as Learn — just not requested this sprint).
- No visual integration in Revision Notes (architecturally possible but needs a product decision on which note field(s) to scan before implementing).
- No detector rule for bare coordinate-pair mentions ("plot the point (3, 4)") — would need a new `DetectedConcept` variant, which is new detection logic, not just new wiring, and therefore out of this sprint's "no new engines/rules" scope.
- No detector coverage for processes outside the fixed `PROCESS_DEFINITIONS` list (e.g. mitosis, the nitrogen cycle) — same reasoning, new curriculum-authored detection content, not wiring.
- No connection between Concept Detection (curriculum/topic/mastery signals) and the Teaching Strategy Engine in any of the four integrated surfaces — every call site still passes raw text only, identical to Sprint H.
- No exercise-perturbation layer — auto-derived challenge targets still start "already met," unchanged from Sprint G/H, now present in three more surfaces (Practice/Assessment/Mock) than before.
- Quiz (`/quiz`) and Flashcards (`/flashcards`) were investigated and confirmed to have zero visual-stack usage; not in this sprint's named task list (it named Practice/Assessment/Mock specifically under School Mode, not the standalone Quiz/Flashcards features), so left untouched and undocumented as gaps rather than implemented speculatively.

## 5. Recommended Next Phase

In priority order, each item below is wiring-only (reusing all four existing engines and the existing Teaching Strategy Engine, no new detection logic, no new renderers):

1. **Coach/Tutor Max** — apply the identical `planVisualTeaching(content).spec` + `<VisualRenderer>` pattern used in Learn and the three School Mode surfaces this sprint. Smallest possible next step, same proven pattern, zero risk.
2. **Revision Notes** — decide (product call, not an engineering one) which field(s) of the structured notes object should be scanned (likely `recallQuestions`, since those most resemble the question-shaped text the detector already handles well), then apply the same pattern per-field.
3. **Quiz/Flashcards** — same pattern, if/when explicitly requested; not assumed needed this sprint since they weren't named in the brief.
4. Anything beyond the above (new detector rules for coordinates or additional science processes, a non-linear graph model extractor, an exercise-perturbation layer) is **new detection/engine logic**, not integration — explicitly out of scope for "integrate the existing stack" sprints and should be proposed as its own, separately-scoped sprint if wanted.

## Regression Verification (Task 8)

- `npx tsc --noEmit` → clean, no errors.
- `npm run build` → succeeded (prisma generate && next build); all routes compiled, including the three modified School Mode pages (`/school/[subject]/chapter/[chapterId]/practice`, `.../assessment`, `/school/[subject]/mock`) and `/api/learn/chat`. Bundle sizes for those three routes grew by a few KB (now importing `VisualRenderer` + the four renderer components), consistent with the new import, not a regression.
- Sprint B–H functionality verified intact: `git diff --stat` confirms only three files changed (`PracticeQuiz.tsx`, `AssessmentQuiz.tsx`, `MockTestQuiz.tsx`), each receiving the identical three-part addition (one import pair, one `const visualSpec = planVisualTeaching(...).spec` line, one conditional `<VisualRenderer>` block) — no renderer, schema, detector, spec builder, teaching-strategy, or chat-route file was touched. No database, curriculum, or Tutor Max prompt was modified.
- Re-ran `planVisualTeaching()` via `npx tsx` against five new School-Mode-style question strings (linear graph, geometry, integers, water cycle, plain definition) — all five produced correct strategy/spec pairs matching the same rules verified in the Sprint H report, confirming the pipeline behaves identically whether the input text comes from a tutor message or a practice/assessment/mock question.
- No new visual engines, timelines, or simulations were built. No database, curriculum, or Tutor Max prompt was modified.
