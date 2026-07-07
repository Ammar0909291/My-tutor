# Interactive Learning Audit — Visual Learning Sprint F

## Scope

Audit of the four existing visual engines (`GraphRenderer`, `NumberLineRenderer`,
`GeometryRenderer`, `ProcessFlowRenderer`) to determine the safest way to add
*manipulation* (drag/reorder) on top of what is currently pure *display*.
No renderer is rebuilt — this sprint only adds opt-in interaction on top of
the existing SVG output.

## 1. Current architecture (unchanged)

All four renderers share the same shape:
- `'use client'`, plain SVG (no canvas/WebGL/external diagram lib).
- Responsive via `ResizeObserver`.
- Theme-aware via CSS custom properties with literal fallbacks.
- Props are a single validated `*Spec` object (zod-checked upstream in
  `visualSpec.ts` / `VisualRenderer.tsx`); the renderer never re-validates.
- `GraphRenderer` already has one interaction precedent: pan (pointer drag)
  and zoom (wheel/buttons) on the *viewport*, not on the *model* — dragging
  never changes `spec.equation`, only what window of it is visible.

Sprint F's job is to add a second, new category of interaction: dragging
that changes the *model* itself (slope, a highlighted point, a vertex, step
order) and re-renders live, while leaving the viewport-only interactions
already in GraphRenderer untouched.

## 2. Safest interaction architecture

**Decision: local component state, derived-from-props, opt-in via `spec.interactive`.**

- Each renderer keeps its own `useState` for the *mutable* parts of the
  model (slope/intercept, highlighted points, vertex coordinates, step
  order). State is **initialized from the validated spec** and never
  written back to the spec, the database, or any parent — interaction is
  ephemeral, client-only, and disappears on reload. This matches "no
  database changes" and "no grading system yet" in the brief.
- Interaction is strictly **additive and gated**: every new pointer handler
  is only attached when `spec.interactive === true`. When the flag is
  absent or `false`, the component renders through the exact same code
  path as before — no new state, no new handlers, pixel-identical output.
  This is what makes Task 8 ("unchanged when interactive=false")
  structurally guaranteed rather than something to merely test for.
- All drag math is closed-form arithmetic on numbers already bounded by
  the existing zod schema (or clamped client-side to a sane range, e.g.
  slope ∈ [-20, 20], angle ∈ [0, 360]). No new expression parsing, no
  `eval`, no `new Function`. Graph's draggable slope/intercept reuses the
  already-safe `compileExpression` parser only to *render*; the drag math
  itself is plain `m*x+b` arithmetic, never a second parse of arbitrary
  text.
- Pointer Events (`onPointerDown/Move/Up` + `setPointerCapture`) are used
  everywhere, exactly as GraphRenderer's existing pan implementation does —
  this is already mouse+touch+pen unified, so no separate touch handlers
  are needed. `touchAction: 'none'` is set on draggable elements so the
  browser doesn't hijack the gesture for page scroll.

## 3. State management approach

| Renderer | New state | Source of truth while idle |
|---|---|---|
| GraphRenderer | `{m, b}` (slope/intercept), only when equation matches a linear pattern | `spec.equation`, re-parsed on prop change |
| NumberLineRenderer | `points: number[]` | `spec.highlight ?? []`, re-synced on prop change |
| GeometryRenderer (triangle/rectangle/circle/angle) | shape-specific numeric fields (base/height, width/height, radius, angle) | the matching spec props, re-synced on prop change |
| ProcessFlowRenderer | `order: number[]` (permutation of step indices) | identity order `[0..n-1]`, re-synced on prop change |

A `useEffect` keyed on the relevant spec field resets local state if the
spec itself changes (e.g. switching demo cards), so stale interaction state
never leaks across specs.

## 4. Mobile compatibility

- Pointer Events already unify touch; the only addition needed is
  `touchAction: 'none'` on drag targets (already used by GraphRenderer's
  pan) so a drag gesture isn't interpreted as a page scroll.
- Drag targets (handles, vertices, points) are sized ≥ 16px radius hit
  area even though their visual radius may be smaller, via a transparent
  larger `<circle>` overlay — satisfies touch target size without
  changing the visual design.
