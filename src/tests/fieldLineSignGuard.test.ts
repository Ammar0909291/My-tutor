import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { repairFieldLineSign, isInvertedFieldLineClaim } from '@/lib/teaching/fieldLineSignGuard'

const CHAT_ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
const INIT_ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/lesson-init/route.ts'), 'utf8')

const EF = 'phys.em.electric-field'

/**
 * L3 — the sign inversion measured in production on the Electric Field lesson.
 *
 * The true-positive fixture is the VERBATIM production opening; the
 * false-positive fixtures are verbatim sentences from the 17 CORRECT openings
 * sampled alongside it. Both halves are real text, because a guard that is
 * only tested against sentences its author invented is tested against its own
 * assumptions.
 */

// ── VERBATIM PRODUCTION CAPTURE, 2026-09-06, the defect ─────────────────────
const PROD_INVERTED =
  'Imagine invisible arrows radiating outward from the balloon; those arrows '
  + 'are the *electric field lines* that show the direction a small negative '
  + 'test charge would move.'

// ── VERBATIM, from the CORRECT openings in the same 20-sample ────────────────
const PROD_CORRECT =
  'Imagine invisible arrows radiating outward from the balloon; those arrows '
  + 'are the *electric field lines* that show the direction a tiny **positive** '
  + 'test charge would move.'
const PROD_START_END =
  'The field lines begin at positive charges and end at negative charges, and '
  + 'the closer they are together, the stronger the field.'

describe('1-3 — the inverted claim is detected and repaired', () => {
  it('detects the exact production sentence', () => {
    expect(isInvertedFieldLineClaim(PROD_INVERTED)).toBe(true)
  })

  it('repairs it by flipping ONLY the polarity word', () => {
    const r = repairFieldLineSign(PROD_INVERTED, EF)
    expect(r.repaired).toHaveLength(1)
    expect(r.text).toContain('a small positive test charge would move')
    // "test" and "small" survive — the earlier draft of this guard dropped
    // "test" because the middle words were not captured.
    expect(r.text).toContain('small positive test charge')
    expect(r.text).not.toMatch(/negative test charge/i)
    // Everything else in the sentence is byte-identical.
    expect(r.text).toContain('Imagine invisible arrows radiating outward from the balloon')
    expect(r.text).toContain('*electric field lines*')
  })

  it('detects the report\'s other stated shape', () => {
    expect(isInvertedFieldLineClaim(
      'Electric field lines point in the direction of force on a negative test charge.',
    )).toBe(true)
  })
})

describe('5 — legitimate negative-charge teaching is NEVER touched', () => {
  const MUST_PASS = [
    // The four the brief names explicitly.
    'A positive test charge moves in the direction of the electric field.',
    'A negative test charge experiences force opposite to the electric field.',
    'Field lines point in the direction a positive test charge would be pushed.',
    'For a negative test charge, the force is opposite to the field.',
    // Verbatim production sentences from the CORRECT openings.
    PROD_CORRECT,
    PROD_START_END,
    'Field lines start on positive charges and end on negative charges.',
    // Other correct physics about negative charges.
    'A negative charge is pulled towards the positive plate, against the field lines.',
    'The electron accelerates in the reverse direction to E because its charge is negative.',
    'Field lines originate on positive charges and terminate on negative charges.',
    'Because the charge is negative, F = qE points the other way.',
  ]
  for (const s of MUST_PASS) {
    it(`does not fire on: "${s.slice(0, 62)}…"`, () => {
      expect(isInvertedFieldLineClaim(s)).toBe(false)
      expect(repairFieldLineSign(s, EF).repaired).toHaveLength(0)
      expect(repairFieldLineSign(s, EF).text).toBe(s)
    })
  }
})

describe('4 — the F = qE relationship is left alone', () => {
  it('does not rewrite the formula or its sign statement', () => {
    const t = 'The force is F = qE, so for a negative q the force is opposite to E.'
    expect(repairFieldLineSign(t, EF).text).toBe(t)
  })
})

describe('6 — a whole correct opening survives byte-identically', () => {
  const OPENING = '**Lesson: Electric Field and Field Lines**\n\n'
    + 'In this lesson we’ll learn how a charge creates an invisible field.\n\n'
    + PROD_CORRECT + '\n\n'
    + PROD_START_END + '\n\n'
    + 'Practice: Picture a small negatively charged ball next to that balloon. '
    + 'Where would the ball move?'
  it('is unchanged, including every blank line', () => {
    const r = repairFieldLineSign(OPENING, EF)
    expect(r.repaired).toHaveLength(0)
    expect(r.text).toBe(OPENING)
  })

  it('markdown structure survives a repair too — newlines are not collapsed', () => {
    const withDefect = '**Lesson**\n\n' + PROD_INVERTED + '\n\n- a bullet\n- another'
    const r = repairFieldLineSign(withDefect, EF)
    expect(r.repaired).toHaveLength(1)
    expect(r.text).toContain('**Lesson**\n\n')
    expect(r.text).toContain('\n\n- a bullet\n- another')
    expect(r.text).toContain('small positive test charge')
  })
})

