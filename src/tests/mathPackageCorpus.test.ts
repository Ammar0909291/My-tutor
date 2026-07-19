/**
 * Mathematics package corpus gate — the same invariant physicsPackageCorpus
 * test.ts enforces for physics, applied to the mathematics blueprint corpus
 * (Mathematics production-readiness sprint, feature parity with physics).
 *
 * One documented, permanent exception: math.func.function-concept cites
 * prerequisite `math.alg.variable`, which does not exist in the canonical
 * mathematics KG (docs/mathematics/kg/graph.json) — a Curriculum Production
 * Pipeline content gap, not a compiler defect. It is therefore the one
 * blueprint in the corpus with no committed package artifact; this is
 * tracked here explicitly rather than silently excluded.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { compileBlueprintToPackage } from '@/lib/curriculum/blueprintFrontend'
import { loadEducationalPackage, clearPackageCache, buildLessonContextForConcept } from '@/lib/curriculum/packageRuntime'

const BLUEPRINT_DIR = path.join(process.cwd(), 'docs', 'curriculum', 'blueprints')
const PACKAGE_DIR = path.join(process.cwd(), 'brain', 'packages')

/** Known, permanent content gaps — not a compiler/parser problem. Each entry
 *  must cite the reason; growing this set silently is not allowed (every
 *  addition needs a code-review-visible justification, same as this one). */
const KNOWN_CONTENT_GAPS: Record<string, string> = {
  'math.func.function-concept': 'cites prerequisite math.alg.variable, which does not exist in the canonical mathematics KG',
}

const mathConceptIds = fs.readdirSync(BLUEPRINT_DIR)
  .filter((f) => f.startsWith('math.') && f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''))
  .sort()

const compilableConceptIds = mathConceptIds.filter((id) => !(id in KNOWN_CONTENT_GAPS))

describe('mathematics blueprint corpus — every blueprint compiles (except documented content gaps)', () => {
  it('has the full mathematics blueprint corpus on disk', () => {
    expect(mathConceptIds.length).toBeGreaterThanOrEqual(301)
  })

  it('compiles every non-gapped mathematics blueprint to a valid DRAFT package', () => {
    const failures: string[] = []
    for (const conceptId of compilableConceptIds) {
      const source = fs.readFileSync(path.join(BLUEPRINT_DIR, `${conceptId}.md`), 'utf-8')
      const r = compileBlueprintToPackage(`docs/curriculum/blueprints/${conceptId}.md`, source, conceptId)
      if (!r.ok || !r.educationalPackage) {
        failures.push(`${conceptId}: ${r.diagnostics.filter((d) => d.severity === 'E').map((d) => d.code).join(',')}`)
      }
    }
    expect(failures).toEqual([])
  })

  it('every documented content gap genuinely still fails to compile (catches a stale exception list)', () => {
    for (const conceptId of Object.keys(KNOWN_CONTENT_GAPS)) {
      const source = fs.readFileSync(path.join(BLUEPRINT_DIR, `${conceptId}.md`), 'utf-8')
      const kg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'docs/mathematics/kg/graph.json'), 'utf-8')) as { concepts: Array<{ id: string }> }
      const r = compileBlueprintToPackage(
        `docs/curriculum/blueprints/${conceptId}.md`, source, conceptId,
        { knownConceptIds: new Set(kg.concepts.map((c) => c.id)) },
      )
      expect(r.ok).toBe(false) // if this starts passing, promote it out of KNOWN_CONTENT_GAPS
    }
  })
})

describe('committed mathematics package artifacts — every artifact loads and teaches', () => {
  const artifactIds = fs.readdirSync(PACKAGE_DIR)
    .filter((f) => f.startsWith('math.') && f.endsWith('.package.json'))
    .map((f) => f.replace(/\.package\.json$/, ''))
    .sort()

  it('every compilable mathematics blueprint has a committed package artifact', () => {
    expect(artifactIds).toEqual(compilableConceptIds)
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

  it('every artifact\'s concept id resolves in the canonical mathematics KG', () => {
    const kg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'docs/mathematics/kg/graph.json'), 'utf-8')) as { concepts: Array<{ id: string }> }
    const kgIds = new Set(kg.concepts.map((c) => c.id))
    const orphans = artifactIds.filter((id) => !kgIds.has(id))
    expect(orphans).toEqual([])
  })
})
