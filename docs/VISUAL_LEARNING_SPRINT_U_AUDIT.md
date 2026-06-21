# Visual Learning Sprint U — Audit: Production Narration Wiring

Scope: trace the real production path from a tutor response to the rendered
animated visual, and identify the safest place to connect Sprint S/T's
narration-sync infrastructure without rebuilding anything. Read-only findings
below; no code in this section.

## 1. The real production path today

```
/api/learn/chat (route.ts)
  → AI text (routeAI) → cleanText (VISUAL:<type> tag stripped)
  → NextResponse { text, visual, visualSpec }
       ↓
LessonScreen.tsx (client)
  → setMessages(...) stores ChatMsg { content, visual, visualSpec, ... }
  → render loop, line ~2305:
      {!isUser && !msg.streaming && msg.visual && (
        <VisualCard type={msg.visual as VisualType} autoPlay speed={speed} />
      )}
       ↓
VisualCard.tsx
  → const playback = useTeachingPlayback(stepCount, { autoPlay, speed })
  → <VisualComponent type={type} revealStep={playback.revealStep} />
       ↓
useTeachingPlayback.ts
  → mode: 'timer' (default) — requestAnimationFrame advances revealStep
    by elapsed time / stepDurationMs, independent of any narration.
  → mode: 'narration' (Sprint T, unused in production) — revealStep is set
    directly from an externally supplied `narrationStep` prop; the rAF loop
    never starts in this mode.
```

## 2. Actual narration source

The tutor's explanation text already exists in production as
`msg.content: string` (`ChatMsg.content`, `LessonScreen.tsx:340`). It is the
same string used for the chat bubble and for `handleSpeak(msg.id, msg.content)`
(browser TTS). There is **no existing per-sentence narration timeline** for
it — `lessonSegments.ts`'s `LessonTimeline`/`LessonSegment` types exist, but
in production today they are only ever constructed from a hand-authored
`NARRATION` lookup inside the two dev-only demo viewers
(`TutorVisualSyncViewer.tsx`, `NarrationDrivenPlaybackViewer.tsx`), never from
a real `msg.content` string. This is the gap Sprint U closes.

## 3. Visual rendering entry point

`VisualCard` (`src/components/school/visuals/VisualCard.tsx`) is the single
production entry point that turns a `VisualType` into an animated SVG. It is
rendered from exactly one call site in production: `LessonScreen.tsx:2307`.
(`VisualRenderer` at `LessonScreen.tsx:2316` is a separate, unrelated
data-driven visual path — Sprint B — and is out of scope.)

## 4. Safest wiring location

- **Narration extraction**: a new pure helper (`narrationSource.ts`) called
  from `LessonScreen.tsx` at the exact point `VisualCard` is rendered. This
  keeps the AI route, the message model, and Tutor Max completely untouched
  — the helper only restructures text the model already returned.
- **LessonScreen change**: additive props only (`hasNarration`,
  `narrationTimeline`) on the existing `VisualCard` call. No other JSX in
  `LessonScreen.tsx` is touched.
- **VisualCard change**: an `if (narrationTimeline) { ... } else { existing
  code unchanged }` branch. `useTeachingPlayback` is called once per render
  (rules-of-hooks safe) with `mode` switched between `'timer'` and
  `'narration'` based on whether usable narration was supplied.

This avoids touching `teachingTimeline.ts`, `useTeachingPlayback`'s timer
engine, `lessonSegments.ts`, `tutorVisualSync.ts`, `narrationProgress.ts`,
`synchronizedPlayback.ts`, or any `VisualComponent` renderer — all are reused
as-is.

## 5. Replay behavior (current, both modes)

- Timer mode: `playback.replay()` zeroes `elapsedRef`, sets `revealStep` to 0,
  restarts the rAF loop. Unchanged by this sprint.
- Narration mode (new): replay must reset `NarrationProgress.currentSegment`
  to 0 (via `synchronizedPlayback.ts`'s `reset()`) and resume auto-advance —
  see Task 5 in the report.

## 6. Speed behavior (current, both modes)

- Timer mode: `speed` scales `elapsedRef` accumulation in the rAF loop
  (`elapsedRef.current += delta * speedRef.current`). Unchanged.
- Narration mode (new): speed must scale the interval between auto-advanced
  narration segments without touching `useTeachingPlayback`'s timer engine —
  handled entirely in `VisualCard`'s own narration-mode effect (see Task 6 in
  the report).

## 7. Fallback behavior

If `hasNarration` is false, or `narrationTimeline` is undefined, or
`narrationTimeline.segments.length === 0`, `VisualCard` MUST fall back
byte-for-byte to current Sprint R.1 timer-mode behavior. This is the
`useNarrationMode` boolean gate in the implementation — false in every case
where today's behavior was already correct, so existing lessons render
identically to before this sprint.

## 8. Conclusion

No new AI calls, no new database writes, no Tutor Max prompt changes are
needed. The wiring gap is purely: (a) turn `msg.content` into a
`LessonTimeline` (new, pure, deterministic helper), (b) pass it down two
existing call sites, (c) add one conditional branch in `VisualCard` that
drives the *already-built* Sprint S/T machinery instead of the timer. Implementation
follows in `docs/VISUAL_LEARNING_SPRINT_U_REPORT.md`.
