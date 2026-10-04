/**
 * Task #2, the LENGTH GIVEAWAY (2026-09-30).
 *
 * Authored choices carried their own working on the correct option only
 * ("Four — l can be 0 or 1 …" against "Three"), so the correct option was the
 * uniquely longest on ~80% of items and "pick the longest" beat chance two to
 * three times over. `probeToMcq` now serves the answer HEAD and keeps the
 * working in `rationales`, handed over only after grading. These tests pin the
 * split rule, that grading is untouched (every tap and every full-text answer
 * still lands on its own option, corpus-wide), that the working survives the
 * turn boundary and reaches the verdict, and the measured drop in the cue.
 */
import { describe, it, expect, beforeAll } from 'vitest'
import { readdirSync } from 'fs'
import path from 'path'
import { probeToMcq, splitAnswerHeads, splitAnswerHeadsPerOption } from '@/lib/teaching/gateAssessment'
import { resolveMcqChoice, mcqForClient, type TutorMCQ } from '@/lib/teaching/mcq'
import { readPendingQuestion, writePendingQuestion } from '@/lib/teaching/pendingQuestion'
import { buildAnswerVerdictBlock } from '@/lib/teaching/answerVerdictBlock'
import { stateCorrectionForWrongAnswer } from '@/lib/teaching/wrongAnswerCorrection'

type Probe = { conceptId: string; subjectSlug: string; stem: string; choices?: { text: string; isCorrect?: boolean }[] }

const HYDROGEN = {
  stem: 'Ignoring spin, how many distinct quantum states does the hydrogen level n = 2 have?',
  choices: [
    { text: 'Four — l can be 0 or 1. The 2s subshell contributes 1 state and 2p contributes 3.', isCorrect: true },
    { text: 'Three — one for each p orbital, m = −1, 0, +1', isCorrect: false },
  ],
}

describe('splitAnswerHeads — splits only when it is unambiguous', () => {
  it('splits every option on a spaced em or en dash', () => {
    expect(splitAnswerHeads(['Mixture — boil off the water', 'Compound – they combined'])).toEqual({
      heads: ['Mixture', 'Compound'], rationales: ['boil off the water', 'they combined'],
    })
  })

  it('refuses when any option lacks the shape, heads collide, a head is a bare letter, or only a hyphen separates', () => {
    expect(splitAnswerHeads(['Yes — because A', 'No'])).toBeNull()
    expect(splitAnswerHeads(['Yes — because A', 'yes — because B'])).toBeNull()
    expect(splitAnswerHeads(['A — the left block', 'B — the right block'])).toBeNull()
    expect(splitAnswerHeads(['x - 2', 'x - 3'])).toBeNull()
  })
})

describe('probeToMcq serves heads and keeps the working aligned', () => {
  it('options are heads, the key still points at the right one, rationales follow the shown order', () => {
    const m = probeToMcq(HYDROGEN as never)!
    expect(m.options.sort()).toEqual(['Four', 'Three'].sort())
    const shown = probeToMcq(HYDROGEN as never)!
    expect(shown.options[shown.correctIndex]).toBe('Four')
    expect(shown.rationales![shown.correctIndex]).toMatch(/^l can be 0 or 1/)
    expect(shown.rationales![1 - shown.correctIndex]).toMatch(/^one for each p orbital/)
  })

  it('the working never goes to the client while the question is open', () => {
    const client = mcqForClient(probeToMcq(HYDROGEN as never)) as Record<string, unknown>
    expect(client).not.toHaveProperty('rationales')
    expect(JSON.stringify(client)).not.toContain('l can be 0 or 1')
  })

  it('an item without the shape is served exactly as before, with no rationales', () => {
    const m = probeToMcq({ stem: 'Pick one', choices: [{ text: 'Alpha', isCorrect: true }, { text: 'Beta' }] } as never)!
    expect(m.options.sort()).toEqual(['Alpha', 'Beta'])
    expect(m).not.toHaveProperty('rationales')
  })
})

