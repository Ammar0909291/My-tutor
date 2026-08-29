/**
 * Part 2 (option C) — 1D momentum / collision scene generator. 9TH type.
 *
 * SCOPE (approved): 1D (single line) only. 2D oblique/glancing collisions are
 * DEFERRED — they need an additional impact angle/parameter and a meaningfully
 * larger geometry problem, same deferral pattern already used for SHM-as-graph
 * and free-body diagrams (see sceneRouter.ts). Do not extend this module to 2D
 * without a deliberate scope decision.
 *
 * Two collision types ship together (one module, one routed generator, a
 * `collisionType` field) since they share the same build geometry — two carts
 * approaching, colliding, then moving apart/together:
 *  - perfectly_inelastic: objects stick together, single final velocity,
 *    v_f = (m1*u1 + m2*u2) / (m1 + m2). Simplest case — one conservation
 *    equation, one unknown. The standard intro worked example.
 *  - elastic: two unknowns (v1f, v2f), solved by the standard closed-form 1D
 *    elastic-collision formulas (both momentum AND kinetic energy conserved).
 *    These are the SAME formulas already implemented and validated in
 *    src/components/school/visuals/MomentumCollisionInteractive3D.tsx's
 *    elasticCollision(), reused here as a correctness cross-reference.
 *
 * General inelastic (coefficient of restitution e, neither sticking nor fully
 * elastic) is deliberately OUT OF SCOPE — it adds a free parameter that doesn't
 * fit the "LLM extracts simple stated numbers" pattern cleanly.
 *
 * LLM extracts ONLY: m1, m2, u1, u2 (signed, along the 1D line), collisionType.
 * Code computes: final velocities (formulas above) and all positions/timing —
 * never LLM-generated.
 *
 * Independent-derivation checker: re-derives total momentum AND (for elastic)
 * total kinetic energy from the DRAWN before/after velocities — a different
 * computation path than the one that produced v_f / v1f / v2f.
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. Pure-formula
 * parts are Groq-free and unit-tested; only extractCollisionParams() calls the LLM.
 *
 * THE PURE HALF LIVES IN `./momentumCollision.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { CollisionParams, validateCollisionParams } from './momentumCollision.pure'

export * from './momentumCollision.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the 1D collision being described, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isCollision": true|false, "m1": <number>, "m2": <number>, "u1": <number, signed velocity of object 1>, "u2": <number, signed velocity of object 2>, "collisionType": "perfectly_inelastic" | "elastic"}
- isCollision is false if the text is not about a 1D collision between two objects.
- Use "perfectly_inelastic" if the objects stick together / combine / move as one after colliding.
- Use "elastic" if the text says "elastic collision" or the objects bounce off each other.
- If the collision type is not stated or ambiguous, use "perfectly_inelastic".
- Use the masses and velocities actually stated; do not invent numbers. Object 1 should be the one moving toward object 2 from behind (assign signs so object 1 starts left, object 2 starts right, on the same line).
- Sign convention: use u1 > u2 always (object 1 moves in the positive direction, or is the faster of the two). If the text describes object 2 moving in the opposite direction to object 1, give u2 a negative value. Never assign a negative value to u1 unless both objects move in the negative direction.`
}

/**
 * Extract validated collision parameters from text via the LLM, or null. Never throws.
 */
export async function extractCollisionParams(text: string): Promise<CollisionParams | null> {
  if (!text || !text.trim()) return null
  let raw: any
  try {
    raw = await generateJSON(buildExtractionPrompt(text), 150)
  } catch (err) {
    // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
    console.error('[extractCollisionParams DEBUG] generateJSON threw:', err)
    return null
  }
  console.error('[extractCollisionParams DEBUG] raw from generateJSON:', JSON.stringify(raw))
  if (!raw || raw.isCollision !== true) {
    console.error('[extractCollisionParams DEBUG] -> null: raw falsy or isCollision !== true (got', JSON.stringify(raw?.isCollision), ')')
    return null
  }
  const validated = validateCollisionParams(raw)
  if (!validated) console.error('[extractCollisionParams DEBUG] -> null: validateCollisionParams rejected raw:', JSON.stringify(raw))
  return validated
}
