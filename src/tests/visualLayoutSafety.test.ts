import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import {
  VIEWPORTS, checkSceneLayout, checkSceneLayoutAllViewports, projectLabelBoxes, isLayoutSafe,
  frameReport, fitSceneToFrame, MIN_FRAME_FILL,
} from '@/lib/teaching/visual/layout'
import { resolveVisual as resolveVisualForFraming } from '@/lib/teaching/visual/resolveVisual'
import { buildCanonicalScene, ACTIVATED_SCENE_KINDS } from '@/lib/teaching/visual/conceptSceneParams'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const M4_PILOT = [
  'phys.opt.total-internal-reflection',
  'phys.wave.transverse-waves',
  'phys.wave.interference',
  'phys.therm.calorimetry',
  'phys.therm.first-law',
  'phys.mech.viscosity',
  'phys.mech.surface-tension',
] as const

function pilotScene(conceptId: string): SceneSpec {
  const decision = resolveVisual({
    message: '', lessonConceptId: conceptId, subject: 'physics', learnerRequest: 'diagram',
  })
  if (decision.payload?.renderer !== 'scene') {
    throw new Error(`${conceptId} did not resolve to a scene`)
  }
  return decision.payload.sceneSpec
}

/**
 * MOBILE LAYOUT BASELINE — a ratchet, not an approval.
 *
 * Measured in Chromium against the real renderer at 390px, four of the seven
 * pilot figures print labels on top of other labels. The layout model
 * reproduces every one of those and, being deliberately conservative about
 * character width, flags a few more near-misses.
 *
 * These numbers are recorded so the defect cannot silently GROW while it is
 * being fixed. Each is a bug with a learner on the other end, not a tolerance.
 * Lower them as figures are repositioned; never raise one.
 */
const MOBILE_BASELINE: Record<string, number> = {
  // ZERO for every pilot figure at 390px. Reached generically: a
  // character-class-aware width model (uppercase is 0.716 px/char/font-px, not
  // the flat 0.62 assumed before) plus a displacement bound measured at the
  // smallest value that solves the corpus. No scene was edited. Never raise one.
  'phys.opt.total-internal-reflection': 0,
  'phys.wave.transverse-waves': 0,
  'phys.wave.interference': 0,
  'phys.therm.calorimetry': 0,
  'phys.therm.first-law': 0,
  'phys.mech.viscosity': 0,
  'phys.mech.surface-tension': 0,
}

describe('Layout safety — model', () => {
  it('projects a label box for every text-bearing object', () => {
    const scene = pilotScene('phys.wave.transverse-waves')
    const boxes = projectLabelBoxes(scene, VIEWPORTS[0])
    expect(boxes.length).toBeGreaterThan(0)
    for (const b of boxes) {
      expect(b.right).toBeGreaterThan(b.left)
      expect(b.bottom).toBeGreaterThan(b.top)
    }
  })

  it('is deterministic', () => {
    const scene = pilotScene('phys.mech.viscosity')
    const a = JSON.stringify(checkSceneLayoutAllViewports(scene))
    for (let i = 0; i < 10; i++) {
      expect(JSON.stringify(checkSceneLayoutAllViewports(scene))).toBe(a)
    }
  })

  it('models all three required viewports', () => {
    expect(VIEWPORTS.map((v) => v.browserWidth)).toEqual([1280, 768, 390])
  })

  it('label boxes now scale with the viewport — the old root cause is gone', () => {
    // ORIGINALLY this asserted the opposite: labels rendered at a FIXED pixel
    // size, so the same text occupied the same width on a 992px canvas and a
    // 282px one, and density rose until labels collided. SceneLabel is now
    // responsive (clamp with a readability floor), so a narrow canvas gets
    // narrower text. The assertion is inverted deliberately — it pins the fix
    // rather than the defect it replaced.
    const scene = pilotScene('phys.therm.calorimetry')
    const wide = projectLabelBoxes(scene, VIEWPORTS[0])
    const narrow = projectLabelBoxes(scene, VIEWPORTS[2])
    expect(narrow[0].right - narrow[0].left).toBeLessThan(wide[0].right - wide[0].left)
  })

  it('two labels on the same point are SEPARATED, not merely reported', () => {
    // This assertion changed meaning when the placement solver landed. It used
    // to prove the predicate could SEE a collision; the predicate now evaluates
    // placed positions, so on a canvas with room the collision is solved and
    // there is nothing left to report. That is the stronger outcome.
    const colliding: SceneSpec = {
      id: 't', title: 't', sceneType: 'diagram', cameraDistance: 12,
      steps: [{ objects: [
        { type: 'label', text: 'the very same spot', position: [0, 0, 0] },
        { type: 'label', text: 'also the same spot', position: [0, 0, 0] },
      ] }],
    }
    const report = checkSceneLayout(colliding, VIEWPORTS[0])
    expect(report.violations.filter((v) => v.kind === 'label-collision')).toEqual([])
    expect(report.ok).toBe(true)
  })

  it('still reports a collision the solver genuinely cannot resolve', () => {
    // A canvas with no free space anywhere: the labels are kept and the
    // overlap is reported, never hidden.
    const impossible: SceneSpec = {
      id: 't', title: 't', sceneType: 'diagram', cameraDistance: 12,
      steps: [{ objects: [
        { type: 'label', text: 'a very long label indeed', position: [0, 0, 0] },
        { type: 'label', text: 'another very long label', position: [0, 0, 0] },
      ] }],
    }
    const tiny = { name: 'mobile' as const, browserWidth: 390, hostWidth: 90, hostHeight: 60 }
    const report = checkSceneLayout(impossible, tiny)
    expect(report.labelCount).toBe(2)          // both kept
    expect(report.violations.length).toBeGreaterThan(0)
  })

  it('detects text pushed outside the drawing area', () => {
    const overflowing: SceneSpec = {
      id: 't', title: 't', sceneType: 'diagram', cameraDistance: 12,
      steps: [{ objects: [
        { type: 'label', text: 'a label pushed far off the right edge', position: [40, 0, 0] },
      ] }],
    }
    const report = checkSceneLayout(overflowing, VIEWPORTS[2])
    expect(report.violations.some((v) => v.kind === 'out-of-bounds')).toBe(true)
  })

  it('passes a figure that is genuinely clean', () => {
    const clean: SceneSpec = {
      id: 't', title: 't', sceneType: 'diagram', cameraDistance: 12,
      steps: [{ objects: [
        { type: 'label', text: 'top', position: [0, 2, 0] },
        { type: 'label', text: 'bottom', position: [0, -2, 0] },
      ] }],
    }
    expect(isLayoutSafe(clean)).toBe(true)
  })
})

