# Visual Learning Audit

**Date:** 2026-06-19
**Branch:** `claude/my-tutor-foundation-KDSUO`
**Sprint:** Visual Learning Foundation — Sprint A (Phase 1)
**Scope:** Audit only. No code changed. No application logic, DB, Tutor Max, AI prompts, curriculum, or lesson flow modified.

---

## 0. Headline Finding — a v1 visual system ALREADY EXISTS

The codebase already ships a first-generation visual aid system ("Sprint BW"). Any future work is an **evolution of this**, not a greenfield build. Understanding its exact shape and limits is the point of this audit.

**What exists today:**
- `src/lib/school/visuals/visualTypes.ts` — a closed `VisualType` union of **10** types (`number_line`, `fraction_bar`, `percentage_grid`, `coordinate_plane`, `geometry_shape`, `food_chain`, `water_cycle`, `solar_system`, `force_diagram`, `circuit_diagram`), `VISUAL_META` (title/description per type), and `VISUAL_SUBJECTS = {mathematics, science, math}`.
- `src/components/school/visuals/` — 10 SVG React components + `VisualCard.tsx` (a `switch` dispatcher wrapping them in a card with a "Visual Aid" badge and an accessible description).
- `src/lib/school/visuals/detectVisual.ts` — deterministic keyword matching (`detectVisual`), tutor-tag parsing (`parseVisualTag` for `VISUAL:<type>`), and the system-prompt block (`buildVisualsSystemBlock`).
- `/api/learn/chat` returns an optional `visual?: string` field; `LessonScreen` renders `<VisualCard type={msg.visual} />` beneath a tutor message.

**The defining limitation:** every visual is **static and parameterless**. `<NumberLine />`, `<FractionBar />`, etc. take **no props** — each renders one fixed, generic illustration. A `fraction_bar` cannot show 3/4 specifically; a `coordinate_plane` cannot plot `y = x²`. The current system says *"here is a picture of the general idea,"* not *"here is a diagram of THIS problem."* This is the single most important fact for planning Phase 2+.

**Other limits:**
- **Subjects:** Mathematics + Science only (`VISUAL_SUBJECTS`).
- **Surface:** the Learn screen chat only. Not in chapter detail, practice, assessment, mock, or coach.
- **Quantity:** at most one visual per tutor message (`buildVisualsSystemBlock` enforces "at most ONE").
- **Persistence:** none. The `visual` field is ephemeral and is stripped from the stored `Message.content`; reloading a past session loses the visual.
- **Libraries:** none. No KaTeX/MathJax, no charting lib, no markdown renderer anywhere in the app.

---

## 1. Every place Tutor Max teaches concepts

| # | Location | File | Runtime | How it teaches | Visual injection today |
|---|---|---|---|---|---|
| 1 | In-lesson tutor chat ("Tutor Max") | `src/app/api/learn/chat/route.ts` (backend) + `src/components/learn/LessonScreen.tsx` (UI) | Server route + Client UI | AI generates the lesson body **per turn** as a plain-text string; returns `{ success, text, provider, visual? }` | ✅ Yes — `visual` field → `<VisualCard>` |
| 2 | Study Coach chat | `src/app/api/coach/route.ts` + `src/app/coach/CoachChat.tsx` | Server route + Client UI | AI returns `{ content: string }`; coach-style help | ❌ No |
| 3 | Chapter content (summary + objectives) | `src/lib/school/chapterContent.ts` → rendered in `src/app/school/[subject]/chapter/[chapterId]/page.tsx` | Server (AI-generated + cached) | `generateJSON()` produces `{ summary, objectives[] }`; falls back to KG-derived text | ❌ No |
| 4 | Revision notes (quick / exam / formula) | `src/lib/school/revision/*` → `src/components/school/RevisionNotesButton.tsx` | Server (AI-generated + cached) | Structured JSON (terms, definitions, formulas, recall Q&A) | ❌ No |
| 5 | Practice / Assessment / Mock explanations | `src/lib/school/{practice,assessment,exams}/*` → `PracticeQuiz/AssessmentQuiz/MockTestQuiz.tsx` | Server gen + Client UI | Structured question JSON with per-question `explanation` strings | ❌ No |

