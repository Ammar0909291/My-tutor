# Visual Learning Sprint T — Narration-Driven Playback · Report

## Summary / bottom line

Playback can now advance **when narration advances** instead of by a timer — the visual builds up as
the teacher "speaks". A new additive `mode: 'timer' | 'narration'` (default `'timer'`) on
`useTeachingPlayback` lets an external `narrationStep` drive `revealStep` directly (rAF loop not
started in narration mode); a pure `synchronizedPlayback` controller maps narration segments to visual
steps (advance / retreat / reset / seek); a dev-only viewer demonstrates Next / Previous / Reset
stepping the visual without any timer. **Backward compatible** — timer mode is byte-for-byte unchanged
and is still the default, so `VisualCard`, the Sprint S viewer, and live lessons are unaffected. **No
live tutor / AI / prompt / curriculum / intelligence changes.** `tsc` 0 errors, build exit 0; the only
existing-file edits are the dev demo page and the additive hook option.

## Audit findings (Task 1 → `docs/NARRATION_DRIVEN_PLAYBACK_AUDIT.md`)

`useTeachingPlayback` is the single chokepoint turning "progress" into `revealStep`. **Safest
integration point:** add a `mode` driver there — `'timer'` keeps the rAF loop; `'narration'` sets
`revealStep` from an externally-supplied `narrationStep` and never starts a timer. `revealStep` remains
the only value renderers read, so no renderer/timeline/VisualCard change is needed; the narration step
is supplied by the caller (dev viewer now; a future LessonScreen/TTS source later), never generated
here. `onStepChange` (Sprint S) still fires in both modes.

## Architecture

```
NarrationProgress { currentSegment, totalSegments }                 (Task 2, pure types)
        │  advance / retreat / reset / seek                          (Task 4, pure)
        │  visualStepForSegment(progress, stepCount) → step (1:1, clamped)
        ▼
useTeachingPlayback(stepCount, { mode: 'narration', narrationStep }) → revealStep   (Task 3, additive)
        ▼
existing SVG renderers (unchanged)
```

## Files changed

**New**
- `docs/NARRATION_DRIVEN_PLAYBACK_AUDIT.md` — Task 1 audit.
- `src/lib/visuals/narrationProgress.ts` — `NarrationProgress` pure type (Task 2).
- `src/lib/visuals/synchronizedPlayback.ts` — `createNarrationProgress`, `advance`, `retreat`, `reset`,
  `seek`, `visualStepForSegment`, `isNarrationComplete` — pure, no timers, no AI (Task 4).
- `src/components/school/visuals/NarrationDrivenPlaybackViewer.tsx` — dev-only viewer (Task 5).

**Modified**
- `src/hooks/useTeachingPlayback.ts` — added optional `mode: 'timer' | 'narration'` (default `'timer'`)
  + `narrationStep` (Task 3): the rAF effect now guards `mode !== 'timer'`, and a new effect drives
  `revealStep` from `narrationStep` in narration mode. Purely additive — timer mode unchanged.
- `src/app/dev/visual-demo/VisualDemo.tsx` — mounts the dev-only Sprint T viewer.

**Reused unmodified (git-status verified):** `teachingTimeline.ts`, `VisualCard.tsx`, all SVG
renderers, `VisualPlaybackControls.tsx`, `visualAnim.module.css`, and the Sprint S libs
(`lessonSegments.ts`, `tutorVisualSync.ts`) — Sprint R/R.1 + S unchanged.

## Demonstration results (Task 7)

Ran the five required visuals through the **real** `synchronizedPlayback` controller:

```
number_line:      seg 1→step 1, seg 2→step 2, seg 3→step 3, seg 4→step 4
fraction_bar:     seg 1→step 1, seg 2→step 2, seg 3→step 3, seg 4→step 4
coordinate_plane: seg 1→step 1, seg 2→step 2, seg 3→step 3, seg 4→step 4
water_cycle:      seg 1→step 1, seg 2→step 2, seg 3→step 3, seg 4→step 4
food_chain:       seg 1→step 1, seg 2→step 2, seg 3→step 3, seg 4→step 4
clamp at total: true · complete: true · after retreat: true · after reset: true (step 0)
VERIFY segment N → step N (all 5 visuals): true
```

Each narration segment advances exactly one visual step; over-advancing clamps at the last step, and
retreat/reset behave correctly. In the dev viewer, Next/Previous/Reset move the narration and the
visual follows with no timer involved. The demonstration used a temporary script deleted immediately
after running; no DB rows were seeded.

## Validation results (Task 8)

```
npx prisma generate                 → ok
npx tsc --noEmit -p tsconfig.json   → 0 errors
npm run build                       → exit 0
git status → only useTeachingPlayback.ts (additive mode) + VisualDemo.tsx (viewer mount) modified
```

Confirmed: Sprint R/R.1 unchanged, Sprint S unchanged, **timer mode unchanged** (default + identical
rAF behavior), narration mode operational. Tutor Max, AI prompts, curriculum, Educational
Intelligence, XP, grading all unchanged — only playback control was added.

## Educational review (Task 9 — architecture suitability, review only)

| Domain | Suitability | Notes |
|---|---|---|
| CBSE / UP Board | High | Narration-paced build-up mirrors a teacher narrating board work. |
| Programming | Medium-High | Good for process/flow visuals; code remains text. |
| Finance | High | Pacing chart/number-line construction to explanation is natural. |
| Engineering | High | Aligning each construction step to the spoken step suits derivations. |
| Medicine | Medium-High | Process/pathway diagrams benefit; richer diagram types later. |
| Universal Learning | High | Purely structural (segment ↔ step) — generalizes to any N-step visual. |

## Roadmap

1. **Sprint U (out of scope):** wire a real narration source (authored per-step lines, or TTS
   boundary events) into `VisualCard`/`LessonScreen` so live lessons use narration mode. Needs a
   per-step narration provider.
2. Auto-advance the narration step from TTS `onboundary`/segment-end events.
3. Hybrid mode: narration-driven with a timer fallback if no narration arrives within a window.
4. Author per-step narration for the full 10-visual catalog.

**STOP AFTER REPORT** — no Sprint U, no Tutor Max changes, no AI/prompt/curriculum changes. This sprint
only enables narration-controlled playback infrastructure.
