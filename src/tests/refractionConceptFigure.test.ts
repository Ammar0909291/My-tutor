/**
 * phys.opt.refraction owns a boundary/normal/angles figure instead of the
 * shared lens diagram (real-learner run 2, production 2026-09-30).
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildRefractionScene } from '@/lib/teaching/sceneGenerators/physicsPilot'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'

type Obj = { type?: string; text?: string; from?: number[]; to?: number[]; position?: number[] }
const all = (): Obj[] => buildRefractionScene().steps.flatMap((s) => s.objects as Obj[])

describe('the refraction figure', () => {
  it('is served as a figure OF the concept, with or without a request', () => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: 'phys.opt.refraction', learnerRequest: req })
      expect(d.graphical).toBe(true)
      expect(d.asset?.scope).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe('phys-refraction')
    }
    expect(INSUFFICIENT_FOR_CONCEPT.has('phys.opt.refraction')).toBe(false)
  })

  it('has a normal, both media and the Snell relation', () => {
    const texts = all().map((o) => o.text ?? '').join(' | ')
    expect(texts).toContain('normal')
    expect(texts).toMatch(/air · n₁ = 1\.00/)
    expect(texts).toMatch(/water · n₂ = 1\.33/)
    expect(texts).toContain('n₁ sin θ₁ = n₂ sin θ₂')
  })

  it('the refracted ray obeys Snell\'s law and bends toward the normal', () => {
    const arrows = all().filter((o) => o.type === 'arrow' && o.from && o.to)
    const angleFromNormal = (dx: number, dy: number) => Math.atan2(Math.abs(dx), Math.abs(dy)) * 180 / Math.PI
    const incident = arrows.find((a) => a.to![0] === 0 && a.to![1] === 0)!
    const refracted = arrows.find((a) => a.from![0] === 0 && a.from![1] === 0)!
    const t1 = angleFromNormal(incident.from![0], incident.from![1])
    const t2 = angleFromNormal(refracted.to![0], refracted.to![1])
    expect(t1).toBeCloseTo(40, 0)
    expect(Math.sin(t1 * Math.PI / 180) * 1.0).toBeCloseTo(Math.sin(t2 * Math.PI / 180) * 1.33, 2)
    expect(t2).toBeLessThan(t1)
    expect(refracted.to![1]).toBeLessThan(0) // into the water, below the boundary
  })
})
