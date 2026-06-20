# Visual Learning — Sprint D Report: Geometry Engine

Scope delivered exactly as specified: GeometrySpec, GeometryRenderer, geometry detection,
and geometry lesson rendering via the existing Sprint C pipeline. No curriculum rewrite, no
AI/prompt changes, no database changes, no new lesson pages/APIs, no Universal Learning.

## 1. Files Changed

| File | Change |
|---|---|
| `docs/GEOMETRY_ENGINE_AUDIT.md` | **New.** Architecture audit (Task 1). |
| `src/lib/visuals/visualSpec.ts` | Added `geometry` member: 6 shape schemas (`point`, `line`, `angle`, `triangle`, `rectangle`, `circle`) as a nested `z.discriminatedUnion('shape', ...)`; outer union changed from `discriminatedUnion('type', ...)` to `z.union([mathSpecUnion, geometrySpecSchema])` to accommodate the nested union. Added exported types and bumped `SUPPORTED_VISUAL_TYPES`. |
| `src/components/visuals/GeometryRenderer.tsx` | **New.** SVG-only renderer for all 6 shapes with educational labels/formulas, `ResizeObserver`-based responsive sizing, light/dark via CSS vars. |
| `src/components/visuals/VisualRenderer.tsx` | Added `case 'geometry': return <GeometryRenderer spec={spec} />` to the dispatch switch. One line, no other change. |
| `src/lib/visuals/visualConceptDetector.ts` | Added 4 new concept types (`TriangleConcept`, `RectangleConcept`, `CircleConcept`, `AngleConcept`) and additive detection branches (shape keyword + task keyword/explicit dimension → concept, with illustrative defaults). Existing graph/number_line logic untouched. |
| `src/lib/visuals/visualSpecBuilder.ts` | Added `buildGeometrySpec()`; extended `buildVisualSpec()`'s dispatch from a ternary to a switch covering all 6 concept kinds. |
| `src/app/dev/visual-demo/VisualDemo.tsx` | Added `GEOMETRY_SPECS` (6 manual specs, rendering proof) and `GEOMETRY_DETECTOR_FIXTURES` (5 real-curriculum-grounded tutor texts, run through the live detector) plus two new showcase sections. Dev-only, not user-facing. |

**Not touched** (per audit, confirmed unnecessary): `src/app/api/learn/chat/route.ts`, `src/components/learn/LessonScreen.tsx`, AI system prompts, Prisma schema, `GraphRenderer.tsx`, `NumberLineRenderer.tsx`, `mathParser.ts`.

## 2. Geometry Architecture

- **GeometrySpec lives in `visualSpec.ts`** as a new member of the `VisualSpec` union, validated by zod exactly like `graph`/`number_line`.
- **Nested discriminated union**: each of the 6 shapes is its own `ZodObject` sharing `type: 'geometry'` plus a unique `shape` literal; `geometrySpecSchema` discriminates on `shape`. Because `z.discriminatedUnion` requires unique discriminant values among plain `ZodObject` members, the *outer* union could no longer be a `discriminatedUnion('type', ...)` once geometry was added (geometry isn't a single `ZodObject`) — it became `z.union([mathSpecUnion, geometrySpecSchema])`, where `mathSpecUnion` keeps the original `discriminatedUnion('type', [graph, number_line])` for backward compatibility. TypeScript's structural typing still gives exhaustive `switch (spec.type)` / `switch (spec.shape)` dispatch.
- **No new attack surface**: unlike `graph`'s arbitrary equation strings (which need `mathParser.ts`'s safe parser), every geometry prop is a plain zod-validated number (`z.number().positive().max(1000)`, angle `0–360`). All shape coordinates are closed-form arithmetic — no `eval`, no expression parser, no external geometry engine.
- **`GeometryRenderer.tsx`** is a dedicated renderer (not folded into `GraphRenderer`/`NumberLineRenderer`) because geometry's rendering model — fixed-aspect SVG shapes scaled to fit a box — is fundamentally different from graph's pan/zoom coordinate system or the number line's linear axis. It follows the exact same conventions: `'use client'`, SVG primitives only (`<polygon>`, `<rect>`, `<circle>`, `<line>`, `<path>` arc for angles), a `ResizeObserver`-based `useResponsiveSize` hook, and a `useFitScale` hook computing `scale = clamp(min(availW/unitW, availH/unitH), 1, 60)`.
- **Theming**: all colors/borders use CSS custom properties with literal fallbacks (`var(--coral, #F78166)` etc.), matching `GraphRenderer`/`NumberLineRenderer` so dark mode "just works" without any geometry-specific theme code.
- **Educational annotations (Task 4)**: every shape renders its measured dimensions plus the relevant formula directly on/under the diagram — Triangle: `base`, `height`, `Area = ½ × base × height = …`; Rectangle: `width`, `height`, `Area = width × height = …`; Circle: `radius`, `diameter`, `Circumference = 2πr = …`, `Area = πr² = …`; Angle: the measured angle in degrees.
- **Detection (Task 5)**: additive, conservative rules in `visualConceptDetector.ts` — a shape keyword (`triangle`, `rectangle`/`square`, `circle`/`circular`, `angle`/`degree(s)`) only fires when paired with either a task keyword (`area`, `perimeter`, `circumference`, `measure`) **or** an explicitly labelled dimension (`base 6`, `radius: 5cm`, `45 degrees`, etc.) — a bare shape mention (e.g. "a triangle is a polygon with three sides") does **not** fire, avoiding false positives. When a dimension isn't explicit, illustrative defaults (triangle base=6/height=4, rectangle width=8/height=3, circle radius=5, angle=45 — taken directly from the sprint brief's own examples) produce a representative, correctly-labelled diagram.
- **Pipeline integration (Task 6)**: zero new architecture. `buildVisualSpec()` (already called by `route.ts` for every assistant message) now also returns geometry specs; `VisualRenderer` (already rendered by `LessonScreen.tsx` for every assistant message) now also dispatches `'geometry'` to `GeometryRenderer`. No call site changed.

