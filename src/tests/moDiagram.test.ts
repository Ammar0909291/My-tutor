/**
 * chem.bond.mo-theory used to be served a generated six-box procedure flowchart — the steps of building an MO diagram with no
 * diagram (hard-concept learner run, 2026-10-20). The figure is now the H₂ energy-level diagram; these tests pin what makes it an
 * MO diagram rather than a list: σ below the 1s levels below σ*, the combination lines, two paired electrons in σ, and a bond
 * order that is whatever the drawn electrons give — a figure whose electrons contradict its bond order cannot pass the checker.
 */
import { describe, it, expect } from 'vitest'
import { buildMoDiagramScene, checkMoDiagramConsistency, moBondOrder, E_BONDING, E_AO, E_ANTIBONDING } from '@/lib/teaching/sceneGenerators/moDiagram'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const objects = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const clone = (s: SceneSpec): SceneSpec => JSON.parse(JSON.stringify(s))

describe('molecular-orbital diagram figure', () => {
  const spec = buildMoDiagramScene()

  it('is a valid scene, deterministic, and served for chem.bond.mo-theory', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildMoDiagramScene())).toBe(JSON.stringify(spec))
    const served = buildCanonicalScene(null, 'chem.bond.mo-theory') as SceneSpec
    expect(served.id).toBe(spec.id)
    expect(served.steps.length).toBe(spec.steps.length)
  })

  it('draws an energy diagram: four orbital levels, four combination lines, four spin arrows and an energy axis', () => {
    const bonds = objects(spec).filter((o) => o.type === 'bond')
    const levels = bonds.filter((o) => o.from![1] === o.to![1])
    const joins = bonds.filter((o) => o.from![1] !== o.to![1])
    expect(levels).toHaveLength(4)   // two 1s, σ, σ*
    expect(joins).toHaveLength(4)    // each 1s to σ and to σ*
    // 4 spin arrows plus the energy axis
    expect(objects(spec).filter((o) => o.type === 'arrow')).toHaveLength(5)
  })

  it('orders the levels σ < 1s < σ* and joins each 1s to both molecular orbitals', () => {
    expect(E_BONDING).toBeLessThan(E_AO)
    expect(E_AO).toBeLessThan(E_ANTIBONDING)
    const joins = objects(spec).filter((o) => o.type === 'bond' && o.from![1] !== o.to![1])
    const ys = (o: typeof joins[number]) => [o.from![1], o.to![1]].sort((a, b) => a - b)
    expect(joins.filter((o) => ys(o)[0] === E_AO && ys(o)[1] === E_ANTIBONDING)).toHaveLength(2)
    expect(joins.filter((o) => ys(o)[0] === E_BONDING && ys(o)[1] === E_AO)).toHaveLength(2)
  })

  it('the bond order printed on the figure is the one its drawn electrons give', () => {
    expect(checkMoDiagramConsistency(spec)).toEqual({ ok: true, errors: [] })
    expect(moBondOrder(spec)).toBe(1)
    expect(objects(spec).map((o) => o.text ?? '').join(' | ')).toContain('bond order = (2 − 0) / 2 = 1')
  })

  it('names the two molecular orbitals and the atomic orbital', () => {
    const text = objects(spec).map((o) => o.text ?? '').join(' | ')
    for (const need of ['σ bonding', 'σ* antibonding', 'H 1s', 'energy']) expect(text).toContain(need)
  })

  it('narration stays inside the figure panel budget and carries the He₂ and O₂ outcomes the lesson asks about', () => {
    const total = spec.steps.reduce((n, s) => n + s.narration.length, 0)
    expect(total).toBeLessThan(1000)
    const all = spec.steps.map((s) => s.narration).join(' ')
    expect(all).toContain('He₂')
    expect(all).toContain('paramagnetic')
  })

  // Mutation checks: each one is a figure that LOOKS like an MO diagram but states something false.
  it('a third electron in σ (Pauli violation) is rejected', () => {
    const bad = clone(spec)
    const step = bad.steps[2]
    const extra = step.objects.find((o) => o.type === 'arrow' && Math.abs(o.from![0]) < 2)!
    step.objects.push({ ...extra, from: [...extra.from!] as never, to: [...extra.to!] as never })
    expect(checkMoDiagramConsistency(bad).ok).toBe(false)
  })

  it('two parallel spins in σ are rejected', () => {
    const bad = clone(spec)
    const inSigma = bad.steps[2].objects.filter((o) => o.type === 'arrow' && Math.abs(o.from![0]) < 2)
    const [a, b] = inSigma
    b.from = [...a.from!] as never; b.to = [...a.to!] as never
    b.from![0] = 0.55; b.to![0] = 0.55
    expect(checkMoDiagramConsistency(bad).errors.join(' ')).toMatch(/opposite spins/)
  })

  it('a bond order that disagrees with the electrons is rejected', () => {
    const bad = clone(spec)
    const result = bad.steps[3].objects.find((o) => o.text?.startsWith('bond order'))!
    result.text = 'bond order = (2 − 0) / 2 = 2'
    expect(checkMoDiagramConsistency(bad).errors.join(' ')).toMatch(/printed bond order/)
  })

  it('an antibonding level drawn below the atomic level is rejected', () => {
    const bad = clone(spec)
    for (const o of objects(bad)) if (o.type === 'bond' && o.from![1] === E_ANTIBONDING && o.to![1] === E_ANTIBONDING) { o.from![1] = -3; o.to![1] = -3 }
    expect(checkMoDiagramConsistency(bad).ok).toBe(false)
  })
})
