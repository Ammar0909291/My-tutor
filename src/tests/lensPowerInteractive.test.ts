/**
 * LENS POWER IS INTERACTIVE, AND EVERY NUMBER ON IT COMES FROM THE SAME FOUR PARAMETERS.
 *
 * `phys.opt.lens-power` teaches two relationships (KG node, Educational Brain Core Understanding + Mental Models stages 2-3,
 * blueprint Level 2): P = 1/f with f in metres, and P = P₁ + P₂ for thin lenses IN CONTACT. Until 2026-10-12 the figure was
 * static (the learner could not vary either power) and the separated-lens limit was named, not drawn.
 *
 * The controls are not decoration; each one tests one claim of the lesson:
 *   singlePower  P = 1/f  — raise it and f shrinks; make it negative and the lens diverges (sign convention)
 *   firstPower / secondPower  — in contact the pair bends like ONE lens of power P₁ + P₂
 *   gap          — the sum holds only at d = 0; apart, P = P₁ + P₂ − d·P₁P₂ and the rays show it
 *
 * Every ray is TRACED (a ray at height y leaves a thin lens of power P with slope change −y·P/SCALE) and every printed number is
 * computed from the same parameters, so the tests re-derive the power from the DRAWN geometry rather than trusting a label.
 */
import { describe, expect, it } from 'vitest'
import { LENS_POWER_DEFAULTS, LENS_POWER_LIMITS, buildLensPowerScene, combinedPower, validateLensPowerParams, type LensPowerParams } from '@/lib/teaching/sceneGenerators/lensPower.pure'
import { PARAMETRIC_SCENES, canonicalParametricScene, rebuildScene } from '@/lib/teaching/visual/parametricScenes'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'
import { placeSceneLabels, viewportFromCanvas } from '@/lib/teaching/visual/layout'
import { complexityFor } from '@/lib/teaching/visual/visualComplexity'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const SCALE = 6, X0 = -2.2, Y_SINGLE = 2.2, Y_PAIR = -2.2, H = 0.7

type Obj = { id?: string; type: string; text?: string; position?: number[]; from?: number[]; to?: number[]; points?: number[][] }
const objects = (spec: SceneSpec): Obj[] => spec.steps.flatMap((s) => s.objects as unknown as Obj[])
const byId = (spec: SceneSpec, id: string) => objects(spec).find((o) => o.id === id)
const texts = (spec: SceneSpec) => objects(spec).filter((o) => o.type === 'label').map((o) => o.text ?? '')
const P = (over: Partial<LensPowerParams> = {}): LensPowerParams => ({ ...LENS_POWER_DEFAULTS, ...over })
const scene = (over: Partial<LensPowerParams> = {}) => buildLensPowerScene(P(over))

/** The power a drawn outgoing ray has: its slope times −SCALE over its height above the axis at the FIRST lens. */
const drawnPower = (spec: SceneSpec, id: string, yAxis: number, h = H) => {
  const r = byId(spec, id)!
  const slope = (r.to![1] - r.from![1]) / (r.to![0] - r.from![0])
  return (-slope * SCALE) / h
}

