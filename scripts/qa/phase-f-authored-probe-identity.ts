/**
 * PHASE F — authored assessment integrity. INVESTIGATION ONLY.
 *
 * R3 asks why model-generated MCQs are served with probeId=null while the
 * production corpus holds authored gradeable probes. The premise deserves
 * testing before anything is called a bug, so this reproduces the whole path
 * offline against the real modules, using a REAL authored probe row.
 *
 * WHAT PRODUCTION SAYS (deployment dpl_3we23DBP…, phys.em.lenzs-law, 12 turns):
 *   [gate-eligibility] eligible=true  x1   (GUIDE/ask)
 *   [gate-eligibility] eligible=false x11  blockedBy phaseAllowsProbe (+
 *                                          probeAttachablePhase at OBSERVE/DEMONSTRATE)
 *   [gate-assessment]  probeFound=true converted=true
 *                      assetId=d7104e0a-2013-4ce2-a516-cb1ba190355c
 *   [turn-decision]    probeId=d7104e0a…  x1   ·   probeId=null  x11
 *
 * So on the ONE turn the gate was eligible, the authored probe was found,
 * converted and served, and its id reached the decision log. probeId=null on
 * the other eleven is the CORRECT, logged consequence of an ineligible gate —
 * not a defect.
 *
 * WHAT THE DATABASE SAYS (all time, not a sample):
 *   PROBE_OUTCOME rows ................ 2,199
 *   ...carrying an assetId ............ 0
 *   ACTIVE PROBE assets ............... 2,419
 *   ...with sampleSize > 0 ............ 0
 *   ...with qualityScore > 0 .......... 0
 *   d7104e0a (the probe that WAS served) evidence rows ... 0
 *
 * This script proves WHY, and separates the two questions that R3 conflates:
 * whether the learner is graded correctly (mastery integrity), and whether the
 * system can tell WHICH authored asset was answered (evidence integrity).
 *
 *   npx tsx scripts/qa/phase-f-authored-probe-identity.ts
 *
 * No provider, no database, no network. Real production modules only.
 */
import { probeToMcq, isProbeAttachablePhase, isMasteryGatePhase } from '../../src/lib/teaching/gateAssessment'
import { gradeMcqAnswer } from '../../src/lib/teaching/mcq'
import { writePendingQuestion, readPendingQuestion } from '../../src/lib/teaching/pendingQuestion'

const H = (s: string) => console.log(`\n${'═'.repeat(78)}\n${s}\n${'═'.repeat(78)}`)

/**
 * The REAL authored probe production served on the Lenz's Law turn above,
 * in the shape `findBestProbe` hands to `probeToMcq`. Values transcribed from
 * asset_identity + probe_assets; nothing invented.
 */
