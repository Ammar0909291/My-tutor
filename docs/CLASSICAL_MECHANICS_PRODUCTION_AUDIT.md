# Classical Mechanics Production Reachability Audit

Traces the full pipeline — `Tutor Response → detectVisual() → VISUAL tag generation →
parseVisualTag() → response.visual → LessonScreen → VisualCard → ThreeDVisual → narration
playback → playback controls` — for the five Classical Mechanics 3D `VisualType`s, before any
fix in this sprint.

## Trace and findings

| Stage | Status (before fix) | Finding |
|---|---|---|
| `VisualType` union / `VISUAL_META` | OK | All five types (`three_projectile_motion`, `three_newton_forces`, `three_momentum_collision`, `three_circular_motion`, `three_pendulum_motion`) already registered (Classical Mechanics 3D Foundation Sprint). |
| `VisualCard` switch / `VISUAL_STEP_COUNTS` | OK | All five already wired (Foundation Sprint, Task 9). |
| `detectVisual()` — subject gate (`VISUAL_SUBJECTS`) | **BLOCKER** | `VISUAL_SUBJECTS` was `{'mathematics', 'science', 'math', 'quantum_physics'}` — it did **not** include `'physics'`. Classical Mechanics lessons live in the Subject Library under the `'physics'` slug (`subjectCatalog.ts`'s `PHYSICS_TREE`), a distinct slug from `'quantum_physics'`. Because `detectVisual()`'s first line is `if (!VISUAL_SUBJECTS.has(opts.subjectSlug)) return null`, **every** call for a Physics library lesson (any topic, not just mechanics) returned `null` before reaching any rule table. |
| `detectVisual()` — rule table | **BLOCKER** | Even if the subject gate passed, no branch existed for `subjectSlug === 'physics'` — only `'mathematics'`, `'science'`, and `'quantum_physics'` had branches. No `MECHANICS_3D_RULES` table existed. |
| `parseVisualTag()` — `VALID` set | **BLOCKER** | The five mechanics `VisualType`s were absent from `VALID`. Even if the AI tutor emitted `VISUAL: three_projectile_motion` (e.g. copying the pattern from a `buildVisualsSystemBlock()` listing), `parseVisualTag()` would silently discard it as an unrecognized candidate. |
| `buildVisualsSystemBlock()` — `all` list | **BLOCKER** | The five types were absent from the `Available types: ...` list shown to the tutor model, so the model would never know these visual options existed even when `availableVisual` happened to be one of them. |
| `response.visual` → `LessonScreen` → `VisualCard` | OK | `LessonScreen`'s existing visual-tag wiring is generic over `VisualType` (no quantum-specific or mechanics-specific code) — confirmed unaffected once a valid `VisualType` reaches it. |
| `VisualCard` → `ThreeDVisual` | OK | Each mechanics component accepts the same `{ revealStep?: number }` contract and mounts inside the unmodified `ThreeDVisual` host, identical to every quantum 3D visual (confirmed by code inspection — `ProjectileMotion3D.tsx` etc.). |
| Narration playback (`visualStepForSegment`, `narrationTimeline`, `synchronizedPlayback`) | OK | These operate purely on `stepCount` (from `VISUAL_STEP_COUNTS`) and `VisualType`, with zero per-type special-casing — already proven generic across every SVG and 3D visual type. No mechanics-specific issue possible. |
| Playback controls (Play/Pause/Replay/Speed) | OK | `VisualPlaybackControls` reads only `controls.*` from `useTeachingPlayback`/narration-mode state, with no `VisualType` branching. |

## Verdict (before fix)

**Not production reachable.** All five Classical Mechanics 3D visuals were fully built and wired
into the rendering pipeline (`VisualCard`, `ThreeDVisual`, narration playback) but **unreachable
from any real lesson**, because:
1. `detectVisual()`'s subject gate excluded `'physics'` entirely.
2. No mechanics rule table existed even if the gate were passed.
3. `parseVisualTag()` would reject the tag even if the AI model emitted it correctly.
4. The model was never told these types exist (`buildVisualsSystemBlock()`'s `all` list omitted them).

This is the same class of blocker the Production Integration Sprint diagnosed and fixed for
Quantum Physics's `three_*` types before that subject's 3D visuals went live — Task 2/3 of this
sprint apply the identical fix pattern.

## Fixes applied (this sprint, see Tasks 2–3)

- Added `'physics'` to `VISUAL_SUBJECTS`.
- Added `MECHANICS_3D_RULES` (5 keyword-mapped rules) and a `subjectSlug === 'physics'` branch in
  `detectVisual()`, checked before falling back to the existing `SCIENCE_RULES` 2D table — the
  same two-tier pattern (`3D_RULES ?? 2D_RULES`) already used for `quantum_physics`.
- Added the five mechanics types to `parseVisualTag()`'s `VALID` set.
- Added the five mechanics types to `buildVisualsSystemBlock()`'s `all` list.

No change to `VisualCard.tsx`, `ThreeDVisual.tsx`, narration/playback infrastructure, or any
mechanics simulation component — all were already correct.