describe('corpus-wide: grading is untouched and the cue drops', () => {
  const probes: Probe[] = []
  beforeAll(async () => {
    const dir = path.resolve(__dirname, '../lib/teaching/assets')
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))) {
      const mod = await import(path.join(dir, f))
      for (const [name, value] of Object.entries(mod)) if (Array.isArray(value) && name.endsWith('PROBES')) probes.push(...(value as Probe[]))
    }
  }, 60_000)

  it('every tap on a head, and every original full-text answer, grades to its own option', () => {
    let split = 0
    const wrong: string[] = []
    for (const p of probes) {
      const m = probeToMcq(p as never)
      if (!m?.rationales) continue
      split++
      m.options.forEach((o, i) => {
        if (resolveMcqChoice(o, m) !== i) wrong.push(`${p.conceptId} tap "${o}"`)
        const full = m.rationales![i] ? `${o} — ${m.rationales![i]}` : o
        if (resolveMcqChoice(full, m) !== i) wrong.push(`${p.conceptId} full "${o} — …"`)
      })
    }
    expect(split).toBeGreaterThan(2000)
    expect(wrong).toEqual([])
  }, 60_000)

  it('the correct option is far less often the uniquely longest one (measured 2026-09-30)', () => {
    const by: Record<string, { n: number; longest: number }> = {}
    for (const p of probes) {
      const m = probeToMcq(p as never)
      if (!m) continue
      const L = m.options.map((o) => o.length), max = Math.max(...L)
      const s = (by[p.subjectSlug] ??= { n: 0, longest: 0 })
      s.n++
      if (L[m.correctIndex] === max && L.filter((l) => l === max).length === 1) s.longest++
    }
    const rate = (k: string) => by[k].longest / by[k].n
    // Before: english 96%, chemistry 79%, physics 81%, biology 79%, cs 78%.
    expect(rate('english')).toBeLessThan(0.25)
    expect(rate('chemistry')).toBeLessThan(0.5)
    expect(rate('physics')).toBeLessThan(0.6)
    expect(rate('biology')).toBeLessThan(0.6)
    expect(rate('computer_science')).toBeLessThan(0.55)
  }, 60_000)
})

describe('the working survives the turn boundary and reaches the verdict', () => {
  const m = probeToMcq(HYDROGEN as never) as TutorMCQ
  const wrongIndex = 1 - m.correctIndex

  it('write → read round-trips the rationales; a malformed value is dropped, not trusted', () => {
    const back = readPendingQuestion(JSON.parse(JSON.stringify(writePendingQuestion(m, 'lesson'))), 'lesson')!
    expect(back.rationales).toEqual(m.rationales)
    const broken = readPendingQuestion({ ...writePendingQuestion(m, 'lesson'), rationales: ['only one'] }, 'lesson')!
    expect(broken).not.toHaveProperty('rationales')
    expect(broken.correctIndex).toBe(m.correctIndex)
  })

  it('a wrong answer: the verdict names the thinking behind the choice and the authored reason', () => {
    const block = buildAnswerVerdictBlock({ grade: { chosenIndex: wrongIndex, correct: false }, mcq: m, keyIsAuthored: true })
    expect(block).toContain('The thinking behind that choice: "one for each p orbital')
    expect(block).toContain('The authored reason it is right: "l can be 0 or 1')
  })

  it('a right answer: the verdict carries the authored reason', () => {
    const block = buildAnswerVerdictBlock({ grade: { chosenIndex: m.correctIndex, correct: true }, mcq: m, keyIsAuthored: true })
    expect(block).toContain('The authored reason it is right: "l can be 0 or 1')
  })

  it('the stated correction is never bare: it carries the authored working', () => {
    const r = stateCorrectionForWrongAnswer({ text: 'Let us look again.', correct: false, probe: m })
    expect(r.text).toMatch(/^Not quite — the answer is: Four — l can be 0 or 1/)
  })
})

