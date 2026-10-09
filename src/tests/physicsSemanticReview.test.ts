/**
 * The human semantic review of the figures the render audit could not decide.
 *
 * `docs/qa/physics-visual-audit/audit-summary.json` records MACHINE verdicts; a REVIEW_REQUIRED
 * there means "no deterministic assertion covers the physics, a person must look". The person's
 * answer lives in `semantic-review.json` (2026-10-08 follow-up). This test keeps that answer
 * from rotting: a concept that is REVIEW_REQUIRED by the machine and has no entry fails, an
 * entry may only cite a test that still exists, and nothing is PASS without evidence.
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

type Evidence = { file: string; describe: string }
type Entry = { initial: string; decision: string; finding: string; fix: string | null; evidence: Evidence[]; remaining: string; reason?: string; ownerDecision?: string }

const root = resolve(__dirname, '../..')
const read = (p: string) => readFileSync(resolve(root, p), 'utf8')
const ledger = JSON.parse(read('docs/qa/physics-visual-audit/semantic-review.json')) as { concepts: Record<string, Entry> }
const audit = JSON.parse(read('docs/qa/physics-visual-audit/audit-summary.json')) as { concepts: Array<{ id: string; verdict: string }> }
const DECISIONS = ['PASS', 'FIXED→PASS', 'REVIEW_REQUIRED']

describe('physics semantic review ledger', () => {
  it('every concept the machine audit leaves REVIEW_REQUIRED has been reviewed by a person', () => {
    const unreviewed = audit.concepts.filter((c) => c.verdict === 'REVIEW_REQUIRED' && !ledger.concepts[c.id]).map((c) => c.id)
    expect(unreviewed).toEqual([])
  })

  it('every ledger entry names a concept that exists in the audit, with a legal decision', () => {
    const ids = new Set(audit.concepts.map((c) => c.id))
    for (const [id, e] of Object.entries(ledger.concepts)) {
      expect(ids.has(id), id).toBe(true)
      expect(DECISIONS, id).toContain(e.decision)
      expect(e.finding.length, id).toBeGreaterThan(20)
      expect(e.remaining.length, id).toBeGreaterThan(0)
    }
  })

  it('nothing is PASS without evidence: each citation is a test file that exists and still holds that describe block', () => {
    for (const [id, e] of Object.entries(ledger.concepts)) {
      expect(e.evidence.length, id).toBeGreaterThan(0)
      for (const ev of e.evidence) {
        expect(existsSync(resolve(root, ev.file)), `${id}: ${ev.file}`).toBe(true)
        expect(read(ev.file), `${id}: "${ev.describe}"`).toContain(ev.describe)
      }
    }
  })

  it('a fixed concept says what was fixed; a concept left REVIEW_REQUIRED says why and who decides', () => {
    for (const [id, e] of Object.entries(ledger.concepts)) {
      if (e.decision === 'FIXED→PASS') expect((e.fix ?? '').length, id).toBeGreaterThan(20)
      if (e.decision === 'REVIEW_REQUIRED') {
        expect((e.reason ?? '').length, id).toBeGreaterThan(40)
        expect((e.ownerDecision ?? '').length, id).toBeGreaterThan(10)
      }
    }
  })
})
