import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * ── LEARNER MESSAGES LANDED IN THE MIDDLE OF THE CHAT, NOT THE RIGHT EDGE ──
 *
 * REPORTED: Tutor Max messages were correctly left-aligned, but the
 * learner's own messages ("Got it") appeared around the MIDDLE of the chat
 * area instead of flush against the right edge.
 *
 * ROOT CAUSE, confirmed by rendering the real style objects in a browser
 * (not guessed): the per-message row's `className` capped every non-canvas
 * row — tutor AND learner alike — to `md:w-[70%]` on desktop (added by an
 * earlier, unrelated "Tutor Max compact width" fix that was reasoned about
 * only for the tutor's own reading column). A width with no auto-margin
 * sits flush at the START (left) of its flex-column parent, so capping the
 * row to 70% left-anchors the WHOLE ROW at the left. The learner bubble's
 * own `alignItems: 'flex-end'` then only had that narrowed 70%-wide box to
 * push against — landing the bubble around the 70% mark of the chat panel
 * (visually "the middle"), not the panel's true right edge.
 *
 * THE FIX: `isUser` is excluded from the 70% cap — the learner's row is
 * always `w-full`, so `alignItems: 'flex-end'` reaches the messages
 * container's own right padding, matching the desired reference (Tutor Max
 * left, learner far right). Nothing else changed: the bubble itself keeps
 * its own `maxWidth: '75%'` (content-sized, never stretched), colors,
 * border-radius, spacing, and the tutor's 70% reading-width reduction is
 * untouched.
 */

const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8')
const TSX = read('src/components/learn/LessonScreen.tsx')

const rowStart = TSX.indexOf('<div key={msg.id}')
const rowBlockEnd = TSX.indexOf('{/* Tutor avatar row', rowStart)
const ROW_BLOCK = TSX.slice(rowStart, rowBlockEnd)

const bubbleStart = TSX.indexOf('{/* Student bubble */}')
const bubbleBlockEnd = TSX.indexOf('</div>\n                )', bubbleStart)
const BUBBLE_BLOCK = TSX.slice(bubbleStart, bubbleBlockEnd)

describe('per-message row: learner rows are never capped to the tutor reading width', () => {
  it('the row className gives the learner row w-full unconditionally — the 70% desktop cap applies to non-canvas TUTOR rows only', () => {
    expect(ROW_BLOCK).toContain(
      "className={isUser ? 'w-full' : hasCanvasVisual ? undefined : 'w-full md:w-[70%]'}",
    )
  })

  it('the row keeps its column-flex + role-based cross-axis alignment (flex-end for the learner, flex-start for the tutor)', () => {
    expect(ROW_BLOCK).toContain(
      "display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start',",
    )
  })

  it('canvas (figure) rows are unaffected — still forced to width:100% regardless of role', () => {
    expect(ROW_BLOCK).toContain("...(hasCanvasVisual ? { width: '100%' } : null)")
  })

  it('no centering margin was reintroduced on the row (the exact prior regression this whole width scheme exists to avoid)', () => {
    const styleStart = ROW_BLOCK.indexOf('style={{')
    const styleObject = ROW_BLOCK.slice(styleStart, ROW_BLOCK.indexOf('}}>', styleStart))
    expect(styleObject).not.toMatch(/margin:\s*['"]0 auto['"]/)
  })
})

describe('learner bubble: content-sized, never stretched, right-anchored via the row alone', () => {
  it('the learner bubble wrapper keeps its own maxWidth: 75% — it is never told to stretch to fill the row', () => {
    expect(BUBBLE_BLOCK).toContain("maxWidth: '75%'")
    expect(BUBBLE_BLOCK).not.toMatch(/width:\s*['"]100%['"]/)
  })

  it('the learner bubble carries no independent alignment of its own — positioning comes entirely from the row\'s alignItems: flex-end', () => {
    expect(BUBBLE_BLOCK).not.toMatch(/justifyContent/)
    expect(BUBBLE_BLOCK).not.toMatch(/marginLeft:\s*['"]auto['"]/)
    expect(BUBBLE_BLOCK).not.toMatch(/alignSelf/)
  })

  it('bubble styling (colors, border-radius, spacing, timestamp) is unchanged by this fix', () => {
    expect(BUBBLE_BLOCK).toContain("padding: '12px 14px', borderRadius: '18px 18px 4px 18px', fontSize: 15.6, lineHeight: 1.5,")
    expect(BUBBLE_BLOCK).toContain('background: `linear-gradient(135deg, ${UI.indigo}, ${UI.indigoDark})`, color: \'#fff\',')
    expect(BUBBLE_BLOCK).toContain("textAlign: 'right'")
  })
})

describe('tutor messages remain exactly as before: left-aligned, unaffected by this fix', () => {
  it('the tutor reading-width reduction (70% on desktop) is still present for non-canvas tutor rows', () => {
    expect(ROW_BLOCK).toContain("hasCanvasVisual ? undefined : 'w-full md:w-[70%]'")
  })

  it('the tutor bubble (Card) keeps its own maxWidth of 90% and left-side placement, untouched by the row fix', () => {
    const cardIdx = TSX.indexOf("maxWidth: hasCanvasVisual ? '100%' : '90%'")
    expect(cardIdx).toBeGreaterThan(-1)
  })
})

describe('scope: presentation-only — no teaching/runtime/grading/API/DB identifiers touched by this fix', () => {
  it('the row and bubble blocks reference no teaching, grading, mastery, or API surface', () => {
    for (const block of [ROW_BLOCK, BUBBLE_BLOCK]) {
      expect(block).not.toMatch(/mastery|grade|correctIndex|fetch\(|prisma|api\//i)
    }
  })
})
