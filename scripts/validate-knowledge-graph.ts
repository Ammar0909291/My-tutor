/**
 * Knowledge Graph Structural Validator
 *
 * Reusable pre-production check for any subject KG stored as the canonical
 * JSON format used by docs/mathematics/kg/graph.json.
 *
 * Checks:
 *   1. Duplicate concept IDs
 *   2. Broken edge references (requires / unlocks / cross_links)
 *   3. Disconnected nodes (no edges of any kind)
 *   4. Cycle detection on the requires DAG (DFS white/gray/black)
 *   5. Full reachability from every declared root node
 *   6. Required-field completeness (configurable)
 *   7. Teaching-engine compatibility fields
 *   8. Difficulty / Bloom value validity
 *   9. Numeric range sanity (mastery_threshold, estimated_hours)
 *
 * Usage:
 *   npx tsx scripts/validate-knowledge-graph.ts [path/to/graph.json]
 *   (defaults to docs/mathematics/kg/graph.json)
 *
 * Exit codes: 0 = all checks pass, 1 = one or more checks failed/warned
 */

import fs from 'fs'
import path from 'path'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Concept {
  id: string
  name?: string
  domain?: string
  requires?: string[]
  unlocks?: string[]
  cross_links?: string[]
  related?: string[]
  children?: string[]
  parent?: string | null
  difficulty?: string
  bloom?: string
  mastery_threshold?: number
  estimated_hours?: number
  description?: string
  references?: string | string[]
  concept_type?: string
  [key: string]: unknown
}

interface Graph {
  name?: string
  version?: string
  concepts: Concept[]
}

interface CheckResult {
  name: string
  status: 'PASS' | 'WARN' | 'FAIL'
  details: string[]
  count: number     // number of issues found (0 = clean)
}

// ── Config ────────────────────────────────────────────────────────────────────

const REQUIRED_FIELDS: (keyof Concept)[] = [
  'id', 'name', 'domain', 'difficulty', 'bloom',
  'mastery_threshold', 'estimated_hours', 'description',
]

// Fields required for the Teaching Engine (src/lib/teaching-engine/index.ts)
// concept_type drives decideActionType(); its absence degrades to INTERACTIVE_QUESTIONING
const TEACHING_ENGINE_FIELDS: (keyof Concept)[] = [
  'requires', 'unlocks', 'difficulty', 'bloom', 'estimated_hours', 'concept_type',
]

const VALID_DIFFICULTIES = new Set([
  'foundational', 'developing', 'proficient', 'advanced', 'expert', 'research',
])

// Kept for reference — expert/research added to educationTypes.ts Difficulty in Step B
const LEGACY_DIFFICULTIES = new Set(['foundational', 'developing', 'proficient', 'advanced'])

const VALID_BLOOMS = new Set([
  'remember', 'understand', 'apply', 'analyze', 'evaluate', 'create',
])

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadGraph(filePath: string): Graph {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Graph
}

function makeResult(name: string): CheckResult {
  return { name, status: 'PASS', details: [], count: 0 }
}

function fail(r: CheckResult, msg: string, severity: 'WARN' | 'FAIL' = 'FAIL') {
  r.count++
  r.details.push(msg)
  if (severity === 'FAIL' || r.status !== 'FAIL') r.status = severity
}

// ── Check 1: Duplicate IDs ────────────────────────────────────────────────────

function checkDuplicateIds(concepts: Concept[]): CheckResult {
  const r = makeResult('Duplicate concept IDs')
  const seen = new Map<string, number>()
  for (const c of concepts) {
    seen.set(c.id, (seen.get(c.id) ?? 0) + 1)
  }
  for (const [id, count] of seen) {
    if (count > 1) fail(r, `"${id}" appears ${count} times`)
  }
  return r
}

// ── Check 2: Broken edge references ──────────────────────────────────────────

