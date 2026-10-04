/**
 * Numeric fact-check — STEP 2 offline measurement (owner instruction 2026-10-04).
 * Read-only: imports the authored seed corpus and the pure checker, writes JSON
 * under docs/qa/numeric-fact-check-step2/. Nothing here touches a route, the DB
 * or learner behaviour.
 *
 * The two sets are rebuilt with EXACTLY the Step 1 generators (commit 882e0db7
 * session smoke.ts / mut.ts), not regenerated differently:
 *  - CLEAN: every string with a digit and length > 15 in the asset files whose
 *    name starts with physics|chemistry (smoke.ts, 3,799 strings).
 *  - CORRUPTED: every string containing "=" and a digit in the asset files
 *    starting with physics|chemistry|biology (mut.ts — NOTE biology included),
 *    whose first "= <number>" after a calculation-looking left side is
 *    replaced by value × 1.37 (3 s.f.), using mut.ts's literal string replace.
 *
 * Usage: npx tsx scripts/qa/numericFactCheckEval.ts [--write]
 */
import { readdirSync, mkdirSync, writeFileSync } from 'fs'
import { createHash } from 'crypto'
import path from 'path'
import { checkNumericClaims, checkArithmetic, checkAgainstAuthored, type NumericFlag } from '../../src/lib/teaching/factCheckNumeric'
import { ADVERSARIAL_CASES } from './numericFactCheckAdversarial'

const ASSETS = path.join(__dirname, '../../src/lib/teaching/assets/')
const OUT = path.join(__dirname, '../../docs/qa/numeric-fact-check-step2/')
const id = (s: string) => createHash('sha1').update(s).digest('hex').slice(0, 10)

interface Src { text: string; file: string; conceptId: string | null }

/** smoke.ts / mut.ts walk, plus provenance (first file seen, nearest conceptId). */
async function collect(fileRe: RegExp, keep: (s: string) => boolean): Promise<Src[]> {
  const seen = new Map<string, Src>()
  const files = readdirSync(ASSETS).filter((f) => fileRe.test(f))
  for (const file of files) {
    const mod = await import(ASSETS + file)
    const walk = (x: unknown, concept: string | null, d = 0): void => {
      if (d > 8 || x == null) return
      if (typeof x === 'string') { if (keep(x) && !seen.has(x)) seen.set(x, { text: x, file, conceptId: concept }); return }
      if (Array.isArray(x)) { x.forEach((y) => walk(y, concept, d + 1)); return }
      if (typeof x === 'object') {
        const c = typeof (x as { conceptId?: unknown }).conceptId === 'string' ? (x as { conceptId: string }).conceptId : concept
        Object.values(x as object).forEach((y) => walk(y, c, d + 1))
      }
    }
    walk(mod, null)
  }
  return [...seen.values()]
}

const brief = (f: NumericFlag) => ({ kind: f.kind, claimed: f.claimed, expected: f.expected, sentence: f.sentence.slice(0, 300), detail: f.detail })

