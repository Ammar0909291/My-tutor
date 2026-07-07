/**
 * GAP-P02 smoke test — Advanced Quantum Mechanics (7 new phys.qm concepts)
 * Exercises each concept through the adapter → KnowledgeNode → Zod pipeline.
 * Run: npx tsx scripts/test-physics-qm-advanced-smoke.ts
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
    'phys.qm.operators',
    'phys.qm.hydrogen-atom-qm',
    'phys.qm.perturbation-theory',
    'phys.qm.spin',
    'phys.qm.pauli-exclusion',
    'phys.qm.quantum-tunneling',
    'phys.mech.hamiltonian',
  ],
  weak_concepts: [],
  misconceptions: [],
  retention_score: 88,
  learning_speed: 'normal' as const,
  fatigue_level: 'low' as const,
}
const HISTORY = { recently_attempted: [], success_rate: 81, time_on_task: 900, error_patterns: [] }

interface ExpectedShape {
  id: string
  expectedPrereqs: string[]
  expectedUnlocks: string[]
  expectedDifficulty: string
  expectedBloom: string
  expectedDomain: string
}

const EXPECTED: ExpectedShape[] = [
  {
    id: 'phys.qm.variational-method',
    expectedPrereqs: ['phys.qm.hydrogen-atom-qm', 'phys.qm.perturbation-theory'],
    expectedUnlocks: ['phys.qm.wkb-approximation'],
    expectedDifficulty: 'expert', expectedBloom: 'apply', expectedDomain: 'phys.qm',
  },
  {
    id: 'phys.qm.wkb-approximation',
    expectedPrereqs: ['phys.qm.quantum-tunneling', 'phys.qm.variational-method'],
    expectedUnlocks: [],
    expectedDifficulty: 'expert', expectedBloom: 'apply', expectedDomain: 'phys.qm',
  },
  {
    id: 'phys.qm.identical-particles',
    expectedPrereqs: ['phys.qm.spin', 'phys.qm.pauli-exclusion'],
    expectedUnlocks: [],
    expectedDifficulty: 'expert', expectedBloom: 'analyze', expectedDomain: 'phys.qm',
  },
  {
    id: 'phys.qm.angular-momentum-addition',
    expectedPrereqs: ['phys.qm.spin', 'phys.qm.hydrogen-atom-qm'],
    expectedUnlocks: ['phys.qm.scattering-theory-born-approximation'],
    expectedDifficulty: 'expert', expectedBloom: 'analyze', expectedDomain: 'phys.qm',
  },
  {
    id: 'phys.qm.scattering-theory-born-approximation',
    expectedPrereqs: ['phys.qm.operators', 'phys.qm.angular-momentum-addition', 'phys.mech.hamiltonian'],
    expectedUnlocks: ['phys.qm.s-matrix-basics'],
    expectedDifficulty: 'expert', expectedBloom: 'analyze', expectedDomain: 'phys.qm',
  },
  {
    id: 'phys.qm.s-matrix-basics',
    expectedPrereqs: ['phys.qm.scattering-theory-born-approximation'],
    expectedUnlocks: [],
    expectedDifficulty: 'expert', expectedBloom: 'evaluate', expectedDomain: 'phys.qm',
  },
  {
    id: 'phys.qm.density-matrix',
    expectedPrereqs: ['phys.qm.operators', 'phys.qm.spin'],
    expectedUnlocks: [],
    expectedDifficulty: 'expert', expectedBloom: 'analyze', expectedDomain: 'phys.qm',
  },
]

console.log('\n═══════════════════════════════════════════════════════════════════')
console.log('GAP-P02 — ADVANCED QUANTUM MECHANICS SMOKE TEST (7 concepts)')
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
  if (cn.domain !== exp.expectedDomain) {
    errors.push(`domain: expected ${exp.expectedDomain}, got ${cn.domain}`)
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

// Cross-domain wiring: scattering-theory requires phys.mech.hamiltonian
console.log('\n  — cross-domain prerequisite chain checks —')
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
  // scattering reaches Lagrangian foundations
  ['phys.qm.scattering-theory-born-approximation', 'phys.mech.hamiltonian'],
  ['phys.qm.scattering-theory-born-approximation', 'phys.mech.conservative-forces'],
  // s-matrix reaches all the way to operators
  ['phys.qm.s-matrix-basics', 'phys.qm.operators'],
  // variational chain
  ['phys.qm.wkb-approximation', 'phys.qm.hydrogen-atom-qm'],
  // identical-particles back to spin
  ['phys.qm.identical-particles', 'phys.qm.spin'],
  // density-matrix back to schrodinger
  ['phys.qm.density-matrix', 'phys.qm.schrodinger-equation'],
]

for (const [from, to] of CHAIN_CHECKS) {
  const ok = reachableFrom(from, to)
  if (ok) {
    console.log(`  ✓ ${from.replace('phys.qm.','qm.')} ← reaches ${to.replace('phys.','').replace('.','.')}`)
  } else {
    console.log(`  ✗ ${from} does NOT reach ${to}`)
    allPass = false
  }
}

// Verify existing concepts' unlocks were updated correctly
console.log('\n  — existing concept unlocks updated correctly —')
const EXISTING_UNLOCKS_CHECKS: [string, string][] = [
  ['phys.qm.perturbation-theory', 'phys.qm.variational-method'],
  ['phys.qm.quantum-tunneling',   'phys.qm.wkb-approximation'],
  ['phys.qm.pauli-exclusion',     'phys.qm.identical-particles'],
  ['phys.qm.spin',                'phys.qm.angular-momentum-addition'],
  ['phys.qm.spin',                'phys.qm.density-matrix'],
  ['phys.qm.operators',           'phys.qm.density-matrix'],
  ['phys.qm.operators',           'phys.qm.scattering-theory-born-approximation'],
  ['phys.mech.hamiltonian',       'phys.qm.scattering-theory-born-approximation'],
]

for (const [conceptId, shouldUnlock] of EXISTING_UNLOCKS_CHECKS) {
  const c = concepts.find(x => x.id === conceptId)
  if (!c) {
    console.log(`  ✗ ${conceptId}: NOT FOUND`)
    allPass = false
    continue
  }
  const has = (c.unlocks as string[]).includes(shouldUnlock)
  if (has) {
    console.log(`  ✓ ${conceptId.replace('phys.','').replace('.','.')} → unlocks ${shouldUnlock.replace('phys.','').replace('.','.')}`)
  } else {
    console.log(`  ✗ ${conceptId} missing unlock → ${shouldUnlock}`)
    allPass = false
  }
}

console.log(`\nGAP-P02 smoke test: ${allPass ? 'ALL PASS ✓' : 'FAIL ✗'}`)
console.log()
