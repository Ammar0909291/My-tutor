/**
 * Part 2 (option C) — molecular geometry scene generator. THIRD scene type.
 *
 * Probe failure addressed: the free-form generator drew "a linear water molecule
 * instead of bent ~104.5°". Molecular shape is NOT something to generate from raw
 * coordinates — it's a small set of textbook (VSEPR) constants. So the LLM only
 * EXTRACTS the molecule name; code looks up the real bond angle and places the
 * atoms at it, correct by construction.
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. The lookup +
 * placement + checker are Groq-free and unit-tested; only extractMoleculeName()
 * calls the LLM and needs a live test later.
 *
 * THE PURE HALF LIVES IN `./moleculeGeometry.pure` and is re-exported below, so every
 * importer of this module is unchanged.
 */

import { generateJSON } from '@/lib/ai/client'

import { MoleculeDef, lookupMolecule } from './moleculeGeometry.pure'

export * from './moleculeGeometry.pure'

// ── LLM molecule-name extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and identify the single molecule whose shape/bonding it is describing, if any.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isMolecule": true|false, "molecule": "<common name or formula, e.g. water / H2O>"}
- isMolecule is false if no specific molecule's geometry is being discussed.
- Give the molecule actually discussed; do not guess one that isn't mentioned.`
}

/**
 * Extract a known molecule from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractMolecule(text: string): Promise<MoleculeDef | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 100).catch((err) => {
    // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
    console.error('[extractMolecule DEBUG] generateJSON threw:', err)
    return null
  })
  console.error('[extractMolecule DEBUG] raw from generateJSON:', JSON.stringify(raw))
  if (!raw || raw.isMolecule !== true) {
    console.error('[extractMolecule DEBUG] -> null: raw falsy or isMolecule !== true (got', JSON.stringify(raw?.isMolecule), ')')
    return null
  }
  const looked = lookupMolecule(raw.molecule)
  if (!looked) console.error('[extractMolecule DEBUG] -> null: lookupMolecule found no match for', JSON.stringify(raw.molecule))
  return looked
}
