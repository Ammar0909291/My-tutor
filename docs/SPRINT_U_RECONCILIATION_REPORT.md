# Sprint U Reconciliation Report

Branch: `sprint-u-reconciliation` (created from
`origin/claude/my-tutor-foundation-KDSUO`, i.e. on top of `fe03d6a`)

Per `docs/SPRINT_U_DIVERGENCE_AUDIT.md`'s verdict, canonical Sprint U is
`d406655`. This reconciliation replaces origin's inert production wiring
(`fe03d6a`) with canonical's working narration engine, while preserving
origin's genuinely useful dev-only tooling.

## Files preserved (from canonical `d406655`, now authoritative)

| File | Status |
|---|---|
| `src/components/learn/LessonScreen.tsx` | Replaced with canonical's version — `VisualCard` call now passes `hasNarration` + a live `narrationTimeline` derived from `msg.content` via `extractNarrationSegments()`. |
| `src/components/school/visuals/VisualCard.tsx` | Replaced with canonical's version — owns its own `NarrationProgress`, auto-advances it, derives `narrationStep` internally via `synchronizedPlayback.ts`'s `visualStepForSegment()`, feeds the existing `useTeachingPlayback({ mode: 'narration' })` contract. Timer-mode fallback preserved byte-for-byte when no narration is supplied. |
| `src/lib/visuals/narrationSource.ts` | New from canonical — pure helper that extracts ordered narration segments from real tutor-response text (no AI, no DB writes). |
| `docs/VISUAL_LEARNING_SPRINT_U_AUDIT.md` | New from canonical. |
| `docs/VISUAL_LEARNING_SPRINT_U_REPORT.md` | Replaced with canonical's version (origin's narrative on this same path is superseded — it remains readable in `fe03d6a`'s history and in `docs/LIVE_NARRATION_VISUAL_INTEGRATION_AUDIT.md`). |

## Files preserved (from origin `fe03d6a`, unchanged — dev-only, non-conflicting)

| File | Status |
|---|---|
| `src/lib/visuals/lessonNarration.ts` | Kept as-is. Static, developer-authored per-visual-type narration script (`AUTHORED_NARRATION`), plus a `toLessonTimeline()` adapter into the Sprint S `LessonTimeline` shape. Used only by the dev viewer, not by production `LessonScreen`. |
| `src/app/dev/visual-demo/VisualDemo.tsx` | Kept as-is — one isolated import + JSX block mounting the Sprint U dev panel, confirmed not to touch any other route or component. |
| `docs/LIVE_NARRATION_VISUAL_INTEGRATION_AUDIT.md` | Kept as-is — origin's own Task 1 audit narrative, preserved for history. |

## Conflicts resolved

| File | Conflict | Resolution |
|---|---|---|
| `src/components/learn/LessonScreen.tsx` | Both sides modify the same `VisualCard` render call with incompatible prop sets. | Canonical's version wins (`git checkout d406655 -- ...`) — it is the only version that actually drives narration in production. |
| `src/components/school/visuals/VisualCard.tsx` | Incompatible prop shapes: canonical's `narrationTimeline` (caller supplies segments, `VisualCard` derives step internally) vs. origin's `narrationStep` (caller expected to supply a live step directly, but no production caller ever did). Not a textual merge — a design choice. | Canonical's version wins, in full — it is a strict functional superset (origin's shape can express nothing canonical's can't, and is never actually exercised in production). |
| `docs/VISUAL_LEARNING_SPRINT_U_REPORT.md` | Same path, unrelated content (both sides authored a report under this exact filename). | Canonical's report wins on this path; origin's content survives separately as `docs/LIVE_NARRATION_VISUAL_INTEGRATION_AUDIT.md` (different filename, no path collision). |
| `src/components/school/visuals/LiveNarrationPlaybackViewer.tsx` | Not a path conflict, but a **contract mismatch**: this dev-only viewer (origin-only file) called `<VisualCard type={type} hasNarration narrationStep={narrationStep} />` — the `narrationStep` prop no longer exists once canonical's `VisualCard` replaces origin's. Would fail to compile as-is. | **Adapted** (not removed): rewritten to build a `narrationTimeline` via `lessonNarration.ts`'s own `toLessonTimeline()` adapter and pass `hasNarration={!!timeline} narrationTimeline={timeline}` to canonical's `VisualCard`. The manual Next/Previous/Reset stepper buttons were removed, since canonical's `VisualCard` auto-advances internally and exposes its own play/pause/replay/speed controls — there is no externally-steppable position to drive by hand anymore. The viewer still displays per-visual sync status (`buildSyncPlan`) and segment count, and still renders the real production `VisualCard` in narration mode for all 5 demo visual types. Confirmed dev-only (`if (process.env.NODE_ENV !== 'development') return null`, unchanged) and confirmed to add no production-reachable code path. |

No file was dropped due to a compilation failure — `lessonNarration.ts` and
`VisualDemo.tsx` needed no changes at all; only the one viewer needed
adaptation, and it was adapted rather than removed, per the task's
instruction to preserve origin's dev tooling unless it fails to compile.

## Validation results

```
$ npx prisma generate
✔ Generated Prisma Client (v6.19.3)

$ npx tsc --noEmit
(0 errors)

$ npm run build
✓ Compiled successfully — all routes built, including /dev/visual-demo
  (which now mounts the adapted LiveNarrationPlaybackViewer)
```

No reconciliation-related errors required fixing beyond the
`LiveNarrationPlaybackViewer.tsx` adaptation described above. No feature
additions were made.

## Final canonical architecture

```
Tutor Response (msg.content)
  → extractNarrationSegments(msg.content, msg.visual)      [narrationSource.ts — canonical]
  → LessonScreen passes { hasNarration: true, narrationTimeline }
  → VisualCard:
      useNarrationMode = hasNarration && narrationTimeline.segments.length > 0
      owns NarrationProgress, auto-advances via synchronizedPlayback.ts's advance()
      narrationStep = visualStepForSegment(progress, stepCount)
      useTeachingPlayback(stepCount, { mode: 'narration', narrationStep, speed })
  → revealStep → VisualComponent (unchanged SVG renderers)

Fallback (no narration): useNarrationMode === false
  → useTeachingPlayback(stepCount, { autoPlay, speed })   [identical to Sprint R.1]

Dev-only verification (unchanged engine, adapted call site):
  /dev/visual-demo → LiveNarrationPlaybackViewer
    → lessonNarration.ts's getAuthoredNarration() + toLessonTimeline()
    → same canonical VisualCard, via narrationTimeline (not narrationStep)
```

Reused unmodified throughout: `teachingTimeline.ts`, `useTeachingPlayback`'s
timer engine, `lessonSegments.ts`, `tutorVisualSync.ts`,
`narrationProgress.ts`, `synchronizedPlayback.ts`, all `VisualComponent`
SVG renderers, `VisualPlaybackControls.tsx`. No Tutor Max, AI route,
Educational Intelligence, curriculum, XP, grading, or assessment file was
touched in this reconciliation.
