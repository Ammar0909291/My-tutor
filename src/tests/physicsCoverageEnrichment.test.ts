/**
 * Physics coverage-driven KG extension, audit §C (2026-10-04): fifteen thin
 * topics enriched in place on existing concepts — one Core Understanding
 * paragraph and one gradeable probe each, no new KG node.
 *
 * The paragraph carries no governing wording and no back-reference opener, so
 * packCoreUnderstanding admits it only into spare budget: it can never push an
 * already-exposed unit out. Where the budget is spent it stays in the EB entry
 * only (asserted below as `exposed: false`), and the probe carries the topic.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import { packCoreUnderstanding } from '@/lib/curriculum/ebKnowledge'
import { EB_CORE_UNDERSTANDING_BUDGET } from '@/lib/curriculum/blueprintLoader'

// concept → [a phrase from the added paragraph, exposed to the tutor's authoritative channel?]
const ENRICHED: Record<string, [string, boolean]> = {
  'phys.mech.moment-of-inertia': ['perpendicular-axis theorem gives I_z = I_x + I_y', true],
  'phys.mech.circular-motion': ['A conical pendulum shows the centripetal force at work', false],
  'phys.mech.stress-strain': ['A stretched wire stores elastic potential energy', true],
  'phys.mech.pressure-fluids': ['A mercury barometer measures it', true],
  'phys.mech.fluid-flow': ['at 1.0 m/s in a 2.0 cm pipe has Re', false],
  'phys.em.electric-charge': ['a lightning conductor', false],
  'phys.em.wheatstone-bridge': ['A meter bridge is a Wheatstone bridge', true],
  'phys.em.resistivity': ['Small resistors carry their value as coloured bands', true],
  'phys.em.magnetic-force': ['the basis of the ampere\'s definition until 2019', false],
  'phys.mod.nuclear-fission': ['Control rods of boron or cadmium absorb neutrons', false],
  'phys.opt.refraction': ['Stars twinkle because', false],
  'phys.wave.sound-waves': ['quality, or timbre', true],
  'phys.rel.lorentz-transform': ['relativistic Doppler effect', false],
  'phys.qm.density-matrix': ['Bell inequalities test this', false],
  'phys.therm.kinetic-theory': ['The mean free path is λ = 1/(√2 π d² n)', false],
}

const core = (id: string) => {
  const t = readFileSync(`educational-brain/concepts/physics/${id}.md`, 'utf8')
  return t.match(/## Core Understanding\n([\s\S]*?)\n## /)![1].trim()
}

describe('audit §C enrichment', () => {
  for (const [id, [phrase, exposed]] of Object.entries(ENRICHED)) {
    it(`${id}: paragraph authored, ${exposed ? 'exposed' : 'kept in the EB entry only'}, one gradeable probe`, () => {
      const raw = core(id)
      expect(raw).toContain(phrase)
      const packed = packCoreUnderstanding(raw, EB_CORE_UNDERSTANDING_BUDGET).text
      expect(packed.includes(phrase)).toBe(exposed)
      const probes = AUTHORED_PROBES.filter((p) => p.conceptId === id && p.source.includes('PHYSICS_KG_GAP_AUDIT.md §C'))
      expect(probes).toHaveLength(1)
      expect(probes[0].choices!.length).toBeGreaterThanOrEqual(2)
      expect(probes[0].choices!.filter((c) => c.isCorrect)).toHaveLength(1)
      for (const c of probes[0].choices!) if (c.misconceptionId) expect(probes[0].targetedMisconceptions).toContain(c.misconceptionId)
    })
  }
})