- ProcessFlowRenderer's reorder additionally ships **Up/Down buttons** per
  step (not drag-only) — HTML5 `draggable` drag-and-drop is unreliable on
  touch, so buttons are the guaranteed-working mobile path; pointer-drag
  is the desktop affordance. Both write to the same `order` state.

## 5. Accessibility

- All new interactive controls are real, focusable, `<button>` /
  `aria-label`'d SVG elements where buttons are used (process-flow
  reorder), not div-soup. Drag handles carry `aria-label` describing what
  they control (e.g. "Drag to change slope"). Keyboard users can use the
  Up/Down buttons in process flow; full keyboard-drag for continuous
  slope/vertex dragging is out of scope for this sprint (flagged in
  Remaining Gaps in the sprint report).
- Live values (slope, area, perimeter, angle, step order correctness) are
  rendered as visible text on every update, not conveyed by color alone.

## 6. Renderer-by-renderer interaction strategy

- **Graph**: draggable intercept point (vertical-only drag) and draggable
  slope point (off-axis point whose height sets slope) — only rendered
  when `spec.interactive` and the equation matches a linear `y = mx + b`
  pattern. Quadratics and other forms render exactly as before; the flag
  is accepted but has no visible effect, which is the correct fail-safe
  behavior rather than a crash or a misleading half-feature.
- **Number line**: existing highlighted points become draggable along the
  line, clamped to `[start, end]`. With exactly two points, a live
  comparison string (`a < b` / `a > b` / `a = b`) is shown.
- **Geometry**: one or two handles per shape, each tied to exactly one
  numeric property, so the existing formula text (already rendered)
  updates live with no new formula logic — only the inputs change.
- **Process flow**: reorder mode swaps step indices via drag or
  Up/Down buttons; a live "in correct order" / "not yet in order" check
  compares the current order against the original (assumed-correct)
  `spec.steps` order. Visual feedback only, no persisted score.

## 7. Extension path

Future renderers (or future interactions on these same four) follow the
same recipe: add an optional field to the spec, gate a `useState` + pointer
handlers behind it, never mutate the prop, never touch the database. No
change to `VisualRenderer.tsx`'s dispatch is required for *any* of this
sprint's work, since `interactive` is a prop-level flag, not a new
`VisualSpec` union member.

## 8. Risks

| Risk | Mitigation |
|---|---|
| Regex-based linear-model extraction misparses an edge-case equation string | Fails closed: extraction returning `null` means no handles render — graph still displays exactly as before, never crashes |
| Drag math producing `NaN`/`Infinity` (e.g. divide-by-zero at x=0 for slope handle) | Slope handle's x position is fixed at a non-zero offset, and all derived values are clamped + `Number.isFinite`-checked before being applied |
| Mobile: HTML5 native drag-and-drop not firing on touch | Up/Down buttons are the primary mobile reorder path, not a fallback bolted on later |
| Performance: per-pointermove `setState` causing excess re-renders | Renderers are small (≤ 12 SVG nodes); React batches; no measurable jank at typical lesson-content sizes (verified in Task 8/screenshots) |
| Visual regression on `interactive` not set | Structural gate (Section 2) makes this a non-issue rather than something to merely test |
| Scope creep into a generic drag-and-drop framework | Explicitly rejected — each renderer's interaction is hand-written, bounded, and shape-specific, per the brief's "no CAD features" instruction |

## 9. Files touched by this sprint

- `src/lib/visuals/visualSpec.ts` — add optional `interactive: boolean` to
  every leaf spec schema (graph, number_line, process_flow, and each
  geometry shape).
- `src/components/visuals/GraphRenderer.tsx`
- `src/components/visuals/NumberLineRenderer.tsx`
- `src/components/visuals/GeometryRenderer.tsx`
- `src/components/visuals/ProcessFlowRenderer.tsx`
- `src/app/dev/visual-demo/VisualDemo.tsx` — new Interactive section
- `docs/VISUAL_LEARNING_SPRINT_F_REPORT.md` — sprint output

No changes to `VisualRenderer.tsx`, `VisualConceptDetector.ts`,
`VisualSpecBuilder.ts`, Tutor Max prompts, AI providers, or the database.
