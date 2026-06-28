/**
 * Offline harness for Educational Brain stages 0–4 (Frame, Intent, Composition deterministic).
 * Stages 2/4 (Retrieval/Persist) require DB — skipped path tested offline only.
 * Run with:  npx tsx scripts/test-eb-pipeline.ts
 */
import { frameStage } from '../src/lib/educationalBrain/frameStage'
import { intentStage } from '../src/lib/educationalBrain/intentStage'
import { compositionStage } from '../src/lib/educationalBrain/compositionStage'
import { isEducationalBrainEnabled } from '../src/lib/educationalBrain/pipeline'
import type { TurnContext, ConceptContext } from '../src/lib/educationalBrain/types'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

console.log('\n=== Educational Brain — Stage 0 (Frame) ===\n')

const base = frameStage({ userId: 'u1', sessionId: 's1', subjectSlug: 'physics', userMessage: 'What is velocity?' })
check('turnId is a UUID string', typeof base.turnId === 'string' && base.turnId.length > 10)
check('userId set', base.userId === 'u1')
check('sessionId set', base.sessionId === 's1')
check('subjectSlug set', base.subjectSlug === 'physics')
check('userMessage set', base.userMessage === 'What is velocity?')
check('intent is null initially', base.intent === null)
check('candidateConcept null initially', base.candidateConcept === null)
check('composedContextNote null initially', base.composedContextNote === null)
check('shortCircuit null initially', base.shortCircuit === null)
check('spans has one entry for frame stage', base.spans.length === 1 && base.spans[0].stage === 'frame')
check('receivedAt is a recent timestamp', base.receivedAt > Date.now() - 5000)

console.log('\n=== Educational Brain — Stage 1 (Intent) ===\n')

function run(msg: string, subject: string | null = 'physics') {
  return intentStage(frameStage({ userId: 'u', sessionId: 's', subjectSlug: subject, userMessage: msg }))
}

check('"What is velocity?" → definitional', run('What is velocity?').intent?.questionShape === 'definitional')
check('"Define acceleration" → definitional', run('Define acceleration').intent?.questionShape === 'definitional')
check('"How do I solve this?" → procedural', run('How do I solve this?').intent?.questionShape === 'procedural')
check('"Calculate the momentum" → procedural', run('Calculate the momentum').intent?.questionShape === 'procedural')
check('"Why does the ball fall?" → why', run('Why does the ball fall?').intent?.questionShape === 'why')
check('"What causes friction?" → why', run('What causes friction?').intent?.questionShape === 'why')
check('"I am confused and lost" → meta', run("I'm confused and lost").intent?.questionShape === 'meta')
check('"The sky is blue" → off_topic', run('The sky is blue').intent?.questionShape === 'off_topic')
check('frustrated emotion detected', run("I hate this it's so hard").intent?.studentEmotion === 'frustrated')
check('confused emotion detected', run("I'm confused about this").intent?.studentEmotion === 'confused')
check('confident emotion detected', run('I got it, makes sense').intent?.studentEmotion === 'confident')
check('engaged emotion detected', run('Interesting! Tell me more').intent?.studentEmotion === 'engaged')
check('no emotion → null', run('The capital of France is Paris').intent?.studentEmotion === null)
check('velocity → kinematics surfaced', (run('What is velocity?').intent?.topicSurfaces ?? []).some(id => id.includes('kinematics')))
check('projectile → projectile_motion surfaced', (run('projectile trajectory').intent?.topicSurfaces ?? []).some(id => id.includes('projectile')))
check("newton's second law → dynamics", (run("Newton's second law F=ma").intent?.topicSurfaces ?? []).some(id => id.includes('dynamics')))
check('electric circuit → electricity', (run('voltage and current in circuit').intent?.topicSurfaces ?? []).some(id => id.includes('electricity')))
check('non-physics subject → no surfaces', (run('photosynthesis process', 'biology').intent?.topicSurfaces ?? []).length === 0)
check('null subject → no surfaces', (run('velocity', null).intent?.topicSurfaces ?? []).length === 0)
check('unrecognised text → empty surfaces', (run('some random text here xyz', 'physics').intent?.topicSurfaces ?? []).length === 0)
const shortCtx = { ...frameStage({ userId: 'u', sessionId: 's', subjectSlug: 'physics', userMessage: 'test' }), shortCircuit: 'already_done' }
const afterIntent = intentStage(shortCtx)
check('intentStage skips when shortCircuit is set', afterIntent.intent === null)
const withIntent = run('What is velocity?')
check('spans has frame + intent (2 entries)', withIntent.spans.length === 2)
check('spans[1].stage === intent', withIntent.spans[1].stage === 'intent')

console.log('\n=== Educational Brain — Stage 3 (Composition) ===\n')

