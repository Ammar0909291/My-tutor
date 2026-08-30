/**
 * RUBRIC SCORER — score a captured run against the SEVEN ENFORCED criteria.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * This programme has been carrying two numbers for the same product that do not
 * agree: ~79% "verified mastery" (a counter, read by the harness) and ~5.8/10
 * (hand-read transcripts). They disagree for a good reason — a counter cannot
 * see a tutor refusing to confirm a correct answer, and it cannot see a
 * question that was never gradeable. Neither number can end the programme.
 * TEACHING_QUALITY_BLUEPRINT.md §1 defines what 9/10 means; this scores it.
 *
 * ── WHAT IT SCORES, AND WHAT IT REFUSES TO ──────────────────────────────────
 * ONLY the seven ENFORCED criteria — the ones a server-side invariant can hold
 * and a machine can check. Criteria 1 (opens on a concrete anchor) and 6 (a
 * wrong answer gets a specific reason) are INFLUENCED: prompt-shaped, model-
 * dependent, and scoreable only by a human. They are NOT scored here and NOT
 * folded into the total. `teachingDefectScan.ts`'s header is right — no regex
 * substitutes for that judgment — and a scorer that quietly rated them would be
 * the exact self-deception the blueprint's §0 warns about.
 *
 * ── APPLICABILITY IS NOT FAILURE ────────────────────────────────────────────
 * A lesson where the learner never asked for a diagram cannot pass or fail
 * criterion 3. Each criterion reports applicable/passed separately, and a
 * lesson's score is over the criteria that APPLIED to it. Counting an
 * inapplicable criterion as a failure is how a scorer manufactures a problem;
 * counting it as a pass is how it manufactures a success.
 *
 * ── CALIBRATION IS A PRECONDITION OF USE ────────────────────────────────────
 * Run `--calibrate` to print, per criterion, the lessons it failed and the
 * evidence line for each, so a human can confirm the judgment before any
 * number from this file is quoted. Four hypotheses in this programme have
 * already been falsified by reading the captured turn; this file is not
 * exempt from that.
 *
 * ── CALIBRATION RESULT — READ THIS BEFORE QUOTING ANY NUMBER FROM HERE ──────
 * Four lessons from the 2026-08-30 physics run were hand-scored earlier in the
 * programme. This scorer was checked against them and DISAGREES, close to
 * inverting the two extremes:
 *
 *      lesson                        human   this scorer
 *      phys.mech.pressure-fluids      8/10       2.9
 *      phys.em.electrical-power       8/10       5.7
 *      phys.therm.refrigerators       4/10       4.3
 *      phys.wave.sound-intensity      4/10       7.1
 *
 * That is not a bug to be tuned away. The two are measuring DIFFERENT THINGS.
 * The seven enforced criteria are assessment MACHINERY — was the question
 * gradeable, was the answer credited, was the gate reached. The human was
 * reading TEACHING — was the anchor concrete, was the analogy apt, did the
 * wrong answer get a real reason. pressure-fluids teaches well and never
 * reaches CHECK; sound-intensity reaches the gates and spends two turns
 * teaching the learner how to operate the tutor.
 *
 * THEREFORE: the number this prints is ENFORCED-CRITERIA COMPLIANCE, and it is
 * a regression detector and a gate check. It is NOT "the lesson's quality" and
 * must never be reported as one, or quoted as the 9/10 in the blueprint's
 * title. That claim needs these seven GREEN **and** a human read of criteria 1
 * and 6. Reporting this mean as quality is precisely the self-deception
 * blueprint §0 warns about, and the instrument would have done it unchecked.
 *
 *   npx tsx scripts/qa/rubricScore.ts <runDir> [<baselineDir>] [--calibrate]
 *                                              [--per-lesson]
 */
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

interface Mcq { question?: string; options?: string[]; correctIndex?: number; assetId?: string }
interface Mastery {
  phase?: string; checkCorrect?: number; practiceCorrect?: number; verified?: boolean
}
interface Payload {
  text?: string; provider?: string; mcq?: Mcq | null; mastery?: Mastery | null
  sceneSpec?: unknown; visualSpec?: unknown; visual?: unknown; lessonComplete?: boolean
}
interface Turn { label: string; sent: string; payload: Payload }
interface Transcript {
  id: string; difficulty?: string; turns: Turn[]
  providerDegraded?: boolean; lessonDrift?: boolean; finalMastery?: Mastery | null
}

