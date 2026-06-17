# Lesson AI Tutor — Sprint 2 Modernization Plan

Branch: `claude/my-tutor-foundation-KDSUO`
Status: **Audit and design only. No code changed.**
Builds on: Sprint 1 (commit `99527b9`) — shell/chrome modernization (Panel→Card, top bar, mobile tabs).

This document covers the AI Tutor chat experience inside `src/components/learn/LessonScreen.tsx`. It does **not** propose any change to AI prompting, scoring, mastery, or curriculum-progression logic — those systems are out of scope and untouched by every recommendation below.

---

## Phase 1 — Chat Experience Forensic Audit

File: `src/components/learn/LessonScreen.tsx`. Chat panel spans roughly lines 1805–2237.

### Message list (lines 1908–2075)

**Tutor (assistant) bubbles** (1943–2026)
- Current: `border-radius: 0 12px 12px 12px`, `background: var(--bg-base)`, `1px solid var(--border-subtle)`, plus a `2px solid var(--coral)` left accent border. While speaking, background swaps to `var(--bg-elevated)` with a glow shadow `0 0 20px rgba(247,129,102,0.15)`.
- Avatar: 20×20 circular gradient with "МТ"/"AI" initials — not the EagleMascot.
- Problems: hairline border + glow shadow is exactly the pre-Sprint-1 "IDE glow" language Sprint 1 already replaced in panel chrome — the chat bubbles are now the last place using it. Avatar is generic initials instead of the brand mascot already established elsewhere (homepage, dashboard).
- Opportunity: flat candy shadow + Card-style radius, swap initials avatar for a small EagleMascot (logo variant, ~24px).

**Student bubbles** (2037–2049)
- Current: coral gradient `linear-gradient(135deg, var(--coral), var(--coral-hover))`, white text, `border-radius: 12px 12px 0 12px`, `slideInRight` animation.
- This already resembles candy button language (gradient + rounded). Lowest-risk element in the chat — minimal change needed, mostly radius/shadow alignment.

**Message content rendering** (`MessageContent`, lines 123–148)
- Custom inline markdown (`**bold**`, `*italic*`, `` `code` ``, bullets, numbered lists, `#`–`###` headings) — no markdown library. Code spans use `bg-white/20` (user) / `bg-black/30` (tutor).
- Problem: no syntax highlighting, no fenced code block treatment distinct from inline code — a multi-line code answer from the tutor renders as plain text with no monospace block container.
- Opportunity: wrap fenced code blocks in a small bordered/candy-shadowed code container (visually distinct from prose), independent of Monaco (Monaco stays out of scope).

**Input area** (2077–2234)
- Textarea + mic + camera + file-attachment + practice/insights shortcut buttons + send button, all currently raw styled buttons with ad hoc active/inactive treatment (consistent with the pre-Sprint-1 top-bar voice buttons before they were modernized).
- Opportunity: same flat-shadow pill treatment Sprint 1 already applied to the top-bar voice toggle and mobile tabs — this is a **direct continuation of an established Sprint 1 pattern**, not a new visual language.

**Voice controls**: play/stop "speak" button and comprehension buttons ("Got it" / "Not clear") per tutor message — currently plain bordered buttons, same legacy language as the input row.

### Verdict
Nothing here requires touching `sendMessage`, the streaming logic, the markdown-parsing logic itself, or any AI/business logic — only the JSX wrapper styles around already-computed content.

---

## Phase 2 — Learning Coach Comparison

File: `src/app/coach/CoachChat.tsx`.

| Feature | LessonScreen (current) | CoachChat (modern reference) |
|---|---|---|
| Wrapper | Panel/Card with hairline glow remnants in bubbles | `CandyPage` |
| Tutor bubble | `var(--bg-base)` + coral left border | `var(--candy-card)`, no accent border |
| Student bubble | Coral gradient | `var(--candy-purple)` solid |
| Avatar | Initials circle | None — message itself carries brand identity |
| Loading state | TypingDots + "Думает.../Thinking..." text | Inline 3-dot pill, "Coach is thinking..." |
| Send button | Plain button | `CandyButton` |

**Reuse inventory for Sprint 2:**
- Card-based message containers (drop the glow shadow + hairline border in favor of flat candy shadow).
- `CandyButton` for the send button and the action-row buttons (speak / comprehension / attach / mic).
- Coach's simpler "thinking" pill as the model for a less IDE-ish thinking indicator.
- Candy color tokens already available via `.learnCandy` bridge (confirmed in Sprint 1) — no new token work needed, just swap shadow/radius/component usage.

