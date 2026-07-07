/**
 * GAP-P03 smoke test — Advanced Statistical Mechanics (7 new phys.stat concepts)
 * Run: npx tsx scripts/test-physics-stat-advanced-smoke.ts
 */
import fs from 'fs'
import path from 'path'
import { z } from 'zod'

const ROOT = process.cwd()

interface RawConcept {
  id: string; name: string; description: string; difficulty: string
  bloom: string; requires: string[]; unlocks: string[]
  estimated_hours: number; [key: string]: unknown
}

const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/physics/kg/graph.json'), 'utf-8'))
const concepts: RawConcept[] = raw.concepts

function inferDomain(id: string): string {
  const p = id.split('.'); return p.length >= 3 ? `${p[0]}.${p[1]}` : p[0]
}
function inferConceptType(bloom: string) {
  if (bloom === 'remember' || bloom === 'understand') return 'conceptual' as const
  if (bloom === 'apply') return 'application' as const
  return 'problem_solving' as const
}
function getConceptNode(id: string) {
  const c = concepts.find(x => x.id === id)
  if (!c) return undefined
  return {
    id: c.id, domain: inferDomain(c.id),
    prerequisites: c.requires, unlocks: c.unlocks,
    difficulty: c.difficulty, concept_type: inferConceptType(c.bloom),
    estimated_hours: c.estimated_hours, bloom: c.bloom, name: c.name,
  }
}

const TrackZ = z.enum(['T0','T1','T2','T3','T4'])
const DiffZ  = z.enum(['foundational','developing','proficient','advanced','expert','research'])
const CTZ    = z.enum(['conceptual','application','problem_solving','visual'])

const Schema = z.object({
  student: z.object({
    level: TrackZ,
    current_concepts_mastered: z.array(z.string()),
    weak_concepts: z.array(z.string()),
    misconceptions: z.array(z.string()),
    retention_score: z.number().min(0).max(100),
    learning_speed: z.enum(['slow','normal','fast']),
    fatigue_level: z.enum(['low','medium','high']),
  }),
  concept: z.object({
    id: z.string().min(1), domain: z.string().min(1),
    prerequisites: z.array(z.string()), unlocks: z.array(z.string()),
    difficulty: z.union([DiffZ, TrackZ]),
    concept_type: CTZ,
    estimated_hours: z.number().positive().optional(),
    bloom: z.string().optional(), name: z.string().optional(),
  }),
  history: z.object({
    recently_attempted: z.array(z.string()),
    success_rate: z.number().min(0).max(100),
    time_on_task: z.number().min(0),
    error_patterns: z.array(z.string()),
  }),
})

const STUDENT = {
  level: 'T4' as const,
  current_concepts_mastered: [
    'phys.stat.partition-function',
    'phys.stat.free-energy',
    'phys.qm.pauli-exclusion',
  ],
  weak_concepts: [],
  misconceptions: [],
  retention_score: 85,
  learning_speed: 'normal' as const,
  fatigue_level: 'low' as const,
}
const HISTORY = { recently_attempted: [], success_rate: 79, time_on_task: 840, error_patterns: [] }

interface ExpectedShape {
  id: string
  expectedPrereqs: string[]
  expectedUnlocks: string[]
  expectedDifficulty: string
  expectedBloom: string
}

const EXPECTED: ExpectedShape[] = [
  {
    id: 'phys.stat.grand-canonical-ensemble',
    expectedPrereqs: ['phys.stat.partition-function'],
    expectedUnlocks: ['phys.stat.chemical-potential'],
    expectedDifficulty: 'expert', expectedBloom: 'apply',
  },
  {
    id: 'phys.stat.chemical-potential',
    expectedPrereqs: ['phys.stat.grand-canonical-ensemble'],
    expectedUnlocks: [],
    expectedDifficulty: 'expert', expectedBloom: 'analyze',
  },
  {
    id: 'phys.stat.fluctuations-correlations',
    expectedPrereqs: ['phys.stat.partition-function'],
    expectedUnlocks: ['phys.stat.ising-model'],
    expectedDifficulty: 'expert', expectedBloom: 'analyze',
  },
  {
    id: 'phys.stat.phase-transitions',
    expectedPrereqs: ['phys.stat.free-energy'],
    expectedUnlocks: ['phys.stat.ising-model'],
    expectedDifficulty: 'expert', expectedBloom: 'analyze',
  },
  {
    id: 'phys.stat.ising-model',
    expectedPrereqs: ['phys.stat.phase-transitions', 'phys.stat.fluctuations-correlations'],
    expectedUnlocks: ['phys.stat.phase-transitions-critical-phenomena', 'phys.stat.monte-carlo-basics'],
    expectedDifficulty: 'expert', expectedBloom: 'analyze',
  },
  {
    id: 'phys.stat.phase-transitions-critical-phenomena',
    expectedPrereqs: ['phys.stat.ising-model'],
    expectedUnlocks: [],
    expectedDifficulty: 'expert', expectedBloom: 'evaluate',
  },
  {
    id: 'phys.stat.monte-carlo-basics',
    expectedPrereqs: ['phys.stat.ising-model'],
    expectedUnlocks: [],
    expectedDifficulty: 'expert', expectedBloom: 'apply',
  },
]

