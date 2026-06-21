# Chemistry Production Reachability Audit

Traces the full pipeline — `Tutor Response → detectVisual() → VISUAL tag generation →
parseVisualTag() → response.visual → LessonScreen → VisualCard → ThreeDVisual → narration
playback → playback controls` — for the five Chemistry 3D `VisualType`s, before any fix in this
sprint.

## Trace and findings

| Stage | Status (before fix) | Finding |
|---|---|---|
| `VisualType` union / `VISUAL_META` | OK | All five types (`three_atomic_structure`, `three_electron_shells`, `three_molecular_shapes`, `three_bond_formation`, `three_crystal_lattice`) already registered (Chemistry 3D Foundation Sprint). |
| `VisualCard` switch / `VISUAL_STEP_COUNTS` | OK | All five already wired (Foundation Sprint, Task 8). |
| `detectVisual()` — subject gate (`VISUAL_SUBJECTS`) | **BLOCKER** | `VISUAL_SUBJECTS` was `{'mathematics', 'science', 'math', 'quantum_physics', 'physics'}` — it did **not** include `'chemistry'`. Chemistry lessons live in the Subject Library under the dedicated `'chemistry'` slug (`subjectCatalog.ts`: `{ slug: 'chemistry', ..., modules: CHEMISTRY_TREE }`), distinct from the generic `'science'` slug. Because `detectVisual()`'s first line is `if (!VISUAL_SUBJECTS.has(opts.subjectSlug)) return null`, **every** call for a Chemistry library lesson returned `null` before reaching any rule table — the exact same class of blocker found for `'physics'` in the Classical Mechanics Production sprint. |
| `detectVisual()` — rule table | **BLOCKER** | Even if the subject gate passed, no branch existed for `subjectSlug === 'chemistry'` — only `'mathematics'`, `'science'`, `'quantum_physics'`, and `'physics'` had branches. No `CHEMISTRY_3D_RULES` table existed. |
| `parseVisualTag()` — `VALID` set | **BLOCKER** | The five Chemistry `VisualType`s were absent from `VALID`. Even if the AI tutor emitted `VISUAL: three_atomic_structure`, `parseVisualTag()` would silently discard it as unrecognized. |
| `buildVisualsSystemBlock()` — `all` list | **BLOCKER** | The five types were absent from the `Available types: ...` list shown to the tutor model, so the model would never know these visual options existed. |
| `response.visual` → `LessonScreen` → `VisualCard` | OK | `LessonScreen`'s visual-tag wiring is generic over `VisualType` — unaffected once a valid `VisualType` reaches it. |
| `VisualCard` → `ThreeDVisual` | OK | Each Chemistry component accepts the same `{ revealStep?: number }` contract and mounts inside the unmodified `ThreeDVisual` host, identical to every quantum/mechanics 3D visual. |
| Narration playback (`visualStepForSegment`, `narrationTimeline`, `synchronizedPlayback`) | OK | Operates purely on `stepCount` (from `VISUAL_STEP_COUNTS`) and narration progress, with zero per-type special-casing. |
| Playback controls (Play/Pause/Replay/Speed) | OK | `VisualPlaybackControls` reads only `controls.*`, with no `VisualType` branching. |

## Verdict (before fix)

**Not production reachable.** All five Chemistry 3D visuals were fully built and wired into the
rendering pipeline (`VisualCard`, `ThreeDVisual`, narration playback) but **unreachable from any
real lesson**, because:
1. `detectVisual()`'s subject gate excluded `'chemistry'` entirely.
2. No Chemistry rule table existed even if the gate were passed.
3. `parseVisualTag()` would reject the tag even if the AI model emitted it correctly.
4. The model was never told these types exist (`buildVisualsSystemBlock()`'s `all` list omitted them).

This is the same class of blocker the Classical Mechanics Production Learning Integration Sprint
diagnosed and fixed for the `'physics'` slug — Task 2/3 of this sprint apply the identical fix
pattern for `'chemistry'`.

## Fixes applied (this sprint, see Tasks 2–3)

- Added `'chemistry'` to `VISUAL_SUBJECTS`.
- Added `CHEMISTRY_3D_RULES` (5 keyword-mapped rules) and a `subjectSlug === 'chemistry'` branch in
  `detectVisual()`, checked before falling back to `SCIENCE_RULES` (the same generic 2D science
  table already used as the fallback for `'physics'`) — the same two-tier pattern
  (`3D_RULES ?? 2D_RULES`) already used for `quantum_physics` and `physics`.
- Added the five Chemistry types to `parseVisualTag()`'s `VALID` set.
- Added the five Chemistry types to `buildVisualsSystemBlock()`'s `all` list.

No change to `VisualCard.tsx`, `ThreeDVisual.tsx`, narration/playback infrastructure, any Chemistry
simulation component, or any Quantum/Mechanics rule table.
