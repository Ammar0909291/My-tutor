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
 * THE FLOOR AND THE TARGET ARE DIFFERENT NUMBERS. `--min N` re-runs the same
 * measure against a higher bar. The contract's own floor is three, which is the
 * mastery bar itself (`correctAtCheck >= 1` plus `correctAtPractice >= 2`) with
 * no slack: `excludeProbeStem` never re-asks a spent probe, so a pair holding
 * exactly three can no longer certify a learner who answers one wrong. The
 * probe-depth programme targets five for physics and chemistry — the bar plus
 * room for two wrong answers. `--min 5` is how that target is checked; the
 * default stays at the contract so this audit keeps reporting the contract.
 *
 * EVERY REGISTERED SUBJECT APPEARS, EVEN WITH ZERO SEED CONTENT. Before this,
 * `subjects` was derived only from subjectSlug values already present in
 * loaded explanations/probes — a subject whose KG exists and is registered in
 * SUBJECT_ADAPTERS but has no seed corpus yet was simply absent from the
 * report, silently, rather than showing up as a to-do item. `kgSubjects()`
 * below discovers every `docs/{subject}/kg/graph.json` on disk (the same
 * technique `curriculumKgRegistration.test.ts` uses to guard the adapter
 * registry itself) and is unioned into the subject list, so a subject added
 * to the platform — KG dropped in, adapter registered — is visible here on
 * its very first run, reporting `kgConceptCount` authored=0, rather than
 * needing someone to remember to check for it once content authoring starts.
 *
 * Run: npx tsx scripts/assets/contract-audit.ts [--json] [--subject <slug>] [--all] [--min N]
 */
import { readdirSync, existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { MIN_EXPLANATIONS, MIN_CLOSED_CHOICE_PROBES } from '../../src/lib/teaching/assetContract'

const ASSET_DIR = path.join(__dirname, '..', '..', 'src', 'lib', 'teaching', 'assets')
const DOCS_ROOT = path.join(__dirname, '..', '..', 'docs')

// docs/{subject}/kg/graph.json's directory name is not always the runtime
// subject slug — same mapping curriculumKgRegistration.test.ts uses.
const DIR_TO_SUBJECT_SLUG: Record<string, string> = {
  'computer-science': 'computer_science',
}

/** Every subject with a canonical KG on disk, and how many concepts it has —
 *  independent of whether any seed content has been authored for it yet.
 *  Exported (not just used internally) so contractAuditSubjectCoverage.test.ts
 *  can assert this script's own subject-union guarantee against real
 *  behaviour, not by re-implementing or source-scanning it. */
export function kgSubjects(): Map<string, number> {
  const out = new Map<string, number>()
  if (!existsSync(DOCS_ROOT)) return out
  for (const entry of readdirSync(DOCS_ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const kgPath = path.join(DOCS_ROOT, entry.name, 'kg', 'graph.json')
    if (!existsSync(kgPath)) continue
    const slug = DIR_TO_SUBJECT_SLUG[entry.name] ?? entry.name
    const raw = JSON.parse(readFileSync(kgPath, 'utf-8')) as { concepts: unknown[] }
    out.set(slug, raw.concepts.length)
  }
  return out
}

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
  /** Total concepts in this subject's canonical KG, if it has one on disk.
   *  null for a subjectSlug that appears in seed content but has no matching
   *  docs/{subject}/kg/graph.json (should not happen for a real subject, and
   *  is itself worth investigating if it ever does). */
  kgConceptCount: number | null
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
  // Defaults to the contract. A value below it would report PASS on pairs the
  // contract itself calls short, so it is clamped rather than trusted.
  const minRaw = argv.includes('--min') ? Number(argv[argv.indexOf('--min') + 1]) : MIN_CLOSED_CHOICE_PROBES
  const minProbes = Number.isFinite(minRaw) ? Math.max(MIN_CLOSED_CHOICE_PROBES, Math.floor(minRaw)) : MIN_CLOSED_CHOICE_PROBES

  const { explanations, probes } = await load()
  const kgCounts = kgSubjects()
  const subjects = [...new Set([
    ...explanations.map((e) => e.subjectSlug),
    ...probes.map((p) => p.subjectSlug),
    ...kgCounts.keys(),
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
    const short = [...taught].filter((k) => (gradeable.get(k) ?? 0) < minProbes)
    reports.push({
      subject,
      kgConceptCount: kgCounts.get(subject) ?? null,
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
      measuredAgainst: { minGradeableProbes: minProbes },
      measuredAt: new Date().toISOString(),
      source: 'seed corpus on disk (NOT the production database)',
      reports,
    }, null, 2))
    return
  }

  console.log(`ASSET CONTRACT AUDIT — seed corpus on disk, per (concept, gradeBand)`)
  console.log(`contract: >= ${MIN_EXPLANATIONS} explanation, >= ${MIN_CLOSED_CHOICE_PROBES} gradeable probes`)
  if (minProbes !== MIN_CLOSED_CHOICE_PROBES) {
    console.log(`measured against a raised bar: >= ${minProbes} gradeable probes (--min)`)
  }
  console.log('')
  const pad = (s: string | number, n: number) => String(s).padEnd(n)
  console.log(
    pad('subject', 18) + pad('kg concepts', 12) + pad('authored', 10) + pad('pairs', 8) +
    pad('at contract', 13) + pad('short', 8) + 'never quizzable',
  )
  for (const r of reports) {
    const kgCol = r.kgConceptCount === null ? '?' : String(r.kgConceptCount)
    console.log(
      pad(r.subject, 18) + pad(kgCol, 12) + pad(r.conceptsExplained, 10) + pad(r.taughtPairs, 8) +
      pad(r.pairsAtContract, 13) + pad(r.pairsShort, 8) + r.pairsWithZeroProbes,
    )
    if (r.kgConceptCount !== null && r.conceptsExplained === 0) {
      console.log(`  ^ ${r.subject}: registered KG with 0 authored concepts — not started yet`)
    }
  }
  for (const r of reports.filter((x) => x.pairsShort > 0)) {
    console.log(`\n${r.subject} — worst ${r.worst.length} of ${r.pairsShort}:`)
    for (const w of r.worst) {
      console.log(`  ${w.pair}  gradeable=${w.gradeable} openRecall=${w.openRecall}`)
    }
  }
}

// Guarded so this module is safely importable by a test (e.g. for
// kgSubjects()) without triggering the CLI run as a side effect of import.
if (require.main === module) {
  main().catch((err) => { console.error(err); process.exit(1) })
}
