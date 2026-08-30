/**
 * TEACHING DEFECT SCAN — count named, evidenced failures in a captured run.
 *
 * ── WHAT THIS IS NOT ────────────────────────────────────────────────────────
 * This is NOT a teaching-quality score, and it must never be reported as one.
 * strugglingLearnerHarness.ts's own header says why, and it is right: "no regex
 * substitutes for that judgment." A lesson can trip zero signatures here and
 * still be a poor lesson — thin explanations, a correct answer met with prose
 * that ignores it, a fact stated backwards. Those need a human read.
 *
 * ── WHAT IT IS ──────────────────────────────────────────────────────────────
 * Every signature below was found by READING transcripts from the 60-concept
 * physics run of 2026-08-30, verified against the code that produced it, and
 * then made countable. The point is regression detection and a reproducible
 * before/after, so a fix's effect is a number anyone can re-derive from the
 * same transcripts instead of a claim resting on which sessions someone read.
 *
 *   npx tsx scripts/qa/teachingDefectScan.ts <runDir> [<baselineDir>]
 *
 * With two directories it prints a comparison over the concepts they share,
 * which is the only fair way to read two runs of different samples.
 */
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

interface Mcq { question?: string; options?: string[]; correctIndex?: number }
interface Mastery { phase?: string; checkCorrect?: number; practiceCorrect?: number }
interface Payload {
  text?: string; provider?: string; mcq?: Mcq | null; mastery?: Mastery | null
}
interface Turn { label: string; sent: string; payload: Payload }
interface Transcript {
  id: string; difficulty: string; turns: Turn[]
  anyVisual?: boolean; providerDegraded?: boolean; lessonDrift?: boolean
  finalMastery?: Mastery | null
}

const LADDER = ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER']
const norm = (s: string | undefined) => (s ?? '').split(/\s+/).join(' ').trim()

/** Signature names are stable — they are what a comparison is keyed on. */
const SIGNATURES = [
  'authoredExplanationRepeated',
  'probeLatch',
  'strandedProbeReference',
  'correctAnswerNoCredit',
  'phaseRegressionOnCorrect',
  'asciiArtFallback',
] as const
type Signature = (typeof SIGNATURES)[number]

/** True when the learner's message is the exact text of an option they were
 *  offered — the only case where "was this answer correct" is knowable from a
 *  transcript alone, without re-deriving the grader. */
function answeredOption(prev: Payload, sent: string): { correct: boolean } | null {
  const m = prev.mcq
  if (!m?.options || typeof m.correctIndex !== 'number') return null
  const i = m.options.indexOf(sent)
  return i === -1 ? null : { correct: i === m.correctIndex }
}

function scan(t: Transcript): Record<Signature, number> {
  const hits = Object.fromEntries(SIGNATURES.map((s) => [s, 0])) as Record<Signature, number>
  const turns = t.turns

  // 1 · the authored explanation, served once from memory, recited back later
  //     by the model. 37 of 57 sessions before the fix of 2026-08-30.
  const served = turns
    .filter((x) => x.payload.provider === 'memory' && norm(x.payload.text).length > 150)
    .map((x) => norm(x.payload.text))
  for (const x of turns) {
    if (x.payload.provider === 'memory') continue
    const text = norm(x.payload.text)
    if (text.length < 150) continue
    if (served.some((m) => text.includes(m.slice(0, 200)))) hits.authoredExplanationRepeated += 1
  }

  // 2 · the probe latch: after the first wrong answer, no keyed probe ever
  //     attaches again. Counted once per session, and only when the session
  //     ran on long enough for the absence to mean anything.
  let firstWrong = -1
  for (let i = 1; i < turns.length; i += 1) {
    const a = answeredOption(turns[i - 1].payload, turns[i].sent)
    if (a && !a.correct) { firstWrong = i; break }
  }
  if (firstWrong !== -1) {
    const after = turns.slice(firstWrong + 1)
    if (after.length >= 3 && after.every((x) => !x.payload.mcq)) hits.probeLatch = 1
  }

  for (let i = 1; i < turns.length; i += 1) {
    const cur = turns[i].payload
    const prev = turns[i - 1].payload

    // 3 · the tutor refers to an option on a turn that carries no question.
    //     Whatever the learner sees, they cannot answer what is not there.
    if (!cur.mcq && /\boption [A-D]\b|\byou (?:picked|chose|selected)\b/i.test(cur.text ?? '')) {
      hits.strandedProbeReference += 1
    }

    const ans = answeredOption(prev, turns[i].sent)
    if (!ans?.correct) continue
    const before = prev.mastery ?? {}
    const after = cur.mastery ?? {}
    const credit = (m: Mastery) => (m.checkCorrect ?? 0) + (m.practiceCorrect ?? 0)
    const gained = credit(after) > credit(before)
    const bi = LADDER.indexOf(before.phase ?? '')
    const ai = LADDER.indexOf(after.phase ?? '')

    // 5 · a correct answer that moved the learner BACKWARDS down the ladder.
    if (!gained && bi >= 0 && ai >= 0 && ai < bi) { hits.phaseRegressionOnCorrect += 1; continue }
    // 4 · a correct answer that earned neither credit nor forward movement.
    //     NOT every uncredited correct answer: advancing a delivery phase
    //     without banking credit is the documented design (see 65d1f28), and
    //     counting it would make this signature fire on correct behaviour.
    if (!gained && bi >= 0 && ai >= 0 && ai <= bi) hits.correctAnswerNoCredit += 1
  }

  // 6 · an ASCII-art figure standing in for a diagram the learner asked for,
  //     in a session that never rendered a real one.
  if (t.anyVisual !== true) {
    for (const x of turns) {
      for (const block of (x.payload.text ?? '').matchAll(/```[^\n]*\n([\s\S]*?)```/g)) {
        const b = block[1]
        if (b.length < 20) continue
        const drawing = [...b].filter((c) => '─│┌┐└┘├┤▲▼←→|/\\_+*.^ \n'.includes(c)).length
        if (drawing / b.length > 0.85) { hits.asciiArtFallback += 1; break }
      }
    }
  }
  return hits
}

