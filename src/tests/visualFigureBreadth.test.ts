import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  generateConceptFigure, validateGeneratedFigure, buildConceptFigurePrompt,
  isSpecAnchoredToConcept,
} from '@/lib/teaching/visual/visualEngine'
import { resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { SUPPORTED_VISUAL_TYPES } from '@/lib/visuals/visualSpec'

/**
 * NOT EVERY CONCEPT IS A 3D SCENE.
 *
 * Generation could emit exactly one form, so whole families of concepts —
 * functions, statistics, procedures — had no generatable figure at all while
 * four renderers sat live and unused. The model now chooses from a CLOSED set,
 * and the tests that matter are the boundaries of that set: an unrecognised
 * form is a rejection and never a fallback, and a spec reaches a learner
 * through exactly the same admission gate a scene does.
 */

const CONCEPT = 'math.func.linear-function'
const ORIGINAL = {
  flag: process.env.ENABLE_AI_SCENE_GENERATION,
  allow: process.env.VISUAL_AI_SCENE_ALLOWLIST,
  auto: process.env.VISUAL_AI_SCENE_AUTO,
}
beforeEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = 'true'
  process.env.VISUAL_AI_SCENE_ALLOWLIST = CONCEPT
  process.env.VISUAL_AI_SCENE_AUTO = CONCEPT
})
afterEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = ORIGINAL.flag
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ORIGINAL.allow
  process.env.VISUAL_AI_SCENE_AUTO = ORIGINAL.auto
})

const ctx = {
  conceptId: CONCEPT,
  title: 'Linear Function',
  description: 'A function whose graph is a straight line, written y = mx + c.',
  prerequisites: [],
}

const emptyCache = () => ({
  visualizationCache: {
    findUnique: async () => null,
    update: async () => undefined,
    create: async () => undefined,
  },
})

describe('the closed set', () => {
  it('the prompt offers every live renderer and no others', () => {
    const prompt = buildConceptFigurePrompt(ctx)
    for (const type of SUPPORTED_VISUAL_TYPES) expect(prompt).toContain(type)
    expect(prompt).toContain('scene')
  })

  it('accepts a graph spec', () => {
    const r = validateGeneratedFigure({ type: 'graph', equation: '2x + 1', title: 'Linear function' }, ctx)
    expect(r.ok).toBe(true)
    expect(r.ok && r.figure.kind).toBe('spec')
  })

  it('accepts a process flow', () => {
    const r = validateGeneratedFigure({
      type: 'process_flow', title: 'Graphing a linear function',
      steps: [{ title: 'Plot the intercept' }, { title: 'Use the slope to step' }],
    }, ctx)
    expect(r.ok).toBe(true)
  })

  it('accepts a scene when nothing simpler fits', () => {
    const r = validateGeneratedFigure({
      id: 's', title: 'Linear function', sceneType: 'diagram',
      steps: [{ narration: 'a straight line through two points', objects: [
        { type: 'point', position: [0, 1, 0], text: 'linear function' },
        { type: 'point', position: [1, 3, 0], text: 'straight line' },
        { type: 'arrow', from: [0, 1, 0], to: [1, 3, 0] },
      ] }],
    }, ctx)
    expect(r.ok).toBe(true)
    expect(r.ok && r.figure.kind).toBe('scene')
  })

  it('AN UNRECOGNISED FORM IS A REJECTION, never a fallback', () => {
    for (const raw of [
      { type: 'sankey', nodes: [] },
      { type: 'graph3d', equation: 'x' },
      { html: '<svg/>' },
      'a picture of a line',
      null,
    ]) {
      const r = validateGeneratedFigure(raw, ctx)
      expect(r.ok, `accepted ${JSON.stringify(raw)}`).toBe(false)
    }
  })

  it('a well-formed spec of the wrong concept is still rejected', () => {
    const r = validateGeneratedFigure({
      type: 'process_flow', title: 'Photosynthesis in a leaf',
      steps: [{ title: 'Light strikes the chloroplast' }, { title: 'Sugar is produced' }],
    }, ctx)
    expect(r.ok).toBe(false)
  })
})

describe('anchoring a spec, honestly', () => {
  it('prose is anchored to the concept', () => {
    expect(isSpecAnchoredToConcept(
      { type: 'process_flow', title: 'Drawing a linear function', steps: [{ title: 'Plot' }, { title: 'Step' }] },
      ctx,
    )).toBe(true)
  })

  it('AN EQUATION CARRIES NO VOCABULARY, and is not punished for it', () => {
    // A bare graph has no English to match. Demanding a lexical anchor here
    // would reject the representation itself — the same false-reject failure
    // measured on the scene path against our own gold-standard figures.
    expect(isSpecAnchoredToConcept({ type: 'graph', equation: '2x + 1' }, ctx)).toBe(true)
  })

  it('but prose about something else is caught', () => {
    expect(isSpecAnchoredToConcept(
      { type: 'process_flow', title: 'Mitosis', steps: [{ title: 'Prophase' }, { title: 'Telophase' }] },
      ctx,
    )).toBe(false)
  })
})

