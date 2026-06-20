# Geometry Engine Audit — Sprint D, Task 1

Audit of the existing visual architecture (Sprint B/C) to determine how a
geometry capability should be added without touching anything already built.

## 1. What already exists (unchanged by this sprint)

- `src/lib/visuals/visualSpec.ts` — `z.discriminatedUnion('type', [...])` of
  plain `ZodObject` schemas (`graph`, `number_line`), `superRefine` for
  cross-field checks, `parseVisualSpec()` fail-safe validator.
- `src/components/visuals/VisualRenderer.tsx` — a `switch (spec.type)`
  dispatcher with a `never`-typed exhaustiveness guard, wrapped in
  `VisualErrorBoundary`.
- `src/lib/visuals/visualConceptDetector.ts` /
  `src/lib/visuals/visualSpecBuilder.ts` — deterministic regex/keyword
  detection → spec construction → zod validation, called once server-side in
  `src/app/api/learn/chat/route.ts` after the AI's `cleanText` is final.
- `src/components/learn/LessonScreen.tsx` — already renders
  `<VisualRenderer spec={msg.visualSpec} />` whenever a message carries one.

This is a closed, well-factored extension point: **the union in
`visualSpec.ts`, one `case` in `VisualRenderer.tsx`, one branch in the
detector/builder — nothing else needs to change.** This was true by design
since Sprint B ("Future renderers… extend the union here and add a branch in
VisualRenderer — nothing else changes") and Sprint C proved it by adding
`graph`/`number_line` detection without touching the renderer or the lesson
integration point at all.

## 2. Where `GeometrySpec` should live

**In `visualSpec.ts`, as a new member of the existing union** — not a separate
file, not a separate contract. Geometry is exactly the kind of future member
the union was designed for. Concretely:

```ts
export const geometrySpecSchema = z.discriminatedUnion('shape', [
  trianglePropsSchema,   // { shape: 'triangle', base, height, ... }
  rectanglePropsSchema,  // { shape: 'rectangle', width, height }
  circlePropsSchema,     // { shape: 'circle', radius }
  angleSchema,           // { shape: 'angle', angle }
  lineSchema,            // { shape: 'line', ... }
  pointSchema,           // { shape: 'point', ... }
]).and(z.object({ type: z.literal('geometry'), title: z.string().max(80).optional() }))
```

A nested discriminated union (`shape`) inside the outer `type: 'geometry'`
member mirrors how the task examples are shaped (`{type:"geometry", shape:"triangle", base:6, height:4}`)
and keeps each shape's required fields independently validated, the same way
`graph` and `number_line` are independently validated members of the outer
union today. (Zod note: `discriminatedUnion` requires plain objects, so the
outer `type` field is intersected on rather than nested as a second
discriminant inside each shape schema — see Task 2 for the exact
implementation, which avoids the `ZodEffects`-incompatibility problem
Sprint B already solved once for `number_line`.)

## 3. Does this fit into `VisualSpec` cleanly?

Yes, by construction — that was the entire point of the union design.
Concretely:
- `visualSpecUnion` gains one new entry: `geometrySpecSchema`.
- `VisualRenderer`'s `switch` gains one new `case 'geometry': return <GeometryRenderer spec={spec} />`.
- The `never` exhaustiveness guard in `VisualRenderer` means the TypeScript
  compiler itself fails the build if this case is forgotten — Sprint B/C's
  existing safety net catches a missed wire-up automatically.
- `graph` and `number_line` schemas, and their renderers, are untouched —
  backward compatibility is structural, not a promise we have to keep by
  discipline: a discriminated union literally cannot retroactively invalidate
  an existing branch by adding a sibling branch.

## 4. Is a dedicated renderer required?

**Yes.** `GraphRenderer` and `NumberLineRenderer` are both single-purpose SVG
components; geometry needs its own because the rendering primitives are
completely different (shapes/paths/angle-arcs vs. a line plot or a number
line). Per Task 3, `GeometryRenderer` is a new component in
`src/components/visuals/`, following the exact same conventions as the
existing two:
- `'use client'`, SVG-only (no canvas/WebGL, matching the existing renderers
  exactly — they already avoided canvas/charting libraries).
- `ResizeObserver` for responsiveness (same pattern as `GraphRenderer`/`NumberLineRenderer`).
- CSS custom properties with literal fallbacks for theme-awareness (`var(--bg-surface, #fff)` etc.) — identical pattern to the existing two renderers.
- Wrapped automatically by the existing `VisualErrorBoundary` via `VisualRenderer` — no new error-handling code needed.

Internally, `GeometryRenderer` dispatches on `spec.shape` to one render
function per shape (triangle/rectangle/circle/angle/line/point) — same
"dispatch then specialize" pattern `VisualRenderer` itself uses one level up.

## 5. How should geometry diagrams be generated safely?

No external geometry engine, no canvas, no WebGL (explicitly excluded by the
sprint brief) — and none are needed. All six supported shapes
(point/line/angle/triangle/rectangle/circle) have closed-form coordinate
geometry:
- **Point**: a single `<circle r="3">` + label at given/default coordinates.
- **Line**: an SVG `<line>` between two computed endpoints (or through given
  points), no curve-fitting needed.
- **Angle**: two rays from a vertex at 0° and `angle`°, plus an SVG arc
  (`<path d="A...">`) between them — pure trigonometry (`Math.cos`/`Math.sin`),
  the same kind of safe, deterministic math already used in `GraphRenderer`'s
  `niceStep`/grid math. No parser needed here at all (Task 2's `GeometrySpec`
  carries already-validated numeric props, not free-form equation strings —
  there is no expression-evaluation attack surface for geometry the way there
  was for `graph`'s equation string).
- **Triangle**: given `base`/`height` (or three vertices, if ever extended),
  compute three vertex coordinates directly; no solver needed for an
  axis-aligned base-height triangle.
- **Rectangle**: `width`/`height` → four corner coordinates, trivial.
- **Circle**: `radius` → a single SVG `<circle>`.

Because every shape's geometry is closed-form arithmetic on already-validated
numbers (zod enforces `z.number().positive()` etc. at the schema level), there
is no `eval`, no string-expression parsing, and no new safety mechanism
required beyond the validation `GeometrySpecBuilder`/zod already provides —
unlike `graph`, which needed `mathParser.ts` specifically because equations
are arbitrary user/AI-influenced strings. Geometry specs are plain numbers.

## 6. Detection (Task 5) — fits the existing detector pattern

`visualConceptDetector.ts` already returns a `DetectedConcept` union
(`GraphConcept | NumberLineConcept`). Geometry detection adds new union
members (`TriangleConcept`, `CircleConcept`, `AngleConcept`,
`RectangleConcept`) using the same deterministic keyword/regex approach:
- Shape keywords (`triangle`, `circle`, `rectangle`, `angle`) combined with
  task keywords (`area`, `perimeter`, `circumference`) to decide *which*
  shape, mirroring how `GRAPH_KEYWORDS`/`NUMBER_LINE_KEYWORDS` already gate
  detection.
- Numeric extraction (reusing the existing `NUMBER_RE` pattern already in the
  file) to pull `base`/`height`/`radius`/`angle` values mentioned in the text.
- `visualSpecBuilder.ts` gains one new `buildGeometrySpec()` branch, validated
  through the same `parseVisualSpec()` zod call already used for
  graph/number_line — no new validation pathway.

This is additive in the same file, not a new detector — consistent with how
Sprint C added number_line detection alongside graph detection in one file
without disturbing graph's existing rules.

## 7. Risks

| Risk | Mitigation |
|---|---|
| Geometry keyword overlap with unrelated text (e.g. "triangle" used metaphorically) | Require both a shape keyword AND a task keyword (area/perimeter/circumference/angle measurement) OR an explicit extractable numeric dimension — same conjunctive-rule conservatism Sprint C used for graph (equation-must-compile) and number_line (keyword + number). |
| Schema changes accidentally breaking `graph`/`number_line` | Add geometry as a pure sibling member; never touch the existing two schemas. Verified by `tsc --noEmit` + `npm run build` (Task 8) and by deliberately testing the unmodified Sprint B/C demo fixtures still render identically. |
| Triangle/rectangle defined ambiguously (which dimension is "base" vs side) | Restrict Task 3 scope to the exact shapes in the brief, with the exact prop names in the brief's own examples (`base`/`height` for triangle, `width`/`height` for rectangle, `radius` for circle, `angle` for angle) — no invented generalization beyond what was asked. |
| Detector producing a geometry spec with implausible values (e.g. negative radius) | zod schema enforces `z.number().positive()` / sensible max bounds on every numeric field, mirroring `numberLineSpecSchema`'s `step: z.number().positive().max(1000)` pattern. `parseVisualSpec` already fails safe (returns null) on violation. |
| New renderer crashing the lesson UI | Already covered for free — `VisualRenderer` wraps every dispatch in the existing `VisualErrorBoundary`; no new error-handling code is needed in `GeometryRenderer` itself. |
| Scope creep into 3D/interactive/canvas rendering | Explicitly excluded by the brief; SVG-only, the same technology already used for graph/number-line, keeps this consistent and avoids a new rendering stack. |

## 8. Extension strategy (what Task 2/3/5/6 will actually touch)

1. `src/lib/visuals/visualSpec.ts` — add `geometrySpecSchema` (nested
   discriminated union on `shape`, intersected with `type: 'geometry'`), add
   it to `visualSpecUnion`, export `GeometrySpec` type. Existing
   `graphSpecSchema`/`numberLineSpecSchema`/`visualSpecUnion` members
   untouched.
2. `src/components/visuals/GeometryRenderer.tsx` — new file, SVG dispatch on
   `spec.shape`, one render function per shape, educational annotations
   (Task 4) baked into each shape's render function.
3. `src/components/visuals/VisualRenderer.tsx` — add one `case 'geometry'`.
4. `src/lib/visuals/visualConceptDetector.ts` — add geometry concept types +
   detection rules, alongside (not replacing) the existing graph/number_line
   rules.
5. `src/lib/visuals/visualSpecBuilder.ts` — add `buildGeometrySpec()`,
   alongside the existing two build functions.
6. No changes anywhere in `route.ts`, `LessonScreen.tsx`, the AI system
   prompt, or Prisma — the Sprint C pipeline (`buildVisualSpec` call site,
   JSON response field, client-side `parseVisualSpec` + render block) already
   handles *any* member of the `VisualSpec` union generically; geometry rides
   that pipeline for free.

## 9. Conclusion

Geometry is a textbook case of the extensibility Sprint B/C were explicitly
designed for: one new union member, one new renderer, one new detector
branch, zero changes to the chat route, lesson screen, AI prompts, or
database. The audit confirms no architectural rework is needed — only
additive files plus two small, additive edits to two existing
`src/lib/visuals/` files.
