/**
 * Regenerate the probe-depth worklist: every (concept, gradeBand) pair whose
 * GRADEABLE probe pool is below the depth target.
 *
 * WHY THIS EXISTS AND WHY IT READS DISK. The first worklist was generated with
 * a SQL count over `asset_identity` rows. That count includes probes a mastery
 * gate cannot grade — `short_answer` and `checkpoint` rows carry fewer than two
 * choices, and correctness for free text has no deterministic source, which is
 * why `contract-audit.ts` has always excluded them. Measured 2026-08-30 the two
 * bases disagree badly: `phys.wave.beats` HIGH holds seven PROBE rows and three
 * gradeable ones. The row count reported 123 physics pairs at exactly three; the
 * gradeable count reports 235.
 *
 * It reads the SEED CORPUS rather than the database for the same reason
 * `contract-audit.ts` does: no session in this environment has a DATABASE_URL,
 * the corpus is what an authoring batch actually changes, and the cold-start
 * bootstrap converges production onto it. Production can hold rows this scan
 * cannot see (older seeds, AI_AUTHORED live capture), so a pair at target here
 * is at or above target there — never below.
 *
 * Run: npx tsx scripts/assets/probe-depth-worklist.ts [--min 5] [--subject phys,chem] [--csv out.csv]
 */
import { readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { MIN_CLOSED_CHOICE_PROBES } from '../../src/lib/teaching/assetContract'

const ASSET_DIR = path.join(__dirname, '..', '..', 'src', 'lib', 'teaching', 'assets')
const DEFAULT_TARGET = 5

interface Probe { conceptId?: string; gradeBand?: unknown; choices?: unknown }

/** The gate's own rule, kept identical to `contract-audit.ts`. */
const isGradeable = (p: Probe) => Array.isArray(p.choices) && p.choices.length >= 2

async function main() {
  const argv = process.argv.slice(2)
  const arg = (name: string) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : undefined)
  const rawTarget = Number(arg('--min') ?? DEFAULT_TARGET)
  const target = Number.isFinite(rawTarget)
    ? Math.max(MIN_CLOSED_CHOICE_PROBES, Math.floor(rawTarget))
    : DEFAULT_TARGET
  const prefixes = (arg('--subject') ?? 'phys,chem').split(',').map((s) => s.trim()).filter(Boolean)
  const csvOut = arg('--csv')

  const files = readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  const counts = new Map<string, number>()
  for (const f of files) {
    const mod = await import(path.join(ASSET_DIR, f))
    for (const [name, value] of Object.entries(mod)) {
      if (!Array.isArray(value) || !name.endsWith('PROBES')) continue
      for (const p of value as Probe[]) {
        if (typeof p.conceptId !== 'string') continue
        const prefix = p.conceptId.split('.')[0]
        if (!prefixes.includes(prefix)) continue
        const k = `${prefix},${p.conceptId},${String(p.gradeBand)}`
        // Every pair the corpus mentions is a row, gradeable or not — a pair
        // whose only probes are open-recall must appear with a 0, not vanish.
        counts.set(k, (counts.get(k) ?? 0) + (isGradeable(p) ? 1 : 0))
      }
    }
  }

  const rows = [...counts].filter(([, n]) => n < target).sort(([a], [b]) => a.localeCompare(b))
  const csv = ['subject,conceptId,gradeBand,gradeableProbes,needed']
    .concat(rows.map(([k, n]) => `${k},${n},${target - n}`))
    .join('\n')

  if (csvOut) {
    writeFileSync(csvOut, csv + '\n')
    console.log(`wrote ${rows.length} rows to ${csvOut}`)
  } else {
    console.log(csv)
  }

  const bySubject = new Map<string, { pairs: number; probes: number }>()
  for (const [k, n] of rows) {
    const s = k.split(',')[0]
    const cur = bySubject.get(s) ?? { pairs: 0, probes: 0 }
    cur.pairs += 1
    cur.probes += target - n
    bySubject.set(s, cur)
  }
  console.error(`\ntarget >= ${target} gradeable probes per (concept, gradeBand)`)
  for (const [s, v] of [...bySubject].sort()) {
    console.error(`  ${s}: ${v.pairs} pairs short, ${v.probes} probes to author`)
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
