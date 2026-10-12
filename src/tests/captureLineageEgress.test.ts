/**
 * EGRESS-7 — a generated-asset capture reads TWO lineage rows, not the whole lineage.
 *
 * MEASURED (production, 2026-10-12): `phys.mech.friction:core_explanation:en` holds 368 versions and
 * 30,436 AI-authored DRAFT explanations exist in all. `captureGeneratedExplanation` /
 * `captureGeneratedProbe` loaded the ENTIRE lineage (every version, with its full text) before
 * deciding, and every non-duplicate capture adds a version, so the bytes per capture grew with each
 * capture: ~48 identity rows + ~48 explanation rows per call, ~half of the live read volume of the
 * last three days, and unbounded.
 *
 * `decideCaptureAction` only ever uses (a) a row whose contentHash equals the candidate's and (b) the
 * highest version. The capture now fetches exactly those two rows. This test pins both halves:
 * the DECISION is unchanged (equivalence against the full lineage) and the READ is bounded.
 */
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { decideCaptureAction, type LineageAsset } from '@/lib/teaching/assets/versioning'
import { hashContent } from '@/lib/teaching/assets/similarity'

type Row = { assetId: string; contentHash: string; version: number; text: string; hasChild: boolean }

const store: { rows: Row[]; created: unknown[]; findManyCalls: number; findFirstCalls: Array<Record<string, unknown>> } = {
  rows: [], created: [], findManyCalls: 0, findFirstCalls: [],
}

vi.mock('@/lib/db/prisma', () => {
  const find = (args: { where: Record<string, unknown>; orderBy?: { version: 'desc' }; select?: Record<string, unknown> }) => {
    store.findFirstCalls.push(args as unknown as Record<string, unknown>)
    let hits = store.rows.filter((r) => r.hasChild)
    if (typeof args.where.contentHash === 'string') hits = hits.filter((r) => r.contentHash === args.where.contentHash)
    if (args.orderBy?.version === 'desc') hits = [...hits].sort((a, b) => b.version - a.version)
    const r = hits[0]
    if (!r) return Promise.resolve(null)
    return Promise.resolve({
      assetId: r.assetId, contentHash: r.contentHash, version: r.version,
      explanationAsset: { content: r.text }, probeAsset: { stem: r.text },
    })
  }
  return {
    prisma: {
      assetIdentity: {
        findFirst: vi.fn(find),
        findMany: vi.fn(() => { store.findManyCalls++; throw new Error('the capture must not read the whole lineage') }),
        create: vi.fn(async (args: { data: Record<string, unknown> }) => { store.created.push(args.data); return { assetId: 'new-asset' } }),
      },
    },
  }
})

import { captureGeneratedExplanation } from '@/lib/teaching/assets/explanationMemory'
import { captureGeneratedProbe } from '@/lib/teaching/assets/teachingActionRepository'

function lineage(n: number): Row[] {
  return Array.from({ length: n }, (_, i) => {
    const text = `Version ${i + 1}: friction opposes sliding between two surfaces, ${'x'.repeat(i % 7)} number ${i * 97}.`
    return { assetId: `a${i + 1}`, contentHash: hashContent(text), version: i + 1, text, hasChild: true }
  })
}

beforeEach(() => {
  store.rows = []; store.created = []; store.findManyCalls = 0; store.findFirstCalls = []
})

const EXPL_INPUT = { conceptId: 'phys.mech.friction', subjectSlug: 'physics', language: 'en', gradeBand: 'MIDDLE' as never, authorId: 'SYSTEM_AI' }
const PROBE_INPUT = { conceptId: 'phys.mech.friction', subjectSlug: 'physics', language: 'en', gradeBand: 'MIDDLE' as never, authorId: 'SYSTEM_AI' }

describe('the DECISION is the one the full lineage gives', () => {
  const full = lineage(120)
  const asLineage = (rows: Row[]): LineageAsset[] => rows.map((r) => ({ assetId: r.assetId, contentHash: r.contentHash, content: r.text, version: r.version }))
  const reduce = (hash: string): LineageAsset[] => {
    const exact = full.find((r) => r.contentHash === hash)
    const latest = full.reduce((a, b) => (b.version > a.version ? b : a))
    return asLineage([...(exact ? [exact] : []), ...(latest !== exact ? [latest] : [])])
  }
  const candidates = {
    'a byte-identical OLD version': full[7].text,
    'the latest version verbatim': full[119].text,
    'a near-duplicate of the latest': full[119].text + ' ok',
    'something new': 'Static friction rises to a maximum value and then the block starts to slide, which is a different statement altogether.',
  }
  for (const [name, text] of Object.entries(candidates)) {
    it(`${name}: same action, same matched/parent id, same next version`, () => {
      const h = hashContent(text)
      const a = decideCaptureAction(text, h, asLineage(full))
      const b = decideCaptureAction(text, h, reduce(h))
      expect(b.action).toBe(a.action)
      if (a.action === 'skip-duplicate' && b.action === 'skip-duplicate') expect(b.matchedAssetId).toBe(a.matchedAssetId)
      if (a.action === 'new-version' && b.action === 'new-version') {
        expect(b.parentVersionId).toBe(a.parentVersionId)
        expect(b.nextVersion).toBe(a.nextVersion)
      }
    })
  }
  it('an empty lineage is still a new lineage', () => {
    expect(decideCaptureAction('x', hashContent('x'), []).action).toBe('new-lineage')
  })
})

