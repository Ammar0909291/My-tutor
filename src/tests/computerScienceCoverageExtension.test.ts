import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { CS_COVERAGE_EXTENSION_EXPLANATIONS, CS_COVERAGE_EXTENSION_PROBES } from '../lib/teaching/assets/csCoverageExtensionSeedAssets'

const IDS = [
  'cs.math.discrete-mathematics',
  'cs.math.proofs-and-induction',
  'cs.math.sets-relations-functions',
  'cs.math.combinatorics-counting',
  'cs.math.probability',
  'cs.math.statistics-for-computing',
] as const

const graph = JSON.parse(readFileSync('docs/computer-science/kg/graph.json', 'utf8'))
const byId = new Map<string, { id: string; requires: string[]; unlocks: string[] }>(
  graph.concepts.map((concept: { id: string; requires: string[]; unlocks: string[] }) => [concept.id, concept]),
)

describe('Computer Science KG mathematical foundations extension', () => {
  it('registers every new concept in the canonical KG with inverse prerequisite edges', () => {
    for (const id of IDS) {
      expect(byId.has(id), id).toBe(true)
      const concept = byId.get(id)!
      for (const prerequisite of concept.requires) {
        expect(byId.get(prerequisite)?.unlocks, `${prerequisite} must unlock ${id}`).toContain(id)
      }
      expect(existsSync(`educational-brain/concepts/computer_science/${id}.md`), id).toBe(true)
    }
  })

  it('ships two explanations and three gradeable probes for every new concept', () => {
    for (const id of IDS) {
      const explanations = CS_COVERAGE_EXTENSION_EXPLANATIONS.filter((item) => item.conceptId === id)
      expect(explanations, id).toHaveLength(2)
      expect(explanations.map((item) => item.familyKind).sort()).toEqual(['core_explanation', 'misconception_repair'])
      const probes = CS_COVERAGE_EXTENSION_PROBES.filter((item) => item.conceptId === id)
      expect(probes, id).toHaveLength(3)
      for (const probe of probes) {
        expect(probe.choices?.filter((choice) => choice.isCorrect), probe.stem).toHaveLength(1)
        expect(probe.choices?.length, probe.stem).toBeGreaterThanOrEqual(3)
      }
    }
  })

  it('makes statistics a prerequisite for introductory machine learning', () => {
    expect(byId.get('cs.ds.intro-machine-learning')?.requires).toContain('cs.math.statistics-for-computing')
  })
})
