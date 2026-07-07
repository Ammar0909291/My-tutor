# Lesson Experience Forensic Audit

**Scope:** `src/components/learn/LessonScreen.tsx` (2250 lines) and its direct dependency tree (`LearnerPositionPanel.tsx`, `PracticePanel.tsx`, `InsightsPanel.tsx`, `FinalAssessmentModal.tsx`, `LessonScreen.module.css`, the `/learn` route). This is Phase 1 forensic analysis only — **no code was modified.**

**Methodology:** Direct source-code inspection — full read of the file header/state/handlers (lines 1–950), structural grep of every `useEffect`/`useCallback`/handler boundary, full read of the JSX panel layout (curriculum/code/chat three-column structure), and import/token audit of all four sibling components. No screenshots (no live DB in this environment, consistent with the prior two audits); this is a code-structure audit, as the sprint requests ("structure, complexity, dependencies, workflows, risks").

---

## 1. Component inventory (Phase 1)

`LessonScreen.tsx` is a single 2250-line client component (`'use client'`) — not a tree of smaller components. The "component inventory" below is therefore a breakdown of **logical sections within one file**, plus its four genuine external dependencies.

| Section | Purpose | Approx. lines | Key dependencies |
|---|---|---|---|
| Config constants | Voice labels, language flags, language→Monaco-mode map, filename map, initial code stubs, language badge colors (hardcoded hex per subject) | 22–79 (~58) | none |
| Helpers | Timer formatting, code-block extraction/stripping from AI text, message-text truncation | 81–104 (~24) | none |
| `MessageContent` / `renderInline` / `TypingDots` | Hand-rolled markdown-lite renderer for chat messages (bold/italic/code/bullets/numbered lists), typing-indicator dots | 106–159 (~54) | none — bespoke, not a shared markdown lib |
| `Panel` / `PanelHeader` | Local wrapper components for the three-column layout — hover-state border glow, dark panel chrome | 198–237 (~40) | none — local, not reused elsewhere |
| State block | ~45 `useState` hooks across: core chat/session, voice, file/image attachment, curriculum/progress, assessment/promotion, practice/adaptive difficulty, revision/skip, terminal/code-run | 246–331 (~85) | — |
| Derived values | Language/badge/filename/terminal-command resolution from `subjectSlug`, student avatar URL (external `ui-avatars.com` API) | 333–344 | external image service |
| Timer / scroll / mic-support effects | Session elapsed-time ticker, auto-scroll-to-bottom tracking, mic capability detection | 347–402 | browser `MediaDevices` API |
| `handleLessonComplete` | Marks a curriculum lesson complete, triggers XP celebration toast | 403–422 | `/api/curriculum/progress` (inferred) |
| Voice handlers | `handleSpeak`/`handleStopSpeech`/`handleVoiceChange`/`handleCopy` | 423–448 | `src/lib/tts.ts` (`speakText`/`stopSpeaking`) |
| Monaco/code-run handlers | Editor mount config, `handleRunCode` | 449–526 | `@monaco-editor/react` (dynamically imported, `ssr:false`), code-execution API |
| `sendMessage` (the core AI loop) | Posts to `/api/learn/chat`, streams/sets assistant message, detects `[LESSON_COMPLETE]` keyword across 3 languages, on completion fires `handleLessonComplete` **and** a separate `PATCH /api/topic-progress` to update Knowledge-Graph mastery + unlock new nodes | 527–657 (~130) | `/api/learn/chat`, `/api/topic-progress` |
| `navigateToLesson` / `startRevision` / `initiateSkip` / `confirmSkip` / `resumeTopic` | Curriculum navigation, revision-mode re-entry (sends a synthetic prompt to the AI), skip-with-risk-check workflow (calls `/api/topic-progress/skip-risk`, may show a warning modal before allowing skip) | 657–759 (~100) | `/api/topic-progress`, `/api/topic-progress/skip-risk` |
| Session init / lifecycle effects | Session creation, curriculum/progress fetch on mount, cleanup | 760–1018 (~258) | several `/api/...` endpoints, `recordLastLesson` hook |
| Image-message send / send/key handlers | `sendImageMessage`, `handleSend`, `handleKeyDown`, `handleTextareaChange` | 809–871 | image upload, draft-message hook |
| Voice recording | `startRecording`/`stopRecording`/`handleMicClick` via `MediaRecorder` | 872–953 | browser `MediaRecorder` API |
| File attach | `handleFileSelect` | 956–987 | local file reading |
| Render: error/loading states | Early-return screens before the main 3-panel UI mounts | 1063–1081 | — |
| Render: top bar | Subject switcher menu, theme toggle, language toggle, elapsed timer, XP toast | ~1082–1220 | `ThemeToggle`, `LanguageToggle`, `useCountry`/`useTheme` (Providers) |
| Render: mobile tab bar | `curriculum`/`code`/`chat` tab switcher (mobile only — desktop shows all 3 columns) | 1221–1247 | — |
| Render: Curriculum panel (25% width) | Wraps `<LearnerPositionPanel>` — unit/lesson list, locked-topic detail, revision/skip actions | 1247–1662 | `LearnerPositionPanel.tsx` (16-line thin wrapper — bulk of curriculum UI is actually inlined here in LessonScreen, not in that file) |
| Render: Code panel (45% width) | Monaco editor + collapsible terminal output panel, run button, stdin input | 1662–1804 | `MonacoEditor` (dynamic import) |
| Render: Chat panel (30% width) | Insights/Practice panel toggles, message list (`MessageContent`), input box with mic/file/image attach, `<FinalAssessmentModal>` | 1804–2249 | `InsightsPanel.tsx`, `PracticePanel.tsx`, `FinalAssessmentModal.tsx`, `VisualCard.tsx` |

