import { describe, it, expect } from 'vitest'
import { nextDragOffset, clampDragOffset, ZERO_DRAG_OFFSET, type DragRect, type ViewportSize } from '@/lib/learn/quickCheckDrag'

const VIEWPORT: ViewportSize = { width: 1024, height: 768 }
// The panel's default CSS position, centred horizontally, 88px above the
// composer, matching .quickCheckFloating's real geometry roughly.
const CENTERED_RECT: DragRect = { left: 292, top: 500, width: 440, height: 200 }

describe('quickCheckDrag — pure offset math', () => {
  it('ZERO_DRAG_OFFSET reproduces the untouched default position', () => {
    expect(ZERO_DRAG_OFFSET).toEqual({ x: 0, y: 0 })
  })

  it('nextDragOffset composes a pointer delta onto the offset the gesture started from', () => {
    expect(nextDragOffset({ x: 10, y: -5 }, 20, 30)).toEqual({ x: 30, y: 25 })
    expect(nextDragOffset(ZERO_DRAG_OFFSET, -15, 8)).toEqual({ x: -15, y: 8 })
  })

  describe('clampDragOffset — the panel can never be dragged fully, or even partially, off-screen', () => {
    it('a small, in-bounds drag is returned unchanged', () => {
      const offset = { x: 50, y: -30 }
      expect(clampDragOffset(offset, CENTERED_RECT, VIEWPORT)).toEqual(offset)
    })

    it('dragging far to the right clamps so the panel stays within the margin of the right edge', () => {
      const clamped = clampDragOffset({ x: 5000, y: 0 }, CENTERED_RECT, VIEWPORT, 12)
      const finalLeft = CENTERED_RECT.left + clamped.x
      const finalRight = finalLeft + CENTERED_RECT.width
      expect(finalRight).toBeLessThanOrEqual(VIEWPORT.width - 12 + 0.001)
      expect(finalLeft).toBeGreaterThanOrEqual(0) // never crosses back past the left edge either
    })

    it('dragging far to the left clamps so the panel stays within the margin of the left edge', () => {
      const clamped = clampDragOffset({ x: -5000, y: 0 }, CENTERED_RECT, VIEWPORT, 12)
      const finalLeft = CENTERED_RECT.left + clamped.x
      expect(finalLeft).toBeGreaterThanOrEqual(12 - 0.001)
    })

    it('dragging far up/down clamps so the panel stays within the margin of the top/bottom edge', () => {
      const up = clampDragOffset({ x: 0, y: -5000 }, CENTERED_RECT, VIEWPORT, 12)
      expect(CENTERED_RECT.top + up.y).toBeGreaterThanOrEqual(12 - 0.001)
      const down = clampDragOffset({ x: 0, y: 5000 }, CENTERED_RECT, VIEWPORT, 12)
      const finalBottom = CENTERED_RECT.top + down.y + CENTERED_RECT.height
      expect(finalBottom).toBeLessThanOrEqual(VIEWPORT.height - 12 + 0.001)
    })

    it('a diagonal extreme drag is clamped on both axes simultaneously — never off-screen in either dimension', () => {
      const clamped = clampDragOffset({ x: 9999, y: 9999 }, CENTERED_RECT, VIEWPORT, 12)
      const left = CENTERED_RECT.left + clamped.x
      const top = CENTERED_RECT.top + clamped.y
      const right = left + CENTERED_RECT.width
      const bottom = top + CENTERED_RECT.height
      expect(left).toBeGreaterThanOrEqual(12 - 0.001)
      expect(top).toBeGreaterThanOrEqual(12 - 0.001)
      expect(right).toBeLessThanOrEqual(VIEWPORT.width - 12 + 0.001)
      expect(bottom).toBeLessThanOrEqual(VIEWPORT.height - 12 + 0.001)
    })

    it('a panel wider than the viewport minus margins falls back to centering that axis rather than an arbitrary edge', () => {
      const hugeRect: DragRect = { left: 0, top: 500, width: 2000, height: 200 }
      const tinyViewport: ViewportSize = { width: 400, height: 768 }
      const clamped = clampDragOffset({ x: 300, y: 0 }, hugeRect, tinyViewport, 12)
      // minX would be 12, maxX would be 400-12-2000 = -1612 (maxX < minX) —
      // clampAxis must not throw and must not return a value outside a
      // sane range; it centers instead of picking either bound blindly.
      expect(clamped.x).toBe((12 + (400 - 12 - 2000)) / 2)
      expect(Number.isFinite(clamped.x)).toBe(true)
    })

    it('zero offset on an already-centered rect that fits comfortably stays put', () => {
      expect(clampDragOffset(ZERO_DRAG_OFFSET, CENTERED_RECT, VIEWPORT)).toEqual(ZERO_DRAG_OFFSET)
    })
  })
})
