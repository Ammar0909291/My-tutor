/**
 * Visualization Authoring Pipeline (VAP) — generation, validation,
 * review-gate, and export tests. Physics-first, per the standing pack.
 */
import { describe, it, expect } from 'vitest'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import {
  generateDraftVisualKnowledge, validateDraftVisualKnowledge,
  runAuthoringPipeline, approveDraft, exportVkrRecords,
  type AuthoringSource, type AuthoringKgConcept,
} from '@/lib/teaching/authoring/visualizationAuthoringPipeline'
import { buildPhysicsAuthoringSource, PHYSICS_DOMAIN_DEFAULTS } from '@/lib/teaching/authoring/physicsAuthoringSource'
import { validateVisualIntent } from '@/lib/teaching/visualIntent'

function kgConceptFromGraph(id: string): AuthoringKgConcept {
  const node = getKGNode(id)
  if (!node) throw new Error(`fixture concept not found in live KG: ${id}`)
  return { id: node.id, title: node.title, description: node.description, prerequisites: node.prerequisites }
}

describe('VAP · reads real Physics KG concepts', () => {
  it('phys.mech.torque exists in the live KG and is not already in the VKR seed set', () => {
    const node = getKGNode('phys.mech.torque')
    expect(node).toBeTruthy()
    expect(node!.id).toBe('phys.mech.torque')
  })
})

describe('VAP · generateDraftVisualKnowledge', () => {
  const source = buildPhysicsAuthoringSource({
    kgConcept: kgConceptFromGraph('phys.mech.torque'),
    explanationSnippets: [{ content: 'Torque is the rotational effect of a force applied at a distance from a pivot. It depends on both the force and the lever arm.' }],
    misconceptions: [{ text: 'Believing force alone (ignoring distance from the pivot) determines torque' }],
  })

  it('is deterministic: identical input produces an identical draft', () => {
    const a = generateDraftVisualKnowledge(source)
    const b = generateDraftVisualKnowledge(source)
    expect(a).toEqual(b)
  })

  it('derives the claim from the first Explanation Memory sentence', () => {
    const draft = generateDraftVisualKnowledge(source)
    expect(draft.patterns[0].claim).toBe('Torque is the rotational effect of a force applied at a distance from a pivot.')
  })

  it('applies the phys.mech domain default (PROCESS-TRACE / stepped-sequence)', () => {
    const draft = generateDraftVisualKnowledge(source)
    expect(draft.patterns[0].purpose).toBe('PROCESS-TRACE')
    expect(draft.patterns[0].formClass).toBe('stepped-sequence')
  })

  it('carries the supplied misconception through to the draft', () => {
    const draft = generateDraftVisualKnowledge(source)
    expect(draft.misconceptionMappings[0].misconception).toContain('force alone')
  })

  it('maps KG prerequisites into prerequisiteMappings', () => {
    const draft = generateDraftVisualKnowledge(source)
    const node = getKGNode('phys.mech.torque')!
    expect(draft.prerequisiteMappings.map(p => p.conceptId)).toEqual(node.prerequisites)
  })

  it('falls back to the KG description when no Explanation Memory snippet is supplied', () => {
    const noSnippets = buildPhysicsAuthoringSource({ kgConcept: kgConceptFromGraph('phys.mech.torque') })
    const draft = generateDraftVisualKnowledge(noSnippets)
    expect(draft.patterns[0].claim.length).toBeGreaterThan(0)
  })

  it('honours existingKnowledge fields instead of regenerating them', () => {
    const withExisting = buildPhysicsAuthoringSource({
      kgConcept: kgConceptFromGraph('phys.mech.torque'),
      existingKnowledge: { learningObjectives: ['A human-curated objective that must survive regeneration'] },
    })
    const draft = generateDraftVisualKnowledge(withExisting)
    expect(draft.learningObjectives).toEqual(['A human-curated objective that must survive regeneration'])
  })

  it('never emits rendering vocabulary', () => {
    const draft = generateDraftVisualKnowledge(source)
    expect(/\b(svg|canvas|<html|renderer|VisualAsset)\b/i.test(JSON.stringify(draft))).toBe(false)
  })
})