**Sibling files (imported, not inlined):**

| File | Lines | Role |
|---|---|---|
| `LearnerPositionPanel.tsx` | 16 | Thin re-export/wrapper — misleadingly small; the actual curriculum-panel JSX (unit list, lesson cards, lock states) lives inline inside `LessonScreen.tsx` itself (~lines 1272–1660), not in this file |
| `PracticePanel.tsx` | 372 | Modal: in-lesson practice question flow, difficulty/focus-category selection |
| `InsightsPanel.tsx` | 413 | Slide-in panel: mastery score, trend, confidence/momentum data for the current topic |
| `FinalAssessmentModal.tsx` | 225 | Modal: end-of-unit/chapter promotion assessment, shows `PromotionResult` (STAY/REVIEW_REQUIRED/PROMOTED) |
| `LessonScreen.module.css` | 56 | Scoped styles, including the misleadingly-named `.learnCandy` class (re-skins legacy tokens via cascade — does not use candy tokens, see prior audit) |
| `VisualCard.tsx` (`src/components/school/visuals/`) | — | Renders inline educational diagrams (number lines, coordinate planes, etc.) when the AI response includes a `visual` field |

**Total surface area: ~3,332 lines across 6 files** (LessonScreen.tsx + 4 panel/modal components + CSS module) plus the Monaco editor dependency and ~8 distinct API endpoints.

**Estimated component count:** 1 monolithic screen component + ~8 inline sub-renders (top bar, tab bar, 3 panels, message renderer, typing indicator, panel chrome) that are not separated into their own files + 4 real external components + 1 third-party editor = **effectively 14 logical UI units, physically distributed across 6 files, with LessonScreen.tsx itself accounting for ~67% of total line count.**

**Estimated complexity:** **Very high.** ~45 `useState` hooks, 9+ `useCallback`-wrapped async handlers, 8+ distinct backend API integrations, 3 languages of hardcoded copy for in-band AI protocol strings (`[LESSON_COMPLETE]` detection), browser-API integrations (MediaRecorder, MediaDevices, FileReader), and a third-party code editor — all inside one component with no internal state management library (plain `useState`/`useCallback`, no reducer/context split).

---

## 2. Workflow mapping (Phase 2)