function load(dir: string): Transcript[] {
  return readdirSync(dir)
    .filter((f) => f.startsWith('out-') && f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')) as Transcript)
}

/** Degraded sessions are UNMEASURED, not failures — the app never got a fair
 *  turn in them, so counting them either way would be a claim the run did not
 *  make. Drifted sessions were served a different lesson mid-session. */
const measured = (rows: Transcript[]) =>
  rows.filter((t) => !t.providerDegraded && !t.lessonDrift)

const mastered = (t: Transcript) =>
  (t.finalMastery?.checkCorrect ?? 0) >= 1 && (t.finalMastery?.practiceCorrect ?? 0) >= 2

interface Report {
  n: number
  visual: number
  mastered: number
  sessionsWith: Record<Signature, number>
  occurrences: Record<Signature, number>
}

function report(rows: Transcript[]): Report {
  const sessionsWith = Object.fromEntries(SIGNATURES.map((s) => [s, 0])) as Record<Signature, number>
  const occurrences = Object.fromEntries(SIGNATURES.map((s) => [s, 0])) as Record<Signature, number>
  for (const t of rows) {
    const h = scan(t)
    for (const s of SIGNATURES) {
      occurrences[s] += h[s]
      if (h[s] > 0) sessionsWith[s] += 1
    }
  }
  return {
    n: rows.length,
    visual: rows.filter((t) => t.anyVisual).length,
    mastered: rows.filter(mastered).length,
    sessionsWith,
    occurrences,
  }
}

const pct = (a: number, b: number) => (b === 0 ? '  n/a' : `${Math.round((100 * a) / b)}%`.padStart(5))

function main() {
  const [dir, baseline] = process.argv.slice(2)
  if (!dir) throw new Error('usage: teachingDefectScan.ts <runDir> [<baselineDir>]')

  let rows = measured(load(dir))
  let base = baseline ? measured(load(baseline)) : null

  if (base) {
    // Compare only the concepts both runs actually measured, or the difference
    // is partly a difference of sample.
    const shared = new Set(rows.map((t) => t.id).filter((id) => base!.some((b) => b.id === id)))
    rows = rows.filter((t) => shared.has(t.id))
    base = base.filter((t) => shared.has(t.id))
    console.log(`Comparing ${shared.size} concepts measured by BOTH runs.\n`)
  }

  const now = report(rows)
  const then = base ? report(base) : null

  const line = (label: string, a: number, an: number, b?: number, bn?: number) =>
    console.log(
      `  ${label.padEnd(30)} ${String(a).padStart(3)}/${String(an).padEnd(3)} ${pct(a, an)}`
      + (then ? `   <-  ${String(b).padStart(3)}/${String(bn).padEnd(3)} ${pct(b!, bn!)}` : ''),
    )

  console.log(then ? 'OUTCOMES                            after          before' : 'OUTCOMES')
  line('showed a real visual', now.visual, now.n, then?.visual, then?.n)
  line('reached verified mastery', now.mastered, now.n, then?.mastered, then?.n)

  console.log(`\nDEFECT SIGNATURES (sessions containing at least one)`)
  for (const s of SIGNATURES) {
    line(s, now.sessionsWith[s], now.n, then?.sessionsWith[s], then?.n)
  }
  console.log('\nTotal occurrences:')
  for (const s of SIGNATURES) {
    console.log(
      `  ${s.padEnd(30)} ${String(now.occurrences[s]).padStart(4)}`
      + (then ? `   <-  ${String(then.occurrences[s]).padStart(4)}` : ''),
    )
  }
  console.log(
    '\nThese are counted failures, NOT a quality score. A lesson can trip none'
    + '\nof them and still teach badly; that still needs a human read.',
  )
}

main()
