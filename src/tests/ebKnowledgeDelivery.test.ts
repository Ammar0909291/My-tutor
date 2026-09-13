import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  loadEBConceptContext,
  loadBlueprintContent,
  buildBlueprintContextBlock,
} from '@/lib/curriculum/blueprintLoader'
import { carriesGoverningLanguage } from '@/lib/curriculum/ebKnowledge'

/**
 * THE REAL DELIVERY PATH, not the parser in isolation.
 *
 *   EB file -> blueprintLoader -> EBConceptContext -> buildBlueprintContextBlock
 *           -> the system prompt the model is actually called with
 *
 * Parser unit tests were never the gap: the parser was believed to work and
 * the content still did not arrive. These assert that authored knowledge
 * survives every hop to the text the model receives, using the REAL loader and
 * the REAL block builder over the REAL corpus — no fixtures.
 *
 * The final hop (provider call -> learner-visible reply) is covered by the
 * existing route-level harnesses; what those could not catch, and this does, is
 * authored content never entering the prompt at all.
 */

function block(conceptId: string): string {
  const content = loadBlueprintContent(conceptId)
  const eb = loadEBConceptContext(conceptId)
  expect(eb.found, `${conceptId} has no EB entry`).toBe(true)
  if (!eb.found) return ''
  // loadBlueprintContent may legitimately miss (not every concept has a
  // Blueprint); the EB half is what this file is about.
  const c = content.found
    ? content.content
    : { conceptId, misconceptions: [], explanations: [], spine: null as never, raw: '' }
  return buildBlueprintContextBlock(c as never, eb.context, null)
}

describe('authoritative knowledge reaches the prompt', () => {
  // chem.bond.resonance is the calibration case named by the task.
  const CASES = ['chem.bond.resonance', 'phys.meas.units', 'eng.grammar.verbs', 'math.found.set-theory']

  for (const id of CASES) {
    it(`${id}: Core Understanding is present and labelled AUTHORITATIVE`, () => {
      const eb = loadEBConceptContext(id)
      if (!eb.found || !eb.context.coreUnderstanding) return // not every entry authors one
      const text = block(id)
      expect(text).toContain('CORE UNDERSTANDING (authoritative')
      // A genuine fragment of the authored text, not just the header.
      const probe = eb.context.coreUnderstanding.text.slice(0, 60)
      expect(text).toContain(probe)
    })

    it(`${id}: every parsed misconception title reaches the prompt`, () => {
      const eb = loadEBConceptContext(id)
      if (!eb.found || eb.context.ebMisconceptions.length === 0) return
      const text = block(id)
      // Deduping against the Blueprint register is deliberate, so assert the
      // union rather than each EB entry: a title present in EITHER source is
      // what the model needs.
      const missing = eb.context.ebMisconceptions.filter((m) => !text.includes(m.title.slice(0, 40)))
      const bpTitles = loadBlueprintContent(id)
      const bpSet = bpTitles.found
        ? new Set(bpTitles.content.misconceptions.map((m) => (m.title ?? '').toLowerCase()))
        : new Set<string>()
      const trulyMissing = missing.filter((m) => !bpSet.has(m.title.toLowerCase()))
      expect(trulyMissing.map((m) => m.id)).toEqual([])
    })
  }

  it('the prompt forbids inventing a condition the corpus does not state', () => {
    const text = block('chem.bond.resonance')
    if (!text.includes('CORE UNDERSTANDING (authoritative')) return
    expect(text).toMatch(/do NOT\s+invent a condition, exception, limit or convention/i)
  })

  it('CORE UNDERSTANDING and OPENING SCENARIO are separate channels', () => {
    // The defect was one channel doing both jobs, so the hook's 400-char bound
    // silently governed the authoritative text too.
    const src = readFileSync('src/lib/curriculum/blueprintLoader.ts', 'utf8')
    expect(src).toContain('CORE UNDERSTANDING (authoritative')
    expect(src).toContain('OPENING SCENARIO')
    expect(src).toMatch(/ebContext\?\.coreUnderstanding\?\.text/)
    expect(src).toMatch(/ebContext\?\.openingScenario/)
  })

  it('provenance is internal — it never reaches the learner-facing text', () => {
    for (const id of CASES) {
      const text = block(id)
      expect(text).not.toContain('educational-brain')
      expect(text).not.toContain('sourceType')
      expect(text).not.toContain('conceptSlug')
    }
  })

  it('the route emits a structured exposure failure and never a substitute', () => {
    const src = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(src).toContain('KNOWLEDGE_EXPOSURE_FAILURE=')
    expect(src).toMatch(/for \(const failure of ebContext\.knowledgeExposure\)/)
  })

  it('a RESIDUE concept still delivers its governing text AND reports the rest', () => {
    // The 44 entries whose Core Understanding cannot fit the budget are the
    // worklist, not a silence. Each must still expose governing text and
    // ALSO report what could not fit — one without the other is the defect.
    for (const id of ['chem.anal.spectroscopy', 'math.calc.limits', 'phys.qm.schrodinger-equation']) {
      const eb = loadEBConceptContext(id)
      expect(eb.found, id).toBe(true)
      if (!eb.found) continue
      const cu = eb.context.coreUnderstanding
      expect(cu, id).toBeTruthy()
      if (!cu) continue
      // Governing language DID reach the prompt, despite the budget.
      expect(carriesGoverningLanguage(cu.text), `${id} exposed no condition`).toBe(true)
      // And the shortfall is observable, with no substitute claim attached.
      const failure = eb.context.knowledgeExposure.find(
        (f) => f.kind === 'core-understanding-truncated-governing',
      )
      expect(failure, `${id} dropped a governing unit silently`).toBeTruthy()
      expect(failure!.conceptSlug).toBe(id)
      expect(failure!.exposed).toBeLessThan(failure!.authored)
      expect(Object.keys(failure!).sort()).toEqual(
        ['authored', 'conceptSlug', 'exposed', 'kind', 'section'],
      )
      // The exposed text reaches the assembled prompt verbatim.
      expect(block(id)).toContain(cu.text.slice(0, 80))
    }
  })

  it('a residue concept never exposes a truncated sentence', () => {
    for (const id of ['chem.anal.spectroscopy', 'math.calc.limits', 'phys.qm.schrodinger-equation']) {
      const eb = loadEBConceptContext(id)
      if (!eb.found || !eb.context.coreUnderstanding) continue
      const text = eb.context.coreUnderstanding.text
      expect(text, id).not.toMatch(/\b(?:vs|e\.g|i\.e|etc|cf|approx)\.$/i)
      expect(text.trim(), id).not.toMatch(/\b[a-z]+$/) // never stops mid-clause
    }
  })

  it('the loader is still the single EB reader (no competing knowledge loader)', () => {
    // A second loader with its own grammar is how this class of defect returns.
    const src = readFileSync('src/lib/curriculum/blueprintLoader.ts', 'utf8')
    expect(src).toContain("from './ebKnowledge'")
    // blueprintLoader must not keep its own misconception grammar any more.
    expect(src).not.toMatch(/const EB_MC_ID\s*=/)
    expect(src).not.toMatch(/const EB_MC_HEAD\s*=/)
  })
})
