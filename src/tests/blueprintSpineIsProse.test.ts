/**
 * A LEARNER MUST NEVER BE READ THE AUTHORING METADATA.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Corpus audit, Topic 2 (`phys.meas.dimensions`), real production, real learner
 * account, first probe of a clean session:
 *
 *   me    "i dont really get what a dimension is, isnt that just how many
 *          sides a shape has"
 *   tutor "Let's check that one carefully rather than me just agreeing —
 *          this is a place where it is easy to mix two things up.
 *
 *          concept_id: phys.meas.dimensions name: Dimensional Analysis
 *          domain: Measurement & Units (Physics) difficulty: developing (3)
 *          bloom: apply prerequisites: [phys.meas.units]
 *          mastery_threshold: 0.75 estimated_hours: 3 cross_links: []
 *          session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
 *          cpa_entry_stage: C …
 *
 *          Tell me in your own words what part of that is different from what
 *          you were picturing."
 *
 * ── WHY IT HAPPENED, AND WHY ONLY NOW ───────────────────────────────────────
 * Two independent defects had to line up, and the second one only became
 * reachable when `b53e93ea` shipped the authored corpus into the serverless
 * bundle for the first time. Before that the loader returned "not found" for
 * every concept, so the affirmation guard's last resort always fell through to
 * the generic template and this was invisible.
 *
 *   1. `extractSpine`'s paragraph fallback accepted a `key: value` profile
 *      block. 77 of 1,347 blueprints open their spine section with one that is
 *      NOT inside a ``` fence — so the YAML branch never saw it — and does not
 *      start with `|`, so the paragraph filter admitted it.
 *   2. The route SPOKE that spine. The blueprint spine is written for an
 *      author: even when it is not metadata it is often a mastery rubric
 *      ("[Boundary statement] A student who achieves mastery demonstrates:").
 *
 * The fix is split accordingly: the loader refuses metadata outright (it also
 * poisoned the BLUEPRINT CONTEXT prompt block for those 77 concepts), and the
 * spoken text now leads with the Knowledge Graph description — the one place
 * the curriculum states a concept in a single learner-facing sentence — with a
 * prose gate in front of whatever it uses.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { loadBlueprintContent, looksLikeMetadata } from '@/lib/curriculum/blueprintLoader'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const BLUEPRINT_DIR = path.join(process.cwd(), 'docs', 'curriculum', 'blueprints')

/** The route's own gate, mirrored exactly (route.ts, the affirm-guard last resort). */
function readsAsProse(t: string): boolean {
  const s = t.trim()
  if (s.length < 25 || s.length > 400) return false
  if (/^[[(]/.test(s)) return false
  if (/^\s*\d+[.)]\s/.test(s)) return false
  return true
}

describe('looksLikeMetadata', () => {
  it('catches the exact block that reached a learner', () => {
    expect(looksLikeMetadata(
      'concept_id: phys.meas.dimensions name: Dimensional Analysis ' +
      'domain: Measurement & Units (Physics) difficulty: developing (3) ' +
      'bloom: apply mastery_threshold: 0.75',
    )).toBe(true)
  })

  it('catches the mathematics variant, which shares no key with it', () => {
    // The two generations name almost nothing the same, which is why a
    // hardcoded key list alone would have missed one of them.
    expect(looksLikeMetadata(
      'SESSION_TA_CAP: 7 (estimated_hours = 5 → cap 7) CPA_ENTRY_STAGE: C ' +
      '(entry via concrete even/odd permutation examples)',
    )).toBe(true)
  })

  it('a single authoring key is enough on its own', () => {
    expect(looksLikeMetadata('mastery_threshold: 0.75')).toBe(true)
  })

  it('does NOT reject real prose that happens to use colons', () => {
    for (const prose of [
      'A unit is a chosen reference object. When you say "5 metres", you mean ' +
        'this distance is 5 times longer than the object we agreed to call 1 metre.',
      'Definition: dimensional analysis checks that every term in an equation ' +
        'shares the same dimensions. Note: changing units never changes dimensions.',
      'Newton\'s first law: an object keeps moving unless a force acts on it.',
    ]) {
      expect(looksLikeMetadata(prose), prose.slice(0, 40)).toBe(false)
    }
  })

  it('is silent on empty input rather than guessing', () => {
    expect(looksLikeMetadata('')).toBe(false)
    expect(looksLikeMetadata('   ')).toBe(false)
  })
})

describe('no blueprint spine is authoring metadata', () => {
  // The corpus-wide assertion. Before the fix this failed for 77 files; the
  // count is not asserted, because the right number is zero and stays zero as
  // the Curriculum Pipeline authors more.
  it('holds for every blueprint on disk', () => {
    const files = fs.readdirSync(BLUEPRINT_DIR).filter((f) => f.endsWith('.md'))
    expect(files.length).toBeGreaterThan(1000)

    const offenders: string[] = []
    let withDefinition = 0
    for (const f of files) {
      const bp = loadBlueprintContent(f.replace(/\.md$/, ''))
      if (!bp.found) continue
      const d = bp.content.conceptSpine?.definition
      if (!d) continue
      withDefinition++
      if (looksLikeMetadata(d)) offenders.push(`${f}: ${d.slice(0, 80)}`)
    }
    expect(withDefinition).toBeGreaterThan(1000)
    expect(offenders.slice(0, 5)).toEqual([])
  })

  it('the audited concept keeps a definition rather than losing one', () => {
    // Skipping the metadata paragraph must fall THROUGH to the next spine
    // section, not silently blank the spine — that would have quietly removed
    // the CONCEPT SPINE line from the prompt for all 77.
    const bp = loadBlueprintContent('phys.meas.dimensions')
    expect(bp.found).toBe(true)
    if (!bp.found) return
    const d = bp.content.conceptSpine?.definition ?? ''
    expect(d.length).toBeGreaterThan(40)
    expect(looksLikeMetadata(d)).toBe(false)
    expect(d).not.toContain('mastery_threshold')
  })
})

describe('what the guard SPEAKS is learner-facing prose', () => {
  it('rejects the rubric the blueprint now yields for the audited concept', () => {
    // This is the second half of the defect and the reason the loader fix
    // alone is insufficient: the replacement spine is honest content, and
    // still the wrong thing to say out loud.
    const bp = loadBlueprintContent('phys.meas.dimensions')
    if (!bp.found) throw new Error('fixture lost its blueprint')
    expect(readsAsProse(bp.content.conceptSpine!.definition!)).toBe(false)
  })

  it('the KG description takes over, and it is a real sentence', () => {
    const desc = getKGNode('phys.meas.dimensions')?.description ?? ''
    expect(readsAsProse(desc)).toBe(true)
    expect(desc).toMatch(/dimension/i)
  })

  it('every audited physics and chemistry concept can be answered from the KG', () => {
    // 424 concepts, the corpus this audit walks. A last resort that only works
    // for some of them is a last resort that fails exactly when it is needed.
    for (const subject of ['physics', 'chemistry'] as const) {
      const graph = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'docs', subject, 'kg', 'graph.json'), 'utf8'),
      ) as { concepts: Array<{ id: string }> }
      const missing = graph.concepts
        .filter((c) => !readsAsProse(getKGNode(c.id)?.description ?? ''))
        .map((c) => c.id)
      expect(missing.slice(0, 5), `${subject} concepts with no speakable description`).toEqual([])
    }
  })

  it('refuses an authoring marker, a bare fragment and an over-long dump', () => {
    expect(readsAsProse('[Boundary statement] A student who achieves mastery demonstrates:')).toBe(false)
    expect(readsAsProse('1. Assigns the dimensional formula to a physical quantity.')).toBe(false)
    expect(readsAsProse('Too short.')).toBe(false)
    expect(readsAsProse('x'.repeat(401))).toBe(false)
  })
})
