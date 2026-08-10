import { describe, it, expect } from 'vitest'
import {
  criticiseFigure, checkClaimSupport, claimsComparison, buildCriticPrompt,
} from '@/lib/teaching/visual/figureCritic'
import type { GeneratedFigure } from '@/lib/teaching/visual/visualEngine'

/**
 * A TITLE IS A CLAIM ABOUT THE PICTURE, NOT ABOUT THE SUBJECT.
 *
 * Measured on a random 30-topic cohort: math.num.numerical-differentiation
 * generated a graph titled "Numerical Differentiation: Tangent vs Secant
 * Approximations" whose payload was `y = x^2` and nothing else. No tangent, no
 * secant. It passed relevance, correctness AND explanatory value — because all
 * three ask about the CONCEPT, and none asked whether the words match the
 * drawing. The tutor would then describe two lines the learner cannot see.
 *
 * These pin the rule that closes it, and — just as importantly — pin that it
 * does not start rejecting ordinary descriptive titles.
 */

const spec = (s: unknown): GeneratedFigure => ({ kind: 'spec', spec: s as never })

const ctx = {
  conceptId: 'math.num.numerical-differentiation',
  title: 'Numerical Differentiation',
  description: 'Approximating a derivative from sampled values using finite differences.',
  prerequisites: [],
}

const judgeAllPass = async () => ({
  relevance: { verdict: 'pass', reason: '' },
  correctness: { verdict: 'pass', reason: '' },
  explanatoryValue: { verdict: 'pass', reason: '' },
  claimSupport: { verdict: 'pass', reason: '' },
})

describe('the measured failure', () => {
  /** The exact payload and title the engine produced. */
  const THE_FAILURE = spec({
    type: 'graph',
    equation: 'x^2',
    title: 'Numerical Differentiation: Tangent vs Secant Approximations',
  })

  it('MUST NOT PASS — the title compares two lines the figure does not draw', async () => {
    // Even with a judge that approves everything, the deterministic layer
    // refuses: a graph draws one curve, so a comparison is not on screen.
    const r = await criticiseFigure(THE_FAILURE, ctx, { generate: judgeAllPass })
    expect(r.decision).not.toBe('promote')
    expect(r.dimensions.claimSupport.verdict).toBe('fail')
  })

  it('is caught for FREE — the judge is never even called', async () => {
    let called = false
    const r = await criticiseFigure(THE_FAILURE, ctx, {
      generate: async () => { called = true; return judgeAllPass() },
    })
    expect(r.decision).toBe('reject')
    expect(called).toBe(false)
  })
})

describe('POSITIVE CONTROL — the same concept, drawn honestly, still passes', () => {
  it('a figure that really contains the two things it names can PASS', async () => {
    // A process flow whose steps ARE the tangent/secant comparison: four drawn
    // elements, so the comparison is genuinely on screen.
    const honest = spec({
      type: 'process_flow',
      title: 'Numerical Differentiation: Secant vs Tangent',
      steps: [
        { title: 'Pick a point x and a step h' },
        { title: 'Draw the secant through (x, f(x)) and (x+h, f(x+h))' },
        { title: 'Its slope is the finite difference' },
        { title: 'As h shrinks the secant approaches the tangent' },
      ],
    })
    expect(checkClaimSupport(honest).verdict).toBe('pass')
    const r = await criticiseFigure(honest, ctx, { generate: judgeAllPass })
    expect(r.decision).toBe('promote')
  })

  it('an ordinary graph with an ordinary descriptive title still passes', async () => {
    const plain = spec({ type: 'graph', equation: 'x^2', title: 'The function f(x) = x²' })
    expect(checkClaimSupport(plain).verdict).toBe('pass')
    const r = await criticiseFigure(plain, ctx, { generate: judgeAllPass })
    expect(r.decision).toBe('promote')
  })
})

