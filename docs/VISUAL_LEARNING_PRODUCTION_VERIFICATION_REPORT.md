# Visual Learning Production Verification Report

Verification-only sprint. **No code was modified, no commits were made, no
pushes were made.** Branch at start and end: `claude/my-tutor-foundation-KDSUO`
at `0ccab9b` (unchanged — `git status --short` shows zero tracked-file diffs
from this session; the three pre-existing untracked audit docs from earlier
read-only sessions were left untouched per their own no-commit instructions).

Method: dev server (`npm run dev`) launched against a local Postgres instance
seeded with real accounts; driven live with Playwright (Chromium) through the
actual browser UI — no unit tests, no `import`-and-call of internal functions,
no `tsc`/build runs used as a substitute for runtime observation.

---

## Task 1 — Pipeline audit (confirmed against running code, not just docs)

Traced and confirmed live:

```
Tutor Response (msg.content)
  → LessonScreen.tsx renders <VisualCard type={msg.visual}
        hasNarration narrationTimeline={extractNarrationSegments(msg.content, msg.visual)} />
  → narrationSource.ts splits text into LessonSegments (1:1 with visual steps)
  → VisualCard: useNarrationMode = hasNarration && segments.length > 0
      owns NarrationProgress, auto-advances via setTimeout
      (NARRATION_STEP_DURATION_MS / narrationSpeed)
      narrationStep = visualStepForSegment(progress, stepCount)   [synchronizedPlayback.ts]
  → useTeachingPlayback({ mode: 'narration', narrationStep, speed })
  → VisualComponent renders at revealStep
Fallback (no narration) → useTeachingPlayback({ autoPlay, speed }) — Sprint R.1 timer, unchanged
```

This matches the architecture documented in `docs/SPRINT_U_LANDING_REPORT.md`
exactly; no drift found between docs and shipped code.

