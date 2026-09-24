/**
 * Biology cell visual replacement (2026-09-24).
 *
 * The prior retirement campaign suppressed 18 bio.cell concepts from the
 * wrong 'bio.cell' -> food_chain domain default (retired.ts's own history:
 * a food chain card, ecosystem-level energy flow, served for subcellular
 * topics). This campaign replaces the suppression with a faithful,
 * concept-specific Tier 0 scene for each of the 18, built from one of four
 * small, reusable, parameter-driven generators — never 18 bespoke renderers,
 * and never a new generic 'bio.cell -> something' domain fallback (the exact
 * mistake this whole campaign exists to correct).
 *
 * These tests prove, for every one of the 18:
 *   - it is no longer in RETIRED_VISUAL_BINDINGS;
 *   - the real resolver serves the NEW scene (not food_chain, not nothing);
 *   - the served scene's actual payload never mentions "food chain" anywhere;
 *   - the underlying DOMAIN_VISUALS/CONCEPT_VISUALS food_chain row is
 *     UNTOUCHED (it is simply outranked by Tier 0, never deleted);
 * and, separately, that the four new builder functions produce the geometry
 * their own parameters describe (not just "something renders").
 */

import { describe, expect, it } from 'vitest'
import { RETIRED_VISUAL_BINDINGS, isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { resolveVisual, resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { lookupConceptVisualBinding } from '@/lib/teaching/visualRegistry'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { buildCellStructureScene } from '@/lib/teaching/sceneGenerators/cellStructure'
import { buildCellPathwayScene } from '@/lib/teaching/sceneGenerators/cellPathway'
import { buildCellHubScene } from '@/lib/teaching/sceneGenerators/cellHub'
import { buildCellComparisonScene } from '@/lib/teaching/sceneGenerators/cellComparison'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const ask = (conceptId: string, message = 'explain with diagram') =>
  resolveVisual({ message, lessonConceptId: conceptId, learnerRequest: 'diagram' })

/** Every text field the renderer would actually show, across every step. */
function allText(spec: SceneSpec): string[] {
  const out: string[] = [spec.title, spec.teachingGoal ?? '', spec.ariaLabel ?? '']
  for (const step of spec.steps) {
    out.push(step.narration ?? '')
    for (const obj of step.objects) out.push(obj.text ?? '')
  }
  return out
}

const THE_18 = [
  'bio.cell.cell-theory',
  'bio.cell.prokaryotic-cell',
  'bio.cell.eukaryotic-cell',
  'bio.cell.cell-membrane-transport',
  'bio.cell.nucleus-chromosomes',
  'bio.cell.mitochondria-energy',
  'bio.cell.chloroplast-structure',
  'bio.cell.endomembrane-system',
  'bio.cell.cytoskeleton',
  'bio.cell.cell-cycle',
  'bio.cell.cell-signalling',
  'bio.cell.apoptosis',
  'bio.cell.anaerobic-respiration-fermentation',
  'bio.cell.cancer-biology-hallmarks',
  'bio.cell.cell-adhesion-tissue-organization',
  'bio.cell.cell-junctions-extracellular-matrix',
  'bio.cell.cytoskeleton-motility',
  'bio.cell.membrane-transport-energetics',
] as const

describe('all 18 replaced concepts are no longer retired', () => {
  it('none of the 18 appears in RETIRED_VISUAL_BINDINGS any more', () => {
    for (const id of THE_18) {
      expect(Object.prototype.hasOwnProperty.call(RETIRED_VISUAL_BINDINGS, id), id).toBe(false)
      expect(isRetiredVisualBinding(id), id).toBe(false)
    }
  })
})

describe.each(THE_18)('%s', (conceptId) => {
  it('resolves through the resolver to its new Tier 0 scene, never food_chain', () => {
    const d = ask(conceptId)
    expect(d.graphical, conceptId).toBe(true)
    expect(d.provenance, conceptId).toBe(`generator:${conceptId}:concept-authored`)
    expect(d.payload?.renderer, conceptId).toBe('scene')
    expect(d.asset?.conceptId, conceptId).toBe(conceptId)
  })

  it('the served payload never mentions food chain', () => {
    const scene = buildCanonicalScene(null, conceptId)
    expect(scene, conceptId).toBeTruthy()
    const text = allText(scene!).join(' | ').toLowerCase()
    expect(text, conceptId).not.toContain('food chain')
    expect(text, conceptId).not.toContain('food-chain')
  })

  it('the scene is structurally real: at least two steps, every step narrated and non-empty', () => {
    const scene = buildCanonicalScene(null, conceptId)!
    expect(scene.steps.length, conceptId).toBeGreaterThanOrEqual(2)
    for (const step of scene.steps) {
      expect(step.objects.length, `${conceptId} step has no objects`).toBeGreaterThan(0)
      expect((step.narration ?? '').length, `${conceptId} step has no narration`).toBeGreaterThan(0)
    }
  })

  it('resolves the same way through the async authority', async () => {
    const d = await resolveVisualForTurn({
      message: 'explain with diagram', lessonConceptId: conceptId, learnerRequest: 'diagram',
    })
    expect(d.graphical, conceptId).toBe(true)
    expect(d.provenance, conceptId).toBe(`generator:${conceptId}:concept-authored`)
  })

  it('the underlying bio.cell -> food_chain domain row is untouched, merely outranked', () => {
    const binding = lookupConceptVisualBinding(conceptId)
    expect(binding?.tier, conceptId).toBe('domain')
    expect(binding?.scope, conceptId).toBe('bio.cell')
    expect(binding?.entry.primary, conceptId).toBe('food_chain')
  })
})

describe('the four new builders produce the geometry their own parameters describe', () => {
  it('buildCellStructureScene: one boundary step, then one step per part, each part revealed with its own label', () => {
    const scene = buildCellStructureScene({
      conceptId: 'test.structure',
      subject: 'Test Organelle',
      boundaryLabel: 'Outer wall',
      teachingGoal: 'test',
      parts: [
        { name: 'Part A', description: 'does A' },
        { name: 'Part B', description: 'does B' },
        { name: 'Part C', description: 'does C' },
      ],
    })
    expect(scene.steps).toHaveLength(4) // boundary + 3 parts
    expect(scene.steps[0].objects.some((o) => o.text === 'Outer wall')).toBe(true)
    expect(scene.steps[1].objects.some((o) => o.text === 'Part A')).toBe(true)
    expect(scene.steps[2].objects.some((o) => o.text === 'Part B')).toBe(true)
    expect(scene.steps[3].objects.some((o) => o.text === 'Part C')).toBe(true)
    // Every part is a distinct position, not stacked on the boundary or on each other.
    const positions = scene.steps.slice(1).map((s) => JSON.stringify(s.objects.find((o) => o.type === 'node')?.position))
    expect(new Set(positions).size).toBe(3)
  })

  it('buildCellPathwayScene (plain linear): stages appear in order, each arrow-connected to the previous', () => {
    const scene = buildCellPathwayScene({
      conceptId: 'test.pathway',
      title: 'Test Pathway',
      teachingGoal: 'test',
      stages: [
        { name: 'Stage 1', description: 'first' },
        { name: 'Stage 2', description: 'second' },
        { name: 'Stage 3', description: 'third' },
      ],
    })
    expect(scene.steps).toHaveLength(3)
    expect(scene.steps[0].objects.some((o) => o.text === 'Stage 1')).toBe(true)
    expect(scene.steps[1].objects.some((o) => o.text === 'Stage 2' && o.type === 'node')).toBe(true)
    expect(scene.steps[1].objects.some((o) => o.type === 'arrow')).toBe(true)
    expect(scene.steps[2].objects.some((o) => o.text === 'Stage 3' && o.type === 'node')).toBe(true)
    expect(scene.steps[2].objects.some((o) => o.type === 'arrow')).toBe(true)
  })

  it('buildCellPathwayScene (branchStart): two independent starting nodes both arrow into the first shared stage', () => {
    const scene = buildCellPathwayScene({
      conceptId: 'test.branch-start',
      title: 'Test Branch Start',
      teachingGoal: 'test',
      branchStart: [
        { name: 'Trigger A', description: 'a' },
        { name: 'Trigger B', description: 'b' },
      ],
      stages: [
        { name: 'Shared stage', description: 'shared' },
        { name: 'Outcome', description: 'outcome' },
      ],
    })
    const firstStep = scene.steps[0]
    expect(firstStep.objects.some((o) => o.text === 'Trigger A')).toBe(true)
    expect(firstStep.objects.some((o) => o.text === 'Trigger B')).toBe(true)
    const secondStep = scene.steps[1]
    expect(secondStep.objects.filter((o) => o.type === 'arrow')).toHaveLength(2)
    expect(secondStep.objects.some((o) => o.text === 'Shared stage')).toBe(true)
  })

  it('buildCellPathwayScene (branchEnd): the last shared stage arrows into two independent outcomes', () => {
    const scene = buildCellPathwayScene({
      conceptId: 'test.branch-end',
      title: 'Test Branch End',
      teachingGoal: 'test',
      stages: [{ name: 'Shared stage', description: 'shared' }],
      branchEnd: [
        { name: 'Outcome A', description: 'a' },
        { name: 'Outcome B', description: 'b' },
      ],
    })
    const lastStep = scene.steps[scene.steps.length - 1]
    expect(lastStep.objects.some((o) => o.text === 'Outcome A')).toBe(true)
    expect(lastStep.objects.some((o) => o.text === 'Outcome B')).toBe(true)
    expect(lastStep.objects.filter((o) => o.type === 'arrow')).toHaveLength(2)
  })

  it('buildCellPathwayScene (cyclic): a return path is drawn back to the first stage', () => {
    const scene = buildCellPathwayScene({
      conceptId: 'test.cyclic',
      title: 'Test Cycle',
      teachingGoal: 'test',
      cyclic: true,
      stages: [
        { name: 'Stage 1', description: 'first' },
        { name: 'Stage 2', description: 'second' },
      ],
    })
    const lastStep = scene.steps[scene.steps.length - 1]
    expect(lastStep.objects.some((o) => o.id === 'cycle-return')).toBe(true)
  })

  it('buildCellHubScene: the hub appears first, then one step per spoke, each at a distinct position around it', () => {
    const scene = buildCellHubScene({
      conceptId: 'test.hub',
      hubLabel: 'Hub',
      title: 'Test Hub',
      teachingGoal: 'test',
      spokes: [
        { name: 'Spoke 1', description: 'one' },
        { name: 'Spoke 2', description: 'two' },
        { name: 'Spoke 3', description: 'three' },
      ],
    })
    expect(scene.steps).toHaveLength(4) // hub + 3 spokes
    expect(scene.steps[0].objects.some((o) => o.text === 'Hub')).toBe(true)
    const spokePositions = scene.steps.slice(1).map((s) => JSON.stringify(s.objects.find((o) => o.type === 'node')?.position))
    expect(new Set(spokePositions).size).toBe(3)
  })

  it('buildCellComparisonScene: each group gets its own step, header, and every one of its items', () => {
    const scene = buildCellComparisonScene({
      conceptId: 'test.comparison',
      title: 'Test Comparison',
      teachingGoal: 'test',
      groups: [
        { label: 'Group A', description: 'a', items: ['Item A1', 'Item A2'] },
        { label: 'Group B', description: 'b', items: ['Item B1'] },
      ],
    })
    expect(scene.steps).toHaveLength(2)
    expect(scene.steps[0].objects.some((o) => o.text === 'Group A')).toBe(true)
    expect(scene.steps[0].objects.some((o) => o.text === 'Item A1')).toBe(true)
    expect(scene.steps[0].objects.some((o) => o.text === 'Item A2')).toBe(true)
    expect(scene.steps[1].objects.some((o) => o.text === 'Group B')).toBe(true)
    expect(scene.steps[1].objects.some((o) => o.text === 'Item B1')).toBe(true)
    // Groups sit at distinct x-positions, not stacked on top of each other.
    const groupX = scene.steps.map((s) => s.objects.find((o) => o.id?.startsWith('group-'))?.position?.[0])
    expect(new Set(groupX).size).toBe(2)
  })
})

describe('non-regression: everything this campaign must not touch', () => {
  it('RETIRED_VISUAL_BINDINGS now holds exactly the 25 non-biology-cell entries', () => {
    const remaining = Object.keys(RETIRED_VISUAL_BINDINGS)
    expect(remaining).toHaveLength(25)
    for (const id of THE_18) expect(remaining).not.toContain(id)
  })

  it('bio.cell.mitosis and bio.cell.meiosis are unaffected', () => {
    for (const id of ['bio.cell.mitosis', 'bio.cell.meiosis']) {
      expect(isRetiredVisualBinding(id), id).toBe(false)
      const d = ask(id)
      expect(d.graphical, id).toBe(true)
      expect(d.payload?.renderer, id).toBe('scene')
      expect(d.provenance, id).not.toContain('concept-authored')
    }
  })

  it('the bio.eco domain fallback is unaffected — still resolves to food_chain', () => {
    for (const id of ['bio.eco.population-ecology', 'bio.eco.community-ecology']) {
      const binding = lookupConceptVisualBinding(id)
      expect(binding?.tier, id).toBe('domain')
      expect(binding?.scope, id).toBe('bio.eco')
      expect(binding?.entry.primary, id).toBe('food_chain')
      const d = ask(id)
      expect(d.graphical, id).toBe(true)
      expect(d.provenance, id).toBe('registry:domain-default:bio.eco:food_chain')
    }
  })

  it('an unrelated non-biology retired concept is still fully retired', () => {
    expect(isRetiredVisualBinding('chem.bond.ionic-bonding')).toBe(true)
    expect(ask('chem.bond.ionic-bonding').graphical).toBe(false)
  })
})
