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

  /**
   * chem.period, audited stem-by-stem against the blueprints. FIVE probes in
   * seven concepts carried a tag whose blueprint text they did not test —
   * a far higher rate than chem.bio's two in six, and the reason this class
   * is now checked on every concept rather than sampled.
   */
  it('classification: the "main limitation" probe is MC3, not MC2', () => {
    // MC-2 is "Mendeleev's table had no predictive power". A question about
    // the table's LIMITATION tests mass-vs-atomic-number, which is MC-3.
    expect(tagOf('chem.period.classification', 'main limitation')).toEqual(['MC3'])
    expect(tagOf('chem.period.classification', 'eka-aluminium')).toEqual(['MC2'])
  })

  it('electron-affinity: the F/Cl anomaly is MC2 and the neon probe is MC3', () => {
    // MC-1 is the sign-convention error; neither existing probe tested it,
    // so it also gained a probe of its own.
    expect(tagOf('chem.period.electron-affinity', 'Chlorine has a more negative')).toEqual(['MC2'])
    expect(tagOf('chem.period.electron-affinity', 'Would neon (a noble gas)')).toEqual(['MC3'])
    expect(tagOf('chem.period.electron-affinity', 'Which attracts an added electron more strongly')).toEqual(['MC1'])
  })

  /**
   * chem.sol — SIX more in six concepts. The running rate across every
   * concept audited stem-by-stem is now 13 defects in 19 concepts that
   * carried pre-existing probes.
   */
  it('sol.types: like-dissolves-like is MC2', () => {
    // was MC1+MC3; MC-2 is "solubility is absolute", which is what the
    // oil/water/hexane contrast actually diagnoses.
    expect(tagOf('chem.sol.types', 'Oil does not dissolve in water')).toEqual(['MC2'])
  })

  it('sol.solubility: the bends is MC3, not MC2', () => {
    // N2 is a non-reactive gas that nonetheless dissolves — MC-3. MC-2 is
    // "Henry's law applies to solid solutes", which now has its own probe.
    expect(tagOf('chem.sol.solubility', 'deep-sea diver must ascend slowly')).toEqual(['MC3'])
    expect(tagOf('chem.sol.solubility', 'raising the pressure on solid NaCl')).toEqual(['MC2'])
  })

  it('sol.vapour-pressure: NaCl-vs-sugar is MC2 and the three-phenomena probe is MC3', () => {
    expect(tagOf('chem.sol.vapour-pressure', 'roughly the SAME amount as 1 mole of sugar')).toEqual(['MC2'])
    expect(tagOf('chem.sol.vapour-pressure', 'three separate phenomena')).toEqual(['MC3'])
    expect(tagOf('chem.sol.vapour-pressure', 'Per mole of dissolved PARTICLES')).toEqual(['MC1'])
  })

  it('sol.activity: the deviation probe is MC1; gamma>1 is MC2', () => {
    expect(tagOf('chem.sol.activity', 'measured cell potential that deviates')).toEqual(['MC1'])
    expect(tagOf('chem.sol.activity', 'POSITIVE deviation from Raoult')).toEqual(['MC2'])
  })

  it('sol.colligative: the van\'t Hoff probe is MC2, not molarity-vs-molality', () => {
    expect(tagOf('chem.sol.colligative', 'What effective particle molality')).toEqual(['MC2'])
    expect(tagOf('chem.sol.colligative', 'rather than molarity')).toEqual(['MC1'])
  })

  /**
   * chem.solid — FIVE more in six concepts. Three of its probes additionally
   * test something NO misconception on their concept documents (the glass
   * softening probe on crystal-systems, the doping probe on defects, the
   * p-type charge-neutrality probe on properties). Those tags are left as
   * recorded defects rather than retargeted onto an unrelated id.
   */
  it('solid.crystal-systems: fractional corner counting is MC2', () => {
    expect(tagOf('chem.solid.crystal-systems', 'How many atoms actually belong')).toEqual(['MC2'])
    expect(tagOf('chem.solid.crystal-systems', 'Is that a body-centred cubic')).toEqual(['MC1'])
  })

  it('solid.packing: packing efficiency is MC3; fluorite holes are MC2', () => {
    expect(tagOf('chem.solid.packing', 'only 52% efficient')).toEqual(['MC3'])
    expect(tagOf('chem.solid.packing', 'Does that mean Ca2+ sits in octahedral holes')).toEqual(['MC2'])
  })

  it('solid.defects: Frenkel-vs-Schottky is MC1', () => {
    expect(tagOf('chem.solid.defects', 'AgBr commonly shows Frenkel defects')).toEqual(['MC1'])
  })

  it('solid.ionic-solids: NaCl-vs-CsCl structure is MC3', () => {
    expect(tagOf('chem.solid.ionic-solids', 'Do they adopt the same crystal structure')).toEqual(['MC3'])
    expect(tagOf('chem.solid.ionic-solids', 'what species does the LATTICE ENERGY step')).toEqual(['MC2'])
  })

  it('solid.properties: the semiconductor temperature probe is MC3', () => {
    expect(tagOf('chem.solid.properties', 'does the electrical conductivity of silicon')).toEqual(['MC3'])
    expect(tagOf('chem.solid.properties', 'Solid NaCl is packed full')).toEqual(['MC1'])
  })

  /**
   * chem.hyd — FIVE more retags. Two concepts (alkanes, conformations) had
   * BOTH probes testing something no misconception on their concept
   * documents, so both concepts had all three MCs unprobed while reading as
   * covered; each gained three probes rather than a token third.
   */
  it('hyd.alkynes: both acidity probes are MC3; MC1/MC2 gained their own', () => {
    expect(tagOf('chem.hyd.alkynes', 'dramatically more acidic')).toEqual(['MC3'])
    expect(tagOf('chem.hyd.alkynes', 'deprotonated by a weak base')).toEqual(['MC3'])
    expect(tagOf('chem.hyd.alkynes', 'Lindlar catalyst or Na in liquid NH3')).toEqual(['MC1'])
    expect(tagOf('chem.hyd.alkynes', 'hydrated with H2SO4/HgSO4')).toEqual(['MC2'])
  })

  it('hyd.petroleum: cracking is MC2 and fuel-shape is MC3', () => {
    expect(tagOf('chem.hyd.petroleum', 'economically important process')).toEqual(['MC2'])
    expect(tagOf('chem.hyd.petroleum', 'quality as an engine fuel')).toEqual(['MC3'])
    expect(tagOf('chem.hyd.petroleum', 'where are the HEAVY fractions collected')).toEqual(['MC1'])
  })

  it('hyd.arenes: deactivating-but-directing is MC2, and nitration is MC1', () => {
    expect(tagOf('chem.hyd.arenes', 'deactivating (makes the ring less reactive')).toEqual(['MC2'])
    expect(tagOf('chem.hyd.arenes', 'What actually attacks the ring')).toEqual(['MC1'])
  })

  it('valency: both oxidation-state probes are MC3, and MC1/MC2 gained their own', () => {
    // Both pre-existing probes ask about oxidation state (MC-3) while
    // carrying MC1 and MC2, leaving the fixed-valency and NCl5
    // misconceptions with no diagnostic at all.
    expect(tagOf('chem.period.valency', 'In CH₄ (methane), carbon is assigned')).toEqual(['MC3'])
    expect(tagOf('chem.period.valency', 'oxidation state of hydrogen in NaH')).toEqual(['MC3'])
    expect(tagOf('chem.period.valency', 'valency in H2S, and in H2SO4')).toEqual(['MC1'])
    expect(tagOf('chem.period.valency', 'Can nitrogen, directly above it, form NCl5')).toEqual(['MC2'])
  })
})
