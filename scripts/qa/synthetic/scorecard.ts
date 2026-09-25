/**
 * THE SCORECARD — is a launch topic ready for real learners?
 *
 * A topic is READY when, across at least `requiredRuns` runs:
 *   - every persona reached verified mastery in every attempt, and
 *   - no critical defect appeared.
 * (docs/architecture/ARCHITECTURE_ROADMAP_TO_10.md, item 0.8.)
 *
 * Pure, so it can combine run files from different days:
 *   npx tsx scripts/qa/synthetic/scorecard.ts run1.json run2.json run3.json
 */
import { readFileSync } from 'node:fs'
import type { Finding, TurnRecord } from './checks'

export interface LessonResult {
  persona: string
  topic: string
  sessionId: string | null
  error?: string
  turns: TurnRecord[]
  findings: Finding[]
  summary: {
    turns: number
    mastered: boolean
    turnsToMastery: number | null
    closed: boolean
    stoppedBecause: string
    finalPhase: string | null
    verified: string
  }
}

export interface RunFile {
  version: 1
  base: string
  gitSha: string | null
  startedAt: string
  finishedAt: string
  launchSet: string[]
  personas: string[]
  maxTurns: number
  totalTurns: number
  lessons: LessonResult[]
  accounts: Array<{ persona: string; deleted: boolean; reloginBlocked: boolean }>
  /** Set when the provider guard stopped the run early. */
  stoppedBecause?: string
}

export interface PersonaScore { attempts: number; mastered: number; medianTurnsToMastery: number | null }
export interface TopicScore {
  topic: string
  runs: number
  personas: Record<string, PersonaScore>
  turns: number
  critical: number
  major: number
  minor: number
  defectsPer100Turns: number
  ready: boolean
  notReady: string[]
}

const median = (xs: number[]) => {
  if (!xs.length) return null
  const s = [...xs].sort((a, b) => a - b)
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2
}

export function buildScorecard(
  runs: readonly RunFile[],
  opts: { requiredRuns?: number; requiredPersonas?: readonly string[] } = {},
): { topics: TopicScore[]; critical: Array<Finding & { topic: string; persona: string; run: string }> } {
  const requiredRuns = opts.requiredRuns ?? 3
  const topicOrder = [...new Set(runs.flatMap((r) => r.launchSet))]
  const critical: Array<Finding & { topic: string; persona: string; run: string }> = []
  const topics: TopicScore[] = []

  for (const topic of topicOrder) {
    // A lesson the provider guard cut short measured the provider, not the
    // product: it is left out rather than scored as not-mastered.
    const lessons = runs.flatMap((r) => r.lessons
      .filter((l) => l.topic === topic && !l.summary.stoppedBecause.startsWith('provider fallback'))
      .map((l) => ({ l, run: r.startedAt })))
    if (!lessons.length) continue
    const runsWithTopic = new Set(lessons.map((x) => x.run)).size
    const personaIds = opts.requiredPersonas ?? [...new Set(runs.flatMap((r) => r.personas))]
    const personas: Record<string, PersonaScore> = {}
    for (const p of personaIds) {
      const mine = lessons.filter((x) => x.l.persona === p).map((x) => x.l)
      personas[p] = {
        attempts: mine.length,
        mastered: mine.filter((l) => l.summary.mastered).length,
        medianTurnsToMastery: median(mine.map((l) => l.summary.turnsToMastery).filter((t): t is number => t !== null)),
      }
    }
    const findings = lessons.flatMap((x) => x.l.findings.map((f) => ({ ...f, topic, persona: x.l.persona, run: x.run })))
    critical.push(...findings.filter((f) => f.severity === 'critical'))
    const turns = lessons.reduce((n, x) => n + x.l.summary.turns, 0)
    const count = (s: string) => findings.filter((f) => f.severity === s).length
    const notReady: string[] = []
    if (runsWithTopic < requiredRuns) notReady.push(`${runsWithTopic}/${requiredRuns} runs`)
    for (const [p, s] of Object.entries(personas)) {
      if (s.attempts === 0) notReady.push(`${p}: not run`)
      else if (s.mastered < s.attempts) notReady.push(`${p}: mastered ${s.mastered}/${s.attempts}`)
    }
    if (count('critical') > 0) notReady.push(`${count('critical')} critical defect(s)`)
    const errors = lessons.filter((x) => x.l.error).length
    if (errors) notReady.push(`${errors} lesson(s) errored`)
    topics.push({
      topic, runs: runsWithTopic, personas, turns,
      critical: count('critical'), major: count('major'), minor: count('minor'),
      defectsPer100Turns: turns ? Math.round(((count('critical') + count('major')) / turns) * 1000) / 10 : 0,
      ready: notReady.length === 0, notReady,
    })
  }
  return { topics, critical }
}

export function renderScorecardMarkdown(card: ReturnType<typeof buildScorecard>, personaIds: readonly string[]): string {
  const lines: string[] = []
  const ready = card.topics.filter((t) => t.ready).length
  lines.push(`# Launch-set scorecard — ${ready}/${card.topics.length} topics ready`, '')
  lines.push(`| Topic | Runs | ${personaIds.join(' | ')} | Turns | Critical | Major | Defects/100 turns | Ready |`)
  lines.push(`|---|---|${personaIds.map(() => '---').join('|')}|---|---|---|---|---|`)
  for (const t of card.topics) {
    const cells = personaIds.map((p) => {
      const s = t.personas[p]
      if (!s || s.attempts === 0) return '–'
      return `${s.mastered}/${s.attempts}${s.medianTurnsToMastery !== null ? ` (${s.medianTurnsToMastery}t)` : ''}`
    })
    lines.push(`| ${t.topic.replace('phys.mech.', '')} | ${t.runs} | ${cells.join(' | ')} | ${t.turns} | ${t.critical} | ${t.major} | ${t.defectsPer100Turns} | ${t.ready ? 'yes' : 'no: ' + t.notReady.join('; ')} |`)
  }
  lines.push('', 'Persona cells: mastered/attempts (median turns to verified mastery).', '')
  if (card.critical.length) {
    lines.push('## Critical defects', '')
    for (const c of card.critical) lines.push(`- \`${c.code}\` — ${c.topic} / ${c.persona} / turn ${c.turn}: ${c.detail}`)
  }
  return lines.join('\n')
}

if (process.argv[1] && process.argv[1].endsWith('scorecard.ts')) {
  const files = process.argv.slice(2)
  if (!files.length) { console.error('usage: scorecard.ts run1.json [run2.json …]'); process.exit(1) }
  const runs = files.map((f) => JSON.parse(readFileSync(f, 'utf8')) as RunFile)
  const personaIds = [...new Set(runs.flatMap((r) => r.personas))]
  console.log(renderScorecardMarkdown(buildScorecard(runs), personaIds))
}
