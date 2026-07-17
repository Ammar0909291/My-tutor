/**
 * Visualization Registry Coverage Validator — CLI entry point.
 *
 * Developer/CI tooling only. Reads (never writes) visualRegistry.ts's
 * source text and every subject's Knowledge Graph JSON, classifies every
 * concept, and reports coverage — the same audit performed by hand for
 * the P0 (Displacement → Force Diagram) and P2 (phys.mech domain-default
 * elimination) fixes, now automatic and repeatable as the KG grows.
 *
 * Does not import or execute any part of the live Teaching/Visualization
 * pipeline (route.ts, visualRegistry.ts's lookup functions, the Renderer,
 * or any Educational Package code) — it only reads static files. Running
 * it can never affect runtime behavior.
 *
 * Usage:
 *   npx tsx scripts/validate-visualization-coverage.ts
 *   npx tsx scripts/validate-visualization-coverage.ts --subject=physics
 *   npx tsx scripts/validate-visualization-coverage.ts --json
 *
 * Exit codes: 0 = PASS or PASS_WITH_WARNINGS, 1 = FAIL
 *   FAIL only on: Incorrect Mapping > 0, Broken References > 0, Duplicates > 0
 *   WARN (does not fail) on: Expected Null, Intentional Fallback, Orphan Entries
 */

import fs from 'fs'
import path from 'path'
import {
  parseVisualRegistrySource, auditVisualizationCoverage, CATEGORY_LABEL,
  type CoverageCategory,
} from '../src/lib/teaching/visualCoverageValidator'
import { VISUAL_META } from '../src/lib/school/visuals/visualTypes'

const REGISTRY_PATH = path.join(process.cwd(), 'src/lib/teaching/visualRegistry.ts')
const SCENE_ROUTER_PATH = path.join(process.cwd(), 'src/lib/teaching/sceneGenerators/sceneRouter.ts')

const KG_PATHS: Record<string, string> = {
  physics: 'docs/physics/kg/graph.json',
  mathematics: 'docs/mathematics/kg/graph.json',
  chemistry: 'docs/chemistry/kg/graph.json',
  biology: 'docs/biology/kg/graph.json',
  computer_science: 'docs/computer-science/kg/graph.json',
  english: 'docs/english/kg/graph.json',
}

function loadValidVisualTypes(): Set<string> {
  return new Set(Object.keys(VISUAL_META))
}

/** SceneGeneratorKind is a TypeScript `type` union (no runtime value to
 * import), so this reads it from source text the same way the registry
 * itself is parsed — consistent with the "read source text, touch nothing"
 * design of this whole tool. */
function loadValidSceneGenerators(): Set<string> {
  const source = fs.readFileSync(SCENE_ROUTER_PATH, 'utf8')
  const match = source.match(/^export type SceneGeneratorKind =\s*(.+)$/m)
  if (!match) throw new Error('Could not find SceneGeneratorKind in sceneRouter.ts — parser is out of sync with the source format')
  return new Set(Array.from(match[1].matchAll(/'([a-z0-9_]+)'/g)).map((m) => m[1]))
}

function loadKgConcepts(subjectFilter?: string): Array<{ id: string; name: string; subject: string }> {
  const entries = subjectFilter
    ? [[subjectFilter, KG_PATHS[subjectFilter]] as const]
    : Object.entries(KG_PATHS)

  const all: Array<{ id: string; name: string; subject: string }> = []
  for (const [subject, relPath] of entries) {
    if (!relPath) throw new Error(`Unknown subject: ${subject}`)
    const fullPath = path.join(process.cwd(), relPath)
    if (!fs.existsSync(fullPath)) continue
    const kg = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    for (const c of kg.concepts ?? []) {
      all.push({ id: c.id, name: c.name ?? c.id, subject })
    }
  }
  return all
}

