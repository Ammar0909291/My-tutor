/**
 * A PROBE'S MISCONCEPTION ID MUST NAME SOMETHING THE REST OF THE SYSTEM KNOWS.
 *
 * ── THE DEFECT THIS PINS ────────────────────────────────────────────────────
 * When a learner picks a distractor, route.ts writes MISCONCEPTION_DETECTED
 * evidence keyed on that distractor's `misconceptionId`, and the repair path
 * (detectMisconceptions -> MISCONCEPTION_REPAIR) is meant to resolve it against
 * the authored remedy for that misconception. The blueprint is where that
 * remedy is documented, keyed by the blueprint's own id.
 *
 * So an id that appears in NO blueprint is not a naming nit. The detection
 * fires, the ledger records it, and the repair can never resolve — a silent
 * teaching failure that no count-based measure sees.
 *
 * Measured across the physics corpus: 60 distinct ids joined to nothing,
 * spread over 54 concepts. Two sub-classes, treated differently:
 *
 *   RENAME  (11, all fixed)  the same misconception under a different
 *           spelling — MC-CENTRIFUGAL-FORCE-REAL against the blueprint's
 *           MC-CENTRIFUGAL-REAL, MC-ANGLE-FROM-SURFACE against
 *           MC-REFLECTION-ANGLE-FROM-SURFACE. Each was confirmed against the
 *           blueprint's own trigger-signal text before rewriting, never on
 *           token similarity alone.
 *
 *   NO-MATCH (49, deliberately NOT "fixed")  the seed names a misconception
 *           the blueprint does not document at all — phys.therm.thermal-expansion
 *           probes MC-HOLE-SHRINKS while its blueprint documents only
 *           MC-ONLY-LENGTH-EXPANDS and MC-WATER-ALWAYS-EXPANDS-WITH-HEAT.
 *           Retargeting those onto a nearby blueprint id would make the number
 *           pass while attaching a probe to the WRONG diagnosis, which is worse
 *           than the gap. Blueprints are Curriculum-Production-Pipeline-owned,
 *           so these are recorded as curriculum feedback instead.
 *
 * ── WHAT THIS TEST DOES ─────────────────────────────────────────────────────
 * Ratchets the residue so new authoring cannot add to it. It reads the real
 * blueprints from disk, so it also fails if a blueprint drops an id a probe
 * still references.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import { SEED_PROBES } from '@/lib/teaching/assets/brainSeedAssets'

const BLUEPRINTS = path.join(process.cwd(), 'docs/curriculum/blueprints')

/**
 * A blueprint may name one misconception TWICE in a single heading — a
 * positional id and a descriptive one, "### MC-1: MC-TIME-DILATION-IS-ILLUSION".
 * Seeds use either. Treating them as separate ids reports probed
 * misconceptions as unprobed, so both are collected as ONE group.
 */
function blueprintIds(conceptId: string): Set<string> {
  const file = path.join(BLUEPRINTS, `${conceptId}.md`)
  if (!fs.existsSync(file)) return new Set()
  const ids = new Set<string>()
  for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim()
    const heading = /^#+\s*(MC-?[A-Za-z0-9/-]+?)\s*(?::\s*(MC-[A-Za-z0-9/-]+?))?\s*(?:\(|$|:|\s—)/.exec(line)
    if (heading) { ids.add(heading[1]); if (heading[2]) ids.add(heading[2]) }
    const row = /^\|\s*(MC-[A-Z][A-Za-z0-9/-]{3,})\s*\|/.exec(line)
    if (row) ids.add(row[1])
  }
  return ids
}

/** MC-1 and MC1 are the same token; only the separator differs by corpus. */
const normalise = (id: string) => id.replace(/^MC-?/, 'MC').toUpperCase()

function orphanIds(probes: ReadonlyArray<{ conceptId: string; targetedMisconceptions?: readonly string[] }>) {
  const orphans = new Set<string>()
  for (const probe of probes) {
    const known = blueprintIds(probe.conceptId)
    if (known.size === 0) continue // no blueprint on disk — nothing to join against
    const normalised = new Set([...known].map(normalise))
    for (const raw of probe.targetedMisconceptions ?? []) {
      const id = String(raw).split(':').pop()!
      if (!normalised.has(normalise(id))) orphans.add(`${probe.conceptId}:${id}`)
    }
  }
  return orphans
}

