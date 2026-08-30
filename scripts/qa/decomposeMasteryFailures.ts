/**
 * WHY A SESSION DID NOT REACH MASTERY — the decomposition, over transcripts
 * that already exist.
 *
 * Session A ran this by hand over the 60-session physics corpus and it changed
 * the plan: 8 of 14 failing sessions were ONE correct answer short and had all
 * run their full turn budget, and the single number that cracked it open was
 * "mean turns after the last question was served, split by mastered vs not" —
 * 1.0 for sessions that mastered against 4.0 for sessions that did not. A tail
 * of turns in which the tutor asks nothing is not a learner who cannot answer;
 * it is a learner who is never asked.
 *
 * This script is that decomposition, written down so the next subject does not
 * need it re-derived by hand, and so the comparison is made on identically
 * computed numbers rather than on two sessions' recollections.
 *
 * IT RUNS NOTHING AND TOUCHES NO ACCOUNT. It reads transcripts the
 * struggling-learner harness has already written, so it needs no run lock and
 * cannot collide with a run in flight.
 *
 * Run: npx tsx scripts/qa/decomposeMasteryFailures.ts scripts/qa/qa-runs/<dir> [--json] [--tail-lines 3]
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

interface Mastery { verified?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number }
interface Payload { mcq?: unknown; mastery?: Mastery | null; provider?: string | null; text?: string }
interface Turn { label: string; sent: string; payload: Payload }
interface Transcript {
  id: string; name?: string; difficulty?: string; turns: Turn[]
  finalMastery?: Mastery | null; providerDegraded?: boolean; lessonDrift?: boolean
}

/** Verified mastery, stated exactly as `masteryVerifiedStrict` does. */
const mastered = (m: Mastery | null | undefined) =>
  (m?.checkCorrect ?? 0) >= 1 && (m?.practiceCorrect ?? 0) >= 2

/** A question the SERVER keyed. A prose question the model volunteered is not
 *  one: `shouldSuppressSignalCorrectness` refuses to grade it, so it cannot
 *  move a mastery counter and must not be counted as an assessment. */
const servedQuestion = (t: Turn) => t.payload?.mcq != null

interface Row {
  concept: string
  difficulty: string
  mastered: boolean
  checkCorrect: number
  practiceCorrect: number
  shortBy: number
  turns: number
  questionsServed: number
  /** Turns after the last keyed question — the tail where nothing is asked. */
  tailTurns: number
  finalPhase: string
  tail: string[]
  excluded: string | null
}

function decompose(t: Transcript): Row {
  const turns = t.turns ?? []
  const final = t.finalMastery ?? turns.at(-1)?.payload?.mastery ?? null
  const lastQuestion = turns.map(servedQuestion).lastIndexOf(true)
  const check = final?.checkCorrect ?? 0
  const practice = final?.practiceCorrect ?? 0
  return {
    concept: t.id,
    difficulty: t.difficulty ?? '?',
    mastered: mastered(final),
    checkCorrect: check,
    practiceCorrect: practice,
    // Distance from the bar, so "one answer short" is a number and not a
    // reading of the table.
    shortBy: Math.max(0, 1 - check) + Math.max(0, 2 - practice),
    turns: turns.length,
    questionsServed: turns.filter(servedQuestion).length,
    tailTurns: lastQuestion < 0 ? turns.length : turns.length - 1 - lastQuestion,
    finalPhase: final?.phase ?? '?',
    tail: (lastQuestion < 0 ? turns : turns.slice(lastQuestion + 1)).map((x) => x.sent),
    // A degraded provider measured the outage, not the teaching; a drifted
    // lesson measured a different concept. Neither is evidence about this one.
    excluded: t.providerDegraded ? 'provider-degraded' : t.lessonDrift ? 'lesson-drift' : null,
  }
}

