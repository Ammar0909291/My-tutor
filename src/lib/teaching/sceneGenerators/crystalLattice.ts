/**
 * Part 2 (option C) — crystal lattice (cubic unit cell) scene generator. 8TH type.
 *
 * Data-driven like electron shells: the three cubic Bravais unit cells (simple,
 * body-centred, face-centred) are textbook-fixed geometries. The LLM only
 * EXTRACTS which lattice type is meant; code places the atoms at the exact
 * fractional positions, correct by construction.
 *
 * SCOPE: the three CUBIC unit cells only (simple cubic, BCC, FCC). Other Bravais
 * lattices (tetragonal, hexagonal, etc.) and compound lattices (rock-salt NaCl,
 * etc.) are deliberately out of scope — they need their own curated data and a
 * scope decision, not a quick add.
 *
 * Independent-derivation checker: the scene is BUILT from a position table; the
 * checker re-derives the EFFECTIVE atoms-per-unit-cell from the drawn positions
 * using the corner/face/body SHARING RULE (corner=1/8, face=1/2, body=1), which
 * must equal the known value (SC=1, BCC=2, FCC=4) — a different derivation than
 * the raw count.
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. Pure-data parts
 * are Groq-free and unit-tested; only extractLattice() calls the LLM.
 *
 * THE PURE HALF LIVES IN `./crystalLattice.pure` and is re-exported below, so every
 * importer of this module is unchanged.
 */

import { generateJSON } from '@/lib/ai/client'

import { LatticeDef, lookupLattice } from './crystalLattice.pure'

export * from './crystalLattice.pure'

// ── LLM lattice extraction (NEEDS A LIVE GROQ TEST — isolated) ────────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and identify which cubic crystal unit cell it describes, if any.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isLattice": true|false, "lattice": "simple cubic" | "body-centered cubic" | "face-centered cubic"}
- isLattice is false if the text is not about one of these three cubic unit cells.
- Only these three cubic lattices are supported.`
}

/**
 * Extract a known cubic lattice from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractLattice(text: string): Promise<LatticeDef | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 100).catch((err) => {
    // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
    console.error('[extractLattice DEBUG] generateJSON threw:', err)
    return null
  })
  console.error('[extractLattice DEBUG] raw from generateJSON:', JSON.stringify(raw))
  if (!raw || raw.isLattice !== true) {
    console.error('[extractLattice DEBUG] -> null: raw falsy or isLattice !== true (got', JSON.stringify(raw?.isLattice), ')')
    return null
  }
  const looked = lookupLattice(raw.lattice)
  if (!looked) console.error('[extractLattice DEBUG] -> null: lookupLattice found no match for', JSON.stringify(raw.lattice))
  return looked
}