/** The seven. Ids are stable — a comparison between runs is keyed on them. */
const ENFORCED = [
  'C2_differentApproach',
  'C3_diagramHonest',
  'C4_questionsGradeable',
  'C5_correctConfirmed',
  'C7_noVerbatimReuse',
  'C8_noContentFreeTurns',
  'C9_reachesAndCredits',
] as const
type Criterion = (typeof ENFORCED)[number]

interface Verdict { applicable: boolean; passed: boolean; evidence: string[] }
/** Two criteria are RATES, not booleans: the blueprint's gates for them read
 *  "criterion 4: 22% -> >= 70%" and "criterion 5 >= 90%", i.e. a proportion of
 *  questions and of correct answers. Scoring them as "did ANY instance fail"
 *  made every lesson fail and carried no information. The per-lesson verdict
 *  uses a threshold; the CORPUS rate is what the gate is read against, so both
 *  are reported and the tallies ride on the card. */
type Scorecard = Record<Criterion, Verdict> & {
  tally: { questionsKeyed: number; questionsAsked: number; confirmed: number; correctAnswers: number }
}

/** Normalise typographic punctuation BEFORE any matching.
 *  Found in calibration: the tutor writes "That\u2019s right." with U+2019, and
 *  every apostrophe pattern in this file is ASCII. Criterion 5 scored 2% purely
 *  because of that — the scorer was measuring its own encoding assumption, not
 *  the product. This is exactly the class of error the calibration pass exists
 *  to catch, and it would have been reported as a catastrophic product failure. */
const flatten = (s: string) => s.replace(/[\u2018\u2019\u02bc]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[\u2013\u2014]/g, '-')
const norm = (s: string | undefined) => flatten(s ?? '').split(/\s+/).join(' ').trim()
const hasFigure = (p: Payload) => Boolean(p.sceneSpec || p.visualSpec || p.visual)
const modelTurns = (t: Transcript) => t.turns.filter((x) => norm(x.payload.text).length > 0)

/** Token-set overlap. Deliberately crude and deliberately HIGH-threshold: this
 *  is used to claim two turns say the same thing, and a false accusation of
 *  repetition is worse than a missed one. */
function overlap(a: string, b: string): number {
  const tok = (s: string) => new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 3))
  const A = tok(a); const B = tok(b)
  if (A.size < 8 || B.size < 8) return 0
  let inter = 0
  for (const w of A) if (B.has(w)) inter += 1
  return inter / Math.min(A.size, B.size)
}

/** The learner's message IS the exact text of an option they were offered —
 *  the only case where correctness is knowable from a transcript alone. */
function answeredOption(prev: Payload, sent: string): { correct: boolean } | null {
  const m = prev.mcq
  if (!m?.options || typeof m.correctIndex !== 'number') return null
  const i = m.options.indexOf(sent)
  return i === -1 ? null : { correct: i === m.correctIndex }
}

const TOO_HARD = /too hard|i don'?t understand|dont understand|still (little )?confused|explain (it )?(again|differently|one more time)|say it (more )?simpl|help me again/i
const ASKS_TO_SEE = /show me (a |the )?(picture|diagram|image|visual)|show the picture|picture or diagram|can you draw|draw (it|a diagram)/i
const HONEST_NO_FIGURE = /i (can'?t|cannot|am unable to|don'?t have)[^.?!]{0,60}(show|draw|display|picture|diagram|image)|no (diagram|figure|picture|image) (is )?(available|for this)|let me describe|picture it in your mind|imagine/i
const CLAIMS_A_FIGURE = /\b(the|this) (diagram|figure|picture|image|graph) (shows|above|below|on your screen)|look at the (diagram|figure|picture|image|graph)|as you can see|here you see|on your screen/i
/** An EXPLICIT statement that the answer was right. Widened during calibration
 *  against real replies ("Great, you picked the correct restoring-force rule!",
 *  "You're right-gravity just shifts the equilibrium"). Deliberately NOT a bare
 *  "right", which matches "the right-hand side". */
