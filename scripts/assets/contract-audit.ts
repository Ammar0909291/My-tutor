/**
 * ASSET CONTRACT AUDIT — every subject, measured per (concept, gradeBand).
 *
 * WHY THIS EXISTS. `assetContract.ts` states the inventory a concept must hold
 * before a lesson on it can close without the model volunteering a gradeable
 * question. Two subjects already have a guard that asserts it
 * (mathematicsBandContract, chemistryAssetContract); the other four have
 * nothing, and the numbers quoted for them in CLAUDE.md come from different
 * sessions, different measures (per concept vs per band) and different dates.
 *
 * This reports ONE measure, from source, for all six at once, so a content
 * decision is made on a number that was computed rather than remembered.
 *
 * WHAT IT MEASURES, AND WHAT IT DOES NOT. It reads the SEED CORPUS on disk —
 * the content `scripts/brain/seed-knowledge-assets.ts` writes and the
 * cold-start bootstrap converges production onto. It is NOT a reading of the
 * live database: production can lag the corpus (the bootstrap writes ~150 rows
 * per cold start), and it can also hold AI_AUTHORED live-capture rows this
 * scan cannot see. A row that exists in production but not here is invisible
 * to this audit, and vice versa. Where the two disagree, the database is the
 * truth about what SERVES and this file is the truth about what is AUTHORED.
 *
 * THE UNIT IS (concept, band), not concept. `matcher.ts` scores an adjacent
 * band at 60 against a threshold of 65 — an off-band probe is REFUSED, not
 * merely ranked lower. A concept holding six probes at MIDDLE serves none of
 * them to an EARLY learner. Counting per concept hides exactly the defect that
 * matters.
 *
 * Run: npx tsx scripts/assets/contract-audit.ts [--json] [--subject <slug>] [--all]
 */
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { MIN_EXPLANATIONS, MIN_CLOSED_CHOICE_PROBES } from '../../src/lib/teaching/assetContract'

const ASSET_DIR = path.join(__dirname, '..', '..', 'src', 'lib', 'teaching', 'assets')

interface Row { subjectSlug?: string; conceptId?: string; gradeBand?: unknown }
interface Probe extends Row { choices?: unknown; probeKind?: string }

/** A probe a mastery gate can grade: >= 2 authored choices. Open recall is real
 *  content and is counted separately — it can never carry a gate, because
 *  correctness for free text has no deterministic source. */
const isGradeable = (p: Probe) => Array.isArray(p.choices) && p.choices.length >= 2

async function load() {
  const files = readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  const explanations: Row[] = []
  const probes: Probe[] = []
  for (const f of files) {
    const mod = await import(path.join(ASSET_DIR, f))
    for (const [name, value] of Object.entries(mod)) {
      if (!Array.isArray(value)) continue
      if (name.endsWith('EXPLANATIONS')) explanations.push(...(value as Row[]))
      else if (name.endsWith('PROBES')) probes.push(...(value as Probe[]))
    }
  }
  return { explanations, probes }
}

const key = (c: string, b: unknown) => `${c}::${String(b)}`

interface SubjectReport {
  subject: string
  conceptsExplained: number
  taughtPairs: number
  pairsAtContract: number
  pairsShort: number
  /** Taught with NO gradeable probe at all — taught and never quizzable. */
  pairsWithZeroProbes: number
  openRecallOnlyPairs: number
  worst: { pair: string; gradeable: number; openRecall: number }[]
}

async function main() {
  const argv = process.argv.slice(2)
  const asJson = argv.includes('--json')
  const only = argv.includes('--subject') ? argv[argv.indexOf('--subject') + 1] : null

  const { explanations, probes } = await load()
  const subjects = [...new Set([
    ...explanations.map((e) => e.subjectSlug),
    ...probes.map((p) => p.subjectSlug),
  ])].filter((s): s is string => typeof s === 'string' && (!only || s === only)).sort()

  const reports: SubjectReport[] = []
  for (const subject of subjects) {
    const taught = new Set(
      explanations.filter((e) => e.subjectSlug === subject).map((e) => key(e.conceptId!, e.gradeBand)),
    )
    const gradeable = new Map<string, number>()
    const openRecall = new Map<string, number>()
    for (const p of probes) {
      if (p.subjectSlug !== subject) continue
      const k = key(p.conceptId!, p.gradeBand)
      const m = isGradeable(p) ? gradeable : openRecall
      m.set(k, (m.get(k) ?? 0) + 1)
    }
    const short = [...taught].filter((k) => (gradeable.get(k) ?? 0) < MIN_CLOSED_CHOICE_PROBES)
    reports.push({
      subject,
      conceptsExplained: new Set(
        explanations.filter((e) => e.subjectSlug === subject).map((e) => e.conceptId),
      ).size,
      taughtPairs: taught.size,
      pairsAtContract: taught.size - short.length,
      pairsShort: short.length,
      pairsWithZeroProbes: short.filter((k) => (gradeable.get(k) ?? 0) === 0).length,
      openRecallOnlyPairs: short.filter(
        (k) => (gradeable.get(k) ?? 0) === 0 && (openRecall.get(k) ?? 0) > 0,
      ).length,
      // Sorted by how far short, then by name, so the list is stable between runs.
      worst: short
        .map((k) => ({ pair: k, gradeable: gradeable.get(k) ?? 0, openRecall: openRecall.get(k) ?? 0 }))
        .sort((a, b) => a.gradeable - b.gradeable || a.pair.localeCompare(b.pair))
        .slice(0, process.argv.includes('--all') ? Number.MAX_SAFE_INTEGER : 12),
    })
  }

  if (asJson) {
    console.log(JSON.stringify({
      contract: { MIN_EXPLANATIONS, MIN_CLOSED_CHOICE_PROBES },
      measuredAt: new Date().toISOString(),
      source: 'seed corpus on disk (NOT the production database)',
      reports,
    }, null, 2))
    return
  }

  console.log(`ASSET CONTRACT AUDIT — seed corpus on disk, per (concept, gradeBand)`)
  console.log(`contract: >= ${MIN_EXPLANATIONS} explanation, >= ${MIN_CLOSED_CHOICE_PROBES} gradeable probes\n`)
  const pad = (s: string | number, n: number) => String(s).padEnd(n)
  console.log(pad('subject', 18) + pad('concepts', 10) + pad('pairs', 8) + pad('at contract', 13) + pad('short', 8) + 'never quizzable')
  for (const r of reports) {
    console.log(
      pad(r.subject, 18) + pad(r.conceptsExplained, 10) + pad(r.taughtPairs, 8) +
      pad(r.pairsAtContract, 13) + pad(r.pairsShort, 8) + r.pairsWithZeroProbes,
    )
  }
  for (const r of reports.filter((x) => x.pairsShort > 0)) {
    console.log(`\n${r.subject} — worst ${r.worst.length} of ${r.pairsShort}:`)
    for (const w of r.worst) {
      console.log(`  ${w.pair}  gradeable=${w.gradeable} openRecall=${w.openRecall}`)
    }
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
