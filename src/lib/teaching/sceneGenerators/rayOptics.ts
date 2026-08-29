/**
 * Ray optics scene generator (10th parametric generator).
 *
 * Covers mirror/lens image formation under the New Cartesian Sign Convention
 * (standard NCERT/CBSE physics convention): object distance is always negative
 * (object lies on the incident side); a concave mirror or concave (diverging)
 * lens has a negative focal length; a convex mirror or convex (converging)
 * lens has a positive focal length.
 *   Mirror formula: 1/f = 1/v + 1/u        Mirror magnification: m = -v/u
 *   Lens formula:   1/f = 1/v - 1/u        Lens magnification:   m = v/u
 * Image nature/orientation is read off the sign of v (real/virtual) and m
 * (erect/inverted) — mirrors and lenses map v's sign to real/virtual
 * OPPOSITELY because of the convention's differing positive-direction
 * definition for reflection vs. transmission:
 *   mirror: v < 0 → real (in front, same side as object)
 *   lens:   v > 0 → real (opposite side, where light actually converges)
 *
 * Same architecture as the other 9 generators: extractRayOpticsParams (LLM,
 * isolated) → validateRayOpticsParams (pure) → buildRayOpticsScene (pure,
 * deterministic geometry) → checkRayOpticsConsistency (pure, independent
 * re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./rayOptics.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { RayOpticsParams, validateRayOpticsParams } from './rayOptics.pure'

export * from './rayOptics.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the mirror/lens image-formation problem being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isRayOptics": true|false, "opticsType": "concave_mirror"|"convex_mirror"|"convex_lens"|"concave_lens", "objectDistance": <positive number, cm>, "focalLength": <positive number, cm>, "objectHeight": <positive number, cm>}
- isRayOptics is false if the text is not about a specific mirror/lens forming an image of an object.
- objectDistance and focalLength are magnitudes only (always positive) — do not include signs.
- objectHeight defaults to 2 if not stated.
- Do not invent values; use only what the text actually states for distance/focal length.`
}

/**
 * Extract validated ray-optics parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractRayOpticsParams(text: string): Promise<RayOpticsParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 200).catch(() => null)
  if (!raw || raw.isRayOptics !== true) return null
  return validateRayOpticsParams(raw)
}
