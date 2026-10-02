/**
 * Tally `[assembled-turn]` lines (turn assembly SHADOW, spec §7 gate) from a
 * saved Vercel runtime-log dump. Read-only; prints counts and the failures.
 *
 *   npx tsx scripts/qa/turnQuality/tallyAssembledTurns.ts <log-dump.txt> [more dumps…]
 *
 * Lines the log viewer truncated cannot be parsed and are counted as such,
 * never guessed at.
 */
import { readFileSync } from 'fs'

interface Rec {
  conceptId?: string | null; event?: string; provider?: string | null; ms?: number; error?: string | null
  attempts?: number; completionAgreement?: boolean | null; codes?: string[]; fallback?: boolean
  completion?: boolean; cardAttached?: boolean
  live?: { k1Stub: boolean; k2QuestionBesideCard: boolean }
  assembled?: { k1Stub: boolean; k2QuestionBesideCard: boolean }
  rawOnFailure?: string
}

const recs: Rec[] = []
let truncated = 0
const seen = new Set<string>()
for (const file of process.argv.slice(2)) {
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const i = line.indexOf('[assembled-turn] {')
    if (i < 0) continue
    const json = line.slice(i + '[assembled-turn] '.length).trim()
    if (seen.has(json)) continue // the same line in two overlapping dumps
    seen.add(json)
    try { recs.push(JSON.parse(json)) } catch { truncated++ }
  }
}

const n = recs.filter((r) => r.event !== 'timeout').length
const pct = (k: number, of = n) => (of ? `${k}/${of} (${((100 * k) / of).toFixed(1)}%)` : `${k}/0`)
const count = (f: (r: Rec) => boolean) => recs.filter((r) => r.event !== 'timeout' && f(r)).length
const codes = new Map<string, number>()
for (const r of recs) for (const c of r.codes ?? []) codes.set(c, (codes.get(c) ?? 0) + 1)
const ms = recs.map((r) => r.ms).filter((x): x is number => typeof x === 'number').sort((a, b) => a - b)

console.log(JSON.stringify({
  linesParsed: recs.length,
  linesTruncated: truncated,
  timeouts: recs.filter((r) => r.event === 'timeout').length,
  completionAgreement: pct(count((r) => r.completionAgreement === true), count((r) => typeof r.completionAgreement === 'boolean')),
  fallback: pct(count((r) => r.fallback === true)),
  regenerated: pct(count((r) => r.attempts === 2), count((r) => typeof r.attempts === 'number')),
  assembledK1: pct(count((r) => r.assembled?.k1Stub === true)),
  assembledK2: pct(count((r) => r.assembled?.k2QuestionBesideCard === true)),
  servedK1: pct(count((r) => r.live?.k1Stub === true)),
  servedK2: pct(count((r) => r.live?.k2QuestionBesideCard === true)),
  codes: Object.fromEntries(codes),
  shadowMs: ms.length ? { p50: ms[Math.floor(ms.length / 2)], p95: ms[Math.floor(ms.length * 0.95)], max: ms[ms.length - 1] } : null,
  byConcept: Object.fromEntries([...recs.reduce((m, r) => m.set(r.conceptId ?? '?', (m.get(r.conceptId ?? '?') ?? 0) + 1), new Map<string, number>())]),
}, null, 2))
for (const r of recs) if (r.rawOnFailure) console.log(`\nPARSE FAILURE (${r.conceptId}): ${r.rawOnFailure}`)
