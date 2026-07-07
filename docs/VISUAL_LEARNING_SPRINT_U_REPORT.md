# Visual Learning Sprint U — Production Narration Wiring Report

Connects the already-built Sprint S/T narration-sync infrastructure to the
real production lesson flow. No infrastructure was rebuilt; everything below
is additive wiring on top of `teachingTimeline.ts`, `useTeachingPlayback`,
`lessonSegments.ts`, `tutorVisualSync.ts`, `narrationProgress.ts`,
`synchronizedPlayback.ts`, and the existing `VisualCard` renderers — none of
which were modified.

## 1. Audit findings

See `docs/VISUAL_LEARNING_SPRINT_U_AUDIT.md` for the full trace. Summary:

- Real production path: `/api/learn/chat` → `ChatMsg.content` (tutor
  explanation text) + `ChatMsg.visual` (VisualType) →
  `LessonScreen.tsx:2305` renders `<VisualCard type={msg.visual} autoPlay
  speed={speed} />` → `VisualCard` drives `useTeachingPlayback` in timer
  mode → `VisualComponent` renders with `revealStep`.
- Narration source: `msg.content`, already in production, never previously
  split into segments.
- Safest wiring location: one new pure helper called from `LessonScreen`'s
  existing `VisualCard` call site, plus one conditional branch inside
  `VisualCard` itself. No other file needed to change.
- Fallback: absent/empty narration → exact prior Sprint R.1 timer behavior.

## 2. Files changed

| File | Change | Type |
|---|---|---|
| `src/lib/visuals/narrationSource.ts` | **New.** Pure `extractNarrationSegments(text, visualType?) → LessonTimeline`. | New, additive |
| `src/components/learn/LessonScreen.tsx` | Added import; `VisualCard` call now also passes `hasNarration` + `narrationTimeline={extractNarrationSegments(msg.content, msg.visual)}`. No other JSX touched. | Modified, additive |
| `src/components/school/visuals/VisualCard.tsx` | Added optional `hasNarration`/`narrationTimeline` props; added a narration-mode branch (own progress state, auto-advance effect, play/pause/replay/speed controls) that drives the existing `useTeachingPlayback({ mode: 'narration', narrationStep })` contract; timer-mode path is untouched when narration is absent. | Modified, additive |

No other files were changed. `git diff --name-only` confirms only these two
production files were touched (plus the two new docs and the new library
file).

## 3. Narration source design (Task 2)

`src/lib/visuals/narrationSource.ts`:

```ts
export function extractNarrationSegments(text: string, visualType?: string): LessonTimeline
```

- Splits on paragraph breaks (`\n+`) first, then sentence boundaries
  (`(?<=[.!?])\s+`) within a paragraph — deterministic, no AI.
- Produces one `LessonSegment` per beat, `visualStep = i + 1` (1-based) —
  the exact convention `tutorVisualSync.ts`'s own
  `timelineFromNarrationLines()` already uses, so the result is consumed by
  the existing Sprint S sync layer (`buildSyncPlan`) unchanged.
- No AI calls, no LLM prompts, no DB writes, no Tutor Max changes — it only
  restructures text the model already returned.

Verified against the brief's own example:

```
Input:  "Let's draw the number line.\n\nNow mark zero.\n\nPlace 3/4.\n\nNotice it is closer to 1."
Output: 4 segments, visualStep 1..4 — exact match.
```

## 4. LessonScreen wiring (Task 3)

Only the existing `VisualCard` render block was touched (additive props):

```tsx
<VisualCard
  type={msg.visual as VisualType}
  autoPlay
  speed={speed}
  hasNarration
  narrationTimeline={extractNarrationSegments(msg.content, msg.visual)}
/>
```

No lesson logic, Tutor Max calls, curriculum logic, or progression logic was
touched.

## 5. VisualCard wiring (Task 4)

`VisualCard` now branches on `useNarrationMode = hasNarration && narrationTimeline.segments.length > 0`:

- **Narration mode** (new): owns a local `NarrationProgress` (Sprint T type),
  auto-advances it one segment at a time via `setTimeout` (interval scaled
  by `narrationSpeed`), derives `narrationStep` via `synchronizedPlayback.ts`'s
  `visualStepForSegment()`, and feeds it to the *existing*
  `useTeachingPlayback({ mode: 'narration', narrationStep, speed })` call —
  the same hook, same call site, same contract Sprint T already built and
  left unused in production.
- **Timer mode** (unchanged): `useNarrationMode === false` → identical
  `useTeachingPlayback({ autoPlay, speed })` call as before Sprint U.
- Both modes share a single `useTeachingPlayback` call site (rules-of-hooks
  safe — the hook is always called, only its options object changes) and a
  single `VisualPlaybackControls` render, switched via a small `controls`
  object so the UI is identical in shape for both modes.

## 6. Demonstration results (Task 7)

Ran `extractNarrationSegments` → `buildSyncPlan` → segment-by-segment
`advance()`/`visualStepForSegment()` against all 5 requested production
visuals, using realistic multi-sentence tutor explanations:

```
=== number_line (stepCount=4, segments=4, status=ok) ===
Narration Segment 1 -> Visual Step 1
Narration Segment 2 -> Visual Step 2
Narration Segment 3 -> Visual Step 3
Narration Segment 4 -> Visual Step 4

=== fraction_bar (stepCount=4, segments=4, status=ok) ===
Segment 1→Step 1, 2→2, 3→3, 4→4

=== coordinate_plane (stepCount=5, segments=5, status=ok) ===
Segment 1→Step 1 ... 5→5

=== water_cycle (stepCount=6, segments=6, status=ok) ===
Segment 1→Step 1 ... 6→6

=== food_chain (stepCount=5, segments=5, status=ok) ===
Segment 1→Step 1 ... 5→5
```

Every sample produced `status: 'ok'` from `buildSyncPlan` (full coverage, no
overflow) — narration segment N maps to visual step N for all 5 visuals,
confirming the wiring is correct end-to-end through the *unmodified* Sprint
S sync layer. (Demo script was run via `npx tsx` against the real library
files and discarded — not part of the committed diff.)

## 7. Replay behavior (Task 5)

- **Timer mode**: unchanged — `playback.replay()` still zeroes the rAF
  elapsed clock and restarts from `revealStep = 0`.
- **Narration mode**: `onReplay` calls `synchronizedPlayback.ts`'s `reset()`
  (sets `currentSegment` back to 0) and resumes auto-advance
  (`setNarrationPlaying(true)`), which re-triggers the segment timer from
  segment 0 → `narrationStep` 0 → `revealStep` 0, then ticks forward exactly
  as on first play. Verified by code-path inspection: `reset()` is a pure
  function from the unmodified `synchronizedPlayback.ts`; no new state
  machine was introduced beyond the `useState<NarrationProgress>` wrapper.

## 8. Speed behavior (Task 6)

- **Timer mode**: unchanged — speed scales `elapsedRef` accumulation inside
  `useTeachingPlayback`'s own rAF loop, exactly as before.
- **Narration mode**: `narrationSpeed` scales the `setTimeout` interval
  (`NARRATION_STEP_DURATION_MS / narrationSpeed`) that advances
  `NarrationProgress`, entirely inside `VisualCard` — `useTeachingPlayback`'s
  timer engine is never invoked in this mode (its narration-mode effect only
  reacts to `narrationStep` changes, it does not run its own clock). Changing
  speed mid-playback takes effect on the next scheduled tick because the
  effect's dependency array includes `narrationSpeed`, so the pending
  `setTimeout` is cleared and rescheduled at the new interval immediately.

## 9. Production safety review (Task 8)

Confirmed unchanged — `git diff --name-only` shows only `LessonScreen.tsx`
and `VisualCard.tsx` were modified (plus new files: `narrationSource.ts` and
this pair of docs):

- Tutor Max prompts — untouched (`/api/learn/chat/route.ts` not modified).
- AI routes — untouched (`routeAI`, `planVisualTeaching`, `detectVisual`
  all unmodified).
- Educational Intelligence Sprints 1–11 — untouched (no EI file in the diff).
- XP, Grading, Assessments, Curriculum — untouched (no related file in the
  diff).
- Lesson synchronization fix (`62c6444`) — untouched; this sprint adds a
  narration layer purely client-side inside `VisualCard`, with no interaction
  with session/message persistence.
- `teachingTimeline.ts`, `useTeachingPlayback`'s timer engine,
  `lessonSegments.ts`, `tutorVisualSync.ts`, `narrationProgress.ts`,
  `synchronizedPlayback.ts`, and every `VisualComponent` renderer
  (`NumberLine`, `FractionBar`, etc.) — all reused as-is, zero line changes.

## 10. Validation (Task 9)

```
$ npx prisma generate     → Generated Prisma Client (v6.19.3) — OK
$ npx tsc --noEmit        → 0 errors
$ npm run build           → succeeded, all routes compiled
                             (/learn: 30.4 kB, 208 kB First Load JS — unchanged route count)
```

Sprint R.1 (timer-mode visuals with no narration) is preserved — the
`useNarrationMode` gate defaults to `false` whenever `hasNarration` is
falsy or `narrationTimeline` has zero segments, which is exactly the
pre-Sprint-U render path. Sprint S (`buildSyncPlan`/`narrationForStep`) and
Sprint T (`narrationProgress`/`synchronizedPlayback`/`useTeachingPlayback`'s
narration mode) are both consumed unmodified.

## 11. Roadmap (not built — explicitly out of scope this sprint)

- True TTS-boundary-synced narration (driving `narrationStep` from actual
  speech timing/word-boundary events from `src/lib/tts.ts`'s
  `speakText`/`handleSpeak`, instead of a fixed-interval auto-advance) would
  make the sync feel tighter for users who use the existing "Play" (TTS)
  button, but requires touching the TTS layer — out of scope for this sprint
  ("DO NOT redesign visual engines").
- Per-visual-type custom step timing (e.g. a 6-step water cycle pacing
  narration differently than a 3-step solar system) is possible by tuning
  `NARRATION_STEP_DURATION_MS` per type, but the brief asked only for
  correct 1:1 segment→step sync, which is delivered.
- Sprint V is explicitly not started, per instruction.

---

**STOP AFTER REPORT** — no Sprint V work started. Commit only after this
report's completion, and only on explicit instruction (per this session's
established pattern of not committing/pushing without being asked).