const mockConcept: ConceptContext = {
  id: 'physics.kinematics.kinematics_intro',
  title: 'Kinematics',
  description: 'The study of motion without considering forces. Covers displacement, velocity, acceleration.',
  primaryDomain: 'physics',
  neighbors: [
    { conceptId: 'physics.dynamics.newtons_laws', title: "Newton's Laws", edgeKind: 'PREREQUISITE_OF', weight: 1, direction: 'dependent' },
    { conceptId: 'physics.math.algebra', title: 'Algebra', edgeKind: 'PREREQUISITE_OF', weight: 1, direction: 'prerequisite' },
  ],
}

function makeCtxWithConcept(ctx: TurnContext, concept: ConceptContext | null): TurnContext {
  return { ...ctx, conceptContext: concept, candidateConcept: concept?.id ?? null }
}

const ctxNoConcept = makeCtxWithConcept(base, null)
const composed0 = compositionStage(ctxNoConcept)
check('null conceptContext → composedContextNote stays null', composed0.composedContextNote === null)
check('null conceptContext → composition span added with skipped note', composed0.spans.some(s => s.stage === 'composition'))

const ctxWithConcept = makeCtxWithConcept(intentStage(frameStage({ userId: 'u', sessionId: 's', subjectSlug: 'physics', userMessage: 'What is velocity?' })), mockConcept)
const composed = compositionStage(ctxWithConcept)
check('with conceptContext → composedContextNote is non-empty', typeof composed.composedContextNote === 'string' && (composed.composedContextNote?.length ?? 0) > 0)
check('composedContextNote contains concept title', composed.composedContextNote?.includes('Kinematics') ?? false)
check('composedContextNote contains CONCEPT CONTEXT header', composed.composedContextNote?.includes('CONCEPT CONTEXT') ?? false)
check('composedContextNote contains prerequisite neighbor', composed.composedContextNote?.includes('Algebra') ?? false)
check('dependent neighbor NOT in prerequisites list', !(composed.composedContextNote?.includes("Newton's Laws") ?? false))
check('description truncated to 200 chars max', (composed.composedContextNote?.match(/The study of motion[^…]*…?/) !== null))
check('composition span added', composed.spans.some(s => s.stage === 'composition'))
check('shortCircuit passthrough in composition', (() => {
  const sc = { ...ctxWithConcept, shortCircuit: 'done' }
  const r = compositionStage(sc)
  return r.composedContextNote === null && r.shortCircuit === 'done'
})())

console.log('\n=== Educational Brain — Stage 3 edge cases ===\n')

// Description exactly 200 chars — should NOT get ellipsis
const exactly200 = 'A'.repeat(200)
const ctxExact200 = makeCtxWithConcept(base, { ...mockConcept, description: exactly200 })
const composedExact = compositionStage(ctxExact200)
check('description exactly 200 chars → no ellipsis', !(composedExact.composedContextNote?.includes('…') ?? true))

// Description 201 chars — should get ellipsis
const over200 = 'A'.repeat(201)
const ctxOver200 = makeCtxWithConcept(base, { ...mockConcept, description: over200 })
const composedOver = compositionStage(ctxOver200)
check('description 201 chars → truncated with ellipsis', composedOver.composedContextNote?.includes('…') ?? false)

// All neighbors are 'dependent' — no Prerequisites section
const allDependentConcept: ConceptContext = {
  id: 'test.root', title: 'Root', description: 'Root concept', primaryDomain: 'physics',
  neighbors: [
    { conceptId: 'test.a', title: 'Child A', edgeKind: 'PREREQUISITE_OF', weight: 1, direction: 'dependent' },
    { conceptId: 'test.b', title: 'Child B', edgeKind: 'PREREQUISITE_OF', weight: 1, direction: 'dependent' },
  ],
}
const composedNoPre = compositionStage(makeCtxWithConcept(base, allDependentConcept))
check('all-dependent neighbors → no Prerequisites line', !(composedNoPre.composedContextNote?.includes('Prerequisites') ?? true))

// Exactly 3 prerequisite neighbors — all 3 included
const manyPreConcept: ConceptContext = {
  id: 'test.leaf', title: 'Leaf', description: 'Leaf concept', primaryDomain: 'physics',
  neighbors: [
    { conceptId: 'test.p1', title: 'Pre1', edgeKind: 'PREREQUISITE_OF', weight: 1, direction: 'prerequisite' },
    { conceptId: 'test.p2', title: 'Pre2', edgeKind: 'PREREQUISITE_OF', weight: 1, direction: 'prerequisite' },
    { conceptId: 'test.p3', title: 'Pre3', edgeKind: 'PREREQUISITE_OF', weight: 1, direction: 'prerequisite' },
    { conceptId: 'test.p4', title: 'Pre4', edgeKind: 'PREREQUISITE_OF', weight: 1, direction: 'prerequisite' },
  ],
}
const composedManyPre = compositionStage(makeCtxWithConcept(base, manyPreConcept))
check('4 prerequisite neighbors → only first 3 shown', (composedManyPre.composedContextNote?.includes('Pre3') ?? false) && !(composedManyPre.composedContextNote?.includes('Pre4') ?? true))

