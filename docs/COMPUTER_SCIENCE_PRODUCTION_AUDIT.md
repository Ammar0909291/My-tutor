# Computer Science Production Reachability Audit

Traces the full pipeline (Tutor Response → `detectVisual()` → `VISUAL:` tag → `parseVisualTag()` →
`response.visual` → `LessonScreen` → `VisualCard` → `ThreeDVisual` → narration playback → controls)
for the five Computer Science 3D Foundation visuals, mirroring the Quantum / Classical Mechanics /
Chemistry / Mathematics Production Integration audits.

## Registered Computer Science visual types (from the Foundation sprint)

`three_computer_architecture`, `three_memory_storage`, `three_network_packet_flow`,
`three_data_structure`, `three_algorithm_visualization`.

> Note: the sprint brief's Task 2 lists `three_data_structure_visualization` and
> `three_algorithm_visualization` as the mapping targets. The type registered in the Foundation
> sprint (`visualTypes.ts` / `VisualCard` / `VISUAL_STEP_COUNTS`) is **`three_data_structure`**, not
> `three_data_structure_visualization`. To keep the pipeline consistent with what is actually
> registered and rendered, this sprint maps to the real registered type `three_data_structure`.
> `three_algorithm_visualization` matches the brief exactly.

## Pipeline trace

1. **`detectVisual({ subjectSlug, chapterTitle, lessonTitle })`** — given the lesson's subject slug,
   returns a `VisualType` or `null`. Entry point; if it never returns a CS `three_*` type, nothing
   downstream can be reached.
2. The returned `VisualType` feeds **`buildVisualsSystemBlock(availableVisual)`**, which tells the
   tutor model a visual is available and lists the advertised types.
3. The tutor's raw response is parsed by **`parseVisualTag(text)`**, which extracts `VISUAL: <type>`
   and validates it against a hardcoded `VALID` Set — a tag for a type not in `VALID` is dropped.
4. The validated `VisualType` becomes **`response.visual`**, consumed by **`LessonScreen`**, which
   renders **`VisualCard`** for that type.
5. `VisualCard` looks up `VISUAL_STEP_COUNTS[type]`, dispatches via its `switch` to the matching
   component, and renders it inside **`ThreeDVisual`** with narration-synced `revealStep` playback
   and `VisualPlaybackControls`.

## Was Computer Science reachable before this sprint?

**No.** Three blockers, all in `src/lib/school/visuals/detectVisual.ts` (plus its subject gate):

- **Blocker 1 — `computer_science` is not in `VISUAL_SUBJECTS`.** `detectVisual()` returns `null`
  immediately (`if (!VISUAL_SUBJECTS.has(opts.subjectSlug)) return null`) for any CS lesson, so the
  pipeline never starts. `VISUAL_SUBJECTS` (in `visualTypes.ts`) currently holds
  `mathematics / science / math / quantum_physics / physics / chemistry` — every other 3D subject is
  present; CS is missing.
- **Blocker 2 — no `COMPUTER_SCIENCE_3D_RULES` table and no `computer_science` branch.**
  `detectVisual()` has no `if (opts.subjectSlug === 'computer_science')` branch, so even past the
  subject gate it could never return a CS `three_*` type.
- **Blocker 3 — `parseVisualTag()`'s `VALID` Set and `buildVisualsSystemBlock()`'s `all` list omit
  the five CS types.** Even a correctly emitted `VISUAL:` tag would be rejected, and the system
  prompt never advertises these types.

`VisualCard` / `VISUAL_STEP_COUNTS` / `visualTypes.ts` registration (from the CS Foundation Sprint)
is already correct — steps 4–5 of the pipeline work today once a valid `response.visual` reaches
them. All blockers are in `detectVisual.ts` (steps 1–3).

## Verdict

Four additive, surgical changes make all five CS 3D visuals production-reachable: (1) add
`'computer_science'` to `VISUAL_SUBJECTS`; (2) add a `COMPUTER_SCIENCE_3D_RULES` table checked under
a new `computer_science` branch — exactly the two-tier `matchRules(3D) ?? matchRules(2D)` pattern
proven by physics/chemistry/mathematics (CS has no pre-existing 2D rule set, so the branch returns
the 3D match directly); (3) add the five types to `parseVisualTag`'s `VALID` Set; (4) add them to
`buildVisualsSystemBlock`'s `all` list. No other file in the pipeline requires modification.
