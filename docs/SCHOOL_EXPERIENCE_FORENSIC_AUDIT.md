# School Experience Forensic Audit

**Status: AUDIT ONLY. No code was modified as part of this task.**

> **Constraint notice (CLAUDE.md):** "Do NOT redesign UI, navigation, or touch Hindi/Sanskrit subject architecture." The `src/app/school/` and `src/components/school/` tree audited below may *be* this protected subject architecture (it serves the school-board/Hindi/Sanskrit curriculum flows). Every recommendation in this document is presented as an option requiring **explicit user confirmation** before any implementation — nothing here is a green-lit plan.

## Scope

This audit covers the entire "School Experience" surface — everything under `src/app/school/` and `src/components/school/` — and compares it against the two already-modernized "Candy" design system surfaces (Dashboard V2, and the `/learn` lesson flow modernized in Sprints 1-4 of this initiative).

---

## 1. Screen Inventory

| # | Screen | Route / Entry Point | Purpose | UI System | Grade |
|---|--------|---------------------|---------|-----------|-------|
| 1 | School Dashboard | `src/components/dashboard/SchoolDashboard.tsx` | Top-level school home: subject cards, progress, recommendations | Coral (legacy) | D |
| 2 | Subject Overview | `src/app/school/[subject]/page.tsx` | Per-subject landing: chapters list, progress, next action | Coral (legacy) | D |
| 3 | Chapter Overview | `src/app/school/[subject]/chapters/page.tsx` | List of chapters for a subject | Coral (legacy) | D |
| 4 | Chapter Detail | `src/app/school/[subject]/chapter/[chapterId]/page.tsx` | Chapter content, lesson list, quiz launch | Coral (legacy) | D |
| 5 | AssessmentQuiz | `src/components/school/AssessmentQuiz.tsx` | Chapter-level graded assessment | Coral (legacy) | D |
| 6 | MockTestQuiz | `src/components/school/MockTestQuiz.tsx` | Full mock test simulation | Coral (legacy) | D |
| 7 | PracticeQuiz | `src/components/school/PracticeQuiz.tsx` | Ungraded practice quiz | Coral (legacy) | D |
| 8 | Exam Readiness | (surfaced within Subject Overview / Focus page) | Readiness score/indicator | Coral (legacy) | D |
| 9 | NavigatorActionCard | `src/components/school/NavigatorActionCard.tsx` | Shared "what to do next" action card | Coral (legacy), but clean abstraction | C |
| 10 | RevisionRecommendation | `src/components/school/RevisionNotesButton.tsx` | Revision notes / recommendation surface | Coral (legacy) | D |
| 11 | NextBestAction | (embedded in SchoolDashboard / NavigatorActionCard) | Recommendation engine display | Coral (legacy) | D |
| 12 | DailyStudyPlan | (embedded in `school/focus/page.tsx`) | Daily plan / focus session UI | Coral (legacy) | D |
| 13 | AcademicJourney | (embedded in SchoolDashboard) | Progress timeline visualization | Coral (legacy) | D |
| 14 | LearningMomentum | (embedded in SchoolDashboard) | Streak/momentum indicator | Coral (legacy) | D |
| — | Mark Chapter Complete | `src/components/school/MarkChapterCompleteButton.tsx` | Small completion-toggle control | Coral (legacy) | D |
| — | Focus Page | `src/app/school/focus/page.tsx` | Combines daily plan + recommendations | Coral (legacy) | D |

