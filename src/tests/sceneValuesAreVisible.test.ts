/**
 * A FIGURE'S TEACHING VALUES MUST BE ON THE FIGURE.
 *
 * ── THE DEFECT CLASS ────────────────────────────────────────────────────────
 * `electricCircuit` computed 10 Ω / 20 Ω / 1.2 A / 0.6 A, VALIDATED them (its
 * checker re-derives every branch and asserts KCL), and then drew both
 * resistors as identical blue dots — because a `node` renders as position +
 * radius + colour and its `properties` are read by nobody. The learner saw two
 * indistinguishable dots; `fromScene` reads LABELS, so the tutor was told only
 * "3 marked points, 3 straight lines" and, asked why the current splits,
 * invented "a larger resistance value like ten ohms". Backwards, and nothing
 * on screen could have corrected it.
 *
 * That is a CLASS, not one bug: any generator that puts teaching values in
 * `properties` rather than in a label hides them from both audiences at once.
 * `scripts/audit/scene-value-blindness.ts` measured the whole set.
 *
 * ── THE INVARIANT ───────────────────────────────────────────────────────────
 * Every activated scene must give the tutor at least one nameable thing. That
 * is deliberately weaker than "every number must be drawn": plenty of numeric
 * properties are structural (an array `index`, a tree `level`, a shell number)
 * and drawing them would be noise. What is not acceptable is a figure the
 * tutor can only call "a plotted curve".
 */
