/**
 * Kinematics graphs scene generator (15th parametric generator) — closes the
 * "Kinematics graphs (x-t, v-t, a-t)" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Plots position-time, velocity-time,
 * and acceleration-time graphs for uniformly accelerated motion from the
 * standard kinematic equations (x = x0 + u*t + 1/2*a*t^2, v = u + a*t,
 * a = constant). Same architecture as the other generators:
 * extractKinematicsParams (LLM, isolated) → validateKinematicsParams (pure) →
 * buildKinematicsGraphScene (pure, deterministic sampling) →
 * checkKinematicsConsistency (pure, independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./kinematicsGraphs.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { KinematicsParams, constant, validateKinematicsParams } from './kinematicsGraphs.pure'

export * from './kinematicsGraphs.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the uniformly-accelerated-motion kinematics scenario being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isKinematicsGraph": true|false, "initialVelocity": <number>, "acceleration": <number>, "duration": <number>, "initialPosition": <number>}
- isKinematicsGraph is false if the text is not about plotting position/velocity/acceleration vs. time for constant-acceleration motion.
- initialVelocity (m/s), acceleration (m/s^2, signed — negative for deceleration), duration (seconds, the time window to plot, must be > 0), initialPosition (m, default 0 if unstated).
- Do not invent values not stated in the text; use sensible defaults only if truly unstated (e.g. initialPosition: 0, duration: a reasonable window such as 10).`
}

/**
 * Extract validated kinematics-graph parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractKinematicsParams(text: string): Promise<KinematicsParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 250).catch(() => null)
  if (!raw || raw.isKinematicsGraph !== true) return null
  return validateKinematicsParams(raw)
}
