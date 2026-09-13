import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'
import {
  countMisconceptionCandidates,
  parseAuthoritativeMisconceptions,
  packCoreUnderstanding,
  carriesGoverningLanguage,
  MISCONCEPTION_HEAD_PATTERN,
} from '@/lib/curriculum/ebKnowledge'
import { loadEBConceptContext, EB_CORE_UNDERSTANDING_BUDGET } from '@/lib/curriculum/blueprintLoader'

/**
 * THE AUTHORED-CONTENT CONTRACT (2026-09-13).
 *
 *   IF authoritative teaching content exists in a supported EB section,
 *   THEN the runtime either exposes it, OR reports an observable failure.
 *
 * This file is the mechanical half. It scans EVERY Educational Brain concept
 * entry — no hand-maintained list of affected concepts — and calls the SAME
 * functions the runtime calls, so a shape the test accepts and a shape the
 * tutor receives cannot drift apart.
 *
 * Measured before the fix: 3,016 authored candidate blocks produced 1,220
 * parsed entries, and 664 of 1,118 files parsed to ZERO while authoring real
 * content. None of it was observable.
 */

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (entry.endsWith('.md')) out.push(p)
  }
  return out
}

/** Mirrors blueprintLoader's `extractEBSection` heading grammar. Section
 *  LOCATION is the loader's business; this file's subject is what happens to a
 *  section's contents once found. */
function section(content: string, ...titles: string[]): string | null {
  for (const title of titles) {
    for (const startRe of [
      new RegExp(`^## ${title}\\s*\\n`, 'mi'),
      new RegExp(`^## \\d+\\.\\s+${title}[^\\n]*\\n`, 'mi'),
    ]) {
      const start = startRe.exec(content)
      if (!start) continue
      const after = content.slice(start.index + start[0].length)
      const end = /^## /m.exec(after)
      const raw = (end ? after.slice(0, end.index) : after).trim()
      if (raw) return raw
    }
  }
  return null
}

const EB_ROOT = 'educational-brain/concepts'
const FILES = walk(EB_ROOT).filter((f) => basename(f, '.md').includes('.'))
const PROV = (id: string) =>
  ({ sourceType: 'educational-brain', conceptSlug: id, section: 'Misconceptions' }) as const

describe('corpus contract — authored misconceptions equal parsed misconceptions', () => {
  it('scans the whole corpus, not a sample', () => {
    expect(FILES.length).toBeGreaterThan(1000)
  })

  it('NO file authors misconceptions and parses zero (the 664-file defect)', () => {
    const totalLoss: string[] = []
    for (const file of FILES) {
      const sec = section(readFileSync(file, 'utf8'), 'Misconceptions', 'Misconception library', 'Misconception Library')
      if (!sec) continue
      const authored = countMisconceptionCandidates(sec)
      if (authored === 0) continue
      const parsed = parseAuthoritativeMisconceptions(sec, PROV(basename(file, '.md')))
      if (parsed.length === 0) totalLoss.push(basename(file, '.md'))
    }
    expect(totalLoss).toEqual([])
  })

  it('NO file loses part of its authored misconceptions', () => {
    const partial: Array<{ concept: string; authored: number; parsed: number }> = []
    for (const file of FILES) {
      const sec = section(readFileSync(file, 'utf8'), 'Misconceptions', 'Misconception library', 'Misconception Library')
      if (!sec) continue
      const authored = countMisconceptionCandidates(sec)
      const parsed = parseAuthoritativeMisconceptions(sec, PROV(basename(file, '.md'))).length
      if (parsed < authored) partial.push({ concept: basename(file, '.md'), authored, parsed })
    }
    expect(partial).toEqual([])
  })

  it('the corpus still carries the volume the audit measured', () => {
    let authored = 0
    for (const file of FILES) {
      const sec = section(readFileSync(file, 'utf8'), 'Misconceptions', 'Misconception library', 'Misconception Library')
      if (sec) authored += countMisconceptionCandidates(sec)
    }
    // 2,906 at the time of writing. A floor, not an equality: the corpus grows.
    // If this ever DROPS sharply, either the corpus lost content or the head
    // pattern narrowed — both are defects, and both should stop a deploy.
    expect(authored).toBeGreaterThanOrEqual(2800)
  })

  it('every parsed entry carries a usable title and provenance', () => {
    const bad: string[] = []
    for (const file of FILES.slice(0, 400)) {
      const id = basename(file, '.md')
      const sec = section(readFileSync(file, 'utf8'), 'Misconceptions', 'Misconception library', 'Misconception Library')
      if (!sec) continue
      for (const e of parseAuthoritativeMisconceptions(sec, PROV(id))) {
        if (!e.title || e.title === e.id) bad.push(`${id}/${e.id}: no title`)
        if (e.provenance.conceptSlug !== id) bad.push(`${id}/${e.id}: wrong provenance`)
        if (e.provenance.sourceType !== 'educational-brain') bad.push(`${id}/${e.id}: wrong sourceType`)
        if (!(e.provenance.line >= 1)) bad.push(`${id}/${e.id}: no line`)
      }
    }
    expect(bad).toEqual([])
  })
})