const mean = (xs: number[]) => (xs.length === 0 ? NaN : xs.reduce((a, b) => a + b, 0) / xs.length)
const f1 = (n: number) => (Number.isNaN(n) ? '—' : n.toFixed(1))

function main() {
  const argv = process.argv.slice(2)
  const dir = argv.find((a) => !a.startsWith('--'))
  if (!dir) { console.error('usage: decomposeMasteryFailures.ts <run-dir> [--json] [--tail-lines N]'); process.exit(1) }
  const tailLines = argv.includes('--tail-lines') ? Number(argv[argv.indexOf('--tail-lines') + 1]) : 3

  const files = readdirSync(dir)
    .filter((f) => f.startsWith('out-') && f.endsWith('.json'))
    .filter((f) => statSync(path.join(dir, f)).size > 0)
  const rows = files
    .map((f) => JSON.parse(readFileSync(path.join(dir, f), 'utf8')) as Transcript)
    .map(decompose)
    .sort((a, b) => a.concept.localeCompare(b.concept))

  const measured = rows.filter((r) => r.excluded === null)
  const won = measured.filter((r) => r.mastered)
  const lost = measured.filter((r) => !r.mastered)

  if (argv.includes('--json')) {
    console.log(JSON.stringify({ dir, rows, tailLines }, null, 2)); return
  }

  console.log(`DECOMPOSITION — ${dir}`)
  console.log(`${rows.length} transcripts, ${rows.length - measured.length} excluded (degraded provider or lesson drift), ${measured.length} measured`)
  console.log(`${won.length}/${measured.length} reached verified mastery (check >= 1 and practice >= 2)\n`)

  // THE NUMBER THAT CRACKED PHYSICS OPEN. If these two are close, the ceiling
  // is not a silent tail and the cause is somewhere else — which is exactly
  // what must not be assumed either way.
  console.log('MEAN TURNS AFTER THE LAST QUESTION SERVED')
  console.log(`  mastered      ${f1(mean(won.map((r) => r.tailTurns)))}   (n=${won.length})`)
  console.log(`  not mastered  ${f1(mean(lost.map((r) => r.tailTurns)))}   (n=${lost.length})`)
  console.log(`\nMEAN QUESTIONS SERVED   mastered ${f1(mean(won.map((r) => r.questionsServed)))}  vs  not ${f1(mean(lost.map((r) => r.questionsServed)))}`)
  console.log(`MEAN TURNS              mastered ${f1(mean(won.map((r) => r.turns)))}  vs  not ${f1(mean(lost.map((r) => r.turns)))}`)

  const oneShort = lost.filter((r) => r.shortBy === 1)
  console.log(`\nONE CORRECT ANSWER SHORT: ${oneShort.length} of ${lost.length} failures`)

  console.log('\nEVERY SESSION THAT DID NOT VERIFY')
  const pad = (s: string | number, n: number) => String(s).padEnd(n)
  console.log('  ' + pad('concept', 44) + pad('chk/prc', 9) + pad('short', 7) + pad('turns', 7) + pad('asked', 7) + pad('tail', 6) + 'phase')
  for (const r of lost) {
    console.log('  ' + pad(r.concept, 44) + pad(`${r.checkCorrect}/${r.practiceCorrect}`, 9) +
      pad(r.shortBy, 7) + pad(r.turns, 7) + pad(r.questionsServed, 7) + pad(r.tailTurns, 6) + r.finalPhase)
  }

  console.log('\nWHAT THE LEARNER WAS SAYING IN THE SILENT TAIL')
  for (const r of lost.filter((x) => x.tailTurns > 0)) {
    console.log(`  ${r.concept} (${r.tailTurns} turns after the last question):`)
    for (const line of r.tail.slice(0, tailLines)) console.log(`      "${line}"`)
  }

  if (rows.length !== measured.length) {
    console.log('\nEXCLUDED')
    for (const r of rows.filter((x) => x.excluded)) console.log(`  ${r.concept}  ${r.excluded}`)
  }
}

main()
