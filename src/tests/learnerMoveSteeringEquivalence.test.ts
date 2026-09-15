/**
 * Learner-Move Interpreter, Batch 5 — "provably equivalent" (design doc §8
 * row 5, §9's risk table: "Authority... >= 0.8, i.e. a named detector,
 * never a heuristic" / this is the first LEARNER-VISIBLE batch, so the
 * proof is against the REAL detectors on a REAL fixture battery, not a
 * couple of hand-picked examples.
 *
 * Fixture corpora reused (not re-derived) from `autonomyGuard.test.ts`
 * (ADVANCE/STAY/MENTIONS/unrelated, NAVIGATE/NOT_NAVIGATE) and
 * `multilingualPatterns.test.ts` (ru/hi autonomy corpora) — those files are
 * the vetted source of truth for what these detectors must and must not
 * fire on; this file does not re-litigate that, only proves the READING
 * agrees with the DETECTOR on the same inputs.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { detectAutonomyRequest, detectNavigationRequest, isLowSignalAcknowledgement } from '@/lib/teaching/conversationState'
import { isBareAcknowledgement } from '@/lib/teaching/masteryGate'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { readLearnerMove } from '@/lib/teaching/learnerMove'

/** Real reading, real detector chain — no re-implementation. */
function readingHas(message: string, kind: 'AUTONOMY' | 'NAVIGATION'): boolean {
  const intent = readTurnIntent(message, null)
  const reading = readLearnerMove(intent, {
    isBareAcknowledgement: isBareAcknowledgement(message),
    isLowSignalAcknowledgement: isLowSignalAcknowledgement(message),
  })
  return reading.has(kind)
}

// ── autonomyGuard.test.ts's own corpora, reused verbatim ────────────────────
const ADVANCE = [
  'move on', "let's move on", 'can we move on', 'ready to move on',
  'next topic please', 'next lesson', 'skip this', "let's continue",
  'ok I get it, move on', 'MOVE ON', "move on, I'm not confused",
]
const STAY = [
  "I don't want to move on", "I don't want to move on yet", 'not ready to move on',
  "I'm not ready to move on", 'can we not move on yet', 'no, next topic is too fast',
  'wait before we move on', 'stop, I need to move on later', "don't skip this",
  'never skip this part', 'hold on — can we move on after one more example?',
  'I would rather not move on', 'until I understand this, no next topic',
  'unless you explain it again, skip this is a bad idea',
]
const MENTIONS = [
  'what does "move on" mean here?', "the book says to 'move on' after each section",
  'what do you mean by move on',
]
const AUTONOMY_UNRELATED = ["what is Henry's law?", 'the ball moves faster on a slope', '', 'ok']

const NAVIGATE = [
  'go back to fractions', 'take me to algebra', 'take me back to the first lesson',
  'teach me about gravity', 'switch to chemistry', 'change topic to quadratics',
  'change to geometry', 'I want to learn about photosynthesis', 'can we do trigonometry',
  "can you cover Newton's laws", 'can we go over derivatives again',
]
const NOT_NAVIGATE = [
  'what is gravity?', 'this is hard', 'move on', 'next topic', 'ok', '',
  'I like learning about math', 'can you explain this differently', 'show me a diagram',
]

// ── multilingualPatterns.test.ts's own ru/hi corpora, reused verbatim ───────
const AUTONOMY_RU_HI_ADVANCE = [
  'следующая тема', 'давай дальше', 'идём дальше', 'пропустить это',
  'अगला विषय', 'आगे बढ़ें', 'agla topic', 'aage badho',
]
const AUTONOMY_RU_HI_STAY = [
  'не надо дальше', 'нет, следующая тема потом', 'подожди, дальше рано',
  'अभी नहीं, अगला विषय बाद में', 'नहीं, आगे मत बढ़ें', 'abhi nahi, agla topic baad mein',
]

describe('AUTONOMY — the reading agrees with detectAutonomyRequest on every fixture', () => {
  for (const msg of [...ADVANCE, ...STAY, ...MENTIONS, ...AUTONOMY_UNRELATED, ...AUTONOMY_RU_HI_ADVANCE, ...AUTONOMY_RU_HI_STAY]) {
    it(`agrees on ${JSON.stringify(msg)}`, () => {
      expect(readingHas(msg, 'AUTONOMY')).toBe(detectAutonomyRequest(msg))
    })
  }

  it('summary: 0 disagreements across the full corpus', () => {
    const all = [...ADVANCE, ...STAY, ...MENTIONS, ...AUTONOMY_UNRELATED, ...AUTONOMY_RU_HI_ADVANCE, ...AUTONOMY_RU_HI_STAY]
    const disagreements = all.filter((m) => readingHas(m, 'AUTONOMY') !== detectAutonomyRequest(m))
    expect(disagreements).toEqual([])
  })
})