// Known aspirational targets (future graph extensions — not bugs)
const ASPIRATIONAL_PREFIXES = ['math.phys.', 'math.cs.', 'math.eng.']
function isAspirational(id: string): boolean {
  return ASPIRATIONAL_PREFIXES.some(p => id.startsWith(p))
}

function checkBrokenRefs(concepts: Concept[]): CheckResult {
  const r = makeResult('Broken edge references')
  const idSet = new Set(concepts.map(c => c.id))
  const fields: Array<keyof Concept> = ['requires', 'unlocks', 'cross_links']

  for (const c of concepts) {
    for (const field of fields) {
      const targets = (c[field] as string[] | undefined) ?? []
      for (const t of targets) {
        if (!idSet.has(t)) {
          const severity = isAspirational(t) ? 'WARN' : 'FAIL'
          fail(r, `[${field}] ${c.id} → "${t}" (not found)`, severity)
        }
      }
    }
  }
  return r
}

// ── Check 3: Disconnected nodes ───────────────────────────────────────────────

function checkDisconnected(concepts: Concept[]): CheckResult {
  const r = makeResult('Disconnected nodes (no edges of any kind)')
  const idSet = new Set(concepts.map(c => c.id))
  const connected = new Set<string>()

  for (const c of concepts) {
    const allEdges = [
      ...(c.requires   ?? []),
      ...(c.unlocks    ?? []),
      ...(c.cross_links?? []),
      ...(c.related    ?? []),
      ...(c.children   ?? []),
    ].filter(e => idSet.has(e))

    if (allEdges.length > 0 || c.parent) {
      connected.add(c.id)
      allEdges.forEach(e => connected.add(e))
    }
  }

  for (const c of concepts) {
    if (!connected.has(c.id)) {
      fail(r, `"${c.id}" has no connections`, 'WARN')
    }
  }
  return r
}

// ── Check 4: Cycle detection (DFS on requires) ────────────────────────────────

function checkCycles(concepts: Concept[]): CheckResult {
  const r = makeResult('Cycle detection (requires DAG)')
  const idSet = new Set(concepts.map(c => c.id))

  // adjacency: concept → its requires[] (concepts it depends on)
  const adj = new Map<string, string[]>()
  for (const c of concepts) {
    adj.set(c.id, (c.requires ?? []).filter(x => idSet.has(x)))
  }

  const WHITE = 0, GRAY = 1, BLACK = 2
  const color = new Map<string, number>()
  for (const id of idSet) color.set(id, WHITE)

  const path: string[] = []
  const cycles: string[][] = []

  function dfs(node: string) {
    color.set(node, GRAY)
    path.push(node)
    for (const nb of (adj.get(node) ?? [])) {
      if (color.get(nb) === GRAY) {
        const idx = path.indexOf(nb)
        cycles.push([...path.slice(idx), nb])
      } else if (color.get(nb) === WHITE) {
        dfs(nb)
      }
    }
    path.pop()
    color.set(node, BLACK)
  }

  for (const id of idSet) {
    if (color.get(id) === WHITE) dfs(id)
  }

  if (cycles.length > 0) {
    for (const cycle of cycles.slice(0, 10)) {
      fail(r, `CYCLE: ${cycle.join(' → ')}`)
    }
    if (cycles.length > 10) fail(r, `... and ${cycles.length - 10} more cycles`)
  }
  return r
}

// ── Check 5: Reachability from roots ─────────────────────────────────────────

