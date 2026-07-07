# Visual Integration Audit — Sprint I, Task 1

Audits six real learning surfaces — Learn, School Mode, Tutor Max, Practice,
Assessment, Revision Notes — against the existing visual learning stack
(`detectVisualConcept` → `selectTeachingStrategy`/`planVisualTeaching` →
`buildVisualSpec` → `VisualRenderer`). No new engines, renderers, or
detection rules are proposed here — this is purely a "where does the
existing architecture already reach, and where doesn't it yet" survey.

## 1. Learn (`/learn`, `src/app/api/learn/chat`)

**Status: Integrated (production), confirmed in Sprint H.**

- `src/app/api/learn/chat/route.ts` calls `planVisualTeaching(cleanText).spec` and attaches the result as `visualSpec` on the JSON response.
- `src/components/learn/LessonScreen.tsx` (`ChatMsg.visualSpec`, ~line 167; re-validated client-side via `parseVisualSpec` at ~line 562; rendered via `<VisualRenderer spec={msg.visualSpec} />` at ~line 2102) renders it under the tutor's bubble whenever present, gated on `!isUser && !msg.streaming && msg.visualSpec`.
- This is the only pre-Sprint-I production rendering site for `VisualRenderer` (the other usage, `src/app/dev/visual-demo/VisualDemo.tsx`, is dev-only and hand-authors its own specs rather than calling the detection pipeline).

## 2. Tutor Max / Coach (`/coach`, `src/app/api/coach`)

**Status: Not integrated — by design, not a gap.**

- `src/app/api/coach/route.ts` is a lightweight planning/Q&A chat that calls `chatWithFallback()` directly and returns `{ content }` only — no visual detection, no `VisualSpec` field on the response at all.
- `src/app/coach/CoachChat.tsx` stores only `{ role, content }` per message; there is no `VisualRenderer` import anywhere in the coach surface.
- This is the same conversational shape as Learn (free-text tutor responses), so the same `planVisualTeaching()` call could be wired in with the same minimal-blast-radius pattern Sprint H used for `route.ts`. Not done this sprint (see Section "Recommended Next Phase" in the final report) since the brief scopes this sprint to auditing + the practice-family integration, and Coach's product purpose (quick planning chat, not a tutored lesson) was not explicitly named in the brief's task list.

## 3. School Mode — Practice (`/school/[subject]/chapter/[chapterId]/practice`)

**Status: Was not integrated. Now integrated this sprint (Task 3).**

- `src/app/api/school/practice/generate/route.ts` returns `{ sessionId, chapterTitle, questions: [{ id, type, nodeId, question, options? }], estimatedMinutes }` — the raw `question` string was already sent to the client, untouched, by `toClientQuestion()`.
- `src/components/school/PracticeQuiz.tsx` renders the current question's text at the line `<p>{q.question}</p>` inside the quiz `Card`. Submission/grading (`submitAnswers()`) is a fully separate code path that only ever reads `answers` state — it does not see or depend on anything visual.
- **This sprint**: added `const visualSpec = planVisualTeaching(q.question).spec` and `{visualSpec && <VisualRenderer spec={visualSpec} />}` directly below the question text. Zero API changes (the spec is computed client-side, since `teachingStrategy.ts`/`visualSpecBuilder.ts`/`visualConceptDetector.ts` are pure, dependency-free functions with no Prisma/fs/env access — confirmed safe to call from a `'use client'` component). Zero grading changes.

## 4. School Mode — Assessment (`/school/[subject]/chapter/[chapterId]/assessment`)

**Status: Was not integrated. Now integrated this sprint (Task 3/4).**

- Same shape as Practice: `src/app/api/school/assessment/generate/route.ts` returns the same `ClientQuestion[]` shape; `src/components/school/AssessmentQuiz.tsx` renders question text identically.
- **This sprint**: identical additive change — `planVisualTeaching(q.question).spec` rendered via `<VisualRenderer>` right after the question paragraph, before the answer-input block. `submitAnswers()` and scoring are untouched.

## 5. School Mode — Mock Tests (`/school/[subject]/mock`)

**Status: Was not integrated. Now integrated this sprint (Task 3/4).**

- `src/app/api/school/mock/generate/route.ts` returns the same `ClientQuestion[]` shape across all mocked chapters; `src/components/school/MockTestQuiz.tsx` renders question text identically, alongside a countdown timer that is otherwise unrelated to anything visual.
- **This sprint**: identical additive change. The timer, `submitAnswers()`, and per-question navigation are untouched — the visual spec is computed and rendered purely as an extra read-only element under the question text.

## 6. School Mode — Revision Notes (`src/app/api/school/revision`)

**Status: Not integrated. Architecturally possible, but NOT done this sprint — documented gap, not implemented.**

- `getRevisionNotes()` (`src/lib/school/revision/revisionNotes.ts`) returns a **structured** object (`keyConcepts`, `importantTerms`, `recallQuestions`, `highWeightTopics`, `definitions`, `fastRevisionPoints` — field names vary by `noteType`), not a single flat block of prose.
- Unlike a single tutor message or a single quiz question, a revision-notes bundle has many short, dense fields. Running `planVisualTeaching()` across each field independently is *architecturally possible* (the function is just as pure/safe here as anywhere else), but is meaningfully riskier to get right in one sprint: multiple fields could each trigger a different visual, several small visuals stacked in a notes view could clutter a page meant for fast scanning, and which field(s) should be checked (just `recallQuestions`? all of them?) is a product decision, not just a wiring decision. Left undone and flagged here rather than rushed.

## Summary Table

| Surface | Pre-Sprint-I status | Sprint I action |
|---|---|---|
| Learn | Integrated (Sprint H) | Verified only (Task 2) — no change needed |
| Tutor Max / Coach | Not integrated, by design | Documented gap; not in this sprint's scope |
| School Practice | Not integrated | **Implemented** (Task 3) |
| School Assessment | Not integrated | **Implemented** (Task 3/4) |
| School Mock Tests | Not integrated | **Implemented** (Task 3/4) |
| School Revision Notes | Not integrated | Documented gap; architecturally possible, not implemented |

## Decision Gaps Carried Forward From Sprint H (still relevant)

- No wiring exists yet between Concept Detection (curriculum/topic tracking, mastery signals) and the Teaching Strategy Engine — `selectTeachingStrategy()` still only sees raw text, not a learner profile or topic context. Still true after this sprint's practice/assessment/mock wiring, since those call sites pass only `q.question` text, same as Learn passes only `cleanText`.
- No exercise-perturbation layer (Sprint H's "starts already met" challenge-target limitation) — carried into the new practice/assessment/mock surfaces unchanged, since they reuse the exact same `deriveChallenge()` logic.

## Future Universal Learning Compatibility (brief reminder — not built this sprint)

Nothing about this sprint's wiring is math/science-specific: any future surface that has (a) a string of text and (b) a place to render a React node next to it can adopt the identical three-line pattern (`planVisualTeaching(text).spec` → `{spec && <VisualRenderer spec={spec} />}`) used here for Practice/Assessment/Mock. This generalizes the integration pattern, not the detection rules — Universal Learning's own detection rules remain future, separately-scoped work.