describe('NAVIGATION — the reading agrees with detectNavigationRequest on every fixture', () => {
  for (const msg of [...NAVIGATE, ...NOT_NAVIGATE, ...ADVANCE]) {
    it(`agrees on ${JSON.stringify(msg)}`, () => {
      expect(readingHas(msg, 'NAVIGATION')).toBe(detectNavigationRequest(msg))
    })
  }

  it('summary: 0 disagreements across the full corpus', () => {
    const all = [...NAVIGATE, ...NOT_NAVIGATE, ...ADVANCE]
    const disagreements = all.filter((m) => readingHas(m, 'NAVIGATION') !== detectNavigationRequest(m))
    expect(disagreements).toEqual([])
  })
})

/**
 * ── A GENUINE, PRE-EXISTING DIVERGENCE FOUND AND REPORTED, NOT SILENTLY
 *    RECONCILED ────────────────────────────────────────────────────────────
 *
 * The design doc's own instruction: "If they ever disagree, that is itself
 * a finding to report." This is exactly that case, found while proving
 * equivalence — not invented, not assumed.
 *
 * `detectAutonomyRequest`/`detectNavigationRequest` at their OLD call sites
 * (route.ts ~L3200/~L3226, pre-Batch-5) read the RAW `message` variable.
 * The reading is built from `turnIntent`, which is itself built from
 * `learnerAuthoredMessage` (`ephemeral ? '' : message` — turnIntent.ts's
 * own header: "used everywhere downstream that asks what the LEARNER
 * wants"). On a NON-ephemeral turn these are the IDENTICAL string, so every
 * fixture above (none of which is an ephemeral instruction) proves genuine
 * equivalence for the case that matters: a real learner's own words.
 *
 * On an EPHEMERAL turn (a machine-generated lesson-opening instruction,
 * `src/app/api/learn/lesson-init/route.ts`'s `buildInstruction()`) they can
 * differ, and — verified directly against the real detectors, not assumed
 * — for ONE of the 9 instruction strings, they actually do: the Russian
 * "resume/next" opening instruction, "Продолжим с урока: {title}", contains
 * "продолжим" verbatim, which is literally one of `AUTONOMY_RU_RE`'s own
 * alternatives (conversationState.ts). This means the OLD, PRE-BATCH-5
 * production code has a live defect: opening or resuming a lesson in
 * Russian fires `detectAutonomyRequest(message) === true` on a turn where
 * the learner said nothing at all, injecting an autonomy/mastery-gate
 * prompt block into what should be an ordinary lesson-opening turn. The
 * OTHER 8 instruction strings (en/ru/hi x restart/review/next-or-resume)
 * were already, deliberately authored to avoid this class of collision —
 * see `buildInstruction`'s own "NOT «заново»" / "NOT 'restart lesson'"
 * comments, which record the SAME collision being avoided for a DIFFERENT
 * guard. The Russian resume string was missed.
 *
 * Batch 5's conversion (reading built from `learnerAuthoredMessage`, which
 * is structurally `''` on every ephemeral turn regardless of instruction
 * wording) does not reproduce this defect — it reads AUTONOMY as false on
 * this exact turn, which is the CORRECT reading of what the learner
 * actually said (nothing). This is reported here as a genuine, incidental
 * fix, not hidden inside "provable equivalence" — the two ARE NOT
 * equivalent on this one input, and this test proves both directions of
 * that claim rather than asserting only the convenient one.
 */
