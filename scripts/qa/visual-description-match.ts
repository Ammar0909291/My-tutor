/**
 * P0-B live check — does the tutor's description refer to the ATTACHED figure?
 *
 * Run across several concepts, because one concept is an anecdote. For each:
 * introduce the figure, then ask to be shown one on the NEXT turn (the held
 * turn, which is where the drift was measured), and compare the words against
 * the attached payload.
 *
 * The decidable part is the FORM WORD. If a graph is attached and the tutor
 * calls it a disk/wheel/circuit, that is a mismatch no judgement is needed for.
 * Everything else is printed for a human to read.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, type TurnPayload } from './liveSession'

const LESSONS = [
  { lessonTitle: 'Angular Kinematics', lessonOrder: 39, topicSlug: 'phys.mech.angular-kinematics', unitTitle: 'Classical Mechanics', totalLessons: 238 },
  { lessonTitle: "Newton's First Law", lessonOrder: 22, topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238 },
  { lessonTitle: 'Angular Momentum', lessonOrder: 43, topicSlug: 'phys.mech.angular-momentum', unitTitle: 'Classical Mechanics', totalLessons: 238 },
]

/** What kind of figure is actually attached, from the payload itself. */
function attachedForm(p: TurnPayload): string | null {
  const spec = p.visualSpec as Record<string, unknown> | undefined
  if (spec && typeof spec.type === 'string') return spec.type
  const scene = p.sceneSpec as Record<string, unknown> | undefined
  if (scene && typeof scene.kind === 'string') return scene.kind
  if (typeof p.visual === 'string') return p.visual
  return null
}

/** Words that name a figure KIND, so a description can be checked against it. */
const FORM_WORDS: Record<string, RegExp> = {
  graph: /\b(graph|plot|curve|axis|axes|x-axis|y-axis|vs\.? time|against time)\b/i,
  disk: /\b(disk|disc|wheel|rim|circle with a point|rotating body)\b/i,
  circuit: /\b(circuit|battery|resistor|wire)\b/i,
  forces: /\b(arrow|force diagram|free[- ]body|normal force)\b/i,
}

async function main(): Promise<void> {
  const acct = await createQaAccount('vdesc')
  console.log(`account: ${acct.email}\n`)
  let mismatches = 0
  try {
    for (const lesson of LESSONS) {
      const sessionId = await createSession(acct.cookie, 'physics')
      await openLesson(acct.cookie, sessionId, lesson)
      const intro = await say(acct.cookie, sessionId, 'ok')
      const asked = await say(acct.cookie, sessionId, 'Can you give me a diagram to visualize this?')

      const form = attachedForm(asked) ?? attachedForm(intro)
      const text = (asked.text ?? '').replace(/\s+/g, ' ')
      const isGraph = form === 'graph' || /graph|coordinate/i.test(form ?? '')
      const saysDisk = FORM_WORDS.disk.test(text)
      const saysGraph = FORM_WORDS.graph.test(text)
      const mismatch = Boolean(carriesFigure(asked)) && isGraph && saysDisk && !saysGraph
      if (mismatch) mismatches++

      console.log(`── ${lesson.lessonTitle}`)
      console.log(`   figure attached : ${carriesFigure(asked)}  form=${form ?? 'none'}`)
      console.log(`   text says graph : ${saysGraph}`)
      console.log(`   text says disk  : ${saysDisk}`)
      console.log(`   MISMATCH        : ${mismatch ? 'YES (DEFECT)' : 'no'}`)
      console.log(`   tutor: ${text.slice(0, 300)}\n`)
    }
    console.log('─── verdict ───')
    console.log(mismatches === 0
      ? 'PASS: no attached-graph-described-as-a-disk mismatch observed.'
      : `DEFECT: ${mismatches} mismatch(es).`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}

main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
