# Visual Learning Sprint U — Live Narration → Visual Playback Integration · Audit (Task 1)

**Status: audit only. Wiring existing systems only — no Tutor Max change, no AI/prompt change, no
curriculum change, no new intelligence, no animation rebuild. Timer mode (Sprint R.1) remains the
default and is unchanged.**

## Goal

Connect the Sprint S (synchronization) + Sprint T (narration-driven playback) infrastructure into the
real lesson so narration can drive visual progression — with a safe timer fallback when no live
narration step exists.

## Pipeline trace: Tutor Max → learn/chat → LessonScreen → VisualCard → Sync (S) → Narration Playback (T)

| Stage | File | Detail |
|---|---|---|
| Tutor response | `learn/chat/route.ts` | returns `{ text, visual?: VisualType }` (full message at once — not segmented) |
| LessonScreen | `LessonScreen.tsx:~2307` | renders `<VisualCard type={msg.visual} autoPlay speed={speed} />` below the bubble |
| VisualCard | `school/visuals/VisualCard.tsx` | `useTeachingPlayback(stepCount, { autoPlay, speed })` (timer) |
| Sync (S) | `lessonSegments.ts` / `tutorVisualSync.ts` | segment↔step `SyncPlan` (pure) |
| Narration playback (T) | `useTeachingPlayback` narration mode + `synchronizedPlayback.ts` | drives `revealStep` from `narrationStep` |

## Safest production insertion point

**`VisualCard` props + the `LessonScreen` render site.** VisualCard gains optional `hasNarration` +
`narrationStep`; narration mode activates **only when both are present**, otherwise timer mode (Sprint
R.1) runs unchanged. LessonScreen passes the narration-source presence additively. No message-rendering
or chat-architecture rewrite; no Tutor Max change.

## Narration ownership

Narration text is **developer-authored** per visual type (`lessonNarration.ts` `AUTHORED_NARRATION`),
NOT AI-generated and NOT from Tutor Max prompts. The tutor message in this codebase arrives as one
block (not segmented), so there is **no live per-segment narration step in production yet** — that
driver (TTS boundary / streamed segments) is Sprint V. Until then, LessonScreen supplies the narration
*source* but no live *step*, so VisualCard falls back to timer mode.

## Replay / speed / fallback / mobile

- **Replay:** in timer mode, `VisualPlaybackControls` replay works as in Sprint R.1; in narration mode
  replay is owned by the narration driver (reset narration → step 0). Controls are hidden in narration
  mode (timer concepts).
- **Speed:** timer mode keeps the 0.5×–1.5× selector; narration mode is paced by narration, so speed is
  inert (no timer).
- **Fallback (Task 5):** narration mode requires BOTH `hasNarration` and a numeric `narrationStep`.
  Production currently supplies only the source ⇒ timer mode ⇒ **identical to Sprint R.1**, zero
  regression.
- **Mobile:** narration mode runs no rAF loop (lighter than timer); the dev panel is dev-only. No new
  listeners/timers in production.

## Reuse decision (no rebuilds)

Reuses `useTeachingPlayback` (narration mode from Sprint T), `tutorVisualSync`/`lessonSegments` (Sprint
S), `synchronizedPlayback` (Sprint T), and the existing renderers. New artifacts only:
`lessonNarration.ts` (source model + authored text) and `LiveNarrationPlaybackViewer.tsx` (dev-only).
VisualCard/LessonScreen get additive, backward-compatible wiring.

## Insertion points (for implementation)

- `src/lib/visuals/lessonNarration.ts` — narration source types + authored text + sync adapter.
- `src/components/school/visuals/VisualCard.tsx` — optional `hasNarration`/`narrationStep`, narration mode.
- `src/components/learn/LessonScreen.tsx` — pass `hasNarration` additively (timer fallback active).
- `src/components/school/visuals/LiveNarrationPlaybackViewer.tsx` — dev-only verification panel.
