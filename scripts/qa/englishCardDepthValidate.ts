/**
 * Validates a card-depth batch (English or Chemistry) BEFORE it is wired or committed.
 *
 *   npx tsx scripts/qa/englishCardDepthValidate.ts <module-under-assets> <EXPORT_NAME>
 *   e.g. npx tsx scripts/qa/englishCardDepthValidate.ts englishCardDepthBatch1 ENGLISH_CARD_DEPTH_BATCH_1
 *        npx tsx scripts/qa/englishCardDepthValidate.ts chemistryCardDepthBatch1 CHEMISTRY_CARD_DEPTH_BATCH_1
 *
 * Hard errors (exit 1):
 *  - not exactly 3 options, not exactly one correct option, duplicate option text, empty text
 *    (`probeToMcq` is the serving predicate, so a card it rejects is never asked);
 *  - the (conceptId, probeKind, gradeBand) slot is already used by another probe, or twice in the
 *    batch — a second probe in a slot promotes it to a 5-segment slug and abandons the live row's
 *    identity (P-10, brainSeedAssets.buildProbeSlugResolver);
 *  - a misconception id that neither the concept's existing probes use nor its educational-brain entry defines
 *    (none may be invented);
 *  - the stem repeats an existing stem of the concept.
 * Warnings: a stem whose content words overlap >= 50 % (Jaccard) with an existing stem of the concept
 * (same example re-asked), and the share of cards whose correct answer is strictly the longest option (a cue a
 * guesser can use; 33 % is chance for three options).
 */
import fs from 'node:fs'
import path from 'node:path'
import { load } from '../assets/contract-audit'
import { probeToMcq } from '../../src/lib/teaching/gateAssessment'

const [modName, exportName] = process.argv.slice(2)
if (!modName || !exportName) { console.error('usage: englishCardDepthValidate.ts <module> <EXPORT>'); process.exit(2) }

const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()
const STOP = new Set(['the', 'and', 'for', 'that', 'this', 'with', 'are', 'was', 'what', 'which', 'complete', 'sentence', 'does', 'not', 'has', 'have', 'its', 'one', 'from', 'when', 'than'])
const words = (s: string) => new Set(norm(s).replace(/[^\p{L}\p{N}\s]/gu, ' ').split(' ').filter((w) => w.length > 2 && !STOP.has(w)))

/**
 * Misconception ids the concept's own educational-brain entry defines (`**M1 — …`, `**P2 — …`), written the way the
 * seed probes write them (`<concept>:M1`). They are authoritative, not invented, even when no probe uses them yet.
 * An entry writes them as a bold line (`**M1 — …`), a bullet (`- **M1 — …`) or a heading (`### M1 — …`, the biology forms).
 */
function ebIds(conceptId: string): string[] {
  const root = path.resolve(__dirname, '../../educational-brain/concepts')
  if (!fs.existsSync(root)) return []
  for (const dir of fs.readdirSync(root)) {
    const f = path.join(root, dir, `${conceptId}.md`)
    if (fs.existsSync(f)) return [...fs.readFileSync(f, 'utf8').matchAll(/^\s*(?:- )?(?:\*\*|#{2,4} )([A-Z]\d+) —/gm)].map((m) => `${conceptId}:${m[1]}`)
  }
  return []
}

async function main() {
  const mod = await import(path.resolve(__dirname, '../../src/lib/teaching/assets', modName))
  const batch = mod[exportName] as Array<any> | undefined
  if (!Array.isArray(batch) || batch.length === 0) { console.error(`${exportName} is not a non-empty array in ${modName}`); process.exit(2) }
  const batchStems = new Set(batch.map((p) => norm(p.stem)))
  const { probes } = (await load()) as unknown as { probes: any[] }
  const prefix = `${String(batch[0].conceptId).split('.')[0]}.`   // 'eng.' or 'chem.' — the batch's own subject
  const others = probes.filter((p) => p.conceptId.startsWith(prefix) && !batchStems.has(norm(p.stem)))

  const errors: string[] = [], warnings: string[] = []
  const slots = new Map<string, number>()
  let longest = 0
  for (const p of batch) {
    const tag = `${p.conceptId} [${p.gradeBand}/${p.probeKind}]`
    const m = probeToMcq({ stem: p.stem, choices: p.choices, conceptId: p.conceptId })
    if (!m) errors.push(`${tag}: rejected by probeToMcq (options/correct/duplicates)`)
    if (!Array.isArray(p.choices) || p.choices.length !== 3) errors.push(`${tag}: needs exactly 3 options`)
    else {
      if (p.choices.filter((c: any) => c.isCorrect).length !== 1) errors.push(`${tag}: needs exactly one correct option`)
      const lens = p.choices.map((c: any) => c.text.length)
      const correctLen = p.choices.find((c: any) => c.isCorrect)?.text.length ?? 0
      if (lens.filter((l: number) => l >= correctLen).length === 1) longest++
    }
    const slot = `${p.conceptId}|${p.probeKind}|${p.gradeBand}`
    slots.set(slot, (slots.get(slot) ?? 0) + 1)
    if (others.some((o) => `${o.conceptId}|${o.probeKind}|${o.gradeBand}` === slot)) errors.push(`${tag}: slot already used by an existing probe (P-10)`)
    const known = new Set([...others.filter((o) => o.conceptId === p.conceptId).flatMap((o) => o.targetedMisconceptions ?? []), ...ebIds(p.conceptId)])
    for (const id of p.targetedMisconceptions ?? []) if (!known.has(id)) errors.push(`${tag}: misconception id not used by the concept's existing probes: ${id}`)
    for (const c of p.choices ?? []) if (c.misconceptionId && !(p.targetedMisconceptions ?? []).includes(c.misconceptionId)) errors.push(`${tag}: choice misconceptionId missing from targetedMisconceptions`)
    const mine = words(p.stem)
    for (const o of others.filter((x) => x.conceptId === p.conceptId)) {
      if (norm(o.stem) === norm(p.stem)) errors.push(`${tag}: stem repeats an existing stem`)
      const theirs = words(o.stem)
      const inter = [...mine].filter((w) => theirs.has(w)).length
      const sim = inter / Math.max(1, mine.size + theirs.size - inter)   // Jaccard over content words
      if (sim >= 0.5) warnings.push(`${tag}: ${(sim * 100).toFixed(0)}% word overlap with existing "${o.stem.slice(0, 70)}…"`)
    }
  }
  for (const [s, n] of slots) if (n > 1) errors.push(`${s}: used ${n}x inside the batch`)

  const perConcept = new Map<string, number>()
  for (const p of batch) perConcept.set(p.conceptId, (perConcept.get(p.conceptId) ?? 0) + 1)
  const share = (100 * longest) / batch.length
  if (share > 60) warnings.push(`correct answer is the strictly longest option in ${share.toFixed(0)}% of cards (chance 33%)`)
  console.log(`${exportName}: ${batch.length} cards, ${perConcept.size} concepts, correct-is-longest ${share.toFixed(0)}%`)
  for (const w of warnings) console.log(`  warn  ${w}`)
  for (const e of errors) console.log(`  ERROR ${e}`)
  if (errors.length) { console.log(`${errors.length} error(s)`); process.exit(1) }
  console.log('OK')
}
main()
