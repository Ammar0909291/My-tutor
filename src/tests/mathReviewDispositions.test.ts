/**
 * MATHEMATICS VISUAL AUDIT — the 61 REVIEW_REQUIRED figures of the first full audit (2026-10-13, commit 743e65c67) each carry a recorded, evidence-backed
 * disposition (docs/qa/mathematics-visual-audit/review-dispositions.json), bound to the figure's CURRENT fingerprint: change a figure and its disposition
 * goes stale here until it is re-reviewed. The disposition is never a bare "approved": FIXED_DEFECT names what changed, ASSERTION_ADDED names the test that now
 * covers it, VALID_TEXT_FIGURE names the tests that pin every number the (text-laid-out) figure states. The one product question (Q1) is carried, not decided.
 */
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const AUDIT = 'docs/qa/mathematics-visual-audit/audit-summary.json'
const LEDGER = 'docs/qa/mathematics-visual-audit/review-dispositions.json'
interface Entry { id: string; was: { verdict: string; rules: string[] }; now: string; fingerprint: string; disposition: string; judgement: string; evidence: string[]; ownerDecision: string | null }

const audit = JSON.parse(readFileSync(AUDIT, 'utf8')) as { fingerprints: Record<string, string>; concepts: Array<{ id: string; verdict: string; semantic: string }> }
const ledger = JSON.parse(readFileSync(LEDGER, 'utf8')) as { dispositions: string[]; ownerQuestions: Record<string, string>; entries: Entry[] }
const byId = new Map(ledger.entries.map((e) => [e.id, e]))

describe('every REVIEW_REQUIRED Mathematics figure has a current, evidence-backed disposition', () => {
  it('the ledger records all 61 original review items, once each', () => {
    expect(ledger.entries).toHaveLength(61)
    expect(byId.size).toBe(61)
    for (const e of ledger.entries) expect(e.was.verdict).toBe('REVIEW_REQUIRED')
  })

  it('every figure the current audit still marks REVIEW_REQUIRED is in the ledger, with the same verdict and a VALID_TEXT_FIGURE or owner-question disposition', () => {
    const still = audit.concepts.filter((c) => c.verdict === 'REVIEW_REQUIRED')
    expect(still.length).toBeGreaterThan(0)
    for (const c of still) {
      const e = byId.get(c.id)
      expect(e, `${c.id} has no disposition`).toBeDefined()
      expect(e!.now, c.id).toBe('REVIEW_REQUIRED')
      expect(['VALID_TEXT_FIGURE', 'FIXED_DEFECT', 'ASSERTION_ADDED'], c.id).toContain(e!.disposition)
    }
    for (const e of ledger.entries) expect(audit.concepts.find((c) => c.id === e.id)!.verdict, `${e.id} ledger says ${e.now}`).toBe(e.now)
  })

  it('every disposition is bound to the figure as it is served today (a changed figure invalidates its disposition)', () => {
    for (const e of ledger.entries) expect(e.fingerprint, `${e.id}: re-review this figure`).toBe(audit.fingerprints[e.id])
  })

  it('every disposition is in the closed set, carries a judgement and names evidence that exists and covers the concept', () => {
    for (const e of ledger.entries) {
      expect(ledger.dispositions, e.id).toContain(e.disposition)
      expect(e.judgement.length, e.id).toBeGreaterThan(60)
      expect(e.evidence.length, `${e.id} names no evidence`).toBeGreaterThan(0)
      for (const ev of e.evidence) {
        const file = ev.split(' ')[0]
        expect(existsSync(`src/tests/${file}`), `${e.id}: ${file}`).toBe(true)
      }
      if (e.disposition === 'VALID_TEXT_FIGURE') {
        const text = e.evidence.map((ev) => readFileSync(`src/tests/${ev.split(' ')[0]}`, 'utf8')).join('\n')
        expect(text.includes(`'${e.id}'`) || text.includes(`"${e.id}"`), `${e.id} is not named by its evidence`).toBe(true)
      }
    }
  })

  it('the open product question is carried, not decided: Q1 is the only owner question, and every entry that raises it is a domain-scope card', () => {
    expect(Object.keys(ledger.ownerQuestions)).toEqual(['Q1'])
    const q1 = ledger.entries.filter((e) => e.ownerDecision === 'Q1')
    expect(q1.length).toBeGreaterThan(0)
    for (const e of ledger.entries) expect([null, 'Q1']).toContain(e.ownerDecision)
    expect(ledger.ownerQuestions.Q1).toContain(String(q1.length))
  })
})
