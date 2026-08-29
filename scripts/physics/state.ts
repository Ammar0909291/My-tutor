/**
 * PHYSICS STATE — one command, one set of numbers, no re-derivation.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * Built for the Physics Teachability Program on the same reasoning that
 * produced `scripts/math/state.ts`: every session that touches a subject
 * re-counts the same things by hand, and the counts recorded in CLAUDE.md
 * drift anyway. Read this script's output before making any claim about
 * physics progress.
 *
 * Measured 2026-08-29, the first run corrected the program's own founding
 * assumption. The brief that commissioned this work ranked "asset contract
 * compliance" as the highest-leverage gap. It is not a gap at all: all 238
 * physics concepts hold ACTIVE content, and every (concept, band) pair that
 * carries teaching content meets `assetContract.ts` v1. The real shortfall is
 * VISUAL — measured below, and it is severe.
 *
 * Repo-side counts always run and need no database. Database-side counts run
 * only when DATABASE_URL is present and are reported as UNAVAILABLE otherwise —
 * never guessed, never carried over from a previous run.
 *
 * Read-only in both halves: it opens files and issues SELECTs. It writes
 * nothing anywhere except the JSON it prints (and `--out`, if asked).
 *
 * ── ONE MEASUREMENT TRAP, RECORDED SO IT IS NOT RE-DUG ──────────────────────
 * The asset contract is about EXPLANATION and PROBE assets. A VISUAL asset
 * carries a `gradeBand` too, so a naive `group by (conceptId, gradeBand)` over
 * every family invents a (concept, band) pair holding 0 explanations and 0
 * probes and reports it as a contract shortfall. It is an artefact of the
 * query, not a content gap. `phys.meas.unit-conversion` ADULT is exactly this
 * case — it exists only because that concept has an ACTIVE visual. The DB half
 * below restricts the inventory to EXPLANATION and PROBE for that reason.
 * `scripts/math/state.ts` does not, because mathematics had no visuals when it
 * was written; its count will drift the moment one is promoted.
 */
import * as fs from 'fs'
import * as path from 'path'
import { lookupConceptVisualBinding } from '../../src/lib/teaching/visualRegistry'
import { isRetiredVisualBinding } from '../../src/lib/teaching/visual/retired'

const ROOT = process.cwd()
const KG = path.join(ROOT, 'docs/physics/kg/graph.json')
const BLUEPRINTS = path.join(ROOT, 'docs/curriculum/blueprints')
const EB = path.join(ROOT, 'educational-brain/concepts/physics')

interface KgConcept {
  id: string
  name?: string
  difficulty?: string
}

interface DomainRow {
  domain: string
  kg: number
  blueprints: number
  eb: number
  visualExact: number
  visualDomain: number
  visualNone: number
  visualRetired: number
}

function kgConcepts(): KgConcept[] {
  const raw = JSON.parse(fs.readFileSync(KG, 'utf-8')) as { concepts: KgConcept[] }
  return raw.concepts
}

function domainOf(conceptId: string): string {
  const parts = conceptId.split('.')
  return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : conceptId
}

/**
 * VISUAL COVERAGE — the measurement this program exists for.
 *
 * A scripted "visually-dependent learner" run across 30 advanced/expert/
 * research physics concepts (2026-08-29) found 13 of 30 produced no figure at
 * all despite the learner asking every session, and that sessions which did
 * get a figure scored 7-9/10 against 2-6/10 for those that did not. So the
 * question "which concepts can actually produce a figure" is the single most
 * decision-relevant number about physics, and nothing was reporting it.
 *
 * Three tiers are counted separately BECAUSE THEY ARE NOT EQUIVALENT, and
 * collapsing them is how "72% of concepts are covered" gets claimed:
 *
 *   exact   — a human named THIS concept in CONCEPT_VISUALS. A real binding.
 *   domain  — a DOMAIN_VISUALS prefix rule matched. The figure is generic to
 *             the domain and was NOT chosen for this concept. It is better
 *             than nothing and it is not curation; the registry's own
 *             `lookupConceptVisualBinding` records the distinction for exactly
 *             this reason, so this script keeps it.
 *   none    — no binding at any tier. Without AI scene generation enabled,
 *             these concepts cannot show a learner anything.
 *
 * `retired` is counted ACROSS the tiers, not as a fourth bucket: a retired
 * binding is one a human withdrew because the figure was wrong for the
 * concept. It is deliberately still absent from the learner's screen.
 */
