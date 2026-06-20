# Visual Mastery Integration Audit — Sprint L, Task 1

Audit of `GraphRenderer`, `NumberLineRenderer`, `GeometryRenderer`, and
`ProcessFlowRenderer` for where the Visual Mastery system (`onMasteryEvent`)
can hook into each renderer's existing `challengeMet` / `isCorrect` /
validation-success state, without altering rendering or challenge logic.

All four renderers (and `VisualRenderer.tsx`, the shared dispatch point) now
accept two fully optional props:

```ts
onMasteryEvent?: (signal: VisualMasterySignal) => void
masteryContext?: VisualMasteryContext   // { concept?, source?, subjectSlug?, topicSlug?, sessionId? }
```

When `onMasteryEvent` is omitted, `createMasteryEmitter()`'s returned `emit()`
no-ops, so every existing caller is byte-identical to pre-Sprint-L behavior.

Each renderer fires up to four milestones, each **at most once per mounted
instance**, guarded by a `useRef({ shown, interacted, attempted, completed })`
dedup flag:

- `shown` — fires once on mount (`useEffect(() => {...}, [])`).
- `interacted` — fires once at the first interaction-start (drag-start /
  pointer-down / first click).
- `attempted` — fires once at interaction-end (pointer-up, or order-change
  for ProcessFlow), only if a challenge exists, carrying whatever
  `challengeCompleted` value is true at that moment.
- `completed` — fires once, separately, the first time the existing
  `challengeMet`/`isCorrect` boolean becomes true at an interaction-end.

This "at-most-once-per-mount" discipline was chosen because:
1. Continuous gestures (pointer drag) would otherwise spam `interacted`/
   `attempted` on every `pointermove`/`pointerup` pair.
2. It maps cleanly onto the mastery model's binary milestones — a learner
   either has or hasn't reached each milestone in a given session with a
   given visual instance; firing repeatedly carries no additional signal.

## GraphRenderer (`src/components/visuals/GraphRenderer.tsx`)

- **Existing success state reused**: `challengeMet` (derived from
  `slopeOk && interceptOk`, computed from the existing challenge-tolerance
  check against the draggable line model). No new validation logic added;
  the computation block was only moved earlier in the function body so the
  new mastery helpers can reference it.
- **Emission points**:
  - `shown` — on mount.
  - `interacted` — inside `startHandleDrag`, the existing pointer-down
    handler for the draggable slope/intercept handle.
  - `attempted` / `completed` — inside `onPointerUp`, gated on
    `wasHandleDrag` (captured before the drag ref is cleared) and the
    existing `challenge` object being present. `completed` fires only when
    `challengeMet` is true.
- **Frequency**: each milestone fires at most once per mount; a user can
  drag the handle indefinitely without re-firing `interacted`, and can
  cross the target repeatedly without re-firing `completed`.
- **Duplicate-event risk**: remounting the component (e.g. navigating away
  and back, or the parent re-keying it) resets the `fired` ref, so `shown`
  (and potentially the others, if the user re-interacts) will fire again
  for the new instance. This is a known and accepted risk at the renderer
  level — the Task 3 collector is expected to deduplicate further at the
  session level if needed (e.g. by `concept`+`visualType`).

## NumberLineRenderer (`src/components/visuals/NumberLineRenderer.tsx`)

- **Existing success state reused**: `challengeMet` (`hasChallenge &&
  placeOk && relationOk && orderOk`), already computed from the existing
  `challenge.targetValue` / `targetRelation` / `order` checks against
  draggable highlight points. Computation moved earlier in the function
  body only; no logic changed.
- **Emission points**:
  - `shown` — on mount.
  - `interacted` — inside `onPointPointerDown`, the existing per-point
    drag-start handler.
  - `attempted` / `completed` — inside `onLinePointerUp`, gated on
    `wasDragging` (captured before `dragIndex.current` is cleared) and
    `hasChallenge`. `completed` fires only when `challengeMet` is true.
- **Frequency**: same at-most-once-per-mount discipline as GraphRenderer.
  Dragging a point back and forth across the target only fires `completed`
  the first time it lands within tolerance.
