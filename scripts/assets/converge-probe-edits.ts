/**
 * CONVERGE AN EDITED PROBE INTO PRODUCTION — safe, explicit, reversible.
 *
 * The asset bootstrap is create-only (docs/history/mathematics-and-physics-e2e.md,
 * 2026-10-02): a corrected authored probe keeps its canonicalSlug, so the
 * production row keeps the OLD stem/choices/key until something rewrites it.
 * CHEM-091/CHEM-076/CHEM-096 (2026-10-05) were wrong answer keys still live for
 * exactly this reason.
 *
 *   # 1. read-only: list every ACTIVE probe whose stem/choices/key differ from the corpus
 *   npx tsx scripts/assets/converge-probe-edits.ts --subject chemistry
 *
 *   # 2. update ONLY the named slugs; writes a JSON backup of the old values first
 *   npx tsx scripts/assets/converge-probe-edits.ts --subject chemistry --apply \
 *     --slugs chem.alc.diols:step_check:en:high,chem.coord.nomenclature:checkpoint:en:undergraduate
 *
 *   # 3. undo: put the backed-up values back
 *   npx tsx scripts/assets/converge-probe-edits.ts --restore backups/probe-converge-<ts>.json
 *
 * Touches only `probe_assets.stem`, `choices`, `correctValue` of rows whose
 * slug was named AND that the read-only pass found drifted. Never creates,
 * deletes or re-statuses an identity, never reads learner data. Needs
 * DATABASE_URL. Egress: one query per 500 slugs of one subject.
 */
import { readdirSync, writeFileSync, readFileSync, mkdirSync } from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { buildProbeSlugResolver } from '../../src/lib/teaching/assets/brainSeedAssets'

type CorpusProbe = {
  conceptId: string; subjectSlug: string; probeKind: string; gradeBand: never; difficulty: never
  stem: string; choices?: Array<{ text: string; isCorrect?: boolean }>; correctValue?: string
}

const arg = (name: string) => {
  const i = process.argv.indexOf(name)
  return i >= 0 ? process.argv[i + 1] : undefined
}

/** Every exported probe array under src/lib/teaching/assets, whatever its name. */
export async function corpusProbes(subject: string): Promise<CorpusProbe[]> {
  const dir = path.resolve(__dirname, '../../src/lib/teaching/assets')
  const seen = new Set<unknown>()
  const out: CorpusProbe[] = []
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))) {
    const mod = await import(path.join(dir, f))
    for (const value of Object.values(mod)) {
      if (!Array.isArray(value)) continue
      for (const p of value as CorpusProbe[]) {
        if (!p || seen.has(p) || typeof p.stem !== 'string' || typeof p.probeKind !== 'string') continue
        if (p.subjectSlug !== subject) continue
        seen.add(p)
        out.push(p)
      }
    }
  }
  return out
}

const normChoices = (c: unknown) => JSON.stringify(
  (Array.isArray(c) ? c : []).map((x: { text?: unknown; isCorrect?: unknown }) => [String(x?.text ?? ''), x?.isCorrect === true]),
)

async function main() {
  const prisma = new PrismaClient()
  try {
    const restore = arg('--restore')
    if (restore) {
      const rows = JSON.parse(readFileSync(restore, 'utf8')) as Array<{ assetId: string; slug: string; stem: string; choices: unknown; correctValue: string | null }>
      for (const r of rows) {
        await prisma.probeAsset.update({ where: { assetId: r.assetId }, data: { stem: r.stem, choices: r.choices as never, correctValue: r.correctValue } })
        console.log(`restored ${r.slug}`)
      }
      return
    }
    const subject = arg('--subject')
    if (!subject) throw new Error('--subject <slug> is required')
    const probes = await corpusProbes(subject)
    const slugOf = buildProbeSlugResolver(probes as never)
    const bySlug = new Map(probes.map((p) => [slugOf(p as never), p]))
    const slugs = [...bySlug.keys()]
    const drift: Array<{ slug: string; assetId: string; prod: { stem: string; choices: unknown; correctValue: string | null } }> = []
    for (let i = 0; i < slugs.length; i += 500) {
      const rows = await prisma.assetIdentity.findMany({
        where: { canonicalSlug: { in: slugs.slice(i, i + 500) }, status: 'ACTIVE' },
        select: { assetId: true, canonicalSlug: true, probeAsset: { select: { stem: true, choices: true, correctValue: true } } },
      })
      for (const r of rows) {
        const want = bySlug.get(r.canonicalSlug)
        if (!want || !r.probeAsset) continue
        const differs = r.probeAsset.stem !== want.stem
          || normChoices(r.probeAsset.choices) !== normChoices(want.choices)
          || (want.correctValue !== undefined && r.probeAsset.correctValue !== want.correctValue)
        if (differs) drift.push({ slug: r.canonicalSlug, assetId: r.assetId, prod: r.probeAsset })
      }
    }
    console.log(JSON.stringify({ subject, corpusProbes: probes.length, drifted: drift.length }))
    for (const d of drift) console.log(`DRIFT ${d.slug}`)
    if (!process.argv.includes('--apply')) return

    const named = new Set((arg('--slugs') ?? '').split(',').map((s) => s.trim()).filter(Boolean))
    if (named.size === 0) throw new Error('--apply needs --slugs a,b (explicit list; nothing is converged implicitly)')
    const targets = drift.filter((d) => named.has(d.slug))
    const missing = [...named].filter((s) => !targets.some((t) => t.slug === s))
    if (missing.length) console.log(`not drifted or not found, skipped: ${missing.join(', ')}`)
    const dir = path.resolve(process.cwd(), 'backups')
    mkdirSync(dir, { recursive: true })
    const backup = path.join(dir, `probe-converge-${Date.now()}.json`)
    writeFileSync(backup, JSON.stringify(targets.map((t) => ({ assetId: t.assetId, slug: t.slug, ...t.prod })), null, 2))
    console.log(`backup written: ${backup}`)
    for (const t of targets) {
      const want = bySlug.get(t.slug)!
      await prisma.probeAsset.update({
        where: { assetId: t.assetId },
        data: { stem: want.stem, choices: (want.choices ?? null) as never, ...(want.correctValue !== undefined ? { correctValue: want.correctValue } : {}) },
      })
      console.log(`converged ${t.slug}`)
    }
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  main().catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exitCode = 1 })
}
