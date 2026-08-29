/**
 * Rotational motion / torque diagram scene generator (20th parametric
 * generator), closing the "Rotational motion / torque diagrams" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Shows a lever arm pivoted at one end
 * with a force applied at the other end at a given angle to the arm, and
 * derives the torque magnitude (τ = r·F·sin θ) and rotational sense
 * (clockwise / counter-clockwise) from the geometry. Same architecture as
 * the other generators: extractTorqueParams (LLM, isolated) →
 * validateTorqueParams (pure) → buildTorqueScene (pure, deterministic
 * layout) → checkTorqueConsistency (pure, independent re-derivation safety
 * net).
 *
 * THE PURE HALF NOW LIVES IN `./torqueDiagram.pure`, and is re-exported here
 * so every existing importer — the router, the harness script, the tests —
 * is unchanged. The split exists because the learner can now vary r, F and θ
 * with sliders, which means the BROWSER re-runs `buildTorqueScene`; this
 * module reaches `@/lib/ai/client` and through it the provider router, the AI
 * budget and the rate limiter, none of which may be bundled for a browser.
 */

import { generateJSON } from '@/lib/ai/client'
import { validateTorqueParams, type TorqueParams } from './torqueDiagram.pure'

export {
  validateTorqueParams,
  buildTorqueScene,
  checkTorqueConsistency,
  type TorqueParams,
} from './torqueDiagram.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the lever-arm/torque scenario being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isTorque": true|false, "leverLength": <number>, "force": <number>, "angleDeg": <number>}
- isTorque is false if the text is not about torque from a force applied to a lever arm/wrench/rod about a pivot.
- leverLength (meters, the distance from the pivot to where the force is applied), force (newtons), angleDeg (degrees between the force and the lever arm, 0-180; use 90 if the text says "perpendicular").
- Do not invent values not stated in the text.`
}

/**
 * Extract validated torque parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractTorqueParams(text: string): Promise<TorqueParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 200).catch(() => null)
  if (!raw || raw.isTorque !== true) return null
  return validateTorqueParams(raw)
}