function main() {
  const args = process.argv.slice(2)
  const subjectArg = args.find((a) => a.startsWith('--subject='))?.split('=')[1]
  const jsonOutput = args.includes('--json')

  const source = fs.readFileSync(REGISTRY_PATH, 'utf8')
  const parsed = parseVisualRegistrySource(source)
  const validVisualTypes = loadValidVisualTypes()
  const validSceneGenerators = loadValidSceneGenerators()
  const kgConcepts = loadKgConcepts(subjectArg)
  // Orphan detection (Category E) must always check against every subject's
  // KG, even when --subject narrows which concepts get classified — a
  // chemistry registry entry isn't "orphaned" just because this run only
  // classified physics concepts.
  const allKnownConceptIds = new Set(
    (subjectArg ? loadKgConcepts() : kgConcepts).map((c) => c.id),
  )

  const report = auditVisualizationCoverage(kgConcepts, parsed, validVisualTypes, validSceneGenerators, allKnownConceptIds)

  if (jsonOutput) {
    console.log(JSON.stringify(report, null, 2))
    process.exit(report.passes ? 0 : 1)
  }

  const line = '─'.repeat(64)
  console.log(line)
  console.log('VISUALIZATION REGISTRY COVERAGE VALIDATOR')
  console.log(line)
  console.log(`Knowledge Graph Concepts: ${report.totalConcepts}`)
  console.log('')
  console.log(`Exact:          ${report.counts.A_EXACT}`)
  console.log(`Fallback:       ${report.counts.B_FALLBACK}`)
  console.log(`Expected Null:  ${report.counts.C_NULL}`)
  console.log(`Incorrect:      ${report.counts.D_INCORRECT}`)
  console.log(`Orphan Keys:    ${report.orphans.length}`)
  console.log(`Broken Refs:    ${report.brokenReferences.length}`)
  console.log(`Duplicates:     ${report.duplicates.length}`)
  console.log(line)

  if (report.counts.D_INCORRECT > 0) {
    console.log('\n🔴 INCORRECT MAPPINGS (fails CI):')
    for (const c of report.classifications) {
      if (c.category === 'D_INCORRECT') console.log(`  ${c.conceptId} — ${c.reason}`)
    }
  }

  if (report.brokenReferences.length > 0) {
    console.log('\n🔴 BROKEN REFERENCES (fails CI):')
    for (const b of report.brokenReferences) {
      console.log(`  ${b.key} (line ${b.line}): ${b.field} → '${b.value}' does not exist`)
    }
  }

  if (report.duplicates.length > 0) {
    console.log('\n🟠 DUPLICATE MAPPINGS (fails CI):')
    for (const d of report.duplicates) {
      console.log(`  ${d.key} — defined at lines ${d.lines.join(', ')} (only the last one is actually used)`)
    }
  }

  if (report.orphans.length > 0) {
    console.log('\n🟠 ORPHAN REGISTRY ENTRIES (warning only):')
    for (const o of report.orphans) {
      console.log(`  ${o.key} (line ${o.line}) — no matching concept in any Knowledge Graph`)
    }
  }

  console.log('\n' + line)
  console.log(`STATUS: ${report.passes ? 'PASS' : 'FAIL'}`)
  console.log(line)

  if (!subjectArg && !jsonOutput) {
    console.log('\nPer-category counts by subject:')
    const bySubject = new Map<string, Record<CoverageCategory, number>>()
    for (let i = 0; i < kgConcepts.length; i++) {
      const subj = kgConcepts[i].subject
      const cls = report.classifications[i]
      const counts = bySubject.get(subj) ?? { A_EXACT: 0, B_FALLBACK: 0, C_NULL: 0, D_INCORRECT: 0 }
      counts[cls.category]++
      bySubject.set(subj, counts)
    }
    for (const [subj, counts] of bySubject.entries()) {
      console.log(`  ${subj.padEnd(18)} exact=${counts.A_EXACT} fallback=${counts.B_FALLBACK} null=${counts.C_NULL} incorrect=${counts.D_INCORRECT}`)
    }
  }

  console.log(`\nLegend: ${Object.entries(CATEGORY_LABEL).map(([k, v]) => v).join('  ')}`)

  process.exit(report.passes ? 0 : 1)
}

main()
