/**
 * Live QA, 2026-09-30 — two hard physics concepts on a real account
 * (phys.particle.standard-model, phys.mod.diode-rectification). Each block pins
 * one confirmed defect from that run.
 */
import { describe, it, expect } from 'vitest'
import { PHYSICS_DEPTH_PROBES } from '@/lib/teaching/assets/physicsDepthSeedAssets'
import { buildDiodeScene, diodeCurrent, halfWaveOutput } from '@/lib/teaching/sceneGenerators/physicsCoreScenesB9'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { describeVisualPayload, buildSemanticsBlock, coarsePlace } from '@/lib/teaching/visual/visualSemantics'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { ensureVisualAcknowledged } from '@/lib/teaching/visual/visualAcknowledgement'
import { enforceGateProbeContract } from '@/lib/teaching/gateProbeContract'
import { confirmCorrectAnswer, statesCorrect } from '@/lib/teaching/answerConfirmation'

describe('P1: the fermion-count stem agrees with its key', () => {
  it('counts each particle with its antiparticle, so twelve is right', () => {
    const p = (PHYSICS_DEPTH_PROBES as Array<{ stem: string; choices?: { text: string; isCorrect?: boolean }[] }>)
      .find((x) => x.stem.startsWith('How many fundamental matter particles (fermions)'))!
    expect(p.stem).toMatch(/counting each particle and its antiparticle as one/)
    expect(p.stem).not.toMatch(/separately/)
    expect(p.choices!.find((c) => c.isCorrect)!.text).toMatch(/^Twelve/)
  })
})

describe('V2: the diode figure', () => {
  const scene = buildDiodeScene()
  const curves = scene.steps.flatMap((s) => s.objects).filter((o) => o.type === 'path') as Array<{ points: number[][] }>

  it('is valid, in bounds, and labels stay within budget', () => {
    expect(validateSceneSpec(scene).valid ?? (validateSceneSpec(scene) as { ok?: boolean }).ok).toBeTruthy()
    for (const o of scene.steps.flatMap((s) => s.objects) as Array<{ position?: number[]; points?: number[][] }>)
      for (const p of [o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) expect(Math.max(Math.abs(p[0]), Math.abs(p[1]))).toBeLessThanOrEqual(5)
  })

  it('the I–V curve never goes flat at the top: it rises to its last point', () => {
    const iv = curves[0].points
    const tail = iv.slice(-10).map((p) => p[1])
    for (let i = 1; i < tail.length; i++) expect(tail[i]).toBeGreaterThan(tail[i - 1])
  })

  it('a fourth stage draws the half-wave rectifier: AC in, positive humps out, each a turn-on drop lower', () => {
    expect(scene.steps).toHaveLength(4)
    const [input, output] = curves.slice(1)
    const ys = (c: { points: number[][] }) => c.points.map((p) => p[1])
    const inAxis = (Math.max(...ys(input)) + Math.min(...ys(input))) / 2, outAxis = Math.min(...ys(output))
    expect(inAxis - Math.min(...ys(input))).toBeGreaterThan(0.5) // the input swings below its axis
    // Same volts scale on both traces: output peak = input peak minus the drop.
    const swingIn = Math.max(...ys(input)) - inAxis, swingOut = Math.max(...ys(output)) - outAxis
    expect(swingOut / swingIn).toBeCloseTo((5 - 0.66) / 5, 1)
    expect(halfWaveOutput(-3, 0.66)).toBe(0)
    expect(halfWaveOutput(5, 0.66)).toBeCloseTo(4.34)
    expect(diodeCurrent(0.66)).toBeGreaterThan(0.001)
    expect(scene.steps[3].narration).toMatch(/half-wave/)
  })
})

describe('V1: the tutor is told WHERE each label sits', () => {
  const sem = describeVisualPayload({ renderer: 'scene', sceneSpec: buildCanonicalScene(null, 'phys.particle.standard-model')! })

  it('the Standard Model layout: quarks top left, leptons bottom left, bosons and H to the right', () => {
    expect(sem.placed).toEqual(expect.arrayContaining(['"u c t" (top left)', '"leptons" (bottom left)', '"g γ Z W" (right)', '"H" (right)']))
    const block = buildSemanticsBlock(sem)
    expect(block).toContain('"H" (right)')
    expect(block).toMatch(/use only those positions/)
  })

  it('coarsePlace reads thirds', () => {
    const ext = { x0: -3, x1: 3, y0: -3, y1: 3 }
    expect(coarsePlace(-2.5, 2.5, ext)).toBe('top left')
    expect(coarsePlace(0, 0, ext)).toBe('centre')
    expect(coarsePlace(2.9, -0.1, ext)).toBe('right')
  })
})

describe('P10: no "take a look at the figure" pointer under a completion banner', () => {
  const decision = { graphical: true, purpose: 'demonstrate', asset: { scope: 'concept', representation: 'labelled_figure', conceptTitle: 'The Standard Model' } } as never
  it('closing turn: nothing appended; teaching turn: unchanged behaviour', () => {
    expect(ensureVisualAcknowledged('You mastered it.', decision, true, true).appended).toBe(false)
    expect(ensureVisualAcknowledged('Here is the idea.', decision, true).appended).toBe(true)
  })
})

describe('P3: prose must not compete with the authored question on screen', () => {
  const canonicalQuestion = 'What does a single diode do to an alternating supply?'
  it('held question: a lettered option list is removed, the reaction kept', () => {
    const r = enforceGateProbeContract({ held: true, leadIn: null, canonicalQuestion, text: 'Good thinking about the barrier.\nA) It blocks all current\nB) It amplifies\nC) It passes one half\nD) Nothing' })
    expect(r.replaced).toBe(true)
    expect(r.text).toBe('Good thinking about the barrier.')
  })
  it('held question: a competing question in its own paragraph is cut', () => {
    const r = enforceGateProbeContract({ held: true, leadIn: null, canonicalQuestion, text: 'The output is lower than the input.\n\nWhich factor is the primary reason the peak output is lower than the input?' })
    expect(r.text).toBe('The output is lower than the input.')
  })
  it('held question: a short check-in, or a one-paragraph answer, is left alone', () => {
    for (const text of ['The barrier shrinks in forward bias.\n\nDoes that help?', 'In forward bias the barrier shrinks, so why does current flow?'])
      expect(enforceGateProbeContract({ held: true, leadIn: null, canonicalQuestion, text }).text).toBe(text)
  })
})

describe('P7: a credited right answer is never told to pick again', () => {
  it('"select the option you think is correct" is not a confirmation, and the stale instruction goes', () => {
    expect(statesCorrect('Got it — please select the option you think is correct from the choices above.')).toBe(false)
    expect(confirmCorrectAnswer({ text: 'Got it — please select the option you think is correct from the choices above.', correct: true }).text).toBe("That's right.")
    expect(confirmCorrectAnswer({ text: 'The newton is derived.\n\n- kg\n- m', correct: true }).text).toBe("That's right. The newton is derived.\n\n- kg\n- m")
  })
})