const CONFIRMS = new RegExp([
  "\\bcorrect\\b", "\\bexactly\\b", "\\bprecisely\\b", "\\bspot on\\b",
  "\\bwell done\\b", "\\bnicely done\\b", "\\bperfect\\b",
  "\\b(that|this) ?'?s right\\b", "\\bthat is right\\b",
  "\\byou'?re right\\b", "\\byou are right\\b", "\\bquite right\\b",
  "\\byou'?ve got it\\b", "\\bgot it right\\b", "\\byou nailed\\b",
  "\\bgood job\\b", "\\byes[,!.]",
].join('|'), 'i')
const FILLER = /let'?s stay with this idea|let'?s take a moment|take a moment to think|let'?s pause here/i
/** A turn spent teaching the learner how to OPERATE the tutor instead of the
 *  subject. Added because calibration exposed it as a blind spot: the enforced
 *  set scored phys.wave.sound-intensity 7.1 while a human scored it 4/10, and
 *  the reason is two turns telling the learner which phrase to type — ending in
 *  a refusal. Content-free with respect to the subject, and already a counted
 *  signature in teachingDefectScan.ts, so this is a wiring-up, not a new claim. */
const ASKS_TO_SEE_STRICT = /show me (a |the )?(picture|diagram|image)|show the picture|picture or diagram/i
const TEACHES_HOW_TO_ASK =
  /you can (simply |just )?(say|type|ask)|simply say|just say ["']|which action will let you view|lets? the (person|system) know/i
const ASKS = (s: string) => /\?/.test(s.replace(/```[\s\S]*?```/g, ''))

function score(t: Transcript): Scorecard {
  const card = Object.fromEntries(
    ENFORCED.map((c) => [c, { applicable: false, passed: true, evidence: [] as string[] }]),
  ) as Scorecard
  card.tally = { questionsKeyed: 0, questionsAsked: 0, confirmed: 0, correctAnswers: 0 }
  const fail = (c: Criterion, why: string) => {
    card[c].applicable = true; card[c].passed = false; card[c].evidence.push(why)
  }
  const applies = (c: Criterion) => { card[c].applicable = true }

  const turns = t.turns
  let figureEverOnScreen = false
  let questionsAsked = 0
  let questionsKeyed = 0
  let correctAnswers = 0
  let confirmed = 0
  const ungradeable: string[] = []
  const unconfirmed: string[] = []

  for (let i = 0; i < turns.length; i += 1) {
    const cur = turns[i].payload
    const prev = i > 0 ? turns[i - 1].payload : null
    const text = norm(cur.text)
    const label = turns[i].label
    if (hasFigure(cur)) figureEverOnScreen = true

    // ── C2 · "too hard" must be met with a DIFFERENT approach ──────────────
    if (prev && TOO_HARD.test(turns[i].sent) && text.length > 120) {
      applies('C2_differentApproach')
      const before = norm(prev.text)
      if (before.length > 120 && overlap(text, before) >= 0.75) {
        fail('C2_differentApproach', `${label}: reply repeats the previous turn (overlap ${overlap(text, before).toFixed(2)})`)
      }
    }

    // ── C3 · a diagram request is answered with a figure or an honest no ───
    if (ASKS_TO_SEE.test(turns[i].sent)) {
      applies('C3_diagramHonest')
      const served = hasFigure(cur) || figureEverOnScreen
      // HONESTY IS CHECKED FIRST, and the order is the whole point. Calibration
      // caught this scoring phys.em.magnetic-dipole T3 as "points at a figure
      // that is not there" when the turn actually reads "I can't show you a
      // picture of this one ON YOUR SCREEN, so let me describe it" — the
      // phantom-figure pattern matched a phrase inside the honest disclaimer
      // itself. A turn that says it has no figure cannot also be claiming one.
      if (!served && HONEST_NO_FIGURE.test(text)) {
        // honest refusal — the criterion explicitly allows this
      } else if (!served && CLAIMS_A_FIGURE.test(text)) {
        fail('C3_diagramHonest', `${label}: points at a figure that is not there`)
      } else if (!served) {
        fail('C3_diagramHonest', `${label}: no figure, and no honest statement that none exists`)
      }
    }
    // the blueprint's explicit never: a false "I can't" WHILE a scene is attached
    if (hasFigure(cur) && HONEST_NO_FIGURE.test(text) && /i (can'?t|cannot|am unable)/i.test(text)) {
      fail('C3_diagramHonest', `${label}: claims it cannot show a picture while one IS attached`)
    }

    // ── C4 · every question put to the learner is server-gradeable ─────────
    //  Counted as a RATE. Scoring it as "did ANY ungradeable question appear"
    //  made every lesson fail and told us nothing — the blueprint's own gate is
    //  a proportion (22% -> >= 70%), because a rhetorical aside is not the same
    //  defect as a graded checkpoint with no key.
    if (text.length > 0 && ASKS(text)) {
      questionsAsked += 1
      if (cur.mcq) questionsKeyed += 1
      else ungradeable.push(`${label}: asked a question with no answer key`)
    }

    // ── C5 · a correct answer is explicitly confirmed ──────────────────────
    if (prev) {
      const ans = answeredOption(prev, turns[i].sent)
      if (ans?.correct) {
        correctAnswers += 1
        if (CONFIRMS.test(text)) confirmed += 1
        else unconfirmed.push(`${label}: correct answer met with "${text.slice(0, 70)}"`)
      }
    }

    // ── C8 · no content-free turns ─────────────────────────────────────────
    if (text.length > 0) {
      applies('C8_noContentFreeTurns')
      if (FILLER.test(text) && text.length < 220 && !cur.mcq) {
        fail('C8_noContentFreeTurns', `${label}: content-free hold`)
      }
      if (ASKS_TO_SEE_STRICT.test(turns[i].sent) && TEACHES_HOW_TO_ASK.test(text)) {
        fail('C8_noContentFreeTurns', `${label}: taught the learner how to ask instead of showing the subject`)
      }
    }
  }

  // C4's verdict, from the rate. A lesson passes when at least 70% of the
  // questions it put to the learner carried an answer key.
  if (questionsAsked > 0) {
    applies('C4_questionsGradeable')
    const rate = questionsKeyed / questionsAsked
    if (rate < 0.7) {
      fail('C4_questionsGradeable', `${questionsKeyed}/${questionsAsked} questions gradeable (${(100 * rate).toFixed(0)}%)`)
      card.C4_questionsGradeable.evidence.push(...ungradeable.slice(0, 2))
    }
  }
  // C5's verdict, also from a rate. Threshold 0.9, matching its gate.
  if (correctAnswers > 0) {
    applies('C5_correctConfirmed')
    const rate = confirmed / correctAnswers
    if (rate < 0.9) {
      fail('C5_correctConfirmed', `${confirmed}/${correctAnswers} correct answers confirmed (${(100 * rate).toFixed(0)}%)`)
      card.C5_correctConfirmed.evidence.push(...unconfirmed.slice(0, 2))
    }
  }
  card.tally = { questionsKeyed, questionsAsked, confirmed, correctAnswers }

  // ── C7 · no verbatim reuse of content already served this session ────────
  const said: string[] = []
  for (const x of modelTurns(t)) {
    const text = norm(x.payload.text)
    if (text.length < 200) { continue }
    applies('C7_noVerbatimReuse')
    if (said.some((m) => text.includes(m.slice(0, 200)) || m.includes(text.slice(0, 200)))) {
      fail('C7_noVerbatimReuse', `${x.label}: repeats a passage already served`)
    }
    said.push(text)
  }

  // ── C9 · reaches CHECK and PRACTICE, and credits answers there ───────────
  applies('C9_reachesAndCredits')
  const phases = new Set(turns.map((x) => x.payload.mastery?.phase).filter(Boolean) as string[])
  const fm = t.finalMastery ?? {}
  const credited = (fm.checkCorrect ?? 0) + (fm.practiceCorrect ?? 0)
  if (!phases.has('CHECK') || !phases.has('PRACTICE')) {
    fail('C9_reachesAndCredits', `never reached ${!phases.has('CHECK') ? 'CHECK' : 'PRACTICE'} (phases: ${[...phases].join('>')})`)
  } else if (credited === 0) {
    fail('C9_reachesAndCredits', 'reached the gates and credited nothing')
  }

  return card
}

// ── reporting ──────────────────────────────────────────────────────────────
const load = (dir: string): Transcript[] =>
  readdirSync(dir).filter((f) => f.startsWith('out-') && f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')) as Transcript)

/** A lesson's score is over the criteria that APPLIED to it, scaled to 10. */
function lessonScore(card: Scorecard): { score: number; applied: number; passed: number } {
  const applied = ENFORCED.filter((c) => card[c].applicable)
  const passed = applied.filter((c) => card[c].passed)
  return {
    score: applied.length === 0 ? NaN : (10 * passed.length) / applied.length,
    applied: applied.length, passed: passed.length,
  }
}

function main() {
  const args = process.argv.slice(2)
  const calibrate = args.includes('--calibrate')
  const dirs = args.filter((a) => !a.startsWith('--'))
  if (dirs.length === 0) {
    console.error('usage: rubricScore.ts <runDir> [<baselineDir>] [--calibrate]')
    process.exit(1)
  }

  const report = (dir: string) => {
    const all = load(dir)
    const measured = all.filter((t) => !t.providerDegraded && !t.lessonDrift)
    const cards = measured.map((t) => ({ t, card: score(t), ...lessonScore(score(t)) }))

    console.log(`\n=== ${dir} — ${measured.length} measured of ${all.length} ===`)
    console.log('\ncriterion                   applied  passed   rate')
    for (const c of ENFORCED) {
      const ap = cards.filter((x) => x.card[c].applicable)
      const ps = ap.filter((x) => x.card[c].passed)
      const rate = ap.length ? `${((100 * ps.length) / ap.length).toFixed(0)}%` : '—'
      console.log(`${c.padEnd(28)}${String(ap.length).padStart(5)}${String(ps.length).padStart(8)}${rate.padStart(7)}`)
    }

    // The two RATE criteria, at corpus level — this is what their gates read.
    const sum = (f: (c: Scorecard) => number) => cards.reduce((a, x) => a + f(x.card), 0)
    const qk = sum((c) => c.tally.questionsKeyed); const qa = sum((c) => c.tally.questionsAsked)
    const cf = sum((c) => c.tally.confirmed); const ca = sum((c) => c.tally.correctAnswers)
    console.log('\nCORPUS RATES — the form the blueprint gates are written in:')
    console.log(`  C4 questions carrying an answer key   ${qk}/${qa}  ${qa ? ((100 * qk) / qa).toFixed(0) : '—'}%   gate >= 70%`)
    console.log(`  C5 correct answers confirmed          ${cf}/${ca}  ${ca ? ((100 * cf) / ca).toFixed(0) : '—'}%   gate >= 90%`)

    const scored = cards.filter((x) => Number.isFinite(x.score))
    const mean = scored.reduce((s, x) => s + x.score, 0) / Math.max(1, scored.length)
    console.log(`\nENFORCED-CRITERIA COMPLIANCE  ${mean.toFixed(2)} / 10`)
    console.log('  NOT a quality score. See this file\'s header: it disagrees with')
    console.log('  hand-scoring because it measures assessment machinery, not teaching.')
    console.log('DISTRIBUTION, which is the number that matters:')
    for (const band of [[10, 10.01], [9, 10], [8, 9], [7, 8], [0, 7]]) {
      const n = scored.filter((x) => x.score >= band[0] && x.score < band[1]).length
      const lo = band[0] === 10 ? '10/10' : `${band[0]}-${band[1]}`
      console.log(`  ${lo.padEnd(8)} ${String(n).padStart(3)} lessons  ${'#'.repeat(n)}`)
    }
    const clean = scored.filter((x) => x.passed === x.applied).length
    console.log(`\nlessons with NO enforced failure: ${clean} of ${scored.length}`)

    if (process.argv.includes('--per-lesson')) {
      console.log('\nPER LESSON, worst first:')
      for (const x of [...cards].sort((a, b) => a.score - b.score)) {
        const failed = ENFORCED.filter((c) => x.card[c].applicable && !x.card[c].passed)
        console.log(`  ${x.score.toFixed(1).padStart(4)}/10  ${x.t.id.padEnd(40)} ${failed.join(' ')}`)
      }
    }

    if (calibrate) {
      console.log('\n── CALIBRATION — every failure, with its evidence line ──')
      for (const c of ENFORCED) {
        const bad = cards.filter((x) => x.card[c].applicable && !x.card[c].passed)
        if (bad.length === 0) continue
        console.log(`\n${c}  (${bad.length} lessons)`)
        for (const x of bad.slice(0, 8)) {
          console.log(`  ${x.t.id}`)
          for (const e of x.card[c].evidence.slice(0, 2)) console.log(`      ${e}`)
        }
      }
    }
    return cards
  }

  const cur = report(dirs[0])
  if (dirs[1]) {
    const base = report(dirs[1])
    const shared = cur.filter((x) => base.some((b) => b.t.id === x.t.id))
    console.log(`\n=== COMPARISON over ${shared.length} shared concepts ===`)
    console.log('criterion                     base    now')
    for (const c of ENFORCED) {
      const r = (set: typeof cur) => {
        const ap = set.filter((x) => shared.some((s) => s.t.id === x.t.id) && x.card[c].applicable)
        return ap.length ? `${((100 * ap.filter((x) => x.card[c].passed).length) / ap.length).toFixed(0)}%` : '—'
      }
      console.log(`${c.padEnd(30)}${r(base).padStart(6)}${r(cur).padStart(7)}`)
    }
  }
}

main()
