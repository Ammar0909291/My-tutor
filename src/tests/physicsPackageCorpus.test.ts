/**
 * Physics package corpus gate — the Phase 3 migration invariant.
 *
 * Every physics Teaching Blueprint must compile to a valid DRAFT Educational
 * Package (all 5+ structural format variants), and every committed artifact
 * in brain/packages must load through the full runtime validation chain
 * (schema, conceptId, compiler allowlist, semver, DRAFT status, rule-layer
 * hash, whole-package hash) and assemble a non-trivial lesson context.
 *
 * This is the corpus-wide version of packageRuntime.test.ts's single-concept
 * proof: physics teaches from packages, blueprint markdown is authoring-only.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { compileBlueprintToPackage } from '@/lib/curriculum/blueprintFrontend'
import { loadEducationalPackage, clearPackageCache, buildLessonContextForConcept } from '@/lib/curriculum/packageRuntime'

const BLUEPRINT_DIR = path.join(process.cwd(), 'docs', 'curriculum', 'blueprints')
const PACKAGE_DIR = path.join(process.cwd(), 'brain', 'packages')

const physicsConceptIds = fs.readdirSync(BLUEPRINT_DIR)
  .filter((f) => f.startsWith('phys.') && f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''))
  .sort()

describe('physics blueprint corpus — every blueprint compiles', () => {
  it('has the full physics corpus on disk', () => {
    expect(physicsConceptIds.length).toBeGreaterThanOrEqual(217)
  })

  it('compiles every physics blueprint to a valid DRAFT package', () => {
    const failures: string[] = []
    for (const conceptId of physicsConceptIds) {
      const source = fs.readFileSync(path.join(BLUEPRINT_DIR, `${conceptId}.md`), 'utf-8')
      const r = compileBlueprintToPackage(`docs/curriculum/blueprints/${conceptId}.md`, source, conceptId)
      if (!r.ok || !r.educationalPackage) {
        failures.push(`${conceptId}: ${r.diagnostics.filter((d) => d.severity === 'E').map((d) => d.code).join(',')}`)
      }
    }
    expect(failures).toEqual([])
  })
})

describe('committed physics package artifacts — every artifact loads and teaches', () => {
  const artifactIds = fs.readdirSync(PACKAGE_DIR)
    .filter((f) => f.startsWith('phys.') && f.endsWith('.package.json'))
    .map((f) => f.replace(/\.package\.json$/, ''))
    .sort()

  it('every physics blueprint has a committed package artifact', () => {
    expect(artifactIds).toEqual(physicsConceptIds)
  })

  it('every artifact passes full runtime validation and assembles a lesson', () => {
    const failures: string[] = []
    for (const conceptId of artifactIds) {
      clearPackageCache()
      const r = loadEducationalPackage(conceptId)
      if (!r.ok) { failures.push(`${conceptId}: ${r.reason}`); continue }
      if (r.pkg.status !== 'DRAFT') { failures.push(`${conceptId}: unexpected status ${r.pkg.status}`); continue }
      const ctx = buildLessonContextForConcept(conceptId, { register: 'intermediate' })
      if (!ctx || ctx.block.length < 200) failures.push(`${conceptId}: lesson block missing/too thin`)
    }
    expect(failures).toEqual([])
  })

  it('every artifact carries the required QA baseline: misconceptions, teaching actions, mastery probes, and an explanation surface', () => {
    const failures: string[] = []
    for (const conceptId of artifactIds) {
      clearPackageCache()
      const r = loadEducationalPackage(conceptId)
      if (!r.ok) continue // covered above
      const kinds = new Set(r.pkg.assets.map((a) => a.kind))
      if (!kinds.has('misconception')) failures.push(`${conceptId}: no misconception assets`)
      if (!kinds.has('teaching_action_meta')) failures.push(`${conceptId}: no teaching_action_meta assets`)
      if (!kinds.has('mastery_probe')) failures.push(`${conceptId}: no mastery_probe assets`)
      if (!kinds.has('core_explanation') && !kinds.has('learning_objective')) {
        failures.push(`${conceptId}: neither core_explanation nor learning_objective`)
      }
      if (r.pkg.rulePack.rules.length === 0) failures.push(`${conceptId}: empty rule layer`)
    }
    expect(failures).toEqual([])
  })
})