import { describe, it, expect } from 'vitest'
import { ACTIVATED_SCENE_KINDS, buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'
import { buildCircuitScene } from '@/lib/teaching/sceneGenerators/electricCircuit'
import { buildKinematicsGraphScene } from '@/lib/teaching/sceneGenerators/kinematicsGraphs'

const readableOf = (kind: string) => {
  const spec = buildCanonicalScene(kind)
  if (!spec) return null
  return describeVisualPayload({ renderer: 'scene', sceneSpec: spec } as never).readable
}

describe('THE INVARIANT — no activated scene leaves the tutor unable to name anything', () => {
  it('every activated scene yields at least one readable element', () => {
    const blind: string[] = []
    for (const kind of ACTIVATED_SCENE_KINDS) {
      const readable = readableOf(kind)
      if (readable && readable.length === 0) blind.push(kind)
    }
    // Measured before this sweep: kinematics_graphs ("3 plotted curves"),
    // calculus_graph ("a plotted curve, a marked point"), civics_org_chart
    // ("4 marked points, 3 straight lines").
    expect(blind).toEqual([])
  })

  it('the audit script that found this is still runnable', async () => {
    // The invariant above is the guard; the script is how the next person
    // re-measures the whole set rather than trusting this file.
    const { readFileSync } = await import('fs')
    const src = readFileSync('scripts/audit/scene-value-blindness.ts', 'utf8')
    expect(src).toContain('ACTIVATED_SCENE_KINDS')
  })
})

describe('the three scenes the sweep repaired', () => {
  it('civics_org_chart NAMES ITS BODIES — the whole teaching content of a chart', () => {
    const readable = readableOf('civics_org_chart')!
    // Every node already carried `properties.name`; none of it was drawn.
    expect(readable.length).toBeGreaterThan(0)
    expect(readable.join(' | ')).toMatch(/[A-Za-z]{3,}/)
  })

  it('kinematics_graphs says which curve is which', () => {
    const joined = readableOf('kinematics_graphs')!.join(' | ')
    // Three curves distinguished only by colour is three coloured lines.
    expect(joined).toContain('x–t')
    expect(joined).toContain('v–t')
    expect(joined).toContain('a–t')
  })

  it('calculus_graph says WHERE the derivative is zero', () => {
    const joined = readableOf('calculus_graph')!.join(' | ')
    // The one fact the scene exists to teach was in `properties` only.
    expect(joined).toMatch(/critical point: x = -?[\d.]+/)
    expect(joined).toContain("f'(x) = 0")
  })
})

describe('a label a tutor reads aloud must be written the way a teacher writes it', () => {
  // The first version of the kinematics labels interpolated every term
  // unconditionally, so a runner starting from rest at the origin got
  // "x–t: x = 0 + 0t + 0.5(2)t²". Every character true, three terms noise.
  // MEASURED in a live production lesson: the tutor read it out verbatim,
  // backticks and all — because the visual contract correctly tells it to use
  // the figure's own words, which makes a sloppy label sloppy teaching.
  const labels = (p: Record<string, number>) =>
    (buildKinematicsGraphScene(p as never).steps ?? [])
      .flatMap((s) => (s.objects ?? []).filter((o) => o.type === 'label').map((o) => String(o.text)))

  it('drops zero terms and an implicit unit coefficient', () => {
    const l = labels({ initialVelocity: 0, acceleration: 2, duration: 5, initialPosition: 0 })
    expect(l).toContain('x–t: x = t²')
    expect(l).toContain('v–t: v = 2t')
    expect(l.join(' ')).not.toContain('0 + 0t')
  })

  it('keeps every term that carries information', () => {
    const l = labels({ initialVelocity: 20, acceleration: -10, duration: 4, initialPosition: 5 })
    expect(l).toContain('x–t: x = 5 + 20t − 5t²')
    expect(l).toContain('v–t: v = 20 − 10t')
  })

  it('a constant velocity is a constant, not "v = 3 + 0t"', () => {
    const l = labels({ initialVelocity: 3, acceleration: 0, duration: 5, initialPosition: 0 })
    expect(l).toContain('v–t: v = 3')
    expect(l).toContain('x–t: x = 3t')
  })

  it('an all-zero case still says something rather than nothing', () => {
    const l = labels({ initialVelocity: 0, acceleration: 0, duration: 5, initialPosition: 0 })
    expect(l).toContain('x–t: x = 0')
    expect(l).toContain('v–t: v = 0')
  })

  it('ONE MINUS SIGN — a leading negative never mixes glyphs with a joined one', () => {
    const l = labels({ initialVelocity: -4, acceleration: 2, duration: 5, initialPosition: -2 })
    expect(l).toContain('x–t: x = −2 − 4t + t²')
    expect(l).toContain('v–t: v = −4 + 2t')
    // No ASCII hyphen used as a minus anywhere in the equations.
    for (const t of l) expect(t.replace(/x–t|v–t|a–t/g, '')).not.toContain('-')
  })
})

describe('electricCircuit labels the quantity that VARIES', () => {
  const build = (connection: 'series' | 'parallel') => buildCircuitScene({
    voltage: 12, connection,
    components: [{ type: 'resistor', value: 10, unit: 'ohm' }, { type: 'resistor', value: 20, unit: 'ohm' }],
  } as never)
  const labels = (connection: 'series' | 'parallel') =>
    (build(connection).steps ?? [])
      .flatMap((s) => (s.objects ?? []).filter((o) => o.type === 'label').map((o) => String(o.text)))

  it('PARALLEL: the currents differ, so the currents are labelled', () => {
    const l = labels('parallel')
    expect(l).toContain('R1 = 10 Ω')
    expect(l).toContain('R2 = 20 Ω')
    expect(l).toContain('I1 = 1.2 A')
    expect(l).toContain('I2 = 0.6 A')
  })

  it('SERIES: the current is identical in both, so the VOLTAGE DROPS are labelled', () => {
    // Labelling two identical currents would teach nothing and would hide the
    // one quantity KVL is about.
    const l = labels('series')
    expect(l).toContain('V1 = 4 V')
    expect(l).toContain('V2 = 8 V')
    expect(l.some((t) => /^I\d/.test(t))).toBe(false)
  })

  it('the series drops sum to the source voltage — KVL, readable off the figure', () => {
    const vs = labels('series').flatMap((t) => {
      const m = /^V\d = ([\d.]+) V$/.exec(t)
      return m ? [Number(m[1])] : []
    })
    expect(vs).toHaveLength(2)
    expect(vs.reduce((a, b) => a + b, 0)).toBeCloseTo(12, 6)
  })

  it('the parallel currents sum to the total — KCL, readable off the figure', () => {
    const is = labels('parallel').flatMap((t) => {
      const m = /^I\d = ([\d.]+) A$/.exec(t)
      return m ? [Number(m[1])] : []
    })
    expect(is.reduce((a, b) => a + b, 0)).toBeCloseTo(1.8, 6)
  })

  it('no label carries a NaN coordinate', () => {
    for (const conn of ['series', 'parallel'] as const) {
      for (const step of build(conn).steps ?? []) {
        for (const o of step.objects ?? []) {
          for (const c of o.position ?? []) expect(Number.isFinite(c)).toBe(true)
        }
      }
    }
  })
})