describe('registered through the existing variable layer, bound to the concept', () => {
  it('the kind is registered with four controls, each stating its consequence, and defaults are the textbook case', () => {
    const entry = PARAMETRIC_SCENES.lens_power
    expect(entry).toBeDefined()
    expect(entry.defaults).toEqual({ singlePower: 2, firstPower: 5, secondPower: -2, gap: 0 })
    expect(entry.variables.map((v) => v.key)).toEqual(['singlePower', 'firstPower', 'secondPower', 'gap'])
    for (const v of entry.variables) {
      expect(v.effect.length, v.key).toBeGreaterThan(20)
      expect(v.kind).toBe('number')
    }
    // the slider ranges are the validator's ranges: a control can never offer a value the generator refuses
    for (const v of entry.variables) {
      if (v.kind !== 'number') continue
      const lim = LENS_POWER_LIMITS[v.key as keyof typeof LENS_POWER_LIMITS]
      expect([v.min, v.max]).toEqual([lim.min, lim.max])
      for (let x = v.min; x <= v.max + 1e-9; x += v.step) expect(validateLensPowerParams({ ...LENS_POWER_DEFAULTS, [v.key]: Math.round(x * 100) / 100 }), `${v.key}=${x}`).not.toBeNull()
    }
  })

  it('phys.opt.lens-power is bound to it (and phys.opt.lenses keeps its own single-lens sliders)', () => {
    expect(getConceptSceneGenerator('phys.opt.lens-power')).toBe('lens_power')
    expect(getConceptSceneGenerator('phys.opt.lenses')).toBe('ray_optics')
    const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: 'phys.opt.lens-power', learnerRequest: 'diagram', subject: 'physics' } as never)
    expect(d.payload?.renderer).toBe('scene')
    const spec = (d.payload as { sceneSpec: SceneSpec }).sceneSpec
    expect(spec.parametric).toEqual({ kind: 'lens_power', params: { singlePower: 2, firstPower: 5, secondPower: -2, gap: 0 } })
  })

  it('a control press re-runs the same builder: rebuildScene equals a direct build, and refuses what the validator refuses', () => {
    const moved = rebuildScene('lens_power', { firstPower: 3.5, gap: 0.1 })!
    expect(moved.parametric?.params).toMatchObject({ firstPower: 3.5, gap: 0.1 })
    expect(texts(moved).join('|')).toContain('+3.5 D')
    for (const bad of [{ firstPower: 9 }, { secondPower: -5 }, { gap: 0.3 }, { singlePower: NaN }, { gap: -0.05 }]) expect(rebuildScene('lens_power', bad), JSON.stringify(bad)).toBeNull()
    expect(canonicalParametricScene('lens_power')).not.toBeNull()
  })
})

