/**
 * Part 2 (option C) — projectile-motion scene generator. FIRST scene type.
 *
 * DESIGN (evidence-driven): tonight's feasibility probe showed the free-form
 * generator (generateSceneSpec.ts) produces confident-but-WRONG geometry on
 * easy cases — including a NON-parabolic projectile trajectory. This module
 * takes the opposite approach: the LLM is NEVER asked to produce coordinates.
 * It only EXTRACTS parameters (launch angle, speed) from the explanation text;
 * the trajectory itself is computed here by the real kinematics formula, so it
 * is parabolic BY CONSTRUCTION.
 *
 * This is a NEW, separate code path. It does NOT touch, import, or re-enable the
 * old free-form generateSceneSpec.ts, and is not wired into production yet.
 *
 * Pure-formula parts (buildProjectileScene, checkProjectileConsistency) need no
 * network and are fully unit-testable. Only extractProjectileParams() calls the
 * LLM (Groq) and must be verified live later — it is clearly isolated below.
 *
 * THE PURE HALF LIVES IN `./projectileMotion.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { ProjectileParams, validateProjectileParams } from './projectileMotion.pure'

export * from './projectileMotion.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────
//
// This is the ONLY part that calls the model, and the ONLY part that needs a
// live network test. It asks the LLM purely to READ values out of the text — a
// comprehension task the probe showed it does well — never to compute geometry.

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the projectile-motion launch parameters, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isProjectile": true|false, "angleDegrees": <number 0-90>, "speed": <number, m/s>}
- isProjectile is false if the text is not describing a projectile/launch/throw with an angle and speed.
- If a value is not explicitly stated, make your best single numeric estimate from the text; do not invent a launch that isn't there.`
}

/**
 * Extract validated projectile parameters from text via the LLM, or null.
 * Returns null when the text isn't projectile motion, the call fails, or the
 * extracted values are physically implausible. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractProjectileParams(text: string): Promise<ProjectileParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch((err) => {
    // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
    console.error('[extractProjectileParams DEBUG] generateJSON threw:', err)
    return null
  })
  console.error('[extractProjectileParams DEBUG] raw from generateJSON:', JSON.stringify(raw))
  if (!raw || raw.isProjectile !== true) {
    console.error('[extractProjectileParams DEBUG] -> null: raw falsy or isProjectile !== true (got', JSON.stringify(raw?.isProjectile), ')')
    return null
  }
  const validated = validateProjectileParams(raw)
  if (!validated) console.error('[extractProjectileParams DEBUG] -> null: validateProjectileParams rejected raw:', JSON.stringify(raw))
  return validated
}