describe('the READ is bounded — captureGeneratedExplanation', () => {
  it('a 368-version lineage costs two single-row reads, never the whole lineage', async () => {
    store.rows = lineage(368)
    const out = await captureGeneratedExplanation({ ...EXPL_INPUT, content: 'A genuinely new way to say it: friction is the contact force along a surface that resists relative sliding.' })
    expect(out.action).toBe('versioned')
    expect(store.findManyCalls).toBe(0)
    expect(store.findFirstCalls).toHaveLength(2)
    const created = store.created[0] as { version: number; parentVersionId: string }
    expect(created.version).toBe(369)
    expect(created.parentVersionId).toBe('a368')
  })

  it('every read selects only the three identity fields and the one text field — no `include`, no wide row', async () => {
    store.rows = lineage(5)
    await captureGeneratedExplanation({ ...EXPL_INPUT, content: 'Something else entirely about friction and surfaces in contact.' })
    for (const call of store.findFirstCalls) {
      expect(call).not.toHaveProperty('include')
      const sel = call.select as Record<string, unknown>
      expect(Object.keys(sel).sort()).toEqual(['assetId', 'contentHash', 'explanationAsset', 'version'])
      expect(sel.explanationAsset).toEqual({ select: { content: true } })
    }
  })

  it('an exact duplicate of an OLD version is still caught (no row is written)', async () => {
    store.rows = lineage(60)
    const out = await captureGeneratedExplanation({ ...EXPL_INPUT, content: store.rows[3].text })
    expect(out).toMatchObject({ action: 'skipped-duplicate', matchedAssetId: 'a4' })
    expect(store.created).toHaveLength(0)
  })

  it('an empty lineage writes version 1', async () => {
    const out = await captureGeneratedExplanation({ ...EXPL_INPUT, content: 'First ever explanation of friction for this lineage.' })
    expect(out.action).toBe('inserted')
    expect((store.created[0] as { version: number }).version).toBe(1)
  })

  it('an identity row with no explanation child is not part of the lineage (as before)', async () => {
    store.rows = [{ assetId: 'orphan', contentHash: 'h', version: 9, text: '', hasChild: false }, ...lineage(2)]
    const out = await captureGeneratedExplanation({ ...EXPL_INPUT, content: 'Brand new content about friction that is unlike either stored version.' })
    expect((store.created[0] as { parentVersionId: string }).parentVersionId).toBe('a2')
    expect(out.action).toBe('versioned')
  })
})

describe('the READ is bounded — captureGeneratedProbe', () => {
  it('two single-row reads, version = latest + 1', async () => {
    store.rows = lineage(150)
    const out = await captureGeneratedProbe({ ...PROBE_INPUT, stem: 'Which statement about kinetic friction is correct for a block sliding on a rough table?' })
    expect(out.action).toBe('versioned')
    expect(store.findManyCalls).toBe(0)
    expect(store.findFirstCalls).toHaveLength(2)
    expect((store.created[0] as { version: number }).version).toBe(151)
  })

  it('an exact duplicate stem is skipped', async () => {
    store.rows = lineage(10)
    const out = await captureGeneratedProbe({ ...PROBE_INPUT, stem: store.rows[2].text })
    expect(out).toMatchObject({ action: 'skipped-duplicate', matchedAssetId: 'a3' })
  })
})

describe('source pin: neither capture function may read a lineage with findMany again', () => {
  const body = (file: string, fn: string) => {
    const src = readFileSync(join(__dirname, '..', 'lib', 'teaching', 'assets', file), 'utf8')
    const i = src.indexOf(`export async function ${fn}`)
    expect(i).toBeGreaterThan(-1)
    const end = src.indexOf('\n}\n', i)
    return src.slice(i, end)
  }
  it('captureGeneratedExplanation', () => { expect(body('explanationMemory.ts', 'captureGeneratedExplanation')).not.toMatch(/assetIdentity\.findMany/) })
  it('captureGeneratedProbe', () => { expect(body('teachingActionRepository.ts', 'captureGeneratedProbe')).not.toMatch(/assetIdentity\.findMany/) })
})