1. **Lesson session start:** Student opens `/learn` (or arrives via `/school/[subject]/chapter/[chapterId]`) → server component resolves subject/profile/school-chapter context → `LessonScreen` mounts → session-init effect creates/resumes a session, fetches curriculum + topic-progress + lock-reasons → renders 3-panel layout (curriculum 25% / code 45% / chat 30%, collapsing to tabs on mobile).
2. **Student reads lesson content / asks AI a question:** types in chat input (or uses mic → `MediaRecorder` → speech-to-text, or attaches a file/image) → `handleSend` → `sendMessage(sessionId, text)` → POST `/api/learn/chat` → streaming-style assistant message appended → response may include a `visual` field rendered via `<VisualCard>`, and/or a code block extracted and pushed into the Monaco editor.
3. **AI signals lesson completion:** `sendMessage` scans the AI's response text for completion keywords in 3 languages (`[LESSON_COMPLETE]`, "следующий урок", "next lesson", "अगला पाठ", etc.) → strips the marker → calls `handleLessonComplete` (fires XP-toast, marks curriculum lesson complete) **and independently** PATCHes `/api/topic-progress` with `action: 'complete'` to update Knowledge-Graph mastery and recompute newly-unlocked topics. **This is a fragile, string-matching-based completion signal** — see Risk section.
4. **Student runs code:** `handleRunCode` → sends current Monaco editor content to a code-execution endpoint → terminal panel opens, shows stdout/stderr, supports stdin.
5. **Student requests revision:** clicks "revise" on a past lesson in the curriculum panel → `startRevision` → PATCH `/api/topic-progress` (`action: 'start_revision'`) → synthetically injects a "let's review X" prompt into the chat → switches to chat tab → AI responds as if asked by the student.
6. **Student attempts to skip a topic:** `initiateSkip` → GET `/api/topic-progress/skip-risk` → if skipping would orphan dependent topics, shows a `SkipWarning` modal listing what unlocks; student confirms (`confirmSkip`) or cancels → either way a PATCH to `/api/topic-progress` records the decision.
7. **Student opens Practice:** `<PracticePanel>` modal opens (manually or `autoOpenPractice` prop) → in-lesson practice questions at `practiceDifficulty`, optionally focused on weak `practiceFocusCategories` → score recorded to `practiceScore`.
8. **Student opens Insights:** `<InsightsPanel>` slide-in shows current topic's mastery score, trend (`var(--green)/--yellow/--red` thresholds at 80/60), confidence/momentum — read-only, no separate workflow branch.
9. **End-of-unit assessment:** `<FinalAssessmentModal>` triggers a generated assessment, computes a `PromotionResult` (`STAY` / `REVIEW_REQUIRED` / `PROMOTED`) with localized explanation (ru/en/hi) and an evidence breakdown — this is the highest-stakes workflow in the file, gating curriculum advancement.
10. **Subject switch:** top-bar subject menu lets the student jump to a different enrolled subject mid-session (`subjectMenuOpen` state) — re-derives `language`/`badge`/`filename`/`terminalCmd` from the new `subjectSlug`.
11. **Voice playback:** student taps speaker icon on any AI message → `handleSpeak` → `speakText()` (TTS) with selected `voiceType`/`teachingLanguage`/`voiceSpeed`; `handleStopSpeech` interrupts.
12. **Panel maximize/restore + mobile tab switching:** `maximizedPanel` state lets any of the 3 panels go full-width; on mobile, `activeTab` switches which single panel is visible — these are pure UI-state workflows with no backend calls, but interact with every other workflow's visibility.

**Workflow count: 12 distinct user-initiated or AI-triggered workflows**, several of which (lesson completion, skip, revision) cross multiple backend systems (chat AI, curriculum, Knowledge-Graph topic-progress) in a single user action.

---

## 3. UI generation audit (Phase 3)

