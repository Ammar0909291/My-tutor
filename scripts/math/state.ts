/**
 * MATHEMATICS STATE — one command, one set of numbers, no re-derivation.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * Every session that has touched this subject has re-counted the same things by
 * hand, and the counts recorded in project memory drifted anyway. Measured
 * 2026-08-18, three figures in CLAUDE.md were stale at once: Blueprints were
 * recorded as 529/908 when they are complete at 908/908; Educational Brain
 * entries as 224 when there are 257; math.geom as 56/69 when it is certified.
 * Decisions were being made on all three.
 *
 * Repo-side counts always run and need no database. Database-side counts run
 * only when DATABASE_URL is present and are reported as UNAVAILABLE otherwise —
 * never guessed, never carried over from a previous run.
 *
 * Read-only in both halves: it opens files and issues SELECTs. It writes
 * nothing anywhere except the JSON it prints (and `--out`, if asked).
 */
import * as fs from 'fs'
import * as path from 'path'
import { loadBlueprintContent } from '../../src/lib/curriculum/blueprintLoader'

const ROOT = process.cwd()
const KG = path.join(ROOT, 'docs/mathematics/kg/graph.json')
const BLUEPRINTS = path.join(ROOT, 'docs/curriculum/blueprints')
const EB = path.join(ROOT, 'educational-brain/concepts/mathematics')

interface DomainRow { domain: string; kg: number; blueprints: number; eb: number; ebComplete: boolean }

/**
 * GENERATION READINESS — can a serving asset be MADE for this concept, and from
 * what?
 *
 * Measured 2026-08-18, and the answer corrected a plank of the build strategy.
 * "Blueprints 908/908" is a FILE count. It does not mean 908 concepts carry
 * learner-facing prose:
 *
 *   · 908/908 carry a Misconception Registry (2,595 rows, median 3 per concept)
 *     — an excellent AUTHORING source, and the reason Blueprints stay primary.
 *   · 711/908 yield some "explanation" block from the loader, but 728 of those
 *     2,205 blocks are labelled Learning Objective / Mastery statement. They are
 *     assessment criteria written ABOUT the student ("A student who achieves
 *     mastery identifies which thinking move they are using"), in the third
 *     person. Serving one to a learner would be nonsense.
 *   · 199/908 carry a block actually labelled "Core Explanation" with real
 *     teaching prose — and only 69 of those are on the 245-concept spine.
 *
 * So a serving asset can be EXTRACTED for 199 concepts and must be AUTHORED for
 * the rest, grounded in the misconception registry the Blueprint does supply.
 * This block reports that split so generation is scoped from measurement rather
 * than from the file count.
 */
interface SourceRow { extractable: number; authorable: number; neither: number }

function kgConcepts(): { id: string; name?: string }[] {
  const raw = JSON.parse(fs.readFileSync(KG, 'utf-8')) as { concepts: { id: string; name?: string }[] }
  return raw.concepts
}

function domainOf(conceptId: string): string {
  const parts = conceptId.split('.')
  return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : conceptId
}

function repoState() {
  const concepts = kgConcepts()
  const kgIds = new Set(concepts.map((c) => c.id))

  const blueprintIds = new Set(
    fs.existsSync(BLUEPRINTS)
      ? fs.readdirSync(BLUEPRINTS).filter((f) => f.startsWith('math.') && f.endsWith('.md'))
          .map((f) => f.replace(/\.md$/, ''))
      : [],
  )
  const ebIds = new Set(
    fs.existsSync(EB)
      ? fs.readdirSync(EB).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
      : [],
  )

  const byDomain = new Map<string, DomainRow>()
  for (const c of concepts) {
    const d = domainOf(c.id)
    const row = byDomain.get(d) ?? { domain: d, kg: 0, blueprints: 0, eb: 0, ebComplete: false }
    row.kg += 1
    if (blueprintIds.has(c.id)) row.blueprints += 1
    if (ebIds.has(c.id)) row.eb += 1
    byDomain.set(d, row)
  }
  // Generation readiness. Requires the real blueprint parser, not a regex — a
  // hand-rolled scan of one heading format reported 7 usable blueprints where
  // the loader finds 908, because the corpus carries three schema generations.
  const sources: SourceRow = { extractable: 0, authorable: 0, neither: 0 }
  const spineSources: SourceRow = { extractable: 0, authorable: 0, neither: 0 }
  const SPINE = new Set(['math.found', 'math.arith', 'math.geom', 'math.nt'])
  for (const c of concepts) {
    const r = loadBlueprintContent(c.id)
    const content = r.found ? r.content : null
    const hasLearnerProse = Boolean(
      content?.explanations.some((e) => /^core explanation$/i.test(e.label.trim()) && e.text.trim().length > 200),
    )
    const hasMisconceptions = (content?.misconceptions.length ?? 0) >= 3
    const bucket: keyof SourceRow = hasLearnerProse ? 'extractable' : hasMisconceptions ? 'authorable' : 'neither'
    sources[bucket] += 1
    if (SPINE.has(domainOf(c.id))) spineSources[bucket] += 1
  }

  const domains = [...byDomain.values()].map((r) => ({ ...r, ebComplete: r.eb === r.kg }))
  domains.sort((a, b) => b.kg - a.kg)

  // Integrity: authored files that name a concept the KG does not have. A
  // non-empty list here is a real defect, not a rounding difference.
  const orphanBlueprints = [...blueprintIds].filter((id) => !kgIds.has(id)).sort()
  const orphanEb = [...ebIds].filter((id) => !kgIds.has(id)).sort()

  return {
    kgConcepts: concepts.length,
    blueprints: [...blueprintIds].filter((id) => kgIds.has(id)).length,
    educationalBrain: [...ebIds].filter((id) => kgIds.has(id)).length,
    certifiedDomains: domains.filter((d) => d.ebComplete).map((d) => d.domain),
    generationSources: { all: sources, spine245: spineSources },
    domains,
    integrity: { orphanBlueprints, orphanEb },
  }
}