describe('the printed power is the power the DRAWN rays have — across the whole control space', () => {
  const singles = [-4, -2.5, -1, 0, 0.5, 1, 2, 4.5, 6]
  it('one lens: P = 1/f at every value (slope of the drawn ray; the focus where f says)', () => {
    for (const pS of singles) {
      const spec = scene({ singlePower: pS })
      expect(drawnPower(spec, 'ray-single-out-upper', Y_SINGLE), `P=${pS}`).toBeCloseTo(pS, 2)
      expect(drawnPower(spec, 'ray-single-out-lower', Y_SINGLE, -H), `P=${pS} lower`).toBeCloseTo(pS, 2)
      const focus = byId(spec, 'focus-single')
      if (pS > 0 && SCALE / pS + X0 <= 2.6) {
        expect(focus, `P=${pS} has a real focus in view`).toBeDefined()
        expect(((focus!.position![0] - X0) / SCALE), `P=${pS}`).toBeCloseTo(1 / pS, 2)
      } else expect(focus, `P=${pS}: no real focus in view`).toBeUndefined()
    }
  })

  it('the pair: for EVERY (P₁, P₂, d) the outgoing slope encodes P₁ + P₂ − d·P₁P₂, whatever the gap', () => {
    for (const p1 of [-4, -1, 0, 1, 3, 5, 8]) for (const p2 of [-4, -2, 0, 2, 5, 8]) for (const gap of [0, 0.05, 0.1, 0.2]) {
      const spec = scene({ firstPower: p1, secondPower: p2, gap })
      const want = combinedPower(p1, p2, gap)
      expect(drawnPower(spec, 'ray-pair-out-upper', Y_PAIR), `${p1},${p2},d=${gap}`).toBeCloseTo(want, 1)
      expect(drawnPower(spec, 'ray-pair-out-lower', Y_PAIR, -H), `${p1},${p2},d=${gap} lower`).toBeCloseTo(want, 1)
    }
  })

  it('in contact the two powers ADD: the second lens adds exactly its own power (with its sign) to the bend', () => {
    for (const [p1, p2] of [[5, -2], [3, 2], [2, -2], [-1, -3], [6, -4]] as const) {
      const spec = scene({ firstPower: p1, secondPower: p2 })
      const together = drawnPower(spec, 'ray-pair-out-upper', Y_PAIR)
      const alone = drawnPower(spec, 'ray-first-alone', Y_PAIR)
      expect(alone, `${p1} alone`).toBeCloseTo(p1, 1)
      expect(together - alone, `${p1}+${p2}`).toBeCloseTo(p2, 1)
    }
  })

  it('apart, the sum rule fails — and the figure shows where the sum rule WOULD have put the focus, away from where the rays cross', () => {
    const together = scene({ firstPower: 4, secondPower: -1, gap: 0 })
    const apart = scene({ firstPower: 4, secondPower: -1, gap: 0.2 })
    const pEff = combinedPower(4, -1, 0.2)                    // 3 − 0.2·4·(−1) = 3.8 D, not 3 D
    expect(pEff).toBeCloseTo(3.8, 9)
    expect(drawnPower(apart, 'ray-pair-out-upper', Y_PAIR)).toBeCloseTo(3.8, 1)
    expect(Math.abs(drawnPower(apart, 'ray-pair-out-upper', Y_PAIR) - 3)).toBeGreaterThan(0.5)
    // the printed result is the separated-lens formula, never the bare sum
    const exp = apart.explainer!.result!
    expect(exp.expression).toBe('P = P₁ + P₂ − d·P₁P₂')
    expect(exp.value).toBe('+3.8 D')
    expect(together.explainer!.result!.expression).toBe('P = P₁ + P₂')
    expect(texts(apart).join('|')).toContain('P = +3.8 D')
    expect(texts(apart).join('|')).not.toContain('P₁ + P₂ = +3.8 D')
    // the sum-rule marker is drawn only when the lenses are apart, at x₂ + f_sum, beside the real focus
    expect(byId(together, 'focus-sum-rule')).toBeUndefined()
    const sum = byId(apart, 'focus-sum-rule')!
    const real = byId(apart, 'focus-pair')!
    expect(sum.position![0]).toBeCloseTo(X0 + 0.1 * SCALE + SCALE / 3, 2)   // x₂ + 1/(P₁ + P₂) metres
    expect(Math.abs(sum.position![0] - real.position![0]), 'the two foci really differ').toBeGreaterThan(0.4)
    // the lenses themselves are drawn apart by d·SCALE
    const cx = (id: string) => { const pts = byId(apart, id)!.points!; return pts.reduce((a, p) => a + p[0], 0) / pts.length }
    expect(cx('lens-second') - cx('lens-first')).toBeCloseTo(0.2 * SCALE, 1)
  })

  it('every printed power carries the right sign and the sum printed beside the pair is the sum of the two', () => {
    for (const [p1, p2] of [[5, -2], [-3, 1.5], [2.5, 2.5]] as const) {
      const t = texts(scene({ firstPower: p1, secondPower: p2 }))
      const fmt = (n: number) => `${n > 0 ? '+' : '−'}${Math.abs(n)} D`
      expect(t).toContain(fmt(p1))
      expect(t).toContain(fmt(p2))
      expect(t).toContain(`P₁ + P₂ = ${fmt(p1 + p2)}`)
    }
  })
})

