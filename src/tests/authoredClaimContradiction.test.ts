/**
 * V-CONTRADICT — authored-rule contradiction check (owner-approved 2026-09-27,
 * LOG-only). The rules are the ones chem.org.pericyclic's Educational Brain
 * entry states (electrocyclic mode; cycloaddition allowedness). See
 * src/lib/kernel/verifier/claims.ts.
 */
import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest'
import { driveTurns } from './support/turnHarness'
import { readFileSync } from 'node:fs'
import { vContradict } from '@/lib/kernel/verifier/claims'
import { verify } from '@/lib/kernel/verifier/verifier'
import { SEVERITY, RULE_CODES, type VerifierContext } from '@/lib/kernel/verifier/types'
import { REJECT_ELIGIBLE_CODES } from '@/lib/kernel/verifier/corpus'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

function ctx(): VerifierContext {
  return {
    move: 'TEACH',
    budgets: { maxQuestions: 1, maxNewTerms: 5, maxParagraphs: 6 },
    stageCeiling: 7,
    vocabularyBans: [],
    vocabularyUnlocked: true,
    formulaUnlocked: true,
    contentRegister: 'expert',
    assessmentActive: false,
    lessonCompletionAuthorized: false,
    reactMandated: false,
    affectBand: 'calm',
    bannedConceptTerms: [],
    learnerText: 'why?',
    legalTags: [],
  } as VerifierContext
}

describe('the rules are the authored ones', () => {
  it('chem.org.pericyclic states both rules this check encodes', () => {
    const eb = readFileSync('educational-brain/concepts/chemistry/chem.org.pericyclic.md', 'utf8')
    expect(eb).toContain('4n+2 electrons → disrotatory (thermal), conrotatory (photochemical)')
    expect(eb).toContain('[4n+2] thermal = allowed; [4n] thermal = forbidden (allowed photochemically)')
  })
})

describe('electrocyclic mode', () => {
  it.each([
    // the recorded slip (2026-09-25 intent A/B, pericyclic)
    'Under thermal conditions the 6π electrocyclic ring closure of hexatriene is conrotatory.',
    'Heating a hexatriene gives a conrotatory ring closure.',
    'Photochemically, the ring closure of butadiene is conrotatory.',
    'A 4n+2 system under thermal conditions closes conrotatory.',
  ])('flags: %s', (s) => {
    const v = vContradict(s)
    expect(v?.code).toBe('V-CONTRADICT')
    expect(v?.severity).toBe('LOG')
  })

  it.each([
    'Thermal ring closure of hexatriene (6π) is disrotatory.',
    'Butadiene (4π electrons) closes conrotatory under heat.',
    'Under light, the 6π hexatriene closure becomes conrotatory.',
    // comparison: two conditions in one sentence → skipped
    'Thermally the 6π closure is disrotatory, while photochemically it is conrotatory.',
    // negation → skipped
    'The thermal 6π closure is not conrotatory.',
    // the authored table sentence itself
    'Electrocyclic: 4n electrons → conrotatory (thermal), disrotatory (photochemical); 4n+2 electrons → disrotatory (thermal), conrotatory (photochemical).',
    // no electron count → cannot decide
    'Under heat the ring closes in a conrotatory fashion.',
  ])('stays silent: %s', (s) => {
    expect(vContradict(s)).toBeNull()
  })
})

describe('cycloaddition allowedness', () => {
  it.each([
    '[2+2] cycloadditions are thermally allowed.',
    'The Diels–Alder reaction is thermally forbidden.',
  ])('flags: %s', (s) => expect(vContradict(s)?.code).toBe('V-CONTRADICT'))

  it.each([
    'The Diels-Alder [4+2] cycloaddition is thermally allowed.',
    'A [2+2] cycloaddition is photochemically allowed.',
    '[2+2] cycloadditions are thermally forbidden.',
  ])('stays silent: %s', (s) => expect(vContradict(s)).toBeNull())
})

describe('a reported (not asserted) wrong claim is not a contradiction', () => {
  it.each([
    'If you call [2+2] thermally allowed, count the electrons in the cyclic transition state.',
    'A common mistake is to say the thermal 6π closure is conrotatory.',
    'Students often classify [2+2] as thermally allowed.',
  ])('%s', (s) => expect(vContradict(s)).toBeNull())
})

describe('never fires on unrelated teaching', () => {
  it.each([
    'A full turn of the wheel is 2π radians, so three turns are 6π radians.',
    'The probability current is conserved under heating of the sample.',
    'In the matrix [2+2] notation is not used; the allowed states are thermal.',
    'Friction increases with the normal force.',
  ])('%s', (s) => expect(vContradict(s)).toBeNull())
})

describe('wiring into the output verifier', () => {
  it('is a registered LOG code and never REJECT-eligible', () => {
    expect(RULE_CODES).toContain('V-CONTRADICT')
    expect(SEVERITY['V-CONTRADICT']).toBe('LOG')
    expect(REJECT_ELIGIBLE_CODES).not.toContain('V-CONTRADICT')
  })

  it('verify() records it but still passes the draft unchanged (log-only)', () => {
    const draft = 'Under thermal conditions the 6π electrocyclic ring closure of hexatriene is conrotatory.'
    const d = verify(draft, ctx())
    expect(d.violations.map((v) => v.code)).toContain('V-CONTRADICT')
    expect(d.violations.find((v) => v.code === 'V-CONTRADICT')?.severity).toBe('LOG')
    expect(d.repairedText).toBe(draft)
  })
})

describe('through the real route (verifier in production\'s log mode)', () => {
  let prior: string | undefined
  beforeAll(() => { prior = process.env.ENABLE_OUTPUT_VERIFIER; process.env.ENABLE_OUTPUT_VERIFIER = 'log' })
  afterAll(() => { if (prior === undefined) delete process.env.ENABLE_OUTPUT_VERIFIER; else process.env.ENABLE_OUTPUT_VERIFIER = prior })
  const PERI = { subjectSlug: 'chemistry', conceptId: 'chem.org.pericyclic', lessonTitle: 'Pericyclic Reactions' }
  const SLIP = 'Under thermal conditions the 6π electrocyclic ring closure of hexatriene is conrotatory.'
  it('the slip is logged as V-CONTRADICT and the reply is delivered unchanged', async () => {
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok, continue', modelReplies: 'Pericyclic reactions are concerted.' },
      { learnerSays: 'which way does hexatriene close when heated?', modelReplies: SLIP },
    ], PERI)
    expect(t.logs.some((l) => l.startsWith('[claim-check]') && l.includes('4n+2'))).toBe(true)
    expect((t.body as { text?: string }).text).toContain('conrotatory')
  }, 60_000)

  it('control: the correct statement logs nothing', async () => {
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok, continue', modelReplies: 'Pericyclic reactions are concerted.' },
      { learnerSays: 'which way does hexatriene close when heated?', modelReplies: 'Under thermal conditions the 6π ring closure of hexatriene is disrotatory.' },
    ], PERI)
    expect(t.logs.some((l) => l.startsWith('[claim-check]'))).toBe(false)
  }, 60_000)
})

