# Science Flow Engine Audit — Visual Learning Sprint E

Scope: introduce the first Science Visualization Engine — a reusable
**process-flow diagram** for sequential scientific processes (photosynthesis,
water cycle, digestion, food chain, …). This is purely additive on top of the
Sprint B–D visual pipeline; nothing already shipped is modified.

## 1. What already exists (unchanged)

- `VisualSpec` (`src/lib/visuals/visualSpec.ts`) — a zod-validated discriminated
  union, currently `graph | number_line | geometry`.
- `VisualRenderer` (`src/components/visuals/VisualRenderer.tsx`) — dispatches on
  `spec.type`, wraps every renderer in `VisualErrorBoundary`.
- `GraphRenderer`, `NumberLineRenderer`, `GeometryRenderer` — one SVG renderer
  per visual family, all following the same conventions (`'use client'`,
  `ResizeObserver`-based responsive sizing, CSS-variable theming with literal
  fallbacks).
- `VisualConceptDetector` (`src/lib/visuals/visualConceptDetector.ts`) —
  deterministic keyword/regex rules turning tutor text into a `DetectedConcept`.
- `VisualSpecBuilder` (`src/lib/visuals/visualSpecBuilder.ts`) — turns a
  `DetectedConcept` into a validated `VisualSpec`.
- The Tutor Max pipeline (`src/app/api/learn/chat/route.ts` →
  `buildVisualSpec()` → JSON field → `LessonScreen.tsx` → `VisualRenderer`) is
  fully generic over the `VisualSpec` union and requires no changes to support
  a new member.
- A **separate, pre-existing** system at `src/lib/school/visuals/detectVisual.ts`
  + `visualTypes.ts` already has `food_chain`/`water_cycle` keyword detection,
  but it belongs to the *School* module's own visual-suggestion feature (a
  different pipeline, different consumer, different spec shape). It is not
  part of the Tutor Max → VisualSpec → VisualRenderer pipeline and is **not
  touched** by this sprint — Sprint E's detector is independent and additive
  inside `visualConceptDetector.ts` only.

## 2. How ProcessFlowSpec fits into VisualSpec

Unlike `geometry` (which needed a *nested* discriminated union because six
shapes all share `type: 'geometry'`), `process_flow` is a single flat shape —
one plain `ZodObject` with a unique `type: 'process_flow'` literal. That means
it can join the existing `mathSpecUnion` (`z.discriminatedUnion('type', [...])`)
directly, rather than requiring the `z.union([...])` fallback geometry needed:

```ts
export const processFlowSpecSchema = z.object({
  type: z.literal('process_flow'),
  title: z.string().max(80),
  steps: z.array(z.object({
    title: z.string().min(1).max(60),
    note: z.string().max(140).optional(),
  })).min(2).max(12),
  orientation: z.enum(['vertical', 'horizontal', 'auto']).optional(),
})

const mathSpecUnion = z.discriminatedUnion('type', [
  graphSpecSchema,
  numberLineSpecSchema,
  processFlowSpecSchema,
])

const visualSpecUnion = z.union([mathSpecUnion, geometrySpecSchema])
```

`steps` is normalized to `{ title, note? }` objects internally (so the renderer
has a stable annotation slot per Task 4), while the detector/builder may
accept either bare strings or objects — `parseVisualSpec` coerces strings to
`{ title: string }` via a zod preprocess step, so the sprint brief's own
literal example (`steps: ["Sunlight", "Water", ...]`) validates as-is.

## 3. Integration with VisualRenderer

One additional `case` in `VisualRenderer.tsx`'s existing `dispatch()` switch:

```ts
case 'process_flow':
  return <ProcessFlowRenderer spec={spec} />
```

Same pattern as the `geometry` case added in Sprint D — no other change to
`VisualRenderer.tsx`, and the `never`-typed exhaustiveness guard means a future
union member without a case fails to compile.

## 4. Generating process diagrams safely

Every prop is a zod-validated string/array of strings — no expression
evaluation, no external diagram library, no `eval`. `ProcessFlowRenderer`
lays out N steps as plain SVG: rectangles (step "cards") connected by arrows
(`<line>` + `<polygon>` arrowhead, or a `<path>` with a marker), positioned by
simple arithmetic (`index * spacing`). This is strictly lower attack-surface
and lower complexity than `graph`'s equation parser or even `geometry`'s
closed-form coordinate math — there's no per-shape geometry to compute, just a
linear (or wrapped-grid) sequence of identical boxes.