**AI generation entry points (response SHAPE only — prompts NOT to be touched):**
- `src/lib/ai/client.ts` — `buildTutorSystemPrompt()` (base tutor persona).
- `src/lib/ai/router.ts` — `routeAI()` returns `{ text, provider }`.
- `/api/learn/chat` assembles ~900 lines of additive context blocks (one of which is `buildVisualsSystemBlock`). All blocks are text-only and wrapped in try/catch so they never block a response.

---

## 2. Every lesson rendering component

| Component | File | Runtime | Text rendering method | Notes |
|---|---|---|---|---|
| Learn page (entry) | `src/app/learn/page.tsx` | Server | n/a (loads session, passes props) | Resolves subject/enrollment/memory |
| **LessonScreen** | `src/components/learn/LessonScreen.tsx` | Client | **Hand-rolled regex inline parser** (`MessageContent`, `renderInline`, lines ~108–148) | Supports only `**bold**`, `*italic*`, `` `code` ``, `# heading`, `-`/`•`/`*` bullets, `1.` lists. No markdown lib, no math, no tables. |
| Code panel | `LessonScreen.tsx` (Monaco, `dynamic(..., {ssr:false})`, lines ~1753–1769) | Client | Monaco editor, read-only | Existing precedent for a rich non-text element inside a lesson. For non-code subjects the whole lesson text is dumped here as `markdown` language. |
| Curriculum roadmap | `LessonScreen.tsx` (lines ~1425–1683) + `LearnerPositionPanel.tsx` | Client | Tree of units→lessons | A lesson is an **atomic unit** — no sub-section/block array within a lesson. |
| Practice / Insights panels | `PracticePanel.tsx`, `InsightsPanel.tsx` | Client | structured | Adaptive practice + performance UI |
| Final assessment modal | `FinalAssessmentModal.tsx` | Client | structured | End-of-subject |

**Key data facts:**
- `ChatMsg` type carries `visual?: string` (LessonScreen). This is the existing injection seam.
- Lesson **body text is generated at runtime per turn** — it is NOT stored as structured blocks. There is no "array of lesson blocks" to slot a visual into; visuals attach at the **message** level.
- `Curriculum` rows (`subjectCode, unit, lesson, lessonTitle, lessonGoal, topicSlug`) define lesson *metadata/order*, not body content.

---

## 3. Every chapter detail screen

| Screen | File | Runtime | Renders | Text method |
|---|---|---|---|---|
| Chapter workspace | `src/app/school/[subject]/chapter/[chapterId]/page.tsx` | Server | Title, AI-insight cards, summary, objectives, action buttons, understanding bar, learning-journey roadmap, next-chapter card | Plain text split on `\n+` into `<p>`; objectives as `<ul>` |
| Chapter list | `src/app/school/[subject]/chapters/page.tsx` | Server | Ordered chapter list | Plain text |
| Subject home | `src/app/school/[subject]/page.tsx` | Server | Subject overview | Plain text |
| Focus mode | `src/app/school/focus/page.tsx` | Server/Client | Focused study UI | Plain text |

**Content source:** `src/lib/school/chapterContent.ts` — `{ summary: string; objectives: string[] }`, AI-generated via `generateJSON()`, cached in `prisma.chapterContentCache` keyed by `board_subject_grade_chapter_language`, KG-derived fallback. Chapters themselves are **static** data in `src/lib/education/*` (e.g. `cbseMathCatalog.ts`): `Chapter { id, order, title, kgNodeIds[] }`.

---

## 4. Every concept explanation component

