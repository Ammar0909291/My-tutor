import { describe, it, expect } from 'vitest'
import { MANUAL_SCROLL_COOLDOWN_MS, isComfortablyVisible, shouldAutoScroll } from '@/lib/narration/scrollFollow'

/**
 * F/G — the active segment auto-scrolls into view, but a learner's manual
 * scroll is never fought on every tick. Pure numeric logic — no real DOM
 * scrolling is needed to prove the arbitration rule itself is correct.
 */

describe('F — auto-scroll decision', () => {
  it('with no manual scroll ever recorded, auto-scroll is always allowed', () => {
    expect(shouldAutoScroll(Date.now(), null)).toBe(true)
  })

  it('a segment already comfortably inside the viewport needs no scroll at all', () => {
    const container = { top: 0, bottom: 600 }
    const target = { top: 50, bottom: 100 }
    expect(isComfortablyVisible(target, container, 24)).toBe(true)
  })

  it('a segment just below the visible area (out of view) is NOT comfortably visible', () => {
    const container = { top: 0, bottom: 600 }
    const target = { top: 650, bottom: 700 }
    expect(isComfortablyVisible(target, container, 24)).toBe(false)
  })

  it('a segment within the margin of the edge (approaching, not yet outside) is still flagged for scroll', () => {
    const container = { top: 0, bottom: 600 }
    const target = { top: 590, bottom: 620 } // bottom exceeds container.bottom - margin
    expect(isComfortablyVisible(target, container, 24)).toBe(false)
  })
})

describe('G — manual scrolling is not continuously overridden', () => {
  it('immediately after a manual scroll, auto-scroll is suppressed', () => {
    const now = Date.now()
    expect(shouldAutoScroll(now, now)).toBe(false)
    expect(shouldAutoScroll(now + 500, now)).toBe(false)
  })

  it('auto-scroll resumes once the cooldown has fully elapsed', () => {
    const now = Date.now()
    expect(shouldAutoScroll(now + MANUAL_SCROLL_COOLDOWN_MS - 1, now)).toBe(false)
    expect(shouldAutoScroll(now + MANUAL_SCROLL_COOLDOWN_MS, now)).toBe(true)
    expect(shouldAutoScroll(now + MANUAL_SCROLL_COOLDOWN_MS + 5000, now)).toBe(true)
  })

  it('a custom cooldown is honoured (for callers that want a different threshold)', () => {
    const now = Date.now()
    expect(shouldAutoScroll(now + 100, now, 200)).toBe(false)
    expect(shouldAutoScroll(now + 200, now, 200)).toBe(true)
  })

  it('the learner never "loses their place": while suppressed, repeated segment changes keep returning false, never accidentally true from a stale check', () => {
    const scrollAt = Date.now()
    for (let tick = 0; tick < 10; tick++) {
      const simulatedNow = scrollAt + tick * 200 // well under the 4s cooldown
      expect(shouldAutoScroll(simulatedNow, scrollAt)).toBe(false)
    }
  })
})
