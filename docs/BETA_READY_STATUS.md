# My Tutor — Beta Ready Status

**Date:** 2026-06-19
**Branch:** `claude/my-tutor-foundation-KDSUO`
**Sprint:** Beta Stabilization Sprint E (post CRIT-1 fix)
**Scope:** Remaining beta blockers + production readiness only. No Visual Learning, no UI redesign, no new features, no curriculum changes.

---

## 1. Executive Summary

The single release-blocking bug from the Beta Acceptance Test (CRIT-1 — authenticated requests hang once the Edge-runtime middleware evaluated a Prisma-backed session) was fixed and verified in the previous sprint. This sprint closed out the remaining beta findings (MED-1, MED-2, LOW-1) and verified that LOW-2 was already resolved in the current code.

After this sprint, **there are no known Critical, High, or Medium bugs open.** All issues found during beta testing are either fixed or confirmed to be environmental (AI provider calls are blocked in this sandbox — not an application defect).

**Realistic production readiness: ~90%.** The core product (auth, onboarding, dashboard, library, school mode, study tools, settings, subject management, admin console) is stable under sustained and concurrent load. The remaining ~10% is verification work that cannot be completed in this sandbox, not unfinished code (see §6).

---

## 2. What Was Fixed / Verified This Sprint

| ID | Severity | Title | Status |
|---|---|---|---|
| CRIT-1 | Critical | Authenticated requests hang (Edge middleware ran Prisma) | ✅ Fixed (prior sprint), regression-guarded here |
| MED-1 | Medium | Onboarding redirect flakiness after refresh | ✅ Fixed |
| MED-2 | Medium | Dashboard not updating after subject removal | ✅ Fixed |
| LOW-1 | Low | Theme toggle missing on Settings page | ✅ Fixed |
| LOW-2 | Low | No Admin link on dashboard for admins | ✅ Already implemented; verified live |
| LOW-3 | Low (env) | AI-backed features fail in sandbox | ⚠️ Environmental — needs real network (see §6) |

### Root causes & fixes

- **MED-1** — `/dashboard` decided "is onboarded" from *Profile existence only*, while `/onboarding` decided it from the *`onboardingCompleted` flag*. The two could disagree right after onboarding (or after an interrupted resubmission), bouncing a fully-onboarded user back into the wizard on a hard refresh. **Fix:** `/dashboard` now reads the user with `withRetry`, treats Profile existence as the source of truth, and self-heals a stale `onboardingCompleted` flag — the same auto-heal pattern `/coach` and `/learn` already use, so no two pages disagree.
- **MED-2** — `/api/subjects/unenroll` (and `/enroll`) soft-toggled `ProfileSubject.isActive` but never called `revalidatePath`, so the server-rendered dashboard could show the removed subject until a hard reload. **Fix:** both routes now `revalidatePath('/dashboard')` and `revalidatePath('/library')` after the mutation.
- **LOW-1** — The `ThemeToggle` was rendered in the dashboard/lesson/onboarding nav but not on `/settings`. **Fix:** added `ThemeToggle` next to the existing `LanguageToggle` in the Settings nav bar.
- **LOW-2** — `NavHeader` already conditionally renders an `⚙ Admin` link when `userRole === 'ADMIN'`, and the dashboard reads `role` fresh from the DB. Confirmed live: link present for an admin, absent for a student.

### Subject management hardening (Task 2)

