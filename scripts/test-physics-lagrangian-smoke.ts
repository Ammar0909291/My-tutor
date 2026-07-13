/**
 * GAP-P01 smoke test — Lagrangian & Hamiltonian Mechanics
 * Exercises each of the 8 new phys.mech concepts through the same
 * adapter → KnowledgeNode shape → Zod schema pipeline used by Phase 4.
 * Run: npx tsx scripts/test-physics-lagrangian-smoke.ts
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
  level: 'T3' as const,
  current_concepts_mastered: [
    'phys.mech.conservative-forces',
    'phys.mech.kinematics-2d',
  ],
  weak_concepts: [],
  misconceptions: [],
  retention_score: 84,
  learning_speed: 'normal' as const,
  fatigue_level: 'low' as const,
}
const HISTORY = { recently_attempted: [], success_rate: 78, time_on_task: 720, error_patterns: [] }

// All 8 GAP-P01 concepts in prerequisite order
const LAGRANGIAN_IDS = [
  'phys.mech.generalized-coordinates',
  'phys.mech.euler-lagrange-equation',
  'phys.mech.cyclic-coordinates-conservation-laws',
  'phys.mech.hamiltonian',
  'phys.mech.hamiltons-equations',
  'phys.mech.poisson-brackets',
  'phys.mech.canonical-transformations',
  'phys.mech.hamilton-jacobi-equation',
]

// Structural checks beyond Zod schema validation
interface ExpectedShape {
  id: string
  expectedPrereqs: string[]
  expectedUnlocks: string[]
  expectedDifficulty: string
  expectedBloom: string
}

const EXPECTED: ExpectedShape[] = [
  {
    id: 'phys.mech.generalized-coordinates',
    expectedPrereqs: ['phys.mech.conservative-forces', 'phys.mech.kinematics-2d'],
    expectedUnlocks: ['phys.mech.euler-lagrange-equation'],
    expectedDifficulty: 'expert', expectedBloom: 'understand',
  },
  {
    id: 'phys.mech.euler-lagrange-equation',
    expectedPrereqs: ['phys.mech.generalized-coordinates'],
    expectedUnlocks: ['phys.mech.cyclic-coordinates-conservation-laws', 'phys.mech.hamiltonian'],
    expectedDifficulty: 'expert', expectedBloom: 'apply',
  },
  {
    id: 'phys.mech.cyclic-coordinates-conservation-laws',
    expectedPrereqs: ['phys.mech.euler-lagrange-equation'],
    expectedUnlocks: [],
    expectedDifficulty: 'expert', expectedBloom: 'analyze',
  },
  {
    id: 'phys.mech.hamiltonian',
    expectedPrereqs: ['phys.mech.euler-lagrange-equation'],
    expectedUnlocks: ['phys.mech.hamiltons-equations'],
    expectedDifficulty: 'expert', expectedBloom: 'understand',
  },
  {
    id: 'phys.mech.hamiltons-equations',
    expectedPrereqs: ['phys.mech.hamiltonian'],
    expectedUnlocks: ['phys.mech.poisson-brackets'],
    expectedDifficulty: 'expert', expectedBloom: 'apply',
  },
  {
    id: 'phys.mech.poisson-brackets',
    expectedPrereqs: ['phys.mech.hamiltons-equations'],
    expectedUnlocks: ['phys.mech.canonical-transformations'],
    expectedDifficulty: 'expert', expectedBloom: 'analyze',
  },
  {
    id: 'phys.mech.canonical-transformations',
    expectedPrereqs: ['phys.mech.poisson-brackets'],
    expectedUnlocks: ['phys.mech.hamilton-jacobi-equation'],
    expectedDifficulty: 'expert', expectedBloom: 'analyze',
  },
  {
    id: 'phys.mech.hamilton-jacobi-equation',
    expectedPrereqs: ['phys.mech.canonical-transformations'],
    expectedUnlocks: [],
    expectedDifficulty: 'expert', expectedBloom: 'evaluate',
  },
]

console.log('\n═══════════════════════════════════════════════════════════════════')
console.log('GAP-P01 — LAGRANGIAN & HAMILTONIAN MECHANICS SMOKE TEST (8 concepts)')
console.log('═══════════════════════════════════════════════════════════════════\n')

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

  // Structural edge checks
  const errors: string[] = []

  for (const p of exp.expectedPrereqs) {
    if (!cn.prerequisites.includes(p)) errors.push(`missing prereq: ${p}`)
  }
  for (const u of exp.expectedUnlocks) {
    if (!cn.unlocks.includes(u)) errors.push(`missing unlock: ${u}`)
  }
  if (cn.difficulty !== exp.expectedDifficulty) {
    errors.push(`difficulty: expected ${exp.expectedDifficulty}, got ${cn.difficulty}`)
  }
  if (cn.bloom !== exp.expectedBloom) {
    errors.push(`bloom: expected ${exp.expectedBloom}, got ${cn.bloom}`)
  }
  if (cn.domain !== 'phys.mech') {
    errors.push(`domain: expected phys.mech, got ${cn.domain}`)
  }

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

// Verify prerequisite chain continuity: each concept is reachable from conservative-forces
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
  ['phys.mech.euler-lagrange-equation', 'phys.mech.conservative-forces'],
  ['phys.mech.hamiltons-equations',     'phys.mech.conservation-of-energy'],
  ['phys.mech.hamilton-jacobi-equation','phys.mech.kinematics-2d'],
  ['phys.mech.hamilton-jacobi-equation','phys.mech.conservative-forces'],
]

for (const [from, to] of CHAIN_CHECKS) {
  const ok = reachableFrom(from, to)
  if (ok) {
    console.log(`  ✓ ${from} ← reaches ${to}`)
  } else {
    console.log(`  ✗ ${from} does NOT reach ${to}`)
    allPass = false
  }
}

console.log(`\nGAP-P01 smoke test: ${allPass ? 'ALL PASS ✓' : 'FAIL ✗'}`)
console.log()
