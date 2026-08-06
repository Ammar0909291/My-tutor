/**
 * Visualization Knowledge Registry (VKR) — coverage, shape, and boundary tests.
 */
import { describe, it, expect } from 'vitest'
import {
  lookupVisualKnowledge, hasVisualKnowledge, bestPatternFor, registeredConceptIds,
} from '@/lib/teaching/visualKnowledgeRegistry'
import { validateVisualIntent } from '@/lib/teaching/visualIntent'
import { buildVisualIntentFromRegistry, canBuildVisualIntent } from '@/lib/teaching/visualIntelligenceEngine'

describe('VKR · coverage', () => {
  it('carries 20-30 seed concepts', () => {
    const ids = registeredConceptIds()
    expect(ids.length).toBeGreaterThanOrEqual(20)
    expect(ids.length).toBeLessThanOrEqual(30)
  })

  it('covers all five requested subjects', () => {
    const ids = registeredConceptIds()
    expect(ids.some(id => id.startsWith('phys.'))).toBe(true)
    expect(ids.some(id => id.startsWith('math.'))).toBe(true)
    expect(ids.some(id => id.startsWith('chem.'))).toBe(true)
    expect(ids.some(id => id.startsWith('bio.'))).toBe(true)
    expect(ids.some(id => id.startsWith('eng.'))).toBe(true)
  })

  it('has no duplicate concept IDs', () => {
    const ids = registeredConceptIds()
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('VKR · lookup API', () => {
  it('returns null for unknown/null concept IDs', () => {
    expect(lookupVisualKnowledge('not.a.real.concept')).toBeNull()
    expect(lookupVisualKnowledge(null)).toBeNull()
    expect(hasVisualKnowledge('not.a.real.concept')).toBe(false)
    expect(hasVisualKnowledge(null)).toBe(false)
  })

  it('returns a full entry for a known concept', () => {
    const entry = lookupVisualKnowledge('phys.mech.force')
    expect(entry).not.toBeNull()
    expect(entry!.conceptId).toBe('phys.mech.force')
    expect(entry!.patterns.length).toBeGreaterThan(0)
  })

  it('bestPatternFor returns the first pattern, or null when unknown', () => {
    const entry = lookupVisualKnowledge('math.arith.fractions')!
    expect(bestPatternFor('math.arith.fractions')).toEqual(entry.patterns[0])
    expect(bestPatternFor('nope')).toBeNull()
  })

  it('is a pure function: repeated lookups return equal (deep) content', () => {
    const a = lookupVisualKnowledge('chem.bond.vsepr')
    const b = lookupVisualKnowledge('chem.bond.vsepr')
    expect(a).toEqual(b)
  })
})

describe('VKR · every entry is production-quality and internally consistent', () => {
  const ids = registeredConceptIds()

  it.each(ids)('%s: every required knowledge field is present and non-empty', (id) => {
    const e = lookupVisualKnowledge(id)!
    expect(e.patterns.length).toBeGreaterThan(0)
    expect(e.learningObjectives.length).toBeGreaterThan(0)
    expect(e.misconceptionMappings.length).toBeGreaterThan(0)
    expect(e.interactionRecommendations.length + e.animationRecommendations.length).toBeGreaterThan(0)
    expect(e.narrationRecommendations.length).toBeGreaterThan(0)
    expect(e.emphasisTargets.length).toBeGreaterThan(0)
    expect(e.accessibilityGuidance.trim().length).toBeGreaterThan(0)
    expect(e.assessmentHints.length).toBeGreaterThan(0)
  })

  it.each(ids)('%s: every pattern is a structurally valid VisualIntent seed', (id) => {
    const e = lookupVisualKnowledge(id)!
    for (const pattern of e.patterns) {
      const problems = validateVisualIntent({
        purpose: pattern.purpose,
        claim: pattern.claim,
        formClass: pattern.formClass,
        constraints: pattern.mustVaryExactlyOne ? { mustVaryExactlyOne: pattern.mustVaryExactlyOne } : undefined,
      })
      expect(problems).toEqual([])
    }
  })

  it.each(ids)('%s: prerequisite/continuation references point at real registry IDs or the wider KG (non-empty strings)', (id) => {
    const e = lookupVisualKnowledge(id)!
    for (const p of e.prerequisiteMappings) {
      expect(p.conceptId.trim().length).toBeGreaterThan(0)
      expect(p.reuses.trim().length).toBeGreaterThan(0)
    }
    for (const c of e.continuationHints) {
      expect(c.trim().length).toBeGreaterThan(0)
    }
  })
})

describe('VKR · registry never owns rendering', () => {
  it('no entry field contains renderer/SVG/HTML/Canvas vocabulary', () => {
    const banned = /\b(svg|canvas|<html|renderer|VisualAsset)\b/i
    for (const id of registeredConceptIds()) {
      const json = JSON.stringify(lookupVisualKnowledge(id))
      expect(banned.test(json)).toBe(false)
    }
  })
})

describe('VIE integration · buildVisualIntentFromRegistry', () => {
  it('builds a valid VisualIntent for a known concept', () => {
    const intent = buildVisualIntentFromRegistry('phys.mech.momentum')
    expect(intent).not.toBeNull()
    expect(validateVisualIntent(intent!)).toEqual([])
    expect(intent!.a11yRequirement).toBe(lookupVisualKnowledge('phys.mech.momentum')!.accessibilityGuidance)
  })

  it('returns null for a concept with no registry entry', () => {
    expect(buildVisualIntentFromRegistry('not.a.real.concept')).toBeNull()
    expect(buildVisualIntentFromRegistry(null)).toBeNull()
  })

  it('canBuildVisualIntent mirrors hasVisualKnowledge', () => {
    expect(canBuildVisualIntent('math.geom.triangle')).toBe(true)
    expect(canBuildVisualIntent('nope')).toBe(false)
  })

  it('falls back to pattern 0 when patternIndex is out of range', () => {
    const inRange = buildVisualIntentFromRegistry('eng.grammar.simple-sentences', 0)
    const outOfRange = buildVisualIntentFromRegistry('eng.grammar.simple-sentences', 99)
    expect(outOfRange).toEqual(inRange)
  })
})
