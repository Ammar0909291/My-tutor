/**
 * C2 — BrainScript → CEKR lowering, the CLI, and the pilot slice.
 *
 * Masterplan C2 Definition of Done: "pilot compiles to CEKR cleanly." That is
 * asserted against the real file on disk, not a fixture — a pilot that only
 * passes in a test harness has not tested the authoring experience.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fromBrainScript, lowerBlocks } from '@/lib/cekr/fromBrainScript'
import { check, formatReport, fmt, isFormatted } from '@/lib/cekr/cli'
import { parse } from '@/lib/brain-compiler/parser'
import { validateCorpus } from '@/lib/cekr/validate'
import { isEdge, type CekrEdge, type CekrEnvelope } from '@/lib/cekr/types'
import { revisionHash } from '@/lib/cekr/canonical'

const PILOT = 'brain/pilot/fractions.bs'
const LEGACY = 'brain/physics-mechanics.bs'
const pilotSource = readFileSync(PILOT, 'utf8')

const lower = (source: string, file = 't.bs') => fromBrainScript(source, { file })

// ── THE C2 DEFINITION OF DONE ───────────────────────────────────────────────

describe('the pilot slice compiles to CEKR cleanly (C2 DoD)', () => {
  it('produces zero diagnostics and zero V-code findings', () => {
    const report = check([{ file: PILOT, source: pilotSource }])
    // formatReport is the failure message an author would see.
    expect(formatReport(report)).toContain('0 findings')
    expect(report.ok).toBe(true)
  })

  it('is a CONSTELLATION, not a lone concept', () => {
    // A single entity proves nothing about the representation. The pilot has
    // to exercise the shape every future subject needs.
    const { records } = lower(pilotSource, PILOT)
    const kinds = new Set(records.filter((r) => !isEdge(r)).map((r) => (r as CekrEnvelope).kind))
    for (const k of ['Concept', 'Capability', 'MentalModel', 'Misconception',
                     'Analogy', 'AssessmentItem', 'MasteryCondition', 'RecoveryScript']) {
      expect(kinds).toContain(k)
    }
    const edgeKinds = new Set(records.filter(isEdge).map((e) => (e as CekrEdge).edgeKind))
    for (const e of ['REQUIRES', 'UNLOCKS', 'REQUIRES_CAPABILITY', 'EXPLAINS',
                     'TARGETS', 'BREEDS', 'ASSESSES', 'SIGNALS', 'REPAIRS']) {
      expect(edgeKinds).toContain(e)
    }
  })

  it('nothing in the pilot is ACTIVE — ACTIVE requires human review', () => {
    const { records } = lower(pilotSource, PILOT)
    expect(records.every((r) => r.status === 'DRAFT')).toBe(true)
  })

  it('the analogy declares what it breeds, rather than leaving it to be found', () => {
    const { records } = lower(pilotSource, PILOT)
    const breeds = records.filter(isEdge).filter((e) => (e as CekrEdge).edgeKind === 'BREEDS')
    expect(breeds).toHaveLength(1)
    // V-11 would have failed the file otherwise; this asserts the intent.
    expect(validateCorpus(splitCorpus(records)).filter((f) => f.code === 'V-11')).toEqual([])
  })

  it('every distractor is mapped or declared a slip (V-12)', () => {
    const { records } = lower(pilotSource, PILOT)
    expect(validateCorpus(splitCorpus(records)).filter((f) => f.code === 'V-12')).toEqual([])
  })
})

function splitCorpus(records: ReturnType<typeof lower>['records']) {
  return {
    entities: records.filter((r) => !isEdge(r)) as CekrEnvelope[],
    edges: records.filter(isEdge) as CekrEdge[],
  }
}

// ── BACKWARD COMPATIBILITY OF THE GRAMMAR REVISION ─────────────────────────

describe('the grammar widening is strictly backward compatible', () => {
  const legacySource = readFileSync(LEGACY, 'utf8')

  it('the pre-existing source still parses, with blocks intact', () => {
    const r = parse(LEGACY, legacySource)
    expect(r.diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(r.blocks.length).toBeGreaterThan(0)
    expect(r.blocks.some((b) => b.kind === '::pack')).toBe(true)
    expect(r.blocks.some((b) => b.kind === '::rule')).toBe(true)
  })

  it('lowercase block kinds still open blocks', () => {
    const r = parse('t.bs', '::rule X v1\nband: 3\n::end\n')
    expect(r.blocks[0].kind).toBe('::rule')
  })

  it('PascalCase kinds now open blocks too (CEKR §2.2 spelling)', () => {
    const r = parse('t.bs', '::Concept a.b\ntitle: "x"\n::end\n')
    expect(r.blocks[0].kind).toBe('::Concept')
  })

  it('indented fields are accepted (the formatter indents them)', () => {
    const r = parse('t.bs', '::Concept a.b\n  title: "x"\n::end\n')
    expect(r.diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(r.blocks[0].fields.title).toBe('x')
  })

  it('@ opens the directive namespace and cannot collide with a body field', () => {
    const { records } = lower('::Concept a.b\n  title: "x"\n  @status: "REVIEW"\n  @tags: ["t"]\n::end\n')
    const e = records[0] as CekrEnvelope
    expect(e.status).toBe('REVIEW')
    expect(e.tags).toEqual(['t'])
    expect(e.body).toEqual({ title: 'x' })      // directives never leak into body
  })
})

// ── LOWERING ────────────────────────────────────────────────────────────────

describe('lowering', () => {
  it('is PURE — a re-run produces byte-identical records', () => {
    const a = lower(pilotSource, PILOT).records
    const b = lower(pilotSource, PILOT).records
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
    // Which is what the content-addressed store depends on.
    expect(a.map(revisionHash)).toEqual(b.map(revisionHash))
  })

  it('does not read the clock (createdAt is injected)', () => {
    const one = lowerBlocks(parse('t.bs', '::Concept a.b\ntitle: "x"\n::end\n').blocks, { file: 't.bs' })
    expect(one.records[0].provenance.createdAt).toBe('1970-01-01T00:00:00.000Z')
  })

  it('the id kind always agrees with the kind field (V-2 by construction)', () => {
    const { records } = lower('::mentalmodel m.1\nstatements: []\n::end\n')
    const e = records[0] as CekrEnvelope
    expect(e.kind).toBe('MentalModel')                  // registered spelling
    expect(e.id).toBe('cekr:MentalModel/m.1')
  })

  it('skips ::pack and ::rule silently — one file may feed both lowerings', () => {
    const r = lower('::pack p 0.1.0\n::end\n::rule R v1\nband: 3\n::end\n')
    expect(r.records).toEqual([])
    expect(r.diagnostics.filter((d) => d.severity === 'E')).toEqual([])
  })

  it('DIAGNOSES an unknown block kind rather than guessing', () => {
    const r = lower('::wombat w\nx: 1\n::end\n')
    expect(r.diagnostics.some((d) => d.code === 'E2003')).toBe(true)
    expect(r.records).toEqual([])
  })

  it('diagnoses a malformed edge header', () => {
    expect(lower('::edge REQUIRES onlyone\n::end\n').diagnostics.some((d) => d.code === 'E2001')).toBe(true)
  })

  it('diagnoses an unknown edge kind', () => {
    expect(lower('::edge WOMBATS a -> b\n::end\n').diagnostics.some((d) => d.code === 'E2002')).toBe(true)
  })

  it('diagnoses a missing slug', () => {
    expect(lower('::Concept\ntitle: "x"\n::end\n').diagnostics.some((d) => d.code === 'E2004')).toBe(true)
  })

  it('always attaches at least one citation (V-1 by construction)', () => {
    const { records } = lower('::Concept a.b\ntitle: "x"\n::end\n', 'somewhere.bs')
    expect(records[0].citations[0].file).toBe('somewhere.bs')
    expect(records[0].citations.length).toBeGreaterThanOrEqual(1)
  })
})

// ── CHECK (Ring 1 + Ring 2) ─────────────────────────────────────────────────

describe('check', () => {
  it('reports Ring 1 (syntax) and Ring 2 (V-codes) together', () => {
    // An author fixing a file wants every finding at once, not one per run.
    const r = check([{ file: 'a.bs', source: '::wombat w\nx: 1\n::end\n::Concept c.1\n@status: "ACTIVE"\ntitle: "x"\n::end\n' }])
    expect(r.diagnostics.some((d) => d.code === 'E2003')).toBe(true)   // Ring 1
    expect(r.findings.some((f) => f.code === 'V-16')).toBe(true)       // Ring 2
    expect(r.ok).toBe(false)
  })

  it('is MULTI-FILE, because V-3/V-4/V-8 are corpus properties', () => {
    // Checking file-at-a-time would report a false unresolved reference for
    // every cross-file edge.
    const a = { file: 'a.bs', source: '::Concept x.1\ntitle: "a"\nprereqsComplete: true\n::end\n' }
    const b = {
      file: 'b.bs',
      source: '::Concept y.1\ntitle: "b"\nprereqsComplete: true\n::end\n' +
              '::edge REQUIRES cekr:Concept/y.1 -> cekr:Concept/x.1\n::end\n' +
              '::edge UNLOCKS cekr:Concept/x.1 -> cekr:Concept/y.1\n::end\n',
    }
    expect(check([a, b]).findings.filter((f) => f.code === 'V-3')).toEqual([])
    // …and alone, b legitimately fails.
    expect(check([b]).findings.some((f) => f.code === 'V-3')).toBe(true)
  })

  it('an empty input set is trivially ok', () => {
    expect(check([]).ok).toBe(true)
  })

  it('the report is stable across runs', () => {
    const input = [{ file: PILOT, source: pilotSource }]
    expect(formatReport(check(input))).toBe(formatReport(check(input)))
  })
})

// ── FMT ─────────────────────────────────────────────────────────────────────

describe('fmt', () => {
  it('is IDEMPOTENT — fmt(fmt(x)) === fmt(x)', () => {
    // A formatter that is not a fixed point cannot be run in CI.
    for (const s of [pilotSource, '::Concept a.b\ntitle:"x"\n::end', '', '\n\n\n', '# just a comment\n']) {
      expect(fmt(fmt(s))).toBe(fmt(s))
    }
  })

  it('NEVER reorders fields — order carries the author\'s emphasis', () => {
    const src = '::Concept a.b\n  zzz: 1\n  aaa: 2\n::end\n'
    expect(fmt(src)).toContain('zzz')
    expect(fmt(src).indexOf('zzz')).toBeLessThan(fmt(src).indexOf('aaa'))
  })

  it('normalises whitespace without changing meaning', () => {
    const messy = '::Concept   a.b\n\n\n   title:    "x"   \n::end\n\n\n'
    const tidy = fmt(messy)
    expect(tidy).toBe('::Concept   a.b\n  title: "x"\n::end\n')
    // Same parse before and after — formatting is meaning-preserving.
    expect(parse('t.bs', messy).blocks[0].fields).toEqual(parse('t.bs', tidy).blocks[0].fields)
  })

  it('preserves comments', () => {
    expect(fmt('# header\n::Concept a.b\n  # why\n  title: "x"\n::end\n')).toContain('# why')
  })

  it('always ends with exactly one newline', () => {
    for (const s of [pilotSource, '::Concept a.b\ntitle: 1\n::end']) {
      expect(fmt(s).endsWith('\n')).toBe(true)
      expect(fmt(s).endsWith('\n\n')).toBe(false)
    }
  })

  it('the pilot is already formatted', () => {
    expect(isFormatted(pilotSource)).toBe(true)
  })

  it('formatted output still parses and still validates', () => {
    const r = check([{ file: PILOT, source: fmt(pilotSource) }])
    expect(r.ok).toBe(true)
  })
})