async function main() {
  const write = process.argv.includes('--write')

  // ── A. CLEAN ────────────────────────────────────────────────────────────────
  const clean = await collect(/^(physics|chemistry)/i, (x) => /\d/.test(x) && x.length > 15)
  const cleanRows = clean.map((s) => ({ id: id(s.text), file: s.file, conceptId: s.conceptId, text: s.text, flags: checkNumericClaims(s.text).map(brief) }))
  const cleanFlags = cleanRows.flatMap((r) => r.flags.map((f) => ({ id: r.id, ...f })))

  // N3 has no input without authored context. Leave-one-out proxy: each clean
  // string checked against the OTHER clean strings of the same concept.
  const byConcept = new Map<string, Src[]>()
  for (const s of clean) if (s.conceptId) byConcept.set(s.conceptId, [...(byConcept.get(s.conceptId) ?? []), s])
  const n3Flags: Array<{ id: string; conceptId: string } & ReturnType<typeof brief>> = []
  let n3Checked = 0
  for (const [conceptId, list] of byConcept) {
    for (const s of list) {
      n3Checked++
      const others = list.filter((o) => o !== s).map((o) => o.text)
      for (const f of checkAgainstAuthored(s.text, others)) n3Flags.push({ id: id(s.text), conceptId, ...brief(f) })
    }
  }

  // ── B. CORRUPTED (mut.ts, verbatim logic) ───────────────────────────────────
  const corpusEq = await collect(/^(physics|chemistry|biology)/i, (x) => /\d/.test(x) && /=/.test(x))
  const corrupted: Array<Record<string, unknown>> = []
  for (const s of corpusEq) {
    const m = s.text.match(/([\d)²³]\s*[×x*/÷+−-]?[^=]{0,40}?)=\s*(\d+(?:\.\d+)?)(?![\d.,]*\s*[×x]\s*10)/)
    if (!m || !/[×*/÷+−]|\d\s*-\s*\d/.test(m[1])) continue
    const v = Number(m[2]); if (!v) continue
    const nv = Number((v * 1.37).toPrecision(3))
    const bad = s.text.replace(`= ${m[2]}`, `= ${nv}`).replace(`=${m[2]}`, `=${nv}`)
    if (bad === s.text) continue
    const n1 = checkArithmetic(bad)
    const all = checkNumericClaims(bad)
    // Where the literal replace actually landed (may differ from the regex match).
    let at = 0
    while (at < bad.length && bad[at] === s.text[at]) at++
    corrupted.push({
      id: id(s.text), file: s.file, conceptId: s.conceptId,
      matchedLhs: m[1], originalValue: m[2], corruptedValue: String(nv),
      replaceLandedAtMatch: at >= (m.index ?? 0) && at <= (m.index ?? 0) + m[0].length,
      original: s.text, corrupted: bad,
      excerpt: bad.slice(Math.max(0, at - 120), at + 80),
      caughtN1: n1.length > 0, caughtAny: all.length > 0, flags: all.map(brief),
    })
  }

  // ── C. ADVERSARIAL ──────────────────────────────────────────────────────────
  const adversarial = ADVERSARIAL_CASES.map((c) => {
    const flags = checkNumericClaims(c.prose, c.authored ?? [])
    const flagged = flags.length > 0
    return { ...c, flagged, pass: flagged === c.expectFlag, flags: flags.map(brief) }
  })

  const summary = {
    generatedAt: new Date().toISOString(),
    clean: { strings: cleanRows.length, flags: cleanFlags.length, n3LeaveOneOut: { stringsChecked: n3Checked, concepts: byConcept.size, flags: n3Flags.length } },
    corrupted: { cases: corrupted.length, caughtN1: corrupted.filter((c) => c.caughtN1).length, caughtAny: corrupted.filter((c) => c.caughtAny).length },
    adversarial: { cases: adversarial.length, pass: adversarial.filter((a) => a.pass).length, fail: adversarial.filter((a) => !a.pass).map((a) => a.name) },
  }
  console.log(JSON.stringify(summary, null, 2))
  for (const f of cleanFlags) console.log('CLEAN FLAG', f.id, f.kind, f.claimed, '|', f.sentence.slice(0, 160))
  for (const f of n3Flags) console.log('N3 LOO FLAG', f.conceptId, f.claimed, 'vs', f.expected, '|', f.sentence.slice(0, 160))
  for (const a of adversarial.filter((x) => !x.pass)) console.log('ADV FAIL', a.name, 'expectFlag', a.expectFlag, JSON.stringify(a.flags))

  if (write) {
    mkdirSync(OUT, { recursive: true })
    writeFileSync(OUT + 'clean-corpus.json', JSON.stringify(cleanRows.map(({ id, file, conceptId, text }) => ({ id, file, conceptId, text })), null, 1))
    writeFileSync(OUT + 'corrupted-corpus.json', JSON.stringify(corrupted, null, 1))
    writeFileSync(OUT + 'results.json', JSON.stringify({ summary, cleanFlags, n3LeaveOneOutFlags: n3Flags, adversarial }, null, 1))
    console.log('wrote', OUT)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
