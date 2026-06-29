/**
 * Teaching Action Engine Validator
 *
 * Generic, subject-agnostic check that decideAction() — the deterministic
 * function in src/lib/curriculum/teachingActionEngine.ts — produces a valid
 * TeachingAction for every concept in a subject's Knowledge Graph, using the
 * subject's own (unmodified) Teaching Engine decision and Teaching Asset.
 *
 * Checks:
 *   1. Schema validation (Zod) — every produced TeachingAction is well-formed
 *   2. Supported action types — every action_type is in the generic enum
 *   3. Prerequisite consistency — required_prerequisites reference real KG IDs
 *   4. Teaching Engine compatibility — difficulty_level/estimated_duration are
 *      a pure pass-through of the unmodified decide() output
 *   5. Teaching Asset compatibility — every concept has an asset, and
 *      objective/completion_criteria are a pure pass-through of asset fields
 *
 * Usage:
 *   npx tsx scripts/validate-teaching-action-engine.ts <subject-docs-slug>
 *
 * Exit codes: 0 = all checks pass, 1 = one or more checks failed
 */

import { createSubjectAdapter } from '../src/lib/curriculum/subjectKgAdapter'
import { getTeachingAsset } from '../src/lib/curriculum/teachingAssets'
import { decide } from '../src/lib/teaching-engine'
import { decideAction } from '../src/lib/curriculum/teachingActionEngine'
import { TeachingActionSchema } from '../src/lib/curriculum/teachingActionSchema'
import type { StudentState, LearningHistory } from '../src/lib/teaching-engine/types'
import fs from 'fs'
import path from 'path'

interface CheckResult {
  name: string
  status: 'PASS' | 'FAIL'
  details: string[]
  count: number
}

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: npx tsx scripts/validate-teaching-action-engine.ts <subject-docs-slug>')
  process.exit(1)
}

const SUBJECT_SLUG_TO_REGISTRY_KEY: Record<string, string> = {
  mathematics: 'mathematics',
  physics: 'physics',
  chemistry: 'chemistry',
  biology: 'biology',
  'computer-science': 'computer_science',
}
const registryKey = SUBJECT_SLUG_TO_REGISTRY_KEY[slug]
if (!registryKey) {
  console.error(`Unknown subject slug: ${slug}`)
  process.exit(1)
}

const graphPath = path.join(process.cwd(), `docs/${slug}/kg/graph.json`)
const graph = JSON.parse(fs.readFileSync(graphPath, 'utf-8')) as { concepts: { id: string }[] }
const conceptIds = new Set(graph.concepts.map(c => c.id))

const STUDENT: StudentState = {
  level: 'T1',
  current_concepts_mastered: [],
  weak_concepts: [],
  misconceptions: [],
  retention_score: 72,
  learning_speed: 'normal',
  fatigue_level: 'low',
}
const HISTORY: LearningHistory = {
  recently_attempted: [],
  success_rate: 68,
  time_on_task: 420,
  error_patterns: [],
}

const kgAdapter = createSubjectAdapter(slug)

const schemaFailures: string[] = []
const prereqFailures: string[] = []
const engineMismatch: string[] = []
const assetMismatch: string[] = []
const missingAsset: string[] = []
const actionTypeCounts: Record<string, number> = {}

for (const id of conceptIds) {
  const concept = kgAdapter.getConceptNode(id)
  if (!concept) continue // structural completeness is the KG validator's job, not this one's

  const asset = getTeachingAsset(registryKey, id)
  if (!asset) { missingAsset.push(id); continue }

  const decision = decide(STUDENT, concept, HISTORY)
  const action = decideAction(STUDENT, decision, asset, concept)

  const parsed = TeachingActionSchema.safeParse(action)
  if (!parsed.success) {
    schemaFailures.push(`${id}: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`)
    continue
  }

  actionTypeCounts[action.action_type] = (actionTypeCounts[action.action_type] ?? 0) + 1

  for (const prereq of action.required_prerequisites) {
    if (!conceptIds.has(prereq)) prereqFailures.push(`${id} → ${prereq}`)
  }

  if (action.difficulty_level !== decision.difficulty || action.estimated_duration !== decision.estimated_time) {
    engineMismatch.push(`${id}: difficulty ${action.difficulty_level} vs ${decision.difficulty}, duration ${action.estimated_duration} vs ${decision.estimated_time}`)
  }

  if (action.objective !== asset.learning_objective || action.completion_criteria !== asset.assessment_blueprint.mastery_signal) {
    assetMismatch.push(id)
  }
}

const results: CheckResult[] = [
  {
    name: 'Schema validation (Zod)',
    status: schemaFailures.length ? 'FAIL' : 'PASS',
    details: schemaFailures.slice(0, 5),
    count: schemaFailures.length,
  },
  {
    name: 'Every concept has a Teaching Asset to build an action from',
    status: missingAsset.length ? 'FAIL' : 'PASS',
    details: missingAsset.length ? [`Missing: ${missingAsset.slice(0, 10).join(', ')}`] : [],
    count: missingAsset.length,
  },
  {
    name: 'Prerequisite consistency (required_prerequisites reference real KG IDs)',
    status: prereqFailures.length ? 'FAIL' : 'PASS',
    details: prereqFailures.slice(0, 10),
    count: prereqFailures.length,
  },
  {
    name: 'Teaching Engine compatibility (difficulty/duration pass-through from unmodified decide())',
    status: engineMismatch.length ? 'FAIL' : 'PASS',
    details: engineMismatch.slice(0, 5),
    count: engineMismatch.length,
  },
  {
    name: 'Teaching Asset compatibility (objective/completion_criteria pass-through from asset)',
    status: assetMismatch.length ? 'FAIL' : 'PASS',
    details: assetMismatch.slice(0, 5),
    count: assetMismatch.length,
  },
]

console.log('TEACHING ACTION ENGINE VALIDATOR')
console.log(`Subject: ${slug}`)
console.log('─'.repeat(60))
console.log(`KG concepts: ${conceptIds.size}  |  Actions generated: ${Object.values(actionTypeCounts).reduce((a, b) => a + b, 0)}`)
console.log(`Action type distribution: ${JSON.stringify(actionTypeCounts)}`)
console.log()

let anyFail = false
for (const r of results) {
  const icon = r.status === 'PASS' ? '✓' : '✗'
  console.log(`${icon} [${r.status}] ${r.name}`)
  for (const d of r.details) console.log(`       ${d}`)
  if (r.status === 'FAIL') anyFail = true
}

console.log()
console.log('─'.repeat(60))
console.log(`Overall: ${anyFail ? 'FAIL' : 'PASS'}`)
console.log('─'.repeat(60))

process.exit(anyFail ? 1 : 0)
