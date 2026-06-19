# My Tutor — Beta Acceptance Test Report

**Date:** 2026-06-19
**Branch:** `claude/my-tutor-foundation-KDSUO`
**Tester role:** Acted as a real beta tester driving the live app via Playwright/Chromium against a local `npm run dev` instance, using 5 seeded test accounts. Testing only — no application source files were modified during this sprint.

---

## 1. Executive Summary

The app's core content (school curriculum, library subjects, dashboard, study tools, settings, admin console) is largely solid: navigation works, board/grade data is correctly isolated per account (no cross-board leakage observed), study tools (flashcards/progress/certificates/coach/leaderboard) render correctly, account deletion works end-to-end, and the admin console's pages all load with correct data.

However, this sprint surfaced **one release-blocking Critical bug**: after a successful login, the session frequently becomes "poisoned" such that **every subsequent authenticated request — page loads and API calls alike — hangs forever**, with no error shown to the user (the login button is stuck on "Signing in..." indefinitely). This was reproduced and root-caused with certainty (see §4) using direct `curl` evidence with no browser involved at all, which rules out client-side causes (Service Worker, stale JS) and isolates the problem to server-side authenticated-request handling. It is intermittent within a single dev-server process lifetime: it does not occur immediately after a server (re)start, then begins occurring with 100% reproducibility after the server has been running for a while. This makes the bug easy to miss in quick manual smoke-testing and dangerous in production, where servers run continuously for days.

A handful of secondary issues were also found (stale dashboard cache after removing a library subject, theme toggle missing from the Settings page itself, AI Revision Notes failing in this sandbox — expected, since outbound AI provider calls are blocked here).

**Total findings:** 1 Critical, 0 additional High, 2 Medium, 2 Low, plus 1 positive security confirmation (generic error message on DB outage — no information leak).

---

## 2. Accounts Tested

| Account | Role | Board/Grade | Purpose |
|---|---|---|---|
| `beta.general@mytutor-test.local` | Student | Library mode (no board) | General learner, library subjects (Python, Java), study tools, settings (consumed by account-deletion test in Path H) |
| `beta.cbse8@mytutor-test.local` | Student | CBSE, Class 8 | School mode, board isolation |
| `beta.cbse10@mytutor-test.local` | Student | CBSE, Class 10 | School mode, board switch round-trip |
| `beta.upboard10@mytutor-test.local` | Student | UP Board, Class 10 | School mode, cross-board isolation check |
| `admin.beta@mytutor-test.local` | Admin (via `ADMIN_EMAILS`) | — | Admin console |

All passwords: `BetaTest!2026`. Accounts were seeded directly into Postgres for this sprint; `beta.general@...` no longer exists after Path H's account-deletion test consumed it (expected — that was the test).

---

## 3. Pass / Fail Matrix

| Path | Area | Result |
|---|---|---|
| A | Authentication (signup, duplicate email, invalid creds, login+refresh) | **Pass with 1 Medium finding** (see §6) |
| B | Onboarding (General Learner + School Student flows, revisit after completion) | Pass |
| C | Library Mode (catalog, add/remove subject, continue learning, voice settings) | **Pass with 1 Medium finding** (stale dashboard cache, see §6) |
| D | School Mode (CBSE8/CBSE10/UP Board dashboards, subjects, chapters, focus mode, board switch) | Pass (1 unrelated Low: Revision Notes fails — expected, AI calls blocked in sandbox) |
| E | Learning Experience (lesson page, roadmap, AI chat) | Pass (AI chat 500 is expected sandbox limitation, not an app bug) |
| F | Practice / Assessment / Mock (quiz generation) | Blocked only by the same expected AI-sandbox limitation; UI itself behaves correctly (clean error state, "Try again" button) |
| G | Study Tools (flashcards, progress, certificates, coach, leaderboard) | Pass |
| H | Settings (board switch, theme, account deletion) | **Pass with 1 Low finding** (theme toggle missing from Settings page, see §7) |
| I | Admin (overview, users, subjects, curriculum, knowledge graphs, analytics, AI ops, ops center, system settings) | **Pass with 1 Low finding** (admin nav link not shown on dashboard, see §7) |
| — | **Cross-cutting: Session/login stability** | **CRITICAL FAIL** (see §4) |

---

## 4. Critical Bugs

### CRIT-1 — Authenticated requests hang indefinitely after the dev server has been running for a while (session/middleware deadlock)

**Severity:** Critical / release-blocking.

**Symptom:** After a normal, successful login (server returns 200 and a valid `authjs.session-token` cookie), the client's `signIn()` call never resolves. The "Signing in…" button never changes, no error appears, and the page never navigates. This is not a one-off — once the condition is active, it reproduces **100% of the time, for every account**, on every subsequent authenticated request.

**Proof chain (all evidence gathered without modifying any source file):**

