/**
 * S1 (Runtime Redesign Mission Parts 3/4) — Turn History tests.
 *
 * Covers the ring buffer, the five similarity/oscillation detectors, and
 * the five new verifier rules (V-DUP-EXACT, V-DUP-NEAR, V-DUP-QUESTION,
 * V-REC-REPEAT, V-OSCILLATE) — including the additive/no-op contract when
 * ctx.turnHistory is undefined, which is the guarantee every existing
 * verifier call site relies on (see src/tests/outputVerifier.test.ts's own
 * ctx() helper, which never sets turnHistory).
 */
import { describe, it, expect } from 'vitest'
import {
  initialTurnHistory, readTurnHistory, serializeTurnHistory, buildTurnRecord,
  appendTurn, normalizeForComparison, jaccardSimilarity, detectExactDuplicate,
  detectNearDuplicate, detectDuplicateQuestion, detectRepeatedRecoveryScript,
  detectPhaseOscillation, TURN_HISTORY_MAX, DEFAULT_SIMILARITY_THRESHOLD,
  verify, type VerifierContext,
} from '@/lib/kernel/verifier'

function ctx(over: Partial<VerifierContext> = {}): VerifierContext {
  return {
    move: 'TEACH', budgets: { maxQuestions: 0, maxParagraphs: 4, maxNewTerms: 2 },
    stageCeiling: 2, vocabularyBans: [],
    vocabularyUnlocked: true, formulaUnlocked: true,
    contentRegister: 'intermediate',
    assessmentActive: false, lessonCompletionAuthorized: false,
    reactMandated: false, affectBand: 'calm',
    bannedConceptTerms: [], learnerText: '',
    legalTags: ['VISUAL', 'HINT'],
    ...over,
  }
}

describe('normalizeForComparison', () => {
  it('lowercases, strips punctuation, collapses whitespace', () => {
    expect(normalizeForComparison('Hello,   World!!')).toBe('hello world')
  })
  it('excludes code fences', () => {
    expect(normalizeForComparison('Try this:\n```js\nx=1\n```\nDone.')).not.toContain('x=1')
  })
})

describe('jaccardSimilarity', () => {
  it('is 1.0 for identical sets', () => {
    const a = new Set(['a', 'b', 'c'])
    expect(jaccardSimilarity(a, new Set(a))).toBe(1)
  })
  it('is 0.0 for disjoint sets', () => {
    expect(jaccardSimilarity(new Set(['a']), new Set(['b']))).toBe(0)
  })
  it('is symmetric and order-insensitive', () => {
    const a = new Set(['a', 'b', 'c', 'd'])
    const b = new Set(['b', 'c', 'd', 'e'])
    expect(jaccardSimilarity(a, b)).toBeCloseTo(3 / 5)
    expect(jaccardSimilarity(b, a)).toBeCloseTo(3 / 5)
  })
})

describe('TurnHistory read/write round-trip', () => {
  it('initialTurnHistory is empty', () => {
    expect(initialTurnHistory().turns).toEqual([])
  })
  it('readTurnHistory is total: garbage in -> empty history, never throws', () => {
    expect(readTurnHistory(undefined).turns).toEqual([])
    expect(readTurnHistory(null).turns).toEqual([])
    expect(readTurnHistory('garbage').turns).toEqual([])
    expect(readTurnHistory({ turns: 'not-an-array' }).turns).toEqual([])
  })
  it('serializes and reads back identically (JSONB round-trip)', () => {
    const h0 = initialTurnHistory()
    const record = buildTurnRecord('Let us look at fractions.', {
      askedQuestion: false, recoveryKey: null, phaseAfter: 'DEMONSTRATE',
    })
    const h1 = appendTurn(h0, record)
    const serialized = serializeTurnHistory(h1)
    const parsedBack = JSON.parse(JSON.stringify(serialized)) // simulate JSONB round-trip
    const h2 = readTurnHistory(parsedBack)
    expect(h2.turns).toHaveLength(1)
    expect(h2.turns[0].normalizedText).toBe(record.normalizedText)
    expect([...h2.turns[0].tokens]).toEqual([...record.tokens])
  })
  it('ring buffer caps at TURN_HISTORY_MAX, dropping oldest first', () => {
    let h = initialTurnHistory()
    for (let i = 0; i < TURN_HISTORY_MAX + 3; i++) {
      h = appendTurn(h, buildTurnRecord(`turn number ${i}`, { askedQuestion: false, recoveryKey: null, phaseAfter: null }))
    }
    expect(h.turns).toHaveLength(TURN_HISTORY_MAX)
    expect(h.turns[0].normalizedText).toContain(`${3}`) // oldest 3 dropped
    expect(h.turns[h.turns.length - 1].normalizedText).toContain(`${TURN_HISTORY_MAX + 2}`)
  })
})

