import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { rebuildScene } from '@/lib/teaching/visual/parametricScenes'
import { buildCircuitScene, type CircuitParams } from '@/lib/teaching/sceneGenerators/electricCircuit.pure'
import { deriveExplainer } from '@/lib/teaching/visual/explainer'
import { workingLines } from '@/lib/teaching/visual/representation'
import {
  redactExplainer, redactText, stageView, withheldValues, type SceneMode,
} from '@/lib/teaching/visual/sceneStage'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

/**
 * THE INVARIANT:  figureOnlyAssessment  =>  !answerLeakage
 *
 * Measured in production on an interactive series circuit. Assess mode said,
 * truthfully, "Every stated value is hidden. Read the figure alone. (5 hidden)"
 * — while the frame around that same figure printed the title "Series circuit —
 * R_total = 76 Ω" and the panel "…Total resistance is 76 Ω, giving a current of
 * 0.16 A through every resistor."
 *
 * These tests run the REAL content pipeline — the real generator, the real
 * deriveExplainer, the real stageView — because the bug lived in the seam
 * between two of them and no mock of either could reproduce it.
 */

const params = (connection: 'series' | 'parallel', voltage: number, ...rs: number[]): CircuitParams =>
  ({ connection, voltage, components: rs.map((value) => ({ type: 'resistor' as const, value, unit: 'Ω' })) })

/** Everything the frame would put in front of the learner, as one bag of prose. */
function renderedProse(spec: SceneSpec, mode: SceneMode): string[] {
  const ex = redactExplainer(deriveExplainer(spec), spec, mode)
  const view = stageView(spec, Infinity, mode)
  const narration = mode === 'explain'
    ? view.narration
    : redactText(view.narration ?? undefined, withheldValues(spec, mode))
  return [
    ex.title,
    ex.givens,
    ex.result?.expression, ex.result?.value,
    ...(ex.panels ?? []).flatMap((p) => [p.heading, p.body, ...(p.lines ?? [])]),
    ex.insight?.heading, ex.insight?.note, ...(ex.insight?.bullets ?? []),
    ...workingLines(ex),
    narration,
  ].filter((s): s is string => typeof s === 'string' && s.length > 0)
}

/** Numbers the figure is hiding this turn — the definition of a leaked answer. */
function leaks(spec: SceneSpec, mode: SceneMode): { text: string; value: number }[] {
  const hidden = withheldValues(spec, mode)
  const found: { text: string; value: number }[] = []
  for (const text of renderedProse(spec, mode)) {
    for (const m of text.matchAll(/-?\d+(?:\.\d+)?/g)) {
      const n = Number(m[0])
      const hit = hidden.find((v) => Math.abs(v - n) < 5e-3)
      if (hit !== undefined) found.push({ text, value: hit })
    }
  }
  return found
}

const CASES: [string, CircuitParams][] = [
  ['the reported state: series 12 V, R1 = 1 Ω, R2 = 75 Ω', params('series', 12, 1, 75)],
  ['the earlier state: series 12 V, R1 = 10 Ω, R2 = 20 Ω', params('series', 12, 10, 20)],
  ['series, three resistors', params('series', 24, 10, 20, 30)],
  ['parallel, two branches', params('parallel', 12, 10, 20)],
]

