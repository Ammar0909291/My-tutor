# Dashboard Recovery Audit

**Branch:** `claude/my-tutor-foundation-KDSUO`  
**Audit Date:** 2026-06-16  
**Auditor:** Forensic diff of `_legacy/page.tsx` (v1) vs `DashboardV2.tsx` (current)

---

## Summary Counts

| Category | Count |
|---|---|
| Legacy v1 functional widgets | 19 |
| Current v2 functional widgets | 8 |
| Missing from v2 (library student) | 11 |
| Missing from v2 (school student, additional) | 9 |
| Mocked / disconnected in v2 | 2 |
| Navigation paths undiscoverable from v2 | 7 |

---

## 1. Existing Dashboard Inventory (Current v2)

The candy design system dashboard (`src/components/dashboard/v2/DashboardV2.tsx`) renders the following 8 widgets:

| Widget | Component | Data Source | Live? |
|---|---|---|---|
| TopBar (streak / gems / hearts) | `TopBar.tsx` | `getDashboardV2Data` → `getStudyStreak` + `user.xpPoints` | Streak ✅ Gems ✅ Hearts ❌ (hardcoded 5) |
| Hero banner (greeting + subtitle) | `HeroBanner.tsx` | `getDashboardV2Data` → `timeOfDayGreeting` + `heroSubtitle` | ✅ Live |
| Daily goal ring | `DailyGoalCard.tsx` | `learnSession.count` today vs `dailyPlan.length` | ✅ Live |
| Continue card ("Jump back in") | `ContinueCard.tsx` | `getDashboardV2Data` → active subject + lesson | ✅ Live |
| Practice modes (Tutor / Quiz / Coach) | `PracticeModes.tsx` | `buildPracticeModes(tutorHref, quizHref)` | ✅ Live hrefs |
| Skill path (5-node) | `SkillPath.tsx` | `buildSchoolSkillPath` / `buildLibrarySkillPath` | ✅ Live |
| League card (weekly leaderboard) | `LeagueCard.tsx` | `weeklyXP` table, top 5 | ✅ Live |
| Daily quests | `DailyQuests.tsx` | `MOCK_DASHBOARD_DATA.dailyQuests` | ❌ **MOCKED** |

---

## 2. Missing Widgets (were in legacy v1, gone from v2)

### 2a. Library Student (non-school)

| Widget | Legacy Location | Status in v2 | Notes |
|---|---|---|---|
| **Sticky nav header** | `_legacy/page.tsx` `<nav>` | ❌ **Removed entirely** | Had logo, ThemeToggle, Admin link, Settings link, SignOut |
| **ThemeToggle** | Navbar | ❌ **Removed** | Dark/light switch gone |
| **Admin link** (role-gated) | Navbar | ❌ **Removed** | ADMIN users have no path to `/admin` from dashboard |
| **Settings link** | Navbar | ❌ **Removed** | `/settings` no longer linked from dashboard |
| **SignOutButton** | Navbar | ❌ **Removed** | No sign-out control on the dashboard |
| **InstallBanner** (PWA) | Top of `<main>` | ❌ **Removed** | `src/components/dashboard/InstallBanner.tsx` exists, not mounted |
| **Subjects count stat card** | Section 2 (Learning Snapshot grid) | ❌ **Removed** | Was `enrolledSubjects.length` |
| **Lessons completed stat card** | Section 2 | ❌ **Removed** | Was `completedLessons.length` summed across subjects |
| **My Subjects grid** | Section 3 | ❌ **Removed** | All enrolled subjects with per-subject progress bars + Continue buttons. v2 shows only 1 active subject |
| **"+ Add subject" button** | Section 3 heading | ❌ **Removed** | Link to `/library` for enrollment |
| **Expandable Roadmap panel** | Section 4 (collapsible `<details>`) | ❌ **Removed** → simplified to 5-node SkillPath | `RoadmapPanel` component + RoadmapFact facts (current unit, lesson, next milestone, completion %) |
| **Achievement Center** | Section 5 | ❌ **Removed** | Level name (Novice → Master), XP-to-next-level bar, certificate count chip, streak chip |
| **Recent Activity timeline** | Section 6 | ❌ **Removed** | Last 10 `LearnSession` records bucketed today / yesterday / earlier. API: `GET /api/sessions` |
| **CareerSummaryPanel** | Section 7 (Advanced Analytics) | ❌ **Removed** | `src/components/career/CareerSummaryPanel.tsx` exists, not mounted. Calls `GET /api/profile` |
| **MasterySummaryPanel** | Section 7 (Advanced Analytics) | ❌ **Removed** | `src/components/mastery/MasterySummaryPanel.tsx` exists, not mounted. Calls `GET /api/learner/profile-insights` |
| **Explore link chips** | Section 8 | ❌ **Removed** | 7 nav shortcuts: Tutor, Coach, Quiz, Flashcards, Library, Leaderboard, Progress |