describe('detectExactDuplicate (I-5)', () => {
  it('finds a byte-identical (normalized) prior turn anywhere in the ring', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord('A fraction has a numerator and a denominator.', { askedQuestion: false, recoveryKey: null, phaseAfter: null }))
    h = appendTurn(h, buildTurnRecord('Something completely different.', { askedQuestion: false, recoveryKey: null, phaseAfter: null }))
    const candidate = normalizeForComparison('A fraction has a numerator and a denominator.')
    const result = detectExactDuplicate(candidate, h)
    expect(result.isDuplicate).toBe(true)
    expect(result.matchedIndex).toBe(0)
  })
  it('is case/punctuation insensitive (same normalization both sides)', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord('Fractions are Fun!', { askedQuestion: false, recoveryKey: null, phaseAfter: null }))
    const candidate = normalizeForComparison('fractions are fun.')
    expect(detectExactDuplicate(candidate, h).isDuplicate).toBe(true)
  })
  it('returns false for genuinely new text', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord('Old sentence.', { askedQuestion: false, recoveryKey: null, phaseAfter: null }))
    expect(detectExactDuplicate(normalizeForComparison('Brand new sentence.'), h).isDuplicate).toBe(false)
  })
  it('empty history never matches', () => {
    expect(detectExactDuplicate('anything', initialTurnHistory()).isDuplicate).toBe(false)
  })
})

describe('detectNearDuplicate (I-6) — immediately-previous-turn only', () => {
  it('flags a reworded-but-substantively-identical reply to the immediate prior turn', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord(
      'A fraction shows a part of a whole, with a numerator sitting over a denominator, and that idea matters a great deal here today.',
      { askedQuestion: false, recoveryKey: null, phaseAfter: null },
    ))
    const candidateTokens = new Set(normalizeForComparison(
      'A fraction shows a part of a whole, using a numerator sitting over a denominator, and that idea matters a great deal here today.',
    ).split(' '))
    const result = detectNearDuplicate(candidateTokens, h, DEFAULT_SIMILARITY_THRESHOLD)
    expect(result.isNearDuplicate).toBe(true)
  })
  it('does NOT flag a legitimate spaced-repetition callback several turns back', () => {
    // detectNearDuplicate only ever compares against the LAST turn, so an
    // earlier callback never triggers it even if worded identically.
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord('As we discussed with fractions earlier.', { askedQuestion: false, recoveryKey: null, phaseAfter: null }))
    h = appendTurn(h, buildTurnRecord('Now let us move to decimals entirely.', { askedQuestion: false, recoveryKey: null, phaseAfter: null }))
    const candidateTokens = new Set(normalizeForComparison('As we discussed with fractions earlier.').split(' '))
    expect(detectNearDuplicate(candidateTokens, h, DEFAULT_SIMILARITY_THRESHOLD).isNearDuplicate).toBe(false)
  })
  it('empty history never flags', () => {
    const tokens = new Set(['a', 'b'])
    expect(detectNearDuplicate(tokens, initialTurnHistory(), DEFAULT_SIMILARITY_THRESHOLD).isNearDuplicate).toBe(false)
  })
})

describe('detectDuplicateQuestion (I-7)', () => {
  it('flags a near-duplicate question among recent ASK turns only', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord('What is the numerator in three quarters, and how do you know that for sure?', { askedQuestion: true, recoveryKey: null, phaseAfter: null }))
    h = appendTurn(h, buildTurnRecord('Great, that is correct, well done.', { askedQuestion: false, recoveryKey: null, phaseAfter: null }))
    const tokens = new Set(normalizeForComparison('What is the numerator of three quarters, and how do you know that for sure?').split(' '))
    const result = detectDuplicateQuestion(tokens, true, h, DEFAULT_SIMILARITY_THRESHOLD)
    expect(result.isNearDuplicate).toBe(true)
    expect(result.matchedIndex).toBe(0)
  })
  it('never fires when the candidate itself is not a question', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord('What is the numerator in three quarters?', { askedQuestion: true, recoveryKey: null, phaseAfter: null }))
    const tokens = new Set(normalizeForComparison('What is the numerator in three quarters?').split(' '))
    expect(detectDuplicateQuestion(tokens, false, h, DEFAULT_SIMILARITY_THRESHOLD).isNearDuplicate).toBe(false)
  })
  it('a TEACH turn is never compared against an ASK turn (scoped both sides)', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord('What is the numerator in three quarters?', { askedQuestion: false, recoveryKey: null, phaseAfter: null }))
    const tokens = new Set(normalizeForComparison('What is the numerator in three quarters?').split(' '))
    expect(detectDuplicateQuestion(tokens, true, h, DEFAULT_SIMILARITY_THRESHOLD).isNearDuplicate).toBe(false)
  })
})

