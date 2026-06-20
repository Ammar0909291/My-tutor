# Visual Learning Sprint S — Tutor ↔ Visual Synchronization Engine · Report

## Summary / bottom line

Synchronization **infrastructure** that will let future tutor narration drive the visual sequence —
so a visual feels like a teacher drawing on a board while explaining. It adds: an optional, additive
`onStepChange(step)` to the existing playback engine; a pure `LessonSegment`/`LessonTimeline` model;
a pure `tutorVisualSync` layer that aligns narration segments to animation steps into a `SyncPlan`;
and a dev-only viewer that live-highlights the active narration as each demo visual animates. **No
live tutor behavior change, no AI/prompt change, no curriculum change, no new intelligence.** Sprint
R/R.1 animation renderers are untouched (the only existing-file edits are the dev demo page and one
optional callback on the playback hook). `tsc` 0 errors, build exit 0.

## Audit findings (Task 1 → `docs/TUTOR_VISUAL_SYNCHRONIZATION_AUDIT.md`)

Pipeline: Tutor response (`visual` tag) → `LessonScreen` → `VisualCard` (`VISUAL_STEP_COUNTS` +
`useTeachingPlayback`) → `teachingTimeline` → playback `revealStep` (0→stepCount).
**Synchronization point:** `revealStep` is the single existing progress signal — each increment is
one "the teacher drew the next thing" beat; segment *i* aligns with `revealStep === i`.
**Safe insertion points:** (1) optional `onStepChange` on the hook (additive), (2) pure segment
model, (3) pure sync layer, (4) dev-only viewer.
**Replay:** `replay()` resets to 0 and re-fires `onStepChange` from 0 → narration re-aligns.
**Speed:** speed scales time only; step sequence/count are identical, so the plan (computed on step
indices) is speed-invariant. **Mobile:** `onStepChange` is one state-driven `useEffect` — no timers/
listeners, mobile-safe.

## Synchronization architecture

```
LessonTimeline { segments: [{ id, narration, visualStep }] }      (Task 2, pure types)
        │  buildSyncPlan(timeline, stepCount)                     (Task 4, pure)
        ▼
SyncPlan { stepCount, steps: [{ step, narration, matched }], status }
        │  status = ok | incomplete_coverage | narration_overflow
        ▼
useTeachingPlayback(stepCount, { onStepChange })  ──onStepChange(step)──▶  narrationForStep(plan, step)
        │  (Sprint R.1 engine, now with optional additive callback — Task 3)
        ▼
existing VisualCard / SVG renderers  (unchanged)
```

## Files changed

**New**
- `docs/TUTOR_VISUAL_SYNCHRONIZATION_AUDIT.md` — Task 1 audit.
- `src/lib/visuals/lessonSegments.ts` — `LessonSegment` / `LessonTimeline` pure types (Task 2).
- `src/lib/visuals/tutorVisualSync.ts` — `SyncPlan`/`SyncStep`/`SyncStatus`, `buildSyncPlan()`,
  `narrationForStep()`, `timelineFromNarrationLines()` — pure functions (Task 4).
- `src/components/school/visuals/TutorVisualSyncViewer.tsx` — dev-only viewer (Task 5).

**Modified**
- `src/hooks/useTeachingPlayback.ts` — added optional `onStepChange?(step)` (Task 3): a new field on
  the options type + one `useEffect` firing it on `revealStep` change. Purely additive — existing
  callers (callback `undefined`) and the animation are unaffected.
- `src/app/dev/visual-demo/VisualDemo.tsx` — mounts the dev-only Sprint S viewer.

**Reused unmodified (git-status verified):** `teachingTimeline.ts`, `VisualCard.tsx`, all 10 SVG
renderers, `VisualPlaybackControls.tsx`, `visualAnim.module.css` — Sprint R/R.1 animation is unchanged.

## Demonstration results (Tasks 6/7)

Built sync plans for the five required visuals via the **real** `tutorVisualSync` functions:

```
number_line (4)      status=ok   step1 "Let's draw the number line." → step4 "Highlight zero…"
fraction_bar (4)     status=ok   step1 "Draw the empty bars." → step4 "Read the value inside each bar."
coordinate_plane (5) status=ok   step1 "Draw the x and y axes." … step4 "Plot the point."
water_cycle (6)      status=ok   step1 "Start with the ground and mountain." … step4 "Clouds form above."
food_chain (5)       status=ok   step1 "Begin with the Sun." … step4 "The frog eats the grasshopper."
edge cases:  5 lines on a 4-step visual → narration_overflow ✓
             2 lines on a 4-step visual → incomplete_coverage ✓
VERIFY: five plans ok + full coverage: true | overflow detected: true | incomplete detected: true
```

Each step maps to the correct narration segment; over/under-supply is reported, not silently wrong.
In the dev viewer the active narration line is bold-highlighted live as the animation reaches each
step (driven by the new `onStepChange`). The demonstration used a temporary script deleted
immediately after running; no DB rows were seeded.

## Validation results (Task 8)

```
npx prisma generate                 → ok
npx tsc --noEmit -p tsconfig.json   → 0 errors
npm run build                       → exit 0
git status → only useTeachingPlayback.ts (additive callback) + VisualDemo.tsx (viewer mount) modified
```

Confirmed unchanged: Sprint R/R.1 animation behavior (renderers, timeline, VisualCard, controls, CSS
all untouched), Tutor Max, AI prompts, curriculum, Educational Intelligence, XP, grading, Visual
Mastery. Only synchronization infrastructure was added.

## Educational review (Task 9 — architecture suitability, review only)

| Domain | Suitability | Notes |
|---|---|---|
| CBSE / UP Board | High | Narration-driven build-up matches classroom board-work for math/science topics. |
| Programming | Medium-High | Useful for process/flow diagrams; code itself is text, not step visuals. |
| Finance | High | Step-by-step chart/number-line build-up suits financial concepts. |
| Engineering | High | Aligning narration to geometry/graph construction is a strong fit. |
| Medicine | Medium-High | Process flows (cycles, pathways) benefit; needs richer diagram types later. |
| Universal Learning | High | The model is content-agnostic — any visual with N steps + N narration lines syncs. |

The sync model is purely structural (step index ↔ narration), so it generalizes to any future
visual type without per-domain logic.

## Roadmap

1. **Sprint T (out of scope):** wire the sync plan into `VisualCard`/`LessonScreen` so live tutor
   narration (or TTS) advances the visual — the actual narration-drives-animation behavior. Requires
   a source of per-step narration (authored or, later, AI-segmented).
2. Drive playback FROM narration/TTS boundaries (advance step when a segment finishes) rather than a
   fixed per-step duration.
3. Author or AI-segment per-step narration for the full visual catalog (the 10 visuals).
4. Expose `onStepChange` through `VisualCard` props so a parent can observe step progress in production.

**STOP AFTER REPORT** — no Sprint T, no Tutor Max changes, no AI/prompt/curriculum changes, no new
intelligence. This sprint only creates the synchronization infrastructure for future
narration-driven visuals.
