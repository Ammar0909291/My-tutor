import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const SRC = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

// The Tutor Max identity block lives in a FIXED-height header
// (PanelHeader tall = 60px). Reported on mobile: the name wrapped to two
// lines and "online" was clipped behind the chat panel. The invariant is
// arithmetic — the two stacked lines must fit 60px — so it is asserted as
// arithmetic, not as a screenshot.
const INFO = SRC.slice(SRC.indexOf('{/* Info —'), SRC.indexOf('{/* Waveform'))

describe('Tutor Max header identity fits its fixed-height header', () => {
  it('the header this block sits in is still a fixed 60px', () => {
    expect(SRC).toContain('height: tall ? 60 : 44,')
  })

  it('neither identity line may wrap — a wrap is what overflowed the header', () => {
    const nowrap = [...INFO.matchAll(/whiteSpace: 'nowrap'/g)]
    expect(nowrap.length).toBe(2) // the name and the status text
    const ellipsis = [...INFO.matchAll(/textOverflow: 'ellipsis'/g)]
    expect(ellipsis.length).toBe(2)
  })

  it('both lines pin an explicit line-height, so the stack height is computable', () => {
    const heights = [...INFO.matchAll(/fontSize: ([\d.]+),[\s\S]{0,200}?lineHeight: ([\d.]+),/g)]
      .map(([, size, lh]) => Number(size) * Number(lh))
    expect(heights.length).toBe(2)
    const marginTop = 2
    const total = heights.reduce((a, b) => a + b, 0) + marginTop
    // Must fit 60px with room to spare; the pre-fix wrapped name measured ~66.
    expect(total).toBeLessThan(60)
    expect(total).toBeLessThan(48)
  })

  it('the block keeps a minimum width so the name degrades to an ellipsis, not to nothing', () => {
    expect(INFO).toMatch(/minWidth: (9[0-9]|1\d\d)/)
  })

  it('the live status dot cannot be squeezed away by a long name', () => {
    const dot = INFO.slice(INFO.indexOf("background: 'var(--green)'") - 200)
    expect(dot).toContain('flexShrink: 0')
  })
})