console.log('\n══════════════════════════════════════════════════════════════════════')
console.log('GAP-P03 — ADVANCED STATISTICAL MECHANICS SMOKE TEST (7 concepts)')
console.log('══════════════════════════════════════════════════════════════════════\n')

let allPass = true

for (const exp of EXPECTED) {
  const cn = getConceptNode(exp.id)
  if (!cn) {
    console.log(`  ✗ ${exp.id}: NOT FOUND IN GRAPH`)
    allPass = false
    continue
  }

  const schemaResult = Schema.safeParse({ student: STUDENT, concept: cn, history: HISTORY })
  if (!schemaResult.success) {
    console.log(`  ✗ ${exp.id}: ZOD FAIL — ${JSON.stringify(schemaResult.error.flatten())}`)
    allPass = false
    continue
  }

  const errors: string[] = []
  for (const p of exp.expectedPrereqs) {
    if (!cn.prerequisites.includes(p)) errors.push(`missing prereq: ${p}`)
  }
  for (const u of exp.expectedUnlocks) {
    if (!cn.unlocks.includes(u)) errors.push(`missing unlock: ${u}`)
  }
  if (cn.difficulty !== exp.expectedDifficulty) errors.push(`difficulty: expected ${exp.expectedDifficulty}, got ${cn.difficulty}`)
  if (cn.bloom !== exp.expectedBloom) errors.push(`bloom: expected ${exp.expectedBloom}, got ${cn.bloom}`)
  if (cn.domain !== 'phys.stat') errors.push(`domain: expected phys.stat, got ${cn.domain}`)

  if (errors.length > 0) {
    console.log(`  ✗ ${exp.id}`)
    for (const e of errors) console.log(`    ✗ ${e}`)
    allPass = false
  } else {
    console.log(`  ✓ ${exp.id}`)
    console.log(`    domain:${cn.domain}  type:${cn.concept_type}  diff:${cn.difficulty}  bloom:${cn.bloom}`)
    console.log(`    prereqs:[${cn.prerequisites.join(', ')}]`)
    console.log(`    unlocks:[${cn.unlocks.join(', ')}]  hours:${cn.estimated_hours}`)
  }
}

// Prerequisite chain reachability
console.log('\n  — prerequisite chain continuity —')
const idSet = new Set(concepts.map(c => c.id))
const adjReq = new Map<string, string[]>()
for (const c of concepts) adjReq.set(c.id, c.requires ?? [])

function reachableFrom(start: string, target: string): boolean {
  const visited = new Set<string>()
  const queue = [start]
  while (queue.length) {
    const cur = queue.shift()!
    if (cur === target) return true
    if (visited.has(cur)) continue
    visited.add(cur)
    for (const u of (adjReq.get(cur) ?? [])) {
      if (idSet.has(u)) queue.push(u)
    }
  }
  return false
}

const CHAIN_CHECKS: [string, string][] = [
  ['phys.stat.chemical-potential',                 'phys.stat.boltzmann-factor'],
  ['phys.stat.ising-model',                        'phys.stat.partition-function'],
  ['phys.stat.phase-transitions-critical-phenomena','phys.stat.free-energy'],
  ['phys.stat.phase-transitions-critical-phenomena','phys.stat.fluctuations-correlations'],
  ['phys.stat.monte-carlo-basics',                 'phys.stat.partition-function'],
  ['phys.stat.monte-carlo-basics',                 'phys.stat.phase-transitions'],
]

for (const [from, to] of CHAIN_CHECKS) {
  const ok = reachableFrom(from, to)
  const tag = from.replace('phys.stat.','').padEnd(40)
  if (ok) {
    console.log(`  ✓ ${tag} ← reaches ${to.replace('phys.stat.','')}`)
  } else {
    console.log(`  ✗ ${from} does NOT reach ${to}`)
    allPass = false
  }
}

// Verify existing concepts' unlocks were updated
console.log('\n  — existing concept unlocks updated correctly —')
const EXISTING_CHECKS: [string, string][] = [
  ['phys.stat.partition-function', 'phys.stat.grand-canonical-ensemble'],
  ['phys.stat.partition-function', 'phys.stat.fluctuations-correlations'],
  ['phys.stat.free-energy',        'phys.stat.phase-transitions'],
]
for (const [conceptId, shouldUnlock] of EXISTING_CHECKS) {
  const c = concepts.find(x => x.id === conceptId)
  if (!c) { console.log(`  ✗ ${conceptId}: NOT FOUND`); allPass = false; continue }
  const has = (c.unlocks as string[]).includes(shouldUnlock)
  if (has) {
    console.log(`  ✓ ${conceptId.replace('phys.stat.','')} → unlocks ${shouldUnlock.replace('phys.stat.','')}`)
  } else {
    console.log(`  ✗ ${conceptId} missing unlock → ${shouldUnlock}`)
    allPass = false
  }
}

console.log(`\nGAP-P03 smoke test: ${allPass ? 'ALL PASS ✓' : 'FAIL ✗'}`)
console.log()
