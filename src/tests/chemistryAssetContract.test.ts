import { describe, it, expect } from 'vitest'
import { CHEMISTRY_EXPLANATIONS, CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import { probeToMcq } from '@/lib/teaching/gateAssessment'

/**
 * CHEMISTRY MEETS THE ASSET CONTRACT, PER SERVED BAND.
 *
 * ── WHAT THE CONTRACT IS ────────────────────────────────────────────────────
 * Closing a concept needs THREE graded answers — correctAtCheck >= 1 plus
 * correctAtPractice >= 2 — and the gate never re-asks a probe it has spent. So
 * a concept with two gradeable probes cannot be finished by a learner who
 * answers everything correctly, no matter how well it is taught.
 *
 * ── WHY THIS FILE EXISTS ────────────────────────────────────────────────────
 * Measured in production 2026-08-19: chemistry held exactly two ACTIVE
 * closed-choice probes for all 186 concepts. Zero were at contract, so no
 * chemistry lesson could reach mastery — while the other 314 probes sat
 * authored, in this very file, unseeded. The catalogue is now complete; this
 * test is what stops it drifting back.
 *
 * ── PER BAND, NOT PER CONCEPT ───────────────────────────────────────────────
 * The subtle half, and the one that was actually wrong. Assets are matched by
 * (concept, language, gradeBand), so a concept whose probes are split across
 * two bands can hold five probes and still serve two. chem.org.spectroscopy was
 * exactly that: explanations and two probes UNDERGRADUATE, three probes HIGH.
 * Counting per concept said "at contract"; counting per band — which is what a
 * learner experiences — said 2.
 */

type Probe = (typeof CHEMISTRY_PROBES)[number]

const closed = (p: Probe) => Array.isArray(p.choices) && p.choices.length >= 2

const key = (conceptId: string, band: unknown) => `${conceptId}::${String(band)}`

describe('the chemistry corpus can finish a lesson', () => {
  it('every concept has at least one explanation', () => {
    const concepts = new Set(CHEMISTRY_PROBES.map((p) => p.conceptId))
    const explained = new Set(CHEMISTRY_EXPLANATIONS.map((e) => e.conceptId))
    const missing = [...concepts].filter((c) => !explained.has(c))
    expect(missing).toEqual([])
  })

  it('every (concept, band) that is taught carries >= 3 closed-choice probes', () => {
    // Bands come from the EXPLANATIONS: that is the band a learner is actually
    // taught in, and therefore the band whose probes must be sufficient.
    const taught = new Set(CHEMISTRY_EXPLANATIONS.map((e) => key(e.conceptId, e.gradeBand)))
    const counts = new Map<string, number>()
    for (const p of CHEMISTRY_PROBES) {
      if (!closed(p)) continue
      const k = key(p.conceptId, p.gradeBand)
      counts.set(k, (counts.get(k) ?? 0) + 1)
    }
    const short = [...taught]
      .map((k) => ({ k, n: counts.get(k) ?? 0 }))
      .filter(({ n }) => n < 3)
      .map(({ k, n }) => `${k} has ${n}`)
    expect(short).toEqual([])
  })

  it('no probe is stranded in a band the concept is never taught in', () => {
    // The failure mode above, seen from the other side: a probe in a band with
    // no explanation is content that can never be reached, and it inflates any
    // per-concept count into looking healthy.
    const taught = new Set(CHEMISTRY_EXPLANATIONS.map((e) => key(e.conceptId, e.gradeBand)))
    const stranded = CHEMISTRY_PROBES
      .filter((p) => !taught.has(key(p.conceptId, p.gradeBand)))
      .map((p) => `${p.conceptId} ${String(p.gradeBand)} ${p.probeKind}`)
    expect(stranded).toEqual([])
  })

  it('every probe actually converts to a gradeable widget', () => {
    // >= 3 probes is worth nothing if the gate cannot render them as a question
    // with an answer key — that is the ungradeable-question class (E6), where a
    // turn goes out as prose the server cannot score and the rung is lost.
    const refused = CHEMISTRY_PROBES
      .filter((p) => probeToMcq({
        stem: p.stem,
        choices: (p.choices as Array<{ text: string; isCorrect: boolean }> | undefined) ?? null,
      }) === null)
      .map((p) => `${p.conceptId} ${p.probeKind}`)
    expect(refused).toEqual([])
  })

  it('canonical identities are unique — one row per slug in the seed lineage', () => {
    // A duplicate identity aborts the whole bootstrap before any write
    // (seedIdentityValidation), so this is a hard gate on the corpus, not a
    // tidiness check.
    const slugs = CHEMISTRY_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${String(p.gradeBand)}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
