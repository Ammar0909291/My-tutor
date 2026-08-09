import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import {
  VIEWPORTS, checkSceneLayout, checkSceneLayoutAllViewports, projectLabelBoxes, isLayoutSafe,
} from '@/lib/teaching/visual/layout'
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
  'phys.opt.total-internal-reflection': 3,
  'phys.wave.transverse-waves': 0,
  'phys.wave.interference': 0,
  // Repositioned to zero: the three figures the M4 release gate found printing
  // a caption across the geometry it named. Their captions now sit a full
  // screen line-height apart, so the ratchet holds them at clean.
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

  it('label boxes are viewport-independent in size — the root cause', () => {
    // Labels render at a fixed pixel size, so the SAME text occupies the same
    // width on a 992px canvas and a 282px one. That is precisely why density
    // rises on mobile, and why a scene-unit-only check cannot see it.
    const scene = pilotScene('phys.therm.calorimetry')
    const wide = projectLabelBoxes(scene, VIEWPORTS[0])
    const narrow = projectLabelBoxes(scene, VIEWPORTS[2])
    expect(narrow[0].right - narrow[0].left).toBeCloseTo(wide[0].right - wide[0].left, 5)
  })

  it('detects a collision that genuinely exists', () => {
    const colliding: SceneSpec = {
      id: 't', title: 't', sceneType: 'diagram',
      steps: [{ objects: [
        { type: 'label', text: 'the very same spot', position: [0, 0, 0] },
        { type: 'label', text: 'also the same spot', position: [0, 0, 0] },
      ] }],
    }
    const report = checkSceneLayout(colliding, VIEWPORTS[0])
    expect(report.ok).toBe(false)
    expect(report.violations.some((v) => v.kind === 'label-collision')).toBe(true)
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
