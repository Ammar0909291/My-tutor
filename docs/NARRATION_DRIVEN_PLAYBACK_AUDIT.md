# Visual Learning Sprint T — Narration-Driven Playback · Audit (Task 1)

**Status: audit only. Playback control infrastructure only — no live tutor change, no AI/prompt
change, no curriculum change, no new intelligence. Sprint R/R.1 timer behavior and Sprint S unchanged.**

## Goal

Today animation advances by a timer (`useTeachingPlayback` rAF loop, ~700ms/step). This sprint adds
the infrastructure for animation to advance when *narration* advances — so the visual feels like a
teacher drawing while speaking — without changing any runtime behavior yet (timer remains default).

## Pipeline trace: Tutor Response → LessonScreen → Narration → Sync Plan → Playback → Visual Step

| Stage | File | Detail |
|---|---|---|
| Tutor response | `learn/chat/route.ts` | returns `{ text, visual? }` |
| LessonScreen | `LessonScreen.tsx` | renders `<VisualCard … />` |
| Narration (Sprint S) | `lessonSegments.ts` / `tutorVisualSync.ts` | `LessonTimeline` segments ↔ steps; `SyncPlan` |
| Playback | `useTeachingPlayback.ts` | drives `revealStep`; **timer** via rAF today |
| Visual step | SVG renderers | mount elements up to `revealStep` |

## Safest production integration point

`useTeachingPlayback` is the single chokepoint that turns "progress" into `revealStep`. Adding a
**`mode: 'timer' | 'narration'` driver** there (default `'timer'`) lets a narration source supply
`narrationStep` to drive `revealStep` directly, with the rAF loop simply not started in narration
mode. Rationale:

- **Backward compatible:** default `'timer'` — every existing caller (`VisualCard`, Sprint S viewer)
  is byte-for-byte unaffected; timer behavior is identical.
- **No renderer changes:** `revealStep` is still the only thing renderers read; only its *source*
  changes. SVG components, `VisualCard`, `teachingTimeline`, `VisualPlaybackControls` are untouched.
- **No AI/curriculum coupling:** the narration step is supplied by the caller (dev viewer this
  sprint; a future LessonScreen/TTS source later) — never generated here.

The mapping narration-segment → visual-step is the pure `synchronizedPlayback` layer (Task 4),
producing the integer fed to `useTeachingPlayback({ mode: 'narration', narrationStep })`.

## Backward-compatibility / safety analysis

- The rAF effect is guarded with `if (mode !== 'timer') return`, so narration mode never starts a
  timer.
- A separate narration effect (`if (mode !== 'narration') return`) sets `revealStep` from
  `narrationStep`, stops any rAF, and marks completion when the last step is reached.
- `onStepChange` (Sprint S) still fires on `revealStep` change in both modes — synchronization
  consumers work identically.
- Speed/replay/play/pause remain on the hook; in narration mode they are inert (no timer to drive),
  which is the intended behavior.

## Reuse decision (no rebuilds)

Reuses `useTeachingPlayback` (one additive `mode`/`narrationStep` option), the existing renderers,
`VISUAL_STEP_COUNTS`, and Sprint S narration types. New artifacts only: `narrationProgress.ts` (types),
`synchronizedPlayback.ts` (pure controller), `NarrationDrivenPlaybackViewer.tsx` (dev-only).

## Insertion points (for implementation)

- `src/hooks/useTeachingPlayback.ts` — additive `mode`/`narrationStep`.
- `src/lib/visuals/narrationProgress.ts` — pure types.
- `src/lib/visuals/synchronizedPlayback.ts` — pure advance/retreat/reset + `visualStepForSegment`.
- `src/components/school/visuals/NarrationDrivenPlaybackViewer.tsx` — dev-only viewer in `/dev/visual-demo`.