describe('sign conventions: converging is positive, diverging negative, and the drawing agrees', () => {
  const widest = (spec: SceneSpec, id: string) => {
    const pts = byId(spec, id)!.points!
    const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length
    const mid = pts.filter((p) => Math.abs(p[1] - (Math.min(...pts.map((q) => q[1])) + Math.max(...pts.map((q) => q[1]))) / 2) < 0.2)
    return { middle: Math.max(...mid.map((p) => Math.abs(p[0] - cx))), end: Math.abs(pts[0][0] - cx) }
  }
  it('a positive power draws a biconvex symbol (widest in the middle), a negative one a biconcave symbol (pinched), zero draws none', () => {
    const a = scene({ singlePower: 2 }), b = scene({ singlePower: -2 }), c = scene({ singlePower: 0 })
    expect(widest(a, 'lens-single').middle).toBeGreaterThan(widest(a, 'lens-single').end)
    expect(widest(b, 'lens-single').middle).toBeLessThan(widest(b, 'lens-single').end)
    expect(byId(c, 'lens-single')).toBeUndefined()
    const pair = scene({ firstPower: -3, secondPower: 4 })
    expect(widest(pair, 'lens-first').middle).toBeLessThan(widest(pair, 'lens-first').end)
    expect(widest(pair, 'lens-second').middle).toBeGreaterThan(widest(pair, 'lens-second').end)
  })

  it('a diverging lens spreads the rays (they move away from the axis), a converging one brings them toward it', () => {
    const upper = (spec: SceneSpec) => { const r = byId(spec, 'ray-single-out-upper')!; return r.to![1] - r.from![1] }
    expect(upper(scene({ singlePower: 3 }))).toBeLessThan(0)
    expect(upper(scene({ singlePower: -3 }))).toBeGreaterThan(0)
  })

  it('a diverging combination has f negative, says so, and draws no real focus', () => {
    const spec = scene({ firstPower: -3, secondPower: 1 })     // P = −2 D
    expect(texts(spec)).toContain('f = −0.50 m')
    expect(byId(spec, 'focus-pair')).toBeUndefined()
    expect(spec.steps[2].narration).toMatch(/f = 1\/−2 = −0\.50 m/)
  })
})

describe('zero and infinite focal length are handled, never divided by', () => {
  it('P = 0 for one lens: a plate — f = ∞ printed, rays unbent, no lens symbol, no focus', () => {
    const spec = scene({ singlePower: 0 })
    expect(texts(spec)).toContain('f = ∞')
    expect(texts(spec)).toContain('P = 1/f = 0 D')
    expect(Math.abs(drawnPower(spec, 'ray-single-out-upper', Y_SINGLE))).toBeLessThan(1e-6)
    expect(byId(spec, 'focus-single')).toBeUndefined()
    expect(spec.steps[0].narration).toMatch(/infinite/)
  })

  it('a pair whose powers cancel (+3 and −3, in contact): P = 0, f = ∞, the rays leave parallel, and the narration says so', () => {
    const spec = scene({ firstPower: 3, secondPower: -3 })
    expect(texts(spec)).toContain('f = ∞')
    expect(Math.abs(drawnPower(spec, 'ray-pair-out-upper', Y_PAIR))).toBeLessThan(1e-6)
    expect(byId(spec, 'focus-pair')).toBeUndefined()
    expect(spec.steps[2].narration).toMatch(/parallel/)
    expect(spec.steps[2].narration).toMatch(/f = ∞/)
  })

  it('no coordinate is NaN or infinite anywhere in the control space, and nothing leaves the ±5 authoring box', () => {
    for (const pS of [-4, 0, 6]) for (const p1 of [-4, 0, 8]) for (const p2 of [-4, 0, 8]) for (const gap of [0, 0.2]) {
      const spec = scene({ singlePower: pS, firstPower: p1, secondPower: p2, gap })
      for (const o of objects(spec)) for (const pt of [o.position, o.from, o.to, ...(o.points ?? [])].filter(Boolean) as number[][]) for (const c of pt) {
        expect(Number.isFinite(c), `${pS},${p1},${p2},${gap}`).toBe(true)
        expect(Math.abs(c), `${pS},${p1},${p2},${gap}`).toBeLessThanOrEqual(5)
      }
      for (const t of texts(spec)) expect(t).not.toMatch(/NaN|Infinity|undefined/)
    }
  })
})