describe('the head pattern is a LABEL test, not a prose test', () => {
  const head = () => new RegExp(MISCONCEPTION_HEAD_PATTERN, 'm')

  // A — numeric heading (the original physics/english shape)
  it('A. **M1 — Title** parses', () => {
    const r = parseAuthoritativeMisconceptions('**M1 — Units are interchangeable labels**\n- *Why*: x', PROV('c'))
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('M1')
    expect(r[0].title).toBe('Units are interchangeable labels')
  })

  // B — descriptive slug id
  it('B. a descriptive-slug id parses and its title is the slug as words', () => {
    const r = parseAuthoritativeMisconceptions(
      '**MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS (Blueprint Component 1) —\nType 1, overgeneralization**\n- *Why*: x',
      PROV('c'),
    )
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS')
    expect(r[0].title.length).toBeGreaterThan(0)
  })

  // C — non-bold markdown heading with a colon
  it('C. ### MC-1: TITLE parses', () => {
    const r = parseAuthoritativeMisconceptions(
      '### MC-1: DOMAIN-COVERAGE-OMISSION (Type 1)\n**Trigger**: the learner says X\n**Repair**: state both conditions',
      PROV('c'),
    )
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('MC-1')
    expect(r[0].title).toContain('DOMAIN-COVERAGE-OMISSION')
    expect(r[0].symptom).toContain('learner says X')
    expect(r[0].correction).toContain('state both conditions')
  })

  // D — parenthetical qualifier where a dash was previously required
  it('D. - **MC-1 (Type 5 — instruction-induced)**: parses with its fields', () => {
    const r = parseAuthoritativeMisconceptions(
      '- **MC-1 (Type 5 — instruction-induced)**: "Lone pairs do not count." Probe: "What is the hybridization of N?" Intervention: four domains means sp3.',
      PROV('c'),
    )
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('MC-1')
    expect(r[0].title).toContain('Lone pairs')
    expect(r[0].probe).toContain('hybridization')
    expect(r[0].correction).toContain('sp3')
  })

  // E — single-letter id
  it('E. MC-A / MC-B parse (157 eng.communication entries)', () => {
    const r = parseAuthoritativeMisconceptions(
      '- **MC-A (Type 5, instruction-induced)**: "Claim one."\n- **MC-B (Type 1)**: "Claim two."',
      PROV('c'),
    )
    expect(r.map((e) => e.id)).toEqual(['MC-A', 'MC-B'])
  })

  // F — prose must NOT be classified as a misconception
  it('F. ordinary prose and cross-references are NOT misconceptions', () => {
    for (const line of [
      'The student confuses two ideas here and needs a second example.',
      'This compounds MC-3.',
      'Clear this before MC-2 or the repair will not hold.',
      '- **Birth type:** Type 1 (overgeneralization) — foundational',
      '- **Misconception:** something a learner believes',
      'Many students think mass and weight are the same.',
      '- *Why*: the learner extends a correct rule past its boundary',
    ]) {
      expect(head().test(line), line).toBe(false)
      expect(parseAuthoritativeMisconceptions(line, PROV('c'))).toEqual([])
    }
  })

  it('G. the counter and the parser agree on every shape above', () => {
    const sec = [
      '**M1 — Alpha**',
      '- **MC-2 — Beta**',
      '- **MC-3 (Type 1 — x)**: Gamma',
      '### MC-4: DELTA',
      '- **MC-A (Type 2)**: Epsilon',
      '**MC-A-DESCRIPTIVE-SLUG (note) — Type 1**',
    ].join('\n')
    expect(countMisconceptionCandidates(sec)).toBe(6)
    expect(parseAuthoritativeMisconceptions(sec, PROV('c'))).toHaveLength(6)
  })
})