describe('detectRepeatedRecoveryScript (I-8) — recovery must escalate', () => {
  it('flags when a later rung near-duplicates the most recent same-key rung', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord(
      "That's okay — let's slow down and look at this together.",
      { askedQuestion: false, recoveryKey: 'dont_know', phaseAfter: null },
    ))
    const tokens = new Set(normalizeForComparison(
      "That's okay — let's slow down and look at this together, step by step.",
    ).split(' '))
    const result = detectRepeatedRecoveryScript(tokens, 'dont_know', h, DEFAULT_SIMILARITY_THRESHOLD)
    expect(result.isNearDuplicate).toBe(true)
  })
  it('does not compare against a DIFFERENT recovery key', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord('Same script text here.', { askedQuestion: false, recoveryKey: 'confused', phaseAfter: null }))
    const tokens = new Set(normalizeForComparison('Same script text here.').split(' '))
    expect(detectRepeatedRecoveryScript(tokens, 'dont_know', h, DEFAULT_SIMILARITY_THRESHOLD).isNearDuplicate).toBe(false)
  })
  it('no-ops when the candidate has no recovery key', () => {
    const h = appendTurn(initialTurnHistory(), buildTurnRecord('x', { askedQuestion: false, recoveryKey: 'dont_know', phaseAfter: null }))
    expect(detectRepeatedRecoveryScript(new Set(['x']), null, h, DEFAULT_SIMILARITY_THRESHOLD).isNearDuplicate).toBe(false)
  })
})

describe('detectPhaseOscillation (I-9) — A→B→A→B cycle', () => {
  it('flags a genuine oscillation', () => {
    let h = initialTurnHistory()
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'OBSERVE']) {
      h = appendTurn(h, buildTurnRecord('x', { askedQuestion: false, recoveryKey: null, phaseAfter: phase }))
    }
    const result = detectPhaseOscillation('DEMONSTRATE', h)
    expect(result.isOscillating).toBe(true)
    expect(result.cycle).toEqual(['OBSERVE', 'DEMONSTRATE'])
  })
  it('does not flag steady forward progress', () => {
    let h = initialTurnHistory()
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'GUIDE']) {
      h = appendTurn(h, buildTurnRecord('x', { askedQuestion: false, recoveryKey: null, phaseAfter: phase }))
    }
    expect(detectPhaseOscillation('CHECK', h).isOscillating).toBe(false)
  })
  it('requires at least 4 phase points; short history never flags', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord('x', { askedQuestion: false, recoveryKey: null, phaseAfter: 'OBSERVE' }))
    expect(detectPhaseOscillation('DEMONSTRATE', h).isOscillating).toBe(false)
  })
})

describe('verifier integration — additive/no-op contract', () => {
  it('V-DUP-*/V-OSCILLATE never fire when ctx.turnHistory is undefined (existing call sites unaffected)', () => {
    const decision = verify('Any text at all, even a repeated one repeated twice repeated.', ctx())
    expect(decision.violations.filter((v) => v.code.startsWith('V-DUP') || v.code === 'V-REC-REPEAT' || v.code === 'V-OSCILLATE')).toEqual([])
  })

  it('V-DUP-EXACT fires at LOG severity (never REJECT) and does not change the verdict', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord('Repeated sentence right here.', { askedQuestion: false, recoveryKey: null, phaseAfter: null }))
    const decision = verify('Repeated sentence right here.', ctx({ turnHistory: h }))
    expect(decision.verdict).toBe('PASS')
    const v = decision.violations.find((x) => x.code === 'V-DUP-EXACT')
    expect(v).toBeDefined()
    expect(v?.severity).toBe('LOG')
  })

  it('V-OSCILLATE fires at LOG severity given an A→B→A→B phase sequence', () => {
    let h = initialTurnHistory()
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'OBSERVE']) {
      h = appendTurn(h, buildTurnRecord('x', { askedQuestion: false, recoveryKey: null, phaseAfter: phase }))
    }
    const decision = verify('New text, not a duplicate of anything.', ctx({ turnHistory: h, phaseAfter: 'DEMONSTRATE' }))
    expect(decision.verdict).toBe('PASS')
    const v = decision.violations.find((x) => x.code === 'V-OSCILLATE')
    expect(v).toBeDefined()
    expect(v?.severity).toBe('LOG')
  })

  it('V-REC-REPEAT fires when a recovery turn near-duplicates the previous same-key rung', () => {
    let h = initialTurnHistory()
    h = appendTurn(h, buildTurnRecord(
      "That's okay, let's slow right down together on this one and take it piece by piece, no rush at all.",
      { askedQuestion: false, recoveryKey: 'dont_know', phaseAfter: null },
    ))
    const decision = verify(
      "That's fine, let's slow right down together on this one and take it piece by piece, no rush at all.",
      ctx({ move: 'TEACH', turnHistory: h, recoveryKey: 'dont_know' }),
    )
    expect(decision.verdict).toBe('PASS')
    const v = decision.violations.find((x) => x.code === 'V-REC-REPEAT')
    expect(v).toBeDefined()
    expect(v?.severity).toBe('LOG')
  })
})
