# Sprint U Divergence Reconciliation Audit

Read-only analysis. No commits, pushes, rebases, merges, or cherry-picks were
performed. Compares local `d406655` against origin `fe03d6a`, both built from
common parent `e6895f0`.

## Task 1 — Side-by-side diff

### `src/components/learn/LessonScreen.tsx`

| | Local (`d406655`) | Origin (`fe03d6a`) |
|---|---|---|
| Import added | `extractNarrationSegments` from `narrationSource.ts` | `getAuthoredNarration` from `lessonNarration.ts` |
| `VisualCard` call | `hasNarration` (always `true`) + `narrationTimeline={extractNarrationSegments(msg.content, msg.visual)}` — built **from the real tutor response text**, every render | `hasNarration={getAuthoredNarration(msg.visual) != null}` — true only if a **hardcoded developer-authored lookup** has an entry for that visual type; `msg.content` (the real explanation) is never read |
| `narrationStep` passed? | N/A — local's `VisualCard` derives its own step internally from the timeline | **Never passed** — no value, anywhere in `LessonScreen`, supplies a live `narrationStep` |
| Comment in diff | — | Origin's own comment: *"production has no live per-segment narration step yet (Sprint V: TTS/streaming driver), so VisualCard falls back to timer mode — identical to Sprint R.1."* |

**Behavioral difference:** local derives narration from what the tutor
actually said; origin uses a fixed, hand-written script unrelated to the
specific lesson response, and by its own admission never actually drives the
visual with it in production.

### `src/components/school/visuals/VisualCard.tsx`

| | Local (`d406655`) | Origin (`fe03d6a`) |
|---|---|---|
| New props | `hasNarration?: boolean`, `narrationTimeline?: LessonTimeline` | `hasNarration?: boolean`, `narrationStep?: number` |
| Narration-mode gate | `useNarrationMode = hasNarration && narrationTimeline.segments.length > 0` | `narrationActive = hasNarration && typeof narrationStep === 'number'` |
| Who drives `narrationStep`? | **`VisualCard` itself** — owns a `NarrationProgress` state, auto-advances it on a `setTimeout` scaled by speed, derives `narrationStep` via `visualStepForSegment()` | **Nobody** — `VisualCard` expects the *caller* to supply `narrationStep`; no caller (in this commit) ever does |
| Playback controls in narration mode | Rendered, wired to local progress (`play`/`pause`/`replay`/`speed` all functional) | `VisualPlaybackControls` is **hidden entirely** (`{!narrationActive && <VisualPlaybackControls .../>}`) — but since `narrationActive` is always false in production (no `narrationStep` ever supplied), this branch never triggers either |
| New library file | `narrationSource.ts` — pure, derives segments from arbitrary text | `lessonNarration.ts` — pure, but narration content is a static per-visual-type dictionary, not derived from any text |

**Behavioral difference:** local's `VisualCard` is a complete, self-contained
narration engine — given a timeline, it plays through it unattended. Origin's
`VisualCard` only added a dormant *capability* (accepts a step from outside)
without ever feeding it one in production; functionally, origin's
`VisualCard` renders identically to pre-Sprint-U Sprint R.1 in every real
lesson, because `hasNarration` is checked but `narrationStep` is never set.

### Other files (origin only — local touches none of these)

- `src/lib/visuals/lessonNarration.ts` (new) — static per-visual-type
  narration script, not connected to any real lesson content.
- `src/components/school/visuals/LiveNarrationPlaybackViewer.tsx` (new) —
  dev-only demo component, mounted only in `/dev/visual-demo`
  (`VisualDemo.tsx` edit), the same pattern as the earlier
  `TutorVisualSyncViewer`/`NarrationDrivenPlaybackViewer` dev panels. It
  demonstrates narration mode working, but outside production.
- `docs/LIVE_NARRATION_VISUAL_INTEGRATION_AUDIT.md`,
  `docs/VISUAL_LEARNING_SPRINT_U_REPORT.md` — origin's own audit/report
  pair (name-collides with local's report of the same name; not the same
  content).

## Task 2 — Requirement compliance

Brief requirement → Local (`d406655`) → Origin (`fe03d6a`) → Pass/Fail

