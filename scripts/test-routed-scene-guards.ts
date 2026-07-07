/**
 * Network-independent guard tests for the routed scene-generation WIRING
 * (src/lib/teaching/sceneGenerators/sceneRouter.ts) as integrated into the chat
 * route. These lock in the deterministic guarantees verified by code audit:
 *
 *   1. generateRoutedScene() returns null for non-routing / empty / whitespace
 *      text WITHOUT making any LLM call (routeSceneGenerator short-circuits to
 *      null before extract() is ever reached).
 *   2. isParametricSceneGenerationEnabled() reads ONLY
 *      ENABLE_PARAMETRIC_SCENE_GENERATION === 'true' and never the old
 *      ENABLE_AI_SCENE_GENERATION flag.
 *
 * No Groq is exercised here on purpose: every case below is one where routing
 * returns null first, so the extraction LLM call is never made. This is exactly
 * the behavior that must hold when Groq is unreachable.
 *
 * Run with:  npx tsx scripts/test-routed-scene-guards.ts
 */

import {
  generateRoutedScene,
  isParametricSceneGenerationEnabled,
} from '../src/lib/teaching/sceneGenerators/sceneRouter'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

async function main() {
  console.log('\n=== routed scene-generation guard harness (no network) ===\n')

  // ── 1. Non-routing text returns null with no LLM call (deterministic) ──────
  for (const text of [
    'Compare the causes of the 1857 revolt and its aftermath.',
    'Identify the verb in each of these two sentences.',
    'Measure the angle with a protractor.',
    '',
    '   ',
  ]) {
    const result = await generateRoutedScene(text)
    check(`non-routing text → null (no network): ${JSON.stringify(text.slice(0, 30))}`, result === null,
      `got ${result === null ? 'null' : 'a scene'}`)
  }

  // ── 2. Flag reads ONLY the parametric env var, never the old one ───────────
  const savedParam = process.env.ENABLE_PARAMETRIC_SCENE_GENERATION
  const savedAi = process.env.ENABLE_AI_SCENE_GENERATION
  try {
    delete process.env.ENABLE_PARAMETRIC_SCENE_GENERATION
    delete process.env.ENABLE_AI_SCENE_GENERATION
    check('flag false when unset', isParametricSceneGenerationEnabled() === false)

    process.env.ENABLE_AI_SCENE_GENERATION = 'true'
    check('old ENABLE_AI_SCENE_GENERATION=true does NOT enable parametric path',
      isParametricSceneGenerationEnabled() === false)

    process.env.ENABLE_PARAMETRIC_SCENE_GENERATION = 'true'
    check('ENABLE_PARAMETRIC_SCENE_GENERATION=true enables it', isParametricSceneGenerationEnabled() === true)

    process.env.ENABLE_PARAMETRIC_SCENE_GENERATION = 'yes'
    check('only the exact string "true" enables it (not "yes")', isParametricSceneGenerationEnabled() === false)
  } finally {
    if (savedParam === undefined) delete process.env.ENABLE_PARAMETRIC_SCENE_GENERATION
    else process.env.ENABLE_PARAMETRIC_SCENE_GENERATION = savedParam
    if (savedAi === undefined) delete process.env.ENABLE_AI_SCENE_GENERATION
    else process.env.ENABLE_AI_SCENE_GENERATION = savedAi
  }

  console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
  process.exit(fail === 0 ? 0 : 1)
}

main()
