/**
 * Teaching Action Engine — integration proof.
 *
 * Demonstrates the full, unmodified pipeline:
 *
 *   Knowledge Graph → Subject Adapter → Teaching Engine (decide(), UNMODIFIED)
 *     → Teaching Assets (UNMODIFIED) → Teaching Action Engine (decideAction(), NEW)
 *     → TeachingAction
 *
 * For each of the 5 subjects, runs 4 real scenarios built from real concept
 * IDs (verified against each subject's own graph.json, not guessed) to show
 * the action engine reaches distinct, justified TeachingActionTypes as the
 * student state and Teaching Decision change:
 *
 *   1. teach,  root concept (no prerequisites)        → ANALOGY
 *   2. teach,  concept flagged as a misconception      → MISCONCEPTION_INTERVENTION
 *   3. remediate (weak prerequisite, low success)       → GUIDED_PROBLEM_SOLVING
 *   4. accelerate + Bloom evaluate/create               → ASSESSMENT
 *
 * decide() and the Teaching Asset layer are called exactly as production
 * code calls them — this script adds no behavior to either.
 *
 * Run: npx tsx scripts/test-teaching-action-engine-integration.ts
 */

import { createSubjectAdapter } from '../src/lib/curriculum/subjectKgAdapter'
import { getTeachingAsset } from '../src/lib/curriculum/teachingAssets'
import { decide } from '../src/lib/teaching-engine'
import { decideAction } from '../src/lib/curriculum/teachingActionEngine'
import { TeachingActionSchema, type TeachingActionType } from '../src/lib/curriculum/teachingActionSchema'
import type { StudentState, LearningHistory } from '../src/lib/teaching-engine/types'

const BASE_STUDENT: StudentState = {
  level: 'T1',
  current_concepts_mastered: [],
  weak_concepts: [],
  misconceptions: [],
  retention_score: 72,
  learning_speed: 'normal',
  fatigue_level: 'low',
}
const BASE_HISTORY: LearningHistory = {
  recently_attempted: [],
  success_rate: 68,
  time_on_task: 420,
  error_patterns: [],
}

const SUBJECTS = [
  { subject: 'mathematics',      docsSlug: 'mathematics',      rootId: 'math.found.mathematical-thinking', prereqOf: 'math.found.abstraction',        prereqPairId: 'math.found.mathematical-thinking', bloomId: 'math.found.mathematical-modeling' },
  { subject: 'physics',          docsSlug: 'physics',          rootId: 'phys.meas.units',                  prereqOf: 'phys.meas.scalars-vectors',      prereqPairId: 'phys.meas.units',                  bloomId: 'phys.qm.perturbation-theory' },
  { subject: 'chemistry',        docsSlug: 'chemistry',        rootId: 'chem.found.matter',                prereqOf: 'chem.found.states-of-matter',    prereqPairId: 'chem.found.matter',                bloomId: 'chem.org.carbene-cycloaddition' },
  { subject: 'biology',          docsSlug: 'biology',          rootId: 'bio.found.what-is-biology',        prereqOf: 'bio.found.characteristics-of-life', prereqPairId: 'bio.found.what-is-biology',     bloomId: 'bio.dev.stem-cells-regeneration' },
  { subject: 'computer_science', docsSlug: 'computer-science', rootId: 'cs.found.intro-computers',         prereqOf: 'cs.found.computer-organisation', prereqPairId: 'cs.found.intro-computers',         bloomId: 'cs.algo.np-completeness' },
]

console.log('\n═══════════════════════════════════════════════════════════')
console.log('TEACHING ACTION ENGINE — INTEGRATION PROOF')
console.log('  KG → Subject Adapter → decide() (unmodified) → Teaching Asset')
console.log('  (unmodified) → decideAction() (NEW) → TeachingAction')
console.log('═══════════════════════════════════════════════════════════\n')

let pass = true

function run(
  subject: string,
  docsSlug: string,
  label: string,
  conceptId: string,
  student: StudentState,
  history: LearningHistory,
  expected: TeachingActionType,
) {
  const kgAdapter = createSubjectAdapter(docsSlug)
  const concept = kgAdapter.getConceptNode(conceptId)
  if (!concept) { console.log(`✗ [${label}] ${conceptId}: NOT FOUND in KG`); pass = false; return }

  const decision = decide(student, concept, history)
  const asset = getTeachingAsset(subject, decision.next_concept)
  if (!asset) { console.log(`✗ [${label}] ${conceptId}: NO TEACHING ASSET for ${decision.next_concept}`); pass = false; return }

  const nextConcept = kgAdapter.getConceptNode(decision.next_concept) ?? concept
  const action = decideAction(student, decision, asset, nextConcept)

  const parsed = TeachingActionSchema.safeParse(action)
  if (!parsed.success) { console.log(`✗ [${label}] ${conceptId}: schema invalid`); pass = false; return }

  const ok = action.action_type === expected
  if (!ok) pass = false
  console.log(`${ok ? '✓' : '✗'} [${label}] ${conceptId}`)
  console.log(`    decide()       → mode:${decision.mode}  action_type:${decision.action_type}  next:${decision.next_concept}`)
  console.log(`    decideAction() → action_type:${action.action_type} (expected ${expected})  presentation_mode:${action.presentation_mode}`)
}

for (const s of SUBJECTS) {
  // 1. teach, root concept (no prerequisites) → ANALOGY
  run(s.subject, s.docsSlug, 'root/teach', s.rootId, BASE_STUDENT, BASE_HISTORY, 'ANALOGY')

  // 2. teach, concept flagged as a misconception → MISCONCEPTION_INTERVENTION
  run(
    s.subject, s.docsSlug, 'misconception', s.prereqOf,
    { ...BASE_STUDENT, misconceptions: [s.prereqOf] }, BASE_HISTORY,
    'MISCONCEPTION_INTERVENTION',
  )

  // 3. remediate (weak prerequisite, low success) → GUIDED_PROBLEM_SOLVING
  run(
    s.subject, s.docsSlug, 'remediate', s.prereqOf,
    { ...BASE_STUDENT, weak_concepts: [s.prereqPairId] }, { ...BASE_HISTORY, success_rate: 45 },
    'GUIDED_PROBLEM_SOLVING',
  )

  // 4. accelerate + Bloom evaluate/create → ASSESSMENT
  run(
    s.subject, s.docsSlug, 'accelerate/assessment', s.bloomId,
    { ...BASE_STUDENT, learning_speed: 'fast', retention_score: 90 }, { ...BASE_HISTORY, success_rate: 85 },
    'ASSESSMENT',
  )
}

console.log(`\nIntegration proof: ${pass ? 'ALL PASS ✓' : 'FAIL ✗'}`)
console.log('\nNote: ANIMATION / INTERACTIVE_DIAGRAM / SIMULATION (require concept_type')
console.log('"visual", never produced by inferConceptType()) and EXPERIMENT_DEMONSTRATION')
console.log('(requires >=2 real_world_applications; placeholder assets ship exactly 1) are')
console.log('schema-valid and reachable by decideAction(), but not exercised by current')
console.log('platform data — they activate once richer assets or a visual concept_type exist.')