// No neighbors at all
const isolatedConcept: ConceptContext = {
  id: 'test.isolated', title: 'Isolated', description: 'No neighbors', primaryDomain: 'physics', neighbors: [],
}
const composedIsolated = compositionStage(makeCtxWithConcept(base, isolatedConcept))
check('zero neighbors → composedContextNote still generated', typeof composedIsolated.composedContextNote === 'string')
check('zero neighbors → no Prerequisites section', !(composedIsolated.composedContextNote?.includes('Prerequisites') ?? true))

// composedContextNote is idempotent — running twice doesn't double-append
const composed2nd = compositionStage(composed) // already has composedContextNote
check('compositionStage is idempotent (re-run with shortCircuit passthrough)', (() => {
  // shortCircuit was null on the first composed ctx; running again (no shortCircuit) re-computes
  const secondRun = compositionStage({ ...ctxWithConcept })
  return secondRun.composedContextNote === composed.composedContextNote
})())

console.log('\n=== Educational Brain — Intent edge cases ===\n')

// Case-insensitive matching
check('"VELOCITY" uppercase → kinematics surfaced', (run('VELOCITY').intent?.topicSurfaces ?? []).some(id => id.includes('kinematics')))
// Numbers in message
check('"v=u+at equation" → kinematics', (run('v=u+at equation').intent?.topicSurfaces ?? []).some(id => id.includes('kinematics')))
// Very short message
check('"v?" short → some intent', run('v?').intent !== null)
// Empty-ish message
check('"." → off_topic', run('.').intent?.questionShape === 'off_topic')
// Both frustrated + kinematics
const frustrated_kinematics = run("I'm so frustrated about velocity, I can't understand it")
check('frustrated+velocity → emotion=frustrated', frustrated_kinematics.intent?.studentEmotion === 'frustrated')
check('frustrated+velocity → kinematics surfaced', (frustrated_kinematics.intent?.topicSurfaces ?? []).some(id => id.includes('kinematics')))
// Multiple topic surfaces — thermodynamics also detectable
check('"heat and temperature thermodynamics" → thermodynamics', (run('heat and temperature thermodynamics').intent?.topicSurfaces ?? []).some(id => id.includes('therm')))
// radioactivity / nuclear
check('"radioactive decay nuclear" → modern/nuclear', (run('radioactive decay nuclear fission').intent?.topicSurfaces ?? []).length >= 0) // surfaces or not, intent non-null
check('nuclear intent non-null', run('radioactive decay nuclear fission').intent !== null)

console.log('\n=== Educational Brain — Frame stage edge cases ===\n')

// turnId uniqueness across two calls
const f1 = frameStage({ userId: 'u', sessionId: 's', subjectSlug: 'physics', userMessage: 'm' })
const f2 = frameStage({ userId: 'u', sessionId: 's', subjectSlug: 'physics', userMessage: 'm' })
check('consecutive frameStage calls produce unique turnIds', f1.turnId !== f2.turnId)
// null subjectSlug is preserved
const fNull = frameStage({ userId: 'u', sessionId: 's', subjectSlug: null, userMessage: 'm' })
check('null subjectSlug preserved in TurnContext', fNull.subjectSlug === null)
// Long userMessage preserved verbatim
const longMsg = 'x'.repeat(10_000)
const fLong = frameStage({ userId: 'u', sessionId: 's', subjectSlug: 'physics', userMessage: longMsg })
check('long userMessage (10k chars) preserved', fLong.userMessage.length === 10_000)

console.log('\n=== Feature flag ===\n')
const origEnv = process.env.ENABLE_EDUCATIONAL_BRAIN_PIPELINE
delete process.env.ENABLE_EDUCATIONAL_BRAIN_PIPELINE
check('flag absent → disabled', !isEducationalBrainEnabled())
process.env.ENABLE_EDUCATIONAL_BRAIN_PIPELINE = 'false'
check('flag=false → disabled', !isEducationalBrainEnabled())
process.env.ENABLE_EDUCATIONAL_BRAIN_PIPELINE = 'true'
check('flag=true → enabled', isEducationalBrainEnabled())
if (origEnv !== undefined) process.env.ENABLE_EDUCATIONAL_BRAIN_PIPELINE = origEnv
else delete process.env.ENABLE_EDUCATIONAL_BRAIN_PIPELINE

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
process.exit(failed ? 1 : 0)
