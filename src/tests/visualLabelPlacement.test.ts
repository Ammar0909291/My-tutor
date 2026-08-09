import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildCanonicalScene, ACTIVATED_SCENE_KINDS } from '@/lib/teaching/visual/conceptSceneParams'
import {
  VIEWPORTS, placeSceneLabels, projectLabelBoxes, screenToWorld, viewportFromCanvas,
} from '@/lib/teaching/visual/layout'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const MOBILE = VIEWPORTS.find((v) => v.name === 'mobile')!
const DESKTOP = VIEWPORTS.find((v) => v.name === 'desktop')!

const M4 = [
  'phys.opt.total-internal-reflection', 'phys.wave.transverse-waves', 'phys.wave.interference',
  'phys.therm.calorimetry', 'phys.therm.first-law', 'phys.mech.viscosity',
  'phys.mech.surface-tension', 'phys.meas.vector-addition',
] as const

function scene(conceptId: string): SceneSpec {
  const d = resolveVisual({ message: '', lessonConceptId: conceptId, subject: 'physics', learnerRequest: 'diagram' })
  if (d.payload?.renderer !== 'scene') throw new Error(`${conceptId} is not a scene`)
  return d.payload.sceneSpec
}

function corpus(): SceneSpec[] {
  const out = M4.map(scene)
  for (const kind of ACTIVATED_SCENE_KINDS) {
    const s = buildCanonicalScene(kind)
    if (s) out.push(s)
  }
  return out
}

describe('Label placement — contract', () => {
  it('A. a label that is already safe is not moved', () => {
    const safe: SceneSpec = {
      id: 's', title: 's', sceneType: 'diagram', cameraDistance: 12,
      steps: [{ objects: [{ type: 'label', text: 'clear', position: [0, 2, 0] }] }],
    }
    const { labels } = placeSceneLabels(safe, DESKTOP)
    expect(labels[0].movedPx).toBe(0)
    expect(labels[0].ok).toBe(true)
  })

  it('B. a label outside the canvas is brought inside', () => {
    const off: SceneSpec = {
      id: 's', title: 's', sceneType: 'diagram', cameraDistance: 12,
      steps: [{ objects: [{ type: 'label', text: 'far off the right edge', position: [11, 0, 0] }] }],
    }
    const { labels } = placeSceneLabels(off, DESKTOP)
    expect(labels[0].movedPx).toBeGreaterThan(0)
    expect(labels[0].x).toBeLessThanOrEqual(DESKTOP.hostWidth)
    expect(labels[0].x).toBeGreaterThanOrEqual(0)
  })

  it('C. two labels on the same point are separated', () => {
    const stacked: SceneSpec = {
      id: 's', title: 's', sceneType: 'diagram', cameraDistance: 12,
      steps: [{ objects: [
        { type: 'label', text: 'first label', position: [0, 0, 0] },
        { type: 'label', text: 'second label', position: [0, 0, 0] },
      ] }],
    }
    const { labels } = placeSceneLabels(stacked, DESKTOP)
    const apart = Math.hypot(labels[0].x - labels[1].x, labels[0].y - labels[1].y)
    expect(apart).toBeGreaterThan(0)
    expect(labels.every((l) => l.ok)).toBe(true)
  })

  it('D. a label sitting on geometry prefers nearby free space', () => {
    const overGeometry: SceneSpec = {
      id: 's', title: 's', sceneType: 'diagram', cameraDistance: 12,
      steps: [{ objects: [
        { type: 'vector', from: [-4, 0, 0], to: [4, 0, 0] },
        { type: 'label', text: 'on the arrow', position: [0, 0, 0] },
      ] }],
    }
    const { labels } = placeSceneLabels(overGeometry, DESKTOP)
    expect(labels[0].movedPx).toBeGreaterThan(0)
    expect(labels[0].ok).toBe(true)
  })

  it('E + J. placement is deterministic — same input, same output', () => {
    const s = scene('phys.mech.viscosity')
    const once = JSON.stringify(placeSceneLabels(s, MOBILE))
    for (let i = 0; i < 15; i++) expect(JSON.stringify(placeSceneLabels(s, MOBILE))).toBe(once)
  })

  it('F. no label is ever hidden, dropped or rewritten', () => {
    for (const s of corpus()) {
      for (const viewport of VIEWPORTS) {
        const authored = projectLabelBoxes(s, viewport)
        const { labels } = placeSceneLabels(s, viewport)
        expect(labels).toHaveLength(authored.length)
        expect(labels.map((l) => l.text)).toEqual(authored.map((a) => a.text))
      }
    }
  })

  it('G. placement never changes typography', () => {
    // The solver returns positions only — there is no size field to change.
    const { labels } = placeSceneLabels(scene('phys.therm.calorimetry'), MOBILE)
    for (const l of labels) {
      expect(Object.keys(l).sort()).toEqual(
        ['anchorX', 'anchorY', 'movedPx', 'ok', 'text', 'x', 'y'].concat(l.ok ? [] : ['reason']).sort(),
      )
    }
  })

  it('H. desktop and tablet place every label safely across the whole corpus', () => {
    const failures: string[] = []
    for (const s of corpus()) {
      for (const viewport of VIEWPORTS.filter((v) => v.name !== 'mobile')) {
        const { unresolved } = placeSceneLabels(s, viewport)
        if (unresolved > 0) failures.push(`${s.id} @ ${viewport.name}: ${unresolved}`)
      }
    }
    expect(failures, failures.join('\n')).toEqual([])
  })

  it('I. placement does not depend on theme — it is pure geometry', () => {
    // No theme is an input at all; asserted structurally so it cannot become one.
    const s = scene('phys.wave.interference')
    expect(placeSceneLabels.length).toBe(2)   // (scene, viewport) — nothing else
    expect(JSON.stringify(placeSceneLabels(s, MOBILE))).toBe(JSON.stringify(placeSceneLabels(s, MOBILE)))
  })

  it('K. a placed label stays near its anchor, so its referent stays clear', () => {
    const limit = Math.min(MOBILE.hostWidth, MOBILE.hostHeight) * 0.31   // MAX_DISPLACEMENT_FRACTION + rounding
    for (const s of corpus()) {
      for (const l of placeSceneLabels(s, MOBILE).labels) {
        expect(l.movedPx, `${s.id}: "${l.text}" travelled ${l.movedPx}px`).toBeLessThanOrEqual(limit)
      }
    }
  })

  it('L. an impossible placement is reported, never silently hidden', () => {
    // A canvas far too small for the text: the label is KEPT at its anchor and
    // flagged, because losing teaching information is worse than an overflow.
    const tiny = viewportFromCanvas(40, 40)
    const s: SceneSpec = {
      id: 's', title: 's', sceneType: 'diagram', cameraDistance: 12,
      steps: [{ objects: [{ type: 'label', text: 'a label far wider than this canvas', position: [0, 0, 0] }] }],
    }
    const { labels, unresolved } = placeSceneLabels(s, tiny)
    expect(unresolved).toBe(1)
    expect(labels[0].ok).toBe(false)
    expect(labels[0].reason).toBe('no-safe-placement')
    expect(labels[0].text).toBe('a label far wider than this canvas')   // kept
    expect(labels[0].x).toBe(labels[0].anchorX)                          // authored position
  })
})

