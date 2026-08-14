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

/**
 * A THIRD DEFECT CLASS, FOUND BY READING chem.org.iupac: A BROKEN ID PREFIX.
 *
 * Every misconception id is `<conceptId>:<MCn>`. The orphan check below takes
 * `id.split(':').pop()` and joins the TAIL against the blueprint — so a
 * corrupted PREFIX passes it silently.
 *
 * chem.org.iupac carried, in three places, the literal string
 * "${IUPAC}:MC2". A batch script had emitted `${'${IUPAC}'}:MC2`, which is a
 * template literal wrapping a single-quoted string, so the interpolation never
 * ran. The tail is "MC2", which joins to the blueprint perfectly, and the
 * orphan ratchet was green throughout.
 *
 * The runtime cost is total, not cosmetic. route.ts writes
 * MISCONCEPTION_DETECTED keyed on the distractor's misconceptionId, and
 * detectMisconceptions resolves it against the CONCEPT. An id whose concept
 * segment is "${IUPAC}" matches no concept that exists, so the detection fires
 * into nothing and the repair can never resolve — the same silent teaching
 * failure the orphan check was written to prevent, entering through the half
 * of the id it never looked at.
 *
 * This asserts the whole id, not the tail.
 */
describe('a misconception id names the concept it belongs to', () => {
  const corpora: ReadonlyArray<readonly [string, ReadonlyArray<{
    conceptId: string
    targetedMisconceptions?: readonly string[]
    choices?: ReadonlyArray<{ misconceptionId?: string }> | null
  }>]> = [
    ['physics', [...SEED_PROBES, ...AUTHORED_PROBES]],
    ['chemistry', CHEMISTRY_PROBES],
  ]

  it.each(corpora)('%s: every id is exactly `<its own conceptId>:<MC>`', (_subject, probes) => {
    const wrong: string[] = []
    for (const probe of probes) {
      const ids = [
        ...(probe.targetedMisconceptions ?? []),
        ...(probe.choices ?? []).map((c) => c.misconceptionId).filter(Boolean),
      ] as string[]
      for (const id of ids) {
        const prefix = id.slice(0, id.lastIndexOf(':'))
        // Physics uses descriptive ids (MC-CENTRIFUGAL-REAL) with no concept
        // prefix at all; only prefixed ids are constrained here.
        if (!id.includes(':')) continue
        if (prefix !== probe.conceptId) wrong.push(`${probe.conceptId} -> ${id}`)
      }
    }
    expect(wrong).toEqual([])
  })

  it.each(corpora)('%s: no id contains an uninterpolated template literal', (_subject, probes) => {
    // The specific failure mode above. Cheap, exact, and would have caught it
    // on the commit that introduced it.
    const literal: string[] = []
    for (const probe of probes) {
      const ids = [
        ...(probe.targetedMisconceptions ?? []),
        ...(probe.choices ?? []).map((c) => c.misconceptionId).filter(Boolean),
      ] as string[]
      for (const id of ids) if (id.includes('${')) literal.push(`${probe.conceptId} -> ${id}`)
    }
    expect(literal).toEqual([])
  })
})

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

  /**
   * chem.alc — one retag, but the notable finding is chem.alc.diols: BOTH
   * probes tested boiling point and antifreeze colligative behaviour, neither
   * of which its blueprint documents, so all three MCs were unprobed while
   * every structural measure read the concept as covered.
   */
  it('alc.alcohols: tertiary-alcohol oxidation is MC3', () => {
    expect(tagOf('chem.alc.alcohols', 'A tertiary alcohol is treated with a standard oxidizing')).toEqual(['MC3'])
    expect(tagOf('chem.alc.alcohols', 'mixed with aqueous NaOH')).toEqual(['MC1'])
    expect(tagOf('chem.alc.alcohols', 'oxidised with PCC in dichloromethane')).toEqual(['MC2'])
  })

  it('alc.diols: all three MCs now have their own probe', () => {
    expect(tagOf('chem.alc.diols', 'treated with periodate')).toEqual(['MC1'])
    expect(tagOf('chem.alc.diols', 'treated with OsO4')).toEqual(['MC2'])
    expect(tagOf('chem.alc.diols', 'treated with acid and rearranges')).toEqual(['MC3'])
  })

  /**
   * chem.kinet — a NEW variant: probes tagged with TWO ids where only one is
   * actually tested. The extra id makes the concept look broader than it is
   * and, worse, mis-routes a wrong answer to a second misconception the
   * learner may not hold. Four of the seven concepts had this shape.
   */
  it('kinet: probes carry only the misconception they actually test', () => {
    // stoichiometric rate ratios test MC-1; MC-3 ("heat melts particles")
    // was along for the ride.
    expect(tagOf('chem.kinet.rate', 'if d[O₂]/dt = 0.05 M/s')).toEqual(['MC1'])
    // quantum yield >> 1 is MC-1; the Beer-Lambert log base (MC-2) is not asked.
    expect(tagOf('chem.kinet.photochemistry', 'quantum yield of about 10')).toEqual(['MC1'])
    // determining orders experimentally is MC-1, not "more concentration is
    // always faster" (MC-2).
    expect(tagOf('chem.kinet.rate-law', 'quadruples the rate')).toEqual(['MC1'])
    // constant half-life => first order is MC-1; the 1/[A] slope is MC-2.
    expect(tagOf('chem.kinet.integrated-rate', 'half-life of 10 days regardless')).toEqual(['MC1'])
  })

  it('kinet.mechanism: the rate-determining-step probe is MC1, the catalyst probe MC2', () => {
    expect(tagOf('chem.kinet.mechanism', 'Step 1: A + B → C (slow)')).toEqual(['MC1'])
    expect(tagOf('chem.kinet.mechanism', 'Should X appear in the overall balanced')).toEqual(['MC2'])
    expect(tagOf('chem.kinet.mechanism', 'Is the mechanism thereby proved')).toEqual(['MC3'])
  })

  /**
   * chem.pblock — four retags, and TWO more hollow concepts (group15,
   * group16), bringing the hollow total to six. group16 had all three MCs
   * unprobed while carrying two valid-looking probes.
   */
  it('pblock: diamond-vs-graphite is MC2 and the halogen trend probes are MC3', () => {
    expect(tagOf('chem.pblock.group14', 'Diamond is an electrical insulator')).toEqual(['MC2'])
    expect(tagOf('chem.pblock.group17', 'Alkali metal reactivity INCREASES')).toEqual(['MC3'])
    expect(tagOf('chem.pblock.group17', 'Can iodine (I₂) displace chlorine')).toEqual(['MC3'])
    expect(tagOf('chem.pblock.trends', 'inert-pair effect explains why lead')).toEqual(['MC3'])
  })

  /**
   * chem.coord — the worst domain measured so far: SIX of its seven concepts
   * were hollow (cft, bonding, applications, isomerism, werner, and — after
   * the one retag below — nothing left over on nomenclature either). Both
   * pre-existing probes on each of those concepts tested something the
   * blueprint does not document, so every documented misconception was
   * unprobed while the structural measures all read "covered": two probes,
   * two distinct ids, both ids joining to a real blueprint heading.
   *
   * Only ONE probe in the whole domain survived the stem-vs-blueprint read
   * unchanged with a correct tag — chem.coord.stability's chelate-effect
   * MCQ, whose distractor states MC-1 ("each individual bond is stronger")
   * verbatim. It is pinned here so a later edit cannot quietly break the
   * one probe that was already right.
   */
  it('coord: the bis(ethylenediamine) probe is MC3, not MC1', () => {
    // blueprint MC-1 is ligand ORDER (alphabetical vs by abundance); MC-3 is
    // "di-ethylenediamine means two ethylene groups within one ligand" —
    // which is exactly what the di-/bis- probe asks about. MC-1 and MC-2 had
    // no probe at all until this batch.
    expect(tagOf('chem.coord.nomenclature', 'diethylenediamine')).toEqual(['MC3'])
    expect(tagOf('chem.coord.nomenclature', 'Which ligand name is written first')).toEqual(['MC1'])
    expect(tagOf('chem.coord.nomenclature', 'potassium hexacyanidoferrate')).toEqual(['MC2'])
  })

  it('coord: stability MC1 was already correct and stays correct', () => {
    expect(tagOf('chem.coord.stability', 'chelate effect')).toEqual(['MC1'])
    expect(tagOf('chem.coord.stability', 'survives for weeks in 1 M acid')).toEqual(['MC2'])
    expect(tagOf('chem.coord.stability', 'OVERALL formation constant')).toEqual(['MC3'])
  })

  /**
   * chem.org — the last domain, and it held a defect none of the earlier ones
   * did: a BROKEN ID, not a mis-tagged one.
   *
   * chem.org.iupac carried the literal string "${IUPAC}:MC2" in three places
   * (see the id-prefix suite above for why every structural check missed it).
   * The same probe pair also carried the author's own working out inside a
   * learner-facing distractor — "(chloro before methyl alphabetically? No —
   * "chloro" < "methyl" alphabetically, so actually 3-chloro-2-methyl is
   * correct)" — which states the answer inside the wrong choice.
   *
   * Repairing that exposed a THIRD flaw in the same probe: its stem has the
   * learner notice chloro FIRST, so the discovery-order belief it claims to
   * test yields the CORRECT name by coincidence and cannot be detected. The
   * distractor now carries the locant-order belief, which is the one that
   * actually produces the wrong name here.
   *
   * chem.org.mechanisms and chem.org.arrow-pushing are CLEAN — every
   * pre-existing distractor states its own misconception.
   */
  it('org.iupac: the broken id is repaired and the probe is diagnostic again', () => {
    expect(tagOf('chem.org.iupac', '2-methylpentane')).toEqual(['MC2'])
    const probe = CHEMISTRY_PROBES.find(
      (p) => p.conceptId === 'chem.org.iupac' && p.stem.includes('chloro substituent at position 3'),
    )!
    const wrong = (probe.choices ?? []).filter((c) => !c.isCorrect)
    expect(wrong).toHaveLength(1)
    // The distractor must state a belief, not argue itself into the answer.
    expect(wrong[0].text).toContain('ascending locant order')
    expect(wrong[0].text).not.toContain('alphabetically')
  })

  it('org: mechanisms and arrow-pushing were already clean', () => {
    expect(tagOf('chem.org.mechanisms', 'what does the arrow actually represent moving')).toEqual(['MC1'])
    expect(tagOf('chem.org.mechanisms', 'fishhook) arrow be used interchangeably')).toEqual(['MC2'])
    expect(tagOf('chem.org.arrow-pushing', 'where does the tail (start) of each arrow originate')).toEqual(['MC1'])
    expect(tagOf('chem.org.arrow-pushing', 'two curly arrows be drawn from the SAME lone pair')).toEqual(['MC2'])
  })

  it('org: electronic-effects P1 is MC-2, not MC-1', () => {
    // Its distractor is "a single substituent must have inductive and
    // mesomeric effects that always point in the same direction" — the
    // halogen case, MC-2, not MC-1 (EWGs "add electrons").
    expect(tagOf('chem.org.electronic-effects', 'Chlorine attached to a benzene ring')).toEqual(['MC2'])
  })

  it('org: every documented misconception now has a probe authored FOR it', () => {
    expect(tagOf('chem.org.iupac', 'every IUPAC name ending in')).toEqual(['MC3'])

    expect(tagOf('chem.org.isomerism', 'glyceraldehyde is dextrorotatory')).toEqual(['MC1'])
    expect(tagOf('chem.org.isomerism', 'meso-tartaric acid')).toEqual(['MC2'])
    expect(tagOf('chem.org.isomerism', 'staggered and eclipsed ethane')).toEqual(['MC3'])

    expect(tagOf('chem.org.hybridization', 'trimethylamine and pyridine')).toEqual(['MC1'])
    expect(tagOf('chem.org.hybridization', 'carbonyl oxygen has two lone pairs')).toEqual(['MC2'])
    expect(tagOf('chem.org.hybridization', 'central carbon of CO₂')).toEqual(['MC3'])

    expect(tagOf('chem.org.electronic-effects', 'Trichloroacetic acid')).toEqual(['MC1'])
    expect(tagOf('chem.org.electronic-effects', 'Aniline (pKb 9.4)')).toEqual(['MC3'])

    expect(tagOf('chem.org.mechanisms', 'no acid, no base and no metal')).toEqual(['MC3'])
    expect(tagOf('chem.org.arrow-pushing', 'checking formal charges is an optional extra')).toEqual(['MC3'])
    expect(tagOf('chem.org.reactive-intermediates', 'Singlet and triplet carbenes')).toEqual(['MC3'])
    expect(tagOf('chem.org.aromaticity', 'cyclopentadienyl ANION')).toEqual(['MC3'])
    expect(tagOf('chem.org.pericyclic', 'maleic anhydride gives the ENDO')).toEqual(['MC3'])

    expect(tagOf('chem.org.spectroscopy', 'is the base peak the molecular ion')).toEqual(['MC1'])
    expect(tagOf('chem.org.spectroscopy', 'appears as a triplet')).toEqual(['MC2'])
    expect(tagOf('chem.org.spectroscopy', 'broad O–H absorption')).toEqual(['MC3'])

    expect(tagOf('chem.org.purification', 'compound A has Rf 0.8')).toEqual(['MC1'])
    expect(tagOf('chem.org.purification', 'melts at 118–124')).toEqual(['MC3'])
    expect(tagOf('chem.org.qualitative-analysis', 'iodoethane')).toEqual(['MC3'])
  })

  /**
   * The five stragglers left by domains audited BEFORE this campaign adopted
   * the stem-vs-blueprint check. Each is a 4-misconception blueprint whose
   * last entry, or an MC-3, was never probed. Closing them takes chemistry to
   * zero unprobed misconceptions across all 186 concepts.
   */
  it('the pre-campaign stragglers are closed', () => {
    expect(tagOf('chem.period.periodic-properties', 'Lithium and potassium')).toEqual(['MC4'])
    expect(tagOf('chem.redox.oxidation-state', 'sodium hydride')).toEqual(['MC4'])
    expect(tagOf('chem.sblock.water', 'CaSO₄ is boiled')).toEqual(['MC3'])
    expect(tagOf('chem.hyd.polycyclic', 'Rank benzene, furan and thiophene')).toEqual(['MC3'])
    expect(tagOf('chem.dblock.oxo-species', 'vanadyl ion')).toEqual(['MC3'])
  })

  /**
   * chem.bond — TWO crossed pairs in one domain, and the first concept whose
   * ENTIRE probe pair belonged to a neighbour.
   *
   * chem.bond.vsepr: the NH₃ probe tests "molecular geometry IS electron
   * geometry" (MC-2) and carried MC-1; the CO₂ probe tests "double bonds count
   * as two domains" (MC-1) and carried MC-2. chem.bond.mo-theory: the O₂
   * paramagnetism probe IS MC-2 and carried MC-1; the He₂ bond-order-zero
   * probe IS MC-1 and carried MC-2. Crossed pairs three and four.
   *
   * chem.bond.bond-parameters is the stronger finding. Its blueprint documents
   * bond STRENGTH and LENGTH (double-is-twice-as-strong, enthalpy-is-fixed,
   * longer-is-stronger) and BOTH its probes ask about molecular POLARITY —
   * CCl₄ and water-versus-CO₂ — which is chem.bond.polar-molecules MC-1 word
   * for word. Meanwhile bond-parameters' OWN MC-1 was being probed inside
   * chem.bond.covalent-bonding (the C=C-is-twice-as-strong probe). A
   * three-way displacement, invisible to every count.
   */
  it('bond.vsepr: crossed pair three is uncrossed', () => {
    expect(tagOf('chem.bond.vsepr', 'Ammonia (NH₃) has 3 bonding pairs')).toEqual(['MC2'])
    expect(tagOf('chem.bond.vsepr', 'CO₂ has the structure O=C=O')).toEqual(['MC1'])
    expect(tagOf('chem.bond.vsepr', 'SF₄ has 4 bonding pairs')).toEqual(['MC3'])
  })

  it('bond.mo-theory: crossed pair four is uncrossed', () => {
    expect(tagOf('chem.bond.mo-theory', 'simple Lewis structure for O₂')).toEqual(['MC2'])
    expect(tagOf('chem.bond.mo-theory', 'bond order of 0 for He₂')).toEqual(['MC1'])
    expect(tagOf('chem.bond.mo-theory', 'NO⁺ also has bond order 3')).toEqual(['MC3'])
  })

  it('bond.bond-parameters: its own three misconceptions are now probed', () => {
    // All three authored, because both pre-existing probes are polarity
    // questions belonging to chem.bond.polar-molecules. They are left in
    // place — sound gradeable questions, filed under the wrong concept.
    expect(tagOf('chem.bond.bond-parameters', 'Is a C=C double bond about 700')).toEqual(['MC1'])
    expect(tagOf('chem.bond.bond-parameters', 'O–H bond enthalpy as 463')).toEqual(['MC2'])
    expect(tagOf('chem.bond.bond-parameters', 'a longer bond is stronger')).toEqual(['MC3'])
  })

  it('bond: the three other retags', () => {
    // covalent-bonding P1 is the low-boiling-point probe = MC-2 (intermolecular
    // confused with intramolecular strength), not MC-1 (polarity).
    expect(tagOf('chem.bond.covalent-bonding', 'relatively low boiling point')).toEqual(['MC2'])
    // polar-molecules P1's distractor is "more polar bonds means more polar"
    // = MC-3 word for word, not MC-1.
    expect(tagOf('chem.bond.polar-molecules', 'SF₆ has six polar S-F bonds')).toEqual(['MC3'])
    // resonance P2 is about which structure DOMINATES = MC-3, not MC-2
    // (moving atoms between structures).
    expect(tagOf('chem.bond.resonance', 'three possible resonance structures')).toEqual(['MC3'])
  })

  it('bond: every documented misconception now has a probe authored FOR it', () => {
    expect(tagOf('chem.bond.ionic-bonding', 'NaCl melts at 801')).toEqual(['MC2'])

    expect(tagOf('chem.bond.covalent-bonding', 'Is CO₂ a polar molecule')).toEqual(['MC1'])
    expect(tagOf('chem.bond.covalent-bonding', 'ammonium ion NH₄⁺')).toEqual(['MC3'])

    expect(tagOf('chem.bond.metallic-bonding', 'molten copper')).toEqual(['MC2'])
    expect(tagOf('chem.bond.metallic-bonding', 'Sodium has 1 valence electron')).toEqual(['MC3'])

    expect(tagOf('chem.bond.polar-molecules', 'BF₃ and NF₃')).toEqual(['MC1'])
    expect(tagOf('chem.bond.polar-molecules', 'dipole moment of 1.47 D')).toEqual(['MC2'])

    expect(tagOf('chem.bond.intermolecular', 'about 20 kJ/mol')).toEqual(['MC1'])
    expect(tagOf('chem.bond.intermolecular', 'Hexane')).toEqual(['MC2'])
    expect(tagOf('chem.bond.intermolecular', 'ice sinks in water')).toEqual(['MC3'])

    expect(tagOf('chem.bond.hybridization', 'Oxygen in water has 2 bonding pairs')).toEqual(['MC1'])
    expect(tagOf('chem.bond.hybridization', 'physically "rearrange"')).toEqual(['MC2'])

    expect(tagOf('chem.bond.resonance', 'moving the hydrogen from carbon to nitrogen')).toEqual(['MC2'])

    expect(tagOf('chem.bond.coordinate-bond', 'which species is the Lewis ACID')).toEqual(['MC2'])
    expect(tagOf('chem.bond.coordinate-bond', 'hydrogen-bonds to a neighbouring water')).toEqual(['MC3'])
  })

  /**
   * chem.equil — a SECOND cross-concept distractor, and a domain whose own
   * catalyst misconception was being probed inside a neighbouring concept.
   *
   * chem.equil.kc-kp P1 asks what a catalyst does to a reaction at
   * equilibrium. That is chem.equil.le-chatelier MC-1 ("a catalyst shifts the
   * equilibrium position"), not any of kc-kp's three misconceptions, which are
   * about exponents, omitted solids and Kp-versus-Kc. Meanwhile le-chatelier's
   * OWN P1 is an inert-gas-at-constant-volume probe — a PRESSURE question,
   * i.e. its MC-3 — carrying MC-1. So the catalyst misconception was probed,
   * in the wrong concept, while the concept that documents it had its slot
   * occupied by a pressure probe.
   *
   * chem.equil.concept is CLEAN: all three of its distractors state their
   * misconception verbatim, and only ΔG° = 0 (MC-3) needed authoring.
   */
  it('equil: the catalyst misconception now lives where it is documented', () => {
    // le-chatelier P1 becomes MC-3 (pressure), and MC-1 (catalyst) gets the
    // probe it never had. kc-kp P1 is left in place and recorded: it is a
    // sound catalyst question, simply filed under a concept that does not
    // document the belief.
    expect(tagOf('chem.equil.le-chatelier', 'Adding an inert gas')).toEqual(['MC3'])
    expect(tagOf('chem.equil.le-chatelier', 'catalyst is added to a reaction sitting at equilibrium')).toEqual(['MC1'])
  })

  it('equil: the three other retags', () => {
    // kc-kp P2's distractor is "solids included as a fixed constant" = MC-2
    // (pure solids must appear), not MC-3 (Kp always equals Kc).
    expect(tagOf('chem.equil.kc-kp', 'CaCO₃')).toEqual(['MC2'])
    // acids-bases P2 is the Lewis probe — a base need not involve protons at
    // all, which is MC-3's territory, not MC-2 (pKa ordering).
    expect(tagOf('chem.equil.acids-bases', 'BF₃ reacts with NH₃')).toEqual(['MC3'])
    // titration P2's distractor is "a pH 7 indicator would always be correct"
    // = MC-3 (any indicator for any titration), not MC-2 (endpoint vs
    // equivalence).
    expect(tagOf('chem.equil.titration', 'phenolphthalein')).toEqual(['MC3'])
  })

  it('equil: chem.equil.concept was already clean and stays clean', () => {
    expect(tagOf('chem.equil.concept', 'What is actually happening at the molecular level')).toEqual(['MC1', 'MC2'])
    expect(tagOf('chem.equil.concept', '95% reactants and 5% products')).toEqual(['MC2'])
    expect(tagOf('chem.equil.concept', 'K = 4.2')).toEqual(['MC3'])
  })

  it('equil: every documented misconception now has a probe authored FOR it', () => {
    expect(tagOf('chem.equil.kc-kp', 'how do the coefficients')).toEqual(['MC1'])
    expect(tagOf('chem.equil.kc-kp', 'are Kp and Kc numerically equal')).toEqual(['MC3'])

    expect(tagOf('chem.equil.acids-bases', 'conjugate base of H₂SO₄')).toEqual(['MC1'])
    expect(tagOf('chem.equil.acids-bases', 'chloroacetic acid')).toEqual(['MC2'])

    expect(tagOf('chem.equil.kw-ph', '0.01 M HCl')).toEqual(['MC2'])
    expect(tagOf('chem.equil.kw-ph', 'pH 3.4')).toEqual(['MC3'])

    expect(tagOf('chem.equil.weak-acid', 'Kb for acetate')).toEqual(['MC2'])
    expect(tagOf('chem.equil.weak-acid', 'chloroacetic acid, Ka = 1.4')).toEqual(['MC3'])

    expect(tagOf('chem.equil.buffer', 'dilute a pH 4.76 acetate buffer')).toEqual(['MC1'])
    expect(tagOf('chem.equil.buffer', 'buffer capacity greatest')).toEqual(['MC3'])

    expect(tagOf('chem.equil.titration', 'endpoint the same thing')).toEqual(['MC2'])
    expect(tagOf('chem.equil.titration', 'HALF-equivalence point')).toEqual(['MC4'])

    expect(tagOf('chem.equil.hydrolysis', 'NaCl dissolves in water')).toEqual(['MC1'])
    expect(tagOf('chem.equil.hydrolysis', 'hydrolysis constant Kh')).toEqual(['MC3'])
    expect(tagOf('chem.equil.hydrolysis', 'NH₄Cl solution is basic')).toEqual(['MC4'])

    expect(tagOf('chem.equil.solubility', 'Ag₂CrO₄ dissolving')).toEqual(['MC2'])
    expect(tagOf('chem.equil.solubility', 'go into Q_sp')).toEqual(['MC3'])

    expect(tagOf('chem.equil.complex-equil', 'What is K for the overall dissolution')).toEqual(['MC1'])
    expect(tagOf('chem.equil.complex-equil', 'DISSOCIATION of that complex')).toEqual(['MC2'])
  })

  /**
   * chem.thermo — two more hollow concepts, and the first distractor found to
   * belong to a DIFFERENT CONCEPT entirely.
   *
   * chem.thermo.enthalpy P1's distractor is "breaking the H-H bond releases
   * energy which powers the reaction". That is not any of enthalpy's three
   * documented misconceptions — it is chem.thermo.bond-enthalpy MC-1, word for
   * word, sitting in the wrong concept's probe. Every earlier mis-tag pointed
   * at the wrong id WITHIN a concept; this one points across concepts, so
   * repairing it needed a new probe on enthalpy AND the existing bond-enthalpy
   * MC-1 probe authored separately.
   *
   * chem.thermo.gibbs was hollow in a way worth recording: its crossover-
   * temperature probe does the unit conversion CORRECTLY in the answer key
   * (40000/100), which is exactly MC-3's skill — but neither distractor is the
   * unit error, so a learner holding MC-3 is never caught. A correct worked
   * answer is not a diagnostic.
   */
  it('thermo: the four concepts whose tags moved', () => {
    // first-law P1: both distractors are ΔH-versus-ΔU claims = MC-2, and it
    // carried MC-1 (expansion means w positive).
    expect(tagOf('chem.thermo.first-law', 'Δn_gas')).toEqual(['MC2'])
    // first-law P2: "heat measured in any calorimeter is always ΔH" is MC-3
    // (q_p and q_v differ only in name), not MC-2.
    expect(tagOf('chem.thermo.first-law', 'bomb calorimeter')).toEqual(['MC3'])
    // bond-enthalpy P1: "they should be identical" is MC-2 (bond enthalpies
    // give exact ΔH), not MC-1 (breaking releases energy).
    expect(tagOf('chem.thermo.bond-enthalpy', 'two ways')).toEqual(['MC2'])
    // heat-capacities P1: its second distractor is another Cp/Cv claim, not
    // MC-3 (γ < 1).
    expect(tagOf('chem.thermo.heat-capacities', 'Why is Cp always greater')).toEqual(['MC1'])
    // third-law P2: "the Third Law only applies to elements" is MC-1 (it
    // applies to all materials), not MC-2 (no jumps).
    expect(tagOf('chem.thermo.third-law', 'residual entropy')).toEqual(['MC1'])
  })

  it('thermo: the cross-concept distractor is now probed in its own concept', () => {
    // The bond-breaking-releases-energy belief belongs to bond-enthalpy MC-1.
    // enthalpy gets its own MC-1 probe (Hess via a hypothetical route), and
    // bond-enthalpy gets the rubber-band probe the belief actually needs.
    expect(tagOf('chem.thermo.bond-enthalpy', 'explains combustion by saying')).toEqual(['MC1'])
    expect(tagOf('chem.thermo.enthalpy', 'BURNING CO in oxygen')).toEqual(['MC1'])
  })

  it('thermo: every documented misconception now has a probe authored FOR it', () => {
    expect(tagOf('chem.thermo.system', 'pour half of a beaker')).toEqual(['MC2'])
    expect(tagOf('chem.thermo.system', 'Where is the system boundary')).toEqual(['MC3'])

    expect(tagOf('chem.thermo.first-law', 'gas EXPANDS')).toEqual(['MC1'])

    expect(tagOf('chem.thermo.enthalpy', 'ΔH°f for O₂(g)')).toEqual(['MC2'])
    expect(tagOf('chem.thermo.enthalpy', 'combustion of methane')).toEqual(['MC3'])

    expect(tagOf('chem.thermo.entropy', 'S° also zero')).toEqual(['MC2'])
    expect(tagOf('chem.thermo.entropy', 'ammonium nitrate')).toEqual(['MC3'])

    expect(tagOf('chem.thermo.gibbs', 'ΔG° = 0 at 298 K')).toEqual(['MC1'])
    expect(tagOf('chem.thermo.gibbs', 'ΔG° = +12 kJ/mol')).toEqual(['MC2'])
    expect(tagOf('chem.thermo.gibbs', 'crossover temperature')).toEqual(['MC3'])

    expect(tagOf('chem.thermo.bond-enthalpy', 'most electronegative element')).toEqual(['MC3'])

    expect(tagOf('chem.thermo.heat-capacities', 'Helium is monatomic')).toEqual(['MC2'])
    expect(tagOf('chem.thermo.heat-capacities', 'γ = Cₚ/Cᵥ = 0.8')).toEqual(['MC3'])

    expect(tagOf('chem.thermo.third-law', 'through melting and boiling')).toEqual(['MC2'])
    expect(tagOf('chem.thermo.third-law', 'Kirchhoff')).toEqual(['MC3'])

    expect(tagOf('chem.thermo.cell-thermo', 'ΔG° = +212 kJ/mol or −212')).toEqual(['MC1'])
    expect(tagOf('chem.thermo.cell-thermo', 'deliver current faster')).toEqual(['MC3'])
  })

  /**
   * chem.atomic — eleven retag operations, the most in any single domain, and
   * a reminder that a probe can be excellent and still be filed wrong.
   *
   * chem.atomic.bohr-model is the clearest case: BOTH of P1's distractors
   * ("n = infinity, furthest means lowest energy"; "n = 1 has the highest
   * energy because it is closest to the positive nucleus") are the
   * energy-versus-distance confusion, which is MC-1 word for word, and both
   * carried MC-2 ("Bohr describes all atoms"). Meanwhile P2 asks exactly why
   * the model fails for helium — MC-2 itself — and carried MC-3. So MC-1 and
   * MC-2 were each probed well and each filed under the wrong id.
   *
   * chem.atomic.orbitals was hollow: "what is a node?" and "does one electron
   * live in each lobe?" are both sound, and neither is MC-1 (d orbitals all
   * have four lobes), MC-2 (radial node count) or MC-3 (same-n degeneracy).
   *
   * chem.atomic.photoelectric-effect is one of the few CLEAN concepts found in
   * this campaign — all three pre-existing probes diagnose the id they carry.
   */
  it('atomic.bohr-model: both misconceptions were probed, and both were filed wrong', () => {
    expect(tagOf('chem.atomic.bohr-model', 'MOST negative (lowest) energy')).toEqual(['MC1'])
    expect(tagOf('chem.atomic.bohr-model', 'fail for helium')).toEqual(['MC2'])
    expect(tagOf('chem.atomic.bohr-model', 'Should it still be taught')).toEqual(['MC3'])
  })

  it('atomic: the other retags', () => {
    // subatomic P1's second distractor is another Z/A confusion, not the
    // ion-electron-count misconception it carried.
    expect(tagOf('chem.atomic.subatomic-particles', 'An atom has 17 protons')).toEqual(['MC1'])
    // EMR P1's second distractor is the same wavelength-energy error as its
    // first, not MC-3 ("radio waves have no energy").
    expect(tagOf('chem.atomic.electromagnetic-radiation', 'Which photon carries MORE energy')).toEqual(['MC1'])
    // QMM P1 IS the uncertainty-is-instrumental probe = MC-3, not MC-1 (psi
    // versus psi squared).
    expect(tagOf('chem.atomic.quantum-mech-model', 'Heisenberg Uncertainty Principle states')).toEqual(['MC3'])
    // QNUM P1 tests that l runs 0..n-1 = MC-1, not MC-3 (m_s belongs to the
    // orbital).
    expect(tagOf('chem.atomic.quantum-numbers', 'Which sub-shell does NOT exist')).toEqual(['MC1'])
    // ECONF P2's distractor is "electrons are removed from 3d first" — MC-1
    // verbatim, and it carried MC-2 (Hund across subshells).
    expect(tagOf('chem.atomic.electronic-config', 'What is the configuration of Fe')).toEqual(['MC1'])
  })

  it('atomic: photoelectric-effect was already correct and stays correct', () => {
    // Three probes, three correct tags, nothing to change. Pinned because a
    // clean concept is as worth protecting as a repaired one.
    expect(tagOf('chem.atomic.photoelectric-effect', 'work function of 4.0 eV')).toEqual(['MC1'])
    expect(tagOf('chem.atomic.photoelectric-effect', 'double the INTENSITY')).toEqual(['MC1'])
    expect(tagOf('chem.atomic.photoelectric-effect', 'tennis ball')).toEqual(['MC2'])
  })

  it('atomic: every documented misconception now has a probe authored FOR it', () => {
    expect(tagOf('chem.atomic.atomic-theory', 'deflected backwards')).toEqual(['MC2'])
    expect(tagOf('chem.atomic.atomic-theory', 'Chlorine is found as')).toEqual(['MC3'])

    expect(tagOf('chem.atomic.subatomic-particles', 'chloride ion')).toEqual(['MC3'])

    expect(tagOf('chem.atomic.electromagnetic-radiation', 'dim blue lamp')).toEqual(['MC2'])
    expect(tagOf('chem.atomic.electromagnetic-radiation', 'radio waves carry no energy')).toEqual(['MC3'])

    expect(tagOf('chem.atomic.atomic-spectra', 'tungsten filament lamp')).toEqual(['MC1'])
    expect(tagOf('chem.atomic.atomic-spectra', '589 nm')).toEqual(['MC3'])

    expect(tagOf('chem.atomic.quantum-mech-model', 'probability of finding it in a small volume')).toEqual(['MC1'])
    expect(tagOf('chem.atomic.quantum-mech-model', '1s orbital is drawn as a sphere')).toEqual(['MC2'])

    expect(tagOf('chem.atomic.quantum-numbers', 'pointing along the x-axis')).toEqual(['MC2'])
    expect(tagOf('chem.atomic.quantum-numbers', 'same 2s orbital')).toEqual(['MC3'])

    expect(tagOf('chem.atomic.orbitals', 'all five d orbitals have four lobes')).toEqual(['MC1'])
    expect(tagOf('chem.atomic.orbitals', 'RADIAL nodes')).toEqual(['MC2'])
    expect(tagOf('chem.atomic.orbitals', 'potassium atom')).toEqual(['MC3'])

    expect(tagOf('chem.atomic.electronic-config', 'Hund')).toEqual(['MC2'])
    expect(tagOf('chem.atomic.electronic-config', 'Chromium is')).toEqual(['MC3'])

    expect(tagOf('chem.atomic.photoelectric-effect', 'gentler instrument')).toEqual(['MC3'])
  })

  /**
   * chem.elect — THREE hollow concepts in a single domain (galvanic-cell,
   * corrosion, industrial), the most any domain has produced. In each, both
   * pre-existing probes are sound electrochemistry about the right topic and
   * neither is any of the three documented misconceptions: the galvanic-cell
   * pair asks about electrode polarity and the salt bridge's necessity while
   * its blueprint documents which metal is the anode, n in the Nernst
   * equation, and what the bridge CARRIES; corrosion asks why rust flakes and
   * whether galvanising survives a scratch while its blueprint documents
   * tinning-versus-galvanising, where the metal actually dissolves, and what
   * "cathodic protection" names; industrial asks about cryolite and recycling
   * energy while its blueprint documents chloralkali-versus-Down's, whether
   * Hall-Héroult anodes are consumed, and which electrode is plated.
   */
  it('elect: the five retags', () => {
    // standard-electrode P2 is the thermodynamics-vs-kinetics probe = MC-3
    // ("E°cell > 0 means it WILL occur"), not MC-2 ("negative = less reactive").
    expect(tagOf('chem.elect.standard-electrode', 'thermodynamically non-spontaneous')).toEqual(['MC3'])
    // electrolysis P1's distractor is "any solution containing a metal ion
    // should always deposit that metal" — MC-2 verbatim, not MC-1 (cathode sign).
    expect(tagOf('chem.elect.electrolysis', 'AQUEOUS solution of NaCl')).toEqual(['MC2'])
    // nernst P1's distractor is "E°cell = 0 so never any voltage" — MC-2.
    expect(tagOf('chem.elect.nernst', 'two identical Cu/Cu2+ half-cells')).toEqual(['MC2'])
    // conductance P1's second distractor is the same kappa/Lambda conflation
    // as its first = MC-1, not MC-2 (Kohlrausch at all concentrations).
    expect(tagOf('chem.elect.conductance', 'On diluting a strong electrolyte')).toEqual(['MC1'])
    // concentration-cell P1's "high concentration drives oxidation" distractor
    // is MC-2 (cathode always the higher-concentration side), so the probe now
    // targets both ids its two distractors name.
    expect(tagOf('chem.elect.concentration-cell', 'Which electrode is the anode')).toEqual(['MC1', 'MC2'])
  })

  it('elect: every documented misconception now has a probe authored FOR it', () => {
    expect(tagOf('chem.elect.standard-electrode', 'most negative in the table')).toEqual(['MC2'])

    expect(tagOf('chem.elect.galvanic-cell', 'Copper is the more reactive')).toEqual(['MC1'])
    expect(tagOf('chem.elect.galvanic-cell', 'what value of n goes into')).toEqual(['MC2'])
    expect(tagOf('chem.elect.galvanic-cell', 'carrying electrons from one half-cell')).toEqual(['MC3'])

    expect(tagOf('chem.elect.electrolysis', 'is the cathode the positive or the negative')).toEqual(['MC1'])
    expect(tagOf('chem.elect.electrolysis', 'molten AlCl')).toEqual(['MC3'])

    expect(tagOf('chem.elect.nernst', 'how is Q built')).toEqual(['MC1'])
    expect(tagOf('chem.elect.nernst', 'raising [Cu²⁺] tenfold')).toEqual(['MC3'])

    expect(tagOf('chem.elect.batteries', 'Is it therefore 100% efficient')).toEqual(['MC2'])
    expect(tagOf('chem.elect.batteries', 'works by burning hydrogen')).toEqual(['MC3'])

    expect(tagOf('chem.elect.corrosion', 'tinned) steel can')).toEqual(['MC1'])
    expect(tagOf('chem.elect.corrosion', 'drop of water sits on an iron plate')).toEqual(['MC2'])
    expect(tagOf('chem.elect.corrosion', '"cathodic protection" is so called')).toEqual(['MC3'])

    expect(tagOf('chem.elect.conductance', 'Kohlrausch')).toEqual(['MC2'])

    expect(tagOf('chem.elect.concentration-cell', 'no practical importance')).toEqual(['MC3'])

    expect(tagOf('chem.elect.industrial', 'Down\'s cell electrolyse sodium chloride')).toEqual(['MC1'])
    expect(tagOf('chem.elect.industrial', 'carbon anodes have to be replaced')).toEqual(['MC2'])
    expect(tagOf('chem.elect.industrial', 'electroplating a spoon')).toEqual(['MC3'])
  })

  /**
   * chem.found — a SECOND crossed pair, on chem.found.stoichiometry, and the
   * domain with the most retag operations so far (seven, across six of its
   * eight concepts).
   *
   * The crossed pair: the limiting-reagent probe's distractor is "N2 — there's
   * less of it (1 mol vs 2 mol)", which is MC-2 ("smallest amount = limiting
   * reagent") word for word, and it carried MC1. The coefficient probe's
   * distractor is "coefficients directly give the mass in grams", which is
   * MC-1 verbatim, and it carried MC2. Each diagnosed the other's tag — the
   * same shape as chem.hal.sn1, and equally invisible to every count.
   *
   * chem.found.concentration was hollow: neither of its probes tests dilution
   * (MC-2) or ppm (MC-3), and its molarity probe is about solution-vs-solvent
   * volume rather than MC-1's molality claim.
   */
  it('found.stoichiometry: the second crossed pair is uncrossed', () => {
    expect(tagOf('chem.found.stoichiometry', 'what is the limiting reagent')).toEqual(['MC2'])
    expect(tagOf('chem.found.stoichiometry', 'the coefficient 2 means')).toEqual(['MC1'])
    expect(tagOf('chem.found.stoichiometry', 'percent yield of 112%')).toEqual(['MC3'])
  })

  it('found: the other five retags', () => {
    // matter P1's "Element — because it looks pure and uniform" argues from
    // uniform appearance (MC-1), not from element-equals-atom (MC-2).
    expect(tagOf('chem.found.matter', 'Brass is made by melting')).toEqual(['MC1'])
    // pure-substances P1's two distractors are both "looks uniform, so pure"
    // = MC-1, not MC-2 (wrong separation technique).
    expect(tagOf('chem.found.pure-substances', 'Which of these is a pure substance')).toEqual(['MC1'])
    // measurement P2 is a unit-conversion DIRECTION error = MC-3, not MC-2
    // (zeros never significant).
    expect(tagOf('chem.found.measurement', 'Convert 0.025 kg')).toEqual(['MC3'])
    // sig-figs P2 applies the MULTIPLICATION rule to an addition = MC-1.
    expect(tagOf('chem.found.significant-figures', '12.52 + 1.7')).toEqual(['MC1'])
    // mole P1's "hydrogen is smaller so more fit in 2g" is mass reasoning
    // = MC-1, not a conversion direction error.
    expect(tagOf('chem.found.mole-concept', 'Which contains more molecules')).toEqual(['MC1'])
  })

  it('found: every documented misconception now has a probe authored FOR it', () => {
    expect(tagOf('chem.found.matter', 'one oxygen ELEMENT')).toEqual(['MC2'])
    expect(tagOf('chem.found.matter', '88.8% oxygen by mass')).toEqual(['MC3'])

    expect(tagOf('chem.found.states-of-matter', 'puddle on the pavement')).toEqual(['MC3'])

    expect(tagOf('chem.found.pure-substances', 'Would filtration work')).toEqual(['MC2'])
    expect(tagOf('chem.found.pure-substances', 'out of the condenser')).toEqual(['MC3'])

    expect(tagOf('chem.found.measurement', '0.0450 g')).toEqual(['MC2'])

    expect(tagOf('chem.found.significant-figures', '4500 m')).toEqual(['MC2'])
    expect(tagOf('chem.found.significant-figures', 'exactly 3 bolts')).toEqual(['MC3'])

    expect(tagOf('chem.found.mole-concept', 'atomic mass of 12 u')).toEqual(['MC2'])
    expect(tagOf('chem.found.mole-concept', '3.011')).toEqual(['MC3'])

    expect(tagOf('chem.found.concentration', '1 molal')).toEqual(['MC1'])
    expect(tagOf('chem.found.concentration', 'adding 40 mL of water')).toEqual(['MC2'])
    expect(tagOf('chem.found.concentration', '15 ppm in soil')).toEqual(['MC3'])
  })

  /**
   * chem.carb — two retags, two more hollow concepts, and a defect shape that
   * had not appeared before: a concept carrying probes that belong to a
   * DIFFERENT concept.
   *
   * chem.carb.ketones' two probes both asked why alpha-hydrogens are acidic
   * (pKa ~20 vs ~50) — which is chem.carb.alpha-reactions' subject, and one of
   * them near-duplicates that concept's own probe. None of ketones' three
   * documented misconceptions (keto/enol tautomerism, Baeyer-Villiger
   * migratory aptitude, preparation routes) had any probe at all.
   *
   * chem.carb.aldehydes was hollow the ordinary way: both probes compare
   * aldehydes with ketones, and neither is MC-1 (nucleophile sent to the
   * oxygen), MC-2 (reduction product class) or MC-3 (Fehling's on
   * benzaldehyde).
   */
  it('carb: the two retags', () => {
    // alpha-reactions P2's distractor states MC-1 verbatim — "the carbonyl
    // oxygen pulls electron density away via induction". It carried MC2.
    expect(tagOf('chem.carb.alpha-reactions', 'more acidic (pKa ~20)')).toEqual(['MC1'])
    // named-reactions P1 is the Baeyer-Villiger migration probe = MC-2
    // (migratory aptitude), not MC-1 (Wittig vs elimination).
    expect(tagOf('chem.carb.named-reactions', 'Baeyer–Villiger oxidation of 2-methylcyclohexanone')).toEqual(['MC2'])
  })

  it('carb: derivatives was already correct on both, and stays correct', () => {
    // The only concept in the domain whose pre-existing probes both survived
    // the stem-vs-blueprint read. Its distractors state MC-1 and MC-2 almost
    // word for word.
    expect(tagOf('chem.carb.derivatives', 'Acid chlorides react with water almost instantly')).toEqual(['MC1'])
    expect(tagOf('chem.carb.derivatives', 'converting an amide directly into an acid chloride')).toEqual(['MC2'])
  })

  it('carb: every documented misconception now has a probe authored FOR it', () => {
    expect(tagOf('chem.carb.aldehydes', 'cyanide ion attacks propanal')).toEqual(['MC1'])
    expect(tagOf('chem.carb.aldehydes', 'reduced with NaBH₄')).toEqual(['MC2'])
    expect(tagOf('chem.carb.aldehydes', 'benzaldehyde')).toEqual(['MC3'])

    expect(tagOf('chem.carb.alpha-reactions', 'dilute NaOH at 5')).toEqual(['MC2'])

    expect(tagOf('chem.carb.carboxylic', 'Ethanol (CH₃CH₂OH, pKa ≈ 16)')).toEqual(['MC1'])
    expect(tagOf('chem.carb.carboxylic', 'warming acetic acid gently')).toEqual(['MC3'])

    expect(tagOf('chem.carb.derivatives', 'Rank ethanoyl chloride')).toEqual(['MC1'])

    expect(tagOf('chem.carb.ketones', 'double-headed arrow')).toEqual(['MC1'])
    expect(tagOf('chem.carb.ketones', 'acetophenone')).toEqual(['MC2'])
    expect(tagOf('chem.carb.ketones', 'only way to prepare a ketone')).toEqual(['MC3'])

    expect(tagOf('chem.carb.named-reactions', '2-methylpent-1-ene')).toEqual(['MC1'])

    expect(tagOf('chem.carb.spectro', '1735 cm⁻¹')).toEqual(['MC1'])
    expect(tagOf('chem.carb.spectro', 'Butan-2-one (M = 72)')).toEqual(['MC2'])
  })

  /**
   * chem.hal — five retags, including the first cleanly CROSSED PAIR found in
   * chemistry: chem.hal.sn1's two probes each diagnose the other's tag. The
   * nucleophile-concentration probe is MC-2 (the rate law) and the "exactly
   * 50:50?" probe is MC-1 (complete racemisation); they carried MC1 and MC2
   * respectively. A crossed pair is the one shape that survives every
   * structural check — two probes, two distinct ids, both joining, full
   * breadth — and still serves each learner the wrong remedy.
   *
   * chem.hal.sn2 was hollow: the steric-hindrance probe and the R/S-vs-
   * rotation-sign probe are both sound chemistry, and neither is any of the
   * three documented misconceptions.
   */
  it('hal.sn1: the crossed pair is uncrossed', () => {
    expect(tagOf('chem.hal.sn1', 'double the concentration of the nucleophile')).toEqual(['MC2'])
    expect(tagOf('chem.hal.sn1', 'always produce EXACTLY')).toEqual(['MC1'])
    expect(tagOf('chem.hal.sn1', 'single-step ionisation is simpler')).toEqual(['MC3'])
  })

  it('hal: the four other retags', () => {
    // cfcs P1 is the catalytic-cycle probe = MC-2 (Cl• consumed, one O3 per
    // CFC), not MC-1 (fluorine depletes ozone by analogy with chlorine).
    expect(tagOf('chem.hal.cfcs', 'can destroy approximately 100,000 ozone')).toEqual(['MC2'])
    // grignard P2 is the acidic -OH probe: the reagent is destroyed by a
    // protic group = MC-1, not MC-2 (adds to the carbonyl oxygen).
    expect(tagOf('chem.hal.grignard', 'a free -OH group elsewhere')).toEqual(['MC1'])
    // introduction P1's distractor states MC-2 verbatim ("the aromatic ring
    // should provide extra stabilization ... MORE reactive").
    expect(tagOf('chem.hal.introduction', 'resists the same nucleophilic substitution')).toEqual(['MC2'])
    // elimination P2 was already correct on MC-2 and stays there.
    expect(tagOf('chem.hal.elimination', "Does Zaitsev's rule")).toEqual(['MC2'])
  })

  it('hal: every documented misconception now has a probe authored FOR it', () => {
    expect(tagOf('chem.hal.cfcs', 'HFC-134a')).toEqual(['MC1'])
    expect(tagOf('chem.hal.cfcs', 'CCl₄ is a polar molecule')).toEqual(['MC3'])

    expect(tagOf('chem.hal.elimination', 'trans-1-bromo-2-methylcyclohexane')).toEqual(['MC1'])
    expect(tagOf('chem.hal.elimination', 'potassium tert-butoxide')).toEqual(['MC3'])

    expect(tagOf('chem.hal.grignard', 'Which atom of the carbonyl group')).toEqual(['MC2'])
    expect(tagOf('chem.hal.grignard', 'one equivalent of CH₃MgBr to methyl benzoate')).toEqual(['MC3'])

    expect(tagOf('chem.hal.haloarenes', 'attacks chlorobenzene from the face opposite')).toEqual(['MC1'])
    expect(tagOf('chem.hal.haloarenes', 'nitrate FASTER than benzene')).toEqual(['MC2'])
    expect(tagOf('chem.hal.haloarenes', 'aqueous NaOH at 50')).toEqual(['MC3'])

    expect(tagOf('chem.hal.introduction', 'Rank CH₃F, CH₃Cl')).toEqual(['MC1'])
    expect(tagOf('chem.hal.introduction', 'no interaction at all')).toEqual(['MC3'])

    expect(tagOf('chem.hal.sn2', 'warmed in plain water')).toEqual(['MC1'])
    expect(tagOf('chem.hal.sn2', 'thiolate')).toEqual(['MC2'])
    expect(tagOf('chem.hal.sn2', 'two transition states with a dip')).toEqual(['MC3'])
  })

  it('coord: every documented misconception in the six hollow concepts now has a probe', () => {
    // Pinned by stem so the diagnosis cannot drift back onto a probe that
    // does not test it. Each stem below is the one authored FOR that
    // misconception, using the blueprint's own discrimination pair.
    expect(tagOf('chem.coord.werner', 'What is cobalt’s oxidation state')).toEqual(['MC1'])
    expect(tagOf('chem.coord.werner', 'precipitate immediately as AgCl')).toEqual(['MC2'])
    expect(tagOf('chem.coord.werner', '[Ag(NH₃)₂]⁺')).toEqual(['MC3'])

    expect(tagOf('chem.coord.cft', 'Zn²⁺ is d¹⁰')).toEqual(['MC1'])
    expect(tagOf('chem.coord.cft', 'Δtet larger or smaller')).toEqual(['MC2'])
    expect(tagOf('chem.coord.cft', 'ZnSO₄ solution is colourless')).toEqual(['MC3'])

    expect(tagOf('chem.coord.bonding', 'd²sp³ and [CoF₆]³⁻ as sp³d²')).toEqual(['MC1'])
    expect(tagOf('chem.coord.bonding', 'π-DONOR ligands')).toEqual(['MC2'])
    expect(tagOf('chem.coord.bonding', 'VBT is wrong')).toEqual(['MC3'])

    expect(tagOf('chem.coord.applications', 'carbon monoxide poisoning')).toEqual(['MC1'])
    expect(tagOf('chem.coord.applications', 'Does it react with DNA at all')).toEqual(['MC2'])
    expect(tagOf('chem.coord.applications', 'chlorophyll is green')).toEqual(['MC3'])

    expect(tagOf('chem.coord.isomerism', 'two conformers of ethane')).toEqual(['MC1'])
    expect(tagOf('chem.coord.isomerism', 'linkage isomers')).toEqual(['MC2'])
    expect(tagOf('chem.coord.isomerism', 'cis-[Co(en)₂Cl₂]⁺ cannot have optical isomers')).toEqual(['MC3'])
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

/**
 * A TAG MUST BE REACHABLE, AND A DISTRACTOR MUST NOT INVENT ONE.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * The stem-vs-blueprint audit is manual and cannot be automated. But two of its
 * findings turn out to be STRUCTURALLY detectable, and both were live:
 *
 *   SURPLUS TAG — a probe listing more targetedMisconceptions than its
 *     distractors can trigger. Four chem.kinet probes carried a second id with
 *     no distractor behind it, which inflated apparent breadth and would have
 *     recorded a wrong answer against a misconception the learner may not hold.
 *
 *   CONTRADICTORY TAG — chem.kinet.arrhenius' "paper doesn't ignite" probe was
 *     tagged MC1 while its only mapped distractor carried MC2. The tag and the
 *     evidence the probe would actually write disagreed with each other.
 *
 *   INERT TAG — chem.org.iupac's substituent-ordering probe was tagged MC2 with
 *     NO distractor carrying a misconceptionId at all, so the tag could never
 *     fire under any answer.
 *
 * brainSeedAssets.test.ts already asserted the second direction, but only over
 * SEED_PROBES — four concepts — so the corpus holding ~99% of the content had
 * no coverage. That is the gap this closes.
 *
 * A probe with NO targeted misconception is legitimate and deliberately allowed:
 * physics uses prerequisite DIAGNOSTIC probes that carry none, and the two
 * corrections above made falsely-diagnostic probes honestly non-diagnostic
 * rather than retargeting them onto an unrelated id.
 */
describe('misconception tags and distractors agree', () => {
  const corpora = [
    ['physics', [...SEED_PROBES, ...AUTHORED_PROBES].filter((p) => p.conceptId.startsWith('phys.'))],
    ['chemistry', CHEMISTRY_PROBES],
  ] as const

  const mappedIds = (probe: { choices?: ReadonlyArray<{ misconceptionId?: string }> | null }) => {
    const ids = new Set<string>()
    for (const choice of probe.choices ?? []) if (choice.misconceptionId) ids.add(String(choice.misconceptionId))
    return ids
  }

  it.each(corpora)('%s: no distractor names an id the probe does not target', (_s, probes) => {
    const offenders: string[] = []
    for (const probe of probes) {
      const targeted = new Set((probe.targetedMisconceptions ?? []).map(String))
      for (const id of mappedIds(probe)) {
        if (!targeted.has(id)) offenders.push(`${probe.conceptId}: distractor ${id} not in targetedMisconceptions`)
      }
    }
    // STRICT. A distractor that writes an id the probe never claimed means the
    // evidence and the authoring disagree about what is being diagnosed.
    expect(offenders).toEqual([])
  })

  it.each(corpora)('%s: every targeted misconception has a distractor that can trigger it', (_s, probes) => {
    const offenders: string[] = []
    for (const probe of probes) {
      // SCOPE, and the reason for it: a short_answer or open checkpoint probe
      // has no choices at all, so it has no distractor to carry an id — yet it
      // can still legitimately target a misconception, graded by keyword or by
      // the model. Applying reachability to those would flag 107 physics probes
      // that are correctly authored. The claim only means something where
      // distractors exist to carry it.
      if (!probe.choices || probe.choices.length === 0) continue
      const targeted = new Set((probe.targetedMisconceptions ?? []).map(String))
      if (targeted.size === 0) continue // deliberately non-diagnostic — allowed
      const reachable = mappedIds(probe)
      for (const id of targeted) {
        if (!reachable.has(id)) offenders.push(`${probe.conceptId}: ${id} has no distractor`)
      }
    }
    // STRICT for choice-based probes: an unreachable tag there is a claim the
    // probe cannot honour under any answer. Both live violations are fixed.
    expect(offenders).toEqual([])
  })
})
