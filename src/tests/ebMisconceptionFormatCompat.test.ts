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

/** Every subject KG whose EB entries this parser serves. */
const KGS = [
  'docs/mathematics/kg/graph.json',
  'docs/physics/kg/graph.json',
  'docs/chemistry/kg/graph.json',
  'docs/english/kg/graph.json',
] as const

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
    // 447 = 5 authored M-n (math.arith.fractions) + 442 MC-n — the whole
    // authored mathematics library. The last four (complement MC-2,
    // problem-solving-strategies MC-2, reading-mathematics MC-3,
    // set-equality MC-3) run 306-353 chars and were rejected by the parser's
    // earlier 300-char title bound; N-1 raised it to 360. Concept count is
    // unchanged by that raise — all four sit in files that already parsed.
    expect(records).toBe(447)
  })

  it('physics and english are unchanged by the mathematics fix', () => {
    expect(corpusRecordCount('docs/physics/kg/graph.json')).toEqual({ concepts: 55, records: 219 })
    expect(corpusRecordCount('docs/english/kg/graph.json')).toEqual({ concepts: 1, records: 5 })
  })

  it('chemistry was authored in the same shape and is recovered too', () => {
    expect(corpusRecordCount('docs/chemistry/kg/graph.json')).toEqual({ concepts: 67, records: 198 })
  })
})

// ── N-1. the four long-title records, and the guard that still bounds them ──

describe('the four long-title mathematics records (N-1)', () => {
  const FOUR: Array<[string, string, string]> = [
    ['math.found.complement', 'MC-2', 'complement twice'],
    ['math.found.problem-solving-strategies', 'MC-2', 'Symmetry-seeking'],
    ['math.found.reading-mathematics', 'MC-3', 'Unfamiliar notation'],
    ['math.found.set-equality', 'MC-3', 'two subset checks'],
  ]

  it.each(FOUR)('%s %s parses with its full body', (conceptId, id, fragment) => {
    const rec = mcs(conceptId).find((m) => m.id === id)
    expect(rec, `${conceptId} ${id} did not parse`).toBeDefined()
    expect(rec!.title).toContain(fragment)
    // Long titles are the reason these were blocked; they are still TITLES.
    expect(rec!.title.length).toBeGreaterThan(300)
    expect(rec!.title.length).toBeLessThanOrEqual(360)
    // The authored body survived — recovering the heading is only half of it.
    expect(rec!.symptom, `${id} symptom`).toBeTruthy()
    expect(rec!.probe, `${id} probe`).toBeTruthy()
    expect(rec!.recovery, `${id} recovery`).toBeTruthy()
  })

  it.each(FOUR)('%s %s captured no body prose in its title', (conceptId, id) => {
    const rec = mcs(conceptId).find((m) => m.id === id)!
    // Body bleed is what the bound exists to prevent — assert its absence
    // directly rather than inferring it from the length.
    expect(rec.title).not.toContain('*Why*')
    expect(rec.title).not.toContain('*Symptom*')
    expect(rec.title).not.toContain('Detection probe')
    expect(rec.title).not.toContain('\n')
  })

  it('no parsed title anywhere in the corpus exceeds the bound', () => {
    for (const kg of KGS) {
      for (const id of conceptIdsOf(kg)) {
        const r = loadEBConceptContext(id)
        if (!r.found) continue
        for (const m of r.context.ebMisconceptions) {
          expect(m.title.length, `${id} ${m.id}`).toBeLessThanOrEqual(360)
        }
      }
    }
  })
})

/**
 * The anti-runaway guard itself.
 *
 * `[^*]` was loosened from `[^*\n]` so wrapped titles could parse, which removed
 * the newline stop; the length bound replaced it. Without a bound, a heading
 * whose closing `**` is missing runs through asterisk-free body prose until some
 * later bold token closes it, and paragraphs become a "title". N-1 raised the
 * bound 300 -> 360; it must never be removed or widened without re-measuring.
 *
 * The pattern under test is READ FROM THE SHIPPED SOURCE rather than copied, so
 * this cannot pass against a stale duplicate of the regex.
 */
describe('the bound still stops a runaway heading', () => {
  const SRC = fs.readFileSync('src/lib/curriculum/blueprintLoader.ts', 'utf-8')

  function shippedHeadRegex(): { re: RegExp; bound: number } {
    const idPattern = /const EB_MC_ID = String\.raw`([^`]*)`/.exec(SRC)?.[1]
    const headPattern = /const head = new RegExp\(String\.raw`([^`]*)`\)/.exec(SRC)?.[1]
    expect(idPattern, 'EB_MC_ID not found in source').toBeTruthy()
    expect(headPattern, 'head regex not found in source').toBeTruthy()
    const source = headPattern!.replace('${EB_MC_ID}', idPattern!)
    const bound = Number(/\{3,(\d+)\}/.exec(source)?.[1])
    return { re: new RegExp(source), bound }
  }

  it('is set to exactly 360 in the shipped parser', () => {
    expect(shippedHeadRegex().bound).toBe(360)
  })

  it('does not consume body prose from an unclosed heading', () => {
    const { re } = shippedHeadRegex()
    // Unclosed `**`, then asterisk-free prose, then a later bold token that
    // would supply the closing `**` if the bound allowed the match to reach it.
    const prose = 'This is ordinary body prose that carries no asterisks at all. '.repeat(20)
    const block = `**MC-1 — a legitimate looking claim ${prose}**emphasis later**`
    expect(block.length).toBeGreaterThan(1000)
    expect(re.exec(block), 'the bound let a runaway title through').toBeNull()
  })

  it('still admits a legitimate title at the top of the allowed range', () => {
    const { re } = shippedHeadRegex()
    const title = 'a'.repeat(353)
    expect(re.exec(`**MC-1 — ${title}**`)?.[2]).toBe(title)
  })
})
