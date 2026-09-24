/**
 * THE LESSON OPENING RUNS THE CHAT TURN'S NO-FIGURE OUTPUT CHECKS, AND THE
 * PHANTOM-CLAIM STRIP NO LONGER FLATTENS PARAGRAPHS.
 *
 * Every lesson opens through /api/learn/lesson-init, not the chat route, and
 * that path ran only the figure-reference strip: an ASCII drawing, its
 * remnants, a "the diagram on your screen shows…" claim or a promise of
 * options could all reach a learner in an opening. Replaying the added checks
 * over 26 real production openings then found stripPhantomVisualClaims
 * re-joining every sentence with a space even when it removed nothing — every
 * paragraph break flattened, on openings and on no-figure chat turns alike.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { stripPhantomVisualClaims } from '@/lib/teaching/visualRegistry'

describe('stripPhantomVisualClaims keeps the text it does not change', () => {
  const opening = '**Lesson: The Cell Cycle**\n\nIn this lesson we’ll explore how a single cell grows. By the end you’ll be able to describe each stage.\n\nImagine a **traffic light** controlling the cell.'

  it('an opening with no claim comes back byte-identical', () => {
    expect(stripPhantomVisualClaims(opening)).toBe(opening)
  })

  it('when a claim IS removed, the other paragraphs keep their breaks', () => {
    const t = 'First idea here.\n\nThe diagram on your screen shows the three phases. Each phase matters.\n\nLast paragraph.'
    expect(stripPhantomVisualClaims(t)).toBe('First idea here.\n\nEach phase matters.\n\nLast paragraph.')
  })

  it('a text that is only a claim is returned unchanged rather than emptied', () => {
    const t = 'The diagram on your screen shows the answer.'
    expect(stripPhantomVisualClaims(t)).toBe(t)
  })
})

describe('lesson-init applies the chat turn\'s no-figure output checks', () => {
  const src = readFileSync(join(process.cwd(), 'src/app/api/learn/lesson-init/route.ts'), 'utf8')
  it('ASCII guard, remnant re-check, pointer-only fallback, phantom claims, missing options, residual tags', () => {
    const block = src.slice(src.indexOf('THE SAME OUTPUT CHECKS THE CHAT TURN RUNS'))
    for (const call of [
      'stripUnbackedAsciiDiagram(before, false)',
      'stripUnbackedFigureReferences(text, false)',
      'pointerOnlyFallback(node.title, node.description)',
      'stripPhantomVisualClaims(text)',
      'dropSentencesPointingAtMissingOptions(text)',
      'stripResidualMachineTags(text)',
    ]) expect(block, call).toContain(call)
  })
  it('never ships an empty opening', () => {
    expect(src).toMatch(/if \(text\.trim\(\)\.length > 0 && text !== before\)/)
  })
})