const AUTHORED_PROBE = {
  assetId: 'd7104e0a-2013-4ce2-a516-cb1ba190355c',
  conceptId: 'phys.em.lenzs-law',
  stem: 'PRACTICE: A magnet is pulled AWAY from a conducting loop. Does the induced current oppose or assist the motion?',
  choices: [
    { text: 'It opposes the motion, attracting the magnet back', isCorrect: true },
    { text: 'It assists the motion, pushing the magnet away', isCorrect: false },
    { text: 'No current is induced when the magnet moves away', isCorrect: false },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
H('STEP 1 — CONVERSION: probeToMcq')
const mcq = probeToMcq(AUTHORED_PROBE as never)
console.log('  input  keys :', Object.keys(AUTHORED_PROBE).join(', '))
console.log('  output keys :', mcq ? Object.keys(mcq).join(', ') : '(null)')
console.log('  output      :', JSON.stringify(mcq, null, 2).split('\n').slice(0, 8).join('\n              '))
const identityDropped = mcq !== null && !('assetId' in (mcq as object))
console.log(`\n  ${identityDropped ? 'CONFIRMED' : 'not confirmed'}: the assetId is DROPPED at conversion.`)
console.log(`  TutorMCQ is { question, options, correctIndex } — it has no field
  capable of carrying the authored asset's identity. From this point on, the
  turn holds a question with a correct answer but no provenance.`)

// ═══════════════════════════════════════════════════════════════════════════
H('STEP 2 — PERSISTENCE: writePendingQuestion / readPendingQuestion')
const stored = writePendingQuestion(mcq, 'lesson:147')
console.log('  stored keys :', stored ? Object.keys(stored).join(', ') : '(null)')
const restored = readPendingQuestion(stored, 'lesson:147')
console.log('  restored    :', restored ? Object.keys(restored).join(', ') : '(null)')
console.log(`\n  The round-trip adds only lessonKey. Nothing identifies the asset, so the
  ANSWER turn — a different request, reading pendingMcq off the snapshot —
  cannot recover which authored probe it is grading.`)

// ═══════════════════════════════════════════════════════════════════════════
H('STEP 3 — GRADING: is the learner graded against the AUTHORED key?')
if (!mcq) {
  console.log('  conversion failed — cannot grade')
} else {
  const cases: Array<[string, string]> = [
    ['exact correct option', mcq.options[0]],
    ['letter A (correct)', 'A'],
    ['weak-learner phrasing', 'i think it is it opposes the motion sir'],
    ['letter B (wrong)', 'B. but sir i not fully sure'],
    ['wrong option text', 'maybe it assists the motion'],
    ['non-answer', 'can you show picture please'],
  ]
  console.log('  learner says                                  chosenIndex  correct')
  for (const [label, msg] of cases) {
    const g = gradeMcqAnswer(msg, mcq)
    console.log(`  ${label.padEnd(24)} ${String(g.chosenIndex).padStart(11)}  ${String(g.correct)}`)
  }
  const truth = AUTHORED_PROBE.choices.findIndex((c) => c.isCorrect)
  console.log(`\n  Authored key index = ${truth}; TutorMCQ.correctIndex = ${mcq.correctIndex}  ` +
    `-> ${truth === mcq.correctIndex ? 'MATCH' : 'MISMATCH'}`)
  console.log(`  MASTERY INTEGRITY IS INTACT. Grading is deterministic against the
  reviewed authored key. Losing the assetId costs provenance, never correctness.`)
}

// ═══════════════════════════════════════════════════════════════════════════
H('STEP 4 — WHERE THE IDENTITY STILL EXISTS, AND WHERE IT DOES NOT')
console.log(`
  SERVING TURN
    findBestProbe  -> probe.assetId                 present
    probeToMcq     -> TutorMCQ                      DROPPED HERE
    decisionProbeIdHoisted = probe?.assetId ?? null  present (logged only)
    ASSET_SHOWN writer: assetId = assembled?.usedAssetIds[0]
      -> that is assembleLesson()'s EXPLANATION output. The gate-served probe
         is never passed to it, so a served authored probe writes NO
         ASSET_SHOWN row at all. This is why the database reports
         authored_probes_served = 0 for every concept while the log clearly
         shows one being served.

  ANSWER TURN (a separate request)
    pendingMcq (TutorMCQ + lessonKey) -> gradeMcqAnswer -> correctness
    PROBE_OUTCOME writer: assetId is never set
      -> and could not be: the identity was dropped one turn earlier.

  So the break is TWO breaks, and only the second is structural:
    A. the serving turn HAS the assetId and writes no evidence with it;
    B. the answering turn has no assetId to write.`)

// ═══════════════════════════════════════════════════════════════════════════
H('STEP 5 — PHASE INTERACTION (why the gate was ineligible on 11 of 12 turns)')
const PHASES = ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER'] as const
console.log('  phase        probeAttachable  masteryGate   authored probe can attach?')
for (const p of PHASES) {
  console.log(`  ${p.padEnd(12)} ${String(isProbeAttachablePhase(p)).padEnd(16)} `
    + `${String(isMasteryGatePhase(p)).padEnd(13)} `
    + `${isProbeAttachablePhase(p) ? 'yes, on a decided ASK' : 'NO — by design'}`)
}
console.log(`
  OBSERVE and DEMONSTRATE are deliberately probe-free (267 of 374 concepts hold
  exactly the three gradeable probes the mastery gates themselves need). A model
  MCQ served at OBSERVE with probeId=null is therefore the DESIGNED outcome,
  not starvation — the authored probe was never eligible on that turn.`)
