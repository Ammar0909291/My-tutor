/**
 * generate-system-state.ts
 *
 * Discovers all docs/{subject}/kg/graph.json files, validates each graph,
 * checks adapter + routing wiring in knowledgeGraph.ts, and writes
 * system_state.json to the project root.
 *
 * Usage:  npx tsx scripts/generate-system-state.ts
 * Output: system_state.json  (GENERATED — do not edit manually)
 *
 * This file is the ONLY authoritative source of system state.
 * Re-run whenever a subject is added or changed.
 */

import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const KG_SRC = path.join(ROOT, 'src/lib/curriculum/knowledgeGraph.ts')
const OUT    = path.join(ROOT, 'system_state.json')

const REQUIRED_FIELDS = [
  'id', 'name', 'requires', 'unlocks', 'cross_links',
  'difficulty', 'bloom', 'mastery_threshold', 'estimated_hours', 'description',
]
const VALID_DIFFICULTY = new Set(['foundational','developing','proficient','advanced','expert','research'])
const VALID_BLOOM      = new Set(['remember','understand','apply','analyze','evaluate','create'])

// ── Types ─────────────────────────────────────────────────────────────────────

interface RawConcept {
  id: string
  requires:   string[]
  unlocks:    string[]
  cross_links: string[]
  difficulty:  string
  bloom:       string
  [key: string]: unknown
}

interface CheckResults {
  no_duplicates:   boolean
  no_broken_edges: boolean
  schema_valid:    boolean
  enums_valid:     boolean
  no_cycles:       boolean
  full_reachability: boolean
}

interface ValidationResult {
  status:          'PASS' | 'PASS_WITH_WARNINGS' | 'FAIL'
  checks:          CheckResults
  reachable_count: number
  total_count:     number
  root_nodes:      string[]
  errors:          string[]
  warnings:        string[]
  info:            string[]
}

interface SubjectState {
  subject:           string
  graph_path:        string
  concept_count:     number
  validator_status:  'PASS' | 'PASS_WITH_WARNINGS' | 'FAIL'
  validator_checks:  CheckResults
  reachability:      string
  root_nodes:        string[]
  adapter_wired:     boolean
  routing_registered: boolean
  id_prefix:         string | null
  errors:            string[]
  warnings:          string[]
  info:              string[]
}

// ── Validator ─────────────────────────────────────────────────────────────────