---

## Phase 3 — Mascot Integration Audit

File: `src/components/ui/candy/Mascot.tsx`. `EagleMascot` supports `variant: 'logo' | 'hero'` and a `size` prop only — no mood/pose variants exist today.

Current usage: homepage (`logo` in nav, `hero` in banner), Dashboard V2 `HeroBanner`, Quiz, Flashcards, Certificates. **Not used anywhere in LessonScreen.tsx.**

Proposed lesson placements (design only, no implementation):
1. **Chat empty/init state** (replacing "Initializing tutor..." block, lines 1915–1923) — `logo` variant, ~40px, next to the loading text. Low risk, purely additive.
2. **First tutor message avatar** — `logo` variant (~24px) replacing the "МТ" initials circle. Establishes brand consistency with Coach/Dashboard.
3. **Lesson completion celebration** (replacing the bouncing 🎉 emoji overlay, lines 1082–1092) — `hero` variant alongside the existing `useConfetti()` hook, which is imported by the candy system but currently **unused** in LessonScreen despite being defined for exactly this purpose.
4. **"AI unavailable" / error state** — `logo` variant with a friendly fallback message, if/when such a state is identified as needed (not confirmed to exist today as a distinct UI state).

No new mascot variants (moods/poses) are required for Sprint 2 — existing `logo`/`hero` variants cover all four placements.

---

## Phase 4 — Message Hierarchy Audit

Current message types found in code, and how (if at all) they're visually differentiated:

| Type | Differentiation today |
|---|---|
| Plain tutor chat | Coral-accent bubble, avatar |
| Plain student chat | Gradient bubble, right-aligned |
| "Thinking" / streaming | TypingDots only |
| Visual learning aid (`msg.visual`) | `VisualCard` rendered below bubble (lines 2030–2034) |
| Lesson completion (`[LESSON_COMPLETE]` tag) | **Not a chat message at all** — triggers a separate fixed overlay |
| Assessment result tag | **Not shown in chat** — opens a separate modal |

**Problem:** every *visible* tutor chat message looks identical regardless of whether it's a routine explanation, a hint, or implicit coaching feedback — there's no "coaching tip" treatment distinct from ordinary dialogue, unlike Learning Coach's more deliberate visual pacing.

**Improved hierarchy plan (chrome only):**
- Keep all parsing/tag-detection logic (`[LESSON_COMPLETE]`, `[ASSESSMENT_RESULT ...]`) exactly as-is — these are business logic and out of scope.
- Add an optional visual variant to the message bubble wrapper (e.g., a thin colored left-edge or small icon) for messages already flagged as containing a `VisualCard` learning aid, so a glance at the chat distinguishes "explanation with a diagram attached" from plain dialogue. This is a presentational flag on existing data, not new logic.
- Leave the completion/assessment overlays as separate UI surfaces (per Phase 5) rather than trying to cram them into the message stream — their current architecture (overlay/modal, not a message bubble) is sound and doesn't need restructuring, only restyling.

---

## Phase 5 — Lesson Completion Experience

Two current surfaces, both chrome-only candidates:

1. **XP celebration overlay** (lines 1082–1092): fixed-position bounce animation, emoji + "+10 XP" + localized text, 3 seconds, no `useConfetti()` despite the hook being available in the candy system specifically for this purpose.
2. **Curriculum panel "Subject Complete" banner** (lines 1346–1359): green-tinted box with a button into `FinalAssessmentModal`.

**Does it feel rewarding today?** Functionally yes (XP, color, animation exist) but visually disconnected from the rest of the candy system — it's a bespoke overlay rather than reusing the same celebration language as Dashboard/Quiz/Flashcards (which already call `useConfetti()`).

**Design concept for Sprint 2 (existing systems only, no new gamification):**
- Replace the bounce-emoji overlay with the existing `useConfetti()` trigger already used elsewhere, paired with the `hero` EagleMascot and the same "+XP" treatment, restyled with candy Card/Pill components instead of raw `<div>`s.
- Restyle the curriculum-panel completion banner using `Card` + `Pill` + `CandyButton`, matching Dashboard's "achievement" card language, without changing when/why it appears (`curriculumProgress.isCompleted` logic untouched).

---

## Phase 6 — Empty / Loading / Waiting State Audit