describe('physics only: per-option split (task #2 part b)', () => {
  const EQUAL = {
    conceptId: 'phys.mech.conservation-of-energy',
    stem: 'Two slides of the same height, one steep and one gentle. Which gives the higher exit speed (no friction)?',
    choices: [
      { text: 'Equal — gravity pays out by height drop alone; the path does not matter', isCorrect: true },
      { text: 'The steep slide gives a higher exit speed', isCorrect: false },
      { text: 'The gentle slide, because it is longer', isCorrect: false },
    ],
  }

  it('splits only the options that have the shape; the rest are served whole', () => {
    expect(splitAnswerHeadsPerOption(['Equal — height alone', 'The steep one'])).toEqual({ heads: ['Equal', 'The steep one'], rationales: ['height alone', ''] })
    expect(splitAnswerHeadsPerOption(['No dash here', 'Nor here'])).toBeNull()
    expect(splitAnswerHeadsPerOption(['Steep — reason', 'steep'])).toBeNull()
  })

  it('serves every option whole when a working-carrying option has a bare-letter head (no lone explained answer)', () => {
    // phys.em.fields-in-matter, live 2026-10-04: the correct "B — …" could not be
    // cut to "B", so it alone kept its working beside bare distractors.
    const opts = [
      'B — H = nI depends only on the free current, while B = μ_rμ₀H includes the iron\'s magnetisation',
      'Both by the same factor — H and B are the same field',
      'H — the iron changes the current',
    ]
    expect(splitAnswerHeadsPerOption(opts)).toBeNull()
    const mcq = probeToMcq({ conceptId: 'phys.em.fields-in-matter', stem: 'Which changes a lot: H or B?', choices: opts.map((text, i) => ({ text, isCorrect: i === 0 })) } as never)!
    expect([...mcq.options].sort()).toEqual([...opts].sort())
  })

  it('applies to a physics probe, and never to another subject', () => {
    const phys = probeToMcq(EQUAL as never)!
    expect(phys.options[phys.correctIndex]).toBe('Equal')
    expect(phys.rationales![phys.correctIndex]).toMatch(/^gravity pays out/)
    // Chemistry joined physics 2026-10-01 (see PER_OPTION_SPLIT_PREFIXES);
    // every other subject keeps the all-or-nothing rule. Original assertion:
    //   expect(chem.options[chem.correctIndex]).toMatch(/^Equal — gravity pays out/)
    const chem = probeToMcq({ ...EQUAL, conceptId: 'chem.found.matter' } as never)!
    expect(chem.options[chem.correctIndex]).toBe('Equal')
    const bio = probeToMcq({ ...EQUAL, conceptId: 'bio.found.what-is-biology' } as never)!
    expect(bio.options[bio.correctIndex]).toMatch(/^Equal — gravity pays out/)
    expect(bio).not.toHaveProperty('rationales')
    const unknown = probeToMcq({ ...EQUAL, conceptId: undefined } as never)!
    expect(unknown).not.toHaveProperty('rationales')
  })

  it('a wrong answer on a whole-served option gets no invented reasoning, only the right one\'s', () => {
    const m = probeToMcq(EQUAL as never)!
    const wrong = m.options.findIndex((o, i) => i !== m.correctIndex)
    const block = buildAnswerVerdictBlock({ grade: { chosenIndex: wrong, correct: false }, mcq: m, keyIsAuthored: true })
    expect(block).not.toContain('The thinking behind that choice')
    expect(block).toContain('The authored reason it is right: "gravity pays out')
  })

  it('corpus: physics now sits near chance on length, in both directions (measured 2026-09-30)', async () => {
    const dir = path.resolve(__dirname, '../lib/teaching/assets')
    const physics: Probe[] = []
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))) {
      const mod = await import(path.join(dir, f))
      for (const [name, value] of Object.entries(mod)) if (Array.isArray(value) && name.endsWith('PROBES')) physics.push(...(value as Probe[]).filter((p) => p.subjectSlug === 'physics'))
    }
    let n = 0, longest = 0, shortest = 0
    const wrong: string[] = []
    for (const p of physics) {
      const m = probeToMcq(p as never)
      if (!m) continue
      n++
      const L = m.options.map((o) => o.length), max = Math.max(...L), min = Math.min(...L)
      if (L[m.correctIndex] === max && L.filter((l) => l === max).length === 1) longest++
      if (L[m.correctIndex] === min && L.filter((l) => l === min).length === 1) shortest++
      m.options.forEach((o, i) => {
        const full = m.rationales?.[i] ? `${o} — ${m.rationales[i]}` : o
        if (resolveMcqChoice(o, m) !== i || resolveMcqChoice(full, m) !== i) wrong.push(`${p.conceptId} "${o}"`)
      })
    }
    // Before this work: correct option uniquely longest 81%, uniquely shortest 8%.
    // No-cue baseline for physics' option-count mix is ~40% for each.
    expect(longest / n).toBeLessThan(0.42)
    expect(shortest / n).toBeLessThan(0.48)
    expect(wrong).toEqual([])
  }, 60_000)
})
