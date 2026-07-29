/**
 * F.32 — Visual Asset Audit.
 *
 * Reviews every educational visual in the registry with:
 *  - concept coverage (which concepts does this visual serve?)
 *  - educational value assessment
 *  - misconception risk assessment
 *  - suitable lessons classification
 *  - KEEP/IMPROVE/HIDE classification
 *
 * Pure module: no DB, no I/O. Uses the existing visualCoverageValidator's
 * parsed registry data as input.
 */

import type { ParsedRegistry, ParsedConceptEntry } from './visualCoverageValidator'

export type AuditClassification = 'KEEP' | 'IMPROVE' | 'HIDE'

export interface VisualAssetAuditEntry {
  visualType: string
  classification: AuditClassification
  conceptsCovered: string[]
  educationalValue: 'HIGH' | 'MEDIUM' | 'LOW'
  misconceptionRisk: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH'
  suitableLessons: string[]
  notes: string
}

const HIGH_VALUE_SCENE_GENERATORS = new Set([
  'projectile', 'collision', 'pendulum', 'circular', 'vector',
  'electron_shells', 'molecule', 'lattice', 'ray_optics',
  'electric_circuit', 'kinematics_graphs', 'calculus_graph',
  'punnett_square', 'dna_structure', 'cell_division',
  'coordinate_geometry_line', 'triangle', 'statistics_bar_chart',
  'ecological_pyramid', 'logic_gate', 'er_diagram',
  'periodic_trends', 'torque_diagram', 'gravitation_orbit',
  'heights_and_distances',
])

const MISCONCEPTION_RISK_VISUALS: Record<string, { risk: 'HIGH' | 'MEDIUM'; reason: string }> = {
  three_atomic_structure: {
    risk: 'MEDIUM',
    reason: 'Bohr-model representation can mislead about orbital shapes when teaching quantum mechanics',
  },
  three_electron_shells: {
    risk: 'MEDIUM',
    reason: 'Fixed-orbit shell diagram contradicts probability cloud model for advanced chemistry',
  },
  food_chain: {
    risk: 'LOW' as any,
    reason: 'Generic food chain used for genetics/cell biology concepts where it does not apply',
  },
}

/**
 * Classify a single visual type based on its usage across the registry.
 */
function classifyVisualAsset(
  visualType: string,
  entries: ParsedConceptEntry[],
): VisualAssetAuditEntry {
  const conceptsCovered = entries.map((e) => e.key)
  const hasSceneGenerator = entries.some((e) => e.sceneGenerator != null)
  const sceneGenerators = entries
    .filter((e) => e.sceneGenerator)
    .map((e) => e.sceneGenerator!)
  const hasHighValueGenerator = sceneGenerators.some((sg) => HIGH_VALUE_SCENE_GENERATORS.has(sg))

  // Educational value assessment
  let educationalValue: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM'
  if (hasHighValueGenerator || conceptsCovered.length >= 5) {
    educationalValue = 'HIGH'
  } else if (conceptsCovered.length <= 1 && !hasSceneGenerator) {
    educationalValue = 'LOW'
  }

  // Misconception risk
  const riskInfo = MISCONCEPTION_RISK_VISUALS[visualType]
  const misconceptionRisk = riskInfo?.risk ?? 'NONE'

  // Suitable lessons — extract domain info from concept IDs
  const domains = new Set(conceptsCovered.map((c) => {
    const parts = c.split('.')
    return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : parts[0]
  }))
  const suitableLessons = Array.from(domains)

  // Classification
  let classification: AuditClassification = 'KEEP'
  let notes = ''

  if (misconceptionRisk === 'HIGH') {
    classification = 'HIDE'
    notes = `HIGH misconception risk: ${riskInfo?.reason}`
  } else if (educationalValue === 'LOW' && conceptsCovered.length === 0) {
    classification = 'HIDE'
    notes = 'No concepts served — unreachable visual'
  } else if (misconceptionRisk === 'MEDIUM') {
    classification = 'IMPROVE'
    notes = `MEDIUM misconception risk — add disclaimers: ${riskInfo?.reason}`
  } else if (educationalValue === 'LOW') {
    classification = 'IMPROVE'
    notes = 'Low educational value — serves very few concepts with no parametric generator'
  } else {
    notes = `Serves ${conceptsCovered.length} concept(s)${hasSceneGenerator ? ' with parametric scene generation' : ''}`
  }

  return {
    visualType,
    classification,
    conceptsCovered,
    educationalValue,
    misconceptionRisk,
    suitableLessons,
    notes,
  }
}

/**
 * Run the full visual asset audit across all visual types in the registry.
 */
export function auditVisualAssets(parsed: ParsedRegistry): {
  entries: VisualAssetAuditEntry[]
  summary: {
    total: number
    kept: number
    improved: number
    hidden: number
  }
} {
  // Group concept entries by their primary visual type
  const byVisualType = new Map<string, ParsedConceptEntry[]>()
  for (const entry of parsed.conceptEntries) {
    const list = byVisualType.get(entry.primary) ?? []
    list.push(entry)
    byVisualType.set(entry.primary, list)
  }

  // Also include visual types that appear in `all` arrays but not as primary
  for (const entry of parsed.conceptEntries) {
    for (const vt of entry.all) {
      if (!byVisualType.has(vt)) {
        byVisualType.set(vt, [])
      }
    }
  }

  const entries = Array.from(byVisualType.entries())
    .map(([vt, concepts]) => classifyVisualAsset(vt, concepts))
    .sort((a, b) => {
      const order: Record<AuditClassification, number> = { HIDE: 0, IMPROVE: 1, KEEP: 2 }
      return order[a.classification] - order[b.classification]
    })

  return {
    entries,
    summary: {
      total: entries.length,
      kept: entries.filter((e) => e.classification === 'KEEP').length,
      improved: entries.filter((e) => e.classification === 'IMPROVE').length,
      hidden: entries.filter((e) => e.classification === 'HIDE').length,
    },
  }
}