describe('scope — concept-scoped, and never throws', () => {
  it('does nothing for any other concept, even on the identical sentence', () => {
    for (const other of ['phys.em.magnetic-field', 'chem.bond.vsepr', 'math.geom.slope']) {
      const r = repairFieldLineSign(PROD_INVERTED, other)
      expect(r.repaired).toHaveLength(0)
      expect(r.text).toBe(PROD_INVERTED)
    }
  })

  it('does nothing with no concept, and survives empty/odd input', () => {
    expect(repairFieldLineSign(PROD_INVERTED, null).text).toBe(PROD_INVERTED)
    expect(repairFieldLineSign('', EF).text).toBe('')
    expect(repairFieldLineSign('...', EF).repaired).toHaveLength(0)
  })

  it('is idempotent — repairing twice changes nothing further', () => {
    const once = repairFieldLineSign(PROD_INVERTED, EF)
    const twice = repairFieldLineSign(once.text, EF)
    expect(twice.repaired).toHaveLength(0)
    expect(twice.text).toBe(once.text)
  })
})

describe('the guard needs BOTH a field subject and a direction claim', () => {
  it('a bare negative-charge sentence with no field subject is untouched', () => {
    const t = 'A negative test charge would move to the left.'
    expect(isInvertedFieldLineClaim(t)).toBe(false)
  })

  it('a field sentence making no direction claim is untouched', () => {
    const t = 'The electric field is measured in newtons per coulomb, and a negative charge has units of coulombs.'
    expect(isInvertedFieldLineClaim(t)).toBe(false)
  })
})


// ── BOTH GENERATION PATHS ARE COVERED, BY THE SAME FUNCTION ─────────────────
//
// The defect was measured at lesson-init and wired there first. The chat route
// generates the same class of prose about the same concept, so it runs the
// same guard. These are source assertions because neither route handler can be
// invoked from a unit test — and the specific risk being pinned is a SECOND
// IMPLEMENTATION appearing, which only a source check can see.
describe('both routes run the guard, and only this one guard exists', () => {
  it('lesson-init calls the shared guard', () => {
    expect(INIT_ROUTE).toMatch(/repairFieldLineSign\(routed\.text, topicSlug\)/)
    // Dynamic import, matching every sibling repair in this chain.
    expect(INIT_ROUTE).toContain("await import('@/lib/teaching/fieldLineSignGuard')")
  })

  it('the chat route calls the SAME shared guard, on the teaching target', () => {
    expect(CHAT_ROUTE).toMatch(/repairFieldLineSign\(cleanText, decisionConceptIdHoisted\)/)
    expect(CHAT_ROUTE).toContain("await import('@/lib/teaching/fieldLineSignGuard')")
  })

  it('neither route reimplements the contract inline', () => {
    // A second copy would drift from this one about what is true. The polarity
    // vocabulary must appear ONLY inside the guard module.
    for (const [name, src] of [['chat', CHAT_ROUTE], ['lesson-init', INIT_ROUTE]] as const) {
      expect(src, `${name} reimplements the sign rule`).not.toMatch(/negative\s*\(\?:ly\)\?/)
      expect(src, `${name} hardcodes a polarity replacement`).not.toMatch(/replace\([^)]*negative[^)]*positive/i)
    }
  })

  it('both log the same event name, so one query finds every repair', () => {
    expect(INIT_ROUTE).toContain("event: 'field-line-sign-repaired'")
    expect(CHAT_ROUTE).toContain("event: 'field-line-sign-repaired'")
  })
})

// ── THE CHAT ROUTE'S OWN REAL PROSE ────────────────────────────────────────
//
// Verbatim replies captured from this route during the 8-sample chat run and
// the live negative-charge check. They are correct, and must stay untouched.
describe('real chat-route replies survive unchanged', () => {
  const REAL = [
    'The arrows you see labeled **Electric Field Lines (E)** are showing the direction of the electric field **E** produced by the source charge.',
    'The field lines also show where the field starts and ends: they begin on a positive source charge (+Q) and end on a negative charge.',
    '- The field lines start on a positive source and end on a negative source (or at infinity), and they never cross each other.',
    'A negative charge feels a force that is **opposite** to the direction of the electric field lines.',
    'The field lines show the direction that a *positive* test charge would be pushed; a negative test charge is pushed in the opposite direction, so its motion is reversed relative to the arrows on the diagram.',
  ]
  for (const r of REAL) {
    it(`untouched: "${r.slice(0, 58)}…"`, () => {
      expect(isInvertedFieldLineClaim(r)).toBe(false)
      expect(repairFieldLineSign(r, 'phys.em.electric-field').text).toBe(r)
    })
  }
})