/**
 * Serving state, per concept, against the asset contract. Requires a database.
 * Returns null (never zeros) when there is none, so an absent database can
 * never be mistaken for an empty catalogue — the exact confusion that would
 * make this script dangerous.
 */
async function servingState(): Promise<unknown | null> {
  if (!process.env.DATABASE_URL) return null
  const { PrismaClient } = await import('@prisma/client')
  const db = new PrismaClient()
  try {
    const { MIN_CLOSED_CHOICE_PROBES, MIN_EXPLANATIONS, ASSET_CONTRACT_VERSION } =
      await import('../../src/lib/teaching/assetContract')

    const rows = await db.$queryRawUnsafe<{
      conceptid: string; band: string; explanations: bigint; closed: bigint; open: bigint
    }[]>(`
      select ai."conceptId" as conceptid,
             split_part(ai."canonicalSlug", ':', 4) as band,
             count(*) filter (where ea."assetId" is not null) as explanations,
             count(*) filter (where pa."assetId" is not null
                              and jsonb_array_length(coalesce(pa.choices,'[]'::jsonb)) >= 2) as closed,
             count(*) filter (where pa."assetId" is not null
                              and jsonb_array_length(coalesce(pa.choices,'[]'::jsonb)) < 2) as open
      from asset_identity ai
      left join explanation_assets ea on ea."assetId" = ai."assetId"
      left join probe_assets pa on pa."assetId" = ai."assetId"
      where ai."conceptId" like 'math.%' and ai.status = 'ACTIVE'
      group by 1, 2
    `)

    const perConcept = new Map<string, { bands: Record<string, { explanations: number; closed: number; open: number }> }>()
    for (const r of rows) {
      const entry = perConcept.get(r.conceptid) ?? { bands: {} }
      entry.bands[r.band || '(none)'] = {
        explanations: Number(r.explanations), closed: Number(r.closed), open: Number(r.open),
      }
      perConcept.set(r.conceptid, entry)
    }

    let meetsContract = 0
    const belowContract: { conceptId: string; band: string; closed: number }[] = []
    for (const [conceptId, entry] of perConcept) {
      for (const [band, inv] of Object.entries(entry.bands)) {
        if (inv.explanations >= MIN_EXPLANATIONS && inv.closed >= MIN_CLOSED_CHOICE_PROBES) meetsContract += 1
        else belowContract.push({ conceptId, band, closed: inv.closed })
      }
    }
    belowContract.sort((a, b) => a.closed - b.closed || a.conceptId.localeCompare(b.conceptId))

    return {
      contractVersion: ASSET_CONTRACT_VERSION,
      conceptsWithAnyActiveAsset: perConcept.size,
      conceptBandsMeetingContract: meetsContract,
      conceptBandsBelowContract: belowContract.length,
      belowContract: belowContract.slice(0, 25),
      belowContractTruncated: Math.max(0, belowContract.length - 25),
    }
  } finally {
    await db.$disconnect()
  }
}

async function main() {
  const repo = repoState()
  const serving = await servingState()
  const state = {
    generatedAt: new Date().toISOString(),
    subject: 'mathematics',
    repo,
    serving: serving ?? 'UNAVAILABLE — no DATABASE_URL in this environment',
  }
  const json = JSON.stringify(state, null, 2)

  const outIdx = process.argv.indexOf('--out')
  if (outIdx >= 0 && process.argv[outIdx + 1]) {
    fs.writeFileSync(process.argv[outIdx + 1], json + '\n')
    console.log(`written: ${process.argv[outIdx + 1]}`)
  }

  console.log(json)
  console.log('\n── SUMMARY ──')
  console.log(`KG                 ${repo.kgConcepts}/${repo.kgConcepts}`)
  console.log(`Blueprints         ${repo.blueprints}/${repo.kgConcepts}`)
  console.log(`Educational Brain  ${repo.educationalBrain}/${repo.kgConcepts}`)
  console.log(`EB-certified domains (${repo.certifiedDomains.length}): ${repo.certifiedDomains.join(', ') || 'none'}`)
  const g = repo.generationSources
  console.log(`Serving source     extract ${g.all.extractable} / author ${g.all.authorable} / neither ${g.all.neither}`)
  console.log(`  on 245 spine     extract ${g.spine245.extractable} / author ${g.spine245.authorable} / neither ${g.spine245.neither}`)
  if (repo.integrity.orphanBlueprints.length || repo.integrity.orphanEb.length) {
    console.log(`INTEGRITY: ${repo.integrity.orphanBlueprints.length} orphan blueprints, ${repo.integrity.orphanEb.length} orphan EB entries`)
  }
  if (serving === null) console.log('Serving            UNAVAILABLE (no DATABASE_URL)')
}

main().catch((err) => { console.error(err); process.exit(1) })