Remove → re-add cycle verified at the data layer:
- Remove is a **soft-deactivate** (`isActive = false`); progress, level, certificates, sessions are never deleted.
- Re-add is an **upsert** that reactivates the same record — **`currentLevelIndex`, `targetLevelIndex`, and `progressPercent` are preserved exactly** (verified: python at level 2 / target 4 / 65% survived a full remove→re-add).
- Both remove and add are **idempotent** (double-remove is rejected cleanly; double-add upserts without duplication).
- Dashboard subject **card** correctly disappears on remove and reappears on re-add (checked via the card's `aria-label="Remove <name>"`, distinct from preserved history text).

---

## 3. Remaining Bugs by Severity

### Critical
**None.**

### High
**None.**

### Medium
**None open.** (MED-1 and MED-2 fixed this sprint.)

### Low
- **LOW-3 (environmental, not a code defect):** AI-backed features — AI chat tutor, quiz/mock generation, Revision Notes — return errors in this sandbox because outbound calls to OpenRouter / Gemini / Groq are blocked by the sandbox network policy. The UI degrades cleanly (error state + retry). Must be re-verified in an environment with real outbound network access before launch.

### Non-bug observations (carried from beta report, optional polish)
- "Enrolled" indicator near a just-added library subject could be made more visually unambiguous.
- School-mode dashboards don't always render literal "Grade 8/10" text (content isolation is correct; only the literal label is missing).
- Occasional `404` for a small static asset (likely favicon) and `ERR_CERT_AUTHORITY_INVALID` from a third-party embedded resource in the sandboxed browser — neither blocks functionality.

---

## 4. Live Verification Evidence (this sprint)

All tests run against a fresh `npm run dev` with seeded demo accounts (student with progress + certificate + completed sessions, admin, school student).

- **Login:** student / admin / school all return `callback=302` + `session=200` with correct session JSON.
- **MED-1:** 5/5 dashboard loads stay on `/dashboard`; precise stale-flag test (profile present, `onboardingCompleted=false`) → stayed on `/dashboard` and **healed the flag to true**; 8 rapid refreshes under load → 0 bounces.
- **MED-2:** subject card present → **absent after remove** → present after re-add (verified via `aria-label`).
- **LOW-1:** `Switch to light/dark mode` toggle present in `/settings` HTML.
- **LOW-2:** `href="/admin">⚙ Admin` present on admin's dashboard; **correctly absent** for a student; student hitting `/admin` is redirected to `/dashboard`.
- **Task 2:** progress/level preserved across remove→re-add; double-remove/double-add idempotent.
- **Task 3 (long-session stability):**
  - 150 sequential authenticated `/api/auth/session` → **0 failures, 0 slow (>1s)**, ~11s total.
  - 135 mixed authenticated route requests (3 accounts × `/dashboard`,`/settings`,`/progress` × 15) → **0 failures**.
  - 80 concurrent `/dashboard` requests → **0 non-200**.
  - Authenticated route sweep (`/dashboard`, `/library`, `/progress`, `/coach`, `/settings`, `/flashcards`, `/certificates`, `/leaderboard`, `/learn`) → all `200`.
  - School-mode sweep (default + `?mode=school`) → all `200`, renders School content.
  - Post-load: session still valid, no redirect-to-login loop, no stale session, no redirect loops; dev server error log clean.

---

## 5. Build Status

- `npx prisma generate` → ✅ success
- `npx tsc --noEmit` → ✅ zero errors
- `npm run build` → ✅ success (all routes compiled; `ƒ Middleware 79.6 kB`; `/settings` 5.94 kB, `/dashboard` 14 kB)

---

## 6. Realistic Production Readiness: ~90%

**Ready now (verified):** authentication & session stability, onboarding, dashboard (library + school modes), subject add/remove with progress preservation, study tools, settings (incl. theme + language), account deletion, admin console access control, board/grade isolation.

**Remaining ~10% — verification, not unbuilt features:**
1. **AI features on a real network (~5%):** chat tutor, quiz/mock generation, and Revision Notes are untestable in this sandbox (outbound AI calls blocked). They must be exercised in staging with live OpenRouter/Gemini/Groq keys before launch.
2. **CRIT-1 fix on the real deploy target (~3%):** the fix is correct and verified against `next dev` Edge emulation and an Edge-safe middleware config; confirm once more on the actual Vercel/Node deployment target, since dev-mode Edge emulation can differ from production.
3. **Standard pre-launch QA (~2%):** real-browser smoke pass across major flows on staging, plus the minor cosmetic polish items in §3.

**Recommendation:** the app is beta-ready and safe to deploy to a staging environment with real network access. Promote to production after the three verification items above are signed off.