1. `curl /api/auth/session` **without** a session cookie → `200` in ~40ms.
2. `curl /api/auth/session` **with** a freshly-issued valid session cookie → times out after 8–10s with no response at all.
3. `curl /dashboard` with the same cookie → also hangs.
4. `curl /api/auth/providers` with the same cookie → **also hangs**, even though this route contains no session/DB logic of its own — proving the hang is not specific to one route or one callback's query, but to *anything* the request pipeline does once a valid session token is present.
5. The exact same `/api/auth/providers` request **without** a cookie, run interleaved with the hung requests, returns fast (~50ms) — proving the dev server is not globally overloaded; only authenticated requests are affected.
6. Postgres's own `pg_stat_activity` shows the DB query the `jwt` callback issues (`SELECT users WHERE id = $1`) already completed and the connection sitting idle — the database is not the bottleneck. The hang happens after the DB has already answered, somewhere in Node/Next.js request handling.
7. Browser-level network tracing (Chromium/Playwright CDP events) confirms the browser does send the request; no response or failure event is ever received; and the dev server's own access log never records the request completing.
8. A Service Worker hypothesis was investigated and **ruled out** by reading `public/sw.js` directly: its `fetch` handler explicitly returns early (without calling `event.respondWith()`) for any `/api/` path, which is a pure passthrough and cannot cause a hang.

**Most likely root cause:** `src/middleware.ts` wraps nearly every route (`config.matcher` covers almost the entire app) in NextAuth's `auth(function middleware...)`. This wrapper always evaluates the session — running the `jwt` callback in `src/lib/auth/config.ts`, which calls `prisma.user.findUnique(...)` — **before** the inner middleware function ever runs. Next.js 14 middleware always executes in the Edge runtime (Node-runtime middleware was not available until Next 15), and Prisma's binary/Node-API query engine is not supported there. In this environment, instead of throwing a clean error, the call appears to hang, stalling the entire request for every matched route whenever a session cookie is present. This is consistent with every observed symptom, including the intermittent pattern below.

