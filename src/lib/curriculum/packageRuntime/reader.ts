/**
 * Package Runtime — Phase 2: Package Reader.
 *
 * Read-only, pure views over a validated Educational Package. No I/O, no
 * database access, no mutation — every function filters the in-memory
 * asset list by kind or reads the concept envelope. This is the ONLY
 * sanctioned way downstream code accesses package content (nothing should
 * poke pkg.assets directly), so future storage changes stay behind one seam.
 */
import type { AssetNode, EducationalPackage } from './types'

function byKind(pkg: EducationalPackage, kind: AssetNode['kind']): AssetNode[] {
  return pkg.assets.filter((a) => a.kind === kind)
}

export function getCoreExplanation(pkg: EducationalPackage): AssetNode | null {
  return byKind(pkg, 'core_explanation')[0] ?? null
}

export function getWorkedExamples(pkg: EducationalPackage): AssetNode[] {
  return byKind(pkg, 'worked_example')
}

export function getMisconceptions(pkg: EducationalPackage): AssetNode[] {
  return byKind(pkg, 'misconception')
}

export function getMisconception(pkg: EducationalPackage, mcId: string): AssetNode | null {
  return byKind(pkg, 'misconception').find((m) => m.localKey === mcId) ?? null
}

export function getTeachingNotes(pkg: EducationalPackage): AssetNode[] {
  return byKind(pkg, 'teaching_note')
}

export function getTeachingActions(pkg: EducationalPackage): AssetNode[] {
  return byKind(pkg, 'teaching_action_meta')
}

export function getLearningObjectives(pkg: EducationalPackage): AssetNode[] {
  return byKind(pkg, 'learning_objective')
}

export function getMasteryProbes(pkg: EducationalPackage): AssetNode[] {
  return byKind(pkg, 'mastery_probe')
}

export function getAdaptiveRules(pkg: EducationalPackage): AssetNode[] {
  return byKind(pkg, 'adaptive_rule')
}

export function getSessionFlow(pkg: EducationalPackage): AssetNode | null {
  return byKind(pkg, 'session_flow')[0] ?? null
}

export function getReferences(pkg: EducationalPackage): AssetNode[] {
  return byKind(pkg, 'reference')
}

export function getPrerequisites(pkg: EducationalPackage): string[] {
  return [...pkg.concept.prerequisites]
}

export function getConceptMetadata(pkg: EducationalPackage): EducationalPackage['concept'] {
  return { ...pkg.concept, prerequisites: [...pkg.concept.prerequisites] }
}