Layout/orientation:
- `vertical` — boxes stacked top-to-bottom, arrows pointing down. Best default
  for narrow/mobile viewports.
- `horizontal` — boxes left-to-right, arrows pointing right. Better for wide
  desktop viewports with few steps.
- `auto` (default) — renderer picks based on measured container width and
  step count (mirrors `GeometryRenderer`'s `useResponsiveSize` + fit-to-box
  pattern): horizontal when the container is wide enough to fit all steps at a
  legible width, vertical (which always fits, since it can scroll) otherwise.

## 5. Extension path for future biology/chemistry/geography flows

`ProcessFlowSpec` is intentionally generic — it has no domain-specific fields
(no "isPhotosynthesis" flag, no biology-only props). Any sequential process —
respiration, the rock cycle, the carbon cycle, a chemical reaction's stages,
states-of-matter transitions — is just an ordered list of `{ title, note? }`
steps. Adding a new detectable process in the future means:
1. Add a keyword cluster + step list constant in `visualConceptDetector.ts`
   (e.g. `CARBON_CYCLE_KEYWORDS` + `CARBON_CYCLE_STEPS`).
2. Add one branch in `detectVisualConcept()` returning
   `{ kind: 'process_flow', title, steps }`.
3. `visualSpecBuilder.ts`'s existing `process_flow` branch (added this sprint)
   already handles construction generically — no per-process builder code
   needed.

No renderer change, no VisualSpec schema change, no pipeline change is ever
required to add a new process — exactly the same "additive only" extension
story Sprint C established for graph/number_line and Sprint D established for
geometry shapes.

## 6. Risk Table

| Risk | Mitigation |
|---|---|
| Keyword overlap between processes (e.g. "cycle" appears in water/rock/carbon cycle) | Detection rules require a *specific* multi-word phrase match (e.g. "water cycle", "rock cycle") or a tight combination of stage-keywords, not generic words alone — mirrors Sprint C/D's conjunctive-keyword approach. |
| False positive on passing mention ("plants need photosynthesis to survive") | Detection still fires for single strong-signal phrases like "photosynthesis"/"food chain" since these are domain-unambiguous nouns (unlike geometry's generic shape words) — accepted as intentional, matches the sprint's "Explain photosynthesis" example which has no extra task keyword. |
| Existing School-module `detectVisual.ts` keyword sets could be confused with this sprint's detector | They are separate files/types/consumers; no shared import, no shared keyword constant — verified no collision risk. |
| Overlong process (many steps) overflowing mobile viewport | `steps` capped at 12 by zod; vertical orientation scrolls naturally; horizontal auto-switches to vertical below a width threshold. |
| Renderer crash on malformed spec | `VisualErrorBoundary` (already wraps every renderer via `VisualRenderer`) catches it; `parseVisualSpec` fails safe to `null` before render is ever attempted. |
| Scope creep into interactive/animated diagrams | Explicitly out of scope per brief — renderer is static SVG only, no animation, no interactivity, no external diagram engine. |

## 7. Summary — files this sprint touches

- `src/lib/visuals/visualSpec.ts` — add `processFlowSpecSchema`, fold into `mathSpecUnion`, export `ProcessFlowSpec` type.
- `src/components/visuals/ProcessFlowRenderer.tsx` — new file.
- `src/components/visuals/VisualRenderer.tsx` — one new dispatch case.
- `src/lib/visuals/visualConceptDetector.ts` — additive keyword/step constants + new branches.
- `src/lib/visuals/visualSpecBuilder.ts` — one additive `process_flow` branch.
- `src/app/dev/visual-demo/VisualDemo.tsx` — dev-only showcase fixtures.

Not touched: `route.ts`, `LessonScreen.tsx`, AI prompts, Prisma schema,
`GraphRenderer.tsx`, `NumberLineRenderer.tsx`, `GeometryRenderer.tsx`,
`mathParser.ts`, `src/lib/school/visuals/*`.