**Critical blocker found during Task 1 that affects Task 2 (see below):**
this sandbox's network egress allowlist does not include `api.groq.com`
(confirmed via dev-server log: `routeAI error: 403 Host not in allowlist:
api.groq.com`), and `.env`'s `GROQ_API_KEY` is also empty. There is no
OpenRouter/Gemini key configured either. **The real production path
(`/api/learn/chat` → live AI text → `msg.content` → `narrationSource.ts`)
cannot be exercised end-to-end in this sandbox at all** — every chat send
returns `Error: AI service temporarily unavailable` and the server logs a
403 from the network policy. This is an environment limitation, not a code
defect (confirmed: `routeAI` correctly catches the failure and returns the
user-facing fallback message, and `/api/learn/chat` correctly returns 500
with a logged `[monitor]` entry — the *error handling* itself works
correctly, it's the AI call that the sandbox cannot make).

## Task 2 — Per-visual testing: result is PASS for 5/10, BLOCKED for 5/10

Given the AI blocker above, the real `msg.content`-driven path could not be
driven for **any** of the 10 visual types in this sandbox. The dev-only
verification surface that Sprint U itself built for exactly this situation —
`/dev/visual-demo` → `LiveNarrationPlaybackViewer` — drives the same
canonical `VisualCard` narration engine from hand-authored narration
(`lessonNarration.ts`) instead of live AI text, so it was used as the next-
best real runtime surface (real React component tree, real `setTimeout`
auto-advance, real `synchronizedPlayback.ts`, real SVG renderers — only the
narration *source* differs from production).

`LiveNarrationPlaybackViewer` hard-codes exactly **5** of the 10 types:
`number_line`, `fraction_bar`, `coordinate_plane`, `water_cycle`, `food_chain`.
The other 5 (`percentage_grid`, `geometry_shape`, `solar_system`,
`force_diagram`, `circuit_diagram`) have authored narration in
`lessonNarration.ts` (confirmed by reading the file — `getAuthoredNarration`
is keyed by `VisualType`, all 10 cases exist) but are **not wired into any
dev-only viewer**, so there is no runtime surface to drive them without
writing new code, which this sprint is explicitly forbidden from doing.

### Results for the 5 drivable types (number_line, fraction_bar, coordinate_plane, water_cycle, food_chain)

All 5 — **PASS**, identical behavior pattern observed for each:

| Check | Result | Evidence |
|---|---|---|
| Animation starts (blank → progressive reveal) | ✅ | `number_line`: blank at t=0/400ms → arrow line only at t=1200ms → full ticks + zero-marker at t=2000ms. Same staged reveal confirmed visually for `fraction_bar` (bars filled 1-by-1) and `water_cycle`/`food_chain` (full diagrams only appear at completion). |
| Narration advances steps (not an instant jump) | ✅ | Same evidence as above — multiple distinct intermediate frames captured, not a single 0→done transition. |
| Replay works | ✅ | Clicking ↺ mid-playback reset the SVG to blank and restarted the staged reveal from segment 0 (captured for `number_line`, `fraction_bar`, `coordinate_plane`). |
| Pause works | ✅ | Paused mid-reveal (line drawn, no ticks yet); screenshot taken, then **identical** screenshot taken again 1.5s later — frame did not advance while paused. |
| Resume works | ✅ | Un-pausing from the same frame continued forward to full completion. |
| Speed control works | ✅ | Clicking 1.5x changes the active speed-button highlight immediately and the segment interval visibly shortens (full completion reached within ~2s at 1.5x vs ~2.8s baseline at 1x, consistent with `NARRATION_STEP_DURATION_MS / speed`). |
| Final state is correct | ✅ | `number_line`: full ruler -5..5 with 0 highlighted. `fraction_bar`: all 3 bars (1/2, 3/4, 2/3) fully filled with labels. `coordinate_plane`: axes + grid + plotted point (2,3) labeled. `water_cycle`: full diagram (sun, cloud, evaporation/precipitation/runoff arrows, all labels). `food_chain`: full 5-node chain (Sun→Grass→Grasshopper→Frog→Snake) with role labels. All match `VISUAL_META` descriptions and `buildSyncPlan` status `ok` (full segment-to-step coverage, no overflow) shown live on the page for all 5. |

🔍 **Probe — rapid-fire abuse** (20× replay-click, then 20× pause-toggle,
then 20× speed-cycle, all with zero delay, on `number_line`): zero
`pageerror` events thrown, zero console errors. A screenshot taken
*immediately* after the spam showed a transient blank SVG (mid-render from
the in-flight replay reset), but it **self-corrected to the correct final
state within ~1–4 seconds with no errors** — this is expected re-settling
after redundant resets, not a stuck or broken state. Confirmed by
re-screenshotting at +1s and +4s.

🔍 **Probe — multi-tab isolation**: opened a second independent browser
context/session to `/dev/visual-demo` while the first tab's narration was
mid-playback. Second tab loaded and animated independently with zero errors
in either tab — no shared/leaked state between sessions.

🔍 **Probe — mobile viewport** (390×844, iPhone-sized): `/learn` renders with
a tabbed Lesson/Code/Chat layout (no broken overflow, no clipped controls).

### Result for the 5 non-drivable types (percentage_grid, geometry_shape, solar_system, force_diagram, circuit_diagram)

**BLOCKED — no runtime surface exists to exercise Sprint U's narration mode
for these 5 types in this sandbox.** Two independent blockers stack here:
(1) live AI is unreachable (network policy), and (2) the dev-only narration
viewer that would otherwise substitute for it only covers 5 of the 10 types.

As partial, secondary evidence: `percentage_grid` and `geometry_shape` were
observed rendering and animating correctly under the **older Sprint R.1
timer-mode** demo section on the same `/dev/visual-demo` page (play/pause/
replay/speed all functional, final state correct) — but that is the
pre-Sprint-U timer path, not the narration-sync path this sprint exists to
verify, so it does not close this gap. `solar_system`, `force_diagram`, and
`circuit_diagram` were not observed at all in this sandbox.

## Task 3 — School Mode subject consistency: PASS

Verified `getUserNavSubjects.ts` (the documented single source of truth used
by both `getDashboardV2Data.ts` and `learn/page.tsx`) live, for two boards:

- **CBSE, Grade 8** (`shot.school@mytutor-demo.local`, pre-existing seeded
  account): dashboard "My Subjects" showed exactly **Mathematics, Science,
  Social Science, English, Hindi, Sanskrit, Urdu** (7). `/learn`'s subject
  dropdown showed "7 subjects, current subject: Mathematics" plus the
  identical other 6 — **exact match**.
- **UP Board, Grade 8** (`verify.upboard@mytutor-demo.local`, seeded this
  session via direct Prisma upsert — same pattern as the pre-existing
  `scripts/seed-screenshot-demo.ts`, no app code touched): dashboard showed
  **Mathematics, Science, English, Hindi, Sanskrit, Social Science, Urdu**
  (7, same set as CBSE for Grade 8 — expected, since both boards' Grade 8
  catalogs bundle the same subject set per `schoolRouting.ts`). `/learn`
  dropdown again showed the identical 7 — **exact match**.

No drift found between dashboard and Learn page for either board.

## Task 4 — Password-reset flow: end-to-end PASS, failure point precisely identified

Drove the real flow through the browser, not the API directly:

1. `/auth/forgot-password` → submitted a real seeded email → `POST
   /api/auth/forgot-password` returned `200 {"success":true,"message":"If
   that email exists, a link was sent"}` (anti-enumeration `safeResponse()`
   confirmed live — same response shape regardless of whether email exists).
2. **Exact failure point, confirmed from the live server log**: `[email]
   SMTP not configured — RESET LINK (dev mode): http://localhost:3000/auth/
   reset-password?token=<64-hex-chars>`. This is `sendPasswordResetEmail`'s
   documented dev-mode console-log fallback firing because no SMTP env vars
   (`SMTP_HOST`/`SMTP_USER`/etc.) are set in this sandbox's `.env` — **not**
   a code bug, **not** a token-generation bug, **not** an API-route bug. The
   token generation, hashing (`createHash('sha256')`), and DB write
   (`VerificationToken`) all executed correctly before the email-send step
   was reached; only the actual email-provider transport is unconfigured.
3. Followed the real dev-mode link → reset-password page loaded with the
   valid token, filled a new password twice, submitted → `POST
   /api/auth/reset-password` returned 200 → UI showed "Password changed...
   Redirecting to login."
4. Logged in with the **new** password at `/auth/login` → landed on
   `/dashboard` — confirms the new password hash was actually persisted and
   NextAuth Credentials login accepts it.
5. 🔍 **Probe — token reuse**: replayed the *same* (already-consumed) token
   against `POST /api/auth/reset-password` → correctly rejected with `400
   {"error":"Invalid or expired reset link"}`. One-time-use enforcement
   confirmed working (token row is deleted/invalidated after first
   successful use).

**Verdict: the password-reset flow works correctly end-to-end in this
sandbox; the only "failure" is the expected, documented SMTP-not-configured
fallback, which behaves exactly as designed (logs the link instead of
emailing it) rather than failing the request.**

## Task 5 — Break-testing summary

| Test | Result |
|---|---|
| Rapid replay spam (20×, 0 delay) | ✅ No errors; transient blank frame self-corrects in <4s |
| Rapid pause/play toggle spam (20×) | ✅ No errors; final state correct |
| Rapid speed-cycle spam (20×, all 5 speeds) | ✅ No errors; final selected speed displayed correctly |
| Multiple visuals rendering simultaneously (5 cards on one page, all auto-playing) | ✅ All 5 progressed and completed independently, no cross-contamination |
| Multiple browser tabs/sessions concurrently | ✅ Fully isolated, zero shared-state leakage, zero errors in either tab |
| Mobile viewport (390×844) | ✅ `/learn` renders correctly with tabbed mobile layout, no overflow/clipping |
| Lesson switching | ⚠️ Not exercised — requires a working AI response to advance to a second lesson with a different visual; blocked by the same network restriction as Task 2 |

## Task 6 — Failures / findings, severity, recommended fixes

| # | Finding | Severity | Reproduction | Recommended fix |
|---|---|---|---|---|
| 1 | Live AI (`api.groq.com`) is not reachable in this sandbox's network policy, and no AI provider key is configured in `.env` either. This blocks **all** real production narration testing (Task 2's primary ask) — every `/api/learn/chat` call returns the static fallback error. | **High** (blocks verification, not a code defect) | Log in, send any chat message on `/learn` → `Error: AI service temporarily unavailable`. Server log shows `403 Host not in allowlist: api.groq.com`. | Not a code fix — either add `api.groq.com` (and/or OpenRouter/Gemini hosts) to this sandbox's network egress allowlist, or supply a working `GROQ_API_KEY`/`OPENROUTER_API_KEY` so live AI calls succeed for future verification sessions. |
| 2 | `LiveNarrationPlaybackViewer.tsx` only covers 5 of the 10 production `VisualType`s (`number_line`, `fraction_bar`, `coordinate_plane`, `water_cycle`, `food_chain`), even though `lessonNarration.ts`'s `getAuthoredNarration()` already has authored narration for all 10. This leaves `percentage_grid`, `geometry_shape`, `solar_system`, `force_diagram`, `circuit_diagram` with **no dev-only narration-mode verification surface at all** — the only way to test their narration-sync behavior is live AI, which is blocked by Finding 1. | **Medium** (verification-coverage gap, not a production defect — these 5 types' rendering itself works fine in the older Sprint R.1 timer-mode demo) | Open `/dev/visual-demo`, scroll to "Visual Learning Sprint U" section → only 5 cards present. | Out of scope to fix this sprint (verification-only, no implementation). Recommended for a future sprint: extend `LiveNarrationPlaybackViewer`'s `types` array to all 10 `VisualType`s — a one-line change, since `getAuthoredNarration` already supports them. |
| 3 | Immediately after extreme rapid-click abuse (40+ clicks with 0 delay across replay/pause/speed), the visual SVG can render blank for a brief instant before self-correcting. | **Low / cosmetic** (no error thrown, no stuck state, fully recovers within ~1–4s) | Click replay/pause/speed buttons in rapid succession with no delay between clicks, screenshot immediately. | No action recommended — this is expected transient re-render behavior under unrealistic input rates, not a functional bug. |
| 4 | "Lesson switching" (Task 5) could not be exercised because it requires a successful AI response to reach a second lesson screen with a different visual — same root cause as Finding 1. | **Info** (test not executable, not a defect) | N/A | Re-run this specific check once Finding 1 is resolved. |

