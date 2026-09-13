/**
 * PCD-040 — a figure that taught a misconception, and the prose that repeated it.
 *
 * chem.coord.stability (#106). The audit recorded the tutor building a flawed
 * analogy — "imagine a bar chart… the taller bar is called the mode" — to explain
 * thermodynamic stability, with a matching "Frequency Distribution: log Kf" chart,
 * and read the causality as prose-first.
 *
 * It is the other way round. The binding is STATIC: chem.coord.stability has
 * always resolved to the statistics_bar_chart generator, whose chrome is
 * hardcoded — "Frequency Distribution", "is the mode — the most frequently
 * occurring category", "Σ(index×frequency) / Σfrequency over all 31.8
 * observations". The DATA was correct chemistry (13.0 vs 18.8 is the real
 * chelate effect); the semantics wrapped around it were not. The model read the
 * figure's own narration and taught from it.
 *
 * Same defect, same generator, second concept: chem.thermo.heat-capacities
 * reported "82.15 observations" of J/mol·K. Fixed on the generator for that
 * reason rather than on either binding.
 *
 * Runs the REAL builder and the REAL production bindings.
 */
import { describe, it, expect } from 'vitest'
import { buildStatisticsBarChartScene } from '@/lib/teaching/sceneGenerators/statisticsBarChart.pure'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'

const narrationOf = (spec: { steps: { narration: string }[] }) =>
  spec.steps.map((s) => s.narration).join(' ')

const wholeFigureText = (spec: any) =>
  [spec.title, spec.teachingGoal, spec.ariaLabel, narrationOf(spec),
   ...spec.steps.flatMap((s: any) => s.objects.map((o: any) => o.text ?? ''))].join(' ')

describe('PCD-040 — the production binding no longer asserts frequency semantics', () => {
  const build = () => buildCanonicalScene(null, 'chem.coord.stability') as any

  it('is still bound (the fix must not have unbound the concept)', () => {
    expect(CONCEPT_SCENE_OVERRIDES).toContain('chem.coord.stability')
    expect(build()).not.toBeNull()
  })

  it('makes no claim about mode, frequency, distribution or observations', () => {
    const text = wholeFigureText(build())
    expect(text).not.toMatch(/\bmode\b/i)
    expect(text).not.toMatch(/frequency/i)
    expect(text).not.toMatch(/distribution/i)
    expect(text).not.toMatch(/observations/i)
    expect(text).not.toMatch(/\bmean\b/i)
  })

  it('says what the heights actually are, and which is largest', () => {
    const spec = build()
    const text = wholeFigureText(spec)
    expect(text).toMatch(/log Kf/)
    expect(text).toMatch(/largest/i)
    expect(text).toMatch(/not a count/i)
  })

  it('keeps the chemistry unchanged — the chelate effect is still 13.0 vs 18.8', () => {
    const text = wholeFigureText(build())
    expect(text).toMatch(/18\.8/)
    expect(text).toMatch(/chelate/i)
  })

  it('the sibling concept with the same generator is fixed too', () => {
    const spec = buildCanonicalScene(null, 'chem.thermo.heat-capacities') as any
    const text = wholeFigureText(spec)
    expect(text).not.toMatch(/frequency|observations|\bmode\b/i)
    expect(text).toMatch(/29\.1/)          // diatomic Cp, unchanged
  })
})

describe('negative control — a GENUINE frequency distribution is untouched', () => {
  const stats = () => buildStatisticsBarChartScene({
    chartTitle: 'Favorite colour',
    bars: [
      { label: 'Red', frequency: 7 },
      { label: 'Blue', frequency: 12 },
      { label: 'Green', frequency: 4 },
    ],
  })

  it('still teaches mode, mean and frequency exactly as before', () => {
    const text = wholeFigureText(stats())
    expect(text).toMatch(/Frequency Distribution/)
    expect(text).toMatch(/is the mode/)
    expect(text).toMatch(/observations/)
    expect(text).toMatch(/mean/)
  })

  it('mode is still the tallest bar, computed not asserted', () => {
    expect(narrationOf(stats())).toMatch(/"Blue" with a frequency of 12, is the mode/)
  })

  it('keeps its statistics scene id', () => {
    expect(stats().id).toMatch(/^statistics-/)
  })
})

