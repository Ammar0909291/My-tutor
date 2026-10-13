/**
 * The human semantic review of the Chemistry figures the machine audit could not decide.
 *
 * `docs/qa/chemistry-visual-audit/audit-summary.json` records MACHINE verdicts; a REVIEW_REQUIRED there means "no deterministic
 * assertion covers the chemistry — reference data, prose claims, a fixed React card — a person must look". The person's answer lives in
 * `semantic-review.json`. This test keeps that answer from rotting:
 *
 *   • every instance the machine leaves REVIEW_REQUIRED has an entry (a new or changed figure fails here until it is reviewed);
 *   • an entry is bound to the figure's FINGERPRINT — if the figure changes, its review is void and the test says which;
 *   • nothing is PASS without evidence: each citation is a file that exists and still contains the cited text;
 *   • a fixed figure says what was fixed; a figure left REVIEW_REQUIRED says why and who decides;
 *   • the reference-data ledger the reviews cite is intact (it names its sources and never silently drops an UNVERIFIED value).
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

type Evidence = { file: string; contains: string }
type Entry = {
  fingerprint: string; concepts: string[]; family: string; initial: string
  decision: 'PASS' | 'FIXED→PASS' | 'REVIEW_REQUIRED'
  finding: string; fix: string | null; evidence: Evidence[]; sources?: string[]; remaining: string; reason?: string; ownerDecision?: string
}

const root = resolve(__dirname, '../..')
const read = (p: string) => readFileSync(resolve(root, p), 'utf8')
const DIR = 'docs/qa/chemistry-visual-audit'
const ledger = JSON.parse(read(`${DIR}/semantic-review.json`)) as { figures: Record<string, Entry> }
const audit = JSON.parse(read(`${DIR}/audit-summary.json`)) as { instances: Array<{ id: string; tier: string; fingerprint: string; verdict: string; semantic: string; conceptIds: string[] }> }
const DECISIONS = ['PASS', 'FIXED→PASS', 'REVIEW_REQUIRED']

describe('chemistry semantic review ledger', () => {
  it('every figure the machine audit leaves REVIEW_REQUIRED has been reviewed by a person', () => {
    const unreviewed = audit.instances.filter((i) => i.verdict === 'REVIEW_REQUIRED' && !ledger.figures[i.id]).map((i) => i.id)
    expect(unreviewed).toEqual([])
  })

  it('every ledger entry names an audited figure, bound to the fingerprint that was reviewed', () => {
    const byId = new Map(audit.instances.map((i) => [i.id, i]))
    for (const [id, e] of Object.entries(ledger.figures)) {
      const inst = byId.get(id)
      expect(inst, `${id} is not in the audit`).toBeDefined()
      expect(e.fingerprint, `${id}: the figure changed since it was reviewed — review it again`).toBe(inst!.fingerprint)
      expect([...e.concepts].sort(), id).toEqual([...inst!.conceptIds].sort())
      expect(DECISIONS, id).toContain(e.decision)
      expect(e.finding.length, id).toBeGreaterThan(40)
      expect(e.remaining.length, id).toBeGreaterThan(0)
    }
  })

  it('nothing is PASS without evidence: each citation is a file that exists and still contains the cited text', () => {
    for (const [id, e] of Object.entries(ledger.figures)) {
      expect(e.evidence.length, id).toBeGreaterThan(0)
      for (const ev of e.evidence) {
        expect(existsSync(resolve(root, ev.file)), `${id}: ${ev.file}`).toBe(true)
        expect(read(ev.file), `${id}: "${ev.contains}" in ${ev.file}`).toContain(ev.contains)
      }
    }
  })

  it('a fixed figure says what was fixed; a figure left REVIEW_REQUIRED says why and who decides', () => {
    for (const [id, e] of Object.entries(ledger.figures)) {
      if (e.decision === 'FIXED→PASS') expect((e.fix ?? '').length, id).toBeGreaterThan(20)
      if (e.decision === 'REVIEW_REQUIRED') {
        expect((e.reason ?? '').length, id).toBeGreaterThan(40)
        expect((e.ownerDecision ?? '').length, id).toBeGreaterThan(10)
      }
    }
  })

  it('a generated (Tier 3) or approved (Tier 2) figure is never PASS on the strength of a machine alone: it cites a recorded independent review', () => {
    for (const i of audit.instances.filter((x) => x.tier === 'tier2' || x.tier === 'tier3')) {
      const e = ledger.figures[i.id]
      if (!e) continue
      expect(e.evidence.some((ev) => /tier3-independent-review\.json|tier2-/.test(ev.file)), `${i.id} must cite the independent review record`).toBe(true)
    }
  })
})

describe('reference-data ledger (R17)', () => {
  const ref = JSON.parse(read(`${DIR}/reference-data-ledger.json`)) as { counts: Record<string, number>; entries: Array<{ figure: string; quantity: string; valueInFigure: string; authoritativeValue: string; source: string; verdict: string }> }

  it('every entry states the figure value, the authoritative value, the source and a legal verdict', () => {
    for (const e of ref.entries) {
      expect(['MATCH', 'WITHIN_ROUNDING', 'UNVERIFIED', 'MISMATCH'], `${e.figure} / ${e.quantity}`).toContain(e.verdict)
      expect(e.valueInFigure.length, e.quantity).toBeGreaterThan(0)
      expect(e.authoritativeValue.length, e.quantity).toBeGreaterThan(0)
      expect(e.source.length, e.quantity).toBeGreaterThan(8)
    }
  })

  it('the recorded counts equal the entries, and no entry is a MISMATCH (a mismatch must be fixed in the figure, not recorded)', () => {
    const tally = ref.entries.reduce<Record<string, number>>((m, e) => { m[e.verdict] = (m[e.verdict] ?? 0) + 1; return m }, {})
    expect(tally).toEqual(ref.counts)
    expect(tally.MISMATCH ?? 0).toBe(0)
  })
})