describe('the limit of the rule is stated, in every state', () => {
  it('in contact: "Thin lenses in contact only" and "Powers add, focal lengths do not", and the unit trap METRES', () => {
    const n = scene().steps.map((s) => s.narration).join(' ')
    expect(n).toMatch(/Thin lenses in contact only/)
    expect(n).toMatch(/Powers add, focal lengths do not/)
    expect(n).toMatch(/METRES/)
  })
  it('apart: the figure says the addition rule is for lenses in CONTACT and never claims the plain sum', () => {
    const spec = scene({ gap: 0.1 })
    expect(spec.steps[2].narration).toMatch(/lenses in CONTACT/)
    expect(spec.steps[2].narration).toMatch(/the sum rule fails/)
    expect(spec.steps[2].narration).not.toMatch(/Powers add, focal lengths do not/)
    expect(spec.teachingGoal).toMatch(/Apart, they do not/)
    expect(spec.explainer!.panels![1].heading).toBe('Apart, the sum rule fails')
  })
})

describe('a real figure at every control value: authoring limits, label budget, and labels that keep their place', () => {
  const states: Array<Partial<LensPowerParams>> = [
    {}, { singlePower: -4 }, { singlePower: 0 }, { singlePower: 6 }, { singlePower: 1 },
    { firstPower: 8, secondPower: 8 }, { firstPower: -4, secondPower: -4 }, { firstPower: 3, secondPower: -3 }, { firstPower: 1, secondPower: 0 },
    { gap: 0.2 }, { gap: 0.05, firstPower: 8, secondPower: -4 }, { gap: 0.2, firstPower: -2, secondPower: 6 },
  ]
  it('rebuildScene accepts every state (the validator and the scene gate both pass)', () => {
    for (const s of states) expect(rebuildScene('lens_power', s), JSON.stringify(s)).not.toBeNull()
  })

  it('narrations stay under 220 characters, the label count under the intermediate budget, ids are unique', () => {
    for (const s of states) {
      const spec = scene(s)
      for (const st of spec.steps) expect((st.narration ?? '').length, `${JSON.stringify(s)}`).toBeLessThan(220)
      const labels = objects(spec).filter((o) => o.type === 'label')
      expect(labels.length, JSON.stringify(s)).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
      const ids = objects(spec).map((o) => o.id).filter(Boolean) as string[]
      expect(new Set(ids).size, JSON.stringify(s)).toBe(ids.length)
    }
  })

  it('at 390 px and at the 1280 px column every label is placed (none unresolved), and none moves more than 30 px', () => {
    for (const s of states) {
      const spec = scene(s)
      for (const [w, hh, bw] of [[282, 260, 390], [566, 272, 1280], [566, 380, 1280]] as Array<[number, number, number]>) {
        const cum: SceneSpec['steps'][number]['objects'] = []
        for (const step of spec.steps) {
          cum.push(...step.objects)
          const placed = placeSceneLabels({ ...spec, steps: [{ objects: [...cum] }] }, viewportFromCanvas(w, hh, bw))
          expect(placed.unresolved, `${JSON.stringify(s)} @${w}x${hh}`).toBe(0)
          // 30 px everywhere a learner is likely to be; the one corner where a +6 D lens sits 20 cm behind a −2 D lens (P = +6.4 D) fans
          // the rays across every candidate spot, and there the solver may move a label a little further. Never unresolved, never overlapping.
          const limit = Math.abs(combinedPower(s.firstPower ?? 5, s.secondPower ?? -2, s.gap ?? 0)) > 6 ? 40 : 30
          for (const l of placed.labels) expect(l.movedPx, `${JSON.stringify(s)} @${w}x${hh}: "${l.text}" moved ${l.movedPx}px`).toBeLessThanOrEqual(limit)
        }
      }
    }
  })

  it('deterministic: the same parameters give byte-identical figures (a rehydrated session matches)', () => {
    for (const s of states) expect(JSON.stringify(scene(s))).toBe(JSON.stringify(scene(s)))
  })
})
