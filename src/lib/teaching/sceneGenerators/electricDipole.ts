/**
 * Electric dipole in a field scene generator, closing the "electric dipole /
 * torque + equilibrium" visual gap for phys.em.electric-dipole (previously
 * unmapped — see visualRegistry.ts, "P0 audit: 21 phys.em concepts are
 * electrostatics/magnetism, NOT circuits"). Shows two equal-and-opposite
 * charges, the dipole moment p = qd, an electric field E (uniform or
 * non-uniform), the forces on each charge, and the torque τ = pE sinθ, with
 * the stable/unstable equilibria at θ = 0°/180° readable directly off the
 * figure. Same architecture as the other generators: extractDipoleParams
 * (LLM, isolated) → validateDipoleParams (pure) → buildDipoleScene (pure,
 * deterministic layout) → checkDipoleConsistency (pure, independent
 * re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./electricDipole.pure`, and is re-exported here so
 * every existing importer — the router, the tests — sees one public module.
 * The split exists because the learner varies q, d, E and θ with sliders,
 * which means the BROWSER re-runs `buildDipoleScene`; this module reaches
 * `@/lib/ai/client` and through it the provider router, the AI budget and the
 * rate limiter, none of which may be bundled for a browser.
 */

import { generateJSON } from '@/lib/ai/client'
import { validateDipoleParams, type DipoleParams } from './electricDipole.pure'

export {
  validateDipoleParams,
  buildDipoleScene,
  checkDipoleConsistency,
  formatSci,
  type DipoleParams,
  type FieldKind,
} from './electricDipole.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the electric-dipole-in-a-field scenario being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isDipole": true|false, "chargeMagnitude": <number>, "separation": <number>, "fieldStrength": <number>, "angleDeg": <number>, "fieldType": "uniform"|"non_uniform"}
- isDipole is false if the text is not about an electric dipole (two equal and opposite charges) in an electric field.
- chargeMagnitude (nanocoulombs, the magnitude of EACH charge), separation (centimeters, distance between the two charges), fieldStrength (newtons per coulomb).
- angleDeg (degrees between the dipole moment p and the field E, 0-180; use 90 if the text says "perpendicular", 0 if "aligned", 180 if "anti-aligned" or "opposite").
- fieldType is "non_uniform" only if the text explicitly says the field varies with position (e.g. "non-uniform field", "field gets stronger", "field gradient"); otherwise "uniform".
- Do not invent values not stated in the text.`
}

/** Extract validated dipole parameters from text via the LLM, or null. Never throws. */
export async function extractDipoleParams(text: string): Promise<DipoleParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 200).catch(() => null)
  if (!raw || raw.isDipole !== true) return null
  return validateDipoleParams(raw)
}