function visualCoverage(concepts: KgConcept[]) {
  const rows = concepts.map((c) => {
    const binding = lookupConceptVisualBinding(c.id)
    return {
      id: c.id,
      difficulty: c.difficulty ?? 'unknown',
      tier: binding?.tier ?? 'none',
      scope: binding?.scope ?? null,
      primary: binding?.entry.primary ?? null,
      sceneGenerator: binding?.entry.sceneGenerator ?? null,
      retired: isRetiredVisualBinding(c.id),
    }
  })

  const byDifficulty = new Map<string, { total: number; exact: number; domain: number; none: number }>()
  for (const r of rows) {
    const d = byDifficulty.get(r.difficulty) ?? { total: 0, exact: 0, domain: 0, none: 0 }
    d.total += 1
    if (r.tier === 'exact') d.exact += 1
    else if (r.tier === 'domain') d.domain += 1
    else d.none += 1
    byDifficulty.set(r.difficulty, d)
  }

  return {
    rows,
    totals: {
      exact: rows.filter((r) => r.tier === 'exact').length,
      domain: rows.filter((r) => r.tier === 'domain').length,
      none: rows.filter((r) => r.tier === 'none').length,
      retired: rows.filter((r) => r.retired).length,
      sceneGenerator: rows.filter((r) => r.sceneGenerator).length,
    },
    byDifficulty: Object.fromEntries([...byDifficulty.entries()].sort()),
    noBinding: rows.filter((r) => r.tier === 'none').map((r) => r.id).sort(),
  }
}

function repoState() {
  const concepts = kgConcepts()
  const kgIds = new Set(concepts.map((c) => c.id))

  const blueprintIds = new Set(
    fs.existsSync(BLUEPRINTS)
      ? fs
          .readdirSync(BLUEPRINTS)
          .filter((f) => f.startsWith('phys.') && f.endsWith('.md'))
          .map((f) => f.replace(/\.md$/, ''))
      : [],
  )
  const ebIds = new Set(
    fs.existsSync(EB)
      ? fs.readdirSync(EB).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
      : [],
  )

  const visuals = visualCoverage(concepts)
  const visualById = new Map(visuals.rows.map((r) => [r.id, r]))

  const byDomain = new Map<string, DomainRow>()
  const byDifficulty = new Map<string, number>()
  for (const c of concepts) {
    const d = domainOf(c.id)
    const row =
      byDomain.get(d) ??
      { domain: d, kg: 0, blueprints: 0, eb: 0, visualExact: 0, visualDomain: 0, visualNone: 0, visualRetired: 0 }
    row.kg += 1
    if (blueprintIds.has(c.id)) row.blueprints += 1
    if (ebIds.has(c.id)) row.eb += 1
    const v = visualById.get(c.id)
    if (v?.tier === 'exact') row.visualExact += 1
    else if (v?.tier === 'domain') row.visualDomain += 1
    else row.visualNone += 1
    if (v?.retired) row.visualRetired += 1
    byDomain.set(d, row)

    const diff = c.difficulty ?? 'unknown'
    byDifficulty.set(diff, (byDifficulty.get(diff) ?? 0) + 1)
  }

  const domains = [...byDomain.values()].sort((a, b) => b.kg - a.kg)

  // Integrity: authored files naming a concept the KG does not have. A
  // non-empty list here is a real defect, not a rounding difference.
  const orphanBlueprints = [...blueprintIds].filter((id) => !kgIds.has(id)).sort()
  const orphanEb = [...ebIds].filter((id) => !kgIds.has(id)).sort()

  return {
    kgConcepts: concepts.length,
    blueprints: [...blueprintIds].filter((id) => kgIds.has(id)).length,
    educationalBrain: [...ebIds].filter((id) => kgIds.has(id)).length,
    difficultyBreakdown: Object.fromEntries([...byDifficulty.entries()].sort()),
    visuals,
    domains,
    integrity: { orphanBlueprints, orphanEb },
  }
}

/**
 * Serving state, per (concept, band), against the asset contract. Requires a
 * database. Returns null (never zeros) when there is none, so an absent
 * database can never be mistaken for an empty catalogue — the exact confusion
 * that would make this script dangerous.
 *
 * Restricted to EXPLANATION and PROBE (see the header note on the VISUAL
 * artefact). Bands are read from the `gradeBand` COLUMN rather than parsed out
 * of `canonicalSlug`: live-captured rows carry a 3-segment slug with no band
 * segment, so slug-parsing silently files them all under one empty band.
 */
