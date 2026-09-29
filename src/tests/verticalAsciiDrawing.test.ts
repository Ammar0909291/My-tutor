/**
 * AN UNFENCED VERTICAL ASCII DRAWING IS REMOVED WHOLE (2026-09-28).
 *
 * Live QA, phys.astro.gravitational-waves, no figure available: one reply
 * shipped "a garbled block of repeated | characters"; a re-run shipped an
 * orphan "Mirror" line after Pass 5 removed the arm drawn beneath it. The model
 * drew an interferometer without a fence or an "ASCII" lead-in, and no pass
 * recognised vertical strokes (Pass 5 knows only horizontal connector runs).
 * Pass 4b removes a paragraph that contains a pure stroke line and consists
 * only of drawing-shaped lines, together with its "Picture it like this:"
 * lead-in — and never touches prose, tables, rules, ellipses or fences.
 */
import { describe, expect, it } from 'vitest'
import { isStrokeLine, stripUnbackedAsciiDiagram } from '@/lib/teaching/asciiDiagramGuard'

const strip = (t: string) => stripUnbackedAsciiDiagram(t, false).text

describe('vertical drawings go, with their labels', () => {
  it('an interferometer: label, a column of bars, a labelled arm', () => {
    const t = "I don't have a picture for this one, so I'll explain it in words.\n\n        Mirror\n          |\n          |\nLaser --> Beam splitter ------ Mirror\n\nOne arm stretches while the other squeezes."
    expect(strip(t)).toBe("I don't have a picture for this one, so I'll explain it in words.\n\nOne arm stretches while the other squeezes.")
  })

  it('a bare block of bars (the reported garble)', () => {
    expect(strip('Here is the idea.\n\n|      |      |\n|      |      |\n\nThe arms stretch in turn.'))
      .toBe('Here is the idea.\n\nThe arms stretch in turn.')
  })

  it('arrow glyphs count as strokes, and no orphan label is left behind', () => {
    expect(strip('It works like this.\n\nMirror\n  ↑\nLaser ----> Splitter ----> Mirror\n\nThe beams recombine.'))
      .toBe('It works like this.\n\nThe beams recombine.')
  })

  it('a one-line lead-in that names the picture goes with it', () => {
    expect(strip('Picture it like this:\n\n   Arm 1\n     |\n     +-------- Arm 2\n\nOne arm lengthens.'))
      .toBe('One arm lengthens.')
  })
})

describe('everything else is untouched', () => {
  const same = (t: string) => expect(stripUnbackedAsciiDiagram(t, false)).toEqual({ text: t, stripped: false, removedBlocks: 0 })

  it('a markdown table', () => same('| Quantity | Value |\n|---|---|\n| strain | 1e-21 |\n\nThat is tiny.'))
  it('a horizontal rule', () => same('First idea.\n\n---\n\nSecond idea.'))
  it('an ellipsis line', () => same('Wait for it...\n\n...\n\nThere it is.'))
  // (A stroke-only line INSIDE a fence is Pass 1/2's business — pointer decoration.)
  it('a shell pipe inside a fence', () => same('Run this:\n\n```\nls | grep txt\n```\n\nDone.'))
  it('a paragraph that mixes a stray bar with real sentences', () => same('The arm is long.\n|\nIt stretches by a tiny amount.'))

  it('nothing is removed while a real figure is on screen', () => {
    const t = 'See the figure.\n\n|      |\n|      |\n\nThe arms stretch.'
    expect(stripUnbackedAsciiDiagram(t, true).text).toBe(t)
  })
})

describe('isStrokeLine', () => {
  it('strokes only — never letters, rules, separators or ellipses', () => {
    for (const s of ['|', '  |   |', '^', '/ \\', '↑', '|  ^  |']) expect(isStrokeLine(s), s).toBe(true)
    for (const s of ['---', '***', '|---|---|', '| :--- | ---: |', '...', 'x | y', '|a|']) expect(isStrokeLine(s), s).toBe(false)
  })
})
