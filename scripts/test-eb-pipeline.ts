/**
 * Offline harness for Educational Brain stages 0–2 (Frame + Intent deterministic).
 * Stage 2 (Retrieval) requires DB — tested only for the no-topic-surfaces skip path.
 * Run with:  npx tsx scripts/test-eb-pipeline.ts
 */
import { frameStage } from '../src/lib/educationalBrain/frameStage'
import { intentStage } from '../src/lib/educationalBrain/intentStage'
import { isEducationalBrainEnabled } from '../src/lib/educationalBrain/pipeline'

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
check('shortCircuit null initially', base.shortCircuit === null)
check('spans has one entry for frame stage', base.spans.length === 1 && base.spans[0].stage === 'frame')
check('receivedAt is a recent timestamp', base.receivedAt > Date.now() - 5000)

console.log('\n=== Educational Brain — Stage 1 (Intent) — questionShape ===\n')

function run(msg: string, subject: string | null = 'physics') {
  return intentStage(frameStage({ userId: 'u', sessionId: 's', subjectSlug: subject, userMessage: msg }))
}

// questionShape
check('"What is velocity?" → definitional', run('What is velocity?').intent?.questionShape === 'definitional')
check('"Define acceleration" → definitional', run('Define acceleration').intent?.questionShape === 'definitional')
check('"How do I solve this?" → procedural', run('How do I solve this?').intent?.questionShape === 'procedural')
check('"Calculate the momentum" → procedural', run('Calculate the momentum').intent?.questionShape === 'procedural')
check('"Why does the ball fall?" → why', run('Why does the ball fall?').intent?.questionShape === 'why')
check('"What causes friction?" → why', run('What causes friction?').intent?.questionShape === 'why')
check('"I am confused and lost" → meta', run("I'm confused and lost").intent?.questionShape === 'meta')
check('"The sky is blue" → off_topic', run('The sky is blue').intent?.questionShape === 'off_topic')

console.log('\n── studentEmotion ──\n')
check('frustrated emotion detected', run("I hate this it's so hard").intent?.studentEmotion === 'frustrated')
check('confused emotion detected', run("I'm confused about this").intent?.studentEmotion === 'confused')
check('confident emotion detected', run('I got it, makes sense').intent?.studentEmotion === 'confident')
check('engaged emotion detected', run('Interesting! Tell me more').intent?.studentEmotion === 'engaged')
check('no emotion → null', run('The capital of France is Paris').intent?.studentEmotion === null)

console.log('\n── topicSurfaces (physics) ──\n')
check('velocity → kinematics concept surfaced', (run('What is velocity?').intent?.topicSurfaces ?? []).some(id => id.includes('kinematics')))
check('projectile → projectile_motion surfaced', (run('projectile trajectory').intent?.topicSurfaces ?? []).some(id => id.includes('projectile')))
check("newton's second law → dynamics", (run("Newton's second law F=ma").intent?.topicSurfaces ?? []).some(id => id.includes('dynamics')))
check('electric circuit → electricity', (run('voltage and current in circuit').intent?.topicSurfaces ?? []).some(id => id.includes('electricity')))
check('non-physics subject → no surfaces', (run('photosynthesis process', 'biology').intent?.topicSurfaces ?? []).length === 0)
check('null subject → no surfaces', (run('velocity', null).intent?.topicSurfaces ?? []).length === 0)
check('unrecognised physics text → empty surfaces', (run('some random text here xyz', 'physics').intent?.topicSurfaces ?? []).length === 0)

console.log('\n── shortCircuit passthrough ──\n')
const shortCtx = { ...frameStage({ userId: 'u', sessionId: 's', subjectSlug: 'physics', userMessage: 'test' }), shortCircuit: 'already_done' }
const afterIntent = intentStage(shortCtx)
check('intentStage skips when shortCircuit is set', afterIntent.intent === null && afterIntent.shortCircuit === 'already_done')

console.log('\n── spans accumulate ──\n')
const withIntent = run('What is velocity?')
check('spans has frame + intent (2 entries)', withIntent.spans.length === 2)
check('spans[1].stage === intent', withIntent.spans[1].stage === 'intent')

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
