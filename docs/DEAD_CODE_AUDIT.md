# Dead Code Audit — Platform Cleanup Sprint

Date: 2026-06-17
Scope: repo-wide dead-code sweep (routes, components, hooks, helpers, CSS, assets) following the Platform Completion Audit.

Methodology: every removal candidate was verified by grepping the entire `src/` tree for inbound references (imports, `Link href`, `redirect(...)`, literal route strings) before being listed as Safe To Delete. Anything without unambiguous zero-reference evidence was left in place under Investigate Further or Protected.

---

## Safe To Delete (removed this sprint)

| File | Evidence |
|---|---|
| `src/app/dashboard/_legacy/page.tsx` | Zero matches for `_legacy` anywhere else in `src/`. Underscore-prefixed folder is also excluded from Next.js routing by framework convention — unreachable regardless of references. Directory contained only `page.tsx` (no co-located `loading.tsx`/`layout.tsx`/CSS). |
| `src/components/dashboard/ProgressSummaryPanel.tsx` | Zero importers anywhere in `src/`. |
| `src/components/dashboard/ContinueLearningCard.tsx` | Zero importers anywhere in `src/`. |
| `src/components/ui/Button.tsx` | Zero usages; fully superseded by `src/components/ui/candy/Button.tsx` (`CandyButton`), which is live and widely used across the candy-modernized surfaces. |
| `src/components/ui/Badge.tsx` | Zero usages anywhere in `src/`. |

5 files deleted. No co-located CSS modules, tests, or assets were attached to any of them.

## Possibly Unused

None found with sufficient evidence to classify as "possibly unused" — every other component, hook, and helper checked during this sweep had at least one confirmed live importer.

## Investigate Further (left in place)

| Item | Reason for caution |
|---|---|
| Hand-rolled progress-bar / badge-pill markup outside the candy system (see `docs/COMPONENT_INVENTORY.md` for the full list of ~13 progress-bar and 8 badge/pill duplicates in `analytics/`, `mastery/`, `career/`, `gamification/`, `dashboard/`, `onboarding/`, `admin/`, `learn/InsightsPanel.tsx`) | These are active, in-use UI inside components that are NOT part of the School/Dashboard-V2/Library/Lesson surfaces already modernized. Consolidating them onto `ProgressBar`/`Pill` is a UI-consistency improvement, not dead code — out of scope for this cleanup sprint per the "no redesign" constraint. Documented for a future sprint. |
| Broader "recommendation card" sweep | Only a narrow filename search (`Recommend`/`NextAction`/`ActionCard`) was run; a keyword search across copy strings was not performed. `NavigatorActionCard.tsx` is the only match found and is actively used in 6 places — no duplicate identified, but the search wasn't exhaustive enough to declare the space fully clean. |

## Protected Components

These were explicitly checked and confirmed **live** — do not remove:

- `src/components/dashboard/v2/*` and `src/app/dashboard/page.tsx` — both `DashboardV2` and `SchoolDashboard` are legitimately imported there for two different user paths (general learner vs. school student), not duplicate/superseded versions of each other.
- `src/components/school/NavigatorActionCard.tsx` — actively used in 6 places (SchoolDashboard, Subject Overview, Chapter Detail, PracticeQuiz, AssessmentQuiz, MockTestQuiz).
- `useDraftMessage` hook — matched a "draft"-naming sweep but is actively used in `LessonScreen.tsx` for chat-message drafts (confirmed live, false positive).
- `Avatar.tsx`, `LoadingSkeleton.tsx`, `Toast.tsx`, `LanguageToggle.tsx`, `ThemeToggle.tsx` (`src/components/ui/`) — all actively used; not superseded by candy primitives (different concerns).
- All CSS/`.module.css` files under `src/` (`globals.css`, `styles/tokens.css`, `candy/tokens.module.css`, `candy/primitives.module.css`, `candy/CandyPage.module.css`, `learn/LessonScreen.module.css`, `dashboard/v2/dashboard.module.css`, `homepage.module.css`) — each has at least one confirmed importer.
- `public/` assets (`icons/`, `manifest.json`, `sw.js`) — no duplicate or orphaned assets identified.

## Expected Impact

- **Files removed:** 5 (~1 route page + 4 components, ~33 KB of dead route code plus two unused dashboard panels and two unused non-candy UI primitives).
- **Behavior change:** none — all five files had zero inbound references, confirmed by repo-wide grep before deletion.
- **Build impact:** none expected; verified via `npx tsc --noEmit` and `npm run build` (see commit for results).
- **Maintenance surface:** slightly reduced (one fewer orphaned dashboard implementation, two fewer dead non-candy primitives that could be mistakenly reached for instead of `CandyButton`/`Pill`).
