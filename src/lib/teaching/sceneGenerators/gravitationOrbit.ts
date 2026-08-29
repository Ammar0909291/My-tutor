/**
 * Gravitation / orbital motion scene generator (21st parametric generator),
 * closing the "Gravitation (orbits, escape velocity)" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Extends the uniform-circular-motion
 * pattern (circularMotion.ts) to a satellite in circular orbit around a
 * central mass: the LLM extracts only the central mass and orbit radius;
 * code derives orbital speed (v = sqrt(GM/r)), orbital period
 * (T = 2πr/v), and escape velocity (v_esc = sqrt(2GM/r) = v·√2) — correct
 * by construction. Same architecture as the other generators:
 * extractGravitationParams (LLM, isolated) → validateGravitationParams
 * (pure) → buildGravitationOrbitScene (pure, deterministic layout) →
 * checkGravitationConsistency (pure, independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./gravitationOrbit.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { GravitationParams, validateGravitationParams } from './gravitationOrbit.pure'

export * from './gravitationOrbit.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the orbital-motion / gravitation scenario being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isGravitationOrbit": true|false, "centralMass": <number, kg>, "orbitRadius": <number, meters>}
- isGravitationOrbit is false if the text is not about a satellite/planet/moon orbiting a central body under gravity.
- centralMass is the mass of the body being orbited (e.g. Earth ≈ 5.97e24 kg), orbitRadius is the orbit's radius from the centre of that body.
- Use the values actually stated in the text; do not invent numbers (use well-known constants like Earth's mass only if the text names Earth and gives no other value).`
}

/**
 * Extract validated gravitation-orbit parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractGravitationParams(text: string): Promise<GravitationParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 200).catch(() => null)
  if (!raw || raw.isGravitationOrbit !== true) return null
  return validateGravitationParams(raw)
}