- **Duplicate-event risk**: same remount-resets-`fired` risk as
  GraphRenderer. Additionally, this renderer supports multiple highlighted
  points; `interacted` fires on the *first* point drag-started, regardless
  of which point — this is intentional (the milestone is "the learner
  started interacting with this visual", not "this specific point moved").

## GeometryRenderer (`src/components/visuals/GeometryRenderer.tsx`)

This renderer dispatches to six independent shape sub-components, each
with its own interaction model. A shared `useShapeMastery(visualType,
defaultConcept, props)` helper centralizes the `emitMastery` factory +
`fired` ref + mount-effect for all six.

- **TriangleShape** — existing success state reused: `checks` array
  (area/perimeter target checks), `challengeMet = checks.length > 0 &&
  checks.every(c => c.ok)`. Emission: `interacted` on either `Handle`'s
  drag-start (height or base); `attempted`/`completed` on either `Handle`'s
  drag-end, gated by `wasDragging` inside the shared `Handle` component
  itself. Two independent draggable handles share one `fired` ref, so
  whichever is dragged first claims `interacted`.
- **RectangleShape** — same pattern as Triangle: `checks`/`challengeMet`
  reused unchanged, single `Handle` wired to the same drag-start/drag-end
  callbacks.
- **CircleShape** — same pattern, single `Handle`.
- **AngleShape** — does not use the shared `Handle` component (custom
  ray-drag implementation). `challengeMet` computed locally at drag-end:
  `Math.abs(angle - spec.challenge.targetAngle) <= (spec.challenge.tolerance
  ?? 3)`, reusing the exact existing tolerance-check expression. Emission:
  `interacted` in `onRayPointerDown`; `attempted`/`completed` in
  `onRayPointerUp`, gated by `wasDragging` (captured before `lastPos.current`
  is cleared) and `spec.challenge?.targetAngle !== undefined`.
- **LineShape** — **no interaction or challenge capability**: this shape
  never renders a `Handle` or `ChallengeFeedback`. It can only ever emit
  `shown` (via the shared mount-effect inside `useShapeMastery`);
  `interacted`/`attempted`/`completed` are structurally unreachable. This is
  expected and not a gap — there is nothing to interact with.
- **PointShape** — identical to LineShape: shown-only, no interaction
  surface.
- **Frequency**: each shape's milestones fire at most once per mount,
  matching the other renderers.
- **Duplicate-event risk**: same remount risk as above. Additionally,
  Triangle/Rectangle/Circle each have one or two `Handle` instances sharing
  a single `fired` ref per shape instance — this is intentional (one
  shape = one mastery-emission identity, regardless of which handle the
  learner happens to grab).

## ProcessFlowRenderer (`src/components/visuals/ProcessFlowRenderer.tsx`)

- **Existing success state reused**: `isCorrect` (the existing reorder
  correctness check from `useReorder`, comparing live `order` against the
  spec's correct order). No new validation logic.
- **Interaction model differs from the other three renderers**: there is no
  pointer-drag gesture here — the user interacts via discrete `swap(i, j)`
  button clicks (`HorizontalFlow`/`VerticalFlow` step buttons), so there is
  no natural "pointer-up" moment to hook into.
- **Solution**: a `userSwappedRef` boolean, set `true` only inside a new
  `wrappedSwap(i, j)` wrapper (which calls the existing `swap(i, j)`
  unchanged), distinguishes a genuine user-triggered reorder from
  `useReorder`'s own internal mount/reset effect (which also mutates
  `order` but is not a user action). A `useEffect(() => {...}, [order])`
  watches `order`, only acting when `userSwappedRef.current` is true.
- **Emission points**:
  - `shown` — on mount.
  - `interacted` — inside the `order`-watching effect, on the first
    user-triggered reorder.
  - `attempted` / `completed` — inside the same effect, gated on
    `spec.interactive`; `attempted` fires with `challengeCompleted:
    isCorrect`, `completed` fires separately once `isCorrect` is true.
- **Frequency**: at most once per mount per milestone, same as the other
  renderers — repeatedly reordering after already reaching the correct
  order does not re-fire `completed`.
- **Duplicate-event risk**: same remount risk as the other renderers. The
  `userSwappedRef` gate specifically eliminates a *different* risk that is
  unique to this renderer: without it, `useReorder`'s internal effects
  (e.g. resetting `order` when `spec` changes) could be mistaken for user
  interaction and spuriously fire `interacted`/`attempted`.

## Cross-cutting duplicate-event risk (all renderers)

The `fired` ref lives in component state, so it is reset whenever React
unmounts and remounts the component (e.g. parent re-keys it, or the user
navigates away and back within the same page session). In that case
`shown` — and any other milestone the learner reaches again — will be
re-emitted as if it were a new instance. This is accepted at the renderer
level: renderers know only about their own mounted lifetime, not the
broader session. Task 3's collector (`useVisualMastery`) is the intended
second line of defense for any session-level deduplication beyond
per-instance milestones (e.g. collapsing repeat `shown` events for the same
`concept`+`visualType` pair within one collector lifetime).