describe('Layout safety — M4 pilot regression', () => {
  it('every pilot figure is clean at desktop and tablet', () => {
    const failures: string[] = []
    for (const conceptId of M4_PILOT) {
      for (const viewport of VIEWPORTS.filter((v) => v.name !== 'mobile')) {
        const report = checkSceneLayout(pilotScene(conceptId), viewport)
        if (!report.ok) failures.push(`${conceptId} @ ${viewport.name}: ${JSON.stringify(report.violations)}`)
      }
    }
    expect(failures, failures.join('\n')).toEqual([])
  })

  it('mobile violations never exceed the recorded baseline', () => {
    const worse: string[] = []
    for (const conceptId of M4_PILOT) {
      const mobile = VIEWPORTS.find((v) => v.name === 'mobile')!
      const count = checkSceneLayout(pilotScene(conceptId), mobile).violations.length
      const allowed = MOBILE_BASELINE[conceptId]
      if (count > allowed) worse.push(`${conceptId}: ${count} > baseline ${allowed}`)
    }
    expect(worse, `mobile layout regressed:\n${worse.join('\n')}`).toEqual([])
  })

  it('all seven pilot concepts still resolve to a scene', () => {
    for (const conceptId of M4_PILOT) {
      expect(() => pilotScene(conceptId), conceptId).not.toThrow()
    }
  })
})

describe('Layout safety — generator scenes', () => {
  it('reports a layout verdict for every activated generator without throwing', () => {
    for (const kind of ACTIVATED_SCENE_KINDS) {
      const scene = buildCanonicalScene(kind)
      if (!scene) continue
      const reports = checkSceneLayoutAllViewports(scene)
      expect(reports, kind).toHaveLength(3)
      for (const r of reports) expect(typeof r.ok, kind).toBe('boolean')
    }
  })

  it('desktop is clean for the large majority of generator scenes', () => {
    let clean = 0, total = 0
    for (const kind of ACTIVATED_SCENE_KINDS) {
      const scene = buildCanonicalScene(kind)
      if (!scene) continue
      total++
      if (checkSceneLayout(scene, VIEWPORTS[0]).ok) clean++
    }
    // A floor, not a target: this guards against a change that makes generator
    // figures broadly unreadable on the primary surface.
    expect(clean / total).toBeGreaterThan(0.5)
  })
})


