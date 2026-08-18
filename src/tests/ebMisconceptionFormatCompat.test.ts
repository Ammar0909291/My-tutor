/**
 * EB misconception heading FORMAT COMPATIBILITY (F-1).
 *
 * The corpus authored misconception headings in two shapes. The parser
 * recognised only one:
 *
 *   (a) `**M1 — …**` opening its own line — physics, english, and
 *       `math.arith.fractions`. Parsed since the beginning.
 *   (b) `- **MC-1 — …**` — the mathematics and chemistry batches, which cite
 *       the Blueprint's own MC ids. Never parsed: the id pattern was `M\d+`
 *       (so `MC-1` could not match) and the block anchor required the heading
 *       to open its line (so the list marker suppressed the split).
 *
 * Measured before the fix: 442 authored mathematics records across 153 files
 * and 198 chemistry records across 67 files parsed as ZERO. No content was
 * re-authored — only the three regexes in parseEBMisconceptions changed.
 *
 * These tests pin BOTH shapes against the real corpus. Shape (a)'s numbers are
 * the regression guard: they must not move when shape (b) starts parsing.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import { loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'

function mcs(conceptId: string) {
  const r = loadEBConceptContext(conceptId)
  expect(r.found, `EB entry missing for ${conceptId}`).toBe(true)
  return r.found ? r.context.ebMisconceptions : []
}

function conceptIdsOf(kgPath: string): string[] {
  return JSON.parse(fs.readFileSync(kgPath, 'utf-8')).concepts.map((c: { id: string }) => c.id)
}

function corpusRecordCount(kgPath: string): { concepts: number; records: number } {
  let concepts = 0
  let records = 0
  for (const id of conceptIdsOf(kgPath)) {
    const r = loadEBConceptContext(id)
    if (!r.found || r.context.ebMisconceptions.length === 0) continue
    concepts++
    records += r.context.ebMisconceptions.length
  }
  return { concepts, records }
}

// ── A. the original `M1` shape is untouched ─────────────────────────────────

describe('the M-n shape parses exactly as it did before', () => {
  it('keeps every record and every field on a physics entry', () => {
    const m = mcs('phys.meas.dimensions')
    expect(m.map((x) => x.id)).toEqual(['M1', 'M2', 'M3', 'M4', 'M5'])
    // The detection surface is what makes a record usable, not the title.
    for (const x of m) {
      expect(x.symptom, `${x.id} symptom`).toBeTruthy()
      expect(x.probe, `${x.id} probe`).toBeTruthy()
      expect(x.recovery, `${x.id} recovery`).toBeTruthy()
    }
  })

  it('keeps the one mathematics entry that always parsed', () => {
    const m = mcs('math.arith.fractions')
    expect(m.map((x) => x.id)).toEqual(['M1', 'M2', 'M3', 'M4', 'M5'])
    expect(m[0].title).toContain('Bigger denominator')
    expect(m[0].probe).toContain('1/8')
  })
})

// ── B / C / D. the `MC-n` shape ─────────────────────────────────────────────

describe('the MC-n shape now parses', () => {
  it('parses a bullet-prefixed mathematics entry', () => {
    const m = mcs('math.found.set')
    expect(m.length).toBe(3)
    expect(m[0].id).toBe('MC-1')
    expect(m[0].title).toContain('Sets preserve order')
  })

  it('keeps multiple records in authored order', () => {
    expect(mcs('math.found.set').map((x) => x.id)).toEqual(['MC-1', 'MC-2', 'MC-3'])
    expect(mcs('math.geom.parallel-lines').map((x) => x.id)).toEqual(['MC-1', 'MC-2', 'MC-3'])
  })

  it('preserves the full body — symptom, probe and recovery — when authored', () => {
    const m = mcs('math.found.union')
    expect(m.map((x) => x.id)).toEqual(['MC-1', 'MC-2'])
    for (const x of m) {
      expect(x.symptom, `${x.id} symptom`).toBeTruthy()
      expect(x.probe, `${x.id} probe`).toBeTruthy()
      expect(x.recovery, `${x.id} recovery`).toBeTruthy()
    }
    // Fields belong to their own record — MC-2's body must not bleed into MC-1.
    expect(m[0].title).toContain('Union adds the sizes')
    expect(m[1].title).toContain("in both")
  })

  it('parses a chemistry entry authored in the same shape', () => {
    const m = mcs('chem.found.matter')
    expect(m.map((x) => x.id)).toEqual(['MC-1', 'MC-2', 'MC-3'])
    expect(m.every((x) => /^(MC-\d+|M\d+)$/.test(x.id))).toBe(true)
  })
})

// ── E. an ordinary bullet is still not a misconception ──────────────────────

describe('the parser did not become permissive', () => {
  it('does not turn a bold markdown bullet into a misconception', () => {
    // This entry's Misconceptions section is authored as bold bullets with no
    // MC-n / M-n heading at all. Bold alone must never qualify.
    const raw = fs.readFileSync('educational-brain/concepts/chemistry/chem.bond.hybridization.md', 'utf-8')
    expect(/^\s*[-*+]\s+\*\*/m.test(raw)).toBe(true)
    expect(mcs('chem.bond.hybridization')).toEqual([])
  })

  it('requires the dash after the id, not merely the id', () => {
    // Guards the shape of the anchor itself: every parsed record across the
    // whole corpus carries a well-formed id, never a fragment of prose.
    for (const id of conceptIdsOf('docs/mathematics/kg/graph.json')) {
      const r = loadEBConceptContext(id)
      if (!r.found) continue
      for (const x of r.context.ebMisconceptions) {
        expect(/^(MC-\d+|M\d+)$/.test(x.id), `${id} produced id "${x.id}"`).toBe(true)
        expect(x.title.length, `${id} ${x.id} empty title`).toBeGreaterThan(2)
      }
    }
  })
})

// ── F / G. corpus-wide counts ───────────────────────────────────────────────

describe('corpus-wide misconception retrieval', () => {
  it('mathematics: 154 concepts carry a parsed misconception library', () => {
    const { concepts, records } = corpusRecordCount('docs/mathematics/kg/graph.json')
    expect(concepts).toBe(154)
    // 443 = 5 authored M-n (math.arith.fractions) + 438 MC-n. Four further
    // authored records are held back by the parser's pre-existing 300-char
    // title bound, NOT by the id/anchor shapes this test covers.
    expect(records).toBe(443)
  })

  it('physics and english are unchanged by the mathematics fix', () => {
    expect(corpusRecordCount('docs/physics/kg/graph.json')).toEqual({ concepts: 55, records: 219 })
    expect(corpusRecordCount('docs/english/kg/graph.json')).toEqual({ concepts: 1, records: 5 })
  })

  it('chemistry was authored in the same shape and is recovered too', () => {
    expect(corpusRecordCount('docs/chemistry/kg/graph.json')).toEqual({ concepts: 67, records: 198 })
  })
})