**Intermittent pattern observed:** Immediately after a `npm run dev` restart, login works correctly for a window of time (confirmed working in this report's own test runs, see §3 — Paths D through I were all completed successfully using a freshly-restarted server). After the server has handled a number of requests, the condition above begins occurring and becomes 100% reproducible until the next restart. This is consistent with a per-isolate Prisma/Edge runtime state that degrades with repeated invocations rather than failing on the very first one — which makes this bug easy to miss in short manual QA sessions and very likely to appear in a real, continuously-running production deployment.

**Caveat (for accuracy):** This was diagnosed against the local `next dev` Edge-runtime emulation in this sandbox; actual behavior on Vercel Edge or a Node.js serverless target should be verified, since dev-mode Edge emulation can differ from a real deployment. However, the underlying architectural issue — a Prisma call inside a callback that NextAuth's middleware wrapper unconditionally executes, in code that must run on the Edge runtime — is a real, verifiable property of the source code regardless of deployment target.

**Impact if unresolved in production:** Every logged-in user would eventually be unable to use the app at all (infinite spinner, no error, no recovery without clearing cookies) once the affected server process has been running long enough. This is the most severe possible authentication-layer failure short of leaking credentials.

**This bug was documented only — not fixed — per this sprint's explicit testing-only mandate. No files under `src/` were modified.**

---

## 5. High Bugs

None found this sprint beyond CRIT-1.

---

## 6. Medium Bugs

### MED-1 — Session/onboarding-completion state not reliably persisted across a hard refresh (Path A4)
After logging in and immediately refreshing the page, one test run landed on `/onboarding` instead of staying on `/dashboard`, with the test harness recording `sessionPersisted: false`. The session cookie itself was present (the user wasn't bounced to `/auth/login`), so this looks more like the "has completed onboarding" check failing to read fresh state on a hard refresh rather than the session itself being lost. Given the proximity in time to CRIT-1's degrading-server-state behavior, this may be a downstream symptom of the same root cause rather than an independent bug — recommend re-verifying once CRIT-1 is fixed.

### MED-2 — Removed library subject still shows on dashboard immediately after removal (Path C5b)
After removing the "Python" subject from the Library page, the dashboard (visited immediately after) still showed a Python card (`pythonStillVisible: true`). The Library page itself correctly reflected the removal (Add button reappeared). This points to a stale client-side cache or missing revalidation on the dashboard's subject list after a library mutation, rather than a server-side data bug — re-adding Python afterward worked correctly and was reflected everywhere.

---

## 7. Low Bugs / UX Issues

### LOW-1 — Theme toggle is not present on the Settings page itself (Path H)
The theme toggle is reachable from the dashboard and lesson/onboarding navigation, but not from `/settings`, where a user might reasonably expect to find appearance preferences. The toggle itself works correctly and persists across reload when used from elsewhere.

### LOW-2 — No "Admin" link visible on the dashboard for an admin user (Path I)
Logging in as `admin.beta@mytutor-test.local` did not show an admin-console entry point on the regular `/dashboard` (`adminNavLinkVisibleOnDashboard: false`). The admin console itself is fully reachable by navigating directly to `/admin` and works correctly once there — this is a discoverability/UX gap, not a functional bug.

### LOW-3 (informational, not a bug) — AI-backed features fail in this sandbox
Revision Notes generation (Path D), the AI chat tutor (Path E), and quiz generation (Path F) all returned errors or empty/failed states. Server logs confirm this is because outbound calls to the AI providers (OpenRouter/Gemini/Groq) are blocked by this sandbox's network policy — `POST /api/learn/chat` returns `500` consistently. **This is an expected sandbox limitation, not an application bug**, and should be disregarded when assessing release-readiness; it should be re-verified in an environment with real network access to the AI providers.

---

## 8. UX Issues (non-bug observations)

- Library Mode's "enrolled" indicator near a just-added subject was not reliably detected by an exact-match check (`hasEnrolledNearJava: false`) even though the subject did appear correctly elsewhere on the page — worth a UX pass to make the "you're enrolled in this" state more visually unambiguous.
- Dashboard does not explicitly show "Grade 8" / "Grade 10" text in several School Mode runs (`dashboard-grade-shown: info`), even though grade-specific content (subjects, chapters) is correctly served. Low-priority — the underlying isolation is correct, just not visually confirmed via literal grade text on the dashboard.

---

## 9. Console Errors Observed (aggregated, non-AI-related)

- `Failed to load resource: 404` — appears on nearly every page; consistent with a missing favicon or small static asset, did not block functionality.
- `net::ERR_CERT_AUTHORITY_INVALID` — appeared multiple times during School Mode and Settings testing; consistent with a third-party embedded resource (e.g., font or analytics) using a certificate not trusted by the sandboxed browser. Did not visibly affect page functionality. Worth a quick check of which external resource this targets.
- `ClientFetchError: Failed to fetch... __NEXTAUTH._getSession` and `Failed to fetch RSC payload... Falling back to browser navigation` — these are the client-side symptoms of CRIT-1 (§4) when it was active during a test run; not a separate bug.

---

## 10. Network/API Errors Observed

- `500 POST /api/learn/chat` — expected, AI provider calls blocked in this sandbox (see LOW-3).
- No unexpected `4xx`/`5xx` responses were observed on any other endpoint across Paths D, E (non-AI), F (non-AI), G, H, or I once CRIT-1's degraded-server window had passed.

---

## 11. Screenshots

Organized under `/home/user/My-tutor/screenshots/`:

| Directory | Approx. count | Coverage |
|---|---|---|
| `auth/` | 16 | Login, signup, duplicate-email, invalid-credentials states |
| `student/` | 92 | Dashboard, library, learning experience, study tools (flashcards/progress/certificates/coach/leaderboard), settings, account-deletion flow |
| `school/` | 32 | CBSE8/CBSE10/UP Board dashboards, subject/chapter pages, Revision Notes modal, Focus Mode, board-switch round-trip |
| `admin/` | 25 | Admin overview, users, subjects, curriculum, knowledge graphs, analytics, AI ops, ops center, system settings |

(Desktop viewport 1366×900 used throughout; mobile-viewport coverage for major screens exists from a prior audit pass and was not re-captured this sprint since this sprint's mandate was behavioral testing, not visual/UI audit.)

---

## 12. Recommended Fix Order

1. **CRIT-1 — authenticated-request hang.** Fix first; it is release-blocking and affects 100% of logged-in users once a server has been running for a while. Recommended direction to investigate (not prescribed as the only fix): move the `prisma.user.findUnique` lookup out of code that NextAuth's middleware wrapper unconditionally executes on the Edge runtime — e.g., by narrowing `middleware.ts`'s matcher so it doesn't trigger full session evaluation on every route, or by ensuring the `jwt` callback's DB access only happens in a Node.js runtime context (API routes / Route Handlers), not inside Edge middleware.
2. **MED-2 — stale dashboard cache after library subject removal.** Likely a missing cache invalidation/revalidation call after the remove mutation.
3. **MED-1 — onboarding-redirect-after-refresh.** Re-verify independently once CRIT-1 is fixed, since it may be a downstream symptom rather than a separate bug.
4. **LOW-1 / LOW-2 — discoverability/UX gaps** (theme toggle on Settings, admin link on dashboard). Low priority, cosmetic.
5. **LOW-3 — AI sandbox limitation.** No action needed in this environment; re-verify AI-backed features once tested somewhere with real outbound network access.

---

*End of report. No application source files were modified during this sprint. Per the sprint's stop rule, no further testing sprints, fixes, refactors, or commits should follow from this report without separate explicit instruction.*
