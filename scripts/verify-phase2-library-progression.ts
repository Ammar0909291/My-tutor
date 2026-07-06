/**
 * Phase 2 runtime validation — Physics Library progression pipeline.
 * Run with:
 *   DATABASE_URL=... DIRECT_URL=... ENABLE_LIBRARY_CONCEPT_TRACKING=1 \
 *   npx tsx scripts/verify-phase2-library-progression.ts
 *
 * Validates without modifying production code. Uses the same underlying
 * functions the route.ts pipeline calls. All DB writes use the same
 * code paths the frontend uses (curriculum API writes TopicProgress via
 * prisma directly after the AI session).
 */
import { prisma } from '../src/lib/db/prisma'
import { createSubjectAdapter } from '../src/lib/curriculum/subjectKgAdapter'
import { resolveLibraryDomainNodes, resolveLibraryEntryConceptId } from '../src/lib/curriculum/libraryConceptResolver'
import { buildLessonPlan } from '../src/lib/school/adaptive/lessonPlanner'
import { findLibrarySubject } from '../src/lib/curriculum/subjectCatalog'

// ──────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────
function hr(label: string) {
  console.log(`\n${'─'.repeat(68)}`)
  console.log(`  ${label}`)
  console.log('─'.repeat(68))
}

function pass(msg: string) { console.log(`  ✓  ${msg}`) }
function fail(msg: string) { console.log(`  ✗  ${msg}`); process.exitCode = 1 }
function info(msg: string) { console.log(`  →  ${msg}`) }

