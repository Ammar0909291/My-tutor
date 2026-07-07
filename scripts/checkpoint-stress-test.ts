// Load .env before anything reads process.env. Next.js auto-loads .env for the
// app, but a script run directly via tsx does not — so use Node's built-in
// loader (Node 20.12+/22, no dotenv dependency needed). Wrapped because it
// throws if .env is absent.
try { process.loadEnvFile() } catch { /* .env optional — rely on ambient env */ }

// NOTE: the import of evaluateCheckpoint pulls in src/lib/ai/client.ts, which
// constructs the Groq client (reading process.env.GROQ_API_KEY) at module-load
// time. ESM evaluates static imports BEFORE any top-level statement, so that
// client would be built with an empty key before loadEnvFile() above runs.
// The fix is a DYNAMIC import inside main(), after env is loaded — see below.
import type { CheckpointNode } from '../src/lib/school/checkpoints/checkpointTypes'

// A real lesson checkpoint: tutor just taught counting numbers, then asked.
const TUTOR_MESSAGE =
  'Counting numbers are the numbers we use to count things: 1, 2, 3, 4, and so on. ' +
  'They start at 1 and never include zero or fractions. Got it? Can you tell me whether zero is a counting number?'

const NODES: CheckpointNode[] = [
  { id: 'arithmetic.counting_numbers', title: 'Counting Numbers' },
]

// expected = what a human would judge the correct classification to be.
const CASES: { label: string; reply: string; expectPass: boolean | 'unclear' }[] = [
  // Clear correct
  { label: 'clear correct', reply: 'No, zero is not a counting number — they start at 1.', expectPass: true },
  { label: 'clear correct (brief)', reply: 'no, counting starts from 1', expectPass: true },
  // Clear wrong
  { label: 'clear wrong', reply: 'Yes, zero is a counting number.', expectPass: false },
  { label: 'confidently wrong', reply: 'Definitely yes, zero is the first counting number, everyone knows that.', expectPass: false },
  // Ambiguous / non-committal
  { label: 'ambiguous: ok', reply: 'ok', expectPass: 'unclear' },
  { label: 'ambiguous: I think so', reply: 'I think so', expectPass: 'unclear' },
  { label: 'ambiguous: maybe?', reply: 'maybe?', expectPass: 'unclear' },
  { label: 'ambiguous: kind of', reply: 'kind of', expectPass: 'unclear' },
  { label: 'ambiguous: yeah', reply: 'yeah', expectPass: 'unclear' },
  // Off-topic / deflecting
  { label: 'deflect: move on', reply: 'can we move on', expectPass: false },
  { label: 'deflect: tired', reply: "I'm tired", expectPass: false },
  { label: 'deflect: whats next', reply: "what's next", expectPass: false },
]

async function main() {
  if (!process.env.GROQ_API_KEY) {
    console.error('GROQ_API_KEY not set — aborting (no mock fallback by design).')
    process.exit(1)
  }
  // Dynamic import AFTER loadEnvFile() so the Groq client is constructed with
  // the loaded key (see top-of-file note).
  const { evaluateCheckpointTurn } = await import('../src/lib/school/checkpoints/evaluateCheckpoint')
  console.log('Checkpoint:', TUTOR_MESSAGE, '\n')
  console.log('label\t| reply\t| checkpointAsked\t| passed\t| engagement\t| nodeId\t| expected')
  console.log('-'.repeat(120))
  for (const c of CASES) {
    const r = await evaluateCheckpointTurn(TUTOR_MESSAGE, c.reply, NODES)
    if (!r) {
      console.log(`${c.label}\t| "${c.reply}"\t| <null — classifier unavailable>\t| expected=${c.expectPass}`)
      continue
    }
    console.log(
      `${c.label}\t| "${c.reply}"\t| asked=${r.checkpointAsked}\t| passed=${r.passed}\t| engagement=${r.engagement}\t| node=${r.nodeId}\t| expected=${c.expectPass}`,
    )
    console.log(`    raw: ${JSON.stringify(r)}`)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