describe('a generated spec reaches the learner the same way a scene does', () => {
  it('is admitted, and carries the spec payload', async () => {
    const d = await resolveVisualForTurn(
      { message: 'show me a diagram', lessonConceptId: CONCEPT, subject: 'mathematics', learnerRequest: 'diagram' },
      {
        enabled: () => true,
        policy: 'auto',
        cacheClient: emptyCache(),
        generate: async () => ({ type: 'graph', equation: '2x + 1', title: 'Linear function' }),
      },
    )
    expect(d.graphical).toBe(true)
    expect(d.source).toBe('generated')
    expect(d.payload?.renderer).toBe('spec')
  })

  it('and is held, not served, under the reviewed policy', async () => {
    const d = await resolveVisualForTurn(
      { message: 'show me a diagram', lessonConceptId: CONCEPT, subject: 'mathematics', learnerRequest: 'diagram' },
      {
        enabled: () => true,
        policy: 'reviewed',
        cacheClient: emptyCache(),
        generate: async () => ({ type: 'graph', equation: '2x + 1', title: 'Linear function' }),
      },
    )
    expect(d.graphical).toBe(false)
    expect(d.provenance).toContain('held-for-review')
  })

  it('a rejected form yields NO FIGURE, never a substitute', async () => {
    const d = await resolveVisualForTurn(
      { message: 'show me a diagram', lessonConceptId: CONCEPT, subject: 'mathematics', learnerRequest: 'diagram' },
      {
        enabled: () => true,
        policy: 'auto',
        cacheClient: emptyCache(),
        generate: async () => ({ type: 'sankey', nodes: [] }),
      },
    )
    expect(d.graphical).toBe(false)
    expect(d.payload).toBeNull()
  })

  it('generation is still never consulted for a curated concept', async () => {
    let called = false
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: 'phys.mech.viscosity', subject: 'physics', learnerRequest: 'diagram' },
      { enabled: () => true, policy: 'auto', generate: async () => { called = true; return null } },
    )
    expect(d.source).toBe('registry')
    expect(called).toBe(false)
  })
})

describe('the same guarantees as the scene path', () => {
  it('an ineligible concept is not generated for', async () => {
    const r = await generateConceptFigure(ctx, { enabled: () => false })
    expect(r).toEqual({ ok: false, reason: 'flag-off' })
  })

  it('a slow provider yields budget-exceeded, not a hanging turn', async () => {
    const r = await generateConceptFigure(ctx, {
      enabled: () => true, policy: 'auto', budgetMs: 20, cacheClient: emptyCache(),
      generate: () => new Promise((resolve) => setTimeout(() => resolve({ type: 'graph', equation: 'x' }), 300)),
    })
    expect(r.ok).toBe(false)
    expect(r.ok === false && r.reason).toBe('budget-exceeded')
  })

  it('records an outcome for a rejection, exactly like scenes do', async () => {
    const seen: unknown[] = []
    await generateConceptFigure(ctx, {
      enabled: () => true, policy: 'reviewed', cacheClient: emptyCache(),
      outcomeSink: { record: async (o) => { seen.push(o) } },
      generate: async () => ({ type: 'sankey' }),
    })
    expect(seen).toHaveLength(1)
  })
})

describe('declining is an answer', () => {
  it('THE MODEL MAY SAY NO, and it is recorded as declining rather than failing', () => {
    const r = validateGeneratedFigure({ type: 'none' }, ctx)
    expect(r.ok).toBe(false)
    expect(r.ok === false && r.reason).toBe('no-suitable-form')
  })

  it('the prompt offers the decline, or the model fills the closed set anyway', () => {
    const prompt = buildConceptFigurePrompt(ctx)
    expect(prompt).toContain('"type":"none"')
  })

  it('A LIST IS NOT A PROCESS — the prompt says so in as many words', () => {
    // Measured 2026-08-10 against the real model: without this rule it drew the
    // seven SI base units and the characteristics of a living organism as
    // ordered process flows, asserting a sequence neither concept has. With it,
    // both are declined.
    const prompt = buildConceptFigurePrompt(ctx)
    expect(prompt).toContain('ORDER IS REAL')
    expect(prompt).toMatch(/are NOT processes/)
  })

  it('declining still yields NO FIGURE through the resolver, never a substitute', async () => {
    const d = await resolveVisualForTurn(
      { message: 'show me a diagram', lessonConceptId: CONCEPT, subject: 'mathematics', learnerRequest: 'diagram' },
      {
        enabled: () => true,
        policy: 'auto',
        cacheClient: emptyCache(),
        generate: async () => ({ type: 'none' }),
      },
    )
    expect(d.graphical).toBe(false)
    expect(d.provenance).toContain('no-suitable-form')
  })
})
