/**
 * Teaching Assets Platform — integration proof.
 *
 * Demonstrates that the existing, UNMODIFIED Teaching Engine (decide() in
 * src/lib/teaching-engine/index.ts, called exactly as /api/teaching-engine
 * calls it) composes with the new Teaching Asset layer without any change
 * to engine code. The asset layer is consulted AFTER decide() returns — it
 * never participates in the decision itself.
 *
 * For 2 representative concepts per subject (10 total, spanning Math,
 * Physics, Chemistry, Biology, Computer Science):
 *   1. Build a ConceptNode via the existing subjectKgAdapter (unmodified).
 *   2. Call decide() (unmodified) to get a TeachingDecision.
 *   3. Look up the concept's TeachingAsset via the new adapter.
 *   4. Resolve which asset field a real consumer would render for that
 *      action_type, and confirm it is present and non-empty.
 *
 * Run: npx tsx scripts/test-teaching-assets-integration.ts
 */

import { createSubjectAdapter } from '../src/lib/curriculum/subjectKgAdapter'
import { getTeachingAsset } from '../src/lib/curriculum/teachingAssets'
import { decide } from '../src/lib/teaching-engine'
import type { StudentState, LearningHistory, ActionType } from '../src/lib/teaching-engine/types'
import type { TeachingAsset } from '../src/lib/curriculum/teachingAssetSchema'

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

// Documents — for a future consumer, not the engine — which asset field
// supplies content for each unmodified ActionType. decide() never sees this.
const ACTION_TO_ASSET_FIELD: Record<ActionType, (a: TeachingAsset) => unknown> = {
  VISUAL_EXPLANATION:        a => a.visual_teaching_suggestions,
  STEP_BY_STEP_GUIDED:       a => a.worked_example_blueprint,
  INTERACTIVE_QUESTIONING:   a => a.practice_blueprint,
  PROBLEM_SOLVING_SESSION:   a => a.practice_blueprint,
  MISCONCEPTION_FIX:         a => a.common_misconceptions,
  RAPID_REVIEW:              a => a.prerequisite_review_triggers.length > 0
                                     ? a.prerequisite_review_triggers
                                     : a.key_ideas,
}

const CASES: { subject: string; docsSlug: string; ids: string[] }[] = [
  { subject: 'mathematics',      docsSlug: 'mathematics',      ids: ['math.found.mathematical-thinking', 'math.calc.derivative-definition'] },
  { subject: 'physics',          docsSlug: 'physics',          ids: ['phys.mech.newtons-first-law', 'phys.qm.schrodinger-equation'] },
  { subject: 'chemistry',        docsSlug: 'chemistry',        ids: ['chem.atomic.bohr-model', 'chem.org.iupac'] },
  { subject: 'biology',          docsSlug: 'biology',          ids: ['bio.found.what-is-biology', 'bio.cell.mitosis'] },
  { subject: 'computer_science', docsSlug: 'computer-science', ids: ['cs.found.intro-computers', 'cs.struct.binary-search-trees'] },
]

console.log('\n═══════════════════════════════════════════════════════════')
console.log('TEACHING ASSETS PLATFORM — INTEGRATION PROOF')
console.log('  decide() unmodified  →  TeachingAsset adapter (new, additive)')
console.log('═══════════════════════════════════════════════════════════\n')

let pass = true

for (const { subject, docsSlug, ids } of CASES) {
  const kgAdapter = createSubjectAdapter(docsSlug)
  for (const id of ids) {
    const concept = kgAdapter.getConceptNode(id)
    if (!concept) { console.log(`✗ ${id}: NOT FOUND in KG`); pass = false; continue }

    const decision = decide(STUDENT, concept, HISTORY)
    const asset = getTeachingAsset(subject, id)
    if (!asset) { console.log(`✗ ${id}: NO TEACHING ASSET`); pass = false; continue }
    if (asset.concept_id !== id) { console.log(`✗ ${id}: asset.concept_id mismatch`); pass = false; continue }

    const fieldForAction = ACTION_TO_ASSET_FIELD[decision.action_type](asset)
    const fieldPresent = Array.isArray(fieldForAction) ? fieldForAction.length > 0 : !!fieldForAction
    if (!fieldPresent) { console.log(`✗ ${id}: asset field for ${decision.action_type} is empty`); pass = false; continue }

    console.log(`✓ ${id}`)
    console.log(`    decide() → action_type:${decision.action_type}  mode:${decision.mode}  next:${decision.next_concept}`)
    console.log(`    asset    → id:${asset.id}  status:${asset.status}  (field for this action_type present)`)
  }
}

console.log(`\nIntegration proof: ${pass ? 'ALL PASS ✓' : 'FAIL ✗'}`)