describe('the magnitude branch is self-consistent', () => {
  it('names the largest bar correctly when it is not the last', () => {
    const spec = buildStatisticsBarChartScene({
      chartTitle: 'Bond enthalpy (kJ/mol)',
      quantity: { name: 'bond enthalpy (kJ/mol)', kind: 'magnitude' },
      bars: [
        { label: 'C–C', frequency: 348 },
        { label: 'C≡C', frequency: 839 },
        { label: 'C=C', frequency: 614 },
      ],
    })
    expect(narrationOf(spec)).toMatch(/"C≡C", has the largest bond enthalpy \(kJ\/mol\) at 839/)
    expect(spec.id).toMatch(/^comparison-/)
  })

  it('drops the mean step rather than rewording it — two steps, not three', () => {
    const spec = buildStatisticsBarChartScene({
      chartTitle: 'x', quantity: { name: 'x', kind: 'magnitude' },
      bars: [{ label: 'a', frequency: 1 }, { label: 'b', frequency: 2 }],
    })
    expect(spec.steps).toHaveLength(2)
  })
})

/**
 * PCD-041 — two contradictory equations for one trend, in one session.
 *
 * chem.dblock.lanthanides (#122) served `-2.857x+342.849` at T2/T4 (a ~40 pm
 * drop across the series) and `y=-0.5x+200` at T10 (~7 pm). Neither string
 * exists anywhere in this repository: both were invented at the turn, because
 * the concept had NO curated binding and every request fell through to
 * generation, which ran independently per turn.
 *
 * The fix is a curated binding, which outranks generation — so the learner gets
 * one authoritative figure, not a fresh approximation each time.
 */
describe('PCD-041 — one authoritative formulation of the lanthanide contraction', () => {
  const build = () => buildCanonicalScene(null, 'chem.dblock.lanthanides') as any

  it('is curated at all — this is what was missing', () => {
    expect(CONCEPT_SCENE_OVERRIDES).toContain('chem.dblock.lanthanides')
    expect(build()).not.toBeNull()
  })

  it('is DETERMINISTIC — the defect was two different answers in one session', () => {
    const a = JSON.stringify(build())
    const b = JSON.stringify(build())
    expect(a).toBe(b)
  })

  it('carries the real contraction, ~17 pm, not the invented ~40 pm or ~7 pm', () => {
    const spec = build()
    const values = spec.steps
      .flatMap((s: any) => s.objects)
      .filter((o: any) => o.type === 'bond')
      .map((o: any) => o.to[1] as number)
    // Heights are scaled, so assert on the authored labels instead.
    const text = wholeFigureText(spec)
    expect(text).toMatch(/103\.2/)   // La3+
    expect(text).toMatch(/86\.1/)    // Lu3+  => 17.1 pm contraction
    expect(values.length).toBe(6)
  })

  it('decreases monotonically across the series, as the contraction requires', () => {
    const spec = build()
    const heights = spec.steps
      .flatMap((s: any) => s.objects)
      .filter((o: any) => o.type === 'bond')
      .map((o: any) => o.to[1] as number)
    for (let i = 1; i < heights.length; i++) {
      expect(heights[i]).toBeLessThan(heights[i - 1])
    }
  })

  it('makes no frequency claim about a radius (PCD-040 discipline)', () => {
    const text = wholeFigureText(build())
    expect(text).not.toMatch(/frequency|observations|\bmode\b/i)
    expect(text).toMatch(/ionic radius/i)
  })

  it('actually REACHES the learner from the curated tier, not generation', () => {
    // The whole point: a curated binding outranks generation, so the invented
    // per-turn equations can no longer be what the learner is shown.
    const d = resolveVisual({
      message: 'can you show me a diagram?',
      lessonConceptId: 'chem.dblock.lanthanides',
      learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(true)
    expect(d.source).toBe('registry')
    expect(d.payload).not.toBeNull()
  })

  it('is a structurally valid scene by the product\'s own validator', () => {
    expect(validateSceneSpec(build()).errors).toEqual([])
  })

  it('neither invented equation appears anywhere in the figure', () => {
    const text = wholeFigureText(build())
    expect(text).not.toContain('342.849')
    expect(text).not.toContain('2.857')
    expect(text).not.toMatch(/0\.5x/)
  })
})
