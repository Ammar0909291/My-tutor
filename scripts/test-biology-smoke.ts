/**
 * Phase 4: Biology Teaching Engine smoke test — through generic adapter
 * Run: npx tsx scripts/test-biology-smoke.ts
 */
import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import { inferDomain, inferConceptType } from '../src/lib/curriculum/subjectKgAdapter'

const ROOT = process.cwd()

interface RawConcept {
  id: string; name: string; description: string; difficulty: string
  bloom: string; requires: string[]; unlocks: string[]
  cross_links: string[]; mastery_threshold: number; estimated_hours: number
}

const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/biology/kg/graph.json'), 'utf-8'))
const concepts: RawConcept[] = raw.concepts

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

// Zod schema — identical to /api/teaching-engine route
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
  misconceptions:[], retention_score:74, learning_speed:'normal' as const, fatigue_level:'low' as const }
const HISTORY = { recently_attempted:[], success_rate:71, time_on_task:480, error_patterns:[] }

// Representative concepts — one per major domain cluster, all difficulty levels
const IDS = [
  'bio.found.what-is-biology',          // foundational / remember
  'bio.cell.eukaryotic-cell',           // developing   / understand
  'bio.mol.translation-genetic-code',   // advanced     / analyze
  'bio.gen.population-genetics',        // expert       / analyze
  'bio.evo.modern-synthesis-speciation',// advanced     / analyze
  'bio.physio.endocrine-system',        // advanced     / analyze
  'bio.immuno.immune-disorders',        // expert       / evaluate
  'bio.biotech.crispr-genome-editing',  // expert       / evaluate
  'bio.bioinfo.phylogenetics-computational', // research / analyze
  'bio.sys.synthetic-biology',          // research     / evaluate
]

console.log('\n═══════════════════════════════════════════════════════════')
console.log('PHASE 4 — BIOLOGY TEACHING ENGINE SMOKE TEST (10 concepts)')
console.log('           via generic subjectKgAdapter (inferDomain, inferConceptType)')
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
console.log(`\nPhase 4 Biology: ${pass ? 'ALL PASS ✓' : 'FAIL ✗'}`)