| Component | File | Content shape | Source |
|---|---|---|---|
| Chapter summary/objectives | chapter `page.tsx` | `{ summary, objectives[] }` | AI + cache (`chapterContent.ts`) |
| Revision notes | `RevisionNotesButton.tsx` | `QuickRevisionNotes \| ExamRevisionNotes \| FormulaSheetNotes` (typed in `revisionNotesTypes.ts`) | AI + cache, KG fallback |
| Question explanations | `PracticeQuiz / AssessmentQuiz / MockTestQuiz` | `explanation: string` per question | AI-generated question banks |
| Knowledge nodes | `src/lib/education/*KnowledgeGraph.ts` | `KnowledgeNode { id, domain, title, description, difficulty, prerequisites[] }` | Static |
| Tutor turn (the live explanation) | `LessonScreen` chat | plain text + optional `visual` | AI per turn |

All explanation text is **plain strings** — no markdown/HTML to preserve or strip, so visual insertion would be clean.

---

## 5. Every AI response rendering component

| Renderer | File | Mechanism | Supports |
|---|---|---|---|
| `MessageContent` (lesson) | `LessonScreen.tsx` | regex inline parser | bold/italic/inline-code/headings/bullets/numbered |
| Coach inline renderer | `CoachChat.tsx` | regex inline parser (duplicate of above) | bold/italic/inline-code |
| Monaco code panel | `LessonScreen.tsx` | `@monaco-editor/react`, read-only | syntax highlight only |
| `VisualCard` | `VisualCard.tsx` | `switch(type)` → static SVG | the 10 fixed visuals |
| Quiz renderers | `PracticeQuiz/AssessmentQuiz/MockTestQuiz.tsx` | structured fields → styled divs | plain text Q/options/explanation |

**There is no shared markdown/rich-text renderer.** Two independent hand-rolled inline parsers exist (lesson + coach). This matters: any visual syntax must be parsed explicitly; there is no existing pipeline that would "just render" embedded diagram markup.

---

## 6. Can visual learning be injected safely? (per surface)

| Surface | Safe to inject? | Why / How | Risk |
|---|---|---|---|
| **Lesson chat (Tutor Max)** | ✅ **Yes — already wired** | `visual` field + `<VisualCard>` already exist; extending the payload is additive and behind a try/catch | **Low** |
| Coach chat | ⚠️ Possible, not now | No existing seam; would duplicate the lesson pipeline | Low–Med |
| Chapter detail | ✅ Yes (additive) | Could render a `<VisualCard>` near the summary using deterministic `detectVisual()` (no AI change) | Low |
| Practice/Assessment/Mock | ⚠️ Later | Questions are structured JSON; add optional `visualHint?` to a question type and render in the stem/review | Med (touches question banks) |
| Revision notes | ⚠️ Later | Structured; a formula/diagram could attach per entry | Med |

**Golden rule confirmed by the architecture:** all current visual logic is **additive and fail-safe** (keyword detect or optional tag, wrapped so absence/errors degrade to plain text). Phase 2+ must preserve that property — visuals are an enhancement layer that can always be removed without breaking a lesson.

---

## 7. Recommended visualization type per location (summary)

| Location | Recommended visualization (future) |
|---|---|
| Lesson chat — Math | **Parameterized graph** (`y = f(x)`), number line, fraction bar, coordinate geometry — driven by a real payload |
| Lesson chat — Science | Process flow (water cycle / photosynthesis / reactions), labelled diagrams (circuit, force, cell) |
| Chapter detail | One representative static/diagram per chapter via `detectVisual()` |
| Practice/Assessment review | Diagram attached to the question that needs it (e.g. geometry figure) |
| History (future subject) | Timeline |
| Geography (future subject) | Map / climate diagram |
| Computer Science | Flowchart / memory & variable boxes / loop trace |

---

## 8. Audit conclusion

The platform has a **working but intentionally minimal** visual layer: 10 static SVGs, math/science, lesson-chat only, ephemeral, no payload. The cleanest, lowest-risk path forward is to **keep the existing seam (`visual` on the tutor message + `VisualCard`)** and evolve it from *"static type"* to *"type + data payload"*, starting with the one concept family that benefits most from being data-driven and is currently faked by a static image: **math graphs/plots**. See `VISUAL_LEARNING_ARCHITECTURE.md`, `VISUALIZATION_OPPORTUNITIES.md`, and `VISUAL_LEARNING_ROADMAP.md`.
