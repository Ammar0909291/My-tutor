/**
 * Phase 4: Physics Teaching Engine smoke test
 * Run: npx tsx scripts/test-physics-smoke.ts
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

const STUDENT = { level:'T1' as const, current_concepts_mastered:[], weak_concepts:[],
  misconceptions:[], retention_score:72, learning_speed:'normal' as const, fatigue_level:'low' as const }
const HISTORY = { recently_attempted:[], success_rate:68, time_on_task:540, error_patterns:[] }

const IDS = [
  'phys.meas.units',
  'phys.mech.kinematics-1d',
  'phys.em.faradays-law',
  'phys.qm.schrodinger-equation',
  'phys.astro.gravitational-waves',
  'phys.mod.wave-particle-duality',
  'phys.rel.lorentz-transform',
]

console.log('\n═══════════════════════════════════════════════════════════')
console.log('PHASE 4 — PHYSICS TEACHING ENGINE SMOKE TEST (7 concepts)')
console.log('═══════════════════════════════════════════════════════════\n')

let pass = true
for (const id of IDS) {
  const cn = getConceptNode(id)
  if (!cn) { console.log(`  ✗ ${id}: NOT FOUND`); pass = false; continue }
  const r = Schema.safeParse({ student: STUDENT, concept: cn, history: HISTORY })
  if (r.success) {
    console.log(`  ✓ ${id}`)
    console.log(`    domain:${cn.domain}  type:${cn.concept_type}  diff:${cn.difficulty}  bloom:${cn.bloom}`)
    console.log(`    prereqs:${cn.prerequisites.length}  unlocks:${cn.unlocks.length}  hours:${cn.estimated_hours}`)
  } else {
    console.log(`  ✗ ${id}: ZOD FAIL — ${JSON.stringify(r.error.flatten())}`)
    pass = false
  }
}
console.log(`\nPhase 4: ${pass ? 'ALL PASS ✓' : 'FAIL ✗'}`)
