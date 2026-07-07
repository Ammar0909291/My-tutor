# Feature Parity Report — Candy UI Rollout

**Branch:** `claude/my-tutor-foundation-KDSUO`  
**Date:** 2026-06-16  
**Scope:** READ-ONLY audit. No code changes made.  
**Method:** `git show <commit> -- <file>` diff inspection for every converted file; current-file grep for every interactive pattern (`<button`, `<a`, `<Link`, `<input`, `<select`, `<textarea`, `onClick`, `onChange`, `onSubmit`, `href=`, `router.push`, `disabled`). Cross-referenced against route existence on disk.

---

## Executive Summary

**Zero interactive elements were hidden, removed, disabled, or turned into dead placeholders by the candy UI rollout.** All six conversion groups touched CSS, layout primitives, and wrapper shells only. Every button, link, input, toggle, form, server action, and data-fetch that existed before the restyle exists and is wired identically after it.

Three pre-existing design gaps are documented (not introduced by the restyle). Two admin pages are explicitly labelled "planned for a future sprint" — pre-existing intentional stubs. All `href="#"`, empty `onClick`, `display:none`, and `visibility:hidden` checks returned zero matches.

---

## Commits Audited

| Group | Commit | Files changed |
|---|---|---|
| Group 1 | `89cd9e8` | library, progress, leaderboard, flashcards, quiz |
| Group 2 | `c36c151` | learn (LessonScreen CSS module), coach |
| Group 3 | `4ddc5f6` | settings, onboarding, auth/login, auth/signup, auth/forgot, auth/reset |
| Group 4 | `1101372` | landing (/), certificates, certificates/[code] |
| Group 5 | `4de97bc` | all school/** pages |
| Group 6 | `159b356` | admin/layout.tsx only |

---

## Cross-Cutting Dead-Element Checks

| Check | Result |
|---|---|
| `href="#"` anywhere in src/ | **0 matches** ✅ |
| `onClick={}` or `onClick={undefined}` hardcoded | **0 matches** ✅ |
| `display:none` on any interactive element | **0 matches** ✅ |
| `visibility:hidden` on any interactive element | **0 matches** ✅ |
| `CandyButton` passes through `disabled` prop | ✅ confirmed via `{...rest}` spread onto `<button>` |

---

## Per-Screen Checklist

### `/` — Landing Page

**Candy change:** Root `<div>` → `<CandyPage legacy>`. One line. Zero JSX logic touched.

| Element | Present | Wired | Notes |
|---|---|---|---|
| Logo → `/` | ✅ | ✅ Link | |
| `#features`, `#how`, `#pricing`, `#faq` anchor nav links | ✅ | ✅ `<a href="...">` | |
| Country pill buttons (RU / IN / GL) | ✅ | ✅ `onClick→handleCountrySelect(key)` | ⚠ Desktop-only (`hidden md:flex`) — not in mobile menu. Pre-existing. |
| LanguageToggle (desktop nav) | ✅ | ✅ | |
| Theme toggle (☀/🌙) | ✅ | ✅ `onClick→toggleTheme()` | |
| "Log in" / "Get Started" nav CTAs (guest) | ✅ | ✅ Link `/auth/login`, `/auth/signup` | |
| Dashboard link / avatar (authed) | ✅ | ✅ Link `/dashboard` | |
| Sign out button (authed nav) | ✅ | ✅ `onClick→signOut()` | |
| Mobile hamburger toggle | ✅ | ✅ `onClick→setMobileOpen(!o)` | Open/close state: `mobileOpen` |
| Mobile menu items (features/how/pricing/faq) | ✅ | ✅ `<a>` + `onClick→setMobileOpen(false)` | |
| Mobile menu: Log in / Get Started (guest) | ✅ | ✅ Link | |
| Mobile menu: Dashboard / Sign out (authed) | ✅ | ✅ Link + `signOut()` | |
| Hero CTA — "Go to Dashboard" (authed) | ✅ | ✅ Link `/dashboard` | |
| Hero CTA — "Start Learning" (guest) | ✅ | ✅ Link `/auth/signup` | |
| Hero CTA — "Log in" ghost (guest) | ✅ | ✅ Link `/auth/login` | |
| Subject card "Start" links | ✅ | ✅ Link `/dashboard` or `/auth/signup` | |
| Pricing card CTAs (free + pro) | ✅ | ✅ Link (same ctaHref logic) | |
| FAQ accordion (5 items) | ✅ | ✅ `onClick→setFaqOpen(i\|null)` — expand/collapse | |
| LanguageToggle (footer) | ✅ | ✅ | |
| Footer anchor links | ✅ | ✅ `<a href="#...">` | |

**Result: FULLY INTACT.** No elements hidden or broken.

---

### `/auth/login`

**Candy change:** Root → `CandyPage legacy`; submit `<button>` → `<CandyButton>`.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← Home" back link | ✅ | ✅ Link `/` | |
| Google OAuth button | ✅ | ✅ `onClick→signIn('google')` | Conditionally rendered: `NEXT_PUBLIC_GOOGLE_ENABLED === 'true'` only |
| Email input | ✅ | ✅ `onChange→setEmail` | |
| Password input | ✅ | ✅ `onChange→setPassword` | Toggles `type='text'/'password'` |
| Show/hide password eye toggle | ✅ | ✅ `onClick→setShowPwd(!showPwd)` | Eye/EyeOff icon |
| "Forgot password?" link | ✅ | ✅ Link `/auth/forgot-password` | |
| "Log In" submit (CandyButton) | ✅ | ✅ `form onSubmit→handleSubmit` | `disabled={loading}` |
| "Sign up" inter-page link | ✅ | ✅ Link `/auth/signup` | |

**Result: FULLY INTACT.**

---

### `/auth/signup`

**Candy change:** Root → `CandyPage legacy`; submit `<button>` → `<CandyButton>`.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← Home" back link | ✅ | ✅ | |
| Google OAuth button | ✅ | ✅ `onClick→signIn('google', {callbackUrl:'/onboarding'})` | Same env-var guard |
| Name / Email / Password inputs | ✅ | ✅ `onChange→setState + clearError` | |
| Show/hide password eye toggle | ✅ | ✅ `onClick→setShowPwd(!showPwd)` | |
| Password strength meter | ⚠ | — | **ABSENT.** reset-password has one; signup does not. Pre-existing gap, not introduced by candy. |
| "Create Account" submit (CandyButton) | ✅ | ✅ `form onSubmit→handleSubmit` | `disabled={loading}` |
| "Log in" inter-page link | ✅ | ✅ Link `/auth/login` | |

**Result: FULLY INTACT.** Password strength meter absence pre-dates the rollout.

---

### `/auth/forgot-password`

**Candy change:** Root → `CandyPage legacy`; submit → `CandyButton`; success Link → candy-styled.

| Element | Present | Wired | Notes |
|---|---|---|---|
| LanguageToggle | ✅ | ✅ | |
| "← Home" + "← Back to login" links | ✅ | ✅ | |
| Email input | ✅ | ✅ `onChange→setEmail, setErrorMsg` | |
| "Send Reset Email" submit (CandyButton) | ✅ | ✅ | `disabled={state==='loading'}` |
| "Back to Login" (success state) | ✅ | ✅ Link `/auth/login` | |
| "Back to Login" (below form) | ✅ | ✅ Link `/auth/login` | |

**Result: FULLY INTACT.**

---

### `/auth/reset-password`

**Candy change:** Root → `CandyPage legacy`; submit → `CandyButton`; success Link → candy-styled.

| Element | Present | Wired | Notes |
|---|---|---|---|
| LanguageToggle | ✅ | ✅ | |
| "← Home" + "← Back to login" links | ✅ | ✅ | |
| New password input | ✅ | ✅ `onChange→setPassword`; `disabled={!token}` | |
| Show/hide password toggle | ✅ | ✅ `onClick→setShowPwd(!showPwd)` | |
| Password strength meter (3-level) | ✅ | ✅ Reactive to `password.length` | weak/medium/strong colors |
| Confirm password input | ✅ | ✅ `onChange→setConfirm`; `disabled={!token}` | |
| "Reset Password" submit (CandyButton) | ✅ | ✅ | `disabled={loading \|\| !token \|\| pw≠confirm \|\| len<8}` |
| "Request new link" below form | ✅ | ✅ Link `/auth/forgot-password` | |
| "Go to Login" (success state) | ✅ | ✅ Link `/auth/login` | |

**Result: FULLY INTACT.**

---

### `/onboarding`

**Candy change:** Root `<div>` → `<CandyPage legacy>`. One line. No JSX touched.

| Element | Present | Wired | Notes |
|---|---|---|---|
| Mode select — School button | ✅ | ✅ `onClick→setMode('school')` | |
| Mode select — General button | ✅ | ✅ `onClick→setMode('general')` | |
| School: board selector buttons | ✅ | ✅ `onClick→setBoardId + setSchoolStep(2)` | |
| School: grade selector buttons | ✅ | ✅ `onClick→handleSchoolFinish(g)`; `disabled={loading}` | |
| School: Back buttons (step 1/2) | ✅ | ✅ `onClick→setMode(null) / setSchoolStep(1)` | |
| General step 1: subject toggle buttons | ✅ | ✅ `onClick→toggleSubject(s.slug)` | |
| General step 1: Back / Next | ✅ | ✅ `disabled={!canProceed1}` | |
| General step 2: skill level buttons | ✅ | ✅ `onClick→setSkillLevel(lvl.key)` | |
| General step 2: Back / Next | ✅ | ✅ `disabled={!canProceed2}` | |
| General step 3: goal textarea | ✅ | ✅ `onChange→setDescription` | |
| General step 3: Back / Next | ✅ | ✅ `disabled={!canProceed3}` | |
| General step 4: voice select buttons | ✅ | ✅ `onClick→setVoiceKey(v.key)` | |
| Voice preview button | ✅ | ✅ `onClick→handleVoicePreview()→speakText(…)` | `e.stopPropagation()` correct |
| Step 4: Back / Finish | ✅ | ✅ `handleFinish()→POST /api/onboarding`; `disabled={loading}` | |
| Progress indicator | ✅ | Static display only | Intentional |

**Result: FULLY INTACT.**

---

### `/dashboard`

**Candy change:** Dashboard v2 was the origin of the candy system. All components were built with it from the start.

| Element | Present | Wired | Notes |
|---|---|---|---|
| ContinueCard | ✅ | ✅ `onClick→router.push(data.href)` | `data.href = /learn?subject=...` |
| Practice mode tiles (Tutor/Quiz/Coach/Flashcards/Leaderboard/Library/Progress) | ✅ | ✅ `onClick→router.push(mode.href)` | All hrefs resolve to live routes |
| SkillPath — current node | ✅ | ✅ `onClick→router.push(currentHref)` | |
| SkillPath — locked nodes | ✅ | `disabled={true}` | Intentional gating |
| SkillPath — done nodes | ✅ | `onClick=undefined` | **Intentional static.** Done nodes are historical waypoints; no re-entry link. Renders as `<button>` but does nothing. |
| DailyQuests "View all" | ✅ | ✅ Link `/progress` | |
| DailyQuests individual rows | ✅ | Static display | **Intentional static** — informational progress bars, no navigation expected |
| LeagueCard rank rows | ✅ | Static display | **Intentional static** — display-only leaderboard snapshot |
| DailyGoalCard ProgressRing/ProgressBar | ✅ | Static display | **Intentional static** |
| TopBar chips (XP, streak, hearts) | ✅ | Static display | **Intentional static** — informational |

**Result: FULLY INTACT.** Static elements are intentional by design.

---

### `/library`

**Candy change:** `CandyPage` root, `Card`, `ProgressBar` primitives; color token swap.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← back" link | ✅ | ✅ Link `/dashboard` | |
| "Continue Learning" per enrolled subject | ✅ | ✅ Link `/learn?subject={slug}` | Shown only when enrolled |
| "Details" link per enrolled subject | ✅ | ✅ Link `/library/{slug}` | Shown only when enrolled |
| "+Add Subject" EnrollButton (unenrolled) | ✅ | ✅ `onClick→POST /api/subjects/enroll→router.refresh()` | `disabled={loading}` |

**Result: FULLY INTACT.**

---

### `/library/[slug]`

**Candy change:** `CandyPage` root, `Card`, `Pill`.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← back" link | ✅ | ✅ Link `/library` | |
| "Go to Library" (not enrolled) | ✅ | ✅ Link `/library` | |
| "Continue Learning" (enrolled) | ✅ | ✅ Link `/learn?subject={slug}` | |
| SubjectModuleTree | ✅ | Static display | **Intentional** — curriculum tree viewer, no interactive nodes |

**Result: FULLY INTACT.**

---

### `/progress`

**Candy change:** `CandyPage` root, `Card`, `ProgressBar`, `Pill`.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← back" link | ✅ | ✅ Link `/dashboard` | |
| "Review Now" (flashcards CTA) | ✅ | ✅ Link `/flashcards` | Shown only when `flashcardsDue > 0` |
| Stat tiles | ✅ | Static display | Intentional |
| XP bar | ✅ | Static display | Intentional |
| Recent session rows | ✅ | Static display | Intentional |

**Result: FULLY INTACT.**

---

### `/leaderboard`

**Candy change:** `CandyPage` root, `Card`; border → `boxShadow`; explicit `cursor:'pointer'` added to tabs.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← back" link | ✅ | ✅ Link `/dashboard` | |
| "This Week" tab button | ✅ | ✅ `onClick→setMode('week')` | `cursor:'pointer'` now explicit |
| "All Time" tab button | ✅ | ✅ `onClick→setMode('alltime')` | |
| Data fetch on tab change | ✅ | ✅ `useEffect([mode])→GET /api/leaderboard?mode=` | |
| Rank rows | ✅ | Static display | Intentional — no click on individual rows |

**Result: FULLY INTACT.** Adding `cursor:'pointer'` is an improvement, not a regression.

---

### `/flashcards`

**Candy change:** `CandyPage` across all 4 render states; `CandyButton` replaces raw `<button>` for all rating controls; `EagleMascot` replaces emoji; `useConfetti()` added on completion.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← Back" link (header) | ✅ | ✅ Link `/dashboard` | |
| "Start Learning" CTA (empty state) | ✅ | ✅ `<a href="/learn">` | |
| "Back home" (empty / all-done) | ✅ | ✅ `<a href="/dashboard">` | |
| Card flip (click card front) | ✅ | ✅ `onClick→setFlipped(true)` | |
| "Show Answer" (CandyButton) | ✅ | ✅ `onClick→setFlipped(true)` | Shown when `!flipped` |
| "Hard" rating (CandyButton) | ✅ | ✅ `onClick→handleRate('hard')` | Shown when `flipped` |
| "Medium" rating (CandyButton) | ✅ | ✅ `onClick→handleRate('medium')` | |
| "Easy" rating (CandyButton) | ✅ | ✅ `onClick→handleRate('easy')` | |
| Confetti on completion | ✅ | ✅ additive (no prior element removed) | |

`handleRate()` → `PATCH /api/flashcards` → advance or set `allDone`. Fully wired.

**Result: FULLY INTACT.**

---

### `/quiz`

**Candy change:** `CandyPage` across all render states; `CandyButton` for answer options, retry, next; `ProgressBar` replaces timer div; `EagleMascot` in empty states; `useConfetti()` on ≥60% score.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "Back" link (all states) | ✅ | ✅ `<a href="/dashboard">` | |
| "Retry" (CandyButton, error + finished) | ✅ | ✅ `onClick→restart()` | |
| Answer option buttons A/B/C/D (CandyButton) | ✅ | ✅ `onClick→handleSelect(idx)` | `disabled={selected !== null}` |
| "Next Question" / "Finish" (CandyButton) | ✅ | ✅ `onClick→nextQuestion()` | Shown only when `selected !== null` |
| Confetti on passing score | ✅ | ✅ additive | |

**Result: FULLY INTACT.**

---

### `/learn`

**Candy change:** Two `className` attributes prepend `${styles.learnCandy}`. No other JSX changed in the ~2200-line file.

| Element | Present | Wired | Notes |
|---|---|---|---|
| Voice type buttons M/F/W | ✅ | ✅ `onClick→handleVoiceChange(k)` | |
| Mobile panel tabs (Lesson/Code/Chat) | ✅ | ✅ `onClick→setActiveTab(tab)` | |
| Panel maximize/restore buttons | ✅ | ✅ `onClick→setMaximizedPanel(…)` | Desktop only (`hidden md:flex`) |
| Message textarea | ✅ | ✅ `onChange→handleTextareaChange`; `onKeyDown→handleKeyDown`; `disabled={isStreaming\|\|!sessionId}` | |
| Send button | ✅ | ✅ `onClick→handleSend`; `disabled` when empty/streaming | |
| Mic button | ✅ | ✅ `onClick→handleMicClick`; `disabled` when streaming/processing | Conditionally shown when `micSupported` |
| "Got it" comprehension button | ✅ | ✅ `onClick→sendMessage(sessionId, 'Got it', true)` | `disabled={isStreaming\|\|!sessionId}` |
| "Not clear" comprehension button | ✅ | ✅ `onClick→sendMessage(sessionId, "I don't understand…", true)` | `disabled={isStreaming\|\|!sessionId}` |
| "Complete Lesson" button | ✅ | ✅ `onClick→handleLessonComplete(…)→POST /api/progress/lesson-complete` | Shown when lesson not yet completed |
| Final Assessment trigger | ✅ | ✅ `onClick→setFinalAssessmentOpen(true)` | Shown when `curriculumProgress.isCompleted` |
| Practice panel toggle | ✅ | ✅ `onClick→setPracticeOpen(!v)` | Shown when `currentLessonData?.topicSlug` |
| Insights panel toggle | ✅ | ✅ `onClick→setInsightsOpen(!v)` | Shown when `currentLessonData?.topicSlug` |
| Monaco editor | ✅ | ✅ `onChange`/`onKeyDown` via Monaco API | |
| "Run code" button | ✅ | ✅ `onClick→handleRunCode()` | |

**Result: FULLY INTACT.** The CSS module change touched zero logic.

---

### `/coach`

**Candy change:** Full candy conversion. `CandyPage` root, `Card`, `CandyButton` for send, chat bubble color tokens.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← back" link | ✅ | ✅ `<a href="/dashboard">` | |
| Message input | ✅ | ✅ `onChange→setInput`; `onKeyDown→Enter→send()` | |
| Send button (CandyButton) | ✅ | ✅ `onClick→send()`; `disabled={loading\|\|!input.trim()}` | `opacity:0.5` when disabled AND `disabled` prop set — both correct |
| Opening flow | ✅ | ✅ `useEffect([])→pre-populates messages with assistant greeting` | Text-only Q&A flow, no separate buttons |

**Result: FULLY INTACT.** The full rewrite preserved all functionality; no prior buttons were lost.

---

### `/settings`

**Candy change:** Root `<div>` → `<CandyPage legacy>`. One line. No JSX touched.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← back" link | ✅ | ✅ Link `/dashboard` | |
| LanguageToggle (nav) | ✅ | ✅ | |
| Name input | ✅ | ✅ `onChange→setProfileName` | |
| Avatar name input | ✅ | ✅ `onChange` bound | |
| Voice type buttons (3×) | ✅ | ✅ `onClick→setProfileVoice(v.key)` | |
| Level description textarea | ✅ | ✅ `onChange→setProfileLevel` | |
| "Save Profile" button | ✅ | ✅ `onClick→handleProfileSave()`; `disabled={saving}` | |
| School board buttons | ✅ | ✅ `onClick→setSchoolBoard(b.id)` | Shown when `SCHOOL_STUDENT` |
| School grade buttons | ✅ | ✅ `onClick→setSchoolGrade(g)` | |
| "Save school info" button | ✅ | ✅ `disabled={saving\|\|!schoolBoard\|\|schoolGrade===null}` | |
| TTS voice type buttons (3×) | ✅ | ✅ `onClick→setVoiceId(v.key)` | |
| Voice speed buttons (6×) | ✅ | ✅ `onClick→setVoiceSpeed(s)` | |
| Teaching language buttons (3×) | ✅ | ✅ `onClick→handleLangClick(l.key)` (persists immediately) | |
| Country/region buttons | ✅ | ✅ `onClick→setCountry(opt.key)` | |
| Master "Save" button | ✅ | ✅ `onClick→handleSave()`; `disabled={saveState==='saving'}` | |
| "Delete account" toggle | ✅ | ✅ `onClick→setDeleteStep('confirm')` | |
| "DELETE" confirmation input | ✅ | ✅ `onChange→setDeleteInput`; `disabled={deleting}` | |
| Cancel delete button | ✅ | ✅ `onClick→setDeleteStep('hidden')`; `disabled={deleting}` | |
| Confirm delete button | ✅ | ✅ `onClick→handleDeleteAccount()`; `disabled={!deleteReady\|\|deleting}` | |

**Result: FULLY INTACT.** All 19 interactive elements present and wired.

---

### `/certificates`

**Candy change:** `CandyPage` root; `Card` wraps cert rows; Link CTAs restyled.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← back" link | ✅ | ✅ Link `/dashboard` | |
| "Browse Roadmaps" CTA (empty state) | ✅ | ✅ Link `/library` | |
| Certificate row links | ✅ | ✅ Link `/certificates/{code}` per cert | Whole Card is the Link target |

**Result: FULLY INTACT.**

---

### `/certificates/[code]`

**Candy change:** Root → `CandyPage`. `CertificateView` passed through unchanged.

| Element | Present | Wired | Notes |
|---|---|---|---|
| CertificateView | ✅ | Static display | No buttons or links by design |

**Result: FULLY INTACT.**

---

### `/school/[subject]`

**Candy change:** Root → `<CandyPage legacy>`. One line.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← Home" link | ✅ | ✅ Link `/dashboard` | |
| Continue learning / priority CTA | ✅ | ✅ Link → `continueHref` (dynamic) | |
| MarkChapterCompleteButton | ✅ | ✅ external component, untouched | |
| Study plan step links | ✅ | ✅ Link → `step.href` per item | |
| "All chapters (N)" link | ✅ | ✅ Link `/school/[subject]/chapters` | |
| "🎓 Take Mock Test" link | ✅ | ✅ Link `/school/[subject]/mock` | |
| NavigatorActionCard | ✅ | ✅ Links to `navigatorHref` | Conditional |
| Learning Roadmap list | ✅ | Static display | **Intentional static** |
| Previous/Next chapter cards | ✅ | Static display | **Intentional by design** — comment in code: "quiet secondary cards" |
| Recent activity list | ✅ | Static display | **Intentional static** |

**Result: FULLY INTACT.**

---

### `/school/[subject]/chapters`

**Candy change:** Root → `<CandyPage legacy>`. One line.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← {subject}" back link | ✅ | ✅ Link `/school/[subject]` | |
| Current chapter row | ✅ | ✅ Link `/school/[subject]/chapter/[id]` | Only current chapter is linkable |
| Completed / upcoming chapter rows | ✅ | Static display | **Intentional by design** — comment line 14: "current chapter is the only tappable CTA" |

**Result: FULLY INTACT.**

---

### `/school/[subject]/chapter/[chapterId]`

**Candy change:** Root → `<CandyPage legacy>`. One line.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "← {subject}" back link | ✅ | ✅ Link `/school/[subject]` | |
| "Continue learning" CTA | ✅ | ✅ Link `/learn?subject=...&chapter=...` | |
| "Practice" link | ✅ | ✅ Link → `practiceHref` | |
| "Take/Retake Assessment" link | ✅ | ✅ Link → `assessmentHref` | |
| RevisionNotesButton | ✅ | ✅ external component, untouched | |
| Ask-chips (4: Explain / Examples / Summarize / Help) | ✅ | ✅ Link `/learn?subject=...&chapter=...&ask=[key]` | |
| "Go to next chapter" | ✅ | ✅ Link `/school/[subject]/chapter/[nextChapter.id]` | Conditional: assessment passed + next chapter exists |
| NavigatorActionCard | ✅ | ✅ Links to navigator href | Conditional |
| Stat cards, understanding bar, insight cards | ✅ | Static display | **Intentional static** |

**Result: FULLY INTACT.**

---

### `/school/[subject]/chapter/[chapterId]/practice` + `/assessment` + `/mock`

**Candy change:** `<CandyPage legacy>` wrapper added at page level; quiz components `PracticeQuiz`, `AssessmentQuiz`, `MockTestQuiz` passed through **completely unchanged**.

All interactivity lives in the quiz components:

| Component | Elements | Status |
|---|---|---|
| **PracticeQuiz** | Pre-start: Start Practice button | ✅ `onClick→setStarted(true)` |
| | Quiz: MCQ/T-F/short-answer inputs | ✅ all wired |
| | Quiz: Next/Submit | ✅ `disabled={!answered}` (UX guard) |
| | Results: Review toggle, Practice Again, Back | ✅ all wired |
| | Error: Try again | ✅ `onClick→reset+reload` |
| **AssessmentQuiz** | Same patterns as PracticeQuiz | ✅ all wired |
| | Results: NavigatorActionCard or "Start Next Chapter" fallback | ✅ |
| **MockTestQuiz** | Select: test type buttons, Start | ✅ `onClick→startMock()` |
| | Quiz: live timer (setInterval), MCQ/T-F/short-answer | ✅ |
| | Quiz: Exit link → `backHref` | ✅ |
| | Results: Review toggle, Retake, Back | ✅ all wired |

**Result: FULLY INTACT.** The `disabled={!answered}` guard on Next/Submit is intentional UX — user must answer before advancing.

---

### `/school/focus`

**Candy change:** Root → `<CandyPage legacy>` on BOTH render branches (empty + active). Two lines.

| Element | Present | Wired | Notes |
|---|---|---|---|
| "Back" / "Back to Dashboard" links (both states) | ✅ | ✅ Link `/dashboard` | |
| Task CTA | ✅ | ✅ Link → `task.href` (from `getDailyStudyPlan`) | |
| "← Previous" | ✅ | ✅ Link `/school/focus?task=[taskIndex-1]` | Shown when `taskIndex > 0` |
| "Skip →" | ✅ | ✅ Link `/school/focus?task=[taskIndex+1]` | Shown when not last task |
| "🔥 N-day streak · Done ✓" | ✅ | ✅ Link `/dashboard` | Shown on last task |
| Step indicator dots | ✅ | Static display | **Intentional static** |
| "Up next" rows | ✅ | Static display | **Intentional static** — preview only |

**Result: FULLY INTACT.**

---

### `/admin/**`

**Candy change:** `admin/layout.tsx` root `<div>` → `<CandyPage legacy className="flex">`. Two lines. Zero per-page edits to any of the 9 admin pages.

#### Admin Sidebar Navigation

All 9 NAV entries vs. page.tsx files on disk:

| Sidebar item | Route | `page.tsx` exists |
|---|---|---|
| Overview | `/admin` | ✅ |
| Users | `/admin/users` | ✅ |
| Subjects | `/admin/subjects` | ✅ |
| Curriculum | `/admin/curriculum` | ✅ |
| Knowledge Graphs | `/admin/knowledge-graphs` | ✅ |
| Analytics | `/admin/analytics` | ✅ |
| AI Operations | `/admin/ai-ops` | ✅ |
| Ops Center | `/admin/ops` | ✅ |
| System Settings | `/admin/settings` | ✅ |
| "← Back to app" | `/dashboard` | ✅ |

**All 10 sidebar links resolve to existing pages. Zero dead routes.**

#### Admin Overview `/admin`

| Element | Present | Wired |
|---|---|---|
| 7 nav grid cards | ✅ | ✅ Full Link to each section |
| Stats (Total Students, Admins) | ✅ | ✅ Live Prisma counts |

#### Admin Users `/admin/users`

| Element | Present | Wired | Notes |
|---|---|---|---|
| Search input (q) | ✅ | ✅ GET form field | |
| Role filter select | ✅ | ✅ GET form field | |
| Status filter select | ✅ | ✅ GET form field | |
| Filter button (submit) | ✅ | ✅ `type="submit"` on GET form | |
| User name → `/admin/users/[id]` | ✅ | ✅ Link | |
| Promote button | ✅ | ✅ Server action `promoteUser(userId)` | Shown only when `role=STUDENT` |
| Demote button | ✅ | ✅ Server action `demoteUser(userId)` | Shown only when `role=ADMIN` |
| Disable button | ✅ | ✅ Server action `disableUser(userId)` | Shown only when `!isDeleted` |
| Enable button | ✅ | ✅ Server action `enableUser(userId)` | Shown only when `isDeleted` |

All server actions call `requireAdmin()` first. `disabled={pending}` during transition (intentional).

#### Admin User Detail `/admin/users/[id]`

| Element | Present | Wired |
|---|---|---|
| "← Users" link | ✅ | ✅ Link `/admin/users` |
| UserActions (same 4 buttons) | ✅ | ✅ |
| Subject progress bars | ✅ | Static display |

#### Admin Subjects, Analytics, AI-Ops, Ops, Settings

All intentionally display-only pages with no interactive elements beyond what's in the shared layout. Live Prisma data where shown. Expected behaviour for admin info panels.

| Page | Nature | Interactive elements |
|---|---|---|
| `/admin/subjects` | Catalog viewer | None (intentional) |
| `/admin/analytics` | Stats + XP distribution | None (intentional) |
| `/admin/ai-ops` | Request counters, provider stats | None (intentional) |
| `/admin/ops` | DB/Redis health, env status | None (intentional) |
| `/admin/settings` | Env key display (read-only subtitle) | None (intentional) |

#### Admin Curriculum + Knowledge Graphs

| Page | Status |
|---|---|
| `/admin/curriculum` | **Pre-existing stub.** Comment in page: "Interactive curriculum editor planned for a future sprint." No buttons or dead handlers — explicitly scoped as future work. |
| `/admin/knowledge-graphs` | **Pre-existing stub.** Same annotation. |

**Result: ALL ADMIN PAGES FULLY INTACT.** The single-file layout change cascaded the design system with no logic impact.

---

## Consolidated Findings

### BROKEN / HIDDEN / DISABLED by the restyle

**None.** Zero elements were broken, hidden, removed, or disabled as a result of any candy conversion commit.

### Placeholder Inventory

#### Intentional / Static-by-Design (not bugs)

| Element | Screen | Notes |
|---|---|---|
| SkillPath "done" nodes (renders as `<button>`, no handler) | `/dashboard` | Historical waypoints — no re-entry link expected |
| SkillPath "locked" nodes (`disabled={true}`) | `/dashboard` | Intentional gating |
| DailyQuests individual rows (no click) | `/dashboard` | Informational only; "View all" → /progress is the CTA |
| DailyGoalCard ProgressRing/ProgressBar | `/dashboard` | Display-only goal tracker |
| LeagueCard rank rows (no click) | `/dashboard` | Display-only leaderboard snapshot |
| TopBar chips (XP, streak, hearts) | `/dashboard` | Informational chips |
| Upcoming task rows in Focus mode | `/school/focus` | Preview-only; only the current task has a CTA |
| Step indicator dots in Focus mode | `/school/focus` | Visual progress only |
| Previous/Next chapter cards on subject page | `/school/[subject]` | "Quiet secondary cards" by design comment |
| Learning Roadmap list items | `/school/[subject]` | Display-only curriculum map |
| Recent activity list | `/school/[subject]` | Display-only |
| Non-current chapter rows in chapters list | `/school/[subject]/chapters` | By design: comment states only current chapter is tappable |
| Stat cards, understanding bar, insight cards | `/school/chapter/[id]` | Analytics display |
| SubjectModuleTree nodes | `/library/[slug]` | Curriculum tree viewer |
| CertificateView | `/certificates/[code]` | Pure display |
| Admin subjects catalog | `/admin/subjects` | Viewer-only page |
| Admin analytics, ai-ops, ops, settings panels | `/admin/*` | Info/health panels, no write operations needed |

#### Unfinished Stubs (pre-existing, not introduced by candy)

| Element | Screen | Notes |
|---|---|---|
| Curriculum editor | `/admin/curriculum` | Explicit comment: "planned for a future sprint." No dead buttons — the page displays intent, not broken interactivity. |
| Knowledge Graph editor | `/admin/knowledge-graphs` | Same. |
| Password strength meter on signup | `/auth/signup` | `reset-password` has a 3-level strength meter; signup does not. Pre-dates the rollout. Not a functional regression — no UI element was removed; it simply was never added to signup. |
| Landing country selector on mobile | `/` | Country pills are `hidden md:flex` and not in the mobile hamburger. Pre-dates the rollout. Mobile users cannot change country from the landing page. |

---

## Observations (Not Breakage)

1. **Leaderboard tab buttons:** The candy conversion added explicit `cursor:'pointer'` and `border:'none'` inline styles to the Week/All Time tab `<button>` elements. Previously inherited via Tailwind/browser defaults. This is a minor improvement (more explicit, cross-browser consistent). No action required.

2. **CoachChat send + auth submits — opacity-as-visual-feedback:** Disabled states use `opacity:0.5` as a visual cue. The `disabled` prop is also set (via `{...rest}` spread on CandyButton). Both mechanisms are present — this is correct and complete.

3. **Google OAuth button hidden when `NEXT_PUBLIC_GOOGLE_ENABLED` is unset:** This is not a UI bug — the button is intentionally conditional. It is not disabled; it simply does not render. Documented in audit finding F-2 of the system audit.

---

## Route Integrity

All hrefs in navigation components resolve to `page.tsx` files on disk:

| Area | Dead routes found |
|---|---|
| Admin sidebar (10 items) | **0** |
| School nav links | **0** |
| Dashboard practice modes | **0** |
| Auth inter-page links | **0** |
| Landing nav + footer | **0 dead routes** (anchor `#`-links are intentional same-page scrolls) |

---

## Running Instructions

```bash
cp .env.example .env
# Set: DATABASE_URL, DIRECT_URL, AUTH_SECRET, GROQ_API_KEY
# Optional: ADMIN_EMAILS, SMTP_*, REDIS_URL

npm install
npx prisma generate        # required before tsc --noEmit
npx prisma db push         # sync schema to DB
npm run dev                # http://localhost:3000

npm run build              # prisma generate + next build (exit 0)
npx tsc --noEmit           # 0 errors (after prisma generate)
```