async function servingState(): Promise<unknown | null> {
  if (!process.env.DATABASE_URL) return null
  const { PrismaClient } = await import('@prisma/client')
  const db = new PrismaClient()
  try {
    const { MIN_CLOSED_CHOICE_PROBES, MIN_EXPLANATIONS, ASSET_CONTRACT_VERSION } = await import(
      '../../src/lib/teaching/assetContract'
    )

    const rows = await db.$queryRawUnsafe<
      { conceptid: string; band: string; explanations: bigint; closed: bigint; open: bigint }[]
    >(`
      select ai."conceptId" as conceptid,
             ai."gradeBand"::text as band,
             count(*) filter (where ea."assetId" is not null) as explanations,
             count(*) filter (where pa."assetId" is not null
                              and jsonb_array_length(coalesce(pa.choices,'[]'::jsonb)) >= 2) as closed,
             count(*) filter (where pa."assetId" is not null
                              and jsonb_array_length(coalesce(pa.choices,'[]'::jsonb)) < 2) as open
      from asset_identity ai
      left join explanation_assets ea on ea."assetId" = ai."assetId"
      left join probe_assets pa on pa."assetId" = ai."assetId"
      where ai."conceptId" like 'phys.%'
        and ai.status = 'ACTIVE'
        and ai.family::text in ('EXPLANATION','PROBE')
      group by 1, 2
    `)

    const visualRows = await db.$queryRawUnsafe<{ conceptid: string; status: string }[]>(`
      select ai."conceptId" as conceptid, ai.status::text as status
      from asset_identity ai
      where ai."conceptId" like 'phys.%' and ai.family::text = 'VISUAL'
    `)

    const perConcept = new Map<string, Record<string, { explanations: number; closed: number; open: number }>>()
    for (const r of rows) {
      const entry = perConcept.get(r.conceptid) ?? {}
      entry[r.band || '(none)'] = {
        explanations: Number(r.explanations),
        closed: Number(r.closed),
        open: Number(r.open),
      }
      perConcept.set(r.conceptid, entry)
    }

    let meetsContract = 0
    const belowContract: { conceptId: string; band: string; explanations: number; closed: number }[] = []
    for (const [conceptId, bands] of perConcept) {
      for (const [band, inv] of Object.entries(bands)) {
        if (inv.explanations >= MIN_EXPLANATIONS && inv.closed >= MIN_CLOSED_CHOICE_PROBES) meetsContract += 1
        else belowContract.push({ conceptId, band, explanations: inv.explanations, closed: inv.closed })
      }
    }
    belowContract.sort((a, b) => a.closed - b.closed || a.conceptId.localeCompare(b.conceptId))

    const kgIds = new Set(kgConcepts().map((c) => c.id))
    const withoutAnyAsset = [...kgIds].filter((id) => !perConcept.has(id)).sort()

    return {
      contractVersion: ASSET_CONTRACT_VERSION,
      conceptsWithAnyActiveAsset: perConcept.size,
      conceptsInKgWithNoActiveAsset: withoutAnyAsset,
      conceptBandsMeetingContract: meetsContract,
      conceptBandsBelowContract: belowContract.length,
      belowContract: belowContract.slice(0, 25),
      belowContractTruncated: Math.max(0, belowContract.length - 25),
      visualAssets: {
        active: visualRows.filter((v) => v.status === 'ACTIVE').length,
        draft: visualRows.filter((v) => v.status === 'DRAFT').length,
        total: visualRows.length,
      },
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
    subject: 'physics',
    repo,
    serving: serving ?? 'UNAVAILABLE — no DATABASE_URL in this environment',
  }
  const json = JSON.stringify(state, null, 2)

  const outIdx = process.argv.indexOf('--out')
  if (outIdx >= 0 && process.argv[outIdx + 1]) {
    fs.writeFileSync(process.argv[outIdx + 1], json + '\n')
    console.log(`written: ${process.argv[outIdx + 1]}`)
  }

  if (!process.argv.includes('--summary-only')) console.log(json)

  const v = repo.visuals.totals
  console.log('\n── SUMMARY ──')
  console.log(`KG                 ${repo.kgConcepts}`)
  console.log(`Blueprints         ${repo.blueprints}/${repo.kgConcepts}`)
  console.log(`Educational Brain  ${repo.educationalBrain}/${repo.kgConcepts}`)
  console.log(
    `Visual bindings    exact ${v.exact} / domain-default ${v.domain} / NONE ${v.none}` +
      `  (retired ${v.retired}, scene-gen ${v.sceneGenerator})`,
  )
  for (const [diff, d] of Object.entries(repo.visuals.byDifficulty)) {
    const row = d as { total: number; exact: number; domain: number; none: number }
    console.log(`  ${diff.padEnd(13)} ${String(row.total).padStart(3)} concepts — exact ${row.exact}, domain ${row.domain}, none ${row.none}`)
  }
  if (repo.integrity.orphanBlueprints.length || repo.integrity.orphanEb.length) {
    console.log(
      `INTEGRITY: ${repo.integrity.orphanBlueprints.length} orphan blueprints, ${repo.integrity.orphanEb.length} orphan EB entries`,
    )
  }
  if (serving === null) {
    console.log('Serving            UNAVAILABLE (no DATABASE_URL)')
  } else {
    const s = serving as {
      conceptsWithAnyActiveAsset: number
      conceptBandsMeetingContract: number
      conceptBandsBelowContract: number
      visualAssets: { active: number; draft: number }
    }
    console.log(`Serving concepts   ${s.conceptsWithAnyActiveAsset}`)
    console.log(`Contract           ${s.conceptBandsMeetingContract} pairs meet, ${s.conceptBandsBelowContract} below`)
    console.log(`Visual assets      ${s.visualAssets.active} ACTIVE, ${s.visualAssets.draft} DRAFT`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