| State | Current | Candy reference |
|---|---|---|
| No messages yet (init) | Centered initials avatar + "Initializing tutor..." + TypingDots | Dashboard/Coach empty states use mascot + friendly copy + candy Card framing |
| AI thinking | TypingDots row + localized "thinking" text | Coach's simpler 3-dot pill is more polished |
| Mic recording/processing | Button label swaps to "REC" / "..." | Consistent with Sprint 1's already-modernized voice-toggle pill language — just needs the same flat-shadow treatment extended to this button |
| Scroll-to-bottom prompt | 26×26 coral circle with ↓ | Reasonable already; could match `CandyButton`'s circular variant if one exists, otherwise leave as-is (low priority) |

**Missing opportunity:** no distinct "AI unavailable" state was found in the audited chat code — worth flagging for confirmation before Sprint 2 scoping in case it exists elsewhere (e.g., a toast) and was missed, but not assumed to need new UI without confirming first.

---

## Phase 7 — Sprint 2 Implementation Plan (Roadmap, Not Implementation)

All items below touch **styling/JSX-wrapper code only** in `LessonScreen.tsx` (plus possibly importing `EagleMascot`/`useConfetti`/`CandyButton`/`Pill` from `@/components/ui/candy`, mirroring Sprint 1's `Card` import). No file outside `src/components/learn/` is expected to change.

### Low Risk
- Restyle tutor/student message bubbles to flat candy shadow + Card-consistent radius (drop the glow-shadow/hairline-border remnants). *Files: LessonScreen.tsx. Impact: visual only. Complexity: low. Dependencies: none.*
- Convert input-row action buttons (mic, camera, attach, practice, insights, send) to `CandyButton`/flat-shadow pills, same pattern as Sprint 1's voice toggle. *Complexity: low.*
- Convert speak/comprehension per-message buttons to candy pill buttons. *Complexity: low.*
- Replace "Initializing tutor..." empty state with EagleMascot (`logo`) + candy-styled copy. *Complexity: low.*

### Medium Risk
- Swap message avatar from initials circle to `EagleMascot` (`logo`, small size) — requires checking spacing/alignment doesn't break the bubble layout at narrow widths. *Complexity: medium (layout sensitivity).*
- Add visual differentiation for messages carrying a `VisualCard` attachment (left-edge accent or icon) — purely additive flag on existing render path, but needs care not to alter `VisualCard`'s own rendering (explicitly out of scope). *Complexity: medium.*
- Restyle curriculum-panel "Subject Complete" banner with Card/Pill/CandyButton. *Complexity: medium (must preserve `isCompleted` conditional exactly).*
- Add fenced-code-block visual container distinct from inline code spans inside `MessageContent` — careful not to touch the actual bold/italic/list parsing logic, only wrap detected code blocks in a styled container. *Complexity: medium (touches shared rendering function used by both message types).*

### High Risk
- Replace the XP/bounce-emoji completion overlay with `useConfetti()` + `EagleMascot` (`hero`) + restyled XP card. Higher risk because it's a timed, animated, state-driven overlay (`xpCelebration` state + `[LESSON_COMPLETE]` tag detection) — any restyle must be verified not to alter the 3-second timing or the tag-detection trigger logic (lines ~540–551, 1082–1092). *Complexity: high (animation/state-timing sensitivity, not logic complexity).*

**Explicitly NOT in Sprint 2** (reserved further, or out of scope entirely): `FinalAssessmentModal.tsx` redesign, `PracticePanel`/`InsightsPanel` redesign, `VisualCard` internal redesign, Monaco/code-execution UI, any change to `[LESSON_COMPLETE]`/`[ASSESSMENT_RESULT ...]` tag parsing, scoring, mastery, or curriculum-progression logic.

---

## Summary

- **Estimated files touched (Sprint 2 implementation, when approved):** 1 (`LessonScreen.tsx`), possibly +1 if a shared `MessageContent` code-block helper is extracted — to be decided at implementation time, not now.
- **Estimated complexity:** Low–Medium overall; one High-risk item (completion celebration) due to animation/timing sensitivity, not logic complexity.
- **Top risks:** (1) breaking avatar/bubble layout at narrow mobile widths when introducing EagleMascot sizing; (2) accidentally touching the `MessageContent` shared parsing function while only intending to restyle code blocks; (3) disturbing the `xpCelebration` timing/trigger when swapping in `useConfetti()`.
- **Top opportunities:** (1) chat bubbles are the last surface still using the pre-Sprint-1 glow-shadow language — closing this finishes the shape-language migration Sprint 1 started; (2) `useConfetti()` already exists in the codebase and is imported by the candy system but unused here — wiring it up is near-zero-risk high-payoff; (3) EagleMascot is already a proven, reusable asset everywhere else in the app — bringing it into lessons is brand consistency, not new design work.

**No code was modified to produce this document.**