function validate(concepts: RawConcept[]): ValidationResult {
  const errors:   string[] = []
  const warnings: string[] = []
  const info:     string[] = []
  const ids = new Set(concepts.map(c => c.id))

  // 1. Duplicate IDs
  const seen  = new Set<string>()
  const dupes: string[] = []
  for (const c of concepts) {
    if (seen.has(c.id)) dupes.push(c.id)
    seen.add(c.id)
  }
  const no_duplicates = dupes.length === 0
  if (dupes.length) errors.push(`Duplicate IDs: ${dupes.join(', ')}`)

  // 2. Broken requires/unlocks = FAIL; cross_links = INFO (cross-graph by design)
  let brokenCount = 0
  let crossLinkCount = 0
  for (const c of concepts) {
    for (const ref of [...c.requires, ...c.unlocks]) {
      if (!ids.has(ref)) {
        brokenCount++
        errors.push(`broken ref: ${c.id} → ${ref}`)
      }
    }
    for (const ref of c.cross_links ?? []) {
      if (!ids.has(ref)) crossLinkCount++
    }
  }
  if (crossLinkCount > 0) info.push(`${crossLinkCount} external cross-subject link(s) in cross_links (by design)`)
  const no_broken_edges = brokenCount === 0

  // 3. Schema — all 10 required fields must be present on every concept
  const schemaBad = concepts.filter(c =>
    REQUIRED_FIELDS.some(f => c[f] === undefined || c[f] === null)
  )
  const schema_valid = schemaBad.length === 0
  if (schemaBad.length) errors.push(`Schema: ${schemaBad.length} concepts missing required fields`)

  // 4. Enum validity
  const badDiff  = concepts.filter(c => !VALID_DIFFICULTY.has(c.difficulty))
  const badBloom = concepts.filter(c => !VALID_BLOOM.has(c.bloom))
  const enums_valid = badDiff.length === 0 && badBloom.length === 0
  if (badDiff.length)  errors.push(`Invalid difficulty on ${badDiff.length} concepts`)
  if (badBloom.length) errors.push(`Invalid bloom on ${badBloom.length} concepts`)

  // 5. Cycle detection — DFS white/gray/black on requires edges
  const WHITE = 0, GRAY = 1, BLACK = 2
  const color   = new Map<string, number>()
  const nodeMap = new Map(concepts.map(c => [c.id, c]))
  let hasCycle  = false

  function dfs(id: string) {
    color.set(id, GRAY)
    for (const dep of (nodeMap.get(id)?.requires ?? [])) {
      const c = color.get(dep) ?? WHITE
      if (c === WHITE) dfs(dep)
      else if (c === GRAY) hasCycle = true
    }
    color.set(id, BLACK)
  }
  for (const c of concepts) {
    if ((color.get(c.id) ?? WHITE) === WHITE) dfs(c.id)
  }
  const no_cycles = !hasCycle
  if (hasCycle) errors.push('Cycle detected in requires DAG')

  // 6. Reachability — BFS forward from roots via requires edges (inverted)
  const roots = concepts.filter(c => c.requires.length === 0)
  const forward = new Map<string, string[]>()
  for (const c of concepts) {
    for (const dep of c.requires) {
      if (!forward.has(dep)) forward.set(dep, [])
      forward.get(dep)!.push(c.id)
    }
  }
  const reachable = new Set<string>(roots.map(r => r.id))
  const queue = roots.map(r => r.id)
  while (queue.length) {
    const id = queue.shift()!
    for (const next of (forward.get(id) ?? [])) {
      if (!reachable.has(next)) { reachable.add(next); queue.push(next) }
    }
  }
  const full_reachability = reachable.size === concepts.length
  if (!full_reachability)
    errors.push(`Reachability: ${reachable.size}/${concepts.length} (${concepts.length - reachable.size} unreachable)`)

  const checks: CheckResults = {
    no_duplicates,
    no_broken_edges,
    schema_valid,
    enums_valid,
    no_cycles,
    full_reachability,
  }

  const failed = Object.values(checks).some(v => !v)
  const status: ValidationResult['status'] = failed ? 'FAIL' : warnings.length > 0 ? 'PASS_WITH_WARNINGS' : 'PASS'

  return {
    status,
    checks,
    reachable_count: reachable.size,
    total_count:     concepts.length,
    root_nodes:      roots.map(r => r.id),
    errors,
    warnings,
    info,
  }
}

// ── Registry parser ───────────────────────────────────────────────────────────
// Reads knowledgeGraph.ts as text and extracts the two registry objects.
// Does NOT import the module (avoids fs side-effects at module load time).

function parseRegistry(): { adapters: Set<string>; prefixes: Map<string, string> } {
  const src = fs.readFileSync(KG_SRC, 'utf-8')

  // Extract SUBJECT_ADAPTERS block
  const adapters = new Set<string>()
  const adapterBlock = src.match(/const SUBJECT_ADAPTERS[^=]*=\s*\{([^}]+)\}/)
  if (adapterBlock) {
    for (const m of adapterBlock[1].matchAll(/(\w+)\s*:\s*createSubjectAdapter/g)) {
      adapters.add(m[1])
    }
  }

  // Extract ID_PREFIX_TO_SUBJECT block
  const prefixes = new Map<string, string>()
  const prefixBlock = src.match(/const ID_PREFIX_TO_SUBJECT[^=]*=\s*\{([^}]+)\}/)
  if (prefixBlock) {
    for (const m of prefixBlock[1].matchAll(/'?(\w+)'?\s*:\s*'(\w+)'/g)) {
      prefixes.set(m[1], m[2])
    }
  }

  return { adapters, prefixes }
}

