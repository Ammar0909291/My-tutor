import { describe, it, expect } from 'vitest'
import {
  criticiseFigure, checkRendering, checkGrounding, buildCriticPrompt, figureText,
} from '@/lib/teaching/visual/figureCritic'
import type { GeneratedFigure } from '@/lib/teaching/visual/visualEngine'

/**
 * THE GATE HAS TO BE UNABLE TO WAVE THINGS THROUGH.
 *
 * A judge is only a safety gate if its failure modes resolve to HOLD. The tests
 * that matter are therefore not "does it approve good figures" but the three
 * ways an approval could happen by accident: an unreachable judge, an
 * unreadable answer, and a figure that never should have reached the judge.
 */

const ctx = {
  conceptId: 'math.func.linear-function',
  title: 'Linear Function',
  description: 'A function whose graph is a straight line, written y = mx + c.',
  prerequisites: [],
}
const spec = (s: unknown): GeneratedFigure => ({ kind: 'spec', spec: s as never })
const good = spec({ type: 'graph', equation: '2x + 1', title: 'Linear Function' })
const allPass = async () => ({
  relevance: { verdict: 'pass', reason: 'r' },
  correctness: { verdict: 'pass', reason: 'c' },
  explanatoryValue: { verdict: 'pass', reason: 'e' },
})

describe('an approval must never happen by accident', () => {
  it('AN UNREACHABLE JUDGE HOLDS — it does not become an automatic approval', async () => {
    const r = await criticiseFigure(good, ctx, {
      generate: async () => { throw new Error('provider down') },
    })
    expect(r.decision).toBe('hold')
  })

  it('AN UNREADABLE ANSWER HOLDS', async () => {
    for (const reply of [null, {}, { relevance: { verdict: 'yes' } }, 'looks fine']) {
      const r = await criticiseFigure(good, ctx, { generate: async () => reply })
      expect(r.decision, JSON.stringify(reply)).toBe('hold')
    }
  })

  it('UNSURE ANYWHERE IS HOLD, never promote', async () => {
    const r = await criticiseFigure(good, ctx, {
      generate: async () => ({
        relevance: { verdict: 'pass', reason: '' },
        correctness: { verdict: 'unsure', reason: 'cannot tell' },
        explanatoryValue: { verdict: 'pass', reason: '' },
      }),
    })
    expect(r.decision).toBe('hold')
  })

  it('one fail is a reject even when everything else passes', async () => {
    const r = await criticiseFigure(good, ctx, {
      generate: async () => ({
        relevance: { verdict: 'pass', reason: '' },
        correctness: { verdict: 'fail', reason: 'asserts an order that does not exist' },
        explanatoryValue: { verdict: 'pass', reason: '' },
      }),
    })
    expect(r.decision).toBe('reject')
  })

  it('a clean figure with a clean judge promotes', async () => {
    const r = await criticiseFigure(good, ctx, { generate: allPass })
    expect(r.decision).toBe('promote')
    expect(r.confidence).toBe(1)
  })
})

describe('the static half decides alone, and costs nothing', () => {
  it('A FIGURE THAT CANNOT RENDER NEVER REACHES THE JUDGE', async () => {
    let called = false
    const r = await criticiseFigure(
      spec({ type: 'graph', equation: 'wobble(((', title: 'x' }), ctx,
      { generate: async () => { called = true; return allPass() } },
    )
    expect(r.decision).toBe('reject')
    expect(called).toBe(false)
    expect(r.judged).toBe(false)
  })

  it('catches the plots that would render as nothing', () => {
    expect(checkRendering(spec({ type: 'graph', equation: '5' })).verdict).toBe('fail')
    expect(checkRendering(spec({ type: 'graph', equation: '((' })).verdict).toBe('fail')
    expect(checkRendering(spec({ type: 'graph', equation: 'x^2' })).verdict).toBe('pass')
  })

  it('catches a number line that cannot hold its own highlights', () => {
    expect(checkRendering(spec({ type: 'number_line', start: 0, end: 5, highlight: [9] })).verdict).toBe('fail')
    expect(checkRendering(spec({ type: 'number_line', start: 5, end: 0 })).verdict).toBe('fail')
    expect(checkRendering(spec({ type: 'number_line', start: 0, end: 5, highlight: [3] })).verdict).toBe('pass')
  })

  it('AN UNLABELLED FIGURE IS UNGROUNDED — the tutor would have nothing to be faithful to', () => {
    expect(checkGrounding({
      kind: 'scene',
      scene: { id: 's', title: 'Viscosity', sceneType: 'diagram', steps: [{ objects: [
        { type: 'node', position: [0, 0, 0] },
      ] }] },
    }).verdict).toBe('fail')
  })
})

describe('the judge is not shown how the figure was made', () => {
  it('the prompt carries the concept and the payload, and no generation rules', () => {
    const p = buildCriticPrompt(good, ctx)
    expect(p).toContain('Linear Function')
    expect(p).toContain('2x + 1')
    expect(p).toContain('FAILING IS NORMAL')
    // The generator's own vocabulary must not leak in — a judge that knows the
    // author's constraints starts excusing them.
    expect(p).not.toContain('Choose by what the concept IS')
    expect(p).not.toContain('type":"none"')
  })

  it('reads every word a figure carries', () => {
    expect(figureText(spec({
      type: 'process_flow', title: 'T', steps: [{ title: 'a' }, { title: 'b', note: 'n' }],
    }))).toEqual(['T', 'a', 'b', 'n'])
  })
})

describe('the judge has a deadline', () => {
  it('A SLOW JUDGE HOLDS rather than holding the lesson open', async () => {
    const r = await criticiseFigure(good, ctx, {
      budgetMs: 20,
      generate: () => new Promise((resolve) => setTimeout(() => resolve(allPass()), 400)),
    })
    expect(r.decision).toBe('hold')
    expect(r.judged).toBe(false)
  })

  it('the same judgement inside the deadline is used', async () => {
    const r = await criticiseFigure(good, ctx, { budgetMs: 2000, generate: allPass })
    expect(r.decision).toBe('promote')
  })

  it('budget 0 disables the clock — nobody waits on an offline vetting pass', async () => {
    const r = await criticiseFigure(good, ctx, {
      budgetMs: 0,
      generate: () => new Promise((resolve) => setTimeout(() => resolve(allPass()), 60)),
    })
    expect(r.decision).toBe('promote')
  })
})

describe('text a renderer draws literally', () => {
  const spec2 = (s: unknown): GeneratedFigure => ({ kind: 'spec', spec: s as never })

  it('RAW LATEX IS REJECTED — these renderers print it, they do not typeset it', () => {
    // Found by running the real pipeline: a correct kinetic-energy graph came
    // back titled "Kinetic Energy ($E_k = \\frac{1}{2}mv^2$ for $m=2$ kg)".
    // The judge passed it, because it can read what the notation means.
    for (const title of [
      'Kinetic Energy ($E_k = \\frac{1}{2}mv^2$)',
      'Area = \\frac{1}{2}bh',
      'Angle \\theta between them',
      'Value \\(x\\)',
    ]) {
      const r = checkGrounding(spec2({ type: 'graph', equation: 'x^2', title }))
      expect(r.verdict, title).toBe('fail')
    }
  })

  it('ordinary notation is untouched', () => {
    for (const title of [
      'Kinetic Energy vs Velocity (m = 2 kg)',
      'y = mx + c',
      'Area of a triangle: 1/2 × base × height',
    ]) {
      expect(checkGrounding(spec2({ type: 'graph', equation: 'x^2', title })).verdict, title).toBe('pass')
    }
  })
})