describe('figureOnlyAssessment => !answerLeakage', () => {
  it.each(CASES)('%s — assess mode leaks nothing the figure hides', (_n, p) => {
    const spec = buildCircuitScene(p)
    expect(withheldValues(spec, 'assess').length).toBeGreaterThan(0) // the mode really is hiding things
    expect(leaks(spec, 'assess')).toEqual([])
  })

  it.each(CASES)('%s — practice mode leaks no withheld answer either', (_n, p) => {
    expect(leaks(buildCircuitScene(p), 'practice')).toEqual([])
  })

  it('the exact reported sentence is gone, and it was there before', () => {
    const spec = buildCircuitScene(params('series', 12, 1, 75))
    const raw = deriveExplainer(spec)
    // The defect, still present in the underived content — this is what the
    // learner was shown, and it is why the fix is a redaction and not a delete.
    expect(JSON.stringify(raw)).toContain('Total resistance is 76 Ω, giving a current of 0.16 A')
    expect(renderedProse(spec, 'assess').join(' ')).not.toContain('76')
    expect(renderedProse(spec, 'assess').join(' ')).not.toContain('0.16')
  })

  it('the title survives redaction rather than disappearing', () => {
    const spec = buildCircuitScene(params('series', 12, 1, 75))
    const ex = redactExplainer(deriveExplainer(spec), spec, 'assess')
    expect(ex.title).toBe('Series circuit')
  })
})

describe('NEGATIVE CONTROLS — the restriction applies to assessment only', () => {
  it.each(CASES)('%s — explain mode is fully informative and states the result', (_n, p) => {
    const spec = buildCircuitScene(p)
    const ex = redactExplainer(deriveExplainer(spec), spec, 'explain')
    expect(ex).toEqual(deriveExplainer(spec))   // untouched, byte for byte
    expect(leaks(spec, 'explain')).toEqual([])  // nothing is withheld, so nothing can leak
    expect(renderedProse(spec, 'explain').join(' ')).toContain('Total resistance')
  })

  it('explain mode keeps the numbers assess mode removes', () => {
    const spec = buildCircuitScene(params('series', 12, 1, 75))
    expect(renderedProse(spec, 'explain').join(' ')).toContain('76')
    expect(renderedProse(spec, 'explain').join(' ')).toContain('0.16')
  })

  it('a value the figure still SHOWS may be restated — the rule is not "hide everything"', () => {
    // The 12 V source label carries no relation, so assess mode leaves it in
    // the figure; prose may therefore name it without leaking anything.
    const spec = buildCircuitScene(params('series', 12, 1, 75))
    expect(withheldValues(spec, 'assess')).not.toContain(12)
    expect(renderedProse(spec, 'assess').join(' ')).toContain('12 V')
  })
})

describe('STATE CONSISTENCY — assessment prose follows the current figure', () => {
  it('no value from a previous simulation state survives a parameter change', () => {
    const before = rebuildScene('electric_circuit', { voltage: 12, r1: 10, r2: 20 })!
    const after = rebuildScene('electric_circuit', { voltage: 12, r1: 1, r2: 75 })!
    // The stale pair from the first screenshot.
    for (const stale of ['30', '0.4']) {
      expect(renderedProse(after, 'explain').join(' ')).not.toContain(`R_total = ${stale}`)
    }
    expect(renderedProse(before, 'explain').join(' ')).toContain('30')
    expect(renderedProse(after, 'explain').join(' ')).toContain('76')
    // And the assessment surface of the NEW state leaks nothing of it.
    expect(leaks(after, 'assess')).toEqual([])
  })

  it('the frame is derived from the CURRENT figure, so it cannot go stale', () => {
    // The component recomputes both from `drawn`; assert the wiring, since a
    // memo keyed on a stale value is exactly how this class of bug returns.
    const src = readFileSync(join(process.cwd(), 'src/components/school/visuals/ExplainerFigure.tsx'), 'utf8')
    expect(src).toContain('redactExplainer(explainerFull, drawn, redactionMode)')
    expect(src).toContain('[explainerFull, drawn, redactionMode]')
    expect(src).toContain('deriveExplainer(shown)')
  })

  it('the narration rendered is the redacted one, not the raw step text', () => {
    const src = readFileSync(join(process.cwd(), 'src/components/school/visuals/ExplainerFigure.tsx'), 'utf8')
    expect(src).toContain('{walking && narration && <p className={styles.narration}')
    expect(src).not.toContain('{walking && stageState.narration &&')
  })
})