describe('every probed misconception id joins to its blueprint', () => {
  const physics = [...SEED_PROBES, ...AUTHORED_PROBES].filter((p) => p.conceptId.startsWith('phys.'))

  it('physics: unjoinable ids do not exceed the known residue', () => {
    // RATCHET. 60 -> 49 after the eleven verified renames. Every remaining
    // entry names a misconception its blueprint does not document; closing
    // them needs a blueprint change, which is the Curriculum Production
    // Pipeline's to make, not this campaign's.
    expect(orphanIds(physics).size).toBeLessThanOrEqual(49)
  })

  it('chemistry: unjoinable ids do not exceed the known residue', () => {
    // Chemistry is far cleaner — 4, all of the NO-MATCH kind. Chemistry is
    // also fully seeded in production, so rewriting a stored
    // targetedMisconceptions value would diverge the repo from the rows
    // already serving. Left alone deliberately.
    expect(orphanIds(CHEMISTRY_PROBES).size).toBeLessThanOrEqual(4)
  })

  it('the eleven repaired ids stay repaired', () => {
    // Each of these was a live broken join. Naming them explicitly means a
    // revert fails here with the specific id, not just a count.
    const repaired = [
      'phys.mech.center-of-mass:MC-COM-IS-GEOMETRIC-CENTRE',
      'phys.mech.center-of-mass:MC-COM-VELOCITY-SUM',
      'phys.opt.reflection:MC-REFLECTION-ANGLE-FROM-SURFACE',
      'phys.mech.circular-motion:MC-CENTRIFUGAL-REAL',
      'phys.mech.newtons-second-law:MC-MASS-IS-WEIGHT',
      'phys.mech.normal-force:MC-NORMAL-EQUALS-WEIGHT',
      'phys.mech.buoyancy:MC-BUOYANCY-PROPORTIONAL-TO-DEPTH',
      'phys.wave.standing-waves:MC-ALL-PIPES-SAME-HARMONICS',
      'phys.wave.sound-waves:MC-PITCH-IS-LOUDNESS',
      'phys.opt.nature-of-light:MC-PHOTON-ENERGY-DEPENDS-ON-INTENSITY',
      'phys.em.emf:MC-TERMINAL-VOLTAGE-EQUALS-EMF',
    ]
    const orphans = orphanIds(physics)
    for (const id of repaired) {
      const [conceptId, mc] = [id.slice(0, id.lastIndexOf(':')), id.slice(id.lastIndexOf(':') + 1)]
      expect(orphans.has(id)).toBe(false)
      expect([...blueprintIds(conceptId)].map(normalise)).toContain(normalise(mc))
    }
  })
})

/**
 * A SECOND DEFECT CLASS: THE ID JOINS, BUT THE PROBE TESTS SOMETHING ELSE.
 *
 * The suite above catches ids that match NO blueprint. It cannot catch a probe
 * whose id matches a real blueprint id while the QUESTION diagnoses a
 * different misconception — the join succeeds and every count looks healthy.
 *
 * Two were found by reading chem.bio concept by concept:
 *
 *   chem.bio.enzyme-kinetics — tags SWAPPED. The probe asking "Km 0.1 vs
 *     10 mM, which binds more strongly?" is exactly blueprint MC-1 ("a higher
 *     Km means the enzyme binds more strongly") but carried MC2; the
 *     competitive-inhibitor probe is MC-2's territory and carried MC1.
 *
 *   chem.bio.lipids — the probe on unsaturated melting points carried MC1,
 *     but blueprint MC-1 is saponification ("just dissolves the fat in the
 *     base"); the probe actually tests MC-2 ("unsaturated means liquid").
 *     Blueprint MC-1 was therefore UNPROBED while appearing covered.
 *
 * Why this is worse than a plain gap: a learner who errs has
 * MISCONCEPTION_DETECTED written against the wrong id, so the repair path
 * serves the remedy for a misconception they do not hold.
 *
 * This cannot be detected structurally — it needs a human reading of stem
 * against blueprint. These assertions pin the two that were found, so the
 * correction cannot silently revert, and record the class for the rest of the
 * corpus, which has NOT been audited this way.
 */
describe('probes whose id joined but whose content did not', () => {
  const tagOf = (conceptId: string, stemFragment: string) => {
    const probe = CHEMISTRY_PROBES.find(
      (p) => p.conceptId === conceptId && p.stem.includes(stemFragment),
    )
    expect(probe, `probe not found: ${conceptId} / ${stemFragment}`).toBeDefined()
    return (probe!.targetedMisconceptions ?? []).map((m) => String(m).split(':').pop())
  }

  it('enzyme-kinetics: the Km-affinity probe is MC1, the inhibitor probe is MC2', () => {
    // blueprint MC-1 is the Km/affinity inversion; MC-2 is competitive vs
    // non-competitive. These were crossed.
    expect(tagOf('chem.bio.enzyme-kinetics', 'Which has higher substrate affinity')).toEqual(['MC1'])
    expect(tagOf('chem.bio.enzyme-kinetics', 'What happens to the apparent Km and Vmax')).toEqual(['MC2'])
  })

  it('lipids: saponification is MC1; the melting-point probes are MC2', () => {
    expect(tagOf('chem.bio.lipids', 'Has the fat simply dissolved in the base')).toEqual(['MC1'])
    expect(tagOf('chem.bio.lipids', 'LOWER melting points than saturated fats')).toEqual(['MC2'])
  })
})
