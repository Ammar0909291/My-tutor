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
 *
 * SUPERSEDED IN PART 2026-09-13 (authoritative-knowledge-exposure contract).
 * The grammar moved out of `blueprintLoader` into `ebKnowledge.ts`, where ONE
 * regex both counts authored blocks and parses them, and three FURTHER live
 * authored shapes were found that neither (a) nor (b) covers: a parenthetical
 * type qualifier where a dash was required, a non-bold `### MC-1:` heading,
 * and non-numeric ids (`MC-A`, `MC-DESCRIPTIVE-SLUG`). Corpus-wide the fix took
 * 1,220 parsed records to 2,906, with authored === parsed on every file.
 *
 * Every assertion below is KEPT — each one's original text is preserved
 * verbatim in a dated comment where the expected value had to move, and the
 * same invariant is re-asserted against the new shape. The counts that changed
 * went UP, which is the fix working, not a regression; the field rename
 * (`recovery` -> `correction`) is the canonical representation's name for the
 * same authored text.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import { loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { parseAuthoritativeMisconceptions } from '@/lib/curriculum/ebKnowledge'

const PROV = { sourceType: 'educational-brain', conceptSlug: 'test', section: 'Misconceptions' } as const

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
      expect(x.correction, `${x.id} correction`).toBeTruthy()
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

  it('preserves the full body — symptom, probe and correction — when authored', () => {
    const m = mcs('math.found.union')
    expect(m.map((x) => x.id)).toEqual(['MC-1', 'MC-2'])
    for (const x of m) {
      expect(x.symptom, `${x.id} symptom`).toBeTruthy()
      expect(x.probe, `${x.id} probe`).toBeTruthy()
      expect(x.correction, `${x.id} correction`).toBeTruthy()
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
    // Superseded 2026-09-13. Original kept verbatim:
    //   const raw = fs.readFileSync('educational-brain/concepts/chemistry/chem.bond.hybridization.md', 'utf-8')
    //   expect(/^\s*[-*+]\s+\*\*/m.test(raw)).toBe(true)
    //   expect(mcs('chem.bond.hybridization')).toEqual([])
    //
    // The INVARIANT — "bold alone must never qualify" — is correct and is
    // re-asserted below. The FIXTURE was not: that file's own comment claimed
    // it had "no MC-n / M-n heading at all", and it authors four, as
    // `- **MC-1 (Type 5 — instruction-induced)**: …`. The old parser could not
    // read that shape, so the test froze the parse FAILURE as the expected
    // result. It now correctly parses 4.
    expect(mcs('chem.bond.hybridization').map((m) => m.id)).toEqual(['MC-1', 'MC-2', 'MC-3', 'MC-4'])

    // The invariant, asserted directly against bold bullets that carry no
    // misconception label — which is what it was always about.
    const raw = fs.readFileSync('educational-brain/concepts/chemistry/chem.bond.hybridization.md', 'utf-8')
    expect(/^\s*[-*+]\s+\*\*/m.test(raw)).toBe(true)
    const unlabelled = [
      '- **Birth type:** Type 1 (overgeneralization) — foundational',
      '- **Description:** something a learner believes',
      '- **Why this matters** — it changes the repair',
      '**Trigger**: the learner says X',
    ].join('\n')
    expect(parseAuthoritativeMisconceptions(unlabelled, PROV)).toEqual([])
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
  it('mathematics: at least 182 concepts carry a parsed misconception library', () => {
    const { concepts, records } = corpusRecordCount('docs/mathematics/kg/graph.json')
    // A FLOOR, not an exact pin — deliberately, and only for this one pair.
    // The mathematics Educational Brain corpus is under active, ongoing
    // authoring (CLAUDE.md's Educational Brain completion campaign, an
    // autonomous loop that lands new concepts every few minutes): an exact
    // count here fails on every legitimate content addition, which is what
    // broke CI repeatedly (measured 154->174->177->182 across four separate
    // commits within roughly 30 minutes while diagnosing this very test).
    // A monotonic floor still catches the real regression this test guards
    // against — the F-1 parser losing previously-recognised records, which
    // would DECREASE these numbers — without demanding a maintenance commit
    // on every authoring batch. Raise the floor opportunistically; never
    // lower it without first confirming the drop is a genuine parser
    // regression, not further corpus growth outrunning a stale floor.
    expect(concepts).toBeGreaterThanOrEqual(182)
    expect(records).toBeGreaterThanOrEqual(529)
  })

  it('physics and english are unchanged by the mathematics fix', () => {
    // Superseded 2026-09-13, original kept verbatim:
    //   expect(corpusRecordCount('docs/physics/kg/graph.json')).toEqual({ concepts: 55, records: 219 })
    // The tolerant grammar recovers shapes the old one dropped, so these RISE.
    // The invariant that mattered — shape (a) never loses a record when another
    // shape starts parsing — is asserted as a floor.
    const phys = corpusRecordCount('docs/physics/kg/graph.json')
    expect(phys.concepts).toBeGreaterThanOrEqual(55)
    expect(phys.records).toBeGreaterThanOrEqual(219)
    // Superseded 2026-09-13, original kept verbatim:
    //   expect(corpusRecordCount('docs/english/kg/graph.json')).toEqual({ concepts: 1, records: 5 })
    // English is the largest single recovery: exactly ONE of its 216 entries
    // parsed before, because the whole subject authors the descriptive-slug and
    // `MC-A`/`MC-B` shapes the old id pattern could not express.
    const eng = corpusRecordCount('docs/english/kg/graph.json')
    expect(eng.concepts).toBeGreaterThanOrEqual(1)
    expect(eng.records).toBeGreaterThanOrEqual(5)
  })

  it('chemistry was authored in the same shape and is recovered too', () => {
    // Superseded 2026-09-13, original kept verbatim:
    //   expect(corpusRecordCount('docs/chemistry/kg/graph.json')).toEqual({ concepts: 67, records: 198 })
    const chem = corpusRecordCount('docs/chemistry/kg/graph.json')
    expect(chem.concepts).toBeGreaterThanOrEqual(67)
    expect(chem.records).toBeGreaterThanOrEqual(198)
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
    // Superseded 2026-09-13, original kept verbatim:
    //   expect(rec!.title.length).toBeGreaterThan(300)
    //   expect(rec!.title.length).toBeLessThanOrEqual(360)
    // The >300 half pinned an ARTEFACT, not an invariant: the old regex ran the
    // title through the whole wrapped heading INCLUDING its trailing
    // `(Type 1, overgeneralization …)` qualifier. The canonical parser stops at
    // the claim, so these are now ~130 chars. What the test is actually for —
    // the authored claim is present and no body prose bled in — is asserted
    // above and below, and the corpus-wide upper bound still holds.
    expect(rec!.title.length).toBeGreaterThan(60)
    expect(rec!.title.length).toBeLessThanOrEqual(360)
    // The authored body survived — recovering the heading is only half of it.
    expect(rec!.symptom, `${id} symptom`).toBeTruthy()
    expect(rec!.probe, `${id} probe`).toBeTruthy()
    expect(rec!.correction, `${id} recovery`).toBeTruthy()
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
  // Superseded 2026-09-13. The grammar moved to `ebKnowledge.ts`, so the three
  // tests here can no longer read `EB_MC_ID` / the `head` regex out of
  // `blueprintLoader.ts`. Originals kept verbatim:
  //
  //   const idPattern = /const EB_MC_ID = String\.raw`([^`]*)`/.exec(SRC)?.[1]
  //   const headPattern = /const head = new RegExp\(String\.raw`([^`]*)`\)/.exec(SRC)?.[1]
  //   it('is set to exactly 360 in the shipped parser', ...)
  //   it('does not consume body prose from an unclosed heading', ...)
  //   it('still admits a legitimate title at the top of the allowed range', ...)
  //
  // The INVARIANT is unchanged and is now asserted BEHAVIOURALLY against the
  // real parser rather than by re-deriving a regex from source — which is
  // strictly stronger, because it tests what the tutor receives rather than
  // what the file looks like. The runaway is additionally blocked by a second
  // mechanism the old parser did not have: a title reads at most the heading's
  // own two lines and stops at the first field label.

  it('does not consume body prose from an unclosed heading', () => {
    const prose = 'This is ordinary body prose that carries no asterisks at all. '.repeat(20)
    const block = `**MC-1 — a legitimate looking claim ${prose}**emphasis later**`
    expect(block.length).toBeGreaterThan(1000)
    const parsed = parseAuthoritativeMisconceptions(block, PROV)
    expect(parsed).toHaveLength(1)
    expect(parsed[0].title.length, 'a runaway title got through').toBeLessThanOrEqual(360)
    expect(parsed[0].title).not.toContain('emphasis later')
  })

  it('still admits a legitimate title at the top of the allowed range', () => {
    const title = 'a'.repeat(353)
    expect(parseAuthoritativeMisconceptions(`**MC-1 — ${title}**`, PROV)[0].title).toBe(title)
  })

  it('caps every parsed title at 360 characters', () => {
    const parsed = parseAuthoritativeMisconceptions(`**MC-1 — ${'b'.repeat(900)}**`, PROV)
    expect(parsed[0].title.length).toBeLessThanOrEqual(360)
  })
})