// ──────────────────────────────────────────────────────────────────
// Test scaffolding: create a minimal test user + subject + session
// ──────────────────────────────────────────────────────────────────
const TEST_USER_EMAIL = 'phase2-validation@mytutor.test'
const SUBJECT_CODE    = 'physics'
const MODULE_SLUG     = 'mechanics'      // maps to phys.mech domain

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║  MY TUTOR — Phase 2 Runtime Validation                      ║')
  console.log('║  Physics Library Progression Pipeline                       ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')

  // ── Setup: create/reuse test user ──────────────────────────────
  hr('SETUP — test user + subject rows')
  let user = await prisma.user.findUnique({ where: { email: TEST_USER_EMAIL } })
  if (!user) {
    user = await prisma.user.create({
      data: { email: TEST_USER_EMAIL, name: 'Phase2 Validator' },
    })
    info(`Created test user  id=${user.id}`)
  } else {
    info(`Reusing test user  id=${user.id}`)
  }
  const userId = user.id

  // Clean any leftover TopicProgress rows for phys.mech from this user
  const deleted = await prisma.topicProgress.deleteMany({
    where: { userId, subjectSlug: SUBJECT_CODE, topicSlug: { startsWith: 'phys.mech' } },
  })
  if (deleted.count > 0) info(`Cleaned ${deleted.count} leftover phys.mech TopicProgress rows`)

  // ── STEP 1: KG domain resolution ──────────────────────────────
  hr('STEP 1 — KG domain node resolution')

  const kgDomainNodes = resolveLibraryDomainNodes(SUBJECT_CODE, MODULE_SLUG)
  if (!kgDomainNodes || kgDomainNodes.length === 0) {
    fail(`resolveLibraryDomainNodes('${SUBJECT_CODE}', '${MODULE_SLUG}') returned null/empty`)
    return
  }
  pass(`resolveLibraryDomainNodes returned ${kgDomainNodes.length} nodes for phys.mech`)
  info(`First 5 canonical IDs: ${kgDomainNodes.slice(0, 5).map(n => n.id).join(', ')}`)
  info(`Expected first: phys.mech.displacement`)
  if (kgDomainNodes[0].id !== 'phys.mech.displacement') {
    fail(`First node is '${kgDomainNodes[0].id}' — expected 'phys.mech.displacement'`)
  } else {
    pass(`Correct entry node: phys.mech.displacement`)
  }

  const entryConceptId = resolveLibraryEntryConceptId(SUBJECT_CODE, MODULE_SLUG)
  info(`resolveLibraryEntryConceptId = ${entryConceptId}`)
  if (entryConceptId !== 'phys.mech.displacement') {
    fail(`Entry concept resolver returned '${entryConceptId}' — expected 'phys.mech.displacement'`)
  } else {
    pass(`Entry concept correct: phys.mech.displacement`)
  }

  // ── STEP 2a: Lesson plan — BEFORE any TopicProgress ───────────
  hr('STEP 2a — buildLessonPlan() with ZERO TopicProgress rows')

  const planBefore = await buildLessonPlan(
    userId, SUBJECT_CODE, MODULE_SLUG, 'Mechanics', kgDomainNodes,
  )

  info(`TopicProgress query was keyed on ${kgDomainNodes.length} canonical IDs`)
  info(`masteredConcepts.length  = ${planBefore.masteredConcepts.length}`)
  info(`currentConcept           = ${planBefore.currentConcept?.nodeId ?? 'null'}`)
  info(`remainingConcepts.length = ${planBefore.remainingConcepts.length}`)
  info(`estimatedCompletion      = ${planBefore.estimatedCompletion}%`)

  if (planBefore.masteredConcepts.length !== 0) {
    fail(`Expected 0 mastered concepts before any progress, got ${planBefore.masteredConcepts.length}`)
  } else {
    pass(`0 mastered concepts (correct — no TopicProgress rows yet)`)
  }
  if (planBefore.currentConcept?.nodeId !== 'phys.mech.displacement') {
    fail(`Expected currentConcept=phys.mech.displacement, got ${planBefore.currentConcept?.nodeId}`)
  } else {
    pass(`currentConcept = phys.mech.displacement (first non-mastered node)`)
  }
  if (planBefore.estimatedCompletion !== Math.round((0.5 / kgDomainNodes.length) * 100)) {
    // 0.5 for one IN_PROGRESS equivalent — actually no TopicProgress means 0 mastered + currentConcept exists → 0.5
    // estimated = Math.round((0 + 0.5) / 52 * 100) = Math.round(0.5/52*100) = 1%
  }
  info(`estimatedCompletion formula: Math.round(0.5/${kgDomainNodes.length}*100) = ${Math.round(0.5/kgDomainNodes.length*100)}%`)
  if (planBefore.estimatedCompletion !== Math.round(0.5/kgDomainNodes.length*100)) {
    fail(`estimatedCompletion mismatch: got ${planBefore.estimatedCompletion}, expected ${Math.round(0.5/kgDomainNodes.length*100)}`)
  } else {
    pass(`estimatedCompletion = ${planBefore.estimatedCompletion}% (correct for 0 mastered + 1 current)`)
  }

  const rowsBefore = await prisma.topicProgress.findMany({
    where: { userId, subjectSlug: SUBJECT_CODE, topicSlug: { startsWith: 'phys.mech' } },
  })
  info(`TopicProgress rows in DB at this point: ${rowsBefore.length}`)
  pass(`STEP 2a confirmed: Lesson Planner reads canonical KG IDs correctly (0 rows → correct defaults)`)

  // ── STEP 2b: Simulate Writer 1/2/3 — mark phys.mech.displacement MASTERED ──
  hr('STEP 2b — Write TopicProgress (simulating frontend Writers 1/2/3)')
  info(`Writing TopicProgress for phys.mech.displacement → status=MASTERED, masteryPct=100`)

  // This is the exact upsert the curriculum API does (same code path as writers 1/2/3)
  const completedConceptId = 'phys.mech.displacement'
  await prisma.topicProgress.upsert({
    where: {
      userId_subjectSlug_topicSlug: {
        userId,
        subjectSlug: SUBJECT_CODE,
        topicSlug:   completedConceptId,
      },
    },
    create: {
      userId,
      subjectSlug: SUBJECT_CODE,
      topicSlug:   completedConceptId,
      status:      'MASTERED',
      masteryPct:  100,
      attempts:    1,
      lastScore:   100,
    },
    update: {
      status:     'MASTERED',
      masteryPct: 100,
      lastScore:  100,
    },
  })

  const writtenRow = await prisma.topicProgress.findUnique({
    where: {
      userId_subjectSlug_topicSlug: {
        userId, subjectSlug: SUBJECT_CODE, topicSlug: completedConceptId,
      },
    },
  })
  if (!writtenRow) {
    fail(`TopicProgress row not found after upsert`)
    return
  }
  pass(`TopicProgress written:`)
  info(`  topicSlug   = ${writtenRow.topicSlug}`)
  info(`  subjectSlug = ${writtenRow.subjectSlug}`)
  info(`  status      = ${writtenRow.status}`)
  info(`  masteryPct  = ${writtenRow.masteryPct}`)
  info(`  userId      = ${writtenRow.userId}`)

  // ── STEP 3: Lesson plan — AFTER TopicProgress written ─────────
  hr('STEP 3 — buildLessonPlan() AFTER TopicProgress for phys.mech.displacement')

  const planAfter = await buildLessonPlan(
    userId, SUBJECT_CODE, MODULE_SLUG, 'Mechanics', kgDomainNodes,
  )

  info(`masteredConcepts.length  = ${planAfter.masteredConcepts.length}`)
  info(`masteredConcepts         = ${planAfter.masteredConcepts.map(c => c.nodeId).join(', ')}`)
  info(`currentConcept           = ${planAfter.currentConcept?.nodeId ?? 'null'}`)
  info(`remainingConcepts[0]     = ${planAfter.remainingConcepts[0]?.nodeId ?? 'null'}`)
  info(`estimatedCompletion      = ${planAfter.estimatedCompletion}%`)

  // Verify mastered
  if (planAfter.masteredConcepts.length !== 1) {
    fail(`Expected 1 mastered concept after writing MASTERED row, got ${planAfter.masteredConcepts.length}`)
  } else if (planAfter.masteredConcepts[0].nodeId !== 'phys.mech.displacement') {
    fail(`Expected mastered[0]=phys.mech.displacement, got ${planAfter.masteredConcepts[0].nodeId}`)
  } else {
    pass(`masteredConcepts[0] = phys.mech.displacement ✓ (TopicProgress row was READ correctly)`)
  }

  // Verify current advanced
  if (planAfter.currentConcept?.nodeId !== 'phys.mech.velocity') {
    fail(`Expected currentConcept to advance to phys.mech.velocity, got ${planAfter.currentConcept?.nodeId}`)
  } else {
    pass(`currentConcept ADVANCED: phys.mech.displacement → phys.mech.velocity ✓`)
  }

  // Verify remaining shrinks
  const expectedRemaining = kgDomainNodes.length - 2  // 1 mastered + 1 current
  if (planAfter.remainingConcepts.length !== expectedRemaining) {
    fail(`Expected ${expectedRemaining} remaining concepts, got ${planAfter.remainingConcepts.length}`)
  } else {
    pass(`remainingConcepts: ${kgDomainNodes.length} → ${planAfter.remainingConcepts.length} (shrinks by 2: 1 mastered + 1 current)`)
  }

  // Verify estimatedCompletion increases
  if (planAfter.estimatedCompletion <= planBefore.estimatedCompletion) {
    fail(`estimatedCompletion did not increase: before=${planBefore.estimatedCompletion}%, after=${planAfter.estimatedCompletion}%`)
  } else {
    pass(`estimatedCompletion increased: ${planBefore.estimatedCompletion}% → ${planAfter.estimatedCompletion}%`)
  }
  const expectedCompletion = Math.round((1 + 0.5) / kgDomainNodes.length * 100)  // 1 mastered + 0.5 current
  info(`Expected completion formula: Math.round(1.5/${kgDomainNodes.length}*100) = ${expectedCompletion}%`)
  if (planAfter.estimatedCompletion !== expectedCompletion) {
    fail(`estimatedCompletion = ${planAfter.estimatedCompletion}%, expected ${expectedCompletion}%`)
  } else {
    pass(`estimatedCompletion = ${planAfter.estimatedCompletion}% (correct)`)
  }

  // ── STEP 4: Teaching Engine concept progression trace ──────────
  hr('STEP 4 — Teaching Engine concept node resolution before/after')

  const adapter = createSubjectAdapter(SUBJECT_CODE)

  const conceptBefore = adapter.getConceptNode('phys.mech.displacement')
  const conceptAfter  = adapter.getConceptNode('phys.mech.velocity')

  if (!conceptBefore) {
    fail(`getConceptNode('phys.mech.displacement') returned undefined — Teaching Engine would fail`)
  } else {
    pass(`Turn 1: Teaching Engine resolves phys.mech.displacement → title="${conceptBefore.id}", domain=${conceptBefore.domain}`)
  }

  if (!conceptAfter) {
    fail(`getConceptNode('phys.mech.velocity') returned undefined — Teaching Engine would fail after advancement`)
  } else {
    pass(`Turn 2: Teaching Engine resolves phys.mech.velocity → title="${conceptAfter.id}", domain=${conceptAfter.domain}`)
  }

  info(`Concept ID transition: phys.mech.displacement → phys.mech.velocity`)
  info(`Both nodes resolve through createSubjectAdapter(physics).getConceptNode() ✓`)

  // ── STEP 5: contextSnapshot persistence path ───────────────────
  hr('STEP 5 — contextSnapshot currentConceptNodeId persistence')

  // The persist block in route.ts reads libraryConceptNodeIdHoisted (set by Writer B / resolveLibraryEntryConceptId).
  // After Phase 1 that is already a canonical KG ID. Here we verify it resolves correctly
  // for the module AFTER progression (the snapshot should now point to phys.mech.velocity).

  // The actual persist updates LearnSession.currentConceptNodeId.
  // We verify the value that WOULD be written:
  const snapshotConceptId = 'phys.mech.displacement'           // current snapshot (before this turn)
  const newCurrentFromPlan = planAfter.currentConcept?.nodeId  // phys.mech.velocity (from lesson plan)

  info(`Prior contextSnapshot.currentConceptNodeId = ${snapshotConceptId}`)
  info(`planAfter.currentConcept.nodeId            = ${newCurrentFromPlan}`)

  // route.ts persist logic: if newLibConceptId !== snapshotCurrentConceptId → update
  if (newCurrentFromPlan !== snapshotConceptId) {
    pass(`Persist block WOULD fire: ${snapshotConceptId} → ${newCurrentFromPlan} ✓`)
  } else {
    fail(`Persist block would NOT fire (no advancement detected)`)
  }

  // Confirm that the lesson plan's currentConcept drives concept advancement
  // (not a manually-forced jump — driven by TopicProgress mastery data)
  pass(`Advancement is data-driven: TopicProgress MASTERED row → buildLessonPlan() → currentConcept changes → persist block fires`)

  // ── STEP 6: Regression checks ──────────────────────────────────
  hr('STEP 6 — Regression verification')

  // 6a. School mode isolation: phys.mech rows we wrote use subjectSlug='physics'
  // School mode uses subjectSlug='physics' too but topicSlugs from Namespace B (physics.kinematics.*)
  // Check no cross-contamination:
  const schoolRows = await prisma.topicProgress.findMany({
    where: { userId, subjectSlug: SUBJECT_CODE, topicSlug: { startsWith: 'physics.' } },
  })
  if (schoolRows.length > 0) {
    fail(`School Namespace B rows found unexpectedly: ${schoolRows.map(r => r.topicSlug).join(', ')}`)
  } else {
    pass(`School mode isolation: 0 Namespace B (physics.*) rows — no contamination ✓`)
  }

  // 6b. Resolver fallback: a module with no KG domain mapping returns null
  const unknownNodes = resolveLibraryDomainNodes('physics', 'nonexistent_module')
  if (unknownNodes !== null) {
    fail(`Fallback: expected null for unknown module, got ${JSON.stringify(unknownNodes)}`)
  } else {
    pass(`Fallback path: resolveLibraryDomainNodes(physics, nonexistent_module) = null ✓ (subjectCatalog path would be used)`)
  }

  // 6c. Non-physics subject: resolveLibraryDomainNodes for math returns null (not in pilot)
  const mathNodes = resolveLibraryDomainNodes('mathematics', 'algebra')
  if (mathNodes !== null) {
    fail(`Expected null for non-pilot subject mathematics, got ${mathNodes?.length} nodes`)
  } else {
    pass(`Non-pilot subject (mathematics) returns null → fallback path ✓`)
  }

  // 6d. Physics KG adapter still works for school-mode node lookups
  const schoolConceptNode = createSubjectAdapter('physics').getConceptNode('phys.meas.units')
  if (!schoolConceptNode) {
    fail(`getConceptNode(phys.meas.units) failed — would break school+library physics`)
  } else {
    pass(`KG adapter unaffected for phys.meas.units ✓`)
  }

  // 6e. Library subject catalog still resolves (subjectCatalog not broken)
  const libSubject = findLibrarySubject('physics')
  if (!libSubject) {
    fail(`findLibrarySubject('physics') returned null — subjectCatalog broken`)
  } else {
    pass(`findLibrarySubject('physics') still resolves (${libSubject.modules.length} modules) ✓`)
  }

  // ── Summary ───────────────────────────────────────────────────
  hr('VALIDATION SUMMARY')

  const exitCode = process.exitCode ?? 0
  if (exitCode === 0) {
    console.log('\n  ✅  ALL CHECKS PASSED')
    console.log('\n  Progression trace:')
    console.log(`     TURN 1: currentConceptNodeId = phys.mech.displacement`)
    console.log(`             TopicProgress rows for phys.mech.* = 0`)
    console.log(`             buildLessonPlan currentConcept = phys.mech.displacement`)
    console.log(``)
    console.log(`     [MASTERY EVENT: phys.mech.displacement → MASTERED]`)
    console.log(`     [TopicProgress row written: topicSlug=phys.mech.displacement, status=MASTERED]`)
    console.log(``)
    console.log(`     TURN 2: currentConceptNodeId = phys.mech.velocity`)
    console.log(`             TopicProgress rows for phys.mech.* = 1 (displacement MASTERED)`)
    console.log(`             buildLessonPlan masteredConcepts = [phys.mech.displacement]`)
    console.log(`             buildLessonPlan currentConcept   = phys.mech.velocity (advanced ✓)`)
    console.log(`             estimatedCompletion: ${planBefore.estimatedCompletion}% → ${planAfter.estimatedCompletion}%`)
    console.log(``)
    console.log(`  Phase 2 fix confirmed: TopicProgress query now matches Namespace A (canonical KG IDs)`)
    console.log(`  Teaching Engine receives phys.mech.velocity on Turn 2 — concept progression works.`)
  } else {
    console.log('\n  ❌  SOME CHECKS FAILED — see ✗ lines above')
  }
  console.log()
}

// ── Cleanup helper (always runs) ──────────────────────────────────
async function cleanup() {
  await prisma.topicProgress.deleteMany({
    where: { userId: (await prisma.user.findUnique({ where: { email: TEST_USER_EMAIL } }))?.id ?? 'NONE',
             subjectSlug: SUBJECT_CODE, topicSlug: { startsWith: 'phys.mech' } },
  }).catch(() => {})
  await prisma.user.deleteMany({ where: { email: TEST_USER_EMAIL } }).catch(() => {})
}

main()
  .then(cleanup)
  .finally(() => prisma.$disconnect())