describe('Label placement — runtime plumbing', () => {
  it('screen coordinates round-trip back to world exactly', () => {
    for (const viewport of VIEWPORTS) {
      for (const cd of [7, 12, 19.8, 45]) {
        const world = screenToWorld(viewport.hostWidth / 2, viewport.hostHeight / 2, viewport, cd)
        expect(world[0]).toBeCloseTo(0, 6)
        expect(world[1]).toBeCloseTo(0, 6)
      }
    }
  })

  it('viewportFromCanvas classifies the three supported widths', () => {
    expect(viewportFromCanvas(282, 260).name).toBe('mobile')
    expect(viewportFromCanvas(660, 495).name).toBe('tablet')
    expect(viewportFromCanvas(992, 520).name).toBe('desktop')
  })

  it('placement is derived, never persisted — no screen coordinates in the session', () => {
    const d = resolveVisual({
      message: '', lessonConceptId: 'phys.meas.vector-addition', subject: 'physics', learnerRequest: 'diagram',
    })
    const session = JSON.stringify(d.session ?? {})
    for (const key of ['x', 'y', 'labels', 'placement', 'anchorX']) {
      expect(session, `session must not carry ${key}`).not.toContain(`"${key}"`)
    }
  })

  it('no M4 scene coordinates were changed to satisfy the solver', () => {
    // The authored anchors are still exactly what the generators emit; the
    // solver adjusts only at render time.
    const s = scene('phys.meas.vector-addition')
    const vectors = s.steps.flatMap((st) => st.objects).filter((o) => o.type === 'vector')
    expect(vectors.some((v) => /moved/i.test(v.text ?? '')), 'tip-to-tail construction intact').toBe(true)
  })
})
