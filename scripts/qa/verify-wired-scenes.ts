/**
 * Live verification for the newly wired scene generators, plus the trust
 * invariants that must not regress alongside them.
 *
 * Covers, in one run:
 *   · two authored-scene mappings      (Data Visualization -> statistics_bar_chart,
 *                                       Critical Points -> calculus_graph)
 *   · a previously orphaned maths one  (Integers -> number_line)
 *   · angular kinematics               (generated graph, un-demoted)
 *   · Newton's First Law               (curated figure, untouched)
 *   · the phantom-reference check      (no figureless turn may claim a figure)
 *   · a held-visual "show me" case     (every case asks on the SECOND turn,
 *                                       where the figure is already held)
 *
 * The biology (punnett_square) and computer-science (er_diagram) wirings are
 * NOT here: /api/subjects serves only chemistry, english, mathematics and
 * physics, so no learner can reach those two subjects at all today. They are
 * unit-tested and correct, and deliver nothing until the subject is enabled —
 * which is a fact worth stating rather than a gap worth papering over.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'

interface Case {
  label: string
  subject: string
  lesson: { lessonTitle: string; lessonOrder: number; topicSlug: string; unitTitle: string; totalLessons: number }
  /** Words the figure/description should contain if the right scene is served. */
  expect: RegExp
}

const CASES: Case[] = [
  // NOTE: only chemistry, english, mathematics and physics are live subjects
  // (/api/subjects). The biology (punnett_square) and computer-science
  // (er_diagram) wirings are correct and unit-tested but CANNOT be reached by a
  // learner today, so they are deliberately absent here rather than faked.
  {
    label: 'Data Visualization (statistics_bar_chart, newly reachable)',
    subject: 'mathematics',
    lesson: { lessonTitle: 'Data Visualization', lessonOrder: 627, topicSlug: 'math.stats.data-visualization', unitTitle: 'Statistics', totalLessons: 908 },
    expect: /frequency|distribution|bar|chart|histogram/i,
  },
  {
    label: 'Critical Points (calculus_graph, newly reachable)',
    subject: 'mathematics',
    lesson: { lessonTitle: 'Critical Points', lessonOrder: 408, topicSlug: 'math.calc.critical-points', unitTitle: 'Calculus', totalLessons: 908 },
    expect: /critical|derivative|slope|maximum|minimum|curve/i,
  },
  {
    label: 'Integers (number_line, repointed orphan)',
    subject: 'mathematics',
    lesson: { lessonTitle: 'Integers', lessonOrder: 78, topicSlug: 'math.found.integers', unitTitle: 'Mathematical Foundations', totalLessons: 908 },
    expect: /number line|integer|negative|zero/i,
  },
  {
    label: 'Angular Kinematics (generated graph, un-demoted)',
    subject: 'physics',
    lesson: { lessonTitle: 'Angular Kinematics', lessonOrder: 39, topicSlug: 'phys.mech.angular-kinematics', unitTitle: 'Classical Mechanics', totalLessons: 238 },
    expect: /angular|theta|displacement|graph/i,
  },
  {
    label: "Newton's First Law (curated, must be untouched)",
    subject: 'physics',
    lesson: { lessonTitle: "Newton's First Law", lessonOrder: 22, topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238 },
    expect: /force|gravity|normal|inertia/i,
  },
]

/** Claiming a figure that is not there — the F5 family. */
const ONSCREEN_CLAIM = /\b(on (your|the) screen|in the (figure|diagram|picture|image|graph)|look at the (figure|diagram|picture|graph))\b/i

async function main(): Promise<void> {
  const acct = await createQaAccount('scenes')
  console.log(`account: ${acct.email}\n`)
  let phantom = 0
  let served = 0
  try {
    for (const c of CASES) {
      const sessionId = await createSession(acct.cookie, c.subject)
      await openLesson(acct.cookie, sessionId, c.lesson)
      const intro: TurnPayload = await say(acct.cookie, sessionId, 'ok')
      // The held-visual case: ask to be shown something on the NEXT turn.
      const asked: TurnPayload = await say(acct.cookie, sessionId, 'Can you show me a diagram of this?')

      const fig = carriesFigure(asked) ? (figureLabel(asked) ?? 'yes') : 'none'
      const text = (asked.text ?? '').replace(/\s+/g, ' ')
      const onTopic = c.expect.test(text) || c.expect.test(JSON.stringify(asked.visual ?? asked.visualSpec ?? asked.sceneSpec ?? ''))
      if (carriesFigure(intro) || carriesFigure(asked)) served++

      // F5: a figureless turn must not claim a figure.
      for (const p of [intro, asked]) {
        if (!carriesFigure(p) && ONSCREEN_CLAIM.test(p.text ?? '')) {
          phantom++
          console.log(`  !! PHANTOM on a figureless turn: ${(p.text ?? '').slice(0, 160)}`)
        }
      }

      console.log(`── ${c.label}`)
      console.log(`   intro figure : ${carriesFigure(intro) ? (figureLabel(intro) ?? 'yes') : 'none'}`)
      console.log(`   asked figure : ${fig}`)
      console.log(`   on-topic     : ${onTopic}`)
      console.log(`   tutor: ${text.slice(0, 260)}\n`)
    }
    console.log('─── summary ───')
    console.log(`cases serving a figure: ${served}/${CASES.length}`)
    console.log(`phantom references on figureless turns: ${phantom}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