function checkReachability(concepts: Concept[]): CheckResult {
  const r = makeResult('Reachability from root nodes')
  const idSet = new Set(concepts.map(c => c.id))

  const roots = concepts.filter(c => !(c.requires?.length))
  if (roots.length === 0) {
    fail(r, 'No root nodes found (every concept has at least one prerequisite — likely a cycle or missing entry point)')
    return r
  }

  // Build reverse adjacency (prereq → concepts that require it)
  const revAdj = new Map<string, string[]>()
  for (const id of idSet) revAdj.set(id, [])
  for (const c of concepts) {
    for (const req of (c.requires ?? [])) {
      if (idSet.has(req)) revAdj.get(req)!.push(c.id)
    }
  }

  const visited = new Set<string>()
  const queue: string[] = roots.map(c => c.id)
  for (const id of queue) visited.add(id)

  while (queue.length > 0) {
    const node = queue.shift()!
    for (const nb of (revAdj.get(node) ?? [])) {
      if (!visited.has(nb)) {
        visited.add(nb)
        queue.push(nb)
      }
    }
  }

  const unreachable = concepts.filter(c => !visited.has(c.id))
  if (unreachable.length > 0) {
    for (const c of unreachable.slice(0, 10)) {
      fail(r, `"${c.id}" unreachable from any root — requires=[${(c.requires??[]).join(', ')}]`, 'WARN')
    }
    if (unreachable.length > 10) fail(r, `... and ${unreachable.length - 10} more unreachable nodes`, 'WARN')
  }

  const rootList = roots.map(c => c.id).join(', ')
  r.details.unshift(`Root nodes (${roots.length}): ${rootList}`)
  r.details.unshift(`Reachable: ${visited.size} / ${concepts.length}`)
  return r
}

// ── Check 6: Required field completeness ─────────────────────────────────────

function checkRequiredFields(concepts: Concept[]): CheckResult {
  const r = makeResult('Required field completeness')
  const missingByField = new Map<string, number>()

  for (const c of concepts) {
    for (const field of REQUIRED_FIELDS) {
      const v = c[field]
      if (v === null || v === undefined || v === '') {
        missingByField.set(field, (missingByField.get(field) ?? 0) + 1)
      }
    }
  }

  for (const [field, count] of missingByField) {
    if (field === 'domain') {
      // domain absent but derivable from ID prefix (prefix.subdomain.slug ≥ 3 segments)
      const derivable = concepts.filter(c => !c.domain && c.id.split('.').length >= 3).length
      const severity = derivable === count ? 'WARN' : 'FAIL'
      const note = derivable === count
        ? `— derivable from ID prefix by adapter (src/lib/curriculum/mathKgAdapter.ts)`
        : ''
      fail(r, `"domain" absent on ${count} concept(s) ${note}`.trim(), severity)
    } else {
      fail(r, `"${field}" missing or empty on ${count} concept(s)`)
    }
  }
  return r
}

// ── Check 7: Teaching Engine compatibility ────────────────────────────────────

function checkTeachingEngineFields(concepts: Concept[]): CheckResult {
  const r = makeResult('Teaching Engine field compatibility')

  const missing: Partial<Record<string, number>> = {}
  for (const field of TEACHING_ENGINE_FIELDS) {
    missing[field as string] = 0
  }

  for (const c of concepts) {
    for (const field of TEACHING_ENGINE_FIELDS) {
      const v = c[field]
      if (v === null || v === undefined) {
        missing[field as string] = (missing[field as string] ?? 0) + 1
      }
    }
  }

  for (const [field, count] of Object.entries(missing)) {
    if (count && count > 0) {
      const severity = field === 'concept_type' ? 'WARN' : 'FAIL'
      const note = field === 'concept_type'
        ? '— inferred from bloom by adapter (mathKgAdapter.ts inferConceptType); advisory only'
        : '— teaching engine degraded'
      fail(r, `"${field}" absent on ${count}/${concepts.length} concepts ${note}`, severity)
    }
  }

  // Check concept_type values if present
  const VALID_CT = new Set(['conceptual', 'application', 'problem_solving', 'visual'])
  const invalidCT = concepts.filter(c => c.concept_type && !VALID_CT.has(c.concept_type as string))
  if (invalidCT.length > 0) {
    fail(r, `Invalid concept_type values: ${[...new Set(invalidCT.map(c => c.concept_type))].join(', ')}`)
  }
  return r
}

// ── Check 8: Difficulty and Bloom validity ────────────────────────────────────

