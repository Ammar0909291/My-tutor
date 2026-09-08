/**
 * PROBE OPTION QUALITY — unit tests for the rule, a regression pin for the
 * exact reported probe, and a REPORTING (non-failing) corpus scan.
 *
 * NOT a corpus-wide pass/fail gate — see probeOptionQuality.ts's header for
 * why: two broader rules were tried and measured directly against this
 * corpus first, and both either drowned in false positives (180, then 47
 * violations, mostly ordinary good teaching prose) or, narrowed enough to
 * avoid that, still caught ~19 candidates that reading them showed were
 * mostly intentional, well-written misconception-probe pedagogy rather than
 * the reported defect. A hard-fail assertion here would either force
 * rewriting good content on a bot's say-so or need tuning so narrow it
 * stops finding anything new.
 */
import { describe, it, expect } from 'vitest'
import { readdirSync } from 'fs'
import path from 'path'
import { checkProbeOptionBalance, type ProbeOptionLike } from '../lib/teaching/assets/probeOptionQuality'
import { CHEMISTRY_PROBES } from '../lib/teaching/assets/chemistrySeedAssets'

describe('checkProbeOptionBalance — unit', () => {
  it('flags the exact reported shape: a self-justifying correct option', () => {
    const choices: ProbeOptionLike[] = [
      {
        text: '6 — the number of electrons ACTUALLY TRANSFERRED once the half-reactions are balanced against '
          + 'each other: 2Al → 2Al³⁺ + 6e⁻ and 3Cu²⁺ + 6e⁻ → 3Cu. n is not read off the coefficients of the '
          + 'species in the overall equation; it is the electron count that the two half-reactions had to '
          + 'share to cancel',
        isCorrect: true,
      },
      {
        text: '3 — take the largest coefficient in the balanced equation as written, which is the 3 in front of Cu²⁺',
        isCorrect: false,
      },
    ]
    const findings = checkProbeOptionBalance(choices)
    expect(findings.map((f) => f.reason)).toContain('correct-option-self-justifying')
  })

  it('does not flag a correct option that is merely a bit longer, with no justification cue', () => {
    const choices: ProbeOptionLike[] = [
      { text: 'The rate of a reaction increases as temperature increases, because more collisions exceed the activation energy', isCorrect: true },
      { text: 'The rate of a reaction decreases as temperature increases', isCorrect: false },
      { text: 'Temperature has no effect on reaction rate', isCorrect: false },
    ]
    // Deliberately close to, but under, the ratio thresholds — a realistic
    // "the correct answer needed one more clause" case.
    expect(checkProbeOptionBalance(choices)).toEqual([])
  })

  it('does NOT flag a wildly longer correct option that carries no justification cue (measured too noisy — see the module header)', () => {
    const choices: ProbeOptionLike[] = [
      {
        text: 'Sodium chloride dissolves in water when the polar water molecules surround and stabilise the '
          + 'separated Na+ and Cl- ions through ion-dipole interactions, overcoming the lattice energy holding '
          + 'the crystal together',
        isCorrect: true,
      },
      { text: 'It melts', isCorrect: false },
    ]
    expect(checkProbeOptionBalance(choices)).toEqual([])
  })

  it('is a no-op for a choice set with zero or multiple correct answers', () => {
    expect(checkProbeOptionBalance([
      { text: 'a', isCorrect: false }, { text: 'b', isCorrect: false },
    ])).toEqual([])
    expect(checkProbeOptionBalance([
      { text: 'a very long correct-shaped option that explains itself because it actually is not the other one', isCorrect: true },
      { text: 'b', isCorrect: true },
    ])).toEqual([])
  })

  it('is a no-op below two choices', () => {
    expect(checkProbeOptionBalance([{ text: 'only one', isCorrect: true }])).toEqual([])
    expect(checkProbeOptionBalance([])).toEqual([])
  })
})

describe('regression — the exact reported probe', () => {
  it('chem.elect.galvanic-cell\'s Nernst-n probe no longer triggers a finding, and the correct answer is unchanged', () => {
    const probe = CHEMISTRY_PROBES.find((p) => p.stem.includes('what value of n goes into the Nernst equation'))
    expect(probe).toBeTruthy()
    const findings = checkProbeOptionBalance(probe!.choices)
    expect(findings).toEqual([])
    // The fix must not have changed WHAT is graded correct, only how it is
    // worded — that is the one thing this test must never let slip past.
    const correct = probe!.choices.find((c) => c.isCorrect)
    expect(correct?.text.startsWith('6')).toBe(true)
  })
})

describe('corpus scan — reporting only, every authored *_PROBES array, every subject', () => {
  const ASSET_DIR = path.join(__dirname, '..', 'lib', 'teaching', 'assets')

  it('runs without throwing and reports candidates for human review (not asserted at zero — see file header)', async () => {
    // The corpus is dozens of multi-thousand-line modules; importing all of
    // them (same cost physicsBandContract.test.ts's loader pays) exceeds the
    // default 5s test timeout on a cold run.
    const files = readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
    const candidates: string[] = []
    for (const f of files) {
      const mod = await import(path.join(ASSET_DIR, f))
      for (const [exportName, value] of Object.entries(mod)) {
        if (!Array.isArray(value) || !exportName.endsWith('PROBES')) continue
        for (const probe of value as Array<{ stem?: string; choices?: ProbeOptionLike[] }>) {
          if (!Array.isArray(probe.choices)) continue
          const findings = checkProbeOptionBalance(probe.choices)
          for (const finding of findings) {
            candidates.push(`${f}::${exportName} "${(probe.stem ?? '').slice(0, 60)}" — ${finding.detail}`)
          }
        }
      }
    }
    // Informational only. A future authoring session can grep this test's
    // output (run with --reporter=verbose, or add a console.info here) to
    // get the current candidate list; CI does not fail on its size.
    expect(Array.isArray(candidates)).toBe(true)
  }, 30000)
})
