/**
 * Offline guard for the AI-scene-generation feature flag. Confirms the
 * network-independent short-circuits in generateSceneSpec: when the flag is OFF
 * (default) or the text is empty, it returns null WITHOUT ever calling the LLM.
 * Does NOT test real generation (needs a Groq-reachable network + flag on).
 * Run with:  npx tsx scripts/test-generate-scenespec-flag.ts
 */

import { generateSceneSpec, isAiSceneGenerationEnabled } from '../src/lib/teaching/generateSceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}`)
}

async function main() {
  console.log('\n=== generateSceneSpec flag-gate harness ===\n')

  // Default: flag unset → disabled.
  delete process.env.ENABLE_AI_SCENE_GENERATION
  check('flag defaults OFF when env unset', isAiSceneGenerationEnabled() === false)
  check('flag OFF → generateSceneSpec returns null (no LLM call)', (await generateSceneSpec('a triangle has three angles summing to 180')) === null)

  // Explicit non-"true" values stay off.
  process.env.ENABLE_AI_SCENE_GENERATION = '1'
  check('flag "1" (not "true") stays OFF', isAiSceneGenerationEnabled() === false)
  process.env.ENABLE_AI_SCENE_GENERATION = 'false'
  check('flag "false" stays OFF', isAiSceneGenerationEnabled() === false)

  // Flag ON but empty text → null short-circuit before any LLM call.
  process.env.ENABLE_AI_SCENE_GENERATION = 'true'
  check('flag "true" reads as ON', isAiSceneGenerationEnabled() === true)
  check('flag ON + empty text → null (no LLM call)', (await generateSceneSpec('   ')) === null)

  // Reset so we don't leak state.
  delete process.env.ENABLE_AI_SCENE_GENERATION

  console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
  process.exit(fail === 0 ? 0 : 1)
}

main()