function checkEnumValues(concepts: Concept[]): CheckResult {
  const r = makeResult('Difficulty / Bloom enum validity')

  const badDiff    = concepts.filter(c => c.difficulty && !VALID_DIFFICULTIES.has(c.difficulty))
  const legacyOnly = concepts.filter(c => c.difficulty && !LEGACY_DIFFICULTIES.has(c.difficulty) && VALID_DIFFICULTIES.has(c.difficulty))
  const badBloom   = concepts.filter(c => c.bloom && !VALID_BLOOMS.has(c.bloom))

  if (badDiff.length > 0) {
    fail(r, `Unknown difficulty values: ${[...new Set(badDiff.map(c => c.difficulty))].join(', ')} (${badDiff.length} concepts)`)
  }
  if (legacyOnly.length > 0) {
    // expert/research added to educationTypes.ts Difficulty in Step B — no longer a compat issue
    r.details.push(`ℹ  ${legacyOnly.length} concepts use expert/research difficulty (now in Difficulty union — Step B)`)
  }
  if (badBloom.length > 0) {
    fail(r, `Unknown bloom values: ${[...new Set(badBloom.map(c => c.bloom))].join(', ')} (${badBloom.length} concepts)`)
  }
  return r
}

// ── Check 9: Numeric range sanity ─────────────────────────────────────────────

function checkNumericRanges(concepts: Concept[]): CheckResult {
  const r = makeResult('Numeric field range sanity')

  const badMastery = concepts.filter(c => {
    const v = c.mastery_threshold
    return v !== undefined && v !== null && (v <= 0 || v > 1)
  })
  const badHours = concepts.filter(c => {
    const v = c.estimated_hours
    return v !== undefined && v !== null && v <= 0
  })

  if (badMastery.length > 0) {
    fail(r, `mastery_threshold out of range (0,1]: ${badMastery.length} concepts. First: ${badMastery[0].id} = ${badMastery[0].mastery_threshold}`)
  }
  if (badHours.length > 0) {
    fail(r, `estimated_hours ≤ 0: ${badHours.length} concepts. First: ${badHours[0].id} = ${badHours[0].estimated_hours}`)
  }
  return r
}

// ── Main ──────────────────────────────────────────────────────────────────────

const filePath = process.argv[2] ?? 'docs/mathematics/kg/graph.json'
const absPath  = path.resolve(filePath)

console.log(`\nKNOWLEDGE GRAPH VALIDATOR`)
console.log(`File: ${absPath}`)
console.log(`${'─'.repeat(60)}`)

let graph: Graph
try {
  graph = loadGraph(absPath)
} catch (e: any) {
  console.error(`FATAL: Cannot load graph: ${e.message}`)
  process.exit(1)
}

const concepts = graph.concepts ?? []
console.log(`Graph: ${graph.name ?? '(unnamed)'} v${graph.version ?? '?'}`)
console.log(`Concepts: ${concepts.length}\n`)

const checks: CheckResult[] = [
  checkDuplicateIds(concepts),
  checkBrokenRefs(concepts),
  checkDisconnected(concepts),
  checkCycles(concepts),
  checkReachability(concepts),
  checkRequiredFields(concepts),
  checkTeachingEngineFields(concepts),
  checkEnumValues(concepts),
  checkNumericRanges(concepts),
]

let anyFail = false
let anyWarn = false

for (const c of checks) {
  const icon = c.status === 'PASS' ? '✓' : c.status === 'WARN' ? '⚠' : '✗'
  console.log(`${icon} [${c.status}] ${c.name}`)
  for (const d of c.details) {
    console.log(`       ${d}`)
  }
  if (c.status === 'FAIL') anyFail = true
  if (c.status === 'WARN') anyWarn = true
}

console.log(`\n${'─'.repeat(60)}`)
const overall = anyFail ? 'FAIL' : anyWarn ? 'PASS (with warnings)' : 'PASS'
console.log(`Overall: ${overall}`)
console.log(`${'─'.repeat(60)}\n`)

process.exit(anyFail ? 1 : 0)