describe('Core Understanding is packed, never sliced', () => {
  it('H. a governing clause beyond the old 400-char cut survives', () => {
    const filler = 'This concept describes how the quantity behaves in ordinary situations. '.repeat(8)
    const governing = 'This holds only if the system is closed and no external torque acts.'
    const packed = packCoreUnderstanding(`${filler}\n\n${governing}`, EB_CORE_UNDERSTANDING_BUDGET)
    expect(filler.length).toBeGreaterThan(400) // the old boundary is genuinely crossed
    expect(packed.text).toContain('only if the system is closed')
    expect(packed.droppedGoverning).toBe(false)
  })

  it('I. under a tight budget a governing unit is rescued over a descriptive one', () => {
    const units = [
      'Alpha describes the ordinary behaviour of the quantity in simple cases.',
      'Beta adds another purely descriptive observation about the same thing.',
      'Gamma is valid only when the temperature is held constant.',
    ]
    const packed = packCoreUnderstanding(units.join('\n\n'), 140)
    expect(packed.text).toContain('valid only when')
    expect(packed.truncated).toBe(true)
  })

  it('never emits a half sentence — every exposed unit is complete', () => {
    const src = 'One complete sentence here. A second complete sentence follows it.'
    const packed = packCoreUnderstanding(src, 40)
    for (const piece of packed.text.split(/(?<=\.)\s+/)) {
      if (piece.trim()) expect(src).toContain(piece.trim())
    }
  })

  it('K. losing a governing unit is REPORTED, not hidden', () => {
    const packed = packCoreUnderstanding(
      `${'Padding sentence that is purely descriptive. '.repeat(6)}\n\nThis is valid only when friction is negligible.`,
      60,
    )
    expect(packed.droppedGoverning).toBe(true)
    expect(carriesGoverningLanguage('valid only when friction is negligible')).toBe(true)
    expect(carriesGoverningLanguage('the ball rolls down the ramp')).toBe(false)
  })
})

describe('the real delivery path — loader, not just the parser', () => {
  // chem.bond.resonance is the calibration case named by the task.
  const CASES = ['chem.bond.resonance', 'phys.meas.units', 'eng.grammar.verbs', 'math.found.set-theory']

  for (const id of CASES) {
    it(`J. ${id}: loader exposes authored knowledge with provenance`, () => {
      const r = loadEBConceptContext(id)
      expect(r.found).toBe(true)
      if (!r.found) return
      const ctx = r.context
      // Whatever the entry authors, it must not be silently lost.
      expect(ctx.knowledgeExposure.filter((f) => f.kind === 'misconceptions-unparsed')).toEqual([])
      if (ctx.ebMisconceptions.length > 0) {
        for (const m of ctx.ebMisconceptions) {
          expect(m.provenance.conceptSlug).toBe(id)
          expect(m.provenance.sourceType).toBe('educational-brain')
        }
      }
      if (ctx.coreUnderstanding) {
        expect(ctx.coreUnderstanding.text.length).toBeGreaterThan(0)
        expect(ctx.coreUnderstanding.exposedChars).toBe(ctx.coreUnderstanding.text.length)
      }
    })
  }

  it('L. exposes MORE Core Understanding than the opening hook ever did', () => {
    // The hook's old behaviour: first paragraph, cut at 400 characters.
    let improved = 0
    let sampled = 0
    for (const file of FILES.slice(0, 250)) {
      const core = section(readFileSync(file, 'utf8'), 'Core Understanding')
      if (!core) continue
      sampled++
      const oldExposed = Math.min((core.split(/\n\n+/)[0] ?? '').replace(/\s+/g, ' ').trim().length, 400)
      const now = packCoreUnderstanding(core, EB_CORE_UNDERSTANDING_BUDGET).exposedChars
      if (now > oldExposed) improved++
    }
    expect(sampled).toBeGreaterThan(100)
    expect(improved / sampled).toBeGreaterThan(0.8)
  })

  it('the loader reports an exposure failure rather than inventing content', () => {
    // No code path may fabricate a replacement claim. Structural: the failure
    // type has no field that could carry one.
    const src = readFileSync('src/lib/curriculum/ebKnowledge.ts', 'utf8')
    const iface = src.slice(src.indexOf('export interface KnowledgeExposureFailure'))
    const body = iface.slice(0, iface.indexOf('}'))
    for (const banned of ['text', 'replacement', 'fallback', 'content']) {
      expect(body.includes(`${banned}:`), `KnowledgeExposureFailure must not carry ${banned}`).toBe(false)
    }
  })
})