No regressions found in School Mode subject consistency (Task 3) or
password-reset (Task 4) — both are fully working as designed.

---

## Running instructions (local computer)

```bash
# 1. Install & configure
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32)
# Required for live AI / narration-from-real-content testing (NOT configured
# in this sandbox — this is exactly Finding 1 above):
#   GROQ_API_KEY=<your key>   (or OPENROUTER_API_KEY / Gemini equivalent)
npm install

# 2. Database
npx prisma db push
npx tsx scripts/seed-screenshot-demo.ts
# Creates known test accounts (password DemoPass123! for all):
#   shot.student@mytutor-demo.local  (STUDENT, library mode)
#   shot.admin@mytutor-demo.local    (ADMIN)
#   shot.school@mytutor-demo.local   (SCHOOL_STUDENT, CBSE Grade 8)

# 3. Run
npm run dev             # http://localhost:3000
npm run build            # prisma generate && next build
npx tsc --noEmit         # pre-existing stripe/subscription errors expected on feature branches

# 4. Manually verify the narration engine without live AI
#    (the dev-only path this report used for Task 2's 5 testable types):
#    log in as shot.student@mytutor-demo.local, visit:
http://localhost:3000/dev/visual-demo
#    scroll to "Visual Learning Sprint U — Live Narration → Visual Playback"

# 5. Manually verify password reset end-to-end
#    (works without any AI/SMTP key — dev-mode fallback logs the link):
http://localhost:3000/auth/forgot-password
#    submit any real account's email, then check the terminal running
#    `npm run dev` for a line starting "[email] SMTP not configured —
#    RESET LINK (dev mode): ..." and open that URL.

# 6. Manually verify School Mode subject consistency for any board/grade:
#    compare the "My Subjects" cards on /dashboard against the subject
#    dropdown at the top of /learn — both call getUserNavSubjects.ts and
#    must always show an identical subject list.
```

---

**STOP AFTER REPORT.** No implementation performed. No commits made. No
pushes made. This report and all findings are observational only.
