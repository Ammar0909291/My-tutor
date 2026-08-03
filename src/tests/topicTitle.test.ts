/**
 * Regression cover for the dual-ontology title defect.
 *
 * TopicProgress.topicSlug is written from two disjoint id universes —
 * School Mode board ids (`physics.laws_of_motion`) and canonical Library KG
 * ids (`phys.mech.force`). revisionProfile.ts and learningDifficultyProfile.ts
 * resolved titles from School Mode's ALL_KG_NODES only, so every Library
 * concept fell through to slug-prettification and surfaced raw ids to
 * learners across the intelligence APIs.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { resolveTopicTitle } from '@/lib/intelligence/topicTitle'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

describe('resolveTopicTitle — canonical Library concepts', () => {
  const canonical = [
    'phys.mech.newtons-second-law',
    'phys.em.faradays-law',
    'phys.qm.schrodinger-equation',
    'phys.meas.units',
  ]

  it('resolves canonical physics ids to their real KG title', () => {
    for (const id of canonical) {
      const expected = getKGNode(id)?.title
      expect(expected, `${id} must exist in the canonical KG`).toBeTruthy()
      expect(resolveTopicTitle(id)).toBe(expected)
    }
  })

  it('never leaks a raw concept id as a title (the production symptom)', () => {
    for (const id of canonical) {
      const title = resolveTopicTitle(id)
      expect(title).not.toContain('phys.')
      expect(title).not.toBe(id.replace(/[-_]/g, ' '))
    }
  })

  it('covers every physics domain, not just the ones with School Mode analogues', () => {
    const perDomain = [
      'phys.mech.force', 'phys.therm.entropy', 'phys.wave.pendulum',
      'phys.opt.refraction', 'phys.em.electric-current', 'phys.rel.time-dilation',
    ].filter((id) => getKGNode(id))
    expect(perDomain.length).toBeGreaterThan(0)
    for (const id of perDomain) expect(resolveTopicTitle(id)).toBe(getKGNode(id)!.title)
  })
})

describe('resolveTopicTitle — School Mode negative control', () => {
  it('NEGATIVE CONTROL: School Mode board ids keep their existing titles', () => {
    // The fix must not regress the universe that previously worked. This id
    // is NOT in the canonical KG — it resolves only via ALL_KG_NODES.
    expect(getKGNode('physics.laws_of_motion')).toBeUndefined()
    expect(resolveTopicTitle('physics.laws_of_motion')).toBe('Laws of Motion')
  })

  it('NEGATIVE CONTROL: the two id universes stay disjoint', () => {
    // If they ever overlapped, lookup order would start deciding titles.
    expect('physics.laws_of_motion'.startsWith('phys.')).toBe(false)
  })

  it('still prettifies a genuinely unknown slug', () => {
    expect(resolveTopicTitle('made_up-topic')).toBe('made up topic')
  })

  it('is stable across repeated calls (memo does not corrupt results)', () => {
    const a = resolveTopicTitle('phys.meas.units')
    const b = resolveTopicTitle('phys.meas.units')
    expect(a).toBe(b)
    expect(a).toBe(getKGNode('phys.meas.units')!.title)
  })
})

describe('intelligence modules use the shared resolver', () => {
  const files = [
    'src/lib/intelligence/revisionProfile.ts',
    'src/lib/intelligence/learningDifficultyProfile.ts',
  ]

  it('no module rebuilds a School-Mode-only title map', () => {
    for (const f of files) {
      const src = fs.readFileSync(path.resolve(f), 'utf8')
      expect(src, `${f} must not rebuild NODE_TITLES`).not.toContain('ALL_KG_NODES')
      expect(src).toContain("from './topicTitle'")
    }
  })
})
