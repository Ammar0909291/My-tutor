# Learning Experience UI Audit

**Scope:** Learning, Practice, Assessment, AI, and Study Tools screens (everywhere a student spends actual time). Dashboard, Homepage, Curriculum, Knowledge Graph, AI logic, and Analytics logic are explicitly out of scope and were not touched.

**Methodology note (read first):** This environment has no reachable database (`localhost:5432` unreachable, no Docker daemon, no local Postgres binary), so a real authenticated session of the running app could not be rendered or screenshotted. Per the standing constraint, no screenshots were fabricated, mocked, or hand-drawn. Instead this audit is **source-code-based**: every screen below was graded by reading its actual component file(s), tracing its imports, and comparing its design-token usage, component reuse, and markup patterns directly against the Dashboard v2 baseline (`src/components/dashboard/v2/`, `src/components/ui/candy/`). All evidence cited is real code, with file paths and line-level class names. **Screenshot inventory: 0 images produced.** This should be treated as a Phase 1 (code audit) deliverable; a Phase 2 visual screenshot pass requires a working `DATABASE_URL` and seeded demo data, which were not available in this session.

---

## 1. Three design systems, not two

Deeper file-level verification (including the actual rendered Dashboard component, `DashboardV2.tsx`, not just its server-page wrapper) shows the codebase currently contains **three non-interoperating design systems**, all still live in production code:

| System | Tokens | Defined in | Primitives | Used by |
|---|---|---|---|---|
| **1. Candy / "Duolingo"** (modern, true Dashboard baseline) | `--candy-purple/blue/green/yellow/orange/red/pink`, `--purple/--blue/--green/--ink/--card/--shadow`, fonts `Baloo 2` (headings) + `Nunito` (body) | `src/components/ui/candy/tokens.module.css`, `src/components/dashboard/v2/dashboard.module.css` | `<CandyPage>`, `<Card>`, `<CandyButton>` (flat `0 4px 0` "3D press" shadow), `<Pill>`, `<ProgressBar>`, `<ProgressRing>`, `<EagleMascot>`, `useConfetti()` | Dashboard, Flashcards, Progress, Coach, `/quiz` |
| **2. Dark "IDE" system** | `--bg-base`, `--text-primary` re-skinned via a `.learnCandy` CSS-module class, blurred dark shadows (`0 4px 24px rgba(0,0,0,0.4)`) | `src/components/learn/LessonScreen.module.css` | None — bespoke Monaco-editor/terminal/chat-panel layout, own one-off keyframes | `/learn` (Lesson View **and** AI Tutor Chat — same file) |
| **3. "Coral" legacy system** | `--coral`, `--bg-void/base/surface`, `--text-primary/secondary/dim`, `--border-default`, `--font-heading` | `src/styles/tokens.css` (light + dark variants) | None — raw Tailwind utility classes + inline `style={{ background: 'var(--coral)' }}` | Entire `/school/[subject]/*` tree (overview, chapters, chapter detail, practice, assessment, mock), `NavigatorActionCard`, `SchoolDashboard.tsx` (a third, separate "dashboard" component used for school-mode Exam Readiness) |