// ── Framing contract ─────────────────────────────────────────────────────────
// The production Vector Addition failure: a payload with correct geometry and
// correct labels, drawn at 6.6% of the frame's area in one quadrant, which the
// learner experienced as thin lines, empty space and absent labels.
describe('Framing contract', () => {
  const vectorScene = (): SceneSpec => {
    const d = resolveVisualForFraming({
      message: '', lessonConceptId: 'phys.meas.vector-addition',
      subject: 'physics', learnerRequest: 'diagram',
    })
    if (d.payload?.renderer !== 'scene') throw new Error('vector-addition did not resolve to a scene')
    return d.payload.sceneSpec
  }

  it('every deterministic scene now fills at least half its frame', () => {
    const thin: string[] = []
    for (const kind of ACTIVATED_SCENE_KINDS) {
      const scene = buildCanonicalScene(kind)
      if (!scene) continue
      const report = frameReport(scene)
      if (report.fill < MIN_FRAME_FILL) thin.push(`${kind}: ${(100 * report.fill).toFixed(0)}%`)
    }
    expect(thin, `scenes under-filling their frame:\n${thin.join('\n')}`).toEqual([])
  })

  it('the Vector Addition figure is well framed and centred', () => {
    const report = frameReport(vectorScene())
    expect(report.fill).toBeGreaterThanOrEqual(MIN_FRAME_FILL)
    expect(report.offCentre).toBeLessThanOrEqual(0.15)
    expect(report.ok).toBe(true)
  })

  // PEDAGOGICAL FIDELITY — a scene existing is not success. This asserts the
  // figure demonstrates the RELATIONSHIP the tutor describes.
  it('the Vector Addition figure demonstrates the tip-to-tail construction', () => {
    const scene = vectorScene()
    const vectors = scene.steps.flatMap((s) => s.objects).filter((o) => o.type === 'vector' && o.from && o.to)
    const len = (o: typeof vectors[number]) => Math.hypot(o.to![0] - o.from![0], o.to![1] - o.from![1])

    const a = vectors.find((v) => /\bA\b/.test(v.text ?? ''))!
    const bMoved = vectors.find((v) => /moved/i.test(v.text ?? ''))!
    const r = vectors.find((v) => /\bR\b/.test(v.text ?? ''))!
    expect(a, 'no vector A').toBeTruthy()
    expect(bMoved, 'no tip-to-tail translated B').toBeTruthy()
    expect(r, 'no resultant R').toBeTruthy()

    // B is drawn from A's TIP — the construction, not two arrows from origin.
    expect(bMoved.from![0]).toBeCloseTo(a.to![0], 3)
    expect(bMoved.from![1]).toBeCloseTo(a.to![1], 3)

    // R closes the triangle: origin -> B-moved's head.
    expect(r.from![0]).toBeCloseTo(a.from![0], 3)
    expect(r.to![0]).toBeCloseTo(bMoved.to![0], 3)
    expect(r.to![1]).toBeCloseTo(bMoved.to![1], 3)

    // The 3-4-5 proportions the tutor states must hold in the drawing itself.
    expect(len(bMoved) / len(a)).toBeCloseTo(4 / 3, 2)
    expect(len(r) / len(a)).toBeCloseTo(5 / 3, 2)
  })

  it('re-framing preserves every distance ratio and angle exactly', () => {
    const before = buildCanonicalScene('projectile')!
    const after = fitSceneToFrame(before)
    const pts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
      .flatMap((o) => [o.position, o.from, o.to, ...(o.points ?? [])].filter(Boolean) as number[][])
    const p0 = pts(before), p1 = pts(after)
    expect(p1).toHaveLength(p0.length)
    // A rigid translation: every point moves by the SAME vector.
    const dx = p1[0][0] - p0[0][0], dy = p1[0][1] - p0[0][1]
    for (let i = 0; i < p0.length; i++) {
      expect(p1[i][0] - p0[i][0]).toBeCloseTo(dx, 6)
      expect(p1[i][1] - p0[i][1]).toBeCloseTo(dy, 6)
    }
  })

  it('leaves an already well-framed scene untouched', () => {
    const good: SceneSpec = {
      id: 'g', title: 'g', sceneType: 'diagram', cameraDistance: 12,
      steps: [{ objects: [
        { type: 'vector', from: [-6, -5, 0], to: [6, 5, 0] },
      ] }],
    }
    expect(fitSceneToFrame(good)).toBe(good)   // identity, not a copy
  })

  it('does not touch labels, ordering, narration or object count', () => {
    const before = buildCanonicalScene('triangle')!
    const after = fitSceneToFrame(before)
    const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects.map((o) => o.text ?? ''))
    expect(texts(after)).toEqual(texts(before))
    expect(after.steps.map((s) => s.narration)).toEqual(before.steps.map((s) => s.narration))
    expect(after.title).toBe(before.title)
  })

  it('is deterministic', () => {
    const a = JSON.stringify(fitSceneToFrame(buildCanonicalScene('vector')!))
    for (let i = 0; i < 10; i++) {
      expect(JSON.stringify(fitSceneToFrame(buildCanonicalScene('vector')!))).toBe(a)
    }
  })
})