### 2b. School Student (additional, beyond library)

These were rendered via `SchoolDashboard.tsx` (439 lines). The current `getDashboardV2Data` detects school students and computes school-derived `ContinueCard`/`SkillPath` data, but renders the candy template — `SchoolDashboard` is completely bypassed.

| Widget | Legacy API / Lib function | Status in v2 | Notes |
|---|---|---|---|
| **Learning Navigator card** | `getLearningNavigatorAction()` | ❌ **Removed** | `NavigatorActionCard` component exists, not mounted |
| **Revision Recommendation card** | `getRecommendedRevisionChapter()` | ❌ **Removed** | Weak-topic engine output invisible |
| **Next Best Action card** | `getNextBestAction()` | ❌ **Removed** | Adaptive next step invisible |
| **Daily Study Plan tasks** | `getDailyStudyPlan()` | ❌ **Tasks hidden** | Plan is computed (count used for goal ring target), but individual tasks not displayed |
| **Exam Readiness per subject** | `getExamReadinessForAllSubjects()` | ❌ **Removed** | Readiness % per subject invisible |
| **Learning Momentum card** | `getStudyStreak()` + `getRecentAchievement()` | ❌ **Removed** | Streak partially in TopBar; recent achievement celebration gone |
| **Academic Journey roadmap** | `getOverallRoadmap()` | ❌ **Removed** | Cross-subject completion overview invisible |
| **ProgressReportButton** | `src/components/dashboard/ProgressReportButton.tsx` | ❌ **Removed** | Component exists, not mounted |
| **Pending Assessment resumption** | `prisma.practiceSession.findFirst` (kind=assessment, completedAt=null) | ❌ **Removed** | In-progress assessments have no resume prompt |

---

## 3. Hidden Widgets (exist as components, not mounted)

| Component | Path | Reason not shown | Fix required |
|---|---|---|---|
| `MasterySummaryPanel` | `src/components/mastery/MasterySummaryPanel.tsx` | Not imported in DashboardV2 | Add back to dashboard |
| `CareerSummaryPanel` | `src/components/career/CareerSummaryPanel.tsx` | Not imported in DashboardV2 | Add back to dashboard |
| `InstallBanner` | `src/components/dashboard/InstallBanner.tsx` | Not imported in DashboardV2 | Add back |
| `ProgressReportButton` | `src/components/dashboard/ProgressReportButton.tsx` | Not imported; school only | Add back for school users |
| `NavigatorActionCard` | `src/components/school/NavigatorActionCard.tsx` | Not imported; school only | Restore school dashboard flow |
| `SchoolDashboard` | `src/components/dashboard/SchoolDashboard.tsx` | Bypassed — v2 page renders candy template for all users | Restore school-specific rendering |

---

## 4. Disconnected APIs

APIs that exist and return live data but are not used by any dashboard widget:

| API | Route | Model | Current Consumer | Dashboard Gap |
|---|---|---|---|---|
| Sessions history | `GET /api/sessions` | `LearnSession` | None on dashboard | Recent Activity was the only consumer |
| Topic progress | `GET /api/topic-progress` | `TopicProgress` | Progress page (`/progress`) | No dashboard widget |
| Practice analysis | `GET /api/practice/analysis` | `PracticeSession` + `MistakeRecord` | Learn screen | DailyQuests should consume this but uses mock data |
| Learner profile insights | `GET /api/learner/profile-insights` | `CoachInsight` + `LearnerIntelligence` | Coach page, MasterySummaryPanel | MasterySummaryPanel not mounted |
| Curriculum progress | `GET /api/curriculum` | `StudentProgress` + `Curriculum` | Learn screen | No dashboard widget |
| Certificates | `GET /api/certificates/[code]` | `Certificate` + `SubjectCertificate` | Certificates page | Achievement chip with count was removed |
| Final assessment | `GET /api/final-assessment` | `FinalAssessmentResult` | Learn screen | No dashboard visibility |
| School revision | `GET /api/school/revision` | `TopicProgress` + `PracticeSession` | School learn screen | School revision card removed |

---

## 5. Placeholder Components

| Component | Placeholder Content | Should Be |
|---|---|---|
| `DailyQuests` | `MOCK_DASHBOARD_DATA.dailyQuests` — 3 hardcoded quests: "Complete 3 lessons" (progress: 1/3), "Practice 5 questions" (2/5), "Answer 10 quiz questions" (10/10) | Real data from `LearnSession.count` today + `PracticeSession` today + quiz completion |
| TopBar `hearts` | Hardcoded `5` (max `5`) | No hearts model in DB; this is an acknowledged design placeholder |

---

## 6. Missing Navigation Paths

Routes that exist but have no discoverable entry point in the v2 dashboard:

| Route | Was accessible via | Current v2 status |
|---|---|---|
| `/settings` | Navbar Settings link | ❌ No link anywhere on dashboard |
| `/flashcards` | Explore section chip | ❌ No link anywhere on dashboard |
| `/library` | Explore section chip + "Add subject" button | ❌ No link anywhere on dashboard |
| `/certificates` | Achievement Center cert count chip | ❌ No link anywhere on dashboard |
| `/leaderboard` | Explore section chip | ❌ LeagueCard has no "View full leaderboard" link |
| `/quiz` | Explore section chip (direct) | ⚠️ PracticeModes "Quiz" links to `/learn?subject=X&practice=1`, not `/quiz` |
| `/admin` | Navbar admin link (ADMIN role only) | ❌ Admin users see candy dashboard with no admin entry point |

---

## 7. Mobile Visibility Issues

The v2 dashboard has one responsive breakpoint at `max-width: 900px`:
- Grid collapses to single column (acceptable)
- PracticeModes stacks to 1-column (acceptable)
- LeagueCard and DailyQuests (sidebar) drop below main content (acceptable)

**Issues specific to mobile loss of functionality:**
- With the entire navbar gone, sign-out is only available via `/settings` — which itself has no link from the dashboard. On mobile, sign-out is effectively inaccessible from the dashboard.
- ThemeToggle gone on all viewports including mobile.
- "Add subject" path requires knowing to go to `/library` — not discoverable on mobile.

No widgets collapse incorrectly or overflow. The missing functionality issues affect all viewports equally — they are removal issues, not responsive issues.

---

## 8. Teacher Dashboard Gaps

There is no teacher/tutor role dashboard in this codebase. The `profile.userType` field has `SCHOOL_STUDENT` and library students; no teacher role exists. N/A.

---

## 9. School Dashboard Gaps

As documented in §2b, the `SchoolDashboard` component is bypassed. School students see the candy v2 dashboard. The following systems are computed server-side in `getDashboardV2Data` but their results are silently discarded:

- `getStudyStreak` → only `currentStreak` used; `longestStreak` and `recentAchievement` discarded
- `getDailyStudyPlan` → only `dailyPlan.length` used (for goal ring target); individual plan tasks discarded
- School students have access to `getSubjectRoadmap` → 5-node SkillPath rendered (this one is shown)
- `getSchoolProgressForSubjects` → only most-recently-studied subject used; all other subject progress cards discarded

Not computed at all in v2 (were computed in legacy):
- `getRecommendedRevisionChapter`
- `getNextBestAction`
- `getExamReadinessForAllSubjects`
- `getLearningNavigatorAction`
- `getOverallRoadmap`
- `getRecentAchievement`
- `prisma.practiceSession.findFirst` (pending assessment)

---

## 10. Admin Dashboard Gaps

The admin dashboard (`/admin`, `src/app/admin/page.tsx`) is a separate route with its own layout and is not affected by the v2 rollout.

**Gap:** Admin users visiting `/dashboard` see the candy v2 dashboard with no link to `/admin`. The legacy dashboard had a role-gated admin link in the navbar that is now gone. Admin users must manually navigate to `/admin` by typing the URL.

---

## Recovery Roadmap

### Priority 1 — Existing functionality hidden / inaccessible

| ID | Item | Files to touch |
|---|---|---|
| P1.1 | Restore navigation header with ThemeToggle, Settings link, Admin link (role-gated), SignOut | `DashboardV2.tsx` + server data (pass `userRole` in `DashboardV2Data`) |
| P1.2 | Restore My Subjects grid (all enrolled subjects with per-subject progress bars) | `DashboardV2.tsx` + new `SubjectGrid` widget + extend `DashboardV2Data` |
| P1.3 | Restore Achievement Center (level name, XP progress bar, certificate count) | `DashboardV2.tsx` + extend `getDashboardV2Data` (add `certificates.count`, `level`) |
| P1.4 | Restore Recent Activity timeline (last 10 `LearnSession` rows) | `DashboardV2.tsx` + extend `getDashboardV2Data` (add `recentSessions`) |
| P1.5 | Restore school-specific adaptive cards (Navigator, Revision, NextAction, DailyPlan tasks, ExamReadiness, Momentum) | Re-route school students to `SchoolDashboard` OR extend candy dashboard with school section |
| P1.6 | Admin role-gated link in nav | P1.1 fix; pass `user.role` from server page |

### Priority 2 — Existing functionality disconnected from APIs

| ID | Item | API to connect |
|---|---|---|
| P2.1 | Wire DailyQuests to real data (lessons today, practice questions today, quiz completions) | `LearnSession.count` today + `PracticeSession` aggregates |
| P2.2 | Restore MasterySummaryPanel (mount existing component) | `GET /api/learner/profile-insights` (component already calls this) |
| P2.3 | Restore CareerSummaryPanel (mount existing component) | `GET /api/profile` (component already calls this) |

### Priority 3 — Placeholders

| ID | Item | Notes |
|---|---|---|
| P3.1 | DailyQuests mock data replacement | Blocked on P2.1 — compute live quest progress server-side |
| P3.2 | Hearts hardcoded to 5 | No DB model for hearts; low priority unless hearts feature is scoped |

### Priority 4 — Navigation discoverability

| ID | Item | Fix |
|---|---|---|
| P4.1 | Add Explore section or quick-links: /flashcards, /library, /certificates, /progress, /leaderboard, /settings | New `ExploreLinks` widget in DashboardV2 |
| P4.2 | Add "View full leaderboard" link in LeagueCard | 1-line change in `LeagueCard.tsx` |
| P4.3 | PracticeModes Quiz → link to `/quiz` directly (not `/learn?practice=1`) | 1-line change in `getDashboardV2Data.ts` `buildPracticeModes` |
| P4.4 | InstallBanner — restore PWA install prompt | Mount `InstallBanner` in `DashboardV2.tsx` |

---

*This is an audit report only. No code changes have been made.*  
*Awaiting implementation approval before any recovery work begins.*