A bridge exists (`CandyPage`'s `legacy` prop, documented in `src/components/ui/candy/CandyPage.tsx`) that lets a system-3 screen "re-skin" into candy *colors* via CSS variable cascade. **Every screen in the `/school/[subject]` tree does wrap itself in `<CandyPage legacy>`** — so the bridge is consistently applied at the page-shell level. But the bridge only re-skins color tokens; it does **not** change shadows (still flat 1px borders instead of candy's chunky `0 4px 0` shadow), fonts (still `--font-heading`, not `Baloo 2`), spinners (still Tailwind's generic `animate-spin`, not a candy primitive), or bring in any `Card`/`CandyButton`/`ProgressBar` component reuse. The Practice/Assessment/Mock Test quiz components additionally **re-override the bridged background** with their own `style={{ background: 'var(--bg-base)' }}`, which defeats even the color-level bridge.

There is also a build-level oddity worth flagging separately: **two conflicting Tailwind config files exist** (`tailwind.config.js` defining an electric-blue `accent` scale, `tailwind.config.ts` defining an indigo `accent` scale) — neither is actually used by the candy system, which runs entirely on CSS Modules and `--candy-*` custom properties, but their coexistence is itself stale cruft worth cleaning up.

This is the central finding: **the page-level wrapper (`CandyPage legacy`) is applied everywhere, giving a false impression of consistency at a glance — but the actual interaction logic (lesson chat, practice questions, assessment questions, mock test questions, and the separate `SchoolDashboard`/"Exam Readiness" component) never adopted candy's components, shadows, or fonts, and in some cases actively fights the bridge.**

---

## 2. Grade matrix

| Screen | Component(s) | Grade | Priority |
|---|---|---|---|
| Learn (Lesson View / AI Tutor Chat) | `src/components/learn/LessonScreen.tsx` (~2249 lines) | **C/D** | P1 |
| Subject Overview | `src/app/school/[subject]/page.tsx` | C | P1 |
| Chapter Overview | `src/app/school/[subject]/chapter/[chapterId]/page.tsx` | C | P1 |
| Topic / Chapters List | `src/app/school/[subject]/chapters/page.tsx` | C | P2 |
| Practice Session / Question Interface | `src/components/school/PracticeQuiz.tsx` | **C/D** | P1 |
| Practice Results / Answer Review | `src/components/school/PracticeQuiz.tsx` (same file, results state; no separate `AnswerReview` component exists anywhere in the codebase) | **C/D** | P1 |
| Chapter Assessment | `src/components/school/AssessmentQuiz.tsx` | **D** | P1 |
| Mock Test | `src/components/school/MockTestQuiz.tsx` | **D** | P2 |
| Assessment / Mock Results | same components, results branch | **D** | P1/P2 |
| Quiz (`/quiz`) | `src/app/quiz/QuizClient.tsx` | B | P2 |
| AI Tutor / Tutor Chat | `src/components/learn/LessonScreen.tsx` (same file as Learn) | **D** | P1 |
| Learning Coach | `src/app/coach/CoachChat.tsx` | B | P2 |
| AI Recommendations (Navigator cards) | `src/components/school/NavigatorActionCard.tsx` | C | P1 (embedded in P1 screens) |
| Flashcards | `src/app/flashcards/FlashcardsClient.tsx` | A | P2 |
| Progress | `src/app/progress/page.tsx` | A | P2 |
| Exam Readiness | `src/components/dashboard/SchoolDashboard.tsx` — a third, separate dashboard-like component (439 lines), distinct from `DashboardV2` and the candy system | **D** | P3 |
| Learning Checkpoints | confirmed via grep: not present anywhere in the codebase | — | P3 |

**Grade distribution: A = 2, B = 2, C/D-borderline = 3, D = 5, not found = 1**

Note: `QuestionInterface` and `AnswerReview` do not exist as components anywhere in the codebase (confirmed via grep across `src/app` and `src/components`). Question-and-answer-review markup is independently duplicated inline inside `PracticeQuiz.tsx`, `AssessmentQuiz.tsx`, and `MockTestQuiz.tsx` — three near-identical copies rather than one shared component, which is itself a consistency and maintenance risk on top of the visual grading.

The **D-grade cluster is exactly the screens a student lives in for 30 minutes to 2 hours a day**: the lesson/tutor chat, practice questions, and assessment/mock-test questions. The **A-grade cluster (Quiz, Coach, Flashcards)** is comparatively lower-frequency, supplementary tooling.

---

## 3. Per-screen detail

### Learn / AI Tutor Chat — Grade D — P1
**File:** `src/components/learn/LessonScreen.tsx`

- Zero imports from `@/components/ui/candy`. Uses raw `var(--bg-void)`, `var(--coral)`, `var(--text-primary)` inline styles throughout (e.g. line 1082: `style={{ height: '100vh', ..., background: 'var(--bg-void)', color: 'var(--text-primary)' }}`).
- Has its own bespoke CSS module (`LessonScreen.module.css`) with a `.learnCandy` class name that is **misleadingly named** — it does not use candy tokens, it's a separate styling scope.
- No `<EagleMascot>` anywhere in the file (confirmed via grep — mascot only appears in Quiz, Flashcards, Certificates, Dashboard).
- No shared `Card`/`CandyButton`/`Pill` components; every visual element is hand-rolled with inline `style={}` objects.
- This is simultaneously the **AI Tutor screen** and the **Learn / Lesson View screen** — they are the same component. A student doing a 1-hour study session never leaves this file.
- **Verdict:** feels like dense developer-tool chat UI (terminal-adjacent: monospace tabular numerals, thin borders, void-black background, no mascot, no celebration moments beyond a small "+10 XP" toast). Functional but administrative — closer to a support-ticket chat widget than the playful "learning world" established by Dashboard/Homepage.

### Subject Overview / Chapter Overview / Chapters List — Grade C — P1/P2
**Files:** `src/app/school/[subject]/page.tsx`, `.../chapters/page.tsx`, `.../chapter/[chapterId]/page.tsx`

- All three wrap their root in `<CandyPage legacy>` — the *bridge* variant, confirming they're built on legacy tokens being re-skinned, not native candy tokens.
- Confirmed (follow-up read completed): cards are hand-rolled `className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}` — flat 1px border, no candy `Card`/`CandyButton`/`Pill` reuse anywhere in these three files.
- CTAs use `hover:scale-[1.02]` + `boxShadow: 'var(--coral-glow)'` instead of candy's chunky `.btn3d` press mechanic; progress bars are raw divs with a CSS `transition`, not the `ProgressBar` primitive's springy fill animation.
- Chapter detail page (601 lines) additionally has **six near-identical hand-rolled style-lookup objects** (`MASTERY_STYLE`, `TRANSFER_STYLE`, `CONFIDENCE_STYLE`, `MOMENTUM_STYLE`, `STRATEGY_STYLE`, `NARRATIVE_STYLE`), each mapping a state to `{color, bg, border}` — clear copy-paste UI debt, all outside the candy system.
- Graded C (shell-bridged, content confirmed legacy) rather than B.

### Practice Session / Practice Results / Answer Review — Grade C/D — P1
**File:** `src/components/school/PracticeQuiz.tsx`

- No candy imports at all.
- Loading/error/intro states use raw Tailwind + inline coral-token styles: `className="rounded-2xl p-8 text-center max-w-sm w-full" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}` (line 122).
- Emoji used as iconography in-place of mascot/illustration (`<p className="text-2xl mb-3">😕</p>`, line 123) — a clear "older generation" pattern compared to Dashboard's custom SVG/Lottie-style mascot system.
- Generic spinner (`border-2 border-t-transparent animate-spin`, line 139) instead of any candy-system loading primitive.
- Embeds `<NavigatorActionCard>` (Grade C, see below) for AI recommendations — so even the one AI-touchpoint on this screen is itself inconsistent.
- **Verdict:** this is the single highest-frequency screen during a "studying" session (a student doing practice problems can be here for the bulk of a session) and it reads as plain, administrative, dashboard-software-like — exactly the "school-software" feeling the user is worried about.

### Chapter Assessment / Mock Test / their Results — Grade D — P1/P2
**Files:** `src/components/school/AssessmentQuiz.tsx`, `src/components/school/MockTestQuiz.tsx`

- Same pattern as PracticeQuiz: no candy imports, same `var(--bg-surface)`/`var(--border-default)` raw styling, same `NavigatorActionCard` embed, same lucide-icon-only iconography (no mascot, no celebration animation beyond whatever CSS keyframes exist globally).
- These three components (`PracticeQuiz`, `AssessmentQuiz`, `MockTestQuiz`) are clearly copy-evolved siblings of each other (near-identical import lists, identical `NavigatorActionCard` usage, identical token usage) — meaning fixing one fix-pattern will likely apply cleanly to all three. This is good news for migration complexity (see §6).

### Quiz (`/quiz`) — Grade B — P2
**File:** `src/app/quiz/QuizClient.tsx`

- Imports `{ CandyPage, Card, CandyButton, ProgressBar, EagleMascot, useConfetti }` from `@/components/ui/candy` — the full primitive set, including the mascot and confetti celebration hook, applied via inline `style={{}}` rather than the Dashboard's CSS-Modules approach (hence B, not A — same token family and component library as the baseline, just a slightly less polished implementation pattern).
- This is effectively the same "quiz" interaction pattern as Practice/Assessment/Mock Test, but fully migrated. **This is the best reference implementation to copy from when modernizing PracticeQuiz/AssessmentQuiz/MockTestQuiz** — it proves the candy system already supports this exact UX (question → answer → result), it's just not been applied to the school-mode equivalents.

### AI Tutor vs Learning Coach — direct comparison — Coach Grade B
**File:** `src/app/coach/CoachChat.tsx`
- Imports `{ CandyPage, Card, CandyButton }` from candy. Message bubbles use correct candy tokens (`boxShadow: '0 3px 0 var(--candy-shadow)'`, `fontFamily: 'var(--font-baloo2)'`), applied via inline style rather than CSS Modules (hence B, matching Quiz's grade band). No typing-indicator animation and no responsive breakpoints (fixed `maxWidth: 800` inline).
- **AI Tutor** (= `LessonScreen.tsx`, same file as Learn) imports none of these — dark-IDE system, Grade D.
- These are both "talk to an AI" screens, built at different times, and they **do not share a visual personality**. A student who chats with the Coach (candy-styled, mascot-adjacent, rounded cards) and then opens the Tutor (void-black background, monospace timestamps, no mascot) will perceive them as two different products. This is the clearest example in the whole app of "multiple UI generations coexisting" in adjacent, conceptually-identical features.

### Flashcards — Grade A — P2
**File:** `src/app/flashcards/FlashcardsClient.tsx`
- Full candy import set including `EagleMascot` and `useConfetti` — same standard as Quiz. No issues found.

### Progress — Grade A — P2
**File:** `src/app/progress/page.tsx`
- Imports `{ CandyPage, Card, ProgressBar, Pill }`. Level colors match candy hex values exactly (`#FFC800`, `#3B9EFF`, `#58CC02`, `#8B5CF6`), `Pill` is reused with correct candy semantics, and explicit empty states are handled for both topics and recent sessions. No `EagleMascot`/celebration hooks, but appropriately so for a data-heavy screen — fully candy-token-compliant.

### AI Recommendations (Navigator cards) — Grade C — P1 (embedded)
**File:** `src/components/school/NavigatorActionCard.tsx`
- Uses legacy coral tokens (`var(--text-primary)`, `var(--text-secondary)`, `var(--text-dim)`) with raw Tailwind, no candy primitives — consistent with the legacy quiz components it's embedded in, but inconsistent with the rest of the app's "AI recommendation" surfaces elsewhere (e.g. Dashboard's recommendation widgets, which are candy-styled). Graded C rather than D because its markup is at least clean/componentized (a real reusable component, not copy-pasted inline blocks).

### Exam Readiness — Grade D — P3
**File:** `src/components/dashboard/SchoolDashboard.tsx` (439 lines)

- This is a **third, separate dashboard-like component** — distinct from both `DashboardV2` (the candy-native Dashboard) and the `/school/[subject]` legacy tree. It renders a `🎓 Exam Readiness` heading styled with `var(--text-primary)` (legacy token, not `--candy-ink`).
- CTA uses the same `hover:scale-[1.02]` + `var(--coral)`/`var(--coral-glow)` pattern as the rest of the legacy system.
- Readiness bars are hand-rolled raw divs duplicating `ProgressBar`'s job instead of importing it.
- Worth flagging structurally: the existence of a *third* dashboard-shaped component, on top of `DashboardV2` and the legacy `/school` cards, suggests dashboard-style UI has been rebuilt at least three times across the app's history without consolidation.

### Learning Checkpoints — Not found
- Confirmed via grep: zero matches anywhere in `src/app` or `src/components`. No standalone screen, no embedded section. Recommend confirming with product/design whether this is a planned-but-unbuilt screen or a renamed/folded-in feature — not graded.

---

## 4. Legacy component inventory

Concrete legacy artifacts found, by pattern:

1. **Raw inline `style={{ background: 'var(--coral)' }}` instead of shared Button component** — `PracticeQuiz.tsx`, `AssessmentQuiz.tsx`, `MockTestQuiz.tsx`, `LessonScreen.tsx`, `NavigatorActionCard.tsx`.
2. **Old `src/components/ui/Button.tsx`** (`btn-primary`/`btn-ghost` CSS classes, not candy `CandyButton`) — still present in the codebase; needs a grep across the full app to confirm whether anything still imports it, but its continued existence alongside `candy/Button.tsx` (different export name) is itself evidence of two generations coexisting.
3. **Emoji-as-icon in place of mascot/illustration** — `😕`/`🎯` literals in `PracticeQuiz.tsx` lines 123, 163.
4. **No `EagleMascot` presence** in the three highest-frequency screens (Lesson/Tutor, Practice, Assessment/Mock) despite the mascot being a core "learning world" identity element established on Dashboard/Homepage.
5. **Misleadingly-named CSS scope** `.learnCandy` in `LessonScreen.module.css` that does not actually use candy tokens — a naming trap that could cause future developers to assume this screen is already migrated when it isn't.
6. **Generic CSS spinner** (`border-2 border-t-transparent animate-spin`) instead of a shared candy loading primitive, repeated across all three quiz components.
7. **`--bg-void`/`--bg-base`/`--bg-surface`/`--text-primary` etc.** (legacy token system, `src/styles/tokens.css`) still actively used in new-ish code (these school-mode quiz components are not old — they reference current types like `LearningNavigatorAction` — meaning **legacy tokens are still being used in actively-developed files**, not just untouched old code).
8. **A third dashboard-shaped component** (`SchoolDashboard.tsx`) duplicates `ProgressBar`-equivalent functionality with hand-rolled divs instead of importing the shared primitive — same root cause as the practice/assessment/mock duplication, different screen.
9. **`QuestionInterface`/`AnswerReview` don't exist as shared components** — three separate files (`PracticeQuiz.tsx`, `AssessmentQuiz.tsx`, `MockTestQuiz.tsx`) each independently implement question-display and answer-review markup, multiplying both the visual-inconsistency surface and the future maintenance cost.
10. **Two conflicting Tailwind config files** (`tailwind.config.js` electric-blue accent vs `tailwind.config.ts` indigo accent) coexist, unused by the candy system but representing unresolved build-level cruft.

---

## 5. Top 10 UI gaps (ranked by student impact)

1. **AI Tutor / Lesson View has zero candy-system presence** — the single most-used screen in the entire product, styled entirely on legacy tokens with no mascot. (P1)
2. **Practice Session has zero candy-system presence** — second most-used screen; emoji-as-icon, generic spinner, no celebration. (P1)
3. **Assessment & Mock Test share the exact same gaps as Practice** — three near-identical components, same fix needed three times (or once if extracted to a shared primitive). (P1/P2)
4. **AI Tutor and Learning Coach (both "chat with AI" screens) have completely different visual languages** — breaks the platform's "consistent AI personality" expectation. (P1)
5. **NavigatorActionCard (the one shared AI-recommendation component across Practice/Assessment/Mock) is legacy-styled**, meaning even cross-cutting AI UI doesn't match Dashboard's recommendation widgets. (P1)
6. **No `EagleMascot` in any of the three core question/answer flows** — the mascot exists and works (proven in Quiz/Flashcards) but simply wasn't applied here. (P1)
7. **Two parallel Button components exist** (`ui/Button.tsx` legacy vs `ui/candy/Button.tsx`) with no enforced single source of truth — risk of future code continuing to pick the wrong one. (P2, structural)
8. **Misleading `.learnCandy` CSS class name** in LessonScreen.module.css — creates false confidence that the lesson screen is migrated. (P2, structural/documentation hazard)
9. **Subject/Chapter Overview pages confirmed "candy background, legacy everything else"** — `<CandyPage legacy>` wrapper applied at the shell, but cards, buttons, progress bars, and the chapter detail page's six duplicated style-lookup objects are all hand-rolled outside the candy system. (P1/P2)
10. **A third, separate dashboard-shaped component exists** (`SchoolDashboard.tsx`, "Exam Readiness") on top of `DashboardV2` and the legacy `/school` cards — dashboard-style UI has effectively been built three times without consolidation, and this one is fully legacy-styled. Learning Checkpoints, separately, could not be found anywhere in the codebase. (P3, plus a product-clarification ask)

---

## 6. Migration complexity & roadmap

**Why this migration is cheaper than it looks:** `QuizClient.tsx` (Grade A) and `PracticeQuiz.tsx`/`AssessmentQuiz.tsx`/`MockTestQuiz.tsx` (Grade D) solve the *same UX problem* (present question → capture answer → show result) and are structurally similar in size (200–250 lines, near-identical import lists otherwise). QuizClient is a working, already-shipped proof that the candy system fully supports this interaction pattern.

**Suggested roadmap, in priority order:**

1. **Phase 1 — Extract a shared `QuestionFlow` pattern from `QuizClient.tsx`** (or formalize one if it doesn't already exist as a reusable hook/component), so Practice/Assessment/Mock Test can consume the same primitives instead of three independent copy-evolved legacy implementations. *(Migration complexity: Medium — mostly mechanical swap of inline-styled blocks for `Card`/`CandyButton`/`ProgressBar`, but touches 3 files with subtly different result-state logic each.)*
2. **Phase 2 — Migrate `LessonScreen.tsx`.** *(Migration complexity: High — this is a ~2249-line file with significant custom interaction logic — voice, streaming chat, Monaco-editor/terminal panels, modals — not a simple card swap. Recommend scoping this as its own dedicated sprint, not a quick pass.)*
3. **Phase 3 — Re-skin `NavigatorActionCard.tsx`** to candy tokens once Phase 1 lands (it's embedded in all three quiz components, so fixing it once cascades). *(Migration complexity: Low — single, already-componentized file.)*
4. **Phase 4 — Migrate Subject/Chapter/Chapters Overview content-level styling** to candy `Card`/`CandyButton`/`ProgressBar`, and consolidate the chapter detail page's six duplicated style-lookup objects into one shared status-style map (gap #9). *(Migration complexity: Medium — confirmed legacy throughout, three files plus one large 601-line file with the most duplication.)*
5. **Phase 5 — Decide the fate of `SchoolDashboard.tsx`** ("Exam Readiness"): either fold it into `DashboardV2`'s candy system or rebuild it as a candy-native screen — a third dashboard implementation should not persist. *(Migration complexity: Medium, contingent on product confirming whether this screen is still in active use.)*
6. **Phase 6 — Structural cleanup:** deprecate/delete `ui/Button.tsx` once nothing imports it, rename or remove the misleading `.learnCandy` class, and collapse the two conflicting Tailwind config files into one. *(Migration complexity: Low, but needs a full-codebase import audit first to avoid breaking anything still using the legacy Button.)*

**Highest-impact screens to modernize, in order:** (1) Lesson View / AI Tutor Chat, (2) Practice Session, (3) Chapter Assessment, (4) Mock Test, (5) Navigator AI recommendation card.

---

*Audit performed via direct source-code inspection (imports, design-token usage, component reuse). No screenshots were generated — no live database was available in this environment. A visual screenshot pass is recommended as a follow-up once `DATABASE_URL` and seed data are available.*