| Component / section | UI generation | Replace? | Reuse? | Preserve? |
|---|---|---|---|---|
| Top bar (subject menu, theme/lang toggles, timer) | IDE-style / legacy coral tokens | Replace visual chrome | Reuse `ThemeToggle`/`LanguageToggle` logic (just re-skin) | Preserve subject-switch and timer logic as-is |
| `Panel`/`PanelHeader` wrappers | IDE-style (dark glow-border panels) | Replace entirely with candy `<Card>` | — | Preserve the 3-region layout *concept* (curriculum / workspace / chat), not the chrome |
| Curriculum panel (`LearnerPositionPanel` + inline JSX) | IDE-style / legacy | Replace visuals | Could adopt Dashboard's `SkillPath`/journey-map visual pattern | Preserve lock-reason logic, revision/skip actions, unit/lesson data model |
| Code panel (Monaco + terminal) | Genuinely IDE-style by necessity (it's a code editor) | **Do not force into candy** — a code editor inherently needs a developer-tool register | Could re-skin terminal chrome/run-button to feel more "game console" than "bash shell" | Preserve Monaco integration, run/terminal logic entirely — high technical risk to touch |
| Chat panel / message list / `MessageContent` | IDE-style dark chat (terminal-adjacent) | Replace bubble/typography treatment | Reuse Learning Coach's candy message-bubble pattern (`boxShadow: 0 3px 0 var(--candy-shadow)`, `Baloo 2` font) almost directly — Coach already solved "AI chat in candy style" | Preserve markdown-lite rendering logic, streaming state machine |
| `TypingDots` | Legacy (`.typing-dot` global CSS class) | Replace with candy-equivalent (or reuse Coach's typing indicator if it has one) | — | — |
| `InsightsPanel` | Legacy (`--bg-void`, `--bg-base`, score-color thresholds on `--green/--yellow/--red`) | Replace chrome | Candy `<ProgressRing>`/`<Pill>` map well onto "mastery score" and "trend" displays already used elsewhere | Preserve score/trend computation logic |
| `PracticePanel` | Legacy (`--bg-base`, `var(--r-xl)`, `var(--shadow-xl)`) | Replace chrome | **Direct reuse candidate:** `/quiz`'s `QuizClient.tsx` already implements a fully candy-native question→answer→result flow — extract/adapt rather than rebuild | Preserve difficulty/focus-category selection logic |
| `FinalAssessmentModal` | Legacy (`--bg-base`, `--coral`, generic spinner) | Replace chrome | Candy `<Card>`/`<CandyButton>`/celebratory confetti (`useConfetti`) fit the "you've been promoted" moment well | Preserve `PromotionResult`/evidence-breakdown logic exactly — this is graded, mastery-gating output and must not change semantics |
| XP-celebration toast | Bespoke, partially candy-adjacent (emoji + "+10 XP") | Could upgrade to `useConfetti()` + candy toast styling | — | Preserve trigger conditions |
| `VisualCard` (diagrams) | Separate system (`src/components/school/visuals/`), not audited here | Out of scope | Out of scope | Preserve as-is — diagram rendering is unrelated to chrome/token migration |

**Summary:** Nothing in this file or its direct panel dependencies uses the candy system. The code-editor/terminal region is the one area that should **not** be force-migrated to candy — a Monaco-based IDE pane has a legitimate reason to look different from a gamified dashboard. Everything else (top bar, curriculum panel, chat panel, all 3 modals/panels) has no such justification and is a pure migration target.

---

## 4. Component reuse audit (Phase 4)

Reusable candy primitives already proven in production (from the prior Learning Experience UI Audit) and how they map onto LessonScreen's needs:

| Candy primitive | Proven in | Reuse target in Lesson Experience |
|---|---|---|
| `<Card>` | Dashboard, Flashcards, Progress, Coach, `/quiz` | Replace `Panel` wrapper; wrap curriculum lesson rows, insights stat blocks, message bubbles |
| `<CandyButton>` (3D-press) | Dashboard, Coach, `/quiz`, Flashcards | Replace top-bar icon buttons, send button, run-code button, modal CTAs |
| `<ProgressBar>` | Dashboard, Flashcards, Progress, `/quiz` | Replace curriculum-completion bar, practice-score bar |
| `<ProgressRing>` | Dashboard | Strong fit for `InsightsPanel`'s mastery-score display (currently a plain colored number) |
| `<EagleMascot>` | Dashboard, Flashcards, `/quiz`, Certificates | **Completely absent from the entire lesson/tutor experience** — highest-leverage single addition for "does this feel like the same world" (Phase 6 finding below). Natural placements: empty/loading states, lesson-complete celebration, final-assessment promotion result |
| `<Pill>` | Dashboard, Progress | Replace language badge, subject tag, provider tag (`YANDEX`/`GROQ`/`FALLBACK` — currently invisible to the student, but if surfaced, a `Pill` fits) |
| `useConfetti()` | Flashcards, `/quiz` | Replace/upgrade the existing ad-hoc XP-celebration toast; strong fit for `FinalAssessmentModal`'s `PROMOTED` outcome |
| Learning Coach's message-bubble pattern | `CoachChat.tsx` | Most direct precedent for the chat panel — same "talk to AI" problem already solved in candy |
| `QuizClient.tsx`'s question-flow pattern | `/quiz` | Most direct precedent for `PracticePanel`'s question/answer/result UX |
| Empty-state pattern (mascot + message) | Flashcards (zero-cards state) | Apply to: curriculum panel when no lessons loaded yet, chat panel before first AI message |

**Explicit instruction honored:** no new/fourth design system is proposed anywhere in this audit. Every recommendation above maps onto an already-shipped candy primitive or an already-shipped sibling screen's pattern (Coach for chat, Quiz for practice, Dashboard for progress/mascot).

---

## 5. AI Tutor experience audit (Phase 5)

Direct comparison against Learning Coach (`CoachChat.tsx`, candy-native) and Dashboard's intelligence sections:

- **Does AI Tutor feel like part of the same world?** No. Coach renders message bubbles with `boxShadow: '0 3px 0 var(--candy-shadow)'` and `fontFamily: 'var(--font-baloo2)'`; the Lesson chat renders messages via the bespoke `MessageContent` function using `var(--text-primary)`/`var(--coral)` legacy tokens inside a dark `Panel` with a blurred `0 4px 24px rgba(0,0,0,0.4)` shadow. Visually unrelated.
- **Does the eagle exist?** No — confirmed via the prior audit's grep and re-confirmed here: zero references to `EagleMascot`/`Mascot` anywhere in `LessonScreen.tsx` or its 4 sibling files.
- **Does progression exist?** Yes, extensively — arguably more sophisticated progression logic than anywhere else in the app (curriculum lesson tracking, topic-progress mastery percentages, lock/unlock graph, skip-risk analysis, promotion decisions with evidence breakdowns). The problem is entirely visual: this rich progression data is rendered in plain text/color-coded numbers, not through `<ProgressRing>`/`<ProgressBar>`/celebratory moments.
- **Does coaching exist?** Partially. The AI does teach (that's the core feature), and revision/skip logic is coaching-adjacent, but there is no "coach personality" layer comparable to `CoachChat.tsx` — no distinct tone, avatar, or framing separating "the AI is teaching you the syllabus" from "the AI is chatting with you about your progress" (Coach's actual job).
- **Does the AI experience feel educational or technical?** **Technical.** The chat lives inside a 3-panel IDE layout with a Monaco code editor and a terminal occupying 45% of the screen at all times, even for non-code subjects where the terminal is hidden but the dark IDE chrome remains (`NON_CODE_SUBJECTS` maps to markdown mode, not a different layout). The visual register is "developer tool," not "tutor."

---

## 6. Educational storytelling audit (Phase 6)

**If a student spends 2 hours here, does it feel like a learning adventure, guided coaching, or a progression journey — or a documentation viewer, chat window, educational IDE?**

**Evidence-based verdict: educational IDE / chat window**, not a learning adventure, for these concrete reasons:

1. **No mascot presence in 2+ hours of continuous use.** The Eagle exists nowhere in the file. A student moves from a mascot-rich Dashboard into a mascot-free Lesson screen the moment they start actually learning — the exact moment the "learning world" framing should be reinforced most.
2. **Dark, void-black IDE chrome (`--bg-void`) is the dominant visual register**, not the light, energetic candy palette used everywhere else a student spends time (Dashboard, Flashcards, Quiz, Coach, Progress).
3. **Celebration is minimal and inconsistent with the rest of the app**: a single "+10 XP" toast on lesson completion, no confetti, no mascot reaction — compare to Flashcards/`/quiz`, which fire `useConfetti()` on success.
4. **The layout itself is the strongest piece of evidence**: a permanent 3-pane curriculum/code/chat split with a Monaco editor is structurally identical to a code-school IDE product (e.g. a coding bootcamp's exercise environment), not a guided-tutor or story-driven learning surface.
5. **Counter-evidence (the one strength):** the underlying progression *logic* — mastery tracking, skip-risk warnings, promotion decisions with localized explanations — is genuinely sophisticated and could support a strong "journey" narrative once it has visual treatment to match. The substance for a learning-adventure framing already exists in the data layer; only the presentation layer is missing it.

---

## 7. Migration risk assessment (Phase 7)

| Section | Risk | Why |
|---|---|---|
| Top bar (theme/lang toggle, subject menu, timer display) | **Low** | Pure presentational chrome; logic (`useTheme`/`useCountry`/`useLanguage`) is external and untouched by a re-skin |
| `Panel`/`PanelHeader` wrapper components | **Low** | Purely visual; swapping for `<Card>` changes none of the data flow |
| `MessageContent`/`renderInline`/`TypingDots` | **Low-Medium** | Visual only, but the markdown-lite parsing regexes are bespoke and must be preserved exactly — a careless rewrite could break message formatting, not just styling |
| Curriculum panel rendering (inline JSX, lock-reason display) | **Medium** | Visual change is low-risk, but this code is tightly interleaved with `navigateToLesson`/`startRevision`/`initiateSkip` business logic in the same render block — needs careful extraction, not a blind re-skin |
| Chat input area (mic/file/image attach, send) | **Medium** | Touches 3 browser APIs (`MediaRecorder`, `FileReader`, file input) — re-skinning the buttons is low-risk, but any refactor of the surrounding layout risks breaking event wiring |
| `InsightsPanel` | **Low-Medium** | Self-contained, read-only display component — safe to re-skin in isolation |
| `PracticePanel` | **Medium** | Has its own internal scoring/difficulty state; re-skinning is safe, but if migration also "extracts the QuizClient pattern" as recommended, the underlying score-submission contract must be preserved exactly |
| **`sendMessage` and the `[LESSON_COMPLETE]` keyword-detection logic** | **HIGH** | This is the core AI-completion signal for the entire curriculum. It is a fragile, string-matching heuristic across 3 languages with no structured contract from the API. **Must not be touched as part of a visual migration** — any UI work must leave this function's logic byte-for-byte identical, since it gates lesson completion, XP, and Knowledge-Graph topic-progress updates. |
| **Topic-progress / skip-risk / promotion logic** (`initiateSkip`, `confirmSkip`, `FinalAssessmentModal`'s `PromotionResult` handling) | **HIGH** | This is graded, mastery-gating logic that determines curriculum advancement. Any refactor must isolate visual changes from this logic with zero behavioral diff. The evidence-breakdown/localized-explanation data structures must render identically even if styled differently. |
| **Monaco editor integration + code execution (`handleRunCode`, terminal)** | **HIGH** | Third-party editor with `ssr:false` dynamic import, plus a live code-execution backend call. High technical fragility; also the one area that legitimately should *not* be candy-ified (see Phase 3). Migration scope should explicitly exclude touching this beyond chrome around its edges (panel header, run button skin). |
| **Voice (TTS playback + STT recording)** | **Medium-High** | Two separate browser-API integrations (`speakText`/`stopSpeaking` for TTS, `MediaRecorder` for STT) with cleanup-on-unmount logic (`useEffect` returning `mediaRecorderRef.current?.stop()`). Re-skinning the mic button is safe; touching the surrounding state machine is not. |
| **Session lifecycle / curriculum-progress fetch on mount** (lines ~760–1018, the largest single effect block) | **HIGH** | ~258 lines of initialization logic for session creation, curriculum fetch, progress fetch, lock-reason computation. This is the most complex, least-visually-relevant block in the file — a migration should not need to touch it at all, but its sheer size makes it the most likely place for an over-eager refactor to introduce regressions. |

**Top-line guidance:** the visual migration surface (chrome, panels, buttons, message bubbles, progress displays) is almost entirely separable from the business-logic surface (completion detection, topic-progress/skip/promotion, session lifecycle, code execution, voice). The recommended strategy is therefore strictly additive/wrapping changes to presentation, with an explicit "do not touch" list for the HIGH-risk logic blocks.

---

## 8. Migration strategy (Phase 8 — design only, not implemented)

**Sprint 1 — Chrome & layout shell (Low risk, high visibility)**
- Scope: Top bar, `Panel`/`PanelHeader` → candy `<Card>`, tab bar, panel-maximize controls. Re-skin colors/shadows/fonts only — zero logic changes.
- Risk: Low.
- Expected impact: Immediately changes the dominant visual impression (dark IDE → light candy world) for the highest-traffic screen in the product, with the lowest risk of any sprint in this roadmap.

**Sprint 2 — Chat panel & AI personality (Medium risk, highest "same world" impact)**
- Scope: Re-skin `MessageContent` bubbles and `TypingDots` using Learning Coach's already-shipped candy chat pattern; introduce `<EagleMascot>` into the chat empty-state and into the lesson-completion celebration (replacing the bare "+10 XP" toast with `useConfetti()` + mascot reaction). Explicitly preserve `sendMessage`'s `[LESSON_COMPLETE]` detection logic untouched — this sprint touches only what wraps that function's output, never its internals.
- Risk: Medium (touches the most load-bearing function's surrounding UI, but not its logic).
- Expected impact: Directly answers the Phase 5/6 findings — "does the eagle exist," "does it feel like the same world" — for the screen where students spend the most time talking to the AI.

**Sprint 3 — Curriculum, Insights & Practice panels (Medium risk)**
- Scope: Re-skin the curriculum panel (lesson list, lock states) toward a Dashboard-style journey/skill-path visual; migrate `InsightsPanel` to `<ProgressRing>`/`<Pill>`; migrate `PracticePanel` toward the `/quiz` (`QuizClient.tsx`) reference pattern. Preserve all underlying data contracts (lock-reasons, mastery percentages, practice scoring) exactly.
- Risk: Medium (more interleaved logic than Sprint 1/2, but no HIGH-risk blocks are touched).
- Expected impact: Extends the "same world" treatment to progression and practice — the second- and third-most-visible workflows after chat.

**Sprint 4 — Final Assessment & code/terminal chrome (Medium-High risk, deferred)**
- Scope: Re-skin `FinalAssessmentModal`'s chrome (candy `<Card>`/`<CandyButton>`/confetti for `PROMOTED` outcomes) while leaving the `PromotionResult`/evidence-breakdown data handling completely untouched; lightly re-skin the Monaco/terminal panel header and run button only (not the editor or terminal internals).
- Risk: Medium-High — this sprint deliberately touches the two HIGH-risk logic areas' *edges* (promotion result display, code-run chrome), so it should go last, after the team has established a safe re-skinning pattern in Sprints 1–3, and should include explicit before/after behavioral verification of promotion-decision rendering.
- Expected impact: Closes the remaining visual gap without being the first or only sprint to touch the highest-stakes logic in the file.

**Explicitly out of scope for all 4 sprints:** `sendMessage`'s completion-detection logic, topic-progress/skip-risk/promotion business logic, Monaco editor internals, code-execution backend integration, voice recording/playback state machines, and the 258-line session-initialization effect block. These should only ever be touched in a dedicated logic-refactor effort, never bundled with visual migration work.

---

## Summary

- **LessonScreen.tsx line count:** 2,250
- **Total lesson-experience surface (file + 4 dependencies + CSS module):** 3,332 lines across 6 files
- **Component inventory count:** ~14 logical UI units (1 monolithic screen + 8 inline sub-renders + 4 real sibling components + 1 third-party editor)
- **Workflow count:** 12 distinct user/AI-triggered workflows
- **Candy-system presence found:** 0 (confirmed across all 6 files)

**Top 10 migration risks:**
1. `sendMessage`'s `[LESSON_COMPLETE]` keyword-detection logic (HIGH — fragile, 3-language string matching, gates curriculum advancement)
2. Topic-progress / skip-risk / promotion logic (HIGH — graded, mastery-gating)
3. Monaco editor + code execution integration (HIGH — third-party, live backend call)
4. Session lifecycle / curriculum-progress init (HIGH — 258-line block, largest single effect)
5. Voice recording/playback state machines (Medium-High — 2 browser APIs, unmount cleanup)
6. Chat input area's 3 browser-API integrations (Medium — mic/file/image)
7. `PracticePanel`'s internal scoring/difficulty contract (Medium)
8. Curriculum panel's interleaving of display JSX with navigation/skip/revision logic (Medium)
9. `MessageContent`'s bespoke markdown-lite parsing regexes (Low-Medium — must survive any chat-bubble re-skin unchanged)
10. General risk of an "over-eager refactor" touching the largest, least-visually-relevant block (session init) while aiming for a smaller visual change

**Top 10 modernization opportunities:**
1. Introduce `<EagleMascot>` into the chat experience — currently zero presence in the highest-traffic screen
2. Re-skin chat bubbles using Learning Coach's already-proven candy pattern
3. Replace ad-hoc XP toast with `useConfetti()` + mascot celebration on lesson completion
4. Replace `InsightsPanel`'s plain mastery numbers with `<ProgressRing>`
5. Rebuild `PracticePanel`'s question flow on the `/quiz` (`QuizClient.tsx`) reference implementation
6. Replace `Panel`/`PanelHeader` chrome with candy `<Card>` throughout (top bar, curriculum, chat)
7. Add candy empty-states (mascot + message) for curriculum-loading and pre-first-message chat states
8. Re-skin `FinalAssessmentModal`'s promotion-result reveal as a celebratory candy moment (confetti on `PROMOTED`)
9. Replace the language/subject badge and AI-provider tag with candy `<Pill>`
10. Fix the misleadingly-named `.learnCandy` CSS class (carried over from the prior audit) as part of Sprint 1's cleanup, so it stops implying a migration that hasn't happened

**Status: Audit only. No code modified. LessonScreen.tsx untouched.**