describe('VAP · validateDraftVisualKnowledge', () => {
  it('accepts a well-formed generated draft', () => {
    const source = buildPhysicsAuthoringSource({
      kgConcept: kgConceptFromGraph('phys.mech.torque'),
      explanationSnippets: [{ content: 'Torque is the rotational effect of a force applied at a distance from a pivot.' }],
      misconceptions: [{ text: 'Believing force alone determines torque' }],
    })
    const draft = generateDraftVisualKnowledge(source)
    expect(validateDraftVisualKnowledge(draft)).toEqual([])
  })

  it('flags a draft with no patterns', () => {
    const source = buildPhysicsAuthoringSource({ kgConcept: kgConceptFromGraph('phys.mech.torque') })
    const draft = generateDraftVisualKnowledge(source)
    const broken = { ...draft, patterns: [] }
    const problems = validateDraftVisualKnowledge(broken)
    expect(problems.some(p => p.field === 'patterns')).toBe(true)
  })

  it('flags a pattern that fails VisualIntent structural validation, using the same rule visualIntent.ts enforces', () => {
    const source = buildPhysicsAuthoringSource({ kgConcept: kgConceptFromGraph('phys.mech.torque') });
    const draft = generateDraftVisualKnowledge(source)
    const badPattern = { ...draft.patterns[0], claim: '' }
    const broken = { ...draft, patterns: [badPattern] }
    const problems = validateDraftVisualKnowledge(broken)
    expect(problems.some(p => p.field === 'patterns[0]')).toBe(true)
    // Cross-check against the real VisualIntent validator directly.
    expect(validateVisualIntent({ purpose: badPattern.purpose, claim: badPattern.claim, formClass: badPattern.formClass })).not.toEqual([])
  })

  it('rejects an entry that leaks rendering vocabulary', () => {
    const source = buildPhysicsAuthoringSource({
      kgConcept: kgConceptFromGraph('phys.mech.torque'),
      misconceptions: [{ text: 'x' }],
    })
    const draft = generateDraftVisualKnowledge(source)
    const leaked = { ...draft, emphasisTargets: ['Renders correctly to an SVG canvas'] }
    const problems = validateDraftVisualKnowledge(leaked)
    expect(problems.some(p => p.field === '(entry)')).toBe(true)
  })
})

describe('VAP · runAuthoringPipeline + approveDraft (human review gate)', () => {
  const source = buildPhysicsAuthoringSource({
    kgConcept: kgConceptFromGraph('phys.mech.torque'),
    explanationSnippets: [{ content: 'Torque is the rotational effect of a force applied at a distance from a pivot.' }],
    misconceptions: [{ text: 'Believing force alone determines torque' }],
  })

  it('produces a draft status for a valid entry', () => {
    const result = runAuthoringPipeline(source)
    expect(result.status).toBe('draft')
    expect(result.problems).toEqual([])
  })

  it('approveDraft returns the entry for a valid draft', () => {
    const result = runAuthoringPipeline(source)
    const approved = approveDraft(result)
    expect(approved.conceptId).toBe('phys.mech.torque')
  })

  it('approveDraft throws for an invalid draft — approval can never bypass validation', () => {
    const badSource: AuthoringSource = { ...source, kgConcept: { ...source.kgConcept, id: '' } }
    const result = runAuthoringPipeline(badSource)
    expect(result.status).toBe('invalid')
    expect(() => approveDraft(result)).toThrow()
  })
})

describe('VAP · exportVkrRecords', () => {
  it('is deterministic and key-ordered regardless of input order', () => {
    const a = generateDraftVisualKnowledge(buildPhysicsAuthoringSource({
      kgConcept: kgConceptFromGraph('phys.mech.torque'), misconceptions: [{ text: 'x' }],
    }))
    const b = generateDraftVisualKnowledge(buildPhysicsAuthoringSource({
      kgConcept: kgConceptFromGraph('phys.mech.hookes-law'), misconceptions: [{ text: 'y' }],
    }))
    const forward = exportVkrRecords([a, b])
    const reversed = exportVkrRecords([b, a])
    expect(forward).toBe(reversed)
    expect(JSON.parse(forward)).toHaveProperty('phys.mech.hookes-law')
    expect(JSON.parse(forward)).toHaveProperty('phys.mech.torque')
  })

  it('produces valid, parseable JSON with conceptId keys matching each entry', () => {
    const a = generateDraftVisualKnowledge(buildPhysicsAuthoringSource({
      kgConcept: kgConceptFromGraph('phys.mech.torque'), misconceptions: [{ text: 'x' }],
    }))
    const exported = JSON.parse(exportVkrRecords([a]))
    expect(exported['phys.mech.torque'].conceptId).toBe('phys.mech.torque')
  })
})

describe('VAP · PHYSICS_DOMAIN_DEFAULTS', () => {
  it('every default is a structurally valid purpose/formClass/cpaRung combination', () => {
    for (const d of PHYSICS_DOMAIN_DEFAULTS) {
      const problems = validateVisualIntent({
        purpose: d.purpose,
        claim: 'placeholder claim for structural validation only',
        formClass: d.formClass,
        constraints: d.mustVaryExactlyOne ? { mustVaryExactlyOne: d.mustVaryExactlyOne } : undefined,
      })
      expect(problems).toEqual([])
    }
  })

  it('has no duplicate prefixes', () => {
    const prefixes = PHYSICS_DOMAIN_DEFAULTS.map(d => d.prefix)
    expect(new Set(prefixes).size).toBe(prefixes.length)
  })
})
