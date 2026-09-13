/**
 * STEP 1 — the exact governing-knowledge exposure residues, from the REAL
 * extractor and the REAL packer. Deterministic, no provider, no DB.
 *
 * It never judges whether authored science is CORRECT. The corpus is the
 * authority; this only reports what the budget could not carry and why.
 *
 *   npx tsx scripts/knowledge/residueReport.ts            # summary
 *   npx tsx scripts/knowledge/residueReport.ts --json     # full rows
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  loadEBConceptContext,
  EB_CORE_UNDERSTANDING_BUDGET,
} from '@/lib/curriculum/blueprintLoader'
import { packCoreUnderstanding, carriesGoverningLanguage, splitSentences } from '@/lib/curriculum/ebKnowledge'

const ROOT = 'educational-brain/concepts'
const BUDGET = EB_CORE_UNDERSTANDING_BUDGET

/** The production section extractor, replicated ONLY because blueprintLoader
 *  does not export it. Identical patterns; asserted against the loader's own
 *  output below, so a drift is caught rather than assumed away. */
function ebSection(content: string, title: string): string | null {
  for (const re of [
    new RegExp(`^## ${title}\\s*\\n`, 'mi'),
    new RegExp(`^## \\d+\\.\\s+${title}[^\\n]*\\n`, 'mi'),
  ]) {
    const m = re.exec(content)
    if (!m) continue
    const after = content.slice(m.index + m[0].length)
    const end = /^## /m.exec(after)
    const raw = end ? after.slice(0, end.index).trim() : after.trim()
    if (raw.length > 0) return raw
  }
  return null
}

/** The packer's own unit split, calling the production `splitSentences` rather
 *  than a local copy of it. A first draft kept its own regex here and reported
 *  a sentence fragment the real packer never produces — the same "two parsers
 *  that drift" trap this module's header warns about, hit in the instrument. */
function unitsOf(section: string, budget: number): string[] {
  const units: string[] = []
  for (const para of section.trim().split(/\n\s*\n+/)) {
    const p = para.trim().replace(/\s+/g, ' ')
    if (!p) continue
    if (p.length <= budget) { units.push(p); continue }
    for (const s of splitSentences(p)) units.push(s)
  }
  return units
}

const GOV_TERMS = [
  'only if', 'only when', 'only for', 'must', 'never', 'always', 'provided that',
  'assumes', 'assume', 'assumption', 'except', 'unless', 'valid only', 'valid when',
  'valid if', 'valid for', 'requires', 'require', 'cannot', 'conserved', 'conserve',
  'conservation', 'sign convention', 'boundary', 'boundaries', 'limitation',
  'constraint', 'in the limit', 'approximation', 'units of', 'unit of', 'per unit',
  'domain of validity', 'breaks down', 'does not hold', 'no longer',
]
function triggers(text: string): string[] {
  const l = text.toLowerCase()
  return GOV_TERMS.filter((t) => new RegExp(`\\b${t.replace(/ /g, '\\s+')}\\b`).test(l))
}

/** Normalised for redundancy comparison: content words only, so wording
 *  differences do not hide a genuine repeat, and punctuation does not fake one. */
function contentWords(text: string): Set<string> {
  return new Set((text.toLowerCase().match(/[a-z]{4,}/g) ?? []))
}
function overlap(a: Set<string>, b: Set<string>): number {
  if (a.size === 0) return 0
  let n = 0
  for (const w of a) if (b.has(w)) n++
  return n / a.size
}

export interface Residue {
  conceptSlug: string
  subject: string
  authoredChars: number
  exposedChars: number
  unitIndex: number
  unitOfTotal: number
  omittedUnit: string
  omittedLen: number
  triggers: string[]
  /** Would this unit fit if the budget had been spent differently? */
  fitsAlone: boolean
  /** Overlap of this unit's content words with what WAS exposed. */
  overlapWithExposed: number
  /** The governing SENTENCES inside this unit, and whether they'd fit in the
   *  headroom the packer left unused. */
  governingSentences: string[]
  governingSentenceChars: number
  headroom: number
  classification: string
}

function classify(r: Omit<Residue, 'classification'>): string {
  if (r.overlapWithExposed >= 0.85) return 'B-REDUNDANT'
  if (r.governingSentenceChars > 0 && r.governingSentenceChars <= r.headroom) return 'A-PACKING'
  if (r.omittedLen > 600) return 'C-OVERLONG'
  if (r.unitOfTotal >= 8) return 'D-MANY-UNITS'
  return 'E-BUDGET-CONFLICT'
}

