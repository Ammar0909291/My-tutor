# Mathematics Production Reachability Audit

Traces the full pipeline (Tutor Response → `detectVisual()` → `VISUAL:` tag →
`parseVisualTag()` → `response.visual` → `LessonScreen` → `VisualCard` → `ThreeDVisual` →
narration playback → controls) for the five Mathematics 3D Foundation visuals, mirroring the
Quantum/Classical Mechanics/Chemistry Production Integration audits.

## Pipeline trace

1. **`detectVisual({ subjectSlug, chapterTitle, lessonTitle })`** (`src/lib/school/visuals/detectVisual.ts`)
   — given the lesson's subject slug, returns a `VisualType` or `null`. This is the entry point;
   if it never returns a Mathematics `three_*` type, nothing downstream can be reached.
2. The returned `VisualType` feeds **`buildVisualsSystemBlock(availableVisual)`**, which tells the
   tutor model a visual is available and to emit `VISUAL: <type>` at the end of its response when
   it genuinely helps.
3. The tutor's raw response text is parsed by **`parseVisualTag(text)`**, which extracts the
   `VISUAL: <type>` tag and validates it against a hardcoded `VALID` Set — a tag for a type not in
   `VALID` is silently dropped (`visual: null`).
4. The validated `VisualType` becomes **`response.visual`**, consumed by **`LessonScreen`**, which
   renders **`VisualCard`** for that type.
5. `VisualCard` looks up `VISUAL_STEP_COUNTS[type]` and dispatches to the matching component via
   its `switch`, rendering it inside **`ThreeDVisual`** with the existing narration-synced
   `revealStep` playback and `VisualPlaybackControls`.

## Was Mathematics reachable before this sprint?

**No.** Found two blockers, both in `detectVisual.ts`:

- **Blocker 1 — `detectVisual()`'s `'mathematics'` branch only called `MATH_RULES`.** `MATH_RULES`
  contains exclusively 2D types (`fraction_bar`, `percentage_grid`, `coordinate_plane`,
  `number_line`, `geometry_shape`). No `MATHEMATICS_3D_RULES` table existed, so `detectVisual()`
  could never return any of the five `three_*` Mathematics types — step 1 of the pipeline never
  produces them, so steps 2–5 are unreachable for these visuals via natural-language lesson
  detection.
- **Blocker 2 — `parseVisualTag()`'s `VALID` Set and `buildVisualsSystemBlock()`'s `all` list
  omitted the five Mathematics `three_*` types.** Even if a tutor response somehow emitted
  `VISUAL: three_coordinate_system` verbatim (e.g. copied from documentation), `parseVisualTag`
  would reject it as not in `VALID`, and the system prompt never advertised these types as
  available, so the model would never naturally emit the tag in the first place.

`VisualCard`/`VISUAL_STEP_COUNTS`/`visualTypes.ts` registration (done in the Mathematics 3D
Foundation Sprint) was already correct — steps 4–5 of the pipeline work today once a valid
`response.visual` reaches them. The blockers are entirely in `detectVisual.ts` (steps 1–3).

## Verdict

Two additive, surgical changes in `detectVisual.ts` make all five Mathematics 3D visuals
production-reachable: (1) a `MATHEMATICS_3D_RULES` table checked before `MATH_RULES` under the
`'mathematics'` branch — exactly the two-tier pattern already proven by
`quantum_physics`/`physics`/`chemistry`; (2) adding the five new types to `parseVisualTag`'s
`VALID` Set and `buildVisualsSystemBlock`'s `all` list. No other file in the pipeline requires
modification.
