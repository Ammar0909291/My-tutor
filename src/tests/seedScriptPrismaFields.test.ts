/**
 * P-11 — the canonical seeder's revive path could never reach the database.
 *
 * `scripts/brain/seed-knowledge-assets.ts` reviving a DEPRECATED/RETIRED asset
 * called `prisma.assetIdentity.update({ where: { id: existing.id } })`. The
 * model's primary key is `assetId`; the generated client has no `id` field at
 * all, so `existing.id` was `undefined` and the call could not be built.
 *
 * It survived because `tsconfig.json` excludes `scripts`, so the repository's
 * type check never compiled this file. Revival is the ONLY content-refresh path
 * the seeding pipeline has (ledger §9g), so for its whole life the pipeline
 * could create assets and never correct one — which is why P-8's corpus drift
 * had no working automated repair in any environment.
 *
 * TWO LAYERS, deliberately:
 *   1. this test — fast, runs in the ordinary suite, and validates the where-key
 *      of EVERY Prisma `update` in the seeder against the generated client's own
 *      runtime metadata, so the check cannot drift from the schema;
 *   2. `npm run typecheck:seed-script` (tsconfig.seed-script.json) — the real
 *      compiler on the one file the project excludes. Measured: it reports 4
 *      errors on the pre-fix source at lines 165 and 237, and is clean after.
 *
 * Layer 1 alone would not have caught a mistyped `data` field, and layer 2 alone
 * would not run in the suite. Together this class of error cannot pass silently.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Prisma } from '@prisma/client'

const SEEDER_PATH = 'scripts/brain/seed-knowledge-assets.ts'
const SEEDER = readFileSync(join(process.cwd(), SEEDER_PATH), 'utf8')

/** The generated client's own datamodel — not a copy of the schema. */
const MODELS = (Prisma as unknown as {
  dmmf: { datamodel: { models: Array<{ name: string; fields: Array<{ name: string; isId: boolean; isUnique: boolean }> }> } }
}).dmmf.datamodel.models

function modelByDelegate(delegate: string) {
  // `prisma.assetIdentity` -> model `AssetIdentity`
  const wanted = delegate.charAt(0).toUpperCase() + delegate.slice(1)
  return MODELS.find((m) => m.name === wanted)
}

/** Every `prisma.<delegate>.update({ where: { <key>: … } })` in the seeder. */
function updateWhereKeys(): Array<{ delegate: string; key: string; line: number }> {
  const out: Array<{ delegate: string; key: string; line: number }> = []
  const re = /prisma\.(\w+)\.update\(\{\s*\n\s*where:\s*\{\s*(\w+)\s*:/g
  for (const m of SEEDER.matchAll(re)) {
    const line = SEEDER.slice(0, m.index ?? 0).split('\n').length
    out.push({ delegate: m[1], key: m[2], line })
  }
  return out
}

describe('the seeder addresses rows by a field the generated client actually has', () => {
  it('finds the update calls at all — the scan is not vacuously green', () => {
    const found = updateWhereKeys()
    expect(found.length).toBeGreaterThanOrEqual(2) // explanation revive + probe revive
    expect(found.every((f) => f.delegate === 'assetIdentity')).toBe(true)
  })

  it('every where-key is a real field on its model', () => {
    for (const { delegate, key, line } of updateWhereKeys()) {
      const model = modelByDelegate(delegate)
      expect(model, `${SEEDER_PATH}:${line} — unknown delegate prisma.${delegate}`).toBeTruthy()
      const names = model!.fields.map((f) => f.name)
      expect(names, `${SEEDER_PATH}:${line} — where { ${key} } is not a field of ${model!.name}`)
        .toContain(key)
    }
  })

  it('every where-key uniquely identifies a row (an id or a unique field)', () => {
    for (const { delegate, key, line } of updateWhereKeys()) {
      const model = modelByDelegate(delegate)!
      const field = model.fields.find((f) => f.name === key)!
      expect(field.isId || field.isUnique,
        `${SEEDER_PATH}:${line} — where { ${key} } does not uniquely identify a ${model.name}`)
        .toBe(true)
    }
  })

  it('AssetIdentity is keyed on assetId and has no field called id', () => {
    // The specific fact the defect contradicted. Asserted against the generated
    // client so it tracks the schema rather than restating it.
    const m = MODELS.find((x) => x.name === 'AssetIdentity')!
    expect(m.fields.filter((f) => f.isId).map((f) => f.name)).toEqual(['assetId'])
    expect(m.fields.some((f) => f.name === 'id')).toBe(false)
  })

  it('the seeder no longer reads `existing.id` anywhere', () => {
    // `existing` is a findFirst result on AssetIdentity, so `.id` is always
    // undefined. This is the read half of the same defect.
    expect(SEEDER).not.toMatch(/existing\.id\b/)
    expect(SEEDER).toMatch(/existing\.assetId\b/)
  })
})

describe('the excluded-script type gate exists and is wired', () => {
  it('tsconfig.json still excludes scripts — the reason this gate is needed', () => {
    const tsconfig = readFileSync(join(process.cwd(), 'tsconfig.json'), 'utf8')
    expect(tsconfig).toMatch(/"scripts"/)
  })

  it('a scoped config type-checks the seeder with the project options', () => {
    const cfg = JSON.parse(readFileSync(join(process.cwd(), 'tsconfig.seed-script.json'), 'utf8'))
    expect(cfg.extends).toBe('./tsconfig.json')
    expect(cfg.include).toContain(SEEDER_PATH)
    expect(cfg.exclude).toEqual([])
  })

  it('package.json exposes it as a command', () => {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))
    expect(pkg.scripts['typecheck:seed-script']).toContain('tsconfig.seed-script.json')
  })
})