| Requirement | Local | Origin | Verdict |
|---|---|---|---|
| Reuse existing infra (no rebuilds of teachingTimeline/useTeachingPlayback timer/lessonSegments/tutorVisualSync/narrationProgress/synchronizedPlayback) | Reuses all, zero modifications | Reuses all, zero modifications | Both PASS |
| Task 1: Audit doc tracing real production path | `docs/VISUAL_LEARNING_SPRINT_U_AUDIT.md` | `docs/LIVE_NARRATION_VISUAL_INTEGRATION_AUDIT.md` | Both PASS (doc exists) |
| Task 2: Narration source extracted from **Tutor Max lesson responses** (pure, deterministic, no AI, no DB writes) | `narrationSource.ts` reads `msg.content` (the actual tutor response) and splits it | `lessonNarration.ts` is a **static hardcoded script**, never reads any lesson response | **Local PASS / Origin FAIL** — origin's own file header says *"Narration text is developer-authored... never produced here at runtime,"* which is honest but does not satisfy "extraction... from Tutor Max lesson responses" |
| Task 3: LessonScreen wiring, additive only, `hasNarration` + `narrationTimeline`/equivalent passed to `VisualCard` | Passes `hasNarration` (true) + a real `narrationTimeline` every render | Passes `hasNarration` (conditionally) but **never** passes a timeline or step | **Local PASS / Origin PARTIAL** — wiring exists but is inert by the commit's own comment |
| Task 4: VisualCard — IF narrationTimeline exists, use narration mode driven by `synchronizedPlayback`; ELSE timer mode unchanged | Implemented exactly: builds `NarrationProgress`, advances via `synchronizedPlayback.ts`'s `advance()`, derives step via `visualStepForSegment()` | Accepts a `narrationStep` prop and would use it *if* supplied, but no caller supplies it — `synchronizedPlayback.ts` functions are imported in the dev viewer, not in `VisualCard` itself | **Local PASS / Origin FAIL** (in production) — origin's `VisualCard` doesn't call any Sprint T `synchronizedPlayback` function at all; that logic lives only in the dev-only `LiveNarrationPlaybackViewer` |
| Task 5: Replay resets narration progress + revealStep; timer mode unchanged | Implemented (`onReplay` → `reset()` + resume) | N/A in production (narration mode never active); dev viewer has its own replay, separately | **Local PASS / Origin N/A (not reachable in prod)** |
| Task 6: Speed behavior — narration mode speed doesn't break sync | Implemented (`narrationSpeed` scales the auto-advance interval) | N/A in production | **Local PASS / Origin N/A** |
| Task 7: Demonstrate Number Line / Fraction Bar / Coordinate Plane / Water Cycle / Food Chain — narration segment N → visual step N | Demonstrated via script run against the real `narrationSource.ts` + `tutorVisualSync.ts`, all 5 types, `status: 'ok'` | Demonstrated only via the dev-only `LiveNarrationPlaybackViewer`, using the same static `AUTHORED_NARRATION` lines as the dev viewers already had pre-Sprint-U | **Local PASS (production-path demo) / Origin PASS (dev-path demo only)** |
| Task 8: Production safety — Tutor Max/AI/EI/XP/grading/curriculum/`62c6444` unaffected | Confirmed via diff scope (2 files) | Confirmed via diff scope (6 files, all visuals-only) | Both PASS |
| Task 9: Validation — `tsc`/`build` clean | Confirmed (`0 errors`, build succeeded) | Not independently re-verified in this audit (read-only; no build was run against `fe03d6a`'s tree in this session) — origin's own report presumably claims this | Local confirmed PASS; Origin unverified here |
| Goal: *"The visual should advance as the explanation advances"* | **Yes — this is the central claim and it is true for d406655** | **No — origin's own commit message documents that this does not happen in production yet**, deferring it to a hypothetical future "Sprint V" | **Local PASS / Origin FAIL on the sprint's stated goal** |

## Task 3 — Functional analysis

**Does local `d406655` achieve: Tutor Response → Narration Segments →
VisualCard → Narration Mode → Reveal Step?**

**YES.** Evidence:
- `LessonScreen.tsx`: `narrationTimeline={extractNarrationSegments(msg.content, msg.visual)}` — `msg.content` is the literal tutor response text (confirmed in the original audit: `ChatMsg.content`, populated from `/api/learn/chat`'s `text` field). This is a **live, per-message** computation, not a static lookup.
- `VisualCard.tsx`: `useNarrationMode` becomes `true` whenever that timeline has ≥1 segment (true for any visual-bearing tutor message with non-empty text — effectively always). It then builds `NarrationProgress`, auto-advances it, computes `narrationStep = visualStepForSegment(progress, stepCount)`, and feeds it into the **existing, unmodified** `useTeachingPlayback({ mode: 'narration', narrationStep })`. `revealStep` comes out of that hook and is passed to `VisualComponent`.
- End-to-end: a real tutor explanation, in production, produces a different `revealStep` sequence than before, paced by the number of sentences it contains, not a fixed timer. This was independently demonstrated in the prior Sprint U report (5 visual types, `buildSyncPlan` status `ok` for all).

**Does origin `fe03d6a` achieve the same chain in production?**

**NO.** Evidence:
- `LessonScreen.tsx` never computes or passes a `narrationStep` to `VisualCard` — grep of the diff confirms `narrationStep` does not appear anywhere in `LessonScreen.tsx`'s changes.
- `VisualCard.tsx`'s gate is `narrationActive = hasNarration && typeof narrationStep === 'number'`. Since `narrationStep` is always `undefined` from the only production call site, `narrationActive` is always `false` in production, regardless of `hasNarration`.
- Therefore `useTeachingPlayback` is always called with `{ autoPlay, speed }` (timer mode) in production — **identical to pre-Sprint-U Sprint R.1 behavior**. The commit's own message confirms this: *"production has no live per-segment narration step yet... VisualCard falls back to timer mode — identical to Sprint R.1."*
- The narration-mode code path (and the Sprint T `synchronizedPlayback` functions) is only exercised by `LiveNarrationPlaybackViewer.tsx`, a dev-only component mounted at `/dev/visual-demo` — not reachable by a real lesson.

## Task 4 — Safety analysis

- **Less risk:** Origin is technically lower-risk in the narrow sense that it changes production *rendering* behavior in zero real lessons today (narration mode is dead code in prod) — there is nothing to regress because nothing new actually runs. Local changes real runtime behavior (every visual-bearing message now narrates instead of timer-plays), which is a bigger behavioral surface to verify, though it was validated (`tsc`, `build`, and a 5-visual demonstration script all clean).
- **More complete:** Local is more complete — it is the only one of the two that satisfies the brief's actual goal ("the visual should advance as the explanation advances"). Origin explicitly defers that to a future sprint.
- **Closer to the brief:** Local. The brief's Task 2 specifically asked to extract narration from "Tutor Max lesson responses" (i.e., the real `msg.content`); origin's `lessonNarration.ts` extracts nothing — it ships a static, hand-authored script disconnected from the actual response, which is closer to what Sprint S/T's dev viewers already had before Sprint U started.
- **Preserves Sprint R.1/S/T behavior better:** Both preserve Sprint R.1 timer mode exactly when narration is absent (verified by code inspection on both sides) and both reuse Sprint S/T's infrastructure functions without modification. On this axis they're roughly equal, though local additionally proves Sprint T's `synchronizedPlayback` functions actually work end-to-end in a non-dev-viewer context, which origin never demonstrates outside `/dev/visual-demo`.

## Task 5 — Recommended resolution (NOT executed)

**OPTION A — Keep `d406655` (local).**

Reasoning:
1. Origin's `fe03d6a` does not meet the sprint's own stated goal. Its commit
   message is explicit that narration mode is wired but inert in production
   — this is, by origin's own admission, not yet "Sprint U done," but
   "Sprint U scaffolding, deferred to Sprint V."
2. Origin's narration *source* (`lessonNarration.ts`'s `AUTHORED_NARRATION`)
   is a static script unrelated to the real lesson content. Even if its
   `narrationStep` plumbing were later completed, the narration text shown
   would not match what the tutor actually said for that specific response
   — a correctness problem, not just an incompleteness one.
3. Local's `d406655` is the only candidate that is independently
   demonstrable end-to-end against real `msg.content` text, with all 9
   numbered Sprint U tasks satisfied and validated (`tsc`/`build` clean).
4. Origin's two additive-only artifacts that are genuinely good ideas —
   `LiveNarrationPlaybackViewer.tsx` (a nicer dev-tool than this session
   produced) — are dev-only and not in conflict with keeping `d406655` as
   canonical; they could be cherry-picked separately later if desired, since
   they touch no production file outside `VisualDemo.tsx` (which local does
   not touch at all).

Option B (keep origin) is not recommended: it would mean officially
"completing" Sprint U with a commit that does not narrate anything in
production, contradicting the brief's explicit goal and requiring a Sprint V
just to finish what Sprint U was supposed to deliver.

Option C (merge parts of both) is not necessary: there is no production
logic in `fe03d6a` worth preserving once `d406655`'s superset is in place —
`fe03d6a`'s production wiring is strictly less capable than `d406655`'s.
The one non-overlapping asset (`LiveNarrationPlaybackViewer.tsx`, dev-only)
is optional polish, not a Sprint U requirement, and could be added later
without conflict.

## Task 6 — Final verdict

```
CANONICAL SPRINT U: d406655 (local)

Reason: d406655 is the only one of the two commits that actually
implements the sprint's stated goal — "the visual should advance as
the explanation advances" — in production. It derives narration
segments from the real tutor response (msg.content) via
narrationSource.ts, drives a live NarrationProgress inside VisualCard,
and feeds a real, per-message narrationStep into the existing,
unmodified useTeachingPlayback narration-mode contract. This was
independently demonstrated against all 5 example visual types with
buildSyncPlan reporting full ('ok') segment-to-step coverage, and
validated clean via npx tsc --noEmit and npm run build.

fe03d6a wires the same prop surface but never supplies a live
narrationStep from LessonScreen, so its own commit message concedes
narration mode "falls back to timer mode — identical to Sprint R.1"
in every real lesson today. Its narration text source
(lessonNarration.ts's AUTHORED_NARRATION) is also a static,
hand-written script disconnected from the actual tutor response,
which does not satisfy the brief's Task 2 requirement to extract
narration "from Tutor Max lesson responses." fe03d6a is better
characterized as Sprint U scaffolding (explicitly deferring
completion to a hypothetical "Sprint V") than as Sprint U itself.

Evidence: see Task 1 (diff comparison), Task 2 (requirement table),
and Task 3 (functional YES/NO with code citations) above.
```

This is a documentation-only recommendation. No git state was changed to
produce it — `git diff`, `git show`, and `git log` against the two existing
commit objects were the only operations performed.
