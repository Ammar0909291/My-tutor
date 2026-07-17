/**
 * Visualization Registry Coverage Validator — unit tests.
 *
 * Tests the pure classification/detection logic in isolation from any real
 * KG or registry file, using small synthetic fixtures — so every category
 * (orphan, duplicate, broken reference, incorrect mapping, intentional
 * null, intentional fallback) is proven correct independent of whatever
 * the real registry currently contains. A separate integration check (at
 * the bottom of this file) runs the parser against the REAL
 * visualRegistry.ts source to confirm the tool actually works end-to-end
 * on production data, without asserting today's exact counts (which will
 * legitimately change as content is authored).
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  parseVisualRegistrySource, findDuplicateMappings, findOrphanEntries,
  findBrokenReferences, classifyConcept, auditVisualizationCoverage,
  looksLikeForceDiagramMisassignment,
  type ParsedRegistry,
} from '@/lib/teaching/visualCoverageValidator'

function makeSource(concepts: string, domains = ''): string {
  return `
const CONCEPT_VISUALS = {
${concepts}
}
const DOMAIN_VISUALS = [
${domains}
]
`
}

describe('parseVisualRegistrySource', () => {
  it('parses a well-formed concept entry, including its scene generator', () => {
    const source = makeSource(`  'phys.mech.projectile-motion': { primary: 'three_projectile_motion', all: ['three_projectile_motion', 'force_diagram'], sceneGenerator: 'projectile' },`)
    const parsed = parseVisualRegistrySource(source)
    expect(parsed.conceptEntries).toHaveLength(1)
    expect(parsed.conceptEntries[0]).toMatchObject({
      key: 'phys.mech.projectile-motion',
      primary: 'three_projectile_motion',
      all: ['three_projectile_motion', 'force_diagram'],
      sceneGenerator: 'projectile',
    })
  })

  it('parses an entry with no scene generator', () => {
    const source = makeSource(`  'phys.mech.force': { primary: 'force_diagram', all: ['force_diagram'] },`)
    const parsed = parseVisualRegistrySource(source)
    expect(parsed.conceptEntries[0].sceneGenerator).toBeUndefined()
  })

  it('parses domainRule() calls', () => {
    const source = makeSource('', `  domainRule('phys.em', 'circuit_diagram', ['circuit_diagram']),`)
    const parsed = parseVisualRegistrySource(source)
    expect(parsed.domainEntries).toHaveLength(1)
    expect(parsed.domainEntries[0]).toMatchObject({ prefix: 'phys.em', primary: 'circuit_diagram', all: ['circuit_diagram'] })
  })
})

// ── Category G: duplicate detection ───────────────────────────────────────────

describe('findDuplicateMappings (Category G)', () => {
  it('flags two entries sharing the same key', () => {
    const source = makeSource([
      `  'phys.mech.force': { primary: 'force_diagram', all: ['force_diagram'] },`,
      `  'phys.mech.force': { primary: 'three_newton_forces', all: ['three_newton_forces'] },`,
    ].join('\n'))
    const parsed = parseVisualRegistrySource(source)
    const dupes = findDuplicateMappings(parsed)
    expect(dupes).toHaveLength(1)
    expect(dupes[0].key).toBe('phys.mech.force')
    expect(dupes[0].lines).toHaveLength(2)
  })

  it('does not flag distinct keys', () => {
    const source = makeSource([
      `  'phys.mech.force': { primary: 'force_diagram', all: ['force_diagram'] },`,
      `  'phys.mech.tension': { primary: 'force_diagram', all: ['force_diagram'] },`,
    ].join('\n'))
    expect(findDuplicateMappings(parseVisualRegistrySource(source))).toHaveLength(0)
  })

  it('flags three-way duplicates with all line numbers', () => {
    const source = makeSource([
      `  'x.y.z': { primary: 'force_diagram', all: ['force_diagram'] },`,
      `  'x.y.z': { primary: 'number_line', all: ['number_line'] },`,
      `  'x.y.z': { primary: 'coordinate_plane', all: ['coordinate_plane'] },`,
    ].join('\n'))
    const dupes = findDuplicateMappings(parseVisualRegistrySource(source))
    expect(dupes[0].lines).toHaveLength(3)
  })
})

// ── Category E: orphan detection ──────────────────────────────────────────────

describe('findOrphanEntries (Category E)', () => {
  it('flags a registry key with no matching KG concept', () => {
    const source = makeSource(`  'phys.mech.gravitation': { primary: 'force_diagram', all: ['force_diagram'] },`)
    const parsed = parseVisualRegistrySource(source)
    const kgIds = new Set(['phys.mech.universal-gravitation']) // real ID differs from the registry key
    const orphans = findOrphanEntries(parsed, kgIds)
    expect(orphans).toHaveLength(1)
    expect(orphans[0].key).toBe('phys.mech.gravitation')
  })

  it('does not flag a key that matches a real KG concept', () => {
    const source = makeSource(`  'phys.mech.force': { primary: 'force_diagram', all: ['force_diagram'] },`)
    const parsed = parseVisualRegistrySource(source)
    const kgIds = new Set(['phys.mech.force'])
    expect(findOrphanEntries(parsed, kgIds)).toHaveLength(0)
  })

  it('reports a duplicated orphan key only once, not once per occurrence', () => {
    const source = makeSource([
      `  'x.orphan': { primary: 'force_diagram', all: ['force_diagram'] },`,
      `  'x.orphan': { primary: 'number_line', all: ['number_line'] },`,
    ].join('\n'))
    const parsed = parseVisualRegistrySource(source)
    const orphans = findOrphanEntries(parsed, new Set())
    expect(orphans).toHaveLength(1)
  })
})

// ── Category F: broken reference detection ────────────────────────────────────

describe('findBrokenReferences (Category F)', () => {
  const validTypes = new Set(['force_diagram', 'number_line', 'coordinate_plane'])
  const validScenes = new Set(['projectile', 'collision'])

  it('flags a primary referencing a non-existent VisualType', () => {
    const source = makeSource(`  'x.y': { primary: 'nonexistent_visual', all: ['nonexistent_visual'] },`)
    const findings = findBrokenReferences(parseVisualRegistrySource(source), validTypes, validScenes)
    expect(findings).toHaveLength(2) // primary AND the same bad value in all[]
    expect(findings.some((f) => f.field === 'primary' && f.value === 'nonexistent_visual')).toBe(true)
  })

  it('flags a sceneGenerator referencing a non-existent SceneGeneratorKind', () => {
    const source = makeSource(`  'x.y': { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'nonexistent_scene' },`)
    const findings = findBrokenReferences(parseVisualRegistrySource(source), validTypes, validScenes)
    expect(findings).toHaveLength(1)
    expect(findings[0]).toMatchObject({ field: 'sceneGenerator', value: 'nonexistent_scene' })
  })

  it('flags a broken reference inside a domain rule too', () => {
    const source = makeSource('', `  domainRule('phys.x', 'nonexistent_visual', ['nonexistent_visual']),`)
    const findings = findBrokenReferences(parseVisualRegistrySource(source), validTypes, validScenes)
    expect(findings.some((f) => f.field === 'domain.primary')).toBe(true)
  })

  it('does not flag valid references', () => {
    const source = makeSource(`  'x.y': { primary: 'force_diagram', all: ['force_diagram', 'number_line'], sceneGenerator: 'collision' },`)
    expect(findBrokenReferences(parseVisualRegistrySource(source), validTypes, validScenes)).toHaveLength(0)
  })
})

// ── Category D: incorrect mapping heuristic ───────────────────────────────────

describe('looksLikeForceDiagramMisassignment (Category D heuristic)', () => {
  it.each([
    'Displacement and Distance',
    'Speed and Velocity',
    'Acceleration',
    'Kinetic Energy',
    'Pressure in Fluids',
    'Viscosity and Stokes\' Law',
  ])('flags %j as a likely force_diagram misassignment', (name) => {
    expect(looksLikeForceDiagramMisassignment(name)).toBe(true)
  })

  it.each([
    'Force and Interaction',
    'Free Body Diagrams',
    'Tension in Strings and Ropes',
    "Newton's First Law — Inertia",
    'Work Done by a Force', // contains "work" AND "force" — not flagged
    'Static Equilibrium',
  ])('does not flag %j (dynamics word present, or no kinematics word at all)', (name) => {
    expect(looksLikeForceDiagramMisassignment(name)).toBe(false)
  })
})

describe('classifyConcept — Category D end-to-end', () => {
  it('classifies a force_diagram-assigned pure-kinematics concept as D_INCORRECT', () => {
    const source = makeSource(`  'phys.mech.displacement': { primary: 'force_diagram', all: ['force_diagram'] },`)
    const parsed = parseVisualRegistrySource(source)
    const result = classifyConcept('phys.mech.displacement', 'Displacement and Distance', parsed)
    expect(result.category).toBe('D_INCORRECT')
    expect(result.visual).toBe('force_diagram')
  })

  it('classifies the SAME concept as A_EXACT once it is remapped to a correct visual', () => {
    const source = makeSource(`  'phys.mech.displacement': { primary: 'number_line', all: ['number_line'] },`)
    const parsed = parseVisualRegistrySource(source)
    const result = classifyConcept('phys.mech.displacement', 'Displacement and Distance', parsed)
    expect(result.category).toBe('A_EXACT')
    expect(result.visual).toBe('number_line')
  })

  it('a force_diagram assignment on a genuine force concept is NOT flagged', () => {
    const source = makeSource(`  'phys.mech.tension': { primary: 'force_diagram', all: ['force_diagram'] },`)
    const parsed = parseVisualRegistrySource(source)
    const result = classifyConcept('phys.mech.tension', 'Tension in Strings and Ropes', parsed)
    expect(result.category).toBe('A_EXACT')
  })
})

// ── Category B: intentional fallback ──────────────────────────────────────────

describe('classifyConcept — Category B (intentional fallback)', () => {
  it('classifies a concept with no exact entry but a matching domain prefix as B_FALLBACK', () => {
    const parsed: ParsedRegistry = {
      conceptEntries: [],
      domainEntries: [{ prefix: 'phys.em', primary: 'circuit_diagram', all: ['circuit_diagram'], line: 1 }],
    }
    const result = classifyConcept('phys.em.some-new-concept', 'Some New Concept', parsed)
    expect(result.category).toBe('B_FALLBACK')
    expect(result.visual).toBe('circuit_diagram')
  })

  it('picks the LONGEST matching domain prefix, mirroring the real registry\'s tie-break', () => {
    const parsed: ParsedRegistry = {
      conceptEntries: [],
      domainEntries: [
        { prefix: 'phys', primary: 'force_diagram', all: ['force_diagram'], line: 1 },
        { prefix: 'phys.em', primary: 'circuit_diagram', all: ['circuit_diagram'], line: 2 },
      ],
    }
    const result = classifyConcept('phys.em.ohms-law', "Ohm's Law", parsed)
    expect(result.visual).toBe('circuit_diagram')
  })
})

// ── Category C: intentional null ──────────────────────────────────────────────

describe('classifyConcept — Category C (intentional null)', () => {
  it('classifies a concept with no exact entry and no matching domain as C_NULL', () => {
    const parsed: ParsedRegistry = { conceptEntries: [], domainEntries: [] }
    const result = classifyConcept('phys.mech.hamiltons-equations', "Hamilton's Equations of Motion", parsed)
    expect(result.category).toBe('C_NULL')
    expect(result.visual).toBeNull()
  })
})

// ── Full report shape + CI pass/fail semantics ───────────────────────────────

describe('auditVisualizationCoverage — CI pass/fail semantics', () => {
  const validTypes = new Set(['force_diagram', 'number_line'])
  const validScenes = new Set(['collision'])

  it('passes when Incorrect=0, Broken References=0, Duplicates=0 (orphans/nulls/fallbacks do not block)', () => {
    const source = makeSource(`  'a.b.c': { primary: 'force_diagram', all: ['force_diagram'] },`)
    const parsed = parseVisualRegistrySource(source)
    const report = auditVisualizationCoverage(
      [{ id: 'a.b.c', name: 'Force Concept' }, { id: 'a.b.d', name: 'Something Else' }],
      parsed, validTypes, validScenes,
    )
    expect(report.counts.D_INCORRECT).toBe(0)
    expect(report.brokenReferences).toHaveLength(0)
    expect(report.duplicates).toHaveLength(0)
    expect(report.passes).toBe(true)
  })

  it('fails when an Incorrect mapping exists', () => {
    const source = makeSource(`  'a.b.velocity': { primary: 'force_diagram', all: ['force_diagram'] },`)
    const parsed = parseVisualRegistrySource(source)
    const report = auditVisualizationCoverage([{ id: 'a.b.velocity', name: 'Speed and Velocity' }], parsed, validTypes, validScenes)
    expect(report.passes).toBe(false)
  })

  it('fails when a broken reference exists', () => {
    const source = makeSource(`  'a.b.c': { primary: 'not_a_real_type', all: ['not_a_real_type'] },`)
    const parsed = parseVisualRegistrySource(source)
    const report = auditVisualizationCoverage([{ id: 'a.b.c', name: 'X' }], parsed, validTypes, validScenes)
    expect(report.passes).toBe(false)
  })

  it('fails when a duplicate mapping exists', () => {
    const source = makeSource([
      `  'a.b.c': { primary: 'force_diagram', all: ['force_diagram'] },`,
      `  'a.b.c': { primary: 'number_line', all: ['number_line'] },`,
    ].join('\n'))
    const parsed = parseVisualRegistrySource(source)
    const report = auditVisualizationCoverage([{ id: 'a.b.c', name: 'X' }], parsed, validTypes, validScenes)
    expect(report.passes).toBe(false)
  })

  it('does NOT fail on orphan entries alone (warning only)', () => {
    const source = makeSource(`  'orphan.key': { primary: 'force_diagram', all: ['force_diagram'] },`)
    const parsed = parseVisualRegistrySource(source)
    const report = auditVisualizationCoverage([{ id: 'a.b.c', name: 'X' }], parsed, validTypes, validScenes)
    expect(report.orphans.length).toBeGreaterThan(0)
    expect(report.passes).toBe(true)
  })

  // Regression: the CLI's --subject filter narrows which concepts are
  // CLASSIFIED, but must never narrow the universe orphan detection checks
  // against — otherwise every other subject's legitimate registry entries
  // get misreported as orphans purely because they're outside the filter.
  it('a concept ID belonging to a DIFFERENT subject is not falsely flagged as an orphan when allKnownConceptIds covers it', () => {
    const source = makeSource(`  'chem.bond.ionic-bond': { primary: 'three_bond_formation', all: ['three_bond_formation'] },`)
    const parsed = parseVisualRegistrySource(source)
    // Classifying only physics concepts (simulating --subject=physics)...
    const physicsOnly = [{ id: 'phys.mech.force', name: 'Force and Interaction' }]
    // ...but the full universe includes the chemistry concept too.
    const allIds = new Set(['phys.mech.force', 'chem.bond.ionic-bond'])
    const report = auditVisualizationCoverage(physicsOnly, parsed, validTypes, validScenes, allIds)
    expect(report.orphans).toHaveLength(0)
  })

  it('WITHOUT the full universe (old behavior), the same entry is wrongly flagged — proving the fix matters', () => {
    const source = makeSource(`  'chem.bond.ionic-bond': { primary: 'three_bond_formation', all: ['three_bond_formation'] },`)
    const parsed = parseVisualRegistrySource(source)
    const physicsOnly = [{ id: 'phys.mech.force', name: 'Force and Interaction' }]
    // No allKnownConceptIds passed — falls back to physicsOnly's own IDs.
    const report = auditVisualizationCoverage(physicsOnly, parsed, validTypes, validScenes)
    expect(report.orphans).toHaveLength(1)
    expect(report.orphans[0].key).toBe('chem.bond.ionic-bond')
  })

  it('does NOT fail on Expected Null or Intentional Fallback concepts', () => {
    const parsed: ParsedRegistry = { conceptEntries: [], domainEntries: [] }
    const report = auditVisualizationCoverage([{ id: 'x.y.z', name: 'Unmapped Thing' }], parsed, validTypes, validScenes)
    expect(report.counts.C_NULL).toBe(1)
    expect(report.passes).toBe(true)
  })
})

// ── Integration check against the REAL registry (no hardcoded counts) ────────

describe('integration — real visualRegistry.ts source', () => {
  const registryPath = path.join(process.cwd(), 'src/lib/teaching/visualRegistry.ts')
  const source = fs.readFileSync(registryPath, 'utf8')
  const parsed = parseVisualRegistrySource(source)

  it('parses at least the concept entries known to exist today (parser is not silently broken)', () => {
    // A loose lower bound, not an exact count — the registry grows over
    // time; this only proves the regex-based parser still matches the
    // real file's current formatting style.
    expect(parsed.conceptEntries.length).toBeGreaterThan(100)
    expect(parsed.domainEntries.length).toBeGreaterThan(10)
  })

  it('finds zero duplicate keys in the real registry today', () => {
    expect(findDuplicateMappings(parsed)).toHaveLength(0)
  })

  it('phys.mech.displacement (the P0 bug) is present and correctly NOT force_diagram', () => {
    const entry = parsed.conceptEntries.find((e) => e.key === 'phys.mech.displacement')
    expect(entry).toBeDefined()
    expect(entry!.primary).not.toBe('force_diagram')
  })
})
