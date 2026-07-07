# Component Inventory — Platform Cleanup Sprint

Date: 2026-06-17
Scope: candy design system primitives, school-surface components, and identified duplicate/legacy UI patterns. Usage counts are approximate, based on repo-wide grep of import sites.

---

## Candy Design System Primitives (`src/components/ui/candy/`)

| Component | Location | Purpose | Status | Usage count | Recommended action |
|---|---|---|---|---|---|
| Card | `ui/candy/Card.tsx` | Surface container (white/dark, rounded, flat drop-shadow) | Active | Widely used across all candy-modernized surfaces | Keep |
| CandyButton | `ui/candy/Button.tsx` | 3D-press button primitive | Active | Widely used | Keep |
| Pill | `ui/candy/Pill.tsx` | Small rounded badge/label | Active | Widely used | Keep — see Duplication below for non-candy badge patterns that should migrate to this |
| ProgressBar | `ui/candy/ProgressBar.tsx` | Linear progress bar with springy animation | Active | Used in Dashboard V2, School Dashboard, Subject Overview, Chapter Detail, Mock Test results | Keep — see Duplication below for hand-rolled bars that should migrate to this |
| ProgressRing | `ui/candy/ProgressRing.tsx` | Circular progress indicator | Active | Used in Practice/Assessment/Mock Test results | Keep |
| SectionTitle | `ui/candy/SectionTitle.tsx` | Section heading style | Active | Widely used | Keep |
| EagleMascot | `ui/candy/Mascot.tsx` | Brand mascot SVG (logo/hero variants) | Active | Used in Dashboard V2, Coach, Quiz, Flashcards, Certificates detail, Modes Picker, Focus, school surfaces | Keep |
| CandyPage | `ui/candy/CandyPage.tsx` | Page shell wrapper, optional legacy-token bridge | Active | Used by several non-school candy surfaces | Keep |
| useConfetti | `ui/candy/useConfetti.ts` | Confetti celebration hook | Active | Used in Practice, Assessment, Mock Test on success | Keep |

## School Surface Components (`src/components/school/`)

| Component | Purpose | Status | Recommended action |
|---|---|---|---|
| NavigatorActionCard.tsx | Unified "next recommended step" card | Active, 6 usages | Keep — confirmed sole implementation, no duplicate found |
| MarkChapterCompleteButton.tsx | Marks a chapter complete | Active | Keep |
| RevisionNotesButton.tsx | On-demand revision notes modal | Active, candy-modernized (Sprint G) | Keep |
| PracticeQuiz.tsx / AssessmentQuiz.tsx / MockTestQuiz.tsx | Candy-modernized quiz surfaces | Active | Keep |

## Removed This Sprint (see `docs/DEAD_CODE_AUDIT.md` for evidence)

| Component | Location | Status | Usage count |
|---|---|---|---|
| `_legacy` dashboard page | `src/app/dashboard/_legacy/page.tsx` | Deleted — unreachable, zero references | 0 |
| ProgressSummaryPanel | `src/components/dashboard/ProgressSummaryPanel.tsx` | Deleted — unused | 0 |
| ContinueLearningCard | `src/components/dashboard/ContinueLearningCard.tsx` | Deleted — unused | 0 |
| Button (non-candy) | `src/components/ui/Button.tsx` | Deleted — fully superseded by CandyButton | 0 |
| Badge (non-candy) | `src/components/ui/Badge.tsx` | Deleted — unused | 0 |

## Duplicate UI Patterns Identified (not modified this sprint — see below)

These are **active, in-use** components outside the already-modernized School/Dashboard-V2/Library/Lesson surfaces. Consolidating their markup onto candy primitives is a UI-consistency improvement, not a dead-code removal, and is explicitly out of scope for this cleanup sprint ("no redesign"). Documented here for sequencing into a future sprint.

| Pattern | Representative locations | Count | Recommended action |
|---|---|---|---|
| Hand-rolled progress bar (div + inline `width: %`, no `role="progressbar"`) | `analytics/LearningGrowthPanel.tsx`, `mastery/MasterySummaryPanel.tsx`, `onboarding/OnboardingWizard.tsx`, `career/CareerSummaryPanel.tsx`, `gamification/GamificationPanel.tsx`, `admin/analytics/page.tsx`, `admin/users/[id]/page.tsx`, `learn/InsightsPanel.tsx` | ~13 occurrences across 10 files | Future sprint: migrate to `ProgressBar` (also closes a repo-wide `role="progressbar"` accessibility gap) |
| Hand-rolled badge/pill (rounded-full + small padding + text, not using `Pill`) | `mastery/MasterySummaryPanel.tsx`, `dashboard/RoadmapPanel.tsx`, `dashboard/ProgressReportButton.tsx`, `career/CareerSummaryPanel.tsx` | 8 occurrences across 4 files | Future sprint: migrate to `Pill` |

## Protected / Confirmed Live (do not remove)

- `src/components/dashboard/v2/*` — `DashboardV2`, used alongside `SchoolDashboard` for two distinct user paths (general learner vs. school student); not duplicate implementations.
- `useDraftMessage` hook — actively used in `LessonScreen.tsx`.
- `Avatar.tsx`, `LoadingSkeleton.tsx`, `Toast.tsx`, `LanguageToggle.tsx`, `ThemeToggle.tsx` (`src/components/ui/`) — actively used, distinct concerns from candy primitives.

## Summary

- **Active candy primitives:** 9 (all confirmed in use, no changes needed).
- **Active school components:** confirmed no duplicates of NavigatorActionCard or quiz surfaces.
- **Removed (dead):** 5 files (1 route, 4 components).
- **Duplication documented for future work (not touched this sprint):** ~21 hand-rolled progress-bar/badge occurrences across 13 files outside the modernized surfaces.
