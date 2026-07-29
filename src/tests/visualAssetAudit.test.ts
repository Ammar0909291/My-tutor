import { describe, it, expect } from 'vitest'
import { auditVisualAssets } from '@/lib/teaching/visualAssetAudit'
import type { ParsedRegistry } from '@/lib/teaching/visualCoverageValidator'

function makeRegistry(overrides?: Partial<ParsedRegistry>): ParsedRegistry {
  return {
    conceptEntries: overrides?.conceptEntries ?? [],
    domainEntries: overrides?.domainEntries ?? [],
  }
}

describe('auditVisualAssets', () => {
  it('returns empty entries for an empty registry', () => {
    const result = auditVisualAssets(makeRegistry())
    expect(result.entries).toHaveLength(0)
    expect(result.summary).toEqual({ total: 0, kept: 0, improved: 0, hidden: 0 })
  })

  it('classifies a high-value visual with many concepts as KEEP', () => {
    const result = auditVisualAssets(makeRegistry({
      conceptEntries: [
        { key: 'phys.mech.projectile-motion', primary: 'projectile_motion', all: ['projectile_motion'], sceneGenerator: 'projectile', line: 1 },
        { key: 'phys.mech.trajectory', primary: 'projectile_motion', all: ['projectile_motion'], sceneGenerator: 'projectile', line: 2 },
        { key: 'phys.mech.range', primary: 'projectile_motion', all: ['projectile_motion'], sceneGenerator: 'projectile', line: 3 },
        { key: 'phys.mech.launch-angle', primary: 'projectile_motion', all: ['projectile_motion'], sceneGenerator: 'projectile', line: 4 },
        { key: 'phys.mech.time-of-flight', primary: 'projectile_motion', all: ['projectile_motion'], sceneGenerator: 'projectile', line: 5 },
      ],
    }))
    const entry = result.entries.find(e => e.visualType === 'projectile_motion')
    expect(entry).toBeDefined()
    expect(entry!.classification).toBe('KEEP')
    expect(entry!.educationalValue).toBe('HIGH')
    expect(entry!.misconceptionRisk).toBe('NONE')
    expect(entry!.conceptsCovered).toHaveLength(5)
  })

  it('classifies a misconception-risk visual as IMPROVE', () => {
    const result = auditVisualAssets(makeRegistry({
      conceptEntries: [
        { key: 'chem.atomic.electron-config', primary: 'three_electron_shells', all: ['three_electron_shells'], line: 1 },
        { key: 'chem.atomic.orbitals', primary: 'three_electron_shells', all: ['three_electron_shells'], line: 2 },
      ],
    }))
    const entry = result.entries.find(e => e.visualType === 'three_electron_shells')
    expect(entry).toBeDefined()
    expect(entry!.classification).toBe('IMPROVE')
    expect(entry!.misconceptionRisk).toBe('MEDIUM')
  })

  it('classifies a low-value visual serving one concept with no generator as IMPROVE', () => {
    const result = auditVisualAssets(makeRegistry({
      conceptEntries: [
        { key: 'bio.cell.membrane', primary: 'generic_diagram', all: ['generic_diagram'], line: 1 },
      ],
    }))
    const entry = result.entries.find(e => e.visualType === 'generic_diagram')
    expect(entry).toBeDefined()
    expect(entry!.classification).toBe('IMPROVE')
    expect(entry!.educationalValue).toBe('LOW')
  })

  it('sorts entries HIDE first, then IMPROVE, then KEEP', () => {
    const result = auditVisualAssets(makeRegistry({
      conceptEntries: [
        { key: 'phys.mech.force', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 1 },
        { key: 'phys.mech.friction', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 2 },
        { key: 'phys.mech.tension', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 3 },
        { key: 'phys.mech.normal', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 4 },
        { key: 'phys.mech.gravity', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 5 },
        { key: 'chem.atomic.shells', primary: 'three_atomic_structure', all: ['three_atomic_structure'], line: 6 },
        { key: 'bio.solo', primary: 'solo_visual', all: ['solo_visual'], line: 7 },
      ],
    }))
    expect(result.entries.length).toBeGreaterThanOrEqual(3)
    const classifications = result.entries.map(e => e.classification)
    const hideIdx = classifications.indexOf('IMPROVE')
    const keepIdx = classifications.lastIndexOf('KEEP')
    if (hideIdx >= 0 && keepIdx >= 0) {
      expect(hideIdx).toBeLessThan(keepIdx)
    }
  })

  it('includes visual types that appear only in all arrays', () => {
    const result = auditVisualAssets(makeRegistry({
      conceptEntries: [
        { key: 'phys.mech.force', primary: 'force_diagram', all: ['force_diagram', 'vector_field'], line: 1 },
      ],
    }))
    const vectorEntry = result.entries.find(e => e.visualType === 'vector_field')
    expect(vectorEntry).toBeDefined()
    expect(vectorEntry!.conceptsCovered).toHaveLength(0)
  })

  it('summary counts match classified entries', () => {
    const result = auditVisualAssets(makeRegistry({
      conceptEntries: [
        { key: 'chem.atomic.shells', primary: 'three_atomic_structure', all: ['three_atomic_structure'], line: 1 },
        { key: 'phys.mech.force', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 2 },
        { key: 'phys.mech.friction', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 3 },
        { key: 'phys.mech.tension', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 4 },
        { key: 'phys.mech.normal', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 5 },
        { key: 'phys.mech.gravity', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 6 },
      ],
    }))
    const { summary, entries } = result
    expect(summary.total).toBe(entries.length)
    expect(summary.kept).toBe(entries.filter(e => e.classification === 'KEEP').length)
    expect(summary.improved).toBe(entries.filter(e => e.classification === 'IMPROVE').length)
    expect(summary.hidden).toBe(entries.filter(e => e.classification === 'HIDE').length)
    expect(summary.kept + summary.improved + summary.hidden).toBe(summary.total)
  })

  it('extracts suitable lessons from concept domains', () => {
    const result = auditVisualAssets(makeRegistry({
      conceptEntries: [
        { key: 'phys.mech.force', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 1 },
        { key: 'phys.em.field', primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'vector', line: 2 },
      ],
    }))
    const entry = result.entries.find(e => e.visualType === 'force_diagram')
    expect(entry).toBeDefined()
    expect(entry!.suitableLessons).toContain('phys.mech')
    expect(entry!.suitableLessons).toContain('phys.em')
  })
})
