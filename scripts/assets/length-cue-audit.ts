/**
 * Length-cue audit (task #2, "length giveaway"): how often is an authored
 * quiz item's correct option the uniquely LONGEST one, per subject? And how far
 * would that fall if the learner were shown only each option's answer head —
 * the text before " — " — with the working revealed after grading?
 *
 * Reads the seed corpus only (the same loader convention as src/instrumentation.ts
 * and the corpus tests: every exported array whose name ends in PROBES, in every
 * non-test module of src/lib/teaching/assets). No DB access.
 *
 *   npx tsx scripts/assets/length-cue-audit.ts
 */
import { readdirSync } from 'fs'
import path from 'path'

type Probe = { subjectSlug: string; choices?: { text: string; isCorrect?: boolean }[] }

const DIR = path.resolve(__dirname, '../../src/lib/teaching/assets')
const head = (t: string): string | null => { const i = t.indexOf(' — '); return i > 0 ? t.slice(0, i).trim() : null }

async function main() {
  const probes: Probe[] = []
  for (const f of readdirSync(DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))) {
    const mod = await import(path.join(DIR, f))
    for (const [name, value] of Object.entries(mod)) if (Array.isArray(value) && name.endsWith('PROBES')) probes.push(...(value as Probe[]))
  }
  const by: Record<string, { items: number; twoOpt: number; longest: number; splittable: number; longestIfHeads: number }> = {}
  for (const p of probes) {
    const c = p.choices
    if (!c || c.length < 2) continue
    const ci = c.findIndex((x) => x.isCorrect)
    if (ci < 0) continue
    const uniquelyLongest = (L: number[]) => { const m = Math.max(...L); return L[ci] === m && L.filter((l) => l === m).length === 1 }
    const s = (by[p.subjectSlug] ??= { items: 0, twoOpt: 0, longest: 0, splittable: 0, longestIfHeads: 0 })
    s.items++
    if (c.length === 2) s.twoOpt++
    const full = c.map((x) => x.text.length)
    if (uniquelyLongest(full)) s.longest++
    const heads = c.map((x) => head(x.text))
    const clean = heads.every(Boolean) && new Set(heads.map((h) => h!.toLowerCase())).size === heads.length
    if (clean) s.splittable++
    if (uniquelyLongest(clean ? heads.map((h) => h!.length) : full)) s.longestIfHeads++
  }
  const pct = (a: number, b: number) => `${((100 * a) / Math.max(1, b)).toFixed(0)}%`
  console.log('subject            items  2-opt  correct uniquely longest  → if answer heads shown  cleanly splittable')
  for (const [k, s] of Object.entries(by).sort()) {
    console.log(`${k.padEnd(18)} ${String(s.items).padStart(5)}  ${String(s.twoOpt).padStart(5)}  ${pct(s.longest, s.items).padStart(24)}  ${pct(s.longestIfHeads, s.items).padStart(22)}  ${pct(s.splittable, s.items).padStart(18)}`)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
