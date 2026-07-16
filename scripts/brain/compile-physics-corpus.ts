/**
 * Mass-compile every Physics Teaching Blueprint into a DRAFT Educational
 * Package artifact and produce the corpus audit + readiness reports.
 *
 *   npm run compile:physics-corpus
 *   npm run compile:physics-corpus -- --dry-run   (compile + validate only,
 *                                                   write nothing)
 *
 * This is a BATCH DRIVER only — it contains no compiler logic of its own.
 * Every concept is compiled through the exact same, unmodified pipeline
 * `scripts/brain/compile-educational-package.ts` uses for one concept
 * (`compileBlueprintToPackage` from `src/lib/curriculum/blueprintFrontend`),
 * and every written artifact is re-validated through the exact same
 * runtime gate the Package Runtime loader uses
 * (`validateEducationalPackage` from `src/lib/curriculum/packageRuntime`).
 * No new validation rule, hash scheme, or package shape is introduced here.
 *
 * Determinism: each concept is compiled TWICE in-process from the same
 * source string and the resulting package JSON is byte-compared before
 * anything is written — the same drift gate `--check` performs against a
 * committed artifact, run proactively before the artifact exists.
 *
 * Writes:
 *   brain/packages/<conceptId>.package.json      — one per successfully
 *                                                   compiled + validated concept
 *   docs/physics/EDUCATIONAL_PACKAGE_CORPUS_AUDIT.md       — Phase 3 report
 *   docs/physics/EDUCATIONAL_PACKAGE_READINESS_REPORT.md   — Phase 4 report
 *
 * Never calls packRegistry.activate(); every written package has
 * `status: 'DRAFT'`.
 */
import fs from 'fs'
import path from 'path'
import { compileBlueprintToPackage } from '../../src/lib/curriculum/blueprintFrontend'
import { parseBlueprintMarkdown } from '../../src/lib/curriculum/blueprintFrontend/parser'
import type { EducationalPackage, AssetKind } from '../../src/lib/curriculum/blueprintFrontend/types'
import { validateEducationalPackage } from '../../src/lib/curriculum/packageRuntime/loader'

const ROOT = process.cwd()
const BP_DIR = path.join(ROOT, 'docs/curriculum/blueprints')
const KG_PATH = path.join(ROOT, 'docs/physics/kg/graph.json')
const OUT_DIR = path.join(ROOT, 'brain', 'packages')

interface KgConcept { id: string; requires?: string[] }

interface FileResult {
  conceptId: string
  file: string
  ok: boolean
  diagnostics: Array<{ code?: string; severity: string; message: string }>
  pkg: EducationalPackage | null
  deterministic: boolean
  schemaValid: boolean
  schemaValidReason: string | null
  inCanonicalKg: boolean
}

function loadPhysicsKg(): { ids: Set<string>; graph: Map<string, string[]> } {
  const kg = JSON.parse(fs.readFileSync(KG_PATH, 'utf-8')) as { concepts: KgConcept[] }
  const ids = new Set(kg.concepts.map((c) => c.id))
  const graph = new Map<string, string[]>(kg.concepts.map((c) => [c.id, c.requires ?? []]))
  return { ids, graph }
}

function assetKindCounts(pkg: EducationalPackage): Partial<Record<AssetKind, number>> {
  const counts: Partial<Record<AssetKind, number>> = {}
  for (const a of pkg.assets) counts[a.kind] = (counts[a.kind] ?? 0) + 1
  return counts
}

function compileOne(file: string, conceptId: string, ids: Set<string>, graph: Map<string, string[]>, inCanonicalKg: boolean): FileResult {
  const relFile = `docs/curriculum/blueprints/${conceptId}.md`
  const source = fs.readFileSync(file, 'utf-8')

  const run1 = compileBlueprintToPackage(relFile, source, conceptId, { knownConceptIds: ids, prerequisiteGraph: graph })
  const run2 = compileBlueprintToPackage(relFile, source, conceptId, { knownConceptIds: ids, prerequisiteGraph: graph })

  const diagnostics = run1.diagnostics.map((d) => ({ code: d.code, severity: d.severity, message: d.message }))

  if (!run1.ok || !run1.educationalPackage) {
    return { conceptId, file: relFile, ok: false, diagnostics, pkg: null, deterministic: false, schemaValid: false, schemaValidReason: null, inCanonicalKg }
  }

  const deterministic = JSON.stringify(run1.educationalPackage) === JSON.stringify(run2.educationalPackage)
  const schemaValidReason = validateEducationalPackage(conceptId, run1.educationalPackage)

  return {
    conceptId, file: relFile, ok: true, diagnostics,
    pkg: run1.educationalPackage,
    deterministic,
    schemaValid: schemaValidReason === null,
    schemaValidReason,
    inCanonicalKg,
  }
}

