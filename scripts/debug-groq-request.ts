/**
 * TEMP DIAGNOSTIC — GROQ REQUEST DIAGNOSTIC SPRINT.
 *
 * Runs the 5 specified cases sequentially against the real Groq SDK,
 * stopping immediately on the first failure. Each case adds exactly one
 * field/change on top of the previous case, ending at Case 4 = the exact
 * request object generateJSON() (src/lib/ai/client.ts) sends.
 *
 * Does NOT modify SceneSpec, scene generators, the renderer, the teaching
 * engine, any prompts, or any model/architecture. Read-only diagnostic
 * against the Groq SDK directly.
 *
 * Run with a real, Groq-reachable network + GROQ_API_KEY set:
 *   npx tsx -r dotenv/config scripts/debug-groq-request.ts
 */
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })
const MODEL = 'openai/gpt-oss-20b'

// The exact extraction prompt shape one real extractor sends
// (projectileMotion.ts's buildExtractionPrompt), plus the same trailing
// instruction generateJSON() appends — used verbatim in Case 3 and Case 4.
const EXTRACTION_PROMPT = `Read the explanation below and extract the projectile-motion launch parameters, if present.

Explanation:
"When you throw a ball at a 45-degree angle with an initial speed of 10 meters per second, it follows a parabolic trajectory. It starts at the origin, rises to a peak height, then falls back to the ground. The horizontal velocity stays constant the whole time, while gravity continuously slows the vertical velocity until it reverses."

Reply with ONLY this JSON, no other text:
{"isProjectile": true|false, "angleDegrees": <number 0-90>, "speed": <number, m/s>}
- isProjectile is false if the text is not describing a projectile/launch/throw with an angle and speed.
- If a value is not explicitly stated, make your best single numeric estimate from the text; do not invent a launch that isn't there.

Return ONLY valid JSON. No markdown. No explanation.`

interface Case { name: string; body: Record<string, unknown> }

const CASES: Case[] = [
  {
    name: 'Case 0 — model + messages("Reply only OK")',
    body: { model: MODEL, messages: [{ role: 'user', content: 'Reply only OK' }] },
  },
  {
    name: 'Case 1 — Case 0 + temperature',
    body: { model: MODEL, messages: [{ role: 'user', content: 'Reply only OK' }], temperature: 0.3 },
  },
  {
    name: 'Case 2 — Case 1 + max_tokens',
    body: { model: MODEL, messages: [{ role: 'user', content: 'Reply only OK' }], temperature: 0.3, max_tokens: 1500 },
  },
  {
    name: 'Case 3 — Case 2 + extraction prompt (swap message content)',
    body: { model: MODEL, messages: [{ role: 'user', content: EXTRACTION_PROMPT }], temperature: 0.3, max_tokens: 1500 },
  },
  {
    name: 'Case 4 — exact generateJSON() request object',
    body: { model: MODEL, messages: [{ role: 'user', content: EXTRACTION_PROMPT }], max_tokens: 1500, temperature: 0.3 },
  },
]

async function main() {
  for (const c of CASES) {
    const payload = JSON.stringify(c.body)
    console.log(`\n--- ${c.name} ---`)
    console.log('request body:', payload)
    console.log('payload size (bytes):', Buffer.byteLength(payload, 'utf8'))
    const start = performance.now()
    try {
      const res = await groq.chat.completions.create(c.body as any)
      const latencyMs = Math.round(performance.now() - start)
      const content = res.choices[0]?.message?.content ?? ''
      console.log('result: SUCCESS')
      console.log('latency (ms):', latencyMs)
      console.log('response length (chars):', content.length)
      console.log('response content:', JSON.stringify(content).slice(0, 200))
    } catch (err: any) {
      const latencyMs = Math.round(performance.now() - start)
      console.log('result: FAIL')
      console.log('HTTP status:', err.status)
      console.log('Groq error body:', err.message)
      console.log('error headers:', JSON.stringify(err.headers ?? {}))
      console.log('latency (ms):', latencyMs)
      console.log(`\n=== STOPPED at "${c.name}" — first failing case ===`)
      process.exit(1)
    }
  }
  console.log('\n=== ALL CASES SUCCEEDED ===')
  process.exit(0)
}

main()
