/**
 * Integration test: Items 3 & 4
 * Run: npx tsx scripts/test-integration.ts
 */

import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import { MATH_KNOWLEDGE_GRAPH } from '../src/lib/education/mathKnowledgeGraph'
import { ALL_KG_NODES } from '../src/lib/education/educationGraph'
import { findUnmappedChapters } from '../src/lib/education/coverageAudit'
import { CBSE_MATH_CATALOG } from '../src/lib/education/cbseMathCatalog'

// ── Inlined adapter ───────────────────────────────────────────────────────────

interface RawConcept {
  id: string; name: string; difficulty: string; bloom: string
  requires: string[]; unlocks: string[]; estimated_hours: number
  [key: string]: unknown
}
type ConceptType = 'conceptual' | 'application' | 'problem_solving' | 'visual'
type GraphDiff   = 'foundational'|'developing'|'proficient'|'advanced'|'expert'|'research'
type TrackLevel  = 'T0'|'T1'|'T2'|'T3'|'T4'

interface ConceptNode {
  id: string; domain: string; prerequisites: string[]; unlocks: string[]
  difficulty: GraphDiff | TrackLevel; concept_type: ConceptType
  estimated_hours?: number; bloom?: string; name?: string
}

const rawConcepts: RawConcept[] = JSON.parse(
  fs.readFileSync(path.join(process.cwd(),'docs/mathematics/kg/graph.json'),'utf-8')
).concepts

const inferDomain = (id: string) => {
  const p = id.split('.'); return p.length>=3 ? `${p[0]}.${p[1]}` : p[0]
}
const inferConceptType = (bloom: string): ConceptType => {
  if (bloom==='remember'||bloom==='understand') return 'conceptual'
  if (bloom==='apply') return 'application'
  return 'problem_solving'
}
const getConceptNode = (id: string): ConceptNode | undefined => {
  const r = rawConcepts.find(c => c.id===id)
  if (!r) return undefined
  return { id:r.id, domain:inferDomain(r.id), prerequisites:r.requires, unlocks:r.unlocks,
           difficulty:r.difficulty as GraphDiff, concept_type:inferConceptType(r.bloom),
           estimated_hours:r.estimated_hours, bloom:r.bloom, name:r.name }
}

// ── ITEM 3: Zod schema identical to route.ts ──────────────────────────────────

console.log('\n═══════════════════════════════════════════════════════════')
console.log('ITEM 3 — API ROUTE ZOD VALIDATION')
console.log('═══════════════════════════════════════════════════════════\n')

const TrackLevelZ = z.enum(['T0','T1','T2','T3','T4'])
const DiffZ       = z.enum(['foundational','developing','proficient','advanced','expert','research'])
const CTZ         = z.enum(['conceptual','application','problem_solving','visual'])

const RequestSchema = z.object({
  student: z.object({
    level:                     TrackLevelZ,
    current_concepts_mastered: z.array(z.string()),
    weak_concepts:             z.array(z.string()),
    misconceptions:            z.array(z.string()),
    retention_score:           z.number().min(0).max(100),
    learning_speed:            z.enum(['slow','normal','fast']),
    fatigue_level:             z.enum(['low','medium','high']),
  }),
  concept: z.object({
    id:              z.string().min(1),
    domain:          z.string().min(1),
    prerequisites:   z.array(z.string()),
    unlocks:         z.array(z.string()),
    difficulty:      z.union([DiffZ, TrackLevelZ]),
    concept_type:    CTZ,
    estimated_hours: z.number().positive().optional(),
    bloom:           z.string().optional(),
    name:            z.string().optional(),
  }),
  history: z.object({
    recently_attempted: z.array(z.string()),
    success_rate:       z.number().min(0).max(100),
    time_on_task:       z.number().min(0),
    error_patterns:     z.array(z.string()),
  }),
})

const STUDENT = { level:'T1' as TrackLevel, current_concepts_mastered:[], weak_concepts:[],
  misconceptions:[], retention_score:70, learning_speed:'normal' as const, fatigue_level:'low' as const }
const HISTORY = { recently_attempted:[], success_rate:75, time_on_task:600, error_patterns:[] }

const ZOD_IDS = [
  'math.arith.addition',                // foundational / apply / application
  'math.linalg.eigenvalues',            // proficient   / apply / application
  'math.cat.yoneda-lemma',             // research     / analyze / problem_solving
]

let zodPass = true
for (const id of ZOD_IDS) {
  const cn = getConceptNode(id)
  if (!cn) { console.log(`  ✗ ${id}: not found`); zodPass=false; continue }
  const r = RequestSchema.safeParse({ student:STUDENT, concept:cn, history:HISTORY })
  if (r.success) {
    console.log(`  ✓ ${id}`)
    console.log(`    domain:"${cn.domain}"  concept_type:${cn.concept_type}  difficulty:${cn.difficulty}`)
  } else {
    console.log(`  ✗ ${id}: ${JSON.stringify(r.error.flatten())}`)
    zodPass = false
  }
}
console.log(`\nItem 3: ${zodPass ? 'ALL PASS ✓' : 'FAIL ✗'}`)

// ── ITEM 4: CBSE backward compat ─────────────────────────────────────────────

console.log('\n═══════════════════════════════════════════════════════════')
console.log('ITEM 4 — CBSE BACKWARD-COMPAT REGRESSION')
console.log('═══════════════════════════════════════════════════════════\n')

const LEGACY_IDS = [
  'arithmetic.counting_numbers','arithmetic.addition_subtraction',
  'arithmetic.multiplication_division','arithmetic.lcm_hcf',
  'number_systems.whole_natural','number_systems.integers',
  'geometry.basic_shapes','geometry.triangles','geometry.quadrilaterals',
  'algebra.introduction','algebra.linear_equations_1var','algebra.quadratic_equations',
  'calculus.limits_continuity','calculus.differentiation',
  'probability.basics','matrices.basics','combinatorics.permutations_combinations',
]

let compatPass = true
for (const id of LEGACY_IDS) {
  const node = MATH_KNOWLEDGE_GRAPH.find(n => n.id === id)
  if (node) {
    console.log(`  ✓ ${id.padEnd(42)} "${node.title}"`)
  } else {
    console.log(`  ✗ MISSING: ${id}`)
    compatPass = false
  }
}

const mathLegacy = ALL_KG_NODES.filter(n =>
  ['arithmetic','algebra','geometry','number_systems','calculus','probability','matrices','combinatorics']
  .some(p => n.id.startsWith(p))
).length

console.log(`\nALL_KG_NODES: ${ALL_KG_NODES.length} total | ${mathLegacy} legacy math nodes`)

const unmapped = findUnmappedChapters([CBSE_MATH_CATALOG])
console.log(`coverageAudit unmapped CBSE math chapters: ${unmapped.length}`)
if (unmapped.length > 0) {
  console.log(`  First 3: ${unmapped.slice(0,3).map((u: any) => `${u.chapterId}→[${u.missingNodeIds.join(',')}]`).join(' | ')}`)
  compatPass = false
} else {
  console.log('  All CBSE math chapters resolve correctly ✓')
}

console.log(`\nItem 4: ${compatPass ? 'ALL PASS ✓' : 'FAIL ✗'}`)
