/**
 * QUICK CHECK WINDOW — DRAG OFFSET, AND NOTHING ELSE.
 *
 * The panel's default position is entirely CSS
 * (`LessonScreen.module.css` `.quickCheckFloating`: centred, anchored near
 * the composer). Dragging adds a PIXEL OFFSET on top of that default — the
 * panel's own CSS layout, breakpoints, and every other window control
 * (minimize / maximize / close, the reopen chip) are untouched, because this
 * module only ever produces an `{x, y}` translation the caller layers onto
 * the existing inline style.
 *
 * The offset is pure, in-memory UI state — no DB persistence, matching every
 * other piece of Quick Check window state (`quickCheckWindow.ts`). The
 * caller resets it to `{x:0, y:0}` whenever a NEW question arrives (a fresh
 * `askedAt`), so a drag never follows the panel onto a question the learner
 * never actually moved it for.
 */

export interface DragPoint { x: number; y: number }

export interface DragRect { left: number; top: number; width: number; height: number }

export interface ViewportSize { width: number; height: number }

export const ZERO_DRAG_OFFSET: DragPoint = { x: 0, y: 0 }

/** The offset after dragging by (dx, dy) pixels from wherever the gesture
 *  started — `startOffset` is the offset at the moment the drag began, so a
 *  drag always composes with whatever position the panel was already at. */
export function nextDragOffset(startOffset: DragPoint, dx: number, dy: number): DragPoint {
  return { x: startOffset.x + dx, y: startOffset.y + dy }
}

/**
 * Keeps the panel fully within the viewport (with a small margin), so it can
 * never be dragged fully — or even partially — off-screen.
 *
 * `naturalRect` MUST be the panel's bounding box with the offset already
 * applied by the CALLER removed — i.e. its plain CSS position, with no drag
 * translation on top. Clamping against that fixed reference (captured once,
 * at the start of a drag gesture) rather than against the panel's own
 * already-offset live position is what keeps repeated small drags from
 * drifting the clamp bounds over a session.
 *
 * When the panel is itself wider or taller than the viewport minus margins
 * (a tiny phone, an unusually large panel), there is no offset that keeps
 * BOTH edges inside the margin on that axis — `clampAxis` falls back to
 * centering the panel on that axis rather than picking an arbitrary edge.
 */
export function clampDragOffset(
  offset: DragPoint,
  naturalRect: DragRect,
  viewport: ViewportSize,
  margin = 12,
): DragPoint {
  const clampAxis = (value: number, lo: number, hi: number) => (hi < lo ? (lo + hi) / 2 : Math.min(Math.max(value, lo), hi))
  const minX = margin - naturalRect.left
  const maxX = viewport.width - margin - (naturalRect.left + naturalRect.width)
  const minY = margin - naturalRect.top
  const maxY = viewport.height - margin - (naturalRect.top + naturalRect.height)
  return {
    x: clampAxis(offset.x, minX, maxX),
    y: clampAxis(offset.y, minY, maxY),
  }
}