function main() {
  const rows: Residue[] = []
  const perFile: Array<{ slug: string; subject: string; classes: string[] }> = []
  let files = 0
  let entriesWithCU = 0
  let totalAuthored = 0
  let totalExposed = 0

  for (const subject of readdirSync(ROOT)) {
    const dir = join(ROOT, subject)
    if (!statSync(dir).isDirectory()) continue
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.md')) continue
      files++
      const slug = f.replace(/\.md$/, '')
      const eb = loadEBConceptContext(slug)
      if (!eb.found) continue
      const cu = eb.context.coreUnderstanding
      if (!cu) continue
      entriesWithCU++
      totalAuthored += cu.authoredChars
      totalExposed += cu.exposedChars
      if (!cu.droppedGoverning) continue

      const raw = ebSection(readFileSync(join(dir, f), 'utf8'), 'Core Understanding')
      if (!raw) { console.error(`DRIFT: loader packed ${slug} but the section did not re-extract`); continue }
      const packed = packCoreUnderstanding(raw, BUDGET)
      if (packed.text !== cu.text) { console.error(`DRIFT: re-pack differs for ${slug}`); continue }

      const units = unitsOf(raw, BUDGET)
      const exposedWords = contentWords(packed.text)
      const headroom = BUDGET - packed.exposedChars
      const classes: string[] = []

      units.forEach((u, i) => {
        if (packed.text.includes(u)) return          // exposed
        if (!carriesGoverningLanguage(u)) return     // dropped, but not governing
        const sentences = splitSentences(u)
        const gov = sentences.filter(carriesGoverningLanguage)
        const govChars = gov.reduce((n, s) => n + s.length + 1, 0)
        const base = {
          conceptSlug: slug, subject,
          authoredChars: cu.authoredChars, exposedChars: cu.exposedChars,
          unitIndex: i, unitOfTotal: units.length,
          omittedUnit: u, omittedLen: u.length,
          triggers: triggers(u),
          fitsAlone: u.length <= BUDGET,
          overlapWithExposed: Number(overlap(contentWords(u), exposedWords).toFixed(3)),
          governingSentences: gov, governingSentenceChars: govChars, headroom,
        }
        const classification = classify(base)
        classes.push(classification)
        rows.push({ ...base, classification })
      })
      perFile.push({ slug, subject, classes })
    }
  }

  const byClass: Record<string, number> = {}
  for (const r of rows) byClass[r.classification] = (byClass[r.classification] ?? 0) + 1
  const filesByClass: Record<string, number> = {}
  for (const p of perFile) {
    // A file's class is its most-fixable residue: packing beats redundancy
    // beats verbosity beats a genuine conflict.
    const order = ['A-PACKING', 'B-REDUNDANT', 'C-OVERLONG', 'D-MANY-UNITS', 'E-BUDGET-CONFLICT']
    const best = order.find((c) => p.classes.includes(c)) ?? 'NONE'
    filesByClass[best] = (filesByClass[best] ?? 0) + 1
  }

  console.log(`files scanned            ${files}`)
  console.log(`entries with Core Understanding ${entriesWithCU}`)
  console.log(`authored chars           ${totalAuthored}`)
  console.log(`exposed chars            ${totalExposed} (${(totalExposed / totalAuthored * 100).toFixed(1)}%)`)
  console.log(`RESIDUE FILES            ${perFile.length}`)
  console.log(`RESIDUE UNITS            ${rows.length}`)
  console.log(`\nunits by class:`)
  for (const [k, v] of Object.entries(byClass).sort()) console.log(`  ${k.padEnd(20)} ${v}`)
  console.log(`\nfiles by most-fixable class:`)
  for (const [k, v] of Object.entries(filesByClass).sort()) console.log(`  ${k.padEnd(20)} ${v}`)
  const bySubject: Record<string, number> = {}
  for (const p of perFile) bySubject[p.subject] = (bySubject[p.subject] ?? 0) + 1
  console.log(`\nresidue files by subject:`)
  for (const [k, v] of Object.entries(bySubject).sort()) console.log(`  ${k.padEnd(20)} ${v}`)

  if (process.argv.includes('--json')) {
    writeFileSync('/tmp/claude-0/residues.json', JSON.stringify(rows, null, 2))
    console.log(`\nwrote /tmp/claude-0/residues.json (${rows.length} rows)`)
  }
}

main()