// ── Discovery ─────────────────────────────────────────────────────────────────

function discoverGraphs(): Array<{ dir: string; file: string }> {
  const docsDir = path.join(ROOT, 'docs')
  return fs.readdirSync(docsDir)
    .map(dir => ({ dir, file: path.join(docsDir, dir, 'kg', 'graph.json') }))
    .filter(({ file }) => fs.existsSync(file))
}

// ── Main ──────────────────────────────────────────────────────────────────────

const graphs  = discoverGraphs()
const { adapters, prefixes } = parseRegistry()

const subjects: SubjectState[] = graphs.map(({ dir, file }) => {
  const raw: { concepts: RawConcept[] } = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const concepts = raw.concepts
  const result   = validate(concepts)

  // Normalise: "computer-science" → "computer_science"
  const subjectKey = dir.replace(/-/g, '_')
  const prefix     = [...prefixes.entries()].find(([, v]) => v === subjectKey)?.[0] ?? null

  return {
    subject:            subjectKey,
    graph_path:         `docs/${dir}/kg/graph.json`,
    concept_count:      concepts.length,
    validator_status:   result.status,
    validator_checks:   result.checks,
    reachability:       `${result.reachable_count}/${result.total_count}`,
    root_nodes:         result.root_nodes,
    adapter_wired:      adapters.has(subjectKey),
    routing_registered: prefix !== null,
    id_prefix:          prefix,
    errors:             result.errors,
    warnings:           result.warnings.slice(0, 10),
    info:               result.info,
  }
})

const implemented = subjects.filter(
  s => s.validator_status !== 'FAIL' && s.adapter_wired && s.routing_registered
)
const failing    = subjects.filter(s => s.validator_status === 'FAIL')
const not_wired  = subjects.filter(s => !s.adapter_wired || !s.routing_registered)

const systemState = {
  generated_at:  new Date().toISOString(),
  generated_by:  'scripts/generate-system-state.ts',
  _note:         'DO NOT EDIT — re-run script to refresh',
  summary: {
    total_subjects:     subjects.length,
    implemented_count:  implemented.length,
    failing_count:      failing.length,
    not_wired_count:    not_wired.length,
    implemented:        implemented.map(s => s.subject),
    failing:            failing.map(s => s.subject),
    not_wired:          not_wired.map(s => s.subject),
  },
  subjects,
}

fs.writeFileSync(OUT, JSON.stringify(systemState, null, 2) + '\n')

// ── Console output ─────────────────────────────────────────────────────────────

console.log(`\nSYSTEM STATE — ${subjects.length} subjects discovered`)
console.log('─'.repeat(70))
for (const s of subjects) {
  const icon   = s.validator_status === 'FAIL' ? '✗' : s.validator_status === 'PASS_WITH_WARNINGS' ? '⚠' : '✓'
  const wire   = s.adapter_wired && s.routing_registered ? 'wired' : 'NOT WIRED'
  const prefix = s.id_prefix ? `prefix:${s.id_prefix}` : 'no prefix'
  console.log(
    `  ${icon} ${s.subject.padEnd(20)} ${String(s.concept_count).padStart(4)} concepts` +
    `  [${wire}]  [${prefix}]  ${s.validator_status}`
  )
  for (const e of s.errors)   console.log(`      ✗ ${e}`)
}
console.log('─'.repeat(70))
console.log(`  IMPLEMENTED: ${implemented.map(s => s.subject).join(', ') || 'none'}`)
if (failing.length)   console.log(`  FAILING:     ${failing.map(s => s.subject).join(', ')}`)
if (not_wired.length) console.log(`  NOT WIRED:   ${not_wired.map(s => s.subject).join(', ')}`)
console.log(`\nWritten: system_state.json\n`)