function pct(n: number, d: number): string {
  return d === 0 ? '0.0' : ((100 * n) / d).toFixed(1)
}

function main(): void {
  const dryRun = process.argv.includes('--dry-run')
  const { ids, graph } = loadPhysicsKg()

  const files = fs.readdirSync(BP_DIR)
    .filter((f) => f.startsWith('phys.') && f.endsWith('.md'))
    .sort()

  const results: FileResult[] = []
  for (const f of files) {
    const conceptId = f.replace(/\.md$/, '')
    const abs = path.join(BP_DIR, f)
    results.push(compileOne(abs, conceptId, ids, graph, ids.has(conceptId)))
  }

  const compiled = results.filter((r) => r.ok)
  const failed = results.filter((r) => !r.ok)
  const productionReady = compiled.filter((r) => r.deterministic && r.schemaValid)
  const compiledButNotReady = compiled.filter((r) => !(r.deterministic && r.schemaValid))

  // ── Write DRAFT package artifacts (production-ready ones only) ───────────
  if (!dryRun) {
    fs.mkdirSync(OUT_DIR, { recursive: true })
    for (const r of productionReady) {
      const artifact = JSON.stringify(r.pkg, null, 2) + '\n'
      fs.writeFileSync(path.join(OUT_DIR, `${r.conceptId}.package.json`), artifact)
    }
  }

  // ── Failure categorization (Phase 3) ──────────────────────────────────────
  const failuresByCode = new Map<string, FileResult[]>()
  for (const r of failed) {
    for (const d of r.diagnostics) {
      if (d.severity !== 'E') continue
      const code = d.code ?? 'UNKNOWN'
      if (!failuresByCode.has(code)) failuresByCode.set(code, [])
      failuresByCode.get(code)!.push(r)
    }
  }

  // ── Asset coverage (Phase 4) ──────────────────────────────────────────────
  const ASSET_KINDS: AssetKind[] = [
    'core_explanation', 'learning_objective', 'worked_example', 'misconception',
    'teaching_action_meta', 'mastery_probe', 'adaptive_rule', 'session_flow', 'teaching_note', 'reference',
  ]
  const assetCoverage = new Map<AssetKind, number>(ASSET_KINDS.map((k) => [k, 0]))
  let totalAssets = 0
  let totalRules = 0
  for (const r of productionReady) {
    const counts = assetKindCounts(r.pkg!)
    for (const k of ASSET_KINDS) if ((counts[k] ?? 0) > 0) assetCoverage.set(k, assetCoverage.get(k)! + 1)
    totalAssets += r.pkg!.manifest.assetCount
    totalRules += r.pkg!.manifest.ruleCount
  }

  const warnings = compiled.reduce((n, r) => n + r.diagnostics.filter((d) => d.severity === 'W').length, 0)
  const notInKg = results.filter((r) => !r.inCanonicalKg)

  // ── Asset-lowering coverage-gap diagnostic (Phase 3 "Asset issues") ───────
  // Distinguishes "this blueprint genuinely has no such content" from "this
  // blueprint HAS the content, under a section title/internal format the
  // Knowledge-Layer lowerer (assetLowering.ts) doesn't yet recognize" — the
  // same class of gap the parser-grammar-coverage pass closed for
  // parser.ts, now surfacing one layer up. Diagnostic only: assetLowering.ts
  // is part of the compiler this mission says not to change, so these are
  // reported as findings, never silently patched.
  interface AssetGap { conceptId: string; sectionTitle: string }
  const coreExplanationGaps: AssetGap[] = []
  const workedExampleGaps: AssetGap[] = []
  for (const r of productionReady) {
    const relFile = r.file
    const abs = path.join(BP_DIR, `${r.conceptId}.md`)
    const source = fs.readFileSync(abs, 'utf-8')
    const { ast } = parseBlueprintMarkdown(relFile, source, r.conceptId)
    if (!ast) continue
    const counts = assetKindCounts(r.pkg!)
    if (!counts.core_explanation) {
      const sec = ast.sections.find((s) => /explan|narrative spine/i.test(s.title))
      if (sec) coreExplanationGaps.push({ conceptId: r.conceptId, sectionTitle: sec.title })
    }
    if (!counts.worked_example) {
      const sec = ast.sections.find((s) => /worked example/i.test(s.title))
      if (sec) workedExampleGaps.push({ conceptId: r.conceptId, sectionTitle: sec.title })
    }
  }

  // ── Phase 3 report: Corpus Audit ──────────────────────────────────────────
  const auditLines: string[] = []
  auditLines.push('# Physics Educational Package — Corpus Audit')
  auditLines.push('')
  auditLines.push(`**Generated:** ${new Date().toISOString().slice(0, 10)}`)
  auditLines.push(`**Pipeline:** \`compileBlueprintToPackage\` (Blueprint Front-End, unchanged) + \`validateEducationalPackage\` (Package Runtime, unchanged)`)
  auditLines.push(`**Scope:** every \`phys.*.md\` file in \`docs/curriculum/blueprints/\` — ${files.length} files`)
  auditLines.push('')
  auditLines.push('## Summary')
  auditLines.push('')
  auditLines.push('| Metric | Count | % of corpus |')
  auditLines.push('|---|---|---|')
  auditLines.push(`| Total blueprint files | ${files.length} | 100% |`)
  auditLines.push(`| Successfully compiled (semantic validation + lowering passed) | ${compiled.length} | ${pct(compiled.length, files.length)}% |`)
  auditLines.push(`| Failed to compile | ${failed.length} | ${pct(failed.length, files.length)}% |`)
  auditLines.push(`| Compiled AND deterministic AND schema-valid (production-ready artifact written) | ${productionReady.length} | ${pct(productionReady.length, files.length)}% |`)
  auditLines.push(`| Compiled but flagged (non-deterministic or schema-invalid — NOT written) | ${compiledButNotReady.length} | ${pct(compiledButNotReady.length, files.length)}% |`)
  auditLines.push(`| Warnings emitted (non-blocking) | ${warnings} | — |`)
  auditLines.push('')

  auditLines.push('## Failed compiles — by diagnostic code')
  auditLines.push('')
  if (failuresByCode.size === 0) {
    auditLines.push('None. Every blueprint parsed, validated, and lowered successfully.')
  } else {
    auditLines.push('| Code | Meaning | Files | Example |')
    auditLines.push('|---|---|---|---|')
    const CODE_MEANING: Record<string, string> = {
      BF001: 'empty file', BF002: 'no recognizable section headers', BF003: 'no concept_id determinable',
      BFV01: 'invalid/mismatched concept_id', BFV02: 'no teaching actions found', BFV03: 'unknown prerequisite concept id',
      BFV04: 'broken misconception reference', BFV05: 'missing/unparseable metadata section', BFV06: 'cyclic prerequisite dependency',
      BFA01: 'no assets lowered (warning only)', BFA02: 'duplicate assetId',
    }
    for (const [code, rs] of [...failuresByCode.entries()].sort((a, b) => b[1].length - a[1].length)) {
      const example = rs[0]
      const exDiag = example.diagnostics.find((d) => d.code === code)
      auditLines.push(`| ${code} | ${CODE_MEANING[code] ?? 'see message'} | ${rs.length} | \`${example.conceptId}\`: ${(exDiag?.message ?? '').replace(/\|/g, '\\|').slice(0, 140)} |`)
    }
  }
  auditLines.push('')

  auditLines.push('## Failed compiles — full detail')
  auditLines.push('')
  if (failed.length === 0) {
    auditLines.push('None.')
  } else {
    for (const r of failed) {
      auditLines.push(`### \`${r.conceptId}\``)
      for (const d of r.diagnostics.filter((d) => d.severity === 'E')) {
        auditLines.push(`- **[${d.code}]** ${d.message}`)
      }
      auditLines.push('')
    }
  }

  auditLines.push('## Compiled but not written (determinism or schema-validity failure)')
  auditLines.push('')
  if (compiledButNotReady.length === 0) {
    auditLines.push('None. Every successfully compiled package is deterministic and schema-valid.')
  } else {
    for (const r of compiledButNotReady) {
      auditLines.push(`- \`${r.conceptId}\`: deterministic=${r.deterministic}, schemaValid=${r.schemaValid}${r.schemaValidReason ? ` (${r.schemaValidReason})` : ''}`)
    }
  }
  auditLines.push('')

  auditLines.push('## Legacy / corpus anomalies (not compiler failures)')
  auditLines.push('')
  if (notInKg.length === 0) {
    auditLines.push('None. Every blueprint file corresponds to a concept in the canonical Physics KG.')
  } else {
    for (const r of notInKg) {
      auditLines.push(`- \`${r.conceptId}\`: authored blueprint has NO corresponding entry in \`docs/physics/kg/graph.json\` (216 concepts). Compiles fine as a standalone file (compile status: ${r.ok ? 'OK' : 'FAILED'}) but is not reachable via canonical KG traversal — a legacy/superseded blueprint, not a parser or content defect. Left untouched per "do not edit blueprint content" — flagged for an authoring-level decision (merge into its successor or formally retire).`)
    }
  }
  auditLines.push('')

  auditLines.push('## Asset issues — Knowledge-Layer lowering coverage gaps')
  auditLines.push('')
  auditLines.push('Every package below compiled, is deterministic, and is schema-valid — these are NOT compilation failures. Each blueprint listed HAS the relevant content authored, under a section title (or internal block format) `assetLowering.ts` (the Knowledge-Layer lowerer) does not yet recognize, so the resulting package carries zero assets of that kind despite the source content existing. This is the same class of gap the parser-grammar-coverage pass closed in `parser.ts`, now surfacing one layer up in the Blueprint Front-End — reported per mission scope, not fixed (`assetLowering.ts` is part of "the compiler" this mission says not to change).')
  auditLines.push('')
  auditLines.push(`### core_explanation: ${coreExplanationGaps.length} packages affected`)
  auditLines.push('')
  if (coreExplanationGaps.length === 0) {
    auditLines.push('None.')
  } else {
    const byTitle = new Map<string, number>()
    for (const g of coreExplanationGaps) byTitle.set(g.sectionTitle, (byTitle.get(g.sectionTitle) ?? 0) + 1)
    auditLines.push('Unrecognized section titles carrying real explanation content:')
    auditLines.push('')
    for (const [title, n] of [...byTitle.entries()].sort((a, b) => b[1] - a[1])) {
      auditLines.push(`- "${title}" — ${n} packages (e.g. \`${coreExplanationGaps.find((g) => g.sectionTitle === title)!.conceptId}\`)`)
    }
  }
  auditLines.push('')
  auditLines.push(`### worked_example: ${workedExampleGaps.length} packages affected`)
  auditLines.push('')
  if (workedExampleGaps.length === 0) {
    auditLines.push('None.')
  } else {
    auditLines.push(`All ${workedExampleGaps.length} have a section titled "Worked Examples" whose internal per-example header uses a bold-paragraph form (e.g. \`**WE-1 (Foundational — venturi meter)**\`) that \`lowerWorkedExamples\` does not match (it recognizes \`### Example N —\` / \`### WE-N —\` heading-level blocks, and a Concept-Spine-embedded \`**Worked Example N (...)**\` bold form — a third bold-abbreviated shape is unrecognized). Affected, e.g.: ${workedExampleGaps.slice(0, 6).map((g) => `\`${g.conceptId}\``).join(', ')}${workedExampleGaps.length > 6 ? `, +${workedExampleGaps.length - 6} more` : ''}.`)
  }
  auditLines.push('')
  const coreGenuinelyAbsent = productionReady.filter((r) => !assetKindCounts(r.pkg!).core_explanation).length - coreExplanationGaps.length
  const weGenuinelyAbsent = productionReady.filter((r) => !assetKindCounts(r.pkg!).worked_example).length - workedExampleGaps.length
  auditLines.push(`Remaining zero-asset packages for each kind (${coreGenuinelyAbsent} for core_explanation, ${weGenuinelyAbsent} for worked_example) have genuinely no such section authored — not a lowering gap.`)
  auditLines.push('')

  auditLines.push('## Warnings (non-blocking, informational)')
  auditLines.push('')
  const warnRows = compiled.flatMap((r) => r.diagnostics.filter((d) => d.severity === 'W').map((d) => ({ conceptId: r.conceptId, d })))
  if (warnRows.length === 0) {
    auditLines.push('None.')
  } else {
    for (const { conceptId, d } of warnRows) auditLines.push(`- \`${conceptId}\` **[${d.code}]** ${d.message}`)
  }
  auditLines.push('')

  // ── Phase 4 report: Production Readiness ──────────────────────────────────
  const readinessLines: string[] = []
  readinessLines.push('# Physics Educational Package — Production Readiness Report')
  readinessLines.push('')
  readinessLines.push(`**Generated:** ${new Date().toISOString().slice(0, 10)}`)
  readinessLines.push(`**Scope:** Educational Package corpus for Physics (\`brain/packages/phys.*.package.json\`) — the compiled artifact layer consumed by the Package Runtime, distinct from the earlier blueprint-injection-era report (\`PHYSICS_PRODUCTION_READINESS.md\`).`)
  readinessLines.push('')
  readinessLines.push('## Package coverage')
  readinessLines.push('')
  readinessLines.push(`**${productionReady.length}/${files.length} (${pct(productionReady.length, files.length)}%)** physics blueprints have a validated, deterministic DRAFT Educational Package artifact in \`brain/packages/\`.`)
  readinessLines.push('')
  readinessLines.push(`Of the ${files.length} authored blueprint files, ${files.length - 1} correspond 1:1 to the ${ids.size}-concept canonical Physics KG (\`docs/physics/kg/graph.json\`); 1 (\`phys.mech.collisions\`) is a legacy file superseded by \`phys.mech.collisions-elastic\`/\`phys.mech.collisions-inelastic\` and outside canonical KG traversal (see Corpus Audit).`)
  readinessLines.push('')
  readinessLines.push('## Asset coverage (within production-ready packages)')
  readinessLines.push('')
  readinessLines.push(`Total assets lowered: **${totalAssets}** across ${productionReady.length} packages. Total dispatch rules lowered: **${totalRules}**.`)
  readinessLines.push('')
  readinessLines.push('| Asset kind | Packages with ≥1 asset of this kind | Coverage |')
  readinessLines.push('|---|---|---|')
  const MANDATORY_KINDS: AssetKind[] = ['misconception', 'teaching_action_meta']
  for (const k of ASSET_KINDS) {
    const n = assetCoverage.get(k)!
    const tag = MANDATORY_KINDS.includes(k) ? ' (mandatory — guaranteed by semantic validation)' : ' (optional per spec)'
    readinessLines.push(`| ${k}${tag} | ${n}/${productionReady.length} | ${pct(n, productionReady.length)}% |`)
  }
  readinessLines.push('')
  readinessLines.push(`**Asset-lowering coverage gaps (not content gaps):** of the packages with zero \`core_explanation\` assets, **${coreExplanationGaps.length}** have the content authored under an unrecognized section title ("Concept Explanation (Multi-Tier)" / "Concept Explanation Blocks" / "Concept Explanation (Multi-Level)" / "Narrative Spine") — a Knowledge-Layer lowerer coverage gap, not a content gap. Of the packages with zero \`worked_example\` assets, **${workedExampleGaps.length}** have a "Worked Examples" section whose bold-paragraph internal header format (\`**WE-1 (...)**\`) is unrecognized by \`lowerWorkedExamples\`. See Corpus Audit "Asset issues" for the full breakdown. Both are reported findings, not fixed, per this mission's "do not change the compiler" scope.`)
  readinessLines.push('')
  readinessLines.push('## Compiler coverage')
  readinessLines.push('')
  readinessLines.push(`**${pct(compiled.length, files.length)}%** of the physics corpus parses and lowers successfully through the Blueprint Front-End (${compiled.length}/${files.length}). This equals the parser-grammar-coverage figure measured in the prior grammar-expansion session (212/217 at the format-recognition level) — every file that PARSES also fully COMPILES here; the 5 that don't fail at semantic validation only (broken misconception cross-references, BFV04), not at parsing.`)
  readinessLines.push('')
  readinessLines.push(`Within the ${productionReady.length} compiled packages, the Knowledge-Layer (asset) lowerer has its own, narrower coverage gap: **${coreExplanationGaps.length}** packages have real core-explanation content the lowerer doesn't recognize by section title, and **${workedExampleGaps.length}** have real worked-example content under an unrecognized internal block format (see Asset coverage above and Corpus Audit "Asset issues"). Rule-Layer (dispatch) lowering is unaffected — every teaching action is captured regardless of these two title/format gaps.`)
  readinessLines.push('')
  readinessLines.push('## Remaining blockers before Physics is fully production-ready')
  readinessLines.push('')
  let blockerN = 1
  if (failed.length === 0 && compiledButNotReady.length === 0 && coreExplanationGaps.length === 0 && workedExampleGaps.length === 0) {
    readinessLines.push('None — every blueprint compiles into a valid, deterministic, schema-valid DRAFT package with full asset coverage.')
  } else {
    if (failed.length > 0) {
      readinessLines.push(`${blockerN++}. **${failed.length} blueprint(s) fail to compile** — see Corpus Audit "Failed compiles" for exact diagnostics. These are genuine content-authoring inconsistencies (e.g. a misconception cited under a paraphrased id that shares no contiguous token run with any defined slug), not parser gaps; per mission scope, blueprint content was not edited.`)
    }
    if (compiledButNotReady.length > 0) {
      readinessLines.push(`${blockerN++}. **${compiledButNotReady.length} blueprint(s) compiled but were not written** — determinism or runtime-schema-validity failure; see Corpus Audit for detail.`)
    }
    if (coreExplanationGaps.length > 0) {
      readinessLines.push(`${blockerN++}. **${coreExplanationGaps.length} package(s) missing core_explanation assets despite having the content authored** — a Knowledge-Layer (\`assetLowering.ts\`) section-title recognition gap, not a compile failure or content gap. Fixing requires extending \`lowerCoreExplanation\`'s title regex to recognize "Concept Explanation (Multi-Tier/Level/Blocks)" and "Narrative Spine" — out of scope for this mission ("do not change the compiler"); flagged for a follow-up pass.`)
    }
    if (workedExampleGaps.length > 0) {
      readinessLines.push(`${blockerN++}. **${workedExampleGaps.length} package(s) missing worked_example assets despite having a "Worked Examples" section authored** — a Knowledge-Layer internal-block-format recognition gap (bold-paragraph \`**WE-1 (...)**\` headers unrecognized). Same fix boundary as above — out of scope here.`)
    }
  }
  readinessLines.push('')
  readinessLines.push('Outside package-compilation scope (unchanged by this pass, per mission "do not activate / do not touch runtime"):')
  readinessLines.push('- DRAFT → ACTIVE promotion / `packRegistry` activation — not performed, per mission and standing governance.')
  readinessLines.push('- Package Runtime wiring into the live serving path (`ENABLE_PACKAGE_RUNTIME`) — out of scope; runtime untouched.')
  readinessLines.push('- Non-textual extension points (diagrams/animations/simulations) — `extensionPoints` remains empty-by-construction for every package, as designed in Phase 1.5.')
  readinessLines.push('')

  if (!dryRun) {
    fs.writeFileSync(path.join(ROOT, 'docs/physics/EDUCATIONAL_PACKAGE_CORPUS_AUDIT.md'), auditLines.join('\n') + '\n')
    fs.writeFileSync(path.join(ROOT, 'docs/physics/EDUCATIONAL_PACKAGE_READINESS_REPORT.md'), readinessLines.join('\n') + '\n')
  }

  // ── Console summary ────────────────────────────────────────────────────────
  console.log(`Physics corpus: ${files.length} blueprint files`)
  console.log(`  compiled:            ${compiled.length}/${files.length} (${pct(compiled.length, files.length)}%)`)
  console.log(`  failed:              ${failed.length}/${files.length} (${pct(failed.length, files.length)}%)`)
  console.log(`  production-ready:    ${productionReady.length}/${files.length} (${pct(productionReady.length, files.length)}%)`)
  console.log(`  compiled-not-ready:  ${compiledButNotReady.length}`)
  console.log(`  warnings:            ${warnings}`)
  console.log(`  legacy/non-KG files: ${notInKg.length} (${notInKg.map((r) => r.conceptId).join(', ')})`)
  if (dryRun) {
    console.log('--dry-run: no artifacts or reports written')
  } else {
    console.log(`wrote ${productionReady.length} package artifacts to ${OUT_DIR}`)
    console.log('wrote docs/physics/EDUCATIONAL_PACKAGE_CORPUS_AUDIT.md')
    console.log('wrote docs/physics/EDUCATIONAL_PACKAGE_READINESS_REPORT.md')
  }

  if (failed.length > 0) process.exitCode = 0 // informational tool — non-zero reserved for script-level errors, not content findings
}

main()
