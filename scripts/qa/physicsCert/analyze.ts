/**
 * PHYSICS UNIT 1 CERTIFICATION — automated defect checks over drive.ts transcripts.
 *
 * Deterministic detectors only; every flag cites the slot and quotes the reply so a human (or a
 * reviewing session) confirms it. Factual correctness is NOT auto-judged — the report prints the
 * slot-2/5/9/10 replies for reading. A concept passes Unit-1 certification only when it has zero
 * confirmed HIGH defects across all runs.
 *
 * HIGH   H-AFFIRM       slot 5 (stated misconception) answered with an opening confirmation and no correction
 *        H-UNCORRECTED  slot 9 (deliberate wrong answer) reply contains no correction
 *        H-LEAK         authoring labels / machine tags in learner-facing text
 *        H-EMPTY        empty tutor reply
 *        H-PAUSE        the lesson closed "on pause / not mastered" inside the scripted turns
 * MEDIUM M-PROMISE      a check is announced and nothing is asked
 *        M-SELFGRADE    the tutor asks the learner to confirm their own answer
 *        M-DOUBLECONF   two stacked confirmations ("That's right. That's spot-on …")
 *        M-NODIAGRAM    slot 3 diagram request: no figure and no explicit decline
 *        M-REPEAT       the same long paragraph (>=150 chars) served in 2+ tutor turns
 *
 * Run: OUT_DIR=<scratch> npx tsx scripts/qa/physicsCert/analyze.ts   (writes <OUT_DIR>/report.md)
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { CONFIRMS_CORRECT } from '../../../src/lib/teaching/answerConfirmation'
import { dropUndeliveredCheckAnnouncements } from '../../../src/lib/teaching/gateAssessment'

interface Turn { slot: number; kind: string; rule?: string; sent: string; text?: string; mcq?: { question: string; options: string[] } | null; figure?: boolean; mastery?: { verified?: boolean } | null }
interface Flag { sev: 'HIGH' | 'MEDIUM'; code: string; conceptId: string; run: number; slot: number; sent: string; reply: string }

const flat = (s: string) => s.replace(/[‘’ʼ]/g, "'").replace(/[\u2010-\u2013]/g, '-')
const first = (s: string) => flat(s).trim().split(/(?<=[.!?])\s+/)[0] ?? ''
const CORRECTION = /\b(not quite|not exactly|not correct|incorrect|isn'?t (?:right|correct|quite)|that'?s not|not the case|actually|careful|the (?:correct |right )?answer (?:is|was)|a common mix-?up|misconception|in fact|rather than|instead|not true|doesn'?t|does not|is not|are not|aren'?t|isn'?t)\b/i
const LEAK = /\bDIAGNOSTIC\b|\(P\d+-[a-z]|\[(?:correct|incorrect|answer)\]|<!--|\bSIGNAL\b|\bRETRIEVAL\b:|\bMCQ\b|\bTRANSFER\b:/
const SELFGRADE = /\b(have i got that right|did i get that right|am i right in (?:saying|thinking)|is that what you mean\?|is that right\?|is that correct\?)/i
const DECLINE = /\b(can'?t (?:draw|show|display)|cannot (?:draw|show|display)|no (?:diagram|picture|figure) (?:available|here)|don'?t have a (?:diagram|picture|figure))\b/i

export function analyzeLesson(conceptId: string, run: number, turns: Turn[]): Flag[] {
  const flags: Flag[] = []
  const add = (sev: Flag['sev'], code: string, t: Turn) => flags.push({ sev, code, conceptId, run, slot: t.slot, sent: t.sent, reply: (t.text ?? '').slice(0, 600) })
  let paused = false
  const seenParas = new Map<string, number>()
  for (const t of turns) {
    const text = t.text ?? ''
    if (!paused && /\bon pause\b|let'?s pause .{0,80} here for now/i.test(flat(text))) { paused = true; add('HIGH', 'H-PAUSE', t) }
    for (const para of text.split(/\n{2,}/).map((x) => x.trim()).filter((x) => x.length >= 150)) {
      const key = para.slice(0, 150)
      const n = (seenParas.get(key) ?? 0) + 1
      seenParas.set(key, n)
      if (n === 2) add('MEDIUM', 'M-REPEAT', t)
    }
    if (t.slot > 0 && !text.trim() && !t.mcq) add('HIGH', 'H-EMPTY', t)
    if (LEAK.test(text) || (t.mcq && LEAK.test(`${t.mcq.question} ${t.mcq.options.join(' ')}`))) add('HIGH', 'H-LEAK', t)
    if (t.kind === 'misconception') {
      const lead = flat(text).split(/(?<=[.!?])\s+/).slice(0, 2).join(' ')
      if (CONFIRMS_CORRECT.test(first(text)) && !CORRECTION.test(lead)) add('HIGH', 'H-AFFIRM', t)
    }
    if (t.kind === 'wrong' && t.rule !== 'd' && !CORRECTION.test(flat(text))) add('HIGH', 'H-UNCORRECTED', t)
    if (!t.mcq && text && dropUndeliveredCheckAnnouncements(text) !== text) add('MEDIUM', 'M-PROMISE', t)
    if ((t.kind === 'right' || t.kind === 'wrong' || t.kind === 'misconception') && SELFGRADE.test(flat(text))) add('MEDIUM', 'M-SELFGRADE', t)
    const s = flat(text).trim().split(/(?<=[.!?—-])\s+/)
    if (s.length > 1 && CONFIRMS_CORRECT.test(s[0]) && CONFIRMS_CORRECT.test(s[1]) && s[0].length < 40) add('MEDIUM', 'M-DOUBLECONF', t)
    if (t.slot === 3 && !t.figure && !DECLINE.test(flat(text))) add('MEDIUM', 'M-NODIAGRAM', t)
  }
  return flags
}

function main() {
  const outDir = process.env.OUT_DIR
  if (!outDir) throw new Error('OUT_DIR required')
  const files = readdirSync(outDir).filter((f) => /__run\d+\.json$/.test(f)).sort()
  const errors = readdirSync(outDir).filter((f) => f.endsWith('.error.json'))
  const all: Flag[] = []
  const review: string[] = []
  const perConcept = new Map<string, { runs: number; high: number; medium: number; mastery: number }>()
  for (const f of files) {
    const d = JSON.parse(readFileSync(join(outDir, f), 'utf8')) as { conceptId: string; run: number; turns: Turn[] }
    const flags = analyzeLesson(d.conceptId, d.run, d.turns)
    all.push(...flags)
    const pc = perConcept.get(d.conceptId) ?? { runs: 0, high: 0, medium: 0, mastery: 0 }
    pc.runs++; pc.high += flags.filter((x) => x.sev === 'HIGH').length; pc.medium += flags.filter((x) => x.sev === 'MEDIUM').length
    if (d.turns.some((t) => t.mastery?.verified)) pc.mastery++
    perConcept.set(d.conceptId, pc)
    for (const t of d.turns.filter((x) => [2, 5, 9, 10].includes(x.slot))) {
      review.push(`- **${d.conceptId} r${d.run} s${t.slot}** learner: ${t.sent.slice(0, 140)}\n  tutor: ${(t.text ?? '').replace(/\s+/g, ' ').slice(0, 420)}`)
    }
  }
  const turnsTotal = files.length * 15
  const lines = [
    `# Physics Unit 1 — automated report`, '',
    `Lessons: ${files.length} (${errors.length} errored). Turns: ~${turnsTotal}. HIGH flags: ${all.filter((x) => x.sev === 'HIGH').length}. MEDIUM flags: ${all.filter((x) => x.sev === 'MEDIUM').length}.`, '',
    '| concept | runs | HIGH | MEDIUM | mastery reached |', '|---|---|---|---|---|',
    ...[...perConcept].map(([k, v]) => `| ${k} | ${v.runs} | ${v.high} | ${v.medium} | ${v.mastery}/${v.runs} |`), '',
    '## Flags', '',
    ...all.map((x) => `- **${x.sev} ${x.code}** ${x.conceptId} r${x.run} s${x.slot}\n  learner: ${x.sent.slice(0, 160)}\n  tutor: ${x.reply.replace(/\s+/g, ' ').slice(0, 500)}`), '',
    '## For reading (slots 2, 5, 9, 10 — factual accuracy is not auto-judged)', '', ...review, '',
  ]
  writeFileSync(join(outDir, 'report.md'), lines.join('\n'))
  console.log(lines.slice(0, 6 + perConcept.size + 2).join('\n'))
  const byCode: Record<string, number> = {}
  for (const x of all) byCode[x.code] = (byCode[x.code] ?? 0) + 1
  console.log('flags by code:', JSON.stringify(byCode))
}

if (require.main === module) main()