**Comparison baseline (already-modernized, not part of this audit's findings but used as the grading reference):**

| Screen | UI System | Grade |
|--------|-----------|-------|
| Dashboard V2 (`src/components/dashboard/v2/`) | Candy | A |
| `/learn` Lesson flow (LessonScreen, PracticePanel, FinalAssessmentModal) | Candy | A |

---

## 2. Component Inventory

| Component | File | Lines (approx) | Candy Imports | Notes |
|---|---|---|---|---|
| SchoolDashboard | `src/components/dashboard/SchoolDashboard.tsx` | ~440 | 0 | Largest legacy surface; subject cards, progress bars, recommendations all hand-styled |
| Subject page | `src/app/school/[subject]/page.tsx` | ~289 | 0 | |
| Chapters page | `src/app/school/[subject]/chapters/page.tsx` | ~109 | 0 | |
| Chapter detail page | `src/app/school/[subject]/chapter/[chapterId]/page.tsx` | ~600 | 0 | Largest single file in school tree |
| AssessmentQuiz | `src/components/school/AssessmentQuiz.tsx` | ~410 | 0 | Structurally near-identical to FinalAssessmentModal pre-Sprint-4 |
| MockTestQuiz | `src/components/school/MockTestQuiz.tsx` | ~417 | 0 | Structurally near-identical to AssessmentQuiz |
| PracticeQuiz | `src/components/school/PracticeQuiz.tsx` | ~399 | 0 | Structurally near-identical to PracticePanel pre-Sprint-3 |
| NavigatorActionCard | `src/components/school/NavigatorActionCard.tsx` | ~71 | 0 | Small, clean, reusable — best candidate for low-risk modernization |
| RevisionNotesButton | `src/components/school/RevisionNotesButton.tsx` | ~281 | 0 | |
| MarkChapterCompleteButton | `src/components/school/MarkChapterCompleteButton.tsx` | ~42 | 0 | Trivial component |
| Focus page | `src/app/school/focus/page.tsx` | ~329 | 0 | |

**Total: 11 components/pages audited directly, covering all 14 named screens plus 3 additional surfaces discovered (Focus page, RevisionNotesButton, MarkChapterCompleteButton).**

All school-tree components use **zero candy component imports** and rely on hardcoded inline `style={{}}` props referencing legacy CSS variables (`var(--coral)`, `var(--blue)`, `var(--green)`, `var(--yellow)`), confirmed by direct source inspection.

---

## 3. Grade Matrix

| Grade | Meaning | Screens/Components |
|---|---|---|
| A | Premium (full candy system) | Dashboard V2, `/learn` flow (reference only, not in school tree) |
| B | Good | None found in school tree |
| C | Acceptable | NavigatorActionCard (clean abstraction despite legacy styling) |
| D | Legacy | All 13 remaining school screens/components |

**Summary: 13 of 14 audited school surfaces grade D (Legacy); 1 grades C. Zero grade A or B surfaces exist in the school tree.**

---

## 4. Duplication Matrix

| Duplication | Instances | Detail |
|---|---|---|
| Dashboard implementations | 2 | `SchoolDashboard.tsx` (Coral) vs Dashboard V2 (Candy) — separate data models and component trees, near-zero code sharing |
| Quiz/assessment flow implementations | 4 | `AssessmentQuiz`, `MockTestQuiz`, `PracticeQuiz` (school, Coral) vs `PracticePanel`/`FinalAssessmentModal` (`/learn`, Candy) — ~35-40% structural overlap (question render loop, option selection, scoring/result screen), 100% visual divergence |
| Progress bar / progress-ring implementations | 5+ | Each of SchoolDashboard, Subject page, Chapter pages, the 3 quiz components, and Exam Readiness independently implement their own progress bar markup; Dashboard V2/`learn` use the shared `ProgressRing` candy component |
| "Next action" / recommendation card implementations | 3 | NavigatorActionCard, NextBestAction (embedded), RevisionRecommendation — overlapping purpose, separate implementations |
| Color token usage | inconsistent | School tree mixes `var(--coral)`, `var(--blue)`, `var(--green)`, `var(--yellow)` (legacy) directly; no shared token contract with candy's `--candy-*` tokens |

**Total duplication clusters identified: 4 major categories, ~14+ individual duplicate implementations.**

---

## 5. Dashboard Consolidation Analysis (Dashboard V2 vs SchoolDashboard)

| Aspect | Dashboard V2 | SchoolDashboard |
|---|---|---|
| Design system | Candy (full) | Coral (legacy, 100% inline styles) |
| Data model | Subject-agnostic progress/streak/recommendation model | School-curriculum-specific (chapters, board exam readiness, Hindi/Sanskrit subject metadata) |
| Component reuse potential | N/A | Low — direct reuse "unlikely without a significant abstraction layer" |
| Structural reuse potential | — | Card wrapper, ProgressRing, Pill, EagleMascot could be adopted incrementally without touching underlying data/business logic |

**Conclusion:** SchoolDashboard cannot be merged or rebuilt wholesale onto Dashboard V2 components due to differing data models (school curriculum vs general subject progress). However, a **visual-only** restyle — replacing inline-styled cards/progress bars with candy `Card`/`ProgressRing`/`Pill`/`EagleMascot` while leaving all data-fetching and business logic untouched — is structurally feasible, following the exact pattern used in Sprints 1-4 of the `/learn` modernization.

---

## 6. Assessment Consolidation Analysis

Comparing `PracticePanel`/`FinalAssessmentModal` (now Candy, `/learn`) against `AssessmentQuiz`/`MockTestQuiz`/`PracticeQuiz` (Coral, school):

- **Structural overlap: ~35-40%.** All five components share the same core flow: fetch questions → render question+options loop → track selected answer index → submit/score → render result screen with score percentage.
- **Visual integration gap: 100%.** None of the three school quiz components import any candy component; all use bespoke inline-styled markup with legacy color vars.
- **Reusable extraction candidates** (if modernization is approved): a shared `QuizQuestionCard` (question text + option buttons), a shared `QuizResultScreen` (score display + pass/fail messaging), and the already-existing `ProgressRing`/`Card`/`CandyButton`/`Pill`/`EagleMascot` primitives could plausibly back all five quiz surfaces, but this would require normalizing each component's distinct scoring/grading logic (server-side vs client-side trust models differ between `/learn` and school flows) — a larger refactor than a pure visual pass.

**Conclusion:** A visual-only restyle (same low-risk pattern as Sprints 3-4) is feasible per-component without changing data/scoring logic. A deeper shared-component extraction is possible but represents materially more risk and scope.

---

## 7. Top 10 Modernization Opportunities

1. **NavigatorActionCard** — smallest, cleanest component; lowest-risk first candidate for a visual-only candy restyle.
2. **MarkChapterCompleteButton** — trivial component; quick CandyButton swap.
3. **SchoolDashboard** progress bars/cards — replace inline progress markup with `ProgressRing`/`Card`, no data changes.
4. **PracticeQuiz** — same restyle pattern already proven on `PracticePanel` (Sprint 3); high pattern-reuse confidence.
5. **AssessmentQuiz** — same restyle pattern already proven on `FinalAssessmentModal` (Sprint 4).
6. **MockTestQuiz** — same pattern, third application; would fully unify visual language across all quiz surfaces.
7. **RevisionNotesButton** — restyle button/panel chrome onto Card + CandyButton.
8. **Subject Overview page** — restyle subject header/chapter list cards.
9. **Chapter Detail page** — largest file (~600 lines); restyle incrementally, starting with chapter/lesson list cards.
10. **Unified progress-bar token contract** — consolidate the 5+ independent progress bar implementations onto a single shared `ProgressRing`/`ProgressBar` usage to eliminate the color/style drift documented in Section 4.

---

## 8. Recommended Implementation Roadmap

**Important: this roadmap is a menu of options, not an approved plan.** Per CLAUDE.md, the school tree may be protected subject architecture; no item below should be started without explicit user sign-off, scoped one sprint at a time, exactly as Sprints 1-4 were run for `/learn`.

| Proposed Sprint | Scope | Risk | Precedent |
|---|---|---|---|
| School-Sprint A | NavigatorActionCard + MarkChapterCompleteButton (visual-only) | Low | Same pattern as Sprints 1-4 |
| School-Sprint B | SchoolDashboard cards/progress visuals | Medium (largest file, most embedded sub-surfaces: AcademicJourney, LearningMomentum, NextBestAction) | Sprint 1 (LessonScreen shell) |
| School-Sprint C | PracticeQuiz restyle | Low-Medium | Sprint 3 (PracticePanel) |
| School-Sprint D | AssessmentQuiz restyle | Low-Medium | Sprint 4 (FinalAssessmentModal) |
| School-Sprint E | MockTestQuiz restyle | Low-Medium | Sprint 3/4 combined pattern |
| School-Sprint F | Subject Overview + Chapters + Chapter Detail pages | Medium-High (largest combined surface area, ~1000 lines) | Sprint 1 |
| School-Sprint G | Focus page + RevisionNotesButton + DailyStudyPlan | Medium | — |

Each proposed sprint should follow the established discipline: visual/presentational changes only, no business-logic or scoring-logic changes, verified via `git diff` review before commit, with a CLAUDE.md-mandated detailed report after each.

**This audit recommends, but does not authorize, proceeding with School-Sprint A as the lowest-risk starting point if/when the user confirms modernization of the school tree is in scope.**

---

*Audit performed via static code inspection only. No dev server or database was available in this remote environment; findings are based on direct source file review.*
