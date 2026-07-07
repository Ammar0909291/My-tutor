# Visual Learning Sprint S — Tutor ↔ Visual Synchronization Engine · Audit (Task 1)

**Status: audit only. Infrastructure only — no live tutor behavior change, no AI/prompt change, no
curriculum change, no new intelligence. Sprint R/R.1 animation behavior unchanged.**

## Goal

Today the tutor speaks and the visual animates independently. This sprint builds the
infrastructure to let (future) tutor narration drive the visual sequence — without changing any
runtime behavior yet.

## Pipeline trace: Tutor Max Response → LessonScreen → VisualCard → Teaching Timeline → Playback

| Stage | File | Detail |
|---|---|---|
| 1. Tutor response | `learn/chat/route.ts` | returns `{ text, visual?: VisualType, … }`; `visual` is a single type tag |
| 2. LessonScreen | `LessonScreen.tsx:2307` | renders `<VisualCard type={msg.visual} autoPlay speed={speed} />` below the tutor bubble |
| 3. VisualCard | `school/visuals/VisualCard.tsx` | looks up `VISUAL_STEP_COUNTS[type]` and calls `useTeachingPlayback(stepCount, { autoPlay, speed })`; passes `revealStep` to the SVG component |
| 4. Teaching Timeline | `lib/visuals/teachingTimeline.ts` | builds a uniform `Timeline` of `stepCount` steps (Sprint R) |
| 5. Playback | `hooks/useTeachingPlayback.ts` | rAF-drives `revealStep` 0→stepCount; exposes play/pause/replay/speed (Sprint R.1) |

## Synchronization points

- **`revealStep`** (0 → stepCount) is the single, already-existing progress signal. Each increment
  is exactly one "the teacher just drew the next thing" moment.
- **`VISUAL_STEP_COUNTS[type]`** gives the number of steps per visual — the count narration segments
  must map onto.
- A narration segment ↔ animation step mapping is therefore: segment *i* aligns with `revealStep === i`.

## Safe insertion points (chosen)

1. **Playback step event (Task 3):** add an optional `onStepChange?(step)` to
   `useTeachingPlayback` — additive, optional, fired from a `useEffect` on `revealStep`. No renderer
   or animation rewrite; existing callers are unaffected (callback is `undefined`).
2. **Pure segment model (Task 2):** a new `lessonSegments.ts` with `LessonSegment` / `LessonTimeline`
   types only — no behavior.
3. **Pure sync layer (Task 4):** a new `tutorVisualSync.ts` that, given a `LessonTimeline` and a
   visual's `stepCount`, produces a `SyncPlan` aligning each narration segment to an animation step.
   Pure functions — no AI, no I/O, no rendering.
4. **Dev-only viewer (Task 5):** a `TutorVisualSyncViewer` that renders existing demo visuals and the
   computed sync plan side-by-side. No production wiring.

## Replay behavior

`useTeachingPlayback.replay()` resets `elapsedMs`/`revealStep` to 0 and replays; the new
`onStepChange` fires again from 0 on replay, so a synchronization consumer naturally re-aligns
narration on replay. No change to replay mechanics.

## Speed behavior

Speed scales `elapsedMs` (0.5×–1.5×), so step timing changes but the **step sequence and count are
identical** at any speed. A segment↔step mapping is speed-invariant — the sync plan is computed on
step indices, not time, so it holds at every speed.

## Mobile behavior

Playback is a single rAF loop with `prefers-reduced-motion` handled in the CSS (Sprint R.1);
`onStepChange` adds only a state-driven `useEffect` callback (no extra timers, no listeners), so it
is mobile-safe and adds negligible cost. The dev viewer is dev-only and never ships.

## Reuse decision (no rebuilds)

Reuses `teachingTimeline.ts`, `useTeachingPlayback.ts`, `VisualCard`/`VISUAL_STEP_COUNTS`, and the
existing SVG visuals unchanged (the hook gains one optional callback). New artifacts only:
`lessonSegments.ts`, `tutorVisualSync.ts`, `TutorVisualSyncViewer.tsx`.

## Insertion points (for implementation)

- `src/hooks/useTeachingPlayback.ts` — optional `onStepChange` (additive).
- `src/lib/visuals/lessonSegments.ts` — pure types.
- `src/lib/visuals/tutorVisualSync.ts` — pure sync-plan functions.
- `src/components/school/visuals/TutorVisualSyncViewer.tsx` — dev-only viewer in `/dev/visual-demo`.