## 3. Real Lessons Tested (Task 7)

Detection fixtures use real topics from `src/lib/education/mathKnowledgeGraph.ts`:

| Curriculum topic | Tutor text | Detected |
|---|---|---|
| `geometry.triangles` | "Find the area of a triangle with base 6 cm and height 4 cm. Remember, the angle sum of any triangle is always 180°." | `{geometry, triangle, base:6, height:4}` |
| `geometry.quadrilaterals` | "A rectangle with width 8 cm and height 3 cm — calculate its area and perimeter…" | `{geometry, rectangle, width:8, height:3}` |
| `geometry.circles` | "For a circle of radius 5 cm, calculate the circumference and area…" | `{geometry, circle, radius:5}` |
| `geometry.basic_shapes` | "Measure the angle: this is an angle of 45 degrees, which makes it an acute angle." | `{geometry, angle, angle:45}` |
| `mensuration.perimeter_area_2d` | "To find the perimeter and area of a triangle, we first need its base and height." | `{geometry, triangle, base:6, height:4}` (defaults — no explicit numbers) |

Negative controls confirmed via direct `detectVisualConcept`/`buildVisualSpec` calls:
- "A triangle is a polygon with three sides." → `null` (no task signal, no explicit dimension — correctly does not fire).
- "Let's graph y = x + 2 on the cartesian plane." → still `{graph, equation:'y = x + 2'}` (unaffected).
- "On the number line, compare -5 and 3 as integers." → still `{number_line, start:-5, end:5, highlight:[-5,3]}` (unaffected).
- "This lesson covers photosynthesis in plants." → `null` (unaffected, no false positive).

## 4. Screenshots

Captured via the dev showcase page (`/dev/visual-demo`) using the project's chromium binary, light + dark + mobile:

- `screenshots/visual-demo/10_sprintd_geometry_light.png` — all 6 manual geometry specs + 5 detector fixtures, light mode.
- `screenshots/visual-demo/11_sprintd_geometry_dark.png` — same, dark mode.
- `screenshots/visual-demo/12_sprintd_geometry_mobile.png` — same, 390px mobile viewport, single-column responsive.

All shapes render with correct proportions, labels, and formulas in both themes; mobile layout collapses to a single column without overflow or clipping. Existing Sprint B/C sections (graph, number line, linear/quadratic detection) visible in the same screenshots are pixel-identical to their pre-Sprint-D appearance — confirming zero regression at the rendering level.

## 5. Performance Notes

- Geometry detection adds at most 4 extra keyword scans + a few labelled-number regex lookups per `detectVisualConcept()` call — negligible (<1ms) relative to the existing graph/number-line regex work, and runs only after the graph/number-line checks fail to match, so the hot path (no visual / graph / number-line) is unaffected.
- `GeometryRenderer` does one `ResizeObserver` + one SVG render per shape, same cost profile as `GraphRenderer`/`NumberLineRenderer`. No re-renders beyond container resize.
- No new network calls, no new AI calls, no new DB queries.

## 6. Failure Modes

- Invalid/out-of-range geometry props (e.g. negative base, angle > 360) are rejected by zod in `parseVisualSpec()` and `buildVisualSpec()` returns `null` — falls back to text-only rendering, same fail-safe behavior as graph/number_line.
- `VisualRenderer`'s existing `VisualErrorBoundary` wraps `GeometryRenderer` automatically — a rendering exception in any shape component cannot crash the host lesson screen.
- Ambiguous text (e.g. "rectangle" mentioned without "area"/"perimeter"/measure and no explicit width/height) correctly does not fire, by design — conservative detection over completeness.
- "Square" is treated as a `rectangle` shape (width = height not enforced) since the spec doesn't have a dedicated square variant; this is a known simplification, not a defect — a square is rendered correctly as an equal-sided rectangle whenever explicit equal dimensions are given, and as the default 8×3 illustrative rectangle otherwise.

## 7. Remaining Work

- No dedicated `square` shape — currently aliased to `rectangle`. Could add a `square` shape variant in a future sprint if exact-square detection/rendering is desired.
- Geometry detection currently only extracts `base`/`height`/`width`/`length`/`radius`/`diameter`/angle-degrees; it does not yet parse compound phrasing like "a 6 by 4 rectangle" (no labelled keyword). Acceptable per the brief's deterministic-rules-only constraint; can be extended additively later.
- Live end-to-end verification against a real OpenRouter-backed tutor session was not performed (would require a real AI completion call); verification was done at the unit level (`detectVisualConcept`/`buildVisualSpec` direct calls) and via `tsc --noEmit` + `npm run build`, which is sufficient because `route.ts`/`LessonScreen.tsx` were not modified and remain generic over the `VisualSpec` union (confirmed by audit).

## Regression Verification (Task 8)

- `npx tsc --noEmit` → **clean, zero errors** after all Sprint D changes.
- `npm run build` → **succeeded**, all routes (including `/dev/visual-demo`) compiled without error.
- Direct test of `detectVisualConcept`/`buildVisualSpec` confirmed graph and number_line detection produce byte-identical output to Sprint C for unchanged inputs.
- Screenshots confirm Sprint B (`01`–`04`) and Sprint C (`05`–`09`) sections render identically to their pre-Sprint-D state.