describe('the deterministic rule is generic, not topic-shaped', () => {
  it('fires on any comparison phrasing, on any subject', () => {
    for (const title of [
      'Ionic vs Covalent Bonding',
      'Kinetic Energy versus Potential Energy',
      'Weight compared to Mass',
      'Series compared with Parallel Circuits',
      'Mitosis against Meiosis',
      'Speed vs. Velocity',
    ]) {
      expect(claimsComparison(title), title).toBe(true)
      expect(checkClaimSupport(spec({ type: 'graph', equation: 'x', title })).verdict, title).toBe('fail')
    }
  })

  it('DOES NOT fire on ordinary descriptive titles — false rejections cost coverage', () => {
    for (const title of [
      'Kinetic Energy as a Function of Velocity',
      'The Water Cycle',
      'Stoichiometric Calculation Steps',
      'Universal Gravitation',
      'Conversation and Diversity',       // contains "vers" but not "versus"
      'Adversarial Examples',             // contains "vers" inside a word
    ]) {
      expect(claimsComparison(title), title).toBe(false)
    }
  })

  it('a comparison IS allowed when the figure really draws two or more things', () => {
    const flow = spec({
      type: 'process_flow', title: 'Ionic vs Covalent Bonding',
      steps: [{ title: 'Ionic: electrons transferred' }, { title: 'Covalent: electrons shared' }],
    })
    expect(checkClaimSupport(flow).verdict).toBe('pass')

    const line = spec({ type: 'number_line', start: 0, end: 10, highlight: [3, 7], title: 'A vs B' })
    expect(checkClaimSupport(line).verdict).toBe('pass')
  })

  it('a number line claiming a comparison but marking nothing fails', () => {
    expect(checkClaimSupport(
      spec({ type: 'number_line', start: 0, end: 10, title: 'Rational vs Irrational' }),
    ).verdict).toBe('fail')
  })

  it('a scene with real objects can carry a comparison title', () => {
    const scene: GeneratedFigure = {
      kind: 'scene',
      scene: {
        id: 's', title: 'Solid vs Liquid Packing', sceneType: 'comparison',
        steps: [{ narration: 'two arrangements', objects: [
          { type: 'node', position: [-1, 0, 0], text: 'solid' },
          { type: 'node', position: [1, 0, 0], text: 'liquid' },
        ] }],
      },
    }
    expect(checkClaimSupport(scene).verdict).toBe('pass')
  })
})

describe('the semantic half, for claims no schema can settle', () => {
  it('the judge is asked about claim support explicitly', () => {
    const p = buildCriticPrompt(spec({ type: 'graph', equation: 'x', title: 'T' }), ctx)
    expect(p).toContain('claimSupport')
    // The prompt wraps, so assert on phrases that sit on one line.
    expect(p).toContain('CLAIMS ABOUT THE')
    expect(p).toContain('be in the data')
  })

  it('A JUDGED claimSupport FAILURE rejects, even when the mechanical check passed', async () => {
    // "Tangent line at x = 2" claims one extra object, not a comparison — the
    // schema cannot settle it, so the judge has to.
    const subtle = spec({ type: 'graph', equation: 'x^2', title: 'Tangent line to f at x = 2' })
    expect(checkClaimSupport(subtle).verdict).toBe('pass')   // mechanically silent
    const r = await criticiseFigure(subtle, ctx, {
      generate: async () => ({
        relevance: { verdict: 'pass', reason: '' },
        correctness: { verdict: 'pass', reason: '' },
        explanatoryValue: { verdict: 'pass', reason: '' },
        claimSupport: { verdict: 'fail', reason: 'no tangent line is present in the data' },
      }),
    })
    expect(r.decision).toBe('reject')
  })

  it('a reply missing claimSupport is unreadable — and unreadable is HOLD', async () => {
    const r = await criticiseFigure(spec({ type: 'graph', equation: 'x^2', title: 'f' }), ctx, {
      generate: async () => ({
        relevance: { verdict: 'pass', reason: '' },
        correctness: { verdict: 'pass', reason: '' },
        explanatoryValue: { verdict: 'pass', reason: '' },
      }),
    })
    expect(r.decision).toBe('hold')
  })
})
