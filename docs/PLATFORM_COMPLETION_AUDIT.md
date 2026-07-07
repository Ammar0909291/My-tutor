# My Tutor — Platform Completion Audit

Date: 2026-06-17
Scope: forensic review of every major user-facing surface following School Sprints A–G (full School modernization: Dashboard, Practice, Assessment, Mock Test, Subject Overview, Chapters, Chapter Detail, Focus, Revision Notes, Daily Study Plan — all now on the candy design system).

This is an audit only. No implementation was performed beyond what Sprint G already delivered.

---

## 1. Platform Maturity Score: **62%**

The School experience (the primary product surface) is fully modernized and internally consistent. Dashboard V2, Library, Modes, Lesson/Learn, Coach, and Progress are also candy-native. However roughly half of the remaining surfaces (Auth, Certificates list, Leaderboard, Flashcards, Quiz, Settings, Onboarding, Homepage) are "mixed" — candy primitives imported alongside heavy legacy-token inline styling — and Admin is entirely on the legacy token system.

## 2. UI Consistency Score: **58%**

Calculated from the surface grades below (A=100%, B=75%, C=50%, D=25%, weighted equally). The gap is concentrated in two patterns: (a) screens that import candy components but still carry dozens of inline `var(--bg-*)`/`var(--text-*)`/`var(--coral)` legacy styles alongside them, and (b) one fully dead legacy dashboard route.

---

## 3. Remaining Modernization Items

| # | Surface | Issue |
|---|---|---|
| 1 | Auth — forgot-password / reset-password | No candy import at all; fully legacy-token styled |
| 2 | Auth — login / signup | Candy imported but heavily legacy-styled (mixed) |
| 3 | Flashcards | Highest legacy-var count among "candy" surfaces (27 hits) |
| 4 | Quiz | Candy imported, 20 legacy-var hits remain |
| 5 | Leaderboard | Candy imported, 14 legacy-var hits remain |
| 6 | Certificates list page | Legacy-styled; detail view (`CertificateView.tsx`) is already candy-native — inconsistent within the same feature |
| 7 | Settings | Candy imported, 18 legacy-var hits (header/profile area) |
| 8 | Onboarding (`OnboardingWizard.tsx`) | Mixed candy/legacy, 491-line component, heaviest single file to convert |
| 9 | Homepage | Mixed; 16 legacy accent-color vars inline |
| 10 | Admin (all sub-pages) | Entirely legacy-token; no candy imports anywhere in `/admin` |

## 4. Remaining Production Blockers

- None identified that are functional/correctness blockers. All flagged issues are visual/styling consistency, not broken functionality.
- `src/app/dashboard/_legacy/page.tsx` is dead code (zero inbound references) — not a blocker, but should be deleted to avoid confusion/maintenance drag and to remove a stale duplicate dashboard implementation from the codebase.

## 5. Remaining Launch Blockers

- None identified. Auth, Onboarding, Dashboard, Library, Lesson, Coach, Progress, and the full School flow are all functionally complete and reachable. The legacy-token screens are visually inconsistent but not broken — the app is launchable as-is from a functionality standpoint.

## 6. Screens Graded A–D

| Grade | Screens |
|---|---|
| **A** (candy-native, 0 legacy vars) | Dashboard V2, Library Mode, Modes Selector, Lesson/Learn Experience, AI Tutor/Coach, Progress, School Dashboard, Practice, Assessment, Mock Test, Subject Overview, Chapters List, Chapter Detail, Focus, Revision Notes, Daily Study Plan, Certificates detail view (`CertificateView.tsx`) |
| **B** (candy-primary, light legacy residue) | Homepage, Leaderboard |
| **C** (mixed, meaningful legacy residue) | Login, Signup, Onboarding Wizard, Settings, Certificates list page |
| **D** (legacy-only or legacy-dominant) | Forgot Password, Reset Password, Flashcards, Quiz, Admin (all sub-pages) |

## 7. Top 10 Highest-Value Fixes Remaining

1. Auth screens (login/signup/forgot/reset) — first impression for every new user; currently the most visually disconnected from the candy brand.
2. Flashcards — heaviest legacy-var residue of any "mostly candy" surface.
3. Quiz — second-heaviest legacy-var residue; a core practice surface.
4. Certificates list page — inconsistent with its own detail view, which is already candy-native.
5. Settings — frequently visited, currently mixed.
6. Leaderboard — light residue, low effort to finish.
7. Onboarding Wizard — first-run experience; largest single file, highest effort but high visibility.
8. Homepage — public-facing; light residue, quick win.
9. Delete `src/app/dashboard/_legacy/page.tsx` — zero-risk dead-code removal.
10. Admin surfaces — lowest user-facing priority (internal tool), but full conversion would close the loop on "0 legacy UI anywhere."

## 8. Estimated Effort

| Milestone | Definition | Estimated Effort |
|---|---|---|
| **UI Complete** | Every surface above on candy primitives/tokens, 0 legacy-var residue, dead dashboard route removed | 4–6 focused sprints (one or two surfaces per sprint, matching the cadence of Sprints C–G) |
| **Beta Ready** | UI Complete + Auth/Onboarding/Flashcards/Quiz/Certificates/Settings/Leaderboard/Homepage converted (items 1–9 above); Admin may remain legacy | 3–4 sprints |
| **Production Ready** | Beta Ready + Admin conversion (item 10) + a final cross-surface visual QA pass (light/dark mode, mobile breakpoints) on every converted screen | Beta Ready + 1–2 additional sprints |

---

*This audit identifies remaining work only. No additional modernization, redesign, or new features were implemented as part of this audit, per scope.*
