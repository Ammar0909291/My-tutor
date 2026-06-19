# Beta Stabilization — Sprint B

Branch: `claude/my-tutor-foundation-KDSUO`
Scope: two verified UX issues only. No redesign, no new systems, no architecture changes.

## 1. Findings

### Issue 1 — Tutor voice settings were in the wrong place
- Voice controls existed in **three** places, two of which duplicated the same database field:
  - `src/app/settings/page.tsx` — a "Voice" section (male/female/warm), a "Voice speed" section, and a separate "Voice preference" block inside the Profile section.
  - `src/components/learn/LessonScreen.tsx` — an in-lesson header voice-type picker (male/female/warm) that was **session-only** and never persisted to the database.
- `/api/settings` PATCH and `/api/user/profile` PATCH (via its `voicePreference` field) both wrote to the same underlying column, `profile.voiceId` — confirmed true duplication, not two different settings.
- There was no 0.6x speed option anywhere; the existing speed set was `[0.75, 0.9, 1.0, 1.1, 1.25, 1.5]`.

### Issue 2 — Dashboard UI changed when switching modes
- `src/app/dashboard/page.tsx` rendered two **entirely separate** component trees depending on `profile.userType`:
  - Library Mode → `<DashboardV2 data={...} />`
  - School Mode → `<SchoolDashboard ... />` (a fully separate shell with its own header, layout, and navigation — the explicit "BAD" case described in the task).
- `getDashboardV2Data.ts` already had partial school-awareness (it branched on `isSchool` for `continueLesson`/`practiceModes`/`skillPath`) but did not populate `subjectCards` for school users and did not carry school-only analytics (navigator action, daily plan, academic journey, exam readiness) — that data only existed inside the separate `SchoolDashboard` page-level fetch logic.

## 2. Root causes

1. **Issue 1**: voice settings were built incrementally across two features (global Settings page, then later an in-lesson quick-picker) without consolidating to one persistence path or one UI location.
2. **Issue 2**: School Mode was originally shipped as a parallel dashboard experience before Dashboard V2 existed, and was never migrated onto the V2 shell once V2 became the default for Library Mode.

## 3. Files modified

**Issue 1 — voice control relocation**
- `src/lib/tts.ts` — added shared `VOICE_SPEED_OPTIONS` export (now includes `0.6`).
- `src/app/api/settings/route.ts` — Zod schema for `voiceSpeed` now accepts `0.6`.
- `src/components/learn/LessonScreen.tsx` — voice-type picker now persists to `/api/settings`; added a new voice-speed dropdown (`0.6x`–`1.5x`) next to it, also persisting to `/api/settings`.
- `src/app/settings/page.tsx` — removed the "Voice" section, "Voice speed" section, and "Voice preference" block (and their now-unused state/handlers). Language/region/school/profile sections untouched.

**Issue 2 — dashboard shell unification**
- `src/components/dashboard/v2/types.ts` — added optional `SchoolExtrasData` / `school` field to `DashboardV2Data`.
- `src/lib/dashboard/getDashboardV2Data.ts` — extended to also fetch navigator action, exam readiness, and overall roadmap for school users, and to populate `subjectCards` and the new `school` field.
- `src/components/dashboard/v2/SchoolExtras.tsx` (new) — presentational component rendering the school-only sections (Recommended next action, Today's plan, Academic journey, Exam readiness) using existing primitives (`SectionTitle`, `NavigatorActionCard`).
- `src/components/dashboard/v2/DashboardV2.tsx` — renders `<SchoolExtras data={data.school} />` when present, between `SubjectsGrid` and `AchievementCenter`.
- `src/app/dashboard/page.tsx` — simplified to always call `getDashboardV2Data()` and always render `<DashboardV2 data={data} />`. The `SchoolDashboard` branch was removed from this route.

**Not touched (out of scope, intentionally)**
- `src/components/dashboard/SchoolDashboard.tsx` — left as-is; still used by the separate `src/app/dashboard/_legacy/page.tsx` route, which is outside the live `/dashboard` navigation path.

## 4. Risks

- Low risk overall — both changes are additive/consolidating, not redesigns.
- `getDashboardV2Data` now does more work for school users (3 extra parallel queries), each wrapped in `.catch(() => null)` so a failure degrades gracefully (section simply doesn't render) rather than breaking the dashboard.
- Removing the Settings voice UI is a one-way change for users who had bookmarked muscle memory for that location; mitigated by it now being directly in the Tutor Max/Learn header where the voice is actually used.
- `_legacy/page.tsx` still depends on `SchoolDashboard.tsx`, so that component could not be deleted — acceptable since it's dead code on the live path, not a maintenance burden introduced by this work.

## 5. Before / After behavior

**Issue 1**
- Before: voice type (male/female/warm) was changeable in two places (Settings, in-lesson) but only the Settings one persisted; voice speed only existed in Settings; no 0.6x option.
- After: voice type and voice speed (now including 0.6x) are both set directly in the Learn page header next to Tutor Max, and both persist via the same `/api/settings` PATCH endpoint used before. Settings page no longer shows any voice controls. Verified live via screenshots — confirmed working speed dropdown shows `1x` button in the Learn header, and Settings page (screenshot below) shows Profile/My School/Teaching Language/Your Region/Danger Zone only, no voice sections.

**Issue 2**
- Before: a School Mode account hitting `/dashboard` saw a completely different page (`SchoolDashboard`) than a Library Mode account (`DashboardV2`).
- After: both account types render the identical `DashboardV2` shell (same `NavHeader`, `TopBar`, `HeroBanner`, mascot, "Jump back in", "Practice modes", "Your path", "My Subjects" sections). School Mode additionally shows "Recommended next action", "Today's plan", "Academic journey", and "Exam readiness" sections inside that same shell — verified live via screenshots of both a school account (`audit-school-v3@local.dev`) and a library account (`audit-learner-v3@local.dev`), confirmed visually identical shell with school-only content sections layered in.

Screenshots captured during verification: `screenshots/sprint-b-verify/dashboard-school.png`, `dashboard-learner.png`, `learn-school-header.png`, `settings-school.png`.

## 6. Build results

```
npx tsc --noEmit   → exit code 0, zero errors
npm run build      → ✓ Compiled successfully (full route manifest printed, including /dashboard 13.3 kB, /settings 5.36 kB)
                     only pre-existing unrelated warnings (Edge Runtime jose/next-auth, <img> LCP on /leaderboard,
                     react-hooks/exhaustive-deps on LessonScreen.tsx:820 — none introduced by this work)
```

Live verification (Playwright, headed-less Chromium against the dev server):
- Logged in as `audit-school-v3@local.dev` and `audit-learner-v3@local.dev`.
- Confirmed both render the same `DashboardV2` shell.
- Confirmed the Learn page header shows the new voice-speed control alongside the existing voice-type buttons.
- Confirmed the Settings page no longer renders any voice-related section.
