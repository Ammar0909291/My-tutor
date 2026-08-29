/**
 * Part 2 (option C) — electron-shell (Bohr model) scene generator. SEVENTH type.
 *
 * Unlike the formula-driven generators, this is DATA-driven: the shell electron
 * counts are curated, textbook-fixed reference data (the Bohr–Bury scheme), not a
 * geometric formula. The LLM only EXTRACTS which element is meant; code looks up
 * its electron configuration and draws concentric shells, correct by construction.
 *
 * SCOPE: elements Z = 1–20 only. This is the range where the simple "2, 8, 8, 2"
 * Bohr–Bury rule is exactly what school curricula teach; from Z = 21 (Sc) onward
 * d-orbital filling makes the simple shell picture wrong, so we deliberately do
 * NOT cover it (returning null) rather than draw a misleading diagram.
 *
 * Independent-derivation checker: the scene is BUILT from the lookup table; the
 * checker (a) re-derives the shell distribution ALGORITHMICALLY from the Bohr–Bury
 * filling rule and compares, and (b) counts the actual electron dots and confirms
 * the total equals the element's atomic number Z — a fact independent of the
 * per-shell split.
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. Pure-data parts
 * are Groq-free and unit-tested; only extractElement() calls the LLM.
 *
 * THE PURE HALF LIVES IN `./electronShells.pure` and is re-exported below, so every
 * importer of this module is unchanged.
 */

import { generateJSON } from '@/lib/ai/client'

import { ElementDef, lookupElement, validateElement } from './electronShells.pure'

export * from './electronShells.pure'

// ── LLM element extraction (NEEDS A LIVE GROQ TEST — isolated) ────────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and identify the single chemical element whose atomic structure / electron shells it is describing, if any.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isElement": true|false, "element": "<name, symbol, or atomic number, e.g. Sodium / Na / 11>"}
- isElement is false if no specific element's electron arrangement is being discussed.
- Only elements with atomic number 1 to 20 are supported; if the element is heavier, still report it and code will reject it.`
}

/**
 * Extract a known element (Z = 1–20) from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractElement(text: string): Promise<ElementDef | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 100).catch((err) => {
    // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
    console.error('[extractElement DEBUG] generateJSON threw:', err)
    return null
  })
  console.error('[extractElement DEBUG] raw from generateJSON:', JSON.stringify(raw))
  if (!raw || raw.isElement !== true) {
    console.error('[extractElement DEBUG] -> null: raw falsy or isElement !== true (got', JSON.stringify(raw?.isElement), ')')
    return null
  }
  const looked = lookupElement(raw.element)
  if (!looked) console.error('[extractElement DEBUG] -> null: lookupElement found no match for', JSON.stringify(raw.element))
  const validated = validateElement(looked)
  if (looked && !validated) console.error('[extractElement DEBUG] -> null: validateElement rejected', JSON.stringify(looked))
  return validated
}