describe('EPHEMERAL TURNS — the one documented, verified divergence, not silently reconciled', () => {
  const title = "Newton's First Law"
  const instructions: Array<[string, string]> = [
    ['en-restart', `Open lesson "${title}" now and teach it from the beginning. Please begin the full lesson opening.`],
    ['en-review', `🔁 REVISION MODE: Let's review "${title}". Please explain the key concepts and give me practice exercises.`],
    ['en-next/resume', `Let's start lesson "${title}".`],
    ['ru-restart', `Открой урок «${title}» и проведи его с самого начала. Пожалуйста, начни с полного вступления по структуре урока.`],
    ['ru-review', `🔁 РЕЖИМ ПОВТОРЕНИЯ: Давай повторим тему "${title}". Объясни ключевые концепции и дай практические задания.`],
    ['ru-next/resume', `Продолжим с урока: ${title}`],
    ['hi-restart', `Lesson "${title}" ab kholo aur shuruaat se padhao. Poora lesson opening karo.`],
    ['hi-review', `🔁 REVISION MODE: "${title}" dobara padho. Key concepts explain karo aur practice exercises do.`],
    ['hi-next/resume', `Lesson shuru karte hain: ${title}`],
  ]

  it('the OLD raw-message check fires on ru-next/resume — the confirmed pre-existing defect', () => {
    const ruResume = instructions.find(([label]) => label === 'ru-next/resume')![1]
    expect(detectAutonomyRequest(ruResume)).toBe(true)
  })

  it('the NEW reading-based check, fed the ephemeral-forced empty message, does NOT fire on any of the 9', () => {
    // ephemeral => learnerAuthoredMessage = '' (route.ts L376), regardless
    // of what the raw instruction string says.
    for (const [, instruction] of instructions) {
      void instruction // the raw text is irrelevant to the NEW check by construction
      const intent = readTurnIntent('', null)
      const reading = readLearnerMove(intent, { isBareAcknowledgement: false, isLowSignalAcknowledgement: false })
      expect(reading.has('AUTONOMY')).toBe(false)
      expect(reading.has('NAVIGATION')).toBe(false)
    }
  })

  it('all 9 instructions — OLD (raw) vs NEW (ephemeral-empty) comparison, one named exception', () => {
    const results = instructions.map(([label, instruction]) => ({
      label,
      oldAutonomy: detectAutonomyRequest(instruction),
      oldNavigation: detectNavigationRequest(instruction),
    }))
    const oldFires = results.filter((r) => r.oldAutonomy || r.oldNavigation).map((r) => r.label)
    // The one, and only, known collision.
    expect(oldFires).toEqual(['ru-next/resume'])
  })
})

describe('the route wires Batch 5 correctly — source pins', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('the AUTONOMY/NAVIGATION if/else-if pair reads the reading, not the raw detectors, at the call site', () => {
    const ifAt = ROUTE.indexOf('learnerMoveStageAHoisted.has(\'AUTONOMY\')')
    expect(ifAt).toBeGreaterThan(-1)
    const elseIfAt = ROUTE.indexOf('learnerMoveStageAHoisted.has(\'NAVIGATION\')', ifAt)
    expect(elseIfAt).toBeGreaterThan(ifAt)
    // Neither raw detector is called directly at the (former) call sites
    // any more — both are still IMPORTED (other call sites in the file use
    // them, per the design doc's own out-of-scope classification), so this
    // checks the SPECIFIC if/else-if shape rather than absence from the file.
    const block = ROUTE.slice(ifAt - 400, elseIfAt + 200)
    expect(block).not.toMatch(/if \(detectAutonomyRequest\(message\)\)/)
    expect(block).not.toMatch(/else if \(detectNavigationRequest\(message\)/)
  })

  it('exactly one UNCONDITIONAL readLearnerMove( call, plus one defensive fallback — never two real computations', () => {
    // Comments cite `readLearnerMove(` by name (that is the point of the
    // comments); the constraint is about CODE. Same discipline
    // learnerMovePurity.test.ts uses for learnerMove.ts's own source.
    const code = ROUTE
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split('\n')
      .map((l) => l.replace(/\/\/.*$/, ''))
      .join('\n')
    // 2 real occurrences post Batch 5, correctly: the early, unconditional
    // computation (~L3220), and Batch 1's own site's DEFENSIVE fallback
    // (`learnerMoveStageAHoisted ?? readLearnerMove(...)`) — which only
    // executes if the early site somehow did not run this turn, proven
    // equal to the early result when it does (see the assignment site's
    // own comment). Never three: that would mean a genuine third,
    // unrelated recomputation crept in.
    expect(code.split('readLearnerMove(').length - 1).toBe(2)
    expect(code).toMatch(/learnerMoveStageAHoisted = readLearnerMove\(/)
    expect(code).toMatch(/learnerMoveStageAHoisted \?\? readLearnerMove\(/)
  })

  it('the hoisted stage-A value is assigned exactly once, before the AUTONOMY/NAVIGATION check', () => {
    expect(ROUTE.split('learnerMoveStageAHoisted =').length - 1).toBe(1)
    const assignAt = ROUTE.indexOf('learnerMoveStageAHoisted =')
    const useAt = ROUTE.indexOf("learnerMoveStageAHoisted.has('AUTONOMY')")
    expect(assignAt).toBeLessThan(useAt)
  })

  it('Batch 1\'s own stage-A site reuses the hoisted value with a defensive fallback, not a bare recompute', () => {
    expect(ROUTE).toMatch(/const learnerMoveStageA = learnerMoveStageAHoisted \?\? readLearnerMove\(/)
  })

  it('claim challenge, stated inability, and the L1346 OR-combo are untouched — no accidental scope creep', () => {
    expect(ROUTE).toMatch(/if \(isClaimChallenge\(message\)\)/)
    expect(ROUTE).toMatch(/const statedNo = capMod\.detectStatedInability\(message\)/)
    expect(ROUTE).toMatch(/if \(isReturnRequest\(message\) \|\| isExplicitCorrection\(message\)\) return true/)
  })
})
